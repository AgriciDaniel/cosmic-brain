Manual

Processing and Management
of Batch Data
TRT-CLA 8.2

Version 1.0.23555

Last changed on: 8 October 2020

Processing and Management of Batch Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

TRT-CLA_82.docx

Version: 1.0.23555

Page 2 of 74

Processing and Management of Batch Data

Contents

1  Processing and Management of Batch Data ............................................... 5

2  Applications Available in MOC ..................................................................... 8

3  Material Types .............................................................................................. 9

4  1 Assignment Material - Material Type ...................................................... 20

5  Material Buffer ............................................................................................ 22

6

Inventory Limits .......................................................................................... 26

7  Transport Units ........................................................................................... 28

8  1 Assignment of Transport Unit to Material Type ....................................... 30

9  Attributes .................................................................................................... 32

10  Batch data overview ................................................................................... 34

11  Generating Batch Numbers ........................................................................ 40

12  Split Batch .................................................................................................. 41

13  Splitting Batches ........................................................................................ 44

14  Merge Batches ........................................................................................... 46

15  Merging Batches ........................................................................................ 49

16  1 Recording Goods Receipt Batch ............................................................. 51

17  1 Repost ..................................................................................................... 53

18  Batch Consumption .................................................................................... 55

TRT-CLA_82.docx

Version: 1.0.23555

Page 3 of 74

Processing and Management of Batch Data

19  Interrupting/Finishing OP without the Last Batch ....................................... 59

20  Interrupting/Finishing OP without the Last Batch ....................................... 63

21  Passing on Batch Attributes ....................................................................... 64

22  Configuration of Passing on Batch Attributes ............................................ 68

23  Passing on Document Links to Batches .................................................... 70

24  Configuration of Passing on Document Links ............................................ 74

TRT-CLA_82.docx

Version: 1.0.23555

Page 4 of 74

1  Processing and Management of Batch Data

Processing and Management of Batch Data

Summary

Purpose

The  function  package  "Batch  Data  Processing"  provides  functions  to  collect  data  that  is  not  part  of  the

"batch"  object  in  relation  to  batches.  This  may  be  manually  collected  data  or  data  transferred  from  the

order/operation.

The  product/material  documentation  and  identification  function  in  production  is  supported  by  the  print

function by which label printing is triggered when batches are posted.

Functions to split and merge batches provide for physical material handling.

Implementation Considerations

The function package "Batch Data Processing" is used if you would like:



to define further data for the batch in addition to the information that is provided by default for the

"batch" object



to label and identify produced material (also and in particular WIP material) in the manufacturing

process



to  divide  existing  batches,  for  logistical  reasons,  into  units  that  can  be  identified  and  handled

individually taking traceability into account



to combine/merge existing batches for logistical reasons taking traceability into account

Integration

The function package refers to batch data of Material and Production Logistics as well as to Tracking &

Tracing.

The  function  packages  "Graphic  Batch  Tracing  and  Product  Documentation"  update  data  to  allow  for

verification of splitting and merging processes of data (traceability).

Features

  Configuration of material types

o  Editing function of material type master data to control material-specific processing

  Configuration of assignment of materials to material types

o  Editing function to classify material in material types

  Configuration of material buffers

TRT-CLA_82.docx

Version: 1.0.23555

Page 5 of 74

Processing and Management of Batch Data

o  Editing function to create master data for material buffers

  Configuration of inventory limits

o  Function to edit inventory limits of material buffers

  Configuration of transport units

o  Editing function to classify materials based on transport units

  Configuration to assign transport units to material types

o  Editing function to assign transport units to the configured material types

  Editing and correction of batches

o  Editing and correction functions for recorded batches in batch data overview

o  Splitting and merging of batches

o  Reposting of batches

o  Usage decision

o  Batch documents

  Display and usage of recorded material movements

o  Goods receipts

o  Consumption

  Manual or automatic assignment of batch numbers

o  Manual or automatic assignment of batches or batch numbers according to configuration

  Deletion of last batch

o  Usage of the output batch generated at last according to configuration

  Consumption recording

o  Recording of batch consumption according to configuration

  Batch attributes:

o  Collection of batch attributes

  Capture  of  additional,  industry-specific  information  on  the  batch  according  to

configuration

o  Configuration of attributes

  Editing  function  to  define  material-specific  additional  information  for  the  batch

including transfer of characteristics from the order and control of display and print

performance

o  Transfer of batch attributes

  Automatic  transfer  of  order  and  operation  information  as  attribute  for  the  batch

according to configuration

o  Display of batch attributes

  Presentation of batch attributes in evaluations, reports and overviews

o  Passing on batch attributes

  Pass batch attributes on from batches to batches

