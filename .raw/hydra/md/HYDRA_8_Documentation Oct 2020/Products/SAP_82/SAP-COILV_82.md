Manual
HYDRA Interfacing Module to
SAP CO-ILV
SAP-COILV 8.2
Version 1.0.23049
Last changed on: 02.09.2020

HYDRA Interfacing Module to SAP CO-ILV
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SAP-COILV_82.docx Version: 1.0.23049 Page 2 of 46

HYDRA Interfacing Module to SAP CO-ILV
Contents
1 HYDRA Interfacing Module to SAP CO-ILV ................................................. 4
2 Mapping CO-ILV in HYDRA ......................................................................... 5
3 Data container Z2BAPI000 .......................................................................... 7
4 Structure of the DLG Format ........................................................................ 8
5 1 Example: Download of CO Internal Order .............................................. 13
6 Example: Using MES-Internal Orders ........................................................ 16
7 Upload of Confirmations ............................................................................. 20
8 Configuration of Uploads ............................................................................ 25
9 Application-Relevant Settings in HYDRA ................................................... 29
10 Application Relevant Settings in SAP ........................................................ 33
11 MYERPRCK - Program Parameters .......................................................... 35
SAP-COILV_82.docx Version: 1.0.23049 Page 3 of 46

HYDRA Interfacing Module to SAP CO-ILV
1 HYDRA Interfacing Module to SAP CO-ILV
Summary
Use options
The SAP-COILV interface allows to perform SAP CO uploads via the SAP CO interface. The upload can
be made for both, the direct and indirect activity allocation.
This interface enables the user to directly debit orders and primarily CO internal orders and cost centers
and to compensate between cost centers and/or to transfer the activities performed by the cost centers to
SAP to compensate and to assign them to accounts. This means that it is possible to transfer the data
collected in MES directly to the CO.
Implementation notes
Use the function package if
 you wish to transfer CO internal orders directly from the SAP CO to the MES;
 you wish to collect MES confirmations of a CO internal order and to confirm them to SAP CO;
 you wish to enter the MES times referred to the individual employees and/or cost centers and
then to compensate them directly or indirectly in SAP CO.
Integration
The function package uses the BDE data.
Scope of functions
 Confirmation of direct activity allocations
o Confirmation of direct activity allocation via BAPI AcctngActivityAlloc.Post
o Confirmation of indirect activity allocation via BAPI AcctngSenderActivity.Post
SAP-COILV_82.docx Version: 1.0.23049 Page 4 of 46

HYDRA Interfacing Module to SAP CO-ILV
2 Mapping CO-ILV in HYDRA
In the course of a connection of HYDRA to SAP CO, HYDRA must collect CO-relevant data and upload
them to SAP. As data basis serve both, the CO internal orders transferred from SAP to HYDRA and
orders that were created in HYDRA and that include the specific data required for the confirmation in
accordance with the creation convention.
The trigger to download CO internal orders comes from R/3. The data are transferred in an IDoc
(intermediate document) and maintained in HYDRA. In principle, internal orders are transferred by two
methods. On the one hand, it is possible to use the default interface HR-PDC to transfer internal orders to
HYDRA. It is true that this method uses the SAP default but in the same time it has the disadvantage that
the used structure is very narrow and does not include several often required data types (such as start
and end date or scheduled workplace).
Next to this method, it is also possible to transfer CO-internal orders in a customer-specific IDoc in the
HYDRA BAPI format. To use this method, a customer-specific function module is necessary which
selects the required data in SAP, transfers them to an IDoc and passes them then on to HYDRA.
To realize confirmations referred to cost centers to SAP CO there is also the possibility to create
overhead cost orders in HYDRA and to realize the confirmation to specific cost centers. This is only
possible if the sending and/or receiving cost center and an activity type are stored to HYDRA.
The upload of the confirmations is controlled via HYDRA in accordance with the requirements specified
by the user. In these instances is it not important whether these are confirmations of CO-internal orders or
for orders created in HYDRA.
To realize the communication with the BDE subsystems, SAP provides several standard-BAPIs/ IDocs via
the CO-interface. The following BAPIs/ IDocs are used:
SAP-COILV_82.docx Version: 1.0.23049 Page 5 of 46

    HYDRA Interfacing Module to SAP CO-ILV

Download of CO-internal orders (customer-specific):
| IDoc type:     | ZHYDRA_CO_ORDER  |     |     |     |
| -------------- | ---------------- | --- | --- | --- |
| Message type:  | ZHYDRA_CO_ORDER  |     |     |     |
| Segment type:  | Z1BAPI000        |     |     |     |
Upload of confirmations (direct activity allocation):
| IDoc type:     | ACC_ACT_ALLOC02     |     |     |     |
| -------------- | ------------------- | --- | --- | --- |
| Message type:  | ACC_ACT_ALLOC       |     |     |     |
| Segment type:  | E1ACC_ACT_ALLOC000  |     |     |     |
|                | E1BPDOCHDRP000      |     |     |     |
|                | E1BPAAITM002        |     |     |     |
Upload of confirmations (indirect activity allocation):
| IDoc type:     | ACC_SENDER_ACTIVITIES01  |     |     |     |
| -------------- | ------------------------ | --- | --- | --- |
| Message type:  | ACC_SENDER_ACTIVITIES    |     |     |     |
| Segment type:  | E1ACC_SENDER_ACTIVITIES  |     |     |     |
|                | E1BPDOCHDRP000           |     |     |     |
|                | E1BPIAITM000             |     |     |     |

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 6 of 46  |
| ------------------ | --- | ------------------- | --- | ------------- |

