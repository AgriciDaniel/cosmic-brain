|     |     |     |     | HYSAPQMC - Programmparameters  |     |     |
| --- | --- | --- | --- | ------------------------------ | --- | --- |

1  HYSAPQMC - Programmparameter
Usage
Use the interface program hysapqmc.exe/out, to request downloads from SAP QM via the QM-IDI-
interface. The program downloads QM master date as well as inspection specifications.
Available program parameters
| Parameter  |     | Meaning/  |     |     | Relevant    | Productive  |
| ---------- | --- | --------- | --- | --- | ----------- | ----------- |
|            |     | Usage     |     |     | interfaces  | release     |
Program parameter to control processing
| /MESTYP=<Value>  |     | The MESTYP parameter is used to  |                 |         | All  | YES  |
| ---------------- | --- | -------------------------------- | --------------- | ------- | ---- | ---- |
|                  |     | define                           | the  structure  | to  be  |      |      |
processed.
/MESFCT=<Value>  The  message  function  is  used  to  All  YES
differentiate within a message type
/VARIANTE=<Value>  Variant  for  parameters  of  function  All  YES
module
| /LOGSYS=<Value>  |     | Logical        | system  for    | which  the  | All  | YES  |
| ---------------- | --- | -------------- | -------------- | ----------- | ---- | ---- |
|                  |     | communication  | is  performed  | (only       |      |      |
used with stand-alone CAQ)
/MESTYP_OUT=<Value>  Message  type  which  is  to  be  All  YES
created
/TL=<TRL_ALL/TRL_CONN/  Defines  the  trace  level  for  All  YES
| TRL_TID/TRL_DATA  |     | communication processes  |     |     |     |     |
| ----------------- | --- | ------------------------ | --- | --- | --- | --- |
/PP_PDC_NO_COPY  When  requesting  inspection  SAP-PPPDC  YES
|     |     | characteristics  | based                     | on  PP-PDC  |     |     |
| --- | --- | ---------------- | ------------------------- | ----------- | --- | --- |
|     |     | data, the        | original  PP-PDC data is  |             |     |     |
not copied as well
GET_INSPPOINTS_4_INSPLOTS  Request from sap only inspections  SAP-QMIDI  YES
points for the determined inspection
|     |     | lots  from   | an  inbound  | transaction  |     |     |
| --- | --- | ------------ | ------------ | ------------ | --- | --- |
|     |     | (/TID={TID}  | (available   | as           | of  |     |
hysapqmc.exe/out V8.1.1.26)

MBL_HYSAPQMC_Program_Parameters.docxVersion: 1.1.2579  Page 1 of 1