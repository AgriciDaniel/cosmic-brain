Manual

SMA Posting Functions in
Material Management
SMA-MMG 8.2

Version 1.1.23049

Last changed on: 2 September 2020

                                                                      SMA Posting Functions in Material Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-MMG_82.docx

Version: 1.1.23049

Page 2 of 36

                                                                      SMA Posting Functions in Material Management

Contents

1  Material management .................................................................................. 5

General ......................................................................................................................... 5

Function calls ................................................................................................................ 5

2  Batch information ......................................................................................... 7

General ......................................................................................................................... 7

Selection criteria ............................................................................................................ 7

Fields 7

3  Generate batch ............................................................................................ 9

General ......................................................................................................................... 9

Fields 9

Buttons ........................................................................................................................ 10

 Generate batch ..................................................................................... 10

Result10

4  Repost batch .............................................................................................. 11

General ....................................................................................................................... 11

Fields 11

Buttons ........................................................................................................................ 11

 Repost batch ........................................................................................ 11

Result11

5  Stock overview ........................................................................................... 12

General ....................................................................................................................... 12

Selection criteria .......................................................................................................... 12

Fields 12

6  Assign batch ............................................................................................... 14

7  Complete transport unit .............................................................................. 16

8  Pack handling unit ...................................................................................... 18

SMA-MMG_82.docx

Version: 1.1.23049

Page 3 of 36

                                                                      SMA Posting Functions in Material Management

9  Unpack handling unit (all) ........................................................................... 20

10  Unpack handling unit (selected) ................................................................. 22

11  MPL and TRT collection functions ............................................................. 24

SMA-MMG_82.docx

Version: 1.1.23049

Page 4 of 36

                                                                      SMA Posting Functions in Material Management

1  Material management

General

App name

Material management

Short name of app

Material management

Function authorization

sma.materialman

The application material management provides the following functions:

  Batch information

  Repost Batch

  Generate batch

  Stock overview

  Pool batches

  Split batch

  Assign batch

  Unpack handling unit (selected)

  Unpack handling unit (all)

  Pack handling unit

Function calls

The application provides the following function calls:

Batch information

The  batch  information  shows  relevant  information  on  a  batch  (e.g.  material  number,  batch  class,

quantity).

Repost Batch

Use this function to repost a batch from one material buffer or storage location to another.

Generate batch

Use  this  function  to  generate  a  new  batch  and  store  information  about  the  batch.  HYDRA

automatically generates the batch number.

Stock overview

The stock overview provides an overview of the current storage locations. It specifies which batches

are currently stored in a selected material buffer or storage location. The stock overview also informs

about the current batch status.

SMA-MMG_82.docx

Version: 1.1.23049

Page 5 of 36

                                                                      SMA Posting Functions in Material Management

Pool batches

Use  the  function  call  Merge  batches  to  merge  several  batches  into  a  new  batch.  The  system

automatically assigns a new and unique batch number to the new batch.

Split batch

Use the function call  Split batch to split a batch into several individual batches. Depending on the

selected mode,

- the original batch is reduced by the split quantity or

- the remaining quantity of the original batch is posted to a new batch.

Assign batch

Use the function call Assign batch to add a batch to a transport unit at a packing station.

Unpack handling unit (selected)

Use the function call Unpack handling unit (selected) to unpack a batch that is included in a handling

unit.

Unpack handling unit (all)

Use the function call Unpack handling unit (all) to unpack all batches that are included in a handling

unit.

Pack handling unit

Use the function call Pack handling unit to pack a batch into a selected handling unit.

SMA-MMG_82.docx

Version: 1.1.23049

Page 6 of 36

                                                                      SMA Posting Functions in Material Management

2  Batch information

General

App name

Batch information

Short name of app

Batch info

Function authorization

sma.batchinfo

You can use the application batch information to view information about a batch used in HYDRA. You can

enter the batch number manually or by scanning.

