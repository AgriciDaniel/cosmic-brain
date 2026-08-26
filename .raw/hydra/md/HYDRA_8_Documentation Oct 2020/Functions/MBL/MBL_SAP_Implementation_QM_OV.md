Mapping the QM-IDI in HYDRA
1 Mapping the QM-IDI in HYDRA
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
MBL_SAP_Implementation_QM_OV.docx Version: 1.1.2579 Page 1 of 11

|     |     |     |     |     |     | Mapping the QM-IDI in HYDRA  |     |
| --- | --- | --- | --- | --- | --- | ---------------------------- | --- |

|     | Parameter name: |     |     | T L | D   | Description |     |
| --- | --------------- | --- | --- | --- | --- | ----------- | --- |
|     |                 |     |     |     |     |             |     |
I_IND_READ_WORK_CENTER  CHAR  1    Indicator: Read work center data,
Default = “X”
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

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 2 of 11

|     |     |     |     |     |     | Mapping the QM-IDI in HYDRA  |     |
| --- | --- | --- | --- | --- | --- | ---------------------------- | --- |

|        | Field  | T         | L                 |     | Description  |     |     |
| ------ | ------ | --------- | ----------------- | --- | ------------ | --- | --- |
| KUNNR  |        | CHAR  10  | Customer number   |     |              |     |     |

