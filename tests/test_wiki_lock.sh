#!/usr/bin/env bash
# test_wiki_lock.sh — unit tests for scripts/wiki-lock.sh.
#
# Hermetic: creates a throwaway vault under mktemp, no network, no external
# deps beyond bash + standard POSIX utilities. Covers:
#   - acquire returns 0 on first call, 75 on second call from a holding context
#   - release frees the lock and re-acquire works
#   - list shows held locks; reflects releases
#   - clear-stale removes age-expired records
#   - peek is read-only and reports unheld/held correctly
#   - path validation rejects absolute paths and traversal
#   - no-follow runtime operations never mutate a symlink target
#
# Usage: bash tests/test_wiki_lock.sh

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCK_SH="$ROOT/scripts/wiki-lock.sh"

PASS=0
FAIL=0

assert_eq() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "OK   $label"
    PASS=$((PASS + 1))
  else
    echo "FAIL $label: expected '$expected', got '$actual'"
    FAIL=$((FAIL + 1))
  fi
}

assert_true() {
  local label="$1"
  shift
  if "$@"; then
    echo "OK   $label"
    PASS=$((PASS + 1))
  else
    echo "FAIL $label"
    FAIL=$((FAIL + 1))
  fi
}

# Set up a sandbox vault for the duration of this run
SANDBOX=$(mktemp -d "${TMPDIR:-/tmp}/wiki-lock-test.XXXXXX")
trap 'rm -rf "$SANDBOX"' EXIT
mkdir -p "$SANDBOX/.vault-meta/locks"
export WIKI_LOCK_VAULT="$SANDBOX"

# Helper: run wiki-lock.sh against the sandbox; return rc
wl() {
  bash "$LOCK_SH" "$@"
}

lock_digest() {
  if command -v sha1sum >/dev/null 2>&1; then
    printf '%s' "$1" | sha1sum | awk '{print $1}'
  else
    printf '%s' "$1" | shasum -a 1 | awk '{print $1}'
  fi
}

echo "=== test_wiki_lock.sh ==="
echo "sandbox: $SANDBOX"
echo ""

# A read-only miss must not bootstrap runtime state.
READ_ONLY_VAULT="$SANDBOX/read-only-vault"
mkdir -p "$READ_ONLY_VAULT"
READ_ONLY_OUT=$(WIKI_LOCK_VAULT="$READ_ONLY_VAULT" bash "$LOCK_SH" peek wiki/Never.md)
assert_eq "peek miss in fresh vault reports unheld" "unheld" "$READ_ONLY_OUT"
assert_true "peek miss does not create vault metadata" test ! -e "$READ_ONLY_VAULT/.vault-meta"

# ── acquire on a fresh path returns 0 ────────────────────────────────────────
wl acquire wiki/concepts/Foo.md >/dev/null
assert_eq "first acquire rc" "0" "$?"

# ── second acquire while the lock is fresh returns 75 ────────────────────────
# With age-based staleness (STALE_AFTER_SEC=60 default), the lock is held until
# either an explicit release OR 60 seconds elapse. A second acquire immediately
# after the first should refuse.
RC2=$( (wl acquire wiki/concepts/Foo.md >/dev/null); echo $? )
assert_eq "second acquire while fresh rc" "75" "$RC2"

# ── peek shows the lock ──────────────────────────────────────────────────────
PEEK_OUT=$(wl peek wiki/concepts/Foo.md)
case "$PEEK_OUT" in
  *"wiki/concepts/Foo.md"*) assert_eq "peek includes path" "yes" "yes" ;;
  *) assert_eq "peek includes path" "yes" "no($PEEK_OUT)" ;;
esac

# ── list shows the held lock ─────────────────────────────────────────────────
LIST_OUT=$(wl list)
case "$LIST_OUT" in
  *"wiki/concepts/Foo.md"*) assert_eq "list shows held lock" "yes" "yes" ;;
  *) assert_eq "list shows held lock" "yes" "no" ;;
esac

# ── release frees the lock (cross-process release is allowed by design) ─────
wl release wiki/concepts/Foo.md
LIST_AFTER_RELEASE=$(wl list)
assert_eq "list empty after release" "" "$LIST_AFTER_RELEASE"

# ── re-acquire after release succeeds ───────────────────────────────────────
wl acquire wiki/concepts/Foo.md >/dev/null
assert_eq "re-acquire after release rc" "0" "$?"
wl release wiki/concepts/Foo.md

