Beispiel: Download CO-Innenauftrag
1 Example: Download of CO Internal Order
IDoc ZHYDRA_CO_ORDER
IDoc ZHYDRA_CO_ORDER is used to transfer CO internal orders. It has a simple structure since the
user data themselves are transferred to HYDRA in a dynamic dialog string.
Message type: ZHYDRA_CO_ORDER
IDoc type: ZHYDRA_CO_ORDER
Segments: Z2BAPI000
Dialog data string
In HYDRA, one order header is created per CO internal order. Several operations may be allocated to
this order header. Order header and operations can be transmitted in the same IDoc if the order header is
transferred as first segment.
A dialog data string is composed of the control command and the user data The control command is
always transferred with the “DLG=” acronym followed by the command itself.
NOTE:
For all alphanumeric fields, HYDRA does not support specific special indicators. Such as: "%", "\", "/", "|"
since they cannot be entered into the collection terminals and will not be supported there.
The signs ";", " “ ", and " ’ " must not be used since they are often interpreted as comment or separation
signs and will thus lead to unwanted effects.
Order header
The following commands can be used to transfer CO internal orders to the order header:
 ANR.INSERT  Creation of an order header
 ANR.UPDATE  Modification of an order header (delta download)
 ANR.DELETE  Deletion of an order header (deletion download)
The command "AUNR.MODIFY" is a special one: It checks whether the transferred order number exists
already in the order header. If this is the case, the existing data record will be modified (update),
otherwise it will be inserted.
SAP_COILV_Internal_Ord_Down.docx Version: 1.0.1362 Page 1 of 3

|     |     |     |     | Beispiel: Download CO-Innenauftrag  |
| --- | --- | --- | --- | ----------------------------------- |

  ANR.MODIFY      Creation/ modification of an order header (delta download)
The different commands ensure that the download variants such as delta or deletion download of the PP-
PDC interface can be realized.
After the control command, the user data will be transferred. They are presented by the identification
(Acronym column) and separated from each other by "|".

| What                    |     | Acronym       |     | SAP / Value       |
| ----------------------- | --- | ------------- | --- | ----------------- |
| Order number            |     | AUNR.SAPAUNR  |     | SAP order number  |
| Order type              |     | AUNR.AART     |     | "1" or "4"        |
| PPS Indicator           |     | PPS           |     | "J"               |
| Indicator order header  |     | ANR.ATYP      |     | "AU"              |

In this example the dialog data string for a delta download will be structured as follows:
DLG=AUNR.MODIFY|AUNR.SAPAUNR=<SAP-Auftragsnummer>|AUNR.AART=1|PPS=J
Order sequencing
The following commands can be used to transfer CO internal orders to the HYDRA operation structure:
|   ANR.INSERT  |     |   Creation of an operation  |     |     |
| -------------- | --- | ---------------------------- | --- | --- |
  ANR.UPDATE      Modification of an operation (delta download)
  ANR.DELETE      Deletion of an operation (deletion download)
The command "ANR.MODIFY" is a special one: It checks whether an operation exists already for the
transferred order and an operation number. If this is the case, the existing data record will be modified
(update), otherwise it will be inserted.
  ANR.MODIFY      Creation/ modification of an operation (delta download)
The different commands ensure that the download variants such as delta or deletion download of the PP-
PDC interface can be realized.
After the control command, the user data will be transferred. They are presented by the identification
(Acronym column) and separated from each other by "|".

SAP_COILV_Internal_Ord_Down.docx  Version: 1.0.1362  Page 2 of 3

|     |     |     |     | Beispiel: Download CO-Innenauftrag  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| What  |     | Acronym  | SAP  |     | Mandator |
| ----- | --- | -------- | ---- | --- | -------- |
y field
| Order number  |     | ANR.SAPAUNR   | SAP order number       |     | X   |
| ------------- | --- | ------------- | ---------------------- | --- | --- |
| Sequence      |     | ANR.SAPAFOLG  | SAP sequence           |     | X   |
| Operation     |     | ANR.SAPVGNR   | SAP operation number   |     | X   |
If not available in this form, it is
also possible to transfer "0010".
| Sub-operation  |     | ANR.SAPUVGNR  | SAP sub-operation (if  |     | X   |
| -------------- | --- | ------------- | ---------------------- | --- | --- |
necessary)
| Plant           |     | ANR.WERK:S  | SAP plant              |     |     |
| --------------- | --- | ----------- | ---------------------- | --- | --- |
| Workplace       |     | ANR.MNR     | SAP work center        |     | X   |
| OP designation  |     | ANR.AGBEZ   | e.g. order short text  |     |     |
| Order type      |     | ANR.AART    | "1"                    |     | X   |
| PPS Indicator   |     | PPS         | "J"                    |     | X   |
| OP indicator    |     | ANR:ATYP    | "OP"                   |     | X   |
| Start date      |     | ANR.DATB    | ATTENTION:             |     |     |
The date must be transmitted in
American format:
MM/DD/YYYY
| Start time  |     | ANR.ZEIB  | Time in seconds  |     |     |
| ----------- | --- | --------- | ---------------- | --- | --- |
| End date    |     | ANR.DATE  | ATTENTION:       |     |     |
The date must be transmitted in
American format:
MM/DD/YYYY
| End time                     |     | ANR.ZEIE          | Time in seconds  |     |     |
| ---------------------------- | --- | ----------------- | ---------------- | --- | --- |
| The indicator can be logged  |     | ANR.OPT:MULTIMNR  | "J"              |     |     |
on several times

In this example the dialog data string for a delta download will be structured as follows:
DLG=ANR.MODIFY|ANR.SAPAUNR=<SAP order number>|ANR.SAPVGNR=<SAP
transaction number>|ANR.WERKS=<SAP plant>|ANR.MNR=<Workplace>|
ANR.AGBEZ=<OP name>|ANR.AART=1|PPS=J|...

SAP_COILV_Internal_Ord_Down.docx  Version: 1.0.1362  Page 3 of 3