Manual
HYDRA Interfacing Module for
SAP PP Serial Production
SAP-PPREM 8.2
Version 1.0.23347
Last changed on: 22.09.2020

HYDRA Interfacing Module for SAP PP Serial Production
Copyright
©Copyright 2020 all rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-PPREM_82.docx Version: 1.0.23347 Page 2 of 47

HYDRA Interfacing Module for SAP PP Serial Production
Contents
1 HYDRA Interfacing Module for SAP PP Serial Production .......................... 4
2 Mapping of SAP-PPREM in HYDRA ............................................................ 6
3 Data type definitions ..................................................................................... 8
4 Downloading Operation Data ..................................................................... 10
5 Uploads ...................................................................................................... 18
6 Application-Relevant Settings in SAP ........................................................ 21
7 Application-Relevant Settings in HYDRA ................................................... 24
8 Escalation SAP.OUTBOUND_FM_POST_ERROR ................................... 29
9 SAP Order Sequencing .............................................................................. 30
10 Protecting fields of planned operations ...................................................... 32
11 MYERPRCK - Program Parameters .......................................................... 36
SAP-PPREM_82.docx Version: 1.0.23347 Page 3 of 47

HYDRA Interfacing Module for SAP PP Serial Production
1 HYDRA Interfacing Module for SAP PP Serial Production
Summary
Fields of application
If serial production is used in SAP R/3 the HKMPP-REM interface allows HYRA to be used as lower-level
system to collect actual data during the production process.
It is typical for serial production that production plans are created and processed in relation to time and
quantities. Compared to the individual batch and order-related production control, the efforts required for
controlling serial production are reduced considerably and actual data recording is simplified.
The costs accruing with serial production are booked on a product cost collector. As a part of actual data
collection, the product cost collector is, for example, charged with the costs for material and production.
Consequently, a goods receipt posting discharges the product cost collector. The product cost collector is
created for a material in a specific production version within a plant.
Only the produced quantities are uploaded in serial production. The withdrawn components and rendered
services are normally posted automatically.
In HYDRA actual data collection is not based on a fixed pattern. In fact data can be collected at any time.
In addition to this, uploads to SAP may also be configured individually, depending on how up-to-date data
are expected to be. This ensures a simple integration into existing production and collection processes.
Normally, component consumption is calculated automatically from the BOM and withdrawn from stock in
a retrograde manner. Production times are taken from the work plan/routing. While posting, material and
production costs are updated on the product cost collector.
In case of longer processing times, actual data can also be recorded at counting points within the
production line to be able to post consumptions more closely to the physical goods receipt posting. To do
so, it has to be defined for the serial production profile that a counting point posting may be performed for
the material. Furthermore, the control key has to identify an operation as the counting point (milestone) in
the work plan.
SAP R/3 provides BAPIs for the upload of recorded data of serial orders from third-party systems. They
have virtually been designed as supplement for SAP-GUI. Using these BAPIs, actual data can be
recorded in HYDRA, transferred to SAP where they are processed, as if they were directly entered in
SAP-GUI. But HYDRA has to provide for a corresponding data basis, which can be achieved by
downloading the relevant data.
SAP-PPREM_82.docx Version: 1.0.23347 Page 4 of 47

HYDRA Interfacing Module for SAP PP Serial Production
Implementation notes
You use the function package SAP-PPREM if you wish
 to use serial production in SAP ECC and do not want to use production orders
 to upload quantities relating to the production version from MES to SAP
 to use production order handling in SAP ECC but also want to plan or show planned orders, as
this provides a larger period of forward planning
Integration
If you use the SAP-PPREM component the orders/operations transferred by it represent the posting
framework for many other HYDRA components.
Features
 Transfer of planned orders using the IDoc type LOIPLO01
 Comparison of new planned orders with the planned orders that already exist in HYDRA by
date/workplace/header material
 Collection of actual quantities (yield and scrap) in HYDRA
 Upload of actual quantities to SAP PP-REM using the SAP BAPI
RepManConfirmation1.CreateMTS as counting point upload
 Notification if an upload could not be posted (prerequisite: SIS-ESK).
SAP-PPREM_82.docx Version: 1.0.23347 Page 5 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

2  Mapping of SAP-PPREM in HYDRA
Usage
In the context of connecting HYDRA to SAP PM-REM, it is the task of HYDRA to collect actual data in the
production process and to upload the collected actual quantities (yield and scrap quantities) to SAP PP-
REM. Requirements represent the data basis in SAP R/3. With regard to these requirements, planned
orders are created as replenishment elements in the course of the MRP run in SAP. These created
planned orders are adopted from SAP and are used as the target for production in relation to time, date
and the quantity to be produced.
The download of planned orders is initiated cyclically by R/3. The data are stored in an IDoc (intermediate
document) and uploaded to HYDRA. In general, planned orders are not a constant unit. With each
planning run, requirements are re-calculated and new planned orders are created as replenishment
elements. Planned orders are transferred discretionally to HYDRA, i.e. for a transferred planned order
number, the system creates an order or operation record in HYDRA or runs an update for these values if
such records exist already. After order data adoption by HYDRA, the planned orders are ready for
collection as production orders of the order type "REM".
Uploading the confirmations from HYDRA is controlled in accordance with user requirements. In the
course of the confirmation, yield and scrap quantities are primarily transferred to SAP. The transfer of
recorded actual times is not supported by SAP.
Communication with SAP R/3 takes place via two technical interfaces:
Download of planned orders via LO-SCI:
| IDoc type:     | LOIPLO01   |          |     |     |
| -------------- | ---------- | -------- | --- | --- |
| Segment Type:  | E1PLAFL    |          |     |     |
|                |   E1PLOPL  |          |     |     |
|                |            | E1PLUVL  |     |     |
|                |            | E1KBEDL  |     |     |
|                |   E1RESBL  |          |     |     |
Upload of confirmations for storage scenario:
| BAPI:    | RepManConfirmation1  |     |     |     |
| -------- | -------------------- | --- | --- | --- |
| Method:  | CreateMTS            |     |     |     |

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     | Page 6 of 47  |
| ------------------ | --- | ------------------- | --- | ------------- |

HYDRA Interfacing Module for SAP PP Serial Production
Planned Orders Download SAP  HYDRA
The download of data to HYDRA is initiated by R/3 through SAP workflow processes. The download of
planned orders is performed via the LO-SCI interface by means of IDoc LOIPLO01. The transfer is
always fully completed, which means that all planned orders available for the selection period chosen in
SAP are transferred to HYDRA. In HYDRA, these planned orders are created with the order type "REM".
Confirmation Upload HYDRA  SAP
The basis for confirmation to SAP are the log records collected in HYDRA. Depending on the
configuration, these may be T/U/E or H records. Collected yield and scrap quantities are uploaded
cyclically in accordance with the configuration in the HYDRA Scheduler. Confirmation is made through
the BAPI RepManConfirmation using the CreateMTS method via synchronous RFC (sRFC).
SAP-PPREM_82.docx Version: 1.0.23347 Page 7 of 47

HYDRA Interfacing Module for SAP PP Serial Production
3 Data type definitions
Type Description
CHAR x Information is left-aligned for the data type CHAR. Places that are not required are filled
with blanks (U+0020).
If the field is not used, it must be completely prepopulated with blanks.
Example: "ABCD "
NUM x Numeric field of the length x without sign. The data type NUMC only supports digits (ASCII
characters 30 Hex to 39 Hex). These digits are right-aligned and unnecessary places are
filled with zeros.
If the field is not used, it must be completely prepopulated with zeros (U+0030).
Example: "00000002"
DEC x.y Numeric field of the length x and y decimal places. A data field in HYDRA format is
preceded by a sign ("+" or "-") and includes a decimal point. Places that are not required
QUAN x.y
are filled with zeros.
If the field is not used, it must be completely prepopulated with zeros (U+0030) including
algebraic sign and decimal separator.
e.g. DEC 13,3:
 -1234567890,123  -1234567890.123
 234567890,3  +0234567890.300
