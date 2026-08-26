Material Supply ERP --> MES
1 Material Supply ERP --> MES
Overview

Certain material movements are transferred from the ERP system to the MES. IDocs are created
cyclically (e.g. every 5 minutes) and transferred to HYDRA. IDocs are called ZMBEW03.
The MES material type must also be stored in the ERP system and transferred together with the provided
data.
If batch movements are transferred including user-specific information, this information must also be
transferred to HYDRA.
MBL_MCL_Material_Stagings.docx Version: 1.9.11986 Page 1 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

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

1 The segment is available from MLE option ZMBEW_012 on.
2We recommend to no longer use this segment for new implementations. Segment Z2CNRATT_N001X000 should
be used instead. Segment Z2CNRATT_N000X000 is still available (backwards compatible) but will no longer be
maintained. Both segments have different field lengths for their decimal fields.
3 The segment is available from MLE option ZMBEW_014 on.
4 The segment is available from MLE option ZMBEW_010 on.

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 2 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |     |
| --- | --- | --- | --- | ---------------------------- | --- | --- |

| Column  | Description  |     |     |     |     |     |
| ------- | ------------ | --- | --- | --- | --- | --- |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Description and/or comment of the field  |     |     |     |     |     |
| ------------ | ---------------------------------------- | --- | --- | --- | --- | --- |
Goods movements (Z2MBEW001X000)
Material supplies: Goods receipt, reposting to a different material buffer. If a batch is already known in
HYDRA, the batch inventory will be updated.
The batch inventory can only be updated if the batch is currently not in use (not running), i.e.
|     | batch status <> "L"  |     |     |     |     |     |
| --- | -------------------- | --- | --- | --- | --- | --- |

| Field  | V T  L      | D  Description    |     |     |     |     |
| ------ | ----------- | ----------------- | --- | --- | --- | --- |
| WERK   | K  CHAR  4  |   Company/ plant  |     |     |     |     |

| MATNR  | M  CHAR  40  |   Material number  |     |     |     |     |
| ------ | ------------ | ------------------ | --- | --- | --- | --- |

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

MNR  K  CHAR  10    Workplace  which  incoming  goods  are  explicitly  provided  for
|         |              | (reserved, should be left empty)  |     |     |     |     |
| ------- | ------------ | --------------------------------- | --- | --- | --- | --- |
| CHARGE  | K  CHAR  10  |   ERP batch number                |     |     |     |     |
  For further information on the meaning of the fields CHARGE and
CHARGE_LONG please see the description below.
HY_LOSNR  S  CHAR  20    HYDRA batch number (to find a batch created from HYDRA)

| MENGE       | K  QUAN  13  | 3  Batch quantity      |     |     |     |     |
| ----------- | ------------ | ---------------------- | --- | --- | --- | --- |
|             |              |                        |     |     |     |     |
|             |              |                        |     |     |     |     |
| MENGE_EINH  | K  CHAR  3   |   Batch quantity unit  |     |     |     |     |
|             |              |                        |     |     |     |     |
| LST01       | K  QUAN  13  | 3  Activity 1          |     |     |     |     |

| LST01_EINH  | K  CHAR  3  |   Unit of activity 1  |     |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- | --- |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 3 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

| Field  | V T  L       | D  Description  |     |     |     |
| ------ | ------------ | --------------- | --- | --- | --- |
| LST02  | K  QUAN  13  | 3  Activity 2   |     |     |     |

| LST02_EINH  | K  CHAR  3  |   Unit of activity 2  |     |     |     |
| ----------- | ----------- | --------------------- | --- | --- | --- |

| LST03  | K  QUAN  13  | 3  Activity 3  |     |     |     |
| ------ | ------------ | -------------- | --- | --- | --- |

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

| TST  | K  CHAR  1  |   Transport status        |     |     |     |
| ---- | ----------- | ------------------------- | --- | --- | --- |
|      |             | F - "normal" HYDRA batch  |     |     |     |
B - Ready for booking out
L - Cleared from stock
O - Booked out for third-parties
I - Sent to third-parties
T - Transport done
| GRUND  | K  NUM  4  |   Batch reason (e.g. blocking reason)  |     |     |     |
| ------ | ---------- | -------------------------------------- | --- | --- | --- |

