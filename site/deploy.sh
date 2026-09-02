#!/usr/bin/env bash
# ============================================================
# llm-wiki 速览库部署脚本（GitHub 同步模式）
# 本地 git commit + push 到 GitHub 私有仓库；
# VPS 端 cron 每 2 分钟 git pull 自动同步，无需 rsync。
# 触发：ingest Phase 3 / review 改页后由 LLM 执行，或手动跑。
# 退出码非 0 只说明 push 失败，不阻塞入库流程——重跑本脚本即可。
# ============================================================
set -uo pipefail
cd "$(dirname "$0")/.."

echo "==> git add + commit + push"
git add -A

if git diff --cached --quiet; then
  echo "   无改动，跳过"
else
  # 用时间戳生成 commit message
  MSG="deploy: $(date +%Y-%m-%d_%H:%M) 速览页更新"
  git commit -m "$MSG" 2>/dev/null
fi

if ! git push origin main 2>/dev/null; then
  echo "!! push 失败（网络问题或 GitHub 不可达）。改动已在本地 commit，稍后重跑 $0 即可。"
  exit 1
fi

# 健康检查（最多等 130 秒让 VPS cron 拉取）
DEPLOY_URL="https://wiki.arnowei.cloud"
DEPLOY_USER="xinli"
DEPLOY_PASS="${DEPLOY_PASS:-$(grep DEPLOY_PASS site/.deploy.env 2>/dev/null | cut -d= -f2)}"

echo "==> 等待 VPS 同步（cron 每 2 分钟 pull 一次）..."
for i in 1 2 3 4 5 6; do
  sleep 25
  code=$(curl -sS -u "${DEPLOY_USER}:${DEPLOY_PASS}" -o /dev/null -w "%{http_code}" \
    --max-time 15 "${DEPLOY_URL}/" 2>/dev/null || echo "000")
  if [ "${code}" = "200" ]; then
    echo "OK 已上线: ${DEPLOY_URL}（VPS 已同步）"
    exit 0
  fi
  echo "   第 ${i} 次检查: ${code}，继续等..."
done

echo "?? 健康检查未通过（可能 VPS cron 还没拉取，或 DNS/证书问题）。线上将在下次 cron 后更新。"
echo "   手动验证: curl -u ${DEPLOY_USER}:*** ${DEPLOY_URL}/"
