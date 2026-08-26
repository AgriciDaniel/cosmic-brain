WIP Material
1 WIP Material
Usage
In material and production logistics, it is possible that output batches must be processed in the next
process step already, even though they are still running in the current production process (predecessor).
Requirements:
The WIP material flag must be set accordingly in the material type of the input batch/output batch.
For WIP material processing to be successful for a batch, the following requirements must be met:
 The batch is currently running as the output batch of the predecessor operation.
 The component list of the successor operation includes a component of this material and material
type.
 The option must be set on the material type of the material concerned from the predecessor
operation, so that it may be adopted for the output batch/input batch.
Procedure
The WIP material processing procedure is described below:
 Logon of the predecessor operation of an order at a workplace.
 The output batch to be currently produced is automatically running as soon as the predecessor
operation has been logged on.
 Quantities may be entered on the output batch.
 Logon of the successor operation of an order at a workplace.
 The output batch currently running on the predecessor operation is used as input batch in the
successor operation and is accordingly logged on in parallel.
 The batch is now running in parallel on two operations as output batch and input batch
respectively.
 The predecessor operation is logged off. The batch only remains running as input batch on the
successor operation.
 The successor operation is logged off. The batch (input batch) is also logged off.
The logon of the successor operation may be prevented by an error message (error code 1590)
if the predecessor operation is not running. The associated check, however, is only performed if
the "Checking the status of the predecessor OP" (S) option is active on the order type, and if no
batch has been logged on manually for the input material yet.
MBL_WIP_Material.docx Version: 1.0.18468 Page 1 of 2

|     |     |     | WIP Material  |
| --- | --- | --- | ------------- |

The automatic logon of the batch is only achieved when the following operation is logged on.
There is no automatic input batch change on the successor operation when the output batch of
|     | the predecessor operation is changed.  |     |     |
| --- | -------------------------------------- | --- | --- |
Restrictions
The following restrictions are to be observed with regard to WIP material processing:
  The WIP material option cannot be used in connection with unplanned material.
  The article/material must be unambiguous in the BOM/component list (an entry with this material
number).
  The option cannot be used on the material type in combination with the "Input batch must be
logged on" option.
  The option cannot not be used in connection with throughput batch processing.

| MBL_WIP_Material.docx  |     | Version: 1.0.18468  | Page 2 of 2  |
| ---------------------- | --- | ------------------- | ------------ |