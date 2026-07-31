---
type: concept
title: "HYDRA SIF DLG Service Catalog"
created: 2026-07-14
updated: 2026-07-14
address: c-000349
tags:
  - concept
  - mes
  - hydra-8
  - reference
  - dlg-catalog
  - bapi
  - rest-api
status: current
related:
  - "[[HYDRA Service Interface (SIF)]]"
  - "[[HYDRA SIF RET Error Codes]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA HLS Module]]"
  - "[[HYDRA PZE Module]]"
  - "[[HYDRA PZW Module]]"
  - "[[HYDRA PEP Module]]"
  - "[[HYDRA MPL Module]]"
  - "[[HYDRA PDV Module]]"
  - "[[HYDRA WRM Module]]"
  - "[[HYDRA Multi-Tool Resource Configuration]]"
sources:
  - "[[hydra-service-interface-sif]]"
  - "[[sop-hydra-multi-mold-machine]]"
complexity: reference
domain: "Manufacturing Execution Systems"
---

# HYDRA SIF DLG Service Catalog

Reference table of the legacy PDM dialog / BAPI calls (`DLG=OBJEKT.AKTION|...`) documented in chapters 8-19 of [[hydra-service-interface-sif]], callable through [[HYDRA Service Interface (SIF)]] either directly (`POST /dlg/command`) or via their REST-native successor service where one exists (see the [[hydra-service-interface-sif|source doc]] §5.2 for the dialog→service migration map). This is a **navigation index, not a field-level reference** — each row gives the DLG code family and purpose; go to the source document's matching chapter/section for full parameter lists.

Wire format for every call: `DLG={id}|USR={N4}|DAT={mm/dd/yyyy}|ZEI={sec}|<fields>|`, returns `RET={0=ok}|KT=|LT=|`. Insert/Update/Delete/Copy/Lock/Unlock/New/Select suffixes are the standard BAPI CRUD+lock verb set across almost every `OBJEKT.*` family below.

## Ch.9-10 — PDM Basis (system-level, not module-specific)

| DLG code family | Purpose | Notes |
|---|---|---|
| `SCMD;44` | Read server time | Also returns DST transition dates/times, GMT offset |
| `SCMD;41` | Send terminal status | IP, program version, restart/reload flags returned |
| `SCMD;53` | Reload terminal lists on demand | `LOAD=ANR,MNR,PNR,MAT,RES,PPKT`; uses port 9002 (terminal) / 9005 (PCC) |
| `HSODATA.INSERT` | Generate MLE outbound segment | Header/child SAP-iDoc-style segment chaining via `VERWEIS:HEADER` |
| `SCMD;51` | Generate logging/change-management entry | Requires matching Logging configuration entry |
| `SCMD;52` | Create dialog error log entry | |
| — | Trigger escalation | `EscalationMessages.insertHms` (service) / `ESKMSG.INSERT` (dialog, outdated) |
| `TNR.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Terminal configuration | `TNR.PROGLADEN` (leave terminal update), `TNR.NEUSTART` (restart), `TNR.ADMIN` |
| `BEARBFKT.*` | Function authorizations | + `SYSAuthorization.checkAuthorization`/`.list` (service, SP16+) |
| `FKTPROF.*` | Function profiles | |
| `VABPROF.*` | Responsibility profiles | |
| `BEARBVABPROF.*` | Assignment of responsibility areas | |
| `BEARB.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST/LOGIN/LOGOUT` | User administration + login/logout | |
| `LOCK.DELETE` | Delete locked data records | Manual unlock/recovery |
| `PATH.*` | Path configuration | |
| `LIC.INSERT/DELETE/LIST` | Licensing | Insert/Delete "please use user interface" — not really meant for API use |
| `CLIENT.LOGIN/LOGOUT` | Client login/logout | |
| `INI.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/IMPORT/EXPORT/LIST` | INI configuration | |
| `INIDATA.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | INI section data | + `IniDataConfiguration.list` (service, SP16+) |
| `NRKREIS.INSERT/UPDATE/DELETE/LOCK/UNLOCK/LIST/CREATENR` | Number ranges | `CREATENR` mints new numbers from a range |

## Ch.11-12 — BDE/MDE (production data collection + order/operation master data)