Note:
The field length is indicated WITHOUT algebraic sign and WITHOUT decimal point in the
tabular description of the structure. This means, for example, that a field QUAN 13.3 is
converted to an external length of CHAR15.
DATE Format YYYYMMDD. If the field is not used, it must remain empty (filled with blanks
(U+0020).
TIME Format HHMMSS. If the field is not used, it must be set to “000000” (zeros with (U+0030)).
HYDRA does not support special characters for all alphanumeric fields. This includes, among
others: "\“ (backslash), "|“ (pipe), „ “ “ (double quotes), and " ’ “ (single quotes). You cannot
enter these characters using shop floor terminals and the MOC does not support them.
SAP-PPREM_82.docx Version: 1.0.23347 Page 8 of 47

HYDRA Interfacing Module for SAP PP Serial Production
The character " ; “ (semicolon) is used as a separator in the system. You must not use this
character in key fields (e.g. order/operation number, MES batch number, personnel number).
The character " % " (percent) is used as a placeholder for database communication. You should
not use this character to prevent the result from being falsified.
SAP-PPREM_82.docx Version: 1.0.23347 Page 9 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

4  Downloading Operation Data
Overview
| Message type:  | LOIPLO      |             |     |     |     |     |
| -------------- | ----------- | ----------- | --- | --- | --- | --- |
| IDoc type:     | LOIPLO01    |             |     |     |     |     |
| Segments:      | E2PLAFL001  |             |     |     |     |     |
|                |             | E2PLOPL001  |     |     |     |     |
|                |             |   E2KBEDL   |     |     |     |     |
|                |             | E2RESBL     |     |     |     |     |
Segment E2PLAFL001
Segment E2PLAFL001 includes data of the planned order header.
| Field name  | T  L  | D   | Description  |     | Usage in HYDRA  |     |
| ----------- | ----- | --- | ------------ | --- | --------------- | --- |
ABMNG  QUAN 14  3  Reduced quantity in planned order  Not used
AUFFX  CHAR  1    Fixing flag in planned order data  Not used
ANR.FU:29
| AUFNR  | CHAR  12    | Serial order number  |     |     | Not used  |     |
| ------ | ----------- | -------------------- | --- | --- | --------- | --- |
AVMNG  QUAN 14    Planned scrap quantity  OH.Target scrap in base quantity
| ANR.SGR:AUSB  |            |                      |     |     | unit               |     |
| ------------- | ---------- | -------------------- | --- | --- | ------------------ | --- |
| BESKZ         | CHAR  1    | Procurement type     |     |     | Not used           |     |
| DISPO         | CHAR  3    | Material controller  |     |     | OH.MRP controller  |     |
ANR.DISP
| EKORG  | CHAR  4    | Purchasing organization  |     |     | Not used  |     |
| ------ | ---------- | ------------------------ | --- | --- | --------- | --- |
GSBTR  DATS  8    Total confirmation date of planned order after  Not used
ATP check of components
| GLTRS  | DATS  8    | Scheduled end time   |     |     | Not used  |     |
| ------ | ---------- | -------------------- | --- | --- | --------- | --- |
GLUZS  TIMS  6    Earliest scheduled end time: Execution  Not used
GSMNG  QUAN 14    Planned order quantity  OH.Target quantity in base
| ANR.SGR:GUTB  |            |                        |     |     | quantity unit  |     |
| ------------- | ---------- | ---------------------- | --- | --- | -------------- | --- |
| GSTRS         | DATS  8    | Scheduled start time   |     |     | Not used       |     |
GSUZS  TIMS  6    Earliest scheduled start time: Execution (time)  Not used
KAPFX  CHAR  1    Flag: Planned order - capacities planned  Not used
| KDAUF  | CHAR  10    | Sales order number  |     |     | OH.Sales order  |     |
| ------ | ----------- | ------------------- | --- | --- | --------------- | --- |
ANR.KDAUF
KDPOS  CHAR  6    Item number in sales order  OH.Sales order item
ANR.KDPOS
LGORT  CHAR  4    Storage location  To be used as receiving storage
location in confirmation
ANR.LGORT
| MATNR  | CHAR  18    | Material number  |     |     | OH.Article  |     |
| ------ | ----------- | ---------------- | --- | --- | ----------- | --- |
ANR.ATK
| MDACC  | CHAR  4    | Planned order handling action  |     |     | Not used  |     |
| ------ | ---------- | ------------------------------ | --- | --- | --------- | --- |

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     | Page 10 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Field name  | T  L       | D  Description             | Usage in HYDRA  |
| ----------- | ---------- | -------------------------- | --------------- |
| MDACD       | DATS  8    | Planned order action date  | Not used        |
MDACH  CHAR  2    Planned order handling action control  Not used
MDACT  TIMS  6    Planned order handling action time  Not used
MDPBV  CHAR  1    Planned order confirmation availability  Not used
| MEINS         | UNIT  3    | Base quantity unit  | OH.Base quantity unit  |
| ------------- | ---------- | ------------------- | ---------------------- |
| ANR.SGE:GUTB  |            |                     | OP.Base quantity unit  |
| PAART         | CHAR  4    | Order type          | Not used               |
ANR.FU:45
PALTR  DATS  8    Resolution date (explosion date)  Not used
PEDTR  DATS  8    Order finish date in planned order  OH.Order finish date
ANR.DATSE
PERTR  DATS  8    Planned creation date in planned order  Not used
| PLNAL  | CHAR  2    | Group counter  | OH.Work plan  |
| ------ | ---------- | -------------- | ------------- |

| PLNNR  | CHAR  8    | Key of planned group  | OH.Work plan  |
| ------ | ---------- | --------------------- | ------------- |
ANR.APNR
| PLNTY  | CHAR  1    | Planned type  | Not used  |
| ------ | ---------- | ------------- | --------- |
PLNUM  CHAR  10    Planned order number  HYDRA order number according
| ANR.SAPAUNR  |            |                              | to configuration (*1)  |
| ------------ | ---------- | ---------------------------- | ---------------------- |
| PLSCN        | NUMC 3     | Long-term planning scenario  | Not used               |
| PLWRK        | CHAR  4    | Planning plant               | Not used               |
| PSPEL        | NUMC 24    | PSP element                  | OH.Project number      |
ANR:PRJNR
PSTTR  DATS  8    Order start date in planned order  OH.Order start date
ANR.DATFB
PWWRK  CHAR  4    Production plant in planned order  Used as actual plant in
confirmation
ANR:WERK:S
| SEQNR  | NUMC 14    | Order sequence number          | Not used  |
| ------ | ---------- | ------------------------------ | --------- |
| SERNR  | CHAR  8    | Serial number                  | Not used  |
| SOBES  | CHAR  1    | Special procurement type       | Not used  |
| SOBKZ  | CHAR  1    | Special inventory flag         | Not used  |
| STLFX  | CHAR  1    | Fixing flag for BOM explosion  | Not used  |
UMSKZ  CHAR  1    Implementation flag of planned order  Not used
VERID  CHAR  4    Production version   Stored for confirmation
ANR.FERTVER
VFMNG  QUAN 14    Planned order of confirmed quantity  Not used
WEBAZ  DEC  5    Processing time for goods receipt in days  Not used
| MATNR_EXTERNAL  | CHAR  40    | Long material number  | Not used  |
| --------------- | ----------- | --------------------- | --------- |
MATNR_VERSION  CHAR  10    Version number for MATNR field  Not used
MATNR_GUID  CHAR  32    External GUID for MATNR field  Not used
Segment E2PLOPL001
The segment E2PLOPL001 includes operation data.

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  | Page 11 of 47  |
| ------------------ | --- | ------------------- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Field name  | T  L  | D  Description  | Usage in HYDRA  |
| ----------- | ----- | --------------- | --------------- |
VORNR  CHAR  4    Operation number  HYDRA  operation  number
according to configuration (*1)
ANR.SAPVGNR
| PVZNR    | CHAR  4    | Superordinate operation  | Not used                      |
| -------- | ---------- | ------------------------ | ----------------------------- |
| ARBEH    | UNIT  3    | Work unit                | Not used                      |
| ARBEI    | QUAN 8     | Operation work           | Not used                      |
| ARBID    | NUMC 8     | Workplace ID             | Target workplace              |
| ANR.MNR  |            |                          | OP.Machine and/or OP.Machine  |
group
(see note)
| DAUNE  | UNIT  3    | Unit duration normal       | Not used  |
| ------ | ---------- | -------------------------- | --------- |
| DAUNO  | QUAN 6     | Normal operation duration  | Not used  |
FSEDD  DATS  8    Earliest scheduled end date: Execution (date)  Not used
FSEDZ  TIMS  6    Earliest scheduled end time: Execution (time)  Not used
FSAVD  DATS  8    Earliest scheduled start date: Execution (date)  Not used
FSAVZ  TIMS  6    Earliest scheduled start time: Execution (time)  Not used
FSSAD  DATS  8    Earliest scheduled start date: tear down/retool Not used
(date)
FSSAZ  TIMS  6    Earliest scheduled start time: tear down/retool Not used
(time)
FSSBD  DATS  8    Earliest  scheduled  start  date:  Processing Not used
(date)
FSSBZ  TIMS  6    Earliest  scheduled  start  time:  Processing Not used
(time)
| PLNFL  | CHAR  6    | Sequence  | Not used  |
| ------ | ---------- | --------- | --------- |
SSEDD  DATS  8    Latest scheduled end date: Execution (date)  Not used
SSEDZ  TIMS  6    Latest scheduled end time: Execution (time)  Not used
SSAVD  DATS  8    Latest scheduled start date: Execution (date)  Not used
SSVAZ  TIMS  6    Latest scheduled start time: Execution (time)  Not used
SSSAD  DATS  8    Latest scheduled start date: tear down/retool Not used
(date)
SSSAZ  TIMS  6    Latest scheduled start time: tear down/retool Not used
(time)
SSSBD  DATS  8    Latest scheduled start date: Processing (date)  Not used
SSSBZ  TIMS  6    Latest scheduled start time: Processing (time)  Not used
| USR04  | QUAN 15    | User field 04  | Partitioning (see note)  |
| ------ | ---------- | -------------- | ------------------------ |
ANR.TLG
| USR05  | QUAN 15    | User field 05  | Target cycle (see note)  |
| ------ | ---------- | -------------- | ------------------------ |
ANR.SZY
| USE04  | UNIT  3    | Unit user field 04  | Not used  |
| ------ | ---------- | ------------------- | --------- |
| USE05  | UNIT  3    | Unit user field 04  | Not used  |
| VGE01  | UNIT  3    | Unit of activity 1  | Not used  |
| VGE02  | UNIT  3    | Unit of activity 2  | Not used  |
| VGE03  | UNIT  3    | Unit of activity 3  | Not used  |
| VGE04  | UNIT  3    | Unit of activity 4  | Not used  |
| VGE05  | UNIT  3    | Unit of activity 5  | Not used  |

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  | Page 12 of 47  |
| ------------------ | --- | ------------------- | -------------- |

|     |     |     |  HYDRA Interfacing Module for SAP PP Serial Production  |     |     |
| --- | --- | --- | ------------------------------------------------------- | --- | --- |

| Field name  |     | T  L       | D                         | Description  | Usage in HYDRA  |
| ----------- | --- | ---------- | ------------------------- | ------------ | --------------- |
| VGE06       |     | UNIT  3    | Unit of activity 6        |              | Not used        |
| VGW01       |     | QUAN 10    | Default value activity 1  |              | Not used        |
ANR.VGW01
| VGW02  |     | QUAN 10    | Default value activity 2  |     | Not used  |
| ------ | --- | ---------- | ------------------------- | --- | --------- |
ANR.VGW02
| VGW03  |     | QUAN 10    | Default value activity 3  |     | Not used  |
| ------ | --- | ---------- | ------------------------- | --- | --------- |
ANR.VGW03
| VGW04  |     | QUAN 10    | Default value activity 4  |     | Not used  |
| ------ | --- | ---------- | ------------------------- | --- | --------- |
ANR.VGW04
| VGW05  |     | QUAN 10    | Default value activity 5  |     | Not used  |
| ------ | --- | ---------- | ------------------------- | --- | --------- |
ANR.VGW05
| VGW06  |     | QUAN 10    | Default value activity 6  |     | Not used  |
| ------ | --- | ---------- | ------------------------- | --- | --------- |
ANR.VGW06
| XDISP  |     | CHAR  1    | Flag: Operation/KBED is planned  |     | Not used  |
| ------ | --- | ---------- | -------------------------------- | --- | --------- |
| ANZMA  |     | DEC  7  2  | Number of employees              |     | Not used  |
ANR.MBVERH:NORM

Segment E2KBEDL
| Field name  |     | T  L  | D   | Description  | Usage in HYDRA  |
| ----------- | --- | ----- | --- | ------------ | --------------- |
BEDID  NUMC 12    Serial number of capacity requirements record  Not used
| BEDZL  |     | NUMC 8    | Internal counter  |     | Not used  |
| ------ | --- | --------- | ----------------- | --- | --------- |
CANUM  NUMC 4    Counter of capacity requirements record  Not used
| BEDKZ  |     | CHAR  1    | Availability indicator  |     | Not used  |
| ------ | --- | ---------- | ----------------------- | --- | --------- |
KABRREST  FTP  22    Remaining quantity clearing/retooling capacity Not used
demand
KABRSOLL  FTP  22    Clearing/retooling capacity demand  Not used
| KAPAR  |     | CHAR  3    | Capacity category  |     | Not used  |
| ------ | --- | ---------- | ------------------ | --- | --------- |
KAPID  NUMC 8    Capacity (number)  Only  records  of  capacity  type
"001" are transferred.
KBEAREST  FTP  22    Remaining  quantity  processing  capacity Not used
requirements
KBEASOLL  FTP  22    Processing capacity requirements  Processing  duration  (target  for
RPA11)
KEINH  UNIT  3    Unit of capacity requirements  Unit for processing time and setup
time (*2)
KRUEREST  FTP  22    Remaining  quantity  setup  capacity Not used
requirements
KRUESOLL  FTP  22    Setup capacity requirements  Setup duration (target for RPA7)
(*2)

| OH.xxx  | Field xxx in HYDRA order header  |     |     |     |     |
| ------- | -------------------------------- | --- | --- | --- | --- |
| OP.xxx  | Field xxx in HYDRA operation     |     |     |     |     |

| SAP-PPREM_82.docx  |     |     | Version: 1.0.23347  |     | Page 13 of 47  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module for SAP PP Serial Production
(*1) For more information on generating the HYDRA order number, please see below.
(*2) The contents of these fields must not exceed a duration of 590 hours.
SAP-PPREM_82.docx Version: 1.0.23347 Page 14 of 47

HYDRA Interfacing Module for SAP PP Serial Production
Notes on the operation structure
HYDRA order number (*1)
The HYDRA order number consists of a configurable part of the SAP key fields
E2PLAFL.PLNUM, E2PLOPL.VORNR The following steps are carried out to make sure the
order number is transferred to HYDRA in a standardized manner.
 When the CHAR fields are transferred, the system converts blank characters to "0", since the
barcode is also assigned "0" instead of blank characters.
 Two leading places are added to the SAP order number in order to calculate the HYDRA order
number. Consequently, HYDRA uses a number that is extended by two places compared to the
original SAP planned order number. This is taken into account if quantities are uploaded to SAP
for the planned order (series production).
 By default, the following conventions apply:
 PLNUM (=order) C8, VORNR (=operation) C4.
Operation quantity
The SAP IDoc type LOIPLO01 does not provide an explicit operation quantity. SAP only provides a
target yield and a target scrap quantity in the order header. This quantity is transferred to each
operation that is sent with this order. Any scrap quantities of the preceding operations cannot be
integrated.
Overview - how the user fields are used:
By default, HYDRA processes the user-specific fields USR04, USR05, USE04 and USE05 as
follows:
User field 04 (USR04):
HYDRA partitioning/cavity
User field 05 (USR05):
HYDRA target cycle in seconds per 1000 machine strokes
User field 04 unit (USE04):
Not used
User field 05 unit (USE05):
SAP-PPREM_82.docx Version: 1.0.23347 Page 15 of 47

HYDRA Interfacing Module for SAP PP Serial Production
Not used
HYDRA partitioning
If the user field USR04 includes a numeric value, the system enters this value as the partitioning in
the operation.
If this is not the case or if the value is "0", the system automatically enters the value 1 as the
partitioning.
SAP-PPREM_82.docx Version: 1.0.23347 Page 16 of 47

HYDRA Interfacing Module for SAP PP Serial Production
BDE cycle time
The system attempts to take the target cycle from the field E2PLOPL001.USR05. If this is not
possible as no target cycle is entered (i.e. the field is "0"), the system uses the following formula to
calculate the target cycle using the processing time value of the segment E2KBEDL.KBEASOLL. To
do so, this segment must include a capacity type record "001":
int((E2KBEDL.KBEASOLL / (E2PLAFL.GSMNG / E2PLOPL001.USR04)) * 1000)
Standard times
In HYDRA the content of the field E2KBEDL.KBEASOLL specifies the standard time for machine
assignment (target for RPA 11).
In HYDRA the content of the field "E2KBEDL.KRUESOLL" specifies the standard time for the
machine setup (target for RPA 7).
Information on the workplace - ARBID field:
- The workplace ID (ARBID) is not the workplace number as it is stored in the work plan but the unique
ID of the workplace. Data is collected in HYDRA and uploaded to SAP R/3 PP-REM for the
workplace entered in this field.
SAP-PPREM_82.docx Version: 1.0.23347 Page 17 of 47

HYDRA Interfacing Module for SAP PP Serial Production
5 Uploads
Usage
Quantities recorded in HYDRA can be uploaded automatically to SAP series production where they can
be posted. These are mere quantity postings. SAP does not provide for the transfer of actual SAP
activities.
Uploads are performed by synchronous RFC (sRFC). SAP posts the uploads by calling the BAPI
RepManConfirmation1 using the CreateMTS method. If posting cannot take place in SAP, it will be
recorded in an error log. The event is generated (SAP.OUTBOUND_FM_POST_ERROR) if HYDRA
Escalation Management is used for HYDRA MES Link Enabling (license SIS-ESK and SAP-ESK).
Record types supported by HYDRA
HYDRA-BDE uploads recorded quantities (yield and scrap) to SAP R/3 PP. The customizing settings
configured for the HYDRA order type determine which record types represent the basis for HYDRA
uploads.
If the upload of partial quantity uploads is enabled the quantities will be taken from the generated T
records. The field SCRAPREASON of the upload structure is assigned the recorded scrap reason. The U
records are not uploaded in this case. The generated E record is transferred with the quantities of the
generated T record, provided that quantities have been recorded at all. Yield and scrap are each
uploaded in individual records to SAP R/3.
If partial quantity uploads are not configured for being uploaded, the quantities will be taken from the
interrupted operations (U record) or logged off operations (E record) recorded in HYDRA. Scrap reasons
are not transferred. Yield and scrap are each uploaded in individual records to SAP R/3.
Records having the quantity "0" are not uploaded to SAP, irrespective of whether the upload of partial
uploads has been enabled or not. However, this can also result in the final upload of an operation not to
be transferred to SAP, as this posting does not include a quantity.
Upload structures of the BAPI RepManConfirmation1
Upload structure BflushFlags
This structure specifies the type of upload.
Field T L D Description Usage in
HYDRA
SAP-PPREM_82.docx Version: 1.0.23347 Page 18 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

BCKFLTYPE   CHAR  2    Backflushing type of a BAPI  "02" - has to be
|     |     | backflush (upload)  | discussed in detail with  |     |
| --- | --- | ------------------- | ------------------------- | --- |
the customer!
RP_SCRAPTYPE   CHAR  1    Scrap type for reporting point  Fixed "1“ scrap at the
|     |     | scrap backflush (upload)  | specified-  |     |
| --- | --- | ------------------------- | ----------- | --- |
  reporting point
ACTIVITIES_TYPE   CHAR  1    Scope of the separated activity  Not used.
backflush (upload)
COMPONENTS_TYPE   CHAR  1    Scope of the separated goods  Not used.
issue posting
Upload structure BFlushDataMTS
The structure includes the reporting point for which the data included in the structure BflushdataGen
apply.
| Field      | T  L       | D  Description   | Usage in HYDRA    |     |
| ---------- | ---------- | ---------------- | ----------------- | --- |
| REPPOINT   | CHAR  4    | Reporting point  | Operation number  |     |

Upload structure BFlushDataGen
The structure BflushdataGen transfers actual user data to SAP.
| Field  | T  L  | D  Description  | Usage in HYDRA  |     |
| ------ | ----- | --------------- | --------------- | --- |
PDC_NUMBER   CHAR  12    PDC number (unique ID for all  "HY“+reference from
|     |     | PDC systems)  | ADE_PROTOKOLL  |     |
| --- | --- | ------------- | -------------- | --- |
MATERIALNR   CHAR  18    Material number   Material number from planned
| ANR.ATK  |     |     | order  |     |
| -------- | --- | --- | ------ | --- |
Ak.Artikelnummer
| PRODPLANT  | CHAR  4    | Plant  | Specified plant  |     |
| ---------- | ---------- | ------ | ---------------- | --- |
ANR.WERK:S
| PLANPLANT  | CHAR  4    | Planning plant   | Specified plant  |     |
| ---------- | ---------- | ---------------- | ---------------- | --- |
ANR.WERK:S
STORAGELOC   CHAR  4    Receiving storage location for  Specified storage location
| ANR.LGORT  |     | repetitive manufacturing  |     |     |
| ---------- | --- | ------------------------- | --- | --- |
PRODVERSION   CHAR  4    Production version   Production version from
| ANR.FERTVER  |     |     | planned order  |     |
| ------------ | --- | --- | -------------- | --- |
PRODLINE   CHAR  8    Production line for repetitive  Not used.
manufacturing
| PLANNINGID   | CHAR  8    | Planning ID 2   | Not used.  |     |
| ------------ | ---------- | --------------- | ---------- | --- |
BATCH   CHAR  10    Receiving batch for repetitive  Not used.
manufacturing
POSTDATE   DATS  8    Posting date in the document  Shift date of the posting
ADEPRO.SKDAT
DOCDATE   DATS  8    Document date in document  Upload date
DOCHEADERTXT   CHAR  25    Document header text  Not used.
BACKFLQUANT  QUAN 13  3  Quantity in unit of entry  Yield in primary quantity unit
ADEPRO.EGR:GUTP
SCRAPQUANT   QUAN 13  3  Scrap quantity  Scrap quantity in primary
quantity unit
ADEPRO.EGR:AUSP

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     | Page 19 of 47  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module for SAP PP Serial Production
Field T L D Description Usage in HYDRA
UNITOFMEASURE UNIT 3 Unit of measure for backflush OP target quantity unit of the
ADEPRO.EGE:GUTP quantity and for actual scrap primary quantity
UNITOFMEASURE_ISO CHAR 3 ISO code for unit of measurement Not used.
SCRAPREASON CHAR 4 Reason for scrap Scrap reason (when
transferring partial uploads)
REVLEVEL CHAR 2 Revision level Not used.
PLANORDER CHAR 10 Planned order number SAP planned order according
to specifications
ORDERCOSTS CHAR 1 Indicator: Post with order costs Not used.
(lot-size independent)
INCLCOMPSCRAP CHAR 1 Indicator: Post with component Not used.
scrap
MATERIALNR_EXTERNAL CHAR 40 Long material number (future Not used.
development) for the field MATER
MATERIALNR_GUID CHAR 32 External GUID (future Not used.
development) for the field
MATERIALNR
MATERIALNR_VERSION CHAR 10 Version number (future Not used.
development) for the field
MATERIALNR
Please note:
It is not possible to upload quantities using partial uploads and to record them by the total quantity
counter at MDE machines at the same time. This input type can result in negative quantity postings for
the yield if OPs are finished.
This restriction does no longer apply, if it is possible to process such negative postings (e.g. by using the
SAP standard BAPI or customized processing).
SAP-PPREM_82.docx Version: 1.0.23347 Page 20 of 47

HYDRA Interfacing Module for SAP PP Serial Production
6 Application-Relevant Settings in SAP
Define production scheduler
Scheduling settings for planned orders are defined for each plant/order type and production scheduler.
The production scheduler can be edited as a part of the customizing in SPRO  Production 
Production control  master data  routing data  define production scheduler (OPJ8).
Configure scheduling parameters
Scheduling options can now be configured for planned orders by the production scheduler. This is also
performed in customizing using SPRO Production  capacity planning  master data  operations 
scheduling  define scheduling parameters for planned orders (OPU5).
If the scheduling level “by detailed scheduling” is configured there operations will also be transferred
when downloading planned orders.
Configure serial production profile
The serial production profile defines how uploads are to be performed (counting point upload/post
services…). This is configured in customizing using SPRO  Production  serial production  control 
define serial production profiles.
Definition of user fields
Selected user fields of the work plan/operation are transferred from SAP by the PP-REM interface.
HYDRA provides a default interpretation for these fields. A user field key has to be defined and saved for
the operation within the work plan to be able to define values in user fields in SAP.
User field keys are defined in customizing using SPRO  production  production control  master data
 work plan data define user fields (OPEC).
A meaning is to be defined for the following user fields:
SAP user field SAP user field in the download Meaning
structure
USR04 USR04 Partitioning
USR01 USR05 Target cycle
The created user field key and corresponding values are to be defined for the operation within the routing.
SAP-PPREM_82.docx Version: 1.0.23347 Page 21 of 47

HYDRA Interfacing Module for SAP PP Serial Production
Maintenance of the SAP partner agreement/profile – outbound
Maintain the following settings for outbound processing of the SAP partner agreement/profile (WE20):
Parameter name Value
To download production orders
Partner number Created logical system
Partner type LS
Message type LOIPLO
Recipient port Created port
Package size 1
Output mode Transfer IDoc immediately
Basis type LOIPLO01
Maintenance of the SAP distribution model – outbound
Parameter name Value
To download planned orders
Model view Created model view
Sender / client Logical system of the client
Recipient/erver Logical system for the recipient system
Message type LOIPLO
Hide unnecessary segments
If specific segments of the IDoc are not to be transferred (e.g. the segment for the components is not to
be transferred as they are only transferred in relation to the header) this can be realized as a part of the
customizing using the transaction BD56.
SAP-PPREM_82.docx Version: 1.0.23347 Page 22 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

However, the SAP partner agreement/profile has to be maintained to be able to use this configuration.
IDoc enhancement
SAP standard provides the option to enhance the IDoc by customer-specific data without modification:
| Enhancement  | LOI00001           |     |     |
| ------------ | ------------------ | --- | --- |
| User exit    | EXIT_SAPLLOI1_001  |     |     |

Planning of relevant jobs
The following programs/ reports must be planned as job to ensure that the PP-REM interface will operate
automatically:
| Program / report  | Meaning   | Note  |     |
| ----------------- | --------- | ----- | --- |
RCCLTRAN  Start of the download for planned  Planning as variant
orders according to the selection

Relevant transactions
| Transaction  | Meaning                            | Note  |     |
| ------------ | ---------------------------------- | ----- | --- |
| POIT         | Start of the download for planned  | -     |     |
orders

| SAP-PPREM_82.docx  | Version: 1.0.23347  |     | Page 23 of 47  |
| ------------------ | ------------------- | --- | -------------- |

HYDRA Interfacing Module for SAP PP Serial Production
7 Application-Relevant Settings in HYDRA
Maintenance of the HYDRA distribution model – inbound
Maintain entries for HYDRA inbound processing in the HYDRA distribution model:
Parameter name Value
To process production orders
Message type LOIPLO
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to be used>
Description PP-REM– Download of planned orders
Log. Target system Created logical system
Retention period 10
Configuration of segment sorting
It might be required to re-sort segments if the SAP message type LOIPLO is enhanced using the user exit
that is provided by default in SAP.
The SAP user exit allows to transfer additional data (= additional segments). However, this is only
possible directly below the order header segment. If, for example, a component record is transferred at
this position it cannot be posted, as the operations created by the standard segment are not yet available.
A configuration in the HYDRA INI configuration file allows to enhance the segment number (on which
sequential processing is based) by a prefix before this number is inserted in the database and, as a
result, to enable an alternative sorting.
The transfer of the planned order number is enabled as follows in the HYDRA-INI configuration:
Parameter name Value
INI name HYALESRV
SAP-PPREM_82.docx Version: 1.0.23347 Page 24 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameter name  | Value          |     |
| --------------- | -------------- | --- |
| Section         | <MESTYP>_SORT  |     |
e.g. LOIPLO_SORT
| Key  | <Segment name>  |     |
| ---- | --------------- | --- |
e.g. Z2BAPI000
| Value  | <prefix>  |     |
| ------ | --------- | --- |
e.g. Z
| Active   | Yes                                       |     |
| -------- | ----------------------------------------- | --- |
| Comment  | PP-REM – setting of the segment sorting   |     |

The service “HYDRA<client number> MLE-Server SAP 1“ has to be restarted to activate the
configuration.

Maintenance of the HYDRA distribution model – outbound
Edit an entry for HYDRA outbound processing in the HYDRA distribution model:
Parameter name  Value
To upload time tickets
Message type  REPMANCONFIRMATION1_CREATEMTS
Description  PP-REM – Upload
IDoc type  BFLUSHDATAMTS
Retention period  10
Log. target system  Created logicl system
Segment name 1  BFLUSHDATAMTS

| SAP-PPREM_82.docx  | Version: 1.0.23347  | Page 25 of 47  |
| ------------------ | ------------------- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

Maintenance of the HYDRA Scheduler
Edit entries for HYDRA outbound processing in the HYDRA Scheduler:
| Parameter name  | Value  |     |     |
| --------------- | ------ | --- | --- |
For uploads from the application to the MLE outbound transactions
| Product key         | SAP-PPREM                      |                 |           |
| ------------------- | ------------------------------ | --------------- | --------- |
| License key         | SAP-PPREM                      |                 |           |
| Command (Windows):  | sh.exe                         | ./myerprck.scr  | /MESTYP=  |
|                     | REPMANCONFIRMATION1_CREATEMTS  |                 | /KAT=FA   |
/RMTYP=REM
| Command (Unix):  | ./myerprck.scr                 |     | /MESTYP=  |
| ---------------- | ------------------------------ | --- | --------- |
|                  | REPMANCONFIRMATION1_CREATEMTS  |     | /KAT=FA   |
/RMTYP=REM
| Comment:  | SAP-PPREM: upload  MLE outbound transactions  |     |     |
| --------- | ---------------------------------------------- | --- | --- |
| Interval  | 5                                              |     |     |
For uploads from MLE outbound transactions to SAP PP-REM
| Product key  | SAP-PPREM  |     |     |
| ------------ | ---------- | --- | --- |
| License key  | SAP-PPREM  |     |     |
Command (Windows):  sh.exe  ./hysapupl.scr  /UPLSEGNAM=BFLUSHDATAMTS
/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON
| Command (Unix):  | ./hysapupl.scr  | /UPLSEGNAM=BFLUSHDATAMTS  |     |
| ---------------- | --------------- | ------------------------- | --- |
/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON
Comment:  SAP-PPREM: Upload MLE outbound transactions -_> SAP
| Interval  | 5   |     |     |
| --------- | --- | --- | --- |

Please proceed as follows if you use the upload to SAP PP-REM on a HYDRA system at the
  same time as the upload to SAP PP using PP-PDC:

| SAP-PPREM_82.docx  | Version: 1.0.23347  |     | Page 26 of 47  |
| ------------------ | ------------------- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

Maintain the upload type “PP” (customizing) for production orders at the HYDRA order type.
Add the parameter “/RMTYP=PP“ for calling the upload of time tickets to SAP using PP-PDC in
the HYDRA Scheduler
Keep the upload type “REM” for planned orders/serial production at the HYDRA order type.
Maintain the script myerprck.scr by the parameter “/RMTYP=REM” as specified above for
calling uploads to SAP serial production in the HYDRA Scheduler“

Configuration of uploads
The BAPI used for uploads to SAP serial production supports several upload modes. They can be
configured subject to the requirements in HYDRA:
Definition of the reference to the planned order
If the upload is to be performed in relation to the planned order this can be set by the die HYDRA-
INI configuration. By default, uploads are performed without indicating the planned order number.
In case the planned order is uploaded at the same time as the planned order quantity, posting
errors will be the result, as the planned order might no longer exist at this point in time.
The transfer of the planned order number is enabled in the HYDRA-INI configuration as follows:
| Parameter name  | Value          |                                                    |     |
| --------------- | -------------- | -------------------------------------------------- | --- |
| INI name        | PP-REM         |                                                    |     |
| Section         | BFLUSHDATAGEN  |                                                    |     |
| Key             | PLANORDER      |                                                    |     |
| Value           | TRANSFER       | transfer of the planned order                      |     |
|                 | SUPPRESS       | the planned order is not transferred (by default)  |     |
| Active          | Yes            |                                                    |     |
Comment  PP-REM: activation of the transfer of the planned order number

Define upload type
It is up to your decision whether you use a counting point upload (by default) or an end upload.

| SAP-PPREM_82.docx  | Version: 1.0.23347  |     | Page 27 of 47  |
| ------------------ | ------------------- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

If you decide in favor of a counting point upload the operation number will be transferred with the
upload.
With the counting point upload the SAP systems withdraws all material components consumed at
the uploaded counting point process in a retrograde manner, posts the services accrued for the
uploaded counting point operation, reduces secondary requirements of the planned orders and
updates the information included in the logistic information system.
With  counting  point  uploads  scrap  is  uploaded  as  scrap  for  the  specified  counting  point
(BFLUSHFLAGS.RP_SCRAPTYPE = „1“).
The end upload function is used if you want to perform the upload and actual data collection at the
end of the production process.
The upload type is defined as described-below in the HYDRA-INI configuration:
| Parameter name  | Value      |     |
| --------------- | ---------- | --- |
| INI name        | PP-REM     |     |
| Section         | BCKFLTYPE  |     |
| Key             | BCKFLTYPE  |     |
Value  01  upload as end upload without reference to the operation
02  upload as counting point upload with reference to the
operation
| Active   | Yes                                    |     |
| -------- | -------------------------------------- | --- |
| Comment  | PP-REM: definition of the upload type  |     |

| SAP-PPREM_82.docx  | Version: 1.0.23347  | Page 28 of 47  |
| ------------------ | ------------------- | -------------- |

|     |     |     |  HYDRA Interfacing Module for SAP PP Serial Production  |     |     |
| --- | --- | --- | ------------------------------------------------------- | --- | --- |

8  Escalation SAP.OUTBOUND_FM_POST_ERROR
Usage
If an error  occurs while  uploading  data  for serial  production, the application will provide  an event
SAP.OUTBOUND_FM_POST_ERROR that can be evaluated and forwarded by Escalation Management.
As part of serial production, the escalation fields are assigned as follows:
Prerequisites:
hysapupl.exe/out V8.1.1.91

db_sql/dbp_esk_sap_outbound_fm_post_error.hsc

| Data  field  | of  the  | Value(s)  |     | Meaning  |     |
| ------------ | -------- | --------- | --- | -------- | --- |
escalation
SAP.FB  BAPI_REPMANCONF1_CREATE_MTS  Name of the function module in
SAP
| TYPE  |     | 'E'  - for errors  |     | Subject to the business error  |     |
| ----- | --- | ------------------ | --- | ------------------------------ | --- |
'W' - for warnings
'A' - for interruptions
| ID       |     | Message ID      |     | Subject to the business error  |     |
| -------- | --- | --------------- | --- | ------------------------------ | --- |
| Number   |     | Message number  |     | Subject to the business error  |     |
| Message  |     | Message text    |     | Subject to the business error  |     |

The function module BAPI_REPMANCONF1_CREATE_MTS has a return structure that is provided as
export parameter. Consequently, only one error message may occur every time the function module is
called.

| SAP-PPREM_82.docx  |     |     | Version: 1.0.23347  |     | Page 29 of 47  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module for SAP PP Serial Production
9 SAP Order Sequencing
Overview
HYDRA menu System administration  MES Link Enabling  SAP order sequencing
FEDRA menu System administration  MES Link Enabling  SAP order sequencing
Transaction code mleoss
Function authorization mleoss.*
Purpose
Use the SAP order sequencing to control how the workplaces specified by SAP are transferred to the
system. You can choose from the following options:
 The workplace transferred from SAP is interpreted as HYDRA group and the operation is planned
in the pool of groups (backlog for machine group).
 The HYDRA group is selected for the workplace transferred from SAP and the operation is
planned in the pool of groups (backlog for machine group).
 The HYDRA group is selected for the workplace transferred from SAP and the operation is
directly planned for the machine.
This decision either affects the workplace or the entire system.
Integration
Diverse interfaces use these configurations to transfer orders from SAP.
Requirements
You have created workplaces and groups in the system.
Field descriptions
Key
Use this field to specify whether the entry applies to a specific order type or a machine.
In general, the configuration refers to a workplace.
Value
If you selected order type as the key, use this field to enter the order type the configuration applies
for.
SAP-PPREM_82.docx Version: 1.0.23347 Page 30 of 47

HYDRA Interfacing Module for SAP PP Serial Production
If you selected machine as the key:
 Enter a separate workplace in the value field if the configuration should apply for a specific
workplace.
 Enter the value SYSTEM if you want the configuration to apply for the entire system.
Configurations referring to a specific machine take priority over the SYSTEM setting.
You can make a system entry for the majority of machines/workplaces/work centers and
exceptions may be configured specifically.
Detailed planning
 G
"Transfer the SAP workplace as HYDRA group, plan operation in the pool of groups (backlog for
machine group)."
 M
