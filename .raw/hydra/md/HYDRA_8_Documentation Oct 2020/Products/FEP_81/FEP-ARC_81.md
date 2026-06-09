Manual

Archiving of FEP Data
FEP-ARC 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Archiving of FEP Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

FEP-ARC_81.docx

Version: 1.0.21236

Page 2 of 19

Archiving of FEP Data

Contents

1  Overview – Archiving of Data from the FEP  Error! Bookmark not defined.

2  Data Management ........................................................................................ 5

3  CAQ Specific Configurations ........................................................................ 9

3.1  Overview ............................................................................................................. 9

3.1.1  Archiving inspection requirements ........................................................... 9

3.1.2  Archiving group requests ....................................................................... 12

3.1.3  Archiving CAQ events ........................................................................... 13

3.1.4  Archiving CAQ logging entries ............................................................... 15

4  Reload Manager ......................................................................................... 17

FEP-ARC_81.docx

Version: 1.0.21236

Page 3 of 19

Archiving of FEP Data

1  Archiving of FEP Data

Purpose

The function package Archiving inspection data from the FEP makes it possible to access archived data

and, moreover, to export collected data and to load these data back into the system as needed.

You use the function package when:

  You would like to have access to data already moved to archive tables in the function package.

  Because of legal requirements or customer demands, you need to ensure that the data entered is

stored long-term.

  Because  of  legal  requirements  or  customer  demands,  you  need  to  import  data  back  into  the

system to be evaluated / analyzed again.

Integration

The  archiving  of  inspection  requirements,  incl.  all  referenced  inspection  data,  is  related  to  the

components



Inspection planning for in-process inspections

  Evaluations of in-process inspections

  Standard control cards and histograms

  Extended control cards and histograms, and

  Failure mode analysis / tracking of measures.

Features

  The following data areas / objects are archived

o

o

o

o

Inspection requirements

Inspection steps

Inspection points

Inspection data, e.g. measured values

o  Assigned errors

  Export function

o  Function for transferring (exporting) data from the archive tables to external file systems

for the purpose of long-term storage of the recorded consumption data.



Import function

o  Functions  for  importing  exported  data  into  the  archive  tables  in  order  to  evaluate  them

using the applications listed above.

FEP-ARC_81.docx

Version: 1.0.21236

Page 4 of 19

Archiving of FEP Data

2  Data Management

Overview

Menu

System administration  Archiving  Data management

Transaction code

arccfg

Function authorization

arccfg.*

Usage

You may use this application in order to view or edit the centrally managed settings for archiving.

Integration

The settings for archiving/for data management are made centrally from all components/functions in the

application.

Field descriptions

Product

In the Product field, the HYDRA module for which a rule is to be defined is entered.

Object

The Object defines what is to be provided .

Retention period

In  the  "retention  period"  fields,  you  define  how  long  the  data  should  be  available  before  being

archived.

Unit

The unit for the retention period is indicated in days, months or years.

Last retention date

This field is computed and subsequently  indicates the last day  on  which data  are still  available  in

this object.

Action

It is possible to select from three process variants for an object:

D = delete

Object is deleted

M = move (archive)

Object will be transferred to the next division

X = Export

Object is unloaded (XUNLOAD format), subsequently deleted

FEP-ARC_81.docx

Version: 1.0.21236

Page 5 of 19

Archiving of FEP Data

Target object

At present, this automatically results from the detail configuration.

Condition

The characters in this field are added to the database command controlling the action, whereby this

condition is linked to the conditions of the original command there and is set in parenthesis.

Last run (date/time)

Indicates when this rule was applied last.

License

Indicates which license is required for archiving. Multiple licenses may be entered here (separated

by a space). If none of these licenses is licensed on the system, the data are either deleted (action

D) or unloaded in files (action M or X) according to the relevant action.

Path

Optional path for generating the file export (Unload). At present, only local drives are supported on

the HYDRA server in the archive. If no path is set, file exports are filed as follows:

<HYDRADIR>/<SYSTEM>/custom/archive/<YYYY-MM-DD>/<PRODUCT>/

