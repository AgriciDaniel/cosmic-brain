Manual

Weighing of Components
AIP-KEW 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Weighing of Components

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-KEW_82.docx

Version: 1.0.23049

Page 2 of 14

Weighing of Components

Contents

1  Weighing Components ................................................................................. 4

2  Weighing of Components ............................................................................. 7

3  Configuration of Weighing Components .................................................... 13

AIP-KEW_82.docx

Version: 1.0.23049

Page 3 of 14

Weighing of Components

1  Weighing Components

Usage

For  operations  that  are  not  subject  to  batch  management,  it  is  possible  to  record  batches  in  relation  to

discrete material components. In this special case, batches may be entered in relation to the charge via a

special terminal function.

This entry function replaces the collection of quantities for the operation (e.g. partial upload) and records

material  consumption  in  relation  to  material  components.  This  consumption  is  also  posted  as  material

movement in the system.

Prerequisites

  The function can weigh more than one charge. In this case, the operation's secondary quantity has

to  include  the  number  of  charges.  The  additional  data  fields  of  the  components  and  operation

regarding the weighing function (e.g. target quantity per charge, tolerances, etc.) also need to be

taken into account.

  Every time an operation is changed, the target quantity for each charge is recalculated (formula:

target quantity per charge = primary target quantity / secondary target quantity. It is neither possible

to  set  the  value  for  the  target  quantity  per  charge  manually  nor  to  display  it  on  MOC.  If  the

secondary  target  quantity  is  not  set,  the  value  1  is  assumed  by  default  and  only  one  charge  is

processed in the weighing operation.



In this case, the machine does not allow to enter automatic quantities additionally.

  All components have to be managed by the "weight" unit (kilogram).

The entry function cannot be used offline.

Configuration

The configuration document describes the configurations required to use and enable the entry function at

the terminal.

AIP-KEW_82.docx

Version: 1.0.23049

Page 4 of 14

Weighing of Components

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

AIP-KEW_82.docx

Version: 1.0.23049

Page 5 of 14

Weighing of Components

Scale interfacing

The weight can also be entered in the weighing dialog by means of a connected scale. Upon opening the

KOMP_WIEG dialog, the value is requested from the scale via the PCC driver interface and entered in the

"input quantity" field.

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

AIP-KEW_82.docx

Version: 1.0.23049

Page 6 of 14

Weighing of Components

2  Weighing of Components

Summary

Some production areas require components to be weighed using scales and to provide them for further

production processes.

Usage

The function is always used when the user prepares charges using the relevant material quantities. To save

time, users often weigh several charges at once.

The logical process and posting are described here.

Prerequisite/configuration

The configuration is described here.

Weighing components

Components for a charge are weighed by the AIP dialog A_VBRKOMP.

If the terminal is offline, only a limited number of posting functions is provided based on the

available data. If the terminal is offline, errors are not displayed e.g. if posting failed on the

server.

The  "weighing"  function  at  the  terminal  provides  a  list  of  required  input  materials  (discrete  material

components). The component-related data collection can be opened from this list.

Once the operation to be weighed has been logged on, the "weighing components" dialog can be started

by the "weigh" function key from the toolbar of the basic screen of the terminal. After opening the dialog,

the terminal automatically generates a new batch for the order. This is presented as batch in the following

dialog.

Please note: The dialog only opens if "discrete" material components (consumption type = D) exist for the

running operation.

The actual weighing process of the relevant components is performed by the "weigh charge" function in a

detailed dialog (see below).

Dialog

AIP-KEW_82.docx

Version: 1.0.23049

Page 7 of 14

Weighing of Components

Workplace

Weighing workplace to which the operation to be weighed is logged on.

Operation

Weighing order/operation

Batch

Batch number for the charge that is currently to be produced.

Material

Material number for the charge that is currently to be produced.

Status

Batch status for the charge that is currently to be produced after weighing. This can be:

  Free

  Locked

Staff badge number

The user's staff badge number.

Components list

The  component  list  shows  all  components  of  the  currently  registered  weighing  operation  that  are

relevant for the charge to be produced. These details for the component are displayed to perform

weighing:

AIP-KEW_82.docx

Version: 1.0.23049

Page 8 of 14

Weighing of Components

  Article number (material number of the component from the component list)

  Target quantity

  Actual quantity (quantity entered upon weighing, at first 0,000)

  Remaining quantity (computed remaining quantity after weighing, at first 0,000)

  Designation (component name from the component list)

  Tolerance (calculated, admissible tolerance of the component/component list)

  Deviation (calculated, admissible deviation of the component/component list)

Procedure:

The user selects the first component that is to be weighed and starts weighing.

  The  relevant  component  row  is  highlighted  in  green  if  the  component  is  within  the  variance

tolerance (at the component, percentage).

  Materials falling short of the variance tolerance are highlighted in red.

  Materials  the  weighing  result  of  which  exceeds  the  variance  tolerance  but  is  still  within  the

tolerances of quantity adjustment (of the component) are highlighted in blue.

  The row is shown in black font, provided that the component has not yet been weighed.



If the weight value is beyond the variance tolerance but within the tolerance of quantity adjustment,

posting  will  be  accepted  but  the  user  has  to  adjust  quantities  for  the  other  components

(automatically in the system). The input dialog cannot be closed if this modification is not made.

Quantities have to be entered for all input materials included in the component list.

Functions

The paragraphs that follow describe the functions provided in the input dialog to weigh components:

"Weigh charge"

The "weigh charge" function opens the dialog to weigh a selected individual component (KOMP_WIEG).

AIP-KEW_82.docx

Version: 1.0.23049

Page 9 of 14

Weighing of Components

The  current  status  of  target  and  actual  quantity  is  presented  after  selecting  a  component  that  is  to  be

weighed. The user has to enter a relevant batch for consumption posting in the "component batch" input

field. The batch has to be available in HYDRA with the appropriate material and the status "free" and it

must have a remaining quantity >=0. The dialog can be closed by entering the weighing quantity and the

staff badge number (optional).

Successful weighing has the following additional effects on the system:



Indicators are recorded for the component

  The weighed quantity is added to the actual quantity of the component

  Material movements are generated for consumption (261)

  A batch assignment is generated for the batch  component batch.

  The article of the batch always has to match the article of the component.

  A component may also be weighed several times.

  The  amount  (stock)  of  component  batches  is  only  reduced  if  the  relevant

material type is assigned the "retrograde inventory collection" flag.

Once the weight has been entered, the displayed actual quantity and remaining quantity are updated.

The displayed component requirements are updated in the table once the component has been weighed

successfully.

AIP-KEW_82.docx

Version: 1.0.23049

Page 10 of 14

Weighing of Components

A warning message the user may skip is output if the value of the actual deviation is greater than the one

of the target deviation.

"Reject charge" function

Due to the weighing process, it might be the case that an entire batch cannot be used. The "reject charge"

function can be used to identify the current charge/batch as "scrap". The material used for this charge is

uploaded to ERP and the generated scrap quantity (identified as charge scrap by SYSTEM reason 910) is

posted to the order. The batch is generated with the "locked" status and the "scrap" batch class (goods

movement 531).

A confirmation prompt the user has to affirm comes up with this function.

Then the original target quantity for each charge is restored and the components are reset. Consequently,

the weighing process can be restarted for a new batch.

"Adjust quantity" function

Once  the  first  component  has  been  weighed,  the  user  can  apply  the  "adjust  quantity"  function  to

automatically adjust the input quantities of the other components in proportion to the weighing result of the

first component and its default quantity. This function can only be used once for each charge.

AIP-KEW_82.docx

Version: 1.0.23049

Page 11 of 14

Weighing of Components

The function adjusts  the target  quantities of all components to the  weighed quantity  of one component.

Quantities are adjusted by changing the primary target quantity for each charge of the operation.

However, quantities may only be adjusted if the component is weighed within its tolerances.

"Complete charge" function

Using  this  function,  the  charge/batch  is  completed  (generated)  and  the  dialog  is  closed.  However,  the

charge/batch can only be completed, once all components have been weighed and are within their specified

tolerances.

Completed successfully, the charge/batch is generated and transferred as goods movement 101 to ERP.

Optionally,  the  charge/batch  is  assigned  a  minimum  shelf-life  (from  the  material  type  of  the  OP).

In addition, the PPS batch from the order is determined and stored as PPS batch in the batch of the charge

(optionally).

The  quantity  of  the  generated  batch  results  from  the  input  quantity  recorded  as  consumption  for  each

component.

The user may also directly block the batch/charge by selecting a status from the component requirements

dialog. By default, the batch is always assigned the status "free".

AIP-KEW_82.docx

Version: 1.0.23049

Page 12 of 14

Weighing of Components

3  Configuration of Weighing Components

Usage

You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the

generated output batch when changing output batches.

Dialog configuration

The input function is controlled by the dynamic dialogs A_VBRKOMP and KOMP_WIEG

Activation of the posting function at the terminal

Specific posting functions are enabled at AIP by an entry in the file ctaipbut.ini.

This is an example for the entry in ctwinbut.ini:

CTAIPBUT.INI

F1=A_VBRKOMP,weigh

The dynamic dialogs A_VBRKOMP and KOMP_WIEG must be available.

System configuration

Operation data

The following additional fields have be filled out for the operation using the PPS interface:

  No batch management requirement

  Target  quantity  per  charge

(calculated

form  primary

target  quantity

/  secondary

quantity)(ab.soll_menge_ansatz)

  Number of charges (secondary quantity in pieces) - default = 1

  Batch

Data included in component list

These parameters have to be filled out for discrete material components using the PPS interface:

  Tolerance (in percent)  mlst_hy.mengen_tol

  Deviation (absolute value)  mlst_hy.mengen_abweichung

AIP-KEW_82.docx

Version: 1.0.23049

Page 13 of 14



Input quantity and unit of input quantity

  Component type must be D - discrete

Weighing of Components

AIP-KEW_82.docx

Version: 1.0.23049

Page 14 of 14

