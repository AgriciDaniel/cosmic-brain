Decision on Changing Input Batch

1  Decision on Changing Input Batch

Usage

For traceability reasons, every time an input batch is changed, a new merged batch/output batch is to be

produced for material listed by serial numbers.

The function "decision on changing the input batch" is used every time when input batches are changed

and  it  has  to  be  ensured  that  the  reported  serial  numbers  deriving  from  different  input  batches  are  not

mixed up in one output batch.

Example:

Two input batches from different lots are used for one material. Input batches are changed, once the first

lot  of  the  input  batch  has  been  consumed.  The material/input  batch  of  the  first  lot  is  logged  off  and  the

material  of  the  second  lot  is  logged  on  as  input  batch.  There  must  be  at  least  two  different  merged

batches/output batches, as the serial numbers of two different input lots or input batches are assembled.

The  "decision  on  changing  the  input  batch"  function  and  the  relevant  posting  procedure  for  input  batch

changes make sure the right connections are generated between input and output batches and the user

is forced to "pay attention" and to post all serial numbers before logging an input batch off.

Example:

Prerequisite/configuration

The warning message can be enabled and/or disabled. The configuration is described here.

MBL_BatchChangeForce.docx

Version: 1.0.18468

Page 1 of 2

Decision on Changing Input Batch

Results/inspections

The user is forced to make a decision when changing input batches:

  Log input batch off --> No

  Log input batch off --> Yes

The input batch is logged off by the system if the user decides to log off the input batch.

The dialog is executed and the input batch to be logged off is posted accordingly:

  Change the batch status (processed, free, blocked)

  Material movement (consumption --> goods issue (261))

  Connections between the output batch (merged batches and subordinate batches) and the input

batch are completed in batch tracing. The system has already established a connection between

the input batch to be logged off and the currently running output batch when the output batch was

generated.

If this connection is not required, an option of the material type "output batch connection = J/N"

makes sure the connection is deleted.

  The batch history is updated.

The user makes an entry (staff badge number) for the logged off input batch and the logged  in

input batch in the batch history. Consequently, one can trace back who decided to log on a new

input  batch  and  to  ignore  the  serial  numbers  mounted  with  the  old  input  batch.  These  serial

numbers are only posted with the new input batch, although they have not been produced by it.

This function can be applied in the "merge serial numbers" dialog  and to "change output

batches". The text has to be adjusted specific to the project.

MBL_BatchChangeForce.docx

Version: 1.0.18468

Page 2 of 2

