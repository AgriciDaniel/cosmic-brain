Manual

Master Data / Gage
Management
PMV-SVP 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Master Data / Gage Management

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PMV-SVP_81.docx

Version: 1.0.4778

Page 2 of 40

Master Data / Gage Management

Contents

1  Master Data / Gage Management - OverviewError! Bookmark not defined.

2  Configuration of Workplaces and Resources ............................................... 5

3  Resource Families ..................................................................................... 37

PMV-SVP_81.docx

Version: 1.0.4778

Page 3 of 40

Master Data / Gage Management

1  Master Data / Gage Management

Purpose

This component supports creating gages (resources of type PRM) or gage groups (resource families).

Implementation Considerations

This  component  should  be  used  to  document  which  gages  or  gage  groups  are  used  to  execute  the

inspections. Additionally, it forms the basis for automatic measurement value collection through interface

equipment.

Integration

This component serves the components:







Inspection planning for production control inspections

Inspection planning for goods receipt inspection

Inspection planning for initial sample inspection

  Measurement data interface for quality data

Features

The following functions are available:

  Maintenance function to create and modify relevant master data (gage groups or gage families,

storage locations etc.)

  Maintenance  function  to  create  and  modify  gages  and  assign  these  to  status,  cost  center,

resource family, owner, inventory number, engraving number etc.)

PMV-SVP_81.docx

Version: 1.0.4778

Page 4 of 40

Master Data / Gage Management

2  Configuration of Workplaces and Resources

Summary

Menu

Master data  Resources  Resource configuration

Master data  Workplaces/ Machines  Workplace configuration

Transaction code

res

Function authorization  mdres

The resource configuration is the central function for resource management in MES.

Usage

The master data for both workplaces and machines as well as for other resources (tools, DNC resources,

etc.)  are  managed  here.  The  resources  are  roughly  classified  according  to  resource  type.  This  type  is

also connected  with corresponding functions and  applications that  open  other functional components of

the MES especially for the respective type.

Integration

This  application  can  be  used  to  view  the  resource  information  of  all  of  the  resource  types  present  in

HYDRA. However, the data record maintenance depends on the resource type. In this way, depending on

the resource type, not all fields can be maintained and not all resources can be created or deleted.

Based on the resource type, other applications are present in the MES that are specially customized for

these types. For  example,  the  application package of machine data collection is based on resources of

type "Machine".

In  addition  to  the  resource  configuration,  the  resource  overview  application  is  present,  which  does  not

permit data maintenance, but does enable administration operations for daily handling of resources such

as the stock transfer of a resource.

Requirement

Before  a  workplace  or  machine  is  created,  a  year  model/  shift  calendar  must  be  created.  To  use  the

various  resource  types  in  a  meaningful  way,  the  advanced  licenses  for  these  types  must  also  be

available.

Selection criteria

The following selection criteria are available in the application:

PMV-SVP_81.docx

Version: 1.0.4778

Page 5 of 40

Master Data / Gage Management

Resource from ... to ...

This selection criterion refers to the resource. Wildcards (placeholders *) can be used.

Short designation

Short designation of resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Workplaces  and  machines  always  have  resource  type  MNR,  while  in  the  context  of  customizing

other resources can be given individual resource types. Predefined resource types include:

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

Inspection and measuring equipment

PER

Production staff / general

PRU

Set up staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

Using the predefined resource types is recommended.

The  detail  resource  information  is  adapted  depending  on  the  resource  selected  in  the

table overview.

Designation

Designation of the resource.

Group

Workplace/ Machine group of the resource. Only relevant for resources of type MNR.

Cost center

Cost center of resource.

Short name

Short name of the resource

PMV-SVP_81.docx

Version: 1.0.4778

Page 6 of 40

Master Data / Gage Management

Resource family

Family to which the resource is assigned.

Responsibility area

Responsibility area to which the resource is assigned.

Storage location

Master storage location of resource.

MD user fields

MD user fields 1- 6 of the resource. If a resource family is selected in the selection panel, the field

names are displayed based on the assigned user field definition.

Field descriptions

This detail application includes three main tabs:

-  Resource configuration

-  Resource list

-  Resource attributes

Main tab "resource configuration"

The configurations and master data of resources are defined here.

General tab

Resource type

Resource  type  of  the  resource. When  the  HYDRA  system  is  delivered,  some  resource  types  are

predefined. Further resource types can be created within the scope of HYDRA customizing.

Resource

The number of the resource or workplace to be entered is input in this field.

The maximum number of places of this number is as follows, depending on the resource type:

-  Resources of type MNR: maximum of 8 places

-  Resources of type <> MNR: maximum of 20 places

Permitted  characters  include  ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/_.-+#.  Spaces

and  other  special  characters  are  not  allowed.  For  technical  reasons,  *  (asterisk)  and  %  (percent)

can be  input,  but  are nonetheless not  permitted because they  are not  valid characters. When the

input field is exited, lower case letters are automatically transformed into CAPITAL LETTERS.

PMV-SVP_81.docx

Version: 1.0.4778

Page 7 of 40

Master Data / Gage Management

Notes regarding workplaces/ machines (resource type MNR):

For  technical  reasons,  for  resources  of  type  MNR  there  is  no  check  for  the  maximum  number  of

places.  For  this  reason  it  must  be  ensured  that  the  length  of  the  resource  number  (=  workplace/

machine number) has a maximum of 8 digits.

If the option "Numeric machine number" (HYDRA basic settings) is activated for use on DOS-based

terminals,  it  must  be  ensured  that  the  resource  number  (=  workplace/  machine  number)  includes

only  numerical  digits  and  that  the  length  of  the  number  is  exactly  8  places.  If  necessary,  when

creating the workplace/ machine, zeros must be added to the beginning of the number to extend it

to 8 digits.

Short designation

Short designation of resource. This field can only be used with workplaces/ machines (resources of

type MNR).

Designation

This  field  is  used  to  assign  a  short,  unique  designation  for  each  resource.  This  designation  is

displayed in reports and overviews and at the terminal and it is useful for orientation.

Responsibility area

Responsibility areas are used such that in various evaluations, the user is only shown the data to

which he/she has access according to his/her responsibility area authorization.

The  responsibility  area  can  also  remain  empty.  In  this  case,  the  resource  is  always  displayed

regardless of the user's assigned responsibility authorizations.

Cost center

The cost center to which the resource belongs is entered in this field.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information that functions as a comment.

Acquisition date, acquisition costs

Additional information that functions as a comment.

The currency is configured across the system in the HYDRA basic settings.

Storage location

Location at which the resource is stored when it is not being used (home storage location).

In connection with the material and production logistics (MPL), the material buffer specified in this

field is used during input batch logon for reposting the logged on input batch(es) from the previous

