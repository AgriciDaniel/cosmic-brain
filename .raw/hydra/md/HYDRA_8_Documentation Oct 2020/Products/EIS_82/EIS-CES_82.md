Manual
HYDRA-CAQ Interface to ERP
Systems
EIS-CES 8.2
Version 1.0.23049
Last changed on: 01.09.2020

HYDRA-CAQ Interface to ERP Systems
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EIS-CES_82.docx Version: 1.0.23049 Page 2 of 123

HYDRA-CAQ Interface to ERP Systems
Contents
1 Overview Interface HYDRA-CAQ to ERP Systems ..................................... 5
2 Transfer and Upload of Quality Management Data ..................................... 6
2.1 Overview ............................................................................................................. 6
2.2 Technical system requirements for communication ............................................. 6
2.3 Logical connection between the systems ............................................................ 6
3 Data transfer from the external system ........................................................ 8
3.1 Description of the interface .................................................................................. 8
3.1.1 Conventions used to present the various data types................................ 9
3.1.2 Conventions used to present mandatory fields ...................................... 10
3.1.3 Calling the interface program ................................................................. 11
3.2 Description of the data structures ...................................................................... 12
3.2.1 Data structures for multi-language / MDBI systems ............................... 12
3.2.2 Article catalog ........................................................................................ 13
3.2.3 Company catalogs ................................................................................. 15
3.2.4 Inspection station catalog ...................................................................... 17
3.2.5 Failure analysis catalog ......................................................................... 18
3.2.6 Measures catalog .................................................................................. 19
3.2.7 Analysis selection catalog...................................................................... 21
3.2.8 Entries from analysis selection catalogs ................................................ 21
3.2.9 Characteristics catalog .......................................................................... 22
3.2.10 Specification list ..................................................................................... 38
3.2.11 Inspection plans .................................................................................... 49
3.2.12 Inspection plan characteristics ............................................................... 63
3.2.13 Documents of inspection plans/inspection plan characteristics .............. 86
3.2.14 Inspection requirements ........................................................................ 88
3.2.15 Inspection points ................................................................................... 94
3.2.16 Measured values/inspection results ..................................................... 102
3.2.17 Complaint header data ........................................................................ 110
3.2.18 Complaint details ................................................................................. 113
4 Uploads to the external system ................................................................ 118
4.1 Description of the interface .............................................................................. 118
EIS-CES_82.docx Version: 1.0.23049 Page 3 of 123

HYDRA-CAQ Interface to ERP Systems
4.1.1 Data record structure ........................................................................... 118
4.1.2 Conventions used to present the various data types............................ 118
4.1.3 Calling the interface function for uploads ............................................. 119
4.1.4 Processing uploaded files .................................................................... 120
4.2 Description of the data structures .................................................................... 120
4.2.1 Inspection requirement results ............................................................. 120
EIS-CES_82.docx Version: 1.0.23049 Page 4 of 123

HYDRA-CAQ Interface to ERP Systems
1 Overview Interface HYDRA-CAQ to ERP Systems
Purpose
This component allows data to be exchanged between the ERP system and HYDRA. The primary focus
is on the data transfer from ERP to HYDRA.
Implementation considerations
Use of this component is recommended if quite a bit of data are needed in HYDRA that are input into the
server. This relates especially to goods receipt, because the benefit of this component is that there is no
need to manually generate goods receipt inspections.
Integration
The element is primarily used to control the components.
 Inspection planning for in-production inspections
 Inspection planning for goods receipt inspections, and
 Entry/ collection/ analysis of returns.
Features
The following functions are available:
 Creates new or regularly updates almost any master data such as the articles, for example
 Automatically generates goods receipt inspections
 Uploads the usage decision for an inspection requirement, e.g. the decision to perform a goods
receipt inspection.
EIS-CES_82.docx Version: 1.0.23049 Page 5 of 123

|     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | ----------------------------------- | --- |

2  Transfer and Upload of Quality Management Data

| 2.1  | Overview  |     |     |     |
| ---- | --------- | --- | --- | --- |
This document describes how data is exchanged on a logical level between HYDRA Quality Management
applications and an external system and which system components are required to do so.
| 2.2  | Technical system requirements for communication  |     |     |     |
| ---- | ------------------------------------------------ | --- | --- | --- |
Data transfer and data processing is designed so that any external system can connect to the HYDRA
server that can perform file transfer. Here, the physical connection between the host computer and the
HYDRA server is not relevant.
To  realize  an  automatic  connection  between  the  HYDRA  sever  and  the  host  computer,  MPDV
recommends to use a gateway  with the relevant control software. This gateway controls the  data
exchange between the two systems in both directions. But of course you can also use any other method
that guarantees a secure file transfer, especially the connection of both systems using a "network file
system".
| 2.3  | Logical connection between the systems  |     |     |     |
| ---- | --------------------------------------- | --- | --- | --- |
All data is exchanged via file transfer using the physical system interface between the two systems. It
then depends on the required response times and the physical connection between both systems how
often the file transfer is performed.
All HYDRA postings to the host and vice versa are stored in transfer files in UTF-8 format (without BOM)
and then transferred via file transfer.
This document describes the following transfer data:
|                             | Data class  | Transfer direction  | Input file  | Output file  |
| --------------------------- | ----------- | ------------------- | ----------- | ------------ |
| Article catalog             |             | External system    | as per      | -            |
|                             |             | HYDRA               | parameters  |              |
| Company catalog             |             | External system    | as per      | -            |
|                             |             | HYDRA               | parameters  |              |
| Inspection station catalog  |             | External system    | as per      | -            |
|                             |             | HYDRA               | parameters  |              |
External system 
| Failure analysis catalog  |     |                    | as per      | -   |
| ------------------------- | --- | ------------------ | ----------- | --- |
|                           |     | HYDRA              | parameters  |     |
| Measures catalog          |     | External system   | as per      | -   |
|                           |     | HYDRA              | parameters  |     |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     | Page 6 of 123  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | ----------------------------------- | --- |

| Analysis selection catalog  |     | External system   | as per      | -   |
| --------------------------- | --- | ------------------ | ----------- | --- |
|                             |     | HYDRA              | parameters  |     |
Entries from analysis selection catalogs  External system   as per  -
|                   |     | HYDRA              | parameters  |     |
| ----------------- | --- | ------------------ | ----------- | --- |
| Inspection plans  |     | External system   | as per      | -   |
|                   |     | HYDRA              | parameters  |     |
Inspection plan characteristics  External system   as per  -
|     |     | HYDRA  | parameters  |     |
| --- | --- | ------ | ----------- | --- |
External system 
| Inspection plan/ inspection plan  |     |        | as per      | -   |
| --------------------------------- | --- | ------ | ----------- | --- |
| characteristics documents         |     | HYDRA  | parameters  |     |
External system 
| Specification list                |     |                    | as per        | -   |
| --------------------------------- | --- | ------------------ | ------------- | --- |
|                                   |     | HYDRA              | parameters    |     |
| Inspection requirements           |     | External system   | as per        | -   |
|                                   |     | HYDRA              | parameters    |     |
| Complaint header data             |     | External system   | as per        | -   |
|                                   |     | HYDRA              | parameters    |     |
| Detailed complaints data          |     | External system   | as per        | -   |
|                                   |     | HYDRA              | parameters    |     |
|                                   |     | HYDRA  external   | pavrueck.asc  |     |
| Uploading inspection requirement  |     |                    | -             |     |
| results                           |     | system             |               |     |

The postings or records are stored on the individual systems in different files ("input and output file") so
that they can be processed by separate programs. On the host computer, the files are either processed
as a batch or with the help of an online transaction. The file processing itself is performed in the systems.
For the data transferred to HYDRA, the system creates log and error files.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     | Page 7 of 123  |
| ---------------- | --- | ------------------- | --- | -------------- |

HYDRA-CAQ Interface to ERP Systems
3 Data transfer from the external system
3.1 Description of the interface
This interface is realized using a new technology for universal interfaces. Using this technology, a
separate command (so-called "dialogs") is listed in the interface file for each line to import the required
data. The interface program processes these dialogs sequentially and writes a log file of the results.
Each line of the interface file contains a dialog including all relevant data. The most important
components are the dialog ID and the parameters belonging to the dialog.
Example of a dialog (one line of an interface file):
DLG=CPAN.DELETE|CPAN.RECTYP=FEP|CPAN.BER=F|CPAN.PPS:REF=A449|...
Explanation:
The dialog ID is CPAN.DELETE. Separated by vertical lines ("|", ASCII 124), the parameters (CPAN.BER,
CPAN.PPS:REF, ...) then follow. Select a field width for the different parameters that is wide enough for
the presentation. However a fixed file structure can also be realized by adding leading zeros (for
numbers) and trailing spaces.
The sequence of the parameters is irrelevant. Some parameters must be specified in a dialog and some
parameters are optional. You can specify the optional parameters, if required, or you can leave these
parameters out. HYDRA than populates these parameters using default values.
IMPORTANT! A dialog must end with a vertical line ("|", ASCII 124), otherwise what may happen is that
the last parameter is ignored.
Please note with regard to fields with data types "N,<n>" and "N<x>.<y>".
If these fields are not included, they are filled with zeros by default. If the fields should be empty, the field
must be transferred without content.
Example of a default assignment without content: ...|CMM.OTG=|...
EIS-CES_82.docx Version: 1.0.23049 Page 8 of 123

|     |     |     |     |   HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ------------------------------------- | --- |

| 3.1.1      | Conventions used to present the various data types  |     |     |           |     |
| ---------- | --------------------------------------------------- | --- | --- | --------- | --- |
| Data type  | Format                                              |     |     | Examples  |     |
N<n>
|     | Numbers,   | a  maximum  | of  <n>  | |CPAN.PANNR=345678| or  |     |
| --- | ---------- | ----------- | -------- | ----------------------- | --- |
|     | positions  |             |          | |CPAN.PANNR=  345678|   |     |
Comment:
The preset value is "0" if fields of this
type are not a part of the interface.
N<x>.<y>  Decimal number, a maximum of  |CPAN.CMENGE=30.5| or
|     | <x> positions before the comma.  |              |            | |CPAN.CMENGE=00030.5|  |     |
| --- | -------------------------------- | ------------ | ---------- | ---------------------- | --- |
|     | After                            | the  comma,  | only  <y>  |                        |     |
Comment:
positions are practical. The dot is
The preset value is "0.0" if fields of
the decimal separator.
this type are not a part of the
interface.
C<n>  Optional, the maximum length of  |CPAN.PANVON=Huber| or
Texts (characters)  <n> must be considered, though.  |CPAN.PANVON=Huber  |
Date  MM/DD/YYYY (American format)  |CPAN.PANDAT=12/31/2001|

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 9 of 123  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |   HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | ------------------------------------- | --- |

| Times or   | Seconds since 0:00   |     | |CPAN.PANZEI=52200|   |     |
| ---------- | -------------------- | --- | --------------------- | --- |
| durations  |   or                 |     |   or                  |     |

the following optional format,
|     | which is not supported with all  |     |     |     |
| --- | -------------------------------- | --- | --- | --- |

time parameters:
|     |                |     |                            |     |
| --- | -------------- | --- | -------------------------- | --- |
|     |   HH:MM or     |     | |CPAN.PANZEI=14:30| or     |     |
|     |   HH:MM:SS or  |     | |CPAN.PANZEI=14:30:00| or  |     |
  HH,DDD or
|CPAN.PANZEI=014,5| or
|     |   HH.DDD  |     | |CPAN.PANZEI=14.500|  |     |
| --- | --------- | --- | --------------------- | --- |
H  hours (as many places
  as required)
M  Minutes (in groups of 60)
S  Seconds
D  Industrial or decimal
  minutes (in groups of
100)
| " "    | Constant value                                |     | |CARTIKEL.SMARTDEL=1|  |     |
| ------ | --------------------------------------------- | --- | ---------------------- | --- |
| 3.1.2  | Conventions used to present mandatory fields  |     |                        |     |
The acronyms in column "Mandatory" specify the dialogs with mandatory fields:
| M   | for MODIFY                                 |     |     |     |
| --- | ------------------------------------------ | --- | --- | --- |
| I   | for INSERT                                 |     |     |     |
| U   | For UPDATE                                 |     |     |     |
| C   | for COPY                                   |     |     |     |
| D   | for DELETE                                 |     |     |     |
| K   | for IFCMARK (inspection plans)             |     |     |     |
| S   | for CANCEL (inspection requirements)       |     |     |     |
| A   | for ACTIVATE (inspection requirements) or  |     |     |     |
COMPLETING (inspection points)
| R   | for RELEASE (inspection points)                  |     |     |     |
| --- | ------------------------------------------------ | --- | --- | --- |
| F   | stands for "function" and means that this field  |     |     |     |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     | Page 10 of 123  |
| ---------------- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

|     | is  a  mandatory  | field  | with  MODIFY  | and  |     |
| --- | ----------------- | ------ | ------------- | ---- | --- |
INSERT if this function is used. The values
preassigned to these fields can be different
|     | when  data  | is  created  | via  interface  | or  |     |
| --- | ----------- | ------------ | --------------- | --- | --- |
manually.
| 3.1.3  | Calling the interface program  |     |     |     |     |
| ------ | ------------------------------ | --- | --- | --- | --- |
The interface program must be called from the HYDRA server. Processing is possible using the HYDRA
scheduler.
Any existing data may be transferred from the external system into HYDRA using the program and call
described below. As a general rule, this program must be called from the HYDRA server directory.
| Windows systems as of HYDRA MW 2.0:  |     |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- | --- |
  hymw.exe –u <UserNumber> -b <file name.ext>
| UNIX/AIX systems as of HYDRA MW 2.0:  |     |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- | --- |
  hymw.out –u <UserNumber> -b <file name.ext>

If you add the parameter -L, the file is deleted after processing.
Here, a unique numeric value must be selected as the <UserNumber>. If interfaces with the same
UserNumber  run  at  the  same  time,  they  will  interfere  with  each  other  and  supply  false  results.
Recommended are numbers ranging between 1 to 200.
Data is transferred from the specified file. Any errors that occur while processing this file will be stored in
the error log <Filename>.err in the err subdirectory of the HYDRA directory. This file includes the
record number and an error text relating to the erroneous record. The results of the processing can also
be evaluated on the MOC via the HYDRA system logs under the abbreviation <Filename> (without
extension). In addition, the system creates a log file (<FileName>.pro) of the action in the HYDRA
subdirectory prot.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 11 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
Example of a scheduler entry for the automatic generation of article data via interface
The entry ".\hydra\1\interface\articles.txt" is an example of how the path and the name of the interface file
is specified.
The scheduler entry must not include a product or license key entry.
3.2 Description of the data structures
3.2.1 Data structures for multi-language / MDBI systems
If the HYDRA system is operated with multiple language database content in addition to the “native”
default content, then each dialog line must contain the parameter
…|LANG=<x>|…
for the respective target language. <x> stands for the number of the target language. For example,
“German” language has the fixed language ID “1”, “English” is “2”, “Chinese” is “15”, etc.
If a data record/dialog shall be imported for the English database content in a multi-language system,
then each dialog/data record must contain the parameter ……|LANG=2|…… somewhere within the dialog
string. We recommend putting it at the very right end of each dialog string.
This requirement applies for all described data structures/dialogs in multi-language systems, and is not
explicitly mentioned in each sub-chapter!
EIS-CES_82.docx Version: 1.0.23049 Page 12 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| 3.2.2  | Article catalog  |     |     |     |     |
| ------ | ---------------- | --- | --- | --- | --- |
The following dialogs are available for updating article master data:
|   ARTIKEL.MODIFY   |     | to create or change article data  |     |     |     |
| ------------------- | --- | --------------------------------- | --- | --- | --- |
|   ARTIKEL.INSERT   |     | to create article data            |     |     |     |
|   ARTIKEL.UPDATE   |     | to change article data            |     |     |     |
|   ARTIKEL.DELETE   |     | to delete article data            |     |     |     |
The unique key for the article catalog is made up of a combination of the fields ARTIKEL.ATK and
ARTIKEL.ATKIDX.
If an article is already in use in HYDRA, it must not be deleted. For this reason, always pass the
parameter  ARTIKEL.SMARTDEL=1  when  you  delete  data.  This  ensures  that  the  archive  flag
(ARTIKEL.ARCHIV) is set if an article is used.
Please note for the group assignment or group generation
If you assign a group to an article, this group must have been created in HYDRA beforehand and the
group name/designation must have been specified. If the assigned group includes several hierarchy
levels, then a group with group name must exist for each combination of levels. The client shows the
group designation/name assigned to each combination in the respective tree structure level.
Example:  An  article  is  assigned  to  a  group  with  the  fields  "*.DSGRP.1",  "*.DSGRP.2"  and
"*.DSGRP.3". In this case, a group must first be created solely for DSGRP1. In addition, there will also
be the combinations "DSGRP1 + DSGRP2" and "DSGRP1 + DSGRP2 + DSGRP3".
Dialog: ARTIKEL.*
| Parameter  | Type  | Mand | Contents  | Description  |     |
| ---------- | ----- | ---- | --------- | ------------ | --- |
atory
| *.ATK  |     | M/I/U | Article number  |     |     |
| ------ | --- | ----- | --------------- | --- | --- |
C50
D
| *.ATKIDX  | C50  | M/I/U/ | Drawing issue number  |     |     |
| --------- | ---- | ------ | --------------------- | --- | --- |
D
*.DSGRPE  "0"  M/I  Fixed identification for  0 = Article, 1 = Article group
article data

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 13 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.DSGRP:1
C50    Article group 1  Only required if article groups are used.
| *.DSGRP:2  |        |                  |     | In the dialog data string, you must pass the  |     |
| ---------- | ------ | ---------------- | --- | --------------------------------------------- | --- |
|            | C50    | Article group 2  |     |                                               |     |
group ident number, which has been created
*.DSGRP:3  C50    Article group 3  previously, in this field. When an article group is
created, HYDRA automatically assigns this
*.DSGRP:4  C50    Article group 4  ident number and for this reason it is
recommended to assign the article groups via
*.DSGRP:5  C50    Article group 5  interface as well. You can then assign the
article group ident number yourself.
| *.ATKBEZ  | C250    | Article  |     |     |     |
| --------- | ------- | -------- | --- | --- | --- |
designation/name
| *.MOD  | C250    | Model        |     |     |     |
| ------ | ------- | ------------ | --- | --- | --- |
| *.ABC  | C250    | ABC article  |     |     |     |
*.CEINH  C50    Unit  of  measure  or  A respective measurement unit with this
|     |     | size  |     | identifier must already exist in HYDRA  |     |
| --- | --- | ----- | --- | --------------------------------------- | --- |
*.ZEICHNR
|     | C250    | Drawing number  |     |     |     |
| --- | ------- | --------------- | --- | --- | --- |
*.DOKPFL  Documentation  If the value "1" is transferred to this parameter,
|             | "0"  or  F  |           |          |                                      |     |
| ----------- | ----------- | --------- | -------- | ------------------------------------ | --- |
|             | "1"         | required  |          | the article requires documentation.  |     |
| *.ATK:KDNR  | C50         | Customer  | article  |                                      |     |
number
*.FU:1   to    Date    Direct user fields  These fields are only available if the license for
| *.FU:6  |     |     |     | "composition" is available or as of CAQ 8.2.  |     |
| ------- | --- | --- | --- | --------------------------------------------- | --- |
*.FU:7   to    N9    Direct user fields  These fields are only available if the license for
"composition" is available or as of CAQ 8.2.
*.FU:22
*.FU:23  to    N11.6    Direct user fields  These fields are only available if the license for
| *.FU:28  |     |     |     | "composition" is available or as of CAQ 8.2.  |     |
| -------- | --- | --- | --- | --------------------------------------------- | --- |
*.FU:29  to    C  1    Direct user fields  These fields are only available if the license for
"composition" is available or as of CAQ 8.2.
*.FU:44
*.FU:45  to    C10    Direct user fields  These fields are only available if the license for
| *.FU:50  |     |     |     | "composition" is available or as of CAQ 8.2.  |     |
| -------- | --- | --- | --- | --------------------------------------------- | --- |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 14 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.FU:51  to    C  20    Direct user fields  These fields are only available if the license for
| *.FU:64  |     |     |     |     | "composition" is available or as of CAQ 8.2.  |     |
| -------- | --- | --- | --- | --- | --------------------------------------------- | --- |
*.FU:65  to    C  40    Direct user fields  These fields are only available if the license for
"composition" is available or as of CAQ 8.2.
*.FU:66
*.ARCHIV
"0"  or  F  Archive flag  If the value "1" is transferred to this parameter,
|     | "1"  |     |     |     | the relevant data record is marked as archived.  |     |
| --- | ---- | --- | --- | --- | ------------------------------------------------ | --- |
This means this data record will not be
available in selection lists.
*.SMARTDEL
|     | „1“  | D   | Activate  | "smart"  |     |     |
| --- | ---- | --- | --------- | -------- | --- | --- |
delete.
| 3.2.3  | Company catalogs  |     |     |     |     |     |
| ------ | ----------------- | --- | --- | --- | --- | --- |
The following dialogs are available for updating company master data:
|   FIRMA.MODIFY  |     | to create or change company data  |     |     |     |     |
| ---------------- | --- | --------------------------------- | --- | --- | --- | --- |
|   FIRMA.INSERT  |     | to create company data            |     |     |     |     |
|   FIRMA.UPDATE  |     | to change company data            |     |     |     |     |
|   FIRMA.DELETE  |     | to delete company data            |     |     |     |     |
The unique key for the company catalog is made up of a combination of the fields FIRMA.FIRTYP and
FIRMA.FIRID.
If a company has already been used in HYDRA, it must not be deleted. This is why when deleting data,
you should also always transfer the parameter FIRMA.SMARTDEL=1. Doing so will set the archive flag
(FIRMA.ARCHIV) if an article is ever used.
Dialog: FIRMA.*
| Parameter  | Type  | Mand | Contents  | Description  |     |     |
| ---------- | ----- | ---- | --------- | ------------ | --- | --- |
atory
| *.FIRTYP  |     | M/I/U/ | Company type  | "INTERNAL"  |     |     |
| --------- | --- | ------ | ------------- | ----------- | --- | --- |
C50
"CUSTOMER",
D
"SUPPLIER" or
"MANUFACTURER"

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 15 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.FIRID
|     | C50  M/I/U/ | Company number  |     |     |     |
| --- | ----------- | --------------- | --- | --- | --- |
D
| *.DSGRPE  | "0"  M/I  | Fixed  identification  |     |     |     |
| --------- | --------- | ---------------------- | --- | --- | --- |
for company data
*.FIRBEZ
|     | C250    | Company name  |     |     |     |
| --- | ------- | ------------- | --- | --- | --- |
*.LAND
|     | C250    | Country  |     |     |     |
| --- | ------- | -------- | --- | --- | --- |
*.STAAT
|     | C250    | Federal  | state,    |     |     |
| --- | ------- | -------- | --------- | --- | --- |
country or similar
| *.PLZ       | C250    | Zip code  |     |     |     |
| ----------- | ------- | --------- | --- | --- | --- |
| *.ORT       | C250    | City      |     |     |     |
| *.POSTFACH  | C250    | P.O. box  |     |     |     |
*.ADRESSE:1  C250    Address  First line in the address area of forms
(usually the company name)
*.ADRESSE:2  C250    Address  Second line in the address area of forms.
*.ADRESSE:3  C250    Address  Third line in the address area of forms.
| *.TEL  | C250    | Phone number  |     |     |     |
| ------ | ------- | ------------- | --- | --- | --- |
| *.FAX  | C250    | Fax number    |     |     |     |
*.HANDY
|     | C250    | Mobile phone  |     |     |     |
| --- | ------- | ------------- | --- | --- | --- |
number
| *.PAGER       | C250     | Pager number     |            |     |     |
| ------------- | -------- | ---------------- | ---------- | --- | --- |
| *.EMAIL       | C250     | e-mail address   |            |     |     |
| *.WWW         | C250     | Website address  |            |     |     |
| *.AUDIT:WERT  | N12.4    | Percentage       | of  the    |     |     |
|               |          | last             | audit      |     |     |
classification
| *.AUDIT:EINST  | C50    | Last  | audit    |     |     |
| -------------- | ------ | ----- | -------- | --- | --- |
classification

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 16 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.AUDIT:DAT
|     |     | Date  |     | Date of the last audit  |     |     |     |
| --- | --- | ----- | --- | ----------------------- | --- | --- | --- |
classification
*.ARCHIV  "0"  or  F  Archive flag  If the value "1" is transferred to this
parameter, the relevant data record is
"1"
marked as archived. This means this data
record will not be available in selection lists.
| *.SMARTDEL  |     | „1“  | D   | Activate  | "smart"  |     |     |
| ----------- | --- | ---- | --- | --------- | -------- | --- | --- |
delete.
*.VERANT:COPY  "0"  or  F  use  as  party  in  If the value "1" is transferred to this
|     |     | "1"  |     | charge  |     | parameter, the corresponding company will  |     |
| --- | --- | ---- | --- | ------- | --- | ------------------------------------------ | --- |
be assumed in the list of responsible
parties.
| 3.2.4  | Inspection station catalog  |     |     |     |     |     |     |
| ------ | --------------------------- | --- | --- | --- | --- | --- | --- |
The following dialogs are available for updating inspection stations:
  CPPLATZ.MODIFY   to create or change inspection station data
  CPPLATZ.INSERT   to create or change inspection station data
  CPPLATZ.UPDATE   to create or change inspection station data
|   CPPLATZ.DELETE  |     |     | to delete inspection station data  |     |     |     |     |
| ------------------ | --- | --- | ---------------------------------- | --- | --- | --- | --- |
The  company  catalog's  unique  key  is  the  field  CPPLATZ.PPLATZ.
If an inspection station is already in use in HYDRA, it must not be deleted. This is why when deleting
data, you should also always transfer the parameter CPPLATZ.SMARTDEL=1. Doing so will set the
archive flag (CPPLATZ.ARCHIV) if an inspection station is ever used.
Dialog: CPPLATZ.*
| Parameter  |     | Type  Mand | Contents  |     | Description  |     |     |
| ---------- | --- | ---------- | --------- | --- | ------------ | --- | --- |
atory
| *.PPLATZ  |     | M/I/U/ | Inspection  |     | station    |     |     |
| --------- | --- | ------ | ----------- | --- | ---------- | --- | --- |
C50
number
D

| EIS-CES_82.docx  |     |     |     | Version: 1.0.23049  |     |     | Page 17 of 123  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.DSGRPE
|     | "0"  M/I  | Fixed  identification  |     |     |     |
| --- | --------- | ---------------------- | --- | --- | --- |
for inspection station
data
| *.PPLATZBEZ  | C250    | Inspection  | station    |     |     |
| ------------ | ------- | ----------- | ---------- | --- | --- |
designation/name
| *.ARCHIV  | "0"  or  F  | Archive flag  | .   |     |     |
| --------- | ----------- | ------------- | --- | --- | --- |
"1"
| *.SMARTDEL  |         | Activate  | "smart"    |     |     |
| ----------- | ------- | --------- | ---------- | --- | --- |
|             | „1“  D  |           |            |     |     |
delete.
| 3.2.5  | Failure analysis catalog  |     |     |     |     |
| ------ | ------------------------- | --- | --- | --- | --- |
The following dialogs are available for updating the failure analysis catalog:
|   CERRKAT.MODIFY   |     | to create or change failure analysis data  |     |     |     |
| ------------------- | --- | ------------------------------------------ | --- | --- | --- |
|   CERRKAT.INSERT   |     | to create failure analysis data            |     |     |     |
|   CERRKAT.UPDATE   |     | to change failure analysis data            |     |     |     |
|   CERRKAT.DELETE   |     | to delete failure analysis data            |     |     |     |
The  unique  key  for  the  failure  analysis  catalog  is  made  up  of  a  combination  of  the  fields
CERRKAT.ERRTYP and CERRKAT.ERRNR.
If a failure analysis criterion is already in use in HYDRA, it must not be deleted. This is why when deleting
data, you should also always transfer the parameter CERRKAT.SMARTDEL=1. Doing so will set the
archive flag (CERRKAT.ARCHIV) if an entry is ever used.

