Manual

Energy Data Collection /
Energy Management
EMG-ARC 8.1

Version 1.0.23297

Last changed on: 18.09.2020

Energy Data Collection / Energy Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-MGM_81.docx

Version: 1.0.23297

Page 2 of 72

Energy Data Collection / Energy Management

Contents

1  Overview of Energy Management ................................................................ 4

2  Workplace and Resource Configuration ...................................................... 6

3  Resource List ............................................................................................. 45

4  Resource types .......................................................................................... 48

5  Resource Families ..................................................................................... 54

6  Resource status ......................................................................................... 58

7  Resources Posting Rules ........................................................................... 64

8  Machine Counter Configuration ................................................................. 66

9  Workplace terminal assignment ................................................................. 70

EMG-MGM_81.docx

Version: 1.0.23297

Page 3 of 72

Energy Data Collection / Energy Management

1  Overview of Energy Management

Purpose

This  component  forms  the  basis  for  applying  HYDRA  as  the  energy  management  system  used  for

operations.  DIN  EN  ISO  50001  defines  the  requirements  that  apply  to  a  production  company's  energy

management used for operations. The standard replaces DIN EN 16001 as of 2012. HYDRA as an MES

system  offers  the  basic  principles  and  tools  that  allow  a  system  of  this  type  to  be  designed  with  the

support of IT. One primary aspect concerns how energy values are monitored, measured and analyzed.

However, HYDRA also includes additional functions that can  be used to  define  measures or to prepare

documentation.

You use the function package if:

  You would like to manage energy counters in HYDRA, and

  You would also like to record the energy or efficiency values for these counters. Data is collected

automatically  via  the  HYDRA-PCC  (process  communication  controller)  or  manually  via  read-out

plans (EMG-AME package).

  The package is the basis for all further additional packages in energy management.

Integration

HYDRA PCC is used to collect data for automatic collection. It is supplied separately and is not a part of

the package.

To  analyze  the  data,  this  basic  package  only  includes  a  list  of  chronologically  organized  raw  data  in

tabular form, which at the same time is also the correction and editing function. Other additional packages

must be used for analyzing and monitoring.

In  connection  with  the  use  of  the  WRM  module,  the  status  change  and  maintenances  can  also  be

collected on the counter resources and be analyzed in a history.

Features

  Master data editing and counter configuration

o  Administration  of  the  real  energy  meters  (counters)  as  resources.  Generates  logical,

calculated  counters  used  to  combine  several  collection  points  to  efficiency  groups.

Differentiates counted values by shifts, days or months.

o  Functions  for  version  administration  of  the  counters  and  with  which  to  reset  counters

when replacing counter devices.

o  Configuration  and  definition  of  the  counter  channels  to  record  consumption  and  to

measure energy

EMG-MGM_81.docx

Version: 1.0.23297

Page 4 of 72

Energy Data Collection / Energy Management

o  Administration and posting of resource states for the meters.

o  Assigns counters to workplaces or to other properties used for logistics.

o  Manages  properties  used  for  logistics  such  as  industrial  space,  halls  and  buildings  as

well as the machines and aggregates as resources.

o  Hierarchical  property  management:  Breaks  down  buildings  and  plants,  machines  and

energy counters into a tree-like structure.

  Data entry, data editing, data keeping

o

Imports counted values via the process communication controller.

o  Stores  the  counted  values  chronologically  in  the  database.  Posts  and  accumulates

counted values to resources.

o  Option  to  correct  counter  states  and  thus  also  the  consumption  data  by  manually

recording the corrected records or editing them in the postings.

EMG-MGM_81.docx

Version: 1.0.23297

Page 5 of 72

Energy Data Collection / Energy Management

2  Workplace and Resource Configuration

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 6 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 7 of 72

Energy Data Collection / Energy Management

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 8 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 9 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 10 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 11 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 12 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 13 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 14 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 15 of 72

Energy Data Collection / Energy Management

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

Use this function to post the  quantity of order interruptions/logoffs to the person who is logged on

for the longest period.

Detailed information about quantity posting to staff can be found .

Posting for OPs that are not logged on

Use this option if you want to

- interrupt

- finish

- report part quantities for

operations that are not logged on to this workplace.

EMG-MGM_81.docx

Version: 1.0.23297

Page 16 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 17 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 18 of 72

Energy Data Collection / Energy Management

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

