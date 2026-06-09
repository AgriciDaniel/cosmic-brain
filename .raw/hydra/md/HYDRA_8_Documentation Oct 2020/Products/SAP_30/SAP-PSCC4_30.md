Manual
HYDRA Interfacing Module to
SAP R/3 PS (CC4)
SAP-PSCC4 3.0
Version 1.1.19800
Last changed on: 06.08.2020

HYDRA Interfacing Module to SAP R/3 PS (CC4)
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
Contents
SAP-PSCC4_30.docx Version: 1.1.22714 Page 2 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
1 HYDRA Interfacing Module to SAP PS (CC4) ............................................. 4
2 Behavior Depending on the Transfer Types ................................................ 5
3 Operations Data Download SAP --> HYDRA............................................... 7
4 Confirmations Upload HYDRA --> SAP ..................................................... 10
5 MYERPRCK - Program Parameters .......................................................... 12
6 Application-Relevant Settings in HYDRA ................................................... 24
7 Protecting fields of planned operations ...................................................... 27
SAP-PSCC4_30.docx Version: 1.1.22714 Page 3 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
1 HYDRA Interfacing Module to SAP PS (CC4)
Overview
Purpose
You use the SAP-PSCC4 interface to download project orders from SAP PS (networks and their
operations) for a specified operation. In the MES, you can record postings for these operations and
upload the resulting times to SAP PS. You use the CA-PDC / CC4 interface to connect to SAP PS.
Implementation notes
You use the function package Interfacing Module to SAP R/3 PS (CC4), if you process projects in SAP
PS using networks and if you want to record data for these networks in the MES and then upload this
data.
Integration
If you use the component SAP-PSCC4, the orders/operations transferred with this component are used
for a great number of further postings in HYDRA.
Features
 Transfer of order data
o Download of the released operations from PS and integration as HYDRA project orders
(networks)/project operations (initial and delta download and delete function)
 Recording of times
o Recording of start/interruption/end of processing and posting of the times according to
the HYDRA configuration and validation checks
 Upload of operation postings
o Upload to SAP PS of the actual times (performances) recorded for a specific SAP time
ticket
<<XcludeSubDocument=\\archive\mast_ind\Produktdokumentationen\en\Functions\MBL\MBL_SAP_Impl
ementation_CC4_Overview.docx>>
SAP-PSCC4_30.docx Version: 1.1.22714 Page 4 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
2 Behavior Depending on the Transfer Types
Initial download behavior
An initial download of the order and operation data will only take place when the complete system is
commissioned and a first database is to be created in HYDRA. In addition, also other scenarios are
possible by which the entire operations base will be replaced.
During an initial download all operations from SAP will be transferred that have at least the status
"released" or that are not technically completed yet. This means that also (end) confirmed operations will
be transferred but not imported in HYDRA.
When the initial download is received, the current operations data base in HYDRA will be deleted and be
replaced by the new operations data. The current data will immediately be available.
An initial download will not only delete the order base existing in HYDRA but also all current
times and quantities entered for orders and/or transactions.
In addition, all operations that are being executed will not be deleted. This means that they must
be interrupted and/or terminated manually in HYDRA.
Conclusion: Any initial download during the operation of HYDRA must be used with greatest
care and it would be useful to contact the MPDV Support beforehand.
For security reasons, the initial download function needs to be enabled explicitly as of the below-
mentioned program version. Activation is performed by an INI configuration.
.\lib\b_anr.dll V8.1.1.326
Delta download behavior
A delta download creates new operations in HYDRA that will then be added to the database. Another
function of the delta download is the modification of already transferred operations. Modifications of
operations with the status "Running", "Finished" or "Deleted" are not allowed by the HYDRA default
settings.
CUSTOMIZING information: Modifications of the operations depend on whether the flag
“alterable order data” is set for the corresponding status in the status configuration.
SAP-PSCC4_30.docx Version: 1.1.22714 Page 5 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
If an operation cannot be modified to ensure the consistency in HYDRA (in general for running
operations), this will be logged in HYDRA and be saved for error tracking purposes.
The basis for the delta download in SAP is the database table ORDCOM.
Deletion download behavior
A deletion download deletes those operations that are no longer necessary in the production process
from the HYDRA database.
As with the modifications, the deletion result depends on the operation's status. Operations identified as
"Running", "Interrupted", "Finished" or "Deleted", will not be deleted.
Moreover, the confirmation number (CONF_NO) will be checked to identify the orders via order,
sequence and transaction. This prevents any accidental deletion of orders that are seemingly the same
but which have different confirmation numbers.
Behavior when re-importing master data in SAP
When master data for an existing and released order that has already been transferred to HYDRA are re-
imported in SAP this impacts also the interface to HYDRA.
When master data are re-imported, SAP will assign new confirmation numbers for the individual
operations even though the order and operation numbers won't change. These are then transferred
together with the next delta download to HYDRA. The confirmation/upload number will then be updated in
HYDRA.
The update will also be made when the current status is "Running". In this case, however,
ONLY the confirmation/upload no. will be changed and all other data (order quantity,
scheduling, etc.) will not be updated.
Behavior during the technical completion in SAP
If an order is technically completed in SAP this will lead to a deletion download at the interface. This
means that the order data in HYDRA will be deleted.
SAP-PSCC4_30.docx Version: 1.1.22714 Page 6 of 30

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

3  Operations Data Download SAP --> HYDRA

