#!/usr/bin/env python3
"""test_retrieve.py — hermetic tests for scripts/retrieve.py and scripts/rerank.py.

No network, no ollama, no LLM calls. Tests cover:
  - import_sibling resolves hyphenated module names
  - chunk_snippet truncation behavior
  - rerank.cosine math correctness
  - rerank.rerank() no-op behavior when ollama is unreachable
  - retrieve.py exit 10 (not provisioned) when chunks/index are missing
  - dedupe-by-page logic via integration smoke test on synthetic fixtures

Usage:
  python3 tests/test_retrieve.py
"""

import contextlib
import hashlib
import importlib.util
import io
import json
import os
import subprocess
import sys
import tempfile
import unittest.mock
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RETRIEVE = ROOT / "scripts" / "retrieve.py"
RERANK = ROOT / "scripts" / "rerank.py"
BM25 = ROOT / "scripts" / "bm25-index.py"


def import_script(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


retrieve = import_script("retrieve", RETRIEVE)
rerank = import_script("rerank", RERANK)
bm25 = import_script("bm25", BM25)


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


def assert_close(label, expected, actual, eps=1e-6):
    if abs(expected - actual) > eps:
        raise Fail(f"FAIL {label}: expected ~{expected}, got {actual}")
    print(f"OK   {label}")


def sha256_text(text):
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def sandbox_env(vault):
    """Let copied helpers import the real package while selecting the sandbox."""
    env = os.environ.copy()
    env["CLAUDE_OBSIDIAN_VAULT"] = str(vault)
    existing = env.get("PYTHONPATH", "")
    env["PYTHONPATH"] = str(ROOT) + (os.pathsep + existing if existing else "")
    return env


# ─── import_sibling ──────────────────────────────────────────────────────────
def test_import_sibling_resolves_hyphenated_names():
    """retrieve.import_sibling('bm25_index', 'bm25-index.py') must succeed."""
    mod = retrieve.import_sibling("bm25_index", "bm25-index.py")
    assert_true("import_sibling returns module", mod is not None)
    assert_true("module has tokenize()", callable(getattr(mod, "tokenize", None)))


# ─── chunk_snippet ───────────────────────────────────────────────────────────
def test_chunk_snippet_short():
    """Short chunks should pass through unchanged."""
    out = retrieve.chunk_snippet({"raw_text": "short text"}, max_chars=200)
    assert_eq("chunk_snippet short pass-through", "short text", out)


def test_chunk_snippet_truncates_with_ellipsis():
    """Long chunks should be truncated with an ellipsis."""
    long_text = "x" * 500
    out = retrieve.chunk_snippet({"raw_text": long_text}, max_chars=100)
    assert_true("snippet length under cap", len(out) <= 110, hint=f"len={len(out)}")
    assert_true("snippet ends with ellipsis", out.endswith("…"))


# ─── rerank.cosine() ─────────────────────────────────────────────────────────
def test_cosine_identical():
    assert_close(
        "cosine identical vectors", 1.0, rerank.cosine([1.0, 2.0, 3.0], [1.0, 2.0, 3.0])
    )


def test_cosine_orthogonal():
    assert_close("cosine orthogonal", 0.0, rerank.cosine([1.0, 0.0], [0.0, 1.0]))


def test_cosine_anti_parallel():
    assert_close("cosine anti-parallel", -1.0, rerank.cosine([1.0, 0.0], [-1.0, 0.0]))


def test_cosine_length_mismatch():
    """Mismatched vector lengths should return 0.0 (defensive, not crash)."""
    assert_close("cosine length mismatch", 0.0, rerank.cosine([1.0], [1.0, 2.0]))


def test_cosine_zero_vector():
    assert_close("cosine zero vector", 0.0, rerank.cosine([0.0, 0.0], [1.0, 2.0]))


def test_multilingual_model_default_and_validation():
    assert_eq(
        "multilingual Nomic v2 is the default",
        "nomic-embed-text-v2-moe",
        rerank.DEFAULT_MODEL,
    )
    for valid in (
        "nomic-embed-text-v2-moe",
        "nomic-embed-text:v1.5",
        "registry.example/library/nomic-embed-text:latest",
    ):
        assert_eq("valid model name round-trips", valid, rerank.validate_model_name(valid))
    for invalid in (
        "",
        "https://example.com/model",
        "model name",
        "namespace/../model",
        "x" * 256,
    ):
        try:
            rerank.validate_model_name(invalid)
            raise Fail(f"invalid model name accepted: {invalid!r}")
        except ValueError:
            print(f"OK   invalid model name rejected: {invalid!r}")


def test_model_availability_handles_exact_and_tagged_names():
    assert_true(
        "untagged model matches installed latest tag",
        rerank.model_is_available(
            "nomic-embed-text-v2-moe", ["nomic-embed-text-v2-moe:latest"]
        ),
    )
    assert_true(
        "exact tagged model matches",
        rerank.model_is_available(
            "nomic-embed-text:v1.5", ["nomic-embed-text:v1.5"]
        ),
    )
    assert_true(
        "different explicit tag does not match",
        not rerank.model_is_available(
            "nomic-embed-text:v1.5", ["nomic-embed-text:latest"]
        ),
    )
    assert_true(
        "untagged model does not match an arbitrary installed tag",
        not rerank.model_is_available(
            "nomic-embed-text", ["nomic-embed-text:v1.5"]
        ),
    )


def test_retrieval_top_arguments_are_positive_and_bounded():
    cases = (
        (RETRIEVE, ["query", "--top", "0"]),
        (RETRIEVE, ["query", "--bm25-top", "-1"]),
        (RERANK, ["query", "--candidates", "-", "--top", "1001"]),
    )
    for script, arguments in cases:
        result = subprocess.run(
            [sys.executable, str(script), *arguments],
            input="[]" if script == RERANK else None,
            capture_output=True,
            text=True,
            timeout=10,
            check=False,
        )
        assert_eq(f"{script.name} rejects invalid top bound", 2, result.returncode)


def test_embed_one_uses_current_single_input_ollama_api():
    class Response:
        def __enter__(self):
            return self

        def __exit__(self, *_args):
            return False

        @staticmethod
        def read(limit):
            assert_eq("embedding response read is bounded", 4 * 1024 * 1024, limit)
            return json.dumps({"embeddings": [[1.0, 2.0, 3.0]]}).encode()

    with unittest.mock.patch.object(
        rerank.urllib.request, "urlopen", return_value=Response()
    ) as request_call:
        vector = rerank.embed_one(
            "http://127.0.0.1:11434",
            "nomic-embed-text-v2-moe",
            "search_query: 日本語",
        )
    request = request_call.call_args.args[0]
    payload = json.loads(request.data)
    assert_eq(
        "current Ollama embed endpoint",
        "http://127.0.0.1:11434/api/embed",
        request.full_url,
    )
    assert_eq(
        "single-input Ollama payload",
        {
            "model": "nomic-embed-text-v2-moe",
            "input": "search_query: 日本語",
        },
        payload,
    )
    assert_eq("single embedding is unwrapped", [1.0, 2.0, 3.0], vector)


# ─── rerank.rerank() no-op fallback ──────────────────────────────────────────
def test_rerank_noop_when_ollama_unreachable():
    """When ollama is not reachable, rerank should pass candidates through with
    rerank_source='noop-no-ollama'. We force this by patching ollama_alive."""
    with unittest.mock.patch.object(rerank, "ollama_alive", return_value=(False, [])):
        candidates = [
            {"chunk_id": "c-001:0", "bm25_score": 7.5, "path": "fake/p1.json"},
            {"chunk_id": "c-002:0", "bm25_score": 5.1, "path": "fake/p2.json"},
        ]
        out = rerank.rerank("query", candidates, top_k=5)
        assert_eq(
            "rerank no-op preserves order",
            ["c-001:0", "c-002:0"],
            [c["chunk_id"] for c in out],
        )
        assert_true(
            "rerank no-op tags source",
            all(c.get("rerank_source") == "noop-no-ollama" for c in out),
        )
        assert_true(
            "rerank no-op copies score to rerank_score",
            all(c["rerank_score"] == c["bm25_score"] for c in out),
        )


def test_rerank_noop_when_model_missing():
    """When ollama is up but model isn't pulled, rerank should still no-op."""
    with unittest.mock.patch.object(
        rerank, "ollama_alive", return_value=(True, ["other-model"])
    ):
        candidates = [{"chunk_id": "c-001:0", "bm25_score": 5.0, "path": "x"}]
        out = rerank.rerank("query", candidates, top_k=5)
        assert_eq(
            "rerank no-op for missing model", "noop-no-model", out[0]["rerank_source"]
        )
        assert_eq(
            "missing-model fallback keeps BM25 score", 5.0, out[0]["rerank_score"]
        )


def test_rerank_truncates_to_top_k():
    with unittest.mock.patch.object(rerank, "ollama_alive", return_value=(False, [])):
        candidates = [
            {"chunk_id": f"c-{i:03}:0", "score": float(i), "path": "x"}
            for i in range(10)
        ]
        out = rerank.rerank("query", candidates, top_k=3)
        assert_eq("rerank truncates to top_k", 3, len(out))


def test_rerank_query_embed_failure_preserves_bm25():
    candidates = [
        {"chunk_id": "c-001:0", "bm25_score": 9.0, "path": "x"},
        {"chunk_id": "c-002:0", "bm25_score": 4.0, "path": "y"},
    ]
    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [rerank.DEFAULT_MODEL])
        ),
        unittest.mock.patch.object(rerank, "embed_one", side_effect=OSError("boom")),
    ):
        out = rerank.rerank("query", candidates, top_k=5)
    assert_eq(
        "query-embed failure preserves BM25 order",
        ["c-001:0", "c-002:0"],
        [c["chunk_id"] for c in out],
    )
    assert_eq(
        "query-embed failure preserves BM25 scores",
        [9.0, 4.0],
        [c["rerank_score"] for c in out],
    )


