Consumption Statement

1  Consumption Statement

Overview

Menu

Operating facilities managementProduction facility analysis

Consumption statement

Transaction code

constat

Function authorization

constat

This  document  provides  a  description  of  the  "Consumption  statement"  application  in  the  Manufacturing

Operation Center (MOC).

Usage

The  consumption  statement  lists  each  of  the  energy  counter  resources.  It  shows  the  current  counter

reading  for  these  resources  since  the  last  reset.  You  can  create  a  report  that  shows  this  data.  The

counter readings can be reset in this period. To do so, select the resources using the multiple selection

option in the table. Furthermore, you can also enter a random period of time for the report so that not only

the flexible areas since the last statement are visible, but there is also the option to select random periods

and view each of the counter totals in these periods.

There  is  the  option  for  the  selection  to  achieve  multiple  filter  levels  in  tree-like  fashion  by  filtering  the

resources in the table using the defined counter hierarchy.

Integration

This application is connected with the following applications

-  Consumption  analysis  to  chronologically  distribute  consumptions  and  to  comparatively  analyze

them.

-  Energy/ consumption monitor to analyze the counter reading and the comparison resources.

-  The  monitor  values  can  also  be  visualized  in  the  graphic  park  by  integrating  the  counter

resources.

Selection criteria

Reference

Resources selection via the resource list

Resource type/ resource/ designation/ resource family

Selection criteria relating to resource

MOC_ConsumptionStatement.docx

Version: 1.0.1362

Page 1 of 2

Consumption Statement

Last statement to

This options is initially preselected. The start date equals the last reset time of the resource in each

case. The end date is predefined as "yesterday".

Thus, the report evaluates all documents that have an end time greater than the last reset time of

the resource and that have an end time smaller or equal to the end date entered.

As such, the report shows the consumption value in this period, the start date of the period and the

end date of the last document.

A reset can only be performed with this selection.

Period from/ to

Random time period considered in the evaluation.

A reset is not possible with this selection.

Field descriptions

Resource category

Resource master data

Energy consumption category

Consumption value with unit, specifying the period under consideration as well, i.e. from the start of

the first document to the end of the last document.

Toolbar

  Reset

Function with which to reset a statement.

For all of the selection resources (multiple selection possible), the reset date is set to the last date

value  for  the  documents  in  the  period  and  the  counter  in  the  status  is  set  to  zero.  (So,  the  reset

date always shows the end stamp of the last reading on this day as the time stamp. The remaining

surplus for the day will be included in the document for the next day and is settled the next time.

Resetting is only possible if it is possible for the selected resource.

Consumption statement

Opens the "Consumption statement" report.

MOC_ConsumptionStatement.docx

Version: 1.0.1362

Page 2 of 2