o  Passing on document links

  Pass document links on from batches to batches

TRT-CLA_82.docx

Version: 1.0.23555

Page 6 of 74

Processing and Management of Batch Data

TRT-CLA_82.docx

Version: 1.0.23555

Page 7 of 74

Processing and Management of Batch Data

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

MOC_AssignementMaterialMaterialty
pe.pdf

mtyp

asmm

Material buffer

Inventory limits

Transport units

MOC_MasterDataMaterialBuffer.pdf  mbuf

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

MOC_AssignementTransportUnitMat
erialtype.pdf

astrum

astrum

Configuration
attributes

of

batch

MOC_BatchAttributes.pdf

batatt

Batatt

Batch data overview

MOC_BatchOverview.docx

batov

batov

Split batch

Merge batches

Generate batch

Repost batch

MOC_SplitMESBatch.pdf

batch.split

batch.split

MOC_MergeMESBatch.pdf

batch.merge

batch.merge

MOC_BatchGenerate.pdf

batch.generate

batch.generate

MOC_RelocateMESBatch.pdf

batch.relocate

batch.relocate

Material movements

MOC_MaterialMovements.docx

mmov

mmov

TRT-CLA_82.docx

Version: 1.0.23555

Page 8 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 9 of 74

Description

Description/name (plain text) of the material type

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 10 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 11 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 12 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 13 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 14 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 15 of 74

equal to 0 (<= 0) before the posting.

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 16 of 74

Processing and Management of Batch Data

Automatic assignment of serial numbers

This  option  enables  the  automatic  assignment  of  numbers  for  a  new  part  when  merging

components  listed  by  serial  numbers.  If  this  option  is  not  set,  you  can  assign  the  serial  number

manually. The option is only relevant if the option "Superordinate serial number" = N is set for the

component.

User field key for output batches

The defined user field key is transferred to the generated output batches.

Behavior when output batch has quantity 0

Use the option Behavior when output batch has quantity 0 to specify system behavior when output

batches are changed and the quantity is 0. You can choose from the following three configuration

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 17 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 18 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 19 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 20 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 21 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 22 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 23 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 24 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 25 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 26 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 27 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 28 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Page 29 of 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 30 von 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 31 von 74

Processing and Management of Batch Data

9  Attributes

Summary

Menu

Master data  Material  Attributes

Transaction code

batatt

Function authorization

batatt

Usage

This function is used to create or modify batch attributes in the system.

Integration

The recording function on the terminal can be activated (when changing to a output batch) by assigning

batch attributes to a material type.

Requirement

The material types must already be defined.

Selection criteria

Material type

Only attributes with the selected material type are selected.

Field index

Only attributes with the selected field index are selected.

Attributes

Only the specified attributes are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

Field descriptions

Material type

The material type is a key field. The attribute refers to the selection material type (material type =

summary of identical materials).

TRT-CLA_82.docx

Version: 1.0.23555

Seite 32 von 74

Processing and Management of Batch Data

Field index

The field index is a key field. There are 40 text fields, 20 numerical fields and 20 decimal fields from

which to select.

Display position

Specifies the order for display on the terminal.

Name

Designation of the attribute.

Unit

Unit of the attribute

Display attribute

If this identifier is set, the attribute is taken into consideration in the display in other masks.

Print attribute on batch ticket, printing position

Reserved; currently no processing.

Capture attribute while generating batch

If this identifier is set, the attribute can be captures during batch generation.

Automatic transfer (additional option)

Field  value

from

the  operation  or  order  header  can  be

transferred  automatically.

The specification is made for this from:

MES  operation  or  MES  order  header  via  a  field  acronym  that  can  be  selected  (e.g.  ATK  –

item/article number, FU:10 - User field 10, etc.)

Data type

Here the data type of the field is specified, including field length and decimal places, if necessary.

However, it is not useful to place a text in a decimal field or decimal input in a text field.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 33 von 74

Processing and Management of Batch Data

10  Batch data overview

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 34 von 74

Processing and Management of Batch Data

Material

Enter  the  material  number  as  a  selection  criterion  to  display  all  batches  assigned  to  this  material

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 35 von 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 36 von 74

Processing and Management of Batch Data

"Reservation" category

Reserved for order

Enter or select the order number in this field to display all batches that were produced for this order/

OP.

Reserved for OP

Enter or select the order/OP number in this field to display all batches that were produced for this

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 37 von 74

Processing and Management of Batch Data

Editing functions

Use the following functions that are available  in addition to the  standard features to edit one  or several

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 38 von 74

Processing and Management of Batch Data

