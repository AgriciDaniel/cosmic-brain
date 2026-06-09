Manual
Interface Wage and Salary
Programs (Payroll)
EIS-LUG 8.2
Version 1.0.22770
Last changed on: 06.08.2020

Interface Wage and Salary Programs (Payroll)
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EIS-LUG_82.docx Version: 1.0.22770 Page 2 of 129

Interface Wage and Salary Programs (Payroll)
Contents
1 Interface Wage and Salary Programs: Overview ......................................... 7
2 HR Master Transfer ...................................................................................... 8
2.1 Character set ....................................................................................................... 8
2.2 Formatting of different data types ........................................................................ 8
2.3 Available dialogs ................................................................................................. 9
2.4 Parameters for the transfer of HR master data .................................................. 10
2.5 Notes on some parameters ............................................................................... 15
2.5.1 Personnel number PNR.PNR ................................................................ 15
2.5.2 Badge PNR.KNR ................................................................................... 15
2.5.3 Authorization levels PNR.ASTUFE and PNR.MSTUFE ......................... 16
2.5.4 Info fields ............................................................................................... 16
2.6 HR master with version control .......................................................................... 17
2.6.1 Overview ............................................................................................... 17
2.6.2 Please note for PNR.MODIFY ............................................................... 18
2.7 Sample data record for a person ....................................................................... 18
2.8 Import of data in HYDRA ................................................................................... 18
2.8.1 Manual start of the interface program .................................................... 18
2.8.2 Definition for transferring data from SAP ............................................... 19
2.8.3 Transfer from other systems (file-based via MLE) ................................. 20
3 Transferring Account Balances .................................................................. 22
3.1 Parameters for transferring the balance accounts ............................................. 23
3.2 Data record as an example of an account modification ..................................... 23
4 Interface to Payroll Accounting Programs - Summary ............................... 24
5 Blocking time and attendance data after end of month .............................. 26
6 Interface configuration ................................................................................ 27
6.1 General configuration of the interfaces .............................................................. 27
6.1.1 Calculation rules for MONTH=xxx and DAY=xxx ................................... 29
6.1.2 Configuration of the absence interface .................................................. 31
6.1.3 Set person-related options ..................................................................... 32
EIS-LUG_82.docx Version: 1.0.22770 Page 3 of 129

Interface Wage and Salary Programs (Payroll)
6.2 Configurations specific to interfaces .................................................................. 33
7 Formats used to Upload Data to Payroll Accounting ................................ 34
7.1 HYDRA standard format .................................................................................... 34
7.1.1 Upload of monthly wage types ............................................................... 34
7.1.2 Upload of absences ............................................................................... 36
7.2 Abacus .............................................................................................................. 38
7.2.1 Upload of monthly wage types ............................................................... 38
7.3 Exakt LohnXL / XXL .......................................................................................... 39
7.3.1 Upload of monthly wage types ............................................................... 39
7.4 CSS fixed wage ................................................................................................. 41
7.4.1 Upload of monthly wage types ............................................................... 41
7.5 DATEV (LODAS) ............................................................................................... 43
7.5.1 Upload of monthly wage types ............................................................... 43
7.5.2 Upload of absences ............................................................................... 47
7.6 DATEV comfort ................................................................................................. 48
7.6.1 Upload of monthly wage types ............................................................... 48
7.6.2 Datev_comfort.ini .................................................................................. 49
7.6.3 hylobu.dat .............................................................................................. 49
7.6.4 Example file ........................................................................................... 51
7.7 eGecko (CSS) ................................................................................................... 53
7.7.1 Upload of monthly wage types ............................................................... 53
7.7.2 Upload of absences ............................................................................... 55
7.8 FOSS-Lohn (ORDAT) ....................................................................................... 56
7.8.1 Upload of monthly wage types ............................................................... 56
7.9 GENERIC .......................................................................................................... 59
7.9.1 Upload of monthly wage types ............................................................... 59
7.9.2 Upload of absences ............................................................................... 63
7.10 HANSALOG (record type V1) ............................................................................ 64
7.10.1 Upload of monthly wage types ............................................................... 64
7.11 HANSALOG (record type V3) ............................................................................ 65
7.11.1 Upload of monthly wage types ............................................................... 65
7.12 INTEGRA .......................................................................................................... 67
7.12.1 Upload of monthly wage types ............................................................... 67
7.13 KASPAR ........................................................................................................... 69
7.13.1 Upload of monthly wage types ............................................................... 69
EIS-LUG_82.docx Version: 1.0.22770 Page 4 of 129

Interface Wage and Salary Programs (Payroll)
7.14 KDVLOHN_V2 (Kanne, new format CSV file) .................................................... 71
7.14.1 Monthly wage types: 77n (data without cost center) .............................. 71
7.14.2 Absences: 7Fn (calendar dates) ............................................................ 73
7.15 KDVLOHN (Kanne, old format fixed record length)............................................ 76
7.15.1 Upload of monthly wage types ............................................................... 76
7.16 LGVSoft ............................................................................................................ 78
7.16.1 Data format of the wage types: V4 (wage types) ................................... 78
7.16.2 Data format for absence times data: V9 (events) ................................... 79
7.17 LOGA ................................................................................................................ 81
7.17.1 Upload of monthly wage types ............................................................... 81
7.17.2 Upload of absences ............................................................................... 83
7.18 LOGA 400 ......................................................................................................... 86
7.18.1 Upload of monthly wage types ............................................................... 86
7.18.2 Upload of absences ............................................................................... 89
7.19 Navision Wage .................................................................................................. 91
7.19.1 Upload of monthly wage types ............................................................... 91
7.20 ORGATIME ....................................................................................................... 92
7.20.1 Upload of monthly wage types ............................................................... 92
7.21 Paisy ................................................................................................................. 93
7.21.1 Upload of monthly wage types ............................................................... 93
7.21.2 Upload of absences ............................................................................... 95
7.22 PASBAS (Syllwasschy) ..................................................................................... 97
7.22.1 Upload of monthly wage types ............................................................... 97
7.23 PEWISO (S+P payroll accounting) .................................................................... 99
7.23.1 Upload of monthly wage types ............................................................... 99
7.24 proLOHN (proALPHA) ..................................................................................... 100
7.24.1 Upload of monthly wage types ............................................................. 101
7.24.2 Upload of absences ............................................................................. 103
7.25 sage KHK ........................................................................................................ 104
7.25.1 Upload of monthly wage types ............................................................. 104
7.26 Taylorix ........................................................................................................... 105
7.26.1 Upload of monthly wage types ............................................................. 105
7.27 TOPAS ............................................................................................................ 108
7.27.1 Upload of monthly wage types ............................................................. 108
7.27.2 Upload of absences ............................................................................. 110
7.28 Varial ............................................................................................................... 111
EIS-LUG_82.docx Version: 1.0.22770 Page 5 of 129

Interface Wage and Salary Programs (Payroll)
7.28.1 Upload of monthly wage types ............................................................. 111
7.29 Winlohn (Sage Schweiz AG) ........................................................................... 113
7.29.1 Upload of monthly wage types ............................................................. 113
7.30 VEDA .............................................................................................................. 115
7.30.1 Upload of monthly wage types ............................................................. 115
7.30.2 Upload of absences ............................................................................. 118
8 Set person-related options ....................................................................... 120
9 Interface to Payroll Accounting ................................................................ 122
10 Premium/ Incentive Wage Uploads .......................................................... 126
10.1 Data record structure for incentive wage uploads ............................................ 126
10.2 Description of data fields for incentive wage uploads ...................................... 127
10.3 Example file:.................................................................................................... 128
11 Synchronizing File Interfaces ................................................................... 129
EIS-LUG_82.docx Version: 1.0.22770 Page 6 of 129

Interface Wage and Salary Programs (Payroll)
1 Interface Wage and Salary Programs: Overview
Possible fields of application
This function package includes functions to transfer the HR master from and to the payroll system for
transferring monthly wage types and absences.
Implementation notes
The function package is used if you:
 Would like to transfer the HR master from a higher level system.
 Would like to transfer the results of time management to a payroll system.
Integration
This function package can only be used if time management is done in HYDRA (function package
"assessment of labor times").
Functions
 Provision of monthly results
o Provision of total wage types and absences in the HYDRA standard format
o Provision of data in the specific format for SAP R/3 HR, DATEV, IBM Lohn und Gehalt,
PAISY, LOGA (P&I), LOGA 400 (P&I), Exact.Lohn XL / XXL, Taylorix, SAGE KHK, Pro
Lohn, Varial, Hansalog, CSS Fix Lohn, Abacus, Integra, Microsoft Dynamix NAV, FOSS,
KDVLOHN, PASBAS, and much more besides.
o Transfer of account balances by the end of the month in the form of wage types.
 Block month
o The month is blocked for specific users, once data has been transferred to payroll
accounting.
 Transfer of people
o Transfer of people and their account balances (if required) in the HYDRA-standard
format.
EIS-LUG_82.docx Version: 1.0.22770 Page 7 of 129

Interface Wage and Salary Programs (Payroll)
2 HR Master Transfer
This interface for transferring HR data to HYDRA has been implemented using a new technology for
universal interfaces. Using this technology, a separate command (so-called "dialogs") is listed in the
interface file for each line to import the required data. The interface program processes these dialogs
sequentially and writes a log file of the results.
Each line of the interface file contains a dialog with all of the relevant data. The most important
components are the dialog ID and the parameters belonging to the dialog.
Example of a dialog (one line from an interface file):
DLG=PNR.DELETE|PNR.FIR=012|PNR.PNR=002449|...
Explanation
PNR.DELETE is the dialog identification. Vertical lines ("|", ASCII 124) are used to separate the
different parameters (PNR.FIR, PNR.PNR, ...). Select a field width for the different parameters that
is wide enough for the presentation. However a fixed file structure can also be realized by adding
leading zeros (for numbers) and trailing spaces. The sequence of the parameters is irrelevant.
Some parameters are mandatory and must always be included in a dialog. Other parameters are
optional and are specified if required or left out. Fields that are not included in the interface are
assigned the default value when a person is created. These fields are not overwritten when you
change the data of a person. You therefore manage these fields in HYDRA.
2.1 Character set
As of MESWeaver 2.1, HYDRA is based on Unicode. Interface files are therefore expected in format
UTF-8 without BOM (Byte Order Mark).
2.2 Formatting of different data types
The following formats are supported:
Data type Format Examples
N<x> Digits, maximum of <x> places |PNR.PNR=2449| or
|PNR.PNR=002449|
N<x>.<y> Decimal number with a maximum of |PNR.PSTDSATZ=30.5| or
<x> predecimal places and <y> |PNR.PSTDSATZ=00030.5|
decimal places. A dot is the decimal
separator.
EIS-LUG_82.docx Version: 1.0.22770 Page 8 of 129

    Interface Wage and Salary Programs (Payroll)

| Data type  | Format  |     | Examples  |     |
| ---------- | ------- | --- | --------- | --- |
C<x>  Character string with the maximum  |PNR.NAME=Huber| or
Texts (character)   length <x>; the maximum length does  |PNR.NAME=Huber    |
not need to be filled up with blank
characters.
| Date  | MM/DD/YYYY (American format:  |     | |STMP.DAT=12/31/2002|  |     |
| ----- | ----------------------------- | --- | ---------------------- | --- |
month, day, year. Slashes are used as
separator.)
| Times or   | Seconds since midnight or  |     | |STMP.ZEI=52200| or     |     |
| ---------- | -------------------------- | --- | ----------------------- | --- |
| durations  | HH:MM or                   |     | |STMP.ZEI=14:30| or     |     |
|            | HH:MM:SS or                |     | |STMP.ZEI=14:30:00| or  |     |
HH,DDD or
|STMP.ZEI=014,5| or
|     | HH.DDD  |     | |STMP.ZEI=14.500|  |     |
| --- | ------- | --- | ------------------ | --- |
H  hours (as many places
  as required)
M  Minutes (in groups of 60)
S  Seconds
D  Industrial or decimal
  minutes (in groups of 100)

2.3  Available dialogs
The following dialogs are available to transfer the persons:
|   PNR.INSERT  | to create a person  |     |     |     |
| -------------- | ------------------- | --- | --- | --- |
|   PNR.UPDATE  | to change a person  |     |     |     |
|   PNR.DELETE  | to delete a person  |     |     |     |
  PNR.MODIFY  This dialog checks on the basis of the personnel number whether or not the
person  already  exists  in  HYDRA.  If  the  person  is  available,  the  person  is
modified, if not, the person is created.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 9 of 129  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Interface Wage and Salary Programs (Payroll)

Note:
If a person is created using PNR.INSERT or PNR.MODIFY, the system automatically
assigns basic authorizations for the clockings of the time and attendance (PZE) and for
the access of the access control (ZKS). In PZE, the person is authorized for the terminal
group 99, and in ZKS, the access profile 999 is assigned automatically.

2.4  Parameters for the transfer of HR master data
The identifiers in column "Mandatory" specify the dialogs with mandatory fields:
I  For INSERT and MODIFY
U  For UPDATE and MODIFY
D  FOR DELETE

Dialog: PNR.*
Parameter
|     | Type  | Mand Contents  | Description    |     |
| --- | ----- | -------------- | -------------- | --- |
atory
General data
PNR.PNR  N8  I/U/D  Personnel number  The personnel number is the key
field to access the person's data
| PNR.PNAME       | C  40  |   Name         |                              |     |
| --------------- | ------ | -------------- | ---------------------------- | --- |
| PNR.PVORNAME    | C  20  |   First name   |                              |     |
| PNR.PVORNAME:2  | C  20  |   Middle name  |                              |     |
| PNR.KUERZEL     | C10    |   Initials     | Initials of the person (*1)  |     |
| PNR.FIR         | C  4   | I  Company     | Company of the person        |     |
| PNR.BER         | C  8   | I  Area        |                              |     |
PNR.KST  C10  I  Cost center  The person's regular cost center
| PNR.EINTRITT  | Date  | I  Date of joining  |     |     |
| ------------- | ----- | ------------------- | --- | --- |
| PNR.AUSTRITT  | Date  |   Date of leaving   |     |     |
PNR.SVERTRETER1  Integer    Replacement 1  Personnel  number  of
replacement 1 (*1)
PNR.SVERTRETER2  Integer    Replacement 2  Personnel  number  of
replacement 2 (*1)
| PNR.KNR  | C10  |   Staff badge  | Badge number  |     |
| -------- | ---- | -------------- | ------------- | --- |
PNR.ANREDE  C  20    Salutation  Salutation of the person (*1)
PNR.PRODEMPLOY C1    Production employees  Identifies  if  it  is  a  production
| EE  |     |     | employee or not (available as of  |     |
| --- | --- | --- | --------------------------------- | --- |
SP13/25.10.2018)

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 10 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Dialog: PNR.*
| Parameter  | Type  | Mand Contents  | Description    |     |     |
| ---------- | ----- | -------------- | -------------- | --- | --- |
atory
PNR.VAB  C  15    Responsibility area  ID controlling which user is
authorized to access the data of
which persons. If the
responsibility area remains
empty, every user can access
the person's data.
| PNR.TAETIGKEIT  | C  20  |   Activity  |     |     |     |
| --------------- | ------ | ----------- | --- | --- | --- |
PNR.TITEL  C  20    Title   Academic titles (form of address)
PNR.NATION  C  3    Nationality  e.g. "D" or "F" or "CH" or "GB" or
"US" or "CZ",etc.
| PNR.GEBDAT  | Date  |   Date of birth  |     |     |     |
| ----------- | ----- | ---------------- | --- | --- | --- |
PNR.GEBORT  C  30    Place of birth  Place of birth of a person (*1)
PNR.SCHULE1  C  50    School-leaving  School-leaving  qualification  of
|     |     | qualification  | the person (*1)  |     |     |
| --- | --- | -------------- | ---------------- | --- | --- |
PNR.SCHULE2  C  50    Secondary school- Secondary  school-leaving
|     |     | leaving qualification  | qualification of the person  (*1)  |     |     |
| --- | --- | ---------------------- | ---------------------------------- | --- | --- |
PNR.STRASSE  C50    Street  Street and street number of place
|          | (*1)  |             | of residence  |                 |     |
| -------- | ----- | ----------- | ------------- | --------------- | --- |
| PNR.PLZ  | N5    |   Zip code  | ZIP  code     | of  the  place  | of  |
residence
| PNR.ORT:WOHN      | C  20  |   Domicile        |     |     |     |
| ----------------- | ------ | ----------------- | --- | --- | --- |
| PNR.TEL:FIR       | C  20  |   Company phone   |     |     |     |
| PNR.TEL:PRIVAT    | C  20  |   Private phone   |     |     |     |
| PNR.MOBILTEL:FIR  | C  20  |   Company mobile  |     |     |     |
| PNR.MOBILTEL:PRI  | C  20  |   Private mobile  |     |     |     |
VAT
| PNR.EMAIL:FIR     | C  50  |   Company e-mail  |          |     |     |
| ----------------- | ------ | ----------------- | -------- | --- | --- |
| PNR.EMAIL:PRIVAT  | C  50  |   Private e-mail  |          |     |     |
| PNR.GESCHLECHT    | C1     |   Gender          | M: male  |     |     |
W: female
| PNR.FAMSTAND  | C1  |   Family status  | L: Single  |     |     |
| ------------- | --- | ---------------- | ---------- | --- | --- |
V: Married
W: Widowed
G: Divorced
PNR.PNR:VGS  N8    Supervisor  Personnel number of supervisor
PNR.INFOTXT:n  C  40    Text field n  Free text field with a maximum of
|     |     | (n from 1 to 10)  | 40 characters. In particular with  |     |     |
| --- | --- | ----------------- | ---------------------------------- | --- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.
PNR.INFOTXT:n  C  20    Text field n  Free text field with a maximum of
|     |     | (n from 11 to 15)  | 20 characters. In particular with  |     |     |
| --- | --- | ------------------ | ---------------------------------- | --- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.
PNR.INFOTXT:n  C10    Text field n  Free text field with a maximum of
|     |     | (n from 16 to 20)  | 10 characters. In particular with  |     |     |
| --- | --- | ------------------ | ---------------------------------- | --- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 11 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

    Interface Wage and Salary Programs (Payroll)

Dialog: PNR.*
| Parameter  | Type  | Mand Contents  | Description    |     |     |
| ---------- | ----- | -------------- | -------------- | --- | --- |
atory
PNR.INFOWERT:n  N8    Number field n  Free number field with a
|     |     | (n from 1 to 5)  | maximum of 8 characters. In  |     |     |
| --- | --- | ---------------- | ---------------------------- | --- | --- |
particular with existing or planned
interfaces to SAP, pay attention
to the notes on the info fields
below.
PNR.INFODAT:n  Date    Date n  Free date field. In particular with
|     |     | (n from 1 to 5)  | existing or planned interfaces to  |     |     |
| --- | --- | ---------------- | ---------------------------------- | --- | --- |
SAP, pay attention to the notes
on the info fields below.
Data for the Personnel Time Management PZW
| PNR.ABT      | C  8  |   Department          |                      |     |     |
| ------------ | ----- | --------------------- | -------------------- | --- | --- |
| PNR.PKREIS   | C  8  |   Employee subgroup   |                      |     |     |
| PNR.GLZJMOD  | N4    |   Working time model  | Number of the model  |     |     |
PNR.SCHZARTJMO N4    Shift rhythm model  Number of the model
D
| PNR.ENTLJMOD  | N4  |   Payment model  | Number of the model  |     |     |
| ------------- | --- | ---------------- | -------------------- | --- | --- |
PNR.ENTLTMOD:ME N4    Overtime type  Number of the payment day type
HRARB
| PNR.BESCHVERH   | C1  |   Type of contract  | G: Salaried  |     |     |
| --------------- | --- | ------------------- | ------------ | --- | --- |
A: Non-salaried
PNR.AVGAZ  Durati   Average working time  If  configured  accordingly,  this
|     | on  |     | time is posted for absences.  |     |     |
| --- | --- | --- | ----------------------------- | --- | --- |
PNR.TZGRAD  N3.3    Part-time rate  Part-time rate in percent with a
maximum of three decimal places
PNR.ETGAWDAT  Date    First allocation  Date  when  this  person  is  first
|     |     |     | evaluated    | by  the  PZE  | workday         |
| --- | --- | --- | ------------ | ------------- | --------------- |
|     |     |     | evaluation.  | You  can      | fill  in  this  |
field if the date is not the date of
joining.
PNR.ZNWL  N3     Time sheet  Number of time sheet for display
in SMA or WEB
| PNR.DGBERECHT  | C1  |   Business trip  | J/N  |     |     |
| -------------- | --- | ---------------- | ---- | --- | --- |
authorization
PNR.SPERR:PZE  C1    Blocking indicator PZE  S: Person is blocked for PZE.
Empty: Person is not blocked.
| PNR.OPT:NSTMP  | C1  |   Person does not clock  | J/N  |     |     |
| -------------- | --- | ------------------------ | ---- | --- | --- |
| PNR.OPT:       | C1  |   Allocate average       | J/N  |     |     |
| AVGAZVERB      |     | working time             |      |     |     |
PNR.URLANSPR:  N3.1    Annual leave  Annual entitlement to vacation.
| NORM  |     | entitlement  |     |     |     |
| ----- | --- | ------------ | --- | --- | --- |
PNR.URLANSPR:SO N3.1    Special leave  Annual  entitlement  to  special
| NDER  |     | entitlement  | leave.  |     |     |
| ----- | --- | ------------ | ------- | --- | --- |
PNR.URLANSPR:  N3.1    Additional leave  Annual  entitlement  to  additional
| ZUSATZ  |     | entitlement  | leave.  |     |     |
| ------- | --- | ------------ | ------- | --- | --- |
Data for Shop Floor Data Collection BDE
| PNR.PGRP  | N3  |   Employee group  |     |     |     |
| --------- | --- | ----------------- | --- | --- | --- |
PNR.BDEJMOD  N3    Year model  Number  of  the  BDE  shift  year
| [PNR.SJMOD:BDE]  |     |     | model  |     |     |
| ---------------- | --- | --- | ------ | --- | --- |
(The ID PNR.SJMOD:BDE is out-
dated and only used if
PNR.BDEJMOD is not set.)

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 12 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Dialog: PNR.*
| Parameter  | Type  | Mand Contents  | Description    |     |
| ---------- | ----- | -------------- | -------------- | --- |
atory
| PNR.SMNR  | C  8  |   Workplace  | Regular workplace. Leading  |     |
| --------- | ----- | ------------ | --------------------------- | --- |
zeros are required for numeric
machine numbers!
PNR.MEHRMNR  C1    Multi machine operation  Logon to multiple machines
allowed J/N.
| PNR.OPT:AGWAUTO  | C1  |   Automatic OP change   | J/N  |     |
| ---------------- | --- | ----------------------- | ---- | --- |
| PNR.PLAUS:       | C1  |   BDE check whether or  | J/N  |     |
| PNRANAG          |     | not the person has to   |      |     |
be logged on to the OP
PNR.PLAUS:  N1    Activate BDE target  0: The operation can be logged
| SMENGE  |     | quantity check  | off at any time  |     |
| ------- | --- | --------------- | ---------------- | --- |
1: A check is performed
indicating whether or not the
current actual quantity is within
the "underproduction" and
"overproduction" limits. If this is
not the case the logon is
rejected.
2: as in 1, in addition the person
has to be logged on to the OP!
PNR.UPG  N3    Minimum target  For the target quantity check, in
|     |     | quantity  | percent of the planned quantity.  |     |
| --- | --- | --------- | --------------------------------- | --- |
PNR.OPG  N3    Maximum target  For the target quantity check, in
|     |     | quantity  | percent of the planned quantity.  |     |
| --- | --- | --------- | --------------------------------- | --- |
PNR.OPT:PABSKE  C1    Automatic logoff of  J/N. Default=J. This option is
|     |     | personnel when shift  | used if the automatic shift       |     |
| --- | --- | --------------------- | --------------------------------- | --- |
|     |     | ends                  | change function is in use and if  |     |
the person is logged on to an
operation where the option Use
workplace settings is defined for
the relevant order type and if the
person is logged on to a
workplace where the Use
personal settings option is set.
PNR.ASTUFE:1  N1    Authorization for orders  0..9: Authorization level
specifying whether or not the
person may log on orders
(comparison with the
authorization level of the
operation). see below.
PNR.ASTUFE:2  C1    Log OP on  J: The above authorization level
refers to the logon of operations.
PNR.ASTUFE:3  C1    Log OP off  J: The above authorization level
refers to the logoff of operations.
PNR.ASTUFE:4  C1    Log off all staff  J: The person may execute the
terminal function "log all people
off".
PNR.MSTUFE:1  N1    Authorization for  0..9: Authorization level
|     |     | machine status  | specifying whether or not the  |     |
| --- | --- | --------------- | ------------------------------ | --- |
|     |     | changes         | person is allowed to change    |     |
statuses (comparison of the
authorization level from the
(machine) status assignment).

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 13 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Dialog: PNR.*
| Parameter  | Type  | Mand Contents  | Description    |     |     |
| ---------- | ----- | -------------- | -------------- | --- | --- |
atory
PNR.MSTUFE:2  C1    Change only if person  The person may only change
|     |     | is logged on  | statuses on the terminal if the  |     |     |
| --- | --- | ------------- | -------------------------------- | --- | --- |
person is currently logged on to
the workplace.
PNR.MSTUFE:4  C1    Change of production  J: Authorization available
|     |     | lock (from HYDRA- | N: No authorization  |     |     |
| --- | --- | ----------------- | -------------------- | --- | --- |
|     |     | MDE 7.2 on)       | By default = N.      |     |     |
PNR.SSTUFE:1  N1    Authorization to change  0: No authorization
|     |     | target cycle and target  | 1: Authorization available  |     |     |
| --- | --- | ------------------------ | --------------------------- | --- | --- |
partitioning on the
terminal
PNR.SSTUFE:2  C1    Authorization to change  J: Authorization available
|     |     | the target quantity on  | N: No authorization  |     |     |
| --- | --- | ----------------------- | -------------------- | --- | --- |
the terminal
PNR.SSTUFE:2  C1    Authorization to change  J: Authorization available
|     |     | the target quantity on  | N: No authorization  |     |     |
| --- | --- | ----------------------- | -------------------- | --- | --- |
the terminal
PNR.RSTUFE  N1    Status change of  0..9: Authorization level
|     |     | resources  | specifying whether or not the  |     |     |
| --- | --- | ---------- | ------------------------------ | --- | --- |
person is allowed to change
resource statuses (comparison
with the authorization level from
the resource status assignment).

Only relevant if HYDRA WRM or
HYDRA DNC is in use
| PNR.DLSTUFE  | N1  |   DNC download  | 0 = No authorization         |     |     |
| ------------ | --- | --------------- | ---------------------------- | --- | --- |
|              |     | authorization   | 9 = Authorization available  |     |     |

Only relevant if HYDRA DNC is
in use
| PNR.ULSTUFE  | N1  |   DNC upload   | 0 = No authorization         |     |     |
| ------------ | --- | -------------- | ---------------------------- | --- | --- |
|              |     | authorization  | 9 = Authorization available  |     |     |

Only relevant if HYDRA DNC is
in use
PNR.SPERR:BDE  C1    Blocking ID BDE  S: Person is blocked for BDE
(shop floor data collection).
Empty: Person is not blocked.

Please note: The field is NOT
visible on the console.
Data for the Incentive Wage LLE
PNR.PRKZ  C1    Premium indicator  'E' = individual piecework,
'G' = group piecework
'Z' or empty = time wage
Default: empty.
| PNR.PRGRP        | C  3  |   Premium group (cid:129) |     |     |     |
| ---------------- | ----- | ------------------------- | --- | --- | --- |
| PNR.ANTFAKTLBON  | N3    |   Premium factor          |     |     |     |
| PNR.BPOS         | C  6  |   Operator                |     |     |     |
position/function
| PNR.LPKZ  | C10  |   Wage/premium  |     |     |     |
| --------- | ---- | --------------- | --- | --- | --- |
indicator

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 14 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

Interface Wage and Salary Programs (Payroll)
Dialog: PNR.*
Parameter Type Mand Contents Description
atory
PNR.LART C 4 Wage type
PNR.LGRP C 4 Wage group
PNR.OPT:PZEADEA C1 BDE/PZE comparison J/N
BGL
Note:
When the persons are initially created (first interface run), do not pass the parameters
PNR.PNR:VGS(supervisor); PNR.SVERTRETER1 (replacement 1);
PNR.SVERTRETER2 (replacement 2) because this can lead to errors. An error occurs
if a person is assigned to a supervisor that comes later in the interface file and is
therefore not yet created. Recommendation: perform two inface runs one after the
other. The first run is used to create the persons without supervisor. It guarantees that
all persons are available. The second run is used to assign the supervisor. This run
includes the parameters PNR.PNR:VGS(supervisor); PNR.SVERTRETER1
(replacement 1); PNR.SVERTRETER2 (replacement 2).
2.5 Notes on some parameters
2.5.1 Personnel number PNR.PNR
Unique number of the person. The personnel number has a maximum length of eight characters.
2.5.2 Badge PNR.KNR
Number on the staff badge that is assigned to the person. HYDRA can process badge numbers that are
up to 10 characters long, however the number of characters considerably depends on the ID badge in
use. If barcode badges are used for identification, numbers that are four characters long are
recommended. The number of characters for the badge number may be defined in HYDRA, i.e. the
interface program only transfers the configured number of characters. If the badge number is shorter than
defined in the HYDRA setup, it is filled with leading zeros. If it is too long an error message appears and
the dialog is rejected.
EIS-LUG_82.docx Version: 1.0.22770 Page 15 of 129

Interface Wage and Salary Programs (Payroll)
Note:
The badge number of a person can be empty. If a number is assigned, it must be
unique in HYDRA like the personnel number. If a badge number is passed for a person
that had been assigned to a person that has already left the company, the badge
number of the person who has left is deleted and assigned to the new person.
2.5.3 Authorization levels PNR.ASTUFE and PNR.MSTUFE
Authorization logic that may be defined individually for ADE and MDE activities on the shop floor
terminals. 0 = no authorization, .1 = low authorization, 9 = highest authorization.
2.5.4 Info fields
If your system has interfaces to SAP or will have SAP interfaces at a later stage, then please mind that
part of the info fields is assigned SAP-specific additional data when the MINI HR master data is
downloaded from SAP-HCM. Some fields are also required to control the person-related upload of data to
the correct SAP system.
Free info text 9
When downloading the MINI HR master data from SAP, this field is assigned the "Customer Field
2" from SAP. By default, this field is not used by HYDRA.
Free info text 14
When downloading the MINI HR master data from SAP, this field is assigned the "Customer Field
1" from SAP. By default, this field is not used by HYDRA.
Free info text 16
When downloading the MINI HR master data from SAP, this field is assigned the "Source System"
from SAP.
When uploading person-related data via interfaces to SAP, the Source System heads for the
target SAP system the data of the person is transferred to. This applies for the following
interfaces:
 Uploading time events via HR-PDC
 Uploading data of the Personnel Time Management to SAP-HCM, e.g. wage type
postings or absences
 Uploading data of the Incentive Wage to SAP-HCM
 Other customer-specific interfaces with person-related data to SAP in the HR context
(not PP-PDC)
EIS-LUG_82.docx Version: 1.0.22770 Page 16 of 129

Interface Wage and Salary Programs (Payroll)
If these interfaces are used, the customer must ensure that no other field contents are assigned
to the info text 16. The info text 16 can remain empty, then the source system is identified using
other methods; see documentation of the relevant interface.
Free info text 17
When downloading the MINI HR master data from SAP, this field is assigned the "Country
Grouping" from SAP. This field can be used in HYDRA with the Time and Attendance PZE as
subsystem of SAP-HCM (HR-PDC) when data is collected in combination with plausibility checks.
Free info text 18
When downloading the MINI HR master data from SAP, this field is assigned the field
"ES_GRPG_WORK_SCHED" from SAP. This field can be used in HYDRA with the Time and
Attendance PZE as subsystem of SAP-HCM (HR-PDC) when data is collected in combination with
plausibility checks.
Free info text 19
When downloading the MINI HR master data from SAP, this field is assigned a content that is made
up of the fields PS_GRPG_ATT_ABS_TYPE and ATT_ABS_REASON_GRPG. This field can be
used in HYDRA with the Time and Attendance PZE as subsystem of SAP-HCM (HR-PDC) when
data is collected in combination with plausibility checks.
Free info text 20
When downloading the MINI HR master data from SAP, this field is assigned the field
"EXT_WAGETYPE_GRPG" from SAP. This field can be used in HYDRA with the Time and
Attendance PZE as subsystem of SAP-HCM (HR-PDC) when data is collected in combination with
plausibility checks.
2.6 HR master with version control
2.6.1 Overview
Optionally, you can manage the HYDRA HR master data in versions. You can manage different versions
of a person that are/were valid at different times. To this end, the additional parameter PNR.DATB is
used as "validity start date". It includes the validity start date in the date format.
The unique key for a HR master version consists of the personnel number PNR.PNR and the validity start
date PNR.DATB. This applies for the update and deletion of HR master versions.
HYDRA automatically manages the validity end date of a version. An HR master version applies until the
next version becomes effective. The validity date is not restricted if there is no subsequent version.
In case the validity start date is not specified, the interface always refers to the HR master version that is
in effect at the time when the interface process is running.
EIS-LUG_82.docx Version: 1.0.22770 Page 17 of 129

Interface Wage and Salary Programs (Payroll)
2.6.2 Please note for PNR.MODIFY
If the validity start date PNR.DATB is not specified for the PRN.MODIFY dialog and there is currently no
applicable HR master version, a currently applicable HR master version will be added by using the
parameters transferred. Moreover, all existing HR master versions that are applicable from this day on
are updated by the parameters transferred.
If the validity start date PNR.DATB is specified for the PNR.MODIFY dialog and this HR master version
does not yet exist in HYDRA, this version will be added and an already existing version that is applicable
on the validity start date will be used as basis (copied) and updated by the transferred parameters.
2.7 Sample data record for a person
All fields affecting a person are written in one line in the interface. In the below example, however, data is
written in two lines to make it readable:
DLG=PNR.MODIFY|PNR.PNR=153443|PNR.KNR=001324|PNR.FIR=BSP|PNR.KST=B12_54|
PNR.BER=Halle 17|PNR.EINTRITT=01/15/2010|PNR.PNAME=Maier|PNR.PVORNAME=Hans|
2.8 Import of data in HYDRA
2.8.1 Manual start of the interface program
Existing personnel data can be processed using the program hymw.
Windows: hymw -u 199 -b filename.bap > filename.log
or
Linux: hymw.out –u 199 –b filename.bap > filename.log
Note: You must call the program in the HYDRA directory.
Parameter
-u <usernummer>
Here, a unique numeric value must be selected as the <UserNumber>. If interfaces run at the same
time with the same UserNumber, they interfere with each other and supply false results.
Recommended are numbers ranging between 1 to 200.
-b <inputFile>
Name of file with HR master data.
> <logfile>
If you redirect the output, the GUI output is redirected to a log file. The processing results can then
be analyzed later on.
EIS-LUG_82.docx Version: 1.0.22770 Page 18 of 129

Interface Wage and Salary Programs (Payroll)
Example
Sample file myFile.bap
DLG=PNR.MODIFY|PNR.PNR=11111111|PNR.KNR=1111|PNR.FIR=BSP|PNR.KST=costc_001|PNR.BER=Area57|PNR.EINTRITT=01/15/2019|PNR.PNAME=Miller|PNR.PVORNAME=Heinz|
DLG=PNR.MODIFY|PNR.PNR=12345678|PNR.KNR=001324|PNR.FIR=BSP|PNR.KST=B12_54|PNR.BER=Area17|PNR.EINTRITT=12/01/2017|PNR.PNAME=Maier|PNR.PVORNAME=Hans|
Request via command line
hydadm:2:E:\hydra2>hymw.exe -u999 -bmyFile.bap > myFile.log
hydadm:2:E:\hydra2>
Log file myFile.log
EXEC:DLG=PNR.MODIFY|PNR.PNR=111111|PNR.KNR=1111|PNR.FIR=BSP|PNR.KST=costc_001|PNR.BER=Area57|PNR.EINTRITT=01/15/2019|PNR.PNAME=Miller|PNR.PVORNAME=Heinz|
RES: RET=0|KT=|LT=|RET=0|KT=|LT=|
EXEC:DLG=PNR.MODIFY|PNR.PNR=153443|PNR.KNR=001324|PNR.FIR=BSP|PNR.KST=B12_54|PNR.BER=Area17|PNR.EINTRITT=12/01/2017|PNR.PNAME=Maier|PNR.PVORNAME=Hans|
RES: RET=1703|KT=Invalid badge no.|LT=Invalid badge number 001324 |
The first data record has been processed by the system without error ("RET=0|"). The second data record
produced an error (RET=1703|). The following texts shortly describe the error.
To change the language of the error texts, set the environment variable HYLANG in the
command line to "en" or "de" before you execute the command:
hydadm:2:E:\hydra2>set HYLANG=en
or
hydadm:2:E:\hydra2>set HYLANG=de
2.8.2 Definition for transferring data from SAP
The below structure has been designed to transfer HR master data from SAP in the HYDRA BAPI format
using a customer-specific function module.
Message type: ZHYDRA_PERSONS
IDoc type: ZHYDRA_PERSONS01
Segments: Z2BAPI000
EIS-LUG_82.docx Version: 1.0.22770 Page 19 of 129

Interface Wage and Salary Programs (Payroll)
NOTE
To generate segment names in HYDRA inbound processing as described above, the segments must
have been created in SAP according to the pattern Z1<segment name>. The SAP outbound processing
then generates versions using the segment names Z2<segment name><version>.
Example: Z1BAPI becomes Z2BAPI000
Field name Type Description Example
Transaction CHAR 20 Transaction ID (dialog ID in HYDRA) PNR.MODIFY
Description CHAR 40 Plain text designation as comment Download HR master
Data CHAR 940 Dialog data string for HYDRA DLG=PNR.MODIFY|PNR.PNR=12345678|
PNR.KNR=00000001|
Details see section 2.3.1
2.8.3 Transfer from other systems (file-based via MLE)
The communication between HYDRA and higher level systems generally depends on the technical
configuration and capabilities of the corresponding system. HYDRA provides the RFC technology or the
classic transfer option using ASCII files (“Text Files” = .txt files) for the communication (to and from
HYDRA).
"IDOCs" combine data to logical units within one file. These IDOCs act like a “bracket” and combine
logically similar data structures to transfer several of these “clusters” within one file. Although each IDOC
corresponds to a defined data type/structure, the format does not depend on the content or the content
type.
For details on the configuration of the interface, refer to the document "MES Weaver" (SIS-
MWV_30.PDF).
Data is transferred using the following basic structure:
Field name Type Length Designation (name) Data field and meaning
SEGNAM* Char 30 Segment To this field, the writing system assigns the respective
segment name. This segment name distinctly defines
the structure of the data record (field SDATA).
Example: Z2BAPI000
MANDT* Char 3 Instance Reserved; fixed: '000'
DOCNUM* Char 16 IDoc number Consecutive number for IDOCs
Reserved: fixed '0000000000000000'
SEGNUM* Char 6 Segment number Reserved: fixed '000000'
EIS-LUG_82.docx Version: 1.0.22770 Page 20 of 129

|     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --------------------------------------------- | --- | --- |

Field name  Type  Length  Designation (name) Data field and meaning
PSEGNUM  Char  6  Number of the parent  Reserved; fixed: '000000'
segment
| HLEVEL  | Char  2  | Hierarchy level  | Reserved; fixed: '00'  |     |     |
| ------- | -------- | ---------------- | ---------------------- | --- | --- |
SDATA  Char  1000  Payload  This field contains the actual data content/payload. The
SEGNAM field specifies the structure of this field.
* = Key field
The below structure has been designed to transfer HR master data from other systems using the HYDRA
file interface "File Port":
| Message type / file name:           |     | ZHYDRA_PERSONS  |     |     |     |
| ----------------------------------- | --- | --------------- | --- | --- | --- |
| Message function / file extension:  |     | .dat            |     |     |     |
| Segments:                           |     | Z2BAPI000       |     |     |     |

The segment Z2BAPI000 has the following structure:
| Field name  | Type  |   Description    |     | Example  |     |
| ----------- | ----- | ---------------- | --- | -------- | --- |
Transaction  CHAR  20  Transaction ID (dialog ID in HYDRA)  PNR.MODIFY
Description    CHAR  40  Plain text designation as comment  Download HR master
Data  CHAR  940  Dialog data string for HYDRA  DLG=PNR.MODIFY|PNR.PNR=12345678|
PNR.KNR=00000001|
Details see section 2.3.1

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 21 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

