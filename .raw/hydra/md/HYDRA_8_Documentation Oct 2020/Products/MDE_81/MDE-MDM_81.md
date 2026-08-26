Manual

Machine Data Management
MDE-MDM 8.1

Version 1.0.8376

Last changed on: 19.06.2020

Machine Data Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-MDM_81.docx

Version: 1.0.18468

Page 2 of 82

Machine Data Management

Contents

1  Overview of Machine Data Management ..................................................... 4

2  Data Collection in HYDRA MDE .................................................................. 6

2.1  Summary ............................................................................................................. 6

3  HYDRA MDE Log Records .......................................................................... 7

4  Posting of Times .......................................................................................... 9

5  Posting of Quantities .................................................................................. 10

Entry in different quantity types and quantity accounts ................................................ 10

Automatic collection of quantities ................................................................................ 13

Quantity calculation and parallel make-to-order-production ......................................... 13

Manual collection of quantities .................................................................................... 15

Allocation with another quantity account ...................................................................... 16

Display of decimal places at the terminal ..................................................................... 16

6  Configuration of Workplaces and Resources ............................................. 18

7  Status Texts ............................................................................................... 54

8  Status Assignment ..................................................................................... 56

9  Setting Outputs Depending on Status and Posting Scenario .................... 65

10  Print Status List .......................................................................................... 67

11  Cycle Parameters ....................................................................................... 69

12  Counter Configuration ................................................................................ 71

13  Terminal Assignment ................................................................................. 75

14  Postings Relating to Workplaces/Machines ............................................... 78

MDE-MDM_81.docx

Version: 1.0.18468

Page 3 of 82

1  Overview of Machine Data Management

Machine Data Management

Summary

Purpose

Machine  data  management  provides  functions  that  make  it  possible  to  automatically  transfer  unit

quantities  and  machine  statuses  from  connected  machines  /  systems.  Depending  on  the  type  of

connection,  there  is  the  ability  to  monitor  the  scheduled  cycle  time  accounting  for  predefined  machine

tolerances.

If automatic transfer to certain machines is not possible, there is the option to establish a semi-automatic

connection to enter data manually.

A full range of configuration and plausibility checking functions make it possible to adapt precisely to each

machine and to control the data entry process.

Implementation considerations

You use machine data management if

  You  would  like  to  transfer  unit  quantities  and  statuses  that  were  provided  from  machines  and

systems into the system automatically.

  You  would  like  the  option  to  either  manually  enter  machine  statuses  as  they  occur  or  have  it

automatically entered with the support of the system.

Integration

Machine data management is integrated into numerous other system function packages:

  Detailed scheduling / shop floor scheduling

o  The  recorded  machine  statuses  are  visualized  on  line  in  shop  floor  scheduling  on  the

planning  board  so  that  the  scheduler  is  given  an  overview  of  the  current  production

situation.

o  Depending  on  the  system  configuration,  remaining  run  time  is  calculated  based  on  the

cycles or quantities recorded.

  Graphic machine park

o

In graphic machine park the recorded machine statuses and cycles / unit quantities are

visualized on line.

  Tool / resource management

o

In tool / resource management, maintenance can be triggered and scheduled based on

the numbers of units recorded.

MDE-MDM_81.docx

Version: 1.0.18468

Page 4 of 82

Machine Data Management

Features

  Machine management

o  Database configuration tables for workplaces and machines

o

Individual  configuration  of  up  to  9,999  states/  statuses  per  machine  or  workplace;

grouping of statuses into status hierarchies

o  Print function for creating a status list with barcode

o  Definition  of  status  classes  that  are  posted  to  the  machine  states  /  statuses  upon

occurrence

  Status recording

o  Manual recording of machine states/ statuses at BDE terminals

o  Extensive  plausibility checks (e.g. check whether setup status may be set if no order is

logged on)

o  Automatic recording of machine states/ statuses at BDE terminals

  Entry of quantities

o  Configuration  for  definition  of  logical  counter  inputs  for  the  automatic  recording  of

production figures

o  Automatic recording of production figures (cycles, yield and scrap) at BDE terminals

o  Manual recording of production figures (cycles, yield and scrap) at BDE terminals

  Machine monitoring

o  Monitoring of the scheduled cycle time accounting for predefined machine tolerances

o  Machine monitoring based on operating signals

o  Suppression of the production status despite active production signals (e.g. during setup

status)

o  Explanation for disturbances based on machine monitoring

  Posting:

o  Posting of machine status times to machine-related bookings (postings)

o  Posting of machine status times to status classes

  Posting maintenance

o  Display of machine-related log records (postings) generated based on entered data

o  The ability to edit and correct machine-related log records

MDE-MDM_81.docx

Version: 1.0.18468

Page 5 of 82

Machine Data Management

2  Data Collection in HYDRA MDE

2.1  Summary

The posting principle of HYDRA MDE corresponds to that of HYDRA BDE: once again the collection and

processing  of  dialogs  constitute  the  basis.  Processing  of  a  dialog  results  in  events  that  constitute  the

basis for the updating (calculation of statuses) and posting (generation of log records).

Dialogs

As input values of data collection - dialogs represent the system's interface with the shop floor.

Events are generated by resolving the dialog. The dialog is resolved into individual events based on

dialog data, the processing logic of the dialog (incl. configurations) and the application of the dialog

according to the context (posting status).

HYDRA MDE input dialogs are among other things:

Dialog

M_MST

M_SZY

M_TLG

M_AST

Meaning

Change (machine) status

Change target cycle (with monitoring based on
cycles)

Change partitioning/cavity

Cyclic status update is automatically generated
by the terminal; cannot be recorded manually

Events

Events  result  from  dissolving  dialogs  and  are  thus  the  result  of  the  input. Which  events  get  to  the

system at what times is an important point of controlling the software.

 Further, partly optional, input functions are:



logging of the dialog and the resulting events,

provision of the posting result,

  provision

of

current

information

in

the

form

of

lists

(e.g.  machine

lists),

  escalations (with M_MST).

MDE-MDM_81.docx

Version: 1.0.18468

Page 6 of 82

Machine Data Management

3  HYDRA MDE Log Records

General

HYDRA-MDE log records describe postings based on machines/workplaces. A HYDRA-MDE log record

is  an  evaluated  data  record  that  is  generated  due  to  posting  events.  An  MDE  log  record  documents

among other things:

  Period of time (beginning, end) for which the log record applies,

  Duration since the last status change,

  Created status,

  Resource performance account which the status is assigned to,

  Target cycle that was set when the status changed (end of log record),

  Partitioning that was set when the status changed (end of log record),

  The number of cycles that have been recorded within the period of the log record,

  Computed  quantities  for  meter  readings  that  have  been  recorded  within  the  period  of  the  log

record.

HYDRA-MDE log records do not have a direct relation to HYDRA-BDE log records. Thus, the period of an

MDE log record does not depend on HYDRA-BDE log records. In exceptional cases, there might even be

MDE  log  records  without  that  an  operation  was  logged  on  during  that  period  of  time  (and  as  a  result,

without generating HYDRA-BDE log records for it). Which MDE log record is generated at what point in

time  depends,  in  particular,  on  the  triggering  posting  event.  The  different  log  record  types  are

distinguished  by  their  record  type.  The  machine-related  record  types  that  are  described  in  the  sections

that follow are to be distinguished.

Record type P

General

A  log  record  of  the  record  type  P  is  generated  when  the  workplace/machine  status  is  changed.  It  has

been configured to be able to evaluate the period of time when a status occurred.

MDE-MDM_81.docx

Version: 1.0.18468

Page 7 of 82

Machine Data Management

Triggering events and dialogs

Events:

Machine status change (M_MST)

Dialog:

Machine status change (M_MST),

Special remarks

The  quantities  included  in  an  MDE  log  record  are  the  quantities  posted  in  this  period  of  time.  These

quantities  result  from  manual  quantity  postings  (partial  uploads  A_TR)  or  from  automatically  recorded

meter readings which might have been converted using conversion factors (partitioning, pulse factor).

The values in the "counter" fields do not include deltas, but quantities and cycles that have been added

up since the beginning of the shift. The delta quantities (as of HYDRA-MDE 7.2) are provided in separate

fields for evaluation purposes.

Record type N

General

A  log  record  of  the  record  type  N  is  generated  when  the  shift  ends  (automatic  shift  change,  requires  a

HYDRA-MDE machine). It has been configured to evaluate the period of time prior to the shift end when

the status already existed.

Triggering events and dialogs

Events:

Machine status change (M_MST)

Dialog:

End of shift (A_AAB)

Special remarks

The notes given for record type "P" also apply in this context.

MDE-MDM_81.docx

Version: 1.0.18468

Page 8 of 82

Machine Data Management

4  Posting of Times

The machine duration (or duration) is determined by  the time interval between two status changes. It is

synchronized with the shift calendar of the machine, and planned shift breaks are removed from the time

interval calculation.

Please note:

The determination of durations when status messages/postings are recorded online at the terminal (or via

PDM)  only  takes  into  account  a  limited  number  of  shifts.  This  relates  to  the  last  point  in  time  postings

were made for this machine.

However, durations might be missing or incorrect in MDE log records if no postings (status changes, shift

changes,  or  similar)  are  entered  for  a  machine  over  a  longer  period  of  time  (e.g.  the  terminal  is  shut

down).

Special features

The following configuration option may influence the above-mentioned posting of times/durations:

Post production time to main utilization time (MUT) during break

Cross-system configuration in the basic parameter settings of HYDRA.

 Waiting period processing, machine

Cross-system configuration in the basic parameter settings of HYDRA.

Automatic status change to status 999

Shift-related configuration at the HYDRA-BDE day type.

MDE-MDM_81.docx

Version: 1.0.18468

Page 9 of 82

Machine Data Management

5  Posting of Quantities

Entry in different quantity types and quantity accounts

Quantities can be recorded in different quantity types and quantity accounts at the machine.

The following quantity accounts are supported:

  Yield

  Scrap

  Rework

  Open quantity (problem quantity)

The following quantity types are supported per quantity account:

  Primary quantity

  Secondary quantity

  Tertiary quantity

  Base quantity

The automatic entry of quantities at the terminal always refers to the primary quantity.

Conversion in alternative quantity units

Alternative quantity accounts may be posted as follows:

  By direct (manual) entry

  By conversion

o  From other quantity types if manually collected

o  From the primary quantity if automatically collected

MDE-MDM_81.docx

Version: 1.0.18468

Page 10 of 82

Machine Data Management

Direct (manual) entry

If  a  quantity  is  directly  entered  (manually)  in  a  quantity  unit  of  a  quantity  type,  automatic

conversion will not take place.

Conversion from other quantity types

If  alternative  quantity  accounts  are  not  recorded,  values  will  be  converted  into  alternative

accounts based on conversion factors or quantity units configured within the MOC master data

of machines/workplaces.

In  general,  values  are  first  converted  into  the  base  quantity  unit  (unless  this  one  is  recorded

manually) and from the base quantity unit into the alternative unit (unless this one is recorded

manually).

Identical quantity units

If quantity units are identical they are converted using numerator and denominator in the master

data of machines/workplaces. If numerator and/or denominator = 0 quantities are taken over 1:1

without being converted.

Different quantity units

If quantity units are different, values  will be converted based on the below-mentioned order of

priorities:

  Conversion  by  means  of  numerator  and  denominator  within  master  data  of

machines/workplaces  (always  convert  into  base  quantity  unit  first,  then  into  the  alternative

unit); if numerator and/or denominator = 0

  Conversion using quantity unit formulas

No quantity units

If the quantity units of the machine are not assigned, no conversion will take place.

Conversion of quantity 0

A quantity 0 is generally not converted into alternative units, even if a value that is not  0 could

be calculated (e.g. by means of a formula).

MDE-MDM_81.docx

Version: 1.0.18468

Page 11 of 82

Machine Data Management

Quantity conversion of automatically collected quantities

- Fixed factors/values or values based on machines/workplaces (user fields);

- Data specific to operations such as length, width, weight per piece, etc.

may have some influence on the quantity conversion of automatically recorded quantities using

formulas.

As regards data specific to OPs, the operation that has been logged on for the longest time is

used. Consequently, the following (logical) restriction arises for operations that are logged on at

the same time when it comes to quantity conversion:

- operations must produce the same material;

- operations must have the same default data (length, width, weight per piece).

Any further requirements are to be taken into account in customer projects.

Basis for HYDRA-MDE quantity conversions

The  configuration  option  "basis  for  HYDRA-MDE  quantity  conversion"  of  the  configuration  of

workplaces/machines  dialog,  "configuration"  tab  >  quantities,  allows  using  the  configured

quantity  conversion  of  running  operations  even  for  the  machine.  This  enables  a  correct

calculation of quantities even if more than one operation is active :

M – conversion factors of the workplace (APZ) [default]

A – conversion factors of the OP if logged on, otherwise workplace

Please note

If  configuration  A  and  different  quantity  units  of  operations  are  in  use,  quantities  are

accumulated on machine accounts without taking the units into account.

Quantity  conversion  relating  to  HYDRA-MDE  based  on  data  specific  to  operations  or  values

based  on  machines/workplaces  (user  fields)  is  not  supported  in  the  maintenance  of  postings

function. In this case, the “convert quantities“ option should not be activated in the editing dialog

of the maintenance of postings function.

Display of alternative quantity units at the terminal

