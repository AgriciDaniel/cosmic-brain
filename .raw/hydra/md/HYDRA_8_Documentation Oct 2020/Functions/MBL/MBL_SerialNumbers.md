Collection and Evaluation of Serial Numbers

1  Collection and Evaluation of Serial Numbers

General

Serial numbers are assigned to differentiate between individual material items.

Purpose

The  MES  provides  the  following  options  with  corresponding  specifications  to  collect  and/or  use  serial

numbers:

  Option 1: Enter serial numbers for operations that are not subject to batch management.

  Option 2: Enter serial numbers for operations that are subject to batch management.

o  Enter the serial number manually. This manually entered serial number is assigned to a

HYDRA batch number.

o  The  serial  number  is  assigned  automatically  as  HYDRA  batch  number.  The  system

creates a batch with the assigned serial number.

o  The serial number is assigned automatically using a number range. The assigned serial

number is assigned to a new HYDRA batch number.

The paragraphs that follow describe the logic and processing of serial number collection (depending on

the configuration).

How to collect serial numbers for OPs that are not subject to batch

management

The  posted  serial  number  is  only  recorded  in  the  BDE  module  if  the  operation  is  not  subject  to  batch

management.

The serial number cannot be generated automatically. The user enters the serial number (manually or by

scanning).

Goods movements are not generated per serial number.

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 1 of 8

Collection and Evaluation of Serial Numbers

How to collect serial numbers for OPs that are subject to batch

management

Collection of serial numbers (A_SNR ) including manual assignment of serial numbers - type "E"

An  additional  batch  is  created  in  the  material  and  production  logistics  module  for  each  registered  serial

number if the operation is subject to batch management.

The connection between the current output batch and the registered serial number is saved additionally in

the database for traceability purposes. In this case, the output batch is considered as ID without inventory

and, therefore, does not receive a quantity.

A  goods  movement  is  generated  for  each  serial  number  (please  note:  the  machine  mustn't  be  in  batch

mode!).

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 2 of 8

Collection and Evaluation of Serial Numbers

Collection  of  serial  numbers  (A_SNR  )  including  automatic  assignment  of  serial  numbers  -  type

"G"

If the option "serial number requirement = G" is set for the operation, output batches will be recorded as

serial numbers. In this case, the serial number is the output batch number.

The "serial number" field is disabled and includes the current output batch. Once the badge number has

been  entered,  click  "capture"  to  post  the  data.  Enter  a  valid  scrap  reason  if  the  entered  quality  is  not

"yield".

Exactly one batch with quantity 1 is created for each serial number. In this case, the serial number and

the batch number are identical.

The "list" function updates the list of already recorded serial numbers.

For OPs handled in  batches, the batch  attributes that  might have to be recorded are directly  entered in

the terminal dialog before confirming the terminal dialog.

A  goods  movement  is  generated  for  each  serial  number  (please  note:  the  machine  mustn't  be  in  batch

mode!).

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 3 of 8

Collection and Evaluation of Serial Numbers

Collection  of  serial  numbers  (A_SNR  )  including  automatic  assignment  of  serial  numbers  using

the number range - type "S"

Serial numbers are recorded in relation to the batch if the option "serial number requirement = S" is set for

the operation. In this case, the operation must be subject to batch management. Every registered serial

number causes an output batch to be changed (CA_WL). This output batch change creates a batch with

quantity 1 in the MPL module. This batch is connected with the serial number.

The  server  determines  a  new  serial  number  and  displays  this  number  in  the  "serial  number"  field  by

clicking the function

. The new serial number is assigned uniquely throughout the system via the

"SNR" number range.

For  OPs  handled  in  batches,  the  batch  attributes  that  might  have  to  be  recorded  are  entered  in  the

general standard dialog before confirming/sending the data.

A  goods  movement  is  generated  for  each  serial  number  (please  note:  the  machine  mustn't  be  in  batch

mode!).

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 4 of 8

Collection and Evaluation of Serial Numbers