def test_rerank_document_failure_preserves_candidate_bm25_score():
    candidates = [
        {"chunk_id": "c-001:0", "bm25_score": 8.0, "path": "x"},
        {"chunk_id": "c-002:0", "bm25_score": 6.25, "path": "y"},
    ]
    chunks = [
        {
            "body_hash": "sha256:first",
            "contextualized_text": "first",
            "raw_text": "first",
        },
        {
            "body_hash": "sha256:second",
            "contextualized_text": "second",
            "raw_text": "second",
        },
    ]

    def fake_embed(url, model, text):
        if text.startswith("search_query: "):
            return [1.0, 2.0]
        if text == "search_document: first":
            return [2.0, 1.0]
        raise OSError("document embed failed")

    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [rerank.DEFAULT_MODEL])
        ),
        unittest.mock.patch.object(rerank, "embed_one", side_effect=fake_embed),
        unittest.mock.patch.object(rerank, "load_chunk", side_effect=chunks),
        unittest.mock.patch.object(rerank, "load_cache", return_value={}),
    ):
        out = rerank.rerank("query", candidates, top_k=2)
    assert_eq(
        "partial document failure restores BM25 order",
        ["c-001:0", "c-002:0"],
        [c["chunk_id"] for c in out],
    )
    assert_eq(
        "partial document failure restores all BM25 scores",
        [8.0, 6.25],
        [c["rerank_score"] for c in out],
    )
    assert_true(
        "document failure marks complete no-op",
        all(c["rerank_source"] == "noop-embed-error" for c in out),
    )