| DLG code family | Purpose | Notes |
|---|---|---|
| `A_AN` | Log operation on | |
| `A_P_AN` | Log operation and person on together | |
| `A_TR` | Post part quantity (partial confirmation) | |
| `A_UN` | Interrupt operation | |
| `A_AB` | Log operation off | |
| `A_BE` | Finish operation | |
| `A_MR` | Quantity upload | Bulk quantity posting |
| `P_AN` / `P_AB` / `P_AAB` | Log person on / off / log off all persons from machine | |
| `M_MST` | Change machine status | |
| `M_AST` | Automatic status update | |
| `A_SMG` | Change target quantity | |
| `M_SZY` | Change target cycle time | |
| `M_TLG` | Change partitioning | |
| `M_PSPERRE` | Log production lock | |
| `HY_BEM` | BDE comment | |
| `A_AUN` / `A_AAN` / `A_ASW` | Shift end / shift begin / shift change postings | |
| — | Reading: machine info, shift calendar, order list, personnel list, machine status list, deviation reasons, premium indicator, terminal list, operation comments, order BOM, scrap reasons, BDE order types, counter list, MDE-shop-floor-client assignment, HLS production variants | Read-only list dialogs, mostly `LIST;NN` numbered or dedicated `*.LIST` services — see source §11.4-11.5 for the full per-topic breakdown |
| `ADEPRO.INSERT/COPY/UPDATE/DELETE/LOCK/UNLOCK/SELECT/SIGN` | BDE log records | `SIGN` = electronic signature on a log record |
| — | Reason texts / reasons configuration | Ch.12.3 |
| `ANR.LOCK/UNLOCK/EINPLANEN/AUSPLANEN/SPERREN/ENTSPERREN/AKTUALISIEREN/FREIGEBEN/SETSTATUS/INSERT/UPDATE/COPY/DELETE/SELECT/LIST` | Order **and** operation management (same `ANR.*` namespace serves both objects) | `EINPLANEN`/`AUSPLANEN` = schedule/deschedule; `SPERREN`/`ENTSPERREN` = block/unblock (distinct from `LOCK`/`UNLOCK` editing-lock); `SETSTATUS` applies to both order and operation |
| `ANR.SPLITCREATE/SPLITDELETE/ADVSPLITCREATE` | Operation split (standard + "enhanced") | |
| `ANR.SAGINSERT/SAGDELETE` | Merged-operation ("Sammelauftrag") create/delete | |
| `ANETZ.LOCK/UNLOCK/INSERT/UPDATE/DELETE/AKTUALISIEREN` | Order network (multi-order dependency graph) | |
| `MATLIST.LOCK/UNLOCK/INSERT/UPDATE/DELETE` | Material list editing | Shared with WRM chapter — appears at the BDE/order-network boundary |

## Ch.13 — MDE Master Data

| DLG code family | Purpose |
|---|---|
| `MNR.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST/SKINFO` | Machine/workplace configuration; `SKINFO` reads shift information |
| `MSTTXT.INSERT/UPDATE/DELETE/LOCK/UNLOCK/SELECT/LIST` | Machine status texts |
| `STKL.INSERT/UPDATE/DELETE/LOCK/UNLOCK/SELECT/LIST` | Status classes |
| `MST.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Valid machine statuses |
| `MNRCTR.INSERT/UPDATE/MODIFY/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Counter configuration |
| `MNRTNR.INSERT/DELETE/SELECT/LIST` | Machine-to-terminal assignment |
| `GRPRES.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Group/resource assignment |
| `GRP.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT` | Groups |
| `MDEPRO.INSERT/COPY/UPDATE/DELETE/LOCK/UNLOCK` | MDE postings (raw machine-data-collection log records) |

## Ch.14 — HR (PZE / PZW / ZKS / PEP)

| Area | Purpose |
|---|---|
| Optional SAP data transfer | Precondition/config note, not a dialog |
| Sending HR data | Transfer of PZE + ZKS time events; transfer of access statuses and access logs |
| Reading HR data | PZE access authorizations; ZKS access authorizations; access time model list; public holidays; opening hours; terminal list; access list |
| Online requests | Online PZE authorization check; online ZKS authorization check; person account-balance request |
| Pre-processed third-party import | Import of day-related (clocking) data |
| Transferring configs from third-party systems | Planned working time; absence planning; account limits creation; PZE/ZKS terminal authorization assignment |
| Incentive wage data collection | `ZUSCHLGR.LIST` (bonus reason list); `P_ZUSCHL` (record bonus on terminal) |

Note: this chapter is organized by data-flow direction (send/read/online/import/config), not by `DLG=` code family the way ch.9-13 and 15-19 are — reflects that HR/PZE/ZKS integration is inherently bidirectional with third-party time/access systems.

## Ch.15-16 — MPL (Material & Production Logistics)

| DLG code family | Purpose |
|---|---|
| `CA_WL` | Batch change |
| `CE_AN` / `CE_AB` | Log input batch on / off |
| `C_UMB` | Repost batch |
| `C_GEN` | Goods receipt batch |
| `A_VERB` | Consumption posting |
| `CNR.MODIFY` | Create/change batches |
| `C_MBEW` | Goods movement |
| `C_STA` | Change batch status |
| `CE_WL` | Input batch change |
| — | Reading MPL data: material list/batch info, material buffer, material types, transport unit, component list, batch attributes by material type, batch logs (MPL-PRO) |
| — | Process of changing output batches: input batch data, output batch data, output batch change, job end (4-step sequence, not individual dialogs) |
| `CE_AN_PA` / `CE_DEL_PA` / `CA_WL_PA` | Packing/palletizing (MPL-PAL): assign batches to TPU, delete assignment, complete TPU |
| — | Master data: quantity changes affecting several products; MPL setup; material types/buffer/transport units master config |
| — | Movement data: batch stock, material movements, cutting plan |
| — | Transport management (MPL-TRA): create / reserve / start / finish transport order (4-step lifecycle, not individual DLG codes in TOC) |

## Ch.17 — PDV (Process Data Visualization) Master Data

| DLG code family | Purpose |
|---|---|
| `PDVEVENTCFG.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/SELECT/LIST` | Event configuration |
| `LOGCHAN.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/SELECT/LIST` | Logical channels |
| `PAUMMAUSP.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Characteristic attributes |

