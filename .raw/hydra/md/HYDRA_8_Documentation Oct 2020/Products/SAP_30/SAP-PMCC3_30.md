Manual
HYDRA Interfacing Module to
SAP PM (CC3)
SAP-PMCC 8.1
Version 1.0.19800
Last changed on: 06.08.2020

HYDRA Interfacing Module to SAP PM (CC3)
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-PMCC3_30.docx Version: 1.0.22714 Page 2 of 37

HYDRA Interfacing Module to SAP PM (CC3)
Contents
1 HYDRA Interfacing Module to SAP R/3 PM (CC3) ...................................... 4
2 Mapping of the SAP-PMCC3 in HYDRA ...................................................... 5
3 Behavior Depending on the Transfer Types ................................................ 8
4 Download of Operation Data SAP --> HYDRA .......................................... 10
5 Upload of Confirmations HYDRA --> SAP ................................................. 14
6 SAP Activity Types ..................................................................................... 16
7 MYERPRCK - Program Parameters .......................................................... 18
8 Application-Relevant Settings in HYDRA ................................................... 30
9 Application-Relevant Settings in SAP ........................................................ 33
SAP-PMCC3_30.docx Version: 1.0.22714 Page 3 of 37

HYDRA Interfacing Module to SAP PM (CC3)
1 HYDRA Interfacing Module to SAP R/3 PM (CC3)
Overview
Purpose
You can use the interfacing module SAP PM (CC3) to download maintenance and service orders for an
operation from SAP PM. In HYDRA, you can record postings for these operations and upload the
resulting times to SAP PM. You use the CA-PDC / CC3 interface to connect to SAP PM.
Implementation notes
You use the function package for the following purposes:
 You use SAP PM to plan maintenances and you want to use the MES to record the times for
these orders.
 You use SAP CS (Customer Service) to plan and run services and you want to record times for
the service orders via MES.
Integration
If you use the component SAP-PMCC3, the orders/operations transferred with this component are used
for a great number of further postings in HYDRA.
Features
 Transfer of order data
o Download of the released operations from PM and integration as HYDRA maintenance
orders/operations (initial and delta download and delete function)
 Recording of times
o Recording of start/interruption/end of processing and posting of the times according to
the HYDRA configuration and validation checks
 Upload of operation postings
o Upload to SAP PM of the actual times (performances) recorded for a specific SAP time
ticket
 Interface configuration
o Configurable assignment of the times recorded in HYDRA resource performance
accounts to the SAP activity types
SAP-PMCC3_30.docx Version: 1.0.22714 Page 4 of 37

    HYDRA Interfacing Module to SAP PM (CC3)

2  Mapping of the SAP-PMCC3 in HYDRA
Summary

In the course of a connection of HYDRA to SAP PM, HYDRA must collect PM-relevant data and transfer
them to SAP. The base data here are PM-maintenance and service orders transferred from SAP to
HYDRA.
The download trigger for PM-maintenance orders (PP-PDC / CC3) comes from SAP. The data are
transferred as IDoc (intermediate document) and maintained in HYDRA.
The upload of the confirmations for PM maintenance orders is controlled via SAP in accordance with the
requirements specified by the user.
To realize the communication with the BDE subsystems, SAP provides several IDocs via the PP-PDC
interface. The following IDocs are used:
Download of PM maintenance orders (PP-PDC/ CC3):
| IDoc type:             | OPERA3         |     |
| ---------------------- | -------------- | --- |
| Message type:          | OPERA3         |     |
| Message function:      | APP/ DEL/ UPD  |     |
| Segment type:          | OPERA3         |     |
Download of PM upload requests (PP-PDC/ CC3):
| IDoc type:             | REQUI3  |     |
| ---------------------- | ------- | --- |
| Message type:          | REQUI3  |     |
| Message function:      | REQUI3  |     |
| Segment type:          | REQUI3  |     |
Upload of confirmations of maintenance orders (PP-PDC/ CC3):
| IDoc type:         | CONF32  |     |
| ------------------ | ------- | --- |
| Message type:      | CONF32  |     |
| Segment type:      | CONF5   |     |

| SAP-PMCC3_30.docx  | Version: 1.0.22714  | Page 5 of 37  |
| ------------------ | ------------------- | ------------- |

HYDRA Interfacing Module to SAP PM (CC3)
Download of operation data SAP HYDRA
The operations are transferred in an IDoc of the OPERA3 type. This may be an initial, delta or deletion
download.
The upload request is transferred in an IDoc of the REQUI3 type. When this is received in HYDRA,
confirmations that exist already in HYDRA interface tables will be transferred to SAP.
Upload of confirmations HYDRA  SAP
Confirmations are uploaded either cyclically from HYDRA or from SAP R/3. The interface offers
numerous options to this end so that the specific requirements can be mapped.
The transfer of confirmations/uploads to SAP R/3 is either controlled by HYDRA or by SAP R/3 and is
made in an IDoc of the CONF32 type.
SAP-PMCC3_30.docx Version: 1.0.22714 Page 6 of 37

HYDRA Interfacing Module to SAP PM (CC3)
SAP-PMCC3_30.docx Version: 1.0.22714 Page 7 of 37

HYDRA Interfacing Module to SAP PM (CC3)
3 Behavior Depending on the Transfer Types
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
SAP-PMCC3_30.docx Version: 1.0.22714 Page 8 of 37

HYDRA Interfacing Module to SAP PM (CC3)
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
SAP-PMCC3_30.docx Version: 1.0.22714 Page 9 of 37

    HYDRA Interfacing Module to SAP PM (CC3)

4  Download of Operation Data SAP --> HYDRA
Summary

