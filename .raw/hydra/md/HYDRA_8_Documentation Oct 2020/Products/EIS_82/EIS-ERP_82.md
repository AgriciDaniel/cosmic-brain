Manual
ERP Interface with Additional
Data
EIS-ERP 8.2
Version 1.3.23503
Last changed on: 02.10.2020

ERP Interface with Additional Data
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EIS-ERP_82.docx Version: 1.3.23503 Page 2 of 64

ERP Interface with Additional Data
Contents
1 MF Schnittstelle MES <=> ERP ................................................................... 4
2 Setup of Data Record Structure ................................................................... 6
3 Data type definitions ..................................................................................... 7
4 Key Fields / Supported Characters .............................................................. 9
5 Order Data ERP --> HYDRA ...................................................................... 12
6 Uploading data types: HYDRA --> ERP ..................................................... 42
7 Operation-related Uploads HYDRA => ERP .............................................. 43
8 Inbound Transactions ................................................................................. 48
9 Outbound Transactions .............................................................................. 53
10 Protecting fields of planned operations ...................................................... 58
11 Modification to the Order of Uploads ......................................................... 62
12 Test Files .................................................................................................... 64
EIS-ERP_82.docx Version: 1.3.23503 Page 3 of 64

ERP Interface with Additional Data
1 MF Schnittstelle MES <=> ERP
Use options
The EIS-ERP interface is used to connect MES systems to superior ERP systems.
This covers the following general requirements:
 Default interface for the adoption of order sequencing data from the ERP system and
confirmation/upload of recorded postings in the production.
 Rollout-capable solution.
 Close interfacing of HYDRA and PPS in order to account for the increasing sensitivity of the
integrated solution.
 Maintenance options and administration of the interface.
This document describes the principles of the data exchange on the logical level and the system
components that are required to this end. In addition, it offers a detailed overview of the interface's
structure.
Implementation notes
Use the interface if
 you wish to automate the exchange of order and operation data between ERP and MES;
 you wish to automate the exchange of confirmations recorded in the MES to the ERP.
Integration
The interface constitutes the basis for the orders and operations administered in BDE.
And the data recorded in the BDE/shop floor data collection module in turn, constitute the basis for the
confirmation/upload to the ERP system.
Scope of functions
 Transfer of order data
o Interface enabling the communication between HYDRA and ERP/ PPS systems or
external control stations/shop floor scheduling systems.
EIS-ERP_82.docx Version: 1.3.23503 Page 4 of 64

ERP Interface with Additional Data
o Used to interface HYDRA with SAP R/3 PP, Baan IV, Baan ERP, ProAlpha, M-Suite
(Soft-M), Brain XPPS, Brain AS, Oracle, PSI PENTA, Navision, ABAS ERP, SYS APS,
Infor, IFR ERP, MS-Business Solutions, Axapta, MAPICS, MAS90, Orgaplan, FOSS
(ORDAT), I/OPEN, FORS (Atos), DIALOG TOTAL, DTM / KIAS, Siline, IFAI / DIAFERT,
MAN/X, FRIDA Command, IFAX Open, Compu Orga, JDE5 (J.D. Edwards), COMET,
Bäurer b2 and much more
o Adoption of released orders and operations
 Transfer of operation confirmations/uploads
o Confirmation/upload of the collected actual times and quantities referred to transactions/
time tickets
 Transfer of additional data
o Extension of additional information from ERP
o Adoption of component data, production resources and tools and document links to the
operation
o Adoption of long texts about the order header and operation
o Adoption of customer-specific fields referring to the order header and to the operation
 Monitoring
o Comfortable monitoring and logging functions for the data transfer between HYDRA and
the external systems
EIS-ERP_82.docx Version: 1.3.23503 Page 5 of 64

ERP Interface with Additional Data
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
EIS-ERP_82.docx Version: 1.3.23503 Page 6 of 64

ERP Interface with Additional Data
3 Data type definitions

Type Description
CHAR x The information is left-aligned for the data type CHAR; unnecessary places are filled with
blanks (blanks - (U+0020)).
If a field is not used, fill it in full length with blanks.
Example: "ABCD "
NUM x Numeric field of the length x without sign. The NUMC data type only supports digits (ASCII
characters 30 hex to 39 hex and/or U+0030 – U+0039). Numbers are right-aligned;
unnecessary places are filled with zeros (U+0030).
If a field is not used, fill it in full length with zeros.
Example: "00000002"
DEC x.y Numeric field of the length x and y decimal places. A data field in HYDRA format is
preceded by a sign ("+" or "-") and includes a decimal point. Enter zeros to fill empty
QUAN x.y
places.
If a field is not used, fill it in full length with zeros (U+0030) including sign and decimal
separator.
e.g. DEC 13,3:
 -1234567890,123  -1234567890.123
 234567890,3  +0234567890.300
Note:
The field length is indicated WITHOUT algebraic sign and WITHOUT decimal point in the
tabular description of the structure. For example: a QUAN 13.3 field results in an external
length of CHAR15.
DATE Dates must be transferred in the HYDRA format MM/DD/YYYY.
Populate unused date fields with blanks (U+0020; zero(s) (U+0030) not accepted).
TIME Times must be transferred in the HYDRA format seconds after midnight (0 - 86400).
For all alphanumeric fields, HYDRA does not support specific special characters. These
characters are: "\“ (backslash - U+005B), "|“ (pipe - U+007C), „ “ “ (double quote - U+0022), and
„ ’ “ (single quote - U+0027). You cannot enter these characters using the shop floor terminals;
EIS-ERP_82.docx Version: 1.3.23503 Page 7 of 64

ERP Interface with Additional Data
the terminals and the MOC do not support these characters.
The character " ; “ (semicolon - U+003B) is used as separator for data collection. You must not
use this character in key fields (e.g. order, batch number, personnel number, etc.).
The character " % “ (percent - U+0025) is used as placeholder/wildcard character for database
queries. For this reason, you should avoid using this character as it might falsify results.
In general, you must not use special characters ranging from U+0000 to U+001F. Exception:
U+000A and U+000D as end-of-line characters.
The file must not include Byte Order Mark (BOM).
In general, HYDRA always expects a contiguous data structure. Consequently, you have to populate
unused data fields with such default values that comply with the applicable conventions. This also applies
to fields that are not required at the end of a data structure. The following definitions apply if you use the
file port:
Each data record included in the file has to be completed by 'CR' (U+000D) und 'LF' (U+000A) for
Windows and 'LF' (U+000A) for Unix.
HYDRA expects the file to be in the UTF-8 format and HYDRA also uses this format for uploads. On
request, you can also transfer files in the file format that was used until MW 2.x.
EIS-ERP_82.docx Version: 1.3.23503 Page 8 of 64

ERP Interface with Additional Data
4 Key Fields / Supported Characters
General notes
In all alphanumeric fields, HYDRA does not support specific special characters. The following characters
are not supported: "%", "ß","*", "\", "/", "|", "_", "?". Reason: You cannot enter these characters on the
shop floor terminals or the clients do not support these characters.
You must not use the characters " ; " (semicolon), " , " (comma) and " ' " (apostrophe) because they are
often interpreted as comment characters or separators and can lead to unwanted results.
Workplace/machine numbers (resources of type "MNR")
Workplace/machine numbers and numbers of capacity/machine groups are interpreted as alphanumeric
values. Alphanumeric field with a maximum length of 8, left-aligned.
When you create or copy a workplace, the system checks if the characters used are allowed. The
following characters are allowed:
 Numbers "0" to "9" (US-ASCII 30 - 39 )
hex hex
 Letters "A" - "Z" (upper case letters - US-ASCII 41 - 5A )
hex hex
 "-" (US-ASCII 2D )
hex
Lower case letters are automatically converted to upper case letters when a new workplace is created.
You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").
The entry "SYSTEM" as workplace/machine number is reserved for HYDRA and may not be used.
It is possible to overwrite the valid characters for the workplace/machine numbers in the INI configuration.
To this end, you must specify the valid characters as a regular expression (in brackets).
Field Value
Name INPUT
Section PATTERN
Key MNR
Value ^(?!SYSTEM)([A-Z0-9(){}~^#+!$._%-]+)$
Active 
Minimum requirement: b_mnr.dll version 8.1.1.102
EIS-ERP_82.docx Version: 1.3.23503 Page 9 of 64

ERP Interface with Additional Data
Resource numbers (resources of type <> "MNR")
Resource numbers are interpreted as alphanumeric values. Alphanumeric field with a maximum length of
20; left-aligned.
When you create or copy a resource, the system checks if the characters used are allowed. The following
characters are allowed:
 Numbers "0" to "9" (US-ASCII 30 - 39 )
hex hex
 Letters "A" - "Z" (upper case letters - US-ASCII 41 - 5A )
hex hex
 Umlauts "Ä", "Ö", "Ü" (Extended ASCII C4 , D6 , DC )
hex hex hex
 "-" (US-ASCII 2D )
hex
You may not use umlauts or special characters (e.g. "%", "ß","*", "\", "/", "|", "_", "?") because you cannot
enter these characters on the shop floor terminals or because the clients do not support these characters.
You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").
Lower case letters are automatically converted to upper case letters when a new resource is created.
It is possible to overwrite the valid characters for the resource numbers in the INI configuration. To this
end, you must specify the valid characters as a regular expression (in brackets).
Field Value
Name INPUT
Section PATTERN
Key RES
Value ^([0-9A-ZÄÖÜ(){}~^#+!$._%-]+)$
Active 
Minimum requirement: b_res.dll version 8.1.1.117
HYDRA order number
There are some differences with respect to the order number in the HYDRA data model and the interface.
Order number
The order number (field AUNR) contains the actual order number as it is known in the ERP system
and transferred to HYDRA. The order number is specified in the HYDRA basic settings; by default,
this number has a length of 8 characters.
Operation number
The operation number (field AGNR) clearly identifies a defined process step of an order. The
operation number is specified in the HYDRA basic settings; by default, this number has a length of
4 characters.
EIS-ERP_82.docx Version: 1.3.23503 Page 10 of 64

ERP Interface with Additional Data
MES order number
The MES order number (field ANR) combines the order and the operation number and sometimes
also the sequence number from the ERP system (if licensed). Its length therefore results from the
total of the separate number lengths.
The total length must not exceed 25 digits. If DOS terminals are used, the total length must not
exceed 16 digits.
Note the following for the order or operation number:
 Preferably only use the numbers "0" to "9" (US-ASCII 30 - 39 ).
hex hex
 If you use letters, only the characters "A" - "Z" (upper case - US-ASCII 41 - 5A ) and "-" (US-
hex hex
ASCII 2D ) are allowed. Do not use lower case letters.
hex
 You may not use blanks in the numbers. The order or operation numbers must have the specified
number of digits with the characters "0" to "9" or "A" to "Z". If required, you must prefix the
numbers by leading zeros ("0").
 HYDRA does not support any umlauts, blank or special characters (see section General notes) for
the order or operation number because you cannot enter these characters on the shop floor
terminals or because the clients do not support these characters.
EIS-ERP_82.docx Version: 1.3.23503 Page 11 of 64

ERP Interface with Additional Data
5 Order Data ERP --> HYDRA
Data transfer process
Data of the ERP system is provided in a file that must be available in a defined directory of the HYDRA
server. The configuration is made in the application "Logical Systems". You can combine the data
transferred from the ERP system to HYDRA in one file to create/change data or to delete data. HYDRA
uses the segment name of a data record (one line in the file) to identify if the respective data record must
be added/updated (suffix "_A" for segment name) or if it must be deleted (suffix "_D" for segment name).
HYDRA processes the contents of the file sequentially top down. The higher a data record is placed in the
file, the earlier it will be processed in HYDRA. This ensures that the file can be created in the
chronologically correct order in the ERP system.
HYDRA 8 still supports but no longer improves the HYDRA 7 option ("compatibility mode") of
transferring data to be created/changed and data to be deleted in separate files using different
file extensions.
Create/change data
The interface transferring production orders bundles all data relevant to HYDRA in an IDOC and sends
this data to HYDRA using the message function (= file extension) "DAT".
Make sure to transfer the data in a specific order, when transferring order data from the ERP system to
HYDRA for the first time. This means that the order data described in the following sections must be
transferred to HYDRA in the specified sequence/hierarchy. Within a transfer level, you are free to specify
any sequence, e.g. you can transfer operation 0200 before operation 0100.
By default, you are not allowed to change operations with the status "running", "finished" or "deleted".
In general, HYDRA always expects a consistent data structure. This means: If a data field is not used, the
predefined default value is assigned.
An operation in status "finished" is set to status "interrupted" when the operation is transferred
again (update), if the following conditions are fulfilled:
 The operation has been deleted via ERP interface.
 The operation status set at the time of "delete": For this status, the action "delete" was
configured in the order status configuration with "E" or "X".
 The operation is still in the online data set when transferred again (update).
EIS-ERP_82.docx Version: 1.3.23503 Page 12 of 64

ERP Interface with Additional Data
If one of the conditions is not fulfilled, then an operation in status "finished" is not set to status
"interrupted" when transferred again (update). The above also applies if the operation has been
logged off via posting functionality (e.g. operation logoff).
Delete data
If entire orders are deleted in the ERP system, an IDOC is generated and sent to HYDRA using the
message function (= file extension) "DAT". The data to be deleted must be transferred in the following
order:
 Long texts of the operation
 Documents
 Production resources and tools
 Components
 Operation
When the last operation of an order is deleted via the interface , the order header is also deleted
automatically1.
If the ERP system transfers the deletion of an order header, all operations and the included data are
deleted.
For deletion, it is sufficient to just indicate the respective key fields in the segment.
You cannot delete operations assigned to the operation statuses Running, Interrupted, Finished or
Deleted.
You can neither delete operations that are split or part of a merged operation.
Data record definition
Order-related data is transferred for each production order in a multi-level IDOC. This IDOC structure is
as follows:
1 If the last operation of an order is deleted via the MOC, the order header is not automatically deleted.
EIS-ERP_82.docx Version: 1.3.23503 Page 13 of 64

|     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | ----------------------------------- | --- |

The structures that belong to the individual segments are presented in the following. The individual
columns have the following meaning:
| Column  | Description        |     |     |     |
| ------- | ------------------ | --- | --- | --- |
| Field   | Name of the field  |     |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be populated.
M  Mandatory field which must be populated with a valid value.
ML  Mandatory field if the HYDRA Shop Floor Scheduling is used (HLS).
MM  Mandatory field if the HYDRA Material and Production Logistics (MPL and/or MPL/RF) is
used.
K  Field may stay empty (optional field).
SA  Mandatory field if the Arburg control system (SCS-ALS) is in use; otherwise optional field.
| T(ype)    | Data type of the field  |     |     |     |
| --------- | ----------------------- | --- | --- | --- |
| L(ength)  | Field length            |     |     |     |
For fields of data type DEC: Total number of digits without decimal separator and algebraic sign.
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description   | Field description and/or comments on the field.  |     |     |     |
| ------------- | ------------------------------------------------ | --- | --- | --- |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     | Page 14 of 64  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

Segments to create/modify data
The following specifications arise for the IDOC:
| Message type /  |             |          |     |     |     |
| --------------- | ----------- | -------- | --- | --- | --- |
| file name:      |             | HY72PPS  |     |     |     |
| Message         | functions/  | DAT2     |     |     |     |
file extensions:
| Segments:  |     | HY72_AU_HD_001_A (order header)  |     |     |     |
| ---------- | --- | -------------------------------- | --- | --- | --- |
├ HY72_AU_INFO_AI_001_A (long texts)
├ HY72_AU_USRFLD_001_A (user fields)
├ HY72_AG_HD_001_A (operation data – part 1)
│    ├ HY72_AG_HD_002_A (operation data – part 2)
│    ├ HY72_AG_KOMPL_001_A (component list)
│    │     └ HY72_AG_KOMPL_USRFLD_001_A (comp. user fields)
│    ├ HY72_AG_FHM_001_A (PRT / resources)
│    ├ HY72_AG_DOC_001_A (documents)
│    ├ HY72_AG_INFO_AI_001_A (long texts)
│    ├ HY72_AG_USRFLD_001_A (user fields)
│    └ HY72_AG_RF_001_A  (MPL  for  data  specific  to  coil-based
manufacturing)
└ HY72_FERTVAR_001_A (production variants)

Segments to delete data
The following specifications arise for the IDOC:
| Message type /  |             |          |     |     |     |
| --------------- | ----------- | -------- | --- | --- | --- |
| file name:      |             | HY72PPS  |     |     |     |
| Message         | functions/  | DAT      |     |     |     |
file extensions:
| Segments:  |     | HY72_AU_HD_001_D (order header)  |     |     |     |
| ---------- | --- | -------------------------------- | --- | --- | --- |
 ├ HY72_AU_INFO_AI_001_D (long texts)
 └ HY72_AG_HD_001_D (operation data)
      ├ HY72_AG_KOMPL_001_D (component list)
      ├ HY72_AG_FHM_001_D (PRT / resources)
       ├ HY72_AG_DOC_001_D (documents)
      └ HY72_AG_INFO_AI_001_D (long texts)

Order header

2 HYDRA inbound processing discards the file extension "DAT" (importing the file and storage in MLE inbound
transactions). The MLE inbound transactions display a data record of such a file without message function.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 15 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Segment name:  |     |     | HY72_AU_HD_001_A  |     |     |
| -------------- | --- | --- | ----------------- | --- | --- |
HY72_AU_HD_001_D

The order header includes the header data for the production order.
| Field  | V  T  | L  D  Description   |     |     | Fro To4  |
| ------ | ----- | ------------------- | --- | --- | -------- |
m3
| AUNR   | S  CHAR  | 40    Order number  |     |     | 1  40   |
| ------ | -------- | ------------------- | --- | --- | ------- |
| AUART  | M  CHAR  | 5    Order type     |     |     | 41  45  |
HYDRA order type (see note)
| ATK  | M  CHAR  | 40    Article;   |     |     | 46  85  |
| ---- | -------- | ---------------- | --- | --- | ------- |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ  | K  CHAR  | 40    Article designation  |     |     | 86  125   |
| ------- | -------- | -------------------------- | --- | --- | --------- |
| KDBEZ   | K  CHAR  | 40    Customer name        |     |     | 126  165  |
| KDAUNR  | K  CHAR  | 25    Sales order          |     |     | 166  190  |
Note: Using the MOC, you can only edit up to 20
digits/characters.
| KDAUPOS  | K  CHAR  | 15    Sales order item   |     |     | 191  205  |
| -------- | -------- | ------------------------ | --- | --- | --------- |
| EXTPRIO  | K  CHAR  | 1    Priority            |     |     | 206  206  |
AUIDX  K  DEC  4  2  Order index should be 0 (transfer: "+00.00")  207  212
Please note: Make sure to add a sign and a decimal point
to the length specified here. This applies to all following
fields of the DEC data type
SGE:B  M  CHAR  3    Base quantity unit = quantity unit of the order header  213  215
This quantity unit will be used for operations.
SGR:GUTB  M  DEC  13  3  Target quantity (base quantity unit)  216  230
SGR:AUSB  K  DEC  13  3  Target scrap quantity (base quantity unit)  231  245
MATTYP  K  CHAR  10    Material type of the article  246  255
If HYDRA MPL is used, enter a valid material type
configured in HYDRA.
otherwise: "SYSTEM"
| FILLER  | K  CHAR  | 10    reserved; should be empty  |     |     | 256  265  |
| ------- | -------- | -------------------------------- | --- | --- | --------- |
| CNR     | K  CHAR  | 20    Batch number               |     |     | 266  285  |
PCNR  K  CHAR  20    Inspection order/inspection batch number  286  305
| PPKTTYP  | K  CHAR   | 1    Sample type             |     |     | 306  306  |
| -------- | --------- | ---------------------------- | --- | --- | --------- |
| DATFB    | ML  DATE  | 10    Earliest start (date)  |     |     | 307  316  |
| ZEIFB    | ML  TIME  | 5    Earliest start (time)   |     |     | 317  321  |
| DATSE    | ML  DATE  | 10    Latest end (date)      |     |     | 322  331  |
| ZEISE    | ML  TIME  | 5    Latest end (time)       |     |     | 332  336  |

3 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
4 See footnote of column "From“

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 16 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D  Description   |     |     | Fro To4  |
| ------ | ----- | ------------------- | --- | --- | -------- |
m3
DATTERMB  K  DATE  10    Scheduled start (date)  If scheduling is run outside  337  346
HYDRA, the scheduled
ZEITERMB  K  TIME  5    Scheduled start (time)  dates of the order (header)  347  351
should be transferred.
| DATTERME  | K  DATE  | 10    Scheduled end (date)  |     |     | 352  361  |
| --------- | -------- | --------------------------- | --- | --- | --------- |
Note: For the processing,
these dates are only used
ZEITERME  K  TIME  5    Scheduled end (time)  for information purposes in  362  366
HYDRA.
If scheduling is performed
in HYDRA, these fields are
overwritten.
TERMART  K  CHAR  1    Scheduling type; mandatory field if scheduling is to be  367  367
made in HYDRA.
(V=forward scheduling, R=backward scheduling)
REDSTRAT  K  CHAR  2    Reduction strategy, according to configuration.  368  369
| AUGRP        | K  CHAR  | 4    Order group               |     |     | 370  373  |
| ------------ | -------- | ------------------------------ | --- | --- | --------- |
| DISP         | K  CHAR  | 10    MRP controller           |     |     | 374  383  |
| PRJNR        | K  CHAR  | 25    Project number           |     |     | 384  408  |
| PLANAUNR     | K  CHAR  | 25    Planned order            |     |     | 409  433  |
| KTR          | K  CHAR  | 25    Cost object              |     |     | 434  458  |
| APNR         | K  CHAR  | 40    Work plan                |     |     | 459  498  |
| APVER        | K  CHAR  | 12    Work plan version        |     |     | 499  510  |
| SLVER        | K  CHAR  | 12    BOM version              |     |     | 511  522  |
| KLKK:MNR     | K  DEC   | 13  3  Calc. costs - machines  |     |     | 523  537  |
| KLKK:L       | K  DEC   | 13  3  Calc. costs - payroll   |     |     | 538  552  |
| KLKK:MAT     | K  DEC   | 13  3  Calc. costs - material  |     |     | 553  567  |
| KLKK:SONST   | K  DEC   | 13  3  Calc. costs - other     |     |     | 568  582  |
| MATWERT:GUT  | K  DEC   | 13  3  Material value          |     |     | 583  597  |
| MATWERT:AUS  | K  DEC   | 13  3  Scrap value             |     |     | 598  612  |
ANR.KBN:LBEZID  K  CHAR  15    eKANBAN control cycle  613  627
This field is available as of the MLE variant HY72PPS_018
ATKIDX  K  CHAR  50    Order information  Order header (AK)  Drawing issue  628  677
number
This field is available as of BDE82 and MLE version
HY72PPS_023.

In HYDRA the order type controls the global behavior of an order. The entered order type must
exist in HYDRA and be entirely configured.

Long texts of the order header

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 17 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Segment name:  |     |     | HY72_AU_INFO_AI_001_A  |     |     |
| -------------- | --- | --- | ---------------------- | --- | --- |
HY72_AU_INFO_AI_001_D

Use the following structure to transfer text fields as additional information to the order(header) to HYDRA.
The MOC will then show this additional information. Each data record contains one page of a maximum of
10 lines and 80 characters of text information each.
The long text of the order header is shown in the MOC application "edit orders".
| Field  | V  T     | L  D Description                    |     |     |     |
| ------ | -------- | ----------------------------------- | --- | --- | --- |
| KEY    | S  CHAR  | 40    Order number (AUNR)           |     |     |     |
| TYP    | S  CHAR  | 2    Record type; by default: "AI"  |     |     |     |
SUBKEY:1  S  NUM  8    Reserved; assign "00000000" by default.
SUBKEY:2  M  NUM  8    Consecutive numbering within the key starting at "00000001".
INFO:BEZ  K  CHAR  20    Short text; if empty, the first 20 digits/characters of Info text 1 will
be used.
| INFO:1   | K  CHAR  | 80    Info text 1   |     |     |     |
| -------- | -------- | ------------------- | --- | --- | --- |
| INFO:2   | K  CHAR  | 80    Info text 2   |     |     |     |
| INFO:3   | K  CHAR  | 80    Info text 3   |     |     |     |
| INFO:4   | K  CHAR  | 80    Info text 4   |     |     |     |
| INFO:5   | K  CHAR  | 80    Info text 5   |     |     |     |
| INFO:6   | K  CHAR  | 80    Info text 6   |     |     |     |
| INFO:7   | K  CHAR  | 80    Info text 7   |     |     |     |
| INFO:8   | K  CHAR  | 80    Info text 8   |     |     |     |
| INFO:9   | K  CHAR  | 80    Info text 9   |     |     |     |
| INFO:10  | K  CHAR  | 80    Info text 10  |     |     |     |

User fields of the order header
| Segment name:  |     |     | HY72_AU_USRFLD_001_A  |     |     |
| -------------- | --- | --- | --------------------- | --- | --- |

Apart from the fields that are available by default, you can use user fields to store further customer-
specific information to HYDRA. Use this segment to transfer this data from the ERP system to HYDRA
and to store this data in the order(header).
The so-called user field key specifies the available user fields and their meaning. Each user field key
describes a combination of user fields. The document Configuration_Userfields.pdf describes how to
configure the user field key.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 18 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

To allow for a consistent data exchange between the ERP system and HYDRA, the customer
must ensure that the user field keys are identical in both systems.

| Field  | V  T     | L  D Description    |     |     | From5T o6  |
| ------ | -------- | ------------------- | --- | --- | ---------- |
| AUNR   | S  CHAR  | 40    Order number  |     |     | 1  40      |
USRFLD  S  CHAR  8    User field key. The user field key must be configured in the
41  48
system.
| FU:1   | K  DATE  | 10    User field 1    |     |     | 49  58    |
| ------ | -------- | --------------------- | --- | --- | --------- |
| FU:2   | K  DATE  | 10    User field 2    |     |     | 59  68    |
| FU:3   | K  DATE  | 10    User field 3    |     |     | 69  78    |
| FU:4   | K  DATE  | 10    User field 4    |     |     | 79  88    |
| FU:5   | K  DATE  | 10    User field 5    |     |     | 89  98    |
| FU:6   | K  DATE  | 10    User field 6    |     |     | 99  108   |
| FU:7   | K  NUM   | 8    User field 7     |     |     | 109  116  |
| FU:8   | K  NUM   | 8    User field 8     |     |     | 117  124  |
| FU:9   | K  NUM   | 8    User field 9     |     |     | 125  132  |
| FU:10  | K  NUM   | 8    User field 10    |     |     | 133  140  |
| FU:11  | K  NUM   | 8    User field 11    |     |     | 141  148  |
| FU:12  | K  NUM   | 8    User field 12    |     |     | 149  156  |
| FU:13  | K  NUM   | 8    User field 13    |     |     | 157  164  |
| FU:14  | K  NUM   | 8    User field 14    |     |     | 165  172  |
| FU:15  | K  NUM   | 8    User field 15    |     |     | 173  180  |
| FU:16  | K  NUM   | 8    User field 16    |     |     | 181  188  |
| FU:17  | K  NUM   | 8    User field 17    |     |     | 189  196  |
| FU:18  | K  NUM   | 8    User field 18    |     |     | 197  204  |
| FU:19  | K  NUM   | 8    User field 19    |     |     | 205  212  |
| FU:20  | K  NUM   | 8    User field 20    |     |     | 213  220  |
| FU:21  | K  NUM   | 8    User field 21    |     |     | 221  228  |
| FU:22  | K  NUM   | 8    User field 22    |     |     | 229  236  |
| FU:23  | K  DEC   | 13  3  User field 23  |     |     | 237  251  |
| FU:24  | K  DEC   | 13  3  User field 24  |     |     | 252  266  |

5 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
6 See footnote of column "From“

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 19 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T     | L  D Description      |     |     | From5T o6  |
| ------ | -------- | --------------------- | --- | --- | ---------- |
| FU:25  | K  DEC   | 13  3  User field 25  |     |     | 267  281   |
| FU:26  | K  DEC   | 13  3  User field 26  |     |     | 282  296   |
| FU:27  | K  DEC   | 13  3  User field 27  |     |     | 297  311   |
| FU:28  | K  DEC   | 13  3  User field 28  |     |     | 312  326   |
| FU:29  | K  CHAR  | 1    User field 29    |     |     | 327  327   |
| FU:30  | K  CHAR  | 1    User field 30    |     |     | 328  328   |
| FU:31  | K  CHAR  | 1    User field 31    |     |     | 329  329   |
| FU:32  | K  CHAR  | 1    User field 32    |     |     | 330  330   |
| FU:33  | K  CHAR  | 1    User field 33    |     |     | 331  331   |
| FU:34  | K  CHAR  | 1    User field 34    |     |     | 332  332   |
| FU:35  | K  CHAR  | 1    User field 35    |     |     | 333  333   |
| FU:36  | K  CHAR  | 1    User field 36    |     |     | 334  334   |
| FU:37  | K  CHAR  | 1    User field 37    |     |     | 335  335   |
| FU:38  | K  CHAR  | 1    User field 38    |     |     | 336  336   |
| FU:39  | K  CHAR  | 1    User field 39    |     |     | 337  337   |
| FU:40  | K  CHAR  | 1    User field 40    |     |     | 338  338   |
| FU:41  | K  CHAR  | 1    User field 41    |     |     | 339  339   |
| FU:42  | K  CHAR  | 1    User field 42    |     |     | 340  340   |
| FU:43  | K  CHAR  | 1    User field 43    |     |     | 341  341   |
| FU:44  | K  CHAR  | 1    User field 44    |     |     | 342  342   |
| FU:45  | K  CHAR  | 10    User field 45   |     |     | 343  352   |
| FU:46  | K  CHAR  | 10    User field 46   |     |     | 353  362   |
| FU:47  | K  CHAR  | 10    User field 47   |     |     | 363  372   |
| FU:48  | K  CHAR  | 10    User field 48   |     |     | 373  382   |
| FU:49  | K  CHAR  | 10    User field 49   |     |     | 383  392   |
| FU:50  | K  CHAR  | 10    User field 50   |     |     | 393  402   |
| FU:51  | K  CHAR  | 20    User field 51   |     |     | 403  422   |
| FU:52  | K  CHAR  | 20    User field 52   |     |     | 423  442   |
| FU:53  | K  CHAR  | 20    User field 53   |     |     | 443  462   |
| FU:54  | K  CHAR  | 20    User field 54   |     |     | 463  482   |
| FU:55  | K  CHAR  | 20    User field 55   |     |     | 483  502   |
| FU:56  | K  CHAR  | 20    User field 56   |     |     | 503  522   |
| FU:57  | K  CHAR  | 20    User field 57   |     |     | 523  542   |
| FU:58  | K  CHAR  | 20    User field 58   |     |     | 543  562   |
| FU:59  | K  CHAR  | 20    User field 59   |     |     | 563  582   |
| FU:60  | K  CHAR  | 20    User field 60   |     |     | 583  602   |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 20 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T     | L  D Description     |     |     | From5T o6  |
| ------ | -------- | -------------------- | --- | --- | ---------- |
| FU:61  | K  CHAR  | 20    User field 61  |     |     | 603  622   |
| FU:62  | K  CHAR  | 20    User field 62  |     |     | 623  642   |
| FU:63  | K  CHAR  | 20    User field 63  |     |     | 643  662   |
| FU:64  | K  CHAR  | 20    User field 64  |     |     | 663  682   |
| FU:65  | K  CHAR  | 40    User field 65  |     |     | 683  722   |
| FU:66  | K  CHAR  | 40    User field 66  |     |     | 723  762   |
Note
This data structure is only available with the respective license.

Order sequences
| Segment name:  |     |     | HY72_AFOLG_001_A  |     |     |
| -------------- | --- | --- | ----------------- | --- | --- |
HY72_AFOLG_001_D

Only use this segment to transfer data if sequences are in use. This specification is made as part of the
customer project.
| Field  | V  T     | L  D Description             |     |     |     |
| ------ | -------- | ---------------------------- | --- | --- | --- |
| AUNR   | S  CHAR  | 40    Order number           |     |     |     |
| AFOLG  | S  CHAR  | 6    Number of the sequence  |     |     |     |
Number of the sequence. Length as configured in the HYDRA basic settings,
left-aligned including leading zeros.
Sequence type "S": must be 0
Sequence type "P", "A": sequence number
| FOLGART  | S  CHAR  | 1    Sequence type:    |     |     |     |
| -------- | -------- | ---------------------- | --- | --- | --- |
|          |          | S = master sequence    |     |     |     |
|          |          | P = parallel sequence  |     |     |     |
A = alternative sequence
AKTIV  M  CHAR  1    Active; with alternative sequences J/N; otherwise always J
BEZK  K  CHAR  40    Short text/description of the sequence: comment field
VER  K  CHAR  12    Version; comment field; not processed in HYDRA
| BZGFOLG  | M  CHAR  | 10    Reference sequence.   |     |     |     |
| -------- | -------- | --------------------------- | --- | --- | --- |
Number of the reference sequence this sequence refers to. Length as
configured in the HYDRA basic settings, left-aligned including leading zeros.
Sequence type "S": leave empty
Sequence type "A", "P": must always be 0.
ANRA  M  CHAR  40    Branch operation of the reference sequence; combined HYDRA order number
Sequence type "S": leave empty
ANRR  M  CHAR  40    Return OP of the reference sequence; combined HYDRA order number
Sequence type "S": leave empty

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 21 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

ERP Interface with Additional Data
Operations – part 1
Segment name: HY72_AG_HD_001_A
HY72_AG_HD_001_D
The operation segment includes the operation-based specifications for production and relevant data.
Field V T L D Description From7T o8
ANR S CHAR 40 Combined order/OP number 1 40
AUART K CHAR 5 Order type according to the configuration in HYDRA.
The order type must be the same as in the order header
and be configured in HYDRA.
The attempt of transferring an order type that deviates from 41 45
the order header is ignored.
If this field remains empty, the order type specified in the
header is used .
AGBEZ M CHAR 40 Operation designation/name. 46 85
ATK K CHAR 40 Article/item (number); HYDRA only displays up to 25
digits/characters.
Alphabetic characters in CAPITAL LETTERS
If no item/article number is transferred when creating an
operation (blank), the article number of the order header 86 125
will be used for the operation.
If no item/article number is transferred when an operation
is changed, the article number of the order header will be
used.
ATKBEZ K CHAR 40 Item/article designation/name; HYDRA only displays up to
25 digits.
If no item/article designation/name is transferred when an
operation is created (blank), the article designation/name
of the order header will be used for the operation
(redundant). It is recommended to leave this field blank.
126 165
If no item/article designation/name is transferred when
changing an operation, the item/article designation/name
of the order header is used.
Please note: the item/article designation/name of the order
header can only be edited in the MOC; it is automatically
used for all operations of the order when saving.
MATTYP MM CHAR 10 Material type of the item/article;
when HYDRA MPL is used, according to the material type
configuration
If no material type is transferred when creating an 166 175
operation, the material type of the order header is used.
If no material type is transferred when changing an
operation, the material type of the order header is used.
FILLER K CHAR 10 Reserved; must be blank. 176 185
7 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
8 See footnote of column "From“
EIS-ERP_82.docx Version: 1.3.23503 Page 22 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field    | V  T     | L  D Description                          |     |     | From7T o8  |
| -------- | -------- | ----------------------------------------- | --- | --- | ---------- |
| EXTPRIO  | M  CHAR  | 1    Priority (0 - 9; 9 = priority high)  |     |     |            |
If the priority check is enabled for the order type, the
priority is always transferred from the order header to the
186  186
operations. Any deviating priorities of the operation are
ignored.

| MNR  | M  CHAR  | 8    Planned workplace  |     |     |     |
| ---- | -------- | ----------------------- | --- | --- | --- |
At least one of the fields MNR and/or MGRP must be
|     |     | transferred.   |     |     | 187  194  |
| --- | --- | -------------- | --- | --- | --------- |
When transferring the workplace, HYDRA identifies the
workplace's group according to the configuration to avoid
inconsistent data. The transferred group is then ignored.
MGRP  M  CHAR  8    Planned group and/or group of the workplace
At least one of the fields MNR and/or MGRP must be
|     |     | transferred.  |     |     | 195  202  |
| --- | --- | ------------- | --- | --- | --------- |
If no machine group is transferred, the system
automatically identifies the machine group using the
transferred workplace.
| OPT:PLAN  | M  CHAR  | 1    Planned   |     |     |     |
| --------- | -------- | -------------- | --- | --- | --- |
 M - operation is planned (in detail) for the workplace
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
 G - operation is in the pool of (groups) (MNR empty)
Depending on the workplace (MNR field), the indicator is
set internally according to the following logic:
|     |     | Workplace  | Planned   | Result  |     |
| --- | --- | ---------- | --------- | ------- | --- |
|     |     | MNR        | OPT:PLAN  |         |     |

203  203
|     |     | blank  | blank/ "M"/"G" OPT:PLAN is set to  |     |     |
| --- | --- | ------ | ----------------------------------- | --- | --- |
"G"
 OPT:PLAN is set
|     |     | not blank  | blank  |     |     |
| --- | --- | ---------- | ------ | --- | --- |
to "M"
|     |     | not blank  | "M"  |  OPT:PLAN  |     |
| --- | --- | ---------- | ---- | ----------- | --- |
remains at "M"
|     |     | not blank   | "G"  |  OPT:PLAN  |     |
| --- | --- | ----------- | ---- | ----------- | --- |
remains at "G"
RES:WNR  K  CHAR  40    (Main) tool; see notes (see below)!  204  243
RES:DNC  K  CHAR  40    NC program; see notes (see below)!  244  283
RES:EMAT  K  CHAR  40    (Main) input material; see notes (see below)!  284  323
| COLOR  | K  CHAR  | 20    Color of the material  |     |     | 324  343  |
| ------ | -------- | ---------------------------- | --- | --- | --------- |
| KST    | K  CHAR  | 8    Cost center             |     |     | 344  351  |
| KART   | K  CHAR  | 10    Cost type              |     |     | 352  361  |
ASTUFE  K  CHAR  1    Authorization level to log in and off the OP (lowest
362  362
authorization = 1)
| RMNR  | K  CHAR  | 10    Confirmation/upload number  |     |     | 363  372  |
| ----- | -------- | --------------------------------- | --- | --- | --------- |
DATTERMB  K  DATE  10    Scheduled start (date)  If scheduling is run outside  373  382
HYDRA, the scheduled
ZEITERMB  K  TIME  5    Scheduled start (time)  dates of the operations  383  387
must be transferred from
DATTERME  K  DATE  10    Scheduled end (date)  the ERP system.  388  397
If scheduling is performed
| ZEITERME  | K  TIME  | 5    Scheduled end (time)  |     |     |     |
| --------- | -------- | -------------------------- | --- | --- | --- |
in HYDRA, these fields are
overwritten.
In HYDRA Shop Floor
|     |     |     |     | Scheduling (HLS), the  | 398  402  |
| --- | --- | --- | --- | ---------------------- | --------- |
operations are displayed in
the pool of groups of the
graphic planning board for
the scheduled start date.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 23 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | From7T o8  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
DATFB  K  DATE  10    Earliest start (date)  If scheduling is run outside  403  412
of HYDRA, the scheduled
ZEIFB  K  TIME  5    Earliest start (time)  basic dates - if any - can  413  417
be transferred from the
| DATSB  | K  DATE  | 10    Latest start (date)  |     |     | 418  427  |
| ------ | -------- | -------------------------- | --- | --- | --------- |
ERP system.
If scheduling is performed
| ZEISB  | K  TIME  | 5    Latest start (time)  |     |     | 428  432  |
| ------ | -------- | ------------------------- | --- | --- | --------- |
in HYDRA, these fields are
overwritten. The basic
DATFE  K  DATE  10    Earliest end (date)  dates result from forward  433  442
and backward scheduling
| ZEIFE  | K  TIME  | 5    Earliest end (time)  |     |     | 443  447  |
| ------ | -------- | ------------------------- | --- | --- | --------- |
in HYDRA.
| DATSE  | K  DATE  | 10    Latest end (date)  |     |     | 448  457  |
| ------ | -------- | ------------------------ | --- | --- | --------- |
| ZEISE  | K  TIME  | 5    Latest end (time)   |     |     | 458  462  |
DATB  K  DATE  10    Planned start (date)  Planned start/ end date  463  472
that results from
ZEIB  K  TIME  5    Planned start (time)  scheduling for the  473  477
workplace.
DATE  K  DATE  10    Planned end (date)  If planning is performed in  478  487
HYDRA, these fields are
| ZEIE  | K  TIME  | 5    Planned end (time)  |     |     |     |
| ----- | -------- | ------------------------ | --- | --- | --- |
overwritten.
Note: The planned dates
|     |     |     |     | must include valid values if  | 488  492  |
| --- | --- | --- | --- | ----------------------------- | --------- |
the operation is directly
planned for a workplace
(OPT:PLAN=M).
SGR:GUTB  K  DEC  13  3  Target quantity (base quantity unit)  493  507
SGR:GUTP  M  DEC  13  3  Target quantity (primary quantity unit)  508  522
SGR:GUTS  K  DEC  13  3  Target quantity (secondary quantity unit)  523  537
SGR:GUTT  K  DEC  13  3  Target quantity (tertiary quantity unit)  538  552
SGR:AUSB  K  DEC  13  3  Target scrap quantity (base quantity unit)  553  567
SGR:AUSP  K  DEC  13  3  Target scrap quantity (primary quantity unit)  568  582
SGR:AUSS  K  DEC  13  3  Target scrap quantity (secondary quantity unit)  583  597
SGR:AUST  K  DEC  13  3  Target scrap quantity (tertiary quantity unit)  598  612
| SGE:B  | K  CHAR  | 3    Base quantity unit  |     |     |     |
| ------ | -------- | ------------------------ | --- | --- | --- |
If no base quantity unit is transferred when creating an
operation, the unit of the order header is used, if
|     |     | applicable.  |     |     | 613  615  |
| --- | --- | ------------ | --- | --- | --------- |
If no base quantity unit is transferred when changing an
operation, the unit of the order header is used, if
applicable.
| SGE:P  | M  CHAR  | 3    Primary input quantity unit  |     |     | 616  618  |
| ------ | -------- | --------------------------------- | --- | --- | --------- |
SGE:S  K  CHAR  3    Secondary input quantity unit  619  621
| SGE:T  | K  CHAR  | 3    Tertiary input quantity unit  |     |     | 622  624  |
| ------ | -------- | ---------------------------------- | --- | --- | --------- |
WEIGMENGE  K  DEC  13  3  Minimum send-ahead quantity (primary quantity unit)  625  639
| MENGEPROZ:UNTLI  | K  DEC  | 13  3  Underdelivery in percent  |     |     |     |
| ---------------- | ------- | -------------------------------- | --- | --- | --- |
The value entered is an absolute percentage value of the
target quantity (primary quantity unit).
|     |     | Example:  |     |     | 640  654  |
| --- | --- | --------- | --- | --- | --------- |
- Target quantity of the operation: 120 pieces
- Underdelivery: 84%
The actual quantity must not fall below 101 items.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 24 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field      | V  T     | L  D Description                |     |     | From7T o8  |
| ---------- | -------- | ------------------------------- | --- | --- | ---------- |
| OPT:UNTLI  | K  CHAR  | 1    Reaction to underdelivery  |     |     |            |
Possible values:
|     |     | " "  | no reaction                                    |     |     |
| --- | --- | ---- | ---------------------------------------------- | --- | --- |
|     |     | "W"  | Warning; entry of a deviation reason required  |     |     |
655  655
|     |     | "X"  | Error; underdelivery not allowed.  |     |     |
| --- | --- | ---- | ---------------------------------- | --- | --- |
Note: You can only enter deviation reasons for
overdeliveries/ underdeliveries via the CTWIN software. If
you use DOS terminals, the reaction "W" is interpreted as
an error ("X").
| MENGEPROZ:UEBLI  | K  DEC  | 13  3  Overdelivery in percent  |     |     |     |
| ---------------- | ------- | ------------------------------- | --- | --- | --- |
The value entered is an absolute percentage value of the
target quantity (primary quantity unit).
|     |     | Example:  |     |     | 656  670  |
| --- | --- | --------- | --- | --- | --------- |
- Target quantity of the operation: 120 pieces
- Overdelivery: 168%
The actual quantity must not exceed 201 items.
| OPT:UEBLI  | K  CHAR  | 1    Reaction to overdelivery   |     |     |     |
| ---------- | -------- | ------------------------------- | --- | --- | --- |
Possible values:
|     |     | " "  | no reaction                                    |     |     |
| --- | --- | ---- | ---------------------------------------------- | --- | --- |
|     |     | "W"  | Warning; entry of a deviation reason required  |     |     |
671  671
|     |     | "X"  | Error; overdelivery not allowed.  |     |     |
| --- | --- | ---- | --------------------------------- | --- | --- |
Note: You can only enter deviation reasons for
overdeliveries/ underdeliveries via the CTWIN software. If
you use DOS terminals, the reaction "W" is interpreted as
an error ("X").
UMRFAKTP:Z  K  NUM  8    Numerator for the conversion of primary quantity to basic
quantity

|     |     | Example:                                |     |     |     |
| --- | --- | --------------------------------------- | --- | --- | --- |
|     |     | - Base quantity unit: square meter M2   |     |     |     |
|     |     | - Primary quantity unit: piece ST       |     |     |     |
- 1 piece = 2 square meters.
|     |     | In this case to be stored as        |     |     | 672  679  |
| --- | --- | ----------------------------------- | --- | --- | --------- |
|     |     | - numerator (= UMRFAKTP:Z ) 2 and   |     |     |           |
- denominator (= UMRFAKTP:N) 1.

MPL for coil-based manufacturing: the conversion is based
on specific conversion factors (see the RF structure
below); therefore 0 must be transferred for operations that
are produced at machines for coil-based production or at
coil cutting machines.
UMRFAKTP:N  K  NUM  8    Denominator for the conversion of primary quantity to basic
quantity
680  687
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTS:Z  K  NUM  8    Numerator for the conversion of secondary quantity to
basic quantity
688  695
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTS:N  K  NUM  8    Denominator for the conversion of secondary quantity to
|     |     | basic quantity  |     |     | 696  703  |
| --- | --- | --------------- | --- | --- | --------- |
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTT:Z  K  NUM  8    Numerator for the conversion of tertiary quantity to basic
quantity
704  711
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTT:N  K  NUM  8    Denominator for the conversion of tertiary quantity to basic
quantity
712  719
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 25 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

ERP Interface with Additional Data
Field V T L D Description From7T o8
RUEZ K NUM 8 Setup time in seconds. If no setup time exists the value is 720 727
explicitly to be set to 0.
RUEZ:ZUSCHL K NUM 8 Additional setup time in seconds. Should be set to 0 if not 728 735
available.
BEARBZEI K NUM 8 Processing time in seconds. Should be set to 0 if not 736 743
available.
PZ K NUM 8 Inspection time in seconds. Should be set to 0 if not 744 751
available.
ABRZ K NUM 8 Teardown/retooling time in seconds. Should be set to 0 if 752 759
not available.
LIZ K NUM 8 Delivery time in seconds
At present only relevant in connection with the HYDRA 760 767
Shop Floor Scheduling module (HLS). Should be set to 0 if
it is not an external processing OP.
FREMDFERT K CHAR 1 External processing OP Y/N
At present only relevant in connection with the HYDRA 768 768
Shop Floor Scheduling module (HLS). Should in general
be set to "N".
RLZ:EXPR K CHAR 6 Remaining run time (formula 1);
Relevant if the HYDRA Shop Floor Scheduling module
(HLS) and specific BDE applications are used. Generally, 769 774
transfer "RLFZ" by default. Configure any deviating
remaining run time formulas in the system's Formula
management.
RLZ2:EXPR K CHAR 6 Remaining run time (formula 2); option (leave empty) 775 780
VLZ K NUM 8 Lead time in seconds. Should be set to 0 if not available. 781 788
LIEZ:MAX K NUM 8 Max. synchronization time in seconds. Should be set to 0 if 789 796
not available.
WARTZ K NUM 8 Waiting time in seconds. Should be set to 0 if not available. 797 804
WARTZ:MIN K NUM 8 Minimum waiting time in seconds. Should be set to 0 if not 805 812
available.
LIEZ K NUM 8 Idle period in seconds. Should be set to 0 if not available. 813 820
LART K CHAR 4 Wage type 821 824
AKKORD K CHAR 1 Piecework indicator/ premium 825 825
TE K DEC 13 3 Premium specification te in seconds per 1000 pieces. 826 840
Should be set to 0 if not available.
TR K DEC 13 3 Premium specification tr in seconds. Should be set to 0 if 841 855
not available.
TEB K DEC 13 3 Premium specification teb in seconds per 1000 pieces. 856 870
Should be set to 0 if not available.
TRB K DEC 13 3 Premium specification trb in seconds. Should be set to 0 if 871 885
not available.
VERARBCODE M CHAR 6 Processing code; "SYSTEM" by default. You can configure 886 891
additional processing codes in the system.
OPT:ERF M CHAR 1 Recordable true/false 892 892
OPT:MULTIMNR M CHAR 1 Parallel production true/false 893 893
OPT:CNR MM CHAR 1 Batch management requirement true/false ("true" only 894 894
relevant for MPL / TRT and/or AIP-MTR)
EIS-ERP_82.docx Version: 1.3.23503 Page 26 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | From7T o8  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
OPT:SNR  MM  CHAR  1    Serial numbers required (only relevant if serial numbers
are used)
"G" = Automatic generation of the serial number (only in
combination with MPL as batch number)
"S" = Automatic generation of the serial number using
|     |     | number range (only in combination with MPL as batch  |     |     | 895  895  |
| --- | --- | ---------------------------------------------------- | --- | --- | --------- |
number)
"E" = Manual entry of the serial number
" “ or “N“ = serial numbers are not used
For details on the implementation/configuration of serial
numbers, see here.
SZY  K  NUM  8    Target cycle in seconds/ 1000; should be set;
896  903
mandatory for MDE cycle monitoring
TLG  K  NUM  8    Partitioning; should be pre-populated with 1   904  911
IMPFAKT  K  DEC  13  3  Pulse factor; only integer values allowed! Should be pre- 912  926
populated with 1 by default.
| OPT:SPLIT  | K  CHAR  | 1    May be split V/N            |     |     |     |
| ---------- | -------- | -------------------------------- | --- | --- | --- |
|            |          | V = Yes, operation may be split  |     |     |     |
N = No, operation must not be split
927  927
|     |     | Please note:   |     |     |     |
| --- | --- | -------------- | --- | --- | --- |
V only relevant for BDE-SSG, ADE-SPL, HLS-AGS,
N must be transferred in the other cases.
MAXANZSPLIT  K  NUM  8    Max. no. of splits. (only relevant if OPT:SPLIT = V)  928  935
MBVERH:RUE  K  DEC  5  2  Machine-operator relation: setup/ PEP workforce  936  942
requirements: setup
MBVERH:NORM  K  DEC  5  2  Machine-operator relation manufacturing/ PEP workforce
943  949
requirements: manufacturing
QUAL:NORM  K  NUM  8    PEP: Qualification: manufacturing  950  957
| QUAL:RUE  | K  NUM  | 8    PEP: Qualification: setup  |     |     | 958  965  |
| --------- | ------- | ------------------------------- | --- | --- | --------- |

Fields RES:WNR, RES:DNC, RES:EMAT
|     | The fields   |     |     |     |     |
| --- | ------------ | --- | --- | --- | --- |

- tool (RES:WNR)
|     | - NC program (RES:DNC)       |     |     |     |     |
| --- | ---------------------------- | --- | --- | --- | --- |
|     | - input material (RES:EMAT)  |     |     |     |     |
are displayed in different evaluation dialogs. Note the following if you populate these
fields via the ERP interface:
Only  set  the  operation  fields  if  NO  material  components  are  transferred  using  the
structure HY72_AG_KOMPL_001 and NO production resources and tools are transferred
using the structure HY72_AG_FHM_001.
If an existing operation is changed, all entries of the component list and of the production
resources and tools will automatically be deleted and must then explicitly be transferred.
If a material component changes (change of a material component) or if a production
resource and tool is changed (change of a tool), the ERP system must transfer the
changed operation as well as the complete material list and the complete list of the

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 27 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

production resources and tools to HYDRA (no "delta download").

Use  of  the  HYDRA  shop  floor  scheduling  system  (HLS)  or  of  the  graphic  order
sequencing (BDE-GAV)

If the HYDRA shop floor scheduling (HLS) or the graphic order sequencing (BDE-GAV)
are used, you should consider the following issues for operations that are planned with
these applications:
You may only transfer operations planned for groups (OPT:PLAN= G). In this case, the
planner explicitly carries out the detailed planning (scheduling for the workplace).
If you want to transfer and display operations as planned for a workplace, it is mandatory
|     | to populate the following fields:  |     |     |     |     |
| --- | ---------------------------------- | --- | --- | --- | --- |
MNR=<Workplace where the operation must be planned>
|     | PLAN:OPT=M                  |     |     |     |     |
| --- | --------------------------- | --- | --- | --- | --- |
|     | DATB=<Planned start, date>  |     |     |     |     |
|     | ZEIB=<Planned start, time>  |     |     |     |     |
|     | DATE=<Planned end, date>    |     |     |     |     |
ZEIE=<Planned end, time>
Operations – part 2
| Segment name:  |     |     | HY72_AG_HD_002_A  |     |     |
| -------------- | --- | --- | ----------------- | --- | --- |

The segment for the operation includes further operation-based specifications for production and relevant
data.
| Field  | V  T     | L  D Description                |     |     | From9T o10  |
| ------ | -------- | ------------------------------- | --- | --- | ----------- |
| ANR    | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40       |
ATKIDX  K  CHAR  50    Order information  OP  Drawing issue number  41  90
This field is available as of BDE82 and MLE version
HY72PPS_023.

9 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
10 See footnote of column "From“

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 28 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

Long texts of the operation
| Segment name:  |     |     | HY72_AG_INFO_AI_001_A  |     |     |
| -------------- | --- | --- | ---------------------- | --- | --- |
HY72_AG_INFO_AI_001_D
Use the following structure to transfer text fields as additional information on the operation to HYDRA.
The texts are then displayed in the MOC. Each data record contains one page of a maximum of 10 lines
and 80 characters of text information each.
The long text of an operation is shown, e.g. in:
  the MOC application "edit operation"
  the MOC application "order information"
  on the AIP shop floor terminal
| Field     | V  T     | L  D Description                       |     |     |     |
| --------- | -------- | -------------------------------------- | --- | --- | --- |
| KEY       | S  CHAR  | 40    Combined order/OP number         |     |     |     |
| TYP       | S  CHAR  | 2    Record type; by default: "AI"     |     |     |     |
| SUBKEY:1  | S  NUM   | 8    Reserved; "00000000" by default.  |     |     |     |
SUBKEY:2  M  NUM  8    Consecutive numbering within the key starting at "00000001".
INFO:BEZ  K  CHAR  20    Short text; only relevant for SUBKEY:2 = "00000001".
If empty, the first 20 digits from Info text 1 will be used
| INFO:1   | K  CHAR  | 80    Info text 1   |     |     |     |
| -------- | -------- | ------------------- | --- | --- | --- |
| INFO:2   | K  CHAR  | 80    Info text 2   |     |     |     |
| INFO:3   | K  CHAR  | 80    Info text 3   |     |     |     |
| INFO:4   | K  CHAR  | 80    Info text 4   |     |     |     |
| INFO:5   | K  CHAR  | 80    Info text 5   |     |     |     |
| INFO:6   | K  CHAR  | 80    Info text 6   |     |     |     |
| INFO:7   | K  CHAR  | 80    Info text 7   |     |     |     |
| INFO:8   | K  CHAR  | 80    Info text 8   |     |     |     |
| INFO:9   | K  CHAR  | 80    Info text 9   |     |     |     |
| INFO:10  | K  CHAR  | 80    Info text 10  |     |     |     |

Components – Component data
| Segment name (OBSOLETE):  |     |     | HY72_AG_KOMPL_001_A  |     |     |
| ------------------------- | --- | --- | -------------------- | --- | --- |
HY72_AG_KOMPL_001_D

| Segment name:  |     |     | HY72_AG_KOMPL_002_A  |     |     |
| -------------- | --- | --- | -------------------- | --- | --- |
HY72_AG_KOMPL_002_D
| Segment name in compatibility mode:  |     |     | HY72_AG_KOMPL_002  |     |     |
| ------------------------------------ | --- | --- | ------------------ | --- | --- |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 29 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | Fro To12  |
| ------ | ----- | ------------------ | --- | --- | --------- |
m11
| ANR  | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40   |
| ---- | -------- | ------------------------------- | --- | --- | ------- |
| ATK  | S  CHAR  | 40    Material number;          |     |     | 41  80  |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ  | M  CHAR  | 40    Material designation/name  |     |     | 81  120   |
| ------- | -------- | -------------------------------- | --- | --- | --------- |
| BEZ     | K  CHAR  | 30    Comment 1                  |     |     | 121  150  |
| BEZ:2   | K  CHAR  | 30    Comment 2                  |     |     | 151  180  |
| SLP     | S  CHAR  | 10    BOM item                   |     |     |           |
MPL for coil-based manufacturing: item of the component
|     |     | in the layer structure.  |     |     | 181  190  |
| --- | --- | ------------------------ | --- | --- | --------- |
Each component must have a unique BOM item if several
components are used in one operation. Two components
must not have the same BOM item.
| SLS  | M  NUM  | 8    BOM level  |     |     |     |
| ---- | ------- | --------------- | --- | --- | --- |
Material components with the BOM level > 1 will always be
191  198
saved under the material type "I" = info component.
If you log on input batches via material management
(MPL/TRT), you can only log on components of BOM level
0.
| ART     | MM  CHAR  | 2    Material type:       |                                    |     |           |
| ------- | --------- | ------------------------- | ---------------------------------- | --- | --------- |
|         |           | "M"                       | (Consumption) material             |     |           |
|         |           | "T"                       | Carrier material (only MPL-RF)     |     | 199  200  |
|         |           | "A"                       | Waste component (only MPL-RF)      |     |           |
|         |           | "Z"                       | Additional material (only MPL-RF)  |     |           |
|         |           | "I"                       | Info component                     |     |           |
| MATTYP  | MM  CHAR  | 10    MPL: Material type  |                                    |     |           |
201  210
If HYDRA MPL is used, enter a valid material type
configured in HYDRA.
otherwise: "SYSTEM"
| VERBR  | MM  CHAR  | 1    MPL: Consumption type  |     |     |     |
| ------ | --------- | --------------------------- | --- | --- | --- |
If not specified otherwise, assign "L" to this field.
|     |     | For components of the material type "I" assign "N" to the  |     |     | 211  211  |
| --- | --- | ---------------------------------------------------------- | --- | --- | --------- |
field.
For discrete consumption", assign "D" to the field.

OPT:ERSB  MM  CHAR  1    MPL-RF: Replaceable – is it possible to use another
material than the planned one for such a component? You
may only use the same material type that matches the type
|     |     | of the material to be produced.  |     |     | 212  212  |
| --- | --- | -------------------------------- | --- | --- | --------- |
You may only log unplanned material on to the machine, if
the respective status is used.
MPL: true/false
otherwise: "N" by default

11 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
12 See footnote of column "From“

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 30 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | Fro To12  |
| ------ | ----- | ------------------ | --- | --- | --------- |
m11
OPT:WZW  MM  CHAR  1    MPL: Change necessary; an input batch change for a
batch of this material requires an output batch change:
213  213
if ART = "T" or "Z" -> OPT:WZW must be "J"
if ART = "I" or "A" -> OPT:WZW must be "N"
if ART = "M" -> OPT:WZW: "J" or "N"
SGR:GUT  MM  DEC  13  3  MPL: Input quantity to produce 1 article in primary quantity  214  228
unit of the operation.
SGE:GUT  MM  CHAR  3    MPL: Quantity unit of the input quantity  229  231
MENGEPROZ  K  DEC  13  3  Input quantity in percent  232  246
Reserved; currently not used.
UTL  K  DEC  13  3  Upper tolerance limit in percent; 3 decimal places  247  261
Reserved; currently not used.
LTL  K  DEC  13  3  Lower tolerance limit in percent; 3 decimal places  262  276
Reserved; currently not used.
EGR:GUT  K  DEC  13  3  Total quantity/required quantity: total quantity required for  277  291
the OP, i.e. for the quantity to be produced (output
quantity)
EGE:GUT  K  CHAR  3    Unit of the required quantity  292  294
295  302
| SLS:M  | K  NUMC  | 8    BOM level of the parent material  |     |     |     |
| ------ | -------- | -------------------------------------- | --- | --- | --- |
Reserved; currently not used.
SLP:M  K  CHAR  10    BOM item of the parent material  303  312
Reserved; currently not used.
MENGE:FIX  K  CHAR  1    Indicator: Fixed quantity  313  313
Reserved; currently not used.
PPS:RETRO  K  CHAR  1    Indicator: Backflush (retrograde withdrawal) (in ERP)  314  314
Reserved; currently not used.
| MENGETOL  | K  DEC  | 13  3  Tolerance in percent  |     |     | 315  329  |
| --------- | ------- | ---------------------------- | --- | --- | --------- |
Please note: only in segment HY72_AG_KOMPL_002_A
| MENGEABW  | K  DEC  | 13  3  Deviation in percent  |     |     | 330  344  |
| --------- | ------- | ---------------------------- | --- | --- | --------- |
Please note: only in segment HY72_AG_KOMPL_002_A
| OPT:SLOS  | K  CHAR  | 1    Flag for merged batch  |     |     |     |
| --------- | -------- | --------------------------- | --- | --- | --- |
As of MPL82 / MLE version HY72PPS_019
Identification of the component as part of the collection of
serial numbers for merging
|     |     | " "  | If no serial numbers                  | are collected | 345  345  |
| --- | --- | ---- | ------------------------------------- | ------------- | --------- |
|     |     |      |                                       |               |           |
|     |     |      | and                                   |               |           |
|     |     |      | if serial numbers are collected and   | merged:       |           |
subordinated serial number
|     |     | "F"  | if serial numbers are collected and   | merged:  |     |
| --- | --- | ---- | ------------------------------------- | -------- | --- |
leading serial number
VERB:ZAEHLER  K  CHAR  1    Indicator for automatic counter consumption (as of MPL82
346  346
/ MLE version HY72PPS_019):
|     |     | "J"  | Automatic counter consumption enabled   |     |     |
| --- | --- | ---- | --------------------------------------- | --- | --- |
|     |     | "N"  | Automatic counter consumption disabled  |     |     |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 31 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

ERP Interface with Additional Data
If a material component changes (change of a material component) or if a production resource
and tool is changed (change of a tool), the ERP system must transfer the changed operation as
well as the complete material list and the complete list of the production resources and tools to
HYDRA (no "delta download").
Also see the notes in the "Operations" chapter.
During the data transfer to HYDRA, the first material transferred to HYDRA will be displayed in
the operation.
Component - user fields
Segment name: HY72_AG_KOMPL_USRFLD_001_A
Use user fields to store further customer-specific information to HYDRA in addition to the fields that are
available by default. Use this segment to transfer this data from the ERP system to HYDRA and to store
this data in the component.
The so-called user field key specifies the available user fields and their meaning. Each user field key
describes a combination of user fields. The document Configuration_Userfields.pdf describes how to
configure the user field key.
To allow for a consistent data exchange between the ERP system and HYDRA, the customer
must ensure that the user field keys are identical in both systems.
Field V T L D Description From To14
13
ANR S CHAR 40 Combined order/OP number 1 40
ATK S CHAR 40 Material number; 41 80
alphabetic characters in CAPITAL LETTERS
SLP S CHAR 10 BOM item
81 90
MPL for coil-based manufacturing: item of the component
in the layer structure.
USRFLD S CHAR 8 User field key. The user field key must be configured in the 91 98
system.
13 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
14 See footnote of column "From“
EIS-ERP_82.docx Version: 1.3.23503 Page 32 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | From To14  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
13
| FU:1   | K  DATE  | 10    User field 1    |     |     | 99  108   |
| ------ | -------- | --------------------- | --- | --- | --------- |
| FU:2   | K  DATE  | 10    User field 2    |     |     | 109  118  |
| FU:3   | K  DATE  | 10    User field 3    |     |     | 119  128  |
| FU:4   | K  DATE  | 10    User field 4    |     |     | 129  138  |
| FU:5   | K  DATE  | 10    User field 5    |     |     | 139  148  |
| FU:6   | K  DATE  | 10    User field 6    |     |     | 149  158  |
| FU:7   | K  NUM   | 8    User field 7     |     |     | 159  166  |
| FU:8   | K  NUM   | 8    User field 8     |     |     | 167  174  |
| FU:9   | K  NUM   | 8    User field 9     |     |     | 175  182  |
| FU:10  | K  NUM   | 8    User field 10    |     |     | 183  190  |
| FU:11  | K  NUM   | 8    User field 11    |     |     | 191  198  |
| FU:12  | K  NUM   | 8    User field 12    |     |     | 199  206  |
| FU:13  | K  NUM   | 8    User field 13    |     |     | 207  214  |
| FU:14  | K  NUM   | 8    User field 14    |     |     | 215  222  |
| FU:15  | K  NUM   | 8    User field 15    |     |     | 223  230  |
| FU:16  | K  NUM   | 8    User field 16    |     |     | 231  238  |
| FU:17  | K  NUM   | 8    User field 17    |     |     | 239  246  |
| FU:18  | K  NUM   | 8    User field 18    |     |     | 247  254  |
| FU:19  | K  NUM   | 8    User field 19    |     |     | 255  262  |
| FU:20  | K  NUM   | 8    User field 20    |     |     | 263  270  |
| FU:21  | K  NUM   | 8    User field 21    |     |     | 271  278  |
| FU:22  | K  NUM   | 8    User field 22    |     |     | 279  286  |
| FU:23  | K  DEC   | 13  3  User field 23  |     |     | 287  301  |
| FU:24  | K  DEC   | 13  3  User field 24  |     |     | 302  316  |
| FU:25  | K  DEC   | 13  3  User field 25  |     |     | 317  331  |
| FU:26  | K  DEC   | 13  3  User field 26  |     |     | 332  346  |
| FU:27  | K  DEC   | 13  3  User field 27  |     |     | 347  361  |
| FU:28  | K  DEC   | 13  3  User field 28  |     |     | 362  376  |
| FU:29  | K  CHAR  | 1    User field 29    |     |     | 377  377  |
| FU:30  | K  CHAR  | 1    User field 30    |     |     | 378  378  |
| FU:31  | K  CHAR  | 1    User field 31    |     |     | 379  379  |
| FU:32  | K  CHAR  | 1    User field 32    |     |     | 380  380  |
| FU:33  | K  CHAR  | 1    User field 33    |     |     | 381  381  |
| FU:34  | K  CHAR  | 1    User field 34    |     |     | 382  382  |
| FU:35  | K  CHAR  | 1    User field 35    |     |     | 383  383  |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 33 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Field  | V  T  | L  D Description   |     |     | From To14  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
13
| FU:36  | K  CHAR  | 1    User field 36   |     |     | 384  384  |
| ------ | -------- | -------------------- | --- | --- | --------- |
| FU:37  | K  CHAR  | 1    User field 37   |     |     | 385  385  |
| FU:38  | K  CHAR  | 1    User field 38   |     |     | 386  386  |
| FU:39  | K  CHAR  | 1    User field 39   |     |     | 387  387  |
| FU:40  | K  CHAR  | 1    User field 40   |     |     | 388  388  |
| FU:41  | K  CHAR  | 1    User field 41   |     |     | 389  389  |
| FU:42  | K  CHAR  | 1    User field 42   |     |     | 390  390  |
| FU:43  | K  CHAR  | 1    User field 43   |     |     | 391  391  |
| FU:44  | K  CHAR  | 1    User field 44   |     |     | 392  392  |
| FU:45  | K  CHAR  | 10    User field 45  |     |     | 393  402  |
| FU:46  | K  CHAR  | 10    User field 46  |     |     | 403  412  |
| FU:47  | K  CHAR  | 10    User field 47  |     |     | 413  422  |
| FU:48  | K  CHAR  | 10    User field 48  |     |     | 423  432  |
| FU:49  | K  CHAR  | 10    User field 49  |     |     | 433  442  |
| FU:50  | K  CHAR  | 10    User field 50  |     |     | 443  452  |
| FU:51  | K  CHAR  | 20    User field 51  |     |     | 453  472  |
| FU:52  | K  CHAR  | 20    User field 52  |     |     | 473  492  |
| FU:53  | K  CHAR  | 20    User field 53  |     |     | 493  512  |
| FU:54  | K  CHAR  | 20    User field 54  |     |     | 513  532  |
| FU:55  | K  CHAR  | 20    User field 55  |     |     | 533  552  |
| FU:56  | K  CHAR  | 20    User field 56  |     |     | 553  572  |
| FU:57  | K  CHAR  | 20    User field 57  |     |     | 573  592  |
| FU:58  | K  CHAR  | 20    User field 58  |     |     | 593  612  |
| FU:59  | K  CHAR  | 20    User field 59  |     |     | 613  632  |
| FU:60  | K  CHAR  | 20    User field 60  |     |     | 633  652  |
| FU:61  | K  CHAR  | 20    User field 61  |     |     | 653  672  |
| FU:62  | K  CHAR  | 20    User field 62  |     |     | 673  692  |
| FU:63  | K  CHAR  | 20    User field 63  |     |     | 693  712  |
| FU:64  | K  CHAR  | 20    User field 64  |     |     | 713  732  |
| FU:65  | K  CHAR  | 40    User field 65  |     |     | 733  772  |
| FU:66  | K  CHAR  | 40    User field 66  |     |     | 773  812  |

Production resources and tools

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 34 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| Segment name:  |     |     | HY72_AG_FHM_001_A  |     |     |
| -------------- | --- | --- | ------------------ | --- | --- |
HY72_AG_FHM_001_D

If you want to use production resources and tools as resources in HYDRA, you also have to use the
HYDRA Tool and Resource Management (WRM) and/or of HYDRA DNC. If production resources and
tools are only displayed in the BDE module, you do not have to use WRM or DNC.
| Field   | K  T     | L    Description                      |                      |     |     |
| ------- | -------- | ------------------------------------- | -------------------- | --- | --- |
| ANR     | S  CHAR  | 40    Combined order/OP number        |                      |     |     |
| RESTYP  | S  CHAR  | 4    Resource type; possible values:  |                      |     |     |
|         |          | DNC                                   | DNC program          |     |     |
|         |          | ENT                                   | removal device       |     |     |
|         |          | TEM                                   | temperature device   |     |     |
|         |          | VOR                                   | device               |     |     |
|         |          | WNR                                   | tool                 |     |     |
If you use the HYDRA tools and resources management
(WRM), you can define additional resource types (idents) in the
application's resource type configuration (Menu WRM: Master data
> Resource types).

| ATK  | S  CHAR  | 40    Resource/ material number;   |     |     |     |
| ---- | -------- | ---------------------------------- | --- | --- | --- |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ   | K  CHAR  | 40    Designation      |     |     |     |
| -------- | -------- | ---------------------- | --- | --- | --- |
| BEZ      | K  CHAR  | 30    Comment 1        |     |     |     |
| BEZ:2    | K  CHAR  | 30    Comment 2        |     |     |     |
| SGR:GUT  | M  DEC   | 13  3  Input quantity  |     |     |     |
Please note: The quantity of a production resource and tool that is to be
checked in the HYDRA shop floor scheduling module (license: HLS-BSR) is
generally assumed to be 1, if 0 has been transferred here.
| SGE:GUT  | K  CHAR  | 3    Quantity unit  |     |     |     |
| -------- | -------- | ------------------- | --- | --- | --- |

If a material component changes (change of a material component) or if a production resource
and tool is changed (change of a tool), the ERP system must transfer the changed operation as

well as the complete material list and the complete list of the production resources and tools to
HYDRA (no "delta download").
Also see the notes in the "Operations" chapter.
During the data transfer to HYDRA, the first production resource and tool transferred with
RESTYP=DNC to HYDRA will be taken over in the operation and displayed as NC program.
Otherwise, the first production resource and tool transferred with RESTYP<>DOC to HYDRA
will be taken over for the operation and displayed as tool. If production resources and tools of
different resource types are transferred, the customer must ensure a useful sequence (e.g. first
the prod. resources + tools of the resource type WNR and then the production resources and
tools of another resource type).

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 35 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

Use the option "automatic creation" in the Resource types configuration to make sure that
production resources and tools of a resource type are created automatically as resource,
provided that they do not yet exist in the system (only relevant if the WRM product group (Tool
and Resource Management) is in use).

Documents
| Segment name:  |     |     | HY72_AG_DOC_001_A  |     |     |
| -------------- | --- | --- | ------------------ | --- | --- |
HY72_AG_DOC_001_D

| Field  | V  T     | L  D Description                |     |     |     |
| ------ | -------- | ------------------------------- | --- | --- | --- |
| ANR    | S  CHAR  | 40    Combined order/OP number  |     |     |     |
| ATK    | S  CHAR  | 40    Document ID: unique key   |     |     |     |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ  | M  CHAR  | 40    Designation  |     |     |     |
| ------- | -------- | ------------------ | --- | --- | --- |
| BEZ     | K  CHAR  | 30    Comment 1    |     |     |     |
| BEZ:2   | K  CHAR  | 30    Comment 2    |     |     |     |
PATH  M  CHAR  8    Refers to a path defined in the Path configuration.
| FILE  | M  CHAR  | 128    File name incl. file extension  |     |     |     |
| ----- | -------- | -------------------------------------- | --- | --- | --- |

Operation user fields
| Segment name:  |     |     | HY72_AG_USRFLD_001_A  |     |     |
| -------------- | --- | --- | --------------------- | --- | --- |

Use user fields to store further customer-specific information to HYDRA in addition to the fields that are
available by default. Use this segment to transfer this data from the ERP system to HYDRA and to store
this data in the operation.
The so-called user field key specifies the available user fields and their meaning. Each user field key
describes a combination of user fields. The document Configuration_Userfields.pdf describes how to
configure the user field key.
To allow for a consistent data exchange between the ERP system and HYDRA, the customer
must ensure that the user field keys are identical in both systems.

| Field  | V  T     | L  D Description                |     |     | From To  |
| ------ | -------- | ------------------------------- | --- | --- | -------- |
| ANR    | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40    |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 36 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

USRFLD  S  CHAR  8    User field key. The user field key must be configured in the
41  48
system.
| FU:1   | K  DATE  | 10    User field 1  |     |     | 49  58    |
| ------ | -------- | ------------------- | --- | --- | --------- |
| FU:2   | K  DATE  | 10    User field 2  |     |     | 59  68    |
| FU:3   | K  DATE  | 10    User field 3  |     |     | 69  78    |
| FU:4   | K  DATE  | 10    User field 4  |     |     | 79  88    |
| FU:5   | K  DATE  | 10    User field 5  |     |     | 89  98    |
| FU:6   | K  DATE  | 10    User field 6  |     |     | 99  108   |
| FU:7   | K  NUM   | 8    User field 7   |     |     | 109  116  |
| FU:8   | K  NUM   | 8    User field 8   |     |     | 117  124  |
| FU:9   | K  NUM   | 8    User field 9   |     |     | 125  132  |
| FU:10  | K  NUM   | 8    User field 10  |     |     | 133  140  |
| FU:11  | K  NUM   | 8    User field 11  |     |     | 141  148  |
| FU:12  | K  NUM   | 8    User field 12  |     |     | 149  156  |
| FU:13  | K  NUM   | 8    User field 13  |     |     | 157  164  |
| FU:14  | K  NUM   | 8    User field 14  |     |     | 165  172  |
| FU:15  | K  NUM   | 8    User field 15  |     |     | 173  180  |
| FU:16  | K  NUM   | 8    User field 16  |     |     | 181  188  |
| FU:17  | K  NUM   | 8    User field 17  |     |     | 189  196  |
| FU:18  | K  NUM   | 8    User field 18  |     |     | 197  204  |
| FU:19  | K  NUM   | 8    User field 19  |     |     |           |
205  212
| FU:20  | K  NUM  | 8    User field 20  |     |     | 213  220  |
| ------ | ------- | ------------------- | --- | --- | --------- |
| FU:21  | K  NUM  | 8    User field 21  |     |     | 221  228  |
| FU:22  | K  NUM  | 8    User field 22  |     |     |           |
229  236
| FU:23  | K  DEC   | 13  3  User field 23  |     |     | 237  251  |
| ------ | -------- | --------------------- | --- | --- | --------- |
| FU:24  | K  DEC   | 13  3  User field 24  |     |     | 252  266  |
| FU:25  | K  DEC   | 13  3  User field 25  |     |     | 267  281  |
| FU:26  | K  DEC   | 13  3  User field 26  |     |     | 282  296  |
| FU:27  | K  DEC   | 13  3  User field 27  |     |     | 297  311  |
| FU:28  | K  DEC   | 13  3  User field 28  |     |     | 312  326  |
| FU:29  | K  CHAR  | 1    User field 29    |     |     | 327  327  |
| FU:30  | K  CHAR  | 1    User field 30    |     |     | 328  328  |
| FU:31  | K  CHAR  | 1    User field 31    |     |     | 329  329  |
| FU:32  | K  CHAR  | 1    User field 32    |     |     | 330  330  |
| FU:33  | K  CHAR  | 1    User field 33    |     |     | 331  331  |
| FU:34  | K  CHAR  | 1    User field 34    |     |     | 332  332  |
| FU:35  | K  CHAR  | 1    User field 35    |     |     | 333  333  |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 37 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| FU:36  | K  CHAR  | 1    User field 36                                         |     |     | 334  334  |
| ------ | -------- | ---------------------------------------------------------- | --- | --- | --------- |
| FU:37  | K  CHAR  | 1    User field 37                                         |     |     | 335  335  |
| FU:38  | K  CHAR  | 1    User field 38                                         |     |     | 336  336  |
| FU:39  | K  CHAR  | 1    User field 39                                         |     |     | 337  337  |
| FU:40  | K  CHAR  | 1    User field 40                                         |     |     | 338  338  |
| FU:41  | K  CHAR  | 1    User field 41                                         |     |     | 339  339  |
| FU:42  | K  CHAR  | 1    User field 42                                         |     |     | 340  340  |
| FU:43  | K  CHAR  | 1    User field 43                                         |     |     | 341  341  |
| FU:44  | K  CHAR  | 1    User field 44                                         |     |     | 342  342  |
| FU:45  | K  CHAR  | 10    User field 45                                        |     |     | 343  352  |
| FU:46  | K  CHAR  | 10    User field 46                                        |     |     | 353  362  |
| FU:47  | K  CHAR  | 10    User field 47                                        |     |     | 363  372  |
| FU:48  | K  CHAR  | 10    User field 48                                        |     |     | 373  382  |
| FU:49  | K  CHAR  | 10    User field 49                                        |     |     | 383  392  |
| FU:50  | K  CHAR  | 10    User field 50                                        |     |     | 393  402  |
| FU:51  | K  CHAR  | 20    User field 51                                        |     |     | 403  422  |
| FU:52  | K  CHAR  | 20    User field 52                                        |     |     | 423  442  |
| FU:53  | K  CHAR  | 20    User field 53                                        |     |     |           |
|        |          | The shop floor terminal shows this field in the Comment 1  |     |     | 443  462  |
field
| FU:54  | K  CHAR  | 20    User field 54  |     |     |     |
| ------ | -------- | -------------------- | --- | --- | --- |
463  482
The shop floor terminal shows this field in the Comment 2
field.
| FU:55  | K  CHAR  | 20    User field 55  |     |     | 483  502  |
| ------ | -------- | -------------------- | --- | --- | --------- |
| FU:56  | K  CHAR  | 20    User field 56  |     |     | 503  522  |
| FU:57  | K  CHAR  | 20    User field 57  |     |     | 523  542  |
| FU:58  | K  CHAR  | 20    User field 58  |     |     | 543  562  |
| FU:59  | K  CHAR  | 20    User field 59  |     |     | 563  582  |
| FU:60  | K  CHAR  | 20    User field 60  |     |     | 583  602  |
| FU:61  | K  CHAR  | 20    User field 61  |     |     | 603  622  |
| FU:62  | K  CHAR  | 20    User field 62  |     |     | 623  642  |
| FU:63  | K  CHAR  | 20    User field 63  |     |     | 643  662  |
| FU:64  | K  CHAR  | 20    User field 64  |     |     | 663  682  |
| FU:65  | K  CHAR  | 40    User field 65  |     |     | 683  722  |
| FU:66  | K  CHAR  | 40    User field 66  |     |     | 723  762  |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 38 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

ERP Interface with Additional Data
Specific data for coil-based production
Segment name: HY72_AG_RF_001_A
This segment depends on the operation, i.e. the data transferred here populate operation-specific fields in
HYDRA. You require this data, if you use the MPL module for coil-based manufacturing.
Field name V T L D Description From To
ANR S CHAR 40 Combined order/OP number 1 40
RFAGTYP  K CHAR 1 Special indicator; type of the operation: 41 41
" " No special processing
"P" Packing operation; required in
combination with the central weighing
function.
RFABZ MM CHAR 1 Identifies mother and child OPs for a planned 42 42
branch.
"M“ Mother operation of a planned branch
"K“ Child OP of a planned branch, which
will be confirmed/uploaded in a special
goods movement (531) at the goods
issue.
The indicator should only then be set to "K" if
the planned branches must really be
confirmed/uploaded as special goods
movement.
RFOPT:RS MM CHAR 1 Indicator roll cutting (only relevant if this is a 43 43
cutting OP)
" “ No cutting OP
"T“ Cutting OP with numbering of
daughter rolls (batch number has 15
digits: 10 digits+"-"+4-digit index)
"M“ Cutting OP with numbering of mother
rolls; this leads to further mother rolls
(batch number has 10 digits).
RFMANR MM CHAR 40 In coil cutting, this reference to the mother OP 44 83
is used to define the cutting plan.
An OP that does not reference to a
mother OP must generally refer to
itself.
Please note: the HYDRA order ID must be
configured.
RFTRANZ MM NUMC 5 In case of cutting operations: Number of 84 88
planned daughter coils per cut. Corresponds to
the planned output batches of the operation.
If the cutting plan is not defined, 0 is entered
here.
RFTRANZSUM MM NUMC 5 For cutting operations (mother OP): number of 89 93
planned daughter coils per cut (encompassing
all branched off material). No specific
processing in HYDRA.
If the cutting plan is not defined, 0 is entered
here.
RFRANZ MM NUMC 6 Planned total number of coils to be produced 94 99
(mother and daughter coils); no specific
processing in HYDRA.
EIS-ERP_82.docx Version: 1.3.23503 Page 39 of 64

ERP Interface with Additional Data
Field name V T L D Description From To
RFSTKF MM NUMC 8 Surface of a piece of the article to be produced. 100 107
Unit: MM2/ PCE (integer)
RFBSBRS MM DEC 10 3 Total seam width in mm 108 119
If several coils are produced at the same time in
one operation, this field includes the sum total
of the separate seam widths.
For the planned branches the seam width of the
single operation (no summaries) is explicitly set
for each operation ("mother" and "child" OPs).
Unit: MM
RFBREITEE MM DEC 10 3 Input width of operation 120 131
Unit: MM
RFBREITEA MM DEC 10 3 Output width of operation 132 143
Width of one coil within an operation.
For the planned branches the initial width of the
single operation (no summaries) is explicitly set
for each operation ("mother" and "child" OPs).
Unit: MM
RFAGVFA MM DEC 10 3 Mass per unit area 144 155
Unit: G/M2
Casing weight K DEC 10 3 Specifies the casing weight of the daughter 156 167
coils for cutting operations.
Unit: G
Order network
Segment name: HY72_ANETZ_001_A
HY72_ANETZ_001_D
This segment is a global segment used for several orders. Use this segment to define global relationships
for several orders. These relationships are respected during planning in the HYDRA shop floor scheduling
(HLS) and/or during processing (e.g. target quantity update, if enabled) when the affected operations are
planned and/or entered . Data can only be transferred if the transferred orders and/or their operations
already exist in HYDRA.
Field V T L D Description
Preceding OP S CHAR 40 Combined order/ OP number of the predecessor OP
Succeeding OP S CHAR 40 Combined order/ OP number of the successor OP
AOB S CHAR 2 "ES" by default
Only end/start relations are supported.
You may not transfer relationships between adjacent operations of an order. Relationships are
neither supported for split operations and for merged operations and may therefore not be set.
EIS-ERP_82.docx Version: 1.3.23503 Page 40 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

You need the license HLS-KAN if you want to integrate these relationships in the HYDRA Shop
Floor Scheduling module (HLS).

Production variants
| Segment name:  |     |     | HY72_FERTVAR_001_A  |     |     |
| -------------- | --- | --- | ------------------- | --- | --- |
HY72_FERTVAR_001_D

Use this segment to enter / edit production variants in HYDRA. If configured accordingly , these variants
are integrated when identifying production variants as part of the order transfer.
| Field     | V  T     | L  D Description                       |     |     |     |
| --------- | -------- | -------------------------------------- | --- | --- | --- |
| Version   | S  CHAR  | 10    Version                          |     |     |     |
| Status    | M  CHAR  | 1    Status of the production variant  |     |     |     |
F = Released
S = Blocked
| Article  | S  CHAR  | 40    Article  |     |     |     |
| -------- | -------- | -------------- | --- | --- | --- |
Material type  S  CHAR  10    Material type; blank by default (currently not processed)
| Machine  | S  CHAR  | 8    Machine  |     |     |     |
| -------- | -------- | ------------- | --- | --- | --- |
| Group    | S  CHAR  | 8    Group    |     |     |     |
Number (machine)  K  DEC  13  3  Number of machines; "1" by default (currently not processed)
| Resource  | M  CHAR  | 40    Resource.   |     |     |     |
| --------- | -------- | ----------------- | --- | --- | --- |
Note: The default resource is always assigned the resource type WNR.
Resource family  K  CHAR  18    Resource family (currently not processed)
| Number (resource)  | K  NUM  | 8    Number of resources  |     |     |     |
| ------------------ | ------- | ------------------------- | --- | --- | --- |
Target cycle  K  NUM  8    Target cycle in [seconds/ 1000 cycles]
| Partitioning             | K  DEC    | 13  3  Partitioning                     |     |     |     |
| ------------------------ | --------- | --------------------------------------- | --- | --- | --- |
| Setup time               | K  NUM    | 8    Setup time (seconds)               |     |     |     |
| Teardown/retooling time  | K  NUM    | 8    Teardown/retooling time (seconds)  |     |     |     |
| Data ID                  | SA  CHAR  | 15    Data ID                           |     |     |     |
| Comment                  | K  CHAR   | 50    Comment                           |     |     |     |
| Priority                 | M  NUMC   | 1    Priority                           |     |     |     |
| Valid from               | K  DATE   | 10    Valid from (MM/DD/YYYY)           |     |     |     |
| Valid until              | K  DATE   | 10    Valid until (MM/DD/YYYY)          |     |     |     |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 41 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | ----------------------------------- | --- |

6  Uploading data types: HYDRA --> ERP
| Type  |     | Description  |     |     |
| ----- | --- | ------------ | --- | --- |
CHAR x  Information is left-aligned for the data type CHAR; unnecessary places are filled with
blanks.
Example: "ABCD    "
NUM x  Numeric field of the length x without sign. Numbers are right-aligned; unnecessary
places are filled with zeros.
Example: "00000002"
DEC_O x.y  Numeric field of the length x and y decimal places. An algebraic sign is preceding the
data field (“+” or “-“). Places that are not required are filled with zeros. There is NO
DECIMAL SEPARATOR.
e.g. DEC_O 13,3:
|       |   -1234567890,123                             |  -1234567890123  |     |     |
| ----- | ---------------------------------------------- | ----------------- | --- | --- |
|       |   234567890,3                                 |  +0234567890300  |     |     |
| DATE  | The date is displayed in the YYYYMMDD format.  |                   |     |     |
The field is filled with blanks (if it is not required).
| TIME  | The time is transferred in the HHMMSS format.  |     |     |     |
| ----- | ---------------------------------------------- | --- | --- | --- |
The field is populated with "000000".

Generally, HYDRA always transfers a contiguous data structure. Data fields that are not used are filled
with blanks. The following definitions apply if you use the file port:
Each data record included in the file has to be completed by 'CR' (U+000D) and 'LF' (U+000A) for
Windows and 'LF' (U+000A) for Unix.
HYDRA expects the file to be in the UTF-8 format and HYDRA also uses this format for uploads. On
request, the file transfer may also be performed in the file format that was used until MW 2.0.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     | Page 42 of 64  |
| ---------------- | --- | ------------------- | --- | -------------- |

ERP Interface with Additional Data
7 Operation-related Uploads HYDRA => ERP
Overview


The system uses an individual IDOC with different interface record types (SATZART field in the interface
record) to transfer the operation-related uploads recorded in HYDRA to the ERP system. There are two
different interface record types:
 Uploads based on operations (SATZART/record type = "A")
All data records relating to operations are uploaded using the interface record type "A". HYDRA uses
a separate entry record type to manage these data records (see e.g. the MOC application Order-
related postings). This indicator allows for the records assigned to the interface record type "A" to be
differentiated in more detail. The following entry record types are uploaded:
 Interruption of an operation (postings of the entry record type "U" (STEUER field in the interface
record); is also performed at the end of the shift if the automatic shift function is active).
 Completion of an operation (postings of entry record type "E" (STEUER_KZ field in the interface
record)).
A data record where quantities, processing duration and RPA are not filled out is transferred for each
posting relating to orders (interruption, completion) when it comes to operations that are subject to
batch management. These data records only transfer the labor utilization of this order. When finishing
the order, the data record indicates that the order has actually been finished.
Quantities and times are uploaded in separate data records that are generated in HYDRA while the
output batch is changed.
 Personal upload (SATZART/record type = "P")
If HYDRA is customized accordingly, you can also upload the "B" records that are managed in
HYDRA for the single persons. To do so, use the interface record type "P".
Data is provided at regular intervals (by default approx. every 60 minutes) in the HYDRA subdirectory
./inf_int/interf (standard system). This directory is located in the HYDRA directory or in the system
directory in case of a multi-system environment.
EIS-ERP_82.docx Version: 1.3.23503 Page 43 of 64

|     |     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

Data relevant to operations, such as quantities or times, are posted in the ERP system. The ERP system
manages and processes wrong postings separately.
The following specifications result for the IDOC:
| Message type:  |     | HY72ADRCK_TT          |     |     |     |     |
| -------------- | --- | --------------------- | --- | --- | --- | --- |
| IDOC type:     |     | HY72ADRCK_TT          |     |     |     |     |
| File name:     |     | HY72ADRCK_TIMETICKET  |     |     |     |     |
File extension  According to configuration in MLE communication (Logical systems >
Outbound Configuration File Port)
Usually: .dat

It might be the case that negative yield quantities are posted when finishing the operation,
provided that part quantities are reported (requires customization services by MPDV) and data
is collected at the same time via the total quantity counter on machines working with HYDRA-

MDE. Remove the parameter /NEG_MENGE from the myerprck.scr script, provided that the
ERP system does not intend to post negative quantities.
An "S" (cancellation) entered in the ERFART field indicates corrected postings. You can find this
value in the Input type field  of the maintenance of postings. Provided that corrections are
uploaded, the system uploads the canceled values as absolute values (without algebraic signs),

i.e. with an "S" in the ERFART field.

Data structure
|   Field  | T  L  | D  Description   |     |     |     | From To16  |
| -------- | ----- | ---------------- | --- | --- | --- | ---------- |
15
| SART    | CHAR  1  |   Interface record type  |                                   |                    |                       | 1  1  |
| ------- | -------- | ------------------------ | --------------------------------- | ------------------ | --------------------- | ----- |
|         |          | "A“                      | uploads based on operations       |                    |                       |       |
|         |          | "P“                      | uploads based on persons          |                    |                       |       |
| ERFART  | CHAR  1  |   Origin                 |                                   |                    |                       | 2  2  |
|         |          | "  "                     | Original data record as recorded  |                    |                       |       |
|         |          | "E"                      | data  record                      | created  manually  | in  the  maintenance  | of    |
postings dialog (edited)
|     |     | "S"  | Cancellation for ERP   |     |     |     |
| --- | --- | ---- | ---------------------- | --- | --- | --- |

15 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
16 See footnote of column "From“

| EIS-ERP_82.docx  |     |     | Version: 1.3.23503  |     |     | Page 44 of 64  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

ERP Interface with Additional Data
Field T L D Description From To16
15
RMNR CHAR 40 Upload/confirmation number (if available in HYDRA) 3 42
ANR CHAR 40 Order number 43 82
The exact length that is uploaded/confirmed depends on how the
lengths are configured for the order or operation in the HYDRA basic
parameter settings.
AUART CHAR 5 Order type of the order; according to HYDRA configuration 83 87
STEUER_KZ CHAR 1 Control indicator of the operation status when being recorded. The 88 88
indicator depends on the record type of the ADE log record.
"L“ OP is running (record type “A”)
"E“ OP is finished (record type “E”)
"U“ OP is interrupted (record type “U”, "T", "H")
Please note: - If you use split OPs, the system uploads/confirms the
status of the split master.- The value of this field is not defined for
personal uploads.
AG_STATUS CHAR 5 Operation status when the ERP upload is being performed, according 89 93
to the HYDRA configuration.
SCHICHTNR NUM 2 Shift according to the shift model assigned to the work center during 94 95
which the BDE posting was made. The shift number is right-aligned.
PERSZEIT DEC_O 10 2 Personal processing time (hours) 96 106
For postings of the interface record type "A":
If this posting record is a U record (interrupt order) or E
record (log off order), this field includes the labor time
recorded since this record is available. This field includes
the logon times of all persons who have logged on to this
operation.
This field does not include a duration, if it is a T record
(reporting part quantities/partial upload), H record (batch
posting) or an operation logon.
For postings of the interface record type "P":
The field includes the length of time a person was logged
on to an order. If a person is logged on to several
orders/operations simultaneously, the field shows the
proportionate labor time per order/operation. The
distribution is made proportionally according to the number
of operations to which the person is/was logged on at the
same time (proportionate labor time).
Resource Performance Accounts (RPA)
Times are posted to "resource performance accounts". All times refer
to the last confirmation/upload performed for the respective
operation.
The system returns order-related RPAs for postings based on orders
(interface record type "A").
The system returns personal RPAs for personal postings (record type
"P").
RPA01 DEC_O 7 2 Resource Performance Account (RPA) 1 in hours 107 114
RPA02 DEC_O 7 2 Resource Performance Account (RPA) 2 in hours 115 122
RPA03 DEC_O 7 2 Resource Performance Account (RPA) 3 in hours 123 130
RPA04 DEC_O 7 2 Resource Performance Account (RPA) 4 in hours 131 138
RPA05 DEC_O 7 2 Resource Performance Account (RPA) 5 in hours 139 146
RPA06 DEC_O 7 2 Resource Performance Account (RPA) 6 in hours 147 154
RPA07 DEC_O 7 2 Resource Performance Account (RPA) 7 in hours 155 162
RPA08 DEC_O 7 2 Resource Performance Account (RPA) 8 in hours 163 170
RPA09 DEC_O 7 2 Resource Performance Account (RPA) 9 in hours 171 178
RPA10 DEC_O 7 2 Resource Performance Account (RPA) 10 in hours 179 186
EIS-ERP_82.docx Version: 1.3.23503 Page 45 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

|   Field  | T  L  | D  Description   |     |     | From To16  |
| -------- | ----- | ---------------- | --- | --- | ---------- |
15
RPA11  DEC_O  7  2    Resource Performance Account (RPA) 11 in hours
|     |     |                     |                                                         |     |           |
| --- | --- | ------------------- | ------------------------------------------------------- | --- | --------- |
|     |     |                     | RPA 11 contains the production time (standard use/main  |     |           |
|     |     | utilization time).  |                                                         |     | 187  194  |
RPA12  DEC_O  7  2    Resource Performance Account (RPA) 12 in hours.
|     |     |     |                                                    |     |           |
| --- | --- | --- | -------------------------------------------------- | --- | --------- |
|     |     |     | RPA 12 contains neutral times (breaks or similar)  |     | 195  202  |
BMK_SUM  DEC_O  7  2  Total of resource performance accounts without breaks (RPA 12) in
|        |          | hours       |     |     |           |
| ------ | -------- | ----------- | --- | --- | --------- |
|        |          |             |     |     | 203  210  |
| FIRMA  | CHAR  4  |   reserved  |     |     |           |
211  214

GRUPPE  CHAR  8    Group where the workplace/machine is assigned to.
|         |           |                                              |     |     | 215  222  |
| ------- | --------- | -------------------------------------------- | --- | --- | --------- |
| ARBPL   | CHAR  8   |   Workplace/machine this posting refers to.  |     |     |           |
|         |           |                                              |     |     | 223  230  |
| PERSNR  | CHAR  10  |   Personnel number.                          |     |     |           |
  This data field includes the personnel number of the employee who
logged on/off or interrupted the operation. In case of personal
postings, this field includes the personnel number of the person for
whom data is uploaded/confirmed.
The precise length depends on the length configuration of the
|     |     | personnel number in the basic parameter settings of HYDRA.  |     |     | 231  240  |
| --- | --- | ----------------------------------------------------------- | --- | --- | --------- |
LOHNART  CHAR  4    Wage type if stored to the operation. Is directly taken over from the
|     |     | operation .  |     |     | 241  244  |
| --- | --- | ------------ | --- | --- | --------- |
GUT_BAS  DEC_O  13  3  Basic quantity of yield, if entered or calculated according to
|     |     | conversion factors.  |     |     | 245  258  |
| --- | --- | -------------------- | --- | --- | --------- |

AUS_BAS  DEC_O  13  3  Basic quantity of scrap, if entered or calculated according to
|     |     | conversion factors.  |     |     | 259  272  |
| --- | --- | -------------------- | --- | --- | --------- |
MEINH_BAS  CHAR  3    Basic quantity of the quantity unit, if stored to the operation.
273  275

| GUT_PRI  | DEC_O  13  | 3  Collected yield in primary quantity unit  |     |     |     |
| -------- | ---------- | -------------------------------------------- | --- | --- | --- |
  Yield recorded in primary quantity unit since the last upload.  276  289
AUS_PRI  DEC_O  13  3  Scrap quantity collected in primary quantity unit since the last upload.
|     |     |     |     |     | 290  303  |
| --- | --- | --- | --- | --- | --------- |
MEINH_PRI  CHAR  3    Primary unit of entry (primary quantity unit) from the operation.
|     |     |            |     |     | 304  306  |
| --- | --- | ---------- | --- | --- | --------- |
|     |     |   Reasons  |     |     |           |
Reasons are only transferred if the option “confirmation of partial
confirmations” is enabled for the order type and only in case of record
|        |          | type “T” postings. Otherwise the fields are empty.  |     |     |           |
| ------ | -------- | --------------------------------------------------- | --- | --- | --------- |
| GUTGR  | CHAR  4  |   Yield reason (deviation reason)                   |     |     |           |
|        |          |                                                     |     |     | 307  310  |
GUTGR_EXT  CHAR  5      Yield reason (deviation reason) – external reference
311  315

| AUSGR      | CHAR  4  |   Scrap reason  |                                    |     |           |
| ---------- | -------- | --------------- | ---------------------------------- | --- | --------- |
|            |          |                 |                                    |     | 316  319  |
| AUSGR_EXT  | CHAR  5  |                 | Scrap reason – external reference  |     |           |
|            |          |                 |                                    |     | 320  324  |
ASTATUS  CHAR  1    Order status (control indicator of the order header status)
  This data field shows the status of an order. When finishing the last
recordable operation of an order, this field has the value "E" (end),
otherwise "L" (running). The value of this field is not defined for
|     |     | personal confirmations/uploads.  |     |     | 325  325  |
| --- | --- | -------------------------------- | --- | --- | --------- |
ANMELD_DAT  DATE  8    Date of the terminal posting (login) in the format YYYYMMDD
|     |     |     |     |     | 326  333  |
| --- | --- | --- | --- | --- | --------- |
ANMELD_ZEIT  TIME  6    Time of the terminal posting (login) in the format HHMMSS
334  339

| EIS-ERP_82.docx  |     |     | Version: 1.3.23503  |     | Page 46 of 64  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

|   Field  | T  L  | D  Description   |     |     | From To16  |
| -------- | ----- | ---------------- | --- | --- | ---------- |
15
ABMELD_DAT  DATE  8    Date of the terminal posting (logoff) in the format YYYYMMDD
|     |     |     |     |     | 340  347  |
| --- | --- | --- | --- | --- | --------- |
ABMELD_ZEIT  TIME  6    Time of the terminal posting (logoff) in the format HHMMSS
348  353

CHARGE  CHAR  20    Batch number only relevant in connection with ADE-CHV or MPL
|     |     |     |     |     | 354  373  |
| --- | --- | --- | --- | --- | --------- |
BED_POS  CHAR  10    Entered operator position/function according to the HYDRA
|     |     | configuration, if entered  |     |     | 374  383  |
| --- | --- | -------------------------- | --- | --- | --------- |
LPKZ  CHAR  10    Entered wage/premium indicator according to the HYDRA
|     |     | configuration, if entered  |     |     | 384  393  |
| --- | --- | -------------------------- | --- | --- | --------- |
SOLL_TE  DEC_O  7  2  Target te from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 394  401  |
| --- | --- | ----------- | --- | --- | --------- |
SOLL_TR  DEC_O  7  2  Target tr from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 402  409  |
| --- | --- | ----------- | --- | --- | --------- |

SOLL_TEB  DEC_O  7  2  Target teb from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 410  417  |
| --- | --- | ----------- | --- | --- | --------- |
SOLL_TRB  DEC_O  7  2  Target trb from the log record (only filled if the LLE-BP license is
|     |     | available)  |     |     | 418  425  |
| --- | --- | ----------- | --- | --- | --------- |

| EIS-ERP_82.docx  |     |     | Version: 1.3.23503  |     | Page 47 of 64  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

ERP Interface with Additional Data
8 Inbound Transactions
Overview
HYDRA menu System administration  MES Link Enabling (MLE)  Inbound transactions
FEDRA menu System administration  MES Link Enabling (MLE)  Inbound transactions
Transaction code intr
Function authorization intr
intr.reset (reset transactions)
Purpose
Inbound transactions provide an overview of the data provided form other systems as well as the result of
the inbound processing that follows. The application allows for detailed data to be displayed or new
posting processes to be triggered.
Integration
The function allows for data transferred from other systems to be accessed. Other system might be:
 PPS/ERP systems
 Warehouse/material management systems
 Quality management systems
Field Descriptions
Field Descriptions – Inbound Transactions
Transaction number
Unique number that is generated while communicating with the external system.
Status
The status represents the result of the last processing step. The used status are visualized as
follows:
Description in the application Color Meaning / usage
NEW Yellow The record has been provided
initially. Further processing still
have to take place.
EIS-ERP_82.docx Version: 1.3.23503 Page 48 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

| Description in the application  |     | Color   |     | Meaning / usage  |                |               |
| ------------------------------- | --- | ------- | --- | ---------------- | -------------- | ------------- |
| TODO                            |     | Yellow  |     | It  has          | been  tried    | already,  to  |
|                                 |     |         |     | post  the        | record.  This  | attempt       |
has not been successful (for a
certain reason) – the record is
|     |     |     |     | available  | to  new  | posting  |
| --- | --- | --- | --- | ---------- | -------- | -------- |
attempt.
| REACTIVATED  |     | Orange  |     | A  record  | posted  already  | has  |
| ------------ | --- | ------- | --- | ---------- | ---------------- | ---- |
been marked for an additional
posting attempt.
| IN PROCESS  |     | Grey  |     | The record is posted currently.  |                |          |
| ----------- | --- | ----- | --- | -------------------------------- | -------------- | -------- |
| UNKNOWN     |     | Blue  |     | There                            | is  no  valid  | posting  |
routine for the record.
| DONE ERROR  |     | Red  |     | The record could not be posted  |     |     |
| ----------- | --- | ---- | --- | ------------------------------- | --- | --- |
successfully.
| DONE  |     | Green  |     | The  record  | could  | be  posted  |
| ----- | --- | ------ | --- | ------------ | ------ | ----------- |
successfully.

IDoc type
IDoc type of the transaction (whether or not the field is filled out, depends on the communication type).
No. of data records
Number of data records included in the transaction
No. of edited DR (data records)
Number of successfully processed data records included in the transaction
No. of unknown data records
Number of unknown data records included in the transaction
No. of erroneous data records
Number of faulty data records included in the transaction (wrong processing)
Time of reception
Date and time when the system received the transaction
Editing time
Date and time when the transaction was edited in the system

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 49 of 64  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

ERP Interface with Additional Data
IDoc number
IDoc number of transactions (whether or not the field is filled out depends on the communication type).
Message type
Message type of the transaction
Message function
Message function of the transaction
SAP sending port
SAP sending port – only relevant if the communication with SAP is performed via IDoc
SAP sending partner type
SAP sending partner type – only relevant if the communication with SAP is performed via IDocs
SAP sending partner number
SAP sending partner number – only relevant if the communication with SAP is performed via IDocs
Receiver port
Receiver port – only relevant if the communication with SAP is performed via IDocs
Receiver partner type
Receiver partner type – only relevant if the communication with SAP is performed via IDocs
Receiver partner number
Receiver partner number – only relevant if the communication with SAP is performed via IDocs
Reference
Unique database key
Duration
Duration of system processing
Number of attempts
Number of processing attempts
Field Descriptions – Log Table
Application
Application involved in the processing and editing of the transaction
Log. System
Logical system
EIS-ERP_82.docx Version: 1.3.23503 Page 50 of 64

ERP Interface with Additional Data
Role
Role of the logical system
Designation
Designation of the application
Transaction number
Transaction number that has been processed
Status
Status of processing
Reference
Unique database key
Program
Technical name of the application
Program version
Program version of the application
Program date
Program date of the application
Log file name / log file size
Name and size of the log file
Error file name/error file size
Name and size of the error file
Data file name/data file size
Name and size of the data file
No. of data records
Number of data records included in the transaction
No. of edited data records
Number of successfully processed data records included in the transaction
No. of unknown data records
Number of unknown data records included in the transaction
No. of faulty data records
Number of faulty data records included in the transaction (wrong processing)
EIS-ERP_82.docx Version: 1.3.23503 Page 51 of 64

ERP Interface with Additional Data
Text number
Currently not used
Posting
Currently not used
Created on
Point in time when the entry was created
Toolbar
Reset transaction
The “reset transaction” button allows for a transaction that has already been processed to be processed
again. But this is only possible if the transaction has not yet been archived.
Data segments
Data segments may be displayed for a transaction. The system tries to display included application data
in relation to individual fields within the data record.
Log
Displays the log generated by the respective application.
Error file
Displays the error log generated by the respective application.
Data file
Displays the data file that is optionally generated by the respective application.
EIS-ERP_82.docx Version: 1.3.23503 Page 52 of 64

ERP Interface with Additional Data
9 Outbound Transactions
Overview
HYDRA menu System Administration  MES Link Enabling (MLE)  Outbound transactions
FEDRA menu System Administration  MES Link Enabling (MLE)  Outbound transactions
Transaction code outtr
Function authorization outtr
Purpose
Outbound transactions provide an overview of the data provided to other systems as well as the result of
the outbound processing that follows. The application allows for detailed data to be displayed or new
posting processes to be triggered.
Integration
The function allows for data transferred to other systems to be accessed. Other system might be:
 PPS/ERP systems
 Warehouse/material management systems
 Quality management systems
Field Descriptions
Field Descriptions – Outbound Transactions
Transaction number
Unique number that is generated while communicating with the external system.
Status
The status represents the result of the last processing step. The used status are visualized as
follows:
Description in the application Color Meaning / usage
NEW Yellow The record has been provided
initially. Further processing still
have to take place.
TODO Yellow It has been tried already, to
EIS-ERP_82.docx Version: 1.3.23503 Page 53 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

| Description in the application  |     | Color  |     | Meaning / usage  |                |          |
| ------------------------------- | --- | ------ | --- | ---------------- | -------------- | -------- |
|                                 |     |        |     | post  the        | record.  This  | attempt  |
has not been successful (for a
certain reason) – the record is
|     |     |     |     | available  | to  new  | posting  |
| --- | --- | --- | --- | ---------- | -------- | -------- |
attempt.
| REACTIVATED  |     | Orange  |     | A  record  | posted  already  | has  |
| ------------ | --- | ------- | --- | ---------- | ---------------- | ---- |
been marked for an additional
posting attempt.
| IN PROCESS  |     | Grey  |     | The record is posted currently.  |                |          |
| ----------- | --- | ----- | --- | -------------------------------- | -------------- | -------- |
| UNKNOWN     |     | Blue  |     | There                            | is  no  valid  | posting  |
routine for the record.
| DONE ERROR  |     | Red  |     | The record could not be posted  |     |     |
| ----------- | --- | ---- | --- | ------------------------------- | --- | --- |
successfully.
| DONE  |     | Green  |     |              |        |             |
| ----- | --- | ------ | --- | ------------ | ------ | ----------- |
|       |     |        |     | The  record  | could  | be  posted  |
successfully.

IDoc type
IDoc type of the transactions (whether or not the field is filled out, depends on the communication type).
No. of data records
Number of data records included in the transaction
No. of edited DR (data records)
Number of successfully processed data records included in the transaction
No. of unknown data records
Number of unknown data records included in the transaction
No. of erroneous data records
Number of faulty data records included in the transaction (wrong processing)
Time of reception
Date and time when the system received the transaction
Editing time
Date and time when the transaction was edited in the system

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 54 of 64  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

ERP Interface with Additional Data
IDoc number
IDoc number of transactions (whether or not the field is filled out depends on the communication type).
Message type
Message type of the transaction
Message function
Message function of the transaction
SAP sending port
SAP sending port – only relevant if the communication with SAP is performed via IDoc
SAP sending partner type
SAP sending partner type – only relevant if the communication with SAP is performed via IDocs
SAP sending partner number
SAP sending partner number – only relevant if the communication with SAP is performed via IDocs
Receiver port
Receiver port – only relevant if the communication with SAP is performed via IDocs
Receiver partner type
Receiver partner type – only relevant if the communication with SAP is performed via IDocs
Receiver partner number
Receiver partner number – only relevant if the communication with SAP is performed via IDocs
Reference
Unique database key
Duration
Duration of system processing
Number of attempts
Number of processing attempts
Field Descriptions – Log Table
Application
Application involved in the processing and editing of the transaction
Log. System
Logical system
EIS-ERP_82.docx Version: 1.3.23503 Page 55 of 64

ERP Interface with Additional Data
Role
Role of the logical system
Designation
Designation of the application
Transaction number
Transaction number that has been processed
Status
Status of processing
Reference
Unique database key
Program
Technical name of the application
Program version
Program version of the application
Program date
Program date of the application
Log file name / log file size
Name and size of the log file
Error file name/error file size
Name and size of the error file
Data file name/data file size
Name and size of the data file
No. of data records
Number of data records included in the transaction
No. of edited data records
Number of successfully processed data records included in the transaction
No. of unknown data records
Number of unknown data records included in the transaction
No. of faulty data records
Number of faulty data records included in the transaction (wrong processing)
EIS-ERP_82.docx Version: 1.3.23503 Page 56 of 64

ERP Interface with Additional Data
Text number
Currently not used
Posting
Currently not used
Created on
Point in time when the entry was created
Toolbar
Reset transaction
Use the “reset transaction” button to process a transaction that has already been processed. This is only
possible if the transaction has not yet been archived.
During reactivation, the control record of the transaction is set to the status REACTIVATED. The data
records included in the transaction are set to status TODO. Once the data records are transferred and are
then included in another transaction, there is no connection between the control record of the original
transaction and these data records – you cannot show data records for the original control record any
more.
Data segments
Data segments may be displayed for a transaction. The system tries to display included application data
in relation to individual fields within the data record.
Log
Displays the log generated by the respective application.
Error file
Displays the error log generated by the respective application.
Data file
Displays the data file that is optionally generated by the respective application.
EIS-ERP_82.docx Version: 1.3.23503 Page 57 of 64

ERP Interface with Additional Data
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
EIS-ERP_82.docx Version: 1.3.23503 Page 58 of 64

ERP Interface with Additional Data
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
EIS-ERP_82.docx Version: 1.3.23503 Page 59 of 64

|     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | ----------------------------------- | --- |

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

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     | Page 60 of 64  |
| ---------------- | --- | ------------------- | --- | -------------- |

ERP Interface with Additional Data
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
EIS-ERP_82.docx Version: 1.3.23503 Page 61 of 64

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

11 Modification to the Order of Uploads
Usage
Subject to the ERP system's way of processing, problems might occur when uploading time tickets to the
ERP system. Issue taken: Operations logged on after a shift change are transferred prior to operations
interrupted before the change of shifts.
Requirements
The upload program myerprck.exe/out as of version V8.1.1.99 or higher must be used.
Procedure
Add the following entry to the HYDRA INI configuration:
| Parameter name  |     |     | Value                        |     |     |
| --------------- | --- | --- | ---------------------------- | --- | --- |
| INI name        |     |     | SAP                          |     |     |
| Section         |     |     | TIMETICKET_UPLOAD            |     |     |
| Key             |     |     | ALTERNATIVE_ORDER_BY_CLAUSE  |     |     |
| Value           |     |     | <must remain empty>          |     |     |
| Active          |     |     | Yes                          |     |     |
| Comment         |     |     | Changed sorting order        |     |     |

Result
Once activated, uploads will be sorted and reported as follows:
| Sort sequence  |     | Comment  |     | Internal number17  |     |
| -------------- | --- | -------- | --- | ------------------ | --- |
| Logoff date    |     |          |     | 3                  |     |
| Logoff time    |     |          |     | 4                  |     |

17 Internal number refers to numbering used in the SQL program logic. The number is not relevant to the end user.

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 62 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

Internal number17
| Sort sequence  |     | Comment  |     |     |     |     |
| -------------- | --- | -------- | --- | --- | --- | --- |
Upload type (record type)  The following order applies for uploading  1
record types:
1.  operation logons
2.  cancelled operation logoffs
|     |     | 3.  cancelled  | partial  | uploads,  |     |     |
| --- | --- | -------------- | -------- | --------- | --- | --- |
interruptions to operations, batch
records (H records)
4.  Partial uploads
5.  Staff records (B records)
|     |     | 6.  interrupted  | operations,  | operation  |     |     |
| --- | --- | ---------------- | ------------ | ---------- | --- | --- |
logoffs, batch records (H records)
| Reference     |     |     |     |     | 5   |     |
| ------------- | --- | --- | --- | --- | --- | --- |
| Order number  |     |     |     |     | 6   |     |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     |     | Page 63 of 64  |
| ---------------- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     | ERP Interface with Additional Data  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

12 Test Files
Overview
Attached to this documentation, you will find test files for the interface EIS-ERP. The attachment is only
available, if the documentation is in PDF format.
The documentation Open PDF attachments describes how to call the attached test files.
The following test files are attached to the PDF document:
| File  |     | Type  | Comment  |     |     |
| ----- | --- | ----- | -------- | --- | --- |
HY72ADRCK_TIMETICKET.DAT  Outbound  Sample  file  for  the  operation-related  upload
|     |     | processing  | HYDRA --> ERP in HYDRA standard format  |     |     |
| --- | --- | ----------- | --------------------------------------- | --- | --- |
HY72PPS.DAT  Inbound  Sample file for the transfer of order data ERP -->
|     |     | processing  | HYDRA in HYDRA standard format  |     |     |
| --- | --- | ----------- | ------------------------------- | --- | --- |

| EIS-ERP_82.docx  |     | Version: 1.3.23503  |     |     | Page 64 of 64  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |