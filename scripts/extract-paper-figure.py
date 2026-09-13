#!/usr/bin/env python3
"""
scripts/extract-paper-figure.py

论文核心图表提取工具：
1. 支持根据 paper-id（从 wiki/papers/*.md 读取 itemKey）或直接 itemKey 从本地 Zotero 定位 PDF
2. 支持搜索 Figure 编号、列出候选图表、高精度矢量/位图区域自适应裁剪
3. 保存为高清 PNG（默认 200 DPI）到 site/assets/figures/<paper-id>/ 供知识库使用
"""

import argparse
import os
import re
import sqlite3
import sys
from pathlib import Path
import fitz  # PyMuPDF


def get_zotero_db_path():
    db_path = Path.home() / "Zotero" / "zotero.sqlite"
    if not db_path.exists():
        raise FileNotFoundError(f"Zotero 数据库不存在: {db_path}")
    return str(db_path)


def find_pdf_by_item_key(item_key: str) -> str:
    db_path = get_zotero_db_path()
    # 使用 immutable=1 绕过 Zotero 正在运行时的 sqlite 锁定
    conn = sqlite3.connect(f"file:{db_path}?immutable=1", uri=True)
    c = conn.cursor()

    # 先检查 item_key 本身是否为 attachment
    c.execute(
        """
        SELECT items.key, itemAttachments.contentType, itemAttachments.path
        FROM items
        JOIN itemAttachments ON items.itemID = itemAttachments.itemID
        WHERE items.key = ?
        """,
        (item_key,),
    )
    rows = c.fetchall()

    if not rows:
        # 否则假设 item_key 是 top-level item，查找其 child attachments
        c.execute(
            """
            SELECT items.key, itemAttachments.contentType, itemAttachments.path
            FROM items
            JOIN itemAttachments ON items.itemID = itemAttachments.itemID
            WHERE itemAttachments.parentItemID = (SELECT itemID FROM items WHERE key = ?)
            """,
            (item_key,),
        )
        rows = c.fetchall()

    conn.close()

    pdf_attachments = [
        r for r in rows if r[1] == "application/pdf" and r[2] and r[2].startswith("storage:")
    ]
    if not pdf_attachments:
        raise FileNotFoundError(f"未在 Zotero 中找到 itemKey={item_key} 的 PDF 附件。查询结果: {rows}")

    att_key, _, rel_path = pdf_attachments[0]
    filename = rel_path.replace("storage:", "")
    pdf_path = Path.home() / "Zotero" / "storage" / att_key / filename
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF 文件物理路径不存在: {pdf_path}")

    return str(pdf_path)


def get_item_key_from_paper_md(paper_id: str, repo_root: Path) -> str:
    md_path = repo_root / "wiki" / "papers" / f"{paper_id}.md"
    if not md_path.exists():
        raise FileNotFoundError(f"找不到论文笔记: {md_path}")

    content = md_path.read_text(encoding="utf-8")
    # 匹配 > Zotero：... [itemKey](zotero://select/items/itemKey) `itemKey`
    m = re.search(r"zotero://select/items/([A-Za-z0-9]+)", content)
    if m:
        return m.group(1)
    # 兜底匹配 itemKey `([A-Z0-9]{8})`
    m2 = re.search(r"itemKey.*?`([A-Z0-9]{8})`", content)
    if m2:
        return m2.group(1)

    raise ValueError(f"无法从 {md_path} 中解析出 Zotero itemKey")


def list_figures_in_pdf(doc):
    print("=== PDF 图表索引检索 ===")
    fig_pattern = re.compile(r"\b(Fig(?:ure|\.)\s*(\d+[a-zA-Z]?))\b", re.IGNORECASE)
    results = []
    for i, page in enumerate(doc):
        blocks = page.get_text("blocks")
        for b in blocks:
            text = b[4].strip()
            for line in text.splitlines():
                line_clean = line.strip()
                match = fig_pattern.search(line_clean)
                if match and (line_clean.startswith(match.group(1)) or len(line_clean) < 120 or "Figure" in line_clean[:20]):
                    results.append((i + 1, match.group(1), line_clean[:100], fitz.Rect(b[:4])))
                    print(f"• [P.{i+1:02d}] {match.group(1)}: {line_clean[:80]}...")
                    break
    return results