"Transfer the SAP workplace as HYDRA workplace, identify the HYDRA group, plan operation in
the pool of groups (backlog for machine group)."
 N
"Transfer the SAP workplace as HYDRA workplace, identify the HYDRA group, and plan the
operation for the workplace."
 Rule 1 - Rule 9
Use the rules 1 to 9 for customer-specific transfer logics, which will be implemented as part of the
project.
SAP-PPREM_82.docx Version: 1.0.23347 Page 31 of 47

HYDRA Interfacing Module for SAP PP Serial Production
10 Protecting fields of planned operations
Purpose
Use the configuration described in this document to prevent specific data fields of a (planned) operation
from being overwritten when the operation is transferred once more via the ERP interface.
This function only affects ANR.MODIFY and/or ANR.UPDATE and operations.
Operations are only updated if the status of the order/operation generally allows it. The
configuration described below does not apply if the status (see order status assignment) cannot
be changed in general.
Requirements
You require the relevant function authorization to access INI configuration and INI data configuration.
Procedure from service pack 12 onwards (b_anr.dll version 8.1.1.354)
Create a new entry in the INI configuration:
Field name Value
Name BAPINOUPDATE
Description Enter a description.
For this entry, create an entry including the following values in INI data configuration:
Field name Value
Section ANR
Key List the fields (HYDRA BAPI acronyms) that are not overwritten.
Value The value includes a condition. Enter the condition, for example, as follows:
ANR.ATYP=AG
Active Yes
Use "@" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions
are processed one after the other.
You can define the values for "key" and "value" separately. The entries are processed one after the other.
The conditions entered in the "value" field correspond to an AND operation.
SAP-PPREM_82.docx Version: 1.0.23347 Page 32 of 47

