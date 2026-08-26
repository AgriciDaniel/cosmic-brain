Palletizing and Packing on the AIP

1  Palletizing  and Packing on the AIP

Log packing OP on

Use  the  input  function  (dialog  A_AN_HU  or  A_P_AN_HU)  to  log  on  a  packing  OP  requiring  batch

management to the terminal.

When logging the OP on, an operation is selected from the sequencing list and logged on to the machine.

The logon is performed without input material for OPs requiring batch management and posted using the

PDM command A_AN or A_P_AN.

If the machine is configured so that the person has to be logged on with the OP, the A_P_AN command is

used and the dialog has to include an input field for the badge number.

Assign batches

The  below  input  function  (dialog  CE_AN_HU)  is  used  on  the  terminal  to  assign  batches  to  the  current

TPU (running output batch) for a running OP requiring batch management:

Figure: "Assign batches" dialog - CE_AN_HU

Enter a batch number that is known in HYDRA and click the button  Assign batch to logically assign the

batch  to  the  current  TPU.  Once  assigned  successfully,  the  batch  is  set  to  the  "processed"  status  and

displayed in the list, which includes all batches assigned to the TPU.

Note: You can assign only batches of the same material.

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 1 of 7

Palletizing and Packing on the AIP

Use the button Remove batch to cancel the assignment of a selected batch (double-click on the relevant

row). Then the batch changes back to the "free" status.

As  additional  status  information  on  the  current  TPU,  the  dialog  shows  the  number  of  assigned  batches

and their total quantity in kg.

You configure the contents of the "batches in transport unit" table in the section [ C_PAL_ZUORD.LST ]

of the file ctaiplay.ini.

Complete TPU

You use this input function (dialog CA_WL_HU) to complete the currently running output batch (TPU) on

the terminal.

Figure: "Complete TPU" dialog – CA_WL_HU

Using  the  function  Complete  TPU,  you  can  complete  a  TPU  and  enter  the  weight  and  the  status  yield,

locked, scrap. When  you complete the TPU, the relevant quantity (net  weight) is booked to the running

output batch and completed and a goods receipt (movement type 101) is posted. At the same time, the

next output batch is logged on to the OP.

You can collect the following data with this posting:

Target buffer

Material buffer where the TPU batch is posted. By default, this is the machine's output buffer.

Gross weight/tare weight/net weight

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 2 of 7

Palletizing and Packing on the AIP

By  default,  the  total  (in  kg)  of  the  assigned  single  batches  is  entered  as  net  weight.

If entered manually, it is calculated as follows:

Gross weight = Tare weight + Net weight

The values "gross weight" and "tare weight" are additionally saved as batch attributes for the TPU

batch:

  Gross weight

-  batch attribute 301 (ATTR:301)

Tare weight

-  batch attribute 302 (ATTR:302)

Transp. unit (transport unit)

A transport unit existing in the system can be assigned to the TPU batch.

Note: the weight stored for the transport unit is currently not taken over as tare weight to the input

dialog.

Status (free/locked/waste)

By using the status selection, you can assign a status to the generated TPU batch: status "free"

(yield material), status "locked" (class: yield material) or status "waste" (class: scrap).

In case of scrap, the quantity is posted as scrap for the operation and a scrap reason is entered.

Number of batches

Shows  the  number  of  batches  currently  assigned  to  the  TPU.  The  value  is  saved  as  batch

attribute 201 (ATTR:201).

Once the input has been confirmed by clicking OK, you can optionally enter further batch attributes if the

attributes have been defined for the material type of the operation.

Once the posting has been completed successfully, the TPU batch is generated as "merged batch" and

the relevant quantity and the goods movement are posted for the operation.

Log OP off / Interrupt OP

The  packing  OP  can  be  interrupted  or  logged  off  on  the  terminal  using  this  input  function  (dialog

A_UN_HU or A_AB_HU).

Once selected, the user can interrupt or finish the packing OP:

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 3 of 7

Palletizing and Packing on the AIP

Figure: "Interrupt packing OP" dialog – A_UN_HU

The running packing OP is interrupted/finished after confirming by clicking OK.

Notes / restrictions:

  The  last  active  output  batch  of  the  packing  OP  is  completed  without  quantity  and  with  status

"deleted".



If batches are still assigned to the TPU when you try to log the OP off, the logoff is rejected with

