Manual

Archiving of Batch Data
TRT-ARC 8.2

Version 1.0.23372

Last changed on: 23 September 2020

Archiving of Batch Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

TRT-ARC_82.docx

Version: 1.0.23372

Page 2 of 25

Archiving of Batch Data

Contents

1  Archiving of Batch Data ................................................................................ 4

2  Archiving in MPL/TRT .................................................................................. 5

3  Data Management ...................................................................................... 11

4  Data Management ...................................................................................... 15

5  Functions/configurations specific to product groups .................................. 18

5.1  CAQ .................................................................................................................. 18

5.2  BDE .................................................................................................................. 18

5.3  MDE .................................................................................................................. 18

5.4  WRM ................................................................................................................. 18

5.5  PDV .................................................................................................................. 19

5.5.1  Overview ............................................................................................... 19

5.5.2  Configuration ......................................................................................... 19

5.6  MPL / TRT ......................................................................................................... 21

5.7  HLS ................................................................................................................... 21

5.8  PZE / PZW ........................................................................................................ 21

5.9  PEP ................................................................................................................... 21

5.10  LLE ................................................................................................................... 22

5.11  ZKS ................................................................................................................... 22

5.12  ESK ................................................................................................................... 22

5.13  ETD ................................................................................................................... 22

6  Reload Manager ......................................................................................... 23

TRT-ARC_82.docx

Version: 1.0.23372

Page 3 of 25

Archiving of Batch Data

1  Archiving of Batch Data

Purpose

The  function  package  for  Archiving  batch/lot  data  provides  access  to  archived  data  and,  moreover,  the

possibility to export recorded data and load these data back into the system as needed.

Implementation Considerations

You use the function package for archiving batch/lot data, if:

  You request access to data from the Material and Production Logistics as well as the Tracking &

Tracing function packages which was already transferred to archive charts;

  You  need  to  ensure  the  long-term  storage  of  recorded  data  due  to  legal  or  customer

requirements;

  You need to import already exported data back into the system for repeated evaluation/analysis

due to legal or customer requirements.

Integration

The function package for archiving batch/lot data provides access to inventory data and recorded data of

the Material and Production Logistics as well as the Tracking & Tracing function packages.

The function package for archiving batch/lot data provides access to inventory data and recorded data in

the  relevant  archive  tables  of  the  Material  and  Production  Logistics  as  well  as  the  Tracking  &  Tracing

function packages.

Features

  Direct access to archive tables from the application

o  Direct  access  to  archived  batch/lot  data  via  the  lot  data  overview  and  maintenance  as

well  as  tabular  and  graphical  batch/lot  tracking  (prerequisite:  you  use  the  TRT-GLV

function package)

  Export function

o  Functions for transferring (exporting) data from the archive tables to external file systems

for the purpose of long-term storage of the recorded batch data



Import function

o  Functions  for  importing  exported  data  into  archive  charts  for  the  purpose  of  evaluating

them  using  the  batch  data  overview  and  maintenance  as  well  as  tabular  and  graphical

batch tracing (prerequisite: you use the TRT-GLV function package).

TRT-ARC_82.docx

Version: 1.0.23372

Seite 4 von 25

Archiving of Batch Data

2  Archiving in MPL/TRT

Overview

In the MPL product group, data is usually kept online for 7 days before it is moved to the long-term data

area.

You  can  access  data  older  than  7  days  in  a  variety  of  MPL  evaluations/reports.  For  this  purpose,  MPL

postings  are  provided  in  a  special  medium-term  or  archive  area.  This  data  is  largely  accessed

automatically if the selection period exceeds the short-term data area. In a few applications, the option to

"Consider long-term data" is provided in the selection area and can be used to access this data.

The MPL archiving integrates the following data:

Object

DB table online area

DB table archive area

Batch inventory

los_bestand

a_los_bestand

Batch attributes

los_attribute

a_los_attribute

Batch assignments

los_zuordnung

a_los_zuordnung

Batch events

event_los

a_event_los

Material movements

event_mlb

a_event_mlb

Batch logs

mpl_los_prot

mpl_a_los_prot

Batch relations

