#!/usr/bin/env bash
# Detect the supported Obsidian CLI and write a normalized transport snapshot.
#
# Official Obsidian CLI syntax is `obsidian version`. The detector never treats
# binary presence alone, a legacy --version response, or exit status zero alone
# as proof of capability.
#
# Usage:
#   bash scripts/detect-transport.sh [--vault PATH] [--force] [--quiet]
#   bash scripts/detect-transport.sh --peek [--vault PATH]
#   bash scripts/detect-transport.sh [PATH]          # legacy positional vault
#
# --peek is strictly read-only with respect to the vault. It neither creates
# .vault-meta nor refreshes transport.json.

set -euo pipefail
export PYTHONDONTWRITEBYTECODE=1

SCRIPT_DIR="${BASH_SOURCE[0]%/*}"
[ "$SCRIPT_DIR" != "${BASH_SOURCE[0]}" ] || SCRIPT_DIR="."
PLUGIN_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

MODE="write"
FORCE=false
QUIET=false
VAULT_INPUT=""
POSITIONAL_VAULT=""
STALE_AFTER_DAYS=7
ACTIVE_TMP=""

usage() {
  sed -n '2,15p' "$0" | sed 's/^# \{0,1\}//'
}

fail_usage() {
  echo "ERR: $*" >&2
  usage >&2
  exit 3
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --peek)
      MODE="peek"
      ;;
    --force)
      FORCE=true
      ;;
    --quiet)
      QUIET=true
      ;;
    --vault)
      [ "$#" -ge 2 ] || fail_usage "--vault requires a path"
      [ -z "$VAULT_INPUT" ] || fail_usage "--vault may be specified only once"
      VAULT_INPUT="$2"
      shift
      ;;
    --vault=*)
      [ -z "$VAULT_INPUT" ] || fail_usage "--vault may be specified only once"
      VAULT_INPUT="${1#--vault=}"
      [ -n "$VAULT_INPUT" ] || fail_usage "--vault requires a path"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      [ "$#" -le 1 ] || fail_usage "only one positional vault path is accepted"
      if [ "$#" -eq 1 ]; then
        POSITIONAL_VAULT="$1"
      fi
      break
      ;;
    -*)
      fail_usage "unknown option: $1"
      ;;
    *)
      [ -z "$POSITIONAL_VAULT" ] || fail_usage "only one positional vault path is accepted"
      POSITIONAL_VAULT="$1"
      ;;
  esac
  shift
done

if [ -n "$VAULT_INPUT" ] && [ -n "$POSITIONAL_VAULT" ]; then
  fail_usage "use either --vault or a positional vault path, not both"
fi

RAW_VAULT="${VAULT_INPUT:-${POSITIONAL_VAULT:-$PWD}}"
VAULT_ROOT="$(PYTHONPATH="$PLUGIN_ROOT${PYTHONPATH:+:$PYTHONPATH}" python3 - "$RAW_VAULT" "$PLUGIN_ROOT" <<'PY'
import sys
from pathlib import Path

from claude_obsidian.paths import VaultSelectionError, resolve_vault_root

try:
    selected = resolve_vault_root(
        sys.argv[1],
        start=Path.cwd(),
        plugin_root=Path(sys.argv[2]),
        allow_uninitialized=True,
    )
except VaultSelectionError as exc:
    print(f"ERR {exc.code}: {exc}", file=sys.stderr)
    raise SystemExit(2)
print(selected.root)
PY
)" || {
  echo "ERR: unable to select a safe user vault" >&2
  exit 2
}

if [ ! -d "$VAULT_ROOT" ]; then
  echo "ERR: vault root is not a directory: $VAULT_ROOT" >&2
  exit 2
fi

# Bind the exact vault object selected before any external capability probe.
# A probe may run arbitrary host software, so publication must later prove that
# this same directory object still owns the selected path.
VAULT_IDENTITY="$(python3 - "$VAULT_ROOT" <<'PY'
import os
import stat
import sys

try:
    value = os.stat(sys.argv[1], follow_symlinks=False)
except OSError as exc:
    print(f"ERR: cannot identify vault root: {exc}", file=sys.stderr)
    raise SystemExit(2)
if not stat.S_ISDIR(value.st_mode):
    print("ERR: vault root is not a directory", file=sys.stderr)
    raise SystemExit(2)
print(f"{value.st_dev}:{value.st_ino}")
PY
)" || exit 2
VAULT_DEVICE="${VAULT_IDENTITY%%:*}"
VAULT_INODE="${VAULT_IDENTITY#*:}"

META_DIR="$VAULT_ROOT/.vault-meta"
OUTPUT_FILE="$META_DIR/transport.json"

