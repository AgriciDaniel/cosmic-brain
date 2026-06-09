|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

1  Available Escalations
1.1  Failure analysis criterion generated for an inspection order
(CPAUERR.INSERTED)
If a failure analysis criterion (failure type, failure location, failure cause, etc.) is created for an inspection
order, the escalation is triggered.
| Event             |     | Identifiers     |     | Description   |     |
| ----------------- | --- | --------------- | --- | ------------- | --- |
| CPAUERR.INSERTEDC |     | CPAUERR.RECTYP  |     | Data type     |     |
PAUE
|     |     | CPAUERR.BER     |     | Area                            |     |
| --- | --- | --------------- | --- | ------------------------------- | --- |
|     |     | CPAUERR.PANNR   |     | Inspection requirement          |     |
|     |     | CPAUERR.PAUNR   |     | Inspection order                |     |
|     |     | CPAUERR.AFO     |     | OP sequence                     |     |
|     |     | CPAUERR.STPRNR  |     | Sample number                   |     |
|     |     | CPAUERR.WERTNR  |     | Measured value number           |     |
|     |     | CPAUERR.ERRTYP  |     | Type of failure analysis entry  |     |
Possible types are:
-  FA (failure type)
-  FU (failure cause)
-  FO (failure location)
-  VU (party responsible/origin)
|     |     | CPAUERR.ERRNR       |     | Number of failure analysis entry    |     |
| --- | --- | ------------------- | --- | ----------------------------------- | --- |
|     |     | CPAUERR.ERRBEZ      |     | Failure designation (*)             |     |
|     |     | CPAUERR.GEWICHTUNG  |     | Weighting                           |     |
|     |     | CPAUERR.BEM         |     | Comment                             |     |
|     |     | CPAN.FU:1           |     | User field 1 Insp. requirement (*)  |     |
|     |     | CPAN.FU:2           |     | User field 2 Insp. requirement (*)  |     |
|     |     | CPAN.FU:3           |     | User field 3 Insp. requirement (*)  |     |
|     |     | CPAN.FU:4           |     | User field 4 Insp. requirement (*)  |     |
|     |     | CPAN.FU:5           |     | User field 5 Insp. requirement (*)  |     |
Type: alphanumeric
|     |     | CPAN.FU:6   |     | User field 6 Insp. requirement (*)   |     |
| --- | --- | ----------- | --- | ------------------------------------ | --- |
|     |     | CPAN.FU:7   |     | User field 7 Insp. requirement (*)   |     |
|     |     | CPAN.FU:8   |     | User field 8 Insp. requirement (*)   |     |
|     |     | CPAN.FU:9   |     | User field 9 Insp. requirement (*)   |     |
|     |     | CPAN.FU:10  |     | User field 10 Insp. requirement (*)  |     |
Type: numeric

| MBL_ESK_FEP_Overview.docx  |     |     | Version: 1.5.22815  |     | Page 1 of 11  |
| -------------------------- | --- | --- | ------------------- | --- | ------------- |

