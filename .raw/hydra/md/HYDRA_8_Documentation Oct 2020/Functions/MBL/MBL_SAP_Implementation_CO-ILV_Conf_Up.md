|     |     |     |     |     | Upload Rückmeldungen  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

1  Upload of Confirmations
Summary

Confirmation general
HYDRA BDE confirms to SAP on the basis of time tickets. Transferred are the labor data durations from
the B-records (personnel postings). They are transferred to SAP together with the personnel number.
Which cost center (e.g. for staff or the workplace) is transmitted to SAP, whether the receiving object is a
CO-internal order or a cost center can be configured in the interface. The configuration is explained in
chapter Error! Reference source not found. Error! Reference source not found..
Confirmation - direct activity allocation
Segment E1ACC_ACT_ALLOC000
| Field name  |     | T  L  | Meaning  | Meaning in HYDRA  |     |     |
| ----------- | --- | ----- | -------- | ----------------- | --- | --- |

| IGNORE_WARNINGS  |     | Char  1  | Ignore warnings  | Not occupied  |     |     |
| ---------------- | --- | -------- | ---------------- | ------------- | --- | --- |

Segment E1BPDOCHDRP000
| Field name  |     | T  L  | Meaning  | Meaning in HYDRA  |     |     |
| ----------- | --- | ----- | -------- | ----------------- | --- | --- |

CO_AREA  Char  4  Controlling area  According to configuration
| DOCDATE  |     | Char  8  | Document date  | Log. Date  |     |     |
| -------- | --- | -------- | -------------- | ---------- | --- | --- |
POSTGDATE  Char  8  Posting date  Set according to shift date of the B-
records
| VERSION  |     | Char  3   | Version          | According to configuration*)  |     |     |
| -------- | --- | --------- | ---------------- | ----------------------------- | --- | --- |
| DOC_NO   |     | Char  10  | Document number  | Not occupied                  |     |     |
VARIANT  Char  5  Fast  document  entry  of  According to configuration*)
|     |     |     | CO-actual  | postings:  |     |     |
| --- | --- | --- | ---------- | ---------- | --- | --- |
Variant
| DOC_HDR_TX  |     | Char  50  | Document header text  | Not used  |     |     |
| ----------- | --- | --------- | --------------------- | --------- | --- | --- |
USERNAME  Char  12  Name of the user   According to configuration*)

| OBJ_KEY   |     | Char  20  | Reference key        | Not used                   |     |     |
| --------- | --- | --------- | -------------------- | -------------------------- | --- | --- |
| OBJ_TYPE  |     | Char  5   | Reference operation  | Not used                   |     |     |
| OBJ_SYS   |     | Char  10  | Logical              | system  of  the  Not used  |     |     |
original document

MBL_SAP_Implementation_CO-ILV_Conf_Up.docxVersion: 1.0.1362  Page 1 of 5

|     |     |     |     |     | Upload Rückmeldungen  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

Segment E1BPAAITM002
| Field  |     | T  L  | Meaning  | Meaning in HYDRA  |     |     |
| ------ | --- | ----- | -------- | ----------------- | --- | --- |

SEND_CCTR  Char  10  Sending cost center  According to configuration*)
ACTTYPE  Char  6  Activity type  According to configuration*)
| SENBUSPROC  |     | Char  12  | Sending  | business  Not used  |     |     |
| ----------- | --- | --------- | -------- | ------------------- | --- | --- |
process
ACTVTY_QTY  Char  17  Activities quantity  According to configuration*)
ACTIVITYUN  Char  3  Activity unit  According to configuration*)
| ACTIVITYUN_ISO  |     | Char  3  | ISO-code  | unit  of  Not used  |     |     |
| --------------- | --- | -------- | --------- | ------------------- | --- | --- |
measurement
| PRICE  |     | Char  25  | Price total in the currency  | Not used  |     |     |
| ------ | --- | --------- | ---------------------------- | --------- | --- | --- |
of the transaction
| CURRENCY      |     | Char  5   | Currency key            | Not used  |     |     |
| ------------- | --- | --------- | ----------------------- | --------- | --- | --- |
| CURRENCY_ISO  |     | Char  3   | Iso-code currency       | Not used  |     |     |
| POS_OUTQTY    |     | Char  17  | Posted output quantity  | Not used  |     |     |

| POSTOUTUN      |     | Char  3  | Posted output unit  | Not used            |     |     |
| -------------- | --- | -------- | ------------------- | ------------------- | --- | --- |
| POSTOUTUN_ISO  |     | Char  3  | ISO-code            | unit  of  Not used  |     |     |
measurement
| PERSON_NO  |     | Char  8   | Personnel number  | Personnel number  |     |     |
| ---------- | --- | --------- | ----------------- | ----------------- | --- | --- |
| SEG_TEXT   |     | Char  50  | Segment text      | Not used          |     |     |
REC_CCTR  Char  10  Receiving cost center  According to configuration*)
REC_ORDER  Char  12  Receiving order  According to configuration*)
| REC_WBS_EL  |     | Char  24  | Receiving  | project  Not used  |     |     |
| ----------- | --- | --------- | ---------- | ------------------ | --- | --- |
|             |     |           | structure  | scheduling         |     |     |
element
| RECSALEORD  |     | Char  10  | Receiving sales order  | Not used              |     |     |
| ----------- | --- | --------- | ---------------------- | --------------------- | --- | --- |
| RECITEM     |     | Char  6   | Position               | number  in  Not used  |     |     |
recipient sales order
| RECCOSTOBJ  |     | Char  12  | Receiving cost object  | Not used            |     |     |
| ----------- | --- | --------- | ---------------------- | ------------------- | --- | --- |
| RECBUSPROC  |     | Char  12  | Receiving              | business  Not used  |     |     |
process
| REC_NETWRK  |     | Char  12  | Receiving network  | Not used  |     |     |
| ----------- | --- | --------- | ------------------ | --------- | --- | --- |

