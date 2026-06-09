Single Batch Entry at AIP

1  Single Batch Entry at AIP

Usage

When entering single batches at the terminal, another batch can be entered in addition to the operation,

which, depending on the production situation, can be defined as either an input or an output batch.

Integration

The data is entered as part of the shop floor data collection (BDE) process. The BDE type H log records

resulting  from  the  data  entry  that  represent  the  individual  batch  postings  in  chronological  order  can  be

displayed or edited in the application "Order-related postings".

Prerequisite

The following configurations are mandatory:

HYDRA basic settings

By  checking  the  “create  unknown  batches“  option  in  the  “MPL”  tab  of  the  HYDRA  basic  parameter

settings, a batch can be created automatically, once the batch number has been entered at the terminal.

In case the function for automatic batch generation is disabled, the batches need to be created manually

in HYDRA. As HYDRA checks whether or not the batch is available when logging batches on to the shop

floor terminal. Upon consultation with MPDV, the function for manual batch generation can be enabled by

interface or client application (not included in this license).

Terminal assignment

Batch recording may only be enabled for machines that are assigned to terminals of the operation mode

BDE and/or MDE.

Workplace/ resource configuration

Index  tab  "Workplace  configuration"    category  "MPL"    option  "Batch  management"    Selection

"Individual batch tracing (CHV)".

Operations  not  requiring  management  in  batches  can  also  be  logged  on  to  machines  using

batch management. In that case, the batch number does not have to be input. Please note that

this is only possible in so-called workflow posting dialogs.

Operation data

To be entered, the operation must be identified as requiring batch management.

AIP-TRT-CLV.docx

Version:

Page 1 of 2

Single Batch Entry at AIP

The flag "Batch management requirement" can be  preset by the  ERP system (e.g.  interface: HY72PPS

Segment:  HY72_AG_HD_001  (operation)  field:  OPT:CNR),  or  else  set  manually  using  the  Editing

function in MOC (presumes proper licensing/authorization).

Attempting  to  log  on  an  operation  requiring  batch  management  at  a  workplace  when  batch

management is not active is refused with an error.

Logging on an operation requiring batch management

The operation  is selected  under the  index tab  "Select operation". The status of the  workplace/ machine

can  be  modified  in  the  next  index  tab  "Select  status".  This  index  tab  is  available  only  at  "single  user

workplaces".

The  batch  number  and  the  staff  badge  number  are  entered  under  the  index  tab  "Batch  entry/

confirmation".  For  this  purpose,  an  alphanumeric  batch  number  with  a  maximum  of  20  digits  must  be

entered. It may be entered either manually or by barcode.

Changing batches at the terminal

While the operation requiring batch processing is logged on, you can switch to a new batch by using the

"Change of batches" function key. The production data (quantities produced and duration) are posted to

the operation and the current batch simultaneously.

The new number can be entered manually from the keyboard or by barcode. As is the case when logging

on an operation, the person implementing the change of batches must possess the BDE authorization to

post the operation.

Please note

The batch currently  logged on can be displayed in the OP  info, provided that during customizing it  was

integrated into the dialog accordingly. Please note that this field can only be displayed either system-wide

or  specifically  for  a  terminal  group.  It  is  not  possible  to  show/  hide  the  field  based  on  a  dialog  control

defined at the workplace or in the entry field.

Scrap quantities collected by the dialog "partial upload" (A_TR) are posted onto the order, but

not to the batch. Consequently, these quantities are not included in the generated type "H" log

record.

AIP-TRT-CLV.docx

Version:

Page 2 of 2