Only  Windows  terminals  allow  for  alternative  quantity  units  to  be  collected  (manually)  and

displayed (customizing required). However, it has to be taken into account that the terminal itself

does not perform any local conversion into alternative quantity units. Data is only displayed by

reloading data from the HYDRA server .

MDE-MDM_81.docx

Version: 1.0.18468

Page 12 of 82

Machine Data Management

Automatic collection of quantities

The counters are configured per machine. The following options are available:

  Posting as yield, scrap, rework, open quantity, no posting

  Posting as cycles (strokes)

  Allocation with partitioning and/or pulse factor

  Cycle monitoring

  Reason (e.g. scrap reason)

  Allocation with “quantity account"

e.g. deducting scrap from yield

 Quantities  resulting  from  automatically  recorded  counters  are  always  posted  as  primary

quantities.  The  conversion  into  other  quantity  types  is  described  in  the  previous  section.  The

HYDRA server sets off quantities against other quantity accounts (e.g. when the total quantity is

collected).

Counters that are configured with the "no posting" option do not post any quantity account. They

may be used to represent the following fields of application, among other things:

  Cycle monitoring only

  Cycle monitoring and posting as cycles (strokes)

  Posting as cycles (strokes) without cycle monitoring

Quantity calculation and parallel make-to-order-production

For  operations  that  are  logged  on  simultaneously,  quantities  are  posted  with  respect  to  the

order based on the respective specifications (partitioning, pulse factor) of the operation.

MDE-MDM_81.docx

Version: 1.0.18468

Page 13 of 82

Machine Data Management

All  quantity  accounts  that  are  recorded  automatically  are  determined  specifically  (yield,  scrap,

rework,  open  quantity).  Counter  pulses  or  quantities  resulting  from  this  are  generally  posted

onto all OPs that are logged on (according to the configuration: with activated partitioning/pulse

factor or not).

Specifications are determined as follows:

Partitioning/cavity

Partitioning for the machine: (TLG OP1 + TLG OP2 + TLG OPn) * TLG Machine

Partitioning for the operation: TLGOP * TLG Machine

If the  last  operation  is  interrupted  or  logged  off, partitioning  is  reset to 1 and multiplied  by  the

machine-specific partitioning.

Changing of partitioning at the terminal

If  the  partitioning  is  changed,  the  partitioning  for  the  machine  as  well  as  for  the  operation,  for

which partitioning was changed, will be changed/updated as well.

Pulse factor

Pulse  factor  for  the  machine  =  minimum(IMPFAKTOP1,  IMPFAKTOP2,…  IMPFAKTOPn)  *

IMPFAKTMachine

Pulse

factor

for

the  OP  =  minimum(IMPFAKTOP1,

IMPFAKTOP2,…

IMPFAKTOPn)  *

IMPFAKTMachine

Please note:

The  same  pulse  factor  applies  for  all  active  operations.  Therefore,  it  should  be  ensured  that

parallel operations get the same default pulse factor. This means only  one pulse factor that is

specific to operations is taken into account when quantities are calculated.

MDE-MDM_81.docx

Version: 1.0.18468

Page 14 of 82

Machine Data Management

Quantity calculation on the basis of partitioning or pulse factor

Quantity for the machine = pulse * partitioning for the machine / pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation / pulse factor for the operation

Please note:

In  terms  of  figures,  a  pulse  factor  is  regarded  as  fraction.  Thus,  the  pulse  is  used  as  the

denominator for the calculation of quantities, while the partitioning is regarded as the numerator.

Display at the terminal

The factor from

partitioning for the machine / pulse factor for the machine

that is relevant for quantity calculation of the machine is displayed in the partitioning field at the

terminal.

As described beforehand, the different default values of the machine (such as machine-specific

partitioning) and of active OPs have some influence on this factor.

The respectively current target cycle (without consideration of the cycle extension) is displayed

in the target cycle field at the terminal. This is max(SZYOP1..n) for OPs that are logged on at the

same time.

Output of target quantity reached

The target quantity output of the machine interface, e.g. for activating the target quantity lamp is

set as soon as the least target quantity of a registered order has been reached. In case the OP

with the least target quantity is interrupted or finished, the next OP with the least target quantity

is used.

Manual collection of quantities

Manually recorded quantities may additionally be posted with the following configurations:

  Set quantity (accounts) against other quantity accounts

e.g. deducting manually recorded scrap from yield

  Post manual quantities as cycles

MDE-MDM_81.docx

Version: 1.0.18468

Page 15 of 82

Machine Data Management

Allocation with another quantity account

Automatically  as  well  as  manually  recorded  quantities  may  additionally  be  set  off  against

another quantity account, for example, the manually recorded scrap can be deducted from yield.

The “allocation with” option is configured for:

  automatically recorded quantities within the counter configuration

  manually recorded quantities within the machine configuration

Using these options may lead to postings (HYDRA-BDE log records, HYDRA-MDE log records)

with negative quantities or even to negative order quantities.

Display of decimal places at the terminal

Respective  configurations  are  to  be  enabled  to  calculate  or  display  quantities  with  decimal

places.

Windows terminal configuration

Settings in ctwin.ini / ctaip.ini:

[MSS-INIT]
NACHKOMMA=3

If the NACHKOMMA parameter is not available in [MSS-INIT] HYDRA-MDE
works with the setting 0.

Settings in ctwinlay.ini / ctaiplay.ini:

[main]
nachkommastellen=2

<- for machine overview display

DOS terminal configuration

Settings in ctdos.ini

[system]
NachkommastellenIntern=8
NachkommastellenExtern=0

<- Default
<- Default

MDE-MDM_81.docx

Version: 1.0.18468

Page 16 of 82

Machine Data Management

MDE-MDM_81.docx

Version: 1.0.18468

Page 17 of 82

Machine Data Management

6  Configuration of Workplaces and Resources

Overview

Menu

Master data  Resources  Resource configuration

Master data --> Workplaces/ Machines --> Workplace configuration

Transaction code

res

Function authorization  mdres

mdresgenh for fields in connection with Test Equipment Management

The resource configuration is the central function for resource management in MES.

Purpose

The master data for both workplaces and machines as well as for other resources (tools, DNC resources,

etc.)  are  managed  here.  Resources  are  roughly  classified  according  to  the  resource  type.  This  type  is

also connected  with corresponding functions and  applications that  open  other functional components of

the MES especially designed for the respective type.

Integration

Use this application to view the resource information of all resource types available in HYDRA. However,

the editing of data records depends on the resource  type. In this  way, depending on the resource type,

you cannot edit all fields or create and delete all resources.

Based on the resource type, other applications are present in the MES that are specially customized for

these types. For  example,  the  application package of machine data collection is based on resources of

type "Machine".

In addition to the resource configuration, the "resource overview" application  is available, which does not

permit data maintenance, but does enable administration operations for daily handling of resources such

as the stock transfer of a resource.

Requirements

Create a year model/ shift calendar prior to creating a workplace or machine. To use the various resource

types in a meaningful way, purchase the advanced licenses for these types.

Selection criteria

The application provides the following selection criteria:

MDE-MDM_81.docx

Version: 1.0.18468

Page 18 of 82

Machine Data Management

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of the resource.

Workplaces  and  machines  always  have  the  resource  type  MNR.  But  you  can  assign  individual

resource types to the other resources by configuration. Predefined resource types include:

DNC

NC-/ DNC program

DOC

Document

ENE

Energy meter

ENT

Extraction device

ENT

Extraction device

MNR  Workplace/ Machine

PAC

Packaging, transportation container

PRM

Test and measuring equipment

PER

Production staff / general

PRU

Setup staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

We recommend using the predefined resource types.

The system adjusts the displayed detail resource information depending on the resource

selected in the table overview.

Name

Name of the resource.

Group

Workplace/ Machine group of the resource. Only relevant for resources of type MNR.

Cost center

Cost center of the resource.

Short name

Short name of the resource

MDE-MDM_81.docx

Version: 1.0.18468

Page 19 of 82

Machine Data Management

Resource family

Family to which the resource is assigned.

Responsibility area

Responsibility area to which the resource is assigned.

Storage location

Regular storage location of the resource.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

This detail application includes four main tabs:

-  Resource configuration

-  Resource list

-  Resource attributes

-  DNC versions

"Resource configuration" tab

Here define the configurations and master data of the resources.

"General" tab

Resource type

Resource  type  of  the  resource. When  the  HYDRA  system  is  delivered,  some  resource  types  are

predefined. Create additional resource types in the application Resource types.

Resource

Enter the number of the resource or workplace to be collected in this field.

The maximum number of places allowed for this number is as follows and depends on the resource

type:

-  Resources of type MNR: maximum of 8 places

-  Resources of type <> MNR: maximum of 20 places

Permitted  characters  include  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/_.-+#.  Do  not

use spaces and other special characters. For technical reasons,  you can enter * (asterisk) and %

(percent), but they are nonetheless not permitted because they are not valid characters. When you

exit the input field, the system automatically converts lower case letters into CAPITAL LETTERS.

MDE-MDM_81.docx

Version: 1.0.18468

Page 20 of 82

Machine Data Management

Please note for workplaces/ machines (resource type MNR):

For technical reasons, the system does not check the maximum number of  characters allowed for

resources of the type MNR. For this reason, make sure that the length of the resource number (=

workplace/ machine number) does not exceed 8 characters.

Please note: You can only enter 8 characters in the GUI, if you set the resource type MNR before

entering the resource ID (machine number).

If you selected the option "numeric machine number" (HYDRA basic parameter settings) for use on

DOS  terminals,  ensure  that  the  resource  number  (=  workplace/  machine  number)  includes  only

numerical digits and that the length of the number is exactly 8 places. If necessary, when creating

the workplace/ machine, add zeros to the beginning of the number to extend it to 8 digits.

Short name

Short name of the resource. Only use this field  with  workplaces/ machines (resources of the type

MNR).

Name

This  field  is  used  to  assign  a  short,  unique  name  for  each  resource.  This  name  is  displayed  in

reports and overviews and in the terminal and it is useful for orientation.

Responsibility area

Responsibility areas are used such that in various evaluations, the user is only shown the data to

which he/she has access according to his/her responsibility area authorization.

The  responsibility  area  can  also  remain  empty.  In  this  case,  the  resource  is  always  displayed

regardless of the user's assigned responsibility authorizations.

If  the  responsibility  area  is  left  empty,  the  system  automatically  enters  the  value  "--

DEFAULT--" in the field. Resources including this value are always displayed regardless

of the user's assigned responsibility authorizations.

Cost center

The cost center to which the resource belongs is entered in this field.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information functioning as a comment.

Acquisition date, acquisition costs

Additional information functioning as a comment.

Configure the currency for the entire system in the HYDRA basic parameter settings.

Storage location

Location where the resource is stored when it is not being used (original storage location).

In connection with the Material and Production Logistics module (MPL), specify a material buffer in

this  field.  If  you  log  on  an  input  batch,  the  logged  on  input  batch(es)  will  be  reposted  from  the

previous material buffer to the material buffer specified in this field (upstream of the machine).

MDE-MDM_81.docx

Version: 1.0.18468

Page 21 of 82

Machine Data Management

Delivery date, start-up date, guaranty date

Additional information functioning as a comment. These fields are only available if Test Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

External designation, resource type designation, usage, purchase order number

Additional information functioning as a comment. These fields are only available if Test Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Supplier and party in charge including detail fields

Additional information functioning as a comment. These fields are only available if Test Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

"Workplace configuration" tab

This tab is only available if you select a resource of the type "MNR".

Workplace master data

Workplace category

N  Machine

P   Workplace

Defined as machine or workplace. As regards processing, both of these categories are identical if

only BDE or MDE and PDV are in use.

J   Machining center (BDE-BEA only)

The "Machining center" category and its functionality are described in detail in the BDE-BEA

product documentation.

L

Line (MDE-SFL only)

A   Aggregate (MDE-SFL only)

The categories "Aggregate" and "Line" and their functions are described in detail in the MDE-SFL

product documentation.

Q  CAQ inspection station

Workplace is defined purely as a CAQ inspection station without affecting the BDE or MDE

statistics.

R   Reel-based manufacturing (MPL-RF only)

S   Cutting unit (MPL-RF only)

The categories "Reel-based manufacturing" and "Cutting unit" and their functions are described in

detail in the MPL-RF product documentation.

D  Parallel output batches (MPL only, starting with MPL 7.2)

Produce parallel output batches on the machine for an operation subject to batch management.

MDE-MDM_81.docx

Version: 1.0.18468

Page 22 of 82

Machine Data Management

C  Packing station (MPL-PAL only, starting with MPL 7.2)

Use specific posting functions on the machine to represent a packing station. The functions are

described in detail in the MPL-PAL product documentation.

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

Workplace type

E  Single workplace

G  Group workplace

Please note

Terminals can be assigned to both group and single workplaces. However, in this case make sure

that  the  terminal  is  set  to  operation  mode  "BDE"  or  the  option  Processing  is  set  to  "BDE

processing" when assigning workplaces to terminals.

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Blocked

If this identifier is set, the machine/ workplace has been (logically) deleted. In this case, the system

does no longer permit the following modifications:

- Order postings on the terminal

- Order posting in the MOC (e.g. using the "order overview" function)

- Modifications to the event maintenance

Furthermore, the graphic planning board of the HYDRA Shop Floor Scheduling module (HLS) does