HYDRA Interfacing Module for SAP PP Serial Production
As of service pack 12 only use the "@" character as separator if you create new entries or
change existing ones. You do not have to change existing configurations (prior to service pack
12). In this case, the "|" character is still supported.
You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as
you define the values for "key" and "value" separately.
Procedure up to service pack 11
Create a new entry in the INI configuration:
Field name Value
Name BAPINOUPDATE
Description Enter a description.
For this entry, create an entry including the following values in INI data configuration:
Field name Value
Section ANR
Key List the fields (HYDRA BAPI acronyms) that are not overwritten.
Value Enter the condition that has to be met to make sure fields will not be
overwritten. Enter BAPI acronyms including value.
Active Yes
Use "|" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions
are processed one after the other.
Up to service pack 11 only use the "|" character as separator.
You can define the values for "key" and "value" separately. The entries are processed one after the other.
The conditions entered in the "value" field correspond to an AND operation.
You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as
you define the values for "key" and "value" separately.
If you cannot enter the pipe character ("|") using the GUI, you can still enter the values via the database:
 To do so, create a new entry as described above via the INI configuration. Now use the following
SQL statement to determine the internal DB counter for the header entry in the INI configuration:
SAP-PPREM_82.docx Version: 1.0.23347 Page 33 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

select * from hyd_ini
  Determine the value of the "VERWEIS" column for the new entry.
  Create the required entries. Use the following SQL statement to assign the database table fields
