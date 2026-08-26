Manual

WEP Data Archiving
WEP-ARC 8.2

Version 1.0.23281

Last changed on: 17.09.2020

WEP Data Archiving

Copyright

©Copyright 2015 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-ARC_82.docx

Version: 1.0.23281

Page 2 of 20

WEP Data Archiving

Contents

1  WEP Data Archiving - Overview .................................................................. 4

2  Data Management ........................................................................................ 5

3  CAQ-specific Configurations ........................................................................ 9

3.1  Overview ............................................................................................................. 9

3.1.1  Archiving of inspection requirements ....................................................... 9

3.1.2  Archiving of collective requirements ...................................................... 12

3.1.3  Archiving of CAQ events ....................................................................... 14

3.1.4  Archiving of CAQ logging entries ........................................................... 15

3.1.5  Archiving of the document management ................................................ 16

4  Reload Manager ......................................................................................... 18

WEP-ARC_82.docx

Version: 1.0.23281

Page 3 of 20

WEP Data Archiving

1  WEP Data Archiving - Overview

Purpose

The  function  package  Archiving  Inspection  Data  from  WEP  provides  access  to  archived  data  and

additionally to export recorded data and to load these data back into the system as needed.

Use this function package to:

  access data already moved to archive tables using this function package;

  ensure  that  the  data  entered  is  stored  long-term  to  comply  with  legal  regulations  or  customer

requirements;



import data back into the system for reevaluation or reanalysis to comply with legal regulations or

customer requirements;

Integration

Archiving inspection requirements including all referenced inspection data is related to this component



Inspection planning for goods receipt inspection

  Goods receipt inspection evaluations

  Standard control charts and histograms

  Advanced control charts and histograms and

  Failure mode analysis / action tracking

Features

  The following data areas / objects are archived:

o

o

o

o

Inspection Requirements

Inspection Steps

Inspection Points

Inspection data, e.g. measured values

o  Allocated errors

  Export function

o  Functions  to  transfer  (export)  data  from  the  archive  tables  to  external  file  systems  for

long-term storage of the recorded consumption data.



Import function

o  Functions  for  importing  exported  data  into  the  archive  tables  in  order  to  evaluate  them

using the applications listed above.

WEP-ARC_82.docx

Version: 1.0.23281

Page 4 of 20

WEP Data Archiving

2  Data Management

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

WEP-ARC_82.docx

Version: 1.0.23281

Page 5 of 20

WEP Data Archiving

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

WEP-ARC_82.docx

Version: 1.0.23281

Page 6 of 20

WEP Data Archiving

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

WEP-ARC_82.docx

Version: 1.0.23281

Page 7 of 20

WEP Data Archiving

PEP

PZE/PZW

ZKS

8.1/8.2

8.1/8.2

8.1/8.2

See here

See here

See here

WEP-ARC_82.docx

Version: 1.0.23281

Page 8 of 20

WEP Data Archiving

3  CAQ-specific Configurations

3.1  Overview

3.1.1 Archiving of inspection requirements

3.1.1.1 Data structures

The  default  archiving  of  inspection  requirements  is  object-related,  i.e.  each  separate  inspection

requirement is evaluated in the archiving process. If the conditions specified via configuration parameters

are fulfilled, the requirement is archived. In this process, all detailed data included is also archived.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  there  is  a  separate  configuration  for  each  individual  HYDRA-CAQ  data  type  (in-production

inspection,  goods  receipt  or  goods  issue  inspection,  initial  sample  inspection,  QMS  data).  You  can

therefore  archive  inspection  requirements  of  the  goods  receipt  area  in  other  intervals  than  data  of  the

production data.

By default, the details saved for inspection requirements are identical for each data type. This may be the

following data:

Data
Inspection requirements

Inspection orders
Inspection
order
Characteristic configurations
Inspection points

configurations

QMS: Dynamic modification history of inspection
points based on characteristics
Characteristics

Inspection frequencies
Inspection specifications depending on quantities
Documents
Tool assignments
Samples
Characteristic results
Assignment
Assignment of samples to inspection points
Characteristic attributes
Single values
Failure analysis entries
Measures and corresponding parameters

samples

of

to

numbers

Source table(s)
caq_pruefanf
caq_pan_zusatz
caq_paukop
caq_paukonf

