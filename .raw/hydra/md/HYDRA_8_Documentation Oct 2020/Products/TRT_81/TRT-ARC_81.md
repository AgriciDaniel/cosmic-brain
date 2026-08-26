Manual

Archiving of Batch / Lot Data
TRT-ARC 8.1

Version 1.0.54

Last changed on: 19.06.2020

Archiving of Batch / Lot Data

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

TRT-ARC_81.docx

Version: 1.0.1362

Page 2 of 17

Archiving of Batch / Lot Data

Contents

1  Archiving of Batch / Lot Data ........................................................................ 4

2  Data Management ........................................................................................ 5

3  Module-Specific Functions/Configurations ................................................... 8

3.1  HYDRA-CAQ ....................................................................................................... 8

3.2  HYDRA-BDE ....................................................................................................... 8

3.3  HYDRA-MDE ...................................................................................................... 8

3.4  HYDRA-WRM ..................................................................................................... 8

3.4.1  Summary ................................................................................................. 8

3.4.2  Configuration ........................................................................................... 9

3.5  HYDRA-PDV ..................................................................................................... 10

3.5.1  Summary ............................................................................................... 10

3.5.2  Configuration ......................................................................................... 10

3.6  HYDRA-MPL / TRT ........................................................................................... 12

3.6.1  Summary ............................................................................................... 12

3.6.2  Configuration ......................................................................................... 12

3.7  HYDRA-HLS ..................................................................................................... 13

4  Reload Manager ......................................................................................... 15

TRT-ARC_81.docx

Version: 1.0.1362

Page 3 of 17

Archiving of Batch / Lot Data

1  Archiving of Batch / Lot Data

Purpose

The  function  package  for  Archiving  batch/lot  data  provides  access  to  archived  data  and,  moreover,  the

possibility to export recorded data and load these data back into the system as needed.

Implementation considerations

You use the function package for archiving batch/lot data, if:

  You request access to data from the Material and Production Logistics as well as the Tracking &

Tracing function packages which were already transferred to archive charts.

  You  need  to  ensure  the  long-term  storage  of  recorded  data  due  to  legal  or  customer

requirements.

  You need to import already exported data back into the system for repeated evaluation/analysis

due to legal or customer requirements.

Integration

The function package for archiving batch/lot data provides access to inventory data and recorded data of

the Material and Production Logistics as well as the Tracking & Tracing function packages.

The function package for archiving batch/lot data provides access to inventory data and recorded data in

the  relevant  archive  tables  of  the  Material  and  Production  Logistics  as  well  as  the  Tracking  &  Tracing

function packages.

Features

  Direct access to archive charts from the application

o  Direct  access  to  archived  batch/lot  data  via  the  lot  data  overview  and  maintenance  as

well  as  tabular  and  graphical  batch/lot  tracking  (prerequisite:  you  use  the  TRT-GLV

function package)

  Export function

o  Functions for transferring (exporting) data from the archive charts to external file systems

for the purpose of long-term storage of the recorded batch8lot data.



Import function

o  Functions  for  importing  exported  data  into  archive  charts  for  the  purpose  of  evaluating

them  using  the  batch  data  summary  and  maintenance  as  well  as  tabular  and  graphical

batch/lot tracing (prerequisite: you use the TRT-GLV function package).

TRT-ARC_81.docx

Version: 1.0.1362

Seite 4 von 17

Archiving of Batch / Lot Data

2  Data Management

Summary

Menu

System Administration  Archiving  Data Management

Transaction code

arccfg

Function authorization

arccfg.*

Utilization

The  application  has  been  designed  to  view  or  change  the  centrally  managed  settings  for  archiving

recorded data.

Integration

The  settings  for  archiving/data  management  are  performed  centrally  in  the  application  by  all

components/functions.

Field Descriptions

Product

The HYDRA module, for which a rule is to be defined, has to be entered in the “product” field.

Object

The object defines which kind of data is to be provided.

Retention period

The “retention period” fields define how long data is available until it is archived.

Unit

The unit for retention periods is indicated in days, months or years.

Last retention date

This field is computed and indicates the last day on which data is still available in this object.

Action

It is possible to choose from three variants for one object:

D = delete

object is deleted

M = move (archive)

object is transferred to the next area

X = export

object is unloaded (XUNLOAD format), then deleted

Target object

Automatically results from the detail configuration at the moment.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 5 von 17

