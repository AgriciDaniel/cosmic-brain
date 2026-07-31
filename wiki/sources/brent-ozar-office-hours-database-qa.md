---
type: source
title: "Office Hours: Microsoft Database Q&A"
source_url: "https://www.youtube.com/watch?v=lCbPSYmCTHg"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-04-14
created: 2026-07-02
tags:
  - source
  - sql-server
  - performance-tuning
  - qa-livestream
status: current
related:
  - "[[Brent Ozar Unlimited]]"
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
raw_path: ".raw/notes/2026-07-02/Office Hours Microsoft Database Q&A.md"
---

# Office Hours: Microsoft Database Q&A

Source: [YouTube](https://www.youtube.com/watch?v=lCbPSYmCTHg) | Author/Speaker: [[Brent Ozar Unlimited]] (Brent Ozar) | Published: 2026-04-14

## Summary

A recurring live Q&A format ("Office Hours") where Brent Ozar answers the week's top-voted audience questions from pollgab.com/room/brento. This session (recorded shortly before SQL Bits, referencing SQL Server 2025) covers archiving strategy for multi-terabyte tables, files/filegroups, tempdb layout, Accelerated Database Recovery (ADR) trade-offs, multi-tenant database-per-client design vs. Availability Group limits, throughput measurement philosophy, and Master Data Services' (MDS) sunset trajectory. Distinct from the other four sources in this batch: it is unscripted opinion/advice rather than a structured technique demo.

## Key Points

1. **No magical cheap archiving exists.** If end users still need to query "archived" data, there is no built-in SQL Server/Azure SQL DB mechanism that makes old data both queryable and cheaper. **Stretch Table** (Microsoft's attempt at this — push cold data to the cloud) is cited as a product failure: "architected so piss poorly... the marketing team got so poorly involved that the price was astronomical... instead of the old data being cheaper, the old data was more expensive than your production data." If the goal is just deleting old rows, Brent points to his "fast ordered delete" technique (a rescue of an old, now-dead Microsoft blog post) for batched large-table deletes.
2. **Files/filegroups only pay off at real scale.** Not a short-term fix; only useful once SQL Server can genuinely spread I/O across multiple independent-throughput volumes simultaneously. Rule of thumb: reconsider single-data-file design once a database crosses roughly the **1TB mark** — mainly because by then the database is virtually guaranteed to keep growing, not because of anything magic about that number. Requires load testing, Enterprise Edition online rebuild + `WAIT_AT_LOW_PRIORITY`, and coordinated changes across primary/secondary replicas and QA restores.
3. **tempdb layout**: no benefit to putting the tempdb **log** file on a different drive from tempdb **data** files. Standard starting recommendation for a modest-core server: 4 tempdb data files + 1 tempdb log file, all equally sized, all on the same fast local SSD.
4. **Accelerated Database Recovery (ADR)** is not recommended by default for new SQL Server 2025 servers. ADR moves the row-versioning workload from tempdb into the **user database** itself — meaning an out-of-control transaction now bloats the user database (and its backups, and its secondary replicas), not just tempdb. Brent's objection isn't the feature ("I love the idea") but the operational reality that many shops chronically under-provision drive space and shrink files, which is exactly the failure mode ADR punishes hardest.
5. **Multi-tenancy: reject "one database per client" as a corruption-avoidance strategy.** More databases does not mean more reliability — corruption typically originates at the storage layer and spreads across every database on that storage regardless of how data is partitioned. Additionally, **Availability Groups have a per-AG database-count ceiling**, so one-database-per-client breaks down at scale (Brent cites clients hitting "massive walls" at 30,000-100,000+ databases). Recommended instead: group clients into a manageable number of databases (e.g., by region), which can still be split further later for data-governance/compliance reasons.
6. **Throughput metric of choice: P95 application-side latency, not Batch Requests/sec.** SQL Server has no native P95-latency counter; Brent explicitly prefers application-side monitoring tools (Datadog, New Relic, MiniProfiler) because they can attribute slowness to app-server vs. database-server, whereas Batch Requests/sec only measures *requests received*, not work actually completed to a useful latency bound.
7. **Master Data Services (MDS) has no future**, in Brent's assessment: it demands coordinated buy-in from dev, documentation, data-warehouse, and reporting teams simultaneously, was originally built on Silverlight (killed by Microsoft's own Silverlight team), and still requires an IIS VM even when a customer wants to move to Azure SQL DB — a structural mismatch with cloud-native deployment.

## Notable Quotes / Details

- "Drive space is expensive... performance is expensive... with database servers up in the cloud, we end up having to massively over-provision space in order to get the IOPS or the throughput that we want."
- "If you have a hundred of something, it is more likely at any given time that one of them is busted" — on rejecting one-database-per-client as a reliability strategy.
- "SQL Server does not count things like P95 latency delays... it's something that's much easier to catch via application-side monitoring."

## My Assessment

This is the most opinion-driven and least demo-driven of the five sources — no execution plans, no `sp_Blitz*` tooling, just consulting judgment calls with reasoning. Its main contribution to the vault is architectural/operational guidance one level up from query tuning: capacity-planning thresholds (1TB filegroup rule of thumb), a documented cautionary tale about a discontinued Microsoft feature (Stretch Table), and a clear throughput-measurement philosophy (P95 app-side latency over Batch Requests/sec) that complements rather than duplicates the diagnostic-tooling content already in [[SQL Server Performance Monitoring Tools]]. The ADR risk framing is new to the vault and worth a note there given ADR's relationship to the tempdb/row-versioning material already covered under RCSI.

## Related

- [[Brent Ozar Unlimited]] — speaker/publisher
- [[SQL Server Performance Monitoring Tools]] — throughput/diagnostic-metric philosophy contrast (Batch Requests/sec vs. P95 app-side latency)
- [[SQL Server Locking, Blocking, and Concurrency Control]] — tempdb/row-versioning cross-reference (RCSI vs. ADR both use row versioning, in different locations)