mpl_beziehungen

a_mpl_beziehungen

Document management

hyd_document

a_hyd_document

hyd_documenttext

a_hyd_documenttext

Change history

hyd_logging

a_hyd_logging

hyd_logging_data

a_hyd_logging_data

Configuration

Using  HYDRA  Data  Management,  you  can  configure  how  long  data  is  to  be  kept  in  the  different  data

areas.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 5 von 25

The  transfer  of  data  into  archive  tables  includes  the  data  with  a  "retention  period"  that  has  expired  (in

number of days/months/years; see the values in parentheses in the table below). If MPL/TRT archiving is

not licensed, data will be deleted after the configured retention period.

Archiving of Batch Data

  Object
t
c
u
d
o
r
P

Object name

Action

Default
interval

MPL  LOSDELETE

Archiving of all batches with batch
status "D" (deleted).

Deletion

0 day

MPL  MPLBAHNVERT

MPL  LOSAB

MPL  LOSPACKED

MPL  A_LOSBESTAND

MPL  LOSEXPIRED

Affected table:
los_bestand (v);(a)
Archiving of all cutting plans whose
order number does no longer exist
in the table auftrag_status.

Affected table:
auftrag_status (v)
mpl_bahnverteilung (a)
mpl_bahnlayout (a)
Archiving of all batches with batch
status "A" (processed), that are not
assigned to the material status "V"
(packed) or that are not at all
assigned to a material status
(material status = empty) and
where the interval has been
exceeded.

Affected table:
los_bestand (v);(a)
Archiving of all batches with batch
status "A" (processed), that are
assigned to the material status "V"
(packed), the associated merged
batch does no longer exist and
exceeding the interval.

Affected table:
los_bestand (v);(a)
Archiving of all batches exceeding
the interval.

Affected table:
a_los_bestand (v);(a)
Archiving of all batches with batch
status "V" (expired) and exceeding
the interval.

Affected table:
los_bestand (v);(a)

Deletion

0 day

Archiving of online
data --> archive
tables

7 days

Archiving of online
data --> archive
tables

7 days

Export of archive
table  file system

2 years

Archiving of online
data --> archive
tables

7 days

TRT-ARC_82.docx

Version: 1.0.23372

Seite 6 von 25

Archiving of Batch Data

Object name

Action

Default
interval

  Object
t
c
u
d
o
r
P

MPL  A_LOSEXPIRED

Archiving of all batches exceeding
the interval.

Export of archive
table  file system

3 years

MPL  LOSLEER

MPL  LOSMATPUF

MPL  LOSWASTEBASKET

MPL  LOSTRANSPORT

Affected table:
a_los_bestand (v);(a)
Archiving of all batches with a
status that is not "L" (running), with
zero quantity and exceeding the
interval.

Affected table:
los_bestand (v);(a)
Archiving of all batches with a
status that is not "L" (running), that
are not assigned to a material
buffer or the assigned material
buffer does no longer exist and
exceeding the interval.

Affected table:
los_bestand (v);(a)
Archiving of all batches with a
status that is not "L" (running), that
are assigned to a material buffer
identified as "recycle bin" and
exceeding the interval.

Affected table:
los_bestand (v);(a)
Archiving of all batches with batch
status "T" (transport)

Affected table:
los_bestand (v);(a)

Archiving  of  online

7 days

data

-->

archive

tables

Archiving  of  online

7 days

data

-->

archive

tables

Archiving  of  online

1 day

data

-->

archive

tables

Archiving  of  online

0 day

data

-->

archive

tables

MPL  LOSZUORD

Archiving of all batch assignments if
both batches belonging to the
assignment do no longer exist in
the table los_bestand.

Archiving  of  online

-

data

-->

archive

tables

MPL  A_LOSZUORD

Affected table:
los_bestand (v)
los_zuordnung (a)
Archiving of all batch assignments if
both batches belonging to the
assignment do no longer exist in
the table a_los_bestand.

Affected table:
a_los_bestand (v)
a_los_zuordnung (a)

Export of archive
table  file system

See above

TRT-ARC_82.docx

Version: 1.0.23372