When  you  operations  in  the ,  the system checks whether  persons are planned in  the  application

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 19 of 72

Energy Data Collection / Energy Management

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

plan an operation for a machine via the Shop Floor Scheduling module. Transport starts from the

output material buffer of the preceding operation. The configurations of the material  type  override

the corresponding options of the resource configuration.

Quantities tab

This tab is only available if you select a resource of the type "MNR".

Conversion factors for base quantity

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for  different

quantity accounts. In general, the system supports the following quantity accounts:

Yield

EMG-MGM_81.docx

Version: 1.0.23297

Page 20 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 21 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 22 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 23 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 24 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 25 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 26 of 72

Energy Data Collection / Energy Management

If both, the minimum cycle time and the target cycle stored for the operation, are 0, the default cycle

time is set to 60000 seconds [per 1000 machine clocks].

Cycle extension

If you select the cyclic monitoring option, enter the percentage for extending the target cycle time

in this field. Enter a value ranging between 0 and 5000.

The system offsets the target cycle stored with the (logged in) operation against this percentage.  A

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 27 of 72

Energy Data Collection / Energy Management

The MSS (machine interface) records the signals transferred from the machine (counting pulses).

According  to  the  configured  number  of  pulses,  the  system  calculates  and  posts  the  quantities  as

follows:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be calculated as a fraction. When the quantity is calculated, the

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 28 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 29 of 72

Energy Data Collection / Energy Management

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

activate the option "Engel interfacing",  you can select the  field "serial number". If  you activate the

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 30 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 31 of 72

Energy Data Collection / Energy Management

Actual utilization

The periods when a resource was logged on to a workplace are the basis for posting the cycles (clocks),

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 32 of 72

Energy Data Collection / Energy Management

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

that has the same resource type in the operation's list of production resources and tools. For this

reason, you can only log on those resources explicitly (manually) that are included as a requirement

in the operation's list of production resources and tools. In this  way, you cannot log on a resource

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 33 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 34 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 35 of 72

Energy Data Collection / Energy Management

Number of fields
Field data type
6
Text field, length 10
14
Text field, length 20
2
Text field, length 40
Each page shows a maximum of 8 fields.

By default, no user field keys are defined. Configure the system accordingly to support

this kind of user fields.

As the table shows resources of different types, use the user field key  "SYSTEM" of the

object "RES" to identify the column headings for the user fields.

Comment tab

Store additional resource comments in the "comment" tab.

Main tab Resource attributes

Shows  additional  resource  attributes  via  the  user  field  definitions  of  the  resource  family.  Use  the

"resource attributes" button for editing.

Main tab Resource list

Shows  the resource  list for the selected resource. Click the "resource  list" button to  go directly to

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 36 of 72

Energy Data Collection / Energy Management

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

If you set this option, the system automatically creates and  transfers all  of the workplace

you want to copy to the new workplace.

Note  that  the  counter  numbers  of  the  new  workplace  are  identical  with  the  counter

numbers  of  the  workplace  you  copied.  If  necessary,  you  have  to  adjust  the  counter

numbers.

Copy reasons

Function authorization: mdreas.copy

EMG-MGM_81.docx

Version: 1.0.23297

Page 37 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 38 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 39 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 40 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 41 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 42 of 72

Energy Data Collection / Energy Management

If you select two resources before you open the  comparison editor, the editor  compares the two

selected resources. You can select the file type. You can change the file displayed on the right-

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

-  You can always change the contents of a row.  Click the row and enter a value. Press ESC to

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 43 of 72

Energy Data Collection / Energy Management

If  you  delete  the  workplace  successfully,  the  system  also  deletes  all  configuration  data,  e.g.  status

assignments, for this workplace.

Checking Business Parameter Containers (BSCs)

See  for further details on how to check the system against business parameters.

EMG-MGM_81.docx

Version: 1.0.23297

Page 44 of 72

Energy Data Collection / Energy Management

3  Resource List

Summary

Menu

Production  Facility  Management  Production  Facility  Administration  
Resource List

Transaction code

resbom

Function authorization  mdrbom

HYDRA  offers  the  option  to  map  so-called  resource  lists.  Further  resources  that  can  be  used  as

subresources can be added to every resource. The BOMs can be used in many applications  with regard

to resource management.

Usage

In general, only one resource per resource type is stored in the production plan in the PPS system; it is

transferred  via  the  interface.  However,  because  resources  and,  particularly  in  this  case,  Tool  and  DNC