| GRUNDTYP  | K  CHAR  1  |   Reason type (e.g. L - batch reason)  |     |     |     |
| --------- | ----------- | -------------------------------------- | --- | --- | --- |
|           |             | Please note: Currently not used.       |     |     |     |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 4 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

| Field  | V T  L      | D  Description                 |     |     |     |
| ------ | ----------- | ------------------------------ | --- | --- | --- |
| VDAT   | K  DATE  8  |   Availability date (MPL-PUE)  |     |     |     |
  If MPL-PUE is not used, the value should be set to the current
point in time.
| VVZEI  | K  TIME  6  |   Availability time (MPL-PUE)  |     |     |     |
| ------ | ----------- | ------------------------------ | --- | --- | --- |
  If MPL-PUE is not used, the value should be set to the current
point in time.
| WDAT  | K  DATE  8  |   Warning date (MPL-PUE)  |     |     |     |
| ----- | ----------- | ------------------------- | --- | --- | --- |
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

| RFBREITE  | K  DEC  13  | 3  Width of the roll in the unit MM  |     |     |     |
| --------- | ----------- | ------------------------------------ | --- | --- | --- |
otherwise: 0
CNR:RFSTKF  K  DEC  13  3  Area per piece in the unit MM2/ PCE
|         |             | otherwise: 0                    |     |     |     |
| ------- | ----------- | ------------------------------- | --- | --- | --- |
| RESART  | K  CHAR  2  |   Reservation type:             |     |     |     |
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

| SLOS  | K  CHAR  1  |   Y - Merged batch  |     |     |     |
| ----- | ----------- | ------------------- | --- | --- | --- |

Only relevant for merged batch processing

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 5 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

| Field  | V T  L  | D  Description  |     |     |     |
| ------ | ------- | --------------- | --- | --- | --- |
SLOSTYP  K  CHAR  1    Merged batch type 'J' – equal type

Only relevant for merged batch processing
ANZSLOS  K  NUM  8    Number of individual batches included in merged batch
|           |            | Only relevant for merged batch processing  |     |     |     |
| --------- | ---------- | ------------------------------------------ | --- | --- | --- |
| TRANZ     | K  NUM  8  |   Number of batches                        |     |     |     |
|           |            | Currently not used                         |     |     |     |
| TRANZSUM  | K  NUM  8  |   Currently not used                       |     |     |     |

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

M  BL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 6 of 13

Material Supply ERP --> MES
Please note that depending on the material type, individual OP-based user fields (transferred
together with the operation from the PPS system) can be transferred to batch-related user fields
(so called batch attributes) during the generation of batches in HYDRA. These are then
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
5 The segment is available from the MLE option ZMBEW_012 on.
MBL_MCL_Material_Stagings.docx Version: 1.9.11986 Page 7 of 13

|     |     |     |     | Material Supply ERP --> MES  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

| Field  | V T  L  | D  Description  |     |     |     |
| ------ | ------- | --------------- | --- | --- | --- |
MSL_VFDATE  K  DATE  8    MSL Expiry date (from MLE option ZMBEW_015 on)
MSL_VFTIME  K  TIME  6    MSL Expiry time (from MLE option ZMBEW_015 on)
MSL_PERIOD  K  NUMC  13    MSL term (from MLE option ZMBEW_015 on)

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

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 8 of 13

|     |     |     |     | Material Supply ERP --> MES  |
| --- | --- | --- | --- | ---------------------------- |

