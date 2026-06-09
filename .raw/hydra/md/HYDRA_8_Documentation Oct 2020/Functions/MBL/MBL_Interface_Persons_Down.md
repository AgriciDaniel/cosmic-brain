HR Master Transfer
1 HR Master Transfer
This interface for transferring HR data to HYDRA has been implemented using a new technology for
universal interfaces. Using this technology, a separate command (so-called "dialogs") is listed in the
interface file for each line to import the required data. The interface program processes these dialogs
sequentially and writes a log file of the results.
Each line of the interface file contains a dialog with all of the relevant data. The most important components
are the dialog ID and the parameters belonging to the dialog.
Example of a dialog (one line from an interface file):
DLG=PNR.DELETE|PNR.FIR=012|PNR.PNR=002449|...
Explanation
PNR.DELETE is the dialog identification. Vertical lines ("|", ASCII 124) are used to separate the
different parameters (PNR.FIR, PNR.PNR, ...). Select a field width for the different parameters that
is wide enough for the presentation. However a fixed file structure can also be realized by adding
leading zeros (for numbers) and trailing spaces. The sequence of the parameters is irrelevant. Some
parameters are mandatory and must always be included in a dialog. Other parameters are optional
and are specified if required or left out. Fields that are not included in the interface are assigned the
default value when a person is created. These fields are not overwritten when you change the data
of a person. You therefore manage these fields in HYDRA.
1.1 Character set
As of MESWeaver 2.1, HYDRA is based on Unicode. Interface files are therefore expected in format UTF-
8 without BOM (Byte Order Mark).
1.2 Formatting of different data types
The following formats are supported:
Data type Format Examples
N<x> Digits, maximum of <x> places |PNR.PNR=2449| or
|PNR.PNR=002449|
N<x>.<y> Decimal number with a maximum of |PNR.PSTDSATZ=30.5| or
<x> predecimal places and <y> decimal |PNR.PSTDSATZ=00030.5|
places. A dot is the decimal separator.
MBL_Interface_Persons_Down.docx Version: 1.7 Page 1 of 14

|     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | ------------------- |

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
| Times or   | Seconds since midnight or  |     | |STMP.ZEI=52200| or  |     |
| ---------- | -------------------------- | --- | -------------------- | --- |
| durations  | HH:MM or                   |     | |STMP.ZEI=14:30| or  |     |
HH:MM:SS or  |STMP.ZEI=14:30:00| or
HH,DDD or
|STMP.ZEI=014,5| or
HH.DDD  |STMP.ZEI=14.500|
H  hours (as many places
  as required)
M  Minutes (in groups of 60)
S  Seconds
D  Industrial or decimal
  minutes (in groups of 100)

| 1.3  | Available dialogs  |     |     |     |
| ---- | ------------------ | --- | --- | --- |
The following dialogs are available to transfer the persons:
  PNR.INSERT  to create a person
  PNR.UPDATE  to change a person
  PNR.DELETE  to delete a person
  PNR.MODIFY  This dialog checks on the basis of the personnel number whether or not the person
already exists in HYDRA. If the person is available, the person is modified, if not,
the person is created.

| MBL_Interface_Persons_Down.docx  |     | Version: 1.7  |     | Page 2 of 14  |
| -------------------------------- | --- | ------------- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

Note:
If a person is created using PNR.INSERT or PNR.MODIFY, the system automatically
assigns basic authorizations for the clockings of the time and attendance (PZE) and for
the access of the access control (ZKS). In PZE, the person is authorized for the terminal
group 99, and in ZKS, the access profile 999 is assigned automatically.

| 1.4  | Parameters for the transfer of HR master data  |     |     |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- | --- | --- |
The identifiers in column "Mandatory" specify the dialogs with mandatory fields:
| I   | For INSERT and MODIFY  |     |     |     |     |     |
| --- | ---------------------- | --- | --- | --- | --- | --- |
| U   | For UPDATE and MODIFY  |     |     |     |     |     |
| D   | FOR DELETE             |     |     |     |     |     |