type  resources,  often  have  a  more  complex  composition,  the  relationships  between  resources  must  be

able to be mapped.

For this reason, HYDRA offers the option to map so-called resource lists. Further resources that can be

used  as  subresources  can  be  added  to  every  resource.  The  superordinate  resource,  also  called  a

"handle"  or a  "packet", is the overall term for other required resources that are  needed  in an operation.

The number of the "handle" provides a unique specification for the entire resource (there is precisely one

existing instance). It does not make any difference if a "handle" or a "packet" only has resources of the

same resource type or the same resource family in the resource list.

Examples for resources with BOMs could include:

Base framework with exchangeable parts

Combination tool consisting of several components

NC packets with single programs and/ or with NC packets

Please note

If the superordinate resource is not a real, existing resource, then it is called a virtual resource. Both

the  virtual  resource  and  its  components  can  be  planned  and/  or  posted  if  they  can  be  uniquely

identified.

EMG-MGM_81.docx

Version: 1.0.23297

Page 45 of 72

Energy Data Collection / Energy Management

Integration

Any resources can be connected with each other in hierarchical structure using the BOMs. In connection

with the ERP interface and the production resources and tools stored for the operation, the resources can

be managed automatically with the collection of the order data.

Requirement

As a basis for the BOM function, the WRM-MGM basic packet must be present along with the license for

the WRM-WRP resource packets

Selection criteria

The following selection criteria are available in the application:

Resource type

Type of resource.

Resource family

Family to which the resource is assigned.

Resource

Unique resource identification.

Designation

Designation of the resource.

Field descriptions

Resource type

Resource type to which the resource is assigned.

Resource

Superordinate or assigned resource.

Number

This value describes the number of assigned resources. It is considered in the  assignment of the

resource  and  the  assignment  check  in  the  HYDRA  shop  floor  scheduling  (only  resources  with

resource types configured with Assignment = "G"; not with file-based resources).

Position

In the assignment it is required that a BOM item is input. The position is used for the defined display

sequence in lists and in the hierarchical display of the BOM. The position must be unique within a

superordinate resource.

EMG-MGM_81.docx

Version: 1.0.23297

Page 46 of 72

Energy Data Collection / Energy Management

A maximum of 5 levels are supported in BOMs .

When  copying  is  performed,  the  maintenance  dialog  is  called  in  which  the  values  of  the

currently  selected  entries  are  the  default  values.  This  makes  it  easier  to  create  further

assignments.

Toolbar

 Superordinate resource information

Calls the superordinate resource information

 Subordinate resource information

Calls the subordinate resource information

EMG-MGM_81.docx

Version: 1.0.23297

Page 47 of 72

Energy Data Collection / Energy Management

4  Resource types

Overview

HYDRA menu

Master Data  Resources  Resource types

FEDRA menu

Detailed scheduling  Master data   Resource types

Transaction code

restyp

Function authorization  mdrtyp.*

This document describes the application "Resource types" on the client.

Purpose

Resources are classified in resource types with respect to their function and use. For example, you can

group tools by assigning them to the resource type "Tool".

Resource type
Tool

Drill 5mm
002-392-42

Drill 4mm
002-402-49

Insert
836-630-50

Base frame
014-302-48

You  use  resource  types  not  only  to  classify  resources,  but  also  to  control  specific  functionalities.  For

example, the resource type is used to control whether or not an assignment check for resources is made

in the shop floor scheduling (only relevant if the additional function is used).

The resource types listed in the following table have been predefined by MPDV. They are created as part

of the implementation process.

Resource type

Machine
Tool
Staff
Gage
Device
DNC-Programm
Document
Energy counter

Abbreviation/
Ident
MNR
WNR
PER
PRM
VOR
DNC
DOC
ENE

EMG-MGM_81.docx

Version: 1.0.23297

Page 48 of 72

Energy Data Collection / Energy Management

Note

Various  resource  types  are  subject  to  certain  technical  restrictions.  For  example,  users  cannot

delete the resource types "Machine", "Tool", and "Staff". Further information on this subject can be

found in the chapter about configuring resources types.

Integration

You use resource types as a characteristic to specify differences between resource objects. The resource

type therefore is the top classification criterion.

Selection parameters

In the selection panel, you can filter by higher-level or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource

Field descriptions

ID

Unique internal key.

