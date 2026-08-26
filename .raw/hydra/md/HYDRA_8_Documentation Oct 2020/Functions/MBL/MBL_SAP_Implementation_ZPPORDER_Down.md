Production order data PPS system --> HYDRA
1 Production order data SAP system  HYDRA
Data to the production order are generally transferred completely with all corresponding information (series
of operations, components etc.) and thus in a self-contained way to HYDRA (download).
When transferring a production order to HYDRA this order could – according to this – already be available
and have been transferred because of a modification or a new creation is concerned. The procedure of the
transfer to HYDRA is described in detail in the following chapters.
Creating/modifying data
All data that are relevant for HYDRA are completely summarized to a IDOC and transferred to HYDRA via
the message function (= file extension) “APP” at the interface for the transfer of production orders.
Such an IDOC
 contains one production orders with
 segments which are divided hierarchically and contain the single data.
When transferring the order data from the SAP system to HYDRA it should be taken into consideration that
these data are transmitted to HYDRA in a specific sequence in case of an initial data transfer. This means
that the order data described in the following chapters have to be transferred to HYDRA in the
sequence/hierarchy that is given there. The sequence can be chosen arbitrarily within one transfer stage,
for example the series of operations 0200 can be transmitted prior to the series of operations 0100.
Modifications to series of operations having the status “running”, “finished” or “deleted” are not allowed in
the standard of HYDRA.
Generally, HYDRA always expects a coherent data structure, which means that unused data fields have to
be assigned to default values specified according to the convention.
Deleting data
A deletion download deletes those operations that are no longer necessary in the production process from
the HYDRA database.
As with the modifications, the deletion result depends on the operation's status. Operations identified as
"Running", "Interrupted", "Finished" or "Deleted", will not be deleted.
Moreover, the confirmation number (CONF_NO) will be checked to identify the orders via order, sequence
and transaction. This prevents any accidental deletion of orders that are seemingly the same but which
have different confirmation numbers.
MBL_SAP_Implementation_ZPPORDER_Down.docxVersion: 1.10.18680
Page 1 of 21

Production order data PPS system --> HYDRA
Order and operation data is deleted using the E2BP_PP_PDC_OPERA1000 segment that is derived from
SAP standard interface PP-PDC. The segments contains the keys of the operation to be deleted.
MBL_SAP_Implementation_ZPPORDER_Down.docxVersion: 1.10.18680
Page 2 of 21

Production order data PPS system --> HYDRA
IDOC structure
Order-related data are transferred per production order in a multi-stage IDOC which has the following
structure:
The following specifications result from this for the IDOC:
MBL_SAP_Implementation_ZPPORDER_Down.docxVersion: 1.10.18680
Page 3 of 21