Selection criteria

The application provides the following selection criteria:

Batch number

Enter the number of the batch whose information you want to view.

You can enter the batch number manually or by scanning.

Fields

Batch number

Shows the batch number entered manually or by scanning.

Material number

Shows the material number of the entered batch.

Description

Shows the batch name.

Batch class

Shows the batch class. By default, the following batch classes are possible:

  Yield

  Scrap

  Rework

  Open quantity

Quantity

Shows the current quantity of the entered batch.

SMA-MMG_82.docx

Version: 1.1.23049

Page 7 of 36

                                                                      SMA Posting Functions in Material Management

Batch status

Shows  the  current  batch  status  of  the  entered  batch.  By  default,  the  following  batch  statuses  are

possible:

  Free

  Blocked

  Running

  Processed

Manufacturing date

Shows the manufacturing  date  of the entered  batch.  The manufacturing date indicates the point in time

when the batch was generated.

Material buffer

Shows the material buffer of the entered batch or the buffer currently including the batch.

Machine

Shows the machine/workplace where the batch is logged on or where the batch was generated.

OP

Shows the operation to which the batch is logged on or where the batch was generated.

SMA-MMG_82.docx

Version: 1.1.23049

Page 8 of 36

                                                                      SMA Posting Functions in Material Management

3  Generate batch

App name

Generate batch

Short name of app

Generate batch

Function authorization

sma.createbatch

General

You can  generate a  batch  by starting the function  Generate batch. The system automatically  assigns a

distinct batch number. You can use the function for incoming goods, etc.

Fields

The function provides the following fields:

Material number

Shows the material number of the batch to be generated.

Material type

Shows the material type of the batch to be generated. You can enter the material type or choose it

from the selection menu.

Quantity

Shows the quantity of the batch to be generated.

Unit

Shows the quantity unit of the batch to be generated.

Material buffer

Shows the material buffer that should include the generated batch.

Batch class

Shows the batch class of the batch to be generated. You can assign the following batch classes:

  Yield

  Scrap

  Rework

  Open quantity

Reason

Shows the reason configured in HYDRA for each batch class. You can enter the appropriate scrap

reason for the batch class scrap. You can enter the reason manually or choose it from the selection

menu.

SMA-MMG_82.docx

Version: 1.1.23049

Page 9 of 36

                                                                      SMA Posting Functions in Material Management

Transport unit

Shows the transport unit of the batch to be generated. You can enter the transport unit manually or

choose it from the selection menu.

Staff badge number

You have to enter your staff badge number in order to execute the function.

Buttons

Result

Generate batch

Do not generate batch

The  system  issues  the  following  message,  once  the  batch  has  been  generated  successfully:

"Ok! Batch xxx has been generated."

SMA-MMG_82.docx

Version: 1.1.23049

Page 10 of 36

                                                                      SMA Posting Functions in Material Management

4  Repost batch

App name

Repost batch

Short name of app

Repost batch

Function authorization

sma.repostbatch

General

The  function  repost  batch  allows  you  to  repost  a  batch  from  one  material  buffer  or  storage  location  to

another.

Fields

The function provides the following fields:

Batch number

Enter the number of the batch whose information you want to view.

You can enter the batch number manually or by scanning.

Target buffer

Material buffer where the batch is transferred to. You can enter the target buffer manually or via the

search screen.

Comment

You can add a brief comment about reposting and store it with the batch.

Staff badge number

You have to enter your staff badge number in order to execute the function.

Buttons

Result

Repost batch

Do not repost batch

The  system

issues

the

following  message,  once

the  batch  has  been  reposted  successfully:

"Ok! Batch xxx has been reposted."

SMA-MMG_82.docx

Version: 1.1.23049

Page 11 of 36

                                                                      SMA Posting Functions in Material Management

5  Stock overview

General

App name

Stock overview

Short name of app

Stock overview

