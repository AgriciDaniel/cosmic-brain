Manual
Interface Material and Batch
Data
EIS-MCL 8.1
Version 1.1.19800
Last changed on: 06.08.2020

Interface Material and Batch Data
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EIS-MCL_81.docx Version: 1.1.22690 Page 2 of 47

Interface Material and Batch Data
Contents
1 Interface Material, Batch and Lot Data......................................................... 4
2 Setup of Data Record Structure ................................................................... 6
3 Data type definitions ..................................................................................... 7
4 Material Supply ERP --> MES ...................................................................... 9
5 Material consumptions MES --> ERP ........................................................ 22
6 Goods Receipt MES --> ERP ..................................................................... 26
7 Usage Decision MES --> ERP ................................................................... 39
8 Settings Relevant to the Application in HYDRA ......................................... 41
9 Test Files .................................................................................................... 47
EIS-MCL_81.docx Version: 1.1.22690 Page 3 of 47

Interface Material and Batch Data
1 Interface Material, Batch and Lot Data
Overview
Use options
The interface for material and batch data provides interface structures and functions, which allow for
inventory information (or its extracts) to be exchanged between the higher level ERP/PPS level as the
inventory-managing system and the MES level.
As material staging data is transferred from ERP/PPS to MES, it is possible to provide MES with the
charges and batches available for production and to thus create the data reasons for plausibility checks
upon the entry of material data.
In exchange, MES will provide information on produced materials (lots and/or batches) and on material
consumptions for the ERP level.
Implementation notes
Use the interface for material, batch and lot data if you
 need information on provided lots/ batches as entry reasons in the context of tracking & tracing
processes;
 wish to use information on produced materials as data base for materials management;
 wish to use information on material consumptions as data base for materials management;
 need the origin tree about inbound materials used for the production of materials for tracking
purposes.
Integration
In the course of the data provision and data confirmation the interface for material, batch and lot data
integrates into:
 Tracking & tracing where the provided data is accessed for plausibility checks;
 material and production logistics where the data provided by the interface will be further
processed.
Scope of functions
 Transfer of material stagings:
o Adoption of material stagings from the superior system to HYDRA
 Transfer of goods receipts:
EIS-MCL_81.docx Version: 1.1.22690 Page 4 of 47

Interface Material and Batch Data
o Transfer of goods receipts for created lots and/or batches from HYDRA to the inventory-
managing system according to different movement types
o Confirmation of the origin tree at the goods receipt of a lot and/or batch
 Transfer of goods issues
o Transfer of goods issues for consumed materials from HYDRA to the inventory-managing
system with reference to the production order and different movement types
 Configuration of the interface
Configuration of the inventory-relevant material types in HYDRA to control the interface
EIS-MCL_81.docx Version: 1.1.22690 Page 5 of 47

Interface Material and Batch Data
2 Setup of Data Record Structure
The data are transferred in the following structure. Within this structure the value of the SEGNAM field
precisely defines the set-up of the user data structure in the SDATA field.
Field name Type Length Designation Data field and
meaning
SEGNAM* Char 30 Segment name This field is occupied by the writing
system with the respective segment
name. This precisely defines the set-
up of the data record (SDATA field).
Example: HY72_AU_HD_001
MANDT* Char 3 Client Reserved; fixed: '000'
DOCNUM* Char 16 IDOC number Serial number for the IDOCs
Reserved: fixed '0000000000000000'
SEGNUM* Char 6 Segment number Reserved: fixed '000000'
PSEGNUM Char 6 Parent segment Reserved; fixed: '000000'
number
HLEVEL Char 2 Hierarchy level Reserved; fixed: '00'
SDATA Char 1000 User data This field contains the user data. The
structure of this field is defined by the
SEGNAM field.
EIS-MCL_81.docx Version: 1.1.22690 Page 6 of 47

Interface Material and Batch Data
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
EIS-MCL_81.docx Version: 1.1.22690 Page 7 of 47

Interface Material and Batch Data
The character " ; “ (semicolon) is used as a separator in the system. You must not use this
character in key fields (e.g. order/operation number, MES batch number, personnel number).
The character " % " (percent) is used as a placeholder for database communication. You should
not use this character to prevent the result from being falsified.
EIS-MCL_81.docx Version: 1.1.22690 Page 8 of 47

|     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | ---------------------------------- | --- |

4  Material Supply ERP --> MES
Overview
|     |    |     |     |     |
| --- | --- | --- | --- | --- |
Certain material movements are transferred from the ERP system to the MES. IDocs are created
cyclically (e.g. every 5 minutes) and transferred to HYDRA. IDocs are called ZMBEW03.
The MES material type must also be stored in the ERP system and transferred together with the provided
data.
If batch movements are transferred including user-specific information, this information must also be
transferred to HYDRA.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     | Page 9 of 47  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

This leads to the following IDoc specification:
| Message type/  | file  | ZMBEW  |     |     |     |
| -------------- | ----- | ------ | --- | --- | --- |
name:
| File  extension  | (for  | file  DAT  |     |     |     |
| ---------------- | ----- | ---------- | --- | --- | --- |
transfer)
| IDoc  type  | (for  tRFC  | ZMBEW03  |     |     |     |
| ----------- | ----------- | -------- | --- | --- | --- |
communication):
| Segments:  |     | Z2MBEW001X000 (goods movements)                           |     |     |   1 - n  |
| ---------- | --- | --------------------------------------------------------- | --- | --- | -------- |
|            |     | Z2MBEW002X000 (goods movements continued)1                |     |     |   0 - 1  |
|            |     | Z2CNRATT_C000X000 (alphanumeric batch attributes part 1)  |     |     | 0 - 1    |
|            |     | Z2CNRATT_C001X000 (alphanumeric batch attributes part 2)  |     |     | 0 - 1    |
Z2CNRATT_N000X000 (numeric attributes) – (OBSOLETE)2
0 – 1
|     |     | Z2CNRATT_N001X000 (numeric attributes)3  |     |     |   0 - 1  |
| --- | --- | ---------------------------------------- | --- | --- | -------- |
|     |     | Z2CNR_USRFLD000X000 (user fields)4       |     |     |   0 - 1  |

Segments in SAP have to be created according to the pattern Z1<segment name> in order to
generate the above-mentioned segment names in SAP. The version control function of SAP
outbound processing generates segment names in the form Z2<segment name><version>.

Example: segment name Z1MBEW001X is converted to Z2MBEW001X000
This documentation uses the below-mentioned column headings with the meaning described here:
| Column  | Description  |     |     |     |     |
| ------- | ------------ | --- | --- | --- | --- |
| Field   | Field name   |     |     |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
|           | M                                  | Mandatory field which must be filled with a valid value.  |     |     |     |
| --------- | ---------------------------------- | --------------------------------------------------------- | --- | --- | --- |
|           | K                                  | Field may stay empty (optional field).                    |     |     |     |
| T(ype)    | Data type according to definition  |                                                           |     |     |     |
| L(ength)  | Field length                       |                                                           |     |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant

1 The segment is available from MLE option ZMBEW_012 on.
2We recommend to no longer use this segment for new implementations. Segment Z2CNRATT_N001X000 should
be used instead. Segment Z2CNRATT_N000X000 is still available (backwards compatible) but will no longer be
maintained. Both segments have different field lengths for their decimal fields.
3 The segment is available from MLE option ZMBEW_014 on.
4 The segment is available from MLE option ZMBEW_010 on.

| EIS-MCL_81.docx  |     |     | Version: 1.1.22690  |     | Page 10 of 47  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| Column       | Description                              |     |     |     |     |     |
| ------------ | ---------------------------------------- | --- | --- | --- | --- | --- |
| Description  | Description and/or comment of the field  |     |     |     |     |     |
Goods movements (Z2MBEW001X000)
Material supplies: Goods receipt, reposting to a different material buffer. If a batch is already known in
HYDRA, the batch inventory will be updated.
The batch inventory can only be updated if the batch is currently not in use (not running), i.e.
|     | batch status <> "L"  |     |     |     |     |     |
| --- | -------------------- | --- | --- | --- | --- | --- |

| Field  | V T  L      | D  Description    |     |     |     |     |
| ------ | ----------- | ----------------- | --- | --- | --- | --- |
| WERK   | K  CHAR  4  |   Company/ plant  |     |     |     |     |

|        |              |                    |     |     |     |     |
| ------ | ------------ | ------------------ | --- | --- | --- | --- |
| MATNR  | M  CHAR  40  |   Material number  |     |     |     |     |

| MATTYP  | M  CHAR  10  |   Material type  |     |     |     |     |
| ------- | ------------ | ---------------- | --- | --- | --- | --- |

| MATTXT  | K  CHAR  40  |   Material description  |     |     |     |     |
| ------- | ------------ | ----------------------- | --- | --- | --- | --- |

|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
MATPUF  M  CHAR  12    Target storage location: Material buffer including the material; in
|     |     | case  the  material  | is  transferred,  | the  new  material  | buffer  is  |     |
| --- | --- | -------------------- | ----------------- | ------------------- | ----------- | --- |

indicated here.
| LAGORT  | K  CHAR  20  |   PPS storage location  |     |     |     |     |
| ------- | ------------ | ----------------------- | --- | --- | --- | --- |

| LAGPZ  | K  CHAR  20  |   PPS storage bin  |     |     |     |     |
| ------ | ------------ | ------------------ | --- | --- | --- | --- |

|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
MNR  K  CHAR  10    Workplace  which  incoming  goods  are  explicitly  provided  for
(reserved, should be left empty)

| CHARGE  | K  CHAR  10  |   ERP batch number  |     |     |     |     |
| ------- | ------------ | ------------------- | --- | --- | --- | --- |
  For further information on the meaning of the fields CHARGE and
CHARGE_LONG please see the description below.
HY_LOSNR  S  CHAR  20    HYDRA batch number (to find a batch created from HYDRA)

| MENGE       | K  QUAN  13  | 3  Batch quantity      |     |     |     |     |
| ----------- | ------------ | ---------------------- | --- | --- | --- | --- |
|             |              |                        |     |     |     |     |
| MENGE_EINH  | K  CHAR  3   |   Batch quantity unit  |     |     |     |     |
|             |              |                        |     |     |     |     |
| LST01       | K  QUAN  13  | 3  Activity 1          |     |     |     |     |