Dialog: PNR.*
Parameter
|     |     | Type  | Mand Contents  |     | Description    |     |
| --- | --- | ----- | -------------- | --- | -------------- | --- |
atory
General data
PNR.PNR  N8  I/U/D  Personnel number  The personnel number is the key
field to access the person's data
| PNR.PNAME       |     | C  40  |   Name         |     |                              |     |
| --------------- | --- | ------ | -------------- | --- | ---------------------------- | --- |
| PNR.PVORNAME    |     | C  20  |   First name   |     |                              |     |
| PNR.PVORNAME:2  |     | C  20  |   Middle name  |     |                              |     |
| PNR.KUERZEL     |     | C10    |   Initials     |     | Initials of the person (*1)  |     |
| PNR.FIR         |     | C  4   | I  Company     |     | Company of the person        |     |
| PNR.BER         |     | C  8   | I  Area        |     |                              |     |
PNR.KST  C10  I  Cost center  The person's regular cost center
| PNR.EINTRITT  |     | Date  | I  Date of joining  |     |     |     |
| ------------- | --- | ----- | ------------------- | --- | --- | --- |
| PNR.AUSTRITT  |     | Date  |   Date of leaving   |     |     |     |
PNR.SVERTRETER1  Integer    Replacement 1  Personnel number of replacement
1 (*1)
PNR.SVERTRETER2  Integer    Replacement 2  Personnel number of replacement
2 (*1)
| PNR.KNR  |     | C10  |   Staff badge  |     | Badge number  |     |
| -------- | --- | ---- | -------------- | --- | ------------- | --- |
PNR.ANREDE  C  20    Salutation  Salutation of the person (*1)
PNR.PRODEMPLOY C1    Production employees  Identifies  if  it  is  a  production
| EE  |     |     |     |     | employee or not (available as of  |     |
| --- | --- | --- | --- | --- | --------------------------------- | --- |
SP13/25.10.2018)

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     | Page 3 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