According to the selection option, the function module provides the inspection batch data, including
inspection batch header, operation and characteristics. The structures will be explained in detail in
chapter Error! Reference source not found. Error! Reference source not found., also pointing out the
meaning of the different fields.
Besides the inspection data, the function module also provides a table of error messages. These error
messages will be displayed in the MLE inbound transactions and in the protocol of the communication
program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management
(Prerequisite: license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.
The download of inspection batch data will be carried out by the hysapqmc.exe/out program.
Download catalog master data
The transfer of catalog master data from SAP to HYDRA will be carried out by using the function module
QIRF_SEND_CATALOG_DATA2. For that purpose, HYDRA transfers selection options to the function
module.  The  content  of  each  parameter  can  be  configured  in  HYDRA  in  customizing  table
SAP_FM_PARAM_CFG.
|     | Parameter name: |     |     | T L      | D                                  | Description |     |
| --- | --------------- | --- | --- | -------- | ---------------------------------- | ----------- | --- |
|     |                 |     |     |          |                                    |             |     |
|     |                 |     |     | CHAR  1  |   Indicator: Choose selected set,  |             |     |
I_IND_CATALOG_IS_SEL_SET
Default = ” ”
I_IND_CATALOG_IS_CODEGROUP  CHAR  1    Indicator: Choose code groups
Default = “ ”
| I_IND_CATALOG_TYPE  |     |     |     | CHAR  3  |   Catalog type  |     |     |
| ------------------- | --- | --- | --- | -------- | --------------- | --- | --- |
Default = ”3”
Plant of selected set
| I_IND_PLANT_OF_SELECTED_SET  |     |     |     | CHAR  4  |     |     |     |
| ---------------------------- | --- | --- | --- | -------- | --- | --- | --- |
Default = ”0001”
I_IND_CATALOG  CHAR  4    Catalog (selected set or code group)
Language
| I_IND_LANGUAGE  |     |     |     | CHAR  2  |     |     |     |
| --------------- | --- | --- | --- | -------- | --- | --- | --- |
Default = ”D”

Besides the catalog data, the function module also provides a table of error messages. These error
messages will be displayed in the MLE inbound transactions, the protocol of the communication program.
Additionally, those entries are also forwarded to the  HYDRA Escalation Management (Prerequisite:
license SIS-ESK and SAP-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.
The download of catalog master data will be carried out by the hysapqmc.exe/out program.

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 3 of 11

|     |     |     |     |     | Mapping the QM-IDI in HYDRA  |     |
| --- | --- | --- | --- | --- | ---------------------------- | --- |

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
|          | Parameter name: |     | T L     | D         | Description |     |
| -------- | --------------- | --- | ------- | --------- | ----------- | --- |
|          |                 |     |         |           |             |     |
| INSPLOT  |                 |     | -  -    | No usage  |             |     |

| INSPOPER        |     |     | CHAR  4    |                        |     |     |
| --------------- | --- | --- | ---------- | ---------------------- | --- | --- |
| INSPPOINT_FROM  |     |     | NUMC  6    | Inspection point from  |     |     |
Default = “000001”
| INSPPOINT_TO  |     |     | NUMC  6    | Inspection point to  |     |     |
| ------------- | --- | --- | ---------- | -------------------- | --- | --- |
Default = “999999”
| I_SUBSYS  |     |     | CHAR  6    | Subsystem confirms results  |     |     |
| --------- | --- | --- | ---------- | --------------------------- | --- | --- |
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

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 4 of 11

Mapping the QM-IDI in HYDRA
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
MBL_SAP_Implementation_QM_OV.docx Version: 1.1.2579 Page 5 of 11

Mapping the QM-IDI in HYDRA
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
MBL_SAP_Implementation_QM_OV.docx Version: 1.1.2579 Page 6 of 11

Mapping the QM-IDI in HYDRA
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
MBL_SAP_Implementation_QM_OV.docx Version: 1.1.2579 Page 7 of 11

Mapping the QM-IDI in HYDRA
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
MBL_SAP_Implementation_QM_OV.docx Version: 1.1.2579 Page 8 of 11

|     |     |     |     |     | Mapping the QM-IDI in HYDRA  |
| --- | --- | --- | --- | --- | ---------------------------- |

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
|            | Field  | Type  | L  Description                     |     | Usage / Origins  |
| ---------- | ------ | ----- | ---------------------------------- | --- | ---------------- |
| SATZART    |        | CHAR  | 3  Record type to request record   |     | Fix „Q40“        |
| LOSNR_VON  |        | NUMC  | 12 From inspection batch number    |     | Not used         |
|            |        | NUMC  | 12 To inspection batch number      |     | Not used         |
LOSNR_BIS
| PLNFL      |     | CHAR  | 6  Operation sequence in task list   |     | Not used  |
| ---------- | --- | ----- | ------------------------------------ | --- | --------- |
| VORNR_VON  |     | CHAR  | 4  From operation number             |     | Not used  |
| VORNR_BIS  |     | CHAR  | 4  To operation number               |     | Not used  |
VORGWERK  CHAR  4  Plant of operation to be processed  E2BP_PP_PDC_OPERA2000.
PLANT
SUBSYS  CHAR  6  Identifier of the subsystem   Customizing table in HYDRA
| PRPLATZ     |     | CHAR  | 8  Work center             |     | Not used               |
| ----------- | --- | ----- | -------------------------- | --- | ---------------------- |
|             |     | CHAR  | 4                          |     | Not used               |
| PRPLATZWRK  |     |       | Plant of the work center   |     |                        |
| MATNR       |     | CHAR  | 18 Material number         |     | E2BP_PP_PDC_OPERA2000. |
MATERIAL
|            |     | DATE  | 8                                 |     | Not used  |
| ---------- | --- | ----- | --------------------------------- | --- | --------- |
| DATUM_VON  |     |       | From creation date of inspection  |     |           |
batch
DATUM_BIS  DATE  8  To creation date of inspection  Not used
batch
|            |     | CHAR  | 1                          |     | Not used  |
| ---------- | --- | ----- | -------------------------- | --- | --------- |
| PRUEFSTAT  |     |       | Status of the inspection   |     |           |
| ART        |     | CHAR  | 8  Inspection type         |     | Not used  |
HERKUNFT  CHAR  2  Origin of the inspection batch   Not used
| CHARG  |     | CHAR  | 10 Batch number   |     | Not used  |
| ------ | --- | ----- | ----------------- | --- | --------- |
AUFNR_VON  CHAR  12 From order number   E2BP_PP_PDC_OPERA2000.
ORDERID
| AUFNR_BIS  |     | CHAR  | 12 To order number   |     | E2BP_PP_PDC_OPERA2000. |
| ---------- | --- | ----- | -------------------- | --- | ---------------------- |
ORDERID
| LIFNR  |     | CHAR  | 10 Vendor number   |     | Not used  |
| ------ | --- | ----- | ------------------ | --- | --------- |

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 9 of 11

|     |     |     |     | Mapping the QM-IDI in HYDRA  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

| KUNNR  |     | CHAR  10 Customer number   |     | Not used  |     |
| ------ | --- | -------------------------- | --- | --------- | --- |

As a result of the download of the inspection specification the original PP-PDC IDoc and the newly
transferred QM-IDI data are pooled into a new IDoc of the following characteristics:
| Message type / IDoc type:  |     | PPCC2RECORDER_QM_IDI   |     |     |     |
| -------------------------- | --- | ---------------------- | --- | --- | --- |
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     |     | E2BP _PP_PDC_OPERA2000 (PP operations)               |     |          | 1-n  |
| --- | --- | ---------------------------------------------------- | --- | -------- | ---- |
|     |     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)   |     |          | 0-n  |
|     |     | Z2QIAVC000X000 (Inspection batches and operations)   |     |          | 1-n  |
|     |     | Z2QAIMV000X000 (inspection characteristics)          |     |          | 1-n  |
|     |     | Z2QAICA000X000 (catalogs)                            |     |          | 1-n  |
|     |     | Z2QIERR000X000 (error logs)                          |     |     1-n  |      |

Prerequisite:
  HYDRA license SAP-PPPDC
Integration with SAP PP-PDC and HYINFO
The integration of QM-IDI with PP-PDC can also be extended when using HYDRA interface extension for
PP-PDC HYINFO. The interface extension HYINFO also uses sRFC calls to receive additional data from
SAP such as order header data or the list of components.
In this case, the original PP-PDC will be used first to collect additional data within SAP from the interface
extension. As a result the interface extension pools the original order data from PP-PDC interface and the
newly selected additional data into a new IDoc of the following characteristics:
| Message type / IDoc type:  |     | PPCC2HYINFOORDER   |     |     |     |
| -------------------------- | --- | ------------------ | --- | --- | --- |
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     |     | E2BP _PP_PDC_OPERA2000 (PP operations)                  |     |     | 1-n  |
| --- | --- | ------------------------------------------------------- | --- | --- | ---- |
|     |     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)      |     |     | 0-n  |
|     |     | HYINFO_xxx (additional data from interface extension)   |     |     | 1-n  |

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 10 of 11

