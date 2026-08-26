MPL-TRA - Terminate Transport Order
1 Terminate Transport Operation
Overview
License MPL-TRA
Usage
The functionality described below enables termination of an operation of a transport order and posting of
the object to be transported in the target material buffer.
Prerequisite
The data base patch dbp_mpl_transportation.hsc must have been run.
The OP status Finished (E) must be configured in the status assignment for the order
type.
Features
Input parameters:
 Transport order operation number (TRANR.ANR)
 Machine number on which the transport operation is to be logged on (TRANR.MNR)
 Target material buffer to which the object is to be posted (TRANR.TMP)
 Transport quantity (TRANR.EGR:GUT, default is target quantity of the operation)
The BAPI call TRANR.END performs the following checks:
 The transport order must be in the Running status (L).
 The target material buffer must exist.
 As an option, the staff badge number is checked if it is transmitted (KNR).
Result of BAPI call TRANR.END:
 The transport operation is terminated with the target quantity (A_AB).
 The OP status of the transport operation changes from Running (L) to Finished (E).
 The object to be transported changes to the status
Batch: Batch status = F (free), transport status = F (free)
Resource: Resource status = <Is reset to the status before start>
MBL_TranspOrderEnd.docx Version: 1.0.1362 Page 1 of 2

|     |     |     | MPL-TRA - Terminate Transport Order  |     |
| --- | --- | --- | ------------------------------------ | --- |

  Entry in history:
Batch:    Batch change/transfer posting in batch history
Resource:   Event RES_STATUS in WRM History
|     |   Transfer posting of resources (RES_UMB) in WRM History  |     |     |     |
| --- | --------------------------------------------------------- | --- | --- | --- |

| MBL_TranspOrderEnd.docx  |     | Version: 1.0.1362  |     | Page 2 of 2  |
| ------------------------ | --- | ------------------ | --- | ------------ |