#!/usr/bin/env bash
# ============================================================
# llm-wiki 速览库部署脚本（GitHub 同步模式）
# 本地 git commit + push 到 GitHub 私有仓库；
# VPS 端 cron 每 2 分钟 git pull 自动同步，无需 rsync。
# 认证由 oauth2-proxy（GitHub 登录）处理，无需本地口令。
# 触发：ingest Phase 3 / review 改页后由 LLM 执行，或手动跑。
# ============================================================
set -euo pipefail
cd "$(dirname "$0")/.."

# 可传入本次变更的路径；默认仅同步知识库及其维护文件。
# 编辑器配置、会话记录与其他未列出的本地文件不会被顺带提交。
if [ "$#" -gt 0 ]; then
  WIKI_DEPLOY_PATHS=("$@")
else
  WIKI_DEPLOY_PATHS=(CLAUDE.md index.md log.md questions.md review.md taxonomy.md wiki site scripts templates docs sources)
fi
while IFS= read -r -d '' WIKI_STAGED_PATH; do
  WIKI_ALLOWED=false
  for WIKI_DEPLOY_PATH in "${WIKI_DEPLOY_PATHS[@]}"; do
    if [[ "$WIKI_STAGED_PATH" == "$WIKI_DEPLOY_PATH" || "$WIKI_STAGED_PATH" == "$WIKI_DEPLOY_PATH/"* ]]; then
      WIKI_ALLOWED=true
      break
    fi
  done
  if [ "$WIKI_ALLOWED" = false ]; then
    echo "!! 暂存区已有部署范围以外的文件：${WIKI_STAGED_PATH}。请先处理暂存区，再重跑。"
    exit 1
  fi
done < <(git diff --cached --name-only -z)

echo "==> git add + commit + push"
git add -- "${WIKI_DEPLOY_PATHS[@]}"

if git diff --cached --quiet; then
  echo "   无改动，跳过"
else
  MSG="${WIKI_DEPLOY_MESSAGE:-deploy: $(date +%Y-%m-%d_%H:%M) 速览页更新}"
  git commit -m "$MSG"
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
  echo "OK GitHub 推送成功，站点可达: ${DEPLOY_URL}（当前版本由 VPS cron 随后同步；可达性不确认版本）"
else
  echo "?? 健康检查返回 ${code:-连接失败}（可能 VPS cron 还没拉取，或 DNS/证书问题）"
fi
