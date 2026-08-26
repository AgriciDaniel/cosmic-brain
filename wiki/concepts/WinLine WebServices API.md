---
address: c-000263
title: "WinLine WebServices API"
tags:
  - concept
  - winline
  - webservices
  - api
  - mesonic
  - integration
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine WebServices Integration]]"
  - "[[WinLine WebServices Security Model]]"
  - "[[WinLine VBScript Engine]]"
  - "[[WinLine PPS]]"
  - "[[WinLine FIBU]]"
  - "[[WinLine FAKT]]"
---

# WinLine WebServices API

The WinLine MDP-WebServices (branded "MDP - WebServices") is an HTTP-based integration layer for [[Mesonic WinLine]] that enables external systems to read and write WinLine data without requiring direct program macros, ActionServer, or in-process access. The API is valid from WinLine Edition 2023, Version 12.17 onward.

## Overview

All communication is via plain HTTP (GET or POST). Every Export/Import data payload is XML. The API lives under the path `/ewlservice/` on the WinLine application server.

**Base URL pattern:**
```
http://<WinLineServer>/ewlservice/<command>?<parameters>
```

> [!note] The API is synchronous and stateless per call, but session tokens can be reused across calls for performance.

## Licensing Requirements

| Component | Requirement |
|-----------|-------------|
| WinLine license | Corporate (or compact with add-on) |
| Module | WinLine EXIM |
| MDP license | Runtime or Developer |
| Architecture | 64-bit Applikationsserver |
| Integration/maintenance | Must be performed by an MDP Partner |

For WinLine compact clients, the 64-bit Applikationsserver add-on costs EUR 161/month.

Each person (human or system) that reads or writes WinLine data — including via WebService — must be licensed as a WinLine user. A dedicated free `business/corporate` user account is required for the WebService.

## Authentication

### Login

Creates a SessionId (shadow user on the WinLine Server).

```
GET http://<WinLineServer>/ewlservice/login?user=<user>&password=<pw>&company=<mandant>
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `user` | Yes | WinLine EWL-Benutzer username |
| `password` | Yes | User password |
| `company` | Yes | Mandant identifier |
| `CompanyYear` | No | Wirtschaftsjahr (e.g. `2021` or `2021(5)`); defaults to latest |
| `Language` | No | Language code (see table below) |

**Language codes:**

| Code | Language |
|------|----------|
| 0 | Deutsch (default) |
| 1 | Englisch |
| 3 | Italienisch |
| 4 | Türkisch |
| 5 | Ungarisch |
| 7 | Tschechisch |
| 8 | Polnisch |
| 9 | Spanisch |
| 11 | Rumänisch |
| 12 | Kroatisch |
| 14 | Chinesisch |
| 15 | Albanisch |

**Returns:** `Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-2416`

Sessions expire 1 hour after the last command. Configurable in `server.config` via `MaxHTTPSessionKeepAliveTime=<seconds>` (default: 3600).

> [!warning] The EWL user must be explicitly defined as an EWL-Benutzer in WinLine administration.

### Logout

Explicitly terminates a session.

```
GET http://<WinLineServer>/ewlservice/logout?Session=<session-id>
```

### Test

Checks whether a session is still valid.

```
GET http://<WinLineServer>/ewlservice/test?Session=<session-id>
```

Returns `Success! Session="<id>"` or `Error! The requested Session was not found on the server.`

### Sessionless Operation

All commands (Reports, Export, Import, etc.) can be called without a pre-existing session by passing `user=`, `password=`, and `company=` directly in the request. This causes an automatic login/logout per call with a performance penalty versus reusing a session.

## Vorlagen (Templates)

Every Export and Import operation requires a named **Vorlage** (template). Templates are configured in WinLine START under:

> Vorlagen → Vorlagen Anlage → Export-/Import-Vorlagen

For a template to work with WebServices, the **"Webservice-Vorlage"** checkbox must be activated. Without this, the template cannot be used from the API (but can still be used in EXIM windows with the ODBC option `97 XML (WebService)`).

**Template types available for WebService:**

Personenkonten, Sachkonten, Interessenten, Artikel, Preise, Arbeitnehmer A, Kontakte, Anlagen, Kostenstellen, Kostenarten, Kostenträger, Projekte, Bankverbindungen, Mitarbeiter, Belege, Buchungsstapel, CRM, Fehlzeitenerfassung A, Lagerbuchung, Kommissionierung, Produktionsauftrag, Inventur, Lagerort-Zuordnung, PPS Zeiten, FORM Datenquellen.

**XSD export:** The Ribbon button "Webservice-Schema exportieren" generates an XSD file describing the XML structure for a given template. Use this as the contract for building import XML.

> [!warning] The WinLine user running the WebService must have permission to access the specific Vorlage being used.

## Reports Endpoint

Opens a WinLine report window, executes it, and returns the output as an Acrobat PDF.

```
GET http://<WinLineServer>/ewlservice/reports?Session=<id>&App=<app>&Win=<win>[&Id<n>=<val>...]
```

**Key parameters:**

| Parameter | Description |
|-----------|-------------|
| `App` | Application number containing the report window |
| `Win` | Window number of the report |
| `Id<n>` | Field value setter: `Id105=230A001` fills field 105 with "230A001" |
| `Exec` | ID of the button to execute (default: F5 button) |
| `WinAndId<n>` | For reports that open a second window (e.g. Bilanz); fills fields in that second window |
| `Grid<id>R<row>C<col>` | Sets a cell value in a grid/table field |
| `AlternativeForm` | Selects an alternative form if multiple are available (starting at 1) |
| `Filter` | Name of filter to use |
| `Where` | SQL expression for filter (requires `AllowWhereStatementInWebService=1` in server.config) |
| `Language` | Output language code |

Reports are saved to the user's TEMP directory on the server and deleted when the session ends. If a report produces multiple documents (e.g. UVA with tax slip, journal, and forms), all are merged into one PDF.

**Examples:**
```
# OP-Liste for account 230A001
http://<server>/ewlservice/reports?Session=<id>&App=01&Win=44&Id108=230A001&Id109=230A001