def test_rerank_missing_chunk_preserves_candidate_bm25_score():
    candidate = {"chunk_id": "c-001:0", "bm25_score": 3.5, "path": "missing"}
    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [rerank.DEFAULT_MODEL])
        ),
        unittest.mock.patch.object(rerank, "embed_one", return_value=[1.0, 2.0]),
        unittest.mock.patch.object(rerank, "load_chunk", return_value=None),
        unittest.mock.patch.object(rerank, "load_cache", return_value={}),
    ):
        out = rerank.rerank("query", [candidate], top_k=1)
    assert_eq("missing chunk keeps BM25 score", 3.5, out[0]["rerank_score"])
    assert_eq(
        "missing chunk is identified", "noop-missing-chunk", out[0]["rerank_source"]
    )


# ─── Nomic asymmetric task prefixes and cache scheme ──────────────────────
def test_with_task_prefix_contract():
    assert_eq(
        "Nomic query prefix",
        "search_query: question",
        rerank.with_task_prefix("question", "query", "nomic-embed-text"),
    )
    assert_eq(
        "Nomic document prefix",
        "search_document: passage",
        rerank.with_task_prefix("passage", "document", "nomic-embed-text:latest"),
    )
    assert_eq(
        "non-Nomic input remains raw",
        "question",
        rerank.with_task_prefix("question", "query", "mxbai-embed-large"),
    )
    try:
        rerank.with_task_prefix("text", "passage", "nomic-embed-text")
        raise Fail("with_task_prefix should reject an unknown role")
    except ValueError:
        print("OK   Nomic prefix rejects unknown role")


def test_rerank_sends_nomic_task_prefixes():
    sent = []

    def fake_embed(url, model, text):
        sent.append(text)
        return [1.0, 2.0, 3.0]

    chunk = {
        "body_hash": "sha256:deadbeef",
        "contextualized_text": "advisory locks are age-based",
        "raw_text": "advisory locks are age-based",
    }
    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [rerank.DEFAULT_MODEL])
        ),
        unittest.mock.patch.object(rerank, "embed_one", side_effect=fake_embed),
        unittest.mock.patch.object(rerank, "load_chunk", return_value=chunk),
        unittest.mock.patch.object(rerank, "load_cache", return_value={}),
        unittest.mock.patch.object(rerank, "save_cache"),
    ):
        rerank.rerank(
            "how does locking work",
            [{"chunk_id": "c-001:0", "bm25_score": 5.0, "path": "x"}],
            top_k=1,
        )
    assert_eq(
        "embedder receives asymmetric Nomic inputs",
        [
            "search_query: how does locking work",
            "search_document: advisory locks are age-based",
        ],
        sent,
    )


