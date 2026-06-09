Manual

Entry of Serial Numbers and
Batch Numbers
AIP-ESC 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Entry of Serial Numbers and Batch Numbers

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-ESC_81.docx

Version: 1.0.23049

Page 2 of 8

Entry of Serial Numbers and Batch Numbers

Contents

1  Entering Serial and Batch Numbers ............................................................. 4

2  Entering Serial and Batch Numbers ............................................................. 5

AIP-ESC_81.docx

Version: 1.0.23049

Page 3 of 8

Entry of Serial Numbers and Batch Numbers

1  Entering Serial and Batch Numbers

Purpose

The function enables the entry and management of batch and/or serial numbers of an order/operation that

is logged on.

Implementation considerations

You  should  use  the  function  package  if  you  also  wish  to  record  batch  and/or  serial  numbers  for  an

order/operation on AIP in the course of shop floor data collection.

Integration

This function can be used in the course of mere shop floor data collection (BDE).

Features

  Batch numbers can be entered in parallel to order/operation  log-ons (configurable per operation and

workplace)

  Validation check regarding documentation required for batches when logging on an operation (use of

operations requiring batch management)

  Recording of batch changes during order processing with indication of the batch numbers entered last.

  Entry of batch numbers via keyboard and/or barcode.

  Batch-related quantity and time entry

Posting dialogs are activated during HYDRA customizing (chargeable customization service).

AIP-ESC_81.docx

Version: 1.0.23049

Page 4 of 8

Entry of Serial Numbers and Batch Numbers

2  Entering Serial and Batch Numbers

Usage

When entering individual batches, another batch can be entered at the terminal in addition to the operation

and, depending on the production situation, may be defined as an input or an output batch.

Integration

Data  are  entered  as  part  of  the  shop  floor  data  collection  (BDE)  process.  The  type  H  BDE  log  records

resulting  from  the  data  entry  and  illustrating  the  individual  batch  postings  in  chronological  order  can  be

displayed or edited in the "order-related postings" application.

Prerequisite

The following configurations are mandatory:

HYDRA basic settings

Using  the  "Create  unknown  batches"  option  in  the  HYDRA  basic  settings  ("MPL"  tab),  a  batch  can  be

created automatically at the terminal by entering the batch number.

If automatic batch generation is not active, the batches must be created manually in HYDRA, since HYDRA

will perform a validation check regarding the existence of a batch when batches are posted at the BDE

terminal.

Manual batch generation can be activated through an interface or Client application after consultation with

MPDV (not included in this license).

Terminal assignment

Batch entry may only be activated on machines assigned to terminals of the BDE and/or MDE operation

mode.

Workplace/ Resource configuration

"Workplace configuration" tab   "MPL" category    "Batch management" category   select  "Individual

batch tracing".

Operations  not  requiring  batch  management  can  also  be  logged  in  at  machines  using  batch

management. In this case, entry of the batch number is not required. Please note that this is only

possible for so-called workflow posting dialogs.

Operation data

For entry, the operation must be identified as requiring batch management.

AIP-ESC_81.docx

Version: 1.0.23049

Page 5 of 8

Entry of Serial Numbers and Batch Numbers

The "Batch management requirement" flag can  be preset by the  ERP system (e.g.  interface: HY72PPS

Segment: HY72_AG_HD_001 (operation) field: OPT:CNR), or else set manually using the editing function

in the MOC (presumes proper licensing/authorization).

Attempting  to  log  on  an  operation  requiring  batch  management  at  a  workplace  without  active

batch management will be refused by indication of a validation error.

Logging on an operation requiring batch management

The  operation  is  selected  in  the  "Select  operation"  tab.  The  status  of  the  workplace/machine  can  be

modified in the next tab, "Select status". This tab is only available at "single user workplaces".

AIP-ESC_81.docx

Version: 1.0.23049

Page 6 of 8

Entry of Serial Numbers and Batch Numbers

The batch number and the staff badge number are entered in the "Batch entry/confirmation" tab. For this

purpose, an alphanumeric batch number with a maximum of 20 digits must be entered. It can be entered

either manually or by barcode.

Changing batches at the terminal

While the operation requiring batch processing is logged on, you can switch to a new batch by means of

the "Change of batches" function key.

The production data (quantities produced and duration) are posted to the operation and the current batch

simultaneously.

AIP-ESC_81.docx

Version: 1.0.23049

Page 7 of 8

Entry of Serial Numbers and Batch Numbers

The  new  batch  number  can  be  entered  manually  via  the  keyboard  or  by  barcode.  As  is  the  case  when

logging on an operation, the person  implementing the batch change must possess BDE authorization in

order to post the operation.

Please note

The  batch  currently  logged  on  can  be  displayed  in  the  OP  info,  provided  it  was  integrated  into  the

appropriate dialog by customizing. Please note that this field can only be displayed either system-wide or

specifically for a terminal group. It is not possible to show/hide the field based on a dialog control defined

at the workplace as well as in the input field.

Scrap quantities recorded via the "Partial confirmation" (A_TR) dialog are posted to the order, but

not to the batch. As a consequence, such quantities are not included in the log record type "H",

either.

AIP-ESC_81.docx

Version: 1.0.23049

Page 8 of 8