Transaction data
The following structure is part of the PP-PDC/ CC3 interface and is used to transfer maintenance orders
to sub-systems.
| Message type:      | OPERA3    |                       |     |     |
| ------------------ | --------- | --------------------- | --- | --- |
| IDoc type:         | OPERA3    |                       |     |     |
| Segments:          | E2OPERA1  |                       |     |     |
| Message function:  | APP       |   Delta download     |     |     |
|                    | DEL       |   Deletion download  |     |     |
|                    | UPD       |   Initial download   |     |     |

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |     |
| ----------- | ----- | ------------ | --------------------- | --- |
KK3
RUECK*  NUMC 10  Confirmation number of the operation  x  Saved for the confirmation,
besides no other usage
| AUFNR   | CHAR  12   | Order number                     | x  Order number        |     |
| ------- | ---------- | -------------------------------- | ---------------------- | --- |
| APLFL   | CHAR  6    | Operation sequence               | x  Not used            |     |
| VORNR   | CHAR  4    | Operation number                 | x  Operation number    |     |
| UVORN   | CHAR  4    | Sub-operation                    | x  Sub-operation no.   |     |
| SPLIT*  | NUMC 3     | Split number                     | x  Not used            |     |
| KAPAR*  | CHAR  3    | Capacity type                    | x  Not used            |     |
| BDEGR*  | CHAR  3    | Grouping subsystem connection    | x  Not used            |     |
| MGVRG   | DEC  10.3  | Default quantity                 | -                      |     |
| ASVRG   | DEC  10.3  | Scrap quantities                 | -                      |     |
| MEINH   | CHAR  3    | Operation quantity unit          | -                      |     |
| UMREN   | DEC  5.0   | Denominator for the conversion   | -                      |     |
| UMREZ   | DEC  5.0   | Numerator for the conversion     | -                      |     |
| KMEIN   | CHAR  3    | Header quantity unit             | -                      |     |
| UNTMG   | DEC  10.3  | Underdelivery quantity           | -                      |     |
| UEBMG   | DEC  10.3  | Overdelivery quantity            | -                      |     |
| ACTI1   | DEC  10.3  | Planned activity 1               | -                      |     |
| UNIT1   | CHAR  3    | Unit of the planned activity 1   | -                      |     |

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     | Page 10 of 37  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |     |
| ----------- | ----- | ------------ | --------------------- | --- |
KK3
| ACTI2  | DEC  10.3  | Planned activity 2              | -                   |     |
| ------ | ---------- | ------------------------------- | ------------------- | --- |
| UNIT2  | CHAR  3    | Unit of the planned activity 2  | -                   |     |
| ACTI3  | DEC  10.3  | Planned activity 3              | -                   |     |
| UNIT3  | CHAR  3    | Unit of the planned activity 3  | -                   |     |
| ACTI4  | DEC  10.3  | Planned activity 4              | -                   |     |
| UNIT4  | CHAR  3    | Unit of the planned activity 4  | -                   |     |
| ACTI5  | DEC  10.3  | Planned activity 5              | -                   |     |
| UNIT5  | CHAR  3    | Unit of the planned activity 5  | -                   |     |
| ACTI6  | DEC  10.3  | Planned activity 6              | -                   |     |
| UNIT6  | CHAR  3    | Unit of the planned activity 6  | -                   |     |
| LMNGA  | DEC  10.3  | Planned yield                   | -                   |     |
| XMNGA  | DEC  10.3  | Planned scrap quantity          | -                   |     |
| ISTAT  | CHAR  5    | Status of the operation         | x                   |     |
| ISM01  | DEC  10.3  | Actual activity 1               | -                   |     |
| ISM02  | DEC  10.3  | Actual activity 2               | -                   |     |
| ISM03  | DEC  10.3  | Actual activity 3               | -                   |     |
| ISM04  | DEC  10.3  | Actual activity 4               | -                   |     |
| ISM05  | DEC  10.3  | Actual activity 5               | -                   |     |
| ISM06  | DEC  10.3  | Actual activity 6               | -                   |     |
| LEK01  | CHAR  1    | End indicator for activity 1    | -                   |     |
| LEK02  | CHAR  1    | End indicator for activity 2    | -                   |     |
| LEK03  | CHAR  1    | End indicator for activity 3    | -                   |     |
| LEK04  | CHAR  1    | End indicator for activity 4.   | -                   |     |
| LEK05  | CHAR  1    | End indicator for activity 5    | -                   |     |
| LEK06  | CHAR  1    | End indicator for activity 6    | -                   |     |
| ARBPL  | CHAR  8    | Workplace                       | x  HYDRA workplace  |     |
| WERKS  | CHAR  4    | Plant for the workplace         | x  Plant            |     |
| ARBPI  | CHAR  8    | Actual workplace                | x  Not used         |     |
| WERKI  | CHAR  4    | Plant for the actual workplace  | x  Not used         |     |
ISMNW  DEC  10.3  Actual working time (must not be neg.)  x  Not used
| ISMNE  | CHAR  3   | Unit of the actual work  | x  Not used         |     |
| ------ | --------- | ------------------------ | ------------------- | --- |
| ARBEI  | DEC  6.1  | Planned work             | x  Target BMK11 *)  |     |
ARBEH  CHAR  3  Unit of the planned work  x  S/SEC/MIN/STD/H/HUR/HR
OFMNW  DEC  6.1  Remaining work (must not be neg.)  x  Not used
| OFMNE  | CHAR  3  | Unit of the remaining work    | x  Not used        |     |
| ------ | -------- | ----------------------------- | ------------------ | --- |
| LEKNW  | CHAR  1  | Indicator: no remaining work  | x  Not used        |     |
| FSAVD  | DATS  8  | Earliest start date           | x  PPS start date  |     |
| FSAVZ  | TIMS  6  | Earliest start time           | x  PPS start time  |     |
| SSEDD  | DATS  8  | Latest end date               | x  PPS end date    |     |

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     | Page 11 of 37  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |     |
| ----------- | ----- | ------------ | --------------------- | --- |
KK3
| SSEDZ  | TIMS  6  | Latest end time  | x  PPS end time  |     |
| ------ | -------- | ---------------- | ---------------- | --- |
*)  The actual working time (field ISMNW) must not exceed a duration of 590 hours.
Upload request
The upload request can be used to control the upload of confirmations to SAP. If such an upload request
is received from SAP in HYDRA, all available confirmations will - in turn - be transferred to SAP.
| Message type:      | REQUI3  |                    |     |     |
| ------------------ | ------- | ------------------ | --- | --- |
| IDoc type:         | REQUI3  |                    |     |     |
| Segments:          | REQUI3  |                    |     |     |
| Message function:  | REQ     |   Upload request  |     |     |

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     | Page 12 of 37  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP PM (CC3)
SAP-PMCC3_30.docx Version: 1.0.22714 Page 13 of 37

|     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |
| --- | --- | --- | --- | ----------------------------------------- | --- |

5  Upload of Confirmations HYDRA --> SAP
Summary

Confirmation PP-PDC/ CC3
| Record  | SAP meaning  |     | HYDRA action to be triggered  |     |     |
| ------- | ------------ | --- | ----------------------------- | --- | --- |
type
I20  Time ticket - partial end  Automatic or manual order interruption at the BDE terminal or
at the BDE console
I40  Time ticket end  Notification of the end of an order at the BDE terminal or at
the BDE console

HYDRA BDE confirms to SAP on the basis of time tickets. Transferred are the staff durations from the B-
records (personnel postings). They are transferred to SAP together with the personnel number.
A  transfer  of  correction  notifications  is  not  included  in  the  SAP  default  interface  PP-PDC/  CC3.
Confirmation structure "E2CONF32"
| Message type:  |     | CONF32   |     |     |     |
| -------------- | --- | -------- | --- | --- | --- |
| IDoc type:     |     | CONF32   |     |     |     |
| Segments:      |     | E2CONF5  |     |     |     |

| Field name   | Type  | Length  | Text                | Usage in HYDRA  |     |
| ------------ | ----- | ------- | ------------------- | --------------- | --- |
| Record type  | CHAR  | 3       | Record type of the  | I20 or I40      |     |
confirmation
| TERID  | CHAR  | 4   | Terminal ID           | Not used     |     |
| ------ | ----- | --- | --------------------- | ------------ | --- |
| LDATE  | DATS  | 8   | Logical date/ actual  | Logoff date  |     |
date of the
confirmation
| LTIME  | TIMS  | 6   |     | Logoff time  |     |
| ------ | ----- | --- | --- | ------------ | --- |
Logical time/ actual
time of the
confirmation

| SAP-PMCC3_30.docx  |     |     | Version: 1.0.22714  |     | Page 14 of 37  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |
| --- | --- | --- | --- | ----------------------------------------- | --- |

| Field name  | Type  | Length  | Text  | Usage in HYDRA  |     |
| ----------- | ----- | ------- | ----- | --------------- | --- |
ERDAT  DATS  8  Entry date of the  Date of the confirmation
confirmation
ERTIM  TIMS  6  Entry time of the  Time of the confirmation
confirmation
BUDAT  DATS  8  Posting date of the  set according to shift date of the
posting record
confirmation
| ARBPL  | CHAR  | 8   | Workplace     | HYDRA workplace  |     |
| ------ | ----- | --- | ------------- | ---------------- | --- |
| WERKS  | CHAR  | 4   | Plant         | Plant            |     |
| ZAUSW  | NUMC  | 8   | Badge number  | Time ID number   |     |
AUFNR  CHAR  12  Order number  according to specifications
VORNR  CHAR  4  Operation number   according to specifications
UVORN  CHAR  4  Sub-operation number  according to specifications
| SPLIT  | NUMC  | 3   | Split number  | Not used  |     |
| ------ | ----- | --- | ------------- | --------- | --- |
Capacity type
| KAPAR  | CHAR  | 3   |                         | Not used  |     |
| ------ | ----- | --- | ----------------------- | --------- | --- |
| PEDD   | DATS  | 8   | Predicted end date      | Not used  |     |
| PEDZ   | TIMS  | 6   | Predicted duration end  | Not used  |     |
time
| LEKNW  | CHAR  | 1   | Indicator: no remaining  | Not used  |     |
| ------ | ----- | --- | ------------------------ | --------- | --- |
work
| LTXA1    | CHAR  | 40   | Upload text              | Not used        |     |
| -------- | ----- | ---- | ------------------------ | --------------- | --- |
| ISMNW *  | DEC   | 6.1  | Actual work              | P_DAUER         |     |
| ISMNE    | CHAR  | 3    | Unit of the actual work  | Hrs/ min/ sec*  |     |
LEARR  CHAR  6  Activity type  Activity type of the actual
workplace
| IDAUR *  | DEC  | 4.1  | Actual duration  |  RPA 11  |     |
| -------- | ---- | ---- | ---------------- | -------- | --- |
IDAUE  CHAR  3  Unit of the actual duration  Hrs/ min/ sec*
| ODAUR *  | DEC   | 4.1  | Remaining duration     | Not used  |     |
| -------- | ----- | ---- | ---------------------- | --------- | --- |
| ODAUE    | CHAR  | 3    | Unit of the remaining  | Not used  |     |
duration
| OFMNW *  | DEC   | 6.1  | Remaining work              | Not used     |     |
| -------- | ----- | ---- | --------------------------- | ------------ | --- |
| OFMNE    | CHAR  | 3    | Unit of the remaining work  | Not used     |     |
| ISDD     | DATS  | 8    | Start date for execution    | Login date   |     |
| ISDZ     | TIMS  | 6    | Start time for execution    | Login time   |     |
| IEDD     | DATS  | 8    | End time for execution      | Logoff date  |     |
| IEDZ     | TIMS  | 6    | End time for execution      | Logoff time  |     |