material buffer to this material buffer (upstream of the machine).

Delivery date, start-up date, guaranty date

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

PMV-SVP_81.docx

Version: 1.0.4778

Page 8 of 40

Master Data / Gage Management

External designation, resource type designation, usage, purchase order number

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

Supplier and party in charge including detail fields

Additional  information  that  functions  as  a  comment.  These  fields  are  only  available  with  the

licensing of the gage management.

Workplace configuration tab

This tab is only available if a resource of the type "MNR" is selected.

Workplace master data

Workplace category

N  Machine

P   Workplace

Definition as machine or workplace. As regards processing, both of these categories are identical if

only BDE or MDE and PDV are in use.

J   Machining center

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

Parallel output batches can be produced on the machine for an operation with a batch management

requirement.

C  Packing station (MPL-PAL only, starting with MPL 7.2)

Specific posting functions are used on the machine for mapping a packing station. The functions

are described in detail in the MPL-PAL product documentation.

PMV-SVP_81.docx

Version: 1.0.4778

Page 9 of 40

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

Master Data / Gage Management

Workplace type

E  Single workplace

G  Group workplace

Please note

Terminals can be assigned to both group and single workplaces. However, in this case it must be

noted  that  the  terminal  is  set  to  operation  mode  "BDE"  or  the  option  Processing  is  set  to  "BDE

processing" when assigning workplaces to terminals.

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Locked

If this identifier is set, the machine/ workplace has been (logically) deleted. The following

modifications are no longer permitted in this case:

- Order postings on the terminal

- Order posting on the console/MOC (e.g. using the Order overview function)

- Modifications in event maintenance

Furthermore, the machine/ workplace is no longer displayed in the Machine overview or in the

graphic planning board of the HYDRA shop floor scheduling module (HLS).

Company

This  field  is  used  to  differentiate  the  individual  machines/  workplaces.  Within  the  system,  it  also

functions as report/evaluation option to some extent.

Group

Assignment of the workplace/ machine to a logical group. In the context of the planning this has to

do with a capacity group in which the primary capacities are summarized.

If  a  new  workplace  is  created,  it  is  automatically  assigned  to  a  group  of  the  same  name  (menu

BDE: Master data > Workplaces/machines > Groups), which is defined as a capacity group. If there

is  no  capacity  group  yet,  then  it  is  automatically  created  and  then  the  workplace  is  automatically

assigned to it.

Category

The  category  of  the  machine  is  entered  here.  From  this  category,  a  validation  check  can  be

activated  according  to  the  customizing  configuration  BDE:  Master  data  >  Order  configuration  >

Order  types,  Plausibilities  tab,  option  "Check  for  specifications  in  backlog  of  orders"  (value

Category).

PMV-SVP_81.docx

Version: 1.0.4778

Page 10 of 40

Master Data / Gage Management

Year model

A valid year model must be entered here. During entry, times to be posted are compared with this

shift model. If no planned year model is stored in the HLS tab, this shift model is also used in the

HYDRA shop floor scheduling module (HLS).

Standard rate machine

The  arithmetical  standard  rate  of  machines  can  be  entered  here  for  calculations.  In  the  HYDRA

shop floor scheduling module (HLS) this value is used for some (evaluated) key figures.

Standard labor rate

The arithmetical standard labor rate can be entered here for calculations. In the HYDRA shop floor

scheduling (HLS) this value is used for the key figure "Evaluated labor utilization".

Performance level

The performance level of the workplace/ machine can be entered in percent in this field. This value

is  considered  in  the  HYDRA  shop  floor  planning  and  in  the  evaluation  of  material  requirements

when calculating the remaining run time.

Incentive wages indicator

Defines the type of calculating incentive wages. Mostly, this flag is used together with the incentive

wages  based  on  formulas  for  customer-specific  configurations.  In  addition,  the  "incentive  wage

indicator"  can  also  be  used  as  selection  criterion  for  the  determination  of  wage  types  within  the

incentive wage determination.

This field should be left empty if the incentive wages determination is not in use.

The incentive wages indicator G=group piecework has a special meaning. If the workplace/machine

has this flag, a premium group needs to be assigned every time an order is logged on . This can be

performed  either  by  the  "assignment  of  premium  groups"  option  of  the  incentive  wages

determination or, optionally, by an additional field in the terminal dialog for logging orders on. If no

assignment is available, the logon of the order will be rejected by issuing a validation error.

Therefore,  the  incentive  wage  indicator  G  =  Group  Piecework  may  only  be  assigned  if  the

group  premium  conditions  are  met  in  the  incentive  wages  determination,  as  otherwise

orders can no longer be logged on!

The  meaning  of  the  other  incentive  wages  indicators  is  specified  according  to  the  customer's

requirements while customizing the system.

File

It  is  possible  to  assign  a  graphic  to  every  machine/  workplace.  Among  other  uses,  the  graphic  is

displayed in the workplace overview or in the AIP. The following image formats are supported: jpg,

gif, tif, bmp, ico, emf, wmf.

PMV-SVP_81.docx

Version: 1.0.4778

Page 11 of 40

Master Data / Gage Management

In  the  path  configuration,  the  path  must  be  configured  using  the  PATH  identification

"MOCWPIMG"; the length of the file name for graphics files is limited to 12 places (8.3

notation). Note for Unix installations: Please use lower case letters only for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, the maximum capacity in KG can be defined here.

Accuracy class, unit, etc.

  Information fields in order to describe the accuracy. These fields are only available if the license for

creating gages has been purchased.

Entry

Display 3rd list

A third list can be displayed/ activated in the basic screen on a Windows-based terminal (CTWIN /

AIP) using the options displayed here. Depending on the options set, users can switch between the

respective lists on the terminal. The following settings are possible. Note here that the display in the

lists depends on the module set:

 Input material (MPL): Logged on input materials/ batches are displayed.

 Resources (WRM): Logged on resources and tools are displayed.

 Staff (BDE): Logged on staff is displayed.

Output material (MPL): Produced output batches are displayed.

Show material/ PRT list when OP is logged on

This  option  is  only  relevant  in  connection  with WRM and  resources  logged  on  at Windows-based

terminals (CTWIN / AIP).

If this option is set, when an OP is logged on, a specific logon dialog is called. This dialog contains

a  component/  PRT  list  in  which  resources  are  displayed  that  meet  at  least  one  of  the  following

conditions:

- the identifier "Logon on terminal" is set on the resource type;

- the identifier "Log on with OP" is set to "Explicit logon"

- the resource is a so-called "required resource" (identifier on the resource).

Please note: As long as the workplace is relevant for MPL, material components are also displayed

in this list.

Sequencing list

