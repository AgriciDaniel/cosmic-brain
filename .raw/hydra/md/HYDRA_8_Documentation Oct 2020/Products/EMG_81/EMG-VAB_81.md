Manual

Accounting for Energy
Consumption, Overview of
Energy Consumption (MOC)
EMG-VAB 8.1

Version 1.0.23049

Last changed on: 01.09.2020

 Accounting for Energy Consumption, Overview of Energy Consumption (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-VAB_81.docx

Version: 1.0.23049

Page 2 of 6

 Accounting for Energy Consumption, Overview of Energy Consumption (MOC)

Contents

1  Energy Management – Energy Consumption Invoicing ............................... 4

2  Consumption Statement ............................................................................... 5

EMG-VAB_81.docx

Version: 1.0.23049

Page 3 of 6

 Accounting for Energy Consumption, Overview of Energy Consumption (MOC)

1  Energy Management – Energy Consumption Invoicing

Purpose

Evaluation function for energy data. Functions for listing consumptions in entered periods. Management

of invoicing periods. Demarcation of the invoicing periods. Printable reports.

You use the function package when:

  You wish to list a summary of individual periods.

  You wish to display or print out the data since the last invoice.

  You  wish  to  reset  counter  readings  due  to  the  current  invoice  and  hence  demarcate  the

evaluation period.

Integration

The evaluations require the function package EMG-MGM for data collection as the basis.

Features

  Listing of the consumptions in freely selectable  intervals. Listing  of the consumptions in defined

invoicing  periods.  Selections  according  to  logistics  objects,  counters  or  machines  and  machine

evaluation groups.



Integration of KPIs such as costs into the lists (with EMG-KPI)

  Report function for creation of invoicing overviews.

  Termination  of  an  invoicing  period.  Management  and  storage  of  the  invoicing  periods  and  their

status.

EMG-VAB_81.docx

Version: 1.0.23049

Page 4 of 6

 Accounting for Energy Consumption, Overview of Energy Consumption (MOC)

2  Consumption Statement

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

EMG-VAB_81.docx

Version: 1.0.23049

Page 5 of 6

 Accounting for Energy Consumption, Overview of Energy Consumption (MOC)

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

EMG-VAB_81.docx

Version: 1.0.23049

Page 6 of 6

