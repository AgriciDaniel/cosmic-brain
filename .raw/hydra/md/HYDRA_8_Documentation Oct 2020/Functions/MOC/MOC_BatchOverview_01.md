Batch Data Overview

1  Batch Data Overview

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

The batch data overview shows all batches included in the data set that were specified by the selection

criteria entered.

In  the  batch  data  overview,  the  selected  batches  can  be  displayed  in  their  current  status  together  with

detail information.

Selection criteria

The following selection criteria are available in the application:

"Batch" category

Batch number

The batch number is a unique, system-wide batch identification number.

When the configuration option "automatic generation of batch no. when creating batches"

is activated, a batch number will still only be assigned automatically as long as the batch

number field in the editing dialog box is left empty when a batch is added.

Material buffer

The

individual

batches

are

located

in

a

specific

material

buffer\\archive\mast_ind\Functions\MOC\MOC_MasterDataMaterialBuffer.pdf.  With  this  selection,

all batches with the selected material buffer are displayed.

Material type

The  individual  batches  or  materials  belong  to  a  material  type.  The  same  transport  and  handling

guidelines are used for these material types across the system. With this selection, all batches with

the selected material type are displayed.

MOC_BatchOverview_01.docx

Version: 1.6.18468

Page 1 of 5

Batch Data Overview

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

Material status

The  material  status  indicates  a  logical  status  of  the  batch,  e.g.  packed,  tested.  Selecting  the

material status as a selection criterion displays all batches that have this status.

Transport status

The  transport  status  represents  the  technical  system  status  with  respect  to  transfer  postings  to

external  storage.  Selecting  the  transport  status  as  a  selection  criterion  displays  all  batches  that

have this status.

Advance logon flag

Restriction to batches logged on in advance.

"Material" category

Material

Entering  the  material  number  as  a  selection  criterion  displays  all  batches  that  have  this  material

number.

Material designation

When the output batch is created on the shop floor stations, the material designation of the currently

registered order is used. Because no material master is managed, the material designation is saved

redundantly in the batch description.

Material category (type)

The  material  type  is  used  to  assign  batches  to  specific  classes/  groups.  With  this  selection,  all

batches with the selected material type are displayed.

MOC_BatchOverview_01.docx

Version: 1.6.18468

Page 2 of 5

Batch Data Overview

"Reservation" category

Reserved for order

Entering or selecting the order number in the field displays all batches that were produced for this

order/ OP.

Reserved for OP

Entering or selecting the order/OP number in the field displays all batches that were produced for

this order/ OP.

"Dates" category

Manufacturing date

Date of the production of a batch

Availability date

Date of the availability of a batch

Expiration date

Date that indicates the shelf life of a batch

Warning time

Warning date of a batch

"Alternative batch numbers" category

Alternative batch number (1 to 20)

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  batches  that  currently

have this identifier.

"Attributes" category

Attribute (1 to 6)

The data displayed may be restricted to the batch attributes directly kept for the batch.

"Miscellaneous" category

Serial number

Selecting a serial number as a selection criterion displays all batches for which this serial number is

entered in the serial number field.

Batch (LOT) number

Selecting the batch/lot number as a selection criterion  displays all batches that currently have this

identifier.

MOC_BatchOverview_01.docx

Version: 1.6.18468

Page 3 of 5

Batch Data Overview

Person

Selecting the person as a selection criterion displays all batches that have been produced by this

person and, as a result, are currently assigned to this person (identifier).

Merged batch

Selecting  the  merged  batch  number  as  a  selection  criterion  displays  all  batches  for  which  the

merged batch number is entered in the merged batch field.

PPS batch

Selecting  the  PPS  batch  as  a  selection  criterion  displays  all  batches  for  which  the  PPS  batch

number is entered in the PPS batch field.

"Throughput batch number" category

Throughput batch number

Throughput batch number of the batch (external batch number).

Historic throughput batch entries

If this option is enabled, previous entries relating to the throughput batch will be shown as well.

Editing functions

These functions are provided by the standard features for creating, editing, etc. to edit one or several data

records:

 Pool batches (new batch number)

Pool batches. A new batch number is generated for the new batch (merge batches).

 Pool batches (use existing batch numbers)

Pool batches. A batch number contained in the pool is used for the new batch (merge batches).

 Split batch

A  new  batch  is  created  by  splitting  it  from  an  existing  batch  (split  batches).  In  this  case,  the

following options exist for the remaining target quantity of the original batch:

  Repost remaining quantity of batch to new batch

  Reduce existing batch to the remaining quantity

 Repost

This function can be used to repost a batch to another material buffer (repost batch).

MOC_BatchOverview_01.docx

Version: 1.6.18468

Page 4 of 5

Batch Data Overview

 Generate

The function "enter goods receipt batch" is used to create batches manually (generate batch). This

is necessary if material is delivered via the goods receipt, for example.

 Edit batch attribute

The batch attributes of the batch selected in the grid are shown in the tab “batch attributes”. Only

those batch attributes will be shown that have been assigned the indicator “show attribute on client”

within the configuration of batch attributes.

Provided  that  batch  attributes  are  shown,  they  can  be  edited  by  clicking  the  button  “edit  batch

attribute”.  The  field  types/field  lengths  specified  for  the  configuration  of  batch  attributes  are  not

checked.

Go to

 Graphic batch tracing

Starts the application graphic batch tracing.

"Batch data overview" detail application

In  the  batch  data  overview  detail  application,  all  batches  are  displayed  according  to  the  selections

entered.

The  information  or  field  descriptions  of  the  selected  batches  and,  thus,  of  the  detail  application  are

described in the documents entitled batch object and batch structure.

MOC_BatchOverview_01.docx

Version: 1.6.18468

Page 5 of 5

