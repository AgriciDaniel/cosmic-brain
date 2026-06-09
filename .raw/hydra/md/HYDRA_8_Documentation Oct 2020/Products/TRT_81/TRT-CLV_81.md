Manual

Batch / Lot  Data Management
TRT-CLV 8.1

Version 1.0.23555

Last changed on: 08.10.2020

Batch / Lot  Data Management

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

TRT-CLV_81.docx

Version: 1.0.23555

Page 2 of 31

Batch / Lot  Data Management

Contents

1  Batch / Lot Data Management ..................................................................... 4

2  Batch data overview ..................................................................................... 6

3  Material Types ............................................................................................ 12

4  Reasons ..................................................................................................... 23

1  Batch Logs ................................................................................................. 26

5  Material Movements ................................................................................... 28

TRT-CLV_81.docx

Version: 1.0.23555

Page 3 of 31

Batch / Lot  Data Management

1  Batch / Lot Data Management

Fields of application

Batch data management provides functions to monitor the production process not only in relation to the

recorded quantities and times but also in relation to the used and produced materials.

Validity  checks  integrated  in  posting  functions  increase  process  reliability  by  making  sure  that  only

admissible batches enter the production process.

As  individual  events  are  recorded,  it  is  also  possible  to  research  at  a  later  point  in  time  which  input

materials have been used and which material has been produced.

Implementation notes

You use the batch and lot management function if you

  are obliged to prove traceability by statutory regulations

  have to ensure traceability as supplier due to (self) commitments

  wish to record and monitor your work-in process stock levels for your multi-level production processes

Integration

Batch data management is based on order data provided by external systems (mostly ERP systems) or

created in the system itself.

Data  from  external  systems  (mostly  ERP  systems)  or  data  created  in  the  system  itself  may  also  be

accessed to check the material in use for validity.

While planning, discrete batches may be specified for production.

The produced batches can be made available for the number pool of quality data collection.

The data collected  with respect to the used materials  and output materials can be  uploaded to  external

systems (systems with inventory-management component).

Features

  Time and quantity recording for batches:

o  Entry of batches at the same time as logging operations on

o  Batch-related time and quantity recording

TRT-CLV_81.docx

Version: 1.0.23555

Page 4 of 31

Batch / Lot  Data Management

o  Entry and checking of input and output batch changes while the operation is running

o  Manual or automatic assignment of batch numbers according to the configuration

o  Entry of events and logging

o  Entry of notes

entry of notes about batches to be used in label printing and the history

  Checking of input batches

o  Checking of input batches with respect to the duty of documentation when logging operations

on as well as to the component list of the operation

  Entry of goods receipt batches

  Configuration options:

o  Editing function: material type master data to control processing specific to material

o  Editing function: to define individual yield, scrap and recording reasons

o  Configuration of process parameters for identification keys such as batch  numbers or serial

numbers

o  Control  of  data  filing  on  the  basis  of  configuration  parameters    automatic  control  of  data

filing on the basis of set configuration parameters

  Editing and correction functions for entered batches

  Evaluation of recorded batch values

o  Tabular presentation of recorded parameters on identification keys

o  Automatic  locating  and  assignment  of  stored  values  for  evaluations/reports  and  further

processing

o  Transfer of the recorded batch numbers to the ERP system

TRT-CLV_81.docx

Version: 1.0.23555

Page 5 of 31

Batch / Lot  Data Management

2  Batch data overview

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 6 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 7 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 8 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 9 of 31

Editing functions

Use the following functions that are available  in addition to the  standard features to edit one  or several

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 10 of 31

If  you  split  a  collective  batch,  the  selected  individual  batches/serial  numbers  are  transferred  to  a

batch  split  off.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 11 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 12 of 31

Description

Description/name (plain text) of the material type

Batch / Lot  Data Management

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

F – Input batches are  automatically  logged  off when  an operation  is interrupted  or logged  off and

then get the batch status "free".

TRT-CLV_81.docx

Version: 1.0.23555

Page 13 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 14 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 15 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 16 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 17 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 18 of 31

equal to 0 (<= 0) before the posting.

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 19 of 31

Batch / Lot  Data Management

Automatic assignment of serial numbers

This  option  enables  the  automatic  assignment  of  numbers  for  a  new  part  when  merging

components  listed  by  serial  numbers.  If  this  option  is  not  set,  you  can  assign  the  serial  number

manually. The option is only relevant if the option "Superordinate serial number" = N is set for the

component.

User field key for output batches

The defined user field key is transferred to the generated output batches.

Behavior when output batch has quantity 0

Use the option Behavior when output batch has quantity 0 to specify system behavior when output

