  Configuration of Decision on Changing Input Batch

1  Configuration of Decision on Changing Input Batch

Usage

The function "decision on changing the input batch" is used when input batches are changed and it has to

be ensured that the reported serial numbers deriving from different input batches are not mixed up in one

output batch.

For  this  reason,  the  "decision  on  changing  the  input  batch"  alert  may  be  configured  as  an  intermediate

dialog when changing input batches.

System configuration

Material type:

These options have to be set for the material type:



Input batch processing > decision on changing the input batch = ON

If this option is enabled, the alert is shown in the "decision on changing the input batch" dialog.

  Output batch processing > delete batch assignment = ON

Using  this  option  deletes  the  most  recent  assignment  between  input  batch  and  current  output

batch.  This  deletion  is  necessary  as  the  assignment  is  established  immediately  after  the  input

batch has been logged on.

Setup_BatchChangeForce.docx

Version:

Page 1 of 1