no longer show the machine/ workplace .

Company

This  field  differentiates  the  individual  machines/  workplaces.  It  also  functions  as  report/evaluation

option in the system.

Group

Assignment of the workplace/ machine to a logical group. In the context of the planning this has to

do with a capacity group in which the primary capacities are summarized.

If  you  create  a  new  workplace,  it  is  automatically  assigned  to  a  group  of  the  same  name  (menu

BDE: Master data > Workplaces/machines > Groups), which is defined as a capacity group. If there

is no capacity  group  yet, then the system automatically creates a capacity group and  assigns the

workplace automatically.

Category

Enter the category of the machine. By means of this, you can enable a validation check according

to the  BDE configuration:  Master data > Order configuration > Order types, validation tab, Option

"Check specification in backlog of orders" (value category).

MDE-MDM_81.docx

Version: 1.0.18468

Page 23 of 82

Machine Data Management

Year model

Enter a valid year model. During entry, times to be posted are compared with this shift model. If no

planned  year  model  is  stored  in  the  HLS  tab,  the  shift  model  entered  here  is  also  used  in  the

HYDRA Shop Floor Scheduling module (HLS).

Standard rate machine

Here  enter  the  arithmetical  standard  rate  of  machines  for  calculations.  The  HYDRA  Shop  Floor

Scheduling module (HLS) uses this value for some (evaluated) KPIs.

Standard labor rate

Here enter the arithmetical standard labor rate for calculations. The HYDRA Shop Floor Scheduling

module (HLS) uses this value for the KPI "Evaluated labor utilization".

Performance level

Enter  the  performance  level  of  the  workplace/  machine  in  percent  in  this  field.  This  value  is

integrated  in  the  HYDRA  Shop  Floor  Scheduling  and  in  the  evaluation  of  material  requirements

when calculating the remaining run time.

Incentive wages indicator

Defines  the  type  of  calculating  incentive  wages.  Mostly,  this  option  is  used  together  with  the

incentive  wages  based  on  formulas  for  customer-specific  configurations.  In  addition,  use  the

"incentive wage indicator" as selection criterion for the  identification of wage types in the incentive

wage determination.

Leave this field empty, if you do not use the incentive wages module.

The

incentive  wages

indicator  G=group  calculation  has  a  special  meaning.

If

the

workplace/machine  has  this  option,  you  have  to  assign  a  premium  group  every  time  an  order  is

logged

on.

You

can

do

this

either

via

-  the  "assignment  of  premium  groups"  option  of  the  incentive  wages  module  or,  optionally,  via

- an additional field in the terminal dialog for the logon of orders. If no assignment is available, the

system rejects the logon of the order by issuing a validation error.

Therefore,  you  may  only  assign  the  incentive  wage  indicator  G  =  Group  calculation,  if  the

group  premium  conditions  are  met  in  the  incentive  wages  determination,  as  otherwise

orders can no longer be logged on!

The  meaning  of  the  other  incentive  wages  indicators  is  specified  according  to  the  customer's

requirements while customizing the system.

File

You can assign a graphic to each machine/workplace. Among other uses, the graphic is displayed

in  the  workplace  overview  or  in  the  AIP.  The  following  image  formats  are  supported:  jpg,  gif,  tif,

bmp, ico, emf, wmf.

MDE-MDM_81.docx

Version: 1.0.18468

Page 24 of 82

Machine Data Management

In

the  path  configuration,  configure

the  path  using

the  PATH

identification

"MOCWPIMG"; the length of the file name for graphics files is limited to 12 places (8.3

notation). Note for Unix installations: use lower case letters only for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, define the maximum capacity in KG here.

Accuracy class, unit, etc.

  Information  fields  in  order  to  describe  the  accuracy.  These  fields  are  only  available  if  Test

Equipment  Management  (PMV-PPK  or  PMV-SVP)  is  licensed  and  the  right  "mdresgenh"  is

assigned.

Entry

Display 3rd list

Use  the  options  described  here  to  show/enable  a  third  list  in  the  basic  screen  of  a  Windows

terminal  (CTWIN  /  AIP).  Switch  between  the  respective  lists  on  the  terminal  depending  on  the

options set. The following settings are possible. Please note that the contents displayed in the lists

depend on the module in use:

 Input material (MPL): shows logged on input materials/ batches.

 Resources (WRM): shows logged on resources and tools.

 Staff (BDE): shows logged on staff.

Output material (MPL): shows produced output batches.

Show material/ PRT list when OP is logged on

This option is only relevant in connection with the WRM module and the resources logged on to the

Windows terminals (CTWIN / AIP).

If  this  option  is  set  and  you  log  on  an  OP,  a  specific  login  dialog  opens  at  the  AIP  terminal.  This

dialog includes a list of components/production resources and tools. This list shows resources that

meet

at

least

one

of

the

following

requirements:

-

the

option

"posting

to

terminal"

is

set

in

the

resource

type;

- the option "log on with OP" is set to "explicit logon" for the resource.- the resource is a so-called

"required resource" (option of the resource).

Please note: As long as the workplace is relevant for MPL, the list also shows material components.

Sequencing list

This  option  defines  which  operations  are  displayed  in  the  sequencing  list  on  the  terminal.  The

following settings are available:

S

Basic  setting.  The  system  takes  the  value  from  the  option  of  the  same  name  in  the

HYDRA basic settings.

MDE-MDM_81.docx

Version: 1.0.18468

Page 25 of 82

Machine Data Management

M

Pool  of  workplaces.  The  sequencing  list  of  the  terminal  only  shows  the  operations

planned for the workplace.

G

Pool of workplaces and groups. The sequencing list of the terminal either shows

operations that are:

- planned for the current workplace or

- for another workplace of the group or

- that are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  The  sequencing  list  of  the  terminal  only  shows

those operations that are planned for workplaces of the category.

H

Group control. The sequencing list of the terminal shows the operations that are either

planned for the current workplace or for another workplace in the group.

Number of OPs in sequencing list

Here, define the maximum number of operations that are to be displayed in the sequencing list on

the terminal. Enter 0 if you want to show all operations.

Compulsory sequence

Use  this  option  to  specify  whether  or  not  logging  the  OPs  on  in  the  planned  sequence  is

compulsory. The following parameters are permitted:

N

J

Disabled

Enabled/active

If the parameter is "enabled" when  you log on an OP, the system checks as to whether the order

backlog for this machine/ workplace includes an OP that is planned for the same time or previous to

this  OP  in  the  sequence,  but  was  not  yet  started  (i.e.  status    =  V/prepared).  If  yes,  the  system

rejects the logon of this OP.

Please note: If you use the order sequencing option (menu ADE: Planning > Order sequencing) for

planning  in  HYDRA  and  configure  the  sequencing  list  with  any  other  option  than  "M"  (pool  of

workplaces) and enable the compulsory sequence, this might lead to a combination that does not

make

Please note for the sequencing list:

sense.



If the sequencing list includes operations that are in the status "interrupted", you can log on

these OPs at any time, irrespective of the specified compulsory sequence.

Dialog control

To meet this requirement, define a dialog control that deviates from the standard behavior for the

workplace in the dynamic dialog configuration of the Windows terminal (CTWIN / AIP). Then refer to

the dialog control in the dialog.

Use  this  configuration  only  as  part  of  customizing  the  HYDRA  system.  Otherwise  it  has  no

significance.

MDE-MDM_81.docx

Version: 1.0.18468

Page 26 of 82

Machine Data Management

Logon of several OPs

Select this option, if several different operations should be processed on the machine. Otherwise,

the system only allows one operation to be logged on to the machine.

Possible values:

J

Log on as many OPs as required at the same time.

Please note: The system allows a  maximum of 20 operations to be logged on

simultaneously  to  a  machine  to  which  a  terminal  with  operation  mode  MDE  is

assigned.  If  more  than  20  operations  must  be  logged  on  at  the  same  time,

MPDV  must  review  the  conditions  in  order  to  remove  the  limitation.  If  MPDV

agrees  to  lift  the  limitation,  you  can  do  so,  otherwise  search  for  alternative

solutions. MPDV analyzes the conditions as part of a service.

N

Log on only 1 OP.

1...9

Log on a maximum of n OPs.

Posting

Quantity posting to staff

Use this function to post the quantity of order interruptions/ logoffs to the person who is logged on

for the longest period.

Detailed information about quantity posting to staff can be found here.

Posting on OPs that are not logged on

Use  this  option  if  you  want  to  post  quantities  (interrupted  OP,  finished  OP,  reporting  partial

quantities) even for operations that are not logged on.

If  you  record  quantities  for  an  operation  that  is  not  logged  on,  the  system  posts  these

quantities  onto  the  operation  in  the  BDE  module.  The  MDE  module  does  not  post  the

quantities.

If you want to use this function with the AIP terminal, the BDE posting dialogs that are installed by

default require the following:

- use the simplified BDE posting dialogs (the so-called "simple dialogs") or

- customize the dialogs.

Then you will be able to enter an operation that is not logged on.

Posting the machine time in connection with operations logged on simultaneously

Use this option to post the machine time for OPs that are logged on simultaneously as a proportion

on the operations and staff:

J

Posts  the  machine  time  proportionately  on  OP  and  person  according  to  the
number of OPs

MDE-MDM_81.docx

Version: 1.0.18468

Page 27 of 82

Machine Data Management

N

V

Z

No proportionate posting. If the option is not set, every  operation receives the
complete machine time.

According to the default quantity of the OPs. Make sure that the default quantity
(target quantity in primary quantity unit) of the operation > 0.

According  to  the  standard  time  of  the  OPs  (available  starting  with  ADE  7.3).
Here, ensure that the standard time (processing time) in the operation

> 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces;  in  general,  do  not  use  this  option  for  group

workplaces.

Automatic logoff of personnel when shift ends

This option is only relevant, if you set an "X" for the option of the same name in the order type.

Use this option to configure the personnel-related data collection at MDE workplaces. Because fully

automatic  shift  ends  are  generated  by  the  terminals  when  using  the  HYDRA  MDE,  you  can

configure

here

if

- the staff logged on to the workplace should be logged off automatically at the end of the shift or

- if they should remain logged on.

J

N

X

Always log off staff when the shift ends

Always save staff when the shift ends except for manual logoff

Evaluate the person's settings. The system searches for the corresponding setting

of the person .

Automatic OP posting when shift ends

This identifier is only relevant, if you set an "X" for the option of the same name in the order type.

Interrupt and log on again at beginning of shift

Interrupt

J

N

MPL

Further  information  about  the  HYDRA  module  MPL  can  be  found  in  the  corresponding  MPL

documentation.

MDE-MDM_81.docx

Version: 1.0.18468

Page 28 of 82

Machine Data Management

Batch management

Activates the entry of the batch number for this machine within the posting dialogs on the terminal.

Possible values are:

N

L

D

J

No batch processing

Batch tracing (input/ output batches) in the context of HYDRA MPL/MPL-RF

Throughput batch processing in the context of HYDRA MPL/MPL-RF

BDE batch management

The following functions are only available in connection with the Material and production logistics

module and are supported only on the Windows-based terminals (CTWIN / AIP).

Preceding material buffer

Irrelevant.

Subsequent material buffer

If you specify a material buffer in this field, the field Target buffer in each of the entry dialogs (e.g.

output batch change, log off operation) is automatically populated with this value.

If you do not enter a material buffer in the input dialog (e.g. delete from the input field), the system

automatically  posts  the  output  batch  to  the  material  buffer  specified  in  the  "subsequent  material

buffer" field.

Automatic generation of batch number

If you set this option, the system automatically generates a batch number for the output batch to be

produced. Otherwise, the system expects you to enter the batch number for the new output batch

to be produced, when you log on an operation or change the output batch.

Please note: If, in the field Batch management you set the option D (= Throughput batch recording),

the system automatically sets the value for the Automatic generation of batch number to "J". In this

case, you cannot enter the batch number manually.

Consumption balance

When  you  log  off  an  OP,  the  system  opens  an  additional  dialog  (V_BLZ)  displaying  the  material

components  and  their  consumption  quantities  in  relation  to  the  OP  that  is  currently  logged  on.  In

this  dialog,  you  can  also  log  off  input  batches  that  are  still  running.  This  option  is  only  activated,

once you have enabled the consumption balance for the material type of the output material.

Generate transport order for output batches

This option creates a transport order relating to batches for a generated output batch. The transport

starts from the material buffer where the output batch is included. The configurations of the material

type override the corresponding options of the resource configuration.

MDE-MDM_81.docx

Version: 1.0.18468

Page 29 of 82

Machine Data Management

Generate transport order for input material

This  option  creates  an  article-related  transport  order  relating  to  a  material  component,  when  you

plan an operation for a machine via the Shop Floor Scheduling module. Transport starts from the

output material buffer of the preceding operation. The configurations of the material  type  override

the corresponding options of the resource configuration.

HLS

Find further information about the HYDRA module HLS in the corresponding HLS documentation.

Planning function

This identifier specifies whether a workplace or a machine will be displayed and if so, in which MOC

planning function.

P

H

T

A

N

Planning in the graphic planning board of the HYDRA Shop Floor Scheduling (HLS) or in
the graphic order sequencing (GAV), i.e. plan the  workplace via the HLS or the  graphic
order sequencing. Therefore, the HLS module or the graphic order sequencing also show
this workplace but this workplace is not visible in the tabular order sequencing (AVG).

