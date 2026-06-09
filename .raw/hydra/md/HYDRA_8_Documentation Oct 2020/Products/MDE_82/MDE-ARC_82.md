Manual

Archiving Machine Data
MDE-ARC 8.2

Version 1.2.23281

Last changed on: 17.09.2020

Archiving Machine Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-ARC_82.docx

Version: 1.2.23281

Page 2 of 14

Archiving Machine Data

Contents

1  Archiving Machine Data ............................................................................... 4

2  MDE-specific Configuration .......................................................................... 6

3  Data Management ........................................................................................ 8

4  Reload Manager ......................................................................................... 12

MDE-ARC_82.docx

Version: 1.2.23281

Page 3 of 14

Archiving Machine Data

1  Archiving Machine Data

Purpose

The function package "archiving machine data" not only provides the  ability to  access archive data,  but

also to export recorded data and to then upload the data back into the system as needed.

Implementation notes

You use the function package "archiving machine data" if:

  You  would  like  to  have  access  to  data  already  moved  to  archive  tables  as  part  of  the  function

package Machine Data Collection

  Because of legal requirements or customer demands, you need to ensure that the data entered

is stored long-term.

  Because of legal requirements or customer demands, you need to import data that was already

exported back into the system to be evaluated / analyzed again.

Integration

Machine  data  archiving  accesses  recorded  data  in  the  respective  archive  tables  of  the  Machine  Data

Collection  function  package.  Master  data  from  the  Machine  Data  Collection  function  package  are  not

archived, but remain in the online tables.

Features

  Direct access to archive tables from the application

o  Direct access to archived machine data from the applications

  Machine history

  Machine time profile

  Efficiency report

  Performance profile

  OEE report

  Status report (workplace/machine-related)

  Status report

  Status profile

  Status class report

  Status class profile

  RPA report

  RPA profile

  Status analysis

MDE-ARC_82.docx

Version: 1.2.23281

Seite 4 von 14

Archiving Machine Data

  Transport function

o  Functions transferring data from online tables into archive tables.

  Export function

o  Functions transferring (exporting) data from archive tables to external file systems for the

purpose of long-term storage of the recorded machine data.



Import function

o  Functions importing exported data into archive tables in order to evaluate them using the

applications listed above.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 5 von 14

Archiving Machine Data

2  MDE-specific Configuration

Overview

The  data  are  stored  as  standard  for  35  days  in  the  MDE  module  before  they  are  moved  to  long-term

storage.

Various  MDE  evaluations  allow  data  to  be  accessed  which  are  older  than  35  days.  For  this,  the  BDE

postings  are  stored  in  a  special  medium-term  or  archive  area.  Access  to  these  data  is  essentially

automatic as soon as the selection period exceeds the short-term data range. In a few applications there

is the option "Consider long-term data" in the selection area via which these data can be accessed.

Data included in the MDE archiving are:

  MDE log records (documents)

  MDE events

  Additional information (e.g. comments)

  LOGGING entries for the machine

Configuration

The  retention  period  of  the  data  in  the  individual  data  areas  can  be  configured  via  the  HYDRA  data

management.

The data management does not define the retention period for data of the “cycle progression”

application.  The  relevant  configuration  is  described  in  the  document  dealing  with  the  cycle

progression application.

During the transfer of the data to the archive tables, those data are transferred whose "retention period"

(in  days/months/years;  see  values  in  parentheses  in  the  following  table)  has  been  exceeded.  If  the

relevant archiving license for the MDE is not available, the data are deleted after the set retention period.

Product  Object

Object designation

Transfer

MDE

MDEPRO

Log records / documents

MDE

A_MDEPRO

Long-term  archiving  of  log
records / documents

 Online data
 medium-term archive
Medium-term archive
 Long-term archive

Interval  in  as-
delivered
condition
35 days 1)

3 years 1)

MDE-ARC_82.docx

Version: 1.2.23281

Seite 6 von 14

Archiving Machine Data

Product  Object

Object designation

Transfer

MDE

EREIGMDE

Events

MDE

A_ EREIGMDE

MDE

LOG

MDE

A_LOG

MDE

RES_STATUS

archiving

