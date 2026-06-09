Manual

Controlling of Articles/Scrap
BDE-CAA 8.2

Version 1.0.23049

Last changed: 01.09.2020

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

BDE-CAA_82.docx

Version: 1.0.23049

Page 2 of 16

Controlling of Articles/Scrap

Contents

1  Overview Controlling article/scrap................................................................ 4

2  Article Profile ................................................................................................ 5

3  Scrap Statistics .......................................................................................... 10

4  Scrap profile ............................................................................................... 14

BDE-CAA_82.docx

Version: 1.0.23049

Page 3 of 16

Controlling of Articles/Scrap

1  Overview Controlling article/scrap

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

BDE-CAA_82.docx

Version: 1.0.23049

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

BDE-CAA_82.docx

Version: 1.0.23049

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

BDE-CAA_82.docx

Version: 1.0.23049

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

BDE-CAA_82.docx

Version: 1.0.23049

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

BDE-CAA_82.docx

Version: 1.0.23049

Seite 8 von 16

Controlling of Articles/Scrap

BDE-CAA_82.docx

Version: 1.0.23049

Seite 9 von 16

Controlling of Articles/Scrap

3  Scrap Statistics

Overview

Menu

Order management  Order controlling  Scrap statistics

Transaction code

scrst

Function authorization

scrst

Any person in a company who wants to reduce scrap must have knowledge of how and where scrap is

accrued.  The  Scrap  statistics  provide  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded  in  a  specified  period  of  time.  The  report  also  includes  the  scrap  that  has  been  recorded

automatically. The Scrap statistics use graphic displays to show ranking lists of the most frequent scrap

reasons.

Integration

The order-related log records of record type "T" are the data basis used to display quantities in the scrap

statistics.  The  log  records  are  generated  on  the  shop  floor  terminal  when  part  quantities  are  manually

uploaded or when an operation is interrupted or logged off and quantities are recorded.

Selection criteria

The application provides the following selection criteria:

Workplace/short name/group/cost center/company/responsibility area

These fields specify the workplaces/machines that are used for the evaluation. To select an entry,

you access the master data of the workplace/machine configuration.

Article/article designation

Selection by article or article designation

Order/order type

You can limit the evaluation to one order or order type.

Date

Shift

Enter  a  period  of  time  to  narrow  down  the  log  records  displayed.  The  application  selects  the  log

records of record type "T" with a posting time that is included in the period of time specified.

In the period of time specified above, only those log records are selected that are assigned to the

shift specified.

BDE-CAA_82.docx

Version: 1.0.23049

Seite 10 von 16

Time

In the period of time specified above, only those log records are selected that were booked in the

Controlling of Articles/Scrap

time specified.

Reason

Selection based on a specific scrap reason.

Sales order

If a sales order is assigned to the production order, this sales order can be used to select the data.

Project number

If a project number is assigned to the production order, this number can be used to select the data.

Report group

Use

the  option  Report  group

to  narrow  down

the  selection

to  a  specific  group  of

workplaces/machines. You must define the report group in the group configuration.

Show yield

If this option is enabled, the yield recorded in the specified period of time is also displayed for the

selected  operation.  Additional  entries  are  added  to  the  table.  Note:  the  column  Yield  is  not

displayed by default. Use the column configurator to show the column.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the following function authorizations: scrstPerf + chkresp.

Detail application Scrap statistics

The detail application Scrap statistics provides an overview of all scrap reasons and scrap quantities that

were recorded in a specified period of time. The data selected is based on the order-related log records of

record  type  "T".  The  quantities  identified  are  always  displayed  in  the  primary  quantity  unit.  To  total  the

quantities, the system does not convert any quantity units.

The  Scrap  statistics  only  show  operations  that  had  at  least  one  upload  of  a  part  quantity

including scrap in the specified evaluation period.

Note:  the  column  Yield  (P)  only  displays  yield  quantities,  if  the  option  Show  yield  is  enabled.  Yield  is