HYDRA Interfacing Module to SAP CO-ILV
3 Data container Z2BAPI000
The base structure Z2BAPI000 is used as basis to transfer data from external systems. Depending on the
data type, different posting and IDoc types will be used. The segment structure Z2BAPI000, however, is
always the same.
To create the segment name Z2BAPI000 in SAP, it must also be generated in SAP according to
the scheme Z1 <Segment name>. Versioning in SAP outbound processing is then used to
generate the segment names of the form Z2 <Segment name><Version>.
Example: Z1BAPI becomes Z2BAPI000
The segment consists of the following 3 fields:
Field Type Length Description
TRANSACTION CHAR 20 Name of the transaction in HYDRA
(Dialog identification in HYDRA)
DESC CHAR 40 Comment
DATA CHAR 940 Dialog data string for HYDRA
The TRANSACTION field contains the control command that is also transferred in the DATA field. It has
no function here and is only used for information purposes.
The DESC field can be used to transfer a comment text describing the operation.
The DATA field is used to transfer the user data. The transfer is realized in the HYDRA HYBAPI format,
i.e. a dialog data string composed of the control command and the user data is transferred. The control
command is always transferred with the "DLG=" acronym followed by the command itself. The control
command is followed by several data identified by a dialog identification and separated by "|". The dialog
string itself must be terminated by a pipe "|".
SAP-COILV_82.docx Version: 1.0.23049 Page 7 of 46

HYDRA Interfacing Module to SAP CO-ILV
4 Structure of the DLG Format
Basics of HYDRA BAPI
Data is always posted to the database in accordance with basic guidelines ensuring their consistency and
uniformity. This is why any writing access to the database is performed by programs providing a uniform
interface to this end.
This means that all writing accesses to the HYDRA database irrespective of whether these are called via
HYDRA applications or external applications/ systems are executed by a program with a defined
interface.
This is mainly the HYDRA BAPI. It is used in the course of the master data transfer in order to transfer
and post data provided by and processed in external systems to HYDRA.
BAPIs and dialog commands
Essentially, there is for each object (that can be maintained using the MOC) such a BAPI in HYDRA.
Objects in this sense may be (production) orders or master data records. There are always different
methods to access such an object. In the easiest case this is a method to create (INSERT), modify
(UPDATE) or delete data records (DELETE).
In more complex cases and/or when this is requested by the application, also different methods are
implemented. This may be modifying methods comprising an insertion or modification or additional
application-specific methods.
Such a BAPI is called by a so called dialog command. This command is comprised of:
<Object>.<Method>
This is an exemplary (and incomplete) overview of the available objects and their selected methods
Object Methods Comment
ANR INSERT The ANR object designates the
order.
UPDATE
DELETE
MODIFY
SAP-COILV_82.docx Version: 1.0.23049 Page 8 of 46

    HYDRA Interfacing Module to SAP CO-ILV

| Object  | Methods  | Comment   |                     |     |
| ------- | -------- | --------- | ------------------- | --- |
| MNR     | INSERT   | The  MNR  | object  designates  |     |
machines/ workplaces.
UPDATE
DELETE
| FERTVAR  | INSERT  | The  | FERTVAR  | object  |
| -------- | ------- | ---- | -------- | ------- |
designates production variants.
UPDATE
DELETE
| RES  | INSERT  | The RES object designates the  |     |     |
| ---- | ------- | ------------------------------ | --- | --- |
resources of the module WRM
UPDATE
and DNC.
DELETE

Dialog data strings
After the initial BAPI call using the command, the use data will be transferred in a so-called dialog string
or dialog data string. The use data in a dialog string are clearly identified by indicators, also designated as
acronyms.
Such an acronym may represent at least one database field or also have controlling effects on postings.
The acronym is always followed by the equal sign "=" and the value transferred for this acronym. The
individual acronyms and their values are separated by pipes "|" from each other and from the dialog
command.
Example:
DLG=FERTVAR.INSERT|FERTVAR.ATK=BLOO01052225000O00|FERTVAR.MGRP=BW2000|
| FERTVAR.RESTYP=WNR|FERTVAR.RES=BLOO01052225000O00 2|  |     |     |     |     |
| ----------------------------------------------------- | --- | --- | --- | --- |
| FERTVAR.SZY=17143|FERTVAR.TLG=2|                      |     |     |     |     |
FERTVAR.BEM=BLOO01052225000O00\|rose\|2\|rose\|BW2000|
FERTVAR.VER=1|FERTVAR.STA=F|FERTVAR.FIR:ATK=0|
Data formats/ mandatory acronyms
The descriptions of the acronyms are based on the following data types:

| SAP-COILV_82.docx  | Version: 1.0.23049  |     |     | Page 9 of 46  |
| ------------------ | ------------------- | --- | --- | ------------- |

|     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Type  |     |     | Description  |     |     |
| ----- | --- | --- | ------------ | --- | --- |
CHAR x  For the data type CHAR the information will be aligned to the left; unnecessary positions
will be filled with blanks.
Example: "ABCD  "
NUM x  Numeric field of the length x without sign. For the NUMC data type only digits are
allowed (ASCII-digits 30 hex to 39 hex). The numbers will be aligned to the right and
unnecessary positions will be filled with zeros.
Example: "00000002"
DEC x.y  Numeric field of the length x contains y decimal places. A data field in the HYDRA
format is preceded by a sign ("+" or "-") and it contains a decimal point. Empty places
must be filled with zeros.
e.g. DEC 13.3: -1234567890.123

Each BAPI call must contain the following header data in the dialog data
| Identification  | Content  |     |     | Description  |     |
| --------------- | -------- | --- | --- | ------------ | --- |
DLG  {BAPI call}  Dialog  identification:  This  dialog  identification  indicates  the
desired BAPI call
USR  NUM 4  HYDRA  user:  This  Hydra  user  number  uniquely  identifies  a
HYDRA client:
|     |     | MOC:  |     | USR = 20000 + MOC number  |     |
| --- | --- | ----- | --- | ------------------------- | --- |
USR = 20000 + MOC
|     |     | LAN                 | terminal  | (LANT)  USR = 2000 + terminal number  |     |
| --- | --- | ------------------- | --------- | ------------------------------------- | --- |
|     |     | FB terminal (FBT):  |           | USR = 2000 + TNR                      |     |
|     |     | External terminals  |           | USR = 3000 ... 3999                   |     |
|     |     | MLE-MDM             |           | USR=9999                              |     |
DAT  {mm/dd/yyyy}  Date: current date in the format mm/dd/yyyy
|     |     | "Today"  can  | be  used  | as  placeholder  | for  the  dynamic  |
| --- | --- | ------------- | --------- | ---------------- | ------------------ |
determination.
| ZEI  | {seconds}  | Time: current time in the seconds format  |           |                  |                    |
| ---- | ---------- | ----------------------------------------- | --------- | ---------------- | ------------------ |
|      |            | "Now"  can                                | be  used  | as  placeholder  | for  the  dynamic  |
determination.

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 10 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

