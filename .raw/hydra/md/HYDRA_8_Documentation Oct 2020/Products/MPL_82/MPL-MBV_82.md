Manual

Material and Inventory
Management
MPL-MBV 8.2

Version 1.0.23555

Last changed on: 08.10.2020

Material and Inventory Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MPL-MBV_82.docx

Version: 1.0.23555

Page 2 of 48

Material and Inventory Management

Contents

1  Material and Inventory Management ........................................................... 4

2  Applications Available in MOC ..................................................................... 6

3  Material Types .............................................................................................. 7

4  1 Assignment Material - Material Type ...................................................... 18

5  Material Buffer ............................................................................................ 20

6

Inventory Limits .......................................................................................... 24

7  Transport Units ........................................................................................... 26

8  1 Assignment of Transport Unit to Material Type ....................................... 28

9  Batch data overview ................................................................................... 30

10  Generating Batch Numbers ........................................................................ 36

11  Interrupting/Finishing OP without the Last Batch ....................................... 37

12  Batch Consumption .................................................................................... 41

13  MPL for the coil-based production ............................................................. 45

Purpose ....................................................................................................................... 45

General information ..................................................................................................... 45

Using the terms "Length" and "Width" ................................................................ 45

Using the unit "Surface per piece" ...................................................................... 46

Mother/child operation ........................................................................................ 46

Other terms ........................................................................................................ 46

Further notes/restrictions .................................................................................... 48

Configuration ............................................................................................................... 48

MPL-MBV_82.docx

Version: 1.0.23555

Page 3 of 48

Material and Inventory Management

1  Material and Inventory Management

Purpose

The material and inventory management function allows for material/batches to  be managed as  well as

classified  and  grouped  in  material  types.  These  material  types  specifically  control  data  collection  and

processing in MES.

The function package also provides functions to edit and, if necessary, correct data of collected batches

at a later point in time.

Implementation Considerations

Use this function package to:





control system performance relating to batches subject to the material.

to correct data of recorded batches subsequently

Integration

The material type, which is a fundamental element of order data as well as of component data or the used

batches, integrates the function package with a variety of function groups.

Features

  Configuration of material types

o  Editing function of material type master data to control material-specific processing

  Configuration of assignment of materials to material types

o  Editing function to classify material in material types

  Configuration of material buffers

o  Editing function to create master data for material buffers

  Configuration of inventory limits

o  Function to edit inventory limits of material buffers

  Configuration of transport units

o  Editing function to classify materials based on transport units

  Configuration to assign transport units to material types

o  Editing function to assign transport units to the configured material types

  Editing and correction of batches

o  Editing and correction functions for recorded batches in batch data overview

  Display and usage of recorded material movements

o  Goods receipts

o  Consumption

MPL-MBV_82.docx

Version: 1.0.23555

Page 4 of 48

Material and Inventory Management

  Manual or automatic assignment of batch numbers

o  Manual or automatic assignment of batches or batch numbers according to configuration

  Deletion of last batch

o  Usage of the output batch generated at last according to configuration

  Consumption recording

o  Recording of batch consumption according to configuration

MPL-MBV_82.docx

Version: 1.0.23555

Page 5 of 48

Material and Inventory Management

2  Applications Available in MOC

Application

Documentation

Transaction
code

Function
authorization

Material type

MOC_MaterialType.pdf

Assignment  of  material
material type

to

MOC_AssignementMaterialMaterialtyp
e.pdf

mtyp

asmm

Material buffer

Inventory limits

Transport units

MOC_MasterDataMaterialBuffer.pdf

mbuf

MOC_InventoryLimits.pdf

MOC_TransportUnits.pdf

invl

tu

mtyp

asmm

mbuf

invl

tu

Assignment  of  transport  unit
to material type

MOC_AssignementTransportUnitMater
ialtype.pdf

astrum

astrum

Batch data overview

MOC_BatchOverview.pdf

Material movements

MOC_MaterialMovements.pdf

batov

mmov

batov

mmov

MPL-MBV_82.docx

Version: 1.0.23555

Page 6 of 48

Material and Inventory Management

3  Material Types

Overview




HYDRA menu

Master data  Material  Material types

FEDRA menu

Detailed scheduling  Master data  Material types

Transaction code

mtyp

Function authorization  mtyp

Available user fields

Where

Detail view

Object type/user field key

Source (type)

MATTYP/SYSTEM

