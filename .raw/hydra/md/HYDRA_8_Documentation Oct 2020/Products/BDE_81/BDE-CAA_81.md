Manual

Controlling of Articles/Scrap
BDE-CAA 8.1

Version 1.0.4716

Last changed: 19.06.2020

Controlling of Articles/Scrap

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-CAA_81.docx

Version: 1.0.18468

Page 2 of 16

Controlling of Articles/Scrap

Contents

1  Übersicht Controlling Artikel / Ausschuss .................................................... 4

2  Article Profile ................................................................................................ 5

3  Scrap Statistics .......................................................................................... 10

4  Scrap Profile ............................................................................................... 14

BDE-CAA_81.docx

Version: 1.0.18468

Page 3 of 16

Controlling of Articles/Scrap

1  Übersicht Controlling Artikel / Ausschuss

Purpose

The overview controlling article / scrap function package offers the ability to evaluate data entered as a

part of shop floor data collection (BDE). You use the function package if:

  You would like to evaluate the shop floor data entered relating to articles

  You would like to evaluate the scrap data entered.

Integration

The  evaluations  are  based  on  the  data  collected  during  production.  For  this  purpose,  the  article-based

evaluations aggregate the quantities and times relating to an order, while the scrap evaluations analyze

the scrap quantities recorded.

Features

  Article profile

o  Article  profile  with  comparison  to  the  scrap  accumulated  as  well  as  the  time  recorded

(consolidated in resource performance accounts)

  Scrap statistics

o  Workplace and article-related scrap (reason) statistics. Tabular display of total and scrap

quantity, scrap rate and the calculated scrap ratio. Graphic display of scrap quantities by

workplace, article or scrap reason.

o  Scrap statistics expanded with columns like machine, machine designation, cost center,

group, article, order, tool, scrap reason, scrap quantity, scrap rate as % of total quantity

(formula), total quantity, scrap quantity as % of total scrap quantity

o  Ability to select by machine, order, article number, cost center, group, tool, time and shift

o  Optional calculation of scrap ratios as % of total quantity, of articles or machines

o  Display of yield, rework, problem quantity and total quantity

  Scrap profile

o  Evaluations of scrap quantities entered over time. Staging of data in table and pivot table

form.  Data  evaluation  in  pivot  table  form  by  various  criteria.  Graphical  presentation  of

data in pivot table form.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 4 von 16

Controlling of Articles/Scrap

2  Article Profile

Summary

Menu

Order Management  Order Controlling  Article Profile

Transaction code

artpf

Function authorization

artpf

The  Article  profile  application  is  designed  for  users  in  the  departments  Production  controlling,  Order

controlling or Final costing. It compares orders across a defined period of time that produced the same

article and displays comparisons of their production times and downtimes. Based on the selection made