## Ch.18-19 — WRM (Tool & Resource Management, incl. DNC)

| DLG code family | Purpose |
|---|---|
| `RES_AN` / `RES_AB` | Log resource on / off |
| `RES_STATUS` | Set resource status — write-triggers `res_ress_belegung` occupancy rows when a resource is blocked (`verarb_planung != 'K'`); see [[HYDRA Multi-Tool Resource Configuration]] § "res_ress_belegung write-trigger" |
| `RES_FREI` | Release resource |
| `RES_ABSTA` | Change resource status to "status after logging OP off" |
| `RES_UMB` | Repost resource |
| `RES_EIN` / `RES_AUS` | Mount / demount resource |
| `RES_DOWNL` / `RES_UPLOAD` | DNC: load/upload NC program to/from machine |
| `LIST;82` / `LIST;83` | DNC-family machines list / loadable DNC programs list |
| `RES_WART` | Maintenance status and activation |
| `RES_MASS` | Activate measure |
| `LIST;115/116/117/118/119/120/91/133/129/132` | Resource lists: resource / resource status / measures / resource types / resource family / resource maintenance / maintenance activities / resource comments / registered resources / combined production-resource+tool-batch list |
| `RES.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Resource master data |
| `RESATTR.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` | Free (user-defined) attributes |
| `USRFLDELEM.LIST` | Field definition list (shared with SIF's own custom-field mechanism, see source doc §5.2.3 `MDUserfieldConfiguration.list`) |
| `RESLIST.INSERT/DELETE/LIST` | Resource list (grouping construct, distinct from `RES.LIST`) |
| `RESBEDRES.INSERT/DELETE/COPY` | Assignment to required resources |
| `RESFAM.INSERT/UPDATE/DELETE/LOCK/UNLOCK/NEW` | Resource families |
| `RESWART.INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK` | Resource maintenances (config, distinct from `RES_WART` posting above) |

## Reading the catalog

- **Capitalization convention**: `OBJEKT.AKTION` dialogs (dot-separated) are almost always CRUD+lock BAPI families with the standard `INSERT/UPDATE/DELETE/COPY/LOCK/UNLOCK/NEW/SELECT/LIST` verb set — once you know the object prefix (`MNR`, `RES`, `ANR`, `TNR`...) you can usually guess the available actions.
- **`SCMD;NN`** and **`LIST;NN`** (semicolon, numeric suffix) are a different, older naming scheme for system commands and numbered list reports respectively — not object-oriented, just sequentially assigned.
- **Bare mnemonic codes** (`A_AN`, `P_AN`, `C_GEN`, `RES_AN`...) are the oldest layer — direct shop-floor posting commands from the original SCS-PDM protocol, predating the `OBJEKT.AKTION` convention.
- For any code here, the REST-native service equivalent (if one exists) is in [[hydra-service-interface-sif]] §5.2's per-module licensing table, paired with its "outdated" dialog predecessor.

## See Also

- [[HYDRA SIF RET Error Codes]] — full catalog of `RET=` return codes seen in this same source doc
- [[HYDRA Service Interface (SIF)]] — architecture concept this catalog supports
- [[hydra-service-interface-sif]] — full source page with chapter line-ranges for drilling into any single DLG call's parameters
- Module pages for business context: [[HYDRA BDE Module]], [[HYDRA MDE Module]], [[HYDRA HLS Module]], [[HYDRA PZE Module]], [[HYDRA PZW Module]], [[HYDRA PEP Module]], [[HYDRA MPL Module]], [[HYDRA PDV Module]], [[HYDRA WRM Module]], [[HYDRA CAQ Module]]