HYDRA Interfacing Module to SAP CO-ILV
Depending on the BAPI call, additional identifications must/ may be entered.
Data objects with files
Only the file names will be indicated in the dialog string for such objects that contain files in addition to the
data fields of dialog data strings, e.g. document resources or DNC resources. The files themselves will be
stored to defined data areas. The data import consists of two steps: Dialog data strings and files.
Dialog data strings - acronyms
The acronym to indicate the file is a field of the field type CHAR 128 that includes the file name. In most
of the cases the name is only indicated without path - please see the documentation for the BAPI
concerned.
Example: RES.SPEICHORT:DATA includes the file name without path and without extension of the
attached DNC file. The storage location and the extension are defined before in the system via the
resource type.
File format:
The file format is not important for the storage in HYDRA. The file will be stored to the specified storage
location. The application will then interpret this file. For the import of master data it must be taken into
account that the file must be stored to the directory specified for the application.
Example DNC files: The DNC type defines in which folder the files are and how they must be stored and
interpreted.
Multilingual database contents
As part of SIS-HLM, there is now the possibility to define descriptive texts in several languages for
specific objects in the database. Provided that this function is enabled on the system, these columns may
generally also be filled by using the master data import. Please note the following:
 Specify the target language
The target language can be transferred as additional acronym in the dialog data strings.
Example:
Machine master data is to be transferred. English (EN) is defined with language index 2 in the
system. The dialog data string to transfer this data has to be structured as follows:
DLG=MNR.INSERT|…|MNR.MNR=<Machine>|MNR.BEZK=English description|…|LANG=2|…
 Only one language can be transferred every time an import is started.
SAP-COILV_82.docx Version: 1.0.23049 Page 11 of 46

HYDRA Interfacing Module to SAP CO-ILV
This means, that two or more import runs might be required, subject to the number of configured
languages. Please note the following:
o The first import has to be performed using the *.INSERT method.
This rule can be ignored if there is a method "*.MODIFY" for the object. As in this case,
the system decides whether an INSERT or an UPDATE is to be performed.
o All other imports need to be performed by way of the method "*.UPDATE" indicating all
key fields pertaining to the object, the language-dependent description and the target
language using the acronym "LANG=n".
o If the system uses a separately generated, internal key for an object, this one has to be
determined after the initial creation. This internal key then needs to be provided for the
updates that follow.
SAP-COILV_82.docx Version: 1.0.23049 Page 12 of 46

HYDRA Interfacing Module to SAP CO-ILV
5 1 Example: Download of CO Internal Order
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
SAP-COILV_82.docx Version: 1.0.23049 Page 13 of 46

    HYDRA Interfacing Module to SAP CO-ILV

  ANR.MODIFY      Creation/ modification of an order header (delta download)
The different commands ensure that the download variants such as delta or deletion download of the PP-
PDC interface can be realized.
After the control command, the user data will be transferred. They are presented by the identification
(Acronym column) and separated from each other by "|".

| What                    | Acronym       |     | SAP / Value       |     |
| ----------------------- | ------------- | --- | ----------------- | --- |
| Order number            | AUNR.SAPAUNR  |     | SAP order number  |     |
| Order type              | AUNR.AART     |     | "1" or "4"        |     |
| PPS Indicator           | PPS           |     | "J"               |     |
| Indicator order header  | ANR.ATYP      |     | "AU"              |     |

In this example the dialog data string for a delta download will be structured as follows:
DLG=AUNR.MODIFY|AUNR.SAPAUNR=<SAP-Auftragsnummer>|AUNR.AART=1|PPS=J
Order sequencing
The following commands can be used to transfer CO internal orders to the HYDRA operation structure:
|   ANR.INSERT  |     | Creation of an operation  |     |     |
| -------------- | ---- | ------------------------- | --- | --- |
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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 14 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

| What  | Acronym  |     | SAP  | Mandator |
| ----- | -------- | --- | ---- | -------- |
y field
| Order number  | ANR.SAPAUNR   |     | SAP order number       | X   |
| ------------- | ------------- | --- | ---------------------- | --- |
| Sequence      | ANR.SAPAFOLG  |     | SAP sequence           | X   |
| Operation     | ANR.SAPVGNR   |     | SAP operation number   | X   |
If not available in this form, it is
also possible to transfer "0010".
| Sub-operation  | ANR.SAPUVGNR  |     | SAP sub-operation (if  | X   |
| -------------- | ------------- | --- | ---------------------- | --- |
necessary)
| Plant           | ANR.WERK:S  |     | SAP plant              |     |
| --------------- | ----------- | --- | ---------------------- | --- |
| Workplace       | ANR.MNR     |     | SAP work center        | X   |
| OP designation  | ANR.AGBEZ   |     | e.g. order short text  |     |
| Order type      | ANR.AART    |     | "1"                    | X   |
| PPS Indicator   | PPS         |     | "J"                    | X   |
| OP indicator    | ANR:ATYP    |     | "OP"                   | X   |
| Start date      | ANR.DATB    |     | ATTENTION:             |     |
The date must be transmitted in
American format:
MM/DD/YYYY
| Start time  | ANR.ZEIB  |     | Time in seconds  |     |
| ----------- | --------- | --- | ---------------- | --- |
| End date    | ANR.DATE  |     | ATTENTION:       |     |
The date must be transmitted in
American format:
MM/DD/YYYY
| End time                     | ANR.ZEIE          |     | Time in seconds  |     |
| ---------------------------- | ----------------- | --- | ---------------- | --- |
| The indicator can be logged  | ANR.OPT:MULTIMNR  |     | "J"              |     |
on several times