|     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Event  |     | Identifiers  |     | Description                          |     |     |
| ------ | --- | ------------ | --- | ------------------------------------ | --- | --- |
|        |     | CPAN.FU:11   |     | User field 11 Insp. requirement (*)  |     |     |
|        |     | CPAN.FU:12   |     | User field 12 Insp. requirement (*)  |     |     |
Type: floating comma
|     |     | CPAN.FU:13  |     | User field 13 Insp. requirement (*)  |     |     |
| --- | --- | ----------- | --- | ------------------------------------ | --- | --- |
|     |     | CPAN.FU:14  |     | User field 14 Insp. requirement (*)  |     |     |
Type: date
|     |     | CPAN.ATK     |     | Article number (*)        |     |     |
| --- | --- | ------------ | --- | ------------------------- | --- | --- |
|     |     | CPAN.ATKIDX  |     | Drawing issue number (*)  |     |     |
|     |     | CPAN.ANR     |     | Order number (*)          |     |     |
(of the inspection requirement)
|     |     | CPAN.MNR  |     | Machine number (*)  |     |     |
| --- | --- | --------- | --- | ------------------- | --- | --- |
(of the sample)
|     |     | MNR.BEZK        |     | Machine name (*)           |                        |     |
| --- | --- | --------------- | --- | -------------------------- | ---------------------- | --- |
|     |     | ARTIKEL.ATKBEZ  |     | Article name (*)           |                        |     |
|     |     | CPAUMM.OTG      |     | Upper tolerance limit (*)  |                        |     |
|     |     |                 |     | (of  the  inspection       | order  characteristic  | as  |
absolute value)
Before SP15, this information was also output
in the identifier CMM.OTG.
|     |     | CPAUMM.UTG  |     | Lower tolerance limit (*)  |                        |     |
| --- | --- | ----------- | --- | -------------------------- | ---------------------- | --- |
|     |     |             |     | (of  the  inspection       | order  characteristic  | as  |
absolute value)
Before SP15, this information was also output
in the identifier CMM.UTG.
|     |     | CPAUMM.MMBEZ   |     | Name of inspection step characteristic (*)  |     |     |
| --- | --- | -------------- | --- | ------------------------------------------- | --- | --- |
|     |     | CPAUMW.MW      |     | Measured value (*)                          |     |     |
|     |     | CPAUMW.BEMERK  |     | Comment for measured value (*)              |     |     |
|     |     | CPAUMW.PNR     |     | Inspector ID (*)                            |     |     |
(of the measured value)
|     |     | CPAUMW.KNR  |     | Inspector badge number (*)  |     |     |
| --- | --- | ----------- | --- | --------------------------- | --- | --- |
(of the measured value)
|     |     | CPAUMW.NUM:EINTTYP  |     | Type of the number entry (*)  |     |     |
| --- | --- | ------------------- | --- | ----------------------------- | --- | --- |
(e.g. PPUNKT for inspection point)
|     |     | CPAUMW.NUM:EINTNR  |     | Number of the number entry (*)  |     |     |
| --- | --- | ------------------ | --- | ------------------------------- | --- | --- |
(e.g. inspection point number)
|     |     | CPAU.AGNR   |     | Operation number inspection step (*)  |     |     |
| --- | --- | ----------- | --- | ------------------------------------- | --- | --- |
|     |     | PPKT:EQUIP  |     | Equipment (*)                         |     |     |
(inspection point)
|     |     | PPKT:TPLATZ  |     | Functional location (*)  |     |     |
| --- | --- | ------------ | --- | ------------------------ | --- | --- |
(inspection point)

| MBL_ESK_FEP_Overview.docx  |     |     | Version: 1.5.22815  |     | Page 2 of 11  |     |
| -------------------------- | --- | --- | ------------------- | --- | ------------- | --- |

|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers  |     | Description        |     |
| ------ | --- | ------------ | --- | ------------------ | --- |
|        |     | PPKT:TLOS    |     | Partial batch (*)  |     |
(inspection point)
|     |     | PPKT:CNR  |     | Inspection point batch (*)  |     |
| --- | --- | --------- | --- | --------------------------- | --- |
(inspection point)
|     |     | PPKT:USERC1  |     | User field C1 of inspection point (*)  |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- |
(inspection point)
|     |     | PPKT:USERC2  |     | User field C2 of inspection point (*)  |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- |
(inspection point)
|     |     | PPKT:USERN1  |     | User field N1 of inspection point (*)  |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- |
(inspection point)
|     |     | PPKT:USERN2  |     | User field N2 of inspection point (*)  |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- |
(inspection point)
|     |     | NEST  |     | Cavity number (*)  |     |
| --- | --- | ----- | --- | ------------------ | --- |

(*) These  entries can be  used  as  of  service  pack  15.  If the  HYDRA  system  was  initially
implemented  with  an  older  service  pack  version,  the  selection  list  of  escalation  variables
(conditions) or the selection list of available placeholders (message text) do normally not include
these  identifiers.  It  is  still  possible  to  use  these  identifiers  manually  as  message  text  or
condition. You must run a database patch to include the identifiers marked with (*) in the
selection lists.

