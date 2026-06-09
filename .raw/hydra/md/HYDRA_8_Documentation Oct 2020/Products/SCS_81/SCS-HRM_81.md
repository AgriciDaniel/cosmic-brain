Manual
HYDRA Personnel Data
Manager
SCS-HRM 8.1
Version 1.0.23049
Last changed on: 02.09.2020

HYDRA Personnel Data Manager
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SCS-HRM_81.docx Version: 1.0.23049 Page 2 of 51

HYDRA Personnel Data Manager
Contents
1 HYDRA Personnel Data Manager - Summary ............................................. 4
2 HYDRA Production Data Manager HR – PZE/PZW/ZKS/PEP .................... 6
2.1 Optional data transfer from SAP .......................................................................... 6
2.2 Sending HR data to HYDRA ................................................................................ 6
2.2.1 Transfer of PZE and ZKS time events ..................................................... 6
2.2.2 Transfer of access statuses and access logs......................................... 10
2.3 Reading HR data from HYDRA ......................................................................... 11
2.3.1 Requesting PZE access authorizations ................................................. 11
2.3.2 Requesting the ZKS access authorizations ........................................... 12
2.3.3 Requesting the list of access time models ............................................. 14
2.3.4 Requesting the public holidays .............................................................. 16
2.3.5 Requesting opening hours ..................................................................... 16
2.3.6 Requesting the terminal list ................................................................... 17
2.3.7 Requesting the access list ..................................................................... 22
2.4 Online requests ................................................................................................. 25
2.4.1 Online check of PZE authorizations ....................................................... 25
2.4.2 Online check of ZKS authorizations ....................................................... 26
2.4.3 Online request of a person's account balances...................................... 26
2.5 Pre-processed data from third-party systems .................................................... 27
2.5.1 Import of day-related (clocking) data ..................................................... 27
2.6 Transferring configurations from third-party systems ......................................... 33
2.6.1 Transfer of the planned working time ..................................................... 33
2.6.2 Absence planning .................................................................................. 39
2.6.3 Creating account limits in HYDRA ......................................................... 44
2.6.4 Assigning authorizations for PZE and ZKS terminals ............................. 46
2.7 Data collection for the incentive wage ............................................................... 47
2.7.1 List of bonus reasons (ZUSCHLGR.LIST) ............................................. 47
2.7.2 Recording of bonuses on the terminal (P_ZUSCHL) .............................. 48
SCS-HRM_81.docx Version: 1.0.23049 Page 3 of 51

HYDRA Personnel Data Manager
1 HYDRA Personnel Data Manager - Summary
Possible fields of application
The HYDRA Personnel Data Manager is a data interface by means of which personnel data of all kinds
can be exchanged with the HYDRA system. This may be, for example, clocking records, absences and
access protocols provided by external time & attendance systems or access control systems or any other
systems.
The data is transferred to the HYDRA database and processed within the installed HYDRA applications.
Prerequisite: the external systems can operate the HYDRA Personnel Data Manager in HYDRA standard
format.
The HYDRA Personnel Data Manager, for example, allows for the input data of the time &
attendance/incentive wages/personnel scheduling and access control modules to be transferred directly
to the HYDRA system or retrieved from HYDRA without using a terminal for the entry.
In the same way, data can be transferred or called up, which is normally entered or retrieved at the
HYDRA clients.
The data can be transferred to HYDRA online or offline via an external application.
Implementation notes
You use this component if you would like to:
 Exchange personnel data with HYDRA on your own or using 3rd party applications
 Connect existing applications to HYDRA
Integration
For integration purposes, the HYDRA Personnel Data Manager provides a separate program library as
well as corresponding interface calls.
Functions
 Programming libraries:
o For integration into the individual application
 Description of the functions:
o According to the HYDRA objects and their functions
SCS-HRM_81.docx Version: 1.0.23049 Page 4 of 51

HYDRA Personnel Data Manager
 Special workshops:
o For goal-oriented integration and utilization of the HYDRA Personnel Data Manager
Contents
This document describes the formats used for transferring personnel data to HYDRA or to read out
personnel data from HYDRA.
The technical description of the interface is included in the document entitled SCS-PDM "Production Data
Manager".
SCS-HRM_81.docx Version: 1.0.23049 Page 5 of 51

|     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

2  HYDRA Production Data Manager HR – PZE/PZW/ZKS/PEP
| 2.1  | Optional data transfer from SAP  |     |     |     |     |     |
| ---- | -------------------------------- | --- | --- | --- | --- | --- |
You use the structures described in the following to transfer data from SAP in HYDRA dialog data format
using a customer-specific function module.
| Message type:  |     | Z*         |     |     |     |     |
| -------------- | --- | ---------- | --- | --- | --- | --- |
| IDoc type:     |     | Z*01       |     |     |     |     |
| Segments:      |     | Z2BAPI000  |     |     |     |     |

NOTE
To generate segment names in HYDRA inbound processing as described above, the segments must
have been created in SAP according to the pattern Z1<segment name>. Versioning in SAP outbound
processing then creates the segment names in the form Z2<Segment name><Version>.
Example: Z1BAPI becomes Z2BAPI000
| Field name  |     | Type    | Description  |     | Example  |     |
| ----------- | --- | ------- | ------------ | --- | -------- | --- |
Transaction  CHAR  20  Transaction ID (dialog ID in HYDRA)  TGERG.MODIFY
Description  CHAR  40  Plain text designation as comment  Zeitwirtschaftsergebnisse.an.HYDRA
Data  CHAR  940  Dialog data string for HYDRA  DLG=TGERG.MODIFY|TGERG.PNR=1234
5678|…
For more details see the sections that
follow

| 2.2    | Sending HR data to HYDRA             |     |     |     |     |     |
| ------ | ------------------------------------ | --- | --- | --- | --- | --- |
| 2.2.1  | Transfer of PZE and ZKS time events  |     |     |     |     |     |
The time events listed below can be transferred to HYDRA online.
Structure of dialog data
The different fields are separated by the "|" symbol:
Header data
Field  Description
DLG={P_KOM, P_GEH, ...}  Dialog  ID  (see  below)  (e.g.  clocking-in  DLG=P_KOM)

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 6 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

HYDRA Personnel Data Manager
The dialog ID should be transferred as the first field.
DAT={mm/dd/yyyy} Date of the event in the format "mm/dd/yyyy“
(e.g. clocking date DAT=03/30/1999)
ZEI={seconds} Time of the event in seconds after midnight
(e.g. clocking time 10:00:03 is ZEI=36003)
USR={hy_user} "Hydra User“ (see above) With terminals, 2000 is added to the
terminal number. (terminal 4 is USR=2004)
OFF={J|N} Offline flag. Enter "OFF=J“ if data has been entered offline and
buffered. In this case, data is processed separately. ("OFF=N" need
not be specified)
Field data
Field Description
TNR={...} Terminal number
KNR={...} Badge number with a maximum of 10 characters (0...9, A...F). The
badge number has to be uploaded with the same number of digits
(length) becaus it has been transferred while downloading
authorizations.
PNR={...} Personnel number with a maximum of ten digits (0..9)
FIR={...} Company with a maximum of four digits. As an alternative to the staff
badge number, the personnel number can be transferred with the
company with some dialogs.
KST={...} Cost center with a maximum of eight digits
ZART={...} Time type (S = daylight saving time, W = standard time). If this field is
not transferred, HYDRA automatically identifies the time type using the
change between daylight saving time and standard time. Daylight saving
and standard time cannot be distinguished properly on the day the time
is reset.
FGR={...} Absence reason for P_VB, P_NB or P_FGR.
PIN={...} The person's PIN code or password (e.g. for Internet clocking records). If
this field is transferred, the PIN code is always checked (against the PIN
code of the HR master) and the access authorization is also checked
(with Internet, it is always the terminal number 255).
PARAM02={...} This field can include up to two references (separated by comma) to a
message displayed on the terminal. You use this field to count down the
number specifying how often a message is displayed (or if escalation
management is used, an escalation can be finished by the message
display).
SCS-HRM_81.docx Version: 1.0.23049 Page 7 of 51

|     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | ----------------------------- | --- |

Examples: "PARAM02=143" or "PARAM02=143,178"

Note
Enter either the personnel number and the company or the staff badge number.

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     | Page 8 of 51  |
| ---------------- | --- | ------------------- | --- | ------------- |

HYDRA Personnel Data Manager
Dialog IDs
Identification Description
P_KOM Clocking-in
P_GEH Clocking-out
P_PAU Clocking out for break
P_AST Automatic status clocking (subject to the status, it is like a clocking-in
or clocking-out)
P_VB Advance clocking: Clocking-out including reason. The number of the
absence reason is transferred by FGR=x without leading zeros. For
business trip clocking records FGR=1 is set.
P_NB Subsequent clocking: Clocking-in including reason. The number of
the absence reason is transferred by FGR=x without leading zeros.
P_FGR Absence reason clocking (subject to the status, it is like an advance
posting or subsequent posting): the number of the absence reason is
transferred by FGR=x without leading zeros.
Z_ZUT Logging of an access. (Using the fields BDAT (date until) and BZEI
(time until), you can additionally transfer the time specifying how long
the door was open. DAT and ZEI are interpreted as start date and
start time).
Z_ZV Logging of an access attempt (The field ZVG includes the reason for
the access attempt:
2001=Unauthorized badge
2002=No badges loaded (number of badges = 0)
2003=Beyond access time model
2004=Beyond opening hours
2005=Wrong PIN code
2006=Wrong company number
2010=Double posting within the blocking time (anti-passback)
2013=Missing PIN code
2014=Badge beyond validity period
2020=Other access point of the security gate opened
2030=Already present in room zone
2031=Not present in room zone
2032=Room zone completely occupied
3000=Wrong badge number length
Example of a clocking-out on 15 January 2010 at 16:32:53:
DLG=P_GEH|KNR=001365|DAT=01/15/2010|ZEI=59573|TNR=17|
SCS-HRM_81.docx Version: 1.0.23049 Page 9 of 51

|     |     |     |     |     |     | HYDRA Personnel Data Manager  |     |     |
| --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- |

| 2.2.2  | Transfer of access statuses and access logs   |     |     |     |     |     |     |     |
| ------ | --------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
The status of an access point can be sent to HYDRA using the dialog "Z_STA":
|            | Field  |                                        |     |     | Description  |     |     |     |
| ---------- | ------ | -------------------------------------- | --- | --- | ------------ | --- | --- | --- |
| DLG=Z_STA  |        | Dialog ID for the access point status  |     |     |              |     |     |     |
| ZNR={...}  |        | Access point number                    |     |     |              |     |     |     |
DAT={...}, ZEI={...}  Date and time (in seconds since beginning of the day)
DATB={...}, ZEIB={...}  As an alternative to DAT and ZEI, DATB and ZEIB can be used to
DATE={...}, ZEIE={...}  transfer the start time of the status and DATE and ZEIE can be used
to specify the end time. With cyclic status postings, DATE and ZEIE
|     |     | include  | the  current  | point  | in  time. With  | this  | alternative,  | the  fields  |
| --- | --- | -------- | ------------- | ------ | --------------- | ----- | ------------- | ------------ |
DATB, ZEIB, DATE and ZEIE must be populated.
| STA={...}  |     | Status of the access point:  |                                              |     |     |     |     |     |
| ---------- | --- | ---------------------------- | -------------------------------------------- | --- | --- | --- | --- | --- |
|            |     | Z:                           | The access point is closed                   |     |     |     |     |     |
|            |     | O:                           | The access point is open                     |     |     |     |     |     |
|            |     | U:                           | The access point is open without permission  |     |     |     |     |     |
|            |     | L:                           | The access point has been opened too long    |     |     |     |     |     |
|            |     | S:                           | Sabotage: The terminal has been opened       |     |     |     |     |     |
A:  Malfunction: The terminal is not connected with the reader

|     |     | F:  | The alarm is suppressed at the access point.  |     |     |     |     |     |
| --- | --- | --- | --------------------------------------------- | --- | --- | --- | --- | --- |
One of the statuses "closed" or "open" (Z, O) specify the end of the
alert (U, L, S, A).
KNR={...}  Badge that has opened the access point (with status "opened too
long").
| BERANZ={...}  |     | Number of authorized badges  |     |     |     |     |     |     |
| ------------- | --- | ---------------------------- | --- | --- | --- | --- | --- | --- |
BERDAT={...}, BERZEI={...}  Point in time when authorizations have last been read.
PRO={J/N}  This button controls whether or not HYDRA logs are generated from
|     |     | access  | statuses  | (PRO=J).  | As  an  | alternative,  | log  records  | about  |
| --- | --- | ------- | --------- | --------- | ------- | ------------- | ------------- | ------ |
access point statuses may also be sent to HYDRA (PRO=N).
Access point statuses are sent to HYDRA in cyclic intervals. The cyclic status time is defined for each
access point in the access list (ZYKL:STA).
|     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 10 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

Access status logs are sent to HYDRA using the dialog "Z_PRO“:
|            | Field  |                                   | Description  |     |     |
| ---------- | ------ | --------------------------------- | ------------ | --- | --- |
| DLG=Z_PRO  |        | Dialog ID for access status logs  |              |     |     |
| ZNR={...}  |        | Access point number               |              |     |     |
DATB={...}, ZEIB={...}  DATB and ZEIB can be used to transfer the start time of the status
DATE={...}, ZEIE={...}  and DATE and ZEIE can be used to specify the end time.
DAUER={...}  Duration of the status at the access. If this field is not transferred, the
duration is calculated automatically.
STA={...}  Status of the access point (the same values as for the access point
status)
KNR={...}  Badge that has opened the access point (with status "opened too
long").

| 2.3    | Reading HR data from HYDRA            |     |     |     |     |
| ------ | ------------------------------------- | --- | --- | --- | --- |
| 2.3.1  | Requesting PZE access authorizations  |     |     |     |     |
Access authorizations are provided by the command DLG=LIST;27 and filed in HYDRADIR\spool\{file
name}.
Structure of dialog data:
"DLG=LIST;27|DATEI={file name}|DAT=...|ZEI=...|USR=...|TNR=...|..."
{File name}
Specification of ".\spool\hyu{Hydrauser}.c27“; with {Hydra user} ranging between 2001 and 2999
(user numbers of the terminals). The external interface 1 corresponds to the HYDRA user number
3001.
The list is sorted by the badge number and includes the following data:
KNR=Badge number|...  The first row includes the column caption  KNR=Badge number|...
and the field ID
{Badge1}|...  The other rows include the values for the  0001|...
field ID. The individual badges are sorted
in ascending order in the file.
| {Badge1}|...  |     |     |     | 0004|...  |     |
| ------------- | --- | --- | --- | --------- | --- |

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 11 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

When data is interpreted, the field abbreviations of the 1st line must be interpreted. Future versions can
have a different column sequence or new columns are inserted at any place. Columns with unknown field
abbreviations must be ignored and must not lead to a program error or termination.
The following table shows further columns that are included in each row. The columns are separated from
each other by the "|" pipe symbol:
| DGBE=     |       | Business trip authorization (J/N)  |     |     | e.g. J  |     |
| --------- | ----- | ---------------------------------- | --- | --- | ------- | --- |
| Business  | trip  |                                    |     |     |         |     |
authorization
| PNR=Person   |     | The person's personnel number      |     |     | e.g. 142234  |     |
| ------------ | --- | ---------------------------------- | --- | --- | ------------ | --- |
| FIR=Company  |     | Company the person is assigned to  |     |     | e.g. DBI     |     |
KTO:x=Designation  Up to 8 columns including accounts can  Example for an account balance:
|     |     | be listed. The number depends on how  |     |     | 123:43  |     |
| --- | --- | ------------------------------------- | --- | --- | ------- | --- |
many accounts have been activated in
|     |     | HYDRA.  Behind  | the  equals  | sign,  the  |     |     |
| --- | --- | --------------- | ------------ | ----------- | --- | --- |
account name is shown that is displayed
on the terminal, if possible.

| 2.3.2  | Requesting the ZKS access authorizations  |     |     |     |     |     |
| ------ | ----------------------------------------- | --- | --- | --- | --- | --- |
Access authorizations are provided by the command DLG=LIST;28 and filed in HYDRADIR\spool\{file
name}. The file name should be structured as follows:   .\spool\hyu{Hydra user}.c{number of the list};
  Example: .\spool\hyu2017.c28
Structure of dialog data:
"DLG=LIST;28|DATEI={file  name}|DAT=...|ZEI=...|USR=...|ZNR=...|...“
with ZNR being the corresponding access point number.

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 12 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- |

The list is sorted by the staff badge number and includes the following data:
| KNR=Badge number  |     | Valid badge number  |     |     |     |     | e.g. 0111  |     |
| ----------------- | --- | ------------------- | --- | --- | --- | --- | ---------- | --- |
PIN=PIN code  PIN code; transferred uncoded. The PIN  e.g. 4711
code is only requested during the access
|     |     | periods  | when  PIN  | code  | request  | is  |     |     |
| --- | --- | -------- | ---------- | ----- | -------- | --- | --- | --- |
enabled.
DAT_VON=Date from  Beginning  of  the  validity  period  of  the  e.g. 05/30/1999
badge. Access authorizations, which are
valid next week, are transferred. For this
|     |     | reason,  | the  validity  | period  | must  | be  |     |     |
| --- | --- | -------- | -------------- | ------- | ----- | --- | --- | --- |
checked. If this field is empty, the validity
|     |     | of  the  | badge  is  | not  restricted  |     | in  the  |     |     |
| --- | --- | -------- | ---------- | ---------------- | --- | -------- | --- | --- |
future.
DAT_BIS=Date until  End of validity of the badge. If this field is  e.g. 12/31/1999
empty, the badge is valid for an unlimited
period.
WTAG=Weekday  The access authorization is valid on the  e.g. NJJJJJNN
|     |     | specified      | weekdays.     | This  | 8-digit     | field       |     |     |
| --- | --- | -------------- | ------------- | ----- | ----------- | ----------- | --- | --- |
|     |     | contains       | a  "J"  on    | the   | days  when  | the         |     |     |
|     |     | authorization  | is  valid.    |       | The  first  | digit       |     |     |
|     |     | stands         | for  Sunday,  | the   | 7th         | digit  for  |     |     |
Saturday and the 8th digit for a public
holiday.
Note:
|     |     | This  field  | is  no  longer  |     | relevant  | as  of  |     |     |
| --- | --- | ------------ | --------------- | --- | --------- | ------- | --- | --- |
HYDRA 7.1, as it has been replaced by
|     |     | the  weekdays  | (WTAG)  |     | in  the  | access  |     |     |
| --- | --- | -------------- | ------- | --- | -------- | ------- | --- | --- |
time models.
ZZ=access time model  Number  of  the  access  time  model  to  e.g. 2
|     |     | specify  | a  time  limit  | for  | the  | access  |     |     |
| --- | --- | -------- | --------------- | ---- | ---- | ------- | --- | --- |
authorization.

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 13 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- |

| 2.3.3  | Requesting the list of access time models  |     |     |     |     |     |     |     |
| ------ | ------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
The  list  of  access  time  models  is  provided  using  the  command  DLG=LIST;29  and  stored  in
HYDRADIR\spool\{file name}. The list is identical for all access points and, as a result, does not have to
be requested for each access point.
Structure of dialog data:
"DLG=LIST;29|DATEI={File name}|DAT=...|ZEI=...|USR=...|...“
The list includes the following data:
ZZ=access time model  Number of the access time model.  e.g. 2
ZEIVON=beginning  of  Start time of an interval of the access  e.g. 21600
| the access period  |     | time model in seconds since beginning of  |     |     |     |     |     |     |
| ------------------ | --- | ----------------------------------------- | --- | --- | --- | --- | --- | --- |
|                    |     | the day.                                  |     |     |     |     |     |     |
If values < 0 are transferred for this time,
|     |     | they  are  | interpreted  | as  | times  | of  the  |     |     |
| --- | --- | ---------- | ------------ | --- | ------ | -------- | --- | --- |
previous day. Example: -3600 is 23:00
|     |     | on  the  | previous  | day  | (only  with  | the  |     |     |
| --- | --- | -------- | --------- | ---- | ------------ | ---- | --- | --- |
terminal programs AIP and ctwin).
ZEIBIS=end  of  the  End time of an interval of the access time  e.g. 86400
| access period  |     | model in seconds since beginning of the  |     |     |     |     |     |     |
| -------------- | --- | ---------------------------------------- | --- | --- | --- | --- | --- | --- |
day.
|     |     | If  values  | >  86400  | (=  | 24  hours)  | are  |     |     |
| --- | --- | ----------- | --------- | --- | ----------- | ---- | --- | --- |
transferred for this time, this end time is
interpreted as a time of the following day.
Example: 90000 is 01:00 on the next day
(only with the terminal programs AIP and
ctwin).
GETKNR=Requesting  Defines  whether  or  not  the  badge  is  e.g. J
| the badge number  |     | required        | to  open  | the      | door  during    | that      |     |     |
| ----------------- | --- | --------------- | --------- | -------- | --------------- | --------- | --- | --- |
|                   |     | time  interval  | (J/N).    | This     | field           | is  only  |     |     |
|                   |     | interesting     | for       | opening  | hours  because  |           |     |     |
the check if the badge number request is
activated can only be performed when
the badge has been read.
GETPIN= Request    Defines whether or not a PIN code is  e.g. N
| PIN code  |     | required  | to  open  | the  | door  during  | that  |     |     |
| --------- | --- | --------- | --------- | ---- | ------------- | ----- | --- | --- |
time interval (J/N).
PRO=Logging  Specifies the postings that are logged in  e.g. Z
|     |     | this access period:  |     |     |     |     |     |     |
| --- | --- | -------------------- | --- | --- | --- | --- | --- | --- |

| SCS-HRM_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     | Page 14 of 51  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

|     |     | - 'Z': accesses and access attempts  |     |     |     |     |
| --- | --- | ------------------------------------ | --- | --- | --- | --- |
|     |     | - 'V': only access attempts          |     |     |     |     |
- 'N': no logging
WTG=Weekdays  The  access  period  is  valid  on  the  e.g. NJJJJJNNNN
|     |     | specified  | weekdays.        | This  10-digit  | field  |     |
| --- | --- | ---------- | ---------------- | --------------- | ------ | --- |
|     |     | contains   | a  "J"  on  the  | days  when      | the    |     |
authorization is valid. The 1st character
stands for Sunday, the 7th character for
Saturday and the 8th to 10th characters
stand for three types of public holidays.

The list can include several intervals for an access time model each having the same number.

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 15 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.3.4  | Requesting the public holidays  |     |     |     |     |
| ------ | ------------------------------- | --- | --- | --- | --- |
The list of public holidays is provided by the command DLG=LIST;30 and filed in HYDRADIR\spool\{file
name}. It includes the public holidays for the next 30 days as of yesterday. The list is made up for an
access group. When you make a request for an access, the system must request the list of the relevant
access group.
Structure of dialog data:
„DLG=LIST;30|DATEI={file name}|DAT=...|ZEI=...|USR=...|ZNR=...|...“
The list includes the following data:
| DAT=Date  |     | Date of the public holiday  |     | e.g. 06/03/1999  |     |
| --------- | --- | --------------------------- | --- | ---------------- | --- |
BEZ=Designation  Designation of the public holiday  e.g. Feast of Corpus Christi
| ART=Type  |     | Type of the public holiday (1/2/3): three  |     | e.g. 1  |     |
| --------- | --- | ------------------------------------------ | --- | ------- | --- |
types of public holidays are possible as
of HYDRA 6.5. In the access time
models, you can assign authorizations
for these 3 types of public holidays.
| 2.3.5  | Requesting opening hours  |     |     |     |     |
| ------ | ------------------------- | --- | --- | --- | --- |
The list of opening hours is provided by the command DLG=LIST;32 and filed in HYDRADIR\spool\{file
name}. The list is made up for an access group. When you make a request for an access, the system
must request the list of the relevant access group.
Structure of dialog data:
„DLG=LIST;32|DATEI={file name}|DAT=...|ZEI=...|USR=...|ZNR=...|...“

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 16 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- |

The list includes the following data:
DAT_VON=Date from  Beginning  of  the  validity  period  for  e.g. 05/03/1999
opening hours. Opening hours that are
valid next week are transferred. For this
|     |     | reason,  | the  validity  | period  | must  | be  |     |     |
| --- | --- | -------- | -------------- | ------- | ----- | --- | --- | --- |
checked.
DAT_BIS=Date until  End of validity of opening hours. If this  e.g. 31/12/1999
|     |     | field  is  | empty,  the  | validity  | of  | opening  |     |     |
| --- | --- | ---------- | ------------ | --------- | --- | -------- | --- | --- |
hours is unlimited.
WTAG=Weekday  The  opening  hours  are  valid  on  the  e.g. NJJJJJNN
|     |     | specified  | weekdays.   | This  | 8-digit     | field  |     |     |
| --- | --- | ---------- | ----------- | ----- | ----------- | ------ | --- | --- |
|     |     | contains   | a  "J"  on  | the   | days  when  | the    |     |     |
opening hours are valid. The first digit
|     |     | stands  | for  Sunday,  | the  | 7th  | digit  for  |     |     |
| --- | --- | ------- | ------------- | ---- | ---- | ----------- | --- | --- |
Saturday and the 8th digit for a public
holiday.
Note:
|     |     | This  field  | is  no  longer  |     | relevant  | as  of  |     |     |
| --- | --- | ------------ | --------------- | --- | --------- | ------- | --- | --- |
HYDRA 7.1, as it has been replaced by
|     |     | the  weekdays  | (WTAG)  |     | in  the  | access  |     |     |
| --- | --- | -------------- | ------- | --- | -------- | ------- | --- | --- |
time models.
ZZ=access time model  Number  of  the  access  time  model  to  e.g. 2
specify a time limit for the opening hours.
| 2.3.6  | Requesting the terminal list  |     |     |     |     |     |     |     |
| ------ | ----------------------------- | --- | --- | --- | --- | --- | --- | --- |
The list of terminals is provided by the command DLG=LIST;45 and filed in HYDRADIR\spool\{file name}.
You can request this list for a specific or for all terminals.
Structure of dialog data:
„DLG=LIST;45|DATEI={file name}|DAT=...|ZEI=...|USR=...|TNR=...|“

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 17 of 51  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

HYDRA Personnel Data Manager
The list includes the following data:
TNR=Terminal number Number of the terminal e.g. 13
TYP=Terminal type Terminal type (series). MBB terminals range e.g. 331 or 380
between 10, 40-44 or 50. Benzing terminals
range between 100 and 109 and between 120
and 129. Terminals by MECS range between
201 and 204 (201 = Staff Port 2.0, 202 = Time
Port 2.0, 203 = Access Port 2.0, 204 = Job Port
2.0)
CFG:1=Configuration 1 Configuration ID 1: includes the terminal class e.g. 1
for MBB, Benzing and MECS terminals
HWADR=Hardware Hardware address of the terminal. The bus e.g COM1;5
address address is entered after a semicolon for a bus e.g. 192.168.10.123
at the COM interface.
TZ=Time zone Time zone of the terminal. The following entries empty
are processed:
GMT+2DST Eastern Europe (Bucharest, Sofia,
...)
GMT+1DST Central Europe (Berlin, Vienna, ...)
GMT0DST Great Britain (London, ...)
GMT-6DSTU USA Central Standard Time
(Chicago, Dallas, Kansas City, Winnipeg)
GMT-5DSTU Mexico (Quintana Roo)
GMT-6DSTU Mexico (Mexico City, ...)
GMT-7DSTU Mexico (Chihuahua, ...)
GMT-8DSTU Mexico (Baja California Tijana)
If no entry is made in this field, Central Europe
is the default value (with change from standard
to daylight saving time).
LANG=Language Language (empty or 1=German, 2=English, e.g. 1
3=Dutch, 4=French, 5=Danish, ...)
Please note: With old installations, a letter
might be included in this field --> ignore
BEZK=Location Location of the terminal (char 8) e.g. Entrance
BEZL=Designation Designation of the terminal (char 20) e.g. Time at the
entrance
AKTIV=Active Specifies whether or not the terminal is active e.g. J
(J/N). Inactive terminals are not polled.
SCS-HRM_81.docx Version: 1.0.23049 Page 18 of 51

HYDRA Personnel Data Manager
LEN_KNR=Length of Authorized badges are transferred to the e.g. 4
badge number terminal with the length that is configured here.
This length must also be integrated when
clocking records are uploaded.
BART:MDE=MDE active Operation mode of the terminal. This field N
shows whether or not the machine data
collection module (HYDRA MDE) is active on
this terminal (J/N).
BART:ADE=ADE active Operation mode of the terminal. This field N
shows whether or not the shop floor data
collection module (HYDRA ADE) is active on
this terminal (J/N).
BART:PZE=PZE active Operation mode of the terminal. This field J
shows whether or not the time and attendance
module (HYDRA PZE) is active on this terminal
(J/N). Access control (ZKS) terminals are also
presented as time and attendance (PZE)
terminals.
PZEBART=PZE operation Operation mode for PZE and ZKS e.g. AST
mode ("AST"=automatic status (rhythm posting),
empty = enter status using the keyboard,
"Z*"=ZKS operation modes)
PZESTA:VORG= Default status to which the terminal e.g. "A" for automatic
Default status automatically returns (currently not processed). status
SYSNR=Company Company number/system number that is to be e.g. empty
number/system number included in the badge number.
TTXT:KOM=Key IN Labeling of the IN key e.g. clock-in
TTXT:GEH=Key OUT Labeling of the OUT key e.g. clock-out
TTXT:PAU=Break key Labeling of the break key e.g. break
TTXT:INFO=Key INFO Labeling of the INFO key e.g. info
FGR:1=Absence reason 1 1th absence reason (char 3) e.g. bus
TTXT:FGR1=Key Labeling of the first absence reason key e.g. business trip
Absence reason 1
FGR:2=Absence reason 2 Second absence reason (char 3) e.g. 97
TTXT:FGR2=Key Labeling of the second absence reason key e.g. doctor
Absence reason 2
FGR:3=Absence reason 3 Third absence reason (char 3) e.g. empty
TTXT:FGR3=Key Labeling of the third absence reason key e.g. empty
SCS-HRM_81.docx Version: 1.0.23049 Page 19 of 51

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

Absence reason 3
FGR:4=Absence reason 4  Fourth absence reason (char 3)  e.g. FGL
TTXT:FGR4=Key  Labeling of the fourth absence reason key  e.g.  list  of  absence
| Absence reason 4  |     |     |     | reasons  |     |
| ----------------- | --- | --- | --- | -------- | --- |
FGRCFG=  Configuration of absence reason input: Entry  e.g. empty
Input of absence reason  "3" stands for the absence reason list of the 4th
function key
OPT:FGRAUTO=Recordi Automatic input of absence reasons if beyond  e.g. empty
| ng of absence reasons  |     | planned time (entry "G").  |     |     |     |
| ---------------------- | --- | -------------------------- | --- | --- | --- |
PLAUS:PZEONL=Online  Online checking of rejected badges (not yet  e.g. empty
| check  |     | processed)  |     |     |     |
| ------ | --- | ----------- | --- | --- | --- |
PLAUS:PZESTA=Status  Checking of the status sequence: "S"=checking  e.g. empty
| sequence  |     | whether the status sequence is correct  |     |     |     |
| --------- | --- | --------------------------------------- | --- | --- | --- |
"P"=checking whether clocking-in is available at
the same terminal
With the operation mode "AST" the entry "S"
results in the status to be requested and
displayed online.
ZYKLLOAD:PZE=  Specification in seconds how often the terminal  e.g. 3600
| cyclic loading PZE  |     | cyclically reloads its configuration and  |     |     |     |
| ------------------- | --- | ----------------------------------------- | --- | --- | --- |
authorizations.
ZEI:BERLESEN1  1. Time for reading PZE authorizations  e.g. 7200
ZEI:BERLESEN2  2. Time for reading PZE authorizations  e.g. 10800
| RELZUG:DAUER=  |     | Relay time for door opener  |     | e.g. 3  |     |
| -------------- | --- | --------------------------- | --- | ------- | --- |
Duration of opener
PZESTA:DAUER=  General return time for display outputs to the  e.g. 5
| Duration of status  |     | default status                       |     |         |     |
| ------------------- | --- | ------------------------------------ | --- | ------- | --- |
| PZEINFO:DAUER=      |     | Display duration of the information  |     | e.g. 8  |     |
Duration of info
PZEINFO:CFG=Informati "S" for displaying the last clocking records  e.g. empty
on display
PZEINFO:NR=Information  Number of the information to be displayed  e.g. 1
number
INFOZEIB:1=Info from 1  Start of the first period for displaying the  e.g. 0
information on the terminal
INFOZEIE:1=Info to 1  End of the first period for displaying information  e.g. 86400
on the terminal
INFOZEIB:2=Info from 2  Start of the second period for displaying the  e.g. 0

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 20 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

HYDRA Personnel Data Manager
information on the terminal
INFOZEIE:2=Info to 2 End of the second period for displaying e.g. 0
information on the terminal
INFOZEIB:3=Info from 3 Start of the third period for displaying the e.g. empty
information on the terminal
INFOZEIE:3=Info to 3 End of the third period for displaying information e.g. empty
on the terminal
INFOZEIB:4=Info from 4 Start of the 4th period for displaying the e.g. empty
information on the terminal
INFOZEIE:4=Info to 4 End of the 4th period for displaying information e.g. empty
on the terminal
INFOZEIB:5=Info from 5 Start of the 5th period for displaying the e.g. empty
information on the terminal
INFOZEIE:5=Info to 5 End of the 5th period for displaying information e.g. empty
on the terminal
SCS-HRM_81.docx Version: 1.0.23049 Page 21 of 51

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.3.7  | Requesting the access list  |     |     |     |     |
| ------ | --------------------------- | --- | --- | --- | --- |
The list of access points is provided by the command DLG=LIST;46 and filed in HYDRADIR\spool\{file
name}. You can request this list for a specific or for all terminals. The list is sorted by the terminal number
and by the access point number if several access points are connected to one terminal.
Structure of dialog data:
„DLG=LIST;46|DATEI={file name}|DAT=...|ZEI=...|USR=...|TNR=...|“
The list includes the following data:
| ZNR=access point  |     | Number of the access point  |     | e.g. 17      |     |
| ----------------- | --- | --------------------------- | --- | ------------ | --- |
| BEZK=Short name   |     | Short name                  |     | e.g. gate S  |     |
BEZL=Designation  Designation  e.g.  Southern  gate  factory
building
| ZGRP=Access group  |     | Number of the access group  |     | e.g. 21  |     |
| ------------------ | --- | --------------------------- | --- | -------- | --- |
AKTIV=Active  Specifies whether or not the access point  e.g. J
is active (J/N). Inactive access points are
blocked (no access authorization
applicable).
RAUM=Room number  Room number (not yet processed at the  e.g. 0
moment)
| ART=Access type  |     | Access point type:  |     | e.g. E  |     |
| ---------------- | --- | ------------------- | --- | ------- | --- |
|                  |     | 'E' : Entrance      |     |         |     |
|                  |     | 'A' : Exit          |     |         |     |
|                  |     | 'D' : Passage       |     |         |     |
'O' : Without check of badge number
(check of system number SYSNR only)
TNR=Terminal number  Number of the terminal to which the  e.g. 10
access point is connected.
LESER=Reader  Number of the reader. The access point  e.g. 5
is uniquely defined by the combination of
terminal number and reader. The access
point number is a logical number for the
"physical" address. Local readers at the
MBB terminal get an offset of 100.
Subbus readers with MBB terminals are
without offset.
ZAUF:DIGOUT=Channe Output (relay) for door opening contact  e.g. 1
l opener

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 22 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

ZZU:DIGOUT=Channel  Output (relay) for door closing contact  e.g. 2
closer
| ALARM:DIGOUT=      |     | Output (relay) for a connected alarm    |     | e.g. 3  |     |
| ------------------ | --- | --------------------------------------- | --- | ------- | --- |
| Channel alarm      |     | (e.g. warning lights or alarm system).  |     |         |     |
| ZV:DIGOUT=channel  |     | currently not processed                 |     | e.g. 0  |     |
attempt
ZST:DIGIN=Channel  Input for monitoring the door status  e.g. 1
| status        |     | (open/closed)                       |     |         |     |
| ------------- | --- | ----------------------------------- | --- | ------- | --- |
| ALRAM:AKTIV=  |     | Specifies whether the access point  |     | e.g. N  |     |
| Alarm active  |     | generates alarm messages (J/N).     |     |         |     |
ALRAM:TIMER=  Delay time in seconds for triggering the  e.g. 30
| Alarm "open"  |     | alarm.  |     |     |     |
| ------------- | --- | ------- | --- | --- | --- |
OPT:PRO=Trigger  'N' : Protocol messages are not written.   e.g. 2
| posting  |     | '0' : (Zero) Alarm messages are written  |     |     |     |
| -------- | --- | ---------------------------------------- | --- | --- | --- |
only.
'1' : Access attempts are recorded in
addition to alerts.
'2' : All accesses are recorded in addition
to the alerts and access attempts.
As of HYDRA 7.1 this setting is
overwritten by the logging configuration
specified for the access periods of the
opening hours.
| OPT:OFFEN=Message  |     | currently not processed  |     | e.g. 2  |     |
| ------------------ | --- | ------------------------ | --- | ------- | --- |
"open"
MAXZAUF=Duration  Maximum duration of "access point  e.g. 10
| "open"  |     | open"  |     |     |     |
| ------- | --- | ------ | --- | --- | --- |
ZAUF:DAUER=Duration  Duration of opener signal in seconds.  e.g. 4
of opener
ZZU:DAUER=Duration  Duration of the closer signal in seconds.  e.g. 4
of closer
| ZV:DAUER=Duration  |     | of  currently not processed  |     | e.g. 0  |     |
| ------------------ | --- | ---------------------------- | --- | ------- | --- |
the attempt
| WDHSPERR=     |           | Minimum time to open the access point  |     | e.g. 600  |     |
| ------------- | --------- | -------------------------------------- | --- | --------- | --- |
| anti  repeat  | function  | with the same badge (seconds).         |     |           |     |
(blocking)
ZYKL:STA=cyclic status  Time for sending the access point status  e.g. 300
to the server in cyclic intervals (seconds).

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 23 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| ZYKL:CFG=cyclic  |     | Time for reading the access              |     | e.g. 3600  |     |
| ---------------- | --- | ---------------------------------------- | --- | ---------- | --- |
| configuration    |     | configuration from the server in cyclic  |     |            |     |
intervals.
ZYKL:BERLESEN=  Time for reading authorizations from the  e.g. 3600
| cyclic authorizations  |     | server in cyclic intervals.  |     |     |     |
| ---------------------- | --- | ---------------------------- | --- | --- | --- |
CFGANZTG=Number of  Specifies for how many days in advance  e.g. 7
| days  |     | access configurations are to be loaded  |     |     |     |
| ----- | --- | --------------------------------------- | --- | --- | --- |
onto the terminal.
| CFGANZ=Number  |     | of  currently not processed  |     | e.g. 0  |     |
| -------------- | --- | ---------------------------- | --- | ------- | --- |
records
OPT:PZEAUTO=Trigger  Specifies whether an access includes a  e.g. N
| PZE  |     | PZE clocking (entry "J") or not (entry  |     |     |     |
| ---- | --- | --------------------------------------- | --- | --- | --- |
"N"). A clocking-in record is generated if
it is an entry and a clocking-out record is
generated if it is an exit. An automatic
status clocking record (P_AST) is
generated if it is a passage.
SAB:DIGIN=Channel  Channel number of the terminal to which  e.g. 0
| sabotage  |     | a sabotage signal is connected or 0 if not  |     |     |     |
| --------- | --- | ------------------------------------------- | --- | --- | --- |
available. This channel indicates when
the terminal or badge reader (subject to
the model) is opened without permission.
| DIGIN:1=channel in 1  |      | currently not processed  |     | e.g. 0  |     |
| --------------------- | ---- | ------------------------ | --- | ------- | --- |
| DIGIN:2=channel in 2  |      | currently not processed  |     | e.g. 0  |     |
| DIGIN:3=channel in 3  |      | currently not processed  |     | e.g. 0  |     |
| DIGIN:4=channel in 4  |      | currently not processed  |     | e.g. 0  |     |
| DIGOUT:1=channel      | out  | currently not processed  |     | e.g. 0  |     |
1
| DIGOUT:2=channel  | out  | currently not processed  |     | e.g. 0  |     |
| ----------------- | ---- | ------------------------ | --- | ------- | --- |
2
| DIGOUT:3=channel  | out  | currently not processed  |     | e.g. 0  |     |
| ----------------- | ---- | ------------------------ | --- | ------- | --- |
3
| DIGOUT:4=channel  | out  | currently not processed  |     | e.g. 0  |     |
| ----------------- | ---- | ------------------------ | --- | ------- | --- |
4
| CFG=configuration  |     | currently not processed  |     | e.g. "" (empty)  |     |
| ------------------ | --- | ------------------------ | --- | ---------------- | --- |

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 24 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.4    | Online requests                     |     |     |     |     |
| ------ | ----------------------------------- | --- | --- | --- | --- |
| 2.4.1  | Online check of PZE authorizations  |     |     |     |     |
Using the command DLG=SCMD;46, you can check whether or not a badge is allowed to clock at a
specific PZE terminal. The return string "RET=0“ indicates that the authorization is available. The badge
is not authorized if "RET=“ includes other values..
Structure of dialog data:
"DLG=SCMD;46|DAT=...|ZEI=...|USR=...|TNR=...|KNR=...“
Instead of the badge number "KNR=", it is also possible to transfer the personnel number "PNR=" along
with the company "FIR=".
| 2.4.1.1  | Display of messages  |     |     |     |     |
| -------- | -------------------- | --- | --- | --- | --- |
When PZE authorizations are checked, it is also checked whether a message is available for the person.
This message is written in the file "spool\hyinf<tnr>.dat" on the server, whereas <tnr> stands for the
terminal number. The file can be loaded after the online check and, if a message is included, it can be
displayed. The file has the following structure:
| KNR  |     | Badge number                             |     | e.g. 17  |     |
| ---- | --- | ---------------------------------------- | --- | -------- | --- |
| TYP  |     | Information about the generation of the  |     | e.g. PE  |     |
message.
DATB, DATE  Period during which the message is to be  06/15/2004, 06/30/2004
displayed.
| WTG  |     | Weekday on which the message is to be  |     | e.g. 7  |     |
| ---- | --- | -------------------------------------- | --- | ------- | --- |
|      |     | displayed:                             |     |         |     |
0 = Sunday
...
6 = Saturday
7 = all days of the week
| OPT:KOM=J/N  |     | Specification whether or not the  |     | e.g. J  |     |
| ------------ | --- | --------------------------------- | --- | ------- | --- |
message is to be displayed for a clock-in
record.
| OPT:GEH=J/N  |     | Specification whether or not the  |     | e.g. J  |     |
| ------------ | --- | --------------------------------- | --- | ------- | --- |
message is to be displayed for a clock-
out record.
| OPT:PAU=J/N  |     | Specification whether or not the  |     | e.g. J  |     |
| ------------ | --- | --------------------------------- | --- | ------- | --- |
message is to be displayed for clocking a

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 25 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

break.
| OPT:FGR=J/N  |     | Specification whether or not the  |     | e.g. J  |     |
| ------------ | --- | --------------------------------- | --- | ------- | --- |
message is to be displayed for an
absence reason posting.
| OPT:INFO=J/N  |     | Specification whether or not the  |     | e.g. J  |     |
| ------------- | --- | --------------------------------- | --- | ------- | --- |
message is to be displayed when
information on the account balance is
shown.
| ANZ  |     | Number specifying how often the  |     | e.g. 1  |     |
| ---- | --- | -------------------------------- | --- | ------- | --- |
message is to be displayed. If this field is
populated, the message display with the
next clocking must be posted using the
field PARAM02.
| VERWEIS  |     | Unique data record number  |     | e.g. 10537  |     |
| -------- | --- | -------------------------- | --- | ----------- | --- |
INFO:1, ..., INFO:10  Up to 10 lines of the message to be  e.g.  Please  contact  the  payroll
|     |     | displayed  |     | office  |     |
| --- | --- | ---------- | --- | ------- | --- |

| 2.4.2  | Online check of ZKS authorizations  |     |     |     |     |
| ------ | ----------------------------------- | --- | --- | --- | --- |
Using the command DLG=SCMD;49, you can check whether or not a badge is authorized for a specific
access point in ZKS. The return string "RET=0“ indicates that the authorization is available. The badge is
not authorized if "RET=“ includes other values..
Structure of dialog data:
"DLG=SCMD;49|DAT=...|ZEI=...|USR=...|ZNR=...|KNR=...“
| 2.4.3  | Online request of a person's account balances  |     |     |     |     |
| ------ | ---------------------------------------------- | --- | --- | --- | --- |
Using the command DLG=SCMD;31 a person's account balances can be requested. The return string
includes the designations and values of up to 8 accounts that are to be displayed.
Structure of dialog data:
"DLG=SCMD;31|DAT=...|ZEI=...|USR=...|TNR=...|KNR=...“
Structure of the return string:
"RET=0|KT=|LT=|BEZL:1=Gleitzeit|WERT:1=0:00|BEZL:2=Urlaubskonto|WERT:2=38.00|“

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 26 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.5    | Pre-processed data from third-party systems  |     |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- | --- |
| 2.5.1  | Import of day-related (clocking) data        |     |     |     |     |
This section describes how data is transferred from external systems providing preprocessed data for
time and attendance. This data can be processed further by HYDRA-PZE (Time & Attendance) or they
are directly available for modules affecting several products, e.g. ADE/PZE comparison or HYDRA
incentive wages.
Preprocessed clocking records and calculated workday results may be imported in HYDRA. The workday
results, e.g. include the determined net attendance time per person and day. In addition to the workday
result, one or more clocking records may be available.
Three dialogs are relevant for this purpose:
|   Include day results:  |     |     |   TGERG.MODIFY  |     |     |
| ----------------------- | --- | --- | --------------- | --- | --- |
  Delete all clocking records of a person of one day:  STMP.DELETE
|   Load clocking:  |     |     |   STMP.LOAD  |     |     |
| ----------------- | --- | --- | ------------ | --- | --- |
The following dialogs are required in the interface file to include a person's data of an entire day:
1)  Include the person's day result (header record)
2)  Optional: Delete all clocking records of a person at one day
This avoids double clocking records if data is transferred several times over time.
3)  Optional: Insert all individual clocking records of the person at one day (subsequent records)

Only the work day result (header record) is relevant if the "production time statistics" function is required
in the first place. The clocking records may optionally be skipped, as they only provide more detailed
information.
Below please find a description of the individual dialogs and a sample file.
Example of a dialog (one line of an interface file):
  DLG=STMP.DELETE|STMP.FIR=012|STMP.PNR=002449|STMP.ABREDAT=03/01/2001|

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 27 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | ----------------------------- | --- |

| Explanation:  |     |     |     |     |
| ------------- | --- | --- | --- | --- |
STMP.DELETE is the dialog identification.  Vertical lines ("|", ASCII 124) are used to separate the
individual  parameters that follow (STMP.FIR, STMP.PNR, ...).  Select a field width for  the different
parameters that is wide enough for the presentation. However a fixed file structure can also be realized
by adding leading zeros (for numbers) and trailing spaces. The sequence of the parameters is irrelevant.
Some parameters must be specified in a dialog and some parameters are optional. You can specify the
optional parameters, if required, or you can leave these parameters out. HYDRA than populates these
parameters using default values.

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     | Page 28 of 51  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

Conventions used to present the different data types
| Data type  | Format                         |     | Examples           |     |     |
| ---------- | ------------------------------ | --- | ------------------ | --- | --- |
| N<x>       | Digits, maximum of <x> places  |     | |PNR.PNR=2449| or  |     |     |
|PNR.PNR=002449|
N<x>.<y>  Decimal number with a maximum  |PNR.PSTDSATZ=30.5| or
|     | of <x> predecimal places and <y>  |     | |PNR.PSTDSATZ=00030.5|  |     |     |
| --- | --------------------------------- | --- | ----------------------- | --- | --- |
decimal places. A dot is the
decimal separator.
| C<x>                | Character string with a maximum  |     | |PNR.NAME=Huber| or    |     |     |
| ------------------- | -------------------------------- | --- | ---------------------- | --- | --- |
| Texts (character)   | length of <x>                    |     | |PNR.NAME=Huber  |     |     |     |
| Date                | MM/DD/YYYY (American format:     |     | |STMP.DAT=12/31/2001|  |     |     |
month, day, year. Slashes are
used as separator.)
| Times or   | Seconds since midnight or  |     | |STMP.ZEI=52200| or  |     |     |
| ---------- | -------------------------- | --- | -------------------- | --- | --- |
| durations  | HH:MM or                   |     | |STMP.ZEI=14:30| or  |     |     |
HH:MM:SS or
|STMP.ZEI=14:30:00| or
|     | HH,DDD or  |     | |STMP.ZEI=014,5| or  |     |     |
| --- | ---------- | --- | -------------------- | --- | --- |
HH.DDD
|STMP.ZEI=14.500|
H  hours (as many places
  as required)
