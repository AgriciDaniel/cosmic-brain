Manual
Master Data Transfer from
Third-Party Systems
EIS-SDF 8.2
Version 1.0.23049
Last changed on: 01.09.2020

Master Data Transfer from Third-Party Systems
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EIS-SDF_82.docx Version: 1.0.23049 Page 2 of 32

Master Data Transfer from Third-Party Systems
Contents
1 Master Data Transfer from Third-Party Systems ......................................... 4
2 Structure of the DLG Format ........................................................................ 6
3 Data Transfer via Excel .............................................................................. 11
4 Data type definitions ................................................................................... 15
5 Material Buffer ............................................................................................ 17
6 Resources .................................................................................................. 19
7 Production Variants/Methods ..................................................................... 23
8 Machines / Workplaces .............................................................................. 26
9 Sample Files .............................................................................................. 32
EIS-SDF_82.docx Version: 1.0.23049 Page 3 of 32

Master Data Transfer from Third-Party Systems
1 Master Data Transfer from Third-Party Systems
Summary
Fields of application
When introducing the MES system, different master data need to be created. In some cases, very large
amounts of data need to be created. These data sets cannot be edited manually or it requires lots of
maintenance work.
For this reason, it is possible to transfer master data automatically from third-party systems.
Implementation notes
You use the master data import function if you require to initially transfer large amounts of master data
from external systems when introducing a new system.
Features
 Master data transfer from third-party systems
o Function to transfer master data (checked for validity) from third-party systems including
documentation to describe the data format in use and the steps required for posting
 Import of machine master data
 Import of resources
 Import of production variants
 Import of material buffers
Procedure
 Subject to the data type to be imported, the below-described procedure is to be considered in
addition to the data descriptions:
Import data type Document
DNC resources transfer of DNC data
EIS-SDF_82.docx Version: 1.0.23049 Page 4 of 32

Master Data Transfer from Third-Party Systems
EIS-SDF_82.docx Version: 1.0.23049 Page 5 of 32

Master Data Transfer from Third-Party Systems
2 Structure of the DLG Format
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
EIS-SDF_82.docx Version: 1.0.23049 Page 6 of 32

    Master Data Transfer from Third-Party Systems

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

| EIS-SDF_82.docx  | Version: 1.0.23049  |     |     | Page 7 of 32  |
| ---------------- | ------------------- | --- | --- | ------------- |

|     |     |     |   Master Data Transfer from Third-Party Systems |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- |

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

| EIS-SDF_82.docx  |     | Version: 1.0.23049  |     |     | Page 8 of 32  |
| ---------------- | --- | ------------------- | --- | --- | ------------- |

Master Data Transfer from Third-Party Systems
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
EIS-SDF_82.docx Version: 1.0.23049 Page 9 of 32

Master Data Transfer from Third-Party Systems
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
EIS-SDF_82.docx Version: 1.0.23049 Page 10 of 32

Master Data Transfer from Third-Party Systems
3 Data Transfer via Excel
Experience has taught that preparing data in Microsoft Excel™ delivers the best results. But in general
data may also be prepared in any other program. The paragraphs that follow show two possibilities of
data provision.
Data provision in Excel (file *.xls)
MPDV provides a sample file to prepare data in Excel. Selected master data have already been prepared
in this file.
The Excel file provides a separate spreadsheet for each master data object indicating the real name of
this object. The respective spreadsheets already include the available acronyms. The columns, which the
user has to fill out with user data, are highlighted in yellow. The corresponding documents describe the
respective meaning of acronyms.
Every single spreadsheet has to be saved as “text (tab delimited) (*.txt)” to be able to transfer the data
from the Excel worksheet into the HYDRA DLG format after completion.
EIS-SDF_82.docx Version: 1.0.23049 Page 11 of 32