If  you  split  a  collective  batch,  the  selected  individual  batches/serial  numbers  are  transferred  to  a

batch  split  off.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original

collective batch.

 Repost

Use this function to repost a batch to another material buffer (Repost batch).

 Generate

Use the function "enter goods  receipt batch" to create batches manually (Generate batch). This is

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 39 von 74

Processing and Management of Batch Data

11  Generating Batch Numbers

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 40 von 74

Processing and Management of Batch Data

12  Split Batch

Summary

Menu

Material  management  Inventory  management  Batch  data  overview
Split batch

Transaction code

batch.split

Function authorization

batch.split

Usage

The split batch function in batch data overview can be used to split and/or to separate an existing batch

into an unrestricted number of batches.

The  number  of  splits  will  only  be  restricted  by  the  remaining  quantity  of  batches  or  in  case  of  merged

batches by the remaining subordinate batches/serial numbers. If the sum of the split quantities is higher

than the remaining quantity of the original batch, splitting is not possible. It is possible to create splits with

yield and/or scrap quantities.

Requirements

A batch can only be split if the following conditions are met:

o

o

the batch must have the status F (free)

the  batch  must  have  a  remaining  quantity  that  is  higher  than  0  or  must  be  assigned  to

subordinate batches/serial numbers accordingly.

o

the user must have the function authorization for splitting

At the moment, it is impossible to:

o  split off individual subordinate batches/serial numbers from merged batches that will not be linked

up in a new merged batch.

o  split scrap batches/locked batches.

Selection criteria

The possible selection criteria are the same as for the batch data overview.

There are two tables to select the respective batches manually.

  Table for viewing all of the selected batches (altogether).

  Table with the batches already selected for splitting.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 41 von 74

Processing and Management of Batch Data

Field descriptions

The main fields of the function are described in the following:

Splitting "simple" batches:

Quantity to be split off

Entry of the quantity that is to be split off from the existing batch

Batch class

Entry of the batch class to be created

Quantity

Entry of the quantity to be split off

Reason

Entry of the batch reason if the class is scrap

Print report

This indicator must be set to print-out a report stored to the split batch (as an option)

Splitting merged batches:

Batch number

External batch number of the selected merged batch

Internal batch number

System-wide unique batch number of the selected merged batch assigned internally.

Batch class

Batch class of the selected merged batch.

Remaining quantity

Current quantity of the selected merged batch.

Batches to be split off

The  display  list  shows  all  subordinate  batches/serial  numbers  assigned  to  the  selected  merged

batch. They are selected and split off accordingly.

Batch class

Batch class to be selected for the new merged batch to be split off.

Reason

Entry of the batch reason if the batch class of the merged batch to be split off is e.g. scrap.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 42 von 74

Processing and Management of Batch Data

Editing functions (of batch data overview)

In general, the batch data overview provides the following two variants to split batches.

Provided that the function authorization MALUSPLITM is available, the "split batch" function provides two

options  of  splitting/separation.  Otherwise,  the  selection  option  is  disabled  and  the  option  "repost

remaining quantity of batch to new batch" is set by default.

For "simple" batches:

1.  Repost remaining quantity of batch to new batch

If the sum of the split quantities is smaller than the remaining quantity of the batch, this difference quantity

will  be  used  to  create  a  new  batch  (class:  yield;  status:  free). The  existing  batch  will  then  be  set  to  the

"processed" status.

2.  Reduce existing batch to remaining quantity

The  existing  batch  will  be  reduced  by  the  sums  of  the  split  quantities.  If  the  remaining  quantity  of  the

batch will then be 0, the status will be set to "processed".

For merged batches:

Users select the merged batch they want to split off. If it is a "merged batch" (indicator at the batch), the

application shows all subordinate batches/serial numbers assigned to this merged batch.

Users choose (multiple selection) the subordinate batches/serial numbers they want to split off into a new

merged batch. Users select the batch class for the new merged batch (and thus for the newly assigned

subordinate batches/serial numbers).

After  using  the  "split"  function,  the  new  merged  batch  is  posted  and  the  selected  subordinate

batches/serial numbers are assigned to the new merged batch. To do so, the relevant assignment to the

"old"  merged  batch  is  deleted.  The  remaining,  unselected  sub-batches/serial  numbers  remain  with  the

existing merged batch (existing number).

TRT-CLA_82.docx

Version: 1.0.23555

Seite 43 von 74

Processing and Management of Batch Data

13  Splitting Batches

Summary

The  "split  batch"  function  can  be  used  to  divide  an  existing  batch  into  several  individual  batches.  The

following "batch types" may be split:



"simple" batch (split off quantities with new batch numbers)

  merged batch (split off subordinate batches/serial numbers into new merged batches)

