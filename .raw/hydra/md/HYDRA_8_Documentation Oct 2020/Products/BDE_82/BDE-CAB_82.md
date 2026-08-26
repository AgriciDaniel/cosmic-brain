Manual

Controlling of Shop Floor
Data/Order Data
BDE-CAB 8.2

Version 1.1.23049

Last changed on: 01.09.2020

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 2 of 48

Controlling of Shop Floor Data/Order Data

Contents

1  Übersicht Controlling Betriebsdaten / Auftragsdaten ................................... 4

2  Order Profile ................................................................................................. 6

3  Order-Related Statistic ............................................................................... 13

4  Overhead Cost Controlling ......................................................................... 18

5  Production Controlling ................................................................................ 23

6  Maintenance Controlling ............................................................................ 27

7  Schedule Controlling .................................................................................. 31

8  Lean Performance Analysis ....................................................................... 39

BDE-CAB_82.docx

Version: 1.1.23049

Page 3 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 4 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 5 of 48

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

The order profile has been configured for the user to consider production orders that have  already been

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 6 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 7 of 48

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

The displayed data is described  in the sections that follow (the  number of columns may vary subject to

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 8 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 9 of 48

Controlling of Shop Floor Data/Order Data

Wait time

The  wait  time  results  from  times  during  which  no  operation  was  logged  on.  The  duration  is

synchronized  with the Gregorian calendar (shift breaks  are not considered, durations posted onto

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 10 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 11 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 12 of 48

Controlling of Shop Floor Data/Order Data

3  Order-Related Statistic

Overview



Menu

Order management --> Order controlling --> Order-related statistics

Transaction code

orst

Function authorization

orst

Purpose

The  order-related  statistic  is  a  detailed  report  about  orders.  You  can  also  evaluate  the  quantities  and

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

You can enter the order number directly or via the search dialog.

Order type

This selection criterion refers to the order type in the order header. The application only shows the

orders pertaining to the selected order type(s).

Category

This selection criterion refers to the category of the order type in the order header. The application

only shows the orders pertaining to the selected category(ies).

BDE-CAB_82.docx

Version: 1.1.23049

Page 13 of 48

Controlling of Shop Floor Data/Order Data

Order status

This selection criterion refers to the order statuses in the order header. The application only shows

the orders assigned to the selected order status(es).

Control

This  selection  criterion  refers  to  the  control  indicator  in  the  order  header.  The  application  only

shows the orders assigned to the selected control indicator(s).

Article/Item

This selection criterion refers to the article in the order header. The application shows all orders that

include the selected article. You can also use wild cards.

Article name

This selection criterion refers to the article name defined in the order header. The application shows

all orders assigned to the selected article name. You can also use wild cards.

Sales order

This selection criterion relates to the sales order defined in the order header. The application shows

all orders assigned to the selected sales order. You can also use wild cards.

Customer name

This  selection  criterion  refers  to  the  customer  name  defined  in  the  order  header.  The  application

shows all orders including the selected customer name. You can also use wild cards.

Project number

This  selection  criterion  refers  to  the  project  number  defined  in  the  order  header.  The  application

shows all orders of the selected project number. You can also use wild cards.

Planned order

This selection criterion refers to the planned  order  defined in the order header.  You can  also  use

wild cards.

Cost object

This selection criterion refers to the cost object defined in the order header. The application shows

all orders of the selected cost object. You can also use wild cards.

Priority from ... to

This selection criterion refers to the priority defined in the order header. The application shows all

orders assigned to the selected priority.

Basic start date from ... until

This  selection  criterion  refers  to  the  basic  start  date  defined  in  the  order  header.  The  application

only shows the orders coinciding with the selected basic start dates.

Basic end date from ... until

This  selection  criterion  refers  to  the  basic  end  date  defined  in  the  order  header.  The  application

only shows the orders coinciding with the selected basic end dates.

BDE-CAB_82.docx

Version: 1.1.23049

Page 14 of 48

Controlling of Shop Floor Data/Order Data

Order end from … until

This selection criterion refers to the actual order end  defined  in the order header. The application

only shows orders coinciding with the selected order end dates.

Order index from ... to

This selection criterion refers to the order index defined in the order header. The application shows

all orders having the selected order index.

Order group

This selection criterion refers to the order group defined in the order header. The application shows

all orders that are assigned to the selected order group.

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  The  application

shows all orders of the selected MRP controller.

If you use multiple selection criteria, the order overview shows the matching results.

The responsibility area is not checked in this application.

Order overview detail application

The “order overview” detail application shows all  orders you have selected in the selection panel. Every

row  shows  one  order.  Numerous  columns,  which  you  may  hide  or  show,  display  all  available  pieces  of

information summarized in reasonable categories.

The list shows specific order data. This includes existing order data as well as current status information

on the order.

Operations detail application

The detail application operations shows all operations pertaining to the above selected order. If you select

several  orders  in  the  order  overview,  this  application  shows  all  operations  belonging  to  these  selected

orders. In this case, we recommend showing the "order" column.

The  list  shows  specific  operation  data.  This  includes  existing  operation  data  as  well  as  current  status

information on the operation.

Total quantities detail application

Subject  to  the  order  selected  in  the  order  overview,  this  detail  application  shows  the  overall  collected

quantities of the order. If you select several orders, the application shows the totals of the selected orders

in a graphic.

BDE-CAB_82.docx

Version: 1.1.23049

Page 15 of 48

Controlling of Shop Floor Data/Order Data

Total times detail application

Subject  to  the  order  selected  in  the  order  overview,  this  detail  application  shows  the  overall  collected

times of individual operations pertaining to the order. If you select several orders, the application shows

the totals of the selected orders in a graphic.

Downtimes by resource performance accounts detail application

Subject  to  the  order  selected  in  the  order  overview,  this  detail  application  shows  the  overall  recorded

downtimes  of  the  order  separated  by  resource  performance  accounts.  If  you  select  several  orders,  the

application shows the totals of the selected orders in a graphic.

Performance and run time detail application

The “performance and run time” detail  application compares the actual  net  and gross activities  with the

target activities, depending on the operations selected in the detail application “operations”.

Further information on the calculation of individual KPIs can be found here.

If you select multiple operations, the values are not added up. The detail application only shows

the values of one of the selected operations.

Target/actual comparison detail application

When  target/actual  values  are  displayed  and  compared  in  a  table,  the  target  values  are  compared  with

the recorded actual values of the selected operations. The following values are displayed:

  Yield

  Scrap

  Setup time

  Cycle time

  Partitioning

  Production time per piece (time/piece)

Further information on the calculation of individual actual values can be found here.

If you select multiple operations, the values are not added up. The detail application only shows

the values of one of the selected operations.

BDE-CAB_82.docx

Version: 1.1.23049

Page 16 of 48

Controlling of Shop Floor Data/Order Data

Activities detail application

The  “activities”  detail  application  compares  target  activities  with  the  rendered  actual  activity  (gross  and

net) of selected operations in a graphic.

Further information on the calculation of individual KPIs can be found here.

Durations detail application

The “durations” detail application compares the order duration, the production duration and downtimes of

the selected operations in a graphic.

Downtimes by resource performance accounts detail application

The “downtimes by resource performance accounts” detail application compares the accrued times of the

selected operations, separated onto resource performance accounts in a graphic.

Toolbar

 Order information

Calls up the Order information for the currently selected order.

 Order overview

Calls up the Order overview for the currently selected order.

Failure mode analysis (function authorization faep)

Calls up the Failure Mode Analysis

 Inspection requirement (function authorization irp)

Calls up the application Inspection requirement

 Inspection points (function authorization ipp)

Calls up the application Inspection points

BDE-CAB_82.docx

Version: 1.1.23049

Page 17 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 18 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 19 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 20 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 21 of 48

Controlling of Shop Floor Data/Order Data

Cost center per activity detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  operation  designation.  The  total  durations  per  cost  center  are  presented  in  the

lines as totals.

BDE-CAB_82.docx

Version: 1.1.23049

Page 22 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 23 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 24 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 25 of 48

Controlling of Shop Floor Data/Order Data

BDE-CAB_82.docx

Version: 1.1.23049

Page 26 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 27 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 28 of 48

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

BDE-CAB_82.docx

Version: 1.1.23049

Page 29 of 48

Controlling of Shop Floor Data/Order Data

Article per work place detail applications

The  data  is  presented  in  a  pivot  grid  (top)  and  as  a  bar  chart  (bottom).  The  columns  show  the  total

duration  added  up  per  workplace.  The  total  durations  per  article  number  are  presented  in  the  lines  as

totals.

BDE-CAB_82.docx

Version: 1.1.23049

Page 30 of 48

Controlling of Shop Floor Data/Order Data

7  Schedule Controlling

Overview

Menu

Order management  Order controlling  Schedule controlling

Transaction code

scec

Function authorization

scec

Available user fields

Where?

Object type/user field key

Source (type)

Table Schedule controlling  AUNR/SYSTEM

Table Schedule controlling  AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You  use  this  application  to  monitor  deviations  from  scheduled  dates  for  operations.  The  deviations  are

displayed in a list. The list provides answers to the following questions, for example:

  Which operations whose planned start has been exceeded have not (yet) been started?

  Which operations are currently not being processed (status prepared or interrupted) and are expected

to be delayed as a result?

  Which operations that are currently being processed (status running), are expected to be finished too

late?

  Which operations were finished too late?

You can use this function to analyze lateness in the schedule, but you can also see which order start or

order end is too early.

Target group for this type  of information: production  controllers and supervisors. Benefit of the function:

The  quality  of  the  scheduled  times  is  continuously  monitored.  It  is  a  tool  to  ensure  smooth  production

processes.

Integration

During the analysis, current dates are compared to planned dates. Depending on the type of planning, the

function  can  monitor  dates  planned  in  detail,  scheduled  dates  or  basic  dates.  The  planned  dates  are

either  the  result  of  detailed  planning  performed  in  HYDRA  shop  floor  scheduling  or  of  the  planning

performed in the ERP system.

BDE-CAB_82.docx

Version: 1.1.23049

Page 31 of 48

Controlling of Shop Floor Data/Order Data

Requirements

To  use  this  application  properly,  you  must  know  how  the  planned  dates  are  identified  or  set  in  your

system. Only then you can specify a useful selection.

Selection criteria

The application provides the following selection criteria:

Check against baseline plan

The  selection  list  shows  all  baseline  plans  that  are  included  in  the  responsibility  area  the  user  is

authorized for.

OPs started too early, OPs started too late, OPs finished too early, OPs finished too late

Depending on the selection options checked, the following operations are included in the selection:

  Operations started too early

  Operations finished too early

  Operations started too late

  Operations finished too late

The values that are calculated are specified by the-  option selected: "Exceeding of planned dates",

"Exceeding of basic dates" or "Exceeding of scheduled dates".

If none of these options is set, all operations without deviations are displayed.

Date ... to  …

The  system  only  checks  the  operations  that  have  a  start  or  end  date  in  the  specified  period

(depending on the selected option).

Consider long-term data

If this option is set, the system also includes operations that have been transferred from the online

data to the long-term dataset.

Exceeding of planned dates

The  system  checks  if  the  start  and  end  dates  specified  in  the  detailed  scheduling  (e.g.  HYDRA

Shop Floor Scheduling) are respected.

Exceeding of basic dates

The system checks if the basic dates Latest start (LST) and Latest end (LET) transferred from the

ERP system or specified in the HYDRA lead time scheduling are respected.

Note:

The ERP system must transfer the correct basic dates for the operation that result from lead time

scheduling.  Other  option:  You  can  also  calculate  the  basic  dates  using  the  HYDRA  lead  time

scheduling.

BDE-CAB_82.docx

Version: 1.1.23049

Page 32 of 48

Controlling of Shop Floor Data/Order Data

Exceeding of scheduled dates

The system checks if the calculated dates Scheduled start time and Scheduled end time transferred

from the ERP system or specified in the HYDRA lead time scheduling are respected.

Planned for

Workplace or group

Workplace/group/cost center/company

Narrows down the display by workplace, group or cost center.You can also use wildcards.

Note:  The  selection  by  workplace  or  cost  center  is  only  useful  with  operations  that  are  already

planned for a specific workplace.

Order

Only operations of a specific order are selected. You can also use wildcards.

Order type

Only operations of orders of a specific order type are selected. Multiple selection is possible.

Category

Only  operations  of  orders  of  a  specific  order  type  category  are  selected.  Multiple  selection  is

possible.

Order group

Only operations of orders of a specific order group are selected. Multiple selection is possible.

MRP controller

Only operations of orders of a specific MRP controller are selected. You can also use wildcards.

Customer name/designation

Only operations of orders for a specific customer are selected. You can also use wildcards.

Sales order

Only operations of the order that matches the specified sales order are selected. You can also use

wildcards.

Project number

Only  operations  of  the  order  with  the  specified  project  number  are  selected.  You  can  also  use

wildcards.

Planned order

Only operations of the order that matches the specified planned order are selected. You can also

use wildcards.

Operation status

The system only selects operations of a specific operation status. Multiple selection is possible.

BDE-CAB_82.docx

Version: 1.1.23049

Page 33 of 48

Controlling of Shop Floor Data/Order Data

Control

The  system  only  selects  operations  that  have  a  status  with  a  specific  control  indicator.  Multiple

selection is possible.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

Data collection

Depending  on  the  option  selected,  the  check  is  performed  against  the  planned  dates/the  scheduled

dates/the basic dates (specification as date) of the current dataset.

The values that are calculated are specified by the



selection of the tab Planned dates, Scheduled dates or Basic dates.

The  values  Planned  start  or  Planned  end  described  in  the  tables  below  are  used  as  some  kind  of

placeholders  for  the  different  combinations  (current  planned  dates/planned  dates,  current  planned

dates/scheduled dates, current planned dates/basic dates).

To  calculate  the  days,  the  system  uses  the  specified  dates  and  synchronizes  them  with  the

Gregorian calendar. The displayed format is: days.hours:minutes:seconds.

Deviation from start date

Earliness

Condition 1: Control
L, U, E, A

Condition 2: Date
OP actual start < planned start

Calculation *)
ABS
planned start)