This  value  may  not  be  modified  for  the  resource  types  delivered  by  MPDV  because  a  range  of

processing depends on it.

Resource type

Unique "self-explanatory" designation of the resource type, e.g. "Machine" or "Tool".

You can select this value  in the various functions. Only the resource type allows  you to  identify a

resource or its resource ID uniquely. That  is  why,  evaluations also show the resource type of the

resource.

Description

Explanation of the resource type; in form of a comment.

User field key

Refers to a valid user field key

EMG-MGM_81.docx

Version: 1.0.23297

Page 49 of 72

Energy Data Collection / Energy Management

Field description for tab General

Assignment

This  option  specifies  whether  or  not  a  resource  of  this  resource  type  should  be  assigned.  An

assignment is a prerequisite for performing an availability check for the resource when planning an

OP on a machine in the detailed scheduling of the HYDRA shop floor scheduling (HLS).

Possible values:

N = No, no assignment

G = Assignment of the total duration of an operation

Please  note:  For  the  resource  type  DNC,  the  setting  should  be  set  to  None  because  there  is  an

"endless" capacity for resources of this type.

Please  note:  For  resources  of  type  MNR  (machines)  the  setting  has  no  significance  because

machines are always assigned as primary capacities.

Automatic creation

Identifier that indicates whether or not a stock is to be created automatically for a resource of this

type if this resource is transferred using the component list from the PPS and if this resource does

not yet exist in the WRM product group.

Please note: This identifier is inactive and cannot be changed for the resource type "Machine".

Status assignment

This  identifier  specifies  whether  or  not  a  status  configuration  (menu  WRM:  Master  data    Status

assignment) is allowed for this resource type.

Note:

This identifier is inactive and cannot be changed for the resource types "Machine" and "Staff".

Log on with OP

This  identifier  is  used  to  control  whether  or  not  a  resource  of  this  type,  which  is  assigned  to  the

operation as a component, is logged on. Possible values:

None:

The resource is not logged on.

Implicit:  The  system  automatically  (implicitly)  logs  on  the  resource  that  is  assigned  to  the

operation  as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  manually

(explicitly) nor change the logon.

Explicit:   You  can  manually  (explicitly)  log  on  the  resource  that  is  assigned  to  the  operation  as  a

production resource and tool or you can log on another resource instead. If you do not log on the

resource  or  another  resource  explicitly,  the  system  implicitly  (automatically)  logs  on  the  current

resource; in this way, the current resource serves as a "default".

Note:

EMG-MGM_81.docx

Version: 1.0.23297

Page 50 of 72

Energy Data Collection / Energy Management

This value is used as a "Copy template", if you manually create a resource for the first time in the

MOC.  Er  wird  direkt  in  das  entsprechende  Konfigurationsfeld  der  (neu  angelegten)  Ressource

übernommen. For the rest of the process, only the value specified for the resource is used.

In  general,  this  identifier  should  be  inactive  for  resource  type  DNC  because  a  specific  processing

exists for it in the HYDRA product group DNC (NC programs are logged on separately) (only applies

when using HYDRA).

Post to resource

This  identifier  is  used  to  specify  if  a  resource  can  be  posted  to  or  not.  If  the  identifier  is  set,  the

resource is logged on automatically with an operation logon.

The  identifier  must  be  set  if  cycles  and  times  are  to  be  posted  for  resources  of  this  type,  e.g.  for

evaluating the use of resources (in the evaluation function of the same name) or for consideration in

the maintenance calendar (WRM-WWR).

This identifier should not be set for resources of type "Document", "Staff" and "DNC".

Note:

This  identifier  is  only  considered  for  resources  that  contain  the  number  value  1  in  the  resource

stock.

This value is used as copy template if you manually create a new resource on the client. It is directly

transferred  to  the  relevant  configuration  field  of  the  (newly  created)  resource.  For  the  rest  of  the

process, only the value specified for the resource is used.

Consider in evaluations

Reserved

Posting on the terminal

If this option is set, resources of this resource type are displayed in the 3rd list.

Counter/energy resource (EMG 8.1)

Specifies if it is a counter or energy resource (only applies when using HYDRA).

Field description for the tab Maintenance

Maintenance monitoring based on the following RPAs

This field includes the information which operation hours of which RPAs are used as reference for

the maintenance monitoring according to hours of operation.

Note:

This  identifier  is  only  relevant  in  connection  with  the  additional  function  WMR-WTK  (maintenance

calendar).

