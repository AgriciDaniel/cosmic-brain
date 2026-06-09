Manual

Controlling of Shop Floor
Data/Order Data
BDE-CAB 8.1

Version 1.1.8660

Last changed on: 19.06.2020

Controlling of Shop Floor Data/Order Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-CAB_81.docx

Version: 1.1.18468

Page 2 of 37

Controlling of Shop Floor Data/Order Data

Contents

1  Übersicht Controlling Betriebsdaten / Auftragsdaten ................................... 4

2  Order Profile ................................................................................................. 6

3  Order-Related Statistic ............................................................................... 13

4  Overhead Cost Controlling ......................................................................... 18

5  Production Controlling ................................................................................ 23

6  Maintenance Controlling ............................................................................ 27

7  Schedule Controlling .................................................................................. 31

BDE-CAB_81.docx

Version: 1.1.18468

Page 3 of 37

Controlling of Shop Floor Data/Order Data

1

 Übersicht Controlling Betriebsdaten / Auftragsdaten

Purpose

Business  data  controlling  makes  it  possible  to  evaluate  data  entered  in  the  system  as  concerns

target/actual comparisons relating to quantities, times and dates.

Implementation considerations

You use the function package if:

  You  would  like  to  evaluate  the  on-time  delivery  performance  of  production  based  on  the  actual

order / operation deadlines

  You would like to evaluate the times and durations recorded with reference to orders

  You would like to evaluate hours accrued in an area / a department over a period of time relating

to various time accounts

Integration

The  business  data  /  order  data  monitoring  function  evaluates  orders  or  operations  that  were  either

created directly in the system or that were transferred from other systems via interfaces.

Times and quantities entered in the BDE or MDE are accessed to display order progress.

Features

  Schedule controlling

o  Tabular evaluation of delayed order and early orders

  Order statistics

o  Order  statistics  with  evaluations  of  finished  and  active  orders,  articles  produced  with

target / actual comparison of quantities, performance and times, gross / net comparison

to  actual  performance  and  remaining  runtime,  graphic  and  numeric  evaluations  of

resource performance accounts.

  Overhead cost controlling

o  Evaluation  of  times  recorded  for  overhead  cost  orders  presented  in  a  pivot  table.

Individual  definition  of  the  pivot  table  presentation  by  various  criteria.  Graphical

presentation (bar chart). Predefined detail applications for displaying times for "activities

per  calendar  week",  "cost  centers  per  calendar  week",  "cost  centers  per  activity".

Graphical display of the respective results.

  Maintenance controlling

BDE-CAB_81.docx

Version: 1.1.18468

Page 4 of 37

Controlling of Shop Floor Data/Order Data

o  Evaluation of times entered for maintenance orders presented in a pivot table. Individual

definition  of  the  pivot  table  presentation  by  various  criteria.  Graphical  presentation  (bar

chart). Predefined detail applications for displaying times for "articles per calendar week",

"workplaces  per  calendar  week",  "articles  per  workplace".  Graphical  presentation  of  the

respective results.

  Production controlling

o  Evaluation  of  times  entered  for  production  orders  presented  in  a  pivot  table  Individual

definition  of  the  pivot  table  presentation  by  various  criteria.  Graphical  presentation  (bar

chart).

  Order profile

o  Order profile with display of times posted for operations (order duration, processing time,

production and down time) incl. Gantt chart of calculated idle times.

BDE-CAB_81.docx

Version: 1.1.18468

Page 5 of 37

Controlling of Shop Floor Data/Order Data

2  Order Profile

1.1  Summary

Menu

Order Management --> Order Controlling --> Order Profile

Transaction code

orpf

Function authorization

orpf

Utilization

The order profile is indispensable for all production schedulers who want to see at a glance how orders

have passed production. Due to its combination of table and Gantt chart, the production scheduler gets all

required pieces of information at the push of a button.

Integration

The order profile is a report for production management

The order profile has been configured for the user to consider production orders that have already been

realized. It responds to questions such as:

  Which orders have been produced (finished) within a certain period of time?

  Which output (quantities) have these orders produced?

  How much time was required?

Order  controlling  is  made  on  order  level  and  considers  quantities  and  times  with  respect  to  the  order

(headers).  Only  finished  orders  are  included  as  certain  values  (key  figures)  refer  to  the  entire  order.

Consequently, the chronological selection refers to the order end.

Please  note:  This  report  is  not  ideal  for  “long-running  orders”  (serial  orders)  because  of  the

selection  option.  However,  the  values  and  key  figures  displayed  here  are  normally  less

interesting for serial orders.

Prerequisite

Only orders the order type of which is assigned to the category

-  FA (production order),

-  PJ (project order) or

BDE-CAB_81.docx

Version: 1.1.18468

Page 6 of 37

Controlling of Shop Floor Data/Order Data

-  PM (plant maintenance order)

are displayed.

Selection Criteria

The application provides the following selection criteria:

Please  take  into  consideration  that  in  general  -  irrespective  of  the  restrictions  made  using  the  selection

criteria listed in the following – only orders that have already been started and the order type of which is

assigned to the category

- FA (production order),

