AIP Batch Splitting

1  AIP Batch Splitting

Summary

Some production processes (e.g. goods issue) require a batch (e.g. with large quantities) to be spilt into

several batches (e.g. with smaller quantities) to be able to provide materials in smaller bins/containers at

machines/workplaces. With this function the terminal provides an opportunity to separate batches and to

print a label for the new batches.

Usage

These split variants are possible:

o

"Simple" batches

When splitting "simple" batches, the user separates the required quantities from the original batch

and generates new batches for these split quantities.

o  Merged batches

Wen  splitting  merged  batches,  the  dialog  shows  the  individual  sub-batches/serial  numbers

assigned to the merged batch. The user selects the sub-batches/serial numbers he/she wants to

split off to generate a new merged batch.

Prerequisite

The relevant configuration has to be made to be able to use this function.

Terminal functions

The function is triggered manually by using the key of the "split batch" dialog (BATCH_SPLIT).

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog/start

The  dialog  opens  by  input  of  the  batch  number/merged  batch  number.  The  batch  information  on  the

batch/merged batch is shown.

AIP_Batch_Split.docx

Version: 1.0.1115

Page 1 of 6

AIP Batch Splitting

Splitting "simple" batches

Description of display fields:

  Batch number

Entered number of the batch that is to be split.

  Class

Batch class of the batch to be split.

  Remaining quantity

Remaining quantity of the batch to be split. At the beginning, it is the original quantity.

AIP_Batch_Split.docx

Version: 1.0.1115

Page 2 of 6

AIP Batch Splitting

  Quantity

Quantity to be split off. The user enters this quantity.

  Class

Batch class of the quantity to be split off. This can be:

o  Yield

o  Scrap

o  Rework

o  Open quantity

  Reason

Reasons for the selected batch class.

  Repost remaining quantity to new batch

The remaining quantity of the original batch is reposted to a new batch.

  Reduce batch to the remaining quantity

The original batch is reduced to the remaining quantity.

  Result list

The  result  list  shows  all  batches  split  off  including  the  respective  quantity,  batch  class  and

reason.

Function keys

  Function key "add"

The result list shows the entered quantity as separate entry (later the batch split off).

  Function key "remove"

The concerned row of the result list is selected and can be removed. The envisaged quantity is

not split off and assigned again to the original batch.

  Function key "split"

When using the function key, all entries of the result list are split off including the relevant quantity

from the entered batch.

  Function key "cancel"

This function key deletes all entries and the dialog is closed.

Procedure:

  The user opens the "split batch" dialog in the basic screen of the terminal

  The user selects the batch he/she wants to split off.

  Batch data of the entered batch is displayed.

  The user enters the split quantity, batch class and the reason, if necessary.

  The "add" function key adds the quantity and/or batch to be split off to the result list and displays

it.

  The user may split off additional batch quantities

AIP_Batch_Split.docx

Version: 1.0.1115

Page 3 of 6

AIP Batch Splitting

  The result list shows all quantities/batches to be split off

  The user decides if the remaining quantity of the original batch is to be reposted to a new batch

or if it is to remain with the original batch.

  The user closes the dialog by the "split" function key and the split quantities will be posted.

Splitting merged batches

Description of display fields:

  Batch number

Entered number of the merged batch that is to be split.

  Class

Batch class of the merged batch to be split.

  Remaining quantity

Remaining quantity of the merged batch to be split. At the beginning, it is the original quantity.

  Class

Batch class of the merged batches to be split off. This can be:

o  Yield

o  Scrap

o  Rework

o  Open quantity

  Reason

Reasons for the selected batch class.

  Display list

The  display  list  shows  all  sub-batches/serial  numbers  including  the  relevant  quantity  and  article

number  assigned  to  the  entered  merged  batch.  Individual  sub-batches/serial  numbers  are

selected and split off into a new merged batch.

Function keys

  Function key "reload"

The display list is updated.

  Function key "reverse"

The selected sub-batches/serial numbers are unselected.

  Function key "split"

The selected sub-batches/serial numbers are assigned to a new merged batch and removed from

the existing merged batch.

  Function key "cancel"

AIP_Batch_Split.docx

Version: 1.0.1115

Page 4 of 6

AIP Batch Splitting

The dialog is closed by this function key.

Procedure:

  The user opens the "split batch" dialog in the basic screen of the terminal.

  The user selects the batch he/she wants to split off.

  Batch data of the entered batch is displayed:

o  Material

o  Quantity

o  Class

o  Reason

o  Batch status



If it is a "merged batch" (indicator  at the batch), the result list shows the serial numbers/subordinate

batches assigned to this merged batch.

  The user chooses (multiple selection) the serial numbers/sub-batches he/she wants to split off into a

new merged batch.

  The  user  selects  the  class  for  the  new  merged  batch  (and  thus  for  the  newly  assigned  serial

numbers/sub-batches)

  The function key "split" generates the new merged batch with the split off serial numbers. The list of

serial numbers is reduced and additional merged batches may be generated and, as a result, serial

numbers can be split off.

  The remaining serial numbers/sub-batches remain with the original merged batch (existing number).

  Then the user closes the dialog.

Result

Result when splitting "simple" batches:

  A new batch is generated for the quantity split off.

  The batch quality depends on the selection made

  Subject  to  the  selected  quality  (yield/scrap),  the  batch  status  of  the  new  batch  is  -->

released/blocked

  The quantity of the old batch is reduced by the quantities split off. If the quantity is zero, the batch

status of the old batch is "processed".

  Other  data  of  split  batches,  such  as  the  material  number,  designation,  material  type,  storage

location, material buffer, PPS batch is taken over from the original batch.

  The split event is displayed in the batch history (old batch and new batches).

  The graphic/tabular overview shows which batches have been split off from a batch.

Result when splitting a merged batch:

AIP_Batch_Split.docx

Version: 1.0.1115

Page 5 of 6

AIP Batch Splitting

  The  new  merged  batch  is  generated  and  includes  all  sub-batches/serial  numbers  selected  for

splitting

  The quality is identical for the merged batch and sub-batches/serial numbers (as defined)

  The  quantity  included  in  the  new  merged  batch  is  the  total  quantity  of  all  sub-batches/serial

numbers

  Subject  to  the  selected  quality  (yield/scrap),  the  batch  status  of  the  new  merged  batch  and  the

sub-batches/serial numbers is --> released/blocked

  The old merged batch is no longer connected to the sub-batches/serial numbers split off

  The  quantity  of  the  original  merged  batch  has  been  reduced  by  the  quantity  of  the  sub-

batches/serial  numbers  split  off.  If  the  quantity  is  zero  and/or  if  there  are  no  longer  sub-

batches/serial numbers, the batch status of the old batch is "processed".

  Other  data  of  sub-batches/serial  numbers  and  the  new  merged  batch,  such  as  the  material

number,  designation,  material  type,  storage  location,  material  buffer,  PPS  batch  are  taken  over

from the original batch.

  The  split  event  is  displayed  in  the  batch  history  (old  merged  batch  and  new  merged  batches  +

serial number).

  The  graphic/tabular  overview  shows  which  merged  batches  have  been  split  off  from  a  merged

batch.

This dialog does not allow entering attributes/document links for individual serial numbers/sub-

batches pertaining to the merged batch.

AIP_Batch_Split.docx

Version: 1.0.1115

Page 6 of 6