via the order header article (the order's final product) and, optionally, a defined period of time, all orders

that produced that article are displayed along with their results.

Integration

The application is based on the order-related quantities and times entered during production.

Requirement

The application only looks at production orders - not individual operations. Only those production orders

are  considered  that  have  the  control  status  "finished"  in  their  order  headers.  Production  orders  with  a

different control status are not considered.

Selection criteria

The  application  provides  the  selection  criteria  listed  below:  Irrespective  of  these  selection  criteria,

generally only orders are selected that have already started (in process) or that are finished.

Final product

This  selection  criterion  refers  to  the  article  in  the  order  header.  All  orders  are  displayed,  to  which

the article entered has been assigned. The use of wildcards (placeholders *) is allowed.

Article designation

This selection criterion refers to the article designation defined in the order. All orders are displayed

that contain the article designation selected.

Order status

This  selection  criterion  refers  to  the  status  of  the  order.  Only  those  orders  are  displayed  with  an

order status that matches the criteria entered. Irrespective of this restriction, generally only orders

are considered and selected that have already started (in process) or that are finished.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 5 von 16

Controlling of Articles/Scrap

Category

This  selection  criterion  refers  to  the  order  type  category  of  the  order.  Only  those  orders  are

displayed with an order type that is associated with the category entered.

Order

This  selection  criterion  refers  to  the  order  number.  Orders  are  displayed  that  contain  the  order

number entered. There is an option to use wildcards (placeholders *).

Order type

This selection criterion refers to the order type. Orders of the order type entered are displayed.

Order end ... until ...

This selection criterion refers to the point in time at which the order(header) is changed to "finished"

status. In this case, only the finished orders are displayed with an actual end that is set between the

selected dates. This occurs irrespective of whether there is a restriction on the order status.

The responsibility area is not checked in this application.

Article profile detail application (table)

All  orders  that  match  the  selections  entered  are  displayed  in  the  article  profile  detail  application  table

view. A selection of columns is described below:

Status

Current  status  of  the  order.  Generally,  only  orders  are  considered  that  have  started  or  that  are

finished.

Status since date, status since time

Point in time as of which the current status of the order applies.

Order

Order number of the order

Final product

Article number of the order(header).

Article designation

Name of the article listed in the order(header).

SUT, DCI, SCI, LCI, IMS, IMN, SET, STA, U8, U9, MUT

The  durations  that  were  posted  to  each  resource  performance  account  are  displayed  in  the

columns.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 6 von 16

Controlling of Articles/Scrap

Retention period of order

The retention period of the order is the period between the time the order was first transferred from

the PPS system ("order release" = order header creation date in HYDRA) and the time of the actual

logoff (in terms of time) of the last active operation of the order.

Please note: Whether the time of the order transfer is the time it was first transferred from the PPS

system or the time it was re-transferred because it had been deleted in the meantime for technical

reasons, cannot be determined or taken into consideration using HYDRA. If an order is transferred

more than once, and with each transfer the previous order is deleted, the creation date of the order

header is the time of the last transfer.

Please note: If the order is not yet finished, the value calculated here is not significant.

Lead time

The order duration is the period between the time the first operation of the order is logged on and

the time the last active operation is logged off.

Please note: If the order is not yet finished, the value calculated here is not significant.

Processing time

The processing time of the order is the sum of the main utilization times (RPA 11) of all recordable

active operations.

Downtime period

The  downtime  period  of  the  order  is  the  sum  of  the  downtimes  (RPA  1..6,  RPA  8..10)  of  all

recordable active operations.

Please note: the setup time can be found in the corresponding resource performance account (RPA

7/ SET).

Assignment time

The  occupancy  time  is  the  sum  of  the  setup  time  (RPA  7),  processing  time  (RPA  11)  and

downtimes (RPA 1..6, RPA 8..10) of all recordable active operations.

Yield

Recorded  yield in base quantity unit of the  last recordable operation. This requires that the unit in

which the quantity is entered (primary quantity unit) can be converted into the base quantity unit.

Scrap

Sum of the scrap quantities entered for all operations posted in base quantity unit.

Rework

Sum of the rework quantities entered for all operations posted in base quantity unit.

Open quantity

Sum of the recorded problem quantities entered for all operations posted in base quantity unit.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 7 von 16

Controlling of Articles/Scrap

Unit

Quantity unit of the order

Rate of capacity utilization

The  rate  of  capacity  utilization  is  the  ratio  of  processing  time  (RPA  11)  to  occupancy  time  (RPA

1..11)

Setup rate

The setup rate is the ratio of setup time (RPA 7) to occupancy time (RPA 1..11)

Article profile detail application (graphic)

By selecting one or more orders in the table, the following information is displayed in the graphic for those

orders:

Upper graphic

In the upper graphic of the article profile, three bars are displayed for each of the orders selected in the

table:

  On the left: Scrap in percent based on the finished total quantity of the order (yield + scrap + rework +

problem quantity in base quantity unit).



In the middle: Main utilization time in percent based on the occupancy time of the order

  On the right: Downtime periods (RPA 1 to 10) in percent based on the occupancy time ( RPA 1 to 11)

of the order

The colors of the time bars correspond to the defined RPA colors; scrap bars are generally displayed in

red.

Lower graphic

In the lower graphic of the article profile, the absolute values of a single RPA or of the scrap are displayed

in bar form for each selected order. The user determines which value is displayed by clicking in the upper

graphic.

The individual order numbers are displayed on the X axis, while the unit of the value is displayed on the Y

axis. If durations are greater than 24 hours, they are displayed in days.hours:minutes:seconds.

Each  value  selected  (scrap  or  name  of  the  resource  performance  account)  is  displayed  beneath  the

graphic.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 8 von 16

Controlling of Articles/Scrap

BDE-CAA_81.docx

Version: 1.0.18468

Seite 9 von 16

Controlling of Articles/Scrap

3  Scrap Statistics

Summary

Menu

Order management  Order controlling  Scrap statistics

Transaction code

scrst

Function authorization

scrst

Anyone interested in improving scrap rates in a company must have knowledge of how and where scrap

is accrued. The scrap statistics provide a tool that allows not only the scrap  quantity to be reported, but

also all of the scrap reasons that applied during a selected period. In it, scrap recorded automatically is

considered  in  the  evaluation.  The  scrap  statistics  use  graphic  illustrations  to  provide  the  user  with

impressive hit lists of the most frequent scrap reasons.

Integration

The order-related log records for the record type "T" form the data basis used to display quantities in the

scrap  statistics.  These  are  generated  at  the  shop  floor  terminal  either  due  to  manual  partial  uploads  or

because of an operation interruption or logoff, provided that quantities are recorded in this case.

Selection criteria

The application provides the following selection criteria:

Workplace/ short designation/ group/ cost center/ company/ responsibility area

You  use  this  index  tab  to  define  which  workplaces/  machines  are  used  in  the  evaluation.  In  the

process, data are accessed from the master data of the workplace/ machine configuration.

Article/ article designation

Selection by article or article designation

Order/ order type

The evaluation can be limited to an order or an order type.

Date

Shift

Time

The time period entered restricts the selection by log records. The log records of record type T are

selected that have a posting time within the defined period.

Within the entered period, only those log records are selected that are assigned to the shift entered.

Within the entered period,  only those log records are  selected that  were posted  during the  period

entered.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 10 von 16

Controlling of Articles/Scrap

Reason

Selection based on a defined scrap reason.

Sales order

If a sales order is assigned in the production order, the selection can be based on it.

Project number

If a project number is assigned in the production order, the selection can be based on it.

Report group

The  report  group  option  allows  you  to  limit  the  selection  to  a  specific  group  of  workplaces/

machines. For this purpose, the report group must be defined in the group configuration option.

Show yield

If this option is set, the yield recorded in the selection period is also shown.

Scrap statistics detail application

The scrap statistics detail  application  generates a table  view of all of the scrap reasons accrued over a

selected period of time along with the scrap quantity. The order-related log records for the record type "T"

form  the  data  basis  for  the  selection.  The  quantities  calculated  generally  relate  to  the  primary  quantity

unit. When these are summed up, the different quantity units are not converted.

In the scrap statistics, only operations are displayed that posted at least one partial upload with

scrap during the evaluation period.

Please keep in mind that a yield in the column Yield (P) is then shown if the option "Show yield" is set. It

is shown in a separate line per order/ OP and workplace.

Please note with regard to the selected columns:

Scrap

The  scrap  column  shows  the  scrap  quantity  relating  to  scrap  reason,  workplace  and  order/

operation.

Please keep in mind that the scrap quantity shown may also be negative in certain constellations.

This can be the case, for example, if scrap is offset against yield.

Scrap rate

Proportion  of  scrap  (primary  quantity  unit)  as  compared  to  the  total  quantity  produced  of  the

operation (primary quantity unit) during the evaluation period.

The  term  total  quantity  is  understood  as  the  sum  total  of  all  four  quantity  accounts  (yield,  scrap,

rework,  open  quantity).  Please  keep  in  mind  that  the  rework  quantity  and  open  quantity  are  not

shown in the scrap statistics.

Calculation:

BDE-CAA_81.docx

Version: 1.0.18468

Seite 11 von 16

Controlling of Articles/Scrap

Scrap rate = 100.0 * EGR_AUS / (ANR_GUTP+ANR_AUSP+ANR_NCHP+ANR_PRBP)

Comparison yield - scrap detail application

This detail application provides a comparison of the yield and scrap quantity shown in the form of a bar

chart.  In  it,  the  bars  represent  the  relationship  between  the  two  quantity  types.  The  percentage  is

visualized in each bar.

Scrap hit list (scrap reasons) detail application

The  scrap  hit  list  (scrap  reasons)  is  a  compilation  of  the  recorded  scrap  quantities,  grouped  by  scrap

reason and shown in graphic form.

The bar chart displayed depends on which entries were highlighted in the tabular detail application. If all

of  the  entries  shown  in  the  table  are  to  be  taken  into  account  in  the  chart,  highlight  the  entire  table  by

clicking  on  the  box  at  the  top  left.  We  recommend  that  you  deactivate  the  option  "Show  yield"  when

highlighting.

The  bar  chart  shows  the  accumulated  value  per  scrap  reason  for  each  bar  over  all  selected  entries  as

well  as  the  percentage  in  relation  to  the  entire  scrap  quantity  determined  during  the  evaluation  period.

The total scrap quantity is displayed in the totals line of the "scrap statistic" detail application.

Example: the detail application "scrap statistic shows a total scrap quantity of 1.171 in the totals line for a

selected period. If an entry showing a scrap quantity of 122 is selected, the graphic shows a percentage

of 14.42.

Scrap hit list (workplaces) detail application

The scrap hit  list (workplaces) is a compilation  of the  recorded scrap  quantities,  grouped  by  workplace/

machine and shown in graphic form.

The bar chart displayed depends on which entries were highlighted in the tabular detail application. If all

of  the  entries  shown  in  the  table  are  to  be  taken  into  account  in  the  chart,  highlight  the  entire  table  by

clicking  on  the  box  on  the  top  left.  We  recommend  that  you  deactivate  the  option  "Show  yield"  when

highlighting.

The  bar  chart  shows  the  accumulated  value  per  scrap  reason  for  each  bar  over  all  selected  entries  as

well  as  the  percentage  in  relation  to  the  entire  scrap  quantity  determined  during  the  evaluation  period.

The total scrap quantity is displayed in the totals line of the "scrap statistic" detail application.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 12 von 16

Controlling of Articles/Scrap

Toolbar

 Order information

Calls up the order information for the currently selected order.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 13 von 16

Controlling of Articles/Scrap

4  Scrap Profile

Summary

Menu

Order Management  Order Controlling  Scrap Profile

Transaction code

scrpf

Function authorization

scrpf

Anyone interested in improving scrap rates in a company must have knowledge of how and where scrap

is accrued. The scrap profile is a tool that allows not only the scrap quantity to be reported, but also all of

the scrap reasons that applied during a selected period.

Selection criteria

The application provides the following selection criteria:

Date

Shift

Time

The time period entered restricts the selection by log records. The BDE log records of record type T

are selected that have a posting time within the defined period.

Within the entered period, only those log records are selected that are assigned to the shift entered.

Within the entered period,  only those log records are  selected that  were posted  during the  period

entered.

Workplace/ group/ cost center/ company/ short designation/ designation/ responsibility area

These entries define which workplaces/ machines are used in the evaluation. In the process, data

is accessed from the master data of the workplace/ machine configuration.

Report group

The  report  group  option  allows  you  to  limit  the  selection  to  a  specific  group  of  workplaces/

machines. For this purpose, the report group must be defined in the Group configuration option.

Reason

Selection based on a defined scrap reason.

Order/ order type

The evaluation can be limited to an order.

Article

Selection based on article.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 14 von 16

Controlling of Articles/Scrap

Sales order

If a sales order is assigned in the production order, the selection can be based on it.

Project number

If a project number is assigned in the production order, the selection can be based on it.

Scrap profile detail application

The  scrap  profile  detail  application  generates  a  table  view  of  all  of  the  scrap  reasons  accrued  over  a

selected period of time along with the scrap quantity.

Note about the column "Scrap rate":

The scrap rate relates to the total quantity posted during the selected period of time (sum total of all yield,

scrap, rework quantity and open quantity in the primary quantity unit) for the combination workplace/ MES

order number.

Example: The following quantities are recorded at a workplace for an order/ operation for a defined period

of time:

Day

1

2

3

4

5

Yield

Scrap

10

12

0

14

8

1

0

0

1

2

If a selection is made over the period of time Day 2 - Day 5, on each of the days 4 and 5 scrap quantities

accrued  that  are  displayed  in  the  scrap  profile.  The  scrap  rate  relates  to  the  quantity  posted  during  the

entire selection period (here: 12+14+8+1+2 = 37):

Day

4

5

Scrap

Scrap rate

1

2

2.7

5.4

Because a scrap rate calculation also includes postings that show a yield, but with no scrap,

there may also be entries with a scrap quantity of zero in the displayed results.

If necessary, these can be hidden using the Filter editor.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 15 von 16

Controlling of Articles/Scrap

Pivot table detail application

The  pivot  table  detail  application  generates  a  table  view  of  all  of  the  scrap  reasons  accrued  over  a

selected period of time along with the scrap quantity. For each scrap reason, for example, (depending on

the pivot table settings) one column is displayed. The scrap recorded automatically is shown separately.

Scrap (P)

This pivot element contains the primary quantities.

Scrap reason

This pivot element contains the scrap reasons (number designated to the scrap reason).

Date

This pivot element contains the date information for the accrued scrap.

In addition to the fields listed below, the detail application also contains a number of other fields. You can

select these additional fields from the field list. To do so, with your mouse, right click in the area above the

column headings and select the entry "Show field list" in the context menu.

Because a scrap rate calculation also includes postings that show a yield, but with no scrap,

there may also be entries with a scrap quantity of zero in the displayed results.

If necessary, these can be hidden using the Filter editor.

BDE-CAA_81.docx

Version: 1.0.18468

Seite 16 von 16