batches are changed and the quantity is 0.  You can choose from the following three configuration

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 20 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 21 of 31

Batch / Lot  Data Management

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

TRT-CLV_81.docx

Version: 1.0.23555

Page 22 of 31

Batch / Lot  Data Management

4  Reasons

Summary

Menu

Master data  Workplaces / Machines  Reasons

Transaction code

reas

Function authorization  mdreas

Usage

Use this configuration to create or to change the reasons available in the system. Reasons may either be

created for the entire system or referred to a workplace

Integration

The  reasons  that  are  saved  to  the  system  will  be  available  for  collection  on  the  terminal  as  well  as  in

different applications. They are used to classify quantities of materials or modifications.

In order for the settings or the changes made to be able to be interpreted by the terminal shop

floor program, the terminal, which the workplace/machine is assigned to, has to be restarted. All

terminals should be restarted, provided that new reasons have been created or reasons affecting

the entire system have been changed.

Requirements

You have defined reason texts in the system.

Selection criteria

The following selection criteria are available in the application:

Type

Reason type, e.g. scrap

Workplace

Workplace selection.

Reasons that are configured for the "workplace" SYSTEM, will always be displayed even if

a workplace will explicitly be restricted.

Reason

Unique reason number

TRT-CLV_81.docx

Version: 1.0.23555

Page 23 of 31

Batch / Lot  Data Management

Designation

Designation of the reason. Wildcards can be used.

Superior reason

Selection of a superior reason. All reasons will be selected that have the selected reason as (direct)

superior reason.

Field descriptions

Workplace

Assignment of a reason text to a workplace. If "SYSTEM" is entered, this will apply as system-wide

assignment.

System-wide  reasons  will  always  apply  in  addition  to  the  workplace-specific  reasons  and

will therefore also be displayed in the terminal's selection list.

Type

Classification and/or grouping of reasons

Possible values:

A

N

P

G

L

R

E

Scrap reason

Rework reason

Open quantity reason (before: problematic quantity)

Yield reason: will be interpreted as deviation reason

Reasons for batch logs (relevant in connection with MPL)

Reduce (partitioning) reason (relevant in connection with WRM)

Increase (partitioning) reason (relevant in connection with WRM)

Reason

Identification number of the reason.

As  system-wide  reasons  always  apply  in  addition  to  reasons  relating  to  workplaces,  their

numbers  have  to  be  unique,  i.e.  a  scrap  reason  with  the  number  99  for  the  SYSTEM

workplace  must  not  be  defined  at  the  same  time  as  workplace-related  scrap  reason

assigned to the number 99.

Reason text no.

Identification number of the reason text

Designation

Related reason text from the reason text configuration.

TRT-CLV_81.docx

Version: 1.0.23555

Page 24 of 31

Ext. reference

For  each  assignment  exists  an  alphanumeric    representation  that  can  be  uploaded  back  to  the

Batch / Lot  Data Management

interface, for example

Scrap material

Is used in connection with HYDRA-MPL

Superior reason

The reference to a superior reason is reserved for further extensions/modifications; at present it has

no function and should consequently not be completed.

“Copy“ detail application

The "copy" button can be used to copy reasons defined in relation to a workplace from one workstation to

the next. Reasons of the "workplace" SYSTEM cannot be copied.

The below-mentioned options are supported while copying:

  Copy currently selected reason

This  option  can  be  used  to  copy  the  currently  selected  reason.  For  this  purpose,  enter  the  below

pieces of information in the fields below "To":

  Workplace: target workplace for which the reason is to be copied

  Type:  Choose  the  reason  type  under  which  the  reason  is  to  be  created  for  the  target

workplace. The field is assigned by default to the type of the currently selected reason.

  Reason:  Enter  the  reason  number  under  which  the  reason  is  to  be  created  for  the  target

workplace. The field is assigned by default to the type of the currently selected reason.

  Copy all reasons

This option allows copying of all reasons defined for a workplace to another workplace. However, a

prerequisite for this is that reasons have not yet been configured for the target workplace. To do so,

enter the target workplace for which the reasons are to be copied in the "workplace" field. Please note

that all workplace reasons are always copied, irrespective of the type of the reason.

  Copy missing reasons

In contrast to the previous option, this function allows for reasons to be copied to another workplaces,

even if reasons are already assigned to this workplace. To do so, enter the target workplace for which

the  reasons  are  to  be  copied  in  the  "workplace"  field.  Please  note  that  all  workplace  reasons  will

always be copied, irrespective of the type of the reason.

TRT-CLV_81.docx

Version: 1.0.23555

Page 25 of 31

Batch / Lot  Data Management