Function authorization

sma.stockview

You can use the application stock overview to gain insight into the material available in material buffers.

Different statuses classify the material available in material buffers. You are informed about:

  The amount of material you can use

  The amount of material that still needs to be checked in the buffer.

  The amount of material in a buffer. The amount of blocked and unusable material.

Selection criteria

Material buffer

The  size  of  the  used  device  specifies  how  material  buffers  are  aligned  (responsive  design).  Small

devices  (e.g.  smartphones)  show  material  buffers  as  tabs  above  the  evaluation  list.  Otherwise,

material buffers are listed at the left margin of the application. If you select the required material buffer,

all pieces of information (e.g. material, quantity, status) are shown.

Fields

Material number

The field material includes the material number of the material available in the material buffer.

Quantity

The field quantity shows the total amount of material included in the material buffer sorted by material

number and batch status.

Batch status

The stock overview uses the following status categories and icons to indicate available material:

  processed, deleted, completed, blocked, expired

SMA-MMG_82.docx

Version: 1.1.23049

Page 12 of 36

                                                                      SMA Posting Functions in Material Management

  delivered, running, minimum storage period, returned, advised material, transport

Inspection

  Free

You can summarize batches based on their material number and status category. The current batch status

is shown, once you've clicked the status category (icon).

SMA-MMG_82.docx

Version: 1.1.23049

Page 13 of 36

                                                                      SMA Posting Functions in Material Management

6  Assign batch

Overview

App name

Assign batch

Short name of app

Assign batch

Function authorization

sma.ceanpa

You can use the function call Assign batch to add a batch to a transport unit at a packing station.

Requirements

The

requirements

for

the  use  of  packing

functionalities  are

included

in

the  document

Activating_Palletizing_Packaging.pdf.

Fields

The function Assign batch provides the following fields:

Workplace

In the field Workplace, enter the number of the workplace where you pack the handling unit.

Operation

Once you have selected a workplace, you can use the search help to display the list of logged on

operations. Use the search help to select an operation.

Transport unit

Once  you  have  selected  an  operation,  the  transport  unit  currently  logged  on  to  this  operation  is

transferred into the field Transport unit.

Batch number

In the field Batch number, enter the batch number that you want to pack into the transport unit.

Number of batches

The field Number of batches shows the number of batches that are currently packed into the transport

unit.

Total quantity

The field Total quantity shows the total quantity of batches in the transport unit.

Staff badge number

To add or to remove a batch to or from a transport unit, you must enter a valid staff badge number.

SMA-MMG_82.docx

Version: 1.1.23049

Page 14 of 36

                                                                      SMA Posting Functions in Material Management

Tables

Lots

If you have selected a workplace and an operation, and if batches exist in the currently logged on

transport unit, the following batch data is displayed:

  Batch number

  Article

  Quantity

  Time

  Article name

Buttons

Add

If a batch is entered in the field Batch number, the system packs the batch into the transport unit if

you click the button Add.

Remove

If you have selected a batch in the table and entered a valid staff badge number, the system removes

the selected batch from the current transport unit.

Complete transport unit

Click the button Complete transport unit to open the function call Complete transport unit. Use the

function call Complete transport unit to complete the transport unit.

SMA-MMG_82.docx

Version: 1.1.23049

Page 15 of 36

                                                                      SMA Posting Functions in Material Management

7  Complete transport unit

Overview

App name

Complete transport unit

Short name of app

Complete transport unit

Function authorization

sma.cawlpa

You can use the function call Complete transport unit to complete a transport unit at a packing station.

You cannot call  the function  Complete transport unit from the category material  management.

You call the function Complete transport unit using the function call Assign batch.

Fields

The function call Complete transport unit provides the following fields:

Workplace

When you call the function Complete transport unit, the system takes over the respective workplace

number. This number is entered in the field Workplace.

MES order number

Use the search help to select an order. You then complete the transport unit for this order.