Prerequisite

In general, all batches to be split off have to be available.

The "split batch" function can only be applied to batches meeting the below-mentioned conditions:

·

·

only batches in the batch status "free" may be split

only batches assigned the batch class "yield" may be split

Variants

In general, there are the following two variants to split batches.

  Splitting batches at AIP

AIP provides a function to split the entered batches/merged batches into several batches/merged

batches. A label may be printed each for the batches/merged batches split off.

  Splitting batches at MOC

The MOC batch data overview provides a function to split the entered batches/merged batches

into several new batches/merged batches.

Result

The below-mentioned results can be expected after splitting batches at AIP or MOC:

Splitting "simple" batches:

·

·

·

the batches split off include the entered quantity

the batches split off are assigned the status "free"

If no remaining quantity is available, the old batch is in the "free" or "processed" status.

·  The old batch has the batch class "yield"

TRT-CLA_82.docx

Version: 1.0.23555

Seite 44 von 74

Processing and Management of Batch Data

·

the batch number of the old batch:

o

is a new batch number

o

is the original batch number

Splitting merged batches:

·

the  merged  batches  split  off  include  the  selected  subordinate  batches/serial  numbers  and  the

relevant quantity.

the merged batches split off are assigned the status "free"

If no remaining quantity is available, the old merged batch is in the "free" or "processed" status.

the  old  merged  batch  is  assigned  the  "yield"  batch  class  and  includes  all  subordinate

batches/serial numbers that have not been split off and/or no subordinate batches/serial numbers

·

·

·

if all of them were split off.

·

the batch number of the old merged batch:

o

is a new batch number

o

is the original batch number

TRT-CLA_82.docx

Version: 1.0.23555

Seite 45 von 74

Processing and Management of Batch Data

14  Merge Batches

Summary

Menu

Material  management    Batch  management    Batch  data  overview  
Merge batches (new batch number)

Transaction code

batch.merge

Function authorization

batch.merge

Usage

The  batch  merge  function  can  be  used  to  highlight  existing  batches  using  manual  selection  and  merge

them into a joint batch. The following "batch types" may be combined:



"simple" batch and "simple" batch

  Merged batch and merged batch

The following combinations are neither supported nor allowed:



"simple" batch and merged batch

  Subordinate batch/serial number and merged batch

  Subordinate batch/serial number and subordinate batch/serial number

Selection criteria

The possible selection criteria are the same as for the batch data overview.

There are two tables to select the respective batches manually.

  Table for viewing all of the selected batches (altogether)

  Table with the batches already selected for merging

The tables also contain the typical, current information regarding the individual batches.

Field Descriptions

The most significant fields in the function are the following:

Batch number

The new batch number can be input manually here.

Merge batches (new batch number)

A new batch number is allocated for the merged batches.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 46 von 74

Processing and Management of Batch Data

Merge batches (use batch number involved)

The batch number of the selected batch is used for all of the merged batches.

Editing functions (of batch data overview)

The "batch data overview" dialog generally  provides the following two functions to merge batches. They

can be distinguished by the new batch number that is to be used.

 Pool batches (new batch number))

For "simple" batches:

  The  selected  batches  are  merged/pooled.  The  system  will  generate  automatically  a  new

batch  number  (which  is  shown  in  the  dialog)  if  a  new  batch  number  is  not  entered  while

executing the function.



If a new batch number is entered, it will be used. Please note: Batch numbers must be unique

within the system!

  The remaining quantity of the new batch is increased by the added quantities of the merged

batches. The batch status of the new batch is "free".

  The batches merged in the new batch are set to the batch status "processed" and receive a

remaining quantity of 0.

For merged batches:

  The selected merged batches are merged/pooled. The system will generate automatically a

new batch number (which is shown in the dialog) if a new batch number is not entered while

executing the function.



If a new batch number is entered, it will be used. Please note: Batch numbers must be unique

within the system!

  The  remaining  quantity  of  the  new  merged  batch  is  increased  by  the  assigned  subordinate

batches/serial numbers. The new merged batch is assigned the status "free".

  The  merged  batches  merged  in  the  new  merged  batch  are  set  to  the  batch  status

"processed" and receive  a  remaining quantity of 0. The subordinate batches/serial numbers

are assigned to the new merged batch.

Pool batches (use existing batch numbers)

For "simple" batches:

  The  selected  batches  are  merged/pooled.  The  first  batch  number  of  all  batch  numbers

selected in the table view is used for the newly generated batch.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 47 von 74

Processing and Management of Batch Data

  The  remaining  quantity  of  the  first  or  reused  batch  number  is  increased  by  the  added

