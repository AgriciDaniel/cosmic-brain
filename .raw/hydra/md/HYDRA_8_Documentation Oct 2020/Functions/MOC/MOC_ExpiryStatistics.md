Expiry Statistics

1  Expiry Statistics

Summary

Menu

Material management  Inventory management  Expiry statistics

Transaction code

estat

Function authorization

estat

Usage

The  application  is  only  available  in  the  structure  described  here  if  the  modification

estatextensionselection is enabled.

If you do not use the modification, please refer to this document.

The  expiry  statistics  displays  how  much  material  has  expired  within  a  specific  period  or  how  much

generally expires within a specific period.

Integration

The  display  of  the  expiry  statistics  refers  to  the  material  entered,  the  material  type  or  material  buffer

entered and the period indicated with a grid spacing in the specified cycle. Possible grid values are: 5, 15,

30 minutes, 1, 5, 12 hours, daily, weekly, total.

Selection criteria

The application provides the following selection criteria:

Material

Only the expiry statistics for the selected material number is displayed.

Material type

Only the expiry statistics for the selected material type is displayed.

Evaluation mode

The evaluation mode indicates the grid spacing of the expiry statistics.

Material buffer

Only the expiry statistics for the selected material buffer is displayed.

MOC_ExpiryStatistics.docx

Version: 1.0.18468

Page 1 of 2

Expiry Statistics

Date from ... to ...

Only the expiry statistics for the selected period is displayed

Field Descriptions

Index

Consecutive number

Evaluation time

Point in time of the material expiration

Material

Material number

Material designation

Material designation

Material type

Material type

Quantity

Quantity

Unit

Quantity unit

Detail applications

Table display

In the table display, all of the fields returned by the data source are displayed. A sum is calculated

with regard to the quantity. Grouping and subtotals are possible.

Expired quantity per point in time on the grid

Quantity of material that has expired by the respective grid period. The quantity displayed depends

on the selection criteria made and can even contain quantities with differing quantity units.

Expired quantity per material in the evaluation period

Quantity of the respective material that has expired in the specified period.

MOC_ExpiryStatistics.docx

Version: 1.0.18468

Page 2 of 2

