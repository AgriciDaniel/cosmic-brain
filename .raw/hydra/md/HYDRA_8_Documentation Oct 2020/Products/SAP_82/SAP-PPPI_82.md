Manual
HYDRA Interfacing Module to
SAP PP-PI
SAP-PPPI 8.2
Version 1.0.23049
Last changed on: 02.09.2020

HYDRA Interfacing Module to SAP PP-PI
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-PPPI_82.docx Version: 1.0.23049 Page 2 of 60

HYDRA Interfacing Module to SAP PP-PI
Contents
1 HYDRA Interface to SAP PP-PI via PP-PI-PCS .......................................... 4
2 Data type definitions ..................................................................................... 5
3 Process Order data SAP --> HYDRA ........................................................... 7
4 PP-PI Confirmations HYDRA --> SAP ....................................................... 37
5 MYERPRCK - Program Parameters .......................................................... 39
6 Application-relevant settings in HYDRA ..................................................... 51
7 Application-relevant customizing in SAP ................................................... 54
8 Supervise communication .......................................................................... 56
9 Protecting fields of planned operations ...................................................... 57
SAP-PPPI_82.docx Version: 1.0.23049 Page 3 of 60

HYDRA Interfacing Module to SAP PP-PI
1 HYDRA Interface to SAP PP-PI via PP-PI-PCS
Fields of Application
The interface HKMPP-PI has been designed to connect the MES system HYDRA to superior SAP
systems when SAP PP-PI is used on the ERP level.
Implementation Notes
The SAP-PPPI interface is used, when
 SAP PP-PI is used to manage production using SAP process orders
 Phase confirmation is used
Integration
If you use the SAP-PPPI component, the added orders/ operations form the reporting structure for
numerous additional components in HYDRA.
Features
 Reception of process order data using the mechanisms that SAP provides related to control
recipes
 Transfer of phase confirmation using the PP-PI-PCS standard structure PI_PHCON
SAP-PPPI_82.docx Version: 1.0.23049 Page 4 of 60

HYDRA Interfacing Module to SAP PP-PI
2 Data type definitions
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
SAP-PPPI_82.docx Version: 1.0.23049 Page 5 of 60

HYDRA Interfacing Module to SAP PP-PI
The character " ; “ (semicolon) is used as a separator in the system. You must not use this
character in key fields (e.g. order/operation number, MES batch number, personnel number).
The character " % " (percent) is used as a placeholder for database communication. You should
not use this character to prevent the result from being falsified.
SAP-PPPI_82.docx Version: 1.0.23049 Page 6 of 60

HYDRA Interfacing Module to SAP PP-PI
3 Process Order data SAP --> HYDRA
General remarks
To download the process order related data from SAP to HYDRA the SAP standard interface PP-PI-PCS
is used. That interface can be prosecuted in different modes. In the implementation of HYDRA in the
scope of the HKMPP-PI interface the mode used is “Download to ext. system, initiated by SAP process
management“. That means that a control recipe destination of type “2” has to be created in SAP
customizing. By that the download of process order data will be initiated from SAP only.
In recepies in SAP operations and phases can be created. For the download to HYDRA and the recording
in HYDRA only phases are of interest. That means that only the phases have to be linked to a control
recipe receiver in the master recipe. The phases in SAP are treated in HYDRA as operation. The length
of the key for the order number and the operation number can be configured in HYDRA. For details on
application relevant settings in SAP please see chapter Application-relevant customizing in SAP.
In the following chapters the structure of the process order download will be described including the used
categories and its characteristics. It is essential to understand, that the order of the characteristics is
essential for HYDRA. All characteristics described here have to be created and customized in SAP in the
exact order (while the name used in SAP to identify it, does not matter to HYDRA).
If in later steps the categories have to be extended, that only is allowed at the end of the category.
Download of process orders
The process orders are created in SAP in advance. In SAP they then have the status “Created”. The PP-
PI-PCS interface does not support the download of process orders that in SAP have system status
“CREATED”. By releasing the process order in SAP (automatically / manually), depending on the setting
in the production scheduling profile the control recipe is created as well or needs to be created manually.
The download of the control recipe with the data of the process order from SAP to HYDRA is initiated
from SAP either manually or by a scheduled job. For details of application relevant settings in SAP please
see chapter Application-relevant customizing in SAP.
Deletion of process orders
It might happen that process orders are canceled in SAP after the transfer to HYDRA. In that case the
control recipe is discarded in SAP and the process order is canceled. As SAP PP-PI is not able to deliver
this information, the deletion / closing of the process order has to be done manually in HYDRA.
SAP-PPPI_82.docx Version: 1.0.23049 Page 7 of 60

HYDRA Interfacing Module to SAP PP-PI
Interface structure
SAP-PPPI_82.docx Version: 1.0.23049 Page 8 of 60

    HYDRA Interfacing Module to SAP PP-PI

| Message type )*:    | PP_PI_PCS_HYDRA_INBOUND  |     |     |     |         |
| ------------------- | ------------------------ | --- | --- | --- | ------- |
| IDoc type )*:       | PP_PI_PCS_HYDRA_INBOUND  |     |     |     |         |
| Message functions:  | -                        |     |     |     |         |
| Segments            | ZHEAD_01 (order header)  |     |     |     | 1-time  |
 / categories:  ├   ZUFIELD1 Userfield part one          1-time
|     | ├   ZUFIELD2 User fields part two          |     |     |     | 1-time   |
| --- | ------------------------------------------ | --- | --- | --- | -------- |
|     | ├   ZOPER_01 Operation data part one       |     |     |     | n-times  |
|     | └   ZOPER_02 Operation data part two       |     |     |     | n-times  |
|     |       ├ ZCOMP_01 Components list part one  |     |     |     | n-times  |
|     |       ├ ZCOMP_02 Components list part two  |     |     |     | n-times  |
      ├ ZAGFH_01 Production resources and tools/resources    n-times
      ├ ZAGFH_02 Production resources and tools/resources    n-times
|     |       ├ ZAGDC_01 Documents                 |     |     |     | n-times  |
| --- | ------------------------------------------ | --- | --- | --- | -------- |
|     |       ├ ZUFIELD3 User fields part one      |     |     |     | 1-time   |
|     |       └ ZUFIELD4 User fields part two      |     |     |     | 1-time   |
|     |       └ ZAGRF_02 coil based manufacturing  |     |     |     | 1-time   |

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
)* The information is used in HYDRA only for HYDRA-internal reasons
The structures belonging to the single segments are described as follows. The single columns have the
following meaning:
| Column  | Meaning                   |     |     |     |     |
| ------- | ------------------------- | --- | --- | --- | --- |
| Field   | Designation of the field  |     |     |     |     |
V(use)  S   It is a key field which identifies the data record clearly if needed together with other fields
characterized as key fields. The field must be filled.
M  It is a mandatory field which has to be filled.
ML  Mandatory field if the control center of HYDRA is used (HLS).
MM  Mandatory field if the material and production logistics of HYDRA is used (MPL or MPL/RF).
K  Field is allowed to  stay empty.
| T(type)    | Data type according to the description in the chapter above.  |     |     |     |     |
| ---------- | ------------------------------------------------------------- | --- | --- | --- | --- |
| L(length)  | Field length                                                  |     |     |     |     |
for fields of the data type DEC: total number of places, without decimal point and algebraic sign.
D(decimal places)  For fields of the data type DEC: number of places after decimal point, otherwise: not relevant
| Description  | Description of the field or comment to the field  |     |     |     |     |
| ------------ | ------------------------------------------------- | --- | --- | --- | --- |

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     |     | Page 9 of 60  |
| ----------------- | --- | ------------------- | --- | --- | ------------- |

HYDRA Interfacing Module to SAP PP-PI
Order Header (ZHEAD_01)
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0010 PPPI_PROCESS_ORDER AUNR S CHAR 12 Order number
0020 ZAUART 01-AUART AUART M CHAR 5 Order type
NOTE:
The order types have to be customized in HYDRA. For
that only specified order types are allowed to be
transferred. If no project-sepcific definition is done, fixed
“0”
0030 PPPI_ MATERIAL_NUMBER MARA-BISMT ATK M CHAR 18 Producing material (Article); alphabetical characters in
the UPPER CASE
0040 PPPI_MATERIAL_SHORT_TEXT 01-MATXT ATKBEZ_1 K CHAR 30 Designation of the article
0050 ZPPPI_MATERIAL_SHORT_TEXT ATKBEZ_2 K CHAR 10 Designation of the article
0060 ZPPPI_CUSTOMER_DESCRIPTION_01 01-KUNUM KDBEZ_1 K CHAR 30 Designation of the customer
0070 ZPPPI_CUSTOMER_DESCRIPTION_02 KDBEZ_2 K CHAR 10 Designation of the customer
0080 ZPPPI_SALES_ORDER_NUMBER 01-KDAUF_AUFK KDAUNR K CHAR 25 Customer order
0090 ZPPPI_SALES_ORDER_ITEM 01-KDPOS_AUFK KDAUPOS K CHAR 15 Customer order position
0100 ZPPPI_PRIORITY 01-APRIO EXTPRIO M CHAR 1 Priority
0110 ZPPPI_INDEX AUIDX K DEC 5 2 Order index; should be 0.00
Information: According to the description of the data type
it should be considered that an algebraic sign and a
decimal point have to be supplemented to the length that
is indicated here. This is valid for all following fields of the
data type DEC.
0120 PPPI_UNIT_OF_MEASURE 01-GMEIN SGE:B M CHAR 3 Base quantity unit
0130 PPPI_ORDER_QUANTITY 01-GAMNG SGR:GUTB M DEC 13 3 Target quantity (base quantity unit)
0140 ZPPPI_TARGET_SCRAP SGR:AUSB K DEC 13 3 Target scrap (base quantity unit)
0150 Z_PPPI_MATERIAL_TYPE_HYDRA MATTYP M CHAR 20 Material type (configured in HYDRA) of the producing
material (article)
0160 PPPI_BATCH CNR K CHAR 20 Batch number, no processing in HYDRA
0170 PPPI_INSPECTION_LOT 01-PRUEFLOS PCNR K CHAR 20 Inspection order/inspection lot number
0180 ZPPPI_SAMPLE_CATEGORY PPKTTYP K CHAR 1 Physical-sample category
0190 ZPPPI_EARLIEST_START_DATE 01-GSTRP DATFB ML DATE 8 Earliest start (date)
SAP: Start BasicDates (AFKO.GSTRP)
SAP-PPPI_82.docx Version: 1.0.23049 Page 10 of 60

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0200 Z_PPI_EARLIEST_START_TIME 01-GSUZP ZEIFB ML TIME 6 Earliest start (time)
SAP: Start BasicDates (AFKO.GSUZP)
Please note: 240000 is not allowed; use instead 235959
0210 ZPPPI_LATEST_END_DATE 01-GLTRP DATSE ML DATE 8 Latest end (date)
SAP: Finish BasicDates (AFKO.GLTRP)
0220 Z_PPI_LATEST_END_TIME 01-GLUZP ZEISE ML TIME 6 Latest end (time)
SAP: Finish BasicDates (AFKO.GLUZP)
Please note: 240000 is not allowed; use instead 235959
0230 ZPPPI_SCHEDULED_START 01-GSTRS DATTERMB K DATE 8 Scheduled start (date)
(AFKO.GSTRS)
0240 Z_PPI_SCHEDULED_START_TIME 01-GSUZS ZEITERMB K TIME 6 Scheduled start (time)
(AFKO.GSVZS)
Please note: 240000 is not allowed; use instead 235959
0250 ZPPPI_SCHEDULED_FINISH 01-GLTRS DATTERME K DATE 8 Scheduled end (date)
(AFKO.GLTRS)
0260 Z_PPI_SCHEDULED_FINISH_TIME 01-GLUZS ZEITERME K TIME 6 Scheduled (time)
(AFKO.GLUZS)
Please note: 240000 is not allowed; use instead 235959
0270 ZPPPI_SCHEDULED_TYPE 01-TERKZ TERMART K CHAR 1 Scheduling type. Mandatory field if the scheduling is
supposed to take place in HYDRA.
V = Forward
R = Backward
0280 ZPPPI_REDUCTION_STRATEGY 01-TERKZ REDSTRAT K CHAR 2 à Reduction strategy. According to HYDRA Customizing
0290 ZPPPI_PRODUCTION_SCHEDULER 01-FEVOR AUGRP K CHAR 4 Order group belongs to "production scheduler" in SAP
0300 ZPPPI_MRP_CONTROLLER 01-DISPO DISP K CHAR 10 MRP controller
0310 ZPPPI_LEADING_ORDER 01-LEAD_AUFNR PRJNR K CHAR 25 Project number; belongs to the WBS number in SAP
0320 ZPPPI_SUPERIOR_ORDER AFPO-PLNUM PLANAUNR K CHAR 25 Planned order
0330 ZPPPI_COST_OBJECT KTR K CHAR 25 Cost object
0340 ZAPNR_1 01-PLNNR APNR_1 K CHAR 30 Working plan
0350 ZAPNR_2 APNR_2 K CHAR 10 Working plan
SAP-PPPI_82.docx Version: 1.0.23049 Page 11 of 60

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0360  ZAPVER  01-PLNAL  APVER  K  CHAR  12     Working plan planned order version
0370  ZSLVER    SLVER  K  CHAR  12     Bill of material version
0380  ZKLKK:MNR    KLKK:MNR  K  DEC  13  3  Calculated costs machine
0390  ZKLKK:L    KLKK:L  K  DEC  13  3  Calculated costs wage
0400  ZKLKK:MAT    KLKK:MAT  K  DEC  13  3  Calculated costs material
0410  ZKLKK:SONST    KLKK:SONST  K  DEC  13  3  Calculated costs other
0420  ZMATWERT:GUT    MATWERT:GUT  K  DEC  13  3  Material value
0430  ZMATWERT:AUS    MATWERT:AUS  K  DEC  13  3  Scrap value
0440  PPPI_CONTROL_RECIPE    STRGREZ  K  CHAR  18     Control Recipe
Userfields of the order header
User fields part one (ZUFIELD1)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER    AUNR  S  CHAR  12     Order number
0020  ZAAUUF_USRFLD    USRFLD  S  CHAR  8     User field key
| 0030  | ZAAUUF_FU:1   |     | FU:1   | K  DATE  | 8     User field 1   |     |
| ----- | ------------- | --- | ------ | -------- | -------------------- | --- |
| 0040  | ZAAUUF_FU:2   |     | FU:2   | K  DATE  | 8     User field 2   |     |
| 0050  | ZAAUUF_FU:3   |     | FU:3   | K  DATE  | 8     User field 3   |     |
| 0060  | ZAAUUF_FU:4   |     | FU:4   | K  DATE  | 8     User field 4   |     |
| 0070  | ZAAUUF_FU:5   |     | FU:5   | K  DATE  | 8     User field 5   |     |
| 0080  | ZAAUUF_FU:6   |     | FU:6   | K  DATE  | 8     User field 6   |     |
| 0090  | ZAAUUF_FU:7   |     | FU:7   | K  NUM   | 8     User field 7   |     |
| 0100  | ZAAUUF_FU:8   |     | FU:8   | K  NUM   | 8     User field 8   |     |
| 0110  | ZAAUUF_FU:9   |     | FU:9   | K  NUM   | 8     User field 9   |     |
| 0120  | ZAAUUF_FU:10  |     | FU:10  | K  NUM   | 8     User field 10  |     |
| 0130  | ZAAUUF_FU:11  |     | FU:11  | K  NUM   | 8     User field 11  |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 12 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |               | Field  | Field  |          |                       |     |
| ----- | ------------- | ------ | ------ | -------- | --------------------- | --- |
| 0140  | ZAAUUF_FU:12  |        | FU:12  | K  NUM   | 8     User field 12   |     |
| 0150  | ZAAUUF_FU:13  |        | FU:13  | K  NUM   | 8     User field 13   |     |
| 0160  | ZAAUUF_FU:14  |        | FU:14  | K  NUM   | 8     User field 14   |     |
| 0170  | ZAAUUF_FU:15  |        | FU:15  | K  NUM   | 8     User field 15   |     |
| 0180  | ZAAUUF_FU:16  |        | FU:16  | K  NUM   | 8     User field 16   |     |
| 0190  | ZAAUUF_FU:17  |        | FU:17  | K  NUM   | 8     User field 17   |     |
| 0200  | ZAAUUF_FU:18  |        | FU:18  | K  NUM   | 8     User field 18   |     |
| 0210  | ZAAUUF_FU:19  |        | FU:19  | K  NUM   | 8     User field 19   |     |
| 0220  | ZAAUUF_FU:20  |        | FU:20  | K  NUM   | 8     User field 20   |     |
| 0230  | ZAAUUF_FU:21  |        | FU:21  | K  NUM   | 8     User field 21   |     |
| 0240  | ZAAUUF_FU:22  |        | FU:22  | K  NUM   | 8     User field 22   |     |
| 0250  | ZAAUUF_FU:23  |        | FU:23  | K  DEC   | 13  3  User field 23  |     |
| 0260  | ZAAUUF_FU:24  |        | FU:24  | K  DEC   | 13  3  User field 24  |     |
| 0270  | ZAAUUF_FU:25  |        | FU:25  | K  DEC   | 13  3  User field 25  |     |
| 0280  | ZAAUUF_FU:26  |        | FU:26  | K  DEC   | 13  3  User field 26  |     |
| 0290  | ZAAUUF_FU:27  |        | FU:27  | K  DEC   | 13  3  User field 27  |     |
| 0300  | ZAAUUF_FU:28  |        | FU:28  | K  DEC   | 13  3  User field 28  |     |
| 0310  | ZAAUUF_FU:29  |        | FU:29  | K  CHAR  | 1     User field 29   |     |
| 0320  | ZAAUUF_FU:30  |        | FU:30  | K  CHAR  | 1     User field 30   |     |
| 0330  | ZAAUUF_FU:31  |        | FU:31  | K  CHAR  | 1     User field 31   |     |
| 0340  | ZAAUUF_FU:32  |        | FU:32  | K  CHAR  | 1     User field 32   |     |
| 0350  | ZAAUUF_FU:33  |        | FU:33  | K  CHAR  | 1     User field 33   |     |
| 0360  | ZAAUUF_FU:34  |        | FU:34  | K  CHAR  | 1     User field 34   |     |
| 0370  | ZAAUUF_FU:35  |        | FU:35  | K  CHAR  | 1     User field 35   |     |
| 0380  | ZAAUUF_FU:36  |        | FU:36  | K  CHAR  | 1     User field 36   |     |
| 0390  | ZAAUUF_FU:37  |        | FU:37  | K  CHAR  | 1     User field 37   |     |
| 0400  | ZAAUUF_FU:38  |        | FU:38  | K  CHAR  | 1     User field 38   |     |
| 0410  | ZAAUUF_FU:39  |        | FU:39  | K  CHAR  | 1     User field 39   |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 13 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |               | Field  | Field  |          |                      |     |
| ----- | ------------- | ------ | ------ | -------- | -------------------- | --- |
| 0420  | ZAAUUF_FU:40  |        | FU:40  | K  CHAR  | 1     User field 40  |     |
| 0430  | ZAAUUF_FU:41  |        | FU:41  | K  CHAR  | 1     User field 41  |     |
| 0440  | ZAAUUF_FU:42  |        | FU:42  | K  CHAR  | 1     User field 42  |     |
| 0450  | ZAAUUF_FU:43  |        | FU:43  | K  CHAR  | 1     User field 43  |     |
| 0460  | ZAAUUF_FU:44  |        | FU:44  | K  CHAR  | 1     User field 44  |     |