In this example the dialog data string for a delta download will be structured as follows:
DLG=ANR.MODIFY|ANR.SAPAUNR=<SAP order number>|ANR.SAPVGNR=<SAP
transaction number>|ANR.WERKS=<SAP plant>|ANR.MNR=<Workplace>|
ANR.AGBEZ=<OP name>|ANR.AART=1|PPS=J|...

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 15 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP CO-ILV
6 Example: Using MES-Internal Orders
Usage
HYDRA overhead cost orders are orders that are created in HYDRA. They are not known in SAP. These
orders can be used then, for example, if a special service has been rendered by one cost center and will
be invoiced to another.
The HKMCO-ILV interface allows to map these processes and using the confirmation, to charge the
rendered service directly to the receiving cost center. These are two quick steps to realize this.
Order number = receiving cost center
In this approach the receiving cost center is part of the order number. The confirmation configuration will
define in this case which interval of the order number represents the cost center number.
The activity type is stored to the operation number. Here too, the confirmation configuration can be used
to define which interval of the operation number will represent the activity type.
The sending (performing) cost center can either be taken from the workplace or the personnel. To this
end, the these data must be maintained in HYDRA.
Based on these conventions, this will lead to the following order structure:
SAP-COILV_82.docx Version: 1.0.23049 Page 16 of 46

    HYDRA Interfacing Module to SAP CO-ILV

Order number  Cost center
|     | Operation number  |     | Activity type  |     |
| --- | ----------------- | --- | -------------- | --- |

|     | Operation number  |     | Activity type  |     |
| --- | ----------------- | --- | -------------- | --- |

|     | Operation number  |     | Activity type  |     |
| --- | ----------------- | --- | -------------- | --- |
|     |                   |     |                |     |

|     | Operation number  |     | Activity type  |     |
| --- | ----------------- | --- | -------------- | --- |

|     |     |     |     |     |
| --- | --- | --- | --- | --- |

In the realization, special attention must be paid to the number ranges of the other order types
known in HYDRA and to the lengths of the order numbers configured in HYDRA.

Order number = sending/ receiving cost center
In another form of mapping the orders can be stored to both - the sending and receiving cost center in the
HYDRA order number. Here too, the configuration of the confirmations will define which interval of the
order number will represent which cost center.
As in the previous example, the activity type will be stored to the operation number. Based on these
conventions, this will lead to the following order structure:

| SAP-COILV_82.docx  |     | Version: 1.0.23049  | Page 17 of 46  |     |
| ------------------ | --- | ------------------- | -------------- | --- |

HYDRA Interfacing Module to SAP CO-ILV
Order number Rec . CC/ Send. CC
Operation number Activity type
Operation number Activity type
Operation number Activity type
Operation number Activity type
In the realization, special attention must be paid to the number ranges of the other order types
known in HYDRA and to the lengths of the order numbers configured in HYDRA.
SAP-COILV_82.docx Version: 1.0.23049 Page 18 of 46

HYDRA Interfacing Module to SAP CO-ILV
SAP-COILV_82.docx Version: 1.0.23049 Page 19 of 46

    HYDRA Interfacing Module to SAP CO-ILV

7  Upload of Confirmations
Summary

Confirmation general
HYDRA BDE confirms to SAP on the basis of time tickets. Transferred are the labor data durations
from the B-records (personnel postings). They are transferred to SAP together with the personnel
number.
Which cost center (e.g. for staff or the workplace) is transmitted to SAP, whether the receiving object
is a CO-internal order or a cost center can be configured in the interface. The configuration is
explained in chapter 0 Configuration of Uploads to SAP CO.
Confirmation - direct activity allocation
Segment E1ACC_ACT_ALLOC000
| Field name       | T  L     | Meaning          | Meaning in HYDRA  |     |
| ---------------- | -------- | ---------------- | ----------------- | --- |
| IGNORE_WARNINGS  | Char  1  | Ignore warnings  | Not occupied      |     |

Segment E1BPDOCHDRP000
| Field name  | T  L  | Meaning  | Meaning in HYDRA  |     |
| ----------- | ----- | -------- | ----------------- | --- |
CO_AREA  Char  4  Controlling area  According to configuration
| DOCDATE  | Char  8  | Document date  | Log. Date  |     |
| -------- | -------- | -------------- | ---------- | --- |

POSTGDATE  Char  8  Posting date  Set according to shift date of the B-
records

| VERSION  | Char  3   | Version          | According to configuration*)  |     |
| -------- | --------- | ---------------- | ----------------------------- | --- |
| DOC_NO   | Char  10  | Document number  | Not occupied                  |     |
VARIANT  Char  5  Fast  document  entry  of  According to configuration*)
|     |     | CO-actual  | postings:  |     |
| --- | --- | ---------- | ---------- | --- |
Variant

| DOC_HDR_TX  | Char  50  | Document header text  | Not used  |     |
| ----------- | --------- | --------------------- | --------- | --- |
USERNAME  Char  12  Name of the user   According to configuration*)
| OBJ_KEY   | Char  20  | Reference key        | Not used           |     |
| --------- | --------- | -------------------- | ------------------ | --- |
| OBJ_TYPE  | Char  5   | Reference operation  | Not used           |     |
| OBJ_SYS   | Char  10  | Logical  system      | of  the  Not used  |     |
original document

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 20 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

Segment E1BPAAITM002
| Field  | T  L  | Meaning  | Meaning in HYDRA  |     |
| ------ | ----- | -------- | ----------------- | --- |

