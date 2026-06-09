Interface QM-IDI

1

Interface QM-IDI

1

Introduction

QM-IDI is an interface designed for exchanging inspection processing data between the QM application

component and external systems. Inspection specifications defined in the QM component are transferred

to the external system. The external system independently carries out the inspection and transfers the re-

sults back to QM.

The interface is implemented using synchronous Remote Function Calls (sRFC), whereby all communica-

tion is started from HYDRA. The documentation at hand describes the processing of data exchange be-

tween SAP R/3 QM and HYDRA and the different types of integration with other SAP standard interface

such as PP-PDC.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 1 von 49

Interface QM-IDI

2  SAP interface technologies

2.1  RFC (Remote function call)

The remote function call is the basis technology for the system-wide call of programs in R/3 or its partner

systems. RFC is triggered by the client and transmitted to the server of the partner system. There are the

following variants:

Synchronous  RFC  (sRFC),  the  calling  program  waits  until  the  function  module  that  was  called  is  pro-

cessed and the results are transmitted.

Asynchronous RFC (aRFC), it is established whether the system being called is available, but execution

of the function is not awaited.

Transactional RFC (tRFC), the system which is called guarantees execution of all function modules, or

in case of error, to change nothing. tRFC also runs asynchronously.

PP-PDC only uses this type of remote function call.

2.2  BAPI (Business application programming interface)

Under  the  term  BAPI,  SAP  provides  a  range  of  ready-made  interfaces,  which  give  partner  systems  ac-

cess to the functionality of the R/3 system. (Communication is technically based on RFC.)

BAPIs enable the integration of systems on a business level!

2.3  ALE (Application link enabling)

ALE  is  a  technology  which  is  used  for  the  assembly  and  operation  of  distributed  applications  (R/3,  R/2

and  third-party  systems).  ALE  offers  a  controlled  exchange  of  business  messages  and  data  and  con-

sistent data management for loosely coupled (asynchronous) systems.

2.4  IDoc (Intermediate document)

In the SAP environment IDocs are containers for data exchange between systems. IDocs can either be

flat or they can form multi-level hierarchies.

Every IDoc comprises the following components:

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 2 von 49

Control record, contains information on IDoc type, headers, sender and receiver
Data record, the actual data is found here as the segments of a flat ASCII file.
Status record, contains information on the status of the IDOC, e.g. error messages.

Interface QM-IDI

Kernel:

innermost layer which contains business object data

and structure

Integrity layer:

contains the business logic of the business object

Interface layer:

enables communication with distributed systems

Access layer:

defines the technologies allowed to access the ob-

ject data, e.g. tRFC

Figure: Layer model of SAP business objects (from SAP online help)

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 3 von 49

Interface QM-IDI

3  Mapping the QM-IDI in HYDRA

3.1  Features of the QM-IDI

In the context of a connection via the QM-IDI interface, it is the task of HYDRA to receive inspection pro-

cessing data and to integrate them into the HYDRA process. In addition to that, HYDRA creates the ap-

propriate  data  from  recorded  confirmations  and  transfers  these  to  R/3.  Both  scenarios  are  initiated  by

HYDRA.

3.2  R/3  HYDRA – movement and master data

3.2.1 Download of inspection data

The transfer of inspection batch data from SAP to HYDRA will be carried out using the function module

QIRF_SEND_REQUIRMENTS_GET_DAT2. For that purpose, HYDRA transfers selection options to the

function module. Those options are transferred using the structure QAILS. Additionally, the function mod-

ule offers the possibility to control the download in detail. The content of each parameter can be config-

ured in HYDRA in a customizing table (please see chapter  6.2 Configuring function module parameters

for more details).

Parameter name:

T  L  D

Description

I_IND_SORT_ASCENDING_TO_DATE

CHAR  1

I_IND_SORT_DESCENDING_TO_DATE

CHAR  1

I_IND_MULTI_TRANSFER_POSSIBLE

CHAR  1

I_IND_EVALUATE_CHARACTERISTIC

CHAR  1

I_IND_SET_BLOCK_INDICATORS

CHAR  1

I_IND_ONLY_OBLIGATORY_CHARACT

CHAR  1

Indicator: Sort operations in ascending or-
der according to creation date
Default = “X”

Indicator: Sort operations in descending or-
der according to creation date
Default= “ “

Indicator: Correction transfers of operations
possible,
Default = “ ”

Indicator: Transfer valuation specifications
for characteristics,
Default = “X”

Indicator: Set lock entries in QM,
Default = “X”

Indicator: Only transfer required character-
istics,
Default = “ “

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 4 von 49

Interface QM-IDI

Parameter name:

T  L  D

Description

I_IND_TRANSFER_CHAR_CODES

CHAR  1

I_IND_READ_WORK_CENTER

CHAR  1

I_IND_READ_VENDOR_AND_PRODUCER

CHAR  1

I_IND_READ_PURCHASING_INFO

I_IND_READ_SALES_INFO

I_IND_SEND_PROTOCOL_MAIL

I_IND_TRANSFER_USAGE_DEC_CODES

Indicator: Transfer catalog data for inspec-
tion characteristics,
Default = “X”

Indicator: Read work center data,
Default = “X”

Indicator: Read vendor data,
Default = “X”

Indicator: Read data from purchasing in-
formation record,
Default = “X”

Indicator: Read data from sales information
record,
Default = “X”

Indicator: Send error log by mail
Default = “X”

Indicator: Transfer catalog data for usage
decision,
Default = “X”

The structure QAILS contains the selection options. The content depends on the business scenario and

will be described separately. It has the following structure:

Field

T

L

Description

SATZART

CHAR  3

Record type for request record

LOSNR_VON

NUMC  12  From inspection batch number

LOSNR_BIS

NUMC  12  To inspection batch number

PLNFL

CHAR  6  Operation sequence in task list

VORNR_VON

CHAR  4

From operation number

VORNR_BIS

CHAR  4

To operation number

VORGWERK

CHAR  4

Plant of operation to be processed

SUBSYS

PRPLATZ

CHAR  6

Identifier of the subsystem

CHAR  8  Work center

PRPLATZWRK

CHAR  4

Plant of the work center

MATNR

CHAR  18  Material number

DATUM_VON

DATE  8

From creation date of inspection batch

DATUM_BIS

DATE  8

To creation date of inspection batch

PRUEFSTAT

CHAR  1

Status of the inspection

ART

CHAR  8

Inspection type

HERKUNFT

CHAR  2  Origin of the inspection batch

CHARG

CHAR  10  Batch number

AUFNR_VON

CHAR  12  From order number

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 5 von 49

Interface QM-IDI

Field

T

L

Description

AUFNR_BIS

CHAR  12  To order number

LIFNR

KUNNR

CHAR  10  Vendor number

CHAR  10  Customer number

According  to  the  selection  option,  the  function  module  provides  the  inspection  batch  data,  including  in-

spection batch header, operation and characteristics. The structures will be explained in detail in chapter

4 Download of inspection specifications / master data, also pointing out the meaning of the different fields.

Besides  the  inspection  data,  the  function  module  also  provides  a  table  of  error  messages.  These  error

messages  will  be  displayed  in  the  MLE  inbound  transactions  and  in  the  protocol  of  the  communication

