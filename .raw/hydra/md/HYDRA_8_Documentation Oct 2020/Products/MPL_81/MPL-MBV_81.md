Manual

Material and Inventory
MPL-MBV 8.1

Version 1.0.662

Last changed on: 19.06.2020

Material and Inventory

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

MPL-MBV_81.docx

Version: 1.0.18468

Page 2 of 23

Material and Inventory

Contents

1  Material and Inventory Management ........... Error! Bookmark not defined.

2  Material Types .............................................................................................. 5

3  1 Assignment Material - Material Type ...................................................... 15

4  Generating Batch Numbers ........................................................................ 17

5  Batch Data Overview ................................................................................. 18

MPL-MBV_81.docx

Version: 1.0.18468

Page 3 of 23

Material and Inventory

1  Material and Inventory

Possible fields of application

The material and inventory management function allows for material/batches to  be managed as  well as

classified  and  grouped  in  material  types.  These  material  types  specifically  control  data  collection  and

processing in MES.

The function package also provides functions to edit and, if necessary, correct data of collected batches

at a later point in time.

Implementation notes

The function package is used if you:

  would like to control system performance relating to batches subject to the material.

  need to correct data of recorded batches subsequently

Integration

The material type, which is a fundamental element of order data as well as of component data or the used

batches, integrates the function package with a variety of function groups.

Functions

  Configuration of material types

o  Editing function of material type master data to control material-specific processing

  Configuration of assignment of materials to material types

o  Editing function to classify material in material types

  Manual or automatic assignment of batch numbers

o  Manual or automatic assignment of batches or batch numbers according to configuration

  Editing and correction of batches

o  Editing and correction functions for recorded batches

MPL-MBV_81.docx

Version: 1.0.18468

Seite 4 von 23

Material and Inventory

2  Material Types

Summary

Menu

Master data  Material  Material types

Transaction code

mtyp

Function authorization  mtyp

Usage

This function is used to create or modify material types in the system.

Integration

The system uses the material type and the settings stored with it to control the system behavior of objects

to which the material type is assigned.

Selection criteria

Material type

Unique material type key

Type

Category of the material type

Material type name

Description or name of the material type (plain text)

Field description - general

Material type

Unique material type key

Lot size

Typical lot size in which batches of this material type are produced.

Material type name

Designation of the material type (plain text)

Type

Category of the material type

At  the  moment  assigning  a  type  serves  the  purpose  of  classification  and  logical  combination  of

similar material types. Control of processing is not connected with this assignment.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 5 von 23

Material and Inventory

Unit

Unit in which the materials of this type are listed.

Field descriptions – input batch processing

Inventory management

E - Yes, when logging input batch off

In  this  case  the  quantity  of  the  batch  consumed  or  the  remaining  quantity  is  to  be  collected

manually when the batch is logged off. The quantity reduction and the transfer of the consumption

posting to higher-level systems are performed only after the batch is logged off.

R - Yes, backflush (retrograde)

G - Yes, backflush (only for YIELD of the output batch)

like  R;  however,  the  quantity  of  the  input  material  is  only  deducted  in  a  retrograde  manner  if  the

output batch produced is a yield batch (batch class = G)

N  -  No  inventory  management.  Batches  of  this  material  type  are  not  considered  in  the  stock

overview.

Please note: Inputting the remaining quantity or the consumption depends on the configuration and

is generally possible in an input batch change on the Windows terminal. In "Log input batch off" this

quantity is posted to the respective batch. This applies for options E, R, G and N.

A – Anonymous inventory management

Batches of this material type are processed as material without batch reference in composition.

Logoff of input batches (when OP is interrupted/logged off)

A – Input batches are logged off automatically when an operation is interrupted or logged off and,

finally, receive the batch status "processed".

F – Input batches are logged off automatically when an operation is interrupted or logged off and,

finally, receive the batch status "free".

G – Input batches are logged off when an operation is interrupted or logged off as it is configured in

the basic parameter settings.

N – Input batches are not logged off automatically when an operation is interrupted or logged off.

S – Input batches are logged off automatically when an operation is interrupted or logged off and,

finally, receive the batch status "blocked".

MPL-MBV_81.docx

Version: 1.0.18468

Seite 6 von 23

Material and Inventory

Tolerances when logging off

Value in %.

When the input batch is logged off, a check is made as to whether or not the absolute value of the

