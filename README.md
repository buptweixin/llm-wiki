# llm-wiki

A persistent, interlinked Markdown knowledge base, packaged as an agent skill for environments such as Claude Code. You bring the sources, the questions, and the judgement. The agent does the summarising, cross-referencing, filing, and bookkeeping, and keeps the wiki current as new material arrives.

This repository is a personal implementation of the **LLM Wiki** pattern described by Andrej Karpathy, extended with a Feynman-style gate on new knowledge, a spaced review queue, and an offline static reading layer.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Relationship to Karpathy's LLM Wiki

> **This is not the official LLM Wiki project.** It is an independent personal implementation of the pattern. It is not affiliated with, endorsed by, or maintained by Andrej Karpathy, and it is not a fork or a mirror of any upstream repository.

The pattern comes from this gist:

- Andrej Karpathy, *LLM Wiki: A pattern for building personal knowledge bases using LLMs* (April 2026)
  <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>

Taken from the gist:

- Three layers: immutable raw sources, an LLM-maintained Markdown wiki, and a schema file that tells the agent how to work.
- Three operations: ingest, query, lint.
- `index.md` as the content catalogue and `log.md` as the append-only chronological record.
- The wiki as a compounding artifact, instead of re-deriving answers at query time like RAG.
- Good answers get filed back into the wiki as new pages.

Added in this repository:

- A Feynman gate before anything is filed, and a review queue for spaced reconstruction.
- A controlled tag vocabulary, and topic hubs whose cross-page relationships carry explicit evidence states.
- A companion static HTML reading layer with full-text search that runs offline from `file://`.
- Small scripts that keep the derived layer honest: index rebuild with validation, projection sync, and static regression checks.

If you want the original idea without these additions, read the gist first. It is short and much more general than this repository.

## Why this exists

Most document workflows with LLMs look like RAG: upload files, retrieve chunks at query time, generate an answer. The LLM rediscovers the same knowledge on every question and nothing accumulates.

This repository instead keeps a wiki between you and the raw material. When a source arrives, the agent reads it, discusses it with you, and integrates it into existing pages: creating pages, revising summaries, flagging contradictions, adding cross-links. The knowledge is compiled once and kept current. After a few months, the wiki is the compressed form of everything you have read, and the raw PDFs are only needed for verification.

