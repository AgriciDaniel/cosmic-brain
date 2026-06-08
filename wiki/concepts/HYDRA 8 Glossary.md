---
type: concept
title: "HYDRA 8 Glossary"
created: 2026-05-27
updated: 2026-05-27
address: c-000179
tags:
  - concept
  - mes
  - hydra-8
  - glossary
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: basic
domain: "Manufacturing Execution Systems"
---

# HYDRA 8 Glossary

17 terminology definitions from the HYDRA 8 documentation glossary. Each term has a dedicated one-page PDF in `Glossary/`.

## Core Manufacturing Concepts

### MES_Batch (HYDRA Batch)
A batch number identifies precisely one quantity unit of a product which can be considered as uniform and exists precisely once at a single location. An additional/different quantity unit of this product is identified by a different batch number.

### ERP_Batch (ERP Batch/Lot)
A batch is the quantity unit of a product that can be considered homogeneous and that is identified by a batch number. A batch may be stored at **different places within one warehouse and in different warehouses at the same time**. This is the key distinction from an MES batch: ERP batches can be split across locations.

### CollectiveBatch (Merged Batch)
A merged batch is assigned 1-n individual batches and "embraces" them. Merged batches are used to combine individual batches to facilitate data collection. The merged batch number is entered in a field of the individual batches, linking them together.

### Logistically_Handable_Unit
A logistically manageable unit representing a quantity of material that can be handled as a single entity in logistics operations.

## Order & Operation States

### OperationStatus
Since order data is entered in relation to operations, the system keeps a status for each individual operation. Default statuses:
- **prepared**: Not yet started
- **running**: Currently logged on
- **automatically interrupted**: Interrupted by shift automation at end of shift
- **interrupted**: Manually interrupted
- **finished**: Logged off

Configurable per order type in HYDRA Customizing.

### OrderStatus
The current status of a production order. Default statuses:
- **Prepared**: Not yet started
- **Started**: At least one operation started
- **Finished**: All recordable operations finished

### PriorityRule
Defines the sequencing priority of orders at a workstation. Used by the scheduling engine to determine which order to process next when multiple orders are queued.

## Performance & Time

### PerfEffRate (Performance Efficiency Rate)
Used in incentive pay (LLE) calculations. Based on standard time, bonuses/reductions, and actual time. For piecework time tickets, the performance efficiency rate determines incentive pay amounts.

### TimeType
Classifies time tickets in the premium/incentive wage system. Controls calculations for time tickets. The "Piecework" time type serves as basis for individual piecework calculations. Master data of wage types and LLE basic settings define which time types HYDRA creates and how they are calculated.

### RemainingRunTime
The estimated remaining processing time for an operation currently in progress. Used by scheduling to predict when a resource will become available.

### EvaluationDate
The reference date used for time-based evaluations and reports. Determines which time period's data is included in a given evaluation.

## SAP Integration Concepts

### SAP_ALE (Application Link Enabling)
Technology to create and run distributed applications (R/3, R/2, third-party systems). Enables exchanges of business and controlled information while maintaining data consistency through loosely coupled (asynchronous) systems.

### SAP_BAPI (Business Application Programming Interface)
Predefined interfaces enabling partner systems to access functions of the SAP R/3 and/or ECC system. BAPIs are defined as SAP business objects in the Business Object Repository (BOR) and implemented as RFC-capable function modules in the ABAP Workbench.

### SAP_IDOC (Intermediate Document)
Containers for data exchange between systems in the SAP environment. IDocs may be flat or map multi-level hierarchies. Each IDoc consists of: Control record (IDoc type, sender, recipient), Data record (data as flat ASCII in segments), Status record (processing status, errors).

### SAP_PP-PDC (Production Planning — Plant Data Collection)
The SAP interface module for exchanging production order data between SAP PP and shop floor systems via the PP-PDC interface standard.

### SAP_RFC (Remote Function Call)
Base technology for system-wide calls of programs on SAP R/3 and/or ECC or partner systems. Variants:
- **sRFC** (synchronous): calling program waits until function module is processed
- **aRFC** (asynchronous): checks availability but doesn't wait for completion
- **tRFC** (transactional): called system responsible for execution or rollback on error

### EnergyManagement
Energy management concepts for monitoring, recording, and analyzing energy consumption in manufacturing operations. Covers meter reading, consumption recording per production order, key figure generation, and correlative load development.
