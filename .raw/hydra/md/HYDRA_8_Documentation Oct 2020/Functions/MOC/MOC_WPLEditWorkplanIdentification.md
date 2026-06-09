Work Plan Identification

1  Work Plan Identification

Overview

Menu HYDRA

Order management  Work plan management  Work plan identification

Menu FEDRA

Detailed scheduling  Order management  Work plan identification

Transaction code

edwident

Function authorization

edwident

Usage

Work plan identification is a function to manage work plans. Work plan management allows various work

plans  to  be  defined  for  different  order  types,  articles,  material  types  and/or  batch  sizes  (quantities).  On

this basis, the relevant work plan is determined by appropriate (internal) identification mechanisms.

Integration

Prerequisite

Appropriate work plans must have been created for work plan identification.

Selection Criteria

The following selection criteria are available in the application:

  Work plan

  Order type

  Article

  Material type

Field Descriptions

Work plan

Reference to the work plan to be determined using identification parameters.

Active

This option must be set so that the entry is considered in work plan identification.

Version

The version is used for entry versioning. It is not relevant for processing.

MOC_WPLEditWorkplanIdentification.docxVersion: 1.0.23328

Page 1 of 3

Work Plan Identification

Order type

Order type for which an order is to be created. This is used as an identification parameter and has

to be set.

If  identification  is  to  be  performed  by  order  type  only,  the  Article  and  Material  type  fields  must

remain empty.

The order type in the work plan must be identical to the order type indicated here.

Article

Article to be produced. This is used as an optional identification parameter.

If identification is to be performed by the article, the Material type field must remain empty.

Material type

Material type of the article to be produced. This is used as an optional identification parameter.

If identification is to be performed by the material type, the Article field must remain empty.

Quantity unit

Quantity unit to which the following batch sizes refer.

Batch size from, Batch size to

Batch size range in which the work plan is to be applied.

Optimum batch size

Optimum batch size applicable for work plan identification on the basis of batch sizes.

Generate partial batches

Reserved

Comment

Note about the entry.

Work plan identification

A work plan is identified in the following sequence:

  Order type + Article [+ Target quantity of order/base quantity unit]

  Order type + Material type [+ Target quantity of order/base quantity unit]

  Order type [+ Target quantity of order/base quantity unit]

The  order  type  must  always  be  set.  Article  and/or  material  type  may  be  set  optionally,  but  only  as  an

alternative to the other. This means that the other field must remain empty in this case.

MOC_WPLEditWorkplanIdentification.docxVersion: 1.0.23328

Page 2 of 3

Work Plan Identification

If no work plan is identified by the article, an attempt is made to determine the material type for the article

on  the  basis  of  the  master  data  table  "Assignment  material-material  type"  (can  be  configured  when

MPL/TRT is used), and subsequently an attempt is made to identify a work plan for this material type.

The quantity entered is considered in the identification. This means an attempt is made to identify a work

plan whose transferred target quantity ranges between the "Batch size from" and "Batch size to". If this

applies to more than one work plan, the work plan whose target quantity is nearest to the "Optimum batch

size" is selected.

If  the  transferred  base  quantity  unit  is  not  equal  to  the  quantity  unit  in  work  plan  identification,  the

transferred quantity is converted. The unit is converted by means of the "unit conversion" configuration.

If the conversion of the two units is not defined in the "Unit conversion" configuration, conversion will not

be possible and an error message will be displayed.

MOC_WPLEditWorkplanIdentification.docxVersion: 1.0.23328

Page 3 of 3