| MBL_ESK_FEP_Overview.docx  |     |     | Version: 1.5.22815  |     | Page 3 of 11  |
| -------------------------- | --- | --- | ------------------- | --- | ------------- |

Available Escalations
Note:
The escalation message is limited to 1024 characters. It already includes the dialog data string
the escalation is based on. The dialog data string contains about 700 characters without test of
the escalation message. Therefore there are about 300 characters left for the actual test of the
escalation message. If you integrate too many parameters in the escalation message, the dialog
data string including the contents of the escalation message is cut after 1024 characters. A
consequence can be that not all defined contents are integrated in the escalation message. To
show all contents of an escalation message, create the CAQ option 1220. Call the application
Options using the transaction code "qmaopt". Create the option as shown in the screenshot
below.
If you enable this option, the processing of the escalation events mentioned above can be slower
than usual.
MBL_ESK_FEP_Overview.docx Version: 1.5.22815 Page 4 of 11

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| 1.2  | Measure generated (CMASSN.INSERTED)  |     |     |     |
| ---- | ------------------------------------ | --- | --- | --- |
If a measure is generated, the escalation is triggered.
| Event            |     | Identifiers        | Description                            |     |
| ---------------- | --- | ------------------ | -------------------------------------- | --- |
| CMASSN.INSERTED  |     | CMASSN.MASSER      | Identifier of the measure              |     |
|                  |     | CMASSN.RECTYP      | Data type                              |     |
|                  |     | CMASSN.RECREF      | Assignment                             |     |
|                  |     | CMASSN.BER         | Area                                   |     |
|                  |     | CMASSN.KEY:1       | Key field 1                            |     |
|                  |     | CMASSN.KEY:2       | Key field 2                            |     |
|                  |     | CMASSN.KEY:3       | Key field 3                            |     |
|                  |     | CMASSN.KEY:4       | Key field 4                            |     |
|                  |     | CMASSN.KEY:5       | Key field 5                            |     |
|                  |     | CMASSN.MASNR       | Measure number                         |     |
|                  |     | CMASSN.MASTEXT     | Measure text                           |     |
|                  |     | CMASSN.VERANT:TYP  | Party in charge - type                 |     |
|                  |     | CMASSN.VERANT:NR   | Party in charge - number               |     |
|                  |     | CMASSN.STA         | Status                                 |     |
|                  |     | CMASSN.ZIELDAT     | Target date - Date                     |     |
|                  |     | CMASSN.ZIELZEI     | Target date - time                     |     |
|                  |     | CMASSN.ELEM        | associated workflow element            |     |
|                  |     | CMASSN.BEM         | Comment                                |     |
|                  |     | PNR                | Party in charge (only if the party in  |     |
charge is taken from the HR catalog)

| MBL_ESK_FEP_Overview.docx  |     | Version: 1.5.22815  |     | Page 5 of 11  |
| -------------------------- | --- | ------------------- | --- | ------------- |

|     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | ---------------------- | --- |

1.3  Formula calculation: Incorrect characteristic reference in
calculated characteristics
(CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VAL
UE)
If the referenced source characteristic could not be found during the calculation of characteristics, an
escalation is triggered.
| Event                     |     | Identifiers    | Description   |     |     |
| ------------------------- | --- | -------------- | ------------- | --- | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  | Data type     |     |     |
AS_GET_V_VALUE
|     |     | CPAUMW.BER         | Area                           |                      |     |
| --- | --- | ------------------ | ------------------------------ | -------------------- | --- |
|     |     | CPAUMW.PANNR       | Inspection requirement number  |                      |     |
|     |     | CPAUMW.PAUNR       | Inspection order number        |                      |     |
|     |     | CPAUMW.AFO         | OP sequence                    |                      |     |
|     |     | CMERK.BFORMEL:TYP  | Level  of                      | the  characteristic  |     |
|     |     |                    | calculation                    | (see  document       |     |
calculation of formulas)
  V - single values
  S - samples
  C - characteristics