This  option  is  used  to  define  which  operations  are  to  be  displayed  in  the  sequencing  list  on  the

terminal. The following settings are possible:

S

Basic  setting.  The  value  is  taken  from  the  option  of  the  same  name  in  the  HYDRA

basic settings.

PMV-SVP_81.docx

Version: 1.0.4778

Page 12 of 40

Master Data / Gage Management

M

Pool of workplaces. Only the operations planned at the workplace are displayed in the

sequencing list on the terminal.

G

Pool  of  workplaces  and  groups.  The  OPs  displayed  in  the  sequencing  list  on  the

terminal  are  those  that  are  either  planned  at  the  current  workplace  or  another

workplace in the group or are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  Only  those  operations  that  are  planned  at

workplaces of the category are displayed in the sequencing list on the terminal.

H

Group control. The OPs displayed in the sequencing list on the terminal are those that

are either planned at the current workplace or another workplace in the group.

Number of OPs in sequencing list

The maximum number of OPs that are to be displayed in the sequencing list on the terminal can be

stored here.

Compulsory sequence

This option can be used to specify whether or not logging the OPs on in the planned sequence is

compulsory. The following parameters are permitted:

N

J

Disabled

Enabled/active

If the parameter is enabled when the OP is logged on a check is made as to whether or not there is

an OP in the order pool for this machine/ workplace that is planned for the same time or previous to

this OP in the sequence, but was not yet started (i.e. status  = V/prepared). If yes, the OP logon will

be rejected.

Please  note:  If  the  planning  in  HYDRA  is  done  using  order  sequencing  (menu  ADE:  Planning  >

Order  sequencing),  a  configuration  of  the  sequencing  list  that  is  not  equal  to  "M"  (pool  of

workplaces)  and  an  active  compulsory  sequence  can  result  in  a  combination  that  does  not  make

sense.

Dialog control

To meet this requirement, a dialog control that deviates from the standard behavior can be defined

at the workplace in the dynamic dialog configuration on the Windows-based terminal (CTWIN / AIP)

and then a corresponding reference can be made to it in the dialog.

This configuration is only relevant and can only be used in the context of the HYDRA customizing.

Otherwise it has no significance.

Logon of several OPs

If several different operations are to be processed on the machine, this identifier must be selected.

Otherwise HYDRA only allows one order/ operation to be logged onto the machine.

Possible values:

PMV-SVP_81.docx

Version: 1.0.4778

Page 13 of 40

Master Data / Gage Management

J

As many OPs as desired can be logged on at the same time.

Please  note:  On  a  machine  to  which  a  terminal  with  operation  mode  MDE  is

assigned, a maximum of 20 operations can  be  logged on  at the same time. If

more than 20 operations must be logged on at the same time, this limitation can

be removed after a review by MPDV.

N

Only 1 OP can be logged on

1...9

A maximum of n OPs can be logged on

Posting

Quantity posting to person

If selected, this function is used to post the quantity of order interruptions/ logoffs to the person who

is logged on for the longest period.

Detailed information about quantity posting to persons can be found here.

Posting on OPs that are not logged on

If selected, a partial confirmation/upload, interruption or logoff for an OP can be performed on this

machine, even without a previous logon.

Posting the machine time in connection with operations logged on at the same time

If  set,  the  machine  time  for  OPs  logged  on  at  the  same  time  is  posted  as  a  proportion  on  the

operations and persons:

J

N

V

Z

Proportionate posting on OP and person acc. to the number of OPs

No proportionate posting. If the option is not set, every  operation receives the
complete machine time.

According to the default quantity of the OPs. Here it must be ensured that the
default quantity (target quantities in primary quantity unit) in the operation > 0.

According  to  the  standard  time  of  the  OPs  (available  starting  with  ADE  7.3).
Here it must be ensured that the standard time (processing time) in the

operation > 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces;  in  general,  the  option  should  not  be  set  for

them.

Automatic logoff of personnel when shift ends

This identifier is only relevant if an "X" is set for the identifier of the same name on the order type.

The  configuration  is  carried  out  by  MPDV  while  customizing  the  system.  Otherwise  it  has  no

significance.

PMV-SVP_81.docx

Version: 1.0.4778

Page 14 of 40

Master Data / Gage Management

This  identifier  is  used  for  the  more  detailed  configuration  of  the  personal  data  collection  at  MDE

workplaces.  Because  fully  automatic  shift  ends  are  generated  by  the  terminals  when  using  the

HYDRA MDE, a setting can be made here regarding whether the people logged onto the workplace

are automatically logged off at the end of the shift or if they remain logged on.

J

N

X

Always log off staff when shift ends

Always save staff when shift ends except for manual logoffs

Evaluate  the  person's  settings.  Now  the  person  will  be  searched  for  the

corresponding setting

Automatic OP posting when shift ends

This configuration is only relevant in the context of the HYDRA customizing by MPDV and can only

be used then. Otherwise it has no significance!

This identifier is only relevant if an "X" is set for the identifier of the same name on the order type.

Interrupt and log on again at beginning of shift

Interrupt

J

N

MPL

Further  information  about  the  HYDRA  module  MPL  can  be  found  in  the  corresponding  MPL

documentation.

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

If a material buffer is specified in this field, the field  Target buffer in each of the entry dialogs (e.g.

output batch change, log operation off) is automatically populated with this value.

If  no  material  buffer  was  entered  in  the  entry  dialog  (e.g.  deleted  from  the  input  field),  the  output

batch is automatically posted to this material buffer.

PMV-SVP_81.docx

Version: 1.0.4778

Page 15 of 40

Master Data / Gage Management

Automatic generation of batch number

If  this  identifier  is  set,  a  batch  number  is  automatically  generated  for  the  output  batch  to  be

produced.  Otherwise  during  the  operation  logon  or  output  batch  change,  the  input  of  the  batch

number of the new output batch to be produced is expected.

Please  note:  If,  in  the  field  Batch  management  the  setting  D  (=  Throughput  batch  recording)  is

activated,  the  value  for  Automatic  generation  of  batch  number  is  automatically  set  to  "J".  In  this

case, manual entry of the batch number is not possible.

  Consumption balance

During the OP logoff, an  additional dialog (V_BLZ)  is opened displaying the material components

and their consumption quantities in relation to the current OP logon. In this dialog, the operator has

the  option  to  log  off  input  batches  that  are  still  running.  The  option  is  only  enabled,  once  the

consumption balance has been activated for the material type of the output material.

Generate transport order for output batches

This option creates a transport order relating to batches for a generated output batch. The transport

is  started  from  the  material  buffer  in  which  the  output  batch  is  produced.  The  option  set  here  is

overridden by the configuration of the relevant option within the material type.

Generate transport order for input material