Tables used to manage serial numbers

Table: AUFTRAGSBESTAND to configure the operation for serial number recording.

Field

Acronym

Type

Description

SERIENNR_PFLICHT

OPT:SNR=<>

CHAR (1)

Also see order type and/or processing code

 "  “/"N“ = No serial number requirement
"+“ = Positive 
"-“ = Negative 
"G" = Automatic generation of the serial number (only
in combination with MPL as batch number)
"S" = Automatic generation of the serial number using
number range (only in combination with MPL as batch
number)
"E" = Manual collection of the serial number

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 5 of 8

Collection and Evaluation of Serial Numbers

Table: ADE_SERIENNUMMERN to manage serial numbers.

Field

A_TYP

Acronym  Data type  Comment

ATYP

char(4)

Order type
AU = Order header
AG = OP

AUFTRAG_NR

ANR

char(40)  Order

with order type AU: order number (AUNR)
with order type AG: combined order/OP number (ANR)

SERIEN_NR

SNR

char(20)

Serial number

BELEGT

BEL

CHAR(2)  Assigned/reason:

F
G
A
P
N
X

Free/not yet assigned
Yield
Scrap
Problem (quantity)
Rework
Locked

GRUND

GR

integer

New serial numbers are created with "assigned/reason=F".
Reason

If BELEGT = A/P/N, the reason that was entered is stored here.

GRUNDTEXT_NR

GRTXTN
R

integer

Reason text number

If BELEGT = A/P/N the reason text number of the entered reason is stored
here.

VERWEIS
BEARB
BEARB_DAT
BEARB_ZEIT

VERWEIS  Series

Internal reference number

CHAR(10)  The last modification is recorded here, even if the BELEGT option is
DATE
TIME

changed.

Table:  LOS_BESTAND  (only  for  OPs  that  are  subject  to  batch  management)  to  manage  the  created

batches.

Field

SERIEN_NR

Acronym

Type

Description

A_TR/CA_WL:

CHAR (20)  Serial number

SNR=<>

CNR-Bapi:

CNR:SNR=<>

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 6 of 8

Collection and Evaluation of Serial Numbers

Table:  MPL_BEZIEHUNGEN  (only  for  OPs  that  are  subject  to  batch  management)  to manage  batches/

HU batches

Field

nummer1

nummer2

losnr1

losnr2

art

datum

zeit

mattyp1

mattyp2

auftrag_nr

masch_nr

Acronym

Type

Description

CHAR (40)  Reference number 1 (e.g. serial number)

CHAR (40)  Reference number 2 (ID)

CHAR (20)  Batch number 1

e.g. batch number of the serial number
e.g. HU batch number

CHAR (20)  Batch number 2 (ID)

e.g. output batch number

CHAR (10)

L – batch-related (e.g. input batch of output batch)

S – serial number (e.g. output batch of included serial
number)

B – connection on the same level (e.g. parallel output
batches)

H – Connection between HU (merged batch) and
individual batch

(e.g. HU and output batch)

DATE

TIME

Entry date

Entry time

CHAR (10)  Material type of batch number 1

CHAR (10)  Material type of batch number 2

CHAR (40)  Order

10

Machine

ERP interface

Download of serial numbers

By  default,  serial  numbers  are  not  downloaded  with  reference  to  the  order  header.  A  customization  is

required in this case.

Upload of serial numbers:

For each recorded serial number, the quantity is uploaded to the ERP (interface EIS-ERP) in relation to

the operation.

Additionally, a goods movement is generated for the recorded serial numbers. This goods movement can

be transferred as goods receipt to the ERP via the material interface (EIS-MCL).

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 7 of 8

Collection and Evaluation of Serial Numbers

Application-relevant HYDRA settings

The following document describes the application-relevant settings and configurations in HYDRA for the

collection and evaluation of serial numbers:

Configuration of the collection and evaluation of serial numbers

MBL_SerialNumbers.docx

Version: 1.6.20398

Page 8 of 8

