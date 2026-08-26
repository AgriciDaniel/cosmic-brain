Merging Batches

1  Merging Batches

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

The function is only available if the modification batch_merge is enabled.

  Merge batches at MOC

The MOC batch data overview provides a function to merge the entered batches/merged batches

into a new batch/merged batch.

MBL_BatchMerge.docx

Version: 1.0.18468

Page 1 of 2

The  group  merged  batches

function

is  only  available

if

the  modification

batchmergeextension is enabled.

Merging Batches

Result

The below-mentioned results can be expected after merging batches at AIP or MOC:

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

MBL_BatchMerge.docx

Version: 1.0.18468

Page 2 of 2