quantities of the merged batches. The batch status of the first or reused batch is "free".

  The batches merged in the first or reused batch are set to the batch status "processed" and

receive a remaining quantity of 0.

For merged batches:

  The selected merged batches are merged/pooled. The first batch number of all merged batch

numbers selected in the table view is used for the newly generated merged batch.

  The  remaining  quantity  of  the  new  merged  batch  is  increased  by  the  assigned  subordinate

batches/serial numbers. The new merged batch is assigned the status "free".

  The  merged  batches  merged  in  the  new  merged  batch  are  set  to  the  batch  status

"processed" and receive  a  remaining quantity of 0. The subordinate batches/serial numbers

are assigned to the new merged batch.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 48 von 74

Processing and Management of Batch Data

15  Merging Batches

Summary

The  "merge  batches"  function  can  be  used  to  merge  existing  batches  into  one  common  batch.  The

following "batch types" may be combined:



"simple" batch and "simple" batch (adding up quantities)

  merged batch and merged batch (grouping of assigned subordinate batches/ serial numbers)

Prerequisite

In general, all batches to be merged have to be available.

The batch merge function can only be applied to batches meeting the below-mentioned conditions:

·  Only batches with the same material (material number) can be merged

·  Only batches with the same material type can be merged

·  All batches must have a positive remaining quantity (batch class = yield, remaining quantity > 0).

Consequently, scrap batches cannot be merged.

The following combinations are neither supported nor allowed:

·

·

combination of "simple" batches and merged batches

combination of an individual batch/serial number and a merged batch

·  Combination of an individual batch/serial number and an individual batch/serial number

Variants

In general, there are the following two variants to merge batches.

  Merge batches at AIP

AIP provides a function to merge the entered batches/merged batches into a new batch/merged

batch. A label can be printed for the merged batch.

  Merge batches at MOC

The MOC batch data overview provides a function to merge the entered batches/merged batches

into a new batch/merged batch.

Result

The below-mentioned results can be expected after merging batches at AIP or MOC:

TRT-CLA_82.docx

Version: 1.0.23555

Seite 49 von 74

Processing and Management of Batch Data

Merging "simple" batches:

·  The merged batches have a remaining quantity of 0

·  The merged batches are assigned the status "processed"

·  The new batch has the status "free"

·  The new batch has the batch class "yield"

·  The batch number of the new batch:

o

is a new batch number

o

is a batch number pertaining to the merged batches

Grouping merged batches:

·

the  grouped  merged  batches  have  a  remaining  quantity  of  0  and  do  no  longer  include

subordinate batches/serial numbers

·

·

·

the combined merged batches are assigned the status "processed"

the new merged batch has the status "free"

the  new  merged  batch  is  assigned  the  "yield"  batch  class  and  includes  all  subordinate

batches/serial numbers of the combined merged batches

·  The batch number of the new merged batch:

o

is a new batch number

o

is a batch number pertaining to the combined merged batches

TRT-CLA_82.docx

Version: 1.0.23555

Seite 50 von 74

Processing and Management of Batch Data

16  1

Recording Goods Receipt Batch

Overview

Function authorization

batch.generate

Usage

This function is used to create new batches in the system in the context of recording goods received.

Integration

The  batches  created  can  be  posted  in  the  system  as input  batches  for  plausibility  determination  and  to

guarantee traceability of the materials used in the production process.

By recording a new goods receipt batch, the tests for the material received can  be generated in quality

management.

Requirement

In the basic system settings a prefix has been stored that is used for the automatically generated batch

number and specifies the length of the batch number in the system.

The  material  types  in  the  system  have  been  updated.  If  the  material  type  is  to  be  determined

automatically by the system, the assignment between material and material type has been updated.

If the units included with the system upon delivery are not sufficient, you have defined your own  units in

the system.

Field descriptions

Workplace

The workplace used for receiving can be recorded for traceability.

MES order number

An order / operation can be recorded for traceability.

Material

Mandatory field for the material number of the batch to be created

Material type

Material type of the batch to be created.

Batch class

Specification regarding the quality of the goods receipt batch.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 51 von 74

Processing and Management of Batch Data

Yield – The batch is created as yield with the batch status "Approved".

Scrap – The batch is created as yield with the batch status "Blocked".

Quantity

Quantity received

Unit

Unit with regard to quantity

Material buffer

Material buffer into which the batch is received

Transport unit

Transport unit used for the batch

Comment

Free comment text

Badge

Badge number of the person responsible for recording

TRT-CLA_82.docx

Version: 1.0.23555

Seite 52 von 74

Processing and Management of Batch Data

17  1

Repost

Summary

Menu

Material management  Inventory management   Batch data overview  
Repost