User fields part two (ZUFIELD2)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER    AUNR  S  CHAR  12     Order number
0020  ZAAUUF_USRFLD    USRFLD  S  CHAR  8     User field key
| 0030  | ZAAUUF_FU:45  |     | FU:45  | K  CHAR  | 10     User field 45   |     |
| ----- | ------------- | --- | ------ | -------- | ---------------------- | --- |
| 0040  | ZAAUUF_FU:46  |     | FU:46  | K  CHAR  | 10     User field 46   |     |
| 0050  | ZAAUUF_FU:47  |     | FU:47  | K  CHAR  | 10     User field 47   |     |
| 0060  | ZAAUUF_FU:48  |     | FU:48  | K  CHAR  | 10     User field 48   |     |
| 0070  | ZAAUUF_FU:49  |     | FU:49  | K  CHAR  | 10     User field 49   |     |
| 0080  | ZAAUUF_FU:50  |     | FU:50  | K  CHAR  | 10     User field 50   |     |
| 0090  | ZAAUUF_FU:51  |     | FU:51  | K  CHAR  | 20     User field 51   |     |
| 0100  | ZAAUUF_FU:52  |     | FU:52  | K  CHAR  | 20     User field 52   |     |
| 0110  | ZAAUUF_FU:53  |     | FU:53  | K  CHAR  | 20     User field 53   |     |
| 0120  | ZAAUUF_FU:54  |     | FU:54  | K  CHAR  | 20     User field 54   |     |
| 0130  | ZAAUUF_FU:55  |     | FU:55  | K  CHAR  | 20     User field 55   |     |
| 0140  | ZAAUUF_FU:56  |     | FU:56  | K  CHAR  | 20     User field 56   |     |
| 0150  | ZAAUUF_FU:57  |     | FU:57  | K  CHAR  | 20     User field 57   |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 14 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |               | Field  | Field  |          |                       |     |
| ----- | ------------- | ------ | ------ | -------- | --------------------- | --- |
| 0160  | ZAAUUF_FU:58  |        | FU:58  | K  CHAR  | 20     User field 58  |     |
| 0170  | ZAAUUF_FU:59  |        | FU:59  | K  CHAR  | 20     User field 59  |     |
| 0180  | ZAAUUF_FU:60  |        | FU:60  | K  CHAR  | 20     User field 60  |     |
| 0190  | ZAAUUF_FU:61  |        | FU:61  | K  CHAR  | 20     User field 61  |     |
| 0200  | ZAAUUF_FU:62  |        | FU:62  | K  CHAR  | 20     User field 62  |     |
| 0210  | ZAAUUF_FU:63  |        | FU:63  | K  CHAR  | 20     User field 63  |     |
| 0220  | ZAAUUF_FU:64  |        | FU:64  | K  CHAR  | 20     User field 64  |     |
0230  ZAAUUF_FU:65_1    FU:65_1  K  CHAR  30     User field 65
0240  ZAAUUF_FU:65_2    FU:65_2  K  CHAR  10     User field 65
0250  ZAAUUF_FU:66_1    FU:66_1  K  CHAR  30     User field 66
0260  ZAAUUF_FU:66_2    FU:66_2  K  CHAR  10     User field 66

Operation data
Operation data part one (ZOPER_01)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER    AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence       |     |
| ----- | --------------- | ------------ | ------ | -------- | -------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation      |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation  |     |
0050  PPPI_PHASE_SHORT_TEXT    AGBEZ_1  M  CHAR  30     Designation of the operation
0060  ZPPPI_PHASE_SHORT_TEXT    AGBEZ_2  M  CHAR  10     Designation of the operation
0070  PPPI_MATERIAL_NUMBER  MARA-BISMT  ATK  M  CHAR  18     Number of producing material; Article (number)
Alphabetical characters in UPPER CASE

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 15 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0080 Z_PPPI_MATERIAL_TYPE_HYDRA Characteristic in SAP MATTYP MM CHAR 10 Material type of the article; if HYDRA MPL is used
according to the configuration of the material type
0090 ZEXTPRIO 01-APRIO EXTPRIO M CHAR 1 Priority
0100 PPPI_RESOURCE 03-ARBPL MNR M CHAR 8 Planned work center; leer lassen, wenn der Arbeitsgang
im PPS-System auf Gruppe geplant ist.
0110 PPPI_PLANT_OF_RESSOURCE WERK:S M CHAR 4 Plant of the workcentre
0120 ZCOLOR Classification characteristic COLOR K CHAR 20 Color of the material
on material level (header
material)
0130 ZKST Cost center linked to KST K CHAR 8 Cost center; no processing in HYDRA (only information)
resource
0140 ZKART KART K CHAR 10 Cost type; no processing in HYDRA (only information)
0150 ZASTUFE Fixed "2" ASTUFE K CHAR 1 Authorization level for logging on/logging off OPs
(lowest authorization = 1)
0160 ZRMNR 03-RUECK RMNR K CHAR 10 Confirmation number
0170 ZDATTERMB 03-AFVV.FSAVD DATTERMB K DATE 8 Scheduled start (date)
0180 ZZEITERMB 03-FSAVZ ZEITERMB K TIME 6 Scheduled start (time)
Please note: 240000 is not allowed; use instead 235959
0190 ZDATTERME 03-FSELD DATTERME K DATE 8 Scheduled end (date)
0200 ZZEITERME 03-FSELZ ZEITERME K TIME 6 Scheduled end (time) Please note: 240000 is not
allowed; use instead 235959
0210 ZAGHD_DATFB 03-AFVV.FSAVD DATFB K DATE 8 Earliest start (date)
(AFVV.FSAVD)
0220 ZAGHD_ZEIFB 03-FSAVZ ZEIFB K TIME 6 Earliest start (time)
(AFVV.FSAVZ)
Please note: 240000 is not allowed; use instead 235959
0230 ZAGHD_DATSB 03-SSAVD DATSB K DATE 8 Latest start (date)
(AFVV.SSAVD)
SAP-PPPI_82.docx Version: 1.0.23049 Page 16 of 60

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0240 ZAGHD_ZEISB 03-SSAVZ ZEISB K TIME 6 Latest start (time)
(AFVV.SSAVZ)
Please note: 240000 is not allowed; use instead 235959
0250 ZAGHD_DATFE 03-FSELD DATFE K DATE 8 Earliest end (date)
(AFVV.FSELD)
0260 ZAGHD_ZEIFE 03-FSELZ ZEIFE K TIME 6 Earliest end (time)
(AFVV.FSELZ)
Please note: 240000 is not allowed; use instead 235959
0270 ZAGHD_DATSE 03-SSELD DATSE K DATE 8 Latest end (date)
(AFVV.SSELD)
0280 ZAGHD_ZEISE 03-SSELZ ZEISE K TIME 6 Latest end (time)
(AFVV.SSELZ)
0290 ZAGHD_DATB DATB K DATE 8 Planned start (date)
0300 ZAGHD_ZEIB ZEIB K TIME 6 Planned start (time)
Please note: 240000 is not allowed; use instead 235959
0310 ZAGHD_DATE DATE K DATE 8 Planned end (date)
0320 ZAGHD_ZEIE ZEIE K TIME 6 Planned end (time)
Please note: 240000 is not allowed; use instead 235959
0330 ZAGHD_SGR:GUTB Conversion from material SGR:GUTB K DEC 13 3 Target quantity (base quantity unit)
master
0340 ZAGHD_SGR:GUTP 03-MGVRG SGR:GUTP K DEC 13 3 Target quantity (primary quantity unit)
0350 ZAGHD_SGR:GUTS Conversion from material SGR:GUTS K DEC 13 3 Target quantity (secondary quantity unit)
master
0360 ZAGHD_SGR:GUTT Conversion from material SGR:GUTT K DEC 13 3 Target quantity (tertiary quantity unit)
master
0370 ZAGHD_SGR:AUSB Conversion from material SGR:AUSB K DEC 13 3 Target scrap (base quantity unit)
master
0380 ZAGHD_SGR:AUSP 03-ASVRG SGR:AUSP K DEC 13 3 Target scrap (primary quantity unit)
0390 ZAGHD_SGR:AUSS Conversion from material SGR:AUSS K DEC 13 3 Target scrap (secondary quantity unit)
master
SAP-PPPI_82.docx Version: 1.0.23049 Page 17 of 60

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0400 ZAGHD_SGR:AUST Conversion from material SGR:AUST K DEC 13 3 Target scrap (tertiary quantity unit)
master
0410 ZAGHD_SGE:B From material master SGE:B K CHAR 3 Base quantity unit
MARA
0420 ZAGHD_SGE:P 03-MEINH SGE:P K CHAR 3 Primary quantity unit of entry
0430 ZAGHD_SGE:S Conversion from material SGE:S K CHAR 3 Secondary quantity unit of entry
master
0440 ZAGHD_SGE:T Conversion from material SGE:T K CHAR 3 Tertiary quantity unit of entry
master
0450 ZWEIGMENGE 03-MINWE WEIGMENGE K DEC 13 3 Minimum send-ahead quantity (primary quantity unit)
0460 ZMENGEPROZ:UNTLI AFPO-UNTTO MENGEPROZ:UNTLI K DEC 13 3 Underdelivery in per cent
0470 ZOPT:UNTLI V_TCORU-UNTLI for order OPT:UNTLI K CHAR 1 Reaction to underdelivery
type and plant “ “ No reaction
“W” Warning
“X” Error
0480 ZMENGEPROZ:UEBLI AFPO-UEBTO MENGEPROZ:UEBLI K DEC 13 3 Overdelivery in per cent
0490 ZOPT:UEBLI V_TCORU-UEBLI for order OPT:UEBLI K CHAR 1 Reaction to overdelivery
type and plant “ “ No reaction
“W” Warning
“X” Error
0500 ZUMRFAKTP:Z MARM UMRFAKTP:Z K NUM 8 Factor for conversion primary quantity  base quantity
(counter)
0510 ZUMRFAKTP:N MARM UMRFAKTP:N K NUM 8 Factor for conversion primary quantity  base quantity
(denominator)
0520 ZUMRFAKTS:Z MARM UMRFAKTS:Z K NUM 8 Factor for conversion secondary quantity  base
quantity (counter)
0530 ZUMRFAKTS:N MARM UMRFAKTS:N K NUM 8 Factor for conversion secondary quantity  base
quantity (denominator)
0540 ZUMRFAKTT:Z MARM UMRFAKTT:Z K NUM 8 Factor for conversion tertiary quantity  base quantity
(counter)
0550 ZUMRFAKTT:N MARM UMRFAKTT:N K NUM 8 Factor for conversion tertiary quantity  base quantity
(denominator)
SAP-PPPI_82.docx Version: 1.0.23049 Page 18 of 60

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