|     |     | CMERK.BFORMEL  | Calculation  | formula  of  | the  |
| --- | --- | -------------- | ------------ | ------------ | ---- |
characteristic
|     |     | ERR:TEXT  | Error description   |     |     |
| --- | --- | --------- | ------------------- | --- | --- |
|     |     | VAR:NAME  | incorrect variable  |     |     |

| MBL_ESK_FEP_Overview.docx  |     | Version: 1.5.22815  |     | Page 6 of 11  |     |
| -------------------------- | --- | ------------------- | --- | ------------- | --- |

|     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | ---------------------- | --- |

| 1.4  | Error when the calculated variable value is set  |     |     |     |     |
| ---- | ------------------------------------------------ | --- | --- | --- | --- |
(CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE)
When the characteristics were calculated, a referenced source characteristic was found. If an error occurs
when the calculated numeric value is used in the formula, an escalation is triggered.
| Event                     |     | Identifiers    | Description   |     |     |
| ------------------------- | --- | -------------- | ------------- | --- | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  | Data type     |     |     |
AS_SET_VARIABLE
|     |     | CPAUMW.BER     | Area                           |     |         |
| --- | --- | -------------- | ------------------------------ | --- | ------- |
|     |     | CPAUMW.PANNR   | Inspection requirement number  |     |         |
|     |     | CPAUMW.PAUNR   | Inspection order number        |     |         |
|     |     | CPAUMW.AFO     | OP sequence                    |     |         |
|     |     | CPAUMW.STPRNR  | Sample                         |     | number  |
(of the calculated value)
|     |     | CPAUMW.WERTNR  | Single  | value  | number  |
| --- | --- | -------------- | ------- | ------ | ------- |
(of the calculated value)
|     |     | CMERK.BFORMEL:TYP  | Level        | of  the  characteristic  |           |
| --- | --- | ------------------ | ------------ | ------------------------ | --------- |
|     |     |                    | calculation  | (see                     | document  |
calculation of formulas)
  V - single values
  S - samples
  C - characteristics
|     |     | CMERK.BFORMEL  | Calculation  | formula  | of  the  |
| --- | --- | -------------- | ------------ | -------- | -------- |
characteristic
|     |     | ERR:TEXT  | Error description  |                    |     |
| --- | --- | --------- | ------------------ | ------------------ | --- |
|     |     | VAR:NAME  | Name               | of  the  variable  | in  |
question
|     |     | VAR:VALUE  | Calculated value of the variable  |     |     |
| --- | --- | ---------- | --------------------------------- | --- | --- |

| MBL_ESK_FEP_Overview.docx  |     | Version: 1.5.22815  |     |     | Page 7 of 11  |
| -------------------------- | --- | ------------------- | --- | --- | ------------- |

|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

1.5  Changed inspection severity
  (CDYHSTPR_DYPSCHARF_CHANGED)
If the inspection severity is changed, the escalation is triggered.
| Event                       |     |     | Identifiers           | Description              |     |
| --------------------------- | --- | --- | --------------------- | ------------------------ | --- |
| CDYHSTPR_DYPSCHARF_CHANGED  |     |     | CPAUSP.RECTYP         | Data type sample         |     |
|                             |     |     | CPAUSP.BER            | Area sample              |     |
|                             |     |     | CPAUSP.PANNR          | Inspection requirement   |     |
|                             |     |     | CPAUSP.PAUNR          | Inspection order         |     |
|                             |     |     | CPAN.ANR              | Order                    |     |
|                             |     |     | CPAU.AGNR             | Operation                |     |
|                             |     |     | CPAUSP.AFO            | OP sequence              |     |
|                             |     |     | CMERK.CMMNR           | Characteristic number    |     |
|                             |     |     | CMERK.MMBEZ           | Characteristic name      |     |
|                             |     |     | CPAUSP.STPRNR         | Sample                   |     |
|                             |     |     | CPAUSP.DEVICE:TYP     | Device type              |     |
|                             |     |     | CPAUSP.DEVICE:ID      | Device                   |     |
|                             |     |     | CPAUSP.DEVICE:STPRNR  | Device sample            |     |
|                             |     |     | DYPSCHARF:ALT         | old inspection severity  |     |
|                             |     |     | DYPSCHARF:NEU         | new inspection severity  |     |
|                             |     |     | CHANGE:DAT            | Modified on (date)       |     |
|                             |     |     | CHANGE:ZEI            | Modified on (time)       |     |