# ── short --stale-after-sec lets us test age-based reap quickly ─────────────
# Acquire with a 1-second stale window, sleep 2s, second acquire should succeed
wl --stale-after-sec 1 acquire wiki/concepts/Aged.md >/dev/null 2>&1 || \
  bash "$LOCK_SH" acquire --stale-after-sec 1 wiki/concepts/Aged.md >/dev/null 2>&1
# (flag order tolerance) — make sure the lock exists
PEEK_AGED=$(wl peek wiki/concepts/Aged.md)
case "$PEEK_AGED" in
  *Aged.md*) : ;;
  *) echo "DEBUG: aged peek was: $PEEK_AGED" ;;
esac
sleep 2
RC_AGED=$( (bash "$LOCK_SH" --stale-after-sec 1 acquire wiki/concepts/Aged.md >/dev/null 2>&1); echo $? )
assert_eq "age-based stale reap allows re-acquire" "0" "$RC_AGED"
wl release wiki/concepts/Aged.md

# ── clear-stale is age-only; the acquire PID is intentionally short-lived ───
# A fresh lock survives an administrative sweep even though acquire exited.
wl acquire wiki/concepts/Fresh.md >/dev/null
FRESH_REMOVED=$(wl clear-stale --max-age 3600)
assert_eq "fresh lock survives clear-stale" "0" "$FRESH_REMOVED"
wl release wiki/concepts/Fresh.md

# An aged lock is reaped by the explicit age threshold.
wl acquire wiki/concepts/Reap.md >/dev/null
sleep 1
REMOVED=$(wl clear-stale --max-age 0)
# Should have removed 1 (the Reap.md lock)
case "$REMOVED" in
  [1-9]*) assert_eq "clear-stale removed count >=1" "yes" "yes" ;;
  *) assert_eq "clear-stale removed count >=1" "yes" "no($REMOVED)" ;;
esac
LIST_AFTER_CLEAR=$(wl list)
assert_eq "list empty after clear-stale" "" "$LIST_AFTER_CLEAR"

# ── peek on unheld path ──────────────────────────────────────────────────────
PEEK_UNHELD=$(wl peek wiki/concepts/Never.md)
assert_eq "peek unheld" "unheld" "$PEEK_UNHELD"

# ── path validation: absolute path rejected ──────────────────────────────────
RC_ABS=$( (wl acquire /etc/passwd >/dev/null 2>&1); echo $? )
assert_eq "acquire absolute path rejected" "4" "$RC_ABS"

# ── path validation: traversal rejected ──────────────────────────────────────
RC_DOTDOT=$( (wl acquire ../escape.md >/dev/null 2>&1); echo $? )
assert_eq "acquire ../ rejected" "4" "$RC_DOTDOT"

# ── path validation: empty rejected ──────────────────────────────────────────
RC_EMPTY=$( (wl acquire "" >/dev/null 2>&1); echo $? )
assert_eq "acquire empty path rejected" "4" "$RC_EMPTY"

# ── path validation: newline rejected (v1.7.2; closes audit M4) ──────────────
# Newlines in lock paths would break the meta-lock line format (key=value lines
# separated by literal \n). Must be rejected at validate_path() time.
RC_NL=$( (wl acquire $'wiki/concepts/Foo\nbar.md' >/dev/null 2>&1); echo $? )
assert_eq "acquire newline path rejected" "4" "$RC_NL"

# ── path validation: carriage return rejected (v1.7.2; closes audit M4) ──────
RC_CR=$( (wl acquire $'wiki/concepts/Foo\rbar.md' >/dev/null 2>&1); echo $? )
assert_eq "acquire carriage-return path rejected" "4" "$RC_CR"

# ── numeric inputs are validated before Bash arithmetic ──────────────────────────────
# Bash arithmetic recursively evaluates variable contents. These payloads
# would create ARITH_MARKER if an untrusted epoch or flag reached $((...)).
ARITH_MARKER="$SANDBOX/ARITHMETIC-EVALUATED"
MALICIOUS_DECIMAL='x[$(touch '"$ARITH_MARKER"')0]'