Operation data part two (ZOPER_02)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER    AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
0050  ZRUEZ  03-RUEST  RUEZ  K  NUM  8     Setup time in seconds
0060  ZRUEZ:ZUSCHL    RUEZ:ZUSCHL  K  NUM  8     Addition of setup time in seconds
0070  ZBEARBZ  03-BEARZ  BEARBZ  K  NUM  8     Processing time in seconds
| 0080  | ZPZ  |     | PZ  | K  NUM  | 8     Inspection time in seconds  |     |
| ----- | ---- | --- | --- | ------- | --------------------------------- | --- |
0090  ZABRZ  03-ABRUE  ABRZ  K  NUM  8     Teardown time in seconds
| 0100  | ZLIZ  |     | LIZ  | K  NUM  | 8     Delivery time in seconds  |     |
| ----- | ----- | --- | ---- | ------- | ------------------------------- | --- |
0110  ZFREMDFERT  T430-LIEF = X for control  FREMDFERT  K  CHAR  1     External processing OP J/N
key of the phase in the
order. Join AFVC with
AFKO, field AUFPL
0120  ZRLZ:EXPR  Fix "RLFZ"  RLZ:EXPR  K  CHAR  6     Formula pro calculating the estimated remaining
processing time (formula 1)
Mainly relevant if the control center of HYDRA is used
(HLS). Deviating settings are possible within the scope
of the customizing of HYDRA.
0130  ZRLZ:EXPR2    RLZ:EXPR2  K  CHAR  6     Remaining running time (formula 2); optional (leave
empty)
| 0140  | ZVLZ  |     | VLZ  | K  NUM  | 8     Lead  time in seconds  |     |
| ----- | ----- | --- | ---- | ------- | ---------------------------- | --- |
0150  ZLIEZ:MAX    LIEZ:MAX  K  NUM  8     Max. synchronization time in seconds
| 0160  | ZWARTZ  |     | WARTZ  | K  NUM  | 8     Wait time in seconds  |     |
| ----- | ------- | --- | ------ | ------- | --------------------------- | --- |
0170  ZWARTZ:MIN    WARTZ:MIN  K  NUM  8     Minimal waiting time in seconds
| 0180  | ZLIEZ  |     | LIEZ  | K  NUM   | 8     Idle period in seconds  |     |
| ----- | ------ | --- | ----- | -------- | ----------------------------- | --- |
| 0190  | ZLART  |     | LART  | K  CHAR  | 4     Wage type               |     |
0200  ZAKKORD    AKKORD  K  CHAR  1     Piece rate indicator/piece-rate premium

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 19 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0210 ZTE TE K DEC 13 3 Premium specification te in seconds per 1000 pieces
0220 ZTR TR K DEC 13 3 Premium specification tr in seconds
0230 ZTEB TEB K DEC 13 3 Premium specification teb in seconds per 1000 pieces
0240 ZTRB TRB K DEC 13 3 Premium specification trb in seconds
0250 ZVERARBCODE VERARBCODE M CHAR 6 Processing code; fix "SYSTEM"
Deviating settings are possible within the scope of the
customizing of HYDRA.
0260 ZOPT:ERF Fix "J" OPT:ERF M CHAR 1 Can be entered J/N
0270 ZOPT:MULTIMNR OPT:MULTIMNR M CHAR 1 Operation can be logged on parallel on different
workplaces (J/N)
0280 ZOPT:CNR OPT:CNR MM CHAR 1 Subject to batch tracing J/N
0290 ZOPT:SNR OPT:SNR M CHAR 1 Subject to management in serial numbers J/N ("J” only
relevant for ADE-SNR)
0300 ZSZY SZY K NUM 8 Target cycle in seconds/1000, should be set; mandatory
for MDE monitoring of the cycle of the machine
0310 ZTLG TLG K NUM 8 Partitioning; should be pre-defined with 1; mandatory for
MDE monitoring of the cycle of the machine
0320 ZIMPFAKT IMPFAKT K DEC 13 3 Pulse factor; reserved; should be pre-defined with1
0330 ZOPT:SPLIT OPT:SPLIT K CHAR 1 Can be split J/N (“J” only relevant for ADE-SSG, ADE-
SPL, HLS-SPL)
0340 ZMAXANZSPLIT MAXANZSPLIT K NUM 8 Max. number of splits (only relevant if OPT:SPLIT = "J")
0350 ZMBVERH:RUE MBVERH:RUE K DEC 5 2 Relation machines-user setting up; reserved.
0360 ZMBVERH:NORM MBVERH:NORM K DEC 5 2 Relation machines-user producing;
SAP-PPPI_82.docx Version: 1.0.23049 Page 20 of 60

    HYDRA Interfacing Module to SAP PP-PI

Components of the operation
Components of the operation part one (ZCOMP_01)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER    AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
0050  PPPI_ MATERIAL_NUMBER  MARA-BISMT  ATK  M  CHAR  18     Material number; alphabetical characters in UPPER
CASE
0060  PPPI_MATERIAL_SHORT_TEXT    ATKBEZ_1  K  CHAR  30     Material designation
0070  ZPPPI_MATERIAL_SHORT_TEXT    ATKBEZ_2  K  CHAR  10     Material designation
| 0080  | ZAGKL_BEZ    | RESB-POSNR  | BEZ    | K  CHAR  | 30     Comment 1  |     |
| ----- | ------------ | ----------- | ------ | -------- | ----------------- | --- |
| 0090  | ZAGKL_BEZ:2  |             | BEZ:2  | K  CHAR  | 30     Comment 2  |     |
0100  ZSLP  RESB-RSPOS  SLP  S  CHAR  10     Bill of material item / Position
MPL-RF: Should position of the component in the layer
structure (lamination)
| 0110  | ZSLS  |     | SLS  | M  NUM  | 8     Level of bill of material  |     |
| ----- | ----- | --- | ---- | ------- | -------------------------------- | --- |
Material components with level of bill of material > 1 are
always saved in the material type “I” = info component
| 0120  | ZART  |     | ART  | MM  CHAR  | 2     |     |
| ----- | ----- | --- | ---- | --------- | ----- | --- |
Material nature
"M" (Consumable) material
"T" Carrier material (only MPL-RF)
"I" Info component
0130  Z_PPPI_MATERIAL_TYPE_HYDRA    MATTYP  MM  CHAR  10     MPL/MPL-RF: material type
If HYDRA MPL is used a valid material type that is
configured in HYDRA has to be indicated
0140  ZVERBR    VERBR  MM  CHAR  1     MPL/MPL-RF: Consumption type

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 21 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0150 ZOPT:ERSB OPT:ERSB MM CHAR 1 MPL-RF: replaceable – may another material than the
planned one be used for such a component? Only the
same material type as the one of the material to be
produced may be used then.
Unplanned material could only log on at machine if
correct machine status is set.
MPL/MPL-RF: J/N
Otherwise: Fix “N”
0160 ZOPT:WZW OPT:WZW MM CHAR 1 MPL/MPL-RF: subject to changes; input batch change
for a batch of this material forces an output batch
change:
if ART = "T" or "Z"  OPT:WZW must be "J"
if ART = "I" or "A"  OPT:WZW must be "N"
if ART = "M"  OPT:WZW: "J" or "N"
0170 ZAGKL_SGR:GUT SGR:GUT MM DEC 13 3 MPL/MPL-RF: Required quantity for this component
(position) in relation to the production of 1 unit/article in
the primary quantity unit of the operation
0180 ZAGKL_SGE:GUT RESB-EINHEIT SGE:GUT MM CHAR 3 MPL/MPL-RF: quantity unit of the required quantity
0190 ZMENGEPROZ MENGEPROZ K DEC 13 3 Required quantity in per cent
Reserved, currently no use
0200 ZOTG OTG K DEC 13 3 Upper tolerance limit in per cent; 3 places after decimal
point
Reserved; currently no use
0210 ZUTG UTG K DEC 13 3 Lower tolerance limit in per cent; 3 places after decimal
point
Reserved; currently no use
0220 ZAGKL_EGR:GUT RESB-ERFMG EGR:GUT K DEC 13 3 Total quantity/requirement quantity: total quantity
required for OP, i.e. for the quantity to be produced
(output quantity)
0230 ZAGKL_EGE:GUT RESB-EINHEIT EGE:GUT K CHAR 3 Unit of the quantity required
0240 ZSLS:M SLS:M K NUMC 8 Level of the bill of material of the mother material
0250 ZSLP:M SLP:M K CHAR 10 Position of the bill of material of the mother material
0260 ZMENGE:FIX RESB-FMENG MENGE:FIX K CHAR 1 Indicator: fixed quantity
No functionality in HYDRA, just displaying
“J” Fixed Quantity
“ “ no fixed quantity
0270 ZPPS:RETRO RESB-RGEKZ PPS:RETRO K CHAR 1 Indicator: Backflush (in the PPS)
No functionality in HYDRA, just displaying
SAP-PPPI_82.docx Version: 1.0.23049 Page 22 of 60

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0280  ZMATLISTINFO.LAGORT (:PPS)  RESB-LGORT  MATLISTINFO.LAGO K  CHAR  4     Storage location
|     |     |     | RT (:PPS)  |     | Will be mapped into FU:48 (MPDV internal)  |     |
| --- | --- | --- | ---------- | --- | ------------------------------------------ | --- |
0290  ZMATLISTINFO.LAGPZ (:SAP)  RESB-LGORT  MATLISTINFO.LAGP K  CHAR  10     Storage bin
|       |               |     | Z (:SAP)  |          | Will be mapped into FU:49 (MPDV internal)  |     |
| ----- | ------------- | --- | --------- | -------- | ------------------------------------------ | --- |
| 0300  | ZAGKL_USRFLD  |     | USRFLD    | S  CHAR  | 8     User field key                       |     |
| 0310  | ZAGKL_FU:1    |     | FU:1      | K  DATE  | 8     User field 1                         |     |
| 0320  | ZAGKL_FU:2    |     | FU:2      | K  DATE  | 8     User field 2                         |     |
| 0330  | ZAGKL_FU:3    |     | FU:3      | K  DATE  | 8     User field 3                         |     |
| 0340  | ZAGKL_FU:4    |     | FU:4      | K  DATE  | 8     User field 4                         |     |
| 0350  | ZAGKL_FU:5    |     | FU:5      | K  DATE  | 8     User field 5                         |     |
| 0360  | ZAGKL_FU:6    |     | FU:6      | K  DATE  | 8     User field 6                         |     |
| 0370  | ZAGKL_FU:7    |     | FU:7      | K  NUM   | 8     User field 7                         |     |
| 0380  | ZAGKL_FU:8    |     | FU:8      | K  NUM   | 8     User field 8                         |     |
| 0390  | ZAGKL_FU:9    |     | FU:9      | K  NUM   | 8    User field 9                          |     |
| 0400  | ZAGKL_FU:10   |     | FU:10     | K  NUM   | 8     User field 10                        |     |
| 0410  | ZAGKL_FU:11   |     | FU:11     | K  NUM   | 8     User field 11                        |     |
| 0420  | ZAGKL_FU:12   |     | FU:12     | K  NUM   | 8     User field 12                        |     |
| 0430  | ZAGKL_FU:13   |     | FU:13     | K  NUM   | 8     User field 13                        |     |
| 0440  | ZAGKL_FU:14   |     | FU:14     | K  NUM   | 8     User field 14                        |     |
| 0450  | ZAGKL_FU:15   |     | FU:15     | K  NUM   | 8     User field 15                        |     |
| 0460  | ZAGKL_FU:16   |     | FU:16     | K  NUM   | 8     User field 16                        |     |
| 0470  | ZAGKL_FU:17   |     | FU:17     | K  NUM   | 8     User field 17                        |     |
| 0480  | ZAGKL_FU:18   |     | FU:18     | K  NUM   | 8     User field 18                        |     |
| 0490  | ZAGKL_FU:19   |     | FU:19     | K  NUM   | 8     User field 19                        |     |
| 0500  | ZAGKL_FU:20   |     | FU:20     | K  NUM   | 8     User field 20                        |     |
| 0510  | ZAGKL_FU:21   |     | FU:21     | K  NUM   | 8     User field 21                        |     |
| 0520  | ZAGKL_FU:22   |     | FU:22     | K  NUM   | 8     User field 22                        |     |
| 0530  | ZAGKL_FU:23   |     | FU:23     | K  DEC   | 13  3  User field 23                       |     |
| 0540  | ZAGKL_FU:24   |     | FU:24     | K  DEC   | 13  3  User field 24                       |     |
| 0550  | ZAGKL_FU:25   |     | FU:25     | K  DEC   | 13  3  User field 25                       |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 23 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |              | Field  | Field  |         |                       |     |
| ----- | ------------ | ------ | ------ | ------- | --------------------- | --- |
| 0560  | ZAGKL_FU:26  |        | FU:26  | K  DEC  | 13  3  User field 26  |     |
| 0570  | ZAGKL_FU:27  |        | FU:27  | K  DEC  | 13  3  User field 27  |     |
| 0580  | ZAGKL_FU:28  |        | FU:28  | K  DEC  | 13  3  User field 28  |     |