M  Minutes (in groups of 60)
S  Seconds
D  Industrial or decimal
  minutes (in groups of 100)

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 29 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.5.1.1  | Importing work day result  |     |     |     |     |
| -------- | -------------------------- | --- | --- | --- | --- |
The dialog for importing the work day results includes the daily times per person and day (header record).
Provided that the work day result is not yet available, it will be inserted. In case this dialog already
includes a work-day result, it will be updated to avoid multiple entries. HYDRA automatically deletes old
work-day results from the data management after a configurable period of time.
Dialog: TGERG.MODIFY
| Parameter  | Type  Mandatory  | Contents      | Description                    |     |     |
| ---------- | ---------------- | ------------- | ------------------------------ | --- | --- |
| TGERG.FIR  | C4               |   Company     | Company of the person          |     |     |
| TGERG.PNR  | N8               | X  Personnel  | The person's personnel number  |     |     |
number
| TGERG.ABREDAT  | Date  | X  Settlement date  |     |     |     |
| -------------- | ----- | ------------------- | --- | --- | --- |
TGERG.IZ  Duration  X  Actual  working  The person's (net) actual working time on
time  the settlement day (breaks are already
deducted)
TGERG.SZ  Duration    Target time  Optional: The person's target time on the
settlement day
TGERG.FZ  Duration    Absence  Optional: The person's absence time on
the settlement day
TGERG.SCHZART  C1    Shift time type  Optional: The person's shift type on the
settlement day (F/S/N/…)
TGERG.DATB  Date  *1)  Start of work  Date of the person's evaluated start of
date  working time
TGERG.ZEIB  Time  *1)  Start of work  Time of the person's evaluated start of
time  working time
TGERG.DATE  Date  *1)  End of work  Date of the person's evaluated end of
date  working time
TGERG.ZEIE  Time  *1)  End of work  Time of the person's evaluated end of
time  working time
*1) If the PZE/ADE comparison function is used, these fields must be filled. Only then, the application
Labor time calculation can be used to its full extent.
| Example:  |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |
DLG=TGERG.MODIFY|TGERG.PNR=999998|TGERG.ABREDAT=12/27/2010|
TGERG.DATB=12/27/2010|TGERG.ZEIB=21600|TGERG.DATE=12/27/2010|TGERG.ZEIE=52200|
TGERG.SZ=28800|TGERG.IZ=30600|TGERG=FZ=0|TGERG.SCHZART=F|

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 30 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.5.1.2  | Deleting all clocking records of a day  |     |     |     |     |
| -------- | --------------------------------------- | --- | --- | --- | --- |
This dialog deletes all clocking records of the person on the settlement day. This dialog has been
designed to clean the data set before new clocking records are inserted. Old clocking records are deleted
automatically in HYDRA after a configurable period of time (at the moment 200 days by default).
Dialog: STMP.DELETE
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| STMP.FIR  | C4  X  | Company  |     | Company of the person  |     |
| --------- | ------ | -------- | --- | ---------------------- | --- |
STMP.PNR  N8  X  Personnel number  The person's personnel number
| STMP.ABREDAT  | Date  X  | Settlement date  |     |     |     |
| ------------- | -------- | ---------------- | --- | --- | --- |

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 31 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.5.1.3  | Loading a clocking record  |     |     |     |     |
| -------- | -------------------------- | --- | --- | --- | --- |
This dialog loads a clocking record in HYDRA. Old clocking records are deleted automatically in HYDRA
after a configurable period of time (at the moment 200 days by default).
Dialog: STMP.LOAD
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| STMP.FIR  | C4  X  | Company  |     | Company of the person  |     |
| --------- | ------ | -------- | --- | ---------------------- | --- |
STMP.PNR  N8  X  Personnel number  The person's personnel number
| STMP.ABREDAT   | Date  *1)  | Settlement date  |     |                      |     |
| -------------- | ---------- | ---------------- | --- | -------------------- | --- |
| STMP.ABREDATB  | Date  *1)  | Start date       |     | Rounded start date   |     |
May differ from the settlement
date with night shifts.
| STMP.ABREZEIB  | Time  *1)  | Start time  |     | Rounded start time  |     |
| -------------- | ---------- | ----------- | --- | ------------------- | --- |
| STMP.ABREDATE  | Date  *1)  | End date    |     | Rounded end date    |     |
May differ from the settlement
date with night shifts.
| STMP.ABREZEIE  | Time  *1)  | End time  |     | Rounded end time  |     |
| -------------- | ---------- | --------- | --- | ----------------- | --- |
STMP.DATB  Date  *2)  Start date (not rounded)  optional: start date that is not
rounded
May deviate from the settlement
date with night shifts.
STMP.ZEIB  Time  *2)  Start time (not rounded)  optional: start time that is not
rounded
STMP.DATE  Date  *2)  End date (not rounded)  optional: end date that is not
rounded
May deviate from the settlement
date with night shifts.
STMP.ZEIE  Time  *2)  End time (not rounded)  optional:  end  time  that  is  not
rounded
STMP.IZ  Duratio   Actual time  optional: The person's actual
working time in the time interval
n
(clocking duration)
STMP.SCHZART  C1  *1)  Shift type  Optional: The person's shift type
on the settlement day (e.g. E, L
or N)

