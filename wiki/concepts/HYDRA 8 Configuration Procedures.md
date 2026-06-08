---
type: concept
title: "HYDRA 8 Configuration Procedures"
created: 2026-05-27
updated: 2026-05-27
address: c-000181
tags:
  - concept
  - mes
  - hydra-8
  - configuration
  - procedures
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA 8 Configuration Procedures

Complete catalog of 124 procedure documents organized by category. Each procedure is one or more PDFs in `Procedures/`.

## SAP Integration Configuration (30+ procedures)

### PP-PDC Interface
- SAP_PPPDC_Customizing_HYDRA — HYDRA-side configuration for PP-PDC
- SAP_PPPDC_Customizing_SAP — SAP-side configuration for PP-PDC
- SAP_PPPDC_When_using_PIorPO — PP-PDC with Process Industries or Production Orders
- SAP_PPPDCC_Handling_Error_Cancellation — Error and cancellation handling

### Other SAP Interfaces
- SAP_HRPDC_When_using_PIorPO — HR-PDC with PI or PO
- SAP_HRZW_Customizing_SAP — SAP-side HR Time Management
- SAP_PPPI_Customizing_HYDRA / SAP_PPPI_Customizing_SAP — PP-PI configuration
- SAP_PPPI_Comm_control — PP-PI communication control
- SAP_PPREM_Customizing_HYDRA / SAP_PPREM_Customizing_SAP — PP Serial Production
- SAP_ISS_Customizing_HYDRA — Information System for PP
- SAP_PMCC3_Customizing_HYDRA / SAP_PMCC3_Customizing_SAP — Plant Maintenance CC3
- SAP_PSCC4_Customizing_HYDRA / SAP_PSCC4_Customizing_SAP — Project System CC4
- SAP_MMMOB_Customizing_HYDRA / SAP_MMMOB_Customizing_SAP — Materials Management
- SAP_COILV_Customizing_HYDRA / SAP_COILV_Customizing_SAP — Controlling ILV
- SAP_COILV_Imp_Examples / SAP_COILV_Internal_Ord_Down — COILV examples and order download
- SAP_QMIDI_Customizing_HYDRA / SAP_QMIDI_Customizing_SAP — QM via QM-IDI

### MLE (SAP Connection Layer)
- MLE_Config_File-Connections — File-based SAP connections
- MLE_Config_PDM-Connections — PDM-based SAP connections
- MLE_Config_RFC-Connections — RFC-based SAP connections
- MLE_Determine_MLE-Variant — Selecting the MLE variant
- MLE_Protect_fields_from_Scheduled_Ops — Field protection from scheduled operations

## DMC — Data Management Console (12 procedures)

### Implementation Guides
- DMC_ImplementationGuide — General DMC implementation
- DMC_ImplementationGuideBDE — DMC for production data
- DMC_ImplementationGuideFME — DMC for failure mode analysis
- DMC_ImplementationGuideMDE — DMC for machine data
- DMC_ImplementationGuideMIE — DMC for measurement data
- DMC_ImplementationGuideTRT — DMC for tracking/tracing

### Configuration
- DMC_MDE_Configuration_DMC / DMC_MDE_Configuration_HYDRA — MDE DMC config (both sides)
- DMC_PDV_Configuration_DMC / DMC_PDV_Configuration_HYDRA — PDV DMC config (both sides)

### Tutorials
- DMC_Tutorial_CreatePlugin — Creating DMC plugins
- DMC_Tutorial_GUIPlugin — GUI plugin development

## MDS — MES Development Suite (30 procedures)

- MDS_Common (8 PDFs) — Common MDS configuration
- MDS_MOC (10 PDFs) — MOC-specific MDS configuration
- MDS_Services (12 PDFs) — MDS service configuration

## Module-Specific Configuration (40+ procedures)

### Shop Floor
- BDE_General (7 PDFs) — General BDE configuration
- Configuration_ActivityRecording — Activity recording setup
- MDE_CollectionOfShort-term-disturbances — Short-term disturbance collection
- MDE-KMO_Customizing_Keyfigures — KPI/OEE key figure customization
- MDE-MDM_Configuration_and_Functionality (3 PDFs) — Machine data management
- MDE-SFL_Configuration_and_Functionality — Special functions for line production
- MDE-SFM_Configuration_and_Functionality — Shopfloor monitor
- MDE_KPI_Configuration — KPI setup

### Scheduling
- HLS-KPG_Configuration — Capacity planning board
- HLS-MFB_Configuration — Multiple resource assignment
- HLS-MVP_Configuration — Variable machine scheduling
- HLS-Overlapping_Configuration — Overlapping operations

