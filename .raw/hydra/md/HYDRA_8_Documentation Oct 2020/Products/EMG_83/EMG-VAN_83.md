Manual

Energy Management
Consumption Analysis
EMG-VAN 8.3

Version 1.0.23049

Last changed on: 01.09.2020

Energy Management Consumption Analysis

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-VAN_83.docx

Version: 1.0.23049

Page 2 of 13

Energy Management Consumption Analysis

Contents

1  Energy Management - Energy Consumption Analysis ................................ 4

2  Consumption analysis .................................................................................. 6

3  Consumption/Energy Monitor ....................................................................... 8

4  Consumption Statement ............................................................................. 12

EMG-VAN_83.docx

Version: 1.0.23049

Page 3 of 13

Energy Management Consumption Analysis

1  Energy Management - Energy Consumption Analysis

Purpose

You  can  use  the  efficient  evaluations  to  monitor  the  development  of  energy  consumption,  which  add  to

the basic evaluation of the tabular consumption statistics.

The  following  functions  are  provided:  List  of  consumption  values  in  definable  periods;  management  of

settlement periods; definition of settlement periods; print of reports.

You can make a hierarchical selection to display the company's energy counters in a table. You can show

the  logical  energy  counters  assigned  to  machines  and  systems  and  display  the  consumption  and

comparison values. You can also display the counter hierarchy.

You use the function package for the following purposes:

  You want to analyze consumption over time.

  You want to list totals values for specific periods of time.

  You want to show or print data since the last settlement.

  You  want  to  reset  counter  readings  after  the  current  settlement  and  hereby  limit  the  analyzed

period.

  You  want  to  get  an  overview  of  the  current  status  of  energy  consumption  since  the  last

settlement.

Integration

The reports require the function package EMG-MGM as a basis for data collection.

Features

Consumption analysis

  Graphic consumption statistics: Show the values of a statistical table as bar chart.

  Show  reports  on  the  development  of  energy  consumption  in  table  form.  Display  the  energy

consumption of the real and the logical (calculated) counters over time. Flexible filter settings and

aggregate functions are provided.

  Expand the monitoring of hierarchical energy data in order to evaluate historical data of definable

periods.

  Multiple options to aggregate data by machines, counters, report groups and other logistic objects

are provided.

Consumption statement

EMG-VAN_83.docx

Version: 1.0.23049

Page 4 of 13

Energy Management Consumption Analysis

  List  the  consumption  values  for  periods  of  time  that  you  can  specify.  List  the  consumption  for

defined  settlement  periods.  Select  by  logistic  objects,  counters,  machines  or  machine  report

groups.



Integrate KPIs like costs in the lists (using EMG-KPI).

  Report function: Create settlement overviews.

  Complete a settlement period. Manage and store settlement periods including the statuses.

Energy Monitor

  Display the current energy counters and power meters in a dynamic tree-like structure.

  Display machines and other logistic objects with their relation in the counters' structure.

  Create dynamic object hierarchies integrating multiple selection criteria like counters, machines,

report groups and other logistic objects.

  Display  counters,  the  consumption  of  counters,  limits  and  limit  violations  as  well  as  implausible

configurations and values in the graphic nodes.

  Energy balance: Show the energy differences in the counter hierarchy.

  Drill-down-mechanism in the branches of a tree structure.

EMG-VAN_83.docx

Version: 1.0.23049

Page 5 of 13

Energy Management Consumption Analysis

2  Consumption analysis

Overview

Menu

Production Facility Management  Resource analysis

 Consumption analysis

Transaction code

cona

Function authorization

cona

This document describes the application "Consumption analysis" in the Manufacturing Operation Center

(MOC).

Purpose

Using  the  consumption  analysis,  you  can  display  the  consumptions  of  selected  counter  resources  in

chronological  order.  The  consecutive  time  intervals  are  called  compressions.  The  compression  interval

can  be  set  to  hours,  days,  weeks  and  months.  The  listed  table  rows  show  the  resource's  consumption

values in the corresponding compression interval as well as the values of the comparison resources. In

the pivot table, you can correlate the compressed values in many ways.

When  selecting  values,  you  have  the  possibility  to  filter  the  resources  in  multiple  ways  in  tree-like  form

using the defined counter hierarchies.

Integration

This application is connected with the following applications:

-  Consumption monitor to display the current counter readings since the reset.

-  Consumption statement for an analysis of the totals and to reset the data.

Selection criteria

Reference

Selection of resources using the resource list

Resource type / Resource / Name / Resource family

Selection criteria relating to the resource.

Period from / until

Time period considered in an evaluation

EMG-VAN_83.docx

Version: 1.0.23049

Page 6 of 13

Energy Management Consumption Analysis

Compress preselection

Select time interval for the compression (every 15 minutes, hour, day, week, month, year):

- Select between 15 minutes and one week (EMG 8.2)

- Select between one hour and one week

- Select between one day and three months

- Select between one week and two years

Field descriptions

Resource

Resource master data

Date

Time  reference  for  the  consumption  values.  The  compression  depends  on  the  preselected

compression and the considered time period.

