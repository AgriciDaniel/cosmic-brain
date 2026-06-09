Manual

Archiving Shop Floor / Order
Data
BDE-ARC 8.2

Version 1.2.23281

Last changed on: 17.09.2020

Archiving Shop Floor / Order Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-ARC_82.docx

Version: 1.2.23281

Page 2 of 15

Archiving Shop Floor / Order Data

Contents

1  Archiving of Shop Floor / Order Data ........................................................... 4

2  BDE-Specific Configurations ........................................................................ 6

3  Data Management ........................................................................................ 9

4  Reload Manager ......................................................................................... 13

BDE-ARC_82.docx

Version: 1.2.23281

Page 3 of 15

Archiving Shop Floor / Order Data

1  Archiving of Shop Floor / Order Data

Purpose

The function  package "archiving shop floor /order data" makes it possible  to  access archived  data and,

moreover, to export recorded data and to load these data back into the system as needed.

Implementation notes

You use the function package "archiving of shop floor / order data", if:

  You would like to have access to data already moved to archive tables in the function package

"shop floor data collection".

  Because of legal requirements or customer demands, you need to ensure that the data entered

is stored long-term.

  Because of legal requirements or customer demands, you need to import data that has already

been exported back into the system to be evaluated / analyzed again.

Integration

Archiving of shop floor / order data refers to inventory data and recorded data of archive tables pertaining

to the function package Shop Floor Data Collection.

Features

  Direct access to archive tables from the application

o  Direct access to archived shop floor / order data from the applications

  Order overview

  Order information

  Order shift log

  Personnel shift log

  Personnel report

  Schedule controlling

  Overhead cost controlling

  Maintenance controlling

  Production controlling

  Scrap statistics

  Scrap profile

  Transport function

o  Functions transferring data from online tables into archive tables.

  Export function

BDE-ARC_82.docx

Version: 1.2.23281

Page 4 of 15

Archiving Shop Floor / Order Data

o  Functions  used  to  transfer  (export)  data  from  archive  tables  to  external  file  systems  for

the purpose of storing the recorded shop floor / order data long-term.



Import function

o  Functions importing exported data into archive tables in order to evaluate this data using

the applications listed above.

BDE-ARC_82.docx

Version: 1.2.23281

Page 5 of 15

Archiving Shop Floor / Order Data

2  BDE-Specific Configurations

Overview

In the BDE module, by default data are held in cache for 35 days before they are moved into long-term

storage.

In a variety of BDE reports, there is the option to pull up data that are 35 days old or older. To do this, the

BDE postings are set in a special medium-term or archive area. You automatically have access to such

data for the most part if the selection period exceeds the short-time data area. In some applications, there

is the option to "Consider long-term data" in the selection area, which can be accessed from here.

The data considered during BDE archiving include:

  Order backlog

  Order status

  Order actions

  Order sequences

  Order networks

  Lists of material components and production resources and tools

  Order serial numbers

  Additional information (long texts)

  Order quantities

  Additional order information

  Order posting records

  Order backlog (PPS)

  Additional order information (PPS)

  Order actions (PPS)

  Master detail user field (specific table)

  Order specific events

  Personal events

  Additional information for events

BDE-ARC_82.docx

Version: 1.2.23281

Page 6 of 15

Archiving Shop Floor / Order Data

  Order logging information

  Additional order logging information

  BDE configuration logging information

  Additional BDE configuration logging information

Configuration

You can use HYDRA data management to configure the retention period for the data in each of the data

areas.

When  transferring  data  into  the  archive  tables,  the  data  for  which  the  "retention  period"  (in  number  of

days/ months/  years; see the  values  in  parentheses)  has been  exceeded  is transferred. If the archiving

license relevant to the BDE is not available, the data will be deleted after the set retention period.

Product  Object

Object designation

Transfer

Factory
default
interval
35 days

Online data
 medium-term archive

BDE

ANR

BDE

A_ANR

BDE

ADEPRO

Order backlog
-Status,
- Actions,
- Sequences,
- Networks,
- Lists of material,
- Serial numbers,
- Additional information,
- Quantities,
- PPS data,
- Master detail user fields