def test_selected_model_is_used_for_embeddings_cache_and_source():
    selected_model = "nomic-embed-text-v2-moe:latest"
    sent = []
    saved = {}

    def fake_embed(url, model, text):
        sent.append((model, text))
        return [1.0, 2.0, 3.0]

    def capture_cache(cache):
        saved.update(cache)

    chunk = {
        "body_hash": "sha256:deadbeef",
        "contextualized_text": "日本語の全文検索機能",
        "raw_text": "日本語の全文検索機能",
    }
    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [selected_model])
        ),
        unittest.mock.patch.object(rerank, "embed_one", side_effect=fake_embed),
        unittest.mock.patch.object(rerank, "load_chunk", return_value=chunk),
        unittest.mock.patch.object(rerank, "load_cache", return_value={}),
        unittest.mock.patch.object(rerank, "save_cache", side_effect=capture_cache),
    ):
        output = rerank.rerank(
            "日本語の検索",
            [{"chunk_id": "c-001:0", "bm25_score": 5.0, "path": "x"}],
            top_k=1,
            model=selected_model,
        )

    assert_true(
        "selected model reaches every embedding request",
        sent and all(model == selected_model for model, _ in sent),
        hint=repr(sent),
    )
    assert_eq(
        "CJK query receives Nomic prefix",
        "search_query: 日本語の検索",
        sent[0][1],
    )
    assert_true(
        "CJK document receives Nomic prefix",
        any(text == "search_document: 日本語の全文検索機能" for _, text in sent),
    )
    assert_true(
        "cache key contains exact selected model",
        saved and all(key.startswith(selected_model + ":") for key in saved),
        hint=repr(saved),
    )
    assert_eq(
        "rerank source contains exact selected model",
        f"cosine:{selected_model}",
        output[0]["rerank_source"],
    )


def test_peek_reports_selected_tagged_model():
    output = io.StringIO()
    selected_model = "nomic-embed-text-v2-moe"
    with (
        unittest.mock.patch.object(rerank, "configure_vault", return_value=True),
        unittest.mock.patch.object(
            rerank, "ollama_url", return_value="http://127.0.0.1:11434"
        ),
        unittest.mock.patch.object(
            rerank,
            "ollama_alive",
            return_value=(True, [selected_model + ":latest"]),
        ),
        contextlib.redirect_stdout(output),
    ):
        result = rerank.main(["query", "--peek", "--model", selected_model])
    payload = json.loads(output.getvalue())
    assert_eq("peek succeeds", rerank.EXIT_OK, result)
    assert_eq("peek reports selected model", selected_model, payload["model"])
    assert_true("peek recognizes installed tagged model", payload["model_present"])
    assert_eq(
        "peek reports exact strategy",
        f"cosine:{selected_model}",
        payload["strategy"],
    )


def test_embedding_cache_key_versions_model_and_scheme():
    input_hash = rerank.embedding_input_hash("search_document: passage")
    key = rerank.embedding_cache_key("nomic-embed-text", input_hash)
    assert_true(
        "cache key contains model", key.startswith("nomic-embed-text:"), hint=key
    )
    assert_true(
        "cache key contains Nomic scheme", rerank.NOMIC_EMBED_SCHEME in key, hint=key
    )
    assert_true(
        "old prefix-less cache key differs",
        key != f"nomic-embed-text:{input_hash}",
        hint=key,
    )
    assert_true(
        "model change invalidates cache key",
        key != rerank.embedding_cache_key("mxbai-embed-large", input_hash),
    )
    changed_input = rerank.embedding_input_hash(
        "search_document: updated context\n\npassage"
    )
    assert_true(
        "context change invalidates cache key",
        key != rerank.embedding_cache_key("nomic-embed-text", changed_input),
    )


def test_stale_prefixless_cache_is_not_reused():
    body_hash = "sha256:deadbeef"
    stale = {f"{rerank.DEFAULT_MODEL}:{body_hash}": [99.0, 99.0, 99.0]}
    embedded = []

    def fake_embed(url, model, text):
        embedded.append(text)
        return [1.0, 2.0, 3.0]

    chunk = {"body_hash": body_hash, "contextualized_text": "text", "raw_text": "text"}
    with (
        unittest.mock.patch.object(
            rerank, "ollama_alive", return_value=(True, [rerank.DEFAULT_MODEL])
        ),
        unittest.mock.patch.object(rerank, "embed_one", side_effect=fake_embed),
        unittest.mock.patch.object(rerank, "load_chunk", return_value=chunk),
        unittest.mock.patch.object(rerank, "load_cache", return_value=stale),
        unittest.mock.patch.object(rerank, "save_cache"),
    ):
        rerank.rerank("query", [{"chunk_id": "c-001:0", "score": 1.0, "path": "x"}], 1)
    assert_true(
        "old cache entry forces document re-embed",
        any(text.startswith("search_document: ") for text in embedded),
        hint=f"embedded={embedded}",
    )


def test_remote_ollama_remains_explicit_opt_in():
    with unittest.mock.patch.dict(os.environ, {"OLLAMA_URL": "https://example.com"}):
        try:
            rerank.ollama_url(False)
            raise Fail("remote OLLAMA_URL should require explicit consent")
        except SystemExit as e:
            assert_eq("remote Ollama default-deny exit", rerank.EXIT_USAGE, e.code)
        assert_eq(
            "remote Ollama explicit opt-in",
            "https://example.com",
            rerank.ollama_url(True),
        )

    for invalid in (
        "file:///etc/passwd",
        "ftp://localhost/resource",
        "http://user:secret@localhost:11434",
        "http://localhost:11434?token=secret",
    ):
        with unittest.mock.patch.dict(os.environ, {"OLLAMA_URL": invalid}):
            for allow_remote in (False, True):
                try:
                    rerank.ollama_url(allow_remote)
                    raise Fail(f"invalid OLLAMA_URL accepted: {invalid}")
                except SystemExit as e:
                    assert_eq(
                        "invalid Ollama scheme/authority exit",
                        rerank.EXIT_USAGE,
                        e.code,
                    )