# Balance comparison for FY 2014 vs 2013
http://<server>/ewlservice/reports?User=a&Password=b&Company=300M&App=1&Win=168&Id165=12&Id175=1&Grid176R1C1=2014&Grid176R2C1=2013
```

## Export Endpoint

Runs a data export and returns the results as XML.

```
GET http://<WinLineServer>/ewlservice/export?Session=<id>&Type=<n>&Vorlage=<name>&Key=<key>
```

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `Type` | Template type code (see table below) |
| `Vorlage` | Template name |
| `Key` | Selection key (syntax varies by Type; see Export Keys section) |
| `Format` | `1` = UTF-8 output |
| `byref` | `1` = write result to file on server; return is the file link |
| `data` | Filename for `byref=1`; if omitted, a temp name is used |

> [!note] To allow multiple keys in one call, add `AllowWhereStatementInWebService=1` to server.config. Then use `Key='Num1','Num2','Num3'` syntax. See [[WinLine WebServices Security Model]] for why this flag exists and what it gates.

## Import Endpoint

Imports data from XML (either a server-side file or inline in the request).

```
POST http://<WinLineServer>/ewlservice/import?Session=<id>&Type=<n>&Vorlage=<name>&Data=<file>&byref=1
```

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `Type` | Template type code |
| `Vorlage` | Template name |
| `ActionCode` | `0`=check only, `1`=import (default); `2`=import+post (Buchungsstapel only) |
| `Data` | XML filename (relative to CWL server directory) or inline XML |
| `byref` | `1`=Data is a file path; `0`=Data is inline XML |
| `Format` | `1` = expect UTF-8 XML |
| `ImportID` | Deduplication ID for Buchungsstapel imports (Type 31) |

## Export/Import Type Codes

| Code | Name | German Description |
|------|------|--------------------|
| 1 | Personenkonten | Customer/vendor accounts |
| 2 | Sachkonten | General ledger accounts |
| 3 | Interessenten | Prospects/leads |
| 4 | Artikel | Articles/products |
| 5 | Preise | Prices |
| 6 | Arbeitnehmer A | Employees (HR module) |
| 7 | Kontakte | Contacts |
| 8 | Anlagen | Fixed assets |
| 9 | Kostenstellen | Cost centers |
| 10 | Kostenarten | Cost types |
| 11 | Kostenträger | Cost carriers |
| 15 | Projekte | Projects |
| 17 | Bankverbindungen | Bank accounts |
| 19 | Lagerort-Zuordnung | Warehouse location assignment |
| 20 | Mitarbeiter | Employees (FAKT/operations) |
| 30 | Belege | Vouchers/documents (FAKT) |
| 31 | Buchungsstapel | Accounting posting batches (FIBU) |
| 34 | CRM | CRM workflows and actions |
| 36 | Fehlzeitenerfassung A | Absence time recording (SMART TIME) |
| 38 | Lagerbuchungen | Warehouse bookings |
| 39 | Kommissionierung | Picking/commissioning |
| 40 | Produktionsauftrag | Production orders (PPS) |
| 41 | Inventur | Inventory counts |
| 42 | PPS Zeiten | PPS time entries |
| 50 | FORM Datenquellen | FORM data sources |

## Export Key Syntax by Type

### Filter syntax (Types 01–17, 41)

To use a named filter instead of a direct key:
```
FilterTopKunden   => applies filter named "TopKunden"
```

Filters must be pre-defined in WinLine START → Vorlagen → EXIM.

### Type 01 — Personenkonten

Key = Kontonummer. Supports SQL WHERE on tables T051, T054, T055, T058:
```
Key=where T055.C003 Like '%%sport%%'       => all accounts where name contains "sport"
Key=where T055.C004 = 2                    => all customers (Debitor type 2)
```

### Type 02 — Sachkonten
Key = Sachkontonummer.

### Type 03 — Interessenten
Key = Interessentennummer.

### Type 04 — Artikel
Key = Artikelnummer.

### Type 05 — Preise
Key = Artikelnummer.

### Type 06 — Arbeitnehmer A
Key = AN-Key. Supports WHERE on table T045.

### Type 07 — Kontakte
Key = Nachname (last name). Supports WHERE on table T045:
```
Key=where T045.C039 = '230A001'   => all contacts for customer 230A001
```

### Type 08 — Anlage
Key = Anlagennummer.

### Type 09 — Kostenstelle
Key = Kostenstellennummer.

### Type 10 — Kostenart
Key = Kostenart-Nummer.

### Type 11 — Kostenträger
Key = Kostenträgernummer.

### Type 15 — Projekte
Key = Projektnummer.

### Type 17 — Bankverbindungen
Key = Personenkontonummer.

### Type 19 — Lagerort-Zuordnung
Key = Artikelnummer or Artikeluntergruppe.

### Type 20 — Mitarbeiter
Key = Mitarbeiternummer.

### Type 30 — Belege

Key format: `Kontonummer-Laufnummer`
For multiple: `'230A001-247','230B001-47','230C001-11'`

### Type 31 — Buchungsstapel

Key syntax: `[Jxxx[-yyy]][Paa[-bb]][A]`

| Prefix | Meaning |
|--------|---------|
| `J` | Buchungsnummer (from/to) |
| `P` | Periode (from/to) |
| `A` | Suppress automatic bookings (Automatikbuchungen unterdrücken) |

Examples:
```
J100         => Buchungsnummer 100
J100-150     => Buchungsnummern 100 to 150
J100-150P1-2 => Buchungsnummern 100–150, Periode 1–2
P3           => all bookings in Periode 3
J100A        => Buchungsnummer 100, suppress automatic bookings
```

Invalid: `J-100`, `P100` (period 100 unknown), `A` alone, `J100-105X`.

### Type 34 — CRM

Key = Workflow-Nummer (positive) or Aktionsschritt (negative):
```
100,101,102    => Workflows 100, 101, 102 (all steps)
-100,-101,-102 => Action steps 100, 101, 102
```

### Type 36 — Fehlzeitenerfassung A (SMART TIME)

Parameters joined by `'`:
```
'AF1'AT2'DF01-01-2021'DT31-01-2021'F1'S1'I1
```