Condition

The  characters  of  this  field  are  added  as  another  condition  to  the  database  command  controlling

the action. Whereas “and” links this condition with the conditions of the original command and this

Archiving of Batch / Lot Data

condition is written in brackets.

Last run (date/time)

Specifies when this rule was carried out the last time.

License

Specifies which license is required for the archiving function. Several licenses can be entered here

(separated by blanks). If none of these licenses are available on the system, data are either deleted

(action D) or unloaded in files (action M or X).

Path

Optional  path  for  the  generation  of  the  file  export  (unload).  The  archiving  program  currently  only

supports local drives on the HYDRA server. If no path is set file exports are filed by default in:

<HYDRADIR>/<INSTANCE>/custom/archive/<YYYY-MM-DD>/<PRODUCT>/

HYDRADIR …HYDRA directory

INSTANCE … Instance number

YYYY-MM-DD Archiving day (YYYY … year, MM … month, DD … day)

PRODUCT … Product from archiving configuration

Management table

Table name of the management table in which the log records of archiving are saved.

Retention period, management table

The  “retention  period”  fields  define  how  long  log  records  are  to  be  hold  in  the  management  table

until they are deleted.

Unit

The unit for the retention period is indicated in days, months or years.

Archiving step

Specifies  whether this archiving  executes the  archiving function I or II. Archiving function I moves

data  from  the  online  dataset  to  archive  tables  or  deletes  them:  Setting  M  (medium-term  archive).

Archiving function II transfers data from archive tables to the file export or deletes them: setting L

(long-term archive).

Configuration

Control indicator saying whether the configuration is active or inactive. Possible values J/N.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 6 von 17

Archiving of Batch / Lot Data

Archiving type

Flag for archiving based on time or objects. Supported modes are: O = archiving based on objects

