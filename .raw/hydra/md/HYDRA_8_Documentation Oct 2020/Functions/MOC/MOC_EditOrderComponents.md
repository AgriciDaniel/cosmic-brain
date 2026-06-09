Edit Order Components

1  Edit Order Components

Summary

Menu

Order management  Order management  Edit components of the order

Transaction code

edorcomp

Function authorization

edorcomp

Utilization

Materials required for manufacturing an article/item are assigned to an  operation or order as "(material)

components". This function allows for material components of an order to be displayed or edited.

Normally,  these  components  are  transferred  to  HYDRA  using  an  interface  from  the  higher-level  ERP

system, as these components are already defined in the ERP work plan.

Prerequisite

The relevant order has to be created.

Selection criteria

The following selection criteria are available in the application:

Order

The components assigned to an order may be selected by entering an order.

Field descriptions

Order

The order number to which the production resources and tools are to be assigned can be entered

in this field.

Material

The material number of the material component can be entered here.

Designation

The material designation can be entered in this field.

Comment 1 / comment 2

These are comment fields.

MOC_EditOrderComponents.docx

Version: 1.1.18468

Page 1 of 4

Edit Order Components

BOM item

In a bill of material the components of a product are referred to as items. The number entered here

arranges  the  BOM  items  within  the  BOM.  Consequently,  identical  material  numbers may  occur  in

the component list but data will still be assigned to the correct position of the component.

When  it  comes  to  reel-based  manufacturing,  it  refers  to  the  position  of  the  component  within  the

layer structure.

Please note that the BOM item is an integral part of the identification key.

BOM level

A component can also have several levels. Enter the BOM level here, provided that it is available

and known.

Please  note:  Postings  can  only  be  made  for  materials  of  the  BOM  level  0.  If  a  BOM  level  >  0  is

entered, the component type (see next field) will generally be set to "I" (information component).

Component type

Component type. Possible values are:

M

Material component. The component type is to be indicated here. The other types might

also be relevant for MPL or its reel-based solution MPL-RF.

I

T

Z

A

Material type

Info  component.  Information  components  can  be  shown  in  the  component  list  without

having to be posted.

Carrier material (MPL-RF).

A maximum of one input batch may be logged on to the machine as carrier material (T) or

added material (Z).

Added material as alternative for the carrier

Scrap/waste material

Material  type  of  the  material  component.  The  material  type  controls  processing  specific  to  the

material in HYDRA.

Unless otherwise stated in the project, the material type SYSTEM is to be assigned.

The material type must exist in HYDRA. If no material type  is entered, HYDRA tries to determine

the  material  component  (prerequisite:  the  assignments  of  material  to  the  material  type  are  up-to-

date). If no material type is found HYDRA assigns the material type SYSTEM.

Please note: A separate material type (e.g. INFO) should be defined and assigned for information

components (material type "I").

Consumption type

The following input options are planned for material components. The definition of individual options

and their usage depends, among other things, on which HYDRA modules are in use.

MOC_EditOrderComponents.docx

Version: 1.1.18468

Page 2 of 4

Edit Order Components

K = None

This option specifies that no consumption is collected for this material component. In this case, the

material component is only displayed.

"Info components" (see above: material type) have to be set to this option.

D = Discrete

With  this  component,  the  consumption  is  determined  in  a  retrograde  manner  at  the  Windows

terminal,  i.e.  based  on  the  last  produced  quantity  and  suggested  in  the  posting  dialog.  The

consumption is posted for the component and a material movement (goods issue from production)

is  generated  that  can  be  uploaded  to  the  higher-level  ERP  system  (however,  this  requires  the

relevant interface for uploading goods movements).

This  type  of  material  consumption  recording  needs  to  be  configured  especially  while  HYDRA  is

customized.

L = with batch reference (relevant if MPL/TRT is in use)

This option results in the material component to be logged on and off as HYDRA batch. Calculating

the consumption for this material component (retrograde, with logging the input batch off) depends

on the configuration of the material type to which the material component is assigned.

Required quantity/unit

Planned total quantity of the component within the operation.

It  is  calculated  automatically  from  the  target  quantity  of  the  operation  (primary  quantity  unit)

multiplied by the input quantity of the component.

The required quantity is only shown in the table as well as in the detail panel.

Input quantity

Planned input quantity of the component for each unit of the operation's primary quantity.

MPL, consumption type D: Planned input quantity of the component for each unit of the operation's

primary quantity

Unit

Quantity unit for the input quantity

Input quantity in % / upper tolerance limit / lower tolerance limit

Reserved. No processing. Should be set to 0.

Replaceable

If this flag is set, another than the planned material  may be used for the component. However, in

this case, only material of the same material type can be used.

Requirement to change output batch

The input  batch change for a batch of this material also requires an output  batch change. Please

note in this context:

MOC_EditOrderComponents.docx

Version: 1.1.18468

Page 3 of 4

Edit Order Components

, if type = T or Z

, if type = I or A

/, if type = M

Otherwise: N

Superior component: BOM item/BOM level

Reserved. No processing.

Toolbar

Edit operations

Starts the application edit operations.

Edit orders

Starts the application edit orders.

 Order information

Starts the application order information.

MOC_EditOrderComponents.docx

Version: 1.1.18468

Page 4 of 4