def test_rerank_rejects_chunk_path_escape():
    assert_eq(
        "relative chunk escape rejected", None, rerank.load_chunk("../../outside.json")
    )
    assert_eq(
        "absolute chunk path rejected", None, rerank.load_chunk("/tmp/outside.json")
    )


# ─── retrieve.py CLI: exit 10 when not provisioned ────────────────────────────
def test_retrieve_exits_10_without_index():
    """End-to-end CLI test: with no .vault-meta/bm25/index.json, retrieve.py must exit 10."""
    with tempfile.TemporaryDirectory() as tmpdir:
        # Build a minimal vault layout under tmpdir
        sandbox = Path(tmpdir)
        (sandbox / ".vault-meta").mkdir()
        (sandbox / "wiki").mkdir()
        # Run product code against a separate vault. It should exit 10 because
        # no BM25 index exists, without treating the product root as storage.
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "test query",
            ],
            env=sandbox_env(ROOT),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("retrieve.py exit 10 when not provisioned", 10, result.returncode)
        assert_true(
            "retrieve.py prints friendly error",
            "no BM25 index" in result.stderr,
            hint=result.stderr[:200],
        )


def test_retrieve_validates_and_forwards_explicit_model():
    selected_model = "nomic-embed-text-v2-moe:latest"
    received = {}
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        chunks_dir = sandbox / ".vault-meta/chunks/c-000001"
        index_dir = sandbox / ".vault-meta/bm25"
        page = sandbox / "wiki/example.md"
        chunks_dir.mkdir(parents=True)
        index_dir.mkdir(parents=True)
        page.parent.mkdir(parents=True)

        page_text = "日本語の全文検索機能"
        chunk_text = "日本語の全文検索"
        page.write_text(page_text, encoding="utf-8")
        chunk_path = chunks_dir / "chunk-000.json"
        chunk_path.write_text(
            json.dumps(
                {
                    "page_address": "c-000001",
                    "page_path": "wiki/example.md",
                    "chunk_index": 0,
                    "raw_text": chunk_text,
                    "contextualized_text": chunk_text,
                    "body_hash": sha256_text(chunk_text),
                    "page_body_hash": sha256_text(page_text),
                }
            ),
            encoding="utf-8",
        )
        (index_dir / "index.json").write_text("{}\n", encoding="utf-8")

        class FakeBm25:
            EXIT_INDEX_MISSING = 3

            @staticmethod
            def configure_vault(_vault):
                return True

            @staticmethod
            def query(_query, top_k):
                del top_k
                return [
                    {
                        "chunk_id": "c-000001:0",
                        "score": 5.0,
                        "path": ".vault-meta/chunks/c-000001/chunk-000.json",
                        "body_hash": sha256_text(chunk_text),
                        "page_body_hash": sha256_text(page_text),
                    }
                ]

        class FakeReranker:
            DEFAULT_MODEL = rerank.DEFAULT_MODEL
            validate_model_name = staticmethod(rerank.validate_model_name)

            @staticmethod
            def configure_vault(_vault):
                return True

            @staticmethod
            def rerank(query, candidates, top_k, allow_remote, model):
                received.update(
                    {
                        "query": query,
                        "top_k": top_k,
                        "allow_remote": allow_remote,
                        "model": model,
                    }
                )
                for candidate in candidates:
                    candidate["rerank_score"] = 1.0
                    candidate["rerank_source"] = f"cosine:{model}"
                return candidates

        def fake_import(_name, filename):
            return FakeBm25 if filename == "bm25-index.py" else FakeReranker

        stdout = io.StringIO()
        stderr = io.StringIO()
        with (
            unittest.mock.patch.object(
                retrieve, "import_sibling", side_effect=fake_import
            ),
            contextlib.redirect_stdout(stdout),
            contextlib.redirect_stderr(stderr),
        ):
            result = retrieve.main(
                [
                    "--vault",
                    str(sandbox),
                    "日本語の検索",
                    "--model",
                    selected_model,
                    "--explain",
                ]
            )
        payload = json.loads(stdout.getvalue())
        assert_eq("retrieve explicit-model run succeeds", retrieve.EXIT_OK, result)
        assert_eq("retrieve forwards exact model", selected_model, received["model"])
        assert_eq(
            "retrieve strategy includes exact model",
            f"bm25+rerank:cosine:{selected_model}",
            payload["strategy"],
        )
        assert_eq(
            "retrieve explain reports exact model",
            selected_model,
            payload["explain"]["rerank_model"],
        )