Article

If you have selected an MES order number, the field Article shows the article of the operation.

New HU

If you have selected an MES order number, the field New HU shows the new number of the transport

unit (handling unit).

Currently logged in batch

If you have selected an MES order number, the field Currently logged in batch shows the number of

the currently logged on transport unit.

Target buffer

In the field Target buffer, enter the material buffer where the transport unit will be stored when you

complete the function call.

Batch class

In the field Batch class, you specify the batch class that the transport unit will have when you complete

the function call.

SMA-MMG_82.docx

Version: 1.1.23049

Page 16 of 36

                                                                      SMA Posting Functions in Material Management

Transport unit

In the field Transport unit, you specify the type of transport unit.

Number of batches

If you have selected an MES order number, the field Number of batches shows the number of batches

that are currently included in the transport unit.

Status

In  the  field  Status,  you  specify  the  status  that  the  transport  unit  will  have  when  you  complete  the

function call.

Tare weight (KG)

In the field Tare weight (KG), you enter the tare weight of the transport unit.

Net weight (KG)

In the field Net weight (KG), you enter the net weight of the transport unit.

Gross weight

The system calculates the value in the field Gross weight using the values entered in the fields Tare

weight (KG) and Net weight (KG). The sum total of the values specified is entered in the field Gross

weight.

Reason

If the batch class is not G (yield), you can enter a reason in the field Reason and specify why the

batch class is different.

Buttons

Cancel

The function call is closed without any further action.

Generate HU

The transport unit (handling unit) is completed and a new transport unit is generated for the selected

MES order number.

SMA-MMG_82.docx

Version: 1.1.23049

Page 17 of 36

                                                                      SMA Posting Functions in Material Management

8  Pack handling unit

Overview

App name

Pack handling unit

Short name of app

Pack handling unit

Function authorization

sma.ceanpack

You can use the function call Pack handling unit to pack a batch into a selected handling unit.

Fields

The function call Pack handling unit provides the following fields:

Workplace

In the field Workplace, enter the number of the workplace where you pack the handling unit.

Handling unit

In the field Handling unit,  enter the  number of the handling unit that  you  want to use to include a

batch. The number of the handling unit is not assigned automatically.

Batch

In the field Batch, enter the batch number of the batch that you want to pack into the handling unit.

Tables

Header data

If you have entered the number of a handling unit in the field  Handling unit, the table Header data

shows the following handling unit data:

  Article

  Total quantity

  Person

  Order

  Packing date

  Packing time

Detail data

If  you  have  entered  the  number  of  a  handling  unit  in  the  field  Handling  unit,  the  table  Detail  data

shows the following data for batches that are included in the handling unit:

SMA-MMG_82.docx

Version: 1.1.23049

Page 18 of 36

                                                                      SMA Posting Functions in Material Management

  Batch



Internal batch number

  Article

  Quantity

  Current status

Buttons

Cancel

The function call is closed without any further action.

Pack handling unit

The batch specified in the field Batch is packed into the handling unit specified in the field Handling

unit.

SMA-MMG_82.docx

Version: 1.1.23049

Page 19 of 36

                                                                      SMA Posting Functions in Material Management

9  Unpack handling unit (all)

Overview

App name

Unpack handling unit (all)

Short name of app

Unpack handling unit (all)

Function authorization

sma.cedelpa

You can use the function call Unpack handling unit (all) to unpack all batches that are included in a handling

unit.

Fields

The function call Unpack handling unit (all) provides the following fields:

Handling unit

In the field Handling unit, enter the number of the handling unit that you want to unpack. All batches

included in the specified handling unit are unpacked.

Tables

Header data

If you have entered the number of a handling unit in the field  Handling unit, the table Header data

shows the following data for the handling unit:

  Article

  Total quantity

  Person

  Order

  Packing date

  Packing time

Detail data

