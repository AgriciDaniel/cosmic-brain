---
type: concept
title: "HYDRA 8 Function Catalog"
created: 2026-05-27
updated: 2026-05-27
address: c-000178
tags:
  - concept
  - mes
  - hydra-8
  - catalog
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Client Types]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA 8 Function Catalog

Complete cross-referenced function catalog for HYDRA 8, derived from the master documentation (HYDRA_8-Documentation.pdf v1.18). Each function code maps to one or more client-type PDFs in the `Functions/` directory.

## BDE — Shop Floor Data Collection (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| BDE-BDM | Shop Floor/Order Data Management | X | X |
| BDE-EBF | Enhanced Shop Floor Posting Functions | X | X |
| BDE-PBF | Personal Shop Floor Data Collection Functions | X | X |
| BDE-BEA | Machining Center/Pool of Orders | X | X |
| BDE-APF | Processing of Alternative/Parallel Sequences | X | X |
| BDE-AEV | Alternative Capturing Methods | X | X |
| BDE-NBT | Changed Partitioning Based on Cavities | X | X |
| BDE-SSG | Split Operations and Merged Operations | X | X |
| BDE-ARC | Archiving of Shop Floor/Order Data | X | X |
| BDE-ESK | Escalation Messages for Shop Floor Data Collection | X | X |
| BDE-MAB | Monitoring Shop Floor/Order Data | X | X |
| BDE-CAB | Controlling of Shop Floor Data/Order Data | X | X |
| BDE-CAA | Controlling of Articles (Items)/Scrap | X | X |
| BDE-PMA | Personnel Postings/Reports | X | X |
| BDE-BAA | Editing of Orders/Work Plans | X | X |
| BDE-FST | Shop Floor Control | X | X |
| BDE-DAP | Printing of Shop Floor Papers | X | X |
| BDE-KBN | eKANBAN | X | X |

## MDE — Machine Data Collection (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| MDE-MDM | Machine Data Management | X | X |
| MDE-SFL | Special Functions for Line Production | X | X |
| MDE-ESK | Escalation Messages for Machine Data Collection | X | X |
| MDE-ARC | Archiving of Machine Data | X | X |
| MDE-MMD | Monitoring of Machine Data | X | X |
| MDE-CMD | Controlling of Machine Data | X | X |
| MDE-KMO | KPI Monitoring/OEE | X | X |
| MDE-SFM | Shopfloor Monitor (Graphic Machinery) | X | X |
| MDE-MWK | Maintenance Calendar for Machines | X | X |

## HLS — Shop Floor Scheduling (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| HLS-FPL | Detailed Scheduling/Shop Floor Scheduling | X | X |
| HLS-GPT | Graphic Planning Board | X | X |
| HLS-EPI | Enhanced Planning Information | X | X |
| HLS-FBF | Detailed Scheduling and Assignment Functions | X | X |
| HLS-BSR | Assignment of Secondary Resources | X | X |
| HLS-BPK | Displaying Personnel Capacities | — | X |
| HLS-RWP | Setup Planning | X | X |
| HLS-FFV | Detailed Scheduling with Production Variants | X | X |
| HLS-AGS | Operation Splitting | X | X |
| HLS-KAN | Complex Order Networks | X | X |
| HLS-MFB | Multiple Assignment of Resources | X | X |
| HLS-VMB | Variable Machine Scheduling | X | X |
| HLS-ZMB | Targeted Machine Scheduling | X | X |
| HLS-RBM | Machine Scheduling Based on Rules | X | X |
| HLS-ESK | Escalation Messages in Shop Floor Scheduling | X | X |
| HLS-SIM | Simulation | X | X |
| HLS-BOP | Optimization of Assignments | X | X |

## MPL — Material and Production Logistics (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| MPL-MBV | Material and Inventory | X | X |
| MPL-RMV | Ranges of Coverage and Material Availability | X | X |
| MPL-MPB | Material Buffers and Stock of Material | X | X |
| MPL-MMO | Material Monitoring | X | X |
| MPL-ESK | Escalations in MPL | X | X |
| MPL-GAT | Composition | X | X |
| MPL-TRA | Transport Orders | X | X |

## TRT — Tracking/Tracing (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| TRT-CLV | Batch Data Management | X | — |
| TRT-CLA | Batch Data Processing | X | X |
| TRT-PPK | Palletizing/Packing/Assembling | X | — |
| TRT-ARC | Archiving of Batch Data | X | X |
| TRT-GLV | Graphic Batch Tracing | X | X |
| TRT-PDK | Product Documentation | X | X |
| TRT-ESK | Escalations in TRT | X | X |
| TRT-SNR | Management of Serial Numbers | — | X |