Components of the operation part two (ZCOMP_02)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG                | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION        |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE            |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
| 0050  | PPPI_MATERIAL_NUMBER  | MARA-BISMT   | ATK    | M  CHAR  | 18                    |     |
Material number; alphabetical characters in UPPER
CASE
0060  ZSLP    SLP  S  CHAR  10     Bill of material item / Position
MPL-RF: Should position of the component in the layer
structure (lamination)
| 0070  | ZAGKL_USRFLD  |     | USRFLD  | S  CHAR  | 8     User field key  |     |
| ----- | ------------- | --- | ------- | -------- | --------------------- | --- |
0080  ZAGKL_FU:29  MARA-STOFF  FU:29  K  CHAR  1     User field 29
| 0090  | ZAGKL_FU:30  |     | FU:30  | K  CHAR  | 1     User field 30  |     |
| ----- | ------------ | --- | ------ | -------- | -------------------- | --- |
| 0100  | ZAGKL_FU:31  |     | FU:31  | K  CHAR  | 1     User field 31  |     |
| 0110  | ZAGKL_FU:32  |     | FU:32  | K  CHAR  | 1     User field 32  |     |
| 0120  | ZAGKL_FU:33  |     | FU:33  | K  CHAR  | 1     User field 33  |     |
| 0130  | ZAGKL_FU:34  |     | FU:34  | K  CHAR  | 1     User field 34  |     |
| 0140  | ZAGKL_FU:35  |     | FU:35  | K  CHAR  | 1     User field 35  |     |
| 0150  | ZAGKL_FU:36  |     | FU:36  | K  CHAR  | 1     User field 36  |     |
| 0160  | ZAGKL_FU:37  |     | FU:37  | K  CHAR  | 1     User field 37  |     |
| 0170  | ZAGKL_FU:38  |     | FU:38  | K  CHAR  | 1     User field 38  |     |
| 0180  | ZAGKL_FU:39  |     | FU:39  | K  CHAR  | 1     User field 39  |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 24 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |              | Field  | Field  |          |                      |     |
| ----- | ------------ | ------ | ------ | -------- | -------------------- | --- |
| 0190  | ZAGKL_FU:40  |        | FU:40  | K  CHAR  | 1     User field 40  |     |
| 0200  | ZAGKL_FU:41  |        | FU:41  | K  CHAR  | 1     User field 41  |     |
| 0210  | ZAGKL_FU:42  |        | FU:42  | K  CHAR  | 1     User field 42  |     |
| 0220  | ZAGKL_FU:43  |        | FU:43  | K  CHAR  | 1     User field 43  |     |
| 0230  | ZAGKL_FU:44  |        | FU:44  | K  CHAR  | 1     User field 44  |     |
0240  ZAGKL_FU:45  RESB-RSNUM  FU:45  K  CHAR  10     User field 45
| 0250  | ZAGKL_FU:46  |     | FU:46  | K  CHAR  | 10     User field 46  |     |
| ----- | ------------ | --- | ------ | -------- | --------------------- | --- |
0260  ZAGKL_FU:47  RESB-CHARG  FU:47  K  CHAR  10     User field 47
| 0270  | ZAGKL_FU:48  |     | FU:48  | K  CHAR  | 10     User field 48  |     |
| ----- | ------------ | --- | ------ | -------- | --------------------- | --- |
| 0280  | ZAGKL_FU:49  |     | FU:49  | K  CHAR  | 10     User field 49  |     |
| 0290  | ZAGKL_FU:50  |     | FU:50  | K  CHAR  | 10     User field 50  |     |
| 0300  | ZAGKL_FU:51  |     | FU:51  | K  CHAR  | 20     User field 51  |     |
0310  ZAGKL_FU:52  RESB-MATNR  FU:52  K  CHAR  20     User field 52
| 0320  | ZAGKL_FU:53  |     | FU:53  | K  CHAR  | 20     User field 53  |     |
| ----- | ------------ | --- | ------ | -------- | --------------------- | --- |
| 0330  | ZAGKL_FU:54  |     | FU:54  | K  CHAR  | 20     User field 54  |     |
| 0340  | ZAGKL_FU:55  |     | FU:55  | K  CHAR  | 20     User field 55  |     |
| 0350  | ZAGKL_FU:56  |     | FU:56  | K  CHAR  | 20     User field 56  |     |
| 0360  | ZAGKL_FU:57  |     | FU:57  | K  CHAR  | 20     User field 57  |     |
| 0370  | ZAGKL_FU:58  |     | FU:58  | K  CHAR  | 20     User field 58  |     |
| 0380  | ZAGKL_FU:59  |     | FU:59  | K  CHAR  | 20     User field 59  |     |
| 0390  | ZAGKL_FU:60  |     | FU:60  | K  CHAR  | 20     User field 60  |     |
| 0400  | ZAGKL_FU:61  |     | FU:61  | K  CHAR  | 20     User field 61  |     |
| 0410  | ZAGKL_FU:62  |     | FU:62  | K  CHAR  | 20     User field 62  |     |
| 0420  | ZAGKL_FU:63  |     | FU:63  | K  CHAR  | 20     User field 63  |     |
| 0430  | ZAGKL_FU:64  |     | FU:64  | K  CHAR  | 20     User field 64  |     |
0440  ZAGKL_FU:65_1    FU:65_1  K  CHAR  30     User field 65
0450  ZAGKL_FU:65_2    FU:65_2  K  CHAR  10     User field 65
0460  ZAGKL_FU:66_1    FU:66_1  K  CHAR  30     User field 66
0470  ZAGKL_FU:66_2    FU:66_2  K  CHAR  30     User field 66

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 25 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

Production resources and tools
Production resources and tools (ZAGFH_01)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
0050  ZRESTYP     RESTYP  S  CHAR  4     Resource type; possible values:

DNC DNC-program
ENT Withdrawal unit
TEM Temperature control unit
VOR Fixture
WNR Tool
Further resource types (idents) can be defined in the
configuration of the resource type (menu WRM: Basic
data > Resource types) if the HYDRA tool and resource
management (WRM) is used.
0060  PPPI_MATERIAL  ATK  S  CHAR  18     Resource number/material number;  alphabetical
|     |     |     |     |     | characters UPPER CASE  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |
0070  ZAGFH_ATKBEZ_1     ATKBEZ_1  K  CHAR  30     Designation – Part one
0080  ZAGFH_ATKBEZ_2     ATKBEZ_2  K  CHAR  10     Designation – Part two
| 0090  | ZAGFH_BEZ    |     | BEZ    | K  CHAR  | 30     Comment 1  |     |
| ----- | ------------ | --- | ------ | -------- | ----------------- | --- |
| 0100  | ZAGFH_BEZ:2  |     | BEZ:2  | K  CHAR  | 30     Comment 2  |     |
0110  ZAGFH_SGR:GUT     SGR:GUT  M  QUAN  13  3  Required quantity
0120  ZAGFH_SGE:GUT     SGE:GUT  K  CHAR  3     Quantity unit
0130  ZAGKL_USRFLD  Fixed value  USRFLD  S  CHAR  8     User field key
| 0140  | ZAGKL_FU:1  |     | FU:1  | K  DATE  | 8     User field 1  |     |
| ----- | ----------- | --- | ----- | -------- | ------------------- | --- |
| 0150  | ZAGKL_FU:2  |     | FU:2  | K  DATE  | 8     User field 2  |     |
| 0160  | ZAGKL_FU:3  |     | FU:3  | K  DATE  | 8     User field 3  |     |
| 0170  | ZAGKL_FU:4  |     | FU:4  | K  DATE  | 8     User field 4  |     |
| 0180  | ZAGKL_FU:5  |     | FU:5  | K  DATE  | 8     User field 5  |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 26 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |              | Field  | Field  |          |                       |     |
| ----- | ------------ | ------ | ------ | -------- | --------------------- | --- |
| 0190  | ZAGKL_FU:6   |        | FU:6   | K  DATE  | 8     User field 6    |     |
| 0200  | ZAGKL_FU:7   |        | FU:7   | K  NUM   | 8     User field 7    |     |
| 0210  | ZAGKL_FU:8   |        | FU:8   | K  NUM   | 8     User field 8    |     |
| 0220  | ZAGKL_FU:9   |        | FU:9   | K  NUM   | 8     User field 9    |     |
| 0230  | ZAGKL_FU:10  |        | FU:10  | K  NUM   | 8     User field 10   |     |
| 0240  | ZAGKL_FU:11  |        | FU:11  | K  NUM   | 8     User field 11   |     |
| 0250  | ZAGKL_FU:12  |        | FU:12  | K  NUM   | 8     User field 12   |     |
| 0260  | ZAGKL_FU:13  |        | FU:13  | K  NUM   | 8     User field 13   |     |
| 0270  | ZAGKL_FU:14  |        | FU:14  | K  NUM   | 8     User field 14   |     |
| 0280  | ZAGKL_FU:15  |        | FU:15  | K  NUM   | 8     User field 15   |     |
| 0290  | ZAGKL_FU:16  |        | FU:16  | K  NUM   | 8     User field 16   |     |
| 0300  | ZAGKL_FU:17  |        | FU:17  | K  NUM   | 8     User field 17   |     |
| 0310  | ZAGKL_FU:18  |        | FU:18  | K  NUM   | 8     User field 18   |     |
| 0320  | ZAGKL_FU:19  |        | FU:19  | K  NUM   | 8     User field 19   |     |
| 0330  | ZAGKL_FU:20  |        | FU:20  | K  NUM   | 8     User field 20   |     |
| 0340  | ZAGKL_FU:21  |        | FU:21  | K  NUM   | 8     User field 21   |     |
| 0350  | ZAGKL_FU:22  |        | FU:22  | K  NUM   | 8     User field 22   |     |
| 0360  | ZAGKL_FU:23  |        | FU:23  | K  DEC   | 13  3  User field 23  |     |
| 0370  | ZAGKL_FU:24  |        | FU:24  | K  DEC   | 13  3  User field 24  |     |
| 0380  | ZAGKL_FU:25  |        | FU:25  | K  DEC   | 13  3  User field 25  |     |
| 0390  | ZAGKL_FU:26  |        | FU:26  | K  DEC   | 13  3  User field 26  |     |
| 0400  | ZAGKL_FU:27  |        | FU:27  | K  DEC   | 13  3  User field 27  |     |
| 0410  | ZAGKL_FU:28  |        | FU:28  | K  DEC   | 13  3  User field 28  |     |

Production resources and tools (ZAGFH_02)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 27 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
0050  ZRESTYP     RESTYP  S  CHAR  4     Resource type; possible values:

DNC DNC-program
ENT Withdrawal unit
TEM Temperature control unit
VOR Fixture
WNR Tool
Further resource types (idents) can be defined in the
configuration of the resource type (menu WRM: Basic
data > Resource types) if the HYDRA tool and resource
management (WRM) is used.
0060  PPPI_MATERIAL  ATK  S  CHAR  18     Resource number/material number;  alphabetical
|     |     |     |     |     | characters UPPER CASE  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |
0070  ZAGKL_USRFLD   Fixed value  USRFLD  S  CHAR  8     User field key
| 0080  | ZAGKL_FU:29  |     | FU:29  | K  CHAR  | 1     User field 29   |     |
| ----- | ------------ | --- | ------ | -------- | --------------------- | --- |
| 0090  | ZAGKL_FU:30  |     | FU:30  | K  CHAR  | 1     User field 30   |     |
| 0100  | ZAGKL_FU:31  |     | FU:31  | K  CHAR  | 1     User field 31   |     |
| 0110  | ZAGKL_FU:32  |     | FU:32  | K  CHAR  | 1     User field 32   |     |
| 0120  | ZAGKL_FU:33  |     | FU:33  | K  CHAR  | 1     User field 33   |     |
| 0130  | ZAGKL_FU:34  |     | FU:34  | K  CHAR  | 1     User field 34   |     |
| 0140  | ZAGKL_FU:35  |     | FU:35  | K  CHAR  | 1     User field 35   |     |
| 0150  | ZAGKL_FU:36  |     | FU:36  | K  CHAR  | 1     User field 36   |     |
| 0160  | ZAGKL_FU:37  |     | FU:37  | K  CHAR  | 1     User field 37   |     |
| 0170  | ZAGKL_FU:38  |     | FU:38  | K  CHAR  | 1     User field 38   |     |
| 0180  | ZAGKL_FU:39  |     | FU:39  | K  CHAR  | 1     User field 39   |     |
| 0190  | ZAGKL_FU:40  |     | FU:40  | K  CHAR  | 1     User field 40   |     |
| 0200  | ZAGKL_FU:41  |     | FU:41  | K  CHAR  | 1     User field 41   |     |
| 0210  | ZAGKL_FU:42  |     | FU:42  | K  CHAR  | 1     User field 42   |     |
| 0220  | ZAGKL_FU:43  |     | FU:43  | K  CHAR  | 1     User field 43   |     |
| 0230  | ZAGKL_FU:44  |     | FU:44  | K  CHAR  | 1     User field 44   |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 28 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |              | Field  | Field  |          |                        |     |
| ----- | ------------ | ------ | ------ | -------- | ---------------------- | --- |
| 0240  | ZAGKL_FU:45  |        | FU:45  | K  CHAR  | 10     User field 45   |     |
| 0250  | ZAGKL_FU:46  |        | FU:46  | K  CHAR  | 10     User field 46   |     |
| 0260  | ZAGKL_FU:47  |        | FU:47  | K  CHAR  | 10     User field 47   |     |
| 0270  | ZAGKL_FU:48  |        | FU:48  | K  CHAR  | 10     User field 48   |     |
| 0280  | ZAGKL_FU:49  |        | FU:49  | K  CHAR  | 10     User field 49   |     |
| 0290  | ZAGKL_FU:50  |        | FU:50  | K  CHAR  | 10     User field 50   |     |
| 0300  | ZAGKL_FU:51  |        | FU:51  | K  CHAR  | 20     User field 51   |     |
| 0310  | ZAGKL_FU:52  |        | FU:52  | K  CHAR  | 20     User field 52   |     |
| 0320  | ZAGKL_FU:53  |        | FU:53  | K  CHAR  | 20     User field 53   |     |
| 0330  | ZAGKL_FU:54  |        | FU:54  | K  CHAR  | 20     User field 54   |     |
| 0340  | ZAGKL_FU:55  |        | FU:55  | K  CHAR  | 20     User field 55   |     |
| 0350  | ZAGKL_FU:56  |        | FU:56  | K  CHAR  | 20     User field 56   |     |
| 0360  | ZAGKL_FU:57  |        | FU:57  | K  CHAR  | 20     User field 57   |     |
| 0370  | ZAGKL_FU:58  |        | FU:58  | K  CHAR  | 20     User field 58   |     |
| 0380  | ZAGKL_FU:59  |        | FU:59  | K  CHAR  | 20     User field 59   |     |
| 0390  | ZAGKL_FU:60  |        | FU:60  | K  CHAR  | 20     User field 60   |     |
| 0400  | ZAGKL_FU:61  |        | FU:61  | K  CHAR  | 20     User field 61   |     |
| 0410  | ZAGKL_FU:62  |        | FU:62  | K  CHAR  | 20     User field 62   |     |
| 0420  | ZAGKL_FU:63  |        | FU:63  | K  CHAR  | 20     User field 63   |     |
| 0430  | ZAGKL_FU:64  |        | FU:64  | K  CHAR  | 20     User field 64   |     |
0440  ZAGKL_FU:65_1    FU:65_1  K  CHAR  30     User field 65
0450  ZAGKL_FU:65_2    FU:65_2  K  CHAR  10     User field 65
0460  ZAGKL_FU:66_1    FU:66_1  K  CHAR  30     User field 66
0470  ZAGKL_FU:66_2    FU:66_2  K  CHAR  30     User field 66

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 29 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PP-PI

Documents of the operation (ZAGDC_01)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |
0050  ZAGDC_ATK     ATK  S  CHAR  18     Document ID: distinct key
alphabetical characters UPPER CASE
0060  ZAGDC_ATKBEZ_1     ATKBEZ_1  M  CHAR  40     Designation – Part one
0060  ZAGDC_ATKBEZ_2     ATKBEZ_2  M  CHAR  40     Designation – Part two
| 0070  | ZAGDC_BEZ    |     | BEZ    | K  CHAR  | 30     Comment 1  |     |
| ----- | ------------ | --- | ------ | -------- | ----------------- | --- |
| 0080  | ZAGDC_BEZ:2  |     | BEZ:2  | K  CHAR  | 30     Comment 2  |     |
| 0090  | ZAGDC_PATH   |     | PATH   | M  CHAR  | 8                 |     |
Reference to a mapping that is defined in the
configuration of the mapping (menu file > System
administration > Mappings).
0100  ZAGDC_DATEI_1     DATEI_1  M  CHAR  30     File name incl. file extension – Part one
0100  ZAGDC_DATEI_2     DATEI_2  M  CHAR  30     File name incl. file extension – Part two
0100  ZAGDC_DATEI_3     DATEI_3  M  CHAR  30     File name incl. file extension – Part three
0100  ZAGDC_DATEI_4     DATEI_4  M  CHAR  30     File name incl. file extension – Part four
0100  ZAGDC_DATEI_5     DATEI_5  M  CHAR  8     File name incl. file extension  – Part five

Userfields of the operation
Userfields of the operation part one (ZUFIELD3)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 30 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |                 | Field        | Field  |          |                      |     |
| ----- | --------------- | ------------ | ------ | -------- | -------------------- | --- |
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence       |     |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation      |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation  |     |
0050  ZAGUF_USRFLD  Fixed value  USRFLD  S  CHAR  8     User field key
| 0060  | ZAGUF_FU:1   |     | FU:1   | K  DATE  | 8     User field 1    |     |
| ----- | ------------ | --- | ------ | -------- | --------------------- | --- |
| 0070  | ZAGUF_FU:2   |     | FU:2   | K  DATE  | 8     User field 2    |     |
| 0080  | ZAGUF_FU:3   |     | FU:3   | K  DATE  | 8     User field 3    |     |
| 0090  | ZAGUF_FU:4   |     | FU:4   | K  DATE  | 8     User field 4    |     |
| 0100  | ZAGUF_FU:5   |     | FU:5   | K  DATE  | 8     User field 5    |     |
| 0110  | ZAGUF_FU:6   |     | FU:6   | K  DATE  | 8     User field 6    |     |
| 0120  | ZAGUF_FU:7   |     | FU:7   | K  NUM   | 8     User field 7    |     |
| 0130  | ZAGUF_FU:8   |     | FU:8   | K  NUM   | 8     User field 8    |     |
| 0140  | ZAGUF_FU:9   |     | FU:9   | K  NUM   | 8     User field 9    |     |
| 0150  | ZAGUF_FU:10  |     | FU:10  | K  NUM   | 8     User field 10   |     |
| 0160  | ZAGUF_FU:11  |     | FU:11  | K  NUM   | 8     User field 11   |     |
| 0170  | ZAGUF_FU:12  |     | FU:12  | K  NUM   | 8     User field 12   |     |
| 0180  | ZAGUF_FU:13  |     | FU:13  | K  NUM   | 8     User field 13   |     |
| 0190  | ZAGUF_FU:14  |     | FU:14  | K  NUM   | 8     User field 14   |     |
| 0200  | ZAGUF_FU:15  |     | FU:15  | K  NUM   | 8     User field 15   |     |
| 0210  | ZAGUF_FU:16  |     | FU:16  | K  NUM   | 8     User field 16   |     |
| 0220  | ZAGUF_FU:17  |     | FU:17  | K  NUM   | 8     User field 17   |     |
| 0230  | ZAGUF_FU:18  |     | FU:18  | K  NUM   | 8     User field 18   |     |
| 0240  | ZAGUF_FU:19  |     | FU:19  | K  NUM   | 8     User field 19   |     |
| 0250  | ZAGUF_FU:20  |     | FU:20  | K  NUM   | 8     User field 20   |     |
| 0260  | ZAGUF_FU:21  |     | FU:21  | K  NUM   | 8     User field 21   |     |
| 0270  | ZAGUF_FU:22  |     | FU:22  | K  NUM   | 8     User field 22   |     |
| 0280  | ZAGUF_FU:23  |     | FU:23  | K  DEC   | 13  3  User field 23  |     |
| 0290  | ZAGUF_FU:24  |     | FU:24  | K  DEC   | 13  3  User field 24  |     |
| 0300  | ZAGUF_FU:25  |     | FU:25  | K  DEC   | 13  3  User field 25  |     |
| 0310  | ZAGUF_FU:26  |     | FU:26  | K  DEC   | 13  3  User field 26  |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 31 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |              | Field  | Field  |          |                       |     |
| ----- | ------------ | ------ | ------ | -------- | --------------------- | --- |
| 0320  | ZAGUF_FU:27  |        | FU:27  | K  DEC   | 13  3  User field 27  |     |
| 0330  | ZAGUF_FU:28  |        | FU:28  | K  DEC   | 13  3  User field 28  |     |
| 0340  | ZAGUF_FU:29  |        | FU:29  | K  CHAR  | 1     User field 29   |     |
| 0350  | ZAGUF_FU:30  |        | FU:30  | K  CHAR  | 1     User field 30   |     |
| 0360  | ZAGUF_FU:31  |        | FU:31  | K  CHAR  | 1     User field 31   |     |
| 0370  | ZAGUF_FU:32  |        | FU:32  | K  CHAR  | 1     User field 32   |     |
| 0380  | ZAGUF_FU:33  |        | FU:33  | K  CHAR  | 1     User field 33   |     |
| 0390  | ZAGUF_FU:34  |        | FU:34  | K  CHAR  | 1     User field 34   |     |
| 0400  | ZAGUF_FU:35  |        | FU:35  | K  CHAR  | 1     User field 35   |     |
| 0410  | ZAGUF_FU:36  |        | FU:36  | K  CHAR  | 1     User field 36   |     |
| 0420  | ZAGUF_FU:37  |        | FU:37  | K  CHAR  | 1     User field 37   |     |
| 0430  | ZAGUF_FU:38  |        | FU:38  | K  CHAR  | 1     User field 38   |     |
| 0440  | ZAGUF_FU:39  |        | FU:39  | K  CHAR  | 1     User field 39   |     |
| 0450  | ZAGUF_FU:40  |        | FU:40  | K  CHAR  | 1     User field 40   |     |
| 0460  | ZAGUF_FU:41  |        | FU:41  | K  CHAR  | 1     User field 41   |     |
| 0470  | ZAGUF_FU:42  |        | FU:42  | K  CHAR  | 1     User field 42   |     |
| 0480  | ZAGUF_FU:43  |        | FU:43  | K  CHAR  | 1     User field 43   |     |
| 0490  | ZAGUF_FU:44  |        | FU:44  | K  CHAR  | 1     User field 44   |     |

Userfields of the operation part two (ZUFIELD4)
No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|     |     | Field  | Field  |     |     |     |
| --- | --- | ------ | ------ | --- | --- | --- |
0010  PPPI_PROCESS_ORDER     AUNR  S  CHAR  12     Order number
| 0020  | ZAFOLG          | 03-CY_SEQNR  | AFOLG  | S  NUMC  | 6     Sequence        |     |
| ----- | --------------- | ------------ | ------ | -------- | --------------------- | --- |
| 0030  | PPPI_OPERATION  |              | AGNR   | S  CHAR  | 4     Operation       |     |
| 0040  | PPPI_PHASE      |              | UVGNR  | S  CHAR  | 4     Sub-operation   |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 32 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- |

No  Characteristic  SAP Table /  HYDRA  V  T  L  D  Description
|       |               |     | Field  | Field   |          |                       |     |
| ----- | ------------- | --- | ------ | ------- | -------- | --------------------- | --- |
| 0050  | ZAGUF_USRFLD  |     |        | USRFLD  | S  CHAR  | 8     User field key  |     |
| 0060  | ZAGUF_FU:45   |     |        | FU:45   | K  CHAR  | 10     User field 45  |     |
| 0070  | ZAGUF_FU:46   |     |        | FU:46   | K  CHAR  | 10     User field 46  |     |
| 0080  | ZAGUF_FU:47   |     |        | FU:47   | K  CHAR  | 10     User field 47  |     |
| 0090  | ZAGUF_FU:48   |     |        | FU:48   | K  CHAR  | 10     User field 48  |     |
| 0100  | ZAGUF_FU:49   |     |        | FU:49   | K  CHAR  | 10     User field 49  |     |
| 0110  | ZAGUF_FU:50   |     |        | FU:50   | K  CHAR  | 10     User field 50  |     |
| 0120  | ZAGUF_FU:51   |     |        | FU:51   | K  CHAR  | 20     User field 51  |     |
| 0130  | ZAGUF_FU:52   |     |        | FU:52   | K  CHAR  | 20     User field 52  |     |
(PO_OUTPUT_COLOUR)
0140  ZAGUF_FU:53       FU:53  K  CHAR  20     User field 53
(PO_OUTPUT_MULTI_COLOUR)
| 0150  | ZAGUF_FU:54  |     |     | FU:54  | K  CHAR  | 20     User field 54  |     |
| ----- | ------------ | --- | --- | ------ | -------- | --------------------- | --- |
(OP_OUTPUT_SHAPE)
| 0160  | ZAGUF_FU:55  |     |     | FU:55  | K  CHAR  | 20     User field 55  |     |
| ----- | ------------ | --- | --- | ------ | -------- | --------------------- | --- |
| 0170  | ZAGUF_FU:56  |     |     | FU:56  | K  CHAR  | 20     User field 56  |     |
| 0180  | ZAGUF_FU:57  |     |     | FU:57  | K  CHAR  | 20     User field 57  |     |
| 0190  | ZAGUF_FU:58  |     |     | FU:58  | K  CHAR  | 20     User field 58  |     |
| 0200  | ZAGUF_FU:59  |     |     | FU:59  | K  CHAR  | 20     User field 59  |     |
| 0210  | ZAGUF_FU:60  |     |     | FU:60  | K  CHAR  | 20     User field 60  |     |
| 0220  | ZAGUF_FU:61  |     |     | FU:61  | K  CHAR  | 20     User field 61  |     |
| 0230  | ZAGUF_FU:62  |     |     | FU:62  | K  CHAR  | 20     User field 62  |     |
| 0240  | ZAGUF_FU:63  |     |     | FU:63  | K  CHAR  | 20     User field 63  |     |
| 0250  | ZAGUF_FU:64  |     |     | FU:64  | K  CHAR  | 20     User field 64  |     |
0260  ZAGUF_FU:65_1    FU:65_1  K  CHAR  30     User field 65
0270  ZAGUF_FU:65_2    FU:65_2  K  CHAR  10     User field 65
0280  ZAGUF_FU:66_1    FU:66_1  K  CHAR  30     User field 66
0290  ZAGUF_FU:66_2    FU:66_2  K  CHAR  10     User field 66