remaining quantity is less than the percentage value of the original quantity as specified here. If this

is the case, the batch is set to batch status "Processed", so it is identified as consumed.

Maximum value

The maximum value limits the tolerance when logging off.

If the remaining quantity is less than the specified percentage value but greater than the maximum

value, the batch is not set to batch status "Processed".

Options

Can be logged on several times to one machine

With  this  option,  it  is  possible  for  an  input  batch  to  be  logged  on  at  multiple  positions  within  the

component list (BOM items) of an operation at a machine.

If the option is not set, if an input batch is already logged on at a position, another attempt to log it

on to another position will be rejected with an error message.

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

If the option is set, batch 000007153 with material number 487191 can either be logged on to only

one of the three positions 0001, 0003, 0005 or to two or even to all of these positions. If the batch

is already logged on, during the second (and every other) logon of this batch a selection window

with the positions of this material is displayed. For another logon, the operator must now select the

position  at  which  the  batch  is  to  be  logged  on.  After  confirmation,  the  batch  is  logged  on  to  this

(additional)  position.  However,  if  the  operator  selects  a  position  at  which  the  batch  is  already

logged on, the labeling of the button is modified such that it is interpreted as a batch logoff.

In general, a multiple logon of different batches for the same materials (same material at

different BOM items) is possible - regardless of how this option is set. If this option is set,

the following option, Parallel use allowed is interpreted as being implicitly set.

Logging on unplanned material is not supported with this function.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 7 von 23

Material and Inventory

Can be logged on to several machines at the same time

The input batch can be logged on to multiple workplaces and/ or operations in parallel at one time.

Here it is does not make any difference if the input batch that is already logged on to an operation

on a machine



is logged on to another operation on the same machine



is logged on to another operation on another machine



is logged on to the same operation on another machine

Input batch must be logged on

This option activates an additional validation check during the logon of operations that require batch

management. Here, for all of the material components (BOM items) which have a material type for

which  a  check  is  activated,  the  system  checks  if  there  are  already  batches  logged  on.  If  this

inspection fails, the logon of the operation is refused.

If all materials of the component list must always be logged on as input batches before the OP is

allowed to be logged on, the option Log OP on only if all components are logged on as inp. batches

in the Output batch processing tab can be used to achieve this result based on material types.

The  validation  check  is  made  when  logging  on  the  OP  and  during  an  output  batch

change.

When  an  input  batch  is  changed  using  the  function  Input  batch  change,  no  check  is

made.

That means that you can log off an input batch with required log on without registering a

new one for that position. In order to carry out another output batch change, however, a

valid  batch  must  have  been  logged  on  for  this  position.  Without  a  logged  on  batch,

however, the operation can be logged off or interrupted.

Hand batch number down

If  an  input  batch  with  a  material  type  set  with  this  option  is  logged  on  at  order  start,  this  batch

number is used as the batch number for the output batch to be logged on.

At  the  same  time,  for  the  output  batch  logon  a  check  is  made  as  to  whether  or  not  the  batch

number  of  the  input  batch  may  be  handed  down,  i.e.  if  the  material  type  of  the  input  batch  is

configured with this option.

The option is applied and configured in connection with throughput batch processing.

If this identifier is set, the identifier "Input batch only valid for exactly 1 output batch" must

also be set.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 8 von 23

Material and Inventory

Input batch only valid for exactly 1 output batch

For components with a material type for which this identifier is set, at least 1 batch per output batch

must be logged on as an input batch.

Please  note:  The  identifier  only  controls  the  processing  during  a  batch  change  (CA_WL).  It  does

not ensure that an input batch can be logged on again at a later time (at which another output batch

is active).

Allow entry of unknown input batches

This  option  allows  input  batches  previously  unknown  on  the  system  side  to  be  automatically

generated and logged on.

If this option is enabled and an input batch that is unknown in the system is logged on, the material

number  of  the  component  is  automatically  used  for  generation  when  logging  the  input  batch  on.

The  batch  is  created  with  a  quantity  of  1000000000  in  the  primary  quantity  unit  of  the  OP  and  a

goods receipt posting is performed.

In order to determine the right material type, there has to be a configuration/assignment between

material  and  material  type  so  that  the  material  type  can  be  determined  correctly  by  way  of  the

material number of the component. The SYSTEM material type is assigned automatically, provided

