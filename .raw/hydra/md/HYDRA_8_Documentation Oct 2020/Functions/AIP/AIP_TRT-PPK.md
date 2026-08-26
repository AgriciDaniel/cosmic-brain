  Palletizing/ Packaging/ Assembling at the Terminal

1  Palletizing/ Packaging/ Assembling at the Terminal

Log on packing OP

Using the following entry function (dialog A_AN_HU or A_P_AN_HU) the operator can log a packing OP

on that is subject to batch management:

When the OP is logged on, an operation is selected from the sequencing list and then logged on at  the

machine.  OPs  without  input  material  requiring  batch  management  are  logged  on  and  posted  using  the

PDM command A_AN or A_P_AN.

If the machine is configured so that a person must be logged on with the OP, then the command A_P_AN

is used and the badge number must be available as an entry field.

Assign batches

Using  the  following  entry  function  (dialog  CE_AN_HU)  on  a  terminal,  batches  for  a  current  TPU  (active

output batch) can be assigned to an active OP requiring batch processing:

Illustration:  Assign batches dialog - CE_AN_HU

By entering a  batch number that is known in HYDRA and  pressing the "Assign batch" key, the batch is

logically  assigned  to  the  current  TPU.  After  it  is  successfully  assigned,  the  batch  is  in  the  "processed"

status and is displayed in the list of TPU batches.

AIP_TRT-PPK.docx

Version: 1.1.1362

Page 1 of 4

  Palletizing/ Packaging/ Assembling at the Terminal

General note: Only batches with the same material number may be assigned.

Using the "Remove batch" button, you can remove a batch from assignment by selecting it (double click

on the line). This switches the batch back to the "free" status.

The number of assigned batches and the sum of their total quantity in kg are displayed in the window as

supplementary status information about the current TPU.

The content of the grid "Batches in transport unit" is configured in the file ctaiplay.ini using the section [

C_PAL_ZUORD.LST ].

Complete TPU

By  using  the  following  entry  function  (dialog  CA_WL_HU)  on  the  terminal,  the  currently  active  output

batch (TPU/handling unit) can be completed.

Illustration:  Complete TPU dialog – CA_WL_HU

Using the "Complete TPU" function, a TPU can be completed by entering the weight and the status good

/ blocked / scrap. When the TPU is completed, the active output batch is posted with quantity (net weight)

and completed, and  a goods receipt (movement type 101)  is posted.  At the same time, the next  output

batch is logged on at the OP.

The following data can be entered at this posting:

Target buffer

Material buffer the TPU batch is posted to. Default assignment is the machine's output buffer.

AIP_TRT-PPK.docx

Version: 1.1.1362

Page 2 of 4

  Palletizing/ Packaging/ Assembling at the Terminal

Gross weight / Tare Weight / Net weight

The  net  weight  is  preset  with  the  sum  (in  kilograms)  of  the  assigned  individual  batches.

If entered manually, the calculation is as follows:

Gross weight = tare weight + net weight

The values gross weight and tare weight are also stored as batch attributes at the TPU batch:

  Gross weight

-  batch attribute 301 (ATTR:301)

Tare weight

-  batch attribute 302 (ATTR:302)

Transp. unit (Transport unit)

By  selecting  a  transport  unit  available  in  the  system,  an  assignment  can  be  made  to  the  TPU

batch.

 Please note: The transport unit's defined  weight is currently  not  assumed as the tare  weight in

the input mask.

Status (free / blocked / scrap)

In  addition  to  the  “free”  status  (yield),  the  generated  TPU  batch  can  also  be  generated  on  the

"blocked" status (Class yield) or as a scrap batch (Class scrap).

In the case of scrap, the quantity is also posted as scrap at the operation by entering a reason.

Number of batches

Shows  the  number  of  batches  currently  assigned  to  the  TPU.  The  value  is  stored  with  a  fixed

value as batch attribute 201 (ATTR:201).

After  confirming  with  OK,  additional  batch  attributes  may  be  entered  if  they  were  defined  at  the

operation's material type.

After the posting is successfully completed, the TPU batch is generated as a so-called merged batch and

the quantity and goods movement relating to the operation are entered.

AIP_TRT-PPK.docx

Version: 1.1.1362

Page 3 of 4

  Palletizing/ Packaging/ Assembling at the Terminal

Log OP off/ interrupt OP

Using the following entry function (dialog A_UN_HU  or A_AB_HU) on the terminal, the packing OP can

be interrupted or logged off.

After a selection is made, the operator can interrupt or terminate the packing OP:

Illustration: Interrupt packing OP dialog – A_UN_HU

After confirming with OK, the active packing OP is interrupted/ terminated.

Please note/ restrictions:

  The  last  active  output  batch  at  the  packing  OP  is  completed  without  a  quantity  by  setting  the

status "deleted".



If  there  are  still  assigned  batches  on  the  TPU  when  logging  off,  the  posting  is  refused  with  an

error message.

  The ADE inspections relating to the operation's over/ underdelivery are inactive using this posting

function.



It is not possible to post a quantity using this function.

AIP_TRT-PPK.docx

Version: 1.1.1362

Page 4 of 4