Consumption

Consumption value with unit.

The accuracy indicates the quality data.  The data quality is the sum total of all documents (degree

of overlapping in percent * duration in the interval) / sum total (durations in the interval)

.

A value 1.0 = Good and a value 0.0 = Poor.

Comparison values 1 / 2

Consumption values of the comparison resource. In addition, the deviation in absolute values and

as a percentage is shown.

Detail application pivot consumption analysis

In  the  pivot  table,  you  can  compress  even  more  the  data  by  time  period/counters.  The

corresponding bar chart illustrates the displayed values.

The bar chart of the pivot grid shows a maximum of 10 bars (for each value).

EMG-VAN_83.docx

Version: 1.0.23049

Page 7 of 13

Energy Management Consumption Analysis

3  Consumption/Energy Monitor

Overview

Menu

Production Facility Management  Resource analysis

 Energy monitor

Transaction code

conmon

Function authorization

conmon

This  document  provides  a  description  of  the  "Consumption/  energy  monitor"  application  in  the

Manufacturing Operation Center (MOC).

Purpose

The energy monitor  lists the energy counters (resources). The energy monitor shows the current status

for these resources, allowing a comparison with comparative resources. This makes it possible to display

an energy balance. The system always shows the counted quantities since the last inventory, i.e. since

the counter was reset.

You can also display the balance in a graphic. The same applies to the counter hierarchy defined by the

BOM including the meter readings of the selected resource.

When  you  select  data,  you  can  use  the  defined  counter  hierarchies  in  tree-like  structure  to  filter  the

resources in the table multiple times.

Integration

This application is connected with the following applications:

-  Consumption analysis to chronologically distribute consumption values

-  Consumption statement to analyze the totals and to reset data.

-  You can also visualize the monitor values in the graphic machinery due to the integration of the

counters (resources).

Selection criteria

Resource type

Type of resource.

Workplaces  and machines  always  have  the  resource  type  MNR.  But  you  can  configure  individual

resource types for the other resources. Predefined resource types include:

DNC

NC/DNC program

EMG-VAN_83.docx

Version: 1.0.23049

Page 8 of 13

Energy Management Consumption Analysis

DOC

Document

ENT

Removal device

MNR  Workplace/Machine

PAC

Packaging, transportation container

PRM

Test and measuring equipment

PER

Production staff / general

PRU

Setup staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

Resource from ... to ...

This  selection  criterion  refers  to  the  resource.  You  can  also  run  a  search  using  wildcards

(placeholders * and ?).

Designation (name)

Name of the resource.

Cost center

Cost center of the resource.

Responsibility area

Responsibility area to which the resource is assigned.

Resource family

The resource family to which the resource is assigned.

Storage location

Regular storage location of the resource.

User fields

MD user fields 1- 6 of the resource.

Reference

The resource's internal ID.

Field descriptions

"General" category

Resource type

Resource  type  of  the  resource.  By  default,  the  HYDRA  system  includes  some  default  resource

types. You can configure additional resource types in HYDRA.

EMG-VAN_83.docx

Version: 1.0.23049

Page 9 of 13

Energy Management Consumption Analysis

Resource

Resource as a reference point for comparisons.

Designation (name)

Name of the resource.

Resource status

Resource status.

Cost center

Cost center

"Resource" category

Current value

Current value

Quantity unit (P)

Quantity unit (P)

Absolute value limit (only available if the EMG-KBW license has been purchased)

Absolute value limit

Reset time

Date on which the resource counters were reset.

Status time

Status time

"Key figures" category (only available if the EMG-KBW license has been purchased)

Energy consumption per hour

Energy consumption per hour

Key figure 2 to 10

You  can  show  up  to  nine  additional  key  figures.  Use  the  formula  management  to  define  the  key

figures (KPIs). You can configure the formulas eovf2 to eovf10.

"Comparison resource 1/2" category

Resource 1 / Resource 2

Resource whose values are to be compared with those of the reference point.

Current value

Absolute difference between the values of the reference resource and the comparison resource.

Difference, in percent

Relative difference between the reference resource values and the comparison resource values.

EMG-VAN_83.docx

Version: 1.0.23049

Page 10 of 13

Energy Management Consumption Analysis

Unit

Unit

Resource type 1 / Resource type 2

Resource type of the comparison resource.

Reset time

Date on which the counters of the comparison resource were reset.

Status time

Status time

Setting a reset time

The reset date depends on the entered records.

If you select a reset date that coincides with a resource record period, the system sets the reset

time to the start time of this resource record.

If you select a reset date that does not coincide with a resource record period, the system uses

the start time of the next resource record as the reset time.

The system uses the reset time you enter if:

- you select a reset date that does not coincide with a resource record period and

- there is no record that starts at a later point in time.

EMG-VAN_83.docx

Version: 1.0.23049

Page 11 of 13

Energy Management Consumption Analysis

4  Consumption Statement

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

EMG-VAN_83.docx

Version: 1.0.23049

Page 12 of 13

Energy Management Consumption Analysis

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

EMG-VAN_83.docx

Version: 1.0.23049

Page 13 of 13