| LST01_EINH  | K  CHAR  3  |   Unit of activity 1  |     |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- | --- |

| LST02  | K  QUAN  13  | 3  Activity 2  |     |     |     |     |
| ------ | ------------ | -------------- | --- | --- | --- | --- |

|             |             |                       |     |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- | --- |
| LST02_EINH  | K  CHAR  3  |   Unit of activity 2  |     |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 11 of 47  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | V T  L       | D  Description  |     |     |     |
| ------ | ------------ | --------------- | --- | --- | --- |
| LST03  | K  QUAN  13  | 3  Activity 3   |     |     |     |

| LST03_EINH  | K  CHAR  3  |   Unit of activity 3  |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- |

| LST04  | K  QUAN  13  | 3  Activity 4  |     |     |     |
| ------ | ------------ | -------------- | --- | --- | --- |

| LST04_EINH  | K  CHAR  3  |   Unit of activity 4  |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- |

| LST05  | K  QUAN  13  | 3  Activity 5  |     |     |     |
| ------ | ------------ | -------------- | --- | --- | --- |

| LST05_EINH  | K  CHAR  3  |   Unit of activity 5  |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- |

| LST06  | K  QUAN  13  | 3  Activity 6  |     |     |     |
| ------ | ------------ | -------------- | --- | --- | --- |

| LST06_EINH  | K  CHAR  3  |   Unit of activity 6  |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- |

| LOSHINWEIS  | K  CHAR  20  |   Entered info on batch  |     |     |     |
| ----------- | ------------ | ------------------------ | --- | --- | --- |

| KLASSE  | K  CHAR  1  |   Batch class       |     |     |     |
| ------- | ----------- | ------------------- | --- | --- | --- |
|         |             | "G"  Yield          |     |     |     |
|         |             | "A"  Scrap/ waste   |     |     |     |

| STATUS  | K  CHAR  1  |   Batch status to be set  |     |     |     |
| ------- | ----------- | ------------------------- | --- | --- | --- |
|         |             | "F"  Free/available       |     |     |     |
|         |             | "S"  Blocked              |     |     |     |
|         |             | "D"  Deleted              |     |     |     |

| MATST  | K  CHAR  1  |   Material status  |     |     |     |
| ------ | ----------- | ------------------ | --- | --- | --- |

| QST  | K  CHAR  1  |   Q status  |     |     |     |
| ---- | ----------- | ----------- | --- | --- | --- |

| QSTMANU  | K  CHAR  1  |   Manual Q status  |     |     |     |
| -------- | ----------- | ------------------ | --- | --- | --- |

| TST  | K  CHAR  1  |   Transport status  |     |     |     |
| ---- | ----------- | ------------------- | --- | --- | --- |

F - "normal" HYDRA batch
B - Ready for booking out
L - Cleared from stock
O - Booked out for third-parties
I - Sent to third-parties
T - Transport done

| GRUND  | K  NUM  4  |   Batch reason (e.g. blocking reason)  |     |     |     |
| ------ | ---------- | -------------------------------------- | --- | --- | --- |

GRUNDTYP  K  CHAR  1    Reason type (e.g. L - batch reason)
|       |             | Please note: Currently not used.  |     |     |     |
| ----- | ----------- | --------------------------------- | --- | --- | --- |
| VDAT  | K  DATE  8  |   Availability date (MPL-PUE)     |     |     |     |
  If MPL-PUE is not used, the value should be set to the current
point in time.
| VVZEI  | K  TIME  6  |   Availability time (MPL-PUE)  |     |     |     |
| ------ | ----------- | ------------------------------ | --- | --- | --- |
  If MPL-PUE is not used, the value should be set to the current
point in time.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 12 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | V T  L      | D  Description            |     |     |     |
| ------ | ----------- | ------------------------- | --- | --- | --- |
| WDAT   | K  DATE  8  |   Warning date (MPL-PUE)  |     |     |     |
  If MPL-PUE is not used, the value should be set to 31.12.9999.
| WZEI  | K  TIME  6  |   Warning time (MPL-PUE)  |     |     |     |
| ----- | ----------- | ------------------------- | --- | --- | --- |
  If MPL-PUE is not used, the value should be set to 11.59.59 p.m.
| VFDAT  | K  DATE  8  |   Expiry date (MPL-PUE)  |     |     |     |
| ------ | ----------- | ------------------------ | --- | --- | --- |
  If MPL-PUE is not used, the value should be set to 31.12.9999.
| VFZEI  | K  TIME  6  |   Expiry time (MPL-PUE)   |     |     |     |
| ------ | ----------- | ------------------------- | --- | --- | --- |
  If MPL-PUE is not used, the value should be set to 11.59.59 p.m.

| RFAGVFA  | K  DEC  13  | 3  Mass per unit area, unit G/ M2  |     |     |     |
| -------- | ----------- | ---------------------------------- | --- | --- | --- |
otherwise: 0
Please note: Quantities will not automatically be converted
RFBREITE  K  DEC  13  3  Width of the roll in the unit MM
otherwise: 0
CNR:RFSTKF  K  DEC  13  3  Area per piece in the unit MM2/ PCE
|     |     | otherwise: 0  |     |     |     |
| --- | --- | ------------- | --- | --- | --- |

| RESART  | K  CHAR  2  |   Reservation type:             |     |     |     |
| ------- | ----------- | ------------------------------- | --- | --- | --- |
|         |             | "AK"  for order                 |     |     |     |
|         |             | "AG"  for subsequent operation  |     |     |     |
|         |             | "CC"  for planning (comment)    |     |     |     |
RESVAL  K  CHAR  40    Reservation for order/ OP (only if RES:ART = "AK" or "AG")

RESBEM  K  CHAR  100    Comment about reservation (only if RES:ART = "CC")
| ALT1  | K  CHAR  20  |   Alternative batch number 1  |     |     |     |
| ----- | ------------ | ----------------------------- | --- | --- | --- |

| ALT2  | K  CHAR  20  |   Alternative batch number 2  |     |     |     |
| ----- | ------------ | ----------------------------- | --- | --- | --- |

| ALT3  | K  CHAR  20  |   Alternative batch number 3  |     |     |     |
| ----- | ------------ | ----------------------------- | --- | --- | --- |

| ALT4  | K  CHAR  20  |   Alternative batch number 4  |     |     |     |
| ----- | ------------ | ----------------------------- | --- | --- | --- |

| ALT5  | K  CHAR  40  |   Alternative batch number 5  |     |     |     |
| ----- | ------------ | ----------------------------- | --- | --- | --- |

| EXTCNR  | K  CHAR  20  |   External batch number  |     |     |     |
| ------- | ------------ | ------------------------ | --- | --- | --- |

| TPE       | K  CHAR  10  |   Transport unit  |     |     |     |
| --------- | ------------ | ----------------- | --- | --- | --- |
| TECHINFO  | K  CHAR  20  |   Technical info  |     |     |     |

| MCNR  | K  CHAR  20  |   Merged batch number  |     |     |     |
| ----- | ------------ | ---------------------- | --- | --- | --- |

| SLOS  | K  CHAR  1  |   Y - Merged batch                         |     |     |     |
| ----- | ----------- | ------------------------------------------ | --- | --- | --- |
|       |             | Only relevant for merged batch processing  |     |     |     |
SLOSTYP  K  CHAR  1    Merged batch type 'J' – equal type

Only relevant for merged batch processing
ANZSLOS  K  NUM  8    Number of individual batches included in merged batch

Only relevant for merged batch processing

| TRANZ  | K  NUM  8  |   Number of batches  |     |     |     |
| ------ | ---------- | -------------------- | --- | --- | --- |
|        |            | Currently not used   |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 13 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field     | V T  L     | D  Description        |     |     |     |
| --------- | ---------- | --------------------- | --- | --- | --- |
| TRANZSUM  | K  NUM  8  |   Currently not used  |     |     |     |

| LOSINDEX  | K  NUM  8  |   Batch index         |     |     |     |
| --------- | ---------- | --------------------- | --- | --- | --- |
|           |            | Currently not used    |     |     |     |
| TRPOS     | K  NUM  8  |   Currently not used  |     |     |     |

| SCHNEIDNR  | K  NUM  8  |   Currently not used  |     |     |     |
| ---------- | ---------- | --------------------- | --- | --- | --- |

| ATTR1  | K  NUM  8  |   Direct batch attribute 1  |     |     |     |
| ------ | ---------- | --------------------------- | --- | --- | --- |

| ATTR2  | K  NUM  8  |   Direct batch attribute 2  |     |     |     |
| ------ | ---------- | --------------------------- | --- | --- | --- |

| ATTR3  | K  NUM  8  |   Direct batch attribute 3  |     |     |     |
| ------ | ---------- | --------------------------- | --- | --- | --- |

| ATTR4  | K  DEC  13  | 3  Direct batch attribute 4  |     |     |     |
| ------ | ----------- | ---------------------------- | --- | --- | --- |

| ATTR5  | K  DEC  13  | 3  Direct batch attribute 5  |     |     |     |
| ------ | ----------- | ---------------------------- | --- | --- | --- |

| ATTR6  | K  DEC  13  | 3  Direct batch attribute 6  |     |     |     |
| ------ | ----------- | ---------------------------- | --- | --- | --- |

| ATTR7  | K  CHAR  4  |   Direct batch attribute 7  |     |     |     |
| ------ | ----------- | --------------------------- | --- | --- | --- |

| ATTR8  | K  CHAR  10  |   Direct batch attribute 8  |     |     |     |
| ------ | ------------ | --------------------------- | --- | --- | --- |

| ATTR9  | K  CHAR  10  |   Direct batch attribute 9  |     |     |     |
| ------ | ------------ | --------------------------- | --- | --- | --- |

| ATTR10  | K  CHAR  20  |   Direct batch attribute 10  |     |     |     |
| ------- | ------------ | ---------------------------- | --- | --- | --- |

