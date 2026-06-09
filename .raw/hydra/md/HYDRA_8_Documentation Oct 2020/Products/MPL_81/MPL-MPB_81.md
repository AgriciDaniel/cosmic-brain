Manual

Material Buffers and
Inventories
MPL-MPB 8.1

Version 1.0.54

Last changed on: 19.06.2020

Material Buffers and Inventories

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

MPL-MPB_81.docx

Version: 1.0.18468

Page 2 of 18

Material Buffers and Inventories

Contents

1  Overview of Material Buffers and Inventories .............................................. 4

2  Material Buffers ............................................................................................ 6

3  Transport Units ........................................................................................... 10

4  1 Assignment of Transport Unit to Material Type ....................................... 12

5

Inventory Limits .......................................................................................... 14

6  Stock Monitoring ........................................................................................ 16

MPL-MPB_81.docx

Version: 1.0.18468

Page 3 of 18

Material Buffers and Inventories

1

 Overview of Material Buffers and Inventories

Possible fields of application

The  material  buffer  and  inventories  function  package  allows  for  material  stock  to  be  managed  and

evaluated.

Implementation notes

The function package "material buffers and inventories" is used if you

  use  the  function  packages  "material  and  inventory  management",  "batch  data  management"  or

"batch processing" and

o  would like to enhance them by managing storage locations.

o  would  like  to  record  which  anonymous,  logistical  containers  include  or  transport  the

material.

  would like the system to calculate the consumption of posted input materials (retrograde).

  would like to enter the consumption of posted input materials explicitly.

Integration



Input and output material buffers can be defined at the object "machine/workplace".

Functions

  Configuration of material buffers

o  Functions to configure material buffers

  Configuration of transport units

o  Editing  function  for  transport  units  to  classify  the  means  of  transportation,  such  as

skeleton containers, pallets, containers and to manage stock quantities.

o  Editing function to classify material types in transport units

  Configuration of inventory limits

o  Editing  function  for  inventory  limits  to  manage  minimum  and  maximum  stock  levels  for

the material included in the material buffer

  Management of buffer inventories

o  Management of material stock relating to material buffers or transport units

  Assignment of material buffer to the batch

o  Appropriate collection and posting functions

  Posting to input batches

o  Retrograde or  discrete  withdrawal of consumption from registered input batches subject

to the configuration

MPL-MPB_81.docx

Version: 1.0.18468

Page 4 of 18

  Repost

o  Reposting of individual batches

Material Buffers and Inventories

MPL-MPB_81.docx

Version: 1.0.18468

Page 5 of 18

Material Buffers and Inventories

2  Material Buffers

Menu

Master data  Material  Material buffers

Transaction code

mbuf

Function authorization  mbuf

Usage

This function is used to create or modify material buffers in the system.

Integration

Material  buffers  are  used  in  the  system  to  represent  both  actual  physical  and  purely  virtual  material

storage  or  areas  in  which  materials  are  kept  for  temporary  storage  in  the  production  process.  Material

buffers are identified by unique keys.

Selection criteria

The following selection criteria are available in the application:

Material buffer

Selection using the material buffer Ident

Designation

Selection using the designation of the material buffer

Type

Selection using the material buffer type. Permissible values are:

  F – Production buffer

  H – Hierarchical buffer

  W - Goods receipt buffer

  C – casting buffers in terms of composition

Cost center

Selection using cost centers to which the material buffers were assigned.

Company

Selection using companies to which the material buffers were assigned.

MPL-MPB_81.docx

Version: 1.0.18468

Page 6 of 18

Material Buffers and Inventories

Department

Selection using departments to which the material buffers were assigned.

Area

Selection using areas to which the material buffers were assigned.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the

selection criteria is displayed.

Field descriptions – general

Material buffer

Ident of the material buffer to be created or edited.

Type

Material buffer type. Permissible values are:

  F – Production buffer

Production buffers are material buffers that are located within the production areas. Storage

locations or material buffers for resources should always be configured as production buffers.

  H – Hierarchical buffer