*1) Rounded time stamps are only required if the transferred clocking data are not to be evaluated by the
HYDRA work-day evaluation or the work-day evaluation function is not supposed to round independently.
If you want to import clockings as raw data, only the time stamps that are not rounded and marked via *2)
may be filled. The fields marked via *1) must be skipped or left empty.

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 32 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

*2) If the clocking records are imported as raw data to be further processed by the work-day evaluation,
use time stamps not rounded to fill the fields. The fields marked via *1) must be skipped or left empty.
| 2.5.1.4  | Examples  |     |     |     |     |
| -------- | --------- | --- | --- | --- | --- |
In the example below, the data of two persons is transferred for a day:
DLG=TGERG.MODIFY|TGERG.FIR=012|TGERG.PNR=002449|TGERG.ABREDAT=01/29/2001|TGERG.IZ=7:4
5|TGERG.SZ=7:30|TGERG.FZ=0:00|TGERG.SCHZART=F|
DLG=STMP.DELETE|STMP.FIR=012|STMP.PNR=002449|STMP.ABREDAT=03/01/2001|
DLG=STMP.LOAD|STMP.FIR=012|STMP.PNR=002449|STMP.ABREDAT=01/29/2001|STMP.ABREDATB=01/2
9/2001|STMP.ABREZEIB=5:53|STMP.ABREDATE=01/29/2001|STMP.ABREZEIE=9:57|STMP.SCHZART=F|
DLG=STMP.LOAD|STMP.FIR=012|STMP.PNR=002449|STMP.ABREDAT=01/29/2001|STMP.ABREDATB=01/2
9/2001|STMP.ABREZEIB=10:13|STMP.ABREDATE=01/29/2001|STMP.ABREZEIE=14:11|STMP.SCHZART=
F|
DLG=TGERG.MODIFY|TGERG.FIR=012|TGERG.PNR=002450|TGERG.ABREDAT=01/29/2001|TGERG.IZ=7:3
0|TGERG.SZ=7:30|TGERG.FZ=0:00|TGERG.SCHZART=F|
DLG=STMP.DELETE|STMP.FIR=012|STMP.PNR=002450|STMP.ABREDAT=03/01/2001|
DLG=STMP.LOAD|STMP.FIR=012|STMP.PNR=002450|STMP.ABREDAT=01/29/2001|STMP.ABREDATB=01/2
9/2001|STMP.ABREZEIB=5:58|STMP.ABREDATE=01/29/2001|STMP.ABREZEIE=10:01|STMP.SCHZART=F
|
DLG=STMP.LOAD|STMP.FIR=012|STMP.PNR=002450|STMP.ABREDAT=01/29/2001|STMP.ABREDATB=01/2
9/2001|STMP.ABREZEIB=10:16|STMP.ABREDATE=01/29/2001|STMP.ABREZEIE=14:01|STMP.SCHZART=
F|
| 2.6      | Transferring configurations from third-party systems  |     |     |     |     |
| -------- | ----------------------------------------------------- | --- | --- | --- | --- |
| 2.6.1    | Transfer of the planned working time                  |     |     |     |     |
| 2.6.1.1  | Personal working time                                 |     |     |     |     |
As of HYDRA PZE 7.2 it is possible to transfer the planned working time per person and day without
having to define day types and models. These working time plans are saved as "personal working time" in
HYDRA.
The following key fields need to be assigned to values for the transfer:
Dialogs: GLZTMOD.INSERT, GLZTMOD.UPDATE, GLZTMOD.MODIFY
| Parameter  |     | Type  Mand | Contents  |     |     |
| ---------- | --- | ---------- | --------- | --- | --- |
Description
atory
| GLZTMOD.PNR  |     | N8  X  | Personnel number  |     |     |
| ------------ | --- | ------ | ----------------- | --- | --- |
GLZTMOD.DATB  Date  X  Beginning of validity  Start date for the "personal

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 33 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

working time".
GLZTMOD.DATE  Date  X  Validity end  The end date for the "personal
working time" mostly matches
the start date.
| GLZTMOD.ART  |     | C1  X  | Constantly 'P'  | P=Personal working time  |     |
| ------------ | --- | ------ | --------------- | ------------------------ | --- |

The following data fields can be transferred for each person and day:
| Parameter  |     | Type  Mand | Contents  |     |     |
| ---------- | --- | ---------- | --------- | --- | --- |
Description
atory
| GLZTMOD.BEZK  |     | C6       | Short name            |     |     |
| ------------- | --- | -------- | --------------------- | --- | --- |
| GLZTMOD.BEZL  |     | C20      | Detailed designation  |     |     |
| GLZTMOD.VAB   |     | C  15    | Responsibility area   |     |     |
GLZTMOD.SCHZART  C1    Shift type  Only transferred for shift
workers.
| GLZTMOD.SZ  |     | Time    | Target time  | Target working time  |     |
| ----------- | --- | ------- | ------------ | -------------------- | --- |
GLZTMOD.AZMAX  Time    Max. working time per  A message is triggered after the
|     |     |     | day  | maximum working time has  |     |
| --- | --- | --- | ---- | ------------------------- | --- |
been exceeded.
GLZTMOD.RAHMB  Time    Skeleton time from  Start of the skeleton time
GLZTMOD.RAHME  Time    Skeleton time until  End of the skeleton time
GLZTMOD.NORMB  Time    Normal time from  Beginning of the normal
working time
GLZTMOD.NORME  Time    Normal time until  End of the normal working time
GLZTMOD.KERNB  Time    Core time from  Start of the core working time
GLZTMOD.KERNE  Time    Core time until  End of the core working time.
The core time is interrupted by
the break frame.
GLZTMOD.  Time    Frame "from" for the  Beginning of the break frame
| PAURAHMB:<1..3>  |     |     | breaks 1 to 3  | for the breaks 1 to 3  |     |
| ---------------- | --- | --- | -------------- | ---------------------- | --- |
GLZTMOD.  Time    Frame "until" for the  End of the break frame for the
| PAURAHME:<1..3>  |     |         | breaks 1 to 3         | breaks 1 to 3  |     |
| ---------------- | --- | ------- | --------------------- | -------------- | --- |
| GLZTMOD.         |     | Time    | Minimum duration for  |                |     |
| PAUMIN:<1..3>    |     |         | the breaks 1 to 3     |                |     |
GLZTMOD.  Time    "Normal break from" for  Beginning of the normal breaks
PAUNORMB:<1..3>  the breaks 1 to 3  1 to 3. The normal break is
allocated if no break is clocked.

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 34 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |     |
| --- | --- | --- | --- | ----------------------------- | --- | --- |