Long-term archiving:
Order backlog
-Status,
- Actions,
- Sequences,
- Networks,
- Lists of material,
- Serial numbers,
- Additional information,
- Quantities,
- PPS data,
- Master detail user fields
Posting records of orders

BDE

ADEPRO_ADD

Posting record of orders –
additional information

Medium-term archive:
 long-term archive

2 years

Online data
 medium-term archive
Online data
 data is deleted (it is not
transferred to the medium-

35 days 1)

if

the
Delete
relevant posting
the
record  of

BDE-ARC_82.docx

Version: 1.2.23281

Page 7 of 15

Archiving Shop Floor / Order Data

Product  Object

Object designation

Transfer

Long-term archiving:
Posting records of orders
Order-related events
incl. additional information
Long-term archiving:
Order-related events
incl. additional information
Personal events
incl. additional information
Long-term archiving:
Personal events
incl. additional information
HYDRA logging data

Long-term archiving
HYDRA logging data
HYDRA logging
configuration
Long-term archiving
HYDRA logging
configuration

term data)

Medium-term archive
 long-term archive
Online data
 medium-term archive
Medium-term archive:
 long-term archive

Online data
 medium-term archive
Medium-term archive:
 long-term archive

Online data
 medium-term archive
Medium-term archive:
 long-term archive
Online data
 medium-term archive
Medium-term archive:
 long-term archive

BDE

A_ADEPRO

BDE

EREIGADEA

BDE

A_EREIGADEA

BDE

EREIGADEP

BDE

A_EREIGADEP

BDE

ANRLOG

BDE

A_ANRLOG

BDE

CFGLOG

BDE

A_CFGLOG

Please note:

Factory
default
interval
no
order
longer available
2 years 1)

is

35 days 2)

2 years 2)

35 days 2)

2 years 2)

35 days

3 years

35 days

3 years

1)

If  the  values  entered  for  ADEPRO  or  A_ADEPRO  are  changed  (increased),  the  entries  for  ANR  or

A_ANR will also have to be changed (increased) accordingly.

Provided that the BDE log records are to be archived at the earliest after the OP has been  archived,

this  can  be  achieved  by  defining  the  following  condition  for  the  object  ADEPRO  in  the  field  of  the

same name within the “data management” configuration:

ade_protokoll.auftrag_nr in (select auftrag_nr from a_auftrag_status)

Please note that the order-related postings only allow for data of the online data area to be selected

and edited.

2)  Please  note  that  the  event maintenance  only  allows  for  data  of  the  online  data  area  to  be  selected

and edited.

BDE-ARC_82.docx

Version: 1.2.23281

Page 8 of 15

Archiving Shop Floor / Order Data

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

BDE-ARC_82.docx

Version: 1.2.23281

Page 9 of 15

Archiving Shop Floor / Order Data

Condition

The  characters  in  this  field  are  added  as  an  additional  condition  to  the  database  command  that

controls  the  action.  This  condition  is  linked  to  the  other  conditions  of  the  original  command  using

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

Specifies if this archiving process uses archiving function I or II. Archiving function I: The function

moves data from the online data set to archive tables or deletes the data: setting M (medium-term

archive). Archiving function II: The function moves data from the archive table to the file export or

deletes the data: setting L (long-term archive).

Configuration

Indicates whether or not the configuration is active. Possible values: Y/N

BDE-ARC_82.docx

Version: 1.2.23281

Page 10 of 15

Archiving Shop Floor / Order Data

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

Unique key column in the master table; this key identifies the data to be archived.  You can define

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

BDE-ARC_82.docx

Version: 1.2.23281

Page 11 of 15

Archiving Shop Floor / Order Data

PEP

PZE/PZW

ZKS

8.1/8.2

8.1/8.2

8.1/8.2

See here

See here

See here

BDE-ARC_82.docx

Version: 1.2.23281

Page 12 of 15

Archiving Shop Floor / Order Data

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

BDE-ARC_82.docx

Version: 1.2.23281

Page 13 of 15

Archiving Shop Floor / Order Data

The selection options “module” and “object type” are mandatory fields.

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

BDE-ARC_82.docx

Version: 1.2.23281

Page 14 of 15

Archiving Shop Floor / Order Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

BDE-ARC_82.docx

Version: 1.2.23281

Page 15 of 15

