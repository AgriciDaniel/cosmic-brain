Interrupting/Finishing OP without the Last Batch

1

Interrupting/Finishing OP without the Last Batch

Summary

The  last  batch  for  which  a  quantity  may  be  entered  when  interrupting/logging  the  OP  off  is  generated

automatically between the last output batch change and logging the operation off.

But  this  system  behavior  is  not  always  wanted.  It  might  also  be  required  that  the  last  output  batch  is

posted specifically by the user. Then the user directly interrupts/logs the OP off, whereas "no" last output

batch is posted and/or no last output batch is generated for the operation.

Usage

The system immediately generates an output batch, once an OP is logged on. Even after an output batch

change, a subsequent batch is generated immediately after completing the preceding output batch.

This cannot be changed in the system, as the system never knows in advance when the last output batch

will be produced and/or if the next output batch will actually be the last one.

For this reason, it is ensured that:

  when  interrupting/logging  an  operation  off,  the  output  batch  generated  at  last  will  no  longer  be

used and directly deleted.



the  last  output  batch  is  not  visible  on  MOC  and  there  is  no  connection  to  the  running  input

batches of the operation.

  no last output batch is visible and, thus, no goods movement is generated.



in posting records no quantities are written in the H record for a last batch.

Restrictions

  Cannot be used when batch numbers are assigned manually:

At the moment the function is only supported if batch numbers are assigned automatically at AIP.

If the batch number is entered/scanned manually by the user, the function cannot be used, as the

output batch entered at last must not be deleted before the OP is logged off/finished. If users can

no longer enter "numbers" when changing the output batch, they cannot perform the output batch

change and they have to interrupt/log the OP off.

Procedure

The  procedure  to  enter  data  "without"  the  last  output  batch  when  interrupting/logging  off  the  OP  is

described as follows:

MBL_DeleteLastBatch.docx

Version: 1.0.1362

Page 1 of 4

Interrupting/Finishing OP without the Last Batch

  Users log the operation on.

  Users register the input batches.

  Users perform the output batch change, once they want to finish an output batch.

  Once users have performed the last output batch change, they interrupt and/or log the operation

off by using the function "interrupt/log OP off".

A running OP may be interrupted or logged off by clicking the "interrupt/log OP off" option. Then a dialog

opens, where it may be chosen between "interrupt OP" and "log OP off".

If "log OP off" or "interrupt OP" is clicked the logoff dialog opens containing the same input fields like the

"output batch change" dialog.

If it was configured in the system that "no" last output batch is to be used when interrupting/logging the

OP off, no output batch will be displayed, as there is no visible, active output batch at this point in time.

MBL_DeleteLastBatch.docx

Version: 1.0.1362

Page 2 of 4

Interrupting/Finishing OP without the Last Batch

Configuration

These configurations have to be made in the system to enable the function.

Result

Data collection:

These results apply for data collection:

  No output batch is displayed/used in the dialog A_UN_MPL/ A_AB_MPL.

  No last quantity can be entered

  Additional information (e.g. material buffer, TPU, etc.) cannot be entered

Processing:

These results apply for processing:

  Provided  that  the  relevant  flag  is  set  for  the  material  type,  the  output  batch  generated  by  the

interruption/logoff  is  directly  assigned  the  status  "D"  that  stands  for  deleted.  The  next  archiving

session considers this batch and deletes it.

  The "deleted" batch is not shown within tracing (graphic/tabular batch tracing).

MBL_DeleteLastBatch.docx

Version: 1.0.1362

Page 3 of 4

Interrupting/Finishing OP without the Last Batch

  The deletion event is not displayed for the "deleted" batch in the batch history.

  A  last  H  record  is  generated  including  the  durations  recorded  between  the  last  output  batch

change  and  interrupting/logging  the  OP  off.  The  H  record  only  includes  durations  and  no

quantities.

  How to proceed with automatic quantities:

If automatic quantities are  recorded  between the  last  output batch  and logging the OP off, they

are currently not taken into account.

MBL_DeleteLastBatch.docx

Version: 1.0.1362

Page 4 of 4

