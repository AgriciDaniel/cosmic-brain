Interface based on database - technical instructions
1 Interface based on database - technical instructions
Basic structure of the interface
The database-based interface enables external applications to file and retrieve data for the data exchange
with HYDRA from interface tables of the MES Weaver MLE layer. This document describes the database
structure and the process of exchanging data.

The MLE layer includes four tables to process data transfer.
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 1 of 16

Interface based on database - technical instructions
HYDRA manages (IDoc) data from the ERP system and IDocs to be uploaded/confirmed in the presented
interface tables. Data is filed according to the relevant interface structure. When it comes to HYDRA
inbound processing, data from these tables is added to the HYDRA data model. With HYDRA outbound
processing, upload data is written into outbound tables where external systems can retrieve it.
Data supply external system --> HYDRA
The external application enters data into the corresponding tables of the HYDRA MLE layer. It is important
that data (1-n data records) for the IDoc is first written in the table hysap_inbound_data by the external
application. Then the external application writes a control record (1 data record) including the relevant data
in the table hysap_inbound_ctrl. The external application links the entries of both tables by a distinct
transaction number.
The transaction number must be distinct and structured as described below:
DBLINK<user-defined section>
We recommend using a date/time stamp of format "DBLINKYYYYMMDDHHMMSSsss" for the
user-defined section. But different structures are also allowed, as long as the number is distinct
within the tables "hysap_inbound_ctrl" and "hysap_inbound_data".
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 2 of 16

Interface based on database - technical instructions
The HYDRA MLE Dispatcher organizes inbound processing in HYDRA. This dispatcher monitors inbound
transactions. When new messages arrive, it also specifies and starts the respective processing routine
(program) based on the message type (from the MLE distribution model) to transfer data to HYDRA.
Inbound transactions are processed according to the sequence specified by the external application.
Consequently, a transaction can only be processed, once the previous transaction has been completed.
Log and error files are created for data transferred by HYDRA.
The tasks of the individual steps in the HYDRA inbound processing are divided as follows between the
external system and HYDRA:
Step Responsible system
Write data segments (table hysap_inbound_data) External system
Write the control record (table hysap_inbound_ctrl) External system
Processing of data HYDRA (MLE dispatcher + processing programs)
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 3 of 16

Interface based on database - technical instructions
Data retrieval HYDRA  external system
HYDRA's upload programs provide data to be uploaded in the relevant interface format into the outbound
table "hysap_out_data". From there the external application can export the table to the other system. After
data has been exported, the external application updates specific fields in the outbound table
hysap_out_data (see details in the table description of table hysap_out_data). The external application then
generates a control record in the table hysap_out_ctrl (see details in the table description of table
hysap_out_ctrl) and links the two tables with a distinct transaction number.
The transaction number must be distinct and structured as described below:
DBLINK<user-defined section>
We recommend using a date/time stamp of format "DBLINKYYYYMMDDHHMMSSsss" for the
user-defined section. But different structures are also allowed, as long as the number is distinct
within the tables "hysap_out_ctrl" and "hysap_out_data".
The uploaded records are prepared by HYDRA's upload programs, converted into the IDoc format and
stored in the table "hysap_out_data". Records that have not yet been uploaded have the status "000"
(hysap_out_data.ds_status).
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 4 of 16

    Interface based on database - technical instructions

During the transfer the external application must change the status (hysap_out_data.DS_STATUS) to
"100“. Once transferred successfully, the external application must change the status to "099" in the table
"hysap_out_data". An entry is to be generated in the table "hysap_out_ctrl" and both tables must be linked
with a distinct transaction number.
Processing of multi-level, hierarchical outbound structures represents an exception. The HYDRA upload
programs  provide  these  structures  in  the  appropriate  format  required  by  the  respective  interface
specification. The external application connects the header data record and the detailed records (sub-
segments) via the fields VERWEIS and KOPF_VERWEIS of the table hysap_out_data. In this context, the
KOPF_VERWEIS of detailed records includes the header record's reference.
Example:
The following hierarchical structure is defined in the specification of the interface:

HYDRA's upload programs provide data in the following format in the table "hysap_out_data".
Table HYSAP_OUT_DATA
|                       |                      |          |               |     |
| --------------------- | -------------------- | -------- | ------------- | --- |
| Status  Segment name  | SDATA                | VERWEIS  | KOPF_VERWEIS  |     |
| 000  Z2WEI000X000     | User data of upload  | 52143    |               |     |

| 000  | User data of upload  | 52144  |     | 52143  |
| ---- | -------------------- | ------ | --- | ------ |
Z2CNRATT_C000X000
| 001  | User data of upload  | 52145  |     | 52143  |
| ---- | -------------------- | ------ | --- | ------ |
Z2CNRATT_C001X000
| 001  Z2CNRATT_N000X000  | User data of upload  | 52146  |     | 52143  |
| ----------------------- | -------------------- | ------ | --- | ------ |
| 001  Z2WEI000X000       | User data of upload  | 52147  |     |        |
| 001  Z2CNRATT_C000X000  | User data of upload  | 52148  |     | 52147  |
| 001  Z2CNRATT_C001X000  | User data of upload  | 52149  |     | 52147  |
| 001  Z2CNRATT_N000X000  | User data of upload  | 52150  |     | 52147  |
| 001  Z2WEI000X000       | User data of upload  | 52151  |     |        |

| 001  Z2CNRATT_C000X000  | User data of upload  | 52152  |     | 52151  |
| ----------------------- | -------------------- | ------ | --- | ------ |
| 001  Z2CNRATT_C001X000  | User data of upload  | 52153  |     | 52151  |
| 001                     | User data of upload  | 52154  |     | 52151  |
Z2CNRATT_N000X000

| MBL_MLE_DB-Interface.docx  | Version: 1.3.10050  |     | Page 5 of 16  |     |
| -------------------------- | ------------------- | --- | ------------- | --- |

|     |     |     |   Interface based on database - technical instructions  |     |
| --- | --- | --- | ------------------------------------------------------- | --- |

In order to export data, external applications must select header records at first and set their status to "100".
Now the sub-segments (detailed records) can be selected using the "KOPF_VERWEIS" column. Those
lines matching the value of the "VERWEIS" column of the header record (in our example: "52143") will also
be selected.
The tasks of the individual steps in the HYDRA outbound processing are divided as follows between the
external system and HYDRA:
| Step  |     |     | Responsible system  |     |
| ----- | --- | --- | ------------------- | --- |
Write data segments (table hysap_out_data with  HYDRA upload programs
hysap_out_data.status = ‚000‘)
| Set data records to status „IN PROCESS“ (table  |                              |     | External system  |     |
| ----------------------------------------------- | ---------------------------- | --- | ---------------- | --- |
| hysap_out_data                                  | with  hysap_out_data.status  |     | =                |     |
‚100‘)
| Update of specific fields in the data records (table  |     |     | External system  |     |
| ----------------------------------------------------- | --- | --- | ---------------- | --- |
hysap_out_data)
| Write the control record (table hysap_out_ctrl)  |               |                  | External system       |     |
| ------------------------------------------------ | ------------- | ---------------- | --------------------- | --- |
| Link  of  data                                   | records  and  | control  record  | via  External system  |     |
transaction number

| MBL_MLE_DB-Interface.docx  |     | Version: 1.3.10050  |     | Page 6 of 16  |
| -------------------------- | --- | ------------------- | --- | ------------- |

    Interface based on database - technical instructions

