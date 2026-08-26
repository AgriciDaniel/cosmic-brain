Manual

Data Transfer of Master Data
and Configurations
MW 3.0/MW 3.1/MW 4.0pe

Version 2.3

Last changed on: 19.06.2020

  Datenübernahme Stammdaten und Konfigurationen

Copyright

© Copyright 2020.© Copyright . All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 2 of 29

  Datenübernahme Stammdaten und Konfigurationen

Contents

1  Data transfer: master data and configurations ............................................. 4

1.1  General ............................................................................................................... 4

1.2  Requirements for the data transfer ...................................................................... 4

1.3  Procedure for data transfer .................................................................................. 4

1.4  Restrictions for data transfer ............................................................................... 5

1.5  Transferring data ................................................................................................. 5

1.5.1  Export configurations ............................................................................... 5

1.5.2

Import configurations ............................................................................... 6

2  Checklists for the data transfer .................................................................... 8

2.1  Checklist for the PZE/PZW/PEP data transfer ..................................................... 9

2.2  Checklist for the LLE data transfer .................................................................... 12

2.3  Checklist for the data transfer Workplace/machine or resources ....................... 14

2.4

17

2.5  Checklist for the CAQ data transfer ................................................................... 20

2.6  Checklist for the PDV data transfer ................................................................... 26

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 3 of 29

  Datenübernahme Stammdaten und Konfigurationen

1  Data transfer: master data and configurations

1.1  General

Version  or  release  upgrades,  the  introduction  of  products  or  similar  require  master  data  and

configurations to be transferred from one system (e.g. test or integration system) to another system (e.g.

the live system).

But data should not be transferred all at once. The consultant and customer have to decide which objects

they  want  to  transfer  and  which  not.  The  user  can  perform  the  data  transfer  with  the  aid  of  the  lists

outlined in this document.

1.2  Requirements for the data transfer

You must use the same product version for

- the system from which data is transferred and

- the system to which data is transferred.

1.3  Procedure for data transfer

A version or release upgrade is usually first carried out on a test system so that the changeover can be

tested  in  advance.  In  the  test  system,  make  the  configurations  that  may  not  be  available  until  the  new

version. You want to transfer these configurations from the test system to the production system after a

version or release upgrade.

It is necessary to be able to implement the transfer separately over  time. The data transfer is therefore

divided into two steps:

Exporting data

The export script unloads all relevant configurations from the source system into a shared directory.

Importing data

The import script selectively transfers this data to the target system. With each object, you are prompted

to decide whether or not you want to transfer the object. If you want to transfer objects, the data existing

in the corresponding table(s) of the target system is unloaded in a backup file and deleted from the tables.

Then the previously exported data is loaded.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 4 of 29

  Datenübernahme Stammdaten und Konfigurationen

1.4  Restrictions for data transfer

The following restrictions apply if you transfer data using the scripts described in this document:

  You can only transfer complete data of an objects. The data can consist of one or several tables. It

is  not  possible  to  transfer  single  entries  of  an  object  (for  example,  you  can  only  transfer  a  single  order

type "XY" or a single resource type).

  If  you  want to transfer configurations from a test system as part of a  version upgrade,  you should

note the following: all changes you made to the live system will get lost during the data transfer when you

upgrade the version. To avoid this, you have to replicate all changes you made to the live system also in

the test system to ensure these changes will be imported during the data transfer.

 Not all configurations in the system are exported and transferred to a target system using the scripts

described here. Configurations that are not transferred using these scripts must be transferred manually

to the target system.

 You cannot set up useful and extensive test systems for Access Control (ZKS) as this product group

depends  on  the  used  hardware  (access,  terminals,  and  readers).  Therefore,  we  do  not  recommend

transferring master data.

1.5  Transferring data

The  data  transfer  is  performed  with  two  scripts  named  <xxx>_export.scr  and  <xxx>_import.scr,  where

<xxx> is the name of the product group. The scripts are stored in the installation directory on the server.

The example of the PZE script illustrates how to use these scripts.

1.5.1  Export configurations

Use the following commands in the server installation directory to start exporting configurations:

Windows:

sh pze_export.scr

UNIX:

pze_export.scr

The export process unloads all relevant configurations of the product group (here PZE) into the directory

hycfgunl\pze.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 5 of 29

  Datenübernahme Stammdaten und Konfigurationen

You can check if an error occurred during the export in the error log hysql.err of the directory "err" in the

system directory. This file must not include current entries. The file would show the following entries if an

error occurred:

03.02.2020 10:08:31.959  -942 SQL=   select * from lohnarten_liste order by 1, 2;
03.02.2020 10:08:31.959  -942 ERR=ORA-00942: table or view does not exist

1.5.2

Import configurations

In  order  to  import  configurations,  copy  the  directory  hycfgunl  to  the  installation  directory  of  the  target

system. Then start the script to import data:

Windows:

sh pze_import.scr

UNIX:

pze_import.scr

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 6 of 29

  Datenübernahme Stammdaten und Konfigurationen

With each object, you are prompted to decide whether or not you want to transfer the object. Answer the

prompt by choosing "Y" for "yes" or "N" for "no":

XXXXXX  XXXXXXX XXXXXXX
  X    X X    X   X    X
  X    X     X    X
  X    X     X    X  X
  XXXXX     X     XXXX
  X        X      X  X
  X        X      X
  X       X    X  X    X
 XXXX    XXXXXXX XXXXXXX

  XXXXX  XX   XX XXXXXX    XXX   XXXXXX  XXXXXXX
    X     X   X   X    X  X   X   X    X X  X  X
    X     XX XX   X    X X     X  X    X    X
    X     XX XX   X    X X     X  X    X    X
    X     X X X   XXXXX  X     X  XXXXX     X
    X     X X X   X      X     X  X  X      X
    X     X   X   X      X     X  X  X      X
    X     X   X   X       X   X   X   X     X
  XXXXX  XXX XXX XXXX      XXX   XXX  XX   XXX

-------------------------------------------------------------------------------
 *** Loading PZE/PZW configurations
-------------------------------------------------------------------------------

-------------------------------------------------------------------------------
 *** Account limits (Kontogrenzen) (Y/N)
-------------------------------------------------------------------------------
N

-------------------------------------------------------------------------------
 *** PZE/PZW Public holidays (Feiertage) (Y/N)
-------------------------------------------------------------------------------
Y

19.11.2019 10:13:36 PROCESSING STDIN...

SQL> xunload to ./hycfgunl/pze/pze_feiertage.sav_unl select * from pze_feiertage order by 1, 2;
OK. NR OF ROWS 70.

SQL>
19.11.2019 10:13:36 PROCESSING STDIN...

SQL> delete from pze_feiertage;
OK. NR OF ROWS 70.

SQL>

19.11.2019 10:13:36 PROCESSING STDIN...

SQL> load from ./hycfgunl/pze/pze_feiertage.unl insert into pze_feiertage;
OK. NR OF ROWS 70.

SQL>
-------------------------------------------------------------------------------
...

You can check if an error occurred during the import in the error log hysql.err of the directory "err" in the

system directory. This file must not include current entries.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 7 of 29

  Datenübernahme Stammdaten und Konfigurationen

2  Checklists for the data transfer

This chapter deals with checklists you have to complete and return to Implementation Services.

The checklists of the single product groups sometimes include general objects (e.g. basic settings, users,

function  authorizations,  responsibility  areas).  You  only  have  to  check  these  objects  in  one  of  the

checklists if  you transfer configurations for multiple product groups. It goes  without saying  that the data

transfer  will  still  be  correct,  even  if  you  select  these  objects  in  multiple  lists.  Only  the  backup  copy  you

made before will be overwritten by the transferred data.

Special  notes  apply  to  specific  data  objects.  These  objects  are  highlighted  in  the  table  with  the  below-

described icons:

Further information

There  are  additional  information  about  the  object,  e.g.  which  data  is  included  or  which  configuration

applications are affected.

 Please note:

Additional  notes  apply  to  the  object.  Such  notes  indicate,  for  example,  that  transferring  MLE  variants

affects the entire system and not only the current product group.

The notes are added below the checklists.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 8 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.1  Checklist for the PZE/PZW/PEP data transfer