Alphanumeric batch attributes part 2 (Z2CNRATT_C001X000)
The following segment supports the (last 20) alphanumeric batch attributes for the transfer.
| Field     | V  T     | L  D  Description             |     |     |
| --------- | -------- | ----------------------------- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number      |     |     |
| ATTR:121  | K  CHAR  | 40    Alphanumeric attribute  |     |     |
| ATTR:122  | K  CHAR  | 40    …                       |     |     |
| ATTR:123  | K  CHAR  | 40    …                       |     |     |
| ATTR:124  | K  CHAR  | 40    …                       |     |     |
| ATTR:125  | K  CHAR  | 40    …                       |     |     |
| ATTR:126  | K  CHAR  | 40    …                       |     |     |
| ATTR:127  | K  CHAR  | 40    …                       |     |     |
| ATTR:128  | K  CHAR  | 40    …                       |     |     |
| ATTR:129  | K  CHAR  | 40    …                       |     |     |
| ATTR:130  | K  CHAR  | 40    …                       |     |     |
| ATTR:131  | K  CHAR  | 40    ...                     |     |     |
| ATTR:132  | K  CHAR  | 40    ...                     |     |     |
| ATTR:133  | K  CHAR  | 40    ...                     |     |     |
| ATTR:134  | K  CHAR  | 40    ...                     |     |     |
| ATTR:135  | K  CHAR  | 40    ...                     |     |     |
| ATTR:136  | K  CHAR  | 40    ...                     |     |     |
| ATTR:137  | K  CHAR  | 40    ...                     |     |     |
| ATTR:138  | K  CHAR  | 40    ...                     |     |     |
| ATTR:139  | K  CHAR  | 40    ...                     |     |     |
| ATTR:140  | K  CHAR  | 40    …                       |     |     |

Numeric batch attributes (Z2CNRATT_N000X000) – (OBSOLETE)
We  recommend  to  no  longer  use  this  segment  for  new  implementations.  Segment
Z2CNRATT_N001X000  should  be  used  instead.  Segment  Z2CNRATT_N000X000  is  still
available  (backwards  compatible)  but  will  no  longer  be  maintained.  Both  segments  have

different field lengths for their decimal fields.

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 9 of 13

|     |     |     |     | Material Supply ERP --> MES  |
| --- | --- | --- | --- | ---------------------------- |

The following segment supports numeric batch attributes for the transfer.
| Field     | L  T     | L  D  Description                  |     |     |
| --------- | -------- | ---------------------------------- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number           |     |     |
| ATTR:201  | K  NUMC  | 8    Numeric attribute, integer    |     |     |
| ATTR:202  | K  NUMC  | 8    ...                           |     |     |
| ATTR:203  | K  NUMC  | 8    ...                           |     |     |
| ATTR:204  | K  NUMC  | 8    ...                           |     |     |
| ATTR:205  | K  NUMC  | 8    ...                           |     |     |
| ATTR:206  | K  NUMC  | 8    ...                           |     |     |
| ATTR:207  | K  NUMC  | 8    ...                           |     |     |
| ATTR:208  | K  NUMC  | 8    ...                           |     |     |
| ATTR:209  | K  NUMC  | 8    ...                           |     |     |
| ATTR:210  | K  NUMC  | 8    ...                           |     |     |
| ATTR:211  | K  NUMC  | 8    ...                           |     |     |
| ATTR:212  | K  NUMC  | 8    ...                           |     |     |
| ATTR:213  | K  NUMC  | 8    ...                           |     |     |
| ATTR:214  | K  NUMC  | 8    ...                           |     |     |
| ATTR:215  | K  NUMC  | 8    ...                           |     |     |
| ATTR:216  | K  NUMC  | 8    ...                           |     |     |
| ATTR:217  | K  NUMC  | 8    ...                           |     |     |
| ATTR:218  | K  NUMC  | 8    ...                           |     |     |
| ATTR:219  | K  NUMC  | 8    ...                           |     |     |
| ATTR:220  | K  NUMC  | 8    ...                           |     |     |
| ATTR:301  | K  DEC   | 10  3  Numeric attribute, decimal  |     |     |
| ATTR:302  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:303  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:304  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:305  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:306  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:307  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:308  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:309  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:310  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:311  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:312  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:313  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:314  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:315  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:316  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:317  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:318  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:319  | K  DEC   | 10  3  ...                         |     |     |
| ATTR:320  | K  DEC   | 10  3  ...                         |     |     |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 10 of 13

|     |     |     |     | Material Supply ERP --> MES  |
| --- | --- | --- | --- | ---------------------------- |