Dialog: PNR.*
| Parameter  |     | Type  | Mand Contents  |     | Description    |     |
| ---------- | --- | ----- | -------------- | --- | -------------- | --- |
atory
PNR.VAB  C  15    Responsibility area  ID controlling which user is
authorized to access the data of
which persons. If the
responsibility area remains
empty, every user can access
the person's data.
| PNR.TAETIGKEIT  |     | C  20  |   Activity  |     |     |     |
| --------------- | --- | ------ | ----------- | --- | --- | --- |
PNR.TITEL  C  20    Title   Academic titles (form of address)
PNR.NATION  C  3    Nationality  e.g. "D" or "F" or "CH" or "GB" or
"US" or "CZ",etc.
| PNR.GEBDAT  |     | Date  |   Date of birth  |     |     |     |
| ----------- | --- | ----- | ---------------- | --- | --- | --- |
PNR.GEBORT  C  30    Place of birth  Place of birth of a person (*1)
PNR.SCHULE1  C  50    School-leaving  School-leaving qualification of the
|     |     |     | qualification  |     | person (*1)  |     |
| --- | --- | --- | -------------- | --- | ------------ | --- |
PNR.SCHULE2  C  50    Secondary school- Secondary  school-leaving
|     |     |     | leaving qualification  |     | qualification of the person  (*1)  |     |
| --- | --- | --- | ---------------------- | --- | ---------------------------------- | --- |
PNR.STRASSE  C50    Street  Street and street number of place
|                   |     | (*1)   |                   |     | of residence                        |     |
| ----------------- | --- | ------ | ----------------- | --- | ----------------------------------- | --- |
| PNR.PLZ           |     | N5     |   Zip code        |     | ZIP code of the place of residence  |     |
| PNR.ORT:WOHN      |     | C  20  |   Domicile        |     |                                     |     |
| PNR.TEL:FIR       |     | C  20  |   Company phone   |     |                                     |     |
| PNR.TEL:PRIVAT    |     | C  20  |   Private phone   |     |                                     |     |
| PNR.MOBILTEL:FIR  |     | C  20  |   Company mobile  |     |                                     |     |
| PNR.MOBILTEL:PRI  |     | C  20  |   Private mobile  |     |                                     |     |
VAT
| PNR.EMAIL:FIR     |     | C  50  |   Company e-mail  |     |          |     |
| ----------------- | --- | ------ | ----------------- | --- | -------- | --- |
| PNR.EMAIL:PRIVAT  |     | C  50  |   Private e-mail  |     |          |     |
| PNR.GESCHLECHT    |     | C1     |   Gender          |     | M: male  |     |
W: female
| PNR.FAMSTAND  |     | C1  |   Family status  |     | L: Single  |     |
| ------------- | --- | --- | ---------------- | --- | ---------- | --- |
V: Married
W: Widowed
G: Divorced
PNR.PNR:VGS  N8    Supervisor  Personnel number of supervisor
PNR.INFOTXT:n  C  40    Text field n  Free text field with a maximum of
|     |     |     | (n from 1 to 10)  |     | 40 characters. In particular with  |     |
| --- | --- | --- | ----------------- | --- | ---------------------------------- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.
PNR.INFOTXT:n  C  20    Text field n  Free text field with a maximum of
|     |     |     | (n from 11 to 15)  |     | 20 characters. In particular with  |     |
| --- | --- | --- | ------------------ | --- | ---------------------------------- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.
PNR.INFOTXT:n  C10    Text field n  Free text field with a maximum of
|     |     |     | (n from 16 to 20)  |     | 10 characters. In particular with  |     |
| --- | --- | --- | ------------------ | --- | ---------------------------------- | --- |
existing or planned interfaces to
SAP, pay attention to the notes
on the info fields below.

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     | Page 4 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |     |
| --- | --- | --- | --- | --- | --- | ------------------- | --- |

