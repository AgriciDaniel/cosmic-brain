|     |     |     | Transfer DNC Resources  |     |
| --- | --- | --- | ----------------------- | --- |

1  Transfer DNC Resources
A variety of master data must be created at the time the HYDRA system is being installed. In the process,
there may sometimes be large amounts of data that cannot be entered manually, or only with great effort.
For this reason, HYDRA offers the capability to automatically transfer master data from external systems.
This  documentation  describes  the  steps  to  follow  when  transferring  DNC  data.  The  technical
fundamentals are described in the documentation on importing EIS-SDF master data.
To use the interface, the EIS-INC application service is required that allows DNC resources to be
transferred into the system.
| 1.1  | DNC resources  |     |     |     |
| ---- | -------------- | --- | --- | --- |
A DNC record in HYDRA consists of two parts:
-  DNC resource data management
-  The DNC data file
Both parts have to be integrated into the HYDRA system for importing.
| 1.1.1  | DNC resources in HYDRA  |     |     |     |
| ------ | ----------------------- | --- | --- | --- |
Resource stock Resource type
| PK,FK1 | RES.RESTYP | PK RESTYP.RESTYP |     |     |
| ------ | ---------- | ---------------- | --- | --- |
| PK     | RES.RES    |                  |     |     |
  RESTYP.PATH
|     | RES.RESFAMID       |   <Verarbeitungscodes> |     |     |
| --- | ------------------ | ---------------------- | --- | --- |
|     | RES.BEZEICH        |   <Dateiextension>     |     |     |
|     | ...                |   ...                  |     |     |
|     | RES.SPEICHORT:DATA |                        |     |     |
DNC Folder
Dateiname
File name

| EIS_SDF_DNC_Resources.docx  |     | Version: 1.0.1362  |     | Page 1 of 6  |
| --------------------------- | --- | ------------------ | --- | ------------ |

Transfer DNC Resources
Where the DNC files will be stored is based on the information under resource type in the DNC folder as
defined in the RESTYP.PATH field. Specifically, this refers to path management in HYDRA where the
folder and access terms are defined. This directory may be on the HYDRA server, or otherwise on an
external source in a network directory that can be accessed accordingly.
A file name (without extension) is specified for each DNC resource in the resource stock. The extension is
derived from the resource type as well. As such, the file is uniquely defined.
The DNC resources (administrative records in the database) are themselves uniquely defined based on
the resource type (RES.RESTYP) and resource numbers (RES.RES). (We recommend keeping the
resources in HYDRA unique by resource number, irrespective of resource type.)
1.1.2 DNC search functions
DNC data are managed in HYDRA in three ways:
1. Definition by using the production resources and tools list for BDE operations
2. Definition by directly specifying the resource number
3. Definition by using search criteria that depend on the DNC family
Search using search criteria:
Special focus must be placed on searching using search criteria (option 3), because it offers the greatest
possible flexibility and transparency. This function can depict most cases of the DNC application.
You do not enter a resource number or a file name for an overview, restriction or search for resources at
the console or terminal, but instead, depending on the relevant application, you can enter individual
criteria tailored to the DNC families. Examples: Most of the time, we identify injection molding setting
records based on the combination of article, tool and machine numbers. We identify a milling program for
an NC system by the article number and type of milling machine.
So, for administration purposes in HYDRA, the DNC records are divided into DNC types (rough) and then
subdivided into DNC families. The DNC records are pre-selected into DNC families for storing and
filtering. Furthermore, a combination of search criteria is assigned to the DNC families by way of a user
field key. MPDV customizing can adjust these combinations to match individual needs. Depending on the
setting selected here, the user has up to six search boxes available for each separate resource. In
addition, by using the master data import option, the user can also transfer these search boxes directly in
RES.MODIFY-BAPI. The acronyms for this are RES.SU:x, whereas for x you can enter the digits 1-6.
EIS_SDF_DNC_Resources.docx Version: 1.0.1362 Page 2 of 6