HYDRA inbound processing – table hysap_inbound_ctrl
The table "hysap_inbound_ctrl" includes the control records of the data records transferred to HYDRA. The
table contains fields of the IDoc control record and additional control fields for HYDRA processing. The
structure of the table and the meaning of single fields are described in the sections that follow.
| Field name  | Data type   | Description  | Purpose  | Manda- |
| ----------- | ----------- | ------------ | -------- | ------ |
tory field
| ta_id  | CHAR(30)  | Transaction ID  | Transaction number  | X   |
| ------ | --------- | --------------- | ------------------- | --- |
Unique key (see above
note)
ta_type  CHAR(5)  Description of the type of  fixed “IDOC”  X
structure
| ta_status  | CHAR(3)   | Processing status  | Fixed "000"          | X   |
| ---------- | --------- | ------------------ | -------------------- | --- |
| ta_logsys  | CHAR(10)  | Logical system     | Not used / assigned  |     |
ta_lines  INTEGER  Number of data records  Number of data records of  X
|           |          | included in the transaction  | the IDoc   |     |
| --------- | -------- | ---------------------------- | ---------- | --- |
| ta_ldone  | INTEGER  | Number of data records       | Fixed "0"  | X   |
processed in the transaction
| ta_lunknown  | INTEGER  | Number of unknown data  | Fixed "0"  | X   |
| ------------ | -------- | ----------------------- | ---------- | --- |
records included in the
transaction
| ta_lerror  | INTEGER  | Number of faulty data  | Fixed "0"  | X   |
| ---------- | -------- | ---------------------- | ---------- | --- |
records included in the
transaction
ta_savdate  DATE  Date of receipt in HYDRA  Current date in format  X
"mm/dd/yyyy“
ta_savtime  INTEGER  Time of receipt in HYDRA  Current time in "seconds  X
after midnight"
ta_workdate  DATE  Date of processing  Not used / assigned
ta_worktime  INTEGER  Processing time  Not used / assigned
sap_tabnam  CHAR(10)  Name of table structure  From IDoc control record  X
or fixed "EDI_DC40"
| sap_mandt  | CHAR(3)  | Client  | From IDoc control record/  |     |
| ---------- | -------- | ------- | -------------------------- | --- |
not relevant for processing
in HYDRA
sap_docnum  CHAR(16)  IDoc number  From IDoc control record/
not relevant for processing
in HYDRA
sap_docrel  CHAR(4)  SAP release for IDoc   From IDoc control record/
not relevant for processing
in HYDRA

| MBL_MLE_DB-Interface.docx  |     | Version: 1.3.10050  |     | Page 7 of 16  |
| -------------------------- | --- | ------------------- | --- | ------------- |

Interface based on database - technical instructions
Field name Data type Description Purpose Manda-
tory field
sap_status CHAR(2) Status of IDoc From IDoc control record/
not relevant for processing
in HYDRA
sap_direct CHAR(1) Direction (point of view: R/3) From IDoc control record/
not relevant for processing
in HYDRA
sap_outmod CHAR(1) Output mode of IDocs in R/3 From IDoc control record/
not relevant for processing
in HYDRA
sap_exprss CHAR(1) Overriding in inbound From IDoc control record/
processing not relevant for processing
in HYDRA
sap_test CHAR(1) Test identifier From IDoc control record/
not relevant for processing
in HYDRA
sap_idoctyp CHAR(30) Name of basic type According to specifications X
of the respective user data
interface
sap_cimtyp CHAR(30) Extension (defined by From IDoc control record/
customer) (sub-segment, not relevant for processing
e.g. for customizations --> in HYDRA
future-proofed)
sap_mestyp CHAR(30) Message type According to specifications X
of the respective user data
interface
sap_mescod CHAR(3) Message code From IDoc control record/
not relevant for processing
in HYDRA
sap_mesfct CHAR(3) Message function According to specifications X
of the respective user data
interface
sap_std CHAR(1) EDI standard, identifier From IDoc control record/
not relevant for processing
in HYDRA
sap_stdvrs CHAR(6) EDI standard, version and From IDoc control record/
release not relevant for processing
in HYDRA
sap_stdmes CHAR(6) EDI message type From IDoc control record/
not relevant for processing
in HYDRA
sap_sndpor CHAR(10) Sender port (SAP system, From IDoc control record/
external subsystem) not relevant for processing
in HYDRA
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 8 of 16