| 1.6  | Completing an inspection point  |     |     |     |     |
| ---- | ------------------------------- | --- | --- | --- | --- |
  (CPANUMP.COMPLETED)
If an inspection point is completed, an escalation is triggered. For example, you can configure that only
the inspection result "NIO" (="fail") triggers a notification (CPANUMPPPKT:.STA == "NIO").
| Event              |     | Identifiers           |     | Description                     |     |
| ------------------ | --- | --------------------- | --- | ------------------------------- | --- |
| CPANUMP.COMPLETED  |     | CPANUMP.PPKT:RECTYP   |     | Data type (*)                   |     |
|                    |     | CPANUMP.PPKT:BER      |     | Area (*)                        |     |
|                    |     | CPANUMP.PPKT:PANNR    |     | Inspection requirement (*)      |     |
|                    |     | CPANUMP.PPKT:EINTTYP  |     | Type of inspection point (*)    |     |
|                    |     | CPANUMP.PPKT:EINTNR   |     | Number of inspection point (*)  |     |
|                    |     | CPANUMP.PPKT:STA      |     | Status (*)                      |     |

| MBL_ESK_FEP_Overview.docx  |     |     | Version: 1.5.22815  |     | Page 8 of 11  |
| -------------------------- | --- | --- | ------------------- | --- | ------------- |

|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers           |     | Description               |     |
| ------ | --- | --------------------- | --- | ------------------------- | --- |
|        |     | CPANUMP.FU:1          |     | direct user field 1 (*)   |     |
|        |     | CPANUMP.PPKT:FU:2     |     | direct user field 2 (*)   |     |
|        |     | CPANUMP.PPKT:FU:3     |     | direct user field 3 (*)   |     |
|        |     | CPANUMP.PPKT:FU:4     |     | direct user field 4 (*)   |     |
|        |     | CPANUMP.PPKT:FU:5     |     | direct user field 5 (*)   |     |
|        |     | CPANUMP.PPKT:FU:6     |     | direct user field 6 (*)   |     |
|        |     | CPANUMP.PPKT:FU:7     |     | direct user field 7 (*)   |     |
|        |     | CPANUMP.PPKT:FU:8     |     | direct user field 8 (*)   |     |
|        |     | CPANUMP.PPKT:FU:9     |     | direct user field 9 (*)   |     |
|        |     | CPANUMP.PPKT:FU:10    |     | direct user field 10 (*)  |     |
|        |     | CPANUMP.PPKT:FU:11    |     | direct user field 11 (*)  |     |
|        |     | CPANUMP.PPKT:FU:12    |     | direct user field 12 (*)  |     |
|        |     | CPANUMP.PPKT:FU:13    |     | direct user field 13 (*)  |     |
|        |     | CPANUMP.PPKT:FU:14    |     | direct user field 14 (*)  |     |
|        |     | CPANUMP.PPKT:ABSVON   |     | Completion of             |     |
|        |     | CPANUMP.PPKT:ABSVONK  |     | Completion of card        |     |
|        |     | CPANUMP.PPKT:ANLURS   |     | Cause for creation        |     |
|        |     | CPANUMP.PPKT:AUS      |     | Scrap                     |     |
|        |     | CPANUMP.PPKT:CHARGE   |     | Batch                     |     |
|        |     | CPANUMP.PPKT:EQUIP    |     | Equipment                 |     |
|        |     | CPANUMP.PPKT:MASCH    |     | Machine                   |     |
|        |     | CPANUMP.PPKT:MENGE    |     | Quantity                  |     |
|        |     | CPANUMP.PPKT:NACH     |     | Rework                    |     |
|        |     | CPANUMP.PPKT:PLATZ    |     | Location                  |     |
|        |     | CPANUMP.PPKT:PMASCH   |     | Prod. machine             |     |
|        |     | CPANUMP.PPKT:PROBE    |     | Sample                    |     |
|        |     | CPANUMP.PPKT:TLOS     |     | Partial batch             |     |
|        |     | CPANUMP.PPKT:USERC1   |     | User field C1             |     |
|        |     | CPANUMP.PPKT:USERC2   |     | User field C2             |     |
|        |     | CPANUMP.PPKT:USERD1   |     | User field D1             |     |
|        |     | CPANUMP.PPKT:USERN1   |     | User field N1             |     |
|        |     | CPANUMP.PPKT:USERN2   |     | User field N2             |     |
|        |     | CPANUMP.PPKT:USERT1   |     | User field T1             |     |
|        |     | CPANUMP.PPKT:VECODE   |     | Usage decision            |     |
|        |     | CPAN.ANR              |     | Order (*)                 |     |
|        |     | CPAN.AGNR             |     | Operation (*)             |     |
|        |     | CPAN.FU:1             |     | direct user field 1 (*)   |     |
|        |     | CPAN.FU:2             |     | direct user field 2 (*)   |     |

