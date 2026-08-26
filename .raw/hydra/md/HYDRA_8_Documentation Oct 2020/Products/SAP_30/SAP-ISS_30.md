Manual
HYDRA Information Interface
for SAP PP
SAP-ISS 8.1
Version 1.1.19800
Last changed on: 06.08.2020

HYDRA Information Interface for SAP PP
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-ISS_30.docx Version: 1.1.22714 Page 2 of 32

|     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --------------------------------------- | --- |

Contents
1  Information Interface for SAP PP ................................................................. 4
2  Data type definitions ..................................................................................... 6
3  Interface Extension HYINFO ........................................................................ 8
4  HYDRA Settings Relevant to the Application ............................................. 26

| SAP-ISS_30.docx  |     | Version: 1.1.22714  |     | Page 3 of 32  |
| ---------------- | --- | ------------------- | --- | ------------- |

HYDRA Information Interface for SAP PP
1 Information Interface for SAP PP
Use options
The information interface for SAP PP allows for the download of additional data (e.g. long text,
component data), which are not included in the PP-PDC interface used to link MES to SAP.
This enables the provision of additional data and also of customer-specific tables in SAP to the MES, if
necessary.
Implementation notes
Use the information interface for SAP PP if:
 If you use the PP-PDC-interface for the transfer of production orders/ production transaction data
from SAP to the MES and if you also wish to transfer data that are not included there to the MES.
Integration
If you use the SAP-PPPDC component, the added orders/ operations form the reporting structure for
numerous additional components in HYDRA.
The data transferred like that may be completed by the information interface SAP PP in order to provide
data for the use of additional function packages.
Communication component to transfer provided additional information from SAP R/3 to the HYDRA data
base
Integration into the SAP business framework by synchronous RFC (Remote Function Call)
Assurance of data consistency during the integration into the PP-PDC environment.
Flexible transfer of additional information in the provided format
Requirements: the additional information is provided according to the MPDV specifications. This function
module is implemented under the customer's responsibility or is realized as an option in the context of a
special service order in connection with MPDV.
Scope of functions
 Communication component to transfer provided additional information from SAP R/3 and/or ECC
to the HYDRA database
 Integration into the SAP business framework by synchronous RFC (Remote Function Call)
SAP-ISS_30.docx Version: 1.1.22714 Page 4 of 32

HYDRA Information Interface for SAP PP
 Assurance of data consistency in the integration into the PP-PDC environment.
 Flexible transfer of additional information in the provided format
 Requirements:
o the additional information is provided according to the MPDV specifications.
On the SAP side, this function module is implemented under the customer's responsibility or is
realized as an option in the context of a special service order in connection with MPDV.
SAP-ISS_30.docx Version: 1.1.22714 Page 5 of 32

HYDRA Information Interface for SAP PP
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
SAP-ISS_30.docx Version: 1.1.22714 Page 6 of 32

HYDRA Information Interface for SAP PP
The character " ; “ (semicolon) is used as a separator in the system. You must not use this
character in key fields (e.g. order/operation number, MES batch number, personnel number).
The character " % " (percent) is used as a placeholder for database communication. You should
not use this character to prevent the result from being falsified.
SAP-ISS_30.docx Version: 1.1.22714 Page 7 of 32

HYDRA Information Interface for SAP PP
3 Interface Extension HYINFO
Overview
The fact that the PP-PDC and its predecessor (KK 2) were that often integrated into the process chain of
numerous organizations shows that in addition to the information provided by default message types
there is also a strong demand for further information on orders and operations. This is the reason why
you can additionally implement the PP-PDC interface extension developed by MPDV to meet the
customers' requirements.
Implement the RFC client "HYINFO“ in the MES to establish the PP-PDC extension. The MES processing
specifies the required structures. Moreover a function module is integrated into SAP. This function
module selects the data from the SAP data model. The HYINFO client calls this function module.
You can also extend the information interface to meet upcoming demands and to integrate additional
business units. This means that the function module can easily be customized to specific requirements.
The following presentation illustrates the data paths in a possible customer solution.
SAP-ISS_30.docx Version: 1.1.22714 Page 8 of 32

HYDRA Information Interface for SAP PP
The HYINFO client
Initial and delta downloads transfer operation data to HYDRA via the PP-PDC interface. In order to select
the necessary additional data for these operations, the HYDRA RFC server starts the responsible RFC
client. This RFC client transfers the operation data from the Opera2-IDoc to the function module in R/3.
Then the function module transmits the additional data to HYINFO. This communication takes place
synchronously.
The base structure of the internal table is based on the HYDRA structure "Additional information on the
operation" (HYINFO). It is the same structure for all used information records. There is only one
difference in the assignment of the fields related to their origin in SAP and to their usage in MES.
The function module "Z_PP_HYINFO_GET"
The function module to be implemented in SAP is developed in the customer's SAP namespace (in most
cases the "Z" namespace).
SAP-ISS_30.docx Version: 1.1.22714 Page 9 of 32

HYDRA Information Interface for SAP PP
The transfer of the record types from this module, can offer both, be geared to the HYINFO record types
and include customer- and/or project-specific record types. How this data is transferred and used in the
MES must be defined in each individual project.
You only have to transfer those segments that include the fields you need. For example, if you
only require header data, you only have to transfer the record type "AK" but no HYINFO-AV
segments.
MPDV may provide a sample implementation (as text file; cannot directly be implemented in
SAP). If necessary, please contact your Project Manager.
Module definition:
Function module Z_PP_HYINFO_GET
IMPORT
- none -
EXPORT
- none -
TABLES
Parameter name Type
ZPP_HYINFO ZPP_HYINFO
ZPP_HYBAPI1 ZPP_HYBAPI
Input data of the table ZPP_HYINFO
This internal table transfers those operations for which additional data is to be added.
The table has the same structure as for the return of the data. Only the following key data fields are
completed:
 ORDERID
 SEQUENCE
 OPERATION
 SUB_OPER
 SUBSYSTEM_GROUPING
1 Processing for table ZPP_HYBAPI is available from program version hysapinf.exe/out V8.1.1.43.
SAP-ISS_30.docx Version: 1.1.22714 Page 10 of 32

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- |

Input data of the table ZPP_HYBAPI
The table ZPP_HYBAPI does not require input data.
Output data of the table ZPP_HYINFO
The function module returns the data to be added in an internal table.
This table has the following structure (ZPP_HYINFO):
| Field name  |     | T        | L  Meaning       |     |     |     |
| ----------- | --- | -------- | ---------------- | --- | --- | --- |
| ORDERID     |     |   CHAR  | 12  Order        |     |     |     |
| SEQUENCE    |     |   CHAR  | 6  Sequence      |     |     |     |
| OPERATION   |     |   CHAR  | 4  Operation     |     |     |     |
| SUB_OPER    |     |   CHAR  | 4  Suboperation  |     |     |     |
SUBSYSTEM_GROUPING    CHAR  3  Grouping, subsystem (from SAP default data)
RECORDTYPE    CHAR  2  Information type ("AI", "AM", "AK", "AX", "AU")
| PAGENO  |     | NUMC  | 8  Serial numbering within a key   |     |     |     |
| ------- | --- | ----- | ---------------------------------- | --- | --- | --- |
(marked by )
... starting with "00000001"
| INFOTEXT1   |     | CHAR  | 80  Additional information text 1  |     |     |     |
| ----------- | --- | ----- | ---------------------------------- | --- | --- | --- |
| INFOTEXT2   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT3   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT4   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT5   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT6   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT7   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT8   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT9   |     | CHAR  | 80  “                              |     |     |     |
| INFOTEXT10  |     | CHAR  | 80  “                              |     |     |     |