A hierarchical buffer combines several individual buffers. In the evaluations, the cumulative

quantity of the individual buffers is represented in the hierarchical buffer.

  W – Goods receipt buffer

The material buffers in which material from external sources is delivered are classified as

goods receipt buffers. They are the source for the material consumption in production.

On the processing side, buffers of the production and goods receipt types behave in the same way.

In  contrast,  a  hierarchical  buffer  is  a  'virtual'  buffer  that  enables  one  or  more  buffers  (hierarchical

buffers  as  well)  to  be  compiled  in  order  evaluate  them  in  in  this  way  using  the  function  stock

overview  (menu Material management > Inventory management > Stock overview).

Designation

Long text regarding material buffer

Storage location

Reference to the physical storage location of the material buffer (no current use on the processing

side)

Department

Department to which the material buffer belongs

MPL-MPB_81.docx

Version: 1.0.18468

Page 7 of 18

Material Buffers and Inventories

Area

Area to which the material buffer belongs

Cost center

Cost center to which the material buffer belongs

Company

Company in which the material buffer is located

Comment

Additional text

Inventory management tab

Recycle bin

All  material  buffers  defined  as  recycle  bins  are  cyclically  deleted  or  archived  depending  on  the

configuration or customizing. The process that deletes or archives batches in the material buffers is

integrated  into  the  scheduler.  The  period  after  which  the  batches  are  deleted  or  archived  is

configured using data management.

Batches that are located in a material buffer identified as a "recycle bin" can no  longer be logged

on. In this case, they must be manually reposted in another material buffer.

Batches cannot be logged on as input batches at machine with an incoming material buffer, which

is configured as recycle bin.

Include in stock

Definition  regarding  whether  the  batches  located  in  this  material  buffer  are  to  be  included  in  the

stock overview or not.

Retention period

Duration of the storage period in the buffer (no current use on the processing side).

Hierarchy tab

Hierarchy

Indicates the hierarchy level assigned to the buffer.

Hierarchical buffer

Indicates the assignment to the superior hierarchical buffer. Note that a buffer can only be assigned

to a hierarchical buffer with a hierarchy (number) that is greater than that of the assigned buffer.

MPL-MPB_81.docx

Version: 1.0.18468

Page 8 of 18

Material Buffers and Inventories

Batch transport tab

Type

  No buffer

This has to do with one of the buffer versions described in the following.



Input buffer, output buffer

In  order  to  configure  the  batch  transport  across  facilities,  a  specification  can  be  made  here

indicating if the material buffer is an input or output buffer. A corresponding system is defined for

an  output  buffer  with  which  specifications  are  made  regarding  where  that  data  posted  in  this

material buffer are transported.

If you configure a material buffer as “input buffer“, the transport status of the batches posted to

this buffer will be set to “I“ = initial. Consequently, these batches cannot be logged on to AIP.

Virtual stock buffer

This  field  can  be  used  if  a  material  buffer  is  defined  as  a  stock  posting  buffer  In  this  way,  an

additional specification can be made regarding whether the material  buffer is a virtual stock buffer

or not.

This  identification  of  the  material  buffer  as  a  placeholder  for  an  external  inventory  system  is  only

necessary  in  order  to  make  it  possible  to  query  the  inventory  for  the  virtual  stock  at  a  later  time.

This identification does not have any current significance.

Corresponding system

By  defining  the  corresponding  system,  it  is  specified  where  all  batches  that  are  included  in  this

material  buffer  are  to  be  transferred.  In  the  case  of  transport  output  buffers  and  stock  posting

buffer, the corresponding system is defined here; a specification is made regarding the system to

which the batches are transferred.

Stock  posting  buffer  In  order  to  carry  out  stock  postings,  a  material  buffer  can  be  defined  as  a  stock

posting buffer. The transfer is made using the standard batch interface with a file that is created

in the file system in a directory specified by the corresponding system.

MPL-MPB_81.docx

Version: 1.0.18468

Page 9 of 18

Material Buffers and Inventories

3  Transport Units

Summary

Menu

Material  Master data  Transport units

Transaction code

Function authorization

tu

tu

Usage

Use this function to create or to change transport units in the system.

Transport  units  are  defined  as  those  load  carriers  that  are  used  to  transport  materials.  When  output

batches  are  recorded  at  the  terminal,  the  assignment  to  the  producing  material  type  can  serve  as

selection that is saved to the batches.

Integration

The transport units will be shown in the evaluations in material management.

Selection criteria

The following selection criteria are available in the application:

Transport unit

Only the selected transport unit will be used.

Field descriptions

Transport unit

Unique identification of a transport unit

Designation

Clear text description of the transport unit

Quantity

Quantity of available transport units

Width

Width of the transport unit in the assigned unit. Currently used only for terminal display features.

Height

Height of the transport unit in the assigned unit. Currently used only for terminal display features.

MPL-MPB_81.docx

Version: 1.0.18468

Page 10 of 18

Material Buffers and Inventories

Length

Length of the transport unit in the assigned unit. Currently used only for terminal display features.

Weight

Weight of the transport unit in the assigned unit. Currently used only for terminal display features.

Inventory management

Indicator relating to the inventory management of the transport unit. If this indicator is not set, this

transport  unit  will  also  not  be  taken  into  account  in  the  evaluation  of  the  stock  overview  transport

units

(Menu:  Material  management  >

Inventory  management  >  TPU

stock  overview).

MPL-MPB_81.docx

Version: 1.0.18468

Page 11 of 18

Material Buffers and Inventories

4  1

Assignment of Transport Unit to Material Type

Summary

Menu

Master data  Material  TPE assignment - Material type

Transaction code

astrum

Function authorization

astrum

Usage

This function is used to assign the corresponding transport units to a material type in the system.

Integration

For each material  type, several possible   transport units can  be defined. Then,  when forming an  output

batch, the corresponding transport unit can be selected from those for the material type of the material to

be produced.

Requirement

The transport units must be defined in the system.

Editing functions

Copy

There is the functionality to copy assignments from one material type to another. It can be chosen

to either copy all assignments or only the missing ones.

Selection criteria

The following selection criteria are available in the application:

Material type

Only materials with the selected material type are selected.

Transport unit

Only materials with the selected transport unit are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

MPL-MPB_81.docx

Version: 1.0.18468

Page 12 of 18

Material Buffers and Inventories

Field descriptions

Material type

Designation of the assigned transport unit.

Transport unit

Designation of the assigned transport unit.

Standard

The preferred transport unit for transporting materials of the specified material type.

Quantity

Quantity  of  the  materials  of  this  material  type  that  match  with  this  transport  unit.  Used  in  the

evaluation overview of transport units available.

Unit

Not in current use.

MPL-MPB_81.docx

Version: 1.0.18468

Page 13 of 18

Material Buffers and Inventories

5

Inventory Limits

Summary

Menu

Master data  Material  Inventory limits

Transaction code

invl

Function authorization

invl

This function is used to create or modify inventory limits in the system.

Usage

This  dialog  is  used  to  assign  those  materials  to  the  material  buffers  that  are  temporarily  stored  in  this

material buffer. The assignment enables the minimum stock to be specified in the buffer.

Integration

The values stored here are used in the following functions:

  Material management  Stock monitoring

  Operating facilities management  Graphic machinery

  Production control  Graphic planning

Requirement

Material buffer and units must be defined.

Selection criteria

The following selection criteria are available in the application:

Material buffer

Displays all inventory limits for the selected material buffer.

Material

Displays all inventory limits for the selected material.

When using multiple selection criteria, the amount of overlap of the selection criteria is displayed.

Field descriptions

Material

Unique material key

MBuffer

MPL-MPB_81.docx

Version: 1.0.18468

Page 14 of 18

Material Buffers and Inventories

Name of the assigned material buffer

Unit

Quantity unit in which the inventory is listed

Minimum stock

Minimum stock of the material in the material buffer

Alert Min. stock level

Quantity of stock at which an alert occurs for increasing inventory

Min. warn. stock level

Quantity of stock at which a warning occurs for checking inventory

Max. warn. stock level

Quantity of stock at which a warning occurs for checking inventory

Alert Max. stock level

Quantity of stock at which an alert occurs for decreasing inventory

Max. stock level

Maximum material stock level in buffer

Comment

Additional comments

MPL-MPB_81.docx

Version: 1.0.18468

Page 15 of 18

Material Buffers and Inventories

6  Stock Monitoring

Summary

Menu

Material management  Inventory management Stock monitoring

Transaction code

stomo

Function authorization

stomo

Usage

Stock monitoring allows to display those materials (batches), for which the  inventory limits are exceeded

or not reached in a material buffer.

Integration

Since  these  material  buffers  can  have  different  sizes  and  since  the  definition  of  when  such  a  material

buffer is full depends on the size of the material, the  definition of the inventory  limits to be monitored is

referred to a material and to a material buffer. This creates the possibility to monitor only critical materials

and/or only certain material buffers.

All  materials  per  material  buffer  that  match  the  entered  selection  criteria  and  for  which  inventory  limits

were defined for the respective material buffer will be shown in this list that updates cyclically. To do so,

the existing batches will be cumulated to the material number and be displayed. To further limit this, only

batches of a specific status can be used.

Requirements

The following requirements must be met to display materials in stock monitoring:

1.  In  the  configuration  (menu:  Master  data  >  Material  >  Inventory  limits)  you  must  have  defined

corresponding inventory limits for the combination of material and material buffer.

2. The material buffer (menu: Master data > Material > Material buffer) must not be a hierarchical

buffer. In addition the indicator "include in stock" must be set.

Selection criteria

The following selection criteria are available in the application:

Material buffer

This  selection  criterion  refers  to  the material  buffer  of the  material.  All  materials  with  the  selected

material buffer will be shown.

MPL-MPB_81.docx

Version: 1.0.18468

Page 16 of 18

Material Buffers and Inventories

Material

Any stock with the selected material will be shown.

Batch status

This selection criterion refers to the batch status of the stocks. All materials with the selected batch

status will be shown.

If several selection criteria are used, the intersection of the selection criteria will be shown.

Field descriptions

Fill level

Symbol

Symbol color

Meaning

Meaning

related

to

the

configured inventory limits

green

Stock o.k.

Stock between min. warning

stock level and max. warning

stock level.

yellow

Stock below warning limit

Stock between min. warning

stock level and minimum

stock.

red

Stock below alarm limit

Stock between min. alarm

quantity and min. warning

stock level

Stock below minimum

Stock below minimum stock

Stock above warning limit

Stock between max. warning

stock level and max. alarm

quantity.

Stock above alarm limit

Stock between max. alarm

quantity and max. stock level

Stock above maximum

Stock above max. stock level

red

yellow

red

red

Material type

Assigned material type of the material

Material

Material number

Material designation

Designation of the material

Quantity

Stock quantity of the material

MPL-MPB_81.docx

Version: 1.0.18468

Page 17 of 18

Material Buffers and Inventories

Unit

Quantity unit

Material buffer

Assigned material buffer of the material

Designation

Designation of the material buffer

Company

Assigned company to the material buffer

Department

Assigned department to the material buffer

Area

Assigned area to the material buffer

Cost center

Assigned cost center to the material buffer

Storage location

Assigned storage location to the material buffer

Type

Type of the material buffer

Min. stock quantity

Defined min. stock quantity of the material in this material buffer

Lower alarm limit (min. alarm quantity)

Defined min. alarm quantity of the material in this material buffer

Lower warning limit (min. warning stock level)

Defined lower warning stock level of the material in this material buffer

Upper warning limit (max. warning stock level)

Defined upper warning stock level of the material in this material buffer

Upper alarm limit (max. alarm quantity)

Defined upper alarm quantity of the material in this material buffer

Max. stock level

Defined max. stock level of the material in this material buffer

MPL-MPB_81.docx

Version: 1.0.18468

Page 18 of 18