that no assignment is kept for a material in HYDRA.

Use data for output material

This identifier specifies if the expiry date of the input batch can be used to calculate the expiry date

of  the  output  batch.  Here  it must  be  taken  into  consideration  that  only  a  logged  on  input  material

has  this  identifier  based  on  its  material  type  so  that  the  output  batch  generated  can  accept  the

expiry date if it is configured accordingly (see "Determination of expiry date" in the "General" tab).

Decision on changing the input batch

If this option is enabled, a warning message will be displayed when changing the input batch before

the running input batch is logged off.

Especially when serial numbers are collected, this warning message points out to the user that all

individual components listed by serial numbers have to be evaluated before logging the input batch

off in order for them to be "properly" connected to the resulting output batch (merged batch).

Pass batch attributes on

This  option  makes  it  possible  to  transfer  configured  batch  attributes  of  an  input  batch  to  the

resulting  output  batches. The configuration can be complemented flexibly by the advanced object

configuration.

Pass document links on

This  option  makes  it  possible  to  transfer  document  links  of  an  input  batch  to  the  resulting  output

batches. The configuration can be complemented flexibly by the advanced object configuration.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 9 von 23

Material and Inventory

Field descriptions – output batch processing

Min. storage time

Min. storage time for the material type

During output batch determination, the corresponding availability date is calculated using this value

(by adding it to the date/ time of manufacture). As long as this calculated time lies in the future, a

batch remains in "Min. storage time" status and cannot be logged on.

Please  note:  Based  on  the  material,  this  setting  can  be  overridden  using  the  configuration

assignment of material to material type.

Warning limit

Warning limit of the material type

During batch generation, the corresponding warning date is calculated using this value (by adding it

to  the  date/  time  of  manufacture).  This  can  be  used  for  an  evaluation,  e.g.  using  the  function

warning report.

Please  note:  Based  on  the  material,  this  setting  can  be  overridden  using  the  configuration

assignment of material to material type.

Expiry limit

Expiry limit of the material type

During batch generation, the corresponding expiry date is calculated using this value (by adding it

to  the  date/  time  of  manufacture).  At  this  point  in  time  the  batch  is  automatically  set  to  "Expired"

status, so it can no longer be registered.

Please  note:  Based  on  the  material,  this  setting  can  be  overridden  using  the  configuration

assignment of material to material type.

Reserved when batch is generated

This  option  can  be  used  to  automatically  reserve  the  output  batches  produced  for  subsequent

processes. The reservation can be made on different levels.

Values:







- No automatic reservation for batch generation

- Reservation for all OPs of the order

- Reservation for subsequent OPs

With the last two values, for a subsequent  input batch logon a corresponding  validation check for

the

existing

reservation

is

made.

In  reel-based  production  (MPL-RF)  on  so-called  cutting  machines  the  reservation  is  always

specified in relation to the subsequent parent operation.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 10 von 23

Material and Inventory

Options

Enter input quantity in relation to batches (MPLRF-BP)

Please  note:  This  option  should  only  be  set  as  an  exception,  e.g.  due  to  requirements  resulting

from the project.

If this option is set, the input quantity is collected in relation to the output batch. If this option is not

set, the input quantity is collected in relation to the operation.

Input batch change obligatory for residual quantity <= 0

Provided that this option is set, those input batches that are currently logged on are highlighted in

red the residual quantity of which is less than or equal 0, when output batches are changed. These

input batches now have to be logged off.

Please  note:  This  option  is  only  taken  into  account  for  MPL  machines  (batch  management)

assigned to the machine type "M". Processing takes places locally at the terminal.

Log OP on only if all components are logged on as inp. batches

If this option is set, the OP can only be logged on for the output material when all of the materials of

the component list are logged on as input batches.

If this option is not set, the OP can still be logged on if not all of the materials are logged on as input

batches (yet).

  Consumption balance

During the OP logoff, an  additional dialog (V_BLZ)  is opened displaying the material components

and their consumption quantities in relation to the current OP logon. In this dialog, the operator has

the option to log off input batches that are still running. The option only becomes active when the

consumption balance on the machine was activated in the MPL tab.

Serial no. obligation (MPL-SNR, starting with MPL 7.2)

In the collection of serial numbers (ADE-SNR), when this option is active and the operations require

batch  management,  an  additional  batch  per  serial  number  is  created  in  the  MPL  module.  The