Output data of the table ZPP_HYBAPI
The function module returns the data to be added in an internal table. The internal table includes HYDRA
dialog data strings. These dialog data strings are specified as part of the implementation project.2
| Field  |     | T   | L   | D  Description  |     |     |
| ------ | --- | --- | --- | --------------- | --- | --- |
Transaction  CHAR  20    Transaction ID (dialog ID in HYDRA) - no functional significance
Description  CHAR  40    Plain text description as comment - no functional significance
Data  CHAR  940    Dialog data string for HYDRA in the PDM format.
Example:
ANR.MODIFY|ANR.ANR=08150010|MNR=Maschine1|ATK=ABC|
…

2 Processing for table ZPP_HYBAPI is available from program version hysapinf.exe/out V8.1.1.43.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 11 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

Column legend
| Column      | Description        |     |     |     |     |
| ----------- | ------------------ | --- | --- | --- | --- |
| Field name  | Name of the field  |     |     |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
|     | M   | Mandatory field which must be filled with a valid value.           |     |     |     |
| --- | --- | ------------------------------------------------------------------ | --- | --- | --- |
|     | ML  | Mandatory field if the HYDRA Shop Floor Scheduling is used (HLS).  |     |     |     |
MM  Mandatory field if the HYDRA Material and Production Logistics (MPL and/or MPL/RF) is
used.
|     | K   | Field may stay empty (optional field).  |     |     |     |
| --- | --- | --------------------------------------- | --- | --- | --- |
SA  Mandatory field if the Arburg control system (SCS-ALS) is in use; otherwise optional field.
| T(ype)    | Data type of the field  |     |     |     |     |
| --------- | ----------------------- | --- | --- | --- | --- |
| L(ength)  | Field length            |     |     |     |     |
For fields of data type DEC/QUAN: Overall number of digits without decimal separator and algebraic
sign.
D(ecimal places)  For fields of data type DEC/QUAN: Number of decimal places; otherwise: not relevant.
| Description  | Field description and/or comment on the field.  |     |     |     |     |
| ------------ | ----------------------------------------------- | --- | --- | --- | --- |

Order header data (AK)
| Field name          |     | V  T     | L  D  Description        | Usage in HYDRA  |     |
| ------------------- | --- | -------- | ------------------------ | --------------- | --- |
| ORDERID             |     | M  CHAR  | 12  0  Order             |                 |     |
| SEQUENCE            |     | M  CHAR  | 6  0  Sequence           |                 |     |
| OPERATION           |     | M  CHAR  | 4  0  Operation          |                 |     |
| SUB_OPER            |     | M  CHAR  | 4  0  Suboperation       |                 |     |
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3    Subsystem grouping  |                 |     |
| RECORDTYPE          |     | M  CHAR  | 2    HYINFO record type  |                 |     |
Fixed "AK"
| PAGENO  |     | M  NUM  | 8    Fixed "00000001"  |     |     |
| ------- | --- | ------- | ---------------------- | --- | --- |
INFOTEXT1  M  QUAN 13  3  Base quantity   Order information Order
header (AK) General
Target quantity
In general, the SAP order
header quantity is integrated
into the HYDRA basic
quantity. Deviant definitions
are project-specific and are
explicitly presented as such.
M  CHAR  3    Base quantity unit  Order information  Order
header (AK)  General 
Target quantity unit
K  QUAN 13  3  Order scrap quantity  Order information  Order
header (AK)  General 
Estimated scrap
|     |     | K  QUAN 13  | 3  Order header quantity   | Not used  |     |
| --- | --- | ----------- | -------------------------- | --------- | --- |
INFOTEXT2  ML  DATE      Order end date  Order information 
Order header (AK) 
Dates  Order end
date

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 12 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  |     | V  T      | L  D  Description   | Usage in HYDRA             |     |
| ----------- | --- | --------- | ------------------- | -------------------------- | --- |
|             |     | ML  TIME  |     Order end time  | Order information  Order  |     |
Please note: HYDRA does header (AK)  Dates 
not support 240000;
Order end time
transfer 235959 instead.
ML  DATE      Order start date  Order information  Order
header (AK)  Dates 
Order start date
ML  TIME      Order start time   Order information  Order
Please note: HYDRA does header (AK)  Dates 
|     |     |     | not support 240000;  | Order start time  |     |
| --- | --- | --- | -------------------- | ----------------- | --- |
transfer 235959 instead.
|     |     | ML  DATE  |     Scheduled end (date)  | Order information  Order  |     |
| --- | --- | --------- | ------------------------- | -------------------------- | --- |
header (AK)  Dates 
|     |     |           |                           | Scheduled end              |     |
| --- | --- | --------- | ------------------------- | -------------------------- | --- |
|     |     | ML  TIME  |     Scheduled end (time)  | Order information  Order  |     |
header (AK)  Dates 
|     |     |           |                             | Scheduled end              |     |
| --- | --- | --------- | --------------------------- | -------------------------- | --- |
|     |     | ML  DATE  |     Scheduled start (date)  | Order information  Order  |     |
header (AK)  Dates 
Scheduled start

|     |     | ML  TIME  |     Scheduled start (time)  | Order information  Order  |     |
| --- | --- | --------- | --------------------------- | -------------------------- | --- |
header (AK)  Dates 
|            |     |          |       | Scheduled start            |     |
| ---------- | --- | -------- | ----- | -------------------------- | --- |
| INFOTEXT3  |     | K  CHAR  | 10    | Order information  Order  |     |
header (AK)  General 
|     |     |          | Sales order  | Sales order                |     |
| --- | --- | -------- | ------------ | -------------------------- | --- |
|     |     | K  CHAR  | 6            | Order information  Order  |     |
header (AK)  General 
|     |     |          | Sales order item   | Sales order item           |     |
| --- | --- | -------- | ------------------ | -------------------------- | --- |
|     |     | K  CHAR  | 3                  | Order information  Order  |     |
header (AK)  Assignment
 MRP controller
|     |     |          | MRP controller  |                            |     |
| --- | --- | -------- | --------------- | -------------------------- | --- |
|     |     | K  CHAR  | 3               | Order information  Order  |     |
header (AK)  Assignment
|     |     |          | Production controller  |  Order group              |     |
| --- | --- | -------- | ---------------------- | -------------------------- | --- |
|     |     | K  CHAR  | 8                      | Order information  Order  |     |
header (AK)  Assignment
|     |     |          | Task list group  |  Work plan                |     |
| --- | --- | -------- | ---------------- | -------------------------- | --- |
|     |     | K  CHAR  | 2                | Order information  Order  |     |
header (AK)  Assignment
 Work plan version
|     |     |     | Group counter  |     |     |
| --- | --- | --- | -------------- | --- | --- |
INFOTEXT4  M  CHAR  18    Material number  Order information  Article

|     |     | M  CHAR  | 40    Material name  | Order information  Order  |     |
| --- | --- | -------- | -------------------- | -------------------------- | --- |
header (AK)  General 
|     |     |          |                   | Article description        |     |
| --- | --- | -------- | ----------------- | -------------------------- | --- |
|     |     | M  CHAR  | 5    Order type   | Order information  Order  |     |
type
Fixed "0“, if not project-
|     |     |     |     | specific.  |     |
| --- | --- | --- | --- | ---------- | --- |
K  CHAR  15    eKANBAN control cycle  eKANBAN control cycle
This field is available as of
the MLE version HY72_030.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 13 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  |     | V  T  | L  D  Description  | Usage in HYDRA  |     |
| ----------- | --- | ----- | ------------------ | --------------- | --- |
INFOTEXT5  K  CHAR  40    Customer  Order information  Order
|     |     |     | name/designation  | header (AK)  Customer  |     |
| --- | --- | --- | ----------------- | ----------------------- | --- |
name
This field is available as of
the MLE version HY72_032.
INFOTEXT6  K  CHAR  50    Drawing issue number  Order information  Order
header (AK)  Drawing
issue number
This field is available as of
BDE82 and MLE version
HY72_032.