HYDRADIR … HYDRA directory

SYSTEM … System number

YYYY-MM-DD … Archiving date (YYYY … Year, MM … Month, DD … Day)

PRODUCT … Product from archiving configuration

Management table

Table name of management table where the archiving logs are stored.

Retention period management table

In the fields used for the Retention period, you define how long the logs should be available in the

management table before being deleted.

Unit

The unit for the retention period is indicated in days, months or years.

Archiving step

Indicates whether this archiving executes archiving function I or II. In archiving function I, the data

are transferred from the online inventory to the archive tables and/or deleted. Setting M (medium-

term  archive)  In  archiving  function  II,  the  data  are  transferred  from  the  archive  table  to  the  file

export and/or deleted. Setting L (long-term archive).

Configuration

Control indicator whether or not the configuration is active. Possible values: Y/N.

FEP-ARC_81.docx

Version: 1.0.21236

Page 6 of 19

Archiving of FEP Data

Archiving type

Identifier  for  time  or  object-related  archiving.  Supported  modes:  O  =  Object-related  archiving  (i.e.

data  are  archived  for  each  object  individually).  Z  =  Time-related  archiving  (i.e.  data  are

collected/archived

without

any

object

reference).

Please note: Time and object-related archiving  differ from each other significantly  in the  archiving

performance (runtime). Object-related archiving of mass data is not recommendable.

Priority

Integral value greater than 0. Indicates the execution sequence when several objects are defined to

a module. Execution starts from the configuration with the lowest value.

Master table

Table including the archiving data. The extensions entered in the Condition field refer to this table.

Date column

Date column in the master table. Is used for evaluating the data to be archived with regard to the

retention period.

Key 1

Clear key column in the master table; may be used to identify the data to be archived. Up to 5 key

columns  may  be  defined  for  object-related  archiving.  Time-related  archiving  only  supports  one

primary key in Key 1.

Keys 2 – 5

Additional optional key columns for object-related archiving.

Comment

Comment line for describing the archiving configuration.

When copying the archiving configuration, only the data management configuration is copied at

present,  but  no  any  defined  data  records  from  the  object  details.  At  present,  the  data  records

from the object details must be copied to the new configuration by  the  user in the appropriate

screen.

Module

Version

Description of archiving

BDE

CAQ

MDE

MPL

8.1

8.1

8.1

8.1

here

here

here

here

FEP-ARC_81.docx

Version: 1.0.21236

Page 7 of 19

Archiving of FEP Data

FEP-ARC_81.docx

Version: 1.0.21236

Page 8 of 19

Archiving of FEP Data

3  CAQ Specific Configurations

3.1  Overview

3.1.1 Archiving inspection requirements

3.1.1.1 Data structures

By default, inspection requirements are archived by object, which means that each individual inspection

requirement is taken into account during archiving. If it meets the conditions of the configured parameters,

then it will be archived. During this process, all of the corresponding detail data are archived as well.

Optionally, the same mechanism can be used to configure that the data are deleted (instead of archiving

the data).

In the standard version, you will find a separate configuration for each individual HYDRA-CAQ data type

(in-production inspection, goods receipt or goods issue inspection, initial sample inspection, QMS data).

This  allows  you,  for  example,  to  archive  the  inspection  requirements  from  the  goods  receipt  in  other

intervals than data from the production area.

However,  by  default,  the  details  backed  up  for  the  inspection  requirement  are  the  same  for  every  data

type. In detail, this includes the following data:

Data
Inspection requirements

Inspection orders
Inspection
Characteristics configurations
Inspection points

order

configurations

QMS: Dynamic modification history for inspection
points based on characteristics
Characteristics

Inspection frequencies
Quantity-dependent inspection specifications
Documents
Tool assignments
Samples
Results of characteristics
Sample numbers assignment
Samples inspection point assignment

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

FEP-ARC_81.docx

Version: 1.0.21236

Page 9 of 19

Archiving of FEP Data