error message.

  The  ADE  checks  for  overdelivery/underdelivery  of  the  operation  are  not  active  when  you  use

these posting functions.

  Quantities cannot be posted using this function.

Unpack / Repack

Requirements

Service  pack  13  must  be  installed  and  activated.  The  document  Activating_MPL_TRT_Dialogs_(SP13)

describes how to use the dialog on the shop floor client.

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 4 of 7

Palletizing and Packing on the AIP

For  new  customers,  the  new/updated  MPL  or  TRT  dialogs  are  directly  available  once  the

service pack 13 has been released.

General

Using  this  dialog,  the  operator  can  enter  the  packed  handling  unit  and  unpack  selected  batches.  The

operator can also unpack all batches and therefore cancel the handling unit.

Terminal procedure - Unpack individual batches

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered  manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

The list displays the data of the entered handling unit. You can double-click specific batches to select the

batches that you want to unpack. The selected batches are labeled in the list with an "x".  Double-click a

selected batch to deselect the batch. The display returns to normal ("-").

Use the button Unpack selected ones to unpack selected batches.

A confirmation prompt opens asking whether you want to execute the dialog:

  Click No to cancel execution. The user returns to the dialog.  The selected batches remain.

  Click OK to execute the dialog.

Then a message confirms that the unpacking process has been completed successfully. If you click  OK,

you get back to the dialog for further processing.

If you click Exit, the dialog closes. Selected unpacked batches remain unchanged in the handling unit.

Terminal procedure - Unpack all batches

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 5 of 7

Palletizing and Packing on the AIP

The list displays the data of the entered handling unit. You can double-click specific batches to select the

batches that you want to unpack. The selected batches are labeled in the list with an "x".  Double-click a

selected batch to deselect the batch. The display returns to normal ("-").

The function key Unpack all unpacks all batches contained in the handling unit.

Then a message confirms that the unpacking process has been completed successfully. If you click  OK,

the dialog is closed because there are no more batches.

Terminal procedure - Add new batch

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

The list displays the data of the entered handling unit.

If you click the button Add, you can add batches to the handling unit. A dialog opens where you can enter

the batch number that is added, either manually or by scanning. After confirmation, the batch is added to

the handling unit.

Posting procedure - Unpack individual batches

If you want to remove child batches from a handling unit, the system checks the following:

  The child batches must exist, but can be archived.

  The handling unit must be available but not running or processed.

The following actions are performed for each unpacked child batch:

  The batch status of the child batch is set to the status of the handling unit.

  The  remaining  quantity  of  the  child  batch  is  calculated  from  the  total  quantity  of  the  goods

movements when the child batch is packed.

  An entry in the Batch history is generated.

  The connection between handling unit and child batch is removed

  The batch assignment between child batch and handling unit is removed.

Actions performed for the handling unit:

  The remaining quantity of the handling unit is reduced by the sum of all remaining quantities of all

unpacked batches.

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 6 of 7

Palletizing and Packing on the AIP



If the remaining quantity of the handling unit is zero, the batch is set to status "A" (processed)

  A goods movement is generated specifying the reduced quantity.

Posting procedure - Unpack all batches

See above "Unpack individual batches". The same processing is applied. All batches are unpacked and

the handling unit with the remaining quantity = 0 is set to status "A" (processed).

Posting procedure - Add new batch

If you want to add child batches to an existing handling unit, the system checks the following:

  The handling unit must be available but not running or processed.

  The  batch  to  be  added  must  have  the  status  "F"  (free)  and  the  same  article  number  as  the

handling unit batch.

Note for the added child batch:

  All batch data of the handling unit is transferred to the child batch.

  The batch class of the child batch is identical to the batch class of the handling unit.

  The batch status is "A" (processed).

  The child batch is linked to the handling unit.

  An event „CE_AN_PA“ is added for the child batch in the batch history.

  The batch assignment between child batch and handling unit is generated.

  A goods movement (goods issue) is generated for the child batch.

Actions performed for the handling unit:

  The remaining quantity and the quantity of the handling unit increase by the remaining quantity of

the added child batch.

  The system generates a goods movement (goods receipt) with the new quantity of the handling

unit.

AIP_Palletizing_Packaging.docx

Version: 1.2.22489

Page 7 of 7