User fields for the header/ operation (AU)
Both, at the order header and at the operation, HYDRA provides 66 user fields, respectively, of different
data types. Only use the record type "AU" to transfer the user fields for the order header and the
operation. The data record itself differentiates between order header and operation.
Assign the key fields as follows to ensure correct data is transferred to HYDRA:
Field name  User fields for the order  User fields for the operation
header
| ORDERID             |     | SAP order number  |     | SAP order number         |     |
| ------------------- | --- | ----------------- | --- | ------------------------ | --- |
| SEQUENCE            |     | Empty             |     | SAP sequence number      |     |
| OPERATION           |     | Empty             |     | SAP operation number     |     |
| SUB_OPER            |     | Empty             |     | SAP suboperation number  |     |
| RECORDTYPE          |     | “AU“              |     | “AU“                     |     |
| INFOTEXT10.Satzart  |     | “AU“              |     | “AG“                     |     |

The complete data record structure:
| Field name  |     | V  T  | L  D  Description  | Usage in HYDRA  |     |
| ----------- | --- | ----- | ------------------ | --------------- | --- |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 14 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  |     | V  T     | L  D  Description  | Usage in HYDRA    |     |
| ----------- | --- | -------- | ------------------ | ----------------- | --- |
| ORDERID     |     | M  CHAR  | 12  0  Order       | SAP order number  |     |
- for order header
- for operation)*
| SEQUENCE  |     | M  CHAR  | 6  0  Sequence  | SAP order number  |     |
| --------- | --- | -------- | --------------- | ----------------- | --- |
- for operation)*
| OPERATION  |     | M  CHAR  | 4  0  Operation  | SAP order number  |     |
| ---------- | --- | -------- | ---------------- | ----------------- | --- |
- for operation)*
| SUB_OPER  |     | M  CHAR  | 4  0  Suboperation  | SAP order number  |     |
| --------- | --- | -------- | ------------------- | ----------------- | --- |
- for operation)*
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3    Subsystem grouping       |         |     |
| ------------------- | --- | -------- | ----------------------------- | ------- | --- |
| RECORDTYPE          |     | M  CHAR  | 2    HYINFO record type (AU)  |         |     |
| PAGENO              |     | M  NUM   | 8    Fixed "00000001"         |         |     |
| INFOTEXT1           |     | K  CHAR  | 8    User field key           | USRFLD  |     |
Fixed "SYSTEM“, if not
project-specific
|            |     | K  DATE  | 8    User field 1     | FU:1      |     |
| ---------- | --- | -------- | --------------------- | --------- | --- |
|            |     | K  DATE  | 8    User field 2     | FU:2      |     |
|            |     | K  DATE  | 8    User field 3     | FU:3      |     |
|            |     | K  DATE  | 8    User field 4     | FU:4      |     |
|            |     | K  DATE  | 8    User field 5     | FU:5      |     |
|            |     | K  DATE  | 8    User field 6     | FU:6      |     |
|            |     | K  NUM   | 8    User field 7     | FU:7      |     |
|            |     | K  CHAR  | 16    Filler          | Not used  |     |
| INFOTEXT2  |     | K  NUM   | 8    User field 8     | FU:8      |     |
|            |     | K  NUM   | 8    User field 9     | FU:9      |     |
|            |     | K  NUM   | 8    User field 10    | FU:10     |     |
|            |     | K  NUM   | 8                     | FU:11     |     |
|            |     |          | User field 11         |           |     |
|            |     | K  NUM   | 8    User field 12    | FU:12     |     |
|            |     | K  NUM   | 8    User field 13    | FU:13     |     |
|            |     | K  NUM   | 8    User field 14    | FU:14     |     |
|            |     | K  NUM   | 8    User field 15    | FU:15     |     |
|            |     | K  NUM   | 8    User field 16    | FU:16     |     |
|            |     | K  NUM   | 8    User field 17    | FU:17     |     |
| INFOTEXT3  |     | K  NUM   | 8    User field 18    | FU:18     |     |
|            |     | K  NUM   | 8    User field 19    | FU:19     |     |
|            |     | K  NUM   | 8    User field 20    | FU:20     |     |
|            |     | K  NUM   | 8    User field 21    | FU:21     |     |
|            |     | K  NUM   | 8    User field 22    | FU:22     |     |
|            |     | K  DEC   | 13  3  User field 23  | FU:23     |     |
|            |     | K  DEC   | 13  3  User field 24  | FU:24     |     |
|            |     | K  CHAR  | 10    Filler          | Not used  |     |
| INFOTEXT4  |     | K  DEC   | 13  3  User field 25  | FU:25     |     |
|            |     | K  DEC   | 13  3  User field 26  | FU:26     |     |
|            |     | K  DEC   | 13  3  User field 27  | FU:27     |     |
|            |     | K  DEC   | 13  3  User field 28  | FU:28     |     |
|            |     | K  CHAR  | 1    User field 29    | FU:29     |     |
|            |     | K  CHAR  | 1    User field 30    | FU:30     |     |
|            |     | K  CHAR  | 1    User field 31    | FU:31     |     |
|            |     | K  CHAR  | 1    User field 32    | FU:32     |     |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 15 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  |     | V  T     | L  D  Description    | Usage in HYDRA      |     |
| ----------- | --- | -------- | -------------------- | ------------------- | --- |
|             |     | K  CHAR  | 1    User field 33   | FU:33               |     |
|             |     | K  CHAR  | 1    User field 34   | FU:34               |     |
|             |     | K  CHAR  | 1    User field 35   | FU:35               |     |
|             |     | K  CHAR  | 1    User field 36   | FU:36               |     |
|             |     | K  CHAR  | 1    User field 37   | FU:37               |     |
|             |     | K  CHAR  | 1    User field 38   | FU:38               |     |
|             |     | K  CHAR  | 1    User field 39   | FU:39               |     |
|             |     | K  CHAR  | 1    User field 40   | FU:40               |     |
|             |     | K  CHAR  | 1    User field 41   | FU:41               |     |
|             |     | K  CHAR  | 1    User field 42   | FU:42               |     |
|             |     | K  CHAR  | 1    User field 43   | FU:43               |     |
|             |     | K  CHAR  | 1    User field 44   | FU:44               |     |
|             |     | K  CHAR  | 4    Filler          | Not used            |     |
| INFOTEXT5   |     | K  CHAR  | 10    User field 45  | FU:45               |     |
|             |     | K  CHAR  | 10    User field 46  | FU:46               |     |
|             |     | K  CHAR  | 10    User field 47  | FU:47               |     |
|             |     | K  CHAR  | 10    User field 48  | FU:48               |     |
|             |     | K  CHAR  | 10    User field 49  | FU:49               |     |
|             |     | K  CHAR  | 10    User field 50  | FU:50               |     |
|             |     | K  CHAR  | 20    User field 51  | FU:51               |     |
| INFOTEXT6   |     | K  CHAR  | 20    User field 52  | FU:52               |     |
|             |     | K  CHAR  | 20    User field 53  | FU:53               |     |
|             |     | K  CHAR  | 20    User field 54  | FU:54               |     |
|             |     | K  CHAR  | 20    User field 55  | FU:55               |     |
| INFOTEXT7   |     | K  CHAR  | 20    User field 56  | FU:56               |     |
|             |     | K  CHAR  | 20    User field 57  | FU:57               |     |
|             |     | K  CHAR  | 20    User field 58  | FU:58               |     |
|             |     | K  CHAR  | 20    User field 59  | FU:59               |     |
| INFOTEXT8   |     | K  CHAR  | 20    User field 60  | FU:60               |     |
|             |     | K  CHAR  | 20    User field 61  | FU:61               |     |
|             |     | K  CHAR  | 20    User field 62  | FU:62               |     |
|             |     | K  CHAR  | 20    User field 63  | FU:63               |     |
| INFOTEXT9   |     | K  CHAR  | 20                   | FU:64               |     |
|             |     |          | User field 64        |                     |     |
|             |     | K  CHAR  | 40    User field 65  | FU:65               |     |
|             |     | K  CHAR  | 20    Filler         | Not used            |     |
| INFOTEXT10  |     | K  CHAR  | 40    User field 66  | FU:66               |     |
|             |     | M  CHAR  | 2    Record type     | "AU"  Order header  |     |
"AG"  OP / Operation
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |

Operation data (AV)
Use the record type "AV" to transfer operation-related additional data from SAP to HYDRA. This includes
several process times and controlling information referring to operations.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 16 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |     |
| --- | --- | --- | --- | --------------------------------------- | --- | --- |

In  doing  so,  the  system  already  transfers  individual  fields  via  the  PP-PDC  structure  OPERA2.
Consequently, you can transfer these fields customer-specifically and thus deviate from the default
processing method in both, SAP and HYDRA.
| Field name  |     | V  T     | L  D  Description   | Usage in HYDRA  |     |     |
| ----------- | --- | -------- | ------------------- | --------------- | --- | --- |
| ORDERID     |     | M  CHAR  | 12  0  Order        |                 |     |     |
| SEQUENCE    |     | M  CHAR  | 6  0  Sequence      |                 |     |     |
| OPERATION   |     | M  CHAR  | 4  0  Operation     |                 |     |     |
| SUB_OPER    |     | M  CHAR  | 4  0  Suboperation  | Not used        |     |     |
SUBSYSTEM_GROUPING  M  CHAR  3    Subsystem grouping
| RECORDTYPE  |     | M  CHAR  | 2    HYINFO record type  |     |     |     |
| ----------- | --- | -------- | ------------------------ | --- | --- | --- |
Fixed "AV“
| PAGENO  |     | M  NUM  | 8    Number of pages  |     |     |     |
| ------- | --- | ------- | --------------------- | --- | --- | --- |
Fixed "00000001"
INFOTEXT1  ML  CHAR  20    HYDRA material type  You can use the HYDRA
material type to control
processing, in particular
when the HYDRA MPL
module is used.
If the HYDRA MPL module is
not used, the field must be
transferred with the value
"SYSTEM".
K  CHAR  1    External priority  Priority (0 - 9; 9 = priority
high)
|     |     | K  CHAR  | 20    Color  | Color of the material  |     |     |
| --- | --- | -------- | ------------ | ---------------------- | --- | --- |
K  CHAR  8    Cost center  Cost center of the operation
|     |     | K  CHAR  | 10    Cost type  |     |     |     |
| --- | --- | -------- | ---------------- | --- | --- | --- |
M  CHAR  1    Authorization level of the  Authorization level to log in
|     |     |     | operation  | and off the OP (lowest  |     |     |
| --- | --- | --- | ---------- | ----------------------- | --- | --- |
authorization = 1)
|     |     | K  QUAN 13  | 3  Minimum send ahead  |     |     |     |
| --- | --- | ----------- | ---------------------- | --- | --- | --- |
quantity in the (primary)
quantity unit of the
operation
|     |     | M  CHAR  | 5    Filler  | Complete with blanks (fixed)  |     |     |
| --- | --- | -------- | ------------ | ----------------------------- | --- | --- |
INFOTEXT2  M  NUMC 8    Processing time  Processing time in seconds
|     |     | K  NUMC 8  |   Teardown (retooling) time  |     |     |     |
| --- | --- | ---------- | ---------------------------- | --- | --- | --- |
in seconds
K  NUMC 8    Delivery time in seconds  Delivery time in seconds
At present only relevant in
connection with the HYDRA
Shop Floor Scheduling
module (HLS). Should be set
to 0 if this is not an external
processing OP.
ML  CHAR  1    Indicator external  At present only relevant in
|     |     |     | processing OP  | connection with the HYDRA  |     |     |
| --- | --- | --- | -------------- | -------------------------- | --- | --- |
Shop Floor Scheduling
module (HLS). Should in
general be set to "N".
M  CHAR  6    Remaining run time  Only relevant, if you use the
|     |     |     | formula  | HYDRA Shop Floor  |     |     |
| --- | --- | --- | -------- | ----------------- | --- | --- |
Scheduling module (HLS).
Transfer fixed "RLFZ" in this
case. Deviating settings are
possible if you customize
HYDRA.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 17 of 32  |     |
| ---------------- | --- | --- | ------------------- | --- | -------------- | --- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |     |     |
| --- | --- | --- | --- | --------------------------------------- | --- | --- | --- |

| Field name  |     | V  T       | L  D  Description            | Usage in HYDRA  |     |     |     |
| ----------- | --- | ---------- | ---------------------------- | --------------- | --- | --- | --- |
|             |     | K  NUMC 8  |   Lead time                  |                 |     |     |     |
|             |     | K  NUMC 8  |   Max. synchronization time  |                 |     |     |     |
in seconds
|     |     | K  NUMC 8  |   Waiting time in seconds  |     |     |     |     |
| --- | --- | ---------- | -------------------------- | --- | --- | --- | --- |
|     |     | K  NUMC 8  |   Minimum waiting time in  |     |     |     |     |
seconds
|     |     | K  NUMC 8  |   Wait time in seconds     |     |     |     |     |
| --- | --- | ---------- | -------------------------- | --- | --- | --- | --- |
|     |     | K  CHAR    | 4    Wage type             |     |     |     |     |
|     |     | K  CHAR    | 1    Piecework indicator/  |     |     |     |     |
premium
|            |     | M  CHAR     | 4    Filler                | Complete with blanks (fixed)  |     |     |     |
| ---------- | --- | ----------- | -------------------------- | ----------------------------- | --- | --- | --- |
| INFOTEXT3  |     | K  QUAN 13  | 3  Premium default: te in  |                               |     |     |     |
seconds per 1000 pieces
|     |     | K  QUAN 13  | 3  Premium default tr in  |     |     |     |     |
| --- | --- | ----------- | ------------------------- | --- | --- | --- | --- |
seconds
|     |     | K  QUAN 13  | 3  Premium default: teb in  |     |     |     |     |
| --- | --- | ----------- | --------------------------- | --- | --- | --- | --- |
seconds per 1000 pieces
|     |     | K  QUAN 13  | 3  Premium default trb in  |     |     |     |     |
| --- | --- | ----------- | -------------------------- | --- | --- | --- | --- |
seconds
|     |     | M  CHAR  | 6    Processing code  | fixed "SYSTEM"  |     |     |     |
| --- | --- | -------- | --------------------- | --------------- | --- | --- | --- |
Deviating settings are
possible if you customize
HYDRA.
|     |     | M  NUMC 8  |               |                           |     |     |     |
| --- | --- | ---------- | ------------- | ------------------------- | --- | --- | --- |
|     |     |            | Target cycle  | Target cycle in seconds/  |     |     |     |
1000; should be set;
|     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
mandatory for MDE cycle
monitoring
|     |     | M  CHAR  | 6    Filler  | Complete with blanks (fixed)  |     |     |     |
| --- | --- | -------- | ------------ | ----------------------------- | --- | --- | --- |
INFOTEXT4  M  NUMC 8    Partitioning  Partitioning or fixed
"00000001"
|     |     | K  DEC  | 5  2  Machine/operator ratio,  |     |     |     |     |
| --- | --- | ------- | ------------------------------ | --- | --- | --- | --- |
setup
|     |     | K  DEC  | 5  2  Machine/operator ratio,  |     |     |     |     |
| --- | --- | ------- | ------------------------------ | --- | --- | --- | --- |
production
|     |     | M  QUAN 13  | 3  Target quantity of the  |     |     |     |     |
| --- | --- | ----------- | -------------------------- | --- | --- | --- | --- |
operation
K  CHAR  10    Cost center  Alternative: Cost center of
the operation with 10 digits
INFOTEXT5  M  DEC  13  3  Underdelivery in percent  Underdelivery in percent
The value entered is an
absolute percentage value of
the target quantity (primary
quantity unit).
Example:
- Target quantity of the
operation: 120 pieces
- Underdelivery: 84%
The actual quantity must not
fall below 101 items.
This field is available as of
the MLE version HY72_032.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 18 of 32  |     |     |
| ---------------- | --- | --- | ------------------- | --- | -------------- | --- | --- |

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