Please  note:  If  the  HLS  module  or  the  graphic  order  sequencing  actually  show  the
workplace also depends on additional settings:
- the workplace must be assigned to a group identified as a "capacity group"
-  you  must  have
- you must have selected the corresponding planning profile

responsibility  area  authorization

this  workplace

the

for

Only relevant, if you use the HYDRA Shop Floor Scheduling (HLS).

Like P.

Reserved.

Planning  in  the  order  sequencing  table  (AVG),  i.e.  plan  the  workplace  via  the  AVG
module.

No  planning;  the  order  sequencing  table  (AVG),  the  graphic  order  sequencing  and  the
HLS module do not show the workplace.

Planned year model

Enter  a  special  year  model  used  only  for  planning  in  the  HYDRA  Shop  Floor  Scheduling  (HLS)

module. This year model does not affect data collection and posting in the ADE/MDE module. If you

do not define a planned year model, then the system uses the BDE year model (Master data tab)

for the planning.

Availability

Define the available capacity of a workplace/machine. The default value for the available capacity is

1000 [per mill].

MDE-MDM_81.docx

Version: 1.0.18468

Page 30 of 82

Machine Data Management

In the HYDRA Shop Floor Scheduling, the capacity check and automatic assignment assume that

each operation has a capacity requirement of 1000 [per mill], i.e. exactly one operation can run on

the  workplace/machine  at  a  time.  In  case  of  a  manual  multiple  assignment,  a  dialog  informs  you

about  the  double  assignment.  If  you  use  the  automatic  assignment,  multiple  assignments  are

generally not feasible.

Use  this  setting  to  extend  the  availability  of  the  workplace  such  that  a  multiple  assignment  is

permitted. If the workplace capacity allows, for example, processing of two operations at the same

time, set the available capacity to 2000 [per mill] in this field.

If nothing is entered in this field or if you enter the value 0, the system interprets this as the default

value of 1000 [per mill].

This functions requires a corresponding license.

Check personnel availability

Choose from the following options:

  Check if at least one person is planned

  Check personnel availability

  Check personnel availability and qualification

If  you  select  one  of  the  above-mentioned  options,  the  system  checks  if  staff  is  planned  in  the

application  Workplace  assignment  at  the  time  when  you  plan  operations  in  the  graphic  planning.

Find further information on personnel capacities in Graphic Planning here.

This option is only available if the modification hls_pep_qualification is enabled.

"Quantities" tab

This tab is only available if you select a resource of the type "MNR".

Conversion factors for base quantity

Enter the quantities in various quantity types and accounts at the machine or workplace. In general, the

system supports the following quantity accounts:

Yield

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

MDE-MDM_81.docx

Version: 1.0.18468

Page 31 of 82

Machine Data Management

Each quantity account supports the following quantity types:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The system design specifies the use of several quantity types or accounts. For example: If you  want to

enter  the  rework  quantity  manually,  a  corresponding  input  field  must  be  configured  in  the  input  dialog

(customization).

Use the quantity type "primary quantity" if you want to collect quantities automatically.

Quantity units and conversion factors for base quantity

Define a quantity unit for each quantity type. You can enter data directly (i.e. manually) in the alternative

quantity accounts. If this is the case, the system does not convert quantities automatically.

If you do not enter data manually in the alternative quantity accounts, the server converts the quantities

into the alternative accounts based on:

- the conversion factors or

- the units that are configured in the MOC machine master data:

Basis for HYDRA-MDE quantity conversion

Define the basis for the quantity conversion.

A

Use the conversion factors of the OP that is logged on. If no operation is logged on,

the  system  uses  the  quantity  conversion  stated  in  the  machine/workplace

configuration.

M

Use  conversion

factors

from

the  workplace  configuration

for

the  quantity

conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate  the  quantity  unit  you  want  to  use  for  data  collection  at  this  machine/  workplace.  If  you

collect quantities automatically, these quantities are generally primary quantities.

If  you  want  to  convert  quantities  automatically  into  another  quantity  type,  indicate  the  conversion

factors for the base quantity here.

MDE-MDM_81.docx

Version: 1.0.18468

Page 32 of 82

Machine Data Management

Units and conversion factors for base quantity (S)

Quantity unit (S)

Indicate  the  secondary  quantity  unit  you  want  to  use  for  posting  the  quantities  to  the  workplace/

machine.  If  you  want  to  convert  quantities  automatically,  indicate  the  conversion  factors  for  the

base quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Indicate the tertiary quantity unit you want to use for posting quantities to the workplace/ machine. If

you  want  to  convert  quantities  automatically,  indicate  the  conversion  factors for  the  base  quantity

here.

Units and conversion factors for base quantity

Quantity unit (B)

Indicate the base quantity unit you want to use for posting quantities to the workplace/ machine.

Manual entry of quantities, yield

Manual entry of yield

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of yield

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Keep in mind that the result of relevant quantity compensation may also be a negative value.

Please note

Do NOT set this option for DOS terminals, if yield is offset against scrap or scrap is offset against

yield in the counter configuration.

Posting of yield as cycles

Requirement: Set the option "Manual entry".

MDE-MDM_81.docx

Version: 1.0.18468

Page 33 of 82

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Machine Data Management

Manual entry of quantities, scrap

Manual entry of scrap

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

On Windows terminals this option does not affect the  quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of scrap

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Keep in mind that the result of relevant quantity compensation may also be a negative value.

Please note

Do NOT set this option for DOS terminals, if yield is offset against scrap or scrap is offset against

yield in the counter configuration.

Posting of scrap as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, rework

Manual entry of rework quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of rework

Requirement: Set the option "Manual entry".

MDE-MDM_81.docx

Version: 1.0.18468

Page 34 of 82

Machine Data Management

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Keep in mind that the result of relevant quantity compensation may also be a negative value.

Please note

Do NOT set this option for DOS terminals, if yield is offset against scrap or scrap is offset against

yield in the counter configuration.

Posting of the rework quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, open quantity

Manual entry of open quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of open quantity

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Keep in mind that the result of relevant quantity compensation may also be a negative value.

Please note

Do NOT set this option for DOS terminals, if yield is offset against scrap or scrap is offset against

yield in the counter configuration.

Posting of open quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted 1:1 as a cycle (partitioning is not considered).

"MDE configuration" tab

This tab is only available if you select a resource of the type "MNR".

MDE-MDM_81.docx

Version: 1.0.18468

Page 35 of 82

Machine Data Management

Monitoring

Monitoring type

Choose from the following monitoring types:

Monitoring by operating signal

No monitoring

Cyclic monitoring

If you select cyclic or operating signal monitoring, you can only enter a malfunction if the terminal

prompts  you  to  do  so  ("Assign  malfunction").  If  you  do  not  use  automatic  monitoring,  you  can

enter a new machine status at any time.

If  you  use  the  cyclic  monitoring  option,  the  machine  automatically  switches  to  the  "production"

status  when  counting  pulses  occur.  If  you  select  the  "operating  signal"  option,  the  machine

automatically  switches  to  the  status  "production"  as  soon  as  the  operating  signal  is  set.  If  you  do

not use the "automatic monitoring" option, you must assign the "Production" status manually.

Entry of malfunction reason required with specified delay time in [s]

(Only with terminal type CT 73x, CT 83x, not with master terminal/DS-100)

If the system identifies a downtime without a reason, the terminal opens the input dialog "Change

machine status" after the specified delay time. If the terminal goes back into production, the window

still remains open.

If  you  now  enter  a  machine  status  (during  production),  this  input  activates  a  reposting  event  that

reposts the most recently recorded status from "General disturbance" to the newly entered status. If

reposting is successful, the window closes; otherwise, it remains open.

However,  if  the  system  identifies  a  downtime  once  again  (with  or  without  a  reason),  you  can  no

longer repost the previously noted status. The window closes automatically.

If the system identifies another downtime without a reason and the delay time has expired, then the

input window opens as described above.

If  the  system  identifies  a  downtime  without  a  reason  and  the  machine  switches  into  production

before  the  delay  time  expires,  then  the  terminal  does  not  automatically  prompt  you  to  enter  a

malfunction reason.

Important note:

This reposting only affects the HYDRA Machine Data Collection. The system does not correct the

resource performance accounts of the currently running OP online!

Please note for data maintenance:

The  tabular  event  maintenance  of  the  MOC  shows  all  changed  machine  statuses.  However,  you

cannot  edit  the  reposting  event  as  it  is  locked.  In  order  to  perform  recalculations  correctly  with

respect to orders and machines, change the original event with the status "NOT ASSIGNED" to the

correct status. The reposting event does not affect recalculation!

MDE-MDM_81.docx

Version: 1.0.18468

Page 36 of 82

Machine Data Management

Minimum malfunction time

If  you  select  the  operating  signal  monitoring  type,  define  the  duration  in  seconds  that  a

malfunction must last until it is identified and posted as a malfunction.

Minimum cycle time

If you select the cyclic monitoring, specify a minimum cycle time in seconds in this field.

The terminal uses this minimum cycle time and the target cycle stored in the (logged in) operation

and compensated with the cycle extension in order to calculate the maximum value. The terminal

uses this value as the default cycle time.

If  both  the  minimum  cycle  time  and  the  target  cycle  stored  in  the  operation  are  0,  the  cycle  time

specification is set to 60000 seconds [per 1000 machine cycles].

Cycle extension

If you select the cyclic monitoring option, enter the percentage for extending the target cycle time

in a range from 0 to 5000.

The system sets off the target cycle stored in the (logged in) operation against this percentage. In

this way, a value less than 100 indicates a shortened  cycle; a value greater than 100 indicates an

extended cycle.

Number of target cycles

If you select the "cyclic monitoring" option, enter the number of cycles (0 to a maximum of 9) after

which  the  terminal  automatically  switches  from  a  status  unequal  to  "production"  into  the

"production"  status  within  the  cycle  time  (requirement:  this  status  unequal  to  production  is  not

locked for the "production" status).

Some production processes provide machine cycles  during the set up phase. Set a value greater

than 0 in order to prevent the current machine status from changing immediately. Please note: The

quantities  you  collect  until  the  machine  switches  to  the  "production"  status  are  neither  posted  as

yield nor scrap.

Cycles to be evaluated

Reserved. Enter 0 in this field.

Administration

Posting during production lock

Use  this  setting  to  specify  how  to  post  the  counting  pulses  that  are  collected  while  the  status

"production" is suspended. This configuration takes effect with all counters configured as "Yield".

MDE-MDM_81.docx

Version: 1.0.18468

Page 37 of 82

Machine Data Management

Posting as scrap

If this option is configured for the counter, the system offsets the counting

pulses  against the partitioning/ pulse factor and posts these pulses  as scrap.  Even  if  you  defined

another quantity account for offsetting, this one will not be used.

Posting as yield parts

the system posts the counting pulses as yield

No posting

suspended.

the  system  does  not  post  the  quantities  while  the  "production"  status  is

Pulse factor specific to machines

Use the pulse factor, for example, if you want to collect lengths (e.g. using a wheel).

Set  the  value  to  0  for  machines  where  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  is

collected  per  pulse.    In  this  case,  the  pulse  factor  is  not  evaluated.  That  means,  the  number  of

cycles posted corresponds to the actual pulses transferred via the MSS (machine interface).

The MSS (machine interface) records the signals transferred from the machine (counting pulses).

According  to  the  configured  number  of  pulses,  the  system  calculates  and  posts  the  quantities  as

follows:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be evaluated as a fraction. In this way, in the quantity calculation

the pulse is included as a denominator while the partitioning is considered a numerator.

The system interprets pulses that occur during a malfunction or a production lock (configuration of

Posting during prod. lock > scrap) as scrap. Also use the above-mentioned formula to calculate the

scrap quantities.

Partitioning specific to machines

Enter the partitioning specific to the machine in this field. Multiply the machine-specific partitioning

by  the  partitioning  stored  with  the  operation  in  order  to  integrate  the  machine-specific  partitioning

into the quantity calculation. Enter the value 1 in this field, if you do not want this to happen.

Extended weekend automatic

If  you  select  this  option  and  if  configured  accordingly,  the  system  assigns  the  status  that  was

available before status 999 was activated when the shift starts.

Please note:

To use this option, the workplace must already be assigned to a terminal.

Find detailed information about the automatic activation of status 999 in the document   Day types.

Waiting period, short-term disturbance

To improve the overview, e.g. in the machine history, configure a short-term malfunction status for

each  machine/  workplace.  Use  this  status  as  a  “repository”  for  unconfirmed  statuses,  which  only

existed for a specific (short) period.

MDE-MDM_81.docx

Version: 1.0.18468

Page 38 of 82

Machine Data Management

If  the  terminal  automatically  identifies  a  downtime  and  the  machine  automatically  goes  back  into

production, the system checks if this disturbance is shorter than the time period configured here for

short-term malfunctions.

If  so,  then  the  system  assigns  the  status  that  is  configured  for  "short-term  disturbances"  to  this

automatically identified malfunction.

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

Enter  the  logical  output  where  a  digital  signal  should  occur  when  the  corresponding  status  is

available.

Machine lock output

the  system  sets  this  output,  if  you  enabled  the  option  "machine

lock output" in the current machine status.

Target quantity reached output  the system sets this output, if the collected yield has reached the

target quantity of the OP.

Machine downtime output

