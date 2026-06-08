---
type: concept
title: "Fusion Story & Philosophy"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - history
  - philosophy
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Overview]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Story & Philosophy

## Origins

**2011**: [Steve Sanderson](http://blog.stevensanderson.com/) creates [Knockout.js](https://knockoutjs.com/) — a JavaScript library built around **computed observables**, an abstraction that automatically recomputes parts of the view model when dependencies change. It becomes the de-facto standard for SPAs on the Microsoft web stack.

**2012**: [Alex Yakunin](https://github.com/alexyakunin) joins [Quora](https://www.quora.com/) and discovers **LiveNode + webNode2** — Quora's internal framework that tracks dependencies on the server and re-renders UI components when data changes. In 2012, Quora was already updating all user-facing content in real-time at 300M+ MAU scale.

**The insight**: Knockout does client-side reactivity. LiveNode does server-side reactivity. Can we build a library that works **both** on the server and client, enabling shared models and APIs with truly transparent abstractions?

## The Four Enablers

By 2020, four things had converged to make Fusion possible:

1. **React** took the #1 spot among web UI frameworks, proving the value of declarative UIs
2. **MobX** (and Vue.js) showed that computed observables could be nearly **transparent** — no explicit subscription wiring
3. **The deeper insight**: dependency tracking is fundamentally connected to **caching and eventual consistency**. At scale, you need to invalidate cached data as quickly as possible after it becomes inconsistent with the ground truth
4. **Blazor** (also created by Steve Sanderson) made it possible to run .NET in WebAssembly — server and client code could now share assemblies

The only missing piece was Fusion itself.

## Philosophy

> "There are only two hard problems in computer science: cache invalidation and naming things."

Fusion aims to solve the easier one — cache invalidation — but does it perfectly, because a half-working caching system is worse than no caching at all.

The framework treats **caching and real-time updates as facets of the same problem**: both require knowing **when something changes** and **who cares**. Rather than treating them as separate concerns requiring separate infrastructure, Fusion unifies them through automatic dependency tracking.

The goal is **zero boilerplate**: same code you'd write anyway, plus a few attributes and invalidation blocks.