Operation data
The following structure is part of the PP-PDC / CC4 interface and is used to transfer maintenance orders
to subsystems.
| Message type:      | OPERA4  |                        |     |     |
| ------------------ | ------- | ---------------------- | --- | --- |
| IDoc type:         | OPERA4  |                        |     |     |
| Segments:          | OPERA4  |                        |     |     |
| Message function:  | APP     |   Delta download      |     |     |
|                    | DEL     |   Deletion download   |     |     |
|                    | UPD     |   Base data download  |     |     |

| Field Name  | T  L  | Description  | Rel.  | HYDRA      |
| ----------- | ----- | ------------ | ----- | ---------- |
|             |       |              | KK4   | Reference  |
RUECK*  NUMC 10  Operation confirmation number  x  Is stored for the confirmation,
not used elsewhere
AUFNR  CHAR  12  Order number  x  According to Configuration (*1)
APLFL  CHAR  6  Operation sequence  x  According to Configuration (*1)
VORNR  CHAR  4  Operation number  x  According to Configuration (*1)
UVORN  CHAR  4  Sub procedure  x  According to Configuration (*1)
| SPLIT*  | NUMC 3     | Split number                   | x  Not used  |     |
| ------- | ---------- | ------------------------------ | ------------ | --- |
| KAPAR*  | CHAR  3    | Capacity type                  | x  Not used  |     |
| BDEGR*  | CHAR  3    | Subsystem connection grouping  | x  Not used  |     |
| MGVRG   | DEC  10.3  | Default quantity               | -            |     |
| ASVRG   | DEC  10.3  | Scrap quantity                 | -            |     |
| MEINH   | CHAR  3    | Operation quantity unit        | -            |     |
| UMREN   | DEC  5.0   | Conversion denominator         | -            |     |
| UMREZ   | DEC  5.0   | Conversion Numerator           | -            |     |
| KMEIN   | CHAR  3    | Header quantity unit           | -            |     |
Underdelivery quantity
| UNTMG  | DEC  10.3  |                          | -    |     |
| ------ | ---------- | ------------------------ | ---- | --- |
| UEBMG  | DEC  10.3  | Overdelivery quantity    | -    |     |
| ACTI1  | DEC  10.3  | Planned activity 1       | -    |     |
| UNIT1  | CHAR  3    | Planned activity 1 unit  | -    |     |
| ACTI2  | DEC  10.3  | Planned activity 2       | -    |     |
| UNIT2  | CHAR  3    | Planned activity 2 unit  | -    |     |
| ACTI3  | DEC  10.3  | Planned activity 3       | -    |     |

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     | Page 7 of 30  |
| ------------------ | --- | ------------------- | --- | ------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Field Name  | T  L       | Description               | Rel.  | HYDRA      |
| ----------- | ---------- | ------------------------- | ----- | ---------- |
|             |            |                           | KK4   | Reference  |
| UNIT3       | CHAR  3    | Planned activity 3 unit   | -     |            |
| ACTI4       | DEC  10.3  | Planned activity 4        | -     |            |
| UNIT4       | CHAR  3    | Planned activity 4 unit   | -     |            |
| ACTI5       | DEC  10.3  | Planned activity 5        | -     |            |
| UNIT5       | CHAR  3    | Planned activity 5 unit   | -     |            |
| ACTI6       | DEC  10.3  | Planned activity 6        | -     |            |
| UNIT6       | CHAR  3    | Planned activity 6 unit   | -     |            |
| LMNGA       | DEC  10.3  | Planned yield             | -     |            |
| XMNGA       | DEC  10.3  | Planned scrap quantities  | -     |            |
ISTAT  CHAR  5  Operation progress  x  OPs with completion status
("E") are not transferred
| ISM01  | DEC  10.3  | Actual activity 1                 | -              |     |
| ------ | ---------- | --------------------------------- | -------------- | --- |
| ISM02  | DEC  10.3  | Actual activity 2                 | -              |     |
| ISM03  | DEC  10.3  | Actual activity 3                 | -              |     |
| ISM04  | DEC  10.3  | Actual activity 4                 | -              |     |
| ISM05  | DEC  10.3  | Actual activity 5                 | -              |     |
| ISM06  | DEC  10.3  | Actual activity 6                 | -              |     |
| LEK01  | CHAR  1    | Completion indicator activity 1   | -              |     |
| LEK02  | CHAR  1    | Completion indicator activity 2   | -              |     |
| LEK03  | CHAR  1    | Completion indicator activity 3   | -              |     |
| LEK04  | CHAR  1    | Completion indicator activity 4.  | -              |     |
| LEK05  | CHAR  1    | Completion indicator activity 5   | -              |     |
| LEK06  | CHAR  1    | Completion indicator activity 6   | -              |     |
| ARBPL  | CHAR  8    | Workplace                         | x  OP machine  |     |
(see note)
| WERKS  | CHAR  4  | Workplace plant         | x  Plant     |     |
| ------ | -------- | ----------------------- | ------------ | --- |
| ARBPI  | CHAR  8  | Actual workplace        | x  Not used  |     |
| WERKI  | CHAR  4  | Actual workplace plant  | x  Not used  |     |
ISMNW  DEC  10.3  Actual work (cannot be negative)  x  Not used
| ISMNE  | CHAR  3   | Actual work unit   | x  Not used              |     |
| ------ | --------- | ------------------ | ------------------------ | --- |
| ARBEI  | DEC  6.1  | Planned work       | x  Target duration       |     |
| ARBEH  | CHAR  3   | Planned work unit  | x  "STD" / "H"  / "HUR"  |     |
"MIN"
"S" / "SEC"
OFMNW  DEC  6.1  Remaining work (cannot be negative)  x  Not used
| OFMNE  | CHAR  3  | Remaining work unit           | x  Not used        |     |
| ------ | -------- | ----------------------------- | ------------------ | --- |
| LEKNW  | CHAR  1  | Indicator: no remaining work  | x  Not used        |     |
| FSAVD  | DATS  8  | Earliest start date           | x  PPS start date  |     |
| FSAVZ  | TIMS  6  | Earliest start time           | x  PPS Start time  |     |
| SSEDD  | DATS  8  | Latest end date               | x  PPS end date    |     |
| SSEDZ  | TIMS  6  | Latest end time               | x  PPS end time    |     |

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     | Page 8 of 30  |
| ------------------ | --- | ------------------- | --- | ------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

