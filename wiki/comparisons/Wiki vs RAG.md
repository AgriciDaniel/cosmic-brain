---
type: comparison
title: "Wiki vs RAG"
subjects:
  - "[[LLM Wiki Pattern]]"
  - "RAG (Retrieval-Augmented Generation)"
dimensions:
  - "How knowledge is stored"
  - "Query cost"
  - "Infrastructure"
  - "Maintenance"
  - "Scale limit"
verdict: "Wiki wins at <1000 pages. RAG wins at enterprise scale."
created: 2026-04-07
updated: 2026-04-07
tags:
  - comparison
  - llm-wiki
  - knowledge-management
status: mature
related:
  - "[[LLM Wiki Pattern]]"
  - "[[Compounding Knowledge]]"
  - "[[index]]"
  - "[[How does the LLM Wiki pattern work]]"
sources: []
---

# Wiki vs RAG

## Overview

Both approaches let you query a large document collection. They differ fundamentally in when synthesis happens.

## Comparison

| Dimension | LLM Wiki | Semantic RAG |
|-----------|----------|-------------|
| **How knowledge is stored** | Pre-compiled markdown pages with cross-references already built | Raw chunks in a vector database |
| **Finding answers** | Read index → follow links → synthesize | Embed query → similarity search → assemble |
| **Query cost** | Low — synthesis already done | Higher — re-derives on every query |
| **Infrastructure** | Just markdown files | Embedding model + vector DB + chunking pipeline |
| **Maintenance** | Run a lint pass | Re-embed when content changes |
| **Scale limit** | ~hundreds of pages (index file navigation) | Millions of documents |
| **Setup time** | 5 minutes | Hours to days |
| **Contradiction detection** | Built in — LLM flags on ingest | Manual |

## Verdict

**Under 1000 pages → LLM Wiki.** The index file is sufficient for navigation, token cost is low, setup is minimal, and the pre-compiled synthesis means every query benefits from everything ever read.

**Over 100K pages → RAG.** The index file becomes too large to read, and embedding-based retrieval becomes more efficient than full-index scanning.

The sweet spot: run the wiki pattern for active research (where things are being added, synthesized, and connected), then export to a vector store if the collection grows beyond the index threshold.

(Source: [[LLM Wiki Pattern]], [[Compounding Knowledge]])