Data
Characteristic attributes
Single values
Failure analysis entries
Measures and corresponding parameters

Inspection matrix
Characteristic inspection point assignments

Source table(s)
caq_paumm_ausp
caq_paumwert
caq_fhlanal
caq_massn
caq_mass_param
caq_pruefmatrix

Events  and  logging  entries  belonging  to  the  inspection  requirements  are  archived  separately.  The

archiving configuration for this data is described in the following chapters.

By  default,  the  inspection  requirements  for  the  PMV  data  types  (calibration/  maintenance)  are  not

archived.

3.1.1.2 Standard configuration (with license FEP/WEP/WAP/QMS-

ARC)

If  the  one  of  the  licenses  FEP/WEP/WAP/QMS-ARC  is  active  for  the  respective  data  type,  then,  by

default the inspection requirements for the data types described below will be backed up in accordance

with the previously described structure.

There is a separate configuration for each of these data types that can be used to set the parameters for

separate archiving periods, for example.

The standard configuration for the inspection requirements is designed for two-step archiving.

In the first step, data is moved into the medium-term data area. After that, they are directly available for

reports from the medium-term data area. However, no more changes can be made to the data.

In  the  second  step,  data  is  moved  into  the  long-term  data  area.  After  that,  they  are  no  longer  directly

available for reports. To make the data available for HYDRA reports, they must first be uploaded again.

The  default  configurations  used  for  the  first  and  second  steps  of  archiving  inspection  requirements  and

their corresponding intervals are described below.

Product

Object

Description of the action

CAQ

CAQ

CAQ

FEP

Moving  the  production  inspection  requirements    from  the
online database to the medium-term database
A_FEP  Moving  the  production  inspection  requirements    from  the
medium-term database to the long-term database
WEP  Moving  the  goods  receipt  inspection  requirements    from

Factory default
interval
1 year

3 years

1 year

FEP-ARC_81.docx

Version: 1.0.21236

Page 10 of 19

Product

Object

Description of the action

Archiving of FEP Data

Factory default
interval

CAQ

the online database to the medium-term database
A_WEP  Moving  the  goods  receipt  inspection  requirements    from

3 years

the medium-term database to the long-term database

CAQ

WAP  Moving the goods issue inspection requirements  from the

1 year

CAQ

CAQ

CAQ

QMS

online database to the medium-term database
A_WAP  Moving the goods issue inspection requirements from the
medium-term database to the long-term database
EMU  Moving the initial sample inspection requirements from the

online database to the medium-term database
A_EMU  Moving the initial sample inspection requirements from the
medium-term database to the long-term database
QMS  Moving the QMS inspection requirements  from the online

database to the medium-term database

3 years

1 year

3 years

3 months

QMS

A_QMS  Moving

the  QMS

inspection  requirements

from

the

3 years

medium-term database to the long-term database

Used  as  the  time  reference  field  to  calculate  the  intervals  is  the  editing  date  for  the  inspection

requirement.  However,  not  all  inspection  requirements  are  archived.  Whether  or  not  an  inspection

requirement  is  archived  depends  on  its  status.  By  default,  only  those  inspection  requirements  are

archived that are finished and canceled.

In addition, QMS group requests must be uploaded to the PPS system before they can be archived.

In  the  standard  configuration,  administration  data  relating  to  archived  CAQ  inspection  requirements  are

maintained in the arc_verw_caq table for 12 years.

3.1.1.3 Actions without the FEP/WEP/WAP/QMS-ARC license

If there is no active  FEP/WEP/WAP/QMS-ARC license, the  inspection requirements are not affected by

this archiving configuration.

As opposed to other HYDRA data, in this case, the inspection requirements are not removed.  As such,

they  remain  in  the  online  data  area  permanently,  unless  they  are  accounted  for  in  a  different  archiving

configuration.

The inspection requirements for the QMS data are the exception. Because the events for these inspection

requirements  are  usually  uploaded  to  the  PPS  system,  there  is  no  urgent  need  to  leave  the  data

redundant in HYDRA.