| SAP-PPPI_82.docx  |     |     |     | Version: 1.0.23049  |     |     | Page 33 of 60  |
| ----------------- | --- | --- | --- | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
Additional information for coil based manufacturing (ZAGRF_01)
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0010 PPPI_PROCESS_ORDER AUNR S CHAR 12 Order number
0020 ZAFOLG 03-CY_SEQNR AFOLG S NUMC 6 Sequence
0030 PPPI_OPERATION AGNR S CHAR 4 Operation
0040 PPPI_PHASE UVGNR S CHAR 4 Sub-operation
0050 ZRFAGTYP RFAGTYP K CHAR 1 Flag  type of operation:
" " No special processing
"P" Packaging operation
"M“ material staging (customer specific)
"G“ glow-operation (customer specific)
more (customer specific)
0060 ZRFABZ RFABZ MM CHAR 1 Distinguishes mother and children OPs in case of a
planned deduction.
"M“ Mother OP of a planned deduction
"K“ Child OP of a planned deduction (in this case a
special material movement - 531 - is processed).
0070 ZRFOPT:RS RFOPT:RS MM CHAR 1 Indicator for cutting coils (only relevant if it is a cutting
OP)
" “ no cutting
"T“ cutting of coils active (numbering of daughter coil)
"M“ cutting active (mother coils are generated again)
0080 ZRFMANR RFMANR MM CHAR 30 Cutting plan (order combination): The deduction (link) is
assigned to the respective mother OP by means of this
field and the following fields in case of a planned
deduction.
The mother OP references itself.
0090 ZRFTRANZ RFTRANZ MM NUMC 5 In case of cutting operations: number of the planned
daughter coils per cut.
0100 ZRFTRANZSUM RFTRANZSUM MM NUMC 5 In case of cutting operations (mother OP): number of
the planned daughter coils per cut (beyond all
deductions/ operations).
0110 ZRFRANZ RFRANZ MM NUMC 6 Planned number of coils (only information)
0120 ZRFSTKF RFSTKF MM NUMC 8 Area of a piece
Unit: MM2 / ST (integer)
SAP-PPPI_82.docx Version: 1.0.23049 Page 34 of 60

HYDRA Interfacing Module to SAP PP-PI
No Characteristic SAP Table / HYDRA V T L D Description
Field Field
0130 ZRFBSBRS RFBSBRS MM DEC 10 3 Sum seam width (Sum "border width"
If several coils are produced simultaneously in one
series of operations this field contains the sum of the
single seam widths.
The seam width of the individual series of operations is
explicitly set for each series of operations (“mother” and
“child” series of operations) in case of deductions (no
totals formation)
Unit: MM
0140 ZRFBREITEE RFBREITEE MM DEC 10 3 Inpout-width operation
Unit: MM
0150 ZRFBREITEA MARA-MTART RFBREITEA MM DEC 10 3 Output-width operation
Width of one outgoing roll within the operation (even if
more than one roll is cut).
The initial width of the individual operations is explicitly
set for each operation (“mother” and “child” operations)
in case of planned deductions (no totals formation).
Unit: MM
0160 ZRFAGVFA RFAGVFA MM DEC 10 3 Mass per unit area
Unit: G/M2
0170 ZRFHUEGEW RFHUEGEW K DEC 10 3 The weight of the casing of the daughter rolls is
specified here in case of cutting processes
SAP-PPPI_82.docx Version: 1.0.23049 Page 35 of 60

|     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | -------------------------------------- | --- |

This page remains empty for technical reasons.

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     | Page 36 of 60  |
| ----------------- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | -------------------------------------- | --- |

4  PP-PI Confirmations HYDRA --> SAP
Record types and activities supported by HYDRA
HYDRA BDE sends time ticket related confirmation of the following record types to SAP R/3 PP:
| Record  | SAP meaning  |     | Triggering HYDRA action   |     |     |
| ------- | ------------ | --- | ------------------------- | --- | --- |
type
00004  Time ticket partial confirmation  Start  of  an  process  order  /  operation
(transferred for each start)
00004  Time ticket partial completion  Automatic or manual order interruption at the
BDE terminal or console
00002  Time ticket completion  Message  of  a  completed  order  at  the  BDE
terminal or BDE console

| Please note  |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- |
If HYDRA MPL is active, whenever an output batch is created (output batch change message), in addition
to the time tickets for OP interruption or  logging off, an “0004” partial finish is created and transferred to
SAP.
Data structure PI_PHCON
Message type )*:
PI_PHCON
IDoc type )*:  PI_PHCON
Message functions:  -
Segments  PI_PHCON
 / categories:
)* The information is used in HYDRA only for HYDRA-internal reasons
| Characteristic  |     | Data type  | Description  |     | Mand.  |
| --------------- | --- | ---------- | ------------ | --- | ------ |
PPPI_ACTIVITY_1  Num (13) with 3 decimals  Activity to be confirmed 1
PPPI_ACTIVITY_1_FINISHED  Char (1)  Remaining work for act. 1
| PPPI_ACTIVITY_1_UNIT  |     | Char (6)  | Unit for activity 1  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_2  Num (13) with 3 decimals  Activity to be confirmed 2
PPPI_ACTIVITY_2_FINISHED  Char (1)  Remaining work for act. 2
| PPPI_ACTIVITY_2_UNIT  |     | Char (6)  | Unit for activity 2  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     |     | Page 37 of 60  |
| ----------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | -------------------------------------- | --- |

| Characteristic  |     | Data type  | Description  |     | Mand.  |
| --------------- | --- | ---------- | ------------ | --- | ------ |
PPPI_ACTIVITY_3  Num (13) with 3 decimals  Activity to be confirmed 3
PPPI_ACTIVITY_3_FINISHED  Char (1)  Remaining work for act. 3
| PPPI_ACTIVITY_3_UNIT  |     | Char (6)  | Unit for activity 3  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_4  Num (13) with 3 decimals  Activity to be confirmed 4
PPPI_ACTIVITY_4_FINISHED  Char (1)  Remaining work for act. 4
| PPPI_ACTIVITY_4_UNIT  |     | Char (6)  | Unit for activity 4  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_5  Num (13) with 3 decimals  Activity to be confirmed 5
PPPI_ACTIVITY_5_FINISHED  Char (1)  Remaining work for act. 5
| PPPI_ACTIVITY_5_UNIT  |     | Char (6)  | Unit for activity 5  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_6  Num (13) with 3 decimals  Activity to be confirmed 6
PPPI_ACTIVITY_6_FINISHED  Char (1)  Remaining work for act. 6
| PPPI_ACTIVITY_6_UNIT     |     | Char (6)  | Unit for activity 6  |     |     |
| ------------------------ | --- | --------- | -------------------- | --- | --- |
| PPPI_CLEAR_RESERVATIONS  |     | Char (1)  | Clear reservations   |     |     |
PPPI_CONFIRMATION_SHORT_TEXT  Char (30)  Confirmation text
| PPPI_EVENT_DATE  |     | Date : DDMMYYYY  | Date of event       |     | X   |
| ---------------- | --- | ---------------- | ------------------- | --- | --- |
| PPPI_EVENT_TIME  |     | Time : HHMMSS    | Date/time of event  |     | X   |
| PPPI_OPERATION   |     | Char (4)         | Operation number    |     |     |
| PPPI_PHASE       |     | Char (4)         | Phase number        |     | X   |
PPPI_PHASE_RESOURCE  Char (8)  Primary resource of a phase
| PPPI_PLANT_OF_RESOURCE  |     | Char (4)         | Plant of the resource  |     |     |
| ----------------------- | --- | ---------------- | ---------------------- | --- | --- |
| PPPI_POSTING_DATE       |     | Date : DDMMYYYY  | Posting date           |     |     |
| PPPI_PROCESS_ORDER      |     | Char (12)        | Process order          |     | X   |
PPPI_SCRAP_TO_CONFIRM  Num (13) with 3 decimals  Scrap to be confirmed
PPPI_STATUS_CONFIRMED  Char (5)  Status f. activity confirmat.
| PPPI_UNIT_OF_MEASURE  |     | Char (6)  | Unit of measure  |     |     |
| --------------------- | --- | --------- | ---------------- | --- | --- |
PPPI_YIELD_TO_CONFIRM  Num (13) with 3 decimals  Yield to be confirmed

PLEASE NOTE:
The confirmation of quantities (“00002” / “00004” ) via partial confirmations during simultaneous recording
using total quantity counters on MDE machines is not possible, as the SAP system does not process
negative quantities. This type of recording can lead to negative yield quantity bookings at the end of the
operation.
This restriction does not apply, if such negative bookings can be processed (e.g. through additional use of
the SAP standard BAPIs or customer specific processes).

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     |     | Page 38 of 60  |
| ----------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |   HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | ---------------------------------------- | --- | --- |

5  MYERPRCK - Program Parameters
|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
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
| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
Program parameters to control processing:
/MESTYP=XXXX  The  parameter  MESTYP  defines  the  All  Yes
structure to be generated.
/GRP=XXXX  The grouping type specifies the criterion  Requires  Requires
by  which  uploads  should  be  grouped.  customizations  customizations
Possible values:
PLANT --> Groups by plant
/V=sssss  Since  SAP  R/3  PP  does  not  support  EIS-ERP  Yes
|     |     | correction  | postings,  | HYDRA  allows  | to  |     |
| --- | --- | ----------- | ---------- | -------------- | --- | --- |
EIS-XPPS
|     |     | retain      | confirmations/uploads  |            | for     |     |
| --- | --- | ----------- | ---------------------- | ---------- | ------- | --- |
|     |     | correction  | purposes               | in  HYDRA  | for  a  |     |
SAP-PPPDC
specific period of time.
SAP-PPREM
Use the parameter /V=sssss  (sssss =

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 39 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------- | --- |

| Parameters  |     | Meaning/use  |     |           |     |           | Relevant       | Productive  |
| ----------- | --- | ------------ | --- | --------- | --- | --------- | -------------- | ----------- |
|             |     |              |     |           |     |           | interfaces     | release     |
|             |     | delay  time  | in  | seconds)  | to  | activate  | the  SAP-PPPI  |             |
above described delay when the upload
SAP-PMCC3
program is called.
SAP-PSCC4
Examples:
SAP-COILV
  myerprck.exe/out /V=3600
The system only uploads postings
that are older than one hour.
| /BIS=DDMMYYHHMM  |     | Use         | the  | parameter  |     |        | /BIS=  EIS-ERP  | Yes  |
| ---------------- | --- | ----------- | ---- | ---------- | --- | ------ | --------------- | ---- |
|                  |     | DDMMYYHHMM  |      | (date      | +   | time)  | when            |      |
| /BIS=HHMM        |     |             |      |            |     |        | EIS-XPPS        |      |
calling the upload program to enter the
delay as a point in time. You can enter
| /TILLDATE=MM/DD/YYYY  |     |     |     |     |     |     | SAP-PPPDC  |     |
| --------------------- | --- | --- | --- | --- | --- | --- | ---------- | --- |
this point in time with date and time or
/TILLTIME=sec  after  you can just enter the time in the format  SAP-PPREM
| midnight  |     | "HHMM".  | In  the  | latter  | case,  | the  | time  |     |
| --------- | --- | -------- | -------- | ------- | ------ | ---- | ----- | --- |
SAP-PPPI
refers to the current day.
SAP-PMCC3
  Myerprck.exe
