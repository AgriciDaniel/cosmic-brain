Data Management

Data Management

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

MOC_DataManagement.docx

Version: 1.8.23366

Page 1 of 8

Data Management

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

Specifies if this archiving process uses archiving function I or II. Archiving  function I: The function

moves data from the online data set to archive tables or deletes the data: setting M (medium-term

archive). Archiving function II: The function moves data from the archive table to the file export or

deletes the data: setting L (long-term archive).

Configuration

Indicates whether or not the configuration is active. Possible values: Y/N

MOC_DataManagement.docx

Version: 1.8.23366

Page 2 of 8

Data Management

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

MOC_DataManagement.docx

Version: 1.8.23366

Page 3 of 8

Data Management

1  Functions/configurations specific to product groups

1.1 CAQ

For  information  on  the  data  management  configurations  of  CAQ  8.1,  refer  to  the  document

MBL_Archiving_CAQ.pdf.

1.2 BDE

For  information  on  the  data  management  configurations  of  BDE 8.1/BDE 8.2,  refer  to  the  document

MBL_Archiving_BDE.pdf.

1.3 MDE

For  information  on  the  data  management  configurations  of  MDE 8.1/MDE 8.2,  refer  to  the  document

MBL_Archiving_MDE.pdf.

1.4 WRM

For  information  on  the  data  management  configurations  of  WRM 8.1/WRM 8.2,  refer  to  the  document

MBL_Archiving_WRM.pdf.

MOC_DataManagement.docx

Version: 1.8.23366

Page 4 of 8

Data Management

1.5 PDV

1.5.1 Overview

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

1.5.2 Configuration

Mass data is archived via two components: export and import.

MOC_DataManagement.docx

Version: 1.8.23366

Page 5 of 8

Data Management

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

MOC_DataManagement.docx

Version: 1.8.23366

Page 6 of 8

As part of a customization, you can also archive further data ( e.g. events). To this end,  you must store

the  respective  entries  in  the  table  "hyd_datamanagement".  The  process  is  identical  to  the  one  of  the

Data Management

general archiving.

1.6 MPL / TRT

For information on the data management configurations of MPL or TRT in versions 8.1 or 8.2, refer to the

document  MBL_Archiving_MPL.pdf.

1.7 HLS

For  information  on  the  data  management  configurations  of  HLS  8.1,  refer  to  the  document

MBL_Archiving_HLS.pdf.

1.8 PZE / PZW

For information on the data management configurations of PZE or PZW in versions 8.1 or 8.2, refer to the

document MBL_Archiving_PZW.pdf.

1.9 PEP

For information on the data management configurations of the Personnel Scheduling PEP in versions 8.1

or 8.2, refer to the document MBL_Archiving_PEP.pdf.

MOC_DataManagement.docx

Version: 1.8.23366

Page 7 of 8

Data Management

1.10 LLE

For  information  on  the  data  management  configurations  of  the  Incentive  Wage  LLE  8.1,  refer  to  the

document MBL_Archiving_LLE.pdf.

1.11 ZKS

For information on the data management configurations of the Access Control ZKS in versions 8.1 or 8.2,

refer to the document MBL_Archiving_ZKS.pdf.

1.12 ESK

For  information  on  the  data  management  configurations  of  the  Escalation  Management  in  version  3.0,

refer to the document MBL_ESK_Archiving.pdf.

1.13 ETD

For  information  on  the  data management  configurations  of  the  Label  Design  in  version  3.0,  refer  to  the

document MBL_Archiving_ETD.pdf.

MOC_DataManagement.docx

Version: 1.8.23366

Page 8 of 8

