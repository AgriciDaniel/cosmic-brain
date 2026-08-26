---
type: concept
title: "Fluent 2 Content Engineering"
address: c-000027
source_url: "https://fluent2.microsoft.design/content-engineering"
raw_file: ".raw/articles/content-engineering-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - content-engineering
  - system-prompt
  - ai-ux
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Responsible AI]]"
  - "[[Fluent 2 Handoffs]]"
---

# Fluent 2 Content Engineering

"The practice of shaping AI model behavior through the combined use of natural language expertise and user experience design." Microsoft's framing puts system prompt construction in the **content designer's** lane, not the engineer's.

## What a System Prompt Is

"A set of natural-language instructions that tells an AI system how to behave and perform." Operates **behind the scenes** — governs role, response style, tone, output format, invisible to the user.

## Four Required Components

| Component | Purpose |
|-----------|---------|
| **Role** | The AI's persona, purpose, viewpoint — and what it is **not** |
| **Task** | Specific actions + expected outputs |
| **Rules** | Constraints, guardrails |
| **Example output** | Demonstrates ideal pattern |

## Task — Three Traits

- **Specificity** — concrete actions with clear triggers (not vague direction)
- **Sequential steps** — numbered for multi-step processes
- **Response shape** — explicit format, not just content

## Personality & Tone

| Style | When |
|-------|------|
| **Engagement-oriented** | Conversational, warm, contractions, first-person |
| **Task-oriented** | Minimal, functional, efficient |

> [!key-insight] Encode tone explicitly
> "Specific guidance proves more effective than general descriptors like 'sound professional.'" Don't write "be professional"; write "use complete sentences; avoid contractions; respond in 2–3 sentences."

## Rule Categories

- **Safety** — explicit handling of sensitive requests + ethics
- **Non-anthropomorphic** — observable-behavior verbs, not emotion words
- **Capability claims** — accurately reflect limits
- **Anti-manipulation** — accuracy over user satisfaction

## Writing Effective Rules

Precise, **literal** language — no figurative expressions. Each rule names:
1. The exact condition
2. The exact response
3. Clarification of any ambiguous terms

For failure modes: identify condition → specify response → provide forward path.

## Source

Fetched from https://fluent2.microsoft.design/content-engineering on 2026-05-24.