/BIS=2505110600
SAP-PSCC4
|     |     | This  | parameter  |     | uploads  | postings  |     |     |
| --- | --- | ----- | ---------- | --- | -------- | --------- | --- | --- |
SAP-COILV
that were recorded until 06:00 a.m.
on 25 May 2011.
|     |     |   Myerprck.exe  |            |     |          | /BIS=0600  |     |     |
| --- | --- | --------------- | ---------- | --- | -------- | ---------- | --- | --- |
|     |     | This            | parameter  |     | uploads  | postings   |     |     |
that were recorded until 06:00 a.m.
of the current day.
/TZ=+/-sssss  Use the parameter /TZ=+/-sssss to adapt  SAP-PPPDC  Yes
|     |     | uploads  | to  different  |     | time  | zones.  | The  |     |
| --- | --- | -------- | -------------- | --- | ----- | ------- | ---- | --- |
parameter adjusts the time specifications
|     |     | entered  |     | in  | the  |     | fields  |     |
| --- | --- | -------- | --- | --- | ---- | --- | ------- | --- |
EXEC__START_TIME,
EXEC_FIN_TIME and LOGTIME of the
|     |     | upload  | structure  | of  | the  | SAP-PPPDC  |     |     |
| --- | --- | ------- | ---------- | --- | ---- | ---------- | --- | --- |
interface according to its specifications.

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 40 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
/KST=XXX  Use this parameter to restrict the data to  EIS-ERP  Yes
|     |     | be  uploaded.  | In  this  | case,  the  system  |     |     |
| --- | --- | -------------- | --------- | ------------------- | --- | --- |
ESI-XPPS
|     |     | only  uploads  | data  of  | a  specified  cost  |     |     |
| --- | --- | -------------- | --------- | ------------------- | --- | --- |
center.
SAP-PPPDC
|     |     | Use  the  | parameter  /KST=XXX  | (XXX  | =   |     |
| --- | --- | --------- | -------------------- | ----- | --- | --- |
SAP-PPREM
cost center, a max. of 8 characters) when
|     |     | calling           | the  upload  | program     | SAP-PPPI  |     |
| --- | --- | ----------------- | ------------ | ----------- | --------- | --- |
|     |     | myerprck.exe/out  | to  enable   | the  above- |           |     |
SAP-PMCC3
|     |     | described      | restriction.   | Then  the  system  |     |     |
| --- | --- | -------------- | -------------- | ------------------ | --- | --- |
|     |     | only  uploads  | data  records  | that  were         |     |     |
SAP-PSCC4
posted to machines of the specified cost
|     |     | center.  | The  system  | checks  the  cost  | SAP-COILV  |     |
| --- | --- | -------- | ------------ | ------------------ | ---------- | --- |
center of the machine/workplace that is
|     |     | entered  | as  | the  posting  |     |     |
| --- | --- | -------- | --- | ------------- | --- | --- |
workplace/machine in the posting record.
The system only checks the cost center
of the workplace/machine.
You can specify the parameter several
times per call.
Example:
|     |     |   Myerprck.exe  |     | /KST=BDE100  |     |     |
| --- | --- | --------------- | --- | ------------ | --- | --- |
/KST=BDE200
The system only uploads records
that were posted onto machines of
the cost center BDE100/BDE200.
/CLEAR_RES  Use  the  parameter  "/CLEAR_RES“  to  SAP-PPPDC  Yes
assign an "X" to the field CLEAR_RES of
the upload structure when it comes to a
|     |     | final  confirmation/upload  |     | (record  type  |     |     |
| --- | --- | --------------------------- | --- | -------------- | --- | --- |
L40). Consequently, SAP will clear open
reservations for the respective order.
/NEG_MENGE  By  default,  quantities  (L20/L40)  cannot  SAP-PPPDC  Yes

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 41 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use            |     |      |            |      | Relevant    | Productive  |
| ----------- | --- | ---------------------- | --- | ---- | ---------- | ---- | ----------- | ----------- |
|             |     |                        |     |      |            |      | interfaces  | release     |
|             |     | be  uploaded           | to  | SAP  | PP  using  |      | partial     |             |
|             |     | confirmations/uploads  |     |      | via        | the  | SAP-        |             |
PPPDC interface if data is collected at
|     |     | the  same  | time  | via  | the  total  | quantity  |     |     |
| --- | --- | ---------- | ----- | ---- | ----------- | --------- | --- | --- |
counter of MDE machines, since SAP is
not able to process negative quantities.
|     |     | This  type  | of  | collection  | can  | result  | in  |     |
| --- | --- | ----------- | --- | ----------- | ---- | ------- | --- | --- |
negative quantity postings for yield when
OPs are finished.
This restriction does no longer apply, if it
|     |     | is  possible  | to  | process  | such  | negative  |     |     |
| --- | --- | ------------- | --- | -------- | ----- | --------- | --- | --- |
postings (e.g. by using the SAP standard
|     |     | BAPI  or  | customizations).  |               | In  | this       | case,  |     |
| --- | --- | --------- | ----------------- | ------------- | --- | ---------- | ------ | --- |
|     |     | you  can  | use               | the  program  |     | parameter  |        |     |
/NEG_MENGE to enable the upload of
these quantities.
/LA_MNR  The SAP_PMCC3 interface requires the  SAP-PMCC3  Yes
activity type to be uploaded to SAP PM.
The activity type can be identified via the
|     |     | machine/workplace  |     | where  |       | the  posting  |     |     |
| --- | --- | ------------------ | --- | ------ | ----- | ------------- | --- | --- |
|     |     | was  performed.    |     | Use    | this  | program       |     |     |
parameter to enable identification of the
activity type.
Then the system uses the machine to
identify the activity type from the activity
types kept in HYDRA.
/IDENT_PRAEFIX=  In  the  upload  structure  of  the  SAP- SAP-PPPDC  Yes
|     |     | PPPDC  | interface,  | the  | field  | EX_IDENT  |     |     |
| --- | --- | ------ | ----------- | ---- | ------ | --------- | --- | --- |
SAP-PPPDCC
|     |     | uniquely  | identifies  |     | uploads  |     | from  |     |
| --- | --- | --------- | ----------- | --- | -------- | --- | ----- | --- |
subsystems. HYDRA populates the field.
You can add a prefix to the EX_IDENT
|     |     | field  to  | differentiate  |     | between  | uploads  |     |     |
| --- | --- | ---------- | -------------- | --- | -------- | -------- | --- | --- |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 42 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use    |     |        |             |     | Relevant    | Productive  |
| ----------- | --- | -------------- | --- | ------ | ----------- | --- | ----------- | ----------- |
|             |     |                |     |        |             |     | interfaces  | release     |
|             |     | from  various  |     | HYDRA  | subsystems  |     |             |             |
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
|     |     | Use  the  | parameter  | /ABZEICH=XX  |     |     | to  |     |
| --- | --- | --------- | ---------- | ------------ | --- | --- | --- | --- |
specify a period of time in days after that
SAP-PPREM
|     |     | you  can  | upload  | even  | unsigned  | data  |           |     |
| --- | --- | --------- | ------- | ----- | --------- | ----- | --------- | --- |
|     |     | records.  |         |       |           |       | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/TRANSFER=  Use  the  parameter  "/TRANSFER="  to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
were transferred from a specific system.
SAP-PPPDC
|     |     | The  transfer  |          | indicator   | is  set  | during  |     |     |
| --- | --- | -------------- | -------- | ----------- | -------- | ------- | --- | --- |
|     |     | HYDRA          | inbound  | processing  | and      | may     |     |     |
SAP-PPREM
vary from interface to interface.
SAP-PPPI
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 43 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |   HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | ---------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
/NOTRANSFER=XXX  Use the parameter "/NOTRANSFER=" to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
|     |     | were  NOT  | transferred  | from  a  specific  |     |     |
| --- | --- | ---------- | ------------ | ------------------ | --- | --- |
system.
SAP-PPPDC
|     |     | The  transfer  | indicator  | is  set  during  |     |     |
| --- | --- | -------------- | ---------- | ---------------- | --- | --- |
SAP-PPREM
|     |     | HYDRA                              | inbound  processing  | and  may  |           |     |
| --- | --- | ---------------------------------- | -------------------- | --------- | --------- | --- |
|     |     | vary from interface to interface.  |                      |           | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SEK  |     | The EIS-ERP interface uploads the times  |              |           | EIS-ERP  | Yes  |
| ----- | --- | ---------------------------------------- | ------------ | --------- | -------- | ---- |
|       |     | of  resource                             | performance  | accounts  | in       |      |
ESI-XPPS
hours.
In particular with very short lead times
this may effect that logon times are cut
off by a conversion into hours.
|     |     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | --- | ---------- | ------------------- | ----------- | --- | --- |
times in seconds.
/RMTYP=  When  customizing  the  order  type,  you  EIS-ERP  Yes
can assign an upload type to the order
ESI-XPPS
type.
SAP-PPPDC
|     |     | Use  this  | program  | parameter  to  only  |     |     |
| --- | --- | ---------- | -------- | -------------------- | --- | --- |
upload data records of this upload type.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 44 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |     |              |     |     |     |     | interfaces  | release     |
/KAT=  When  customizing  the  order  type,  you  EIS-ERP  Yes
|     |     | can  connect  |     | the  order  | type  | with  | a   |     |
| --- | --- | ------------- | --- | ----------- | ----- | ----- | --- | --- |
ESI-XPPS
category.
SAP-PPPDC
|     |     | Use  the  | program  | parameter  |     | /KAT=  | to  |     |
| --- | --- | --------- | -------- | ---------- | --- | ------ | --- | --- |
only upload data records of this category.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SART=  |     | The  system  | only  | uploads  |     | ADE  | log  EIS-ERP  | Yes  |
| ------- | --- | ------------ | ----- | -------- | --- | ---- | ------------- | ---- |
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
|     |     | the order type.  |     |     |     |     | SAP-PMCC3  |     |
| --- | --- | ---------------- | --- | --- | --- | --- | ---------- | --- |
SAP-PSCC4
You can specify the parameter several
times per call.
SAP-COILV
Example:
|     |     |   Myerprck.exe  |     |     |     | /SART=A  |     |     |
| --- | --- | --------------- | --- | --- | --- | -------- | --- | --- |
/SART=E
  The system only uploads A and
E records.
/NOLOCK  When starting the upload program, the  All  Requires
|     |     | system   | checks  | if  there  | are       | any  | lock   | customizations  |
| --- | --- | -------- | ------- | ---------- | --------- | ---- | ------ | --------------- |
|     |     | entries  | for     | the        | database  |      | table  |                 |
ADE_PROTOKOLL. If this is the case,

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 45 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |   HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | ---------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
the upload is not carried out.
You can use this program parameter to
prevent this check.
|     |     | Set this parameter, in particular,  |                 | if the          |     |     |
| --- | --- | ----------------------------------- | --------------- | --------------- | --- | --- |
|     |     | upload                              | is  not  based  | on  the  table  |     |     |
ade_protokoll.
/EINH_CC34  The  interfaces  SAP-PMCC3  and  SAP- SAP-PMCC3  Yes
|     |     | PSCC4  | transfer  the  | uploaded  activity  |     |     |
| --- | --- | ------ | -------------- | ------------------- | --- | --- |
SAP-PSCC4
quantity in seconds (SEC) to SAP. Use
the parameter "/EINH_CC34“ to upload
|     |     | the  data  | in  other  units.  | The  following  |     |     |
| --- | --- | ---------- | ------------------ | --------------- | --- | --- |
units are supported:
Hours:  H, HUR, STD
|     |     | Minutes:  | MIN  |     |     |     |
| --- | --- | --------- | ---- | --- | --- | --- |
|     |     | Seconds:  | SEC  |     |     |     |
Example:
  Myerprck.exe
/EINH_CC34=HUR
The system uploads the recorded
times in the unit "HUR“ (hours).
/SDAT_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the change date along with the correction
records.
|     |     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | --- | ---------- | ------------------- | ----------- | --- | --- |
the initially collected shift date instead.
/NORFC_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the cancellation records via sRFC.
Use the program parameter to transfer
the data in the IDoc format to SAP. To do

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 46 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use   |             |     |       | Relevant    | Productive  |
| ----------- | --- | ------------- | ----------- | --- | ----- | ----------- | ----------- |
|             |     |               |             |     |       | interfaces  | release     |
|             |     | so,  inbound  | processing  |     | must  | be          |             |
implemented in SAP.
|     |     | The  system  | uploads   | the       | cancellation  |     |     |
| --- | --- | ------------ | --------- | --------- | ------------- | --- | --- |
|     |     | records      | via  the  | standard  | PP-PDC        |     |     |
segment (with record type K20/K40) as if
the PP-PDCC license was not available.
| /PI  |     | If you use the SAP Process Integration  |           |                  |     | SAP-PPPDC  | Yes  |
| ---- | --- | --------------------------------------- | --------- | ---------------- | --- | ---------- | ---- |
|      |     | (previously:                            | Exchange  | Infrastructure)  |     | to         |      |
SAP-PMCC3
|     |     | communicate                              | with  | SAP,  | the  version  | of         |     |
| --- | --- | ---------------------------------------- | ----- | ----- | ------------- | ---------- | --- |
|     |     | the transferred segment is checked more  |       |       |               | SAP-PSCC4  |     |
strictly.