Interface Wage and Salary Programs (Payroll)
3 Transferring Account Balances
A person's current account balances can be set using the PNRKTO.UPDATE dialog.
To perform account modifications, the following combination of values can be transferred:
Combination Compensation in HYDRA Logging (e.g. in the "Account
journal" list)
New account The actual current account balance The actual old account balance is
balance will be set to the new account revised by the difference made up of
balance that was transferred. the new to the old balance.
Account The actual current account balance The actual account balance is revised
modification is revised by the transferred account by the transferred modification.
modification.
New and old The desired modification is derived The old transferred account balance is
account balance from the difference between the revised by the calculated modification.
transferred old and new account Please keep in mind that the
balance. The actual current account transferred account balance may
balance is revised by the calculated deviate from the actual account balance
account modification. at the time of the modification.
The details about the account balances and the account modifications are provided in different formats
and do not depend on the account type:
1. Time accounts
The values are transferred in seconds for time accounts. Example: To achieve an account
modification of one hour, the value "|PNRKTO.KTODIFF=3600|" is transferred. If there are any
decimal places, these are ignored.
2. Day accounts
For day accounts, the values are expected as decimal places. Example: To achieve an account
modification to the leave account by four and a half days, the value "|PNRKTO.KTODIFF=4.5|" is
transferred. If there are any decimal places, they are only considered allowing for the number of
decimal places defined at the time the accounts were configured.
If the value is negative, a minus sign is placed in front of the number.
EIS-LUG_82.docx Version: 1.0.22770 Page 22 of 129

    Interface Wage and Salary Programs (Payroll)

3.1  Parameters for transferring the balance accounts
In the "Must" column in the table shown below you will see IDs that show the fields where the dialogs are
necessary:
U  For UPDATE
The following parameters are available:
Dialog: PNRKTO.UPDATE
| Parameter   | Type  Must  | Content  | Description       |     |     |
| ----------- | ----------- | -------- | ----------------- | --- | --- |
| PNRKTO.FIR  | C4          | Company  | Person's company  |     |     |
PNRKTO.PNR  N8  U  Personnel number  Person's personnel number
PNRKTO.KTO  N1  U  Account  number  Number  of  the  account  to  be
|     |     | (1 to 8)  | modified.  | The  assignment  | is  |
| --- | --- | --------- | ---------- | ---------------- | --- |
shown at the console when the
PZE accounts are configured.
| PNRKTO.KTODIFF   | N9.3  see  | Account              |     |     |     |
| ---------------- | ---------- | -------------------- | --- | --- | --- |
|                  | above      | modification         |     |     |     |
| PNRKTO.KTOSTAND  | N9.3  see  | Old account balance  |     |     |     |
above
| PNRKTO.KTOSTAND:Z  | N9.3  see  | New account  |     |     |     |
| ------------------ | ---------- | ------------ | --- | --- | --- |
|                    | above      | balance      |     |     |     |

3.2  Data record as an example of an account modification
The following example reduces the account balance of the account with the number 4 (usually a leave
account) by one day:
DLG=PNRKTO.UPDATE|PNRKTO.PNR=906000|PNRKTO.KTO=4|PNRKTO.KTODIFF=-1.0|

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 23 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

Interface Wage and Salary Programs (Payroll)
4 Interface to Payroll Accounting Programs - Summary
Summary
Menu Human Resource Management  Month-End Closing  Interface to Payroll
Accounting
Transaction code
Function authorization
The module Interface to payroll accounting is used to transfer wage types cumulated across the
settlement period to the wage and salary program. The information is written into an interface file in a
predefined formation and it can then be imported into the settlement program.
Usage
In addition, the data can be displayed on the screen and printed out on a connected printer.
In addition to the Wage type postings interface, absences can also be displayed in the Absence interface
tab when it is active.
EIS-LUG_82.docx Version: 1.0.22770 Page 24 of 129

Interface Wage and Salary Programs (Payroll)
Selection criteria
The following selection criteria are available in the application:
Year, settlement period
Settlement period for which the data is to be transferred
Toolbar
Save wage type postings
A Save as dialog opens for saving the wage type postings.
Save absences
A Save as dialog opens for saving the absences.
EIS-LUG_82.docx Version: 1.0.22770 Page 25 of 129

Interface Wage and Salary Programs (Payroll)
5 Blocking time and attendance data after end of month
When the interface file is created, the monthly events for the people concerned are marked as finished.
The function authorization PZD (PZE temporary data access) can be used as a control mechanism for
specific users to define that data can no longer be modified once the month has been settled. Here, the
authorization level determines how many months the user is allowed access:
PZD function authorization Meaning
Does not exist Unlimited access
Authorization level 1 Access to the current month
Authorization level 2 Access to the current and the previously
completed month
Authorization level 3 Access to the current and the two previously
completed months
... ...
EIS-LUG_82.docx Version: 1.0.22770 Page 26 of 129

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- |

6  Interface configuration
To make settings for the interface to the payroll accounting, you must first create an entry in the INI
configuration (System administration  System settings  Ini configuration):

Input:
| Name                 |     | HYD-LUG                       |     |     |     |
| -------------------- | --- | ----------------------------- | --- | --- | --- |
| MOC user             |     | 0                             |     |     |     |
| Comment              |     | Interface payroll accounting  |     |     |     |
| Responsibility area  |     | <empty>                       |     |     |     |

| 6.1  General configuration of the interfaces  |     |     |     |     |     |
| --------------------------------------------- | --- | --- | --- | --- | --- |
To configure the interface (System administration  System settings  INI data configuration) for the
transfer of wage types, the keys mentioned below are available. Store the keys in the function "INI data
configuration" as follows:
| INI name  | HYD-LUG  |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |

| Active    |    |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 27 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| Key              |     | Value  |     |     |     |     |     |     |     |
| ---------------- | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
| WAGETYPES_DAILY  |     | ON     |     |     |     |     |     |     |     |
Upload/confirmation of daily wage types instead
of monthly totals
| WAGETYPES_ONCE  |     | ON  |     |     |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Compression to one record per wage type. If the
compression is activated, the upload for the cost
center is empty. You must not enable this option
|     |     | together  |     | with  the  | daily  | upload  | of  | wage  | types  |
| --- | --- | --------- | --- | ---------- | ------ | ------- | --- | ----- | ------ |
(WAGETYPES_DAILY=ON).
| MONTH   |     | CURRENT / NEXT                  |     |     |            |      |       |            |      |
| ------- | --- | ------------------------------- | --- | --- | ---------- | ---- | ----- | ---------- | ---- |
|         |     | MONTH=CURRENT                   |     |     | uploads    |      | the   | data  for  | the  |
|         |     | current month (payroll month).  |     |     |            |      |       |            |      |
|         |     | MONTH=NEXT                      |     |     | transfers  | the  | next  | month      | as   |
|         |     | upload date to the interface.   |     |     |            |      |       |            |      |
The specification for this key depends on the set
|     |     | FORMAT.      |      | You        | should    | therefore  |       | set  the       | key  |
| --- | --- | ------------ | ---- | ---------- | --------- | ---------- | ----- | -------------- | ---- |
|     |     | explicitly.  |      |            |           |            |       |                |      |
|     |     | See          | the  | rules  to  | identify  | a          | date  | as  described  |      |
below.
| DAY   |     | FIRST / LAST  |     |     |     |     |     |     |     |
| ----- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- |
If the upload date includes a day, then you
transfer for DAY=FIRST the first day and for
DAY=LAST the last day of the respective
|     |     |     | month.  | The  | specification  |     |     | for  this  | key  |
| --- | --- | --- | ------- | ---- | -------------- | --- | --- | ---------- | ---- |
depends on the set FORMAT. You should
|     |     |     | therefore set the key explicitly.   |     |     |     |     |     |     |
| --- | --- | --- | ----------------------------------- | --- | --- | --- | --- | --- | --- |
See the rules to identify a date as described
below.
BALANCES_MONTH  Optional and separate options to assign dates to
BALANCES_DAY  wage  types  that  are  issued  when  transferring
account balances. The valid values correspond to

|     |     | the  | options  | MONTH  | and  | DAY.  | If  | the  options  |     |
| --- | --- | ---- | -------- | ------ | ---- | ----- | --- | ------------- | --- |
BALANCES_MONTH and BALANCES_DAY are
not set, the values of the options MONTH and
DAY are valid.
| CONSIDER_LEAVING  |     | ON/OFF  |     |     |     |     |     |     |     |
| ----------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- |

| EIS-LUG_82.docx  | Version: 1.0.22770  |     |     |     |     |     |     | Page 28 of 129  |     |
| ---------------- | ------------------- | --- | --- | --- | --- | --- | --- | --------------- | --- |

|     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --------------------------------------------- | --- | --- |

If this option is enabled and the upload date is
after the date of leaving of a person, the date of
leaving is used instead of the upload date.
COSTCENTER  OFF
The cost center is set to empty during upload. In
combination with this option, it might be useful to
|     |     | set WAGETYPES_ONCE=ON  |     | in  order  | to  have  |
| --- | --- | ---------------------- | --- | ---------- | --------- |
only one entry per wage type if the duration of
some wage types extends to several cost centers.
COSTCENTER  ON
Use this key to activate the output of the cost
center.

| 6.1.1  | Calculation rules for MONTH=xxx and DAY=xxx  |     |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- | --- |
Please note that the configuration possibilities of the options MONTH= and DAY= are based on calendar
months. If you disregard this fact, the configuration of payroll periods that are not calendar months can
issue unexpected results.
The calculation is always based on the first day of the configured payroll period (base date).
With the setting "First day of payroll month", the base date is not changed.
Please note that not all interface formats transfer the day of the payroll date.
| Setting  | Calculation            |     |      |     |     |
| -------- | ---------------------- | --- | ---- | --- | --- |
| MONTH=   | DAY=  Month or period  |     | Day  |     |     |
CURRENT  FIRST  Month that includes the first day of  Day of the first day of the configured
|     | the configured payroll period  |     | payroll period  |     |     |
| --- | ------------------------------ | --- | --------------- | --- | --- |
CURRENT  LAST  Month that includes the first day of  Last day of the calendar month that
the configured payroll period  includes the first day of the payroll period
NEXT  FIRST  Calendar month following the month  First day of the calendar month following
that includes the first day of the  the month that includes the first day of the
|     | payroll period.  |     | payroll period.  |     |     |
| --- | ---------------- | --- | ---------------- | --- | --- |
NEXT  LAST  Calendar month following the month  Last day of the calendar month following
that includes the first day of the  the month that includes the first day of the
|     | payroll period.  |     | payroll period.  |     |     |
| --- | ---------------- | --- | ---------------- | --- | --- |

Examples for the calculation of the payroll day:
Please note that not all interface formats transfer the day of the payroll date.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 29 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

Interface Wage and Salary Programs (Payroll)
Setting Configured payroll period
Calendar months: Not regular:
MONTH= DAY= 01-DEC-2014 to 31-DEC-2014 24-NOV-2014 to 23-DEC-2014
CURRENT FIRST 01-DEC-2014 24-NOV-2014 (base date, not changed)
CURRENT LAST 31-DEC-2014 30-NOV-2014 (based on calendar month)
NEXT FIRST 01-JAN-2015 01-DEC-2014 (based on calendar month)
NEXT LAST 31-JAN-2015 31-DEC-2014 (based on calendar month)
If you set the payroll periods so that the accounting is made from mid-month to mid-month
of the next month, then the period is divided into 2 payroll periods at the end of the year.
In this case, both payroll periods have the same date in December for DAY=LAST. For
MONTH=NEXT and DAY=FIRST, the two payroll periods in January have the same
problem. To solve this problem, you must add an interface extension.
EIS-LUG_82.docx Version: 1.0.22770 Page 30 of 129

    Interface Wage and Salary Programs (Payroll)

6.1.2  Configuration of the absence interface
The following keys are available to configure the interface for the transfer of absences.
| Key     |     | Value                                              |                           |           |            |              |
| ------- | --- | -------------------------------------------------- | ------------------------- | --------- | ---------- | ------------ |
| FORMAT  |     | The format is specified by the key of the monthly  |                           |           |            |              |
|         |     | wage  types.                                       | A  manufacturer-specific  |           |            | format  for  |
|         |     | the  absence                                       | interface                 | is  only  | available  | for  the     |
formats DATEV, DATEV_COMFORT, KASPAR,
LGVSOFT, LOGA, PAISY, PROLOHN, SAP45,
SAP_IT2010, TOPAS and KDVLOHN_V2 (also
new CSV format). The other formats issue the
HYDRA standard format.
| ABSENCES  |     | ON          |                       |          |                  |          |
| --------- | --- | ----------- | --------------------- | -------- | ---------------- | -------- |
|           |     | Activation  | of  the               | absence  | interface.       | The      |
|           |     | absence     | interface             | is       | only  available  | for      |
|           |     | specific    | formats               | (this    | information      | is       |
|           |     | described   | for                   | each     | interface        | in  the  |
|           |     | section     | "Confirmation/upload  |          |                  | of       |
absences").
| ABSENCES_SEPARATE_DAYS  |     | ON                |               |     |                |      |
| ----------------------- | --- | ----------------- | ------------- | --- | -------------- | ---- |
|                         |     | If  this  option  | is  enabled,  |     | the  absences  | are  |
uploaded as individual days and not as periods
from...to.
| ABSENCES_WEEKEND  |     | OFF       |               |         |           |      |
| ----------------- | --- | --------- | ------------- | ------- | --------- | ---- |
|                   |     | Usually,  | the  absence  | period  | includes  | non- |
working days when it is uploaded. You
|     |     | can                   | use  |     | the  | option       |
| --- | --- | --------------------- | ---- | --- | ---- | ------------ |
|     |     | ABSENCES_WEEKEND=OFF  |      |     |      | to  disable  |
this behavior.
| ABSENCES_PARTIAL_DAYS  |     | OFF/ONLY                   |     |     |           |      |
| ---------------------- | --- | -------------------------- | --- | --- | --------- | ---- |
|                        |     | ABSENCES_PARTIAL_DAYS=OFF  |     |     | disables  | the  |
upload of partial day absences.
|     |     | With  ABSENCES_PARTIAL_DAYS=ONLY,  |     |     |     | only  |
| --- | --- | ---------------------------------- | --- | --- | --- | ----- |
partial day absences are uploaded.
| ABSENCES_ONLY_CONFIGURED  |     | ON  |     |     |     |     |
| ------------------------- | --- | --- | --- | --- | --- | --- |
If this option is enabled, only the absences are

| EIS-LUG_82.docx  | Version: 1.0.22770  |     |     |     | Page 31 of 129  |     |
| ---------------- | ------------------- | --- | --- | --- | --------------- | --- |

Interface Wage and Salary Programs (Payroll)
uploaded that are included in the
absence processing. This way, you can
suppress unplanned absences or public
holidays that are not identified as public
holidays because of the shift type
remuneration.
6.1.3 Set person-related options
You can make different configurations of the interface HYD-LUG for specific organization characteristics
in the HR master data (e.g. per company). You distinguish between options that can be different for each
person in the interface (person-related options) and options that must be identical for the entire interface
file (global options).
In the configuration, the options that must be identical for the entire interface file (global option) can also
be defined for the company of the HR master data. But in this case, the options are identified once in the
interface on start of the interface run for the company of the first person and are then valid for all
subsequent persons. The company is the only organization characteristic that is supported with global
options.
The following person-related options are supported:
MONTH, BALANCES_MONTH, DAY, BALANCES_DAY, DATE, CUSTOMER, COMPANY,
COMPANY_SALARIED_EMPLOYEES, COMPANY_NONSALARIED_EMPLOYEES, CONTRACT,
CONSULTANT, COSTCENTER, WAGETYPES_DAILY, WAGETYPES_ONCE, ABREKZ,
ROUND_MODE.
To make a deviating setting for a specific company, you can add an organization characteristic
(=reference) and a value to the section "OPTIONS". Always use capital letters for the value. For example,
OPTIONS_FIR_KUS defines the options of the company "KuS".
The following organization characteristics/references are possible for person-related options:
Reference Explanation
FIR Company from HR master data, value in capital letters!
BER Area from HR master data, value in capital letters!
ABT Department from HR master data, value in capital letters!
KST Cost center from HR master data, value in capital letters!
PKREIS Employee subgroup from HR master data, value in capital letters!
TAETIGKEIT Activity from HR master data, value in capital letters!
BESCHVERH Employment relationship from HR master data. Values: "A" and "G"
EIS-LUG_82.docx Version: 1.0.22770 Page 32 of 129

Interface Wage and Salary Programs (Payroll)
NSTMP Option "Person does not clock" from HR master data. Values: "J" and "N"
Example of a deviating setting of the person-related key CUSTOMER for the company "BSP":
In this example, the deviating system number "4712" is entered for the company "BSP" in the interface.
You must only enter the deviating settings with person-related options. The other keys are
taken over from the general configuration.
6.2 Configurations specific to interfaces
The section "Formats for the upload/confirmation to the payroll accounting" shows and explains the
individual configurations that are specific to the interfaces. The respective subchapters give details on the
individual payroll systems.
EIS-LUG_82.docx Version: 1.0.22770 Page 33 of 129

    Interface Wage and Salary Programs (Payroll)

7  Formats used to Upload Data to  Payroll Accounting
This document describes the formats that HYDRA supports for the different payroll accounting systems.
The format is usually specified in the HYDRA configuration. This configuration is made by the person
implementing the system or the HR consultant.
7.1  HYDRA standard format
The format outlined in this chapter is issued if the customer does not set up their own format.  The
HYDRA standard format contains the uploads for monthly wage types and absences.
7.1.1 Upload of monthly wage types
The entries in the following columns for data type have the following meaning:
Type  Description
Cx  Character field with length x; left-justified; missing digit is filled with blanks;
| Nx.y  Numeric field of the length x and y decimal places.  |     |     |     |
| ---------------------------------------------------------- | --- | --- | --- |
Example: 123 in the format N7.2: 0012300
| "  "  Constant value  |     |     |     |
| --------------------- | --- | --- | --- |

The format has the following structure:
| Field            | Item  Type  | Description                      |     |
| ---------------- | ----------- | -------------------------------- | --- |
| Record type      | 1  C3       | Always "760"                     |     |
| Company          | 4  C3       | Company from the HR master data  |     |
| Area             | 7  C8       | Area from the HR master data     |     |
| Accounting year  | 15  N4      |                                  |     |
| Accounting       | 19  N2      |                                  |     |
month
| Accounting  | 21  C1  | Always empty  |     |
| ----------- | ------- | ------------- | --- |
number
| Personnel  | 22  C8  | Left-aligned, filled with blanks  |     |
| ---------- | ------- | --------------------------------- | --- |
number
Last  day  30  N2  Last day of the configured monthly period. Configuration of evaluation
evaluated  periods of the monthly evaluation in calendar months, e.g. "30" or "31".
| Wage type  | 32  C4  | Left-aligned, filled with blanks  |     |
| ---------- | ------- | --------------------------------- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 34 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
Wage type from HYDRA-PZE. Also a Payment day type can be
entered here used in HYDRA for absence planning. You can
differentiate whether this is a wage type or a payment day type
using the assignment options for the fields Hours to wage type,
Full days absent and Partial days absent described in more
detail below:
- If a value is only available in Hours, then it is a wage type.
- If a value is only available in full or partial days, then it is a
payment day type.
- If a value is available in Hours and in full or partial days,
then it is a wage type and a payment day type. In this case,
the wage type of an absence is identical to the payment day
type used for planning.
Algebraic sign 36 C1 For "Hours of a wage type", always use "+"
Hours of a wage 37 N5.2 The two decimal places are stored in industrial minutes.
type
Full days of 42 N3 Number of days with a full day absence. In field Wage type, the
absence number of the payment day type used is uploaded. If a wage type with
the same number exists, a common data record is used for the
transfer.
Partial days of 45 N3 Number of days with a partial absence. In field Wage type, the number
absence of the payment day type used is uploaded. If a wage type with the
same number exists, a common data record is used for the transfer.
Different wage 48 C3 Always empty
group
Different hourly 51 N5 Always 0
rate
Amount 56 N7 Always 0
Year of 63 N4 Always empty
successive
payment
Month of 67 N2 Always empty
successive
payment
Exec. cost center 69 C8 The person's regular cost center at the end of the accounting period
Debited Cost 77 C8 Cost center of the daily wage type postings The sum total of the wage
center types is transferred separately for each cost center.
EIS-LUG_82.docx Version: 1.0.22770 Page 35 of 129

    Interface Wage and Salary Programs (Payroll)

| Order number   | 85  C10   | Always empty  |     |     |
| -------------- | --------- | ------------- | --- | --- |
| Work sequence  | 95  C4    | Always empty  |     |     |
| Comment        | 99  C18   | Always empty  |     |     |
| Reserved for   | 117  C25  | Always empty  |     |     |
incentive wage
data
| Document  | 142  C5  | Always empty  |     |     |
| --------- | -------- | ------------- | --- | --- |
number
| Administrative  | 147  C1  | Always "1"  |     |     |
| --------------- | -------- | ----------- | --- | --- |
reference

Example file
1       10        20        30        40        50        60        70        80        90       100       110       120       130       140    147
760BSPBEREICH 199808.5001....31100.-13950000000...00000.......19980854310...54310.................................................................1
760BSPBEREICH 199808.5001....31100.+14050000000...00000.............54310...54310.................................................................1
760BSPBEREICH 199808.5001....31200.+00550000001...00000.............54310...42120.................................................................1
760BSPBEREICH 199808.5001....3130..+01600002000...00000.............54310...54310.................................................................1
760BSPBEREICH 199808.5002....31100.+19750000000...00000.............33570...33570.................................................................1

The dots stand for blanks. Each data record consists of one row. The first rows are for orientation
purposes in the data record.
| 7.1.1.1  | Interface configuration  |     |     |     |
| -------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |
Key  Value
FORMAT  HYDRA
Output format

7.1.2 Upload of absences
A separate interface file is provided for the absence times. This file is provided with the monthly wage
types. It is stored on the HYDRA server in the HYDRA directory under the name "hyfehl.dat".

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 36 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

The interface is made available as an ASCII file.  The interface has not column with.  The separator
between the columns is the semicolon.  The file complies with the CSV format and can be easily imported
into spreadsheets and other office applications.
The maximal length of the column can increase for future HYDRA versions.
| Field  | Type /  | Comment  |     |
| ------ | ------- | -------- | --- |
Max. length
| Company           | C4        | Company from the HR master data            |     |
| ----------------- | --------- | ------------------------------------------ | --- |
| Personnel number  | N8        | Without leading zeros                      |     |
| Start date        | YYYYMMTT  | First day of absence                       |     |
| End date          | YYYYMMTT  | Last day of absence                        |     |
| Reason            | N4        | Number of the payment day type of absence  |     |
times
Short name  C6  Abbreviation of the remuneration day type for
absence
| Name            | C40  | Name of the remuneration day type for absence   |     |
| --------------- | ---- | ----------------------------------------------- | --- |
| Absence reason  | C10  | Reserved, always empty                          |     |

Additional notes
  The absence periods are transferred as one data record including weekends and days off.
  If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
  If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished
when the specified time has expired and a period with another absence reason is transferred.
  Using the Control of absences, you can control which absences are transferred.
  You can transfer full-day absences and partial absences.

| EIS-LUG_82.docx  | Version: 1.0.22770  |     | Page 37 of 129  |
| ---------------- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

7.2  Abacus
7.2.1 Upload of monthly wage types
When the monthly wage types are uploaded in abacus format, the columns are separated by commas
and have no fixed width.
Example: „L001,99999,31/12/2010,1,201,,CHF,,87.1250,1,,,105,,,L001"
| No.  Column        | Contents                     |     |     |
| ------------------ | ---------------------------- | --- | --- |
| 1  Identification  | Fixed „L001“                 |     |     |
| 2  Personnel       | Personnel number from HYDRA  |     |     |
number
3  Date  First day of the consecutive month in format DD/MM/YY
4  1 (consecutive  Average type from the wage type configuration
number)
| 5  Wage type  | Wage type from HYDRA  |     |     |
| ------------- | --------------------- | --- | --- |
| 6  empty      | empty                 |     |     |
| 7  Currency   | ISO code CHF          |     |     |
| 8  empty      | empty                 |     |     |
9  Hours  In decimal notation with period as decimal separator, with 4 decimal
places.
| 10  1            | Fixed „1“    |     |     |
| ---------------- | ------------ | --- | --- |
| 11  empty        | empty        |     |     |
| 12  empty        | empty        |     |     |
| 13  Cost center  | Cost center  | >   |     |
of the wage type posting
| 14  empty  | empty  |     |     |
| ---------- | ------ | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 38 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| 15  empty           |     | empty         |     |
| ------------------- | --- | ------------- | --- |
| 16  Identification  |     | Fixed „L001“  |     |

| 7.2.1.1  | Interface configuration  |     |     |
| -------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |
Key  Value
FORMAT  ABACUS
Output format

| 7.3  Exakt LohnXL / XXL  |     |     |     |
| ------------------------ | --- | --- | --- |
This chapter outlines the upload process of monthly wage types to the payroll accounting system Exact
LohnXL / XXL.
7.3.1 Upload of monthly wage types

Legend:
A(n)  Alphanumeric, maximum with n digits
N(n)  Numeric with digits
N(n,i) Numeric with n digits, of which i are decimal places. The dot is the decimal separator.
  Total length of the field is then n+1.
  Example: A field N(4,2) reads "03.21". This is the number 3,21.

K(n)  Constant text of length n

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 39 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| Field name  | Data  type  | /  Item  Contents  | Example  |
| ----------- | ----------- | ------------------ | -------- |
format
Personnel number  N(6)  1  Personnel number with leading zeros  014234
Entry date  YYYYMMD 7  First day of the consecutive month   19990901
D
Accounting date  YYYYMMD 15  First day of the consecutive month   19990901
D
| Wage type       | A(3)  | 23  Wage type     | "035"  |
| --------------- | ----- | ----------------- | ------ |
| Processing ID   | K(2)  | 26  always "99"   | "99"   |
| Algebraic sign  | K(1)  | 28  constant "+"  | "+"    |
Einheit  N(11,3)  29  Duration of the wage type with 8 places  00000138.250
before and 3 after the decimal point and a
period as separator.
Record per entry  K(12)  41  constant "+00000000.00"  "00000000.00"
| Amount       | K(12)  | 53  constant "+00000000.00"  | "00000000.00"  |
| ------------ | ------ | ---------------------------- | -------------- |
| Cost center  | A(8)   | 65  Cost center              | "4711    "     |
Cost object  K(12)  73  constant "             "  "              "
| Unit 2  | K(13)  | 85  constant "+0000000.000"  | "00000000.000"  |
| ------- | ------ | ---------------------------- | --------------- |
Space bar  K(30)  98  constant "                        "  "                         "
| Line feed  | K(1)  | 128  constant line feed  |     |
| ---------- | ----- | ------------------------ | --- |

Note:
Wage types are alphanumeric in HYDRA and are transferred to the interface how they
are created in HYDRA.  If leading zeros are required before the wage type, the user has
to enter these in HYDRA.
| 7.3.1.1  Interface configuration  |     |     |     |
| --------------------------------- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 40 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |
Key  Value
FORMAT  C wage
Output format

| 7.4  CSS fixed wage   |     |     |     |
| --------------------- | --- | --- | --- |
7.4.1 Upload of monthly wage types

Data set to transfer monthly wage types to the CSS fixed wage has to following structure:
| Field name  | Data  | type  /  Contents  | Example  |
| ----------- | ----- | ------------------ | -------- |
format
| Company number  | N(4)  | Company number of the person  | 1111  |
| --------------- | ----- | ----------------------------- | ----- |
Personnel number  N(5)  Personnel  number  from  HYDRA.  (The  12345
personnel number has 8 digits in HYDRA and
only the last 5 digits are transferred.
Period of accounting  DDMMYYY Accounting period = last of the month  2009-02-28
Y
| Wage type  | N(4)  | Wage type number  | 100  |
| ---------- | ----- | ----------------- | ---- |
Record date of the  DDMMYYY Record date of the document  2009-02-01
| document  | Y   |     |     |
| --------- | --- | --- | --- |
Valid from  DDMMYYY Reference start of the the wage type  2009-02-01
Y
Valid until  DDMMYYY Reference end of the wage type  2009-02-28
Y

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 41 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| Account no.   | N(8)  | Financial accounting /fixed "0"  | 0   |
| ------------- | ----- | -------------------------------- | --- |
| Cost type     | N(8)  | Cost type / fixed "0"            | 0   |
Executing cost center  N(8)  Cost center of the person  48723
Cost center  N(8)  Cost center of the wage type postings  48723
| Cost object  | A(16)  | Cost object / fixed„0“  | 0   |
| ------------ | ------ | ----------------------- | --- |
OP 1  N(7,2)  Monthly sum total of time posted for the wage  128.00
type.
| OP 2  | N(7,2)  | Fixed "0.0"           | 0.0  |
| ----- | ------- | --------------------- | ---- |
| OP 3  | N(7,2)  | Fixed "0.0"           | 0.0  |
| OP 4  | N(7,2)  | Fixed "0.0"           | 0.0  |
| OP 5  | N(7,2)  | Fixed "0.0"           | 0.0  |
| RKZ   | N(1)    | Error ID / fixed "0"  | 0    |

The data record is finished via carriage return and linefeed (CRLF).
Example:
101^906000^2009-03-31^100^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^3.00^0.0^0.0^0.0^0.0^0^
101^906000^2009-03-31^142^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^2.00^0.0^0.0^0.0^0.0^0^
101^906000^2009-03-31^470^2009-02-01^2009-02-01^2009-02-28^0^0^    5187^    5187^0^4.00^0.0^0.0^0.0^0.0^0^
| 7.4.1.1  | Interface configuration  |     |     |
| -------- | ------------------------ | --- | --- |

The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 42 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT CSSFIX
Output format
7.5 DATEV (LODAS)
The header interface provides the following information:
[General]
Target=LODAS (target)
ConsultantNo=<xxx> (tax consultant)
ClientNo=<xxx> (client)
Field separator=; (field separator)
Number comma=, (number separator)
Date format=DD. MM.YYYY (date format)
Record description]1
1;u_lod_bwd_buchung_standard;pnr#bwd;abrechnung_zeitraum#bwd;la_eigene#bwd;bs_wert_bu
tab#bwd;bs_nr#bwd;kostenstelle#bwd;
You can set the tax consultant number and the client number per customer via the HYDRA configurator.
Legend:
A(n) Alphanumeric, maximum with n digits
N(n) Numeric with digits
N(n,i) Numeric with n digits, of which i are decimal places Example A field N(4,2) contains "13,21". This is
the number 13,21.
K constant text
7.5.1 Upload of monthly wage types
The monthly wage types are uploaded with the following format:
Field name Data type / Contents Example
format
Record type N (=night) Number of the record type in relation to the 1
formats in the [Record Description] section
EIS-LUG_82.docx Version: 1.0.22770 Page 43 of 129

Interface Wage and Salary Programs (Payroll)
Table name K For monthly wage types constant "u_lod…"
"u_lod_bwd_buchung_standard"
Personnel number N(5) Personnel number (max. 5 digits, if the 41
personnel number are greater, then the last 5
digits are transferred).
Accounting DDMMYYYY Accounting month date 2007-12-01
time
Processing key N(2) The processing key can be set in the 01
configuration of wage types in the control
identifier field with 'BS' in the front (e.g. BS02,
available from hylobu version 8.1.1.212).
The specification is 01 = hours
Wage type N(3) The wage type must be numeric and can have "100"
a maximum of 3 digits.
Value N(11,2) Duration of the wage type with 2 decimal 173.75
numbers
Cost center A(8) Cost center (max. 8 digits) "415687"
The data is in the section [transaction data]. The different fields are separated by a semicolon (;). This
separator also appears at the end of the row.
Example:
[transaction data]
1;96665;01.01.2008;01;100;85,90;5187;
1;96665;01.01.2008;01;450;80,00;5187;
1;96665;01.01.2008;01;526;11,00;5187;
1;96665;01.01.2008;01;600;8,00;5187;
7.5.1.1 Interface configuration
The interface format is then enabled via INi data configuration (System administration  System settings
 INi data configuration). The following settings are made:
EIS-LUG_82.docx Version: 1.0.22770 Page 44 of 129

    Interface Wage and Salary Programs (Payroll)

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 45 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT DATEV
Output format
CUSTOMER or COMPANY For DATEV formats, the client to be
or COMPANY_NONSALARIED_EMPLOYEES and transferred must be set using this key.
COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=DATEV, the tax consultant
number that must be transferred must be set
via this key.
LEAVE_DAYS The number of holidays is confirmed using the
wage type set here. In the case of DATEV, the
entry LEAVE_DAYS=BS71 causes the
holidays to be transferred without a wage type
with processing key 71.
ILLNESS_DAYS The number of sick days is determined by the
number set here. In the case of DATEV, the
entry ILLNESS_DAYS=BS72 causes the sick
days to be transferred without a wage type
with the processing key 72. Whole and half
days of absence are uploaded, whereby an
absence of 3.5 hours or more counts as half a
day. Illness is interpreted as all absences that
are assigned to one of the two categories LFZ
(sickness with continued pay) or LFZ (sickness
without continued pay) when processing the
absences.
ROUND_MODE If you use interfaces FORMAT= DATEV the
hours are rounded commercially. If required,
you can enable the option
ROUND_MODE=FLOOR to cut off the decimal
places of the hours of a wage type (cut off =
EIS-LUG_82.docx Version: 1.0.22770 Page 46 of 129

Interface Wage and Salary Programs (Payroll)
round down).
7.5.2 Upload of absences
The following fields are transferred with the absence times:
Field name Data type / Contents Example
format
Record type N (=night) Number of the record type in relation to the 2
formats in the [Record Description] section
Table name K For absences constant "u_lod_bwd_fehlzeiten" "u_lod…"
Personnel number N(5) Personnel number (max. 5 digits, if the 41
personnel number are greater, then the last 5
digits are transferred).
Date from DDMMYYYY Start date of the absence 2007-12-14
Date to DDMMYYYY End date of the absence 2007-12-17
Reason N(3) Absence reason (number of the payed leave, 450
may. 3 digits)
There is a separate entry with record type 2 for absences in the section [Record description].
The data is in the section [transaction data]. The different fields are separated by a semicolon (;). This
separator also appears at the end of the row.
Example:
[record description]
2;u_lod_bwd_fehlzeiten;pnr#bwd;datum_von_ttmmjjjj#bwd;datum_bis_ttmmjjjj#bwd;grund_fe
hlzeiten#bwd;
[Bewegungsdaten]
2;96665;01.01.2008;01.01.2008;600;
2;96665;07.01.2008;11.01.2008;450;
2;96665;14.01.2008;18.01.2008;450;
EIS-LUG_82.docx Version: 1.0.22770 Page 47 of 129

Interface Wage and Salary Programs (Payroll)
7.5.2.1 Interface configuration
Key Value
FORMAT DATEV
The key of the monthly wage types also
specifies the format. A manufacturer-specific
format for the absence interface is only
available for the format DATEV_COMFORT.
The other formats issue the HYDRA standard
format.
ABSENCES_SEPARATE_FILE ON
In case of the DATEV format, the absences
are written in the same file as the wage types.
You can use this option to specify that also
with these formats the absences are written in
a separate file using the name hyfehl.dat.
7.6 DATEV comfort
When the "DATEV Lohn und Gehalt Comfort" interface is called up, 2 files are written to the Hydra
system directory on the shop floor scheduling. In addition to the file with the wage type postings, an INI
file with the format description is created. The interface files are text files containing one record per row:
datev_comfort.ini
INI file with format descriptions for importing time management data.
hylobu.dat
Interface file to transfer the wage types. The file contains contains coummulated data for one
calendar month and for each person.
7.6.1 Upload of monthly wage types
There are the following formats for the separate field types:
A(n) Alphanumeric, with n digits
EIS-LUG_82.docx Version: 1.0.22770 Page 48 of 129

Interface Wage and Salary Programs (Payroll)
N(n) Numeric with n digits
N(n,i) Numeric with n digits, of which i are decimal places
Example A field N(7,2) contains "3,21".
7.6.2 Datev_comfort.ini
INI file with format descriptions for importing time management data.
[General]
Field number = 11
Field separator = semicolon
Record separator = enter/return
Number separator = ,
Date separator = /
[Field content]
Field1 = Personnel number
Field2 = Calendar day
Feld3 = Downtime key
Field4 = Wage type numbers
Field5 = Number of hours
Field6 = Number of days
Field7 = Value
Field8 = Deviating factor
Field9 = Deviating wage change
Field10 = Cost center number
Field11 = Cost object
7.6.3 hylobu.dat
Only postings for monthly data entry are output - for this reason the fields "Downtime key, "Calendar day",
"Number of hours" and "Number of days" are empty.
The Datev interface has separated fields due to the semicolon.
The file contains a header line so that the time management data of several clients and different
accounting months can be recognized in a tax office:
Field Type Meaning
Tax consultant number N7 Unique identifier for a tax consultant,
value range from 1000 to 9999999
Client number N5 Unique identifier of a client in a tax office, value range from 1 to
99999
Accounting date C7 Month and year for which transaction data is provided. Format:
MM/YYYY
EIS-LUG_82.docx Version: 1.0.22770 Page 49 of 129

    Interface Wage and Salary Programs (Payroll)

Data format of the wage transaction data
| Field  | Type  | Meaning  |     |
| ------ | ----- | -------- | --- |
Personnel number  N5  Unique indicator for an employee of a client, value range from
1 to 99999. HYDRA possible transfers the last five digits.
| Calendar day  | N2  | Must remain empty to collect the month.   |     |
| ------------- | --- | ----------------------------------------- | --- |
| Downtime key  | C2  | Must remain empty to collect the month.   |     |
| Wage type     | N4  | Wage type from HYDRA                      |     |
The Datev value range is from 1 to 5999 and from 9000 to
9999.  The value range must be included in the configuration of
wage types.
Number of hours  N  Must remain empty to collect the month.
(=night)
| Number of days  | N   | Must remain empty to collect the month.   |     |
| --------------- | --- | ----------------------------------------- | --- |
(=night)
Value  N5.2  Duration  of the  wage type The last two digits are decimal
places.  Example: 30 hours and 45 minutes result in a field
content of "+030.75".
| Deviating factor  | N5.2        | Empty  |     |
| ----------------- | ----------- | ------ | --- |
| Deviating         | wage  N5.2  | Empty  |     |
changes
Cost center number  C8  Assignement of cost center for posting
| Cost object  | C8  | Empty  |     |
| ------------ | --- | ------ | --- |

| Note: Errors in DATEV  |     |     |     |
| ---------------------- | --- | --- | --- |
If the maximum field  length is exceeded or  if the contents of mandatory fields are
incorrect, the incorrect data records are not read in Datev. The relevant place in the file is
output as row (and column) number in a log record in Datev. Data records with correct
format, but incorrect contents are read and can be displayed and corrected in a dialog in
Datev.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 50 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| 7.6.4  | Example file  |     |     |
| ------ | ------------- | --- | --- |
253154;1000;01/2009
9;;;1000;;;150.00;;;5187;
9;;;1100;;;2.00;;;4711;
9;;;41;;;13.50;;;4711;
9;;;450;;;4.00;;;5187;
9;;;51;;;0.08;;;4711;
9;;;600;;;16.00;;;5187;
| 7.6.4.1  | Interface configuration  |     |     |
| -------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 51 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT DATEV_COMFORT
Output format
CUSTOMER or COMPANY For DATEV formats, the client to be transferred
or COMPANY_NONSALARIED_EMPLOYEES must be set using this key.
and COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=DATEV, the tax consultant
number that must be transferred must be set via
this key.
ROUND_MODE If using the interface FORMAT=
DATEV_COMFORT, the hours are rounded
(arithmetic rounding). If required, you can enable
the option ROUND_MODE=FLOOR to cut off the
decimal places of the hours of a wage type (cut
off = round down).
7.6.4.2 Interface configuration
Key Value
FORMAT DATEV_COMFORT
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the format
DATEV_COMFORT. The other formats issue the
HYDRA standard format.
ABSENCES_SEPARATE_DAYS ON
If this option is enabled, the absences are
uploaded as separate days and not as periods
from...to. If the absences are transferred in the
format PROLOHN and DATEV_COMFORT, this
EIS-LUG_82.docx Version: 1.0.22770 Page 52 of 129

Interface Wage and Salary Programs (Payroll)
option must be enabled because the interface
format only provides a date field.
7.7 eGecko (CSS)
eGecko is the follow-up product of CSS Fixlohn. The interfaces are similar.
The different fields are separated by a semicolon (;). The data record is finished via carriage return and
linefeed (CRLF).
Important:
To separate fields, HYDRA uses the semicolon (;), which is different to the standard settings of eGecko.
In eGecko, you must therefore change the default field separator circumflex (^) to a semicolon in the
interface import settings.
To encode characters, HYDRA uses UTF-8 without BOM. You can configure the character encoding in
the eGecko interface program. Here, the default is CP1252 (Windows-1252).
7.7.1 Upload of monthly wage types
Column P – Mandatory field Y (yes) / N (no)
The data record to transfer monthly wage types to eGecko has the following structure:
Field / attribute Type P Description Example
FIRMANR String N HYDRA’s company number of the person BSP
(=n
igh
t)
MITARBEITERNR String J Personnel number from HYDRA 12345
(employee number)
APER String J Date of accounting period DD.MM.YYYY 2012-02-01
The contents can be configured in
HYDRA. By default, it is the first day of the
consecutive month.
LOHNARTNR (wage String J Wage type number 100
type number)
DATE Date J Document date DD.MM.YYYY. Last day of 2012-01-31
the accounting month
Date from Date N Date from. The date must be included in <empty>
(=n the month/year of APER. Is not filled by
igh HYDRA.
t)
EIS-LUG_82.docx Version: 1.0.22770 Page 53 of 129

Interface Wage and Salary Programs (Payroll)
Date to Date N Date to. The date must be included in the <empty>
(=n month/year of APER. Is not filled by
igh HYDRA.
t)
PLATZHALTER String N Is ignored <empty>
(placeholder) (=n
igh
t)
KOSTENART (wage String N Empty <empty>
type) (=n
igh
t)
PLATZHALTER String N Is ignored <empty>
(placeholder) (=n
igh
t)
KOSTENSTELLE (cost String N Cost center of the wage type postings 48723
center) (=n
igh
t)
KOSTENTRAEGER String N Cost object <empty>
(cost object) (=n
igh
t)
PARAMETER1 Decimal J Monthly sum total of time posted for the 128.75
wage type.
PARAMETER2 Decimal N Parameter 2 of the wage type <empty>
(=n
igh
t)
PARAMETER3 Decimal N Parameter 3 of the wage type <empty>
(=n
igh
t)
PARAMETER4 Decimal N Parameter 4 of the wage type <empty>
(=n
igh
t)
PARAMETER5 Decimal N Parameter 5 of the wage type <empty>
(=n
igh
t)
HKZ Decimal N Not used <empty>
(=n
igh
t)
Example:
001;1006;2016-02-01;099;2016-01-31;;;;;;419012;;133.20;;;;;;
001;1006;2016-02-01;101;2016-01-31;;;;;;419012;;133.20;;;;;;
001;1006;2016-02-01;221;2016-01-31;;;;;;419012;;37.00;;;;;;
001;1006;2016-02-01;223;2016-01-31;;;;;;419012;;7.40;;;;;;
001;1006;2016-02-01;330;2016-01-31;;;;;;419012;;7.40;;;;;;
001;1006;2016-02-01;331;2016-01-31;;;;;;419012;;14.80;;;;;;
001;1007;2016-02-01;330;2016-01-31;;;;;;419072;;7.40;;;;;;
001;1007;2016-02-01;331;2016-01-31;;;;;;419072;;148.00;;;;;;
EIS-LUG_82.docx Version: 1.0.22770 Page 54 of 129

Interface Wage and Salary Programs (Payroll)
001;1008;2016-02-01;093;2016-01-31;;;;;;7000;;148.00;;;;;;
001;1008;2016-02-01;101;2016-01-31;;;;;;7000;;148.00;;;;;;
001;1008;2016-02-01;330;2016-01-31;;;;;;7000;;7.40;;;;;;
001;1015;2016-02-01;099;2016-01-31;;;;;;419011;;140.60;;;;;;
001;1015;2016-02-01;101;2016-01-31;;;;;;419011;;140.60;;;;;;
001;1015;2016-02-01;221;2016-01-31;;;;;;419011;;37.00;;;;;;
001;1015;2016-02-01;223;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1015;2016-02-01;234;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1015;2016-02-01;330;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1021;2016-02-01;099;2016-01-31;;;;;;419011;;148.00;;;;;;
001;1021;2016-02-01;101;2016-01-31;;;;;;419011;;148.00;;;;;;
001;1021;2016-02-01;221;2016-01-31;;;;;;419011;;74.00;;;;;;
001;1021;2016-02-01;330;2016-01-31;;;;;;419011;;7.40;;;;;;
001;1022;2016-02-01;099;2016-01-31;;;;;;419098;;133.20;;;;;;
7.7.1.1 Interface configuration
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:
INI name HYD-LUG
Section OPTIONS
Key xxxxxx
Value xxxxxx
Active 
Key Value
FORMAT C wage
Output format
ABSENCES ON
MONTH CURRENT
DAY LAST
7.7.2 Upload of absences
Column P – Mandatory field Y (yes) / N (no)
HYDRA does not support to cancel data records.
The data record to transfer absences to eGecko has the following structure:
Field / attribute Type P Description Example
MITARBEITERNR String J Personnel number from HYDRA 12345
(employee number)
ZEITART (time type) String J Absence reason. Number of the payment URL
day type or absence reason defined in the
Control of absences for the payroll
accounting.
EIS-LUG_82.docx Version: 1.0.22770 Page 55 of 129

Interface Wage and Salary Programs (Payroll)
VONDATUM (date Date J Date from DD.MM.YYYY 2016-02-15
from)
VONDATUM (date Date J Date to DD.MM.YYYY 2016-02-29
from)
STORNO (cancellation String N Is left empty by HYDRA. (D is reserved for
record) (=n cancellations).
igh
t)
Additional notes
 The absence periods are transferred as one data record including weekends and days off.
 If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
 If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished
when the specified time has expired and a period with another absence reason is transferred.
 Using the Control of absences, you can control which absences are transferred.
 You can transfer full-day absences and partial absences.
Example:
1006;LFZ krank;28.01.2016;31.01.2016;;
1007;LFZ krank;04.01.2016;08.01.2016;;
1007;LFZ krank;09.01.2016;22.01.2016;;
1007;LFZ krank;25.01.2016;29.01.2016;;
1015;234;2016-01-15;2016-01-15;;
1022;700;2016-01-25;2016-01-25;;
1031;LFZ krank;18.01.2016;22.01.2016;;
1033;700;2016-01-25;2016-01-25;;
1042;Krankengel;01.01.2016;08.01.2016;;
1042;Krankengel;09.01.2016;15.01.2016;;
1042;Krankengel;16.01.2016;25.01.2016;;
7.8 FOSS-Lohn (ORDAT)
7.8.1 Upload of monthly wage types
The interface for transferring monthly wage types to FOSS Lohn (wage accounting system) from ORDAT
contains fields with a fixed record length. For each person, one header record and one or more data
records are written to the interface file.
There are the following formats for the separate field types:
EIS-LUG_82.docx Version: 1.0.22770 Page 56 of 129

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |

| -  <x>n:  |     |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- |
Numeric- with leading zeros
| -  <x>a:  |     |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- |
Alphanumeric x-digits followed by a space.
| Note:    |     |     |     |     |     |     |
| -------- | --- | --- | --- | --- | --- | --- |
When using this interface, only numeric companies, cost centers and wage types are
allowed in HYDRA.
The header record has the following structure:
| Field name  | Data  typ/  | Contents  |     |     | Example  |     |
| ----------- | ----------- | --------- | --- | --- | -------- | --- |
format
| Record type  | 2a  | constant "SE"  |     |     | SE  |     |
| ------------ | --- | -------------- | --- | --- | --- | --- |
Company number  6n  Company number with leading zerors (the  000100
|     |     | company  | number  has  | four  digits  | in  |     |
| --- | --- | -------- | ------------ | ------------- | --- | --- |
HYDRA).
| Filler  | 17n  | constant 17 zeros  |     |     | 00000000000000 |     |
| ------- | ---- | ------------------ | --- | --- | -------------- | --- |
000
Company number  6n  Company number with leading zerors (the  000100
|     |     | company  | number  has  | four  digits  | in  |     |
| --- | --- | -------- | ------------ | ------------- | --- | --- |
HYDRA).
| Filler  | 1a  | constant 1 space           |     |     | " "     |     |
| ------- | --- | -------------------------- | --- | --- | ------- | --- |
| Filler  | 1n  | constant 0                 |     |     | 0       |     |
| Filler  | 4n  | constant 9999              |     |     | 9999    |     |
| Filler  | 4n  | constant 0000              |     |     | 0000    |     |
| Filler  | 2n  | constant 11                |     |     | 11      |     |
| Filler  | 1n  | constant 4                 |     |     | 4       |     |
| Filler  | 6n  | constant 000000            |     |     | 000000  |     |
| Month   | 2n  | Payroll month              |     |     | 07      |     |
| Year    | 2n  | Payroll year (two digits)  |     |     | 00      |     |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     | Page 57 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |

| Filler  | 4n  | constant 0000  |     |     | 0000  |     |
| ------- | --- | -------------- | --- | --- | ----- | --- |

The data record has the following structure:
| Field name  | Data type/  | Contents  |     |     | Example  |     |
| ----------- | ----------- | --------- | --- | --- | -------- | --- |
format
| Record type  | 2a  | constant "S5"  |     |     | S5  |     |
| ------------ | --- | -------------- | --- | --- | --- | --- |
Company number  6n  Company number with leading zerors (the  000100
|     |     | company  | number  | has  four  digits  | in  |     |
| --- | --- | -------- | ------- | ------------------ | --- | --- |
HYDRA).
| Filler        | 5n  | constant 00000         |     |     | 00000     |     |
| ------------- | --- | ---------------------- | --- | --- | --------- | --- |
| Filler        | 2n  | constant 00            |     |     | 00        |     |
| Change field  | 8n  | Deviating hour record  |     |     | 00000000  |     |
constant 00000000
Decimal  value  /  8n  Duration of the wage type in decimal hours  00003250
| hours           |     | with two decimal places.   |     |     |      |     |
| --------------- | --- | -------------------------- | --- | --- | ---- | --- |
| Algebraic sign  | 1a  | constant 1 space           |     |     | " "  |     |
Wage type  5n  Wage type with leading zeros (the wage  01100
type has 4 characters in HYDRA)
| Cost center  | 8n  | Cost center with leading zeros  |     |     | 00234511  |     |
| ------------ | --- | ------------------------------- | --- | --- | --------- | --- |
Personnel number  5n  Personnel number (The personnel number  08142
has 8 digits in HYDRA. The last five digits
of the personnel are transferred).  HYDRA
possible transfers the last five digits.
| Date from  | 4n  | constant 0000  |     |     | 0000  |     |
| ---------- | --- | -------------- | --- | --- | ----- | --- |
| Date to    | 4n  | constant 0000  |     |     | 0000  |     |

| 7.8.1.1  Interface configuration  |     |     |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     | Page 58 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |
Key  Value
FORMAT  FOSS
  Output format
ROUND_MODE   With the interface FORMAT= FOSS, the hours
are rounded (arithmetic rounding). If required, you
can enable the option ROUND_MODE=FLOOR to
cut off the decimal places of the hours of a wage
type (cut off = round down).

| 7.9  GENERIC  |     |     |     |
| ------------- | --- | --- | --- |
7.9.1 Upload of monthly wage types
Available as of hylobu version 8.1.1.220.
This format is a generic standard format in the HYDRA PDM list format. A large number of data columns
are output, which can be provided by HYDRA PZW.
The primary purpose of this format is used by MPDV as a starting point for further processing of
customizations. However, this format can also be used by customers for further processing by customer-
specific software or payroll accounting programs.
The file consists of a header line with column names and the following data rows:
The  columns  have  no  specific  width  and  separator  is  the  pipe  "|".  Date  fields  are  in  the  format:
MM/DD/YYYY. Decimal separator for floating point numbers is the point.  The maximal length of the
column can increase for future HYDRA versions.
Note: The order is not fixed.  MPDV can at all times enter additional columns or change the
order.  Therefore, bear in mind the header row when evaluating data.

| Field  | Type  | Contents  |     |
| ------ | ----- | --------- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 59 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
PNR N HR master data: pesonnel number
(=night)
PNAME A HR master data: last name
PVORNAME A HR master data: first name of a person
PVORNAME_2 A HR master data: middle name of the person
PFIR A HR master data: company
PBER A HR master data: area
PKST A HR master data: cost center
PABT A HR master data: department
PKREIS A HR master data: employee subgroup
Entry D Master data: date of entry
Leaving D HR master data: leaving date
BESCHVERH A HR master data: employment relationship
GEBDAT D HR master data: date of birth
INFOTXT_1 A HR master data: free configurable info field from the HR master data
INFOTXT_2 A HR master data: free configurable info field from the HR master data
INFOTXT_3 A HR master data: free configurable info field from the HR master data
INFOTXT_4 A HR master data: free configurable info field from the HR master data
INFOTXT_5 A HR master data: free configurable info field from the HR master data
INFOTXT_6 A HR master data: free configurable info field from the HR master data
INFOTXT_7 A HR master data: free configurable info field from the HR master data
INFOTXT_8 A HR master data: free configurable info field from the HR master data
INFOTXT_9 A HR master data: free configurable info field from the HR master data
INFOTXT_10 A HR master data: free configurable info field from the HR master data
INFOTXT_11 A HR master data: free configurable info field from the HR master data
INFOTXT_12 A HR master data: free configurable info field from the HR master data
INFOTXT_13 A HR master data: free configurable info field from the HR master data
INFOTXT_14 A HR master data: free configurable info field from the HR master data
INFOTXT_15 A HR master data: free configurable info field from the HR master data
INFOTXT_16 A HR master data: free configurable info field from the HR master data
INFOTXT_17 A HR master data: free configurable info field from the HR master data
INFOTXT_18 A HR master data: free configurable info field from the HR master data
INFOTXT_19 A HR master data: free configurable info field from the HR master data
INFOTXT_20 A HR master data: free configurable info field from the HR master data
INFOWERT_1 N HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_2 N HR master data: free configurable info field from the HR master data
(=night)
EIS-LUG_82.docx Version: 1.0.22770 Page 60 of 129

|     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --------------------------------------------- | --- | --- |

INFOWERT_3  N  HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_4  N  HR master data: free configurable info field from the HR master data
(=night)
INFOWERT_5  N  HR master data: free configurable info field from the HR master data
(=night)
INFODAT_1  D  HR master data: free configurable info field from the HR master data
INFODAT_2  D  HR master data: free configurable info field from the HR master data
INFODAT_3  D  HR master data: free configurable info field from the HR master data
INFODAT_4  D  HR master data: free configurable info field from the HR master data
INFODAT_5  D  HR master data: free configurable info field from the HR master data
LART  A  Wage type from HYDRA-PZE. Also a Payment day type can be entered
here that is used in HYDRA for absence planning. You can differentiate
between a wage type and a remuneration day type by referring to the
|     | fields  | TERM_ANW,  | TERM_FEAR,  | FEARDAYS  | and  |
| --- | ------- | ---------- | ----------- | --------- | ---- |
PARTIAL_FEARDAYS described below:
-  If there is only a value in DAUER_ANW und DAUER_FEHL ,
then it is a wage type.
-  If a value is only available in full or half days, then it is a payment
day type.
-  If a value exists in DURATION_ANW, DURATION_FEHL as well
as in the full or half days, then it is both a wage type and a
remuneration day type.  In this case, the wage type of an
absence is identical to the payment day type used for planning.
| LGRP  A       | Wage group (not used in the standard)      |     |     |     |     |
| ------------- | ------------------------------------------ | --- | --- | --- | --- |
| KST  A        | Cost center                                |     |     |     |     |
| DAUER_ANW  N  | Duration from attendance times in seconds  |     |     |     |     |
(=night)
| DAUER_FEHL  N  | Duration from absences in seconds  |     |     |     |     |
| -------------- | ---------------------------------- | --- | --- | --- | --- |
(=night)
ZEITGRAD  N  Performance efficiency rate multiplied by factor 1000 (not used in the
(=night)  standard system)
FEHLTAGE  N  Number of days with a full day absence. In field Wage type, the number
(=night)  of the payment day type used is uploaded. If a wage type with the same
number exists, a common data record is used for the transfer.
TEILFEHLTAGE  N  Number of days with a partial absence. In field Wage type, the number of
(=night)  the payment day type used is uploaded. If a wage type with the same
number exists, a common data record is used for the transfer.
| DAT_VON  D   | Start date of the accounting period       |     |     |     |     |
| ------------ | ----------------------------------------- | --- | --- | --- | --- |
| DAT_BIS  D   | Last date of the accounting period        |     |     |     |     |
| LOHNSATZ  N  | Wage record (constant 0 in the standard)  |     |     |     |     |
(=night)
| LOHNBETRAG   N  | Wage amount (0 constant in the standard)  |     |     |     |     |
| --------------- | ----------------------------------------- | --- | --- | --- | --- |
(=night)
DATE  D  Posting date of the data Default is the start of the accounting period
| LART_AVGART  A  | Average type from the wage type master data  |     |     |     |     |
| --------------- | -------------------------------------------- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 61 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |

LART_LOBU_MOD  A  Control characteristic for payroll accounting from the wage type master
data
KST_ORIG  A  Original cost center from the monthly wage type (not replaced by the cost
center for payroll accounting from the cost center master data)
KST_LOBU_KST  A  Cost center for the payroll accounting from the master data cost center
KST_LOBU_MOD  A  Control characteristic for payroll accounting from the cost center master
data
| ANR  | A   | Order and operation number (empty in the standard)  |     |     |     |     |
| ---- | --- | --------------------------------------------------- | --- | --- | --- | --- |
KTOSTAND_1  N  Account balance of the person from account no. 1 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_2  N  Account balance of the person from account no. 2 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_3  N  Account balance of the person from account no. 3 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_4  N  Account balance of the person from account no. 4 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_5  N  Account balance of the person from account no. 5 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_6  N  Account balance of the person from account no. 6 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_7  N  Account balance of the person from account no. 7 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
KTOSTAND_8  N  Account balance of the person from account no. 8 at the end of the
(=night)  accounting period (in seconds or, in the case of day accounts, multiplied
by the account factor).
TAGE_ANW  N  Total number of attendance days for the person in the payroll period
(=night)
AZ_ANW  N  Total number of attendance time of the person in the accounting period in
|     | (=night)  | seconds.   |     |     |     |     |
| --- | --------- | ---------- | --- | --- | --- | --- |

Example file
PF666666666666666 NO666666666666666 RD777777777777777 |A||||||||||||||| NTSSSSSSSSSSSSSSS A_ccccccccccccccc M4hhhhhhhhhhhhhhh E|uuuuuuuuuuuuuuu |Illlllllllllllll PNzzzzzzzzzzzzzzz VF||||||||||||||| OOCCCCCCCCCCCCCCC RDhhhhhhhhhhhhhhh NArrrrrrrrrrrrrrr ATiiiiiiiiiiiiiii M_sssssssssssssss E5ttttttttttttttt ||iiiiiiiiiiiiiii PLaaaaaaaaaaaaaaa VAnnnnnnnnnnnnnnn OR||||||||||||||| RT||||||||||||||| N|BBBBBBBBBBBBBBB ALSSSSSSSSSSSSSSS MGPPPPPPPPPPPPPPP ER||||||||||||||| _PVVVVVVVVVVVVVVV 2|IIIIIIIIIIIIIII |K||||||||||||||| PS555555555555555 FT111111111111111 I|888888888888888 RD777777777777777 |A||||||||||||||| PUVVVVVVVVVVVVVVV BEIIIIIIIIIIIIIII ERVVVVVVVVVVVVVVV R_BBBBBBBBBBBBBBB |A111111111111111 PN||||||||||||||| KWAAAAAAAAAAAAAAA S|zzzzzzzzzzzzzzz TDuuuuuuuuuuuuuuu |Abbbbbbbbbbbbbbb PUiiiiiiiiiiiiiii AE||||||||||||||| BR000000000000000 T_444444444444444 |F/////////////// PE000000000000000 KH111111111111111 RL/////////////// E| IZ SE999999999999999 |I ET||||||||||||||| IG||||||||||||||| NR TA||||||||||||||| RD1111111 I|111111111111111 TF/////// TE |H444444444444444 AL/////// UT11 SA99 TG7 RE1 I|| TTD TEI |I--------------- BLCCCCCCCCCCCCCCC EFSSSSSSSSSSSSSSS SE                CH999999999999999 HL VT||||||||||||||| EA888888888888888 RG444444444444444 HE||||||||||||||| || GD555555555555555 EA BT||||||||||||||| D_444444444444444 AV||||||||||||||| TOMMMMMMMMMMMMMMM |Niiiiiiiiiiiiiii I|ttttttttttttttt NDttttttttttttttt FAlllllllllllllll OTeeeeeeeeeeeeeee T_rrrrrrrrrrrrrrr XBeeeeeeeeeeeeeee TI                _SR 1|eeeeeeeeeeeeeee |Liiiiiiiiiiiiiii IO NHeeeeeeeeeeeeeee FN OSTA--------------- XT||||||||||||||| TZ||||||||||||||| _|||||||||||||||| 2L||||||||||||||| |O||||||||||||||| IH||||||||||||||| NN||||||||||||||| FB||||||||||||||| OE||||||||||||||| TT||||||||||||||| XR||||||||||||||| TA||||||||||||||| _G||||||||||||||| 3|||||||||||||||| |D||||||||||||||| IA888888888888888 NT888888888888888 FU888888888888888 OM||||||||||||||| T|--------------- XA999999999999999 TV_G555555555555555 A||||||||||||||| 4|R555555555555555 IT555555555555555 N|FL--------------- OO999999999999999 TB666666666666666 UX T_||||||||||||||| _M||||||||||||||| O5 |D||||||||||||||| |I NK||||||||||||||| FS111444444555666 TO T_000000000666000 XO||||||||||||||| TR||||||||||||||| _I455455455455455 6G711711711711711 || IK237237237237237 SN TF O_b16b||b||b40b|| TLu84u81u12u88u12 XO|40|64|78|00|78 TB3000440284|0028 _U4|||00|8034||80 _7 K| IS0006|0500|00500 NT|||00|2||2|02|| F|005||100280|002 OK|||00||||8|0||| TS000||000000|001 TX _T _L|110/1|11||0|11 8O0//|0/0//00|0// |B|00010|00|10|00 IU0111/10110/1011 N_1///2/1//|0/1// FM/22002/22010/22 OO0001100001/1000 DT |X TA2||00|2||1102|| _N000110000/31000 9R1113/11112|3111 ||3//|3/3//00|3// IK|33013|33110|33 NT0111/10113/1011 FO1///2/1//|3/1// OS/22302/22013/22 TT3001103001/1300 XA111/31111/2/111 TN/332|3/33302/33 _D0001|0000/31000 1_011||30|1||2|31|| ||300||030000|300 IK|||00||||1|0||| NT000|1000030|000 FO|110/1|11||0|11 OS0//|0/0//00|0// TT0111/10110/1011 XATN1///2/1//|0/1// _D/22002/22010/22 1_0001100001/1000 12111/31111/2/111 ||/332|3/33002/33 IK2||0||2||1102|| NT1||35|1||2|31|| FOOS311|153550||355 TT|00|31|111|||11 XAd00|38|3835||38 TN|__4|7|37|15|37 _D1LL7||4|||314|| 1_0OO1||7|||387|| 23_UU| || IKL__4 NTOKK7 FOB||1 OSU552 TT_11l XAK38o TN _D 1_7||| 341||4 ||2||7 IK| NT4 FO7 OS TT XAl TNo _Db _1 45| || IK7 TN FO2 SO TTk AX TN_00000|00 D_ 1_o 65 ||| KI NT877 FO1 S0 O TT011| XA0660 N|00| T D000 _ _| 1 670||0 |||  | IK2 T6 N FO0 OS| TT0 XA| N0 T D| _ 1_0 78| |0 | T| I A7 N FG| OE2 T_1A6 XN0 TW0 _1|0 8A|Z|  _IANNFWO|TX T_19|INFOTXT_20|INFOWERT_1|INFOWERT_2|INFOWERT_3|INFOWERT_4|INFOWERT_5|INFODAT_1|INFODAT_2|INFODAT_3|IN
| --------------- | 1111 9999 3333 AAAA 22222 7777 11111 || DDDDDDDD I 333333333 111111111 666666666 RRRRRRRR ffffffffffffff f |||||||||||||| | | 666666666666666 ||||||||||||||| ||||||||||||||| ||||||||||||||| ||||||||||||||| 000000555222000 138138138138138 l||l||l||l||l|| o58o00o00o61o00 | 5005|0100237100 6||70|1||0221|| |||00||||||0||| 000|1000000|000 111/31111/2/111 /332|3/33002/33 2||00|2||1102|| |00010|00|10|00 | 0dd1||0||/310|| 0BB2||1||4|71|| |37b 4||u -- 88 11 1 00 2 00 00 || 00 u || 00 4 ||-|0 2287|-|| 1 661 00 _ ||012                    | 000610111| z|||0606602|066 l||| 000| | ||| |0||0 002 -||6 ||| 220 00|                 |     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --- |
|                 | 1111 9999 ||| IIIII                                                                                                         |                                                                                                                                                 |                                                                                                                                 | 1 2 _ k z _ l o | | 0                                                                                                              | 0 0 7 | 2 1 6 0 0 0 |                                                                 |     |
|                 | 1 1111111111 9 9999999999 3 3333333333 A AAAAAAAAAA 2 77                                                                    |                                                                                                                                                 |                                                                                                                                 | |2||7||2|| - 8- 18 01 0 0 00 |0 0| |0 | 0 |0 2| 62 6 0 0 | 0| |0 0| |0 | 0 |0 0| 7877 | 2|                                         | 0000 0 0|00  |  |                                                                     |     |
|                 | 1 / 222222222 / 1 1 9 9 7 1 1 | | I                                                                                         |                                                                                                                                                 |                                                                                                                                 | | -- 4 88 7 11 1 00 2 00 l 00 o || b 00 u || | 00 4 || 7 22 1 66 2 00 _ || k 00 z || _ 00 l || o 00 | || | 00 1 || 0 228           | 2 6 0 | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |                                             |     |
|                 | 1111111 /////// // / 11 1 9 9 9 77 77 1 1 11 | | || D DD I I II 3 33333 1 11111 6 66666 R RRRRR                             |                                                                                                                                                 |                                                                                                                                 | 1||| 2||4 | - 4 8- 7 18 1 01 2 0 l 00 o |0 b 0| u |0 | 0 4 |0 7 2| 1 62 2 06 _ |0 k 0| z |0 _ 0| l |0 o 0 | |0-|| | 0|877 -|01 7|0 | 12|00 0 61000 0 06|00 | 00 00 |02 0  |6 | 2 6 0 | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |   |     |
|                 | // 11 99 7 1 | D I                                                                                                          |                                                                                                                                                 |                                                                                                                                 | |7 1 2 l o 0 b u | 4 7| 1 2 _ k z _ l o | ||                                                                                       | 7 011 0|| |   0   | 0 | 0 | 0 | 0 | 7 | 2 1 6 0 0 0 |                                 |     |
|                 | / / 1 1 9 9 7 7 1 1 | | D D I I                                                                                             |                                                                                                                                                 |                                                                                                                                 | -- 88 11 00 00 00 || 00 || 00 || 22 66 00 || 00 || 00 || 00 || 00 || 22                                                            |                                                                                       |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     |     | Page 62 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --- | --------------- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |
| --- | --- | --- | ----------------------------------------------- | --- |

| 7.9.1.1  | Interface configuration  |     |     |     |
| -------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |          |     |
| --------- | --- | --- | -------- | --- |
| Key       |     |     | Value    |     |
| FORMAT    |     |     | GENERIC  |     |
Output format

7.9.2 Upload of absences
Available as of hylobu version 8.1.1.220.
A separate interface file is provided for the absence times. This file is provided with the monthly wage
types. It is stored on the HYDRA server in the HYDRA directory under the name "hyfehl.dat".
The interface is made available as an ASCII file.  This format is a generic standard format in the HYDRA
PDM list format.
The file consists of a header row with column names and the following data rows:
The  columns  have  no  specific  width  and  separator  is  the  pipe  "|".  Date  fields  are  in  the  format:
MM/DD/YYYY. Decimal separator for floating point numbers is the point.  The maximal length of the
column can increase for future HYDRA versions.
Note: The order is not fixed.  MPDV can at all times enter additional columns or change the
order.  Therefore, bear in mind the header row when evaluating data.

| Field  |     | Type /  | Comment  |     |
| ------ | --- | ------- | -------- | --- |
Max. length
| FIR   |     | A           | Company from the HR master data         |     |
| ----- | --- | ----------- | --------------------------------------- | --- |
| PNR   |     | N (=night)  | Personnel number without leading zeros  |     |
| DATB  |     | D           | First day of absence                    |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 63 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| DATE  | D   | Last day of absence  |     |     |
| ----- | --- | -------------------- | --- | --- |
GRUND  N (=night)  Number of the payment day type of absence
times
| BEZK  | A   | Abbreviation of the remuneration day type for  |     |     |
| ----- | --- | ---------------------------------------------- | --- | --- |
absence
| BEZAUSF  | A   | Name of the remuneration day type for absence   |     |     |
| -------- | --- | ----------------------------------------------- | --- | --- |

Additional notes
  The absence periods are transferred as one data record including weekends and days off.
  If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
  If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished
when the specified time has expired and a period with another absence reason is transferred.
  The Processing of absence times can be used to control which absence times are transferred.
  You can transfer full-day absences and partial absences.
7.10  HANSALOG (record type V1)
7.10.1  Upload of monthly wage types
Uploading the monthly wage types is performed with the following data record structure:
| Field  | Type  Positi | Max.  Decimal  | Contents  |     |
| ------ | ------------ | -------------- | --------- | --- |
on  length  places
| Record type       | alpha  1  | 2    | V1                                 |     |
| ----------------- | --------- | ---- | ---------------------------------- | --- |
| Company           | num  3    | 3    | HYDRA company, the first 3 digits  |     |
| Personnel number  | num  6    | 5    | HYDRA personnel number             |     |
| Accounting key    | num  11   | 1    | 0 (zero)                           |     |
| Monat             | num  12   | 2    | Monat                              |     |
| Wage type         | num  14   | 3    | HYDRA wage type (converted to      |     |
three numeric digits)
| Time    | num  17  | 6  2  | HHHHII          |     |
| ------- | -------- | ----- | --------------- | --- |
| Factor  | num  23  | 5  2  | Empty (blanks)  |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 64 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |
| --- | --- | --- | --- | --------------------------------------------- | --- |

| Amount           |     | num  28    | 8  2  | Empty (blanks)                 |     |
| ---------------- | --- | ---------- | ----- | ------------------------------ | --- |
| Percentage       |     | num  36    | 5  2  | Empty (blanks)                 |     |
| Cost center      |     | num  41    | 6     | Cost center wage type posting  |     |
| Cost object      |     | num  47    | 6     | HR master data cost center     |     |
| Free field 1     |     | alpha  53  | 38    | blanks                         |     |
| Accounting year  |     | num  91    | 4     | Year                           |     |
| Free field 2     |     | alpha  95  | 34    | blanks                         |     |

The total record length is 128 characters. Numeric fields are transferred with leading zeros.
Negative content only exists for the fields Time and Amount. In this case, the first character in the field is
not a leading zero, but a minus sign.
| 7.10.1.1  | Interface configuration  |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |

| Active    |    |     |     |     |     |
| --------- | --- | --- | --- | --- | --- |
Key  Value
FORMAT  HANSALOG
Output format

| 7.11  HANSALOG (record type V3)  |                               |     |     |     |     |
| -------------------------------- | ----------------------------- | --- | --- | --- | --- |
| 7.11.1                           | Upload of monthly wage types  |     |     |     |     |
The wage type totals determined at the end of the month are transferred to Hansalog Payroll Accounting
via V3 records (and imported there as file LGT.BEWEG). When the interface file is created, the file is
stored in the HYDRA directory of the HYDRA shop floor scheduling with the name "hylobu.dat".
| Field        |     | Type  | Item  Contents  |     |     |
| ------------ | --- | ----- | --------------- | --- | --- |
| Record type  |     | C2    | 1  V3           |     |     |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     | Page 65 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| System            | N2   | 3  00 constant           |     |
| ----------------- | ---- | ------------------------ | --- |
| Company           | N3   | 5  HYDRA company number  |     |
| Personnel number  | N10  | 8  Personnel number      |     |
Accounting key  N1  18  Constant 0. ( 0: for running month, 3 for previous
month)
Accounting date  N6  19  YYYYMM from the start of the accounting period
| Wage type  | N4  | 25  HYDRA wage type  |     |
| ---------- | --- | -------------------- | --- |
Time  N 8.2  29  Time for the wage type in the format HHHHHHII
| Factor            | N 5.2         | 37  Empty                           |     |
| ----------------- | ------------- | ----------------------------------- | --- |
| Amount            | N 9.2         | 42  Empty                           |     |
| Percentage        | N 5.2         | 51  Empty                           |     |
| Cost center       | N 12 or C 12  | 56  HYDRA cost center               |     |
| Cost object       | N12           | 68  Empty                           |     |
| Internal field 1  | C72           | 80  Empty                           |     |
| Created date      | N8            | 152  YYYYMMDD of the interface run  |     |
| Created system    | C8            | 160  "HYDRA P" for data from PZE    |     |
(„HYDRA L" for data from LLE)
| User              | C8   | 168  HYDRA  |     |
| ----------------- | ---- | ----------- | --- |
| Internal field 2  | C25  | 176  Empty  |     |
The total length that can be used is 200 byte.
Numeric fields can be set blank or 0 if not needed. At least one of the fields time, factor, amount or
percentage must be filled.
The cost center in Hansalog can only be administered numeric or alphanumeric.
The fields creation date, creation system, creation user can be used in Hansalog to delete the transferred
data.
If there is a negative numeric value, the minus is put in front instead of a leading zero.  That means the
field length is shorter.
Example:
V300  0         90200701 100   93.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 400    8.00                            105                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 400   80.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0         90200701 888   24.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0        100200701 100   24.00                            123                                                                                    20070202 HYDRA PHYDRA

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 66 of 129  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- |

V300  0        100200701 410  160.00                            123                                                                                    20070202 HYDRA PHYDRA
V300  0        100200701 888    6.00                            123                                                                                    20070202 HYDRA PHYDRA

| 7.11.1.1  | Interface configuration of the monthly wage types  |     |     |     |     |
| --------- | -------------------------------------------------- | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |

| Active    |    |     |              |     |     |
| --------- | --- | --- | ------------ | --- | --- |
| Key       |     |     | Value        |     |     |
| FORMAT    |     |     | HANSALOG_V3  |     |     |
Output format
CUSTOMER or COMPANY  With the formats HANSALOG_V3, you can use
or  COMPANY_NONSALARIED_EMPLOYEES  these options to specify the company.
and COMPANY_SALARIED_EMPLOYEES

| ABREKZ  |     |     | With  FORMAT=  | HANSALOG_V3,  | you  can  use  |
| ------- | --- | --- | -------------- | ------------- | -------------- |
these options to specify the accounting key.

| 7.12  INTEGRA  |                               |     |     |     |     |
| -------------- | ----------------------------- | --- | --- | --- | --- |
| 7.12.1         | Upload of monthly wage types  |     |     |     |     |
The interface to transfer the monthly wage types have the following format:
| Field name  | Posi  | Data  typ/  Contents    |     |     | Example  |
| ----------- | ----- | ----------------------- | --- | --- | -------- |
|             | tion  | format                  |     |     |          |
| FIRMENNR    | 1     | C(4)  Company           |     |     | TER      |
| ABRJAHR     | 5     | C(4)  Payroll year      |     |     | 2005     |
| ABRMONAT    | 9     | C(2)  Accounting month  |     |     | 06       |
| PERSNR      | 11    | N(6)  Personnel number  |     |     | 142356   |
| SATZART     | 17    | C(1)  constant 1        |     |     | 1        |
| LANR        | 18    | C(3)  Wage type         |     |     | 100      |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 67 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| LFDNR  | 21  | N(4)  | Always 0  | 0000  |
| ------ | --- | ----- | --------- | ----- |
STDTAGE  25  N(10,2)  Duration (10 digits with 2 decimal places)  00000058.23
| FAKTOR   | 35  | C(10)  | Constant empty  |     |
| -------- | --- | ------ | --------------- | --- |
| PROZENT  | 45  | C(10)  | Constant empty  |     |
(percentage)
| BETRAG (amount)  | 55  | C(10)  | Constant empty         |         |
| ---------------- | --- | ------ | ---------------------- | ------- |
| KST              | 65  | C(10)  | Cost center            | 22-105  |
| KTR              | 75  | C(10)  | Constant empty         |         |
| PROJEKT          | 85  | C(10)  | Constant empty         |         |
| TAG              | 30  | C(2)   | Constant empty         |         |
| VERARBKZ         | 32  | C(1)   | Processing ID 0 = new  | 0       |
| FREE             | 35  | C(21)  | Reserve                |         |
At the end of each row is CR/LF
Example:
001 200503000002110000000000107.33                              0                               0
001 200503000002110100000000038.75                              0                               0
001 200503000002120000000000000.33                              0                               0
001 200503000002120500000000009.58                              0                               0
001 200503000002130100000000010.00                              0                               0
BSP 200503000009110000000000013.00                              22-1                            0
BSP 200503000009141000000000004.00                              22-1                            0
BSP 200503000009157500000000008.00                              22-1                            0

| 7.12.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |
Key  Value
FORMAT  INTEGRA
Output format

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 68 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

7.13  KASPAR
7.13.1  Upload of monthly wage types
To upload the monthly wage types, the semicolon ";" is used as column separator.
Data types:
| Type  Meaning  Formatting                         |     |     |     |
| ------------------------------------------------- | --- | --- | --- |
| Cn  Character (string, text)  with max. length n  |     |     |     |
Nn  Integer  The maximum number of digits n. Negative values are preceded by
the sign "-".
Nx.y  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".

Structure:
| Field/meaning                          | Column name         | Data type  |     |
| -------------------------------------- | ------------------- | ---------- | --- |
| Customer number (Fix)                  | Kundennr            | C5         |     |
| Personnel number (with leading zeros)  | Pnr                 | C7         |     |
| Year (YYYY)                            | Jahr                | C4         |     |
| Month (MM)                             | Monat               | C2         |     |
| Wage type (with leading zeros)         | Lohnartenschlüssel  | C4         |     |
| Hours (or day) for wage type           | Einheit             | N8.2       |     |
| Temporary field (fixed value 0)        | Temp1               | C15        |     |
| Start date absence (YYYYMMDD)          | Startdatum          | C8         |     |
| End date of absence (YYYYMMDD)         | Endedatum           | C8         |     |
| Temporary field (fixed value 0)        | Temp2               | C15        |     |
| Temporary field (fixed value 0)        | Temp3               | C1         |     |
At the end of each row is CR/LF
Example:
00519;0000061;2004;08;0001;   168.00;              0;        ;        ;              0;0
00519;0000061;2004;08;0199;    16.00;              0;20040826;20040827;              0;0

| EIS-LUG_82.docx  | Version: 1.0.22770  |     | Page 69 of 129  |
| ---------------- | ------------------- | --- | --------------- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- | --- |

| 7.13.1.1  | Interface configuration  |     |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |     |

| Active    |    |     |         |     |     |     |
| --------- | --- | --- | ------- | --- | --- | --- |
| Key       |     |     | Value   |     |     |     |
| FORMAT    |     |     | KASPAR  |     |     |     |
Output format
| 7.13.1.2  | Interface configuration  |     |          |     |     |     |
| --------- | ------------------------ | --- | -------- | --- | --- | --- |
| Key       |                          |     | Value    |     |     |     |
| FORMAT    |                          |     | INTEGRA  |     |     |     |
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
KASPAR. The other formats issue the HYDRA
standard format.

| ABSENCES_SEPARATE_FILE  |     |     | ON                  |          |                |      |
| ----------------------- | --- | --- | ------------------- | -------- | -------------- | ---- |
|                         |     |     | With  the  formats  | KASPAR,  | the  absences  | are  |
written in the same file as the wage types. You
can use this option to specify that also with these
formats the absences are written in a separate file
using the name hyfehl.dat.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 70 of 129  |     |
| ---------------- | --- | ------------------- | --- | --- | --------------- | --- |

    Interface Wage and Salary Programs (Payroll)

| 7.14    | KDVLOHN_V2 (Kanne, new format CSV file)             |     |     |     |
| ------- | --------------------------------------------------- | --- | --- | --- |
| 7.14.1  | Monthly wage types: 77n (data without cost center)  |     |     |     |
With this interface, the field lengths are not fixed. To separate the fields, a semicolon ";" is used. The field
lengths listed below are maximum values.
The comma is the decimal separator.
The interface has the following format.
| Position  | Field      | Type   | Contents     | Example  |
| --------- | ---------- | ------ | ------------ | -------- |
| 1         | Record ID  | Fixed  | always "77"  | 77       |
[2]  File number  C(10)  Optional field that must be activated explicitly in the  0584
configuration. See also notes on the configuration below.
This field includes a configurable value.
[3 or 2]  Plant  C(20)  Optional field that must be activated explicitly in the  G
configuration. See also notes on the configuration below.
This field includes a configurable value.
4 or 3 or  Personnel  N(8)  Personnel number from the HYDRA HR master data  87654321
| 2   | number  |     |     |     |
| --- | ------- | --- | --- | --- |
5 or 4 or  Payroll  YYYYMM  By default, the Accounting month is output (not the  201602
| 3   | month  |     | consecutive month).  |     |
| --- | ------ | --- | -------------------- | --- |
6 or 5 or  Leave days  N(3.1)  Leave taken (full or half days) as booked in the leave  12.5
| 4   |     |     | account in HYDRA.  |     |
| --- | --- | --- | ------------------ | --- |
7 or 6 or  Sick leave  N(2)  Sick leave are days when wage types are booked that  5
| 5   |     |     | have a "K" in field Selection indicator in the wage type  |     |
| --- | --- | --- | --------------------------------------------------------- | --- |
master data.
8 or 7 or  Public  N(1)  Public holidays are days when wage types are booked  1
6  holidays  that have an "F" in field Selection indicator in the wage
type master data.
| 9 or 8 or  | Wage type  | C(4)  | Wage type  | 0004  |
| ---------- | ---------- | ----- | ---------- | ----- |
7
| 10 or 9 or  | Value  | N(5.2)  | Hours of a wage type  | 123.75  |
| ----------- | ------ | ------- | --------------------- | ------- |
8

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 71 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
In each data record, the number of leave days, sick leave and public holidays is transferred. If no wage
type data records are transferred for a person, the system creates an additional data record with empty
wage type and value=0,00 if one of the day field does not equal 0.
Example data:
77;0584;G;568;201502;4,5;0;1;;0,00
77;0584;G;667;201502;1,5;5;1;100;97,50
77;0584;G;667;201502;1,5;5;1;200;4,25
77;0584;G;667;201502;1,5;5;1;220;14,00
77;0584;G;667;201502;1,5;5;1;400;34,50
77;0584;G;667;201502;1,5;5;1;450;12,00
77;0584;G;667;201502;1,5;5;1;528;1,00
77;0584;G;667;201502;1,5;5;1;600;8,00
77;0584;G;667;201502;1,5;5;1;996;21,50
77;0584;G;667;201502;1,5;5;1;999;40,00
77;0584;L;10003645;201502;0,0;0;0;526;1,00
77;0584;L;10003645;201502;0,0;0;0;996;18,50
77;0584;L;10003645;201502;0,0;0;0;999;13,50
INI data configuration INI name HYD-LUG
Note: In most cases, the following settings are valid for the wage type interface and the absence
interface. In addition to the below-mentioned special configurations, the general configuration options for
absence interfaces still apply.
OPTIONS / FORMAT=KDVLOHN_V2
Sets the format.
OPTIONS / COMPANY
or COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES
Using this option, the column "Plant" is activated and the contents are defined. Using
COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES, you can
configure the contents independent of the HR master data field Employment relationship.
OPTIONS / CONTRACT
Using this option, the column "File number" is activated and the contents are defined.
Other
This interface does not include a cost center field. If this format is therefore activated, the options
"Without cost center"“ ( COSTCENTER=OFF) and "Summarize wage types" (
WAGETYPES_ONCE=ON) are implicitly activated. The option "Upload of daily wage type postings"
is deactivated.
Further notes on the configuration
Wage types
In the master data of the wage types, you use the field Selection indicator to control which wage
type days are used to identify Sick leave or Public holiday.
EIS-LUG_82.docx Version: 1.0.22770 Page 72 of 129

    Interface Wage and Salary Programs (Payroll)

| Selection indicator "K":   |     | Sick leave      |     |     |
| -------------------------- | --- | --------------- | --- | --- |
| Selection indicator "F":   |     | Public holiday  |     |     |
You use the standard options in the group Payroll accounting to control whether and how the wage
type is transferred from HYDRA to KDVLOHN.
| 7.14.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |
Key  Value
FORMAT  KDVLOHN_V2
  Output format
CONTRACT or CONSULTANT  In the FORMAT=KDVLOHN_V2, you can enable
  and set the field File number via these options.

| 7.14.2  | Absences: 7Fn (calendar dates)  |     |     |     |
| ------- | ------------------------------- | --- | --- | --- |
With this interface, the field lengths are not fixed. To separate the fields, a semicolon ";" is used. The field
lengths listed below are maximum values.
The interface has the following format.
| Position  Field  | Type   |     | Contents     | Example  |
| ---------------- | ------ | --- | ------------ | -------- |
| 1  Record ID     | Fixed  |     | always "7F"  | 7F       |
[2]  File number  C(10)  Optional field that must be activated explicitly in the  0584
configuration. See also notes on the configuration
below.
This field includes a configurable value.

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 73 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
[3 or 2] Plant C(20) Optional field that must be activated explicitly in the G
configuration. See also notes on the configuration
below.
This field includes a configurable value.
4 or 3 or Personnel N(8) Personnel number from the HYDRA HR master data 87654321
2 number
5 or 4 or Payroll YYYYMM By default, the Accounting month is output (not the 201602
3 month consecutive month).
6 or 5 or From YYYYMMDD Date from. 20160201
4
7 or 6 or To YYYYMMDD Date to. 20160229
5
8 or 7 or Indicator C(10) Identifies the absence reason. See notes on AK
6 configuration.
9 or 8 or Record I/D I=Insert, D=Delete. HYDRA only supports I=Insert. I
7 indicator
Additional notes
 The absence periods are transferred as one data record including weekends and days off.
 If the absence period includes a change of month, the period is divided. This means: If the
absences include several months, they are divided into several periods.
 If you have configured a period of continued pay in HYDRA (LFZ), the LFZ period is finished
when the specified time has expired and a period with another absence reason is transferred.
 You can transfer full-day absences and partial absences.
 The outputs of the record type 7Fn for absences and the record type 77n for wage types are
included in the same file. If required, you can change the configuration and output absences and
wage types in separate files.
EIS-LUG_82.docx Version: 1.0.22770 Page 74 of 129

Interface Wage and Salary Programs (Payroll)
INI data configuration INI name HYD-LUG
Note: In most cases, the following settings are valid for the wage type interface and the absence
interface. In addition to the below-mentioned special configurations, the general configuration options for
absence interfaces still apply.
OPTIONS / FORMAT=KDVLOHN_V2
Sets the format.
OPTIONS / ABSENCES= ON | OFF
Switches the absence interface on or off.
OPTIONS / COMPANY
or COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES
Using this option, the column "Plant" is activated and the contents are defined. Using
COMPANY_SALARIED_EMPLOYEES or COMPANY_NONSALARIED_EMPLOYEES, you can
configure the contents independent of the HR master data field Employment relationship.
OPTIONS / CONTRACT
Using this option, the column "File number" is activated and the contents are defined.
Further notes on the configuration
Control of absences
Using the Control of absences, you can control which absences are transferred with which
"indicator".
Example data:
77;0584;G;667;201502;1,5;5;1;100;97,50
77;0584;G;667;201502;1,5;5;1;200;4,25
77;0584;G;667;201502;1,5;5;1;220;14,00
77;0584;G;667;201502;1,5;5;1;400;34,50
77;0584;G;667;201502;1,5;5;1;450;12,00
77;0584;G;667;201502;1,5;5;1;528;1,00
77;0584;G;667;201502;1,5;5;1;600;8,00
77;0584;G;667;201502;1,5;5;1;996;21,50
77;0584;G;667;201502;1,5;5;1;999;40,00
7F;0584;G;667;201502;20150202;20150205;K;I
7F;0584;G;667;201502;20150211;20150211;U;I
7F;0584;G;667;201502;20150217;20150217;F;I
7F;0584;G;667;201502;20150224;20150224;U;I
7F;0584;G;667;201502;20150225;20150225;K;I
7F;0584;G;667;201502;20150226;20150227;100;I
77;0584;G;885;201502;0,0;0;0;526;1,00
77;0584;G;885;201502;0,0;0;0;997;2,00
77;0584;G;885;201502;0,0;0;0;998;3,75
7F;0584;G;885;201502;20150202;20150202;100;I
77;0584;G;40563;201502;0,0;0;0;100;124,00
77;0584;G;40563;201502;0,0;0;0;200;12,25
77;0584;G;40563;201502;0,0;0;0;220;2,75
77;0584;G;40563;201502;0,0;0;0;526;18,00
77;0584;G;40563;201502;0,0;0;0;996;57,50
7F;0584;G;40563;201502;20150210;20150211;200;I
EIS-LUG_82.docx Version: 1.0.22770 Page 75 of 129

|     |     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |     |     |
| --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- |

| 7.14.2.1  Interface configurations  |     |     |     |        |     |     |     |     |     |
| ----------------------------------- | --- | --- | --- | ------ | --- | --- | --- | --- | --- |
| Key                                 |     |     |     | Value  |     |     |     |     |     |
CONTRACT or CONSULTANT  In the FORMAT=KDVLOHN_V2, you can enable
|     |     |     |     | and set the field File number via these options.   |     |     |     |     |     |
| --- | --- | --- | --- | -------------------------------------------------- | --- | --- | --- | --- | --- |
COMPANY or CUSTOMER  In the FORMAT=KDVLOHN_V2, you can enable
and set the field Plant using these options.
or  COMPANY_NONSALARIED_EMPLOYEES
and COMPANY_SALARIED_EMPLOYEES
| ABSENCES_SEPARATE_FILE  |     |     |     | ON         |          |              |     |                |     |
| ----------------------- | --- | --- | --- | ---------- | -------- | ------------ | --- | -------------- | --- |
|                         |     |     |     | With  the  | formats  | KDVLOHN_V2,  |     | the  absences  |     |
are written in the same file as the wage types.
You can use this option to specify that also with
|     |     |     |     | these  formats  |     | the  absences  |     | are  written  | in  a  |
| --- | --- | --- | --- | --------------- | --- | -------------- | --- | ------------- | ------ |
separate file using the name hyfehl.dat.

| FORMAT  |     |     |     | KDVLOHN_V2                                        |     |     |     |     |     |
| ------- | --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- | --- |
|         |     |     |     | The key of the monthly wage types also specifies  |     |     |     |     |     |
the format. A manufacturer-specific format for the
|     |     |     |     | absence  | interface  | is  | only  available  |     | with  the  |
| --- | --- | --- | --- | -------- | ---------- | --- | ---------------- | --- | ---------- |
formats KDVLOHN_V2 (Kanne new CSV format)
|     |     |     |     | The  other  | formats  | issue  | the  | HYDRA  | standard  |
| --- | --- | --- | --- | ----------- | -------- | ------ | ---- | ------ | --------- |
format.

7.15  KDVLOHN (Kanne, old format fixed record length)
| 7.15.1  Upload of monthly wage types  |     |     |     |     |     |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
The interface for transferring monthly wage types in the older format with fixed positions to the payroll
accounting system KDVLOHN (Kanne) has the following format:
| Field name  | Posi Data  | typ/  | Contents  |     |     |     |     | Example  |     |
| ----------- | ---------- | ----- | --------- | --- | --- | --- | --- | -------- | --- |
tion  format
| Record type  | 1  N(2)  |     | always "77"  |     |     |     |     | 77  |     |
| ------------ | -------- | --- | ------------ | --- | --- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     |     |     | Page 76 of 129  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | --------------- | --- |

    Interface Wage and Salary Programs (Payroll)

| File number  | 3   | N(4)  always "0584"  | 0584  |
| ------------ | --- | -------------------- | ----- |
Plant  7  A(1)  For salaried employees a 'G' (wage earner) and  G
for industrial workers an 'L' (wage earner).
| Personnel number     | 8   | N(5)  Personnel number                  | 14235  |
| -------------------- | --- | --------------------------------------- | ------ |
| V (= previous year)  | 13  | A(1)  Constant empty                    | " "    |
| Monat                | 14  | N(2)  Monat                             | 10     |
| Leave days           | 20  | N(3,1)  Holidas with one decimal place  | 025    |
Sick leave 80%  23  N(2)  Sick das with 80% LFZ, constant 0  00
Sick days with  25  N(2)  Sick days with 100% LFZ incl. holiday credit,  00
| 100% incl. holiday  |     | constant 0  |     |
| ------------------- | --- | ----------- | --- |
credit
Sick days with  27  N(2)  Sick days with 100% LFZ without holiday credit  03
| 100% without  |     | (wage tpe 05 or 005)  |     |
| ------------- | --- | --------------------- | --- |
holiday credit
Public holidays  29  N(1)  Public holidays (wage type 03 or 003)  1
Days of absence  30  N(2)  Absence days (wage type 78 or 078)  02
| Wage type  | 32  | N(3)  Wage type with leading zeros  | 013  |
| ---------- | --- | ----------------------------------- | ---- |
Value  35  N(6,2)  Duration  of  the  wage  type  with  2  decimal  001350
numbers

For each person, the first data record contains the number of holidays, sick days without taking holidays,
public holidays and absences into account. One wage type is transferred in each of the following records:
The number of holidays is in all data records.
| 7.15.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 77 of 129  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |
| --- | --- | ----------------------------------------------- | --- | --- | --- |

Key  Value
FORMAT  KDVLOHN
  Output format

7.16  LGVSoft
The data record for transferring the monthly wage types to LGVSoft has the following structure:
| 7.16.1  Data format of the wage types: V4 (wage types)  |     |     |     |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- | --- |

| Field    |                                        | Description   | Type   | Place  Example  |           |
| -------- | -------------------------------------- | ------------- | ------ | --------------- | --------- |
| V4STAT   | Status (A=active, I=inactive, 8=copy)  |               | C1     | 1               | A         |
| V4FINR   | Company number                         |               |        |                 |           |
|          |                                        |               | N8.0   | 2  00000001     |           |
| V4PENR   | Personnel number                       |               | N8.0   | 10  00006711    |           |
| V4PEJA   | Period year                            |               | N4.0   | 18              | 2011      |
| V4PERV   | Period month from                      |               | N2.0   | 22              | 01        |
| V4PERB   | Period month until                     |               | N2.0   | 24              | 01        |
| V4LOAR   | Wage type                              |               | N5.0   | 26              | 00100     |
| V4BETR   | Amount                                 |               | N11.2  | 31              | Always 0  |
| V4MENG   | Quantity                               |               | N7.2   | 42              | 0017600   |
| V4SATZ   | Record                                 |               | N9.2   | 49              | Always 0  |
| V4LOGR   | Wage group                             |               | N3.0   | 58              | Always 0  |
| V4KOST   | Cost center                            |               | C10    | 61              | 105       |
| V4KOTR   | Cost object                            |               | C15    |                 |           |
|          |                                        |               |        | 71              | empty     |
| V4GEMC   | Municipality code                      |               | C3     | 86              | empty     |
| V4ZUTX   | Additional text                        |               | C25    | 89              | empty     |
| V4ENTS   | Origin code                            |               | C1     | 114             | empty     |
| V4VOND   | From                                   |               | N8.0   | 115             | Always 0  |
| V4BISD   | Until                                  |               | N8.0   | 123             | Always 0  |
| V4ZSAA   | Target record                          |               | C3     | 131             | „V1 “     |
| V4IDEN   | Identification                         |               | C20    | 134             | empty     |
| V4WAER   | Currency                               |               | C3     | 154             | EUR       |

  Interface is created in an ftp format.
  Each data record is displayed in a line (0D, 0A end of the lines).
  Alphanumeric fields must be started with blanks.  The field content is filled to the left.
  Numeric fields must be started with zeros.  The field content is filled to the right with leading zeros

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 78 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- | --- |

Example file (here shown with return at position 115)
A88888888000966652011010100100000000000000003225000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100031000000000000000500000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100400000000000000000400000000000000105
0000000000000000V1                     EUR
A88888888000966652011010100041000000000000003650000000000000105
0000000000000000V1                     EUR

| 7.16.1.1  | Interface configuration  |     |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |     |

| Active    |    |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- |
Key  Value
FORMAT  LGVSOFT
  Output format
CUSTOMER or COMPANY  With the formats LGVSOFT, you can use these
or  COMPANY_NONSALARIED_EMPLOYEES  options to specify the company.
and COMPANY_SALARIED_EMPLOYEES

| 7.16.2  | Data format for absence times data: V9 (events)  |     |     |     |     |     |
| ------- | ------------------------------------------------ | --- | --- | --- | --- | --- |

| Field   |                                | Description   |     | Type  | Place  | Example      |
| ------- | ------------------------------ | ------------- | --- | ----- | ------ | ------------ |
| V9STAT  | Status (A=active, I=inactive)  |               |     | C1    |        | 1  A         |
| V9FINR  | Company number                 |               |     | N8.0  |        | 2  00000001  |
| V9PENR  | Personnel number               |               |     | N8.0  | 10     | 00006711     |
| V9VOND  | From (YYYYMMDD)                |               |     | N8.0  | 18     | 20010101     |
Typ (e.g. ARZ – visit to the doctor, KRA
| V9TYPE  |     |     |     | C3  | 26  | KRA  |
| ------- | --- | --- | --- | --- | --- | ---- |
– illness)
| V9BISD  | Until (YYYYMMDD)                      |     |     | N8.0  | 29  | 20010115  |
| ------- | ------------------------------------- | --- | --- | ----- | --- | --------- |
| V9KENN  | Identifier (H = half day, S = hours)  |     |     | C1    | 37  | empty     |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     | Page 79 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | ----------------------------------------------- | --- | --- |

| V9KOMM  | Comment  |     | C30  |     |
| ------- | -------- | --- | ---- | --- |
38  empty
| V9STUE  | Hours-E               |     | N7.2  | 68  0001600   |
| ------- | --------------------- | --- | ----- | ------------- |
| V9FOER  | Recurrent illness     |     | C1    | 75  empty     |
| V9AZTE  | Working time level    |     | C1    | 76  empty     |
| V9AZTN  | Working hours number  |     | C10   | 77  empty     |
| V9KOST  | Cost center           |     | C10   | 87  105       |
| V9ENTS  | Origin code           |     | C1    | 97  empty     |
| V9ENJM  | Origin-JM             |     | N6.0  | 98  Always 0  |

  Interface is created in an ftp format.
  Each data record is displayed in a line (0D, 0A end of the lines).
  Alphanumeric fields must be started with blanks.  The field content is filled to the left.
  Numeric fields must be started with zeros.  The field content is filled to the right with leading zeros
Example file (here shown with return at position 75)
A888888880000000920110101URL20110102                              0000000
000000
A888888880000000920110103URL20110105                              0000003
000000
A888888880009666520110101KRA20110102                              0000000
000000
A888888880009666520110103KRA20110103                              0000000
000000
A888888880009666520110105KRA20110120                              0000012
000000
A888888880009666520110121KS120110124                              0000002
000000
A888888880009666520110127KRA20110127                              0000001
000000
A88888888000966652011021147020110214                              0000002
000000
A888888880009666520110218KRA20110221                              0000002
000000
| 7.16.2.1  Interface configuration  |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- |
Key  Value
FORMAT  LGVSOFT
  The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
LGVSOFT. The other formats issue the HYDRA
standard format.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 80 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |

7.17  LOGA
The field lengths are not fixed in the LOGA interface. To separate the fields, a semicolon ";" is used.
Field names are in the first row separated by a separator.  This line is specified by LOGA, the order of the
fields cannot be changed:
Man;Akr;Pnr;Name;Vorname;Vertnr;LA;Tage;Std;Fakt;Betrag;Kst;Kostart;Ktr;Tdat;Zdat;Her;Herda
t;Proz;Kstb;Userid;Wert;Kst2Man;Kst2Akr;Kalk;Abr_Text;
| 7.17.1  Upload of monthly wage types  |     |     |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- | --- | --- |
The following fields are filled in HYDRA:
| Field name  | Data type /  | Contents  |     |     | Example  |     |
| ----------- | ------------ | --------- | --- | --- | -------- | --- |
format
| Man  | C5         | System:                                  | HYDRA  | company  number  | is  1  |     |
| ---- | ---------- | ---------------------------------------- | ------ | ---------------- | ------ | --- |
|      | mandatory  | converted to one number.                 |        |                  |        |     |
| Akr  | C5         | Payroll area: This field remains empty.  |        |                  |        |     |
| Pnr  | C12        | Personnel number                         |        |                  | 12345  |     |
mandatory
| SC  | C3  | Wage type  |     |     | 100  |     |
| --- | --- | ---------- | --- | --- | ---- | --- |
mandatory
| Days  | N5.2  | Absence times: absence days of a wage  |     |     |     |     |
| ----- | ----- | -------------------------------------- | --- | --- | --- | --- |
type.
For wage types with the average type "T"
the integer hour part.
Std (hours)  N5.2  Hours of a wage type.  Always" 0.0" for  167.75
wage types with the average type "T".
| Kst  | C15  | Executing  | cost  center  | (personnel  | master  105  |     |
| ---- | ---- | ---------- | ------------- | ----------- | ------------ | --- |
cost center)
Zdat  Datum   Assignment date (first day of a accounting  1998-12-01
|     | YYYY-MM- | month)  |     |     |     |     |
| --- | -------- | ------- | --- | --- | --- | --- |
DD
| Kstb  | C15  | Cost center to be debited from the wage  |     |     | 106  |     |
| ----- | ---- | ---------------------------------------- | --- | --- | ---- | --- |
type posting.

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     | Page 81 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | Interface Wage and Salary Programs (Payroll)  |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |

Proz  N5.2  Assign performance efficiency rate for LLE.   131.77
Abr_Text  C254  Additional  text  for  wage  type  (can  be
|     |     | printed  in  | payroll).  | Reserved  | for   |     |
| --- | --- | ------------ | ---------- | --------- | ----- | --- |
customizations.

N5,2: 5 decimal place, thereof 2 decimal places. The comma is the decimal separator.  Signs can be
prefixed.
All other fields remain empty.
Special feature for LOGA: If a "T" is entered in the "Average type" field when configuring the
wage types, the hourly portion of the wage type is confirmed in the "Days" field. The
field "Std" remains empty.
| 7.17.1.1  | Interface configuration  |     |     |     |     |     |
| --------- | ------------------------ | --- | --- | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |     |

| Active    |    |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     |     | Page 82 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --- | --------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT LOGA
Output format
WAGEGROUP ON
Special with LOGA: With format LOGA, the
interface always sets the first day of the relevant
month (FIRST).
DAY FIRST / LAST
Special with LOGA: With format LOGA, the
interface always sets the first day of the relevant
month (FIRST).
DATE OFF
The upload is performed without upload date. This
option is only available for FORMAT=LOGA and
FORMAT=TAYLORIX.
CUSTOMER or COMPANY In format LOGA, you can set the system using
or COMPANY_NONSALARIED_EMPLOYEES these keys.
and COMPANY_SALARIED_EMPLOYEES
CONTRACT or CONSULTANT With FORMAT=LOGA, the contract number that
must be transferred can be set using this key.
.
7.17.2 Upload of absences
The transfer of absences to LOGA takes place together with the monthly wage types in a shared interface
file.
EIS-LUG_82.docx Version: 1.0.22770 Page 83 of 129

    Interface Wage and Salary Programs (Payroll)

The actual accounted absences for the corresponding month are transferred. For absences that extend
beyond the end of a month, separate absences are posted for each month. In the case of certain
absences, this may require manual intervention in LOGA (for example, during continued pay to determine
the end of continued pay).
Changes to absences that are made in HYDRA after the transfer of absences to LOGA must be updated
manually in LOGA.
The key for transferring the absences is a string that can be set in the Absence reason field in the
Absence processing window (for example, AFREI, BILD, BUFML, MUTTI, ..., WEHRÜ):
Note:
The output of special Umlauts in the interface file is done in DOS code page (850).
Meaning of the separate fields in the data record:
| Field name  | Data  type  | /  Contents  | Example  |
| ----------- | ----------- | ------------ | -------- |
format
| Record type  | Text  | constant "[ZEITENKAL]"  | [ZEITENKAL]   |
| ------------ | ----- | ----------------------- | ------------- |
time calculation
| Function  | Text  | constant "INSERT"  | INSERT  |
| --------- | ----- | ------------------ | ------- |
ZK_UNIQID  Text  Unique identifier consisting of the current  040226000001
date and a consecutive number.
| ZK_HER       | Text    | constant "HYDRA"                   | HYDRA  |
| ------------ | ------- | ---------------------------------- | ------ |
| ZK_HER_DATE  | Date    | constant ""                        |        |
| ZK_USER_ID   | Text    | Clerk identification, constant ""  |        |
| MAN          | Text    | See wage type interface            |        |
| AK           | Text    | See wage type interface            |        |
| PNR          | Number  | See wage type interface            |        |
| Name         | Text    | constant ""                        |        |
| First name   | Text    | constant ""                        |        |
| VERTNR       | Number  | See wage type interface            |        |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 84 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| ZK_VON  | Date   | Start date of the absence  | 2004-01-16  |
| ------- | ------ | -------------------------- | ----------- |
YYYY-MM-
DD
| ZK_BIS  | Date   | End date of the absence  | 2004-01-20  |
| ------- | ------ | ------------------------ | ----------- |
YYYY-MM-
DD
| ZK_VONDAT2  | Text  | constant ""                         |        |
| ----------- | ----- | ----------------------------------- | ------ |
| ZK_BISDAT2  | Text  | constant ""                         |        |
| ZK_SYMBOL   | Text  | Time symbol (short name of absence  | MUTTI  |
payment)
| ZK_PLANAN    | Text    | constant ""                           | I   |
| ------------ | ------- | ------------------------------------- | --- |
| ZK_ANZARBTA  | Number  | Number of working days, constant ""   |     |
| ZK_ANZKALT   | Number  | Number of calendar days, constant ""  |     |
| ZK_BEMERK    | Text    | Comment, constant ""                  |     |
| Reserved     |         | 8 fields, constant ""                 |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 85 of 129  |
| ---------------- | --- | ------------------- | --------------- |

|     |     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |
| --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- |

| 7.17.2.1  | Interface configuration  |     |     |                                                   |     |     |     |
| --------- | ------------------------ | --- | --- | ------------------------------------------------- | --- | --- | --- |
| Key       |                          |     |     | Value                                             |     |     |     |
| FORMAT    |                          |     |     | LOGA                                              |     |     |     |
|           |                          |     |     | The key of the monthly wage types also specifies  |     |     |     |
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     |     |     | LOGA.  The  | other  formats  | issue  | the  HYDRA  |
| --- | --- | --- | --- | ----------- | --------------- | ------ | ----------- |
standard format.

| ABSENCES_SEPARATE_FILE  |     |     |     | ON  |     |     |     |
| ----------------------- | --- | --- | --- | --- | --- | --- | --- |
With the formats LOGA, the absences are written
in the same file as the wage types. You can use
this option to specify that also with these formats
the absences are written in a separate file using
the name hyfehl.dat.

| 7.18  LOGA 400  |     |     |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- | --- |
The interface to LOGA 400 contains fields with fixed record length.
There are the following formats for the separate field types:
A(n) Alphanumeric with n digits ( left-aligned, filled up with blanks)
N(n)   Numeric with n digits (right-aligned with leading zeros). If necessary, a minus symbol is placed in
the first position for negative values.
| N(n,i)   | Numeric  | with  | n   | digits,  | of  | which  | i  are   |
| -------- | -------- | ----- | --- | -------- | --- | ------ | -------- |
| decimal  |          |       |     |          |     |        | places   |
Example  A  field  N(4,2)  contains  "0321".  This  is  the  number  3,21.
If necessary, a minus symbol is placed in the first position for negative values.
| 7.18.1  | Upload of monthly wage types  |     |     |     |     |     |     |
| ------- | ----------------------------- | --- | --- | --- | --- | --- | --- |
The B6 record for transferring monthly wage types to LOGA 400 has the following structure:
| Field name  | Item  | Data  type  | Contents  |     |     |     | Example  |
| ----------- | ----- | ----------- | --------- | --- | --- | --- | -------- |
/ format

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     |     |     | Page 86 of 129  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| Record type  | 1  A(2)  | constant "B6"  | B6  |
| ------------ | -------- | -------------- | --- |
Company  3  A(2)  The first two digits of the company the person  01
works for.
Personnel number  5  N(7)  Personnel  number  from  HYDRA.  (The  0041356
personnel number has 8 digits in HYDRA and
only the last 7 digits are transferred.)
| Document number  | 12  N(5)  | always "00000"  | 00000  |
| ---------------- | --------- | --------------- | ------ |
Record date of the  17  YYYYMM  Year and month of the accounting month  200112
document
| Day of issue  | 23  TT  | First day of a accounting month  | 01  |
| ------------- | ------- | -------------------------------- | --- |
Executing cost  25  A(10)  The person's regular cost center  49721
center
Cost center to be  35  A(10)  The person's regular cost center  48723
debited
Cost object  45  A(10)  constant "   " (10 blanks)  "          "
| internal use  | 55  A(1)  | constant " " (1 blank)  | " "  |
| ------------- | --------- | ----------------------- | ---- |
Wage type  56  A(3)  The first three digits of the wage type  100
Machine number  59  A(5)  constant "     " (5 blanks)  "     "
| Operation            | 64  A(5)    | constant "     " (5 blanks)  | "     "  |
| -------------------- | ----------- | ---------------------------- | -------- |
| Sample piece         | 69  N(7)    | always "0000000"             | 0000000  |
| Yield                | 76  N(7)    | always "0000000"             | 0000000  |
| Production time per  | 83  N(5,2)  | always "00000"               | 0000000  |
piece (time/piece)
| Quantity unit  | 88  A(1)    | constant " " (1 space)  | " "      |
| -------------- | ----------- | ----------------------- | -------- |
| Setup time     | 89  N(5,2)  | always "00000"          | 0000000  |
| Time used      | 94  N(5,2)  | always "00000"          | 0000000  |
| Performance    | 99  N(5,2)  | always "00000"          | 0000000  |
efficiency rate
| Limited  | 104  A(1)  | constant " " (1 space)  | " "  |
| -------- | ---------- | ----------------------- | ---- |
performance
efficiency rate

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 87 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Paid time  105  N(5,2)  Duration that was posted to the wage type  12800
| Piecework for  | 110  | A(2)  constant "  " (2 blanks)  | "  "  |
| -------------- | ---- | ------------------------------- | ----- |
groups is paid
Internal use B5 or  112  A(4)  constant "     " (4 blanks)  "    "
B6
| Internal use B5 or  | 116  | A(1)  constant " " (1 space)  | " "  |
| ------------------- | ---- | ----------------------------- | ---- |
B6
| Wage record       | 117  | N(7,3)  always "0000000"  | 0000000  |
| ----------------- | ---- | ------------------------- | -------- |
| Index             | 124  | N(5)  always "00000"      | 00000    |
| Zuschlagsprozent- | 129  | N(5,2)  always "00000"    | 00000    |
satz
| Amount  | 134  | N(9,2)  always "000000000"  | 000000000  |
| ------- | ---- | --------------------------- | ---------- |
Group piecework:   143  A(2)  constant "  " (2 blanks)  "  "
Empty field B5 or  145  A(6)  constant "    " (6 blanks)  "      "
B6

| 7.18.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |
| Active    |         |     |     |
Key  Value
FORMAT  LOGA400
  Output format

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 88 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| 7.18.2  Upload of absences  |     |     |     |
| --------------------------- | --- | --- | --- |
The B1 record for transferring monthly totals and absences to LOGA 400 has the following structure:
| Field name  | Item  Data  | type  Contents  | Example  |
| ----------- | ----------- | --------------- | -------- |
/ format
| Record type  | 1  A(2)  | constant "B1"  | B1  |
| ------------ | -------- | -------------- | --- |
Company  3  A(2)  The first two digits of the company the person  01
works for.
Personnel number  5  N(7)  Personnel  number  from  HYDRA.  (The  0041356
personnel number has 8 digits in HYDRA and
only the last 7 digits are transferred.)
| Consecutive  | 12  N(3)  | always "000"  | 000  |
| ------------ | --------- | ------------- | ---- |
number
Record date of the  15  YYYYMM  Year and month of the accounting month  200112
document
| Day of issue  | 21  TT  | First day of a accounting month  | 01  |
| ------------- | ------- | -------------------------------- | --- |
Days  with  target  23  N(2)  Number of days including target time  21
time
| Target time  | 25  N(5,2)  | Number of target hours  | 16800  |
| ------------ | ----------- | ----------------------- | ------ |
| Tax days     | 30  N(2)    | always "00"             | 00     |
Days present  32  N(3,1)  Number of days inclding target time  180
Leave days  35  N(3,1)  Number of vacation days (payment day type  025
402)  incl. half days of holiday (payment day
type 404)
Sick leave  38  N(3,1)  Target  time  days  (only  whole  days)  with  010
payment day type 400 or 401.
Public holidays  41  N(3,1)  Target time days with payment day type 409  000
including half public holidays with payment day
type 410.
Social days  44  N(3,1)  Target time days with payment day type 405.  000
Excused absence  47  N(3,1)  Target time days with payment day type 408.  000

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 89 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Unexcused  50  N(3,1)  Target time days with payment day type 407.  000
absence days
| Holiday leave hours  | 53  | N(5,2)  |     | 00000  |
| -------------------- | --- | ------- | --- | ------ |
always "00000"
| Hours of illnesss  | 58           | N(5,2)  | always "00000"  | 00000  |
| ------------------ | ------------ | ------- | --------------- | ------ |
| Public             | holiday  63  | N(5,2)  | always "00000"  | 00000  |
hours
| Social hours  | 68           | N(5,2)  | always "00000"  | 00000  |
| ------------- | ------------ | ------- | --------------- | ------ |
| Excused       | absence  73  | N(5,2)  | always "00000"  | 00000  |
hours
| Unexcused  | 78  | N(5,2)  | always "00000"  | 00000  |
| ---------- | --- | ------- | --------------- | ------ |
absence hours
| Total  | for  used  83  | N(5,2)  | always "00000"  | 00000  |
| ------ | -------------- | ------- | --------------- | ------ |
piecework time
Calculated  flextime  88  N(5,2)  Changes  of  the  flextime  accounts  (max.  99  -1250
| hours               |                 |       | minus hours can be transferred)  |      |
| ------------------- | --------------- | ----- | -------------------------------- | ---- |
| Printed gross wage  | 93              | A(1)  | constant " " (1 space)           | " "  |
| Wage                | after  tax  94  | A(1)  | constant " " (1 space)           | " "  |
printed
| Time  | collection  95  | N(5,2)  | always "00000"  | 00000  |
| ----- | --------------- | ------- | --------------- | ------ |
Hours
| Number  | of  100  | N(3,0)  | always "000"  | 000  |
| ------- | -------- | ------- | ------------- | ---- |
interruptions
Empty field  103  A(48)  constant "                       " (48 blanks)  "                "

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 90 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

Note: To ensure that the absences are assigned correctly, the following payment day types
must be observed:
Wage    Meaning
Day type
400, 401 :       Sick leave (with/without continued pay)
402 :     Half holiday
404 :     Half holiday
405 :     Social day
407 :     Unexcused
408 :     Excused
409 :     Full holiday
410 :     Half holiday
7.19  Navision Wage
7.19.1  Upload of monthly wage types
The data record for transferring the monthly wage types to Navision Pay has the following structure:
| Field name  | Data  type  | /  Contents  |     |     | Example  |
| ----------- | ----------- | ------------ | --- | --- | -------- |
format
| Personnel number  | N(5)    | Personnel number from HYDRA  |            |          | 00123    |
| ----------------- | ------- | ---------------------------- | ---------- | -------- | -------- |
| Wage type         | N(4)    | Wage type number             |            |          | 100      |
| Number of days    | N(4,2)  | Number                       | of  total  | absence  | days  6  |
To transfer the number, the wage type must
match the number of the absence payment.
| Accounting date  | DDMMYY  | Accounting date  |     |     | 010208  |
| ---------------- | ------- | ---------------- | --- | --- | ------- |
Duration  N(7,2)  Duration that was posted to the wage type  48.50

The different data fields are separated by a '|' The data record is finished via CRLF.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 91 of 129  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     | Interface Wage and Salary Programs (Payroll)  |     |
| --- | --- | --- | --------------------------------------------- | --- |

Example:
96665|100|2|010507|59.87|
96665|111||010507|4.25|
96665|200||010507|7.00|
96665|211||010507|6.00|
96665|400||010507|9.50|
96665|420||010507|0.43|
96665|450|10|010507|72.00|
96665|600|2|010507|16.00|
| 7.19.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |

The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |                |     |     |
| --------- | --- | -------------- | --- | --- |
| Key       |     | Value          |     |     |
| FORMAT    |     | NAVISION       |     |     |
|           |     | Output format  |     |     |
PERSONNEL_NUMBER_LENGTH  With  FORMAT=NAVISION,  you  can  use  this
option to configure the personnel number length

with leading zeros. If the option is not set, the
personnel number is set to five digits and is filled
with leading zeros.

| 7.20  ORGATIME  |                               |     |     |     |
| --------------- | ----------------------------- | --- | --- | --- |
| 7.20.1          | Upload of monthly wage types  |     |     |     |
The interface for confirming monthly wage types to ORGATIME has the following structure:
| Field  |     | Pos / length  | Description   |     |
| ------ | --- | ------------- | ------------- | --- |
Personnel number     1 /   8  Personnel number with leading zeros left-aligned
8 digits
| Not assigned  |     |    9 /   2  | Empty 2 digits                        |     |
| ------------- | --- | ----------- | ------------------------------------- | --- |
| Wage type     |     |  11 /   6   | Labeled wage types, must be posted.   |     |
6 digits

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 92 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

|     |     |     | Interface Wage and Salary Programs (Payroll)  |     |
| --- | --- | --- | --------------------------------------------- | --- |

| Field         |     | Pos / length  | Description                              |     |
| ------------- | --- | ------------- | ---------------------------------------- | --- |
| Date          |     |  17 /   6     | Date in the format of YYMMDD - 6 digits  |     |
| Not assigned  |     |  23 / 10      | Empty 10 digits                          |     |
| Company       |     |  33 /   2     | Company 2 digits                         |     |
| Not assigned  |     |  35 / 14      | Empty 14 digits                          |     |
| Cost center   |     |  49 /   8     | Cost center, aligned to the right        |     |
| Not assigned  |     |  57 / 22      | Empty 22 digits                          |     |
| Quantity      |     |  79 / 12      | Quantity 12 digits                       |     |
| Not assigned  |     |  91 /   8     | Empty 8 digits                           |     |
| CRLF          |     |               |                                          |     |

| 7.20.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |                |     |     |
| --------- | --- | -------------- | --- | --- |
| Key       |     | Value          |     |     |
| FORMAT    |     | ORGATIME       |     |     |
|           |     | Output format  |     |     |

| 7.21  Paisy  |     |     |     |     |
| ------------ | --- | --- | --- | --- |
Legend:
| A(n)  Alphanumeric with n digits                      |     |     |     |     |
| ----------------------------------------------------- | --- | --- | --- | --- |
| N(n)  Numeric with n digits                           |     |     |     |     |
| N(n,i)  Numeric with n digits, with i decimal places  |     |     |     |     |
  Example: In a field N(4,2), the value is "0321". This is the number 3,21.
K(n)  Constant text of length n
| 7.21.1  | Upload of monthly wage types  |     |     |     |
| ------- | ----------------------------- | --- | --- | --- |
Uploads of the monthly wage is in the following format:

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 93 of 129  |
| ---------------- | --- | ------------------- | --- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| Field name  | Type  | /  Digits  | Contents  | Example  |
| ----------- | ----- | ---------- | --------- | -------- |
format
| Record type  | K(2)  | 1 - 2  | Record type (constant P1)  | "P1"  |
| ------------ | ----- | ------ | -------------------------- | ----- |
Company  A(7)  3 - 6  Company from personnel master data left- "BSP    "
aligned (Paisy defines only positions 3 to 4
as company)
Personnel number  N(6)  7 – 12  Personnel number with leading zeros  "000041"
Group number  K(4)  13 – 15  Paisy: For group accounting Not filled by  "    "
HYDRA
| General ledger  | K(1)  | 16  | Not filled by HYDRA  | " "  |
| --------------- | ----- | --- | -------------------- | ---- |
account assignment
Date  A(6)  17 – 22  Date, first day of the consecutive month  "010297"
|                        | DDMMYY  | DDMMYY   |               |        |
| ---------------------- | ------- | -------- | ------------- | ------ |
| Accounting number      | K(1)    | 23       | Always "1"    | "1"    |
| Collection identifier  | K(1)    | 24       | Constant "S"  | "S"    |
| Wage type              | A(3)    | 25 – 27  | Wage type     | "265"  |
Time  N(5,2)  28 - 32  Time that is posted to the wage type.  "14372"
Duration in industrial minutes
Factor /   N(5,2)  33 – 37  Paisy fills this field twice and interprets it as  "     "
Wage group  C(4)  33 – 36  a factor or wage group. Is left empty by
HYDRA.
| Amount  | N(7,2)  | 38 - 44  | Amount Always 0  | "0000000"  |
| ------- | ------- | -------- | ---------------- | ---------- |

| 7.21.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 94 of 129  |
| ---------------- | --- | --- | ------------------- | --------------- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- |

| Key        |     |     | Value          |     |     |     |     |
| ---------- | --- | --- | -------------- | --- | --- | --- | --- |
| FORMAT     |     |     | Paisy          |     |     |     |     |
|            |     |     | Output format  |     |     |     |     |
| ABSENCES   |     |     | ON             |     |     |     |     |
| WAGEGROUP  |     |     | ON             |     |     |     |     |
You can use this option to transfer the entry in
|     |     |     | field  LOBU  | indicator  | from  the  | configuration  | of  |
| --- | --- | --- | ------------ | ---------- | ---------- | -------------- | --- |
wage types to the field Wage group of the Paisy
interface.

| DAY   |     |     | FIRST / LAST  |              |               |        |      |
| ----- | --- | --- | ------------- | ------------ | ------------- | ------ | ---- |
|       |     |     | Special       | with  LOGA:  | With  format  | LOGA,  | the  |
interface always sets the first day of the relevant
month (FIRST).

CUSTOMER or COMPANY  With  the  formats  PAISY,  you  can  use  these
options to specify the company.
or  COMPANY_NONSALARIED_EMPLOYEES
and COMPANY_SALARIED_EMPLOYEES

COMPANY_LENGTH  You can use this option to set the length of the
company with FORMAT=PAISY.
| COSTCENTER  |     |     | ON                   |     |            |         |          |
| ----------- | --- | --- | -------------------- | --- | ---------- | ------- | -------- |
|             |     |     | With  FORMAT=PAISY,  |     | the  cost  | center  | is  not  |
included in our standard interface. Use this key to
activate the output of the cost center.

| 7.21.2  Upload of absences  |     |     |     |     |     |     |     |
| --------------------------- | --- | --- | --- | --- | --- | --- | --- |
The upload of the absences to Paisy is done as a P3 record:
| Field name  | Data type /  | Contents  |     |     | Example  |     |     |
| ----------- | ------------ | --------- | --- | --- | -------- | --- | --- |
format
| Assign type  | K2  | Assign type (constant P3)                 |     |     | P 3  |     |     |
| ------------ | --- | ----------------------------------------- | --- | --- | ---- | --- | --- |
| Company      | A2  | Position 1 and 2 of the person's company  |     |     | 24   |     |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     |     | Page 95 of 129  |     |
| ---------------- | --- | ------------------- | --- | --- | --- | --------------- | --- |

    Interface Wage and Salary Programs (Payroll)

| Empty  | K2  | Constant 2 blanks  | „  “  |
| ------ | --- | ------------------ | ----- |
Personnel number  N6  HYDRA personnel number (max. the last 6  999999
digits)
| Empty            | 4       | Constant 4 blanks          | „    "  |
| ---------------- | ------- | -------------------------- | ------- |
| Start date       | DDMMYY  | Start date of the absence  | 070104  |
| Accounting no.   | 1       |                            | 1       |
Always 1
| Collection ID  | 1   |     | Z   |
| -------------- | --- | --- | --- |
Constant Z
| Time type  | N3  |     | 410  |
| ---------- | --- | --- | ---- |
The last 3 digits absence payment
| Time  | 5   |     | „     “  |
| ----- | --- | --- | -------- |
Constant 5 blanks
| Empty     | K%      | Constant 5 blanks  | „     “  |
| --------- | ------- | ------------------ | -------- |
| End date  | DDMMYY  |                    | 120104   |
End date of the absence
| Empty     | 24  | Constant 24 blanks  | „                        “  |
| --------- | --- | ------------------- | --------------------------- |
| Shift ID  | A3  |                     | GAN                         |
"GAN" for full day's holiday and "HAL" for
half day's holiday

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 96 of 129  |
| ---------------- | --- | ------------------- | --------------- |

    Interface Wage and Salary Programs (Payroll)

| 7.21.2.1  Interface configuration  |     |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- | --- |
Key  Value
FORMAT  Paisy
  The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     | PAISY.  The  | other  formats  | issue  the  | HYDRA  |
| --- | --- | ------------ | --------------- | ----------- | ------ |
standard format.

ABSENCES_SEPARATE_FILE  ON
With the formats PAISY, the absences are written
in the same file as the wage types. You can use
this option to specify that also with these formats
the absences are written in a separate file using
the name hyfehl.dat.

7.22  PASBAS (Syllwasschy)
7.22.1  Upload of monthly wage types
The data record for transferring the monthly wage types to PASBAS (Syllwasschy) has the following
structure:
| Field name  | Item  Data type  | Contents                   |     | Example  |     |
| ----------- | ---------------- | -------------------------- | --- | -------- | --- |
| LBSA        | 1  N(2)          | Record type (constant 83)  |     | 83       |     |
| LBFA        | 3  C(5)          | Company                    |     | BSP      |     |
| LBL1        | 8  C(3)          | Empty field                |     |          |     |
| LBPERS      | 11  N(4)         | Personnel number 4 digits  |     | 9999     |     |
| LBKST       | 15  C(6)         | Cost center 6 digits       |     | 123456   |     |
| LBTTX       | 21  C(2)         | Day (constant "01")        |     | 01       |     |
| LBMM        | 23  N(2)         | Consecutive month          |     | 06       |     |
| LBLART      | 25  C(3)         | ŸWage type 3 digits        |     | 100      |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 97 of 129  |     |
| ---------------- | --- | ------------------- | --- | --------------- | --- |

    Interface Wage and Salary Programs (Payroll)

| LBSTD  | 28  | N(8,2)  Duration of absence/attendance  | 00000800  |
| ------ | --- | --------------------------------------- | --------- |
| LBKZ   | 36  | C(1)  Amount ID (constant 1 "Euro")     | 1         |
| LBZT1  | 37  | N(8,2)  constant 0                      | 00000000  |
| LBZT2  | 45  | N(8,2)  constant 0                      | 00000000  |
| LBL2   | 53  | C(2)  constant empty                    |           |
| LBAUF  | 55  | C(11)  constant empty                   |           |
| LBPOS  | 66  | C(5)  constant empty                    |           |
| LBFAK  | 71  | N(5,2)  constant 0                      | 00000     |
| LBZUS  | 76  | N(5,2)  constant 0                      | 00000     |
At the end of each row are Carriage Return and Linefeed (CR/LF).
Data types:
| Type  Meaning                   |     | Formatting          |     |
| ------------------------------- | --- | ------------------- | --- |
| C(n)  Character (string, text)  |     | Length n            |     |
| N(n)  Integer                   |     | with max. digits n  |     |
N(x.y)  Decimal number  Without decimal separator with maximum x total digits and y
decimal places.

Example (with return at position 71):
83BSP     999912345601051000000080010000000000000000
0000000000

| 7.22.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 98 of 129  |
| ---------------- | --- | ------------------- | --------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT PASBAS
Output format
CUSTOMER or COMPANY With the formats PASBAS, you can use these
or COMPANY_NONSALARIED_EMPLOYEES options to specify the company.
and COMPANY_SALARIED_EMPLOYEES
7.23 PEWISO (S+P payroll accounting)
7.23.1 Upload of monthly wage types
The data record for transferring the monthly wage types to PEWISO (S+P Payroll Accounting) has the
following structure:
Data format of the wage transaction data
Field Description Type Examples
System number Number of the system Num 1 100
Accounting month Accounting month Num 2 12
Accounting year Accounting year Num 1996 2000
Personnel number Personnel number of the employee Num 1 520
Wage type number Number of the wage type Num 5 102
Date Day of the accounting month, if necessary Num 12 [empty]
Cost center Number of cost center, if necessary Alpha "4001" [empty]
Cost object Number of cost object, if necessary Alpha "1000" [empty]
Work type Encoding of the work type according to the Alpha "B" [empty]
specifications of the employment office, if
necessary for WG/ZWG/WAG application in
s+p Baulohn
Number Factor 1, numeric value or zero Currency 10.00 1.00
Amount Factor 2, numeric value or zero Currency 17.80 -78.00
bonus Bonus value, depending on the definition of Currency 25.00 [empty]
the wage type, numeric value or zero
 The interface has separated fields due to the semicolon.
 Each data record is displayed in a line (0D, 0A end of the lines).
 Numeric fields are displayed in the format: 999999.99 or -999999.99 or 9999999, alphanumeric fields
in quotation marks
Field sequence:
Client number; payroll month; payroll year; personnel number; wage type number; [date]; [cost center];
[cost object]; [work type]; number; amount; overhead.
The entry in the square brackets are optional.
EIS-LUG_82.docx Version: 1.0.22770 Page 99 of 129

    Interface Wage and Salary Programs (Payroll)

Example file
100;12;2009;9;1100;01;"4711";;;651.62;;
100;12;2009;9;370;01;"4711";;;7.50;;
100;12;2009;9;42;01;"4711";;;5.50;;
100;12;2009;9;51;01;"4711";;;2.08;;
100;12;2009;10;41;01;"5187";;;25.00;;
100;12;2009;10;526;01;"5187";;;42.00;;

| 7.23.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |
Key  Value
FORMAT  PEWISO
  Output format

| 7.24  proLOHN (proALPHA)  |     |     |     |
| ------------------------- | --- | --- | --- |
To import gross wage data from other systems, ProAlpha provides an ASCII interface which can be used
to import data from a connected PZE system.
The field contents are to be lined up in the appropriate length for each record. Unused blanks must be
filled in with blanks. Character fields are to be transferred left-aligned and numeric fields right-aligned. In
accordance with setting of the E-parameter (set parameter = European format), the decimal point must be
a comma if the format is European, otherwise the point must be used. As of version 4.02a, both comma
and dot can be used as decimal point independently of the E-parameter. The end of record indicator
(CR/LF) customary in the operating system used must be set at the end of each record.
There is no column separator.

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 100 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

7.24.1  Upload of monthly wage types
The interface has the following format:
| Field name  | Item  Data type  | Contents  | Exampl | Format  |
| ----------- | ---------------- | --------- | ------ | ------- |
e
| BLANK   | 1  C(2)   | Constant empty  |      | x(2)   |
| ------- | --------- | --------------- | ---- | ------ |
| FIRMA   | 3  C(10)  | Company         | BSP  | x(10)  |
| PERSKZ  | 13  C(1)  | Person ID       | P    | X      |
constant „P“
| MITARBEITER  | 14  N(6)  | Personnel number  | 999999  | zzzzz9  |
| ------------ | --------- | ----------------- | ------- | ------- |
(employee)
| TAG      | 20  N(2)  | Accounting day            | 10    | z9    |
| -------- | --------- | ------------------------- | ----- | ----- |
| MONAT    | 22  N(2)  | Accounting month          | 12    | z9    |
| JAHR     | 24  N(4)  | Payroll year              | 2006  | 9999  |
| LOHNART  | 28  C(3)  | Wage type of absence pay  | 100   | x(3)  |
ZEIT  31  N(7,2)  Duration of absence/attendance  8.00  -zz9.99
| MENGE          | 38  N(10)  | Constant empty  |     | -zzzzz9.99  |
| -------------- | ---------- | --------------- | --- | ----------- |
| SATZ (record)  | 48  N(10)  | Constant empty  |     | zzzz9.9999  |
| MENGENSATZ     | 58  N(8)   | Constant empty  |     | zz9.9999    |
(quantity record)
| PROZENT  | 66  N(6)  | Constant empty  |     | zz9.99  |
| -------- | --------- | --------------- | --- | ------- |
(percentage)
| BETRAG (amount)  | 72  N(10)  | Constant empty  |      | -zzzzz9.99  |
| ---------------- | ---------- | --------------- | ---- | ----------- |
| KOSTENSTELLE     | 82  N(8)   | Cost center     | 105  | zzzzzzz9    |
(cost center)
| KOSTENTRAEGER  | 90  C(20)  | Constant empty  |     | X(20)  |
| -------------- | ---------- | --------------- | --- | ------ |
(cost object)
| BESCHREIBUNG:  | 110  C(20)  | Constant empty  |     | X(60)  |
| -------------- | ----------- | --------------- | --- | ------ |
At the end of each row are carriage Return and linefeed (CR/LF).

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 101 of 129  |
| ---------------- | --- | ------------------- | --- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

Data types:
| Type  Meaning                   |     | Formatting          |     |
| ------------------------------- | --- | ------------------- | --- |
| C(n)  Character (string, text)  |     | with max. length n  |     |
| N(n)  Integer                   |     | with max. digits n  |     |
N(x.y)  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".
Example:

| 7.24.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 102 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT PROLOHN
Output format
7.24.2 Upload of absences
For the upload of absences, the same format is used than for the monthly wage types. You can specify
the absence reason transferred to proLOHN using the application Control of absences.
The absences are not transferred as periods (with start and end date), but per day. When you configure
the absence interface, be careful to configure that the absences are transferred as separate days.
7.24.2.1 Interface configuration
Key Value
FORMAT PROLOHN
The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
PROLOHN. The other formats issue the HYDRA
standard format.
ABSENCES_SEPARATE_DAYS ON
If this option is enabled, the absences are
uploaded as separate days and not as periods
from...to. If the absences are transferred in the
format PROLOHN, this option must be enabled
because the interface format only provides a date
field.
EIS-LUG_82.docx Version: 1.0.22770 Page 103 of 129

Interface Wage and Salary Programs (Payroll)
7.25 sage KHK
7.25.1 Upload of monthly wage types
Uploads of the monthly wage is in the following format:
No. Field designation Type VKS Item Comment
1 Month Alpha 2 1 Payroll month (usually the consecutive month)
2 Personnel number Alpha 6 3 with leading zeros If the personnel numbers are
longer, the leading digits are cut.
3 Wage type number Alpha 3 9 For longer HYDRA wage types, the trailing digits are
cut off.
4 Time Alpha 6 12 HHH:MM or TTT:TT (T = daily wage types). The
transfer is performed in industrial minutes (divided by
100).
5 Amount Alpha 6 18 Constant 000.00
(3 pre-decimal places, point, 2 decimal places)
6 Cost center Alpha 5 24 For longer HYDRA cost centers, the trailing digits are
cut off.
7 G/L account Alpha 5 29 Constant 00000.
8 Cost object Alpha 5 34 The field is not filled, so the master cost object from
the personnel master is used in the KHK system.
9 ISO code of the Alpha 3 39 Specify EUR Not assigned.
currency. This means that KHK uses the wage system's own
currency.
10 CR/LF Alpha 2 42 Alt (13) + Alt (10)
The interface for confirming monthly wage types corresponds to the sage-KHK manual "Classic Line
2000" chapter 10, status 12/4/2000.
Note: When using this interface, only numeric cost centers (5 digits with leading zeros) and
wage types (3 digits with leading zeros) are allowed in HYDRA.
EIS-LUG_82.docx Version: 1.0.22770 Page 104 of 129

    Interface Wage and Salary Programs (Payroll)

Infos from the sage-KHK manual
Attention: Contrary to chapter 1.1 of the sage-KHK-manual ("Introduction/General") the attributes of this
data set are not to be separated by separators such as comma or inverted commas.
The data records are to be stored for KHK in a file that must be located in the current system directory.
The file name is 020410mm (mm = month 01-12) without extension. Example „January“: 020410001.
After successful import, the file is provided with the extension *.KHK. This file serves as a backup copy
and remains in the system directory until it is overwritten by a corresponding file with the same name,
usually after twelve months.
| 7.25.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |
Key  Value
FORMAT  SAGE-KHK

Output format

| 7.26  Taylorix  |                               |     |     |
| --------------- | ----------------------------- | --- | --- |
| 7.26.1          | Upload of monthly wage types  |     |     |
In the interface for uploading monthly wage types to Taylorix, the length of the fields is not fixed. Instead,
they are separated by a separator. The separator is the semicolon ";".
In the file header there is a line with the company number and the company identification number. These
are preset in HYDRA (with 483543;6101) and, if necessary, can be changed with a text editor before
being read into Taylorix.
Field names are in the second line separated by a separator.  This line is specified by Taylorix.
The following lines are data rows.  There are the following formats for the separate field types:

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 105 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| -  Text field  |     |     |     |
| -------------- | --- | --- | --- |
Can be formatted by HYDRA with trailing blanks.  These are then ignored by Taylorix.
| -  Number fields  |     |     |     |
| ----------------- | --- | --- | --- |
Decimal separators for the decimal places is the point.  Numbers can include leading
zeros.  These are processed by Taylorix correctly.
| -  Date fields:  |     |     |     |
| ---------------- | --- | --- | --- |
A date is specified in the format YYYY-MM-DD.
The data rows have a processing indicator at the beginning, which is always "A" for "Append" in the
payroll interface. A data row is always concluded with the characters for "carriage return" and "line feed"
(hexadecimal 0D0A).
The data has the following structure:
| Field name  | Data type /  | Contents  | Example  |
| ----------- | ------------ | --------- | -------- |
format
| LVB_PERS  | Number  | Personnel number      | 14234   |
| --------- | ------- | --------------------- | ------- |
| LVB_LA    | Text    | Wage type             | 100     |
| LVB_STD   | Number  | Hours of a wage type  | 008.00  |
| LVB_BETR  | empty   | empty                 | ""      |
LVB_TAG  Date  First day of the accounting month.  No date  1999-09-01
is specified for the customer system USG.
| LVB_LSATZ  | empty  | empty  | ""  |
| ---------- | ------ | ------ | --- |
| LVB_ZUSCH  | empty  | empty  | ""  |
LVB_KOST  Text  Cost center to which the time on the wage  "105     "
type was posted in HYDRA.
| LVB_SZAEHL  | empty  | empty  | ""  |
| ----------- | ------ | ------ | --- |
| LVB_BAUST   | empty  | empty  | ""  |
| LVB_EINH    | empty  | empty  | ""  |
| LVB_LG      | empty  | empty  | ""  |
| LVB_RUEST   | empty  | empty  | ""  |
| LVB_MENGE   | empty  | empty  | ""  |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 106 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| LVB_VORGE  | empty  | empty  |     | ""  |
| ---------- | ------ | ------ | --- | --- |
| LVB_VKEZI  | empty  | empty  |     | ""  |

Example:
Note that the line with the field names is displayed here on two lines for space reasons.
483543;6101
VKZ;LVB_PERS;LVB_LA;LVB_STD;LVB_BETR;LVB_TAG;LVB_LSATZ;LVB_ZUSCH;LVB_KOST;LVB
_SZAEHL;LVB_BAUST;LVB_EINH;LVB_LG;LVB_RUEST;LVB_MENGE;LVB_VORGE;LVB_VKEZI
A;2000;100;001.67;;1999-08-01;;;105;;;;;;;;
A;2003;100;219.40;;1999-07-01;;;105;;;;;;;;
A;2003;100;252.65;;1999-08-01;;;105;;;;;;;;
A;2003;100;244.50;;1999-09-01;;;105;;;;;;;;
A;2005;100;015.75;;1999-06-01;;;105;;;;;;;;
A;2005;400;023.50;;1999-06-01;;;105;;;;;;;;
A;2005;400;004.50;;1999-05-01;;;105;;;;;;;;
A;2005;100;091.75;;1999-07-01;;;105;;;;;;;;
A;2005;400;095.17;;1999-07-01;;;105;;;;;;;;
A;2020;1;135.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;30;000.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;35;000.75;;1999-01-01;;;2040000;;;;;;;;
A;2020;42;008.00;;1999-01-01;;;2040000;;;;;;;;
A;2020;1;119.50;;1999-02-01;;;2040000;;;;;;;;
A;2020;30;000.25;;1999-02-01;;;2040000;;;;;;;;
A;2020;35;000.25;;1999-02-01;;;2040000;;;;;;;;
A;2020;380;040.00;;1999-02-01;;;2040000;;;;;;;;
| 7.26.1.1  | Interface configuration  |     |     |     |
| --------- | ------------------------ | --- | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |
| --------- | -------- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |
| Key       | xxxxxx   |     |     |     |
| Value     | xxxxxx   |     |     |     |

| Active    |    |     |     |     |
| --------- | --- | --- | --- | --- |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 107 of 129  |
| ---------------- | --- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

Key  Value
FORMAT  TAYLORIX

Output format

DATE  OFF
The upload is performed without upload date. This
option is only available for FORMAT=LOGA and
FORMAT=TAYLORIX.

| 7.27  TOPAS  |                               |     |     |     |
| ------------ | ----------------------------- | --- | --- | --- |
| 7.27.1       | Upload of monthly wage types  |     |     |     |
The data records for uploading monthly wage types have the following structure:
| Field name  | Data  type  | /  Max.  | Notes  |     |
| ----------- | ----------- | -------- | ------ | --- |
|             | format      | digits   |        |     |
FIRMA  alphanum.  3  3 digits, last digit from HYDRA is cut.
| PERSN  |     | 5   | Personnel number, leading zeros  |     |
| ------ | --- | --- | -------------------------------- | --- |
alphanum.
| YYMM   | YYYYMM  | 6   | Payroll month  |     |
| ------ | ------- | --- | -------------- | --- |
| YYMMV  | -       | 6   | (empty)        |     |
LOA   alphanum.  3  3  characters  of  wage  type,  last  character  cut  off  from
HYDRA
 BEZZT  FLIESS  6.2  Duration, sum of attendance and absence time; displayed
in hours with two decimal places without decimal separator
(23.25 hours gives 002325).
| TAGE (days)  | -    |     | (empty)  |     |
| ------------ | ---- | --- | -------- | --- |
|  FAKTOR      | -    |     | (empty)  |     |
(factor)
|  LOBET_F  | -    |     | (empty)  |     |
| --------- | ---- | --- | -------- | --- |
| WKZ       | -    |     | (empty)  |     |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 108 of 129  |
| ---------------- | --- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| LOBET   | -          |   (empty)                                 |     |
| ------- | ---------- | ----------------------------------------- | --- |
| LOBEST  | -          |   (empty)                                 |     |
| LOBESV  | -          |   (empty)                                 |     |
| KOSTL   | alphanum.  | 10  Cost center of the wage type posting  |     |
| KOTR    | alphanum.  | 10  (empty) cost object                   |     |
| VORG    | -          |   (empty)                                 |     |
| BEDT    | -          |   (empty)                                 |     |
| KZRAB   | -          |   (empty)                                 |     |
| HERKZ   | -          |   (empty)                                 |     |
| LKZ     | -          |   (empty)                                 |     |
| ERFUSR  | -          |   (empty)                                 |     |
| ERFDT   | -          |   (empty)                                 |     |
| CHGUSR  | -          |   (empty)                                 |     |
| CHGDT   | -          |   (empty)                                 |     |
| CHGZT   | -          |   (empty)                                 |     |

The semicolon ";" is used as a separator for the fields.
Example (110 hours on wage type 100, cost center 5187):
BSP;00123;200201;;100;11000;;;;;;;;5187;;;;;;;;;;;;
| 7.27.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 109 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

Key  Value
FORMAT  TOPAS

Output format

| 7.27.2  | Upload of absences  |     |     |     |
| ------- | ------------------- | --- | --- | --- |
Absence times are transferred via a separate interface file.  The file is name „hyfehl.dat“, is located on the
HYDRA server in the directory where HYDRA is installed and is always generated together with the
interface for monthly wage types.
Data record have the following structure:
| Field name  | Data  type  | /  Max.  | Notes  |     |
| ----------- | ----------- | -------- | ------ | --- |
|             | format      | digits   |        |     |
FIRMA  alphanum.  3  3 digits, last digit from HYDRA is cut.
| PERSN  |     | 5   | Personnel number, leading zeros  |     |
| ------ | --- | --- | -------------------------------- | --- |
alphanum.
| VONDT  | DDMMYYY | 10  | Start date of the absence  |     |
| ------ | ------- | --- | -------------------------- | --- |
Y
| BISDT  | DDMMYYY | 10  | End date of the absence  |     |
| ------ | ------- | --- | ------------------------ | --- |
Y
| FZGR  | alphanum.  | 3   | Absence group is reserved for "FEH".   |     |
| ----- | ---------- | --- | -------------------------------------- | --- |
FZGD  alphanum.  3  Absence reason; type number of the absence
remuneration or Lobu error reason from the absence
processing.
FZTAGZR  fliess  7.2  Absence days in numbers (with 2 decimal places)
| FZSTDZR  | fliess     | 9.2  | (empty)  |     |
| -------- | ---------- | ---- | -------- | --- |
| FZTX     | alphanum.  | 50   | (empty)  |     |
| DVGRD    | numeric    | 2    | (empty)  |     |
| LKZ      | alphanum.  | 1    | (empty)  |     |
| ERFUSR   | alphanum.  | 10   | (empty)  |     |
| ERFDT    | DDMMYYY    | 10   | (empty)  |     |
Y

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 110 of 129  |
| ---------------- | --- | --- | ------------------- | ---------------- |

|     |     |     |   Interface Wage and Salary Programs (Payroll)  |     |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- | --- |

| CHGUSR  | alphanum.  | 10  (empty)  |     |     |     |     |
| ------- | ---------- | ------------ | --- | --- | --- | --- |
| CHGDT   | DDMMYYY    | 10  (empty)  |     |     |     |     |
Y
| CHGZT  | -    |   (empty)  |     |     |     |     |
| ------ | ---- | ---------- | --- | --- | --- | --- |

A data record looks like the following example:
(4 days absence 300 from 28.01.2002 to 31.01.2002)
BSP;00009;28.01.2002;31.01.2002;FEH;300;400;;;;;;;;;;
| 7.27.2.1  | Interface configuration of absences  |     |        |     |     |     |
| --------- | ------------------------------------ | --- | ------ | --- | --- | --- |
| Key       |                                      |     | Value  |     |     |     |
| FORMAT    |                                      |     | TOPAS  |     |     |     |

The key of the monthly wage types also specifies
the format. A manufacturer-specific format for the
absence interface is only available for the formats
|     |     |     | TOPAS.  The  | other  formats  | issue  the  | HYDRA  |
| --- | --- | --- | ------------ | --------------- | ----------- | ------ |
standard format.

| 7.28  Varial  |                               |     |     |     |     |     |
| ------------- | ----------------------------- | --- | --- | --- | --- | --- |
| 7.28.1        | Upload of monthly wage types  |     |     |     |     |     |
The data for confirming monthly wage types is transferred in the following format:
| Field name  | Data type /  | Contents  |     |     | Example  |     |
| ----------- | ------------ | --------- | --- | --- | -------- | --- |
format
Record ID  A(3)  Record identification, constant "HYD"  "HYD"
Company number  N(3)  Company from the HR master data Only  "01 "
the first 3 digits of the company number are
transferred.
| Include  | YYYYMM  | Payroll month  |     |     | 200310  |     |
| -------- | ------- | -------------- | --- | --- | ------- | --- |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     |     | Page 111 of 129  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

    Interface Wage and Salary Programs (Payroll)

Personnel number  N(7)  Personnel  number  (max.  7  digits  with  0001432
leading zeros)
Entry date  YYMMDD  Contains the first day of the months when  031001
data are collected.  If there is a daily data
transfer, then the day is also included.
| Wage type  | N(3)  | ŸWage type (max. 3 digits)  | "21 "  |
| ---------- | ----- | --------------------------- | ------ |
counters  N(6)  A  constant  0  is  transferred  in  this  field.  000000
Varial sets unique value.
| KST/KTR/order  | N(9)  | always "000000000"  | 000000000  |
| -------------- | ----- | ------------------- | ---------- |
Cost center  N(9)  Cost  center  where  the  wage  type  was  000036745
collected (9 digits with leading zeros)
| Record priority  | N(1)  | always "0"    | 0   |
| ---------------- | ----- | ------------- | --- |
| Wage group       | N(2)  | constant "01  | 01  |
Order number  A(15)  constant "               " (15 blanks)  "               "
| Operation number   | N(3)  | always "000"  | 000  |
| ------------------ | ----- | ------------- | ---- |
| Sub operation      | N(1)  | always "0"    | 0    |
number
| Target setup time | N(5)  | constant "00000+"  | 00000+  |
| ----------------- | ----- | ------------------ | ------- |

| Actual setup time     | N(5)  | constant "00000+"      | 00000+      |
| --------------------- | ----- | ---------------------- | ----------- |
| Order quantity        | N(9)  | constant "000000000+"  | 000000000+  |
| Yield                 | N(9)  | constant "000000000+"  | 000000000+  |
| Sz yield VARIAL       | N(1)  | always "1"             | 1           |
| Target time per unit  | N(7)  | constant "0000000+"    | 0000000+    |
| Target time yield     | N(7)  | constant "0000000+"    | 0000000+    |
| Target time order     | N(7)  | constant "0000000+"    | 0000000+    |
quantity
Actual processing  N(9)  Duration  of  the  wage  type  (9  digits,  000002475+
| time                 |       | including 2 decimal places)  |     |
| -------------------- | ----- | ---------------------------- | --- |
| Quantity unit yield  | A(2)  | always "00"                  | 00  |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  | Page 112 of 129  |
| ---------------- | --- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| Record type /  | N(9)  | constant "000000000+"  |     | 000000000+  |     |
| -------------- | ----- | ---------------------- | --- | ----------- | --- |
amount
| Performance level  | N(7)                     | constant "0000000+"             |     | 0000000+    |     |
| ------------------ | ------------------------ | ------------------------------- | --- | ----------- | --- |
| Filler             | A(8)                     | constant "        " (8 blanks)  |     | "        "  |     |
| Filler (PC/UNIX)   | A(1)                     | constant " " (1 space)          |     | " "         |     |
| 7.28.1.1           | Interface configuration  |                                 |     |             |     |
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| INI name  | HYD-LUG  |     |     |     |     |
| --------- | -------- | --- | --- | --- | --- |
| Section   | OPTIONS  |     |     |     |     |
| Key       | xxxxxx   |     |     |     |     |
| Value     | xxxxxx   |     |     |     |     |

Active
Key  Value
FORMAT  VARIAL

Output format

| 7.29  Winlohn (Sage Schweiz AG)  |                               |     |     |     |     |
| -------------------------------- | ----------------------------- | --- | --- | --- | --- |
| 7.29.1                           | Upload of monthly wage types  |     |     |     |     |
Data types:
| Type  Meaning                 |     | Formatting          |     |     |     |
| ----------------------------- | --- | ------------------- | --- | --- | --- |
| Cn  Character (string, text)  |     | with max. length n  |     |     |     |
Nn  Integer  The maximum number of digits n. Negative values are preceded by
the sign "-".
Nx.y  Decimal number  with "." (Point) as decimal separator and maximum x total digits and y
decimal places. Negative values are preceded by the sign "-".

Structure:
| Field/meaning  |     |     |     | Column name  | Data type  |
| -------------- | --- | --- | --- | ------------ | ---------- |

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  |     | Page 113 of 129  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| Personnel number              |     | Pnr                   | N8     |
| ----------------------------- | --- | --------------------- | ------ |
| Wage type                     |     | Wage type key         | C4     |
| Hours (or day) for wage type  |     | Unit                  | N10.2  |
| Not assigned                  |     | Charge                | -      |
| Not assigned                  |     | Financial accounting  | -      |
- target
| Not assigned  |     | Financial accounting  | -   |
| ------------- | --- | --------------------- | --- |
- credit
Cost center for wage type posting (usually corresponds to the cost  KST  C10
center in the HR master data)
| Not assigned  |     | View 3  | -   |
| ------------- | --- | ------- | --- |
| Not assigned  |     | View 4  | -   |

The column separator is the semicolon ";". At the end of each row is CR/LF
Example:
203;061;15.00;;;;0013;;;
203;068;7.00;;;;0013;;;
203;091;5.00;;;;0013;;;
203;095;2.50;;;;0013;;;
203;100;88.00;;;;0013;;;
205;061;15.00;;;;0009;;;
205;064;2.00;;;;0009;;;
205;084;1.75;;;;0009;;;
205;091;5.00;;;;0009;;;
205;095;2.25;;;;0009;;;
205;100;126.00;;;;0009;;;
206;050;0.50;;;;0009;;;
206;061;15.00;;;;0009;;;
206;084;1.25;;;;0009;;;
206;091;5.00;;;;0009;;;
206;095;2.50;;;;0009;;;
206;100;94.25;;;;0009;;;
208;061;15.00;;;;0012;;;
208;064;23.25;;;;0012;;;

7.29.1.1  Interface configuration of the monthly wage types
The interface format is then enabled via INI data configuration (System administration  System settings
 INI data configuration). The following settings are made:

| EIS-LUG_82.docx  | Version: 1.0.22770  |     | Page 114 of 129  |
| ---------------- | ------------------- | --- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

| INI name  | HYD-LUG    |     |     |     |     |
| --------- | ---------- | --- | --- | --- | --- |
| Section   | OPTIONS    |     |     |     |     |
| Key       |   xxxxxx   |     |     |     |     |
| Value     |   xxxxxx   |     |     |     |     |
| Active    |           |     |     |     |     |
Key  Value
FORMAT  WINLOHN

Output format
| 7.30    | VEDA                          |     |     |     |     |
| ------- | ----------------------------- | --- | --- | --- | --- |
| 7.30.1  | Upload of monthly wage types  |     |     |     |     |
The data record to transfer wage types to VEDA has the following structure:
*
Fields that must be populated are identified via an * in front of the field name. All other fields can be
left empty – they might be filled during transfer.
***
Enter valid date in format DD.MM.YYYY or 01.01.0001.

| Field  | Name  | Comment  | Transfer from Hydra  |     |     |
| ------ | ----- | -------- | -------------------- | --- | --- |
* Company  Company abbreviation VEDA HR Pay =  Company from HR master data
N2FIRM
|     |     | recipient company  | Alpha 3 digits  |     |     |
| --- | --- | ------------------ | --------------- | --- | --- |
N2PRNR   * Personnel number  Target personnel no. for data record  Personnel number from HR
|     |     |     | master data  |     |     |
| --- | --- | --- | ------------ | --- | --- |
Numeric 6 digits
N2ABRJ   Accounting year  If empty: filled with year entered during  Accounting year
|     |     | transfer  | Numeric 4 digits (YYYY)  |     |     |
| --- | --- | --------- | ------------------------ | --- | --- |
N2ABRM   Accounting month  If empty: filled with month entered  Accounting month
|     |     | during transfer  | Numeric 2 digits (MM)  |     |     |
| --- | --- | ---------------- | ---------------------- | --- | --- |
N2LOAR   * Wage type  Valid wage type in VEDA HR Entgelt  Wage type
Alpha 3 digits
Currently not used
| N2FIGR  | Company group         |     | Not transferred  |     |     |
| ------- | --------------------- | --- | ---------------- | --- | --- |
| N2ABGR  | Group of accounting   |     | Not transferred  |     |     |
| N2LTYP  | Kind of wage type     |     | Not transferred  |     |     |
| N2LFOL  | Sequence number wage  |     | Not transferred  |     |     |
type
| N2STDF  | Number of hours  |     | Time of the wage type posting  |                     |     |
| ------- | ---------------- | --- | ------------------------------ | ------------------- | --- |
|         |                  |     | Numeric                        | 5  digits  (with    | 2   |
|         |                  |     | decimal                        | places,  separator  |     |
comma)
| N2TAGE  | Days                 |     | Not transferred  |     |     |
| ------- | -------------------- | --- | ---------------- | --- | --- |
| N2STCK  | Pieces of yield for  |     | Not transferred  |     |     |

| EIS-LUG_82.docx  |     | Version: 1.0.22770  |     | Page 115 of 129  |     |
| ---------------- | --- | ------------------- | --- | ---------------- | --- |

    Interface Wage and Salary Programs (Payroll)

piecework wage
Specification of minutes  Not transferred
| N2MINU         |     |                  |
| -------------- | --- | ---------------- |
| Hourly factor  |     | Not transferred  |
N2SFAK
| N2PROZ  Percentage            |     | Not transferred  |
| ----------------------------- | --- | ---------------- |
| N2KLME  Kilometer             |     | Not transferred  |
| N2MENG  Quantity              |     | Not transferred  |
| N2KAWO  Calendar week         |     | Not transferred  |
| N2ABRB  Amount of accounting  |     | Not transferred  |
N2AKST  Executing cost center  If empty: Cost center from HR master  Cost center  >
|     | data or in case of corrections from wage  | of the wage type posting  |
| --- | ----------------------------------------- | ------------------------- |
|     | account                                   | Alpha 10 digits           |
N2TTKZ  Tariff table ID  Currently not used  Not transferred
N2AENR  Change number of wage  Currently not used  Not transferred
type
N2LOFI  Company for wage types  Company where the wage types are  Not transferred
managed (recipient company)
| N2VEMI  Calculated minutes     |     | Not transferred  |
| ------------------------------ | --- | ---------------- |
| N2HERK  Source of data record  |     | Not transferred  |
N2LDAT  *** Date of performance  If empty: Source of 'STA'  Not transferred
| N2FOLG  Sequence, serie  |     | Not transferred  |
| ------------------------ | --- | ---------------- |
Not transferred
| N2ARGA  Operation  |     |     |
| ------------------ | --- | --- |
Not transferred
| N2TATK  Activity  |     |     |
| ----------------- | --- | --- |
Not transferred
| N2BETM  Production resource  |     |     |
| ---------------------------- | --- | --- |
Not transferred
| N2BKST  Charged Cost center  |     |     |
| ---------------------------- | --- | --- |
Number of persons  Not transferred
| N2BEST  |     |     |
| ------- | --- | --- |
Shift number  Not transferred
| N2SCHI  |     |                  |
| ------- | --- | ---------------- |
| Scrap   |     | Not transferred  |
N2AUSS
| N2RUZE  Setup time in hours  |     | Not transferred  |
| ---------------------------- | --- | ---------------- |
N2KOTR   Cost object  If empty: Cost object from HR master  Not transferred
data
N2VFMM   Month of correction  Must only be filled, if correction in  Not transferred
previous months, otherwise 0
N2VFJJ   Year of correction  Must only be filled, if correction in  Not transferred
previous months, otherwise 0
N2SKTO   G/L account  If empty: G/L account from wage type  Not transferred
N2KOAR   Cost type  If empty: cost type from wage type  Not transferred
| N2FEKZ   Failure ID    | Currently not used  | Not transferred  |
| ---------------------- | ------------------- | ---------------- |
| N2LOKZ   ID of delete  | Currently not used  | Not transferred  |
N2PERI   Period of accounting  Autom. filled from correction period,  Not transferred
otherwise from accounting period
N2FR01   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
N2FR02   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
N2FR03   Application field 1 - alpha  (field definition 1 alphanumeric)  Not transferred
Not transferred
| N2FR04   Application field 1 - alpha  | (field definition 1 alphanumeric)  |     |
| ------------------------------------- | ---------------------------------- | --- |
Not transferred
| N2KZAT   ID of hours lost  | Currently not used  |     |
| -------------------------- | ------------------- | --- |
Not transferred
| N2FR05   Application field 1 - alpha  | (field definition 1 alphanumeric)  |     |
| ------------------------------------- | ---------------------------------- | --- |
Not transferred
| N2FR06   Application field 9 - num.  | (field definition 9,2 packed numeric)  |     |
| ------------------------------------ | -------------------------------------- | --- |
Not transferred
| N2FR07   Application field 9 - num.  | (field definition 9,2 packed numeric)  |     |
| ------------------------------------ | -------------------------------------- | --- |

| EIS-LUG_82.docx  | Version: 1.0.22770  | Page 116 of 129  |
| ---------------- | ------------------- | ---------------- |

    Interface Wage and Salary Programs (Payroll)

Not transferred
| N2FR08   Application field 9 - num.  |     | (field definition 9,2 packed numeric)  |     |
| ------------------------------------ | --- | -------------------------------------- | --- |
N2FR09   Application field 9 - num.  (field definition 9,2 packed numeric)  Not transferred
N2FR10   Application field 9 - num.  (field definition 9,2 packed numeric)  Not transferred
N2ZUKZ   ID industrial minutes /  I=industrial minutes, N=normal minutes
Fixed value: I
normal minutes  (if different from company master data,  Alpha 1 digit
conversion of hours, minutes and setup
time during transfer)
N2LOTX   Wage type text  If empty and no following wage type: text
from wage type master data
N2VDAT   *** Date from  Currently not used, empty (01.01.0001)  Fixed value: 01.01.0001
Alpha 10 digits
N2BDAT   *** Date to  Currently not used, empty (01.01.0001)  Fixed value: 01.01.0001
Alpha 10 digits
N2WHSL   Currency  If empty: current standard currency is  Not transferred
used
| N2TXFL   N2OBID   |     | Currently not used  | Not transferred  |
| ----------------- | --- | ------------------- | ---------------- |
| N2EPID   ID text  |     | Currently not used  | Not transferred  |
| N2EDAT   N2STAT   |     | Currently not used  | Not transferred  |
Not transferred
| N2APID   User PID creation of record  |     | Currently not used  |     |
| ------------------------------------- | --- | ------------------- | --- |
Not transferred
| N2ADAT   *** Date creation of record  |     | Currently not used  |     |
| ------------------------------------- | --- | ------------------- | --- |
Not transferred
| N2ZEIT   Time of last change  |     | Currently not used  |     |
| ----------------------------- | --- | ------------------- | --- |

The different data fields are separated by a semicolon ';'. The data record is finished via CRLF.
Example:
001;1008;2015;02;100;;;;;36,98;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;235;;;;;21,45;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;420;;;;;120,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;526;;;;;5,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;600;;;;;16,00;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;
001;1008;2015;02;RSG;;;;;18,33;;;;;;;;;;5187;;;;;;;;;;;;;;;;;0;0;;;;;;;;;;;;;;;;;I;;01.01.0001;01.01.0001;;;;;;;;;

| 7.30.1.1  | Interface configuration  |     |     |
| --------- | ------------------------ | --- | --- |
The "VEDA" interface format is then enabled via INI data configuration (called using function button in the
toolbar). The following settings are made:

INI data configuration to enable the interface in VEDA format
| INI name  | HYD-LUG  |     |     |
| --------- | -------- | --- | --- |
| Section   | OPTIONS  |     |     |
| Key       | xxxxxx   |     |     |
| Value     | xxxxxx   |     |     |

| Active    |    |     |     |
| --------- | --- | --- | --- |

EIS-LUG_82.docx  Version: 1.0.22770  Page 117 of 129

Interface Wage and Salary Programs (Payroll)
Key Value
FORMAT VEDA
Output format
ABSENCES ON
MONTH CURRENT
COSTCENTER ON
Transfer cost centers:
7.30.2 Upload of absences
The data record to transfer absences to VEDA has the following structure:
Field Name Comment Transfer from Hydra
NKFIRM * Company Company abbreviation VEDA HR Pay = Company from HR master data
EIS-LUG_82.docx Version: 1.0.22770 Page 118 of 129

    Interface Wage and Salary Programs (Payroll)

|     | recipient company  | Alpha 3 digits  |
| --- | ------------------ | --------------- |
NKPRNR   * Personnel number  Target personnel no. for data record  Personnel number from HR
master data
Numeric 6 digits
NKABRJ   Accounting year  If empty: filled with year entered during  Accounting year
|     | transfer  | Numeric 4 digits (YYYY)  |
| --- | --------- | ------------------------ |
NKABRM   Accounting month  If empty: filled with month entered  Accounting month
|     | during transfer  | Numeric 2 digits (MM)  |
| --- | ---------------- | ---------------------- |
Not transferred
| NKLFNR   Record number  |     |     |
| ----------------------- | --- | --- |
Not transferred
| NKFIGR   Company group  | Currently not used  |     |
| ----------------------- | ------------------- | --- |
NKABGR   Group of accounting  Currently not used  Not transferred
NKEART   * Calendar input type  Valid input type from VEDA HR Entgelt  Absence reason from Control
of absences
Alpha 1 digit
| NKVDAT   *, *** Date from  |     | Start date of the absence  |
| -------------------------- | --- | -------------------------- |
10 digits (DD.MM.YYYY)
| NKBDAT   *, *** Date to  |     | End date of the absence  |
| ------------------------ | --- | ------------------------ |
10 digits (DD.MM.YYYY)
| NKAEIN   Duration of  | Currently not used  | Not transferred  |
| --------------------- | ------------------- | ---------------- |
application/unit
| NKAMNG   Duration of  | Currently not used  | Not transferred  |
| --------------------- | ------------------- | ---------------- |
application/quantity
| NKFEKZ   Failure ID    | Currently not used  | Not transferred  |
| ---------------------- | ------------------- | ---------------- |
| NKLOKZ   ID of delete  |                     | Not transferred  |
Not transferred
| NKSTAT   Status  |     |     |
| ---------------- | --- | --- |
N2EPID   User PID creation of record  Currently not used  Not transferred
Not transferred
| N2EDAT   *** Date creation of record  | Currently not used  |     |
| ------------------------------------- | ------------------- | --- |
N2APID   User PID record change  Currently not used  Not transferred
N2ADAT   *** Date of record change  Currently not used  Not transferred
N2ZEIT   Time of last change  Currently not used  Not transferred

Example:
001;2407;2015;02;;;;U;02.01.2015;05.01.2015;;;;;;;;;;
001;2407;2015;02;;;;U;07.01.2015;07.01.2015;;;;;;;;;;
001;3333;2015;02;;;;9;2015-01-01;2015-01-01;;;;;;;;;;
001;3333;2015;02;;;;9;2015-01-05;2015-01-05;;;;;;;;;;
001;96665;2015;02;;;;U;02.01.2015;02.01.2015;;;;;;;;;;
001;96665;2015;02;;;;9;2015-01-05;2015-01-05;;;;;;;;;;
001;96665;2015;02;;;;9;2015-01-07;2015-01-08;;;;;;;;;;

| EIS-LUG_82.docx  | Version: 1.0.22770  | Page 119 of 129  |
| ---------------- | ------------------- | ---------------- |

Interface Wage and Salary Programs (Payroll)
8 Set person-related options
The HYD-LUG interface can be customized in different ways for certain organizational characteristics in
the HR master record (for example, per company). You distinguish between options that can be different
for each person in the interface (person-related options) and options that must be identical for the entire
interface file (global options).
In the configuration, the options that must be identical for the entire interface file (global option) can also
be defined for the company of the HR master data. But in this case, the options are identified once in the
interface on start of the interface run for the company of the first person and are then valid for all
subsequent persons. The company is the only organization characteristic that is supported with global
options.
The following person options are supported:
MONTH, BALANCES_MONTH, DAY, BALANCES_DAY, DATE, CUSTOMER, COMPANY,
COMPANY_SALARIED_EMPLOYEES, COMPANY_NONSALARIED_EMPLOYEES, CONTRACT,
CONSULTANT, COSTCENTER, WAGETYPES_DAILY, WAGETYPES_ONCE, ABREKZ,
ROUND_MODE.
To make a deviating setting for a specific company, you can add an organization characteristic
(=reference) and a value to the section "OPTIONS". Always use capital letters for the value. For example,
OPTIONS_FIR_KUS defines the options of the company "KuS".
The following organization characteristics/references are possible for person-related options:
Reference Explanation
FIR Company from HR master data, value in capital letters!
BER Area from HR master data, value in capital letters!
ABT Department from HR master data, value in capital letters!
KST Cost center from HR master data, value in capital letters!
PKREIS Employee subgroup from HR master data, value in capital letters!
TAETIGKEIT Activity from HR master data, value in capital letters!
BESCHVERH Employment relationship from HR master data. Values: "A" and "G"
NSTMP Option "Person does not clock" from HR master data. Values: "J" and "N"
Example of a deviating setting of the person-related key CUSTOMER for the company "BSP":
In this example, the deviating client number "4712" is entered for the company "BSP" in the interface.
EIS-LUG_82.docx Version: 1.0.22770 Page 120 of 129

Interface Wage and Salary Programs (Payroll)
Note:
You must only enter the deviating settings with person-related options. The other keys
are taken over from the general configuration.
EIS-LUG_82.docx Version: 1.0.22770 Page 121 of 129

Interface Wage and Salary Programs (Payroll)
9 Interface to Payroll Accounting
Overview
Menu Human Resources Management  Incentive Wage  Interface to Payroll
Accounting
Transaction code iwipr
Function authorization iwipr.*
The uploads to the payroll accounting are not performed automatically. The uploads are performed
manually. For the upload, the time sheets and the bonuses of all employees are provided in an interface
file on the HYDRA server in the HYDRA directory. This interface file covers a period of time that you are
free to specify. A new file (hylrueck.dat) is created each time you call the upload function. You can save
the file under any name on a data medium using a function key on the HYDRA console. For information
on the data record structure of the upload file, refer to the section "Upload of wages" in the HYDRA
documentation "Interface to payroll accounting".
If you use the "incentive wage based on formulas", you can define the contents and formats of the
interface using custom formulas and scripts that are different to the ones shown in this document.
Note:
While the wage calculation is running, some wage data is not available for other evaluations. For this
reason, you cannot create the LLE interface file and run the wage calculation at the same time. A locking
mechanism is used to ensure this. In this case, the system does not show the usual screen of the
interface file, but a respective warning.
EIS-LUG_82.docx Version: 1.0.22770 Page 122 of 129

Interface Wage and Salary Programs (Payroll)
When you have started the evaluation, the interface file is displayed.
Selection criteria
Date from / to
You can create the interface for single days, if required. But usually, the upload is performed for
calendar months. The system populates the date fields with beginning and end of the previous
calendar month.
If required, the system automatically archives the incentive wage data (time tickets and results of
premium groups) in the long-term data area. If you process other data with the "incentive wage
based on formulas", e.g. data of the personnel time management, you must ensure via
customization that the data is stored for a sufficient period of time.
Transfer data to SAP
If an additional function for the direct upload of data to SAP-HR is active and if this option is
enabled, the data is directly uploaded to SAP (update run). If this option is disabled, the data is only
displayed on the screen (test run). You can make as many test runs as required before finally
upload the data to SAP.
Identification and customization of the source system SOURCE_SYS
Many upload interfaces to SAP include the target SAP system as SOURCE_SYS in the data
passed.
EIS-LUG_82.docx Version: 1.0.22770 Page 123 of 129

    Interface Wage and Salary Programs (Payroll)

When the HR master data has been downloaded in SAP format to HYDRA using the HR-PDC, SAP
also transfers the source system of the person. This system is stored in the sixteenth freely
configurable info field of the HYDRA HR master data. No further configuration is required.
If the HR master data is maintained in a different way, this entry might not exist. You can then
identify the source system for the upload using the ALE configuration in HYDRA (ALE = Application
Link Enabling). To this end, the source system of an active logical SAP system is read. You can set
this system in HYDRA via INI configuration.
You identify the source system using the following rule and priority. If a source system could be
identified using the listed rules in the specified order, then the other rules are not executed.
| 1)  | Entry in info field 16 of the HR master data  |     |     |     |
| --- | --------------------------------------------- | --- | --- | --- |
If an entry is available in this field, this entry is interpreted as source system for the upload.
| 2)  | Via logical system from INI configuration for personnel number  |     |     |     |
| --- | --------------------------------------------------------------- | --- | --- | --- |
Via INI configuration, a logical SAP system is specified for the personnel number:
|     |   Name of INI  | "HR-LOGSYS"                                 |     |     |
| --- | -------------- | ------------------------------------------- | --- | --- |
|     |   Section      | required logical system                     |     |     |
|     |   Key          |   "PNR"                                     |     |     |
|     |   Value        |   Personnel number of the required person.  |     |     |
The active source system of the logical system is then identified.
| 3)  | Via logical system from INI configuration for the company  |     |     |     |
| --- | ---------------------------------------------------------- | --- | --- | --- |
Via INI configuration, a logical SAP system is specified for the company defined in the HR
|     | master data:   |                           |     |     |
| --- | -------------- | ------------------------- | --- | --- |
|     |   Name of INI  | "HR-LOGSYS"               |     |     |
|     |   Section      | required logical system   |     |     |
|     |   Key          |   "FIR"                   |     |     |
|     |   Value        |   Company.                |     |     |
The active source system of the logical system is then identified.
| 4)  | Via logical system from INI configuration, default entry  |     |     |     |
| --- | --------------------------------------------------------- | --- | --- | --- |
Via INI configuration, you can make an entry to generally specify a logical SAP system:
|     |   Name of INI  | "HR-LOGSYS"               |     |     |
| --- | -------------- | ------------------------- | --- | --- |
|     |   Section      | required logical system   |     |     |
|     |   Key          |   "ALL"                   |     |     |
|     |   Value        |   "Y"                     |     |     |
The active source system of the logical system is then identified.
| 5)  | Default identification  |     |     |     |
| --- | ----------------------- | --- | --- | --- |
The active source system of the logical system "SAP" is identified.