Production order data PPS system --> HYDRA
Message type: ZPPORDER
Idoc type: ZPPORDER02
Message functions: APP (creating/deleting data)
DEL (deleting data)
Segments: Z2AU_HD000X000 (order header)
├ Z2AU_INFO_AI000X000 (long texts)
├ Z2AU_USRFLD000X000 (user fields)
├ Z2AG_HD000X000 (data of series of operations)
│ ├ Z2AG_KOMPL000X000 (Components list)
│ ├ Z2AG_KOMPL_USRFLD000X000
│ ├ Z2AG_FHM000X000 (production resources and tools/resources
│ ├ Z2AG_DOC000X000 (documents)
│ ├ Z2AG_INFO_AI000X000 (long texts)
│ ├ Z2AG_USRFLD000X000 (user fields)
│ └ Z2AG_RF000X000 (MPL-RF-specific data)
├ Z2AG_ANETZ000X000 (order network)
├ Z2MD_PRODVAR000X000 (production variants)
└ E2BP_PP_PDC1000 (delete operations)
For creation of the segments for HYDRA inbound, the needed segments in the ALE-development
(in SAP) must be defined in the scheme: Z1<segment name>. When versioning in SAP the
segments are created in the form: Z2<segment name><version>.
Example: Z1AU_HD000X will result in Z2AU_HD000X000
The structures belonging to the single segments are described as follows. The single columns have the
following meaning:
Column Meaning
Field Designation of the field
V(use) S It is a key field which identifies the data record clearly if needed together with other fields
characterized as key fields. The field must be filled.
M It is a mandatory field which has to be filled.
ML Mandatory field if the control center of HYDRA is used (HLS).
MM Mandatory field if the material and production logistics of HYDRA is used (MPL or MPL/RF).
K Field is allowed to stay empty.
T(type) Data type according to the description in the chapter above.
L(length) Field length
for fields of the data type DEC: total number of places, without decimal point and algebraic sign.
D(decimal places) For fields of the data type DEC: number of places after decimal point, otherwise: not relevant
Description Description of the field or comment to the field
Header (Z2AU_HD000X000)
MBL_SAP_Implementation_ZPPORDER_Down.docxVersion: 1.10.18680
Page 4 of 21

|     |     |     |   Production order data PPS system --> HYDRA  |     |
| --- | --- | --- | --------------------------------------------- | --- |

| Field  | V  T     | L  D  Description   |     |     |
| ------ | -------- | ------------------- | --- | --- |
| AUNR   | S  CHAR  | 12    Order number  |     |     |
| AUART  | M  CHAR  | 5    Order type     |     |     |
Fix „0“
| ATK  | M  CHAR  | 40    Producing material (Article);   |     |     |
| ---- | -------- | ------------------------------------- | --- | --- |
alphabetical characters in the UPPER CASE
| ATKBEZ   | K  CHAR  | 40    Designation of the article    |     |     |
| -------- | -------- | ----------------------------------- | --- | --- |
| KDBEZ    | K  CHAR  | 40    Designation of the customer   |     |     |
| KDAUNR   | K  CHAR  | 25    Customer order                |     |     |
| KDAUPOS  | K  CHAR  | 15    Customer order position       |     |     |
| EXTPRIO  | M  CHAR  | 1    Priority                       |     |     |
| AUIDX    | K  DEC   | 5  2  Order index; should be 0.00.  |     |     |
Information: According to the description of the data type it should be
considered that an algebraic sign and a decimal point have to be
supplemented to the length that is indicated here. This is valid for all following
fields of the data type DEC.
| SGE_B  | M  CHAR  | 3    Base quantity unit  |     |     |
| ------ | -------- | ------------------------ | --- | --- |
SGR_GUTB  M  DEC  13  3  Target quantity (base quantity unit)
SGR_AUSB  K  DEC  13  3  Target scrap (base quantity unit)
MATTYP  M  CHAR  20    Material type (configured in HYDRA) of the producing material (article)
CNR  K  CHAR  20    Batch number, no processing in HYDRA
PCNR  K  CHAR  20    Inspection order/inspection lot number
| PPKTTYP  | K  CHAR   | 1    Physical-sample category  |     |     |
| -------- | --------- | ------------------------------ | --- | --- |
| DATFB    | ML  DATE  | 8    Earliest start (date)     |     |     |
 SAP: Start BasicDates
| ZEIFB  | ML  TIME  | 6    Earliest start (time)  |     |     |
| ------ | --------- | --------------------------- | --- | --- |
 SAP: Start BasicDates ()
Please note: 240000 is not allowed; use instead 235959
| DATSE  | ML  DATE  | 8    Latest end (date)  |     |     |
| ------ | --------- | ----------------------- | --- | --- |
 SAP: Finish BasicDates
| ZEISE  | ML  TIME  | 6    Latest end (time)  |     |     |
| ------ | --------- | ----------------------- | --- | --- |
 SAP: Finish BasicDates
Please note: 240000 is not allowed; use instead 235959
DATTERMB  K  DATE  8    Scheduled start (date)  If the scheduling takes place out of
  HYDRA the scheduled dates of the order
(header) are supposed to be transferred.
| ZEITERMB  | K  TIME  | 6    Scheduled start (time)  |     |     |
| --------- | -------- | ---------------------------- | --- | --- |
Information: These dates only have an

informational character as to the
Please note: 240000 is not  processing in HYDRA.
allowed; use instead 235959
If the scheduling is effected in HYDRA
these fields are overwritten.
| DATTERME  | K  DATE  | 8    Scheduled end (date)  |     |     |
| --------- | -------- | -------------------------- | --- | --- |

| ZEITERME  | K  TIME  | 6    Scheduled (time)  |     |     |
| --------- | -------- | ---------------------- | --- | --- |

Please note: 240000 is not
allowed; use instead 235959
TERMART  K  CHAR  1    Scheduling type. Mandatory field if the scheduling is supposed to take place in
|     |     | HYDRA.        |     |     |
| --- | --- | ------------- | --- | --- |
|     |     |  V = Forward  |     |     |
 R = Backward
REDSTRAT  K  CHAR  2      Reduction strategy. According to HYDRA Customizing
AUGRP  K  CHAR  4    Order group belongs to "production scheduler" in SAP
| DISP  | K  CHAR  | 10    MRP controller  |     |     |
| ----- | -------- | --------------------- | --- | --- |
PRJNR  K  CHAR  25    Project number; belongs to the WBS number in SAP
| PLANAUNR  | K  CHAR  | 25    Planned order  |     |     |
| --------- | -------- | -------------------- | --- | --- |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 5 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T     | L  D  Description   |     |
| ------ | -------- | ------------------- | --- |
| KTR    | K  CHAR  | 25    Cost object   |     |
| APNR   | K  CHAR  | 40    Working plan  |     |
APVER  K  CHAR  12    Working plan planned order version
| SLVER       | K  CHAR  | 12    Bill of material version    |     |
| ----------- | -------- | --------------------------------- | --- |
| KLKK_MNR    | K  DEC   | 13  3  Calculated costs machine   |     |
| KLKK_L      | K  DEC   | 13  3  Calculated costs wage      |     |
| KLKK_MAT    | K  DEC   | 13  3  Calculated costs material  |     |
| KLKK:SONST  | K  DEC   | 13  3  Calculated costs other     |     |
| MATWERT_G   | K  DEC   | 13  3  Material value             |     |
UT
| MATWERT_A | K  DEC  | 13  3  Scrap value  |     |
| --------- | ------- | ------------------- | --- |
US
| KBN:LBEZID  | K  CHAR  | 15    eKANBAN logical system  |     |
| ----------- | -------- | ----------------------------- | --- |
| ATKIDX      | K  CHAR  | 50    Drawing issue number    |     |

Long texts of the order (Z2AU_INFO_AI000X000)
Text fields that are displayed at the HYDRA console can be transferred to HYDRA as additional information
to the order (header) by means of the following structure. Each data record contains one page with max.
10 lines and 80 characters text information each.
Information
This data structure is only available in connection with the license HYD-INF or HKMPP-INF.

| Field  | V  T     | L  D  Description            |     |
| ------ | -------- | ---------------------------- | --- |
| KEY    | S  CHAR  | 12    Order number           |     |
| TYP    | S  CHAR  | 2    Record type; fix: "AI"  |     |
SUBKEY_1  S  NUM  8    Reserved; assign fix to "00000000"
SUBKEY_2  S  NUM  8    Consecutive numbering starting with "00000001" within the key
INFO_BEZ  K  CHAR  20    Short text. If it is left empty the first 20 lines of info text 1 are adopted
| INFO_1   | K  CHAR  | 80    Info text 1   |     |
| -------- | -------- | ------------------- | --- |
| INFO_2   | K  CHAR  | 80    Info text 2   |     |
| INFO_3   | K  CHAR  | 80    Info text 3   |     |
| INFO_4   | K  CHAR  | 80    Info text 4   |     |
| INFO_5   | K  CHAR  | 80    Info text 5   |     |
| INFO_6   | K  CHAR  | 80    Info text 6   |     |
| INFO_7   | K  CHAR  | 80    Info text 7   |     |
| INFO_8   | K  CHAR  | 80    Info text 8   |     |
| INFO_9   | K  CHAR  | 80    Info text 9   |     |
| INFO_10  | K  CHAR  | 80    Info text 10  |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 6 of 21

    Production order data PPS system --> HYDRA

User fields of the order header (Z2AU_USRFLD000X000)
User fields offer the possibility to file further customer-specific information in HYDRA besides the fields that
are available in the HYDRA standard. The segment Z2AU_USRFLD000X000 serves for the transfer of
these data from the SAP system to HYDRA and for assigning them to the order (header).
What user fields are concerned here and which meaning they have is determined via the so-called user
field key. Each user field key describes a combination of user fields. The customer-specific configuration of
the user field key is carried out in the scope of the HYDRA customizing.
Information
When it comes to the data exchange of user fields between the SAP system and HYDRA the
customer has to guarantee that the user field keys are maintained equally in both systems so that a
consistent data exchange is possible between both systems.
This data structure is only available in connection with the license HYD-INF or HKMPP-INF.

| Field   | V  T     | L  D  Description     |     |
| ------- | -------- | --------------------- | --- |
| AUNR    | S  CHAR  | 12    Order number    |     |
| USRFLD  | S  CHAR  | 8    User field key   |     |
| FU_1    | K  DATE  | 8    User field 1     |     |
| FU_2    | K  DATE  | 8    User field 2     |     |
| FU_3    | K  DATE  | 8    User field 3     |     |
| FU_4    | K  DATE  | 8    User field 4     |     |
| FU_5    | K  DATE  | 8    User field 5     |     |
| FU_6    | K  DATE  | 8    User field 6     |     |
| FU_7    | K  NUM   | 8    User field 7     |     |
| FU_8    | K  NUM   | 8    User field 8     |     |
| FU_9    | K  NUM   | 8    User field 9     |     |
| FU_10   | K  NUM   | 8    User field 10    |     |
| FU_11   | K  NUM   | 8    User field 11    |     |
| FU_12   | K  NUM   | 8    User field 12    |     |
| FU_13   | K  NUM   | 8    User field 13    |     |
| FU_14   | K  NUM   | 8    User field 14    |     |
| FU_15   | K  NUM   | 8    User field 15    |     |
| FU_16   | K  NUM   | 8    User field 16    |     |
| FU_17   | K  NUM   | 8    User field 17    |     |
| FU_18   | K  NUM   | 8    User field 18    |     |
| FU_19   | K  NUM   | 8    User field 19    |     |
| FU_20   | K  NUM   | 8    User field 20    |     |
| FU_21   | K  NUM   | 8    User field 21    |     |
| FU_22   | K  NUM   | 8    User field 22    |     |
| FU_23   | K  DEC   | 13  3  User field 23  |     |
| FU_24   | K  DEC   | 13  3  User field 24  |     |
| FU_25   | K  DEC   | 13  3  User field 25  |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 7 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T     | L  D  Description     |     |
| ------ | -------- | --------------------- | --- |
| FU_26  | K  DEC   | 13  3  User field 26  |     |
| FU_27  | K  DEC   | 13  3  User field 27  |     |
| FU_28  | K  DEC   | 13  3  User field 28  |     |
| FU_29  | K  CHAR  | 1    User field 29    |     |
| FU_30  | K  CHAR  | 1    User field 30    |     |
| FU_31  | K  CHAR  | 1    User field 31    |     |
| FU_32  | K  CHAR  | 1    User field 32    |     |
| FU_33  | K  CHAR  | 1    User field 33    |     |
| FU_34  | K  CHAR  | 1    User field 34    |     |
| FU_35  | K  CHAR  | 1    User field 35    |     |
| FU_36  | K  CHAR  | 1    User field 36    |     |
| FU_37  | K  CHAR  | 1    User field 37    |     |
| FU_38  | K  CHAR  | 1    User field 38    |     |
| FU_39  | K  CHAR  | 1    User field 39    |     |
| FU_40  | K  CHAR  | 1    User field 40    |     |
| FU_41  | K  CHAR  | 1    User field 41    |     |
| FU_42  | K  CHAR  | 1    User field 42    |     |
| FU_43  | K  CHAR  | 1    User field 43    |     |
| FU_44  | K  CHAR  | 1    User field 44    |     |
| FU_45  | K  CHAR  | 10    User field 45   |     |
| FU_46  | K  CHAR  | 10    User field 46   |     |
| FU_47  | K  CHAR  | 10    User field 47   |     |
| FU_48  | K  CHAR  | 10    User field 48   |     |
| FU_49  | K  CHAR  | 10    User field 49   |     |
| FU_50  | K  CHAR  | 10    User field 50   |     |
| FU_51  | K  CHAR  | 20    User field 51   |     |
| FU_52  | K  CHAR  | 20    User field 52   |     |
| FU_53  | K  CHAR  | 20    User field 53   |     |
| FU_54  | K  CHAR  | 20    User field 54   |     |
| FU_55  | K  CHAR  | 20    User field 55   |     |
| FU_56  | K  CHAR  | 20    User field 56   |     |
| FU_57  | K  CHAR  | 20    User field 57   |     |
| FU_58  | K  CHAR  | 20    User field 58   |     |
| FU_59  | K  CHAR  | 20    User field 59   |     |
| FU_60  | K  CHAR  | 20    User field 60   |     |
| FU_61  | K  CHAR  | 20    User field 61   |     |
| FU_62  | K  CHAR  | 20    User field 62   |     |
| FU_63  | K  CHAR  | 20    User field 63   |     |
| FU_64  | K  CHAR  | 20    User field 64   |     |
| FU_65  | K  CHAR  | 40    User field 65   |     |
| FU_66  | K  CHAR  | 40    User field 66   |     |

Operation (Z2AG_HD000X000)
The operation-related production specifications and data are contained in the segment Z2AG_HD000X000.

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 8 of 21

|     |     |     |   Production order data PPS system --> HYDRA  |     |     |
| --- | --- | --- | --------------------------------------------- | --- | --- |

| Field  | V  T     | L  D  Description                   |     |     |     |
| ------ | -------- | ----------------------------------- | --- | --- | --- |
| AUNR   | S  CHAR  | 12    (Production-)Order number     |     |     |     |
|        | S  NUMC  | 6                                   |     |     |     |
| AFOLG  |          | Sequence                            |     |     |     |
| AGNR   | S  CHAR  | 4    Operation                      |     |     |     |
| UVGNR  | S  CHAR  | 4    Sub-operation (not supported)  |     |     |     |
| AART   | S  CHAR  | 5    Order type                     |     |     |     |
fix "0" production order
| AGBEZ  | M  CHAR  | 40    Designation of the operation  |     |     |     |
| ------ | -------- | ----------------------------------- | --- | --- | --- |
ATK  K  CHAR  40    Number of producing material; Article (number)
Alphabetical characters in UPPER CASE.
Remark: in HYDRA only 25 digits are displayed.

ATKBEZ  K  CHAR  40    Designation/ Description of the material/article
MATTYP  MM  CHAR  20    Material type of the article;
if HYDRA MPL is used according to the configuration of the material type
EXTPRIO  M  CHAR  1    Priority (0 - 9; 9 = high priority)
| MNR  | M  CHAR  | 8    Planned workplace  |     |     |     |
| ---- | -------- | ----------------------- | --- | --- | --- |
At least one of the fields MNR and/or MGRP must be transferred.
If the workplace is transferred, HYDRA will determine the workplace's group
according to the configuration in order to avoid inconsistent data. This means
that the transferred group will be ignored.
MGRP  M  CHAR  8    Planned group and/or group of the workplace
At least one of the fields MNR and/or MGRP must be transferred.
If no machine group is transferred, the system will determine automatically the
machine group using the transferred workplace.
| OPT_PLAN  | M  CHAR  | 1    Planned   |     |     |     |
| --------- | -------- | -------------- | --- | --- | --- |
 M - operation is planned (in detail) to the workplace
 G - operation is in the pool of (groups) (MNR empty)
Depending on the workplace (MNR field) - the indicator will be set internally
according to the following logic:
|     |     | Workplace   | Planned         | Result                         |     |
| --- | --- | ----------- | --------------- | ------------------------------ | --- |
|     |     | MNR         | OPT:PLAN        |                                |     |
|     |     | blank       | blank/ "M"/"G"  |  OPT:PLAN will be set to "G"   |     |
|     |     | not blank   | blank           |  OPT:PLAN will be set to "M"   |     |
|     |     | not blank   | "M"             |  OPT:PLAN will stay on "M"     |     |
|     |     | not blank   | "G"             |  OPT:PLAN will stay on "G"     |     |
RES_WNR  K  CHAR  40    (Main) tool; is displayed in versatile evaluations; if empty it is filled during the
FHM takeover (please see below).
RES_DNC  K  CHAR  40    NC-program; is displayed in versatile evaluations; if empty it if filled during the
FHM takeover (please see below).
RES_EMAT  K  CHAR  40    (Main) input material; is displayed in versatile evaluations; if empty it is filled
during the takeover of the components (please see below).
| COLOR  | K  CHAR  | 20    Color of the material  |     |     |     |
| ------ | -------- | ---------------------------- | --- | --- | --- |
KST  K  CHAR  8    Cost center; no processing in HYDRA (only information)
KART  K  CHAR  10    Cost type; no processing in HYDRA (only information)
ASTUFE  K  CHAR  1    Authorization level for logging on/logging off OPs (lowest authorization = 1)
| RMNR  | K  CHAR  | 10    Confirmation number  |     |     |     |
| ----- | -------- | -------------------------- | --- | --- | --- |
DATTERMB  K  DATE  8    Scheduled start (date)  If the scheduling takes place out of HYDRA the
scheduled dates of the series of operations have to
| ZEITERMB  | K  TIME  | 6    Scheduled start (time)   |     |     |     |
| --------- | -------- | ----------------------------- | --- | --- | --- |
be transferred from the SAP system.
Please note: 240000 is
not allowed; use instead  If the scheduling takes place in HYDRA these fields
are overwritten.
235959
| DATTERME  | K  DATE  | 8    Scheduled end (date)  |     |     |     |
| --------- | -------- | -------------------------- | --- | --- | --- |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
|     |     |     | Page 9 of 21  |     |     |
| --- | --- | --- | ------------- | --- | --- |

    Production order data PPS system --> HYDRA

| Field  | V  T  | L  D  Description  |     |
| ------ | ----- | ------------------ | --- |
ZEITERME  K  TIME  6    Scheduled end (time)   In the control center of HYDRA the series of
Please note: 240000 is  operations are displayed to the scheduled start date
not allowed; use instead  in the group list of the planning table.
235959
DATFB  K  DATE  8    Earliest start (date)  If the scheduling takes place out of HYDRA the
  scheduled basic dates – if available – can be
transferred from the SAP system.
| ZEIFB  | K  TIME  | 6    Earliest start (time)  |     |
| ------ | -------- | --------------------------- | --- |
If the scheduling is carried out in HYDRA these

fields are overwritten. The basic dates result from
Please note: 240000 is
the forward and backward scheduling in HYDRA.
not allowed; use instead
235959
| DATSB  | K  DATE  | 8    Latest start (date)  |     |
| ------ | -------- | ------------------------- | --- |

| ZEISB  | K  TIME  | 6    Latest start (time)  |     |
| ------ | -------- | ------------------------- | --- |

Please note: 240000 is
not allowed; use instead
235959
| DATFE  | K  DATE  | 8    Earliest end (date)  |     |
| ------ | -------- | ------------------------- | --- |

| ZEIFE  | K  TIME  | 6    Earliest end (time)  |     |
| ------ | -------- | ------------------------- | --- |

Please note: 240000 is
not allowed; use instead
235959
| DATSE  | K  DATE  | 8    Latest end (date)  |     |
| ------ | -------- | ----------------------- | --- |

| ZEISE  | K  TIME  | 6    Latest end (time)  |     |
| ------ | -------- | ----------------------- | --- |

| DATB  | K  DATE  | 8    Planned start (date)  |     |
| ----- | -------- | -------------------------- | --- |
Planned start/end date from the scheduling of the
work center.
| ZEIB  | K  TIME  | 6    Planned start (time)   |     |
| ----- | -------- | --------------------------- | --- |
If the planning is carried out in HYDRA these fields
Please note: 240000 is  are overwritten.
not allowed; use instead
235959
| DATE  | K  DATE  | 8    Planned end (date)   |     |
| ----- | -------- | ------------------------- | --- |
| ZEIE  | K  TIME  | 6    Planned end (time)   |     |
Please note: 240000 is
not allowed; use instead
235959
SGR_GUTB  K  DEC  13  3  Target quantity (base quantity unit)
SGR_GUTP  K  DEC  13  3  Target quantity (primary quantity unit)
SGR_GUTS  K  DEC  13  3  Target quantity (secondary quantity unit)
SGR_GUTT  K  DEC  13  3  Target quantity (tertiary quantity unit)
SGR_AUSB  K  DEC  13  3  Target scrap (base quantity unit)
SGR_AUSP  K  DEC  13  3  Target scrap (primary quantity unit)
SGR_AUSS  K  DEC  13  3  Target scrap (secondary quantity unit)
SGR_AUST  K  DEC  13  3  Target scrap (tertiary quantity unit)
| SGE_B  | K  CHAR  | 3    Base quantity unit                |     |
| ------ | -------- | -------------------------------------- | --- |
| SGE_P  | K  CHAR  | 3    Primary quantity unit of entry    |     |
| SGE_S  | K  CHAR  | 3    Secondary quantity unit of entry  |     |
| SGE_T  | K  CHAR  | 3    Tertiary quantity unit of entry   |     |
WEIGMENGE  K  DEC  13  3  Minimum send-ahead quantity (primary quantity unit)
| MENGEPROZ | K  DEC  | 13  3  Underdelivery in per cent  |     |
| --------- | ------- | --------------------------------- | --- |
_UNTLI

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 10 of 21

    Production order data PPS system --> HYDRA

| Field      | V  T     | L  D  Description                |     |
| ---------- | -------- | -------------------------------- | --- |
| OPT_UNTLI  | K  CHAR  | 1    Reaction to underdelivery   |     |
| MENGEPROZ  | K  DEC   | 13  3  Overdelivery in per cent  |     |
_UEBLI
| OPT_UEBLI  | K  CHAR  | 1    Reaction to overdelivery  |     |
| ---------- | -------- | ------------------------------ | --- |
UMRFAKTP_Z  K  NUM  8    Factor for conversion primary quantity  base quantity (counter)
UMRFAKTP_ K  NUM  8    Factor for conversion primary quantity  base quantity (denominator)
N
UMRFAKTS_Z  K  NUM  8    Factor for conversion secondary quantity  base quantity (counter)
UMRFAKTS_ K  NUM  8    Factor for conversion secondary quantity  base quantity (denominator)
N
UMRFAKTT_Z  K  NUM  8    Factor for conversion tertiary quantity  base quantity (counter)
UMRFAKTT_ K  NUM  8    Factor for conversion tertiary quantity  base quantity (denominator)
N
| RUEZ  | K  NUM  | 8    Setup time in seconds  |     |
| ----- | ------- | --------------------------- | --- |
RUEZ_ZUSC K  NUM  8    Addition of setup time in seconds
HL
| BEARBZEI   | K  NUM   | 8    Processing time in seconds  |     |
| ---------- | -------- | -------------------------------- | --- |
| PZ         | K  NUM   | 8    Inspection time in seconds  |     |
| ABRZ       | K  NUM   | 8    Teardown time in seconds    |     |
| LIZ        | K  NUM   | 8    Delivery time in seconds    |     |
| FREMDFERT  | K  CHAR  | 1    External processing OP J/N  |     |
RLZ_EXPR  K  CHAR  6    Formula pro calculating the estimated remaining processing time (formula 1)
Mainly relevant if the control center of HYDRA is used (HLS). Deviating
settings are possible within the scope of the customizing of HYDRA.
RLZ_EXPR2  K  CHAR  6    Remaining running time (formula 2); optional (leave empty)
| VLZ  | K  NUM  | 8    Lead  time in seconds  |     |
| ---- | ------- | --------------------------- | --- |
LIEZ_MAX  K  NUM  8    Max. synchronization time in seconds
| WARTZ      | K  NUM   | 8    Wait time in seconds             |     |
| ---------- | -------- | ------------------------------------- | --- |
| WARTZ_MIN  | K  NUM   | 8    Minimal waiting time in seconds  |     |
| LIEZ       | K  NUM   | 8    Idle period in seconds           |     |
| LART       | K  CHAR  | 4    Wage type                        |     |
AKKORD  K  CHAR  1    Piece rate indicator/piece-rate premium
TE  K  DEC  13  3  Premium specification te in seconds per 1000 pieces
| TR  | K  DEC  | 13  3  Premium specification tr in seconds  |     |
| --- | ------- | ------------------------------------------- | --- |
TEB  K  DEC  13  3  Premium specification teb in seconds per 1000 pieces
TRB  K  DEC  13  3  Premium specification trb in seconds
| VERARBCOD | M  CHAR  | 6    Processing code; fix "SYSTEM"  |     |
| --------- | -------- | ----------------------------------- | --- |
E  Deviating settings are possible within the scope of the customizing of HYDRA.
| OPT_ERF  | M  CHAR  | 1    Can be entered J/N  |     |
| -------- | -------- | ------------------------ | --- |
OPT_MULTIM M  CHAR  1    Operation can be logged on parallel on different workplaces
NR
| OPT_CNR  | MM  CHAR  | 1    Subject to batch tracing J/N  |     |
| -------- | --------- | ---------------------------------- | --- |
OPT_SNR  M  CHAR  1    Subject to management in serial numbers J/N ("J” only relevant for ADE-SNR)
SZY  K  NUM  8    Target cycle in seconds/1000, should be set; mandatory for MDE monitoring
of the cycle of the machine
TLG  K  NUM  8    Partitioning; should be pre-defined with 1; mandatory for MDE monitoring of
the cycle of the machine
IMPFAKT  K  DEC  13  3  Pulse factor; reserved; should be pre-defined with1
OPT_SPLIT  K  CHAR  1    Can be split “V” (YES)/ “N” (NO)
MAXANZSPLI K  NUM  8    Max. number of splits (only relevant if OPT:SPLIT = "V")
T

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 11 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T  | L  D  Description  |     |
| ------ | ----- | ------------------ | --- |
MBVERH_RU K  DEC  5  2  Relation machines-user setting up; reserved.
E
MBVERH_NO K  DEC  5  2  Relation machines-user producing;
RM
| QUAL:NORM  | K  NUM   | 8    PEP: Qualifikation Fertigen  |     |
| ---------- | -------- | --------------------------------- | --- |
| QUAL:RUE   | K  NUM   | 8    PEP: Qualifikation Rüsten    |     |
| ATKIDX     | K  CHAR  | 50    Drawing issue number        |     |
| WERK_S     | M  CHAR  | 4    SAP Plant                    |     |

Long texts of the series of operations (Z2AG_INFO_AI000X000)
Text fields that are displayed at the HYDRA console can be transferred to HYDRA as additional function to
the series of operations by means of the following structure. Each data record contains one page with max.
10 lines and 80 characters each.
It's displayed at the HYDRA client and at the terminal software.
Information
This data structure is only available in connection with HYD-INF or HKMPP-INF.

| Field     | V  T     | L  D  Description                |     |
| --------- | -------- | -------------------------------- | --- |
| AUNR      | S  CHAR  | 12    (Production-)Order number  |     |
| AFOLG     | S  NUMC  | 6    Sequence                    |     |
| AGNR      | S  CHAR  | 4    Operation                   |     |
| UVGNR     | S  CHAR  | 4    Sub-operation               |     |
| TYP       | S  CHAR  | 2    Record type; fix: "AI"      |     |
| SUBKEY_1  | S  NUM   | 8                                |     |
Reserved; fix "00000000"
SUBKEY_2  M  NUM  8    Consecutive numbering starting with 1 within the key;
if more that 10 lines are needed then the next record of this operation has the
number 2
INFO_BEZ  K  CHAR  20    Short text; only relevant for SUBKEY:2 = "00000001".
If empty the first 20 digits of info text 1 are adopted.
| INFO_1   | K  CHAR  | 80    Info text 1   |     |
| -------- | -------- | ------------------- | --- |
| INFO_2   | K  CHAR  | 80    Info text 2   |     |
| INFO_3   | K  CHAR  | 80    Info text 3   |     |
| INFO_4   | K  CHAR  | 80    Info text 4   |     |
| INFO_5   | K  CHAR  | 80    Info text 5   |     |
| INFO_6   | K  CHAR  | 80    Info text 6   |     |
| INFO_7   | K  CHAR  | 80    Info text 7   |     |
| INFO_8   | K  CHAR  | 80    Info text 8   |     |
| INFO_9   | K  CHAR  | 80    Info text 9   |     |
| INFO_10  | K  CHAR  | 80    Info text 10  |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 12 of 21

|     |     |     |   Production order data PPS system --> HYDRA  |     |
| --- | --- | --- | --------------------------------------------- | --- |

Components (Z2AG_KOMPL000X000)
Note
For order combination (cutting plan - extrusion/ slitting department) the component list has to be
transferred ONLY for the mother operation!!
| Field   | V  T     | L  D  Description                       |     |     |
| ------- | -------- | --------------------------------------- | --- | --- |
|         | S  CHAR  | 12                                      |     |     |
| AUNR    |          | (Production-)Order number               |     |     |
| AFOLG   | S  NUMC  | 6    Sequence                           |     |     |
| AGNR    | S  CHAR  | 4    Operation                          |     |     |
| UVGNR   | S  CHAR  | 4    Sub-operation                      |     |     |
| ATK     | S  CHAR  | 40    Material number;                  |     |     |
|         |          | alphabetical characters in UPPER CASE   |     |     |
| ATKBEZ  | M  CHAR  | 40    Material designation              |     |     |
| BEZ     | K  CHAR  | 30    Comment 1                         |     |     |
| BEZ_2   | K  CHAR  | 30    Comment 2                         |     |     |
| SLP     | S  CHAR  | 10    Bill of material item / Position  |     |     |
MPL-RF: Should position of the component in the layer structure (lamination)
If several components are used in one operation, each component must have
a unique BOM item. It is not allowed for two components to have the same
|      |         | BOM item.                       |     |     |
| ---- | ------- | ------------------------------- | --- | --- |
| SLS  | M  NUM  | 8    Level of bill of material  |     |     |
Material components with level of bill of material > 1 are always saved in the
|         |           | material type “I” = info component   |     |     |
| ------- | --------- | ------------------------------------ | --- | --- |
| ART     | MM  CHAR  | 2    Material nature                 |     |     |
|         |           | "M"  (Consumable) material           |     |     |
|         |           | "T"  Carrier material (only MPL-RF)  |     |     |
|         |           | "I"  Info component                  |     |     |
| MATTYP  | MM  CHAR  | 10    MPL/MPL-RF: material type      |     |     |
If HYDRA MPL is used a valid material type that is configured in HYDRA has
|        |           | to be indicated                                                |     |     |
| ------ | --------- | -------------------------------------------------------------- | --- | --- |
| VERBR  | MM  CHAR  | 1    MPL/MPL-RF: Consumption type                              |     |     |
|        |           | Unless otherwise noted this field has to pre-assigned to “L”.  |     |     |
OPT_ERSB  MM  CHAR  1    MPL-RF: replaceable – may another material than the planned one be used
for such a component? Only the same material type as the one of the material
to be produced may be used then.
Unplanned material could only log on at machine if correct machine status is
set.
MPL/MPL-RF: J/N
|     |     | Otherwise: Fix “N”  |     |     |
| --- | --- | ------------------- | --- | --- |
OPT_WZW  MM  CHAR  1    MPL/MPL-RF: subject to changes; input batch change for a batch of this
material forces an output batch change:
if ART = "T" or "Z"  OPT:WZW must be "J"
if ART = "I" or "A"  OPT:WZW must be "N"
|     |     | if ART = "M"  OPT:WZW: "J" or "N"  |     |     |
| --- | --- | ----------------------------------- | --- | --- |
SGR_GUT  MM  DEC  13  3  MPL/MPL-RF: Required quantity for this component (position) in relation to
|     |     | the production of 1 unit/article in the primary quantity unit of the operation  |     |     |
| --- | --- | ------------------------------------------------------------------------------- | --- | --- |
SGE_GUT  MM  CHAR  3    MPL/MPL-RF: quantity unit of the required quantity
| MENGEPROZ  | K  DEC  | 13  3  Required quantity in per cent  |     |     |
| ---------- | ------- | ------------------------------------- | --- | --- |
|            |         | Reserved, currently no use            |     |     |
OTG  K  DEC  13  3  Upper tolerance limit in per cent; 3 places after decimal point
|     |     | Reserved; currently no use  |     |     |
| --- | --- | --------------------------- | --- | --- |
UTG  K  DEC  13  3  Lower tolerance limit in per cent; 3 places after decimal point
|     |     | Reserved; currently no use  |     |     |
| --- | --- | --------------------------- | --- | --- |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 13 of 21

|     |     |     |   Production order data PPS system --> HYDRA  |     |
| --- | --- | --- | --------------------------------------------- | --- |

| Field  | V  T  | L  D  Description  |     |     |
| ------ | ----- | ------------------ | --- | --- |
EGR_GUT  K  DEC  13  3  Total quantity/requirement quantity: total quantity required for OP, i.e. for the
|          |          | quantity to be produced (output quantity)  |     |     |
| -------- | -------- | ------------------------------------------ | --- | --- |
| EGE_GUT  | K  CHAR  | 3    Unit of the quantity required         |     |     |
SLS_M  K  NUMC  8    Level of the bill of material of the mother material
SLP_M  K  CHAR  10    Position of the bill of material of the mother material
| MENGE_FIX  | K  CHAR  | 1    Indicator: fixed quantity  |     |     |
| ---------- | -------- | ------------------------------- | --- | --- |
PPS_RETRO  K  CHAR  1    Indicator: Backflush (in the SAP)
| OPT_SLOS  | K  CHAR  | 1    Flag „Collective Batch“  |     |     |
| --------- | -------- | ----------------------------- | --- | --- |
Available with MPL82 / MLE-Variant ZPPORDER_SAP_008
Indicating the type of component when working with serial numbers for the
union of serial numbers:
|     |     |  „ “  In case no serial numbers are used or,  |     |     |
| --- | --- | --------------------------------------------- | --- | --- |
|     |     |    when serial numbers are used, to           |     |     |
|     |     |   indicate serial number managed              |     |     |
|     |     |   components, which ID is not forwarded       |     |     |
|     |     |   to the next process step                    |     |     |
|     |     | „F“  In case serial numbers are used to       |     |     |
|     |     |   indicate the component, from which the      |     |     |
|     |     |   ID is taken into the next processing step   |     |     |
VERB_ZAEHL K  CHAR  1    Flag Automatic counter consumption
| ER  |     | Available with MPL82 / MLE-Variant ZPPORDER_SAP_008  |     |     |
| --- | --- | ---------------------------------------------------- | --- | --- |

Components – user fields (Z2AG_KOMPL_USRFLD000X000)
User fields offer the possibility to file further customer-specific information in HYDRA besides the fields that
are available in the standard of HYDRA. The segment Z2AG_KOMPL_USRFLD000X000 serves for the
transfer of these data from the SAP system to HYDRA and for defining them at the series of components.
What user fields are concerned here and which meaning they have is determined via the so-called user
field key. Each user field key describes a combination of user fields. The customer-specific configuration of
the user field key is carried out in the scope of the HYDRA customizing.
Information
  When it comes to the data exchange of user fields between the SAP system and HYDRA the
customer has to guarantee that the user field keys are maintained equally in both systems so
that a consistent data exchange is possible between both systems.
  You need at least MLE-Variant ZPPORDER_SAP_007 to support this segment processing

| Field  | V  T     | L  D  Description                |     |     |
| ------ | -------- | -------------------------------- | --- | --- |
| AUNR   | S  CHAR  | 12    (Production-)Order number  |     |     |
| AFOLG  | S  NUMC  | 6    Sequence                    |     |     |
| AGNR   | S  CHAR  | 4    Operation                   |     |     |
| UVGNR  | S  CHAR  | 4    Sub-operation               |     |     |
| ATK    | S  CHAR  | 40    Material number;           |     |     |
alphabetical characters in UPPER CASE

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 14 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T     | L  D  Description                       |     |
| ------ | -------- | --------------------------------------- | --- |
| SLP    | S  CHAR  | 10    Bill of material item / Position  |     |
MPL-RF: Should position of the component in the layer structure (lamination)
| USRFLD  | S  CHAR  | 8    User field key   |     |
| ------- | -------- | --------------------- | --- |
| FU_1    | K  DATE  | 8    User field 1     |     |
| FU_2    | K  DATE  | 8    User field 2     |     |
| FU_3    | K  DATE  | 8    User field 3     |     |
| FU_4    | K  DATE  | 8    User field 4     |     |
| FU_5    | K  DATE  | 8    User field 5     |     |
| FU_6    | K  DATE  | 8    User field 6     |     |
| FU_7    | K  NUM   | 8    User field 7     |     |
| FU_8    | K  NUM   | 8    User field 8     |     |
| FU_9    | K  NUM   | 8    User field 9     |     |
| FU_10   | K  NUM   | 8    User field 10    |     |
| FU_11   | K  NUM   | 8    User field 11    |     |
| FU_12   | K  NUM   | 8    User field 12    |     |
| FU_13   | K  NUM   | 8    User field 13    |     |
| FU_14   | K  NUM   | 8    User field 14    |     |
| FU_15   | K  NUM   | 8    User field 15    |     |
| FU_16   | K  NUM   | 8    User field 16    |     |
| FU_17   | K  NUM   | 8    User field 17    |     |
| FU_18   | K  NUM   | 8    User field 18    |     |
| FU_19   | K  NUM   | 8    User field 19    |     |
| FU_20   | K  NUM   | 8    User field 20    |     |
| FU_21   | K  NUM   | 8    User field 21    |     |
| FU_22   | K  NUM   | 8    User field 22    |     |
| FU_23   | K  DEC   | 13  3  User field 23  |     |
| FU_24   | K  DEC   | 13  3  User field 24  |     |
| FU_25   | K  DEC   | 13  3  User field 25  |     |
| FU_26   | K  DEC   | 13  3  User field 26  |     |
| FU_27   | K  DEC   | 13  3  User field 27  |     |
| FU_28   | K  DEC   | 13  3  User field 28  |     |
| FU_29   | K  CHAR  | 1    User field 29    |     |
| FU_30   | K  CHAR  | 1    User field 30    |     |
| FU_31   | K  CHAR  | 1    User field 31    |     |
| FU_32   | K  CHAR  | 1    User field 32    |     |
| FU_33   | K  CHAR  | 1    User field 33    |     |
| FU_34   | K  CHAR  | 1    User field 34    |     |
| FU_35   | K  CHAR  | 1    User field 35    |     |
| FU_36   | K  CHAR  | 1    User field 36    |     |
| FU_37   | K  CHAR  | 1    User field 37    |     |
| FU_38   | K  CHAR  | 1    User field 38    |     |
| FU_39   | K  CHAR  | 1    User field 39    |     |
| FU_40   | K  CHAR  | 1    User field 40    |     |
| FU_41   | K  CHAR  | 1    User field 41    |     |
| FU_42   | K  CHAR  | 1    User field 42    |     |
| FU_43   | K  CHAR  | 1    User field 43    |     |
| FU_44   | K  CHAR  | 1    User field 44    |     |
| FU_45   | K  CHAR  | 10    User field 45   |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 15 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T     | L  D  Description    |     |     |
| ------ | -------- | -------------------- | --- | --- |
| FU_46  | K  CHAR  | 10    User field 46  |     |     |
| FU_47  | K  CHAR  | 10    User field 47  |     |     |
| FU_48  | K  CHAR  | 10    User field 48  |     |     |
| FU_49  | K  CHAR  | 10    User field 49  |     |     |
| FU_50  | K  CHAR  | 10    User field 50  |     |     |
| FU_51  | K  CHAR  | 20    User field 51  |     |     |
| FU_52  | K  CHAR  | 20    User field 52  |     |     |
| FU_53  | K  CHAR  | 20    User field 53  |     |     |
| FU_54  | K  CHAR  | 20    User field 54  |     |     |
| FU_55  | K  CHAR  | 20    User field 55  |     |     |
| FU_56  | K  CHAR  | 20    User field 56  |     |     |
| FU_57  | K  CHAR  | 20    User field 57  |     |     |
| FU_58  | K  CHAR  | 20    User field 58  |     |     |
| FU_59  | K  CHAR  | 20    User field 59  |     |     |
| FU_60  | K  CHAR  | 20    User field 60  |     |     |
| FU_61  | K  CHAR  | 20    User field 61  |     |     |
| FU_62  | K  CHAR  | 20    User field 62  |     |     |
| FU_63  | K  CHAR  | 20    User field 63  |     |     |
| FU_64  | K  CHAR  | 20    User field 64  |     |     |
| FU_65  | K  CHAR  | 40    User field 65  |     |     |
| FU_66  | K  CHAR  | 40    User field 66  |     |     |

Production resources / tools (Z2AG_FHM000X000)
Prerequisite for transferring production resources and tools from SAP to HYDRA ist he usage of the HYDRA
modules Tools and Resources Management (WRM) or the usage of the module DNC.
| Field   | V  T     | L  D  Description                     |     |     |
| ------- | -------- | ------------------------------------- | --- | --- |
| AUNR    | S  CHAR  | 12    (Production-)Order number       |     |     |
| AFOLG   | S  NUMC  | 6    Sequence                         |     |     |
| AGNR    | S  CHAR  | 4    Operation                        |     |     |
| UVGNR   | S  CHAR  | 4    Sub-operation                    |     |     |
| RESTYP  | S  CHAR  | 4    Resource type; possible values:  |     |     |
|         |          | DNC  DNC-program                      |     |     |
|         |          | ENT  Withdrawal unit                  |     |     |
|         |          | TEM  Temperature control unit         |     |     |
VOR  Fixture
|     |     | WNR  Tool      |     |     |
| --- | --- | -------------- | --- | --- |
Further resource types (idents) can be defined in the configuration of the
resource type (menu WRM: Basic data > Resource types) if the HYDRA tool
|          |          | and resource management (WRM) is used.   |     |     |
| -------- | -------- | ---------------------------------------- | --- | --- |
| ATK      | S  CHAR  | 40    Resource number/material number;   |     |     |
|          |          | alphabetical characters UPPER CASE       |     |     |
| ATKBEZ   | K  CHAR  | 40    Designation                        |     |     |
| BEZ      | K  CHAR  | 30    Comment 1                          |     |     |
| BEZ_2    | K  CHAR  | 30    Comment 2                          |     |     |
| SGR_GUT  | M  QUAN  | 13  3  Required quantity                 |     |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 16 of 21

|     |     |     | Production order data PPS system --> HYDRA  |     |
| --- | --- | --- | ------------------------------------------- | --- |

| Field    | V  T     | L  D  Description   |     |     |
| -------- | -------- | ------------------- | --- | --- |
| SGE_GUT  | K  CHAR  | 3    Quantity unit  |     |     |

Documents (Z2AG_DOC000X000)
| Field  | V  T     | L  D  Description                |     |     |
| ------ | -------- | -------------------------------- | --- | --- |
| AUNR   | S  CHAR  | 12    (Production-)Order number  |     |     |
| AFOLG  | S  NUMC  | 6    Sequence                    |     |     |
| AGNR   | S  CHAR  | 4    Operation                   |     |     |
| UVGNR  | S  CHAR  | 4    Sub-operation               |     |     |
| ATK    | S  CHAR  | 40    Document ID: distinct key  |     |     |
alphabetical characters UPPER CASE
| ATKBEZ  | M  CHAR  | 40    Designation  |     |     |
| ------- | -------- | ------------------ | --- | --- |
| BEZ     | K  CHAR  | 30    Comment 1    |     |     |
| BEZ_2   | K  CHAR  | 30    Comment 2    |     |     |
PATH  M  CHAR  8    Reference to a mapping that is defined in the configuration of the mapping
(menu file > System administration > Mappings).
| DATEI  | M  CHAR  | 128    File name incl. file extension  |     |     |
| ------ | -------- | -------------------------------------- | --- | --- |

User fields of operations (Z2AG_USRFLD000X000)
User fields offer the possibility to file further customer-specific information in HYDRA besides the fields that
are available in the standard of HYDRA. The segment Z2AU_USRFLD000X000 serves for the transfer of
these data from the SAP system to HYDRA and for defining them at the series of operations.
What user fields are concerned here and which meaning they have is determined via the so-called user
field key. Each user field key describes a combination of user fields. The customer-specific configuration of
the user field key is carried out in the scope of the HYDRA customizing.
Information
When it comes to the data exchange of user fields between the SAP system and HYDRA the
customer has to guarantee that the user field keys are maintained equally in both systems so that a
consistent data exchange is possible between both systems.

| Field   | V  T     | L  D  Description          |     |     |
| ------- | -------- | -------------------------- | --- | --- |
|         | S  CHAR  | 12                         |     |     |
| AUNR    |          | (Production-)Order number  |     |     |
| AFOLG   | S  NUMC  | 6    Sequence              |     |     |
| AGNR    | S  CHAR  | 4    Operation             |     |     |
| UVGNR   | S  CHAR  | 4    Sub-operation         |     |     |
| USRFLD  | S  CHAR  | 8    User field key        |     |     |
| FU_1    | K  DATE  | 8    User field 1          |     |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 17 of 21

    Production order data PPS system --> HYDRA

| Field  | V  T     | L  D  Description     |     |
| ------ | -------- | --------------------- | --- |
| FU_2   | K  DATE  | 8    User field 2     |     |
| FU_3   | K  DATE  | 8    User field 3     |     |
|        | K  DATE  | 8                     |     |
| FU_4   |          | User field 4          |     |
| FU_5   | K  DATE  | 8    User field 5     |     |
| FU_6   | K  DATE  | 8    User field 6     |     |
| FU_7   | K  NUM   | 8    User field 7     |     |
|        | K  NUM   | 8                     |     |
| FU_8   |          | User field 8          |     |
| FU_9   | K  NUM   | 8    User field 9     |     |
| FU_10  | K  NUM   | 8    User field 10    |     |
| FU_11  | K  NUM   | 8    User field 11    |     |
|        | K  NUM   | 8                     |     |
| FU_12  |          | User field 12         |     |
| FU_13  | K  NUM   | 8    User field 13    |     |
| FU_14  | K  NUM   | 8    User field 14    |     |
|        | K  NUM   | 8                     |     |
| FU_15  |          | User field 15         |     |
|        | K  NUM   | 8                     |     |
| FU_16  |          | User field 16         |     |
| FU_17  | K  NUM   | 8    User field 17    |     |
| FU_18  | K  NUM   | 8    User field 18    |     |
|        | K  NUM   | 8                     |     |
| FU_19  |          | User field 19         |     |
|        | K  NUM   | 8                     |     |
| FU_20  |          | User field 20         |     |
| FU_21  | K  NUM   | 8    User field 21    |     |
| FU_22  | K  NUM   | 8    User field 22    |     |
|        | K  DEC   | 13  3                 |     |
| FU_23  |          | User field 23         |     |
|        | K  DEC   | 13  3                 |     |
| FU_24  |          | User field 24         |     |
| FU_25  | K  DEC   | 13  3  User field 25  |     |
| FU_26  | K  DEC   | 13  3  User field 26  |     |
|        | K  DEC   | 13  3                 |     |
| FU_27  |          | User field 27         |     |
| FU_28  | K  DEC   | 13  3  User field 28  |     |
| FU_29  | K  CHAR  | 1    User field 29    |     |
| FU_30  | K  CHAR  | 1    User field 30    |     |
|        | K  CHAR  | 1                     |     |
| FU_31  |          | User field 31         |     |
| FU_32  | K  CHAR  | 1    User field 32    |     |
| FU_33  | K  CHAR  | 1    User field 33    |     |
| FU_34  | K  CHAR  | 1    User field 34    |     |
|        | K  CHAR  | 1                     |     |
| FU_35  |          | User field 35         |     |
| FU_36  | K  CHAR  | 1    User field 36    |     |
| FU_37  | K  CHAR  | 1    User field 37    |     |
| FU_38  | K  CHAR  | 1    User field 38    |     |
|        | K  CHAR  | 1                     |     |
| FU_39  |          | User field 39         |     |
| FU_40  | K  CHAR  | 1    User field 40    |     |
| FU_41  | K  CHAR  | 1    User field 41    |     |
|        | K  CHAR  | 1                     |     |
| FU_42  |          | User field 42         |     |
|        | K  CHAR  | 1                     |     |
| FU_43  |          | User field 43         |     |
| FU_44  | K  CHAR  | 1    User field 44    |     |
| FU_45  | K  CHAR  | 10    User field 45   |     |
|        | K  CHAR  | 10                    |     |
| FU_46  |          | User field 46         |     |
|        | K  CHAR  | 10                    |     |
| FU_47  |          | User field 47         |     |
| FU_48  | K  CHAR  | 10    User field 48   |     |

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 18 of 21

|     |     |     |   Production order data PPS system --> HYDRA  |     |
| --- | --- | --- | --------------------------------------------- | --- |

| Field  | V  T     | L  D  Description    |     |     |
| ------ | -------- | -------------------- | --- | --- |
| FU_49  | K  CHAR  | 10    User field 49  |     |     |
| FU_50  | K  CHAR  | 10    User field 50  |     |     |
|        | K  CHAR  | 20                   |     |     |
| FU_51  |          | User field 51        |     |     |
| FU_52  | K  CHAR  | 20    User field 52  |     |     |
| FU_53  | K  CHAR  | 20    User field 53  |     |     |
This field is displayed in the BDE terminal in the field comment 1
|        | K  CHAR  | 20             |     |     |
| ------ | -------- | -------------- | --- | --- |
| FU_54  |          | User field 54  |     |     |
This field is displayed in the BDE terminal in the field comment 2.
| FU_55  | K  CHAR  | 20    User field 55  |     |     |
| ------ | -------- | -------------------- | --- | --- |
| FU_56  | K  CHAR  | 20    User field 56  |     |     |
|        | K  CHAR  | 20                   |     |     |
| FU_57  |          | User field 57        |     |     |
|        | K  CHAR  | 20                   |     |     |
| FU_58  |          | User field 58        |     |     |
| FU_59  | K  CHAR  | 20    User field 59  |     |     |
| FU_60  | K  CHAR  | 20    User field 60  |     |     |
|        | K  CHAR  | 20                   |     |     |
| FU_61  |          | User field 61        |     |     |
|        | K  CHAR  | 20                   |     |     |
| FU_62  |          | User field 62        |     |     |
| FU_63  | K  CHAR  | 20    User field 63  |     |     |
| FU_64  | K  CHAR  | 20    User field 64  |     |     |
|        | K  CHAR  | 40                   |     |     |
| FU_65  |          | User field 65        |     |     |
|        | K  CHAR  | 40                   |     |     |
| FU_66  |          | User field 66        |     |     |

Specific data for the coil-based manufacturing (Z2AG_RF000X000)
This is a segment that depends on the series of operations, i.e. the data transferred here are taken over to
operation-specific fields in HYDRA. The data are required if MPL-RF is used.
| Field     | V  T     | L  D  Description                |     |     |
| --------- | -------- | -------------------------------- | --- | --- |
| AUNR      | S  CHAR  | 12    (Production-)Order number  |     |     |
| AFOLG     | S  NUMC  | 6    Sequence                    |     |     |
|           | S  CHAR  | 4                                |     |     |
| AGNR      |          | Operation                        |     |     |
| UVGNR     | S  CHAR  | 4    Sub-operation               |     |     |
| RFAGTYP   | K  CHAR  | 1    Flag  type of operation:   |     |     |
" "  No special processing
"P"  Packaging operation
RFABZ  MM  CHAR  1    Distinguishes mother and children OPs in case of a planned deduction.
"M“  Mother OP of a planned deduction
"K“  Child OP of a planned deduction (in this case a special material
movement - 531 - is processed).
RFOPT_RS  MM  CHAR  1    Indicator for cutting coils (only relevant if it is a cutting OP)
"  “  no cutting
"T“  cutting of coils active (numbering of daughter coil)
"M“  cutting active (mother coils are generated again)
RFMANR  MM  CHAR  40    Cutting plan (order combination): The deduction (link) is assigned to the
respective mother OP by means of this field and the following fields in case of
a planned deduction.
The mother OP references itself.
RFTRANZ  MM  NUMC  5    In case of cutting operations: number of the planned daughter coils per cut.

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
  Page 19 of 21

Production order data PPS system --> HYDRA
Field V T L D Description
RFTRANZSU MM NUMC 5 In case of cutting operations (mother OP): number of the planned daughter
M coils per cut (beyond all deductions/ operations).
RFRANZ MM NUMC 6 Planned number of coils (only information)
RFSTKF MM NUMC 8 Area of a piece
Unit: MM2 / ST (integer)
RFBSBRS MM DEC 10 3 Sum seam width (Sum "border width"
If several coils are produced simultaneously in one series of operations this
field contains the sum of the single seam widths.
The seam width of the individual series of operations is explicitly set for each
series of operations (“mother” and “child” series of operations) in case of
deductions (no totals formation)
Unit: MM
RFBREITEE MM DEC 10 3 Inpout-width operation
Unit: MM
RFBREITEA MM DEC 10 3 Output-width operation
Width of one outgoing roll within the operation (even if more than one roll is
cut).
The initial width of the individual operations is explicitly set for each operation
(“mother” and “child” operations) in case of planned deductions (no totals
formation).
Unit: MM
RFAGVFA MM DEC 10 3 Mass per unit area
Unit: G/M2
Hülsengewic K DEC 10 3 The weight of the casing of the daughter rolls is specified here in case of
ht cutting processes
Order network (Z2AG_ANETZ000X000)
This segment is an order-wide segment. It can be used to define order-wide relationships. These will be
accounted for in the planning in the HYDRA shop floor scheduling system (HLS) and/or in processing (e.g.
target quantity update, if active) when the involved operations are planned (ade_verarb_code.planen <>
"N") and/or entered (auftrags_bestand.erfassbar = "J"). The transfer of the data is only possible if the
transferred orders and/or their operations exist already in HYDRA.
You do not have to transfer order network relationships between neighboring operations within
one production order, since the system creates these relationships automatically.
Feld V T L D Beschreibung
SAPAUNRV S CHAR 12 Order number of the predecessor OP
SAPAFOLGV S CHAR 6 Sequence number of the predecessor OP
SAPVGNRV S CHAR 4 Operation number of the predecessor OP
SAPUVGNRV S CHAR 4 Sub operation number of the predecessor OP
SAPAUNRN S CHAR 12 order number of the successor OP
SAPAFOLGN S CHAR 6 Sequence number of the successor OP
SAPVGNRN S CHAR 4 Operation number of the successor OP
MBL_SAP_Implementation_ZPPORDER_Down.docxVersion: 1.10.18680
Page 20 of 21

    Production order data PPS system --> HYDRA

| Feld  | V  T  | L  D Beschreibung  |     |     |     |     |
| ----- | ----- | ------------------ | --- | --- | --- | --- |
SAPUVGNRN  S  CHAR  4    Sub operation number of the successor OP
| AOB  | K  CHAR  | 2    Fix „ES“  |     |     |     |     |
| ---- | -------- | -------------- | --- | --- | --- | --- |

Production variants (Z2MD_PRODVAR000X000)
This segment is used to enter / to maintain production variants in HYDRA. If configured accordingly , these
variants will be accounted for in the determination of production variants when orders are transferred.
| Field  |     | V  T     | L   | D  Description                      |     |     |
| ------ | --- | -------- | --- | ----------------------------------- | --- | --- |
| VER    |     | S  CHAR  | 10  |   Version                           |     |     |
| STA    |     | M  CHAR  | 1   |   Status of the production variant  |     |     |
F = Released
|      |     |          |     | S = Blocked  |     |     |
| ---- | --- | -------- | --- | ------------ | --- | --- |
| ATK  |     | S  CHAR  | 40  |   Article    |     |     |
MATTYP  S  CHAR  10    Material type; blank (currently not processed)
| MNR   |     | S  CHAR  | 8   |   Machine                                  |     |     |
| ----- | --- | -------- | --- | ------------------------------------------ | --- | --- |
| MGRP  |     | S  CHAR  | 8   |   Group                                    |     |     |
| MANZ  |     | K  DEC   | 13  | 3  Number of machines; "1" (currently not  |     |     |

processed)
| RES  |     | M  CHAR  | 40  |   Resource.   |     |     |
| ---- | --- | -------- | --- | ------------- | --- | --- |
Please note: The default resource will always
|     |     |     |     | be occupied with the resource type WNR.   |     |     |
| --- | --- | --- | --- | ----------------------------------------- | --- | --- |
RESFAM  K  CHAR  18    Resource family (currently not processed)
| WANZ  |     | K  NUM  | 8   |   Number of resources  |     |     |
| ----- | --- | ------- | --- | ---------------------- | --- | --- |
SZY  K  NUM  8    Target cycle in [seconds/ 1000 cycles]
| TLG    |     | K  DEC    | 13  | 3  Partitioning                         |     |     |
| ------ | --- | --------- | --- | --------------------------------------- | --- | --- |
| RUEZ   |     | K  NUM    | 8   |   Setup time (seconds)                  |     |     |
| ABRZ   |     | K  NUM    | 8   |   Dismantling/retooling time (seconds)  |     |     |
| DSBEZ  |     | SA  CHAR  | 15  |   Data identifier                       |     |     |
| BEM    |     | K  CHAR   | 50  |   Comment                               |     |     |
| PRIO   |     | M  NUMC   | 1   |   Priority                              |     |     |
| DATB   |     | K  DATE   | 8   |   Valid from                            |     |     |
| DATE   |     | K  DATE   | 8   |   Valid to                              |     |     |

Deleting operations (E2BP_PP_PDC_OPERA1000)
The structure described in the following, controls the deletion process for already transferred production
orders and/or their operations in the subsystem.
| Field name  | T   | L  Description            |     | Usage in HYDRA  |     |     |
| ----------- | --- | ------------------------- | --- | --------------- | --- | --- |
| SOURCE_SYS  |     | CHAR  10  Logical system  |     | Not used        |     |     |
CONF_NO  NUMC  10  Confirmation  number  of  the  Confirmation no.
operation

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
|     |     | Page 21 of 21  |     |     |     |     |
| --- | --- | -------------- | --- | --- | --- | --- |

    Production order data PPS system --> HYDRA

| Field name  | T  L      | Description  | Usage in HYDRA                   |
| ----------- | --------- | ------------ | -------------------------------- |
| ORDERID     | CHAR  12  | Order        | According to configuration (*1)  |
SEQUENCE  CHAR  6  Sequence  According to configuration (*1)
OPERATION  CHAR  4  Operation  According to configuration (*1)
SUB_OPER  CHAR  4  Sub-operation  According to configuration (*1)
SUBSYSTEM_GROUPING  CHAR  3  Grouping subsystem connection  Restriction to a subsystem group possible.

MBL_SAP_Implementation_ZPPORDER_Down.docxVersion:  1.10.18680
|     |     | Page 22 of 22  |     |
| --- | --- | -------------- | --- |