1  Batch Logs

Summary

Menu

Material management  Batch tracing  Batch logs

Transaction code

batlog

Function authorization

batlog

Usage

 This function is used to display the recorded log data with respect to a batch and evaluate it accordingly.

No provisions are made for modifying existing log data.

Selection criteria

The following selection criteria are available in the application:

Batch

Batch number

Order/ OP

Order number or combined order/ OP number in order for all logs within an order to be displayed.

Machine

Machine/ workplace in order for all logs for a specified machine to be displayed.

Reason

Number of the reason for the error according to configuration.

Recording time

Period in which the log data are to be selected.

Field descriptions

Batch

Batch for which the log record was recorded.

Internal batch number

Internal batch number for which the log record was recorded.

Order

Order during which the log record was recorded.

Machine

Machine at which the log record was recorded.

TRT-CLV_81.docx

Version: 1.0.23555

Page 26 of 31

Batch / Lot  Data Management

Reason, reason texts

Recorded reason as well as reason text according to configuration

Comment

Recorded comment.

Running meter from/to

Running meter position/ area for which the log record was recorded.

Personnel number, date

Personnel number of the person that recorded the log record as well as the date on which the log

record was recorded by the worker.

Originator, date

Most recent originator of the log record as well as the date of the most recent modification.

Scrap

Reserved.

Error message was generated

Reserved.

Reference

Reserved.

Daughter reels (optional)

Reserved.

Attribute 1-5, parameter 1,2

Reserved for customer-specific additions

TRT-CLV_81.docx

Version: 1.0.23555

Page 27 of 31

Batch / Lot  Data Management

5  Material Movements

Summary

Menu

Material management -> Inventory management ->Material movement

Transaction code

mmov

Function authorization  mmov

Usage

In the evaluation/report of material movements, the various movements related to a material inventory are

represented. The material movements can be related to batches or discrete material components.

For  movements  that  are  batch-related,  additional  data  from  the  referenced  batch  inventory  (e.g.

alternative batch numbers) are shown in the evaluation.

Material  movements  are  differentiated  into  goods  issued  (consumption)  and  goods  received  (material

produced from production).

Selection Criteria

If several selection criteria are used overlapping results are displayed.

The application provides the following selection criteria:

Movement

Movement

Type of movement

Movement

Type of movement

Batch number

With this selection, all movements of batches assigned to the selected (external) batch number are

displayed.

Material

Material number of the batches.

TRT-CLV_81.docx

Version: 1.0.23555

Page 28 of 31

Batch / Lot  Data Management

Workplace

Selection of a workplace from the workplace pool

MES order number

MES order number (order/operation number) by which the batch has been produced/consumed.

Internal batch number

With  this  selection,  all  movements  of  batches  assigned  to  the  selected  internal  (system-wide

unique) batch number are displayed.

Material type

With this selection, all movements of batches assigned to the selected material type are displayed.

Date

Period during which the movements took place

Movement

Type of movement (goods receipt or goods issue)

Consider long-term data

Archived data is taken into account.

Storage locations

Source buffer (storage location)

Material buffer from which the batch/material was moved/transferred.

Issuing storage location

Storage

location  (from  material

type  configuration)

from  which

the  batch/material  was

moved/transferred.

Target buffer

Material buffer which the batch/material was moved/transferred to.

Receiving storage location

Storage location (from material type configuration) which the batch/material was moved/transferred

to.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all movements of batches that currently have

this identifier.

Batch attributes

TRT-CLV_81.docx

Version: 1.0.23555

Page 29 of 31

Batch / Lot  Data Management

Batch attributes

Selecting  a  batch  attribute  as  a  selection  criterion  displays  all  movements  of  batches  for  the

material type of which this batch attribute has been configured and that are currently assigned this

identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  movements  of  batches

that currently have this identifier.

Field Descriptions

Movement

Type of material movement

Uploaded

If the identifier is set, the material movement has already been uploaded to the ERP system. If the

identifier is not set, the material movement has not yet been uploaded to the ERP system.

To be uploaded

If the identifier is set, uploading the material movement to the ERP system is intended. This setting

can be accessed using the corresponding configuration on the material type. If the identifier is not

set, uploading the material movement to the ERP system has not been considered.

Article

Material number

Description

Material description (plain text)

OP

Operation of the material movement

Issuing storage location

Original storage location

Receiving storage location

Receiving storage location of the material movement

For goods issues quantities are always indicated with negative algebraic sign.

TRT-CLV_81.docx

Version: 1.0.23555

Page 30 of 31

Batch / Lot  Data Management

TRT-CLV_81.docx

Version: 1.0.23555

Page 31 of 31