and application fields as described below:
insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung, aktiv)
values (<reference from previous SQL>, 'ANR', '<fields to be protected>', '<values>',
'<comment>', 'J')
Use the "|" (pipe) character to separate the acronyms of the fields you want to protect and the
acronyms of the values.
Use a pipe character "|" to complete the list of the fields you want to protect
  and the list of values.
| Database field  | Values/content                              |     |
| --------------- | ------------------------------------------- | --- |
| INI_VERWEIS     | The value of the VERWEIS column identified  |     |
from the HYD_INI table via SQL.
| SECTION              | Section  |     |
| -------------------- | -------- | --- |
| IDENT                | Key      |     |
| VALUE                | Value    |     |
| BEMERKUNG (comment)  | Comment  |     |
| AKTIV                | Active   |     |

List of frequently used acronyms
The following table lists the most frequently used acronyms and their meaning. Please contact MPDV
Support if the list does not include the acronym you require.
Acronym  Meaning
ANR.MGRP  Machine group
ANR.MNR  Workplace/
machine
ANR.OPT:PLAN  Planning indicator:
M  Planned for workplace/machine
G  Planned for machine group
ANR.DATB  Start date planned (via HLS)
ANR.ZEIB  Start time planned (via HLS)
ANR.DATE  End date planned (via HLS)
ANR.ZEIE  End time planned (via HLS)

