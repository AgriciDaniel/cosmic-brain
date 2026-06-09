Batch Data Overview

1  Batch data overview

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

The application  is only  available in the structure described  here  if  you  enable the modification

batovextensionselection.

If you do not use the modification, please refer to this Document.

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 1 of 6

Batch Data Overview

If  the  configuration  option  "automatic  generation  of  the  batch  number"  is  enabled,  leave

the  "batch  number"  field  empty  in  the  editing  dialog  when  you  add  a  new  batch.  The

system  will  only  assign  the  batch  number  automatically,  if  the  "batch  number"  field  is

empty.

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 2 of 6

Batch Data Overview

Historic batch entries

If you use the function historic batch entries and you also use throughput batch numbers or serial

numbers,  the  application  will  also  show  batches  with  the  status  "processed"  for  every  throughput

batch  number  or  serial  number.  Use  the  function  historic  batch  entries  to  get  further  process

information on a throughput batch number or serial number.

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 3 of 6

"Alternative batch numbers" category

Alternative batch number (1 to 20)

Select an alternative batch number as a selection criterion to display all batches that are assigned

Batch Data Overview

to this number.

"Reservation" category

Reserved for order

Enter or select the order number in this field to display all batches that were produced for this order/

OP.

Reserved for OP

Enter or select the order/OP number in this field to display all  batches that were produced for this

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 4 of 6

Editing functions

Use the following functions that are available  in addition to the standard features to edit one  or several

Batch Data Overview

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 5 of 6

If  you  split  a  collective  batch,  the  selected  individual  batches/serial  numbers  are  transferred  to  a

batch  split  off.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original

Batch Data Overview

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

MOC_BatchOverview.docx

Version: 2.2.18468

Page 6 of 6