|     |     |     |     |     | Transfer DNC Resources  |     |
| --- | --- | --- | --- | --- | ----------------------- | --- |

Important: The meaning of these search boxes must be defined before importing!
Resource family
PK RESFAM.RESFAMID
PK RESFAM.RESTYP
|     | Resource stock |     |     |   RESFAM.BEZEICH |     |     |
| --- | -------------- | --- | --- | ---------------- | --- | --- |
  ...
| PK,FK1 | RES.RESTYP |     |     |     |     |     |
| ------ | ---------- | --- | --- | --- | --- | --- |
  RESFAM.USRFLD
| PK  | RES.RES      |     |     |     |     |     |
| --- | ------------ | --- | --- | --- | --- | --- |
| FK1 | RES.RESFAMID |     |     |     |     |     |
|     | RES.BEZEICH  |     |     |     |     |     |
|     | ...          |     |     |     |     |     |
Search definitions
|     | RES.SPEICHORT:DATA |     |     |     |     |     |
| --- | ------------------ | --- | --- | --- | --- | --- |
|     | ...                |     |     |     |     |     |
PK USRFLD
|     | Suchfeldinhalt 1 |                        |     |         |     |     |
| --- | ---------------- | ---------------------- | --- | ------- | --- | --- |
|     | Suchfeldinhalt 2 | Content and definition |     |   Feld1 |     |     |
|     | ...              |                        |     |         |     |     |
  Feld2
  ...

| 1.2    | Setting up the DLG format for DNC import  |     |     |     |     |     |
| ------ | ----------------------------------------- | --- | --- | --- | --- | --- |
| 1.2.1  | BAPIs and dialog commands                 |     |     |     |     |     |
Ideally, BAPI RES.MODIFY is used to import the DNC resources.
An example:
DLG=RES.MODIFY|RES.RES=DNC0815|RES.RESTYP=DNC|
…
RES.SPEICHORT:DATA=D0815|…|
The acronym RES.SPEICHORT:DATA contains the file name without path and without the extension of
the attached DNC file. The storage location and the extension are defined in advance via the resource
type.
Please refer to the document HYD-SDI for details. Refer to the database documentation for a full
description of the RES-BAPI. The most important abbreviations are described in this document.
| 1.2.2    | Resource record acronyms  |              |     |     |     |             |
| -------- | ------------------------- | ------------ | --- | --- | --- | ----------- |
| Acronym  |                           | Description  |     |     |     | Size  Type  |
Key fields and important basic information

| EIS_SDF_DNC_Resources.docx  |     |     | Version: 1.0.1362  |     |     | Page 3 of 6  |
| --------------------------- | --- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     |     | Transfer DNC Resources  |     |
| --- | --- | --- | --- | --- | ----------------------- | --- |

| Acronym     |     | Description                        |     |     |     | Size  Type  |
| ----------- | --- | ---------------------------------- | --- | --- | --- | ----------- |
| RES.RESTYP  |     | Resource type, always enter “DNC”  |     |     |     | 4  CHAR     |
Combined, RESTYP and RES make up the unique resource
key.
| RES.RES  |     | Resource number  |     |     |     | 40  CHAR  |
| -------- | --- | ---------------- | --- | --- | --- | --------- |
Combined, RESTYP and RES make up the unique resource
key.
RES.RESVER  Version, preset to 1 (for future enhancements)  20  CHAR
RES.RESFAMID  Resource family, internal numeric ID, establishes the connection  7  NUM
to the resource family. We recommend using the alternative
RES.RESFAM for imports.
RES.RESFAM  Resource  family  as  text  ID.  This  is  the  alternative  to  20  CHAR
|     |     | RES.RESFAMID.  | To  edit  this,  | the  HYDRA  | expansion  | script  |
| --- | --- | -------------- | ---------------- | ----------- | ---------- | ------- |
b_res#dnc72#.hsc must be installed. When the field is filled in,
HYDRA determines the internal numeric ID.
| RES.BEZ  |     | Designation, may be used arbitrarily  |     |     |     | 40  CHAR  |
| -------- | --- | ------------------------------------- | --- | --- | --- | --------- |
RES.KST  Cost center to which the DNC resources belong.  10  CHAR
RES.VAB  Responsibility area (for authorization control)  15  CHAR
RES.MATPUF:S  Storage location, actually assignment to material buffer/ storage  12  CHAR
locations, freely usable for DNC, e.g. for search functions.
RES.SPEICHORT:DATA  File name without path and suffix. The system automatically  128  CHAR
adds the path and suffix defined for the type.
Search boxes (MD user fields), depending on family, for DNC upload/ download
| RES.SU:1  |     | Search field 1  |     |     |     | 25  CHAR  |
| --------- | --- | --------------- | --- | --- | --- | --------- |
| RES.SU:2  |     | Search field 2  |     |     |     | 25  CHAR  |
| RES.SU:3  |     | Search field 3  |     |     |     | 25  CHAR  |