This  option  creates  an  article-related  transport  order  relating  to  a  material  component,  when  an

operation  is  planned  for  a  machine  using  the  shop  floor  scheduling  module.  Transportation  is

started from the output material buffer of the preceding operation. The option set here is overridden

by the configuration of the relevant option within the material type.

HLS

Further  information  about  the  HYDRA  module  HLS  can  be  found  in  the  corresponding  HLS

documentation.

Planning function

This  identifier  specifies  whether  or  not  a  workplace  or  a  machine  will  be  displayed  and  if  so,  in

which MOC planning function.

P

Planning in the graphic planning board of the HYDRA shop floor scheduling (HLS) or in
the graphic order sequencing (GAV), i.e. the workplace is planned using the HLS or the
graphic order sequencing and for this reason it is visible there, but not in the order
sequencing table (AVG).

Please note: Whether or not a workplace is displayed in the HLS or the graphic order
sequencing depends on other settings as well:
- Assignment to a group identified as a "capacity group"
- Responsibility area authorization for this workplace
- Planning profile

PMV-SVP_81.docx

Version: 1.0.4778

Page 16 of 40

Master Data / Gage Management

H

Only relevant when using the HYDRA shop floor scheduling module (HLS).

Same  as  P.  Furthermore,  the  workplace  is  also  considered  in  the  automatic  (server-
based)  planning.  The  activation  of  the  automatic  (server-based)  planning  can  only  be
performed while customizing HYDRA.

The  workplace  is  only  considered  in  automatic,  server-based  planning;  in  the  graphic
planning  board  the  workplace  is  not  displayed.  The  activation  of  the  automatic  (server-
based) planning can only be performed while customizing HYDRA.

Planning  in  the  order  sequencing  table  (AVG),  i.e.  the  workplace  is  planned  using  the
AVG module.

No planning; the workplace is displayed in neither the order sequencing AVG table nor in
the graphic order sequencing nor in the HLS module.

T

A

N

Planned year model

A  special  year  model  used  only  for  planning  in  the  HYDRA  shop  floor  planning  (HLS)  can  be

entered  here.  It  does  not  affect  entry  and  posting  in  the  ADE/MDE  module.  If  no  planned  year

model is defined, then the BDE year model (Master data tab) is used for the planning.

Availability

The  available  capacity  of  a  workplace/machine  can  be  defined  here.  The  default  value  for  the

available capacity is 1000 [per mill].

In  the  HYDRA  shop  floor  scheduling,  the  capacity  check  and  automatic  assignment  assume  that

each operation has a capacity requirement of 1000 [per mill], i.e. only one order/ operation can run

on the workplace/machine at a time. In case of a manual multiple assignment, a dialog informs the

user about the double assignment; automatic assignment always assumes a single assignment.

This setting can be used to extend the availability of the workplace such that a multiple assignment

is  permitted.  If  the  workplace  capacity  allows,  for  example,  processing  of  two  operations  at  the

same time, the available capacity should be set to 2000 [per mill] in this field.

If  nothing  is  entered  in  this  field  or  if  the  value  0  is  entered,  the  system  interprets  this  as  the

standard value of 1000 [per mill].

Utilization  of this function  is subject to the corresponding license and requires further customizing

services by MPDV, depending on the relevant field of application.

Quantities tab

This tab is only available if a resource of the type "MNR" is selected.

Conversion factors to basic quantity

At the machine or  workplace, the  quantities can be collected  in  various quantity types and accounts.  In

general, the following quantity accounts are supported:

Yield

PMV-SVP_81.docx

Version: 1.0.4778

Page 17 of 40

Master Data / Gage Management

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

The following quantity types are supported for each quantity account:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The  actual  use  of  several  quantity  types  or  accounts  depends  on  the  system  design.  For  example,  for

manual  entry  of  rework  quantity,  a  corresponding  input  field  must  be  configured  in  the  entry  dialog  (by

customizing).

Automatic quantities can only be entered in the "primary quantity" unit.

Quantity units and conversion factors for base quantity

A quantity unit is defined for each quantity type. The alternative quantity accounts can be entered directly

(manually). If this is the case, automatic conversion is not carried out.

If the alternative quantity accounts are not entered manually, a conversion into the alternative accounts is

carried  out  on  the  server  based  on  the  conversion  factors  or  the  units  configured  in  the  MOC  machine

master data.

Basis for HYDRA-MDE quantity conversion

The basis that will be used for quantity conversion is set here.

A

Use the conversion factors of the OP that is logged on. If no operation is logged on,

the quantity conversion from the machine/workplace configuration is used.

M

Use conversion factors from the workplace configuration for quantity conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate  the  quantity  unit  in  which  the  entry  at  this  machine/  workplace  is  primarily  carried  out.  In

case of automatic entry of quantities, these quantities are generally viewed as primary quantities.

PMV-SVP_81.docx

Version: 1.0.4778

Page 18 of 40

Master Data / Gage Management

If  an  automatic  quantity  conversion  into  another  quantity  type  is  to  be  carried  out,  indicate  the

conversion factors to basic quantity here.

Units and conversion factors for base quantity (S)

Quantity unit (S)

Here  indicate  the  secondary  quantity  unit  in  which  quantities  are  to  be  posted  to  the  workplace/

machine. If an automatic quantity conversion is to be carried out, indicate the conversion factors to

basic quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Here  indicate  the  tertiary  quantity  unit  in  which  quantities  are  to  be  posted  to  the  workplace/

machine. If an automatic quantity conversion is to be carried out, indicate the conversion factors to

basic quantity here.

Units and conversion factors for base quantity

Quantity unit (B)

Here indicate the base quantity unit in which quantities are to be posted to the workplace/ machine.

Manual entry of quantities, yield

Manual entry of yield

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows-based  terminals  this  option  does  not  affect  the  quantity  fields  displayed  in  the  entry

dialogs; modifications to these quantity fields are to be made using dialog configurations (terminal

configuration or customizing of the dynamic dialogs).

Allocation of yield

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

PMV-SVP_81.docx

Version: 1.0.4778

Page 19 of 40

Master Data / Gage Management

Posting of yield as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, scrap

Manual entry of scrap

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of scrap

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of scrap as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, rework

Manual entry of rework quantity

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of rework

Requirement: The option "Manual entry" must be set.

PMV-SVP_81.docx

Version: 1.0.4778

Page 20 of 40

Master Data / Gage Management

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of the rework quantity as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

Manual entry of quantities, open quantity

Manual entry of open quantity

This option should be set if quantities are to be entered manually, if allocation with another quantity

account is to be implemented or if the manual quantities are to be posted as cycles.

On Windows terminals this option does not affect the quantity fields displayed in the entry dialogs;