If  PZE/PZW  configurations  should  be  transferred,  the  following  checklist  must  be  completed  by  the

consultant and/or customer.

Script files:

pze_export.scr

pze_import.scr

Object

Transfer data

Yes

 No

Account limits

PZE/PZW public holidays

Periods for overtime calculation

Settlement periods

Breaks depending on working time

Clocking authorizations

Cost centers

Working time day types

Working time models

Shift rhythm models

Payment day types
Payment rules

Payment models

Payment depending on shift type

Wage types
Update accounts
Additional allowance rules
Wage types relations

Control of absences

Control of labor time calculation

Absence reasons

Wage type groups
Configuration of wage type statistics

Time sheet configuration

Configuration of message listings

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 9 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

Configuration of accounts

Configuration of leave entitlement

Configuration of HR master data fields

Configuration of data management for PZE/PZW tables

Scheduler jobs for PZE/PZW

Customization the PZW interface to the payroll system

(Customization for the PZW interface used in the payroll accounting)

Basic settings of Escalation Management

Function groups [Escalation Management]

(Function groups [Escalations Management])

Escalation configuration for PZE/PZW

(Escalation configuration for PZE/PZW)

Qualifications

Staff qualifications

Workforce requirements of workplaces

Terminal configuration for PZE terminals

Terminal groups

PZE 8.2: Configuration of terminal information

 User administration

Users
Function authorizations
Responsibility areas

 Wage types

Wage types also affect the product group Premium & Incentive Wages (LLE).

Time sheet configuration

Once you have transferred the  time sheet configuration, also copy the corresponding reports to

the  target  system.  These  are  the  files  PersonalTimeSheet_*.lul  in  the  system  directory

<x>\custom\reports located on the server.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 10 of 29

  Datenübernahme Stammdaten und Konfigurationen

Configuration of message listings

The message listings also affect the product group Premium & Incentive Wages (LLE).

Configuration of HR master data fields

Not  only  does  Personnel  Time  Management  use  the  configurable  HR  master  fields,  also  other

product groups require these fields to configure software modifications. You have to make sure that

all HR master fields have been configured in the source system.

Configuration of data management for PZE/PZW tables

Configurations for the product groups PZE/PZW are transferred.

Scheduler jobs for PZE/PZW

Configurations for the product key PZE are transferred.

Customizing the PZW interface to the payroll system

The INI configuration "HYD-LUG" is transferred.  No further INI configurations are adopted.

Basic settings of Escalation Management

These objects affect other product groups!

Function groups [Escalation Management]

These objects affect other product groups!

Escalation configuration for PZE/PZW

The data transfer is restricted to the PZE/PZW escalations.

Terminal configuration for PZE terminals

All terminals where PZE is enabled are transferred. These terminals are transferred completely, i.e.

also the settings for other product groups!

 Terminal groups

These objects affect other product groups!

 User administration

These objects affect other product groups!

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 11 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.2  Checklist for the LLE data transfer

If LLE configurations should be transferred, the following checklist must be completed by the consultant

and/or customer.

Script files:

lle_export.scr

lle_import.scr

Object

Transfer data

Yes

 No

Basic settings for incentive wages (LLE)

Bonus reasons

Wage type determination

Premium groups

Assignment of premium groups

Assignment of premium areas

Premium accounts

Configuration of data management for LLE tables

Scheduler jobs for LLE

User exits for LLE

Wage types

Configuration of message listings No. 900 to 950 for LLE

Configuration of HR master data fields

 User administration

Users
Function authorizations
Responsibility areas

 Premium accounts

Premium accounts are user field configurations. Only user field configurations relating to premium

accounts are transferred. Other user field configurations are not affected.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 12 of 29

  Datenübernahme Stammdaten und Konfigurationen

 Configuration of data management for LLE tables

Configuration for the product group LLE are transferred.

Scheduler jobs for LLE

Configurartion for the product key LLE are transferred.

 User exits for LLE

The  user  exits  of  the  LLE  product  group  are  transferred.  These  are  all  HYDRA  script  user  exits

starting  with  "hyl",  "lrck", "lpb", "lpv", "lsl",  "lsz"  or "lsv". User  exits having other  names will  not  be