(i.e.  data  are  archived  separately  for  each  object).  Z  =  archiving  based  on  time  (i.e.  data  are

archived together without reference to the object. Please note: Archiving based on time and objects

differentiate significantly with respect to the performance (runtime) of the archiving function. We do

not recommend archiving mass data on the basis of objects

Priority

Integer value greater than 0. Specifies the execution sequence if several objects are defined for a

module. Execution starts with the lowest value configured.

Master table

Table including archiving data. The enhancements entered in the “condition” field refer to this table.

Date column

Date  column  in  the  master  table.  This  column  is  used  to  evaluate  the  data  to  be  archived

concerning the retention period.

Key 1

Unique  key  column  within  the  master  table  by  way  of  which  the  data  to  be  archived  can  be

identified. Up to 5 key columns can be defined with object-based archiving. Time-related archiving

only supports one primary key in key 1.

Key 2 – 5

Further possible key columns for object-based archiving.

Comment

Comment line to describe the archiving configuration.

At  the  moment  only  the  data  management  configuration  is  copied  along  with  copying  the

archiving configuration. However, defined data records from object details are not included. To

do so, the user has to copy the data records of object details to the new configuration using the

corresponding dialog.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 7 von 17

Archiving of Batch / Lot Data

3  Module-Specific Functions/Configurations

3.1 HYDRA-CAQ

The  document  entitled  MBL_Archiving_CAQ.pdf  describes  the  configurations  of  CAQ  8.1  data

management.

3.2 HYDRA-BDE

The  document  entitled  MBL_Archiving_BDE.pdf  describes  the  configurations  of  BDE  8.1  data

management.

3.3 HYDRA-MDE

The  document  entitled  MBL_Archiving_MDE.pdf  describes  the  configurations  of  MDE  8.1  data

management.

3.4  HYDRA-WRM

3.4.1  Summary

The archiving function makes it possible to archive

- resource documents,

- events as well as

- additional information

according  to  project-specific,  internal  or  even  legal  definitions  to  be  still  able  to  access  those  at  a  later

point in time.

Data considered by HYDRA-WRM archiving are:

  Documents (res_belege table)

  Events (res_event table)

TRT-ARC_81.docx

Version: 1.0.1362

Seite 8 von 17

Archiving of Batch / Lot Data

  Additional information (event_dlg_data, hyd_logging, hyd_logging_data table)

Please note

The WRM-ARC license needs to be available to be able to use this archiving function.

3.4.2  Configuration

When  transferring  data  to  archive  tables,  those  data  are  transferred  the  “retention  period”  of  which  has

been exceeded (in number of days/months/years  see values in brackets in the following table). Default

values,  which  may  be  configured  individually  for  each  system,  are  defined  for  implemented  archiving

processes.  In  case  the  WRM-ARC  license  is  not  available,  data  are  deleted,  once  the  configured

retention period has expired.

Product  Object

Object designation

Transfer

WRM  WRMPRO

Log records/documents

WRM

A_WRMPRO

WRM

EREIGWRM

Long-term  archiving  log
records/documents
Events

WRM

A_EREIGWRM

WRM

LOG

WRM

A_LOG

Long-term  archiving  of
events
HYDRA logging data

Long-term  archiving  of
HYDRA logging data

Online dataset 
medium-term archive
Medium-term archive 
long-term archive
Online dataset 
medium-term archive
Medium-term archive 
long-term archive
Online dataset 
medium-term archive
Medium-term archive 
long-term archive

Default interval
(as supplied)
35 days

3 years

35 days

3 years

35 days

3 years

TRT-ARC_81.docx

Version: 1.0.1362

Seite 9 von 17

Archiving of Batch / Lot Data

3.5  HYDRA-PDV

3.5.1  Summary

The standard archiving function of HYDRA-PDV  7.2  allows for mass data tables to be  archived.

This process writes table data in files that are saved in a predefined path.

Mass data tables, also referred to as TNT tables, include a time stamp in their name ID, which is

referred to during archiving.

The “tnt_table_repo“ table provides information on the archiving status of single TNT tables, e.g.

where the data file is located and what’s the file’s name or whether the table has been re-imported

and thus a new export might be required.

Patch:

The standard HYDRA-PDV 7.2 installation enables archiving of mass data, thus TNT tables.

-  DBPATCH PDV_72

(includes the “pdv_setup“ table)

-  DBPATCH TNT_72

(includes the “tnt_table_repo“ table)

License:

3.5.2  Configuration

Archiving of mass data is realized through two components: export and import.

The  export  represents  a  cyclic  process,  which  is  started  by  the  HYDRA  Scheduler  and  unloads  “due”

tables from the database in data files on the hard disk.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 10 von 17

Archiving of Batch / Lot Data

The import function (or reload) constitutes a library that, if required, reloads data on request from the data

files back to the database tables where they can be accessed again.

Normally,  the  export  function  transfers  the  files  1:1  from  the  database  into  data  files.  If  configured

respectively,  however,  it  is  also  possible  to  define  a  1:n  relation,  i.e.  a  table  can  be  distributed  among

several files. Vice versa, however, one file always belongs to exactly one table (a table may have several

files but a file always belongs to one and only one table).

Program:

hp_mexp.exe / out

Installation:

The program is entered in the HYDRA Scheduler and started cyclically.

Console menu: File – System administration – Scheduler

The corresponding time, when the program is to be started can be defined in the

“fix” tab.

Please note: In the Scheduler the export program should not be started with small intervals, as it is an

archiving program. It should suffice to run the program every night or every week depending on the data

volume.

Moreover, a parameter has to be defined indicating which conditions are required to consider data to be

old enough to be archived. In this case, the parameter refers to the number of tables that may be online.

If this number is exceeded the oldest TNT tables are archived by running an export. The parameter can

be  found  in  the  “pdv_setup”  table  and  may  be  adjusted  in  the  “PDV”  tab  of  the  basic  settings  of  the

console.

As  part  of  the  implementation  process,  it  has  to  be  checked  whether  the  archiving  path  exists  with  ID

“PDVARC“ in the “arc_path” column of the “pdv_setup” table (and if applicable, whether the transport path

is defined as well with the “PDVTRANS” ID in the “trans_path“ table).

The corresponding directories which are referred to, can be found in the “hy_path“ table.

A host must not be defined if a relative URL path is defined for the archiving function, PDVARC, (subject

to the hp_mexp.scr file).

TRT-ARC_81.docx

Version: 1.0.1362

Seite 11 von 17

Archiving of Batch / Lot Data

Furthermore,  it  has  to  be  taken  into  account  that,  within  the  scope  of  a  customer  modification,  it  is

possible  to  archive  further  data  (e.g.  events)  as  well.  For  this  purpose,  respective  entries  have  to  be

defined in the “hyd_datamanagement“ table. In this context, the archiving process corresponds to that of

the general archiving function.

3.6  HYDRA-MPL / TRT

3.6.1  Summary

By default, the HYDRA-MPL module (product version 7.1 and 7.2) keeps most of the batch data 7 days,

before they are moved to the long-term data area.

Different HYDRA-MPL evaluations provide the option to access data that are older than 7 days. For this

purpose,  HYDRA-MPL  postings  are  put  in  a  special  medium-term  or  archive  area.  Such  data  may  be

accessed by choosing the “consider long-term data” option and entering the required period of time.

Data taken into account by HYDRA-MPL archiving is:

 Batch stock

 Batch attributes

 Batch assignments

 Batch events

 Material movements

 Batch logs (MPL-PRO)

3.6.2  Configuration

Using HYDRA data management, the retention period of data may be configured in the single data areas.

When  transferring  data  into  archive  tables,  such  data  is  taken  over  the  “retention  period”  of  which

(number in days/months/years) has been exceeded (see values  in brackets in the below table). In case

the  archiving  license  for  HYDRA-MPL  7.1/7.2  has  not  been  purchased  data  are  deleted  after  the

configured storage period.

Product  Object

Object designation

Transfer

MPL71

LOSDELETE

Batches with “deleted”

Online dataset

Default
interval
supplied)
0 days

