Assignment Material - Material Type

1  Assignment Material - Material Type

Overview

Menu

Master data  Material  Material assignment - Material type

Transaction code

asmm

Function authorization

asmm

Usage

This function is used to assign the appropriate material type to a material in the system.

Integration

Each material can be assigned to a material type. The assignment is used



if a goods receipt batch is recorded manually



if an unknown batch is defined

Requirement

The material type must be defined in the system.

Selection criteria

The following selection criteria are available in the application:

Material

Only the selected materials are selected.

Material type

Only materials with the selected material type are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

Field descriptions

Material

Material number that is to be assigned to the material type.

MOC_AssignementMaterialMaterialtype.docxVersion: 1.0.18468

Page 1 of 2

Assignment Material - Material Type

Material type

Assigned material type. This must be defined in the system.

Comment

Additional text regarding the material, comments

Min. storage time

Minimum storage time for the material type

During  batch  determination,  the  corresponding  availability  date  is  calculated  using  this  value  (by

adding it to the date of manufacture). Up to that point, a batch remains in "Min. storage time" status

and cannot be registered.

Please  note:  this  setting  overrides  the  setting  with  the  same  name  in  the  Material  type

configuration.

Warning limit

Warning limit of the material type

During  batch  determination,  the  corresponding  warning  date  is  calculated  using  this  value  (by

adding  it  to  the  date  of  manufacture).  This  can  be  used  for  an  evaluation,  e.g.  using  the  function

Warning report.

Please  note:  this  setting  overrides  the  setting  with  the  same  name  in  the  Material  type

configuration.

Expiry limit

Expiry limit of the material type

During batch determination, the corresponding expiry date is calculated using this value (by adding

it to the date of manufacture). At this point in time the batch is automatically set to "Expired" status,

so it can no longer be registered.

this setting overrides the setting with the same name in the Material type configuration.

Notes

A  material  can  only  be  assigned  to  exactly  one  material  type.  However,  one  material  type  can  be

assigned several materials. The saving procedure for material is case sensitive. The so-called wildcards

"*"  and  "?"  can  be  used  in  the  material  field.  The  selected  material  type  must  exist  during  creation.

Otherwise, the creation will be refused.

If a material is assigned to another material type, the material type is NOT automatically updated

- for existing orders/operations

- for existing component lists

- in the existing batches

MOC_AssignementMaterialMaterialtype.docxVersion: 1.0.18468

Page 2 of 2