Dialog: PNR.*
| Parameter  |     | Type  | Mand Contents  |     | Description    |     |     |
| ---------- | --- | ----- | -------------- | --- | -------------- | --- | --- |
atory
PNR.INFOWERT:n  N8    Number field n  Free number field with a
|     |     |     | (n from 1 to 5)  |     | maximum of 8 characters. In  |     |     |
| --- | --- | --- | ---------------- | --- | ---------------------------- | --- | --- |
particular with existing or planned
interfaces to SAP, pay attention
to the notes on the info fields
below.
PNR.INFODAT:n  Date    Date n  Free date field. In particular with
|     |     |     | (n from 1 to 5)  |     | existing or planned interfaces to  |     |     |
| --- | --- | --- | ---------------- | --- | ---------------------------------- | --- | --- |
SAP, pay attention to the notes
on the info fields below.
Data for the Personnel Time Management PZW
| PNR.ABT      |     | C  8  |   Department          |     |                      |     |     |
| ------------ | --- | ----- | --------------------- | --- | -------------------- | --- | --- |
| PNR.PKREIS   |     | C  8  |   Employee subgroup   |     |                      |     |     |
| PNR.GLZJMOD  |     | N4    |   Working time model  |     | Number of the model  |     |     |
PNR.SCHZARTJMO N4    Shift rhythm model  Number of the model
D
| PNR.ENTLJMOD  |     | N4  |   Payment model  |     | Number of the model  |     |     |
| ------------- | --- | --- | ---------------- | --- | -------------------- | --- | --- |
PNR.ENTLTMOD:ME N4    Overtime type  Number of the payment day type
HRARB
| PNR.BESCHVERH   |     | C1  |   Type of contract  |     | G: Salaried  |     |     |
| --------------- | --- | --- | ------------------- | --- | ------------ | --- | --- |
A: Non-salaried
PNR.AVGAZ  Durati   Average working time  If configured accordingly, this time
|     |     | on  |     |     | is posted for absences.  |     |     |
| --- | --- | --- | --- | --- | ------------------------ | --- | --- |
PNR.TZGRAD  N3.3    Part-time rate  Part-time rate in percent with a
maximum of three decimal places
PNR.ETGAWDAT  Date    First allocation  Date  when  this  person  is  first
|     |     |     |     |     | evaluated  | by  the  PZE  | workday  |
| --- | --- | --- | --- | --- | ---------- | ------------- | -------- |
evaluation. You can fill in this field
|     |     |     |     |     | if  the  date  | is  not  | the  date  of  |
| --- | --- | --- | --- | --- | -------------- | -------- | -------------- |
joining.
PNR.ZNWL  N3     Time sheet  Number of time sheet for display
in SMA or WEB
| PNR.DGBERECHT  |     | C1  |   Business trip  |     | J/N  |     |     |
| -------------- | --- | --- | ---------------- | --- | ---- | --- | --- |
authorization
PNR.SPERR:PZE  C1    Blocking indicator PZE  S: Person is blocked for PZE.
Empty: Person is not blocked.
| PNR.OPT:NSTMP  |     | C1  |   Person does not clock  |     | J/N  |     |     |
| -------------- | --- | --- | ------------------------ | --- | ---- | --- | --- |
| PNR.OPT:       |     | C1  |   Allocate average       |     | J/N  |     |     |
| AVGAZVERB      |     |     | working time             |     |      |     |     |
PNR.URLANSPR:  N3.1    Annual leave  Annual entitlement to vacation.
| NORM  |     |     | entitlement  |     |     |     |     |
| ----- | --- | --- | ------------ | --- | --- | --- | --- |
PNR.URLANSPR:SO N3.1    Special leave  Annual  entitlement  to  special
| NDER  |     |     | entitlement  |     | leave.  |     |     |
| ----- | --- | --- | ------------ | --- | ------- | --- | --- |
PNR.URLANSPR:  N3.1    Additional leave  Annual  entitlement  to  additional
| ZUSATZ  |     |     | entitlement  |     | leave.  |     |     |
| ------- | --- | --- | ------------ | --- | ------- | --- | --- |
Data for Shop Floor Data Collection BDE
| PNR.PGRP  |     | N3  |   Employee group  |     |     |     |     |
| --------- | --- | --- | ----------------- | --- | --- | --- | --- |
PNR.BDEJMOD  N3    Year model  Number  of  the  BDE  shift  year
| [PNR.SJMOD:BDE]  |     |     |     |     | model  |     |     |
| ---------------- | --- | --- | --- | --- | ------ | --- | --- |
(The ID PNR.SJMOD:BDE is out-
dated and only used if
PNR.BDEJMOD is not set.)

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     |     | Page 5 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

Dialog: PNR.*
| Parameter  |     | Type  | Mand Contents  |     | Description    |     |
| ---------- | --- | ----- | -------------- | --- | -------------- | --- |
atory
| PNR.SMNR  |     | C  8  |   Workplace  |     | Regular workplace. Leading  |     |
| --------- | --- | ----- | ------------ | --- | --------------------------- | --- |
zeros are required for numeric
machine numbers!
PNR.MEHRMNR  C1    Multi machine operation  Logon to multiple machines
allowed J/N.
| PNR.OPT:AGWAUTO  |     | C1  |   Automatic OP change   |     | J/N  |     |
| ---------------- | --- | --- | ----------------------- | --- | ---- | --- |
| PNR.PLAUS:       |     | C1  |   BDE check whether or  |     | J/N  |     |
| PNRANAG          |     |     | not the person has to   |     |      |     |
be logged on to the OP
PNR.PLAUS:  N1    Activate BDE target  0: The operation can be logged
| SMENGE  |     |     | quantity check  |     | off at any time  |     |
| ------- | --- | --- | --------------- | --- | ---------------- | --- |
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
|     |     |     | quantity  |     | percent of the planned quantity.  |     |
| --- | --- | --- | --------- | --- | --------------------------------- | --- |
PNR.OPG  N3    Maximum target  For the target quantity check, in
|     |     |     | quantity  |     | percent of the planned quantity.  |     |
| --- | --- | --- | --------- | --- | --------------------------------- | --- |
PNR.OPT:PABSKE  C1    Automatic logoff of  J/N. Default=J. This option is
|     |     |     | personnel when shift  |     | used if the automatic shift       |     |
| --- | --- | --- | --------------------- | --- | --------------------------------- | --- |
|     |     |     | ends                  |     | change function is in use and if  |     |
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
|     |     |     | machine status  |     | specifying whether or not the  |     |
| --- | --- | --- | --------------- | --- | ------------------------------ | --- |
|     |     |     | changes         |     | person is allowed to change    |     |
statuses (comparison of the
authorization level from the
(machine) status assignment).

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     | Page 6 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

