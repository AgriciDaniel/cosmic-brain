Configuration for Serial Number Recording

Configuration for Serial Number Recording

Requirements

The following prerequisites/restrictions are to be observed:



In serial number recording, only a limited compensation of quantities is possible:

o

for  serial  number  recording  with  scrap,  no  compensation  with  scrap  must  be  configured  for

the yield quantity account.

o

for serial number recording with yield, no compensation with yield must be configured for the

scrap quantity account.

  The entry of non-integer quantities is not permissible in connection with serial number recording.

  The serial number recording is only supported for yield or for scrap.

  Posting  quantities  is  prevented  by  dialog  control  in  the  standard  dialogs  "Interrupt  operation",  "Log

operation  off"  and  "Partial  confirmation"  and/or  "Output  batch  change",  according  to  the  machine

mode. Quantities on OPs requiring serial numbers should therefore only be posted via the new dialog

"A_SNR" serial number recording.

General

The  type  of  serial  number  generation  in  HYDRA  is  primarily  controlled  by  the  "Serial  no.  obligation"

identifier on the operation.

The identifier is set:

  directly on the operation, if the order/operation information from ERP are transferred or retrieved

from a work plan.

  at the order type which then sets the option upon creation of an operation.

The following three options regarding serial number obligation are generally supported.

Serial  number  obligation
option
on operation

Description

E

Manual entry of serial number (on the basis of entered serial numbers
on order)

The  serial  number  can  be  recorded  by  manual  entry  or  bar  code.  A
plausibility check regarding the order is performed.

Setup_SerialNumbers.docx

Version: 1.0.1

Page 1 of 7

G

S

Configuration for Serial Number Recording

If  the  order  also  requires  batch  management,  an  output  batch  is
generated  (in  the  background)  for  the  serial  number  and  the  serial
number is assigned to the output batch.

Automatic generation of serial number
The  serial  number  is  automatically  generated  through  batch  number
assignment. A serial number corresponds to an output batch.

-  Can only be used with OPs requiring batch management
Is always posted with the Output batch change command
-

Generation of serial numbers using number ranges
The  serial  number  is  requested  and  generated  through  the  SNR
number range at the HYDRA server

-  Can only be used with OPs requiring batch management
-  Serial number is assigned to the current output batch
-

Is always posted with the Output batch change command

Configuration with Orders not Requiring Batch Management

The  configurations  required  for  using  and  activating  the  setup  function  for  the  manual  entry  of  serial

numbers for orders/operations not requiring batch management on the AIP are described below.

Configuration on the Machine

The machine is not configured accordingly in batch mode.

The following identifiers are set in the workplace configuration  MPL:

  Batch management = N

  Automatic generation of batch number = N

Configuration on Order Type

In the order type of operations with batch number obligation, the dialog control = SNR must be entered.

The operations are not identified as requiring batch management.

For OPs not requiring batch management, the following settings are made on the OP with regard to

"Serial no. obligation":

Setup_SerialNumbers.docx

Version: 1.0.1

Page 2 of 7

Configuration for Serial Number Recording

SERIENNR_PFLICH
TIG

OPT:S
NR

CHAR(1)  Serial number obligation

Identifier  which  controls  whether  the  order  has  serial  number
obligation and how it is entered/processed:
"E" = Manual entry of SNR

From  which  OP  the  serial  number  has  to  be  entered  is
controlled  by  the  "Seriennummern_pflichtig"  (Serial  number
obligation) identifier at the processing code.

SERIENNR_VERGA
BE

OPT:S
NRVER
G

CHAR(1)  Determines  how  serial  numbers  are  assigned  (this  field  is  only

relevant if SERIENNR_PFLICHTIG <> "  "/"N"):
P = Serial numbers are transferred by the PPS system

Configuration at Processing Code

Field

Acronym

Type

Description

SERIENNR_PFLICHT  OPT:SNR=<>

CHAR (1)

Serial number obligation

If  this  identifier  is  set,  this  means  that  from  this
operation on, postings must be by serial number.

Y  Yes,

irrespective  of  whether  serial

numbers were transferred or not

N  No,  even

if  serial  numbers  were

transferred.

Y/ N can thus be used to control from which

operation an order requires a serial number.

Dynamic Dialog Configuration

The following configurations are prerequisite:

  Entry at the terminal is made via the dynamic dialog A_SNR which must exist in the system.

  The  dialogs  for  Interrupt  OP/Terminate  OP  (A_UN/A_AB,  A_UN_MPL,  A_AB_MPL)  must  be

adapted in such a manner that the quantity fields are hidden by the dialog control SNR.

Layout Configuration at Terminal

Display of entered serial numbers in A_SNR dialog:

CTWINLAY.INI

[ A_SNR.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9

Setup_SerialNumbers.docx

Version: 1.0.1

Page 3 of 7

Configuration for Serial Number Recording

GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=DAT=-|ZEI=-|SNR

EXAMINE_SCANEXPR1=BEL=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=BEL=A
EXAMINE_SCANCOLOR2=clRed
EXAMINE_SCANEXPR3=BEL=P
EXAMINE_SCANCOLOR3=clBlue
EXAMINE_SCANEXPR4=BEL=N
EXAMINE_SCANCOLOR4=clNavy

SNR=C20,90,L,Seriennummer
BEL=C1,30,Z,Kl.
GR=N8,40,R,Grund
GRTXT=C70,150,L,Grundtext
DAT=dd.mm.yyyy,70,Z,Datum
ZEI=hh:mm:ss,70,Z,Zeit

Display of existing serial numbers in the selection:

CTWINLAY.INI

[ Serial numbers ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=SNR

DY1=C1,50,Z
SNR=C20,250,L,Seriennummer
DY2=C1,10,Z
BEL=C1,50,Z,Klasse

Configuration with Orders Requiring Batch Management

The  configurations  required  for  using  and  activating  the  setup  function  for  the  manual  entry  of  serial

numbers  or  for  the  automatic  generation/entry  of  serial  numbers  for  orders/operations  requiring  batch

management on the AIP are described below.

Configuration on the Machine

The machine is not configured in batch mode.

Setup_SerialNumbers.docx

Version: 1.0.1

Page 4 of 7

Configuration for Serial Number Recording

The following identifiers are set in the workplace configuration  MPL:

  Batch management = N

  Automatic generation of batch number = Y

Configuration on Order Type

In the order type of operations with batch number obligation, the dialog control = SNR must be entered.

As required, the serial number recording is configured accordingly in the order type:

  The SNR is to be entered manually and checked against the serial numbers entered in the order

header. In addition, a batch for the serial number is to be created  Serial no. obligation identifier

= "E"

  The SNR is to be generated automatically (HYDRA batch number) and entered and administered

as a batch in HYDRA.  Serial no. obligation identifier = "G"

  The SNR is to be generated automatically and a batch assigned to the serial number (with a

HYDRA batch number) is to be created and administered in HYDRA. The serial number is

created in a specific number range. This number range can be configured freely through

customizing.  Serial no. obligation identifier = "S"

For OPs requiring batch management, the following settings are made on the OP

with regard to "Serial no. obligation":

SERIENNR_PFLICH
TIG

OPT:S
NR

CHAR(1)  Serial number obligation

Identifier  which  controls  whether  the  order  has  serial  number
obligation and how it is entered/processed:
"G" = Autom. generation of SNR
"S" = Autom. generation of SNR via number range
"E" = Manual entry of SNR

From  which  OP  the  serial  number  has  to  be  entered  is
controlled  by  the  "Seriennummern_pflichtig"  (Serial  number
obligation) identifier at the processing code.

SERIENNR_VERGA
BE

OPT:S
NRVER
G

CHAR(1)  Determines  how  serial  numbers  are  assigned  (this  field  is  only

relevant if SERIENNR_PFLICHTIG <> "  "/"N"):
P = Serial numbers are transferred by the PPS system

Configuration at Processing Code

Field

Acronym

Type

Description

SERIENNR_PFLICHT  OPT:SNR=<>

CHAR (1)

Serial number obligation

If  this  identifier  is  set,  this  means  that  from  this
operation on, postings must be by serial number.

Setup_SerialNumbers.docx

Version: 1.0.1

Page 5 of 7

Field

Acronym

Type

Description

Configuration for Serial Number Recording

Y  Yes,

irrespective  of  whether  serial

numbers were transferred or not

N  No,  even

if  serial  numbers  were

transferred.

Y/ N can thus be used to control from which

operation an order requires a serial number.

Configuration at Material Type

Whether or not serial numbers are entered for operations requiring batch management is also set at the

material type. If the option is inactive, serial numbers will not be recorded as batches.

Dynamic Dialog Configuration

The following configurations are prerequisite:

  Entry at the terminal is made via the dynamic dialog A_SNR which must exist in the system.

  The  dialogs  for  Interrupt  OP/Terminate  OP  (A_UN/A_AB,  A_UN_MPL,  A_AB_MPL)  must  be

adapted in such a manner that the quantity fields are hidden by the dialog control SNR.

Layout Configuration at Terminal

Display of entered serial numbers in dialog A_SNR:

CTWINLAY.INI

[ A_SNR.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=DAT=-|ZEI=-|SNR

EXAMINE_SCANEXPR1=BEL=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=BEL=A
EXAMINE_SCANCOLOR2=clRed
EXAMINE_SCANEXPR3=BEL=P
EXAMINE_SCANCOLOR3=clBlue
EXAMINE_SCANEXPR4=BEL=N
EXAMINE_SCANCOLOR4=clNavy

SNR=C20,90,L,Seriennummer
BEL=C1,30,Z,Kl.
GR=N8,40,R,Grund

Setup_SerialNumbers.docx

Version: 1.0.1

Page 6 of 7

Configuration for Serial Number Recording

GRTXT=C70,150,L,Grundtext
DAT=dd.mm.yyyy,70,Z,Datum
ZEI=hh:mm:ss,70,Z,Zeit

Display of existing serial numbers in the selection:

CTWINLAY.INI

[ Serial numbers ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=SNR

DY1=C1,50,Z
SNR=C20,250,L,Seriennummer
DY2=C1,10,Z
BEL=C1,50,Z,Klasse

Setup_SerialNumbers.docx

Version: 1.0.1

Page 7 of 7