Material type (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

Use this function to create or modify material types in the system.

Integration

The system uses the material type and the settings stored with it to control the system behavior of objects

that are assigned to this material type.

Selection criteria

Material type

Unique material type key

Type

Category of the material type

Description

Description or name of the material type (plain text)

Field descriptions - General

Material type

Unique material type key

Batch size

Typical batch size for batches of this material type.

MPL-MBV_82.docx

Version: 1.0.23555

Page 7 of 48

Description

Description/name (plain text) of the material type

Material and Inventory Management

Category of the material type

You  can  assign  a  type  to  group  and  classify  material  types  that  belong  to  the  same  category.

Assigning a type, however, does not control the processing.

Type

Unit

Unit used for materials of this type.

Field descriptions – Input batch processing

Inventory management

E - Yes, when logging input batch off

Here, you manually record the used quantity of a batch or the remaining quantity when you log off

the batch. Once the batch is logged off, quantities are reduced and the consumption is uploaded to

the higher-level systems.

R - Yes, backflush (retrograde)

Once the batch is logged off and the operation is interrupted or logged off, the consumption values

are reported to the higher-level system.

G - Yes, backflush (only with output batch = yield)

Same  procedure  as  with  R;  but  the  quantity  of  the  input  material  is  only  reduced  in  a  retrograde

manner if the output batch produced is a yield quantity (batch class = G).

N - No inventory management. Batches of this material type are not included in the stock overview.

Note: Depending on the configuration, you can enter the remaining quantity or the consumption. In

general, you can do so, when changing input batches via the Windows terminal.  When logging off

the input batch, this quantity is posted to the respective batch. This applies for options E, R, G and

N.

A – Anonymous inventory management

Batches of this material type are processed as material without batch reference when it comes to

composition.

Log off input batches (when OP is interrupted/logged off)

A – Input batches are automatically logged off when an operation is interrupted or logged off and

then get the batch status "processed".

F – Input batches are automatically  logged  off when  an operation  is interrupted  or logged  off and

then get the batch status "free".

MPL-MBV_82.docx

Version: 1.0.23555

Page 8 of 48

Material and Inventory Management

G  –  Input  batches  are  logged  off  when  an  operation  is  interrupted  or  logged  off  according  to  the

configurations in the basic parameter settings.

N – Input batches are not automatically logged off when an operation is interrupted or logged off.

S – Input batches are automatically logged off when  an operation is interrupted or logged off and

then get the batch status "blocked".

Tolerance when logging off

Value in %.

When  the  input  batch  is  logged  off,  the  system  checks  if  the  absolute  value  of  the  remaining

quantity is less than the percentage value of the original quantity specified in this field. If this is the

case, the batch is set to batch status Processed and identified as consumed.

Maximum value

The maximum value specifies the tolerance when logging off.

If the remaining quantity is less than the specified percentage value but greater than the maximum

value, the batch is not set to batch status Processed.

Standard quantity of unknown input batches

If  a  quantity  for  unknown  input  batches  is  specified  and  an  unknown  input  batch  of  this  material

type is recorded, this unknown input batch will be entered with the specified quantity. If no value is

specified, the system generates the unknown input batch with the quantity 1,000,000,000.

Options

Can be logged on several times to one machine

You can use this option to log on an input batch to a machine for multiple items of the component

list (BOM items) of an operation.

If the option is not set, the system issues an error message if you try to log on an input batch that is

already logged on once more.

Example:

The following material components are assigned to an operation:

BOM item 0001

Material 487191

BOM item 0002

Material 923948

BOM item 0003

Material 487191

BOM item 0004

Material 574857

BOM item 0005

Material 487191

If the option is enabled, batch 000007153 with material number 487191 can be logged on to one

of the three items 0001, 0003, 0005 or to two or even to all of these items. If the batch is already

logged on, the system shows a selection window every time you attempt to log on the batch once

more. The window shows the available BOM items of the material. To log on the batch once more,

MPL-MBV_82.docx

Version: 1.0.23555

Page 9 of 48

Material and Inventory Management

the  user  has  to  select  the  required  item.  After  confirmation,  the  batch  is  logged  on  to  this

(additional) item of the BOM. If the user selects a BOM item where the batch is already logged on,

the labeling of the button changes and the respective batch can be logged off.

In  general,  different  batches  can  be  logged  on  several  times  for  the  same  material

(same  material  and  different  BOM  items),  irrespective  of  how  this  option  is  set.  If  this

option  is  enabled,  the  system  assumes  that  the  option  Can  be  logged  on  to  several

machines at the same time is also enabled.

This option does not allow to log on unplanned material.

In case of merged batches, you cannot use the option Can be logged on several times

to one machine.

Can be logged on to several machines at the same time

You  can  log  on  the  input  batch  to  several  workplaces  and/or  operations  at  the  same  time.  In  this

case, it is does not make any difference if the input batch that is already logged on to an operation

at a machine



is logged on to another operation of the same machine,



is logged on to another operation of another machine,



is logged on to the same operation of another machine.

In  case  of  merged  batches,  you  cannot  use  the  option  Can  be  logged  to  several

machines at the same time.

Input batch must be logged on

This  option  activates  an  additional  validation  check  when  an  operation  is  logged  on  that  requires

batch management. For all material components (BOM items) with a material type where this check

is enabled, the system checks if batches have already been logged on. If the check has a negative

result, the logon of the operation is refused.

If you want all materials of the component list to be logged on as input batches before the OP can

be logged on, you can configure this via the material type. To do so, use the option Log OP on only

if all components are logged on as inp. batches of the tab Output batch processing.

The system performs the validation check ONLY when you log on the operation.

When an input batch is changed using  the function  Input  batch change,  no check takes

MPL-MBV_82.docx

Version: 1.0.23555

Page 10 of 48

Material and Inventory Management

place.

That means: In case of an input batch that must be logged on (see this option), you can

log off this input batch, without logging on a new batch for the respective BOM item.

Hand batch number down

If you log on an input batch with a material type where this option is set when the order starts, the

system uses this batch number as batch number for the output batch to be logged on.

At the same time, the system checks if the batch number of the input batch may be handed down

when the output batch is logged on, i.e. the system checks if the option is enabled for the material

type of the input batch.

This option is processed and run-through batch processing in combination with the configured.

If  this  option  is  set,  you  also  have  to  set  the  option  "Input  batch  only  valid  for  exactly  1

output batch".

Input batch only valid for exactly 1 output batch

If this option is enabled for the material type of a component, you  must log on at least 1 batch as

input batch for each output batch.

Note: This option only controls how the batch change is processed (CA_WL). This option does not

ensure  that  an  input  batch  can  be  logged  on  again  at  a  later  point  in  time  (when  another  output

batch is active).

This option is processed and run-through batch processing in combination with the configured.

If  you  use  this  option  without  run-through  batch  processing,  incorrect  batch  assignments  can

occur during tracing. In this case, the succeeding input batch is linked to the output batch that

must actually be logged off.

Allow entry of unknown input batches

Using this option, the system can automatically generate and log on input batches that the system

didn't know beforehand.

If you enable this option and if the input batch is not known in the system when you log on the input

batch,  then  the  system  creates  this  unknown  batch  using  the  selected  BOM  item  (material).  The

batch is created with a quantity of 1000000000 in primary quantity unit of the operation and a goods

receipt posting is performed.

To identify the correct material type, a configuration/assignment between material and material type

must  be  available  so  that  the  system  can  uniquely  identify  the  material  type  using  the  material

number  of  the  component.  If  a  material  is  not  assigned  to  a  material  type,  the  material  type

SYSTEM is automatically assigned.

MPL-MBV_82.docx

Version: 1.0.23555

Page 11 of 48

Material and Inventory Management

Requirement:  You must activate the recording of unknown batches in the  basic  settings

using the option MPL  Create unknown batches.

Use data for output material

This  option  specifies  if  the  system  uses  the  expiry  date  of  the  input  batch  to  calculate  the  expiry

date of the output batch. Note: This option is only available if a logged on input batch has a material

type where this option is enabled. Only in this case the generated output batch can use the expiry

date of the input batch if configured accordingly (see "Determination of expiry date" in the "General"

tab).

Decision on changing the input batch

If this option is enabled, the system displays a warning message when the input batch is changed

and before the current input batch is logged off.

Especially  when  serial  numbers  are  collected,  this  warning  message  informs  the  user  that  all

components with a serial number must be evaluated before logging the input batch off. Only then,

the components can be "properly" linked to the resulting output batch (merged batch).

Pass batch attributes on

You  can  use  this  option  to  transfer  configured  batch  attributes  of  an  input  batch  to  the  resulting

output  batches.  The  configuration  can  be  complemented  flexibly  using  the  extended  object

configuration.  The  configuration  is  described  in  the  following  document:  Configuration  to  pass  on

batch attributes

Pass document links on

You can use this option to transfer document links of an input batch to the resulting output batches.

The  configuration  can  be  complemented  flexibly  using  the  extended  object  configuration.  The

configuration is described in the following document: Configuration to pass on document links

Field descriptions – Output batch processing

Min. storage time

Minimum storage time of the material type

The system uses this value to calculate the availability date when the output batch is generated (by

adding it to the manufacturing date/time). As long as this calculated point in time is in the future, a

batch remains in "Min. storage time" status and cannot be logged on.

Note: You can use the configuration Assignment material to material type to override this setting for

specific material.

Warning limit

Warning limit of the material type

MPL-MBV_82.docx

Version: 1.0.23555

Page 12 of 48

Material and Inventory Management

The  system  uses  this  value  to  calculate  the  respective  warning  date  when  the  output  batch  is

generated (by adding it to the manufacturing date/time). You can use the function Warning report,

for example, to integrate this value in evaluations.

Note: You can use the configuration Assignment material to material type to override this setting for

specific material.

Expiry limit

Expiry limit of the material type

The  system  uses  this  value  to  calculate  the  respective  expiry  date  when  the  output  batch  is

generated  (by  adding  it  to  the  manufacturing  date/time).  At  this  point  in  time,  the  batch  is

automatically set to "Expired" status and can no longer be logged on.

Note: You can use the configuration Assignment material to material type to override this setting for

specific material.

Reserved when batch is generated

You  can  use  this  option  to  automatically  reserve  the  output  batches  produced  for  subsequent

processes. You can make reservations on different levels.

Values:







- No automatic reservation when batches are generated

- Reservation for all OPs of the order

- Reservation for subsequent OPs

With  the  last  two  values,  the  system  checks  if  a  reservation  is  available  when  an  input  batch  is

logged

on

subsequently.

In  coil-based  production  (MPL-RF)  and  with  so-called  cutting  machines,  the  reservation  is  always

made for the subsequent mother operation.

Options

Input batch change mandatory if remaining qty. <=0

If  this  option  is  enabled,  the  currently  logged  on  input  batches  are  highlighted  in  red  that  have  a

remaining quantity, which is less than or equal to 0, when an output batch is changed. These input

batches must now be logged off.

This  option  is  only  applicable  for  MPL  machines  (batch  management)  with  machine  type  "M".

The terminal processes this option locally.

This option is only applicable for the dialog Output batch change (CA_WL_MPL). The remaining

quantity displayed for the logged on input batch must be equal to or less than zero (<= 0). The

system can only perform this check, if the remaining quantity of the input batch is less than or

MPL-MBV_82.docx

Version: 1.0.23555

Page 13 of 48

equal to 0 (<= 0) before the posting.

Material and Inventory Management

Log OP on only if all components are logged on as inp. batches

If this option is set, the OP using the output material  can only be logged  on  if all materials of the

component list are logged on as input batches.

If this option is not set, the OP can be logged on even if not all of the materials are logged on as

input batches.

Consumption balance

When  you  log  off  an  OP,  the  system  opens  an  additional  dialog  (V_BLZ)  displaying  the  material

components  and  their  consumption  quantities  in  relation  to  the  OP  that  is  currently  logged  on.  In

this dialog, you can also log off input batches that are still running. The option only becomes active

when the consumption balance of the machine has been activated in the "MPL" tab.

Serial no. requirement (MPL-SNR, as of MPL 7.2)

If  the  system  records  serial  numbers  (ADE-SNR),  and  if  this  option  is  active  and  the  operations

require batch management, then the system generates an additional batch per serial number in the

MPL  module.  Batches  are  only  collected  per  serial  number  (using  command  A_TR)  if  the

operations  require  serial  number  management  =  E.

In

the

table  "Batch  relationships"

(mpl_beziehungen),  traceability  to  the  current  output  batch  (ID)  is  established  using  the  serial

number recorded.

Generation of HU (MPL-SNR, as of MPL 7.2)

If  the  option  "Serial  number  requirement"  is  set,  you  can  use  this  option  to  control  if  the  serial

numbers recorded are stored in relation to a handling unit (merged batch). The option is currently

only intended for customizations and does not have any effect.

Note: The system only checks this option when the OP is logged on and when the output batch is

changed.  When  an  input  batch  is  changed  using  the  function  Input  batch  change,  no  check  is

performed.

Log off/interrupt OP without the last batch

If  the  option  is  set,  a  last  output  batch  is  generated  for  the  article  of  the  operation  (matching  this

material  type)  between  the  last  output  batch  change  and/or  OP  logon  and  the  OP  interruption

and/or OP logoff, but this output batch is immediately deleted (batch status = "D"). The batch is not

visible  in  the  batch  history.  For  further  information  on  this  function,  refer  to  the  document

"Interrupting/Logging off OP without the Last Batch".

Delete batch assignment

If  this  option  is  enabled,  the  link  between  the  output  batch  "deleted  last"  to  the  currently  running

input batches of the OP is deleted. As a result, the deleted batch is not visible in batch tracing.

MPL-MBV_82.docx

Version: 1.0.23555

Page 14 of 48

Material and Inventory Management

Automatic assignment of serial numbers

This  option  enables  the  automatic  assignment  of  numbers  for  a  new  part  when  merging

components  listed  by  serial  numbers.  If  this  option  is  not  set,  you  can  assign  the  serial  number

manually. The option is only relevant if the option "Superordinate serial number" = N is set for the

component.

User field key for output batches

The defined user field key is transferred to the generated output batches.

Behavior when output batch has quantity 0

Use the option Behavior when output batch has quantity 0 to specify system behavior when output

batches are changed and the quantity is 0. You can choose  from the following three configuration

options.

"empty“

No reaction. Output batches are changed with quantity 0.

"Warning“

A warning message is displayed. You can still override the warning message. If

you override the warning message, output batches are changed with quantity 0.

"Error message“  An  error  message  is  displayed.  The  error  message  cannot  be  skipped.  The

output batches cannot be changed with quantity 0.

Standard quantity of output batches

If a quantity is entered for output batches and an output batch of this material type is generated, the

quantity field of the shop floor client is populated  with the specified quantity.  You can still change

this default assignment at any time.

Field descriptions - General

Determination of expiry date

  Current point in time

The expiry date is calculated using the current point in time and the duration stored for the

material type of the output batch.

  Shift date

The expiry date of the generated output batch is identified using the current shift date, the time

00:00 and the expiry limit stored for the material type.



Input batch

The expiry date of the generated output batch is identified using the running input batch where

the option "Use data for output material" is set for the material type.

  Processing based on enhanced object configuration

An additional configuration in the Advanced object configuration specifies how the expiry date of

the generated output batch is identified:

MPL-MBV_82.docx

Version: 1.0.23555

Page 15 of 48

Material and Inventory Management

o  Use the closest expiry date of all logged on input batches

If this configuration is active, the expiry and warning time of the input batch with the

closest expiry time is used for the output batch. The availability date is calculated using

the configuration in the "Output batch processing" tab.

Parameter name

Parameter value

Object type

Object ID 1

MATTYP

Material

type  of

the  output  batch.  The

configuration is valid for this material type.

Parameter

DATE_OF_EXPIRY_CALCULATION

Parameter value

MIN_DOE_OF_INPUT_MATERIAL

o  Use

the

closest

expiry

date

of

selected

input

batches

If  this  configuration  is  active,  the  expiry  and  warning  time  of  the  input  batch  with  the

closest  expiry  time  is  used  for  the  output  batch.  To  identify  the  closest  expiry  date,  the

system  only  uses  input  batches  of  the  configured  material  type.  The  availability  date  is

calculated using the configuration in the "Output batch processing" tab.

Parameter name

Parameter value

Object type

Object ID 1

MATTYP

Material

type  of

the  output  batch.  The

configuration is valid for this material type.

Parameter

DATE_OF_EXPIRY_CALCULATION

Parameter value

MIN_DOE_OF_SELECTED_INPUT_MATERIAL

When the relevant input batches are identified, the system only uses the

batches  that  can  be  identified  via  an  additional  configuration  for  the

material type.

Parameter name

Parameter value

Object type

Object ID 1

Parameter

MATTYP

Material type for which the configuration applies

DATE_OF_EXPIRY_CALCULATION

Parameter value

INCLUDE_IN_DOE_SELECTION

WIP material (Work in Process)

This option specifies whether a batch of this material type is automatically logged on as input batch

for the subsequent operation (according to the operation sequence of a production order) (as  WIP

material). Find a description of how to configure this function here.

MPL-MBV_82.docx

Version: 1.0.23555

Page 16 of 48

Material and Inventory Management

Options

Transfer to interface (goods movements)

If  this  option  is  enabled,  the  produced  output  batch  is  identified  as  goods  receipt  or  the  used  up

input batch as goods issue. These material movements must then be uploaded.

Hold back goods receipt until usage decision is made

You can use this option to delay the transfer of goods receipts to the PPS system. In this case, the

output batch is transferred only if a usage decision is taken.

Field descriptions - Transport

Generate transport order for output material

If this option is enabled, the system creates a  transport order for a batch when an output batch is

produced. The transport starts from the material buffer that includes the output batch. This option

overrides the configuration of the respective option in the workplace configuration.

Generate transport order for input material

Use this option to create a transport order for an article (and relating to a material component) when

you plan an operation at a machine using the shop floor scheduling module. Transport starts from

the output material buffer of the preceding operation. This option overrides the configuration of the

respective option in the workplace configuration.

Field descriptions – User fields

You can customize the system to release user fields for the object type “MATTYP”.

MPL-MBV_82.docx

Version: 1.0.23555

Page 17 of 48

Material and Inventory Management

4  1

Assignment Material - Material Type

Overview

Menu

Master data  Material  Material assignment - Material type

Transaction code

asmm

Function authorization

asmm

Usage

This function is used to assign the appropriate material type to a material in the system.

Integration

Each material can be assigned to a material type. The assignment is used



if a goods receipt batch is recorded manually



if an unknown batch is defined

Requirement

The material type must be defined in the system.

Selection criteria

The following selection criteria are available in the application:

Material

Only the selected materials are selected.

Material type

Only materials with the selected material type are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

Field descriptions

Material

Material number that is to be assigned to the material type.

Material type

Assigned material type. This must be defined in the system.

MPL-MBV_82.docx

Version: 1.0.23555

Page 18 of 48

Material and Inventory Management

Comment

Additional text regarding the material, comments

Min. storage time

Minimum storage time for the material type

During  batch  determination,  the  corresponding  availability  date  is  calculated  using  this  value  (by

adding it to the date of manufacture). Up to that point, a batch remains in "Min. storage time" status

and cannot be registered.

Please  note:  this  setting  overrides  the  setting  with  the  same  name  in  the  Material  type

configuration.

Warning limit

Warning limit of the material type

During  batch  determination,  the  corresponding  warning  date  is  calculated  using  this  value  (by

adding  it  to  the  date  of  manufacture).  This  can  be  used  for  an  evaluation,  e.g.  using  the  function

Warning report.

Please  note:  this  setting  overrides  the  setting  with  the  same  name  in  the  Material  type

configuration.

Expiry limit

Expiry limit of the material type

During batch determination, the corresponding expiry date is calculated using this value (by adding

it to the date of manufacture). At this point in time the batch is automatically set to "Expired" status,

so it can no longer be registered.

this setting overrides the setting with the same name in the Material type configuration.

Notes

A  material  can  only  be  assigned  to  exactly  one  material  type.  However,  one  material  type  can  be

assigned several materials. The saving procedure for material is case sensitive. The so-called wildcards

"*"  and  "?"  can  be  used  in  the  material  field.  The  selected  material  type  must  exist  during  creation.

Otherwise, the creation will be refused.

If a material is assigned to another material type, the material type is NOT automatically updated

- for existing orders/operations

- for existing component lists

- in the existing batches

MPL-MBV_82.docx

Version: 1.0.23555

Page 19 of 48

Material and Inventory Management

5  Material Buffer

HYDRA menu

Master data  Material  Material buffer

FEDRA menu

Detailed scheduling  Master data  Material buffer

Transaction code

mbuf

Function authorization  mbuf

Purpose

Use this function to create or modify material buffers in the system.

Integration

The system uses material buffers to represent both physical and virtual material storage or areas where

materials  are  kept  for  temporary  storage  in  the  production  process.  Material  buffers  are  identified  by

unique keys.

Selection criteria

The application provides the following selection criteria:

Material buffer

Enter the material buffers ID to select the material buffer.

Name

Enter the name of the material buffers to select the material buffer.

Type

Enter the material buffer type to select the material buffer. Possible values:

  F – production buffer

  H - hierarchical buffers

  W - goods receipt buffers

  C – casting buffers (composition)

Cost center

Enter the cost centers the material buffers are assigned to in order to select the material buffers.

Company

Enter the companies the material buffers are assigned to in order to select the material buffers.

MPL-MBV_82.docx

Version: 1.0.23555

Page 20 of 48

Material and Inventory Management

Department

Enter the departments the material buffers are assigned to in order to select the material buffers.

Area

Enter the areas the material buffers are assigned to in order to select the material buffers.

If  several  selection  criteria  are  entered  and  unless  otherwise  specified,  the  application  shows

the data that match all criteria.

Field descriptions - General

Material buffer

ID of the material buffer that is created or edited.

Type

Material buffer type. Possible values:

  F – production buffer

Material  buffers  located  in  the  shop  floor  are  referred  to  as  production  buffers.  Storage

locations and material buffers of resources should always be configured as production buffers.

  H – hierarchical buffer

A  hierarchical  buffer  combines  several  individual  buffers.  The  quantity  of  individual  buffers  is

accumulated in the hierarchical buffer for evaluations and reports.

  W – goods receipt buffer

Material buffers are referred to as goods receipt buffers if material is supplied externally. They

are the source for material used in production.

Production  buffers  and  goods  receipt  buffers  are  processed  identically.  In  contrast,  a  hierarchical

buffer  is  a  "virtual"  buffer  enabling  the  combination  of  one  or  more  buffers  (also  hierarchical

buffers),  so  that  evaluations  can  be  made  on  this  basis  in  the  Stock  overview  function  (menu:

material management --> inventory management).

Name

Long text of the material buffer.

Storage location

Refers to the physical storage location of the material buffer (currently not used).

Department

Department the material buffer belongs to.

MPL-MBV_82.docx

Version: 1.0.23555

Page 21 of 48

Material and Inventory Management

Area

Area the material buffer belongs to.

Cost center

Cost center the material buffer belongs to.

Company

Company the material buffer belongs to.

Comment

Additional text

Inventory management tab

Recycle bin

All  material  buffers  that  are  declared  as  recycle  bins  are  deleted  or  archived  at  regular  intervals,

depending  on  the  configuration  or  customized  settings.  The  process  that  deletes  or  archives  the

batches/lots  included  in  material  buffers  is  integrated  in  the  scheduler.  You  can  use  the  data

management to configure the period after which batches/lots are deleted or archived.

Batches/lots that are located in a material buffer specified as a  recycling bin cannot be logged on

anymore. In this case, you have to manually repost them to a different material buffer in advance.

Batches  cannot  be  logged  on  as  input  batches  to  a  machine  if  the  upstream  input  buffers  of  the

machine are identified as a recycle bin.

Include in stock

Use  this  option  to  define  whether  the  batches/lots  located  in  this  material  buffer  should  be

integrated in the stock overview.

Retention period

Duration of the storage period in the buffer (currently not used).

Hierarchy tab

Hierarchy

Specifies the hierarchy level that is assigned to the buffer.

Hierarchical buffer

Specifies the assignment to the higher-level hierarchical buffer. A buffer can only be assigned to a

hierarchical buffer with a hierarchy (number) that is greater than that of the assigned buffer.

MPL-MBV_82.docx

Version: 1.0.23555

Page 22 of 48

Material and Inventory Management

Batch transport tab

Type

  No buffer

Refers to one of the below-mentioned buffer versions.



Input buffer, output buffer

To  configure  the  factory-wide  batch  transport,  you  can  specify  in  this  field  whether  the  material

buffer  is  an  input  or  output  buffer.  A  corresponding  system  is  defined  for  an  output  buffer. This

system specifies where the data posted to this material buffer is transported.

If you configure a material buffer as “input buffer“, the transport status of the batches/lots posted

to this buffer will be set to “I“ = initial. Consequently, these batches cannot be logged on to AIP.

Virtual storage buffer

You can use this field to define a material buffer as stock posting buffer. In this way, you can also

specify whether the material buffer is a virtual storage buffer.

If you identify the material buffer as a placeholder for an external storage system, you can perform

specific  inventory  queries  for  the  virtual  stock  at  a  later  point  in  time.  This  option  is  currently  not

used.

Corresponding system

If  you  configure  a  corresponding  system,  you  can  specify  where  all  batches/lots  included  in  this

material buffer are transferred. For transport output buffers and stock posting buffers, you can enter

the corresponding system where the batches/lots are transferred here.

Stock posting buffer

You can define a material buffer as a stock posting buffer to carry out stock postings. Batches are

transferred  by  the  standard  batch  interface  using  a  file  that  is  created  in  a  directory  of  the  file

system. The corresponding system specifies this directory.

MPL-MBV_82.docx

Version: 1.0.23555

Page 23 of 48

Material and Inventory Management

6

Inventory Limits

Summary

Menu

Master data  Material  Inventory limits

Transaction code

invl

Function authorization

invl

This function is used to create or modify inventory limits in the system.

Usage

This  dialog  is  used  to  assign  those  materials  to  the  material  buffers  that  are  temporarily  stored  in  this

material buffer. The assignment enables the minimum stock to be specified in the buffer.

Integration

The values stored here are used in the following functions:

  Material management  Stock monitoring

  Operating facilities management  Graphic machinery

  Production control  Graphic planning

Requirement

Material buffer and units must be defined.

Selection criteria

The following selection criteria are available in the application:

Material buffer

Displays all inventory limits for the selected material buffer.

Material

Displays all inventory limits for the selected material.

When using multiple selection criteria, the amount of overlap of the selection criteria is displayed.

Field descriptions

Material

Unique material key

MBuffer

MPL-MBV_82.docx

Version: 1.0.23555

Page 24 of 48

Material and Inventory Management

Name of the assigned material buffer

Unit

Quantity unit in which the inventory is listed

Minimum stock

Minimum stock of the material in the material buffer

Alert Min. stock level

Quantity of stock at which an alert occurs for increasing inventory

Min. warn. stock level

Quantity of stock at which a warning occurs for checking inventory

Max. warn. stock level

Quantity of stock at which a warning occurs for checking inventory

Alert Max. stock level

Quantity of stock at which an alert occurs for decreasing inventory

Max. stock level

Maximum material stock level in buffer

Comment

Additional comments

MPL-MBV_82.docx

Version: 1.0.23555

Page 25 of 48

Material and Inventory Management

7  Transport Units

Summary

Menu

Material  Master data  Transport units

Transaction code

Function authorization

tu

tu

Usage

Use this function to create or to change transport units in the system.

Transport  units  are  defined  as  those  load  carriers  that  are  used  to  transport  materials.  When  output

batches  are  recorded  at  the  terminal,  the  assignment  to  the  producing  material  type  can  serve  as

selection that is saved to the batches.

Integration

The transport units will be shown in the evaluations in material management.

Selection criteria

The following selection criteria are available in the application:

Transport unit

Only the selected transport unit will be used.

Field descriptions

Transport unit

Unique identification of a transport unit

Designation

Clear text description of the transport unit

Quantity

Quantity of available transport units

Width

Width of the transport unit in the assigned unit. Currently used only for terminal display features.

Height

Height of the transport unit in the assigned unit. Currently used only for terminal display features.

MPL-MBV_82.docx

Version: 1.0.23555

Page 26 of 48

Material and Inventory Management

Length

Length of the transport unit in the assigned unit. Currently used only for terminal display features.

Weight

Weight of the transport unit in the assigned unit. Currently used only for terminal display features.

Inventory management

Indicator relating to the inventory management of the transport unit. If this indicator is not set, this

transport  unit  will  also  not  be  taken  into  account  in  the  evaluation  of  the  stock  overview  transport

units

(Menu:  Material  management  >

Inventory  management  >  TPU

stock  overview).

MPL-MBV_82.docx

Version: 1.0.23555

Page 27 of 48

Material and Inventory Management

8  1

Assignment of Transport Unit to Material Type

Summary

Menu

Master data  Material  TPE assignment - Material type

Transaction code

astrum

Function authorization

astrum

Usage

This function is used to assign the corresponding transport units to a material type in the system.

Integration

For each material  type, several possible   transport units can  be defined. Then,  when forming an  output

batch, the corresponding transport unit can be selected from those for the material type of the material to

be produced.

Requirement

The transport units must be defined in the system.

Editing functions

Copy

There is the functionality to copy assignments from one material type to another. It can be chosen

to either copy all assignments or only the missing ones.

Selection criteria

The following selection criteria are available in the application:

Material type

Only materials with the selected material type are selected.

Transport unit

Only materials with the selected transport unit are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

MPL-MBV_82.docx

Version: 1.0.23555

Page 28 of 48

Material and Inventory Management

Field descriptions

Material type

Designation of the assigned transport unit.

Transport unit

Designation of the assigned transport unit.

Standard

The preferred transport unit for transporting materials of the specified material type.

Quantity

Quantity  of  the  materials  of  this  material  type  that  match  with  this  transport  unit.  Used  in  the

evaluation overview of transport units available.

Unit

Not in current use.

MPL-MBV_82.docx

Version: 1.0.23555

Page 29 of 48

Material and Inventory Management

9  Batch data overview

Overview

Menu

Material management  Inventory management  Batch data overview

Transaction code

batov

Function authorization

batov

Available user fields

Where

Detail view

Object type/user field key

Source (type)

CNR/SYSTEM

Batch (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

Use  the  batch  data  overview  to  view  or  edit  one  or  more  batches  depending  on  the  entered  selection

criteria.

Integration

The batch data overview shows all existing batches matching the entered selection criteria.

The batch data overview shows the selected batches and their current status including further details.

Selection criteria

The application provides the following selection criteria:

"Batch" category

Batch number

The batch number represents the batch ID used by the user. The user can:

  enter/view the batch number in terminal dialogs

  use the batch number for tracing or information search via the office client

If  the  configuration  option  "automatic  generation  of  the  batch  number"  is  enabled,  leave

the  "batch  number"  field  empty  in  the  editing  dialog  when  you  add  a  new  batch.  The

system  will  only  assign  the  batch  number  automatically,  if  the  "batch  number"  field  is

empty.

MPL-MBV_82.docx

Version: 1.0.23555

Page 30 of 48

Material

Enter  the  material  number  as  a  selection  criterion  to  display  all  batches  assigned  to  this  material

Material and Inventory Management

number.

Workplace

Enter

the  workplace  as  a  selection  criterion

to  display  all  batches  produced  at

this

workplace/machine.

MES order number

MES order number (order/operation number) that produced the batch.

Internal batch number

The batch number is a unique, system-wide batch identification number.

Material buffers

The individual batches are located in a specific Material buffers. Enter the material buffer to view all

batches assigned to the selected material buffer.

Material type

The  individual  batches  or  materials  belong  to  a  Material  type.  The  same  transport  and  handling

guidelines  apply  to  these  material  types  across  the  system.  Enter  the  material  type  to  view  all

batches assigned to the selected material type.

Material category (kind of material)

The material  category  assigns  batches  to  specific  classes/  groups.  Enter  the  material  category  to

view all batches assigned to the selected material category.

Material name

The  system  takes  over  the material  name  from  the  currently  logged  in  order  when  output  batches

are  generated  at  shop  floor  terminals.  As  no  material  master  is  managed,  the  material  name  is

stored redundantly in the batch description.

Manufacturing date from / until

Date/period of the production of a batch.

Consider long-term data

You can also select archived data.

Historic batch entries

If you use the function historic batch entries and you also use throughput batch numbers or serial

numbers,  the  application  will  also  show  batches  with  the  status  "processed"  for  every  throughput

batch  number  or  serial  number.  Use  the  function  historic  batch  entries  to  get  further  process

information on a throughput batch number or serial number.

MPL-MBV_82.docx

Version: 1.0.23555

Page 31 of 48

Material and Inventory Management

Status category

Batch class

The batch class describes the overall quality of the batch. Enter the batch class to view all batches

matching the selected batch class.

Batch status

The batch status describes the technical system and production status of a batch. Enter the  batch

status as a selection criterion to view all batches assigned to this status.

Quality status

The quality status "blocked" prevents a batch from being logged on.  Enter the quality status as a

selection criterion to view all batches assigned to this quality status.

Manual Q status

Enter the manual Q status as a selection criterion to view all batches assigned to this status.

Material status

The material status indicates a  logical status of the  batch,  e.g. packed, tested.  Enter the material

status as a selection criterion to view all batches assigned to this material status.

Transport status

The  transport  status  represents  the  technical  system  status  with  respect  to  transfer  postings  to

external storage. Select the transport status as a selection criterion to display all batches that are

assigned to this transport status.

"Advance logon" option

Use this option to restrict the data to batches logged on in advance.

"Attributes" category

Attribute (1 to 10)

You can use the attributes directly stored with the batch to restrict the data displayed.

"Batch attributes" category

Batch attribute (name)

You  can  use  the  batch  attributes  configured  for  the  material  type  to  restrict  the  data  displayed.

There are 40 text fields, 20 numeric fields and 20 decimal fields that may be configured.

"Alternative batch numbers" category

Alternative batch number (1 to 20)

Select an alternative batch number as a selection criterion to display all batches that are assigned

to this number.

MPL-MBV_82.docx

Version: 1.0.23555

Page 32 of 48

Material and Inventory Management

"Reservation" category

Reserved for order

Enter or select the order number in this field to display all batches that were produced for this order/

OP.

Reserved for OP

Enter or select the order/OP number in this field to display all batches that were  produced for this

order/ OP.

Dates category

Expiry date from / until

Date/period that indicates the shelf life of a batch.

Availability date from / until

Date/period of the availability of a batch.

Warning time

Warning date of a batch

"Miscellaneous" category

Serial number

Enter a serial number as a selection criterion to display all batches that are assigned to this serial

number via the serial number field.

Batch number

Select the batch/lot number as a selection criterion to display all batches that are currently assigned

to this number.

Person

Select person as a selection criterion to display all batches that have been produced by this person

and, as a result, are currently assigned to this person (personnel number).

Collective batch (merged batch)

Enter  a  collective  batch  number  (merged  batch  number)  as  a  selection  criterion  to  display  all

batches that are assigned to this collective batch number in the collective batch field (merged batch

field).

PPS batch

Enter a PPS batch as a selection criterion to display all batches that are assigned to this PPS batch

number in the PPS batch field.

MPL-MBV_82.docx

Version: 1.0.23555

Page 33 of 48

Material and Inventory Management

Editing functions

Use the following functions that are available  in addition to the standard features to edit one  or several

data records:

 Add batch

Use this function to insert a new batch. Goods movements are not generated for the new batch.

 Copy batch

Use  this  function  to  copy  a  batch.  However,  you  have  to  enter  a  new  batch  number  for  the  new

batch. Goods movements are not generated for the new batch.

  Edit batch

Use this function to edit a batch. But neither cancellations nor goods movements are generated for

the changed batch.

 Delete batch

Use this function to delete a batch. But neither cancellations nor goods movements are generated

for the deleted batch.

 Merge batches (new batch number)

Merging batches. A new batch number is generated for the new batch (Merge batches).

When  merging  collective  batches,  all  individual  batches  are  assigned  to  a  new  collective  batch

number.

 Merge batches (use existing batch numbers)

Merging  batches.  A  batch  number  already  included  in  the  merged  batches  is  used  for  the  new

batch (Merge batches).

When  merging  collective  batches,  all  individual  batches  are  assigned  to  the  selected  collective

batch number that is part of the merger.

  Split batch

Create  a  new  batch  by  splitting  it  off  from  an  existing  batch  (Batch  split).  In  this  case,  you  can

choose from the following options to deal with the remaining target quantity of the original batch:

  Repost the remaining quantity of the batch to the new batch

  Reduce the existing batch to the remaining quantity

MPL-MBV_82.docx

Version: 1.0.23555

Page 34 of 48

If  you  split  a  collective  batch,  the  selected  individual  batches/serial  numbers  are  transferred  to  a

batch  split  off.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original

Material and Inventory Management

collective batch.

 Repost

Use this function to repost a batch to another material buffer (Repost batch).

 Generate

Use the function "enter goods receipt batch" to create batches manually (Generate batch). This is

necessary if material is delivered via the incoming goods, for example.

 Edit batch attribute

The  tab  “batch  attributes”  shows  the  batch  attributes  of  the  batch  selected  in  the  grid.  The

application only shows those batch attributes that have been assigned the option “show attribute on

client” within the configuration of batch attributes.

Provided  that  batch  attributes  are  shown,  click  the  button  “edit  batch  attribute”  to  edit  the  batch

attributes.  In  this  case,  the  system  does  not  check  the  field  types/field  lengths  specified  in  the

configuration of batch attributes.

Go to

 Graphic batch tracing

Calls up the application Graphic batch tracing.

 Document management

Calls up the document management

"Batch data overview" detail application

The batch data overview detail application shows all batches matching the entered selection criteria.

The documents entitled batch object and batch structure outline the information or field descriptions of the

selected batches and, thus, of the detail application.

MPL-MBV_82.docx

Version: 1.0.23555

Page 35 of 48

Material and Inventory Management

10  Generating Batch Numbers

Usage

The  batch  number  is  generated  to  basis  35;  the  digit  specifications  are  relative  and  refer  to  the  fixed

proportion. The fixed proportion can be deduced from the prefixes for the automatically generated batch

numbers defined in the basic settings.

Digit 1-2

Digit 3

Digit 4-5

Digit 6...

Terminal number

last digit of the year (starting at 1998)

Day of the year

running number, distributed along the length of the batch number

The number generated at the terminals is unique for each terminal, i.e. there is no batch number 4711 for

a  goods  receipt  batch  (create  a  batch)  and  a  production  batch  (output  batch  change)  on  one  day  in  a

year.

MPL-MBV_82.docx

Version: 1.0.23555

Page 36 of 48

Material and Inventory Management

11  Interrupting/Finishing OP without the Last Batch

Summary

The  last  batch  for  which  a  quantity  may  be  entered  when  interrupting/logging  the  OP  off  is  generated

automatically between the last output batch change and logging the operation off.

But  this  system  behavior  is  not  always  wanted.  It  might  also  be  required  that  the  last  output  batch  is

posted specifically by the user. Then the user directly interrupts/logs the OP off, whereas "no" last output

batch is posted and/or no last output batch is generated for the operation.

Usage

The system immediately generates an output batch, once an OP is logged on. Even after an output batch

change, a subsequent batch is generated immediately after completing the preceding output batch.

This cannot be changed in the system, as the system never knows in advance when the last output batch

will be produced and/or if the next output batch will actually be the last one.

For this reason, it is ensured that:

  when  interrupting/logging  an  operation  off,  the  output  batch  generated  at  last  will  no  longer  be

used and directly deleted.



the  last  output  batch  is  not  visible  on  MOC  and  there  is  no  connection  to  the  running  input

batches of the operation.

  no last output batch is visible and, thus, no goods movement is generated.



in posting records no quantities are written in the H record for a last batch.

Restrictions

  Cannot be used when batch numbers are assigned manually:

At the moment the function is only supported if batch numbers are assigned automatically at AIP.

If the batch number is entered/scanned manually by the user, the function cannot be used, as the

output batch entered at last must not be deleted before the OP is logged off/finished. If users can

no longer enter "numbers" when changing the output batch, they cannot perform the output batch

change and they have to interrupt/log the OP off.

Procedure

The  procedure  to  enter  data  "without"  the  last  output  batch  when  interrupting/logging  off  the  OP  is

described as follows:

  Users log the operation on.

MPL-MBV_82.docx

Version: 1.0.23555

Page 37 of 48

Material and Inventory Management

  Users register the input batches.

  Users perform the output batch change, once they want to finish an output batch.

  Once users have performed the last output batch change, they interrupt and/or log the operation

off by using the function "interrupt/log OP off".

A running OP may be interrupted or logged off by clicking the "interrupt/log OP off" option. Then a dialog

opens, where it may be chosen between "interrupt OP" and "log OP off".

If "log OP off" or "interrupt OP" is clicked the logoff dialog opens containing the same input fields like the

"output batch change" dialog.

If it was configured in the system that "no" last output batch is  to be used when interrupting/logging the

OP off, no output batch will be displayed, as there is no visible, active output batch at this point in time.

MPL-MBV_82.docx

Version: 1.0.23555

Page 38 of 48

Material and Inventory Management

Configuration

These configurations have to be made in the system to enable the function.

Result

Data collection:

These results apply for data collection:

  No output batch is displayed/used in the dialog A_UN_MPL/ A_AB_MPL.

  No last quantity can be entered

  Additional information (e.g. material buffer, TPU, etc.) cannot be entered

Processing:

These results apply for processing:

  Provided  that  the  relevant  flag  is  set  for  the  material  type,  the  output  batch  generated  by  the

interruption/logoff  is  directly  assigned  the  status  "D"  that  stands  for  deleted.  The  next  archiving

session considers this batch and deletes it.

  The "deleted" batch is not shown within tracing (graphic/tabular batch tracing).

MPL-MBV_82.docx

Version: 1.0.23555

Page 39 of 48

Material and Inventory Management

  The deletion event is not displayed for the "deleted" batch in the batch history.

  A  last  H  record  is  generated  including  the  durations  recorded  between  the  last  output  batch

change  and  interrupting/logging  the  OP  off.  The  H  record  only  includes  durations  and  no

quantities.

  How to proceed with automatic quantities:

If automatic quantities are  recorded  between the  last  output batch  and logging the OP off, they

are currently not taken into account.

MPL-MBV_82.docx

Version: 1.0.23555

Page 40 of 48

Material and Inventory Management

12  Batch Consumption

Usage

Material is used and represented in the system by:

  material postings to regulate inventories with/without ERP and without tracing

  batch-related material postings to trace back the recorded parts/materials

Subject to the type in use, consumption can be recorded differently in the system.

Procedure

These types of consumption recording are used in MES:

Discrete consumption recording:

Discrete  consumption  recording  is  used  every  time  when  a  discrete  amount  of  consumption  can  be

entered  for  the  used  components  by  the  user  or  a  counter.  Data  is  only  entered  for  the

component/material number. Data may be collected:

  automatically (configuration of a consumption meter per material)

  manually (the user enters material consumption manually)

Batch-related consumption recording:

MPL-MBV_82.docx

Version: 1.0.23555

Page 41 of 48

Material and Inventory Management

Batch-related consumption recording is used every time when batches are used for the components for

which a consumed quantity can be entered by the user or a meter. Data is collected regarding the input

batch. Data may be collected:

  manually (dialog to log off the input batch and to enter batch consumption manually)



in a retrograde manner/backflush (automatic calculation of batch consumption by generating the

output batch quantity)

  automatically (automatic collection of batch consumption by a consumption meter)

Discrete consumption - manual

How to enter discrete consumption is described here.

Discrete consumption - automatic

General

Automatically recorded consumption is collected by a meter configured at the machine. Data is collected

for a material type of materials included in the component list.

Configuration

These  configurations  have  to  be  set  in  the  system  if  material  consumed  discretely  is  to  be

indicated/counted by a meter:

  Component of the OP:

The "consumption type" has to be set to "D = discrete".

  Material type of the material:

The option "inventory management" has to be set to "N = No".

  Meter for the material type of the material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

Posting/result

A goods issue is generated for automatically recorded consumption in the system.

Manual batch consumption

General

MPL-MBV_82.docx

Version: 1.0.23555

Page 42 of 48

Material and Inventory Management

Manual batch consumption is entered by the input batch change function. The user enters the consumed

quantity when logging the used input batch off.

Configuration

These configurations have to be set in the system if material is to be consumed manually as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "E = Yes, when logging input batch off".

Posting/result

The consumed quantity is deducted from the remaining quantity of the input batch and the batch shows

the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

How to enter batch-related consumption is described here.

Retrograde batch consumption

General

Retrograde  batch consumption is calculated continuously  as the  output batch quantity increases. When

logging  the  input  batch  off,  the  remaining  quantity  of  the  input  batch  is  reduced  by  the  calculated

consumption  quantity.  Usually,  the  user  does  no  longer  enter  a  quantity  when  logging  the  used  input

batch off.

Configuration

These configurations have to be set in the system if material is to be consumed in a retrograde manner

as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The  option  "inventory  management"  has  to  be  set  to  "R  =  Yes,  backflush  (retrograde)"  or  "G  =

Yes, backflush (only with YIELD batch), retrograde".

Posting/result

MPL-MBV_82.docx

Version: 1.0.23555

Page 43 of 48

The quantity calculated in a retrograde manner is deducted from the remaining quantity of the input batch

and then the batch shows the reduced "remaining quantity" and the initial quantity.

Material and Inventory Management

A goods issue is generated for consumption in the system.

Automatic batch consumption

General

The automatically recorded batch consumption is collected continuously as the meter quantity increases.

When logging the input batch off, the remaining quantity of the input batch is reduced by the automatically

recorded consumption quantity. Usually, the user does no longer enter a quantity when logging the used

input batch off.

Configuration

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "R = yes, backflush (retrograde)".

  Meter for the material type/BOM item of the affected material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

or

Option BOM item = BOM item of the material that is consumed

If  the  BOM  item  is  used  within  meter  configuration,  it  is  important  that  within  the  OP's

component list the material is always used as the same BOM item (from ERP work plan).

Posting/result

The automatically recorded quantity is deducted from the remaining quantity of the input batch and then

the batch shows the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

MPL-MBV_82.docx

Version: 1.0.23555

Page 44 of 48

Material and Inventory Management

13 MPL for the coil-based production

Purpose

You use this documentation, if one or several of the following conditions are true for you.

  You use the product "MPL" for the processing of rolls (coils) in your production and you want to

be informed about the configuration options.

  You want to use the product "MPL" for the processing of rolls in your production.

  You  want  to  be  informed  about  the  possibilities  of  specific  functions  that  are  designed  for  a

production using rolls.

The  functions  that  are  designed  for  a  coil-based  production  are  included  in  the  product  group

"MPL".

The functions for the coil-based production do not form a separate product. They are part of the

product "MPL".

General information

You use the office client to edit the required values for a production process using rolls. You configure the

respective  values  of  the  operation  to  this  end.  Go  to  the  application  "Edit  operations",  tab  "CBM".  The

fields of tab "CBM" of an operation are described in the documentation MES-Operation_structure.

Using the terms "Length" and "Width"

For  the  coil-based  manufacturing,  HYDRA  has  defined  the  use  of  the  terms  "length"  and  "width".  The

following graphic demonstrates what is called "length" and what is called "width" in HYDRA.

MPL-MBV_82.docx

Version: 1.0.23555

Page 45 of 48

Material and Inventory Management

Using the unit "Surface per piece"

HYDRA specifies the surface per piece in the unit mm2/pce (square millimeters per piece). The specified

surface per piece refers to the production of one article.

Mother/child operation

You can use the mother-child relation of operations for a production using rolls. The mother-child relation

defines the relation of one mother operation to one or more child operations. If you define a mother-child

relation,  the  child  operations  are  automatically  logged  on  when  you  log  on  the  respective  mother

operation.

The  sequencing  list  of  the  shop  floor  client  only  displays  the  mother  operations  (option  "Branch  OP"  =

"M"). The sequencing list does not show child operations (option "Branch OP" = "K").

Other terms

Seam width

If you cut material that is stocked on rolls, you sometimes cut off the edges. In HYDRA, the width of this

cut off edge is called seam width.

Cutting plans

There are two types of cutting plans: homogeneous and heterogeneous (chaotic) cutting plans.

MPL-MBV_82.docx

Version: 1.0.23555

Page 46 of 48

Homogeneous cutting plan: exactly one article

Homogeneous cutting plan: several articles

Material and Inventory Management

  For  an  order,  several  daughter  rolls  with

identical  width  are  produced.  The  order

includes exactly one cutting process.

  A mother roll is cut in n rolls of identical width.

  A  cut  across  the  material  width  results  in

several daughter rolls of identical length.

  The  individual  cuts  across  the  material  width

can  result  in  different  lengths.  Usually,  only

the last part (after the last cut) has a different

length.

  An  order  produces  different  output  widths.

The order includes different cutting processes

in the mother-child relation.

  The mother roll is cut into n daughter rolls.

  A  cut  across  the  material  width  results  in

several daughter rolls of identical length.

  The  individual  cuts  across  the  material  width

can  result  in  different  lengths.  Usually,  only

the last part (after the last cut) has a different

length.

Heterogeneous (chaotic) cutting plan: several articles

MPL-MBV_82.docx

Version: 1.0.23555

Page 47 of 48

Material and Inventory Management

  An  order  produces  different  output  widths.

The order includes different cutting processes

in the mother-child relation.

  The mother roll is cut into n daughter rolls.

  A  cut  across  the  material  width  results  in

several daughter rolls of identical length.

  The  individual  cuts  across  the  material  width

can  result  in  different  lengths.  Usually,  only

the last part (after the last cut) has a different

length.

  With this version, the cutting plan of the order

is  not  uniform  and  can  be  different  for  each

cut across in an extreme case.

Further notes/restrictions

For workplace type "S" (cutting unit), the run-through batch processing is not supported.

Configuration

The configuration is described in the document Configuration of coil-based manufacturing.

MPL-MBV_82.docx

Version: 1.0.23555

Page 48 of 48