As concerns the group assignment or group creation, observe the notes in the chapter "Article catalog".
Dialog: CERRKAT.*
| Parameter  | Type  Mand | Contents  | Description  |     |     |
| ---------- | ---------- | --------- | ------------ | --- | --- |
atory

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 18 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.ERRTYP
|     | C50  M/I/U/ | Analysis type  | An analysis type with the corresponding        |     |     |
| --- | ----------- | -------------- | ---------------------------------------------- | --- | --- |
|     | D           |                | abbreviation must be defined in HYDRA (status  |     |     |
type "FHLANTYP"). The default types are listed
below:
|          |             |               |     | "FA"  Failure type      |     |
| -------- | ----------- | ------------- | --- | ----------------------- | --- |
|          |             |               |     | "FO"  Failure location  |     |
|          |             |               |     | "FU"  Failure cause     |     |
|          |             |               |     | "VU"  Causer/origin     |     |
| *.ERRNR  | C50  M/I/U/ | Entry number  |     |                         |     |
D
*.DSGRPE  "0"  M/I  Fixed  identification  0 = Failure, 1 = Failure group
for analysis data
*.DSGRP:1  C50    Analysis group 1  Only necessary if analysis groups are used.

| *.DSGRP:2  | C50     | Analysis group 2  |                 |     |     |
| ---------- | ------- | ----------------- | --------------- | --- | --- |
| *.DSGRP:3  | C50     | Analysis group 3  |                 |     |     |
| *.DSGRP:4  | C50     | Analysis group 4  |                 |     |     |
| *.DSGRP:5  | C50     | Analysis group 5  |                 |     |     |
| *.ERRBEZ   | C250    | Name              | of  analysis    |     |     |
criterion
*.ARCHIV  F  Archive flag  If the value "1" is transferred to this parameter,
"0"  or
|     | "1"  |     | the relevant data record is marked as archived.  |     |     |
| --- | ---- | --- | ------------------------------------------------ | --- | --- |
This means this data record will not be available
in selection lists.
| *.SMARTDEL  | „1“  D  | Activate  | "smart"    |     |     |
| ----------- | ------- | --------- | ---------- | --- | --- |
delete.
| 3.2.6  | Measures catalog  |     |     |     |     |
| ------ | ----------------- | --- | --- | --- | --- |
The following dialogs are available for updating the catalog of measures:
  CMASKAT.MODIFY   to create or change measures in the catalog
|   CMASKAT.INSERT   |     | to create measures in the catalog  |     |     |     |
| ------------------- | --- | ---------------------------------- | --- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 19 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

|   CMASKAT.UPDATE   |     | to change measures in the catalog          |     |     |     |
| ------------------- | --- | ------------------------------------------ | --- | --- | --- |
|   CMASKAT.DELETE   |     | to delete data in the catalog of measures  |     |     |     |
The  unique  key  for  the  measures  catalog  consists  of  the  field  CMASKAT.MASNR.
If a catalog measure is already in use in HYDRA, it must not be deleted. This is why when deleting data,
you should also always transfer the parameter CMASKAT.SMARTDEL=1. Doing so will set the archive flag
(CMASKAT.ARCHIV) if an entry is ever used.

As concerns the group assignment or group creation, observe the notes in the chapter "Article catalog".
Dialog: CMASKAT.*
| Parameter  | Type  | Mand Contents  |     | Description  |     |
| ---------- | ----- | -------------- | --- | ------------ | --- |
atory
| *.MASNR  |     | M/I/U/ Measure number  |     |     |     |
| -------- | --- | ---------------------- | --- | --- | --- |
C50
D
*.DSGRPE  "0"  M/I  Fixed  identification  for  0 = Measure, 1 = Measures group
catalog measures
*.DSGRP:1  C50    Measures group 1  Only necessary if measures groups are used.

| *.DSGRP:2  | C50   |   Measures group 2  |     |     |     |
| ---------- | ----- | ------------------- | --- | --- | --- |
| *.DSGRP:3  | C50   |   Measures group 3  |     |     |     |
| *.DSGRP:4  | C50   |   Measures group 4  |     |     |     |
| *.DSGRP:5  | C50   |   Measures group 5  |     |     |     |
| *.MASBEZ   | C250  |   Measures          |     |     |     |
designation/name
*.ARCHIV  Archive flag  If the value "1" is transferred to this
|     | "0"  | or  F  |     |                                                |     |
| --- | ---- | ------ | --- | ---------------------------------------------- | --- |
|     | "1"  |        |     | parameter, the relevant data record is marked  |     |
as archived. This means this data record will
not be available in selection lists.
| *.SMARTDEL  | „1“  | D  Activate "smart" delete.  |     |     |     |
| ----------- | ---- | ---------------------------- | --- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 20 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

| 3.2.7  | Analysis selection catalog  |     |     |     |     |     |
| ------ | --------------------------- | --- | --- | --- | --- | --- |
The following dialogs are available for updating the analysis selection catalog:
CANAUSW.MODIFY
|                    |     | to create or change analysis selection catalogs  |     |     |     |     |
| ------------------- | --- | ------------------------------------------------ | --- | --- | --- | --- |
|   CANAUSW.INSERT   |     | to create analysis selection catalogs            |     |     |     |     |
|   CANAUSW.UPDATE   |     | to change analysis selection catalogs            |     |     |     |     |
|   CANAUSW.DELETE   |     | to delete analysis selection catalogs            |     |     |     |     |
The unique key for the analysis selection catalog consists of the field CANAUSW.ANAUSNR.
If an analysis selection catalog is already in use in HYDRA, it must not be deleted. This is why when
deleting data, you should also always transfer the parameter CANAUSW.SMARTDEL=1. Doing so will set
the archive flag (CANAUSW.ARCHIV) if an entry is ever used.
Dialog: CANAUSW.*
| Parameter  | Type  | Mand Contents  |     |     | Description  |     |
| ---------- | ----- | -------------- | --- | --- | ------------ | --- |
atory
| *.ANAUSNR  |     | M/I/U/ Number  | of  | the  analysis  |     |     |
| ---------- | --- | -------------- | --- | -------------- | --- | --- |
C50
D  selection catalog
| *.ANAUSBEZ  | C250  |   Name  | of  the  | analysis  |     |     |
| ----------- | ----- | ------- | -------- | --------- | --- | --- |
selection catalog
*.ARCHIV
"0"  or  F  Archive flag  If the value "1" is transferred to this
|     | "1"  |     |     |     | parameter, the relevant data record is  |     |
| --- | ---- | --- | --- | --- | --------------------------------------- | --- |
marked as archived. This means this data
record will not be available in selection
lists.
*.SMARTDEL
|        | „1“                                       | D  Activate "smart" delete.  |     |     |     |     |
| ------ | ----------------------------------------- | ---------------------------- | --- | --- | --- | --- |
| 3.2.8  | Entries from analysis selection catalogs  |                              |     |     |     |     |
The following dialogs are available for updating entries in the analysis selection catalogs:
  CANAWEINT.INSERT  to create entries for the analysis selection catalogs

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 21 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

  CANAWEINT.DELETE  to delete entries for the analysis selection catalogs
The  unique  key  for  the  entry  of  an  analysis  selection  catalog  consists  of  the  fields
CANAWEINT.ANAUSNR, CANAWEINT.FLTTYP, CANAWEINT.EINTTYP and CANAWEINT.EINTNR.
Dialog: CANAWEINT.*
| Parameter  | Type  | Mand Contents  |     |     | Description  |     |
| ---------- | ----- | -------------- | --- | --- | ------------ | --- |
atory
*.ANAUSNR
|     |     | I/D  Number  | of  | the  analysis  | An analysis selection catalog with the  |     |
| --- | --- | ------------ | --- | -------------- | --------------------------------------- | --- |
C50
|     |     | selection catalog  |     |     | respective number must exist in HYDRA.  |     |
| --- | --- | ------------------ | --- | --- | --------------------------------------- | --- |
*.FLTTYP  C50  I/D  Filter type  A filter type with the corresponding
abbreviation must be defined in HYDRA
(status type "ANAWFLTTYP"). These are
the default types:
|     |     |     |     |     |   "INCLUDE"  inclusive  |     |
| --- | --- | --- | --- | --- | ----------------------- | --- |
|     |     |     |     |     |   "EXCLUDE"  exclusive  |     |
*.EINTTYP  C50  I/D  Type of entry  An entry type with the corresponding
abbreviation must be defined in HYDRA
(status type "ANAWEINTTYP"). These are
the default types:
|     |     |     |     |     |   "FA"  Failure type      |     |
| --- | --- | --- | --- | --- | ------------------------- | --- |
|     |     |     |     |     |   "FO"  Failure location  |     |
|     |     |     |     |     |   "FU"  Failure cause     |     |
|     |     |     |     |     |   "VU"  Causer/origin     |     |
  "MASSKAT" Measure
*.EINTNR  C50  I/D  Entry identifier  A corresponding entry with the respective
number must exist in HYDRA. The
EINTTYP parameter specifies the origin of
the entry.
| 3.2.9  | Characteristics catalog  |     |     |     |     |     |
| ------ | ------------------------ | --- | --- | --- | --- | --- |
The following dialogs are available for updating catalog characteristics:
|   CMM.MODIFY  |     |     | to create or modify catalog characteristics  |     |     |     |
| -------------- | --- | --- | -------------------------------------------- | --- | --- | --- |
|   CMM.INSERT  |     |     | to create catalog characteristics            |     |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 22 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

|   CMM.UPDATE  |     |     | to change catalog characteristics  |     |     |     |
| -------------- | --- | --- | ---------------------------------- | --- | --- | --- |
|   CMM.DELETE  |     |     | to delete catalog characteristics  |     |     |     |
The unique key for a catalog characteristic consists only of the field CMM.CMMNR.
Dialog: CMM.*
| Parameter  |     | Type  | Mand Contents  |     | Description  |     |
| ---------- | --- | ----- | -------------- | --- | ------------ | --- |
atory
| *.CMMNR  |     | C50  | M/I/U/ Characteristic number  |     |     |     |
| -------- | --- | ---- | ----------------------------- | --- | --- | --- |
D
| *.MMBEZ  |     | C250  |   Characteristic  |     |     |     |
| -------- | --- | ----- | ----------------- | --- | --- | --- |
designation/name
*.MMTYP  C50  F  Characteristic type  The parameter used here must be
defined in HYDRA. Possible
values:
"PRODUKT" – Product
characteristic
"PROZESS" – Process
characteristic
| *.ERFART  |     | "MANUELL"   | F  Fixed identifier for CAQ  |     |     |     |
| --------- | --- | ----------- | ---------------------------- | --- | --- | --- |
characteristics

*.MUSSPRF  "0" or "1"  F  Mandatory inspection  If this parameter has the value 1,
an inspection step cannot be
completed until at least one
measured value was recorded for
this characteristic.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 23 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.BFORMEL C250 Formula If this parameter is completed with
a value, then the characteristic's
values will be calculated based on
the formula defined here. In this
case, it might no longer be possible
to enter measured values for this
characteristic manually (depends
on the type of formula).
Refer to the corresponding
documentation to see the structure
of a formula of this kind.
*.PRUEFTYP C50 F Characteristic type The parameter used here must be
defined in HYDRA. Possible
values:
"A" - attributive
"V" - variable
"F" – inspection chart (chart of
recorded defects)
*.ERFASSDET C50 Kind of input (inspection) This parameter is only available as
type of CAQ 8.2.
The parameter used here must be
defined in HYDRA. Possible
values:
"“ – Standard
"RASTER" - Visual defects
recording
 only supported with
CMM.PRUEFTYP=F
"CODE“ – based on catalogs
 only supported with
CMM.PRUEFTYP=A
"CODE_ZUFALL“ – based on
catalogs (random)
 only supported with
CMM.PRUEFTYP=A
EIS-CES_82.docx Version: 1.0.23049 Page 24 of 123

HYDRA-CAQ Interface to ERP Systems
*.BEWKAUSWMEN:1 C10 Selected set for This parameter is only available as
assessment catalog of CAQ 8.2.
This parameter is only supported
with CMM.ERFASSDET=CODE or
CMM.ERFASSDET=CODE_ZUFA
LL.
*.PRFRASTER:X C250 Grid of x-axis This parameter is only available as
of CAQ 8.2.
This parameter is only supported
with CMM.ERFASSDET=RASTER.
The identifiers of the grid must be
separated by comma.
*.PRFRASTER:Y C250 Grid of y-axis This parameter is only available as
of CAQ 8.2.
This parameter is only supported
with CMM.ERFASSDET=RASTER.
The identifiers of the grid must be
separated by comma.
*.PMID C50 Type PRM (test If this parameter is specified, a
equipment/gage) respective PRM type resource
resource to be used must be defined in HYDRA.
If this entry is used, the parameter
CMM.RESFAM must be empty.
*.RESFAM Resource family to be If this parameter is specified, a
used respective resource family must be
defined in HYDRA.
If this entry is used, the parameter
CMM.PMID must be empty.
*.OPT:PLAN M or G F M = Machine You define here if the scheduling is
G = Machine group performed for a machine/workplace
or a group of
machines/workplaces.
M is the default value.
*.MNR C50 Scheduling for a The inspection step generated for
machine/workplace this characteristic can only be
logged on to the specified machine
and inspected here.
EIS-CES_82.docx Version: 1.0.23049 Page 25 of 123

HYDRA-CAQ Interface to ERP Systems
*.MGRP C 20 Scheduling for the The inspection step generated for
specified this characteristic can be found in
machine/workplace the sequencing list of all
group machines/workplaces that are
included in this group. The
inspection can therefore be
performed with all machines of this
group.
*.ZERTPRN C50 F Certificate printing The ID entered here must be
defined in HYDRA. Default values
are:
"NIE" – never print
"AUSW" – selectable
"IMMER" – always print
*.ERRGEW C50 F Failure weighting The error weighting entered here
must be defined in HYDRA. Default
values are:
"NEBEN" – Minor defect
"HAUPT" –Major defect
"KRIT" – Critical defect
*.BPRUEFERG C50 Inspection result base Specifies the basis for identifying
the inspection result of the
characteristic.
NCD_ALL = inspection result is
calculated over all
samples
NCD_LAST = inspection result is
calculated from the
last sample
*.ANAUSNR Analysis selection If this parameter is specified, a
C50
catalog respective analysis selection
catalog must be defined in HYDRA.
*.CEINH C50 Unit of measure or size A corresponding unit of measure
with this identifier must already
exist in HYDRA.
EIS-CES_82.docx Version: 1.0.23049 Page 26 of 123

HYDRA-CAQ Interface to ERP Systems
*.FMT C250 Measured values format Missing or completing zeros to be
of the single values suppressed are marked by the "#"
sign, positions that must definitely
be displayed are illustrated with a
"0". The decimal point is marked by
a dot and the thousands separator
is marked by a comma.
Example: "#,##0.00##"
This parameter is only needed for
variable characteristics. If this
parameter is not transferred, then
the default format defined in the
options is used.
On the client, the number of
decimal places is output as the
format.
This parameter is only required for
variable characteristics.
*.GWNORM C50 Standard This parameter can be used to
define which standard the
tolerance limits are based on. A
relevant standard must be defined
in HYDRA.
Standards are:
 "ISO_PASS“
 "ISO7168“
 "ISO2768“
 "EN12420“
This parameter is only required for
variable characteristics.
*.GWID C50 Standard entry identifier For some standards, an identifier
can be specified for the
corresponding entry.
Example: "H7" for ISO fit standards
This parameter is only required for
variable characteristics.
EIS-CES_82.docx Version: 1.0.23049 Page 27 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.STPRPLAN
|     |     | C50  | M/I  Sampling     |     | scheme  The sampling scheme must be  |     |
| --- | --- | ---- | ----------------- | --- | ------------------------------------ | --- |
|     |     |      | (see  identifier  |     | defined in HYDRA. Possible           |     |
|     |     |      | comm              |     | values:                              |     |
ents)    "NC"
  "100PRO"
  "SPC"
  "LOS"
The "LOS" sampling scheme is
only valid in the goods receipt or
the goods issue areas, while the
sampling scheme "SPC" is only
valid in the production areas.
|     |     | N9  | M/I  Sample size  |     | This parameter determines the  |     |
| --- | --- | --- | ----------------- | --- | ------------------------------ | --- |
*.STPRUMF
sample size. The value 0 must be
(see
used for open samples.
comm
|     |     |     | ents)  |     | The sampling scheme "100PRO"  |     |
| --- | --- | --- | ------ | --- | ----------------------------- | --- |
requires an entry (must not be
empty)
*.RWMENGE
|     |     | N9  |   Acceptance quantity  |     |     |     |
| --- | --- | --- | ---------------------- | --- | --- | --- |
For STPRPLAN<>NC, the
parameter must be empty
| *.RUMENGE  |     | N9  |   Rejection quantity  |     | For STPRPLAN<>NC, the  |     |
| ---------- | --- | --- | --------------------- | --- | ---------------------- | --- |
parameter must be empty
| *.INTTYP  |     | C50  | F  Type of interval  |     | With STPRPLAN<>SPC or  |     |
| --------- | --- | ---- | -------------------- | --- | ---------------------- | --- |
STPRPLAN<>NC, the parameter
must be empty.
Valid values:
  "KEINS" for no interval
  "ZEIT" for time intervals
  "STCK" for piece intervals
  "EINMAL" for "once"

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 28 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.INTERVAL
|     |     | N9  |   Interval  |     | With STPRPLAN<>SPC or  |     |
| --- | --- | --- | ----------- | --- | ---------------------- | --- |
STPRPLAN<>NC, the parameter
must be empty.
Interval value. For piece intervals,
the number of units is set in this
field, for time intervals, the interval
from this field results from the
connection with the field
CMM.INTEINH.
| *.INTEINH  |     | C50  | F  Type of interval  |     | With STPRPLAN<>SPC or  |     |
| ---------- | --- | ---- | -------------------- | --- | ---------------------- | --- |
STPRPLAN<>NC, the parameter
must be empty.
Specifies for time intervals which
unit is found in the field
CSPEZL.INTERVAL.
Only identifiers defined in HYDRA
can be used. By default, these are
the following:
  "SEK" – Seconds
  "MIN" – Minutes
  "STD" – Hours
  "TAG" – Days
  "MON" – Months
  "JAH" – Years
*.INT:ALW  "0" or "1"  F  Characteristic  becomes  Provided that MPL is in use
due for inspection when
|     |     |     | output  | batches  | are  |     |
| --- | --- | --- | ------- | -------- | ---- | --- |
changed
| *.INT:MSW  |     | "0" or "1"  | F  Characteristic  |     | becomes    |     |
| ---------- | --- | ----------- | ------------------ | --- | ---------- | --- |
due for inspection when
|     |     |     | machine  | statuses  | are  |     |
| --- | --- | --- | -------- | --------- | ---- | --- |
changed
*.INT:MSWMST  C250    Source  status,  target  Separate configurations by comma,
|     |     |     | status or a combination  |              | no blanks   |     |
| --- | --- | --- | ------------------------ | ------------ | ----------- | --- |
|     |     |     | of                       | source  and  | target      |     |
|     |     |     | status                   |              | triggering  |     |
|     |     |     | inspections              |              | when        |     |
|     |     |     | changing                 | the          | machine     |     |
status

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 29 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.INT: SCHICHTW "0" or "1" F Characteristic becomes
due for inspection when
the shift is changed
*.PRBZUG "0" or "1" F Sampling This parameter can be used from
SP4 onwards.
*.PRBGRP C50 Sample group This parameter can be used from
SP4 onwards.
*.MASSANG C50 F Type of defined Specifies the type how the
construction dimensions construction dimensions are
stored.
Only identifiers defined in HYDRA
can be used. By default, these are
the following:
 "ABSOLUT" – the
construction dimensions are
defined as absolute values in
the parameters OPG, OTG,
UTG and UPG.
 "RELATIV" - the construction
dimensions are defined as a
relative deviation from the
target value in the parameters
OPGREL, OTGREL,
UTGREL and UPGREL.
 "PROZENTUAL" - the
constructional measures are
defined as a deviation in
percent from the target value
in the parameters OPGREL,
OTGREL, UTGREL and
UPGREL.
*.OPG N12.4 absolute, upper The parameter must be empty for
plausibility limit PRUEFTYP<>V or
MASSANG<>ABSOLUT .
*.OPGREL N12.4 relative/ percentage, The parameter must be empty for
upper plausibility limit PRUEFTYP<>V or
MASSANG=ABSOLUT .
EIS-CES_82.docx Version: 1.0.23049 Page 30 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.OTG
|     |     | N12.4  |   absolute,      |     | upper  The parameter must be empty for  |     |
| --- | --- | ------ | ---------------- | --- | --------------------------------------- | --- |
|     |     |        | tolerance limit  |     | PRUEFTYP<>V or                          |     |
MASSANG<>ABSOLUT .
*.OTGREL  N12.4    relative/percentage,  The parameter must be empty for
|     |     |     | upper tolerance limit   |     | PRUEFTYP<>V or  |     |
| --- | --- | --- | ----------------------- | --- | --------------- | --- |
MASSANG=ABSOLUT .
*.OTGAKTIV  "0" or "1"  F  Automatic failure entry  The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if single
values violate the tolerance limit.
*.SW
|     |     | N12.4  |   Target value  |     | The parameter must be empty for  |     |
| --- | --- | ------ | --------------- | --- | -------------------------------- | --- |
PRUEFTYP<>V .
*.UTG  N12.4    absolute,  lower  The parameter must be empty for
|     |     |     | tolerance limit  |     | PRUEFTYP<>V or  |     |
| --- | --- | --- | ---------------- | --- | --------------- | --- |
MASSANG<>ABSOLUT .
*.UTGREL  N12.4    relative/  percentage,  The parameter must be empty for
|     |     |     | lower tolerance limit   |     | PRUEFTYP<>V or  |     |
| --- | --- | --- | ----------------------- | --- | --------------- | --- |
MASSANG=ABSOLUT .
*.UTGAKTIV  "0" or "1"  F  Automatic failure entry  The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if single
values violate the tolerance limit.
*.UPG  N12.4    absolute,  lower  The parameter must be empty for
|     |     |     | plausibility limit  |     | PRUEFTYP<>V or  |     |
| --- | --- | --- | ------------------- | --- | --------------- | --- |
MASSANG<>ABSOLUT .
*.UPGREL  N12.4    relative/  percentage,  The parameter must be empty for
|     |     |     | lower plausibility limit   |     | PRUEFTYP<>V or  |     |
| --- | --- | --- | -------------------------- | --- | --------------- | --- |
MASSANG=ABSOLUT .
*.KARTE:1  C50  F  Identifier  for  the  first  The following values are valid for
|     |     |     | control chart  |     | variable characteristics:  |     |
| --- | --- | --- | -------------- | --- | -------------------------- | --- |
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 31 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.OEG:1 N12.4 upper action limit of the
first control chart
*.OEGAKTIV:1 "0" or "1" F Automatic failure entry If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the
upper action limit is violated by the
statistical value of control chart 1
(e.g. Xq).
*.OWG:1 N12.4 upper warning limit of
the first control chart
*.OWGAKTIV:1 "0" or "1" F Automatic failure entry If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the
upper warning limit is violated by
the statistically calculated value of
control chart 1 (e.g. Xq).
*.MWAVG:1 N12.4 Mean value for the first
control chart
*.UWG:1 N12.4 lower warning limit of the The parameter must be empty for
first control chart PRUEFTYP<>V .
*.UWGAKTIV:1 "0" or "1" F Automatic failure entry The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
warning limit is violated by the
statistically calculated value of
control chart 1 (e.g. Xq).
*.UEG:1 N12.4 lower action limit of the The parameter must be empty for
first control chart PRUEFTYP<>V .
*.UEGAKTIV:1 "0" or "1" F Automatic failure entry The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
action limit is violated by the
statistically calculated value of
control chart 1 (e.g. Xq).
EIS-CES_82.docx Version: 1.0.23049 Page 32 of 123

HYDRA-CAQ Interface to ERP Systems
*.VORG:1 C50 F Default value for limit The following values are valid:
value calculation "CPK“, "SIGMA“, "QUER“,
“ABW_REL“, "ABW_PROZ“
*.CPK:1 N12.4 CPK default value for To calculate Sigma from the
limit value calculation defined cpk, the upper and lower
tolerance limits must be specified
and must be distinguishable.
*.STATVERT:1 C50 F Unilateral or bilateral The following values are valid:
calculation of limit "EINS", "ZWEI".
values
If this parameter has the value
"EINS", the calculation is only
performed for either the upper or
the lower action/ warning limits.
This setting is mandatory for
attributive control charts. For R and
s control charts, the upper limit
values are calculated in this case.
For Xq control charts, the
calculation performed depends on
which tolerance limit is specified. If
the upper and lower tolerance limit
is specified, the upper and lower
warning/ action limits are
calculated, even though "unilateral"
was selected.
If this parameter has the value
"ZWEI", the calculation is
performed for the upper and lower
action/ warning limits.
EIS-CES_82.docx Version: 1.0.23049 Page 33 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.EWEG:1
C50  F  Non-action  probability  The following values are valid for
|     |     |     | for the action limits  |     | unilateral control charts:  |     |
| --- | --- | --- | ---------------------- | --- | --------------------------- | --- |
"1", "1.28", "1.64", "1.96", "2",
"2.33", "2.58", "3", "3.09", "3.72",
"4"
The following values are valid for
bilateral control charts:
"1", "1.28", "1.64", "1.96", "2",
"2.28", "2.33", "2.58", "3", "3.09",
"3.45", "3.72", "3.9", "4"
The following values are valid for R
and s charts:
"0.9", "0.95", "0.99"
*.EWWG:1  C50  F  Non-action  probability  See EWEG:1 parameters
for warning limits
*.RELEG:1
N12.4    relative  deviation/  The parameter must be empty for
|     |     |     | deviation                   | in  percent    | of  KARTE:1<>XQ  |     |
| --- | --- | --- | --------------------------- | -------------- | ---------------- | --- |
|     |     |     | the action limit(s) of the  |                |                  |     |
|     |     |     | first                       | (Xq)  control  | chart            |     |
from the target value
*.RELWG:1
N12.4    relative  deviation/  The parameter must be empty for
|     |     |     | deviation  | in  percent        | of  KARTE:1<>XQ  |     |
| --- | --- | --- | ---------- | ------------------ | ---------------- | --- |
|     |     |     | the        | warning  limit(s)  | of               |     |
|     |     |     | the        | first  (Xq)        | control          |     |
|     |     |     | chart      | from  the          | target           |     |
value
| *.QUER:1  |     | N12.4  |   Default value for sq: or  |      |           |     |
| --------- | --- | ------ | --------------------------- | ---- | --------- | --- |
|           |     |        | rather                      | for  | Rq:  for  |     |
computing limit values
*.SIGMA:1
|     |     | N12.4  |   Sigma default value for  |     |     |     |
| --- | --- | ------ | -------------------------- | --- | --- | --- |
limit value calculation
*.XQVART:1  C50  F  Type of Xq default value  The following values are valid:
|             |     |        | (for                          | limit  | value  "RKXQMITTE", "SOLLWERT",  |     |
| ----------- | --- | ------ | ----------------------------- | ------ | -------------------------------- | --- |
|             |     |        | calculation)                  |        | "TOLMITTE", "VORGABE"            |     |
| *.VORGXQ:1  |     | N12.4  |   Default value Xq for limit  |        |                                  |     |
For VORGXQ:1<>VORGABE, the
value calculation
parameter must be empty.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 34 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |     |
| --- | --- | --- | --- | --- | --- | ----------------------------------- | --- | --- | --- |

