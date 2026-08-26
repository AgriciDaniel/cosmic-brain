Evaluation and Entry of Serial Numbers

1  Evaluation and Entry of Serial Numbers

Serial  numbers  are  assigned  to  be  able  to  differentiate  between  individual  items  of  material.

Consequently, the serial number uniquely identifies a single part.

MES provides several variants with different features to record serial numbers:

  Variant 1: Entry of serial numbers for OPs that are not subject to management in batches (dialog

A_SNR/ "E" only)

  Variant  2:  Entry  of  serial  numbers  for  OPs  that  are  subject  to  management  in  batches  (dialog

A_SNR)

o  Manual entry of the serial number that is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number that is assigned to a HYDAR batch number.

1.1  Entry of serial numbers for OPs that are not subject to

management in batches (dialog A_SNR/ "E")

General / usage

Serial  numbers  are  assigned  in  ERP  when  creating  the  production  order.  At  the  interface  to  HYDRA,

assigned serial numbers are transferred as details for the order header and managed there.

The  OP  that  is  not  subject  to  management  in  batches  of  the  order  is  logged  on  and  respective  serial

numbers are recorded in the relevant quality (yield/scrap) at AIP.

The  serial  number  is  entered  manually  (e.g.  also  by  barcode  on  the  single  part)  by  the  AIP  user.  To

facilitate  data  collection,  the  serial  numbers  available  for  the  order  can  also  be  displayed  in  a  list.  Only

serial  numbers  may  be  logged  on  that  have  been  assigned  for  this  order.  Please  note  that  a  serial

number may exist as scrap only once.

The  quantity  recorded  for  the  order/OP  is  always  1  for  each  single  part  and,  depending  on  the  quality,

posted to the order's/OP's yield or scrap account.

Uploads  to  the  ERP  system  in  relation  to  the  serial  number  (goods  movements)  can  be  performed  for

recorded serial numbers/single parts.

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 1 of 6

Evaluation and Entry of Serial Numbers

Configuration

The  settings  required  to  use  the  function  for  collecting  serial  numbers  (without  orders  subject  to

management in batches) are described here.

Usage at AIP

Basic AIP view

The  user  applies  the  "serial  numbers"  dialog  (A_SNR).  The  relevant  function  key  is  configured  in  the

basic view of AIP.

Figure: Basic view with "serial number" function key (A_SNR)

Collection of serial numbers (A_SNR )

Serial number

The  user  enters  the  serial  number.  The  serial  number  must  be  part  of  the  order.  A  validation  check  is

performed. If the serial number is not part of the order or if it is already recorded with a result, it cannot be

used.

Clicking the function

 opens a selection list showing the "free" serial numbers of the order.

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 2 of 6

Evaluation and Entry of Serial Numbers

Requesting the selection list simultaneously updates the list of already recorded serial numbers.

Grid

The displayed  list shows all serial numbers in their relevant quality (yield/scrap) that have already been

entered.

  Scrap is displayed in red.

  Yield is displayed in green.

Quality

When  a  serial  number  is  entered,  it  has  to  be  assigned  a  quality.  You  may  choose  from  the  following

options:

  Yield

The serial number is entered with "yield" quality. The operation quantity is increased by yield = 1.

The default value is "yield".

  Scrap

The serial number is entered with "scrap" quality. The operation quantity is increased by scrap =

1.

  Scrap reason

If the "scrap" quality is entered, the user also has to enter or select a scrap reason.

Entry function

By clicking this function, the entered serial number is recorded with the selected quality.

List function

By clicking this function, the entire list of already entered serial numbers may be updated by the selected

quality (e.g. when the dialog is reopened).

Interrupt/terminate OP for orders with serial numbers (A_UN/A_AB)

Quantities  are  not  entered  when  operations  requiring  serial  numbers  are  logged  off. The  quantity  fields

are to be disabled in these dialogs.

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 3 of 6

Evaluation and Entry of Serial Numbers

1.2  Entry of serial numbers for OPs that are subject to

management in batches (dialog A_SNR)

General / usage

The following alternatives arise for entering and/or assigning serial numbers if an order/operation subject

to batch management is used to enter serial numbers:

o  Manual entry of the serial number that is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number that is assigned to a HYDAR batch number.

Configuration

The settings required to use the function for collecting serial numbers (with orders subject to management

in batches) are described here.

Usage at AIP

Collection of serial numbers (A_SNR ) including manual assignment of

serial numbers - type "E"

An  additional  batch  is  created  for  each  registered  serial  number  in  the  area  of  material  and  production

logistics if batch management requirement is enabled for the operation.

The relationship between the current output batch and the registered serial number is saved additionally

in  the  database  for  traceability  purposes.  In  this  case,  the  output  batch  is  considered  as  ID  without

inventory and, therefore, does not receive a quantity.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

The dialog for entering the serial number looks as described below. The serial number can be  entered.

Batches are assigned in the background.

Collection of serial numbers (A_SNR ) including automatic assignment of

serial numbers - type "G"

If the option "serial number requirement = G" is set for the operation, output batches will be recorded as

serial numbers. In this case, the serial number is the output batch number.

For OPs subject to batch management, the dialog and relevant entries are as follows:

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 4 of 6

Evaluation and Entry of Serial Numbers

The "serial number" field is disabled and includes the current output batch. Once the badge number has

been entered, posting can be performed by clicking "capture". If the entered quality is not "yield", a valid

scrap reason has to be entered.

Exactly  one  batch  with  quantity  1  is  created  for  each  serial  number  and  the  serial  number  is  the  batch

number.

The "list" function updates the list of already recorded serial numbers.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

Collection of serial numbers (A_SNR ) including automatic assignment of

serial numbers using the number range - type "S"

Serial numbers are recorded in relation to the batch if the option "serial number requirement = S" is set for

the  operation.  In  this  case,  the  operation  must  be  subject  to  management  in  batches.  Every  registered

serial number causes an output batch to be changed (CA_WL) creating a batch with quantity 1 regarding

the serial number in the MPL module.

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 5 of 6

Evaluation and Entry of Serial Numbers

The  server  determines  a  new  serial  number  and  displays  it  in  the  "serial  number"  field  by  clicking  the

function

.  The  new  serial  number  is  assigned  uniquely  for  the  whole  system  using  the  "SNR"

number range.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

Interrupt/terminate OP for orders with serial number tracking

Quantities  are  not  entered  when  operations  requiring  serial  numbers  are  logged  off. The  quantity  fields

are to be disabled in these dialogs.

AIP_SNR_Evaluation.docx

Version: 1.0.18468

Page 6 of 6

