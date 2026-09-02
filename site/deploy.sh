#!/usr/bin/env bash
# ============================================================
# llm-wiki 速览库部署脚本（GitHub 同步模式）
# 本地 git commit + push 到 GitHub 私有仓库；
# VPS 端 cron 每 2 分钟 git pull 自动同步，无需 rsync。
# 认证由 oauth2-proxy（GitHub 登录）处理，无需本地口令。
# 触发：ingest Phase 3 / review 改页后由 LLM 执行，或手动跑。
# ============================================================
set -uo pipefail
cd "$(dirname "$0")/.."

echo "==> git add + commit + push"
git add -A

if git diff --cached --quiet; then
  echo "   无改动，跳过"
else
  MSG="deploy: $(date +%Y-%m-%d_%H:%M) 速览页更新"
  git commit -m "$MSG" 2>/dev/null
fi

if ! git push origin main 2>/dev/null; then
  echo "!! push 失败（网络问题或 GitHub 不可达）。改动已在本地 commit，稍后重跑 $0 即可。"
  exit 1
fi

# 健康检查（VPS cron 每 2 分钟 pull，这里只检查站点可达）
DEPLOY_URL="https://wiki.arnowei.cloud"

echo "==> 健康检查 ${DEPLOY_URL}"
code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "${DEPLOY_URL}/" 2>/dev/null || echo "000")
if [ "${code}" = "200" ] || [ "${code}" = "302" ] || [ "${code}" = "403" ]; then
  echo "OK 已上线: ${DEPLOY_URL}（VPS cron 将在 2 分钟内同步）"
else
  echo "?? 健康检查返回 ${code:-连接失败}（可能 VPS cron 还没拉取，或 DNS/证书问题）"
fi