| EIS-LUG_82.docx  |     |     | Version: 1.0.22770  | Page 124 of 129  |
| ---------------- | --- | --- | ------------------- | ---------------- |

Interface Wage and Salary Programs (Payroll)
If no source system could be identified using the listed rules, the field remains empty.
Detail applications
You can switch between the display of the text file and the data file. By default, the display is identical. If
you use the "incentive wage based on formulas", you can display readable information in the text file via
customization by a specialist.
EIS-LUG_82.docx Version: 1.0.22770 Page 125 of 129

    Interface Wage and Salary Programs (Payroll)

10  Premium/ Incentive Wage Uploads
Wage types are transferred to the payroll or HR information system in the hylrck.dat file.
10.1  Data record structure for incentive wage uploads
The interface structure matches that of the PZE interface file except that some of its unused fields are
filled in with specific incentive wage data.
Therefore, the information in the Data type column has the same meaning as in the PZE interface file, so
we will not explain it again here.
This file is structured as follows:
| Field/ meaning     |   Position  |      |   Data type     |     |
| ------------------ | ----------- | ---- | --------------- | --- |
| Record type        |             | 1    |   always "760"  |     |
| Company            |             | 4    | C3              |     |
| Area               |             | 7    |   C8            |     |
| Settlement year    |             | 15   | N4              |     |
| Settlement month   |             | 19   |   N2            |     |
| Settlement number  |             | 21   |   C1 = EMPTY    |     |
Personnel number (left justified, filled with EMPTY)  22     C8
| Last evaluation day                            |     | 30   | N2             |     |
| ---------------------------------------------- | --- | ---- | -------------- | --- |
| Wage type (left justified, filled with EMPTY)  |     | 32   |   C4           |     |
| Preceding sign for wage type hours             |     | 36   |   C1 = +       |     |
| Hours for wage type                            |     | 37   |   N5.2         |     |
| Full days absent                               |     | 42   |   N3 = 000     |     |
| Partial days absent                            |     | 45   |   N3 = 000     |     |
| Different wage group                           |     | 48   |   C3 = EMPTY   |     |
| Different hourly rate                          |     | 51   |   N5 = 0       |     |
| Amount                                         |     | 56   |   N7 = 0       |     |
| Year of supplementary payment                  |     | 63   |   N4 = Empty   |     |
| Month of supplementary payment                 |     | 67   | N2 = Empty     |     |
| Executing (master) cost center                 |     | 69   |   C8           |     |
| Charged cost center                            |     | 77   |   C8           |     |
| Order number                                   |     | 85   |   C10 = EMPTY  |     |
| Work sequence                                  |     | 95   |   C4 = EMPTY   |     |
| Comments                                       |     | 99   |   C18 = EMPTY  |     |
| Premium group                                  |     | 117  |   C10          |     |

