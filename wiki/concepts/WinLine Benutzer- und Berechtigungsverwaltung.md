---
type: concept
title: "WinLine Benutzer- und Berechtigungsverwaltung"
created: 2026-06-08
updated: 2026-06-08
address: c-000233
status: developing
complexity: intermediate
domain: erp
tags:
  - winline
  - admin
  - security
  - concept
aliases:
  - "Benutzerverwaltung"
  - "Berechtigungen"
  - "WinLine permissions"
related:
  - "[[WinLine ADMIN]]"
  - "[[WinLine Mandant]]"
  - "[[Mesonic WinLine]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine Benutzer- und Berechtigungsverwaltung

How [[WinLine ADMIN]] models users and access rights across the suite.

## Users

Created in **Benutzeranlage** (register *Stammdaten*). Variants: standard **meso Benutzer**, **WEB Benutzer** (web access), **CRM Benutzer**, and **automatische Benutzeranlage**. Passwords via *meso Benutzer Passwort ändern*; login can be hardened with **2-Faktor-Authentifizierung (2FA)** (set up through WinLine mobile).

## Permissions (Berechtigungen)

Modeled **bidirectionally** — the same grants can be edited from either side:

- **Benutzer → Mandant** — for one user, which [[WinLine Mandant|Mandanten]] and objects.
- **Mandant → Benutzer** — for one client, which users.

Supporting structures:

- **Administrator** rights register.
- **Benutzergruppen** (user groups) and **Berechtigungsprofile** (permission profiles, definable) for reuse.
- **Objektberechtigungen vererben** — inherit object permissions.
- **Variablen sperren** — lock individual variables/fields.
- **Downloads** register and **CTK-Menüeinträge** auswertung.

## Why it matters

Permissions are per-Mandant, so a single WinLine installation hosting multiple companies isolates access per client. Profiles + groups keep large user bases manageable; 2FA covers remote/mobile access.