Master Data Transfer from Third-Party Systems
The resulting text file (MLE-MDM.DLG in the above example) has to be reworked in a text editor. In this
case, the tabs included in the file have to be removed. This can be made in any text editor, unless it
provides this feature. The TextPad (www.textpad.com) program has proved its worth in this connection.
The procedure is described in an example on the basis of this program.
Once the file has been saved in the above-mentioned format in Excel, it is available as text file including
tabs.
These tabs may now be removed by the “search/replace” function. To do so, select a tab, start the
search/replace function and replace the tab by ““ (nothing).
Now we have a file in the HYDRA DLG format that can be imported in HYDRA.
Data provision as text file (file *.DLG
A file in the HYDRA DLG format needs to be generated anyway, even if Excel is not used. Such a file has
the following, exemplary structure:
EIS-SDF_82.docx Version: 1.0.23049 Page 12 of 32

Master Data Transfer from Third-Party Systems
File import using the HYDRA server
The file can also directly be imported to HYDRA on the HYDRA server. But the procedure is slightly
different for Windows and Unix.
File import with Windows
Connect to the HYDRA server (e.g. via RemoteDesktop). Start the Dos box from the HYDRA
administration folder on the desktop. Please choose the Dos box for the correct system, if a HYDRA
multi-system installation is in use.
Start the posting program in the Dos box as follows:
Hymwb.exe –d –u9999 –b<file name> > <file name>.pro
In case of the example from section 3:
Hymwb.exe –d –u9999 –bMLE-MDM.dlg > MLE-MDM.pro
The program is started by the parameter “-d” with developer traces. They ease the diagnosis if errors
occur during the import. By entering the addition “> dlg.pro” the output is redirected into a log file, which
simplifies checking at a later point in time.
Please note: The import only works properly if the posting program is run in the HYDRA directory. The file
to be imported may be stored in any directory, the corresponding path has to be indicated in the
parameter “-b”, e.g. „\importdir\datei.dlg“.
File import with Unix
Connect to the HYDRA server (e.g. via Telnet). Please choose the correct system if a HYDRA multi-
system installation is in use.
Start the posting program as follows:
hymwb.out –d –u9999 –b<file name (case sensitive!)> > DLG.pro
In case of the example from section 3:
hymwb.out –d –u9999 –bMLE-MDM.DLG > MLE-MDM.pro
EIS-SDF_82.docx Version: 1.0.23049 Page 13 of 32

Master Data Transfer from Third-Party Systems
The program is started by the parameter “-d” with developer traces. They ease the diagnosis if errors
occur during the import. By entering the addition “> dlg.pro” the output is redirected into a log file, which
simplifies checking at a later point in time.
Please note: The import only works properly if the posting program is run in the HYDRA directory. The file
to be imported may be stored in any directory. The corresponding path has to be indicated in the
parameter “-b”, e.g. „\importdir\datei.dlg“.
Import of object files
In case objects include files (e.g. DNC), the files are copied to the target folder using the operating
system functions. This can happen prior to or after the BAPI process. But file management and
processing have to be configured beforehand. This depends on the application and is explained in the
corresponding documents dealing with the application (e.g. the resource type DNC including the correct
path configuration has to be created and configured).
EIS-SDF_82.docx Version: 1.0.23049 Page 14 of 32

Master Data Transfer from Third-Party Systems
4 Data type definitions

Type Description
CHAR x The information is left-aligned for the data type CHAR; unnecessary places are filled with
blanks (blanks - (U+0020)).
If a field is not used, fill it in full length with blanks.
Example: "ABCD "
NUM x Numeric field of the length x without sign. The NUMC data type only supports digits (ASCII
characters 30 hex to 39 hex and/or U+0030 – U+0039). Numbers are right-aligned;
unnecessary places are filled with zeros (U+0030).
If a field is not used, fill it in full length with zeros.
Example: "00000002"
DEC x.y Numeric field of the length x and y decimal places. A data field in HYDRA format is
preceded by a sign ("+" or "-") and includes a decimal point. Enter zeros to fill empty
QUAN x.y
places.
If a field is not used, fill it in full length with zeros (U+0030) including sign and decimal
separator.
e.g. DEC 13,3:
 -1234567890,123  -1234567890.123
 234567890,3  +0234567890.300
Note:
The field length is indicated WITHOUT algebraic sign and WITHOUT decimal point in the
tabular description of the structure. For example: a QUAN 13.3 field results in an external
length of CHAR15.
DATE Dates must be transferred in the HYDRA format MM/DD/YYYY.
Populate unused date fields with blanks (U+0020; zero(s) (U+0030) not accepted).
TIME Times must be transferred in the HYDRA format seconds after midnight (0 - 86400).
For all alphanumeric fields, HYDRA does not support specific special characters. These
characters are: "\“ (backslash - U+005B), "|“ (pipe - U+007C), „ “ “ (double quote - U+0022), and
„ ’ “ (single quote - U+0027). You cannot enter these characters using the shop floor terminals;
EIS-SDF_82.docx Version: 1.0.23049 Page 15 of 32

Master Data Transfer from Third-Party Systems
the terminals and the MOC do not support these characters.
The character " ; “ (semicolon - U+003B) is used as separator for data collection. You must not
use this character in key fields (e.g. order, batch number, personnel number, etc.).
The character " % “ (percent - U+0025) is used as placeholder/wildcard character for database
queries. For this reason, you should avoid using this character as it might falsify results.
In general, you must not use special characters ranging from U+0000 to U+001F. Exception:
U+000A and U+000D as end-of-line characters.
The file must not include Byte Order Mark (BOM).
In general, HYDRA always expects a contiguous data structure. Consequently, you have to populate
unused data fields with such default values that comply with the applicable conventions. This also applies
to fields that are not required at the end of a data structure. The following definitions apply if you use the
file port:
Each data record included in the file has to be completed by 'CR' (U+000D) und 'LF' (U+000A) for
Windows and 'LF' (U+000A) for Unix.
HYDRA expects the file to be in the UTF-8 format and HYDRA also uses this format for uploads. On
request, you can also transfer files in the file format that was used until MW 2.x.
EIS-SDF_82.docx Version: 1.0.23049 Page 16 of 32

    Master Data Transfer from Third-Party Systems

5  Material Buffer
Available methods
| Method         | Usage                   |     |     |
| -------------- | ----------------------- | --- | --- |
| MATPUF.INSERT  | Create material buffer  |     |     |
| MATPUF.UPDATE  | Change material buffer  |     |     |
| MATPUF.DELETE  | Delete material buffer  |     |     |

Data
| Column  | Description  |     |     |
| ------- | ------------ | --- | --- |
| Field   | Field name   |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
| T(ype)    | Data type  of the field  |     |     |
| --------- | ------------------------ | --- | --- |
| L(ength)  | Field length             |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Description and/or comment of the field  |     |     |
| ------------ | ---------------------------------------- | --- | --- |

| Field          | V  T     | L  D  Description                        |     |
| -------------- | -------- | ---------------------------------------- | --- |
| MATPUF.MATPUF  | S  CHAR  | 12    Material buffer                    |     |
| MATPUF.TYP     |   CHAR   | 1    Type (see available values in GUI)  |     |
| MATPUF.BEZ     |   CHAR   | 30    Name                               |     |
| MATPUF.LAGORT  |   CHAR   | 20    Storage location                   |     |
| MATPUF.KST     |   CHAR   | 10    Cost center                        |     |
| MATPUF.ABT     |   CHAR   | 10    Department                         |     |
| MATPUF.BER     |   CHAR   | 10    Area                               |     |
| MATPUF.FIR     |   CHAR   | 4    Company                             |     |
| MATPUF.BEM     |   CHAR   | 20    Comment                            |     |
| MATPUF.DAUER   |   NUMC   | 7    Retention period                    |     |
MATPUF.OPT:TANRPRN    CHAR  1    Internal use - do not transfer acronym
MATPUF.OPT:NOTMATPUF    CHAR  1    Internal use - do not transfer acronym
| MATPUF.OPT:PKORB  |   CHAR  | 1    ID "recycle bin" DLG  |     |
| ----------------- | ------- | -------------------------- | --- |
"J“  yes
"N“  no
| MATPUF.OPT:INBESTVER |   CHAR  |     ID "Include in stock"  |     |
| -------------------- | ------- | -------------------------- | --- |
B
"J“  yes
"N“  no
| MATPUF.HARCID  |   NUMC  | 3    Hierarchy  |     |
| -------------- | ------- | --------------- | --- |
MATPUF.HARCMATPUF    CHAR  12    Superordinate material buffer
| MATPUF.ART  |   CHAR  | 1    Type of batch transport:  |     |
| ----------- | ------- | ------------------------------ | --- |
"K”  no buffer
"E"  input buffer
"A"  output buffer

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 17 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field       | V  T    | L  D  Description                     |     |
| ----------- | ------- | ------------------------------------- | --- |
| MATPUF.ZLO  |   CHAR  | 10    Batch transport – corr. system  |     |
MATPUF.OPT:LAGVERB    CHAR  1    Internal use - do not transfer acronym
| MATPUF.OPT:VIRTLAG  |   CHAR  | 1    ID "Virt. stock buffer"  |     |
| ------------------- | ------- | ----------------------------- | --- |
"J“  yes
"N“  no

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 18 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

6  Resources

Available methods
| Method      | Usage            |     |     |
| ----------- | ---------------- | --- | --- |
| RES.INSERT  | Create resource  |     |     |
| RES.UPDATE  | Change resource  |     |     |
| RES.DELETE  | Delete resource  |     |     |

Data
| Column  | Description  |     |     |
| ------- | ------------ | --- | --- |
| Field   | Field name   |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
| T(ype)    | Data type  of the field  |     |     |
| --------- | ------------------------ | --- | --- |
| L(ength)  | Field length             |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Description and/or comment of the field  |     |     |
| ------------ | ---------------------------------------- | --- | --- |

| Field             | V  T     | L  D  Description                   |     |
| ----------------- | -------- | ----------------------------------- | --- |
| RES.RES           | S  CHAR  | 20    Resource                      |     |
| RES.RESTYP        | S  CHAR  | 8    Resource type                  |     |
| RES.BEZ           |   CHAR   | 40    Name                          |     |
| RES.VAB           |   CHAR   | 15    Responsibility area           |     |
| RES.KST           |   CHAR   | 10    Cost center                   |     |
| RES.INVNR         |   CHAR   | 40    Inventory number              |     |
| RES.GRAVNR        |   CHAR   | 40    Engraving number              |     |
| RES.ZEICHNR       |   CHAR   | 20    Drawing number                |     |
| RES.HERST         |   CHAR   | 40    Manufacturer                  |     |
| RES.EIGENT        |   CHAR   | 40    Owner                         |     |
| RES.ANSCHAFFDAT   |   DATE   |     Date of purchase                |     |
| RES.ANSCHAFFKOST  |   DEC    | 9  2  Acquisition costs             |     |
| RES.MATPUF:S      |   CHAR   | 10    Storage location              |     |
| RES.LIEFDAT       |   DATE   |     Delivery date                   |     |
| RES.INBDAT        |   DATE   |     Start-up date                   |     |
| RES.GARDAT        |   DATE   |     Guarantee date                  |     |
| RES.BEZFREMD      |   CHAR   | 50    External name                 |     |
| RES.TYPBEZ        |   CHAR   | 50    Description of resource type  |     |
RES.VERW    CHAR  25    Use (see possible entries displayed in the GUI)
| RES.BESTNR  |   CHAR  | 25    Purchase order number  |     |
| ----------- | ------- | ---------------------------- | --- |
| RES.LIEFNR  |   CHAR  | 25    Supplier no.           |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 19 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field  | V  T  | L  D  Description  |     |
| ------ | ----- | ------------------ | --- |
RES.VERANT:TYP    CHAR  25    Party in charge Type (see possible entries displayed in the GUI)
| RES.VERANT:NR  |   CHAR  | 25    Party in charge  |     |
| -------------- | ------- | ---------------------- | --- |
| RES.ANONYM     |   CHAR  | 1    Type              |     |
"J“  Anonymous resource
"N“  No anonymous resource
"B“  Required resource
RES.OPT:TYPGL    CHAR  1    Equal type (see possible entries displayed in the GUI)
| RES.RESVER          |   CHAR  | 12    Version                               |     |
| ------------------- | ------- | ------------------------------------------- | --- |
| RES.ANZ             |   NUMC  | 5    Number                                 |     |
| RES.RESFAMID        |   NUMC  | 7    Family                                 |     |
| RES.SGR:HUB         |   NUMC  | 12    Cycles                                |     |
| RES.OPT:EINH        |   CHAR  | 3    Input unit                             |     |
| RES.SGR:KLKLZ       |   NUMC  | 9    Run time (in seconds)                  |     |
| RES.SZY             |   NUMC  | 9    Target cycle (in seconds/1000 cycles)  |     |
| RES.TLG:S           |   NUMC  | 5    Original partitioning                  |     |
| RES.TLG:I           |   NUMC  | 5    Current partitioning                   |     |
| RES.OPT:AUTOANMELD  |   CHAR  | 1    Log on with OP                         |     |
"J“  log on resource with order when A_AN or log off
resource with order when A_AB
"N“  do not log on/off resource with order (if DNC always "N")
"E“  explicit logon / change to logon allowed (as of version
WRM 7.2)
RES.OPT:MULTIMNR    CHAR  1    ID "Can be logged on at the same time"
"J“  yes
"N“  no
| RES.OPT:VERB  |   CHAR  | 1    ID "Post to resource"  |     |
| ------------- | ------- | --------------------------- | --- |
"J“  yes
"N“  no
| RES.ANFZ  |   NUMC  | 9    Setup time (in seconds)  |     |
| --------- | ------- | ----------------------------- | --- |
RES.ABRZ    NUMC  9    Retooling (teardown) time (in seconds)
RES.OPT:BEL    CHAR  1    Assignment (see possible entries displayed in the GUI)
| RES.OPT:AUSWSIB  |   CHAR  | 1    ID "Consider in evaluations"  |     |
| ---------------- | ------- | ---------------------------------- | --- |
"J“  yes
"N“  no
| RES.SPEICHORT:DATA  |   CHAR  | 128    File name               |     |
| ------------------- | ------- | ------------------------------ | --- |
| RES.RES:V1          |   CHAR  | 20    Resource 1               |     |
| RES.RESTYP:V1       |   CHAR  | 8    Resource type 1           |     |
| RES.RES:V2          |   CHAR  | 20    Resource 2               |     |
| RES.RESTYP:V2       |   CHAR  | 8    Resource type 2           |     |
| RES.GENAUSKL        |   CHAR  | 50    Accuracy class           |     |
| RES.EINHEIT         |   CHAR  | 3    Unit                      |     |
| RES.MESSBAB         |   DEC   | 10  4  Measurement range from  |     |
| RES.MESSBBIS        |   DEC   | 10  4  Measurement range to    |     |
| RES.MEISTM          |   DEC   | 10  4  Master value            |     |
| RES.MEISTLAB        |   DEC   | 10  4  Master tolerance from   |     |
| RES.MEISTLBIS       |   DEC   | 10  4  Master tolerance to     |     |
| RES.USRFLD          |   CHAR  | 8    User field key            |     |
| RES.FU:1            |   DATE  | 10    User field 1             |     |
| RES.FU:2            |   DATE  | 10    User field 2             |     |
| RES.FU:3            |   DATE  | 10    User field 3             |     |
| RES.FU:4            |   DATE  | 10    User field 4             |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 20 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field      | V  T    | L  D  Description     |     |
| ---------- | ------- | --------------------- | --- |
| RES.FU:5   |   DATE  | 10    User field 5    |     |
| RES.FU:6   |   DATE  | 10    User field 6    |     |
| RES.FU:7   |   NUM   | 8    User field 7     |     |
| RES.FU:8   |   NUM   | 8    User field 8     |     |
| RES.FU:9   |   NUM   | 8    User field 9     |     |
| RES.FU:10  |   NUM   | 8    User field 10    |     |
| RES.FU:11  |   NUM   | 8    User field 11    |     |
| RES.FU:12  |   NUM   | 8    User field 12    |     |
| RES.FU:13  |   NUM   | 8    User field 13    |     |
| RES.FU:14  |   NUM   | 8    User field 14    |     |
| RES.FU:15  |   NUM   | 8    User field 15    |     |
| RES.FU:16  |   NUM   | 8    User field 16    |     |
| RES.FU:17  |   NUM   | 8    User field 17    |     |
| RES.FU:18  |   NUM   | 8    User field 18    |     |
| RES.FU:19  |   NUM   | 8    User field 19    |     |
| RES.FU:20  |   NUM   | 8    User field 20    |     |
| RES.FU:21  |   NUM   | 8    User field 21    |     |
| RES.FU:22  |   NUM   | 8    User field 22    |     |
| RES.FU:23  |   DEC   | 13  3  User field 23  |     |
| RES.FU:24  |   DEC   | 13  3  User field 24  |     |
| RES.FU:25  |   DEC   | 13  3  User field 25  |     |
| RES.FU:26  |   DEC   | 13  3  User field 26  |     |
| RES.FU:27  |   DEC   | 13  3  User field 27  |     |
| RES.FU:28  |   DEC   | 13  3  User field 28  |     |
| RES.FU:29  |   CHAR  | 1    User field 29    |     |
| RES.FU:30  |   CHAR  | 1    User field 30    |     |
| RES.FU:31  |   CHAR  | 1    User field 31    |     |
| RES.FU:32  |   CHAR  | 1    User field 32    |     |
| RES.FU:33  |   CHAR  | 1    User field 33    |     |
| RES.FU:34  |   CHAR  | 1    User field 34    |     |
| RES.FU:35  |   CHAR  | 1    User field 35    |     |
| RES.FU:36  |   CHAR  | 1    User field 36    |     |
| RES.FU:37  |   CHAR  | 1    User field 37    |     |
| RES.FU:38  |   CHAR  | 1    User field 38    |     |
| RES.FU:39  |   CHAR  | 1    User field 39    |     |
| RES.FU:40  |   CHAR  | 1    User field 40    |     |
| RES.FU:41  |   CHAR  | 1    User field 41    |     |
| RES.FU:42  |   CHAR  | 1    User field 42    |     |
| RES.FU:43  |   CHAR  | 1    User field 43    |     |
| RES.FU:44  |   CHAR  | 1    User field 44    |     |
| RES.FU:45  |   CHAR  | 10    User field 45   |     |
| RES.FU:46  |   CHAR  | 10    User field 46   |     |
| RES.FU:47  |   CHAR  | 10    User field 47   |     |
| RES.FU:48  |   CHAR  | 10    User field 48   |     |
| RES.FU:49  |   CHAR  | 10    User field 49   |     |
| RES.FU:50  |   CHAR  | 10    User field 50   |     |
| RES.FU:51  |   CHAR  | 20    User field 51   |     |
| RES.FU:52  |   CHAR  | 20    User field 52   |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 21 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field      | V  T    | L  D  Description      |     |
| ---------- | ------- | ---------------------- | --- |
| RES.FU:53  |   CHAR  | 20    User field 53    |     |
| RES.FU:54  |   CHAR  | 20    User field 54    |     |
| RES.FU:55  |   CHAR  | 20    User field 55    |     |
| RES.FU:56  |   CHAR  | 20    User field 56    |     |
| RES.FU:57  |   CHAR  | 20    User field 57    |     |
| RES.FU:58  |   CHAR  | 20    User field 58    |     |
| RES.FU:59  |   CHAR  | 20    User field 59    |     |
| RES.FU:60  |   CHAR  | 20    User field 60    |     |
| RES.FU:61  |   CHAR  | 20    User field 61    |     |
| RES.FU:62  |   CHAR  | 20    User field 62    |     |
| RES.FU:63  |   CHAR  | 20    User field 63    |     |
| RES.FU:64  |   CHAR  | 20    User field 64    |     |
| RES.FU:65  |   CHAR  | 40    User field 65    |     |
| RES.FU:66  |   CHAR  | 40    User field 66    |     |
| RES.BEM:1  |   CHAR  | 60    Comment field 1  |     |
| RES.BEM:2  |   CHAR  | 60    Comment field 2  |     |
| RES.BEM:3  |   CHAR  | 60    Comment field 3  |     |
| RES.BEM:4  |   CHAR  | 60    Comment field 4  |     |
| RES.BEM:5  |   CHAR  | 60    Comment field 5  |     |
| RES.BEM:6  |   CHAR  | 60    Comment field 6  |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 22 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