*)  The actual work (field ISMNW) may not exceed 590 hours.
(*1)   See below for more information on generating the HYDRA order number.
Upload Requirement
The upload requirement controls the confirmation upload to SAP. All available confirmations will be
transferred to SAP in response to such upload requirement sent from SAP to HYDRA.
| Message type:      | REQUI4  |                     |     |
| ------------------ | ------- | ------------------- | --- |
| IDoc type:         | REQUI4  |                     |     |
| Segments:          | REQUI4  |                     |     |
| Message function:  | REQ    | Upload Requirement  |     |

| SAP-PSCC4_30.docx  | Version: 1.1.22714  |     | Page 9 of 30  |
| ------------------ | ------------------- | --- | ------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

4  Confirmations Upload HYDRA --> SAP

HYDRA Supported Record Types and Activities
HYDRA BDE reports the following time ticket related record types back to SAP R/3 PP:
| Record  | SAP Meaning  |     | HYDRA triggering action  |     |     |
| ------- | ------------ | --- | ------------------------ | --- | --- |
Type
T20  Partial  Time  Ticket  Automatic or manual order interruption at the BDE
|     | Completion  |     | terminal or BDE console.  |     |     |
| --- | ----------- | --- | ------------------------- | --- | --- |
T40  Time Ticket Completion  Order completion message at the BDE terminal or BDE
console.

| Please note  |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- |
When HYDRA MPL is active, each generated output batch (output batch change message) will generate
OP interruption or logoff time tickets plus an L20 partial completion message.
Report Structure E2CONF7
HYDRA ADE reports time ticket related information back to SAP. Its base data consists of the order-
related postings (U / E records) and the duration data in these records. The badge number is added
before transmission to SAP.
| Message type:  |     | CONF42   |     |     |     |
| -------------- | --- | -------- | --- | --- | --- |
| IDoc type:     |     | CONF42   |     |     |     |
| Segments:      |     | E2CONF7  |     |     |     |

HYDRA Reference
| Field Name  | Type  | Length  | Text                |             |     |
| ----------- | ----- | ------- | ------------------- | ----------- | --- |
| SATZA       | CHAR  | 3       | Report record type  | T20 or T40  |     |
| TERID       | CHAR  | 4       | Terminal ID         | Not used    |     |
LDATE  DATS  8  Logical date / Actual reporting  Logoff date
date
LTIME  TIMS  6  Logical time / Actual reporting  Logoff time
time
| ERDAT  | DATS  | 8   | Report entry date  | Reporting date  |     |
| ------ | ----- | --- | ------------------ | --------------- | --- |
| ERTIM  | TIMS  | 6   | Report entry time  | Reporting time  |     |

| SAP-PSCC4_30.docx  |     |     | Version: 1.1.22714  |     | Page 10 of 30  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Field Name  | Type  | Length  | Text  | HYDRA Reference  |     |
| ----------- | ----- | ------- | ----- | ---------------- | --- |
BUDAT  DATS  8  Report booking time  Set based on the booking
record shift date
| ARBPL    | CHAR  | 8    | Workplace                     | HYDRA workplace      |     |
| -------- | ----- | ---- | ----------------------------- | -------------------- | --- |
| WERKS    | CHAR  | 4    | Plant                         | Plant                |     |
| ZAUSW    | NUMC  | 8    | Badge number                  | Time badge number    |     |
| AUFNR    | CHAR  | 12   | Order number                  | Follows default      |     |
| VORNR    | CHAR  | 4    | Operation number              | Follows default      |     |
| UVORN    | CHAR  | 4    | Sub-operation number          | Follows default      |     |
| SPLIT    | NUMC  | 3    | Split number                  | Not used             |     |
| KAPAR    | CHAR  | 3    | Capacity type                 | Not used             |     |
| ABWEI    | CHAR  | 4    | Deviation basis               | Not used             |     |
| ABARB    | NUMC  | 3    | Completion level              |                      |     |
| PEDD     | DATS  | 8    | Predicted end date            | Not used             |     |
| PEDZ     | TIMS  | 6    | Predicted end time            | Not used             |     |
| LEKNW    | CHAR  | 1    | Indicator: no remaining work  | Not used             |     |
| LTXA1    | CHAR  | 40   | Report text                   | Not used             |     |
| ISMNW *  | DEC   | 6.1  | Actual work                   | P_DAUER              |     |
| ISMNE    | CHAR  | 3    | Actual work unit              | "H" / "STD" / "HUR"  |     |
"MIN"
"S" / "SEC"
Default "STD"
| LEARR  | CHAR  | 6   | Activity type  | Not used  |     |
| ------ | ----- | --- | -------------- | --------- | --- |
IDAUR *  DEC  4.1  Actual duration  Actual duration BMK11
IDAUE  CHAR  3  Actual duration unit  "H" / "STD" / "HUR"
"MIN"
"S" / "SEC"
Default "STD"
| ODAUR *  | DEC   | 4.1  | Remaining duration       | Not used     |     |
| -------- | ----- | ---- | ------------------------ | ------------ | --- |
| ODAUE    | CHAR  | 3    | Remaining duration unit  | Not used     |     |
| OFMNW *  | DEC   | 6.1  | Remaining work           | Not used     |     |
| OFMNE    | CHAR  | 3    | Remaining work unit      | Not used     |     |
| ISDD     | DATS  | 8    | Execution start date     | Logon date   |     |
| ISDZ     | TIMS  | 6    | Execution start time     | Logon time   |     |
| IEDD     | DATS  | 8    | Execution end date       | Logoff date  |     |
| IEDZ     | TIMS  | 6    | Execution end time       | Logoff time  |     |