def test_retrieve_translates_corrupt_index_to_documented_fallback_exit():
    """A malformed cache is unavailable, not an uncaught helper traceback."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        chunks_dir = sandbox / ".vault-meta" / "chunks" / "c-000001"
        index_dir = sandbox / ".vault-meta" / "bm25"
        chunks_dir.mkdir(parents=True)
        index_dir.mkdir(parents=True)
        (sandbox / "wiki").mkdir()
        (index_dir / "index.json").write_text(
            json.dumps({"schema_version": 1, "params": []}),
            encoding="utf-8",
        )

        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "test query",
                "--no-rerank",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("corrupt index maps to retrieve exit 10", 10, result.returncode)
        assert_true(
            "corrupt helper emits stable diagnostic",
            "ERR BM25_INDEX_CORRUPT:" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "retrieve emits stable unavailable diagnostic",
            "ERR RETRIEVAL_INDEX_UNAVAILABLE:" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "retrieve provides exact rebuild guidance",
            "python3 scripts/bm25-index.py" in result.stderr
            and " build" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "retrieve provides fallback guidance",
            "fall back to the standard vault query/text-search path" in result.stderr,
            hint=result.stderr,
        )
        assert_true(
            "corrupt retrieval has no traceback",
            "Traceback" not in result.stderr and "KeyError" not in result.stderr,
            hint=result.stderr,
        )


# ─── Integration smoke test: end-to-end with synthetic data ──────────────────
def test_end_to_end_with_synthetic_chunks():
    """Build a minimal vault with 2 chunks, index it, run retrieve, verify output."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)
        pages_dir = sandbox / "wiki" / "fake"
        pages_dir.mkdir(parents=True)

        # Write 2 synthetic chunks
        def chunk(addr, idx, text):
            return {
                "schema_version": 1,
                "page_path": f"wiki/fake/{addr}.md",
                "page_address": addr,
                "chunk_index": idx,
                "raw_text": text,
                "contextualized_text": text,
                "prefix": "",
                "prefix_source": "synthetic",
                "char_count": len(text),
                "body_hash": sha256_text(text),
                "page_body_hash": sha256_text(text),
                "created_at": "2026-05-17T00:00:00Z",
            }

        (chunks_dir / "c-000001").mkdir()
        (chunks_dir / "c-000002").mkdir()
        (pages_dir / "c-000001.md").write_text(
            "compounding wiki vault pattern by karpathy"
        )
        (pages_dir / "c-000002.md").write_text("obsidian cli transport detection")
        (chunks_dir / "c-000001" / "chunk-000.json").write_text(
            json.dumps(
                chunk("c-000001", 0, "compounding wiki vault pattern by karpathy")
            )
        )
        (chunks_dir / "c-000002" / "chunk-000.json").write_text(
            json.dumps(chunk("c-000002", 0, "obsidian cli transport detection"))
        )
        # Product scripts operate on the separately selected sandbox vault.
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "bm25-index.py"),
                "--vault",
                str(sandbox),
                "build",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("bm25 build rc=0", 0, result.returncode)
        # Run retrieve
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "karpathy wiki",
                "--top",
                "2",
                "--no-rerank",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("retrieve rc=0", 0, result.returncode)
        out = json.loads(result.stdout)
        assert_eq("retrieve.strategy is bm25-only", "bm25-only", out["strategy"])
        assert_true(
            "retrieve returns at least 1 candidate", len(out["candidates"]) >= 1
        )
        # c-000001 should rank above c-000002 for "karpathy wiki"
        first = out["candidates"][0]
        assert_eq("top hit is c-000001", "c-000001", first["page_address"])


