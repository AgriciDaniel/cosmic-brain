Manual

KPI Monitoring / OEE (MOC)
MDE-KMO 8.1

Version 1.0.8360

Last changed on: 19.06.2020

KPI Monitoring / OEE (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-KMO_81.docx

Version: 1.0.8862

Page 2 of 24

KPI Monitoring / OEE (MOC)

Contents

1  Übersicht Kennzahlenmonitor / OEE ........................................................... 4

2  Efficiency Report .......................................................................................... 5

3  Performance Profile ................................................................................... 11

4  OEE Report ................................................................................................ 17

MDE-KMO_81.docx

Version: 1.0.8862

Page 3 of 24

KPI Monitoring / OEE (MOC)

1  Übersicht Kennzahlenmonitor / OEE

Purpose

The  key  performance  indicators  /  OEE  monitor  function  package  makes  it  possible  to  perform  a  sound

evaluation  of  the  data  recorded  in  MDE  (quantities,  durations)  over  time  periods  based  on  defined  key

performance indicators.

Implementation considerations

You use the function package if:

  You  would  like  to  monitor  and  assess  the  output  of  separate  machines,  machine  groups  or

departments based on key performance indicators

  You  would  like  to  monitor  and  assess  the  output  of  individual  machines,  machine  groups  or

departments based on "Overall Equipment Effectiveness" (OEE).

Integration

Times and quantities entered in BDE or MDE are accessed to display order progress.

Features

  Efficiency report

o  Number of units report and time-based efficiency report for all machines over an arbitrary

choice of periods and shifts

o  Distribution  graph  showing  rate  of  capacity  utilization,  scrap  rate,  rate  of  capacity

utilization, technical efficiency and assignment utilization rate for several machines

  Performance profile

o  Evaluations  of  occupancy  time,  machine  work  time,  assignment  utilization  rate  and

technical efficiency

  OEE report

o  Tabular evaluation of "Overall Equipment Effectiveness“ (OEE) to be able to consider the

key  performance  indicators  of  productivity,  quality  and  effectiveness  for  all  machines.

Graphical display of the OEE and its components.

o  Distribution graph showing OEE and its components over multiple machines

o  Tabular or graphical displays using bar or pie charts

o  Views of the top ten key performance indicators

MDE-KMO_81.docx

Version: 1.0.8862

Seite 4 von 24

KPI Monitoring / OEE (MOC)

2  Efficiency Report

Summary

Menu

Production facility management  Key figures  Performance report

Transaction code

effrp

Function authorization

effrp

The  analysis  concerns  workplace/  machine-related  performance  data  for  a  certain  period  of  time  and  a

certain number of workplaces. The result depends on the selection and therefore on the selection criteria

made  available  on  the  selection  panel.  The  performances  displayed  in  graphic  form  for  quantities  and

duration provide the production controller with the desired information immediately at a glance.

Selection criteria

The application provides the following selection criteria:

Workplace

This selection criterion references the workplace in the machine or workplace master data. You can also

run a search using wildcards (placeholders *).

Group

This  selection  criterion  references  the  group  in  the  machine  or  workplace  master  data.  All  machines  or

workplaces  are  displayed  that  are  assigned  to  the  selected  group.  You  can  also  run  a  search  using

wildcards.

Report group

This selection criterion references the report groups.  All machines or  workplaces are displayed that  are

assigned to the selected report group.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind that

only machines are displayed that the user has also assigned responsibility areas to.

Cost center

This selection criterion references the cost center defined  in the machine  or  workplace master data.  All

machines or workplaces are displayed that are assigned to the selected cost center. You can also run a

search using wildcards.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 5 von 24

Short designation

This selection criterion references the short name of the machines in the master data. All of the machines

or  workplaces  are  displayed  that  match  the  string  that  was  entered.  You  can  also  run  a  search  using

KPI Monitoring / OEE (MOC)

wildcards.

Designation

This  selection  criterion  references  the  short  name  of  the  machines  and  workplaces  in  the  machine's

master data. Only those machines are displayed that are identical to the string that was entered. There is

also the option to use wild cards (placeholders *) in this field.

Company

This  selection  criterion  references  the  company  defined  in  the  machine  or  workplace  master  data.  All

machines  or  workplaces  are  displayed  that  are  assigned  to  the  selected  company.  You  can  also  run  a

search using wildcards.

Order/ article

For this kind of evaluation  type, only  the finished ADE postings are considered. If the order is currently

still running on the machine, the time period between the last log on and now is not taken into account. As

such, it is by all means possible that there are differences between the machine evaluation and the order-

related  evaluation.  Only  ADE  postings  are  taken  into  account  that  have  started  during  the  evaluation

period. If necessary, the selection period must be selected so that the ADE postings that are to be taken

into  account  are  within  this  selection  period.  For  this  order-related  evaluation,  MPDV  recommends  the

shift-related selection option.

The order number, article/item or the batch (from the order header) may be used as selection criteria.

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 6 von 24

KPI Monitoring / OEE (MOC)

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area) and quantity are assigned to each order. The fact that orders are run in parallel will not result in a