| MBL_ESK_FEP_Overview.docx  |     |     | Version: 1.5.22815  |     | Page 9 of 11  |
| -------------------------- | --- | --- | ------------------- | --- | ------------- |

|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers  |     | Description               |     |
| ------ | --- | ------------ | --- | ------------------------- | --- |
|        |     | CPAN.FU:3    |     | direct user field 3 (*)   |     |
|        |     | CPAN.FU:4    |     | direct user field 4 (*)   |     |
|        |     | CPAN.FU:5    |     | direct user field 5 (*)   |     |
|        |     | CPAN.FU:6    |     | direct user field 6 (*)   |     |
|        |     | CPAN.FU:7    |     | direct user field 7 (*)   |     |
|        |     | CPAN.FU:8    |     | direct user field 8 (*)   |     |
|        |     | CPAN.FU:9    |     | direct user field 9 (*)   |     |
|        |     | CPAN.FU:10   |     | direct user field 10 (*)  |     |
|        |     | CPAN.FU:11   |     | direct user field 11 (*)  |     |
|        |     | CPAN.FU:12   |     | direct user field 12 (*)  |     |
|        |     | CPAN.FU:13   |     | direct user field 13 (*)  |     |
|        |     | CPAN.FU:14   |     | direct user field 14 (*)  |     |
|        |     | CPAN.ATK     |     | Article number (*)        |     |
|        |     | CPAN.ATKIDX  |     | Drawing issue number (*)  |     |
|        |     | CPAN.ATKBEZ  |     | Article name (*)          |     |

(*) These entries are not included in the selection list. It is still possible to use these identifiers
manually as message text or condition.

MBL_ESK_FEP_Overview.docx  Version: 1.5.22815  Page 10 of 11

Available Escalations
Note:
The escalation message is limited to 1024 characters. It already includes the dialog data string
the escalation is based on. If you integrate too many parameters in the escalation message, the
dialog data string including the contents of the escalation message is cut after 1024 characters. A
consequence can be that not all defined contents are integrated in the escalation message. To
show all contents of an escalation message, create the CAQ option 1220. Call the application
Options using the transaction code "qmaopt". Create the option as shown in the screenshot
below.
If you enable this option, the processing of the escalation events mentioned above can be slower
than usual.
MBL_ESK_FEP_Overview.docx Version: 1.5.22815 Page 11 of 11