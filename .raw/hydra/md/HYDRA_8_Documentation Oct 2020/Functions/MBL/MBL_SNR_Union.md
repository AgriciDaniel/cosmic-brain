Merging Serial Numbers

1  Merging Serial Numbers

Usage

Merging serial numbers allows for different material components listed by serial numbers to be combined

specifically  into  one  new  component  part.  The  serial  number  of  the  new  component  part  may  be  the

number of one of the incorporated serial numbers or assigned anew.

Process of merging serial numbers

Merging serial numbers is based on the management of serial numbers incorporated in  merged batches

registered  as  input  batches.  Incorporated  serial  numbers  are  assigned  based  on  the  serial  numbers

included in these merged batches.

This process also outputs a serial number. There are two strategies to get the serial number:

  An integrated serial number is continued keeping the ID

The  indicator  "superordinate  serial  number"  at  the  component  specifies  which  one  of  the

incorporated  components  includes  the  serial  number  ID  that  is  to  be  continued.  These

components and/or their serial numbers are designated as superordinate serial numbers.

For each operation only one component can be assigned the flag "superordinate serial number".

  A new serial number is assigned

If no component is identified as superordinate, the new serial number to be assigned can either

be specified or the system assigns a number automatically.

If a merged batch with assigned serial numbers is finished, the system updates data and generates new

documents in the form of log records and goods movements.

Posting of serial numbers

Transfer of data from the operation

This  data  is  taken  over  from  the  running  operation  and  transferred  to  the  merged  batch  and  the

assigned serial numbers:

o  Material and material name

o  Material type

MBL_SNR_Union.docx

Version: 1.0.18468

Page 1 of 3

Merging Serial Numbers

Transfer of entered data to serial numbers and the merged batch

The machine, producing operation, person performing the posting, material buffer and the transport

unit are transferred to the merged batch and the serial numbers included in the merged batch.

Any comment that might be entered is transferred to the merged batch as additional information on

the batch.

The status of the merged  batch and serial numbers is set subject to  the specified quality/class of

the output batch:

Selected class

Assigned batch status

Reason accepted

Yield

Scrap

Rework

Open quantity

Free

Locked

Free

Free

No

Yes

Yes

Yes

Batch  attributes  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

batch attributes.

Batch attributes collected in relation to the serial number are transferred to serial numbers as batch

attributes.

Document  links  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

document links.

Document  links  collected  in  relation  to  the  serial  number  are  transferred  to  serial  numbers  as

document links.

Quantities of the merged batch

The  generated  merged  batch  includes  the  total  quantities  of  the  serial  numbers  assigned  to  the

merged batch.

The  number  of  assigned  serial  numbers  is  defined  for  the  merged  batch  as  number  of  individual

batches.

Activities for serial numbers

New  batches  with  a  new,  internal  HYDRA  batch  number  are  generated  for  the  serial  numbers

included  in  the  merged  batch  (for  further  details  on  this  procedure,  please  see  section  HYDRA

batch number vs. serial number) and the preceding batches are assigned the "processed" status.

Generation of ADE log records

An H record is generated for the merged batch. This one includes the quantity(ies) of the merged

batch, which in turn result(s) from the quantities of the assigned serial numbers. The batch number

of the merged batch is stored at the H record.

MBL_SNR_Union.docx

Version: 1.0.18468

Page 2 of 3

Merging Serial Numbers

Separate log records are not generated for serial numbers.

Generation of goods movements

The generation of goods movements can be controlled individually for consumptions as well as for

the output material on the level of serial numbers and merged batches.

Consequently, it is possible to adjust the upload of these goods movements to the conditions of the

relevant ERP system.

Details  on  how  to  configure  goods  movements  can  be  found  in  configuration  instructions  for  the

collection of serial numbers.

Tracing

Tracing information is updated for the merged batch and serial numbers in the system:

o  The generated merged batch is connected with all integrated input batches logged on at the

time of logging the merged batch on (by logging the OP on or by completing a merged batch

beforehand) or that have been logged on since then.

o  The serial numbers included in the merged batch are also connected with all integrated input

batches  logged on  at the time of logging the merged batch on (by logging the OP on or by

completing a merged batch beforehand) or that have been logged on since then.

Establishing connections between serial numbers and the input batch can be disabled if required.

MBL_SNR_Union.docx

Version: 1.0.18468

Page 3 of 3

