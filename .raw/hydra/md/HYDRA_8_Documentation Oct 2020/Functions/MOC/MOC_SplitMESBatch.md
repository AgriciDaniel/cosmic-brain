1  Split Batch

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

MOC_SplitMESBatch.docx

Version: 1.1.1362

Page 1 of 3

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

MOC_SplitMESBatch.docx

Version: 1.1.1362

Page 2 of 3

This function is only available if the modification batchsplitextension is enabled.

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

This function is only available if the modification batchsplitextension is enabled.

MOC_SplitMESBatch.docx

Version: 1.1.1362

Page 3 of 3

