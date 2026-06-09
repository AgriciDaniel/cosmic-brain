Weighing Components

1  Weighing Components

Usage

For  operations  that  are  not  subject  to  batch  management,  it  is  possible  to  record  batches  in  relation  to

discrete material components. In this special case, batches may be entered in relation to the charge via a

special terminal function.

This entry function replaces the collection of quantities for the operation (e.g. partial upload) and records

material  consumption  in  relation  to  material  components.  This  consumption  is  also  posted  as  material

movement in the system.

Prerequisites

  The  function  can  weigh  more  than  one  charge.  In  this  case,  the  operation's  secondary  quantity

has to include the number of charges. The additional data fields of the components and operation

regarding the weighing function (e.g. target quantity per charge, tolerances, etc.) also need to be

taken into account.

  Every time an operation is changed, the target quantity for each charge is recalculated (formula:

target  quantity  per  charge  =  primary  target  quantity  /  secondary  target  quantity.  It  is  neither

possible to set the value for the target quantity per charge manually nor to display it on MOC. If

the secondary target quantity is not set, the value 1 is assumed by default and only one charge is

processed in the weighing operation.



In this case, the machine does not allow to enter automatic quantities additionally.

  All components have to be managed by the "weight" unit (kilogram).

The entry function cannot be used offline.

Configuration

The configuration document describes the configurations required to use and enable the entry function at

the terminal.

MBL_WeighingComponents.docx

Version: 1.0.1362

Page 1 of 3

Weighing Components

Posting

Data for label printing

The schema a_vbrkomp is provided in initial data for label printing.

This data can be printed on the label during weighing (dialog action KEW_RECORD):

Acronym

DLG.MNR

DLG.ANR

DLG.ATK

DLG.SLP

DLG.CHARGE

DLG.CST

DLG.SGR:GUT

DLG.SGE:GUT

DLG.EGR:GUT

DLG.EGE:GUT

Type

Length  Description

C

C

C

C

C

C

DEC

C

DEC

C

10

40

40

40

20

1

3

3

3

Machine

Operation

Material number

BOM item

Batch

Batch status F/S (free/blocked)

Target quantity

Unit of the target quantity

Actual quantity

Unit of the actual quantity

Input quantity

Unit of the input quantity

DLG.EGR:MENGE

DEC

DLG.EGE:MENGE

C

DLG.DAT

DLG.ZEI

DLG.KNR

DATE

ZEIT

Date of the posting

Time of the posting

C

10

The reporting person's badge number

This data can be printed on the label when completing the charge (dialog action KEW_ABSCHLUSS):

Acronym

DLG.MNR

DLG.ANR

DLG.ATK

DLG.ATKBEZ

DLG.CHARGE

Type

Length  Description

C

C

C

C

C

10

40

40

40

20

Machine

Operation

Material number

Material designation

Batch

DLG.EGR:GUT

DEC

Quantity of the batch

DLG.EGE:GUT

C

3

Unit

DLG.DAT

DLG.ZEI

DLG.KNR

DATE

ZEIT

Date of the posting

Time of the posting

C

10

The reporting person's badge number

MBL_WeighingComponents.docx

Version: 1.0.1362

Page 2 of 3

Weighing Components

Scale interfacing

The weight can also be entered in the weighing dialog by means of a connected scale. Upon opening the

KOMP_WIEG dialog,  the value is requested from the  scale  via the PCC driver interface and entered  in

the "input quantity" field.

This is an example for entering the scale value in the INI file of the driver:

<WAAGENTREIBER>.INI

V:WAAGE:NETTO=Nettogewicht_Waage

If  an  OPC  interfacing  is  used,  changed  scale  values  can  be  sent  automatically  by  the  OPC  server.

For  this  purpose,  the  below-mentioned  parameter  has  to  be  entered  in  the  file  "OPCMPDV.INI"

SETVALEVENTS=V:WAAGE:NETTO

<WAAGENTREIBER>.INI

SETVALEVENTS=V:WAAGE:NETTO

 additional entry

V:WAAGE:NETTO=Nettogewicht_Waage

MBL_WeighingComponents.docx

Version: 1.0.1362

Page 3 of 3

