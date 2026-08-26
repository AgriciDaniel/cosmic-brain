Configuration of Uploads
1 Configuration of Uploads
Summary
Configuration of Uploads to SAP CO
SAP CO has been designed as dynamically as possible to be able to meet the different requirements and
situations. The table SAP_RCK_DATA_CONF is used for configurations. Parameters, program
parameters and field parameters are defined in this table.
Parameters:
Statistical values required for the generation of the IDoc can be defined using these parameters
(e.g. the company code).
Program parameters
Program parameters control program processing. These parameters can be used, for example, to
define that only orders of a specific HYDRA order type are uploaded/confirmed.
Field parameters:
Field parameters define from which HYDRA data model fields values relevant for the upload are
taken. Moreover, for certain field parameters it is possible to define in which length and as of
which position these values are to be taken.
All parameters are saved as variant. This means that the upload program is called up with the
corresponding message type and the variant and the settings defined in this variant are used for the
upload.
Please note: Important: When calling the program MYERPRCK to generate upload records, the variant is
to be sent as well so that this variant will be forwarded as parameter to the user exit.
e.g. sh.exe ./myerprck.scr /MESTYP=ACC_ACT_ALLOC /KAT=GK /UE_PARAMS="VARIANTE=SAP"
Parameters
Key type Parameter Description Values
P CO_AREA The content of this field of the segment e.g. 1000
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field CO_AREA. It includes
the SAP controlling area.
MBL_Interface_Confirmation_config.docx Version: 1.2.1362 Page 1 of 4

|     |     |     |     | Configuration of Uploads  |     |
| --- | --- | --- | --- | ------------------------- | --- |

| Key type  | Parameter  | Description  |     | Values  |     |
| --------- | ---------- | ------------ | --- | ------- | --- |
P  VERSION  The content of this field of the segment  e.g. 000
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field VERSION.
P  VARIANT  The content of this field of the segment  e.g. SAP02
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field VARIANT. It includes
the specific upload variant in SAP.
| P   | ACTIVITYUN  | Determines the upload unit  |     | SEK  second  |     |
| --- | ----------- | --------------------------- | --- | ------------ | --- |
MIN  minute
M  minute
|     |     |     |     | STD  hour  |     |
| --- | --- | --- | --- | ---------- | --- |
  (Default)
H  hour
Program parameter overview
| Key type  | Parameter  | Description                                   |     | Values  |     |
| --------- | ---------- | --------------------------------------------- | --- | ------- | --- |
| PP        | NOSAP      | If this parameter is set only orders will be  |     |         | -   |
uploaded that are not known in SAP
PP  ONLYSAP  If this parameter is set only orders will be  -
uploaded that are not known in SAP.
default setting
PP  LOGSYS  The  logical  system  specified  here  Logical system of the
|     |     | determines the communication user from the  |     | mySAP communication  |     |
| --- | --- | ------------------------------------------- | --- | -------------------- | --- |
configuration tables of the HYDRA mySAP
communication. This user is also entered as
the user of data records in SAP.
PP  MAX_SEG  Maximum number of segments summarized  Default 100
for the upload.
| PP  | USERNAME  | User name who is specified as generating  |     |     |     |
| --- | --------- | ----------------------------------------- | --- | --- | --- |
user in the data record structure.
If no user is specified the communication
user indicated in LOGSYS of the logical
system is determined and used as the user.
Field parameters
| Key type  | Parameter  | Description           |     | Values    |     |
| --------- | ---------- | --------------------- | --- | --------- | --- |
| F         | SEND_CCTR  | Sending cost center   |     | MNR.KST:  |     |
cost center of the workplace
ADEPRO.ANR:
HYDRA order indicating the
position from / to
|     |     |     |     | PNR.KST:  |     |
| --- | --- | --- | --- | --------- | --- |
The employee’s cost center

MBL_Interface_Confirmation_config.docx  Version: 1.2.1362  Page 2 of 4

|     |     |     |     | Configuration of Uploads  |     |
| --- | --- | --- | --- | ------------------------- | --- |