caq_numpool
caq_ppktm_info
caq_dyhis_ppktmm

caq_merkmal
caq_merk_zusatz
caq_prueffreq
caq_mengabh_prf
caq_dokus
caq_werkzzuord
caq_paustich

caq_paunumm

caq_paumm_ausp
caq_paumwert
caq_fhlanal
caq_massn

WEP-ARC_82.docx

Version: 1.0.23281

Page 9 of 20

WEP Data Archiving

Data

Inspection matrix
Assignment of characteristics to inspection points

Source table(s)
caq_mass_param
caq_pruefmatrix

Events  and  logging  entries  for  inspection  requirements  are  archived  separately.  The  archiving

configuration of this data is described in the sections that follow.

Inspection requirements for the PMV data type (calibration/maintenance) are not archived by default.

The archiving configuration defines key fields. The key fields are used to filter the data when the

data is reloaded. For example, all inspection requirements of the period x are filtered for article

4711. The key fields are assigned as follows by default.

Key 1: rec_type, e.g. FEP

Key 2: area, e.g. F for production

Key 3: pruefanf_nr (unique inspection requirement number)

Key 4: auftrag_nr (order number of inspection requirement)

Key 5: artikel_nr (article number of inspection requirement)

If you use the database Oracle, all 5 key fields must be filled for the archiving of the inspection

requirements.  If  for  example  the  article  number  is  missing  in  an  inspection  requirement,  this

inspection requirement is not archived. If you want to archive such inspection requirements, the

relevant  key  field  must  not  have  a  content  in  the  archiving  configuration. With  the  example  of

the article number, this means that you cannot filter by the article number in a reload.

3.1.1.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If  one  of  the  licenses  FEP-/WEP-/QMS-ARC  is  available,  the  inspection  requirements  of  the  below

mentioned data types are saved by default using the structure mentioned above.

For  each  of  these  data  types,  a  separate  configuration  is  provided.  You  can  use  the  separate

configurations to configure separate archiving periods, for example. The data type WAP (goods issue) is

assigned to the licenses FEP-*.

The standard configuration of the inspection requirements provides a two-step archiving.

WEP-ARC_82.docx

Version: 1.0.23281

Page 10 of 20

WEP Data Archiving

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area. This data cannot be changed.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

Standard  configurations  for  the  first  and  second  archiving  level  of  inspection  requirements  and  the

respective intervals are described in the following table.

Product
CAQ

Object
FEP

Description of the action
Moving  the  production  inspection  requirements  from  the
online data set to the medium-term data set.

Default interval
1 year

CAQ

CAQ

A_FEP  Moving  the  production  inspection  requirements  from  the
medium-term data set to the long-term data set.
WEP  Moving  the  inspection  requirements  of  the  goods  receipt

3 years

1 year

from the online data set to the medium-term data set.

CAQ

A_WEP  Moving  the  inspection  requirements  of  the  goods  receipt

3 years

from the medium-term data set to the long-term data set.

CAQ

WAP  Moving  the  inspection  requirements  of  the  goods  issue

1 year

from the online data set to the medium-term data set.

CAQ

A_WAP  Moving  the  inspection  requirements  of  the  goods  issue

3 years

from the medium-term data set to the long-term data set.

CAQ

CAQ

EMU  Moving the inspection requirements of initial samples from
the online data set to the medium-term data set.
A_EMU  Moving the inspection requirements of initial samples from

1 year

3 years

the medium-term data set to the long-term data set.

QMS

QMS  Moving the QMS inspection requirements  from the online

3 months

data set to the medium-term data set.

QMS

A_QMS  Moving

inspection  requirements
medium-term data set to the long-term data set.

the  QMS

from

the

3 years

To  identify  the  intervals,  the  editing  date  of  the  inspection  requirement  is  used  as  reference.  Not  all

inspection requirements are archived. The respective status specifies whether an inspection requirement

is archived or not. By default, only completed and canceled inspection requirements are archived.

QMS collective requirements must be uploaded to the PPS system in order to be archived. Administrative

data  on  archived  CAQ  inspection  requirements  is  archived  for  12  years  in  the  arc_verw_caq  table  by

default.

3.1.1.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

inspection requirements.

In  contrast  to  other  HYDRA  data,  inspection  requirements  are  not  removed  in  this  case.  They