| EIS-LUG_82.docx  | Version: 1.0.22770  |     |     | Page 126 of 129  |
| ---------------- | ------------------- | --- | --- | ---------------- |

Interface Wage and Salary Programs (Payroll)
Performance efficiency rate 127 N6.3
Reserved for other incentive wage data 133 C9 = EMPTY
Document number 142 C5 = EMPTY
Posting indicator 147 C1 = "1"
10.2 Description of data fields for incentive wage uploads
Company:
The company from HR master data is entered here.
Area:
The area from HR master data is entered here.
Last evaluation day:
The last day of the date selection, e.g. "30" or "31"
Wage type:
Wage type from the personal time tickets
Preceding sign for wage type hour:
Is always "+".
Wage type hours:
Time that is to be posted to the wage type entered in the data record. The two decimal places are
stored in industrial minutes.
Full days absent:
Filled in with 000.
Partial days absent:
Filled in with 000.
Year, month of supplementary payment:
Empty.
Executing cost center:
Person's master cost center.
Charged cost center:
Cost center from time tickets. The wage type sum is transferred separately to cost centers.
Order number, work sequence
Unused in the default.
Premium group
Premium group from time ticket. The sum total on the wage types is transferred separately to
premium groups.
EIS-LUG_82.docx Version: 1.0.22770 Page 127 of 129