This is why the data, as is the case in other HYDRA data areas, are removed from the system after the

period of time described in the Chapter Default configuration (with license FEP/WEP/WAP/QMS-ARC) for

the QMS product, object QMS, unless the configuration was changed otherwise.

FEP-ARC_81.docx

Version: 1.0.21236

Page 11 of 19

Archiving of FEP Data

3.1.2 Archiving group requests

3.1.2.1 Data structures

By  default,  group  requests  are  archived  by  object,  which  means  that  each  individual  group  request  is

taken into account during archiving. If it meets the conditions of the configured parameters, then it will be

archived. During this process, all of the corresponding detail data are archived as well.

Optionally, the same mechanism can be used to configure that the data are deleted (instead of archiving

the data).

As opposed to how inspection requirements are archived, group requests are not archived by data type.

Therefore  there  is  also  no  way  to  parameterize  different  intervals  for  group  requests  of  different  data

types.

By default, the backed up details for a group request contain the following data:

Data
Group requests
Slow user fields
Inspection frequencies

Source table(s)
caq_sammelanf
caq_zusatz_feld
caq_prueffreq

Logging entries belonging to the group requests are archived separately. The archiving configuration for

this data is described in the following chapters.

3.1.2.2 Standard configuration (for archiving with CAQ license)

If  the  archiving  license  is  active  for  the  respective  data  type,  then  by  default  the  group  requests,

depending on their data type, will be backed up in accordance with the previously described structure.

The standard configuration for the group requests is designed for two-step archiving.

In the first step, data is moved into the medium-term data area. After that, they are directly available for

reports from the medium-term data area. However, no more changes can be made to the data.

In  the  second  step,  data  is  moved  into  the  long-term  data  area.  After  that,  they  are  no  longer  directly

available for reports. To make the data available for HYDRA reports, they must first be uploaded again.

The default configurations used for the first and second steps of archiving group requests are described

below.

Product

Object

Description of the action

CAQ

SAN

Moving  the  group  requests  from  the  online  database  to

Factory default
interval
1 year

FEP-ARC_81.docx

Version: 1.0.21236

Page 12 of 19

Product

Object

Description of the action

Archiving of FEP Data

Factory default
interval

the medium-term database

CAQ

A_SAN  Moving

the  group  requests

from

the  medium-term

3 years

database to the long-term database

Used as the time reference field to calculate the intervals is the editing date for the group request.

By default, only those group requests are archived in the medium-term data area for which there are no

more inspection requirements in the online area.  This ensures that a group request is not archived in the

medium-term data area until all of the corresponding inspection requirements have also been archived.

Archiving  in  the  long-term  data  area  follows  the  same  principle.  The  group  request  (accounting  for  the

interval)  is  not  moved  into  the  long-term  data  area  until  there  are  no  more  inspection  requirements

belonging to a group request in the medium-term data area.

In the standard configuration, administration data relating to archived CAQ group requests are maintained

in the arc_verw_caq table for 12 years.

3.1.2.3 Actions for archiving without CAQ license

If there is no active CAQ license for the relevant data type, the  group requests for this archiving

configuration remain untouched.

As  opposed  to  other  HYDRA  data,  in  this  case,  the  group  requests  are  not  removed.  As  such,  they

remain  in  the  online  data  area  permanently,  unless  they  are  accounted  for  in  a  different  archiving

configuration.

3.1.3 Archiving CAQ events

3.1.3.1 Data structures

By default, CAQ events are archived sorted by time. Data is archived irrespective of whether or not the

corresponding CAQ objects (e.g. inspection requirements or their details) were archived.

Optionally, the same mechanism can be used to configure that the data are deleted (instead of archiving

the data).

By default, the events are archived individually,  in some cases with corresponding detail data. In detail,

this relates to the data described below:

FEP-ARC_81.docx

Version: 1.0.21236

Page 13 of 19

Archiving of FEP Data

Data
CAQ events
Optional dialog data corresponding to the events

Source table(s)
event_caq
event_dlg_data