RC_MISSING_STALE=$( (wl --stale-after-sec >/dev/null 2>&1); echo $? )
assert_eq "missing --stale-after-sec value rejected" "2" "$RC_MISSING_STALE"
RC_MISSING_MAX=$( (wl clear-stale --max-age >/dev/null 2>&1); echo $? )
assert_eq "missing --max-age value rejected" "2" "$RC_MISSING_MAX"

RC_NEGATIVE=$( (wl --stale-after-sec -1 list >/dev/null 2>&1); echo $? )
assert_eq "negative stale threshold rejected" "2" "$RC_NEGATIVE"
RC_OVERLONG=$( (wl clear-stale --max-age 9999999999999999999 >/dev/null 2>&1); echo $? )
assert_eq "overlong max age rejected" "2" "$RC_OVERLONG"

RC_LEADING_ZERO=$( (wl --stale-after-sec 000000000000000008 list >/dev/null 2>&1); echo $? )
assert_eq "leading-zero threshold normalized as decimal" "0" "$RC_LEADING_ZERO"
RC_POSITIONAL_ZERO=$( (wl clear-stale 000000000000000000 >/dev/null 2>&1); echo $? )
assert_eq "leading-zero positional max age normalized" "0" "$RC_POSITIONAL_ZERO"

RC_FLAG_STALE=$( (wl --stale-after-sec "$MALICIOUS_DECIMAL" list >/dev/null 2>&1); echo $? )
assert_eq "arithmetic payload in stale flag rejected" "2" "$RC_FLAG_STALE"
assert_true "stale flag payload never evaluated" test ! -e "$ARITH_MARKER"
RC_FLAG_MAX=$( (wl clear-stale --max-age "$MALICIOUS_DECIMAL" >/dev/null 2>&1); echo $? )
assert_eq "arithmetic payload in max-age flag rejected" "2" "$RC_FLAG_MAX"
assert_true "max-age flag payload never evaluated" test ! -e "$ARITH_MARKER"
RC_POSITIONAL_MAX=$( (wl clear-stale "$MALICIOUS_DECIMAL" >/dev/null 2>&1); echo $? )
assert_eq "arithmetic payload in positional max age rejected" "2" "$RC_POSITIONAL_MAX"
assert_true "positional max-age payload never evaluated" test ! -e "$ARITH_MARKER"

# list must skip a corrupt record without evaluating its epoch.
printf '123 %s wiki/concepts/MaliciousList.md\n' "$MALICIOUS_DECIMAL" \
  > "$SANDBOX/.vault-meta/locks/malicious-list.lock"
MAL_LIST_OUT=$(wl list 2>/dev/null)
assert_eq "list ignores corrupt numeric lock record" "" "$MAL_LIST_OUT"
assert_true "list lock epoch payload never evaluated" test ! -e "$ARITH_MARKER"
rm -f "$SANDBOX/.vault-meta/locks/malicious-list.lock"

# clear-stale treats a corrupt record as stale, without evaluating its epoch.
printf '123 %s wiki/concepts/MaliciousClear.md\n' "$MALICIOUS_DECIMAL" \
  > "$SANDBOX/.vault-meta/locks/malicious-clear.lock"
MAL_CLEAR_OUT=$(wl clear-stale --max-age 0 2>/dev/null)
assert_eq "clear-stale removes corrupt numeric lock record" "1" "$MAL_CLEAR_OUT"
assert_true "clear-stale lock epoch payload never evaluated" test ! -e "$ARITH_MARKER"

# acquire safely replaces a corrupt pre-existing record for its path.
MAL_ACQUIRE_PATH="wiki/concepts/MaliciousAcquire.md"
MAL_ACQUIRE_LOCK="$SANDBOX/.vault-meta/locks/$(lock_digest "$MAL_ACQUIRE_PATH").lock"
printf '123 %s %s\n' "$MALICIOUS_DECIMAL" "$MAL_ACQUIRE_PATH" > "$MAL_ACQUIRE_LOCK"
RC_MAL_ACQUIRE=$( (wl acquire "$MAL_ACQUIRE_PATH" >/dev/null 2>&1); echo $? )
assert_eq "acquire replaces corrupt numeric lock record" "0" "$RC_MAL_ACQUIRE"
assert_true "acquire lock epoch payload never evaluated" test ! -e "$ARITH_MARKER"
wl release "$MAL_ACQUIRE_PATH"

