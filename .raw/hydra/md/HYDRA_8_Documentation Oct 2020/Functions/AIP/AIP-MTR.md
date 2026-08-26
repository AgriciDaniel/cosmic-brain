Input Functions Relating to Batches

1

Input Functions Relating to Batches

1.1  Basic screen

Basic terminal screen when a machine is assigned in batch mode:

The  basic  display  shows  the  third  list  "Input  materials  currently  logged  on"  for  machines  for  which  the

“batch management” option is configured. This list shows all active input batches of the selected machine.

1.2  Order postings for operations subject to batch management

OP logon with input batches

By clicking the "log OP on" button a workflow including two tabs is opened. The operation to be logged on

is selected in the first tab “select operation”.

The “log operation on” tab is reached by clicking the “Next” button where in addition to the selected OP,

the defined material components are displayed in a list.

AIP-MTR.docx

Version: 1.3.18468

Page 1 of 19

Input Functions Relating to Batches

By entering a batch number in the "input batch" field and clicking the "report batch" function a batch may

be logged on as input material for a component. During the entry process, the terminal checks whether or

not the batch number is known in the system and may be logged on. This is described in detail within the

“input batch change" section.

“Batch” field

When  an  OP  is  logged  on,  a  batch  number  is  created  simultaneously  for  the  next  output  batch  to  be

produced.  The  batch  number  may  be  assigned  automatically  or  manually  (please  also  see  machine

master settings  --> MPL tab). The generated batch is created with the batch number in the system and

set to the "running" status.

Provided that all required input materials are logged on, the OP may be started via the "OK" button in the

"OP  logon"  dialog.  Whether  input  material  has  to  be  logged  on  or  not,  can  be  defined  in  the  assigned

material type of the component.

Once  the  OP  has  been  logged  on  successfully,  all  active  input  batches  of  the  selected  machine  are

displayed in the material list.

As of HYDRA-MPL product version 7.2.5:

If batches are logged on along with the OP and the user cancels the process or cannot log the OP on due

to a plausibility check the input batches will be logged off automatically for this OP. In this case, batches

are always logged off without indicating the consumption quantity.

By way of the following warning message, the user may confirm the logoff process:

The  function  that  logs  input  batches  off  automatically  can  be  activated/deactivated  by  a  button  in  the

hytnrcfg.ini file:

HYTNRCFG.INI

[MPL-Options 0/2xxx]
ForceAutoLogOffInputBatches=0

Please note: This is only available as of HYDRA-MPL product version 7.2.5 and CTAIP version 2.0.2.3.

Logoff/interruption of OPs

A running OP may be interrupted or logged off by clicking the "logoff/interrupt OP" button. Then a dialog

opens, where the following selection can be made:

AIP-MTR.docx

Version: 1.3.18468

Page 2 of 19

Input Functions Relating to Batches

If "log OP off" is clicked the logoff dialog opens that contains the same input fields like the "output batch

change" dialog (see next section).

Thus, the output batch that is currently still active is completed, when OPs are interrupted or logged off.

1.3  Postings based on batches

Input batch change

Input material can be changed for a running OP if the "input batch change" button is clicked.

Log input batch off

Input  batches may  be changed  by  entering  a currently  active  batch number or by  entering a new batch

number. When logging batches off, it is also possible to enter the status and consumption of the batch to

be logged off.

Options when logging input batches off:

F1 - PROCESSED

The batch is set to the "processed" status and the remaining quantity that is still available is set to 0. A

consumption posting is generated as goods issue for the current, remaining quantity.

F2 - BLOCKED

The batch is set to the "blocked" status. A consumption entered additionally is deducted from the current,

remaining quantity as goods issue.

F3 - with remaining quantity

The  batch  is  set  to  the  "free"  status.  A  consumption  entered  additionally  is  deducted  from  the  current,

remaining quantity as goods issue. If the remaining quantity that is still available becomes <= 0, the batch

status automatically switches to "processed".

AIP-MTR.docx

Version: 1.3.18468

Page 3 of 19

Input Functions Relating to Batches

Consumption

The entered consumption (unit of the input material) is deducted from the remainder of the batch and a

goods movement is generated.

Comment on batch

The entered comment is saved as information for the batch.

Log input batch on

Provided that the batch is known, batch data are displayed in an intermediate dialog where the logon may

be confirmed.