Use the program parameter to transfer
segment names with the version number
|     |     | (i.e.  the  | trailing  | zeros  of  | the  segment  |     |     |
| --- | --- | ----------- | --------- | ---------- | ------------- | --- | --- |
name).
/INDEX_TMP_TABLE  Use this parameter to accelerate uploads  All  Requires
|     |     | if ORACLE is used as database system  |     |     |     |     | customizations  |
| --- | --- | ------------------------------------- | --- | --- | --- | --- | --------------- |
and large amounts of data are affected.
To do so, use an index for a temporary
table where all data to be uploaded is
transferred in a first step.
/UE_PARAMS=  Program parameter for the stand-alone  Various  Yes
user exit processing (DD format).
| /NOSTORNO  |     | Use this program parameter to prevent  |          |     |       | All    | Yes  |
| ---------- | --- | -------------------------------------- | -------- | --- | ----- | ------ | ---- |
|            |     | cancellation                           | records  |     | from  | being  |      |
uploaded.
Therefore, you can use different program
parameters per call and record type for
uploading.
Requirement: You have to activate the

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 47 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
corresponding uploads when customizing
the order type.
/RECALC_NEG_YIELD  Use  this  parameter  to  offset  negative  SAP-PPPDCC  Requires
|     |     | yield  with  | already  | posted  positive  |     | customizations  |
| --- | --- | ------------ | -------- | ----------------- | --- | --------------- |
uploads.
Program parameters to use the SIGUSR communication:
/LOGGING  Use this program parameter to activate  INDIVIDUAL  Yes
|     |     | communication from the database table  |     |     | CASE  |     |
| --- | --- | -------------------------------------- | --- | --- | ----- | --- |
HYD_LOGGING.
|     |     | To  do  | so,  a  customization  | might  | be  |     |
| --- | --- | ------- | ---------------------- | ------ | --- | --- |
required.
/WAIT_SIGUSR1=XX  The  program  parameter  specifies  the  INDIVIDUAL  Yes
|     |     | time in seconds that has to pass before  |     |     | CASE  |     |
| --- | --- | ---------------------------------------- | --- | --- | ----- | --- |
the upload is performed via the SIGUSR
communication even without trigger.
| /PEEK_SIGUSR1=XX  |     |     |     |     | INDIVIDUAL  | Yes  |
| ----------------- | --- | --- | --- | --- | ----------- | ---- |
CASE
Use this parameter to delay execution of
|     |     | an  action  | triggered  | by  the  SIGUSR  |     |     |
| --- | --- | ----------- | ---------- | ---------------- | --- | --- |
communication.
The delay time is entered in seconds for
this parameter.
|     |     | The  program  | interprets  | this  time  | as  |     |
| --- | --- | ------------- | ----------- | ----------- | --- | --- |
follows:
If within the next second after the initial
trigger there is another trigger, then wait
|     |     | for  not  | more  than  <specified  |     | value>  |     |
| --- | --- | --------- | ----------------------- | --- | ------- | --- |
seconds.
|     |     | If  in  a  | specific  case,  | triggers      | would  |     |
| --- | --- | ---------- | ---------------- | ------------- | ------ | --- |
|     |     | indeed     | arrive  every    | second  then  | the    |     |

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 48 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |     |              |     |     |     |     | interfaces  | release     |
WAIT_SIGUSR time (e.g. 120 seconds)
would apply; i.e. the system would in fact
perform the upload after 2 minutes.
/SEND_SIGUSR1=  This  program  parameter  defines  which  INDIVIDUAL  Yes
|     |     | other process/ program must be triggered  |             |     |      |         | CASE  |     |
| --- | --- | ----------------------------------------- | ----------- | --- | ---- | ------- | ----- | --- |
|     |     | after                                     | processing  | by  | the  | SIGUSR  |       |     |
communication.
Specify the process/program WITHOUT
file extension.
/COUNT_SIGUSR1=XX  Uploading in signal mode can hardly be  INDIVIDUAL  Yes
|     |     | subjected to tracing. This is due to the  |     |     |     |     | CASE  |     |
| --- | --- | ----------------------------------------- | --- | --- | --- | --- | ----- | --- |
fact that the program in those cases is
started once via the scheduler but won't
shut off. Any redirection of the program
|     |     | call  with  | -d  to  | a  log  | file  | will  then  |     |     |
| --- | --- | ----------- | ------- | ------- | ----- | ----------- | --- | --- |
necessarily lead to very large log files,
|     |     | which  | will  negatively  |     |     | affect  the  |     |     |
| --- | --- | ------ | ----------------- | --- | --- | ------------ | --- | --- |
performance.
|     |     | Use                | the  new  | program  |              | parameter  |     |     |
| --- | --- | ------------------ | --------- | -------- | ------------ | ---------- | --- | --- |
|     |     | /COUNT_SIGUSR1=XX  |           |          | to  specify  | after      |     |     |
|     |     | how  many          | calls     | the      | program      | will       |     |     |
automatically shut down. A call in these
|     |     | instances  | is  both,  | a   | call  via  | SIGUSR  |     |     |
| --- | --- | ---------- | ---------- | --- | ---------- | ------- | --- | --- |
communication and the cyclical program
|     |     | execution  | which  | is  controlled  |     | via  the  |     |     |
| --- | --- | ---------- | ------ | --------------- | --- | --------- | --- | --- |
parameter /WAIT_SIGUSR1.
Then the scheduler restarts the program.
|     |     | But  this  | will  lead  | to  | a  time  | period  "t"  |     |     |
| --- | --- | ---------- | ----------- | --- | -------- | ------------ | --- | --- |
during which SIGUSR calls will not be
processed. It is, however, assumed that
this will not lead to data losses since the
data to be uploaded are already saved to

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 49 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

| Parameters  |     | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |     |              |     |     |     |     | interfaces  | release     |
the DB.
Benefits:
|     |     | If  the  | program  | is  started  | via  | a  script  |     |     |
| --- | --- | -------- | -------- | ------------ | ---- | ---------- | --- | --- |
(*.scr) from the scheduler, you can store
there the routine to generate a date/ time
|     |     | stamp  | file  name  | for  | the  log  | file  to  be  |     |     |
| --- | --- | ------ | ----------- | ---- | --------- | ------------- | --- | --- |
created. This allows to restrict the log file
size.
Program parameters for debugging/ tracing/ testing/ logging purposes:
/ONLYERR  This  program  parameter  specifies  that  All  Yes
system log entries are only created if an
error occurred during uploading.
This reduces the entries in the system
log.
| /SIM  |     | The system does not upload/confirm data  |     |              |     |          | All  | No  |
| ----- | --- | ---------------------------------------- | --- | ------------ | --- | -------- | ---- | --- |
|       |     | during                                   |     | simulations  |     | (the     |      |     |
|       |     | uploaded/confirmed                       |     | indicator    |     | is  set  | to   |     |
"'True").
/SIMULATION  The system does not upload/confirm data  All  No
|     |     | to  | SAP  | during  |     | simulation  |     |     |
| --- | --- | --- | ---- | ------- | --- | ----------- | --- | --- |
(confirmed/uploaded indicator will not be
changed).

| SAP-PPPI_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 50 of 60  |
| ----------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
6 Application-relevant settings in HYDRA
Maintenance of the HYDRA distribution model - inbound processing
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:
Name of the parameter Value
To process production orders
Message type PP_PI_PCS_HYDRA_INBOUND
Priority None
Command mle72imp.scr
Command parameter /VARIANTE =<MLE variant to use>
Description PP-PI – Download of process orders
Log. Target system Created logical system
Storage duration 10
Maintenance of the HYDRA distribution model - outbound processing
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
Name of the parameter Value
To upload phase confirmations
Message type PI_PHCON
Description PP-PI – Upload of phase confirmations
IDoc-Typ PI_PHCON
Storage duration 10
Log. Target system Created logical system
SAP-PPPI_82.docx Version: 1.0.23049 Page 51 of 60

|     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | -------------------------------------- | --- |

Name of the parameter  Value
Segment name 1  PI_PHCON

Maintenance of the tRFC-Destination
Also for the MLE upload PP-PI-PCS specific settings have to be applied. In the configuration of MLE
Logical System a new entry has to be applied for the program type “RFC-Client”. In that entry the RFC
destination name that has been created in SAP has be to provided.
Name of the parameter  Value
RFC_DESTINATION_FPR_TRFC  <Name of the RFC-destination created for HYDRA
in SAP (SM59)>

Configuration of the confirmation prefix
In order to be able to transfer confirmations from several HYDRA systems back into SAP PP-PI, an
unique identifier has to be applied. In case no INI-entry is given or the value is blank, the value “01” will
be used.
This prefix can be configured using HYDRA-INI-Configuration:
| Parameter name  |     | Value                                    |     |     |
| --------------- | --- | ---------------------------------------- | --- | --- |
| INI-Name        |     | PP-PI_PCS                                |     |     |
| Section         |     | PP-PI-PCS_MSID_PREFIX                    |     |     |
| Key             |     | KEY                                      |     |     |
| Value           |     | <Value to be used as unique identifier>  |     |     |
| Active          |     | Yes                                      |     |     |
| Remark          |     | PP-PI-PCS: Confirmation prefix           |     |     |

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     | Page 52 of 60  |
| ----------------- | --- | ------------------- | --- | -------------- |

|     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | -------------------------------------- | --- |

Maintenance of the HYDRA Scheduler
Use the HYDRA Scheduler to maintain entries for HYDRA outbound processing:
| Parameter name  |     | Value  |     |     |
| --------------- | --- | ------ | --- | --- |
To transfer confirmations from the application into the MLE outbound transactions
| Product key  |     | SAP-PPPI  |     |     |
| ------------ | --- | --------- | --- | --- |
| License key  |     | SAP-PPPI  |     |     |
Command (Windows):  sh.exe ./myerprck.scr /MESTYP=PI_PHCON /KAT=FA
| Command (Unix):  |     | ./myerprck.scr /MESTYP=PI_PHCON /KAT=FA  |     |     |
| ---------------- | --- | ---------------------------------------- | --- | --- |
Comment:  SAP-PPPI: Confirmations  MLE outbound transactions
| Intervall  |     | 5   |     |     |
| ---------- | --- | --- | --- | --- |
To transfer confirmations from the MLE outbound transactions to SAP PP-PI
| Product key  |     | SAP-PPPI  |     |     |
| ------------ | --- | --------- | --- | --- |
| License key  |     | SAP-PPPI  |     |     |
Command (Windows):  sh.exe  ./hysapupl.scr  /UPLSEGNAM=PI_PHCON
/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON /PP-PI-PCS
| Command (Unix):  |     | ./hysapupl.scr  | /UPLSEGNAM=BFLUSHDATAMTS  |     |
| ---------------- | --- | --------------- | ------------------------- | --- |
/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON /PP-PI-PCS
Comment:  SAP-PPPI: Confirmations MLE outbound transactions  SAP
| Intervall  |     | 5   |     |     |
| ---------- | --- | --- | --- | --- |

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     | Page 53 of 60  |
| ----------------- | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
7 Application-relevant customizing in SAP
Maintain control recipe destination
For each HYDRA system connected to SAP PP-PI a control recipe destination has to be maintained. In a
first step the control recipe destination is linked with the RFC destination created in SAP transaction
SM59. In further steps the process instructions have to be assigned.
To maintain the control recipe destination SAP transaction O10C is used (path with transaction SPRO:
Production Planning for Process Industries  Process Management  Decentralized Process
Management  Define and Set Up Control Recipe Destinations). It is important to maintain the control
recipe destination of type “2”, as this is the type supported by the HYDRA PP-PI-PCS implementation.
Maintain control recipe destination in master recipe
The control recipe destination created in transaction O10C has to be assigned to a specific phase in the
master recipe. By assigning control recipe destination that phase is relevant for downloading to HYDRA
when the control recipe is created.
In most cases the operations in the master recipe are not relevant for HYDRA but only the phases.
Define background job for sending control recipe
In this step a background job for sending control recipes in the SAP client is defined. For each job, the
following settings have to be made (SAP transaction SM36):
Start date of the job
One of the following options can be used:
The job should be started each time a new control recipe has been created in your client:
After event SAP_NEW_CONTROL_RECIPES
Event parameter <client>
Periodic job
The job should run periodically at certain intervals (option Date/Time with the time interval stored as
a period value).
Steps to be carried out
The job should start the ABAP report program RCOCB006.
SAP-PPPI_82.docx Version: 1.0.23049 Page 54 of 60

HYDRA Interfacing Module to SAP PP-PI
Define background job for sending process messages
In this step, a background job for sending process messages automatically is defined. This is necessary
to process the process messages with confirmations sent from HYDRA to SAP within SAP and to post
the data to the process order. To define the job SAP transaction SM36 is used.
Types of sending
The following options are available for background jobs:
Cross-plant sending
You use program RCOCB002 for this.
Plant-specific sending
You use program RCOCB004 for this. You specify the plant of the messages to be selected in a selection
variant.
The system processes all messages that have status:
 Created
 To be resubmitted
 To be resubmitted with warning
Start date of the job
In certain time intervals
After the event SAP_NEW_PROCESS_MESSAGES, this means, every time new messages are available
For cross-plant sending, you specify the client as the event parameter.
For plant-specific sending, you specify the client and plant as the event parameters.
Define production scheduling profiles
In the production scheduling profile it is defined, if the control recipe is created automatically when
releasing the process order. Production scheduling profiles can be assigned to a
 material (work scheduling screen in material master)
 production scheduler (Customizing)
The assignment to the material has a higher priority.
The production scheduling profile is copied to the production order or process order on order creation.
SAP-PPPI_82.docx Version: 1.0.23049 Page 55 of 60

HYDRA Interfacing Module to SAP PP-PI
8 Supervise communication
Supervising in SAP
Communication SAP  HYDRA
The control recipes created in SAP and transferred to HYDRA can be supervised in SAP transaction
CO53. The status of the control recipes is displayed as well as the date and time of creation.
Communication HYDRA  SAP
The process mesagges created in YHDAR and sent to SAP can be supervised in SAP transaction CO54.
The status of the control recipe is displayed as well as the date and time of creation.
Supervising in HYDRA
The supervising in HYDRA can be done using MLE inbound and MLE outbound transactions.
SAP-PPPI_82.docx Version: 1.0.23049 Page 56 of 60

HYDRA Interfacing Module to SAP PP-PI
9 Protecting fields of planned operations
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
SAP-PPPI_82.docx Version: 1.0.23049 Page 57 of 60

HYDRA Interfacing Module to SAP PP-PI
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
SAP-PPPI_82.docx Version: 1.0.23049 Page 58 of 60

|     |     |     | HYDRA Interfacing Module to SAP PP-PI  |     |
| --- | --- | --- | -------------------------------------- | --- |

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
| Database field  |     | Values/content                              |     |     |
| --------------- | --- | ------------------------------------------- | --- | --- |
| INI_VERWEIS     |     | The value of the VERWEIS column identified  |     |     |
from the HYD_INI table via SQL.
| SECTION              |     | Section  |     |     |
| -------------------- | --- | -------- | --- | --- |
| IDENT                |     | Key      |     |     |
| VALUE                |     | Value    |     |     |
| BEMERKUNG (comment)  |     | Comment  |     |     |
| AKTIV                |     | Active   |     |     |

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

| SAP-PPPI_82.docx  |     | Version: 1.0.23049  |     | Page 59 of 60  |
| ----------------- | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP PP-PI
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
SAP-PPPI_82.docx Version: 1.0.23049 Page 60 of 60