If  you  have  entered  the  number  of  a  handling  unit  in  the  field  Handling  unit,  the  table  Detail  data

shows the following data for batches that are included in the handling unit:

  Batch



Internal batch number

  Article

  Quantity

SMA-MMG_82.docx

Version: 1.1.23049

Page 20 of 36

                                                                      SMA Posting Functions in Material Management

  Current status

Buttons

Cancel

The function call is closed without any further action.

Unpack all

All batches included in the handling unit are unpacked.

SMA-MMG_82.docx

Version: 1.1.23049

Page 21 of 36

                                                                      SMA Posting Functions in Material Management

10 Unpack handling unit (selected)

Overview

App name

Unpack handling unit (selected)

Short name of app

Unpack handling unit (selected)

Function authorization

sma.cedelpa

You  can  use  the  function  call  Unpack  handling  unit  (selected)  to  unpack  a  batch  that  is  included  in  a

handling unit.

Fields

The function call Unpack handling unit (selected) provides the following fields:

Handling unit

In the field Handling unit, enter the number of the handling unit that includes the batch that you want

to unpack.

Tables

Header data

If you have entered the number of a handling unit in the field  Handling unit, the table Header data

shows the following data for the handling unit:

  Article

  Total quantity

  Person

  Order

  Packing date

  Packing time

Detail data

If  you  have  entered  the  number  of  a  handling  unit  in  the  field  Handling  unit,  the  table  Detail  data

shows the following data for batches that are included in the handling unit:

  Batch



Internal batch number

  Article

SMA-MMG_82.docx

Version: 1.1.23049

Page 22 of 36

                                                                      SMA Posting Functions in Material Management

  Quantity

  Current status

In the table Header data, select the batch number of the batch that you want to unpack .

Buttons

Cancel

The function call is closed without any further action.

Unpack all

The selected batch is unpacked from the handling unit.

SMA-MMG_82.docx

Version: 1.1.23049

Page 23 of 36

                                                                      SMA Posting Functions in Material Management

11 MPL and TRT collection functions

Overview

This document describes the MPL and TRT posting functions of the SMA application Data collection.

If you use the MPL and TRT functions in the function group Order, additional input fields are available in

the following posting functions:

  Log operation on

  Log operation off



Interrupt operation

The function group Material provides the following posting functions:

  Log input batch on

  Log input batch off

  Log on input batch in advance

  Log off reserved batch

  Change output batch

SMA-MMG_82.docx

Version: 1.1.23049

Page 24 of 36

                                                                      SMA Posting Functions in Material Management

Log operation on

Function authorization

sma.logon

Use the dialog Log operation on to log an operation on to the workplace selected in the list on the left.

If you call the function, an intermediate dialog opens. The dialog displays the operations planned for the

workplace. To display the operations, the application refers to the option Sequencing list in the Workplace

configuration. Select the required operation to open the input dialog.

If the operation requires batch management, the following fields are displayed.

Input fields

Workplace

The system enters the selected workplace.

MES order number

The system enters the MES order number of the operation that you have selected in the intermediate

dialog that opened on calling the function.

Components

In the field Components, enter the BOM item of the selected component.

Input batch

In the field Input batch, enter the batch number of the input batch you want to log on.

Status

Enter the workplace/machine status manually or select a status from the list that you can open using

the magnifier symbol.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log on

The  button  Log  on  logs  the  operation  on  to  the  workplace.  During  operation  logon,  the  standard

validation checks of HYDRA are performed.

If the processing of the staff badge number is enabled, the validation check also includes personal

data.

SMA-MMG_82.docx

Version: 1.1.23049

Page 25 of 36

                                                                      SMA Posting Functions in Material Management

The  person  who  logs  on  the  operation  is  not  automatically  logged  on  with  the

operation. You can configure that the person who logs on the operation is logged

on with the operation. To do so, assign the function authorization sma.logonwpers

to the person.