| Key type  | Parameter  | Description    |     | Values        |     |
| --------- | ---------- | -------------- | --- | ------------- | --- |
| F         | ACTTYPE    | Activity type  |     | ADEPRO.ANR:   |     |
HYDRA order number
indicating the position from /
to
|     |     |     |     | PNR.INFOTEXT:1  |     |
| --- | --- | --- | --- | --------------- | --- |
The employee’s activity type
from the HR master
F  ACTVTY_QTY  Quantity of the activity type  ADEPRO.EGR:PDAUER:
Duration of the B record
posting
| F   | REC_CCTR  | Receiving cost center  |     | ADEPRO.ANR:   |     |
| --- | --------- | ---------------------- | --- | ------------- | --- |
HYDRA order number
specifying the position from /
to
| F   | REC_ORDER  | Receiving order  |     | AGNR.SAPAUNR:  |     |
| --- | ---------- | ---------------- | --- | -------------- | --- |
SAP order number of the
CO internal order
| F   | PERSON_NO  | Personnel number  |     | ADEPRO.PNR: HYDRA  |     |
| --- | ---------- | ----------------- | --- | ------------------ | --- |
personnel number

Structure of the table SAP_RCK_DATA_CONF
The below table includes the configurations for the upload/confirmation to SAP CO. At the moment, the
table can only be edited directly in the database.
| Field name  |     | T  L     | Meaning   | Meaning in HYDRA  |     |
| ----------- | --- | -------- | --------- | ----------------- | --- |
| KEY_TYPE    |     | Char  2  | Key type  | Parameter type:   |     |

„P“  Parameter
„PP“  Program parameter
„F“  Field parameter
| KEY  |     | Char  30  | Key  | Parameter name, e.g.  |     |
| ---- | --- | --------- | ---- | --------------------- | --- |
SEND_CCTR, ONLYSAP
| SUBKEY  |     | Char  40  | Variant  | Variant name by which a  |     |
| ------- | --- | --------- | -------- | ------------------------ | --- |
configuration is saved and the
upload program is started (free
text).
MESTYP  Char  30  Message type  Name of the SAP message type
POS_VON  Num    Position from  Field position from which the value
is to be taken. If nothing is entered
the entire field will be taken over.
POS_BIS  Num    Position to  Field position up to which the value
is to be taken. If nothing is entered
the entire field will be taken over.
| LFD_NR  |     | Num    | Consecutive number  | Not relevant  |     |
| ------- | --- | ------ | ------------------- | ------------- | --- |

MBL_Interface_Confirmation_config.docx  Version: 1.2.1362  Page 3 of 4

|     |     |     |     | Configuration of Uploads  |
| --- | --- | --- | --- | ------------------------- |

| Field name  |     | T  L  | Meaning  | Meaning in HYDRA  |
| ----------- | --- | ----- | -------- | ----------------- |
VERWEIS  Num    Reference  Unique reference (assigned by the
database).
| BEARB        |     | Char  10   | Editor             | Not used  |
| ------------ | --- | ---------- | ------------------ | --------- |
| BEARB_DATE   |     | Date       | Editing date       | Not used  |
| BEARB_TIME   |     | Time       | Editing time       | Not used  |
| ANLAGE_DATE  |     | Date       | Creation date      | Not used  |
| ANLAGE_ZEIT  |     | Time       | Creation time      | Not used  |
| PARAM_STR1   |     | Char  20   | Parameter 1        | Not used  |
| PARAM_STR2   |     | Char  20   | Parameter 2        | Not used  |
| PARAM_STR3   |     | Char  40   | Parameter 3        | Not used  |
| PARAM01      |     | Num        | Parameter integer  | Not used  |
| PARAM02      |     | Num        | Parameter integer  | Not used  |
| PARAM01_d    |     | Dec  18,6  | Parameter decimal  | Not used  |

MBL_Interface_Confirmation_config.docx  Version: 1.2.1362  Page 4 of 4