Long-term
events
HYDRA logging data

archiving

Long-term
HYDRA logging data
Parallel  MDE
status

resource

MDE

A_ RES_STATUS  Long-term

archiving

of
resource

parallel  MDE
status

of

of

Online data
 medium-term archive
Medium-term archive
 Long-term archive
Online data
 medium-term archive
Medium-term archive
 Long-term archive
Online data
 medium-term archive
Medium-term archive
 Long-term archive

Interval  in  as-
delivered
condition
35 days 2)

3 years 2)

35 days

3 years

70 days

3 years

Please note:

1)  Please note that the postings relating to workplaces/machines only allow for data of the online data

area to be selected and edited.

2)  Please  note  that  the  event maintenance  only  allows  for  data  of  the  online  data  area  to  be  selected

and edited.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 7 von 14

Archiving Machine Data

3  Data Management

Overview

Menu

System administration  Archiving  Data management

Transaction code

arccfg

Function authorization

arccfg.*

Purpose

Use this application to view or change the centrally managed Archiving settings for recorded data.

Integration

Use

this  application

to  configure

the  settings

for  archiving

/  data  management

for  all

components/functions.

Field descriptions

Product

Enter the HYDRA product group for which you want to define a rule in the Product field.

Object

Use the Object to define the data you want to retain.

Retention period

Use  the  fields  for  the  Retention  period  to  define  how  long  data  should  be  available  until  data  is

archived.

Unit

Specify the retention period in days, months or years.

Last retention date

This field is computed and specifies the last day when data is still available in this object.

Action

You can choose from three options to specify the processing for an object:

D = delete

Object is deleted

M = move (archive)

Object is transferred to the next area

X = export

Object is unloaded (XUNLOAD format) and then deleted

Target object

Currently, the target object automatically results from the detail configuration.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 8 von 14

Condition

The  characters  in  this  field  are  added  as  an  additional  condition  to  the  database  command  that

controls  the  action.  This  condition  is  linked  to  the  other  conditions  of  the  original  command  using

Archiving Machine Data

AND and is set in parentheses.

Last run (date/time)

Indicates the point in time when this rule was applied last.

License

Indicates  which  license  is  required  for  archiving.  You  can  enter  several  licenses  (separated  by  a

space). If none of these licenses is licensed in the system, the data is either deleted (action D) or

unloaded into files (action M or X), depending on the relevant action.

Path

Optional path to generate the file export (unload). The archiver currently only supports local HYDRA

server drives. If you do not enter a path, file exports are filed as follows:

<HYDRADIR>/<SYSTEM>/custom/archive/<YYYY-MM-DD>/<PRODUCT>/

HYDRADIR … HYDRA directory

SYSTEM … System number

YYYY-MM-DD … Archiving date (YYYY … Year, MM … Month, DD … Day)

PRODUCT … Product group from archiving configuration

Administration table

Name of the administration table where archiving logs are stored.

Administration duration (retention period of administration table)

Use  the  fields  for  the  retention  period  to  specify  how  long  the  logs  should  be  available  in  the

administration table before being deleted.

Unit

Specify the retention period in days, months or years.

Archiving step

Specifies if this archiving process uses archiving function I or  II. Archiving function I: The function

moves data from the online data set to archive tables or deletes the data: setting M (medium-term

archive). Archiving function II: The function moves data from the archive table to the file export or

deletes the data: setting L (long-term archive).

Configuration

Indicates whether or not the configuration is active. Possible values: Y/N

MDE-ARC_82.docx

Version: 1.2.23281

Seite 9 von 14

Archiving Machine Data

Archiving type

Identifier for time or object-related archiving. Supported modes: O = Object-related archiving (i.e.

data is archived for each object individually). Z = Time-related archiving (i.e. data is archived

without any object reference).

Note: Time and object-related archiving differ from each other significantly in the archiving

performance (runtime). Object-related archiving of mass data is not recommended.

Priority

Integral value greater than 0. Indicates the processing sequence if several objects are defined for a

product group. Processing starts with the lowest value.

Master table

Table including the data to be archived. The extensions entered in the  Condition field refer to this

table.

Date column

Date column in the master table. The system uses this date column to evaluate the retention period