|     |     |     | Mapping the QM-IDI in HYDRA  |     |
| --- | --- | --- | ---------------------------- | --- |

This new IDoc is the basement to collect inspection specifications in SAP QM. For that, the original PP-
PDC data will be used to derive the production orders to request the specifications for. For that the same
data / fields will be used as described above. As a result a new IDoc will be created by pooling as much
the original PP-PDC data, the data from interface extension HYINFO as the QM-IDI data with the
following characteristics:
Message type / IDoc type:  PPCC2HYINFOORDER_QM_IDI
Segments:  E2PPCC2RECORDER (Indicator initial download)      1
|     | E2BP _PP_PDC_OPERA2000 (PP operations)                  |     |        | 1-n  |
| --- | ------------------------------------------------------- | --- | ------ | ---- |
|     | E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)      |     |        | 0-n  |
|     | HYINFO_xxx (additional data from interface extension)   |     |        | 1-n  |
|     | Z2QIAVC000X000 (Inspection batches and operations)      |     |        | 1-n  |
|     | Z2QAIMV000X000 (inspection characteristics)             |     |        | 1-n  |
|     | Z2QAICA000X000 (catalogs)                               |     |        | 1-n  |
|     | Z2QIERR000X000 (error logs)                             |     |   1-n  |      |

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
Message type / IDoc type:  ZQM_IDI
Segments:  Z2QIAVC000X000 (Inspection batches and operations)   1-n
|     | Z2QAIMV000X000 (inspection characteristics)  |     |        | 1-n  |
| --- | -------------------------------------------- | --- | ------ | ---- |
|     | Z2QAICA000X000 (catalogs)                    |     |        | 1-n  |
|     | Z2QIERR000X000 (error logs)                  |     |   1-n  |      |

MBL_SAP_Implementation_QM_OV.docx  Version: 1.1.2579  Page 11 of 11