Recording Goods Receipt Batch

1  Recording Goods Receipt Batch

Overview

Function authorization

batch.generate

Usage

This function is used to create new batches in the system in the context of recording goods received.

Integration

The  batches  created  can  be  posted  in  the  system  as input  batches  for  plausibility  determination  and  to

guarantee traceability of the materials used in the production process.

By recording a new goods receipt batch, the tests for the material received can  be generated in quality

management.

Requirement

In the basic system settings a prefix has been stored that is used for the automatically generated batch

number and specifies the length of the batch number in the system.

The  material  types  in  the  system  have  been  updated.  If  the  material  type  is  to  be  determined

automatically by the system, the assignment between material and material type has been updated.

If the units included with the system upon delivery are not sufficient, you have defined your own  units in

the system.

Field descriptions

Workplace

The workplace used for receiving can be recorded for traceability.

MES order number

An order / operation can be recorded for traceability.

Material

Mandatory field for the material number of the batch to be created

Material type

Material type of the batch to be created.

Batch class

Specification regarding the quality of the goods receipt batch.

MOC_BatchGenerate.docx

Version: 1.0.18468

Page 1 of 2

Yield – The batch is created as yield with the batch status "Approved".

Scrap – The batch is created as yield with the batch status "Blocked".

Recording Goods Receipt Batch

Quantity

Quantity received

Unit

Unit with regard to quantity

Material buffer

Material buffer into which the batch is received

Transport unit

Transport unit used for the batch

Comment

Free comment text

Badge

Badge number of the person responsible for recording

MOC_BatchGenerate.docx

Version: 1.0.18468

Page 2 of 2