for the data to be archived.

Key 1

Unique key column in the master table; this key identifies the data to be archived. You can define

up to 5 key columns for object-related archiving. Time-related archiving only supports one primary

key in Key 1.

Keys 2 – 5

Additional optional key columns for object-related archiving.

Comment

Use the comment line to describe the archiving configuration.

If you copy the archiving configuration, the system currently only copies the data management

configuration, but no defined data records from the object details. Currently,  you must use the

respective dialog to copy the data records of the object details to the new configuration.

Module

Version(s)

Description of archiving

BDE

CAQ

LLE

MDE

MPL

8.1

8.1

8.1

8.1

8.1

See here

See here

See here

See here

See here

MDE-ARC_82.docx

Version: 1.2.23281

Seite 10 von 14

Archiving Machine Data

PEP

PZE/PZW

ZKS

8.1/8.2

8.1/8.2

8.1/8.2

See here

See here

See here

MDE-ARC_82.docx

Version: 1.2.23281

Seite 11 von 14

Archiving Machine Data

4  Reload Manager

Summary

HYDRA menu

System administration  Archiving  Reload manager

FEDRA menu

System administration  Archiving  Reload manager

Transaction code

arcrld

Function authorization

arcrld

arcrld.export

arcrcl.import

Purpose

The customer is responsible for backing up data in a  data  archive and for restoring data. When data is

backed  up  it  is  transferred  from  the  long-term  data  area  to  the  archive  data  area  and,  as  a  result,  it  is

stored in a separate file system. The customer can start the backup process using the Reload Manager.

When data, which is filed in the archive data area, is restored, it is transferred back (copied) to the long-

term data area. The customer has to do this and bears the responsibility.

To be able  to  evalaute restored  data using standard  evaluations/reports, the data has to  be transferred

back (copied) to the reload data area.

For this reason, the Reload Manager enables the following functions:

1.  Moving of exported data into the customer archive (the customer archive path has to be defined

within the HYDRA path settings).

2.  Loading of exported data into the reload area for evaluations

Integration

The Reload Manager is a central function that is used by many components or functions.

Selection Criteria

The application provides the following selection criteria:

Module

Reference to the product group which archived data belongs to.

Object type

Object type of the archived data.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 12 von 14

The selection options “module” and “object type” are mandatory fields.

Archiving Machine Data

Toolbar

Export

The “EXPORT” button allows for the entries selected in the Reload Manager to be exported to the

customer  directory  (all  data  records  can  be  selected  using  the  context  menu  of  the  right  mouse

button).  Once  the  function  has  been  started,  the  input  dialog  that  opens  requires  the  customer

archive path to be entered.

Import

The “IMPORT” button allows for the selected entries to be loaded into the reload area, in order for

the data to be again available for HYDRA evaluations/reports. Once the function has been started,

the data loading mode and an optional path are requested. By indicating the path, it is possible to

specify another storage location for the files, provided that the archived files have not been moved

to the customer-specific archive using the Reload Manager.

There are three different ways to deal with reload data after they have been reloaded to prevent the

reload data set from increasing excessively ( no slow evaluations/reports):

The following modes are distinguished:

  Cyclic

Data is loaded to the reload area in the “cyclic” mode. Loaded data is automatically removed from

the corresponding reload tables, once the retention period specified within archive settings has

expired.

Please compare the configuration entry HYD / RELOADMANAGER of the data management

function. When demo settings are used, data is removed from the reload area after 14 days.

When data is imported, the HYD_REL_MANAGEMENT.DELETE_DATE field is calculated

subject to the configuration and entered in the reload management table.

  User-specific

Data is loaded to the reload area in the “user-specific” mode. The loaded data is automatically

removed from the corresponding reload area, once the time specified for the user within the user-

specific settings has expired. Exception: In case several users loaded identical data into the

reload area, the corresponding retention period is automatically set to the maximum date.

When data is imported, the HYD_REL_MANAGEMENT.DELETE_DATE field is computed

subject to the configuration and entered in the reload management table.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 13 von 14

Archiving Machine Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

MDE-ARC_82.docx

Version: 1.2.23281

Seite 14 von 14