Dialog: PNR.*
| Parameter  |     | Type  | Mand Contents  |     | Description    |     |
| ---------- | --- | ----- | -------------- | --- | -------------- | --- |
atory
PNR.MSTUFE:2  C1    Change only if person  The person may only change
|     |     |     | is logged on  |     | statuses on the terminal if the  |     |
| --- | --- | --- | ------------- | --- | -------------------------------- | --- |
person is currently logged on to
the workplace.
PNR.MSTUFE:4  C1    Change of production  J: Authorization available
|     |     |     | lock (from HYDRA- |     | N: No authorization  |     |
| --- | --- | --- | ----------------- | --- | -------------------- | --- |
|     |     |     | MDE 7.2 on)       |     | By default = N.      |     |
PNR.SSTUFE:1  N1    Authorization to change  0: No authorization
|     |     |     | target cycle and target  |     | 1: Authorization available  |     |
| --- | --- | --- | ------------------------ | --- | --------------------------- | --- |
partitioning on the
terminal
PNR.SSTUFE:2  C1    Authorization to change  J: Authorization available
|     |     |     | the target quantity on  |     | N: No authorization  |     |
| --- | --- | --- | ----------------------- | --- | -------------------- | --- |
the terminal
PNR.SSTUFE:2  C1    Authorization to change  J: Authorization available
|     |     |     | the target quantity on  |     | N: No authorization  |     |
| --- | --- | --- | ----------------------- | --- | -------------------- | --- |
the terminal
PNR.RSTUFE  N1    Status change of  0..9: Authorization level
|     |     |     | resources  |     | specifying whether or not the  |     |
| --- | --- | --- | ---------- | --- | ------------------------------ | --- |
person is allowed to change
resource statuses (comparison
with the authorization level from
the resource status assignment).

Only relevant if HYDRA WRM or
HYDRA DNC is in use
| PNR.DLSTUFE  |     | N1  |   DNC download  |     | 0 = No        |     |
| ------------ | --- | --- | --------------- | --- | ------------- | --- |
|              |     |     | authorization   |     | authorization |     |

9 = Authorization available

Only relevant if HYDRA DNC is
in use
| PNR.ULSTUFE  |     | N1  |   DNC upload   |     | 0 = No        |     |
| ------------ | --- | --- | -------------- | --- | ------------- | --- |
|              |     |     | authorization  |     | authorization |     |

9 = Authorization available

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
| PNR.PRGRP        |     | C  3  |   Premium group (cid:129) |     |     |     |
| ---------------- | --- | ----- | ------------------------- | --- | --- | --- |
| PNR.ANTFAKTLBON  |     | N3    |   Premium factor          |     |     |     |

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     | Page 7 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | ------------- |

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

