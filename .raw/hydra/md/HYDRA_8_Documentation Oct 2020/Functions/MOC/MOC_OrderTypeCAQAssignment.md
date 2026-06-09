Assignment of Order Types to CAQ Areasn

1  Assignment of Order Types to CAQ Areas

Overview

HYDRA menu

System administration  System settings  Area: configuration of order type

FEDRA menu

System administration  System settings  Area: configuration of order type

Transaction code

ortycaq

Function authorization

ortycaq

Purpose

Use the application "Area: configuration of order type" to configure how order types are  assigned to the

following CAQ objects:

  Area type

  Areas

An  alternative  version  for  generating  inspection  requirements  and/or  orders  is  available  for  every

combination of "order types and area types/areas".

The alternative is entered in the field "action". The below table describes the possible alternatives and their

functions.  Enter  additional  parameters  specifying  the  generation  of  inspection  requirements  in  the  field

"addition".

Action

Function

PAN_AU/A_AN

The system generates an inspection requirement, once you have logged on

an operation.

Requirement: One inspection plan for all operations

PAN_AG/A_AN

The system generates an inspection requirement, once you have logged on

an operation.

Requirements:

- One inspection plan for each OP

- Option 1159 was created by the patch

"dbp_caq_ade_integration_2_enh.hsc".

PAN_AU/A_ST

The system generates an inspection requirement, once the order status has

changed.

MOC_OrderTypeCAQAssignment.docx  Version: 1.3.23364

Page 1 of 4

Assignment of Order Types to CAQ Areasn

In the field "addition" define which changed orders statuses should generate

an  inspection  requirement.  The  following  combinations  (source  and  target

status) are possible:







[AUST_Q:<Source status>]

[AUST_Z:<Target status>]

[AUST_Q:P],[AUST_Z:V]

PAN_AU/AUNR_COPY  Only use this parameter for the order type "KAL".

This  configuration  automatically  generates  a  calibration

inspection

requirement if the calibration calendar includes a calibration order. Click the

button "generate order" to generate the calibration order.

Meet the following requirements:

  Configure the calibration inspection plan as follows:

o  One inspection plan for all operations

o  One inspection step for each inspection station

o  Generate QM operations: none

o

“Inspection  order  +  generate  characteristic”:  when

generating the inspection requirement

  The inspection plan characteristics for the calibration must be

planned for a machine/machine group.

  Service Pack 11 or higher

empty

Leave the field "action" empty, if you do not want to generate an inspection

requirement  after  logging  on  an  operation.  Use  this  option  if  you  want  to

generate  an  order  with  QM  operations  upon  generating  an  inspection

requirement.

The following table describes the parameters of the field "addition" specifying the generation of inspection

requirements. If you want to enter multiple control parameters, use a comma to separate the entries. But

do not enter space characters before or after the comma.

Addition

Function

[AUNR,AGNR]

The following database fields of the database table "auftrags_bestand" link

the inspection step structures with the operation structures.

MOC_OrderTypeCAQAssignment.docx  Version: 1.3.23364

Page 2 of 4

Assignment of Order Types to CAQ Areasn

  aunr (order number)

  agnr (operation number).

[AUNR]

Only the following database field of the database table "auftrags_bestand"

links the inspection step structures with the operation structures.

  aunr (order number).

[ATK_AG]

The application uses the article of the operation to generate the inspection

requirement.

[ATK_AU]

The  application  uses  the  article  of  the  order  to  generate  the  inspection

requirement.

[AUST_Q:<Source

If the order switches from the defined source status to another order status,

status>]

the system triggers the generation of an inspection requirement.

[AUST_Z:<Target

If the order switches from any order status to the defined target status, the

status>]

system triggers the generation of an inspection requirement.

[AUST_Q:P],[AUST_Z:V]

If the order switches from the defined source status "P" to the defined target

order  status  "V",  the  system  triggers  the  generation  of  an  inspection

requirement.

Integration

The application "area - order type configuration" links the BDE functions with the CAQ functions.

Requirements

You must use at least one of the following CAQ/PDV functions:





Incoming goods inspection

In-production inspection

  Goods issue inspection



Initial sample inspection

  Calibration

  QM subsystem

  PDV data collection

MOC_OrderTypeCAQAssignment.docx  Version: 1.3.23364

Page 3 of 4

Assignment of Order Types to CAQ Areasn

Selection criteria

Selection criteria are self-explanatory and not described separately.

Field descriptions

Area type

Select the area type

Area

Select the area of the area type

Order type

Select the order type

Action

Define the alternative to generate inspection requirements

Addition

Define the parameters to specify the generation of inspection requirements

MOC_OrderTypeCAQAssignment.docx  Version: 1.3.23364

Page 4 of 4