(OP  actual  start  minus

Lateness

Condition 1: Control
L, U, E, A, F

Condition 2: Date
OP actual start > planned start

S, V

OP planned start > today

On-time delivery

On-time delivery = earliness + lateness

Calculation *)
ABS
planned start)
ABS
today)

(OP  actual  start  minus

(OP  planned  start  minus

BDE-CAB_82.docx

Version: 1.1.23049

Page 34 of 48

Controlling of Shop Floor Data/Order Data

Deviation from end date

Earliness

Condition
Control
E, A

Lateness

1:

Condition 2: Date

Calculation *)

OP actual end < planned
end

ABS (OP actual end minus planned end)

Condition 1: Control
S, V, L, U, F
E, A

Condition 2: Date
Today > planned end
OP actual end > planned end

Calculation *)
ABS (today minus planned end)
ABS (OP actual end minus planned
end)

On-time delivery

On-time delivery = earliness + lateness

*) The time is always specified as absolute value (ABS).

Field descriptions

When  the  data  is  requested,  the  table  shows  the  order/operation,  OP  designation  and  article  and

additionally the basic dates, the dates of detailed planning and the actual dates.

Deviations

from  scheduling

(earliness,

lateness,  on-time  delivery)  are  displayed

in

format

days.hours:minutes:seconds.