modifications  to  these  quantity  fields  are  to  be  made  using  dialog  configurations  (terminal

configuration or customizing of the dynamic dialogs).

Allocation of open quantity

Requirement: The option "Manual entry" must be set.

Using this option, manually entered quantities can be offset against other quantity accounts. In this

case,  the  quantity  entered  is  deducted  from  the  account  with  which  the  allocation  is  to  be

implemented.

Note here that negative values can also occur due to the respective quantity conversion.

Please note

This  option  may  NOT  be  set  for  DOS  terminals  if  yield  is  offset  against  scrap  or  scrap  is  offset

against yield in the counter configuration.

Posting of open quantity as cycles

Requirement: The option "Manual entry" must be set.

If this option is set, manually entered quantities are posted simultaneously as cycles. Note here that

the entered quantity is posted 1:1 as a cycle (partitioning is not considered).

MDE configuration tab

This tab is only available if a resource of the type "MNR" is selected.

PMV-SVP_81.docx

Version: 1.0.4778

Page 21 of 40

Master Data / Gage Management

Monitoring

Monitoring type

The following types of monitoring can be selected:

Monitoring by operating signal

No monitoring

Cyclical monitoring

If  cyclical  or  operating  signal  monitoring  was  selected,  a  malfunction  can  only  be  entered  if  a

request is made using the terminal ("Assign malfunction"). If no automatic monitoring is specified,

a new machine status can be specified at any time.

In  cyclical  monitoring,  when  a  counting  pulse  occurs,  an  automatic  switch  is  made  into  the

"Production" status. If operating signal was selected and when the operating signal is set, a switch

is made into Production. If no automatic monitoring was selected, the "Production" status must be

assigned manually.

Entry of malfunction reason required with specified delay time in [s]

(Only with terminal type CT 73x, CT 83x, not with master terminal/DS-100)

If a downtime without a reason was recognized, after the specified delay time the input window for

"Change  machine  status"  opens  automatically  on  the  terminal.  If  the  terminal  goes  back  into

production, the window still remains open.

If  a  machine  status  is  input  now  (during  production),  this  input  activates  a  reposting  event  that

reposts  the  most  recently  recorded  status  from  "General  disturbance"  to  the  new  status  that  was

input. If the reposting is correct, the window closes; otherwise, it remains open.

However, if a downtime is recognized again (with or without a reason), the previously noted status

can no longer be reposted. The window closes automatically.

If another downtime without a reason is recognized and the delay time has expired, then the input

window opens as described above.

If a downtime without a reason is recognized and the machine switches into production before the

delay time expires, then the automatic request for a malfunction reason is not carried out.

Important note:

This  reposting  only  affects  the  HYDRA  machine  data  collection;  online  correction  of  the  resource

performance accounts of the currently running OP is not possible !

Note regarding data maintenance:

All machine status modifications are displayed in the tabular event maintenance of MOC. However,

the reposting event is locked and cannot be edited.

In  order  to  perform  recalculations  correctly  now  with  respect  to  orders  and  machines,  the  original

event with the status "NOT ASSIGNED" must be changed to the correct status.

The reposting event does not affect the recalculation!

PMV-SVP_81.docx

Version: 1.0.4778

Page 22 of 40

Master Data / Gage Management

Minimum malfunction duration

If the operating signal monitoring type was selected, the duration that a malfunction must last until

it is recognized and logged in as a malfunction is specified in seconds in this field.

Minimum cycle time

If cyclical monitoring was selected, a minimum cycle time can be specified in seconds in this field.

From  this  minimum  cycle  time  and  the  target  cycle  stored  in  the  (logged  in)  operation  and

compensated with the cycle extension, the terminal determines the maximum value and uses it as

the cycle time specification.

If  both  the  minimum  cycle  time  and  the  target  cycle  stored  in  the  operation  are  0,  the  cycle  time

specification is set to 60000 seconds [per 1000 machine cycles].

Cycle extension

If  cyclical  monitoring  was  selected,  the  percentage  for  extending  the  target  cycle  time  must  be

input here in a range from 0 to 5000.

The  target  cycle  stored  in  the  (logged  in)  operation  is  compensated  with  this  percentage.  In  this

way,  a  value  less  than  100  indicates  a  shortened  cycle;  a  value  greater  than  100  indicates  an

extended cycle.

Number of target cycles

If  cyclical  monitoring  was  selected,  here  the  number  of  cycles  (0  to  a  maximum  of  9)  can  be

indicated  according  to  which  the  terminal  automatically  switches  from  a  status  not  equal  to

production into production status within the cycle time (prerequisite: no production lock is currently

set in the status not equal to production).

With  some  production  processes,  there  are  machine  cycles  in  set  up  phases.  By  setting  a  value

greater  than  0,  the  current  machine  status  does  not  change  immediately.  Please  note:  Until  a

switch is made into production, the quantities entered in this case are neither posted to the yield nor

the scrap quantities.

Cycles to be evaluated

This entry should be populated with 0.

Note regarding data maintenance:

All  machine  status  modifications  are  displayed  in  the  event  maintenance  dialog.  However,  the

reposting event is locked and cannot be edited.

In  order  to  perform  recalculations  correctly  now  with  respect  to  orders  and  machines,  the  original

event with the status "NOT ASSIGNED" must be changed to the correct status.

The reposting event does not affect the recalculation!

PMV-SVP_81.docx

Version: 1.0.4778

Page 23 of 40

Master Data / Gage Management

Administration

Posting during prod. lock

This setting can be used to set the type of posting of the counting pulses collected during the so-

called production lock. This configuration takes effect with all counters configured as "Yield".

Posting as scrap

If the counting pulses were configured on the counter, they are offset against the partitioning/ pulse

factor and posted as scrap. However, any defined allocations with another quantity account are not

carried out in this case.

Posting as yield parts

Posting of the counting pulses as yield

No posting

No quantities are posted during the production lock.

Pulse factor specific to machines

The pulse factor is used, for example, if lengths (e.g. from a wheel) are to be collected.

For  machines  for  which  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  are  entered  per

pulse,  the  value  should  always  be  set  to  0.  In  this  case,  the  pulse  factor  is  not  used  for  the

evaluation. That means that the posting of the number of cycles corresponds with the actual pulses

transferred via the MSS (machine interface).

The signals transferred from the machine (counting pulses) are collected by the MSS. The quantity

is calculated and posted as follows according to the configured number of pulses:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be evaluated as a fraction. In this way, in the quantity calculation

the pulse is included as a denominator while the partitioning is considered a numerator.

Pulses  that  occur  during  a malfunction  or  a  production  lock  (configuration  of  Posting  during  prod.

lock > scrap) are  interpreted as scrap. The scrap quantities are also calculated using the formula

given above.

