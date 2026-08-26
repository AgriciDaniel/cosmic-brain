Variants of Batch Grouping

1  Variants of Batch Grouping

Summary

Batches are grouped and/or combined due to different situations:

  Not relevant to the process

It is assumed here that the identified material only switches positions and this movement

is  irrelevant  to  batch  tracing  (e.g.  picking  or  transfer  posting  of  batches  to  a  group  and

provision for production).

  Relevant to the process

This function facilitates posting processes allowing to log on many input batches at once

to  a  machine/OP,  guide  them  through  the  process  and  to  repost  them  afterwards  to

produced output batches for traceability purposes.

Variants

In general, there are the following two variants to group batches.





Illustration: irrelevant to process --> generate/cancel batch group

Illustration: relevant to process --> batch grouping

Generate/cancel group batch (not relevant to process)

General

The  function  is  used  every  time  when  it  is  necessary  to  combine  batches  of  different  or  identical

materials, which is to be resolved/canceled at a later point in time providing the batches "unaffected".

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 1 of 6

Variants of Batch Grouping

Prerequisites, restrictions

  Original batches remain and are not "consumed" by grouping.

  During  grouping,  original  batches  cannot  be  processed  or,  for  example,  archived  somewhere

else.

  No OP is required - groupings may be performed at any point in time.

  Batches may still be removed unless the grouping has been created finally.

  A label can be printed for the generated grouping.

  Groupings may only be cancelled altogether. Individual batches cannot be removed.

  All group members are affected if the grouping is reposted (change of material buffer).

  Tracing does not consider the grouping.

AIP procedure

There are two steps:

  Generate group batch

  Cancel group batch

Results

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 2 of 6

Variants of Batch Grouping

The following results can be expected after generating the batch group:

  Batch characteristics

o

Individual batches still keep their material number, material type, material buffer, etc.

  Batch status

o  Once the "generate group batch" function has been executed, the single batches are in

the "running" status. The group batch is assigned the "running" status.

  Goods movements

o  No goods movements are posted for the single batches or the group batch.

  Traceability

o  The group of batches is not relevant to tracing.

  History

o  The group of batches is documented in the history of individual batches.

The following results can be expected after canceling the batch group:

  Batch characteristics

o

Individual batches still keep their material number, material type, material buffer, etc.

o  The  group  batch  has  taken  over  the  following  values  from  a  "system  batch"  (copy

template):

  Material number

  Material type

  Material buffer

o  The quantity of the group batch is the total amount of all assigned individual batches and,

therefore, is assigned the unit "PCE/pieces".

  Batch status

o  Once the "cancel group batch" function has been executed, the single batches are in the

"free"  status.  The  group  batch  is  assigned  the  "processed"  status.  The  "grouping"  no

longer exists.

  Goods movements

o  No goods movements are posted for the single batches or the group batch.

  Traceability

o  Cancelling group batches is not relevant to traceability.

  History

o  Cancelling the group batches is documented in the history of individual batches.

Batch grouping (relevant to process)

General

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 3 of 6

The function is used every time when batches of different or identical materials are used in a process and

output batches are finally changed for all ingoing batches at a point in time.

Variants of Batch Grouping

Prerequisites, restrictions

  This function can only be  used if grouping  is directly performed "within the  process". Groupings

cannot be performed beforehand as part of a preceding picking process.

  The machine has not been configured as MPL machine.



Input batches are "consumed" by grouping.

  During grouping, input batches cannot be processed or, for example, archived somewhere else.

  Operations are required: an OP appropriate for processing is searched via the order network or

by reservations affecting all orders.

AIP procedure

The AIP procedure is described here.

Results/ processing

The "batch grouping" dialog (U_GROUPING) provides several functions.

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 4 of 6

Variants of Batch Grouping

  Add batch, start OP: CNRGRP.ADD

  Remove batch from list: CNRGRP.REMOVE:

  Complete group: CNRGRP.UNLOAD:

After executing the single functions, processing is performed in the dialog U_GROUPING.

Add batch/ start OP (CNRGRP.ADD)

This function adds the entered batch. To do so, the OP for the batch is logged on to the machine.

Inspections:

  General batch inspection:

o  The batch is available

o  The batch has the status "free"

  Automatic search for the operation matching the entered batch

o  OP is searched via the order network and batch assignment

  The batch was generated in an OP, which is provided as piece of information for

the  batch.  Due  to  the  order  network,  the  system  knows  the  next  OP  to  be

processed  within  the  order.  The  appropriate  OP  can  be  found  by  the  order

network.

o

If no OP is found via the network, it is searched using batch reservations.

  An error message appears if no OP is found.



If  an  OP  is  found,  it  will  only  be  started,  unless  it  is  already  running  at  the

machine.

  Further inspections:

o  Checking if the OP is planned for the machine and/or machine group.

o  Checking if the batch is reserved for another OP.

o  Checking if the batch can be logged on to the component.

  An error message occurs if no component is found.

  The component must be identical to the material number of the batch, otherwise

an error message occurs.

  An error message appears if the admissible number of OPs running at the machine is exceeded.

  Start OP:

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 5 of 6

Variants of Batch Grouping

o  The OP is started and set to the "running" status.

o  The batch is reserved for the OP.

Remove batch (CNRGRP.REMOVE):

This function is used to cancel the reservation of the OP at the batch.

Inspections:

  The batch is available. Otherwise, an error message occurs.

Unload batch group (CNRGRP.UNLOAD):

This function is used to log on the reserved batches.

Inspections:

  Are there any running OPs including reserved batches at the machine?

Posting:

  Determination of all reserved batches

  Log output batch and input batch on.

o  At first generate a new batch number for the output batch

o  The new output batch is logged on with the reserved input batch.

  Log off output batch and input batch

o  The input batch is logged off

o  The output batch is logged off

o  The configured, alternative batch numbers and attributes are saved for the output batch.

o  The connection between input batch and output batch is saved for tracing purposes.

  This process is repeated for all batches included in the group.

MBL_BatchGrouping.docx

Version: 1.0.1115

Page 6 of 6

