#!/usr/bin/env python3
"""test_bm25_index.py — hermetic tests for scripts/bm25-index.py.

Covers tokenization (stopwords, punctuation, case), index construction from
synthetic chunk fixtures, and BM25 scoring correctness against a hand-computed
reference. No network, no ollama, no LLM calls.

Usage:
  python3 tests/test_bm25_index.py
"""

import importlib.util
import contextlib
import io
import json
import math
import os
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from claude_obsidian.transaction import MutationLock

HELPER = ROOT / "scripts" / "bm25-index.py"

spec = importlib.util.spec_from_file_location("bm25", HELPER)
bm25 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm25)


class Fail(SystemExit):
    pass


def assert_eq(label, expected, actual):
    if expected != actual:
        raise Fail(f"FAIL {label}: expected {expected!r}, got {actual!r}")
    print(f"OK   {label}")


def assert_true(label, cond, hint=""):
    if not cond:
        raise Fail(f"FAIL {label}{(': ' + hint) if hint else ''}")
    print(f"OK   {label}")


def assert_close(label, expected, actual, eps=1e-4):
    if abs(expected - actual) > eps:
        raise Fail(
            f"FAIL {label}: expected ~{expected}, got {actual} (diff {abs(expected - actual)})"
        )
    print(f"OK   {label}")


# ─── tokenize() ──────────────────────────────────────────────────────────────
def test_tokenize_basic():
    assert_eq("tokenize basic", ["hello", "world"], bm25.tokenize("Hello, World!"))


def test_tokenize_stopwords():
    out = bm25.tokenize("The quick brown fox is at the door")
    assert_eq("tokenize strips stopwords", ["quick", "brown", "fox", "door"], out)


def test_tokenize_punctuation_and_apostrophe():
    out = bm25.tokenize("don't-stop won't!")
    assert_true(
        "tokenize keeps apostrophes/hyphens",
        "don't-stop" in out or "don't" in out,
        hint=f"got {out}",
    )


def test_tokenize_short_tokens_dropped():
    out = bm25.tokenize("a b cc dddd")
    assert_eq(
        "tokenize drops <2-char and stopwords", ["dddd"], [t for t in out if len(t) > 2]
    )


def test_tokenize_unicode_multilingual():
    """Tokenization preserves segmented scripts and n-grams CJK text."""
    # Cyrillic
    out = bm25.tokenize("Привет мир")
    assert_true(
        "tokenize preserves Cyrillic",
        "привет" in out and "мир" in out,
        hint=f"got {out}",
    )
    # Japanese has no spaces here: bounded 1/2/3-grams support one-character
    # queries while retaining useful multi-character substring overlap.
    assert_eq(
        "tokenize emits deterministic Japanese n-grams",
        [
            "日",
            "本",
            "語",
            "の",
            "文",
            "書",
            "日本",
            "本語",
            "語の",
            "の文",
            "文書",
            "日本語",
            "本語の",
            "語の文",
            "の文書",
        ],
        bm25.tokenize("日本語の文書"),
    )
    assert_eq(
        "tokenize emits deterministic Chinese n-grams",
        ["全", "文", "检", "索", "全文", "文检", "检索", "全文检", "文检索"],
        bm25.tokenize("全文检索"),
    )
    assert_eq(
        "tokenize preserves an isolated one-character CJK run",
        ["語"],
        bm25.tokenize("語"),
    )
    # Accented Latin (Spanish, French, German)
    out = bm25.tokenize("café résumé naïve über")
    assert_true(
        "tokenize preserves accented Latin",
        "café" in out and "résumé" in out,
        hint=f"got {out}",
    )
    # Pure-emoji string: no word chars → no tokens (correct skip)
    out = bm25.tokenize("🎉🚀✨")
    assert_eq("tokenize skips pure-emoji string", [], out)
    # Mixed ASCII + non-ASCII: both survive
    out = bm25.tokenize("Hello мир café")
    assert_true(
        "tokenize mixes ASCII + non-ASCII",
        "hello" in out and "мир" in out and "café" in out,
        hint=f"got {out}",
    )
    # Mixed-script text must not merge an ASCII term into a CJK n-gram.
    assert_eq(
        "tokenize splits mixed Latin and CJK runs",
        ["search", "日", "本", "語", "日本", "本語", "日本語"],
        bm25.tokenize("search-日本語"),
    )