Dialog: PNR.*
| Parameter  |     | Type  | Mand Contents  |     | Description    |     |
| ---------- | --- | ----- | -------------- | --- | -------------- | --- |
atory
| PNR.BPOS  |     | C  6  |   Operator  |     |     |     |
| --------- | --- | ----- | ----------- | --- | --- | --- |
position/function
| PNR.LPKZ  |     | C10  |   Wage/premium  |     |     |     |
| --------- | --- | ---- | --------------- | --- | --- | --- |
indicator
| PNR.LART        |     | C  4  |   Wage type           |     |      |     |
| --------------- | --- | ----- | --------------------- | --- | ---- | --- |
| PNR.LGRP        |     | C  4  |   Wage group          |     |      |     |
| PNR.OPT:PZEADEA |     | C1    |   BDE/PZE comparison  |     | J/N  |     |
BGL

(*1): These fields and the respective parameters are only available, if the extension
  persfieldsPZW83 is activated (available since 01-MAR-2019).

Note:
When the persons are initially created (first interface run), do not pass the parameters
PNR.PNR:VGS(supervisor);  PNR.SVERTRETER1  (replacement  1);
PNR.SVERTRETER2 (replacement 2) because this can lead to errors. An error occurs if
a person is assigned to a supervisor that comes later in the interface file and is therefore
not yet created. Recommendation: perform two inface runs one after the other. The first
run is used to create the persons without supervisor. It guarantees that all persons are
available. The second run is used to assign the supervisor. This run includes the
parameters  PNR.PNR:VGS(supervisor);  PNR.SVERTRETER1  (replacement  1);
PNR.SVERTRETER2 (replacement 2).

| 1.5    | Notes on some parameters  |     |     |     |     |     |
| ------ | ------------------------- | --- | --- | --- | --- | --- |
| 1.5.1  | Personnel number PNR.PNR  |     |     |     |     |     |
Unique number of the person. The personnel number has a maximum length of eight characters.

| MBL_Interface_Persons_Down.docx  |     |     | Version: 1.7  |     |     | Page 8 of 14  |
| -------------------------------- | --- | --- | ------------- | --- | --- | ------------- |

HR Master Transfer
1.5.2 Badge PNR.KNR
Number on the staff badge that is assigned to the person. HYDRA can process badge numbers that are up
to 10 characters long, however the number of characters considerably depends on the ID badge in use. If
barcode badges are used for identification, numbers that are four characters long are recommended. The
number of characters for the badge number may be defined in HYDRA, i.e. the interface program only
transfers the configured number of characters. If the badge number is shorter than defined in the HYDRA
setup, it is filled with leading zeros. If it is too long an error message appears and the dialog is rejected.
Note:
The badge number of a person can be empty. If a number is assigned, it must be unique
in HYDRA like the personnel number. If a badge number is passed for a person that had
been assigned to a person that has already left the company, the badge number of the
person who has left is deleted and assigned to the new person.
1.5.3 Authorization levels PNR.ASTUFE and PNR.MSTUFE
Authorization logic that may be defined individually for ADE and MDE activities on the shop floor terminals.
0 = no authorization, .1 = low authorization, 9 = highest authorization.
1.5.4 Info fields
If your system has interfaces to SAP or will have SAP interfaces at a later stage, then please mind that part
of the info fields is assigned SAP-specific additional data when the MINI HR master data is downloaded
from SAP-HCM. Some fields are also required to control the person-related upload of data to the correct
SAP system.
Free info text 9
When downloading the MINI HR master data from SAP, this field is assigned the "Customer Field 2"
from SAP. By default, this field is not used by HYDRA.
Free info text 14
When downloading the MINI HR master data from SAP, this field is assigned the "Customer Field 1"
from SAP. By default, this field is not used by HYDRA.
Free info text 16
When downloading the MINI HR master data from SAP, this field is assigned the "Source System"
from SAP.
MBL_Interface_Persons_Down.docx Version: 1.7 Page 9 of 14

HR Master Transfer
When uploading person-related data via interfaces to SAP, the Source System heads for the
target SAP system the data of the person is transferred to. This applies for the following
interfaces:
 Uploading time events via HR-PDC
 Uploading data of the Personnel Time Management to SAP-HCM, e.g. wage type
