#!/usr/bin/env python3
"""fold-extract.py — parse wiki/log.md entries and produce extractive fold input.

Backs the `wiki-fold` skill. Split of responsibilities:

  code  — parses log entries, builds the children list and the Child Entries
          table. Deterministic, so the table has zero hallucination surface.
  model — writes Key Outcomes and Cross-entry Themes only, i.e. the part that
          genuinely needs cross-entry synthesis. One call per fold.

Every model-authored line then passes a hard extractive gate: identifiers,
numbers, and quoted spans in the output must appear verbatim in the source
entries. A single unsupported token fails the run rather than reaching a fold
draft. `--strict` additionally fails on unsupported bare integers.

This helper is read-only. It never writes to the vault: the wiki-fold skill
turns its JSON into one reviewed `fold` transaction.

Log format parsed (the format the vault log actually uses):

    ## 2026-08-14

    - **maintenance** | `hot.md` split — cache restored to spec
      - Pages created: [[Hot Cache Archive]]
      - ...

An "entry" is one `- **op** | title` bullet plus its indented body, NOT a
date heading — a single day commonly holds several operations.

Log bodies are sent to the model, so a non-localhost endpoint requires
--allow-remote-ollama, mirroring the guard in scripts/rerank.py.

Usage:
  fold-extract.py --k 4                     # newest 16 entries -> JSON on stdout
  fold-extract.py --vault PATH --k 4
  fold-extract.py --k 4 --model gem12:latest
  fold-extract.py --k 4 --no-model          # table only, no ollama call
  fold-extract.py --parse-only              # entry inventory, for debugging

Exit codes:
  0 — success
  2 — usage / bad arguments / vault selection failure
  3 — log file missing or no entries parsed
  4 — extractive verification failed (model asserted something not in source)
  5 — fewer entries available than 2^k requested
 10 — ollama unreachable (only when a model pass was requested)
"""

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

sys.dont_write_bytecode = True

PLUGIN_ROOT = Path(__file__).resolve().parent.parent
if str(PLUGIN_ROOT) not in sys.path:
    sys.path.insert(0, str(PLUGIN_ROOT))

from claude_obsidian.paths import VaultSelectionError, resolve_vault_root
from claude_obsidian.transaction import TransactionError, read_vault_regular

DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434"
DEFAULT_MODEL = "gem12:latest"
OLLAMA_TIMEOUT_SEC = 3
GENERATE_TIMEOUT_SEC = 900
LOG_RELATIVE = "wiki/log.md"

EXIT_OK = 0
EXIT_USAGE = 2
EXIT_NO_LOG = 3
EXIT_UNVERIFIED = 4
EXIT_SHORTFALL = 5
EXIT_NO_OLLAMA = 10

# `## 2026-08-14`
DATE_RE = re.compile(r"^##\s+(\d{4}-\d{2}-\d{2})\s*$")
# `- **query** | Scrap Mechanic — "what are the perks…"`
ENTRY_RE = re.compile(r"^-\s+\*\*([a-z][a-z-]*)\*\*\s*\|\s*(.+?)\s*$", re.IGNORECASE)
WIKILINK_RE = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]*)?\]\]")

PROMPT = """\
Summarise these wiki log entries.

Rules:
- Use ONLY facts stated in the entries below. Invent nothing.
- Copy numbers, file names, identifiers and quoted strings exactly.
- Cite the entry date in brackets at the end of each bullet, e.g. [2026-08-14].

Write exactly two sections and nothing else:

## Key Outcomes
(3 to 7 bullets)

## Cross-entry Themes
(0 to 4 bullets; each must cite at least two different dates. If there are
none, write exactly: No cross-entry themes identified; entries are independent
within this range.)

ENTRIES:
{body}
"""


def log(msg):
    print(msg, file=sys.stderr)


# ---------------------------------------------------------------- parsing


def parse_entries(text):
    """Return newest-first list of entry dicts.

    log.md is maintained newest-first, so file order is preserved as-is.
    """
    entries = []
    current_date = None
    cur = None

    for line in text.splitlines():
        m_date = DATE_RE.match(line)
        if m_date:
            if cur:
                entries.append(cur)
                cur = None
            current_date = m_date.group(1)
            continue

        m_entry = ENTRY_RE.match(line)
        if m_entry and current_date:
            if cur:
                entries.append(cur)
            cur = {
                "date": current_date,
                "op": m_entry.group(1).lower(),
                "title": m_entry.group(2).strip(),
                "body": [],
            }
            continue

        if cur is not None:
            # Indented continuation belongs to the entry; a new top-level
            # bullet or heading ends it.
            if line.startswith(("  ", "\t")) or not line.strip():
                cur["body"].append(line)
            else:
                entries.append(cur)
                cur = None

    if cur:
        entries.append(cur)
    return entries


def entry_text(e):
    return f"## {e['date']}\n- **{e['op']}** | {e['title']}\n" + "\n".join(e["body"])