(as

TRT-ARC_81.docx

Version: 1.0.1362

Seite 12 von 17

Product  Object

Object designation

Transfer

Archiving of Batch / Lot Data

Default
interval
supplied)

(as

MPL72
MPL71
MPL72
MPL71
MPL72

MPLBAHNVERT

LOSAB

MPL72

LOSPACKED

A_LOSBESTAND

LOSEXPIRED

LOSLEER

LOSMATPUF

status
Cutting plan/cutting plan
of operation
Period of time after that
processed batches, which
are not packed, are
deleted/archived.
Period of time after that
packed batches are
deleted/archived in
handling units/merged
batches.
Archive of batch stock

Period of time after that
expired batches are
deleted/archived.
Batch without quantity

Batches without material
buffer

LOSWASTEBASKET  Batches with material

LOSTRANSPORT

LOSZUORD

A_LOSZUORD

buffer “recycle bin“
Batches that have been
transferred to an external
system.
Batch tracing
(subject to batch stock)
Subject to batch stock

LOSPROTOKOLL

Subject to batch stock

LOSEVENTMLB

Subject to batch stock

A_LOSEVENTMLB

LOSEVENTMLB2

Without batch reference

LOSATTRIBUTE

Subject to batch stock

A_LOSATTRIBUTE

Subject to batch stock

LOSEVENTLOS

Events relating to batches
(batch history)

MPL71
MPL72
MPL71
MPL72

MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72

MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72
MPL71
MPL72

 deleted
Online dataset
 deleted
Online dataset
 medium-term archive

0 days

7 days

Online dataset
 medium-term archive

7 days

Medium-term archive
 long-term archive
Online dataset
 medium-term archive

2 years

7 days

Online dataset
 medium-term archive
Online dataset
 medium-term archive
Online dataset
 medium-term archive
Online dataset
 medium-term archive

Online dataset
 medium-term archive
Medium-term archive
 long-term archive
Online dataset
 medium-term archive
Online dataset
 medium-term archive
Medium-term archive
 long-term archive
Online dataset
 medium-term archive
Online dataset
 medium-term archive
Medium-term archive
 long-term archive
Online dataset
 deleted

7 days

7 days

1 day

0 days

-

See above

-

-

2 years

7 days

0 days

See above

35 days

3.7  HYDRA-HLS

The  document  entitled  MBL_Archiving_HLS.pdf  describes

the  configurations  of  HLS  8.1  data

management.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 13 von 17

Archiving of Batch / Lot Data

TRT-ARC_81.docx

Version: 1.0.1362

Seite 14 von 17

Archiving of Batch / Lot Data

4  Reload Manager

Summary

Menu

System Administration  Archiving  Reload Manager

Transaction code

arcrld

Function authorization

arcrld

arcrld.export

arcrcl.import

Utilization

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

TRT-ARC_81.docx

Version: 1.0.1362

Seite 15 von 17

Archiving of Batch / Lot Data

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

TRT-ARC_81.docx

Version: 1.0.1362

Seite 16 von 17

Archiving of Batch / Lot Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

TRT-ARC_81.docx

Version: 1.0.1362

Seite 17 von 17