### Quality
- Configuration_AIP-QM — AIP quality management
- Configuration_AIP2-EQD — AIP2 equipment data
- Configuration_InspectionPlan — Inspection plan setup
- Configuration_InspectionPlanImport — Inspection plan import
- Configuration_InspectionRequirement — Inspection requirement setup
- Configuration_QM_Options — QM options
- Configuration_QM_Status — QM status configuration
- Configuration_RangeOfCoverage — Coverage range setup
- Configuration_Scheduler_InspectionPoint — Inspection point scheduling

### Material & Batch
- Activating_Material-Monitoring-Job — Material monitoring activation
- Activating_MPL_TRT_dialogs — MPL/TRT dialog activation
- Activating_Palletizing_Packaging — Palletizing/packaging activation
- Activating_Waiting_Period — Waiting period activation
- Configuration_WIP_Material — WIP material configuration
- MPL_Extended_input_batch_check — Extended input batch verification
- Runthrough_batch_processing — Throughput batch processing
- Setup_CoilBasedManufacturing — Coil-based manufacturing
- Setup_Consumption_Balance — Consumption balancing
- Setup_eKanban — eKanban setup

### Batch Operations
- Setup_BatchChangeForce — Forced batch change
- Setup_BatchGroupingV1 / Setup_BatchGroupingV2 — Batch grouping (2 versions)
- Setup_Batch_Merge — Batch merging
- Setup_Batch_Split — Batch splitting
- Setup_DeleteLastBatch — Delete last batch
- Setup_DiscreteConsumptionInput — Discrete consumption input
- Setup_ExpandedBatchInformation — Expanded batch info
- Setup_FilterOutputBatch — Output batch filtering
- Setup_PassBatchAttributes — Pass batch attributes
- Setup_PassBatchDocumentLinks — Pass batch document links
- Setup_Preregister_InputBatch — Input batch pre-registration
- Setup_ThroughputBatch — Throughput batch (Configuration_ThroughputBatch)

### Serial Numbers
- Setup_SerialNumbers — General serial number setup
- Setup_SNR_Divide — SNR division
- Setup_SNR_Recording — SNR recording
- Setup_SNR_Union — SNR union

### Transport & Logistics
- Setup_TransportOrders — Transport order setup
- List_of_produced_batches (2 PDFs) — Produced batch listing
- Manual_BSC_counting — Manual BSC counting

### Andon & Visualization
- Setup_LineAndon — Line Andon setup
- Setup_StationAndon — Station Andon setup
- Setup_ContinousMonitoringLogOn — Continuous monitoring logon

### DNC & Machine Connectivity
- PCC_SetupDNCStandAlone — DNC standalone setup
- Setup_DNC_Packages — DNC package setup
- SetupDNC — General DNC setup
- Configuration_MDI — Machine Data Interface configuration

### HR & Access Control
- Configuration_Separate_rights_for_HR_master_data — HR master data access rights
- Setup_PersonalAuthorization — Personal authorization setup
- Setup_ServerBasedShiftChange — Server-based shift change
- Offline_Access_Control (4 PDFs) — Offline access control configuration
- Kaba-Connector — Kaba access control connector
- Implementing_PZW — PZW implementation
- Workforce_Requirement — Workforce requirement planning
- Sign_order_bookings — Order booking signature setup

### System & Integration
- ESK_SMS-Gateway — Escalation SMS gateway setup
- SSO_Configuration — Single Sign-On configuration
- IMPLEMENTING_EMS — Energy Management System implementation
- Transfer_MasterData_Config — Master data transfer configuration
- SetupComposition — Composition setup
- Setup_WeighingComponents — Weighing components setup

### EIS Integration
- EIS-DBI_Customizing_HYDRA — Database interface customizing
- EIS-EFD_Customizing_HYDRA — Enhanced detailed scheduling data
- EIS-MCL_Customizing_HYDRA — Material and batch data
- EIS-SDF-DNC — Master data transfer for DNC

### Base System
- BASE_FCT_DB_multilingual_entries — Multilingual database entries
- BASE_FCT_DB_passwords — Database password management
- BASE_FCT_Logging_Keys — Logging key configuration
- BASE_FCT_XLS_2_DLG — Excel to dialog conversion
- MOC_Configuration — Management Cockpit configuration

### Reports & Documents
- Create_Word_Reports — Word report creation (2 PDFs)
- Reports_Design (4 PDFs) — Report design guidelines
- Setup_AIP_Documents — AIP document setup
- Configuration_Userfields — User-defined fields
- Configuration_AIP_Decimalsymbol — AIP decimal symbol
- Configuration_EAT-AIP — EAT-AIP configuration
- Configuration_Minimum_Expiry_Times — Minimum expiry time configuration
- Configuration_PDV_ESK — PDV escalation configuration
- Configuration_WRM-TDA — WRM-TDA configuration
- Setup_AIP_QM_Cavity — AIP QM cavity setup
- Setup_AIP_QM_slim_data_processing — AIP QM slim data processing

### Connectors
- SIPLACE-Connector (3 PDFs) — SIPLACE placement machine connector