# Reject indirection before freshness or manual-override reads. Peek remains
# read-only, but it also must not traverse a hostile metadata symlink.
if [ -L "$META_DIR" ] || { [ -e "$META_DIR" ] && [ ! -d "$META_DIR" ]; }; then
  echo "ERR: .vault-meta is not a safe directory: $META_DIR" >&2
  exit 2
fi
if [ -L "$OUTPUT_FILE" ] || { [ -e "$OUTPUT_FILE" ] && [ ! -f "$OUTPUT_FILE" ]; }; then
  echo "ERR: transport snapshot is not a safe regular file: $OUTPUT_FILE" >&2
  exit 2
fi

log() {
  if ! $QUIET; then
    echo "$*" >&2
  fi
}

cleanup() {
  if [ -n "$ACTIVE_TMP" ]; then
    rm -f "$ACTIVE_TMP"
  fi
}
trap cleanup EXIT HUP INT TERM

is_fresh() {
  python3 - "$1" "$STALE_AFTER_DAYS" <<'PY'
import os
import sys
import time

path, days = sys.argv[1], int(sys.argv[2])
try:
    age = time.time() - os.path.getmtime(path)
except OSError:
    raise SystemExit(1)
raise SystemExit(0 if age < days * 86400 else 1)
PY
}

snapshot_is_valid() {
  python3 - "$1" "$VAULT_ROOT" <<'PY'
import json
import sys

try:
    with open(sys.argv[1], encoding="utf-8") as handle:
        data = json.load(handle)
except (OSError, UnicodeError, json.JSONDecodeError):
    raise SystemExit(1)
valid = (
    isinstance(data, dict)
    and data.get("schema_version") == 1
    and data.get("vault_root") == sys.argv[2]
    and isinstance(data.get("preferred"), str)
    and isinstance(data.get("fallback_chain"), list)
    and all(isinstance(item, str) and item for item in data["fallback_chain"])
    and isinstance(data.get("available"), dict)
    and isinstance(data["available"].get("cli"), dict)
    and isinstance(data["available"].get("filesystem"), dict)
)
raise SystemExit(0 if valid else 1)
PY
}

# A normal run may reuse a fresh snapshot. Peek always probes and never writes.
if [ "$MODE" = "write" ] && ! $FORCE && [ -f "$OUTPUT_FILE" ] && [ ! -L "$OUTPUT_FILE" ]; then
  if is_fresh "$OUTPUT_FILE" && snapshot_is_valid "$OUTPUT_FILE"; then
    log "transport.json is fresh (<${STALE_AFTER_DAYS}d). Use --force to refresh."
    cat "$OUTPUT_FILE"
    exit 0
  elif is_fresh "$OUTPUT_FILE"; then
    log "transport.json is fresh but invalid; refreshing it."
  fi
fi

CLI_BINARY=""
CLI_KIND="missing"
CLI_EXIT_CODE="-1"
CLI_OUTPUT=""

# `command -v` can return a path containing spaces or Unicode. Keep it as one
# quoted value for both invocation and JSON serialization.
if CLI_CANDIDATE="$(command -v obsidian 2>/dev/null)" && [ -n "$CLI_CANDIDATE" ]; then
  CLI_BINARY="$CLI_CANDIDATE"
  CLI_KIND="official"
  set +e
  CLI_OUTPUT="$(python3 - "$VAULT_ROOT" "$CLI_BINARY" <<'PY'
import os
import signal
import subprocess
import sys
import tempfile

vault, binary = sys.argv[1:]
with tempfile.TemporaryFile() as output:
    try:
        process = subprocess.Popen(
            [binary, "version"],
            cwd=vault,
            stdin=subprocess.DEVNULL,
            stdout=output,
            stderr=subprocess.STDOUT,
            env=dict(os.environ),
            start_new_session=True,
        )
        try:
            returncode = process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            process.wait()
            returncode = 124
            output.write(b"\nERR: obsidian version probe timed out after 5 seconds\n")
    except OSError as exc:
        returncode = 126
        output.write(f"ERR: cannot execute obsidian CLI: {exc.__class__.__name__}\n".encode())
    output.seek(0)
    payload = output.read(8193)
if len(payload) > 8192:
    payload = payload[:8192] + b"\n[output truncated]\n"
sys.stdout.write(payload.decode("utf-8", errors="replace"))
raise SystemExit(returncode)
PY
)"
  CLI_EXIT_CODE="$?"
  set -e
  # Bound untrusted diagnostic output before placing it in an environment
  # variable or JSON snapshot. Bash substring syntax is available in Bash 3.2.
  if [ "${#CLI_OUTPUT}" -gt 8192 ]; then
    CLI_OUTPUT="${CLI_OUTPUT:0:8192}"$'\n''[output truncated]'
  fi
