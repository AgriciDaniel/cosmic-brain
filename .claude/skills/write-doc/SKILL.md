---
name: write-doc
description: >
  Guides Claude through writing clear, well-structured documentation for any process, workflow,
  system, or feature. Use this skill whenever someone wants to write an SOP, process guide,
  how-to document, team handbook entry, step-by-step instructions, or any repeatable-task
  documentation. Trigger on phrases like "document this", "write a how-to", "create an SOP",
  "write process docs", "help me document [workflow/feature/process]", "write a guide for",
  "write up how we do X". Also trigger proactively when the user describes a multi-step
  process or workflow and it's clear they want it captured for others to follow.
---

# write-doc

Turn any process, workflow, or system description into clear, structured documentation that a
newcomer can follow without asking questions.

The framework comes from three core principles of good documentation:
1. **Steps first, structure second** — get the steps out of someone's head before worrying about formatting
2. **Write for someone new** — assume zero prior knowledge; the "can an 8-year-old follow this?" test
3. **Living document mindset** — ship an imperfect first draft and improve on every execution; "coming soon" on every section is failure

---

## Phase 1: Gather Context

Before writing, identify what you don't know. If the conversation already contains the answers,
skip the question — don't ask for things already provided.

Key questions to resolve:
- **What** is being documented? (process, feature, workflow, system)
- **Audience** — who will use this? (new hire, colleague, external user? what's their experience level?)
- **Scope** — what's the start point? what signals completion?
- **Multi-person?** — if so, which roles are involved at which steps?
- **Software-based?** — does it involve clicking through a UI, or is it physical/conversational?

Once you have these, proceed immediately. Don't over-interview.

---

## Phase 2: Write the Steps (Recipe Method)

Think of the steps like a recipe: first, second, third — in order to reach the outcome.

**Rules for clear steps:**
- Use second-person imperative: "Click X" / "Fill in Y" / "Notify Z" — not "I click X" or "one should click X"
- Use role titles, not names: "The reviewer" not "Sarah" — people change roles
- State what **starts** the process and what signals it's **done**
- No jargon or unexplained abbreviations — write out what the reader wouldn't know
- One action per step where possible — compound steps hide failure points
- Mark decision points explicitly:
  - "If [condition A], skip to Step 8"
  - "If [condition B], see [Section / separate doc]"

**The unfamiliar-reader test:** After drafting, ask yourself — what would confuse someone doing this for the first time? That's what to add or clarify.

---

## Phase 3: Name and Structure

**Naming convention — use "How to [verb]..." or question format:**
- ✓ "How to submit a purchase request"
- ✓ "What is our client escalation process?"
- ✗ "Purchase Requests" (not searchable, not clear what to do)
- ✗ "PO Process Doc v3" (version in name = stale within weeks)

The "How to" format forces the writer to articulate exactly what someone will learn; the question format mirrors how people search.

**Standard template structure to follow:**

```markdown
# How to [Do X]

**Last updated:** [YYYY-MM-DD] | **Owner:** [Role Title, not name]

> [!note] You might be looking for: [[Related Doc]] — [one-line description of when to use that one instead]

## Overview
[1–2 sentences: what this process does and why it matters]

## Before you start
- [Prerequisite 1 — what the reader needs to have done or have access to]
- [Prerequisite 2]

## Steps

1. [Single action, imperative, written for someone new]
2. [Next action]
   - [Sub-step if needed]
3. [Continue...]

## If [condition] instead
[Link to or describe the alternate path]

## After this process
[What happens next / who picks up from here / what to do if something goes wrong]

## Related
- [[Adjacent doc 1]]
- [[Adjacent doc 2]]
```

This structure is a starting point. Remove sections that don't apply; add sections that matter for this specific process.

**For longer documents:** always add a Table of Contents with anchor links after the title. Readers rarely read start-to-finish on repeat visits — they jump to the step they're on.

---

## Phase 4: Audit Before Delivering

Before handing off the draft, do a quick pass:

**Flag gaps** — any step that hand-waves at complexity or says "somehow," "as appropriate," or leaves a blank. Mark these explicitly: `> [!warning] Gap: [describe what's missing]`

**Suggest visuals** — for any step involving:
- A UI (screenshot candidate)
- A decision tree (flowchart candidate)
- Role handoffs (swimlane diagram candidate)
Add a note: `[screenshot here: show X]` or `[flowchart here: A → B → C]`. Visuals go in AFTER steps are solid — don't try to write and diagram simultaneously.

**Recommend user testing** — always close the draft with:
> "Suggested next step: have someone unfamiliar with this process try to follow it from start to finish. Where they get stuck = what to clarify."

---

## Output format

Deliver:
1. **The complete documentation** in Markdown — ready to paste into Obsidian, Confluence, Notion, or any wiki
2. **A brief appendix** listing: gaps flagged, visual candidates, and the user-test suggestion

---

## What separates good from bad documentation

| Good | Bad |
|---|---|
| "Click 'Submit' in the top-right corner" | "Submit the form" |
| "If the order is over $5,000, the Finance Manager must approve" | "Get approval if needed" |
| "Owner: Procurement Lead" | "Owner: John" |
| Trigger: "When a new vendor is added to the system" | [No trigger stated] |
| "Steps last updated: 2026-06-26" | [No date] |
| Prerequisite: "You need Manager access in Jira" | [Reader discovers access error at step 4] |

---

## Background: why this approach works

> "Documentation is a love letter you write to your future self." — Damian Conway
> No documentation is a trap you set for your future self.

Only 4% of companies consistently document their processes (BPTrends). Knowledge gaps cost large companies $47M/year (Panopto). A single ICU checklist at Johns Hopkins prevented 43 infections, saved 8 lives, and saved $2M in one year — the upside of even simple process documentation is enormous.

The recipe metaphor for writing steps, the "How to" naming convention, and the standard template structure come from Jen Bergren's documentation workshop methodology. The cultural framing comes from Pragati Sinha's work on documentation as a deliverable. The 12-step framework and failure mode taxonomy come from Atlassian's process documentation guide.