Interface Wage and Salary Programs (Payroll)
Performance efficiency rate
The total performance efficiency rate shown on piece-work time tickets for the settlement period is
transferred in this field using three decimal places. A performance efficiency rate of 131.234% is
converted to 131234 in this field. Six zeros (000000) are transferred on non-piece work time tickets.
10.3 Example file:
1 10 20 30 40 50 60 70 80 90 100 110 120 130 140 147
+--------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+-------
760BSPLLE 200802 40563 294000+11531000000 000000000000 105 105 122907 1
760BSPLLE 200802 40563 294017+00139000000 000000000000 105 105 000000 1
760BSPLLE 200802 40789 2901 +00464000000 000000000000 105 000000 1
760BSPLLE 200802 40789 294000+11613000000 000000000000 105 105 131619 1
760BSPLLE 200802 40789 294012+03519000000 000000000000 105 105 000000 1
760BSPLLE 200802 40789 294017+00133000000 000000000000 105 105 000000 1
EIS-LUG_82.docx Version: 1.0.22770 Page 128 of 129

Interface Wage and Salary Programs (Payroll)
11 Synchronizing File Interfaces
An interface program on an upper-level system (payroll system/ ERP system) assumes the function of
preparing the data structures for the transferred files so that they can be processed in batch mode or
edited as online transactions.
A handshake logic must be realized between the upper-level system and HYDRA in order to transmit the
transfer files so that no data is lost by "overwriting" the transfer files.
Use the following processing method to safely process the files:
1. Rename the interface file into a new file. You do this in Windows NT from the "ren" or "rename"
command and in UNIX using the "mv" command.
Please note:
When performing this step, do not use the copy command.
As long as HYDRA is processing the file, it does not exist under the documented name.
This ensures that the upper-level system only has access to the file if HYDRA has not
yet accessed it (secure handshake).
2. Copy the new file onto the target system.
3. After the new file has been successfully transferred, it must be deleted on the HYDRA server.
A HYD-ZHK module is available on HYDRA with which the automated interfacing can be transferred onto
HYDRA. On the PPS system, the files only need to be made available or picked up locally. The files are
then actually transferred from and to HYDRA and loaded into the HYDRA database by HYDRA. You can
request which technical requirements exactly are needed for this purpose from MPDV project
management.
EIS-LUG_82.docx Version: 1.0.22770 Page 129 of 129