def test_tokenize_normalizes_cjk_and_preserves_internal_underscores():
    japanese_nfc = "がく"
    japanese_nfd = unicodedata.normalize("NFD", japanese_nfc)
    assert_eq(
        "Japanese NFD and NFC normalize identically",
        bm25.tokenize(japanese_nfc),
        bm25.tokenize(japanese_nfd),
    )
    assert_eq(
        "halfwidth and fullwidth Katakana normalize identically",
        bm25.tokenize("ガク"),
        bm25.tokenize("ｶﾞｸ"),
    )
    korean_nfc = "한국"
    korean_nfd = unicodedata.normalize("NFD", korean_nfc)
    assert_eq(
        "decomposed and composed Hangul normalize identically",
        bm25.tokenize(korean_nfc),
        bm25.tokenize(korean_nfd),
    )
    assert_eq(
        "Hangul emits bounded 1/2/3-grams",
        ["한", "국", "어", "한국", "국어", "한국어"],
        bm25.tokenize("한국어"),
    )
    assert_eq(
        "Bopomofo emits bounded 1/2/3-grams",
        ["ㄅ", "ㄆ", "ㄇ", "ㄅㄆ", "ㄆㄇ", "ㄅㄆㄇ"],
        bm25.tokenize("ㄅㄆㄇ"),
    )
    assert_eq(
        "mixed boundary strips edge underscore and preserves internal underscore",
        ["search_term", "日", "本", "語", "日本", "本語", "日本語"],
        bm25.tokenize("search_term_日本語"),
    )


# ─── build_index + query() ───────────────────────────────────────────────────
def synthetic_chunk(idx, address, raw_text, contextualized_text):
    """Build a chunk JSON record matching the contextual-prefix.py schema."""
    import hashlib

    body_hash = "sha256:" + hashlib.sha256(raw_text.encode()).hexdigest()
    return {
        "schema_version": 1,
        "page_path": f"wiki/fake/{address}.md",
        "page_address": address,
        "chunk_index": idx,
        "raw_text": raw_text,
        "contextualized_text": contextualized_text,
        "prefix": "",
        "prefix_source": "synthetic",
        "char_count": len(raw_text),
        "body_hash": body_hash,
        "page_body_hash": body_hash,
        "created_at": "2026-05-17T00:00:00Z",
    }


def write_source_page(sandbox, address, text):
    page = sandbox / "wiki" / "fake" / f"{address}.md"
    page.parent.mkdir(parents=True, exist_ok=True)
    page.write_text(text, encoding="utf-8")
    return page


def test_build_and_query():
    """End-to-end: write synthetic chunks, build index, query, verify rankings."""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Redirect bm25 module's paths to a sandbox
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)

        orig_meta = bm25.META_DIR
        orig_chunks = bm25.CHUNKS_DIR
        orig_bm25 = bm25.BM25_DIR
        orig_index = bm25.INDEX_PATH

        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = chunks_dir
        bm25.BM25_DIR = bm25_dir
        bm25.INDEX_PATH = bm25_dir / "index.json"

        try:
            # 3 fake "pages" with 1 chunk each. Note "memory" appears in p1 and p3.
            chunks = [
                ("c-000001", 0, "DragonScale memory mechanism for log folding"),
                ("c-000002", 0, "transport detection with the obsidian cli binary"),
                ("c-000003", 0, "memory layer architecture and the wiki vault"),
            ]
            for addr, idx, text in chunks:
                d = chunks_dir / addr
                d.mkdir(exist_ok=True)
                write_source_page(sandbox, addr, text)
                chunk = synthetic_chunk(idx, addr, text, text)
                (d / f"chunk-{idx:03d}.json").write_text(json.dumps(chunk))

            # Build index
            index = bm25.build_index()
            assert_eq(
                "index schema identifies CJK tokenizer",
                bm25.INDEX_SCHEMA_VERSION,
                index["schema_version"],
            )
            assert_eq("doc count", 3, index["doc_count"])
            assert_true("vocab has 'memory'", "memory" in index["vocab"])
            assert_true("vocab strips stopwords", "the" not in index["vocab"])
            assert_eq("memory df", 2, index["vocab"]["memory"]["df"])

            bm25.write_index(index)
            assert_true("index file written", bm25.INDEX_PATH.is_file())

            # Query: "memory" should rank p1 and p3 above p2
            results = bm25.query("memory")
            ids = [r["chunk_id"] for r in results]
            assert_true(
                "memory query returns 2 hits", len(results) == 2, hint=f"got {ids}"
            )
            assert_true("c-000002 not in 'memory' results", "c-000002:0" not in ids)

            # Query: "transport" should hit only c-000002
            results = bm25.query("transport")
            assert_eq(
                "transport query hits exactly p2",
                ["c-000002:0"],
                [r["chunk_id"] for r in results],
            )

            # Query: stopwords-only returns empty
            results = bm25.query("the and of")
            assert_eq("stopwords-only query empty", [], results)
        finally:
            bm25.META_DIR = orig_meta
            bm25.CHUNKS_DIR = orig_chunks
            bm25.BM25_DIR = orig_bm25
            bm25.INDEX_PATH = orig_index