SEND_CCTR  Char  10  Sending cost center  According to configuration*)
ACTTYPE  Char  6  Activity type  According to configuration*)
| SENBUSPROC  | Char  12  | Sending  | business  Not used  |     |
| ----------- | --------- | -------- | ------------------- | --- |
process
ACTVTY_QTY  Char  17  Activities quantity  According to configuration*)
ACTIVITYUN  Char  3  Activity unit  According to configuration*)
| ACTIVITYUN_ISO  | Char  3  | ISO-code  | unit  of  Not used  |     |
| --------------- | -------- | --------- | ------------------- | --- |
measurement
| PRICE  | Char  25  | Price total in the currency  | Not used  |     |
| ------ | --------- | ---------------------------- | --------- | --- |
of the transaction
| CURRENCY  | Char  5  | Currency key  | Not used  |     |
| --------- | -------- | ------------- | --------- | --- |

| CURRENCY_ISO  | Char  3  | Iso-code currency  | Not used  |     |
| ------------- | -------- | ------------------ | --------- | --- |

| POS_OUTQTY     | Char  17  | Posted output quantity  | Not used            |     |
| -------------- | --------- | ----------------------- | ------------------- | --- |
| POSTOUTUN      | Char  3   | Posted output unit      | Not used            |     |
| POSTOUTUN_ISO  | Char  3   | ISO-code                | unit  of  Not used  |     |
measurement
| PERSON_NO  | Char  8   | Personnel number  | Personnel number  |     |
| ---------- | --------- | ----------------- | ----------------- | --- |
| SEG_TEXT   | Char  50  | Segment text      | Not used          |     |
REC_CCTR  Char  10  Receiving cost center  According to configuration*)
REC_ORDER  Char  12  Receiving order  According to configuration*)
| REC_WBS_EL  | Char  24  | Receiving  | project  Not used  |     |
| ----------- | --------- | ---------- | ------------------ | --- |
|             |           | structure  | scheduling         |     |
element
| RECSALEORD  | Char  10  | Receiving sales order  | Not used              |     |
| ----------- | --------- | ---------------------- | --------------------- | --- |
| RECITEM     | Char  6   | Position               | number  in  Not used  |     |
recipient sales order
| RECCOSTOBJ  | Char  12  | Receiving cost object  | Not used  |     |
| ----------- | --------- | ---------------------- | --------- | --- |

| RECBUSPROC  | Char  12  | Receiving  | business  Not used  |     |
| ----------- | --------- | ---------- | ------------------- | --- |
process

| REC_NETWRK  | Char  12  | Receiving network  | Not used  |     |
| ----------- | --------- | ------------------ | --------- | --- |

| RECOPERATN  | Char  4  | Receiving  | network  Not used  |     |
| ----------- | -------- | ---------- | ------------------ | --- |
operation

| RECRUNSCHD  | Char  12  | Receiving repeat order  | Not used  |     |
| ----------- | --------- | ----------------------- | --------- | --- |
| MATERIAL    | Char  18  | Receiving material      | Not used  |     |
PROD_VERSN  Char  4  Production version of the  Not used
recipient material
| PLANT  | Char  4  | Plant  of  | the  recipient  Not used  |     |
| ------ | -------- | ---------- | ------------------------- | --- |
material
RECPRCMTPROC  Char  12  Receiving  procurement  Not used
process
ITEMNO_ACC  Char  10  Position  number  of  the  Not used
accounting document
REC_CALC_MOTIVE  Char  2  Recipient  calculation  Not used
motive
| RECACTTYPE  | Char  6  | Receiving activity type  | Not used  |     |
| ----------- | -------- | ------------------------ | --------- | --- |
SRE_COMP_CODE  Char  4  Company  code  of  the  Not used
sending real estate object

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 21 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

| Field        | T  L     | Meaning            | Meaning in HYDRA  |     |
| ------------ | -------- | ------------------ | ----------------- | --- |
| SRE_BUS_ENT  | Char  8  | Sending  business  | unit  Not used    |     |
real estate
SRE_PROPERTY  Char  8  Sending lot of land real  Not used
estate
SRE_BUILDING  Char  8  Sending  building  real  Not used
estate
SRE_RENT_UNIT  Char  8  Sending  rental  unit  real  Not used
estate
| SRE_LEASE  | Char  13  | Sending rental agreement  | Not used  |     |
| ---------- | --------- | ------------------------- | --------- | --- |
real estate
SRE_MGMT_CON  Char  13  Sending  administration  Not used
agreement
SRE_INC_EXP  Char  4  Sending incidental costs  Not used
key real estate
SRE_SETT_UNIT  Char  5  Sending  accounting  unit  Not used
real estate
SRE_REF_DATE  Char  8  Sending  reference  date  Not used
settlement real estate
| SRE_CON_NO  | Char  13  | Sending  contract  | real  Not used  |     |
| ----------- | --------- | ------------------ | --------------- | --- |
estate
RRE_COMP_CODE  Char  4  Company  code  of  the  Not used
|     |     | receiving  real  | estate  |     |
| --- | --- | ---------------- | ------- | --- |
object
RRE_BUS_ENT  Char  8  Receiving  business  unit  Not used
real estate
RRE_PROPERTY  Char  8  Receiving lot of land real  Not used
estate
RRE_BUILDING  Char  8  Receiving  building  real  Not used
estate
RRE_RENT_UNIT  Char  8  Receiving rental unit real  Not used
estate
| RRE_LEASE  | Char  13  | Receiving  | rental  Not used  |     |
| ---------- | --------- | ---------- | ----------------- | --- |
agreement real estate

| RRE_MGMT_CON  | Char  13  | Receiving  administration  | Not used  |     |
| ------------- | --------- | -------------------------- | --------- | --- |
contract

| RRE_INC_EXP  | Char  4  | Receiving incidental costs  | Not used  |     |
| ------------ | -------- | --------------------------- | --------- | --- |
key real estate

| RRE_SETT_UNIT  | Char  5  | Receiving accounting unit  | Not used  |     |
| -------------- | -------- | -------------------------- | --------- | --- |
real estate

| RRE_REF_DATE  | Char  8  | Receiving reference date  | Not used  |     |
| ------------- | -------- | ------------------------- | --------- | --- |
settlement real estate

| RRE_CON_NO  | Char  13  | Receiving  contract  | real  Not used  |     |
| ----------- | --------- | -------------------- | --------------- | --- |
estate

| MATERIAL_EXTERNAL  | Char  40  | Long  material         | number  Not used  |     |
| ------------------ | --------- | ---------------------- | ----------------- | --- |
|                    |           | (future  development)  | for               |     |
the field MATER
MATERIAL_GUID  Char  32  External  GUID  (future  Not used
development) for the field
MATERIAL
MATERIAL_VERSION  Char  10  Version  number  (future  Not used
development) for the field
MATERIAL

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 22 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

Confirmation - indirect activity allocation
Segment E1ACC_SENDER_ACTIVITIES
| Field name  | T  L  | Meaning  | Meaning in HYDRA  |     |
| ----------- | ----- | -------- | ----------------- | --- |

| IGNORE_WARNINGS  | Char  1  | Ignore warnings  | Not occupied  |     |
| ---------------- | -------- | ---------------- | ------------- | --- |
|                  |          |                  |               |     |

Segment E1BPDOCHDRP000
| Field name  | T  L  | Meaning  | Meaning in HYDRA  |     |
| ----------- | ----- | -------- | ----------------- | --- |
CO_AREA  Char  4  Controlling area  According to configuration*)
| DOCDATE  | Char  8  | Document date  | Log. Date  |     |
| -------- | -------- | -------------- | ---------- | --- |
POSTGDATE  Char  8  Posting date  Set according to shift date of the
posting records
| VERSION  | Char  3   | Version          | according to configuration*)  |     |
| -------- | --------- | ---------------- | ----------------------------- | --- |
| DOC_NO   | Char  10  | Document number  | Not occupied                  |     |

VARIANT  Char  5  Fast document entry of CO- According to configuration*)
actual postings: Variant

| DOC_HDR_TX  | Char  50  | Document header text  | Not used  |     |
| ----------- | --------- | --------------------- | --------- | --- |

USERNAME  Char  12  Name of the user  According to configuration*)
| OBJ_KEY   | Char  20  | Reference key        | Not used           |     |
| --------- | --------- | -------------------- | ------------------ | --- |
| OBJ_TYPE  | Char  5   | Reference operation  | Not used           |     |
| OBJ_SYS   | Char  10  | Logical  system      | of  the  Not used  |     |
original document

Segment E1BPIAITM000
| Field name  | T  L  | Meaning  | Meaning in HYDRA  |     |
| ----------- | ----- | -------- | ----------------- | --- |
SEND_CCTR   Char  10  Sending cost center   according to configuration*)
ACTTYPE   Char  6  Activity type   according to configuration*)
SENBUSPROC   Char  12  Sending business process  Not used
ACTVTY_QTY   Quan  15.3  Activities quantity   according to configuration*)
ACTIVITYUN   Char  3  Activity unit   according to configuration*)
| ACTIVITYUN_ISO   | Char  3  | ISO-code  | unit  of Not used  |     |
| ---------------- | -------- | --------- | ------------------ | --- |
measurement
POS_OUTQTY   Quan  15.3  Posted output quantity   Not used
| POSTOUTUN       | Char  3  | Posted output unit   | Not used           |     |
| --------------- | -------- | -------------------- | ------------------ | --- |
| POSTOUTUN_ISO   | Char  3  | ISO-code             | unit  of Not used  |     |
measurement
| PERSON_NO   | Numc  8   | Personnel number   |           |     |
| ----------- | --------- | ------------------ | --------- | --- |
| SEG_TEXT    | Char  50  | Segment text       | Not used  |     |

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 23 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP CO-ILV
SAP-COILV_82.docx Version: 1.0.23049 Page 24 of 46

HYDRA Interfacing Module to SAP CO-ILV
8 Configuration of Uploads
Summary
Configuration of Uploads to SAP CO
SAP CO has been designed as dynamically as possible to be able to meet the different requirements
and situations. The table SAP_RCK_DATA_CONF is used for configurations. Parameters, program
parameters and field parameters are defined in this table.
Parameters:
Statistical values required for the generation of the IDoc can be defined using these
parameters (e.g. the company code).
Program parameters
Program parameters control program processing. These parameters can be used, for
example, to define that only orders of a specific HYDRA order type are uploaded/confirmed.
Field parameters:
Field parameters define from which HYDRA data model fields values relevant for the upload
are taken. Moreover, for certain field parameters it is possible to define in which length and as
of which position these values are to be taken.
All parameters are saved as variant. This means that the upload program is called up with the
corresponding message type and the variant and the settings defined in this variant are used for the
upload.
Please note: Important: When calling the program MYERPRCK to generate upload records, the
variant is to be sent as well so that this variant will be forwarded as parameter to the user exit.
e.g. sh.exe ./myerprck.scr /MESTYP=ACC_ACT_ALLOC /KAT=GK
/UE_PARAMS="VARIANTE=SAP"
Parameters
Key type Parameter Description Values
P CO_AREA The content of this field of the segment e.g. 1000
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field CO_AREA. It includes
the SAP controlling area.
SAP-COILV_82.docx Version: 1.0.23049 Page 25 of 46

    HYDRA Interfacing Module to SAP CO-ILV

| Key type  | Parameter  | Description  | Values  |     |
| --------- | ---------- | ------------ | ------- | --- |
P  VERSION  The content of this field of the segment  e.g. 000
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field VERSION.
P  VARIANT  The content of this field of the segment  e.g. SAP02
E1BPDOCHDRP000 of the upload IDoc is
transferred to the field VARIANT. It includes
the specific upload variant in SAP.
| P   | ACTIVITYUN  | Determines the upload unit  | SEK  | second  |
| --- | ----------- | --------------------------- | ---- | ------- |
MIN  minute
M  minute
|     |     |     | STD  | hour    |
| --- | --- | --- | ---- | ------- |
  (Default)