# Portable identity is conservative across case-insensitive macOS vaults.
# Exact v1 SHA-1 filenames remain intact, but aliases cannot hold simultaneous
# records even while this test runs on a case-sensitive Linux filesystem.
CASE_PATH="wiki/concepts/PortableCase.md"
CASE_ALIAS="wiki/concepts/portablecase.md"
wl acquire "$CASE_PATH" >/dev/null
RC_CASE_ALIAS=$( (wl acquire "$CASE_ALIAS" >/dev/null 2>&1); echo $? )
assert_eq "casefold alias shares the held-lock namespace" "75" "$RC_CASE_ALIAS"
wl release "$CASE_PATH"

UNICODE_PATH=$'wiki/concepts/Stra\303\237e.md'
UNICODE_ALIAS="wiki/concepts/STRASSE.md"
wl acquire "$UNICODE_PATH" >/dev/null
RC_UNICODE_ALIAS=$( (wl acquire "$UNICODE_ALIAS" >/dev/null 2>&1); echo $? )
assert_eq "Unicode casefold alias shares the held-lock namespace" "75" "$RC_UNICODE_ALIAS"
wl release "$UNICODE_PATH"

# The retired shell meta-lock is no longer a control surface. A hostile legacy
# record there is ignored, left unchanged, and never reaches arithmetic.
mkdir -p "$SANDBOX/.vault-meta/.wiki-lock.meta.d"
printf '123 %s attacker-token\n' "$MALICIOUS_DECIMAL" \
  > "$SANDBOX/.vault-meta/.wiki-lock.meta.d/owner"
RC_META_PAYLOAD=$( (wl list >/dev/null 2>&1); echo $? )
assert_eq "retired meta-lock record is ignored" "0" "$RC_META_PAYLOAD"
assert_true "retired meta-lock payload never evaluated" test ! -e "$ARITH_MARKER"
assert_true "retired meta-lock record is not mutated" test -f "$SANDBOX/.vault-meta/.wiki-lock.meta.d/owner"
rm -f "$SANDBOX/.vault-meta/.wiki-lock.meta.d/owner"
rmdir "$SANDBOX/.vault-meta/.wiki-lock.meta.d"

# Runtime metadata must never follow vault-controlled symlinks outside the
# selected vault. Test both the top-level metadata directory and the lock leaf.
SYMLINK_CASE="$SANDBOX/symlink-case"
SYMLINK_OUTSIDE="$SANDBOX/symlink-outside"
mkdir -p "$SYMLINK_CASE" "$SYMLINK_OUTSIDE"
ln -s "$SYMLINK_OUTSIDE" "$SYMLINK_CASE/.vault-meta"
RC_META_SYMLINK=$( (WIKI_LOCK_VAULT="$SYMLINK_CASE" bash "$LOCK_SH" list >/dev/null 2>&1); echo $? )
assert_eq "symlinked vault metadata rejected" "3" "$RC_META_SYMLINK"
assert_eq "symlinked vault metadata causes no outside writes" "0" "$(find "$SYMLINK_OUTSIDE" -mindepth 1 | awk 'END { print NR + 0 }')"

META_SENTINEL="$SYMLINK_OUTSIDE/sentinel"
printf 'outside-must-not-change\n' > "$META_SENTINEL"
META_SENTINEL_BEFORE=$(cksum < "$META_SENTINEL")
RC_META_RELEASE=$( (WIKI_LOCK_VAULT="$SYMLINK_CASE" bash "$LOCK_SH" release wiki/Page.md >/dev/null 2>&1); echo $? )
assert_eq "release rejects symlinked vault metadata" "3" "$RC_META_RELEASE"
assert_eq "release leaves metadata symlink target unchanged" "$META_SENTINEL_BEFORE" "$(cksum < "$META_SENTINEL")"

LOCK_SYMLINK_CASE="$SANDBOX/lock-symlink-case"
LOCK_SYMLINK_OUTSIDE="$SANDBOX/lock-symlink-outside"
mkdir -p "$LOCK_SYMLINK_CASE/.vault-meta" "$LOCK_SYMLINK_OUTSIDE"
ln -s "$LOCK_SYMLINK_OUTSIDE" "$LOCK_SYMLINK_CASE/.vault-meta/locks"
RC_LOCK_SYMLINK=$( (WIKI_LOCK_VAULT="$LOCK_SYMLINK_CASE" bash "$LOCK_SH" list >/dev/null 2>&1); echo $? )
assert_eq "symlinked legacy lock directory rejected" "3" "$RC_LOCK_SYMLINK"
assert_eq "symlinked legacy lock directory causes no outside writes" "0" "$(find "$LOCK_SYMLINK_OUTSIDE" -mindepth 1 | awk 'END { print NR + 0 }')"