The wiki is written in Chinese by convention (the author's source material is Chinese), but the mechanism is language-agnostic: change the writing rules in `CLAUDE.md` if your material is in another language. This README is in English so the project can be reviewed.

## How it works

| Layer | Path | Owner |
|---|---|---|
| Schema | `CLAUDE.md` (and `AGENTS.md`, a symlink to it) | Co-owned: the agent proposes changes, the human approves |
| Raw sources | `sources/` and Zotero | Human: sources are immutable, the agent only reads them |
| Wiki | `wiki/` | Agent: creates, updates, links, and files every page |
| Reading layer | `site/` | Agent: a static projection of the Markdown, never a second source of truth |

Two special files carry the bookkeeping: `index.md` is a content-oriented catalogue that the agent updates after every change, and `log.md` is an append-only record of ingests, queries, reviews, and lint passes.

## Features

### Ingest, with a Feynman gate

Papers, code, and new concepts go through four phases. None may be skipped:

1. **Locate.** Read the material and state in a few sentences what it is, what problem it solves, and how it connects to existing pages. Check `index.md` and `log.md` first so an already-filed source is not silently overwritten. The source itself is found in this order: local Zotero library (full text plus the AI pre-read note when one exists), then arXiv / DOI / URL, then an abstract-only fallback that is reported as incomplete.
2. **Explain.** Layered explanation from intuition to mechanism: one-sentence essence, why the old approach hurts, an analogy or worked example, the key mechanism, and links to existing knowledge. Unexplained jargon is not allowed to pass.
3. **Test.** Two to four questions that ask for re-explanation, boundary cases, or comparisons. Recitation questions are not used. Gaps found in the answers are closed by re-explaining, then tested again on a changed condition.
4. **File.** Only after understanding converges: build the page from a template, keep the user's own restatement and the points where they got stuck, add cross-links, update every affected page, sync `index.md`, append to `log.md`, schedule the first review, and sync the derived site pages.

### Query

Answers prefer wiki pages and cite them. A cross-page answer worth keeping is filed back as a new page under `wiki/syntheses/`, with the same index and log bookkeeping.

### Review

`review.md` is the queue: the first review is scheduled three days after filing, then one week, one month, and three months. The agent announces only the page title, the user reconstructs it from memory, and the agent checks mechanisms and qualitative claims rather than recalled numbers. Failures trigger a small re-teach, and the interval restarts.

### Lint

An on-demand audit, with fixes applied only after confirmation: contradictory conclusions, stale claims superseded by newer pages, orphan pages with no inbound links, frequently mentioned concepts without their own page, `index.md` drift, and inconsistencies between the Markdown and the derived site (missing pages, dead search anchors, tag IDs outside `taxonomy.md`, review projections that disagree with `review.md`, invalid relationship records or changed evidence fingerprints, missing paper figures).

### Topic hubs

A synthesis page groups papers that have already passed their first review into one topic. It organizes only: shared question, forks, comparisons, reading order. It does not produce new conclusions. Each cross-page relationship is recorded in a table with a stable ID, a type (`compare`, `complement`, `prerequisite`, `possible-combination`, `tension`, `extends`), an evidence state (`reported` from the source, `synthesis` from in-wiki comparison, `hypothesis` pending verification), and a citation anchor. The index builder fingerprints the cited paragraph, so when the underlying note changes, the build fails until the relationship is re-checked.

### Static reading layer

`site/` is a reading layer, not a mirror. It contains:

- `index.html` with topic and tag filters plus full-text search.
- Quick-read pages under `papers/` for fast lookup.
- Faithful full-note pages under `notes/` that mirror the Markdown, so search results can land on real paragraphs.
- Topic hub pages under `topics/`, including an inlined SVG map of the topic.
- One shared stylesheet, one reading/search script, and one generated data index; no build tooling, no frameworks, no network calls. Opening `site/index.html` from the filesystem works.

Markdown remains the only source of truth. A derived page may not introduce causal claims that the Markdown does not contain, and personal hypotheses stay labelled as unverified.

## Using this repository as a skill

1. Clone the repository and open the directory in an agent that reads project instructions.

   ```bash
   git clone https://github.com/buptweixin/llm-wiki.git
   cd llm-wiki
   ```

2. Let the agent load the schema.

   - **Claude Code** reads `CLAUDE.md` from the project root automatically.
   - **Codex, OpenCode, and other agents** that look for `AGENTS.md` get the same file, because `AGENTS.md` is a symlink to `CLAUDE.md`. No duplicate schema is maintained.

3. Know what the skill-related files are.

   - `.agents/skills/` holds skills committed to this repository. Currently that is `typesafe-ai`, with its own MIT `LICENSE` next to `SKILL.md`. These are optional helpers, not part of the knowledge-base workflow.
   - `skills-lock.json` is the lockfile for external skills the schema may reference: source repository, path inside that repository, and a content hash. `design-taste-frontend` is listed in the lockfile but is not committed, because the schema cites it from local state under `.zcode/` (gitignored). The stylesheet it informed is committed at `site/assets/wiki-slides.css`, so a fresh clone can still read and rebuild the site without the skill.

4. Talk to the agent in plain language. There are no required slash commands:

   ```text
   ingest this paper: <title or URL>
   what does the wiki say about <topic>?
   review
   lint
   turn these papers into a topic hub
   ```

5. Starting your own wiki.

   The checked-in pages under `wiki/` are the author's own working notes, kept as worked examples (video understanding, distillation, and reinforcement-learning papers, plus two topic hubs). Replace them with your own material page by page. Keep `CLAUDE.md`, `templates/`, `scripts/`, and the `site/` scaffolding; the index builder treats the existing `site/assets/wiki-index.js` as the store for editorial fields (page titles, relationship cards, quick-read entries), so pages are best removed from `wiki/`, `site/`, and the index together rather than deleted in bulk.

6. Optional: deploy the site. `site/deploy.sh` commits the knowledge base and pushes it, then health-checks a hard-coded URL on the author's own host, where a cron job pulls the repository. Treat it as a worked example to adapt, not as a supported service. If you never deploy, the site still works locally.

## Repository layout

| Path | Contents |
|---|---|
| `CLAUDE.md` | The schema: layers, directory conventions, writing rules, ingest/query/review/lint workflows, page quality bar, site rules. The single most important file. |
| `AGENTS.md` | Symlink to `CLAUDE.md`, for agents that look for `AGENTS.md`. |
| `index.md` | Catalogue of every page, one line each. Updated after every change. |
| `log.md` | Append-only record of ingests, queries, reviews, and lint passes. |
| `questions.md` | Open questions: understanding gaps that were never closed. |
| `review.md` | Spaced review queue with dates, results, and the next due date. |
| `taxonomy.md` | Controlled vocabulary for topic, mechanism, and goal tags used in page front-matter and site filters. |
| `.agents/skills/` | Skills committed to this repository, each with its own `SKILL.md` and `LICENSE`. |
| `skills-lock.json` | Lockfile for external skills: source, path, content hash. |
| `templates/` | Page templates: `paper.md`, `concept.md`, `code.md`, `synthesis.md`. |
| `wiki/papers/` | One page per paper, named `<year>-<short-name>.md`. |
| `wiki/syntheses/` | Topic hubs that organize papers which passed their first review. |
| `wiki/concepts/`, `wiki/code/` | Concept pages and code walkthroughs, defined by the schema. Empty in this repository so far. |
| `sources/` | Raw non-paper material such as notes and snippets. Read-only for the agent. Papers stay in Zotero instead of being copied here. |
| `site/index.html` | Entry point of the static reading layer: topic and tag filters, full-text search. |
| `site/papers/`, `site/topics/`, `site/notes/` | Quick-read pages, topic hub pages, and faithful full-note projections. |
| `site/assets/` | Single stylesheet, reading/search scripts, generated index (`wiki-index.js`), figures, diagrams. |
| `scripts/` | Index builder, projection sync, static checks, figure extraction, diagram rendering. |
| `docs/` | Design specs and review reports for the reading layer. Engineering notes, not knowledge pages. |
| `.claudian/`, `.omo/` | Committed local state from the author's agent client. Not needed by the workflow. |
| `.gitignore` | Excludes deployment credentials (`site/.deploy.env`), local agent config (`.zcode/`), Obsidian config, macOS files, and temp files. |

## Tooling

The published site has no dependencies. The scripts below use Node built-ins, plus `marked` and `sharp` only when a command needs them.

| Command | Purpose | Extra dependency |
|---|---|---|
| `node scripts/build-wiki-index.mjs` | Rebuild `site/assets/wiki-index.js` from page front-matter, `taxonomy.md`, `review.md`, and the Markdown sources. Validates tags, projections, anchors, member ownership, and relationship fingerprints; exits non-zero without writing on failure. `CHECK_DRY_RUN=1` prints the result instead of writing; `PRINT_FINGERPRINTS=1` prints fingerprints to copy back after re-checking a relationship. | None |
| `node scripts/sync-note-pages.mjs [--modules <dir>]` | Regenerate the full-note HTML projections under `site/notes/`. | `marked` |
| `node scripts/sync-hub-diagrams.mjs` | Inline the topic-map SVGs into their hub pages. Idempotent. | None |
| `node scripts/check-site.mjs` | Static regression checks across the whole site. | None |
| `node scripts/check-site-regressions.mjs` | Negative tests that break a temporary copy and assert the index builder refuses it. | None |
| `node scripts/render-mechanism-diagram.mjs <svg> [--modules <dir>]` | Render a class-only mechanism SVG to PNG for static previews. | `sharp` |
| `python3 scripts/extract-paper-figure.py --paper-id <page-id> --fig <n>` | Crop a key figure out of the paper's PDF into `site/assets/figures/<page-id>/`. Also supports `--list`, `--page`, `--bbox`, and `--pdf`. | PyMuPDF, Zotero |
| `site/deploy.sh` | Commit the knowledge base, push it, then health-check the author's deployment. | git; author-specific destination |

When a script needs `marked` or `sharp`, install them in a scratch directory and pass its modules path, so the repository itself stays dependency-free:

```bash
mkdir -p /tmp/wiki-modules && cd /tmp/wiki-modules
npm install marked sharp
node /path/to/llm-wiki/scripts/sync-note-pages.mjs --modules /tmp/wiki-modules/node_modules
```

## Requirements

- An LLM agent with local filesystem access that follows project instruction files (Claude Code, Codex CLI, OpenCode, or a comparable agent). The conventions live in `CLAUDE.md`; the agent does all the writing.
- Node.js 18 or newer for the scripts. The static site needs no Node runtime.
- Python 3 with [PyMuPDF](https://pymupdf.readthedocs.io/), only if you extract figures from PDFs.
- Zotero with Better BibTeX, plus a Zotero MCP server, is optional but recommended for paper ingest. The schema names the MCP tools it expects, and falls back to arXiv, DOI, or URL lookup without them.
- A browser. Any modern browser can open `site/index.html` directly from the filesystem.
- A host with a cron pull job, only if you want automatic deployment of the site.

## Design rules

These are enforced in `CLAUDE.md`, and some are checked by scripts:

- Markdown is the only content source. If a derived page and a note disagree, the note wins.
- No new causal conclusions in `site/`. Personal hypotheses stay visibly marked as unverified.
- One stylesheet and one behavior script. The remaining JavaScript is a regenerated data index. No inline styles on site pages; bump the `?v=` query strings when assets change.
- The site must stay dependency-free and readable from `file://`, and full-note pages must stay readable without JavaScript.
- `log.md` is append-only. `index.md` is updated with every change.
- Every page carries a one-sentence essence at the top, a plain-language explanation that rebuilds intuition in five minutes, at least one analogy or concrete example, the sticking points from that session, links to related pages, and sources plus the ingest date at the bottom.

## Status and scope

- A single-user personal project, with no hosted service and no support guarantees.
- Not a RAG framework: no embeddings, no vector database, no server, no background jobs. An index file is enough at personal scale.
- The site UI and wiki prose are Chinese; this README is English.
- Content contributions are unlikely to be merged, because the knowledge pages are personal notes. Tooling and documentation fixes are welcome.

## Acknowledgements

- Andrej Karpathy for the [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
- [marked](https://github.com/markedjs/marked) for Markdown rendering in the note projections.
- [sharp](https://sharp.pixelplumbing.com/) for SVG to PNG rendering.
- [PyMuPDF](https://pymupdf.readthedocs.io/) for PDF figure cropping.
- [Zotero](https://www.zotero.org/) and [Better BibTeX](https://retorque.re/zotero-better-bibtex/) for source anchors.
- The [typesafe-ai skill](https://github.com/typesafe-ai/skills) (MIT, vendored under `.agents/skills/`) and the `design-taste-frontend` skill from [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill), pinned in `skills-lock.json`.

## License

[MIT](LICENSE), Copyright (c) 2025-2026 Arno Wei.

Vendored third-party skills keep their own licenses; see `.agents/skills/typesafe-ai/LICENSE`.

## 中文说明

本仓库是 Karpathy「LLM Wiki」思路的个人实践，**不是官方项目**，与原作者无关联，也不是任何上游仓库的 fork 或镜像（来源链接见上文 *Relationship to Karpathy's LLM Wiki*）。

用法：用支持项目指令文件的 agent（Claude Code、Codex、OpenCode 等）打开仓库，先读 `CLAUDE.md`，然后用自然语言说「ingest 这篇论文」「查一下 X」「复习」「lint」。知识页面以中文为主，`site/` 是可离线打开（`file://`）的静态阅读层，Markdown 始终是唯一真源。本仓库的 `wiki/` 内容是作者的个人笔记，仅作示例参考。
