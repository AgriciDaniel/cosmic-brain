Manual

Archiving of Energy and
Power Data
EMG-ARC 8.1

Version 1.0.23372

Last changed on: 23.09.2020

Archiving of Energy and Power Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-ARC_81.docx

Version: 1.0.23372

Page 2 of 16

Archiving of Energy and Power Data

Contents

1  Energy Management Archiving .................................................................... 4

2  Data Management ........................................................................................ 6

3  Functions/configurations specific to product groups .................................... 9

3.1  CAQ .................................................................................................................... 9

3.2  BDE .................................................................................................................... 9

3.3  MDE .................................................................................................................... 9

3.4  WRM ................................................................................................................... 9

3.5  PDV .................................................................................................................. 10

3.5.1  Overview ............................................................................................... 10

3.5.2  Configuration ......................................................................................... 10

3.6  MPL / TRT ......................................................................................................... 12

3.7  HLS ................................................................................................................... 12

3.8  PZE / PZW ........................................................................................................ 12

3.9  PEP ................................................................................................................... 12

3.10  LLE ................................................................................................................... 13

3.11  ZKS ................................................................................................................... 13

3.12  ESK ................................................................................................................... 13

3.13  ETD ................................................................................................................... 13

4  Reload Manager ......................................................................................... 14

EMG-ARC_81.docx

Version: 1.0.23372

Page 3 of 16

Archiving of Energy and Power Data

1  Energy Management Archiving

Purpose

The energy consumption data archiving function package makes it possible to access archive data and,

moreover,  makes  it  possible  to  export  recorded  data  and  to  load  these  data  back  into  the  system  as

needed.

You use the function package when:

  You would like to have access to data already moved to archive tables in the function package.

  Because of legal requirements or customer demands, you need to ensure that the data entered is

stored long-term.

  Because  of  legal  requirements  or  customer  demands,  you  need  to  import  data  back  into  the

system to be evaluated / analyzed again.

Integration

When  consumption  data  are  archived,  inventory  data  and  recorded  data  is  accessed  from  the  relevant

archive  tables  in  the  function  package.  Furthermore,  the  performance  data  recorded  for  the  energy

management must be controlled via the archiving of the function packages Process Data and Resources

Management.

Features

  Direct access to archive tables from the application

o  Direct access to archived business/order data from the applications

  Energy monitor

  Energy consumption analysis

  Energy consumption accounting

  Resource history

  Resource utilization

  Performance data of the  process data processing actual values

  Transport function

o  Functions for transporting data from the on-line tables into archive tables.

  Export function

o  Function for transferring (exporting) data from the archive tables to external file systems

for the purpose of long-term storage of the recorded consumption data.



Import function

EMG-ARC_81.docx

Version: 1.0.23372

Page 4 of 16

Archiving of Energy and Power Data

o  Functions  for  importing  exported  data  into  the  archive  tables  in  order  to  evaluate  them

using the applications listed above.

EMG-ARC_81.docx

Version: 1.0.23372

Page 5 of 16

Archiving of Energy and Power Data

2  Data Management

Overview

HYDRA menu

System administration  Archiving  Data management

FEDRA menu

System administration  Archiving  Data management

Transaction code

arccfg

Function authorization

arccfg.*

Purpose

You use this application to view or change the centrally managed archiving settings of recorded data.

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

Enter the system module for which you want to define a rule.

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

EMG-ARC_81.docx

Version: 1.0.23372

Page 6 of 16

Archiving of Energy and Power Data

Target object

Currently, the target object automatically results from the detail configuration.

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

HYDRADIR

 HYDRA directory

SYSTEM …

system number

YYYY-MM-DD … archiving day (YYYY … year, MM … month, DD … day)

PRODUCT …

product from archiving configuration

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

EMG-ARC_81.docx

Version: 1.0.23372

Page 7 of 16

Archiving of Energy and Power Data

Archiving type

Identifier  for  time  or  object-related  archiving.  Supported  modes:  O  =  Object-related  archiving  (i.e.

data  is  archived  for  each  object  individually).  Z  =  Time-related  archiving  (i.e.  data  is  archived

without any object reference).

Note:  Time  and  object-related  archiving  differ  from  each  other  significantly  in  the  archiving

performance (runtime). Object-related archiving of mass data is not recommended.

Priority

Integral value greater than 0. Indicates the processing sequence if several objects are defined for a

product group. Processing starts with the lowest value.

Master table

Table including the data to be archived. The extensions entered in the Condition field refer to this

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

EMG-ARC_81.docx

Version: 1.0.23372

Page 8 of 16

Archiving of Energy and Power Data

3  Functions/configurations specific to product groups

3.1 CAQ

For  information  on  the  data  management  configurations  of  CAQ  8.1,  refer  to  the  document

MBL_Archiving_CAQ.pdf.

3.2 BDE

For  information  on  the  data  management  configurations  of  BDE 8.1/BDE 8.2,  refer  to  the  document

MBL_Archiving_BDE.pdf.

3.3 MDE

For  information  on  the  data  management  configurations  of  MDE 8.1/MDE 8.2,  refer  to  the  document

MBL_Archiving_MDE.pdf.

3.4 WRM