Interface based on database - technical instructions
Field name Data type Description Purpose Manda-
tory field
sap_sndprt CHAR(2) Partner type From IDoc control record/
not relevant for processing
in HYDRA
sap_sndpfc CHAR(2) Partner function of sender From IDoc control record/
not relevant for processing
in HYDRA
sap_sndprn CHAR(10) Partner number of sender From IDoc control record/
(logical system) not relevant for processing
in HYDRA
sap_sndsad CHAR(21) Sender address (SADR) From IDoc control record/
not relevant for processing
in HYDRA
sap_sndlad CHAR(70) Logical address of sender From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvpor CHAR(10) Receiver port From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvprt CHAR(2) Partner type From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvpfc CHAR(2) Partner function of recipient From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvprn CHAR(10) Partner number of receiver From IDoc control record/
(log. system) not relevant for processing
in HYDRA
sap_rcvsad CHAR(21) Recipient address (SADR) From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvlad CHAR(70) Logical address of recipient From IDoc control record/
not relevant for processing
in HYDRA
sap_credat DATE Created on (in ERP) From IDoc control record/
not relevant for processing
in HYDRA
sap_cretim INTEGER Created at (in ERP) From IDoc control record/
not relevant for processing
in HYDRA
sap_refint CHAR(14) Transmission file (EDI From IDoc control record/
Interchange) not relevant for processing
in HYDRA
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 9 of 16

    Interface based on database - technical instructions

| Field name  | Data type   | Description  | Purpose  | Manda- |
| ----------- | ----------- | ------------ | -------- | ------ |
tory field
sap_refgrp  CHAR(14)  Message group (EDI  From IDoc control record/
|     |     | Message Group)   | not relevant for processing  |     |
| --- | --- | ---------------- | ---------------------------- | --- |
in HYDRA
sap_refmes  CHAR(14)  Message (EDI Message)  From IDoc control record/
not relevant for processing
in HYDRA
sap_arckey  CHAR(70)  Key for external message  From IDoc control record/
|     |     | archive   | not relevant for processing  |     |
| --- | --- | --------- | ---------------------------- | --- |
in HYDRA
sap_serial  CHAR(20)  Serialization  From IDoc control record/
not relevant for processing
in HYDRA
| param1      | CHAR(40)  | Additional parameters  | Not used  |     |
| ----------- | --------- | ---------------------- | --------- | --- |
| param2      | CHAR(40)  | Additional parameters  | Not used  |     |
| bearb       | CHAR(10)  | Modified by            |           |     |
|             |           |                        | Not used  |     |
| bearb_date  | DATE      | Modified on            |           |     |
|             |           |                        | Not used  |     |
| bearb_time  | INTEGER   | Modified at            |           |     |
|             |           |                        | Not used  |     |
verweis  Serial not null  Consecutive number  Assigned automatically by
DB

HYDRA inbound processing – table hysap_inbound_data
The data records of the IDoc (segments) are stored in the table "hysap_inbound_data". The transaction
number represents the key for the tables "hysap_inbound_ctrl" and "hysap_inbound_data".
| Field name  | Data type   | Description  | Purpose  | Manda- |
| ----------- | ----------- | ------------ | -------- | ------ |
tory field
| ta_id  | CHAR(30)  | Transaction ID  | Unique key                | X   |
| ------ | --------- | --------------- | ------------------------- | --- |
|        |           |                 | Unique  key  (see  above  |     |
note)
| ds_status  | CHAR(3)  | Segment status  | Fixed "000"  | X   |
| ---------- | -------- | --------------- | ------------ | --- |
ds_savdate  DATE  Date of receipt in HYERP  Current  system  date  in  X
format "mm/dd/yyyy“
ds_savtime  INTEGER  Time of receipt in HYERP  Current  system  time  in  X
seconds
ds_workdate  DATE  Date of the last editing  Not used / assigned
ds_worktime  INTEGER  Time of the last editing  Not used / assigned

MBL_MLE_DB-Interface.docx  Version: 1.3.10050  Page 10 of 16

    Interface based on database - technical instructions