transferred and remain unchanged in the target system.

 Wage types

Wage types also affect Personnel Time Management (PZW). Only wage types are transferred. The

following  objects  are  excluded:  "Update  accounts“,  "Additional  allowances  rules“and  "Wage  type

relations“.

Configuration of HR master data fields

Not  only  does  Personnel  Time  Management  use  the  configurable  HR  master  fields,  also  other

product groups require these fields to configure software modifications. You have to make sure that

all HR master fields have been configured in the source system.

 User administration

These objects affect other product groups!

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 13 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.3  Checklist for the data transfer Workplace/machine or

resources

Configurations for the product groups PZE/PZW are transferred.

Script files:

mde_export.scr

mde_import.scr

  In  order  to  import  Workplace/machine  (resources  of  type  MNR)  to  the  target  system,  NO

operations, NO persons, NO resources, NO batches must be logged in at the time of import.

 To import resources (type <>  MNR) into the target system, NO resources must be logged on at

the time of the import.

Object

Transfer data

Yes

 No

MDE master data

Shift models (BDE)

Year model

Day types

Days off

RPA/status class/status texts

RPA

Status classes

Status texts

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 14 of 29

  Datenübernahme Stammdaten und Konfigurationen

Transfer data

Yes

 No

Object

Workplace/machine configuration

Workplace configuration

Resource attributes

Status assignment

Resource status assignment

Counter configuration

Process parameters

Operator positions

Premium indicators

Compensation rules (EMG compensation rules; only for workplaces/machines)

Resource status types

Resource status text

Parallel resource status

Terminal assignment

Line assignment

Assignment of DNC family to machine

Groups

Group assignment (only workplaces/machines)

Activity/Maintenance/Calibration calendar (only workplaces/machines)

Production variants (only for entries in the workplace field)

The following data is only transferd if MDE and WRM master data is
transferred.

Resource list (assignment of data that have a higher level resource of resource type MNR)

Assignment of counter to machine

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 15 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

WRM master data

Resource attributes

Resource status assignment

 MDE master data

o

o

Shop floor monitor (graphic machinery)

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 16 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.4

Script files:

mf_export.scr

mf_import.scr

Object

Transfer data

Yes

 No

General customization data

Units
Units
Unit conversion
Formula management

User field configuration

HYD-INI configuration

Enhanced object configuration

Number ranges

Archiving configuration

Data management

Reload Manager

 Path configuration

Scheduler configuration
(not PZE, ZKS and LLE)

 Logging configuration

Logging keys

 Escalation configuration

Basic settings

General setup settings

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 17 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

Order customization data

 Order customization (order configurations)

Order types

Order status texts

Order status assignment

Processing codes

Grund

Order and operation statuses, customized data sources

MLE configuration

 MLE variants

MLE basic configuration
MLE segment configuration
MLE field configuration
MLE formulas / conditions
Formula management

 Distribution model

Logical systems
 Distribution model

 SAP Setup

SAP order sequencing
SAP upload
SAP activity types

Configuration of label printing

 User administration

Users

Function authorizations

Responsibility areas

Terminal BDE configurations

Terminal groups

HLS Customization data

HLS sorting rules

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 18 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

HLS planning profiles

HLS setup

MPL customization data

Transport units

Transport units

Material buffers

Material buffers

MPL setup

Dynamic dialogs

Dynamic dialogs

Only user 0 dialogs (user 0 dialogs) (CTWIN+AIP)
All dialogs

User field configuration

All  user  fields  including  user  field  keys  and  user  field  types  are  transferred.  Even  those

configurations not deriving from PDV are transferred.

 Escalation configuration

 SAP Setup

These objects affect other product groups!

 Terminal groups

These objects affect other product groups!

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 19 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.5  Checklist for the CAQ data transfer

Script files:

caq_export.scr

caq_import.scr

 MDE master data or transfer of WRM customization data

Object

Transfer data

Yes

 No

General customization data

Units
Units
Unit conversion
Formula management

User field configuration

INI configuration

Enhanced object configuration

Number ranges

Archiving of data management configurations

