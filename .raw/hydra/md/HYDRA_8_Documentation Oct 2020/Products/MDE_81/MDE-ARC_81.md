Manual

Archiving Machine Data
MDE-ARC 8.1

Version 1.0.5003

Last changed on: 19.06.2020

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 2 of 14

Archiving Machine Data

Contents

1  Archiving of Machine data ............................................................................ 4

2  MDE-specific Configuration .......................................................................... 6

3  Data Management ........................................................................................ 8

4  Reload Manager ......................................................................................... 12

MDE-ARC_81.docx

Version: 1.0.21240

Page 3 of 14

Archiving Machine Data

1  Archiving of Machine data

Purpose

The machine data archiving function package not only provides the ability to access archive data, but also

to export recorded data and to then upload the data back into the system as needed.

Implementation considerations

You use the machine data archiving function package if:

  You  would  like  to  have  access  to  data  already  moved  to  archive  tables  within  the  function

package's machine data entry feature,

  Because of legal requirements or customer demands, you need to ensure that the data entered

is stored long-term.

  Because of legal requirements or customer demands, you need to import data that was already

exported back into the system to be evaluated / analyzed again.

Integration

Machine  data  archiving  accesses  recorded  data  in  the  respective  archive  tables  of  the  machine  data

collection  function  package.  On  the  other  hand,  master  data  from  the  machine  data  collection  function

package are not archived, but remain in the on-line tables.

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 4 of 14

Archiving Machine Data

  Status analysis

  Transport function

o  Functions for transporting data from the on-line tables into archive tables.

  Export function

o  Function for transferring (exporting) data from the archive tables to external file systems

for the purpose of long-term storage of the recorded machine data.



Import function

o  Functions  for  importing  exported  data  into  the  archive  tables  in  order  to  evaluate  them

using the applications listed above.

MDE-ARC_81.docx

Version: 1.0.21240

Page 5 of 14

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

 Online data
 medium-term archive

Interval  in  as-
delivered
condition
35 days 1)

MDE-ARC_81.docx

Version: 1.0.21240

Page 6 of 14

Archiving Machine Data

Product  Object

Object designation

Transfer

MDE

A_MDEPRO

MDE

EREIGMDE

Long-term  archiving  of  log
records / documents
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
Online data
 medium-term archive
Medium-term archive
 Long-term archive

Interval  in  as-
delivered
condition
3 years 1)

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 7 of 14

Archiving Machine Data

3  Data Management

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

This field is computed and  subsequently  indicates the last day  on  which data  are still  available  in

this object.

Action

It is possible to select from three process variants for an object:

D = delete

Object is deleted

M = move (archive)

Object will be transferred to the next division

X = Export

Object is unloaded (XUNLOAD format), subsequently deleted

MDE-ARC_81.docx

Version: 1.0.21240

Page 8 of 14

Archiving Machine Data

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 9 of 14

Archiving Machine Data

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

from the object details must be copied to the new configuration by  the user in the appropriate

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 10 of 14

Archiving Machine Data

MDE-ARC_81.docx

Version: 1.0.21240

Page 11 of 14

Archiving Machine Data

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 12 of 14

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

MDE-ARC_81.docx

Version: 1.0.21240

Page 13 of 14

Archiving Machine Data

  Manual

Data is loaded in the “manual” mode to the reload area. The customer is responsible for deleting

data from corresponding reload tables. However, identical data cannot be loaded several times in

the “manual” mode (data can be loaded in the “user-specific” mode though).

In  order  for  data  to  be  transferred  to  the  reload  data  area,  the  HYDRA  server  must  be  able  to

access these files. Otherwise, loading is cancelled with an error message.

MDE-ARC_81.docx

Version: 1.0.21240

Page 14 of 14

