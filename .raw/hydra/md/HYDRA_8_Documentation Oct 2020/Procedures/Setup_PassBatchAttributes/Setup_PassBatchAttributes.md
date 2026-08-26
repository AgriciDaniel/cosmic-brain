Configuration of Passing on Batch Attributes
1 Configuration of Passing on Batch Attributes
Usage
You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the
generated output batch when changing output batches.
General
Different initial scenarios have to be taken into account for passing on batch attributes. There are the
following options:
 Inheritance/transfer for simple batches
 Pass on simple batches/merged batches and their subordinate batches to merged batches and
their subordinate batches when collecting serial numbers
 Pass on merged batches to merged batches when merging serial numbers
System configuration
The option of passing batch attributes on is enabled for the Material type of the input batch.
In addition, a configuration is required in advanced object configuration. This configuration defines in a
"material to material" relationship which attributes are to be taken over by which inheritance rule.
Object type Object ID 1 Object ID 2 Object ID 3 Object ID 4 Parameter Parameter value Active
MPL LEVEL VON_ARTIKEL NACH_ARTIKEL ATTRIBUT INHERITATE Y/N Y
Advanced object configuration
If the advanced object configuration includes an inheritance rule for the material of the input batch:
 the inheritance rule BATCH_TO_BATCH transfers the value of the specified attribute from the
input batch to the output batch.
 the inheritance rule CHILD_BATCH_TO_CHILD_BATCH transfers the value of the specified
attribute from the subordinate batch of the input batch to the generated subordinate batch of the
output batch.
 the inheritance rule BATCH_TO_CHILDBATCH transfers the value of the specified attribute from
the registered batch, for merged batches from the superordinate batch level, to the subordinate
batch of the generated output batch.
Inheritance/transfer for "simple" batches
Example
Setup_PassBatchAttributes.docx Version: Page 1 of 2

|     |     |   Configuration of Passing on Batch Attributes  |     |     |
| --- | --- | ----------------------------------------------- | --- | --- |

| BATCH_ATTRIBUTE  | LEVEL           | VON_ARTIKEL  | NACH_ARTIKEL  | ATTRIBUT    |
| ---------------- | --------------- | ------------ | ------------- | ----------- |
| Example slide 1  |                 |              |               |             |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712         | 4713          | ATTRIB_101  |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712         | 4713          | ATTRIB_102  |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712         | 4713          | ATTRIB_103  |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4711         | 4713          | ATTRIB_111  |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4711         | 4713          | ATTRIB_112  |

Inheritance/transfer for simple batches/merged batches to merged batches
Example
| BATCH_ATTRIBUTE  | LEVEL  | VON_ARTIKEL  | NACH_ARTIKEL  | ATTRIBUT  |
| ---------------- | ------ | ------------ | ------------- | --------- |
BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH  4711  4713  ATTRIB_101
BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH  4711  4713  ATTRIB_102
BATCH_ATTRIBUTE  BATCH_TO_CHILDBATCH  4711  4713  ATTRIB_103
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4711  | 4713  | ATTRIB_103  |
| ---------------- | --------------- | ----- | ----- | ----------- |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712  | 4713  | ATTRIB_104  |
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712  4713  ATTRIB_105
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712  4713  ATTRIB_106

Inheritance/transfer for merged batches to merged batches when merging serial numbers
Example
| BATCH_ATTRIBUTE  | LEVEL           | VON_ARTIKEL  | NACH_ARTIKEL  | ATTRIBUT    |
| ---------------- | --------------- | ------------ | ------------- | ----------- |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712         | 4713          | ATTRIB_103  |
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4712         | 4713          | ATTRIB_104  |
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712  4713  ATTRIB_101
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712  4713  ATTRIB_105
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4712  4713  ATTRIB_106
| BATCH_ATTRIBUTE  | BATCH_TO_BATCH  | 4812  | 4713  | ATTRIB_105  |
| ---------------- | --------------- | ----- | ----- | ----------- |
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4812  4713  ATTRIB_111
BATCH_ATTRIBUTE  CHILD_BATCH_TO_CHILD_BATCH  4812  4713  ATTRIB_112

| Setup_PassBatchAttributes.docx  |     | Version:   |     | Page 2 of 2  |
| ------------------------------- | --- | ---------- | --- | ------------ |