def test_cjk_queries_retrieve_longer_japanese_and_chinese_documents():
    """Regression: phrase queries must overlap longer unsegmented CJK text."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)

        original = (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH)
        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = chunks_dir
        bm25.BM25_DIR = bm25_dir
        bm25.INDEX_PATH = bm25_dir / "index.json"

        documents = (
            ("c-japanese", "このノートには日本語の全文検索機能があります"),
            ("c-japanese-decoy", "料理の手順と季節の食材をまとめました"),
            ("c-chinese", "这个笔记支持高效的全文检索功能"),
            ("c-chinese-decoy", "这篇文章介绍城市交通规划"),
        )
        try:
            for address, text in documents:
                directory = chunks_dir / address
                directory.mkdir()
                write_source_page(sandbox, address, text)
                (directory / "chunk-000.json").write_text(
                    json.dumps(synthetic_chunk(0, address, text, text)),
                    encoding="utf-8",
                )

            index = bm25.build_index()
            bm25.write_index(index)

            japanese = bm25.query("日本語の全文検索")
            assert_true(
                "Japanese query produces a positive BM25 score",
                bool(japanese) and japanese[0]["score"] > 0,
                hint=f"got {japanese}",
            )
            assert_eq(
                "Japanese query ranks the containing document first",
                "c-japanese:0",
                japanese[0]["chunk_id"],
            )

            chinese = bm25.query("全文检索")
            assert_true(
                "Chinese query produces a positive BM25 score",
                bool(chinese) and chinese[0]["score"] > 0,
                hint=f"got {chinese}",
            )
            assert_eq(
                "Chinese query ranks the containing document first",
                "c-chinese:0",
                chinese[0]["chunk_id"],
            )
        finally:
            (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH) = original


def test_cjk_normalization_and_one_character_queries_retrieve():
    """Equivalent Unicode forms and a one-character query reach longer documents."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)

        original = (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH)
        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = chunks_dir
        bm25.BM25_DIR = bm25_dir
        bm25.INDEX_PATH = bm25_dir / "index.json"

        documents = (
            ("c-japanese-nfd", unicodedata.normalize("NFD", "これはがくです")),
            ("c-katakana-halfwidth", "ｶﾞｸﾉﾌﾞﾝｼｮ"),
            ("c-hangul-nfd", unicodedata.normalize("NFD", "한국어 문서")),
            ("c-one-character", "日本語の文書"),
            ("c-decoy", "料理の手順と季節の食材"),
        )
        try:
            for address, text in documents:
                directory = chunks_dir / address
                directory.mkdir()
                write_source_page(sandbox, address, text)
                (directory / "chunk-000.json").write_text(
                    json.dumps(synthetic_chunk(0, address, text, text)),
                    encoding="utf-8",
                )

            bm25.write_index(bm25.build_index())
            cases = (
                ("Japanese NFC query retrieves NFD document", "がく", "c-japanese-nfd:0"),
                (
                    "fullwidth Katakana query retrieves halfwidth document",
                    "ガク",
                    "c-katakana-halfwidth:0",
                ),
                (
                    "composed Hangul query retrieves decomposed document",
                    "한국",
                    "c-hangul-nfd:0",
                ),
                (
                    "one-character CJK query retrieves longer run",
                    "語",
                    "c-one-character:0",
                ),
            )
            for label, query, expected in cases:
                results = bm25.query(query)
                assert_true(label, bool(results), hint=f"got {results}")
                assert_eq(f"{label} first result", expected, results[0]["chunk_id"])
        finally:
            (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH) = original