| RECOPERATN  |     | Char  4  | Receiving  | network  Not used  |     |     |
| ----------- | --- | -------- | ---------- | ------------------ | --- | --- |
operation
| RECRUNSCHD  |     | Char  12  | Receiving repeat order  | Not used  |     |     |
| ----------- | --- | --------- | ----------------------- | --------- | --- | --- |

| MATERIAL  |     | Char  18  | Receiving material  | Not used  |     |     |
| --------- | --- | --------- | ------------------- | --------- | --- | --- |
PROD_VERSN  Char  4  Production version of the  Not used
recipient material
| PLANT  |     | Char  4  | Plant  of  | the  recipient  Not used  |     |     |
| ------ | --- | -------- | ---------- | ------------------------- | --- | --- |
material
RECPRCMTPROC  Char  12  Receiving  procurement  Not used
process
ITEMNO_ACC  Char  10  Position  number  of  the  Not used
accounting document

| REC_CALC_MOTIVE  |     | Char  2  | Recipient  | calculation  Not used  |     |     |
| ---------------- | --- | -------- | ---------- | ---------------------- | --- | --- |
motive

| RECACTTYPE  |     | Char  6  | Receiving activity type  | Not used  |     |     |
| ----------- | --- | -------- | ------------------------ | --------- | --- | --- |

MBL_SAP_Implementation_CO-ILV_Conf_Up.docxVersion: 1.0.1362  Page 2 of 5

|     |     |     |     |     | Upload Rückmeldungen  |     |
| --- | --- | --- | --- | --- | --------------------- | --- |

| Field  |     | T  L  | Meaning  | Meaning in HYDRA  |     |     |
| ------ | --- | ----- | -------- | ----------------- | --- | --- |
SRE_COMP_CODE  Char  4  Company  code  of  the  Not used
sending real estate object
| SRE_BUS_ENT  |     | Char  8  | Sending  | business  unit  Not used  |     |     |
| ------------ | --- | -------- | -------- | ------------------------- | --- | --- |
real estate
SRE_PROPERTY  Char  8  Sending lot of land real  Not used
estate
SRE_BUILDING  Char  8  Sending  building  real  Not used
estate
SRE_RENT_UNIT  Char  8  Sending  rental  unit  real  Not used
estate
| SRE_LEASE  |     | Char  13  | Sending rental agreement  | Not used  |     |     |
| ---------- | --- | --------- | ------------------------- | --------- | --- | --- |
real estate
SRE_MGMT_CON  Char  13  Sending  administration  Not used
agreement
SRE_INC_EXP  Char  4  Sending incidental costs  Not used
key real estate
SRE_SETT_UNIT  Char  5  Sending  accounting  unit  Not used
real estate
SRE_REF_DATE  Char  8  Sending  reference  date  Not used
settlement real estate
| SRE_CON_NO  |     | Char  13  | Sending  | contract  real  Not used  |     |     |
| ----------- | --- | --------- | -------- | ------------------------- | --- | --- |
estate
RRE_COMP_CODE  Char  4  Company  code  of  the  Not used
|     |     |     | receiving  | real  estate  |     |     |
| --- | --- | --- | ---------- | ------------- | --- | --- |
object

| RRE_BUS_ENT  |     | Char  8  | Receiving  | business  unit  Not used  |     |     |
| ------------ | --- | -------- | ---------- | ------------------------- | --- | --- |
real estate

| RRE_PROPERTY  |     | Char  8  | Receiving lot of land real  | Not used  |     |     |
| ------------- | --- | -------- | --------------------------- | --------- | --- | --- |
estate

| RRE_BUILDING  |     | Char  8  | Receiving  | building  real  Not used  |     |     |
| ------------- | --- | -------- | ---------- | ------------------------- | --- | --- |
estate

| RRE_RENT_UNIT  |     | Char  8  | Receiving rental unit real  | Not used  |     |     |
| -------------- | --- | -------- | --------------------------- | --------- | --- | --- |
estate

| RRE_LEASE  |     | Char  13  | Receiving  | rental  Not used  |     |     |
| ---------- | --- | --------- | ---------- | ----------------- | --- | --- |
agreement real estate

| RRE_MGMT_CON  |     | Char  13  | Receiving  | administration  Not used  |     |     |
| ------------- | --- | --------- | ---------- | ------------------------- | --- | --- |
contract

