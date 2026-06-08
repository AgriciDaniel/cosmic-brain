---
type: concept
title: "Fluent 2 Responsible AI"
address: c-000028
source_url: "https://fluent2.microsoft.design/responsible-AI"
raw_file: "raw/articles/responsible-ai-2026-05-24.md"
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - responsible-ai
  - rai
  - ai-ux
related:
  - "[[Fluent 2 Design System]]"
  - "[[Fluent 2 Types of AI Harm]]"
  - "[[Fluent 2 Content Engineering]]"
  - "[[Fluent 2 Handoffs]]"
---

# Fluent 2 Responsible AI

UI-layer mitigations that complement Microsoft's Responsible AI Standard. Goal: "Create products and features that clearly specify AI functionality and deliver value without overpromising."

## Five Principles

### 1. Be Transparent
- **Labeling & attribution** — users can verify sources and accuracy
- **System & data scope** — explain recommendations; explain data use
- **Availability messaging** — specific RAI error messages
- **Voice & tone** — no emotion/consciousness/social-bond language; first-person only when functional and factual

### 2. Set Appropriate Expectations
- **Scope communication** — disclaimer on all AI responses; product-level limits; entry-point communication
- **Latency messaging** — say what's happening next

### 3. Prevent Overreliance
- **Output framing** — approved disclaimer always; never present output as fully reliable; differentiate AI vs non-AI content
- **Latency messaging** — describe what AI is doing, not anthropomorphized filler

### 4. Keep Users in Control
- **Action labels & controls** — meaningful manipulation; clear impact
- **AI activation** — explicit communication when active
- **Consent & privacy** — specific about data permissions
- **Settings access** — global behaviors

### 5. Collect Feedback
- **Transparency** — explicit + telemetry/implicit
- **Categorization** — by harm; surface to product team

## Agents — Extra Care

Agents have greater autonomy. Score of **0 or 1** on "set expectations for agents" → **automatic fail.**

Mandatory:
- Inform users when an agent is activated
- Communicate autonomy level (triggers, access, action rights)
- Consistent naming + visual cues across products
- **Users approve/reject** agent actions **before they happen**
- Tell users how to correct, refine, or **reverse** agent actions

## Patterns

**Visual**: entry-point indicators · reasoning panels · agent memory indicators.

**Content**: AI presence indicators · approved disclaimers · availability messaging · agent memory clarification · actionable errors · feedback prompts with categorization · neutral feedback control tooltips.

## Evaluation Rubric (0–3 per criterion)

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90%+ | Ready to ship |
| B | 80–90% | Conditional — all criteria ≥ 2 |
| C | 75–80% | Needs improvement |
| Fail | < 75% | Adjust and return |
| **Auto-fail** | — | Two or more 0s, OR overreliance/agent expectations scored 0–1 |

## Source

Fetched from https://fluent2.microsoft.design/responsible-AI on 2026-05-24.
