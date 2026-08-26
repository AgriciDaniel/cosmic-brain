---
type: concept
title: "Business Process Documentation"
address: c-000274
created: 2026-06-26
status: evergreen
tags:
  - documentation
  - knowledge-management
  - operations
related:
  - "[[Documentation Culture]]"
  - "[[documentation-business-process-bergren]]"
  - "[[art-of-writing-good-documentation]]"
  - "[[atlassian-process-documentation-guide]]"
---

# Business Process Documentation

A written, step-by-step record of how to complete a repeatable organizational process. More than an overview: it specifies who does what, in what order, under what conditions — detailed enough that someone unfamiliar with the task can execute it correctly.

> [!key-insight] Living document principle
> No version of process documentation is final. Every execution is an opportunity to update it. Build with that expectation from the start.

---

## Why It Matters

| Benefit | Mechanism |
|---|---|
| Consistency | Everyone follows the same proven steps → uniform quality |
| Onboarding speed | New hires follow docs instead of shadowing or repeated questioning |
| Knowledge retention | Knowledge survives role changes, departures, absence |
| Process improvement | Writing forces examination; documentation surfaces inefficiencies |
| Reduced cognitive load | No need to remember every step; docs carry the burden |
| Delegation | Can hand off tasks that used to require deep expertise |

**The cost of not documenting:** Knowledge shortfalls cost large companies $47M/year (Panopto). Only 4% of companies consistently document (BPTrends). Simple examples of ROI: an ICU checklist at Johns Hopkins prevented 43 infections, saved 8 lives, and saved $2M in one year (Gawande, *The Checklist Manifesto*).

---

## How to Write Process Documentation

### Step 0: Mindset

- Start with a process you personally perform — don't start by interviewing others
- First draft is never complete; ship it and improve on every execution
- "Living documentation" — mark incomplete sections as `[TBD]` and return to them

### Step 1: Write the Steps (Bergren's Recipe Metaphor)

Think of the steps like a recipe: first, second, third. This surfaces implicit steps that experienced performers do automatically but would confuse someone new.

**Tips for clear steps:**
- Write for someone who has never done this (can an 8-year-old follow it?)
- Use second-person imperative: "Click X, then do Y" — not "I click X"
- Use role titles, not names (people change roles)
- No jargon, no abbreviations
- State what triggers the process to START and END
- Mark conditional branches explicitly: "If A, go to Step 6; if B, continue to Step 4"

**User-test the steps** — give the document to someone unfamiliar with the process and ask them to execute it. Where they get stuck = where to improve.

### Step 2: Name & Structure

**Naming:** use "How to [verb]..." or "What is [topic]?" format — mirrors natural search behavior. Include words users would actually search for. Optionally prefix with department: "Marketing: How to create a content calendar."

**Standard template sections:**
1. Last Updated + Who Updated
2. Owner (who approves changes, who answers questions)
3. "You might be looking for..." (links to commonly confused docs)
4. History / Context (skippable on repeat visits via TOC)
5. **Process Steps** (the core)
6. Before/After links (adjacent processes)
7. Related Articles / Resources

**Table of contents** — required for any doc longer than a few sections. Lets users jump to exactly the step they're on.

**Formatting:**
- Heading hierarchy + bolding for visual scanning
- Bullet points; short sentences
- Callout boxes for critical notes, warnings, or decision points
- Visual aids (flowcharts, screenshots) for complex or branching flows

### Step 3: Add Visuals (Last)

Add visuals AFTER writing all steps — internal task-switching between words and images increases cognitive cost and slows completion.

**Best visual types by use case:**
- Branching logic → flowchart
- Software UI steps → screenshots or GIFs
- Role handoffs → swimlane diagram
- High-level overview → infographic or video walkthrough

~2/3 of people are visual learners; documentation without any visuals underserves most readers.

---

## Atlassian's Full 12-Step Process

For more complex or high-stakes processes, use the complete framework:

1. Define scope (start, end, completion criteria)
2. Understand audience (experience level, context)
3. Identify players (role assignments in multi-person flows)
4. Gather information (interview stakeholders; document while performing)
5. Organize (rearrange steps using sticky notes or cards)
6. Write (active voice, UX writing principles)
7. Add visuals (flowcharts, diagrams)
8. Get feedback (include unfamiliar reviewers)
9. Revise
10. Re-share (verify revised version works)
11. Distribute (central knowledge base = single source of truth)
12. Plan to revisit (schedule recurring review)

---

## Common Failure Modes

| Failure | Cause | Fix |
|---|---|---|
| Knowledge hoarding | Perceived competitive advantage in exclusive expertise | Normalize transparency; document as a team value |
| Documenting the ideal, not actual | Self-consciousness about imperfect practice | Frame as learning, not auditing |
| Perfectionism → never publishing | Fear that v1 isn't good enough | Start small; mark in-progress sections `[TBD]`; ship |
| No time | Calendar packed | Record Loom screen-capture during actual work; transcribe later |
| Stale documentation | Updates skipped after process changes | Assign doc owners; make review a calendar event |

---

## Tools

| Task | Options |
|---|---|
| Screen capture during work | Loom, Guidde, Iorad, Tango, Scribe |
| Audio-to-text (talk through steps) | otter.ai, Zoom/Meet transcription |
| Brainstorming + organization | Mural |
| Writing + distribution | Confluence, Notion, wiki |
| Visual diagrams | Gliffy, Draw.io, Lucidchart |

---

## Cross-references

- [[Documentation Culture]] — organizational/cultural dimension; how to build the habits and systems that make documentation sustainable
- [[documentation-business-process-bergren]] — Jen Bergren's three-phase practical guide (steps → naming/structure → visuals)
- [[art-of-writing-good-documentation]] — Pragati Sinha's philosophy; "documentation as a love letter to your future self"
- [[atlassian-process-documentation-guide]] — Atlassian's 12-step methodology with ROI statistics and tool recommendations