To  calculate  the  days,  the  system  uses  the  specified  dates  and  synchronizes  them  with  the

Gregorian calendar.

Detail application: Schedule controlling (graphic)

The detail application Schedule controlling (graphic)  shows the earliness,  lateness and on-time delivery

for all operations selected in the table. If no operation is selected, it will be interpreted as “all operations

selected”.

Display options

Display:

You can specify whether the graphic shows earliness, lateness or on-time delivery performance.

BDE-CAB_82.docx

Version: 1.1.23049

Page 35 of 48

Controlling of Shop Floor Data/Order Data

Relating to:

You  can  specify  whether  the  graphic  shows  the  deviations  from  the  start  (planned  start/actual  start)  or

from the end (planned end/actual end) of the operation.

Group by:

The  selection  made  specifies  if  the  graphic  shows  the  totaled  data  for  the  workplace,  group  or  cost

center.

Consideration:

Specifies whether



the mean value AND the standard deviation

or



the total of durations (lateness, …)

are displayed.

Display

Data is displayed in format Days.Hours:Minutes:Seconds.

Irrespective  of  the  selected  display  options,  the  number  of  operations  used  for  the  evaluation  is  always

displayed in form of a line.

Calculations

Mean value

The mean value is calculated as follows:

BDE-CAB_82.docx