| SAP-PMCC3_30.docx  |     |     | Version: 1.0.22714  |     | Page 15 of 37  |
| ------------------ | --- | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP PM (CC3)
6 SAP Activity Types
Summary
Menu System Administration  MES Link Enabling (MLE)  Activity Types SAP
Transaction code mlecas
Function authorization mlecas.*
Utilization
This configuration can be used if you want to connect the activity types required for uploads to SAP PM
with the created workplaces.
You maintain the assignment with respect to a workplace known within the system and the target module
in SAP.
Integration
The setting is taken into account when it comes to uploads to SAP PM.
Prerequisite
Workplaces and groups have been created in the system.
Field Descriptions
Activity type
Activity type that is to be uploaded to SAP.
Cost center
Not relevant.
SAP_Module
Enter “PM” for uploads to SAP PM.
Designation
User-defined text
Year
No function: year of the validity
SAP-PMCC3_30.docx Version: 1.0.22714 Page 16 of 37

HYDRA Interfacing Module to SAP PM (CC3)
Site
No function: Site of the workplace
Workplace
Workplace for which the configuration applies
From PPS
Do not use this option!
SAP-PMCC3_30.docx Version: 1.0.22714 Page 17 of 37

    HYDRA Interfacing Module to SAP PM (CC3)

7  MYERPRCK - Program Parameters
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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 18 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |     |
| --- | --- | --- | --- | --- | ----------------------------------------- | --- | --- |

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     |     |     | Page 19 of 37  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 20 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |     |
| --- | --- | --- | --- | --- | ----------------------------------------- | --- | --- |

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     |     |     | Page 21 of 37  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |     |     |
| --- | --- | --- | --- | --- | ----------------------------------------- | --- | --- | --- |

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

| SAP-PMCC3_30.docx  |     |     | Version: 1.0.22714  |     |     |     |     | Page 22 of 37  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 23 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 24 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 25 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     |     | Page 26 of 37  |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     | Page 27 of 37  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP PM (CC3)

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     |     |     | Page 28 of 37  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |     |     |
| --- | --- | --- | --- | ----------------------------------------- | --- | --- | --- |

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

| SAP-PMCC3_30.docx  |     | Version: 1.0.22714  |     |     |     |     | Page 29 of 37  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PM (CC3)
8 Application-Relevant Settings in HYDRA
Maintenance of the HYDRA distribution model - inbound processing
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:
Name of the parameter Value
To process PM/ CS production orders
Message type OPERA3
Priority None
Command mle72imp.scr
Command parameter /VARIANT= <MLE variant to be used>
Description PM-CC3 – download PM/ CS orders
Log. target system Created logical system
Storage duration 10
To process the upload request
Message type REQUI3
Priority High
Command hysapupl.scr
Command parameter /UPLSEGNAM=E2CONF5
Description PP-CC3 – Upload request
Log. target system Created logical system
Storage duration 10
Maintenance of the HYDRA distribution model - outbound processing
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
SAP-PMCC3_30.docx Version: 1.0.22714 Page 30 of 37

HYDRA Interfacing Module to SAP PM (CC3)
Name of the parameter Value
To upload time tickets
Message type CONF32
Description PP-CC3 – Upload time tickets
IDoc-Typ CONF32
Storage duration 10
Log. target system Created logical system
Segment name 1 E2CONF5
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
Value <date value in the format MM/DD/YYYY>
Active Yes
Comment Activation of initial download
SAP-PMCC3_30.docx Version: 1.0.22714 Page 31 of 37

    HYDRA Interfacing Module to SAP PM (CC3)

| SAP-PMCC3_30.docx  | Version: 1.0.22714  | Page 32 of 37  |
| ------------------ | ------------------- | -------------- |

HYDRA Interfacing Module to SAP PM (CC3)
9 Application-Relevant Settings in SAP
Customizing the order type
In SAP the CA-PDC interface (KK3) will only take those maintenance and service orders into account for
which the order type has been marked as “BDE-active”. This is marked in Customizing (OIOE).
For each relevant combination of plant and order type the indicator “BDE-active” must be set.
Maintenance at the workplace
Once an order type is identified as “BDE-active” the CA-PDC interface (KK3) will only take those
transactions into account for which at least one subsystem grouping is saved to the workplace.
The subsystem grouping at the workplace is maintained using the workplace maintenance (CR02/ IR02)
 basic data  subsystems. There, the relevant subsystem can be selected from several saved
