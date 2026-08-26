---
type: concept
title: "Fluent 2 Types of AI Harm"
address: c-000029
source_url: "https://fluent2.microsoft.design/ai-harm"
raw_file: ".raw/articles/ai-harm-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - ai-harm
  - responsible-ai
  - ai-ux
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Responsible AI]]"
---

# Fluent 2 Types of AI Harm

Six harm categories that map directly onto Responsible AI principles. Harm may be unintentional but still damages trust and produces real-world consequences.

## Harm Catalogue

| Harm | Definition | Primary mitigation |
|------|------------|--------------------|
| **Inaccurate** | Factually wrong, fabricated, ungrounded (hallucinated citations, misleading summaries) | Approved disclaimer · surface sources · UI friction before action |
| **Incomplete** | Critical info omitted; partial responses treated as complete | Scope task boundaries · progressive disclosure · communicate when partial |
| **Biased** | Reflects/amplifies unfair assumptions; inherited from training data at scale | Inclusive reviews · test diverse populations · feedback channels |
| **Inappropriate / Unsafe** | Offensive, harmful, discriminatory, dangerous; targets groups or facilitates real-world harm | Feedback category "Unsafe or problematic content" · escalation pathway |
| **Non-transparent** | Failure to disclose AI involvement, sources, constraints, decision implications | Label AI content consistently · inline sources · approved disclaimers · scope at entry points |
| **Overreliance** | Users accept output without critical thinking — design failed | Inline caveats · clear source links · avoid false-authority patterns · friction for review |

## Feedback Categorization

The reporting taxonomy directly mirrors the harm categories. Recommended labels:

- Output wasn't factual
- Incomplete output
- No sources provided
- Unsafe or problematic content
- Questionable sources
- Other

**Transparency in feedback**: state what's shared — "When you submit feedback, the prompt and response are included." Don't hide behind "Help us improve."

## Hierarchy of Concern

**Overreliance** is the foundational risk — it's the harm that lets all the others land. Scoring 0/1 on "Prevent overreliance" in the RAI rubric ([[Fluent 2 Responsible AI]]) triggers **automatic failure** regardless of overall score.

## Source

Fetched from https://fluent2.microsoft.design/ai-harm on 2026-05-24.