| SAP-PSCC4_30.docx  |     |     | Version: 1.1.22714  |     | Page 11 of 30  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

5  MYERPRCK - Program Parameters
|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
Purpose
Use the upload program myerprck.exe/out to create confirmations/uploads to higher-level systems. In
addition to the settings you make directly in the applications, you can also use program parameters to
control confirmations/uploads.
Integration
The confirmation/upload is integrated with numerous components, for example:
  Shop floor data collection
  Tracking and tracing as well as material and production logistics
  Detailed scheduling
Available program parameters:
| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
Program parameters to control processing:
/MESTYP=XXXX  The  parameter  MESTYP  defines  the  All  Yes
structure to be generated.
/GRP=XXXX  The grouping type specifies the criterion  Requires  Requires
by  which  uploads  should  be  grouped.  customizations  customizations
Possible values:
PLANT --> Groups by plant
/V=sssss  Since  SAP  R/3  PP  does  not  support  EIS-ERP  Yes
|     | correction  | postings,  | HYDRA  allows  | to  |     |
| --- | ----------- | ---------- | -------------- | --- | --- |
EIS-XPPS
|     | retain      | confirmations/uploads  |            | for     |     |
| --- | ----------- | ---------------------- | ---------- | ------- | --- |
|     | correction  | purposes               | in  HYDRA  | for  a  |     |
SAP-PPPDC
specific period of time.
SAP-PPREM
Use the parameter /V=sssss  (sssss =

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 12 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |           |     |                | Relevant    | Productive  |
| ----------- | ------------ | --- | --------- | --- | -------------- | ----------- | ----------- |
|             |              |     |           |     |                | interfaces  | release     |
|             | delay  time  | in  | seconds)  | to  | activate  the  | SAP-PPPI    |             |
above described delay when the upload
SAP-PMCC3
program is called.
SAP-PSCC4
Examples:
SAP-COILV
  myerprck.exe/out /V=3600
The system only uploads postings
that are older than one hour.
| /BIS=DDMMYYHHMM  | Use         | the  | parameter  |     | /BIS=        | EIS-ERP   | Yes  |
| ---------------- | ----------- | ---- | ---------- | --- | ------------ | --------- | ---- |
|                  | DDMMYYHHMM  |      | (date      | +   | time)  when  |           |      |
| /BIS=HHMM        |             |      |            |     |              | EIS-XPPS  |      |
calling the upload program to enter the
delay as a point in time. You can enter
| /TILLDATE=MM/DD/YYYY  |     |     |     |     |     | SAP-PPPDC  |     |
| --------------------- | --- | --- | --- | --- | --- | ---------- | --- |
this point in time with date and time or
/TILLTIME=sec  after  you can just enter the time in the format  SAP-PPREM
| midnight  | "HHMM".  | In  the  | latter  | case,  | the  time  |     |     |
| --------- | -------- | -------- | ------- | ------ | ---------- | --- | --- |
SAP-PPPI
refers to the current day.
SAP-PMCC3
  Myerprck.exe