collection of the batches per serial number (using command A_TR) is performed only for operations

with serial number obligation  = E. In the batch relationships (mpl_beziehungen) table, traceability

to the current output batch (ID) is established per collected serial number.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 11 von 23

Material and Inventory

Generation of HU (MPL-SNR, starting with MPL 7.2)

If  the  serial  number  obligation  option  is  set,  this  option  can  be  used  for  additional  control  with

respect to whether or not the collected serial numbers are stored in stock in relation to a  handling

unit (merged batch). The option is currently only intended for customizations and does not have any

effect.  BUL: During an output batch change, the acronyms CNRHU:G / CNRHU:A / CNRGENHU:G

/ CNRGENHU:A can be used to generate a HU for serial numbers as a yield or scrap HU. In this

case, the serial numbers are assigned to the HU batches (merged batches) and in the relationship

table (mpl_beziehungen) the traceability to the current output batch (ID) is created.

Please note that this option is only checked at OP logon and output batch change. When an input

batch is changed using the function Input batch change, no check is made.

Log off/interrupt OP without the last batch

If  the  option  is  set,  a  last  output  batch  will  indeed  be  generated  for  the  article  of  the  operation

(matching  this  material  type)  between  the  last  output  batch  change  and/or  OP  logon  and  OP

interruption  and/or  OP  logoff,  but  this  one  will  be  deleted  immediately  (batch  status  =  "D").  The

batch is not visible in the batch history.

Delete batch assignment

If this flag is set, the connection to the running input batches of the OP will be deleted for the output

batch "deleted at last". Consequently, the deleted batch is neither visible within batch tracing.

Automatic assignment of serial numbers

This  option  enables  the  automatic  assignment  of  numbers  for  a  new  part  when  merging

components  listed by serial numbers. If this option is  not set, the serial number may  be assigned

manually.  The  option  is  only  relevant  if  the  flag  "Superordinate  serial  number"  =  N  is  set  for  the

component.

User field key for output batches

The defined user field key is transferred to the generated output batches.

Field description - general

Determination of expiry date

  Current point in time – the expiry date is calculated based on the current point in time and the

duration stored with the material type of the output batch.

  Shift  date  -  The  expiry  date  of  the  generated  output  batch  is  determined  based  on  the  current

shift date, the time 00:00 and the expiry limit stored with the material type.



Input batch

The  expiry  date  of  the  generated  output  batch  is  determined  from  the  running

input batch where the option "Use data for output material" is set on the material type.

  Processing according to the advanced object configuration The  determination  of  the  expiry

date of the generated output batch is specified using an additional configuration in the  advanced

object configuration:

MPL-MBV_81.docx

Version: 1.0.18468

Seite 12 von 23

Material and Inventory

o  Use of the closest expiry date of all logged on input batches - If this configuration is

active,  the  expiry  and  warning  time  of  the  input  batch  with  the  closest  expiry  time  is

accepted in the output batch. The availability date is calculated using the configuration in

the "Output batch processing" tab.

Parameter name

Parameter value

Object type

Object ID 1

MATTYP

Material  type  of  the  output  batch  for  which  the

configuration applies

Parameter

DATE_OF_EXPIRY_CALCULATION

Parameter value

MIN_DOE_OF_INPUT_MATERIAL

o  Use

of

the

closest

expiry

date

of

selected

input

batches

If  this  configuration  is  active,  the  expiry  and  warning  time  of  the  input  batch  with  the

closest  expiry  time  is  accepted  in  the  output  batch.  The  availability  date  is  calculated

using the configuration in the "Output batch processing" tab.

Parameter name

Parameter value

Object type

Object ID 1

MATTYP

Material  type  of  the  output  batch  for  which  the

configuration applies

Parameter

DATE_OF_EXPIRY_CALCULATION

Parameter value

MIN_DOE_OF_SELECTED_INPUT_MATERIAL

In  the  determination  of  the  relevant  input  batches,  however,  only  those

batches  are  considered

that  are

identified  using  an  additional

configuration related to the material type.

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

This  flag  defines  whether  a  batch  of  this  material  type  is  to  be  logged  on  automatically  as  input

batch  for  the  subsequent  operation  (on  the  basis  of  the  operation  sequence  within  a  production

order) as WIP material. The configuration for the function is described here.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 13 von 23