permanently remain in the online data area, unless they are included in another archiving configuration.

The data type WAP (goods issue) is assigned to the licenses FEP-*.

WEP-ARC_82.docx

Version: 1.0.23281

Page 11 of 20

WEP Data Archiving

The inspection requirements of QMS data are an exception. The results of these inspection requirements

are normally uploaded to the PPS system. For this reason it is not required to keep this data in HYDRA.

The  data  is  removed  from  the  system  after  expiration  of  the  period  of  time  defined  for  the  product

QMS/object QMS in section 1.1.1.2 Standard configuration (with license FEP-/WEP-/QMS-ARC), just as it

is the case for other HYDRA data areas if the configuration has not been changed.

3.1.2 Archiving of collective requirements

3.1.2.1 Data structures

The  default  archiving  of  collective  requirements  is  object-related,  i.e.  each  collective  requirement  is

evaluated  in  the  archiving  process.  If  the  conditions  specified  via  configuration  parameters  are  fulfilled,

the requirement is archived. In this process, all detailed data included is also archived.

Optionally, you can use the above parameters to delete the data (instead of archiving).

In contrast to the archiving of inspection requirements, the collective requirements are not archived with

reference to their data types. Consequently, is not possible to define parameters for different intervals for

the collective requirements of different data types.

The details saved by default for a collective requirement are:

Data
Collective requirements
Inspection frequencies

Source table(s)
caq_sammelanf
caq_prueffreq

Logging  entries  for  collective  requirements  are  archived  separately.  The  archiving  configuration  of  this

data is described in the sections that follow.

3.1.2.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the licenses FEP-/WEP-/QMS-ARC is available, the collective requirements are saved by default

using the structure mentioned above and irrespective of their data type.

The standard configuration of the collective requirements provides a two-step archiving.

WEP-ARC_82.docx

Version: 1.0.23281

Page 12 of 20

WEP Data Archiving

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area. This data cannot be changed.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The  standard  configurations  for  the  first  and  second  archiving  level  of  the  collective  requirements  are

described below.

Product
CAQ

Object
SAN

Description of the action
Moving collective requirements from the online data set to
the medium-term data set.

Default interval
1 year

CAQ

A_SAN  Moving  collective  requirements  from  the  medium-term

3 years

data set to the long-term data set.

To identify the intervals, the editing date of the collective requirement is used as reference.

By  default,  only  the  collective  requirements  without  inspection  requirements  in  the  online  data  area  are

archived in the medium-term data area. This ensures that a collective requirement is only archived in the

medium-term data area, if all included inspection requirements have also been archived.

Archiving  to  the  long-term  data  area  works  on  the  same  principle.  Only  if  all  inspection  requirements

included  in  the  collective  requirement  do  no  longer  exist  in  the  medium-term  data  set,  the  collective

requirement is transferred to the long-term data set (respecting the interval).

Administrative data on archived CAQ collective requirements is archived for 12 years in the arc_verw_caq

table by default.

3.1.2.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

collective requirements.

In contrast to other HYDRA data, collective requirements are not removed in this case. They permanently

remain in the online data area, unless they are included in another archiving configuration.

WEP-ARC_82.docx

Version: 1.0.23281

Page 13 of 20

WEP Data Archiving

3.1.3 Archiving of CAQ events

3.1.3.1 Data structures

By default, CAQ events are archived in relation to time. The archiving is always performed and it does not

matter if the included CAQ objects (e.g. inspection requirements or their details) have  been archived or

not.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  the  events  are  archived  separately,  if  applicable  with  the  relevant  detail  data.  The  following

data is archived:

Data
CAQ events
Optional dialog data for events

Source table(s)
event_caq
event_dlg_data

3.1.3.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the licenses FEP-/WEP-/QMS-ARC is available, the CAQ events are saved by default using the

structure mentioned above and irrespective of their data type.

The standard configuration of the CAQ events provides a two-step archiving.

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area.

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The  standard  configurations  for  the  first  and  second  archiving  level  of  the  CAQ  events  are  described

below.

Product
CAQ

Object
EREIGCAQ

Description of the action
Moving  entries  of  CAQ  events  from  the  online
data set to the medium-term data set.

Default interval
35 days

CAQ