| Field name  | Data type   | Description  | Purpose  | Manda- |
| ----------- | ----------- | ------------ | -------- | ------ |
tory field
sap_segnam  CHAR(30)  Segment  According to specifications  X
of the respective user data
interface
| sap_mandt  | CHAR(3)  | Client  | From IDoc data record/ not  |     |
| ---------- | -------- | ------- | --------------------------- | --- |
relevant for  processing in
HYDRA
| sap_docnum  | CHAR(16)  | IDoc number  | Reserved: fixed  | X   |
| ----------- | --------- | ------------ | ---------------- | --- |
'0000000000000000'
sap_segnum  CHAR(6)  Segment number  Reserved: fixed '000000'  X
sap_psgnum  CHAR(6)  Number  of  the  parent  Reserved; fixed: '000000'  X
segment (if available)
sap_hlevel  CHAR(2)  Hierarchy level  Reserved; fixed: '00'  X
sap_sdata  CHAR(2000)  IDoc data  According to specifications  X
of the respective user data
interface
| param1      | CHAR(40)  | Additional parameters  | Not used  |     |
| ----------- | --------- | ---------------------- | --------- | --- |
| param2      | CHAR(40)  | Additional parameters  | Not used  |     |
| bearb       | CHAR(10)  | Modified by            |           |     |
|             |           |                        | Not used  |     |
| bearb_date  | DATE      | Modified on            |           |     |
|             |           |                        | Not used  |     |
| bearb_time  | INTEGER   | Modified at            |           |     |
|             |           |                        | Not used  |     |
verweis  Serial not null  Consecutive number  Assigned automatically by
DB

HYDRA outbound processing – table hysap_out_ctrl
The table is only populated once data has been transferred successfully. The table is structured as follows.
Field name  Data type   Description  Example / comment  Manda-
tory field
ta_id  CHAR(30)  Transaction ID  Distinct transaction number  X
|     |     |     | (please  see  the  above- |     |
| --- | --- | --- | ------------------------- | --- |
mentioned note)
ta_type  CHAR(5)  Description of the structure  fixed “IDOC”  X
type
ta_status  CHAR(3)  Processing status  fixed "099" (processed)  X

MBL_MLE_DB-Interface.docx  Version: 1.3.10050  Page 11 of 16

Interface based on database - technical instructions
Field name Data type Description Example / comment Manda-
tory field
ta_lines INTEGER Number of segments of the Number of data records X
data record included in the
IDoc
ta_ldone INTEGER Number of processed Number of data records X
segments of the IDoc
sav_date DATE Date of receipt from HYDRA Current system date in X
format "mm/dd/yyyy“
sav_time INTEGER Time of receipt from HYDRA Current system time in X
"seconds after midnight"
work_dat DATE Date of the transfer Current system date in X
format "mm/dd/yyyy“
work_time TIME Time of the transfer Current system time in X
"seconds after midnight"
sap_tabnam CHAR(10) Name of table structure Fixed "EDI_DC40" X
sap_mandt CHAR(3) Client From IDoc control record/
not relevant for processing
in HYDRA
sap_docnum CHAR(16) IDoc number From IDoc control record/
not relevant for processing
in HYDRA
sap_docrel CHAR(4) SAP release for IDoc From IDoc control record/
not relevant for processing
in HYDRA
sap_status CHAR(2) Status of IDoc From IDoc control record/
not relevant for processing
in HYDRA
sap_direct CHAR(1) Direction (point of view: R/3) From IDoc control record/
not relevant for processing
in HYDRA
sap_outmod CHAR(1) Output mode of IDocs in R/3 From IDoc control record/
not relevant for processing
in HYDRA
sap_exprss CHAR(1) Overriding in inbound From IDoc control record/
processing not relevant for processing
in HYDRA
sap_test CHAR(1) Test identifier From IDoc control record/
not relevant for processing
in HYDRA
sap_idoctyp CHAR(30) Name of basic type According to specifications X
of the respective user data
interface
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 12 of 16