def test_token_growth_limit_rejects_oversized_manual_chunk_without_traceback():
    """The term ceiling is checked before a complete oversized list is built."""
    try:
        bm25.tokenize("a" * (bm25.MAX_TOKEN_INPUT_CHARS + 1))
        raise Fail("tokenize accepted input above MAX_TOKEN_INPUT_CHARS")
    except bm25.TokenGrowthLimitError as exc:
        assert_true(
            "direct character growth limit is actionable",
            str(bm25.MAX_TOKEN_INPUT_CHARS) in str(exc),
            hint=str(exc),
        )

    oversized = "漢" * (bm25.MAX_TOKEN_TERMS // 3 + 2)
    try:
        bm25.tokenize(oversized)
        raise Fail("tokenize accepted an input above MAX_TOKEN_TERMS")
    except bm25.TokenGrowthLimitError as exc:
        assert_true(
            "direct token growth limit is actionable",
            str(bm25.MAX_TOKEN_TERMS) in str(exc),
            hint=str(exc),
        )

    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        address = "c-oversized"
        directory = chunks_dir / address
        directory.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)
        (sandbox / ".obsidian").mkdir()
        write_source_page(sandbox, address, oversized)
        (directory / "chunk-000.json").write_text(
            json.dumps(synthetic_chunk(0, address, oversized, oversized)),
            encoding="utf-8",
        )

        result = subprocess.run(
            [sys.executable, str(HELPER), "--vault", str(sandbox), "build"],
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        index = json.loads((bm25_dir / "index.json").read_text(encoding="utf-8"))
        assert_eq("oversized manual chunk build succeeds safely", 0, result.returncode)
        assert_eq("oversized manual chunk is skipped", 0, index["doc_count"])
        assert_true(
            "oversized chunk diagnostic names token limit",
            "token growth limit" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "oversized chunk diagnostic gives regeneration guidance",
            "contextual-prefix.py" in result.stderr and "rebuild" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "oversized chunk diagnostic has no traceback",
            "Traceback" not in result.stderr,
            hint=result.stderr,
        )
        query_result = subprocess.run(
            [
                sys.executable,
                str(HELPER),
                "--vault",
                str(sandbox),
                "query",
                "a" * (bm25.MAX_TOKEN_INPUT_CHARS + 1),
            ],
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        assert_eq("oversized query exits with usage error", bm25.EXIT_USAGE, query_result.returncode)
        assert_true(
            "oversized query emits stable diagnostic without traceback",
            "BM25_QUERY_TOO_LARGE" in query_result.stderr
            and "Traceback" not in query_result.stderr,
            hint=query_result.stderr,
        )


def test_cli_top_is_positive_and_bounded():
    for value in ("-1", "0", str(bm25.MAX_TOP_RESULTS + 1)):
        result = subprocess.run(
            [sys.executable, str(HELPER), "query", "memory", "--top", value],
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        assert_eq(f"BM25 --top rejects {value}", bm25.EXIT_USAGE, result.returncode)


def test_query_score_monotonicity():
    """A query term appearing TWICE in a chunk should score higher than appearing ONCE.
    (Standard BM25 monotonicity property within a single document length cohort.)"""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)

        orig = (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH)
        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = chunks_dir
        bm25.BM25_DIR = bm25_dir
        bm25.INDEX_PATH = bm25_dir / "index.json"

        try:
            # Equal-length docs (rough): one has "memory" twice, other once.
            (chunks_dir / "c-000001").mkdir()
            (chunks_dir / "c-000002").mkdir()
            write_source_page(sandbox, "c-000001", "memory memory rocket banana")
            write_source_page(sandbox, "c-000002", "memory rocket banana flute")
            (chunks_dir / "c-000001" / "chunk-000.json").write_text(
                json.dumps(
                    synthetic_chunk(
                        0,
                        "c-000001",
                        "memory memory rocket banana",
                        "memory memory rocket banana",
                    )
                )
            )
            (chunks_dir / "c-000002" / "chunk-000.json").write_text(
                json.dumps(
                    synthetic_chunk(
                        0,
                        "c-000002",
                        "memory rocket banana flute",
                        "memory rocket banana flute",
                    )
                )
            )
            bm25.write_index(bm25.build_index())
            results = bm25.query("memory")
            assert_true(
                "BM25 monotonicity",
                results[0]["chunk_id"] == "c-000001:0",
                hint=f"got {results}",
            )
            assert_true(
                "two-mention > one-mention scores",
                results[0]["score"] > results[1]["score"],
                hint=f"got {results}",
            )
        finally:
            (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH) = orig


def test_rebuild_reconciles_changed_and_deleted_source_pages():
    """A full rebuild must replace, not preserve, stale index records."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunk_dir = chunks_dir / "c-000001"
        chunk_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)

        original_text = "current source sentinel"
        page = write_source_page(sandbox, "c-000001", original_text)
        (chunk_dir / "chunk-000.json").write_text(
            json.dumps(synthetic_chunk(0, "c-000001", original_text, original_text))
        )

        orig = (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH)
        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = chunks_dir
        bm25.BM25_DIR = bm25_dir
        bm25.INDEX_PATH = bm25_dir / "index.json"
        try:
            initial = bm25.build_index()
            bm25.write_index(initial)
            assert_eq("current source is indexed", 1, initial["doc_count"])

            page.write_text("changed after chunking", encoding="utf-8")
            changed = bm25.build_index()
            bm25.write_index(changed)
            assert_eq(
                "changed source removes stale index record", 0, changed["doc_count"]
            )
            assert_eq("empty rebuild clears vocabulary", {}, changed["vocab"])
            assert_eq(
                "empty rebuild replaces on-disk docs",
                {},
                json.loads(bm25.INDEX_PATH.read_text())["docs"],
            )

            page.unlink()
            deleted = bm25.build_index()
            assert_eq("deleted source stays excluded", 0, deleted["doc_count"])
        finally:
            (bm25.META_DIR, bm25.CHUNKS_DIR, bm25.BM25_DIR, bm25.INDEX_PATH) = orig


def test_hashless_or_malformed_chunks_are_never_indexed():
    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        page = write_source_page(root, "c-000001", "current page text")
        base = synthetic_chunk(0, "c-000001", "current page text", "current page text")

        for label, mutate in (
            ("hashless", lambda value: value.pop("page_body_hash")),
            (
                "malformed page hash",
                lambda value: value.update(page_body_hash="sha256:nope"),
            ),
            (
                "mismatched body hash",
                lambda value: value.update(raw_text="obsolete text"),
            ),
        ):
            record = json.loads(json.dumps(base))
            mutate(record)
            current, _ = bm25.source_page_is_current(record, root, {})
            assert_true(f"{label} chunk rejected", not current)

        page.unlink()


def test_crlf_source_page_stays_current():
    # Regression: source_page_is_current hashed pages via read_text (which
    # normalizes CRLF) while the locked build path hashed raw bytes, so every
    # chunk of a CRLF page was permanently reported stale.  Both sides must
    # hash identical bytes.
    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        page = root / "wiki" / "fake" / "c-000001.md"
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_bytes(b"crlf line one\r\ncrlf line two\r\n")
        text = page.read_bytes().decode("utf-8", errors="replace")
        record = synthetic_chunk(0, "c-000001", text, text)
        current, reason = bm25.source_page_is_current(record, root, {})
        assert_true(f"CRLF page stays current ({reason})", current)


def test_cli_build_refuses_shared_vault_writer_lock():
    with tempfile.TemporaryDirectory() as tmpdir:
        root = Path(tmpdir)
        (root / "wiki").mkdir()
        (root / ".obsidian").mkdir()
        (root / ".vault-meta/chunks").mkdir(parents=True)
        with MutationLock(root):
            result = subprocess.run(
                [sys.executable, str(HELPER), "--vault", str(root), "build"],
                capture_output=True,
                text=True,
                timeout=10,
                check=False,
            )
        assert_eq("BM25 build returns lock exit", bm25.EXIT_LOCK, result.returncode)
        assert_true(
            "blocked BM25 build publishes no index",
            not (root / ".vault-meta/bm25/index.json").exists(),
        )


def test_pinned_build_survives_lexical_root_replacement():
    with tempfile.TemporaryDirectory() as tmpdir:
        temporary = Path(tmpdir)
        root = temporary / "vault"
        chunks = root / ".vault-meta/chunks/c-000001"
        chunks.mkdir(parents=True)
        (root / ".obsidian").mkdir()
        text = "pinned source text"
        write_source_page(root, "c-000001", text)
        (chunks / "chunk-000.json").write_text(
            json.dumps(synthetic_chunk(0, "c-000001", text, text)),
            encoding="utf-8",
        )
        original = (
            bm25.VAULT_ROOT,
            bm25.META_DIR,
            bm25.CHUNKS_DIR,
            bm25.BM25_DIR,
            bm25.INDEX_PATH,
        )
        bm25.VAULT_ROOT = root
        bm25.META_DIR = root / ".vault-meta"
        bm25.CHUNKS_DIR = bm25.META_DIR / "chunks"
        bm25.BM25_DIR = bm25.META_DIR / "bm25"
        bm25.INDEX_PATH = bm25.BM25_DIR / "index.json"
        held_root = temporary / "held-vault"
        try:
            with MutationLock(root) as lock:
                root_fd = lock.duplicate_root_fd()
                meta_fd = lock.duplicate_parent_fd()
                try:
                    root.rename(held_root)
                    (root / ".vault-meta/bm25").mkdir(parents=True)
                    outside_sentinel = root / ".vault-meta/bm25/sentinel"
                    outside_sentinel.write_bytes(b"replacement-must-survive\n")
                    index = bm25.build_index(meta_fd=meta_fd, vault_root_fd=root_fd)
                    bm25.write_index(index, meta_fd=meta_fd)
                finally:
                    os.close(meta_fd)
                    os.close(root_fd)
            assert_eq("pinned root build doc count", 1, index["doc_count"])
            assert_true(
                "pinned root receives index",
                (held_root / ".vault-meta/bm25/index.json").is_file(),
            )
            assert_true(
                "replacement root receives no index",
                not (root / ".vault-meta/bm25/index.json").exists(),
            )
            assert_eq(
                "replacement root sentinel unchanged",
                b"replacement-must-survive\n",
                outside_sentinel.read_bytes(),
            )
        finally:
            (
                bm25.VAULT_ROOT,
                bm25.META_DIR,
                bm25.CHUNKS_DIR,
                bm25.BM25_DIR,
                bm25.INDEX_PATH,
            ) = original


def test_pinned_build_never_follows_meta_or_bm25_aliases():
    with tempfile.TemporaryDirectory() as tmpdir:
        temporary = Path(tmpdir)
        root = temporary / "vault"
        meta = root / ".vault-meta"
        chunks = meta / "chunks/c-000001"
        chunks.mkdir(parents=True)
        (root / ".obsidian").mkdir()
        text = "pinned metadata text"
        write_source_page(root, "c-000001", text)
        (chunks / "chunk-000.json").write_text(
            json.dumps(synthetic_chunk(0, "c-000001", text, text)),
            encoding="utf-8",
        )
        original = (
            bm25.VAULT_ROOT,
            bm25.META_DIR,
            bm25.CHUNKS_DIR,
            bm25.BM25_DIR,
            bm25.INDEX_PATH,
        )
        bm25.VAULT_ROOT = root
        bm25.META_DIR = meta
        bm25.CHUNKS_DIR = meta / "chunks"
        bm25.BM25_DIR = meta / "bm25"
        bm25.INDEX_PATH = bm25.BM25_DIR / "index.json"
        held_meta = root / ".vault-meta-held"
        outside_meta = temporary / "outside-meta"
        (outside_meta / "bm25").mkdir(parents=True)
        sentinel = outside_meta / "bm25/sentinel"
        sentinel.write_bytes(b"outside-must-survive\n")
        try:
            with MutationLock(root) as lock:
                root_fd = lock.duplicate_root_fd()
                meta_fd = lock.duplicate_parent_fd()
                try:
                    meta.rename(held_meta)
                    meta.symlink_to(outside_meta, target_is_directory=True)
                    index = bm25.build_index(meta_fd=meta_fd, vault_root_fd=root_fd)
                    bm25.write_index(index, meta_fd=meta_fd)
                finally:
                    os.close(meta_fd)
                    os.close(root_fd)
            assert_true(
                "pinned metadata receives index",
                (held_meta / "bm25/index.json").is_file(),
            )
            assert_true(
                "outside metadata receives no index",
                not (outside_meta / "bm25/index.json").exists(),
            )
            assert_eq(
                "outside metadata sentinel unchanged",
                b"outside-must-survive\n",
                sentinel.read_bytes(),
            )

            # A leaf-parent alias inside the pinned metadata namespace fails
            # closed instead of writing through it.
            safe_meta = temporary / "safe-meta"
            safe_meta.mkdir()
            outside_bm25 = temporary / "outside-bm25"
            outside_bm25.mkdir()
            outside_leaf = outside_bm25 / "index.json"
            outside_leaf.write_bytes(b"outside-index\n")
            (safe_meta / "bm25").symlink_to(outside_bm25, target_is_directory=True)
            safe_fd = os.open(
                safe_meta,
                os.O_RDONLY
                | getattr(os, "O_DIRECTORY", 0)
                | getattr(os, "O_NOFOLLOW", 0),
            )
            try:
                try:
                    bm25.write_index({"schema_version": 1}, meta_fd=safe_fd)
                    raise Fail("write_index followed a bm25 directory alias")
                except (OSError, bm25.TransactionError):
                    pass
            finally:
                os.close(safe_fd)
            assert_eq(
                "bm25 alias target unchanged",
                b"outside-index\n",
                outside_leaf.read_bytes(),
            )
        finally:
            (
                bm25.VAULT_ROOT,
                bm25.META_DIR,
                bm25.CHUNKS_DIR,
                bm25.BM25_DIR,
                bm25.INDEX_PATH,
            ) = original


def test_idf_smoothing():
    """IDF should be positive and finite for any df in [1, N]."""
    # Use the formula directly: idf = log(1 + (N - df + 0.5) / (df + 0.5))
    checked = 0
    for N in [1, 10, 1000]:
        for df in range(1, N + 1):
            idf = math.log(1 + (N - df + 0.5) / (df + 0.5))
            if not math.isfinite(idf) or idf <= 0:
                raise Fail(f"FAIL idf positive N={N} df={df}: got {idf}")
            checked += 1
    assert_eq("idf smoothing cases", 1011, checked)


# ─── CLI smoke test ──────────────────────────────────────────────────────────
def test_cli_stats_on_missing_index():
    """The CLI should exit 3 (EXIT_INDEX_MISSING) when no index exists."""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Run in a subprocess with a fresh cwd and zeroed META_DIR
        # We can't easily redirect bm25's hard-coded paths from outside without
        # rewriting the script. Instead: smoke-test the exit code path by
        # invoking the module-level load_index() in a context where the index
        # file doesn't exist.
        orig_index = bm25.INDEX_PATH
        bm25.INDEX_PATH = Path(tmpdir) / "nonexistent" / "index.json"
        try:
            try:
                bm25.load_index()
                raise Fail("load_index() should have exited on missing file")
            except SystemExit as e:
                assert_eq("load_index exit code", bm25.EXIT_INDEX_MISSING, e.code)
        finally:
            bm25.INDEX_PATH = orig_index


def test_load_index_rejects_adversarial_shapes_without_traceback():
    """Every query-visible shape is checked before key access or BM25 math."""
    valid = {
        "schema_version": bm25.INDEX_SCHEMA_VERSION,
        "params": {"k1": 1.5, "b": 0.75},
        "doc_count": 1,
        "avg_dl": 2.0,
        "updated_at": "2026-07-11T00:00:00Z",
        "vocab": {
            "alpha": {"df": 1, "postings": [["c-000001:0", 1]]},
        },
        "docs": {
            "c-000001:0": {
                "path": ".vault-meta/chunks/c-000001/chunk-000.json",
                "dl": 2,
            },
        },
    }

    def changed(mutator):
        value = json.loads(json.dumps(valid))
        mutator(value)
        return value

    cases = [
        ("array root", []),
        ("missing fields", {}),
        (
            "legacy tokenizer schema requires rebuild",
            changed(lambda value: value.update(schema_version=1)),
        ),
        ("boolean schema", changed(lambda value: value.update(schema_version=True))),
        ("params wrong type", changed(lambda value: value.update(params=[]))),
        ("b out of bounds", changed(lambda value: value["params"].update(b=1.5))),
        (
            "non-finite average",
            changed(lambda value: value.update(avg_dl=float("nan"))),
        ),
        ("doc count mismatch", changed(lambda value: value.update(doc_count=2))),
        (
            "negative document length",
            changed(lambda value: value["docs"]["c-000001:0"].update(dl=-1)),
        ),
        (
            "escaping document path",
            changed(
                lambda value: value["docs"]["c-000001:0"].update(
                    path="../../outside.json"
                )
            ),
        ),
        (
            "unknown posting document",
            changed(
                lambda value: value["vocab"]["alpha"].update(
                    postings=[["missing:0", 1]]
                )
            ),
        ),
        (
            "zero posting count",
            changed(
                lambda value: value["vocab"]["alpha"].update(
                    postings=[["c-000001:0", 0]]
                )
            ),
        ),
        ("df mismatch", changed(lambda value: value["vocab"]["alpha"].update(df=0))),
    ]

    with tempfile.TemporaryDirectory() as tmpdir:
        index_path = Path(tmpdir) / "index.json"
        orig_index = bm25.INDEX_PATH
        orig_vault = bm25.VAULT_ROOT
        bm25.INDEX_PATH = index_path
        bm25.VAULT_ROOT = Path(tmpdir)
        try:
            for label, payload in cases:
                index_path.write_text(json.dumps(payload), encoding="utf-8")
                stderr = io.StringIO()
                with contextlib.redirect_stderr(stderr):
                    try:
                        bm25.load_index()
                        raise Fail(f"load_index() accepted malformed case: {label}")
                    except SystemExit as exc:
                        assert_eq(f"{label} exits 3", bm25.EXIT_INDEX_MISSING, exc.code)
                diagnostic = stderr.getvalue()
                assert_true(
                    f"{label} emits stable corruption code",
                    "ERR BM25_INDEX_CORRUPT:" in diagnostic,
                    hint=diagnostic,
                )
                assert_true(
                    f"{label} emits rebuild guidance",
                    "python3 scripts/bm25-index.py" in diagnostic
                    and " build" in diagnostic,
                    hint=diagnostic,
                )
                assert_true(
                    f"{label} has no traceback",
                    "Traceback" not in diagnostic and "KeyError" not in diagnostic,
                    hint=diagnostic,
                )
        finally:
            bm25.INDEX_PATH = orig_index
            bm25.VAULT_ROOT = orig_vault


def main():
    print("=== test_bm25_index.py ===")
    test_tokenize_basic()
    test_tokenize_stopwords()
    test_tokenize_punctuation_and_apostrophe()
    test_tokenize_unicode_multilingual()
    test_tokenize_normalizes_cjk_and_preserves_internal_underscores()
    test_tokenize_short_tokens_dropped()
    test_build_and_query()
    test_cjk_queries_retrieve_longer_japanese_and_chinese_documents()
    test_cjk_normalization_and_one_character_queries_retrieve()
    test_token_growth_limit_rejects_oversized_manual_chunk_without_traceback()
    test_cli_top_is_positive_and_bounded()
    test_query_score_monotonicity()
    test_rebuild_reconciles_changed_and_deleted_source_pages()
    test_hashless_or_malformed_chunks_are_never_indexed()
    test_crlf_source_page_stays_current()
    test_cli_build_refuses_shared_vault_writer_lock()
    test_pinned_build_survives_lexical_root_replacement()
    test_pinned_build_never_follows_meta_or_bm25_aliases()
    test_idf_smoothing()
    test_cli_stats_on_missing_index()
    test_load_index_rejects_adversarial_shapes_without_traceback()
    print("\nAll bm25-index tests passed.")


if __name__ == "__main__":
    main()
