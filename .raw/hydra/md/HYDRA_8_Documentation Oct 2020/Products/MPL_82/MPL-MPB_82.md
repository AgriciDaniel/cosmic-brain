Manual

Material Buffers and
Inventories
MPL-MPB 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Material Buffers and Inventories

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MPL-MPB_82.docx

Version: 1.0.23049

Page 2 of 16

Material Buffers and Inventories

Contents

1  Overview of Material Buffers and Inventories .............................................. 4

2  Applications Available in MOC ..................................................................... 5

3  Stock Monitoring .......................................................................................... 6

4  Requirements Overview ............................................................................... 9

5  Stock Overview .......................................................................................... 11

6  TPU Stock Overview .................................................................................. 14

MPL-MPB_82.docx

Version: 1.0.23049

Page 3 of 16

Material Buffers and Inventories

1

 Overview of Material Buffers and Inventories

Purpose

The  material  buffer  and  inventories  function  package  allows  for  material  stock  to  be  managed  and

evaluated.

Implementation Considerations

The function package "material buffers and inventories" is used if you

  use  the  function  packages  "material  and  inventory  management",  "batch  data  management"

and/or "batch processing" and

o  would like to enhance them by managing storage locations / storage bins;

o  would  like  to  record  which  anonymous,  logistical  containers  include  or  transport  the

material;

  would like the system to calculate the consumption of posted input materials (retrograde);

  would like to enter the consumption of posted input materials explicitly.

Integration



Input and output material buffers can be defined at the object "machine/workplace".

Features

  Management of buffer inventories

o  Management of material stock relating to material buffers or transport units

  Monitoring options for inventories

o  Monitoring of material stock relating to material buffers or transport units

  Management and monitoring of material requirements relating to existing inventories

MPL-MPB_82.docx

Version: 1.0.23049

Page 4 of 16

Material Buffers and Inventories

2  Applications Available in MOC

Application

Documentation

Transaction
code

Function
authorization

Stock monitoring

MOC_StockMonitoring.docx

stomo

Requirements overview

MOC_RequirementsOverview.docx

reqov

Stock overview

MOC_StockOverview.docx

Stock overview TPU

MOC_StockOverviewHU.docx

stov

stovhu

stomo

reqov

stov

stovhu

MPL-MPB_82.docx

Version: 1.0.23049

Page 5 of 16

Material Buffers and Inventories

3  Stock Monitoring

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

were defined for the respective material buffer will be shown in this list that updates cyclically. To do  so,

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

MPL-MPB_82.docx

Version: 1.0.23049

Page 6 of 16

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

MPL-MPB_82.docx

Version: 1.0.23049

Page 7 of 16

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

MPL-MPB_82.docx

Version: 1.0.23049

Page 8 of 16

Material Buffers and Inventories

4  Requirements Overview

Summary

Menu

Material management  Inventory management  Requirements overview

Transaction code

reqov

Function authorization

reqov

Usage

The  function  “material  requirements”  provides  an  overview  of  the  materials  required  at  machines.  It  is

particular  to  this  function  that  material  requirements  are  exactly  determined  by  day  taking  the  shift

calendar  into  account.  Consequently,  material  requirements  are  distributed  according  to  the  run  time  of

OP(s). “By day” means here “by shift”, i.e. the day starts with the beginning of shift 1 and ends with the

end of the last shift (e.g. shift 3).

Requirements

The PPS system transfers the materials required for the production of an operation and, as a result, they

are available in the component list of the OP within the system.

Please note:

The  determination  of  material  requirements  depends,  among  others,  on  the  planned  start  date  of  an

operation. For this reason, the planned start date of an operation needs to be transferred correctly by the

PPS system or planned in shop floor scheduling. If, however, the order sequencing function is used this

planned date is used to define the order of processing (internal algorithm). In this case, the planned start

date can no longer be derived.

Selection criteria

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The application provides the following selection criteria:

Material

Shows all materials assigned to the selected material.

Workplace

Shows all materials assigned to the selected workplace.

MES order number

Shows all materials assigned to the selected MES order number.

MPL-MPB_82.docx

Version: 1.0.23049

Page 9 of 16

Material Buffers and Inventories

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  assigned  to  the

selected material type are shown.

Planned start

Shows all materials assigned to the selected planned start.

Consider pool of groups

Defines whether or not the pool of groups is to be taken into account for selection.

MPL-MPB_82.docx

Version: 1.0.23049

Page 10 of 16

Material Buffers and Inventories

5  Stock Overview

Summary

Menu

Material management Inventory management Stock overview

Transaction code

stov

Function authorization

stov

Usage

The stock overview is an evaluation of the material management. Here, the employees of the warehouse,

dispatch and production supply or logistics departments can inspect the current buffer stock and/or stock

in production.

Integration

This evaluation shows the batch and material stock within a  material buffer cumulated for each material

and each batch status within the material, i.e. the material number. Such batches with a quantity of 0 and

batches that are not assigned to a material buffer will not be taken into account.

Selection criteria

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The following selection criteria are available in the application:

General

Batch number

(Externally used) batch number that is to be selected.

Material

All materials with the selected material number will be shown.

Internal batch number

Internal batch number that is unique within the system and that is to be selected.

Material buffer

This  selection  criterion  refers  to  the  material  buffer  of  the  batch.  All  batches  with  the  selected

material buffer will be used for the evaluation.

MPL-MPB_82.docx

Version: 1.0.23049

Page 11 of 16

Material Buffers and Inventories

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  with  the  selected

material type will be shown.

Batch status

This  selection  criterion  refers  to  the  batch  status  of  the  material.  All  materials  with  the  selected

batch status will be shown.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all inventories of batches that currently have

this identifier.

Batch attributes

Batch attributes

Selecting a batch attribute as a selection criterion displays all inventories of batches for the material

type of which this batch attribute has been configured and that are currently assigned this identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  inventories  of  batches

that currently have this identifier.

Field description

Primarily, the evaluation shows the current information on a batch as well as information on the material

buffer concerned.

Information on batch

The information per batch is the same as the one presented in the batch data overview.

Information on material buffer

In the stock overview the information on the material buffer will be shown per batch. This is primarily:

Material buffer

Material buffer of the batch

Designation

Designation of the material buffer

MPL-MPB_82.docx

Version: 1.0.23049

Page 12 of 16

Material Buffers and Inventories

Storage location

Assigned storage location of the material buffer

Type

Type of the material buffer

MPL-MPB_82.docx

Version: 1.0.23049

Page 13 of 16

Material Buffers and Inventories

6  TPU Stock Overview

Summary

Menu

Material management Inventory management TPU stock overview

Transaction code

stovhu

Function authorization

stovhu

Usage

The transport units stock overview is used to show the  quantities of materials in the individual transport

units. This can be used to determine which quantities of which material and which batches are included in

which transport unit and how the transport units are currently assigned.

Integration

A pre-selection of material, transport unit and of other criteria will be shown as cumulative display of the

batch/ material stock per transport unit. The display will be accumulated for each material, transport unit

and batch status. Batches with a remaining quantity of 0 will not be accounted for.

Only  those  materials  will  be  accounted  for  that  are  assigned  to  those  material  types,  for  which  the

"inventory management" indicator is not set to No.

Moreover,  only  those  transport  units  will  be  accounted  for,  for  which  the  "inventory  management"

indicator is set to "Y".

Selection parameters

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The following selection criteria are available in the application:

General

Batch number

All materials with the selected batch number will be shown.

Material

All materials with the selected material will be shown.

MPL-MPB_82.docx

Version: 1.0.23049

Page 14 of 16

Material Buffers and Inventories

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  with  the  selected

material type will be shown.

Batch status

This  selection  criterion  refers  to  the  batch  status  of  the  material.  All  materials  with  the  selected

batch status will be shown.

Transport unit

All materials with the selected transport unit will be shown.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all inventories of batches that currently have

this identifier.

Batch attributes

Batch attributes

Selecting a batch attribute as a selection criterion displays all inventories of batches for the material

type of which this batch attribute has been configured and that are currently assigned this identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  inventories  of  batches

that currently have this identifier.

Field description

Calculation of the values in the "inventory" category:

Number of batches

Quantity of batches (in line with the stock indicator set to the material type)

Quantity

Sum of yield + scrap

Unit

Yield

Unit from the configuration table TPU – material type

Quantity identified as yield that is in fact included in the "number of batches"

MPL-MPB_82.docx

Version: 1.0.23049

Page 15 of 16

Material Buffers and Inventories

Scrap

Quantity identified as scrap that is in fact included in the "Number of batches"

Calc. Quantity

Quantity of material that would fit into the currently assigned transport units:

  Quantity from the configuration TPU material type for this TPU x number of batches

Calc. Quantity of TPU

Quantity of TPU that would be necessary for the total quantity:

Quantity/ (quantity from the configuration TPU material type for this TPU)

The result will be rounded up to the next integer.

Batches that are not assigned to a transport unit will not be accounted for in this evaluation.

MPL-MPB_82.docx

Version: 1.0.23049

Page 16 of 16