/BIS=2505110600
SAP-PSCC4
|     | This  | parameter  |     | uploads  | postings  |     |     |
| --- | ----- | ---------- | --- | -------- | --------- | --- | --- |
SAP-COILV
that were recorded until 06:00 a.m.
on 25 May 2011.
|     |   Myerprck.exe  |            |     |          | /BIS=0600  |     |     |
| --- | --------------- | ---------- | --- | -------- | ---------- | --- | --- |
|     | This            | parameter  |     | uploads  | postings   |     |     |
that were recorded until 06:00 a.m.
of the current day.
/TZ=+/-sssss  Use the parameter /TZ=+/-sssss to adapt  SAP-PPPDC  Yes
|     | uploads  | to  different  |     | time  | zones.  The  |     |     |
| --- | -------- | -------------- | --- | ----- | ------------ | --- | --- |
parameter adjusts the time specifications
|     | entered  |     | in  | the  | fields  |     |     |
| --- | -------- | --- | --- | ---- | ------- | --- | --- |
EXEC__START_TIME,
EXEC_FIN_TIME and LOGTIME of the
|     | upload  | structure  | of  | the  | SAP-PPPDC  |     |     |
| --- | ------- | ---------- | --- | ---- | ---------- | --- | --- |
interface according to its specifications.

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     |     |     | Page 13 of 30  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/KST=XXX  Use this parameter to restrict the data to  EIS-ERP  Yes
|     | be  uploaded.  | In  this  | case,  the  system  |     |     |
| --- | -------------- | --------- | ------------------- | --- | --- |
ESI-XPPS
|     | only  uploads  | data  of  | a  specified  cost  |     |     |
| --- | -------------- | --------- | ------------------- | --- | --- |
center.
SAP-PPPDC
|     | Use  the  | parameter  /KST=XXX  | (XXX  | =   |     |
| --- | --------- | -------------------- | ----- | --- | --- |
SAP-PPREM
cost center, a max. of 8 characters) when
|     | calling           | the  upload  | program     | SAP-PPPI  |     |
| --- | ----------------- | ------------ | ----------- | --------- | --- |
|     | myerprck.exe/out  | to  enable   | the  above- |           |     |
SAP-PMCC3
|     | described      | restriction.   | Then  the  system  |     |     |
| --- | -------------- | -------------- | ------------------ | --- | --- |
|     | only  uploads  | data  records  | that  were         |     |     |
SAP-PSCC4
posted to machines of the specified cost
|     | center.  | The  system  | checks  the  cost  | SAP-COILV  |     |
| --- | -------- | ------------ | ------------------ | ---------- | --- |
center of the machine/workplace that is
|     | entered  | as  | the  posting  |     |     |
| --- | -------- | --- | ------------- | --- | --- |
workplace/machine in the posting record.
The system only checks the cost center
of the workplace/machine.
You can specify the parameter several
times per call.
Example:
|     |   Myerprck.exe  |     | /KST=BDE100  |     |     |
| --- | --------------- | --- | ------------ | --- | --- |
/KST=BDE200
The system only uploads records
that were posted onto machines of
the cost center BDE100/BDE200.
/CLEAR_RES  Use  the  parameter  "/CLEAR_RES“  to  SAP-PPPDC  Yes
assign an "X" to the field CLEAR_RES of
the upload structure when it comes to a
|     | final  confirmation/upload  |     | (record  type  |     |     |
| --- | --------------------------- | --- | -------------- | --- | --- |
L40). Consequently, SAP will clear open
reservations for the respective order.
/NEG_MENGE  By  default,  quantities  (L20/L40)  cannot  SAP-PPPDC  Yes

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 14 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use            |     |      |            |      | Relevant    | Productive  |
| ----------- | ---------------------- | --- | ---- | ---------- | ---- | ----------- | ----------- |
|             |                        |     |      |            |      | interfaces  | release     |
|             | be  uploaded           | to  | SAP  | PP  using  |      | partial     |             |
|             | confirmations/uploads  |     |      | via        | the  | SAP-        |             |
PPPDC interface if data is collected at
|     | the  same  | time  | via  | the  total  | quantity  |     |     |
| --- | ---------- | ----- | ---- | ----------- | --------- | --- | --- |
counter of MDE machines, since SAP is
not able to process negative quantities.
|     | This  type  | of  | collection  | can  | result  | in  |     |
| --- | ----------- | --- | ----------- | ---- | ------- | --- | --- |
negative quantity postings for yield when
OPs are finished.
This restriction does no longer apply, if it
|     | is  possible  | to  | process  | such  | negative  |     |     |
| --- | ------------- | --- | -------- | ----- | --------- | --- | --- |
postings (e.g. by using the SAP standard
|     | BAPI  or  | customizations).  |               | In  | this       | case,  |     |
| --- | --------- | ----------------- | ------------- | --- | ---------- | ------ | --- |
|     | you  can  | use               | the  program  |     | parameter  |        |     |
/NEG_MENGE to enable the upload of
these quantities.
/LA_MNR  The SAP_PMCC3 interface requires the  SAP-PMCC3  Yes
activity type to be uploaded to SAP PM.
The activity type can be identified via the
|     | machine/workplace  |     | where  |       | the  posting  |     |     |
| --- | ------------------ | --- | ------ | ----- | ------------- | --- | --- |
|     | was  performed.    |     | Use    | this  | program       |     |     |
parameter to enable identification of the
activity type.
Then the system uses the machine to
identify the activity type from the activity
types kept in HYDRA.
/IDENT_PRAEFIX=  In  the  upload  structure  of  the  SAP- SAP-PPPDC  Yes
|     | PPPDC  | interface,  | the  | field  | EX_IDENT  |     |     |
| --- | ------ | ----------- | ---- | ------ | --------- | --- | --- |
SAP-PPPDCC
|     | uniquely  | identifies  |     | uploads  |     | from  |     |
| --- | --------- | ----------- | --- | -------- | --- | ----- | --- |
subsystems. HYDRA populates the field.
You can add a prefix to the EX_IDENT
|     | field  to  | differentiate  |     | between  | uploads  |     |     |
| --- | ---------- | -------------- | --- | -------- | -------- | --- | --- |

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     |     |     | Page 15 of 30  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP R/3 PS (CC4)  |     |     |     |
| --- | --- | --- | --- | --- | --------------------------------------------- | --- | --- | --- |

| Parameters  | Meaning/use  |          |        |     |             |     | Relevant    | Productive  |
| ----------- | ------------ | -------- | ------ | --- | ----------- | --- | ----------- | ----------- |
|             |              |          |        |     |             |     | interfaces  | release     |
|             | from         | various  | HYDRA  |     | subsystems  |     |             |             |
connected to one SAP instance.
Example:
  Myerprck.exe