elif LEGACY_CANDIDATE="$(command -v obsidian-cli 2>/dev/null)" && [ -n "$LEGACY_CANDIDATE" ]; then
  # Do not invoke the legacy binary. It does not prove support for the official
  # command contract and older wrappers may launch unrelated GUI behavior.
  CLI_BINARY="$LEGACY_CANDIDATE"
  CLI_KIND="legacy"
  CLI_EXIT_CODE="-1"
  CLI_OUTPUT="Legacy obsidian-cli found; enable and register the official obsidian CLI."
fi

export VAULT_ROOT VAULT_DEVICE VAULT_INODE OUTPUT_FILE CLI_BINARY CLI_KIND CLI_EXIT_CODE CLI_OUTPUT PLUGIN_ROOT

snapshot() {
  python3 - <<'PY'
from __future__ import annotations

import datetime as dt
import json
import os
import re
import socket
import sys
from pathlib import Path

sys.path.insert(0, os.environ["PLUGIN_ROOT"])
from claude_obsidian.json_utils import strict_json_loads
from claude_obsidian.transaction import TransactionError, read_vault_regular

vault = os.environ["VAULT_ROOT"]
expected_vault_identity = (
    int(os.environ["VAULT_DEVICE"]),
    int(os.environ["VAULT_INODE"]),
)
output_file = Path(os.environ["OUTPUT_FILE"])
binary = os.environ.get("CLI_BINARY", "")
kind = os.environ.get("CLI_KIND", "missing")
raw_output = os.environ.get("CLI_OUTPUT", "").strip()
try:
    exit_code = int(os.environ.get("CLI_EXIT_CODE", "-1"))
except ValueError:
    exit_code = -1


def classify() -> tuple[str, bool, bool | None, str, str]:
    if kind == "missing":
        return (
            "missing",
            False,
            None,
            "",
            "Obsidian CLI is not on PATH. Enable Command line interface in Obsidian Settings > General.",
        )
    if kind == "legacy":
        return (
            "unsupported",
            False,
            None,
            "",
            raw_output,
        )

    lowered = raw_output.casefold()
    app_patterns = (
        "app is not running",
        "app not running",
        "obsidian is not running",
        "no running obsidian",
        "unable to connect",
        "failed to connect",
        "connection refused",
        "could not connect",
        "ipc connection",
    )
    unsupported_patterns = (
        "unknown command",
        "unrecognized command",
        "unsupported command",
        "command not found: version",
        "requires obsidian 1.12",
        "requires the obsidian 1.12",
        "command line interface is disabled",
        "cli is disabled",
        "enable command line interface",
    )
    if any(pattern in lowered for pattern in app_patterns):
        return (
            "app_not_running",
            False,
            False,
            "",
            raw_output or "Obsidian is not running or the CLI could not connect.",
        )
    if any(pattern in lowered for pattern in unsupported_patterns):
        return (
            "unsupported",
            False,
            None,
            "",
            raw_output or "Installed binary does not support 'obsidian version'.",
        )
    if exit_code != 0:
        return (
            "capability_error",
            False,
            None,
            "",
            raw_output or f"'obsidian version' exited with status {exit_code}.",
        )
    # Some wrappers print an error but incorrectly return zero. Match explicit
    # error-shaped lines rather than any occurrence of the word "error".
    if re.search(r"(?im)^\s*(?:error|err|fatal|exception|failed)(?:\s*[:\-]|\s+)", raw_output):
        return ("capability_error", False, None, "", raw_output)
    if not raw_output:
        return (
            "capability_error",
            False,
            None,
            "",
            "'obsidian version' returned no version output.",
        )
    if not re.search(r"\b\d+\.\d+(?:\.\d+)?\b", raw_output):
        return (
            "capability_error",
            False,
            None,
            "",
            f"'obsidian version' returned an unrecognized response: {raw_output}",
        )
    version_string = next((line.strip() for line in raw_output.splitlines() if line.strip()), "")
    return ("ready", True, True, version_string, "")


status, usable, app_running, version_string, diagnostic = classify()
present = kind != "missing"
preferred = "cli" if usable else "filesystem"
chain = ["cli", "filesystem"] if usable else ["filesystem"]
manual_override = False


def require_selected_vault() -> None:
    try:
        value = os.stat(vault, follow_symlinks=False)
    except OSError as exc:
        print(f"ERR: selected vault changed during transport detection: {exc}", file=sys.stderr)
        raise SystemExit(2) from exc
    if not __import__("stat").S_ISDIR(value.st_mode) or (
        value.st_dev,
        value.st_ino,
    ) != expected_vault_identity:
        print("ERR: selected vault changed during transport detection", file=sys.stderr)
        raise SystemExit(2)

require_selected_vault()
try:
    existing_raw = read_vault_regular(
        Path(vault), ".vault-meta/transport.json", limit=8 * 1024 * 1024
    )
    existing = (
        strict_json_loads(existing_raw.decode("utf-8"))
        if existing_raw is not None
        else {}
    )
    if not isinstance(existing, dict):
        existing = {}
except (OSError, UnicodeError, json.JSONDecodeError, ValueError, TransactionError):
    existing = {}
require_selected_vault()
if existing.get("manual_override") is True:
    candidate_preferred = existing.get("preferred")
    candidate_chain = existing.get("fallback_chain")
    if (
        isinstance(candidate_preferred, str)
        and candidate_preferred
        and isinstance(candidate_chain, list)
        and candidate_chain
        and all(isinstance(item, str) and item for item in candidate_chain)
    ):
        manual_override = True
        preferred = candidate_preferred
        chain = candidate_chain

report = {
    "schema_version": 1,
    "detected_at": dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
    "host": socket.gethostname(),
    "vault_root": vault,
    "manual_override": manual_override,
    "preferred": preferred,
    "fallback_chain": chain,
    "available": {
        "cli": {
            "present": present,
            "usable": usable,
            "status": status,
            "binary": binary,
            "probe": "obsidian version",
            "exit_code": None if exit_code < 0 else exit_code,
            "version_string": version_string,
            "diagnostic": diagnostic,
            "obsidian_app_running": app_running,
        },
        "filesystem": {
            "present": True,
            "vault_root": vault,
            "note": "universal fallback; uses the agent host's filesystem tools directly",
        },
        "mcp_obsidian": {
            "present": None,
            "detection": "deferred",
            "note": "MCP server detection is deferred; configure and pin it with manual_override if needed.",
        },
        "mcpvault": {
            "present": None,
            "detection": "deferred",
            "note": "MCP server detection is deferred; configure and pin it with manual_override if needed.",
        },
    },
}
json.dump(report, __import__("sys").stdout, indent=2, sort_keys=True, ensure_ascii=False)
__import__("sys").stdout.write("\n")
PY
}

