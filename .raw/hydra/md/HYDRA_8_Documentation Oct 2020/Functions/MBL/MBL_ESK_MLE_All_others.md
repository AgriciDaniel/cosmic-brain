|     |     |     |     | Weitere MLE-Eskalationen  |     |     |
| --- | --- | --- | --- | ------------------------- | --- | --- |

1  Further MLE Escalations

| Event  | Description  | Identifications  | Description  |     | Notes  |     |
| ------ | ------------ | ---------------- | ------------ | --- | ------ | --- |
SAP.INBOUND_NOC No  connection  to  LOGSYS  Log.  System,  for  which  no  This  event  will  be
ONNECT  SAP  possible  connection can be established.  triggered  if  the  RFC
|     | (HYDRA inbound)  |     |     |     | server cannot connect  |     |
| --- | ---------------- | --- | --- | --- | ---------------------- | --- |
ROLE  Active role for the log. system
to SAP and/or cancels
|     |     | HOST  | SAP system (name or IP)  |     | an  | existing  |
| --- | --- | ----- | ------------------------ | --- | --- | --------- |
connection.
GATEWAY  Gateway on the SAP server
RFCERRGRP)*1  RFC failure group 1
RFCERRKEY)*1  RFC error key
RFCERRMSG)*1  RFC error message
SAP.INBOUND_FILE Error  copying/  MESTYP  Message type  This  event  will  be
_MOVE_ERR  moving  the  files  at  triggered  if  it  is  not
MESFCT  Message function
|     | the file port  |           |                 |     | possible to write new    |          |
| --- | -------------- | --------- | --------------- | --- | ------------------------ | -------- |
|     |                | WORKPATH  | Work directory  |     | files in the HYDRA file  |          |
|     |                | IFPATH    | Interface path  |     | port                     | inbound  |
processing.
SAP.INBOUND_NO_ No distribution model  MESTYP  Message type  This  event  will  be
| DIST_MODEL  | for a message type  |     |     |     | triggered if there is no  |     |
| ----------- | ------------------- | --- | --- | --- | ------------------------- | --- |
TAID  Transaction number
|     | at  the  HYDRA  |     |     |     | distribution model for  |     |
| --- | --------------- | --- | --- | --- | ----------------------- | --- |
mySAP  inbound  VERWEIS  Reference of the IDoc   a  message  type  in
|     | processing  | IDOCNUM  | IDoc number of the IDoc  |     | HYDRA  | mySAP  |
| --- | ----------- | -------- | ------------------------ | --- | ------ | ------ |
inbound processing.
SAP.INBOUND_DISP Incorrect data record  MESTYP  Message type  This  event  will  be
| _DS_ERROR  | in  the  HYDRA  |     |     |     | triggered  | if  at  least  |
| ---------- | --------------- | --- | --- | --- | ---------- | -------------- |
TAID  Transaction number
|     | mySAP  |     |     |     | one  data  | record  is  |
| --- | ------ | --- | --- | --- | ---------- | ----------- |
inboundprocessing  VERWEIS  Reference of the IDoc   missing  in  HYDRA
|     |     | IDOCNUM  | IDoc number of the IDoc  |     | mySAP  | inbound  |
| --- | --- | -------- | ------------------------ | --- | ------ | -------- |
processing.
SAP.INBOUND_DISP Unknown  data  MESTYP  Message type  This  event  will  be
| _DS_UNKNOWN  | record in the HYDRA  |     |     |     | triggered  | if  at  least  |
| ------------ | -------------------- | --- | --- | --- | ---------- | -------------- |
TAID  Transaction number
|     | mySAP  inbound  |     |     |     | one  data  | record  is  |
| --- | --------------- | --- | --- | --- | ---------- | ----------- |
processing  VERWEIS  Reference of the IDoc   unknown  in  HYDRA
|     |     |     |     |     | mySAP  | inbound  |
| --- | --- | --- | --- | --- | ------ | -------- |
IDOCNUM  IDoc number of the IDoc
processing.
SAP.INBOUND_DISP Incorrect IDoc in the  MESTYP  Message type  This  event  will  be
| _IDOC_ERROR  | HYDRA  mySAP  |     |     |     | triggered  | if  the  |
| ------------ | ------------- | --- | --- | --- | ---------- | -------- |
TAID  Transaction number
|     | inbound processing  |          |                         |     | complete  | IDoc  could    |
| --- | ------------------- | -------- | ----------------------- | --- | --------- | -------------- |
|     |                     | VERWEIS  | Reference of the IDoc   |     | not  be   | processed  in  |
|     |                     |          |                         |     | HYDRA     | mySAP          |
IDOCNUM  IDoc number of the IDoc
inbound processing.
SAP.OUTBOUND_L Logon  error  in  the  LOGSYS  Logical system  This  event  will  be
| OGON_FAILURE  | confirmation of data  |     |     |     | triggered  | if  it  is  |
| ------------- | --------------------- | --- | --- | --- | ---------- | ----------- |
ROLE  Active role of the logical system
|     | to SAP  |     |     |     | detected  | during  the  |
| --- | ------- | --- | --- | --- | --------- | ------------ |
HOST
SAP destination computer of the  confirmation of data to
|     |     |     | confirmation  |     | SAP           | that  a  |
| --- | --- | --- | ------------- | --- | ------------- | -------- |
|     |     |     |               |     | confirmation  | is  not  |
USR  CPIC user for confirmations to
|     |     |     |     |     | possible  | since  the  |
| --- | --- | --- | --- | --- | --------- | ----------- |
SAP
CPIC user is blocked.
RFCERRGRP)*1  RFC failure group 1
RFCERRKEY)*1  RFC error key
RFCERRMSG)*1  RFC error message
SAP.OUTBOUND_N No  connection  to  LOGSYS  Logical system  This  event  will  be
| OCONNECT  | SAP  possible  |     |     |     | triggered  | if  the  RFC  |
| --------- | -------------- | --- | --- | --- | ---------- | ------------- |
ROLE  Active role of the logical system
|     | (HYDRA outbound)  |       |                                  |     | client cannot establish  |     |
| --- | ----------------- | ----- | -------------------------------- | --- | ------------------------ | --- |
|     |                   | HOST  | SAP destination computer of the  |     | a connection to SAP.     |     |
confirmation