Provided that the batch could be logged on, it is taken over to the material list in "customer batch number"

and thus the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by the following error message:

Logon of unplanned input material

In  addition  to  planned  materials,  it  is  also  possible  to  log  “unplanned”  material  on  for  an  OP,  using  an

additional feature at the component of the OP. If the "replaceable" option is set to "J" the user is able to

assign  the  respective  component  manually,  when  batches  are  logged  on.  However,  the  logon  is  only

allowed if the material type of the input batch corresponds to that of the component.

Within  the  selection  list  the  components  are  filtered  according  to  the  material  number  and  displayed  as

follows:

Logon of unknown batches

An  input  batch,  which  is  not  yet  known  in  HYDRA,  may  be  logged  on  for  an  OP  using  the  "creating

unknown batches" option in the basic settings of HYDRA (in BDE --> settings 2 tab):

AIP-MTR.docx

Version: 1.3.18468

Page 4 of 19

Input Functions Relating to Batches

In  this  case,  it  is  searched  for  a  valid  assignment  of  input  material  to  the  material  type  of  the  selected

component,  when input batches are logged on. Provided that a corresponding assignment is found and

the "allow entry of unknown input batches" option is configured in the "input batch processing" tab at the

material type, the batch is generated by logging it on to the system and set to the "running" status at the

same time. The batch is initially created in a quantity of 1.000.000.000.

Output batch change

Output material may be changed for a running OP using the "output batch change" button.

The input batches that are logged on are displayed with their available remaining quantity in a list within

the output batch change dialog. The following data may be entered:

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine is

pre-assigned as default value.

Transport unit

A transport unit defined within the system may be assigned here. The selection refers to transport units

that were assigned to the material type of the OP.

Comment on batch

In this field a comment may be saved for the batch to be produced.

Quantity

The batch to be produced is posted with the quantity entered here. The quantity is taken over as primary

quantity of entry to the order and machine and a goods movement is generated as goods receipt.

Quality

A  batch  may  be  classified  as  yield  or  scrap  quantity.  The  system  posts  yield  batches  with  the  "free"

status.  Scrap  batches  automatically  get  the  "blocked"  status.  When  scrap  is  selected,  a  valid  scrap

reason has to be assigned.

"Preceding batches" function key:

This button opens a list with output batches which have already been produced for this OP.

AIP-MTR.docx

Version: 1.3.18468

Page 5 of 19

Input Functions Relating to Batches

"Change inp. batch" function key:

Using this button the user can switch to the "input batch change" function.

New batch

When  a  current  output  batch  is  completed,  a  new  batch  number  is  simultaneously  created  for  the  next

batch. The batch number may be assigned automatically or manually. The batch generated in this way is

created with the batch number in the system and set to the "running" status.

Entry of additional batch attributes

Several  additional  batch  attributes  may  be  recorded  for  a  material  type  by  the  configuration  MPL  -->

Master data --> Attributes.

In  case  attributes  are  defined  to  be  recorded  at  the  terminal  for  the  material  type  of  the  running  OP,

another  input  dialog  is  opened,  when  the  output  batch  is  changed.  The  dialog  opens  additionally  after

clicking OK in the output batch change function, interrupt OP and finish OP function.

Example when two additional attributes are collected:

Using batch attributes, numeric and alphanumeric values may be recorded which are then saved for the

produced batch in an additional table.

Enter goods receipt batch

A new goods receipt batch may be created in the system by the "enter GR batch" button.

Having clicked the "OK" button, the batch is created and the dialog remains open for further entries.

Batch numbers may be  generated automatically  or manually depending on the  configuration. Moreover,

the following data are saved at the batch.

Workplace

Machine where the batch was recorded

Operation

AIP-MTR.docx

Version: 1.3.18468

Page 6 of 19

Input Functions Relating to Batches

Order where the batch was recorded

Material

Material number of the batch

Quantity and unit

The batch is created with the quantity and unit entered here. A goods receipt is posted with this quantity.

Quality

A  batch  may  be  classified  as  yield  or  scrap  quantity.  The  system  creates  yield  batches  with  the  "free"

status. Scrap batches automatically get the "blocked" status and the batch class "scrap". When scrap is

selected, a valid scrap reason relating to the corresponding workplace has to be assigned.

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine is

pre-assigned as default value.

Transport unit

A transport unit defined within the system may be assigned here.

Comment on batch

A comment may be saved for the goods receipt batch in this field.

Repost batch

Using the "repost batch" button, an existing batch may be reposted to another material buffer.

Having  clicked  the  "OK"  button,  the  batch  is  rebooked  to  a  new  material  buffer  and  the  dialog  remains

open for further entries.

As an alternative, the batch can also be reposted from yield to scrap.

1.4  Throughput batch mode

AIP-MTR.docx

Version: 1.3.18468

Page 7 of 19

Input Functions Relating to Batches

A HYDRA machine may also be configured in "throughput batch mode". In throughput batch mode input

material is continued being processed with unchanged number (throughput batch number) via an OP.

The entry functions for throughput batch processing at the terminal are identical to those for active batch

tracing at the machine.

Please note/restriction: At machines with “throughput batch mode” it is impossible to log operations on

at the same time.

1.5  Manual partial upload in HYDRA-MPL environment

Using the manual partial upload function of HYDRA-ADE (A_TR dialog), it is possible to record a partial

quantity for the current operation and thus for the active output batch.

The  following  performance  as  regards

the  entry  of  quantities  results

from  a  manual  partial

upload/confirmation:

  Scrap is only transferred to the active operation and not to the output batch

  Yield is accumulated on the current output batch



In  this  case,  log  records  of  the  record  type  “H“  are  also  generated  when  the  shift  changes,

provided that yield has been recorded beforehand.



In  case  yield  has  already  been  recorded  as  partial  quantity  for  an  output  batch,  it  is  no  longer

possible  to  log  the  batch  off  as  scrap,  when  the  output  batch  is  changed  the  next  time.  In  this

case,  the  batch  assigned  to  the  “yield”  class  has  first  to  be  completed,  before  scrap  can  be

posted.

Effects on available retrograde material components are as follows:

  When a total quantity is recorded, scrap is not deducted in a retrograde manner

  When yield/scrap is recorded, withdrawal also takes place when it comes to scrap

  Negative values, which might result from quantity offsetting, are not considered

The following notes and restrictions are to be taken into account:

  Personal partial uploads (with P_AB) are not taken into account

AIP-MTR.docx

Version: 1.3.18468

Page 8 of 19

Input Functions Relating to Batches

  Scrap  quantities  are  only  uploaded  to  a  PPS  system,  provided  that  the  interface  has  been

configured for the “upload of partial confirmations”

  At the moment it is only supported to post quantities of the “yield” and “scrap” accounts.

  The  partial  upload  itself  does  not  trigger  a  goods  movement.  This  is  only  the  case,  when  the

output batch has been completed.

  The checks relating to the input quantity and the display within the consumption balance cannot

be  used  together  with  the  "collect  input  quantity  in  relation  to  batches"  configuration  within  the

material  type,  as  the  current  output  batch  is  not  completed  for  partial  quantities.  This  affects,

among other things, the collection of serial numbers with batches (MPL-SNR).

1.6  Display of produced output batches

Using  the  third  list,  it  is  possible  to  display  the  output  batches  produced  for  a  running  operation  that  is

subject to batch management within the machine master at the terminal.

A  maximum  number  of  20  output  batches  is  displayed  for  each  machine  in  the  list.  Yield  and  scrap

batches are shown, which have been produced at this terminal since output batches were changed.

As this list is only kept locally by the respective terminal, it is not synchronized with the server, when AIP

is started.

The list includes, among others, the article, article designation, batch number, date, time, quantity, batch

class,  user  fields  and  alternative  batch  numbers.  Individual  fields  might  not  be  assigned  values,  which

depends on the input scenario when generating output batches.

Configuration:

List contents can be configured via the [ MNR_AMAT.LST ] section in the ctaiplay.ini file.

Example:

CTAIPLAY.INI