GLZTMOD.  Time    "Normal break until" for  End of normal break 1 to 3.
| PAUNORME:<1..3>  |     |     | break 1 to 3  |     |     |     |
| ---------------- | --- | --- | ------------- | --- | --- | --- |
GLZTMOD.  N4    Payment day type  Payment day type for the shift
| ENTLTMOD:SCHZART  |     |     |     | specified in the parameter  |     |     |
| ----------------- | --- | --- | --- | --------------------------- | --- | --- |
SCHZART
GLZTMOD.PAUFREI  Time    Free break  Free break that is deducted
irrespective of the spent
working time.
GLZTMOD.OPT:SZB  C1    Compensation of target  A=Beginning of working time
|     |     |     | time starting  | R=Beginning of skeleton time  |     |     |
| --- | --- | --- | -------------- | ----------------------------- | --- | --- |
|     |     |     |                | K=Beginning of core time      |     |     |
N=Beginning of normal time
| BEARB  |     | C10    | Modified by  |     |     |     |
| ------ | --- | ------ | ------------ | --- | --- | --- |

The data type "time" can be assigned to seconds since the beginning of the day or in the format HH:MM
(with normal minutes) (example 10:30 a.m. = 37800 = 10:30).
Example for transferring an early shift on 17 December 2007 from 6:00 a.m. until 2:00 p.m.:
|   DLG=GLZTMOD.MODIFY|GLZTMOD.PNR=4711|  |                                                   |     |     |     |     |     |
| --------------------------------------- | ------------------------------------------------- | --- | --- | --- | --- | --- |
|                                         | GLZTMOD.DATB=12/17/2007|GLZTMOD.DATE=12/17/2007|  |     |     |     |     |     |
|                                         | GLZTMOD.SCHZART=F|GLZTMOD.SZ=28800|               |     |     |     |     |     |
|                                         | GLZTMOD.RAHMB=21600|GLZTMOD.RAHME=50400|          |     |     |     |     |     |
|                                         | GLZTMOD.NORMB=21600|GLZTMOD.NORME=50400|          |     |     |     |     |     |
|                                         | GLZTMOD.KERNB=21600|GLZTMOD.KERNE=50400|          |     |     |     |     |     |
| 2.6.1.2                                 | Day types and year models                         |     |     |     |     |     |
In HYDRA the working time is defined in the form of day types and year models:
  -  There is a separate working time day type for each different daily routine.
  -  The year models define which working time day type and which shift type is to be assigned at which
day of the year.
  -  The defined year models are saved with the person in the HR master (also see the document
entitled HYD-LUG).
| 2.6.1.3  | Transfer of working time day types  |     |     |     |     |     |
| -------- | ----------------------------------- | --- | --- | --- | --- | --- |
The following key fields need to be assigned when working time day types are transferred:
Dialogs: GLZTMOD.INSERT, GLZTMOD.UPDATE, GLZTMOD.MODIFY

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 35 of 51  |     |
| ---------------- | --- | --- | ------------------- | --- | -------------- | --- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| Parameter  |     | Type  Mand | Contents  |     |     |
| ---------- | --- | ---------- | --------- | --- | --- |
Description
atory
| GLZTMOD.GLZTMOD  |     | N4  X  | Number of the flextime  |     |     |
| ---------------- | --- | ------ | ----------------------- | --- | --- |
day type
GLZTMOD.DATB  Date  X  Beginning of validity  A working time day type is valid
until the next validity period
starts for the next day type with
the same number.
| GLZTMOD.ART  |     | C1  X  | Type of the model  | G=Flextime day type  |     |
| ------------ | --- | ------ | ------------------ | -------------------- | --- |
|              |     |        |                    | S=Fixed shift model  |     |
F=Flexible shift model

The data fields for transferring a working time day type are the same as for the personal working times as
described in section "2.6.1.1 Personal working time".
With shift day types, one data record is transferred per shift.
Example:
DLG=GLZTMOD.MODIFY|GLZTMOD.GLZTMOD=7000|GLZTMOD.BEZK=KBez|GLZTMOD.BEZL=Langbez|GLZTMOD.VAB=|GLZ
TMOD.DATB=01/01/1900|GLZTMOD.ART=G|GLZTMOD.SCHZART=|GLZTMOD.ENTLTMOD:SCHZART=|GLZTMOD.PAUFREI=0
|GLZTMOD.OPT:SZB=A|GLZTMOD.SZ=28800|GLZTMOD.AZMAX=36000|GLZTMOD.RAHMB=25200|GLZTMOD.RAHME=68400|
GLZTMOD.PAURAHMB:1=28800|GLZTMOD.PAURAHME:1=36000|GLZTMOD.PAURAHMB:2=39600|GLZTMOD.PAURAHME:2=
50400|GLZTMOD.PAURAHMB:3=68400|GLZTMOD.PAURAHME:3=70200|GLZTMOD.KERNB=32400|GLZTMOD.KERNE=57600|
GLZTMOD.PAUMIN:1=900|GLZTMOD.PAUMIN:2=1800|GLZTMOD.PAUMIN:3=1800|GLZTMOD.NORMB=28800|GLZTMOD.NOR
ME=59400|GLZTMOD.PAUNORMB:1=32400|GLZTMOD.PAUNORME:1=33300|GLZTMOD.PAUNORMB:2=43200|GLZTMOD.PA
UNORME:2=45000|GLZTMOD.PAUNORMB:3=68400|GLZTMOD.PAUNORME:3=70200|BEARB=12345
| 2.6.1.4  | Transfer of working time year models  |     |     |     |     |
| -------- | ------------------------------------- | --- | --- | --- | --- |
This dialog has been designed to edit working time year models:
Dialog: GLZJMOD.MODIFY
| Parameter  |     | Type  Mand | Contents  | Description  |     |
| ---------- | --- | ---------- | --------- | ------------ | --- |
atory
| GLZJMOD.GLZJMOD  |     | N4  X  | Number of the flextime  |     |     |
| ---------------- | --- | ------ | ----------------------- | --- | --- |
year model
| GLZJMOD.BEZK  |     | C6         | Short name            |     |     |
| ------------- | --- | ---------- | --------------------- | --- | --- |
| GLZJMOD.BEZL  |     | C20        | Detailed designation  |     |     |
| GLZJMOD.JAHR  |     | N4  *1)    | Year                  |     |     |
| GLZJMOD.DATB  |     | Date  *1)  | Start date of the     |     |     |
assignment

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 36 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| GLZJMOD.DATE  |     | Date  *1)  | End date of the  |     |     |
| ------------- | --- | ---------- | ---------------- | --- | --- |
assignment
| GLZJMOD.VAB  |     | C  15    | Responsibility area  |                                  |     |
| ------------ | --- | -------- | -------------------- | -------------------------------- | --- |
|              |     | Cx       | Day types to be      | The day types to be entered are  |     |
GLZJMOD.MODELL
|     |     |     | assigned  | included in this parameter and  |     |
| --- | --- | --- | --------- | ------------------------------- | --- |
separated by comma. The day
type 0 means that no day type
is to be defined on this day.
The models are entered in the
period specified by the
parameters JAHR; DATB and
DATE. The parameter MODELL
specifies how many day types
are assigned. If the parameter
MODELL includes more day
types than can be entered in
the date range, they will be
ignored.
| BEARB  |     | C10    | Modified by  |     |     |
| ------ | --- | ------ | ------------ | --- | --- |
*1) The following combinations are allowed:
| 1) Year only                 |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- | --- |
| 2) Start and end date        |     |     |     |     |     |
| 3) Year, start and end date  |     |     |     |     |     |
In any case, the dates of these three parameters must all be in the same year!
Example: DLG=GLZJMOD.MODIFY|GLZJMOD.GLZJMOD=7001|GLZJMOD.BEZL=Langbez|
    GLZJMOD.BEZK=KBez|GLZJMOD.DATB=01/14/2002|GLZJMOD.DATE=01/18/2002|
    GLZJMOD.MODELL=100,100,100,100,100| GLZJMOD.VAB=|BEARB=12345|
| 2.6.1.5  | Transfer of shift rhythm year models  |     |     |     |     |
| -------- | ------------------------------------- | --- | --- | --- | --- |
This dialog has been designed to edit shift rhythm year models:
Dialog: SCHZARTJMOD.MODIFY
| Parameter  |     | Type  Mand | Contents  | Description  |     |
| ---------- | --- | ---------- | --------- | ------------ | --- |
atory
| SCHZARTJMOD.  |     | N4  X  | Number of the shift  |     |     |
| ------------- | --- | ------ | -------------------- | --- | --- |
| SCHZARTJMOD   |     |        | rhythm year model    |     |     |
| SCHZARTJMOD.  |     | C6     | Short name           |     |     |
BEZK

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 37 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| SCHZARTJMOD.BEZL  |     | C20      | Detailed designation  |     |     |
| ----------------- | --- | -------- | --------------------- | --- | --- |
| SCHZARTJMOD.      |     | N4  *1)  | Year                  |     |     |
JAHR
| SCHZARTJMOD.     |     | Date  *1)  | Start date of the    |                                |     |
| ---------------- | --- | ---------- | -------------------- | ------------------------------ | --- |
| DATB             |     |            | assignment           |                                |     |
| SCHZARTJMOD.     |     | Date  *1)  | End date of the      |                                |     |
| DATE             |     |            | assignment           |                                |     |
| SCHZARTJMOD.VAB  |     | C  15      | Responsibility area  |                                |     |
|                  |     | Cx         | Day types to be      | The shift types to be entered  |     |
SCHZARTJMOD.
|     |     |     | assigned  | are included in this parameter  |     |
| --- | --- | --- | --------- | ------------------------------- | --- |
MODELL
and separated by comma. The
shift type "" (blank) means that
no shift type is to be defined for
this day.
The shift types are entered in
the period specified by the
parameters JAHR; DATB and
DATE. The parameter MODELL
specifies how many shift types
are assigned. If the parameter
MODELL includes more shift
types than can be entered in
the date range, they will be
ignored.
| BEARB  |     | C10    | Modified by  |     |     |
| ------ | --- | ------ | ------------ | --- | --- |
*1) The following combinations are allowed:
| 1) Year only                 |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- | --- |
| 2) Start and end date        |     |     |     |     |     |
| 3) Year, start and end date  |     |     |     |     |     |
In any case, the dates of these three parameters must all be in the same year!

| SCS-HRM_81.docx  |     |     | Version: 1.0.23049  |     | Page 38 of 51  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

Example: DLG=SCHZARTJMOD.MODIFY|SCHZARTJMOD.SCHZARTJMOD=7001|
    SCHZARTJMOD.BEZL=Langbez|SCHZARTJMOD.VAB=|SCHZARTJMOD.BEZK=KBez|
    SCHZARTJMOD.DATB=01/14/2002|SCHZARTJMOD.DATE=01/18/2002|
|          | SCHZARTJMOD.MODELL=F,F,F,S,S|BEARB=12345|  |     |     |     |     |
| -------- | ------------------------------------------ | --- | --- | --- | --- |
| 2.6.2    | Absence planning                           |     |     |     |     |
| 2.6.2.1  | Overview                                   |     |     |     |     |
When absence plannings are transferred from third-party systems, all absences are generally updated for
each person. The following processing applies:
1)  All absences of a person are deleted (FZ.DELETE using MOD=G or FZ.DELETE_ALL)
2)  All absences of a person are transferred a new time (FZ.INSERT for each absence)
If you have stored the user who created the absences, you can configure that only this user can delete
the absence. It is then possible to manually manage the absences in the system in addition to the
absences managed via interface.
| 2.6.2.2  | Creating absence planning  |     |     |     |     |
| -------- | -------------------------- | --- | --- | --- | --- |
You can use this dialog to insert absences of persons for the Time Management or the Personnel
planning:
Dialog: FZ.INSERT
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
FZ.PNR  N8  *1)  Personnel number  The person's personnel number
(as an alternative to cost center
and area)
FZ.KST  C  8  *1)  Cost center  Cost center (as an alternative to
person and area)
| FZ.BER  | C  8  *1)  | Area  |     | Area (as an alternative to person  |     |
| ------- | ---------- | ----- | --- | ---------------------------------- | --- |
and cost center).
| FZ.FIR  | C4    | Company  |     | Company of the person, cost  |     |
| ------- | ----- | -------- | --- | ---------------------------- | --- |
center or area. If no company is
indicated, the absence applies
for all companies.
| FZ.DATB  | Date  X  | Start date  |     | Start date of the absence  |     |
| -------- | -------- | ----------- | --- | -------------------------- | --- |
| FZ.DATE  | Date  X  | End date    |     | End date of the absence    |     |

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 39 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