In  case  of  operations  that  require  batch  management,  you  can  only  log  on  one

component  during  OP  logon.  If  other  components  exist,  you  must  logon  these

components using the function Log input batch on.

SMA-MMG_82.docx

Version: 1.1.23049

Page 26 of 36

                                                                      SMA Posting Functions in Material Management

Log operation off

Function authorization

sma.logoff

Use the dialog Log operation off to log a logged on operation off from the currently selected workplace.

If the operation requires batch management, the following fields are displayed.

Input fields

Workplace

The system enters the selected workplace.

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

Material

The material number of the currently logged on output batch is displayed.

Currently logged on batch

The batch number of the currently logged on output batch is displayed.

Target buffer

This is the material buffer for the posting of the produced output batch. The search help provides a

list of the material buffers.

Transport unit

Transport unit of the produced output batch. The search help provides a list of transport units.

Info on batch

You can enter a comment on the currently logged on output batch in the input field Info on batch.

Batch class

Here, the user can display a list of possible batch statuses for the output batch. The user can select

the batch status from the list.

Yield

Input field for the produced yield in the primary quantity unit of the operation.

Scrap

Input field for the produced scrap in the primary quantity unit of the operation.

SMA-MMG_82.docx

Version: 1.1.23049

Page 27 of 36

                                                                      SMA Posting Functions in Material Management

The system can only support the input of yield OR scrap. If you enter values in both fields, this

can lead to processing problems.

Reason

Enter a scrap reason. The predefined value in this field is 0.

You can only enter a scrap reason that has previously been configured. The search function provides

a selection. If you empty the field, the scrap is recorded without scrap reason.

Status

Here, the user can display a list of available machine statuses. The user can select a new status from

the list.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log off

The  button  Log  off  logs  the  operation  off.  During  logoff,  the  standard  validation  checks  might  be

performed (e.g. check for over/underdelivery).

If processing of the staff badge number is enabled, the validation check also includes personal data.

SMA-MMG_82.docx

Version: 1.1.23049

Page 28 of 36

                                                                      SMA Posting Functions in Material Management

Interrupt operation

Function authorization

sma.interrupt

Use the dialog Interrupt operation to interrupt a logged on operation at the currently selected workplace.

If the operation requires batch management, the following fields are displayed.

Workplace

The system enters the selected workplace.

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

Material

The material number of the currently logged on output batch is displayed.

Currently logged on batch

The batch number of the currently logged on output batch is displayed.

Target buffer

This is the material buffer for the posting of the produced output batch. The search help provides a

list of the material buffers.

Transport unit

Transport unit of the produced output batch. The search help provides a list of transport units.

Info on batch

You can enter a comment on the currently logged on output batch in the input field Info on batch.

Batch class

You can display a list of possible batch statuses for the output batch. Select the batch status from

the list.

Yield

Input field for the produced yield in the primary quantity unit of the operation.

Scrap

Input field for the produced scrap in the primary quantity unit of the operation.

The system can only support the input of yield OR scrap. If you enter values in both fields, this

can lead to processing problems.

SMA-MMG_82.docx

Version: 1.1.23049

Page 29 of 36

                                                                      SMA Posting Functions in Material Management

Reason

Enter a scrap reason. The predefined value in this field is 0.

You can only enter a scrap reason that has previously been configured. The search function provides

a selection. If you empty the field, the scrap is recorded without scrap reason.

Status

You can display a list of possible statuses for the machine. Select the new status from the list.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Interrupt

This button interrupts the operation. The standard validation checks might be performed (e.g. check

for overdelivery).

If processing of the staff badge number is enabled, the validation check also includes personal data.

SMA-MMG_82.docx

Version: 1.1.23049

Page 30 of 36

                                                                      SMA Posting Functions in Material Management

Log input batch on

Function authorization

sma.cean

You  use  the  posting  dialog  Log  input  batch  on  to  log  on  an  input  batch  to  a  BOM  item  of  the  current