Transaction code

batch.relocate

Function authorization

batch.relocate

Usage

The repost function can be used to repost a batch in another material buffer.

Field descriptions

Batch

Batch number to be reposted.

Workplace

Workplace at which the reposting is carried out

MES order number

MES order number of the batch to be reposted

Material

Material number of the batch to be reposted

Material type

Material type of the batch to be reposted

Material buffer

Material buffer into which the batch will be reposted

Reason

The  relevant  reason  is  entered  here  based  on  the  batch  class  (normally,  a  scrap  reason).  The

reason is kept when reposting.

Comment

Free comment text

TRT-CLA_82.docx

Version: 1.0.23555

Seite 53 von 74

Processing and Management of Batch Data

Batch class

Class of the batch (normally, yield/scrap)

Badge number

Badge number of the person that performs the reposting

TRT-CLA_82.docx

Version: 1.0.23555

Seite 54 von 74

Processing and Management of Batch Data

18  Batch Consumption

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 55 von 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 56 von 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 57 von 74

Processing and Management of Batch Data

The quantity calculated in a retrograde manner is deducted from the remaining quantity of the input batch

and then the batch shows the reduced "remaining quantity" and the initial quantity.

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 58 von 74

Processing and Management of Batch Data

19  Interrupting/Finishing OP without the Last Batch

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 59 von 74

Processing and Management of Batch Data

  Users register the input batches.

  Users perform the output batch change, once they want to finish an output batch.

  Once users have performed the last output batch change, they interrupt and/or log the operation

off by using the function "interrupt/log OP off".

A running OP may be interrupted or logged off by clicking the "interrupt/log OP off" option. Then a dialog

opens, where it may be chosen between "interrupt OP" and "log OP off".

If "log OP off" or "interrupt OP" is clicked the logoff dialog opens containing the same input fields like the

"output batch change" dialog.

If it was configured in the system that "no" last output  batch is to be used when interrupting/logging the

OP off, no output batch will be displayed, as there is no visible, active output batch at this point in time.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 60 von 74

Processing and Management of Batch Data

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

TRT-CLA_82.docx

Version: 1.0.23555

Seite 61 von 74

Processing and Management of Batch Data

  The deletion event is not displayed for the "deleted" batch in the batch history.

  A  last  H  record  is  generated  including  the  durations  recorded  between  the  last  output  batch

change  and  interrupting/logging  the  OP  off.  The  H  record  only  includes  durations  and  no

quantities.

  How to proceed with automatic quantities:

If automatic quantities are  recorded  between the  last  output batch  and logging the OP off, they

are currently not taken into account.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 62 von 74

Processing and Management of Batch Data

20  Interrupting/Finishing OP without the Last Batch

Usage

You  use  the  function  to  prevent  the  last  output  batch  generated  between  the  output  batch  change  and

interrupting/finishing the OP from being connected in the system and, therefore, to be deleted.

Configuration

Material type

These configurations have to be made for the article's material type (article/item from operation):



Interrupting/logging the OP off without the last batch: if the option is set, a last output batch will

indeed be generated for the article of the operation (matching this material type) between the last

output batch change and/or OP logon and OP interruption and/or OP logoff, but this one will be

deleted immediately (batch status = "D"). The batch is not visible in the batch history.

  Delete batch assignment: If this flag is set, the connection to the running input batches of the OP

will  be  deleted for the  output batch  "deleted at last".  Consequently, the deleted  batch  is neither

visible within batch tracing.

Dialog configuration A_AB_MPL/ A_UN_MPL

It  is  urgently  recommended  to  remove  the  following  fields  as  part  of  customizing  the  system,  as  they

might lead to misunderstandings and errors.

  Batch number

  Target buffer

  Transport unit

  Comment on batch

  Quality (yield, scrap)

  Quantity

  Reason

TRT-CLA_82.docx

Version: 1.0.23555

Seite 63 von 74

Processing and Management of Batch Data

21  Passing on Batch Attributes

Usage

You use the "pass batch attributes on" function if  attributes of input batches are to be transferred to the

generated output batch when changing the output batch.

Prerequisites /restrictions

  Mixing up the two methods of passing on (in the background on the server) and manual collection

at the terminal is excluded. Therefore, server processing checks if the option "Capture attribute

while generating batch" is set for the batch attributes to be passed on:

o  Yes – "Capture attribute while generating batch“ is set

  Manual collection takes priority - the attribute will not be passed on.

o  No - "Capture attribute while generating batch“:

  The attribute will be passed on.

  The transfer is performed based on the currently registered input batches upon completion of the

output  batch.  Provided  that  attributes  were  recorded  manually  beforehand,  they  will  be