| SAP-PPREM_82.docx  | Version: 1.0.23347  | Page 34 of 47  |
| ------------------ | ------------------- | -------------- |

HYDRA Interfacing Module for SAP PP Serial Production
Example: protect the planned workplace
If the operation is planned on a workstation, you have to prevent the ERP interface from cancelling this
planning. To do so, enter the below-mentioned data:
Field name Value
Section ANR
Key ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@
Value ANR.ATYP=AG@ANR.OPT:PLAN=M@
Active Yes
SLQ statement:
insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,
aktiv) values (<reference from previous SQL>, 'ANR',
'ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@', 'ANR.ATYP=AG@ANR.OPT:PLAN=M@', '<comment>',
'J')
Example: protect the start/end dates of a planned OP
If the operation is planned on a workstation and, as a result, its start time is specified, you have to prevent
the ERP interface from cancelling this planning. To do so, enter the below-mentioned data:
Field name Value
Section ANR
Key ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@
Value ANR.ATYP=AG@ANR.OPT:PLAN=M@
Active Yes
SLQ statement:
insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,
aktiv) values (<reference from previous SQL>, 'ANR',
'ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@', ' ANR.ATYP=AG@ANR.OPT:PLAN=M@',
'<comment>', 'J')
SAP-PPREM_82.docx Version: 1.0.23347 Page 35 of 47

   HYDRA Interfacing Module for SAP PP Serial Production

11  MYERPRCK - Program Parameters
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Purpose
Use the upload program myerprck.exe/out to create confirmations/uploads to higher-level systems. In
addition to the settings you make directly in the applications, you can also use program parameters to
control confirmations/uploads.
Integration
The confirmation/upload is integrated with numerous components, for example:
  Shop floor data collection
  Tracking and tracing as well as material and production logistics
  Detailed scheduling
Available program parameters:
| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
Program parameters to control processing:
/MESTYP=XXXX  The  parameter  MESTYP  defines  the  All  Yes
structure to be generated.
/GRP=XXXX  The grouping type specifies the criterion  Requires  Requires
by  which  uploads  should  be  grouped.  customizations  customizations
Possible values:
PLANT --> Groups by plant
/V=sssss  Since  SAP  R/3  PP  does  not  support  EIS-ERP  Yes
|     | correction  | postings,  | HYDRA  allows  | to  |     |
| --- | ----------- | ---------- | -------------- | --- | --- |
EIS-XPPS
|     | retain      | confirmations/uploads  |            | for     |     |
| --- | ----------- | ---------------------- | ---------- | ------- | --- |
|     | correction  | purposes               | in  HYDRA  | for  a  |     |
SAP-PPPDC
specific period of time.
SAP-PPREM
Use the parameter /V=sssss  (sssss =

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 36 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |           |     |                | Relevant    | Productive  |
| ----------- | ------------ | --- | --------- | --- | -------------- | ----------- | ----------- |
|             |              |     |           |     |                | interfaces  | release     |
|             | delay  time  | in  | seconds)  | to  | activate  the  | SAP-PPPI    |             |
above described delay when the upload
SAP-PMCC3
program is called.
SAP-PSCC4
Examples:
SAP-COILV
  myerprck.exe/out /V=3600
The system only uploads postings
that are older than one hour.
| /BIS=DDMMYYHHMM  | Use         | the  | parameter  |     | /BIS=        | EIS-ERP   | Yes  |
| ---------------- | ----------- | ---- | ---------- | --- | ------------ | --------- | ---- |
|                  | DDMMYYHHMM  |      | (date      | +   | time)  when  |           |      |
| /BIS=HHMM        |             |      |            |     |              | EIS-XPPS  |      |
calling the upload program to enter the
delay as a point in time. You can enter
| /TILLDATE=MM/DD/YYYY  |     |     |     |     |     | SAP-PPPDC  |     |
| --------------------- | --- | --- | --- | --- | --- | ---------- | --- |
this point in time with date and time or
/TILLTIME=sec  after  you can just enter the time in the format  SAP-PPREM
| midnight  | "HHMM".  | In  the  | latter  | case,  | the  time  |     |     |
| --------- | -------- | -------- | ------- | ------ | ---------- | --- | --- |
SAP-PPPI
refers to the current day.
SAP-PMCC3
  Myerprck.exe
