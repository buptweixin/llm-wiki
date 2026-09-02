#!/usr/bin/env bash
# ============================================================
# llm-wiki 速览库部署脚本
# rsync site/ 到 VPS（nginx 容器 + basic auth），再做健康检查。
# 触发：ingest Phase 3 / review 改页后由 LLM 执行，或手动跑。
# 凭据读同目录 .deploy.env（已排除不上传）。
# 退出码非 0 只说明同步失败，不阻塞入库流程——重跑本脚本即可。
# ============================================================
set -uo pipefail
cd "$(dirname "$0")"

# shellcheck source=.deploy.env
[ -f .deploy.env ] && . ./.deploy.env
: "${DEPLOY_HOST:=dmit}"
: "${DEPLOY_PATH:=/root/workspace/docker_home/llm-wiki/site}"
: "${DEPLOY_URL:=https://wiki.arnowei.cloud}"
: "${DEPLOY_USER:?请在 site/.deploy.env 配置 DEPLOY_USER}"
: "${DEPLOY_PASS:?请在 site/.deploy.env 配置 DEPLOY_PASS}"

echo "==> rsync site/ -> ${DEPLOY_HOST}:${DEPLOY_PATH}"
if ! rsync -az --delete \
    --exclude '_template.html' \
    --exclude '.deploy.env' \
    --exclude 'deploy.sh' \
    ./ "${DEPLOY_HOST}:${DEPLOY_PATH}/"; then
  echo "!! rsync 失败（VPS 不可达或 ssh 免密失效）。速览页本地已更新，稍后重跑 $0 即可。"
  exit 1
fi

echo "==> 健康检查 ${DEPLOY_URL}"
code=$(curl -sS -u "${DEPLOY_USER}:${DEPLOY_PASS}" -o /dev/null -w "%{http_code}" \
  --max-time 20 "${DEPLOY_URL}/" 2>/dev/null || true)
if [ "${code:-}" = "200" ]; then
  echo "OK 已上线: ${DEPLOY_URL}"
else
  echo "?? 健康检查返回 ${code:-连接失败}（DNS 未生效/证书未签发时属预期，配置好后重跑本脚本验证）"
fi