LOCK_SENTINEL="$LOCK_SYMLINK_OUTSIDE/sentinel"
printf 'outside-locks-must-not-change\n' > "$LOCK_SENTINEL"
LOCK_SENTINEL_BEFORE=$(cksum < "$LOCK_SENTINEL")
RC_LOCK_RELEASE=$( (WIKI_LOCK_VAULT="$LOCK_SYMLINK_CASE" bash "$LOCK_SH" release wiki/Page.md >/dev/null 2>&1); echo $? )
assert_eq "release rejects symlinked legacy lock directory" "3" "$RC_LOCK_RELEASE"
assert_eq "release leaves lock-directory symlink target unchanged" "$LOCK_SENTINEL_BEFORE" "$(cksum < "$LOCK_SENTINEL")"
RC_LOCK_CLEAR=$( (WIKI_LOCK_VAULT="$LOCK_SYMLINK_CASE" bash "$LOCK_SH" clear-stale --max-age 0 >/dev/null 2>&1); echo $? )
assert_eq "clear-stale rejects symlinked legacy lock directory" "3" "$RC_LOCK_CLEAR"
assert_eq "clear-stale leaves lock-directory symlink target unchanged" "$LOCK_SENTINEL_BEFORE" "$(cksum < "$LOCK_SENTINEL")"

# A lock-leaf symlink is unlinked as a directory entry; its target is never
# opened, truncated, or removed.
LEAF_CASE="$SANDBOX/leaf-symlink-case"
LEAF_OUTSIDE="$SANDBOX/leaf-symlink-outside"
LEAF_PATH="wiki/concepts/Leaf.md"
LEAF_NAME="$(lock_digest "$LEAF_PATH").lock"
mkdir -p "$LEAF_CASE/.vault-meta/locks" "$LEAF_OUTSIDE"
printf 'outside-leaf-must-not-change\n' > "$LEAF_OUTSIDE/record"
ln -s "$LEAF_OUTSIDE/record" "$LEAF_CASE/.vault-meta/locks/$LEAF_NAME"
LEAF_BEFORE=$(cksum < "$LEAF_OUTSIDE/record")
RC_LEAF_RELEASE=$( (WIKI_LOCK_VAULT="$LEAF_CASE" bash "$LOCK_SH" release "$LEAF_PATH" >/dev/null 2>&1); echo $? )
assert_eq "release safely removes a lock-leaf symlink" "0" "$RC_LEAF_RELEASE"
assert_true "release removes only the lock-leaf directory entry" test ! -e "$LEAF_CASE/.vault-meta/locks/$LEAF_NAME"
assert_eq "release leaves lock-leaf target unchanged" "$LEAF_BEFORE" "$(cksum < "$LEAF_OUTSIDE/record")"

# ── stress: 10 unique paths all acquire cleanly ──────────────────────────────
i=1
while [ "$i" -le 10 ]; do
  wl acquire "wiki/stress/page-$i.md" >/dev/null
  rc=$?
  if [ $rc -ne 0 ]; then
    echo "FAIL stress acquire $i: rc=$rc"
    FAIL=$((FAIL + 1))
    break
  fi
  i=$((i + 1))
done
LIST_COUNT=$(wl list | awk 'END { print NR + 0 }')
assert_eq "10 unique paths all acquired" "10" "$LIST_COUNT"
wl clear-stale --max-age 0 >/dev/null

# The deprecated helper must not fall back to its product installation.
RC_PRODUCT=$( (unset WIKI_LOCK_VAULT CLAUDE_OBSIDIAN_VAULT; cd "$ROOT" || exit; bash "$LOCK_SH" list >/dev/null 2>&1); echo $? )
assert_eq "product tree rejected as lock vault" "2" "$RC_PRODUCT"

# ── summary ──────────────────────────────────────────────────────────────────
echo ""
echo "Pass: $PASS  Fail: $FAIL"
if [ $FAIL -gt 0 ]; then
  exit 1
fi
echo "All wiki-lock tests passed."
