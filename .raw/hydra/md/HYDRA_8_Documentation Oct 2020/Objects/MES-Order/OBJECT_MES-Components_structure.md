Data Structure of Components

1  Data Structure of Components

Production resources and tools are stored in the table mlst_hy with resource type "MAT". In the sections

below, the different fields of a (material) component are described. The actual order of fields in the editing

dialogs can deviate from the order used here. Not all fields that are listed here are displayed on the client

or can be edited.

MES order number / MES work plan number

The  component  is  assigned  to  the  operation  identified  in  this  field.  The  field  shows  the  combined

order and operation number or work plan and operation number of the operation.

Material

Enter the material number of the material component.

Designation

You can enter the name of the material.

Comment 1 / Comment 2

These are comment fields.

BOM item

The BOM lists the different components of a product. The components are referred to as items. The

number  entered  here  specifies  the  position  where  the  item  is  listed  in  the  BOM.  It  is  therefore

possible  that  the  BOM  includes  one  material  number  several  times.  Using  the  correct  BOM  item,

the data collection can still be uniquely assigned.

Note:  when  using  the  MPL,  the  BOM  item  must  be  unique  for  an  operation.  Each

component  must  have  a  unique  BOM  item  if  several  components  are  used  in  one

operation. Two components must not have the same BOM item.

For the coil-based solution "RF", the BOM item specifies the position of the component in the layer

structure.

BOM level

A component can also have several levels. If applicable and known, enter the BOM level here.

If  you  log  on  input  batches  via  material  management  (MPL/TRT),  you  can  only  log  on

components of BOM level 0.

If  you  enter  a  BOM  level  >  1,  the  system  automatically  sets  the  component  type  (see

second next field) to "I" (info component).

OBJECT_MES-Components_structure.docxVersion: 1.3.21456

Page 1 of 4

Data Structure of Components

Material type

Material type of the material component. The material type controls the material-specific processing

in the system.

Unless defined otherwise for a specific project, assign the material type SYSTEM here.

The material type must be available in the system (see configuration of Material types). If

no material type  has been  entered, the system tries to identify the material component

(requirement: the assignment of material to material type has been made). If the system

cannot identify the material type, the system uses the material type "SYSTEM".

For info components (material type "I"), we recommend to define and assign a separate

material type (e.g. INFO).

Component type

Possible values:

M

Material component (default)

You  usually  enter  "M"  here.  Other  component  types  can  be  relevant  for  material

management ("MPL").

I

Info component

You can display info components in the bill of materials (BOM), but you need not log

them on or off.

T

Carrier material (coil-based production)

You can log on a maximum of one input batch as carrier material (T) or added material

A

Z

(Z) to the machine.

Scrap/waste material (coil-based production)

Added material as alternative for the carrier (coil-based production)

You can log on a maximum of one input batch as carrier material (T) or added material

(Z) to the machine.

Consumption type

The following collection options are available for material components. The definition of the different

options and their use depend on the functions used.

N = None

This  option  defines  that  no  consumption  is  collected  for  the  material  component.  The  material

component is only displayed here.

The so-called info components (see above: component type) must be set to this option.

OBJECT_MES-Components_structure.docxVersion: 1.3.21456

Page 2 of 4

Data Structure of Components

L = Retrograde/with batch reference (MPL/TRT, MPL-RF)

If  this  option  is  used,  the  material  component  is  logged  on  and  off  as  batch.  The  consumption

calculation  for  this  material  component  (retrograde,  at  input  batch  logoff)  depends  on  the

configuration of the material type the material component is assigned to.

D = Discrete

This  option  is  relevant  for  discrete  consumption  recording  (AIP-DVE).  This  type  of

material  consumption  recording  requires  a  configuration  that  can  be  part  of  a

customization at the customer's.

Use the option "L" if Material and Production Logistic (MPL) or Tracking & Tracing (TRT)

is used.

For  this  component,  the  system  calculates  consumption  using  the  quantity  produced  last  and

suggests this calculated quantity in a posting dialog. The consumption is posted for the component

and a material movement is generated (goods issue from production). This material movement can

be uploaded to the higher-level ERP system.

Replaceable

If  this  identifier  (=J)  is  set,  you  can  use  a  different  material  than  the  material  planned  for  this

component. You can only use a material of the same material type.

For the user on the shop floor client (MPL/TRT) a message is displayed. The user selects and logs

on the relevant component.

Change necessary / Requirement to change output batch

With this option, an input batch change for a batch of this material forces an output batch change.

The setting that is allowed for this option depends on the relevant component type (see above):

Component type

Allowed settings

M

T, Z

I, A

Input quantity

 or

 possible

Only

 allowed

Only

 allowed

Input quantity of the component per unit in primary quantity that is planned for the operation.

Unit

Quantity unit of input quantity

Input quantity in percent / Upper tolerance limit / Lower tolerance limit

Default: 0; should only be modified after consultation with MPDV.

Required quantity

Total quantity of the component that is planned for the operation.

OBJECT_MES-Components_structure.docxVersion: 1.3.21456

Page 3 of 4

Data Structure of Components

The  system  calculates  the  required  quantity  when  the  display  is  called.  The  following  formula  is

used for calculation :

Required quantity = input quantity of component x target quantity of OP in primary quantity unit

The required quantity is only displayed in the table and in the detail panel.

Resource type

Reserved. Not used.

UOM Spec. mass per unit area

Reserved. Not used.

Spec. mass per unit area

Reserved. Not used.

Planned article

Reserved. Not used.

Backflush

Reserved. Not used.

Required quantity (PPS)

The field Required quantity shows the total quantity required that is transferred from the ERP/PPS

system. That is the quantity of the component that is required to produce the target quantity of the

operation.

Consumption (total)

The column Consumption (total) shows the total consumption that has been posted for the relevant

component.  In  this  context,  it  does  not  matter  whether  the  component  is  subject  to  batch

management or discrete.

Upper-level component: BOM item / BOM level

Reserved. Not used.

Modified by / Modified on

Editor and date and time of the last change

User fields

You can define and use user fields for specific projects.

OBJECT_MES-Components_structure.docxVersion: 1.3.21456

Page 4 of 4