Partitioning specific to machines

The partitioning specific to the machine is indicated here. This is included in the quantity calculation

in  a  multiplication  with  the  partitioning  entered  in  the  operation.  If  this  is  not  desired,  the  value  1

must be input here.

Extended weekend automatic

If  this  option  is  selected  and  with  the  corresponding  configuration  the  status  that  was  available

before status 999 was activated will be assigned at shift start.

PMV-SVP_81.docx

Version: 1.0.4778

Page 24 of 40

Master Data / Gage Management

Please note:

To set the option, the workplace must already be assigned to a terminal.

Detailed information about the automatic activation of status 999 can be found in the chapter  Day

types .

Wait. period short-term disturb.

To improve the overview, e.g. in machine history, a short-term malfunction status can be configured

per machine/ workplace. In the context of machine monitoring this status serves as a "container" for

any unconfirmed statuses that existed only for a certain (short) period of time.

If a downtime is automatically recognized on the terminal and the machine automatically goes back

into production, a check is made regarding whether or not this disturbance is shorter than the time

period configured here for short-term malfunctions.

If this is the case, the malfunction, which does not yet have a reason, is given the status (reason)

configured on the machine as the status for "short-term malfunctions".

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

The terminal outputs used for production statuses are indicated in these fields

Machine lock output

is set if the status "not assigned" occurs or a  status in which the

option "machine lock" is set.

Target quantity reached output  is set if the target quantity of the OP is reached.

Machine downtime output

is set if a status not equal to Production was recognized for the

machine.  When  changing

into  production,

the  output

is

immediately reset to 0.

Free I/O

Free input/ output for customer-specific customization.

These statuses can be used for connecting a monitoring light or a horn, for example.

The assignment of an output by entering the corresponding number in one of the fields specifies

which relay is interconnected by the terminal when the predefined status occurs. If "0" is entered,

no action occurs. Note that an output on a terminal may not be assigned more than once.

Please note

- The specification regarding the status in which the machine lock is to be set is carried out in the

context of the Status assignment.

- When the machine lock is activated using the available relay output of a DS 100, in general the

value "1" is to be entered in the input field. In this case, the machine lock is set if a correspondingly

configured status occurs and in the status not assigned.

PMV-SVP_81.docx

Version: 1.0.4778

Page 25 of 40

Output batch change

Customer-specific  assignment  of  an  input  with  an  automatic  output  batch  change  (MPL).  As  a

Master Data / Gage Management

default, the field should be left at 0.

PDE (Process Data Collection)

Collect process data

This parameter specifies whether or not process data are recorded for this machine. Process data

cannot be recorded for this machine if this parameter is not set at a machine.

External connection

External connection

If this machine is assigned to a master terminal, the following selection of connection options is

available:

Arburg control system  Arburg connection (only available if HYD-ALS is licensed)

Engel interfacing

Engel machine connection

No external device

No connection of an external device

DS100

MT3

PDE

DS100 connection

MT3 connection

Process data collection

If a DS100 or MT3 connection was activated, the device address field can be selected. If the option

Engel  interfacing  is  selected,  the  serial  number  field  can  be  selected.  The  option  Arburg  control

system enables the class field.

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device" allowed

"MT 3" and "No external device" allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)

The serial number of the connected Engel machine is entered  here. A prerequisite for using Engel

machines is the setting "EMS machine interface" in the HYDRA basic settings..

Device address

This field can be selected if a DS100 or MT3 connection was selected. The device address of the

sub-bus participant is entered here.

PMV-SVP_81.docx

Version: 1.0.4778

Page 26 of 40

Master Data / Gage Management

Resource configuration tab

Resource master data

Type

Identifier regarding the type of resource:

Resource:  A  resource  can  be  uniquely  identified  but  is  also  actually  present.  It  always  has  the

number 1.

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  the  value  in  the  field  Number  can  be  changed  from  1  to  another  positive  integer  value.

Anonymous resources cannot be posted because the actual reference to precisely one resource is

not possible. Please note the information in the chapter Anonymous resources.

Required resource: A required resource is a substitute for one or more actual resources that can be

identified.  The  resources  that  a  required  resource  represents  are  specified  in  the  configuration

WRM: Master data > Required resources. The number results from the number of actual resources

assigned to it.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future use.

Version

Modification number; the program version can be stored here for resources of type DNC.

Number

This  field  can  only  be  edited  if  it  contains  an  anonymous  resource  and  the  identifier  Anonymous

resource is set (see above). A value > 1 indicates how many of these resources are available.

This field is automatically calculated for required resources.

Resource family

Assignment  of  a  resource  family.  If  the  resource  family  is  subsequently  changed,  an  information

dialog appears as a warning because user fields can possibly be assigned with the resource family.

Target utilization

Cycles

The target cycles serve as additional information regarding how long the resource is to be used.

Runtime

The target runtime serves as additional information regarding how long the resource is to be used.

PMV-SVP_81.docx

Version: 1.0.4778

Page 27 of 40

Master Data / Gage Management

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and

for the machine data collection.

Original partitioning

Partitioning of the tool (= multiplicity or number of cavities) when using this tool.

Current partitioning

Current partitioning of the tool. This partitioning can deviate from the original partitioning, e.g. if the

original quantity can no longer be produced with a cycle due to a tool defect.

The posting of cycles to the tool is always carried out based on the current partitioning.

Please note: The partitioning  stored in the OP is relevant for the planning in the HLS module and

for the machine data collection.

Partitioning due to cavities

Setting the flag "partitioning due to cavities" causes the system to (re-)calculate the fields "current

partitioning" and "original partitioning" using the assignments in cavity management. Then the fields

can no longer be changed manually.

Log on with OP

This  identifier  is  used  to  control  whether  or  not  the  resource  is  logged  on  if  it  is  assigned  as  a

component in the list of production resources and tools for the operation. Possible values are:

None:

The resource is not logged on.

Implicit:  The resource assigned to the operation as a production resource and tool is automatically

(implicitly) logged on with the operation; an explicit logon or change in logon status is not possible.

Explicit:  The resource assigned to the operation as a production resource and tool can be logged

on explicitly or another resource can be logged on instead. If the resource is not explicitly logged on

or  if  no  other  resource  is  explicitly  logged  on,  the  current  resource  is  implicitly  logged  on;  in  this

way, the current resource serves as a "default".

Please note:

If another resource is explicitly  logged on,  it  will be  logged  on for the resource that has the same

resource  type  in  the  list  of  production  resources  and  tools  of  the  operation.  For  this  reason,  an

explicit  resource  logon  is  only  possible  for  resources  that  are  included  in  the  list  of  production

resources and tools of the operation as a requirement. In this way, no resource can be logged on

for which there is no requirement (= entry) in the list of production resources and tools.