def test_dedupe_happens_before_final_top_k():
    """Multiple top chunks from one page must not crowd out another page."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        chunks_dir = sandbox / ".vault-meta" / "chunks"
        chunks_dir.mkdir(parents=True)
        pages_dir = sandbox / "wiki" / "fake"
        pages_dir.mkdir(parents=True)

        page_bodies = {"c-000001": "page one", "c-000002": "page two"}
        for address, page_body in page_bodies.items():
            (pages_dir / f"{address}.md").write_text(page_body)
            (chunks_dir / address).mkdir()

        def write_chunk(address, index, text):
            record = {
                "schema_version": 1,
                "page_path": f"wiki/fake/{address}.md",
                "page_address": address,
                "chunk_index": index,
                "raw_text": text,
                "contextualized_text": text,
                "body_hash": sha256_text(text),
                "page_body_hash": sha256_text(page_bodies[address]),
            }
            (chunks_dir / address / f"chunk-{index:03d}.json").write_text(
                json.dumps(record)
            )

        write_chunk("c-000001", 0, "alpha alpha alpha alpha")
        write_chunk("c-000001", 1, "alpha alpha alpha beta")
        write_chunk("c-000002", 0, "alpha gamma delta epsilon")
        subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "bm25-index.py"),
                "--vault",
                str(sandbox),
                "build",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "alpha",
                "--top",
                "2",
                "--bm25-top",
                "3",
                "--no-rerank",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        addresses = [
            item["page_address"] for item in json.loads(result.stdout)["candidates"]
        ]
        assert_eq(
            "dedupe fills requested page count", ["c-000001", "c-000002"], addresses
        )


def test_retrieve_skips_page_deleted_after_index_build():
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        chunks_dir = sandbox / ".vault-meta" / "chunks" / "c-000001"
        chunks_dir.mkdir(parents=True)
        page = sandbox / "wiki" / "fake" / "c-000001.md"
        page.parent.mkdir(parents=True)
        page_text = "stale retrieval sentinel"
        page.write_text(page_text)
        (chunks_dir / "chunk-000.json").write_text(
            json.dumps(
                {
                    "schema_version": 1,
                    "page_path": "wiki/fake/c-000001.md",
                    "page_address": "c-000001",
                    "chunk_index": 0,
                    "raw_text": page_text,
                    "contextualized_text": page_text,
                    "body_hash": sha256_text(page_text),
                    "page_body_hash": sha256_text(page_text),
                }
            )
        )
        subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "bm25-index.py"),
                "--vault",
                str(sandbox),
                "build",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        page.unlink()
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "sentinel",
                "--no-rerank",
                "--explain",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
        )
        out = json.loads(result.stdout)
        assert_eq("deleted source yields no candidates", [], out["candidates"])
        assert_eq(
            "deleted source counted as stale",
            1,
            out["explain"]["stale_candidates_skipped"],
        )


def test_chunk_currency_rejects_hashless_or_malformed_legacy_records():
    with tempfile.TemporaryDirectory() as tmpdir:
        page = Path(tmpdir) / "wiki/fake/c-000001.md"
        page.parent.mkdir(parents=True)
        page_text = "current page text"
        page.write_text(page_text, encoding="utf-8")
        chunk = {
            "page_address": "c-000001",
            "chunk_index": 0,
            "raw_text": page_text,
            "body_hash": sha256_text(page_text),
            "page_body_hash": sha256_text(page_text),
        }
        hit = {
            "chunk_id": "c-000001:0",
            "body_hash": chunk["body_hash"],
            "page_body_hash": chunk["page_body_hash"],
        }
        assert_true(
            "fully hashed chunk is current",
            retrieve.chunk_is_current(hit, chunk, page, {}),
        )

        for label, target, field, value in (
            ("hashless chunk", chunk, "page_body_hash", None),
            ("malformed chunk hash", chunk, "body_hash", "sha256:nope"),
            ("hashless index hit", hit, "page_body_hash", None),
        ):
            changed = dict(target)
            changed[field] = value
            candidate_chunk = changed if target is chunk else chunk
            candidate_hit = changed if target is hit else hit
            assert_true(
                f"{label} rejected",
                not retrieve.chunk_is_current(candidate_hit, candidate_chunk, page, {}),
            )


def test_chunk_currency_accepts_crlf_pages():
    # Regression: chunk_is_current hashed pages via read_text (CRLF-normalizing),
    # so vaults with CRLF line endings dropped every candidate as stale and
    # retrieval returned zero results.  The hash must match the chunker's
    # byte-exact reading of the same page.
    with tempfile.TemporaryDirectory() as tmpdir:
        page = Path(tmpdir) / "wiki/fake/c-000001.md"
        page.parent.mkdir(parents=True)
        page.write_bytes(b"crlf line one\r\ncrlf line two\r\n")
        page_text = page.read_bytes().decode("utf-8", errors="replace")
        chunk = {
            "page_address": "c-000001",
            "chunk_index": 0,
            "raw_text": page_text,
            "body_hash": sha256_text(page_text),
            "page_body_hash": sha256_text(page_text),
        }
        hit = {
            "chunk_id": "c-000001:0",
            "body_hash": chunk["body_hash"],
            "page_body_hash": chunk["page_body_hash"],
        }
        assert_true(
            "CRLF page chunk is current",
            retrieve.chunk_is_current(hit, chunk, page, {}),
        )


# ─── M8 closure: --explain and --no-rerank flag coverage ─────────────────────
def test_explain_flag_adds_diagnostics_block():
    """v1.7.2 / closes audit M8: --explain must include an 'explain' diagnostics block."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)
        page_dir = sandbox / "wiki" / "fake"
        page_dir.mkdir(parents=True)
        # 2 synthetic chunks
        (chunks_dir / "c-000010").mkdir()
        page_text = "hybrid retrieval pipeline"
        (page_dir / "c-000010.md").write_text(page_text)
        (chunks_dir / "c-000010" / "chunk-000.json").write_text(
            json.dumps(
                {
                    "schema_version": 1,
                    "page_path": "wiki/fake/c-000010.md",
                    "page_address": "c-000010",
                    "chunk_index": 0,
                    "raw_text": "hybrid retrieval pipeline",
                    "contextualized_text": "hybrid retrieval pipeline",
                    "prefix": "",
                    "prefix_source": "synthetic",
                    "char_count": 25,
                    "body_hash": sha256_text(page_text),
                    "page_body_hash": sha256_text(page_text),
                    "created_at": "2026-05-17T00:00:00Z",
                }
            )
        )
        # Build index
        subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "bm25-index.py"),
                "--vault",
                str(sandbox),
                "build",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            timeout=10,
            check=True,
        )
        # Run with --explain --no-rerank
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "hybrid",
                "--top",
                "1",
                "--no-rerank",
                "--explain",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("retrieve --explain --no-rerank rc=0", 0, result.returncode)
        out = json.loads(result.stdout)
        assert_true(
            "--explain produces 'explain' key",
            "explain" in out,
            hint=f"keys={list(out.keys())}",
        )
        explain = out.get("explain", {})
        assert_true(
            "--explain reports BM25 candidate count",
            "bm25_candidates" in explain or "bm25" in str(explain).lower(),
            hint=f"explain={explain}",
        )


