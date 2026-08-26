#!/usr/bin/env bash
# co.sh — platform-routed entry point for the claude-obsidian core.

export PYTHONDONTWRITEBYTECODE=1

#
# Vault writes require POSIX directory-descriptor confinement, so native
# Windows refuses them (see docs/windows-wsl.md).  This wrapper keeps a single
# invocation for every host: on Linux and macOS it calls the core directly, and
# on native Windows it re-runs the same command inside WSL, translating
# Windows-style path arguments to their /mnt mount points on the way.
#
# Approval hashes bind to the environment that produced them, so a plan and its
# apply must both run through this wrapper.  Do not mix a native dry-run with a
# WSL apply.
#
# Usage:
#   bash bin/co.sh transaction inspect BUNDLE.json --vault P:/path/to/vault
#   bash bin/co.sh transaction apply  BUNDLE.json --vault P:/path/to/vault --apply
#
# Environment:
#   CO_WSL_DISTRO      WSL distribution to use (default: Debian)
#   CO_WSL_MOUNT_ROOT  DrvFs mount root inside WSL (default: /mnt)
#   CO_PYTHON          Python interpreter name (default: python3)
#   CO_PRINT_COMMAND   Print the resolved command instead of running it
#
# A vault on a mounted Windows drive needs DrvFs metadata support, otherwise
# applies fail with RESULT_DRIFT on file modes; see docs/windows-wsl-fork.md.

set -euo pipefail

CORE_RELATIVE="scripts/claude-obsidian.py"
PYTHON="${CO_PYTHON:-python3}"

case "$(uname -s)" in
  MINGW* | MSYS* | CYGWIN*) NATIVE_WINDOWS=1 ;;
  *) NATIVE_WINDOWS=0 ;;
esac

# Git Bash reports MSYS paths (/p/source/...) from pwd; `pwd -W` gives the
# Windows path the translation below expects.
if [ "$NATIVE_WINDOWS" -eq 1 ]; then
  SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && { pwd -W 2>/dev/null || pwd; })"
else
  SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
fi
PRODUCT_ROOT="$(dirname -- "$SCRIPT_DIR")"

if [ "$NATIVE_WINDOWS" -eq 0 ]; then
  if [ -n "${CO_PRINT_COMMAND:-}" ]; then
    printf '%s\n' "$PYTHON" "$PRODUCT_ROOT/$CORE_RELATIVE" "$@"
    exit 0
  fi
  exec "$PYTHON" "$PRODUCT_ROOT/$CORE_RELATIVE" "$@"
fi

DISTRO="${CO_WSL_DISTRO:-Debian}"
MOUNT_ROOT="${CO_WSL_MOUNT_ROOT:-/mnt}"

if ! command -v wsl.exe >/dev/null 2>&1; then
  printf 'ERR UNSUPPORTED_PLATFORM: vault writes need WSL and wsl.exe was not found; see docs/windows-wsl.md\n' >&2
  exit 2
fi

# Translate one argument.  Only drive-letter paths are rewritten: everything
# else (flags, JSON, operation ids, already-POSIX paths) is passed through
# untouched, so a value that merely contains a backslash is never mangled.
translate() {
  local value="$1"
  if [[ "$value" =~ ^([A-Za-z]):[\\/](.*)$ ]]; then
    local drive="${BASH_REMATCH[1]}"
    local rest="${BASH_REMATCH[2]}"
    printf '%s/%s/%s' "$MOUNT_ROOT" "$(printf '%s' "$drive" | tr '[:upper:]' '[:lower:]')" "${rest//\\//}"
    return
  fi
  printf '%s' "$value"
}

CORE_WSL="$(translate "$PRODUCT_ROOT/$CORE_RELATIVE")"

ARGUMENTS=()
for argument in "$@"; do
  ARGUMENTS+=("$(translate "$argument")")
done

# Git Bash rewrites POSIX-looking arguments before handing them to a Windows
# executable, which would turn /mnt/p/... into C:/Program Files/Git/mnt/p/....
# Both variables are needed: MSYS_NO_PATHCONV covers the MSYS runtime, and
# MSYS2_ARG_CONV_EXCL covers the MSYS2 argument converter.
if [ -n "${CO_PRINT_COMMAND:-}" ]; then
  printf '%s\n' "wsl.exe" "-d" "$DISTRO" "--" "$PYTHON" "$CORE_WSL" "${ARGUMENTS[@]}"
  exit 0
fi

exec env MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*' \
  wsl.exe -d "$DISTRO" -- "$PYTHON" "$CORE_WSL" "${ARGUMENTS[@]}"