## WRM — Tool and Resource Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| WRM-MGM | Tool and Resource Data Management | X | X |
| WRM-WRP | Tool/Resource Packages | X | X |
| WRM-WRB | Tool/Resource Operation | X | X |
| WRM-BRW | Required Resources/Tools | X | X |
| WRM-NST | Cavity Management | X | X |
| WRM-IHA | Maintenance Orders | — | X |
| WRM-ARC | Archiving Tool/Resource Data | X | X |
| WRM-WMO | Tool/Resource Monitoring | — | X |
| WRM-BWR | Assignment Plan for Tools/Resources | — | X |
| WRM-WWR | Maintenance Calendar Tools/Resources | X | X |
| WRM-EWB | Electronic Tool/Resource Book | X | X |

## DNC — Setting Data / NC Programs (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| DNC-PVW | NC Program Management | X | X |
| DNC-PPK | NC Program Packages | X | X |
| DNC-DUN | Download/Upload of NC Programs | X | X |
| DNC-MON | Monitoring of NC Programs | X | X |
| DNC-VEN | Comparison/Editor NC Programs | X | X |
| DNC-AEB | Display of Tooling Sheets | X | X |

## PDV — Process Data Collection (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PDV-PDM | Process Data Management | X | X |
| PDV-VRP | Processing Rules for Process Data | X | X |
| PDV-ARC | Archiving of Process Data | X | X |
| PDV-OVP | Online Visualization of Process Data | X | X |
| PDV-MPD | Monitoring of Process Data | X | X |
| PDV-GPA | Graphic Process Analysis | X | X |
| PDV-SPA | Statistical Process Analysis | X | X |
| PDV-ESK | Escalation Messages for PDV | X | X |

## EMG — Energy Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| EMG-MGM | Energy Management | X | X |
| EMG-AME | Meter Reading Plans for Manual Data Collection | X | X |
| EMG-ARC | Archiving of Energy and Power Data | X | X |
| EMG-ESK | Escalation Messages for Energy Management | X | X |
| EMG-EVF | Energy Consumption Recording for Production Orders | X | X |
| EMG-GEL | Graphic Energy Meter Layout | X | X |
| EMG-GLA | Graphic Performance Analysis | X | X |
| EMG-H7K | HYDRA 7 Energy Management Connection | X | — |
| EMG-KBW | Generation and Monitoring of Key Figures | X | X |
| EMG-KLE | Correlative Load Development | X | X |
| EMG-LEE | Performance Recording | X | X |
| EMG-OVL | Online Visualization of Performance Values | X | X |
| EMG-PLA | Planning Strategy for Energy Requirements | X | X |
| EMG-VAN | Energy Consumption Analysis | X | X |

## LLE — Premium/Incentive Pay (v8.1 only)

| Code | Function |
|------|----------|
| LLE-AGP | Group Bonus Evaluation |
| LLE-APL | Evaluations on Bonus Wages/Incentive Wages |
| LLE-BGP | Calculation of Group Bonuses |
| LLE-BPL | Calculation of Bonus Wages/Incentive Wages |
| LLE-FPL | Bonus Wages/Incentive Wages Based on Formulas |
| LLE-PBG | Bonus Areas for Group Bonuses |

## PEP — Personnel Scheduling (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PEP-AEP | Identification of Workforce Requirements Subject to Orders | X | X |
| PEP-APP | Evaluations of Personnel Scheduling | X | X |
| PEP-ESK | Escalation Messages of PEP | — | X |
| PEP-ESV | Advanced Selection and Visualization | X | X |
| PEP-VWF | Administrative Functions for Personnel Scheduling | X | X |

## PZE — Time & Attendance (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PZE-EPP | Capture and Editing of Labor Times | X | X |
| PZE-INF | Personnel Information | X | X |

## PZW — Personnel Time Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PZW-BPZ | Evaluation of Labor Times | X | X |
| PZW-ESK | Escalation Messages for Personnel Time Management | X | X |
| PZW-EVV | Enhanced Compensation Rules | X | X |
| PZW-FAZ | Flexible Working Time | X | X |
| PZW-KSB | Cost Center Posting | X | X |
| PZW-PAP | Editing Functions/Reports PZW | X | X |
| PZW-PLS | Personnel/Wage Type Statistics | X | X |
| PZW-PZP | Personnel Scheduling | X | X |
| PZW-WFG | Workflow for Absence Requests | X | X |
| PZW-ZNW | Time Sheets and Time Sheet Archiving | X | X |

## ZKS — Access Control Systems (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| ZKS-ALS | Alarm System | X | X |
| ZKS-AZK | Evaluations on Access Control | X | X |
| ZKS-BAV | Visitor Badge Management | X | X |
| ZKS-EZK | Enhanced Access Control | X | X |
| ZKS-PKT | Security Check | X | X |
| ZKS-RAS | Room Zones, Control of Elevators/Security Gates | X | X |
| ZKS-SLS | Security Control Center | X | X |
| ZKS-SXS/SOK | Connection to Offline Components | X (SXS) | X (SOK) |
| ZKS-VWF | Management Functions for Access Control | X | X |

## FEP — In-Production Inspection (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| FEP-PPF | Inspection Planning for In-Process Inspections | X | X |
| FEP-EPF | Expanded Inspection Planning/Inspection Steps | X | X |
| FEP-FPF | Family Inspection Planning | X | X |
| FEP-AFP | In-Process Inspection Reports | X | X |
| FEP-RKH | Standard Control Charts and Histograms | X | X |
| FEP-ERH | Extended Control Charts and Histograms | X | X |
| FEP-FSM | Failure Mode Analysis/Measure Tracking | X | X |
| FEP-ARC | Archiving of FEP Data | X | X |
| FEP-PPE | Inspection Planning of Initial Sample Inspections | X | X |
| FEP-EPE | Extended Inspection Planning for Initial Sample Inspection | X | X |
| FEP-AFE | Initial Sample Inspection Reports | X | X |
| FEP-MVE | Failure Mode Analysis/Measures Tracking | X | X |
| FEP-PLP | Production Control Plan | X | X |
| FEP-EVF | Creating/Managing Forms | X | X |
| FEP-ESK | Escalation Messages for FEP | X | X |
| FEP-QSS | qs-STAT Interface for In-Production Inspections | — | X |

## WEP — Goods Receipt Inspection (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| WEP-PPW | Goods Receipt Inspection Planning | X | X |
| WEP-EPW | Enhanced Inspection Planning/Inspection Steps | X | X |
| WEP-FPW | Family Inspection Planning | X | X |
| WEP-DWP | Dynamic Modification of Goods Receipt Inspections | X | X |
| WEP-ESK | WEP Escalation Messages | X | X |
| WEP-ARC | WEP Data Archiving | X | X |
| WEP-AWP | Evaluations on Goods Receipt Inspections | X | X |
| WEP-RKH | Standard Control Charts and Histograms | X | X |
| WEP-FSM | Failure Mode Analysis/Action Tracking | X | X |
| WEP-ERH | Enhanced Control Charts and Histograms | X | X |
| WEP-EVF | Forms Creation/Management | X | X |
| WEP-QSS | qs-STAT Interface for Goods Receipt Inspections | — | X |
| WEP-LFB | Supplier Evaluation / Assessment Management | — | X |

## REK — Complaint Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| REK-EVA | Entry/Management/Analysis of Complaints | X | X |
| REK-AER | Automatic Generation of Complaints | X | X |
| REK-EVF | Forms Creation/Management | X | X |
| REK-ESK | REK Escalation Messages | X | X |
| REK-MRM | Monitoring of Complaint Management | X | X |
| REK-FSM | Failure Mode Analysis/Tracing of Measures | X | X |
| REK-ARK | Evaluations on Complaint Costs | X | X |
| REK-HWM | Workflows for Complaint Management | X | X |

## PMV — Gage/Test Equipment Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PMV-SVP | Master Data/Management of Test Equipment | X | X |
| PMV-PPK | Inspection Planning for Calibrations | X | X |
| PMV-EPK | Advanced Inspection Planning for Calibrations | X | X |
| PMV-APM | Evaluations on Gage Management | X | X |
| PMV-EVF | Creation/Management of Forms | X | X |
| PMV-ESK | Escalation Management for PMV | — | X |

## QMS — Quality Management (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| QMS-SQM | Quality Management Sub System to SAP QM | X | X |
| QMS-ARC | QM Sub System Data Archiving | X | X |
| QMS-ESK | QM Sub System Escalation Messages | X | X |
| QMS-AQS | Evaluations in the QM Sub System | X | X |
| QMS-EVF | Forms Creation/Management | X | X |