Data management objects

 Path configuration

 Scheduler configuration

 Logging configuration

Signature types

Signature matrix

 Escalation configuration

Escalation configuration
Function groups

 User administration

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 20 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

 User administration

Users
Function authorizations
Responsibility areas
Responsibility profiles
Assignment: User  Responsibility area
Function profiles
Password policies

Terminal CAQ configurations

Note:

The settings made in the "QM functions" tab are not transferred. You have to replicate

these settings manually in the live system. Usually, this only affects the option

"Inspector identification required before opening inspection dialog".

Not applicable
(see the note on the left-
hand side)

Order customization data

 Order customization (order configurations)

Order types
Order status assignment
Processing codes
Order status texts

MLE configuration

 MLE variants

MLE basic configuration
MLE segment configuration
MLE field configuration
MLE formulas / conditions
Formula management
MES types
MES conversion functions
Content of the table "caq_quails_vormerk”

 Distribution model

Logical systems
 Distribution model

 SAP Setup

SAP order sequencing
SAP upload
SAP activity types
Basic settings (order and operation number lengths, etc.)
SAP basic settings (SAP order and operation number lengths, etc.)

Data specific to CAQ

Options

Status types

Statuses

 Areas

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 21 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

 Forms

 Assignment of order types to CAQ areas

Catalog

Dynamic modification master data

Inspection severities (including all entries)
Transitional definitions including entries
Dynamic modification norms including AQL, inspection levels, methods, sampling plans

QM activity, machine status change

 Variable workplaces

Dynamic dialogs

Dynamic dialogs

Only user 0 dialogs (user 0 dialogs) (CTWIN+AIP)
All dialogs

Units

All units are transferred.  Even if these units are not used in CAQ applications are transferred.

User field configuration

All  user  fields  including  user  field  keys  and  user  field  types  are  transferred.  Even  those

configurations not deriving from CAQ are transferred.

 INI configuration

All INI configurations available in the system are transferred.

Enhanced object configuration

All  entries  of  the  enhanced  object  configuration  are  transferred.  Even  those  configurations  not

deriving from CAQ applications are transferred.

Number ranges

All number ranges available in the system are transferred. Even those number ranges not affecting

the CAQ  product group  are transferred. The  order  type  KAL and its corresponding number range

are relevant to CAQ PMV.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 22 of 29

  Datenübernahme Stammdaten und Konfigurationen

Archiving of data management configurations

All  archiving  configurations  from  the  data  management  table  of  the  product  groups  "CAQ"  and

"QMS" are transferred for all objects. The corresponding object configurations of data management

are transferred in addition to all transferred entries.

 Scheduler configuration

Only scheduler configurations with a product key not starting with PZE, ZKS or LLE are transferred.

 Path configuration

All  path  configurations  available  in  the  system  are  transferred.  Even  those  configurations  not

deriving  from  CAQ  are  transferred.  CAQ  requires,  for  example,  the  path  EFORMCUS  where

customized forms are stored.

 Logging configuration

All  logging  configurations  available  in  the  system  are  transferred.  Even  those  configurations  not

relating to CAQ applications are transferred.

 Signature types (authorization types)

All signature types and entries of the signature matrix available in the system are transferred. Even

those  configurations  not  relating  to  CAQ  applications  are  transferred.  -->  Currently,  not  used  in

CAQ.

 Escalation configuration

All  escalation  configurations  and  function  groups  available  in  the  system  are  transferred.  The

escalation setup is also exported and imported. Therefore, also configurations  not relating to CAQ

applications are transferred.

 User administration

All  users  available  in  the  system's  user  administration  are  transferred.  All  existing  function

authorizations,  responsibility  profiles,  responsibility  areas,  the  users'  assignments  to  responsibility

areas  and

functions  profiles  are

transferred.  Consequently,  even

those  users,

function

authorizations and responsibility profiles, etc. not connected to CAQ users will also be transferred.

 Order customization (order configurations)

All  order  types,  assignments  of  order  statuses,  processing  codes  and  order  status  texts  are

transferred. Even those configurations not relating to CAQ applications are transferred.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 23 of 29

  Datenübernahme Stammdaten und Konfigurationen

 MLE variants