shown in a separate row for each order/OP and workplace.

Notes on specific columns:

Scrap

The column Scrap shows the scrap quantity with reference to the scrap reason, the workplace and

the order/operation.

BDE-CAA_82.docx

Version: 1.0.23049

Seite 11 von 16

Controlling of Articles/Scrap

Note: the scrap quantity shown can also be a negative quantity in certain cases. For example, this

can be the case if scrap is offset against yield.

Scrap rate

Share  of  scrap  (primary  quantity  unit)  in  the  total  quantity  produced  (primary  quantity  unit)  of  the

operation in the evaluation period.

The  total  quantity  is  equal  to  the  total  of  all  four  quantity  accounts  (yield,  scrap,  rework,  open

quantity). Note: rework quantity and open quantity are not shown in the Scrap statistics.

Calculation:

Scrap rate = 100.0 * EGR_AUS / (ANR_GUTP+ANR_AUSP+ANR_NCHP+ANR_PRBP)

Detail application Comparison: yield - scrap

This  detail  application  provides  a  comparison  of  the  yield  and  scrap  quantity  (both  in  primary  quantity

unit).  The  comparison  is  shown  in  a  bar  chart.  The  bars  show  the  ratio  of  the  two  quantity  types.  The

percentage is visualized for each bar.

Note:  the  yield  displayed  is  calculated  using  the  total  of  all  yield  quantities  of  the  operations

identified. If the selection includes several process steps (workplaces), the yield quantities of all

workplaces selected are totaled. It does not matter if several operations of one order are then

included.

Use the application Order-related statistic to get an overview of one order only.

Detail application Scrap ranking list (scrap reasons)

The Scrap ranking list (scrap reasons) shows the scrap quantities recorded for the different scrap reasons

in a graphic form.

The  entries  selected  in  the  tabular  detail  application  control  the  display  of  the  bar  chart.  To  show  all

entries of the table in the graphic, select the complete table. To select the complete table, click the table

field in the top left corner. To select entries, we recommend to disable the option Show yield.

Each bar of the bar chart shows the totaled value for each scrap reason. The total is calculated using all

entries  selected.  The  bar  also  shows  the  percentage  of  this  scrap  reason  in  the  total  scrap  quantity

recorded  in  the  evaluation  period.  This  total  scrap  quantity  is  displayed  in  the  total  line  of  the  Scrap

statistics detail application.

Example: the detail application Scrap statistics shows a total scrap quantity of 1,171 in the total line for a

selected period. If you select a single entry with a scrap quantity of 122, the graphic shows a percentage

of 14.42.

BDE-CAA_82.docx

Version: 1.0.23049

Seite 12 von 16

Controlling of Articles/Scrap

Detail application Scrap ranking list (workplaces)

The  Scrap  ranking

list  (workplaces)  shows

the  scrap  quantities  recorded

for

the  different

workplaces/machines in a graphic form.

The  entries  selected  in  the  tabular  detail  application  control  the  display  of  the  bar  chart.  To  show  all

entries of the table in the graphic, select the complete table. To select the complete table, click the table

field in the top left corner. To select entries, we recommend to disable the option Show yield.

Each  bar  of  the  bar  chart  shows  the  totaled  value  for  each  workplace.  The  total  is  calculated  using  all

entries  selected.  The  bar  also  shows  the  percentage  of  this  scrap  reason  in  the  total  scrap  quantity

recorded  in  the  evaluation  period.  This  total  scrap  quantity  is  displayed  in  the  total  line  of  the  Scrap

statistics detail application.

Toolbar

 Order information

Calls the Order information for the currently selected order.

 Failure mode analysis (function authorization faep)

Click this button to call the Failure mode analysis.

BDE-CAA_82.docx

Version: 1.0.23049

Seite 13 von 16

Controlling of Articles/Scrap

4  Scrap profile

