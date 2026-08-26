Passing on Document Links to Batches

1  Passing on Document Links to Batches

Usage

You use the "Pass document links on" function if document links attached to input batches are also to be

transferred to the generated output batch when changing the output batch.

Prerequisites /restrictions

  Mixing up the two methods of passing on (in the background on the server) and manual collection

at the terminal is not excluded.

  The transfer is performed based on the currently registered input batches upon completion of the

output batch. It is not possible to pass on several input batches changed while the output batch

was running and/or only data of the last input batch is passed on.



It is not possible to pass on document links from the level of subordinate batches to the level of

merged batches.



If  several  items  exist  in  the  component  list  of  an  OP  for  a  material,  the  transfer/inheritance

depends on the input batches logged on:

o

If different input batches are registered for the items/positions, the document links of all

registered input batches of this material will be taken over.

o

If the same input batch is  logged on to  different items/positions, the  document links will

only be taken over once.

Procedure

Different  initial  scenarios  have  to  be  taken  into  account  for  passing  on  document  links.  There  are  the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

Inheritance/transfer for "simple" batches

For "simple" batches the document links of all input batches registered when completing the output batch

are  transferred  to  the  output  batch.  It  is  not  checked  if  there  are  duplicate  documents.  The  following

diagram illustrates how the system reacts:

MBL_PassBatchDocumentLinks.docx

Version: 1.0.1362

Page 1 of 4

Passing on Document Links to Batches

Inheritance/transfer for simple batches/merged batches to merged batches

If  merged  batches  including  subordinate  batches  are  generated  as  part  of  the  collection  process,

document links will be passed on to the generated batches as described below:

  The documents of the source merged batch(es) are transferred to the generated merged batch.

  The  documents  of  the  incorporated  batch(es)  (that  are  neither  merged  batches  nor  their

subordinate batches) are transferred to the generated merged batch and its subordinate batches.

  The  documents  of  the  incorporated  subordinate  batches  are  transferred  to  the  generated

subordinate batches of the generated merged batch.

The following diagram illustrates how the system reacts:

MBL_PassBatchDocumentLinks.docx

Version: 1.0.1362

Page 2 of 4

Passing on Document Links to Batches

Inheritance/transfer for merged batches to merged batches when merging

serial numbers

If  merged  batches  including  subordinate  batches  are  generated  as  part  of  the  collection  process,

document links will be passed on to the generated batches as described below:

  The documents of the source merged batch(es) are transferred to the generated merged batch.

  The  documents  of  the  incorporated  batch(es)  (that  are  neither  merged  batches  nor  their

subordinate batches) are transferred to the generated merged batch and its subordinate batches.

  The  documents  of  the  incorporated  subordinate  batches  are  transferred  to  the  generated

subordinate batches of the generated merged batch.

The following diagram illustrates how the system reacts:

MBL_PassBatchDocumentLinks.docx

Version: 1.0.1362

Page 3 of 4

Passing on Document Links to Batches

MBL_PassBatchDocumentLinks.docx

Version: 1.0.1362

Page 4 of 4

