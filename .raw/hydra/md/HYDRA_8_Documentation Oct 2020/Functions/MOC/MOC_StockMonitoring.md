Stock Monitoring

1  Stock Monitoring

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

MOC_StockMonitoring.docx

Version: 1.0.18468

Page 1 of 3

Stock Monitoring

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

MOC_StockMonitoring.docx

Version: 1.0.18468

Page 2 of 3

Stock Monitoring

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

MOC_StockMonitoring.docx

Version: 1.0.18468

Page 3 of 3

