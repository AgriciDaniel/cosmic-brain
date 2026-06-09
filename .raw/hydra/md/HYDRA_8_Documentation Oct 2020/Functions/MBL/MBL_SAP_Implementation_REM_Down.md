|     |     |     |     |     |     | Downloading Operation Data  |
| --- | --- | --- | --- | --- | --- | --------------------------- |

1  Downloading Operation Data
Overview
| Message type:  |     | LOIPLO      |             |     |     |     |
| -------------- | --- | ----------- | ----------- | --- | --- | --- |
| IDoc type:     |     | LOIPLO01    |             |     |     |     |
| Segments:      |     | E2PLAFL001  |             |     |     |     |
|                |     |             | E2PLOPL001  |     |     |     |
|                |     |             |   E2KBEDL   |     |     |     |
|                |     |             | E2RESBL     |     |     |     |
Segment E2PLAFL001
Segment E2PLAFL001 includes data of the planned order header.
| Field name  |     | T  L  | D   | Description  |     | Usage in HYDRA  |
| ----------- | --- | ----- | --- | ------------ | --- | --------------- |
ABMNG  QUAN 14  3  Reduced quantity in planned order  Not used
AUFFX  CHAR  1    Fixing flag in planned order data  Not used
ANR.FU:29
| AUFNR  |     | CHAR  12    | Serial order number  |     |     | Not used  |
| ------ | --- | ----------- | -------------------- | --- | --- | --------- |
AVMNG  QUAN 14    Planned scrap quantity  OH.Target scrap in base quantity
| ANR.SGR:AUSB  |     |            |                      |     |     | unit               |
| ------------- | --- | ---------- | -------------------- | --- | --- | ------------------ |
| BESKZ         |     | CHAR  1    | Procurement type     |     |     | Not used           |
| DISPO         |     | CHAR  3    | Material controller  |     |     | OH.MRP controller  |
ANR.DISP
| EKORG  |     | CHAR  4    | Purchasing organization  |     |     | Not used  |
| ------ | --- | ---------- | ------------------------ | --- | --- | --------- |
GSBTR  DATS  8    Total confirmation date of planned order after  Not used
ATP check of components
| GLTRS  |     | DATS  8    | Scheduled end time   |     |     | Not used  |
| ------ | --- | ---------- | -------------------- | --- | --- | --------- |
GLUZS  TIMS  6    Earliest scheduled end time: Execution  Not used
GSMNG  QUAN 14    Planned order quantity  OH.Target quantity in base
quantity unit
ANR.SGR:GUTB
| GSTRS  |     | DATS  8    | Scheduled start time   |     |     | Not used  |
| ------ | --- | ---------- | ---------------------- | --- | --- | --------- |
GSUZS  TIMS  6    Earliest scheduled start time: Execution (time)  Not used
KAPFX  CHAR  1    Flag: Planned order - capacities planned  Not used
| KDAUF  |     | CHAR  10    | Sales order number  |     |     | OH.Sales order  |
| ------ | --- | ----------- | ------------------- | --- | --- | --------------- |
ANR.KDAUF
KDPOS  CHAR  6    Item number in sales order  OH.Sales order item
ANR.KDPOS
LGORT  CHAR  4    Storage location  To be used as receiving storage
location in confirmation
ANR.LGORT
| MATNR  |     | CHAR  18    | Material number  |     |     | OH.Article  |
| ------ | --- | ----------- | ---------------- | --- | --- | ----------- |
ANR.ATK

MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122  Page 1 of 8

|     |     |     |     | Downloading Operation Data  |
| --- | --- | --- | --- | --------------------------- |

| Field name  |     | T  L       | D  Description                 | Usage in HYDRA  |
| ----------- | --- | ---------- | ------------------------------ | --------------- |
| MDACC       |     | CHAR  4    | Planned order handling action  | Not used        |
| MDACD       |     | DATS  8    | Planned order action date      | Not used        |
MDACH  CHAR  2    Planned order handling action control  Not used
MDACT  TIMS  6    Planned order handling action time  Not used
MDPBV  CHAR  1    Planned order confirmation availability  Not used
| MEINS         |     | UNIT  3    | Base quantity unit  | OH.Base quantity unit  |
| ------------- | --- | ---------- | ------------------- | ---------------------- |
| ANR.SGE:GUTB  |     |            |                     | OP.Base quantity unit  |
| PAART         |     | CHAR  4    | Order type          | Not used               |
ANR.FU:45
PALTR  DATS  8    Resolution date (explosion date)  Not used
PEDTR  DATS  8    Order finish date in planned order  OH.Order finish date
ANR.DATSE
PERTR  DATS  8    Planned creation date in planned order  Not used
| PLNAL  |     | CHAR  2    | Group counter  | OH.Work plan  |
| ------ | --- | ---------- | -------------- | ------------- |