Material and Inventory

Options

Transfer to interface (goods movements)

If this indicator is set, the produced output batch is identified as goods receipt or the used up input

batch as goods issue and as being subject to uploads within the material movements.

Hold back goods receipt until usage decision is made

You can use this option to delay the transfer of goods receipts to the PPS system. In this case, the

output batch is transferred only if a usage decision is taken.

Field descriptions - transport

Generate transport order for output material

This option creates a transport order relating to batches for a generated output batch. The transport

is  started  from  the  material  buffer  in  which  the  output  batch  is  produced.  The  option  set  here

overrides the configuration of the relevant option within the configuration of workplaces.

Generate transport order for input material

This option creates an article-related transport order in relation to a material component, when an

operation  is  planned  for  a  machine  using  the  shop  floor  scheduling  module.  Transportation  is

started from the output material buffer of the preceding operation. The option set here overrides the

configuration of the relevant option within the configuration of workplaces.

Field descriptions – user fields

Customizing can be used to release user fields for the object type “MATTYP”.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 14 von 23

Material and Inventory

3  1

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

MPL-MBV_81.docx

Version: 1.0.18468

Seite 15 von 23

Material and Inventory

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

MPL-MBV_81.docx

Version: 1.0.18468

Seite 16 von 23

4  Generating Batch Numbers

Usage

Material and Inventory

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

MPL-MBV_81.docx

Version: 1.0.18468

Seite 17 von 23

Material and Inventory

5  Batch Data Overview

Summary

Menu

Material management  Inventory management  Batch data overview

Transaction code

batov

Function authorization

batov

Usage

The  batch  data  overview  is  used  to  display  or  process  one  or  more  batches  depending  on  the  chosen

selection criteria entered.

Integration

The batch data overview shows all batches included in the data set that were  specified by the selection

criteria entered.

In  the  batch  data  overview,  the  selected  batches  can  be  displayed  in  their  current  status  together  with

detail information.

Selection criteria

The application provides the following selection criteria:

"Batch" category

Batch number

The batch number represents the batch ID used by the user. This can be:





for the input/output at terminal dialogs

for tracing or information search at the office client

When the configuration option "automatic generation of batch no. when creating batches"

is activated, a batch number will still only be assigned automatically as long as the batch

number field in the editing dialog box is left empty when a batch is added.

Material

Entering  the  material  number  as  a  selection  criterion  displays  all  batches  that  have  this  material

number.

Workplace

Entering the workplace as a selection criterion displays all batches that have been produced at this

workplace/machine.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 18 von 23

Material and Inventory

MES order number

MES order number (order/operation number) by which the batch has been produced.

Internal batch number

The batch number is a unique, system-wide batch identification number.

Material buffer

The individual batches are located in a specific material buffer. With this selection, all batches with

the selected material buffer are displayed.

Material type

The  individual  batches  or  materials  belong  to  a  material  type.  The  same  transport  and  handling

guidelines are used for these material types across the system. With this selection, all batches with

the selected material type are displayed.

Material category (type)

The  material  type  is  used  to  assign  batches  to  specific  classes/  groups.  With  this  selection,  all

batches with the selected material type are displayed.

Material designation

When the output batch is created on the shop floor stations, the material designation of the currently

registered order is used. Because no material master is managed, the material designation is saved

redundantly in the batch description.

Manufacturing date from / until

Date/period of the production of a batch

Consider long-term data

Archived data may be selected.

"Status" category

Batch class

The batch class describes the overall quality of the batch. With this selection, all batches matching

the selected batch class are displayed.

Batch status

The  batch  status  describes  the  technical  system  and  production  status  of  a  batch.  Selecting  the

batch status as a selection criterion displays all batches that have this status.

Quality status

The quality status "blocked" prevents a batch from being logged on. Selecting the quality status as

a selection criterion displays all batches that have this status.

Manual Q status

Selecting the manual Q status as a selection criterion displays all batches that have this status.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 19 von 23

Material and Inventory

Material status

The  material  status  indicates  a  logical  status  of  the  batch,  e.g.  packed,  tested.  Selecting  the

material status as a selection criterion displays all batches that have this status.

Transport status

The  transport  status  represents  the  technical  system  status  with  respect  to  transfer  postings  to

external  storage.  Selecting  the  transport  status  as  a  selection  criterion  displays  all  batches  that

have this status.