/IDENT_PRAEFIX=ABC
|     |     | The  | prefix  | may  | only  | include  |     |     |
| --- | --- | ---- | ------- | ---- | ----- | -------- | --- | --- |
hexadecimal characters: A –H und
0 – 9.
/ABZEICH=XX  While  customizing  the  order  type,  you  EIS-ERP  Yes
can specify that only signed data records
EIS-XPPS
are uploaded.
SAP-PPPDC
|     | Use  | the  parameter  |     | /ABZEICH=XX  |     |     | to  |     |
| --- | ---- | --------------- | --- | ------------ | --- | --- | --- | --- |
specify a period of time in days after that
SAP-PPREM
|     | you       | can  upload  |     | even  | unsigned  | data  |           |     |
| --- | --------- | ------------ | --- | ----- | --------- | ----- | --------- | --- |
|     | records.  |              |     |       |           |       | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/TRANSFER=  Use  the  parameter  "/TRANSFER="  to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
were transferred from a specific system.
SAP-PPPDC
|     | The    | transfer  | indicator  |             | is  set  | during  |     |     |
| --- | ------ | --------- | ---------- | ----------- | -------- | ------- | --- | --- |
|     | HYDRA  | inbound   |            | processing  | and      | may     |     |     |
SAP-PPREM
vary from interface to interface.
SAP-PPPI
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PSCC4_30.docx  |     |     | Version: 1.1.22714  |     |     |     |     | Page 16 of 30  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/NOTRANSFER=XXX  Use the parameter "/NOTRANSFER=" to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
|     | were  NOT  | transferred  | from  a  specific  |     |     |
| --- | ---------- | ------------ | ------------------ | --- | --- |
system.
SAP-PPPDC
|     | The  transfer  | indicator  | is  set  during  |     |     |
| --- | -------------- | ---------- | ---------------- | --- | --- |
SAP-PPREM
|     | HYDRA                              | inbound  processing  | and  may  |           |     |
| --- | ---------------------------------- | -------------------- | --------- | --------- | --- |
|     | vary from interface to interface.  |                      |           | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SEK  | The EIS-ERP interface uploads the times  |              |           | EIS-ERP  | Yes  |
| ----- | ---------------------------------------- | ------------ | --------- | -------- | ---- |
|       | of  resource                             | performance  | accounts  | in       |      |
ESI-XPPS
hours.
In particular with very short lead times
this may effect that logon times are cut
off by a conversion into hours.
|     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | ---------- | ------------------- | ----------- | --- | --- |
times in seconds.
/RMTYP=  When  customizing  the  order  type,  you  EIS-ERP  Yes
can assign an upload type to the order
ESI-XPPS
type.
SAP-PPPDC
|     | Use  this  | program  | parameter  to  only  |     |     |
| --- | ---------- | -------- | -------------------- | --- | --- |
upload data records of this upload type.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 17 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
/KAT=  When  customizing  the  order  type,  you  EIS-ERP  Yes
|     | can  connect  | the  order  | type  | with  a  |     |
| --- | ------------- | ----------- | ----- | -------- | --- |
ESI-XPPS
category.
SAP-PPPDC
|     | Use  the  | program  parameter  | /KAT=  | to  |     |
| --- | --------- | ------------------- | ------ | --- | --- |
only upload data records of this category.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SART=  | The  system  | only  uploads  | ADE  | log  EIS-ERP  | Yes  |
| ------- | ------------ | -------------- | ---- | ------------- | ---- |
postings of the specified record type.
ESI-XPPS
Therefore, you can use different program
SAP-PPPDC
parameters per call and record type for
uploading.
SAP-PPREM
Requirement: You have to activate the
SAP-PPPI
corresponding uploads when customizing
|     | the order type.  |     |     | SAP-PMCC3  |     |
| --- | ---------------- | --- | --- | ---------- | --- |
SAP-PSCC4
You can specify the parameter several
times per call.
SAP-COILV
Example:
|     |   Myerprck.exe  |     | /SART=A  |     |     |
| --- | --------------- | --- | -------- | --- | --- |
/SART=E
  The system only uploads A and
E records.
/NOLOCK  When starting the upload program, the  All  Requires
|     | system   | checks  if  there  | are       | any  lock  | customizations  |
| --- | -------- | ------------------ | --------- | ---------- | --------------- |
|     | entries  | for  the           | database  | table      |                 |
ADE_PROTOKOLL. If this is the case,

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 18 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
the upload is not carried out.
You can use this program parameter to
prevent this check.
|     | Set this parameter, in particular,  |                 | if the          |     |     |
| --- | ----------------------------------- | --------------- | --------------- | --- | --- |
|     | upload                              | is  not  based  | on  the  table  |     |     |
ade_protokoll.
/EINH_CC34  The  interfaces  SAP-PMCC3  and  SAP- SAP-PMCC3  Yes
|     | PSCC4  | transfer  the  | uploaded  activity  |     |     |
| --- | ------ | -------------- | ------------------- | --- | --- |
SAP-PSCC4
quantity in seconds (SEC) to SAP. Use
the parameter "/EINH_CC34“ to upload
|     | the  data  | in  other  units.  | The  following  |     |     |
| --- | ---------- | ------------------ | --------------- | --- | --- |
units are supported:
Hours:  H, HUR, STD
|     | Minutes:  | MIN  |     |     |     |
| --- | --------- | ---- | --- | --- | --- |
|     | Seconds:  | SEC  |     |     |     |
Example:
  Myerprck.exe