HYDRA Personnel Data Manager
FZ.WTG N1 Weekday Weekday for which absence
planning applies:
0 ... 6 = Sunday ... Saturday
7 = every day (by default)
FZ.ENTLTMOD N4 Absence payment Number of the payment day type
with which the absence is to be
set off. This key determines, for
example, the color indicating
absences in the graphic absence
planning. This key determines,
for example, the color indicating
absences in the graphic absence
planning.
FZ.BEZK C 3 Comment The comment is entered in the
absence overview. If this field
remains empty, the first three
letters of the short name of the
absence payment will be used.
FZ.BEZL C20 Comment Comment defined for the
absence
FZ.VERB C1 Processing 'F': Set off absence from absence
planning.
'D': Set off average working time
from the HR master.
'S': Set off planned target working
time.
'N': Set off planned normal time.
FZ.DAUER Duratio Duration of the absence If processing "F" is set, this field
n or has to include the duration of the
N6.x absence.
FZ.TLWABW N3 Partially absent For part-day absences, this field
specifies the percentage used to
fill the time.
FZ.CERTIFY C1 Subject to approval Defines whether or not the
(J/N) generated absence is subject to
approval.
FZ.LFZ:DATB Date Start date of the first If continued pay is to be
pre-existing condition monitored, this field includes the
SCS-HRM_81.docx Version: 1.0.23049 Page 40 of 51

HYDRA Personnel Data Manager
start date of the first pre-existing
condition.
FZ.LFZ:DAUER N4 Duration of pre-existing If continued pay is to be
conditions monitored, this field states the
duration of the pre-existing
condition in days.
FZ.LFZ:VERWEIS N8 Reference to the last If continued pay is to be
pre-existing condition monitored, this field includes the
reference to the last pre-existing
condition.
BEARB C10 Optional: Modified by If you transfer the user who
modified the entry, you can later
on delete the absences of this
user.
*1) Only one of the fields FZ.PNR, FZ.KST and FZ.BER must and may be filled.
Examples:
DLG=FZ.INSERT|FZ.PNR=1234|FZ.DATB=12/27/2019|FZ.DATE=12/30/2019|FZ.ENTLMOD=400|
DLG=FZ.INSERT|FZ.PNR=1456|FZ.DATB=08/22/2019|FZ.DATE=09/02/2019|FZ.ENTLTMOD=400|BEA
RB=MASTERSYS|
2.6.2.3 Deleting an absence planning
Different dialogs are available to delete absences. The dialog used depends on the system used. Does
the system use the personnel time management including labor time calculation or does the system only
use the absences for display and planning purposes?
 If you use the personnel time management including labor time calculation, use the dialog
FZ.DELETE with MOD=G
 If the absences are only displayed or used for the personnel planning, then use the dialog
FZ.DELETALL.
The differences between the two dialogs are described below.
2.6.2.4 Deleting absences if you use the labor time calculation
You can use the dialog FZ.DELETE with MOD=G to delete absences of a person. All absence times of
the person are deleted. Optionally, you can filter by the user (modified by) or the date range to delete the
absences.
SCS-HRM_81.docx Version: 1.0.23049 Page 41 of 51

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

If you delete specific absences via the GUI, the data records are internally marked as deleted, but on
database level you can track this action in a history in the system. But if you delete all absences of a
person, the data records are actually deleted physically because the deletion and the new transfer of all
absences require greater data volumes and a useful history is not possible.
If you use the dialog FZ.DELETE with MOD=G, the following actions are performed in addition to the
actual delete absence action.
-  If labor time calculations have already been performed for the specified person, the results for the
absences included in the period of time specified must be recalculated.
-  If the deleted absences include requested absences, the absence requests are rejected.
If you do not require these additional actions, use the dialog FZ.DELETE_ALL. This way, the server is not
loaded unnecessarily.
Dialog: FZ.DELETE
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| MOD  | C1  | Mode "G" obligatory  |     | The mode G specifies that all  |     |
| ---- | --- | -------------------- | --- | ------------------------------ | --- |
X
|     |     | for "global":  |     | absence times of a person are  |     |
| --- | --- | -------------- | --- | ------------------------------ | --- |
|     |     | MOD=G          |     | deleted. Other modes are not   |     |
planned.
FZ.PNR  N8  X  Personnel number  The person's personnel number
FZ.BEARB:DEL  C10    The  absences  of  the  Optional filter. If the filter is set,
|     |     | user  (modified  | by)  are  | then only the absences are    |     |
| --- | --- | ---------------- | --------- | ----------------------------- | --- |
|     |     | deleted.         |           | deleted that were created or  |     |
changed by this user.
FZ.DATB  Date    Start date  Optional filter for a date range.
To use the filter, enter start and
end date. If you use this filter,
only the absences are deleted
that are fully included in the
specified period of time.
| FZ.DATE  | Date    | End date  |     | See FZ.DATB.  |     |
| -------- | ------- | --------- | --- | ------------- | --- |

Examples:
DLG=FZ.DELETE|MOD=G|FZ.PNR=1456|
DLG=FZ.DELETE|MOD=G|FZ.PNR=1456|FZ.DATB=12/04/2019|FZ.DATE=12/20/2019|

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 42 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

HYDRA Personnel Data Manager
DLG=FZ.DELETE|MOD=G|FZ.PNR=1456|FZ.BEARB:DEL=MASTERSYS|
2.6.2.5 Deleting absences if you do not use the labor time calculation
You can use the dialog FZ.DELETE_ALL to delete absences of a person. All absence times of the person
are deleted. Optionally, you can filter by the user (modified by) or the date range to delete the absences.
If you delete specific absences via the GUI, the data records are internally marked as deleted, but on
database level you can track this action in a history in the system. But if you delete all absences of a
person, the data records are actually deleted physically because the deletion and the new transfer of all
absences require greater data volumes and a useful history is not possible.
Contrary to the dialog FZ.DELETE with MOD=G, the dialog FZ.DELETE_ALL does not perform further
actions that are integrated in the personnel time management. For this reason, FZ.DELETE_ALL is
quicker and unnecessary data changes are avoided.
Dialog: FZ.DELETE_ALL
Parameter Type Mand Contents Description
atory
FZ.PNR N8 X Personnel number The person's personnel number
FZ.BEARB:DEL C10 The absences of the Optional filter. If the filter is set,
user (modified by) are then only the absences are
deleted. deleted that were created or
changed by this user.
FZ.DATB Date Start date Optional filter for a date range.
To use the filter, enter start and
end date. If you use this filter,
only the absences are deleted
that are fully included in the
specified period of time.
FZ.DATE Date End date See FZ.DATB.
Examples:
DLG=FZ.DELETE_ALL|FZ.PNR=1456|
DLG=FZ.DELETE_ALL|FZ.PNR=1456|FZ.BEARB:DEL=MASTERSYS|
DLG=FZ.DELETE_ALL|FZ.PNR=1456|FZ.DATB=12/04/2019|FZ.DATE=12/20/2019|
SCS-HRM_81.docx Version: 1.0.23049 Page 43 of 51

|     |     |     |     | HYDRA Personnel Data Manager  |     |     |
| --- | --- | --- | --- | ----------------------------- | --- | --- |

| 2.6.3  | Creating account limits in HYDRA  |     |     |     |     |     |
| ------ | --------------------------------- | --- | --- | --- | --- | --- |
You can use this dialog to create account limits in HYDRA PZE:
Dialog: PZEKTOG.INSERT
| Parameter  | Type  Mand | Contents  |     | Description  |     |     |
| ---------- | ---------- | --------- | --- | ------------ | --- | --- |
atory
| PZEKTOG.FIR  | C4    | Company  |     | Company of the person, cost  |     |     |
| ------------ | ----- | -------- | --- | ---------------------------- | --- | --- |
center or area. If no company is
indicated, the account limit
applies for all companies.
PZEKTOG.PNR  N8  *1)  Personnel number  Personnel number of the person
(as an alternative to reference
and value)
PZEKTOG.BZG  C20  *1)  Reference  The account limit applies to the
specified organization unit (as an
|     |     |     |     | alternative to person):  |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- |
|     |     |     |     | - BER: area              |     |     |
|     |     |     |     | - KST: cost center       |     |     |
|     |     |     |     | - ABT: department        |     |     |
- PKREIS: employee subgroup
- TAETIGKEIT: activity
|     |     |     |     | -  BESCHVERH:  | employment  |     |
| --- | --- | --- | --- | -------------- | ----------- | --- |
|     |     |     |     | relationship   |             |     |
- NSTMP: person does not clock
| PZEKTOG.WERT  | C20  *1)  | Value  |     | The  value  | refers  to  | the  |
| ------------- | --------- | ------ | --- | ----------- | ----------- | ---- |
organization unit specified in the
previous field (as an alternative
to person).
PZEKTOG.KTO  N1  X  Number of the account  Account number of the
configuration of accounts
| PZEKTOG.JAHR  | N4    | Year  |     | Year of validity of the account  |     |     |
| ------------- | ----- | ----- | --- | -------------------------------- | --- | --- |
limit
PZEKTOG.PER  N2    Period/month  Validity period for the account
limit. It refers to the evaluation
periods configured for the month
evaluation.
PZEKTOG.KTOG:  C1  X  Maximum limit active  Specifies whether or not the
| MAXAKTIV  | (J/N)  |     |     | account limit includes a  |     |     |
| --------- | ------ | --- | --- | ------------------------- | --- | --- |

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 44 of 51  |     |
| ---------------- | --- | ------------------- | --- | --- | -------------- | --- |

HYDRA Personnel Data Manager
maximum limit value.
PZEKTOG.KTOG: Duratio Maximum limit For time accounts the maximum
MAX n or limit is entered as duration and
N6.x as decimal number for daily
accounts. The maximum number
of decimal places results from
the configuration of accounts.
PZEKTOG.LART: C4 Maximum wage type Wage type for the maximum limit
MAX
PZEKTOG.KTOG: C1 X Minimum limit active Specifies whether or not the
MINAKTIV (J/N) account limit includes a minimum
limit value.
PZEKTOG.KTOG: Duratio Minimum limit For time accounts the minimum
MIN n or limit is entered as duration and
N6.x as decimal number for daily
accounts. The maximum number
of decimal places results from
the configuration of accounts.
PZEKTOG.LART: C4 Minimum wage type Wage type for the minimum limit
MIN
PZEKTOG.VERB: C1 Processing "B" specifies that the record is
MOC (K/B/S) processed as account limit. The
entry 'S' is used to set the
account balance. If "K" is set for
processing, fixed amounts can
be posted to (or deducted from)
the account, irrespective of the
account balance. The account
balance that must be set and the
fixed amount are stored in the
field of the maximum limit value.
*1) Of the fields PZEKTOG.PNR, PZEKTOG.BZG and PZEKTOG.WERT, either the field PZEKTOG.PNR
can be populated or the two other fields. All 3 fields can also be empty.
SCS-HRM_81.docx Version: 1.0.23049 Page 45 of 51

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 2.6.4  | Assigning authorizations for PZE and ZKS terminals  |     |     |     |     |
| ------ | --------------------------------------------------- | --- | --- | --- | --- |
You can use this dialog to assign clocking authorizations at PZE terminals and allow access at ZKS
access points:
Dialog: ZBERECHT.INSERT
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| ZBERECHT.FIR  | C4    | Company  |     | The person's company  |     |
| ------------- | ----- | -------- | --- | --------------------- | --- |
ZBERECHT.PNR  N8  X  Personnel number  The person's personnel number
| ZBERECHT.ART  | C1  X  | Type of authorization  |     | PZE:  |     |
| ------------- | ------ | ---------------------- | --- | ----- | --- |
'T':  Terminal
|     |     |     |     | 'G':  Terminal  | group  |
| --- | --- | --- | --- | --------------- | ------ |
ZKS:
'Z':  Access profile
ZBERECHT.NR  N4  X  Authorization number  Number of the terminal, terminal
group or access profile
ZBERECHT.DATB  Date    Start  date  of  the  If this field remains empty, the
|     |     | authorization  |     | validity start date for the  |     |
| --- | --- | -------------- | --- | ---------------------------- | --- |
authorization will not be
restricted.
ZBERECHT.DATE  Date    End  date  for  the  If this field remains empty, the
|     |     | authorization  |     | authorization has no end date  |     |
| --- | --- | -------------- | --- | ------------------------------ | --- |
and is unlimited.