HSDAT  K  DATE  8    Manufacturing date (available starting with MLE option
ZMBEW_008)
HSZEI  K  TIME  6    Manufacturing time (available starting with MLE option
ZMBEW_008)
CSTWDAT  K  DATE  8    Last change of status - date (available starting with MLE option
ZMBEW_008)

CSTWZEI  K  TIME  6    Last change of status - time (available starting with MLE option
ZMBEW_008)
| CHARGE_LONG  | K  CHAR  20  |   ERP batch number (long)  |     |     |     |
| ------------ | ------------ | -------------------------- | --- | --- | --- |
For further information on the meaning of the fields CHARGE and
CHARGE_LONG please see the description below.
(from MLE option ZMBEW_012 on)

Please note that depending on the material type, individual OP-based user fields (transferred

together with the operation from the PPS system) can be transferred to batch-related user fields

(so  called  batch  attributes)  during  the  generation  of  batches  in  HYDRA.  These  are  then

|   EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 14 of 47  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

Interface Material and Batch Data
transferred to the PPS system as ERP batch together with the batch at the goods receipt and
will be returned when such an ERP batch is provided the next time.
Information on the fields CHARGE and CHARGE_LONG
The following logic/condition applies for providing the SAP batch:
Checking if the CHARGE (CHAR10) field is assigned a value:
 Yes:
This value is adopted.
 No:
Checking if the CHARGE_LONG (CHAR20) field is completed:
o Yes:
This value is adopted as PPS batch number.
o No:
This value ("nothing") is adopted as PPS batch number.
Goods movements continued (Z2MBEW002X000)5
The batch inventory can only be updated if the batch is currently not in use (not running), i.e.
batch status <> "L"
Field V T L D Description
HY_LOSNR M CHAR 20 HYDRA batch number (to find a batch created from HYDRA)
HULEVEL K NUMC 8 HU level
DLL K CHAR 20 External batch number (throughput batch number)
BESTART K CHAR 1 Stock type
MSL_VFDATE K DATE 8 MSL Expiry date (from MLE option ZMBEW_015 on)
MSL_VFTIME K TIME 6 MSL Expiry time (from MLE option ZMBEW_015 on)
MSL_PERIOD K NUMC 13 MSL term (from MLE option ZMBEW_015 on)
5 The segment is available from the MLE option ZMBEW_012 on.
EIS-MCL_81.docx Version: 1.1.22690 Page 15 of 47

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Alphanumeric batch attributes part 1 (Z2CNRATT_C000X000)
The following segment supports the (first 20) alphanumeric batch attributes for the transfer.
| Field     | V  T     | L  D  Description             |     |     |     |
| --------- | -------- | ----------------------------- | --- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number      |     |     |     |
| ATTR:101  | K  CHAR  | 40    Alphanumeric attribute  |     |     |     |
| ATTR:102  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:103  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:104  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:105  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:106  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:107  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:108  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:109  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:110  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:111  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:112  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:113  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:114  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:115  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:116  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:117  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:118  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:119  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:120  | K  CHAR  | 40    …                       |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 16 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Alphanumeric batch attributes part 2 (Z2CNRATT_C001X000)
The following segment supports the (last 20) alphanumeric batch attributes for the transfer.
| Field     | V  T     | L  D  Description             |     |     |     |
| --------- | -------- | ----------------------------- | --- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number      |     |     |     |
| ATTR:121  | K  CHAR  | 40    Alphanumeric attribute  |     |     |     |
| ATTR:122  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:123  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:124  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:125  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:126  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:127  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:128  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:129  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:130  | K  CHAR  | 40    …                       |     |     |     |
| ATTR:131  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:132  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:133  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:134  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:135  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:136  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:137  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:138  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:139  | K  CHAR  | 40    ...                     |     |     |     |
| ATTR:140  | K  CHAR  | 40    …                       |     |     |     |

Numeric batch attributes (Z2CNRATT_N000X000) – (OBSOLETE)
We  recommend  to  no  longer  use  this  segment  for  new  implementations.  Segment
Z2CNRATT_N001X000  should  be  used  instead.  Segment  Z2CNRATT_N000X000  is  still
available  (backwards  compatible)  but  will  no  longer  be  maintained.  Both  segments  have

different field lengths for their decimal fields.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 17 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

The following segment supports numeric batch attributes for the transfer.
| Field     | L  T     | L  D  Description                  |     |     |     |
| --------- | -------- | ---------------------------------- | --- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number           |     |     |     |
| ATTR:201  | K  NUMC  | 8    Numeric attribute, integer    |     |     |     |
| ATTR:202  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:203  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:204  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:205  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:206  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:207  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:208  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:209  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:210  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:211  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:212  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:213  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:214  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:215  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:216  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:217  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:218  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:219  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:220  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:301  | K  DEC   | 10  3  Numeric attribute, decimal  |     |     |     |
| ATTR:302  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:303  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:304  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:305  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:306  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:307  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:308  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:309  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:310  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:311  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:312  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:313  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:314  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:315  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:316  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:317  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:318  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:319  | K  DEC   | 10  3  ...                         |     |     |     |
| ATTR:320  | K  DEC   | 10  3  ...                         |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 18 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Numeric batch attributes (Z2CNRATT_N001X000)
The following segment supports numeric batch attributes for the transfer.
| Field     | L  T     | L  D  Description                  |     |     |     |
| --------- | -------- | ---------------------------------- | --- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number           |     |     |     |
| ATTR:201  | K  NUMC  | 8    Numeric attribute, integer    |     |     |     |
| ATTR:202  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:203  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:204  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:205  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:206  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:207  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:208  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:209  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:210  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:211  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:212  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:213  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:214  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:215  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:216  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:217  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:218  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:219  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:220  | K  NUMC  | 8    ...                           |     |     |     |
| ATTR:301  | K  DEC   | 13  3  Numeric attribute, decimal  |     |     |     |
| ATTR:302  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:303  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:304  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:305  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:306  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:307  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:308  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:309  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:310  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:311  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:312  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:313  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:314  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:315  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:316  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:317  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:318  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:319  | K  DEC   | 13  3  ...                         |     |     |     |
| ATTR:320  | K  DEC   | 13  3  ...                         |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 19 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

User fields (Z2CNR_USRFLD000X000)
Starting as of MLE option ZMBEW_010, you can also transfer user fields relating to the batch from the
ERP system.
| Field     | V  T     | L  D  Description                    |     |     |     |
| --------- | -------- | ------------------------------------ | --- | --- | --- |
| HY_LOSNR  | S  CHAR  | 20    HYDRA batch number             |     |     |     |
| FILLER    | S  CHAR  | 20    Placeholder – internal usage   |     |     |     |
| USRFLD    | S  CHAR  | 8    User field key                  |     |     |     |
| FU:1      | K  DATE  | 8    User field 1                    |     |     |     |
| FU:2      | K  DATE  | 8    User field 2                    |     |     |     |
| FU:3      | K  DATE  | 8    User field 3                    |     |     |     |
| FU:4      | K  DATE  | 8    User field 4                    |     |     |     |
| FU:5      | K  DATE  | 8    User field 5                    |     |     |     |
| FU:6      | K  DATE  | 8    User field 6                    |     |     |     |
| FU:7      | K  NUM   | 8    User field 7                    |     |     |     |
| FU:8      | K  NUM   | 8    User field 8                    |     |     |     |
| FU:9      | K  NUM   | 8    User field 9                    |     |     |     |
| FU:10     | K  NUM   | 8    User field 10                   |     |     |     |
| FU:11     | K  NUM   | 8    User field 11                   |     |     |     |
| FU:12     | K  NUM   | 8    User field 12                   |     |     |     |
| FU:13     | K  NUM   | 8    User field 13                   |     |     |     |
| FU:14     | K  NUM   | 8    User field 14                   |     |     |     |
| FU:15     | K  NUM   | 8    User field 15                   |     |     |     |
| FU:16     | K  NUM   | 8    User field 16                   |     |     |     |
| FU:17     | K  NUM   | 8    User field 17                   |     |     |     |
| FU:18     | K  NUM   | 8    User field 18                   |     |     |     |
| FU:19     | K  NUM   | 8    User field 19                   |     |     |     |
| FU:20     | K  NUM   | 8    User field 20                   |     |     |     |
| FU:21     | K  NUM   | 8    User field 21                   |     |     |     |
| FU:22     | K  NUM   | 8    User field 22                   |     |     |     |
| FU:23     | K  DEC   | 13  3  User field 23                 |     |     |     |
| FU:24     | K  DEC   | 13  3  User field 24                 |     |     |     |
| FU:25     | K  DEC   | 13  3  User field 25                 |     |     |     |
| FU:26     | K  DEC   | 13  3  User field 26                 |     |     |     |
| FU:27     | K  DEC   | 13  3  User field 27                 |     |     |     |
| FU:28     | K  DEC   | 13  3  User field 28                 |     |     |     |
| FU:29     | K  CHAR  | 1    User field 29                   |     |     |     |
| FU:30     | K  CHAR  | 1    User field 30                   |     |     |     |
| FU:31     | K  CHAR  | 1    User field 31                   |     |     |     |
| FU:32     | K  CHAR  | 1    User field 32                   |     |     |     |
| FU:33     | K  CHAR  | 1    User field 33                   |     |     |     |
| FU:34     | K  CHAR  | 1    User field 34                   |     |     |     |
| FU:35     | K  CHAR  | 1    User field 35                   |     |     |     |
| FU:36     | K  CHAR  | 1    User field 36                   |     |     |     |
| FU:37     | K  CHAR  | 1    User field 37                   |     |     |     |
| FU:38     | K  CHAR  | 1    User field 38                   |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 20 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | V  T     | L  D  Description    |     |     |     |
| ------ | -------- | -------------------- | --- | --- | --- |
| FU:39  | K  CHAR  | 1    User field 39   |     |     |     |
| FU:40  | K  CHAR  | 1    User field 40   |     |     |     |
| FU:41  | K  CHAR  | 1    User field 41   |     |     |     |
| FU:42  | K  CHAR  | 1    User field 42   |     |     |     |
| FU:43  | K  CHAR  | 1    User field 43   |     |     |     |
| FU:44  | K  CHAR  | 1    User field 44   |     |     |     |
| FU:45  | K  CHAR  | 10    User field 45  |     |     |     |
| FU:46  | K  CHAR  | 10    User field 46  |     |     |     |
| FU:47  | K  CHAR  | 10    User field 47  |     |     |     |
| FU:48  | K  CHAR  | 10    User field 48  |     |     |     |
| FU:49  | K  CHAR  | 10    User field 49  |     |     |     |
| FU:50  | K  CHAR  | 10    User field 50  |     |     |     |
| FU:51  | K  CHAR  | 20    User field 51  |     |     |     |
| FU:52  | K  CHAR  | 20    User field 52  |     |     |     |
| FU:53  | K  CHAR  | 20    User field 53  |     |     |     |
| FU:54  | K  CHAR  | 20    User field 54  |     |     |     |
| FU:55  | K  CHAR  | 20    User field 55  |     |     |     |
| FU:56  | K  CHAR  | 20    User field 56  |     |     |     |
| FU:57  | K  CHAR  | 20    User field 57  |     |     |     |
| FU:58  | K  CHAR  | 20    User field 58  |     |     |     |
| FU:59  | K  CHAR  | 20    User field 59  |     |     |     |
| FU:60  | K  CHAR  | 20    User field 60  |     |     |     |
| FU:61  | K  CHAR  | 20    User field 61  |     |     |     |
| FU:62  | K  CHAR  | 20    User field 62  |     |     |     |
| FU:63  | K  CHAR  | 20    User field 63  |     |     |     |
| FU:64  | K  CHAR  | 20    User field 64  |     |     |     |
| FU:65  | K  CHAR  | 40    User field 65  |     |     |     |
| FU:66  | K  CHAR  | 40    User field 66  |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 21 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

