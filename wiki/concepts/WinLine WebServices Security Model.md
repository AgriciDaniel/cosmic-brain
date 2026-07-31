---
address: c-000346
title: "WinLine WebServices Security Model"
tags:
  - concept
  - winline
  - webservices
  - security
  - mesonic
created: 2026-07-13
status: current
related:
  - "[[WinLine WebServices API]]"
  - "[[WinLine WebServices Integration]]"
  - "[[Mesonic WinLine]]"
---

# WinLine WebServices Security Model

The [[WinLine WebServices API]] ships with two deliberate scope-limiting safeguards. Both exist to prevent the WebService from becoming an arbitrary SQL or arbitrary-batch execution channel over HTTP. Neither is a bug — both are documented in the White Paper as intentional guardrails.

## 1. WHERE-clause / multi-key gate

By default, `Key=` on Export and `Where=`/`Filter=` on Reports and LIST accept only a single literal key value. Two capabilities are locked behind a single server.config flag:

```
AllowWhereStatementInWebService=1
```

Enabling this flag unlocks:
- Raw SQL in `Where=` (Reports, LIST) — e.g. `Where=T055.C004=2`
- Raw SQL in `Key=where ...` (Export) — e.g. `Key=where T055.C003 Like '%%sport%%'`
- Multi-record `Key='Num1','Num2','Num3'` selection (Export)

> [!warning] Without this flag, the WebService cannot execute attacker-controlled SQL fragments even if the caller controls the `Key=`/`Where=` parameter value — the parameter is treated as an opaque single-key lookup. Enabling it is an explicit trust decision: only turn it on for templates/users where the caller is trusted not to submit destructive or exfiltrating WHERE clauses.

## 2. POSTING batch-origin restriction

The `POSTING` endpoint (see [[WinLine WebServices API]]) can only post a Buchungsstapel (booking batch) that was itself previously imported through the *same* MDP-WebService via Type 31 Import. The White Paper states this explicitly:

> "Es können mit dem MDP-WebService keine anderen Buchungsstapel gebucht werden" — no other/arbitrary booking batches can be posted via the MDP-WebService.

This means `POSTING?Session=<id>&ImportID=<id>` only works for an `ImportID` that this same WebService channel created. A caller cannot use POSTING to trigger the posting of a batch that a WinLine operator built interactively in the FIBU client, or that arrived through any other import path. The `ImportID` uniqueness check (T330, see [[WinLine WebServices Integration]]) doubles as the enforcement mechanism: it is both a dedup guard and the provenance record POSTING checks against.

## Why these two belong together

Both facts answer the same question a security reviewer will ask first — "what can an external caller with API access actually do to this ERP?" — and both are easy to miss because they're documented inline in unrelated endpoint sections (Export/Reports for #1, POSTING for #2) rather than called out as security boundaries. Read together:

- Without `AllowWhereStatementInWebService=1`, external callers cannot express arbitrary SQL — only exact single-key lookups.
- Even with FIBU/Buchungsstapel access, external callers cannot post arbitrary existing batches — only ones they themselves staged through Import Type 31.

## See Also

- [[WinLine WebServices API]] — full endpoint and parameter reference
- [[WinLine WebServices Integration]] — practical patterns, including the ImportID idempotency pattern
- [[Mesonic WinLine]] — the ERP system