In general, this identifier should be inactive for resource type DNC  because  a specific processing

exists for it in the HYDRA module DNC (NC programs are logged on separately).

PMV-SVP_81.docx

Version: 1.0.4778

Page 28 of 40

Master Data / Gage Management

Resources that are defined in the BOM of the machine are also logged on.

Parallel logon/ planning possible

The tool can be logged on/ planned in parallel.

Caution:  A  resource  can  be  logged  on  multiple  times  to  only  one  machine.  Consequently,  the

identifier "Parallel logon possible" refers to several different OPs on one machine.

Post to resource

Indicates whether or not the quantities and  times are to be posted to the resource. Due to a high

degree of complexity, this identifier should only be provided for those resources that will actually be

evaluated later.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Retooling time (teardown)

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

No processing. The configuration option of the same name stored in the resource type is used for

taking the resource allocation in the HYDRA shop floor planning into consideration.

Evaluation

Consider in evaluations

Reserved for future use.

File

File exists

Shows  whether  or  not  the  file  is  stored  in  the  specified  path.  The  files  are  checked  by  a  cyclic

process and the corresponding flags are set subject to whether or not the file is available.

File name

File name; without file extension for DNC. The file extension is added based on the configuration in

the resource type. The defined paths specify the storage location.

PMV-SVP_81.docx

Version: 1.0.4778

Page 29 of 40

Master Data / Gage Management

Comparison resources

Two  comparison  resources  may  be  indicated  here  for  energy  consumption  resources.  They  will

then be shown in comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resources to be compared

Resource type 1

Resource type of the resources to be compared

Resource 2

Resource number of the resources to be compared

Resource type 2

Resource type of the resources to be compared

Accuracy

More  detailed  information  on  measuring  accuracy  and  measuring  range  may  be  entered  here  for

test equipment resources.

User fields tab

User fields offer the possibility to store further customer-specific information to MES besides the available

fields in MOC standard. The tab provides eight sub tabs each of which providing eight user fields. The so

called user field key determines, which user fields are involved and which meaning they have.

Object type

User fields are configured for the relevant resource type, e.g. MNR for the workplace/machine.

User field key

Every user field key describes a combination of user fields. How the user field key is managed (and

thus the meaning of the fields) varies for the individual objects. User field keys are defined together

with the customer while customizing the system.

User fields

The following user fields are available after customizing the system:

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
Text
length
field,
10

Number of
fields
6
16

6
16
6

PMV-SVP_81.docx

Version: 1.0.4778

Page 30 of 40

Master Data / Gage Management

Field data type

Number of
fields
14

field,

length

Text
20
Text
40
A maximum of 8 fields are shown for each page.

length

field,

2

User field keys are not defined by default in the system. The system has to be customized respectively in

order to be able to support this kind of user fields.

Comment tab

The Comment tab allows additional comments about the resource to be stored.

Main tab “resource attributes”

Additional resource attributes are shown using the user field definitions of the resource family. The

"resource attributes" button is used for editing.

Resource list main tab

Shows  the  resource  list  for  the  selected  resource.  By  clicking  the  "resource  list"  button  you  can

directly go to the BOM application for editing purposes.

Toolbar

General tab

 Insert

Opens the dialog for adding resource lists

 Copy

Opens the dialog for copying resource lists.

 Edit

Opens the dialog for editing resource lists.

 Delete

Deletes one or several resources.

PMV-SVP_81.docx

Version: 1.0.4778

Page 31 of 40

Master Data / Gage Management

Resource tab

 Configuration – resource status

Opens the "resource status" application

 File - show file

Shows  the  file  -  only  available  for  document  resources  configured  as  file-based  resource  without

DNC processing in the resource type and if the corresponding license and function authorizations

are available.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superior resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is  entered as default  value for

the required resource.

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – measures

Opens the "measures" application.

 Functions – status change

Opens the dialog for changing the resource status.

 Functions – release of resource

Opens the dialog for releasing a resource.

 Functions – stock transfer

Opens the dialog for transferring/relocating a resource

PMV-SVP_81.docx

Version: 1.0.4778

Page 32 of 40

Workplace tab

Master Data / Gage Management

 Configuration – status assignment

Opens the application "status assignment". The selected resource is taken over.

 Configuration – counter configuration

Opens the application "counter configuration". The selected resource is taken over.

 Configuration – terminal assignment

Opens the application "terminal assignment". The selected resource is taken over.

 Entry – reasons

Opens the application "reasons". The selected resource is taken over.

 Entry – Operator positions

Opens the application "operator positions". The selected resource is taken over.

 Entry – premium indicator

Opens the application "premium indicator". The selected resource is taken over.

 Groups - groups

Opens the application "groups". The group of the selected resource is taken over.

 Groups – group assignment

Opens the application "group assignment". The selected resource is taken over.

 Other – cycle parameter

Opens the application "cycle parameter". The selected resource is taken over.

 Other - workforce requirements of workplaces

Opens  the  application  "workforce  requirements  of  workplaces".  The  selected  resource  is  taken

over.

PMV-SVP_81.docx

Version: 1.0.4778

Page 33 of 40

Master Data / Gage Management

DNC tab

The  tab  is  only  available  if  a  DNC  resource  is  selected.  These  are  resources  configured  as

resources with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

 File - comparison editor

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  Please  see  below  for  further

information.

 File - export

Exports the file entered for the resource. The target file is input using the file explorer.

 File - import

Imports the file entered for the resource. The source file is selected using the file explorer.

 File - viewer

Opens the file entered for the resource for viewing using the defined viewer program.

 File - editor

Opens the file entered for the resource for editing using the defined editing program.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens  the  "resource  list"  application.  The  selected  resource  is  entered  as  default  value  for  the

superior resource.

PMV-SVP_81.docx

Version: 1.0.4778

Page 34 of 40

Master Data / Gage Management

 Functions – status change

Opens the dialog for changing the resource status.

 Functions – release of resource

Opens the dialog for releasing a resource.

Operation of the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  There  are  two  operating

modes:

Selection of one resource:

The released resource and the optimized  version of the resource are displayed  for comparison.

The file entered on the right-hand side of the editor can also be changed. Once the changes have

been  made,  they  are  taken  over  to  the  system,  just  as  it  is  also  the  case  for  the  simple  editor.

This mode can only be used for DNC types with the file processing type "optimized".

Selection of two resources:

PMV-SVP_81.docx

Version: 1.0.4778

Page 35 of 40

Master Data / Gage Management

If two resources are selected, the editor compares the two selected resources. The file type may

be selected. The file  entered to the right of the  editor may  also  be changed. Once the changes

have  been  made,  they  are  taken  over  to  the  system,  just  as  it  is  also  the  case  for  the  simple

