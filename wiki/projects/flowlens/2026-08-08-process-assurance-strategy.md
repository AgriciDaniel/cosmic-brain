---
title: "FlowLens Process Assurance strategy"
created: 2026-08-08
updated: 2026-08-08
type: strategy
status: active
project: flowlens
tags: [flowlens, strategy, process-assurance, msp, product]
---

# FlowLens Process Assurance strategy

## Verdict

**MODIFY.** Continue FlowLens, but abandon “record a workflow and generate many AI assets” as
the company-level differentiation. Loom, Microsoft, UiPath and especially Scribe now cover much
of capture, documentation, workflow analysis and agent context.

## Category and wedge

- Buyer category: **Process Assurance Platform**.
- Long-term descriptor: **Process Evidence and Control Plane for human and AI work**.
- One line: Record a critical task, turn it into an approved process, run it consistently and
  prove what happened.
- First wedge: UK MSP employee onboarding/offboarding and privileged-access change workflows.

The primary object is a versioned `Process`; a `Capture` is source evidence. Durable value comes
from approved versions, run evidence, deviations, controls, outcomes, improvements and safe
human/automation/agent execution.

## Current repo truth

As of 2026-08-08, the web app is an interactive preview: in-memory demo captures, deterministic
mock AI, Markdown/JSON exports, and stub integrations/desktop/extension. It is not yet a real
commercial SaaS. The launch tranche therefore makes capability status truthful, adds a working
private-pilot funnel, and introduces the backward-compatible Process domain/schema.

## Falsification gates

Within 90 days, five MSP design partners must produce at least three real completed workflows,
four instances of reuse/share within seven days, two paid or written price commitments, a
measurable operational improvement, and no unresolved consent/redaction blocker. Missing two
gates means changing the wedge rather than adding features.

## Canonical artefacts

- Repo strategy: `C:\Users\manaz\flowlens\docs\strategy\flowlens-master-strategy-2026-08.md`
- Market research/red-team: `C:\Users\manaz\flowlens\docs\strategy\flowlens-market-research-2026-08.md`
- Working branch: `agents/process-intelligence-strategy`

## Delivery status

- Live production: https://web-chi-nine-65.vercel.app
- Repository commit: c350418
- Pull request: https://github.com/manazoid4/flowlens/pull/4
- CI: passed.
- Remaining external configuration: PILOT_NOTIFICATION_TO for pilot notifications.

## Next engineering milestone

Build one real vertical slice:

`authenticated workspace → user-initiated browser capture → persisted evidence → real evidence-linked Process draft → human review → approval → Markdown/JSON export`

Defer marketplace, broad graph UI, consumer suite, ambient monitoring, native automation runtime
and enterprise theatre until this loop is retained and paid.