the system sets this output, if the machine  is in a status unequal

to  Production.  When  changing  into  production,  the  system

immediately sets the output to 0.

Free I/O

Free input/ output for customizations.

Use these statuses for connecting a monitoring light or a horn, for example.

Enter the corresponding number in one of the fields in order to assign an output and to specify

which relay is interconnected by the terminal when the predefined status occurs. Enter "0" to

prevent any action. Note that you cannot assign an output on a terminal more than once.

Please note

- Specify the statuses that trigger the activation of the machine lock as part of the Status

assignment.

- Generally, enter the value "1" in the input field, when the machine lock is activated via the

available relay output of a DS 100. In this case, the system sets the machine lock if

- a correspondingly configured status occurs and

- in the status not assigned.

Change output batch

Customer-specific assignment of an input with an automatic output batch change (MPL). By default,

enter 0 in this field.

MDE-MDM_81.docx

Version: 1.0.18468

Page 39 of 82

Machine Data Management

PDE (Process Data Collection)

Collect process data

This  parameter  specifies  if  the  system  collects  process  data  for  this machine.  If  this  parameter  is

not set at a machine, you cannot collect process data for this machine.

External connection

External connection

If this machine is assigned to a master terminal, you can choose from the following connection

options:

Arburg control system  Arburg connection (only available if HYD-ALS is licensed)

Engel interfacing

connection of Engel machines

No external device

No connection of an external device

DS100

MT3

PDE

DS100 connection

MT3 connection

Process data collection

If you activate a DS100 or MT3 connection, you can select the field "device address". If you activate

the  option  "Engel  interfacing",  you  can  select  the  field  "serial  number".  If  you  activate  the  option

"Arburg control system", you can select the field "class".

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device": allowed

"MT 3" and "No external device": allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)

Enter the serial number of the connected Engel machine. Set the option "EMS machine interface" in

the HYDRA basic parameter settings  if you want to use Engel machines.

Device address

You can select this field, if you activated a DS100 or MT3 connection. Enter the device address of

the sub-bus participant.

"Resource configuration" tab

This tab is only available, if you select a resource of any other type than "MNR".

Resource master data

Type

Identifier regarding the type of resource:

MDE-MDM_81.docx

Version: 1.0.18468

Page 40 of 82

Machine Data Management

Resource: A resource can be uniquely identified, i.e. the resource is actually present. It always has

the number 1.

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  you  can  change  the  value  in  the  field  Number  from  1  to  another  positive  integer  value.  You

cannot post  data onto  anonymous resources because anonymous resources do not relate to  one

specific resource. Please note the information in the chapter Anonymous resources.

Required resource: A required resource is a substitute for one or more actual resources that can be

identified.  Specify  in  the  configuration  WRM:  Master  data  >  Required  resources  which  resources

are represented by a required resource. The number results from the number of actual resources

assigned to the required resource.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future use.

Version

Revision number; store here the program version for resources of the type DNC.

Number

You  can  only  edit  this  field,  if  it  contains  an  anonymous  resource  and  the  identifier  Anonymous

resource is set (see above). A value > 1 indicates how many of these resources are available.

This field is automatically calculated for required resources.

Resource family

Assign  a  resource  family.  If  you  change  the  resource  family  subsequently,  an  information  dialog

appears as a warning because user fields can possibly be assigned with the resource family.

Target utilization

Cycles

The target cycles serve as additional information regarding how long the resource is to be used.

Runtime

The target runtime serves as additional information regarding how long the resource is to be used.

Input unit

Input unit

Absolute value limit (EMG 8.1, function authorization: resablim)

Enter the absolute value limit of the (meter) resource. The energy monitor shows this limit value in

addition  to  the  current  meter  reading.  Use  the  Escalation  Management  to  generate  an  escalation

message, if the counter value of the resource exceeds the specified absolute value limit. This field

is only visible, if you have the function authorization "resablim".

MDE-MDM_81.docx

Version: 1.0.18468

Page 41 of 82

Machine Data Management

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and

for the machine data collection at the terminal.

Original partitioning

Partitioning of the tool (= number of cavities) when using this tool.

Current partitioning

Current partitioning of the tool. This partitioning can deviate from the original partitioning, e.g. if the

original quantity can no longer be produced with one cycle due to a tool defect.

Always use the current partitioning to post cycles to the tool.

Please note: The partitioning stored in the OP is relevant for the planning in the HLS module and

for the machine data collection at the terminal.

Partitioning due to cavities

If  you  set  the  option  "partitioning  due  to  cavities",  the  system  (re-)calculates  the  fields  "current

partitioning" and "original partitioning" using the assignments in cavity management. Then, you can

no longer change the fields manually.

Log on with OP

Use this identifier to control whether or not the resource is logged on with the OP, if it is included as

a component in the list of production resources and tools of the operation. Possible values:

None:

The resource is not logged on.

Implicit:  The  system  automatically  (implicitly)  logs  on  the  resource  that  is  assigned  to  the

operation  as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  explicitly  nor

change the logon.

Explicit:  You  can  explicitly  log  on  the  resource  that  is  assigned  to  the  operation  as  a  production

resource  and  tool  or  you  can  log  on  another  resource  instead.  If  you  do  not  log  on  the  resource

explicitly or if you do not log on another resource explicitly, the system implicitly (automatically) logs

on the current resource; in this way, the current resource serves as a "default".

Please note:

If  you log on another resource explicitly, this resource  will  be logged  on for the resource that  has

the same resource type in the operation's list of production resources and tools. For this reason,

you can only log on those resources explicitly that are included as a requirement in the operation's

list of production resources and tools. In this way, you cannot log on a resource that is not included

as a requirement in the list of production resources and tools.

MDE-MDM_81.docx

Version: 1.0.18468

Page 42 of 82

Machine Data Management

In general, you should not enable this option for the resource type DNC. The DNC module handles

this differently (NC programs are logged on separately).

The system also logs on resources that are defined in the BOM of the machine.

Parallel logon/ planning possible

You can log on/plan the tool simultaneously.

Please note: You can only log on a resource multiple times to only one machine. Consequently, the

option "Parallel logon possible" refers to several different OPs on one machine.

In this case, the system posts data proportionally as follows:

  Post quantities proportionally.

  Post times 100% for each resource. This means that the system posts double the time to

the resource, if the resource is logged on twice.

Post to resource

Indicates whether or not the quantities and times are to be posted to the resource. Due to a high

degree  of  complexity,  you  should  only  assign  this  identifier  to  those  resources  that  you  actually

want to evaluate.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Retooling time

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

Not used. The system uses the configuration option of the same name stored in the resource type

in order to integrate the resource allocation in the HYDRA Shop Floor Scheduling.

Evaluation

Consider in evaluations

Reserved for future use.

MDE-MDM_81.docx

Version: 1.0.18468

Page 43 of 82

Machine Data Management

File

File exists

Shows whether or not the file is stored in the specified path. A cyclic process checks the files and

sets the options subject to whether or not the file is available.

File name

File  name;  without  file  extension  for  DNC.  The  system  adds  the  file  extension  based  on  the

configuration in the resource type. The defined paths specify the storage location.

Comparison resources

Enter  two  comparison  resources  for  energy  consumption  resources.  They  will  then  be  shown  in

comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resources to be compared.

Resource type 1

Resource type of the resources to be compared.

Resource 2

Resource number of the resources to be compared.

Resource type 2

Resource type of the resources to be compared.

Accuracy

Enter  more  detailed  information  on  measuring  accuracy  and  measuring  range  for  test  equipment

resources.

"User fields" tab

Use  user  fields  to  store  further  customer-specific  information  to  the  MES  besides  the  available  fields  in

the MOC standard. The "user fields" tab includes eight sub-index tabs, which each have eight additional

user  fields.  The  so-called  user  field  key  determines  which  user  fields  are  involved  and  which  meaning

they have.

The workplace and resource configuration provides data of two basic object types. You can also edit this

data in the workplace and resource configuration: on the one hand these are machines and workplaces

and on the other these are the resources. Machines and workplaces are also "resources". But resources

are not automatically machines and workplaces.

MDE-MDM_81.docx

Version: 1.0.18468

Page 44 of 82

Machine Data Management

Object type

The system configures the user fields of machines/workplaces in relation to the object type "MNR".

The system stores data contents to the machines/workplaces table and the resources table of the

database in order to ensure data consistency.

Configure user fields for resources in relation to the object type matching the resource type of the

resource  (example:  create  resources  of  the  type  "PAC"  in  relation  to  the  object  type  "PAC").  The

system stores data contents to the resources table of the database.

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and therefore the purpose of the fields) varies from one object to the next.

User fields

The following user fields are available after configuration:

Field data type

Number of
fields
6
16

Date
Numeric,
time, duration
Decimal value
Text field, length 1
Text
length
field,
10
Text
20
Text
40
Each page shows a maximum of 8 fields.

6
16
6

length

length

field,

field,

14

2

User  field  keys  are  not  defined  by  default  in  the  system.  Configure  the  system

accordingly to support this kind of user fields.

As the table shows resources of different types, use the user field key "SYSTEM" of the

object "RES" to identify the column headings for the user fields. .

"Comment" tab

Store additional resource comments in the "comment" tab.

“Resource attributes” tab

Shows  additional  resource  attributes  via  the  user  field  definitions  of  the  resource  family.  Use  the

"resource attributes" button for editing.

MDE-MDM_81.docx

Version: 1.0.18468

Page 45 of 82

Machine Data Management

"Resource list" tab

Shows  the resource  list for the selected resource. Click the "resource  list" button to go directly to

the BOM application for editing purposes.

"DNC versions" tab (available as of DNC 8.2)

Shows the available versions of a DNC resource including a flag indicating the currently applicable

version. HYDRA provides this valid version for machine downloads.

Toolbar

"General" tab

Insert

Opens  the  dialog  for  adding  a  resource.  This  dialog  provides  the  fields  that  match  the  selected

resource type.

Copy

Function authorization: mdres.copy

Opens  the  dialog  for  copying  an  existing  resource.  Subject  to  the  resource  and  corresponding

resource type selected before starting the "copy" function, the function differentiates the following:

  Copy function for resources of the Type = MNR (workplaces, machines)

  Copy function for resources that do not have the Type = MNR (resource type != MNR)

Copy function for resources of the Type = MNR (workplaces, machines)

MDE-MDM_81.docx

Version: 1.0.18468

Page 46 of 82

Machine Data Management

