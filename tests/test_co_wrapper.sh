#!/usr/bin/env bash
# test_co_wrapper.sh — argument translation for the platform-routed wrapper.
#
# Runs everywhere: CO_PRINT_COMMAND makes bin/co.sh resolve its command and
# print it instead of executing, so the Windows branch is exercised on Linux
# CI too by forcing the platform detection through a MINGW uname stub.
#
# Usage:
#   bash tests/test_co_wrapper.sh

set -euo pipefail

ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
WRAPPER="$ROOT/bin/co.sh"
FAILURES=0

assert_contains() {
  local label="$1" haystack="$2" needle="$3"
  if [[ "$haystack" == *"$needle"* ]]; then
    printf 'OK   %s\n' "$label"
  else
    printf 'FAIL %s: expected to find %q in:\n%s\n' "$label" "$needle" "$haystack"
    FAILURES=$((FAILURES + 1))
  fi
}

assert_not_contains() {
  local label="$1" haystack="$2" needle="$3"
  if [[ "$haystack" == *"$needle"* ]]; then
    printf 'FAIL %s: did not expect %q in:\n%s\n' "$label" "$needle" "$haystack"
    FAILURES=$((FAILURES + 1))
  else
    printf 'OK   %s\n' "$label"
  fi
}

# Stub unames pin the platform branch so both paths are covered from either
# host: Git Bash reports MINGW, WSL and CI report Linux.
STUB_DIR="$(mktemp -d)"
POSIX_STUB_DIR="$(mktemp -d)"
trap 'rm -rf "$STUB_DIR" "$POSIX_STUB_DIR"' EXIT
cat >"$STUB_DIR/uname" <<'STUB'
#!/usr/bin/env bash
printf 'MINGW64_NT-10.0-26200\n'
STUB
chmod +x "$STUB_DIR/uname"
cat >"$POSIX_STUB_DIR/uname" <<'STUB'
#!/usr/bin/env bash
printf 'Linux\n'
STUB
chmod +x "$POSIX_STUB_DIR/uname"
cat >"$STUB_DIR/wsl.exe" <<'STUB'
#!/usr/bin/env bash
exit 0
STUB
chmod +x "$STUB_DIR/wsl.exe"

native_output="$(
  PATH="$POSIX_STUB_DIR:$PATH" CO_PRINT_COMMAND=1 \
    bash "$WRAPPER" lint --vault /home/user/vault
)"
assert_contains "native passthrough keeps posix vault" "$native_output" "/home/user/vault"
assert_contains "native passthrough calls the core" "$native_output" "scripts/claude-obsidian.py"
assert_not_contains "native passthrough does not use wsl" "$native_output" "wsl.exe"

windows_output="$(
  PATH="$STUB_DIR:$PATH" CO_PRINT_COMMAND=1 \
    bash "$WRAPPER" transaction apply 'P:\vaults\main\bundle.json' --vault 'P:/vaults/main'
)"
assert_contains "drive letter becomes a mount path" "$windows_output" "/mnt/p/vaults/main"
assert_contains "backslashes are normalised" "$windows_output" "/mnt/p/vaults/main/bundle.json"
assert_contains "windows branch routes through wsl" "$windows_output" "wsl.exe"
assert_not_contains "no drive letter survives translation" "$windows_output" "P:"

distro_output="$(
  PATH="$STUB_DIR:$PATH" CO_PRINT_COMMAND=1 CO_WSL_DISTRO=Ubuntu CO_WSL_MOUNT_ROOT=/drives \
    bash "$WRAPPER" doctor --vault 'D:/vault'
)"
assert_contains "distro is configurable" "$distro_output" "Ubuntu"
assert_contains "mount root is configurable" "$distro_output" "/drives/d/vault"

flag_output="$(
  PATH="$STUB_DIR:$PATH" CO_PRINT_COMMAND=1 \
    bash "$WRAPPER" transaction apply --approved-plan-sha256 'abc123' --vault 'P:/vault'
)"
assert_contains "non-path arguments pass through" "$flag_output" "abc123"

if [ "$FAILURES" -ne 0 ]; then
  printf '\n%d wrapper test(s) failed.\n' "$FAILURES"
  exit 1
fi

printf '\nAll co-wrapper tests passed.\n'