H  hour
Program parameter overview
| Key type  | Parameter  | Description                                   | Values  |     |
| --------- | ---------- | --------------------------------------------- | ------- | --- |
| PP        | NOSAP      | If this parameter is set only orders will be  |         | -   |
uploaded that are not known in SAP
PP  ONLYSAP  If this parameter is set only orders will be  -
uploaded that are not known in SAP.
default setting
PP  LOGSYS  The  logical  system  specified  here  Logical system of the
determines the communication user from the
mySAP communication
configuration tables of the HYDRA mySAP
communication. This user is also entered as
the user of data records in SAP.
PP  MAX_SEG  Maximum number of segments summarized  Default 100
for the upload.
| PP  | USERNAME  | User name who is specified as generating  |     |     |
| --- | --------- | ----------------------------------------- | --- | --- |
user in the data record structure.
If no user is specified the communication
user indicated in LOGSYS of the logical
system is determined and used as the user.
Field parameters
| Key type  | Parameter  | Description           | Values    |     |
| --------- | ---------- | --------------------- | --------- | --- |
| F         | SEND_CCTR  | Sending cost center   | MNR.KST:  |     |
cost center of the workplace
ADEPRO.ANR:
HYDRA order indicating the
position from / to
|     |     |     | PNR.KST:  |     |
| --- | --- | --- | --------- | --- |
The employee’s cost center

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 26 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

| Key type  | Parameter  | Description    |     | Values        |     |     |
| --------- | ---------- | -------------- | --- | ------------- | --- | --- |
| F         | ACTTYPE    | Activity type  |     | ADEPRO.ANR:   |     |     |
HYDRA order number
indicating the position from /
to
|     |     |     |     | PNR.INFOTEXT:1  |     |     |
| --- | --- | --- | --- | --------------- | --- | --- |
The employee’s activity type
from the HR master
F  ACTVTY_QTY  Quantity of the activity type  ADEPRO.EGR:PDAUER:
Duration of the B record
posting
| F   | REC_CCTR  | Receiving cost center  |     | ADEPRO.ANR:   |     |     |
| --- | --------- | ---------------------- | --- | ------------- | --- | --- |
HYDRA order number
specifying the position from /
to
| F   | REC_ORDER  | Receiving order  |     | AGNR.SAPAUNR:  |     |     |
| --- | ---------- | ---------------- | --- | -------------- | --- | --- |
SAP order number of the
CO internal order
| F   | PERSON_NO  | Personnel number  |     | ADEPRO.PNR: HYDRA  |     |     |
| --- | ---------- | ----------------- | --- | ------------------ | --- | --- |
personnel number

Structure of the table SAP_RCK_DATA_CONF
The below table includes the configurations for the upload/confirmation to SAP CO. At the moment,
the table can only be edited directly in the database.
| Field name  |     | T  L     | Meaning   | Meaning in HYDRA  |     |     |
| ----------- | --- | -------- | --------- | ----------------- | --- | --- |
| KEY_TYPE    |     | Char  2  | Key type  | Parameter type:   |     |     |

„P“  Parameter
„PP“  Program parameter
„F“  Field parameter
| KEY  |     | Char  30  | Key  | Parameter name, e.g.  |     |     |
| ---- | --- | --------- | ---- | --------------------- | --- | --- |
SEND_CCTR, ONLYSAP
| SUBKEY  |     | Char  40  | Variant  | Variant name by which a  |     |     |
| ------- | --- | --------- | -------- | ------------------------ | --- | --- |
configuration is saved and the
upload program is started (free
text).
MESTYP  Char  30  Message type  Name of the SAP message type
POS_VON  Num    Position from  Field position from which the value
is to be taken. If nothing is entered
the entire field will be taken over.
POS_BIS  Num    Position to  Field position up to which the value
is to be taken. If nothing is entered
the entire field will be taken over.
| LFD_NR  |     | Num    | Consecutive number  | Not relevant  |     |     |
| ------- | --- | ------ | ------------------- | ------------- | --- | --- |
VERWEIS  Num    Reference  Unique reference (assigned by the
database).
| BEARB  |     | Char  10  | Editor  | Not used  |     |     |
| ------ | --- | --------- | ------- | --------- | --- | --- |

| SAP-COILV_82.docx  |     |     | Version: 1.0.23049  |     | Page 27 of 46  |     |
| ------------------ | --- | --- | ------------------- | --- | -------------- | --- |

    HYDRA Interfacing Module to SAP CO-ILV

| Field name   | T  L       | Meaning            | Meaning in HYDRA  |     |
| ------------ | ---------- | ------------------ | ----------------- | --- |
| BEARB_DATE   | Date       | Editing date       | Not used          |     |
| BEARB_TIME   | Time       | Editing time       | Not used          |     |
| ANLAGE_DATE  | Date       | Creation date      | Not used          |     |
| ANLAGE_ZEIT  | Time       | Creation time      | Not used          |     |
| PARAM_STR1   | Char  20   | Parameter 1        | Not used          |     |
| PARAM_STR2   | Char  20   | Parameter 2        | Not used          |     |
| PARAM_STR3   | Char  40   | Parameter 3        | Not used          |     |
| PARAM01      | Num        | Parameter integer  | Not used          |     |
| PARAM02      | Num        | Parameter integer  | Not used          |     |
| PARAM01_d    | Dec  18,6  | Parameter decimal  | Not used          |     |

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     | Page 28 of 46  |
| ------------------ | --- | ------------------- | --- | -------------- |

