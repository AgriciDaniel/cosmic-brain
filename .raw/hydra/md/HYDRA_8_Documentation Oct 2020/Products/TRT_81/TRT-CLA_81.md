Manual

Batch Data Processing
TRT-CLA 8.1

Version 1.1.662

Last changed on: 19.06.2020

Batch Data Processing

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.
.

TRT-CLA_81.docx

Version: 1.1.18468

Page 2 of 18

Batch Data Processing

Contents

1  Batch Data Processing ................................................................................. 4

2  Attributes ...................................................................................................... 6

3  Split Batch .................................................................................................... 8

4  Merge Batches ........................................................................................... 11

5  1 Recording Goods Receipt Batch ............................................................. 14

6  1 Repost ..................................................................................................... 16

7  Applications provided in MOC: ................................................................... 18

TRT-CLA_81.docx

Version: 1.1.18468

Page 3 of 18

Batch Data Processing

1  Batch Data Processing

Overview

Possible fields of application

The  function  package  "Batch  Data  Processing"  provides  functions  to  collect  data  that  is  not  part  of  the

"batch"  object  in  relation  to  batches.  This  may  be  manually  collected  data  or  data  transferred  from  the

order/operation.

The  product/material  documentation  and  identification  function  in  production  is  supported  by  the  print

function by which label printing is triggered when batches are posted.

Functions to split and merge batches provide for physical material handling.

Implementation notes

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

Functions

  Batch attributes:

o  Collection of batch attributes

  Capture  of  additional,  industry-specific  information  on  the  batch  according  to

configuration

o  Configuration of attributes

TRT-CLA_81.docx

Version: 1.1.18468

Seite 4 von 18

Batch Data Processing

  Editing  function  to  define  material-specific  additional  information  for  the  batch

including transfer of characteristics from the order and control of display and print

performance

o  Transfer of batch attributes

  Automatic  transfer  of  order  and  operation  information  as  attribute  for  the  batch

according to configuration

o  Display of batch attributes

  Presentation of batch attributes in evaluations, reports and overviews

  Printing of batch labels:

o  Trigger for printing when batches are posted

  Trigger  of  label  printing  for  special  batches  or  batch-related  events  at  the  shop

floor terminal

o  Standard label

  Printing of a standard label with pre-configured layout, printing of batch numbers

as plain text and barcode in the Code39 format

o

Individual labels

Individual labels can only be designed if the Designer for labels and shop floor papers has been

purchased.

TRT-CLA_81.docx

Version: 1.1.18468

Seite 5 von 18

Batch Data Processing

2  Attributes

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 6 von 18

Field index

The field index is a key field. There are 40 text fields, 20 numerical fields and 20 decimal fields from

Batch Data Processing

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 7 von 18

Batch Data Processing

3  Split Batch

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 8 von 18

Batch Data Processing

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 9 von 18

Batch Data Processing

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 10 von 18

Batch Data Processing

4  Merge Batches

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 11 von 18

Batch Data Processing

Merge batches (use batch number involved)

The batch number of the selected batch is used for all of the merged batches.

Editing functions (of batch data overview)

The "batch data overview" dialog generally provides the following two functions to merge batches. They

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 12 von 18

Batch Data Processing

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 13 von 18

Batch Data Processing

5  1

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 14 von 18

Yield – The batch is created as yield with the batch status "Approved".

Scrap – The batch is created as yield with the batch status "Blocked".

Batch Data Processing

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 15 von 18

Batch Data Processing

6  1

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

TRT-CLA_81.docx

Version: 1.1.18468

Seite 16 von 18

Batch Data Processing

Batch class

Class of the batch (normally, yield/scrap)

Badge number

Badge number of the person that performs the reposting

TRT-CLA_81.docx

Version: 1.1.18468

Seite 17 von 18

Batch Data Processing

7  Applications provided in MOC:

Overview

Application

Documentation

Transaction
code

Function
authorization

Attributes

Split batch

Merge batch

MOC_BatchAttributes.pdf

batatt

batatt

MOC_SplitMESBatch.pdf

batch.split

batch.split

MOC_MergeMESBatch.pdf

batch.merge

batch.merge

Generate batch

MOC_BatchGenerate.pdf

batch.generate

batch.generate

Relocate/repost batch

MOC_RelocateMESBatch.pdf

batch.relocate

batch.relocate

TRT-CLA_81.docx

Version: 1.1.18468

Seite 18 von 18

