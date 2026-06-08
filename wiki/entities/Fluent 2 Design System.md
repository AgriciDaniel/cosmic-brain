---
type: entity
title: "Fluent 2 Design System"
address: c-000011
created: 2026-05-24
updated: 2026-05-24
status: developing
tags:
  - entity
  - design-system
  - fluent
  - microsoft
related:
  - "[[Fluent 2 Design Principles]]"
  - "[[Fluent 2 Color System]]"
  - "[[Fluent 2 Color Tokens]]"
  - "[[Fluent 2 Elevation]]"
  - "[[Fluent 2 Iconography]]"
  - "[[Fluent 2 Layout]]"
  - "[[Fluent 2 Material]]"
  - "[[Fluent 2 Motion]]"
  - "[[Fluent 2 Shapes]]"
  - "[[Fluent 2 Typography]]"
  - "[[Fluent 2 Accessibility]]"
  - "[[Fluent 2 Content Design]]"
  - "[[Fluent 2 Design Tokens]]"
  - "[[Fluent 2 Handoffs]]"
  - "[[Fluent 2 Onboarding]]"
  - "[[Fluent 2 Wait UX]]"
  - "[[Fluent 2 Content Engineering]]"
  - "[[Fluent 2 Responsible AI]]"
  - "[[Fluent 2 Types of AI Harm]]"
  - "[[FluentUI Blazor]]"
  - "[[FluentUI Blazor Styles]]"
---

# Fluent 2 Design System

Microsoft's current-generation design system. Fluent 2 supersedes Fluent / Fluent UI v1 and serves as the visual, interactional, and identity vocabulary across Microsoft surfaces — Windows, Office, Teams, the web — and the various Fluent component libraries that target individual platforms.

## Key Facts

- **Maintainer**: Microsoft
- **Docs**: https://fluent2.microsoft.design/
- **Principles**: [[Fluent 2 Design Principles]] — four (Natural on Every Platform, Built for Focus, One for All / All for One, Unmistakably Microsoft)
- **Design tokens**: a shared cross-platform token vocabulary consumed by each platform implementation

## Topic Map

### Foundations

| Topic | Page |
|-------|------|
| Principles | [[Fluent 2 Design Principles]] |
| Color (palettes, semantics) | [[Fluent 2 Color System]] |
| Color tokens (web aliases) | [[Fluent 2 Color Tokens]] |
| Design tokens (architecture) | [[Fluent 2 Design Tokens]] |
| Typography | [[Fluent 2 Typography]] |
| Layout / spacing / grid | [[Fluent 2 Layout]] |
| Shapes / corner radius / stroke | [[Fluent 2 Shapes]] |
| Iconography | [[Fluent 2 Iconography]] |
| Elevation / shadow | [[Fluent 2 Elevation]] |
| Material (solid, acrylic, mica, smoke) | [[Fluent 2 Material]] |
| Motion | [[Fluent 2 Motion]] |
| Accessibility | [[Fluent 2 Accessibility]] |
| Content design / voice + tone | [[Fluent 2 Content Design]] |

### AI-Era UX

| Topic | Page |
|-------|------|
| Handoffs (workflow transitions) | [[Fluent 2 Handoffs]] |
| Onboarding | [[Fluent 2 Onboarding]] |
| Wait UX / loading | [[Fluent 2 Wait UX]] |
| Content engineering (system prompts) | [[Fluent 2 Content Engineering]] |
| Responsible AI | [[Fluent 2 Responsible AI]] |
| Types of AI harm | [[Fluent 2 Types of AI Harm]] |

## Implementations

| Implementation | Platform | Wiki page |
|----------------|----------|-----------|
| FluentUI Blazor | Blazor / ASP.NET Core | [[FluentUI Blazor]] |

> Other Fluent implementations exist (Fluent UI React, Fluent UI WebComponents, native WinUI, etc.). They are not yet documented in this vault.

## Identity Vocabulary

Per the "Unmistakably Microsoft" principle, Fluent 2 articulates identity through four channels:

| Channel | Examples |
|---------|----------|
| Color | Brand palettes + neutral ramps, surfaced as tokens — see [[Fluent 2 Color Tokens]] |
| Sound | System sounds, notification cues |
| Illustration | Branded illustration + iconography — see [[Fluent 2 Iconography]] |
| Icons | Fluent UI System Icons |

## Notes

The **80/20 split** under "Natural on Every Platform" is a deliberate constraint: ~80% of any Fluent experience rides on native platform conventions, leaving 20% for signature, brand-defining work. This shapes how component libraries like [[FluentUI Blazor]] decide what to expose vs what to defer to the host platform.
