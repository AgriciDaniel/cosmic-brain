Splitting Batches

1  Splitting Batches

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

The function is only available if the modification batch_split is enabled.

  Splitting batches at MOC

The MOC batch data overview provides a function to split the entered batches/merged batches

into several new batches/merged batches.

The  "split  merged  batches"  function  is  only  available  if  the  modification  batchsplitextension  is

enabled.

MBL_BatchSplit.docx

Version: 1.0.18468

Page 1 of 2

Splitting Batches

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

MBL_BatchSplit.docx

Version: 1.0.18468

Page 2 of 2

