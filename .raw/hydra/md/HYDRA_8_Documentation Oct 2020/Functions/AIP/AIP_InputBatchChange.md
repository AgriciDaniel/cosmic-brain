Input Batch Change

1

Input Batch Change

Summary

Input material and/or relevant input batches can be changed for a running OP if the "input batch change"

option is clicked.

Configuration

Further system configurations are not required to be able to use the input batch change dialog.

Dialog

Basic screen

Log input batch off:

Input  batches may  be changed  by  entering  a currently  active  batch number or by  entering a new batch

number. When logging batches off, it is also possible to enter the status and consumption of the batch to

be logged off.

AIP_InputBatchChange.docx

Version: 1.0.1362

Page 1 of 3

Input Batch Change

Options when logging input batches off:

F1 - PROCESSED

The batch is set to the "processed" status and the remaining quantity that is still available is set to 0. A

consumption posting is generated as goods issue for the current, remaining quantity.

F2 - BLOCKED

The batch is set to the "blocked" status. A consumption entered additionally is deducted from the current,

remaining quantity as goods issue.

F3 - with remaining quantity

The  batch  is  set  to  the  "free"  status.  A  consumption  entered  additionally  is  deducted  from  the  current,

remaining quantity as goods issue. If the remaining quantity that is still available becomes <= 0, the batch

status automatically switches to "processed".

Consumption

The entered consumption (unit of the  input material) is deducted from the remainder of the batch and a

goods movement is generated.

AIP_InputBatchChange.docx

Version: 1.0.1362

Page 2 of 3

Input Batch Change

Comment on batch

The comment entered is saved as information for the batch.

Log input batch on:

Provided that the batch is known, batch data is displayed in an  intermediate dialog where the logon may

be confirmed.

Provided that the batch could be logged on, it is taken over to the material list in "customer batch number"

and thus the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by an error message.

AIP_InputBatchChange.docx

Version: 1.0.1362

Page 3 of 3

