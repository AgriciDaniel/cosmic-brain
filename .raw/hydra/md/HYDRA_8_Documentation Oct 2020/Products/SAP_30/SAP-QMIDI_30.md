Manual
HYDRA Interface to SAP QM
using QM-IDI
SAP-QMIDI 3.0
Version 1.0.19800
Last changed on: 06.08.2020

HYDRA Interface to SAP QM using QM-IDI
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-QMIDI_30.docx Version: 1.0.22714 Page 2 of 53

HYDRA Interface to SAP QM using QM-IDI
Contents
1 HYDRA interface to SAP QM using QM-IDI................................................. 4
2 Mapping the QM-IDI in HYDRA ................................................................... 6
3 Download of inspection specifications / master data ................................. 17
4 Upload of inspection results ....................................................................... 28
5 Configuring function module parameters ................................................... 36
6 HYSAPQMC - Programmparameter .......................................................... 37
7 Application-relevant settings in HYDRA ..................................................... 39
8 Application-relevant customizing in SAP ................................................... 53
SAP-QMIDI_30.docx Version: 1.0.22714 Page 3 of 53

HYDRA Interface to SAP QM using QM-IDI
1 HYDRA interface to SAP QM using QM-IDI
Summary
Fields of Application
QM-IDI is an interface designed for exchanging inspection data between the SAP QM application
component and external systems. Inspection specifications defined in the QM component are transferred
to the external system. The external system independently carries out the inspection and transfers the
results back to QM.
The interface is implemented using synchronous Remote Function Calls (sRFC), whereby all
communication is started from HYDRA. The documentation at hand describes the processing of data
exchange between SAP ECC QM and HYDRA and the different types of integration with other SAP
standard interface such as PP-PDC.
Implementation Notes
You use the SAP-QMIDI interface when
 The inspection planning is done in SAP QM while the result recording is done at the shop floor
level.
Integration
The SAP-QMIDI interface is integrated:
 With the PP-PDC interface (SAP-PPPDC) for production order transfer
 With the information interface to SAP PP (SAP-ISS)
Features
 Transfer of QM master data (catalogues for usage decision etc.)
 Transfer of inspection lots, inspection characteristics including all details transfered in QM-IDI
interface.
 Integration of data transfer with PP-PDC interface (Prerequisite: SAP-PPPDC) and the additional
information interface to SAP PP (Prerequisite: SAP-ISS)
 Transfer of inspection lots, inspection characteristics including all details transfered in QM-IDI
interface for inspection types not based on production orders (such as incoming goods
inspection)
 Creation and recording of inspection points (time based, quantitiy based, free inspection points)
 Transfer of confirmations to SAP QM
SAP-QMIDI_30.docx Version: 1.0.22714 Page 4 of 53

    HYDRA Interface to SAP QM using QM-IDI

| SAP-QMIDI_30.docx  | Version: 1.0.22714  | Page 5 of 53  |
| ------------------ | ------------------- | ------------- |

HYDRA Interface to SAP QM using QM-IDI
2 Mapping the QM-IDI in HYDRA
Mapping the QM-IDI in HYDRA
Features of the QM-IDI
In the context of a connection via the QM-IDI interface, it is the task of HYDRA to receive inspection
processing data and to integrate them into the HYDRA process. In addition to that, HYDRA creates the
appropriate data from recorded confirmations and transfers these to SAP QM. Both scenarios are initiated
by HYDRA.
SAP QM  HYDRA – movement and master data
Download of inspection data
The transfer of inspection batch data from SAP to HYDRA will be carried out using the function module
QIRF_SEND_REQUIRMENTS_GET_DAT2. For that purpose, HYDRA transfers selection options to the
function module. Those options are transferred using the structure QAILS. Additionally, the function
module offers the possibility to control the download in detail. The content of each parameter can be
configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_IND_SORT_ASCENDING_TO_DATE CHAR 1 Indicator: Sort operations in ascending
order according to creation date
Default = “X”
I_IND_SORT_DESCENDING_TO_DATE CHAR 1 Indicator: Sort operations in descending
order according to creation date
Default= “ “
I_IND_MULTI_TRANSFER_POSSIBLE CHAR 1 Indicator: Correction transfers of operations
possible,
Default = “ ”
I_IND_EVALUATE_CHARACTERISTIC CHAR 1 Indicator: Transfer valuation specifications
for characteristics,
Default = “X”
I_IND_SET_BLOCK_INDICATORS CHAR 1 Indicator: Set lock entries in QM,
Default = “X”
I_IND_ONLY_OBLIGATORY_CHARACT CHAR 1 Indicator: Only transfer required
characteristics,
Default = “ “
I_IND_TRANSFER_CHAR_CODES CHAR 1 Indicator: Transfer catalog data for
inspection characteristics,
Default = “X”
I_IND_READ_WORK_CENTER CHAR 1 Indicator: Read work center data,
Default = “X”
SAP-QMIDI_30.docx Version: 1.0.22714 Page 6 of 53

|     |     |     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

|     | Parameter name: |     |     | T L | D   | Description |     |
| --- | --------------- | --- | --- | --- | --- | ----------- | --- |
|     |                 |     |     |     |     |             |     |
I_IND_READ_VENDOR_AND_PRODUCER  CHAR  1    Indicator: Read vendor data,
Default = “X”
I_IND_READ_PURCHASING_INFO        Indicator: Read data from purchasing
information record,
Default = “X”
I_IND_READ_SALES_INFO        Indicator: Read data from sales information
record,
Default = “X”
I_IND_SEND_PROTOCOL_MAIL        Indicator: Send error log by mail
Default = “X”
I_IND_TRANSFER_USAGE_DEC_CODES        Indicator: Transfer catalog data for usage
decision,
Default = “X”

The structure QAILS contains the selection options. The content depends on the business scenario and
will be described separately. It has the following structure:
|             | Field  | T         | L                                        |     | Description  |     |     |
| ----------- | ------ | --------- | ---------------------------------------- | --- | ------------ | --- | --- |
| SATZART     |        | CHAR  3   | Record type for request record           |     |              |     |     |
| LOSNR_VON   |        | NUMC  12  | From inspection batch number             |     |              |     |     |
| LOSNR_BIS   |        | NUMC  12  | To inspection batch number               |     |              |     |     |
| PLNFL       |        | CHAR  6   | Operation sequence in task list          |     |              |     |     |
| VORNR_VON   |        | CHAR  4   | From operation number                    |     |              |     |     |
| VORNR_BIS   |        | CHAR  4   | To operation number                      |     |              |     |     |
| VORGWERK    |        | CHAR  4   | Plant of operation to be processed       |     |              |     |     |
| SUBSYS      |        | CHAR  6   | Identifier of the subsystem              |     |              |     |     |
| PRPLATZ     |        | CHAR  8   | Work center                              |     |              |     |     |
| PRPLATZWRK  |        | CHAR  4   | Plant of the work center                 |     |              |     |     |
| MATNR       |        | CHAR  18  | Material number                          |     |              |     |     |
| DATUM_VON   |        | DATE  8   | From creation date of inspection batch   |     |              |     |     |
| DATUM_BIS   |        | DATE  8   | To creation date of inspection batch     |     |              |     |     |
| PRUEFSTAT   |        | CHAR  1   | Status of the inspection                 |     |              |     |     |
| ART         |        | CHAR  8   | Inspection type                          |     |              |     |     |
| HERKUNFT    |        | CHAR  2   | Origin of the inspection batch           |     |              |     |     |
| CHARG       |        | CHAR  10  | Batch number                             |     |              |     |     |
| AUFNR_VON   |        | CHAR  12  | From order number                        |     |              |     |     |
| AUFNR_BIS   |        | CHAR  12  | To order number                          |     |              |     |     |
| LIFNR       |        | CHAR  10  | Vendor number                            |     |              |     |     |
| KUNNR       |        | CHAR  10  | Customer number                          |     |              |     |     |

| SAP-QMIDI_30.docx  |     |     | Version: 1.0.22714  |     |     |     | Page 7 of 53  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | ------------- |