*.MOD:BER_WG_1
"0" or "1"  F  Automatically  calculate  If the value "1" is transferred to this
|     |     |     |     | warning              | limits  | for  | the  parameter,                         | the  | warning  limits  for  |
| --- | --- | --- | --- | -------------------- | ------- | ---- | --------------------------------------- | ---- | --------------------- |
|     |     |     |     | first control chart  |         |      | the first control chart are calculated  |      |                       |
automatically.
It is not possible to calculate limit
values for the Median chart.
*.MOD:BER_EG_1  Automatically  calculate  If the value "1" is transferred to this
|     |     | "0" or "1"  | F   |                              |     |     |                                       |        |                  |
| --- | --- | ----------- | --- | ---------------------------- | --- | --- | ------------------------------------- | ------ | ---------------- |
|     |     |             |     | action limits for the first  |     |     | parameter, the action limits for the  |        |                  |
|     |     |             |     | control chart                |     |     | first  control                        | chart  | are  calculated  |
automatically.
It is not possible to calculate limit
values for the Median chart.
*.KARTE:2  C50  F  Identifier of the second  The following values are valid for
|     |     |     |     | control chart  |     |     | variable characteristics:  |     |     |
| --- | --- | --- | --- | -------------- | --- | --- | -------------------------- | --- | --- |
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"
*.OEG:2
|     |     | N12.4  |     | upper action limit of the  |     |     |     |     |     |
| --- | --- | ------ | --- | -------------------------- | --- | --- | --- | --- | --- |
second control chart
*.OEGAKTIV:2  "0" or "1"  F  Automatic failure entry  If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the
upper action limit is violated by the
statistically calculated value of
control chart 2 (e.g. standard
deviation).
| *.OWG:2  |     |        |     | Upper  | warning  | limit  | of    |     |     |
| -------- | --- | ------ | --- | ------ | -------- | ------ | ----- | --- | --- |
|          |     | N12.4  |     |        |          |        |       |     |     |
the second control chart
*.OWGAKTIV:2  "0" or "1"  F  Automatic failure entry  If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the
upper warning limit is violated by
the statistically calculated value of
control chart 2 (e.g. standard
deviation).
| *.MWAVG:2  |     | N12.4  |     | Mean    | value  | of       | the    |     |     |
| ---------- | --- | ------ | --- | ------- | ------ | -------- | ------ | --- | --- |
|            |     |        |     | second  | (Xq)   | control  |        |     |     |
chart

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     |     | Page 35 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | --- | --------------- |

|     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | ----------------------------------- | --- | --- |

*.UWG:2
N12.4    Lower  warning  limit  of  The parameter must be empty for
|     |     | the second control chart  | PRUEFTYP<>V .  |     |     |
| --- | --- | ------------------------- | -------------- | --- | --- |
*.UWGAKTIV:2  "0" or "1"  F  Automatic failure entry  The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
|     |     |     | parameter,  | a  failure  | entry  is  |
| --- | --- | --- | ----------- | ----------- | ---------- |
automatically generated if the lower
|     |     |     | warning        | limit  is  violated  | by  the    |
| --- | --- | --- | -------------- | -------------------- | ---------- |
|     |     |     | statistically  | calculated           | value  of  |
|     |     |     | control        | chart  2  (e.g.      | standard   |
deviation).
*.UEG:2  N12.4    Lower action limit of the  The parameter must be empty for
|     |     | second control chart  | PRUEFTYP<>V .  |     |     |
| --- | --- | --------------------- | -------------- | --- | --- |
*.UEGAKTIV:2  "0" or "1"  F  Automatic failure entry  The parameter must be empty for
PRUEFTYP<>V .
If the value "1" is transferred to this
|     |     |     | parameter,  | a  failure  | entry  is  |
| --- | --- | --- | ----------- | ----------- | ---------- |
automatically generated if the lower
|     |     |     | action  limit  | is  violated     | by  the    |
| --- | --- | --- | -------------- | ---------------- | ---------- |
|     |     |     | statistically  | calculated       | value  of  |
|     |     |     | control        | chart  2  (e.g.  | standard   |
deviation).
*.VORG:2  C50  F  Default  value  for  limit  The following values are valid:
|     |     | value calculation  | "CPK“, "SIGMA“, "QUER“,  |     |     |
| --- | --- | ------------------ | ------------------------ | --- | --- |
“ABW_REL“, "ABW_PROZ“
*.CPK:2  N12.4    CPK  default  value  for  See CPK:1 parameters
limit value calculation
*.STATVERT:2  C50  F  Unilateral  or  bilateral  See STATVERT:1 parameters
|     |     | calculation  of  | limit  |     |     |
| --- | --- | ---------------- | ------ | --- | --- |
values
*.EWEG:2  C50  F  Non-action  probability  See EWEG:1 parameters
for the action limits
*.EWWG:2  C50  F  Non-action  probability  See EWEG:1 parameters
for warning limits

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 36 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |     |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- | --- | --- | --- |

*.RELEG:2
N12.4    relative  deviation/  The parameter must be empty for
|     |     |     |     | deviation                   | in  percent    | of  KARTE:2<>XQ  |     |     |     |
| --- | --- | --- | --- | --------------------------- | -------------- | ---------------- | --- | --- | --- |
|     |     |     |     | the action limit(s) of the  |                |                  |     |     |     |
|     |     |     |     | second                      | (Xq)  control  |                  |     |     |     |
|     |     |     |     | chart  from                 | the  target    |                  |     |     |     |
value
*.RELWG:2  N12.4    relative  deviation/  The parameter must be empty for
|     |     |     |     | deviation     | in  percent  | of  KARTE:2<>XQ  |     |     |     |
| --- | --- | --- | --- | ------------- | ------------ | ---------------- | --- | --- | --- |
|     |     |     |     | the  warning  | limit(s)     | of               |     |     |     |
the second (Xq) control
|     |     |     |     | chart  from  | the  target  |     |     |     |     |
| --- | --- | --- | --- | ------------ | ------------ | --- | --- | --- | --- |
value
| *.QUER:2  |     | N12.4  |     | Default value for sq: or  |           |      |     |     |     |
| --------- | --- | ------ | --- | ------------------------- | --------- | ---- | --- | --- | --- |
|           |     |        |     | rather                    | for  Rq:  | for  |     |     |     |
computing limit values
*.SIGMA:2
|     |     | N12.4  |     | Sigma default value for  |     |     |     |     |     |
| --- | --- | ------ | --- | ------------------------ | --- | --- | --- | --- | --- |
limit value calculation
*.XQVART:2  C50  F  Type of Xq default value  The following values are valid:
|     |     |     |     | (for          | limit  value  | "RKXQMITTE", "SOLLWERT",  |     |     |     |
| --- | --- | --- | --- | ------------- | ------------- | ------------------------- | --- | --- | --- |
|     |     |     |     | calculation)  |               | "TOLMITTE", "VORGABE"     |     |     |     |
*.VORGXQ:2  N12.4    Default value Xq for limit  For  VORGXQ:2<>VORGABE,  the
|     |     |     |     | value calculation  |     | parameter must be empty.  |     |     |     |
| --- | --- | --- | --- | ------------------ | --- | ------------------------- | --- | --- | --- |
*.MOD:BER_WG_2  "0" or "1"  F  Automatically  calculate  If the value "1" is transferred to this
|     |     |     |     | warning               | limits  for  | the  parameter,  | the      | warning  limits  | for  |
| --- | --- | --- | --- | --------------------- | ------------ | ---------------- | -------- | ---------------- | ---- |
|     |     |     |     | second control chart  |              | the  second      | control  | chart            | are  |
calculated automatically.
*.MOD:BER_EG_2
"0" or "1"  F  Automatically  calculate  If the value "1" is transferred to this
|     |     |     |     | action  limits        | for  | the  parameter, the action limits for the  |     |     |     |
| --- | --- | --- | --- | --------------------- | ---- | ------------------------------------------ | --- | --- | --- |
|     |     |     |     | second control chart  |      | second control chart are calculated        |     |     |     |
automatically.
| *.FU:1 to*.FU:5   |     | C50    |     | Direct user fields  |     |     |     |     |     |
| ----------------- | --- | ------ | --- | ------------------- | --- | --- | --- | --- | --- |
| *.FU:6 to*.FU:10  |     | N9     |     | Direct user fields  |     |     |     |     |     |
| *.FU:11; *.FU:12  |     | N12.9  |     | Direct user fields  |     |     |     |     |     |
| *.FU:13; *.FU:14  |     | Date   |     | Direct user fields  |     |     |     |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     |     |     | Page 37 of 123  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --- | --------------- | --- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| 3.2.10  | Specification list  |     |     |     |     |
| ------- | ------------------- | --- | --- | --- | --- |
The following dialogs are available for updating the specification list:
CSPEZL.MODIFY
|                  |                                              | to create or change entries in the specification list  |     |     |     |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ | --- | --- | --- |
|   CSPEZL.INSERT  | to create entries of the specification list  |                                                        |     |     |     |
  CSPEZL.UPDATE  to change entries of the specification list
  CSPEZL.DELETE    to delete entries in the specification list
The  unique  key  of  the  specification  list  is  made  up  of  the  fields  CSPEZL.BER,  CSPEZL.CMMNR,
CSPEZL.ATK, CSPEZL.ATKIDX, CSPEZL.KDNR, CSPEZL.LIEFNR, CSPEZL.AGNR,  CSPEZL.AGBEZ,
CSPEZL.MNR,  CPEZL.SONDERF  and  CSPEZL.EINTIDX  and  all  user  fields  (CSPEZL.FU:1  to
CSPEZL.FU:14).
Dialog: CSPEZL.*
| Parameter  | Type  Mandat | Contents  |     | Description  |     |
| ---------- | ------------ | --------- | --- | ------------ | --- |
ory
*.SONDERF
|     | M/I/U/D  | Is the entry in the  |     | This parameter defines whether the entry  |     |
| --- | -------- | -------------------- | --- | ----------------------------------------- | --- |
"0"  or
|     |     | specification list a special  |     | is a normal or a special case.  |     |
| --- | --- | ----------------------------- | --- | ------------------------------- | --- |
"1"
case?
*.EINTIDX  M/I/U/D  Version of the  The version number is only kept for
N9
|     |     | specification list entry.  |     | normal cases and is issued automatically  |     |
| --- | --- | -------------------------- | --- | ----------------------------------------- | --- |
when a new entry is created.
*.BER  M/I/U/D  Area for which the  An area with the corresponding area ID
C10
|     |     | specification list entry is  |     | must exist in HYDRA.  |     |
| --- | --- | ---------------------------- | --- | --------------------- | --- |
valid.
*.CMMNR  M/I/U/D  Characteristic number  The link to the corresponding inspection
C50
plan characteristic is implemented via this
parameter.
*.ATK  C50  M/I/U/D  Article number  An article with the corresponding
combination of article number and drawing
issue number must exist in HYDRA.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 38 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.ATKIDX
|     | C50  | M/I/U/D  | Drawing issue number of  | An article with the corresponding          |     |
| --- | ---- | -------- | ------------------------ | ------------------------------------------ | --- |
|     |      |          | the article              | combination of article number and drawing  |     |
issue number must exist in HYDRA.
If required, the drawing issue number may
be left empty.
*.KDNR  C50  M/I/U/D  Customer number  A customer with the corresponding
customer number must exist in HYDRA.
*.LIEFNR  Supplier number  A supplier with the corresponding supplier
C50  M/I/U/D
number must exist in HYDRA.
| *.AGNR   | C50   | M/I/U/D  | Operation number       |     |     |
| -------- | ----- | -------- | ---------------------- | --- | --- |
| *.AGBEZ  | C250  | M/I/U/D  | Operation designation  |     |     |
| *.MNR    |       | M/I/U/D  | Machine number         |     |     |
C50
| *.AKTIV  |     |     | Activation of the  |     |     |
| -------- | --- | --- | ------------------ | --- | --- |
"0"  or
specification list entry.
"1"
*.IGN  "0"  or  F  Option to possibly ignore  If the value "1" is transferred to this
"1"  the  characteristic  when  parameter, the characteristic is omitted at
|     |     |     | creating  the  inspection  | the time the inspection step is created,   |     |
| --- | --- | --- | -------------------------- | ------------------------------------------ | --- |
|     |     |     | step.                      | even if the characteristic was defined in  |     |
the corresponding inspection plan.
*.CEINH  C50    Unit of measure or size  A corresponding unit of measure with this
identifier must already exist in HYDRA.
*.FMT
C250    Measured  values  format  Missing or completing zeros to be
|     |     |     | of the single values  | suppressed are marked by the "#" sign,  |     |
| --- | --- | --- | --------------------- | --------------------------------------- | --- |
positions that must definitely be displayed
are illustrated with a "0". The decimal point
is marked by a dot and the thousands
separator is marked by a comma.
Example: "#,##0.00##"
This parameter is only needed for variable
characteristics. "0,015" *1 *2 If this
parameter is not transferred, then the
default format defined in the op
"0,025" *1 *2 In the client, the number of
decimal places is output

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 39 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.GWNORM C50 Standard This parameter can be used to define
which standard the tolerance limits are
based on. A relevant standard must be
defined in HYDRA.
Standards are:
 "ISO_PASS“
 "ISO7168“
 "ISO2768“
 "EN12420“
This parameter is only required for
variable characteristics.
*.GWID C50 Standard entry identifier For some standards, an identifier can be
specified for the corresponding entry.
Example: "H7" for ISO fit standards
This parameter is only needed for variable
characteristics.
This parameter is only required for
variable characteristics.
*.STPRPLAN C50 M/I Sampling scheme The sampling scheme must be defined in
identifier HYDRA. Possible values:
 "NC"
 "100PRO"
 "SPC"
 "LOS"
The "LOS" sampling scheme is only valid
in the goods receipt or the goods issue
areas, while the sampling scheme "SPC"
is only valid in the production areas.
N9 M/I Sample size This parameter determines the sample
*.STPRUMF
size. The value 0 must be used for open
samples.
The sampling scheme "100PRO" requires
an entry (must not be empty)
*.RWMENGE N9 Acceptance quantity For STPRPLAN<>NC, the parameter must
be empty
*.RUMENGE N9 Rejection quantity For STPRPLAN<>NC, the parameter must
be empty
EIS-CES_82.docx Version: 1.0.23049 Page 40 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.INTTYP
|     | C50  F  | Type of interval  |     | With STPRPLAN<>SPC or  |     |
| --- | ------- | ----------------- | --- | ---------------------- | --- |
STPRPLAN<>NC, the parameter must be
empty.
Valid values:
  "KEINS" for no interval
  "ZEIT" for time intervals
  "STCK" for piece intervals
  "EINMAL" for "once"
*.INTERVAL  N9    Interval  Interval value. For piece intervals, the
number of units is set in this field, for time
intervals, the interval from this field results
from the connection with the field
CSPEZL.INTEINH.
*.INTEINH  C50  F  Type of interval  Specifies for time intervals which unit is
found in the field CSPEZL.INTERVAL.
Only identifiers defined in HYDRA can be
used. By default, these are the following:
  "SEK" – Seconds
  "MIN" – Minutes
  "STD" – Hours
  "TAG" – Days
  "MON" – Months
  "JAH" – Years
*.INT:ALW  "0"  or  F  Characteristic  becomes  Provided that MPL is in use
|     |     | due  for  | inspection  when  |     |     |
| --- | --- | --------- | ----------------- | --- | --- |
"1"
|     |     | output  | batches  | are  |     |
| --- | --- | ------- | -------- | ---- | --- |
changed
| *.INT:MSW  | "0"  or  F  | Characteristic  | becomes           |     |     |
| ---------- | ----------- | --------------- | ----------------- | --- | --- |
|            |             | due  for        | inspection  when  |     |     |
"1"
|     |     | machine  | statuses  | are  |     |
| --- | --- | -------- | --------- | ---- | --- |
changed
*.INT:MSWMST  C250    Source  status,  target  Separate configurations by comma, no
|     |     | status or a combination of  |                      | blanks  |     |
| --- | --- | --------------------------- | -------------------- | ------- | --- |
|     |     | source                      | and  target  status  |         |     |
|     |     | triggering                  | inspections          |         |     |
|     |     | when                        | changing             | the     |     |
machine status

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 41 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.INT: SCHICHTW
|     | "0"  or  F  | Characteristic  | becomes           |     |     |
| --- | ----------- | --------------- | ----------------- | --- | --- |
|     | "1"         | due  for        | inspection  when  |     |     |
the shift is changed
*.MASSANG  C50  F  Type  of  defined  Specifies the manner in which the
|     |     | constructional measures  |     | constructional measures are defined.  |     |
| --- | --- | ------------------------ | --- | ------------------------------------- | --- |
Only identifiers defined in HYDRA can be
used. By default, these are the following:
  "ABSOLUT" – the constructional
measures are defined absolutely in
the parameters OPG, OTG, UTG and
UPG. *.OWG:1
  "RELATIV" - the constructional
measures are defined as a relative
deviation from the target value in the
parameters OPGREL, OTGREL,
UTGREL and UPGREL. N12.4
  "PROZENTUAL" - the constructional
measures are defined as a deviation
in percent from the target value in the
parameters OPGREL, OTGREL,
UTGREL and UPGREL.
*.OPG  N12.4    absolute, upper plausibility  The parameter must be empty for
|     |     | limit  |     | attributive characteristics or  |     |
| --- | --- | ------ | --- | ------------------------------- | --- |
MASSANG<>ABSOLUT or OPGEXT=1.
*.OPGREL  N12.4    relative/  percentage,  The parameter must be empty for
|     |     | upper plausibility limit   |     | attributive characteristics or  |     |
| --- | --- | -------------------------- | --- | ------------------------------- | --- |
MASSANG=ABSOLUT
*.OTG  N12.4    absolute, upper tolerance  The parameter must be empty for
|     |     | limit  |     | attributive characteristics or  |     |
| --- | --- | ------ | --- | ------------------------------- | --- |
MASSANG<>ABSOLUT or OPGEXT=1.
*.OTGREL  N12.4    relative/percentage, upper  The parameter must be empty for
|     |     | tolerance limit   |     | attributive characteristics or  |     |
| --- | --- | ----------------- | --- | ------------------------------- | --- |
MASSANG=ABSOLUT
*.OTGAKTIV
"0"  or  F  Automatic failure entry  The parameter must be empty for
"1"  attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if single values violate the
tolerance limit.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 42 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.SW
|     | N12.4    | Target value  |     | The parameter must be empty for  |     |
| --- | -------- | ------------- | --- | -------------------------------- | --- |
attributive characteristics
*.UTG  N12.4    absolute,  lower  tolerance  The parameter must be empty for
|     |     | limit  |     | attributive characteristics or  |     |
| --- | --- | ------ | --- | ------------------------------- | --- |
MASSANG<>ABSOLUT or OPGEXT=1.
*.UTGREL  N12.4    relative/ percentage, lower  The parameter must be empty for
|     |     | tolerance limit   |     | attributive characteristics or  |     |
| --- | --- | ----------------- | --- | ------------------------------- | --- |
MASSANG=ABSOLUT
*.UTGAKTIV  "0"  or  F  Automatic failure entry  The parameter must be empty for
"1"  attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if single values violate the
tolerance limit.
*.UPG  N12.4    absolute, lower plausibility  The parameter must be empty for
|     |     | limit  |     | attributive characteristics or  |     |
| --- | --- | ------ | --- | ------------------------------- | --- |
MASSANG<>ABSOLUT or OPGEXT=1.
*.UPGREL  N12.4    relative/ percentage, lower  The parameter must be empty for
|     |     | plausibility limit   |     | attributive characteristics or  |     |
| --- | --- | -------------------- | --- | ------------------------------- | --- |
MASSANG=ABSOLUT
*.KARTE:1
C50    Identifier  for  the  first  The following values are valid for variable
|     |     | control chart  |     | characteristics:  |     |
| --- | --- | -------------- | --- | ----------------- | --- |
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"
| *.OEG:1  | N12.4    | upper  action  | limit  of  | the    |     |
| -------- | -------- | -------------- | ---------- | ------ | --- |
first control chart
*.OEGAKTIV:1
"0"  or  F  Automatic failure entry  If the value "1" is transferred to this
"1"  parameter, a failure entry is automatically
generated if the upper action limit is
violated by the statistical value of control
chart 1 (e.g. Xq).
*.OWG:1
|     | N12.4    | upper warning limit of the  |     |     |     |
| --- | -------- | --------------------------- | --- | --- | --- |
first control chart

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 43 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.OWGAKTIV:1 "0" or F Automatic failure entry If the value "1" is transferred to this
"1" parameter, a failure entry is automatically
generated if the upper warning limit is
violated by the statistically calculated
value of control chart 1 (e.g. Xq).
*.MWAVG:1 N12.4 Mean value for the first
control chart
*.UWG:1 N12.4 lower warning limit of the The parameter must be empty for
first control chart attributive characteristics
*.UWGAKTIV:1 "0" or F Automatic failure entry The parameter must be empty for
"1" attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if the lower warning limit is
violated by the statistically calculated
value of control chart 1 (e.g. Xq).
*.UEG:1 N12.4 lower action limit of the The parameter must be empty for
first control chart attributive characteristics
*.UEGAKTIV:1 "0" or F Automatic failure entry The parameter must be empty for
"1" attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if the lower action limit is
violated by the statistically calculated
value of control chart 1 (e.g. Xq).
*.VORG:1 C50 Default value for limit The following values are valid: "CPK",
value calculation "SIGMA", "QUER", "ABW_REL",
"ABW_PROZ"
*.CPK:1 N12.4 CPK default value for limit To calculate Sigma from the defined cpk,
value calculation the upper and lower tolerance limits must
be specified and must be distinguishable.
EIS-CES_82.docx Version: 1.0.23049 Page 44 of 123

HYDRA-CAQ Interface to ERP Systems
*.STATVERT:1 C50 F Unilateral or bilateral The following values are valid:
calculation of limit values "EINS", "ZWEI".
If this parameter has the value "EINS", the
calculation is only performed for either the
upper or the lower action/ warning limits.
This setting is mandatory for attributive
control charts. For R and s control charts,
the upper limit values are calculated in this
case. For Xq control charts, the calculation
performed depends on which tolerance
limit is specified. If the upper and lower
tolerance limit is specified, the upper and
lower warning/ action limits are calculated,
even though "unilateral" was selected.
If this parameter has the value "ZWEI", the
calculation is performed for the upper and
lower action/ warning limits.
*.EWEG:1 C50 F Non-action probability for The following values are valid for unilateral
the action limits control charts:
"1", "1.28", "1.64", "1.96", "2", "2.33",
"2.58", "3", "3.09", "3.72", "4"
The following values are valid for bilateral
control charts:
"1", "1.28", "1.64", "1.96", "2", "2.28",
"2.33", "2.58", "3", "3.09", "3.45", "3.72",
"3.9", "4"
The following values are valid for R and s
charts:
"0.9", "0.95", "0.99"
*.EWWG:1 C50 F Non-action probability for See EWEG:1 parameters
warning limits
*.RELEG:1 N12.4 relative deviation/ The parameter must be empty for
deviation in percent of the KARTE:1<>XQ
action limit(s) of the first
(Xq) control chart from the
target value
EIS-CES_82.docx Version: 1.0.23049 Page 45 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.RELWG:1
N12.4    relative  deviation/  The parameter must be empty for
|     |     | deviation in percent of the    |     | KARTE:1<>XQ  |     |
| --- | --- | ------------------------------ | --- | ------------ | --- |
|     |     | warning limit(s) of the first  |     |              |     |
(Xq) control chart from the
target value
*.QUER:1
|     | N12.4    | Default  | value  for  sq:  | or    |     |
| --- | -------- | -------- | ---------------- | ----- | --- |
|     |          | rather   | for  Rq:         | for   |     |
computing limit values
| *.SIGMA:1  | N12.4    | Sigma  | default  value  | for    |     |
| ---------- | -------- | ------ | --------------- | ------ | --- |
limit value calculation
*.XQVART:1  C50  F  Type of Xq default value  The following values are valid:
|     |     | (for limit value calculation)  |     | "RKXQMITTE", "SOLLWERT",  |     |
| --- | --- | ------------------------------ | --- | ------------------------- | --- |
"TOLMITTE", "VORGABE"
*.VORGXQ:1  N12.4    Default value Xq for limit  For VORGXQ:1<>VORGABE, the
|     |     | value calculation  |     | parameter must be empty.  |     |
| --- | --- | ------------------ | --- | ------------------------- | --- |
*.MOD:BER_WG_1
"0"  or  F  Automatically  calculate  If  the  value  "1"  is  transferred  to  this
"1"  warning limits for the first  parameter, the warning limits for the first
|     |     | control chart  |     | control chart are calculated automatically.  |     |
| --- | --- | -------------- | --- | -------------------------------------------- | --- |
It is not possible to calculate limit values
for the Median chart.
*.MOD:BER_EG_1  "0"  or  F  Automatically  calculate  If  the  value  "1"  is  transferred  to  this
"1"  action  limits  for  the  first  parameter, the action limits for the first
|     |     | control chart  |     | control chart are calculated automatically.  |     |
| --- | --- | -------------- | --- | -------------------------------------------- | --- |
It is not possible to calculate limit values
for the Median chart.
*.KARTE:2  C50  F  Identifier  of  the  second  The following values are valid for variable
|     |     | control chart  |     | characteristics:  |     |
| --- | --- | -------------- | --- | ----------------- | --- |
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"
| *.OEG:2  | N12.4    | upper  action  | limit  of  | the    |     |
| -------- | -------- | -------------- | ---------- | ------ | --- |
second control chart
*.OEGAKTIV:2  "0"  or  F  Automatic failure entry  If the value "1" is transferred to this
parameter, a failure entry is automatically
"1"
generated if the upper action limit is
violated by the statistically calculated
value of control chart 2 (e.g. standard
deviation).

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 46 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.OWG:2 N12.4 Upper warning limit of the
second control chart
*.OWGAKTIV:2 "0" or F Automatic failure entry If the value "1" is transferred to this
"1" parameter, a failure entry is automatically
generated if the upper warning limit is
violated by the statistically calculated
value of control chart 2 (e.g. standard
deviation).
*.MWAVG:2 N12.4 Mean value for the second
control chart
*.UWG:2 N12.4 Lower warning limit of the The parameter must be empty for
second control chart attributive characteristics
*.UWGAKTIV:2 "0" or F Automatic failure entry The parameter must be empty for
"1" attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if the lower warning limit is
violated by the statistically calculated
value of control chart 2 (e.g. standard
deviation).
*.UEG:2 N12.4 Lower action limit of the The parameter must be empty for
second control chart attributive characteristics
*.UEGAKTIV:2 "0" or F Automatic failure entry The parameter must be empty for
"1" attributive characteristics.
If the value "1" is transferred to this
parameter, a failure entry is automatically
generated if the lower action limit is
violated by the statistically calculated
value of control chart 2 (e.g. standard
deviation).
*.VORG:2 C50 F Default value for limit The following values are valid: "CPK",
value calculation "SIGMA", "QUER", "ABW_REL",
"ABW_PROZ"
*.CPK:2 N12.4 CPK default value for limit See CPK:1 parameters
value calculation
*.STATVERT:2 C50 F Unilateral or bilateral See STATVERT:1 parameters
calculation of limit values
EIS-CES_82.docx Version: 1.0.23049 Page 47 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- | --- |

