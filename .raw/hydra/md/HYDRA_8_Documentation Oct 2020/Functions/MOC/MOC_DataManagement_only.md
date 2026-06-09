Data Management

Data Management

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

MOC_DataManagement_only.docx

Version: 1.1.20792

Page 1 of 4

Condition

The  characters  in  this  field  are  added  as  an  additional  condition  to  the  database  command  that

controls  the  action.  This  condition  is  linked  to  the  other  conditions  of  the  original  command  using

Data Management

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

MOC_DataManagement_only.docx

Version: 1.1.20792

Page 2 of 4

Data Management

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

Table including the data to be archived. The extensions entered in  the Condition field refer to this

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

MOC_DataManagement_only.docx

Version: 1.1.20792

Page 3 of 4

Data Management

PEP

PZE/PZW

ZKS

8.1/8.2

8.1/8.2

8.1/8.2

See here

See here

See here

MOC_DataManagement_only.docx

Version: 1.1.20792

Page 4 of 4