overwritten.  It  is  not  possible  to  pass  on  several  input  batches  changed  while  the  output  batch

was running and/or only data of the last input batch is passed on.



It is not possible to pass on attributes from the level of subordinate batches to the level of merged

batches.



If for a material for which inheritance rules apply several items exist in the component list of an

OP, the value of the batch with the lower BOM item will be used (i.e. "0010" prior to "0040").

Procedure

The different initial scenarios have to be taken into account for passing on batch attributes. There are the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

Data/results/inspections



If  the  advanced  object  configuration  includes  an  inheritance  rule  for  the  material  of  the  input

batch:

o

the  inheritance  rule  BATCH_TO_BATCH  transfers  the  value  of  the  specified  attribute

from the input batch to the output batch.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 64 von 74

Processing and Management of Batch Data

o

the  inheritance  rule  CHILD_BATCH_TO_CHILD_BATCH  transfers  the  value  of  the

specified  attribute  from  the  subordinate  batch  of  the  input  batch  to  the  generated

subordinate batch of the output batch.

o

the  inheritance  rule  BATCH_TO_CHILDBATCH  transfers  the  value  of  the  specified

attribute  from  the  registered  batch,  for  merged  batches  from  the  superordinate  batch

level, to the subordinate batch of the generated output batch.

Inheritance/transfer for "simple" batches

Attributes are passed on from all input batches to the output  batch. The value from the first input batch

will be used if an attribute is configured several times.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 65 von 74

Inheritance/transfer for simple batches/merged batches to merged batches

Processing and Management of Batch Data

The inheritance is performed as follows:

  Attributes are passed on from the simple input batch to the output merged batch.

  Attributes  are  passed  on  from  the  simple  input  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes are passed on from the input merged batch to the output merged batch.

  Attributes  are  passed  on  from  the  input  merged  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes  are  passed  on  from  the  subordinate  batches  of  the  input  merged  batch  to  the

subordinate batches of the output merged batch.

The value from the first input batch is used if an attribute is configured several times.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 66 von 74

Processing and Management of Batch Data

Inheritance/transfer for merged batches to merged batches when merging

serial numbers

The inheritance is performed as follows:

  Attributes are passed on from the input merged batch to the output merged batch.

  Attributes  are  passed  on  from  the  input  merged  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes  are  passed  on  from  the  subordinate  batches  of  input  merged  batches  to  the

subordinate batches of output merged batches.

The value from the first input batch is used if an attribute is configured several times.

TRT-CLA_82.docx

Version: 1.0.23555

Seite 67 von 74

Processing and Management of Batch Data

22  Configuration of Passing on Batch Attributes

Usage

You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the

generated output batch when changing output batches.

General

Different  initial  scenarios  have  to  be  taken  into  account  for  passing  on  batch  attributes.  There  are  the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

System configuration

The option of passing batch attributes on is enabled for the Material type of the input batch.

In  addition,  a  configuration  is  required  in  advanced  object  configuration.  This  configuration  defines  in  a

"material to material" relationship which attributes are to be taken over by which inheritance rule.

Object type  Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

Parameter value  Active

MPL

LEVEL

VON_ARTIKEL

NACH_ARTIKEL

ATTRIBUT

INHERITATE  Y/N

Y

Advanced object configuration

If the advanced object configuration includes an inheritance rule for the material of the input batch:



the  inheritance  rule  BATCH_TO_BATCH  transfers  the  value  of  the  specified  attribute  from  the

input batch to the output batch.



the  inheritance  rule  CHILD_BATCH_TO_CHILD_BATCH  transfers  the  value  of  the  specified

attribute from the subordinate batch of the input batch to the generated subordinate batch of  the

output batch.



the inheritance rule BATCH_TO_CHILDBATCH transfers the value of the specified attribute from

the registered  batch, for merged batches from the superordinate batch  level, to  the subordinate

batch of the generated output batch.

Inheritance/transfer for "simple" batches

Example

TRT-CLA_82.docx

Version: 1.0.23555

Seite 68 von 74

Processing and Management of Batch Data

BATCH_ATTRIBUTE  LEVEL

VON_ARTIKEL

NACH_ARTIKEL

ATTRIBUT

Example slide 1

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

4712

4712

4712

4711

4711

4713

4713

4713

4713

4713

ATTRIB_101

ATTRIB_102

ATTRIB_103

ATTRIB_111

ATTRIB_112

Inheritance/transfer for simple batches/merged batches to merged batches

Example

BATCH_ATTRIBUTE  LEVEL

VON_ARTIKEL

NACH_ARTIKEL

ATTRIBUT

BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH

BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH

BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

4711