*.EWEG:2
|     |     | C50  F  | Non-action  | probability  | for  See EWEG:1 parameters  |     |     |
| --- | --- | ------- | ----------- | ------------ | --------------------------- | --- | --- |
the action limits
*.EWWG:2  C50  F  Non-action  probability  for  See EWEG:1 parameters
warning limits
*.RELEG:2  N12.4    relative  deviation/  The parameter must be empty for
|     |     |     | deviation in percent of the  |               | KARTE:2<>XQ  |     |     |
| --- | --- | --- | ---------------------------- | ------------- | ------------ | --- | --- |
|     |     |     | action                       | limit(s)  of  | the          |     |     |
second (Xq) control chart
from the target value
*.RELWG:2  N12.4    relative  deviation/  The parameter must be empty for
|     |     |     | deviation in percent of the  |           | KARTE:2<>XQ  |     |     |
| --- | --- | --- | ---------------------------- | --------- | ------------ | --- | --- |
|     |     |     | warning                      | limit(s)  | of  the      |     |     |
second (Xq) control chart
from the target value
| *.QUER:2  |     | N12.4    | Default  | value  for  | sq:  or    |     |     |
| --------- | --- | -------- | -------- | ----------- | ---------- | --- | --- |
|           |     |          | rather   | for  Rq:    | for        |     |     |
computing limit values
| *.SIGMA:2  |     | N12.4    | Sigma  | default  value  | for    |     |     |
| ---------- | --- | -------- | ------ | --------------- | ------ | --- | --- |
limit value calculation
*.XQVART:2
|     |     | C50  F  | Type of Xq default value       |     | The following values are valid:  |     |     |
| --- | --- | ------- | ------------------------------ | --- | -------------------------------- | --- | --- |
|     |     |         | (for limit value calculation)  |     | "RKXQMITTE", "SOLLWERT",         |     |     |
"TOLMITTE", "VORGABE"
*.VORGXQ:2  N12.4    Default value Xq for limit  For VORGXQ:2<>VORGABE, the
|     |     |     | value calculation  |     | parameter must be empty.  |     |     |
| --- | --- | --- | ------------------ | --- | ------------------------- | --- | --- |
*.MOD:BER_WG_2  "0"  or  F  Automatically  calculate  If  the  value  "1"  is  transferred  to  this
|     |     |     | warning  | limits  for  | the  parameter,  | the  warning  | limits  for  the  |
| --- | --- | --- | -------- | ------------ | ---------------- | ------------- | ----------------- |
"1"
|     |     |     | second control chart  |     | second  | control  chart  | are  calculated  |
| --- | --- | --- | --------------------- | --- | ------- | --------------- | ---------------- |
automatically.
It is not possible to calculate limit values
for the Median chart.
*.MOD:BER_EG_2  "0"  or  F  Automatically  calculate  If  the  value  "1"  is  transferred  to  this
"1"  action  limits  for  the  parameter, the action limits for the second
|     |     |     | second control chart  |     | control chart are calculated automatically.  |     |     |
| --- | --- | --- | --------------------- | --- | -------------------------------------------- | --- | --- |
It is not possible to calculate limit values
for the Median chart.
| *.FU:1 to*.FU:5   |     | C50    | Direct user fields  |     |     |     |     |
| ----------------- | --- | ------ | ------------------- | --- | --- | --- | --- |
| *.FU:6 to*.FU:10  |     | N9     | Direct user fields  |     |     |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 48 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| *.FU:11; *.FU:12  | N12.9             | Direct user fields  |     |     |     |
| ----------------- | ----------------- | ------------------- | --- | --- | --- |
| *.FU:13; *.FU:14  | Date              | Direct user fields  |     |     |     |
| 3.2.11            | Inspection plans  |                     |     |     |     |
The following dialogs are available for updating inspection plans:
  CPPL.IFCMARK  to mark inspection plan data prior to modifying them and to then delete
any sub-level data that was not modified (inspection plan criteria)
  CPPL.MODIFY  to create or modify inspection plan header data
Only the data in the header of the inspection plan are updated.
Inspection plan characteristics are modified using the dialog CPPLMM.
  CPPL.INSERT  to create inspection plan header data
Only the data in the header of the inspection plan are updated.
Inspection plan characteristics are modified using the dialog CPPLMM.
  CPPL.UPDATE  to modify inspection plan header data
Only the data in the header of the inspection plan are updated.
Inspection plan characteristics are modified using the dialog CPPLMM.
|   CPPL.COPY  |   to copy inspection plans  |     |     |     |     |
| ------------- | --------------------------- | --- | --- | --- | --- |
(including all sub-level data, such as inspection plan characteristics)
|   CPPL.DELETE  |   to delete inspection plans  |     |     |     |     |
| --------------- | ----------------------------- | --- | --- | --- | --- |
(including all sub-level data, such as inspection plan characteristics)
The inspection plan's unique key is made up of the fields CPPL.RECTYP, CPPL.BER, CPPL.PPLID and
CPPL.PPLIDX.
To illustrate the user fields completed in the interface in HYDRA, the user fields must have been
configured accordingly (object = "CPPL"; user field key = CPPL:RECTYP).
WARNING!  HYDRA-CAQ provides the option to copy the user fields of the inspection plan to
the  inspection  requirement  when  you  create  an  inspection  requirement.  This
functionality  is  controlled  in  an  option  (option  1058).  If  this  functionality  is
activated, you must guarantee that the numbers of the user fields of inspection
plan and inspection requirement are identical.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 49 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
Example: The interface populates the user fields CPPL.FU:1 to CPPL:FU:14 of the
inspection plan header. User fields CPAN.FU:1 to CPAN.FU:14 are
passed to the inspection requirements. As a result, user fields 1 to 14
are shown in an inspection requirement based on an inspection plan.
In this case, when configuring the user fields, make sure that the field
types for the user fields 1 to 14 in both the inspection plans and in the
inspection requirements match.
3.2.11.1 General notes about processing inspection plan data
 If an inspection plan has already been used in HYDRA to create an inspection requirement, it
may no longer be edited or deleted. This applies to the same extent to the corresponding
inspection plan characteristics and documents.
This function cannot be bypassed. In a case such as this, an inspection plan must be created
(for example with a new inspection plan index). If necessary, this process can be automated
using inspection plan version management.
 If an inspection plan was activated (CPPL.AKTIV=1), it may also not be modified. Also, no
inspection plan characteristics and documents of this inspection plan may be modified either.
However, this function can be bypassed with the parameter CPPL.NOACTIVECHK=1.
If necessary, inspection plan version management can be used to copy the current inspection
plan. Changes are then made to the copy.
 An inspection plan can only be activated (CPPL.AKTIV=1) if it has been released
(CPPL.FREI=1).
However, this function can be bypassed with the parameter CPPL.NOACTIVECHK=1.
 An inspection plan can only be released (CPPL.FREI=1) if at least one inspection plan
characteristic has been assigned to it.
However, this function can be bypassed with the parameter CPPL.NOACTIVECHK=1.
 If the system has been appropriately configured, as soon as one inspection plan is activated, all
other inspection plans with the same header data (RECTYP, BER, ATK, ATKIDX, KDNR,
LIEFNR, HERSTNR, AGNR, AGBEZ, PPLAGCFG) will be deactivated.
EIS-CES_82.docx Version: 1.0.23049 Page 50 of 123

HYDRA-CAQ Interface to ERP Systems
3.2.11.2 Inspection plan version management
The inspection plan version management is an option allowing the inspection plan update via an interface
to be automated and to automatically manage the versions of an inspection plan. Version management
can be activated with the dialog *.MODIFY for inspection plans, inspection plan characteristics and the
corresponding documents using the parameter *.MOD:VERSMAN=1.
Version management can only be used if the inspection plan index has a standard structure. This
structure is described by HYDRA-CAQ option 1053. In the search for the highest inspection plan index,
only those inspection plans are considered with an inspection plan index structure matching the sample of
option 1053. If this option is not defined or its content is empty, then version management is not used.
In order to identify the inspection plan, only the parameters *.RECTYP, *.BER and *.PPLID must be
transferred. The current inspection plan version is calculated automatically, which is why the parameters
*.PPLIDX and *.PPLNR are not required.
If, however, they are transferred, version management is not used.
If no inspection plan was found to be copied, then a new inspection plan is created. To create a new
inspection plan, you require the CPPL.MODIFY dialog, because the header data of the inspection plan
being created is not known for the inspection plan characteristics and the inspection plan documents.
In this case, the dialogs CPPLMM.MODIFY and CPPLDOK.MODIFY are canceled and an error is issued.
In the following examples, a sequence is shown that avoids problems at this point with a CPPL.MODIFY
that was executed beforehand.
If the current inspection plan is already activated or if it is used in an inspection requirement, it is copied
and the changes are made to the copy. This copy is given a new, the next highest, inspection plan index.
Release and activation are reset in the new version. The copied inspection plan can then be
released/activated manually or, after all changes have been made, this can be performed by the
interface.
The functions described above are illustrated in the following flow chart:
EIS-CES_82.docx Version: 1.0.23049 Page 51 of 123

HYDRA-CAQ Interface to ERP Systems
3.2.11.3 Example of importing inspection plan data once (safe
method)
1. In this example, inspection plans are created by first writing header data. However, these are
created without a release and without an activation
DLG=CPPL.MODIFY|…|CPPL.FREI=0|CPPL.AKTIV=0|…|CPPL.NOACTIVECHK=0
2. Then, all of the characteristics and documents that belong to the inspection plan are created.
DLG=CPPLDOK.MODIFY|…|CPPLDOK.NOACTIVECHK=0
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=10|…|CPPLMM.NOACTIVECHK=0
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=10|…|CPPLDOK.NOACTIVECHK=0
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=20|…|CPPLMM.NOACTIVECHK=0
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=20|…|CPPLDOK.NOACTIVECHK=0
: :
EIS-CES_82.docx Version: 1.0.23049 Page 52 of 123

HYDRA-CAQ Interface to ERP Systems
3. Finally, the inspection plan that is now complete can be released and activated. This step, of
course, is optional and is only advisable provided that no inspection plans were manually
activated.
DLG=CPPL.MODIFY|…|CPPL.FREI=1|CPPL.AKTIV=1|…|CPPL.NOACTIVECHK=0
3.2.11.4 Example of importing inspection plan data once (quick
method)
1. In this example, inspection plans are created by creating header data first. Any release or
activation is made in this case immediately. To prevent potential error messages, the parameter
CPPL.NOACTIVECHK=1 is set.
DLG=CPPL.MODIFY|…|CPPL.FREI=1|CPPL.AKTIV=1|…|CPPL.NOACTIVECHK=1
2. Then, all of the characteristics and documents that belong to the inspection plan are created. In
this case as well, any error message is suppressed with the parameter CPPL.NOACTIVECHK=1.
DLG=CPPLDOK.MODIFY|…|CPPLDOK.NOACTIVECHK=1
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=10|…|CPPLMM.NOACTIVECHK=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=10|…|CPPLDOK.NOACTIVECHK=1
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=20|…|CPPLMM.NOACTIVECHK=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=20|…|CPPLDOK.NOACTIVECHK=1
: :
WARNING!! By suppressing error messages, what may happen when importing inspection plan
data this way is that released and active inspection plans exist without
characteristics.
3.2.11.5 Example of a permanent inspection plan interface with
version management
For the example described below, to identify the inspection plan, only the parameters *.RECTYP, *.BER
and *.PPLID are required. The parameter *.PPLIDX can be omitted by using version management. In
addition, the parameter *.NOACTIVECHK=0 must be transferred in all dialogs.
EIS-CES_82.docx Version: 1.0.23049 Page 53 of 123

HYDRA-CAQ Interface to ERP Systems
1. First, inspection plans are created or modified by writing header data. However, they are not
released or activated. This step is required in order to configure the necessary header data in the
event that a new inspection plan needs to be created (if a search for a current version fails).
DLG=CPPL.MODIFY|…|CPPL.FREI=0|CPPL.AKTIV=0|…|CPPL.MOD:VERSMAN=1
2. Then, all of the characteristics and documents that belong to the inspection plan are created or
modified.
DLG=CPPLDOK.MODIFY|…|CPPLDOK.NOACTIVECHK=0
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=10|…|CPPLMM.MOD:VERSMAN=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=10|…|CPPLDOK.MOD:VERSMAN=1
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=20|…|CPPLMM.MOD:VERSMAN=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=20|…|CPPLDOK.MOD:VERSMAN=1
: :
3. Finally, the inspection plan that is now complete can be released and activated. This step, of
course, is optional and is only advisable provided that no inspection plans were manually
activated.
DLG=CPPL.MODIFY|…|CPPL.FREI=1|CPPL.AKTIV=1|…|CPPL.MOD:VERSMAN=1
3.2.11.6 Example of a permanent inspection plan interface
without version management
1. In this example, all of the data assigned to the inspection plan (characteristics and documents) are
highlighted first.
DLG=CPPL.IFCMARK|CPPL.MOD=MARK|…
2. Then, the inspection plan header data is modified. In the process, release and activation can be set
at the same time. To prevent any error messages, the parameter CPPL.NOACTIVECHK=1 is set.
DLG=CPPL.MODIFY|…|CPPL.FREI=1|CPPL.AKTIV=1|…|CPPL.NOACTIVECHK=1
3. Now, all of the characteristics and documents that belong to the inspection plan are created or
modified. What is important for this method is that all characteristics are always written, even those
that were not modified. Any error message is again suppressed with the parameter
CPPL.NOACTIVECHK=1.
EIS-CES_82.docx Version: 1.0.23049 Page 54 of 123

HYDRA-CAQ Interface to ERP Systems
DLG=CPPLDOK.MODIFY|…|CPPLDOK.NOACTIVECHK=1
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=10|…|CPPLMM.NOACTIVECHK=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=10|…|CPPLDOK.NOACTIVECHK=1
DLG=CPPLMM.MODIFY|…|CPPLMM.AFO=20|…|CPPLMM.NOACTIVECHK=1
DLG=CPPLDOK.MODIFY|…|CPPLDOK.AFO=20|…|CPPLDOK.NOACTIVECHK=1
: :
4. In the last step, all of the sub-data that has not been edited (characteristics and documents) are
deleted.
DLG=CPPL.IFCMARK|CPPL.MOD=DELMARK|…
WARNING!! In step 4 of this method, any documents that were created manually are deleted as
well.
By suppressing error messages, what may happen when importing inspection plan
data this way is that released and active inspection plans exist without
characteristics.
3.2.11.7 Field definitions
Dialog: CPPL.*
Parameter Type Mand Contents Description
atory
*.RECTYP "FEP", K/M/I/ Data type of inspection FEP = In-production inspection
"WEP", U/C/D plan plan
WEP = Goods receipt inspection
"WAP",
WAP = Goods issue inspection
"EMU"
plan
EMU = Initial sample inspection
plan
EIS-CES_82.docx Version: 1.0.23049 Page 55 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.BER
|     |     | C10  K/M/I/ | Area for which the        |     | An area with the corresponding  |     |
| --- | --- | ----------- | ------------------------- | --- | ------------------------------- | --- |
|     |     | U/C/D       | inspection plan applies.  |     | area ID must exist in HYDRA.    |     |

By default, these are:
E = Goods receipt
F = Production
A = Goods issue
EMU = Initial sample
| *.PPLID  |     | C50  K/M/I/ | Inspection plan number  |     |     |     |
| -------- | --- | ----------- | ----------------------- | --- | --- | --- |
U/C/D
| *.PPLIDX  |     |             | Inspection plan index  |     | For CPPL.MODIFY only the             |     |
| --------- | --- | ----------- | ---------------------- | --- | ------------------------------------ | --- |
|           |     | C50  K/(M)/ |                        |     |                                      |     |
|           |     | (I)/(U)     |                        |     | mandatory field if the parameter is  |     |
|           |     | /C/D        |                        |     | CPPL.MOD:VERSMAN=0.                  |     |
*.RECTYP:Z  "FEP",  C  Data type of inspection  This parameter is only needed for
|     |     |     | plan (copy destination)  |     | CPPL.COPY.  |     |
| --- | --- | --- | ------------------------ | --- | ----------- | --- |
"WEP",
"WAP",
FEP = In-production inspection
|     |     | "EMU"  |     |     | plan  |     |
| --- | --- | ------ | --- | --- | ----- | --- |
WEP = Goods receipt inspection
WAP = Goods issue inspection
plan
EMU = Initial sample inspection
plan
Inspection plans may only be
copied within one data type in
order to avoid problems with
changing types of data collection.
*.BER:Z
C10  C  Area for which the  This parameter is only needed for
|     |     |     | inspection plan applies  |     | CPPL.COPY.  |     |
| --- | --- | --- | ------------------------ | --- | ----------- | --- |
(copy destination).
An area with the corresponding
area ID must exist in HYDRA.
| *.PPLID:Z  |     | C50  C  | Inspection plan number  |     |     |     |
| ---------- | --- | ------- | ----------------------- | --- | --- | --- |
This parameter is only needed for
(copy destination)
CPPL.COPY.
| *.PPLIDX:Z  |     | C    | Inspection  | plan  index  |                                    |     |
| ----------- | --- | ---- | ----------- | ------------ | ---------------------------------- | --- |
|             |     | C50  |             |              | This parameter is only needed for  |     |
(copy destination)
CPPL.COPY.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 56 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.MOD
C50  K  CPPL.IFCMARK method  This parameter is only needed for
|     |     | mode  |     | CPPL.IFCMARK.  |     |
| --- | --- | ----- | --- | -------------- | --- |
This parameter determines how the
dialog functions. The following
values are available:
"MARK" – all of the data assigned
to the inspection plan
(characteristics and
documents) are highlighted
"UNMARK" – highlighting is
removed
"DELMARK" – all of the data still
highlighted (characteristics
and documents) are deleted
*.NOACTIVECHK  "0" or "1"  F  Parameter  that  If this parameter has the value "1",
|     |     | determines              | whether     | a  no check for release or for            |     |
| --- | --- | ----------------------- | ----------- | ----------------------------------------- | --- |
|     |     | check  should           | run  after  | activation is run. Otherwise, an          |     |
|     |     | the  inspection         | plan        | is  error message is issued if an active  |     |
|     |     | released or activated.  |             | inspection plan should be modified        |     |
or if an inspection plan that has not
been released should be activated.
*.MOD:VERSMAN
"0" or "1"  M/I/U  Parameter  specifying  This parameter is only needed for
|     |     | whether inspection plan  |             | CPPL.MODIFY.  |     |
| --- | --- | ------------------------ | ----------- | ------------- | --- |
|     |     | version                  | management  |               |     |
If this parameter has the value "1",
should be activated.
inspection plan version
management is activated.
*.ATK  C50    Article number  An article with the corresponding
combination of article number and
drawing issue number must exist in
HYDRA.
In the event of an inspection plan
for an article group, the number of
the article group is entered here
(see section "article catalog")

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 57 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.ATKIDX
|     |     | C50    | Drawing  issue  | number  An article with the corresponding  |     |
| --- | --- | ------ | --------------- | ------------------------------------------ | --- |
|     |     |        | of the article  | combination of article number and          |     |
drawing issue number must exist in
HYDRA.
If required, the drawing issue
number may be left empty.
In the event of an inspection plan
for the article group, the drawing
issue number must be left empty.
*.KDNR  C50    Customer number  For RECTYP=WEP, the parameter
must be empty.
A customer with the corresponding
customer number must exist in
HYDRA.
*.HERSTNR  C50    Manufacturer number  For  RECTYP<>WEP,  the
parameter must be empty.
A manufacturer with the
corresponding manufacturer
number must exist in HYDRA.
*.LIEFNR
|     |     | C50    | Supplier number  | A supplier with the corresponding  |     |
| --- | --- | ------ | ---------------- | ---------------------------------- | --- |
supplier number must exist in
HYDRA.
| *.AGNR  |     | C50    | Operation number  |     |     |
| ------- | --- | ------ | ----------------- | --- | --- |
For RECTYP=EMU, the parameter
must be empty.
| *.AGBEZ  |     | C250    | Operation  |     |     |
| -------- | --- | ------- | ---------- | --- | --- |
For RECTYP=EMU, the parameter
designation/name
must be empty.
| *.ZEICHNNR  |     | C250    | Drawing number  |     |     |
| ----------- | --- | ------- | --------------- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 58 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.EMUFORM
|     |     | C50  F  | Identifier of the  | For  RECTYP<>EMU,         | the  |
| --- | --- | ------- | ------------------ | ------------------------- | ---- |
|     |     |         | corresponding EMU  | parameter must be empty.  |      |
form
An EMU form with the
corresponding abbreviation must
be defined in HYDRA (status type
"EMUFORM"). The default types
are listed below:
  "VDA24"

*.FREI
|            |     | "0" or "1"  F  | Inspection plan release  |     |     |
| ---------- | --- | -------------- | ------------------------ | --- | --- |
| *.FREIDAT  |     | Date           | Date of inspection plan  |     |     |
release
| *.FREIVON  |     | C50    | Person who released  |     |     |
| ---------- | --- | ------ | -------------------- | --- | --- |
the inspection plan
| *.AKTIV     |     | "0" or "1"  F  | Activate inspection plan  |     |     |
| ----------- | --- | -------------- | ------------------------- | --- | --- |
| *.GUELTVON  |     | Date           | Date of validity from     |     |     |
| *.GUELTBIS  |     | Date           | Date of validity until    |     |     |
*.PPLAGCFG  C50  F  Parameter specifying at  For RECTYP=EMU the parameter
|     |     |     | which level operations  | must always have the value  |     |
| --- | --- | --- | ----------------------- | --------------------------- | --- |
|     |     |     | are defined             | PPL1AG.                     |     |
The parameter used here must be
defined in HYDRA. Possible
values:
  "PPL1AG" – for each operation
there is exactly one inspection
plan
  "PPLxAG" – there is an
inspection plan for all
operations
For the default configuration, the
setting "PPLxAG" is to be used as
the default configuration. Parameter
"PPL1AG" must not be used without
prior consultation.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 59 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

*.QMAGCR
|     |     | C50    | Generate  operations,  | if    "NONE" - When generating  |     |     |
| --- | --- | ------ | ---------------------- | -------------------------------- | --- | --- |
|     |     |        | required               | new inspection requirements      |     |     |
the structure of working plans
is not changed and no new
"true" QM OPs are created.
|     |     |     |     |   "PAN_CREATE“  |      | –  When     |
| --- | --- | --- | --- | ---------------- | ---- | ----------- |
|     |     |     |     | generating       |      | inspection  |
|     |     |     |     | requirements,    | new  | true  QM    |
OPs are created, if needed.

*.MERKAKT
|     |     | C50    | Generation of inspection   |   "PAN_CREATE“ –         |     |     |
| --- | --- | ------ | -------------------------- | ------------------------- | --- | --- |
|     |     |        | steps and characteristics  | Corresponding inspection  |     |     |
steps and characteristics are
assigned to all operations
upon generation of an
inspection requirement.
  "AG_AN“ – Inspection steps
and corresponding
characteristics are generated
when logging on an operation.
This configuration is only important
|     |     |     |     | for  cases    | when                | inspection  |
| --- | --- | --- | --- | ------------- | ------------------- | ----------- |
|     |     |     |     | requirements  | and  corresponding  |             |
|     |     |     |     | inspection    | steps  are          | created     |
because operations are logged on
|     |     |     |     | or order statuses are changed.  |     |     |
| --- | --- | --- | --- | ------------------------------- | --- | --- |
This parameter is irrelevant for the
|     |     |     |     | direct  generation  | of  | inspection  |
| --- | --- | --- | --- | ------------------- | --- | ----------- |
requirements (manually or via the
|     |     |     |     | interface).  | As  in  | this  case,  |
| --- | --- | --- | --- | ------------ | ------- | ------------ |
characteristics are always created
|     |     |     |     | along  | with  the  generation  | of  |
| --- | --- | --- | --- | ------ | ---------------------- | --- |
inspection requirements.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 60 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.PAUPPLATZ C50 F Parameter used for The parameter used here must be
splitting inspection steps defined in HYDRA. Possible
by inspection stations values:
 "PAU1PP" – one inspection
step is generated for all
inspection stations
 "PAUxPP" – one inspection
step is generated for each
inspection station
*.NESTZUORD C50 F Parameter used to For RECTYP=EMU the parameter
assign cavity information must always have the value
KEINE.
The parameter used here must be
defined in HYDRA. Possible
values:
 "KEINE" – no cavities are
assigned
 "STICHPROBE" – the cavities
are assigned to the sample
This value must only be used if
inspection points are in use (by
default with
CPPL.RECTP=FEP)
*.PAUAKTION C50 F Parameter for releasing The parameter used here must be
inspection steps defined in HYDRA. Possible
values:
 "PAUERST" – the inspection
steps are created, but not
released
 "PAUFREI" – the inspection
steps are created and
immediately released
EIS-CES_82.docx Version: 1.0.23049 Page 61 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

*.PRUEFART
C50  F  Type of characteristic  The parameter used here must be
|     |     |     | change during the  | defined in HYDRA. Possible  |     |     |
| --- | --- | --- | ------------------ | --------------------------- | --- | --- |
|     |     |     | inspection         | values:                     |     |     |
  "MERKMAL" – the inspection
is performed by characteristic
  "STUECK" – piece-related
inspection is done
This value must not be used
together with
CPPL.NESTZUORD=STICHP
ROBE
*.DYNART
|     |     | C50  F  | Type of dynamic  | This parameter must be empty for     |     |     |
| --- | --- | ------- | ---------------- | ------------------------------------ | --- | --- |
|     |     |         | modification     | data types that are not dynamic (by  |     |     |
default: FEP, EMU).
The parameter entered here must
be defined in HYDRA. Possible
values:
  "KEINE" – nothing is
dynamically modified
  "LOS" – dynamic modification
|     |     |     |     | is  performed  | at  batch  | level  |
| --- | --- | --- | --- | -------------- | ---------- | ------ |
(inspection requirements)
|     |     |     |     |   "MERKMAL"  | –  dynamic     |     |
| --- | --- | --- | --- | ------------- | -------------- | --- |
|     |     |     |     | modification  | is  performed  | at  |
characteristics level
*.DYUEBERG  C50  F  Transitional definition for  For DYNART<>LOS, the
|     |     |     | dynamic modification  | parameter must be empty.  |     |     |
| --- | --- | --- | --------------------- | ------------------------- | --- | --- |
The transitional definition entered
here must be defined in HYDRA.
Default value is "DIN_ISO".
*.DYPSCHARF:STA  C50  F  Initial inspection severity  For DYNART<>LOS, the
|     |     |     | for dynamic modification  | parameter must be empty.  |     |     |
| --- | --- | --- | ------------------------- | ------------------------- | --- | --- |
The inspection severity entered
here must be known in the
inspection severity definition
assigned to the transitional
definition.
| *.FU:1 to*.FU:5  |     | C50    | Direct user fields  |     |     |     |
| ---------------- | --- | ------ | ------------------- | --- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 62 of 123  |     |
| ---------------- | --- | --- | ------------------- | --- | --------------- | --- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

| *.FU:6 to*.FU:10  |                                  | N9     |   Direct user fields  |     |     |     |
| ----------------- | -------------------------------- | ------ | --------------------- | --- | --- | --- |
| *.FU:11; *.FU:12  |                                  | N12.9  |   Direct user fields  |     |     |     |
| *.FU:13; *.FU:14  |                                  | Date   |   Direct user fields  |     |     |     |
| 3.2.12            | Inspection plan characteristics  |        |                       |     |     |     |
The following dialogs are available for updating inspection plans:
  CPPLMM.MODIFY  to create or change inspection plan characteristics