Advance logon flag

Restriction to batches logged on in advance.

"Attributes" category

Attribute (1 to 10)

The data displayed may be restricted to the batch attributes directly kept for the batch.

"Batch attributes" category

Batch attribute (designation)

The data displayed may be restricted to the batch attributes configured for the material type. There

are 40 text fields, 20 numeric fields and 20 decimal fields that may be configured altogether.

"Alternative batch numbers" category

Alternative batch number (1 to 20)

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  batches  that  currently

have this identifier.

"Reservation" category

Reserved for order

Entering or selecting the order number in the field displays all batches that were produced  for this

order/ OP.

Reserved for OP

Entering or selecting the order/OP number in the field displays all batches that were produced for

this order/ OP.

"Dates" category

Expiry date from / until

Date/period that indicates the shelf life of a batch

Availability date from / until

Date/period of the availability of a batch

Warning time

Warning date of a batch

MPL-MBV_81.docx

Version: 1.0.18468

Seite 20 von 23

Material and Inventory

"Miscellaneous" category

Serial number

Selecting a serial number as a selection criterion displays all batches for which this serial number is

entered in the serial number field.

Batch (LOT) number

Selecting the batch/lot number as a selection criterion displays all batches that currently have this

identifier.

Person

Selecting the person as a selection criterion displays all batches that have been  produced by this

person and, as a result, are currently assigned to this person (identifier).

Merged batch

Selecting  the  merged  batch  number  as  a  selection  criterion  displays  all  batches  for  which  the

merged batch number is entered in the merged batch field.

PPS batch

Selecting  the  PPS  batch  as  a  selection  criterion  displays  all  batches  for  which  the  PPS  batch

number is entered in the PPS batch field.

Editing functions

These functions are provided by the standard features for creating, editing, etc. to edit one or several data

records:

 Add batch

This function can be used to insert a new batch. Goods movements are not generated for the new

batch.

 Copy batch

This function can be used to copy a batch. However, the batch number for the new batch has to be

entered anew. Goods movements are not generated for the new batch.

  Edit batch

A  batch  can  be  edited  using  this  function.  But  neither  cancellations  nor  goods  movements  are

generated for the changed batch.

 Delete batch

This  function  can  be  used  to  delete  a  batch.  But  neither  cancellations  nor  goods movements  are

generated for the deleted batch.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 21 von 23

Material and Inventory

 Pool batches (new batch number)

Pooling/merging batches. A new batch number is generated for the new batch (merging batches).

When pooling merged batches, all individual batches are assigned to a new merged batch number.

 Pool batches (use existing batch numbers)

Pooling/merging batches. A batch number already included in the pool/merge is used  for the new

batch (merging batches).

When  pooling  merged  batches,  all  individual  batches  are  assigned  to  the  selected  merged  batch

number that is part of the pool.

 Split batch

A new batch is created by splitting it off from an existing batch (splitting batches). In this case, the

following options exist for the remaining target quantity of the original batch:

  Repost remaining quantity of batch to new batch

  Reduce existing batch to the remaining quantity

If a merged batch is split, the selected individual batches/serial numbers are transferred to a split off

batch.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original  merged

batch.

 Repost

This function can be used to repost a batch to another material buffer (Reposting batches).

 Generate

The function "enter goods receipt batch" is used to create batches manually (Generating batches).

This is necessary if material is delivered via the goods receipt, for example.

 Edit batch attribute

The batch attributes of the batch selected in the grid are shown in the tab “batch attributes”. Only

those batch attributes will be shown that have been assigned the indicator “show attribute on client”

within the configuration of batch attributes.

Provided  that  batch  attributes  are  shown,  they  can  be  edited  by  clicking  the  button  “edit  batch

attribute”.  The  field  types/field  lengths  specified  for  the  configuration  of  batch  attributes  are  not

checked.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 22 von 23

Material and Inventory

 Go to

 Graphic batch tracing

Starts the application Graphic batch tracing.

 Document management

Starts the document management

"Batch data overview" detail application

In  the  batch  data  overview  detail  application,  all  batches  are  displayed  according  to  the  selections

entered.

The  information  or  field  descriptions  of  the  selected  batches  and,  thus,  of  the  detail  application  are

described in the documents entitled batch object and batch structure.

MPL-MBV_81.docx

Version: 1.0.18468

Seite 23 von 23