All authorizations of a person are deleted using the dialog ZBERECHT.DELETE:
Dialog: ZBERECHT.DELETE
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| ZBERECHT.FIR  | C4    | Company  |     | The person's company  |     |
| ------------- | ----- | -------- | --- | --------------------- | --- |
ZBERECHT.PNR  N8  X  Personnel number  The person's personnel number
MOD  C1  X  Constant "MOD=G"  Delete  all  authorizations  of  the
person.

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 46 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

The authorizations are transferred via initial download: all authorizations of a person are deleted and then
completely inserted. To make sure that these modifications become active at the same time, use the line
"DLG=WORK.BEGIN"  to  open  a  transaction  before  deleting  the  authorizations.  After  the  last
authorization, finish the transaction using the line "DLG=WORK.END". Create a transaction for each
person so that is does not get too large.
| 2.7    | Data collection for the incentive wage  |     |     |     |     |
| ------ | --------------------------------------- | --- | --- | --- | --- |
| 2.7.1  | List of bonus reasons (ZUSCHLGR.LIST)   |     |     |     |     |
You can use the dialog ZUSCHLGR.LIST to request a list of the bonus reasons configured in the system.
The list includes all bonus reasons and does not have any selection criteria.
Example:
DLG=ZUSCHLGR.LIST|DATEI=./spool/zuschlgr.dat|DAT=10/23/2017|ZEI=40000|USR=2209|
Dialog: ZUSCHLGR.LIST
| Parameter  | Type  Mandatory  | Contents           | Description  |     |     |
| ---------- | ---------------- | ------------------ | ------------ | --- | --- |
| ZUSCHLGR   | N4  X            | Reason             |              |     |     |
| BEZ        | C40              | Designation        |              |     |     |
| ASTUFE     | C1               | BDE authorization  |              |     |     |
CERTIFY  C1    Authorization required  J/empty: bonus requires approval
N: bonus does not require approval
VERBCERTIF  C1    Allocate if still requires  N: bonus is not allocated if still requires
|     |     | approval  | approval  |     |     |
| --- | --- | --------- | --------- | --- | --- |
Other: bonus is used in the incentive wage
calculation until it is rejected.
| VAB  | C     | Responsibility area  |     |     |     |
| ---- | ----- | -------------------- | --- | --- | --- |
15
| BEARB     | C10     | Last modified by  |     |     |     |
| --------- | ------- | ----------------- | --- | --- | --- |
| BEARBDAT  | Date    | Last modified on  |     |     |     |
| BEARBZEI  | N5      | Last modified on  |     |     |     |
VERB  C1    Effect on target  I: bonus has an effect on the actual time
|     |     | time/actual time  | S/Other: bonus has an effect on the target  |     |     |
| --- | --- | ----------------- | ------------------------------------------- | --- | --- |
time.
VERBKRIT  C10    Posting indicator  Reserved for customer-specific functions

Example of a file that has been created:

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     |     | Page 47 of 51  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |

|     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | ----------------------------- | --- |

ZUSCHLGR|VAB|BEZ|BEARB|BEARBDAT|BEARBZEI|VERB|ASTUFE|CERTIFY|VERBCERTIF|VERBKRIT|
1||Maschinenstrung|@|10/23/2017|44650|S|3|J|N||
2||Materialmangel|@|10/23/2017|44650|S|3|J|N||
3||Transporteur fehlt|@|10/23/2017|44650|S|3|J|N||
10||Nacharbeit/allg.|@|10/23/2017|44650|I|3|J|N||
11||Nacharbeit/Entgraten|@|10/23/2017|44650|I|3|J|J||
12||Nacharbeit/Montage|@|10/23/2017|44650|I|3|J|N||
20||Langsamere Maschine|@|10/23/2017|44650|S|3|J|N||
30||Einrichter fehlt|@|10/23/2017|44650|S|3|J|N||
50||Einarbeitung|@|10/23/2017|44650|S|7|N|N||
55||Einarbeitung Mitarb.|@|10/23/2017|44650|S|7|N|N||
200||Werkzeugschaden|@|10/23/2017|44650|I|7|J|N||
500||Schnellere Maschine|@|10/23/2017|44650|S|3|J|N||
510||Einrichter Mitarbeit|@|10/23/2017|44650|S|3|J|N||

| 2.7.2  | Recording of bonuses on the terminal (P_ZUSCHL)  |     |     |     |
| ------ | ------------------------------------------------ | --- | --- | --- |
You can use the dialog P_ZUSCHL to record bonuses.
Parameter
DLG=ZUSCHLGR.LIST|DATEI=./spool/zuschlgr.dat|DAT=10/23/2017|ZEI=40000|USR=2209|
Dialog: ZUSCHLGR.LIST
| Parameter  | Type  Mandatory  | Contents      | Description  |     |
| ---------- | ---------------- | ------------- | ------------ | --- |
| DAT        | Date  X          | Date          |              |     |
| ZEI        | N5  X            | Time          |              |     |
| ZUSCHLGR   | N4  X            | Bonus reason  |              |     |
DAUER:STD  or  Decimal  *1)  Absolute  Decimal with 2 decimal places. Optionally
DAUER:MIN  or  duration of the  in hours with industrial minutes, minutes
| DAUER:SEK  |     | bonus  | (60 per hour) or seconds.  |     |
| ---------- | --- | ------ | -------------------------- | --- |
DAUER.ANZ:STD  or  Decimal  *1)  Relative  Relative duration of the bonus in
DAUER.ANZ:MIN or   duration of the  combination with a quantity in
| DAUER.ANZ:SEK  |     | bonus  | DAUER.ANZ:ANZ in decimal format with  |     |
| -------------- | --- | ------ | ------------------------------------- | --- |
2 decimal places. Optionally in hours with
industrial minutes, minutes (60 per hour)
or seconds.
DAUER.ANZ:ANZ  Decimal  *1)  Quantity for the  Decimal with 2 decimal places in minutes
|     |     | relative  | (only in combination with DAUER.ANZ:*).  |     |
| --- | --- | --------- | ---------------------------------------- | --- |
duration of the
bonus.
| ANR  | C40  X *2)  | HYDRA order  |     |     |
| ---- | ----------- | ------------ | --- | --- |
number (fully
defined key)

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     | Page 48 of 51  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | HYDRA Personnel Data Manager  |     |
| --- | --- | --- | ----------------------------- | --- |

| KNR    | C10  X *2)  | Badge number   |     |     |
| ------ | ----------- | -------------- | --- | --- |
| LPGRP  | C  8  *2)   | Premium group  |     |     |
(cid:129)
| KNR:SIGN  | C10    | Badge number  |     |     |
| --------- | ------ | ------------- | --- | --- |
of person that
approves
VORMONAT  C1    Bonus must be  J: The bonus date is set to the last day of
|     |     | booked to the  | the previous month in parameter DAT.  |     |
| --- | --- | -------------- | ------------------------------------- | --- |
previous
month.
| BEM:1          | C  50    | Comment 1      | Requirements: *3)  |     |
| -------------- | -------- | -------------- | ------------------ | --- |
| BEM:2 … BEM:5  | C  50    | Comments 2 to  | Requirements: *4)  |     |
5
| FU:01 … FU:02  | Date    | User fields  | Requirements: *3)  |     |
| -------------- | ------- | ------------ | ------------------ | --- |
date
| FU:03 … FU:06  | N    | User fields  | Requirements: *3)  |     |
| -------------- | ---- | ------------ | ------------------ | --- |
integer
| FU:07 … FU:08  | Decimal    | User fields  | Requirements: *3)  |     |
| -------------- | ---------- | ------------ | ------------------ | --- |
decimal
| FU:09  | C20    | User field text  | Requirements: *3)  |     |
| ------ | ------ | ---------------- | ------------------ | --- |
| FU:10  | C40    | User field text  | Requirements: *3)  |     |

If the badge number is only entered via bar code, the field must be configured in the field configuration
with "field attribute 1" = MANUELL and "field attribute 2" = READONLY.
*1) Recording of the bonus value
The bonus value is saved in HYDRA in date format "hours" with industrial minutes. In some cases, values
of other units are recorded for bonuses, e.g. "piece". Internally, the date format "hours" is always used.
Two options are available:
| 1.  Collection of an absolute value with a parameter DAUER:*  |     |     |     |     |
| ------------------------------------------------------------- | --- | --- | --- | --- |
The value can be collected directly. With parameter DAUER:MIN, the value is divided by 60 to
get hours before being saved. With parameter DAUER:SEK, the value is divided by 3600 to get
hours before being saved.

| SCS-HRM_81.docx  |     | Version: 1.0.23049  |     | Page 49 of 51  |
| ---------------- | --- | ------------------- | --- | -------------- |

HYDRA Personnel Data Manager
2. You use the parameters DAUER.ANZ:ANZ and DAUER.ANZ:STD/MIN/SEK to collect a relative
value as time per piece.
Using the combination of the above parameters, you can record the bonus as "x seconds per
piece", for example. You then use the number of pieces and the relative bonus to automatically
calculate and save an absolute bonus.
You can record the value either as absolute or as relative bonus.
*2) Assigning the bonus
You can record a bonus for a premium group (group incentives) or a single person (individual piecework
or individual bonus). The following rules apply:
1. You must enter the person (KNR) and the order (ANR). Only then, the system can perform the
validation check and assign the bonus of a concrete order processing to a person.
2. If a premium group was collected via LPGRP, the bonus is collected as group incentives. If the
bonus is collected as group incentives, the staff badge number and the order are entered to
document the context. By default, person and order are not relevant in the processing of the
group incentives.
*3) Requirements of comment 1 and user fields
The parameter BEM:1 and the user fields are only available as of program version hymwlle71.dll 8.1.1.19
(November/2017, SP12). A customer-specific extension must be installed.
*3) Requirements of comment 2 to 5
For the parameters BEM:2 to BEM:5, you require the program version hymwlle71.dll 8.1.1.19
(November/2017, SP12). A customer-specific extension with database patch must be installed and
authorized.
Example
DLG=P_ZUSCHL|DAT=10/24/2017|ZEI=44280|KNR=4125|ANR=4000LL100090|ZUSCHLGR=55|DAUE
R:STD=3.75|USR=2209|
Validation checks
 The order must exist.
 The person must exist. The person must have at least the BDE authorization level that is stored for
the bonus. If no authorization level is stored for the bonus, the person must have at least level 3.
This guarantees that only persons with special authorizations can enter bonuses. If the parameter
KNR:SIGN is used to record the staff badge number of the person authorizing the bonus, their BDE
authorization level is checked.
SCS-HRM_81.docx Version: 1.0.23049 Page 50 of 51

HYDRA Personnel Data Manager
 If the premium group is specified in the dialog, the group must exist.
 You can record the value either as absolute or as relative bonus. If the three parameters for
absolute bonus, quantity and relative bonus include a value that is not 0, the terminal issues an
error message with the posting.
 The bonus reason must exist.
Processing
The editing date of the bonus always includes the time of recording. If the bonus is recorded on a
terminal, "T<terminal number>" is entered for Modified by with the bonus.
The bonus requires approval if configured accordingly in the bonus configuration.
If a person approving the bonus is recorded with parameter KNR:SIGN, their personnel number is saved
in field "Authorization" of the bonus.
SCS-HRM_81.docx Version: 1.0.23049 Page 51 of 51