def auto_detect_figure_bbox(page, caption_rect, margin_padding=6):
    """
    根据 Caption 的位置，在 Caption 上方或下方寻找图形/表格的绘制内容与文字
    """
    # 绝大多数学术论文 Figure 位于 Caption 上方
    # 少数表格（Table）位于 Caption 下方
    blocks = page.get_text("blocks")
    drawings = page.get_drawings()

    # 先看看 caption 上方的绘制元素
    above_drawings = [d["rect"] for d in drawings if d["rect"].y1 <= caption_rect.y0 + 5 and d["rect"].y0 >= 30]
    
    # 收集上方区域的元素
    if above_drawings:
        fig_bbox = above_drawings[0]
        for r in above_drawings[1:]:
            fig_bbox |= r

        # 加入上方绘制区域内的文字块
        for b in blocks:
            r = fitz.Rect(b[:4])
            if r.y1 <= caption_rect.y0 + 2 and r.y0 >= fig_bbox.y0 - 10:
                # 排除正文段落（如果段落宽度跨度极大且延伸到底部则不是图内文字）
                if r.y0 >= fig_bbox.y0 - 20 and r.y1 <= fig_bbox.y1 + 20:
                    fig_bbox |= r
    else:
        # 如果上方没有 drawing，检查内嵌图片
        images = page.get_images()
        img_rects = []
        for img_info in images:
            xref = img_info[0]
            for r in page.get_image_rects(xref):
                if r.y1 <= caption_rect.y0 + 10:
                    img_rects.append(r)
        if img_rects:
            fig_bbox = img_rects[0]
            for r in img_rects[1:]:
                fig_bbox |= r
        else:
            # 兜底：取 caption 上方一定高度
            fig_bbox = fitz.Rect(caption_rect.x0, max(50, caption_rect.y0 - 250), caption_rect.x1, caption_rect.y0 - 5)

    # 加上 padding
    fig_bbox.x0 = max(0, fig_bbox.x0 - margin_padding)
    fig_bbox.y0 = max(0, fig_bbox.y0 - margin_padding)
    fig_bbox.x1 = min(page.rect.width, fig_bbox.x1 + margin_padding)
    fig_bbox.y1 = min(page.rect.height, fig_bbox.y1 + margin_padding)

    return fig_bbox


def main():
    parser = argparse.ArgumentParser(description="提取论文中的主要架构/实验图表")
    parser.add_argument("--paper-id", help="论文ID，如 2026-open-mopd")
    parser.add_argument("--item-key", help="Zotero itemKey，如 S2DP7DZX")
    parser.add_argument("--pdf", help="本地 PDF 文件的直接路径")
    parser.add_argument("--fig", help="图编号，如 1、2、3")
    parser.add_argument("--page", type=int, help="指定第几页（从 1 开始）")
    parser.add_argument("--bbox", help="手动指定裁剪框: x0,y0,x1,y1")
    parser.add_argument("--dpi", type=int, default=200, help="输出分辨率 DPI (默认 200)")
    parser.add_argument("--padding", type=float, default=6.0, help="裁剪留白 padding (pt)")
    parser.add_argument("--output", help="输出图片路径 (.png)")
    parser.add_argument("--list", action="store_true", help="仅列出 PDF 中的 Figure 目录")

    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent

    pdf_path = args.pdf
    paper_id = args.paper_id

    if not pdf_path:
        item_key = args.item_key
        if not item_key and paper_id:
            item_key = get_item_key_from_paper_md(paper_id, repo_root)
        if not item_key:
            parser.error("请指定 --paper-id、--item-key 或 --pdf 之一")
        pdf_path = find_pdf_by_item_key(item_key)

    print(f"📄 目标 PDF: {pdf_path}")
    doc = fitz.open(pdf_path)

    if args.list:
        list_figures_in_pdf(doc)
        return

    target_page_idx = None
    target_caption_rect = None

    if args.page:
        target_page_idx = args.page - 1
    elif args.fig:
        fig_key = f"figure {args.fig}"
        alt_fig_key = f"fig. {args.fig}"
        for i, page in enumerate(doc):
            blocks = page.get_text("blocks")
            for b in blocks:
                t = b[4].lower()
                if t.startswith(fig_key) or t.startswith(alt_fig_key) or f"\n{fig_key}" in t or f"\n{alt_fig_key}" in t:
                    target_page_idx = i
                    target_caption_rect = fitz.Rect(b[:4])
                    print(f"🎯 找到 Figure {args.fig} 于第 {i+1} 页: {b[4].strip()[:80]}...")
                    break
            if target_page_idx is not None:
                break

    if target_page_idx is None:
        if args.fig:
            print(f"⚠️ 未能直接根据 'Figure {args.fig}' 定位到 Caption，请通过 --list 确认页码后使用 --page 指定。")
        else:
            print("请指定 --fig 或 --page。也可以使用 --list 查看所有图表。")
        return

    page = doc[target_page_idx]

    if args.bbox:
        coords = [float(x.strip()) for x in args.bbox.split(",")]
        clip_rect = fitz.Rect(coords)
    elif target_caption_rect:
        clip_rect = auto_detect_figure_bbox(page, target_caption_rect, margin_padding=args.padding)
    else:
        # 没有 bbox 也没有 caption，默认整页去掉 margin
        clip_rect = fitz.Rect(50, 50, page.rect.width - 50, page.rect.height - 50)

    print(f"✂️ 裁剪区域: {clip_rect} (尺寸: {clip_rect.width:.1f} x {clip_rect.height:.1f} pt)")

    pix = page.get_pixmap(clip=clip_rect, dpi=args.dpi)

    if args.output:
        out_path = Path(args.output)
    elif paper_id:
        fig_name = f"fig{args.fig if args.fig else target_page_idx + 1}.png"
        out_path = repo_root / "site" / "assets" / "figures" / paper_id / fig_name
    else:
        out_path = Path(f"figure_p{target_page_idx+1}.png")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    pix.save(str(out_path))
    print(f"✅ 图片已保存: {out_path} ({pix.width}x{pix.height} px, {os.path.getsize(out_path)/1024:.1f} KB)")


if __name__ == "__main__":
    main()