- PJ (project order) or

- PM (plant maintenance order)

are taken into account.

The application provides the following selection criteria:

Order

The "order" option restricts the displayed orders. Wildcards may be used.

Order type

If  the  order  type  is  selected  only  those  orders  are  taken  into  account  that  correspond  to  the

selected order type. Multiple selections are possible.

Category

If  the  order  category  is  selected  only  those  orders  are  taken  into  account  that  correspond  to  the

selected  order  type.  This  selection  criterion  refers  to  the  category  of  the  order  type  of  the  order.

Only  orders the order type of  which corresponds to the specified category  are  displayed. Multiple

selections are possible. Irrespective of this selection, only orders of the category “production order”,

“project order” and “maintenance order” are taken into account.

Article

When  the  article  is  selected,  all  orders  are  determined  the  article  number  of  which  at  the  order

header matches the entered value. Wildcards are taken into account.

Article designation

If the article designation is selected all orders are determined the article designation of which at the

order header corresponds to the entered value. Wildcards are taken into account.

Project number

If the project number is selected all orders are determined the project number of which at the order

header corresponds to the entered value. Wildcards are considered.

BDE-CAB_81.docx

Version: 1.1.18468

Page 7 of 37

Controlling of Shop Floor Data/Order Data

Sales order

If the sales order number is selected all orders are determined the sales order number of which at

the order header corresponds to the entered value. Wildcards are taken into consideration.

Customer designation

When  the  customer  designation  option  is  selected,  all  orders  are  determined  the  customer

designation of which at the order header matches the entered value. Wildcards are considered.

The responsibility area is not checked in this application.

"Order profile" detail application (table)

All orders matching the entered selection criteria are displayed in the “order profile” detail application.

The displayed data is described  in the sections that follow (the  number of columns may vary  subject to

the column configuration):

Status

Order status (only orders are considered that have started or that are finished)

Order

Order, article, sales order

Order header data

Target quantities

Target quantity, unit

Target quantity of the order in base quantity unit.

Actual quantities

Yield, scrap, rework, open quantity, unit

Order  quantities  in  base  quantity  unit  posted  onto  the  order  header.  However,  it  is  required  that

order backlog data that is manually created or transferred from the higher-tier system allows for the

primary quantity unit to be converted into base quantity unit at operations.

Target times

Setup time

Total of setup times (setup times+additional setup time+teardown time) of all active OPs according

to  the  order  backlog.  The  additional  setup  time  results  dynamically  from  using  the  setup  change

matrix in the HYDRA shop floor scheduling module.

Processing time

Total of processing times of all active OPs according to the order backlog.

BDE-CAB_81.docx

Version: 1.1.18468

Page 8 of 37

Controlling of Shop Floor Data/Order Data

Execution time

Total of setup time and processing time according to the order backlog.

Waiting time

Total of waiting times of all active OPs according to the order backlog.

Wait time

Total of wait times of all active OPs according to the order backlog.

Transport time

Total of transport times of all active OPs according to the order backlog.

Labor utilization

Total of target labor utilization times of all active OPs. The target labor utilization time needs to be

transferred via the HYD-ERP interface.

 Actual times

Retention period of orders

The retention period of the order is the period between the time the order was first transferred from

the PPS system ("order release" = order header creation date in HYDRA) and the time of the actual

logoff (in terms of time) of the last active operation of the order.

Please note:

Whether the time of the order transfer is the time it was first transferred from the PPS system or the

time  it  was  re-transferred  because  it  had  been  deleted  in  the  meantime  for  technical  reasons,

cannot be determined or taken into consideration.

If an order is transferred more than once, and with each transfer the previous order is deleted, the

creation date of the order header is the time of the last transfer.

Lead time

The order duration is the period between the time the first operation of the order is logged on and

the time the last active operation is logged off

Processing time

The processing time of the order is the total of main utilization times (RPA 11) of all operations of

this order.

Downtime

The downtime of the order is the total of downtimes (RPA 1 to 6, RPA 8 to 10) of all operations of

the order.

Assignment time

The occupancy time is the total of setup time (RPA 7), processing time (RPA 11) and downtimes

(RPA 1..6, RPA 8..10) of all operations of the order.

BDE-CAB_81.docx

Version: 1.1.18468

Page 9 of 37

Controlling of Shop Floor Data/Order Data

Wait time

The  wait  time  results  from  times  during  which  no  operation  was  logged  on.  The  duration  is

synchronized  with the Gregorian calendar (shift breaks are not considered, durations posted onto

RPA 12 "free break" are not considered; the posting times of the log records of the record type "U"

and "E" are evaluated).

The  wait  time  is  not  calculated  at  the  time  when  data  is  requested,  but  by  a

separate process. For this purpose, however, this process needs to be integrated

in  the  Scheduler.  This  procedure  is  described  in  the  document  entitled

Activating_OrderRelatedKeyfigures.pdf.

Labor utilization

The labor utilization of the order is the total of labor utilization times of all operations of the order.

Key figures

Rate of capacity utilization

The  rate  of  capacity  utilization  is  the  ratio  of  processing  time  (RPA  11)  to  occupancy/assignment

