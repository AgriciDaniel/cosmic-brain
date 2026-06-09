Create/Cancel Group Batch

1  Create/Cancel Group Batch

Summary

Within the production area, it is necessary to compress batches to a group with one ID and to provide this

package/group within another area. It is assumed here that the identified material only switches positions

and this movement is irrelevant to batch tracing (e.g. picking or transfer posting of batches in a group and

provision for production or transport).

Usage

The  function  is  used  to  combine  batches  of  different  or  identical  materials,  which  is  to  be

resolved/canceled at a later point in time providing the batches "unaffected".

Prerequisite/configuration

The configuration for AIP is described here.

The configuration for AIP2 is described here.

The logical process and posting are described here.

Generate group batch

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP_BatchGroupingV1.docx

Version: 1.1.18468

Page 1 of 4

Create/Cancel Group Batch

Description of display fields:

  Machine

Used workplace/machine

  Group batch

Generated group batch that is currently being created.

  Batch number

Entered number of the batch that is to be recorded for the group batch.

  Number of batches

Number of individual batches included in the group batch.

  Staff badge number

The user's staff badge number.

  Result list

List of all individual batches included in the group batch with batch number, material number etc.

Function keys

  Function key "cancel"

The function key terminates the dialog and rejects data input.

  Function key "add"

An individual batch may be assigned to the group batch using this function key.

  Function key "remove"

A selected individual batch may be removed from the group batch using this function key.

  Function key "complete"

AIP_BatchGroupingV1.docx

Version: 1.1.18468

Page 2 of 4

Create/Cancel Group Batch

This function key completes the group batch, i.e. it is generated.

Procedure

For the user the procedure is as follows:

  The user opens the "create group batch" dialog in the basic screen of the terminal

  The user enters the batches (manually or by scanning) he/she wants to group

  The user may view the group batch number in the dialog

  The dialog's result list shows the entered batches that are to be grouped.



Individual  batches  may  still  be  removed  or  added,  as  long  as  the  user  has  not  confirmed  the

dialog by the "complete" key.

Cancel group batch

Dialog

Description of display fields:

  Machine

Used workplace/machine

  Target buffer

Material  buffer  to  which  the  batch  is  transferred.  If  the  field  remains  empty,  no  transfer  posting

takes place and the material buffer remains.

  Batch number

AIP_BatchGroupingV1.docx

Version: 1.1.18468

Page 3 of 4

Create/Cancel Group Batch

Entered number of the group batch that is to be canceled (re-posted).

  Staff badge number

The user's staff badge number.

  Result list

List of all individual batches included in the group batch with batch number, material number etc.

Function keys

  Function key "cancel"

The function key terminates the dialog and rejects data input.

  Function key "complete"

This function key cancels the group batch.

Procedure

For the user the procedure is as follows:

  The user opens the "cancel group batch" dialog in the basic screen of the terminal

  The user enters the group batch (manually or by scanning) he/she wants to cancel

  The dialog's result list shows the batches pertaining to the grouping.



In  the  "material  buffer"  field  the  user  may  enter  a  new  material  buffer  to  which  all  individual

batches of the group are to be re-posted.

o

If the user does not fill out the field, the material buffers of the individual batches remain

as before.

  As long as the user has not closed the dialog by "cancel group",  it remains open and/or can be

cancelled. Data will be rejected.

AIP_BatchGroupingV1.docx

Version: 1.1.18468

Page 4 of 4