Interface based on database - technical instructions
Field name Data type Description Example / comment Manda-
tory field
sap_cimtyp CHAR(30) Extension (defined by From IDoc control record/
customer) (sub-segment, not relevant for processing
e.g. for customizations --> in HYDRA
future-proofed)
sap_mestyp CHAR(30) Message type According to specifications X
of the respective user data
interface
sap_mescod CHAR(3) Message code From IDoc control record/
not relevant for processing
in HYDRA
sap_mesfct CHAR(3) Message function According to specifications X
of the respective user data
interface
sap_std CHAR(1) EDI standard, identifier From IDoc control record/
not relevant for processing
in HYDRA
sap_stdvrs CHAR(6) EDI standard, version and From IDoc control record/
release not relevant for processing
in HYDRA
sap_stdmes CHAR(6) EDI message type From IDoc control record/
not relevant for processing
in HYDRA
sap_sndpor CHAR(10) Sender port (SAP System, From IDoc control record/
external subsystem) not relevant for processing
in HYDRA
sap_sndprt CHAR(2) Partner type From IDoc control record/
not relevant for processing
in HYDRA
sap_sndpfc CHAR(2) Partner function of sender From IDoc control record/
not relevant for processing
in HYDRA
sap_sndprn CHAR(10) Partner number of sender From IDoc control record/
(log. system) not relevant for processing
in HYDRA
sap_sndsad CHAR(21) Sender address (SADR) From IDoc control record/
not relevant for processing
in HYDRA
sap_sndlad CHAR(70) Logical address of sender From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvpor CHAR(10) Receiver port From IDoc control record/
not relevant for processing
in HYDRA
MBL_MLE_DB-Interface.docx Version: 1.3.10050 Page 13 of 16

    Interface based on database - technical instructions

Field name  Data type   Description  Example / comment  Manda-
tory field
sap_rcvprt  CHAR(2)  Partner type  From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvpfc  CHAR(2)  Partner function of recipient   From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvprn  CHAR(10)  Partner number of receiver  From IDoc control record/
|     |     | (log. system)  | not relevant for processing  |     |
| --- | --- | -------------- | ---------------------------- | --- |
in HYDRA
sap_rcvsad  CHAR(21)  Recipient address (SADR)   From IDoc control record/
not relevant for processing
in HYDRA
sap_rcvlad  CHAR(70)  Logical address of recipient   From IDoc control record/
not relevant for processing
in HYDRA
sap_credat  DATE  Created on (in ERP)  From IDoc control record/
not relevant for processing
in HYDRA
sap_cretim  INTEGER  Created at (in ERP)  From IDoc control record/
not relevant for processing
in HYDRA
sap_refint  CHAR(14)  Transmission file (EDI  From IDoc control record/
|     |     | Interchange)   | not relevant for processing  |     |
| --- | --- | -------------- | ---------------------------- | --- |
in HYDRA
sap_refgrp  CHAR(14)  Message group (EDI  From IDoc control record/
|     |     | Message Group)   | not relevant for processing  |     |
| --- | --- | ---------------- | ---------------------------- | --- |
in HYDRA
sap_refmes  CHAR(14)  Message (EDI Message)  From IDoc control record/
not relevant for processing
in HYDRA
sap_arckey  CHAR(70)  Key for external message  From IDoc control record/
|     |     | archive   | not relevant for processing  |     |
| --- | --- | --------- | ---------------------------- | --- |
in HYDRA
sap_serial  CHAR(20)  Serialization  From IDoc control record/
not relevant for processing
in HYDRA
| param1      | CHAR(30)  | Additional parameters  | Not used  |     |
| ----------- | --------- | ---------------------- | --------- | --- |
| param2      | CHAR(30)  | Additional parameters  | Not used  |     |
| bearb       | CHAR(10)  | Modified by            |           |     |
|             |           |                        | Not used  |     |
| bearb_date  | DATE      | Modified on            |           |     |
|             |           |                        | Not used  |     |
| bearb_time  | INTEGER   | Modified at            |           |     |
|             |           |                        | Not used  |     |

MBL_MLE_DB-Interface.docx  Version: 1.3.10050  Page 14 of 16

    Interface based on database - technical instructions

Field name  Data type   Description  Example / comment  Manda-
tory field
verweis  Serial not null  Consecutive number  Assigned automatically by
DB

