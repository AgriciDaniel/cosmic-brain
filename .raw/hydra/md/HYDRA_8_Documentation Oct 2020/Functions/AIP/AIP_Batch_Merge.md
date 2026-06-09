AIP Batch Merge

1  AIP Batch Merge

Summary

In  production  partly  consumed  containers  with  the  same  material  are  often  combined  to  one  container.

However,  the  system  considers  the  materials  to  be  located  in  different  batches.  With  this  function  the

terminal provides an opportunity to merge batches and to print a label for the new batch.

Usage

At the moment, it is impossible to:

o  combine "normal" batches with merged batches and/or serial numbers

o  combine  merged  batches  and  serial  numbers  or  to  add  several  serial  numbers  to  one  merged

batch. The merged batch number including the serial number always has to be entered.

o  combine  individual  serial  numbers  into  one  merged  batch.  Their  merged  batch  number  always

has to be  entered. It  is also possible to use the standard function "collection of serial numbers"

A_SNR with the relevant configuration.

Prerequisite

The relevant configuration has to be made to be able to use this function.

Terminal functions

The function is triggered manually by using the key of the "merge batches" dialog (BATCH_MERGE).

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP_Batch_Merge.docx

Version: 1.0.1115

Page 1 of 4

AIP Batch Merge

Description of display fields:

  Batch

Batch number to be entered by the user (manually/by scanning)

  Generate new batch number / involved batch number

Specifies  whether  the  new  batch  is  to  be  generated  with  a  new  batch  number  or  if  an  involved

batch number is used for the new batch. If an involved batch number is used, this one has to be

entered.

  List of recorded batches

Shows the entered batches that are to be merged.

Procedure for the "merge batches" function:

  The user opens the "merge batches" dialog by the relevant function key in the basic screen of the

terminal



In the "batch" field the user enters the affected batches (manually or by scanning) he/she wants

to  merge.  Data  may  be  entered  manually  or  by  scanning.  If  batches  are  entered  manually,  the

input will be confirmed after each batch by

. This empties the field for the next input.

  The user specifies whether the new batch is to be  generated  with a  new  batch  number or if an

involved batch number is used for the new batch. If an involved batch number is used, this  one

has to be entered.

  The  "list  of  recorded  batches"  shows  the  batches  the  user  has  already  entered  and  wants  to

merge.

AIP_Batch_Merge.docx

Version: 1.0.1115

Page 2 of 4

AIP Batch Merge

  The user applies the "complete" key. Then the "batch" field and the "list of recorded batches" are

emptied.  The  user  receives  an  intermediate  message  with  the  generated  batch  number  for  the

merged batch. Additional batches may be merged.

  The dialog remains opened until the user closes it explicitly by pressing "cancel". Then batches

are merged into a new batch.

  A label can be printed for the merged (new) batch.

Function keys

  Function key "cancel"

This  function  key  rejects  the  entered  data  and/or  empties  the  result  list.  New  data  may  be

entered. The dialog remains open.

  Function key "complete"

Entered batches are merged into one batch. By using this function key, the dialog is emptied (i.e.

no data included) and the new batch (batch number) is shown on the terminal. A label is printed

subject to configuration.

  Function key "reject"

Entered batches are not merged into one batch. The data input is rejected.

  Function key "additional data"

Subject  to  configuration,  this  function  leads  to  the  next  workflow  to  record  attributes  and/or

document links.

Result

  By the "cancel" function

The dialog remains open. All entered data are rejected. The input data are not posted. Data input

can be restarted.

  By the "complete" function

This  function  key  closes  the  dialog.  Entered  batches  are  merged  into  one  batch  and  data  are

posted  accordingly.  The  amount  of  merged  batches  is  reduced  accordingly  and  set  to  the

"processed"  batch  status.  The  new  batch  includes  the  merged  amount.  If  merged  batches  are

combined, the serial numbers will be assigned to the new merged batch. Label printing may be

triggered by this.

  By the "enter" function

Entered data are recorded for each batch but not yet posted.

This function key records the individual batches once they have been entered and displays them

in the result list. The dialog remains open.

  By the "additional data" function

AIP_Batch_Merge.docx

Version: 1.0.1115

Page 3 of 4

AIP Batch Merge

Similar  to  the  output  batch  change,  it  is  possible  enter  attributes  and  document  links  for  each

combined batch/merged batch. If they are configured, relevant workflows are integrated for data

collection. Attributes and document links from previous batches are not taken over.

This dialog does not allow entering attributes/document links for individual serial numbers/sub-

batches pertaining to the merged batch.

In  addition,  the  event  is  also  shown  in  the  batch  history  (old  batches  and  new  batch  and  old

merged batches and new merged batch and serial number).

The graphic/tabular overview shows which batches have been merged into one batch.

AIP_Batch_Merge.docx

Version: 1.0.1115

Page 4 of 4

