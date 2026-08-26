Separate/Rebuild Serial Numbers

1  Separate/Rebuild Serial Numbers

Usage

This function enables material components listed by serial numbers and already mounted in a component

to  be  exchanged  specifically.  Mounted  material  components  are  demounted  and  the  new  material

components  to  be  used  are  mounted.  Mounting  and  demounting  are  documented  in  the  system  and

recorded for the relevant serial number.

Procedure of separating/rebuilding serial numbers

In general, there might be two different situations requiring the exchange of components. At the moment,

the system does not differentiate between them.

1.  Components are demounted from a part while the process is running

An  operation  to  "merge"  serial  number  is  running  and  it  turns  out  that  a  serial  number  with  a

"damaged  part"  has  been  mounted.  The  serial  number  is  recorded  for  an  output  batch/merged

batch "as usual" and is ready to be demounted/rebuilt (batch status = free, class = yield, quality

status = free/open).

2.  Components are demounted in a subsequent or separate process step (e.g. rework)

The  serial  number  was  recorded  for  an  output  batch/merged  batch  and  is  ready  to  be

demounted/rebuilt.

Specific  identifiers  (customer-specific)  specify  when  a  serial  number  gets  to  this  process  (e.g.

batch  status  =  blocked,  class  =  rework/scrap,  quality  status  =  blocked).  But  by  default  these

indicators are set: (batch status = free, class = yield, quality status = free/open).

In both cases, the function does not require operations or input components to be logged on. The dialog

can be carried out at an independent workstation.

Posting of serial numbers

The below-mentioned postings have to be performed for the affected components listed by serial

numbers, once they have been rebuilt:

Serial number of the complete, finished component part

This serial number is still assigned to the merged batch from which it was removed.

All  relevant  data  (material  number,  material  type,  batch  status,  class,  quality  status)  remains

unchanged.

The connection to the demounted component is deleted. Now it is only included in the history. The

connection to the newly mounted part is added accordingly.

Serial number data (attributes, document links) can be entered for the rebuilt part.

MBL_SNR_Divide.docx

Version: 1.0.1115

Page 1 of 3

Separate/Rebuild Serial Numbers

Serial number of the demounted component part

This serial number is no longer connected to the entire part from which it was demounted.

For traceability purposes, an entry is made in the batch history (indicating that this component was

once mounted in this part).

The serial number of the removed component is not assigned to a new merged batch. It remains as

single part (batch with quantity 1) on stock (class = scrap and batch status = blocked).

The merged batch which the demounted serial number derives from also remains unchanged (the

inventory is not increased for this batch).

Serial number of the mounted component part

This  serial  number  is  taken  from  a  provided  merged  batch  the  inventory  of  which  is  reduced

accordingly.

As in this process no operation is logged on, no merged batch will be logged on as input batch. The

inventory of the merged batch is reduced in the background after mounting.

Batch  data  of  the  mounted  component  part  is  not  changed.  All  relevant  data  (material  number,

material type, batch status, class, quality status) remains unchanged.

A  connection  to  the  consumed  serial  numbers/merged  batches  is  established  for  traceability

purposes.

Generation of goods movements

These  goods  movements  are  performed  for  the  mounted/demounted  components,  the  complete

component part and for the corresponding merged batches.

Goods movements when merging components listed by serial numbers:

Goods movements when separating components listed by serial numbers:

MBL_SNR_Divide.docx

Version: 1.0.1115

Page 2 of 3

Separate/Rebuild Serial Numbers

Subject  to  configuration,  the  generation  of  goods  movements  can  be  controlled  individually  for

consumptions as well as for the output material on the level of serial numbers and merged batches.

Consequently, it is possible to adjust the upload of these goods movements to the conditions of the

relevant ERP system.

MBL_SNR_Divide.docx

Version: 1.0.1115

Page 3 of 3

