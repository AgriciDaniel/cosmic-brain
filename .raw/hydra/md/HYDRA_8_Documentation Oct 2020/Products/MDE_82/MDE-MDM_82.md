Manual

Machine Data Management
MDE-MDM 8.2

Version 1.2.23297

Last changed on: 18.09.2020

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 2 of 86

Machine Data Management

Contents

2  Overview: Machine Data Management ........................................................ 4

3  Data Collection in HYDRA MDE .................................................................. 6

3.1  Summary ............................................................................................................. 6

4  HYDRA MDE Log Records .......................................................................... 7

5  Posting of Times .......................................................................................... 9

6  Booking of Quantities ................................................................................. 10

Data collection in different quantity types and quantity accounts ................................. 10

Automatic collection of quantities ................................................................................ 13

Quantity calculation and parallel make-to-order production ......................................... 15

Manual collection of quantities .................................................................................... 17

Offsetting against another quantity account ................................................................. 17

7  Workplace and Resource Configuration .................................................... 18

8  Status Texts ............................................................................................... 57

9  Status Assignment ..................................................................................... 59

10  Setting Outputs Depending on Status and Posting Scenario .................... 69

11  Print Status List .......................................................................................... 71

12  Cycle Parameters ....................................................................................... 73

13  Machine Counter Configuration ................................................................. 75

14  Workplace terminal assignment ................................................................. 79

15  Postings Relating to Workplaces/Machines ............................................... 82

MDE-MDM_82.docx

Version: 1.2.23297

Page 3 of 86

Machine Data Management

2

 Overview: Machine Data Management

Summary

Purpose

Machine  Data  Management  provides  functions  that  make  it  possible  to  automatically  transfer  unit

quantities  and  machine  statuses  from  connected  machines  /  systems.  Depending  on  the  type  of

connection,  there  is  the  ability  to  monitor  the  planned  cycle  time  accounting  for  predefined  machine

tolerances.

If automatic transfer to certain machines is not possible, you can establish a semi-automatic connection

or enter data manually.

A full range of configuration and validation checking functions make it possible to adapt precisely to each

machine and to control the data collection process.

Implementation notes

You use Machine Data Management if

  You would like to transfer unit quantities and statuses provided from machines and systems into

the system automatically.

  You  would  like  the  option  to  either  manually  enter  machine  statuses  as  they  occur  or  have  it

automatically entered with the support of the system.

Integration

Machine Data Management is integrated into numerous other system function packages:

  Detailed scheduling / shop floor scheduling

o  Recorded  machine  statuses  are  visualized  online  in  shop  floor  scheduling  on  the

planning  board  so  that  the  scheduler  is  given  an  overview  of  the  current  production

situation.

o  Depending on system configuration, remaining run time is calculated based on the cycles

or quantities recorded.

  Graphic machinery

o

In  graphic  machinery  the  recorded  machine  statuses  and  cycles  /  unit  quantities  are

visualized online.

  Tool / resource management

MDE-MDM_82.docx

Version: 1.2.23297

Page 4 of 86

o

In  tool  /  resource  management,  maintenance  activities  can  be  triggered  and  planned

based on the numbers of units recorded.

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

o  Extensive  validation  checks  (e.g.  check  whether  setup  status  may  be  set  if  no  order  is

logged on)

o  Automatic recording of machine states/ statuses at BDE terminals

  Entry of quantities

o  Configuration  defining  logical  counter  inputs  for  the  automatic  recording  of  production

figures

o  Automatic recording of production figures (cycles, yield and scrap) at BDE terminals

o  Manual recording of production figures (cycles, yield and scrap) at BDE terminals

  Machine monitoring

o  Monitoring of the planned cycle time accounting for predefined machine tolerances

o  Machine monitoring based on operating signals

o  Suppression of the production status despite active production signals (e.g. during setup

status)

o  Explanation for disturbances/malfunctions based on machine monitoring

  Posting:

o  Posting of machine status times to machine-related log records (postings)

o  Posting of machine status times to status classes

  Posting maintenance

o  Display of machine-related log records (postings) generated based on entered data

o  Option to edit and correct machine-related log records

MDE-MDM_82.docx

Version: 1.2.23297

Page 5 of 86

Machine Data Management

3  Data Collection in HYDRA MDE

3.1  Summary

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 6 of 86

Machine Data Management

4  HYDRA MDE Log Records

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 7 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 8 of 86

Machine Data Management

5  Posting of Times

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 9 of 86

Machine Data Management

6  Booking of Quantities

Data collection in different quantity types and quantity accounts

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for

different quantity accounts.

The following quantity accounts are supported:

  Yield

  Scrap

  Rework

  Open quantity (problem quantity)

The following quantity types are supported with each quantity account:

  Primary quantity

  Secondary quantity

  Tertiary quantity

  Base quantity

The automatic collection of quantities on the terminal always refers to the primary quantity.

Conversion to alternative quantity units

Bookings for alternative quantity accounts can be performed as follows:

  direct (manual) input

  conversion

o

from other quantity types with manual input

o

from primary quantity with automatically collected quantities

MDE-MDM_82.docx

Version: 1.2.23297

Page 10 of 86

Machine Data Management

Direct (manual) input

If  a  quantity  is  directly  (manually)  entered  in  a  quantity  unit  of  a  quantity  type,  an  automatic

conversion is not performed.

Conversion from other quantity types

If alternative quantity accounts are not collected, the server converts the quantities to alternative

accounts using the conversion factors or quantity units, which are configured in the master data

of the machine/workplace on the console.

In general, conversion first takes place into the base quantity unit (unless this one is recorded

manually) and from the base quantity unit into the alternative unit (unless this one is recorded

manually).

Identical quantity units

If quantity units are identical they are converted via numerator and denominator in the master

data  of  machines/workplaces.  If  numerator  and/or  denominator  =  0,  then  the  quantities  are

taken over 1 to 1 without being converted.

Different quantity units

If quantity units are different, conversion is performed in the following order of priorities:

  Conversion using the numerator and denominator defined in the workplace/machine master

data (always convert into base quantity unit first, then into the alternative unit);

If numerator and/or denominator = 0

  Conversion using the formulas of the quantity units  .

No quantity units

If quantity units are not assigned for the machine, no conversion is performed.

Conversion of quantity 0

A quantity 0 is generally not converted into alternative units, even if a value that is not 0 could

be calculated (e.g. using a formula).

MDE-MDM_82.docx

Version: 1.2.23297

Page 11 of 86

Machine Data Management

Quantity conversion of automatically collected quantities

To convert automatically recorded quantities using formulas, you can use

- fixed factors/values or values based on machines/workplaces (user fields);

- data that is specific to the operation, such as length, width, weight per piece, etc.

You use the operation logged on the longest to identify the OP-specific data. Consequently, the

following (logical) restriction arises for operations that are logged on at the same time when it

comes to quantity conversion:

- the operations must produce the same material;

- the operations must have the same default data (length, width, weight per piece).

Any further requirements must be taken into account as part of customer projects.

Basis for HYDRA-MDE quantity conversion

In  the  Workplace/machine  configuration,  tab  Configurations  >  Quantities,  you  can  use  the

configuration option Basis for HYDRA-MDE quantity conversion to use the configured quantity

conversion  of  the  running  operations  also  for  the  machine.  This  option  ensures  a  correct

calculation of quantities even if more than one operation is active :

M – conversion factors of the workplace (APZ) [default]

A – conversion factors of the OP if logged on, otherwise workplace

Notes

If  configuration  A  and  different  quantity  units  of  operations  are  used,  the  quantities  are

accumulated and booked to the machine accounts without reference to the units.

When  you  edit  postings,  the  MDE-related  quantity  conversion  using  the  operation  data  or  the

machine/workplace values (user fields) is not supported. In this case, do not enable the option

Convert quantities in the editing dialog of the maintenance of postings.

Display of alternative quantity units on the terminal

The  (manual)  collection  and  display  of  alternative  quantity  units  is  only  possible  on  Windows

terminals  (requires  customization).  Note:  The  terminal  itself  does  not  perform  any  local

conversion  into  alternative  quantity  units;  the  quantities  are  only  displayed  when  data  is

reloaded from the HYDRA server.

MDE-MDM_82.docx

Version: 1.2.23297

Page 12 of 86

Machine Data Management

Automatic collection of quantities

You configure the counters for each machine. The following options are available:

  Posting of yield, scrap, rework, open quantity, no posting

  Posting of cycles (strokes)

  The  quantity  is  calculated  using  partitioning  (parts  produced  per  cycle)  and/or  pulse

factor

  Cycle monitoring

  Reason (e.g. scrap reason)

  Offset against “quantity account"

e.g. scrap is deducted from yield

Quantities  that  are  issued  by  automatically  recorded  counters  are  always  posted  in  primary

quantity.  The  conversion  into  other  quantity  types  is  described  in  the  previous  section.  The

HYDRA  server  can  use  different  quantity  accounts  to  calculate  a  quantity  (e.g.  to  record  the

total quantity).

If the cycles are collected, not every single cycle is transferred to the server, but the collected

and  also  the  calculated  cycles  and  the  evaluated  counters  are  cyclically  transferred  to  the

server.  The  values  transferred  are  then  integrated  into  the  events  or  into  the  calculated

quantities of the machine-related postings (MDE log records).

Example 1:

A yield counter and a scrap counter are defined for the machine. The scrap collected is offset

against the yield collected.

The  events  and  postings  include  the  offset  and  calculated  quantities.  Not  for  each  cycle,  a

posting is created.

MDE-MDM_82.docx

Version: 1.2.23297

Page 13 of 86

Machine Data Management

Example 2:

A  defined calculation of a counter  reading  can  also  result  in negative quantities  in  the  posting

records:

Counters that are configured with the "no posting" option do not post any quantities to a quantity

account. Using these counters, the following use cases can be integrated:

  Cycle monitoring only

MDE-MDM_82.docx

Version: 1.2.23297

Page 14 of 86

Machine Data Management

  Cycle monitoring and posting as cycles (strokes)

  Posting as cycles (strokes) without cycle monitoring

Quantity calculation and parallel make-to-order production

With operations that are logged on at the same time, quantities are posted with respect to the

order according to the relevant specifications (partitioning, pulse factor) of the operation.

This specific calculation of quantities is performed with all quantity accounts that are recorded

automatically  (yield,  scrap,  rework,  open  quantity).  Counter  pulses  or  quantities  resulting  from

this  calculation  are  generally  posted  onto  all  OPs  that  are  logged  on  (according  to  the

configuration: with activated partitioning/pulse factor or not).

Specifications are identified as follows:

Partitioning/cavity (TLG)

Partitioning of the machine (parts per cycle): (TLG OP1 + TLG OP2 + TLG OPn) * TLG Machine

If  a  partitioning  is  specified  for  a  machine,  the  partitioning  of  the  operations  and  the  machine

partitioning are multiplied.

If  you  interrupt/log  off an operation,  the  partitioning  of  the  machine  is  updated,  i.e. the total  of

the remaining operations is recalculated.

If the last operation is interrupted or logged off, the partitioning is reset to 1 and multiplied by the

machine-specific partitioning.

Partitioning of the operation: TLGOP * TLG Machine

Changing the partitioning on the terminal