time (RPA 1..11) of all operations of the order

Setup rate

The setup rate is the ratio of setup time (RPA 7) to occupancy/assignment time (RPA 1..11) of all

operations of the order.

"Order profile" detail application (graphic)

The  article  profile  shows  for  each  operation  of  the  order  selected  in  the  table  when  the  individual

operation was logged on.

The operation number as well as the workplace, which the operation was logged on to, are displayed on

the  y-axis. When  it  comes  to  split  OPs,  the  split  number  is  shown  in  addition  to  the  operation  number.

Data is displayed in ascending order by the operation number.

If there are simultaneous postings for an operation (e.g. as the operation has been logged on to several

machines/workplaces at the same time) data is displayed in several lines for the operation.

The postings generated in HYDRA ("ADE log") are displayed and presented as bars (Gantt chart).

The times of resource performance accounts distributed in a posting are displayed within a bar according

to the corresponding colors defined for the resource performance accounts. The sequence of RPA colors

(ascending  by  RPA  number)  within  a  posting  (of  a  bar),  however,  does  not  describe  the  sequence  in

which RPAs are posted, but remains the same for all postings (bars).

BDE-CAB_81.docx

Version: 1.1.18468

Page 10 of 37

Controlling of Shop Floor Data/Order Data

In case the duration (the time posted onto the RPA) within the log record is less than the time between

logon and logoff, the remaining time is hatched within the order profile. This can be the case if



the OP is part of a merged operation



the  OP  was  posted  proportionately  (this  might,  among  others,  also  be  the  case  for  merged  OPs

(MOP) logged on to the terminal)

At  the  end  of  the  graphic  black  bars  represent  wait  times.  These  times  result  from  the  time  between

logging  the  operation  off  and  logging  the  next  operation  on  (the  same  operation  or  even  different

operations). This means, that during that time no operation of the order was logged on.

Tooltip

When  going  with  the  mouse  pointer  over  a  bar,  a  window  opens  for  the  resource  performance  account

where the mouse pointer is currently located and the following information is displayed:



- Current operation,

  Logon/logoff time of the operation



- Yield (in primary quantity unit) as well as quantity unit

  Duration during the logon/logoff period

  Workplace, to which the operation was logged on

  Abbreviation  and  designation  of  the  resource  performance  account  as  well  as  the  duration  posted

onto this resource performance account

For HYDRA-MDE machines the operation is automatically interrupted when the shift ends and

automatically  logged  on  when  the  shift  starts.  Operations  that  are  logged  on  when  shifts  are

changing get two posting records and, as a result, 2 bars are displayed in the graphic.

The sequence of RPA colors within a posting (a bar) does not represent the order in which the

RPA is posted, but remains the same for all posting records (bars).

If there are simultaneous postings for an operation (e.g. as the operation has been logged on to

several  machines/workplaces  at  the  same  time)  data  is  displayed  in  several  lines  for  this

operation.

Representation of times (italic) on the y-axis is accidental.

"Duration" detail application (graphic)

The "duration" detail application shows the below-mentioned data:

BDE-CAB_81.docx

Version: 1.1.18468

Page 11 of 37

Controlling of Shop Floor Data/Order Data

  Lead time (dark blue)

  Assignment/occupancy time (yellow)

  Processing time (light green)

  Setup time (turquoise)

  Downtime (red)

  Wait time (black)

Further  information  on  this  data  can  be  found  in  the  section  entitled  "order  profile  detail  application

(table)".

The duration is displayed to the right of each bar in the format hh:mm:ss, instead of an x-axis labeling.

BDE-CAB_81.docx

Version: 1.1.18468

Page 12 of 37

Controlling of Shop Floor Data/Order Data

3  Order-Related Statistic

Summary



Menu

Order Management --> Order Controlling --> Order-Related Statistics

Transaction code

orst

Function authorization

orst

Utilization

The order-related statistic is a detailed report about orders. It is also possible to evaluate quantities and

times of the selected orders.

Integration

The  statistic  generated  by  the  evaluation  includes  a  list  of  orders  and  corresponding  operations.  The

following is displayed for each operation:



"Operations" detail application

Tabular overview of the operations pertaining to the selected order



“Total quantities/total times/downtimes by resource performance accounts” detail application

Graphic overview of the quantities and times accrued on the order.



“Performance and run time” detail application

Tabular and graphic presentation of run times and durations based on operations

Selection criteria

The application provides the following selection criteria:

Order

The order number can either be entered directly or using the search dialog.

Order type

This  selection  criterion  refers  to  the  order  type  at  the  order  header.  Only  orders  assigned  to  the

selected order type(s) are displayed.

Category

This  selection  criterion  refers  to  the  category  of  the  order  type  at  the  order  header.  Only  orders

assigned to the selected category(ies) are displayed.

BDE-CAB_81.docx

Version: 1.1.18468

Page 13 of 37

Controlling of Shop Floor Data/Order Data

Order status

This selection criterion refers to the order statuses at the order header. Only orders assigned to the

selected order statuses are displayed.

Control

