---
type: source
address: c-000200
title: "FramasDbSchemaManagement"
source_url: https://github.com/ncdframas/FramasDbSchemaManagement
fetched: 2026-06-05
created: 2026-06-05
updated: 2026-06-05
tags:
  - source
  - database
  - framas
  - schema
status: current
related:
  - "[[Framas]]"
  - "[[DOGE WH Database Schema]]"
  - "[[Framas DBO Schema]]"
  - "[[Framas WL Schema]]"
  - "[[MPDV HYDRA]]"
---

# FramasDbSchemaManagement

Source: [GitHub: ncdframas/FramasDbSchemaManagement](https://github.com/ncdframas/FramasDbSchemaManagement)
Live docs: https://dbdocs.io/ncdframas/DOGE_WH

Schema documentation repository for [[Framas]]'s `DOGE_WH` SQL Server database.
Auto-generated from [[FramasDbSchemaChangeTracker]] .NET service via `sp_gen_dbml`.

## What Was Ingested

- 62 dbo tables (`FT`/`ST`-prefixed) — Framas OMS/MES integration layer
- 330 wl tables — [[WinLine ERP]] (Meso Software)
- 4 views (`dbo.v_OMS_*`, `wl.v*`)
- GitHub Actions workflow (merge + publish to dbdocs)

## Pages Created

- [[Framas]] (entity, c-000201)
- [[DOGE WH Database Schema]] (concept, c-000202)
- [[Framas DBO Schema]] (concept, c-000203)
- [[Framas WL Schema]] (concept, c-000204)

## Key Insight

The `dbo` schema is the integration hub: it bridges [[WinLine ERP]] (PO data via FT400+) and [[MPDV HYDRA]] (production orders via FT600) into a unified OMS/label/quality layer. Column names are obfuscated (`cNNN`) with business names stored in DBML `note:` fields.