EMG-MGM_81.docx

Version: 1.0.23297

Page 51 of 72

Energy Data Collection / Energy Management

Field description of the tab DNC/Documents

DNC processing (only applies when using HYDRA)

Specifies the behavior of HYDRA for DNC resources of this type:

K:  No DNC processing (for resources of this type)

All resources except for DNC resources are configured with this processing option.

L:  Local program

Generated by upload to the machine and saved in HYDRA.

E:  External programming system

The file is located on an external system and from there it is processed through HYDRA.

O: Optimized program

Generated by upload on the terminal and then transferred to the external programming system

through HYDRA.

R:  Replacement procedure (DNC 7.2)

The upload overwrites the version that is applicable at that time.

V:  Version based (DNC 8.2)

An upload of an existing resource generates a new version.

File-based

The programs are file-based.

Uploaded version set by default (DNC 8.2)

If this option is checked, the uploaded version is automatically set as valid version in version-based

DNC processing.

File extension for valid programs:

The files for upload-download can be distinguished by their file extension. Only valid programs are

used for downloads to the terminal.

File extension for optimized programs:

The files for upload-download can be distinguished by their file extension. New programs optimized

by  upload  are  provided  with  this  extension.  These  programs  must  be  "released"  before  being

downloaded again by the programming system by changing the file extension.

Path

A path configured in HYDRA for saving the files in the server or programming system.

File extension for program description 1...3 (DNC 7.2):

A total of 3 other file extensions are available for saving descriptions, etc.

EMG-MGM_81.docx

Version: 1.0.23297

Page 52 of 72

Energy Data Collection / Energy Management

Field description for the tab "compensation"

Posting record after [hh:mm:ss] hours

Specifies the time when a compensation record is to be written at the latest.

Use cancellation documents for editing

If this option is enabled, cancellation records are created as part of the editing process.

EMG-MGM_81.docx

Version: 1.0.23297

Page 53 of 72

Energy Data Collection / Energy Management

5  Resource Families

Overview

HYDRA menu

Master data  Resources  Resource families

FEDRA menu

Detailed Scheduling  Master data  Resource families

Transaction code

resfam.*

Function authorization  mdrfam

This document describes the application "Resource Families” on the client.

Purpose

If you look at the assignment of resources to resource types, you soon recognize that in a manufacturing

company various resources of the same type exist that are possibly handled quite differently. This means

that in general the classification by resource types is not sufficient to organize resources in a useful way.

If you define "resource families" (groups), you can introduce sub-classes of resource types. The diagram

below  illustrates  how  the  resource  type  "Tool"  is  sub-divided  into  the  two  resource  families  "Drill"  and

"Injection mold". Each of the individual resources is assigned to one of the two resource families.

Resource type
Tool

Resource family
Drill

Resource family
Injection mold

Drill 5mm
002-392-42

Drill 4mm
002-402-49

Insert
836-630-50

Base frame
014-302-48

Integration

The  resource  families  offer  another  structural  level  subordinate  to  the  resource  types.  You  can  use

resource types to define the master/detail user fields of resources. You can improve these master/detail

user fields through definition in the resource families. In particular for DNC, you can use resource families

as the main search criterion and assignment criterion for machines.

EMG-MGM_81.docx

Version: 1.0.23297

Page 54 of 72

Energy Data Collection / Energy Management

Selection parameters

In the selection panel, you can filter by superordinate or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource.

Resource family

The resource family to which the resource is assigned.

Field descriptions

Resource type

Resource type to which the resource families refers.

Resource family

Unique, descriptive name of the resource family.

You can select this value  in the various functions. Only the resource type allows  you to  identify a

resource or its resource ID uniquely. That  is  why,  evaluations also show the resource type of the

resource.

Description

This field includes the description of the resource family; serves as a comment.

Responsibility area

Definition of the responsibility area. If you specify the responsibility area for a resource family, you

also specify the responsibility area for the assigned resources. The responsibility area controls the

visibility and editing options for these resources.

Field description for tab General

User field key

Reference  to  a  valid  user  field  key.  The  user  field  key  entered  here  overwrites  the  entries  in  the

resource type.

Note regarding DNC filtering using a DNC family and its search fields (when using HYDRA only):

The  definition  of  suitable  user  field  combinations  is  important  if  you  want  to  use  the  flexible  filter  and