/BIS=2505110600
SAP-PSCC4
|     | This  | parameter  |     | uploads  | postings  |     |     |
| --- | ----- | ---------- | --- | -------- | --------- | --- | --- |
SAP-COILV
that were recorded until 06:00 a.m.
on 25 May 2011.
|     |   Myerprck.exe  |            |     |          | /BIS=0600  |     |     |
| --- | --------------- | ---------- | --- | -------- | ---------- | --- | --- |
|     | This            | parameter  |     | uploads  | postings   |     |     |
that were recorded until 06:00 a.m.
of the current day.
/TZ=+/-sssss  Use the parameter /TZ=+/-sssss to adapt  SAP-PPPDC  Yes
|     | uploads  | to  different  |     | time  | zones.  The  |     |     |
| --- | -------- | -------------- | --- | ----- | ------------ | --- | --- |
parameter adjusts the time specifications
|     | entered  |     | in  | the  | fields  |     |     |
| --- | -------- | --- | --- | ---- | ------- | --- | --- |
EXEC__START_TIME,
EXEC_FIN_TIME and LOGTIME of the
|     | upload  | structure  | of  | the  | SAP-PPPDC  |     |     |
| --- | ------- | ---------- | --- | ---- | ---------- | --- | --- |
interface according to its specifications.

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     |     | Page 37 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/KST=XXX  Use this parameter to restrict the data to  EIS-ERP  Yes
|     | be  uploaded.  | In  this  | case,  the  system  |     |     |
| --- | -------------- | --------- | ------------------- | --- | --- |
ESI-XPPS
|     | only  uploads  | data  of  | a  specified  cost  |     |     |
| --- | -------------- | --------- | ------------------- | --- | --- |
center.
SAP-PPPDC
|     | Use  the  | parameter  /KST=XXX  | (XXX  | =   |     |
| --- | --------- | -------------------- | ----- | --- | --- |
SAP-PPREM
cost center, a max. of 8 characters) when
|     | calling           | the  upload  | program     | SAP-PPPI  |     |
| --- | ----------------- | ------------ | ----------- | --------- | --- |
|     | myerprck.exe/out  | to  enable   | the  above- |           |     |
SAP-PMCC3
|     | described      | restriction.   | Then  the  system  |     |     |
| --- | -------------- | -------------- | ------------------ | --- | --- |
|     | only  uploads  | data  records  | that  were         |     |     |
SAP-PSCC4
posted to machines of the specified cost
|     | center.  | The  system  | checks  the  cost  | SAP-COILV  |     |
| --- | -------- | ------------ | ------------------ | ---------- | --- |
center of the machine/workplace that is
|     | entered  | as  | the  posting  |     |     |
| --- | -------- | --- | ------------- | --- | --- |
workplace/machine in the posting record.
The system only checks the cost center
of the workplace/machine.
You can specify the parameter several
times per call.
Example:
|     |   Myerprck.exe  |     | /KST=BDE100  |     |     |
| --- | --------------- | --- | ------------ | --- | --- |
/KST=BDE200
The system only uploads records
that were posted onto machines of
the cost center BDE100/BDE200.
/CLEAR_RES  Use  the  parameter  "/CLEAR_RES“  to  SAP-PPPDC  Yes
assign an "X" to the field CLEAR_RES of
the upload structure when it comes to a
|     | final  confirmation/upload  |     | (record  type  |     |     |
| --- | --------------------------- | --- | -------------- | --- | --- |
L40). Consequently, SAP will clear open
reservations for the respective order.
/NEG_MENGE  By  default,  quantities  (L20/L40)  cannot  SAP-PPPDC  Yes

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 38 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use            |     |      |            |      | Relevant    | Productive  |
| ----------- | ---------------------- | --- | ---- | ---------- | ---- | ----------- | ----------- |
|             |                        |     |      |            |      | interfaces  | release     |
|             | be  uploaded           | to  | SAP  | PP  using  |      | partial     |             |
|             | confirmations/uploads  |     |      | via        | the  | SAP-        |             |
PPPDC interface if data is collected at
|     | the  same  | time  | via  | the  total  | quantity  |     |     |
| --- | ---------- | ----- | ---- | ----------- | --------- | --- | --- |
counter of MDE machines, since SAP is
not able to process negative quantities.
|     | This  type  | of  | collection  | can  | result  | in  |     |
| --- | ----------- | --- | ----------- | ---- | ------- | --- | --- |
negative quantity postings for yield when
OPs are finished.
This restriction does no longer apply, if it
|     | is  possible  | to  | process  | such  | negative  |     |     |
| --- | ------------- | --- | -------- | ----- | --------- | --- | --- |
postings (e.g. by using the SAP standard
|     | BAPI  or  | customizations).  |               | In  | this       | case,  |     |
| --- | --------- | ----------------- | ------------- | --- | ---------- | ------ | --- |
|     | you  can  | use               | the  program  |     | parameter  |        |     |
/NEG_MENGE to enable the upload of
these quantities.
/LA_MNR  The SAP_PMCC3 interface requires the  SAP-PMCC3  Yes
activity type to be uploaded to SAP PM.
The activity type can be identified via the
|     | machine/workplace  |     | where  |       | the  posting  |     |     |
| --- | ------------------ | --- | ------ | ----- | ------------- | --- | --- |
|     | was  performed.    |     | Use    | this  | program       |     |     |
parameter to enable identification of the
activity type.
Then the system uses the machine to
identify the activity type from the activity
types kept in HYDRA.
/IDENT_PRAEFIX=  In  the  upload  structure  of  the  SAP- SAP-PPPDC  Yes
|     | PPPDC  | interface,  | the  | field  | EX_IDENT  |     |     |
| --- | ------ | ----------- | ---- | ------ | --------- | --- | --- |
SAP-PPPDCC
|     | uniquely  | identifies  |     | uploads  |     | from  |     |
| --- | --------- | ----------- | --- | -------- | --- | ----- | --- |
subsystems. HYDRA populates the field.
You can add a prefix to the EX_IDENT
|     | field  to  | differentiate  |     | between  | uploads  |     |     |
| --- | ---------- | -------------- | --- | -------- | -------- | --- | --- |

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     |     | Page 39 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |          |        |     |             |     | Relevant    | Productive  |
| ----------- | ------------ | -------- | ------ | --- | ----------- | --- | ----------- | ----------- |
|             |              |          |        |     |             |     | interfaces  | release     |
|             | from         | various  | HYDRA  |     | subsystems  |     |             |             |
connected to one SAP instance.
Example:
  Myerprck.exe
/IDENT_PRAEFIX=ABC
|     |     | The  | prefix  | may  | only  | include  |     |     |
| --- | --- | ---- | ------- | ---- | ----- | -------- | --- | --- |
hexadecimal characters: A –H und
0 – 9.
/ABZEICH=XX  While  customizing  the  order  type,  you  EIS-ERP  Yes
can specify that only signed data records
EIS-XPPS
are uploaded.
SAP-PPPDC
|     | Use  | the  parameter  |     | /ABZEICH=XX  |     |     | to  |     |
| --- | ---- | --------------- | --- | ------------ | --- | --- | --- | --- |
specify a period of time in days after that
SAP-PPREM
|     | you       | can  upload  |     | even  | unsigned  | data  |           |     |
| --- | --------- | ------------ | --- | ----- | --------- | ----- | --------- | --- |
|     | records.  |              |     |       |           |       | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/TRANSFER=  Use  the  parameter  "/TRANSFER="  to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
were transferred from a specific system.
SAP-PPPDC
|     | The    | transfer  | indicator  |             | is  set  | during  |     |     |
| --- | ------ | --------- | ---------- | ----------- | -------- | ------- | --- | --- |
|     | HYDRA  | inbound   |            | processing  | and      | may     |     |     |
SAP-PPREM
vary from interface to interface.
SAP-PPPI
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PPREM_82.docx  |     |     | Version: 1.0.23347  |     |     |     |     | Page 40 of 47  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/NOTRANSFER=XXX  Use the parameter "/NOTRANSFER=" to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
|     | were  NOT  | transferred  | from  a  specific  |     |     |
| --- | ---------- | ------------ | ------------------ | --- | --- |
system.
SAP-PPPDC
|     | The  transfer  | indicator  | is  set  during  |     |     |
| --- | -------------- | ---------- | ---------------- | --- | --- |
SAP-PPREM
|     | HYDRA                              | inbound  processing  | and  may  |           |     |
| --- | ---------------------------------- | -------------------- | --------- | --------- | --- |
|     | vary from interface to interface.  |                      |           | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SEK  | The EIS-ERP interface uploads the times  |              |           | EIS-ERP  | Yes  |
| ----- | ---------------------------------------- | ------------ | --------- | -------- | ---- |
|       | of  resource                             | performance  | accounts  | in       |      |
ESI-XPPS
hours.
In particular with very short lead times
this may effect that logon times are cut
off by a conversion into hours.
|     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | ---------- | ------------------- | ----------- | --- | --- |
times in seconds.
/RMTYP=  When  customizing  the  order  type,  you  EIS-ERP  Yes
can assign an upload type to the order
ESI-XPPS
type.
SAP-PPPDC
|     | Use  this  | program  | parameter  to  only  |     |     |
| --- | ---------- | -------- | -------------------- | --- | --- |
upload data records of this upload type.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 41 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/KAT=  When  customizing  the  order  type,  you  EIS-ERP  Yes
|     | can  connect  | the  order  | type  | with  a  |     |
| --- | ------------- | ----------- | ----- | -------- | --- |
ESI-XPPS
category.
SAP-PPPDC
|     | Use  the  | program  parameter  | /KAT=  | to  |     |
| --- | --------- | ------------------- | ------ | --- | --- |
only upload data records of this category.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SART=  | The  system  | only  uploads  | ADE  | log  EIS-ERP  | Yes  |
| ------- | ------------ | -------------- | ---- | ------------- | ---- |
postings of the specified record type.
ESI-XPPS
Therefore, you can use different program
SAP-PPPDC
parameters per call and record type for
uploading.
SAP-PPREM
Requirement: You have to activate the
SAP-PPPI
corresponding uploads when customizing
|     | the order type.  |     |     | SAP-PMCC3  |     |
| --- | ---------------- | --- | --- | ---------- | --- |
SAP-PSCC4
You can specify the parameter several
times per call.
SAP-COILV
Example:
|     |   Myerprck.exe  |     | /SART=A  |     |     |
| --- | --------------- | --- | -------- | --- | --- |
/SART=E
  The system only uploads A and