From: resource type, resource, short name, name

  Resource type (fixed "MNR“)

  Workplace/ machine number

  Short name

  Name

of the workplace you want to copy. You cannot change these values. They derive from the

selected data record.

To: resource type, resource, short name, name

  Resource type (corresponds to the resource type of the workplace you want to copy;

cannot be changed).

  Workplace/ machine number

  Short name

  Name

of the target workplace.

Copy machine status

Function authorization: mdmst.copy

If  you  set  this  option,  the  system  automatically  creates  and  transfers  all  workplace/

machine statuses of the workplace you want to copy to the new workplace.

Copy counter configuration

Function authorization: mdctr.copy

If you set this option, the system automatically creates and transfers all Counters/meters of

the workplace you want to copy to the new workplace.

Note  that  the  counter  numbers  of  the  new  workplace  are  identical  with  the  counter

numbers  of  the  workplace  you  copied.  If  necessary,  you  have  to  adjust  these  counter

numbers.

Copy reasons

Function authorization: mdreas.copy

If  you  set  this  option,  the  system  automatically  creates  and  transfers  all  reasons  of  the

workplace you want to copy to the new workplace.

Copy function for resources of any other type than MNR (resource type != MNR)

The  copy  function  for  all  resources  that  do  not  have  the  type  MNR  opens  the  "insert"  dialog  and

takes over the details from the previously selected resource. But you can edit and change all fields.

MDE-MDM_81.docx

Version: 1.0.18468

Page 47 of 82

Machine Data Management

Edit

Opens  the  dialog  for  editing  a  resource  and  provides  the  tabs  and  fields  of  the  corresponding

resource type.

 Delete

Deletes one or several selected resources.

"Resource" tab

 Configuration – resource status

Opens  the  application  "resource  status"  to  define  statuses  for  all  resources  that  do  not  have  the

type MNR.

 File - show file

Shows  the  file  -  only  available  for  document  resources  configured  as  file-based  resource  without

DNC processing in the resource type and if the corresponding license and function authorizations

are available.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superordinate resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is  entered as default  value for

the required resource.

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – measures

Opens the "measures" application.

MDE-MDM_81.docx

Version: 1.0.18468

Page 48 of 82

Machine Data Management

 Functions – status change

Opens the dialog for changing the resource status. The checkbox "including subordinate resources"

is not relevant and reserved for future upgrades.

 Functions – release of resource

Opens the dialog for releasing a resource. The checkbox "including subordinate resources" is not

relevant and reserved for future upgrades.

 Functions – stock transfer

Opens the dialog for transferring/relocating a resource

"Workplace" tab

 Configuration – status assignment

Opens  the  application  "status  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – counter configuration

Opens  the  application  "counter  configuration".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – terminal assignment

Opens  the  application  "terminal  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Entry – reasons

Opens  the  application  "reasons".  The  system  enters  the  selected  resource  in  the  corresponding

field.

 Entry – Operator positions

Opens  the  application  "operator  positions".  The  system  enters  the  selected  resource  in  the

corresponding field.

MDE-MDM_81.docx

Version: 1.0.18468

Page 49 of 82

Machine Data Management

 Entry – premium indicator

Opens  the  application  "premium  indicator".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Groups - groups

Opens the application "groups". The system enters the group of the selected resource.

 Groups – group assignment

Opens  the  application  "group  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous – cycle parameter

Opens  the  application  "cycle  parameter".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous - workforce requirements of workplaces

Opens  the  application  "workforce  requirements  of  workplaces".  The  system  enters  the  selected

resource in the corresponding field.

"DNC" tab

The  tab  is  only  available,  if  you  select  a  DNC  resource.  These  are  resources  configured  as

resources with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application.

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

  File - comparison editor

Opens the comparison editor for the selected resource or resources. See below for further information.

 File - export

Exports the file entered for the resource. Enter the target file via the file explorer.

MDE-MDM_81.docx

Version: 1.0.18468

Page 50 of 82

Machine Data Management

 File - import

Imports the file entered for the resource. Select the source file via the file explorer.

 File - viewer

Opens the file entered for the resource for viewing using the defined viewer program.

 File - editor

Opens the file entered for the resource for editing using the defined editing program.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superordinate resource.

 Functions – status change

Opens the dialog for changing the resource status.

 Functions – release of resource

Opens the dialog for releasing a resource.

How to use the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  You  can  choose  from  two

options:

Select one resource:

The  editor  shows  the  released  resource  and  the  optimized  version  of  the  resource  for

comparison. You can change the file entered on the right-hand side of the editor. Once you have

made the changes, the comparison editor transfers these changes to the system, like the simple

editor. You can only use this option for DNC types with the file processing type "optimized".

Select two resources:

MDE-MDM_81.docx

Version: 1.0.18468

Page 51 of 82

Machine Data Management

If  you  select  two  resources  before  you  open  the  editor,  the  editor  compares  the  two  selected

resources. You can choose the file type. You can change the file entered on the right-hand side

of the editor. Once you have made the changes, the comparison editor transfers these changes

to the system, like the simple editor.

Start  the functions of the comparison editor by clicking on the relevant  buttons  or via the context menu

(right clicking):

-  Reject:  Reject  the  detected  difference  (on  the  right).  Accept  the  value  from  the  left  file.  The

editor does no longer highlight the difference.

-  Keep:  Accept  the  detected  difference  (on  the  right).  The  editor  does  no  longer  highlight  the

difference.

-  Next difference: Go to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row by clicking the row and inputting values. Leave

the row without making any changes by clicking the "Esc" key.  Then the editor highlights the

row as "changed".

-  Swap  windows: Click this button to exchange  windows. This is necessary  if  you compare two

resources, as their order results from the order displayed in the table and the system does not

know  which  resource  is  to  be  changed.  If  you  only  select  one  resource,  this  button  is  not

available as in this case you can only change the optimized program version.

-  Save: Save the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration changes

Restart  the  terminal  which  the  workplace/  machine  is  assigned  to  in  order  for  the  terminal  program  to

interpret the configurations or modifications made to this workplace/machine.

Deleting a machine/ workplace

In a first step, the system shows a confirmation prompt asking if you really want to delete the machine. If

you  confirm  this  prompt,  the  system  makes  an  attempt  to  delete  the  workplace.  You  can  only  delete  a

workplace successfully, if:









you have not collected data for the workplace;

you have not assigned the workplace to a terminal or a line;

you have not logged on operations to the workplace;

you have not planned operations for the workplace.

MDE-MDM_81.docx

Version: 1.0.18468

Page 52 of 82

Machine Data Management

If  you  delete  the  workplace  successfully,  the  system  also  deletes  all  configuration  data,  e.g.  status

assignments, for this workplace.



Checking Business Parameter Containers (BSCs)

See here for further information on checking the system with respect to business parameters.

MDE-MDM_81.docx

Version: 1.0.18468

Page 53 of 82

Machine Data Management

7  Status Texts

Summary

Menu

Master data  Workplaces/ machines  Status texts

Transaction code

Mstt

Function authorization  Mdmstt

In  the  status  text  dialog,  all  possible  states  (statuses)  are  designated  with  a  descriptive  text.  These

descriptions are then used in the  status assignment performed later. The goal is to use standard status

texts for all workplaces and machines.

Usage

In  the  status  text  dialog,  all  possible  states  (statuses)  are  designated  with  a  descriptive  text.  These

descriptions are then used in the  status assignment performed later. The goal is to use standard status

texts for all workplaces and machines.

Integration

During status assignment, a status text is assigned to a status.

The colors configured in the status text can be displayed in different evaluations/reports.

Selection criteria

The application provides the following selection criteria:

Status text

Unique status text number

Designation

Status text name

Field descriptions

Status text

Unique status text number

Designation

Informative description of the status. This text is displayed at the terminal, among other places.

MDE-MDM_81.docx

Version: 1.0.18468

Page 54 of 82

Machine Data Management

Color

You  also  have  the  option  to  assign  a  color  to  a  status  text.  This  color  is  taken  into  account  at

various places in MOC.

Recommendation:

When  setting  up  a  new  status  text,  the  status  number  should  preferably  match  the

number of the status that will later be created during status assignment.

Example:  The  status  text  2  "Set  up"  should  be  assigned  to  the  status  2  during  status

assignment.

MDE-MDM_81.docx

Version: 1.0.18468

Page 55 of 82

Machine Data Management

8  Status Assignment

Menu

Master data  Workplaces/ machines  Status assignment

Transaction code

mst

Function authorization  mdmst

Statuses  can  be  created  for  all  workplaces/  machines.  The  status  illustrates  the  current  state  at  the

workplace/ machine.

Usage

All  possible  states  (=  statuses)  or  disturbances  at  a  machine/  workplace  are  configured  in  status

assignment  and  are  assigned  to  status  texts  using  unique  status  numbers.  When  malfunctions  are

detected at the terminal, the system falls back on the status recorded here.

Example of how a status table is set up

Status

Status text number

1

1

2

3

3

4

4

5

5

6

6

2

12

12

RPA

MUT

LCI

SCI

SET

BKS

DCI

DCI

Control for machine

Prod.  Disturb

Disturb

Disturb

Disturb

Disturb

Gen.

monitoring

ance

ance

ance

ance

ance

disturb

ance

Manual assignment at















the terminal

Automatic assignment















via operating signal

Input

Assignment at the MSS

1

0

2

2

3

1

4

3

0

-

6

7

0

-

MDE-MDM_81.docx

Version: 1.0.18468

Page 56 of 82

Machine Data Management

The entries are based on the status texts listed below:

1

2

3

4

5

6

Production

Tool breakage

No raw material

Staff shortage

Setup

Break

12

Gen. malfunction

This is only an example to illustrate status assignment.

The  selection  dialog  allows  you  to  select  and  display  statuses  that  have  already  been  assigned  to  a

machine or a workplace.

Integration

The workplace/ machine status can be found in several different evaluations.

Requirement

The following objects must be created before workplace/ machine statuses can be assigned.

  Workplace/ machine

  Status text

  Status class (optional)

  Resource performance account

Toolbar

Status list

Clicking on the "Status list" icon opens the report showing the defined and highlighted

statuses and displays the statuses in clear text and as a barcode in the print-ready report.

Detailed help can be found under the following link: machine status list report.

Selection criteria

The application provides the following selection criteria:

Workplace

The option to select the workplace/ machine the statuses of which you would like to display.

MDE-MDM_81.docx

Version: 1.0.18468

Page 57 of 82

Machine Data Management

Status

The  option  to  select  the  defined  workplace/  machine  statuses.  The  statuses  are  displayed  for  all

workplaces/ machines with the status number entered.

Status text

Selection based on defined status text. You can also run a search using wildcards.

RPA abbreviation

Abbreviation for the assigned resource performance account

Status class

Abbreviation for the assigned status class

Field descriptions

Please note with regard to status 30000

Only selected options can be modified for status 30000:

  Warning in the machinery

  Activate production lock

  Activate machine lock

  Recording scrap reason (scrap reasons)

Certain fields such as status class, RPA and production identifier are not filled in for this status

and therefore the fields are empty in the list.

General index tab

Machine/ short name

By providing the machine number, the state of the malfunction is assigned to a machine. In order to

create  a  complete  status  table  for  a  machine,  each  of  the  states  of  this  machine  must  show  the

same number as what is input in this field.

The short name contains the designation of the machine entered or selected.

Status

A unique number is issued in this field for the status in the status table. This is the same number by

which the state can be assigned or modified at the terminal.

Only  one  status  may  be  defined  at  workplaces  of  the  type  "group  workplace".  This

workplace has to be assigned the control indicator "production" (see "control" tab).

MDE-MDM_81.docx

Version: 1.0.18468

Page 58 of 82

Machine Data Management

Please note: The status 30000 "Not assigned" cannot be deleted; furthermore, only selected fields

can be configured for this status.

Superior status

If no status is defined in the superior status field, then this relates to a status of the uppermost level.

Otherwise,  the  number  entered  here  is  the  one  for  the  status  directly  above  it.  This  status  must

already exist and be provided with a "hierarchy level" control indicator.

Please note: This function is available only on Windows terminals

Status text

The number assigned here refers to the clear text status message from the status text table.

Status class

By assigning a status to a status class, cumulative evaluations/reports can be performed on status

classes.  The  abbreviation  assigned  here  refers  to  the  clear  text  status  class  message  from  the

status class table.

Resource performance account

The status is assigned to  a resource performance account (RPA) based on  the  entry  in this field.

You select one of the 12 RPAs for this.

The 12 RPAs are already predefined in HYDRA standard. The meanings for each of the RPAs are

found in the  glossary.

Control index tab

Production identifier

The  following  identifiers  are  available  to  control  machine  monitoring.  Except  for  the  "production"

control  indicator,  all  following  control  indicators  are  only  allowed  for  machines/workplaces  of  the

type "individual workplace".

Production

The  production  state/  status  of  a  machine/  workplace  is  identified  with  Production.  For  each

machine/  workplace,  there  must  be  exactly  one  status  marked  with  this  identifier.  The  HYDRA

machine  data  collection  function  uses  this  identifier  to  detect  the  status  that  is  automatically

activated  during  production  phases  for  machines/workplaces  of  the  type  "individual  workplace".

Only  one  status  is  allowed  for  "group  workplaces".  This  status  is  to  be  assigned  this  control

indicator.

Other status

All statuses that are  not assigned one of the control  indicators described here are to be provided

with  the  control  indicator  "other  status".  As  many  statuses  as  required  can  be  identified  by  this

indicator per individual workplace.

MDE-MDM_81.docx

Version: 1.0.18468

Page 59 of 82

Machine Data Management

General disturbance

One status per machine/ workplace must be created as General disturbance and be given this

identifier. If the HYDRA machine data collection function detects a production phase that has not

yet been assigned a disturbance or status, then this duration is posted to the general disturbance.

Material change

This option is only available with the MPL module.

Materials that are not planned can also be logged on for configurable statuses. They are logged on

as alternative material, which means that the operator posts some material instead of the planned

material. The determination whether or not alternative materials may be logged on for components

is made in status assignment. As a result, the configuration must contain at least the status "Setup"

in order to ensure the desired posting behavior. The machine status "Material change" option makes

this posting possible as early as during operation logon without having to first perform a status

change.

No order

When an operation is manually logged off or interrupted, a check is run at the Windows terminal to

verify whether this is the last operation at the workplace. If no more operations are logged on at the

terminal for this workplace, the terminal sets the status of this workplace to "No order".

The  "No  order"  option  is  only  available  at  Windows  terminals  (CTWIN/AIP).  The  option

may  only  be  set  at  individual  workplaces,  not  at  group  workplaces,  because  only  the

"Production" status is supported at group workplaces. A maximum of one status may exist

with this production identifier.

Short-term status (as of MDE 7.2)

For an optimized overview, for example in the status log or machine history, one status per

machine can be configured as short-term disturbance. The purpose of this status is to provide a

"container" for unconfirmed statuses that were active for only a specific (short) time during machine

monitoring.

If a downtime is automatically detected at the terminal and the machine goes back into production

automatically,  the  system  verifies  if  the  duration  of  this  disturbance  is  shorter  than  the  duration

configured for this machine as short-term disturbances.

If it is, then the disturbance showing no reasons up until now is set with a reason using the status

configured at the machine as the status for "short-term disturbances".

Such automatic status postings (reasons) for short-term disturbances are displayed within HYDRA

in exactly the same manner as if they had been given a reason by an operator. During an automatic

shift change, the duration of short-time disturbances is ignored.

Hierarchy level

Statuses that cannot be recorded at the terminal, and are therefore only to be used to display the

hierarchy, are identified as "hierarchy level".

MDE-MDM_81.docx

Version: 1.0.18468

Page 60 of 82

Machine Data Management

This function is only available at the Windows-based terminals; in this case, nothing more can

be entered in certain configurations and index tabs.

Estimated downtime (as of MDE 7.2)

Once a status is set, an estimated downtime can be entered during manual status assignment; in

the process, the downtime defined in the master data is shown as a suggestion.

During automatic status change, the downtime defined in the master data is automatically set.

Activate production lock (only for terminal types CT 56x, CT 7xx and CT 8xx)

If this option is set, production lock (P lock) is automatically activated at the terminal during status

assignment.

During  machine  monitoring,  this  production  lock  prevents  the  status  "Production"  from  being

automatically  set  because  of  an  incoming  production  signal.  Consequently,  the  status  set  here

overrides  the  production  signal  until  the  production  lock  is  manually  canceled  at  the  terminal.

Furthermore,  the  production  lock  can  also  affect  whether  and  how  the  quantities  accumulated

during this time (counter readings) are posted.

Set machine lock output

This option must be set if machine lock should be activated during status assignment.

If  it  is,  you  must  also  ensure  that  machine  lock  output  is  configured  accordingly  in  the  machine

configuration.

Status change index tab

Manually at the terminal

If this option is activated, the operator can enter this status manually at the terminal (by barcode or

keyboard).  If  this  option  is  not  activated,  the  status  will  also  no  longer  be  displayed  in  the  status

selection list at the terminal.

Authorization

Access  authorization  for  entering  a  status  at  the  terminal  (a  value  from  0  to  9).  An  authorization

level  for  machine  status  modification  is  defined  for  every  person  in  the  HR  master  data.  If  the

authorization  level  in  the  master  data  is  lower  than  the  authorization  defined  here,  the  operator

cannot assign this status at the terminal.

Automatically via digital input

This  option  must  be  activated  if  a  status  assignment  is  made  automatically  via  the  machine

interface  (CT-MSS,  CT-UMPS,  PCC).  The  number  of  the  digital  input  through  which  a  status

occurrence is detected must also be entered in the "input" field (0 = no input).

MDE-MDM_81.docx

Version: 1.0.18468

Page 61 of 82

Machine Data Management

When a machine is monitored via an operating signal the operating signal is also acquired via a

digital input. A status must be defined as an operating signal in the following form:

- Control for machine monitoring: Production

- Automatically assigned via operating signal: activated

- Input > 0 is entered. This input is used as operating signal.

As  far  as  disturbance  reasons  are  concerned,  we  generally  distinguish  between  automatically

and  manually  entered  malfunction  reasons.  The  disturbance  reason  entered  manually  at  the

terminal overrides automatically entered malfunction reasons.

If  no  production  lock  is  set,  the  status  with  the  control  indicator  "Production"  overrides  every

malfunction reason. Therefore, keep in mind that the status "Production" must by all means be

deactivated if an active malfunction is to be processed via an input.

If multiple automatic statuses (disturbance reasons) are active via digital inputs, the status with

the lowest HYDRA channel number (not the lowest status number!) is set.

Please  keep  in  mind  that  how  the  number  is  assigned  to  a  physical  connection  to  the  MSS

depends  on

the  settings

in

the

local

terminal  configuration

file  (Windows

terminal:

CTWIN.INI/CTAIP.INI, DOS terminal: AIOP.CFG).

Processing index tab

Log staff off

When  this  option  is  set,  all  persons  currently  logged  on  are  logged  off  when  a  status  is  assigned

(useful, for example, during maintenance phases). Otherwise, the people stay logged on.

Operation posting

An automatic overhead cost order logon can be activated during a status change using the option

Operation posting. The following options are supported:

None

No processing.

Interrupt OP

This setting causes all active operations to be automatically interrupted and all people to be logged

off at the workplace when switching to this machine status.

Interrupt active OP and log the following OP on

When status is changed, all active operations are interrupted and all people are logged off. The

"subsequent operation" defined in the field Operation is automatically logged on.

Please note: The subsequent operation may not be subject to batch management.

MDE-MDM_81.docx

Version: 1.0.18468

Page 62 of 82

Machine Data Management

Transfer registered person to OP

Depending on this setting, people are transferred to the "subsequent operation" defined in the field

Operation.

If  the  operation  is  an  overhead  cost  operation  or  if  the  posting  workplace  is  a  group  workplace

(GAP), then at least one person is logged on to the subsequent OP: either the person posting the

operation, or if there is no field available to enter a staff badge number in the change status dialog,

this  will  be  the  person  logged  on  the  longest.  If  no  one  is  logged  on  at  this  time,  the  subsequent

operation cannot be logged on.

Scrap reason

Automatically recorded scrap can be posted to a defined reason, depending on the relevant active

status.

A  distinction  is  made  in  the  process,  whether  the  production  lock  is  set  or  not  while  the  status  is

active. This reflects the configuration,  which  provides for either a scrap reason  while the status is

active and also while the status with a production lock is active.

A  counter  input  explicitly  defined  as  scrap  reason  counter  generally  has  a  higher  priority  than  a

reason defined here.

Plausibilities index tab

Check for running operation

Statuses can be configured so that

-  they  are  only  allowed  if  an  OP  is  logged  on  to  a

Option  An  operation  must  be

workplace

logged on

-  they  are  only  allowed  if  no  OP  is  logged  on  at  a

Option  No  operation  may  be

workplace

logged on

- they are allowed irrespective of the presence of an OP

Option No check

at a workplace

HYDRA checks this dependency during status change as well as during logon/ logoff or interruption

of  operations.  If  the  condition  is  violated  by  the  desired  posting,  the  terminal  displays  an  error

message and rejects the posting.

If, when an operation is terminated or interrupted, a new status is set, this status may not be an

order-related status!

MDE-MDM_81.docx

Version: 1.0.18468

Page 63 of 82

Machine Data Management

Use of unplanned material allowed

This  option  becomes  relevant  when  using  HYDRA  material  and  production  logistics  (MPL).  If  the

option  is  set,  the  use  of  unplanned  material  is  allowed,  i.e.  batches  that  are  not  specified  in  the

input  material  list  at  the  operation  can  be  logged  on  as  input  material.  This  can  be  useful,  for

example, during setup.

User fields index tab

User field key

This field is preset with the value DEFAULT and as a rule it cannot be modified. MPDV defines the

user  fields  for  this  user  field  key  during  the  customizing  process  to  meet  specific  customer

requirements.

MDE-MDM_81.docx

Version: 1.0.18468

Page 64 of 82

Machine Data Management

9  Setting Outputs Depending on Status and Posting Scenario

Usage

Under advanced configurations,  it is possible to set the machine's digital outputs to account for  when a

certain machine status and a defined posting scenario coincide.

The following combination of machine status and posting scenario can be configured:

  A status is active without a production lock

  A status is active with a production lock

  A status is active, but no operation is logged on

  A status is active and at least one operation is logged on

  A status is active, but no person is logged on

  A status is active and at least one person is logged on

If the situation changes (status modification, activate or deactivate P lock, OP posting, personnel posting),

the terminal checks the logical configured outputs and sets them as necessary.

In  doing  so,  there  is  the  option  to  set  exactly  the  same  logical  output  for  several  statuses  within  one

machine as well as several statuses of different machines.

If  a  logical  output  is  set  for  different  conditions  at  the  same  status,  then  it  will  be  set  if  one  of  the

conditions is met (OR link).

Requirements

  This function is only available at the Windows CTWIN or AIP terminals.

  For this purpose, the terminal must be configured in operation mode "MDE".

  The machine must be permanently assigned to the "MDE terminal".

  Output signals that are used for this function may not be configured anywhere else at the same time
(e.g. machine lock). This must be assured during configuration. This is not checked automatically.

  The terminal must be restarted any time a change is made to the configuration of the logical outputs.

  The outputs configured here may not be used simultaneously with the "inputs/ outputs" configuration

that exists in the resource configurations.

MDE-MDM_81.docx

Version: 1.0.18468

Page 65 of 82

Machine Data Management

Procedure

The configurations required for this are defined in the so-called "object-related configuration".

Object type

fix "MSTAT“ (Machine STATus)

ID1

ID2

ID3

ID4

Parameters

Machine number

for a numeric machine number, always add leading zeros to make it eight digits

Machine status number

(leave empty)

(leave empty)

The following parameters are supported:
MST_NO_PLOCK
MST_PLOCK
MST_NO_ANR

Output/ signal for "Status active without production lock“
Output/ signal for "Status active with production lock“
Output/ signal for "A status is active, but no operation is logged
on“
Output/ signal for "A status is active and (at least) one operation is
logged on"
Output/ signal for "A status is active, but no person is logged on“
Output/ signal for "A status is active and (at least) one person is
logged on"

MST_WITH_ANR

MST_NO_PNR
MST_WITH_PNR

Parameter value

The parameter value is always the number of the logical output that is to be set.

Active

Fix "J"

Example

Output  1  is  to  be  set  at  machine  100  if  either  setup  (status  2)  or  dismantling  (status  9)  is  active  with  a

production lock.

Output 2 is to be set at machine 100 if production (status 1) is active although no operation is logged on.

Object
type

MSTAT

MSTAT

MSTAT

ID 1

ID 2

ID 3

ID 4

Parameters

Parameter value  Activ

100

100

100

2

9

1

MST_PLOCK

MST_PLOCK

MST_NO_ANR

1

1

2

e

Y

Y

Y

MDE-MDM_81.docx

Version: 1.0.18468

Page 66 of 82

Machine Data Management

10  Print Status List

Summary

Menu

Master data  Workplaces/ machine status assignment  Status list

Transaction code

- (mst for machines/ workplace status assignment)

Function authorization  mdmst.print

Usage

The purpose of this function is to generate a status list with clear text and barcodes. A barcode provides

the ability to enter the status at a terminal using a barcode reader (e.g. a scanner gun).

Integration

The function is called up from the status assignment of machines/ workplaces.

A  printed  barcode  provides  the  ability  to  enter  the  status  at  a  terminal  using  a  barcode  reader  (e.g.  a

scanner gun).

To print a status list, follow the steps listed below:

1.

In the list, highlight the status  you  would like to print out on the status list. Click on the top left-

side corner of the table if you want to highlight all statuses.

2.  Click on the "status list" icon to call up the print preview screen. In it, there will be one new page

for each workplace/ machine.

3.  Click on the icon "Print report"

 in the print preview to print out the status lists on the default

printer set in MOC.

Structure of the workplace/ machine status barcode

*NNNNN0*

Place

Designation

Length

*

N

0

*

Asterisk

Machine status, with preceding zeros

fixed: 0

Asterisk

Length of status barcode without asterisks

1

5

1

1

6

MDE-MDM_81.docx

Version: 1.0.18468

Page 67 of 82

Machine Data Management

Please note:

By default, HYDRA supports the barcodes "39", "128" and "Interleaved 2 of 5"

The system only supports barcode detection and automatic assignment to the corresponding input

fields at the terminal for barcode readers that are connected at the serial port (COM port). This is

not possible for barcode readers that are "looped in" through the keyboard.

MDE-MDM_81.docx

Version: 1.0.18468

Page 68 of 82

Machine Data Management

11  Cycle Parameters

Summary

Menu

Master data  Workplaces/ machines  Cycle parameters

Transaction code

cycpa

Function authorization  mdcycl

Usage

HYDRA  provides  the  ability  to  monitor  cycle  times  within  the  machine  data  recording  function  without

requiring HYDRA process data processing to be used.

The purpose of this function is to configure the action and tolerance limits.

Integration

Values  are  marked  in  different  colors  in  the  Workplace  overview  depending  on  whether  the  action  or

tolerance limit was exceeded:

Standard

Black

If the value drops below or exceeds the action limit

Blue

If  the  value  drops  below  or  exceeds  the  tolerance

Red

limit

If a limit is exceeded, no further processing steps are taken in HYRDRA.

Requirement

Before defining any configurations, you must first set up the machine.

Selection criteria

The application provides the following selection criteria:

Machine

Selection by machine/ workplace

MDE-MDM_81.docx

Version: 1.0.18468

Page 69 of 82

Machine Data Management

Field descriptions

Machine

Machine for which the configuration applies.

Tolerance limit positive, negative

Values may not drop below or exceed the percentage values defined here.  The cycle time of the

logged  on  operation  is  always  used  as  the  target  value  for  cycle  time  monitoring.  This  can  be

corrected at the terminal. The limit value is entered as a percentage of the target value.

Example: Target value:

20 sec/ cycle

tolerance positive:

10 %

tolerance negative:

5 %

Thus, this results in the following limit values:

Upper limit value:

22 sec/ cycle

lower limit value:

19 sec/ cycle

Action limit positive, negative

Percentage values can be entered here, triggering a warning once they have been reached. This is

why the action  limits should be defined more narrowly  than the tolerance limits. The limit value is

entered as a percentage of the target value.

MDE-MDM_81.docx

Version: 1.0.18468

Page 70 of 82

Machine Data Management

12  Counter Configuration

Summary

Menu

Master data  Workplaces/ machines  Counter configuration

Transaction code

ctr

Function authorization  mdctr

Usage

Counter  configuration  defines  the  behavior  of  how  the  pulses  transmitted  by  MSS  (machine  interface)

should be interpreted in terms of monitoring and quantity.

Integration

In  addition  to  defining  counter  configuration,  each  time  a  machine  is  connected  to  the  terminal  several

different settings must be configured.

Requirement

Before defining any configurations, you must first set up the machine.

Configuration changes

In order for the shop floor terminal program to be able to interpret the settings or changes that

were made, you must first restart the terminal that is assigned to the workplace/ machine.

Selection criteria

The application provides the following selection criteria:

Machine

The ability to select the defined counter for the chosen resource/ machine.

Field descriptions

Machine

By entering the machine number, a logical counter channel is assigned to a machine.

Counter input

Counter number used to uniquely identify the counter channel for the machine.

MDE-MDM_81.docx

Version: 1.0.18468

Page 71 of 82

Machine Data Management

Please  keep  in  mind  that  the  counter  number  assignment  to  the  physical  connection  at  the  CT-

MSS,  CT-UMPS  or  OPC  variable  depends  on  other  settings  as  well  (e.g.  local  terminal

configuration file CTWIN.INI/CTAIP.INI (Windows terminal) or AIOP.CFG (DOS terminal).

Designation

Explanation of the counter, e.g. "Yield at closure counter"

Unit

Quantity unit that is recorded by the counter. Is currently only used for documentation purposes.

Cycles monitoring

For  channels  where  this  identifier  is  set,  incoming  counter  pulses  are  considered  during  cycle

monitoring.

When calculating the actual cycle, only the first counter is referenced that was configured using the

identifier  "For  monitoring".  This  counter  must  also  be  set  for  monitoring  via  operating  signal  if  an

actual cycle is to be calculated at the same time.

Posting as

Defines which quality of the counter quantity is recorded. Possible values:

- Yield

- Scrap

- Rework

- Open quantity

As a rule, quantity postings are booked to the primary quantities account.

Counters with the option "No posting" do not post to a quantity account. Only the counter reading is

recorded. Furthermore, a posting can be made as cycles (strokes) and/or be controlled using cycle

monitoring.

Reason

When  posting  quantities  for  scrap,  rework  or  open  quantities,  a  reason  can  be  stored  at  the

counter. To do so, you must first create the reason in the configuration accordingly (Reasons).

Thus, for example, you can define two separate counters with different scrap reasons.

A scrap reason defined  within counter configuration has a higher priority than a scrap

reason defined at the status.

Posting as cycles

If this option has been set, the pulses coming in via this counter are posted as cycles.

Allocation with partitioning

If this option is set, the incoming pulses are compensated  using the respective active partitioning/

pulse factor.

MDE-MDM_81.docx

Version: 1.0.18468

Page 72 of 82

Machine Data Management

For  counters  with  the  option  "No  posting",  the  setting  "Posting  with  partitioning/  pulse

factor" is irrelevant, because no cycles are partitioned into quantities for these counters.

Allocation with

The pulses recorded using this counter and the resulting quantities can be offset against a different

quantity account. In this case, the recorded quantity is deducted from the account against which it

should be offset.

Keep in mind that the result of relevant quantity compensation may also be a negative value.

What you must be aware of for DOS based terminals is that you must make sure you

do NOT set the option "Offset against" in the machine/ workplace configuration, index

tab "Quantities", if a compensation is set here.

Counters with the option "No posting" cannot be offset against quantity accounts.

Last editing

Editor, date and time of last editing

Notes for DOS based terminals

At  the  DOS  based  terminals  (CT-56x,  CT-541),  the  counter  configuration  is  only  supported  to  a  limited

extent:

Only a maximum of one counter can be configured for each quantity account "Yield" or for each

quantity  account  "Scrap"  (no  reworking,  no  open  quantity,  no  counter  with  the  option  "No

posting").

An "Offset against" is only possible at the second counter that must be configured as "Scrap". In

this case, the compensation is only possible with "Yield".

What  you  must  be  aware  of  is  that  you  must  make  sure  you  do  NOT  set  the  option  "Offset

against"  in  the  machine/  workplace  configuration,  index  tab  "Quantities",  if  a  compensation  is

set here.

No reason may be defined for the scrap counter.

MDE-MDM_81.docx

Version: 1.0.18468

Page 73 of 82

Machine Data Management

Toolbar

 Workplace configuration

Starts the configuration of workplaces/resources.

MDE-MDM_81.docx

Version: 1.0.18468

Page 74 of 82

Machine Data Management

13  Terminal Assignment

Summary

Menu

Master data  Work places  Terminal assignment

Transaction code

mta

Function authorization  mdmta

Usage

This function is used to configure the machine assignment to the terminal.

Usage

A machine must be assigned to a terminal in order to be able to use the MDE specific functions such as

automatic shift change, cyclical status update or data entry via MSS (machine interface). However, these

functions  are  only  available  if  the  terminal  is  configured  as  the  so-called  "MDE  terminal"  (see  terminal

configuration). These functions are not active for terminals that are configured as ADE terminals, not even

if the machines/ workplaces are assigned to the terminal.

An assignment of this kind makes it so that the machine/workplace is displayed by default at the terminal.

The number of assignable machines depends on the terminal type that is specified.

Terminal type CT-541:

Only one assignment possible

Terminal type CT-76x, CT 83x, CT84x:

Up to 16 assignments possible
(even  if  the  terminal  is  configured  as  the  master
terminal)
Up to ten machines can be used for process data
processing (PDV).

Terminal type CT-56x:

Terminal type A-SUB

Up to 8 assignments possible

Up to 20 assignments possible.

All  of  the  machines  that  have  been  assigned  to  terminals  up  until  now  appear  based  on  the  selected

terminals. The order displayed on the terminal is the result of the position specified here.

If a line (only available if an MDE-LIN license was issued) is assigned to a terminal, all aggregates of the

line are automatically assigned to the terminal and displayed in gray under the position "99". Aggregates

may  not  be  removed  from the  assignment.  If  one  line  is  removed  from  the  assignment,  the  aggregates

assigned  to  the  line  are  automatically  removed  as  well.  Lines  may  only  be  assigned  to  terminal  types

CT76x, CT83x (two lines max) and CT84x (three lines max.).

MDE-MDM_81.docx

Version: 1.0.18468

Page 75 of 82

Using the option button "Processing", the machine type assignment to the terminal can be differentiated.

Machine Data Management

The following options are available:

A - ADE processing

M - MDE processing

Processing according to operation mode of terminal

Thus, both workplaces/ machines with MDE processing as well as workplaces with ADE processing only

can be assigned to an MDE terminal.

For a group workplace, processing must be set to "ADE processing" if this is to be assigned to an MDE

terminal.

Configuration settings

In order for the shop floor terminal program to be able to interpret the settings or changes that

were made, you must first restart the terminal.

Selection criteria

The application provides the following selection criteria:

From  to

Used to select the terminal number

Field descriptions

Terminal

Unique terminal number that a machine should be assigned to.

Position

The machine's display position at the terminal and in the terminal assignment at the client

Machine

Machine that the terminal was assigned to/ should be assigned to

Processing

Here, the following two options are available to choose from:

A

M

ADE processing

MDE processing

Processing as per operation mode of terminal

MDE-MDM_81.docx

Version: 1.0.18468

Page 76 of 82

Machine Data Management

MDE-MDM_81.docx

Version: 1.0.18468

Page 77 of 82

Machine Data Management

14  Postings Relating to Workplaces/Machines

Summary

Menu

Data collection --> Corrections --> Postings relating to machines

Transaction code

mboo

Function authorization  mboo

Utilization

This application enables the user to obtain an overview of the postings relating to workplaces/machines

generated in HYDRA and to edit, record and correct relevant data quickly and easily.

The below-mentioned documents provide further information on postings relating to machines:

  Posting of quantities

  Posting of Times

Please note: The terms "posting" and "log record" are used synonymously in this document.

Integration

A  log  record  always  refers  to  a  period  of  time  in  which  a  workplace/machine  status  is  available.  Each

status change results in a new log record.

If the shift automatic function is enabled, the shift change also leads to a  new log record,

even  if  the  status  does  not  change  in  this  case.  If  the  status  30000  "not  assigned"  is

available  when  shifts  change,  this  period  is  posted  onto  the  status  with  the  control

indicator "general disturbance".

Prerequisite

Machine status changes need to be recorded for the workplaces/machines.

Selection criteria

The application provides the following selection criteria:

Workplace ... to ...

Determines the machine-related postings that were posted onto the specified workplace/machine.

MDE-MDM_81.docx

Version: 1.0.18468

Page 78 of 82

Machine Data Management

Group ... to ...

Determines  the  machine-related  postings  that  were  booked  onto  workplaces/machines  of  the  entered

group (according to the resource configuration).

Cost center

Determines  the  machine-related  postings  that  were  booked  onto  workplaces/machines  of  the  entered

cost center (according to the resource configuration).

Company

Determines  the  machine-related  postings  that  were  posted  onto  workplaces/machines  of  the  entered

company (according to the resource configuration).

Responsibility area

Determines  the  machine-related  postings  that  were  booked  onto  workplaces/machines  of  the  entered

responsibility area (according to the resource configuration).

Date from ... to ...

Determines machine-related postings the start time of which is within the specified period of time. In this

context, the period is either defined in connection with specifying the shift or the time.

Please note that this application only allows for data of the online data area to be selected

and edited.

Shift

Restricts the date range defined above by selecting  by  the shift.  Example:  if the date range  is selected

from 23 January 2009 until 25 January 2009 and shift 1 is chosen, all machine-related postings the start

time of which is in shift 1 of 23 January 2009, shift 1 of 24 January 2009 or shift 1 of 25 January 2009 are

selected.

Time

Restricts the  date range defined  above by selecting  by the time. Example: if the date range  is selected

from 23 January 2009 until 25 January 2009 and the time from 3 pm until 11 pm is chosen, all machine-

related postings the start time of which is between 3 pm on 23 January and 11 pm of 25 January 2009

are selected..

If several selection criteria are used, the results matching these criteria will be displayed.

MDE-MDM_81.docx

Version: 1.0.18468

Page 79 of 82

Machine Data Management

Field Descriptions

“General” tab

Record type

P: This log record was generated by a status change

N: This log record was generated at the end of a shift

Confirmed/uploaded

This flag cannot be changed. It is set within the scope of customer-specific uploads.

Machine

Machine/workplace for which the log record was generated.

Cost center

Cost  center  of  the  machine/workplace  according  to  the  workplace  configuration  for  which  the  log

record was generated.

Posting start, posting end

Period of time (beginning, end) for which the log record applies.

Duration

Duration since the last status change

Shift

Shift (number) for which the log record applies.

Beginning of shift

Beginning of the shift for which the log record applies.

End of shift

End time of the shift for which the log record applies.

Status

Status which coincided with the period of time of the log record.

The resource performance account is determined automatically from status assignment.

Comment

Comment (max. 60 characters) for the machine status change, if entered  while assigning statuses

(dialog M_MST) on the terminal.

Target cycle

Target cycle that was set when the status was changed (end of log record).

Partitioning

Partitioning that was set when the status was changed (end of log record).

MDE-MDM_81.docx

Version: 1.0.18468

Page 80 of 82

Machine Data Management

Editor

Editor who modified the log record manually the last time.

Last modification

Point in time when the log record was edited manually the last time.

“Quantities“ tab

Yield (P)

Computed yield in primary quantity unit for counter values that were recorded during the period of

the log record or yield in primary quantity unit that was manually recorded during the period of the

log record.

Scrap (P)

Computed scrap in primary quantity unit for counter values that were recorded during the period of

the log record or scrap in primary quantity unit that was manually recorded during the period of the

log record.

Rework (P)

Computed rework quantity in primary quantity unit for counter values that were recorded during the

period  of  the  log  record  or  rework  quantity  in  primary  quantity  unit  that  was  manually  recorded

during the period of the log record.

Open quantity (P)

Computed open quantity  in primary quantity unit for counter values that  were recorded during the

period of the log record or open quantity in primary quantity unit that was manually recorded during

the period of the log record.

Unit (P)

Primary  quantity  unit  according  to  a  configuration  relating  to  workplaces/machines  (resource

configuration).

Yield (S), Scrap (S), Rework (S), Open quantity (S), Unit (S)

The  corresponding  quantities  in  secondary  quantity  unit  are  converted  from  the  primary  quantity

according to the definitions made for conversions in the workplace configuration and provided that

corresponding conversion factors are available.

Please consider the "convert quantities" option for manual quantity changes.

MDE-MDM_81.docx

Version: 1.0.18468

Page 81 of 82

Machine Data Management

Yield (T), Scrap (T), Rework (T), Open quantity (T), Unit (T)

The  corresponding  quantities  in  tertiary  quantity  unit  are  converted  from  the  primary  quantity

according to the definitions made for conversions in the workplace configuration and provided that

corresponding conversion factors are available.

Please consider the "convert quantities" option for manual quantity changes.

Yield (B), Scrap (B), Rework (B), Open quantity (B), Unit (B)

The  corresponding  quantities  in  base  quantity  unit  are  converted  from  the  primary  quantity

according to the definitions made for conversions in the workplace configuration and provided that

corresponding conversion factors are available.

Please consider the "convert quantities" option for manual quantity changes.

Convert quantities

When quantities are changed, the "convert quantities" option allows for quantities to be converted

according to the conversion factors defined at the machine or the configured formulas for quantity

conversion.

If the conversion factors of active operations are to be used for the machine (compare the option

"basis  for  HYDRA-MDE  quantity  conversion"  in  the  workplace  configuration),  it  is  urgently

recommended  not  to  activate  the  "quantity  conversion"  option,  when  it  comes  to  subsequent

changes in the maintenance of postings function of HYDRA-MDE, as only conversion factors that

are specific to machines are taken into account by the maintenance of postings function.

Cycles

The number of cycles that were recorded within the period of the log record.

Toolbar

  Postings relating to orders

Function authorization: oboo.*

Starts the function "Order-related postings".

Transfers the workplace, cost center, date/time and shift from the selection area.

MDE-MDM_81.docx

Version: 1.0.18468

Page 82 of 82