7  Production Variants/Methods

Available methods
| Method          | Usage                               |     |     |
| --------------- | ----------------------------------- | --- | --- |
| FERTVAR.INSERT  | Create a production variant/method  |     |     |
| FERTVAR.UPDATE  | Change a production variant/method  |     |     |
| FERTVAR.DELETE  | Delete a production variant/method  |     |     |

Data
| Column  | Description  |     |     |
| ------- | ------------ | --- | --- |
| Field   | Field name   |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
| T(ype)    | Data type  of the field  |     |     |
| --------- | ------------------------ | --- | --- |
| L(ength)  | Field length             |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Description and/or comment of the field  |     |     |
| ------------ | ---------------------------------------- | --- | --- |

| Field            | V  T     | L  D  Description          |     |
| ---------------- | -------- | -------------------------- | --- |
| FERTVAR.VER      | S  CHAR  | 10    Version              |     |
| FERTVAR.ATK      | S  CHAR  | 40    Article              |     |
| FERTVAR.ATK:BEZ  |   CHAR   | 40    Article name         |     |
| FERTVAR.MNR      | S  CHAR  | 8    Workplace             |     |
| FERTVAR.MGRP     | S  CHAR  | 8    Group                 |     |
| FERTVAR.FIR:ATK  | S  CHAR  | 10    Company for article  |     |
| FERTVAR.RESTYP   |   CHAR   | 8    Resource type         |     |
| FERTVAR.WANZ     |   NUMC   | 9    Number of resources   |     |
| FERTVAR.RES      |   CHAR   | 20    Resource             |     |
| FERTVAR.PRIO     |   NUMC   | 9    Priority              |     |
FERTVAR.SZY    NUMC  9    Target cycle (in seconds/1000 cycles)
| FERTVAR.SZY:ABW  |   DEC   | 5  2  Admissible deviation    |     |
| ---------------- | ------- | ----------------------------- | --- |
| FERTVAR.TLG      |   NUMC  | 9    Partitioning             |     |
| FERTVAR.RUEZ     |   NUMC  | 9    Setup time               |     |
| FERTVAR.ABRZ     |   NUMC  | 9    Teardown/retooling time  |     |
| FERTVAR.DATB     |   DATE  |     Valid from                |     |
| FERTVAR.DATE     |   DATE  |     Valid until               |     |
| FERTVAR.STA      |   CHAR  | 1    Status                   |     |
"F"  Released
"S"  Blocked
| FERTVAR.GRTXTNR  |   NUMC  | 4    Blocking reason  |     |
| ---------------- | ------- | --------------------- | --- |
| FERTVAR.BEM      |   CHAR  | 40    Comment         |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 23 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field           | V  T    | L  D  Description     |     |
| --------------- | ------- | --------------------- | --- |
| FERTVAR.USRFLD  |   CHAR  | 8    User field key   |     |
| FERTVAR.FU:1    |   DATE  | 10    User field 1    |     |
| FERTVAR.FU:2    |   DATE  | 10    User field 2    |     |
| FERTVAR.FU:3    |   DATE  | 10    User field 3    |     |
| FERTVAR.FU:4    |   DATE  | 10    User field 4    |     |
| FERTVAR.FU:5    |   DATE  | 10    User field 5    |     |
| FERTVAR.FU:6    |   DATE  | 10    User field 6    |     |
| FERTVAR.FU:7    |   NUM   | 8    User field 7     |     |
| FERTVAR.FU:8    |   NUM   | 8    User field 8     |     |
| FERTVAR.FU:9    |   NUM   | 8    User field 9     |     |
| FERTVAR.FU:10   |   NUM   | 8    User field 10    |     |
| FERTVAR.FU:11   |   NUM   | 8    User field 11    |     |
| FERTVAR.FU:12   |   NUM   | 8    User field 12    |     |
| FERTVAR.FU:13   |   NUM   | 8    User field 13    |     |
| FERTVAR.FU:14   |   NUM   | 8    User field 14    |     |
| FERTVAR.FU:15   |   NUM   | 8    User field 15    |     |
| FERTVAR.FU:16   |   NUM   | 8    User field 16    |     |
| FERTVAR.FU:17   |   NUM   | 8    User field 17    |     |
| FERTVAR.FU:18   |   NUM   | 8    User field 18    |     |
| FERTVAR.FU:19   |   NUM   | 8    User field 19    |     |
| FERTVAR.FU:20   |   NUM   | 8    User field 20    |     |
| FERTVAR.FU:21   |   NUM   | 8    User field 21    |     |
| FERTVAR.FU:22   |   NUM   | 8    User field 22    |     |
| FERTVAR.FU:23   |   DEC   | 13  3  User field 23  |     |
| FERTVAR.FU:24   |   DEC   | 13  3  User field 24  |     |
| FERTVAR.FU:25   |   DEC   | 13  3  User field 25  |     |
| FERTVAR.FU:26   |   DEC   | 13  3  User field 26  |     |
| FERTVAR.FU:27   |   DEC   | 13  3  User field 27  |     |
| FERTVAR.FU:28   |   DEC   | 13  3  User field 28  |     |
| FERTVAR.FU:29   |   CHAR  | 1    User field 29    |     |
| FERTVAR.FU:30   |   CHAR  | 1    User field 30    |     |
| FERTVAR.FU:31   |   CHAR  | 1    User field 31    |     |
| FERTVAR.FU:32   |   CHAR  | 1    User field 32    |     |
| FERTVAR.FU:33   |   CHAR  | 1    User field 33    |     |
| FERTVAR.FU:34   |   CHAR  | 1    User field 34    |     |
| FERTVAR.FU:35   |   CHAR  | 1    User field 35    |     |
| FERTVAR.FU:36   |   CHAR  | 1    User field 36    |     |
| FERTVAR.FU:37   |   CHAR  | 1    User field 37    |     |
| FERTVAR.FU:38   |   CHAR  | 1    User field 38    |     |
| FERTVAR.FU:39   |   CHAR  | 1    User field 39    |     |
| FERTVAR.FU:40   |   CHAR  | 1    User field 40    |     |
| FERTVAR.FU:41   |   CHAR  | 1    User field 41    |     |
| FERTVAR.FU:42   |   CHAR  | 1    User field 42    |     |
| FERTVAR.FU:43   |   CHAR  | 1    User field 43    |     |
| FERTVAR.FU:44   |   CHAR  | 1    User field 44    |     |
| FERTVAR.FU:45   |   CHAR  | 10    User field 45   |     |
| FERTVAR.FU:46   |   CHAR  | 10    User field 46   |     |
| FERTVAR.FU:47   |   CHAR  | 10    User field 47   |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 24 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field          | V  T    | L  D  Description    |     |
| -------------- | ------- | -------------------- | --- |
| FERTVAR.FU:48  |   CHAR  | 10    User field 48  |     |
| FERTVAR.FU:49  |   CHAR  | 10    User field 49  |     |
| FERTVAR.FU:50  |   CHAR  | 10    User field 50  |     |
| FERTVAR.FU:51  |   CHAR  | 20    User field 51  |     |
| FERTVAR.FU:52  |   CHAR  | 20    User field 52  |     |
| FERTVAR.FU:53  |   CHAR  | 20    User field 53  |     |
| FERTVAR.FU:54  |   CHAR  | 20    User field 54  |     |
| FERTVAR.FU:55  |   CHAR  | 20    User field 55  |     |
| FERTVAR.FU:56  |   CHAR  | 20    User field 56  |     |
| FERTVAR.FU:57  |   CHAR  | 20    User field 57  |     |
| FERTVAR.FU:58  |   CHAR  | 20    User field 58  |     |
| FERTVAR.FU:59  |   CHAR  | 20    User field 59  |     |
| FERTVAR.FU:60  |   CHAR  | 20    User field 60  |     |
| FERTVAR.FU:61  |   CHAR  | 20    User field 61  |     |
| FERTVAR.FU:62  |   CHAR  | 20    User field 62  |     |
| FERTVAR.FU:63  |   CHAR  | 20    User field 63  |     |
| FERTVAR.FU:64  |   CHAR  | 20    User field 64  |     |
| FERTVAR.FU:65  |   CHAR  | 40    User field 65  |     |
| FERTVAR.FU:66  |   CHAR  | 40    User field 66  |     |