| Param | Meaning |
|-------|---------|
| AF | Arbeitnehmer von |
| AT | Arbeitnehmer bis |
| BF | Betrieb von |
| BT | Betrieb bis |
| DF | Datum von (TT-MM-JJJJ) |
| DT | Datum bis |
| F1 | Include Fehlzeiten |
| S1 | Include Sollzeiten |
| I1 | Include Istzeiten |
| P1 | Include Pause |

### Type 38 — Lagerbuchungen

Syntax: `[Jxxx[-yyy]][Paa[-bb]][MCHANGE]`

`MCHANGE` swaps Menge/Menge2 fields to reflect original Rückstandsmenge entry.

### Type 39 — Kommissionierung

Key format: `Kontonummer-Laufnummer` (same as Belege).

### Type 40 — Produktionsauftrag

**Legacy syntax (up to v10.5, still valid):**
```
LAGER4711          => entire production order
LAGER4711+2        => only Arbeitsschritt 2
LAGER4711+2+1      => components of Arbeitsschritt 2
```

Flag values: 0=step+components, 1=components only, 2=step only, 3=step+components+sublevels, 4=same as 3; 10–14 = steps only; 20–24 = components only.

**Extended syntax (v11+), prefix `+++`:**
```
+++T324C002=25343                   => production order 25343
+++T324C002=25343+T324C002=25346    => orders 25343 to 25346
+++T324C002Lager1478+ORDERBYC086 DESC
```