Overview

Menu

Order management  Order controlling  Scrap profile

Transaction code

scrpf

Function authorization

scrpf

Any person in a company who wants to reduce scrap must have knowledge of how and where scrap is

accrued.  The  Scrap  profile  provides  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded in a specified period of time.

Selection criteria

The application provides the following selection criteria:

Date

Shift

Time

Enter a period of time to narrow down the log records displayed. The application selects the BDE

log records of record type T with a posting time that is included in the period of time specified.

In the period of time specified above, only those log records are selected that are assigned to the

shift specified.

In the period of time specified above, only those log records are selected that were booked in the

time specified.

Workplace/group/cost center/company/short name/designation/responsibility area

These  entries  specify  the  workplaces/machines  used  for  the  evaluation.  To  select  an  entry,  you

access the master data of the workplace/machine configuration.

Report group

Use

the  option  Report  group

to  narrow  down

the  selection

to  a  specific  group  of

workplaces/machines. You must define the report group in the group configuration.

Reason

Selection based on a specific scrap reason.

Order/order type

You can limit the evaluation to one order.

Article

Selection according to the article

BDE-CAA_82.docx

Version: 1.0.23049

Seite 14 von 16

Controlling of Articles/Scrap

Sales order

If a sales order is assigned to the production order, this sales order can be used to select the data.

Project number

If a project number is assigned to the production order, this number can be used to select the data.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

If the selection period exceeds the period of time of the online data area, the system implicitly

selects  the  data  of  the  medium-term  data  area.  You  need  not  explicitly  activate  the  access  to

the medium-term data area.

Condition:  the  data  retention  periods  of  orders  (object  ANR)  and  of  log  records  (object

ADEPRO) must be identical.

Detail application Scrap profile

The  detailed  report  Scrap  profile  provides  a  table  including  all  scrap  reasons  and  scrap  quantities  that

were recorded in a specified period of time.

Note on the column Scrap rate:

The  scrap  rate  refers  to  the  total  quantity  booked  in  the  selected  period  of  time  (total  of  yield,  scrap,

rework  quantity  and  open  quantity  in  primary  quantity  unit)  for  the  combination  workplace/MES  order

number.

Example: in a specified period of time, the following quantities have been recorded at a workplace for an

order/operation:

Day

Yield

Scrap

1

2

3

4

5

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

BDE-CAA_82.docx

Version: 1.0.23049

Seite 15 von 16

Controlling of Articles/Scrap

If  you  select  the  period  of  time  Day  2  -  Day  5,  then  the  days  4  and  5  show  scrap  quantities  that  are

displayed in the Scrap profile. The scrap rate refers to the total quantity booked in the selected period of

time (here: 12+14+8+1+2 = 37):

Day

4

5

Scrap

Scrap rate

1

2

2.7

5.4

To calculate the scrap rate, the system also uses postings that only include a  yield, but no

scrap. Entries in the result line with a scrap quantity of 0 are therefore possible.

You can hide these entries using the Filter editor.

Detail application PivotGrid

The  detailed  report  PivotGrid  provides  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded in a specified period of time. According to the settings of the pivot table, the application shows

e.g. one column for each scrap reason. The scrap recorded automatically is displayed separately.

Scrap (P)

This pivot element includes the primary quantities.

Scrap reason

This pivot element includes the scrap reasons (number of the scrap reason).

Date

This pivot element includes the dates when the scrap was recorded.

The  detail  application  contains  not  only  the  fields  mentioned  here,  but  numerous  other  fields.  You  can

select these fields using the field list. Right-click the area above the column headers to open the context

menu and select Show field list.

To calculate the scrap rate, the system also uses postings that only include a  yield, but no

scrap. Entries in the result line with a scrap quantity of 0 are therefore possible.

You can hide these entries using the Filter editor.

BDE-CAA_82.docx

Version: 1.0.23049

Seite 16 von 16