| RRE_INC_EXP  |     | Char  4  | Receiving incidental costs  | Not used  |     |     |
| ------------ | --- | -------- | --------------------------- | --------- | --- | --- |
key real estate
RRE_SETT_UNIT  Char  5  Receiving accounting unit  Not used
real estate
RRE_REF_DATE  Char  8  Receiving reference date  Not used
settlement real estate
RRE_CON_NO  Char  13  Receiving  contract  real  Not used
estate
MATERIAL_EXTERNAL  Char  40  Long  material  number  Not used
|     |     |     | (future  development)  | for  |     |     |
| --- | --- | --- | ---------------------- | ---- | --- | --- |
the field MATER
MATERIAL_GUID  Char  32  External  GUID  (future  Not used
development) for the field
MATERIAL
MATERIAL_VERSION  Char  10  Version  number  (future  Not used
development) for the field
MATERIAL

MBL_SAP_Implementation_CO-ILV_Conf_Up.docxVersion: 1.0.1362  Page 3 of 5

|     |     |     |     |     |     | Upload Rückmeldungen  |     |
| --- | --- | --- | --- | --- | --- | --------------------- | --- |

Confirmation - indirect activity allocation
Segment E1ACC_SENDER_ACTIVITIES
| Field name       |     | T  L     | Meaning          |     | Meaning in HYDRA  |     |     |
| ---------------- | --- | -------- | ---------------- | --- | ----------------- | --- | --- |
| IGNORE_WARNINGS  |     | Char  1  | Ignore warnings  |     | Not occupied      |     |     |

|     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |

Segment E1BPDOCHDRP000
| Field name  |     | T  L  | Meaning  |     | Meaning in HYDRA  |     |     |
| ----------- | --- | ----- | -------- | --- | ----------------- | --- | --- |

CO_AREA  Char  4  Controlling area  According to configuration*)
| DOCDATE  |     | Char  8  | Document date  |     | Log. Date  |     |     |
| -------- | --- | -------- | -------------- | --- | ---------- | --- | --- |
POSTGDATE  Char  8  Posting date  Set according to shift date of the
posting records
| VERSION  |     | Char  3   | Version          |     | according to configuration*)  |     |     |
| -------- | --- | --------- | ---------------- | --- | ----------------------------- | --- | --- |
| DOC_NO   |     | Char  10  | Document number  |     | Not occupied                  |     |     |
VARIANT  Char  5  Fast document entry of CO- According to configuration*)
actual postings: Variant
| DOC_HDR_TX  |     | Char  50  | Document header text  |     | Not used  |     |     |
| ----------- | --- | --------- | --------------------- | --- | --------- | --- | --- |
USERNAME  Char  12  Name of the user  According to configuration*)
| OBJ_KEY  |     | Char  20  | Reference key  |     | Not used  |     |     |
| -------- | --- | --------- | -------------- | --- | --------- | --- | --- |

| OBJ_TYPE  |     | Char  5   | Reference operation  |             | Not used       |     |     |
| --------- | --- | --------- | -------------------- | ----------- | -------------- | --- | --- |
| OBJ_SYS   |     | Char  10  | Logical              | system  of  | the  Not used  |     |     |
original document

Segment E1BPIAITM000
| Field name  |     | T  L  | Meaning  |     | Meaning in HYDRA  |     |     |
| ----------- | --- | ----- | -------- | --- | ----------------- | --- | --- |

| SEND_CCTR   |     | Char  10  | Sending cost center   |     |     |     |     |
| ----------- | --- | --------- | --------------------- | --- | --- | --- | --- |
according to configuration*)
ACTTYPE   Char  6  Activity type   according to configuration*)
SENBUSPROC   Char  12  Sending business process  Not used
Quan
ACTVTY_QTY   15.3  Activities quantity   according to configuration*)
ACTIVITYUN   Char  3  Activity unit   according to configuration*)
| ACTIVITYUN_ISO   |     | Char  3  | ISO-code  | unit  | of Not used  |     |     |
| ---------------- | --- | -------- | --------- | ----- | ------------ | --- | --- |
measurement
POS_OUTQTY   Quan  15.3  Posted output quantity   Not used
| POSTOUTUN       |     | Char  3  | Posted output unit   |       | Not used     |     |     |
| --------------- | --- | -------- | -------------------- | ----- | ------------ | --- | --- |
| POSTOUTUN_ISO   |     | Char  3  | ISO-code             | unit  | of Not used  |     |     |
measurement
| PERSON_NO   |     | Numc  8  | Personnel number   |     |     |     |     |
| ----------- | --- | -------- | ------------------ | --- | --- | --- | --- |

| SEG_TEXT   |     | Char  50  | Segment text   |     | Not used  |     |     |
| ---------- | --- | --------- | -------------- | --- | --------- | --- | --- |

MBL_SAP_Implementation_CO-ILV_Conf_Up.docxVersion: 1.0.1362  Page 4 of 5

Upload Rückmeldungen
MBL_SAP_Implementation_CO-ILV_Conf_Up.docxVersion: 1.0.1362 Page 5 of 5