## AIP — Acquisition Information Panel (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| AIP-BMD | AIP Functions Shop Floor/Machine Data | X | X |
| AIP-EBM | Expanded Terminal Functions | X | X |
| AIP-ESC | Collection of Serial Numbers and Batch Numbers | X | X |
| AIP-TMD | Partial Quantity Documentation | X | X |
| AIP-DVE | Discrete Consumption Recording | X | X |
| AIP-MPL | Acquisition/Information Functions for Material Data | X | X |
| AIP-MTR | AIP Functions for MPL/Tracking/Tracing | X | X |
| AIP-TRT | Acquisition/Information Functions for Batches | X | X |
| AIP-LCS | Serial Numbers/Palletizing/Weighing Components | X | X |
| AIP-KEW | Weighing of Components | X | X |
| AIP-WRM | AIP Functions for Tools/Resources | X | X |
| AIP-PDV | AIP Functions for Process Data | X | X |
| AIP-DNC | AIP Functions for DNC | X | X |
| AIP-CAQ | AIP Functions for Quality Data | X | X |
| AIP-MDI | Measurement Data Interface for Quality Data | X | X |
| AIP-NUM | Capture of Quality Data relating to Numbers | X | X |
| AIP-NES | Capture of Quality Data relating to Cavities | X | X |
| AIP-HRF/HRL | AIP Functions for HR Applications | X | X |
| AIP-AED | AIP Add-on Label Printing | X | X |
| AIP-AMK | AIP Add-on Multimedia Kit | X | X |
| AIP-AOS | AIP Add-on Online Language Switching | X | X |
| AIP-ATU | AIP Add-on Switching of Tasks | X | X |

## SIS — System Integration Services (v3.0)

| Code | Function |
|------|----------|
| SIS-MWV | MES Weaver |
| SIS-WMM | Further MES Client |
| SIS-SSO | Login Using SingleSignOn |
| SIS-ESK | Escalation Management (Basic/Framework) |
| SIS-VES | Dispatch of Escalation Messages by SMS |
| SIS-IPS | Integrated HR Master |
| SIS-ASD | Recording of Master Data Changes |
| SIS-SEF | Recording of Signatures |
| SIS-DBB | Database Backup (MS SQL Server) |
| SIS-DMA | Printing of Staff Badges |
| SIS-NPB | Data Post Capture of HR/Shop Floor Posting |
| SIS-APB | Comparison of Labor/Shop Floor Times |
| SIS-HMS | HYDRA Messaging Services |

## EIS — Enterprise Integration Services (v3.0)

| Code | Function |
|------|----------|
| EIS-ERP | Interface ERP Systems |
| EIS-EZI | Enhancement of Additional ERP Information |
| EIS-EFD | Enhancement of Detailed Scheduling Data to ERP |
| EIS-LUG | Interface Wage and Salary Programs |
| EIS-MCL | Interface Material and Batch Data |
| EIS-CES | HYDRA-CAQ Interface to ERP Systems |
| EIS-SDF | Master Data Transfer from Third-Party Systems |
| SAP-HRPDC | HYDRA Interfacing Module to SAP HR via HR-PDC |
| SAP-HRZW | Interfacing Module for HYDRA Time Management to SAP HR |
| SAP-PPPDC | HYDRA Interfacing Module to SAP PP using PP-PDC |
| SAP-PPPDK | Correction Functions for PP-PDC Interfacing Module |
| SAP-PPREM | HYDRA Interfacing Module to SAP PP Serial Production |
| SAP-PPPI | HYDRA Interfacing Module to SAP PP-PI |
| SAP-ISS | HYDRA Information Interface for SAP PP |
| SAP-PMCC3 | HYDRA Interfacing Module to SAP R/3 PM (CC3) |
| SAP-PSCC4 | HYDRA Interfacing Module to SAP R/3 PS (CC4) |
| SAP-MMMOB | HYDRA Interfacing Module to SAP MM |
| SAP-COILV | HYDRA Interfacing Module to SAP CO ILV |
| SAP-ESK | Escalation Messages MLE Interface/Fileport |
| SAP-QMIDI | HYDRA Interfacing Module to SAP QM using QM-IDI |

## SCS — Shop Floor Connectivity Services (v8.1)

| Code | Function |
|------|----------|
| PCC-OPC | PCC-Module OPC Communication |
| PCC-DIF | PCC Module File Interface Machine/Process Data |
| SCS-IMM | PCC Module Measurement Data Interface |
| OPC-SMB | OPC-Server for Modbus Communication |
| OPC-SSS | OPC Server for Siemens Controls |
| SCS-PDM | HYDRA Production Data Manager |
