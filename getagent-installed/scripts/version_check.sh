#!/usr/bin/env bash
# Intentionally no `set -e`: update checks must never block the agent.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SKILL_MD="$SKILL_DIR/SKILL.md"
CONFIG_FILE="$SKILL_DIR/.env"
CHECK_INTERVAL=28800

# GitLab project path URL-encoded: algorithm/upex-algorithm-getall-skill-sdk
PROJECT_PATH="algorithm%2Fupex-algorithm-getall-skill-sdk"
RELEASES_URL="https://gitlab.bitget.tools/api/v4/projects/${PROJECT_PATH}/releases"

read_local_version() {
  if [ ! -f "$SKILL_MD" ]; then
    echo ""
    return
  fi
  sed -n 's/^[[:space:]]*version:[[:space:]]*\(.*\)/\1/p' "$SKILL_MD" 2>/dev/null | head -1
}

last_check=0
if [ -f "$CONFIG_FILE" ]; then
  last_check=$(sed -n 's/^last_check=\(.*\)/\1/p' "$CONFIG_FILE" 2>/dev/null | head -1 || echo "0")
  last_check=${last_check:-0}
fi

now=$(date +%s 2>/dev/null || echo "0")
elapsed=$((now - last_check)) 2>/dev/null || elapsed=$CHECK_INTERVAL
if [ "$elapsed" -lt "$CHECK_INTERVAL" ]; then
  exit 0
fi

remote_tag=$(curl -sf --max-time 5 "$RELEASES_URL" \
  | sed -n 's/.*"tag_name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' \
  | head -1 || true)

if [ -z "$remote_tag" ]; then
  exit 0
fi

tmp_config=$(mktemp 2>/dev/null || echo "${CONFIG_FILE}.tmp.$$")
if [ -f "$CONFIG_FILE" ]; then
  grep -v "^last_check=" "$CONFIG_FILE" > "$tmp_config" 2>/dev/null || true
fi
echo "last_check=$now" >> "$tmp_config"
mv "$tmp_config" "$CONFIG_FILE"

local_tag=$(read_local_version)
if [ -z "$local_tag" ] || [ "$local_tag" = "$remote_tag" ]; then
  exit 0
fi

cat <<EOF
GetAgent skill update available.
  Installed: $local_tag
  Latest:    $remote_tag
Update with one of:
  npx skills add https://gitlab.bitget.tools/algorithm/upex-algorithm-getall-skill-sdk/-/tree/${remote_tag}/skills/getagent --skill getagent -y
  git clone --branch ${remote_tag} --depth 1 git@gitlab.bitget.tools:algorithm/upex-algorithm-getall-skill-sdk.git ./.tmp/getagent-skill && cp -R ./.tmp/getagent-skill/skills/getagent/. "${SKILL_DIR}/" && rm -rf ./.tmp/getagent-skill
EOF