HYDRA Interfacing Module to SAP CO-ILV
9 Application-Relevant Settings in HYDRA
Maintenance of the HYDRA distribution model – outbound processing
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
Parameter name Value
To upload the time tickets for direct activity allocation
Message type ACC_ACT_ALLOC
Description CO-ILV – Direct activity allocation
IDoc type ACC_ACT_ALLOC02
Storage duration 10
Log. target system Created logical system
Segment name 1 E2ACC_ACT_ALLOC000
To upload the time tickets for indirect activity allocation
Message type ACC_SENDER_ACTIVITIES
Description CO-ILV – indirect activity allocation
IDoc type ACC_SENDER_ACTIVITIES
Storage duration 10
Log. target system Created logical system
Segment name 1 E2ACC_SENDER_ACTIVITIES
Scheduler maintenance
The following entries must be made for confirmations/uploads of goods movements in the Scheduler:
Parameter name Value
To upload the time tickets for direct activity allocation – confirmation/upload program
SAP-COILV_82.docx Version: 1.0.23049 Page 29 of 46

    HYDRA Interfacing Module to SAP CO-ILV

| Parameter name  | Value      |     |
| --------------- | ---------- | --- |
| Product key     | SAP-COILV  |     |
| License key     | SAP-COILV  |     |
Command (Windows):  sh.exe ./myerprck.scr /MESTYP=ACC_ACT_ALLOC /KAT=GK
/UE_PARAMS="<configured variant>"
Command (Unix):  ./myerprck.scr  /MESTYP=ACC_ACT_ALLOC  /KAT=GK
/UE_PARAMS="<configured variant>"
| Comment:  | Direct activity allocation HYDRA  SAP  |     |
| --------- | --------------------------------------- | --- |
| Interval  | 5                                       |     |
To upload the time tickets for direct activity allocation - upload client
| Product key         | SAP-COILV  |                 |
| ------------------- | ---------- | --------------- |
| License key         | SAP-COILV  |                 |
| Command (Windows):  | sh.exe     | ./hysapupl.scr  |
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2
| Command (Unix):  | ./hysapupl.scr  |     |
| ---------------- | --------------- | --- |
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2
| Comment:  | Direct activity allocation HYDRA  SAP  |     |
| --------- | --------------------------------------- | --- |
| Interval  | 5                                       |     |
To upload the time tickets for indirect activity allocation - confirmation program
| Product key  | SAP-COILV  |     |
| ------------ | ---------- | --- |
| License key  | SAP-COILV  |     |
Command (Windows):  sh.exe  ./myerprck.scr  /MESTYP=ACC_SENDER_ACTIVITIES
/KAT=GK /UE_PARAMS="<configured variant>"
Command (Unix):  ./myerprck.scr  /MESTYP=  ACC_SENDER_ACTIVITIES
/KAT=GK /UE_PARAMS="<configured variant>"

| SAP-COILV_82.docx  | Version: 1.0.23049  | Page 30 of 46  |
| ------------------ | ------------------- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

| Parameter name  | Value                                     |     |
| --------------- | ----------------------------------------- | --- |
| Comment:        | Indirect activity allocation HYDRA  SAP  |     |
| Interval        | 5                                         |     |
To upload the time tickets for indirect activity allocation - upload client
| Product key         | SAP-COILV  |                 |
| ------------------- | ---------- | --------------- |
| License key         | SAP-COILV  |                 |
| Command (Windows):  | sh.exe     | ./hysapupl.scr  |
/UPLSEGNAM=/UPLSEGNAM=E2ACC_SENDER_ACTIVITIES
/SINGLE_IDOC /SUBLEVEL=2
| Command (Unix):  | ./hysapupl.scr  |     |
| ---------------- | --------------- | --- |
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2
| Comment:  | Direct activity allocation HYDRA  SAP  |     |
| --------- | --------------------------------------- | --- |
| Interval  | 5                                       |     |

| SAP-COILV_82.docx  | Version: 1.0.23049  | Page 31 of 46  |
| ------------------ | ------------------- | -------------- |

HYDRA Interfacing Module to SAP CO-ILV
SAP-COILV_82.docx Version: 1.0.23049 Page 32 of 46

HYDRA Interfacing Module to SAP CO-ILV
10 Application Relevant Settings in SAP
Maintenance of the SAP partner agreement – inbound processing
Maintain the following settings for inbound processing in the partner agreement in SAP (WE20)
Parameter name Value
Set-up for the direct activity allocation
Partner number Created logical system
Partner type LS
Message type ACC_ACT_ALLOC
Transaction code BAPI
Appliance for direct activity allocation
Partner number Created logical system
Partner type LS
Message type ACC_SENDER_ACTIVITIES
Transaction code BAPI
Maintenance of the SAP distribution model - inbound processing
Parameter name Value
Set-up for the direct activity allocation
Model view Created model view
Sender/ client Logical system for the sender system
Recipient/ server Logical system of the client
Object name/ interface AcctngActivityAlloc
SAP-COILV_82.docx Version: 1.0.23049 Page 33 of 46

HYDRA Interfacing Module to SAP CO-ILV
Parameter name Value
Method Post
For indirect activity allocation
Model view Created model view
Sender/ client Logical system for the sender system
Recipient/ server Logical system of the client
Object name/ interface AcctngSenderActivity
Method Post
SAP-COILV_82.docx Version: 1.0.23049 Page 34 of 46

    HYDRA Interfacing Module to SAP CO-ILV

11  MYERPRCK - Program Parameters
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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 35 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     |     |     | Page 36 of 46  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 37 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     |     |     | Page 38 of 46  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- | --- |

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

| SAP-COILV_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 39 of 46  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 40 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 41 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 42 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     |     | Page 43 of 46  |
| ------------------ | --- | ------------------- | --- | --- | --- | -------------- |

    HYDRA Interfacing Module to SAP CO-ILV

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     | Page 44 of 46  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     |     |     | Page 45 of 46  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |

|     |     |     |     |     | HYDRA Interfacing Module to SAP CO-ILV  |     |     |
| --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |

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

| SAP-COILV_82.docx  |     | Version: 1.0.23049  |     |     |     |     | Page 46 of 46  |
| ------------------ | --- | ------------------- | --- | --- | --- | --- | -------------- |