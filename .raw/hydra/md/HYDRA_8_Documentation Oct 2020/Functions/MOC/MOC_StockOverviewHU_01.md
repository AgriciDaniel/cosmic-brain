Stock Overview TPU

1  Stock Overview TPU

Summary

Menu

Material management Inventory management TPU stock overview

Transaction code

Function authorization

stovhu
stovhu

Usage

The transport units stock overview is used to show the quantities of materials in the individual transport

units. This can be used to determine which quantities of which material and which batches are included in

which transport unit and how the transport units are currently assigned.

Integration

A pre-selection of material, transport unit and of other criteria will be shown as cumulative display of the

batch/ material stock per transport unit. The display will be cumulated for each material, transport unit and

batch status. Batches with a remaining quantity of 0 will not be accounted for.

Only  those  materials  will  be  accounted  for  that  are  assigned  to  those  material  types,  for  which  the

"inventory management" indicator is not set to No.

Moreover,  only  those  transport  units  will  be  accounted  for,  for  which  the  "inventory  management"

indicator is set to "Y".

Selection parameters

The following selection criteria are available in the application:

Batch number

All materials with the selected batch number will be shown.

Batch status

This  selection  criterion  refers  to  the  batch  status  of  the  material.  All  materials  with  the  selected

batch status will be shown.

MOC_StockOverviewHU_01.docx

Version: 1.0.1362

Page 1 of 2

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  with  the  selected

Stock Overview TPU

material type will be shown.

Material

All materials with the selected material will be shown.

Transport unit

All materials with the selected transport unit will be shown.

If several selection criteria are used, the intersection of the selection criteria will be shown.

Field description

Calculation of the values in the stock category:

Number of batches

Quantity of batches (in line with the stock indicator set to the material type)

Quantity

Sum of yield + scrap

Unit

Yield

Unit from the configuration table TPU – material type

Quantity identified as yield that is in fact included in the "number of batches"

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

MOC_StockOverviewHU_01.docx

Version: 1.0.1362

Page 2 of 2

