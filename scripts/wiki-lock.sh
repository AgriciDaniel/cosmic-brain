#!/usr/bin/env bash
# wiki-lock.sh — thin launcher for deprecated v1 page-lock compatibility.
#
# New workflows use one reviewed claude-obsidian transaction. This launcher
# remains for old integrations that still call acquire/release/list/
# clear-stale/peek in separate processes. All runtime behavior lives in the
# standard-library Python core, shares the canonical vault mutation lock, and
# confines legacy record operations with no-follow directory descriptors.

set -euo pipefail
export PYTHONDONTWRITEBYTECODE=1

SCRIPT_DIR="${BASH_SOURCE[0]%/*}"
[ "$SCRIPT_DIR" != "${BASH_SOURCE[0]}" ] || SCRIPT_DIR="."
PLUGIN_ROOT="$(CDPATH='' cd -- "$SCRIPT_DIR/.." && pwd -P)"
export PYTHONPATH="$PLUGIN_ROOT${PYTHONPATH:+:$PYTHONPATH}"

exec python3 -B -P -m claude_obsidian.legacy_lock "$@"