This selection criterion refers to the control indicator at the order header. Only orders assigned to

the selected control indicators are displayed.

Article

This selection criterion refers to the article in the order header. All orders assigned to the selected

article are displayed. Wildcards may be used.

Article designation

This  selection  criterion  refers  to  the  article  designation  defined  in  the  order  header.  All  orders

assigned to the selected article designation are displayed. Wildcards may be used.

Sales order

This selection criterion refers to the sales order defined at the order header. All orders assigned to

the selected sales order are displayed. Wildcards may be used.

Customer designation

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  order  header.  All  orders

including the selected customer designation are displayed. Wildcards may be used.

Project number

This selection criterion refers to the project number defined in the order header. All orders that are

assigned to the selected project number are displayed. Wildcards may be used.

Planned order

This selection criterion refers to the planned order defined in the order header. Wildcards may be

used.

Cost object

This  selection  criterion  refers  to  the  cost  object  defined  in  the  order  header.  All  orders  of  the

selected cost object are displayed. Wildcards may be used.

Priority from ... to

This selection criterion refers to the priority defined in the order header. All orders assigned to the

selected priority are displayed.

Basic start date from ... until

This selection criterion refers to the basic start date defined in the order header. Orders planned on

or between the selected basic start dates are displayed only.

BDE-CAB_81.docx

Version: 1.1.18468

Page 14 of 37

Controlling of Shop Floor Data/Order Data

Basic end date from ... until

This selection criterion refers to the basic end date defined in the order header. Orders planned on

or between the selected basic end dates are displayed only.

Order end from … until

This selection criterion refers to the actual job end of the order header. Orders, which are dated on

or between the selected order end date, are displayed only.

Order index from ... to

This selection criterion refers to the  order index defined in the order header. All orders having the

selected order index are displayed.

Order group

This  selection  criterion  refers  to  the  order  group  defined  in  the  order  header.  All  orders  that  are

assigned to the selected order group are displayed.

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  All  orders  of  the

selected MRP controller are displayed.

If several selection criteria are used overlapping results are displayed in the order overview.

The responsibility area is not checked in this application.

"Order overview" detail application

The “order overview”  detail application shows all  orders that have been selected in the selection panel.

Every  row  shows  one  order.  The  numerous  columns,  which  may  be  hidden  or  displayed,  show  all

available pieces of information that are summarized in reasonable categories.

The list shows specific order data. This includes order backlog data as well as current status information

on the order.

"Operations" detail application

The  “operations”  detail  application  shows  all  operations  pertaining  to  the  above  selected  order  at  a

glance.  If  several  orders  are  selected  in  the  order  overview,  all  operations  of  these  selected  orders  are

displayed. In this case, we recommend showing the “order” column.

The list shows specific operation data. This includes data about the pool of operations as well as current

status information on the operation.

BDE-CAB_81.docx

Version: 1.1.18468

Page 15 of 37

Controlling of Shop Floor Data/Order Data

“Total quantities” detail application

Subject  to  the  order  selected  in  the  order  overview,  this  detail  application  shows  the  overall  collected

quantities  of  the  order.  If  several  orders  are  selected  the  total  quantities  of  the  selected  orders  are

displayed in a graphic.

"Total times" detail application

Subject to the order selected in the order overview, the overall collected times of individual operations of

the order are displayed in this detail application. If several orders are selected the totals of the selected

orders are displayed in a graphic.

“Downtimes by resource performance accounts” detail application

Subject  to  the  order  selected  in  the  order  overview,  this  detail  application  shows  the  overall  recorded

downtimes of the order separated by resource performance accounts. If several orders are selected the

totals of the selected orders are presented in a graphic.

“Performance and run time” detail application

The “performance and run time” detail  application compares the actual  net  and gross activities  with the

target activities, depending on the operations selected in the “operations” detail application.

Further information on the calculation of individual key figures can be found here.

“Target/actual comparison” detail application

When  target/actual  values  are  displayed  and  compared  in  a  table,  the  target  values  are  compared  with

the recorded actual values of the selected operations. The following values are displayed:

  Yield

  Scrap

  Setup time

  Cycle time

  Partitioning

  Production time per piece (time/piece)

Further information on the calculation of individual actual values can be found here.

BDE-CAB_81.docx

Version: 1.1.18468

Page 16 of 37

Controlling of Shop Floor Data/Order Data

“Activities” detail application

The  “activities”  detail  application  compares  target  activities  with  the  rendered  actual  activity  (gross  and

net) of selected operations in a graphic.

Further information on the calculation of individual key figures can be found here.

"Durations" detail application

The “durations” detail application compares the order duration, production duration and downtimes of the

selected operations in a graphic.

“Downtimes by resource performance accounts” detail application

The “downtimes by resource performance accounts” detail application compares the accrued times of the

selected operations, separated onto resource performance accounts in a graphic.

BDE-CAB_81.docx

Version: 1.1.18468

Page 17 of 37

Controlling of Shop Floor Data/Order Data

4  Overhead Cost Controlling

Summary

Menu

Order management  Order controlling  Overhead cost controlling

Transaction code

ohcon

Function authorization

ohcon