Numeric batch attributes (Z2CNRATT_N001X000)
The following segment supports numeric batch attributes for the transfer.
| Field     | L  T     | L  D  Description                  |     |     |
| --------- | -------- | ---------------------------------- | --- | --- |
| CNR       | S  CHAR  | 20    HYDRA batch number           |     |     |
| ATTR:201  | K  NUMC  | 8    Numeric attribute, integer    |     |     |
| ATTR:202  | K  NUMC  | 8    ...                           |     |     |
| ATTR:203  | K  NUMC  | 8    ...                           |     |     |
| ATTR:204  | K  NUMC  | 8    ...                           |     |     |
| ATTR:205  | K  NUMC  | 8    ...                           |     |     |
| ATTR:206  | K  NUMC  | 8    ...                           |     |     |
| ATTR:207  | K  NUMC  | 8    ...                           |     |     |
| ATTR:208  | K  NUMC  | 8    ...                           |     |     |
| ATTR:209  | K  NUMC  | 8    ...                           |     |     |
| ATTR:210  | K  NUMC  | 8    ...                           |     |     |
| ATTR:211  | K  NUMC  | 8    ...                           |     |     |
| ATTR:212  | K  NUMC  | 8    ...                           |     |     |
| ATTR:213  | K  NUMC  | 8    ...                           |     |     |
| ATTR:214  | K  NUMC  | 8    ...                           |     |     |
| ATTR:215  | K  NUMC  | 8    ...                           |     |     |
| ATTR:216  | K  NUMC  | 8    ...                           |     |     |
| ATTR:217  | K  NUMC  | 8    ...                           |     |     |
| ATTR:218  | K  NUMC  | 8    ...                           |     |     |
| ATTR:219  | K  NUMC  | 8    ...                           |     |     |
| ATTR:220  | K  NUMC  | 8    ...                           |     |     |
| ATTR:301  | K  DEC   | 13  3  Numeric attribute, decimal  |     |     |
| ATTR:302  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:303  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:304  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:305  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:306  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:307  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:308  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:309  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:310  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:311  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:312  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:313  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:314  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:315  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:316  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:317  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:318  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:319  | K  DEC   | 13  3  ...                         |     |     |
| ATTR:320  | K  DEC   | 13  3  ...                         |     |     |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 11 of 13

|     |     |     |     | Material Supply ERP --> MES  |
| --- | --- | --- | --- | ---------------------------- |