postings or absences
 Uploading data of the Incentive Wage to SAP-HCM
 Other customer-specific interfaces with person-related data to SAP in the HR context (not
PP-PDC)
If these interfaces are used, the customer must ensure that no other field contents are assigned
to the info text 16. The info text 16 can remain empty, then the source system is identified using
other methods; see documentation of the relevant interface.
Free info text 17
When downloading the MINI HR master data from SAP, this field is assigned the "Country Grouping"
from SAP. This field can be used in HYDRA with the Time and Attendance PZE as subsystem of
SAP-HCM (HR-PDC) when data is collected in combination with plausibility checks.
Free info text 18
When downloading the MINI HR master data from SAP, this field is assigned the field
"ES_GRPG_WORK_SCHED" from SAP. This field can be used in HYDRA with the Time and
Attendance PZE as subsystem of SAP-HCM (HR-PDC) when data is collected in combination with
plausibility checks.
Free info text 19
When downloading the MINI HR master data from SAP, this field is assigned a content that is made
up of the fields PS_GRPG_ATT_ABS_TYPE and ATT_ABS_REASON_GRPG. This field can be
used in HYDRA with the Time and Attendance PZE as subsystem of SAP-HCM (HR-PDC) when data
is collected in combination with plausibility checks.
Free info text 20
When downloading the MINI HR master data from SAP, this field is assigned the field
"EXT_WAGETYPE_GRPG" from SAP. This field can be used in HYDRA with the Time and
Attendance PZE as subsystem of SAP-HCM (HR-PDC) when data is collected in combination with
plausibility checks.
MBL_Interface_Persons_Down.docx Version: 1.7 Page 10 of 14

HR Master Transfer
1.6 HR master with version control
1.6.1 Overview
Optionally, you can manage the HYDRA HR master data in versions. You can manage different versions
of a person that are/were valid at different times. To this end, the additional parameter PNR.DATB is used
as "validity start date". It includes the validity start date in the date format.
The unique key for a HR master version consists of the personnel number PNR.PNR and the validity start
date PNR.DATB. This applies for the update and deletion of HR master versions.
HYDRA automatically manages the validity end date of a version. An HR master version applies until the
next version becomes effective. The validity date is not restricted if there is no subsequent version.
In case the validity start date is not specified, the interface always refers to the HR master version that is in
effect at the time when the interface process is running.
1.6.2 Please note for PNR.MODIFY
If the validity start date PNR.DATB is not specified for the PRN.MODIFY dialog and there is currently no
applicable HR master version, a currently applicable HR master version will be added by using the
parameters transferred. Moreover, all existing HR master versions that are applicable from this day on are
updated by the parameters transferred.
If the validity start date PNR.DATB is specified for the PNR.MODIFY dialog and this HR master version
does not yet exist in HYDRA, this version will be added and an already existing version that is applicable
on the validity start date will be used as basis (copied) and updated by the transferred parameters.
1.7 Sample data record for a person
All fields affecting a person are written in one line in the interface. In the below example, however, data is
written in two lines to make it readable:
DLG=PNR.MODIFY|PNR.PNR=153443|PNR.KNR=001324|PNR.FIR=BSP|PNR.KST=B12_54|
PNR.BER=Halle 17|PNR.EINTRITT=01/15/2010|PNR.PNAME=Maier|PNR.PVORNAME=Hans|
MBL_Interface_Persons_Down.docx Version: 1.7 Page 11 of 14

HR Master Transfer
1.8 Import of data in HYDRA
1.8.1 Manual start of the interface program
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
MBL_Interface_Persons_Down.docx Version: 1.7 Page 12 of 14