|   CPPLMM.INSERT  |     |     | to create inspection plan characteristics  |     |     |     |
| ----------------- | --- | --- | ------------------------------------------ | --- | --- | --- |
|   CPPLMM.UPDATE  |     |     | to change inspection plan characteristics  |     |     |     |
|   CPPLMM.DELETE  |     |     | to delete inspection plan characteristics  |     |     |     |
The  inspection  plan's  unique  key  is  made  up  of  the  fields  CPPLMM.RECTYP,  CPPLMM.BER,
CPPLMM.PPLID, CPPLMM.PPLIDX and CPPLMM.AFO.
Before creating or changing inspection plan characteristics, you must make sure that the corresponding
inspection plan already exists.
Dialog: CPPLMM.*
|     |     | Type  | Mandator | Contents  | Description  |     |
| --- | --- | ----- | -------- | --------- | ------------ | --- |
Parameter
y
*.RECTYP  "FEP",  M/I/U/D  Data type of  FEP = In-production inspection plan
|     |     | "WEP",  |     | inspection plan  | WEP = Goods receipt inspection  |     |
| --- | --- | ------- | --- | ---------------- | ------------------------------- | --- |
WAP = Goods issue inspection plan
"WAP",
EMU = Initial sample inspection plan
"EMU"
*.BER  C10  M/I/U/D  Area for which the  An area with the corresponding area
|     |     |     |     | inspection plan  | ID must exist in HYDRA.  |     |
| --- | --- | --- | --- | ---------------- | ------------------------ | --- |
applies.
| *.PPLID  |     | C50  | M/I/U/D  | Inspection plan  |     |     |
| -------- | --- | ---- | -------- | ---------------- | --- | --- |
number

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 63 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.PPLIDX
|     |     |     | (M)/  | Inspection plan  | For CPPLMM.MODIFY only the  |     |
| --- | --- | --- | ----- | ---------------- | --------------------------- | --- |
C50
|        |     |     | (I)/     | index          | mandatory field if the parameter is  |     |
| ------ | --- | --- | -------- | -------------- | ------------------------------------ | --- |
|        |     |     | (U)/D    |                | CPPLMM.MOD:VERSMAN=0.                |     |
| *.AFO  |     |     | M/I/U/D  | Work sequence  | The work sequence number             |     |
N9
|     |     |     |     | (operation        | determines the sequence of the         |     |
| --- | --- | --- | --- | ----------------- | -------------------------------------- | --- |
|     |     |     |     | sequence) of the  | characteristics. It must be unique in  |     |
|     |     |     |     | characteristic    | the inspection plan.                   |     |
*.NOACTIVECHK  "0" or "1"  M/I  Parameter  If this parameter has the value "1",
|     |     |     |     | specifying whether    | no check for activation is run.      |     |
| --- | --- | --- | --- | --------------------- | ------------------------------------ | --- |
|     |     |     |     | a check should run    | Otherwise, an error message is       |     |
|     |     |     |     | after the inspection  | issued if an active inspection plan  |     |
|     |     |     |     | plan is activated.    | should be modified.                  |     |
*.MOD:VERSMAN  "0" or "1"  M/I/U  Parameter  This parameter is only needed for
|     |     |     |     | specifying whether  | CPPLMM.MODIFY.  |     |
| --- | --- | --- | --- | ------------------- | --------------- | --- |
inspection plan
If this parameter has the value "1",
version
inspection plan version management
management
is activated.
should be
activated.
| *.AGNR  |     |      |     |                   | For RECTYP=EMU, the parameter  |     |
| ------- | --- | ---- | --- | ----------------- | ------------------------------ | --- |
|         |     | C50  |     | Operation number  |                                |     |
must always be empty.
| *.AGBEZ  |     | C250  |     | Operation         | For RECTYP=EMU, the parameter  |     |
| -------- | --- | ----- | --- | ----------------- | ------------------------------ | --- |
|          |     |       |     | designation/name  | must always be empty.          |     |
*.CMMNR    Characteristic  If this parameter is specified, a
C50
|     |     |     |     | number  | characteristic with the same number  |     |
| --- | --- | --- | --- | ------- | ------------------------------------ | --- |
must exist in the characteristics
catalog.
*.MMBEZ  C250    Characteristic  The characteristic designation/name
|     |     |     |     | designation/name  | may be different from the  |     |
| --- | --- | --- | --- | ----------------- | -------------------------- | --- |
designation/name in the
characteristics catalog.
*.PPLATZ
|     |     | C50  |     | Inspection station  | If this parameter is specified, a  |     |
| --- | --- | ---- | --- | ------------------- | ---------------------------------- | --- |
respective inspection station must be
defined in HYDRA.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 64 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.MMTYP C50 F Characteristic type For RECTYP=EMU the parameter
must always have the value
PRODUKT.
The parameter used here must be
defined in HYDRA. Possible values:
 "PRODUKT" – Product
characteristic
 "PROZESS" – Process
characteristic
*.ERFART "MANUELL" F Fixed identifier for
CAQ
characteristics
*.MUSSPRF "0" or "1" F Mandatory For RECTYP=EMU the parameter
inspection must always have the value 0.
If this parameter has the value 1, an
inspection step cannot be completed
until at least one measured value
was recorded for this characteristic.
*.BFORMEL C250 Formula If this parameter is completed with a
value, then the characteristic's
values will be calculated based on
the formula defined here. In this
case, it might not be possible to
enter measured values for this
characteristic manually (depends on
the type of formula).
Refer to the corresponding
documentation to see the structure of
a formula of this kind.
EIS-CES_82.docx Version: 1.0.23049 Page 65 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

| *.QDETAIL  |     |      |     |                | For RECTYP=EMU the parameter  |     |
| ---------- | --- | ---- | --- | -------------- | ----------------------------- | --- |
|            |     | C50  | F   | Source of the  |                               |     |
must always have the value
characteristic detail
PPLMER.
The parameter used here must be
defined in HYDRA. Possible values:
  "PPLMER" –  Details are defined
here in the inspection plan
characteristic
  "MERKAT" – Details are taken
from the characteristics catalog
(to do this, the parameter
CMMNR must be completed)
*.QSPEZ
|     |     | C50  | F   | Source of the   | For RECTYP=EMU the parameter  |     |
| --- | --- | ---- | --- | --------------- | ----------------------------- | --- |
|     |     |      |     | specifications  | must always have the value    |     |
PPLMER.
The parameter used here must be
defined in HYDRA. Possible values:
  "PPLMER" –  Specifications are
defined here in the inspection
plan characteristic
  "MERKAT" – Specifications are
pulled from the characteristics
catalog (to do this, the
parameter CMMNR must be
filled)
  "LISTE" – Specifications are
taken from the specification list
(to do this, the parameter
CMMNR must be filled)
| *.PRUEFTYP  |     |      |     |               | For QDETAIL<>PPLMER, the  |     |
| ----------- | --- | ---- | --- | ------------- | ------------------------- | --- |
|             |     | C50  | F   | Type of data  |                           |     |
|             |     |      |     | collection    | parameter must be empty   |     |
The parameter used here must be
defined in HYDRA. Possible values:
  "A" - attributive
  "V" - variable
  "F" – inspection chart (chart of
recorded defects )

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 66 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.ERFASSDET C50 Kind of input This parameter is only available as of
(inspection) type CAQ 8.2.
The parameter used here must be
defined in HYDRA. Possible values:
 "“ – Standard
 "RASTER“ – Visual defects
recording
 only supported with
CPPLMM.PRUEFTYP=F
 "CODE“ – based on catalogs
 only supported with
CPPLMM.PRUEFTYP=A
 "CODE_ZUFALL“ – based on
catalogs (random)
 only supported with
CPPLMM.PRUEFTYP=A
*.BEWKAUSWMEN:1 C10 Selected set for This parameter is only available as of
assessment CAQ 8.2.
catalog
This parameter is only supported
with CPPLMM.ERFASSDET=CODE
or
CPPLMM.ERFASSDET=CODE_ZUF
ALL.
*.PRFRASTER:X C250 Grid of x-axis This parameter is only available as of
CAQ 8.2.
This parameter is only supported
with
CPPLMM.ERFASSDET=RASTER
The identifiers of the grid must be
separated by comma.
*.PRFRASTER:Y C250 Grid of y-axis This parameter is only available as of
CAQ 8.2.
This parameter is only supported
with
CPPLMM.ERFASSDET=RASTER
The identifiers of the grid must be
separated by comma.
EIS-CES_82.docx Version: 1.0.23049 Page 67 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.PMID
|     |     | C50  |     | Type PRM (test   | For QDETAIL<>PPLMER, the  |     |
| --- | --- | ---- | --- | ---------------- | ------------------------- | --- |
|     |     |      |     | equipment/gage)  | parameter must be empty   |     |
resource to be
If this parameter is specified, a
used
respective PRM (test
equipment/gage) type resource must
be defined in HYDRA.
If this entry is used, the parameter
CPPLMM.RESFAM must be empty.
*.RESFAM      Resource family to  If this parameter is specified, a
|     |     |     |     | be used  | respective resource family must be  |     |
| --- | --- | --- | --- | -------- | ----------------------------------- | --- |
defined in HYDRA.
If this entry is used, the parameter
CPPLMM.PMID must be empty.
*.OPT:PLAN  M or G  F  M = machine, G =  Defined here is whether the
|     |     |     |     | machine group  | scheduling is made on a machine/  |     |
| --- | --- | --- | --- | -------------- | --------------------------------- | --- |
workplace or on a machine/
workplace group. For
RECTYP<>EMU, the parameter
must always have the value 0.
M is the initial assignment If this
parameter has the value 1, this
characteristic will be transferred into
non-EMU inspection plans.
*.MNR  C50    Planning on a  If this parameter is specified, a
|     |     |     |     | machine/ a  | respective workplace must be  |     |
| --- | --- | --- | --- | ----------- | ----------------------------- | --- |
|     |     |     |     | workplace   | defined in HYDRA.             |     |
The QM operation generated for this
characteristic can only be logged on
to the specified machine and
inspected on it.
*.MGRP  C  20    Planning on a  If this parameter is specified, a
|     |     |     |     | machine group/ a  | respective workplace group must be  |     |
| --- | --- | --- | --- | ----------------- | ----------------------------------- | --- |
|     |     |     |     | workplace group   | defined in HYDRA.                   |     |
The QM operation generated for this
characteristic can be found in the
sequencing list for all machines/
workplaces belonging to this group.
As such, it can be inspected at all
machines with this group reference.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 68 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.ZERTPRN C50 F Certificate printing For QDETAIL<>PPLMER, the
parameter must be empty
The ID entered here must be defined
in HYDRA. Default values are:
 "NIE" – never print
 "AUSW" – selectable
 "IMMER" – always print
*.ERRGEW C50 F Failure weighting For QDETAIL<>PPLMER, the
parameter must be empty
The error weighting entered here
must be defined in HYDRA. Default
values are:
 "NEBEN" – Minor defect
 "HAUPT" – Major defect
 "KRIT" – Critical defect
*.BPRUEFERG C50 Inspection result Specifies the basis for identifying the
base inspection result of the characteristic.
 NCD_ALL = inspection result is
calculated over all samples
 NCD_LAST = inspection result
is calculated from the last
sample
*.ANAUSNR C50 Analysis selection If this parameter is specified, a
catalog respective analysis selection catalog
must be defined in HYDRA.
*.KEINNEST "0" or "1" F No cavity-related For QDETAIL<>PPLMER or
inspection RECTYP=EMU, the parameter must
have the value 0.
If this parameter has the value 1,
then this characteristic, as opposed
to the settings in the inspection plan
header, will not be inspected with
regard to cavities.
*.EMUMMTYP C50 F Characteristics For RECTYP<>EMU, the parameter
category for initial must be empty.
sample A characteristics category with the
characteristics. corresponding abbreviation must be
defined for the initial sample form
specified in the inspection plan
header. The standard types for them
EIS-CES_82.docx Version: 1.0.23049 Page 69 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

as per VDA volume 2, 4th edition,
are listed below:
  MASS for measurement test
  FUNKTION for function test
  WERKSTOFF for material test
  HAPTIK for haptic test
  AKUSTIK for acoustic test
  GERUCH for odor test
  AUSSEHEN for exterior
appearance test / visual test
  OBERFLAECHE for surface test
  EMV for EMC test
  ZUVERLAESSIG for reliability
test
The categories are EMUTYP_VDA24
type status entries
*.DYNAM  "0" or "1"  F  Will the  For DYNART<>MERKMAL (in the
|     |     |     |     | characteristic be  | corresponding inspection plan     |     |
| --- | --- | --- | --- | ------------------ | --------------------------------- | --- |
|     |     |     |     | dynamically        | header data), the parameter must  |     |
|     |     |     |     | modified?          | have the value 0.                 |     |
If this parameter has the value 1, this
characteristic will be dynamically
modified.
*.DYUEBERG  C50  F  Transitional  For DYNART<>MERKMAL (in the
|     |     |     |     | definition for  | corresponding inspection plan        |     |
| --- | --- | --- | --- | --------------- | ------------------------------------ | --- |
|     |     |     |     | dynamic         | header data), the parameter must be  |     |
|     |     |     |     | modification    | empty.                               |     |
The transitional definition entered
here must be defined in HYDRA.
Default value is "DIN_ISO".
| *.DYNORM  |     | C50  | F   | Dynamic            | For DYNART<>KEINE (in the      |     |
| --------- | --- | ---- | --- | ------------------ | ------------------------------ | --- |
|           |     |      |     | modification norm  | corresponding inspection plan  |     |
header data), the parameter must be
empty.
The transitional definition entered
here must be defined in HYDRA.
Default values are:
"ISO_3951" –variable
"ISO_2859" - attributive
*.PNIVEAU  C50  F  Inspection level of  For DYNART<>KEINE (in the
|     |     |     |     | the dynamic  | corresponding inspection plan  |     |
| --- | --- | --- | --- | ------------ | ------------------------------ | --- |
header data), the parameter must be

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 70 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
modification norm empty.
The inspection level entered here
must be defined for the
corresponding dynamic modification
norm. Default values are:
"I" *1 *2
"II" *1 *2
"III" *1 *2
"S-1" *1
"S-2" *1
"S-3" *1 *2
"S-4" *1 *2
*1 – for DYNORM=ISO_2859
*2 – for DYNORM=ISO_3951
*.AQL C50 F AQL value of the For DYNART<>KEINE (in the
dynamic corresponding inspection plan
modification norm header data), the parameter must be
*.ZUSCHR:2 empty.
The AQL value entered here must be
defined for the corresponding
dynamic modification norm. Default
values are:
„0.010“ *1 *2
„0.015“ *1 *2
„0.025“ *1 *2
„0.040“ *1 *2
„0.065“ *1 *2
„0.10“ *1
„0.15“ *1
„0.25“ *1
„0.40“ *1
„0.65“ *1
„1.0“ *1 *2
„1.5“ *1 *2
„2.5“ *1 *2
„4.0“ *1 *2
„6.5“ *1 *2
„10“ *1 *2
„15“ *1
„25“ *1
„40“ *1
EIS-CES_82.docx Version: 1.0.23049 Page 71 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

„65“ *1
„100“ *1
„150“ *1
„250“ *1
„400“ *1
„650“ *1
„1000“ *1
*1 – for DYNORM=ISO_2859
*2 – for DYNORM=ISO_3951
| *.DYNMETH  |     | C50  | F   | Dynamic            | For DYNART<>KEINE (in the            |     |
| ---------- | --- | ---- | --- | ------------------ | ------------------------------------ | --- |
|            |     |      |     | modification norm  | corresponding inspection plan        |     |
|            |     |      |     | method             | header data), the parameter must be  |     |
empty.
The method entered here must be
defined for the corresponding
dynamic modification norm. Default
values are:
"s“ *1
"Sigma" *1
*1 – for DYNORM=ISO_3951
*.DYPSCHARF:STA
|     |     | C50  | F   | Initial inspection  | For DYNART<>KEINE (in the            |     |
| --- | --- | ---- | --- | ------------------- | ------------------------------------ | --- |
|     |     |      |     | severity for        | corresponding inspection plan        |     |
|     |     |      |     | dynamic             | header data), the parameter must be  |     |
|     |     |      |     | modification        | empty.                               |     |
The inspection severity entered here
must be known in the inspection
severity definition assigned to the
transitional definition.
Default values for the ISO dynamic
modification are:
"v" – intensified (tightened)
inspection
"n"– normal inspection
"r" – reduced inspection
"a" – suspended inspection
| *.CEINH  |     | C50  |     | Unit of measure or  | For QSPEZ<>PPLMER, the   |     |
| -------- | --- | ---- | --- | ------------------- | ------------------------ | --- |
|          |     |      |     | size                | parameter must be empty  |     |
A corresponding unit of measure with
this identifier must already exist in
HYDRA.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 72 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.FMT C250 Measured values For QSPEZ<>PPLMER, the
format of the single parameter must be empty
values Missing or completing zeros to be
suppressed are marked by the "#"
sign, positions that must definitely be
displayed are illustrated with a "0".
The decimal point is marked by a dot
and the thousands separator is
marked by a comma.
Example: "#,##0.00##"
This parameter is only needed for
variable characteristics. "0,015" *1 *2 If
this parameter is not transferred,
then the default format defined in the
op
"0,025" *1 *2 In the client, the number
of decimal places is output
*.GWNORM C50 F Standard For QSPEZ<>PPLMER, the
parameter must be empty
This parameter can be used to
define which standard the tolerance
limits are based on. A relevant
standard must be defined in HYDRA.
Standards are:
Standards are:
 "ISO_PASS“
 "ISO7168“
 "ISO2768“
 "EN12420“
This parameter is only required for
variable characteristics.
*.GWID C50 F Standard entry For QSPEZ<>PPLMER, the
identifier parameter must be empty
For some standards, an identifier can
be specified for the corresponding
entry.
Example: "H7" for ISO fit standards
This parameter is only required for
variable characteristics.
EIS-CES_82.docx Version: 1.0.23049 Page 73 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.STPRPLAN
|     |     | C50  | M/I     | Sampling scheme  | The parameter must be empty for  |     |
| --- | --- | ---- | ------- | ---------------- | -------------------------------- | --- |
|     |     |      | (see    | identifier       | QSPEZ<>PPLMER.                   |     |
|     |     |      | comment |                  | The sampling scheme must be      |     |
defined in HYDRA. Possible values:
s)
  "NC"
  "100PRO"
  "SPC"
  "LOS"
The "LOS" sampling scheme is only
valid in the goods receipt or the
goods issue areas, while the
sampling scheme "SPC" is only valid
in the production areas.
|     |     | N9  | M/I  | Sample size  | The parameter must be empty for  |     |
| --- | --- | --- | ---- | ------------ | -------------------------------- | --- |
*.STPRUMF
|     |     |     | (see    |     | QSPEZ<>PPLMER.                 |     |
| --- | --- | --- | ------- | --- | ------------------------------ | --- |
|     |     |     | comment |     | This parameter determines the  |     |
sample size. The value 0 must be
s)
used for open samples.
The sampling scheme "100PRO"
requires an entry (must not be
empty)
| *.RWMENGE  |     | N9  |     | Acceptance  | For QSPEZ<>PPLMER or         |     |
| ---------- | --- | --- | --- | ----------- | ---------------------------- | --- |
|            |     |     |     | quantity    | STPRPLAN<>NC, the parameter  |     |
must be empty
| *.RUMENGE  |     | N9  |     | Rejection quantity  | For QSPEZ<>PPLMER or  |     |
| ---------- | --- | --- | --- | ------------------- | --------------------- | --- |
STPRPLAN<>NC, the parameter
must be empty
| *.INTTYP  |     | C50  | F   | Type of interval  | With STPRPLAN<>SPC or  |     |
| --------- | --- | ---- | --- | ----------------- | ---------------------- | --- |
STPRPLAN<>NC or
QSPEZ<>PPLMER, the parameter
must be empty.
Valid values:
  "KEINS" for no interval
  "ZEIT" for time intervals
  "STCK" for piece intervals
  "EINMAL" for "once"

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 74 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.INTERVAL N9 Interval With STPRPLAN<>SPC or
STPRPLAN<>NC or
QSPEZ<>PPLMER, the parameter
must be empty.
Interval value. For piece intervals,
the number of units is set in this field,
for time intervals, the interval from
this field results from the connection
with the field CSPEZL.INTEINH.
*.INTEINH C50 F Type of interval With STPRPLAN<>SPC or
STPRPLAN<>NC or
QSPEZ<>PPLMER, the parameter
must be empty.
Specifies for time intervals which unit
is found in the field
CSPEZL.INTERVAL.
Only identifiers defined in HYDRA
can be used. By default, these are
the following:
 "SEK" – Seconds
 "MIN" – Minutes
 "STD" – Hours
 "TAG" – Days
 "MON" – Months
 "JAH" – Years
*.INT:ALW "0" or "1" F Characteristic Provided that MPL is in use
becomes due for
inspection when
output batches are
changed
*.INT:MSW "0" or "1" F Characteristic
becomes due for
inspection when
machine statuses
are changed
EIS-CES_82.docx Version: 1.0.23049 Page 75 of 123

HYDRA-CAQ Interface to ERP Systems
*.INT:MSWMST C250 Source status, Separate configurations by comma,
target status or a no blanks
combination of
source and target
status triggering
inspections when
changing the
machine status
*.INT: SCHICHTW "0" or "1" F Characteristic
becomes due for
inspection when
the shift is changed
*.PRBZUG "0" or "1" F Sampling This parameter can be used from
SP4 onwards.
*.PRBGRP C50 Sample group This parameter can be used from
SP4 onwards.
*.MASSANG C50 F Type of defined For QSPEZ<>PPLMER, the
constructional parameter must be empty
measures Specifies the manner in which the
constructional measures are defined.
Only identifiers defined in HYDRA
can be used. By default, these are
the following:
 "ABSOLUT" – the constructional
measures are defined absolutely
in the parameters OPG, OTG,
UTG and UPG. *.OWG:1
 "RELATIV" - the constructional
measures are defined as a
relative deviation from the target
value in the parameters
OPGREL, OTGREL, UTGREL
and UPGREL. N12.4
 "PROZENTUAL" - the
constructional measures are
defined as a deviation in percent
from the target value in the
parameters OPGREL, OTGREL,
UTGREL and UPGREL.
EIS-CES_82.docx Version: 1.0.23049 Page 76 of 123

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.OPG
|     |     | N12.4  |     | absolute, upper     | The parameter must be empty for  |     |
| --- | --- | ------ | --- | ------------------- | -------------------------------- | --- |
|     |     |        |     | plausibility limit  | PRUEFTYP<>V or                   |     |
QSPEZ<>PPLMER or
MASSANG<>ABSOLUT .
| *.OPGREL  |     |        |     | relative/            | The parameter must be empty for  |     |
| --------- | --- | ------ | --- | -------------------- | -------------------------------- | --- |
|           |     | N12.4  |     |                      |                                  |     |
|           |     |        |     | percentage, upper    | PRUEFTYP<>V or                   |     |
|           |     |        |     | plausibility limit   | QSPEZ<>PPLMER or                 |     |
MASSANG=ABSOLUT .
*.OTG  N12.4    absolute, upper  The parameter must be empty for
|     |     |     |     | tolerance limit  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ---------------- | --------------- | --- |
QSPEZ<>PPLMER or
MASSANG<>ABSOLUT .
*.OTGREL  N12.4    relative/percentage The parameter must be empty for
|     |     |     |     | , upper tolerance  | PRUEFTYP<>V or    |     |
| --- | --- | --- | --- | ------------------ | ----------------- | --- |
|     |     |     |     | limit              | QSPEZ<>PPLMER or  |     |
MASSANG=ABSOLUT .
*.OTGAKTIV  "0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if single
values violate the tolerance limit.
*.SW  N12.4    Target value  The parameter must be empty for
PRUEFTYP<>V or
QSPEZ<>PPLMER.
| *.UTG  |     |        |     | absolute, lower  | The parameter must be empty for  |     |
| ------ | --- | ------ | --- | ---------------- | -------------------------------- | --- |
|        |     | N12.4  |     |                  |                                  |     |
|        |     |        |     | tolerance limit  | PRUEFTYP<>V or                   |     |
QSPEZ<>PPLMER or
MASSANG<>ABSOLUT .
*.UTGREL  N12.4    relative/  The parameter must be empty for
|     |     |     |     | percentage, lower  | PRUEFTYP<>V or    |     |
| --- | --- | --- | --- | ------------------ | ----------------- | --- |
|     |     |     |     | tolerance limit    | QSPEZ<>PPLMER or  |     |
MASSANG=ABSOLUT .

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 77 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.UTGAKTIV
"0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if single
values violate the tolerance limit.
*.UPG  N12.4    absolute, lower  The parameter must be empty for
|     |     |     |     | plausibility limit  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------------------- | --------------- | --- |
QSPEZ<>PPLMER or
MASSANG<>ABSOLUT .
*.UPGREL  N12.4    relative/  The parameter must be empty for
|     |     |     |     | percentage, lower    | PRUEFTYP<>V or    |     |
| --- | --- | --- | --- | -------------------- | ----------------- | --- |
|     |     |     |     | plausibility limit   | QSPEZ<>PPLMER or  |     |
MASSANG=ABSOLUT .
*.KARTE:1
|     |     | C50  | F   | Identifier for the   | For QSPEZ<>PPLMER, the   |     |
| --- | --- | ---- | --- | -------------------- | ------------------------ | --- |
|     |     |      |     | first control chart  | parameter must be empty  |     |
The following values are valid for
variable characteristics:
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"
*.OEG:1  N12.4    upper action limit of  The parameter must be empty for
|     |     |     |     | the first control  | QSPEZ<>PPLMER .  |     |
| --- | --- | --- | --- | ------------------ | ---------------- | --- |
chart

*.OEGAKTIV:1  "0" or "1"  F  Automatic failure  For QSPEZ<>PPLMER, the
|     |     |     |     | entry  | parameter must be empty  |     |
| --- | --- | --- | --- | ------ | ------------------------ | --- |
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the upper
action limit is violated by the
statistical value of control chart 1
(e.g. Xq).
*.OWG:1  N12.4    upper warning limit  The parameter must be empty for
|     |     |     |     | of the first control  | QSPEZ<>PPLMER .  |     |
| --- | --- | --- | --- | --------------------- | ---------------- | --- |
|     |     |     |     | chart                 |                  |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 78 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.OWGAKTIV:1
|     |     | "0" or "1"  | F   | Automatic failure  | For QSPEZ<>PPLMER, the   |     |
| --- | --- | ----------- | --- | ------------------ | ------------------------ | --- |
|     |     |             |     | entry              | parameter must be empty  |     |
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the upper
warning limit is violated by the
statistically calculated value of
control chart 1 (e.g. Xq).
*.MWAVG:1  N12.4    Mean value for the  The parameter must be empty for
|     |     |     |     | first control chart  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | -------------------- | --------------- | --- |
QSPEZ<>PPLMER  .
*.UWG:1  N12.4    lower warning limit  The parameter must be empty for
|     |     |     |     | of the first control  | PRUEFTYP<>V or   |     |
| --- | --- | --- | --- | --------------------- | ---------------- | --- |
|     |     |     |     | chart                 | QSPEZ<>PPLMER .  |     |
*.UWGAKTIV:1  "0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
warning limit is violated by the
statistically calculated value of
control chart 1 (e.g. Xq).
*.UEG:1  N12.4    lower action limit of  The parameter must be empty for
|     |     |     |     | the first control  | PRUEFTYP<>V or   |     |
| --- | --- | --- | --- | ------------------ | ---------------- | --- |
|     |     |     |     | chart              | QSPEZ<>PPLMER .  |     |
*.UEGAKTIV:1  "0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
action limit is violated by the
statistically calculated value of
control chart 1 (e.g. Xq).

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 79 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.VORG:1
|     |     | C50  | F   | Default value for  | For QSPEZ<>PPLMER, the           |     |
| --- | --- | ---- | --- | ------------------ | -------------------------------- | --- |
|     |     |      |     | limit value        | parameter must be empty          |     |
|     |     |      |     | calculation        | The following values are valid:  |     |
"CPK“, "SIGMA“, "QUER“,
“ABW_REL“, "ABW_PROZ“
| *.CPK:1  |     | N12.4  |     | CPK default value  | For QSPEZ<>PPLMER, the               |     |
| -------- | --- | ------ | --- | ------------------ | ------------------------------------ | --- |
|          |     |        |     | for limit value    | parameter must be empty              |     |
|          |     |        |     | calculation        | To calculate Sigma from the defined  |     |
cpk, the upper and lower tolerance
limits must be specified and must be
distinguishable.
| *.STATVERT:1  |     | C50  | F   | Unilateral or          | For QSPEZ<>PPLMER, the            |     |
| ------------- | --- | ---- | --- | ---------------------- | --------------------------------- | --- |
|               |     |      |     | bilateral calculation  | parameter must be empty           |     |
|               |     |      |     | of limit values        | The following values are valid:   |     |
"EINS", "ZWEI".
If this parameter has the value
"EINS", the calculation is only
performed for either the upper or the
lower action/ warning limits. This
setting is mandatory for attributive
control charts. For R and s control
charts, the upper limit values are
calculated in this case. For Xq
control charts, the calculation
performed depends on which
tolerance limit is specified. If the
upper and lower tolerance limit is
specified, the upper and lower
warning/ action limits are calculated,
even though "unilateral" was
selected.
If this parameter has the value
"ZWEI", the calculation is performed
for the upper and lower action/
warning limits.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 80 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.EWEG:1
|     |     | C50  | F   | Non-action           | For QSPEZ<>PPLMER, the              |     |
| --- | --- | ---- | --- | -------------------- | ----------------------------------- | --- |
|     |     |      |     | probability for the  | parameter must be empty             |     |
|     |     |      |     | action limits        | The following values are valid for  |     |
unilateral control charts:
"1", "1.28", "1.64", "1.96", "2", "2.33",
"2.58", "3", "3.09", "3.72", "4"
The following values are valid for
bilateral control charts:
"1", "1.28", "1.64", "1.96", "2", "2.28",
"2.33", "2.58", "3", "3.09", "3.45",
"3.72", "3.9", "4"
The following values are valid for R
and s charts:
"0.9", "0.95", "0.99"
| *.EWWG:1  |     | C50  | F   | Non-action       | For QSPEZ<>PPLMER, the   |     |
| --------- | --- | ---- | --- | ---------------- | ------------------------ | --- |
|           |     |      |     | probability for  | parameter must be empty  |     |
warning limits
See EWEG:1 parameters
*.RELEG:1  N12.4    relative deviation/  Parameter must be empty for
|     |     |     |     | deviation in    | QSPEZ<>PPLMER or  |     |
| --- | --- | --- | --- | --------------- | ----------------- | --- |
|     |     |     |     | percent of the  | KARTE:1<>XQ.      |     |
action limit(s) of the