HYDRA outbound processing – table hysap_out_data
The table hysap_out_data is structured as follows.
| Field name  | Type  | Description  |     | Example / comment  | Manda- |
| ----------- | ----- | ------------ | --- | ------------------ | ------ |
tory field
| ta_id  | CHAR(30)  | Transaction ID  |     |                       |     |
| ------ | --------- | --------------- | --- | --------------------- | --- |
|        |           |                 |     | Distinct transaction  | X   |
number (please see the
above-mentioned note)
ds_status  CHAR(3)  Segment status  Before the transfer "000"  X
During the transfer "100"
After a successful transfer,
the status is changed to
"099"
| ds_savdate  | DATE  | Date of saving data  |     | Assigned by HYDRA.  |     |
| ----------- | ----- | -------------------- | --- | ------------------- | --- |
ds_savtime  INTEGER  Time of saving data  Assigned by HYDRA.
ds_workdate  DATE  Date of the transfer  Current system date in  X
format "mm/dd/yyyy“
ds_worktime  INTEGER  Time of the transfer  Current system time in  X
seconds
| ds_source_sys  | Char(10)  | ERP target system  |     |                              |     |
| -------------- | --------- | ------------------ | --- | ---------------------------- | --- |
|                |           |                    |     | Assigned by HYDRA.           |     |
| sap_segnam     | CHAR(30)  | Segment            |     |                              |     |
|                |           |                    |     | According to specifications  | X   |
of the respective user data
interface / assigned by
HYDRA
| sap_mandt  | CHAR(3)  | Client  |     |                             |     |
| ---------- | -------- | ------- | --- | --------------------------- | --- |
|            |          |         |     | From IDoc data record/ not  |     |
relevant for processing
| sap_docnum  | CHAR(16)  | IDoc number  |     |                             |     |
| ----------- | --------- | ------------ | --- | --------------------------- | --- |
|             |           |              |     | From IDoc data record/ not  |     |
relevant for processing
sap_segnum  CHAR(6)  Segment number  From IDoc data record/ not
relevant for processing
| sap_psgnum  | CHAR(6)  | Number  of              | the  parent  |                             |     |
| ----------- | -------- | ----------------------- | ------------ | --------------------------- | --- |
|             |          |                         |              | From IDoc data record/ not  |     |
|             |          | segment (if available)  |              | relevant for processing     |     |
| sap_hlevel  | CHAR(2)  | Hierarchy level         |              |                             |     |
|             |          |                         |              | From IDoc data record/ not  |     |
relevant for processing

MBL_MLE_DB-Interface.docx  Version: 1.3.10050  Page 15 of 16

    Interface based on database - technical instructions

| Field name  | Type  | Description  | Example / comment  | Manda- |
| ----------- | ----- | ------------ | ------------------ | ------ |
tory field
| sap_sdata  | CHAR(1000)  | IDoc data  |                              |     |
| ---------- | ----------- | ---------- | ---------------------------- | --- |
|            |             |            | According to specifications  | X   |
of the respective user data
interface / assigned by
HYDRA
| param1      | CHAR(40)         | Additional parameters  |                            |     |
| ----------- | ---------------- | ---------------------- | -------------------------- | --- |
|             |                  |                        | Not used                   |     |
| param2      | CHAR(40)         | Additional parameters  | Not used                   |     |
| bearb       | CHAR(10)         | Modified by            | Not used                   |     |
| bearb_date  | DATE             | Modified on            |                            |     |
|             |                  |                        | Not used                   |     |
| bearb_time  | INTEGER          | Modified at            | Not used                   |     |
| verweis     | Serial not null  | Consecutive number     |                            |     |
|             |                  |                        | Assigned automatically by  |     |
DB
| kopf_verweis  | INTEGER  | Header reference  |                |      |
| ------------- | -------- | ----------------- | -------------- | ---- |
|               |          |                   | Refers to the  | (X)  |
corresponding master
segment in hierarchical
structures

Archiving
Archiving of MLE inbound and outbound tables is based on MLE archiving.
Entries for inbound and outbound processing must be added to the distribution model in order to
ensure archiving.

MBL_MLE_DB-Interface.docx  Version: 1.3.10050  Page 16 of 16