If  the  partitioning  of  the  operation  is  changed,  the  partitioning  of  the  machine  and  of  the

operation is changed/updated.

MDE-MDM_82.docx

Version: 1.2.23297

Page 15 of 86

Machine Data Management

Pulse factor (IMPFAKT)

Pulse  factor  of  the  machine  =  minimum(IMPFAKTOP1,  IMPFAKTOP2,…  IMPFAKTOPn)  *

IMPFAKTMachine

Pulse factor of the OP = minimum(IMPFAKTOP1, IMPFAKTOP2,… IMPFAKTOPn) * IMPFAKTMachine

Note:

The same pulse factor applies for all active operations. Therefore, you must ensure that parallel

operations get the same default pulse factor.

This means: The same pulse factor is used for all operations when quantities are calculated.

Quantity calculation on the basis of partitioning and pulse factor

Quantity of the machine = <number of cycles> * partitioning of the machine / pulse factor of the

machine

Quantity of the operation = <number of cycles> * partitioning of the operation / pulse factor of

the operation

Note:

The pulse factor is calculated as a fraction. When the quantity is calculated, the pulse is used as

denominator and the partitioning is the numerator.

Display on terminal

On  the  terminal,  the  field  Partitioning  shows  the  factor  that  is  relevant  for  the  quantity

calculation of the machine. It is

partitioning of the machine / pulse factor of the machine.

As  described  above,  the  different  default  values  of  the  machine  (e.g.  machine-specific

partitioning) and of the active operations are used to calculate this factor.

On  the  terminal,  the  field  Target  cycle  shows  the  relevant  current  target  cycle  (the  cycle

extension is not integrated). This is max(SZYOP1..n) for OPs that are logged on at the same time.

MDE-MDM_82.docx

Version: 1.2.23297

Page 16 of 86

Machine Data Management

Output "target quantity reached"

The target quantity output of the machine interface, e.g. setting a lamp, is set when the smallest

target  quantity  of  a  logged  on  order  is  reached.  If  the  OP  with  the  smallest  target  quantity  is

interrupted or finished, the next OP with the smallest target quantity is used.

Manual collection of quantities

You can also use the configurations below to book manually recorded quantities:

  Offset quantities (accounts) against other quantity accounts (Allocation with option)

e.g. deducting manually recorded scrap from yield

  Post manual quantities as cycles

Offsetting against another quantity account

You  can  offset  automatically  and  manually  recorded  quantities  against  another  quantity

account, e.g. you can deduct the manually recorded scrap from the yield.

You can use the Allocation with option for

  automatically recorded quantities in the counter configuration

  manually recorded quantities in the machine configuration.

If you use these options, bookings (BDE log records, MDE log records) with negative quantities

or negative order quantities can result.

MDE-MDM_82.docx

Version: 1.2.23297

Page 17 of 86

Machine Data Management

7  Workplace and Resource Configuration

Overview

HYDRA menu

Master data  Resources  Resource configuration

Master data  Workplaces/machines  Workplace configuration

FEDRA menu

Detailed Scheduling  Master data  Resource configuration

Transaction code

res

Function authorization  mdres

mdresgenh for fields in combination with Test Equipment Management

Available user fields

Where?

Object type/user field key

Source (type)

Tab User fields

<Res.type*)>/depending  on  data
record

Resource (MF-D)

Table

RES/SYSTEM

Resource (MF-D)

*) <Res.typ> = resource type

The resource configuration is the central function to manage resources in the MES.

Purpose

This  application  manages  the  master  data  of  workplaces/machines  and  other  resources  (tools,  DNC

resources,  etc.).  The  resource  type  classifies  resources.  Each  resource  type  is  also  linked  to  specific

functions and applications, which provide further functionalities of the MES for resources of the specified

type.

Integration

Use  this  application  to  view  the  resource  information  of  all  resource  types  available  in  the  system. The

resource type also specifies how and if data records can be edited. Depending on the resource type, you

cannot edit all fields or create and delete all resources.

Based  on  the  resource  type,  the  MES  also  includes  further  applications  that  are  especially  tailored  to

these types. The machine data collection application package, for example, is based on resources of the

type "machine".

In addition to the resource configuration, the  resource overview application is available. You cannot use

the resource overview application to edit  data. This application only allows administrative  operations for

the daily handling of resources such as the stock transfer of resources.

MDE-MDM_82.docx

Version: 1.2.23297

Page 18 of 86

Machine Data Management

Requirements

Create  a  year  model/shift  calendar  prior  to  creating  a  workplace  or  machine.  If  you  want  to  use  the

various resource types effectively, you also need the advanced licenses for these types.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Workplaces  and  machines  always  have  the  resource  type  MNR.  But  you  can  assign  individual

resource types to the other resources by configuration. Predefined resource types include:

DNC

NC/DNC program

DOC

Document

ENE

Energy meter

ENT

Removal device

ENT

Removal device

MNR  Workplace/Machine

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

The displayed detail resource information varies with the resource selected in the table

overview.

Name

Name of the resource.

MDE-MDM_82.docx

Version: 1.2.23297

Page 19 of 86

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

Machine Data Management

Cost center

Cost center of the resource.

Short name

Short name of the resource.

Resource family

Family the resource is assigned to.

Responsibility area

Responsibility area the resource is assigned to.

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

Main tab Resource configuration

Here, you can define the configurations and master data of resources.

General tab

Resource type

Resource type of the resource. The system delivery includes some default resource types. Create

additional resource types in the application .

Resource

Enter the number of the resource or workplace to be collected in this field.

The  resource  type  also  specifies  the  maximum  number  of  characters  that  are  allowed  for  the

resource number:

MDE-MDM_82.docx

Version: 1.2.23297

Page 20 of 86

Machine Data Management

-  Resources of the type MNR: a maximum of 8 digits

-  Resources of a type <> MNR: a maximum of 20 digits

Permitted  characters:  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_.-+#.  Do  not  use

spaces  and  other  special  characters.  For  technical  reasons,  you  can  enter  *  (asterisk)  and  %

(percent), but they are nonetheless not permitted because they are not valid characters. When you

exit the input field, the system automatically converts lower case letters into CAPITAL LETTERS.

Please note for workplaces/machines (resource type MNR):

For  technical  reasons,  the  system  does  not  check  the  maximum  number  of  digits  allowed  for

resources  of  the  type  MNR.  For  this  reason,  make  sure  that  the  resource  number  length  (=

workplace/machine number) does not exceed 8 digits.

Please note: If you set the resource type MNR before entering the resource ID (machine number),

the GUI only allows you to enter eight digits.

If  you  select  the  option  "numeric  machine  number"  (basic  parameter  settings)  for  use  with  DOS

terminals, you must ensure that the resource number (= workplace/machine number) only includes

numerical  digits  and  that  its  length  is  exactly  8  digits.  If  necessary,  prefix  leading  zeroes  to  the

number to extend it to eight digits, when creating the workplace/machine.

Short name

Short  name  of  the  resource.  Only  use  this  field  with  workplaces/machines  (resources  of  the  type

MNR).

Name

Use this field to assign a short, unique name to each resource. Reports and overviews as well as

terminal dialogs show this name, which is also useful for orientation purposes.

Responsibility area

Use  responsibility  areas  to  restrict  the  data  users  can  view  in  different  evaluations/reports.  Users

can only view the data they are allowed to according to their responsibility area authorization.

The responsibility area field can also remain empty. In this case, the resource is always displayed

regardless of the user's assigned responsibility authorizations.

If you leave the responsibility area field empty, the system automatically enters the value

"--DEFAULT--"  in  the  field.  Resources  including  this  value  are  always  displayed

regardless of the user's assigned responsibility authorizations.

Cost center

This field includes the cost center the resource is assigned to.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information in form of comments.

MDE-MDM_82.docx

Version: 1.2.23297

Page 21 of 86

Machine Data Management

Acquisition date, acquisition costs

Additional information in form of comments.

Configure the currency for the entire system in the basic settings.

Storage location

Location where the resource is stored when it is not being used (original storage location).

In connection with the Material and Production Logistics (MPL) product group, this field specifies a

material buffer. If you log on an input batch, the logged on input batch(es) will be transferred from

the previous material buffer to the material buffer entered in this field (upstream of the machine).

Delivery date, start-up date, guarantee date

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

External designation, resource type designation, usage, purchase order number

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Supplier and party in charge including detail fields

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Workplace configuration tab

This tab is only available if you select a resource of the type "MNR".

Workplace master data

Workplace category

N  Machine

P   Workplace

Defined  as  machine  or  workplace.  If  you  exclusively  use  BDE  and/or  MDE  and  PDV,  the  two

categories are identical as regards processing.

J   Machining center (BDE-BEA only)

The  "Machining  center"  category  and  its  functionality  are  described  in  detail  in  the  BDE-BEA

product documentation.

L

Line (MDE-SFL only)

A   Aggregate (MDE-SFL only)

The categories "Aggregate" and "Line" and their functions are described in detail in the MDE-SFL

product documentation.

Q  CAQ inspection station

Workplace is defined as mere CAQ inspection station and does not affect BDE or MDE statistics.

MDE-MDM_82.docx

Version: 1.2.23297

Page 22 of 86

Machine Data Management