editor.

The functions of the comparison editor can be opened using the relevant  buttons or by clicking the right

mouse button (context menu):

-  Reject:  The  detected  difference  (on  the  right)  is  rejected.  The  value  from  the  left  file  is

accepted. The difference is no longer selected.

-  Keep: The detected difference (on the right) is accepted. The difference is no longer selected.

-  Next difference: goes to the next difference.

-

Insert: Inserts a row at the current position.

-  Contents of a row can always be changed by clicking the row and inputting values. The row can

be left by clicking Esc without making any changes. The row is then highlighted as "changed".

-  Swap windows: this button allows for windows to be swapped. This function is necessary if two

resources are compared with each other. Their order results from the display order in the table

and  the  system  does  not  know  which  resource  needs  to  be  changed.  This  button  is  not

available  if  only  one  resource  is  selected.  For  only  the  optimized  program  version  can  be

changed.

-  Save: Saves the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration modifications

In order that the settings or modifications made can be interpreted by the terminal shop floor program, the

terminal to which the workplace/ machine is assigned must be restarted.

Deleting a machine/ workplace

If  data  is  already  recorded  and  saved  for  a  machine/  workplace,    the  relevant  configuration  data  of  the

machine  (including  the  data  from  the  status  assignment,  the  maintenance  calendar  and  the  process

parameters in the MDE module, among others) is automatically deleted as well.

The previously existing movement data (events, postings) are not automatically deleted with this action;

instead, it is deleted later in context of the specified deletion cycles (default: 35 days).



PMV-SVP_81.docx

Version: 1.0.4778

Page 36 of 40

Master Data / Gage Management

3  Resource Families

Summary

Menu

Master data  Resources  Resource families

Transaction code

resfam.*

Function authorization  mdrfam

This document describes the application "Resource families” within the Manufacturing Operation Center

(MOC).

Usage

If  the  assignment  between  resource  and  resource  type  is  assumed,  it  is  clear  that  in  one  production

company,  different  resources  of  the  same  resource  type  exist,  which  also  are  handled  differently.  That

means that in general classification according to resource type is not sufficient for ordering the resources

in a useful way.

By  defining  so-called  resource  families,  a  sub  classification  of  resource  types  can  be  created.  The

following graphic shows an example of how the resource type "Tool" is divided into two resource families,

"Drill"  and  "Injection  mold".  Each  of  the  individual  resources  is  assigned  to  one  of  the  two  resource

families.

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

PMV-SVP_81.docx

Version: 1.0.4778

Page 37 of 40

Master Data / Gage Management

Integration

The resource families offer another structural level subordinate to the resource types. The function of the

master-detail user fields of the resources that can be defined using the resource types can be refined by

definition in the resource families. The resource families are used in particular in the DNC area as a main

search criterion and as an assignment criterion on machines.

Selection parameters

In  the  selection  panel,  filters  can  be  used  for  both  superior  and  assigned  resources.  The  following

selection criteria are available in the respective application:

Resource type

Type of resource.

Resource family

Family to which the resource is assigned.

Field descriptions

Resource type

Resource type to which the resource families refers

Resource family

Unique "descriptive" designation of the resource family.

This  value  can  be  searched  for  (selected)  in  the  various  functions.  Because  a  resource  or  its

resource ID can only be uniquely identified within the resource type, in the evaluations the resource

type of the resource is always displayed as well.

Description

Explanation of the resource family; functions as a comment.

Responsibility area

Definition of the responsibility area. By specifying a responsibility area for a family, the responsibility

area for the assigned resource is also specified, which controls its visibility and editing options.

Field description for the General tab

User field key

Reference to a valid user field key. The specified user field key overwrites the specification in the

resource type.

Note regarding DNC filtering using a DNC family and its search fields:

PMV-SVP_81.docx

Version: 1.0.4778

Page 38 of 40

Master Data / Gage Management

The  definition  of  a  suitable  user  field  combination  is  important  for  using  the  flexible  filter  and  search

function  in  the  DNC.  The  definition  of  such  user  field  combinations  is  reserved  for  MPDV  customizing.

The assignment and use of this user field key is the user's responsibility. With the defined search fields,

the  DNC  records  are  filtered  on  the  terminal  in  addition  to  the  DNC  family  of  the  machine  and  can  be

used as search criteria on the console.

Starting with release DNC 7.2, the following preconfigured user field keys will be delivered:

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

4.  Version, mandatory field, can be edited

DNC_K_W

Plastic (tool reference only):

1.  Tool, mandatory field, cannot be edited

DNC_K_WV

Plastic (tool reference and version):

1.  Tool, mandatory field, cannot be edited

2.  Version, mandatory field, can be edited

DNC_NC

NC programs:

1.  Article, mandatory field, cannot be edited

DNC_NC_V

NC programs:

1.  Article, mandatory field, cannot be edited

2.  Version, mandatory field, can be edited

DNC_NC_M

NC programs

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

DNC_NCMV

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Version, mandatory field, can be edited

DNC_FREI

1.  Search field 1, Text20, mandatory field, can be edited

PMV-SVP_81.docx

Version: 1.0.4778

Page 39 of 40

Master Data / Gage Management

2.  Search field 2, Text20, optional field, can be edited

3.  Search field 3, Text20, optional field, can be edited

4.  Search field 4, Text20, optional field, can be edited

Note regarding DNC administration

DNC  records  are  used  exclusively  on  machines.  To  prevent  errors  in  input  and  assignments,  a  fixed

assignment  of  a  DNC  resource  family  to  every  machine  is  carried  out  and  saved  in  the  data  of  the

machine resource (field Resource family DNC). In this way, it can be ensured that only programs of one

resource family and, indirectly, of one resource type can be loaded on the machine.

Furthermore,  for  DNC  records  administration  criteria  are  needed  that  make  selection  and  evaluation

easier,  so  that  identification  and  processing  are  also  easier,  and  that  enable  checks.  Because  different

machine types (e.g. injection molding machine, printer, NC machines) can be  considered  with  the DNC

administration,  a  strict  specification  of  these  criteria  is  not  useful.  For  this  reason,  there  is  a  resource

family for which attributes are stored using the user fields; in turn, these attributes describe and specify

the variable parameters.

The attributes are used for identification and can be provided with plausibility functions and assignments

in  order  to  create  a  context  for  the  DNC  programs  with machines  and  operations  (see  the  "User fields"

chapter).

There are parameters, such as temperature or humidity that affect the behavior of the machine and can

therefore  influence  production.  These  "environmental  factors"  can  also  be  collected.  To  do  this,  further

attributes just have to be defined in the user fields.

PMV-SVP_81.docx

Version: 1.0.4778

Page 40 of 40

