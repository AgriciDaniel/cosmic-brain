---
type: concept
title: "Fluent 2 Wait UX"
address: c-000026
source_url: "https://fluent2.microsoft.design/wait-ux"
raw_file: "raw/articles/wait-ux-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - wait-ux
  - loading
  - perceived-performance
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Motion]]"
  - "[[Fluent 2 Accessibility]]"
---

# Fluent 2 Wait UX

How a system **presents itself** during processing, loading, or data retrieval. "These moments, if not handled well, can lead to frustration, abandonment, or loss of trust."

## Three Principles

- **Clear Communication** — descriptive labels (*"Uploading photo…"*, *"Loading dashboard…"*). Determinate progress > indeterminate spinners.
- **Perceived Performance** — shimmer, skeletons, micro-interactions. **No animation under 1s** ("may confuse users"). Never show blank/static.
- **Contextual Consistency** — stay in current view; **one** progress notification, not competing indicators.

## Visual Pattern Catalogue

| Pattern | Use |
|---------|-----|
| **Spinner** | Short indeterminate < 3 s. Present-participle + ellipsis ("Loading…") |
| **Progress Bar** | Measurable longer waits. Task label above, status below ("30% complete – about 20 seconds remaining") |
| **Skeleton Screens** | Content rendering. Copilot uses gradient shimmer |
| **Progress Toast** | Background processes affecting current work |
| **Morse Code Animation** | Copilot/AI — mimics typing without anthropomorphizing |
| **Pulsing Dot** | Light-weight, used in Chain of Thought workflows |

## Timing Guide

| Wait duration | Approach |
|---------------|----------|
| < 1 s | **No** indicator |
| 1–3 s | Spinner |
| > 3 s | Progress bar or reassurance message |
| AI chat | Immediate response indicators |

## Labeling

- **Active**: present-participle ("Uploading file…")
- **Complete**: past tense ("File uploaded")
- **Avoid passive**: "File is being uploaded" feels impersonal
- One phrase, not paragraphs

Non-AI: give time estimates. AI: prefer activity indicators (unpredictable durations).

## Accessibility

- `role="status"` to announce state changes
- **Nonbreaking spaces** before ellipses so screen readers convey state accurately

## Source

Fetched from https://fluent2.microsoft.design/wait-ux on 2026-05-24.