operation.

If you call the function, an intermediate dialog opens. This intermediate dialog shows the component list of

the operation. Enter a batch number to log the input batch on to a selected BOM item.

Input fields

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

Input batch

In the field Input batch, enter the batch number of the input batch you want to log on.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log on

The input batch is logged on to a BOM item of the component list.

SMA-MMG_82.docx

Version: 1.1.23049

Page 31 of 36

                                                                      SMA Posting Functions in Material Management

Log input batch off

Function authorization

sma.ceab

You use the posting dialog Log input batch off to log off an input batch from a current operation.

If you call the function, an intermediate dialog opens. This intermediate dialog shows the component list of

the operation. Select an entry in the component list to specify the input batch that you want to log off.

Input fields

Input batch

In the field Input batch, enter the batch number of the input batch you want to log off.

Batch status

In the field Batch status, specify the batch status that the input batch will have after logoff. You can

directly enter the batch status or select a status using the search help.

Consumption

In the field Consumption, enter the consumption of the input batch that you want to log off.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log off

The selected input batch is logged off

SMA-MMG_82.docx

Version: 1.1.23049

Page 32 of 36

                                                                      SMA Posting Functions in Material Management

Log on input batch in advance

Function authorization

sma.cevan

You use the posting dialog Log on input batch in advance to log on an input batch for a current operation

in advance. Using this advance logon, the input batch logged on in advance is automatically logged on to

the respective BOM item if the input batch changes.

If you call the function, an intermediate dialog opens. This intermediate dialog shows the component list of

the current operation. Select an entry in the component list to log on the input batch in advance to this BOM

item.

Input fields

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

Input batch

In the field Input batch, enter the batch number of the input batch you want to log on in advance.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log on in advance

The selected input batch is logged on in advance.

SMA-MMG_82.docx

Version: 1.1.23049

Page 33 of 36

                                                                      SMA Posting Functions in Material Management

Log off reserved batch

Function authorization

sma.cevab

You use the posting dialog Log off reserved batch to log off an input batch from a current operation that

has been logged on in advance/reserved.

If you call the function, an intermediate dialog opens. This intermediate dialog shows the component list of

the  current  operation.  Select  an  entry  in  the  component  list  to  log  off  the  input  batch  logged  on  in

advance/reserved.

Input fields

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you  can  select a different MES order number using a

search help.

Input batch

In the field Input batch, enter the batch number of the batch you want to log off.

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Log off

The selected input batch, which has been logged on in advance, is logged off

SMA-MMG_82.docx

Version: 1.1.23049

Page 34 of 36

                                                                      SMA Posting Functions in Material Management

Output batch change

Function authorization

sma.cawl

You use the posting dialog Output batch change to change the output batch for a current operation.

Display fields

Workplace

The system enters the selected workplace.

MES order number

The system enters the MES order number of the operation logged on to the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

New batch

The field New batch displays the batch number of the next output batch.

Material

This field displays the material number of the output batch.

Input fields

MES order number

The system enters the MES order number of the operation logged on to  the workplace. If several

operations are  logged on to the  workplace,  you can  select a different MES order number using a

search help.

Target buffer

This is the material buffer for the posting of the produced output batch.

Batch class

A list of possible batch statuses for the output batch is displayed. Select the batch status from the

list.

Quantity

Input field to enter the produced quantity of the output batch.

Reason

In field Reason, you can enter a scrap reason with batch class = A. A list of possible scrap reasons

is displayed. Select the scrap reason from the list.

SMA-MMG_82.docx

Version: 1.1.23049

Page 35 of 36

                                                                      SMA Posting Functions in Material Management

Buttons

Cancel

The button Cancel closes the dialogue without any further action.

Change Output Batch

The output batch is changed.

SMA-MMG_82.docx

Version: 1.1.23049

Page 36 of 36