| PLNNR  |     | CHAR  8    | Key of planned group  | OH.Work plan  |
| ------ | --- | ---------- | --------------------- | ------------- |
ANR.APNR
| PLNTY  |     | CHAR  1    | Planned type  | Not used  |
| ------ | --- | ---------- | ------------- | --------- |
PLNUM  CHAR  10    Planned order number  HYDRA order number according
to configuration (*1)
ANR.SAPAUNR
| PLSCN  |     | NUMC 3     | Long-term planning scenario  | Not used           |
| ------ | --- | ---------- | ---------------------------- | ------------------ |
| PLWRK  |     | CHAR  4    | Planning plant               | Not used           |
| PSPEL  |     | NUMC 24    | PSP element                  | OH.Project number  |
ANR:PRJNR
PSTTR  DATS  8    Order start date in planned order  OH.Order start date
ANR.DATFB
PWWRK  CHAR  4    Production plant in planned order  Used as actual plant in
confirmation
ANR:WERK:S
| SEQNR  |     | NUMC 14    | Order sequence number          | Not used  |
| ------ | --- | ---------- | ------------------------------ | --------- |
| SERNR  |     | CHAR  8    | Serial number                  | Not used  |
| SOBES  |     | CHAR  1    | Special procurement type       | Not used  |
| SOBKZ  |     | CHAR  1    | Special inventory flag         | Not used  |
| STLFX  |     | CHAR  1    | Fixing flag for BOM explosion  | Not used  |
UMSKZ  CHAR  1    Implementation flag of planned order  Not used
VERID  CHAR  4    Production version   Stored for confirmation
ANR.FERTVER
VFMNG  QUAN 14    Planned order of confirmed quantity  Not used
WEBAZ  DEC  5    Processing time for goods receipt in days  Not used
| MATNR_EXTERNAL  |     | CHAR  40    | Long material number  | Not used  |
| --------------- | --- | ----------- | --------------------- | --------- |
MATNR_VERSION  CHAR  10    Version number for MATNR field  Not used
MATNR_GUID  CHAR  32    External GUID for MATNR field  Not used

MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122  Page 2 of 8

|     |     |     |     | Downloading Operation Data  |
| --- | --- | --- | --- | --------------------------- |

Segment E2PLOPL001
The segment E2PLOPL001 includes operation data.
| Field name  |     | T  L  | D  Description  | Usage in HYDRA  |
| ----------- | --- | ----- | --------------- | --------------- |
VORNR  CHAR  4    Operation number  HYDRA  operation  number
| ANR.SAPVGNR  |     |            |                          | according to configuration (*1)  |
| ------------ | --- | ---------- | ------------------------ | -------------------------------- |
| PVZNR        |     | CHAR  4    | Superordinate operation  | Not used                         |
| ARBEH        |     | UNIT  3    | Work unit                | Not used                         |
| ARBEI        |     | QUAN 8     | Operation work           | Not used                         |
| ARBID        |     | NUMC 8     | Workplace ID             | Target workplace                 |
| ANR.MNR      |     |            |                          | OP.Machine and/or OP.Machine     |
group
(see note)
| DAUNE  |     | UNIT  3    | Unit duration normal       | Not used  |
| ------ | --- | ---------- | -------------------------- | --------- |
| DAUNO  |     | QUAN 6     | Normal operation duration  | Not used  |
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
| PLNFL  |     | CHAR  6    | Sequence  | Not used  |
| ------ | --- | ---------- | --------- | --------- |
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
| USR04  |     | QUAN 15    | User field 04  | Partitioning (see note)  |
| ------ | --- | ---------- | -------------- | ------------------------ |
ANR.TLG
| USR05  |     | QUAN 15    | User field 05  | Target cycle (see note)  |
| ------ | --- | ---------- | -------------- | ------------------------ |
ANR.SZY
| USE04  |     | UNIT  3    | Unit user field 04  | Not used  |
| ------ | --- | ---------- | ------------------- | --------- |
| USE05  |     | UNIT  3    | Unit user field 04  | Not used  |
| VGE01  |     | UNIT  3    | Unit of activity 1  | Not used  |
| VGE02  |     | UNIT  3    | Unit of activity 2  | Not used  |

MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122  Page 3 of 8

|     |     |     |     | Downloading Operation Data  |
| --- | --- | --- | --- | --------------------------- |

| Field name  |     | T  L       | D  Description            | Usage in HYDRA  |
| ----------- | --- | ---------- | ------------------------- | --------------- |
| VGE03       |     | UNIT  3    | Unit of activity 3        | Not used        |
| VGE04       |     | UNIT  3    | Unit of activity 4        | Not used        |
| VGE05       |     | UNIT  3    | Unit of activity 5        | Not used        |
| VGE06       |     | UNIT  3    | Unit of activity 6        | Not used        |
| VGW01       |     | QUAN 10    | Default value activity 1  | Not used        |
ANR.VGW01
| VGW02  |     | QUAN 10    | Default value activity 2  | Not used  |
| ------ | --- | ---------- | ------------------------- | --------- |
ANR.VGW02
| VGW03  |     | QUAN 10    | Default value activity 3  | Not used  |
| ------ | --- | ---------- | ------------------------- | --------- |
ANR.VGW03
| VGW04  |     | QUAN 10    | Default value activity 4  | Not used  |
| ------ | --- | ---------- | ------------------------- | --------- |
ANR.VGW04
| VGW05  |     | QUAN 10    | Default value activity 5  | Not used  |
| ------ | --- | ---------- | ------------------------- | --------- |
ANR.VGW05
| VGW06  |     | QUAN 10    | Default value activity 6  | Not used  |
| ------ | --- | ---------- | ------------------------- | --------- |
ANR.VGW06
| XDISP  |     | CHAR  1    | Flag: Operation/KBED is planned  | Not used  |
| ------ | --- | ---------- | -------------------------------- | --------- |
| ANZMA  |     | DEC  7  2  | Number of employees              | Not used  |
ANR.MBVERH:NORM

Segment E2KBEDL
| Field name  |     | T  L  | D  Description  | Usage in HYDRA  |
| ----------- | --- | ----- | --------------- | --------------- |
BEDID  NUMC 12    Serial number of capacity requirements record  Not used
| BEDZL  |     | NUMC 8    | Internal counter  | Not used  |
| ------ | --- | --------- | ----------------- | --------- |
CANUM  NUMC 4    Counter of capacity requirements record  Not used
| BEDKZ  |     | CHAR  1    | Availability indicator  | Not used  |
| ------ | --- | ---------- | ----------------------- | --------- |
KABRREST  FTP  22    Remaining quantity clearing/retooling capacity Not used
demand
KABRSOLL  FTP  22    Clearing/retooling capacity demand  Not used
| KAPAR  |     | CHAR  3    | Capacity category  | Not used  |
| ------ | --- | ---------- | ------------------ | --------- |
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

MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122  Page 4 of 8

|     |     |     | Downloading Operation Data  |
| --- | --- | --- | --------------------------- |

| OH.xxx  | Field xxx in HYDRA order header  |     |     |
| ------- | -------------------------------- | --- | --- |
| OP.xxx  | Field xxx in HYDRA operation     |     |     |
(*1)   For more information on generating the HYDRA order number, please see below.
(*2)   The contents of these fields must not exceed a duration of 590 hours.

MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122  Page 5 of 8

Downloading Operation Data
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
MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122 Page 6 of 8

Downloading Operation Data
Not used
HYDRA partitioning
If the user field USR04 includes a numeric value, the system enters this value as the partitioning in
the operation.
If this is not the case or if the value is "0", the system automatically enters the value 1 as the
partitioning.
MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122 Page 7 of 8

Downloading Operation Data
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
MBL_SAP_Implementation_REM_Down.docxVersion: 1.3.19122 Page 8 of 8