HR Master Transfer
To change the language of the error texts, set the environment variable HYLANG in the command
line to "en" or "de" before you execute the command:
hydadm:2:E:\hydra2>set HYLANG=en
or
hydadm:2:E:\hydra2>set HYLANG=de
1.8.2 Definition for transferring data from SAP
The below structure has been designed to transfer HR master data from SAP in the HYDRA BAPI format
using a customer-specific function module.
Message type: ZHYDRA_PERSONS
IDoc type: ZHYDRA_PERSONS01
Segments: Z2BAPI000
NOTE
To generate segment names in HYDRA inbound processing as described above, the segments must have
been created in SAP according to the pattern Z1<segment name>. The SAP outbound processing then
generates versions using the segment names Z2<segment name><version>.
Example: Z1BAPI becomes Z2BAPI000
Field name Type Description Example
Transaction CHAR 20 Transaction ID (dialog ID in HYDRA) PNR.MODIFY
Description CHAR 40 Plain text designation as comment Download HR master
Data CHAR 940 Dialog data string for HYDRA DLG=PNR.MODIFY|PNR.PNR=12345678|
PNR.KNR=00000001|
Details see section 2.3.1
1.8.3 Transfer from other systems (file-based via MLE)
The communication between HYDRA and higher level systems generally depends on the technical
configuration and capabilities of the corresponding system. HYDRA provides the RFC technology or the
classic transfer option using ASCII files (“Text Files” = .txt files) for the communication (to and from HYDRA).
MBL_Interface_Persons_Down.docx Version: 1.7 Page 13 of 14

|     |     |     |     |     |     | HR Master Transfer  |
| --- | --- | --- | --- | --- | --- | ------------------- |

"IDOCs" combine data to logical units within one file. These IDOCs act like a “bracket” and combine logically
similar  data  structures  to  transfer  several  of  these  “clusters”  within  one  file.  Although  each  IDOC
corresponds to a defined data type/structure, the format does not depend on the content or the content
type.
For details on the configuration of the interface, refer to the document "MES Weaver" (SIS-MWV_30.PDF).
Data is transferred using the following basic structure:
Field name  Type  Length  Designation (name) Data field and meaning
SEGNAM*  Char  30  Segment  To this field, the writing system assigns the respective
segment name. This segment name distinctly defines the
structure of the data record (field SDATA).
Example: Z2BAPI000
| MANDT*  | Char  | 3  Instance  |     | Reserved; fixed: '000'  |     |     |
| ------- | ----- | ------------ | --- | ----------------------- | --- | --- |
DOCNUM*  Char  16  IDoc number  Consecutive number for IDOCs
Reserved: fixed '0000000000000000'
| SEGNUM*  | Char  | 6  Segment number  |     | Reserved: fixed '000000'  |     |     |
| -------- | ----- | ------------------ | --- | ------------------------- | --- | --- |
PSEGNUM  Char  6  Number of the parent  Reserved; fixed: '000000'
segment
| HLEVEL  | Char  | 2  Hierarchy level  |     | Reserved; fixed: '00'  |     |     |
| ------- | ----- | ------------------- | --- | ---------------------- | --- | --- |
SDATA  Char  1000  Payload  This field contains the actual data content/payload. The
SEGNAM field specifies the structure of this field.
* = Key field
The below structure has been designed to transfer HR master data from other systems using the HYDRA
file interface "File Port":
| Message type / file name:           |     |     | ZHYDRA_PERSONS  |     |     |     |
| ----------------------------------- | --- | --- | --------------- | --- | --- | --- |
| Message function / file extension:  |     |     | .dat            |     |     |     |
| Segments:                           |     |     | Z2BAPI000       |     |     |     |

The segment Z2BAPI000 has the following structure:
| Field name  |     | Type    | Description    |     | Example  |     |
| ----------- | --- | ------- | -------------- | --- | -------- | --- |
Transaction  CHAR  20  Transaction ID (dialog ID in HYDRA)  PNR.MODIFY
Description    CHAR  40  Plain text designation as comment  Download HR master
Data  CHAR  940  Dialog data string for HYDRA  DLG=PNR.MODIFY|PNR.PNR=12345678|
PNR.KNR=00000001|
Details see section 2.3.1

MBL_Interface_Persons_Down.docx  Version: 1.7  Page 14 of 14