Version: 1.1.23049

Page 36 of 48

Controlling of Shop Floor Data/Order Data

n = Number of OPs produced too early

Standard deviation

Standard deviation is calculated as follows:

In  case  of  lateness,  the  variance  is  calculated  as  follows:

  (analog  calculation

for earliness or on-time delivery).

Toolbar

The parameters to call the function or target application are generally transferred from the table. For this

reason, you should always select an entry before calling an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

Saving baseline plans

Function authorization: esvb; license: BDE-CAB

The applications  Operations and Pool of  orders provide this function.  You can  use this function to save

baseline  plans  for  selected  operations  that  are  used  as  selection  criterion  to  identify  deviations  from

planned dates.

BDE-CAB_82.docx

Version: 1.1.23049

Page 37 of 48

nEarlinessnxx1nDelaynxx1nDelayEarlinessnxxx1VarnDelayVarnxx12)(

Controlling of Shop Floor Data/Order Data

BDE-CAB_82.docx

Version: 1.1.23049

Page 38 of 48

Controlling of Shop Floor Data/Order Data

8  Lean Performance Analysis

Overview

Menu

Order management  Order controlling  Lean Performance Analysis

Transaction code

lpal

Function authorization

lpal

Purpose

Use the Lean Performance Analysis to display a value stream mapping in tabular and graphic form. The

application shows orders including their operations and diverse key performance indicators (KPI).

A  batch  job  of  the  HYDRA  Scheduler  cyclically  calculates  the  different  KPIs.  The  document

Activating_OrderRelatedKeyfigures.pdf illustrates how you can activate this processing.

Selection criteria

If you use several selection criteria, the application Lean Performance Analysis shows the overlapping

results.

The application provides the following selection criteria:

Order

The selection criterion order refers to the order number. The application shows the selected order.

You can also enter wild cards.

Order type

The selection criterion order type refers to the order type of the order header. The application only

shows the orders pertaining to the selected order type(s).

Category

The  selection  criterion  category  refers  to  the  category  of  the  order  type  in  the  order  header.  The

application only shows the orders pertaining to the selected category(ies).

Finished article

The  selection  criterion  finished  article  refers  to  the  article  in  the  order  header.  The  application

shows all orders that include the selected article. You can also use wild cards (placeholders *).

BDE-CAB_82.docx

Version: 1.1.23049

Page 39 of 48

Controlling of Shop Floor Data/Order Data

Article name

The  selection  criterion  article  name  refers  to  the  article  name  defined  in  the  order  header.  The

application  shows  all  orders  assigned  to  the  selected  article  name.  You  can  also  use  wild  cards

(placeholders *).

Order status

The selection criterion order status refers to the order statuses of the order header. The application

only shows the orders assigned to the selected order status(es).

Control

The  selection  criterion  control  refers  to  the  control  indicator  of  the  order  header.  The  application

only shows the orders assigned to the selected control indicator(s).

Sales order

The  selection  criterion  sales  order  refers  to  the  sales  order  defined  in  the  order  header.  The

application shows all orders that include this sales order. You can also use wild cards.

Customer name

The  selection  criterion  customer  name  refers  to  the  customer  name  defined  in  the  order  header.

The system shows all orders including the selected customer name. You can also use wild cards

(placeholders *).

Project number

This  selection  criterion  refers  to  the  project  number  defined  in  the  order  header.  The  application

shows all orders of the selected project number. You can also use wild cards (placeholders *).

Planned order

The selection criterion planned order refers to the planned order defined in the order header. You

can also use wild cards (placeholders *).

Cost object

The  selection  criterion  cost  object  refers  to  the  cost  object  defined  in  the  order  header.  The

application shows all orders of the selected cost object. You can also use wild cards (placeholders

*).

Order group

  The  selection  criterion  order  group  refers  to  the  order  group  defined  in  the  order  header.  The

application shows all orders that are assigned to the selected order group.

Operation

The  selection  criterion  operation  refers  to  the  operation  number.  You  can  also  use  wild  cards

(placeholders *).

Basic start date from ... until

The selection criterion basic start date refers to the basic start date defined in the order header. The

application only shows the orders coinciding with the selected basic start dates.

BDE-CAB_82.docx

Version: 1.1.23049

Page 40 of 48

Controlling of Shop Floor Data/Order Data

Basic end date from ... until

The selection criterion basic end date refers to the basic end date defined in the order header. The

application only shows the orders coinciding with the selected basic end dates.

Order end by

The  selection  criterion  order  end  refers  to  the  actual  job  end  defined  in  the  order  header.  The

application only shows orders coinciding with the selected order end date.

Order overview detail application

Status category

Order status

The application shows the bitmap (“LED”) defined in the status configuration as the status.

By default, the color of the status LED corresponds to the color of the control LED.

Order status (text)

The status text results from the current status of the operation.

Status since

Date/time since when the order is in this status.

Order category

Shows specific data for the Orders. Relevant fields are:

Order

Number of the corresponding order

Finished article

The finished article of the complete order maintained in the order header.

Article name

Name of the finished article.

Quantities category

Target quantity (B)

Quantity specification for the order in base quantity unit.

Unit (B)

Defined unit (base quantity unit)

Yield (B)

Recorded yield in base quantity unit of the last operation that can be posted.

This  is  the  last  operation  included  in  the  order  network  that  is  neither  locked

(internal  control  flag  "Y")  nor  deleted  logically  (internal  control  flag  "D").  This

operation "provides" the quantity for the entire order.

BDE-CAB_82.docx

Version: 1.1.23049

Page 41 of 48

Controlling of Shop Floor Data/Order Data

This means that the yield is 0 as long as the order has not been finished, i.e.

as long as no quantity has been posted onto the order's last operation that can

be posted.

If  the  last  operation  that  can  be  posted  has  a  quantity  >  0,  but  the  order

overview  does  not  show  this  quantity,  check  the  procedure  described  in  the

document  entitled  Activating_OrderRelatedKeyfigures.pdf  or  proceed  as

described there.

Scrap (B)

Total  of  the  scrap  quantities  entered  for  all  operations  of  the  order  in  base  quantity  unit.

Requirement: post scrap in the base quantity unit onto the operations.

Rework (B)

Total  of  the  rework  quantities  entered  for  all  operations  of  the  order  posted  in  base  quantity  unit.

Requirement: post the rework quantity in the base quantity unit onto the operations.

Open quantity (B)

Total of the open quantities entered for all operations of the order posted in the base quantity unit.

Requirement: post the open quantity in the base quantity unit onto the operations.

Target times category

Planned lead time

The  planned  lead  time  includes  all  planned  execution  times,  like  setup  time,  processing  time,

inspection time and retooling time.

Target setup time

Target setup time for the operation.

Target processing time

Target processing time for the operation.

Target execution time

Total of target setup time + target processing time

Target labor utilization

Total of the target labor utilization of all active OPs that can be posted

Target wait time

Defined target wait time of the order.

BDE-CAB_82.docx

Version: 1.1.23049

Page 42 of 48

Controlling of Shop Floor Data/Order Data

Actual times category

Retention period of order

The retention period of the order results from the period of time between:

- when the order was first transferred from the ERP system ("order release" = creation date of the

order header in HYDRA) and

- when the last (chronological) active operation of the order is actually logged off.

Note: We cannot identify or take into account if

- the ERP system transfers the order for the first time or

- the order has meanwhile been deleted and resent due to technical problems.

Lead time

The order duration results from the period of time between:

- the first logon of an operation of the order and

- the logoff of the last active operation (from a chronological view).

Setup time

The setup time of the order is the total of setup times (RPA 7) of all active operations that can be

posted.

Processing time

The  processing  time  of  the  order  is  the  total  of  main  production  times  (RPA  11)  of  all  active

operations that can be posted.

Downtime

The  downtime  of  the  order  is  the  total  of  downtimes  (RPA  1  to  6,  RPA  8  to  10)  of  all  active

operations that can be posted.

Occupancy time

The assignment/occupancy time is the total of the setup times (RPA 7), processing times (RPA 11)

and downtimes (RPA 1...6, RPA 8...10) of all active operations that can be posted.

Personnel deployment/labor utilization

The labor utilization of the order is the total of personnel deployment times of all active operations

that can be posted.

Key performance indicators category

Utilization efficiency (rate of capacity utilization)

The capacity utilization rate/utilization efficiency is the ratio of the processing time (RPA 11) to the

assignment/occupancy time (RPA 1 ... 11) in percent.

BDE-CAB_82.docx

Version: 1.1.23049

Page 43 of 48

100*RPA11111nRPAnefficiencynUtilizatio

Controlling of Shop Floor Data/Order Data

Setup ratio

The setup ratio is the ratio of the setup time/costs (RPA 7) to the assignment/occupancy time (RPA

1...11) in percent.

RPA category

RPA 1-12

Actual times posted onto the resource performance accounts (RPA).

Deviation category

Yield/target quantity [%]

Comparison of the produced yield (B) and the planned target quantity (B) in %.

Processing [%]

Comparison of the target processing time and the processing time actually posted onto RPA 11 in

%.

Setup [%]

Total (100 / target setup time * setup time) of all finished operations that can be posted.

Labor utilization [%]

Total (100 / target  labor utilization  * labor utilization) of all finished operations that can be posted.

Only if the labor utilization > 0. You must specify the target labor utilization/personnel deployment if

you want to calculate this value.

Operations detail application

The detail application operations shows all operations pertaining to the above selected order.

If you select several orders in the order overview, this application shows all operations belonging to these

selected orders. In this case, we recommend showing the "order" column.

Operation category

Shows specific data for the operations.

Status category

Status

This category shows the bitmap (“LED”) defined in the status configuration as the operation status.

By default, the color of the status LED corresponds to the color of the control LED.

BDE-CAB_82.docx

Version: 1.1.23049

Page 44 of 48

)( arg(B) YieldBquantityetTtimegprocesetTsinarg timeProcessing

Controlling of Shop Floor Data/Order Data

Status text

The status text results from the current status of the operation.

Status since

Point in time since the status is available.

The field is empty for prepared operations.

Predecessor status

Status of the predecessor operation. This status indicates whether the predecessor operation has

already been started and thus material, which will be further processed in the current operation, has

already been processed or produced.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

Yield

The yield column shows the recorded yield quantity.

Scrap

The scrap column shows the recorded scrap quantity.

Rework

Quantity that has to be reworked.

Open quantity

The open quantity is another quantity account.

Unit

Quantity unit of the displayed values.

The quantities listed here are displayed as base, primary, secondary and tertiary quantity. In the

majority  of  cases,  we  recommend  displaying  only  one  of  these  quantity  types.  The  terminal

collects quantities in the primary quantity.

Key performance indicators category

Actual cycle

Use the following formula to calculate this actual cycle:

Setup time

Total of the operation times posted onto the resource performance accounts 7.

BDE-CAB_82.docx

Version: 1.1.23049

Page 45 of 48

)/(11RPA PrngPartitioniYieldquantityimary

Controlling of Shop Floor Data/Order Data

Processing time

Total of the operation times posted onto the resource performance accounts 11.

Utilization efficiency (rate of capacity utilization)

The capacity utilization rate/utilization efficiency is the ratio of the processing time (RPA 11) to the

assignment/occupancy time (RPA 1 ... 11) in percent.

Setup ratio [%]

The setup ratio is the ratio of the setup time/costs (RPA 7) to the assignment/occupancy time (RPA

1...11) in percent.

Total gross duration

Total of the operation times posted onto the resource performance accounts 1-12.

Yield, scrap

Produced yield and/or scrap quantity in the respective primary, secondary, tertiary or base quantity

unit.

Lead time

The lead time results from the period of time between:

- the first logon of the operation and

- the last logoff of the operation (if the operation is finished) or

- the last interruption (if the operation is not finished). Lead times are synchronized based on the

Gregorian calendar (the shift calendar is not taken into account). The lead time is 0 if no difference

can be calculated (between logging on and off).

Wait time

The wait time includes those times of the lead time during which the operation was not logged on

(lead time minus RPA 1-12). Times are calculated based on the BDE log records. The wait times

are synchronized with the Gregorian calendar.

Execution time

Total of the times posted onto resource performance account 7 and 11.

Downtime

Total of the times posted onto the resource performance accounts 1 - 6 and 8-10.

BDE-CAB_82.docx

Version: 1.1.23049

Page 46 of 48

100*RPA11111nRPAnefficiencynUtilizatio100*RPA7111nRPAnratioSetup

Controlling of Shop Floor Data/Order Data

Lean Performance Analysis detail application (graphic)

The graphic shows the key performance indicators for an order and its operations. The graphic aligns the

operations  according  to  their  order/operation  number.  Use  the  dialog  "settings"  to  specify  the  KPIs  you

want to display.

The following information is shown for operations:

-  MES order number

-  OP name

-  Article/Item

-  Article name

-  The selected KPIs (see above for the calculation "category: key performance indicators")

You can also view the wait time and/or the transition time between operations:

Transition time (between OPs)

The transition time of an operation refers to the time period between

- the (last) actual logoff of the current ("preceding") operation and

- the (first) actual logon of the next ("subsequent") operation. The transition time is 0 if two OPs

coincide. Times are synchronized with the Gregorian calendar.

Wait time (between OPs)

Period of time starting:

- when the preceding operation is no longer in the status "production" and

- the subsequent operation starts producing (status "production")..

Times are synchronized with the Gregorian calendar.

The system can only calculate the KPI, once:

- the preceding operation has been logged off and

- the next operation has been logged on.

The  system  does  not  recalculate  the  KPI  if  you  edit  the  MDE  postings

subsequently.

If, contrary to expectations, the KPI is 0, check the procedure described in the

document  entitled  Activating_OrderRelatedKeyfigures.pdf  or  proceed  as

BDE-CAB_82.docx

Version: 1.1.23049

Page 47 of 48

Controlling of Shop Floor Data/Order Data

described there.

The application shows the KPIs for each operation and order:

Toolbar

 Order information (function authorization: orin)

Calls up the Order information

 Order overview (function authorization: orov)

Calls up the Order overview

 Settings

Here you can choose from the KPIs you want to display for the orders and operations.

BDE-CAB_82.docx

Version: 1.1.23049

Page 48 of 48