# Vault convention: findings are marked, bookkeeping is not. Preferring a
# marked bullet keeps the Summary column on the result rather than on the
# "Rounds: 2 | Searches: 0" metrics line that usually comes first.
FINDING_MARKERS = ("✅", "❌", "⚠️", "⚠", "🔎")

# Lines that are pure bookkeeping, never a useful summary.
BOOKKEEPING_RE = re.compile(
    r"^(rounds|searches|web fetches|fetches|install files read|pages? (created|updated)|"
    r"source|address|location|children|range)\b",
    re.IGNORECASE,
)


def _clean_bullet(raw):
    s = raw.strip()
    if not s.startswith("-"):
        return None
    s = s.lstrip("- ").strip()
    s = re.sub(r"\[\[([^\]|]+)(?:\|[^\]]*)?\]\]", r"\1", s)
    s = re.sub(r"[*`]", "", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) >= 8 else None


def summarise_row(e):
    """Deterministic one-line summary for the Child Entries table.

    Preference order: a bullet carrying a finding marker, then any
    non-bookkeeping bullet, then the first bullet at all. No model involved,
    so this column cannot hallucinate.
    """
    cleaned = [c for c in (_clean_bullet(b) for b in e["body"]) if c]
    if not cleaned:
        return "ambiguous in source"

    def truncate(s):
        return (s[:157] + "...") if len(s) > 160 else s

    for s in cleaned:
        if any(m in s for m in FINDING_MARKERS):
            return truncate(s)
    for s in cleaned:
        if not BOOKKEEPING_RE.match(s):
            return truncate(s)
    return truncate(cleaned[0])


def pages_for(e):
    """Unique wikilink targets referenced by an entry, in first-seen order."""
    seen, out = set(), []
    for t in WIKILINK_RE.findall("\n".join(e["body"]) + " " + e["title"]):
        t = t.strip()
        if t and t not in seen:
            seen.add(t)
            out.append(t)
    return out


# ------------------------------------------------------- extractive gate

# Things a model must not invent: backticked spans, quoted spans, uuids,
# dotted filenames, snake_case / camelCase identifiers, and numbers.
TOKEN_PATTERNS = [
    re.compile(r"`([^`\n]+)`"),
    re.compile(r"\"([^\"\n]{3,})\""),
    re.compile(r"\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b"),
    re.compile(r"\b(\w+\.(?:md|py|sh|lua|json|shapeset|txt|csv|ps1))\b"),
    re.compile(r"\b([a-z]+_[a-z_]{2,})\b"),
    re.compile(r"\b([a-z]+[A-Z]\w+)\b"),
]
NUMBER_RE = re.compile(r"(?<![\w.-])(\d[\d,]*(?:\.\d+)?)(?![\w-])")

# Numbers a summary may legitimately introduce as prose.
NUMBER_ALLOWLIST = {"1", "2", "3", "4", "5", "6", "7"}


def _normalise(s):
    return re.sub(r"\s+", " ", s).strip()


def verify_extractive(output, source, strict=False):
    """Return a list of tokens asserted in `output` but absent from `source`."""
    src = _normalise(source)
    src_lower = src.lower()
    violations = []

    for pat in TOKEN_PATTERNS:
        for tok in pat.findall(output):
            tok = _normalise(tok)
            if len(tok) < 3:
                continue
            if tok in src or tok.lower() in src_lower:
                continue
            violations.append(tok)

    if strict:
        src_numbers = set(NUMBER_RE.findall(src.replace(",", "")))
        for num in NUMBER_RE.findall(output.replace(",", "")):
            if num in NUMBER_ALLOWLIST or num in src_numbers:
                continue
            violations.append(num)

    # stable, de-duplicated
    seen, out = set(), []
    for v in violations:
        if v not in seen:
            seen.add(v)
            out.append(v)
    return out


# ------------------------------------------------------------- ollama


def ollama_url(allow_remote):
    url = os.environ.get("OLLAMA_URL", DEFAULT_OLLAMA_URL).rstrip("/")
    if not allow_remote:
        host = urllib.parse.urlparse(url).hostname
        if host not in ("127.0.0.1", "localhost", "::1"):
            log(f"ERR: OLLAMA_URL={url} points off-localhost (host={host!r}).")
            log(
                "  Log bodies would leave this machine. Pass --allow-remote-ollama to override,"
            )
            log("  or unset OLLAMA_URL to use the local default (127.0.0.1:11434).")
            sys.exit(EXIT_USAGE)
    return url


def ollama_alive(url):
    try:
        req = urllib.request.Request(f"{url}/api/tags", method="GET")
        with urllib.request.urlopen(req, timeout=OLLAMA_TIMEOUT_SEC) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return True, [m.get("name", "") for m in data.get("models", [])]
    except (urllib.error.URLError, json.JSONDecodeError, OSError):
        return False, []


