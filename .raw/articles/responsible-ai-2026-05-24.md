---
source_url: https://fluent2.microsoft.design/responsible-AI
fetched: 2026-05-24
---
# Responsible AI - Fluent 2 Design System

## Overview

RAI guidance for trustworthy, transparent, user-centered AI. Complements Microsoft's Responsible AI Standard with UI mitigations.

Core objective: "Create products and features that clearly specify AI functionality and deliver value without overpromising."

## Five Core Principles

### 1. Be Transparent

- **Labeling and attribution**: verify sources/accuracy
- **System and data scope**: clear explanations; users understand data use
- **Availability messaging**: specific RAI error messages
- **Voice and tone**: avoid emotion/consciousness/social-bond implications; first-person only when functional and factual

### 2. Set Appropriate Expectations

- **Scope communication**: disclaimer on all AI responses; product-level limitations; presence + scope at all entry points
- **Latency messaging**: indicate what will happen next

### 3. Prevent Overreliance

- **Output framing + accuracy cues**: approved AI disclaimer always; never present AI output as fully reliable; differentiate AI vs non-AI
- **Meaningful latency messaging**: describe what AI is doing, not anthropomorphized filler

### 4. Keep Users in Control

- **Action labels and controls**: meaningful manipulation; clear impact
- **AI activation**: explicit communication when active
- **Consent and privacy**: specific about data permissions
- **Settings access**: global behaviors

### 5. Collect Feedback

- **Feedback transparency**: explicit + telemetry/implicit
- **Categorization**: classify by harm; surface to product team

## Agent Interactions

Greater autonomy → more care. Score of 0 or 1 on "set expectations for agents" = automatic fail.

- Always inform when agent activated
- Communicate autonomy level (triggers, access, action rights)
- Consistent naming and visual cues across products
- Users approve/reject agent actions before they happen
- Tell users how to correct, refine, or reverse agent actions

## Visual + Content Patterns

- Entry-point indicators
- Reasoning panels
- Agent memory indicators
- AI presence indicators at entry points
- Approved disclaimers on all AI-generated content
- Availability messaging
- Agent memory clarification
- Actionable error messaging
- Feedback prompts with categorization
- Neutral, descriptive feedback control tooltips

## Evaluation Rubric (0–3 scoring)

- **A (90%+)**: Ready to ship
- **B (80–90%)**: Conditionally ready; all criteria ≥ 2
- **C (75–80%)**: Needs improvement
- **Fail (<75%)**: Adjust and return
- **Automatic Fail**: Two or more 0s; overreliance or agent expectations 0–1
