Object: Merged Batch

1  Object: Merged Batch

Definition

A  merged  batch  is  a  special  kind  of  HYDRA  batch.  One  can  distinguish  a  merged  batch  from  a  non-

merged  batch,  as  the  merged  batch  is  assigned  1  -  n  batches.  The  merged  batch  "embraces"  the

assigned individual batches.

Merged  batches  are  especially  identified  in  the  system  and  with  respect  to  data,  they  have  a  special

relationship to the included individual batches.

Usage

Merged  batches  are  used  to  combine  an  amount  of  individual  batches  and  to  facilitate  dealing  with

individual batches, particularly in view of data collection.

Structure

In general, merged batches have the same structure as batches. Special features of the merged batch:

Merged batch number

The merged batch number is synonymous to the HYDRA batch number. The merged batch number

is entered in the field of the same name for the individual batches. In this way, individual batches

and merged batches are linked with each other.

The merged batch itself does not know the individual batches assigned to it.

Merged batch ID

The merged batch ID is set for the merged batch.

Flag for same type

If  a  merged  batch  is  of  the  same  type,  the  quantity  of  the  merged  batch  will  be  updated  when  a

batch is assigned.

Vice versa (flag is not set), the quantity of the merged batch is not changed. The merged batch just

acts as a logical "bracket".

HU level

The HU (handling unit) level indicates in which nesting level the batch is included.

Inventory type

The inventory type is set to "H" for merged batches and handling units.

OBJECT_CollectiveBatch.docx

Version:

Page 1 of 2

Object: Merged Batch

Number of individual batches

The  number  of  individual  batches  indicates  the  number  of  individual  batches  included  in  or

summarized by the merged batch.

Quantity fields

The quantity fields of the merged batch represent the total  of quantity fields of individual batches,

provided that the merged batch is composed of batches of the same type.

Integration

Merged batches are integrated like batches.

OBJECT_CollectiveBatch.docx

Version:

Page 2 of 2