Seite 7 von 25

  Object
t
c
u
d
o
r
P

MPL  LOSPROTOKOLL

MPL  LOSEVENTMLB

MPL  A_LOSEVENTMLB

MPL  LOSEVENTMLB2

MPL  LOSATTRIBUTE

MPL  A_LOSATTRIBUTE

MPL  LOSEVENTLOS

Archiving of Batch Data

Object name

Action

Default
interval

Archiving of all batch logs with
batches no longer existing in the
table los_bestand.

Archiving  of  online

-

data

-->

archive

tables

Affected table:
los_bestand (v)
mpl_los_prot (a)
Archiving of all batch events
"material movement" with batches
no longer existing in the table
los_bestand.

Affected table:
los_bestand (v)
event_mlb (a)
Archiving of all batch events
"material movement" exceeding the
interval.

Affected table:
a_event_mlb (v);(a)
Archiving of all batch events with a
batch number of "null", "", or "@" in
the table event_mlb and exceeding
the interval.

Affected table:
event_mlb (v);(a)
Archiving of all batch attributes with
batches no longer existing in the
table los_bestand.

Affected table:
los_bestand (v)
los_attribute (a)
Archiving of all batch attributes with
batches no longer existing in the
table a_los_bestand.

Affected table:
a_los_bestand (v)
a_los_attribute (a)
Archiving of all batch events
batches exceeding the interval.

Affected table:
event_los (v);(a)

Archiving  of  online

-

data

-->

archive

tables

Export of archive
table  file system

2 years

Archiving  of  online

7 day

data

-->

archive

tables

Archiving  of  online

0 day

data

-->

archive

tables

Export of archive
table  file system

See above

Archiving  of  online

35 day

data

-->

archive

tables

TRT-ARC_82.docx

Version: 1.0.23372

Seite 8 von 25

Archiving of Batch Data

Object name

Action

Default
interval

  Object
t
c
u
d
o
r
P

MPL  LOSRELATIONS

Archiving of all relationship data
exceeding the interval.

Affected table:
mpl_beziehung (v);(a)

Archiving  of  online

35 day

data

-->

archive

tables

MPL  A_ LOSRELATIONS

Archiving of all relationship data
exceeding the interval.

Export of archive
table  file system

2 years

MPL  DOCLINK

MPL  A_DOCLINK

MPL  CHANGELOG

MPL  A_CHANGELOG

MPL  DEMAND

MPL  A_DEMAND

Affected table:
a_mpl_beziehung (v);(a)
Archiving of all hyd_documente
with batches no longer existing in
the table los_bestand.

Affected table:
los_bestand (v)
hyd_document (a)
hyd_documenttext (a)
Archiving of all hyd_documente
with batches no longer existing in
the table a_los_bestand.

Affected table:
a_los_bestand (v)
a_hyd_document (a)
a_hyd_documenttext (a)

Archiving of all change logs
exceeding the interval.

Affected table:
hyd_logging (v);(a)

Archiving of all change logs
exceeding the interval.

Affected table:
a_hyd_logging (v);(a)
Archiving of material-related
requirements

Affected table:
demand_request (v);(a)
demand_acknowledge (v);(a)
Archiving of material-related
requirements

Affected table:
a_demand_request (v);(a)
a_demand_acknowledge (v);(a)

Archiving of online
data --> archive
tables

0 day

Export of archive
table  file system

See above

Archiving  of  online

35 day

data

-->

archive

tables

Export  of  archive

3 years

table  file system

Archiving  of  online

14 day

data

-->

archive

tables

Export  of  archive

2 years

table  file system

(v) = table used to compare entries.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 9 von 25

Archiving of Batch Data

(a) = table including the entries to be archived.

Configuration of material-related requirements (interface EIS-WMS)

The objects "DEMAND" and "A_DEMAND" are used with the interface EIS-WMS.

Material-related requirements are identified by the value "L" in field LEVEL in the interface.

For information on the interface EIS-WMS, follow the link: Interface to Warehouse Management Systems.

  Object
t
c
u
d
o
r
P

MPL  DEMAND

MPL  A_DEMAND

Object name

Action

Default
interval

Archiving of material-related
requirements

Affected table:
demand_request (v);(a)
demand_acknowledge (v);(a)
Archiving of material-related
requirements

Affected table:
a_demand_request (v);(a)
a_demand_acknowledge (v);(a)

Archiving  of  online

14 day

data

-->

archive

tables

Export  of  archive

2 years

table  file system

(v) = table used to compare entries.

(a) = table including the entries to be archived.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 10 von 25

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 11 von 25

Condition

The  characters  in  this  field  are  added  as  an  additional  condition  to  the  database  command  that

controls  the  action.  This  condition  is  linked  to  the  other  conditions  of  the  original  command  using

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 12 von 25

Archiving of Batch Data

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

If you copy the archiving configuration, the system currently only copies the data  management

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 13 von 25

Archiving of Batch Data

PEP

PZE/PZW

ZKS

8.1/8.2

8.1/8.2

8.1/8.2

See here

See here

See here

TRT-ARC_82.docx

Version: 1.0.23372

Seite 14 von 25

Archiving of Batch Data

4  Data Management

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 15 von 25

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 16 von 25

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 17 von 25

Archiving of Batch Data

5  Functions/configurations specific to product groups

5.1 CAQ

For  information  on  the  data  management  configurations  of  CAQ  8.1,  refer  to  the  document

MBL_Archiving_CAQ.pdf.

5.2 BDE

For  information  on  the  data  management  configurations  of  BDE 8.1/BDE 8.2,  refer  to  the  document

MBL_Archiving_BDE.pdf.

5.3 MDE

For  information  on  the  data  management  configurations  of  MDE 8.1/MDE 8.2,  refer  to  the  document

MBL_Archiving_MDE.pdf.

5.4 WRM

For  information  on  the  data  management  configurations  of  WRM 8.1/WRM 8.2,  refer  to  the  document

MBL_Archiving_WRM.pdf.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 18 von 25

Archiving of Batch Data

5.5 PDV

5.5.1 Overview

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

5.5.2 Configuration

Mass data is archived via two components: export and import.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 19 von 25

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 20 von 25

As part of a customization, you can also archive further data ( e.g. events). To this end,  you must store

the  respective  entries  in  the  table  "hyd_datamanagement".  The  process  is  identical  to  the  one  of  the

Archiving of Batch Data

general archiving.

5.6 MPL / TRT

For information on the data management configurations of MPL or TRT in versions 8.1 or 8.2, refer to the

document  MBL_Archiving_MPL.pdf.

5.7 HLS

For  information  on  the  data  management  configurations  of  HLS  8.1,  refer  to  the  document

MBL_Archiving_HLS.pdf.

5.8 PZE / PZW

For information on the data management configurations of PZE or PZW in versions 8.1 or 8.2, refer to the

document MBL_Archiving_PZW.pdf.

5.9 PEP

For information on the data management configurations of the Personnel Scheduling PEP in versions 8.1

or 8.2, refer to the document MBL_Archiving_PEP.pdf.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 21 von 25

Archiving of Batch Data

5.10 LLE

For  information  on  the  data  management  configurations  of  the  Incentive  Wage  LLE  8.1,  refer  to  the

document MBL_Archiving_LLE.pdf.

5.11 ZKS

For information on the data management configurations of the Access Control ZKS in versions 8.1 or 8.2,

refer to the document MBL_Archiving_ZKS.pdf.

5.12 ESK

For  information  on  the  data  management  configurations  of  the  Escalation  Management  in  version  3.0,

refer to the document MBL_ESK_Archiving.pdf.

5.13 ETD

For  information  on  the  data management  configurations  of  the  Label  Design  in  version  3.0,  refer  to  the

document MBL_Archiving_ETD.pdf.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 22 von 25

Archiving of Batch Data

6  Reload Manager

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 23 von 25

The selection options “module” and “object type” are mandatory fields.

Archiving of Batch Data

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

TRT-ARC_82.docx

Version: 1.0.23372

Seite 24 von 25

Archiving of Batch Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

TRT-ARC_82.docx

Version: 1.0.23372

Seite 25 von 25