Parameters: `+T324C002` (order no.), `+T324C021` (Arbeitsschritt), `+T324C004` (Artikelnummer), `+T324C015` (Datum, TT-MM-JJJJ), `+T324C023` (Kundenkonto), `+T324C033` (Produktionstyp), `+T324C037` (Belegdruckstatus), `+T324C066` (Stapelnummer), `+QUERY`, `+FLAG`, `+T324ORDERxy` (sort).

### Type 41 — Inventur

Key = Artikelnummer or Zählliste name:
```
ZaehllisteSchnelldreher   => use count list "Schnelldreher"
```

### Type 42 — PPS Zeiten

Extended syntax with `+++` prefix (same pattern as Type 40):
```
+++T160C007=25343+T160C007=25346   => production orders 25343–25346
+++T160C00725505+T160c0115-1+T160c00327032020+Flag0
```

Parameters: `+T160C007` (order no.), `+T160C003` (Datum), `+T160C024` (Stapelnummer), `+T160C034` (Schicht), `+T160C011` (Ressource), `+T160C015` (Tätigkeit), `+QUERY`, `+FLAG` (0=SOLL, 4=IST).

> [!note] Only IST-Zeiten that have not yet been finally reported (nicht endgemeldet) can be exported.

### Type 50 — FORM Datenquellen

Key = FORM-Schlüsselobjekt value if defined, otherwise MESOKEY from the data source table.

## Import-Specific Behavior

### Personenkonten — Automatic Number Assignment

Instead of a fixed Kontonummer, use:
- `+` — use standard number range or FIBU parameter ranges
- `Nummernkreis+` — increment from end of the specified number range
- `Startnummer+` — find next free number from the starting number

This auto-numbering also applies to: Interessenten, Artikel, Sachkonten, Arbeitnehmer, Kontakte, Anlagen, Kostenstellen, Kostenarten, Kostenträger, Projekte, Mitarbeiter, FORM Datenquellen.

### Belege Import Options

The XML root element supports attributes:

| Attribute | Values | Meaning |
|-----------|--------|---------|
| `option` | 0–5 | 0=new voucher, 1=Lieferschein from Auftrag, 2=Rechnung from Lieferschein, 3=edit, 4=cancel, 5=edit Lieferschein |
| `extInsert` | 0–2 | 0=no main article, 1=insert main article, 2=insert main + intermediate articles |
| `amount` | 0–2 | 0=per document type, 1=set to 0, 2=only print imported lines |
| `extEntry` | 0–2 | 0=error if variant not found, 1=create variant if missing, 2=always create Charge |
| `printVoucher` | 0–4 | 0=no print, 1=Angebot, 2=Auftrag, 3=Lieferschein, 4=Rechnung |
| `completedVoucher` | 0–1 | 0=create new if already completed, 1=skip completed |
| `ChangeLotSize` | 1 | Enforce Losgröße rules on import |

> [!warning] Attribute names are case-sensitive.

Date format for all imports: `YYYY-MM-DD`. Dates with time: `2022-06-13T15:30:00`. Checkbox fields accept `true`, `false`, `0`, `1`. RTF in note fields is stripped to plain text on export.

**Import result XML structure:**
```xml
<MESOWebServiceResult>
  <OverallSuccess>true</OverallSuccess>
  <ResultDetails>
    <KeyValue>BELEGKEY: 1</KeyValue>
    <VoucherNumber>517</VoucherNumber>
    <Success>true</Success>
  </ResultDetails>
</MESOWebServiceResult>
```

### Buchungsstapel (Type 31)

`ImportID` parameter prevents duplicate imports: the ID is written to T330 on first import; subsequent calls with the same ID are rejected. Use `ActionCode=2` to import and post in one step.

### Produktionsauftrag (Type 40) — Action Codes