Information on key fields:
The fields "group" (FERTVAR.MGRP) and "workplace" (FERTVAR.MNR) can be entered separately or
together. But one of the two values must be entered in any case.

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 25 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

8  Machines / Workplaces

Available methods
| Method      | Usage                     |     |     |
| ----------- | ------------------------- | --- | --- |
| MNR.INSERT  | Create machine/workplace  |     |     |
| MNR.UPDATE  | Change machine/workplace  |     |     |
| MNR.DELETE  | Delete machine/workplace  |     |     |

Data
| Column  | Description  |     |     |
| ------- | ------------ | --- | --- |
| Field   | Field name   |     |     |
V (usage)  S   Key field clearly identifying the data record. (Further key fields might be required). The field
must be completed.
M  Mandatory field
| T(ype)    | Data type  of the field  |     |     |
| --------- | ------------------------ | --- | --- |
| L(ength)  | Field length             |     |     |
For fields of data type DEC: Overall number of digits without decimal separator and algebraic sign
D(ecimal places)  For fields of data type DEC: Number of decimal places; otherwise: not relevant
| Description  | Description and/or comment of the field  |     |     |
| ------------ | ---------------------------------------- | --- | --- |

| Field      | V  T     | L  D  Description          |     |
| ---------- | -------- | -------------------------- | --- |
| BEARB      | M  CHAR  | 10    HYDRA User           |     |
| MNR.MNR    | S  CHAR  | 8    Machine/workplace     |     |
| MNR.BEZK   |   CHAR   | 8    Short name            |     |
| MNR.BEZL   |   CHAR   | 40    Name                 |     |
| MNR.VAB    |   CHAR   | 15    Responsibility area  |     |
| MNR.KST    |   CHAR   | 10    Cost center          |     |
MNR.TYP    CHAR  1    Workplace category (see possible values displayed in the GUI)
| MNR.SPERR  |   CHAR  | 1    ID "blocked"  |     |
| ---------- | ------- | ------------------ | --- |
"J“  yes
"N“  no
MNR.ART    CHAR  1    Workplace type (see possible values displayed in the GUI)
| MNR.OPT:FREMDAPZ  |   CHAR  | 1    ID "external workplace"  |     |
| ----------------- | ------- | ----------------------------- | --- |
"J“  yes
"N“  no
| MNR.FIR       |   CHAR  | 4    Company                 |     |
| ------------- | ------- | ---------------------------- | --- |
| MNR.MGRP      |   CHAR  | 8    Group                   |     |
| MNR.CAT       |   CHAR  | 10    Category               |     |
| MNR.BDEJMOD   |   NUMC  | 3    Year model              |     |
| MNR.MSTDSATZ  |   DEC   | 6  2  Standard rate machine  |     |
| MNR.PSTDSATZ  |   DEC   | 6  2  Standard labor rate    |     |
| MNR.LEIGRAD   |   NUMC  | 3    Performance level       |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 26 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field  | V  T  | L  D  Description  |     |
| ------ | ----- | ------------------ | --- |
MNR.AKKORD    CHAR  1    Incentive wage indicator (see possible values displayed in the
GUI)
| MNR.ICON  |   CHAR  | 20    File name  |     |
| --------- | ------- | ---------------- | --- |
MNR.OPT:MULTIAG    CHAR  1    Logon of multiple OPs (see possible values displayed in the GUI)
MNR.OPT:VLISTMOD    CHAR  1    Sequencing list (see possible values displayed in the GUI)
| MNR.VLISTANZ  |   NUMC  | 3    Number of OPs in sequencing list  |     |
| ------------- | ------- | -------------------------------------- | --- |
MNR.OPT:VLISTZW    CHAR  1    Compulsory sequence (see possible values displayed in the GUI)
| MNR.VISLIST3  |   CHAR  | 10    Display 3rd list   |     |
| ------------- | ------- | ------------------------ | --- |
The field includes none, one or several of these options. They are
separated by semicolon:

“M”  Input material
“R”  Resources
“P“  Staff
"A“  Output material

Example:
"M;R;P;A" if all options are set
MNR.VISFHMTNRAAN    CHAR  1    Material/PRT list when logging on OPs (see possible values
displayed in the GUI)
| MNR.DLGSTRG  |   CHAR  | 10    Dialog control  |     |
| ------------ | ------- | --------------------- | --- |
MNR.OPT:MAABP    CHAR  1    Quantity posting to staff (see possible values displayed in the
GUI)
MNR.OPT:AGIST    CHAR  1    ID "Posting on OPs not logged on"
"J“  yes
"N“  no
MNR.OPT:ANTDAUER    CHAR  1    Posting of machine time for simultaneous OPs (see possible
values displayed in the GUI)
MNR.OPT:AANSKBAUTO    CHAR  1    Log OP on automatically when shift ends (see possible values
displayed in the GUI)
MNR.OPT:PABSKE    CHAR  1    Log person off automatically when shift ends (see possible values
displayed in the GUI)
MNR.PLANFKT    CHAR  1    Planning function (see possible values displayed in the GUI)
| MNR.PLANJMOD  |   NUMC  | 3    Planned year model      |     |
| ------------- | ------- | ---------------------------- | --- |
| MNR.KAPJMOD   |   NUMC  | 5    Availability (per mil)  |     |
MNR.OPT:CHV    CHAR  1    Batch management (see possible values displayed in the GUI)
| MNR.MATPUF:IN   |   CHAR  | 12    Preceding material buffer   |     |
| --------------- | ------- | --------------------------------- | --- |
| MNR.MATPUF:OUT  |   CHAR  | 12    Subsequent material buffer  |     |
MNR.OPT:CNRAUTOGEN    CHAR  1    Automatic generation of batch number (see possible values
displayed in the GUI)
| MNR.VISVERBRBLZ  |   CHAR  | 1    ID "Consumption balance"  |     |
| ---------------- | ------- | ------------------------------ | --- |
"J“  yes
"N“  no
MNR.OPT:TRANROUT    CHAR  1    ID "Generate transport order for output material"
"J“  yes
"N“  no
MNR.OPT:TRANRIN    CHAR  1    ID "Generate transport order for input material"
"J“  yes
"N“  no
| MNR.VERB:GUT  |   CHAR  | 3    Allocation of yield  |     |
| ------------- | ------- | ------------------------- | --- |
"AUS“  Scrap
"NCH“  Rework
"PRB“  Open quantity

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 27 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field         | V  T    | L  D  Description         |     |
| ------------- | ------- | ------------------------- | --- |
| MNR.VERB:AUS  |   CHAR  | 3    Allocation of scrap  |     |
"GUT“  Yield
"NCH“  Rework
"PRB“  Open quantity
| MNR.VERB:NCH  |   CHAR  | 3    Allocation of rework  |     |
| ------------- | ------- | -------------------------- | --- |
"GUT“  Yield
"AUS“  Scrap
"PRB“  Open quantity
| MNR.VERB:PRB  |   CHAR  | 3    Allocation of open quantity  |     |
| ------------- | ------- | --------------------------------- | --- |
"GUT“  Yield
"AUS“  Scrap
"NCH“  Rework
| MNR.OPT:GUTMANU  |   CHAR  | 1    ID "Manual entry of yield"  |     |
| ---------------- | ------- | -------------------------------- | --- |
"J“  yes
"N“  no
| MNR.OPT:AUSMANU  |   CHAR  | 1    ID "Manual entry of scrap"  |     |
| ---------------- | ------- | -------------------------------- | --- |
"J“  yes
"N“  no
MNR.OPT:NCHMANU    CHAR  1    ID "Manual entry of rework quantity"
"J“  yes
"N“  no
MNR.OPT:PRBMANU    CHAR  1    ID "Manual entry of open quantity"
"J“  yes
"N“  no
MNR.OPT:GUTMANUTAKT    CHAR  1    ID "Posting of yield as cycles"
"J“  yes
"N“  no
MNR.OPT:AUSMANUTAKT    CHAR  1    ID "Posting of scrap as cycles"
"J“  yes
"N“  no
MNR.OPT:NCHMANUTAKT    CHAR  1    ID "Posting of rework as cycles"
"J“  yes
"N“  no
MNR.OPT:PRBMANUTAKT    CHAR  1    ID "Posting of open quantity as cycles"
"J“  yes
"N“  no
MNR.OPT:UMRMENGE    CHAR  1    Basis for MDE quantity conversion (see possible values displayed
in the GUI)
| MNR.EGE:GUTP  |   CHAR  | 3    Quantity unit (P)  |     |
| ------------- | ------- | ----------------------- | --- |
MNR.UMRFAKTP:Z    NUMC  9    Quantity unit (P) - numerator, primary quantity
MNR.UMRFAKTP:N    NUMC  9    Quantity unit (P) - denominator, primary quantity
| MNR.EGE:GUTS  |   CHAR  | 3    Quantity unit (S)  |     |
| ------------- | ------- | ----------------------- | --- |
MNR.UMRFAKTS:Z    NUMC  9    Quantity unit (S) - numerator, primary quantity
MNR.UMRFAKTS:N    NUMC  9    Quantity unit (S) - denominator, primary quantity
| MNR.EGE:GUTT  |   CHAR  | 3    Quantity unit (T)  |     |
| ------------- | ------- | ----------------------- | --- |
MNR.UMRFAKTT:Z    NUMC  9    Quantity unit (T) - numerator, primary quantity
MNR.UMRFAKTT:N    NUMC  9    Quantity unit (T) - denominator, primary quantity
| MNR.EGE:GUTB  |   CHAR  | 3    Quantity unit (B)  |     |
| ------------- | ------- | ----------------------- | --- |
| MNR.UEBART    |   CHAR  | 1    Monitoring type    |     |
“Z”  Cyclic monitoring
"B”  Operating signal
"K“  No monitoring
MNR.UEBDAUER    NUMC  3    Minimum cycle/malfunction time (seconds)

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 28 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field         | V  T    | L  D  Description             |     |
| ------------- | ------- | ----------------------------- | --- |
| MNR.IZYABW    |   NUMC  | 4    Cycle extension          |     |
| MNR.ANZSTAKT  |   NUMC  | 4    Number of target cycles  |     |
| MNR.MWANZ     |   NUMC  | 1    Cycles to be evaluated   |     |
MNR.OPT:MSTAUAUF    CHAR  1    ID "Activation of required malfunction reason input"
"J“  yes
"N“  no
| MNR.OPT:MSTAUDAUER  |   NUMC  | 4    Delay time (seconds)       |     |
| ------------------- | ------- | ------------------------------- | --- |
| MNR.BUCHPSPERRE     |   CHAR  | 1    Posting during prod. lock  |     |
"G"  Posting as yield
"A”  Posting as scrap
"X”  No posting
| MNR.IMPFAKT  |   NUMC  | 3    Pulse factor specific to machines  |     |
| ------------ | ------- | --------------------------------------- | --- |
| MNR.TLG      |   NUMC  | 5    Partitioning specific to machines  |     |
MNR.STKZG    NUMC  4    Waiting period short-term malfunction (seconds)
MNR.OPT:WENDAUTO    CHAR  1    ID "Extended weekend automatic"
"J“  yes
"N“  no
| MNR.DIGOUT:MSPERRE  |   NUMC  | 2    Output "machine lock"  |     |
| ------------------- | ------- | --------------------------- | --- |
MNR.DIGOUT:SMENGE    NUMC  2    Output "target quantity reached"
| MNR.DIGOUT:STOER  |   NUMC  | 2    Output "machine down"      |     |
| ----------------- | ------- | ------------------------------- | --- |
| MNR.DIGIO         |   NUMC  | 2    Free I/O                   |     |
| MNR.DIGIN:CAWL    |   NUMC  | 2    Output batch change        |     |
| MNR.OPT:PDV       |   CHAR  | 1    ID "Collect process data"  |     |
"J“  yes
"N“  no
| MNR.EXTTYP  |   CHAR  | 1    External connection  |     |
| ----------- | ------- | ------------------------- | --- |
"K”  No external connection
"J”  DS100
"N“  MT3
"E“  Engel interfacing
"A“  Arburg control system
"P"  PDE (Process Data Collection)
| MNR.EXTSNR  |   NUMC  | 8    Serial number   |     |
| ----------- | ------- | -------------------- | --- |
| MNR.EXTID   |   NUCM  | 2    Device address  |     |
| MNR.USRFLD  |   CHAR  | 8    User field key  |     |
| MNR.FU:1    |   DATE  | 10    User field 1   |     |
| MNR.FU:2    |   DATE  | 10    User field 2   |     |
| MNR.FU:3    |   DATE  | 10    User field 3   |     |
| MNR.FU:4    |   DATE  | 10    User field 4   |     |
| MNR.FU:5    |   DATE  | 10    User field 5   |     |
| MNR.FU:6    |   DATE  | 10    User field 6   |     |
| MNR.FU:7    |   NUM   | 8    User field 7    |     |
| MNR.FU:8    |   NUM   | 8    User field 8    |     |
| MNR.FU:9    |   NUM   | 8    User field 9    |     |
| MNR.FU:10   |   NUM   | 8    User field 10   |     |
| MNR.FU:11   |   NUM   | 8    User field 11   |     |
| MNR.FU:12   |   NUM   | 8    User field 12   |     |
| MNR.FU:13   |   NUM   | 8    User field 13   |     |
| MNR.FU:14   |   NUM   | 8    User field 14   |     |
| MNR.FU:15   |   NUM   | 8    User field 15   |     |
| MNR.FU:16   |   NUM   | 8    User field 16   |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 29 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field      | V  T    | L  D  Description     |     |
| ---------- | ------- | --------------------- | --- |
| MNR.FU:17  |   NUM   | 8    User field 17    |     |
| MNR.FU:18  |   NUM   | 8    User field 18    |     |
| MNR.FU:19  |   NUM   | 8    User field 19    |     |
| MNR.FU:20  |   NUM   | 8    User field 20    |     |
| MNR.FU:21  |   NUM   | 8    User field 21    |     |
| MNR.FU:22  |   NUM   | 8    User field 22    |     |
| MNR.FU:23  |   DEC   | 13  3  User field 23  |     |
| MNR.FU:24  |   DEC   | 13  3  User field 24  |     |
| MNR.FU:25  |   DEC   | 13  3  User field 25  |     |
| MNR.FU:26  |   DEC   | 13  3  User field 26  |     |
| MNR.FU:27  |   DEC   | 13  3  User field 27  |     |
| MNR.FU:28  |   DEC   | 13  3  User field 28  |     |
| MNR.FU:29  |   CHAR  | 1    User field 29    |     |
| MNR.FU:30  |   CHAR  | 1    User field 30    |     |
| MNR.FU:31  |   CHAR  | 1    User field 31    |     |
| MNR.FU:32  |   CHAR  | 1    User field 32    |     |
| MNR.FU:33  |   CHAR  | 1    User field 33    |     |
| MNR.FU:34  |   CHAR  | 1    User field 34    |     |
| MNR.FU:35  |   CHAR  | 1    User field 35    |     |
| MNR.FU:36  |   CHAR  | 1    User field 36    |     |
| MNR.FU:37  |   CHAR  | 1    User field 37    |     |
| MNR.FU:38  |   CHAR  | 1    User field 38    |     |
| MNR.FU:39  |   CHAR  | 1    User field 39    |     |
| MNR.FU:40  |   CHAR  | 1    User field 40    |     |
| MNR.FU:41  |   CHAR  | 1    User field 41    |     |
| MNR.FU:42  |   CHAR  | 1    User field 42    |     |
| MNR.FU:43  |   CHAR  | 1    User field 43    |     |
| MNR.FU:44  |   CHAR  | 1    User field 44    |     |
| MNR.FU:45  |   CHAR  | 10    User field 45   |     |
| MNR.FU:46  |   CHAR  | 10    User field 46   |     |
| MNR.FU:47  |   CHAR  | 10    User field 47   |     |
| MNR.FU:48  |   CHAR  | 10    User field 48   |     |
| MNR.FU:49  |   CHAR  | 10    User field 49   |     |
| MNR.FU:50  |   CHAR  | 10    User field 50   |     |
| MNR.FU:51  |   CHAR  | 20    User field 51   |     |
| MNR.FU:52  |   CHAR  | 20    User field 52   |     |
| MNR.FU:53  |   CHAR  | 20    User field 53   |     |
| MNR.FU:54  |   CHAR  | 20    User field 54   |     |
| MNR.FU:55  |   CHAR  | 20    User field 55   |     |
| MNR.FU:56  |   CHAR  | 20    User field 56   |     |
| MNR.FU:57  |   CHAR  | 20    User field 57   |     |
| MNR.FU:58  |   CHAR  | 20    User field 58   |     |
| MNR.FU:59  |   CHAR  | 20    User field 59   |     |
| MNR.FU:60  |   CHAR  | 20    User field 60   |     |
| MNR.FU:61  |   CHAR  | 20    User field 61   |     |
| MNR.FU:62  |   CHAR  | 20    User field 62   |     |
| MNR.FU:63  |   CHAR  | 20    User field 63   |     |
| MNR.FU:64  |   CHAR  | 20    User field 64   |     |

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 30 of 32  |
| ---------------- | --- | ------------------- | -------------- |

    Master Data Transfer from Third-Party Systems

| Field      | V  T    | L  D  Description    |     |
| ---------- | ------- | -------------------- | --- |
| MNR.FU:65  |   CHAR  | 40    User field 65  |     |
| MNR.FU:66  |   CHAR  | 40    User field 66  |     |

The resource BAPI (RES.UPDATE) must be used to edit general information of the machine
configuration, e.g. inventory no. engraving no., drawing no., manufacturer, owner, acquisition

costs, supplier information and responsibilities.

| EIS-SDF_82.docx  |     | Version: 1.0.23049  | Page 31 of 32  |
| ---------------- | --- | ------------------- | -------------- |

Master Data Transfer from Third-Party Systems
9 Sample Files
Overview
Attached to this documentation, you will find test files for the interface EIS-SDF. The attachment is only
available, if the documentation is in PDF format.
The documentation Opening attachments of a PDF document describes how to call the attached test
files.
The following test files are attached to the PDF document:
File Comment
machine_master_data.xlsx Example that demonstrates how master data is transferred for
workplaces.
WRM_productionvariants_resources.xls Example that demonstrates how master data is transferred for
production variants and resources.
EIS-SDF_82.docx Version: 1.0.23049 Page 32 of 32