E records.
/NOLOCK  When starting the upload program, the  All  Requires
|     | system   | checks  if  there  | are       | any  lock  | customizations  |
| --- | -------- | ------------------ | --------- | ---------- | --------------- |
|     | entries  | for  the           | database  | table      |                 |
ADE_PROTOKOLL. If this is the case,

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 42 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
the upload is not carried out.
You can use this program parameter to
prevent this check.
|     | Set this parameter, in particular,  |                 | if the          |     |     |
| --- | ----------------------------------- | --------------- | --------------- | --- | --- |
|     | upload                              | is  not  based  | on  the  table  |     |     |
ade_protokoll.
/EINH_CC34  The  interfaces  SAP-PMCC3  and  SAP- SAP-PMCC3  Yes
|     | PSCC4  | transfer  the  | uploaded  activity  |     |     |
| --- | ------ | -------------- | ------------------- | --- | --- |
SAP-PSCC4
quantity in seconds (SEC) to SAP. Use
the parameter "/EINH_CC34“ to upload
|     | the  data  | in  other  units.  | The  following  |     |     |
| --- | ---------- | ------------------ | --------------- | --- | --- |
units are supported:
Hours:  H, HUR, STD
|     | Minutes:  | MIN  |     |     |     |
| --- | --------- | ---- | --- | --- | --- |
|     | Seconds:  | SEC  |     |     |     |
Example:
  Myerprck.exe
/EINH_CC34=HUR
The system uploads the recorded
times in the unit "HUR“ (hours).
/SDAT_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the change date along with the correction
records.
|     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | ---------- | ------------------- | ----------- | --- | --- |
the initially collected shift date instead.
/NORFC_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the cancellation records via sRFC.
Use the program parameter to transfer
the data in the IDoc format to SAP. To do

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 43 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use   |             |     |       | Relevant    | Productive  |
| ----------- | ------------- | ----------- | --- | ----- | ----------- | ----------- |
|             |               |             |     |       | interfaces  | release     |
|             | so,  inbound  | processing  |     | must  | be          |             |
implemented in SAP.
|     | The  system  | uploads   | the       | cancellation  |     |     |
| --- | ------------ | --------- | --------- | ------------- | --- | --- |
|     | records      | via  the  | standard  | PP-PDC        |     |     |
segment (with record type K20/K40) as if
the PP-PDCC license was not available.
| /PI  | If you use the SAP Process Integration  |           |                  |     | SAP-PPPDC  | Yes  |
| ---- | --------------------------------------- | --------- | ---------------- | --- | ---------- | ---- |
|      | (previously:                            | Exchange  | Infrastructure)  |     | to         |      |
SAP-PMCC3
|     | communicate                              | with  | SAP,  | the  version  | of         |     |
| --- | ---------------------------------------- | ----- | ----- | ------------- | ---------- | --- |
|     | the transferred segment is checked more  |       |       |               | SAP-PSCC4  |     |
strictly.

Use the program parameter to transfer
segment names with the version number
|     | (i.e.  the  | trailing  zeros  | of  | the  segment  |     |     |
| --- | ----------- | ---------------- | --- | ------------- | --- | --- |
name).
/INDEX_TMP_TABLE  Use this parameter to accelerate uploads  All  Requires
|     | if ORACLE is used as database system  |     |     |     |     | customizations  |
| --- | ------------------------------------- | --- | --- | --- | --- | --------------- |
and large amounts of data are affected.
To do so, use an index for a temporary
table where all data to be uploaded is
transferred in a first step.
/UE_PARAMS=  Program parameter for the stand-alone  Various  Yes
user exit processing (DD format).
| /NOSTORNO  | Use this program parameter to prevent  |          |     |       | All    | Yes  |
| ---------- | -------------------------------------- | -------- | --- | ----- | ------ | ---- |
|            | cancellation                           | records  |     | from  | being  |      |
uploaded.
Therefore, you can use different program
parameters per call and record type for
uploading.
Requirement: You have to activate the

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     | Page 44 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
corresponding uploads when customizing
the order type.
/RECALC_NEG_YIELD  Use  this  parameter  to  offset  negative  SAP-PPPDCC  Requires
|     | yield  with  | already  | posted  positive  |     | customizations  |
| --- | ------------ | -------- | ----------------- | --- | --------------- |
uploads.
Program parameters to use the SIGUSR communication:
/LOGGING  Use this program parameter to activate  INDIVIDUAL  Yes
|     | communication from the database table  |     |     | CASE  |     |
| --- | -------------------------------------- | --- | --- | ----- | --- |
HYD_LOGGING.
|     | To  do  | so,  a  customization  | might  | be  |     |
| --- | ------- | ---------------------- | ------ | --- | --- |
required.
/WAIT_SIGUSR1=XX  The  program  parameter  specifies  the  INDIVIDUAL  Yes
|     | time in seconds that has to pass before  |     |     | CASE  |     |
| --- | ---------------------------------------- | --- | --- | ----- | --- |
the upload is performed via the SIGUSR
communication even without trigger.
| /PEEK_SIGUSR1=XX  |     |     |     | INDIVIDUAL  | Yes  |
| ----------------- | --- | --- | --- | ----------- | ---- |
CASE
Use this parameter to delay execution of
|     | an  action  | triggered  | by  the  SIGUSR  |     |     |
| --- | ----------- | ---------- | ---------------- | --- | --- |
communication.
The delay time is entered in seconds for
this parameter.
|     | The  program  | interprets  | this  time  | as  |     |
| --- | ------------- | ----------- | ----------- | --- | --- |
follows:
If within the next second after the initial
trigger there is another trigger, then wait
|     | for  not  | more  than  <specified  |     | value>  |     |
| --- | --------- | ----------------------- | --- | ------- | --- |
seconds.
|     | If  in  a  | specific  case,  | triggers      | would  |     |
| --- | ---------- | ---------------- | ------------- | ------ | --- |
|     | indeed     | arrive  every    | second  then  | the    |     |

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     | Page 45 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |              |     |     |     |     | interfaces  | release     |
WAIT_SIGUSR time (e.g. 120 seconds)
would apply; i.e. the system would in fact
perform the upload after 2 minutes.
/SEND_SIGUSR1=  This  program  parameter  defines  which  INDIVIDUAL  Yes
|     | other process/ program must be triggered  |             |     |      |         | CASE  |     |
| --- | ----------------------------------------- | ----------- | --- | ---- | ------- | ----- | --- |
|     | after                                     | processing  | by  | the  | SIGUSR  |       |     |
communication.
Specify the process/program WITHOUT
file extension.
/COUNT_SIGUSR1=XX  Uploading in signal mode can hardly be  INDIVIDUAL  Yes
|     | subjected to tracing. This is due to the  |     |     |     |     | CASE  |     |
| --- | ----------------------------------------- | --- | --- | --- | --- | ----- | --- |
fact that the program in those cases is
started once via the scheduler but won't
shut off. Any redirection of the program
|     | call  with  | -d  to  | a  log  | file  | will  then  |     |     |
| --- | ----------- | ------- | ------- | ----- | ----------- | --- | --- |
necessarily lead to very large log files,
|     | which  | will  negatively  |     |     | affect  the  |     |     |
| --- | ------ | ----------------- | --- | --- | ------------ | --- | --- |
performance.
|     | Use                | the  new  | program  |              | parameter  |     |     |
| --- | ------------------ | --------- | -------- | ------------ | ---------- | --- | --- |
|     | /COUNT_SIGUSR1=XX  |           |          | to  specify  | after      |     |     |
|     | how  many          | calls     | the      | program      | will       |     |     |
automatically shut down. A call in these
|     | instances  | is  both,  | a   | call  via  | SIGUSR  |     |     |
| --- | ---------- | ---------- | --- | ---------- | ------- | --- | --- |
communication and the cyclical program
|     | execution  | which  | is  controlled  |     | via  the  |     |     |
| --- | ---------- | ------ | --------------- | --- | --------- | --- | --- |
parameter /WAIT_SIGUSR1.
Then the scheduler restarts the program.
|     | But  this  | will  lead  | to  | a  time  | period  "t"  |     |     |
| --- | ---------- | ----------- | --- | -------- | ------------ | --- | --- |
during which SIGUSR calls will not be
processed. It is, however, assumed that
this will not lead to data losses since the
data to be uploaded are already saved to

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     |     | Page 46 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

   HYDRA Interfacing Module for SAP PP Serial Production

| Parameters  | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |              |     |     |     |     | interfaces  | release     |
the DB.
Benefits:
|     | If  the  | program  | is  started  | via  | a  script  |     |     |
| --- | -------- | -------- | ------------ | ---- | ---------- | --- | --- |
(*.scr) from the scheduler, you can store
there the routine to generate a date/ time
|     | stamp  | file  name  | for  | the  log  | file  to  be  |     |     |
| --- | ------ | ----------- | ---- | --------- | ------------- | --- | --- |
created. This allows to restrict the log file
size.
Program parameters for debugging/ tracing/ testing/ logging purposes:
/ONLYERR  This  program  parameter  specifies  that  All  Yes
system log entries are only created if an
error occurred during uploading.
This reduces the entries in the system
log.
| /SIM  | The system does not upload/confirm data  |     |              |     |          | All  | No  |
| ----- | ---------------------------------------- | --- | ------------ | --- | -------- | ---- | --- |
|       | during                                   |     | simulations  |     | (the     |      |     |
|       | uploaded/confirmed                       |     | indicator    |     | is  set  | to   |     |
"'True").
/SIMULATION  The system does not upload/confirm data  All  No
|     | to  | SAP  | during  |     | simulation  |     |     |
| --- | --- | ---- | ------- | --- | ----------- | --- | --- |
(confirmed/uploaded indicator will not be
changed).

| SAP-PPREM_82.docx  |     | Version: 1.0.23347  |     |     |     |     | Page 47 of 47  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |