Oder Data ERP --> HYDRA
1 Order Data ERP --> HYDRA
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
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 1 of 31

Oder Data ERP --> HYDRA
 The operation is still in the online data set when transferred again (update).
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
1 If the last operation of an order is deleted via the MOC, the order header is not automatically deleted.
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 2 of 31

Oder Data ERP --> HYDRA
Data record definition
Order-related data is transferred for each production order in a multi-level IDOC. This IDOC structure is
as follows:
The structures that belong to the individual segments are presented in the following. The individual
columns have the following meaning:
Column Description
Field Name of the field
V (usage) S Key field clearly identifying the data record. (Further key fields might be required). The field
must be populated.
M Mandatory field which must be populated with a valid value.
ML Mandatory field if the HYDRA Shop Floor Scheduling is used (HLS).
MM Mandatory field if the HYDRA Material and Production Logistics (MPL and/or MPL/RF) is
used.
K Field may stay empty (optional field).
SA Mandatory field if the Arburg control system (SCS-ALS) is in use; otherwise optional field.
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 3 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |
| --- | --- | --- | --- | ------------------------ |

| Column    | Description             |     |     |     |
| --------- | ----------------------- | --- | --- | --- |
| T(ype)    | Data type of the field  |     |     |     |
| L(ength)  | Field length            |     |     |     |
For fields of data type DEC: Total number of digits without decimal separator and algebraic sign.
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description   | Field description and/or comments on the field.  |     |     |     |
| ------------- | ------------------------------------------------ | --- | --- | --- |

Segments to create/modify data
The following specifications arise for the IDOC:
| Message type /  |             |          |     |     |
| --------------- | ----------- | -------- | --- | --- |
| file name:      |             | HY72PPS  |     |     |
| Message         | functions/  | DAT2     |     |     |
file extensions:
| Segments:  |     | HY72_AU_HD_001_A (order header)  |     |     |
| ---------- | --- | -------------------------------- | --- | --- |
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

2 HYDRA inbound processing discards the file extension "DAT" (importing the file and storage in MLE inbound
transactions). The MLE inbound transactions display a data record of such a file without message function.

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 4 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

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

3 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
4 See footnote of column "From“

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 5 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D  Description   |     |     | Fro To4  |
| ------ | ----- | ------------------- | --- | --- | -------- |
m3
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
DATTERMB  K  DATE  10    Scheduled start (date)  If scheduling is run outside  337  346
HYDRA, the scheduled
ZEITERMB  K  TIME  5    Scheduled start (time)  dates of the order (header)  347  351
should be transferred.
DATTERME  K  DATE  10    Scheduled end (date)  Note: For the processing,  352  361
these dates are only used
| ZEITERME  | K  TIME  | 5    Scheduled end (time)  |     |     | 362  366  |
| --------- | -------- | -------------------------- | --- | --- | --------- |
for information purposes in
HYDRA.
If scheduling is performed
in HYDRA, these fields are
overwritten.
TERMART  K  CHAR  1    Scheduling type; mandatory field if scheduling is to be  367  367
made in HYDRA.
(V=forward scheduling, R=backward scheduling)
REDSTRAT  K  CHAR  2    Reduction strategy, according to configuration.  368  369
| AUGRP     | K  CHAR  | 4    Order group               |     |     | 370  373  |
| --------- | -------- | ------------------------------ | --- | --- | --------- |
| DISP      | K  CHAR  | 10    MRP controller           |     |     | 374  383  |
| PRJNR     | K  CHAR  | 25    Project number           |     |     | 384  408  |
| PLANAUNR  | K  CHAR  | 25    Planned order            |     |     | 409  433  |
| KTR       | K  CHAR  | 25    Cost object              |     |     | 434  458  |
| APNR      | K  CHAR  | 40    Work plan                |     |     | 459  498  |
| APVER     | K  CHAR  | 12    Work plan version        |     |     | 499  510  |
| SLVER     | K  CHAR  | 12    BOM version              |     |     | 511  522  |
| KLKK:MNR  | K  DEC   | 13  3  Calc. costs - machines  |     |     | 523  537  |
| KLKK:L    | K  DEC   | 13  3  Calc. costs - payroll   |     |     | 538  552  |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 6 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D  Description   |     |     | Fro To4  |
| ------ | ----- | ------------------- | --- | --- | -------- |
m3
| KLKK:MAT     | K  DEC  | 13  3  Calc. costs - material  |     |     | 553  567  |
| ------------ | ------- | ------------------------------ | --- | --- | --------- |
| KLKK:SONST   | K  DEC  | 13  3  Calc. costs - other     |     |     | 568  582  |
| MATWERT:GUT  | K  DEC  | 13  3  Material value          |     |     | 583  597  |
| MATWERT:AUS  | K  DEC  | 13  3  Scrap value             |     |     | 598  612  |
ANR.KBN:LBEZID  K  CHAR  15    eKANBAN control cycle  613  627
This field is available as of the MLE variant HY72PPS_018
ATKIDX  K  CHAR  50    Order information  Order header (AK)  Drawing issue  628  677
number
This field is available as of BDE82 and MLE version
HY72PPS_023.

In HYDRA the order type controls the global behavior of an order. The entered order type must
exist in HYDRA and be entirely configured.

Long texts of the order header
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
| INFO:1  | K  CHAR  | 80    Info text 1  |     |     |     |
| ------- | -------- | ------------------ | --- | --- | --- |
| INFO:2  | K  CHAR  | 80    Info text 2  |     |     |     |
| INFO:3  | K  CHAR  | 80    Info text 3  |     |     |     |
| INFO:4  | K  CHAR  | 80    Info text 4  |     |     |     |
| INFO:5  | K  CHAR  | 80    Info text 5  |     |     |     |
| INFO:6  | K  CHAR  | 80    Info text 6  |     |     |     |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 7 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field    | V  T     | L  D Description    |     |     |     |
| -------- | -------- | ------------------- | --- | --- | --- |
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
To allow for a consistent data exchange between the ERP system and HYDRA, the customer
|     | must ensure that the user field keys are identical in both systems.  |     |     |     |     |
| --- | -------------------------------------------------------------------- | --- | --- | --- | --- |

| Field  | V  T     | L  D Description    |     |     | From5T o6  |
| ------ | -------- | ------------------- | --- | --- | ---------- |
| AUNR   | S  CHAR  | 40    Order number  |     |     | 1  40      |
USRFLD  S  CHAR  8    User field key. The user field key must be configured in the
41  48
system.
| FU:1  | K  DATE  | 10    User field 1  |     |     | 49  58  |
| ----- | -------- | ------------------- | --- | --- | ------- |
| FU:2  | K  DATE  | 10    User field 2  |     |     | 59  68  |
| FU:3  | K  DATE  | 10    User field 3  |     |     | 69  78  |
| FU:4  | K  DATE  | 10    User field 4  |     |     | 79  88  |
| FU:5  | K  DATE  | 10    User field 5  |     |     | 89  98  |

5 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
6 See footnote of column "From“

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 8 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T     | L  D Description      |     |     | From5T o6  |
| ------ | -------- | --------------------- | --- | --- | ---------- |
| FU:6   | K  DATE  | 10    User field 6    |     |     | 99  108    |
| FU:7   | K  NUM   | 8    User field 7     |     |     | 109  116   |
| FU:8   | K  NUM   | 8    User field 8     |     |     | 117  124   |
| FU:9   | K  NUM   | 8    User field 9     |     |     | 125  132   |
| FU:10  | K  NUM   | 8    User field 10    |     |     | 133  140   |
| FU:11  | K  NUM   | 8    User field 11    |     |     | 141  148   |
| FU:12  | K  NUM   | 8    User field 12    |     |     | 149  156   |
| FU:13  | K  NUM   | 8    User field 13    |     |     | 157  164   |
| FU:14  | K  NUM   | 8    User field 14    |     |     | 165  172   |
| FU:15  | K  NUM   | 8    User field 15    |     |     | 173  180   |
| FU:16  | K  NUM   | 8    User field 16    |     |     | 181  188   |
| FU:17  | K  NUM   | 8    User field 17    |     |     | 189  196   |
| FU:18  | K  NUM   | 8    User field 18    |     |     | 197  204   |
| FU:19  | K  NUM   | 8    User field 19    |     |     | 205  212   |
| FU:20  | K  NUM   | 8    User field 20    |     |     | 213  220   |
| FU:21  | K  NUM   | 8    User field 21    |     |     | 221  228   |
| FU:22  | K  NUM   | 8    User field 22    |     |     | 229  236   |
| FU:23  | K  DEC   | 13  3  User field 23  |     |     | 237  251   |
| FU:24  | K  DEC   | 13  3  User field 24  |     |     | 252  266   |
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

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 9 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T     | L  D Description     |     |     | From5T o6  |
| ------ | -------- | -------------------- | --- | --- | ---------- |
| FU:42  | K  CHAR  | 1    User field 42   |     |     | 340  340   |
| FU:43  | K  CHAR  | 1    User field 43   |     |     | 341  341   |
| FU:44  | K  CHAR  | 1    User field 44   |     |     | 342  342   |
| FU:45  | K  CHAR  | 10    User field 45  |     |     | 343  352   |
| FU:46  | K  CHAR  | 10    User field 46  |     |     | 353  362   |
| FU:47  | K  CHAR  | 10    User field 47  |     |     | 363  372   |
| FU:48  | K  CHAR  | 10    User field 48  |     |     | 373  382   |
| FU:49  | K  CHAR  | 10    User field 49  |     |     | 383  392   |
| FU:50  | K  CHAR  | 10    User field 50  |     |     | 393  402   |
| FU:51  | K  CHAR  | 20    User field 51  |     |     | 403  422   |
| FU:52  | K  CHAR  | 20    User field 52  |     |     | 423  442   |
| FU:53  | K  CHAR  | 20    User field 53  |     |     | 443  462   |
| FU:54  | K  CHAR  | 20    User field 54  |     |     | 463  482   |
| FU:55  | K  CHAR  | 20    User field 55  |     |     | 483  502   |
| FU:56  | K  CHAR  | 20    User field 56  |     |     | 503  522   |
| FU:57  | K  CHAR  | 20    User field 57  |     |     | 523  542   |
| FU:58  | K  CHAR  | 20    User field 58  |     |     | 543  562   |
| FU:59  | K  CHAR  | 20    User field 59  |     |     | 563  582   |
| FU:60  | K  CHAR  | 20    User field 60  |     |     | 583  602   |
| FU:61  | K  CHAR  | 20    User field 61  |     |     | 603  622   |
| FU:62  | K  CHAR  | 20    User field 62  |     |     | 623  642   |
| FU:63  | K  CHAR  | 20    User field 63  |     |     | 643  662   |
| FU:64  | K  CHAR  | 20    User field 64  |     |     | 663  682   |
| FU:65  | K  CHAR  | 40    User field 65  |     |     | 683  722   |
| FU:66  | K  CHAR  | 40    User field 66  |     |     | 723  762   |
Note
This data structure is only available with the respective license.

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 10 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |
| --- | --- | --- | --- | ------------------------ |

Order sequences
| Segment name:  |     |     | HY72_AFOLG_001_A  |     |
| -------------- | --- | --- | ----------------- | --- |
HY72_AFOLG_001_D

Only use this segment to transfer data if sequences are in use. This specification is made as part of the
customer project.
| Field  | V  T     | L  D Description             |     |     |
| ------ | -------- | ---------------------------- | --- | --- |
| AUNR   | S  CHAR  | 40    Order number           |     |     |
| AFOLG  | S  CHAR  | 6    Number of the sequence  |     |     |
Number of the sequence. Length as configured in the HYDRA basic settings,
left-aligned including leading zeros.
Sequence type "S": must be 0
Sequence type "P", "A": sequence number
| FOLGART  | S  CHAR  | 1    Sequence type:   |     |     |
| -------- | -------- | --------------------- | --- | --- |
S = master sequence
P = parallel sequence
A = alternative sequence
AKTIV  M  CHAR  1    Active; with alternative sequences J/N; otherwise always J
BEZK  K  CHAR  40    Short text/description of the sequence: comment field
VER  K  CHAR  12    Version; comment field; not processed in HYDRA
| BZGFOLG  | M  CHAR  | 10    Reference sequence.   |     |     |
| -------- | -------- | --------------------------- | --- | --- |
Number of the reference sequence this sequence refers to. Length as
configured in the HYDRA basic settings, left-aligned including leading zeros.
Sequence type "S": leave empty
Sequence type "A", "P": must always be 0.
ANRA  M  CHAR  40    Branch operation of the reference sequence; combined HYDRA order number
Sequence type "S": leave empty
ANRR  M  CHAR  40    Return OP of the reference sequence; combined HYDRA order number
Sequence type "S": leave empty

Operations – part 1
| Segment name:  |     |     | HY72_AG_HD_001_A  |     |
| -------------- | --- | --- | ----------------- | --- |
HY72_AG_HD_001_D

The operation segment includes the operation-based specifications for production and relevant data.

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 11 of 31

Oder Data ERP --> HYDRA
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
EXTPRIO M CHAR 1 Priority (0 - 9; 9 = priority high)
If the priority check is enabled for the order type, the
priority is always transferred from the order header to the 186 186
operations. Any deviating priorities of the operation are
ignored.
MNR M CHAR 8 Planned workplace
At least one of the fields MNR and/or MGRP must be
transferred. 187 194
When transferring the workplace, HYDRA identifies the
workplace's group according to the configuration to avoid
inconsistent data. The transferred group is then ignored.
7 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
8 See footnote of column "From“
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 12 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | From7T o8  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
MGRP  M  CHAR  8    Planned group and/or group of the workplace
At least one of the fields MNR and/or MGRP must be
transferred.
195  202
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
blank/ "M"/"G" OPT:PLAN is set to
blank
"G"
|     |     | not blank  | blank  |  OPT:PLAN is set  |     |
| --- | --- | ---------- | ------ | ------------------ | --- |
to "M"
 OPT:PLAN
|     |     | not blank  | "M"  |     |     |
| --- | --- | ---------- | ---- | --- | --- |
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
ASTUFE  K  CHAR  1    Authorization level to log in and off the OP (lowest  362  362
authorization = 1)
| RMNR  | K  CHAR  | 10    Confirmation/upload number  |     |     | 363  372  |
| ----- | -------- | --------------------------------- | --- | --- | --------- |
DATTERMB  K  DATE  10    Scheduled start (date)  If scheduling is run outside  373  382
HYDRA, the scheduled
| ZEITERMB  | K  TIME  | 5    Scheduled start (time)  |     |     | 383  387  |
| --------- | -------- | ---------------------------- | --- | --- | --------- |
dates of the operations
must be transferred from
DATTERME  K  DATE  10    Scheduled end (date)  the ERP system.  388  397
If scheduling is performed
ZEITERME  K  TIME  5    Scheduled end (time)  in HYDRA, these fields are
overwritten.
In HYDRA Shop Floor
|     |     |     |     | Scheduling (HLS), the  | 398  402  |
| --- | --- | --- | --- | ---------------------- | --------- |
operations are displayed in
the pool of groups of the
graphic planning board for
the scheduled start date.
DATFB  K  DATE  10    Earliest start (date)  If scheduling is run outside  403  412
of HYDRA, the scheduled
ZEIFB  K  TIME  5    Earliest start (time)  basic dates - if any - can  413  417
be transferred from the
DATSB  K  DATE  10    Latest start (date)  ERP system.  418  427
If scheduling is performed
| ZEISB  | K  TIME  | 5    Latest start (time)  |     |     | 428  432  |
| ------ | -------- | ------------------------- | --- | --- | --------- |
in HYDRA, these fields are
overwritten. The basic
DATFE  K  DATE  10    Earliest end (date)  dates result from forward  433  442
and backward scheduling
ZEIFE  K  TIME  5    Earliest end (time)  in HYDRA.  443  447
| DATSE  | K  DATE  | 10    Latest end (date)  |     |     | 448  457  |
| ------ | -------- | ------------------------ | --- | --- | --------- |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 13 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T     | L  D Description        |     |     | From7T o8  |
| ------ | -------- | ----------------------- | --- | --- | ---------- |
| ZEISE  | K  TIME  | 5    Latest end (time)  |     |     | 458  462   |
DATB  K  DATE  10    Planned start (date)  Planned start/ end date  463  472
that results from
| ZEIB  | K  TIME  | 5    Planned start (time)  |     |     | 473  477  |
| ----- | -------- | -------------------------- | --- | --- | --------- |
scheduling for the
workplace.
| DATE  | K  DATE  | 10    Planned end (date)  |     |     | 478  487  |
| ----- | -------- | ------------------------- | --- | --- | --------- |
If planning is performed in
HYDRA, these fields are
| ZEIE  | K  TIME  | 5    Planned end (time)  |     | overwritten.  |     |
| ----- | -------- | ------------------------ | --- | ------------- | --- |
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
613  615
applicable.
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
| OPT:UNTLI  | K  CHAR  | 1    Reaction to underdelivery  |     |     |     |
| ---------- | -------- | ------------------------------- | --- | --- | --- |
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

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 14 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field            | V  T    | L  D Description                |     |     | From7T o8  |
| ---------------- | ------- | ------------------------------- | --- | --- | ---------- |
| MENGEPROZ:UEBLI  | K  DEC  | 13  3  Overdelivery in percent  |     |     |            |
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
|     |     | basic quantity   |     |     | 688  695  |
| --- | --- | ---------------- | --- | --- | --------- |
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTS:N  K  NUM  8    Denominator for the conversion of secondary quantity to
basic quantity
696  703
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTT:Z  K  NUM  8    Numerator for the conversion of tertiary quantity to basic
quantity
704  711
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
UMRFAKTT:N  K  NUM  8    Denominator for the conversion of tertiary quantity to basic
|     |     | quantity   |     |     | 712  719  |
| --- | --- | ---------- | --- | --- | --------- |
MPL for coil-based manufacturing: see the note in the
UMRFAKTP:Z field
RUEZ  K  NUM  8    Setup time in seconds. If no setup time exists the value is
720  727
explicitly to be set to 0.
RUEZ:ZUSCHL  K  NUM  8    Additional setup time in seconds. Should be set to 0 if not
728  735
available.
BEARBZEI  K  NUM  8    Processing time in seconds. Should be set to 0 if not  736  743
available.
PZ  K  NUM  8    Inspection time in seconds. Should be set to 0 if not
744  751
available.

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 15 of 31

Oder Data ERP --> HYDRA
Field V T L D Description From7T o8
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
OPT:SNR MM CHAR 1 Serial numbers required (only relevant if serial numbers
are used)
"G" = Automatic generation of the serial number (only in
combination with MPL as batch number)
"S" = Automatic generation of the serial number using
number range (only in combination with MPL as batch 895 895
number)
"E" = Manual entry of the serial number
" “ or “N“ = serial numbers are not used
For details on the implementation/configuration of serial
numbers, see here.
SZY K NUM 8 Target cycle in seconds/ 1000; should be set; 896 903
mandatory for MDE cycle monitoring
TLG K NUM 8 Partitioning; should be pre-populated with 1 904 911
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 16 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | From7T o8  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
IMPFAKT  K  DEC  13  3  Pulse factor; only integer values allowed! Should be pre-
912  926
populated with 1 by default.
| OPT:SPLIT  | K  CHAR  | 1    May be split V/N                |     |     |           |
| ---------- | -------- | ------------------------------------ | --- | --- | --------- |
|            |          | V = Yes, operation may be split      |     |     |           |
|            |          | N = No, operation must not be split  |     |     | 927  927  |
|            |          | Please note:                         |     |     |           |
V only relevant for BDE-SSG, ADE-SPL, HLS-AGS,
N must be transferred in the other cases.
MAXANZSPLIT  K  NUM  8    Max. no. of splits. (only relevant if OPT:SPLIT = V)
928  935
MBVERH:RUE  K  DEC  5  2  Machine-operator relation: setup/ PEP workforce
936  942
requirements: setup
MBVERH:NORM  K  DEC  5  2  Machine-operator relation manufacturing/ PEP workforce  943  949
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
production resources and tools to HYDRA (no "delta download").

Use  of  the  HYDRA  shop  floor  scheduling  system  (HLS)  or  of  the  graphic  order
sequencing (BDE-GAV)

If the HYDRA shop floor scheduling (HLS) or the graphic order sequencing (BDE-GAV)
are used, you should consider the following issues for operations that are planned with
these applications:
You may only transfer operations planned for groups (OPT:PLAN= G). In this case, the

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 17 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

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

Long texts of the operation
| Segment name:  |     |     | HY72_AG_INFO_AI_001_A  |     |     |
| -------------- | --- | --- | ---------------------- | --- | --- |
HY72_AG_INFO_AI_001_D
Use the following structure to transfer text fields as additional information on the operation to HYDRA.
The texts are then displayed in the MOC. Each data record contains one page of a maximum of 10 lines
and 80 characters of text information each.
The long text of an operation is shown, e.g. in:

9 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
10 See footnote of column "From“

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 18 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

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

| Field  | V  T  | L  D Description   |     |     | Fro To12  |
| ------ | ----- | ------------------ | --- | --- | --------- |
m11
| ANR  | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40  |
| ---- | -------- | ------------------------------- | --- | --- | ------ |

11 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
12 See footnote of column "From“

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 19 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | Fro To12  |
| ------ | ----- | ------------------ | --- | --- | --------- |
m11
| ATK  | S  CHAR  | 40    Material number;   |     |     | 41  80  |
| ---- | -------- | ------------------------ | --- | --- | ------- |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ  | M  CHAR  | 40    Material designation/name  |     |     | 81  120   |
| ------- | -------- | -------------------------------- | --- | --- | --------- |
| BEZ     | K  CHAR  | 30    Comment 1                  |     |     | 121  150  |
| BEZ:2   | K  CHAR  | 30    Comment 2                  |     |     | 151  180  |
| SLP     | S  CHAR  | 10    BOM item                   |     |     |           |
MPL for coil-based manufacturing: item of the component
181  190
in the layer structure.
Each component must have a unique BOM item if several
components are used in one operation. Two components
must not have the same BOM item.
| SLS  | M  NUM  | 8    BOM level  |     |     |     |
| ---- | ------- | --------------- | --- | --- | --- |
Material components with the BOM level > 1 will always be
|     |     | saved under the material type "I" = info component.  |     |     | 191  198  |
| --- | --- | ---------------------------------------------------- | --- | --- | --------- |
If you log on input batches via material management
(MPL/TRT), you can only log on components of BOM level
0.
| ART  | MM  CHAR  | 2    Material type:  |                         |     |     |
| ---- | --------- | -------------------- | ----------------------- | --- | --- |
|      |           | "M"                  | (Consumption) material  |     |     |
199  200
|         |           | "T"                                                | Carrier material (only MPL-RF)     |     |           |
| ------- | --------- | -------------------------------------------------- | ---------------------------------- | --- | --------- |
|         |           | "A"                                                | Waste component (only MPL-RF)      |     |           |
|         |           | "Z"                                                | Additional material (only MPL-RF)  |     |           |
|         |           | "I"                                                | Info component                     |     |           |
| MATTYP  | MM  CHAR  | 10    MPL: Material type                           |                                    |     |           |
|         |           | If HYDRA MPL is used, enter a valid material type  |                                    |     | 201  210  |
configured in HYDRA.
otherwise: "SYSTEM"
| VERBR  | MM  CHAR  | 1    MPL: Consumption type  |     |     |     |
| ------ | --------- | --------------------------- | --- | --- | --- |
If not specified otherwise, assign "L" to this field.
211  211
For components of the material type "I" assign "N" to the
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
OPT:WZW  MM  CHAR  1    MPL: Change necessary; an input batch change for a
batch of this material requires an output batch change:
213  213
if ART = "T" or "Z" -> OPT:WZW must be "J"
if ART = "I" or "A" -> OPT:WZW must be "N"
if ART = "M" -> OPT:WZW: "J" or "N"
SGR:GUT  MM  DEC  13  3  MPL: Input quantity to produce 1 article in primary quantity  214  228
unit of the operation.
SGE:GUT  MM  CHAR  3    MPL: Quantity unit of the input quantity  229  231

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 20 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | Fro To12  |
| ------ | ----- | ------------------ | --- | --- | --------- |
m11
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
SLS:M  K  NUMC  8    BOM level of the parent material  295  302
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
|     |     | / MLE version HY72PPS_019):  |                                         |     | 346  346  |
| --- | --- | ---------------------------- | --------------------------------------- | --- | --------- |
|     |     | "J"                          | Automatic counter consumption enabled   |     |           |
|     |     | "N"                          | Automatic counter consumption disabled  |     |           |

If a material component changes (change of a material component) or if a production resource
and tool is changed (change of a tool), the ERP system must transfer the changed operation as
well as the complete material list and the complete list of the production resources and tools to
HYDRA (no "delta download").

Also see the notes in the "Operations" chapter.
During the data transfer to HYDRA, the first material transferred to HYDRA will be displayed in

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 21 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

the operation.

Component - user fields
| Segment name:  |     |     | HY72_AG_KOMPL_USRFLD_001_A  |     |     |
| -------------- | --- | --- | --------------------------- | --- | --- |

Use user fields to store further customer-specific information to HYDRA in addition to the fields that are
available by default. Use this segment to transfer this data from the ERP system to HYDRA and to store
this data in the component.
The so-called user field key specifies the available user fields and their meaning. Each user field key
describes a combination of user fields. The document Configuration_Userfields.pdf describes how to
configure the user field key.
To allow for a consistent data exchange between the ERP system and HYDRA, the customer
must ensure that the user field keys are identical in both systems.

| Field  | V  T  | L  D Description   |     |     | From To14  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
13
| ANR  | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40  |
| ---- | -------- | ------------------------------- | --- | --- | ------ |
| ATK  | S  CHAR  | 40    Material number;          |     |     |        |
41  80
alphabetic characters in CAPITAL LETTERS
| SLP  | S  CHAR  | 10    BOM item                                           |     |     |         |
| ---- | -------- | -------------------------------------------------------- | --- | --- | ------- |
|      |          | MPL for coil-based manufacturing: item of the component  |     |     | 81  90  |
in the layer structure.
USRFLD  S  CHAR  8    User field key. The user field key must be configured in the  91  98
system.
| FU:1  | K  DATE  | 10    User field 1  |     |     | 99  108   |
| ----- | -------- | ------------------- | --- | --- | --------- |
| FU:2  | K  DATE  | 10    User field 2  |     |     | 109  118  |
| FU:3  | K  DATE  | 10    User field 3  |     |     | 119  128  |
| FU:4  | K  DATE  | 10    User field 4  |     |     | 129  138  |
| FU:5  | K  DATE  | 10    User field 5  |     |     | 139  148  |

13 The indicated number of characters (digits) is calculated based on the exported field length and can be used as
reference for HYDRA application developers. It does not include the number of characters of the file itself but only
of the field SDATA.
14 See footnote of column "From“

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 22 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | From To14  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
13
| FU:6   | K  DATE  | 10    User field 6    |     |     | 149  158  |
| ------ | -------- | --------------------- | --- | --- | --------- |
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
| FU:36  | K  CHAR  | 1    User field 36    |     |     | 384  384  |
| FU:37  | K  CHAR  | 1    User field 37    |     |     | 385  385  |
| FU:38  | K  CHAR  | 1    User field 38    |     |     | 386  386  |
| FU:39  | K  CHAR  | 1    User field 39    |     |     | 387  387  |
| FU:40  | K  CHAR  | 1    User field 40    |     |     | 388  388  |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 23 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Field  | V  T  | L  D Description   |     |     | From To14  |
| ------ | ----- | ------------------ | --- | --- | ---------- |
13
| FU:41  | K  CHAR  | 1    User field 41   |     |     | 389  389  |
| ------ | -------- | -------------------- | --- | --- | --------- |
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
| Segment name:  |     |     | HY72_AG_FHM_001_A  |     |     |
| -------------- | --- | --- | ------------------ | --- | --- |
HY72_AG_FHM_001_D

If you want to use production resources and tools as resources in HYDRA, you also have to use the
HYDRA Tool and Resource Management (WRM) and/or of HYDRA DNC. If production resources and
tools are only displayed in the BDE module, you do not have to use WRM or DNC.

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 24 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |
| --- | --- | --- | --- | ------------------------ |

| Field   | K  T     | L    Description                      |                      |     |
| ------- | -------- | ------------------------------------- | -------------------- | --- |
| ANR     | S  CHAR  | 40    Combined order/OP number        |                      |     |
| RESTYP  | S  CHAR  | 4    Resource type; possible values:  |                      |     |
|         |          | DNC                                   | DNC program          |     |
|         |          | ENT                                   | removal device       |     |
|         |          | TEM                                   | temperature device   |     |
|         |          | VOR                                   | device               |     |
|         |          | WNR                                   | tool                 |     |
If you use the HYDRA tools and resources management
(WRM), you can define additional resource types (idents) in the
application's resource type configuration (Menu WRM: Master data
> Resource types).

| ATK  | S  CHAR  | 40    Resource/ material number;   |     |     |
| ---- | -------- | ---------------------------------- | --- | --- |
alphabetic characters in CAPITAL LETTERS
| ATKBEZ   | K  CHAR  | 40    Designation      |     |     |
| -------- | -------- | ---------------------- | --- | --- |
| BEZ      | K  CHAR  | 30    Comment 1        |     |     |
| BEZ:2    | K  CHAR  | 30    Comment 2        |     |     |
| SGR:GUT  | M  DEC   | 13  3  Input quantity  |     |     |
Please note: The quantity of a production resource and tool that is to be
checked in the HYDRA shop floor scheduling module (license: HLS-BSR) is
generally assumed to be 1, if 0 has been transferred here.
| SGE:GUT  | K  CHAR  | 3    Quantity unit  |     |     |
| -------- | -------- | ------------------- | --- | --- |

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
Use the option "automatic creation" in the Resource types configuration to make sure that
production resources and tools of a resource type are created automatically as resource,
provided that they do not yet exist in the system (only relevant if the WRM product group (Tool
and Resource Management) is in use).

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 25 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

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
USRFLD  S  CHAR  8    User field key. The user field key must be configured in the
41  48
system.
| FU:1  | K  DATE  | 10    User field 1  |     |     | 49  58  |
| ----- | -------- | ------------------- | --- | --- | ------- |
| FU:2  | K  DATE  | 10    User field 2  |     |     |         |
59  68
| FU:3  | K  DATE  | 10    User field 3  |     |     | 69  78  |
| ----- | -------- | ------------------- | --- | --- | ------- |
| FU:4  | K  DATE  | 10    User field 4  |     |     | 79  88  |
| FU:5  | K  DATE  | 10    User field 5  |     |     | 89  98  |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 26 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| FU:6   | K  DATE  | 10    User field 6    |     |     | 99  108   |
| ------ | -------- | --------------------- | --- | --- | --------- |
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
| FU:36  | K  CHAR  | 1    User field 36    |     |     | 334  334  |
| FU:37  | K  CHAR  | 1    User field 37    |     |     | 335  335  |
| FU:38  | K  CHAR  | 1    User field 38    |     |     | 336  336  |
| FU:39  | K  CHAR  | 1    User field 39    |     |     | 337  337  |
| FU:40  | K  CHAR  | 1    User field 40    |     |     |           |
338  338
| FU:41  | K  CHAR  | 1    User field 41  |     |     | 339  339  |
| ------ | -------- | ------------------- | --- | --- | --------- |
| FU:42  | K  CHAR  | 1    User field 42  |     |     | 340  340  |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 27 of 31

|     |     |     |     |     | Oder Data ERP --> HYDRA  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| FU:43  |     | K  CHAR  1   |   User field 43  |     |     | 341  341  |
| ------ | --- | ------------ | ---------------- | --- | --- | --------- |
| FU:44  |     | K  CHAR  1   |   User field 44  |     |     | 342  342  |
| FU:45  |     | K  CHAR  10  |   User field 45  |     |     | 343  352  |
| FU:46  |     | K  CHAR  10  |   User field 46  |     |     | 353  362  |
| FU:47  |     | K  CHAR  10  |   User field 47  |     |     | 363  372  |
| FU:48  |     | K  CHAR  10  |   User field 48  |     |     | 373  382  |
| FU:49  |     | K  CHAR  10  |   User field 49  |     |     | 383  392  |
| FU:50  |     | K  CHAR  10  |   User field 50  |     |     | 393  402  |
| FU:51  |     | K  CHAR  20  |   User field 51  |     |     | 403  422  |
| FU:52  |     | K  CHAR  20  |   User field 52  |     |     | 423  442  |
| FU:53  |     | K  CHAR  20  |   User field 53  |     |     |           |
443  462
The shop floor terminal shows this field in the Comment 1
field
| FU:54  |     | K  CHAR  20  |   User field 54  |     |     |     |
| ------ | --- | ------------ | ---------------- | --- | --- | --- |
463  482
The shop floor terminal shows this field in the Comment 2
field.
| FU:55  |     | K  CHAR  20  |   User field 55  |     |     | 483  502  |
| ------ | --- | ------------ | ---------------- | --- | --- | --------- |
| FU:56  |     | K  CHAR  20  |   User field 56  |     |     | 503  522  |
| FU:57  |     | K  CHAR  20  |   User field 57  |     |     | 523  542  |
| FU:58  |     | K  CHAR  20  |   User field 58  |     |     | 543  562  |
| FU:59  |     | K  CHAR  20  |   User field 59  |     |     | 563  582  |
| FU:60  |     | K  CHAR  20  |   User field 60  |     |     | 583  602  |
| FU:61  |     | K  CHAR  20  |   User field 61  |     |     | 603  622  |
| FU:62  |     | K  CHAR  20  |   User field 62  |     |     | 623  642  |
| FU:63  |     | K  CHAR  20  |   User field 63  |     |     | 643  662  |
| FU:64  |     | K  CHAR  20  |   User field 64  |     |     | 663  682  |
| FU:65  |     | K  CHAR  40  |   User field 65  |     |     | 683  722  |
| FU:66  |     | K  CHAR  40  |   User field 66  |     |     | 723  762  |

Specific data for coil-based production
| Segment name:  |     |     | HY72_AG_RF_001_A  |     |     |     |
| -------------- | --- | --- | ----------------- | --- | --- | --- |

This segment depends on the operation, i.e. the data transferred here populate operation-specific fields in
HYDRA. You require this data, if you use the MPL module for coil-based manufacturing.
| Field name  |     | V  T     | L  D  Description               |     |     | From To  |
| ----------- | --- | -------- | ------------------------------- | --- | --- | -------- |
| ANR         |     | S  CHAR  | 40    Combined order/OP number  |     |     | 1  40    |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 28 of 31

Oder Data ERP --> HYDRA
Field name V T L D Description From To
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
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 29 of 31

Oder Data ERP --> HYDRA
Field name V T L D Description From To
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
You need the license HLS-KAN if you want to integrate these relationships in the HYDRA Shop
Floor Scheduling module (HLS).
Production variants
Segment name: HY72_FERTVAR_001_A
HY72_FERTVAR_001_D
MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481 Page 30 of 31

|     |     |     |     | Oder Data ERP --> HYDRA  |
| --- | --- | --- | --- | ------------------------ |

Use this segment to enter / edit production variants in HYDRA. If configured accordingly , these variants
are integrated when identifying production variants as part of the order transfer.
| Field     | V  T     | L  D Description                       |     |     |
| --------- | -------- | -------------------------------------- | --- | --- |
| Version   | S  CHAR  | 10    Version                          |     |     |
| Status    | M  CHAR  | 1    Status of the production variant  |     |     |
F = Released
S = Blocked
| Article  | S  CHAR  | 40    Article  |     |     |
| -------- | -------- | -------------- | --- | --- |
Material type  S  CHAR  10    Material type; blank by default (currently not processed)
| Machine  | S  CHAR  | 8    Machine  |     |     |
| -------- | -------- | ------------- | --- | --- |
| Group    | S  CHAR  | 8    Group    |     |     |
Number (machine)  K  DEC  13  3  Number of machines; "1" by default (currently not processed)
| Resource  | M  CHAR  | 40    Resource.   |     |     |
| --------- | -------- | ----------------- | --- | --- |
Note: The default resource is always assigned the resource type WNR.
Resource family  K  CHAR  18    Resource family (currently not processed)
| Number (resource)  | K  NUM  | 8    Number of resources  |     |     |
| ------------------ | ------- | ------------------------- | --- | --- |
Target cycle  K  NUM  8    Target cycle in [seconds/ 1000 cycles]
| Partitioning             | K  DEC    | 13  3  Partitioning                     |     |     |
| ------------------------ | --------- | --------------------------------------- | --- | --- |
| Setup time               | K  NUM    | 8    Setup time (seconds)               |     |     |
| Teardown/retooling time  | K  NUM    | 8    Teardown/retooling time (seconds)  |     |     |
| Data ID                  | SA  CHAR  | 15    Data ID                           |     |     |
| Comment                  | K  CHAR   | 50    Comment                           |     |     |
| Priority                 | M  NUMC   | 1    Priority                           |     |     |
| Valid from               | K  DATE   | 10    Valid from (MM/DD/YYYY)           |     |     |
| Valid until              | K  DATE   | 10    Valid until (MM/DD/YYYY)          |     |     |

MBL_ERP_Implementation_MF_Down.docxVersion: 1.44.23481  Page 31 of 31