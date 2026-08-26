---
type: source
source_type: article
title: "How Similar Is Stl.Fusion to SignalR?"
author: "Alex Yakunin"
date_published: "2019"
url: "https://medium.com/swlh/how-similar-is-stl-fusion-to-signalr-e751c14b70c3"
confidence: medium
key_claims:
  - "SignalR and Fusion solve different problems: SignalR delivers server-push notifications over WebSockets; Fusion tracks when previously-requested data changes and automates re-fetch."
  - "Manual SignalR pub/sub requires per-data-type subscription groups, update messages, and client handlers; Fusion automates this via dependency tracking."
  - "SignalR has multi-language clients and mature connection-resilience features; Fusion (as of this article) does not match that breadth."
updated: 2026-07-14
tags:
  - dotnet
  - fusion
  - signalr
  - comparison
domain: dotnet
status: developing
related:
  - "[[Fusion FAQ]]"
  - "[[ActualLab.Fusion Overview]]"
---

# How Similar Is Stl.Fusion to SignalR? (Alex Yakunin, Medium)

Written by Fusion's own creator, not an independent third party — treat claims as **medium confidence** (single-source, author has a stake in the framing). [[Fusion FAQ]] already links this article but doesn't summarize it; this page fills that gap.

## Core Argument

SignalR and Fusion are pitched as solving **different problems**, not competing directly:

- **SignalR**: a layer over WebSockets that helps server code track connected clients, group them, and push messages to individuals/groups/all. It's a notification-delivery API.
- **Fusion**: lets code find out when a piece of *previously requested* data changes, automating this via dependency tracking between compute-method results — even when that data lives on a remote server.

## The Implicit Criticism of Naive SignalR Usage

Without Fusion, delivering "your data just changed" notifications over SignalR means:
- A subscription group per data type
- Explicit update messages per change
- Client-side handlers wiring those messages back into UI state

Fusion replaces this with automatic dependency tracking — no manual subscribe/unsubscribe bookkeeping per data shape.

## Acknowledged Limitation

The article concedes SignalR's advantages that Fusion (at time of writing) didn't match:
- Client libraries in **multiple languages**
- Mature **connection resilience** and other production-hardening features "any production app needs"

> [!gap] This article dates to Stl.Fusion's ServiceTitan era (~2019). Whether the multi-language-client gap still holds for current ActualLab.Fusion / ActualLab.Rpc was not independently re-verified — no non-Yakunin-authored comparison was found in this research pass. See [[Research: ActualLab.Fusion Recent Developments & Community Reception]].