first (Xq) control
chart from the
target value
*.RELWG:1  N12.4    relative deviation/  Parameter must be empty for
|     |     |     |     | deviation in         | QSPEZ<>PPLMER or  |     |
| --- | --- | --- | --- | -------------------- | ----------------- | --- |
|     |     |     |     | percent of the       | KARTE:1<>XQ.      |     |
|     |     |     |     | warning limit(s) of  |                   |     |
the first (Xq)
control chart from
the target value
*.QUER:1
|     |     | N12.4  |     | Default value for      | For QSPEZ<>PPLMER, the   |     |
| --- | --- | ------ | --- | ---------------------- | ------------------------ | --- |
|     |     |        |     | sq: or rather for Rq:  | parameter must be empty  |     |
|     |     |        |     | for computing limit    |                          |     |
values
*.SIGMA:1
|     |     | N12.4  |     | Sigma default          | For QSPEZ<>PPLMER, the   |     |
| --- | --- | ------ | --- | ---------------------- | ------------------------ | --- |
|     |     |        |     | value for limit value  | parameter must be empty  |     |
|     |     |        |     | calculation            |                          |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 81 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.XQVART:1
|     |     | C50  | F   | Type of Xq default  | For QSPEZ<>PPLMER, the           |     |
| --- | --- | ---- | --- | ------------------- | -------------------------------- | --- |
|     |     |      |     | value (for limit    | parameter must be empty          |     |
|     |     |      |     | value calculation)  | The following values are valid:  |     |
"RKXQMITTE", "SOLLWERT",
"TOLMITTE", "VORGABE"
*.VORGXQ:1  N12.4    Default value Xq  Parameter must be empty for
|     |     |     |     | for limit value  | QSPEZ<>PPLMER or    |     |
| --- | --- | --- | --- | ---------------- | ------------------- | --- |
|     |     |     |     | calculation      | VORGXQ:1<>VORGABE.  |     |
*.MOD:BER_WG_1
"0" or "1"  F  Automatically  If the value "1" is transferred to this
|     |     |     |     | calculate warning     | parameter, the warning limits for the  |     |
| --- | --- | --- | --- | --------------------- | -------------------------------------- | --- |
|     |     |     |     | limits for the first  | first control chart are calculated     |     |
|     |     |     |     | control chart         | automatically.                         |     |
It is not possible to calculate limit
values for the Median chart.
*.MOD:BER_EG_1
"0" or "1"  F  Automatically  If the value "1" is transferred to this
|     |     |     |     | calculate action      | parameter, the action limits for the  |     |
| --- | --- | --- | --- | --------------------- | ------------------------------------- | --- |
|     |     |     |     | limits for the first  | first control chart are calculated    |     |
|     |     |     |     | control chart         | automatically.                        |     |
It is not possible to calculate limit
values for the Median chart.
| *.KARTE:2  |     |      |     | Identifier of the  | For QSPEZ<>PPLMER, the              |     |
| ---------- | --- | ---- | --- | ------------------ | ----------------------------------- | --- |
|            |     | C50  | F   |                    |                                     |     |
|            |     |      |     | second control     | parameter must be empty             |     |
|            |     |      |     | chart              | The following values are valid for  |     |
variable characteristics:
"XQ", "R", "S", "X" or "X_MED"
The following values are valid for
attributive characteristics:
"P" or "U"
*.OEG:2  N12.4    upper action limit of  The parameter must be empty for
|     |     |     |     | the second control  | QSPEZ<>PPLMER .  |     |
| --- | --- | --- | --- | ------------------- | ---------------- | --- |
|     |     |     |     | chart               |                  |     |
*.OEGAKTIV:2  "0" or "1"  F  Automatic failure  For QSPEZ<>PPLMER, the
|     |     |     |     | entry  | parameter must be empty  |     |
| --- | --- | --- | --- | ------ | ------------------------ | --- |
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the upper
action limit is violated by the
statistically calculated value of
control chart 2 (e.g. standard
deviation).

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 82 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.OWG:2
N12.4    Upper warning limit  The parameter must be empty for
|     |     |     |     | of the second  | QSPEZ<>PPLMER .  |     |
| --- | --- | --- | --- | -------------- | ---------------- | --- |
|     |     |     |     | control chart  |                  |     |
*.OWGAKTIV:2
|     |     | "0" or "1"  | F   | Automatic failure  | For QSPEZ<>PPLMER, the   |     |
| --- | --- | ----------- | --- | ------------------ | ------------------------ | --- |
|     |     |             |     | entry              | parameter must be empty  |     |
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the upper
warning limit is violated by the
statistically calculated value of
control chart 2 (e.g. standard
deviation).
*.MWAVG:2  N12.4    Mean value of the  The parameter must be empty for
|     |     |     |     | second (Xq) control  | PRUEFTYP<>V or   |     |
| --- | --- | --- | --- | -------------------- | ---------------- | --- |
|     |     |     |     | chart                | QSPEZ<>PPLMER .  |     |
*.UWG:2  N12.4    Lower warning limit  The parameter must be empty for
|     |     |     |     | of the second  | PRUEFTYP<>V or   |     |
| --- | --- | --- | --- | -------------- | ---------------- | --- |
|     |     |     |     | control chart  | QSPEZ<>PPLMER .  |     |
*.UWGAKTIV:2  "0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
warning limit is violated by the
statistically calculated value of
control chart 2 (e.g. standard
deviation).
*.UEG:2
N12.4    Lower action limit  The parameter must be empty for
|     |     |     |     | of the second  | PRUEFTYP<>V or   |     |
| --- | --- | --- | --- | -------------- | ---------------- | --- |
|     |     |     |     | control chart  | QSPEZ<>PPLMER .  |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 83 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.UEGAKTIV:2
"0" or "1"  F  Automatic failure  The parameter must be empty for
|     |     |     |     | entry  | PRUEFTYP<>V or  |     |
| --- | --- | --- | --- | ------ | --------------- | --- |
QSPEZ<>PPLMER.
If the value "1" is transferred to this
parameter, a failure entry is
automatically generated if the lower
action limit is violated by the
statistically calculated value of
control chart 2 (e.g. standard
deviation).
| *.VORG:2  |     | C50  | F   | Default value for  | For QSPEZ<>PPLMER, the           |     |
| --------- | --- | ---- | --- | ------------------ | -------------------------------- | --- |
|           |     |      |     | limit value        | parameter must be empty          |     |
|           |     |      |     | calculation        | The following values are valid:  |     |
"CPK“, "SIGMA“, "QUER“,
“ABW_REL“, "ABW_PROZ“
*.CPK:2
|               |     | N12.4  |     | CPK default value      | For QSPEZ<>PPLMER, the     |     |
| ------------- | --- | ------ | --- | ---------------------- | -------------------------- | --- |
|               |     |        |     | for limit value        | parameter must be empty    |     |
|               |     |        |     | calculation            | See CPK:1 parameters       |     |
| *.STATVERT:2  |     | C50    | F   | Unilateral or          | For QSPEZ<>PPLMER, the     |     |
|               |     |        |     | bilateral calculation  | parameter must be empty    |     |
|               |     |        |     | of limit values        | See STATVERT:1 parameters  |     |
| *.EWEG:2      |     | C50    | F   | Non-action             | For QSPEZ<>PPLMER, the     |     |
|               |     |        |     | probability for the    | parameter must be empty    |     |
|               |     |        |     | action limits          | See EWEG:1 parameters      |     |
| *.EWWG:2      |     | C50    | F   | Non-action             | For QSPEZ<>PPLMER, the     |     |
|               |     |        |     | probability for        | parameter must be empty    |     |
|               |     |        |     | warning limits         | See EWEG:1 parameters      |     |
*.RELEG:2  N12.4    relative deviation/  Parameter must be empty for
|     |     |     |     | deviation in            | QSPEZ<>PPLMER or  |     |
| --- | --- | --- | --- | ----------------------- | ----------------- | --- |
|     |     |     |     | percent of the          | KARTE:2<>XQ.      |     |
|     |     |     |     | action limit(s) of the  |                   |     |
second (Xq) control
chart from the
target value

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 84 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.RELWG:2
|     |     | N12.4  |     | relative deviation/  | Parameter must be empty for  |     |
| --- | --- | ------ | --- | -------------------- | ---------------------------- | --- |
|     |     |        |     | deviation in         | QSPEZ<>PPLMER or             |     |
|     |     |        |     | percent of the       | KARTE:2<>XQ.                 |     |
|     |     |        |     | warning limit(s) of  |                              |     |
the second (Xq)
control chart from
the target value
*.QUER:2  N12.4    Default value for  For QSPEZ<>PPLMER, the
|     |     |     |     | sq: or rather for Rq:  | parameter must be empty  |     |
| --- | --- | --- | --- | ---------------------- | ------------------------ | --- |
|     |     |     |     | for computing limit    |                          |     |
values
| *.SIGMA:2  |     | N12.4  |     | Sigma default          | For QSPEZ<>PPLMER, the   |     |
| ---------- | --- | ------ | --- | ---------------------- | ------------------------ | --- |
|            |     |        |     | value for limit value  | parameter must be empty  |     |
|            |     |        |     | calculation            |                          |     |
*.XQVART:2  C50  F  Type of Xq default  For QSPEZ<>PPLMER, the
|     |     |     |     | value (for limit    | parameter must be empty          |     |
| --- | --- | --- | --- | ------------------- | -------------------------------- | --- |
|     |     |     |     | value calculation)  | The following values are valid:  |     |
"RKXQMITTE", "SOLLWERT",
"TOLMITTE", "VORGABE"
*.VORGXQ:2  N12.4    Default value Xq  Parameter must be empty for
|     |     |     |     | for limit value  | QSPEZ<>PPLMER or    |     |
| --- | --- | --- | --- | ---------------- | ------------------- | --- |
|     |     |     |     | calculation      | VORGXQ:2<>VORGABE.  |     |
*.MOD:BER_WG_2  "0" or "1"  F  Automatically  If the value "1" is transferred to this
|     |     |     |     | calculate warning  | parameter, the warning limits for the  |     |
| --- | --- | --- | --- | ------------------ | -------------------------------------- | --- |
|     |     |     |     | limits for the     | second control chart are calculated    |     |
|     |     |     |     | second control     | automatically.                         |     |
chart
*.MOD:BER_EG_2  "0" or "1"  F  Automatically  If the value "1" is transferred to this
|     |     |     |     | calculate action  | parameter, the action limits for the  |     |
| --- | --- | --- | --- | ----------------- | ------------------------------------- | --- |
|     |     |     |     | limits for the    | second control chart are calculated   |     |
|     |     |     |     | second control    | automatically.                        |     |
chart
| *.FU:1 to*.FU:5   |     | C50    |     | Direct user fields  |     |     |
| ----------------- | --- | ------ | --- | ------------------- | --- | --- |
| *.FU:6 to*.FU:10  |     | N9     |     | Direct user fields  |     |     |
| *.FU:11; *.FU:12  |     | N12.9  |     | Direct user fields  |     |     |
| *.FU:13; *.FU:14  |     | Date   |     | Direct user fields  |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 85 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