For  information  on  the  data  management  configurations  of  WRM 8.1/WRM 8.2,  refer  to  the  document

MBL_Archiving_WRM.pdf.

EMG-ARC_81.docx

Version: 1.0.23372

Page 9 of 16

Archiving of Energy and Power Data

3.5 PDV

3.5.1 Overview

The  standard  archiving  function  of  HYDRA-PDV  7.2  can  archive  mass  data  tables.  The  system  writes

table data into files that are stored using a defined path.

Mass  data  tables  (also  called  TNT  tables)  include  a  time  stamp  in  their  name  ID  that  is  used  during

archiving.

The  table  "tnt_table_repo"  provides  information  on  the  archiving  status  of  the  single  TNT  tables,  e.g.

information  on  the  location  and  the  name  of  the  data  file,  or  on  an  eventual  re-import  of  the  table  that

might require a new export.

Patch:

The  standard  HYDRA-PDV  7.2  installation  provides  the  option  to  archive  mass  data,  thus  TNT

tables.

-  DBPATCH PDV_72

(includes the “pdv_setup“ table)

-  DBPATCH TNT_72

(includes the “tnt_table_repo“ table)

License:

3.5.2 Configuration

Mass data is archived via two components: export and import.

EMG-ARC_81.docx

Version: 1.0.23372

Page 10 of 16

Archiving of Energy and Power Data

The  export  is  performed  at  cyclic  intervals  and  is  started  by  the  system  scheduler.  The  export  unloads

“due” tables from the database into data files on hard disk.

The import (or reload) function is a kind of library. If required, you use this function to reload data from the

data files back to the database tables.

In general, the export function transfers the files one-to-one from the database into the data files. You can

also configure a one-to-many relationship, i.e. you can distribute a table among several files. Vice versa,

a file must belong to exactly one table (one table can have several files, but a file always refers to exactly

one table).

Program:

hp_mexp.exe / out

Installation:

The program is entered in the system Scheduler and started cyclically.

Console menu: File – System administration – Scheduler

The corresponding time, when the program is to be started can be defined in the

“fix” tab.

Important:  You  should  not  start  the  export  program  at  little  intervals  in  the  Scheduler,  because  it  is  an

archiving program. Depending on the data volume, a daily (each night) or weekly rhythm is enough.

You must also define a parameter that specifies when the data is old enough to be archived. Here, the

parameter refers to the number of tables that may be online. If this number is exceeded, the oldest TNT

tables are archived via export. The parameter is included in the “pdv_setup” table.  You can change the

parameter in the basic settings of the console, in tab “PDV”.

As part of the implementation process, it has to be checked if the archiving path with ID “PDVARC“ exists

in the “arc_path” column of the “pdv_setup” table (and, if required, if the transport path has been defined

with the ID “PDVTRANS” in the “trans_path“ column).

You can then use the table "hy_path" to find the respective directories.

You may not define a host if a relative URL path is defined for archiving, PDVARC, (depending on the file

hp_mexp.scr).

EMG-ARC_81.docx

Version: 1.0.23372

Page 11 of 16

As part of a customization, you can also archive  further data ( e.g. events). To this end,  you must store

the  respective  entries  in  the  table  "hyd_datamanagement".  The  process  is  identical  to  the  one  of  the

Archiving of Energy and Power Data

general archiving.

3.6 MPL / TRT

For information on the data management configurations of MPL or TRT in versions 8.1 or 8.2, refer to the

document  MBL_Archiving_MPL.pdf.

3.7 HLS

For  information  on  the  data  management  configurations  of  HLS  8.1,  refer  to  the  document

MBL_Archiving_HLS.pdf.

3.8 PZE / PZW

For information on the data management configurations of PZE or PZW in versions 8.1 or 8.2, refer to the

document MBL_Archiving_PZW.pdf.

3.9 PEP

For information on the data management configurations of the Personnel Scheduling PEP in versions 8.1

or 8.2, refer to the document MBL_Archiving_PEP.pdf.

EMG-ARC_81.docx

Version: 1.0.23372

Page 12 of 16

Archiving of Energy and Power Data

3.10 LLE

For  information  on  the  data  management  configurations  of  the  Incentive  Wage  LLE  8.1,  refer  to  the

document MBL_Archiving_LLE.pdf.

3.11 ZKS

For information on the data management configurations of the Access Control ZKS in versions 8.1 or 8.2,

refer to the document MBL_Archiving_ZKS.pdf.

3.12 ESK

For  information  on  the  data  management  configurations  of  the  Escalation  Management  in  version  3.0,

refer to the document MBL_ESK_Archiving.pdf.

3.13 ETD

For  information  on  the  data management  configurations  of  the  Label  Design  in  version  3.0,  refer  to  the

document MBL_Archiving_ETD.pdf.

EMG-ARC_81.docx

Version: 1.0.23372

Page 13 of 16

Archiving of Energy and Power Data

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

EMG-ARC_81.docx

Version: 1.0.23372

Page 14 of 16

Archiving of Energy and Power Data

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

EMG-ARC_81.docx

Version: 1.0.23372

Page 15 of 16

Archiving of Energy and Power Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

EMG-ARC_81.docx

Version: 1.0.23372

Page 16 of 16