4711

4711

4711

4712

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712

4713

4713

4713

4713

4713

4713

4713

ATTRIB_101

ATTRIB_102

ATTRIB_103

ATTRIB_103

ATTRIB_104

ATTRIB_105

ATTRIB_106

Inheritance/transfer for merged batches to merged batches when merging serial numbers

Example

BATCH_ATTRIBUTE  LEVEL

VON_ARTIKEL

NACH_ARTIKEL

ATTRIBUT

BATCH_ATTRIBUTE  BATCH_TO_BATCH

BATCH_ATTRIBUTE  BATCH_TO_BATCH

4712

4712

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712

BATCH_ATTRIBUTE  BATCH_TO_BATCH

4812

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4812

BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4812

4713

4713

4713

4713

4713

4713

4713

4713

ATTRIB_103

ATTRIB_104

ATTRIB_101

ATTRIB_105

ATTRIB_106

ATTRIB_105

ATTRIB_111

ATTRIB_112

TRT-CLA_82.docx

Version: 1.0.23555

Seite 69 von 74

Processing and Management of Batch Data

23  Passing on Document Links to Batches

Usage

You use the "Pass document links on" function if document links attached to input batches are also to be

transferred to the generated output batch when changing the output batch.

Prerequisites /restrictions

  Mixing up the two methods of passing on (in the background on the server) and manual collection

at the terminal is not excluded.

  The transfer is performed based on the currently registered input batches upon completion of the

output batch. It is not possible to pass on several input batches changed while the output batch

was running and/or only data of the last input batch is passed on.



It is not possible to pass on document links from the level of subordinate batches to the level of

merged batches.



If  several  items  exist  in  the  component  list  of  an  OP  for  a  material,  the  transfer/inheritance

depends on the input batches logged on:

o

If different input batches are registered for the items/positions, the document links of all

registered input batches of this material will be taken over.

o

If the same input batch is  logged on to  different items/positions, the  document links will

only be taken over once.

Procedure

Different  initial  scenarios  have  to  be  taken  into  account  for  passing  on  document  links.  There  are  the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

Inheritance/transfer for "simple" batches

For "simple" batches the document links of all input batches registered when completing the output batch

are  transferred  to  the  output  batch.  It  is  not  checked  if  there  are  duplicate  documents.  The  following

diagram illustrates how the system reacts:

TRT-CLA_82.docx

Version: 1.0.23555

Seite 70 von 74

Processing and Management of Batch Data

Inheritance/transfer for simple batches/merged batches to merged batches

If  merged  batches  including  subordinate  batches  are  generated  as  part  of  the  collection  process,

document links will be passed on to the generated batches as described below:

  The documents of the source merged batch(es) are transferred to the generated merged batch.

  The  documents  of  the  incorporated  batch(es)  (that  are  neither  merged  batches  nor  their

subordinate batches) are transferred to the generated merged batch and its subordinate batches.

  The  documents  of  the  incorporated  subordinate  batches  are  transferred  to  the  generated

subordinate batches of the generated merged batch.

The following diagram illustrates how the system reacts:

TRT-CLA_82.docx

Version: 1.0.23555

Seite 71 von 74

Processing and Management of Batch Data

Inheritance/transfer for merged batches to merged batches when merging

serial numbers

If  merged  batches  including  subordinate  batches  are  generated  as  part  of  the  collection  process,

document links will be passed on to the generated batches as described below:

  The documents of the source merged batch(es) are transferred to the generated merged batch.

  The  documents  of  the  incorporated  batch(es)  (that  are  neither  merged  batches  nor  their

subordinate batches) are transferred to the generated merged batch and its subordinate batches.

  The  documents  of  the  incorporated  subordinate  batches  are  transferred  to  the  generated

subordinate batches of the generated merged batch.

The following diagram illustrates how the system reacts:

TRT-CLA_82.docx

Version: 1.0.23555

Seite 72 von 74

Processing and Management of Batch Data

TRT-CLA_82.docx

Version: 1.0.23555

Seite 73 von 74

Processing and Management of Batch Data

24  Configuration of Passing on Document Links

Usage

You use the "Pass document links on" function if document links pertaining to input batches are also to be

transferred to the generated output batch when changing output batches.

General

Different  initial  scenarios  have  to  be  taken  into  account  for  passing  on  document  links.  There  are  the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

Basic configuration

Passing on of document links is based on document management, which has to be enabled accordingly.

System configuration

The  option  of  passing  document  links  on  is  enabled  for  the  material  type  of  the  input  batch  using  this

option:



Input batch processing > pass document links on

TRT-CLA_82.docx

Version: 1.0.23555

Seite 74 von 74