[ MNR_AMAT.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=ROW.IDX=-
GRID_CAPTION=produced output batches

AIP-MTR.docx

Version: 1.3.18468

Page 9 of 19

Input Functions Relating to Batches

EXAMINE_SCANEXPR1=KLASSE=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=KLASSE=A
EXAMINE_SCANCOLOR2=clRed

; ROW.IDX=N10,50,R,Row
CNR=C20,150,L,batch number
;CNR=*CNR,batch
ATK=C25,125,L,article
; ATK=*ATK
; KLASSE=C3,40,Z,*
MENGE=N12.0,70,R,quantity
EINH=C3,30,Z,ME
DAT=dd.mm.yyyy,70,L,date
ZEI=hh:mm:ss,60,L,time
ATKBEZ=C30,200,L,article designation

Display as third list:

Figure: Display of produced output batches

Using the

 button, the user can switch to the display of output batches.

Server-based comparison of produced output batches

As  of  the  AIP  program  version  V#  2.0.2.54  the  list  of  produced  output  batches  of  a  machine  can  be

synchronized with the server using a cyclic comparison function.

The server comparison [Technically: PDM list 13 with MOD=P] is enabled by the configuration within the

customized configuration file ”ctlisten.ini“.

Output batches recorded within the last three days at this terminal are only compared.

1.7  Batch information

Batch information is displayed in a dialog, when the “batch info” button is clicked.

1.8  Display of consumption balance

When logging an OP off, the “consumption balance” (V_BLZ dialog) may be displayed, which has to be

configured via the machine and the material type of the operation.

AIP-MTR.docx

Version: 1.3.18468

Page 10 of 19

Input Functions Relating to Batches

The  consumption  balance  is  shown,  provided  that  this  option  has  been  activated  at  the  machine  and

material type.

The consumption balance shows the material consumption based on batches and the user is able to log

running batches off.

Configuration:

Figure: Consumption balance – V_BLZ

A  special  configuration  (function  =  “DLG=V_BLZ;BREAK-ON-CANCEL“)  has  to  be  defined  for  the  OK

button of the logoff dialog (e.g. A_AB_MPL) to make sure that the consumption balance is started, when

the OP is logged off.

Sample configuration of the OK button for starting the consumption balance:

Figure: Example for the OK button configuration including consumption balance

Display of consumption postings

The “show details” function allows for the consumption quantities, which have been collected so far, to be

displayed.

Figure: Display of consumption quantities – V_BLZ_DTL

Logging input batches off

By way of the “log batch off” function, the user can choose a currently running batch from the list and log

it off by entering the consumption.

Figure: Log batch off – V_BLZ_CEAB

1.9  Advance logon of input batches

AIP-MTR.docx

Version: 1.3.18468

Page 11 of 19

Input Functions Relating to Batches

The  AIP  terminal  provides  the  following  dialogs  or  functions  to  log  input  batches  on  in  advance.  The

function “advance logon of input batches” has been designed to be able to “set up” and log on the next

input batch, while another OP and input batch are currently running. This next input batch is not yet active

but assigned the flag “logged on in advance”.

An input batch can be logged on in advance for a currently running OP or for a prepared OP.

General

Usage

The  process  might  require  an  input  batch  to  be  logged  on  in  advance  and  set  up  accordingly  on  a

machine, while the preceding input batch is still being used for a material.

This  situation  frequently  occurs  at  very  large  machines  processing,  for  example,  roles  or  belts  that  are

uncoiled as input batch at the beginning of the machine and coiled up as output batch at the end of the

machine.

As the users are mostly busy with activities at the end of the machine at the time when the input batch

actually  needs  to  be  changed,  they  cannot  perform  the  input  batch  change  and,  as  a  result,  they  are

provided with the opportunity to log the next input batch on already in advance for an order/OP.

Then the input batch can  actually be changed by  logging a new OP on or a project-specific call can be

established.

Configuration

The settings required for using the function “advance logon of input batches” is described here.

Process/procedure

The procedure for using the function “advance logon of input batches“ or the logical process is described

here.

AIP usage

AIP basic screen

The  basic  AIP  screen  shows  the  function  key  “Advance  logon  of  input  batch”  (preregistration  of  input

batch). The dialog for logging input batches on in advance may be used by clicking this function key.

AIP-MTR.docx

Version: 1.3.18468

Page 12 of 19

Input Functions Relating to Batches

Advance logon of input batches (CE_VWL_MPL)

The user selects the workplace to which an input batch is to be logged on in advance in the basic screen.

The  below  dialog  (CE_VWL_MPL)  opens  by  clicking  the  function  key  ”Advance  logon  of  input  batch”

(preregistration of input batch).

If an operation is currently running/logged on to the workplace, this one will be selected by default.  The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch”.

At first the input batch is checked for validity (dialog CE_VAN). The material number of the input batch is

checked against the material number of the component list or the BOM item. The input batch is logged on

in advance, once the button “log input batch on in advance” has been clicked.

Finally,  the  input  batch  that  has  been  logged  on  in  advance  is  displayed  in  purple  in  the  BOM  of  the

component. The dialog is exited by the “cancel” key.

Show third list

Besides the logged on/running input batches, the third list of the basic screen also shows the input batch

that has been logged on in advance and highlights it in purple.

Consequently,  a  BOM  item  can  use  a  logged  on/running  input  batch  and  an  input  batch  logged  on  in

advance at the same time.

Log off batch logged on in advance

The  dialog  “advance  logon  of  input  batches“  also  provides  the  opportunity  to  log  off  or  reset  an  input

batch that has been logged on in advance.

To  do  so,  the  input  batch  that  has  been  logged  on  in  advance  is  selected  once  more  and  the  user

confirms the button “post batch“.

The input batch is logged off by the dialog CE_VAB.

AIP-MTR.docx

Version: 1.3.18468

Page 13 of 19

Input Functions Relating to Batches

Log on input batch logged on in advance with OP

When  logging  a  prepared  operation  on,  an  input  batch  that  already  has  been  logged  on  in  advance  is

shown for a BOM item. The input batch that has been logged on in advance is logged on automatically by

logging the operation on.

If, however, another input batch is logged on for this BOM item, the input batch logged on in advance is

kept for the running OP.

When an OP is logged off/interrupted, all input batches logged on in advance are also logged

off/reset automatically.

1.10  Recording of serial numbers

Serial numbers are assigned to be able to distinguish between individual items of material. Consequently,

the combination of material number and serial number uniquely identifies an individual item.

MES provides several variants including different features to record serial numbers:

  Variant  1:  Entry  of  serial  numbers  for  OPs  that  are  not  subject  to  batch  management  (dialog

A_SNR/“E“ only)

  Variant 2: Entry of serial numbers for OPs that are subject to batch management (dialog A_SNR)

o  Manual input of the serial number. It is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number. It is assigned to a HYDRA batch number

1.10.1  Entry of serial number for OPs that are not subject to

batch management (dialog A_SNR/ “E“)

General/utilization

Serial numbers are assigned in ERP when creating a production order. The assigned serial numbers are

transferred  as  detailed  information  for  the  order  header  where  they  are  managed  accordingly  in  the

interface to HYDRA.

The  OP  of  the  order  that  is  not  subject  to  batch  management  is  logged  on  and  the  relevant  serial

numbers are recorded with the relevant quality (yield/scrap).

AIP-MTR.docx

Version: 1.3.18468

Page 14 of 19

Input Functions Relating to Batches

The serial number is entered manually (e.g. also barcode for the individual item) by the user on AIP. To

simplify data collection, the serial numbers that are still available for the order are shown in a list where

they can be selected. Please note that a serial number can occur as scrap only once.

The  quantity  recorded  for  the  order/OP  is  always  1  for  each  individual  item  and  is  posted  onto  the

relevant yield or scrap account of the order/OP subject to the quality.

Uploads  (goods  movements)  relating  to  serial  numbers  can  be  transferred  to  the  ERP  system  for

recorded serial numbers/individual items.

Configuration

The required settings for using the function “collection of serial numbers” (without orders that are subject

to management in batches) are described here.

Procedure

The  procedure  for  using  the  function  “collection  of  serial  numbers”  (without  orders  that  are  subject  to

management in batches) or the logical process are described here.

Utilization with AIP

Basic AIP screen

The  operator  uses  the  dialog  “serial  numbers”  (A_SNR).  The  relevant  function  key  is  configured  in  the

basic view of AIP.

AIP-MTR.docx

Version: 1.3.18468

Page 15 of 19

Input Functions Relating to Batches

Figure: Basic view including function key “serial number“ (A_SNR)

Entry of serial numbers (A_SNR )

Figure: Entry of serial numbers on the terminal (A_SNR/ “E“)

Serial number

The user enters the serial number. The serial number has to be part of the order. A validation check takes

place. If the serial number is not part of the order or if it already has a result (already recorded) it cannot

be used.

By clicking

, a selection list showing the “free“ serial numbers for the order is displayed.

Requesting  the  selection  list  simultaneously  updates  the  list  of  serial  numbers  that  have  already  been

recorded.

Grid

The displayed list shows all serial numbers that have already been entered including their relevant quality

(yield/scrap).

  Scrap is shown red

  Yield is shown green

Quality

AIP-MTR.docx

Version: 1.3.18468

Page 16 of 19

Input Functions Relating to Batches

If a serial number is entered, it has to be assigned quality. The following can be chosen:

  Yield

The serial number is entered with the quality “yield”. The operation quantity is increased by yield

= 1. The default value is “yield”.

  Scrap

The  serial  number  is  entered  with  the  quality  “scrap”.  The  operation  quantity  is  increased  by

scrap quantity = 1.

  Scrap reason

If the quality is entered as scrap the user also has to enter or select a scrap reason.

“Capture“ function

By clicking this function, the entered serial number is recorded with the selected quality.

“List“ function

By  clicking  this  function,  the  entire  list  of  serial  numbers  that  have  already  been  entered  including  the

selected quality can be updated (e.g. if the dialog is opened anew).

Interrupt/finish OP for orders with serial numbers (A_UN/ A_AB)

Quantities are not entered when operations subject to management in serial numbers are logged off. The

quantity fields have to be disabled in these dialogs.

1.10.2  Entry of serial numbers for OPs subject to management

in batches (dialog A_SNR)

General/utilization

If  an  order/operation  subject  to  management  in  batches  is  used  to  enter  serial  numbers,  there  are  the

following alternatives to enter or assign the serial numbers for data collection:

o  Manual input of the serial number. It is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number. It is assigned a HYDRA batch number

Configuration

The required settings to use the function “collection of serial numbers” (without orders that are subject to

management in batches) are described here.

AIP-MTR.docx

Version: 1.3.18468

Page 17 of 19

Input Functions Relating to Batches

Procedure

The procedure to be able to use the function “collection of serial numbers” (without orders that are subject

to management in batches) or the logical process are described here.

AIP usage

Entry of serial numbers (A_SNR ) including manual assignment of serial

numbers – characteristic “E“

If  batch  management  requirement  is  enabled  for  the  operation,  a  batch  is  created  additionally  for  each

serial number in the material and production logistic.

Consequently,  the  relation  between  the  current  output  batch  and  the  serial  number  posted  in  the

database are saved for tracing. In this case, the output batch is considered as ID without quantity and, as

a result, it does not have a quantity.

Batch attributes that might be required to be recorded for OPs handled in batches are recorded by way of

the commonly used standard dialog before sending.

The  “collection  of  serial  numbers“  dialog  is  structured  as  described  below.  The  serial  number  can  be

entered. Batch assignment is performed in the background.

Entry of serial numbers (A_SNR ) including automatic assignment of serial

numbers – characteristic “G“

By  using  the  option  “serial  number  requirement”  =  “G”  for  the  operation,  output  batches  are  entered  as

serial number. In this case, the serial number is the output batch number.

The field “serial number“ is disabled and includes the current output batch.  Posting is possible, once the

badge number has been entered by the function “capture”. An applicable scrap reason has to be entered,

provided that a “quality indicator” unequal to “yield” has been chosen.

Exactly one batch  with quantity  1  is created for each serial number and the serial number matches the

batch number in this case.

The function “list“ updates the list of serial numbers that have already been recorded.

Batch  attributes  that  might  be  required  to  be  entered  for  OPs  handled  in  batches  are  recorded  by  the

common standard dialog before sending.

AIP-MTR.docx

Version: 1.3.18468

Page 18 of 19

Input Functions Relating to Batches

Entry of serial numbers (A_SNR) including automatic assignment of serial

numbers by the number range - characteristic - ”S“

Serial numbers in relation to a batch are recorded by the option “serial number requirement” = “S” at the

operation.  For  this  purpose,  the  operation  needs  to  be  subject  to  batch  management.  An  output  batch

change (CA_WL) is triggered every time a serial number is posted. This output batch change creates a

batch with quantity 1 for the serial number in MPL.

By  clicking  the  function

a  new  serial  number  is  determined  on  the  server  and  shown  in  the  field

“serial number”. The new serial number is assigned uniquely for the entire system by the number range

SNR.

Batch attributes that might be required to be entered for OPs handled in batches are  recorded by using

the standard dialog before sending.

Interrupt/finish operation for orders including serial number tracking

Quantities are not entered when operations subject to management in serial numbers are logged off. The

quantity fields are to be disabled in these dialogs.

AIP-MTR.docx

Version: 1.3.18468

Page 19 of 19