| MBL_ESK_MLE_All_others.docx  |     | Version: 1.0.1362  |     |     | Page 1 of 3  |     |
| ---------------------------- | --- | ------------------ | --- | --- | ------------ | --- |

|     |     |     |     | Weitere MLE-Eskalationen  |     |     |
| --- | --- | --- | --- | ------------------------- | --- | --- |

| Event  | Description  | Identifications  | Description  |     | Notes  |     |
| ------ | ------------ | ---------------- | ------------ | --- | ------ | --- |
USR  CPIC user for confirmations to
SAP
RFCERRGRP)*1  RFC failure group 1
RFCERRKEY)*1  RFC error key
RFCERRMSG)*1  RFC error message
SAP.HYINFO_EXCE Exception  (error)  in  LOCLTID  Transaction  number  of  the  This  event  will  be
PTION  the HYINFO function  connection concerned  triggered  if  an
|     | module in SAP  |     |     |     | exception  | (error)  |
| --- | -------------- | --- | --- | --- | ---------- | -------- |
MESTYP  Message type
occurs in the HYINFO
|     |     | RFCERRGRP)*1  | RFC failure group 1  |     | function   | module  in  |
| --- | --- | ------------- | -------------------- | --- | ---------- | ----------- |
|     |     | RFCERRKEY)*1  | RFC error key        |     | SAP  that  | prevents    |
further processing.
RFCERRMSG)*1  RFC error message
SAP.OUTBOUND_FI Error  in  copying/  MESTYP  Message type  This  event  will  be
LE_STILL_THERE  moving  the  files  at  triggered  if  no  new
MESFCT  Message function
|     | the file port  |     |     |     | files can be written in  |     |
| --- | -------------- | --- | --- | --- | ------------------------ | --- |
WORKPATH  Work directory
|     |     |     |     |     | the  HYDRA  | file  port  |
| --- | --- | --- | --- | --- | ----------- | ----------- |
|     |     |     |     |     | outbound    | processing  |
IFPATH  Interface path
since already existing
files are not called by
the partner system.
| MLE.INBOUND_BAPI |     |     |     |     | Escalation              | extended  |
| ---------------- | --- | --- | --- | --- | ----------------------- | --------- |
| _ERROR           |     |     |     |     | by the complete result  |           |
string of the BAPI call.

| MBL_ESK_MLE_All_others.docx  |     | Version: 1.0.1362  |     |     | Page 2 of 3  |     |
| ---------------------------- | --- | ------------------ | --- | --- | ------------ | --- |

|     |     |     | Weitere MLE-Eskalationen  |     |
| --- | --- | --- | ------------------------- | --- |

| MBL_ESK_MLE_All_others.docx  |     | Version: 1.0.1362  |     | Page 3 of 3  |
| ---------------------------- | --- | ------------------ | --- | ------------ |