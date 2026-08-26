---
type: meta
title: "Dashboard"
updated: 2026-04-08
tags:
  - meta
  - dashboard
status: evergreen
related:
  - "[[index]]"
  - "[[overview]]"
  - "[[log]]"
  - "[[concepts/_index]]"
  - "[[Compounding Knowledge]]"
---

# Wiki Dashboard

Navigation: [[index]] | [[overview]] | [[log]] | [[hot]]

The dashboard uses **Obsidian Bases**. A core Obsidian feature shipped in v1.9.10 (August 2025). No plugin install required.

> [!tip] Embedded Bases view
> The interactive dashboard lives in [[dashboard.base]]. Open that file directly, or use the embed below.

![[dashboard.base]]

---

## Legacy Dataview Dashboard (Optional)

If you are on Obsidian < 1.9.10 or prefer Dataview, the queries below still work. Just install the Dataview community plugin.

### Recent Activity

```dataview
TABLE type, status, updated FROM "wiki" SORT updated DESC LIMIT 15
```

### Seed Pages (Need Development)

```dataview
LIST FROM "wiki" WHERE status = "seed" SORT updated ASC
```

### Entities Missing Sources

```dataview
LIST FROM "wiki/entities" WHERE !sources OR length(sources) = 0
```

### Open Questions

```dataview
LIST FROM "wiki/questions" WHERE status = "developing" OR status = "seed" SORT updated DESC
```

### Comparisons

```dataview
TABLE verdict FROM "wiki/comparisons" SORT updated DESC
```

### Sources

```dataview
TABLE author, date_published, updated FROM "wiki/sources" WHERE type = "source" SORT updated DESC LIMIT 10
```