3.1.3.2 Standard configuration (for archiving with CAQ license)

If the archiving license is active for the respective data type, then by default the CAQ  events, depending

on their data type, will be backed up in accordance with the previously described structure.

The standard configuration for the CAW events is designed for two-step archiving.

In the first step, data is moved into the medium-term data area. After that, they are directly available for

reports from the medium-term data area.

In  the  second  step,  data  is  moved  into  the  long-term  data  area.  After  that,  they  are  no  longer  directly

available for reports. To make the data available for HYDRA reports, they must first be uploaded again.

The default configurations used for the first and second steps of archiving group requests are described

below.

Data
CAQ events
Optional dialog data corresponding to the events

Source table(s)
event_caq
event_dlg_data

Used as the time reference field to calculate the intervals is the date of the CAQ events.

In the standard configuration, administration data relating to archived CAQ events are maintained in the

arc_verw_caq table for 12 years.

3.1.3.3 Actions for archiving without CAQ license

If there is no active CAQ license for the relevant data type, the CAQ events for this archiving configuration

remain untouched.

As opposed to other HYDRA data, in this case, the CAQ events are not removed. As such, they remain in

the online data area permanently, unless they are accounted for in a different archiving configuration.

FEP-ARC_81.docx

Version: 1.0.21236

Page 14 of 19

Archiving of FEP Data

3.1.4 Archiving CAQ logging entries

3.1.4.1 Data structures

By default, CAQ logging entries are archived sorted by time. Data is archived irrespective of whether or

not the corresponding CAQ objects (e.g. inspection requirements or their details) were archived.

Optionally, the same mechanism can be used to configure that the data are deleted (instead of archiving

the data).

By default, the logging entries are archived individually, in some cases with corresponding detail data. In

detail, this relates to the data described below:

Data
Logging entries
Additional data corresponding to logging entries

Source table(s)
hyd_logging
hyd_logging_data

3.1.4.2 Standard configuration (for archiving with CAQ license)

If the archiving license is active for the respective data type, then, by default the CAQ logging entries will

be backed up in accordance with the previously described structure.

The standard configuration for the CAQ logging entries is designed for two-step archiving.

In the first step, data is moved into the medium-term data area. After that, they are directly available for

reports from the medium-term data area.

In  the  second  step,  data  is  moved  into  the  long-term  data  area.  After  that,  they  are  no  longer  directly

available for reports. To make the data available for HYDRA reports, they must first be uploaded again.

The  default  configurations  used    for  the  first  and  second  steps  of  archiving  CAQ  logging  entries  are

described below.

Product

Object

Description of the action

CAQ

CAQ

LOG

A_ LOG

Moving the CAQ logging entries from the online
database to the medium-term database
Moving
medium-term  database
database

logging  entries
the
to

from
the
long-term

the  CAQ

Factory default
interval
35 days

3 years

FEP-ARC_81.docx

Version: 1.0.21236

Page 15 of 19

Archiving of FEP Data

Used as the time reference field to calculate the intervals is the editing date of the logging entry.

In the standard configuration, administration data relating to archived CAQ logging entries are maintained

in the arc_verw_caq table for 12 years.

3.1.4.3 Actions for archiving without CAQ license

If  there  is  no  active  CAQ  license  for  the  relevant  data  type,  the  CAQ  logging  entries  for  this  archiving

configuration remain untouched.

As opposed to other HYDRA data, the CAQ logging entries are not removed in this case. As such, they

remain  in  the  online  data  area  permanently,  unless  they  are  accounted  for  in  a  different  archiving

configuration.

FEP-ARC_81.docx

Version: 1.0.21236

Page 16 of 19

Archiving of FEP Data

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

FEP-ARC_81.docx

Version: 1.0.21236

Page 17 of 19

The selection options “module” and “object type” are mandatory fields.

Archiving of FEP Data

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

FEP-ARC_81.docx

Version: 1.0.21236

Page 18 of 19

Archiving of FEP Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

FEP-ARC_81.docx

Version: 1.0.21236

Page 19 of 19