User fields (Z2CNR_USRFLD000X000)
Starting as of MLE option ZMBEW_010, you can also transfer user fields relating to the batch from the
ERP system.
| Field     | V  T     | L  D  Description                    |     |     |
| --------- | -------- | ------------------------------------ | --- | --- |
| HY_LOSNR  | S  CHAR  | 20    HYDRA batch number             |     |     |
| FILLER    | S  CHAR  | 20    Placeholder – internal usage   |     |     |
| USRFLD    | S  CHAR  | 8    User field key                  |     |     |
| FU:1      | K  DATE  | 8    User field 1                    |     |     |
| FU:2      | K  DATE  | 8    User field 2                    |     |     |
| FU:3      | K  DATE  | 8    User field 3                    |     |     |
| FU:4      | K  DATE  | 8    User field 4                    |     |     |
| FU:5      | K  DATE  | 8    User field 5                    |     |     |
| FU:6      | K  DATE  | 8    User field 6                    |     |     |
| FU:7      | K  NUM   | 8    User field 7                    |     |     |
| FU:8      | K  NUM   | 8    User field 8                    |     |     |
| FU:9      | K  NUM   | 8    User field 9                    |     |     |
| FU:10     | K  NUM   | 8    User field 10                   |     |     |
| FU:11     | K  NUM   | 8    User field 11                   |     |     |
| FU:12     | K  NUM   | 8    User field 12                   |     |     |
| FU:13     | K  NUM   | 8    User field 13                   |     |     |
| FU:14     | K  NUM   | 8    User field 14                   |     |     |
| FU:15     | K  NUM   | 8    User field 15                   |     |     |
| FU:16     | K  NUM   | 8    User field 16                   |     |     |
| FU:17     | K  NUM   | 8    User field 17                   |     |     |
| FU:18     | K  NUM   | 8    User field 18                   |     |     |
| FU:19     | K  NUM   | 8    User field 19                   |     |     |
| FU:20     | K  NUM   | 8    User field 20                   |     |     |
| FU:21     | K  NUM   | 8    User field 21                   |     |     |
| FU:22     | K  NUM   | 8    User field 22                   |     |     |
| FU:23     | K  DEC   | 13  3  User field 23                 |     |     |
| FU:24     | K  DEC   | 13  3  User field 24                 |     |     |
| FU:25     | K  DEC   | 13  3  User field 25                 |     |     |
| FU:26     | K  DEC   | 13  3  User field 26                 |     |     |
| FU:27     | K  DEC   | 13  3  User field 27                 |     |     |
| FU:28     | K  DEC   | 13  3  User field 28                 |     |     |
| FU:29     | K  CHAR  | 1    User field 29                   |     |     |
| FU:30     | K  CHAR  | 1    User field 30                   |     |     |
| FU:31     | K  CHAR  | 1    User field 31                   |     |     |
| FU:32     | K  CHAR  | 1    User field 32                   |     |     |
| FU:33     | K  CHAR  | 1    User field 33                   |     |     |
| FU:34     | K  CHAR  | 1    User field 34                   |     |     |
| FU:35     | K  CHAR  | 1    User field 35                   |     |     |
| FU:36     | K  CHAR  | 1    User field 36                   |     |     |
| FU:37     | K  CHAR  | 1    User field 37                   |     |     |
| FU:38     | K  CHAR  | 1    User field 38                   |     |     |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 12 of 13

|     |     |     |     | Material Supply ERP --> MES  |
| --- | --- | --- | --- | ---------------------------- |

| Field  | V  T     | L  D  Description    |     |     |
| ------ | -------- | -------------------- | --- | --- |
| FU:39  | K  CHAR  | 1    User field 39   |     |     |
| FU:40  | K  CHAR  | 1    User field 40   |     |     |
| FU:41  | K  CHAR  | 1    User field 41   |     |     |
| FU:42  | K  CHAR  | 1    User field 42   |     |     |
| FU:43  | K  CHAR  | 1    User field 43   |     |     |
| FU:44  | K  CHAR  | 1    User field 44   |     |     |
| FU:45  | K  CHAR  | 10    User field 45  |     |     |
| FU:46  | K  CHAR  | 10    User field 46  |     |     |
| FU:47  | K  CHAR  | 10    User field 47  |     |     |
| FU:48  | K  CHAR  | 10    User field 48  |     |     |
| FU:49  | K  CHAR  | 10    User field 49  |     |     |
| FU:50  | K  CHAR  | 10    User field 50  |     |     |
| FU:51  | K  CHAR  | 20    User field 51  |     |     |
| FU:52  | K  CHAR  | 20    User field 52  |     |     |
| FU:53  | K  CHAR  | 20    User field 53  |     |     |
| FU:54  | K  CHAR  | 20    User field 54  |     |     |
| FU:55  | K  CHAR  | 20    User field 55  |     |     |
| FU:56  | K  CHAR  | 20    User field 56  |     |     |
| FU:57  | K  CHAR  | 20    User field 57  |     |     |
| FU:58  | K  CHAR  | 20    User field 58  |     |     |
| FU:59  | K  CHAR  | 20    User field 59  |     |     |
| FU:60  | K  CHAR  | 20    User field 60  |     |     |
| FU:61  | K  CHAR  | 20    User field 61  |     |     |
| FU:62  | K  CHAR  | 20    User field 62  |     |     |
| FU:63  | K  CHAR  | 20    User field 63  |     |     |
| FU:64  | K  CHAR  | 20    User field 64  |     |     |
| FU:65  | K  CHAR  | 40    User field 65  |     |     |
| FU:66  | K  CHAR  | 40    User field 66  |     |     |

MBL_MCL_Material_Stagings.docx  Version: 1.9.11986  Page 13 of 13