| Field name  |     | V  T  | L  D  | Description  | Usage in HYDRA  |     |     |
| ----------- | --- | ----- | ----- | ------------ | --------------- | --- | --- |
M  CHAR  1    Reaction to underdelivery  Reaction to underdelivery
|     |     |     | Possible values:            |                 | Possible values:            |     |     |
| --- | --- | --- | --------------------------- | --------------- | --------------------------- | --- | --- |
|     |     |     | " "                         | no reaction     | " "  no reaction            |     |     |
|     |     |     | "W"                         | Warning; entry  | "W"  Warning; entry of a    |     |     |
|     |     |     | of a deviation reason       |                 | deviation reason required   |     |     |
|     |     |     | required                    |                 | "X"  Error;                 |     |     |
|     |     |     | "X"                         | Error;          | underdelivery not allowed.  |     |     |
|     |     |     | underdelivery not allowed.  |                 | Note: You can only enter    |     |     |
deviation reasons for
overdeliveries/
underdeliveries via the
CTWIN software. If you use
DOS terminals, the reaction
"W" is interpreted as an error
("X").
This field is available as of
the MLE version HY72_032.
M  DEC  13  3  Overdelivery in percent  Overdelivery in percent
The value entered is an
absolute percentage value of
the target quantity (primary
quantity unit).
Example:
- Target quantity of the
operation: 120 pieces
- Overdelivery: 168%
The actual quantity must not
exceed 201 items.
This field is available as of
the MLE version HY72_032.
M  CHAR  1    Reaction to overdelivery   Reaction to overdelivery
|     |     |     | Possible values:           |                 | Possible values:           |     |     |
| --- | --- | --- | -------------------------- | --------------- | -------------------------- | --- | --- |
|     |     |     | " "                        | no reaction     | " "  no reaction           |     |     |
|     |     |     | "W"                        | Warning; entry  | "W"  Warning; entry of a   |     |     |
|     |     |     | of a deviation reason      |                 | deviation reason required  |     |     |
|     |     |     | required                   |                 | "X"  Error; overdelivery   |     |     |
|     |     |     | "X"                        | Error;          | not allowed.               |     |     |
|     |     |     | overdelivery not allowed.  |                 | Note: You can only enter   |     |     |
|     |     |     |                            |                 | deviation reasons for      |     |     |
overdeliveries/
underdeliveries via the
CTWIN software. If you use
DOS terminals, the reaction
"W" is interpreted as an error
("X").
This field is available as of
the MLE version HY72_032.
|     |     | K  CHAR  | 1    Person OK  |     | Staff OK                       |     | ANR.RESS |
| --- | --- | -------- | --------------- | --- | ------------------------------ | --- | -------- |
|     |     |          |                 |     | This field is available as of  |     | TA:1     |
the MLE version HY72_032.
|     |     | K  CHAR  | 1    Tool OK  |     | Tool OK  |     | ANR.RESS |
| --- | --- | -------- | ------------- | --- | -------- | --- | -------- |
TA:2
This field is available as of
the MLE version HY72_032.
|     |     | K  CHAR  | 1    Material OK   |     | Material OK   |     | ANR.RESS |
| --- | --- | -------- | ------------------ | --- | ------------- | --- | -------- |
TA:3
This field is available as of
the MLE version HY72_032.
|     |     | K  NUM  | 8    PEP: Qualification:  |     | QUAL:NORM  |     |     |
| --- | --- | ------- | ------------------------- | --- | ---------- | --- | --- |
manufacturing
This field is available as of
the MLE version HY72_032.
|     |     | K  NUM  | 8    PEP: Qualification: setup  |     | QUAL:RUE  |     |     |
| --- | --- | ------- | ------------------------------- | --- | --------- | --- | --- |
This field is available as of
the MLE version HY72_032.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 19 of 32  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- | --- |

HYDRA Information Interface for SAP PP
Field name V T L D Description Usage in HYDRA
INFOTEXT6 K CHAR 50 Article index This field is available as of
the BDE82 MLE version
HY72_032.
Remarks on selected fields
If you use the record type "AV", the following fields of the structure "AV" must contain values:
"processing time", "partitioning" or "target quantity of the operation".
Target cycle
1) The system tries to read the cycle time from the field "target cycle" (SOLLZYKLUS). If this is
possible, the system enters this value as the target cycle time in the HYDRA operation.
2) If the system cannot identify the target cycle time according to 1), then the system calculates it
from the specified processing time (BEARBEITUNGSZEIT) and the partitioning (TEILIGKEIT)
values that might be specified.
Calculation basis (formulas):
Processing time OP = Target quantity OP * (target cycle time machine/ partitioning)
- Target cycle time machine (= BDE cycle time/ machine stroke)
- Target cycle time/ unit = target cycle time machine/ partitioning
=> Target cycle time machine= (processing time * partitioning)/ target quantity OP
Target partitioning
1) If the field "TEILIGKEIT" (partitioning) includes a value, the system enters this value as the
partitioning in the operation.
2) If this is not the case, the system implicitly assumes a partitioning of 1 and enters this value in
the operation.
Processing time
3) In HYDRA the content of the field "processing time" (PROCESS_TIME) specifies the standard
time for machine assignment (target for RPA 11).
Underdelivery/overdelivery in %
1) The system transfers the values for underdeliveries/overdeliveries and the corresponding
reactions from the E2BP_PP_PDC_OPERA2000 segment.
SAP-ISS_30.docx Version: 1.1.22714 Page 20 of 32

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

2)  You can overwrite these values with customer-specific values in the HYINFO "AV". Enable an
INI configuration if you want to prevent the values from being overwritten.
Additional texts for the operation (AI)
The structure “additional texts for the operation (AI)" offers numerous options to display additional
information on an operation via the terminal. This includes dimensions, quality specifications or handling
instructions. Once you have selected the operation, you can directly view the additional information in the
terminal  since  the  link  between  operation  and    information  was  already  established  during  the
download from R/3.
| Field name          |     | V  T     | L  D  Meaning             | Usage in HYDRA  |     |
| ------------------- | --- | -------- | ------------------------- | --------------- | --- |
| ORDERID             |     | M  CHAR  | 12    Order               |                 |     |
| SEQUENCE            |     | M  CHAR  | 6    Sequence             |                 |     |
| OPERATION           |     | M  CHAR  | 4    Operation            |                 |     |
| SUB_OPER           |     | M  CHAR  | 4    Suboperation         |                 |     |
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3    Grouping, subsystem  |                 |     |
(from SAP default data)
| RECORDTYPE  |     | M  CHAR  | 2    Type of information   |     |     |
| ----------- | --- | -------- | -------------------------- | --- | --- |
Fixed "AI"
| PAGENO  |     | M  NUMC  | 8    Serial numbering within a  |     |     |
| ------- | --- | -------- | ------------------------------- | --- | --- |
key
(marked by )
... starting with "00000001"
| INFOTEXT1  |     | K  CHAR  | 80    Additional information text  |     |     |
| ---------- | --- | -------- | ---------------------------------- | --- | --- |
1
| INFOTEXT2   |     | K  CHAR  | 80    “  |     |     |
| ----------- | --- | -------- | -------- | --- | --- |
| INFOTEXT3   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT4   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT5   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT6   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT7   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT8   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT9   |     | K  CHAR  | 80    “  |     |     |
| INFOTEXT10  |     | K  CHAR  | 80    “  |     |     |

Component list (AM)
The record type "BOM" and/ or "component list" was developed to gather BOM information on the
operation, i.e. the component lists from R/3 and to make it available to the HYDRA user. Possible
scenarios are for example: HYDRA displays the information or other systems, such as warehouse
management systems, process the data. If you also use the HYDRA MPL module, retrograde withdrawal
(backflushing) and posting in R/3 are possible.
| Field name  |     | V  T  | L  D  Description  | Usage in HYDRA  |     |
| ----------- | --- | ----- | ------------------ | --------------- | --- |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 21 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name          |     | V  T     | L  D  Description        | Usage in HYDRA  |     |
| ------------------- | --- | -------- | ------------------------ | --------------- | --- |
| ORDERID             |     | M  CHAR  | 12  0  Order             |                 |     |
| SEQUENCE            |     | M  CHAR  | 6  0  Sequence           |                 |     |
| OPERATION           |     | M  CHAR  | 4  0  Operation          |                 |     |
| SUB_OPER            |     | M  CHAR  | 4  0  Suboperation       |                 |     |
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3    Subsystem grouping  |                 |     |
| RECORDTYPE          |     | M  CHAR  | 2    HYINFO record type  |                 |     |
(Fixed "AM")
| PAGENO  |     | M  NUM  | 8    Number of pages  |     |     |
| ------- | --- | ------- | --------------------- | --- | --- |
INFOTEXT1  ML  CHAR  18    Material number  Order information  OP   40  57
Components  Material
INFOTEXT2  K  CHAR  30    Additional text 1  Order information  OP   120  149
Components  Description
1
K  CHAR  30    Additional text 2  Order information  OP   150  179
Components Description
2
INFOTEXT3  ML  QUAN 13  3  Input quantity of material  Order information  OP   200  214
|     |     |     | required to produce 1 part.  | Components  Input  |     |
| --- | --- | --- | ---------------------------- | ------------------- | --- |
quantity
ML  CHAR  3    Quantity unit  Order information  OP   215  217
Components  QU Input
quantity
K  QUAN 13  3  Requirement quantity  Order information  OP   218  232
Components  Required
quantity (ERP)
ML  CHAR  10    Number of the BOM item  Order information  OP   233  242
Components  Item
K  CHAR  1    Indicator for fixed quantity  Internal administration   243  243
K  CHAR  1    Indicator for retrograde  Internal administration  244  244
withdrawal/backflush
|     |     | ML  CHAR  | 4    Plant  | Internal administration  | 245  248  |
| --- | --- | --------- | ----------- | ------------------------ | --------- |
ML  CHAR  3    Unit of requirements  Unit of requirements quantity  249  251
|     |     |     | quantity  | This field is available as of  |     |
| --- | --- | --- | --------- | ------------------------------ | --- |
the MLE version HY72_032.
ML  CHAR  10    HYDRA material type  HYDRA material type  252  261
This field is available as of
the MLE version HY72_032.
ML  CHAR  1    HYDRA consumption  HYDRA consumption  262  262
|     |     |     | indicator  | indicator  |     |
| --- | --- | --- | ---------- | ---------- | --- |
If not specified otherwise,
assign "L" to this field.
For components of the
material type "I" assign "N"
to the field.
This field is available as of
the MLE version HY72_032.
"L"   Consumption
referring to batches (by
default)
"D"  Discrete
consumption
"A"  Anonymous
consumption
"U"  Automatic
consumption

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     | Page 22 of 32  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  |     | V  T  | L  D  | Description  | Usage in HYDRA  |     |
| ----------- | --- | ----- | ----- | ------------ | --------------- | --- |
INFOTEXT4  ML  CHAR  40    Material short text  Order information  OP   280  319
Components  Description

Production resources and tools (AF)
Use the record type "AF" to transfer production resources and tools to HYDRA. In this case it is not
important whether they are stored in SAP as production resources and tools. HYDRA shows the data in
the order information dialog in OP  PRT.
Please also note that the first production resource and tool transferred for an operation will also be shown
in the order information in OP  General  Tool.
| Field name  |     | V        | T  L  D  | Description  | Usage in HYDRA  |     |
| ----------- | --- | -------- | -------- | ------------ | --------------- | --- |
| ORDERID     |     | M  CHAR  | 12  0    | Order        |                 |     |
| SEQUENCE    |     | M  CHAR  | 6  0     | Sequence     |                 |     |
|             |     | M  CHAR  | 4  0     | Operation    |                 |     |
OPERATION
| SUB_OPER            |     | M  CHAR  | 4  0  | Suboperation        |     |     |
| ------------------- | --- | -------- | ----- | ------------------- | --- | --- |
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3     | Subsystem grouping  |     |     |
| RECORDTYPE          |     | M  CHAR  | 2     | HYINFO record type  |     |     |
Fixed "AF“
| PAGENO  |     | M  NUM  | 8    | Number of pages  |     |     |
| ------- | --- | ------- | ---- | ---------------- | --- | --- |
INFOTEXT1  M  CHAR  18    Material number of the  Order information  OP   40  57
|     |     |     |     | resource  | Components  PRT  |     |
| --- | --- | --- | --- | --------- | ----------------- | --- |
K  CHAR  40    Resource name  Order information  OP   58  97
Components  PRT
INFOTEXT2  K  CHAR  30    Comment 1  Order information  OP   120  149
Components  PRT
K  CHAR  30    Comment 2  Order information  OP   150  179
Components  PRT
M  QUAN 13  3  Input quantity  Order information  OP   180  194
Components  PRT
M  CHAR  3    Unit of the input quantity  Order information  OP 
Components  PRT
|     |     | M  CHAR  | 2    | Filler  | Not used  |     |
| --- | --- | -------- | ---- | ------- | --------- | --- |
INFOTEXT3  M  CHAR  4    Resource type  Order information  OP   200  203
|     |     |     |     | Fixed "WNR"  | Components  PRT  |     |
| --- | --- | --- | --- | ------------ | ----------------- | --- |

Documents (AC)
Use the record type "AC" to transfer document links to HYDRA. If you can access the file system, the
terminal displays these documents. In addition, the transferred document links will be displayed in the
order information  OP  PRT.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 23 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- |

| Field name          |     | V        | T  L  D  | Description         | Usage in HYDRA  |     |
| ------------------- | --- | -------- | -------- | ------------------- | --------------- | --- |
| ORDERID             |     | M  CHAR  | 12  0    | Order               |                 |     |
| SEQUENCE            |     | M  CHAR  | 6  0     | Sequence            |                 |     |
| OPERATION           |     | M  CHAR  | 4  0     | Operation           |                 |     |
| SUB_OPER            |     | M  CHAR  | 4  0     | Suboperation        | Not used        |     |
| SUBSYSTEM_GROUPING  |     | M  CHAR  | 3        | Subsystem grouping  |                 |     |
| RECORDTYPE          |     | M  CHAR  | 2        | HYINFO record type  |                 |     |
Fixed "AC“
| PAGENO  |     | M  NUM  | 8    | Number of pages  |     |     |
| ------- | --- | ------- | ---- | ---------------- | --- | --- |
INFOTEXT1  M  CHAR  18    Material number/  Order information  OP 
|     |     |     |     | identification of the  | Components  PRT  |     |
| --- | --- | --- | --- | ---------------------- | ----------------- | --- |
document/ graphic
|     |     |     |     |     | Please note:     |     |
| --- | --- | --- | --- | --- | ---------------- | --- |
The material number/
identification must be unique
in an operation; if several
document links are
transferred they must include
different values.
|     |     | K  CHAR  | 40    | Name  | Order information  OP   |     |
| --- | --- | -------- | ----- | ----- | ------------------------- | --- |
Components  PRT
INFOTEXT2  K  CHAR  30    Additional name 1 (option)  Order information  OP 
Components  PRT
K  CHAR  30    Additional name 2 (option)  Order information  OP 
Components  PRT
|     |     | M  QUAN 13  | 3   | Input quantity  | Order information  OP   |     |
| --- | --- | ----------- | --- | --------------- | ------------------------- | --- |
|     |     |             |     | Fixed "1.00"    | Components  PRT          |     |
M  CHAR  3    Unit of the input quantity  Order information  OP 
|            |     |          |      | Fixed "ST" (pieces/pcs.)  | Components  PRT          |     |
| ---------- | --- | -------- | ---- | ------------------------- | ------------------------- | --- |
|            |     | M  CHAR  | 2    | Filler                    | Not used                  |     |
| INFOTEXT3  |     | M  CHAR  | 8    | Path                      | Order information  OP   |     |
Components  PRT
Reference to a path that is
defined in the path
configuration (Menu File >
System administration >
Paths).
M  CHAR  72    File name incl. file  Order information  OP 
extension
Components  PRT
INFOTEXT4  M  CHAR  56    Continuation of the file  Order information  OP 
|     |     |     |     | name incl. file extension (if  | Components  PRT  |     |
| --- | --- | --- | --- | ------------------------------ | ----------------- | --- |
field in INFOTEXT3 is not
sufficient)
|     |     | M  CHAR  | 4     | Resource type  | Order information  OP   |     |
| --- | --- | -------- | ----- | -------------- | ------------------------- | --- |
|     |     |          |       | Fixed "DOC"    | Components  PRT          |     |
|     |     | M  CHAR  | 20    | Filler         | Not used                  |     |
INFOTEXT5  K  CHAR  25    Alternative: Identification of Order information  OP 
|     |     |     |     | the document/ graphic  | Components  PRT  |     |
| --- | --- | --- | --- | ---------------------- | ----------------- | --- |
(document ID) with 25
|     |     |     |     |     | Please note:     |     |
| --- | --- | --- | --- | --- | ---------------- | --- |
digits
The material number/
identification must be unique
in an operation; if several
document links are
transferred they must include
different values.

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 24 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- |

Unlock operation for processing (AE)
Use the record type "AE" to unlock the operation after interface processing, if you locked the operation
beforehand using the INI configuration.
If the system transfers the segment with the record type "AE" and the INI configuration that locks
operations is enabled for the HYINFO processing, then the transferred operation will be unlocked and
available for posting in the system.
Go to the Order information  OP  Administration  "Locked interface“ to view if an operation is locked
for HYINFO processing.

| Field name  |     | V        | T  L  D  | Description   | Usage in HYDRA  |     |
| ----------- | --- | -------- | -------- | ------------- | --------------- | --- |
| ORDERID     |     | M  CHAR  | 12  0    | Order         |                 |     |
| SEQUENCE    |     | M  CHAR  | 6  0     | Sequence      |                 |     |
| OPERATION   |     | M  CHAR  | 4  0     | Operation     |                 |     |
| SUB_OPER    |     | M  CHAR  | 4  0     | Suboperation  | Not used        |     |

When to use this function?
Enable the automatic lock using the INI configuration, if you want to make sure that an operation can only
be further processed in the system, once all required data and additional data have been transferred via
the interface.
How does this function work?
If the INI configuration is available and enabled, the system locks the relevant operation when transferring
the additional data via the HYINFO module in the OPERA2000 segment. HYDRA automatically locks the
operation. Transfer the "AE" segment if you want to unlock the operation after HYINFO processing.
Transfer the "AE" segment explicitly for each operation.
You cannot log on the operation to the AIP terminal as long as the operation is locked by the interface. If
you attempt to log on the operation to the terminal, the system rejects the logon with the error code 73
"OP is locked by MLE interface".
This segment is available as of MLE variant HY72_034. For further information please refer to
|     | documentation HYDRA Settings Relevant to the Application  |     |     |     |     |     |
| --- | --------------------------------------------------------- | --- | --- | --- | --- | --- |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 25 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

HYDRA Information Interface for SAP PP
4 HYDRA Settings Relevant to the Application

Maintenance of the HYDRA distribution model – inbound
Change existing entries or create new entries in the HYDRA distribution model for HYDRA inbound
processing:
Parameter name Value
Processing the PPCC2RECORDER IDoc of the PP-PDC interface
Message type PPCC2RECORDER
Priority None
Command hysapinf.scr
Command parameter /RECTYPE
Description PP-PDC / HYINFO – request additional data
Log. target system Created logical system
Retention period 10
Processing the PPCC2RECORDER IDoc and HYINFO additional data
Message type PPCC2HYINFOORDER
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE version to be used>
Description PP-PDC / HYINFO transfer of additional data
Log. target system Created logical system
Retention period 10
SAP-ISS_30.docx Version: 1.1.22714 Page 26 of 32

HYDRA Information Interface for SAP PP
No deletion of the operation's material, tool, NC program
If HYDRA receives components, tools, or NC programs for the operation, the system enters the first
element transferred for the operation in the corresponding fields "material", "tool" or "DNC". The same
applies if the tool is assigned by a production variant/version in the Shop Floor Scheduling module.
In both cases it might be necessary to prevent these operation entries from being deleted when the
components and PRT lists are deleted routinely while the system transfers the next operation. You can
achieve this by setting the relevant entries in the HYDRA INI configuration:
Parameter name Value
For the material
INI name SAP
Section E2BP_PP_PDC_OPERA2000
Key PREVENT_ANR_RES_MAT_FROM_DELETION
Value Y  yes
N  no
Active Yes
Comment Prevents the first resource of the type "material"
(ID "MAT") included in the component list from
being deleted when the component list is deleted.
For the tool
INI name SAP
Section E2BP_PP_PDC_OPERA2000
Key PREVENT_ANR_RES_WNR_FROM_DELETION
Value Y  yes
N  no
Active Yes
SAP-ISS_30.docx Version: 1.1.22714 Page 27 of 32

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |     |
| --- | --- | --- | --- | --------------------------------------- | --- | --- |