/EINH_CC34=HUR
The system uploads the recorded
times in the unit "HUR“ (hours).
/SDAT_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the change date along with the correction
records.
|     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | ---------- | ------------------- | ----------- | --- | --- |
the initially collected shift date instead.
/NORFC_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the cancellation records via sRFC.
Use the program parameter to transfer
the data in the IDoc format to SAP. To do

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 19 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use   |             |     |       | Relevant    | Productive  |
| ----------- | ------------- | ----------- | --- | ----- | ----------- | ----------- |
|             |               |             |     |       | interfaces  | release     |
|             | so,  inbound  | processing  |     | must  | be          |             |
implemented in SAP.
|     | The  system  | uploads   | the       | cancellation  |     |     |
| --- | ------------ | --------- | --------- | ------------- | --- | --- |
|     | records      | via  the  | standard  | PP-PDC        |     |     |
segment (with record type K20/K40) as if
the PP-PDCC license was not available.
| /PI  | If you use the SAP Process Integration  |           |                  |     | SAP-PPPDC  | Yes  |
| ---- | --------------------------------------- | --------- | ---------------- | --- | ---------- | ---- |
|      | (previously:                            | Exchange  | Infrastructure)  |     | to         |      |
SAP-PMCC3
|     | communicate                              | with  | SAP,  | the  version  | of         |     |
| --- | ---------------------------------------- | ----- | ----- | ------------- | ---------- | --- |
|     | the transferred segment is checked more  |       |       |               | SAP-PSCC4  |     |
strictly.

Use the program parameter to transfer
segment names with the version number
|     | (i.e.  the  | trailing  zeros  | of  | the  segment  |     |     |
| --- | ----------- | ---------------- | --- | ------------- | --- | --- |
name).
/INDEX_TMP_TABLE  Use this parameter to accelerate uploads  All  Requires
|     | if ORACLE is used as database system  |     |     |     |     | customizations  |
| --- | ------------------------------------- | --- | --- | --- | --- | --------------- |
and large amounts of data are affected.
To do so, use an index for a temporary
table where all data to be uploaded is
transferred in a first step.
/UE_PARAMS=  Program parameter for the stand-alone  Various  Yes
user exit processing (DD format).
| /NOSTORNO  | Use this program parameter to prevent  |          |     |       | All    | Yes  |
| ---------- | -------------------------------------- | -------- | --- | ----- | ------ | ---- |
|            | cancellation                           | records  |     | from  | being  |      |
uploaded.
Therefore, you can use different program
parameters per call and record type for
uploading.
Requirement: You have to activate the

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     |     | Page 20 of 30  |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | ----------- | ----------- |
|             |              |     |     | interfaces  | release     |
corresponding uploads when customizing
the order type.
/RECALC_NEG_YIELD  Use  this  parameter  to  offset  negative  SAP-PPPDCC  Requires
|     | yield  with  | already  | posted  positive  |     | customizations  |
| --- | ------------ | -------- | ----------------- | --- | --------------- |
uploads.
Program parameters to use the SIGUSR communication:
/LOGGING  Use this program parameter to activate  INDIVIDUAL  Yes
|     | communication from the database table  |     |     | CASE  |     |
| --- | -------------------------------------- | --- | --- | ----- | --- |
HYD_LOGGING.
|     | To  do  | so,  a  customization  | might  | be  |     |
| --- | ------- | ---------------------- | ------ | --- | --- |
required.
/WAIT_SIGUSR1=XX  The  program  parameter  specifies  the  INDIVIDUAL  Yes
|     | time in seconds that has to pass before  |     |     | CASE  |     |
| --- | ---------------------------------------- | --- | --- | ----- | --- |
the upload is performed via the SIGUSR
communication even without trigger.
| /PEEK_SIGUSR1=XX  |     |     |     | INDIVIDUAL  | Yes  |
| ----------------- | --- | --- | --- | ----------- | ---- |
CASE
Use this parameter to delay execution of
|     | an  action  | triggered  | by  the  SIGUSR  |     |     |
| --- | ----------- | ---------- | ---------------- | --- | --- |
communication.
The delay time is entered in seconds for
this parameter.
|     | The  program  | interprets  | this  time  | as  |     |
| --- | ------------- | ----------- | ----------- | --- | --- |
follows:
If within the next second after the initial
trigger there is another trigger, then wait
|     | for  not  | more  than  <specified  |     | value>  |     |
| --- | --------- | ----------------------- | --- | ------- | --- |
seconds.
|     | If  in  a  | specific  case,  | triggers      | would  |     |
| --- | ---------- | ---------------- | ------------- | ------ | --- |
|     | indeed     | arrive  every    | second  then  | the    |     |

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     | Page 21 of 30  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |              |     |     |     |     | interfaces  | release     |
WAIT_SIGUSR time (e.g. 120 seconds)
would apply; i.e. the system would in fact
perform the upload after 2 minutes.
/SEND_SIGUSR1=  This  program  parameter  defines  which  INDIVIDUAL  Yes
|     | other process/ program must be triggered  |             |     |      |         | CASE  |     |
| --- | ----------------------------------------- | ----------- | --- | ---- | ------- | ----- | --- |
|     | after                                     | processing  | by  | the  | SIGUSR  |       |     |
communication.
Specify the process/program WITHOUT
file extension.
/COUNT_SIGUSR1=XX  Uploading in signal mode can hardly be  INDIVIDUAL  Yes
|     | subjected to tracing. This is due to the  |     |     |     |     | CASE  |     |
| --- | ----------------------------------------- | --- | --- | --- | --- | ----- | --- |
fact that the program in those cases is
started once via the scheduler but won't
shut off. Any redirection of the program
|     | call  with  | -d  to  | a  log  | file  | will  then  |     |     |
| --- | ----------- | ------- | ------- | ----- | ----------- | --- | --- |
necessarily lead to very large log files,
|     | which  | will  negatively  |     |     | affect  the  |     |     |
| --- | ------ | ----------------- | --- | --- | ------------ | --- | --- |
performance.
|     | Use                | the  new  | program  |              | parameter  |     |     |
| --- | ------------------ | --------- | -------- | ------------ | ---------- | --- | --- |
|     | /COUNT_SIGUSR1=XX  |           |          | to  specify  | after      |     |     |
|     | how  many          | calls     | the      | program      | will       |     |     |
automatically shut down. A call in these
|     | instances  | is  both,  | a   | call  via  | SIGUSR  |     |     |
| --- | ---------- | ---------- | --- | ---------- | ------- | --- | --- |
communication and the cyclical program
|     | execution  | which  | is  controlled  |     | via  the  |     |     |
| --- | ---------- | ------ | --------------- | --- | --------- | --- | --- |
parameter /WAIT_SIGUSR1.
Then the scheduler restarts the program.
|     | But  this  | will  lead  | to  | a  time  | period  "t"  |     |     |
| --- | ---------- | ----------- | --- | -------- | ------------ | --- | --- |
during which SIGUSR calls will not be
processed. It is, however, assumed that
this will not lead to data losses since the
data to be uploaded are already saved to

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     |     |     | Page 22 of 30  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

