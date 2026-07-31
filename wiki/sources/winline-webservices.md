---
address: c-000262
title: "WinLine WebServices White Paper (Version 12)"
tags:
  - source
  - winline
  - webservices
  - api
  - mesonic
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine WebServices API]]"
  - "[[WinLine WebServices Integration]]"
  - "[[WinLine WebServices Security Model]]"
---

# WinLine WebServices White Paper (Version 12)

**Source:** `.raw/winline/docs/md/White Paper - WinLine WebServices - 12.md`
**Publisher:** mesonic GmbH
**Date:** October 2023
**Scope:** WinLine Edition 2023, Version 12.17+
**Language:** German

## Summary

This white paper documents the MDP-WebServices layer for WinLine, the HTTP-based integration API that allows external systems to exchange data with WinLine without using direct program macros, ActionServer, or other in-process mechanisms. All data transfer uses XML format over HTTP GET/POST.

The document covers:
1. Prerequisites (licensing, template configuration)
2. All core API endpoints (Login, Logout, Test, Reports, Export, Import, Macro, LIST, POSTING, Voucherdownload)
3. All 25 Export/Import type codes with their key syntax
4. Detailed XML examples for complex operations (Belege, Produktionsauftrag, IST-Zeiten, Inventur, CRM)

## Key Facts Extracted

- **Base URL pattern:** `http://<WinLineServer>/ewlservice/<command>?<params>`
- **Authentication:** Session-based (login returns a SessionId UUID); sessions expire 1h after last command (configurable via `MaxHTTPSessionKeepAliveTime` in server.config)
- **EWL user type:** All API users must be defined as "EWL-Benutzer" in WinLine
- **Data format:** All Export/Import streams are XML; UTF-8 via `Format=1`
- **Template system:** Every Export/Import call requires a named Vorlage (template) that must have the "Webservice-Vorlage" checkbox enabled
- **EXIM module required:** License dependency is WinLine corporate + WinLine EXIM + MDP (Runtime or Developer) + 64-bit Applikationsserver

## Operations Covered

| Operation | Endpoint | Returns |
|-----------|----------|---------|
| Login | `/ewlservice/login` | SessionId |
| Logout | `/ewlservice/logout` | Confirmation |
| Test | `/ewlservice/test` | Session status |
| Reports | `/ewlservice/reports` | PDF |
| Export | `/ewlservice/export` | XML |
| Import | `/ewlservice/import` | XML result |
| Macro | `/ewlservice/macro` | PDF or XML |
| LIST | `/ewlservice/LIST` | PDF or JSON |
| POSTING | `/ewlservice/POSTING` | Confirmation |
| Voucherdownload | `/ewlservice/POSTING` (subpath) | PDF file on server |

## Export/Import Types (all 25 codes)

Codes 01–50 correspond to WinLine data domains. See [[WinLine WebServices API]] for the full table.

## Pages Created from This Source

- [[WinLine WebServices API]] — comprehensive reference for all endpoints, parameters, and export/import type codes
- [[WinLine WebServices Integration]] — practical integration guide: prerequisites, templates, patterns, error handling
- [[WinLine WebServices Security Model]] — added 2026-07-13 in a deep re-ingest pass: synthesizes the `AllowWhereStatementInWebService` SQL gate and the POSTING batch-origin restriction, previously documented piecemeal in the two pages above but never called out together as security boundaries

## Re-ingest Note (2026-07-13)

This source was re-read in full for a deeper pass. The existing API and Integration pages were already comprehensive (all 25 type codes, full endpoint reference, integration patterns) — the gap found was a missing security synthesis, not missing endpoint coverage. See the new [[WinLine WebServices Security Model]] page and its cross-links added to both existing pages.