| EIS_SDF_DNC_Resources.docx  |     |     | Version: 1.0.1362  |     |     | Page 4 of 6  |
| --------------------------- | --- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     | Transfer DNC Resources  |     |
| --- | --- | --- | --- | ----------------------- | --- |

| Acronym   |     | Description     |     |     | Size  Type  |
| --------- | --- | --------------- | --- | --- | ----------- |
| RES.SU:4  |     | Search field 4  |     |     | 25  CHAR    |
| RES.SU:5  |     | Search field 5  |     |     | 25  CHAR    |
| RES.SU:6  |     | Search field 6  |     |     | 25  CHAR    |
You can use as many additional information fields as you like.
| RES.HERST   |     | Manufacturer    |     |     | 60  CHAR  |
| ----------- | --- | --------------- | --- | --- | --------- |
| RES.EIGENT  |     | Owner           |     |     | 60  CHAR  |
| RES.BEM:1   |     | Comment field   |     |     | 60  CHAR  |
| RES.BEM:2   |     | Comment field   |     |     | 60  CHAR  |
| RES.BEM:3   |     | Comment field   |     |     | 60  CHAR  |
| RES.BEM:4   |     | Comment field   |     |     | 60  CHAR  |
| RES.BEM:5   |     | Comment field   |     |     | 60  CHAR  |
| RES.BEM:6   |     | Comment field   |     |     | 60  CHAR  |
RES.ZEICHNR  Drawing number (Only visible in the table on the user interface,  40  CHAR
not in the details area, field cannot be modified)
RES.INVNR  Inventory number (Only visible in the table on the user interface,  40  CHAR
not in the details area, field cannot be modified)
RES.GRAVNR  Engraving  number  (Only  visible  in  the  table  on  the  user  40  CHAR
interface, not in the details area, field cannot be modified)

| 1.3  | Data preparation/ data retention  |     |     |     |     |
| ---- | --------------------------------- | --- | --- | --- | --- |
Based on experience, preparing data Microsoft Excel™ yields the best results. Basically, though, you can
use any other program to prepare data. MPDV has provided a file as an example of data being prepared
in Excel. Fields have been predefined in this file for a selection of master data.

| EIS_SDF_DNC_Resources.docx  |     |     | Version: 1.0.1362  |     | Page 5 of 6  |
| --------------------------- | --- | --- | ------------------ | --- | ------------ |

Transfer DNC Resources
Furthermore, for larger volumes of data we recommend using headings instead of acronym columns in
the Excel file, because this will make the file easier to understand. Moreover, the file names can be listed
in the columns with path and extension. By programming macros, BAPI files and batch-copy programs
can be created from this table at the touch of a button. You may consult MPDV for help with this, but as a
rule, the customer is responsible for providing the macros and Excel files.
1.4 Importing data to HYDRA
Please refer to the document HYD-SDF for basic information. DNC files are imported either before or
after the DNC resources are imported by using the appropriate copy functions available in each operating
system respectively. The files must be copied to the storage area as defined by the DNC type.
EIS_SDF_DNC_Resources.docx Version: 1.0.1362 Page 6 of 6