The  following  is  transferred:  all  MLE  basic,  segment  and  field  configurations,  MLE  formulas  and

contents of formula management. MES types and MES conversion functions are also transferred.

In  contrast  to  the  MF  data  transfer,  the  contents  of  the  table  caq_quails_vormerk  are  also

transferred.  Consequently,  configurations/database  contents  not  relating  to  CAQ  applications  are

also transferred.

 Distribution model

All distribution models and logical system entries existing in the system are transferred. Even those

data records not relating to CAQ applications are transferred.

 SAP Setup

All  SAP  setup  settings  are  transferred  including:  "SAP  order  sequencing",  "SAP  uploads",  "SAP

activity types" and the basic parameter settings for the system and for the communication with SAP

(e.g.  order  and  operation  number  lengths,  etc.).  Even  those  settings  not  relating  to  CAQ

applications are transferred.

 Dynamic dialogs

All  dynamic  dialogs  pertaining  to  user  0  and  all  other  dialogs  relating  to  CTWIN  and  AIP  are

transferred.  Additionally,  all  fields  and  function  keys  relating  to  these  dynamic  dialogs  are

transferred. Workflow configurations are also transferred.

 CAQ options

All CAQ system options are transferred. CAQ system options manage fundamental functions and

processing of CAQ and PDV.

 Status types

All CAQ status types are transferred. They are the basis for statuses. You can use CAQ statuses to

adjust CAQ functions, to a certain extent, to your business processes.

Status

All CAQ statuses are transferred. You can use CAQ statuses to adjust CAQ functions, to a certain

extent, to your business processes.

 Areas

All CAQ areas are transferred. Areas define the functional fields and substructures CAQ is divided

into. Example: area F for production, area E for goods receipt.

 Forms

All CAQ forms are transferred. The forms include standard and customized Word reports.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 24 of 29

  Datenübernahme Stammdaten und Konfigurationen

 Assignment of order types to CAQ areas

Contents of the table ade_aart_cbereich are transferred. These contents are only relevant to CAQ.

This table specifies, for example, if the logon of an OP triggers the search for an active inspection

plan.

 Catalogs

All  SAP-QM  catalogs  are  transferred.  If  the  system  is  not  used  with  SAP-QM,  this  table  also

includes  the  usage  decisions  for  inspection  points.  These  decisions  are  required  for  inspections

relating to inspection points.

Dynamic modification master data

Table  contents  relating  to  inspection  severities,  transitional  definitions  and  dynamic  modification

norms are transferred. Their corresponding entries are also transferred (inspection severities of an

inspection  severity  definition,  transitional  definitions  of  a  transitional  definition,  sampling  plans  of

dynamic  modification  norms).  Contents  of  the  tables  relating  to  AQL  values,  inspection  methods

and inspection levels are also transferred.

Dynamic modification master data

Table  contents  relating  to  inspection  severities,  transitional  definitions  and  dynamic  modification

norms are transferred. Their corresponding entries are also transferred (inspection severities of an

inspection  severity  definition,  transitional  definitions  of  a  transitional  definition,  sampling  plans  of

dynamic  modification  norms).  Contents  of  the  tables  relating  to  AQL  values,  inspection  methods

and inspection levels are also transferred.

QM activity, machine status change

These entries are only relevant if you use the system as a QM subsystem, e.g. in connection with

SAP-QM.  These  entries  specify  with  respect  to  the  workstation,  whether  a  status  change  of  the

machine  where  an  inspection  step  is  logged  on,  is  to  trigger  an  activity  (due  inspection).  This

activity  relates  to  the  inspection  step  that  is  currently  logged  on.  The  generation  of  an  inspection

point could be such an activity.

 Variable workplaces

These entries are only relevant if you use the system as a QM subsystem, e.g. in connection  with

SAP-QM. Although inspection planning is performed in a higher-level system (e.g. SAP-QM), these

entries  address

inspection  planners.  The  entries

specify  which

inspections

(QM

operations/processes) are performed at which workstations.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 25 of 29

  Datenübernahme Stammdaten und Konfigurationen

2.6  Checklist for the PDV data transfer