| Parameter name  |     |     | Value                                               |     |     |     |
| --------------- | --- | --- | --------------------------------------------------- | --- | --- | --- |
| Comment         |     |     | Prevents the first resource of the type "tool" (ID  |     |     |     |
"FHM"/"PRT") included in the component list from
being deleted when the PRT list is deleted.
For the DNC program
| INI name  |     |     | SAP                                |     |     |     |
| --------- | --- | --- | ---------------------------------- | --- | --- | --- |
| Section   |     |     | E2BP_PP_PDC_OPERA2000              |     |     |     |
| Key       |     |     | PREVENT_ANR_RES_DNC_FROM_DELETION  |     |     |     |
| Value     |     |     | Y  yes                            |     |     |     |
N  no
| Active  |     |     | Yes  |     |     |     |
| ------- | --- | --- | ---- | --- | --- | --- |
Comment  Prevents  the  first  resource  of  the  type  "DNC
resource" (ID "DNC") included in the component
list from being deleted when the component list is
deleted.

Requirements:
|     | .\custom\userexit\mle_convfield_in.hsc:  |     |     |     | V8.1.1.64407  |     |
| --- | ---------------------------------------- | --- | --- | --- | ------------- | --- |

|     | MLE version:  |     |     |     | HY72_031  |     |
| --- | ------------- | --- | --- | --- | --------- | --- |
Preventing the call for deletion records
Use an INI entry if you do not want to request additional data for deletion records:
| Parameter name  |     |     | Value               |     |             |     |
| --------------- | --- | --- | ------------------- | --- | ----------- | --- |
| INI name        |     |     | SAP                 |     |             |     |
| Section         |     |     | REQUEST_DELETED_OP  |     |             |     |
| Key             |     |     | PPCC2RECORDER       |     | for PP-PDC  |     |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 28 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Parameter name  |     |     | Value    |            |     |
| --------------- | --- | --- | -------- | ---------- | --- |
|                 |     |     | OPERA3   |   for KK3  |     |
|                 |     |     | OPERA4   |   for KK4  |     |
| Value           |     |     | Y  yes  |            |     |
N  no
| Active   |     |     | Yes                                      |     |     |
| -------- | --- | --- | ---------------------------------------- | --- | --- |
| Comment  |     |     | No additional data for deletion records  |     |     |

Requirements:

|     | hysapinf.exe/out:  |     |     |   V8.1.1.41  |     |
| --- | ------------------ | --- | --- | ------------ | --- |

Preventing the transfer of overdelivery/underdelivery details from record
type "AV"
Configure the HYDRA INI configuration to prevent the overdelivery/underdelivery information from the
record type "AV" from being transferred:
| Parameter name  |     |     | Value                          |     |     |
| --------------- | --- | --- | ------------------------------ | --- | --- |
| INI name        |     |     | SAP                            |     |     |
| Section         |     |     | HYINFO_AV                      |     |     |
| Key             |     |     | USE_OVER_UNDER_DELIVERY_CHECK  |     |     |
| Value           |     |     | Y  yes (set by default)       |     |     |
N  no
| Active   |     |     | Yes        |                             |             |
| -------- | --- | --- | ---------- | --------------------------- | ----------- |
| Comment  |     |     | Transfers  | overdelivery/underdelivery  | data  from  |
the HYINFO AV segment

| SAP-ISS_30.docx  |     | Version: 1.1.22714  |     |     | Page 29 of 32  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

HYDRA Information Interface for SAP PP
If you use the information interface for SAP PP, you cannot use BAPINOUPDATE for the fields
of the following record types:
 Order header data (AK)
 User fields for the header/ operation (AU)
 Operation data (AV)
 Additional texts for the operation (AI)
 Component list (AM)
 Production resources and tools (AF)
 Documents (AC)
Activating the transfer of dialog data strings
Use the following program parameter to activate the transfer of dialog data strings via the HYINFO
module in the ZPP_HYBAPI structure when calling the executing program in the script hysapinf.scr:
Call prior to the change (example for Windows):
$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7
Call after the change (example for Windows):
$HY_PATH/hysapinf.exe /Z2BAPI000=ADD $1 $2 $3 $4 $5 $6 $7
Requirements:
hysapinf.exe/out: V8.1.1.43
Changing the name of the function module Z_PP_HYINFO_GET
If you cannot use the name of the HYINFO function module given by MPDV (e.g. as internal naming
conventions prevent it), you can change this name. To do so, use the following program parameter when
calling the executing program in the script hysapinf.scr:
Call prior to the change (example for Windows):
$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7
Call after the change (example for Windows):
$HY_PATH/hysapinf.exe /HYINFO_GET=<New Name> $1 $2 $3 $4 $5 $6 $7
SAP-ISS_30.docx Version: 1.1.22714 Page 30 of 32

HYDRA Information Interface for SAP PP
Changing the name of the table ZPP_HYINFO
If you cannot use the name of the ZPP_HYINFO table given by MPDV (e.g. as internal naming
conventions prevent it), you can change this name. To do so, use the following program parameter when
calling the executing program in the script hysapinf.scr:
Call prior to the change (example for Windows):
$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7
Call after the change (example for Windows):
$HY_PATH/hysapinf.exe /HYINFO_ITAB=<New Name> $1 $2 $3 $4 $5 $6 $7
Changing the name of the table ZPP_HYBAPI
If you cannot use the name of the ZPP_HYBAPI table given by MPDV (e.g. as internal naming
conventions prevent it), you can change this name. To do so, use the following program parameter when
calling the executing program in the script hysapinf.scr:
Call prior to the change (example for Windows):
$HY_PATH/hysapinf.exe /TL=TRL_ALL $1 $2 $3 $4 $5 $6 $7
Call after the change (example for Windows):
$HY_PATH/hysapinf.exe /Z2BAPI_ITAB=<New Name> $1 $2 $3 $4 $5 $6 $7
Prevent processing of OPs until HYINFO is processed
Add the following entry to the HYDRA INI configuration if you want to lock operations until the original
data and additional data have been imported completely from the HYINFO module
(MBL_SAP_Implementation_HYINFO_FB).
Parameter name Value
INI name SAP
Section E2BP_PP_PDC_OPERA2000
Key SET_OPS_TO_BLOCKED
Value Y  yes
Active Yes
SAP-ISS_30.docx Version: 1.1.22714 Page 31 of 32

|     |     |     |     |     | HYDRA Information Interface for SAP PP  |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- |

| Parameter name  |     |     |     | Value                                      |     |     |
| --------------- | --- | --- | --- | ------------------------------------------ | --- | --- |
| Comment         |     |     |     | Locks OPs until HYINFO has been processed  |     |     |

Requirements:
This function requires service pack 14 (or higher) or installation of an update package. The
update package must include the following software components:
|     | hymw.exe/out:           |     |     |     | V8.1.1.646     |     |
| --- | ----------------------- | --- | --- | --- | -------------- | --- |
|     |   hyerror.msg/en        |     |     |     | V8.1.1.646     |     |
|     | lib\b_anr.dll/so        |     |     |     | V8.1.1.356     |     |
|     | MLE version             |     |     |     | HY72_034       |     |
|     | MOC Language Resources  |     |     |     | 1.0.STD.66720  |     |

| SAP-ISS_30.docx  |     |     | Version: 1.1.22714  |     |     | Page 32 of 32  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |