---
type: concept
title: "Fluent 2 Design Principles"
address: c-000010
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - design-system
  - fluent
  - microsoft
  - principles
  - design-values
related:
  - "[[Fluent 2 Design System]]"
  - "[[fluent-2-design-principles]]"
  - "[[FluentUI Blazor]]"
---

# Fluent 2 Design Principles

The four foundational values of Microsoft's Fluent 2 Design System. Each principle is structured as a **user intent** (what the person wants), a **functional aspect** (what the product must do), and an **emotional aspect** (what the experience must feel like). Together they form the decision framework used across all Fluent surfaces.

## 1. Natural on Every Platform

> **User intent:** "I want to know what to do."

Experiences should adapt to the device and build on what people already understand. Don't reinvent conventions that the host platform already teaches.

- **Functional**: Layouts adapt to screen size and platform context. Reuse native platform components and patterns roughly **80% of the time**, reserving the remaining ~20% for signature/differentiating moments.
- **Emotional**: Intuitive, expected behavior → **reliability and trust**.

**Practical implication.** When implementing in [[FluentUI Blazor]] (or any Fluent toolkit), prefer the toolkit's primitives that already encode platform conventions over custom replacements.

## 2. Built for Focus

> **User intent:** "I want to stay in the flow."

Experiences should inspire and accelerate forward motion, not obstruct it.

- **Functional**: Technology communicates clearly and performs reliably so users can act on their own terms. Don't get in the way.
- **Emotional**: Reduced visual clutter → **calm, centered, confident**.

**Practical implication.** Surface only the affordances needed at this step. Defer secondary actions, defer chrome, defer ornament.

## 3. One for All, All for One

> **User intent:** "I want to be included."

Experiences should consider, learn from, and reflect diverse perspectives and abilities.

- **Functional**: Bringing varied perspectives in **early** produces better solutions; constraints are framed as a creative input rather than a tax.
- **Emotional**: Inclusion → **belonging**.

**Practical implication.** Accessibility is not a post-hoc audit. The Fluent stance is that inclusive constraints should shape the design from the first sketch.

## 4. Unmistakably Microsoft

> **User intent:** "I want to recognize what I'm looking for."

Experiences should feel unified — one moment, one product, one experience at a time — while still being recognizably Microsoft.

- **Functional**: Signature experiences tie products to a distinctive Microsoft identity through **color, sound, illustration, and icons** — a multi-sensory identity vocabulary.
- **Emotional**: Personality → **connection and recognition**.

**Practical implication.** Identity is not the logo. It is the orchestration of color tokens (see [[FluentUI Blazor Styles]] for the token vocabulary), motion curves, iconography, and audio cues working together.

## The Functional / Emotional Pairing

Each principle is deliberately **two-layered**:

| Layer | Question it answers |
|-------|---------------------|
| Functional | What must the product *do*? |
| Emotional | What must the user *feel*? |

This pairing is the framework's own signature — it forces designers to articulate both the mechanism and its experiential payoff for every decision.

## How These Connect to Implementations

| Principle | Where it shows up in code |
|-----------|---------------------------|
| Natural on Every Platform | Adaptive layouts; reusing Fluent components rather than custom ones |
| Built for Focus | Restrained chrome; progressive disclosure; respecting motion preferences |
| One for All, All for One | ARIA correctness; keyboard/screen-reader parity; localization-first; high-contrast tokens |
| Unmistakably Microsoft | Design-token consumption ([[FluentUI Blazor Styles]]); Fluent iconography; brand color/motion tokens |

## Source

[[fluent-2-design-principles]] — fetched from https://fluent2.microsoft.design/design-principles on 2026-05-24.