If PDV configurations should be transferred, the following checklist must be completed by the consultant

and/or customer.

Script files:

pdv_export.scr

pdv_import.scr

 MDE master data or transfer of WRM customization data

If  you transfer data from the MDE master data or MDE/WRM customizing data, the scripts described in

2.3 Checklist for the data transfer of workplaces/machines or resources are product independent and can

be executed additionally.

Object

Transfer data

Yes

 No

General customization data

Units
Units
Unit conversion
Formula management

User field configuration

INI configuration

Number ranges

Terminal configuration

Archiving of data management configurations

Data management objects

 Path configuration

 Scheduler configuration

 Logging configuration

Logging keys

Signature types

Signature matrix

 Escalation configuration

Escalation configuration
Function groups

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 26 of 29

  Datenübernahme Stammdaten und Konfigurationen

Object

Transfer data

Yes

 No

 User administration

 User administration

Users
Function authorizations
Responsibility areas
Responsibility profiles
Assignment: User  Responsibility area
Function profiles
Password policies

Data specific to CAQ

Options

Status types

Statuses

 Areas

 Assignment of order types to CAQ areas

TNT configurations

TNT configurations

TNT header configuration

TNT column configuration

Data specific to PDV

Data specific to PDV

PDV settings

PDV settings

Units

All units are transferred. Even those units not used in PDV applications are transferred.

User field configuration

All  user  fields  including  user  field  keys  and  user  field  types  are  transferred.  Even  those

configurations not deriving from PDV are transferred.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 27 of 29

  Datenübernahme Stammdaten und Konfigurationen

 INI configuration

All INI configurations available in the system are transferred.

Number ranges

All number ranges available in the system are transferred. Even those number ranges not affecting

the PDV product group are transferred.

Archiving of data management configurations

All archiving configurations from the data management table of the product groups "CAQ" (for the

objects  "FEP",  "A_FEP")  and  "PDV72"  are  transferred  for  all  objects.  The  corresponding  object

configurations of data management are transferred in addition to all transferred entries.

 Scheduler configuration

Only scheduler configurations with a product key not starting with PZE, ZKS or LLE are transferred.

 Path configuration

All  path  configurations  available  in  the  system  are  transferred.  Even  those  configurations  not

deriving from PDV are transferred.

 Logging configuration

All  logging  configurations  available  in  the  system  are  transferred.  Even  those  configurations  not

relating to PDV applications are transferred.

 Signature types (authorization types)

All signature types and entries of the signature matrix available in the system are transferred. Even

those configurations not relating to PDV applications are transferred.

 Escalation configuration

All  escalation  configurations  and  function  groups  available  in  the  system  are  transferred.  The

escalation setup is also exported and imported. Therefore, also configurations not relating to PDV

applications are transferred.

 TNT configurations

Apart from the tables, all required configuration files are copied:





tntcfg_2<terminal number PCC>.xml

sqlldr_<table-id>.tpl

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 28 of 29

  Datenübernahme Stammdaten und Konfigurationen

 User administration

All  users  available  in  the  system's  user  administration  are  transferred.  All  existing  function

authorizations,  responsibility  profiles,  responsibility  areas,  the  users'  assignments  to  responsibility

areas  and

functions  profiles  are

transferred.  Consequently,  even

those  users,

function

authorizations and responsibility profiles, etc. not connected to PDV users will also be transferred.

 CAQ options

All CAQ system options are transferred. CAQ system options manage fundamental functions and

processing of CAQ and/or PDV.

 Status types

All CAQ status types are transferred. They are the basis for statuses. You can use CAQ statuses to

adjust CAQ functions, to a certain extent, to your business processes.

Status

All CAQ statuses are transferred. You can use CAQ statuses to adjust CAQ functions, to a certain

extent, to your business processes.

 Areas

All CAQ areas are transferred. Areas define the functional fields and substructures CAQ is divided

into. Example: area F for production, area E for goods receipt, PDV and PDAG for PDV.

 Assignment of order types to CAQ areas

Contents of the table ade_aart_cbereich are transferd. These contents are only relevant to CAQ.

Transfer_MasterData_Config.docx

Version: 2.3.21164

Page 29 of 29