A_ EREIGCAQ  Moving entries of CAQ events from the medium-

3 years

term data set to the long-term data set.

WEP-ARC_82.docx

Version: 1.0.23281

Page 14 of 20

WEP Data Archiving

To identify the intervals, the date of the CAQ event is used as reference.

Administrative  data  on  archived  CAQ  events  is  archived  for  12  years  in  the  arc_verw_caq  table  by

default.

3.1.3.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

CAQ events.

In contrast to other HYDRA data, CAQ events are not removed in this case. They permanently remain in

the online data area, unless they are included in another archiving configuration.

3.1.4 Archiving of CAQ logging entries

3.1.4.1 Data structures

By default, CAQ logging entries are archived in relation to time. The archiving is always performed and it

does  not  matter  if  the  included  CAQ  objects  (e.g.  inspection  requirements  or  their  details)  have  been

archived or not.

Optionally, you can use the above parameters to delete the data (instead of archiving).

By  default,  the  logging  entries  are  archived  separately,  if  applicable  with  the  relevant  detail  data.  The

following data is archived:

Data
Logging entries
Additional data to logging entries

Source table(s)
hyd_logging
hyd_logging_data

3.1.4.2 Standard configuration (with license FEP-/WEP-/QMS-

ARC)

If one of the  licenses FEP-/WEP-/QMS-ARC is  available, the CAQ logging entries are saved by  default

using the structure mentioned above.

The standard configuration of the CAQ logging entries provides a two-step archiving.

In  a  first  step,  data  is  moved  to  the  medium-term  data  area.  Here,  data  is  directly  available  for

evaluations/reports using the medium-term data area.

WEP-ARC_82.docx

Version: 1.0.23281

Page 15 of 20

WEP Data Archiving

In  a  second  step,  data  is  moved  to  the  long-term  data  area.  In  this  case,  data  is  no  longer  directly

available

for  evaluations/reports.  Data  needs

to  be  reloaded

first

to  be  able

to  use

it

for

evaluations/reports in HYDRA.

The default configurations for the first and second archiving level of CAQ logging entries are described in

the below table.

Product
CAQ

Object
LOG

CAQ

A_LOG

Description of the action
Moving CAQ logging entries from the online data
set to the medium-term data set.
Moving
the
medium-term data set to the long-term data set.

logging  entries

the  CAQ

from

Default interval
35 days

3 years

To identify the intervals, the date of the logging entry is used as reference.

Administrative data on archived CAQ logging entries is archived for 12 years in the arc_verw_caq table

by default.

3.1.4.3 Activities without license FEP-/WEP-/QMS-ARC

If  no  active  license  FEP-/WEP-/QMS-ARC  is  available,  this  archiving  configuration  does  not  affect  the

CAQ logging entries.

In contrast to other HYDRA data, CAQ logging entries are not removed in this  case. They permanently

remain in the online data area, unless they are included in another archiving configuration.

3.1.5 Archiving of the document management

The documents of the HYDRA document management are archived when the relevant object is archived.

The files themselves remain at their original storage location and are not archived.

As  part  of  the  HYDRA  document management  of  the  CAQ,  you  can  assign  documents  to  the  following

objects.





Inspection points

Inspection step characteristics/inspection point characteristics

  Measured values/attributive inspection results

To archive the documents, make the following entries in the data management.

Product
CAQ

Object
DOCLINK

Description of the action
Moving the document entry from the online data set
to the medium-term data set.

Default interval
0 days

WEP-ARC_82.docx

Version: 1.0.23281

Page 16 of 20

WEP Data Archiving

Product
CAQ

Object

Description of the action

A_DOCLINK  Moving  the  document  entry  from  the  medium-term
data set to the long-term data set.

Default interval
0 days

Set the interval to "0 days" so that the archiving is directly performed after the archiving of the respective

object.

WEP-ARC_82.docx

Version: 1.0.23281

Page 17 of 20

WEP Data Archiving

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

WEP-ARC_82.docx

Version: 1.0.23281

Page 18 of 20

The selection options “module” and “object type” are mandatory fields.

WEP Data Archiving

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

WEP-ARC_82.docx

Version: 1.0.23281

Page 19 of 20

WEP Data Archiving

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

WEP-ARC_82.docx

Version: 1.0.23281

Page 20 of 20