R  Coil-based manufacturing (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

S  Cutting unit (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

D  Parallel output batches (only MPL)

You can produce parallel output batches on the machine for an operation that requires batch

management.

C  Packing station (only MPL)

You can use specific posting functions of the machine to represent a packing station. The functions

are described in detail in the AIP-LCS product documentation.

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

F      Laboratory/in-production inspection

This workplace is configured as inspection station. The inspection points are displayed, which are

assigned  to  this  workplace  or  machine  group  of  this  workplace  because  of  the  higher-level

inspection  point.  You  must  activate  the  workplace-specific  layout  here.  Use  the  following

parameters for activation in the AIP layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

W     Goods receipt inspection

This workplace is configured as inspection station. The goods receipt inspection points are

displayed, which are assigned to this workplace or machine group of this workplace. You must

activate the workplace-specific layout here. Use the following parameters for activation in the AIP

layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

K     Calibration

This workplace is configured as inspection station. The calibration inspection points are displayed,

which are assigned to this workplace or machine group of this workplace. You must activate the

workplace-specific layout here. Use the following parameters for activation in the AIP layout file

"globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

Workplace type

E  Single workplace (SWP)

G  Group workplace (GWP)

MDE-MDM_82.docx

Version: 1.2.23297

Page 23 of 86

Machine Data Management

Group workplaces are workplaces without machine data collection or MDE evaluations.

In  case  of  group  workplaces,  you  cannot  post  to  resource  performance  accounts  in  an

operation-related manner with postings based on the current machine status. Only main

production  times  (RPA  11)  are  recorded.  You  must  define  a  status  with  the  control

indicator "production" in the .

The system does not generate  for group workplaces. Therefore, MDE evaluations that

evaluate MDE log records are not possible.

Like single workplaces, you can assign group workplaces to terminals. In this case, you

have to make sure that the  is set to operation mode "BDE" or the option  Processing is

set to "BDE processing" in the .

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Locked

If  this  option  is  checked,  the  machine/workplace  has  been  (logically)  deleted.  In  this  case,  the

system does no longer permit the following changes:

- Order postings on the terminal

- Order postings on the MOC (e.g. using the "order overview" function)

- Changes when editing events

The  graphic  planning  board  of  the  Shop  Floor  Scheduling  and  the  application  Workplace

assignment do no longer show the machine/workplace.

Blocked  machines/workplaces  are  shown

in  evaluations  and  overviews.

If  blocked

machines/workplaces  are  not  shown,  this  is  then  described  in  the  relevant  documentation  of  the

MOC application.

Tip:  In  applications  where  data  is  selected  according  to  the  responsibility  area  authorization,  you

can hide machines/workplaces if you remove the responsibility area.

Company

Use this field to differentiate the individual machines/ workplaces. The system can use this field for

evaluation purposes.

Group

Use  this  field  to  assign  the  workplace/machine  to  a  logical  group.  In  planning,  this  is  a  capacity

group. Capacity groups combine primary capacities.

If  you  create  a  new  workplace,  it  is  automatically  assigned  to  a  group  of  the  same  name  (menu

BDE: Master data > Workplaces/machines > Groups), which is defined as a capacity group. If the

capacity group does not  yet exist, the system automatically creates a capacity  group and assigns

the workplace.

MDE-MDM_82.docx

Version: 1.2.23297

Page 24 of 86

Machine Data Management

Category

Enter the category of the machine. By means of this, you can enable a validation check according

to  the  BDE  configuration:  Master  data  >  Order  configuration  >  Order  types,  tab  validation,  option

Check planned workplace/group/category on OP logon (value category).

Year model

Enter a valid year model . The times to be posted are compared with this shift model when they are

recorded.  If  you  have  not  defined  a  planned  year  model  in  the  HLS  tab,  the  shift  model  entered

here is also used in the Shop Floor Scheduling.

Standard rate, machine

Enter the arithmetical standard rate of machines for calculations. The Shop Floor Scheduling uses

this value for some (evaluated) KPIs.

Standard labor rate

Enter  the  arithmetical  standard  labor  rate  for  calculations.  The  Shop  Floor  Scheduling  uses  this

value for the KPI "Evaluated labor utilization".

Performance level

You  can  enter  the  performance  level  of  the  workplace/machine  in  percent  in  this  field.  The  Shop

Floor Scheduling and the evaluation of material requirements integrate this value when calculating

the remaining run time.

Incentive wage indicator

Defines the type of calculation used for incentive wages. This option is mostly used in combination

with  the  incentive  wages  based  on  formulas  for  customer-specific  configurations.  In  addition,  use

the  "incentive  wage  indicator"  as  selection  criterion  for  the  wage  type  determination  to  calculate

incentive wages.

Leave this field empty, if you do not use the incentive wage module.

The incentive wages indicator G=group calculation has a special meaning. If this option is set for a

workplace/machine, you have to assign a premium group every time you log on an order. You can

do

this

either

via

-  the  "assignment  of  premium  groups"  option  of  the  product  group  Incentive  wages  or,  optionally,

via

- an additional field in the terminal dialog for the logon of orders. If no assignment is available, the

system rejects the logon of the order by issuing a validation error.

Therefore,  you  may  only  assign  the  incentive  wage  indicator  G  =  Group  calculation,  if  the

group premium conditions are met in the  incentive wages calculation, as otherwise orders

can no longer be logged on!

You can specify the meaning of the other incentive wage indicators according to your requirements

while customizing the system.

MDE-MDM_82.docx

Version: 1.2.23297

Page 25 of 86

Machine Data Management

File

You can assign a  graphic to each machine/workplace. The  workplace  overview  or the  AIP shows

this  graphic,  for  example.  The  following  image  formats  are  supported:  jpg,  gif,  tif,  bmp,  ico,  emf,

wmf.

In the path configuration, you must have configured the following:

- the path ID "MOCWPIMG" for the MOC or SMA

-  the  path  ID  “HYDRA”  (also  see  )  for  the  AIP.  The  file  name  length  of  graphic  files  is

restricted  to  12  characters  (8.3  notation).  Note  for  Linux  installations:  only  use  lower

case letters for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, define the maximum capacity in KG here.

Accuracy class, unit, etc.

  Information  fields  in  order  to  describe  the  accuracy.  These  fields  are  only  available  if  Test

Equipment  Management  (PMV-PPK  or  PMV-SVP)  is  licensed  and  the  right  "mdresgenh"  is

assigned.

Data collection

Display 3rd list

Use the options described here to show/enable a third list in the main view of a Windows terminal

(CTWIN / AIP). You can switch between the respective terminal lists depending on the options set.

The following settings are possible. Please note that the contents displayed in the lists depend on

the product group in use:

 Input material (MPL): shows logged on input materials/ batches.

 Resources (WRM): shows logged on resources and tools.

 Staff (BDE): shows logged on staff.

Output material (MPL): Produced output batches are displayed.

Show material/PRT list when OP is logged on

This option is only relevant in connection with the WRM module and the resources logged on to the

Windows terminals (CTWIN / AIP).

If this option is set and you log on an OP, a specific login dialog opens. This dialog includes a list of

components/production resources and tools. This list shows resources that meet at least one of the

following requirements:

- the option "posting to terminal" is set in the resource type;

- the option "log on with OP" is set to "explicit logon" for the resource.

- the resource is a so-called "required resource" (option is set for the resource).

Please note: If the workplace is relevant for MPL, the list also shows material components.

MDE-MDM_82.docx

Version: 1.2.23297

Page 26 of 86

Machine Data Management

Sequencing list

This  option  defines  which  operations  are  displayed  in  the  sequencing  list  of  the  terminal.  The

following settings are available:

S

Basic  setting.  The  system  takes  the  value  from  the  option  of  the  same  name  in  the

HYDRA basic settings.

M

Pool  of  workplaces.  The  terminal  sequencing  list  only  shows  the  operations  planned

for the workplace.

G

Pool  of  workplaces  and  groups.  The  terminal  sequencing  list  shows  operations  that

are:

- planned for the current workplace or

- for another workplace of the group or

- that are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  The  terminal  sequencing  list  only  shows  the

operations that are planned for workplaces of the selected category.

H

Group control. The terminal sequencing list shows the operations that are

- planned for the current workplace or

- for another workplace of the group.

Number of OPs in sequencing list

Enter the maximum number of operations that are to be displayed in the terminal sequencing list.

Enter 0 if you want to show all operations.

Compulsory sequence

Use  this  option  to  specify  if  it  is  mandatory  to  log  on  the  OPs  in  the  planned  sequence.  The

following parameters are permitted:

N

J

Disabled

Enabled

If the parameter is "enabled" and you log on an OP, the system checks whether the order backlog

for this machine/workplace includes an OP that is planned for the same time or previous to this OP,

but has not yet been started (i.e. status  = V/prepared). If yes, the system rejects the logon of this

OP.

Note:  If  you  plan  orders  in  the  system  using  the  Order  sequencing  (menu  Production  control  

Production  support    Order  sequencing)  and  you  configure  the  sequencing  list  with  any  other

option than "M" (pool of workplaces) and you enable the compulsory sequence, this might lead to a

combination that does not make sense.

Please note for the sequencing list:

MDE-MDM_82.docx

Version: 1.2.23297

Page 27 of 86

Machine Data Management



If the sequencing list includes operations that are in the status "interrupted", you can log on

these OPs at any time, irrespective of the specified compulsory sequence.

Dialog control

To meet this requirement, define a dialog control that deviates from the standard behavior for the

workplace in the dynamic dialog configuration of the Windows terminal (CTWIN / AIP). Then refer to

the dialog control in the dialog.

Use this configuration only as part of customizing the HYDRA system. Otherwise the configuration

is not relevant.

Logon of several OPs

Select this option, if several different operations should be processed on the machine. Otherwise,

the system only allows one operation to be logged on to the machine.

Possible values:

Y

Log on as many OPs as required at the same time.

Please note: The system allows a maximum of 20 operations to be logged on

simultaneously  to  a  machine,  if  the  machine  is  assigned  to  a  terminal  with

operation  mode  MDE.  If  more  than  20  operations  must  be  logged  on  at  the

same time, MPDV must review the conditions in order to remove the limitation.

If MPDV  agrees to remove the limitation,  you can do  so, otherwise search for

alternative solutions. MPDV analyzes the conditions as part of a service.

N

You can log on one OP only.

1...9

You can log on a maximum of n OPs.

Posting

Quantity posting to staff

Use this function to post the quantity of order interruptions/logoffs to the person  who is logged on

for the longest period.

Detailed information about quantity posting to staff can be found .

Posting for OPs that are not logged on

Use this option if you want to

- interrupt

- finish

- report part quantities for

operations that are not logged on to this workplace.

MDE-MDM_82.docx

Version: 1.2.23297

Page 28 of 86

Machine Data Management

If  you  record  quantities  for  an  operation  that  is  not  logged  on,  the  system  posts  these

quantities  onto  the  operation  in  the  BDE  module.  The  MDE  module  does  not  post  the

quantities.

If you want to use this function with the AIP terminal, the BDE posting dialogs that are installed by

default require the following:

- use the simplified BDE posting dialogs (the so-called "") or

- customize the dialogs.

Then you will be able to enter an operation that is not logged on.

Posting of machine time with simultaneously logged on operations

If  this  option  is  set  and  OPs  are  logged  on  simultaneously,  the  system  posts  the  machine  time

proportionately onto the operations.

Y

N

V

Z

Proportionate posting on OP according to the number of OPs

No proportionate posting. If the option is not set, the complete machine time is
posted for each operation.

According to the default quantity of the OPs. Make sure that the default quantity
(target quantity in primary quantity unit) of the operation is > 0.

According  to  the  standard  time  of  the  OPs.  Make  sure  that  the  standard  time
(processing time) of the operation is > 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces  and  in  general  you  should  better  not  use  this

option for group workplaces.

Automatic logoff of staff when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the order

type.

Use  this  option  to  configure  the  personnel-related  data  collection  at  MDE  workplaces.  If  you  use

HYDRA  MDE,  the  terminals  can  generate  fully  automatic  shift  ends.  You  can  configure  here  if

- the staff logged on to the workplace should be logged off automatically at the end of the shift or

- if they should remain logged on.

Y

N

X

Always log off staff when the shift ends.

Always save staff when the shift ends except for manual logoff.

Evaluate the person's settings. The system searches for the corresponding settings

of the person .

Automatic OP posting when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the order

type.

MDE-MDM_82.docx

Version: 1.2.23297

Page 29 of 86

Machine Data Management

Y

N

Interrupt and log on again at beginning of shift

Interrupt

Shop Floor Scheduling

Find further information about the HLS product group in the relevant HLS documentation.

Planning function

This  option  specifies  whether  a  workplace  or  a  machine  will  be  displayed  and  if  so,  in  which

planning function.

P

H

T

A

N

Planning  in  the  graphic  planning  board  of  the  Shop  Floor  Scheduling  or  in  the  graphic
order sequencing (GAV), i.e. you plan the workplace via the Shop Floor Scheduling or the
graphic order sequencing; the workplace is then displayed in these applications, but not
in the tabular order sequencing (AVG).

Note: There are also other settings that specify  whether a  workplace is displayed in the
Shop Floor Scheduling or in the graphic order sequencing:
- the workplace must be assigned to a group identified as a "capacity group"
- you must be authorized for the responsibility area of this workplace
- planning profile

Only relevant, if you use the HYDRA Shop Floor Scheduling module (HLS).

Like P.

Reserved

Planning  in  the  tabular  order  sequencing  (AVG),  i.e.  you  plan  the  workplace  using  the
AVG product group.

No planning; the tabular order sequencing (AVG), the graphic order sequencing and the
HLS module do not show the workplace.

Planned year model

Here, you can enter a special year model only used for planning in the Shop Floor Scheduling. This

year model does not affect data collection and posting in the product groups BDE/MDE. If you do

not  define  a  planned  year  model,  the  system  uses  the  year  model  (Master  data  tab)  for  the

planning.

Availability

Define the available capacity of a workplace/machine. The default value for the available capacity is

1000 [per mill].

In  the  Shop  Floor  Scheduling,  the  capacity  check  and  automatic  assignment  assume  that  each

operation  has  a  capacity  requirement  of  1000  [per mill],  i.e.  exactly  one  operation  can  run  on  the

workplace/machine at a time. In case of a manual multiple assignment, a dialog informs you about

the  double  assignment.  If  you  use  the  automatic  assignment,  multiple  assignments  are  generally

not feasible.

MDE-MDM_82.docx

Version: 1.2.23297

Page 30 of 86

Machine Data Management

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

When  you  operations  in  the ,  the system checks  whether  persons are planned in  the  application

for the time of the scheduling You will find further information on the display of personnel capacities

in the Graphic Planning .

This option is only available if you enable the extension .

MPL

For further information on the MPL product group, refer to the relevant MPL documentation.

Batch management

Activates  the  entry  of  the  batch  number  for  this  machine  within  the  terminal  posting  dialogs.

Possible values are:

N

L

D

J

No batch processing

Batch tracing (input/ output batches) as part of HYDRA MPL/TRT

Throughput batch processing as part of HYDRA MPL/TRT

Individual batch tracing (CHV)

The  following  functions  are  only  available  in  connection  with  the  product  group  Material  and

production logistics and are supported only by Windows terminals (CTWIN / AIP).

Preceding material buffer

Irrelevant.

MDE-MDM_82.docx

Version: 1.2.23297

Page 31 of 86

Machine Data Management

Subsequent material buffer

If you specify a material buffer in this field, the field Target buffer in each of the entry dialogs (e.g.

output batch change, log off operation) is automatically populated with this value.

If you do not enter a material buffer in the input dialog (e.g. deleted from the input field), the system

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

Generate transport order for input material

This  option  creates  an  article-related  transport  order  relating  to  a  material  component,  when  you

plan an operation for  a machine via the Shop Floor Scheduling module. Transport starts from the

output material buffer of the preceding operation. The configurations of the material  type  override

the corresponding options of the resource configuration.

Quantities tab

This tab is only available if you select a resource of the type "MNR".

Conversion factors for base quantity

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for  different

quantity accounts. In general, the system supports the following quantity accounts:

Yield

MDE-MDM_82.docx

Version: 1.2.23297

Page 32 of 86

Machine Data Management

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

The following quantity types are supported with each quantity account:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The system design specifies the use of several quantity types or accounts. For example: If you  want to

enter  the  rework  quantity  manually,  a  corresponding  input  field  must  be  configured  in  the  input  dialog

(customization).

Use the quantity type "primary quantity" if you want to collect quantities automatically.

Quantity units and conversion factors for base quantity

Define a quantity unit for each quantity type. Use the alternative quantity accounts to enter data/quantities

manually. In this case, the system does not convert quantities automatically.

If you do not enter data manually in the alternative quantity accounts, the server converts the quantities

into the alternative accounts using:

- the conversion factors or

- the units that are configured in the MOC machine master data.

For further information on the conversion of quantities and examples, refer to the document

.

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 33 of 86

Machine Data Management

conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate  the  quantity  unit  you  want  to  use  for  data  collection  at  this  machine/  workplace.  If  you

collect quantities automatically, these quantities are generally primary quantities.

If  you  want  to  convert  quantities  automatically  into  another  quantity  type,  indicate  the  conversion

factors for the base quantity here.

Units and conversion factors for base quantity (S)

Quantity unit (S)

Indicate  the  secondary  quantity  unit  you  want  to  use  for  posting  the  quantities  to  the

workplace/machine. If you want to convert quantities automatically, indicate the conversion factors

for the base quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Indicate the tertiary quantity unit you want to use for posting quantities to the workplace/machine. If

you  want  to  convert  quantities  automatically,  indicate  the  conversion  factors for  the  base  quantity

here.

Units and conversion factors for base quantity

Quantity unit (B)

Indicate the base quantity unit you want to use for posting quantities to the workplace/machine.

Manual entry of quantities, yield

Manual entry of yield

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of yield

Requirement: Set the option "Manual entry".

MDE-MDM_82.docx

Version: 1.2.23297

Page 34 of 86

Machine Data Management

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting yield as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, scrap

Manual entry of scrap

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of scrap

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting scrap as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

MDE-MDM_82.docx

Version: 1.2.23297

Page 35 of 86

Machine Data Management

Manual entry of quantities, rework

Manual entry of rework quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of rework

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting the rework quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, open quantity

Manual entry of open quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of open quantity

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case,

the entered quantity is deducted from the specified account.

MDE-MDM_82.docx

Version: 1.2.23297

Page 36 of 86

Machine Data Management

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting open quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

"MDE configuration" tab

This tab is only available if you select a resource of the type "MNR".

Monitoring

Monitoring type

Choose from the following monitoring types:

Monitoring via operating signal

No monitoring

Cyclic monitoring

If you select cyclic or operating signal monitoring, you can only enter a malfunction if the terminal

prompts  you  to  do  so  ("Assign  malfunction").  If  you  do  not  use  automatic  monitoring,  you  can

enter a new machine status at any time.

If  you  use  the  cyclic  monitoring  option,  the  machine  automatically  switches  to  the  "production"

status  when  counting  pulses  occur.  If  you  select  the  "operating  signal"  option,  the  machine

automatically  switches  to  the  status  "production"  as  soon  as  the  operating  signal  is  set.  If  you  do

not use the "automatic monitoring" option, you must assign the "Production" status manually.

Entry of disturbance reason required with specified delay time in [s]

You  can  only  use

this

function,

if

the

following  requirements  are  met:

- it is a Windows terminal (CTWIN, AIP)

-  The  Process  Communication  Controller  (PCC)  does  not  run  in  stand-alone

mode.

If the system identifies a downtime without a reason, the terminal opens the input dialog "Change

machine status" after the specified delay time. If the terminal goes back into production, the window

still remains open.

If  you now enter  a machine status (during production), this data  input  activates  a transfer posting

event  that  changes  the  most  recently  recorded  status  from  "General  disturbance"  to  the  newly

entered status. If this change is ok, the window closes; otherwise, it remains open.

MDE-MDM_82.docx

Version: 1.2.23297

Page 37 of 86

Machine Data Management

However, if the system identifies the next downtime (with or without a reason), you can no longer

change to the previously noted status. The window closes automatically.

If the system identifies another downtime without a reason and the delay time has expired, then the

input window opens as described above.

If the system identifies a downtime without a reason and the machine switches to production before

the delay time expires, then the terminal does not automatically prompt you to enter a malfunction

reason.

Important note:

This  change  only  affects  the  HYDRA  Machine  Data  Collection.  The  system  does  not  correct  the

resource performance accounts of the currently running OP online!

Please note for data maintenance:

The  tabular  event  maintenance  of  the  MOC  shows  all  changed  machine  statuses.  However,  you

cannot edit the transfer posting event as it is locked. In order to perform recalculations correctly with

respect to orders and machines, change the original event with the status "NOT ASSIGNED" to the

correct status. The transfer posting event does not affect recalculation!

Minimum malfunction time

Specify  a  time  in  seconds  for  the  minimum  malfunction  time.  This  value  defines  the  time  that  a

malfunction/disturbance must continue before the machine changes from the status "Production" to

the status "Not assigned".

If operating signals are monitored, the status is directly changed. You can use the following explicit

option in the MDEB2.ini to disable this behavior (deactivation of direct status change). Result: the

status is only changed when the minimum disturbance time has expired:

MDEB2.INI

[INIT]
;Activating the direct status change (globally or for a specific machine)
SetMStatusDirect=1
SetMStatusDirect@<machine number>=1

;Deactivating the direct status change (globally or for a specific machine)
SetMStatusDirect=0
SetMStatusDirect@<machine number>=0

Minimum cycle time

If you select the cyclic monitoring option, specify a minimum cycle time in seconds in this field.

The terminal uses this minimum cycle time and the target cycle that is stored with the (logged in)

operation  and  that  is  set  off  against  the  cycle  extension  to  calculate  the  maximum  value.  The

terminal uses this maximum value as the default cycle time.

MDE-MDM_82.docx

Version: 1.2.23297

Page 38 of 86

Machine Data Management

If both, the minimum cycle time and the target cycle stored for the operation, are 0, the default cycle

time is set to 60000 seconds [per 1000 machine clocks].

Cycle extension

If you select the cyclic monitoring option, enter the percentage for extending the target cycle time

in this field. Enter a value ranging between 0 and 5000.

The system offsets the target cycle stored with the (logged in) operation against this percentage. A

value less than 100 is a shortened cycle; a value greater than 100 is an extended cycle.

Number of target cycles

If you select the "cyclic monitoring" option, enter the number of cycles (0 to a maximum of 9) after

which  the  terminal  automatically  switches  from  a  status  unequal  to  "production"  into  the

"production" status within the cycle time (requirement: the status that is unequal to production is not

locked for the "production" status).

Some  production  processes  provide  machine  cycles  during  the  setup  phase.  Set  a  value  greater

than 0 in order to prevent the current machine status from changing immediately. Please note: The

quantities  you  collect  until  the  machine  switches  to  the  "production"  status  are  neither  posted  as

yield nor scrap.

Cycles to be evaluated

Reserved Enter 0 in this field.

Management

Posting during production lock

Use  this  setting  to  specify  how  to  post  the  counting  pulses  that  are  collected  while  the  status

"production" is suspended. This configuration takes effect for all counters configured as "Yield".

Posting as scrap

If this option is configured for the counter, the system offsets the counting

pulses  against the partitioning/ pulse factor and posts these pulses  as scrap.  Even  if  you  defined

another quantity account for offsetting, this one will not be used.

Posting as yield parts

the system posts the counting pulses as yield

No posting

the system does not post the quantities while the "production" status is suspended.

Pulse factor specific to machines

Use the pulse factor, for example, if you want to collect lengths (e.g. using a wheel).

Set  the  value  to  0  for  machines  where  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  is

collected  per  pulse.  In  this  case,  the  pulse  factor  is  not  evaluated.  That  means,  the  number  of

cycles posted corresponds to the actual pulses transferred via the MSS (machine interface).

MDE-MDM_82.docx

Version: 1.2.23297

Page 39 of 86

Machine Data Management

The MSS (machine interface) records the signals transferred from the machine (counting pulses).

According  to  the  configured  number  of  pulses,  the  system  calculates  and  posts  the  quantities  as

follows:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be calculated as a  fraction. When the quantity is calculated, the

pulse is used as denominator and the partitioning is the numerator.

The system interprets pulses that occur during a malfunction or a production lock (configuration of

Posting during prod. lock > scrap) as scrap. Also use the above-mentioned formula to calculate the

scrap quantities.

Partitioning specific to machines

Enter the partitioning specific to the machine in this field. Multiply the machine-specific partitioning

by  the  partitioning  stored  with  the  operation  in  order  to  integrate  the  machine-specific  partitioning

into quantity calculation. Enter the value 1 in this field, if you do not want this to happen.

Extended weekend automatic

If  you  select  this  option  and  the  system  is  configured  accordingly,  the  system  assigns  at  the

beginning of the shift the status that was available before status 999 was activated.

Note:

To use this option, the workplace must already be assigned to a terminal.

Find detailed information about the automatic activation of status 999 in the document .

Waiting period, short-term disturbance

Configure  a  short-term  disturbance  status  for  each  machine/  workplace  to  improve  the  overview,

e.g. in the machine history. Use this status as a “repository” for unconfirmed statuses, which only

existed for a specific (short) period.

If  the  terminal  automatically  identifies  a  downtime  and  the  machine  automatically  goes  back  into

production,  the  system  checks  if  this  disturbance  is  shorter  than  the  time  period  configured  for

short-term disturbances.

If this is the case, the still unfounded malfunction is justified with the status that is configured as the

"short-term disturbance" status for the machine.

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

Enter  the  logical  output  where  a  digital  signal  should  occur  when  the  corresponding  status  is

available.

MDE-MDM_82.docx

Version: 1.2.23297

Page 40 of 86

Machine Data Management

Machine lock output

The  system  sets  this  output,  if  you  enabled  the  option  "set

machine lock output" in the current machine status.

Target quantity reached output  The  system  sets  this  output,  if  the  collected  yield  reaches  the

target quantity of the OP.

Machine downtime output

The system sets this output, if the machine is in a status unequal

to  Production.  When  changing  to  the  production  status,  the

system sets the output back to 0.

Free I/O

Free input/ output for customizations.

Use these statuses for connecting a monitoring light or a horn, for example.

Enter the corresponding number in one of the fields in order to assign an output and to specify

which relay is interconnected by the terminal when the predefined status occurs. Enter "0" to

prevent any action. Note that you cannot assign a terminal output more than once.

Please note

Specify the statuses that trigger the activation of the machine lock in the Status assignment.

Generally, enter the value "1" in the input field, when the machine lock is activated via the available

relay output of a DS 100. In this case, the system sets the machine lock if

- a correspondingly configured status occurs and

- the status is not assigned.

Output batch change**

Customer-specific assignment of an input with an automatic output batch change (MPL). By default,

enter 0 in this field.

PDE (Process Data Collection)

Collect process data

This  parameter  specifies  if  the  system  collects  process  data  for  this machine.  If  this  parameter  is

not set for a machine, you cannot collect process data for this machine.

External connection

The AIP 8.2 and/or the PCC in stand-alone mode (MDE-Blade 2 Version 8.1.0.1) do no longer

support the options marked with **. As they use other configurations for the connection.

MDE-MDM_82.docx

Version: 1.2.23297

Page 41 of 86

Machine Data Management

External connection

If this machine is assigned to a master terminal the following connection options are available:

No external device

External devices are not connected

DS100

DS100 connection

Arburg control system**

Arburg connection

Engel interfacing**

Connection of Engel machines

MT3**

PDE**

MT3 connection

Process data collection

If  you  activate  a  DS100  or  MT3**  connection,  you  can  select  the  field  "device  address".  If  you

activate the option "Engel interfacing",  you can select the field "serial number". If  you activate the

option "Arburg server system", you can select the field "class".

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device": allowed

"MT 3" and "No external device": allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)**

Enter the serial number of the connected Engel machine. Set the option "EMS machine interface" in

the HYDRA basic parameter settings  if you want to use Engel machines.

Device address

You can select this field, if you activate a DS100 or MT3** connection. Enter the device address of

the sub-bus participant.

"Resource configuration" tab

For resources of type "MNR", only the fields marked with "*" are available:

  Family (section resource master data)

  Cycles (section target utilization)

  Runtime (section target utilization)

Resource master data

Type

Identifies the type of resource:

Resource: A resource can be uniquely identified, i.e. the resource is actually present. Its quantity is

always 1.

MDE-MDM_82.docx

Version: 1.2.23297

Page 42 of 86

Machine Data Management

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  you  can  change  the  value  in  the  field  Number  from  1  to  another  positive  integer  value.  You

cannot post  data onto  anonymous resources because anonymous resources do not relate to  one

specific resource.

Required  resource:  A  required  resource  stands  for  one  or  more  actual  resources  that  can  be

identified.  Specify  in  the  configuration  WRM:  Master  data  >  Required  resources  which  resources

are represented by a required resource. The number results from the number of actual resources

assigned to the required resource.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future modifications.

Version

Revision number; store here the program version for resources of the type DNC.

Quantity

You  can  only  edit  this  field,  if  it  contains  an  anonymous  resource  and  the  option  Anonymous

resource is set (see above). A value > 1 indicates how many of these resources are available.

This field is calculated automatically for required resources.

Family*

Assign  a  resource  family.  If  you  change  the  resource  family  subsequently,  an  information  dialog

appears as a warning because user fields might possibly be assigned via the resource family.

Target utilization

Cycles*

The field Cycles provides additional information. The cycles value defines how long the resource is

to be used.

Runtime*

The field Runtime provides additional information. It defines how long the resource is to be used.

Input unit

Input unit

Absolute value limit (EMG 8.1, function authorization: resablim)

Enter the absolute value limit of the (meter) resource. The energy monitor shows this limit value in

addition  to  the  current  meter  reading.  Use  the  Escalation  Management  to  generate  an  escalation

message, if the counter value of the resource exceeds the specified absolute value limit. You need

the function authorization "resablim" to view this field.

MDE-MDM_82.docx

Version: 1.2.23297

Page 43 of 86

Actual utilization

The periods when a resource was logged on to a workplace are the basis for posting the cycles (clocks),

Machine Data Management

runtime, yield, and scrap as actual utilization.

Clocks

The cycles (clocks) posted for the resource up to now.

Runtime

The total time in hours posted for the resource up to now. The total time is the sum total of all times

posted onto RPA 1 to 11.

Yield (B)

The yield posted for the resource up to now (base quantity unit).

Yield (P)

The yield posted for the resource up to now (primary quantity unit).

Scrap (B)

The scrap posted for the resource up to now (base quantity unit).

Scrap (P)

The scrap posted for the resource up to now (primary quantity unit).

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and

for the machine data collection at the terminal.

Original partitioning

Partitioning of the tool (= number of cavities) when using this tool.

Current partitioning

Current  partitioning  of  the  tool.  This  value  can  deviate  from  the  original  partitioning,  e.g.  if  the

original quantity can no longer be produced with one cycle/clock due to a tool defect.

Always use the current partitioning to post cycles to the tool.

Please note: The partitioning stored in the OP is relevant for the planning in the HLS module and

for the machine data collection via the terminal.

Partitioning due to cavities

If  you  set  the  option  "partitioning  due  to  cavities",  the  system  (re-)calculates  the  fields  "current

partitioning"  and  "original  partitioning"  using  the  values  defined  in  the  cavity  management.  Then,

you can no longer change the fields manually.

MDE-MDM_82.docx

Version: 1.2.23297

Page 44 of 86

Machine Data Management

Log on with OP

Use this option to specify whether or not you want to log on the resource with the OP. To do so, the

resource must be included as a component in the operation's list of production resources and tools.

Possible values:

None:

The resource is not logged on.

Implicit:  The  system  automatically  (implicitly)  logs  on  the  resource  that  is  assigned  to  the

operation  as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  manually

(explicitly) nor change the logon.

Explicit:  You  can  manually  (explicitly)  log  on  the  resource  that  is  assigned  to  the  operation  as  a

production resource and tool or you can log on another resource instead. If you do not log on the

resource  or  another  resource  explicitly,  the  system  implicitly  (automatically)  logs  on  the  current

resource; in this way, the current resource serves as a "default".

Please note:

If you log on another resource explicitly (manually), this resource will be logged on for the resource

that has the same  resource type in the operation's list of production resources and tools. For this

reason, you can only log on those resources explicitly (manually) that are included as a requirement

in the operation's list of production resources and tools. In this way, you cannot log on a resource

that is not included as a requirement in the list of production resources and tools (the resource must

be entered in the list).

In general,  you should not enable this option for the resource type DNC. The DNC product group

handles this differently (NC programs are logged on separately).

The system also logs on resources that are defined in the BOM of the machine.

Parallel logon/ planning possible

You can log on/plan the tool simultaneously.

Please note:  You can only log on a resource to one  machine more than once.  Consequently, the

option "Parallel logon possible" refers to several different OPs logged on to one machine.

In this case, the system posts data proportionately as follows:

  Post quantities proportionally.

  Post times 100% for each resource. This means that the system posts double the time to

the resource, if the resource is logged on twice.

Post to resource

Specifies whether or not the quantities and times are posted to the resource. Due to a high degree

of  complexity,  you  should  only  assign  this  option  to  those  resources  that  you  actually  want  to

evaluate.

MDE-MDM_82.docx

Version: 1.2.23297

Page 45 of 86

Machine Data Management

Collective lock

If you lock a lower-level (assigned) resource using the BOM function, the system sets a collective

status for the higher-level resource. If this collective status is set, the system treats the higher-level

resource as locked when a download request is made.

If you enable this function, the system passes the collective lock to the higher-level resource.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Teardown/retooling time

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

Not used. The system uses the configuration option of the same name stored in the resource type

to integrate the resource allocation in the HYDRA Shop Floor Scheduling.

Evaluation

Integrate in evaluations

Reserved for future modifications.

File

File exists

Shows whether or not the file is stored in the specified path. A cyclic process checks the files and

sets the options subject to whether or not the file is available.

File name

File  name;  without  file  extension  for  DNC.  The  system  adds  the  file  extension  according  to  the

configuration in the resource type. The defined paths specify the storage location.

Comparison resources

Enter  two  comparison  resources  for  energy  consumption  resources.  They  will  then  be  shown  in

comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resource to be compared.

MDE-MDM_82.docx

Version: 1.2.23297

Page 46 of 86

Machine Data Management

Resource type 1

Resource type of the resource to be compared.

Resource 2

Resource number of the resource to be compared.

Resource type 2

Resource type of the resource to be compared.

Accuracy

Enter  more  detailed  information  on  measuring  accuracy  and  measuring  range  for  test  equipment

resources.

Tab User fields

You can use user fields to store additional customer-specific information in the MES. The user fields tab

includes  eight  sub-index  tabs,  which  each  has  eight  additional  user  fields.  The  so-called  user  field  key

specifies the available user fields and their meaning.

The workplace and resource configuration provides data of two basic object types. You can also edit this

data in the workplace and resource configuration: on the one hand these are machines and workplaces

and on the other these are the resources. Machines and workplaces are also "resources". But resources

are not automatically machines and workplaces.

Object type

The system configures the user fields of machines/workplaces in relation to the object type "MNR".

The system stores data contents to the machines/workplaces table and the resources table of the

database to ensure data consistency.

The system configures user fields for resources in relation to the object type matching the resource

type  of  the  resource  (example:  create  resources  of  the  type  "PAC"  in  relation  to  the  object  type

"PAC"). The system stores data contents to the the resources table of the database.

User field key

Each user field key describes a combination of user fields. The management of the user field key

(and therefore the meaning of the fields) is different for each object.

User fields

The following user fields are available after configuration:

Field data type
Date
Numeric,
time, duration
Decimal value
Text field, length 1

Number of fields
6
16

6
16

MDE-MDM_82.docx

Version: 1.2.23297

Page 47 of 86

Machine Data Management

Number of fields
Field data type
6
Text field, length 10
14
Text field, length 20
2
Text field, length 40
Each page shows a maximum of 8 fields.

By default, no user field keys are  defined. Configure the system accordingly to support

this kind of user fields.

As the table shows resources of different types, use the user field key "SYSTEM" of the

object "RES" to identify the column headings for the user fields.

Comment tab

Store additional resource comments in the "comment" tab.

Main tab Resource attributes

Shows  additional  resource  attributes  via  the  user  field  definitions  of  the  resource  family.  Use  the

"resource attributes" button for editing.

Main tab Resource list

Shows  the resource  list for the selected resource. Click the "resource  list" button to go directly to

the BOM application for editing purposes.

Main tab DNC versions (available as of DNC 8.2)

Shows the available versions of a DNC resource including a flag indicating the currently applicable

version. HYDRA provides this valid version for machine downloads.

Toolbar

General tab

Insert

Function authorization: mdres.create

Opens  the  dialog  for  adding  a  resource.  This  dialog  provides  the  fields  that  match  the  selected

resource type.

MDE-MDM_82.docx

Version: 1.2.23297

Page 48 of 86

Machine Data Management

Copy

Function authorization: mdres.copy

Opens  the  dialog  for  copying  an  existing  resource.  Subject  to  the  selected  resource  and  its

resource type, the copy function differentiates the following:

  Copy function for resources of resource type = MNR (workplaces, machines)

  Copy function for resources that do not have the type MNR

Copy function for resources of resource type = MNR (workplaces, machines)

From: resource type, resource, short name, name

  Resource type (fixed "MNR“)

  Workplace/machine number

  Short name

  Name

of the workplace you want to copy. You cannot change these values. They derive from the

selected data record.

To: resource type, resource, short name, name

  Resource type (corresponds to the resource type of the workplace you want to copy;

cannot be changed).

  Workplace/machine number

  Short name

  Name

of the target workplace.

Copy machine status

Function authorization: mdmst.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Copy counter configuration

Function authorization: mdctr.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Note  that  the  counter  numbers  of  the  new  workplace  are  identical  with  the  counter

numbers  of  the  workplace  you  copied.  If  necessary,  you  have  to  adjust  the  counter

numbers.

Copy reasons

Function authorization: mdreas.copy

MDE-MDM_82.docx

Version: 1.2.23297

Page 49 of 86

Machine Data Management

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Copy function for resources that do not have the resource type MNR

The  copy  function  for  all  resources  that  do  not  have  the  type  MNR  opens  the  "insert"  dialog  and

takes over the details from the previously selected resource. But you can edit and change all fields.

Edit

Function authorization: mdres.edit

Opens the dialog to edit a resource and provides the tabs and fields of the relevant resource type.

As of MES Weaver 4.0pe, you can change master data of several selected resources of the same

resource type at the same time. You can select up to 10 fields and assign a value. You require the

function authorization mdresmm to edit several resources at once.

  Delete

Function authorization: mdres.delete

Deletes one or several selected resources.

Resource tab

 Configuration – resource status

Opens  the  application  "resource  status"  to  define  statuses  for  all  resources  that  do  not  have  the

type MNR.

 File - show file

Opens  the  file  view  –  only  available  for  document  resources,  which  are  configured  as  file-based

resources without DNC processing in the Resource type. And only available if the relevant license

and function authorization are available.

 Go to - resource list

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is  entered as default  value for

the required resource.

MDE-MDM_82.docx

Version: 1.2.23297

Page 50 of 86

Machine Data Management

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – Measures

Opens the Measures application.

 Functions – Status change

Opens  the  dialog  to  change  a  resource  status.  The  checkbox  Including  subordinate  resources  is

not relevant and reserved for future extensions.

 Functions – Release of resource

Opens  the  dialog  to  release  a  resource.  The  checkbox  Including  subordinate  resources  is  not

relevant and reserved for future extensions.

 Functions – Stock transfer

Opens the dialog to transfer/relocate a resource.

Workplace tab

 Configuration – status assignment

Opens  the  application  "status  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – counter configuration

Opens  the  application  "counter  configuration".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – terminal assignment

Opens  the  application  "terminal  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

MDE-MDM_82.docx

Version: 1.2.23297

Page 51 of 86

Machine Data Management

 Entry – reasons

Opens  the  application  "reasons".  The  system  enters  the  selected  resource  in  the  corresponding

field.

 Entry – Operator positions

Opens  the  application  "operator  positions".  The  system  enters  the  selected  resource  in  the

corresponding field.

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

DNC tab

The  tab  is  only  available,  if  you  select  a  DNC  resource.  These  are  resources  configured  as

resources with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application.

MDE-MDM_82.docx

Version: 1.2.23297

Page 52 of 86

Machine Data Management

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

  Copy resource attributes (as of DNC 8.2)

Copies values of resources attributes from one resource to another. Both resources must use the

same user field key.

  File - comparison editor

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  See  below  for  further

information.

 File - export

Exports the file specified for the resource. You use the file explorer to specify the target file.

 File - import

Imports the file specified for the resource. You use the file explorer to specify the source file.

 File - viewer

Opens the file specified for the resource using the defined viewer program.

 File - editor

Opens the file specified for the resource for editing using the defined editing program.

 Set valid version (as of DNC 8.2)

Only active, if you select a version in the DNC versions tab. The selected version is set as the new

and valid version.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

MDE-MDM_82.docx

Version: 1.2.23297

Page 53 of 86

Machine Data Management

 Functions – Status change

Opens the dialog to change a resource status.

 Functions – Release of resource

Opens the dialog to release a resource.

How to use the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  Two  operation  modes  are

available:

Selection of one resource:

The  editor  shows  the  released  resource  and  the  optimized  version  of  the  resource  for

comparison.  You  can  change  the  file  displayed  on  the  right-hand  side  of  the  editor.  Once  you

have  made  the  changes,  the  comparison  editor  transfers  these  changes  to  the  system,  like  the

simple editor. You can only use this mode for DNC types with the file processing type "optimized".

Selection of two resources:

MDE-MDM_82.docx

Version: 1.2.23297

Page 54 of 86

Machine Data Management

If you select two resources before you open the  comparison editor, the editor compares the two

selected resources. You can select the file  type. You can change the file displayed on the right-

hand side of the editor. Once you have made the changes, the comparison editor transfers these

changes to the system, like the simple editor.

Click the relevant buttons or use the context menu (right clicking) to start the functions of the comparison

editor:

-  Reject: Rejects the difference identified (on the right). Accepts the value from the left file.  The

editor does no longer highlight the difference.

-  Keep:  Accepts  the  difference  identified  (on  the  right).  The  editor  does  no  longer  highlight  the

difference.

-  Next difference: Goes to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row. Click the row and enter a value. Press ESC to

quit the row without changes. The editor then highlights the row as "changed".

-  Swap  windows:  Click  this  button  to  swap  the  windows.  This  function  is  necessary  if  you

compare two resources. The place where a resource is displayed results from the display order

in the table; the system does not know, which resource must be changed. If you only select one

resource, this button is not available as in this case you can only change the optimized program

version.

-  Save: Saves the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration changes

Restart  the  terminal  which  the  workplace/machine  is  assigned  to  in  order  for  the  terminal  program  to

interpret the configurations or modifications made to this workplace/machine.

Deleting a machine/ workplace

In a first step, the system shows a confirmation prompt asking if you really want to delete the machine. If

you  confirm  this  prompt,  the  system  makes  an  attempt  to  delete  the  workplace.  You  can  only  delete  a

workplace successfully, if:









you have not yet collected data for the workplace;

you have currently not assigned the workplace to a terminal or a line;

you have currently not logged on operations to the workplace;

you have not planned operations for the workplace.

MDE-MDM_82.docx

Version: 1.2.23297

Page 55 of 86

Machine Data Management

If  you  delete  the  workplace  successfully,  the  system  also  deletes  all  configuration  data,  e.g.  status

assignments, for this workplace.

Checking Business Parameter Containers (BSCs)

See  for further details on how to check the system against business parameters.

MDE-MDM_82.docx

Version: 1.2.23297

Page 56 of 86

Machine Data Management

8  Status Texts

Overview

FEDRA menu

Master data  Workplaces/ machines  Status texts

FEDRA menu

Master data  Workplaces/ machines  Status texts

Transaction code

Mstt

Function authorization  Mdmstt

In  the  status  text  dialog,  all  possible  states  (statuses)  are  designated  with  a  descriptive  text.  These

descriptions  are  then  used  in  the  status  assignment  performed  later.  The  objective  is  to  use  standard

status texts for all workplaces and machines.

Purpose

In  the  status  text  dialog,  all  possible  states  (statuses)  are  designated  with  a  descriptive  text.  These

descriptions  are  then  used  in  the  status  assignment  performed  later.  The  objective  is  to  use  standard

status texts for all workplaces and machines.

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 57 of 86

Machine Data Management

Color

You  also  have  the  option  to  assign  a  color  to  a  status  text.  This  color  is  taken  into  account  at

various places in MOC.

Recommendation:

When  setting  up  a  new  status  text,  the  status  number  should  preferably  match  the

number of the status that will later be created during status assignment.

Example:  The  status  text  2  "Set  up"  should  be  assigned  to  the  status  2  during  status

assignment.

MDE-MDM_82.docx

Version: 1.2.23297

Page 58 of 86

Machine Data Management

9  Status Assignment

HYDRA menu

Master data  Workplaces/ machines  Status assignment

FEDRA menu

Detailed scheduling  Master data  Status assignment

Transaction code

mst

Function authorization  mdmst

You  can  create  statuses  for  all  workplaces/  machines.  The  status  shows  the  current  status  of  the

workplace/ machine.

Purpose

All possible statuses or malfunctions at the machine/workplace are configured in the  Status assignment

and assigned to the status texts by distinct status numbers. If malfunctions are detected on the terminal,

the system uses the statuses documented in the status assignment.

Example of how a status table is set up :

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

Control indicator

Production  Malfunction  Malfunction  Malfunction  Malfunction  Malfunction

Gen.

disturbance

Manual assignment via















the terminal (Manually at

terminal)

Automatic assignment















via digital input

Digital input

Assignment on the

machine interface

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 59 of 86

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

Gen. disturbance

This is only an example illustrating the status assignment.

The  selection  dialog  allows  you  to  select  and  view  the  statuses  that  have  already  been  assigned  to  a

machine or a workplace.

Integration

The workplace/ machine status is integrated in various evaluations/reports.

Requirements

You have to create the following objects before you can assign workplace/ machine statuses.

  Workplace/machine

  Status text

  Status class (optional)

  Resource Performance Account (RPA)

Toolbar

Status list

Click the "Status list" icon to open the report including the defined and selected statuses.

This report shows the statuses in printable form as plain text and as bar code. Click here

Machine status list report to find detailed information.

Selection criteria

The application provides the following selection criteria:

Workplace

Select the workplace/machine for which you want to display the statuses.

MDE-MDM_82.docx

Version: 1.2.23297

Page 60 of 86

Status

Select  the  defined  workplace/machine  statuses.  The  application  shows  the  statuses  of  all

Machine Data Management

workplaces/machines matching the entered status number.

Status text

Select the defined status text. You can also use wildcards.

RPA abbrev.

Abbreviation for the assigned Resource Performance Account

Status class

Abbreviation for the assigned status class

Field descriptions

Notes on status 30000

You can only change selected options for status 30000:

  Warning in the graphic machinery

  Activate production lock

  Activate machine lock

  Record scrap reasons

Certain fields such as status class, RPA, control indicator are not filled with this status and are

therefore empty in the list.

General tab

Machine/workplace (short name)

Enter the machine number to assign the disturbance status to a machine. Enter the same number

in this field for all statuses of a machine in order to create a complete status table for a machine.

The short name includes the name of the entered or selected machine.

Status

This  field  includes  the  unique  number  for  statuses  included  in  the  status  table.  You  can  also  use

this number to assign and/or change the status via the terminal.

You can only define one status for workplaces of the type "group workplace". Assign the

characteristic "production" (see "control" tab) to this status.

Note: You cannot delete the status 30000 "Not assigned". You can only configure specific fields for

this status.

MDE-MDM_82.docx

Version: 1.2.23297

Page 61 of 86

Machine Data Management

Superior status

If no status is defined in the Superior status field, the currently created status is at the highest level.

Otherwise,  enter  the  number  of  the  directly  superior  status.  This must  already  exist  and  have  the

control indicator Hierarchy level.

Note: This function is available only for Windows terminals.

Status text

The number assigned here refers to the plain text status message from the status text table.

Status class

Assign a status to a status class to make cumulative evaluations/reports about status classes. The

abbreviation assigned here refers to the plain text status class message from the status class table.

Resource Performance Account (RPA)

Enter  a  value in this field to assign the status to  a Resource Performance Account (RPA).  Select

one of the 12 Resource Performance Accounts (RPA).

By  default,  the  12  Resource  Performance  Accounts  are  already  defined  in  HYDRA.  Refer  to  the

glossary for further information on the Resource Performance Accounts.

Control tab

Control indicator

The following characteristics are available to specify machine monitoring.

Except  for  the  "production"  characteristic,  all  following  characteristics  are  only  allowed  for

machines/workplaces of the type "individual workplace".

Production

Production  identifies  the  production  state/status  of  a  machine/workplace.  Assign  the  "production"

characteristic to exactly one status for each workplace.

If

the  machine  monitoring  system  detects  production  signals,

then

the  status  of

machines/workplaces of the type "single  workplace" is changed to the status to which this control

indicator is assigned.

Only  one  status  is  allowed  for  workplaces  of  the  type  "group  workplace"  and  this  status  must  be

assigned this control indicator.

Other status

Assign  the  control  indicator  "other  status"  for  all  statuses  without  a  control  indicator.    You  can

assign this control indicator/characteristic to any number of statuses for each individual workplace.

MDE-MDM_82.docx

Version: 1.2.23297

Page 62 of 86

Machine Data Management

General disturbance

Create exactly one status as general disturbance for each machine/workplace. If the machine data

collection detects a production phase that has not yet been assigned a disturbance or status, then

this duration is posted to the status assigned to the control indicator for the general disturbance.

Material change

This option is only available with the MPL module.

If a workplace has a status with this indicator, materials that are not planned can also be logged on.

These  materials  are  logged  on  as  alternative  material,  which  means  that  you  log  on  some  other

material  instead  of  the  planned  material.  You  can  specify  in  the  status  assignment  if  alternative

materials may be logged on. As a result, you have to configure at least one "Setup" status with the

"Material  change"  option  in  order  to  enable  the  desired  posting  behavior.  If  the  machine  is  in  a

status that is assigned the "material change" option, you can log on the alternative material already

when you log on the operation. In this case, you do not even have to change the status beforehand.

No order

If  you interrupt  or log off an operation manually, the  Windows terminal verifies whether this  is the

last operation of the workplace. If no more operations are logged on to this workplace, the terminal

sets the workplace status to the status assigned to the "No order" option.

This option is only available for Windows terminals (CTWIN/AIP).

A  status  with  this  control  indicator  may  only  be  configured  at  machine/workplace  of  the

type "single workplace". You may configure only one status with this control indicator.

Do not configure a status  with  the control indicator  "No order"  at  workplaces of the  type

"group workplace", since only the status "Production" is available at group workplaces.

Short-term status (as of MDE 7.2)

For an optimized overview, for example in the status log or machine history, you can configure one

status per machine  as a short-term disturbance.  Use this status as a “repository” for unconfirmed

statuses, which only existed for a specific (short) period.

If  the  terminal  identifies  a  downtime  and  the  machine  automatically  returns  to  the  status

"production",  the  system  verifies  if  this  disturbance  took  less  time  than  configured  for  short-term

disturbances.

If this is the case, the still unfounded malfunction is justified with the status that is configured as the

"short-term disturbance" status for the machine.

The system does not differentiate between such automatic status postings (automatic assignment

of reasons) for short-term disturbances and reasons entered manually by operators. The duration of

short-term disturbances is ignored with automatic shift changes.

MDE-MDM_82.docx

Version: 1.2.23297

Page 63 of 86

Machine Data Management

Hierarchy level

Assign  the  option  "hierarchy  level"  to  statuses  that  cannot  be  recorded  via  the  terminal.  These

statuses only represent the hierarchy.

This  function  is  only  available  for  Windows  terminals.  In  this  case,  you  can  neither  change

specific configurations nor enter data in certain tabs.

Estimated downtime

If you assign a status manually, you can enter an estimated downtime. In this case, the application

suggests the downtime that is stored in the master data.

If statuses are changed automatically, the system assigns the downtime stored in the master data

automatically.

Activate production lock

If this option is set, the production lock (P lock) is automatically activated when a status is assigned

via the terminal.

If you use the machine monitoring function, the  production lock option prevents the machine from

switching automatically to the status "production" when a production signal arrives. Consequently,

this  status  overrides  the  production  signal  until  you  manually  disable  the  production  lock  option.

The production lock can also be used to determine whether and how quantities (counter readings)

are posted during this time.

Setting the machine lock output

You have to set this option, if you want the machine lock to be enabled when assigning statuses.

In this case, you also have to ensure that the machine lock output has been configured accordingly

in the machine configuration.

Warning in the graphic machinery

The  entry  determines  the  time  after  which  the  symbol  (more  precisely:  the  part  of  a  symbol  that

represents the status in color) starts flashing in the Graphic machinery after the workplace/machine

status has occurred. Enter the value in the format hours: minutes: seconds.

Status change tab

Manually via the terminal

If  this  option  is  selected,  you  can  enter  the  status  manually  via  the  terminal  (using  barcode  or

keyboard). If this option is not selected, the status selection list of the terminal will no longer show

the status.

MDE-MDM_82.docx

Version: 1.2.23297

Page 64 of 86

Machine Data Management

Authorization

Access  authorization  for  entering  a  status  via  the  terminal  (enter  a  value  between  0  and  9).  An

authorization  level  for  machine  status  modification  is  defined  for  every  person  in  the  HR  master

data. If the authorization level stored in the master data is lower than the authorization level defined

here, you cannot assign the status via the terminal.

Automatically via digital input

Select this option, if you want the statuses to be assigned automatically via the machine interface

(CT-MSS, CT-UMPS, PCC). Enter the number of the digital input identifying the status in the "digital

input" field (0 = no input).

If you monitor machines via the operating signal  , a digital input also records the operating signal.

Proceed as follows to define a status as an operating signal:

- Control for machine monitoring: "Production"

- Select the option "Automatically via digital input"

- Enter a value > 0 in the "digital input" field. This input records the operating signal.

In  the  case  of  disturbance  reasons,  a  general  distinction  is  made  between  automatically  and

manually recorded disturbance reasons. Distinguishing features are:

  Disturbance  reasons  you  enter  manually  at  the  terminal  override  automatically  set

disturbance reasons.

  Operating  signals  do  not  override  a  status  you  set  manually.  Except  for  operating

signals for the status "production" (see next bullet point).  The  "production" status also

overrides a manually set status.

If  no  production  lock  is  set,  the  status  with  the  control  indicator  "Production"  overrides  every

disturbance reason. Therefore, keep in mind that the status "Production" must be deactivated, if

you want a current disturbance to be processed at the input.

If  multiple  automatic  statuses  (disturbance  reasons)  are  recorded  via  digital  inputs,  the  status

with the lowest HYDRA channel number (not the lowest status number!) is set.

Note that the assignment of the number to the physical connection at the MSS depends on the

settings  in  the  local  terminal  configuration  file  (Windows  terminal:  CTWIN.INI/CTAIP.INI,  DOS

terminal: AIOP.CFG).

If  a  status  is  to  be  processed  automatically  by  the  machine  based  on  the  transferred  HYDRA

status number (MSTAT), this option "Automatically via digital input" must be activated and the

field "Digital input" must be assigned the value "0".

If a digital input and a status number (MSTAT) for a machine status are set at the same time for

a machine, the status of the digital input at the machine is set. The digital input therefore has a

MDE-MDM_82.docx

Version: 1.2.23297

Page 65 of 86

Machine Data Management

higher priority than the status via MSTAT.

Digital input

Number of the digital input used to set the status.

Status transfer to aggregates

This option allows you to set a global status at the production line, which is then automatically set

for all aggregates assigned to it.

The requirement for this is that this status is also configured for all assigned  aggregates and that

the status number for the aggregates is identical to the status number of the production line.

Processing tab

Log off staff

Please note: the weekend automatic function (status 999) does not support this option.

If  you  select  this  option,  the  system  logs  off  all  persons  currently  logged  on  when  a  status  is

assigned (useful during maintenance phases). Otherwise, the persons stay logged on.

Operation posting

Please note: the weekend automatic function (status 999) does not support this option.

Use the option "operation posting" to have an overhead cost order logged on automatically when

statuses change. The following options are supported:

None

No processing.

Interrupt OP

Use this setting to interrupt automatically all active operations and to log off all employees from the

workplace if this machine status is set.

Interrupt active OP and log on the following OP

Use  this  option  to  interrupt  all  active  operations  and  to  log  off  all  employees  when  statuses  are

changed.  The  system  automatically  logs  on  the  "subsequent  operation"  stored  in  the  Operation

field.

Please note: The subsequent operation must not be subject to batch management.

Transfer registered persons to OP

Depending on this setting, the system transfers the persons logged in to the "subsequent operation"

defined in the Operation field.

MDE-MDM_82.docx

Version: 1.2.23297

Page 66 of 86

Machine Data Management

If the operation is an overhead cost operation  or if the workplace is a group workplace (GAP), then

at least one person is logged on to the subsequent OP:

- either the person carrying out the posting, or

-  the  person  who  is  logged  on  the  longest  if  the  change  status  dialog  does  not  include  a  field  to

enter the staff badge number. If no employee is logged on  at this time, the subsequent operation

cannot be logged on.

Scrap reason

Depending on the current status, you can post automatically recorded scrap to a defined reason.

A  distinction  is  made  in  the  process,  whether  the  production  lock  is  set  or  not  while  the  status  is

active. You can choose from the following configuration options:

- scrap reason

- scrap reason during production lock

A counting input explicitly defined as a scrap counter generally takes priority over a reason defined

here.

Plausibilities tab

Check running operation

You can configure statuses,

- if an OP is logged on to the workplace

  Use Option An operation must be logged on

- if no OP is logged on to the workplace

  Use Option An operation must not be logged on

- if an operation is logged on to the workplace or not

  Use Option No check

HYDRA  checks  this  dependency  during  the  manual  status  change  and  during  the  manual

login/logout or interruption of operations. If the posting violates the condition, the terminal issues an

error message and refuses the posting.

If  a  new  status  is  set  when  an  operation  is  terminated  or  interrupted,  then  this  status

cannot be an order-related status!

Use of unplanned material allowed

This option is relevant if you use the HYDRA module Material and Production Logistics (MPL). If the

option  is  set,  you  can  use  unplanned  material.  That  means,  you  can  log  on  batches  that  are  not

specified in the input material list of the operation as input material. This can be useful during setup.

MDE-MDM_82.docx

Version: 1.2.23297

Page 67 of 86

Machine Data Management

Tab User fields

User field key

This field of the object type MST is preset with the user field key DEFAULT. Normally, you cannot

change this assignment. MPDV defines the user fields for this user field key during the customizing

process to meet specific customer requirements.

MDE-MDM_82.docx

Version: 1.2.23297

Page 68 of 86

Machine Data Management

10  Setting Outputs Depending on Status and Posting Scenario

Usage

Under advanced configurations,  it is possible to set the machine's  digital outputs to account for  when a

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 69 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 70 of 86

Machine Data Management

11  Print Status List

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 71 of 86

Machine Data Management

Please note:

By default, HYDRA supports the barcodes "39", "128" and "Interleaved 2 of 5"

The system only supports barcode detection and automatic assignment to the corresponding input

fields at the terminal for barcode readers that are connected at the serial port (COM port). This is

not possible for barcode readers that are "looped in" through the keyboard.

MDE-MDM_82.docx

Version: 1.2.23297

Page 72 of 86

Machine Data Management

12  Cycle Parameters

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 73 of 86

Machine Data Management

Field descriptions

Machine

Machine for which the configuration applies.

Tolerance limit positive, negative

Values may not drop below or exceed the percentage values  defined here.  The cycle time of the

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 74 of 86

Machine Data Management

13  Machine Counter Configuration

Overview




Menu

Master data  Workplaces/machines  Counter configuration

Transaction code

ctr

Function authorization  mdctr

Purpose

The counter configuration defines the behavior of how the pulses transmitted by MSS (machine interface)

should be interpret in terms of monitoring and quantity.

Integration

In  addition  to  defining  counter  configuration,  each  time  a  machine  is  connected  to  the  terminal  several

different settings must be configured.

Requirements

Before defining any configurations, you must first set up the Machine.

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

Numerator

Counter number used to uniquely identify the counter channel for the machine.

MDE-MDM_82.docx

Version: 1.2.23297

Page 75 of 86

Machine Data Management

Note  that  the  assignment  of  the  counter  number  to  the  physical  connection  to  the  CT-MSS,  CT-

UMPS  or  OPC  variable  depends  on  further  settings  (e.g.  local  terminal  configuration  file

CTWIN.INI/CTAIP.INI (Windows terminal) or AIOP.CFG (DOS terminal).

Designation (name)

Explanation of the counter, e.g. Yield at closure counter

Unit

Quantity unit that is recorded by the counter. Is currently only used for documentation purposes.

Cycle monitoring

If  this  identifier  is  set  for  a  channel,  incoming  counter  pulses  are  considered  during  cycle

monitoring.

When  calculating  the  actual  cycle,  only  the  first  counter  is  referenced  that  is  configured  by  the

identifier  "For  monitoring".  This  counter  must  also  be  set  for  monitoring  via  operating  signal  if  an

actual cycle is to be calculated at the same time.

Posting as

Defines which quality is recorded at the counter quantity. Different values:

-

- scrap

-

- open quantity

yield

rework

The system posts generally to the primary quantity account.

Counters  that  are  configured  with  the  No  posting  option  do  not  post  anything  to  the  quantity

account. Only the counter reading is collected. Cycles or strokes may be posted and/or controlled

via the cycle monitoring.

Reason

If you post quantities for scrap, rework or open quantities, you can store a reason in the counter. To

do so, you must first create the reason in the configuration accordingly (Reasons).

Thus, for example, you can define two separate counters with different scrap reasons.

A  scrap  reason  stored  in  the  counterconfiguration  has  a  higher  priority  than  a  scrap

reason stored in the status.

Posting as cycles

If this option has been set, the pulses coming in via this counter are posted as cycles.

Posting with partitioning/ pulse factor

If  this  option  is  set,  the  incoming  pulses  are  calculated  using  the  respective  active  partitioning/

pulse factor.

MDE-MDM_82.docx

Version: 1.2.23297

Page 76 of 86

Machine Data Management

For counters with the option No posting, the setting Posting with partitioning/ pulse factor

is irrelevant, because no cycles are converted into quantities for these counters.

Offset against

You can offset the pulses recorded with this counter and the resulting quantities against a different

quantity account. In this case, the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

What you must be aware of for DOS based terminals is  that you must make sure you

do NOT set the option "Offset against" in the machine/ workplace configuration, index

tab "Quantities", but instead you must set a compensation here.

Counters with the option "No posting" cannot be offset against quantity accounts.

Offset against material

This  identifier  is  used  to  enter  the  counter  that  collects  the  material  consumption  of  the  input

material. Which material is consumed from the BOM can be specified using either the material type

or BOM item options.

Consumption recording

You  can  collect  the  material  use  in  different  ways.    You  can  find  a  general  overview  here

Consumption recording .

Material type

If you enter a material type here, the counter is used for exactly this material of the BOM with this

material type.

BOM items

If a BOM item is stored here, the counter is only used for this material.

Modified on

Modified by, date and modified on

Notes for DOS based terminals

The  counter  configuration  is  only  supported  to  a  limited  extent  for  DOS  based  terminals  (CT-56x,  CT-

541):

Only a maximum of one counter can be configured for each quantity account  Yield or for each

quantity  account  Scrap  (no  rework,  no  open  quantity,  and  no  counter  with  the  option  "No

MDE-MDM_82.docx

Version: 1.2.23297

Page 77 of 86

Machine Data Management

posting").

An Offset against is only possible  at the second counter that must be configured as  Scrap. In

this case, the compensation is only possible with Yield.

What  you  must  be  aware  of  is  that  you  must  make  sure  you  do  NOT  set  the  option  Offset

against in the machine/ workplace configuration, index tab  Quantities, if a compensation is set

here.

No reason may be defined for the scrap counter.

Toolbar

Workplace configuration

Click this button to call the Workplace and resource configuration.

MDE-MDM_82.docx

Version: 1.2.23297

Page 78 of 86

Machine Data Management

14  Workplace terminal assignment

Overview



Menu

Master data => Workplaces/machines => Terminal assignment

Transaction code

wta

Function authorization  mdwta

Purpose

This function is used to configure the machine assignment for the terminal.

Purpose

The  assignment  of  a  machine  to  a  terminal  is  a  requirement  to  use  MDE-specific  functions  such  as

automatic  shift  change,  cyclic  status  updates  or  recording  via  MSS.  However,  these  functions  are  only

available  if  the  terminal  is  configured  as  a  so-called  "MDE  terminal"  (see  Terminal  Configuration).

Terminals  configured  as  ADE  terminals  do  not  provide  these  function  even  if  the  machines/workplaces

are not assigned to the terminal.

The assignment ensures that the machine/OP is displayed by default on the terminal.

The number of machines that can be assigned depends on the terminal type.

Terminal type CT-541:

only one assignment possible

Terminal type CT-76x, CT 83x, CT84x,
CT850 (AIP 8.1 and 8.2):

up to 16 assignments possible
(even though the terminal is configured as master
terminal)
up to 10 machines may be used for the process
data collection (HYDRA-PDV).

Terminal type CT-56x:

Terminal type A-SUB

up to 8 assignments possible

up to 20 assignments possible.

All machines previously assigned to terminals are shown according to the selected terminals. The order in

which the display is shown on the terminal is determined by the position specified here.

MDE-MDM_82.docx

Version: 1.2.23297

Page 79 of 86

Machine Data Management

If  a  production  line  (only  available  if  MDE-LIN  license  is  available)  is  assigned  to  the  terminal,  all

aggregates of the production line are automatically assigned to the terminal and displayed in gray under

the  position  “99”.  Aggregates  cannot  be  removed  from  the  assignment.  If  a  production  line  is  removed

from  the  assignment,  the  aggregates  assigned  to  the  production  line  are  automatically  removed.

Production  lines  can  only  be  attributed  to  the  terminal  types  CT76x,  CT83x  (max.  2  lines)  and  CT84x

(max. 3 lines).

The  option  "Processing"  can  perform  different  assignments  of  the  machine  type  to  the  terminal.    The

following options are available:

A - BDE processing

M – MDE processing

Processing as per operation mode of the terminal

Therefore,  workplaces/machines  with  HYDRA-MDE-processing  and  workplaces  only  with  HYDRA-ADE-

processing may be assigned to an MDE terminal.

You  have  to  set  the  processing  to  "BDE  processing"  for  a  group  workplace,  if  you  want  to  assign  the

group workplace to a terminal.

Number of terminal assignments

You can only assign a machine/workplace to a single terminal.  If you want to assign a machine

to several terminals, then you have to obtain the appropriate license.

Configuration changes

Restart  the  terminal  to  ensure  that  the  settings  or  changes  made  can  be  interpreted  by  the

terminal shop floor program.

Selection criteria

The application provides the following selection criteria:

From - to

Select terminal number

Field descriptions

Terminal

Assign a machine to a unique terminal number.

Position

Display position of the machine at the terminal and for the terminal assignment at the client.

MDE-MDM_82.docx

Version: 1.2.23297

Page 80 of 86

Machine Data Management

Machine

Machine you assign to the terminal.

Processing

Here, you have the following 3 options:

A

M

BDE processing

MDE processing

Processing as per operation mode of the terminal

MDE-MDM_82.docx

Version: 1.2.23297

Page 81 of 86

Machine Data Management

15  Postings Relating to Workplaces/Machines

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 82 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 83 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 84 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 85 of 86

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

MDE-MDM_82.docx

Version: 1.2.23297

Page 86 of 86