search  functions  in  the  DNC  module.  You  can  define  such  user  field  combinations  as  part  of  the

configuration. The user is responsible for the assignment and utilization of these user field keys. Use the

defined  search  fields  in  the  terminal  to  filter  the  DNC  records  in  addition  to  the  DNC  family  of  the

machine. You can also use these fields as search criteria in the MOC.

Starting with release DNC 7.2, the following preconfigured user field keys will be delivered:

EMG-MGM_81.docx

Version: 1.0.23297

Page 55 of 72

Energy Data Collection / Energy Management

User field key

Description of the search fields

DNC_K

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

DNC_K_V

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

4.  Version, mandatory field, cannot be edited

DNC_K_W

Plastic (tool reference only):

1.  Tool, mandatory field, cannot be edited

DNC_K_WV

Plastic (tool reference and version):

1.  Tool, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC

NC programs:

1.  Article, mandatory field, cannot be edited

DNC_NC_V

NC programs:

1.  Article, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC_M

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

DNC_NCMV

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Version, mandatory field, cannot be edited

DNC_FREI

1.  Search field 1, Text20, mandatory field, can be edited

2.  Search field 2, Text20, optional field, can be edited

3.  Search field 3, Text20, optional field, can be edited

4.  Search field 4, Text20, optional field, can be edited

EMG-MGM_81.docx

Version: 1.0.23297

Page 56 of 72

Energy Data Collection / Energy Management

Notes on the DNC administration

DNC records are used exclusively with machines. In order to avoid false entries or false allocations, every

machine is assigned to a definite DNC resource family. This is stored in the machine resource data (the

Resource family DNC field). In this way, you can make sure that only programs belonging to a particular

resource family and, indirectly, to a particular resource type can be loaded to a machine.

Furthermore,  for  the  management  of  DNC  records  certain  criteria  are  necessary,  which,  among  other

things,  simplify  selection  and  evaluation,  thereby  simplifying  location  and  editing  and  enabling

inspections.  As  widely  different  machine  types  can  be  dealt  with  by  DNC  administration  (including,  for

example,  injection  mold  machines,  printers  and  NC  machines),  a  rigid  determination  of  these  criteria  is

not advisable. For this reason, the resource family exists. You can use the user fields to assign attributes

to the resource families. These attributes describe and specify the variable parameters.

Therefore, you can use the attributes for identification purposes and  you can assign validation functions

and allocations. In doing so, you establish a connection between the DNC programs on the one hand and

the machines and operations on the other (see section entitled "User fields").

There are variables, such as the temperature and humidity, which influence the behavior of the machines

and  can  therefore  have  an  influence  on  production.  You  can  also  record  these  "environmental  factors".

For this purpose, you just have to define further attributes in the user fields.

EMG-MGM_81.docx

Version: 1.0.23297

Page 57 of 72

Energy Data Collection / Energy Management

6  Resource status

Overview

HYDRA menu

Master data  Resources  Resource status

FEDRA menu

Detailed Scheduling  Master data  Resource status

Transaction code

ressta

Function authorization  mdressta.*

This document describes the application "Resource status" on the client.

Purpose

Each resource has exactly one status at a time. You can configure any statuses for a resource. This way,

it is possible to integrate a customer-specific status model.

Examples of status values:

Installed

Blocked

New/
Not used

Wait for
QA release

Free

Scrapped

In maintenance

You configure statuses for different resource types. You can define any status text you require. Different

configuration attributes define the processing performed with the different statuses. For example, you can

specify whether a resource can be logged on if a specific status is available.

In  the  Status  assignment,  you  can  optionally  assign  a  storage  location  that  is  used  in  the  Set  status

function.  With  status  "Repair",  you  can  then  automatically  assign  the  storage  location  "Tool  shop",  for

example.

EMG-MGM_81.docx

Version: 1.0.23297

Page 58 of 72

Energy Data Collection / Energy Management

To set a status, use the function Change status in the applications Resource overview or Resource stock.

You can assign a status immediately or for a future point in time. Setting or modifying a status is logged,

so that the "resource history" shows the point in time when the status was changed.

Notes

With order logon, the resources are set to Active = Yes. The resource status does not change. The

option  Collection  in  the  Status  assignment  configuration  specifies  whether  a  resource  can  be

logged on or not. When the operation is logged off, the resource is reset to Active = No. Again, the

resource status does not change.