program. Additionally, those entries are also forwarded to the HYDRA Escalation Management (Prerequi-

site: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.

The download of inspection batch data will be carried out by the hysapqmc.exe/out program.

3.2.2 Download catalog master data

The transfer of catalog master data from SAP to HYDRA will be carried out by using the function module

QIRF_SEND_CATALOG_DATA2.  For  that  purpose,  HYDRA  transfers  selection  options  to  the  function

module. The content of each parameter can be configured in HYDRA in a customizing table (please see

chapter 6.2 Configuring function module parameters for more details).

Parameter name:

I_IND_CATALOG_IS_SEL_SET

T  L  D

CHAR  1

I_IND_CATALOG_IS_CODEGROUP

CHAR  1

I_IND_CATALOG_TYPE

CHAR  3

I_IND_PLANT_OF_SELECTED_SET

CHAR  4

I_IND_CATALOG

I_IND_LANGUAGE

CHAR  4

CHAR  2

Description
Indicator: Choose selected set,
Default = ” ”

Indicator: Choose code groups
Default = “ ”

Catalog type
Default = ”3”
Plant of selected set
Default = ”0001”
Catalog (selected set or code group)

Language
Default = ”D”

Besides the catalog data, the function module also provides a table of error messages. These error mes-

sages will be displayed in the MLE inbound transactions, the protocol of the communication program. Ad-

ditionally, those entries are also forwarded to the HYDRA Escalation Management (Prerequisite: license

HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.

The download of catalog master data will be carried out by the hysapqmc.exe/out program.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 6 von 49

Interface QM-IDI

3.2.3 Download inspection point data

The transfer of inspection point data from SAP to HYDRA will be carried out by using the function module

QIRF_INSPPOINT_GETLIST. For that purpose, HYDRA transfers selection options to the function mod-

ule. The content of each parameter can be configured in HYDRA in a customizing table (please see chap-

ter 6.2 Configuring function module parameters for more details).

Parameter name:

INSPLOT

INSPOPER

INSPPOINT_FROM

INSPPOINT_TO

I_SUBSYS

T  L  D
-

-

No usage

Description

CHAR  4

NUMC  6

NUMC  6

CHAR  6

Inspection point from
Default = “000001”

Inspection point to
Default = “999999”

Subsystem confirms results
Default = „QM0001“

Besides the inspection point data, the function module also provides a table of error messages. These er-

ror messages will be displayed in the MLE inbound transactions, the protocol of the  communication pro-

gram. Additionally, those entries are also forwarded to the HYDRA Escalation Management (Prerequisite:

license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_INBOUND_MSG.

The download of inspection point master data will be carried out by the hysapqmc.exe/out program.

3.3  HYDRA  R/3 – inspection results / inspection points

HYDRA  records  results  according  to  the  inspection  specifications.  Those  are  to  be  transferred  to  SAP

QM. For that purpose, SAP provides a set of function modules. According to the record type of the rec-

orded inspection results one or the other has to be used.

3.3.1 Upload for Single Results

The  QIRF_GET_ORIGINAL_VALUES2  function  module  has  to  be  used  to  upload  single  results  for  in-

spections. Besides the QAISE structure, which carries the actual inspection results, the function module

offers additional parameters that  allow controlling the  posting process in  SAP QM. The content of each

parameter can be configured in HYDRA in a customizing table (please see chapter 6.2 Configuring func-

tion module parameters for more details).

Parameter name:

T  L  D

Description

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 7 von 49

Interface QM-IDI

Parameter name:

T  L  D

Description

I_IND_EVALUATION_TRANSFER

CHAR  1

I_IND_CLOSE_PROCESSING

CHAR  1

I_SEND_PROTOCOL_MAIL

CHAR  1

I_SUBSYS

I_IND_POSTING_KZ

CHAR  6

CHAR  1

I_IND_PROC_COMMIT_WORK

CHAR  1

Indicator: Transfer valuations from subsys-
tem
Default = “X”

Indicator: Close samples or characteristics,
Default = “ ”

Indicator: Send error log by mail,
Default = “X”

Subsystem confirms results
Default = „QM0001“

Indicator: Call up program for updating re-
sults,
Default = “X”

Indicator.: Trigger commit work to data-
base,
Default = “X”

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These messages will be displayed in the MLE outbound transactions in the protocol of the communication

program. Additionally, those entries are also forwarded to the HYDRA Escalation Management (Prerequi-

site: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

3.3.2 Upload for Sample Results

The  QIRF_GET_SAMPLE_VALUES2  function  module  has  to  be  used  to  upload  sample  results  for  in-

spections. Besides the QAISR structure, which carries the actual inspection results, the function module

offers additional parameters that  allow controlling the  posting process in  SAP QM. The content of each

parameter can be configured in HYDRA in a customizing table (please see chapter 6.2 Configuring func-

tion module parameters for more details).

Parameter name:

T  L  D

Description

I_IND_EVALUATION_TRANSFER

CHAR  1

I_IND_CLOSE_PROCESSING

CHAR  1

I_SEND_PROTOCOL_MAIL

CHAR  1

I_SUBSYS

I_IND_POSTING_KZ

CHAR  6

CHAR  1

Indicator: Transfer valuations from subsys-
tem
Default = “X”

Indicator: Close samples or characteristics,
Default = “ ”

Indicator: Send error log by mail,
Default = “X”

Subsystem confirms results
Default = „QM0001“

Indicator: Call up program for updating re-
sults,
Default = “X”

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 8 von 49

Interface QM-IDI

Parameter name:

T  L  D

Description

I_IND_PROC_COMMIT_WORK

CHAR  1

Indicator.: Trigger commit work to data-
base,
Default = “X”

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These error messages will be displayed in the MLE outbound transactions in the protocol of the commu-

nication  program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management

(Prerequisite: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

3.3.3 Upload for Characteristic Results

The QIRF_GET_FEATURE_VALUES2 function module has to be used to upload characteristic results for

inspections. Besides the QAIMR structure, which carries the actual inspection results, the function mod-

ule  offers  additional  parameters  that  allow  controlling  the  posting  process  in  SAP  QM.  The  content  of

each parameter can be configured in HYDRA in a customizing table (please see chapter 6.2 Configuring

function module parameters for more details).

Parameter name:

T  L  D

Description

I_IND_EVALUATION_TRANSFER

CHAR  1

I_IND_CLOSE_PROCESSING

CHAR  1

I_SEND_PROTOCOL_MAIL

CHAR  1

I_SUBSYS

I_IND_POSTING_KZ

CHAR  6

CHAR  1

I_IND_PROC_COMMIT_WORK

CHAR  1

Indicator: Transfer valuations from subsys-
tem
Default = “X”

Indicator: Close samples or characteristics,
Default = “ ”

Indicator: Send error log by mail,
Default = “X”

Subsystem confirms results
Default = „QM0001“

Indicator: Call up program for updating re-
sults,
Default = “X”

Indicator.: Trigger commit work to data-
base,
Default = “X”

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These error messages will be displayed in the MLE outbound transactions in the protocol of the commu-

nication  program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management

(Prerequisite: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 9 von 49

Interface QM-IDI

3.3.4 Upload for Inspection Points

Creating and updating / deleting inspection points are done by using the QIRF_GET_INSP_POINT2 func-

tion  module.  Besides  the  QAIPP  structure,  which  carries  the  actual  inspection  point  data,  the  function

module offers additional parameters that allow controlling the posting process in SAP QM. The content of

each parameter can be configured in HYDRA in a customizing table (please see chapter 6.2 Configuring

function module parameters for more details).

Parameter name:

T  L  D

Description

I_SEND_PROTOCOL_MAIL

CHAR  1

Indicator: Send error log by mail,
Default = “X”

I_SUBSYS

CHAR  6

Subsystem confirms results
Default = „QM0001“

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These error messages will be displayed in the MLE outbound transactions in the protocol of the commu-

nication  program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management

(Prerequisite: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

3.3.5 Upload for Usage Decision

The usage decision is uploaded by using the QIRF_GET_USAGE_DECISION2 function module. Besides

the QAIVE structure, which carries the actual usage decision data, the function module offers additional

parameters that allow controlling the posting process in SAP QM. The content of each parameter can be

configured in HYDRA in a customizing table (please see chapter 6.2 Configuring function module param-

eters for more details).

Parameter name:

T  L  D

I_STOCK_POSTING

CHAR  1

I_SEND_PROTOCOL_MAIL

CHAR  1

Description
Indicator: Trigger inventory posting in
QM after usage decision
Default = “X”

Indicator: Send error log by mail,
Default = “X”

I_SUBSYS

CHAR  6

Subsystem confirms results
Default = „QM0001“

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These error messages will be displayed in the MLE outbound transactions in the protocol of the commu-

nication  program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management

(Prerequisite: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 10 von 49

Interface QM-IDI

3.3.6 Upload for Defect Items

The defect items are uploaded by using the QIRF_GET_DEFECT_ITEMS2 function module. Besides the

QMIFE structure, which carries the actual defect items data, the function module offers additional param-

eters that allow controlling the posting process in SAP QM. The content of each parameter can be config-

ured in HYDRA in a customizing table (please see chapter  6.2 Configuring function module parameters

for more details).

Parameter name:

T  L  D

Description

I_SEND_PROTOCOL_MAIL

CHAR  1

Indicator: Send error log by mail,
Default = “X”

I_SUBSYS

CHAR  6

Subsystem confirms results
Default = „QM0001“

As a result of the posting process in SAP QM, the function module provides a table of error messages.

These error messages will be displayed in the MLE outbound transactions in the protocol of the commu-

nication  program.  Additionally,  those  entries  are  also  forwarded  to  the  HYDRA  Escalation  Management

(Prerequisite: license HYD-ESK and HKM-ESK) with escalation SAP.QM_IDI_OUTBOUND_MSG.

3.4  Supported integration scenarios

Each function module provided on the SAP side expects specific import parameters, structures or tables.

Depending  on  the  function  module,  the  data  in  these  ones  are  derived  either  from  configuration  in

HYDRA or from integration with other interfaces. The implementation of the QM-IDI in HYDRA serves the

following processes and scenarios:



Integration with SAP standard interface PP-PDC



Integration with SAP standard interface PP-PDC and HYDRA interface extension HYINFO

  Stand-alone CAQ (e.g. for goods receipt)

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 11 von 49

Interface QM-IDI

3.4.1 Integration with SAP standard interface PP-PDC

The integration between QM-IDI and PP-PDC interface serves the requirements of increased in process

control during production process. For that reason the routing in SAP not only contains productive opera-

tion  (transferred  via  PP-PDC  interface)  but  also  QM  operations  that  itself  contain  characteristics  and

which are transferred using QM-IDI interface. It is also possible that an operation is transferred via both

interfaces.

The  download  process  is  started  by  releasing  the  production  order  in  SAP.  That  causes  a  download  of

the production order and its operations via PP-PDC interface. The data will be received in HYDRA in the

MES Link Enabling layer for further processing. Instead of performing the posting into the HYDRA appli-

cation tables, the data is used to receive the inspection data. For that specific data of the PP-PDC IDoc

E2BP-PP-PDC-OPERA2000 is taken and transferred into the QM-IDI QAILS structure to request the in-

spection batch for each order. The following table indicates which fields of the PP-PDC IDoc are used to

request inspection specifications:

Field

SATZART

LOSNR_VON

LOSNR_BIS

PLNFL

VORNR_VON

VORNR_BIS

VORGWERK

SUBSYS

PRPLATZ

Type  L
CHAR

Description

Usage / Origins

3  Record type to request record

Fix „Q40“

NUMC  12  From inspection batch number

Not used

NUMC  12  To inspection batch number

Not used

CHAR

6  Operation sequence in task list   Not used

CHAR

4  From operation number

CHAR

4  To operation number

Not used

Not used

CHAR

4  Plant of operation to be processed  E2BP_PP_PDC_OPERA2000.

PLANT

CHAR

6  Identifier of the subsystem

Customizing table in HYDRA

CHAR

8  Work center

PRPLATZWRK

CHAR

4  Plant of the work center

MATNR

CHAR  18  Material number

Not used

Not used

E2BP_PP_PDC_OPERA2000.
MATERIAL

DATUM_VON

DATE

8  From creation date of inspection

Not used

batch

DATUM_BIS

DATE

8  To creation date of inspection

Not used

batch

PRUEFSTAT

CHAR

1  Status of the inspection

ART

HERKUNFT

CHARG

CHAR

8  Inspection type

CHAR

2  Origin of the inspection batch

Not used

CHAR  10  Batch number

Not used

Not used

Not used

AUFNR_VON

CHAR  12  From order number

AUFNR_BIS

CHAR  12  To order number

E2BP_PP_PDC_OPERA2000.
ORDERID

E2BP_PP_PDC_OPERA2000.
ORDERID

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 12 von 49

Interface QM-IDI

LIFNR

KUNNR

CHAR  10  Vendor number

CHAR  10  Customer number

Not used

Not used

As a result of the download of the inspection specification the original PP-PDC IDoc and the newly trans-

ferred QM-IDI data are pooled into a new IDoc of the following characteristics:

Message type / IDoc type:  PPCC2RECORDER_QM_IDI

Segments:

E2PPCC2RECORDER (Indicator initial download)

E2BP _PP_PDC_OPERA2000 (PP operations)

E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)

Z2QIAVC000X000 (Inspection batches and operations)

Z2QAIMV000X000 (inspection characteristics)

Z2QAICA000X000 (catalogs)

Z2QIERR000X000 (error logs)

1-n

1

1-n

0-n

1-n

1-n

1-n

Prerequisite:

  HYDRA license HKMPP-PDC

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 13 von 49

Interface QM-IDI

3.4.2 Integration with SAP PP-PDC and HYINFO

The integration of QM-IDI with PP-PDC can also be extended when using HYDRA interface extension for

PP-PDC HYINFO. The interface extension HYINFO also uses sRFC calls to receive additional data from

SAP such as order header data or the list of components.

In this case, the original PP-PDC will be used first to collect additional data within SAP from the interface

extension. As a result the interface extension pools the original order data from PP-PDC interface and the

newly selected additional data into a new IDoc of the following characteristics:

Message type / IDoc type:  PPCC2HYINFOORDER

Segments:

E2PPCC2RECORDER (Indicator initial download)

E2BP _PP_PDC_OPERA2000 (PP operations)

E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)

HYINFO_xxx (additional data from interface extension)

1

1-n

0-n

1-n

This new IDoc is the basement to collect inspection specifications in SAP QM. For that, the original PP-

PDC data will be used to derive the production orders to request the specifications for. For that the same

data / fields will be used as described in chapter  3.4.1 Integration with SAP standard interface PP-PDC.

As a result a new IDoc will be created by pooling as much the original PP-PDC data, the data from inter-

face extension HYINFO as the QM-IDI data with the following characteristics:

Message type / IDoc type:  PPCC2HYINFOORDER_QM_IDI

Segments:

E2PPCC2RECORDER (Indicator initial download)

E2BP _PP_PDC_OPERA2000 (PP operations)

E2BP_PP_PDC_OPERA1000 (Deletion of PP operations.)

HYINFO_xxx (additional data from interface extension)

Z2QIAVC000X000 (Inspection batches and operations)

Z2QAIMV000X000 (inspection characteristics)

Z2QAICA000X000 (catalogs)

Z2QIERR000X000 (error logs)

1-n

1

1-n

0-n

1-n

1-n

1-n

1-n

3.4.3 Stand-alone CAQ

The stand-alone variant is thought to support inspections that are not related to production orders, such

as goods receipt inspections. It can be used independently or in combination with the two integration sce-

narios described in the previous chapters.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 14 von 49

Interface QM-IDI

In order to be able to request the inspection batches for those inspections, there is a customizing table in

HYDRA that allows defining different selection options. To support different kinds of selection options it is

possible to configure multiple variants. The details  of the customizing table are described in chapter  6.1

Configuring variants for Stand-alone CAQ.

The  request  of  inspection  batch  will  be  performed  on  a  cyclic  base.  For  the  calling  program

hysapqmc.exe/out has to be configured in the HYDRA Scheduler.

As a result of the receipt of inspection batches an IDoc will be created with the following characteristics:

Message type / IDoc type:  ZQM_IDI

Segments:

Z2QIAVC000X000 (Inspection batches and operations)

Z2QAIMV000X000 (inspection characteristics)

Z2QAICA000X000 (catalogs)

Z2QIERR000X000 (error logs)

1-n

1-n

1-n

1-n

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 15 von 49

Interface QM-IDI

4  Download of inspection specifications / master data

The processing of all other segments in the integration scenario with PP-PDC and / or HYINFO interface

extension  are  described  in  their  respective  interface  documentations  (HKMPP-PDC.pdf  or  HKMPP-

INF.pdf). In this chapter the QM-IDI processing is described only.

4.1  Inspection batch / operations in “Z2QAIVC000X000” struc-

ture

Field name:

T  L  D

VORNR

CHAR  4

Operation number

CHAR  3

Description
Record type for header record

Use in HYDRA

Not used

NUMC  12

Number of the inspection batch

Number of the inspection batch

CHAR  6

Operation sequence in task list

In accordance with configuration
(*1)

In accordance with configuration
(*1)
Display in HYDRA client (*2)

CHAR  4

CHAR  8

CHAR  2

DATE  8

Plant of the inspection batch

Plant of the inspection batch

Inspection type

Inspection type

Origin of the inspection batch

Origin of the inspection batch

Creation date of the inspection batch   Creation date of the inspection

batch

CHAR  12

User who created the data record

User who created the data record

CHAR  12

User who changed the data record

User who changed the data record

DATE  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  4

CHAR  8

Change date of the data record

Change date of the data record

Ind.: make usage decision in subsys-
tem

“X”

“ “

Usage decision will be
made in HYDRA
Usage decision will be
made in SAP

Catalog type for usage decision

Catalog type for usage decision

Plant of selected set for usage dec.

Plant of selected set for usage
dec.

Selected set for usage decision

Selected set for usage decision

Catalog type for inspection point valua-
tion

Catalog type for inspection point
valuation

Plant of the selected set for the inspec-
tion point valuation

Plant of the selected set for the in-
spection point valuation

Selected set for the inspection point
valuation

Selected set for the inspection
point valuation

Code group proposal when inspection
point is accepted (acceptance of all
characteristics)

Code group proposal when inspec-
tion point is accepted (acceptance
of all characteristics)

Code proposal when inspection point
is accepted

Code proposal when inspection
point is accepted

Code group proposal when inspection
point is rejected (rejection of one char-
acteristic at least)

Code group proposal when inspec-
tion point is rejected (rejection of
one characteristic at least)

SATZART

PRUEFLOS

PLNFL

WERK

ART

HERKUNFT

ENTSTEHDAT

ERSTELLER

AENDERER

AENDERDAT

KZVESUBSYS

VKATART

VWERKS

VAUSWAHLMG

PPVEKATART

PPVEWERK

PPVEMENGE

PPVECODGRA

CHAR  4

PPVECODEA

CHAR  4

PPVECODGRR

CHAR  4

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 16 von 49

Field name:

T  L  D

Interface QM-IDI

Description
Code proposal when inspection point
is rejected

Use in HYDRA
Code proposal when inspection
point is rejected

Task list type

Task list type

Key of task list group

Key of task list group

Task list usage

Task list usage

Task list group counter

Task list group counter

Version counter for task list

Version counter for task list

CHAR  4

CHAR  1

CHAR  8

CHAR  3

CHAR  2

NUMC  8

CHAR  40

Short text of the task list

Short text of the task list

DATE  8

DATE  8

DATE  8

Start of validity for task list header

Start of validity for task list header

Start date of the inspection

Start date of the inspection

Finish date of the inspection

Finish date of the inspection

CHAR  10

Customer number

Customer number

CHAR  35

Name 1 of the customer

Name 1 of the customer

CHAR  10

Vendor number

Vendor number

CHAR  35

Name 1 of the vendor

Name 1 of the vendor

PPVECODER

PLNTY

PLNNR

PPLVERW

PLNAL

ZAEHL

PLANKTEXT

DATUV

PASTRTERM

PAENDTERM

KUNNR

NAME1KUN

LIFNR

NAME1LIF

HERSTELLER

CHAR  10

Number of the manufacturer

Number of the manufacturer

NAME1HER

MATNR

KTEXTMAT

KTEXTLOS

CHARG

CHAR  35

Name 1 of the manufacturer

Name 1 of the manufacturer

CHAR  18

Material number

Material number

CHAR  40

Short text of the material

Short text of the material

CHAR  40

Short text of the inspection batch

Short text of the inspection batch

CHAR  10

Batch number

Batch number

LAGORTCHRG

CHAR  4

Storage location of the batch

Storage location of the batch

LICHN

IDNLF

KDMAT

POSTX

WERKVORG

LAGORTVORG

LOSMENGE

MENGENEINH

GESSTICHPR

EINHPROBE

EBELN

EBELP

MJAHR

MBLNR

ZEILE

BUDAT

AUFNR

KDAUF

KDPOS

VORKTXT

PRPLATZ

PRPLATZWRK

PRPLATZTXT

SUBSYS

CHAR  15

Batch number used by vendor

Batch number used by vendor

CHAR  35

Material number used by vendor

Material number used by vendor

CHAR  35

Material number used by customer

Material number used by customer

CHAR  40

Mat. short text used by customer

Mat. short text used by customer

CHAR  4

CHAR  4

Plant of the goods movement

Plant of the goods movement

Storage location for the goods move-
ment

Storage location for the goods
movement

CHAR  17

Inspection batch quantity

Inspection batch quantity

CHAR  3

Base unit of measure of the inspection
batch

Base unit of measure of the in-
spection batch

CHAR  17

Sample size for inspection batch

Sample size for inspection batch

CHAR  3

Unit of measure for sample

Unit of measure for sample

CHAR  10

Purchasing document number

Purchasing document number

NUMC  5

NUMC  4

Item no. of purchasing document

Item no. of purchasing document

Year of the material document

Year of the material document

CHAR  10

Number of the material document

Number of the material document

NUMC  4

DATE  8

Item in material document

Item in material document

Posting date in document

Posting date in document

CHAR  12

Order number

Order number

CHAR  10

Customer order number

Customer order number

NUMC  6

Item number in sales order

Item number in sales order

CHAR  40

Short text for operation

Short text for operation

CHAR  8

CHAR  4

Work center

HYDRA Machine / Work center

Plant of the target work center

Plant of the target work center

CHAR  40

Short text of the work center

Short text of the work center

CHAR  6

Identifier of the subsystem

Identifier of the subsystem

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 17 von 49

Interface QM-IDI

Field name:

T  L  D

Description

QKZPRZEIT

CHAR  1

Ind.: work cycle = time

QKZPRMENG

CHAR  1

Ind.: work cycle = quantity

Use in HYDRA
Inspection point based
on time intervals

Inspection point based
on quantity intervals

“X”

“X”

QKZPRFREI

QRASTZEHT

CHAR  1

CHAR  3

Ind.: any work cycle

“X”

Free inspection points

Time unit of inspection grid

Supported units:
 seconds
„S“
„SEC“   seconds
„MIN“   minutes
 hours
„H“
„HUR“   hours
„STD“   hours

QRASTZFAK

QRASTMENG

QRASTEREH

NUMC  6

Time factor for inspection grid

Value for the time interval

CHAR  17

Quantity between two inspections

Value for the quantity interval

CHAR  3

Unit of measure of the insp. grid

PPKTTYP

CHAR  1

Inspection point type

KZEQUNR

CHAR  1

Indicator: user field EQUNR active

SWEQUNR

KZTPLNR

SWTPLNR

KZPHYNR

SWPHYNR

KZUSERC1

CHAR  20

Key word for user field EQUNR

CHAR  1

Indicator: user field TPLNR active

CHAR  20

Key word for user field TPLNR

CHAR  1

Indicator: user field PHYNR active

CHAR  20

Key word for user field PHYNR

CHAR  1

Indicator: user field USERC1 active

SWUSERC1

CHAR  20

Key word for user field USERC1

KZUSERC2

CHAR  1

Indicator: user field USERC2 active

SWUSERC2

CHAR  20

Key word for user field USERC2

KZUSERN1

CHAR  1

Indicator: user field USERN1 active

SWUSERN1

CHAR  20

Key word for user field USERN1

KZUSERN2

CHAR  1

Indicator: user field USERN2 active

SWUSERN2

CHAR  20

Key word for user field USERN2

KZUSERD1

CHAR  1

Indicator: user field USERD1 active

Unit of measure for the quantity in-
terval

Type of inspection point
“ “
“1”
“2”
“3”

IP for IPC
IP for equipment
IP functional location
IP for physical sample

“X”
“ “

“X”
“ “

“X”
“ “

“ “
“X”
“1”

Field is active
Field is not active

Field is active
Field is not active

Field is active
Field is not active

Field is not active
Optional field
Obligatory field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 18 von 49

Field name:

T  L  D

Description

SWUSERD1

CHAR  20

Key word for user field USERD1

KZUSERT1

CHAR  1

Indicator: user field USERT1 active

SWUSERT1

CHAR  20

Key word for user field USERT1

TEILLOSPFL

CHAR  1

Indicator: assignment of partial batch
to an inspection point required

Interface QM-IDI

Use in HYDRA
Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“X”
tion
“ “

Partial batch confirma-

No partial batch
confirmation

CHARGPFL

CHAR  1

Indicator: batch management required   “X”
“ “

Batch managed
No batch management

QUANTITIES

CHAR  1

Confirmation of quantity required

EVALUATION

CHAR  1

Confirmation of a valuation required,
else confirmation by QM

“X”

“ “

“X”

“ “

Confirmation of quantity
required
Confirmation of quantity
not required

Confirmation of
evaluation required
Confirmation of
evaluation not required

KOSTL

KZKORRTRAN

PRUEFSTAT

CHAR  10

Cost center

Cost center

CHAR  1

CHAR  1

Ind.: Correction transmission

Ind.: Correction transmission

Status of the inspection

Entries correspond with status of
inspection requirements:
“A”
“B”
“C”
“D”
“E”
“F”
In case PRUEFSTAT = “E”, addi-
tionally the skip lot flag is set to “1”,
else to “0”

 FRE
 ABG
 STO
 UNT
 SKL
 GES

EINHVORG

RUECKMPP

CHAR  3

CHAR  1

Unit of measure for operation

Indicator: confirmation of inspection
point required. This field is currently
not supported.

Not used

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 19 von 49

Interface QM-IDI

4.2  Characteristics in “Z2QAIMV000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

SATZART

RUECKMELNR

CHAR  3

Record type

Not used

NUMC  8

Confirmation  number
characteristic

for

inspection

Confirmation number

ERFASSART

CHAR  1

Recording type for insp. charact.

“A”
gle unit
“B”
“C”

“D”

“E”
“F”
“G”

“H”
“I”

KZBEWSUBSY

CHAR  1

Ind.: valuation by subsystem

BEWART

CHAR  1

Valuation type for insp. charact.

“L”

“M”

“N”

“O”

“P”

“Q”

“R”

“X”
“ “

“A”

“B”

“C”

“D”

“E”
“F”

erance limits
“G”

“H”

Valuation at sample
level
Valuation according to
control chart

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 20 von 49

“J”
gle unit in a sample
“K”

Measured value for  sin-

for

value

Code for single unit
Valuation  for  single  unit
(OK/not OK)
Measured
sample
Code for sample
Valuation of a sample
Measured  value
characteristic
Code for a characteristic
a
Valuation
characteristic
Measured value for  sin-

for  a

of

value

Code  for  single  unit  in  a
sample
Valuation  for  single  unit
in a sample
Measured
for
sample  of  an  inspection
point
Code  for  single  unit  of
an inspection point
Valuation  for  single  unit
of an inspection point
for
Measured
sample  of  an  inspection
point
Code  for  sample  of  an
inspection point
Valuation for sample of
an inspection point

value

Valuation in HYDRA
Valuation in SAP

Valuation by number of
non-conforming units (N-
C relation)
Valuation by number of
defects (N-C relation)
Valuation according to s
method (ISO3951)
Valuation according to
code
Manual valuation
Valuation based on the
mean value within   tol-

Field name:

T  L  D

Description

KZRZWANG

CHAR  1

Results recording required

Interface QM-IDI

Use in HYDRA
Inspection for
characteristic is optional
Inspection required if
result for preceding  re-

" "

“+”

quired characteristic

“-“

is OK
Inspection required if
result for preceding  re-

quired characteristic
is not OK
Inspection for
characteristic is required

“X”

STATUSV

STATUSR

KZPRUMF

CHAR  1

CHAR  1

CHAR  1

Ind.: inspection scope

Not used

Not used

“=”

“<”

Specified scope of insp.
must be adhered to
Scope of insp. may be
below specification
Specified scope of   in-

“>”
spection may be   exceeded
“ “

Scope of insp. may fall
below or exceed
specification

KZDOKU

CHAR  1

Documentation required

KZSERNR

CHAR  1

Ind.: record serial number

KZTSTICHPR

CHAR  1

Ind.: partial samples for charact.

KZRAST

CHAR  1

Ind.: inspection with insp. grid

Inspection description for

“ “
characteristic is optional
“.”
scription required in
of rejection
“+”

(dot) Inspection

Inspection description
required

de-
case

“ “

“X”

“ “

“X”

Serial  number  optional
with single values
Serial  number  required
with single values

Inspect  single  sample
for characteristic
Inspect  multiple  sample
for characteristic

procedure

Sampling

“ “
without inspection grid
“X”
inspection grid

Sampling procedure with

RASTER

NUMC  3

Inspection  frequency  within  inspection
grid

Inspection frequency within inspec-
tion grid

SOLLSTPANZ

CHAR  5

No. of partial samples planned

No. of partial samples planned

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 21 von 49

Field name:

T  L  D

BEWARTSP

CHAR  1

Description
Valuation type of partial sample

Interface QM-IDI

Use in HYDRA
Valuation by number of
non-conforming units (N-
C relation)
Valuation by number of
defects (N-C relation)
Valuation according to s
method (ISO3951)
Valuation according to
code
Manual valuation
Valuation based on the
with-
mean value

“A”

“B”

“C”

“D”

“E”
“F”

in tolerance limits
“G”

“H”

Valuation at sample
level
Valuation according to
control chart

NUMC  12

Number of the inspection batch

Number of the inspection batch

CHAR  6

Number of the task list sequence

In accordance with configuration
(*1)

In accordance with configuration
(*1)

PRUEFLOS

PLNFL

VORNR

CHAR  4

Operation number

MERKNR

QPMK_WERKS

VERWMERKM

MKVERSION

QMTB_WERKS

PMETHODE

PMTVERSION

PMTKURZTXT

PRUEFQUALI

MERKGEW

GEWKURZTXT

NUMC  4

CHAR  4

CHAR  8

CHAR  6

CHAR  4

CHAR  8

CHAR  6

Characteristic number

Characteristic number

Plant of master inspection charact.

Plant of master inspection charact.

Master inspection characteristic

Master inspection characteristic

Version of master insp. charact.

Version of master insp. charact.

Plant of the inspection method

Plant of the inspection method

Inspection method

Inspection method

Version of the inspection method

Version of the inspection method

CHAR  40

Short text of the inspection method

Short text of the inspection method

CHAR  5

CHAR  2

CHAR  40

Inspector qualification

Inspector qualification

Weighting of insp. characteristic

Weighting of insp. characteristic

Short  text  for  weighting  of  inspection
characteristic

Short  text  for  weighting  of  inspec-
tion characteristic

KURZTEXT

CHAR  40

Short text of the characteristic

Short text of the characteristic
(only for the native MDBI column)

FORMEL

DUMMY10

DUMMY20

DUMMY40

STELLEN

MASSEINHSW

SOLLWERT

TOLERANZOB

TOLERANZUN

PLAUSIOBEN

PLAUSIUNTE

GRENZEOB1

GRENZEUN1

GRENZEOB2

GRENZEUN2

CHAR  12
0

Formula for inspection charact.

Formula for inspection charact.

CHAR  10

Additional information 1

Customer / project specific usage

CHAR  20

Additional information 2

Customer / project specific usage

CHAR  40

Additional information 3

Customer / project specific usage

NUMC  2

CHAR  3

No. of digits after decimal point

No. of digits after decimal point

Unit of measure for insp. charact.

Unit of measure for insp. charact.

CHAR  16

Target value/nominal value

Target value/nominal value

CHAR  16

Upper tolerance limit

CHAR  16

Lower tolerance limit

CHAR  16

Upper plausibility limit

CHAR  16

Lower plausibility limit

Upper tolerance limit

Lower tolerance limit

Upper plausibility limit

Lower plausibility limit

CHAR  16

First upper limit value

Customer / project specific usage

CHAR  16

First lower limit value

Customer / project specific usage

CHAR  16

Second upper limit value

Customer / project specific usage

CHAR  16

Second lower limit value

Customer / project specific usage

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 22 von 49

Interface QM-IDI

Field name:

T  L  D

Description

KATAB1

CHAR  1

Ind.: catalog entry 1 is selected set

Use in HYDRA
catalog entry 1 is   se-

“X”
lected set
“ “

catalog entry 1 is not
selected set

KATALGART1

AUSWMGWRK1

AUSWMENGE1

KATAB2

KATALGART2

AUSWMGWRK2

AUSWMENGE2

KATAB3

KATALGART3

AUSWMGWRK3

AUSWMENGE3

KATAB4

KATALGART4

AUSWMGWRK4

AUSWMENGE4

KATAB5

KATALGART5

AUSWMGWRK5

AUSWMENGE5

SOLLSTPUMF

PROBEMGEH

PROBMGFAK

ANNAHME

RUECKWEZ

KFAKTOR

QRKNR

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

NUMC  7

CHAR  3

NUMC  6

NUMC  5

NUMC  5

Catalog type 1

Catalog type 1

Plant of selected set 1

Plant of selected set 1

Selected set / code group 1

Selected set / code group 1

Ind.: catalog entry 2 is selected set

catalog entry 2 is   se-

“X”
lected set
“ “

catalog entry 2 is not
selected set

Catalog type 2

Catalog type 2

Plant of selected set 2

Plant of selected set 2

Selected set / code group 2

Selected set / code group 2

Ind.: catalog entry 3 is selected set

catalog entry 3 is   se-

“X”
lected set
“ “

catalog entry 3 is not
selected set

Catalog type 3

Catalog type 3

Plant of selected set 3

Plant of selected set 3

Selected set / code group 3

Selected set / code group 3

Ind.: catalog entry 4 is selected set

catalog entry 4 is   se-

“X”
lected set
“ “

catalog entry 4 is not
selected set

Catalog type 4

Catalog type 4

Plant of selected set 4

Plant of selected set 4

Selected set / code group 4

Selected set / code group 4

Ind.: catalog entry 5 is selected set

catalog entry 5 is   se-

“X”
lected set
“ “

catalog entry 5 is not
selected set

Catalog type 5

Catalog type 5

Plant of selected set 5

Plant of selected set 5

Selected set / code group 5

Selected set / code group 5

Sample size to be checked per inspec-
tion characteristic

If SOLLSTPANZ > 0, then the
sample size is calculated through
the formula SOLLSTPUMF /
SLLSTPANZ

Unit of measure for sample

Unit of measure for sample

Factor for sample unit of measure

Factor for sample unit of measure

Acceptance  number  for  attributive  in-
spection

Acceptance  number  for  attributive
inspection

Rejection  number  for  attributive  in-
spection

Rejection number for attributive in-
spection

CHAR  16

K factor for variable inspection

K factor for variable inspection

NUMC  12

Control chart number

Transformation of SAP control
chart number into HYDRA control
chart number

PHYSPROBE

KZKORRTRAN

NUMC  6

CHAR  1

Number of the physical sample

Number of the physical sample

Ind.: correction transmission

“ “
“X”

First transmission
Correction transmission

ZAEHL

NUMC  8

Version counter

Version counter

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 23 von 49

Field name:

T  L  D

ANTVERF

CHAR  1

Description
Share calculation procedure

Interface QM-IDI

Use in HYDRA
Binomial distribution
Poisson distribution
Normal distribution
Distribution not specified

“A”
“B”
“C”
“ “

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 24 von 49

Interface QM-IDI

4.3  Catalog master data in “Z2QAICA000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

SATZART

KATAB

KATALGART

AUSWMGWRK

AUSWMENGE

CODEGRUPPE

CODE

KURZTEXT

CHAR  3

Record type

Not used

CHAR  1

Ind.: entry is selected set

“X”
“X”

entry is selected set
entry is no selected set

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

Catalog type

Catalog type

Plant of the selected set

Plant of the selected set

Selected set

Code group

Code

Selected set

Code group

Code

CHAR  40

Short text of the code

BEWERTUNG

CHAR  1

Valuation

FEHLKLASSE

CHAR  2

Defect class

MUSSTEXTKZ

CHAR  1

Ind.: text required for confirmation.

BB_VORSCH

CHAR  1

Ind.: carry out inventory posting

Short text of the code
(only for the native MDBI column)

“A”
“R”
“ “

Acceptance (OK)
Rejection (not OK)
Valuation not carried out

Always the same values allowed.
Defined in Customizing
(transaction OQC7)

“ “
“X”

“ “
“X”

Text not obligatory
Text obligatory

No inventory posting
Inventory posting carried
out

QKENNZAHL

NUMC  3

Quality score

Quality score

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 25 von 49

4.4  Inspection Points in “Z2QAIPP000X000” structure

Interface QM-IDI

Field name:

T  L  D

Description

Use in HYDRA
in-
Download of

“Q85”
spection point

SATZART

PRUEFLOS

PLNFL

VORNR

PROBENR

TEILLOS

MENGE

EINHPR

EQUNR

TPLNR

PHYNR

USERC1

USERC2

USERN1

USERN2

USERD1

USERT1

VKATART

VWERKS

VAUSWAHLMG

VCODEGRP

VCODE

VTEXT

MATNR

CHARG

PRUEFDATUM

PRUEFZEIT

PRUEFER

KZRMART

URSACHEAS

MENGEAS

MENGENA

CHAR  3

Record type

NUMC  12

Inspection batch number

CHAR  6

CHAR  4

NUMC  6

NUMC  6

Operation sequence in task list

Operation number

Sample number

Partial batch number

CHAR  17

Inspection point quantity

CHAR  3

Unit of measure for inspection point   Not used

CHAR  18

CHAR  30

CHAR  12

Equipment  number  Cannot  be  defined
freely  (value  range  determined  by  in-
spection  batch);  inspection  points  of
type  1
through  3  already  defined
(these  inspection  points  can  be  re-
trieved with function module

Number  of  functional  location  (see
EQUNR)

Number  of  physical  sample
EQUNR)

(see

CHAR  18

User field for 18 characters

CHAR  10

User field for 10 characters

NUMC  10

User field for 10 digits

NUMC  3

DATE  8

TIME  6

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

User field for 3 digits

User field for date

User field for time

Catalog type

Plant

Selected  set  of  the  usage  decision  for
the inspection point

Not used (only for upload)

Not used (only for upload)

Not used (only for upload)

Code group of the usage decision

Not used (only for upload)

Code of the usage decision

Not used (only for upload)

CHAR  40

Short text for partial batch

CHAR  18

Material number

Not used

CHAR  10

Batch number

DATE  8

TIME  6

Start date of the inspection

Start time of the inspection

CHAR  12

Name of the inspector

Not used

Not used

Not used

CHAR  1

CHAR  4

Confirmation type, currently not used   Not used

Reason for scrap, currently not used   Not used

CHAR  17

Scrap quantity

CHAR  17

Rework quantity

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 26 von 49

Interface QM-IDI

4.5  Error messages in “Z2QIERR000X000” structure

Field name:

T  L  D

Description

LFDNR

NUMC  4

Consecutive number

Use in HYDRA
Usage in HYDRA Escalation Man-
agement (Acronym complies with
field name)

MSGID

MSGNR

MSGTYPE

MSGTEXT

LOG_NO

CHAR  20

Message class

NUMC  3

CHAR  1

Message number

Message type (E, I, W,...)

CHAR  73

Message text

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

CHAR  20

Application log: protocol number

Vide field LFDNR

LOG_MSG_NO

NUMC  6

Application
message

log:  number  of  current

Vide field LFDNR

PARAM_NAME

PARAM_ROW

PARAM_FIELD

PRUEFLOS

PLNFL

VORNR

VORGLFNR

MERKNR

KATAB

KATALGART

AUSWMGWRK

AUSWMENGE

CODEGRUPPE

CODE

RUECKMELNR

PROBENR

STUECKNR

CHAR  32

Parameter name

NUMC  10

Line in parameter

CHAR  30

Field in parameter

NUMC  12

Inspection batch number

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Sequence  of  operations  within  a  task
list

Operation number

Consecutive  node  number  from  order
counter APLZL

Inspection characteristic number

Vide field LFDNR

Indicator:  catalog  entry  is  a  selected
set

Vide field LFDNR

Catalog  type  of  the  assigned  code
group or selected set

Vide field LFDNR

Plant of the assigned selected set

Vide field LFDNR

Assigned code group or selected set   Vide field LFDNR

Code group

Code

Confirmation number for the inspection
point

Number of the sample

Consecutive  number  for  unit  to  be  in-
spected

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

CHAR  6

CHAR  4

NUMC  8

NUMC  4

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

NUMC  8

NUMC  6

NUMC  4

SATZART

CHAR  3

Record types

Vide field LFDNR

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 27 von 49

5  Upload of inspection results / insp. points / usage decisions

Interface QM-IDI

5.1  Upload for Single Results

Message Type::

ZHYQMIDI_ORIGINAL_VALUES

IDoc Type::

Segment::

ZHYQMIDI_ORIGINAL_VALUES01

Z2QAISE000X000 (single results)

Field name:

T  L  D

Description

Use in HYDRA

SATZART

CHAR  3

Record type

“Q51”
“Q52”
“Q53”

“Q54”

“Q55”

RUECKMELNR

NUMC  8

Confirmation no. of the charact.

PROBENR

NUMC  6

Number of the partial sample

STUECKNR

NUMC  4

Consecutive number for test units

  Number of sample (without in-

KZSERNR

CHAR  1

Ind.: serial number filled

SERIALNR

CHAR  18

Serial no. of the test unit

spection points)

  Number of inspection point

“X”

“ “

If recording of serial
numbers is required
If recording of serial
numbers is not required

Contains serial number if recording
of serial number is required

KZLWERT

KZLPROBE

KZABSCHL

KZBEWEEXT

ATTRIBUT

CHAR  1

CHAR  1

CHAR  1

CHAR  1

CHAR  1

Ind.: last single value

Ind.: last sample

Not used

Not used

Ind.: close characteristic (sample)

Not used

Ind.: transfer valuation

Not used

Attribute of the individual result

“/”

“ “

Single value was set
invalid
Valid value

MESSWERT

CHAR  16

Measured value

GRUPPE1

CODE1

GRUPPE2

CODE2

GRUPPE3

CODE3

GRUPPE4

CODE4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

Measured value

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 28 von 49

Quantitative single result
Code as single result
Valuation OK/not OK as
single result
Quantitative single result
for inspection point
Code as single result for
inspection point
Valuation as single  re-

“Q56”
sult for inspection   point
Confirmation number in accord-
ance with specification

  Number of partial sample
(without inspection points)
  Number of inspection point

Interface QM-IDI

Field name:

T  L  D

Description

Use in HYDRA

GRUPPE5

CODE5

BEWERTUNG

FEHLKLAS

ANZFEHLER

PRUEFDATUV

PRUEFZEITV

PRUEFER

QERGDATH

MASCHINE

POSITION

CHAR  8

CHAR  4

CHAR  1

CHAR  2

NUMC  2

DATE  8

TIME  6

Code group 5

Code 5

Valuation

Defect class

Code group 5

Code 5

“A”
“R”

Acceptance (OK)
Rejection (not OK)

Defect class if available

Number of defects

Number of defects

Start date of the inspection

Start date of the inspection

Start time of the inspection

Start time of the inspection

CHAR  12

Name of the inspector

If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

CHAR  2

Origin of results data (on completion)   According to customizing

CHAR  18

Machine

Machine / work centre

NUMC  4

Position on the machine

Position

PRUEFBEMKT

CHAR  40

Short text for inspection description

Short text for inspection descrip-
tion

MBEWERTGPR

FEHLKLASPR

MBEWERTGMK

FEHLKLASMK

CHAR  1

CHAR  2

CHAR  1

CHAR  2

Valuation of the sample

Not used

Defect class for sample valuation

Not used

Valuation of the characteristic

Not used

Defect class for characteristic valuation  Not used

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 29 von 49

5.2  Upload for Sample Results

Message type:

ZHYQMIDI_SAMPLE_VALUES

IDoc type:

Segment::

ZHYQMIDI_SAMPLE_VALUES01

Z2QAISR000X000 (sample results)

Field name:

T  L  D

Description

SATZART

CHAR  3

Record type

RUECKMELNR

NUMC  8

Confirmation no. of the charact.

PROBENR

NUMC  6

Ind.: close characteristic

Interface QM-IDI

“Q64”

“Q61”

“Q62”
“Q63”

Use in HYDRA
Quantitative sample
result
Code as sample result
Valuation OK/not OK for
sample
Quantitative result for
inspection point
Code for inspection
point
Valuation OK/not OK for
inspection point
Close sample record
“Q69”
Confirmation number in accord-
ance with specification

“Q65”

“Q66”

  Number of partial sample
(without inspection points)
  Number of inspection point

KZLRPOBE

KZABSCHL

KZBEWEEXT

CHAR  1

CHAR  1

CHAR  1

Ind.: transfer valuation

Attribute of the results record

Valuation  of  characteristic  for  usage
decision

Not used

Not used

Not used

ATTRIBUT

CHAR  1

Defect class

“/”

“ “

Single value was set
invalid
Valid value

GRUPPE1

CODE1

GRUPPE2

CODE2

GRUPPE3

CODE3

GRUPPE4

CODE4

GRUPPE5

CODE5

ANZWERTG

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

NUMC  4

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

Code group 5

Code 5

Number of valid values

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

Code group 5

Code 5

Number
QAIMV.BEWARTSP = “A” or “B”

values

valid

of

if

ANZFEHLEH

NUMC  4

Number of non-conforming units

ANZFEHLER

NUMC  4

Number of defects

Number  of  non-conforming  units  if
QAIMV.BEWARTSP = “A”

Number of defects if
QAIMV.BEWARTSP = “B”

ANZWERTO

ANZWERTU

NUMC  4

NUMC  4

Values above upper tolerance limit

Values above upper tolerance limit

Values below lower tolerance limit

Values below lower tolerance limit

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 30 von 49

Interface QM-IDI

Field name:

T  L  D

Description

MITTELWERT

CHAR  16

Average of valid measured values

VARIANZ

CHAR  16

Variance of valid measured values

Use in HYDRA
Average of valid measured values
if QAIMV.BEWARTSP = “C”

Average of valid measured values
if QAIMV.BEWARTSP = “C”

MAXWERT

MEDIANWERT

MINWERT

PRUEFDATUV

PRUEFDATUB

PRUEFZEITV

PRUEFZEITB

PRUEFER

QERGDATH

MASCHINE

POSITION

CHAR  16

Max. of valid measured values

Max. of valid measured values

CHAR  16

Median of valid measured values

Median of valid measured values

CHAR  16

Min. of valid measured values

Min. of valid measured values

DATE  8

DATE  8

TIME  6

TIME  6

Start date of the inspection

Start date of the inspection

Finish date of the inspection

Finish date of the inspection

Start time of the inspection

Start time of the inspection

Finish time of the inspection

Finish time of the inspection

CHAR  12

Name of the inspector

If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

CHAR  2

Origin of results data

According to customizing

CHAR  18

Machine

Machine / work centre

NUMC  4

Position on the machine

Position

PRUEFBEMKT

CHAR  40

Short text for inspection descript.

Short text for inspection descrip-
tion

MBEWERTGPR

FEHLKLASPR

MBEWERTGMK

FEHLKLASMK

CHAR  1

CHAR  2

CHAR  1

CHAR  2

Not used

Not used

Not used

Not used

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 31 von 49

Interface QM-IDI

5.3  Upload for Characteristic Results

Message type:

ZHYQMIDI_FEATURE_VALUES

IDoc type:

Segment:

ZHYQMIDI_FEATURE_VALUES01

Z2QAIMR000X000 (characteristic results)

Field name:

T  L  D

Description

Use in HYDRA

SATZART

CHAR  3

Record type

“Q71”

“Q72”

“Q73”

RUECKMELNR

NUMC  8

Confirmation no. of the charact.

KZABSCHL

CHAR  1

Ind.: close characteristic

KZBEWEEXT

CHAR  1

Ind.: transfer valuation

ATTRIBUT

CHAR  1

Attribute of the results record

MBEWERTG

CHAR  1

Valuation  of  characteristic  for  usage
decision

FEHLKLAS

GRUPPE1

CODE1

GRUPPE2

CODE2

GRUPPE3

CODE3

GRUPPE4

CODE4

GRUPPE5

CODE5

ANZWERTG

CHAR  2

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

CHAR  8

CHAR  4

NUMC  7

Defect class

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

Code group 5

Code 5

Number of valid values

Quantitative
characteristic result
Code as characteristic
result
Valuation OK/not OK for
characteristic
Close characteristic

“Q79”
Confirmation number in accord-
ance with specification

“X”
“ “

If record type “Q79”
All other record types

Ind.: transfer valuation in accord-
ance to specification

“/”

“ “

“A”
“R”

Single value was set
invalid
Valid value

Acceptance (OK)
Rejection (not OK)

Defect class if available

Code group 1

Code 1

Code group 2

Code 2

Code group 3

Code 3

Code group 4

Code 4

Code group 5

Code 5

Number
QAIMV.BEWARTSP = “A” or “B”

values

valid

of

if

ANZFEHLEH

NUMC  7

Number of non-conforming units

ANZFEHLER

NUMC  7

Number of defects

Number  of  non-conforming  units  if
QAIMV.BEWARTSP = “A”

Number of defects if
QAIMV.BEWARTSP = “B”

ANZWERTO

ANZWERTU

MITTELWERT

NUMC  7

NUMC  7

Values above upper tolerance limit

Values above upper tolerance limit

Values below lower tolerance limit

Values below lower tolerance limit

CHAR  16

Average of valid measured values

VARIANZ

CHAR  16

Variance of valid measured values

Average of valid measured values
if QAIMV.BEWARTSP = “C”

Average of valid measured values
if QAIMV.BEWARTSP = “C”

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 32 von 49

Field name:

T  L  D

CHAR  16

Interface QM-IDI

Description
Max. of valid measured values

Use in HYDRA
Max. of valid measured values

MAXWERT

MEDIANWERT

MINWERT

IVARIANZ

PRUEFDATUV

PRUEFDATUB

PRUEFZEITV

PRUEFZEITB

PRUEFER

QERGDATH

MASCHINE

POSITION

CHAR  16

Median of valid measured values

Median of valid measured values

CHAR  16

Min. of valid measured values

Min. of valid measured values

CHAR  16

Inner variance of measured values

Inner variance of measured values

DATE  8

DATE  8

TIME  6

TIME  6

Start date of the inspection

Start date of the inspection

Finish date of the inspection

Finish date of the inspection

Start time of the inspection

Start time of the inspection

Finish time of the inspection

Finish time of the inspection

CHAR  12

Name of the inspector

If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

CHAR  2

Origin of results data

According to customizing

CHAR  18

Machine

Machine / work centre

NUMC  4

Position on the machine

Position

PRUEFBEMKT

CHAR  40

Short text for inspection description

Short text for inspection descrip-
tion

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 33 von 49

5.4  Upload for Inspection Points

Message type:

ZHYQMIDI_INSP_POINTS

IDoc type::

Segment:

ZHYQMIDI_INSP_POINTS01

Z2QAIPP000X000 (inspection points)

Field name:

T  L  D

Description

SATZART

CHAR  3

Record type

PRUEFLOS

NUMC  12

Inspection batch number

PLNFL

VORNR

CHAR  6

Operation sequence in task list

CHAR  4

Operation number

PROBENR

NUMC  6

Sample number

Interface QM-IDI

Use in HYDRA
Creation / update of an
inspection point
Valuation for inspection
point

“Q83”

“Q84”

Inspection batch number in ac-
cordance to specification

Operation sequence in task list in
accordance to specification

Operation number in accordance
to specification

Consecutive number for the in-
spection point

Recorded value if
QAIVC.TEILLOSPFL = „X“

Recorded quantity if
QAIVC.QUANTITIES = „X“

TEILLOS

MENGE

EINHPR

EQUNR

TPLNR

PHYNR

USERC1

NUMC  6

Partial batch number

CHAR  17

Inspection point quantity

CHAR  3

Unit of measure for inspection point   Unit of measure for inspection

CHAR  18

Equipment  number  Cannot  be  defined
freely  (value  range  determined  by  in-
spection  batch);  inspection  points  of
type  1
through  3  already  defined
(these  inspection  points  can  be  re-
trieved with function module

point

Not used

CHAR  30

CHAR  12

Number  of  functional  location  (see
EQUNR)

Not used

Number  of  physical  sample
EQUNR)

(see

Not used

CHAR  18

User field for 18 characters

USERC2

CHAR  10

User field for 10 characters

USERN1

NUMC  10

User field for 10 digits

USERN2

NUMC  3

User field for 3 digits

USERD1

DATE  8

User field for date

USERT1

TIME  6

User field for time

Recorded value if
QAIVC.KZUSERC1 = „X“ or “1” to
“6”

Recorded value if
QAIVC.KZUSERC2 = „X“ or “1” to
“6”

Recorded value if
QAIVC.KZUSERN1 = „X“ or “1” to
“6”

Recorded value if
QAIVC.KZUSERN2 = „X“ or “1” to
“6”

Recorded value if
QAIVC.KZUSERD1 = „X“ or “1” to
“6”

Recorded value if
QAIVC.KZUSERT1 = „X“ or “1” to
“6”

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 34 von 49

Field name:

T  L  D

Description

Use in HYDRA

Interface QM-IDI

VKATART

CHAR  1

Catalog type

VWERKS

CHAR  4

Plant

VAUSWAHLMG

CHAR  8

Selected  set  of  the  usage  decision  for
the inspection point

VCODEGRP

CHAR  8

Code group of the usage decision

VCODE

CHAR  4

Code of the usage decision

VTEXT

MATNR

CHARG

PRUEFDATUM

PRUEFZEIT

PRUEFER

KZRMART

URSACHEAS

MENGEAS

CHAR  40

Short text for partial batch

CHAR  18

Material number

CHAR  10

Batch number

DATE  8

TIME  6

Start date of the inspection

Start date of the inspection

Start time of the inspection

Start time of the inspection

CHAR  12

Name of the inspector

If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

CHAR  1

CHAR  4

Confirmation type, currently not used   Not used

Reason for scrap, currently not used   Not used

CHAR  17

Scrap quantity

MENGENA

CHAR  17

Rework quantity

5.5  Upload for Usage Decision

Message type:

ZHYQMIDI_USAGE_DECISION

IDoc type:

Segment:

ZHYQMIDI_USAGE_DECISION01

Z2QAIVE000X000 (usage decision)

Field name:

T  L  D

Description

SATZART

CHAR  3

Record type

“Q83”
“Q84”

“Q83”
“Q84”

Not used
Catalog type

Not used
Plant

“Q83”
“Q84”
age decision for the
spection point

Not used
Selected set of the  us-
in-

“Q83”
“Q84”

“Q83”
“Q84”
cision

“Q83”
“Q84”

Not used
Code group of the usage
decision

Not used
Code of the usage   de-

Not used
Recorded value

Material number in accordance to
specification

Recorded value if
QAIVC.CHARGPFL = “X”

“Q83”
“Q84”

“Q83”
“Q84”

Not used
Recorded value

Not used
Recorded value

Use in HYDRA
Transfer of usage   de-

“Q88”
cision
“Q89”
spection, usage
ferred

Cancellation of

in-

decision trans-

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 35 von 49

Field name:

T  L  D

Description

PRUEFLOS

NUMC  12

Inspection batch number

AUSWMENGE

CHAR  8

Selected set of the usage decision

AUSWMGWRK

CHAR  4

Plant of the selected set

CODE

CODEGRUPPE

VNAME

CHAR  4

CHAR  8

Code

Code group

CHAR  12

Person who made usage decision

Interface QM-IDI

Use in HYDRA
Inspection batch number in ac-
cordance to specification

Selected set of the usage decision
in accordance to specification

Plant of the selected set in accord-
ance to specification

Recorded Value

Recorded Value

If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

VDATUM

DATE  8

Date when usage decision was made   Date when usage decision was

made

VZEIT

VTEXT

TIME  6

Time when usage decision was made   Time when usage decision was

made

CHAR  80

Text for usage decision

Text for usage decision

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 36 von 49

Interface QM-IDI

5.6  Upload for Defect Items

Message type:

ZHYQMIDI_DEFECT_ITEMS

IDoc type

Segment:

ZHYQMIDI_ DEFECT_ITEMS 01

Z2QMIFE000X000 (defect items)

Field name:

T  L  D

Description

SATZART

CHAR  3

Record type

PRUEFLOS

NUMC  12

Inspection batch number

PLNFL

VORNR

MERKNR

PROBENR

CHAR  6

CHAR  4

NUMC  4

NUMC  6

Sequence of operations in task list

Operation number

Characteristic number

Number  of  partial  sample/inspection
point

Use in HYDRA
in-
Defect item for

“Q90”
spection batch
“Q91”
“Q92”

Defect item for operation
Defect item for
characteristic

in-

dependent multiple  sample
“Q95”

Defect item for operation
with reference to

in-

spection point
“Q96”

Defect item for
characteristic with   ref-

erence to inspection
point
Inspection point number in accord-
ance to specification

Sequence of operations in task list
in accordance to specification

Operation  number  in  accordance
to specification

Characteristic  number  in  accord-
ance to specification

Number
ple/inspection point

of

partial

sam-

RUECKMELNR

NUMC  8

Confirmation  number
characteristic

for

inspection

Confirmation number for inspection
characteristic
to
specification

in  accordance

POSNR

FEKAT

FEGRP

FECOD

NUMC  4

CHAR  1

CHAR  8

CHAR  4

Sort number for item

Consecutive number

Catalog type - defects

Catalog type - defects

Code group - defects

Code group - defects

Defects

Defects

SERIALNR

CHAR  18

Single-unit  number  of  unit  to  be  in-
spected

Single-unit number of unit to be in-
spected

ANZFEHLER

FEQKLAS

KZSYSFE

OTKAT

OTGRP

OTEIL

FETXT

BAUTL

FEHLBEW

UNITFLBEW

CHAR  7

CHAR  2

CHAR  1

CHAR  1

CHAR  8

CHAR  4

Number of defects

Number of defects

Defect class

Defect class

Indicator: systematic defect

Indicator: systematic defect

Catalog type - object parts

Catalog type - object parts

Code group - object parts

Code group - object parts

Object part

Object part

CHAR  40

Short text for defect item

Short text for defect item

CHAR  18

Assembly

Assembly

CHAR  10

Quantitative defect valuation

Quantitative defect valuation

UNIT  3

Unit for defect valuation

Unit for defect valuation

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 37 von 49

Interface QM-IDI

Field name:

T  L  D

FENAM

CHAR  12

Description
Name of person who processed defect
record

Use in HYDRA
If result was recorded at HYDRA
console, it contains the user; oth-
erwise it contains the personal
card number.

FEDAT

FZEIT

DATS  8

TIMS  6

Date of record processing

Date of record processing

Time of record processing

Time of record processing

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 38 von 49

Interface QM-IDI

6  Application-relevant settings in HYDRA

6.1  Configuring variants for Stand-alone CAQ

The request for inspection specifications is based on a uniform selection table. Opposite to the integration

scenarios with PP-PDC and/or HYINFO, for stand-alone CAQ integration it is not possible to use any data

provided by SAP to request the specifications.

For the following reason there is a customizing table in HYDRA. The table represents the QAILS selection

structure  defined  by  SAP  and  allows  though,  requesting  inspection  specifications  from  SAP.  Right  now

there is no graphical user interface to maintain the table, though any adjustments have to be done by us-

ing database interface.

Table: CAQ_QAILS_VORMERK

Field

SATZART

T
CHAR

Description

L
3  Record type for request rec-

Fixed „Q40“

Meaning / Remark

ord

LOSNR_VON

NUMC

12  From inspection batch num-

Should not be used for selection

ber

LOSNR_BIS

NUMC

12  To inspection batch number   Should not be used for selection

PLNFL

CHAR

6  Operation sequence in task

Should not be used for selection

list

VORNR_VON

CHAR

4  From operation number

Should not be used for selection

VORNR_BIS

VORGWERK

CHAR

4  To operation number

Should not be used for selection

CHAR

4  Plant of operation to be pro-

Should be used for selection

cessed

SUBSYS

CHAR

6

Identifier of the subsystem   Value  as  defined  in  SAP  customizing  (please  see  also

chapter 7.1 Defining QM subsystem)
Default: QM0001

PRPLATZ

CHAR

8  Work center

Useable for selection

PRPLATZWRK

CHAR

4  Plant of the work center

Useable for selection

MATNR

CHAR

18  Material number

Useable for selection

DATUM_VON

CHAR

15  From creation date of inspec-

tion batch

It is possible to calculate the “date from” dynamically ac-
cording to the current date minus x days. For that the en-
try has to be done such as:
TODAY–n (n represents the number of days, e.g. 5)
Default: TODAY

DATUM_BIS

CHAR

15  To creation date of inspection

batch

It is possible to calculate the “date from” dynamically ac-
cording to the current date minus x days. For that the en-
try has to be done such as:
TODAY-n (n represents the number of days, e.g. 5)
Default: Today

PRUEFSTAT]

CHAR

1  Status of the inspection

Useable for selection

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 39 von 49

Interface QM-IDI

Field

ART

HERKUNFT

CHARG

AUFNR_VON

AUFNR_BIS

LIFNR

KUNNR

MBLNR

T
CHAR

L
8

Description

Meaning / Remark

Inspection type

Useable for selection

CHAR

2  Origin of the inspection batch  Useable for selection

CHAR

10  Batch number

Should not be used for selection

CHAR

12  From order number

Should not be used for selection

CHAR

12  To order number

Should not be used for selection

CHAR

10  Vendor number

Should not be used for selection

CHAR

10  Customer number

Useable for selection

CHAR

10  Number of the material document Should not be used for selection

MAXLOSANZ

NUMC

4  Maximum number of batches per

Fixed “9999”

BEARB

TA_ID

STATISCH

STATUS

BEARB_DATE

BEARB_TIME

USER_D_01

USER_D_02

USER_N_03

USER_N_04

USER_N_05

USER_F_07

USER_F_08

USER_C_09

USER_C_10

Verweis

transmission

CHAR

User

CHAR

30

CHAR

CHAR

1

3

DATE

TIME

DATE

DATE

Flag “Static entry”

User field

User field

NUMC

8  User field

NUMC

8  User field

NUMC

8  User field

DEC

DEC

13,3  User field

13,3  User field

CHAR

20  User field

CHAR

40  User field

Future use

Future Use

Fixed “J”

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Database serial

Consecutive number

The  hysapqmc.exe/out  program requests  the  inspection  specifications.  In  the  stand-alone  CAQ  integra-

tion the program has to be used with the following parameters:

/MESTYP_OUT=

The “/MESTYP_OUT” program parameter defines the message type generated for inspection spec-

ifications. For the stand-alone CAQ integration the “ZQM_IDI” value has to be used.

/LOGSYS=

The “/LOGSYS” program parameter corresponds to the customizing setting for the logical system in

HYDRA MES Link Enabling (MLE).

/VARIANTE=

The “/VARIANTE” program parameter refers to a variant in table SAP_FB_PARAM_CFG for func-

tion module QIRF_SEND_REQUIREMENTS_GET_DAT2.

To schedule the request for inspection specifications on a cyclic base an entry in the HYDRA Scheduler

has to be done:

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 40 von 49

Interface QM-IDI

Model:

Type

I

C

Product key:  HKMQM-IDI

License key:  HKMQM-IDI

Command:

.

sh.exe

hysapqmc.scr

/MESTYP_OUT=ZQM_IDI

/LOGSYS=<logical

system>

/VARIANTE=QM_IDI

NOTE:

For UNIX systems the entry in the Command field has to look like:

./hysapqmc.scr /MESTYP_OUT=ZQM_IDI /LOGSYS=<logical system> /VARIANTE=QM_IDI

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 41 von 49

Interface QM-IDI

6.2  Configuring function module parameters

The integration of HYDRA with SAP QM by using QM-IDI requires the use of a number of function mod-

ules in SAP. Each function module provides a set of import parameters that allow controlling the selection

or posting process in SAP.

In  order  to  provide  the  highest  flexibility  to  control  these  ones  differently,  all  these  parameters  can  be

maintained in a customizing table in HYDRA. Right now there is no graphical user interface to maintain

the table, though any adjustments have to be done by using database interface.

Table: SAP_FB_PARAM_CFG

Field

VARIANTE

T
CHAR

L
30  Variant

Description

Meaning / Remark
The variant is the logical name for a set of parameters for
one or more function modules.

FB_NAME

CHAR

30  Name of the function module

PARAM_NAME

CHAR

50  Name of the parameter

Together  with  the  field  VARIANTE  the  FB-NAME  forms
the key of the table.
The field contains the technical name as it can be found
in  SAP transaction SE37  or  as  it is  described  in  chapter
3  Mapping
e.g.
QIRF_SEND_REQUIREMENTS_GET_DAT2

the  QM-IDI

in  HYDRA,

The field contains the technical name as it can be found
in  SAP transaction SE37  or  as  it is  described  in  chapter
e.g.
3  Mapping
I_IND_SORT_ASCENDING_TO_DATE

the  QM-IDI

in  HYDRA,

PARAM_VALUE

CHAR

100  Value of the parameter

Contains the actual value of the parameter, e.g. “X”.

PARAM_TYPE

CHAR

15  Type of the parameter

Future use

PARAM_LENGTH

NUM

10  Length of the parameters

Future use

VERWEIS

Database serial

Consecutive number

A  variant  for  each  function  module  used  and  supported  in  HYDRA  QM-IDI  implementation  (variant

“QM_IDI”) is included in the scope of delivery. For each function module the full range of parameters is

provided with the default setting as described in chapter 3 Mapping the QM-IDI in HYDRA.

6.3  Configuring call for catalog master data

Catalog master data of SAP is needed for all integration scenarios. The catalog master data download is

also  executed  by  the  hysapqmc.exe/out  program.  To  download  catalog  master  data  from  SAP  the  pro-

gram has to be used with the following parameters:

/MESTYP_OUT=

The “/MESTYP_OUT” program parameter defines the message type generated for catalog master

data. For that, the “ZHYQMIDI_CATALOG” value has to be used.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 42 von 49

Interface QM-IDI

/LOGSYS=

The “/LOGSYS” program parameter corresponds to the customizing setting for the logical system in

HYDRA MES Link Enabling (MLE).

/VARIANTE=

The “/VARIANTE” program parameter refers to a variant in the SAP_FB_PARAM_CFG table for the

QIRF_SEND_CATALOG_DATA2 function module.

The  HYDRA  scope  of  delivery  includes  the  “QM_IDI”  variant  for  the  QIRF_SEND_CATALOG_DATA2

function module as an example. In the example all parameter values are empty.

If necessary multiple entries have to be created to download all necessary catalog master data from SAP.

It is strictly recommended to create the variants in the customer name space, starting with “U_”.

To schedule the download of catalog master data on a cyclic base an entry in the HYDRA Scheduler has

to be done:

Model:

Type

I

C

Product key:  HKMQM-IDI

License key:  HKMQM-IDI

Command:

.

sh.exe  hysapqmc.scr

/MESTYP_OUT=ZHYQMIDI_CATALOG

/LOGSYS=<logical  system>

/VARIANTE=QM_IDI

NOTE:

For UNIX systems the entry in the Command field has to look like:

./hysapqmc.scr /MESTYP_OUT= ZHYQMIDI_CATALOG /LOGSYS=SAP /VARIANTE=QM_IDI

6.4  Configuring call for inspection point download

Inspection points from SAP are needed for all integration scenarios. The inspection point download is al-

so  executed  by  the  hysapqmc.exe/out  program.  To  download  inspection  points  from  SAP  the  program

has to be used with the following parameters:

/MESTYP_OUT=

The “/MESTYP_OUT” program parameter defines the message type generated for catalog master

data. For that, the “ZHYQMIDI_INSPPOINT” value has to be used.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 43 von 49

Interface QM-IDI

/LOGSYS=

The “/LOGSYS” program parameter corresponds to the customizing setting for the logical system in

HYDRA MES Link Enabling (MLE).

/VARIANTE=

The “/VARIANTE” program parameter refers to a variant in the SAP_FB_PARAM_CFG table for the

QIRF_INSPPOINT_GETLIST function module.

The  HYDRA  scope  of  delivery  includes  the  “QM_IDI”  variant  for  the  QIRF_INSPPOINT_GETLIST  func-

tion module as an example. In the example all parameter values are empty.

If necessary multiple entries have to be created to download all necessary inspection points from SAP. It

is strictly recommended to create the variants in the customer name space, starting with “U_”.

To schedule the download of catalog master data on a cyclic base an entry in the HYDRA Scheduler has

to be done:

Model:

Type

I

C

Product key:  HKMQM-IDI

License key:  HKMQM-IDI

Command:

.

sh.exe  hysapqmc.scr

/MESTYP_OUT=ZHYQMIDI_INSPPOINT

/LOGSYS=<logical  system>

/VARIANTE=QM_IDI

NOTE:

For UNIX systems the entry in the Command field has to look like:

./hysapqmc.scr /MESTYP_OUT= ZHYQMIDI_INSPPOINT /LOGSYS=SAP /VARIANTE=QM_IDI

6.5  Configuring for inspection point creation in HYDRA

When inspection points are not downloaded from SAP, they are created in HYDRA. The creation for time

and  quantity  related  inspection  points  is  done  by  a  cyclic  process,  that  is  scheduled  in  the  HYDRA

Scheduler. There the following entry has to be created:

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 44 von 49

Interface QM-IDI

Model:

Interval

Type

I

5 minutes

C

Product key:  QMS-BP

License key:  QMS-BP

Command:

.

sh.exe hyqmsipcr.scr

NOTE:

For UNIX systems the entry in the Command field has to look like:

./hyqmsipcr.scr

6.6  Configuration of confirmations

After data recording in HYDRA the confirmation data has to be transferred back to SAP. The confirmation

is done on a cyclic base (Default: 15 minutes).

To schedule the upload recorded data to SAP on a cyclic base an entry in the HYDRA Scheduler has to

be done:

Model:

Type

I

C

Product key:  HKMQM-IDI

License key:  HKMQM-IDI

Command:

.

sh.exe ./qm_idi_rck.scr

NOTE:

For UNIX systems the entry in the Command field has to look like:

./qm_idi_rck.scr

6.7  Configuring origin of results data

The origin of results data can be configured in SAP customizing. To enable HYDRA to transfer this infor-

mation when uploading inspection results to SAP, the entry has to be customized in HYDRA accordingly.

The customizing is only possible in HYDRA professional mode.

CUS  CAQ  Master data  System Administration  Options

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 45 von 49

Interface QM-IDI

6.8  Configuring partial confirmations for inspection lots

Partial confirmations for inspection lots can be configured HYDRA CAQ customizing.

By activating the CAQ option 1128 (value = Y) partial confirmations for inspection lots will be transferred

to SAP even when the final usage decision is not done yet.

Remarks:

By activating the option WITHOUT the additional setting [DIRECT] the system will behave such as:



Inspection points will be confirmed after closing them. Together with the inspection points single

results, characteristic results and defect items (Q95 and Q96) will be transferred.

  For  operations  that  are  not  inspection  point  relevant,  the  characteristic  results  with  their  single

and  sample  results  will  be  confirmed  when  closing  the  inspection  order  (usually  when  finishing

the operation).

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant  opera-

tions.

  Defect items for operations (Q91) and characteristics/ independent multiple samples (Q92) will be

confirmed when closing the inspection order (usually when finishing the operation).

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant  opera-

tions.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 46 von 49

Interface QM-IDI

  Defect items of the inspection requirement (Q90) will be confirmed after closing the inspection re-

quirement.

  The  usage  decision  will  be  confirmed  when  it  is  done,  usually  after  closing  the  inspection  re-

quirement.

By activating the option WITH the additional setting [DIRECT] the system will behave such as:

  All inspection point details, recorded results  und defect items will be confirmed directly  after re-

cording.

  The characteristics  will be  confirmed as closed,  when the  assigned  inspection order is finished,

usually when finishing the last operation.

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant  opera-

tions.

  Sample results will be confirmed as closed, when the assigned inspection order has been closed

or the inspection point is closed.

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant  opera-

tions.

The usage decision will be confirmed after recording, usually when the assigned  inspection requirement

is closed.

ATTENTION!! Activating the option with additional setting [DIRECT] is only available for testing reasons.

The setting is NOT released for customers.

In case the option is not available or inactive, all inspection lot data will be transferred after making the fi-

nal usage decision.

CUS  CAQ  Master data  System Administration  Options

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 47 von 49

Interface QM-IDI

6.9  Settings in HYDRA MES Link Enabling

The integration of HYDRA with SAP QM by using QM-IDI requires settings in the HYDRA MES Link Ena-

bling (MLE). The technical communication can be configured within the Logical Systems of MLE. The in-

bound and outbound processing has to be configured in the HYDRA MLE distribution model.

Detailed  information  on  HYDRA  MES  Link  Enabling  can  be  found  in  the  HYDRA  documentation  HKM-

MLEK.pdf.

6.10 Assignment of key values for production orders

In  PP-PDC  and  HYINFO  integration  scenario  general  settings  for  operations  from  SAP  such  as  the  as-

signment of key values have also to be done.

Detailed information on these settings can be found in the HYDRA documentation HKMPP-PDC.pdf.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 48 von 49

Interface QM-IDI

7  Application-relevant customizing in SAP

7.1  Defining QM subsystem

In QM-IDI interface operations are only transferred if a subsystem is assigned to them. The assignment is

done at  the  work centre in SAP.  Each  work centre can be assigned to one subsystem only,  whereas  a

subsystem can be assigned to multiple work centers.

QM subsystems can be created in SAP using by IMG.

7.2  Defining origin of results data

In SAP QM it is possible to indicate the origin at the inspection result. For that, several origins can be de-

fined in the IMG. To enable HYDRA to support this field/information it is necessary to maintain the value

created in SAP in HYDRA as well (please see chapter 6.7 Configuring origin of results data for more de-

tails).

7.3  Defining detail level for error messages

When defining QM subsystems, the trace level can be defined. In the IDI interface, all error messages as

well as changes to the worklist are written to an application log.

The exceptions, messages of the QIERRTAB error log, and the beginning and end of a function  are rec-

orded. In Customizing, you can define the level of detail for the application log. Use the RQEIFML1 report

to display the application log. Use the RQEIFML2 report to delete the log.

MBL_Interface_QMIDI.docx

Version: 1.1.1362

Seite 49 von 49