subsystems.
Definition of new subsystem groupings
To the extent that the subsystem groupings included in the SAP delivery do not suffice, it is possible to
define new ones using SAP Customizing - SPRO  Personnel time management  Business data
collection  General settings  Define grouping for subsystem connection.
Setting of the posting times
Depending on the settings in SAP, the CA-PDC interface (KK3) supports two confirmation scenarios:
 Immediate posting
If the “Immediate posting” indicator is active in Customizing (CI31), HYDRA will immediately post
time ticket confirmations transferred to SAP. If this posting cannot be made - if for example a
maintenance or service order is being blocked - the confirmations will stay prebooked and will be
posted during the next posting run.
 Posting using Job
If the "Immediate posting“ indicator is not set in Customizing (CI31), the confirmations will be
prebooked. They will then be posted later depending on the job, using Job CIP3.
SAP-PMCC3_30.docx Version: 1.0.22714 Page 33 of 37

HYDRA Interfacing Module to SAP PM (CC3)
Planning of relevant jobs
The following programs/ reports must be planned as job to ensure that the PP-PDC interface will operate
automatically:
Program/ Report Meaning Please note:
CIBDOPDE Download maintenance/ service Planning with one variant
orders
SAPCDUP3 Download of the upload request Planning with one variant
Maintenance of the SAP partner agreement/profile – outbound processing
Name of the parameter Value
To download PM/ CS orders
Partner number Created logical system
Partner type LS
Message type OPERA3
Message function APP/ UPD/ DEL
Receiver port Created port
Package size 1
Output mode Transmit IDoc immediately
Basis type OPERA3
To download the upload request
Partner number Created logical system
Partner type LS
Message type REQUI3
SAP-PMCC3_30.docx Version: 1.0.22714 Page 34 of 37

HYDRA Interfacing Module to SAP PM (CC3)
Name of the parameter Value
Message function REQ
Receiver port Created port
Package size 1
Output mode Transmit IDoc immediately
Basis type REQUI3
Maintenance of the SAP partner agreement/profile – inbound processing
Maintain the following settings for inbound processing in the partner agreement/profile in SAP (WE20)
Name of the parameter Value
Partner number Created logical system
Partner type LS
Message type CONF32
Transaction code CON5
Maintenance of the SAP distribution model - outbound processing
Name of the parameter Value
To download PM/ CS orders
Model view Created model view
Sender/ Client Logical system of the client
Recipient/ Server Logical system for the recipient system
Message type OPERA3
Filter If necessary, maintain the BDE grouping as filter
SAP-PMCC3_30.docx Version: 1.0.22714 Page 35 of 37

|     |     |     | HYDRA Interfacing Module to SAP PM (CC3)  |     |
| --- | --- | --- | ----------------------------------------- | --- |

| Name of the parameter  |     | Value  |     |     |
| ---------------------- | --- | ------ | --- | --- |
criterion
To download the upload request
| Model view         |     | Created model view                       |     |     |
| ------------------ | --- | ---------------------------------------- | --- | --- |
| Sender/ Client     |     | Logical system of the client             |     |     |
| Recipient/ Server  |     | Logical system for the recipient system  |     |     |
| Message type       |     | REQUI3                                   |     |     |

Maintenance of the SAP distribution model - inbound processing
| Name of the parameter  |     | Value  |     |     |
| ---------------------- | --- | ------ | --- | --- |
To upload time tickets
| Model view         |     | Created model view                    |     |     |
| ------------------ | --- | ------------------------------------- | --- | --- |
| Sender/ Client     |     | Logical system for the sender system  |     |     |
| Recipient/ Server  |     | Logical system of the client          |     |     |
| Message type       |     | CONF32                                |     |     |

Relevant transactions
| Transaction  | Meaning           |               | Please note:  |     |
| ------------ | ----------------- | ------------- | ------------- | --- |
| CI32         | Initial download  |               |               |     |
| CI34         | Download          | maintenance/  | service  -    |     |
orders as delta download
| CI35  | Download of the upload request   |     | -   |     |
| ----- | -------------------------------- | --- | --- | --- |
| IW46  | Reworking of incorrect postings  |     | -   |     |

| SAP-PMCC3_30.docx  | Version: 1.0.22714  |     |     | Page 36 of 37  |
| ------------------ | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP PM (CC3)
SAP-PMCC3_30.docx Version: 1.0.22714 Page 37 of 37