The  definition  of  a  status  transition  model  is  not  available  in  the  status  configuration.  This means

that  the  status  can  be  changed  as  required,  unless  it  is  changed  automatically  by  the  system.  At

this point, we recommend to specify the relevant method.

The  active  flag  is  not  relevant  for  resources  of  the  type  MNR.  Even  if  an  order  is  logged  on  to  a

machine, the resource status of the resource of type MNR remains inactive.

Optional assignment using resource families:

You can not only define a status using the resource type, you can also use resource families to assign a

status.  Configuration  becomes more flexible  this  way.  If  you  enter  a  value  in  field  Resource  family,  this

configuration  is  enabled.  Important:  All  statuses  must  either  be  assigned  using  resource  families  OR

resource types; otherwise this can lead to ambiguities!

Integration

You require the statuses to collect and document status changes. The defined status settings specify how

a  resource  can  be  used.  Example:  If  a  resouce  is  not  allowed  to  log  on,  the  operation  in  production

cannot be logged on.

Selection criteria

In the selection panel, you can filter by higher-level or assigned resources. The application provides the

following selection criteria:

Resource type

Type of resource

Resource family

Family the resource is assigned to.

Status

Status of the resource

Designation

Name of the resource status

EMG-MGM_81.docx

Version: 1.0.23297

Page 59 of 72

Energy Data Collection / Energy Management

Field descriptions

Resource type

Resource type for which the status is defined.

Resource family

Optional, if you want to define the status in relation to resource families.

Status

Status number; unique within the resource type or resource family.

Designation

Status name

Color

Color used to display the status in the Resource overview.

Note:  The  consistent  use  of  the  status/color  combination  with  different  resources  is  the

responsibility of the customer.

Authorization

Authorization  level  for  assigning  a  status  on  the  terminal  (a  value  between  0  and  9).  In  the  HR

master data, every person is assigned an authorization level for the resource status change. If the

authorization level stored in the master data is lower than the authorization level defined here, you

cannot assign the status via the terminal.

Note: Users who want to use the function Change status on the HYDRA client, require the relevant

function  authorization.  With  this  function  authorization,  the  status  of  a  resource  can  always  be

changed; the authorization level on the client is not relevant.

Storage location

If  a  storage  location  is  specified,  then  this  value  is  automatically  set  in  the  function  Set  status

(except if the storage location is explicitly set during status assignment, then this manually assigned

storage location is used).

With  status  "Repair",  you  can  then  automatically  assign  the  storage  location  "Tool  shop",  for

example.

Assignment

This  option  controls  whether  the  resource  is  displayed  as  locked  or  not  locked  in  the  Graphic

planning (only if the additional function HLS-BSR is used).

Assignment = resource is displayed as locked

No assignment = resource is displayed as not locked

Collection

S = Resource is blocked for collection. In this case,  a resource and  also the  operation cannot be

logged on.

EMG-MGM_81.docx

Version: 1.0.23297

Page 60 of 72

Energy Data Collection / Energy Management

F = Resource is released for data collection and can be logged on.

Processing

Production identifier specifying the processing

F = Release:

This status is set with the automatic status monitoring, if the resource should be "released" again.

DNC:

When you create a new resource, the status with this identifier is only set as initial status,

if no status with processing "I = initial status with creation" is configured for the resource

type.

B = Status when logging OP off

This option is no longer supported since WRM 8.1.

O = Status when uploading optim. program (DNC)

This status is set for the upload of an optimized program.

U = Status when uploading (DNC)

This status is set for the upload of a program.

S = Automatic blocking status

If this status is set, the resource is locked.

L = Deleted (from DNC 7.2)

This status shows that the resource is no longer used, meaning it is deleted logically.

I = Initial status with creation (from DNC 7.2)

When creating a new resource, the status with this flag is assigned as an initial status. If this status

is not available, then the released status is assigned to the resource.

Please note:

-  For  each  resource  type  or  resource  family,  you  can  only  assign  1  status  with  one  of  these

characteristics.

- When a resource is being directly logged off (no standard function), no status is set; in this case,

the resource is only set from active to inactive.

Display of resource with this status on terminal

Display of the resources with this status on the Windows terminal.

Note: This configuration is only used in the DNC administration for resources of type DNC.

Deleted (from WRM 8.2)

If this option is checked, the resource has been (logically) deleted.

The identifier is used in the Resource overview.

