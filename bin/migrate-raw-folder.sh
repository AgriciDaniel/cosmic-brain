#!/usr/bin/env bash
# migrate-raw-folder.sh — one-shot, idempotent rename of `raw/` → `.raw/`.
#
# Why: The canonical source layer is `.raw/` (dot-prefixed = hidden in Obsidian).
# Use this script if you have a vault that still uses the bare `raw/` folder name.
#
# What it does:
#   1. Renames `raw/` → `.raw/` (git mv if inside a repo, plain mv otherwise).
#   2. Rewrites .raw/.manifest.json keys: `raw/...` → `.raw/...` in `sources`
#      and `address_map`.
#   3. Rewrites `raw_file: "raw/..."` frontmatter in wiki/sources/*.md.
#
# Safe to re-run. Does nothing if `raw/` is absent.
#
# Usage: bash bin/migrate-raw-folder.sh [optional: /path/to/vault]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT="${1:-$(dirname "$SCRIPT_DIR")}"
cd "$VAULT"

# ── 1. Decide what to do ──────────────────────────────────────────────────────
if [ ! -d "raw" ] && [ ! -d ".raw" ]; then
  echo "--  no raw/ or .raw/ found — nothing to migrate"
  exit 0
fi

if [ -d ".raw" ] && [ ! -d "raw" ]; then
  echo "OK  already migrated (.raw/ present, raw/ absent)"
  exit 0
fi

if [ -d "raw" ] && [ -d ".raw" ]; then
  echo "ERR: both raw/ and .raw/ exist. Resolve manually before re-running." >&2
  echo "     Move contents of raw/ into .raw/, then 'rm -rf raw'." >&2
  exit 1
fi

# ── 2. Rename the directory ───────────────────────────────────────────────────
if [ -d ".git" ] && git ls-files --error-unmatch raw >/dev/null 2>&1; then
  git mv raw .raw
  echo "OK  git mv raw .raw"
else
  mv raw .raw
  echo "OK  mv raw .raw"
fi

# ── 3. Rewrite .raw/.manifest.json keys/values ────────────────────────────────
if [ -f ".raw/.manifest.json" ]; then
  python3 - <<'PY'
import json, pathlib
p = pathlib.Path(".raw/.manifest.json")
m = json.loads(p.read_text(encoding="utf-8"))

def fix(s):
    return ".raw/" + s[len("raw/"):] if isinstance(s, str) and s.startswith("raw/") else s

if isinstance(m.get("sources"), dict):
    m["sources"] = {fix(k): v for k, v in m["sources"].items()}

if isinstance(m.get("address_map"), dict):
    m["address_map"] = {fix(k): fix(v) for k, v in m["address_map"].items()}

p.write_text(json.dumps(m, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("OK  .raw/.manifest.json keys rewritten")
PY
else
  echo "--  .raw/.manifest.json absent (skipping manifest rewrite)"
fi

# ── 4. Rewrite raw_file: "raw/..." in wiki/sources/*.md frontmatter ───────────
if [ -d "wiki/sources" ]; then
  touched=0
  for f in wiki/sources/*.md; do
    [ -e "$f" ] || continue
    if grep -q 'raw_file: *"raw/' "$f"; then
      sed -i.bak 's|raw_file: "raw/|raw_file: ".raw/|g' "$f"
      rm -f "$f.bak"
      touched=$((touched + 1))
    fi
  done
  echo "OK  wiki/sources frontmatter rewritten in $touched file(s)"
else
  echo "--  wiki/sources/ absent (skipping frontmatter rewrite)"
fi

echo ""
echo "Migration complete."
echo "Next: in Obsidian Web Clipper, set destination folder to '.raw/' (with dot)."
