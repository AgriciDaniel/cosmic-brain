Passing on Batch Attributes

1  Passing on Batch Attributes

Usage

You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the

generated output batch when changing the output batch.

Prerequisites /restrictions

  Mixing up the two methods of passing on (in the background on the server) and manual collection

at the terminal is excluded. Therefore, server processing checks if the option "Capture attribute

while generating batch" is set for the batch attributes to be passed on:

o  Yes – "Capture attribute while generating batch“ is set

  Manual collection takes priority - the attribute will not be passed on.

o  No - "Capture attribute while generating batch“:

  The attribute will be passed on.

  The transfer is performed based on the currently registered input batches upon completion of the

output  batch.  Provided  that  attributes  were  recorded  manually  beforehand,  they  will  be

overwritten.  It  is  not  possible  to  pass  on  several  input  batches  changed  while  the  output  batch

was running and/or only data of the last input batch is passed on.



It is not possible to pass on attributes from the level of subordinate batches to the level of merged

batches.



If for a material for which inheritance rules apply several items exist in the component  list of an

OP, the value of the batch with the lower BOM item will be used (i.e. "0010" prior to "0040").

Procedure

The different initial scenarios have to be taken into account for passing on batch attributes. There are the

following options:



Inheritance/transfer for simple batches

  Pass  on  simple  batches/merged  batches  and  their  subordinate  batches  to  merged  batches  and

their subordinate batches when collecting serial numbers

  Pass on merged batches to merged batches when merging serial numbers

Data/results/inspections



If  the  advanced  object  configuration  includes  an  inheritance  rule  for  the  material  of  the  input

batch:

o

the  inheritance  rule  BATCH_TO_BATCH  transfers  the  value  of  the  specified  attribute

from the input batch to the output batch.

MBL_PassBatchAttributes.docx

Version: 1.0.1362

Page 1 of 4

Passing on Batch Attributes

o

the  inheritance  rule  CHILD_BATCH_TO_CHILD_BATCH  transfers  the  value  of  the

specified  attribute  from  the  subordinate  batch  of  the  input  batch  to  the  generated

subordinate batch of the output batch.

o

the  inheritance  rule  BATCH_TO_CHILDBATCH  transfers  the  value  of  the  specified

attribute  from  the  registered  batch,  for  merged  batches  from  the  superordinate  batch

level, to the subordinate batch of the generated output batch.

Inheritance/transfer for "simple" batches

Attributes are passed on from all input batches to the  output  batch. The value from the first input batch

will be used if an attribute is configured several times.

MBL_PassBatchAttributes.docx

Version: 1.0.1362

Page 2 of 4

Inheritance/transfer for simple batches/merged batches to merged batches

Passing on Batch Attributes

The inheritance is performed as follows:

  Attributes are passed on from the simple input batch to the output merged batch.

  Attributes  are  passed  on  from  the  simple  input  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes are passed on from the input merged batch to the output merged batch.

  Attributes  are  passed  on  from  the  input  merged  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes  are  passed  on  from  the  subordinate  batches  of  the  input  merged  batch  to  the

subordinate batches of the output merged batch.

The value from the first input batch is used if an attribute is configured several times.

MBL_PassBatchAttributes.docx

Version: 1.0.1362

Page 3 of 4

Inheritance/transfer for merged batches to merged batches when merging

serial numbers

Passing on Batch Attributes

The inheritance is performed as follows:

  Attributes are passed on from the input merged batch to the output merged batch.

  Attributes  are  passed  on  from  the  input  merged  batch  to  the  subordinate  batches  of  the  output

merged batch.

  Attributes  are  passed  on  from  the  subordinate  batches  of  input  merged  batches  to  the

subordinate batches of output merged batches.

The value from the first input batch is used if an attribute is configured several times.

MBL_PassBatchAttributes.docx

Version: 1.0.1362

Page 4 of 4