proportionate calculation.

Long term data

If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system  applies  the

implicit solution and selects the medium-term data area as well. Therefore, there is no need for

an explicit activation in order to be able to access the medium-term data set.

Counter type

In the detail application "consumption figures", the counters to be displayed can be chosen by their type

as  defined  within  the  configuration  of  counters.  The  detail  application  is  only  available  if  the  relevant

license has been purchased.

Efficiency report detail application

The  efficiency  report  detail  application  includes  workplace/  machine-related  performance  data  for  a

certain  period  of  time  and  a  certain  number  of  workplaces.  The  result  depends  on  the  selection  and

therefore on the selection criteria made available on the selection panel.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 7 von 24

Workplace category

The following workplace/ machine-related master data are available:

KPI Monitoring / OEE (MOC)

  Workplace

  Short designation

  Designation

  Group

  Cost center

  Company

Primary quantity, secondary quantity, tertiary quantity, basic quantity category

Workplace/ machine-related quantities recorded in the corresponding quantity types

  Yield

  Scrap

  Rework

  Open quantity

or the relevant quantity units (if relevant in the customer system).

Duration category

  Production = RPA11

  Downtime = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

Cycles category

  Number of posted cycles

Key figures category

  Rate of capacity utilization

The rate of capacity utilization represents the ratios derived from the effective runtime and the

machine operation time.

Rate of capacity utiliz. = 100/ (RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 +

RPA08 + RPA09 + RPA10 + RPA11) * RPA11

MDE-KMO_81.docx

Version: 1.0.8862

Seite 8 von 24

KPI Monitoring / OEE (MOC)

  Assignment utilization rate:

The assignment utilization rate represents the relationship resulting from the effective runtime (main

utilization time) and the adjusted machine operation time (i.e. without scheduled downtimes).

Assignment utilization rate = 100 / (total of RPA 1 to RPA 11 minus RPA 6) * RPA 11

  Efficiency (efficiency is only available when combined with the "lines" license)

Efficiency is the quotient derived from the effective runtime and the general runtime, meaning the sum

total of the effective runtime and any interruptions as a result of machine-related disturbances or

unscheduled shutdowns. Any other disturbances, e.g. organization-related disturbances, are not

taken into account here.

Efficiency = 100 / (RPA02 + RPA05 + RPA11) * RPA11

  Technical efficiency

The variable showing the technical efficiency represents the sum total of the effective runtime and

interruptions caused by technical (machine-related) disturbances. The times for all other disturbances

(e.g. organization-related disturbances) are not accounted for in this calculation:

Technical Efficiency = 100 / (RPA02 + RPA11) * RPA11

  Rate = 100 / ((yield (primary quantity) + scrap

(primary quantity) + rework quantity (primary quantity) + open quantity (primary quantity)) * yield

(primary quantity)

  Scrap rate = 100 / ((yield (primary quantity) + scrap (primary quantity)) * scrap (primary quantity)

Quantitative activities (machine-related) detail application

This detail application generates a graphic illustration of the quantities of the workplaces selected in the

tabular detail application. Here, a differentiation is made by yield, scrap, rework and open quantity.

This detail application is docked right behind the quantity rate (group-related) detail application.

Quantity rate (group-related) detail application

This  chart  shows,  based  on  the  selected  entries  in  the  table,  the  relationship  between  the  quantities  -

yield, scrap, rework and open quantities. The information is displayed by group/ added total by workplace

group.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 9 von 24

This detail application is docked right behind the quantitative activities (machine-related) detail

KPI Monitoring / OEE (MOC)

application.

Duration detail application

This detail application generates a graphic illustration of the selected data from the efficiency report detail

application. The durations are shown, broken down by RPA accounts.

You can hover the mouse over the graphic to display the value of the area where the mouse is. You have

the option to switch between displaying the value in percent or in duration.

Consumption figures detail application

Shows  the  master  data  and  counter  values  of  the  machine  counters  configured  for  the  machines.  By

selecting the counter type, the data displayed can be limited to e.g. consumption figures or yield counters,

or similar.

This detail application is only available if the system is configured accordingly and the relevant

licenses are available.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 10 von 24

KPI Monitoring / OEE (MOC)

3  Performance Profile

Summary

Menu

Production facility management  Key figures  Performance profile

Transaction code

effpf

Function authorization

effpf

The  Performance  profile  application  provides  a  tabular  and  graphic  presentation  of  the  production

performance  interrelationships.  By  compressing  the  performances  entered  by  date  and  shift  level,  this

application  provides  indispensable  key  production  figures  for  all  persons  in  a  position  of  responsibility.

This application supplies all quantities and durations at a glance that are necessary in order to be able to

reliably assess the production status.

Selection criteria

The application provides the following selection criteria:

Workplace

This selection criterion references the workplace in the machine or workplace master data. You can also

use wildcards (placeholders *).

Group

This  selection  criterion  references  the  group  in  the  machine  or  workplace  master  data.  All  machines  or

workplaces  are  displayed  that  are  assigned  to  the  selected  group.  You  can  also  run  a  search  using

wildcards.

Report group

This selection criterion references the report groups.  All machines or  workplaces are displayed that  are

assigned to the selected report group.

Company

This  selection  criterion  references  the  company  defined  in  the  machine  or  workplace  master  data.  All

machines  or  workplaces  are  displayed  that  are  assigned  to  the  selected  company.  You  can  also  run  a

search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine  master data. Keep in mind that

only machines are displayed that the user has also assigned responsibility areas to.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 11 von 24

Cost center

This selection criterion references the cost center defined  in the machine  or  workplace master data.  All

machines or workplaces are displayed that are assigned to the selected cost center. You can also run a

KPI Monitoring / OEE (MOC)

search using wildcards.

Short designation

This selection criterion references the short name of the machines in the master data. All of the machines

or  workplaces  are  displayed  that  match  the  string  that  was  entered.  You  can  also  run  a  search  using

wildcards.

Designation

This  selection  criterion  references  the  short  name  of  the  machines  and  workplaces  in  the  machine's

master  data.  At  the  bottom,  only  those  machines  are  displayed  that  are  identical  to  the  string  that  was

entered. You can also run a search using wildcards (placeholders *) in this field.

Order/ article

For this kind of evaluation  type, only  the finished ADE postings are considered. If the order is currently

still running on the machine, the time period between the last log on and now is not taken into account. As

such, it is by all means possible that there are differences between the machine evaluation and the order-

related  evaluation.  Only  ADE  postings  are  taken  into  account  that  have  started  during  the  evaluation

period. If necessary, the selection period must be selected so that the ADE postings that are to be taken

into  account  are  within  this  selection  period.  For  this  order-related  evaluation,  MPDV  recommends  the

shift-related selection option.

The order number, article/item or the batch (from the order header) may be used as selection criteria.

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 12 von 24

KPI Monitoring / OEE (MOC)

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area) and quantity are assigned to each order. The fact that orders are run in parallel will not result in a

proportionate calculation.

If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system  applies  the

implicit solution and selects the medium-term data area as well. Therefore, there is no need for

an explicit activation in order to be able to access the medium-term data set.

Performance profile detail application

The  performance  profile  of  machine-related  performance  data  is  presented  for  a  specific  period  of  time

and a certain number of workplaces. The result depends on the selection and therefore on the  selection

criteria made available on the selection panel.

Date category

Depending on the "Group results" option chosen in the selection range, the columns are filled as shown

below (each of the columns not mentioned in the selection remain empty):

  Selection date and shift: Display year, calendar week, month, shift date, shift.

  Selection date: Display year, calendar week, month, shift date

  Selection week: Display year, calendar week

  Selection month: Display year, month

MDE-KMO_81.docx

Version: 1.0.8862

Seite 13 von 24

KPI Monitoring / OEE (MOC)

  Selection year: Display year

Primary quantity, secondary quantity, tertiary quantity, basic quantity category

Workplace/ machine-related quantities recorded in the corresponding quantity types

  Yield

  Scrap

  Rework

  Open quantity

or the relevant quantity units (if relevant in the customer system).

Duration category

  Production = RPA11

  Downtime = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

Key figures category

  Rate of capacity utilization

The rate of capacity utilization represents the ratios derived from the effective runtime and the

machine operation time.

Rate of capacity utiliz. = 100/ (RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 +

RPA08 + RPA09 + RPA10 + RPA11) * RPA11

  Assignment utilization rate:

The assignment utilization rate represents the relationship resulting from the effective runtime (main

utilization time) and the adjusted machine operation time (i.e. without scheduled downtimes).

Assignment utilization rate = 100 / (total of RPA 1 to RPA 11 minus RPA 6) * RPA 11

  Efficiency (efficiency is only available when combined with the "lines" license)

Efficiency is the quotient derived from the effective runtime and the general runtime, meaning the sum

total of the effective runtime and any interruptions as a result of machine-related disturbances or

unscheduled shutdowns. Any other disturbances, e.g. organization-related disturbances, are not

taken into account here.

Efficiency = 100 / (RPA02 + RPA05 + RPA11) * RPA11

MDE-KMO_81.docx

Version: 1.0.8862

Seite 14 von 24

KPI Monitoring / OEE (MOC)

  Technical efficiency

The variable showing the technical efficiency represents the sum total of the effective runtime and

interruptions caused by technical (machine-related) disturbances. The times for all other disturbances

(e.g. organization-related disturbances) are not accounted for in this calculation:

Technical Efficiency = 100 / (RPA02 + RPA11) * RPA11

  Rate = 100 / ((yield (primary quantity) + scrap

(primary quantity) + rework quantity (primary quantity) + open quantity (primary quantity)) * yield

(primary quantity)

  Scrap rate = 100 / ((yield (primary quantity) + scrap (primary quantity)) * scrap (primary quantity)

Chart quantities detail application

This chart shows, based on the selected entries in the table, the relationship between the quantities.

Depending on the option "group result" chosen in the selection range, the values are displayed per

  Shift/ shift date (selection date and shift)

  Shift date (selection date)

  Calendar week (selection week)

  Month (selection month)

  Year (selection year)

.

Using the "Displayed series" combo box, you can select which quantities you would like to have displayed

(e.g. only yield and scrap).

Chart durations detail application

The  durations  detail  application  shows,  based  on  the  selected  entries  in  the  table,  the  relationship

between  the  production  duration  to  downtime.  Depending  on  the  option  "group  result"  chosen  in  the

selection range, the values are displayed per

  Shift/ shift date (selection date and shift)

  Shift date (selection date)

MDE-KMO_81.docx

Version: 1.0.8862

Seite 15 von 24

KPI Monitoring / OEE (MOC)

  Calendar week (selection week)

  Month (selection month)

  Year (selection year)

.

This detail application is docked right behind the key figures detail application.

Key figures chart detail application

The key figures detail application shows, based on the selected entries in the table, the efficiency or the

technical efficiency, assignment utilization rate, rate, scrap rate or the rate of capacity utilization in graphic

form.

To achieve this, the relevant key figure must be selected from the combo box. If no key figure is selected,

the rate of capacity utilization is shown.

Depending on the option "group result" chosen in the selection range, the key figures are displayed per

  Shift/ shift date (selection date and shift)

  Shift date (selection date)

  Calendar week (selection week)

  Month (selection month)

  Year (selection year).

The key figure in the label (if activated) is displayed to the second decimal place.

This detail application is docked right behind the durations detail application.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 16 von 24

KPI Monitoring / OEE (MOC)

4  OEE Report

Overview

Menu

Production facility/resource management --> Key performance indicators -->
OEE report

Transaction code

oeerp

Function authorization

oeerp

The analysis concerns machine-related OEE performance data for a certain period of time and number of

workplaces. The result depends on the selection made and therefore on the selection criteria available in

the  selection  panel.  This  report  lists  expedient  data  in  tabular  form  and  provides  sound  information  in

graphic layouts. Consequently, it is a crucial tool for all users.

The application uses machine-related postings to calculate the KPIs.

Selection criteria

The application provides the following selection criteria:

Workplace

The selection criterion workplace refers to the workplace in the machine or workplace master data. You

can also use wild cards (placeholders *).

Group

The selection criterion group refers to the group in the machine or workplace master data. The application

shows  all  machines  and/or  workplaces  that  are  assigned  to  the  selected  group.  You  can  also  use  wild

cards (placeholders *).

Date from ... to ...

The selection criterion date from ... to ... restricts the period you want to evaluate.

Shift / time

Use the selection criterion shift and/or time to further restrict the specified period (date from .. to ...). To do

so, select a shift or specify a time (from ... until...). If the selection period exceeds the period for the online

data area, the system automatically selects the medium-term data area.

If  you  select  the  "time"  option,  the  application  only  includes  those  MDE  log  records  that

completely coincide with the selected period.

Report group

The  selection  criterion  report  group  refers  to  the  report  groups.  The  application  shows  all  machines  or

workplaces that are assigned to the selected report group.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 17 von 24

KPI Monitoring / OEE (MOC)

Company

The selection criterion company refers to the company defined in the machine or workplace master data.

The application shows all machines or workplaces that are assigned to the selected company. You can

also use wild cards (placeholders *).

Responsibility area

The  selection  criterion  responsibility  area  refers  to  the  responsibility  area  in  the  machine  master  data.

Note that you can only view those machines you are authorized for (responsibility area).

Short name

The  selection  criterion  short  name  refers  to  the  short  name  of  machines  in  the  master  data.  The

application shows all machines or workplaces matching the entered string. You can also use wild cards

(placeholders *).

Cost center

The  selection  criterion  cost  center  refers  to  the  cost  center  stored  in  the  machine  or  workplace  master

data.  The  application  shows  all  machines  or  workplaces  that  are  assigned  to  the  selected  cost  center.

You can also use wild cards (placeholders *).

Name

The field name refers to the name of machines and workplaces defined in the machine master data. This

field only shows the machines matching the entered string. You can also use wild cards (placeholders *).

Selection options

No selection:

If  you choose this field,  you cannot select the other selection criteria (order and

resource).

Order:

Use order parameters to restrict the data.

Resource:

Use resource parameters to restrict the data.

If you check one of the options "order" or "resource", the application calculates the KPIs based

on the machine-related postings that occurred while the order and/or resource was logged on.

The  application  does  not  use  the  data  posted  onto  the  order  and/or  resource  to  calculate  the

KPIs. The application uses machine-related postings to calculate the KPIs.

Order/finished article/batch number

If  you  select  the  evaluation  option  order,  the  application  identifies  the  BDE  postings  starting  within  the

selection period and matching the entered selection criteria order, finished article, batch number (from the

order  header).  If  necessary,  choose  a  selection  period  making  sure  that  the  required  BDE  postings

actually coincide with this period.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 18 von 24

KPI Monitoring / OEE (MOC)

The application compares these BDE postings and their periods with the machine-related postings. The

below  illustration  shows  an  example  of  how  BDE  and  MDE  postings  can  overlap.  The  yellow  areas

represent the result of this evaluation. MDE quantities and durations are calculated on a pro rata basis to

achieve the result.

If  several  orders  are  logged  on  to  the  machine  simultaneously,  this  evaluation  type  (select  one  of  the

options  order,  finished  article  or  batch  number)  assigns  the  full  machine  time  (yellow  area)  and  the

quantities  to  every  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a  proportionate

calculation.

The application only includes completed BDE postings. If the operation is still logged on to the

machine  when  you perform the evaluation, the time period between the  last logon and now  is

not  taken  into  account.  Therefore,  it  is  possible  that  differences  appear  between  the  machine

evaluation and the order-related evaluation. For this evaluation type (select one of the options

order, finished article,  batch number),  MPDV recommends selecting  data via the "shift" option

instead of the "time" option.

Resource/resource type

If  you  select  the  evaluation  option  resource,  the  application  restricts  the  selected  posting  records

integrated in the evaluation based on the logged in resources and/or the resources of a specific resource

type.  Then  the  application  compares  these  posting  records  with  the  machine-related  postings  as

described above.

OEE report detail application

The detail application OEE report refers to machine-related OEE performance data for a certain period of

time and number of workplaces.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 19 von 24

Master data category

The following workplace/ machine-related master data are available:

KPI Monitoring / OEE (MOC)

  Workplace

  Short name

  Name

  Group

  Cost center

  Company

Duration category

In  addition  to  master  data  and  the  below-mentioned  KPIs,  the  application  shows  the  following  data  in

tabular form:

  Planned operating time

  Machine runtime

  Actual utilization

  Yield utilization

How to calculate the individual KPIs is described further down in the document.

Key performance indicators category

The OEE is calculated as follows:

OEE = Availability x Performance x Quality

How to calculate the individual KPIs is described further down in the document.

Machine-related KPIs detail application

The  diagram  machine-related  KPIs  shows  the  following  KPIs  in  a  bar  chart  based  on  the  machines

selected in the table.

  OEE

  Availability

  Performance

  Quality

Group-related KPIs detail application

The  diagram  group-related  KPIs  shows  the  following  group-related  KPIs  in  a  bar  chart  based  on  the

machines selected in the table.

  OEE

  Availability

MDE-KMO_81.docx

Version: 1.0.8862

Seite 20 von 24

KPI Monitoring / OEE (MOC)

  Performance

  Quality

Basic data detail application

The detail application Basic data displays basic data in graphic format

  Planned operating time

  Machine run time

  Actual utilization

  Yield utilization

for each workplace selected in the tabular detail application.

Values are durations, X-axis labeling is carried out automatically.

Formulas

OEE

OEE = Availability x Performance x Quality

Availability

Availability  can  be  understood  as  a  performance  indicator  of  the  machine.  Like  the  OEE  itself,  it  is  a

number less than one. Use the following formula to calculate the productivity of a machine for a specific

period of time:

Formula: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)

Use the formula avail to customize the calculation. If the formula management does not include this

formula, you have to create the formula in order to change the calculation.

Performance

Use  the  following  formula  to  calculate  the  performance  of  a  machine  for  a  specific  period  of  time:

Use the ratio of RPA 11 to the number of recorded cycles to identify the actual cycle.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 21 von 24

11111RPARPAtyAvailabilicycleActualcycleetTePerformanc*arg

KPI Monitoring / OEE (MOC)

The target cycle is an arithmetically averaged value, as different target cycles can be used within

the selected period of time:

Cycles*: In case you could not collect cycles from the machine, calculate the cycles from the yield

(primary quantity unit) and the partitioning:

The application calculates the performance based on the MDE log records. The application uses

all  data  records  collected  with  the  status  "production"  (data  posted  on  RPA  11).  The  system

calculates  the  performance  for  each  log  record.  The  application  rates  these  individual

performance values in order to show a compressed view in evaluations. This rating is based on

the production time (RPA11).

Example of how to calculate the performance with six MDE log records:

Machine

RPA11 [sec]  Performance  Performance

(Product)

100

100

100

100

100

100

3600

2700

1800

2700

7200

1800

0.7

0.8

0.9

0.5

0.9

0.9

2520

2160

1620

1350

6480

1620

Total

19800

0.795

15750

MDE-KMO_81.docx

Version: 1.0.8862

Seite 22 von 24

*11CyclesRPAcycleActual11)11*arg(..argarg*RPARPAcycleetTarithDurationarithcycleetTcycleetTngPartitioniYieldCyclesimary/Pr*11Pr*RPAoductDURATIONePerformancePerformanc11PrRPAePerformancePerformancoduct

KPI Monitoring / OEE (MOC)

Use the formula pf_rat to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Quality

Quality represents the ratio of the produced yield to the total quantity (here: yield + scrap + rework + open

quantity). This KPI provides information about the material to be processed and the quality of the process.

Use the following formula to calculate the quality of a machine for a specific period of time:

Formula: yield.primary / (yield.primary + scrap.primary + rework.primary + problem.primary)

Use the formula qual to customize the calculation.

 If the formula management does not include this formula, you have to create the formula in order

to change the calculation.

NEE

In contrast to the OEE, NEE does not consider setup as a loss.

(𝑅𝑃𝐴11 +   𝑅𝑃𝐴7)
∑ 𝑅𝑃𝐴

1
11

∗ 𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 ∗ 𝑄𝑢𝑎𝑙𝑖𝑡𝑦

Formula: ((rpa11 + rpa7) /

(rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)) * performance * quality

Use  the  formula  nee  to  customize  the  calculation.  If  the  formula  management  does  not  include

this formula, you have to create the formula in order to change the calculation.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 23 von 24

imaryimaryimaryimaryimaryquantityOpenworkScrapYieldYieldQualityPrPrPrPrPr_Re

KPI Monitoring / OEE (MOC)

Planned operating time

Total runtime of the machine during the selected period of time (Sum RPA 1 ... 11)

Formula: (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11)

Use the formula op_ti to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Machine runtime

Main production time (RPA 11)

Formula: rpa11

Use the formula mchf_rt to customize the calculation.

 If the formula management does not include this formula, you have to create the formula in order

to change the calculation.

Actual utilization

Yield utilization * (Target cycle / Actual cycle)

Yield utilization * Performance

Formula:  rpa11  *  (yield.primary

/  (yield.primary  +  scrap.primary  +  rework.primary  +

problem.primary)) * performance_rate

Use the formula act_ut to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Yield utilization

Main production time * Quality

Formula:  rpa11  *  (yield.primary

/  (yield.primary  +  scrap.primary  +  rework.primary  +

problem.primary))

Use the formula yie_ut to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

MDE-KMO_81.docx

Version: 1.0.8862

Seite 24 von 24