| ActionCode | Action | Required fields |
|------------|--------|-----------------|
| 2 | Create production order | Prod.Auftragsnummer, Artikelnummer, Produktionsdatum, Auftragsmenge |
| 3 | Delete production order | Prod.Auftragsnummer, Kurzcode (Arbeitsschrittnummer) |
| 4 | Add article lines | Prod.Auftragsnummer, JournalKey, Artikelnummer, Auftragsmenge, Produktionsdatum |
| 5 | Add article lines + print Materialentnahme | Like 4 and 6 |
| 6 | Print Materialentnahme | Prod.Auftragsnummer, JournalKey, Journalzeilennummer, Materialmenge, Auftragsmenge, Produktionsdatum |
| 9 | Schnellendmeldung | Journalkey, Prod.Auftragsnummer, Ebene, Artikelnummer, Materialmenge, MengeAuftrag, Produktionsdatum, MengeZuProduzieren |

JournalKey last three digits can be `000` — WinLine auto-assigns the next available journal key number.

### PPS Zeiten (Type 42) — Action Codes

| ActionCode | Action |
|------------|--------|
| 0 | Create IST-Zeiten |
| 1 | Delete IST-Zeiten |

### Inventur Import Attributes

| Attribute | Values | Meaning |
|-----------|--------|---------|
| `ZListe` | name | Specify which Zählliste to import into |
| `option` | 0/1 | 0=replace, 1=supplement existing entries |
| `inactive` | 0/1 | 0=exclude inactive articles, 1=include |

### Kommissionierung

Only packaging type 1 (Verpackungsart 1) is imported. Follow-on packaging types 2 and 3 are not imported.

## Additional Endpoints

### Macro

Executes a server-side WinLine macro (see [[WinLine VBScript Engine]] for macro-code semantics) with optional parameters.

```
GET http://<WinLineServer>/ewlservice/macro?Session=<id>&Name=<MacroName>[&Param20=<val>][&OutputFormat=pdf|xml]
```

Parameters passed to macro are indexed from 20 (0–19 are system variables). Use leading zeros for parameter numbering above 10 (e.g. `Param20`, `Param21`).

`OutputFormat=pdf` captures PDF output from the macro. `OutputFormat=xml` returns XML result. Omit for no return value.

### LIST

Outputs a WinLine LIST list as PDF or JSON.

```
GET http://<WinLineServer>/ewlservice/LIST?Session=<id>&Name=<ListName>&OutputFormat=pdf|json
```

Additional parameters: `OutputFile=<path>` (write to file on server), `Filter=<name>`, `Where=<SQL>`, `DatasourceSel1`–`DatasourceSel4` (text/numeric data source selectors).

Use `Filter=<NOFILTER>` to output without any filter. If a non-existent filter name is specified together with `DatasourceSelx`, a new data source is created under that name.

### POSTING

Posts an already-imported Buchungsstapel (must have been imported via WebService Type 31).

```
GET http://<WinLineServer>/ewlservice/POSTING?Session=<id>&ImportID=<id>[&RemoveStack=0|1]
```

`RemoveStack=1` (default) deletes the stack after posting. `RemoveStack=0` keeps it.

### Voucherdownload

Downloads a printed voucher as PDF.

```
GET http://<WinLineServer>/ewlservice/POSTING?Session=<id>&Account=<kontonr>[&SerialNo=<n>|&VoucherNo=<belegnr>]
```

Output is saved to `MESOWebserviceVoucherinfo/` on the WinLine server. Either `SerialNo` or `VoucherNo` must be provided; `Account` is always required.

> [!note] Querying by `VoucherNo` can return multiple PDFs if a voucher has passed through multiple stages (e.g. Lieferscheine linked to a Sammelrechnung are all returned when querying the Rechnungsnummer).

## server.config Settings

| Setting | Purpose |
|---------|---------|
| `MaxHTTPSessionKeepAliveTime=3600` | Session idle timeout in seconds |
| `AllowWhereStatementInWebService=1` | Enable WHERE clauses in Key parameter and multi-key syntax |

## See Also

- [[WinLine WebServices Integration]] — practical setup and patterns for Framas integration work
- [[WinLine WebServices Security Model]] — the two deliberate scope-limiting safeguards
- [[Mesonic WinLine]] — the ERP system this API fronts
- [[WinLine PPS]] — production module (Type 40, 42 operations)
- [[WinLine FIBU]] — accounting module (Type 31 Buchungsstapel)
- [[WinLine FAKT]] — invoicing module (Type 30 Belege, Type 38/39 warehouse)