| Parameters  | Meaning/use  |     |     |     |     | Relevant    | Productive  |
| ----------- | ------------ | --- | --- | --- | --- | ----------- | ----------- |
|             |              |     |     |     |     | interfaces  | release     |
the DB.
Benefits:
|     | If  the  | program  | is  started  | via  | a  script  |     |     |
| --- | -------- | -------- | ------------ | ---- | ---------- | --- | --- |
(*.scr) from the scheduler, you can store
there the routine to generate a date/ time
|     | stamp  | file  name  | for  | the  log  | file  to  be  |     |     |
| --- | ------ | ----------- | ---- | --------- | ------------- | --- | --- |
created. This allows to restrict the log file
size.
Program parameters for debugging/ tracing/ testing/ logging purposes:
/ONLYERR  This  program  parameter  specifies  that  All  Yes
system log entries are only created if an
error occurred during uploading.
This reduces the entries in the system
log.
| /SIM  | The system does not upload/confirm data  |     |              |     |          | All  | No  |
| ----- | ---------------------------------------- | --- | ------------ | --- | -------- | ---- | --- |
|       | during                                   |     | simulations  |     | (the     |      |     |
|       | uploaded/confirmed                       |     | indicator    |     | is  set  | to   |     |
"'True").
/SIMULATION  The system does not upload/confirm data  All  No
|     | to  | SAP  | during  |     | simulation  |     |     |
| --- | --- | ---- | ------- | --- | ----------- | --- | --- |
(confirmed/uploaded indicator will not be
changed).

| SAP-PSCC4_30.docx  |     | Version: 1.1.22714  |     |     |     |     | Page 23 of 30  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP R/3 PS (CC4)
6 Application-Relevant Settings in HYDRA
Maintenance of the HYDRA distribution model – inbound processing
Edit entries for HYDRA inbound processing in the HYDRA distribution model:
Parameter name Value
For processing of network plans
Message type OPERA4
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to be used>
Description PS-CC4 – Download of network plans
Log. target system Created logical system
Storage duration 10
For processing of upload request
Message type REQUI4
Priority High
Command hysapupl.scr
Command parameter /UPLSEGNAM=E2CONF7
Description PS-CC4 – Upload request
Log. target system Created logical system
Storage duration 10
Maintenance of the HYDRA distribution model – outbound processing
Edit entries for the HYDRA outbound processing in the HYDRA distribution model:
SAP-PSCC4_30.docx Version: 1.1.22714 Page 24 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
Parameter name Value
For uploading time tickets
Message type CONF42
Description PS-CC4 – Upload of time tickets
IDoc type CONF42
Storage duration 10
Log. target system Created logical system
Segment name 1 E2CONF7
Activation of initial download
As of program version
.\lib\b_anr.dll V8.1.1.326
the initial download has to be enabled explicitly for security reasons.
Create the following entry in HYDRA INI configuration if you would like to activate the initial download for
the system:
Parameter name Value
INI name SAP
Section INITIAL_DOWNLOAD_ACTIVATION
Key ACTIV_TILL
Value <Date value in the format MM/DD/YYYY>
Active Yes
Comment Activation of initial download
SAP-PSCC4_30.docx Version: 1.1.22714 Page 25 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
<<XcludeSubDocument=\\archive\mast_ind\Produktdokumentationen\en\Procedures\SAP_PSCC4_Cust
omizing_SAP\SAP_PSCC4_Customizing_SAP.docx>>
SAP-PSCC4_30.docx Version: 1.1.22714 Page 26 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
7 Protecting fields of planned operations
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
SAP-PSCC4_30.docx Version: 1.1.22714 Page 27 of 30

HYDRA Interfacing Module to SAP R/3 PS (CC4)
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
SAP-PSCC4_30.docx Version: 1.1.22714 Page 28 of 30

    HYDRA Interfacing Module to SAP R/3 PS (CC4)

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
| Database field  | Values/content                              |     |
| --------------- | ------------------------------------------- | --- |
| INI_VERWEIS     | The value of the VERWEIS column identified  |     |
from the HYD_INI table via SQL.
| SECTION              | Section  |     |
| -------------------- | -------- | --- |
| IDENT                | Key      |     |
| VALUE                | Value    |     |
| BEMERKUNG (comment)  | Comment  |     |
| AKTIV                | Active   |     |

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

| SAP-PSCC4_30.docx  | Version: 1.1.22714  | Page 29 of 30  |
| ------------------ | ------------------- | -------------- |

HYDRA Interfacing Module to SAP R/3 PS (CC4)
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
SAP-PSCC4_30.docx Version: 1.1.22714 Page 30 of 30