EMG-MGM_81.docx

Version: 1.0.23297

Page 61 of 72

Energy Data Collection / Energy Management

Toolbar

The following functions can be called from the toolbar of the application.

  Insert

Function authorization: mdressta.create

Opens the editing dialog to create a new entry.

  Edit

Function authorization: mdressta.edit

Opens the editing dialog to change an existing entry.

  Copy

Function authorization: mdressta.copy

Opens the editing dialog to copy an existing entry.

  Delete

Function authorization: mdressta.delete

Opens the confirmation dialog to delete existing entries.

  All

Function authorization: mdressta.copy

Opens the editing dialog to copy all entries of a resource type or a resource family.

  Copy all from family

Function authorization: mdressta.copy

Opens the editing dialog to copy the statuses of a family.

  Copy missing entries

Function authorization: mdressta.copy

Opens the editing dialog to copy the missing status assignments of a resource type.

EMG-MGM_81.docx

Version: 1.0.23297

Page 62 of 72

Energy Data Collection / Energy Management

EMG-MGM_81.docx

Version: 1.0.23297

Page 63 of 72

Energy Data Collection / Energy Management

7  Resources Posting Rules

Overview

Menu

Master data  Resources  Resources booking rules

Transaction code

resbr

Function authorization

resbr

This document provides a description of the "Resources booking rules" application in the Manufacturing

Operation Center (MOC).

Usage

Flexible posting structures can be defined for energy management or for consumption entry. In addition to

the  fact  that  the  BOM  is  displayed  in  a  tree-like  structure,  offering  selection  options  for  report  creation,

there is also an option for compensation methods to be defined using booking paths. This option makes it

possible  to  define  multi-level  images  of  calculated  posted  resources  from  counter  resources  that  were

entered  either  manually  or  automatically.  In  the  process,  the  values  can  be  added  or  subtracted  as  a

percentage.  Thus,  in  a  sense  a  formula  and  an  imaging  path  are  defined.  So,  a  source  and  a  target

resource  as  well  as  the  compensation  rule  are  always  shown  as  a  percentage.  Random  multiple

relationships are possible, which allow the rules to be combined as formulas.

Integration

Compensation is a cyclical process, which creates documents based on the defined compensation rules

based  on  documents  that  were  already  entered.  Compensation  is  performed  broken  down  at  the  most

down  to  10  steps.  The  target  resource  specified  in  a  compensation  rule  includes  the  quantities  and

durations of the source resource added to or subtracted from the specified proportion.

Selection criteria

The application provides the following selection criteria:

Target resource type/ target resource

Definition of the target resource

Source resource type/ source resource

Definition of the source resource

Field descriptions

Target resource type/ target resource

Definition of the target resource

EMG-MGM_81.docx

Version: 1.0.23297

Page 64 of 72

Energy Data Collection / Energy Management

Source resource type/ source resource

Definition of the source resource

Valid from/ valid to

Rule's period of validity

Proportion

Proportion in percent, positive (added to) or negative (subtracted from) value

Toolbar

  Paste

Opens the dialog in which a compensation rule is entered.

  Copy

Opens the dialog into which a compensation rule is copied.

  Edit

Opens the dialog in which a compensation rule is edited.

 Delete

Deletes one or several compensation rules.

EMG-MGM_81.docx

Version: 1.0.23297

Page 65 of 72

Energy Data Collection / Energy Management

8  Machine Counter Configuration

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 66 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 67 of 72

Energy Data Collection / Energy Management

For counters with the option No posting, the setting Posting with partitioning/ pulse factor

is irrelevant, because no cycles are converted into quantities for these counters.

Offset against

You can offset the pulses recorded with this counter and the resulting quantities against a different

quantity account. In this case, the entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

What you must be aware of for DOS based terminals is that you must make sure you

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

If you enter a material type here, the counter is used for exactly this material of the BOM with  this

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 68 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 69 of 72

Energy Data Collection / Energy Management

9  Workplace terminal assignment

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 70 of 72

Energy Data Collection / Energy Management

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

EMG-MGM_81.docx

Version: 1.0.23297

Page 71 of 72

Energy Data Collection / Energy Management

Machine

Machine you assign to the terminal.

Processing

Here, you have the following 3 options:

A

M

BDE processing

MDE processing

Processing as per operation mode of the terminal

EMG-MGM_81.docx

Version: 1.0.23297

Page 72 of 72