Usage

A portion of costs created in a company that should not be ignored are the result of so-called overhead

costs. The  objective  of  the  evaluation  "Overhead  cost  controlling"  is  to  provide  a  means  to make  these

overhead  costs  transparent  and  to  identify  the  real  "cost  monsters",  while  in  doing  so  finding  ways  to

introduce countermeasures that will help lower overall costs.

Generally, it is the responsibility of the cost center managers to conduct audits and analyses of this kind

and  to  derive  the  relevant  measures  based  on  the  results.  In  production,  for  example,  this  is  the

responsibility of the foremen.

In addition to evaluating overhead costs relating to a specific cost center, it is also important to determine

which activities incurred these costs. Overhead cost orders can be used to illustrate a breakdown of this

kind.

Definition of overhead costs:

"Costs  that  cannot  be  attributed  to  any  specific  product  or  performance  unit  (cost  object,  cost  center),

such  as  lease  or  rent  payments,  executive  salaries.  [...]  Overhead  costs  are  such  costs  that  cannot  be

attributed to any allocation base directly."

(Source: http://www.wirtschaftslexikon24.net/d/gemeinkosten/gemeinkosten.htm)

Integration

Database used to evaluate the order data logs .

Requirement

In order for an evaluation to be meaningful, what is required is that the employees record their overhead

cost times correctly and allocate them to the cost object appropriately (correctly prepared overhead costs

order).

Selection criteria

The application provides the following selection criteria:

BDE-CAB_81.docx

Version: 1.1.18468

Page 18 of 37

Controlling of Shop Floor Data/Order Data

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Workplace

The postings for the record type "U"/ "E" are selected that are posted to workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Period

The time period entered restricts the selection by log records. Such

log records are selected that have a start date within the defined period.

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

Company

By using the selection by company, only the data records for the relevant company are displayed or

are included in the evaluation.

Order

The  order  number  can  be  entered  or  selected.  The  order  number  defined  here  (order  header

number) restricts the evaluation to the selected order.

OP designation

Only  the  recorded  data  entered  for  an  operation  defined  in  the  field  OP  designation  with  the

selected designation is used for the evaluation (free text).

The responsibility area is not checked in this application.

Field descriptions

Responsibility area

The responsibility area defined at the machine for which the data was entered.

BDE-CAB_81.docx

Version: 1.1.18468

Page 19 of 37

Controlling of Shop Floor Data/Order Data

Date

The dates shown are presented broken down by day.

Workplace

By integrating the field workplace, the data can be distributed or grouped by the workplace at which

the overhead costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

Group

The  data  shown  is  distributed  and  displayed  based  on  the  machine  group  that  is  defined  at  each

machine/ at each workplace.

Cost center

This  field  allows  the  data  to  be  distributed  based  on  the  cost  center  defined  at  the  machine/

workplace.

Company

This  field  allows  the  data  to  be  distributed  based  on  the  company  defined  at  the  machine/

workplace.

Order

The data shown is grouped or displayed based on the order number (order header number).

Article

Filtering by article makes it possible to filter the article number of the separate operations.

MES order number

As opposed to the order number, the MES order number is formed by combining the order number

and  the  operation  number.  Therefore,  the  data  is  displayed  grouped  by  the  separate  operation

numbers.

OP designation

For  each  operation  there  is  an  operation  designation  that  is  defined  in  the  master  data  at  the

operation.

Total duration

The sum total of all durations for the selected data records.

General detail applications

The evaluation provided in the overhead costs controlling considers the operations in the overhead costs

orders category.

BDE-CAB_81.docx

Version: 1.1.18468

Page 20 of 37

Controlling of Shop Floor Data/Order Data

Target times

These  relate  to  target  times/  periods  defined  in  the  order  backlog.  The  target  times  are  not  related

proportionately to the selection period, but instead are attributed absolutely to the entire operation.

Setup time

Setup time + dismantling time + dyn. setup time

Execution times

Setup time + processing time

Actual time (definitions)

Setup time

RPA 7

Processing time

RPA 11

Execution times

Setup time + processing time

Downtime

RPA 1..6, RPA 8..10

Total duration ("Occupancy/assignment time")

Setup time + processing time + downtime time

Activities per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar week. The total durations per operation designation are presented in the

lines as totals.

Cost center per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar  week. The total durations per cost center are  presented  in  the lines as

totals.

BDE-CAB_81.docx

Version: 1.1.18468

Page 21 of 37

Controlling of Shop Floor Data/Order Data

Cost center per activity detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  operation  designation.  The  total  durations  per  cost  center  are  presented  in  the

lines as totals.

BDE-CAB_81.docx

Version: 1.1.18468

Page 22 of 37

Controlling of Shop Floor Data/Order Data

5  Production Controlling

Summary

Menu

Order management  Order controlling  Production controlling

Transaction code

pdcon

Function authorization

pdcon

Usage

In this evaluation, you can evaluate data from the production orders using criteria that you can define in

advance.

Integration

In this evaluation, you can evaluate posting data for orders based on various criteria that can be defined

in the pivot table.

Initially,  the  duration  of  the  order  is  displayed  per  machine  and  calendar  week.  This  display  can  be

changed by modifying the data field combination.

Selection criteria

The application provides the following selection criteria:

Article

Restricted to articles

Article designation

Restricted to article designation

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplace for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Period

The  time  period  entered  restricts  the  selection  by  log  records.  The  log  records  are  selected  that

have a start date within the defined period.

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

BDE-CAB_81.docx

Version: 1.1.18468

Page 23 of 37

Controlling of Shop Floor Data/Order Data

Workplace

The postings for the record type "U"/ "E" are selected that are posted to the workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Company

By using the selection by company, only the data records for the relevant company are displayed or

are included in the evaluation.

Order

The  order  number  can  be  entered  or  selected.  The  order  number  defined  here  (order  header

number) restricts the evaluation to the selected order.

OP designation

Only  the  recorded  data  entered  for  an  operation  defined  in  the  field  OP  designation  with  the

selected designation is used for the evaluation (free text).

The responsibility area is not checked in this application.

Field descriptions

Responsibility area

The responsibility area defined at the machine for which the data was entered.

Date

The dates shown are presented broken down by day.

Workplace

By  integrating  the  field  Workplace,  the  data  can  be  distributed  or  grouped  by  the  workplace  at

which the production order costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

Group

The  data  shown  is  distributed  and  displayed  based  on  the  machine  group  that  is  defined  at  each

machine/ at each workplace.

BDE-CAB_81.docx

Version: 1.1.18468

Page 24 of 37

Controlling of Shop Floor Data/Order Data

Cost center

This  field  allows  the  data  to  be  distributed  based  on  the  cost  center  defined  at  the  machine/

workplace.

Company

This  field  allows  the  data  to  be  distributed  based  on  the  company  defined  at  the  machine/

workplace.

Order

The data shown is grouped or displayed based on the order number (order header number).

Article

Filtering by article makes it possible to filter the article number of the separate operations.

Article designation

Even  if  several  articles  have  the  same  article  number,  these  can  be  differentiated  by  article

designation. This way the data records displayed can be grouped by article designation.

MES order number

As opposed to the order number, the MES order number is formed by combining the order number

and  the  operation  number.  Therefore,  the  data  is  displayed  grouped  by  the  separate  operation

numbers.

OP designation

For  each  operation  there  is  an  operation  designation  that  is  defined  in  the  master  data  at  the

operation.

OP

The  field  OP  (Operation)  lists  the  operation  number  only  (without  the  order  header  number,  e.g.

0010).  This  allows  you  to  group  data  records  which  may  be  from  different  orders,  however  which

have the same operation number.

Total duration

The sum total of all durations for the selected data records.

Tools

By  running  a  selection  by  tool,  only  those  posting  records  are  used  in  the  evaluation  that  were

recorded for operations, in which the relevant tool was defined.

Pivot table detail application

You can evaluate order data based on additional criteria in the pivot view detail view.

The bar colors in the chart are set "arbitrarily" using a color chart defined internally.

BDE-CAB_81.docx

Version: 1.1.18468

Page 25 of 37

Controlling of Shop Floor Data/Order Data

BDE-CAB_81.docx

Version: 1.1.18468

Page 26 of 37

Controlling of Shop Floor Data/Order Data

6  Maintenance Controlling

Summary

Menu

Order management  Order controlling  Maintenance controlling

Transaction code

pmcon

Function authorization

pmcon

Usage

Maintenance  controlling  is  a  production  management  function.  Maintenance  especially  is  provided  an

overview of the maintenance orders that need to be processed.

The purpose of maintenance controlling is to show costs (based on activities/ times) that were incurred as

a  result  of  maintenance  activities.  By  structuring  the  maintenance  orders  accordingly  referencing  the

maintained equipment, the function provides the ability to identify maintenance-intensive materials.

Integration

Database used to evaluate the order data logs .

Selection criteria

The application provides the following selection criteria:

Article

Restricted to articles

Article designation

Restricted to article designation

Cost center

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the cost center entered.

Responsibility area

The responsibility area that is entered restricts the requested data to the defined responsibility area

for the particular machine/ workplace.

Period

The time period entered restricts the selection by log records. Such

log records are selected that have a start date within the defined period.

BDE-CAB_81.docx

Version: 1.1.18468

Page 27 of 37

Controlling of Shop Floor Data/Order Data

Workplace

The postings for the record type "U"/ "E" are selected that are posted to workplace entered

for which the user has been authorized via the responsibility area of the

workplace.

Group

The postings for the record type "U"/ "E" are selected that are posted to workplaces for

which the user has been authorized via the workplace's responsibility area, and

which are assigned to the group entered.

Company

By running the selection by company, only the data records are displayed or used in the evaluation

that were created for the machines/ workplaces at those companies that match the companies you

selected.

Order

The  order  number  can  be  entered  or  selected.  The  order  number  defined  here  (order  header

number) restricts the evaluation to the selected order.

OP designation

Only  the  recorded  data  entered  for  an  operation  defined  in  the  field  OP  designation  with  the

selected designation is used for the evaluation (free text).

The responsibility area is not checked in this application.

Field descriptions

Responsibility area

The responsibility area defined at the machine for which the data was entered.

Date

The dates shown are presented broken down by day.

Workplace

By  integrating  the  field  Workplace,  the  data  can  be  distributed  or  grouped  by  the  workplace  at

which the overhead costs are recorded.

Year - quarter - month - calendar week - weekday - day

This field provides the ability to group or distribute the displayed data respectively.

BDE-CAB_81.docx

Version: 1.1.18468

Page 28 of 37

Controlling of Shop Floor Data/Order Data

Group

The  data  shown  is  distributed  and  displayed  based  on  the  machine  group  that  is  defined  at  each

machine/ at each workplace.

Cost center

This  field  allows  the  data  to  be  distributed  based  on  the  cost  center  defined  at  the  machine/

workplace.

Company

This  field  allows  the  data  to  be  distributed  based  on  the  company  defined  at  the  machine/

workplace.

Order

The data shown is grouped or displayed based on the order number (order header number).

Article

Filtering by article makes it possible to filter the article number of the separate operations.

Article designation

Even  if  several  articles  have  the  same  article  number,  these  can  be  differentiated  by  article

designation. This way the data records displayed can be grouped by article designation.

MES order number

As opposed to the order number, the MES order number is formed by combining the order number

and  the  operation  number.  Therefore,  the  data  is  displayed  grouped  by  the  separate  operation

numbers.

Total duration

The sum total of all durations for the selected data records.

Tools

By  running  a  selection  by  tool,  only  those  posting  records  are  used  in  the  evaluation  that  were

recorded for operations, in which the relevant tool was defined.

Article per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration added up per calendar week. The total durations per article number are presented in the lines as

totals.

Workplace per calendar week detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  calendar  week.  The  total  durations  per  article  number  and  workplace  are

presented in the lines as totals.

BDE-CAB_81.docx

Version: 1.1.18468

Page 29 of 37

Controlling of Shop Floor Data/Order Data

Article per work place detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  workplace.  The  total  durations  per  article  number  are  presented  in  the  lines  as

totals.

BDE-CAB_81.docx

Version: 1.1.18468

Page 30 of 37

Controlling of Shop Floor Data/Order Data

7  Schedule Controlling

Summary

Menu

Order Management  Order Controlling  Schedule Controlling

Transaction code

scec

Function authorization

scec

Usage

This application is meant to be used as a monitoring list so that you can determine for each operation any

downstream deviations in the schedule. It provides answers to the following questions, for example:

  Which operations with an exceeded planned start have not (yet) begun?

  Which operations are currently not being processed (status prepared or interrupted) and are expected

to be delayed as a result?

  Which operations that are currently being processed (status running), are expected to be finished with

a delay?

  Which operations were finished with a delay?

This function not only allows  you to analyze delays in the schedule,  but also  which order start or  which

order end are running early.

This  function  is  geared  towards  production  controllers  or  foremen,  for  example.  The  benefit  is  that  the

function continuously monitors the quality of the planned times and assures production runs smoothly.

Integration

During the analysis, current dates are compared to planned dates. Depending on the type of planning, the

function can check specific dates planned in detail, but also scheduled dates or basic dates. The planned

dates here are either the result of detailed planning performed in HYDRA shop floor scheduling or from

the planning performed in the ERP system.

Prerequisite

In order  to make the best  use of this application,  you should be knowledgeable  about how the planned

dates  are  determined  and  set  in  your  system  so  that  based  on  this  knowledge  you  can  make  better

decisions about how to perform a selection.

BDE-CAB_81.docx

Version: 1.1.18468

Page 31 of 37

Controlling of Shop Floor Data/Order Data

Selection criteria

The application provides the following selection criteria:

Check against baseline plan

The selection list shows all baseline plans for which the user is authorized by the responsibility are

authorization.

OPs started too early, OPs started too late, OPs finished too early, OPs finished too late

Depending on the selection options you chose, what is considered here are:

  Operations started too early

  Operations finished too early

  Operations started too late

  Operations finished too late

The values are calculated  based  on  which  option  was selected for "Exceeding  of planned  dates",

"Exceeding of basic dates" or "Exceeding of scheduled dates".

If none of these options is set, all operations are displayed that do not have any deviations.

Date ... to  …

Only  those  operations  are  checked  that  have  a  start  date  or  a  finish  date  (depending  on  the

selection option) in this period.

Consider long-term data

If this option is set, operations that were already transferred from the online database into the long-

term pool of data are also considered.

Exceeding of planned dates

The  start  and  finish  dates  planned  in  detail  during  detailed  scheduling  (e.g.  in  HYDRA  shop  floor

scheduling) should be checked to assure they can be maintained.

BDE-CAB_81.docx

Version: 1.1.18468

Page 32 of 37

Controlling of Shop Floor Data/Order Data

Exceeding of basic dates

The  operation  related  basic  dates  Latest  start  (LST)  and  Latest  end  (LET)specified  by  the  ERP

system or those resulting from lead time scheduling in HYDRA are checked to assure they can be

maintained.

Please note:

These basic dates at the operation that result from lead time scheduling must be transferred from

the ERP system correctly. Alternately, there is also the option to run the basic dates through lead

time scheduling in HYDRA in order to calculate the values.

Exceeding of scheduled dates

The  dates  Scheduled  start  time  and  Scheduled  end  timetransferred  from  the  ERP  system  or

calculated in HYDRA in lead time scheduling should be checked to assure they can be maintained.

Planned on

Workplace or group

Workplace/ group/ cost center

Narrows down the display by workplace, group or cost center.

Please note:

The selection by workplace or cost center only makes sense for operations that have already been

specifically scheduled at a workplace.

Order

This  option  allows  you  to  limit  your  search  to  certain  orders.  You  can  also  run  a  search  using

wildcards.

Article

Limiting the search to operations of a specific article. You can also run a search using wildcards.

Customer designation

Limiting the search to operations of orders for a specific customer You can also run a search using

wildcards.

OP designation

Limiting the search to certain operations.

Operation status

Limiting the search to operations of a specific operation status.

Field descriptions

After the data is requested, in addition to the order/ operation, OP designation and article the table also

displays the basic dates, the dates of detailed planning and the actual dates.

Furthermore,  schedule  deviations  (too  early,  too  late,  on-time  delivery  performance  –  see  below)  are

displayed in the format days.hours:minutes:seconds.

BDE-CAB_81.docx

Version: 1.1.18468

Page 33 of 37

If  configured  accordingly  during  customizing,  customer-specific  user  fields  are  also  shown  for  the  order

Controlling of Shop Floor Data/Order Data

header or the operation .

Calculating data

The verification is performed against the planned dates/ scheduled dates/ basic dates (depending on the

option selected) from the current pool of data.

The values are calculated based on

  which index tab "planned dates", "scheduled dates" or 'basic dates" was selected.

The  values  "planned  start"  or  "planned  finish"  described  in  the  following  table  should  therefore  be

considered  placeholders  for  the  various  combinations  (  current  planned  dates/  planned  dates,  current

planned dates/ scheduled dates, current planned dates/ basic dates).

The  schedule  deviations  are  calculated  and  displayed  in  the  days.hours:minutes:seconds

format, compared to the Gregorian calendar.

Beginning of deviations

Earliness

Condition 1: Control
L, U, E, A

Condition 2: Date
OP actual start < planned start

Calculation
Abs (OP actual start minus planned
start)

Delay

Condition 1: Control
L, U, E, A, F

Condition 2: Date
OP actual start > planned start

S, V

OP planned start > today

Calculation
Abs (OP actual start minus planned
start)
Abs (OP planned start minus today)

On-time delivery

On-time delivery = earliness + delay

End of deviations

Earliness

Condition
Control
E, A

Delay

1:

Condition 2: Date

Calculation

OP actual end < planned
end

Abs (OP actual end minus planned end)

Condition 1: Control

Condition 2: Date

Calculation

BDE-CAB_81.docx

Version: 1.1.18468

Page 34 of 37

Controlling of Shop Floor Data/Order Data

Condition 1: Control
S, V, L, U, F
E, A

Condition 2: Date
Today > planned end
OP actual end > planned end

Calculation
Abs (today minus planned end)
Abs  (OP  actual  end  minus  planned
end)

On-time delivery

On-time delivery = earliness + delay

Detail application: Schedule controlling (graphic)

The detail application “schedule controlling (graphic)“ shows the earliness, delay and on-time delivery for

all  operations  selected  in  the  table.  If  no  operation  is  selected,  it  will  be  interpreted  as  “all  operations

selected”.

Display options

Display:

Defines whether the graphic shows earliness, delay or on-time delivery performance.

Relating to:

Specifies whether the deviations to be considered are to refer to the beginning (planned start/actual start)

or to the end (planned end/actual end) of the operation.

Group by:

Subject to the selection made in the selection panel, data are summarized and displayed by workplace,

group or cost center.

Consideration:

Specifies whether



the mean value AND standard deviation

or



the total of durations (delays, …)

are displayed.

BDE-CAB_81.docx

Version: 1.1.18468

Page 35 of 37

Presentation

Controlling of Shop Floor Data/Order Data

Data are presented in the format Days.Hours:Minutes:Seconds.

Irrespective of the considered values, the number of included operations is always presented by a line.

Calculations

Mean value

The mean value is calculated as follows:

n = Number of OPs produced too early

Standard deviation

Standard deviation is calculated as follows:

BDE-CAB_81.docx

Version: 1.1.18468

Page 36 of 37

nEarlinessnxx1nDelaynxx1nDelayEarlinessnxxx1Var

Controlling of Shop Floor Data/Order Data

The variance itself can be calculated for the delay as follows

(earliness or on-

time delivery are calculated in the same way).

Saving of baseline plans

Function authorization: esvb; license: BDE-CAB

The applications “operations” and “pool of orders” provide this function. Baseline plans used for selecting

schedule violations can be saved here for selected operations.

BDE-CAB_81.docx

Version: 1.1.18468

Page 37 of 37

nDelayVarnxx12)(