Interface Material and Batch Data
5 Material consumptions MES --> ERP
Overview
The system transfers the material withdrawals recorded in the MES including the return transfers to the
ERP system.
In the ERP system the withdrawal postings are deducted from the warehouse and added to the individual
production order. If withdrawals for an ERP batch cannot be executed in the production warehouse
specified by the MES (missing inventory), the posting will be performed for that warehouse where the
ERP batch is found. Only if this also fails will the system issue an error message. The ERP system should
also use this approach (searching for an ERP batch) for return transfers.
The MES provides this data to the ERP system at regular intervals. The IDoc is of the type ZWAU02. This
leads to the following IDoc specification:
Message type ZWAU
File name (for file transfers) Z2WAU000X000
File extension (for file Depending on the configuration (by default ".dat“)
transfer)
IDOC type (with tRFC ZWAU02
communication):
Segments: Z2WAU000X000 (goods issues)
Respect the following conventions if SAP is connected:
Create SAP segment names according to the pattern Z1<segment name> in order to generate
the above-mentioned segment names in SAP. Versioning in SAP outbound processing then
creates the segment names in the form Z2<Segment name><Version>.
Example: the created segment name Z1WAU000X is converted to Z2WAU000X000.
This documentation uses the below-mentioned column headings with the meanings described here:
Column Description
Field Name of the field
V (usage) S Key field clearly identifying the data record. (Further key fields might be required). The field
must be populated.
M Mandatory field which must be populated with a valid value.
K Field may stay empty (optional field).
EIS-MCL_81.docx Version: 1.1.22690 Page 22 of 47

|     |     |     |     | Interface Material and Batch Data  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

| Column    | Description                          |     |     |     |     |     |
| --------- | ------------------------------------ | --- | --- | --- | --- | --- |
| T(ype)    | Data type according to description.  |     |     |     |     |     |
| L(ength)  | Field length                         |     |     |     |     |     |
For fields of data type DEC: Total number of digits without decimal separator and algebraic sign.
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Field description and/or comments on the field.  |     |     |     |     |     |
| ------------ | ------------------------------------------------ | --- | --- | --- | --- | --- |

Movement types
In general, the following movement types are supported:
| Movement type  |      | Description/ usage                                |     |     |     |     |
| -------------- | ---- | ------------------------------------------------- | --- | --- | --- | --- |
|                | 261  | Goods issue for production order                  |     |     |     |     |
|                | 262  | Cancellation of goods issue for production order  |     |     |     |     |

Data structure (Z2WAU000X000)
| Field   | T  L     | D  Description                                 |     |     |     |     |
| ------- | -------- | ---------------------------------------------- | --- | --- | --- | --- |
| WERK    | CHAR  4  |   Company/ plant/ site; stored in MES (fixed)  |     |     |     |     |
| BEWART  | CHAR  3  |   Movement type (see table above)              |     |     |     |     |
MATPUF  CHAR  12    referring to batch: Material buffer according to batch inventory in MES
  anonymous batch  input buffer of the machine number (MNR)
| LGORT  | CHAR  20  |   ERP storage location  |     |     |     |     |
| ------ | --------- | ----------------------- | --- | --- | --- | --- |
Storage location stored to the material buffer.
| ATK    | CHAR  40  |   Material number               |     |     |     |     |
| ------ | --------- | ------------------------------- | --- | --- | --- | --- |
| MENGE  | QUAN  13  | 3  Batch quantity/ consumption  |     |     |     |     |
The consumed quantity is always provided with a positive sign.
| MENGE_EINH  | CHAR  3  |   Unit for batch quantity/consumption  |     |     |     |     |
| ----------- | -------- | -------------------------------------- | --- | --- | --- | --- |
ANR  CHAR  40    Combined  HYDRA  production  order  number for  which material  has  been
withdrawn.
The exact length that is uploaded/confirmed depends on how the lengths are
configured for the order or operation in the HYDRA basic parameter settings.
Used for ERP inbound processing if SAP is not used.
| SAP_AUNR  | CHAR  12  |   SAP order number  |     |     |     |     |
| --------- | --------- | ------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_AFOLG  | CHAR  6  |   SAP sequence number   |     |     |     |     |
| ---------- | -------- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_VORNR  | CHAR  4  |   SAP operation number  |     |     |     |     |
| ---------- | -------- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_UVGNR  | CHAR  4  |   SAP sub-operation number  |     |     |     |     |
| ---------- | -------- | --------------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
KZEAUS  CHAR  1    J - indicates whether this is the last withdrawal for this component. The system
|     |     | sets  this   | ID  for  automatically  | logged  off        | input  batches  | when  logging  off  |
| --- | --- | ------------ | ----------------------- | ------------------ | --------------- | ------------------- |
|     |     | operations.  | The  ID  indicates      | that  no  further  | consumption     | occurs  for  an     |
operation-related component.
HY_LOSNR  CHAR  20    MES batch number (corresponding to this ERP batch).

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     |     | Page 23 of 47  |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | T  L  | D  Description  |     |     |     |
| ------ | ----- | --------------- | --- | --- | --- |
HY_DLLNR  CHAR  20    MES throughput batch number (corresponding to this ERP batch)
| ARBPL  | CHAR  8  |   Consuming MES machine  |     |     |     |
| ------ | -------- | ------------------------ | --- | --- | --- |
GRND  NUM  4    Reserved (e.g. blocking reason when batch is logged off)
LHW  CHAR  20    Information on batch if there is a reference to the input batch
PERSNO  NUM  8    Personnel number of the person logged in to the terminal
| LST01  | QUAN  13  | 3  Consumption activity 1  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST01_EINH  | CHAR  3  |   Unit of activity 1  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST02  | QUAN  13  | 3  Consumption activity 2  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST02_EINH  | CHAR  3  |   Unit of activity 2  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST03  | QUAN  13  | 3  Consumption activity 3  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST03_EINH  | CHAR  3  |   Unit of activity 3  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST04  | QUAN  13  | 3  Consumption activity 4  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST04_EINH  | CHAR  3  |   Consumption unit of activity 4  |     |     |     |
| ----------- | -------- | --------------------------------- | --- | --- | --- |

| LST05  | QUAN  13  | 3  Consumption activity 5  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST05_EINH  | CHAR  3  |   Unit of activity 5  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LST06  | QUAN  13  | 3  Consumption activity 6  |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- |

| LST06_EINH  | CHAR  3  |   Unit of activity 6  |     |     |     |
| ----------- | -------- | --------------------- | --- | --- | --- |

| LOSSTATUS  | CHAR  1  |   Batch status when input batch is logged off  |     |     |     |
| ---------- | -------- | ---------------------------------------------- | --- | --- | --- |

| LOSKLASSE  | CHAR  1  |   Batch class when input batch is logged off  |     |     |     |
| ---------- | -------- | --------------------------------------------- | --- | --- | --- |

| CHARGENNUMMER  | CHAR  10  |   ERP batch number  |     |     |     |
| -------------- | --------- | ------------------- | --- | --- | --- |

| CHARGENNUMMER_ | CHAR  20  |   ERP batch number (long)  |     |     |     |
| -------------- | --------- | -------------------------- | --- | --- | --- |
LONG  Available from MPL 8.2 on - please also see the following information on field
CHARGENNUMMER_LONG
| MSL_VFDATE  | DATE  8  |   MSL expiry date  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_VFTIME  | TIME  6  |   MSL expiry time  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_PERIOD  | NUMC  8  |   MSL term  |     |     |     |
| ----------- | -------- | ----------- | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.

Information on the fields CHARGENNUMMER / CHARGENNUMMER_LONG
The field CHARGENNUMMER_LONG is only available as of MPL 8.2.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 24 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

Interface Material and Batch Data
If MPL 8.2 is used, the fields CHARGENNUMMER and CHARGENNUMMER_LONG are populated
as follows:
CHARGENNUMMER includes the ERP batch number with the characters 1-10.
CHARGENNUMMER_LONG includes the ERP batch number with the characters 1-20.
You should use the value of the CHARGENNUMMER_LONG field for new installations.
EIS-MCL_81.docx Version: 1.1.22690 Page 25 of 47

|     |     |     |     |     | Interface Material and Batch Data  |     |     |
| --- | --- | --- | --- | --- | ---------------------------------- | --- | --- |

6  Goods Receipt MES --> ERP
Overview
|     |    |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
|     |    |     |     |     |     |     |     |
The interface transfers all output batches generated from production orders in the MES for inventory-
managed material maintained in the ERP system to the ERP system.
The interface transfers the tree of origin and the user-defined fields (of the producing operation) for each
lot (= batch).
The MES provides the data at regular intervals to the ERP system. The IDoc is of the type ZWEI02. This
leads to the following specification:
| Message type:                  |     | ZWEI          |     |     |     |     |     |
| ------------------------------ | --- | ------------- | --- | --- | --- | --- | --- |
| File name (for file transfers) |     | Z2WEI000X000  |     |     |     |     |     |

File extension (for file  Depending on the configuration (by default ".dat“)
transfers):
| IDOC type (with tRFC  |     | ZWEI02  |     |     |     |     |     |
| --------------------- | --- | ------- | --- | --- | --- | --- | --- |
communication):
| Segments:  |     | Z2WEI000X000 (goods receipts)  |     |     |     |     | 1 – n  |
| ---------- | --- | ------------------------------ | --- | --- | --- | --- | ------ |
Z2CNRATT_C000X000 (alphanumeric batch attributes part 1)
  0 – 1
Z2CNRATT_C001X000 (alphanumeric batch attributes part 2)
  0 – 1
Z2CNRATT_N000X000 (numeric batch attributes) - OBSOLETE6
0 – 1
|     |     | Z2CNRATT_N001X000 (numeric batch attributes)7    |     |     |     |          | 0 – 1  |
| --- | --- | ------------------------------------------------ | --- | --- | --- | -------- | ------ |
|     |     | Z2CNRBAUM000X000 (optional: tree of generation)  |     |     |     |          | 0 – n  |
|     |     | Z2TOLO000X000 (optional: sub-batches)            |     |     |     |          | 0 – n  |
|     |     | Z2CNR_USRFLD000X000 (optional: user fields)8     |     |     |     |   0 – 1  |        |

6You should no longer use this segment for new installations. Use the segment Z2CNRATT_N001X000 instead. The
segment Z2CNRATT_N000X000 is still available (backwards compatible) but will no longer be maintained. Both
segments have different field lengths for their decimal fields.
7 Please note the information on the activation in section Numeric attributes (Z2CNRATT_N001X000).
8 Please note the information on the activation in section User fields (Z2CNR_USRFLD000X000).

| EIS-MCL_81.docx  |     |     | Version: 1.1.22690  |     |     | Page 26 of 47  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- | --- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Note the following conventions if SAP is connected:
Create SAP segment names according to the pattern Z1<segment name> in order to generate
the above-mentioned segment names in SAP. Versioning in SAP outbound processing then

generates segment names in the form Z2<Segment name><Version>.
Example: the created segment name Z1WEI000X becomes Z2WEI000X000

Movement types
Goods receipts are transferred from the MES to the ERP system using the IDoc and message types
described below. The movement type specifies the action (goods receipt, stock transfer, etc.) that must
be triggered in the ERP system.
The following table describes which movement type is used to transfer goods receipt postings to the ERP
system:
| Movement type  | Description/ usage  |     |     |     |     |
| -------------- | ------------------- | --- | --- | --- | --- |
101  Standard goods receipt from production order: Goods receipt for batches where
the option "Transfer to interface“ is set for the material type.
| 102  | Cancellation of goods receipt                            |     |     |     |     |
| ---- | -------------------------------------------------------- | --- | --- | --- | --- |
| 525  | Goods receipt for batches that are blocked in the MES.   |     |     |     |     |
| 531  | Goods receipt for waste batches                          |     |     |     |     |
532  Cancellation of goods receipt for waste batches and batches

Goods receipt (Z2WEI000X000)
The data record described below transfers the goods receipt. The detailed information:
| - user-specific fields     |     |     |     |     |     |
| -------------------------- | --- | --- | --- | --- | --- |
| - tree of generation       |     |     |     |     |     |
| - sub-batches for pallets  |     |     |     |     |     |
is transferred in sub-segments.
| Field  | T  L     | D  Description                    |     |     |     |
| ------ | -------- | --------------------------------- | --- | --- | --- |
| WERK   | CHAR  4  |   Plant; stored in HYDRA (fixed)  |     |     |     |

| BEWART  | CHAR  3  |   Movement type: see table above  |     |     |     |
| ------- | -------- | --------------------------------- | --- | --- | --- |

| GRUND  | NUM  4  |   e.g. blocking reason for BEWART 525  |     |     |     |
| ------ | ------- | -------------------------------------- | --- | --- | --- |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 27 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | T  L      | D  Description             |     |     |     |     |
| ------ | --------- | -------------------------- | --- | --- | --- | --- |
| ZLO    | CHAR  12  |   Target material buffer   |     |     |     |     |

| LGORT  | CHAR  20  |   ERP storage location                                  |     |     |     |     |
| ------ | --------- | ------------------------------------------------------- | --- | --- | --- | --- |
|        |           | Storage location stored to the target material buffer.  |     |     |     |     |
| LGPZ   | CHAR  20  |   ERP storage bin                                       |     |     |     |     |

| CHARGE  | CHAR  10  |   ERP batch number  |     |     |     |     |
| ------- | --------- | ------------------- | --- | --- | --- | --- |

| MATNR  | CHAR  40  |   Material number  |     |     |     |     |
| ------ | --------- | ------------------ | --- | --- | --- | --- |

| MATTYP  | CHAR  10  |   Material type in HYDRA  |     |     |     |     |
| ------- | --------- | ------------------------- | --- | --- | --- | --- |

MENGE  QUAN  13  3  Quantity (primary quantity of the producing operation)

MENGE_EINH  CHAR  3    Quantity unit (primary quantity of the producing operation)
|     |     | Unit for the quantity in MENGE  |     |     |     |     |
| --- | --- | ------------------------------- | --- | --- | --- | --- |
ANR  CHAR  40    HYDRA order number = combined order/ operation number
  The exact length that is uploaded/confirmed depends on how the lengths are
configured for the order or operation in the HYDRA basic parameter settings.
Used for ERP inbound processing if SAP is not in use.
| SAP_AUNR  | 12    |   SAP order number  |     |     |     |     |
| --------- | ----- | ------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_AFOLG  | 6    |   SAP sequence number   |     |     |     |     |
| ---------- | ---- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_VORNR  | 4    |   SAP operation number  |     |     |     |     |
| ---------- | ---- | ----------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| SAP_UVGNR  | 4    |   SAP sub-operation number  |     |     |     |     |
| ---------- | ---- | --------------------------- | --- | --- | --- | --- |
Used for ERP inbound processing if SAP is in use.
| KZSOBEST  | CHAR  1  |   Not used, populated with "   " (blanks).  |     |     |     |     |
| --------- | -------- | ------------------------------------------- | --- | --- | --- | --- |
KZ_ABZWEIG  CHAR  1    Indicates if the material derives from the planned deducted material:
  Comes  from  the  OP  data  record  and  has  the  following  meaning:
|     |     | "M“  | Master OP of planned  deducted material  |     |     |     |
| --- | --- | ---- | ---------------------------------------- | --- | --- | --- |
"K“
|     |     |      | Sub-OP  | of  planned  |   deducted  | material   |
| --- | --- | ---- | ------- | ------------ | ----------- | ---------- |
|     |     | " “  | other   |              |             |            |
END_LIEF  CHAR  1    Indicates if this is the last batch of the operation.
|     |     | "J“  | last batch  |     |     |     |
| --- | --- | ---- | ----------- | --- | --- | --- |
"N“
other
The value "J" is set if the last output batch is completed when logging off the
OP.
INDEX  NUMC  4    Index (counter) of the batches within a production order.

| HY_LOSNR  | CHAR  20  |   HYDRA batch number   |     |     |     |     |
| --------- | --------- | ---------------------- | --- | --- | --- | --- |

| HY_DLLNR  | CHAR  20  |   HYDRA throughput batch number   |     |     |     |     |
| --------- | --------- | --------------------------------- | --- | --- | --- | --- |

| Z_MENGE  | QUAN  13  | 3  Not used; by default: 0      |     |     |     |     |
| -------- | --------- | ------------------------------- | --- | --- | --- | --- |
| Z_MEINH  | CHAR  3   |   Not used; by default: "   "   |     |     |     |     |
| ARBPL    | CHAR  8   |   Producing HYDRA machine       |     |     |     |     |

| ANZ_TR  | NUMC  8  |   Pallet (package):                          |     |     |     |     |
| ------- | -------- | -------------------------------------------- | --- | --- | --- | --- |
|         |          | Number of individual batches for the pallet  |     |     |     |     |

| EIS-MCL_81.docx  |     |     | Version: 1.1.22690  |     |     | Page 28 of 47  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field       | T  L      | D  Description                  |     |     |     |
| ----------- | --------- | ------------------------------- | --- | --- | --- |
| LOSHINWEIS  | CHAR  20  |   Entered information on batch  |     |     |     |

| LST01  | QUAN  13  | 3  Activity 1  |     |     |     |
| ------ | --------- | -------------- | --- | --- | --- |

| LST01_EINH  | CHAR  3   |   Unit of activity 1  |     |     |     |
| ----------- | --------- | --------------------- | --- | --- | --- |
| LST02       | QUAN  13  | 3  Activity 2         |     |     |     |

| LST02_EINH  | CHAR  3   |   Unit of activity 2  |     |     |     |
| ----------- | --------- | --------------------- | --- | --- | --- |
| LST03       | QUAN  13  | 3  Activity 3         |     |     |     |

| LST03_EINH  | CHAR  3   |   Unit of activity 3  |     |     |     |
| ----------- | --------- | --------------------- | --- | --- | --- |
| LST04       | QUAN  13  | 3  Activity 4         |     |     |     |

| LST04_EINH  | CHAR  3   |   Unit of activity 4  |     |     |     |
| ----------- | --------- | --------------------- | --- | --- | --- |
| LST05       | QUAN  13  | 3  Activity 5         |     |     |     |

| LST05_EINH  | CHAR  3   |   Unit of activity 5  |     |     |     |
| ----------- | --------- | --------------------- | --- | --- | --- |
| LST06       | QUAN  13  | 3  Activity 6         |     |     |     |

| LST06_EINH  | CHAR  3  |   Unit of activity 6           |     |     |     |
| ----------- | -------- | ------------------------------ | --- | --- | --- |
| VVDAT       | DATE  8  |   Availability date (MPL-MMO)  |     |     |     |
  If MPL-MMO is not used, you should set the value to the current point in time.
| VVZEI  | TIME  6  |   Availability time (MPL-MMO)  |     |     |     |
| ------ | -------- | ------------------------------ | --- | --- | --- |
  If MPL-MMO is not used, you should set the value to the current point in time.
| WDAT  | DATE  8  |   Warning date (MPL-MMO)  |     |     |     |
| ----- | -------- | ------------------------- | --- | --- | --- |
  If MPL-MMO is not used, you should set the value to 31.12.9999.
| WZEI  | TIME  6  |   Warning time (MPL-MMO)  |     |     |     |
| ----- | -------- | ------------------------- | --- | --- | --- |
  If MPL-MMO is not used, you should set the value to 23:59:59.
| VFDAT  | DATE  8  |   Expiry date (MPL-MMO)  |     |     |     |
| ------ | -------- | ------------------------ | --- | --- | --- |
  If MPL-MMO is not used, you should set the value to 31.12.9999.
| VFZEI  | TIME  6  |   Expiry time (MPL-MMO)   |     |     |     |
| ------ | -------- | ------------------------- | --- | --- | --- |
  If MPL-MMO is not used, you should set the value to 23:59:59.
| KLASSE  | CHAR  1  |   Batch class       |     |     |     |
| ------- | -------- | ------------------- | --- | --- | --- |
|         |          | "G"  Yield          |     |     |     |
|         |          | "A"  Scrap/ waste   |     |     |     |
As of MPL 8.2 the following, additional indicators are available:
|         |          | "O“  Open quantity / problem quantity  |     |     |     |
| ------- | -------- | -------------------------------------- | --- | --- | --- |
|         |          | "N“  Rework                            |     |     |     |
| STATUS  | CHAR  1  |   Batch status to be set               |     |     |     |
|         |          | F  Free/available                      |     |     |     |
|         |          | S  Blocked                             |     |     |     |
| MATST   | CHAR  1  |   Material status                      |     |     |     |

| QST  | CHAR  1  |   Quality status  |     |     |     |
| ---- | -------- | ----------------- | --- | --- | --- |

| QSTMANU  | CHAR  1  |   Manual quality status  |     |     |     |
| -------- | -------- | ------------------------ | --- | --- | --- |

| TST  | CHAR  1  |   Transport status  |     |     |     |
| ---- | -------- | ------------------- | --- | --- | --- |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 29 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field   | T  L    | D  Description      |     |     |     |
| ------- | ------- | ------------------- | --- | --- | --- |
| PERSNO  | NUM  8  |   Personnel number  |     |     |     |

| TPE       | CHAR  10  |   Transport unit              |     |     |     |
| --------- | --------- | ----------------------------- | --- | --- | --- |
| CNR_ALT1  | CHAR  20  |   Alternative batch number 1  |     |     |     |

| CNR_ALT2  | CHAR  20  |   Alternative batch number 2   |     |     |     |
| --------- | --------- | ------------------------------ | --- | --- | --- |

| CNR_ALT3  | CHAR  20  |   Alternative batch number 3   |     |     |     |
| --------- | --------- | ------------------------------ | --- | --- | --- |

| CNR_ALT4  | CHAR  20  |   Alternative batch number 4   |     |     |     |
| --------- | --------- | ------------------------------ | --- | --- | --- |

| CNR_ALT5  | CHAR  40  |   Alternative batch number 5   |     |     |     |
| --------- | --------- | ------------------------------ | --- | --- | --- |

| EXTCNR  | CHAR  20  |   External batch number (e.g. batch number)  |     |     |     |
| ------- | --------- | -------------------------------------------- | --- | --- | --- |

| MCNR  | CHAR  20  |   Merged batch number  |     |     |     |
| ----- | --------- | ---------------------- | --- | --- | --- |

| ATTR1  | NUM  8  |   Direct batch attribute 1  |     |     |     |
| ------ | ------- | --------------------------- | --- | --- | --- |

| ATTR2  | NUM  8  |   Direct batch attribute 2  |     |     |     |
| ------ | ------- | --------------------------- | --- | --- | --- |

| ATTR3  | NUM  8  |   Direct batch attribute 3  |     |     |     |
| ------ | ------- | --------------------------- | --- | --- | --- |

| ATTR4  | DEC  13  | 3  Direct batch attribute 4  |     |     |     |
| ------ | -------- | ---------------------------- | --- | --- | --- |

| ATTR5  | DEC  13  | 3  Direct batch attribute 5  |     |     |     |
| ------ | -------- | ---------------------------- | --- | --- | --- |

| ATTR6  | DEC  13  | 3  Direct batch attribute 6  |     |     |     |
| ------ | -------- | ---------------------------- | --- | --- | --- |

| ATTR7  | CHAR  4  |   Direct batch attribute 7  |     |     |     |
| ------ | -------- | --------------------------- | --- | --- | --- |

| ATTR8  | CHAR  10  |   Direct batch attribute 8  |     |     |     |
| ------ | --------- | --------------------------- | --- | --- | --- |

| ATTR9  | CHAR  10  |   Direct batch attribute 9  |     |     |     |
| ------ | --------- | --------------------------- | --- | --- | --- |

| ATTR10  | CHAR  20  |   Direct batch attribute 10  |     |     |     |
| ------- | --------- | ---------------------------- | --- | --- | --- |

| CHARGE_LONG  | CHAR  20  |   ERP batch number (long)  |     |     |     |
| ------------ | --------- | -------------------------- | --- | --- | --- |
  Available from MPL 8.2 on - please also see the following information on field
CHARGE_LONG
| MSL_VFDATE  | DATE  8  |   MSL expiry date  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_VFTIME  | TIME  6  |   MSL expiry time  |     |     |     |
| ----------- | -------- | ------------------ | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
| MSL_PERIOD  | NUMC  8  |   MSL term  |     |     |     |
| ----------- | -------- | ----------- | --- | --- | --- |
This field is only available if the database patch "dbp_mpl_mslmonitoring.hsc“ is
executed.
Please note: Batch-related fields are only populated if the movements refer to batches.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 30 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Information on the fields CHARGE / CHARGE_LONG
The field CHARGE_LONG is only available as of MPL 8.2.
If MPL 8.2 is used, the fields CHARGE and CHARGE_LONG are populated as follows:
CHARGE includes the ERP batch number with the characters 1-10.
CHARGE_LONG includes the ERP batch number with the characters 1-20.
You should use the value of the CHARGE_LONG field for new installations.
Alphanumeric attributes (Z2CNRATT_C000X000)
The following segment transfers the (first 20) alphanumeric batch attributes.
| Field       | T  L      | D  Description                  |     |     |     |
| ----------- | --------- | ------------------------------- | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number            |     |     |     |
| ATTRIB_101  | CHAR  40  |   Alphanumeric batch attribute  |     |     |     |
| ATTRIB_102  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_103  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_104  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_105  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_106  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_107  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_108  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_109  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_110  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_111  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_112  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_113  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_114  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_115  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_116  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_117  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_118  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_119  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_120  | CHAR  40  |   ...                           |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 31 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Alphanumeric attributes (Z2CNRATT_C001X000)
The following segment transfers the (first 20) alphanumeric batch attributes.
| Field       | T  L      | D  Description                  |     |     |     |
| ----------- | --------- | ------------------------------- | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number            |     |     |     |
| ATTRIB_121  | CHAR  40  |   Alphanumeric batch attribute  |     |     |     |
| ATTRIB_122  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_123  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_124  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_125  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_126  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_127  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_128  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_129  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_130  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_131  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_132  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_133  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_134  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_135  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_136  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_137  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_138  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_139  | CHAR  40  |   ...                           |     |     |     |
| ATTRIB_140  | CHAR  40  |   ...                           |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 32 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

Numeric attributes (Z2CNRATT_N000X000) - OBSOLETE
The following segment transfers the numeric batch attributes.
| Field       | T  L      | D  Description                       |     |     |     |
| ----------- | --------- | ------------------------------------ | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number                 |     |     |     |
| ATTRIB_201  | NUMC  8   |   Integer, numeric batch attribute   |     |     |     |
| ATTRIB_202  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_203  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_204  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_205  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_206  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_207  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_208  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_209  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_210  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_211  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_212  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_213  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_214  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_215  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_216  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_217  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_218  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_219  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_220  | NUMC  8   |   ...                                |     |     |     |
| ATTRIB_301  | DEC  10   | 3  Decimal, numeric batch attribute  |     |     |     |
| ATTRIB_302  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_303  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_304  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_305  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_306  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_307  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_308  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_309  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_310  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_311  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_312  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_313  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_314  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_315  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_316  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_317  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_318  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_319  | DEC  10   | 3  ...                               |     |     |     |
| ATTRIB_320  | DEC  10   | 3  ...                               |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 33 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |     |
| --- | --- | --- | --- | ---------------------------------- | --- | --- |

Numeric attributes (Z2CNRATT_N001X000)
As of version 1.72946 (2015/SP7) of the script mle_rckmestyp_zwei_out.hsc, you can use the segment
Z2CNRATT_N001X000 to upload/confirm the numeric attributes of a batch.
Depending on the product version in use, you might have to activate the segment manually:
| MPL/TRT 8.1  |     |     | MPL/TRT 8.2  |     |     |     |
| ------------ | --- | --- | ------------ | --- | --- | --- |
You  have  to  enable  uploads  via  the  segment  For new installations after SP7/2015 the segment
| Z2CNRATT_N001X000 manually.  |     |     | is used by default.  |             |               |                |
| ---------------------------- | --- | --- | -------------------- | ----------- | ------------- | -------------- |
|                              |     |     | You  have            | to  enable  | the  segment  | manually  for  |
installations prior to that date.

You have to enable the transfer of the segment manually in the HYDRA INI configuration.
Data is read from the HYDRA table los_bestand
| Field       | T  L      | D  Description                      |     |     |     |     |
| ----------- | --------- | ----------------------------------- | --- | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number                |     |     |     |     |
| ATTRIB_201  | NUMC  8   |   Integer, numeric batch attribute  |     |     |     |     |
| ATTRIB_202  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_203  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_204  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_205  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_206  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_207  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_208  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_209  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_210  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_211  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_212  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_213  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_214  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_215  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_216  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_217  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_218  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_219  | NUMC  8   |   ...                               |     |     |     |     |
| ATTRIB_220  | NUMC  8   |   ...                               |     |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     |     | Page 34 of 47  |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field       | T  L     | D  Description                       |     |     |     |
| ----------- | -------- | ------------------------------------ | --- | --- | --- |
| ATTRIB_301  | DEC  13  | 3  Decimal, numeric batch attribute  |     |     |     |
| ATTRIB_302  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_303  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_304  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_305  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_306  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_307  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_308  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_309  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_310  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_311  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_312  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_313  | DEC  13  | 3  ...                               |     |     |     |
| ATTRIB_314  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_315  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_316  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_317  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_318  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_319  | DEC  10  | 3  ...                               |     |     |     |
| ATTRIB_320  | DEC  10  | 3  ...                               |     |     |     |

Tree of generation (Z2CNRBAUM000X000)
The following data record is part of the tree of generation of a batch. These are "OPTIONAL“ segments,
i.e. they are only included in the IDoc if they actually exist.
Data is read from the HYDRA table LOS_ZUORDNUNGEN.
| Field      | T  L      | D  Description                       |     |     |     |
| ---------- | --------- | ------------------------------------ | --- | --- | --- |
| HY_ALOSNR  | CHAR  20  |   HYDRA batch number (output batch)  |     |     |     |
lz.al_nr
| A_CHARGE      | CHAR  10  |   ERP batch number of the output batch       |     |     |     |
| ------------- | --------- | -------------------------------------------- | --- | --- | --- |
| lz.al_charge  |           | ... populated if the batch is an ERP batch.  |     |     |     |
| A_MATNR       | CHAR  40  |   Material number of the output batch        |     |     |     |
lz.al_matnr  Known in the ERP system for inventory-managed materials.
| HY_ELOSNR  | CHAR  20  |   HYDRA batch number (input batch)  |     |     |     |
| ---------- | --------- | ----------------------------------- | --- | --- | --- |

| E_CHARGE  | CHAR  10  |   ERP batch number of the input batch  |     |     |     |
| --------- | --------- | -------------------------------------- | --- | --- | --- |
... populated if the batch is an ERP batch.
| E_MATNR  | CHAR  40  |   Material number of the input batch   |     |     |     |
| -------- | --------- | -------------------------------------- | --- | --- | --- |
Known in the ERP system for inventory-managed materials.
| E_POS  | CHAR  10  |   BOM item of the input batch  |     |     |     |
| ------ | --------- | ------------------------------ | --- | --- | --- |
ANR  CHAR  40    HYDRA production order producing the output batch.

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 35 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | T  L  | D  Description  |     |     |     |
| ------ | ----- | --------------- | --- | --- | --- |
ARBPL  CHAR  8    Machine where the output batch was generated.
| DATUM  | DATE  8  |   Creation date of the output batch  |     |     |     |
| ------ | -------- | ------------------------------------ | --- | --- | --- |
| ZEIT   | TIME  6  |   Creation time of the output batch  |     |     |     |

Note
You should manage this information in a user-specific table "ZCNRBAUM“ in the ERP system. The
structure of this table should be identical to that of the segment.
Sub-batches (Z2TOLO000X000)
For pallets: The described sub-segment transfers the included sub-batches that are assigned to the
pallets. These are "OPTIONAL“ segments, i.e. they are only included in the IDoc if they actually exist.
Data is read from the HYDRA table ZTOLO.
| Field       | T  L      | D  Description                            |     |     |     |
| ----------- | --------- | ----------------------------------------- | --- | --- | --- |
| HY_LOSNR    | CHAR  20  |   HYDRA batch number of individual batch  |     |     |     |
| MATNR       | CHAR  40  |   HYDRA material number                   |     |     |     |
| MATTYP      | CHAR  10  |   HYDRA material type                     |     |     |     |
| MATTXT      | CHAR  40  |   HYDRA material name                     |     |     |     |
| MENGE       | QUAN  13  | 3  Quantity of individual batch           |     |     |     |
| MENGE_EINH  | CHAR  3   |   Quantity unit                           |     |     |     |
| LST01       | QUAN  13  | 3  Activity 1                             |     |     |     |
| LST01_EINH  | CHAR  3   |   Unit of activity 1                      |     |     |     |
| LST02       | QUAN  13  | 3  Activity 2                             |     |     |     |
| LST02_EINH  | CHAR  3   |   Unit of activity 2                      |     |     |     |
| LST03       | QUAN  13  | 3  Activity 3                             |     |     |     |
| LST03_EINH  | CHAR  3   |   Unit of activity 3                      |     |     |     |
| LST04       | QUAN  13  | 3  Activity 4                             |     |     |     |
| LST04_EINH  | CHAR  3   |   Unit of activity 4                      |     |     |     |
| LST05       | QUAN  13  | 3  Activity 5                             |     |     |     |
| LST05_EINH  | CHAR  3   |   Unit of activity 5                      |     |     |     |
| LST06       | QUAN  13  | 3  Activity 6                             |     |     |     |
| LST06_EINH  | CHAR  3   |   Unit of activity 6                      |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 36 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

User fields (Z2CNR_USRFLD000X000)
You  can  transfer/upload  the  user  fields  of  a  batch  as  of  version  1.8  of  the  script
mle_rckmestyp_zwei_out.hsc. Data is transferred in the segment Z2CNR_USRFLD000X000.
You have to enable the transfer of the segment manually in the HYDRA INI configuration.
Data is read from the HYDRA table los_bestand
| Field     | V  T     | L  D  Description                    |     |     |     |
| --------- | -------- | ------------------------------------ | --- | --- | --- |
| HY_LOSNR  | S  CHAR  | 20    HYDRA batch number             |     |     |     |
| FILLER    | S  CHAR  | 20    Placeholder – internal usage   |     |     |     |
| USRFLD    | S  CHAR  | 8    User field key                  |     |     |     |
| FU:1      | K  DATE  | 8    User field 1                    |     |     |     |
| FU:2      | K  DATE  | 8    User field 2                    |     |     |     |
| FU:3      | K  DATE  | 8    User field 3                    |     |     |     |
| FU:4      | K  DATE  | 8    User field 4                    |     |     |     |
| FU:5      | K  DATE  | 8    User field 5                    |     |     |     |
| FU:6      | K  DATE  | 8    User field 6                    |     |     |     |
| FU:7      | K  NUM   | 8    User field 7                    |     |     |     |
| FU:8      | K  NUM   | 8    User field 8                    |     |     |     |
| FU:9      | K  NUM   | 8    User field 9                    |     |     |     |
| FU:10     | K  NUM   | 8    User field 10                   |     |     |     |
| FU:11     | K  NUM   | 8    User field 11                   |     |     |     |
| FU:12     | K  NUM   | 8    User field 12                   |     |     |     |
| FU:13     | K  NUM   | 8    User field 13                   |     |     |     |
| FU:14     | K  NUM   | 8    User field 14                   |     |     |     |
| FU:15     | K  NUM   | 8    User field 15                   |     |     |     |
| FU:16     | K  NUM   | 8    User field 16                   |     |     |     |
| FU:17     | K  NUM   | 8    User field 17                   |     |     |     |
| FU:18     | K  NUM   | 8    User field 18                   |     |     |     |
| FU:19     | K  NUM   | 8    User field 19                   |     |     |     |
| FU:20     | K  NUM   | 8    User field 20                   |     |     |     |
| FU:21     | K  NUM   | 8    User field 21                   |     |     |     |
| FU:22     | K  NUM   | 8    User field 22                   |     |     |     |
| FU:23     | K  DEC   | 13  3  User field 23                 |     |     |     |
| FU:24     | K  DEC   | 13  3  User field 24                 |     |     |     |
| FU:25     | K  DEC   | 13  3  User field 25                 |     |     |     |
| FU:26     | K  DEC   | 13  3  User field 26                 |     |     |     |
| FU:27     | K  DEC   | 13  3  User field 27                 |     |     |     |
| FU:28     | K  DEC   | 13  3  User field 28                 |     |     |     |
| FU:29     | K  CHAR  | 1    User field 29                   |     |     |     |
| FU:30     | K  CHAR  | 1    User field 30                   |     |     |     |
| FU:31     | K  CHAR  | 1    User field 31                   |     |     |     |
| FU:32     | K  CHAR  | 1    User field 32                   |     |     |     |
| FU:33     | K  CHAR  | 1    User field 33                   |     |     |     |
| FU:34     | K  CHAR  | 1    User field 34                   |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 37 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field  | V  T     | L  D  Description    |     |     |     |
| ------ | -------- | -------------------- | --- | --- | --- |
| FU:35  | K  CHAR  | 1    User field 35   |     |     |     |
| FU:36  | K  CHAR  | 1    User field 36   |     |     |     |
| FU:37  | K  CHAR  | 1    User field 37   |     |     |     |
| FU:38  | K  CHAR  | 1    User field 38   |     |     |     |
| FU:39  | K  CHAR  | 1    User field 39   |     |     |     |
| FU:40  | K  CHAR  | 1    User field 40   |     |     |     |
| FU:41  | K  CHAR  | 1    User field 41   |     |     |     |
| FU:42  | K  CHAR  | 1    User field 42   |     |     |     |
| FU:43  | K  CHAR  | 1    User field 43   |     |     |     |
| FU:44  | K  CHAR  | 1    User field 44   |     |     |     |
| FU:45  | K  CHAR  | 10    User field 45  |     |     |     |
| FU:46  | K  CHAR  | 10    User field 46  |     |     |     |
| FU:47  | K  CHAR  | 10    User field 47  |     |     |     |
| FU:48  | K  CHAR  | 10    User field 48  |     |     |     |
| FU:49  | K  CHAR  | 10    User field 49  |     |     |     |
| FU:50  | K  CHAR  | 10    User field 50  |     |     |     |
| FU:51  | K  CHAR  | 20    User field 51  |     |     |     |
| FU:52  | K  CHAR  | 20    User field 52  |     |     |     |
| FU:53  | K  CHAR  | 20    User field 53  |     |     |     |
| FU:54  | K  CHAR  | 20    User field 54  |     |     |     |
| FU:55  | K  CHAR  | 20    User field 55  |     |     |     |
| FU:56  | K  CHAR  | 20    User field 56  |     |     |     |
| FU:57  | K  CHAR  | 20    User field 57  |     |     |     |
| FU:58  | K  CHAR  | 20    User field 58  |     |     |     |
| FU:59  | K  CHAR  | 20    User field 59  |     |     |     |
| FU:60  | K  CHAR  | 20    User field 60  |     |     |     |
| FU:61  | K  CHAR  | 20    User field 61  |     |     |     |
| FU:62  | K  CHAR  | 20    User field 62  |     |     |     |
| FU:63  | K  CHAR  | 20    User field 63  |     |     |     |
| FU:64  | K  CHAR  | 20    User field 64  |     |     |     |
| FU:65  | K  CHAR  | 40    User field 65  |     |     |     |
| FU:66  | K  CHAR  | 40    User field 66  |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 38 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

7  Usage Decision MES --> ERP
Summary
The collection in HYDRA transforms the production orders into output batches that will be transferred as
goods receipt for the material, which is inventory-managed in the PPS system.
For each lot (= batch) it is possible in HYDRA to take a usage decision and to transmit it to the PPS-
system.
To do so, the option "Retain until usage decision“ will be used within the material type of the operation.
After that a usage decision was taken for a batch, the goods receipt (ZWEI) will be confirmed/uploaded
and if necessary also the usage decision with the corresponding code.
The data is read from the HYDRA table EVENT_LOS.
For the IDOC this leads to the following specification:
| Message type:          |     | ZCNRVEW          |     |     |     |
| ---------------------- | --- | ---------------- | --- | --- | --- |
| File name (with file-  |     | Z2CNRVEW000X000  |     |     |     |
transfer):
| File extension (with file  |     | Subject to configuration (by default .dat“)  |     |     |     |
| -------------------------- | --- | -------------------------------------------- | --- | --- | --- |
transfer):
| IDOC type:  |     | ZCNRVEW02                         |     |     |     |
| ----------- | --- | --------------------------------- | --- | --- | --- |
| Segments:   |     | Z2CNRVEW000X000 (usage decision)  |     |     |     |

Usage decision (Z2CNRVEW000X000)
This structure is used to transfer the usage decision taken in HYDRA to a batch (a HYDRA batch).
| Field  | T  L      |   Description                          |     |     |     |
| ------ | --------- | -------------------------------------- | --- | --- | --- |
| WERK   | CHAR  4   |   Company/ plant; stored fix to HYDRA  |     |     |     |
| ANR    | CHAR  40  |   Production order that has produced   |     |     |     |

| SAP_AUNR  | 12    |   SAP order number  |     |     |     |
| --------- | ----- | ------------------- | --- | --- | --- |

| SAP_AFOLG  | 6         |   SAP sequence number       |     |     |     |
| ---------- | --------- | --------------------------- | --- | --- | --- |
| SAP_VORNR  | 4         |   SAP operation number      |     |     |     |
| SAP_UVGNR  | 4         |   SAP sub-operation number  |     |     |     |
| CHARGE     | CHAR  10  |   PPS batch number          |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 39 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | Interface Material and Batch Data  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Field     | T  L      |   Description         |     |     |     |
| --------- | --------- | --------------------- | --- | --- | --- |
| HY_LOSNR  | CHAR  20  |   HYDRA batch number  |     |     |     |

DATUM  DATE  8    Date of the usage decision (format yyyymmdd)

| ZEIT  | TIME  6  |   Time of the usage decision (format hhmmss)  |     |     |     |
| ----- | -------- | --------------------------------------------- | --- | --- | --- |

| VCODE     | CHAR  4  |   Usage decision - code         |     |     |     |
| --------- | -------- | ------------------------------- | --- | --- | --- |
|           |          | "RFB“  Free stock               |     |     |     |
|           |          | "RSB“  Locked stock             |     |     |     |
|           |          | "AUS“  Scrap                    |     |     |     |
| VCODEGRP  | CHAR  8  |   Usage decision – code group   |     |     |     |
|           |          | fix: "      “ (blanks)          |     |     |     |

| EIS-MCL_81.docx  |     | Version: 1.1.22690  |     |     | Page 40 of 47  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

Interface Material and Batch Data
8 Settings Relevant to the Application in HYDRA
Maintenance of the distribution model - HYDRA inbound processing
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:
Parameter name Value
To process material staging/material supply
Message type ZMBEW
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to be used
Description Material staging ERP  HYDRA
Log. target system Created logical system
Storage duration 10
Please restart HYDRA after editing entries.
Maintenance of the distribution model - HYDRA outbound processing
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
Parameter name Value
To upload material withdrawals (consumptions):
Message type ZWAU
Description Upload material withdrawals
IDoc type ZWAU
EIS-MCL_81.docx Version: 1.1.22690 Page 41 of 47

Interface Material and Batch Data
Parameter name Value
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2WAU000X000
To upload incoming materials:
Message type ZWEI
Description Upload incoming materials
IDoc type ZWEI02
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2WEI000X000
To upload the usage decision
Message type ZCNRVEW
Description Upload of the usage decision
IDoc type ZCNRVEW02
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2CNRVEW000X000
Scheduler maintenance
The following entries must be made for confirmations/uploads of goods movements in the Scheduler:
Parameter name Value
To upload incoming materials:
EIS-MCL_81.docx Version: 1.1.22690 Page 42 of 47

Interface Material and Batch Data
Parameter name Value
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZWEI
Command (Unix): ./myerprck.scr /MESTYP=ZWEI
Comment: Goods receipt HYDRA  ERP
Interval 5
To upload material consumptions:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZWAU
Command (Unix): ./myerprck.scr /MESTYP=ZWAU
Comment: Goods issue HYDRA  ERP
Interval 5
To upload the usage decision:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZCNRVEW
Command (Unix): ./myerprck.scr /MESTYP=ZCNRVEW
Comment: Usage decision HYDRA  ERP
Interval 5
To upload incoming material:
Product key MPL-BP
EIS-MCL_81.docx Version: 1.1.22690 Page 43 of 47

Interface Material and Batch Data
Parameter name Value
License key MPL-BP
Command (Windows): sh.exe ./hysapupl.scr
/UPLSEGNAM=Z2WEI000X000 /SINGLE_IDOC
/SUBLEVEL=2
Command (Unix): ./hysapupl.scr /UPLSEGNAM=Z2WEI000X000
/SINGLE_IDOC /SUBLEVEL=2
Comment: Upload of incoming goods HYDRA  ERP
Interval 5
To upload outgoing material:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./hysapupl.scr
/UPLSEGNAM=Z2WAU000X000
Command (Unix): ./hysapupl.scr /UPLSEGNAM=Z2WAU000X000
Comment: Upload goods issues HYDRA  ERP
Interval 5
To upload the usage decision
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./hysapupl.scr
/UPLSEGNAM=Z2CNRVEW000X000
Command (Unix): ./hysapupl.scr
/UPLSEGNAM=Z2CNRVEW000X000
Comment: Upload goods issues HYDRA  ERP
EIS-MCL_81.docx Version: 1.1.22690 Page 44 of 47

Interface Material and Batch Data
Parameter name Value
Interval 5
Activation in material type
Set the indicator Goods movements > Transfer to interface for the material types, for which a transfer of
the material movements is necessary.
In case the HYDRA material type is not available as application, the indicator can also be set
directly via the database:
update hz_typen set we_ext_kz = ‚J‘ where hz_typ = ‘<Material type for
which the indicator is to be set>’;
INI-Configuration for segment Z2CNR_USRFLD000X000
Provided with version 1.8 of the script mle_rckmestyp_zwei_out.hsc there is the option to transfer/upload
the user fields of a batch as well. The transfer/upload has to be activated explicitly in the HYDRA INI
configuration.
Parameter name Value
INI name MCL
Section ZWEI
Key USERFIELDS
Value J / Y Transfer of the user field segment
Active Ja (yes)
Comment Transfer of the segment
Z2CNR_USRFLD000X000
EIS-MCL_81.docx Version: 1.1.22690 Page 45 of 47

Interface Material and Batch Data
INI configuration for the segment Z2CNRATT_N001X000
Provided with version 1.72946 of the script mle_rckmestyp_zwei_out.hsc there is the option to use
Z2CNRATT_N001X000 to upload numeric batch attributes. Depending on the product version in use, the
segment has to be activated manually in HYDRA INI configuration:
MPL/TRT 8.1 MPL/TRT 8.2
Uploads via segment Z2CNRATT_N001X000 must For new installations after SP7/2015 the segment
be enabled manually. is used by default.
For installations prior to that date the segment has
to be enabled manually.
The transfer/upload has to be activated explicitly in the HYDRA INI configuration.
Parameter name Value
INI name MCL
Section ZWEI
Key CNRATTR_DEC_13_3
Value J / Y Transfer of the segment
Z2CNRATT_N001X000
Active Ja (yes)
Comment Transfer of the segment Z2CNRATT_N001X000
EIS-MCL_81.docx Version: 1.1.22690 Page 46 of 47

Interface Material and Batch Data
9 Test Files
Overview
Attached to this documentation, you will find test files for the interface EIS-MCL. The attachment is only
available, if the documentation is in PDF format.
The documentation Open PDF attachments describes how to call the attached test files.
The following test files are attached to the PDF document:
File Type Comment
Z2WAU000X000.dat Outbound Sample file for the material consumption MES --> ERP in
processing HYDRA standard format
Z2WEI000X000.dat Outbound Sample file for the goods receipt MES --> ERP in HYDRA
processing standard format
ZMBEW.dat Inbound Sample file for the material staging ERP --> MES in HYDRA
processing standard format
EIS-MCL_81.docx Version: 1.1.22690 Page 47 of 47