| 3.2.13  | Documents of inspection plans/inspection plan  |     |     |     |     |
| ------- | ---------------------------------------------- | --- | --- | --- | --- |
characteristics
The  following  dialogs  are  available  for  updating  inspection  plan  documents  and/or  inspection  plan
characteristics documents:
|   CPPLDOK.MODIFY  |     | to create or change document entries  |     |     |     |
| ------------------ | --- | ------------------------------------- | --- | --- | --- |
|   CPPLDOK.INSERT  |     | to create document entries            |     |     |     |
CPPLDOK.UPDATE
|                   |     | to change document entries  |     |     |     |
| ------------------ | --- | --------------------------- | --- | --- | --- |
|   CPPLDOK.DELETE  |     | to delete document entries  |     |     |     |
If the parameter CPPLDOK.AFO is specified for the dialog, the document entry relates to an inspection
plan characteristic. If the parameter is not specified, the document entry relates to the inspection plan
header.
The  unique  key  for  inspection  plan  documents  is  made  up  of  the  fields  CPPLDOK.RECTYP,
CPPLDOK.BER and CPPLDOK.PPLID and CPPLDOK.PPLIDX.
The unique key for inspection plan characteristics documents is made up of the fields CPPLDOK.RECTYP,
CPPLDOK.BER, CPPLDOK.PPLID, CPPLDOK.PPLIDX and CPPLDOK.AFO.
Before creating or changing documents, you must make sure that the corresponding inspection plan or
inspection plan characteristic already exists.
If  the  document  entry  is  a  "Text"  type  (CPPLDOK.DOKTYP=TEXT),  then  the  parameters
CPPLDOK.TEXT:1 – CPPLDOK.TEXT:10 are used to transfer document texts. The line break (ASCII
code 10) is masked with the character string ~"~ (ASCII code: 126, 34, 126).
If the document entry is a "File" type (CPPLDOK.DOKTYP=DATEI), then the link to the corresponding file
is included in the field CPPLDOK.DOKURL. When specifying the file name, this can be done both in UNC
(\\SERVER\VOLUME\PATH\FILE NAME.EXT) as well as with the drive reference (DRIVE:\PATH\FILE
NAME.EXT). If a file should be referenced in a subdirectory of the HYDRA server, this is done by using a
forward slash (instead of a backslash and the relative path specification (./PATH/FILE NAME.EXT)
If the document entry is a "URL" type (CPPLDOK.DOKTYP=URL), then the corresponding HTML address is
entered in the field CPPLDOK.DOKURL.
Dialog: CPPLDOK.*
| Parameter  | Type  Man | Contents  |     | Description  |     |
| ---------- | --------- | --------- | --- | ------------ | --- |
dato
ry

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 86 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.RECTYP
|     | M/I/ | Data type of inspection  |     | FEP = In-production inspection plan  |     |
| --- | ---- | ------------------------ | --- | ------------------------------------ | --- |
"FEP",
|     | U/D  | plan  |     | WEP = Goods receipt inspection  |     |
| --- | ---- | ----- | --- | ------------------------------- | --- |
"WEP",
WAP = Goods issue inspection plan
"WAP",
EMU = Initial sample inspection plan
"EMU"
*.BER  M/I/ Area for which the  An area with the corresponding area ID
C10
|          | U/D       | inspection plan applies.  |     | must exist in HYDRA.  |     |
| -------- | --------- | ------------------------- | --- | --------------------- | --- |
| *.PPLID  | C50  M/I/ | Inspection plan number    |     |                       |     |
U/D
*.PPLIDX  (M)/  Inspection plan index  For CPPLDOK.MODIFY it is only a
C50
|     | (I)/  |     |     | mandatory field if the parameter is  |     |
| --- | ----- | --- | --- | ------------------------------------ | --- |
|     | (U)/  |     |     | CPPLDOK.MOD:VERSMAN=0.               |     |
D
*.AFO
|     | (M)/  | Work  | sequence  |     |     |
| --- | ----- | ----- | --------- | --- | --- |
N9
(I)/  (operation sequence) of
(U)/  the characteristic
(D)
*.NOACTIVECHK  "0" or "1"  F  Parameter  specifying  If this parameter has the value "1", no
|     |     | whether a check should    |     | check for activation is run. Otherwise, an  |     |
| --- | --- | ------------------------- | --- | ------------------------------------------- | --- |
|     |     | run after the inspection  |     | error message is issued if an active        |     |
|     |     | plan is activated.        |     | inspection plan should be modified.         |     |
*.MOD:VERSMAN  "0" or "1"  M/I/ Parameter  specifying  This  parameter  is  only  needed  for
|     | U   | whether inspection plan  |             | CPPLDOK.MODIFY.  |     |
| --- | --- | ------------------------ | ----------- | ---------------- | --- |
|     |     | version                  | management  |                  |     |
If this parameter has the value "1",
should be activated.
inspection plan version management is
activated.
*.DOKNR  N9  M/I/ Document number  This document number must be unique in
|     | U/D  |     |     | the inspection plan or in the inspection  |     |
| --- | ---- | --- | --- | ----------------------------------------- | --- |
plan characteristic.
| *.DOKBEZ  | C250    | Document name  |     |     |     |
| --------- | ------- | -------------- | --- | --- | --- |
*.DOKTYP  C50  F  Type of document  The document type must be defined in
HYDRA. Possible values:
  "TEXT"
  "DATEI“
  "URL"

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 87 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | ----------------------------------- | --- |

*.DOKURL
C250    File name or URL of the  For DOKTYP=TEXT, the parameter must
|     |     | document  | be empty.  |     |
| --- | --- | --------- | ---------- | --- |
*.TEXT:1  C250    Characters 1-250 of the  For DOKTYP<>TEXT, the parameter must
|     |     | document text  | be empty.  |     |
| --- | --- | -------------- | ---------- | --- |
*.TEXT:2  C250    Characters  251-500  of  For DOKTYP<>TEXT, the parameter must
|     |     | the document text  | be empty.  |     |
| --- | --- | ------------------ | ---------- | --- |
*.TEXT:3  C250    Characters  501-750  of  For DOKTYP<>TEXT, the parameter must
|     |     | the document text  | be empty.  |     |
| --- | --- | ------------------ | ---------- | --- |
*.TEXT:4  C250    Characters 751-1000 of  For DOKTYP<>TEXT, the parameter must
|     |     | the document text  | be empty.  |     |
| --- | --- | ------------------ | ---------- | --- |
*.TEXT:5  C250    Characters  1001-1250  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.TEXT:6  C250    Characters  1251-1500  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.TEXT:7
C250    Characters  1501-1750  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.TEXT:8  C250    Characters  1751-2000  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.TEXT:9  C250    Characters  2001-2250  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.TEXT:10
C250    Characters  2251-2500  For DOKTYP<>TEXT, the parameter must
|     |     | of the document text  | be empty.  |     |
| --- | --- | --------------------- | ---------- | --- |
*.PRAKTIV  "0" or "1"  M/I  Show  document  during  If the value "1" is transferred to this
|     |     | inspection?  | parameter, the document is transmitted to  |     |
| --- | --- | ------------ | ------------------------------------------ | --- |
the inspection requirement or the
corresponding inspection step
characteristic when the inspection step is
created and is thus available during the
inspection.
| 3.2.14  | Inspection requirements  |     |     |     |
| ------- | ------------------------ | --- | --- | --- |
The following dialogs are available for creating or modifying inspection requirements:
 CPAN.MODIFY    to create or modify an inspection requirement
 CPAN.INSERT      to create an inspection requirement

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     | Page 88 of 123  |
| ---------------- | --- | ------------------- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
 CPAN.UPDATE to modify an inspection requirement
 CPAN.DELETE to delete an inspection requirement
 CPAN.STORNO to cancel an inspection requirement
 CPAN.AKTIVIEREN to activate an inspection requirement
The parameter CPAN.PPS:REF is crucial for communicating with an external system. The corresponding
inspection requirement is identified with this reference number.
To illustrate the user fields completed via the interface in HYDRA, the user fields must have been
configured accordingly (object = "CPAN"; user field key = data type (CPAN.RECTYP).
WARNING!! HYDRA-CAQ provides the option to copy the user fields of the inspection plan to
the inspection requirement when you create an inspection requirement. This
functionality is controlled in an option (option 1058). If this functionality is
activated, you must guarantee that the numbers of the user fields of inspection
plan and inspection requirement are identical.
Example: The interface populates the user fields CPPL.FU:1 to CPPL:FU:14 of the
inspection plan header. User fields CPAN.FU:1 to CPAN.FU:14 are
passed to the inspection requirements. As a result, user fields 1 to 14
are shown in an inspection requirement based on an inspection plan.
In this case, when configuring the user fields, make sure that the field
types for the user fields 1 to 14 in both the inspection plans and in the
inspection requirements match.
3.2.14.1 Method calls with the PPS reference number (default)
For the CPAN.MODIFY method, the system first checks whether a non-completed inspection requirement
with the PPS reference number (CPAN.PPS:REF) already exists for the data type (CPAN.RECTYP) in the
area concerned (CPAN.BER). In this case, the inspection requirement that was found is modified
according to the parameters transferred.
If the search for a non-completed inspection requirement was not successful, a new inspection
requirement is created.
If you would like to make sure that there is exactly only one inspection requirement with the PPS
reference number in the system, then you should call up the method CPAN.AKTIVIEREN before calling
CPAN.MODIFY. Doing so will first "reactivate" an existing but already completed inspection requirement.
EIS-CES_82.docx Version: 1.0.23049 Page 89 of 123

HYDRA-CAQ Interface to ERP Systems
For the CPAN.INSERT, CPAN.UPDATE, CPAN.DELETE, CPAN.STORNO and CPAN.AKTIVIEREN
methods, the program searches for an inspection requirement with the transferred reference number
(parameter CPAN.PPS:REF) for the data type (CPAN.RECTYP) in the relevant area (parameter
CPAN.BER) that has not yet been completed. If none are found, the search is repeated, however the
status of the inspection requirement is now ignored.
If the search returns several inspection requirements, in each case the inspection requirement created
last will be used. Each method is then applied to the data record that was found.
3.2.14.2 Method calls without a PPS reference number
It is also possible to create inspection requirements without a PPS reference number. However, when
using this call type, it becomes difficult later on to identify orders that have already been created (for
example when calling the methods CPAN.UPDATE, CPAN.DELETE, CPAN.STORNO or
CPAN.AKTIVIEREN).
When the CPAN.MODIFY method is called, the program searches for an uncompleted inspection
requirement in the corresponding area (CPAN.BER) and matching the current data type (CPAN.RECTYP),
in accordance with the parameters configured in system option 3. If none are found, a new inspection
requirement is created.
For the method calls CPAN.DELETE, CPAN.STORNO or CPAN.AKTIVIEREN without the PPS reference
number, the data type (CPAN.RECTYP), the area (CPAN.BER) and the internal HYDRA inspection
requirement number (CPAN.PANNR) must be transferred. An inspection requirement can be clearly
identified using these parameters. These parameters can also be used for the method CPAN.UPDATE.
The parameter CPAN.PANNR is an internal HYDRA key field. The system assigns this key field
automatically when a new inspection requirement is generated. If the system is customized accordingly
there is the option to identify the parameter CPAN.PANNR using alternative key fields. The training course
CUT-IMI provides the required basics and skills.
3.2.14.3 Order number
You use the CAQ system option "1115" to define if the ADE-CAQ integration mode is activated.
The mode is activated by default. This means: the field Order number of the inspection requirement must
absolutely include a value. To guarantee this, the order number is automatically generated when the
number is not transferred via interface or when an inspection requirement is manually created without
order number. The system then automatically adds a "Q" in front of the order number. The other n
characters are derived from the last n places of the PPS reference number. In this case, the entry of the
PPS reference number is mandatory and the number must at least have the required order number
length. If the PPS reference number is too short, the system adds leading zeros before the Q. For
example with an order number of 8 digits: 0000000Q.
EIS-CES_82.docx Version: 1.0.23049 Page 90 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

If the integration mode is not activated, no order number is generated. The field Order number then
remains empty. This is possible because the system does not generate an order for the inspection
requirement with this mode.
| 3.2.14.4  | Field definitions  |     |     |     |     |
| --------- | ------------------ | --- | --- | --- | --- |
Dialog: CPAN.*
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
*.RECTYP  "FEP",  M/I/U/ Data type of inspection  FEP = Production order
|     |                | requirement  |     | WEP = Goods receipt  |     |
| --- | -------------- | ------------ | --- | -------------------- | --- |
|     | "WEP",  D/S/A  |              |     |                      |     |
WAP = Goods issue
"WAP",
EMU = Initial sample inspection
"EMU"
*.BER  C10C10  M/I/U/ Area for which the  An area with the corresponding area ID
|     |          | inspection requirement  |     | must exist in HYDRA.    |     |
| --- | -------- | ----------------------- | --- | ----------------------- | --- |
|     |   D/S/A  |                         |     |                         |     |
|     |          | applies.                |     | By default, these are:  |     |
E = Goods receipt
F = Production
A = Goods issue
EMU = Initial sample
| *.PANNR  | N9  (M/I/  | Internal HYDRA  |     |     |     |
| -------- | ---------- | --------------- | --- | --- | --- |
inspection requirement
U/D/
S/A)*  number
| *.PPS:REF  | C250  (M/I/  | PPS  reference  |     |     |     |
| ---------- | ------------ | --------------- | --- | --- | --- |
number
U/D/
S/A)*
| *.PPS:ZCHR1  | C250    | PPS addition  |     |     |     |
| ------------ | ------- | ------------- | --- | --- | --- |
*.ANR  C250  (M/I/  Order number  The database permits an entry of up to
250 characters in this field. But this field
U/D/
is bound to the Length of order number
S/A)*
specified in the HYDRA basic settings
and you must therefore respect the
length specified there.
Do not use any special characters.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 91 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.ATK
|     | C50  (M/I/  | Article number  |     | An article with the corresponding   |     |
| --- | ----------- | --------------- | --- | ----------------------------------- | --- |
|     | U/D/        |                 |     | combination of article number and   |     |
|     | S/A)*       |                 |     | drawing issue number must exist in  |     |
HYDRA.
*.ATKIDX  Drawing issue number  An article with the corresponding
|     | C50  (M/I/  |                 |     |                                     |     |
| --- | ----------- | --------------- | --- | ----------------------------------- | --- |
|     | U/D/        | of the article  |     | combination of article number and   |     |
|     | S/A)*       |                 |     | drawing issue number must exist in  |     |
HYDRA.
If required, the drawing issue number
may be left empty.
| *.AGNR  | C50  (M/I/  | Operation number  |     |     |     |
| ------- | ----------- | ----------------- | --- | --- | --- |
U/D/
S/A)*
*.AGBEZ
|     | C250    | Operation  |     |     |     |
| --- | ------- | ---------- | --- | --- | --- |
designation/name
*.PPLID  C50    Inspection  plan  Inspection plan number used to create
|     |     | number  |     | the inspection requirement. If the  |     |
| --- | --- | ------- | --- | ----------------------------------- | --- |
inspection plan number is not specified,
HYDRA automatically identifies the
inspection plan using the defined
criteria.
*.PPLIDX  Inspection plan version  Inspection plan version used to create
|     | C50    |     |     |     |     |
| --- | ------ | --- | --- | --- | --- |
the inspection requirement. If the
inspection plan number is not specified,
HYDRA automatically identifies the
inspection plan using the defined
criteria.
*.KDNR
C50  (M/I/  Customer number  For RECTYP=WEP, the parameter must
|     | U/D/  |     |     | be empty.  |     |
| --- | ----- | --- | --- | ---------- | --- |
S/A)*
A customer with the respective customer
number must exist in HYDRA.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 92 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.HERSTNR
C50  (M/I/  Manufacturer number  For RECTYP<>WEP, the parameter
|     | U/D/  |     |     | must be empty.  |     |
| --- | ----- | --- | --- | --------------- | --- |
S/A)*
A manufacturer with the respective
manufacturer number must exist in
HYDRA.
*.LIEFNR  C50  (M/I/  Supplier number  A supplier with the respective supplier
|     | U/D/  |     |     | number must exist in HYDRA.  |     |
| --- | ----- | --- | --- | ---------------------------- | --- |
S/A)*
*.CNR
|     | C250  (M/I/  | Batch number   |     |     |     |
| --- | ------------ | -------------- | --- | --- | --- |
U/D/
S/A)*
| *.MNR  | C50  | Machine number  |     |     |     |
| ------ | ---- | --------------- | --- | --- | --- |
(M/I/
U/D/
S/A)*
*.PANDAT  Date    Date of the inspection  If no value was transferred and a new
|     |     | requirement  |     | inspection requirement is created, the  |     |
| --- | --- | ------------ | --- | --------------------------------------- | --- |
field is filled with the current system date
during processing.
*.PANZEI  Time    Time of the inspection  If no value was transferred and a new
|     |     | requirement  |     | inspection requirement is created, the  |     |
| --- | --- | ------------ | --- | --------------------------------------- | --- |
field is filled with the current system time
during processing.
*.PANVON  C50    Person or process that  If no value was transferred and a new
|     |     | has set the inspection  |     | inspection requirement is created, then     |     |
| --- | --- | ----------------------- | --- | ------------------------------------------- | --- |
|     |     | requirement             |     | the user ID of the interface is entered in  |     |
the field.
| *.LIEFDAT  | Date    | Delivery date (actual)  |     |     |     |
| ---------- | ------- | ----------------------- | --- | --- | --- |
|            | Date    | Delivery date (target)  |     |     |     |
*.LIEFDAT:SOLL
| *.CMENGE  | N12.4    | Delivery  | quantity  |     |     |
| --------- | -------- | --------- | --------- | --- | --- |
(actual)
|     | N12.4    | Delivery  | quantity  |     |     |
| --- | -------- | --------- | --------- | --- | --- |
*.CMENGE:SOLL
(target)

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 93 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.BESTNR
|     | C250  (M/I/  | Purchase  | order  |     |     |
| --- | ------------ | --------- | ------ | --- | --- |
U/D/  number
S/A)*
| *.HERSTDAT       | Date    | Manufacturing date  |     |     |     |
| ---------------- | ------- | ------------------- | --- | --- | --- |
| *.FU:1 to*.FU:5  | C50     | Direct user fields  |     |     |     |
| *.FU:6           | N9      | Direct user fields  |     |     |     |
to*.FU:10
| *.FU:11;  | N12.9    | Direct user fields  |     |     |     |
| --------- | -------- | ------------------- | --- | --- | --- |
*.FU:12
| *.FU:13;  | Date    | Direct user fields  |     |     |     |
| --------- | ------- | ------------------- | --- | --- | --- |
*.FU:14
* please also see 3.2.14.1 Method calls with the PPS reference number (default)
and 3.2.14.2 Method calls without a PPS reference number
| 3.2.14.5  | AIP Specifics  |     |     |     |     |
| --------- | -------------- | --- | --- | --- | --- |
Please note the following when using the AIP terminal.
If the AIP is used, inspection requirements are usually generated automatically for the production area
when an operation is logged on.
| 3.2.15  | Inspection points  |     |     |     |     |
| ------- | ------------------ | --- | --- | --- | --- |
WARNING!  If you use inspection points in an inspection step, then you must collect the data
for the inspection points. By default, this is only true for in-production inspections
|     | (data type RECTYP=FEP).  |     |     |     |     |
| --- | ------------------------ | --- | --- | --- | --- |
If customized accordingly, this function can also be made available for other data
types.
The following dialogs are available for updating inspection points:
|   CPANUMP.MODIFY  |     | to create or change inspection points  |     |     |     |
| ------------------ | --- | -------------------------------------- | --- | --- | --- |
|   CPANUMP.INSERT  |     | to create inspection points            |     |     |     |
|   CPANUMP.UPDATE  |     | to change inspection points            |     |     |     |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 94 of 123  |
| ---------------- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

|   CPANUMP.ABSCHLIESSEN  |     |     | to complete inspection points  |     |     |     |
| ------------------------ | --- | --- | ------------------------------ | --- | --- | --- |
|   CPANUMP.FREIGEBEN     |     |     | to release inspection points   |     |     |     |
|   CPANUMP.DELETE        |     |     | to delete inspection points    |     |     |     |
The  unique  key  for  inspection  points  is  made  up  of  the  fields  CPANUMP.RECTYP,  CPANUMP.BER,
CPANUMP.PANNR, CPANUMP.PAUNR, CPANUMP.EINTTYP and CPANUMP.EINTNR.
There is also an alternative method available to reference the corresponding inspection requirement.
Therefore, in some cases there is no need to use parameter CPANUMP.PANNR (see 3.2.15.1 Calculating
the inspection step reference).
Inspection points can only be created, changed and deleted for inspection steps with any status except
| for "completed", "cancelled" or "no characteristic".  |     |     |     |     |     |     |
| ----------------------------------------------------- | --- | --- | --- | --- | --- | --- |
The  corresponding  inspection  requirement  must  not  have  the  status  "completed",  "canceled",  "no
inspection step" or "no characteristic" in order to create new inspection points or to change or delete
existing ones.
Please note that the field lengths indicated here are maximum values. Corresponding field lengths might
be restricted for the AIP terminal.
| 3.2.15.1  | Calculating the inspection step reference  |     |     |     |     |     |
| --------- | ------------------------------------------ | --- | --- | --- | --- | --- |
If the inspection requirement number is unknown, the parameter CPANUMP.PANNR can be omitted. In that
case the inspection requirement number is calculated based on the parameters  CPANUMP.RECTYP,
CPANUMP.BER, CPANUMP.PPS:REF. However, this requires that only exactly one inspection requirement
exists with the PPS reference number transferred as parameter CPANUMP.PPS:REF.
All other requirements for referencing the inspection requirement and/or inspection step can only be
implemented if the system is customized. The training course CUT-IMI provides the required basics and
skills.
| 3.2.15.2  | Field definition  |     |     |     |     |     |
| --------- | ----------------- | --- | --- | --- | --- | --- |
Dialog: CPANUMP.*
| Parameter  |     | Type  | Manda Contents  |     | Description  |     |
| ---------- | --- | ----- | --------------- | --- | ------------ | --- |
tory

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 95 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.RECTYP
|     |     | "FEP“  | I/M/  Data type of inspection  |     | By default, only in-production  |     |
| --- | --- | ------ | ------------------------------ | --- | ------------------------------- | --- |
|     |     |        | U/D/  requirement              |     | inspections                     |     |
|     |     |        | A/F                            |     |   FEP = production order       |     |
are configured for data collection
relating to inspection points.
If required, other areas can also be
configured accordingly. In this case, the
corresponding entries (see inspection
requirements) must be used.
*.BER  C10  I/M/  Area for which the  An area with the corresponding area ID
|     |     |     | U/D/  inspection requirement  |     | must exist in HYDRA.  |     |
| --- | --- | --- | ----------------------------- | --- | --------------------- | --- |
applies.
A/F
*.PANNR
N9  (I/M/  Internal HYDRA  In HYDRA, an inspection requirement
|     |     |     | U/D/  inspection requirement  |     | with the respective number must exist  |     |
| --- | --- | --- | ----------------------------- | --- | -------------------------------------- | --- |
|     |     |     | A/F) *  number                |     | for the type and area.                 |     |
*.PAUNR  N9  (I)/(M)/  Internal HYDRA  In HYDRA, an inspection step with the
|     |     |     | U/D/  inspection step  |     | respective number must exist for the  |     |
| --- | --- | --- | ---------------------- | --- | ------------------------------------- | --- |
|     |     |     | A/F  number            |     | type and area.                        |     |
This parameter must remain empty, if an
inspection point is generated as sample
of a sample group.
| *.EINTTYP  |     | "PPUNKT“  | I/M/  Type of entry  |     |     |     |
| ---------- | --- | --------- | -------------------- | --- | --- | --- |
U/D/
A/F
*.EINTNR
C  5  (M)/  Inspection point  5-digit numeric number of the inspection
|     |     |     | U/D/  number  |     | point including leading zeros  |     |
| --- | --- | --- | ------------- | --- | ------------------------------ | --- |
(example: "00014").
A/F
This parameter must remain empty if a
new inspection point is to be created. As
the inspection point number must always
be assigned by HYDRA.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 96 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --------------- |

HYDRA-CAQ Interface to ERP Systems
*.PPKT:EQUIP C 20 Equipment The corresponding inspection step
defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
For cavity-related inspection results
recording, this field includes the tool.
A tool with this number must exist in
HYDRA.
*.PPKT:TPLATZ C 20 Functional location The corresponding inspection step
defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:TLOS C50 Partial batch It might be necessary to treat this
parameter like a mandatory field, if the
inspection step requires it.
*.PPKT:CNRs C50 Batch number It might be necessary to treat this
parameter like a mandatory field, if the
inspection step requires it.
*.PPKT:USERC1 C50 Inspection point user The corresponding inspection step
field C1 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:USERC2 C50 Inspection point user The corresponding inspection step
field C2 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:USERN1 N9 Inspection point user The corresponding inspection step
field N1 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:USERN2 N9 Inspection point user The corresponding inspection step
field N2 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
EIS-CES_82.docx Version: 1.0.23049 Page 97 of 123

HYDRA-CAQ Interface to ERP Systems
*.PPKT:USERD1 Date Inspection point user The corresponding inspection step
field D1 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:USERT1 Time Inspection point user The corresponding inspection step
field T1 defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
*.PPKT:PRBGRP C50 Sample group If this field is completed, the inspection
point represents a sample of the defined
sample group.
An inspection step including inspection
characteristics of this sample group
must exist in the inspection requirement.
In this case, the parameter
CPANUMP.PAUNR must not be
indicated as HYDRA searches
autonomously for the corresponding
inspection step.
*.PPKT:PROBE C 20 Physical sample The corresponding inspection step
defines if this field should be displayed
in the input dialog and if it is an optional
or mandatory field.
This parameter can remain empty if a
new sample is to be created for a
specific sample group. Then HYDRA
generates the sampe number using the
number range "QMPRBNR".
*.PPKT:MNR C 20 Target workplace Usually, the AIP only shows inspection
points of machines matching this
parameter. If this parameter is empty,
the AIP terminal shows all inspection
points (of all machines).
A workplace with the respective number
must exist in HYDRA.
EIS-CES_82.docx Version: 1.0.23049 Page 98 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.PPKT:PRODMNR
C  20    Machine producing the  A workplace with the respective number
|     |     |     | items for the  | must exist in HYDRA.  |     |
| --- | --- | --- | -------------- | --------------------- | --- |
inspection point.
| *.PPKT:CMENGE   |     | N12.4  |   Quantity          |     |     |
| --------------- | --- | ------ | ------------------- | --- | --- |
| *.PPKT:EGRAUS   |     | N12.4  |   Scrap quantity    |     |     |
| *.PPKT:EGRNACH  |     | N12.4  |   Rework quantity   |     |     |
| *.PPKT:BEM      |     | C10    |   Comment           |     |     |
*.PPKT:ANLURS  C50    Cause for creation  The cause for creation identifies the
event triggering the generation of the
inspection point.
By default, HYDRA uses the following
causes:
  FREI - manually generated
  MENGE - production quantity
  ZEIT - production time
  A_AN - OP logon
  M_MST - machine status
change
  PROBE - sampling
  ALW - output batch change
  SW - shift change
We recommend using separate causes
for separate applications. To do so, a
CAQ status of the type "PPKTANLURS“
must be created.
| *.PPKT:ANLURSDAT  |     | Date  |   Date of the event  |     |     |
| ----------------- | --- | ----- | -------------------- | --- | --- |
triggering the
generation of
inspection points
| *.PPKT:ANLURSZEI  |     | Time  |   Time of the event  |     |     |
| ----------------- | --- | ----- | -------------------- | --- | --- |
triggering the
generation of
inspection points
| *.PPKT:ANLDAT  |     | Date  |   Date of generation  |     |     |
| -------------- | --- | ----- | --------------------- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 99 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.PPKT:ANLZEI
|     |     | Time  |   Time of generation  |     |     |
| --- | --- | ----- | --------------------- | --- | --- |
*.PPKT:ANLVON
|     |     | C50  |   Person generating the  |     |     |
| --- | --- | ---- | ------------------------ | --- | --- |
inspection point
| *.PPKT:ABSDAT  |     | Date  |   Date of completion     |     |     |
| -------------- | --- | ----- | ------------------------ | --- | --- |
| *.PPKT:ABSZEI  |     | Time  |   Time of completion     |     |     |
| *.PPKT:ABSVON  |     | C50   |   Person completing the  |     |     |
inspection point
*.CNR  C  20    HYDRA batch number   If this parameter is completed, this
inspection point is assigned to the
referenced batch.
A batch with this number must exist in
HYDRA.
*.PPKT:VEKATART  C10    Catalog type of the  This parameter may only be transferred
|     |     |     | usage decision  | with CPANUMP.ABSCHLIESSEN.  |     |
| --- | --- | --- | --------------- | --------------------------- | --- |
Usually, this parameter is assigned to
the value "QM_PP_BEW".
A catalog entry matching the catalog
type, site/plant, selected set, code group
and code must exist in HYDRA.
*.PPKT:VEWERK  C  4    Site/plant of the usage  This parameter may only be transferred
|     |     |     | decision  | with CPANUMP.ABSCHLIESSEN.  |     |
| --- | --- | --- | --------- | --------------------------- | --- |
Usually, this parameter is assigned to
the value "0001".
A catalog entry matching the catalog
type, site/plant, selected set, code group
and code must exist in HYDRA.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 100 of 123  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.PPKT:VEAUSWMEN
C10    Selected set of the  This parameter may only be transferred
|     |     |     | usage decision  |     | with CPANUMP.ABSCHLIESSEN.  |     |
| --- | --- | --- | --------------- | --- | --------------------------- | --- |
Usually, this parameter is assigned to
the value "PPKT_VE".
A catalog entry matching the catalog
type, site/plant, selected set, code group
and code must exist in HYDRA.
*.PPKT:VECODGR  C10    Code group of the  This parameter may only be transferred
|     |     |     | usage decision  |     | with CPANUMP.ABSCHLIESSEN.  |     |
| --- | --- | --- | --------------- | --- | --------------------------- | --- |
Usually, this parameter is assigned to
the value "01".
A catalog entry matching the catalog
type, site/plant, selected set, code group
and code must exist in HYDRA.
*.PPKT:VECODE  C10    Code of the usage  This parameter may only be transferred
|     |     |     | decision  |     | with CPANUMP.ABSCHLIESSEN.  |     |
| --- | --- | --- | --------- | --- | --------------------------- | --- |
Usually, this parameter is assigned to
the value "A" (accepted) for a "pass"
usage decision or "R" (reject) for a
"failed"  usage decision.
A catalog entry matching the catalog
type, site/plant, selected set, code group
and code must exist in HYDRA.
| *.FU:1 to*.FU:5   |     | C50    |   Direct user fields  |     |     |     |
| ----------------- | --- | ------ | --------------------- | --- | --- | --- |
| *.FU:6 to*.FU:10  |     | N9     |   Direct user fields  |     |     |     |
| *.FU:11; *.FU:12  |     | N12.9  |   Direct user fields  |     |     |     |
| *.FU:13; *.FU:14  |     | Date   |   Direct user fields  |     |     |     |
|                   |     |        |                       |     |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 101 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

*.MOD:NOSTATUSERR "0" or "1"
|     |     | F  The status of         |     | If  this  parameter                        | is  "1",                | the  system  |
| --- | --- | ------------------------ | --- | ------------------------------------------ | ----------------------- | ------------ |
|     |     | inspection               |     | allows creation and editing of inspection  |                         |              |
|     |     | requirements or          |     | points,                                    | although  the           | inspection   |
|     |     | inspection steps is not  |     | requirement                                | status  or  inspection  | step         |
|     |     | checked.                 |     | status  is                                 | invalid  (canceled,     | competed,    |
etc.).
If the status is invalid and the parameter
is "0", an error message is issued.
* please also see 3.2.15.1 Calculating the inspection step reference
| 3.2.16  | Measured values/inspection results  |     |     |     |     |     |
| ------- | ----------------------------------- | --- | --- | --- | --- | --- |
The following dialogs are available for updating measured values:
|   CPAUMW.INSERT  |   to create measured values  |     |     |     |     |     |
| ----------------- | ---------------------------- | --- | --- | --- | --- | --- |
  CPAUMW.UPDATE  to modify measured values
  CPAUMW.MODIFY  to modify a measured value (if the referenced measured value does
not exist, it is created).
  CPAUMW.DELETE  to delete measured values
The unique key for the measured values is made up of the fields CPAUMW.RECTYP, CPAUMW.BER,
CPAUMW.PANNR, CPAUMW.PAUNR, CPAUMW.AFO, CPAUMW.STPRNR and CPAUMW.WERTNR.
There are also alternate methods available to reference the corresponding inspection step. With them, in
some cases there is no need to use the parameters CPAUMW.PANNR or CPAUMW.PAUNR (see 3.2.16.1
Calculating the inspection step reference).
When  creating  new  measured  values,  using  the  parameters  CPAUMW.DEVICE:TYP,
CPAUMW.DEVICE:ID and CPAUMW.DEVICE:STPRNR device-specific sample number ranges can be
used  (see  3.2.16.2  Device-specific  number  ranges  for  samples).  In  this  case,  parameter
CPAUMW.STPRNR must not be used.
Furthermore, when a new measured value is created, parameter CPAUMW.WERTNR and also parameter
CPAUMW.STPRNR must not be used (see 3.2.16.3 Dynamic calculation of sample numbers and 3.2.16.4
Dynamic identification of the measured value number).

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 102 of 123  |     |
| ---------------- | --- | ------------------- | --- | --- | ---------------- | --- |

HYDRA-CAQ Interface to ERP Systems
Before creating or modifying measured values, you must make sure that the corresponding inspection
step characteristic already exists.
Creating or modifying values for calculated characteristics is only allowed if the characteristics have a
corresponding formula type (see documentation).
If a measured value violates the plausibility limits of a characteristic, it is usually rejected (see also
parameter CPAUMW.MOD:NOPLAUSI).
Creating valid measured values and modifying or deleting existing measured values is only possible for
inspection steps with any status except for "completed", "canceled" or "no characteristic" (please also see
parameter CPAUMW.MOD:NOSTATUSERR).
Please note that the field lengths indicated here are maximum values. Corresponding field lengths might
be restricted for the AIP terminal.
3.2.16.1 Calculating the inspection step reference
If the inspection requirement number is unknown, the parameter CPAUMW.PANNR can be omitted. The
inspection requirement number is in that case calculated based on the parameters CPAUMW.RECTYP,
CPAUMW.BER und CPAUMW.PAUNR.
If the inspection step number is unknown, the parameter CPAUMW.PAUNR can be omitted. The inspection
step is then calculated based on the parameters CPAUMW.RECTYP, CPAUMW.BER, CPAUMW.PANNR
and CPAUMW.AFO.
If the parameter CPAUMW.PANNR and the parameter CPAUMW.PAUNR are unknown, then they can also be
calculated based on the parameters CPAUMW.RECTYP, CPAUMW.BER, CPAUMW.PPS:REF and
CPAUMW.AFO. However, this requires that only exactly one inspection requirement exists with the PPS
reference number transferred as parameter CPAUMW.PPS:REF.
All other requirements to reference the inspection step can only be implemented if the system is
customized. The training course CUT-IMI provides the required basics and skills.
3.2.16.2 Device-specific number ranges for samples
When working with measured values, optionally you can also specify from which device they originate. A
separate number range for samples can exist for each device. This may deviate from the HYDRA sample
number range.
Example:
EIS-CES_82.docx Version: 1.0.23049 Page 103 of 123

|     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | ----------------------------------- | --- | --- |

At device A, three samples and at device B two samples of an inspection step characteristic were
recorded with the following reference:
CPAUMW.RECTYP=FEP
CPAUMW.BER=F
CPAUMW.PANNR=5
CPAUMW.PAUNR=7
CPAUMW.AFO=30

In this case, the entries of the HYDRA-CAQ sample table can appear as follows:
RECTYP  BER  PANNR  PAUNR  OP  STPRNR  DEVICE:ID  DEVICE:STPRNR
sequ
ence
|     | FEP  F  5  | 7  30  | 1   | A   | 1   |
| --- | ---------- | ------ | --- | --- | --- |
|     | FEP  F  5  | 7  30  | 2   | B   | 1   |
|     | FEP  F  5  | 7  30  | 3   | B   | 2   |
|     | FEP  F  5  | 7  30  | 4   | A   | 2   |
|     | FEP  F  5  | 7  30  | 5   | A   | 3   |
If device-specific sample number ranges are used, the sample can be referenced using the parameters
CPAUMW.DEVICE:TYP, CPAUMW.DEVICE:ID and CPAUMW.DEVICE:STPRNR. In this case, parameter
CPAUMW.STPRNR must not be used.
WARNING!  Device-specific number ranges for samples can only be used if inspection steps
are recorded in relation to samples instead of inspection points.
The sample number is largely specified by the inspection point if inspection steps are
recorded in relation to inspection points (exception: cavity-related data collection for
samples).
| 3.2.16.3  | Dynamic calculation of sample numbers  |     |     |     |     |
| --------- | -------------------------------------- | --- | --- | --- | --- |
If the parameter CPAUMW.STPRNR (or the parameters CPAUMW.DEVICE:TYP, CPAUMW.DEVICE:ID
and CPAUMW.DEVICE:STPRNR) is omitted as well, a check is run to determine whether the last sample of
the referenced characteristic was completed (manually or by reaching the sample size). In this case, a
new sample is generated for the measured value. Otherwise, the measured value is added to the last
sample.

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 104 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

WARNING!  Sample  numbers  can  only  be  identified  dynamically  if  inspection  steps  are
|     | recorded in relation to samples instead of inspection points.  |     |     |     |     |     |
| --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- |
The sample must always be referenced directly for inspection steps recorded in relation
to inspection points.
To  modify  and  delete  measured  values,  the  sample  number  (parameters  CPAUMW.STPRNR  or
CPAUMW.DEVICE:TYP,  CPAUMW.DEVICE:ID  and  CPAUMW.DEVICE:STPRNR)  must  always  be
specified.
All other requirements to reference the sample can only be implemented by customizing the system. The
training course CUT-IMI provides the required basics and skills.
3.2.16.4  Dynamic identification of the measured value number
New measured values can be created even without specifying the parameter CPAUMW.WERTNR. In this
case, measured values are simply added to the end of the specified sample (referenced by the parameter
CPAUMW.STPRNR  or  the  parameters  CPAUMW.DEVICE:TYP,  CPAUMW.DEVICE:ID  and
CPAUMW.DEVICE:STPRNR).
When  modifying  and  deleting  measured  values,  the  measured  value  number  (the  parameter
CPAUMW.WERTNR) must always be indicated.
All other requirements to reference the measured value can only be implemented by customizing the
system. The training course CUT-IMI provides the required basics and skills.
| 3.2.16.5  | Field definition  |     |     |     |     |     |
| --------- | ----------------- | --- | --- | --- | --- | --- |
Dialog: CPAUMW.*
| Parameter  |     | Type  | Manda Contents  |     | Description  |     |
| ---------- | --- | ----- | --------------- | --- | ------------ | --- |
tory
*.RECTYP  „FEP“,  I/M/  Data type of inspection  FEP = Production order
|     |     |         | requirement  |     | WEP = Goods receipt  |     |
| --- | --- | ------- | ------------ | --- | -------------------- | --- |
|     |     | „WEP“,  | U/D          |     |                      |     |
WAP = Goods issue
„WAP“,
EMU = Initial sample inspection
„EMU“,
PMV = Test equipment (gage)
„PMV“
management
*.BER  C10  I/M/  Area for which the  An area with the corresponding area ID
|     |     |     | inspection requirement  |     | must exist in HYDRA.  |     |
| --- | --- | --- | ----------------------- | --- | --------------------- | --- |
U/D
applies.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 105 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

*.PANNR
N9  (I/M/  Internal HYDRA  In HYDRA, an inspection requirement
|     |     |     | U/D) *  inspection requirement  |     | with the respective number must exist  |     |
| --- | --- | --- | ------------------------------- | --- | -------------------------------------- | --- |
|     |     |     | number                          |     | for the type and area.                 |     |
*.PAUNR  N9  (I/M/  Internal HYDRA  In HYDRA, an inspection step with the
|     |     |     | inspection step  |     | respective number must exist for the  |     |
| --- | --- | --- | ---------------- | --- | ------------------------------------- | --- |
U/D) *
|     |     |     | number  |     | type and area.  |     |
| --- | --- | --- | ------- | --- | --------------- | --- |
*.AFO  N9  I/M/  Work sequence (OP  In HYDRA, a characteristic with this
|     |     |     | sequence) number of  |     | work sequence (OP sequence) number  |     |
| --- | --- | --- | -------------------- | --- | ----------------------------------- | --- |
U/D
|     |     |     | the inspection step  |     | must exist for the referenced inspection  |     |
| --- | --- | --- | -------------------- | --- | ----------------------------------------- | --- |
|     |     |     | characteristic       |     | step                                      |     |
*.STPRNR  N9  (I/M/  Internal HYDRA  The sample number will be issued
|     |     |     | sample number  |     | consecutively within an inspection step  |     |
| --- | --- | --- | -------------- | --- | ---------------------------------------- | --- |
U/D) *
characteristic, starting at 1.
*.WERTNR  N9  (I/M/  Internal HYDRA  The number of the measured value will
|               |     |      | U/D) *  number of the        |     | be issued consecutively within a sample  |     |
| ------------- | --- | ---- | ---------------------------- | --- | ---------------------------------------- | --- |
|               |     |      | measured value within        |     | of an inspection step characteristic,    |     |
|               |     |      | a sample                     |     | starting at 1.                           |     |
| *.DEVICE:TYP  |     | C50  | (I/M/  Device type at which  |     |                                          |     |
U/D) *  the measured value
was recorded
*.DEVICE:ID
C50  (I/M/  Device's identifier at  This parameter can only be used in
|     |     |     | U/D) *  which the measured  |     | combination with the parameter  |     |
| --- | --- | --- | --------------------------- | --- | ------------------------------- | --- |
|     |     |     | value was recorded          |     | DEVICE:TYP.                     |     |
*.DEVICE:STPRNR  Sample number at the  This parameter can only be used in
|     |     | N9  | (I/M/                        |     |                                  |     |
| --- | --- | --- | ---------------------------- | --- | -------------------------------- | --- |
|     |     |     | U/D) *  device at which the  |     | combination with the parameters  |     |
|     |     |     | measured value was           |     | DEVICE:TYP and DEVICE:ID.        |     |
recorded
*.MOD:AKTNUM  „1“  (I/M/  Flag indicating if the  This parameter may and must only be
transferred if the corresponding
U/D)  corresponding
|     |     |     | inspection point must  |     | characteristic is collected based on  |     |
| --- | --- | --- | ---------------------- | --- | ------------------------------------- | --- |
|     |     |     | be updated.            |     | inspection points.                    |     |
*.NUM:EINTTYP  "PPUNKT“  (I/M/  Type of inspection  This parameter may and must only be
|     |     |     | point that must be  |     | transferred if the corresponding  |     |
| --- | --- | --- | ------------------- | --- | --------------------------------- | --- |
U/D)
characteristic is collected based on
updated.
inspection points.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 106 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.NUM:EINTNR
C  5  (I/M/  Number of the  This parameter may and must only be
  U/D)  inspection point that  transferred if the corresponding
|     |     |     | must be updated.  | characteristic is collected based on  |     |
| --- | --- | --- | ----------------- | ------------------------------------- | --- |
inspection points.
This parameter includes the number of
the corresponding inspection point (5-
digit, including leading zeros).
*.MOD:AKTNPSTA  „1“  (I/M/  Flag indicating if the  This parameter may and must only be
|     |     |     | U/D)  status of the    | transferred if the corresponding      |     |
| --- | --- | --- | ---------------------- | ------------------------------------- | --- |
|     |     |     | corresponding          | characteristic is collected based on  |     |
|     |     |     | inspection point must  | inspection points.                    |     |
be updated.
*.UNGUELTIG  "0" or "1"  I/M/U  Flag showing the  If this parameter is "1", the
|     |     |     | validity of the  | corresponding measured value is            |     |
| --- | --- | --- | ---------------- | ------------------------------------------ | --- |
|     |     |     | measured value   | marked as invalid. It is not used for the  |     |
evaluation of the corresponding
characteristic or in the statistics
calculation.
If this parameter is "0", the
corresponding measured value is
considered to be valid.
| *.BEM  |     | C250  |   Comment  |     |     |
| ------ | --- | ----- | ---------- | --- | --- |
*.MW  N12.8    Measured value  The parameter must be empty for
attributive characteristics.
*.BFARG:1 to  N12.8    Arguments for  These parameters are only available
|     |     |     | calculated  | from CAQ 8.2 onwards.  |     |
| --- | --- | --- | ----------- | ---------------------- | --- |
*.BFARG:10
characteristics
These parameters may only be used for
enhanced calculated characteristics.
Only arguments that are part of the
formula are supported. Then these
parameters must be treated like a
mandatory field.
*.STPRUMF
|     |     | N9  |   Sample size  | The parameter must be empty with  |     |
| --- | --- | --- | -------------- | --------------------------------- | --- |
variable characteristics.This parameter
specification is optional. If it is empty, the
sample size of the corresponding
characteristic is assumed.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 107 of 123  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
*.ERRMENGE N9 Number of non- The parameter must be empty with
conforming units variable characteristics.
*.BEWKATART:1 C10 Catalog type of the This parameter is only available as of
assessment catalog CAQ 8.2.
This parameter may only be used for
characteristics evaluated based on
catalogs.
The entry for the corresponding
characteristic referenced in the HYDRA
assessment catalog must be available.
Usually, the value of this parameter is
assigned to "BEW_CODE_1".
*.BEWWERK:1 C 4 Site/plant of the This parameter is only available as of
assessment catalog CAQ 8.2.
This parameter may only be used for
characteristics evaluated based on
catalogs.
The entry for the corresponding
characteristic referenced in the HYDRA
assessment catalog must be available.
Usually, the value of this parameter is
empty.
*.BEWAUSWMEN:1 C10 Selected set of the This parameter is only available as of
assessment catalog CAQ 8.2.
This parameter may only be used for
characteristics evaluated based on
catalogs.
The entry for the corresponding
characteristic referenced in the HYDRA
assessment catalog must be available.
Usually, the ID of the selected set
matches the ID of the parameter
"selected set" of the characteristic.
EIS-CES_82.docx Version: 1.0.23049 Page 108 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.BEWCODGR:1
C10    Failure group of the  This parameter is only available as of
|     |     |     | assessment catalog  | CAQ 8.2.  |     |
| --- | --- | --- | ------------------- | --------- | --- |
This parameter may only be used for
characteristics evaluated based on
catalogs.
The entry for the corresponding
characteristic referenced in the HYDRA
assessment catalog must be available.
*.BEWCODE:1  C10    Defect/failure code of  This parameter is only available as of
|     |     |     | the assessment  | CAQ 8.2.  |     |
| --- | --- | --- | --------------- | --------- | --- |
catalog
This parameter may only be used for
characteristics evaluated based on
catalogs.
The entry for the corresponding
characteristic referenced in the HYDRA
assessment catalog must be available.
*.MNR
C50    Machine that the  This parameter specification is optional.
|     |     |     | measured value  | The machine number is managed at  |     |
| --- | --- | --- | --------------- | --------------------------------- | --- |
|     |     |     | belongs to      | sample level. By specifying this  |     |
parameter, the machine is assigned to
the current sample.
A machine with the corresponding
machine number must exist in HYDRA.
| *.PNR  |     | C50  |   User ID for the  |     |     |
| ------ | --- | ---- | ------------------ | --- | --- |
inspector
*.KNR  C50    The inspector's badge  Im HYDRA muss eine Person mit der
|     |     |     | number  | entsprechenden  Kartennummer  |     |
| --- | --- | --- | ------- | ----------------------------- | --- |
existieren.
*.MWDAT  Date    Date when the  If this parameter is empty, the current
|     |     |     | measured value was  | system date is entered.  |     |
| --- | --- | --- | ------------------- | ------------------------ | --- |
recorded
*.MWZEI  Time    Time when the  If this parameter is empty, the current
|     |     |     | measured value was  | system time is entered.  |     |
| --- | --- | --- | ------------------- | ------------------------ | --- |
recorded

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 109 of 123  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
*.MWID Measured value ID Usually, this parameter is only used if
inspection results are imported via MDI.
In exceptional cases, it can also be used
for the identification of the measured
value.
This parameter must be unique
throughout the system.
*.MOD:NOPLAUSI "0" or "1" F No validation check If this parameter is "1", the measured
value is not checked. No inspection will
be conducted against the
plausibility/validation limits defined in the
inspection characteristic.
*.MOD:NOSTATUSERR "0" or "1" F The status of If this parameter is "1", the system will
inspection allow a new measured value to be
requirements or created for an invalid status for
inspection steps is not inspection requirements or inspection
checked. steps (cancellation, finished, etc.).
However, in this case the measured
value will be marked as invalid,
irrespective of the content of the
parameter CPAUMW.UNGUELTIG.
If the status is invalid and the parameter
is "0", an error message is issued.
Modifying or deleting existing measured
values is generally not possible for an
invalid status.
* in this regard see chapter 3.2.16.1 Calculating the inspection step reference
and 3.2.16.2 Device-specific number ranges for samples
and 3.2.16.3 Dynamic calculation of sample numbers
and 3.2.16.4 Dynamic identification of the measured value number
3.2.17 Complaint header data
The following dialogs are available for updating complaint header data:
 CREKAUFT.INSERT to create entries for the complaint header data
 CREKAUFT.UPDATE to change entries for the complaint header data
 CREKAUFT.DELETE to delete entries for the complaint header data
EIS-CES_82.docx Version: 1.0.23049 Page 110 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

The  unique  key  for  the  complaint  header  data  is  made  up  of  the  fields  CREKAUFT.BER  and
CREKAUFT.REKAUFT.
Dialog: CREKAUFT.*
| Parameter  | Type  Mand | Contents  |     | Description  |     |
| ---------- | ---------- | --------- | --- | ------------ | --- |
atory
| *.RECTYP  | "REK"  I/U/D  | Fixed identification for  |     |     |     |
| --------- | ------------- | ------------------------- | --- | --- | --- |
complaint data
*.BER  C10  I/U/D  Area for which the  An area with the corresponding area ID must
|     |     | complaint applies.  |     | exist in HYDRA.  |     |
| --- | --- | ------------------- | --- | ---------------- | --- |
*.REKAUFT  C50  (I/U)/ Complaint order number  This parameter and the area clearly identify
|     | D   |     |     | the complaint.  |     |
| --- | --- | --- | --- | --------------- | --- |
This number can be generated by the system
if HYDRA was configured accordingly.
Therefore, the number does not need to be
transferred.
WARNING! Later, it may be necessary to
identify the complaint details using this
number.
*.REKART  C50  F  Complaint type  Only identifiers defined in HYDRA can be
used. By default, these are the following:
  "KUNDE" – customer complaint
  "LIEFERANT" – supplier complaint
  "INTERN“ – internal complaint
| *.REKDAT  | Date    | Date of the complaint  |     |     |     |
| --------- | ------- | ---------------------- | --- | --- | --- |
| *.REKZEI  | Time    | Time of the complaint  |     |     |     |
| *.REKVON  | C50     | Complaint created by   |     |     |     |
*.EXTNR
|     | C250    | External complaint  |     |     |     |
| --- | ------- | ------------------- | --- | --- | --- |
number

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 111 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
*.STA C50 F Complaint status Only identifiers defined in HYDRA can be
used. By default, these are the following:
 "ERFASST" – entered
 "BEARBEIT" – being processed
 "ABGESCHL" – finished
If the status is not indicated when creating a
complaint, the default status is used.
*.BEF C50 F Complaint findings Only identifiers defined in HYDRA can be
used. By default, these are the following:
 "UNBESTIMMT" - uncertain
 "UNGERECHTF" - not justified
 "TEILWGER" - partly justified
 "GERECHTF" - justified
The standard findings/results are used if no
findings are indicated when the complaint is
created.
*.REKLAM:TYP C50 F Type of complaining The following values are valid:
party.  "PERSON"
 "ABTEILUNG" - department
 "LIEFERANT" - supplier
 "KUNDE" - customer
 "HERSTELLER" - manufacturer
*.REKLAM:NR C50 Identifier of the The corresponding entry (depending on the
complaining party type) must be defined in HYDRA.
*.ANSPRP:TYP C50 F Type of contact person. The following values are valid:
 "PERSON"
 "ABTEILUNG" - department
 "LIEFERANT" - supplier
 "KUNDE" - customer
 "HERSTELLER" - manufacturer
*.ANSPRP:NR C50 Identifier of the contact The corresponding entry (depending on the
person type) must be defined in HYDRA.
EIS-CES_82.docx Version: 1.0.23049 Page 112 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.VERANT:TYP
|     | C50  F  | Type of party  |     | The following values are valid:  |     |
| --- | ------- | -------------- | --- | -------------------------------- | --- |
|     |         | responsible    |     |   "PERSON"                      |     |
  "ABTEILUNG" - department
  "LIEFERANT" - supplier
  "KUNDE" - customer
  "HERSTELLER" -  manufacturer
*.VERANT:NR  Identifier of the party in  The corresponding entry (depending on the
|            | C50     |                     |     |                                  |     |
| ---------- | ------- | ------------------- | --- | -------------------------------- | --- |
|            |         | charge              |     | type) must be defined in HYDRA.  |     |
| *.ZIELDAT  | Date    | Target date of the  |     |                                  |     |
complaint
| *.ZIELZEI  | Time    | Target time/date of the  |     |     |     |
| ---------- | ------- | ------------------------ | --- | --- | --- |
complaint
*.ISTDAT
|     | Date    | Actual date of the  |     |     |     |
| --- | ------- | ------------------- | --- | --- | --- |
complaint
| *.ISTZEI  | Time    | Actual time of the  |     |     |     |
| --------- | ------- | ------------------- | --- | --- | --- |
complaint
| *.KST       | C50     | Cost center           |     |     |     |
| ----------- | ------- | --------------------- | --- | --- | --- |
| *.LAGER     | C50     | Warehouse             |     |     |     |
| *.LIEFDAT   | Date    | Delivery date         |     |     |     |
| *.LIEFNR    | C50     | Delivery note number  |     |     |     |
| *.PPS:REF   | C250    | PPS reference number  |     |     |     |
| *.ZUSCHR:1  | C250    | Additional field 1    |     |     |     |
| *.ZUSCHR:2  | C250    | Additional field 2    |     |     |     |
| *.ZUSCHR:3  | C250    | Additional field 3    |     |     |     |
*.ZUSCHR:4
|     | C250    | Additional field 4  |     |     |     |
| --- | ------- | ------------------- | --- | --- | --- |
*.ZUSCHR:5
|         | C250               | Additional field 5  |     |     |     |
| ------- | ------------------ | ------------------- | --- | --- | --- |
| 3.2.18  | Complaint details  |                     |     |     |     |
The following dialogs are available for updating complaint details:

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 113 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
 CREKDET.INSERT to create entries of the complaint details
 CREKDET.UPDATE to change entries of the complaint details
 CREKDET.DELETE to delete entries of the complaint details
The unique key for the complaint details is made up of the fields CREKDET.RECTYP, CREKDET.BER,
CREDET.REKAUFT and CREKDET.REKDETNR.
In the process, parameter CREKDET.REKDETNR only needs to be transferred if you want to change or
delete a complaint detail that has already been created.
Before creating or changing complaint details, you must make sure that the corresponding complaint
header data already exists.
Dialog: CREKDET.*
Parameter Type Mand Contents Description
atory
*.RECTYP "REK" I/U/D Fixed identification for
complaint data
*.BER C10 I/U/D Area for which the An area with the corresponding area ID
complaint applies. must exist in HYDRA.
*.REKAUFT C50 I/U/D Complaint order number This parameter and the area clearly
identify the complaint.
*.REKDETNR N9 (I/U)/ Complaint detail Numeric value that identifies a complaint's
D detail.
This value is automatically generated
when a complaint detail is created.
*.ATK C50 Article number An article with the corresponding
combination of article number and drawing
issue number must exist in HYDRA.
*.ATKIDX C50 Drawing issue number An article with the corresponding
combination of article number and drawing
issue number must exist in HYDRA.
If required, the drawing issue number may
be left empty.
EIS-CES_82.docx Version: 1.0.23049 Page 114 of 123

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.LIEFNR
C50    Supplier number  A supplier with the corresponding supplier
number must exist in HYDRA.
| *.BESTNR   | C250    | Purchase order number  |     |     |     |
| ---------- | ------- | ---------------------- | --- | --- | --- |
| *.SERIENR  | C250    | Serial number          |     |     |     |
| *.CNR      | C250    | Batch number           |     |     |     |
*.STA  C50  F  Status of the complaint  Only identifiers defined in HYDRA can be
|     |     | detail  |     | used. By default, these are the following:  |     |
| --- | --- | ------- | --- | ------------------------------------------- | --- |
  "ERFASST" – entered
  "BEARBEIT" – being processed
  "ABGESCHL" – finished

If the status is not indicated when creating
a complaint, the default status is used.
*.BEF  C50  F  Findings of the  Only identifiers defined in HYDRA can be
|     |     | complaint detail  |     | used. By default, these are the following:  |     |
| --- | --- | ----------------- | --- | ------------------------------------------- | --- |
  "UNBESTIMMT" - uncertain
  "UNGERECHTF" - not justified
  "TEILWGER" - partly justified
  "GERECHTF" - justified
  "GARANTIE"
  "KULANZ"
The standard findings/results are used if
no findings are indicated when the
complaint is created.
*.VERANT:TYP  C50  F  Type of party  The following values are valid:
responsible
  "PERSON"
  "ABTEILUNG" - department
  "LIEFERANT" - supplier
  "KUNDE" - customer
  "HERSTELLER" -  manufacturer
*.VERANT:NR  C50    Identifier of the party in  The corresponding entry (depending on
|     |     | charge  |     | the type) must be defined in HYDRA.  |     |
| --- | --- | ------- | --- | ------------------------------------ | --- |
*.CMENGE:LIEF
|     | N12.4    | Delivery quantity  |     |     |     |
| --- | -------- | ------------------ | --- | --- | --- |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 115 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.CMENGE:REKL
|     | N12.4    | Quantity subject to  |     |     |     |
| --- | -------- | -------------------- | --- | --- | --- |
complaint
| *.CMENGE:PRUEF  | N12.4    | Quantity checked    |     |     |     |
| --------------- | -------- | ------------------- | --- | --- | --- |
| *.CMENGE:ERR    | N12.4    | Defective quantity  |     |     |     |
| *.CMENGE:PPM    | N12.4    | Parts per million   |     |     |     |
| *.WERT:LIEF     | N12.2    | Delivery value      |     |     |     |
| *.WERT:REKL     | N12.2    | Value of the goods  |     |     |     |
subject to complaint
| *.REKANTEIL  | N12.4    | Percentage of  |     |     |     |
| ------------ | -------- | -------------- | --- | --- | --- |
complaints
| *.ERRANTEIL  |     | Percentage of defects  |     |     |     |
| ------------ | --- | ---------------------- | --- | --- | --- |
N12.4
*.PPL:BER  C10    Area in the  An area with the corresponding area ID
|     |     | corresponding  |     | must exist in HYDRA.  |     |
| --- | --- | -------------- | --- | --------------------- | --- |
inspection plan
*.PPL:PPLNR  N9    Number of the  An inspection plan with the respective
|     |     | corresponding  |     | number must exist in HYDRA.  |     |
| --- | --- | -------------- | --- | ---------------------------- | --- |
inspection plan
*.PRPAN:BER  C10    Area of the  An area with the corresponding area ID
|     |     | corresponding source  |     | must exist in HYDRA.  |     |
| --- | --- | --------------------- | --- | --------------------- | --- |
inspection requirement
*.PRPAN:PANNR  N9    Number of the  An inspection requirement with the
|     |     | corresponding source  |     | respective number must exist in HYDRA.  |     |
| --- | --- | --------------------- | --- | --------------------------------------- | --- |
inspection requirement
*.WEPAN:BER  C10    Area of the  An area with the corresponding area ID
|     |     | corresponding goods  |     | must exist in HYDRA.  |     |
| --- | --- | -------------------- | --- | --------------------- | --- |
receipt inspection
requirement
*.WEPAN:PANNR
|     | N9    | Number of the        |     | An inspection requirement with the      |     |
| --- | ----- | -------------------- | --- | --------------------------------------- | --- |
|     |       | corresponding goods  |     | respective number must exist in HYDRA.  |     |
receipt inspection
requirement

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 116 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

*.ZUSCHR:1
|     | C250  |   Additional field 1  |     |     |     |
| --- | ----- | --------------------- | --- | --- | --- |
*.ZUSCHR:2
|             | C250  |   Additional field 2  |     |     |     |
| ----------- | ----- | --------------------- | --- | --- | --- |
| *.ZUSCHR:3  |       |   Additional field 3  |     |     |     |
C250
| *.ZUSCHR:4  | C250  |   Additional field 4  |     |     |     |
| ----------- | ----- | --------------------- | --- | --- | --- |
| *.ZUSCHR:5  | C250  |   Additional field 5  |     |     |     |

| EIS-CES_82.docx  |     | Version: 1.0.23049  |     |     | Page 117 of 123  |
| ---------------- | --- | ------------------- | --- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
4 Uploads to the external system
4.1 Description of the interface
An upload program writes the data in an interface file. This file can then be processed by an interface
routine of the external system.
4.1.1 Data record structure
The ASCII file used to upload results is structured in tabular form and is made up of a header and several
data rows.
Header
Data row 1
Data row 2
Data row 3
Headers and data rows may contain several cells. These data fields are separated via a vertical line ("|",
ASCII 124). The data field itself may therefore not include such a sign.
Header1|Header2|Header3
Cell1|Cell2|Cell3
Cell1|Cell2|Cell3
Cell1|Cell2|Cell3
Each data row is the equivalent of one data record. Each data record must only contain as many cells as
were defined in the header. The header defines how data fields are assigned to columns.
CPAN.RECTYP|CPAN.BER|CPAN.PANNR|CPAN.PPS:REF|CPAN.EGR:MENGE
FEP|F|123|A2345:10|23
WEP|E|126|WE34245|43.2
FEP|F|118|A2345:20|2340
The number of columns and their order are selected randomly and is defined in the headers.
4.1.2 Conventions used to present the various data types
Details about the positions in numeric and text fields only specifies the maximum field length. The field
content itself is stored in "compressed" form, which means leading zeros or subsequent spaces are
suppressed in the output.
EIS-CES_82.docx Version: 1.0.23049 Page 118 of 123

|     |     |     |     |   HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | ------------------------------------- | --- |

| Data type  | Format    |             |          | Examples  |     |
| ---------- | --------- | ----------- | -------- | --------- | --- |
| N<n>       | Numbers,  | a  maximum  | of  <n>  | |2449|    |     |
positions
| N<x>.<y>  | Decimal number, a maximum of  |     |     | |30.5000|  |     |
| --------- | ----------------------------- | --- | --- | ---------- | --- |
<x> positions before the comma.
|     | After  | the  comma,  | only  <y>  |     |     |
| --- | ------ | ------------ | ---------- | --- | --- |
positions are practical. A dot is
the decimal separator.
| C<n>  | Optional, the maximum length of  |     |     | |Huber|  |     |
| ----- | -------------------------------- | --- | --- | -------- | --- |
Texts (characters)  <n> must be considered, though.
| Date       | MM/DD/YYYY (American format)  |     |     | |12/31/2001|  |     |
| ---------- | ----------------------------- | --- | --- | ------------- | --- |
| Times or   | Seconds since midnight or     |     |     | |52200| or    |     |
| durations  | HH:MM or                      |     |     | |14:30| or    |     |
HH:MM:SS or
|14:30:00| or
|     | HH,DDD or  |     |     | |14,5| or  |     |
| --- | ---------- | --- | --- | ---------- | --- |
HH.DDD
|14.5|
|     | H   | hours (as many places      |     |     |     |
| --- | --- | -------------------------- | --- | --- | --- |
|     |     | as required)               |     |     |     |
|     | M   | Minutes (in groups of 60)  |     |     |     |
|     | S   | Seconds                    |     |     |     |
|     | D   | Industrial or decimal      |     |     |     |
|     |     | minutes (in groups of      |     |     |     |
100)
| " "    | Constant value                              |     |     |     |     |
| ------ | ------------------------------------------- | --- | --- | --- | --- |
| 4.1.3  | Calling the interface function for uploads  |     |     |     |     |
The "results" of the inspection are logged by the HYDRA system. The information is logged in a file on the
server that is transferred as an upload to the external system.
|     | Data class                      |     | Upload file   |     |     |
| --- | ------------------------------- | --- | ------------- | --- | --- |
|     | Inspection requirement results  |     | pavrueck.asc  |     |     |
|     | Results of the complaint        |     | rekrueck.asc  |     |     |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     | Page 119 of 123  |
| ---------------- | --- | --- | ------------------- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

|     | Measures    | resulting  | from       | rmarueck.asc  |     |     |
| --- | ----------- | ---------- | ---------- | ------------- | --- | --- |
|     | complaints  | or  the    | complaint  |               |     |     |
details
You use an upload program to create the UTF-8 file (without BOM) that can be integrated in the HYDRA
scheduler with the call.
|        | Data class                      |     |     | Uploading program  |     |     |
| ------ | ------------------------------- | --- | --- | ------------------ | --- | --- |
|        | Inspection requirement results  |     |     | hypanrck.scr       |     |     |
| 4.1.4  | Processing uploaded files       |     |     |                    |     |     |
An interface program of the external system assumes the function of preparing the data structures for the
transferred files so that they can be processed in batch mode or processed as online transactions.
A handshake logic must be implemented between the external system and HYDRA. This way, a secure
data transfer can be realized where no data is lost and the transfer files are not overwritten.
Use the following processing method to safely process the files:
  1.  Rename the interface file into a new file. You do this in Windows NT from the "ren" or "rename"
command and in UNIX using the "mv" command.
| Please note:  |                                                          |     |     |     |     |     |
| ------------- | -------------------------------------------------------- | --- | --- | --- | --- | --- |
|               | When performing this step, do not use the copy command.  |     |     |     |     |     |
As long as HYDRA is processing the file, it does not exist under the documented name.
This ensures that the higher-level system can only access the file if HYDRA has not yet
accessed it (secure handshake).
  2.  Copy the new file to the target system.
  3.  After the new file has been successfully transferred, it must be deleted on the HYDRA server.
| 4.2    | Description of the data structures  |     |     |     |     |     |
| ------ | ----------------------------------- | --- | --- | --- | --- | --- |
| 4.2.1  | Inspection requirement results      |     |     |     |     |     |
Below is a description of all of the cells transferred in the upload file.
| Parameter  |     | Type  | Description  |     |     |     |
| ---------- | --- | ----- | ------------ | --- | --- | --- |

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 120 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- |

CPAN.RECTYP
Data type of inspection requirement
C  20
| CPAN.BER  |     |     | Area of inspection requirement   |     |     |     |
| --------- | --- | --- | -------------------------------- | --- | --- | --- |
C10
CPAN.PANNR  N9  Internal HYDRA inspection requirement number
|     |     | C50  | Status of the inspection requirement  |     |     |     |
| --- | --- | ---- | ------------------------------------- | --- | --- | --- |
CPAN.STA
|               |     |       |                       | "ABG"  finished  |     |     |
| ------------- | --- | ----- | ---------------------- | ---------------- | --- | --- |
|               |     |       |                       | "SKL"  Skip lot  |     |     |
|               |     |       |                       | "STO"  canceled  |     |     |
| CPAN.PPS:REF  |     | C250  | PPS  reference number  |                  |     |     |
| CPAN.ANR      |     | C250  |                        |                  |     |     |
Order number
| CPAN.ATK  |     | C50  | Article number  |     |     |     |
| --------- | --- | ---- | --------------- | --- | --- | --- |
CPAN.ATKIDX
|     |     | C50  | Drawing issue number of the article  |     |     |     |
| --- | --- | ---- | ------------------------------------ | --- | --- | --- |
CPAN.AGNR
|     |     | C50  | Operation number  |     |     |     |
| --- | --- | ---- | ----------------- | --- | --- | --- |
CPAN.AGBEZ
|     |     | C250  | Operation designation  |     |     |     |
| --- | --- | ----- | ---------------------- | --- | --- | --- |
CPAN.KDNR
|               |     | C50       | Customer number                     |     |     |     |
| ------------- | --- | --------- | ----------------------------------- | --- | --- | --- |
| CPAN.LIEFNR   |     | C50       | Supplier number                     |     |     |     |
| CPAN.HERSTNR  |     | C50       | Manufacturer number                 |     |     |     |
| CPAN.CNR      |     | C250      | Batch number                        |     |     |     |
| CPAN.PANDAT   |     | MM/DD/YYY | Date of the inspection requirement  |     |     |     |
Y
CPAN.PANZEI  |sssss|  Time of the inspection requirement, specified in seconds after
midnight
CPAN.PANVON  C50  Person or process that has set the inspection requirement
| CPAN.LIEFDAT  |     | MM/DD/YYY | Delivery date (actual)  |     |     |     |
| ------------- | --- | --------- | ----------------------- | --- | --- | --- |
Y
| CPAN.LIEFDAT:SOLL  |     | MM/DD/YYY | Delivery date (target)  |     |     |     |
| ------------------ | --- | --------- | ----------------------- | --- | --- | --- |
Y

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 121 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- |

|     |     |     |     |     | HYDRA-CAQ Interface to ERP Systems  |     |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- | --- |

CPAN.CMENGE
|     |     | N12.6  | Delivery quantity (actual)  |     |     |     |     |
| --- | --- | ------ | --------------------------- | --- | --- | --- | --- |
CPAN.CMENGE:SOLL
|                |     | N12.6     | Delivery quantity (target)  |     |     |     |     |
| -------------- | --- | --------- | --------------------------- | --- | --- | --- | --- |
| CPAN.BESTNR    |     | C250      | Purchase order number       |     |     |     |     |
| CPAN.HERSTDAT  |     | MM/DD/YYY | Manufacturing date          |     |     |     |     |
Y
| CPAN.ABSDAT  |     | MM/DD/YYY |     |     |     |     |     |
| ------------ | --- | --------- | --- | --- | --- | --- | --- |
Date when the inspection requirement was completed
Y
For CPAN.STA=STO, this field can remain empty.
| CPAN.ABSZEI  |     | |sssss|  |     |     |     |     |     |
| ------------ | --- | -------- | --- | --- | --- | --- | --- |
Time when the inspection requirement was completed, specified in
seconds after midnight
With CPAN.STA=STO, this field can remain empty.
CPAN.ABSVON  C50  Person or process that completed the inspection requirement
For CPAN.STA=STO, this field can remain empty.
CPAN.ERGEB  C50  Result of the inspection requirement. The abbreviations for the
|     |     |     | inspection  | requirement  | results  | are  defined  in  | HYDRA.  Default  |
| --- | --- | --- | ----------- | ------------ | -------- | ----------------- | ---------------- |
values are "IO" (pass) and "NIO" (fail).
With CPAN.STA=STO, this field can remain empty.
| CPAN.EGR:MENGE  |     | N12.6  |     |     |     |     |     |
| --------------- | --- | ------ | --- | --- | --- | --- | --- |
Quantity produced
With CPAN.STA=STO, this field can remain empty.
| CPAN.EGR:NACH  |     | N12.6  |     |     |     |     |     |
| -------------- | --- | ------ | --- | --- | --- | --- | --- |
Rework quantity
With CPAN.STA=STO, this field can remain empty.
| CPAN.EGR:AUS  |     | N12.6  |     |     |     |     |     |
| ------------- | --- | ------ | --- | --- | --- | --- | --- |
Scrap quantity
With CPAN.STA=STO, this field can remain empty.

| EIS-CES_82.docx  |     |     | Version: 1.0.23049  |     |     |     | Page 122 of 123  |
| ---------------- | --- | --- | ------------------- | --- | --- | --- | ---------------- |

HYDRA-CAQ Interface to ERP Systems
CPAN.VERWEND C50 Usage decision of the inspection requirement. The abbreviations
for the usage decisions are defined in HYDRA. Default values are:
"FREIGABE" – release
"BEDFREIGABE" – special permit
"RUECKWEISEN" – reject
"NACHARBEIT" - rework
"SORTIEREN" - sort
With CPAN.STA=STO, this field can remain empty.
EIS-CES_82.docx Version: 1.0.23049 Page 123 of 123