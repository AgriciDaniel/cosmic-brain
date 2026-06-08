---
type: concept
title: "HYDRA MLE Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000170
tags:
  - concept
  - mes
  - sap
  - integration
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA BDE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA MLE Module

**Product group:** MLE (Manufacturing Logistics Execution — SAP Integration)
**Tables:** 11
**Pages:** 531-546

## Purpose

MLE manages the bidirectional data exchange between HYDRA and SAP ERP systems. It handles IDoc inbound/outbound processing, distribution models, logical system configuration, transaction ID management, and SAP integration setup.

## Core Tables

### hysap_dist_mod — Distribution Model
Defines the SAP distribution model: which message types flow between which logical systems. Controls the routing of IDocs between SAP and HYDRA.

### hysap_inbound_ctrl — Inbound Control
Controls inbound IDoc processing from SAP. Defines how incoming data is validated, transformed, and applied to HYDRA tables (2 pages).

### hysap_inbound_data — Inbound Data
Stores the actual inbound IDoc data received from SAP (2 pages). Raw payload plus processing status.

### hysap_logsys — Logical Systems
Defines SAP logical systems that HYDRA communicates with. Each logical system represents a specific SAP client or instance.

### hysap_logsys_cfg — Logical System Configuration
Configuration parameters per logical system: connection details, protocol settings, character encoding, etc.

### hysap_out_ctrl — Outbound Control
Controls outbound IDoc generation to SAP (2 pages). Defines selection criteria, filtering, and transformation rules.

### hysap_out_data — Outbound Data
Stores generated outbound IDoc data before transmission to SAP (2 pages). Includes transmission status and retry information.

### hysap_protokoll — Integration Protocol
Audit log of all SAP integration activity: messages sent/received, errors, retries, and processing timestamps.

### hysap_status — Integration Status
Status codes and state machine for IDoc processing. Defines the lifecycle of an integration message.

### hysap_tidmgt — Transaction ID Management
Manages SAP transaction IDs (TIDs) to ensure exactly-once processing semantics. Prevents duplicate IDoc processing.

### sap_setup — SAP Configuration
Overall SAP integration setup and configuration parameters for the HYDRA side of the connection.

## Integration Pattern

MLE implements an asynchronous, IDoc-based integration pattern: HYDRA generates outbound IDocs that SAP picks up, and SAP sends inbound IDocs that HYDRA processes. The TID management ensures transactional consistency. The distribution model acts as the routing table between logical systems.