HYDRA Interface to SAP QM using QM-IDI
According to the selection option, the function module provides the inspection batch data, including
inspection batch header, operation and characteristics. The structures will be explained in detail in
chapter Error! Reference source not found. Error! Reference source not found., also pointing out the
meaning of the different fields.
Besides the inspection data, the function module also provides a table of error messages. These error
messages will be displayed in the MLE inbound transactions and in the protocol of the communication
program. Additionally, those entries are also forwarded to the HYDRA Escalation Management
(Prerequisite: license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.
The download of inspection batch data will be carried out by the hysapqmc.exe/out program.
Download catalog master data
The transfer of catalog master data from SAP to HYDRA will be carried out by using the function module
QIRF_SEND_CATALOG_DATA2. For that purpose, HYDRA transfers selection options to the function
module. The content of each parameter can be configured in HYDRA in customizing table
SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_IND_CATALOG_IS_SEL_SET CHAR 1 Indicator: Choose selected set,
Default = ” ”
I_IND_CATALOG_IS_CODEGROUP CHAR 1 Indicator: Choose code groups
Default = “ ”
I_IND_CATALOG_TYPE CHAR 3 Catalog type
Default = ”3”
I_IND_PLANT_OF_SELECTED_SET CHAR 4 Plant of selected set
Default = ”0001”
I_IND_CATALOG CHAR 4 Catalog (selected set or code group)
I_IND_LANGUAGE CHAR 2 Language
Default = ”D”
Besides the catalog data, the function module also provides a table of error messages. These error
messages will be displayed in the MLE inbound transactions, the protocol of the communication program.
Additionally, those entries are also forwarded to the HYDRA Escalation Management (Prerequisite:
license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.
The download of catalog master data will be carried out by the hysapqmc.exe/out program.
SAP-QMIDI_30.docx Version: 1.0.22714 Page 8 of 53

|     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |     |
| --- | --- | --- | --------------------------------------- | --- | --- |

Download inspection point data
The transfer of inspection point data from SAP to HYDRA will be carried out by using the function module
QIRF_INSPPOINT_GETLIST.  For  that  purpose,  HYDRA  transfers  selection  options  to  the  function
module.  The  content  of  each  parameter  can  be  configured  in  HYDRA  in  customizing  table
SAP_FM_PARAM_CFG.
Basically there are two options for downloading inspection points from SAP
  HYDRA-triggered e.g. for stand-alone-CAQ
In this case the selection option are configured statically in HYDRA.
  Dynamically-triggered based on the inspection data download
In this case the inspection lot number is determined from downloaded data and used to select the
inspection points inspections lot releated.
| Parameter name: |     | T L     | D         | Description |     |
| --------------- | --- | ------- | --------- | ----------- | --- |
|                 |     |         |           |             |     |
| INSPLOT         |     | -  -    | No usage  |             |     |

| INSPOPER        |     | CHAR  4    |                        |     |     |
| --------------- | --- | ---------- | ---------------------- | --- | --- |
| INSPPOINT_FROM  |     | NUMC  6    | Inspection point from  |     |     |
Default = “000001”
| INSPPOINT_TO  |     | NUMC  6    | Inspection point to  |     |     |
| ------------- | --- | ---------- | -------------------- | --- | --- |
Default = “999999”
| I_SUBSYS  |     | CHAR  6    | Subsystem confirms results  |     |     |
| --------- | --- | ---------- | --------------------------- | --- | --- |
Default = „QM0001“

Besides the inspection point data, the function module also provides a table of error messages. These
error messages will be displayed in the MLE inbound transactions, the protocol of the communication
program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management
(Prerequisite: license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.
The download of inspection point master data will be carried out by the hysapqmc.exe/out program.
HYDRA  SAP QM – inspection results / inspection points
HYDRA records results according to the inspection specifications. Those are to be transferred to SAP
QM. For that purpose, SAP provides a set of function modules. According to the record type of the
recorded inspection results one or the other has to be used.

| SAP-QMIDI_30.docx  | Version: 1.0.22714  |     |     |     | Page 9 of 53  |
| ------------------ | ------------------- | --- | --- | --- | ------------- |

HYDRA Interface to SAP QM using QM-IDI
Upload for Single Results
The QIRF_GET_ORIGINAL_VALUES2 function module has to be used to upload single results for
inspections. Besides the QAISE structure, which carries the actual inspection results, the function module
offers additional parameters that allow controlling the posting process in SAP QM. The content of each
parameter can be configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_IND_EVALUATION_TRANSFER CHAR 1 Indicator: Transfer valuations from
subsystem
Default = “X”
I_IND_CLOSE_PROCESSING CHAR 1 Indicator: Close samples or characteristics,
Default = “ ”
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
I_IND_POSTING_KZ CHAR 1 Indicator: Call up program for updating
results,
Default = “X”
I_IND_PROC_COMMIT_WORK CHAR 1 Indicator.: Trigger commit work to
database,
Default = “X”
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These messages will be displayed in the MLE outbound transactions in the protocol of the communication
program. Additionally, those entries are also forwarded to the HYDRA Escalation Management
(Prerequisite: license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.
Upload for Sample Results
The QIRF_GET_SAMPLE_VALUES2 function module has to be used to upload sample results for
inspections. Besides the QAISR structure, which carries the actual inspection results, the function module
offers additional parameters that allow controlling the posting process in SAP QM. The content of each
parameter can be configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_IND_EVALUATION_TRANSFER CHAR 1 Indicator: Transfer valuations from
subsystem
Default = “X”
I_IND_CLOSE_PROCESSING CHAR 1 Indicator: Close samples or characteristics,
Default = “ ”
SAP-QMIDI_30.docx Version: 1.0.22714 Page 10 of 53

HYDRA Interface to SAP QM using QM-IDI
Parameter name: T L D Description
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
I_IND_POSTING_KZ CHAR 1 Indicator: Call up program for updating
results,
Default = “X”
I_IND_PROC_COMMIT_WORK CHAR 1 Indicator.: Trigger commit work to
database,
Default = “X”
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These error messages will be displayed in the MLE outbound transactions in the protocol of the
communication program. Additionally, those entries are also forwarded to the HYDRA Escalation
Management (Prerequisite: license SIS-ESK and SAP-ESK) with escalation
SAP.QM_IDI_OUTBOUND_MSG.
Upload for Characteristic Results
The QIRF_GET_FEATURE_VALUES2 function module has to be used to upload characteristic results for
inspections. Besides the QAIMR structure, which carries the actual inspection results, the function
module offers additional parameters that allow controlling the posting process in SAP QM. The content of
each parameter can be configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_IND_EVALUATION_TRANSFER CHAR 1 Indicator: Transfer valuations from
subsystem
Default = “X”
I_IND_CLOSE_PROCESSING CHAR 1 Indicator: Close samples or characteristics,
Default = “ ”
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
I_IND_POSTING_KZ CHAR 1 Indicator: Call up program for updating
results,
Default = “X”
I_IND_PROC_COMMIT_WORK CHAR 1 Indicator.: Trigger commit work to
database,
Default = “X”
SAP-QMIDI_30.docx Version: 1.0.22714 Page 11 of 53

HYDRA Interface to SAP QM using QM-IDI
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These error messages will be displayed in the MLE outbound transactions in the protocol of the
communication program. Additionally, those entries are also forwarded to the HYDRA Escalation
Management (Prerequisite: license SIS-ESK and SAP-ESK) with escalation
SAP.QM_IDI_OUTBOUND_MSG.
Upload for Inspection Points
Creating and updating / deleting inspection points are done by using the QIRF_GET_INSP_POINT2
function module. Besides the QAIPP structure, which carries the actual inspection point data, the function
module offers additional parameters that allow controlling the posting process in SAP QM. The content of
each parameter can be configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These error messages will be displayed in the MLE outbound transactions in the protocol of the
communication program. Additionally, those entries are also forwarded to the HYDRA Escalation
Management (Prerequisite: license SIS-ESK and SAP-ESK) with escalation
SAP.QM_IDI_OUTBOUND_MSG.
Upload for Usage Decision
The usage decision is uploaded by using the QIRF_GET_USAGE_DECISION2 function module. Besides
the QAIVE structure, which carries the actual usage decision data, the function module offers additional
parameters that allow controlling the posting process in SAP QM. The content of each parameter can be
configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_STOCK_POSTING CHAR 1 Indicator: Trigger inventory posting in
QM after usage decision
Default = “X”
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
SAP-QMIDI_30.docx Version: 1.0.22714 Page 12 of 53

HYDRA Interface to SAP QM using QM-IDI
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These error messages will be displayed in the MLE outbound transactions in the protocol of the
communication program. Additionally, those entries are also forwarded to the HYDRA Escalation
Management (Prerequisite: license SIS-ESK and SAP-ESK) with escalation
SAP.QM_IDI_OUTBOUND_MSG.
Upload for Defect Items
The defect items are uploaded by using the QIRF_GET_DEFECT_ITEMS2 function module. Besides the
QMIFE structure, which carries the actual defect items data, the function module offers additional
parameters that allow controlling the posting process in SAP QM. The content of each parameter can be
configured in HYDRA in customizing table SAP_FM_PARAM_CFG.
Parameter name: T L D Description
I_SEND_PROTOCOL_MAIL CHAR 1 Indicator: Send error log by mail,
Default = “X”
I_SUBSYS CHAR 6 Subsystem confirms results
Default = „QM0001“
As a result of the posting process in SAP QM, the function module provides a table of error messages.
These error messages will be displayed in the MLE outbound transactions in the protocol of the
communication program. Additionally, those entries are also forwarded to the HYDRA Escalation
Management (Prerequisite: license SIS-ESK and SAP-ESK) with escalation
SAP.QM_IDI_OUTBOUND_MSG.
Supported integration scenarios
Each function module provided on the SAP side expects specific import parameters, structures or tables.
Depending on the function module, the data in these ones are derived either from configuration in
HYDRA or from integration with other interfaces. The implementation of the QM-IDI in HYDRA serves the
following processes and scenarios:
 Integration with SAP standard interface PP-PDC
 Integration with SAP standard interface PP-PDC and HYDRA interface extension HYINFO
 Stand-alone CAQ (e.g. for goods receipt)
SAP-QMIDI_30.docx Version: 1.0.22714 Page 13 of 53

    HYDRA Interface to SAP QM using QM-IDI

Integration with SAP standard interface PP-PDC
The integration between QM-IDI and PP-PDC interface serves the requirements of increased in process
control during production process. For that reason the routing in SAP not only contains productive
operation (transferred via PP-PDC interface) but also QM operations that itself contain characteristics and
which are transferred using QM-IDI interface. It is also possible that an operation is transferred via both
interfaces.
The download process is started by releasing the production order in SAP. That causes a download of
the production order and its operations via PP-PDC interface. The data will be received in HYDRA in the
MES Link Enabling layer for further processing. Instead of performing the posting into the HYDRA
application tables, the data is used to receive the inspection data. For that specific data of the PP-PDC
IDoc E2BP-PP-PDC-OPERA2000 is taken and transferred into the QM-IDI QAILS structure to request the
inspection batch for each order. The following table indicates which fields of the PP-PDC IDoc are used to
request inspection specifications:
| Field      | Type  | L  Description                     | Usage / Origins  |     |
| ---------- | ----- | ---------------------------------- | ---------------- | --- |
| SATZART    | CHAR  | 3  Record type to request record   | Fix „Q40“        |     |
| LOSNR_VON  | NUMC  | 12 From inspection batch number    | Not used         |     |
|            | NUMC  | 12 To inspection batch number      | Not used         |     |
LOSNR_BIS
| PLNFL      | CHAR  | 6  Operation sequence in task list   | Not used  |     |
| ---------- | ----- | ------------------------------------ | --------- | --- |
| VORNR_VON  | CHAR  | 4  From operation number             | Not used  |     |
| VORNR_BIS  | CHAR  | 4  To operation number               | Not used  |     |
VORGWERK  CHAR  4  Plant of operation to be processed  E2BP_PP_PDC_OPERA2000.
PLANT
SUBSYS  CHAR  6  Identifier of the subsystem   Customizing table in HYDRA
| PRPLATZ     | CHAR  | 8  Work center             | Not used               |     |
| ----------- | ----- | -------------------------- | ---------------------- | --- |
|             | CHAR  | 4                          | Not used               |     |
| PRPLATZWRK  |       | Plant of the work center   |                        |     |
| MATNR       | CHAR  | 18 Material number         | E2BP_PP_PDC_OPERA2000. |     |
MATERIAL
|            | DATE  | 8                                 | Not used  |     |
| ---------- | ----- | --------------------------------- | --------- | --- |
| DATUM_VON  |       | From creation date of inspection  |           |     |
batch
DATUM_BIS  DATE  8  To creation date of inspection  Not used
batch
|            | CHAR  | 1                          | Not used  |     |
| ---------- | ----- | -------------------------- | --------- | --- |
| PRUEFSTAT  |       | Status of the inspection   |           |     |
| ART        | CHAR  | 8  Inspection type         | Not used  |     |
HERKUNFT  CHAR  2  Origin of the inspection batch   Not used
| CHARG  | CHAR  | 10 Batch number   | Not used  |     |
| ------ | ----- | ----------------- | --------- | --- |
AUFNR_VON  CHAR  12 From order number   E2BP_PP_PDC_OPERA2000.
ORDERID
| AUFNR_BIS  | CHAR  | 12 To order number   | E2BP_PP_PDC_OPERA2000. |     |
| ---------- | ----- | -------------------- | ---------------------- | --- |
ORDERID
| LIFNR  | CHAR  | 10 Vendor number   | Not used  |     |
| ------ | ----- | ------------------ | --------- | --- |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 14 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| KUNNR  | CHAR  10 Customer number   |     | Not used  |     |     |
| ------ | -------------------------- | --- | --------- | --- | --- |

As a result of the download of the inspection specification the original PP-PDC IDoc and the newly
transferred QM-IDI data are pooled into a new IDoc of the following characteristics:
| Message type / IDoc type:  | PPCC2RECORDER_QM_IDI   |     |     |     |     |
| -------------------------- | ---------------------- | --- | --- | --- | --- |
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     | E2BP _PP_PDC_OPERA2000 (PP operations)               |     |     |        | 1-n  |
| --- | ---------------------------------------------------- | --- | --- | ------ | ---- |
|     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)   |     |     |        | 0-n  |
|     | Z2QIAVC000X000 (Inspection batches and operations)   |     |     |        | 1-n  |
|     | Z2QAIMV000X000 (inspection characteristics)          |     |     |        | 1-n  |
|     | Z2QAICA000X000 (catalogs)                            |     |     |        | 1-n  |
|     | Z2QIERR000X000 (error logs)                          |     |     |   1-n  |      |

Prerequisite:
  HYDRA license SAP-PPPDC
Integration with SAP PP-PDC and HYINFO
The integration of QM-IDI with PP-PDC can also be extended when using HYDRA interface extension for
PP-PDC HYINFO. The interface extension HYINFO also uses sRFC calls to receive additional data from
SAP such as order header data or the list of components.
In this case, the original PP-PDC will be used first to collect additional data within SAP from the interface
extension. As a result the interface extension pools the original order data from PP-PDC interface and the
newly selected additional data into a new IDoc of the following characteristics:
| Message type / IDoc type:  | PPCC2HYINFOORDER   |     |     |     |     |
| -------------------------- | ------------------ | --- | --- | --- | --- |
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     | E2BP _PP_PDC_OPERA2000 (PP operations)                  |     |     |     | 1-n  |
| --- | ------------------------------------------------------- | --- | --- | --- | ---- |
|     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)      |     |     |     | 0-n  |
|     | HYINFO_xxx (additional data from interface extension)   |     |     |     | 1-n  |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     | Page 15 of 53  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

This new IDoc is the basement to collect inspection specifications in SAP QM. For that, the original PP-
PDC data will be used to derive the production orders to request the specifications for. For that the same
data / fields will be used as described above. As a result a new IDoc will be created by pooling as much
the original PP-PDC data, the data from interface extension HYINFO as the QM-IDI data with the
following characteristics:
| Message type / IDoc type:  | PPCC2HYINFOORDER_QM_IDI   |     |     |     |     |
| -------------------------- | ------------------------- | --- | --- | --- | --- |
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     | E2BP _PP_PDC_OPERA2000 (PP operations)                  |     |     |        | 1-n  |
| --- | ------------------------------------------------------- | --- | --- | ------ | ---- |
|     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)      |     |     |        | 0-n  |
|     | HYINFO_xxx (additional data from interface extension)   |     |     |        | 1-n  |
|     | Z2QIAVC000X000 (Inspection batches and operations)      |     |     |        | 1-n  |
|     | Z2QAIMV000X000 (inspection characteristics)             |     |     |        | 1-n  |
|     | Z2QAICA000X000 (catalogs)                               |     |     |        | 1-n  |
|     | Z2QIERR000X000 (error logs)                             |     |     |   1-n  |      |

Stand-alone CAQ
The stand-alone variant is thought to support inspections that are not related to production orders, such
as goods receipt inspections. It can be used independently or in combination with the two integration
scenarios described in the previous chapters.
In order to be able to request the inspection batches for those inspections, there is a customizing table in
HYDRA that allows defining different selection options. To support different kinds of selection options it is
possible to configure multiple variants in the customizing table SAP_FB_PARAM_CFG.
The  request  of  inspection  batch  will  be  performed  on  a  cyclic  base.  For  the  calling  program
hysapqmc.exe/out has to be configured in the HYDRA Scheduler.
As a result of the receipt of inspection batches an IDoc will be created with the following characteristics:
| Message type / IDoc type:  | ZQM_IDI   |     |     |     |     |
| -------------------------- | --------- | --- | --- | --- | --- |
Segments:  Z2QIAVC000X000 (Inspection batches and operations)   1-n
|     | Z2QAIMV000X000 (inspection characteristics)  |     |     |        | 1-n  |
| --- | -------------------------------------------- | --- | --- | ------ | ---- |
|     | Z2QAICA000X000 (catalogs)                    |     |     |        | 1-n  |
|     | Z2QIERR000X000 (error logs)                  |     |     |   1-n  |      |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     | Page 16 of 53  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

3  Download of inspection specifications / master data
The processing of all other segments in the integration scenario with PP-PDC and / or HYINFO interface
extension are  described in their respective  interface  documentations (HKMPP-PDC.pdf or  HKMPP-
INF.pdf). In this chapter the QM-IDI processing is described only.
Inspection batch / operations in “Z2QAIVC000X000” structure
| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
SATZART  CHAR  3    Record type for header record   Not used
PRUEFLOS  NUMC 12    Number of the inspection batch   Number of the inspection batch
PLNFL  CHAR  6    Operation sequence in task list   In accordance with configuration
(*1)
VORNR  CHAR  4    Operation number   In accordance with configuration
(*1)
Display in HYDRA client (*2)
WERK  CHAR  4    Plant of the inspection batch   Plant of the inspection batch
| ART  | CHAR  8    | Inspection type   | Inspection type   |     |
| ---- | ---------- | ----------------- | ----------------- | --- |
HERKUNFT  CHAR  2    Origin of the inspection batch   Origin of the inspection batch
ENTSTEHDAT  DATE  8    Creation date of the inspection batch   Creation date of the inspection
batch
ERSTELLER  CHAR  12    User who created the data record   User who created the data record
AENDERER  CHAR  12    User who changed the data record   User who changed the data record
AENDERDAT  DATE  8    Change date of the data record   Change date of the data record
KZVESUBSYS  CHAR  1    Ind.: make usage decision in  “X”  Usage decision will be
|     |     | subsystem   |   made in HYDRA  |     |
| --- | --- | ----------- | ---------------- | --- |
“ “  Usage decision will be
  made in SAP
VKATART  CHAR  1    Catalog type for usage decision   Catalog type for usage decision
VWERKS  CHAR  4    Plant of selected set for usage dec.   Plant of selected set for usage
dec.
VAUSWAHLMG  CHAR  8    Selected set for usage decision   Selected set for usage decision
PPVEKATART  CHAR  1    Catalog type for inspection point  Catalog type for inspection point
|     |     | valuation   | valuation   |     |
| --- | --- | ----------- | ----------- | --- |
PPVEWERK  CHAR  4    Plant of the selected set for the  Plant of the selected set for the
|     |     | inspection point valuation   | inspection point valuation   |     |
| --- | --- | ---------------------------- | ---------------------------- | --- |
PPVEMENGE  CHAR  8    Selected set for the inspection point  Selected set for the inspection
|     |     | valuation   | point valuation   |     |
| --- | --- | ----------- | ----------------- | --- |
PPVECODGRA  CHAR  4    Code group proposal when inspection  Code group proposal when
|     |     | point is accepted (acceptance of all  | inspection point is accepted          |     |
| --- | --- | ------------------------------------- | ------------------------------------- | --- |
|     |     | characteristics)                      | (acceptance of all characteristics)   |     |
PPVECODEA  CHAR  4    Code proposal when inspection point  Code proposal when inspection
|     |     | is accepted   | point is accepted   |     |
| --- | --- | ------------- | ------------------- | --- |
PPVECODGRR  CHAR  4    Code group proposal when inspection  Code group proposal when
|     |     | point is rejected (rejection of one  | inspection point is rejected         |     |
| --- | --- | ------------------------------------ | ------------------------------------ | --- |
|     |     | characteristic at least)             | (rejection of one characteristic at  |     |
least)
PPVECODER  CHAR  4    Code proposal when inspection point  Code proposal when inspection
|        |            | is rejected      | point is rejected   |     |
| ------ | ---------- | ---------------- | ------------------- | --- |
| PLNTY  | CHAR  1    | Task list type   | Task list type      |     |
PLNNR  CHAR  8    Key of task list group   Key of task list group
| PPLVERW  | CHAR  3    | Task list usage   | Task list usage   |     |
| -------- | ---------- | ----------------- | ----------------- | --- |
PLNAL  CHAR  2    Task list group counter   Task list group counter

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 17 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
ZAEHL NUMC 8 Version counter for task list Version counter for task list
PLANKTEXT CHAR 40 Short text of the task list Short text of the task list
DATUV DATE 8 Start of validity for task list header Start of validity for task list header
PASTRTERM DATE 8 Start date of the inspection Start date of the inspection
PAENDTERM DATE 8 Finish date of the inspection Finish date of the inspection
KUNNR CHAR 10 Customer number Customer number
NAME1KUN CHAR 35 Name 1 of the customer Name 1 of the customer
LIFNR CHAR 10 Vendor number Vendor number
NAME1LIF CHAR 35 Name 1 of the vendor Name 1 of the vendor
HERSTELLER CHAR 10 Number of the manufacturer Number of the manufacturer
NAME1HER CHAR 35 Name 1 of the manufacturer Name 1 of the manufacturer
MATNR CHAR 18 Material number Material number
KTEXTMAT CHAR 40 Short text of the material Short text of the material
KTEXTLOS CHAR 40 Short text of the inspection batch Short text of the inspection batch
CHARG CHAR 10 Batch number Batch number
LAGORTCHRG CHAR 4 Storage location of the batch Storage location of the batch
LICHN CHAR 15 Batch number used by vendor Batch number used by vendor
IDNLF CHAR 35 Material number used by vendor Material number used by vendor
KDMAT CHAR 35 Material number used by customer Material number used by customer
POSTX CHAR 40 Mat. short text used by customer Mat. short text used by customer
WERKVORG CHAR 4 Plant of the goods movement Plant of the goods movement
LAGORTVORG CHAR 4 Storage location for the goods Storage location for the goods
movement movement
LOSMENGE CHAR 17 Inspection batch quantity Inspection batch quantity
MENGENEINH CHAR 3 Base unit of measure of the inspection Base unit of measure of the
batch inspection batch
GESSTICHPR CHAR 17 Sample size for inspection batch Sample size for inspection batch
EINHPROBE CHAR 3 Unit of measure for sample Unit of measure for sample
EBELN CHAR 10 Purchasing document number Purchasing document number
EBELP NUMC 5 Item no. of purchasing document Item no. of purchasing document
MJAHR NUMC 4 Year of the material document Year of the material document
MBLNR CHAR 10 Number of the material document Number of the material document
ZEILE NUMC 4 Item in material document Item in material document
BUDAT DATE 8 Posting date in document Posting date in document
AUFNR CHAR 12 Order number Order number
KDAUF CHAR 10 Customer order number Customer order number
KDPOS NUMC 6 Item number in sales order Item number in sales order
VORKTXT CHAR 40 Short text for operation Short text for operation
PRPLATZ CHAR 8 Work center HYDRA Machine / Work center
PRPLATZWRK CHAR 4 Plant of the target work center Plant of the target work center
PRPLATZTXT CHAR 40 Short text of the work center Short text of the work center
SUBSYS CHAR 6 Identifier of the subsystem Identifier of the subsystem
QKZPRZEIT CHAR 1 Ind.: work cycle = time “X” Inspection point based
on time intervals
QKZPRMENG CHAR 1 Ind.: work cycle = quantity “X” Inspection point based
on quantity intervals
QKZPRFREI CHAR 1 Ind.: any work cycle “X” Free inspection points
SAP-QMIDI_30.docx Version: 1.0.22714 Page 18 of 53

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
QRASTZEHT CHAR 3 Time unit of inspection grid Supported units:
„S“  seconds
„SEC“  seconds
„MIN“  minutes
„H“  hours
„HUR“  hours
„STD“  hours
QRASTZFAK NUMC 6 Time factor for inspection grid Value for the time interval
QRASTMENG CHAR 17 Quantity between two inspections Value for the quantity interval
QRASTEREH CHAR 3 Unit of measure of the insp. grid Unit of measure for the quantity
interval
PPKTTYP CHAR 1 Inspection point type Type of inspection point
“ “ IP for IPC
“1” IP for equipment
“2” IP functional location
“3” IP for physical sample
KZEQUNR CHAR 1 “X” Field is active
Indicator: user field EQUNR active
“ “ Field is not active
SWEQUNR CHAR 20 Key word for user field EQUNR
KZTPLNR CHAR 1 “X” Field is active
Indicator: user field TPLNR active
“ “ Field is not active
SWTPLNR CHAR 20 Key word for user field TPLNR
KZPHYNR CHAR 1 “X” Field is active
Indicator: user field PHYNR active
“ “ Field is not active
SWPHYNR CHAR 20 Key word for user field PHYNR
KZUSERC1 CHAR 1 Indicator: user field USERC1 active “ “ Field is not active
“X” Optional field
“1” Obligatory field
SWUSERC1 CHAR 20 Key word for user field USERC1 Key word displayed when creating
/ closing inspection points
KZUSERC2 CHAR 1 Indicator: user field USERC2 active “ “ Field is not active
“X” Optional field
“1”...”6” Obligatory field
SWUSERC2 CHAR 20 Key word for user field USERC2 Key word displayed when creating
/ closing inspection points
KZUSERN1 CHAR 1 Indicator: user field USERN1 active “ “ Field is not active
“X” Optional field
“1”...”6” Obligatory field
SWUSERN1 CHAR 20 Key word for user field USERN1 Key word displayed when creating
/ closing inspection points
KZUSERN2 CHAR 1 Indicator: user field USERN2 active “ “ Field is not active
“X” Optional field
“1”...”6” Obligatory field
SWUSERN2 CHAR 20 Key word for user field USERN2 Key word displayed when creating
/ closing inspection points
KZUSERD1 CHAR 1 Indicator: user field USERD1 active “ “ Field is not active
“X” Optional field
“1”...”6” Obligatory field
SWUSERD1 CHAR 20 Key word for user field USERD1 Key word displayed when creating
/ closing inspection points
KZUSERT1 CHAR 1 Indicator: user field USERT1 active “ “ Field is not active
“X” Optional field
“1”...”6” Obligatory field
SWUSERT1 CHAR 20 Key word for user field USERT1 Key word displayed when creating
/ closing inspection points
SAP-QMIDI_30.docx Version: 1.0.22714 Page 19 of 53

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
TEILLOSPFL  CHAR  1    Indicator: assignment of partial batch  “X”  Partial batch
|     |     | to an inspection point required   | confirmation  |     |
| --- | --- | --------------------------------- | ------------- | --- |
“ “  No partial batch
  confirmation
CHARGPFL  CHAR  1    Indicator: batch management required  “X”  Batch managed
“ “  No batch management
| QUANTITIES  | CHAR  1    |     | “X”  Confirmation of quantity  |     |
| ----------- | ---------- | --- | ------------------------------ | --- |
  required
Confirmation of quantity required
“ “  Confirmation of quantity
  not required
EVALUATION  CHAR  1    Confirmation of a valuation required,  “X”  Confirmation of
|     |     | else confirmation by QM   |   evaluation required  |     |
| --- | --- | ------------------------- | ---------------------- | --- |
“ “  Confirmation of
  evaluation not required
| KOSTL  | CHAR  10    | Cost center   | Cost center   |     |
| ------ | ----------- | ------------- | ------------- | --- |
KZKORRTRAN  CHAR  1    Ind.: Correction transmission   Ind.: Correction transmission
PRUEFSTAT  CHAR  1    Status of the inspection   Entries correspond with status of
inspection requirements:
“A”    FRE
“B”    ABG
“C”    STO
“D”    UNT
“E”    SKL
“F”    GES
In case PRUEFSTAT = “E”,
additionally the skip lot flag is set
to “1”, else to “0”
| EINHVORG  | CHAR  3    | Unit of measure for operation   |     |     |
| --------- | ---------- | ------------------------------- | --- | --- |
RUECKMPP  CHAR  1    Indicator: confirmation of inspection  Not used
point required. This field is currently
not supported.

Characteristics in “Z2QAIMV000X000” structure
| Field name:  | T  L       | D  Description  | Use in HYDRA  |     |
| ------------ | ---------- | --------------- | ------------- | --- |
| SATZART      | CHAR  3    | Record type     | Not used      |     |
RUECKMELNR  NUMC 8    Confirmation  number  for  inspection Confirmation number
characteristic

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 20 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
ERFASSART CHAR 1 Recording type for insp. charact. “A” Measured value for
single unit
“B” Code for single unit
“C” Valuation for single unit
(OK/not OK)
“D” Measured value for
sample
“E” Code for sample
“F” Valuation of a sample
“G” Measured value for a
characteristic
“H” Code for a characteristic
“I” Valuation of a
characteristic
“J” Measured value for
single unit in a sample
“K” Code for single unit in a
sample
“L” Valuation for single unit
in a sample
“M” Measured value for
sample of an inspection
point
“N” Code for single unit of
an inspection point
“O” Valuation for single unit
of an inspection point
“P” Measured value for
sample of an inspection
point
“Q” Code for sample of an
inspection point
“R” Valuation for sample of
an inspection point
KZBEWSUBSY CHAR 1 Ind.: valuation by subsystem “X” Valuation in HYDRA
“ “ Valuation in SAP
BEWART CHAR 1 Valuation type for insp. charact. “A” Valuation by number of
non-conforming units (N-
C relation)
“B” Valuation by number of
defects (N-C relation)
“C” Valuation according to s
method (ISO3951)
“D” Valuation according to
code
“E” Manual valuation
“F” Valuation based on the
mean value within
tolerance limits
“G” Valuation at sample
level
“H” Valuation according to
control chart
SAP-QMIDI_30.docx Version: 1.0.22714 Page 21 of 53

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
KZRZWANG CHAR 1 Results recording required " " Inspection for
characteristic is optional
“+” Inspection required if
result for preceding
required characteristic
is OK
“-“ Inspection required if
result for preceding
required characteristic
is not OK
“X” Inspection for
characteristic is required
STATUSV CHAR 1 Not used
STATUSR CHAR 1 Not used
KZPRUMF CHAR 1 Ind.: inspection scope “=” Specified scope of insp.
must be adhered to
“<” Scope of insp. may be
below specification
“>” Specified scope of
inspection may be
exceeded
“ “ Scope of insp. may fall
below or exceed
specification
KZDOKU CHAR 1 Documentation required “ “ Inspection description for
characteristic is optional
“.” (dot) Inspection
description required in
case of rejection
“+” Inspection description
required
KZSERNR CHAR 1 Ind.: record serial number “ “ Serial number optional
with single values
“X” Serial number required
with single values
KZTSTICHPR CHAR 1 Ind.: partial samples for charact. “ “ Inspect single sample
for characteristic
“X” Inspect multiple sample
for characteristic
KZRAST CHAR 1 Ind.: inspection with insp. grid “ “ Sampling procedure
without inspection grid
“X” Sampling procedure with
inspection grid
RASTER NUMC 3 Inspection frequency within inspection Inspection frequency within
grid inspection grid
SOLLSTPANZ CHAR 5 No. of partial samples planned No. of partial samples planned
SAP-QMIDI_30.docx Version: 1.0.22714 Page 22 of 53

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
BEWARTSP CHAR 1 Valuation type of partial sample “A” Valuation by number of
non-conforming units (N-
C relation)
“B” Valuation by number of
defects (N-C relation)
“C” Valuation according to s
method (ISO3951)
“D” Valuation according to
code
“E” Manual valuation
“F” Valuation based on the
mean value
within tolerance limits
“G” Valuation at sample
level
“H” Valuation according to
control chart
PRUEFLOS NUMC 12 Number of the inspection batch Number of the inspection batch
PLNFL CHAR 6 Number of the task list sequence In accordance with configuration
(*1)
VORNR CHAR 4 Operation number In accordance with configuration
(*1)
MERKNR NUMC 4 Characteristic number Characteristic number
QPMK_WERKS CHAR 4 Plant of master inspection charact. Plant of master inspection charact.
VERWMERKM CHAR 8 Master inspection characteristic Master inspection characteristic
MKVERSION CHAR 6 Version of master insp. charact. Version of master insp. charact.
QMTB_WERKS CHAR 4 Plant of the inspection method Plant of the inspection method
PMETHODE CHAR 8 Inspection method Inspection method
PMTVERSION CHAR 6 Version of the inspection method Version of the inspection method
PMTKURZTXT CHAR 40 Short text of the inspection method Short text of the inspection method
PRUEFQUALI CHAR 5 Inspector qualification Inspector qualification
MERKGEW CHAR 2 Weighting of insp. characteristic Weighting of insp. characteristic
GEWKURZTXT CHAR 40 Short text for weighting of inspection Short text for weighting of
characteristic inspection characteristic
KURZTEXT CHAR 40 Short text of the characteristic Short text of the characteristic
FORMEL CHAR 12 Formula for inspection charact. Formula for inspection charact.
0
DUMMY10 CHAR 10 Additional information 1 Customer / project specific usage
DUMMY20 CHAR 20 Additional information 2 Customer / project specific usage
DUMMY40 CHAR 40 Additional information 3 Customer / project specific usage
STELLEN NUMC 2 No. of digits after decimal point No. of digits after decimal point
MASSEINHSW CHAR 3 Unit of measure for insp. charact. Unit of measure for insp. charact.
SOLLWERT CHAR 16 Target value/nominal value Target value/nominal value
TOLERANZOB CHAR 16 Upper tolerance limit Upper tolerance limit
TOLERANZUN CHAR 16 Lower tolerance limit Lower tolerance limit
PLAUSIOBEN CHAR 16 Upper plausibility limit Upper plausibility limit
PLAUSIUNTE CHAR 16 Lower plausibility limit Lower plausibility limit
GRENZEOB1 CHAR 16 First upper limit value Customer / project specific usage
GRENZEUN1 CHAR 16 First lower limit value Customer / project specific usage
GRENZEOB2 CHAR 16 Second upper limit value Customer / project specific usage
GRENZEUN2 CHAR 16 Second lower limit value Customer / project specific usage
SAP-QMIDI_30.docx Version: 1.0.22714 Page 23 of 53

HYDRA Interface to SAP QM using QM-IDI
Field name: T L D Description Use in HYDRA
KATAB1 CHAR 1 Ind.: catalog entry 1 is selected set “X” catalog entry 1 is
selected set
“ “ catalog entry 1 is not
selected set
KATALGART1 CHAR 1 Catalog type 1 Catalog type 1
AUSWMGWRK1 CHAR 4 Plant of selected set 1 Plant of selected set 1
AUSWMENGE1 CHAR 8 Selected set / code group 1 Selected set / code group 1
KATAB2 CHAR 1 Ind.: catalog entry 2 is selected set “X” catalog entry 2 is
selected set
“ “ catalog entry 2 is not
selected set
KATALGART2 CHAR 1 Catalog type 2 Catalog type 2
AUSWMGWRK2 CHAR 4 Plant of selected set 2 Plant of selected set 2
AUSWMENGE2 CHAR 8 Selected set / code group 2 Selected set / code group 2
KATAB3 CHAR 1 Ind.: catalog entry 3 is selected set “X” catalog entry 3 is
selected set
“ “ catalog entry 3 is not
selected set
KATALGART3 CHAR 1 Catalog type 3 Catalog type 3
AUSWMGWRK3 CHAR 4 Plant of selected set 3 Plant of selected set 3
AUSWMENGE3 CHAR 8 Selected set / code group 3 Selected set / code group 3
KATAB4 CHAR 1 Ind.: catalog entry 4 is selected set “X” catalog entry 4 is
selected set
“ “ catalog entry 4 is not
selected set
KATALGART4 CHAR 1 Catalog type 4 Catalog type 4
AUSWMGWRK4 CHAR 4 Plant of selected set 4 Plant of selected set 4
AUSWMENGE4 CHAR 8 Selected set / code group 4 Selected set / code group 4
KATAB5 CHAR 1 Ind.: catalog entry 5 is selected set “X” catalog entry 5 is
selected set
“ “ catalog entry 5 is not
selected set
KATALGART5 CHAR 1 Catalog type 5 Catalog type 5
AUSWMGWRK5 CHAR 4 Plant of selected set 5 Plant of selected set 5
AUSWMENGE5 CHAR 8 Selected set / code group 5 Selected set / code group 5
SOLLSTPUMF NUMC 7 Sample size to be checked per If SOLLSTPANZ > 0, then the
inspection characteristic sample size is calculated through
the formula SOLLSTPUMF /
SLLSTPANZ
PROBEMGEH CHAR 3 Unit of measure for sample Unit of measure for sample
PROBMGFAK NUMC 6 Factor for sample unit of measure Factor for sample unit of measure
ANNAHME NUMC 5 Acceptance number for attributive Acceptance number for attributive
inspection inspection
RUECKWEZ NUMC 5 Rejection number for attributive Rejection number for attributive
inspection inspection
KFAKTOR CHAR 16 K factor for variable inspection K factor for variable inspection
QRKNR NUMC 12 Control chart number Transformation of SAP control
chart number into HYDRA control
chart number
PHYSPROBE NUMC 6 Number of the physical sample Number of the physical sample
KZKORRTRAN CHAR 1 Ind.: correction transmission “ “ First transmission
“X” Correction transmission
ZAEHL NUMC 8 Version counter Version counter
SAP-QMIDI_30.docx Version: 1.0.22714 Page 24 of 53

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  |     | Use in HYDRA  |     |
| ------------ | ----- | --------------- | --- | ------------- | --- |
ANTVERF  CHAR  1    Share calculation procedure   “A”   Binomial distribution
“B”   Poisson distribution
“C”   Normal distribution
“ “  Distribution not specified

Catalog master data in “Z2QAICA000X000” structure
| Field name:  | T  L       | D  Description  |     | Use in HYDRA  |     |
| ------------ | ---------- | --------------- | --- | ------------- | --- |
| SATZART      | CHAR  3    | Record type     |     | Not used      |     |
KATAB  CHAR  1    Ind.: entry is selected set   “X”  entry is selected set
“X”  entry is no selected set
| KATALGART  | CHAR  1    | Catalog type   |     | Catalog type   |     |
| ---------- | ---------- | -------------- | --- | -------------- | --- |
AUSWMGWRK  CHAR  4    Plant of the selected set   Plant of the selected set
| AUSWMENGE   | CHAR  8    | Selected set   |     | Selected set   |     |
| ----------- | ---------- | -------------- | --- | -------------- | --- |
| CODEGRUPPE  | CHAR  8    | Code group     |     | Code group     |     |
| CODE        | CHAR  4    | Code           |     | Code           |     |
KURZTEXT  CHAR  40    Short text of the code   Short text of the code
| BEWERTUNG  | CHAR  1    | Valuation   |     | “A”  Acceptance (OK)  |     |
| ---------- | ---------- | ----------- | --- | --------------------- | --- |
“R”  Rejection (not OK)
“ “  Valuation not carried out
FEHLKLASSE  CHAR  2    Defect class   Always the same values allowed.
Defined in Customizing
(transaction OQC7)
MUSSTEXTKZ  CHAR  1    Ind.: text required for confirmation.   “ “  Text not obligatory
“X”  Text obligatory
BB_VORSCH  CHAR  1    Ind.: carry out inventory posting   “ “  No inventory posting
“X”  Inventory posting carried
  out
| QKENNZAHL  | NUMC 3    | Quality score   |     | Quality score   |     |
| ---------- | --------- | --------------- | --- | --------------- | --- |

Inspection Points in “Z2QAIPP000X000” structure
| Field name:  | T  L       | D  Description  |     | Use in HYDRA       |     |
| ------------ | ---------- | --------------- | --- | ------------------ | --- |
| SATZART      | CHAR  3    | Record type     |     | “Q85”  Download of |     |
  inspection point
| PRUEFLOS  | NUMC 12     | Inspection batch number           |     |     |     |
| --------- | ----------- | --------------------------------- | --- | --- | --- |
| PLNFL     | CHAR  6     | Operation sequence in task list   |     |     |     |
| VORNR     | CHAR  4     | Operation number                  |     |     |     |
| PROBENR   | NUMC 6      | Sample number                     |     |     |     |
| TEILLOS   | NUMC 6      | Partial batch number              |     |     |     |
| MENGE     | CHAR  17    | Inspection point quantity         |     |     |     |
EINHPR  CHAR  3    Unit of measure for inspection point   Not used
| EQUNR  | CHAR  18    | Equipment number Cannot be defined   |                    |     |     |
| ------ | ----------- | ------------------------------------ | ------------------ | --- | --- |
|        |             | freely  (value                       | range  determined  | by  |     |
inspection batch); inspection points of
|     |     | type  1  through    | 3  already   | defined  |     |
| --- | --- | ------------------- | ------------ | -------- | --- |
|     |     | (these  inspection  | points  can  | be       |     |
retrieved with function module

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     | Page 25 of 53  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L        | D       | Description               | Use in HYDRA  |     |
| ------------ | ----------- | ------- | ------------------------- | ------------- | --- |
| TPLNR        | CHAR  30    | Number  | of  functional  location  | (see          |     |
EQUNR)
| PHYNR  | CHAR  12    | Number  | of  physical  sample  | (see   |     |
| ------ | ----------- | ------- | --------------------- | ------ | --- |
EQUNR)
| USERC1  | CHAR  18    | User field for 18 characters   |     |     |     |
| ------- | ----------- | ------------------------------ | --- | --- | --- |
| USERC2  | CHAR  10    | User field for 10 characters   |     |     |     |
| USERN1  | NUMC 10     | User field for 10 digits       |     |     |     |
| USERN2  | NUMC 3      | User field for 3 digits        |     |     |     |
| USERD1  | DATE  8     | User field for date            |     |     |     |
| USERT1  | TIME  6     | User field for time            |     |     |     |
VKATART  CHAR  1    Catalog type   Not used (only for upload)
| VWERKS  | CHAR  4    | Plant   |     | Not used (only for upload)  |     |
| ------- | ---------- | ------- | --- | --------------------------- | --- |
VAUSWAHLMG  CHAR  8    Selected set of the usage decision for Not used (only for upload)
the inspection point
VCODEGRP  CHAR  8    Code group of the usage decision   Not used (only for upload)
VCODE  CHAR  4    Code of the usage decision   Not used (only for upload)
| VTEXT  | CHAR  40    | Short text for partial batch   |     |           |     |
| ------ | ----------- | ------------------------------ | --- | --------- | --- |
| MATNR  | CHAR  18    | Material number                |     | Not used  |     |
| CHARG  | CHAR  10    | Batch number                   |     |           |     |
PRUEFDATUM  DATE  8    Start date of the inspection   Not used
PRUEFZEIT  TIME  6    Start time of the inspection   Not used
| PRUEFER  | CHAR  12    | Name of the inspector   |     | Not used  |     |
| -------- | ----------- | ----------------------- | --- | --------- | --- |
KZRMART  CHAR  1    Confirmation type, currently not used   Not used
URSACHEAS  CHAR  4    Reason for scrap, currently not used   Not used
| MENGEAS  | CHAR  17    | Scrap quantity    |     |     |     |
| -------- | ----------- | ----------------- | --- | --- | --- |
| MENGENA  | CHAR  17    | Rework quantity   |     |     |     |

Error messages in “Z2QIERR000X000” structure
| Field name:  | T  L  | D   | Description  | Use in HYDRA  |     |
| ------------ | ----- | --- | ------------ | ------------- | --- |
LFDNR  NUMC  4    Consecutive number  Usage in HYDRA Escalation
Management (Acronym complies
with field name)
| MSGID  | CHAR  20    | Message class    |     | Vide field LFDNR  |     |
| ------ | ----------- | ---------------- | --- | ----------------- | --- |
| MSGNR  | NUMC 3      | Message number   |     | Vide field LFDNR  |     |
MSGTYPE  CHAR  1    Message type (E, I, W,...)   Vide field LFDNR
| MSGTEXT  | CHAR  73    | Message text   |     | Vide field LFDNR  |     |
| -------- | ----------- | -------------- | --- | ----------------- | --- |
LOG_NO  CHAR  20    Application log: protocol number   Vide field LFDNR
LOG_MSG_NO  NUMC 6    Application  log:  number  of  current Vide field LFDNR
message
| PARAM_NAME  | CHAR  32    | Parameter name      |     | Vide field LFDNR  |     |
| ----------- | ----------- | ------------------- | --- | ----------------- | --- |
| PARAM_ROW   | NUMC 10     | Line in parameter   |     | Vide field LFDNR  |     |
PARAM_FIELD  CHAR  30    Field in parameter   Vide field LFDNR
PRUEFLOS  NUMC 12    Inspection batch number   Vide field LFDNR
PLNFL  CHAR  6    Sequence of operations within a task Vide field LFDNR
list
| VORNR  | CHAR  4    | Operation number   |     | Vide field LFDNR  |     |
| ------ | ---------- | ------------------ | --- | ----------------- | --- |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     | Page 26 of 53  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
VORGLFNR  NUMC 8    Consecutive node number from order Vide field LFDNR
counter APLZL
MERKNR  NUMC 4    Inspection characteristic number   Vide field LFDNR
KATAB  CHAR  1    Indicator: catalog entry is a selected Vide field LFDNR
set
KATALGART  CHAR  1    Catalog  type  of  the  assigned  code Vide field LFDNR
group or selected set
AUSWMGWRK  CHAR  4    Plant of the assigned selected set   Vide field LFDNR
AUSWMENGE  CHAR  8    Assigned code group or selected set   Vide field LFDNR
| CODEGRUPPE  | CHAR  8    | Code group   | Vide field LFDNR  |     |
| ----------- | ---------- | ------------ | ----------------- | --- |
| CODE        | CHAR  4    | Code         | Vide field LFDNR  |     |
RUECKMELNR  NUMC 8    Confirmation number for the inspection Vide field LFDNR
point
| PROBENR  | NUMC 6    | Number of the sample   | Vide field LFDNR  |     |
| -------- | --------- | ---------------------- | ----------------- | --- |
STUECKNR  NUMC 4    Consecutive  number  for  unit  to  be Vide field LFDNR
inspected
| SATZART  | CHAR  3    | Record types   | Vide field LFDNR  |     |
| -------- | ---------- | -------------- | ----------------- | --- |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 27 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

4  Upload of inspection results
Upload for Single Results
| Message Type::  | ZHYQMIDI_ORIGINAL_VALUES         |     |     |     |
| --------------- | -------------------------------- | --- | --- | --- |
| IDoc Type::     | ZHYQMIDI_ORIGINAL_VALUES01       |     |     |     |
| Segment::       | Z2QAISE000X000 (single results)  |     |     |     |

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
“Q51”  Quantitative single result
| SATZART  | CHAR  3    | Record type  |     |     |
| -------- | ---------- | ------------ | --- | --- |
“Q52”  Code as single result
“Q53”  Valuation OK/not OK as
  single result
“Q54”  Quantitative single result
  for inspection point
“Q55”  Code as single result for
  inspection point
“Q56”  Valuation as single
  result for inspection
  point
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
PROBENR  NUMC 6    Number of the partial sample     Number of partial sample
(without inspection points)
  Number of inspection point
STUECKNR  NUMC 4    Consecutive number for test units     Number of sample (without
inspection points)
  Number of inspection point
KZSERNR  CHAR  1    Ind.: serial number filled   “X”  If recording of serial
  numbers is required
“ “  If recording of serial
  numbers is not required
SERIALNR  CHAR  18    Serial no. of the test unit   Contains serial number if recording
of serial number is required
| KZLWERT   | CHAR  1    | Ind.: last single value   | Not used  |     |
| --------- | ---------- | ------------------------- | --------- | --- |
| KZLPROBE  | CHAR  1    | Ind.: last sample         | Not used  |     |
KZABSCHL  CHAR  1    Ind.: close characteristic (sample)   Not used
| KZBEWEEXT  | CHAR  1    | Ind.: transfer valuation   | Not used  |     |
| ---------- | ---------- | -------------------------- | --------- | --- |
ATTRIBUT  CHAR  1    Attribute of the individual result   “/”  Single value was set
  invalid
“ “  Valid value
| MESSWERT  | CHAR  16    | Measured value   | Measured value   |     |
| --------- | ----------- | ---------------- | ---------------- | --- |
| GRUPPE1   | CHAR  8     | Code group 1     | Code group 1     |     |
| CODE1     | CHAR  4     | Code 1           | Code 1           |     |
| GRUPPE2   | CHAR  8     | Code group 2     | Code group 2     |     |
| CODE2     | CHAR  4     | Code 2           | Code 2           |     |
| GRUPPE3   | CHAR  8     | Code group 3     | Code group 3     |     |
| CODE3     | CHAR  4     | Code 3           | Code 3           |     |
| GRUPPE4   | CHAR  8     | Code group 4     | Code group 4     |     |
| CODE4     | CHAR  4     | Code 4           | Code 4           |     |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 28 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L       | D  Description  | Use in HYDRA          |     |
| ------------ | ---------- | --------------- | --------------------- | --- |
| GRUPPE5      | CHAR  8    | Code group 5    | Code group 5          |     |
| CODE5        | CHAR  4    | Code 5          | Code 5                |     |
| BEWERTUNG    | CHAR  1    | Valuation       | “A”  Acceptance (OK)  |     |
“R”  Rejection (not OK)
FEHLKLAS  CHAR  2    Defect class   Defect class if available
| ANZFEHLER  | NUMC 2    | Number of defects   | Number of defects  |     |
| ---------- | --------- | ------------------- | ------------------ | --- |
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data (on completion)   According to customizing
| MASCHINE  | CHAR  18    | Machine                   | Machine / work centre  |     |
| --------- | ----------- | ------------------------- | ---------------------- | --- |
| POSITION  | NUMC 4      | Position on the machine   | Position               |     |
PRUEFBEMKT  CHAR  40    Short text for inspection description   Short text for inspection
description
| MBEWERTGPR  | CHAR  1    | Valuation of the sample   | Not used  |     |
| ----------- | ---------- | ------------------------- | --------- | --- |
FEHLKLASPR  CHAR  2    Defect class for sample valuation   Not used
MBEWERTGMK  CHAR  1    Valuation of the characteristic   Not used
FEHLKLASMK  CHAR  2    Defect class for characteristic valuation  Not used

Upload for Sample Results
| Message type:  | ZHYQMIDI_SAMPLE_VALUES           |     |     |     |
| -------------- | -------------------------------- | --- | --- | --- |
| IDoc type:     | ZHYQMIDI_SAMPLE_VALUES01         |     |     |     |
| Segment::      | Z2QAISR000X000 (sample results)  |     |     |     |

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
SATZART  CHAR  3    Record type   “Q61”  Quantitative sample
  result
“Q62”  Code as sample result
“Q63”  Valuation OK/not OK for
  sample
“Q64”  Quantitative result for
  inspection point
“Q65”  Code for inspection
  point
“Q66”  Valuation OK/not OK for
  inspection point
“Q69”  Close sample record
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
PROBENR  NUMC 6    Ind.: close characteristic     Number of partial sample
(without inspection points)
  Number of inspection point
| KZLRPOBE  | CHAR  1    | Ind.: transfer valuation   | Not used  |     |
| --------- | ---------- | -------------------------- | --------- | --- |
KZABSCHL  CHAR  1    Attribute of the results record   Not used

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 29 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |
KZBEWEEXT  CHAR  1    Valuation of characteristic for usage Not used
decision
ATTRIBUT  CHAR  1    Defect class   “/”  Single value was set
  invalid
“ “  Valid value
| GRUPPE1  | CHAR  8    | Code group 1   | Code group 1   |     |
| -------- | ---------- | -------------- | -------------- | --- |
| CODE1    | CHAR  4    | Code 1         | Code 1         |     |
| GRUPPE2  | CHAR  8    | Code group 2   | Code group 2   |     |
| CODE2    | CHAR  4    | Code 2         | Code 2         |     |
| GRUPPE3  | CHAR  8    | Code group 3   | Code group 3   |     |
| CODE3    | CHAR  4    | Code 3         | Code 3         |     |
| GRUPPE4  | CHAR  8    | Code group 4   | Code group 4   |     |
| CODE4    | CHAR  4    | Code 4         | Code 4         |     |
| GRUPPE5  | CHAR  8    | Code group 5   | Code group 5   |     |
| CODE5    | CHAR  4    | Code 5         | Code 5         |     |
ANZWERTG  NUMC 4    Number of valid values   Number  of  valid  values  if
QAIMV.BEWARTSP = “A” or “B”
ANZFEHLEH  NUMC 4    Number of non-conforming units   Number of non-conforming units if
QAIMV.BEWARTSP = “A”
ANZFEHLER  NUMC 4    Number of defects   Number of defects if
QAIMV.BEWARTSP = “B”
ANZWERTO  NUMC 4    Values above upper tolerance limit   Values above upper tolerance limit
ANZWERTU  NUMC 4    Values below lower tolerance limit   Values below lower tolerance limit
MITTELWERT  CHAR  16    Average of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
VARIANZ  CHAR  16    Variance of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
MAXWERT  CHAR  16    Max. of valid measured values   Max. of valid measured values
MEDIANWERT  CHAR  16    Median of valid measured values   Median of valid measured values
MINWERT  CHAR  16    Min. of valid measured values   Min. of valid measured values
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFDATUB  DATE  8    Finish date of the inspection   Finish date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFZEITB  TIME  6    Finish time of the inspection   Finish time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data   According to customizing
| MASCHINE  | CHAR  18    | Machine                   | Machine / work centre  |     |
| --------- | ----------- | ------------------------- | ---------------------- | --- |
| POSITION  | NUMC 4      | Position on the machine   | Position               |     |
PRUEFBEMKT  CHAR  40    Short text for inspection descript.   Short text for inspection
description
| MBEWERTGPR  | CHAR  1    |     | Not used  |     |
| ----------- | ---------- | --- | --------- | --- |
| FEHLKLASPR  | CHAR  2    |     | Not used  |     |
| MBEWERTGMK  | CHAR  1    |     | Not used  |     |
| FEHLKLASMK  | CHAR  2    |     | Not used  |     |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 30 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

Upload for Characteristic Results
| Message type:  | ZHYQMIDI_FEATURE_VALUES                  |     |     |     |
| -------------- | ---------------------------------------- | --- | --- | --- |
| IDoc type:     | ZHYQMIDI_FEATURE_VALUES01                |     |     |     |
| Segment:       | Z2QAIMR000X000 (characteristic results)  |     |     |     |

| Field name:  | T  L       | D  Description  | Use in HYDRA         |     |
| ------------ | ---------- | --------------- | -------------------- | --- |
| SATZART      | CHAR  3    | Record type     | “Q71”  Quantitative  |     |
  characteristic result
“Q72”  Code as characteristic
  result
“Q73”  Valuation OK/not OK for
  characteristic
“Q79”  Close characteristic
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
KZABSCHL  CHAR  1    Ind.: close characteristic   “X”  If record type “Q79”
“ “  All other record types
KZBEWEEXT  CHAR  1    Ind.: transfer valuation   Ind.: transfer valuation in
accordance to specification
ATTRIBUT  CHAR  1    Attribute of the results record   “/”  Single value was set
  invalid
“ “  Valid value
MBEWERTG  CHAR  1    Valuation of characteristic for usage “A”  Acceptance (OK)
|     |     | decision   | “R”  Rejection (not OK)  |     |
| --- | --- | ---------- | ------------------------ | --- |
FEHLKLAS  CHAR  2    Defect class   Defect class if available
| GRUPPE1  | CHAR  8    | Code group 1   | Code group 1   |     |
| -------- | ---------- | -------------- | -------------- | --- |
| CODE1    | CHAR  4    | Code 1         | Code 1         |     |
| GRUPPE2  | CHAR  8    | Code group 2   | Code group 2   |     |
| CODE2    | CHAR  4    | Code 2         | Code 2         |     |
| GRUPPE3  | CHAR  8    | Code group 3   | Code group 3   |     |
| CODE3    | CHAR  4    | Code 3         | Code 3         |     |
| GRUPPE4  | CHAR  8    | Code group 4   | Code group 4   |     |
| CODE4    | CHAR  4    | Code 4         | Code 4         |     |
| GRUPPE5  | CHAR  8    | Code group 5   | Code group 5   |     |
| CODE5    | CHAR  4    | Code 5         | Code 5         |     |
ANZWERTG  NUMC 7    Number of valid values   Number  of  valid  values  if
QAIMV.BEWARTSP = “A” or “B”
ANZFEHLEH  NUMC 7    Number of non-conforming units   Number of non-conforming units if
QAIMV.BEWARTSP = “A”
ANZFEHLER  NUMC 7    Number of defects   Number of defects if
QAIMV.BEWARTSP = “B”
ANZWERTO  NUMC 7    Values above upper tolerance limit   Values above upper tolerance limit
ANZWERTU  NUMC 7    Values below lower tolerance limit   Values below lower tolerance limit
MITTELWERT  CHAR  16    Average of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
VARIANZ  CHAR  16    Variance of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
MAXWERT  CHAR  16    Max. of valid measured values   Max. of valid measured values
MEDIANWERT  CHAR  16    Median of valid measured values   Median of valid measured values

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 31 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  |     | Use in HYDRA  |     |
| ------------ | ----- | --------------- | --- | ------------- | --- |
MINWERT  CHAR  16    Min. of valid measured values   Min. of valid measured values
IVARIANZ  CHAR  16    Inner variance of measured values   Inner variance of measured values
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFDATUB  DATE  8    Finish date of the inspection   Finish date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFZEITB  TIME  6    Finish time of the inspection   Finish time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data   According to customizing
| MASCHINE  | CHAR  18    | Machine                   |     | Machine / work centre  |     |
| --------- | ----------- | ------------------------- | --- | ---------------------- | --- |
| POSITION  | NUMC 4      | Position on the machine   |     | Position               |     |
PRUEFBEMKT  CHAR  40    Short text for inspection description  Short text for inspection
description

Upload for Inspection Points
| Message type:  | ZHYQMIDI_INSP_POINTS                |     |     |     |     |
| -------------- | ----------------------------------- | --- | --- | --- | --- |
| IDoc type::    | ZHYQMIDI_INSP_POINTS01              |     |     |     |     |
| Segment:       | Z2QAIPP000X000 (inspection points)  |     |     |     |     |

| Field name:  | T  L  | D  Description  |     | Use in HYDRA  |     |
| ------------ | ----- | --------------- | --- | ------------- | --- |
“Q83”  Creation / update of an
| SATZART  | CHAR  3    | Record type  |     |     |     |
| -------- | ---------- | ------------ | --- | --- | --- |
  inspection point
“Q84”  Valuation for inspection
  point
| PRUEFLOS  | NUMC 12    | Inspection batch number   |     |     |     |
| --------- | ---------- | ------------------------- | --- | --- | --- |
Inspection batch number in
accordance to specification
PLNFL  CHAR  6    Operation sequence in task list   Operation sequence in task list in
accordance to specification
VORNR  CHAR  4    Operation number   Operation number in accordance
to specification
PROBENR  NUMC 6    Sample number   Consecutive number for the
inspection point
| TEILLOS  | NUMC 6    | Partial batch number   |     | Recorded value if  |     |
| -------- | --------- | ---------------------- | --- | ------------------ | --- |
QAIVC.TEILLOSPFL = „X“
MENGE  CHAR  17    Inspection point quantity   Recorded quantity if
QAIVC.QUANTITIES = „X“
EINHPR  CHAR  3    Unit of measure for inspection point   Unit of measure for inspection
point
EQUNR  CHAR  18    Equipment number Cannot be defined Not used
|     |     | freely  (value  | range  determined  | by  |     |
| --- | --- | --------------- | ------------------ | --- | --- |
inspection batch); inspection points of
|     |     | type  1  through    | 3  already   | defined  |     |
| --- | --- | ------------------- | ------------ | -------- | --- |
|     |     | (these  inspection  | points  can  | be       |     |
retrieved with function module
TPLNR  CHAR  30    Number  of  functional  location  (see Not used
EQUNR)

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     | Page 32 of 53  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |     |
| ------------ | ----- | --------------- | ------------- | --- | --- |
PHYNR  CHAR  12    Number  of  physical  sample  (see Not used
EQUNR)
USERC1  CHAR  18    User field for 18 characters   Recorded value if
QAIVC.KZUSERC1 = „X“ or “1” to
“6”
USERC2  CHAR  10    User field for 10 characters   Recorded value if
QAIVC.KZUSERC2 = „X“ or “1” to
“6”
USERN1  NUMC 10    User field for 10 digits   Recorded value if
QAIVC.KZUSERN1 = „X“ or “1” to
“6”
USERN2  NUMC 3    User field for 3 digits   Recorded value if
QAIVC.KZUSERN2 = „X“ or “1” to
“6”
| USERD1  | DATE  8    | User field for date   | Recorded value if  |     |     |
| ------- | ---------- | --------------------- | ------------------ | --- | --- |
QAIVC.KZUSERD1 = „X“ or “1” to
“6”
| USERT1  | TIME  6    | User field for time   | Recorded value if  |     |     |
| ------- | ---------- | --------------------- | ------------------ | --- | --- |
QAIVC.KZUSERT1 = „X“ or “1” to
“6”
| VKATART  | CHAR  1    | Catalog type   | “Q83”  Not used  |     |     |
| -------- | ---------- | -------------- | ---------------- | --- | --- |
“Q84”  Catalog type
| VWERKS  | CHAR  4    | Plant   | “Q83”  Not used  |     |     |
| ------- | ---------- | ------- | ---------------- | --- | --- |
“Q84”  Plant
VAUSWAHLMG  CHAR  8    Selected set of the usage decision for “Q83”  Not used
|     |     | the inspection point   | “Q84”  Selected  | set       | of  the   |
| --- | --- | ---------------------- | ---------------- | --------- | --------- |
|     |     |                        |   usage          | decision  | for  the  |
  inspection point
VCODEGRP  CHAR  8    Code group of the usage decision   “Q83”  Not used
“Q84”  Code group of the usage
  decision
VCODE  CHAR  4    Code of the usage decision   “Q83”  Not used
|     |     |     | “Q84”  Code  | of  the  | usage  |
| --- | --- | --- | ------------ | -------- | ------ |
  decision
VTEXT  CHAR  40    Short text for partial batch   “Q83”  Not used
“Q84”  Recorded value
MATNR  CHAR  18    Material number   Material number in accordance to
specification
| CHARG  | CHAR  10    | Batch number   | Recorded value if  |     |     |
| ------ | ----------- | -------------- | ------------------ | --- | --- |
QAIVC.CHARGPFL = “X”
PRUEFDATUM  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFZEIT  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
KZRMART  CHAR  1    Confirmation type, currently not used   Not used
URSACHEAS  CHAR  4    Reason for scrap, currently not used   Not used
| MENGEAS  | CHAR  17    | Scrap quantity   | “Q83”  Not used  |     |     |
| -------- | ----------- | ---------------- | ---------------- | --- | --- |
“Q84”  Recorded value
| MENGENA  | CHAR  17    | Rework quantity   | “Q83”  Not used  |     |     |
| -------- | ----------- | ----------------- | ---------------- | --- | --- |
“Q84”  Recorded value

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 33 of 53  |     |
| ------------------ | --- | ------------------- | --- | -------------- | --- |

    HYDRA Interface to SAP QM using QM-IDI

Upload for Usage Decision
| Message type:  | ZHYQMIDI_USAGE_DECISION          |     |     |     |
| -------------- | -------------------------------- | --- | --- | --- |
| IDoc type:     | ZHYQMIDI_USAGE_DECISION01        |     |     |     |
| Segment:       | Z2QAIVE000X000 (usage decision)  |     |     |     |

| Field name:  | T  L       | D  Description  | Use in HYDRA              |     |
| ------------ | ---------- | --------------- | ------------------------- | --- |
| SATZART      | CHAR  3    | Record type     | “Q88”  Transfer of usage  |     |
  decision
“Q89”  Cancellation of
  inspection, usage
  decision transferred

PRUEFLOS  NUMC 12    Inspection batch number   Inspection batch number in
accordance to specification
AUSWMENGE  CHAR  8    Selected set of the usage decision   Selected set of the usage decision
in accordance to specification
AUSWMGWRK  CHAR  4    Plant of the selected set   Plant of the selected set in
accordance to specification
| CODE        | CHAR  4    | Code         | Recorded Value  |     |
| ----------- | ---------- | ------------ | --------------- | --- |
| CODEGRUPPE  | CHAR  8    | Code group   | Recorded Value  |     |
VNAME  CHAR  12    Person who made usage decision   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
VDATUM  DATE  8    Date when usage decision was made   Date when usage decision was
made
VZEIT  TIME  6    Time when usage decision was made   Time when usage decision was
made
VTEXT  CHAR  80    Text for usage decision   Text for usage decision

Upload for Defect Items
| Message type:  | ZHYQMIDI_DEFECT_ITEMS      |     |     |     |
| -------------- | -------------------------- | --- | --- | --- |
| IDoc type      | ZHYQMIDI_ DEFECT_ITEMS 01  |     |     |     |
Segment:
Z2QMIFE000X000 (defect items)

| Field name:  | T  L  | D  Description  | Use in HYDRA  |     |
| ------------ | ----- | --------------- | ------------- | --- |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 34 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

| Field name:  | T  L       | D             | Description  |     | Use in HYDRA                      |     |     |
| ------------ | ---------- | ------------- | ------------ | --- | --------------------------------- | --- | --- |
| SATZART      | CHAR  3    | Record type   |              |     | “Q90”  Defect item for            |     |     |
|              |            |               |              |     |   inspection batch                |     |     |
|              |            |               |              |     | “Q91”  Defect item for operation  |     |     |
|              |            |               |              |     | “Q92”  Defect item for            |     |     |
|              |            |               |              |     |   characteristic                  |     |     |
|              |            |               |              |     |   independent multiple            |     |     |
|              |            |               |              |     |   sample                          |     |     |
|              |            |               |              |     | “Q95”  Defect item for operation  |     |     |
|              |            |               |              |     |   with reference to               |     |     |
|              |            |               |              |     |   inspection point                |     |     |
|              |            |               |              |     | “Q96”  Defect item for            |     |     |
|              |            |               |              |     |   characteristic with             |     |     |
|              |            |               |              |     |   reference to inspection         |     |     |
|              |            |               |              |     |   point                           |     |     |
| PRUEFLOS     | NUMC 12    |               |              |     | Inspection point number in        |     |     |
Inspection batch number
accordance to specification
| PLNFL  | CHAR  6    |     |     |     | Sequence of operations in task list  |     |     |
| ------ | ---------- | --- | --- | --- | ------------------------------------ | --- | --- |
Sequence of operations in task list
in accordance to specification
| VORNR  | CHAR  4    |     |     |     | Operation number in accordance  |     |     |
| ------ | ---------- | --- | --- | --- | ------------------------------- | --- | --- |
Operation number
to specification
| MERKNR  | NUMC 4    |     |     |     | Characteristic  | number  | in  |
| ------- | --------- | --- | --- | --- | --------------- | ------- | --- |
Characteristic number
accordance to specification
PROBENR  NUMC 6    Number  of  partial  sample/inspection Number  of  partial
|             |           | point         |         |                  | sample/inspection point             |                 |     |
| ----------- | --------- | ------------- | ------- | ---------------- | ----------------------------------- | --------------- | --- |
| RUECKMELNR  | NUMC 8    |               |         |                  | Confirmation number for inspection  |                 |     |
|             |           | Confirmation  | number  | for  inspection  |                                     |                 |     |
|             |           |               |         |                  | characteristic                      | in  accordance  | to  |
characteristic
specification
| POSNR  | NUMC 4    | Sort number for item   |     |     | Consecutive number  |     |     |
| ------ | --------- | ---------------------- | --- | --- | ------------------- | --- | --- |
FEKAT  CHAR  1    Catalog type - defects   Catalog type - defects
FEGRP  CHAR  8    Code group - defects   Code group - defects
| FECOD  | CHAR  4    | Defects   |     |     | Defects   |     |     |
| ------ | ---------- | --------- | --- | --- | --------- | --- | --- |
SERIALNR  CHAR  18    Single-unit  number  of  unit  to  be Single-unit number of unit to be
|     |     | inspected   |     |     | inspected   |     |     |
| --- | --- | ----------- | --- | --- | ----------- | --- | --- |
ANZFEHLER  CHAR  7    Number of defects   Number of defects
| FEQKLAS  | CHAR  2    | Defect class   |     |     | Defect class   |     |     |
| -------- | ---------- | -------------- | --- | --- | -------------- | --- | --- |
KZSYSFE  CHAR  1    Indicator: systematic defect   Indicator: systematic defect
OTKAT  CHAR  1    Catalog type - object parts   Catalog type - object parts
OTGRP  CHAR  8    Code group - object parts   Code group - object parts
| OTEIL  | CHAR  4    | Object part   |     |     | Object part   |     |     |
| ------ | ---------- | ------------- | --- | --- | ------------- | --- | --- |
FETXT  CHAR  40    Short text for defect item   Short text for defect item
| BAUTL  | CHAR  18    | Assembly   |     |     | Assembly   |     |     |
| ------ | ----------- | ---------- | --- | --- | ---------- | --- | --- |
FEHLBEW  CHAR  10    Quantitative defect valuation   Quantitative defect valuation
UNITFLBEW  UNIT  3    Unit for defect valuation   Unit for defect valuation
FENAM  CHAR  12    Name of person who processed defect If result was recorded at HYDRA
|     |     | record   |     |     | console, it contains the user;  |     |     |
| --- | --- | -------- | --- | --- | ------------------------------- | --- | --- |
otherwise it contains the personal
card number.
FEDAT  DATS  8    Date of record processing   Date of record processing
FZEIT  TIMS  6    Time of record processing   Time of record processing

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     |     |     | Page 35 of 53  |     |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- | --- |

|     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |
| --- | --- | --- | --------------------------------------- | --- |

5  Configuring function module parameters
Usage
The integration of HYDRA with SAP requires the use of a number of function modules in SAP. Each
function module provides a set of import parameters that allow controlling the selection or posting process
in SAP.
In order to provide the highest flexibility to control these ones differently, all these parameters can be
maintained in a customizing table in HYDRA. Right now there is no graphical user interface to maintain
the table, though any adjustments have to be done by using database interface.
Table: SAP_FB_PARAM_CFG
| Field  | T   | L  Description  | Meaning / Remark  |     |
| ------ | --- | --------------- | ----------------- | --- |
VARIANTE  CHAR  30  Variant  The variant is the logical name for a set of parameters for
one or more function modules.
FB_NAME  CHAR  30  Name of the function module  Together with the field VARIANTE the FB_NAME forms
the key of the table.
The field contains the technical name as it can be found
in SAP transaction SE37
PARAM_NAME  CHAR  50  Name of the parameter  The field contains the technical name as it can be found
in SAP transaction SE37
PARAM_VALUE  CHAR  100  Value of the parameter  Contains the actual value of the parameter, e.g. “X”.
| PARAM_TYPE    | CHAR  | 15  Type of the parameter     | Future use          |     |
| ------------- | ----- | ----------------------------- | ------------------- | --- |
| PARAM_LENGTH  | NUM   | 10  Length of the parameters  | Future use          |     |
| VERWEIS       |       |   Database serial             | Consecutive number  |     |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 36 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |     |     |
| --- | --- | --- | --- | --------------------------------------- | --- | --- | --- |

6  HYSAPQMC - Programmparameter
Usage
Use the interface program hysapqmc.exe/out, to request downloads from SAP QM via the QM-IDI-
interface. The program downloads QM master date as well as inspection specifications.
Available program parameters
| Parameter  | Meaning/  |     |     |     |     | Relevant    | Productive  |
| ---------- | --------- | --- | --- | --- | --- | ----------- | ----------- |
|            | Usage     |     |     |     |     | interfaces  | release     |
Program parameter to control processing
| /MESTYP=<Value>  | The MESTYP parameter is used to  |      |            |     |         | All  | YES  |
| ---------------- | -------------------------------- | ---- | ---------- | --- | ------- | ---- | ---- |
|                  | define                           | the  | structure  |     | to  be  |      |      |
processed.
/MESFCT=<Value>  The  message  function  is  used  to  All  YES
differentiate within a message type
/VARIANTE=<Value>  Variant  for  parameters  of  function  All  YES
module
| /LOGSYS=<Value>  | Logical        | system  | for            | which  | the    | All  | YES  |
| ---------------- | -------------- | ------- | -------------- | ------ | ------ | ---- | ---- |
|                  | communication  |         | is  performed  |        | (only  |      |      |
used with stand-alone CAQ)
/MESTYP_OUT=<Value>  Message  type  which  is  to  be  All  YES
created
|                         |                          |      |        |        |      | All  | YES  |
| ----------------------- | ------------------------ | ---- | ------ | ------ | ---- | ---- | ---- |
| /TL=<TRL_ALL/TRL_CONN/  | Defines                  | the  | trace  | level  | for  |      |      |
| TRL_TID/TRL_DATA        | communication processes  |      |        |        |      |      |      |
/PP_PDC_NO_COPY  When  requesting  inspection  SAP-PPPDC  YES
|     | characteristics     |     | based           | on  | PP-PDC  |     |     |
| --- | ------------------- | --- | --------------- | --- | ------- | --- | --- |
|     | data, the original  |     | PP-PDC data is  |     |         |     |     |
not copied as well
GET_INSPPOINTS_4_INSPLOTS  Request from sap only inspections  SAP-QMIDI  YES
points for the determined inspection
|     | lots  from  | an  | inbound  | transaction  |     |     |     |
| --- | ----------- | --- | -------- | ------------ | --- | --- | --- |

| SAP-QMIDI_30.docx  | Version: 1.0.22714  |     |     |     |     |     | Page 37 of 53  |
| ------------------ | ------------------- | --- | --- | --- | --- | --- | -------------- |

|     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |
| --- | --- | --- | --------------------------------------- | --- |

| Parameter  | Meaning/     |             | Relevant    | Productive  |
| ---------- | ------------ | ----------- | ----------- | ----------- |
|            | Usage        |             | interfaces  | release     |
|            | (/TID={TID}  | (available  | as  of      |             |
hysapqmc.exe/out V8.1.1.26)

| SAP-QMIDI_30.docx  | Version: 1.0.22714  |     |     | Page 38 of 53  |
| ------------------ | ------------------- | --- | --- | -------------- |

|     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |
| --- | --- | --- | --------------------------------------- | --- |

7  Application-relevant settings in HYDRA
Configuring variants for Stand-alone CAQ
The request for inspection specifications is based on a uniform selection table. Opposite to the integration
scenarios with PP-PDC and/or HYINFO, for stand-alone CAQ integration it is not possible to use any data
provided by SAP to request the specifications.
For the following reason there is a customizing table in HYDRA. The table represents the QAILS selection
structure defined by SAP and allows though, requesting inspection specifications from SAP. Right now
there is no graphical user interface to maintain the table, though any adjustments have to be done by
using database interface.
Table: CAQ_QAILS_VORMERK
| Field    | T     | L  Description              | Meaning / Remark  |     |
| -------- | ----- | --------------------------- | ----------------- | --- |
| SATZART  | CHAR  | 3  Record type for request  | Fixed „Q40“       |     |
record
| LOSNR_VON  | NUMC  | 12  | Should not be used for selection  |     |
| ---------- | ----- | --- | --------------------------------- | --- |
From inspection batch
number
LOSNR_BIS  NUMC  12  To inspection batch number   Should not be used for selection
PLNFL  CHAR  6  Operation sequence in task  Should not be used for selection
list
VORNR_VON  CHAR  4  From operation number   Should not be used for selection
VORNR_BIS  CHAR  4  To operation number   Should not be used for selection
| VORGWERK  | CHAR  | 4   | Should be used for selection  |     |
| --------- | ----- | --- | ----------------------------- | --- |
Plant of operation to be
processed
SUBSYS  CHAR  6  Identifier of the subsystem   Value as defined in SAP customizing
Default: QM0001
| PRPLATZ     | CHAR  | 8  Work center   | Useable for selection  |     |
| ----------- | ----- | ---------------- | ---------------------- | --- |
| PRPLATZWRK  | CHAR  | 4                | Useable for selection  |     |
Plant of the work center
| MATNR  | CHAR  | 18  Material number   | Useable for selection  |     |
| ------ | ----- | --------------------- | ---------------------- | --- |
DATUM_VON  CHAR  15  It is possible to calculate the “date from” dynamically
From creation date of
according to the current date minus x days. For that the
inspection batch
entry has to be done such as:
TODAY–n (n represents the number of days, e.g. 5)
Default: TODAY
DATUM_BIS  CHAR  15  To creation date of inspection It is possible to calculate the “date from” dynamically
according to the current date minus x days. For that the
batch
entry has to be done such as:
TODAY-n (n represents the number of days, e.g. 5)
Default: Today
PRUEFSTAT]  CHAR  1  Status of the inspection   Useable for selection
| ART  | CHAR  | 8  Inspection type   | Useable for selection  |     |
| ---- | ----- | -------------------- | ---------------------- | --- |
HERKUNFT  CHAR  2  Origin of the inspection batch  Useable for selection
| CHARG  | CHAR  | 10  | Should not be used for selection  |     |
| ------ | ----- | --- | --------------------------------- | --- |
Batch number

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 39 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

|     |     |     | HYDRA Interface to SAP QM using QM-IDI  |     |
| --- | --- | --- | --------------------------------------- | --- |

| Field  | T   | L  Description  | Meaning / Remark  |     |
| ------ | --- | --------------- | ----------------- | --- |
AUFNR_VON  CHAR  12  From order number   Should not be used for selection
| AUFNR_BIS  | CHAR  | 12  | Should not be used for selection  |     |
| ---------- | ----- | --- | --------------------------------- | --- |
To order number
LIFNR  CHAR  10  Vendor number   Should not be used for selection
| KUNNR  | CHAR  | 10  Customer number   | Useable for selection  |     |
| ------ | ----- | --------------------- | ---------------------- | --- |
MBLNR  CHAR  10  Number of the material document Should not be used for selection
| MAXLOSANZ  | NUMC  | 4  Maximum number of batches per Fixed “9999”  |     |     |
| ---------- | ----- | ---------------------------------------------- | --- | --- |
transmission
| BEARB       | CHAR       |   User                  | Future use          |     |
| ----------- | ---------- | ----------------------- | ------------------- | --- |
| TA_ID       | CHAR       | 30                      | Future Use          |     |
| STATISCH    | CHAR       | 1  Flag “Static entry”  | Fixed “J”           |     |
| STATUS      | CHAR       | 3                       | Future use          |     |
| BEARB_DATE  | DATE       |                         | Future use          |     |
| BEARB_TIME  | TIME       |                         | Future use          |     |
| USER_D_01   | DATE       |   User field            | Future use          |     |
| USER_D_02   | DATE       |   User field            | Future use          |     |
| USER_N_03   | NUMC       | 8  User field           | Future use          |     |
| USER_N_04   | NUMC       | 8  User field           | Future use          |     |
| USER_N_05   | NUMC       | 8  User field           | Future use          |     |
| USER_F_07   | DEC  13,3  | User field              | Future use          |     |
| USER_F_08   | DEC  13,3  | User field              | Future use          |     |
| USER_C_09   | CHAR       | 20  User field          | Future use          |     |
| USER_C_10   | CHAR       | 40  User field          | Future use          |     |
| Verweis     |            |   Database serial       | Consecutive number  |     |

Use the HYDRA Scheduler to maintain entries for the download of inspection specifications in CAQ
stand-alone scenario. The program has only to be called once per subsystem. It will then execute all
entries in the CAQ_QAILS_VORMERK table one after the other
| Parameter name  |     | Value       |     |     |
| --------------- | --- | ----------- | --- | --- |
| Product key     |     | SAP-QMIDI   |     |     |
| License key     |     | SAP-QM-IDI  |     |     |
Command (Windows):  sh.exe  ./hysapqmc.scr  /MESTYP_OUT=ZQM_IDI
/VARIANTE=QM_IDI /LOGSYS=<created logical system>
Command (Unix):  ./hysapqmc.scr /MESTYP_OUT=ZQM_IDI /VARIANTE=QM_IDI
/LOGSYS=<created logical system>
| Comment:   |     | SAP-QMIDI: Download inspection specifications  |     |     |
| ---------- | --- | ---------------------------------------------- | --- | --- |
| Intervall  |     | 5                                              |     |     |

| SAP-QMIDI_30.docx  |     | Version: 1.0.22714  |     | Page 40 of 53  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

Configuring call for catalog master data
Catalog master data of SAP is needed for all integration scenarios. The catalog master data download is
also executed by the hysapqmc.exe/out program. Use the HYDRA Scheduler to maintain entries for the
download of catalog master data.
| Parameter name  | Value       |     |     |     |
| --------------- | ----------- | --- | --- | --- |
| Product key     | SAP-QMIDI   |     |     |     |
| License key     | SAP-QM-IDI  |     |     |     |
Command (Windows):  sh.exe ./hysapqmc.scr /MESTYP_OUT=ZHYQMIDI_CATALOG
|     | /LOGSYS=<created  | logical  system>  | /VARIANTE=<variant  | as  |
| --- | ----------------- | ----------------- | ------------------- | --- |
definded in table SAP_SF_PARAM_CFG>
Command (Unix):  ./hysapqmc.scr  /MESTYP_OUT=ZHYQMIDI_CATALOG
|     | /LOGSYS=<created  | logical  system>  | /VARIANTE=<variant  | as  |
| --- | ----------------- | ----------------- | ------------------- | --- |
definded in table SAP_SF_PARAM_CFG>
| Comment:   | SAP-QMIDI: Download catalog master data  |     |     |     |
| ---------- | ---------------------------------------- | --- | --- | --- |
| Intervall  | 5                                        |     |     |     |

The HYDRA scope of delivery includes the “QM_IDI” variant for the QIRF_SEND_CATALOG_DATA2
function module as an example. In the example all parameter values are empty.
If necessary multiple entries have to be created to download all necessary catalog master data from SAP.
It is strictly recommended to create the variants in the customer name space, starting with “U_”.
Configuring call for inspection point download – HYDRA-triggered
Inspection points from SAP are needed for all integration scenarios. The inspection point download is
also executed by the hysapqmc.exe/out program. Use the HYDRA Scheduler to maintain entries for the
download of inspection points.
| Parameter name  | Value      |     |     |     |
| --------------- | ---------- | --- | --- | --- |
| Product key     | SAP-QMIDI  |     |     |     |

| SAP-QMIDI_30.docx  | Version: 1.0.22714  |     | Page 41 of 53  |     |
| ------------------ | ------------------- | --- | -------------- | --- |

    HYDRA Interface to SAP QM using QM-IDI

| Parameter name  | Value       |     |
| --------------- | ----------- | --- |
| License key     | SAP-QM-IDI  |     |
Command (Windows):
|     | sh.exe                                            | ./hysapqmc.scr  |
| --- | ------------------------------------------------- | --------------- |
|     | /MESTYP_OUT=ZHYQMIDI_INSPPOINT  /LOGSYS=<created  |                 |
logical system> /VARIANTE=ALL
Command (Unix):  ./hysapqmc.scr  /MESTYP_OUT=ZHYQMIDI_INSPPOINT
/LOGSYS=<created logical system> /VARIANTE=ALL
| Comment:   | SAP-QMIDI: Download inspection points  |     |
| ---------- | -------------------------------------- | --- |
| Intervall  | 5                                      |     |

The  HYDRA  scope  of  delivery  includes  the  “QM_IDI”  variant  for  the  QIRF_INSPPOINT_GETLIST
function module as an example. The variant has mandatory to be copied into variant “ALL”.
To enable a dynamically operation, the parameter values for the parameters INSPLOT, INSPOPER,
INSPPOINT_FROM  and  INSPPOINT_TO  can  be  set  to  “USE_PROG_PARAMS”.  In  this  case  the
program parameters of the same name will be evaluated for the function module call. I.e. :
hysapqmc.exe/out  .....    /INSPLOT=000012345678  /INSPOPER=0010  /INSPPOINT_FROM=1
/INSPPOINT_TO=500
If necessary multiple entries have to be created to download all necessary inspection points from SAP. It
is strictly recommended to create the variants in the customer name space, starting with “U_”.
Configuring call for inspection point download – dynamically-triggered
Inspection points from SAP are needed for all integration scenarios. The inspection point download is
also executed by the hysapqmc.exe/out program. It is executed based on downloaded inspection data.
For configuration of the dynamically-triggered scenario several steps have to be performed:
  Configuration for the incoming QM-data message type:
The incoming QM data has to be processed twice – once to import the data into HYDRA and
another time to download the inspection point. For that reason the script mle72imp_pp_qm.scr
has to be used and edited accordingly.
Please note the importance to copy the script into the customer name space (starting “u_”) before
changing it and calling it from the MLE distribution model.

| SAP-QMIDI_30.docx  | Version: 1.0.22714  | Page 42 of 53  |
| ------------------ | ------------------- | -------------- |

HYDRA Interface to SAP QM using QM-IDI
 Additional parameters for the function module variant
In configuration table sap_fb_param_cfg additional parameters have to be inserted
Parameter name Value
HY_SEGMENT_NAME Segment from which inspection lot number and the
operation number has to be taken from.
DEFAULT: Z2QAIVC000X000
HY_SEGMENT_INSPLOT_FROM Position in the specified segment where the
inspection lot number starts
HY_SEGMENT_INSPLOT_TO Position in the specified segment where the
inspection lot number ends
HY_SEGMENT_INSOPERFROM Position in the specified segment where the
operation number starts
HY_SEGMENT_INSOPER_TO Position in the specified segment where the
operation number ends
 Programm parameter for hysapqmc.exe/out
The programm hysapqmc.exeout has to be executed with an additional programm parameter to
enable dynamical download of inspection points:
/GET_INSPPOINTS_4_INSPLOTS
The functionality of dynamically downloading inspection points is available starting with
hysapqmc.exe/out V8.1.1.26
Configuring for inspection point creation in HYDRA
When inspection points are not downloaded from SAP, they are created in HYDRA. The creation for time
and quantity related inspection points is done by a cyclic process, that is scheduled in the HYDRA
Scheduler. Use the HYDRA Scheduler to maintain an entry for the creation of inspection points.
Parameter name Value
SAP-QMIDI_30.docx Version: 1.0.22714 Page 43 of 53

    HYDRA Interface to SAP QM using QM-IDI

| Parameter name      | Value                                            |     |
| ------------------- | ------------------------------------------------ | --- |
| Product key         | QMS-SQM                                          |     |
| License key         | QMS-SQM                                          |     |
| Command (Windows):  | sh.exe hyqmsipcr.scr                             |     |
| Command (Unix):     | ./hyqmsipcr.scr                                  |     |
| Comment:            | QMS-SQM: Creation of inspection points in HYDRA  |     |
| Intervall           | 1                                                |     |

Configuration of confirmations
After data recording in HYDRA the confirmation data has to be transferred back to SAP. The confirmation
is done on a cyclic base (Default: 15 minutes). Use the HYDRA Scheduler to maintain an entry for the
creation of inspection points.
| Parameter name      | Value                    |     |
| ------------------- | ------------------------ | --- |
| Product key         | SAP-QMIDI                |     |
| License key         | SAPQM-IDI                |     |
| Command (Windows):  | sh.exe ./qm_idi_rck.scr  |     |
| Command (Unix):     | ./qm_idi_rck.scr         |     |
Comment:  SAP-QMIDI: Confirmation of inspection results HYDRA  SAP
| Intervall  | 15  |     |
| ---------- | --- | --- |

Confirming defect items to SAP it is possible that SAP only accepts single defect items. To
transfer each defect item in a separate function call, the parameter /SINGLE_IDOC has to be

added in hysapupl.exe/out command line for defect items inside the script qm_idi_rck.scr.

| SAP-QMIDI_30.docx  | Version: 1.0.22714  | Page 44 of 53  |
| ------------------ | ------------------- | -------------- |

    HYDRA Interface to SAP QM using QM-IDI

Configuring origin of results data
The origin of results data can be configured in SAP customizing. To enable HYDRA to transfer this
information when  uploading inspection results to SAP, the entry has to be  customized in HYDRA
accordingly. The customizing is only possible in HYDRA professional mode in the CAQ options:
| Parameter name      | Value                      |     |
| ------------------- | -------------------------- | --- |
| Option              | 1101                       |     |
| Option ID           | 0                          |     |
| Option Description  | Origin of results data     |     |
| Module              | QMS                        |     |
| Value               | <value as defined in SAP>  |     |
| List                | Yes                        |     |

Configuring partial confirmations for inspection lots
Partial confirmations (transferring results before the final usage decision is made) for inspection lots can
be configured HYDRA CAQ customizing.
| Parameter name  | Value                      |     |
| --------------- | -------------------------- | --- |
| Option          | 1101                       |     |
| Option ID       | 0                          |     |
| Module          | QMS                        |     |
| Value           | <value as defined in SAP>  |     |
| Addition        | NONE                       |     |
[DIRECT]

By activating the CAQ option 1128 (value = Y) partial confirmations for inspection lots will be transferred
to SAP even when the final usage decision is not done yet.

| SAP-QMIDI_30.docx  | Version: 1.0.22714  | Page 45 of 53  |
| ------------------ | ------------------- | -------------- |

HYDRA Interface to SAP QM using QM-IDI
Remarks:
By activating the option WITHOUT the additional setting [DIRECT] the system will behave such as:
 Inspection points will be confirmed after closing them. Together with the inspection points single
results and characteristic results will be transferred.
 For operations that are not inspection point relevant, the characteristic results with their single
and sample results will be confirmed when closing the inspection order (usually when finishing
the operation).
ATTENTION!! Setting the option might cause problems when reactivating CAQ-relevant
operations.
 The usage decision will be confirmed when it is done, usually after closing the inspection
requirement.
By activating the option WITH the additional setting [DIRECT] the system will behave such as:
 All inspection point details, recorded results und defect items will be confirmed directly after
recording.
 The characteristics will be confirmed as closed, when the assigned inspection order is finished,
usually when finishing the last operation.
ATTENTION!! Setting the option might cause problems when reactivating CAQ-relevant
operations.
 Sample results will be confirmed as closed, when the assigned inspection order has been closed
or the inspection point is closed.
ATTENTION!! Setting the option might cause problems when reactivating CAQ-relevant
operations.
 The usage decision will be confirmed after recording, usually when the assigned inspection
requirement is closed.
Activating the option with additional setting [DIRECT] is only available for testing reasons. The
setting is NOT released for customers / productive usage.
SAP-QMIDI_30.docx Version: 1.0.22714 Page 46 of 53

HYDRA Interface to SAP QM using QM-IDI
In case the option is not available or inactive, all inspection lot data will be transferred after making the
final usage decision.
Settings in HYDRA MES Link Enabling Inbound – Stand-alone CAQ
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:
Name of the parameter Value
Download inspection specifications
Message type ZQM_IDI
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to use>
Description QM-IDI – Download inspection specifications
Log. Target system Created logical system
Storage duration 10
Download catalogue master data
Message type ZHYQMIDI_CATALOG
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to use>
Description QM-IDI – Download catalogs
Log. Target system Created logical system
Storage duration 10
Download inspection points
Message type ZHYQMIDI_INSPPOINT
SAP-QMIDI_30.docx Version: 1.0.22714 Page 47 of 53

HYDRA Interface to SAP QM using QM-IDI
Name of the parameter Value
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to use>
Description
Log. Target system Created logical system
Storage duration 10
Settings in HYDRA MES Link Enabling Inbound – PP-PDC integration
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing for PP-PDC
integration. Depending on the implementation sequence existing entries have to be changed and/or new
entries have to be created.:
Name of the parameter Value
Processing for PP-PDC message type PPCC2RECORDER:
Message type PPCC2RECORDER
Priority None
Command hysapqmc.scr
Command parameter /VARIANTE =QM_IDI
Description QM-IDI – Download inspection specifications
Log. Target system Created logical system
Storage duration 10
Combined import of production order data and inspection specifications
Message type PPCC2RECORDER_QM_IDI
SAP-QMIDI_30.docx Version: 1.0.22714 Page 48 of 53

HYDRA Interface to SAP QM using QM-IDI
Name of the parameter Value
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to use>
Description QM-IDI / PP-PDC: Import data
Log. Target system Created logical system
Storage duration 10
Settings in HYDRA MES Link Enabling Inbound – SAP-ISS integration
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing for PP-PDC and
SAP-ISS integration. Depending on the implementation sequence existing entries have to be changed
and/or new entries have to be created.:
Name of the parameter Value
Processing for PP-PDC message type PPCC2RECORDER:
Message type PPCC2RECORDER
Priority None
Command hysapinf.scr
Command parameter /REC_TYPE
Description SAP-ISS – Download additional data
Log. Target system Created logical system
Storage duration 10
Request inspection specifications:
Message type PPCC2HYINFOORDER
SAP-QMIDI_30.docx Version: 1.0.22714 Page 49 of 53

HYDRA Interface to SAP QM using QM-IDI
Name of the parameter Value
Priority None
Command hysapqmc.scr
Command parameter /VARIANTE =<MLE variant to use>
Description QM-IDI – Request insp. specifications
Log. Target system Created logical system
Storage duration 10
Combined import of production order data, additional data and inspection specifications
Message type PPCC2HYINFOORDER_QM_IDI
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to use>
Description QM / PP: Import data
Log. Target system Created logical system
Storage duration 10
Settings in HYDRA MES Link Enabling outbound
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
Name of the parameter Value
To upload original values
Message type ZHYQMIDI_ORIGINAL_VALUES
Description QM-IDI – Upload original values
IDoc-Typ ZHYQMIDI_ORIGINAL_VALUES
SAP-QMIDI_30.docx Version: 1.0.22714 Page 50 of 53

HYDRA Interface to SAP QM using QM-IDI
Name of the parameter Value
Storage duration 10
Log. Target system <created logical system>
Segment name 1 Z2QAISE000X000
To upload sample values
Message type ZHYQMIDI_SAMPLE_VALUES
Description QM-IDI – Upload sample values
IDoc-Typ ZHYQMIDI_SAMPLE_VALUES
Storage duration 10
Log. Target system <created logical system>
Segment name 1 Z2QAISR000X000
To upload feature values
Message type ZHYQMIDI_FEATURE_VALUES
Description QM-IDI – Upload feature values
IDoc-Typ ZHYQMIDI_FEATURE_VALUES
Storage duration 10
Log. Target system <created logical system>
Segment name 1 Z2QAIMR000X000
To upload inspection points
Message type ZHYQMIDI_INSP_POINTS
Description QM-IDI – Upload inspection point
IDoc-Typ ZHYQMIDI_INSP_POINTS
Storage duration 10
SAP-QMIDI_30.docx Version: 1.0.22714 Page 51 of 53

HYDRA Interface to SAP QM using QM-IDI
Name of the parameter Value
Log. Target system <created logical system>
Segment name 1 Z2QAIPP000X000
To upload usage decisions
Message type ZHYQMIDI_USAGE_DECISION
Description QM-IDI – Upload usage decision
IDoc-Typ ZHYQMIDI_USAGE_DECISION
Storage duration 10
Log. Target system <created logical system>
Segment name 1 Z2QAIVE000X000
To upload defect items
Message type ZHYQMIDI_DEFECT_ITEMS
Description QM-IDI – Upload defect items
IDoc-Typ ZHYQMIDI_DEFECT_ITEMS
Storage duration 10
Log. Target system <created logical system>
Segment name 1 Z2QMIFE000X000
SAP-QMIDI_30.docx Version: 1.0.22714 Page 52 of 53

HYDRA Interface to SAP QM using QM-IDI
8 Application-relevant customizing in SAP
Defining QM subsystem
In QM-IDI interface operations are only transferred if a subsystem is assigned to them. The assignment is
done at the work centre in SAP. Each work centre can be assigned to one subsystem only, whereas a
subsystem can be assigned to multiple work centers.
QM subsystems can be created in SAP using by IMG Quality Management  QM in Logistics  QM in
Procurement  Define QM Systems.
Defining origin of results data
In SAP QM it is possible to indicate the origin at the inspection result. For that, several origins can be
defined in the IMG. To enable HYDRA to support this field/information it is necessary to maintain the
value created in SAP in HYDRA as well.
Origin of results data can be created in SAP using IMG Quality Management  Quality Inspection 
Results Recording  Define Origins of Results Data
Defining detail level for error messages
When defining QM subsystems, the trace level can be defined. In the IDI interface, all error messages as
well as changes to the worklist are written to an application log.
The exceptions, messages of the QIERRTAB error log, and the beginning and end of a function are
recorded. In Customizing, you can define the level of detail for the application log. Use the RQEIFML1
report to display the application log. Use the RQEIFML2 report to delete the log.
Defining selected set / plant for usage decision
At the level of the inspection type it can be defined in SAP if a selected set shall be used and if only plant
specific catalogs can be used for the final usage decision.
The download of catalogs for the usage decision together with the inspection lot depends depends on the
selection options for the selected set and the plant.
In HYDRA these settings will be used to pre-select the available catalogs.
SAP-QMIDI_30.docx Version: 1.0.22714 Page 53 of 53