def test_no_rerank_flag_strategy_bm25_only():
    """v1.7.2 / closes audit M8: --no-rerank must produce strategy='bm25-only'."""
    with tempfile.TemporaryDirectory() as tmpdir:
        sandbox = Path(tmpdir)
        meta = sandbox / ".vault-meta"
        chunks_dir = meta / "chunks"
        bm25_dir = meta / "bm25"
        chunks_dir.mkdir(parents=True)
        bm25_dir.mkdir(parents=True)
        page_dir = sandbox / "wiki" / "fake"
        page_dir.mkdir(parents=True)
        (chunks_dir / "c-000020").mkdir()
        page_text = "transport detection fallback chain"
        (page_dir / "c-000020.md").write_text(page_text)
        (chunks_dir / "c-000020" / "chunk-000.json").write_text(
            json.dumps(
                {
                    "schema_version": 1,
                    "page_path": "wiki/fake/c-000020.md",
                    "page_address": "c-000020",
                    "chunk_index": 0,
                    "raw_text": "transport detection fallback chain",
                    "contextualized_text": "transport detection fallback chain",
                    "prefix": "",
                    "prefix_source": "synthetic",
                    "char_count": 35,
                    "body_hash": sha256_text(page_text),
                    "page_body_hash": sha256_text(page_text),
                    "created_at": "2026-05-17T00:00:00Z",
                }
            )
        )
        subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "bm25-index.py"),
                "--vault",
                str(sandbox),
                "build",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            timeout=10,
            check=True,
        )
        result = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "retrieve.py"),
                "--vault",
                str(sandbox),
                "transport",
                "--top",
                "1",
                "--no-rerank",
            ],
            env=sandbox_env(sandbox),
            capture_output=True,
            text=True,
            timeout=10,
        )
        assert_eq("retrieve --no-rerank rc=0", 0, result.returncode)
        out = json.loads(result.stdout)
        assert_eq(
            "--no-rerank sets strategy='bm25-only'", "bm25-only", out.get("strategy")
        )
        # --no-rerank produces a consistent shape: rerank fields are populated
        # but rerank_source is "skipped" (so callers don't have to special-case).
        candidates = out.get("candidates", [])
        assert_true("--no-rerank still returns candidates", len(candidates) >= 1)
        first = candidates[0]
        assert_eq(
            "--no-rerank candidate rerank_source='skipped'",
            "skipped",
            first.get("rerank_source"),
        )
        assert_eq(
            "--no-rerank candidate rerank_score equals bm25_score",
            first.get("bm25_score"),
            first.get("rerank_score"),
        )


def main():
    print("=== test_retrieve.py ===")
    test_import_sibling_resolves_hyphenated_names()
    test_chunk_snippet_short()
    test_chunk_snippet_truncates_with_ellipsis()
    test_cosine_identical()
    test_cosine_orthogonal()
    test_cosine_anti_parallel()
    test_cosine_length_mismatch()
    test_cosine_zero_vector()
    test_multilingual_model_default_and_validation()
    test_model_availability_handles_exact_and_tagged_names()
    test_retrieval_top_arguments_are_positive_and_bounded()
    test_embed_one_uses_current_single_input_ollama_api()
    test_rerank_noop_when_ollama_unreachable()
    test_rerank_noop_when_model_missing()
    test_rerank_truncates_to_top_k()
    test_rerank_query_embed_failure_preserves_bm25()
    test_rerank_document_failure_preserves_candidate_bm25_score()
    test_rerank_missing_chunk_preserves_candidate_bm25_score()
    test_with_task_prefix_contract()
    test_rerank_sends_nomic_task_prefixes()
    test_selected_model_is_used_for_embeddings_cache_and_source()
    test_peek_reports_selected_tagged_model()
    test_embedding_cache_key_versions_model_and_scheme()
    test_stale_prefixless_cache_is_not_reused()
    test_remote_ollama_remains_explicit_opt_in()
    test_rerank_rejects_chunk_path_escape()
    test_retrieve_exits_10_without_index()
    test_retrieve_validates_and_forwards_explicit_model()
    test_retrieve_translates_corrupt_index_to_documented_fallback_exit()
    test_end_to_end_with_synthetic_chunks()
    test_dedupe_happens_before_final_top_k()
    test_retrieve_skips_page_deleted_after_index_build()
    test_chunk_currency_rejects_hashless_or_malformed_legacy_records()
    test_chunk_currency_accepts_crlf_pages()
    test_explain_flag_adds_diagnostics_block()
    test_no_rerank_flag_strategy_bm25_only()
    print("\nAll retrieve tests passed.")


if __name__ == "__main__":
    main()
