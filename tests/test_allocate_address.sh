#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ALLOC="$ROOT/scripts/allocate-address.sh"
TMP="$(mktemp -d "${TMPDIR:-/tmp}/allocate-address-test.XXXXXX")"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/wiki" "$TMP/.obsidian"

before="$(find "$TMP" -type f -print | sort)"
[ "$(bash "$ALLOC" --vault "$TMP" --peek)" = "1" ]
[ "$(bash "$ALLOC" --vault "$TMP")" = "1" ]
after="$(find "$TMP" -type f -print | sort)"
[ "$before" = "$after" ]

cat > "$TMP/wiki/Page.md" <<'EOF'
---
address: c-000500
---
# Page
EOF
[ "$(bash "$ALLOC" --vault "$TMP" --peek)" = "501" ]

set +e
bash "$ALLOC" --vault "$TMP" allocate > /dev/null 2> "$TMP/error"
rc=$?
set -e
[ "$rc" -eq 2 ]
grep -q 'LEGACY_ALLOCATOR_READ_ONLY' "$TMP/error"
[ ! -e "$TMP/.vault-meta" ]

echo "All read-only address diagnostic tests passed."