if [ "$MODE" = "peek" ]; then
  snapshot
  exit 0
fi

ACTIVE_TMP="$(mktemp "${TMPDIR:-/tmp}/claude-obsidian-transport.XXXXXX")"
snapshot > "$ACTIVE_TMP"
if ! PYTHONPATH="$PLUGIN_ROOT${PYTHONPATH:+:$PYTHONPATH}" python3 -B -P - \
  "$VAULT_ROOT" "$ACTIVE_TMP" 2>/dev/null <<'PY'
import os
import stat
import sys
from pathlib import Path

from claude_obsidian.transaction import MutationLock, _atomic_vault_write

vault = Path(sys.argv[1])
source = Path(sys.argv[2])
expected_vault_identity = {
    "state": "existing",
    "device": int(os.environ["VAULT_DEVICE"]),
    "inode": int(os.environ["VAULT_INODE"]),
}
flags = os.O_RDONLY | os.O_NOFOLLOW | getattr(os, "O_CLOEXEC", 0)
descriptor = os.open(source, flags)
try:
    before = os.fstat(descriptor)
    if not stat.S_ISREG(before.st_mode) or before.st_size > 8 * 1024 * 1024:
        raise RuntimeError("transport snapshot is not a bounded regular file")
    payload = b""
    while len(payload) <= 8 * 1024 * 1024:
        block = os.read(descriptor, 1024 * 1024)
        if not block:
            break
        payload += block
    after = os.fstat(descriptor)
    stable = ("st_dev", "st_ino", "st_size", "st_mtime_ns", "st_mode")
    if len(payload) > 8 * 1024 * 1024 or any(
        getattr(before, field) != getattr(after, field) for field in stable
    ):
        raise RuntimeError("transport snapshot changed while it was read")
finally:
    os.close(descriptor)

root_fd = -1
meta_fd = -1
try:
    with MutationLock(vault, expected_vault_identity=expected_vault_identity) as lock:
        root_fd = lock.duplicate_root_fd()
        meta_fd = lock.duplicate_parent_fd()
        _atomic_vault_write(
            vault,
            ".vault-meta/transport.json",
            payload,
            mode=0o644,
            root_fd=root_fd,
            meta_fd=meta_fd,
        )
finally:
    if meta_fd >= 0:
        os.close(meta_fd)
    if root_fd >= 0:
        os.close(root_fd)
PY
then
  echo "ERR: cannot publish a confined transport snapshot" >&2
  exit 2
fi

cat "$ACTIVE_TMP"
rm -f "$ACTIVE_TMP"
ACTIVE_TMP=""
log "Wrote: $OUTPUT_FILE"
log "Probe: obsidian version"