def generate(url, model, prompt):
    payload = json.dumps(
        {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": 0},
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        f"{url}/api/generate",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=GENERATE_TIMEOUT_SEC) as resp:
        return json.loads(resp.read().decode("utf-8")).get("response", "")


# --------------------------------------------------------------- main


def read_log(explicit_vault):
    """Return (log_text, display_path) or (None, display_path) when absent.

    The log is always read through the selected vault's confined path, so a
    vault selection failure or an escaping path fails before any parsing.
    """
    try:
        selection = resolve_vault_root(
            explicit_vault,
            start=Path.cwd(),
            plugin_root=PLUGIN_ROOT,
        )
    except VaultSelectionError as exc:
        log(f"ERR {exc.code}: {exc}")
        return None, None

    vault_root = selection.root
    display = f"{vault_root}/{LOG_RELATIVE}"
    try:
        payload = read_vault_regular(vault_root, LOG_RELATIVE)
    except TransactionError as exc:
        log(f"ERR {exc.code}: {exc}")
        return None, display
    if payload is None:
        return None, display
    return payload.decode("utf-8"), display


def main():
    p = argparse.ArgumentParser(description="Extract fold input from wiki/log.md")
    p.add_argument("--vault", help="explicit user vault root")
    p.add_argument("--k", type=int, default=4, help="batch exponent; batch size = 2^k")
    p.add_argument("--model", default=DEFAULT_MODEL)
    p.add_argument("--no-model", action="store_true", help="skip the ollama pass")
    p.add_argument(
        "--parse-only", action="store_true", help="print an entry inventory and exit"
    )
    p.add_argument(
        "--strict", action="store_true", help="also reject unsupported bare numbers"
    )
    p.add_argument(
        "--allow-remote-ollama",
        action="store_true",
        help="Accept non-localhost OLLAMA_URL (potential data exfil)",
    )
    args = p.parse_args()

    if args.k < 0 or args.k > 10:
        log("ERR: --k must be between 0 and 10")
        return EXIT_USAGE

    text, log_display = read_log(args.vault)
    if text is None:
        if log_display is None:
            return EXIT_USAGE
        log(f"ERR: log not found at {log_display}")
        return EXIT_NO_LOG

    entries = parse_entries(text)
    if not entries:
        log(f"ERR: no entries parsed from {log_display}")
        log("     Expected '## YYYY-MM-DD' headings with '- **op** | title' bullets.")
        return EXIT_NO_LOG

    if args.parse_only:
        print(f"entries: {len(entries)}")
        by_op = {}
        for e in entries:
            by_op[e["op"]] = by_op.get(e["op"], 0) + 1
        for op, n in sorted(by_op.items(), key=lambda kv: -kv[1]):
            print(f"  {op:<14} {n}")
        print(f"newest: {entries[0]['date']}  oldest: {entries[-1]['date']}")
        return EXIT_OK

    want = 2**args.k
    if len(entries) < want:
        log(f"ERR: need {want} entries for k={args.k}, log holds {len(entries)}")
        return EXIT_SHORTFALL

    batch = entries[:want]
    dates = sorted(e["date"] for e in batch)
    fold_id = f"fold-k{args.k}-from-{dates[0]}-to-{dates[-1]}-n{want}"
    source = "\n\n".join(entry_text(e) for e in batch)

    result = {
        "fold_id": fold_id,
        "batch_exponent": args.k,
        "entry_count": want,
        "entry_range": {"from": dates[0], "to": dates[-1]},
        "children": [
            {
                "date": e["date"],
                "op": e["op"],
                "title": e["title"],
                "pages": pages_for(e),
                "summary": summarise_row(e),
            }
            for e in batch
        ],
        "model": None,
        "model_output": None,
        "verification": None,
    }

    if not args.no_model:
        url = ollama_url(args.allow_remote_ollama)
        alive, models = ollama_alive(url)
        if not alive:
            log(f"ERR: ollama unreachable at {url}")
            log("     Start it, or pass --no-model to emit the table without synthesis.")
            return EXIT_NO_OLLAMA
        if args.model not in models:
            log(f"WARN: model {args.model!r} not in ollama list; attempting anyway")

        out = generate(url, args.model, PROMPT.format(body=source))
        violations = verify_extractive(out, source, strict=args.strict)

        result["model"] = args.model
        result["model_output"] = out
        result["verification"] = {
            "checked": True,
            "strict": args.strict,
            "violations": violations,
        }

        if violations:
            log(
                f"ERR: extractive verification FAILED — {len(violations)} unsupported token(s):"
            )
            for v in violations[:20]:
                log(f"  - {v!r}")
            if len(violations) > 20:
                log(f"  ... and {len(violations) - 20} more")
            log("     Nothing written. Re-run, lower the temperature, or use --no-model.")
            print(json.dumps(result, ensure_ascii=False, indent=2))
            return EXIT_UNVERIFIED

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return EXIT_OK


if __name__ == "__main__":
    sys.exit(main())
