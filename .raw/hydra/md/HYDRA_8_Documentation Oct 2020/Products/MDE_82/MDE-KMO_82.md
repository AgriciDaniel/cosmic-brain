Manual

KPI Monitoring / OEE (MOC)
MDE-KMO 8.2

Version 1.0.23524

Last changes on: 06.10.2020

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

MDE-KMO_82.docx

Version: 1.0.23524

Page 2 of 27

KPI Monitoring / OEE (MOC)

Contents

1  Overview of KPI Monitor / OEE .................................................................... 4

2  Efficiency report ........................................................................................... 6

3  Performance profile .................................................................................... 13

4  OEE report ................................................................................................. 20

MDE-KMO_82.docx

Version: 1.0.23524

Page 3 of 27

KPI Monitoring / OEE (MOC)

1  Overview of KPI Monitor / OEE

Purpose

Use the function package KPI monitor/OEE to evaluate the data collected in the MDE module (quantities,

times) over different periods and relating to defined key figures.

Implementation notes

Use the function package if you want to:

  monitor and assess the performance of specific machines, machine groups or departments using

KPIs.

  monitor and assess the performance of specific machines, machine groups or departments using

the "Overall Equipment Effectiveness" (OEE).

Integration

The function uses the times and quantities collected in BDE or MDE to display the order progress.

Features

  Efficiency report

o  Efficiency report on quantities and times for all machines over specific periods and shifts

o  Distribution  graph  showing  the  rate  of  capacity  utilization  (utilization  efficiency),  scrap

rate, technical efficiency and assignment utilization rate (allocation efficiency) for several

machines

  Performance profile

o  Evaluations  on  occupancy  time,  machine  work  time,  assignment  utilization  rate

(allocation efficiency) and technical efficiency

  OEE report

o  Tabular  evaluation  of  the  "Overall  Equipment  Effectiveness“  (OEE)  to  analyze  the  key

performance indicators productivity, quality and effectiveness for all machines. Graphical

display of the OEE and its components.

o  Distribution graph showing the OEE and its components for multiple machines.

o  Tabular or graphical displays using bar or pie charts.

o  Views of the top ten key performance indicators

  OEE profile

o  Tabular  and  shift-based  evaluation  of  the  "Overall  Equipment  Effectiveness“  (OEE)  to

analyze  the  key  performance  indicators  productivity,  quality  and  effectiveness  for  all

machines. Graphical display of the OEE and its components.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 4 von 27

o  Tabular or graphical displays using bar charts.

KPI Monitoring / OEE (MOC)

MDE-KMO_82.docx

Version: 1.0.23524

Seite 5 von 27

KPI Monitoring / OEE (MOC)

2  Efficiency report

Overview

Menu

Production facility management   Key performance indicators  Efficiency
report

Transaction code

effrp

Function authorization

effrp

The  report  includes  workplace/machine-related  performance  data  for  a  specific  period  of  time  and  a

specific number of workplaces. The result depends on the selections made and therefore on the selection

criteria  available  in  the  selection  panel.  The  performances  regarding  quantities  and  durations  are

displayed in a graphic. The production controller gets a quick and clear overview of the performances.

Selection criteria

The application provides the following selection criteria:

Workplace

This  selection  criterion  refers  to  the  workplace  in  the  machine  or  workplace  master  data.  You  can  also

use wildcards (placeholders *).

Group

This  selection  criterion  refers  to  the  group  in  the  machine  or  workplace  master  data.  The  application

shows all machines or workplaces that are assigned to the selected group. You can also use wildcards.

Date from ... to ...

Fill in the fields from/to to narrow down the period to be evaluated

Shift / time

Restrict the defined period (date from/to). Select shifts or specify a time (from - until).

Report group

This selection criterion refers to the report groups. The application shows all machines or workplaces that

are assigned to the selected report group.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master  data.  The

application shows all machines or workplaces that are assigned to the selected company.  You can also

use wildcards.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 6 von 27

KPI Monitoring / OEE (MOC)

Responsibility area

This selection criterion refers to the responsibility area in the machine master data. Note: The user can

only view those machines that are included in the responsibility areas that are assigned to the user.

Short name

This  selection  criterion  refers  to  the  short  designation  of  machines  in  the  master  data.  The  application

shows all machines or workplaces matching the entered string. You can also use wildcards.

Cost center

This selection criterion refers to the cost center stored in the machine or in the workplace master data. All

machines  or  workplaces  are  displayed  that  are  assigned  to  the  selected  cost  center.  You  can  also  use

wildcards.

Designation

This field refers to the name of machines and workplaces defined in the machine master data. Only those

machines are displayed that are identical to the entered string. You can also use wildcards (placeholders

*).

Counter type

In  the  detail  application  "Consumption  figures",  you  can  select  the  counters  to  be  displayed  using  the

counter type as defined within the counter configuration of the machine. To use this detail application, you

require the relevant license.

Selection options

No selection:

If you enable this option, you cannot select the other selection criteria (order and

resource).

Order:

You can use order parameters to restrict the data.

Resource:

You can use resource parameters to restrict the data.

Order/Final article/Batch number

If you select these options, the application only includes completed ADE postings. If the order is currently

still running on the machine, the system does not take into account the time period between the last logon

and now. Therefore it is possible that differences appear between the machine evaluation and the order-

related evaluation. The application only includes ADE postings that coincide with the evaluation period. If

necessary,  choose  a  selection  period  making  sure  that  the  required  ADE  postings  coincide  with  this

period. For this order-related evaluation, MPDV recommends selecting data via the "shift" option instead

of the "time".

The order number, article/item or the batch (from the order header) may be used as selection criteria.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 7 von 27

The illustration below shows an example of how ADE and MDE postings can overlap. The ADE postings

take priority  in this evaluation type. The  yellow areas show the result of this evaluation. MDE quantities

and durations are calculated on a pro rata basis to achieve the result.

KPI Monitoring / OEE (MOC)

If  several  orders  are  logged  on  to  the  machine  simultaneously,  this  evaluation  type  (select  one  of  the

options order, final article or batch number) assigns the full machine time (yellow area) and quantities to

every order. The fact that orders are run in parallel will not result in a proportionate calculation.

Long-term data

If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system  applies  the

implicit solution and selects the medium-term data area as well. Therefore, there is no need for

an explicit activation in order to be able to access the medium-term data set.

Resource/Resource type

Restrict the selected posting records integrated in the evaluation by selecting the logged in resources or

resources of a specific resource type.

Detail application Efficiency report

The  detail  application  Efficiency  report  includes  workplace/machine-related  performance  data  for  a

specific  period  of  time  and  a  specific  number  of  workplaces.  The  result  depends  on  the  selection  and

therefore on the selection criteria available in the selection panel.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 8 von 27

Category Workplace

The following workplace/machine-related master data are available:

KPI Monitoring / OEE (MOC)

  Workplace

  Short name

  Designation

  Group

  Cost center

  Company

Category Primary quantity, Secondary quantity, Tertiary quantity, Basic quantity

Workplace/machine-related quantities recorded in the corresponding quantity types

  Yield

  Scrap

  Rework

  Open quantity

or the relevant quantity units (if relevant in the customer system).

Category Durations

  Production = RPA11

  Downtime = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

Category Cycles

  Number of posted cycles

MDE-KMO_82.docx

Version: 1.0.23524

Seite 9 von 27

KPI Monitoring / OEE (MOC)

Category Key figures

  Rate

of

capacity

utilization

The  rate  of  capacity  utilization  is  the  quotient  deriving  from  effective  run  time  and  machine  working

time.

Rate of capacity utilization = 100 / (RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07

+ RPA08 + RPA09 + RPA10 + RPA11) * RPA11

Formula definition: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11) * 100

Use  the  formula  rcu  to  customize  the  calculation.  If  the  formula management  does  not  include  this

formula, then you have to create the formula in order to change the calculation.

  Assignment utilization rate:

The assignment utilization rate represents the relationship deriving from the effective run time (main

utilization time) and the adjusted machine operation time (i.e. without planned downtimes).

Assignment utilization rate = 100 / (total of RPA 1 to RPA 11 minus RPA 6) * RPA 11

Formula definition: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa7+rpa8+rpa9+rpa10+rpa11) *100

Use the formula ocu to customize the calculation. If the formula management does not  include this

formula, then you have to create the formula in order to change the calculation.

  Efficiency

(efficiency

is  only  available  when

combined  with

the

"lines"

license)

Efficiency  is  the  quotient  derived  from  the  effective  run  time  and  the  general  run  time, meaning  the

sum total of the effective run time and any interruptions as a result of machine-related disturbances or

unscheduled  shutdowns.  Any  other  disturbances,  e.g.  organization-related  disturbances,  are  not

taken into account here.

Efficiency = 100 / (RPA02 + RPA05 + RPA11) * RPA11

  Techn. efficiency

The  reference  value  for  the  technical  efficiency  is  the  sum  total  of  the  effective  run  time  and

interruptions  because  of  technical  (machine-related)  disturbances.  Other  interruptions  (e.g.  of  a

organizational nature) are not considered: Techn. efficiency = 100 / (RPA02 + RPA11) * RPA11

Formula definition: rpa11 / (rpa2 + rpa11) * 100

Use the formula tec_ef to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 10 von 27

KPI Monitoring / OEE (MOC)

  Rate = 100 / ((yield (primary quantity) + scrap (primary quantity)) * rework (primary quantity) + open

quantity (primary quantity)) * yield (primary quantity)

Formula  definition:  yield.primary

/

(yield.primary  +  scrap.primary  +

rework.primary  +

problem.primary) * 100

Use the formula yie_ra to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

  Scrap rate = 100 / ((yield (primary quantity) + scrap (primary quantity) + rework (primary quantity) +

open quantity (primary quantity)) * scrap (primary quantity)

Formula  definition:  scrap.primary

/

(yield.primary  +  scrap.primary  +

rework.primary  +

problem.primary) * 100

Use the formula scr_ra to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

Note:

If  you  select  the  "time"  option,  the  application  only  includes  those  MDE  log  records  that  are

completely  within  the  selected  period  (start  and  end  must  be  within  the  selected  period),  that

extend into the selected period (start or end is within the time frame) or that cover the complete

selection period.

If  you select the current shift where no  MDE  log records have  been posted  yet,  the quantities

produced within the selected period of time are calculated proportionally.

Example: At  10:00 am,  you select an evaluation of the current shift  from 8:00 to 9:00 am and

the machine has the status production since 8:00 am. To calculate the recorded quantity in the

selected period of time, the quantity produced since 8:00 (until 10:00) (1200 pieces) is divided

according to the following formula:

((produced yield / complete duration of the current status in seconds) * evaluation duration)

In  this  example  it  is:  (1200  /  7200)  *  3600  =  600  pieces.  The  efficiency  report  will  show  a

produced quantity of 600 pieces.

This  proportionate  calculation  can  have  the  effect  that  evaluated  quantities  can  change  within

the current shift even if the selection parameters have not changed.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 11 von 27

KPI Monitoring / OEE (MOC)

Detail application Quantitative activities (machine-related)

This detail application generates a graphic presentation of the quantities for the workplaces selected in

the tabular detail application. Here, a differentiation is made by yield, scrap, rework and open quantity.

This  detail  application  and  the  detail  application  Quantity  rate  (group-related)  are  docked  one

behind the other.

Detail application Quantity rate (group-related)

This  chart  shows,  based  on  the  selected  entries  in  the  table,  the  relationship  between  the  quantities  -

yield, scrap, rework and open quantities. The information is displayed by group/ added total by workplace

group.

This  detail  application  and  the  detail  application  Quantitative  activities  (machine-related)  are

docked one behind the other.

Detail application Durations

This detail application generates a graphic illustration of the selected data from the efficiency report detail

application. The durations are shown, broken down by RPA accounts (RPA01... RPA12).

You can hover the mouse over the graphic to display the value of the area where the mouse is. You can

switch between displaying the value in percent or in duration.

Detail application Consumption figures

Shows  the  master  data  and  counter  values  of  the  machine  counters  configured  for  the  machines.  By

selecting the counter type, the data displayed can be limited to e.g. consumption figures or yield counters,

or similar.

This detail application is only available if the system is configured accordingly and the relevant

licenses are available.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 12 von 27

KPI Monitoring / OEE (MOC)

3  Performance profile

Overview

Menu

Production
Performance profile

facility  management    Key  performance

indicators  

Transaction code

effpf

Function authorization

effpf

The  Performance  profile  application  provides  a  tabular  and  graphic  presentation  of  the  production

performance  interrelationships.  The  collected  performance  data  is  compressed  to  days  and  shifts.  This

way,  the  application  can  provide  indispensable  production  KPIs  for  all  persons  in  a  position  of

responsibility. This application provides a clear overview of all quantities and durations that are necessary

to reliably assess the production status.

Selection criteria

The application provides the following selection criteria:

Workplace

This  selection  criterion  refers  to  the  workplace  in  the  machine  or  workplace  master  data.  You  can  also

use wildcards (placeholders *).

Group

This  selection  criterion  refers  to  the  group  in  the  machine  or  workplace  master  data.  The  application

shows all machines or workplaces that are assigned to the selected group. You can also use wildcards.

Date from ... to ...

Fill in the fields from/to to restrict the period to be evaluated

Shift / time

Restrict the defined period (date from/to). Select shifts or specify a time (from - until).

Report group

This  selection  criterion  refers  to  the  report  groups.  The  application  shows  all  workplaces/machines

assigned to the selected report group.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master  data.  The

application shows all machines or workplaces that are assigned to the selected company. You can also

use wildcards.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 13 von 27

KPI Monitoring / OEE (MOC)

Responsibility area

This selection criterion refers to the responsibility area in the machine master data. Note: The user can

only view those machines that are included in the responsibility areas that are assigned to the user.

Short name

This  selection  criterion  refers  to  the  short  designation  of  machines  in  the  master  data.  The  application

shows all machines or workplaces matching the entered string. You can also use wildcards.

Cost center

This selection criterion refers to the cost center stored in the machine or in the workplace master data. All

machines  or  workplaces  are  displayed  that  are  assigned  to  the  selected  cost  center.  You  can  also  use

wildcards.

Name (designation)

This  field  refers  to  the  name  of  machines  and  workplaces  defined  in  the  machine  master  data.  The

application  only  shows  those  machines  matching  the  entered  string.  You  can  also  use  wildcards

(placeholders *).

Selection options

No selection:

If you enable this option, you cannot select the other selection criteria (order and

resource).

Order:

You can use order parameters to restrict the data.

Resource:

You can use resource parameters to restrict the data.

Order/final article/batch number

If you select these options, the application only includes completed ADE postings. If the order is currently

still running on the machine, the system does not take into account the time period between the last logon

and now. Therefore it is possible that differences appear between the machine evaluation and the order-

related evaluation. The application only includes ADE postings that coincide with the evaluation period. If

necessary,  choose  a  selection  period  making  sure  that  the  required  ADE  postings  coincide  with  this

period. For this order-related evaluation, MPDV recommends selecting data via the "shift" option instead

of the "time".

The order number, article/item or the batch (from the order header) may be used as selection criteria.

The illustration below shows an example of how ADE and MDE postings can overlap. The ADE postings

take priority  in this evaluation type. The  yellow areas show the result of this evaluation. MDE quantities

and durations are calculated on a pro rata basis to achieve the result.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 14 von 27

KPI Monitoring / OEE (MOC)

If  several  orders  are  logged  on  to  the  machine  simultaneously,  this  evaluation  type  (select  one  of  the

options order, final article or batch number) assigns the full machine time (yellow area) and quantities to

every order. The fact that orders are run in parallel will not result in a proportionate calculation.

If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system  applies  the

implicit solution and selects the medium-term data area as well. Therefore, there is no need for

an explicit activation in order to be able to access the medium-term data set.

Resource/resource type

Restrict the selected posting records integrated in the evaluation by selecting the logged in resources or

resources of a specific resource type.

Group result

Use this selection criterion to group the results according to the following parameters:

  Year

  Month

  Calendar week

  Date

  Shift date and shift

MDE-KMO_82.docx

Version: 1.0.23524

Seite 15 von 27

KPI Monitoring / OEE (MOC)

Performance profile detail application

The  performance  profile  of  machine-related  performance  data  is  presented  for  a  specific  period  of  time

and  a  certain  number  of  workplaces.  The  result  depends  on  the  selection  made  and  therefore  on  the

selection criteria available in the selection panel.

Date category

Depending  on  the  selection  of  the  option  "Group  results"  in  the  selection  panel,  the  columns  are

completed as shown below (the columns that are not listed for the respective selection remain empty):

  Select shift date and shift: the application shows the year, calendar week number, month, shift date,

shift.

  Select date: the application shows the year, calendar week number, month, shift date.

  Select week: the application shows the year, calendar week number.

  Select month: the application shows the year, month.

  Select year: the applications shows the year.

Primary quantity, secondary quantity, tertiary quantity, basic quantity category

Workplace/ machine-related quantities recorded in the corresponding quantity types

  Yield

  Scrap

  Rework

  Open quantity

or the relevant quantity units (if relevant in the customer system).

Durations category

  Production = RPA11

  Downtime = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

MDE-KMO_82.docx

Version: 1.0.23524

Seite 16 von 27

KPI Monitoring / OEE (MOC)

Key figures category

  Rate

of

capacity

utilization

The  rate  of  capacity  utilization  is  the  quotient  deriving  from  effective  run  time  and  machine  working

time.

Rate of capacity utilization = 100 / (RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07

+ RPA08 + RPA09 + RPA10 + RPA11) * RPA11

Formula definition: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa6+rpa7+rpa8+rpa9+rpa10+rpa11) * 100

Use  the  formula  rcu  to  customize  the  calculation.  If  the  formula management  does  not  include  this

formula, then you have to create the formula in order to change the calculation.

  Assignment utilization rate:

The assignment utilization rate represents the relationship deriving from the effective run time (main

utilization time) and the adjusted machine operation time (i.e. without planned downtimes).

Assignment utilization rate = 100 / (total of RPA 1 to RPA 11 minus RPA 6) * RPA 11

Formula definition: rpa11 / (rpa1+rpa2+rpa3+rpa4+rpa5+rpa7+rpa8+rpa9+rpa10+rpa11) *100

Use the formula ocu to customize the calculation. If the formula management does not  include this

formula, then you have to create the formula in order to change the calculation.

  Efficiency

(efficiency

is  only  available  when

combined  with

the

"lines"

license)

Efficiency  is  the  quotient  derived  from  the  effective  run  time  and  the  general  run  time, meaning  the

sum total of the effective run time and any interruptions as a result of machine-related disturbances or

unscheduled  shutdowns.  Any  other  disturbances,  e.g.  organization-related  disturbances,  are  not

taken into account here.

Efficiency = 100 / (RPA02 + RPA05 + RPA11) * RPA11

  Techn. efficiency

The  reference  value  for  the  technical  efficiency  is  the  sum  total  of  the  effective  run  time  and

interruptions  because  of  technical  (machine-related)  disturbances.  Other  interruptions  (e.g.  of  a

organizational nature) are not considered: Techn. efficiency = 100 / (RPA02 + RPA11) * RPA11

Formula definition: rpa11 / (rpa2 + rpa11) * 100

Use the formula tec_ef to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 17 von 27

KPI Monitoring / OEE (MOC)

  Rate = 100 / ((yield (primary quantity) + scrap (primary quantity) + rework quantity (primary quantity)

+ open quantity (primary quantity)) * yield (primary quantity).

Formula  definition:  yield.primary

/

(yield.primary  +  scrap.primary  +

rework.primary  +

problem.primary) * 100

Use the formula yie_ra to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

  Scrap rate = 100 / ((yield (primary quantity) + scrap (primary quantity)) * scrap (primary quantity)

Formula  definition:  scrap.primary

/

(yield.primary  +  scrap.primary  +

rework.primary  +

problem.primary) * 100

Use the formula scr_ra to customize the calculation. If the formula management does not include this

formula, then you have to create the formula in order to change the calculation.

Quantities detail application

This chart shows, based on the selected entries in the table, the relationship between the quantities.

Depending  on  the  option  "group  result",  that  you  have  enabled  in  the  selection  range,  the  values  are

displayed per

  Shift/shift date (select shift date and shift)

  Shift date (select shift date)

  Calendar week (select calendar week)

  Month (select month)

  Year (select year)

You can use the "Displayed series" combo box to select which quantities you would like to have displayed

(e.g. only yield and scrap).

Durations detail application

The  durations  detail  application  shows,  based  on  the  selected  entries  in  the  table,  the  relationship

between  the  production  duration  and  downtime.  Depending  on  the  option  "group  result",  that  you  have

enabled in the selection range, the values are displayed per

  Shift/shift date (select shift date and shift)

MDE-KMO_82.docx

Version: 1.0.23524

Seite 18 von 27

KPI Monitoring / OEE (MOC)

  Shift date (select shift date)

  Calendar week (select calendar week)

  Month (select month)

  Year (select year)

This detail application is docked right behind the key figures detail application.

Key figures detail application

The key figures detail application shows, based on the selected entries in the table, the efficiency or the

technical efficiency, assignment utilization rate, rate, scrap rate or the rate of capacity utilization in graphic

form.

Select  the  relevant  key  figure  from  the  combo  box.  If  no  key  figure  is  selected,  the  rate  of  capacity

utilization is shown.

Depending on the option "group result", that you have enabled in the selection range, the key figures are

displayed per

  Shift/shift date (select shift date and shift)

  Shift date (select shift date)

  Calendar week (select calendar week)

  Month (select month)

  Year (select year)

The key figure in the label (if activated) is displayed to the second decimal place.

This detail application is docked right behind the durations detail application.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 19 von 27

KPI Monitoring / OEE (MOC)

4  OEE report

Overview

Menu

Production facility/resource management --> Key performance indicators -->
OEE report

Transaction code

oeerp

Function authorization

oeerp

The report concerns machine-related OEE performance data for a certain period of time and number of

workstations. The result depends on the selections made and therefore on the selection criteria available

in  the  selection  panel.  This  report  lists  meaningful  data  in  tabular  form  and  provides  vital  information  in

graphic layouts. This makes it a useful tool for all users.

The application uses machine-related postings to calculate KPIs.

Selection criteria

The application provides the following selection criteria:

Workplace

The selection criterion workplace refers to the workplace in the machine or workplace master data. You

can also use wildcards (placeholders *).

Group

The selection criterion group refers to the group in the machine or workplace master data. The application

shows  all  machines  and/or  workplaces  that  are  assigned  to  the  selected  group.  You  can  also  use

wildcards (placeholders *).

Date from ... to ...

The selection criterion date from ... to ... restricts the period you want to evaluate.

Shift / time

Use the selection criterion shift and/or time to further restrict the specified period (date from ... to ...). To

do so, select a shift or specify a time (from ... until...). If the selection period exceeds the period for the

online data area, the system automatically selects the medium-term data area.

Report group

The  selection  criterion  Report  group  refers  to  the  report  groups.  The  application  shows  all  machines  or

workplaces that are assigned to the selected report group.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 20 von 27

KPI Monitoring / OEE (MOC)

Company

The selection criterion company refers to the company defined in the machine or workplace master data.

The application shows all machines or workplaces that are assigned to the selected company. You can

also use wildcards (placeholders *).

Responsibility area

The  selection  criterion  responsibility  area  refers  to  the  responsibility  area  in  the  machine  master  data.

Note that you can only view those machines you are authorized for (responsibility area).

Short name

The  selection  criterion  short  name  refers  to  the  short  name  of  machines  in  the  master  data.  The

application  shows  all  machines  or  workplaces  matching  the  entered  string.  You  can  also  use  wildcards

(placeholders *).

Cost center

The  selection  criterion  cost  center  refers  to  the  cost  center  stored  in  the  machine  or  workplace  master

data.  The  application  shows  all  machines  or  workplaces  that  are  assigned  to  the  selected  cost  center.

You can also use wildcards (placeholders *).

Name (designation/description)

The field name refers to the name of machines and workplaces defined in the machine master data. This

field only shows the machines matching the entered string. You can also use wildcards (placeholders *).

Selection options

No selection:

If  you choose this field,  you cannot select the other selection criteria (order and

resource).

Order:

Use order parameters to restrict the data.

Resource:

Use resource parameters to restrict the data.

If  you  check  one  of  the  options  "order"  or  "resource",  the  application  calculates  the  KPIs  (key

performance  indicators)  based  on  the  machine-related  postings  that  occurred  while  an  order

and/or  resource  was  logged  on.  The  application  does  not  use  the  data  posted  onto  the  order

and/or  resource  to  calculate  the  KPIs.  The  application  uses  machine-related  postings  to

calculate KPIs.

Order/Final article/Batch number

If  you  select  the  evaluation  option  order,  the  application  identifies  the  BDE  postings  starting  within  the

selection period and matching the entered selection criteria order, finished article, batch number (from the

order  header).  If  necessary,  choose  a  selection  period  making  sure  that  the  required  BDE  postings

actually coincide with this period.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 21 von 27

KPI Monitoring / OEE (MOC)

The application compares these BDE postings and their periods with the machine-related postings. The

illustration below shows an example of how BDE and MDE postings can overlap. The yellow areas show

the result of this evaluation. MDE quantities and durations are calculated on a pro rata basis to achieve

the result.

If  several  orders  are  logged  on  to  the  machine  simultaneously,  this  evaluation  type  (select  one  of  the

options order, final article or batch number) assigns the full machine time (yellow area) and quantities to

every order. The fact that orders are run in parallel will not result in a proportionate calculation.

The application only integrates completed BDE postings. If the operation is still logged on to the

machine  when  you perform the evaluation, the time period between the  last logon and now  is

not  taken  into  account.  Therefore,  differences  might  appear  between  the  machine  evaluation

and  the  order-related  evaluation.  For  this  evaluation  type  (select  one  of  the  options  order,

finished article, batch number), MPDV recommends selecting data via the "shift" option instead

of the "time" option.

Resource/Resource type

If  you  select  the  evaluation  option  resource,  the  application  restricts  the  selected  posting  records

integrated in the evaluation based on the logged in resources and/or the resources of a specific resource

type.  Then  the  application  compares  these  posting  records  with  the  machine-related  postings  as

described above.

OEE report detail application

The detail application OEE report refers to machine-related OEE performance data for a certain period of

time and number of workplaces.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 22 von 27

Master data category

The following workplace/machine-related master data are available:

KPI Monitoring / OEE (MOC)

  Workplace

  Short name

  Name (designation/description)

  Group

  Cost center

  Company

Category durations

In  addition  to  master  data  and  the  below-mentioned  KPIs,  the  application  shows  the  following  data  in

tabular form:

  Planned operating time

  Machine runtime

  Actual utilization

  Yield utilization

Refer to the document dealing with OEE calculation for further information on the calculation options.

Category Key figures

The OEE is calculated as follows:

OEE = Availability x Performance x Quality

Refer to the document dealing with OEE calculation for further information on the calculation options.

Total line detailed application OEE report

The total line for the categories durations and cycles totals the values of these categories.

The  total  line  of  the  category  KPIs,  on  the  other  hand,  does  not  provide  a  total  but  an  average  and  is

calculated differently from the standard average (sum of all values divided by number).

MDE-KMO_82.docx

Version: 1.0.23524

Seite 23 von 27

KPI Monitoring / OEE (MOC)

Example:

MDE posting records

Machine

50611
50611
50611
Total
50614
50614
50614

Total

Strok
es
4163
150
1613

953
514
2360

Yield

Scrap

24180
0
0
24180
22500
0
0
22500
46680

360
584
0
944
4980
2044
0
7024
7968

Target
cycle
4468
4968
4468

6984
6984
7500

Target cycle per
1
4.468
4.968
4.468

6.984
6.984
7.500

RPA

11
3
11

11
3
11

Duratio
n
20188
789
7823

7171
3863
17766

OEE calculation Machine 50611:

Key

Formula

Calculation

Result

Performance

Indicator

Quality

𝑌𝑖𝑒𝑙𝑑
𝑌𝑖𝑒𝑙𝑑 + 𝑆𝑐𝑟𝑎𝑝 + 𝑂𝑝𝑒𝑛 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 + 𝑅𝑒𝑤𝑜𝑟𝑘

24180 / (24180+944)

0.96

Availability

∑ 𝑅𝑃𝐴 11
∑(𝑅𝑃𝐴1−11)

(20188+7823)/(20188+789+7823)

0.97

Performance

𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 =

Target cycle
Actual cycle

Actual cycle  =

∑ RPA 11
∑ 𝑆𝑡𝑟𝑜𝑘𝑒

4.468/(7823/1613) = 0.921

0.92

0.921 *7823 = 7207.748

The  individual  performance  values  are  weighted  in

4.468/(20188/4163) = 0.921

order  to  show  a  consolidated  view  of  the  evaluations.

0.921 *20188 = 18600.284

Weighting

(Performance 𝑃𝑟𝑜𝑑𝑢𝑐𝑡)

is  based  on

production time (RPA11).

𝑷𝒆𝒓𝒇𝒐𝒓𝒎𝒂𝒏𝒄𝒆𝑷𝒓𝒐𝒅𝒖𝒄𝒕   = 𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 ∗  RPA 11

The

values  of

the

summarized  performance

(7207.748 +18600.284) /

(7823+20188) = 0.921

(Performance 𝑃𝑟𝑜𝑑𝑢𝑐𝑡)
summation by the sum of the production time (RPA11)

divided

after

are

the

MDE-KMO_82.docx

Version: 1.0.23524

Seite 24 von 27

KPI Monitoring / OEE (MOC)

to get the corresponding performance.

𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞  =

∑ 𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 𝑃𝑟𝑜𝑑𝑢𝑐𝑡
∑ 𝑅𝑃𝐴 11

OEE

Quality*  Availability * Performance

0.96 * 0.97 * 0.92

0.86

OEE calculation Machine 50614:

Key

Formula

Calculation

Result

Performance

Indicator

Quality

𝑌𝑖𝑒𝑙𝑑
𝑌𝑖𝑒𝑙𝑑 + 𝑆𝑐𝑟𝑎𝑝 + 𝑂𝑝𝑒𝑛 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 + 𝑅𝑒𝑤𝑜𝑟𝑘

22500 / (22500 + 7024)

0.76

Availability

∑ 𝑅𝑃𝐴11
∑(𝑅𝑃𝐴1−11)

(7171+17766)/

(7171+3863+17766)

0.87

Performance

𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 =

Target cycle
Actual cycle

Actual cycle  =

∑ RPA 11
∑ 𝑆𝑡𝑟𝑜𝑘𝑒

6.984/(7171/953) = 0.9281

0.98

0.9281 * 7171 = 6655.752

The  individual  performance  values  are  weighted  in

7.500/(17766/2360) = 0.9962

order  to  show  a  consolidated  view  of  the  evaluations.

0.9962 *17766 = 17700

Weighting

(Performance 𝑃𝑟𝑜𝑑𝑢𝑐𝑡)

is

based

on

production time (RPA11).

𝑷𝒆𝒓𝒇𝒐𝒓𝒎𝒂𝒏𝒄𝒆𝑷𝒓𝒐𝒅𝒖𝒄𝒕   =  𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 ∗  RPA 11

The

values  of

the

summarized  performance

(𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝑃𝑟𝑜𝑑𝑢𝑐𝑡)  are  divided  after  the  summation
by  the  sum  of  the  production  time  (RPA11)  to  get  the

corresponding performance.

𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞  =

∑ 𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝑃𝑟𝑜𝑑𝑢𝑐𝑡
∑ 𝑆𝑡𝑟𝑜𝑘𝑒 11

(6655.752

+

17700)

/

(7171+17766) = 0.98

OEE

Quality*  Availability * Performance

0.96 * 0.97 * 0.92

0.86

OEE calculation of the total line

Key

Formula

Calculation

Result

Performance

Indicator

Quality

𝑌𝑖𝑒𝑙𝑑
𝑌𝑖𝑒𝑙𝑑 + 𝑆𝑐𝑟𝑎𝑝 + 𝑂𝑝𝑒𝑛 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 + 𝑅𝑒𝑤𝑜𝑟𝑘

(22500+24180)  /  (22500  +  7024

0.85

+ 24180 + 944)

Availability

∑ RPA11
∑(𝑅𝑃𝐴1−11)

(7171+17766+20188+7823)/

0.92

(7171+3863+17766+20188+789+

7823)

MDE-KMO_82.docx

Version: 1.0.23524

Seite 25 von 27

KPI Monitoring / OEE (MOC)

Performance

𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 =

Target cycle
Actual cycle

Actual cycle  =

∑ RPA 11
∑ 𝑆𝑡𝑜𝑘𝑒

The  individual  performance  values  are  weighted  in

6.984/(7171/953) = 0.9281

0.95

0.9281 * 7171 = 6655.752

7.500/(17766/2360) = 0.9962

0.9962 *17766 = 17700

order  to  show  a  consolidated  view  of  the  evaluations.

4.468/(7823/1613) = 0.921

Weighting (𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝑃𝑟𝑜𝑑𝑢𝑐𝑡) is based on production
time (RPA11).

𝑷𝒆𝒓𝒇𝒐𝒓𝒎𝒂𝒏𝒄𝒆𝑷𝒓𝒐𝒅𝒖𝒄𝒕   =  𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞 𝐑𝐏𝐀*

The

values  of

the

summarized  performance

(𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒𝑃𝑟𝑜𝑑𝑢𝑐𝑡)  are  divided  after  the  summation
by  the  sum  of  the  production  time  (RPA11)  to  get  the

corresponding performance.

𝐏𝐞𝐫𝐟𝐨𝐫𝐦𝐚𝐧𝐜𝐞  =

∑ 𝑃𝑒𝑟𝑓𝑜𝑟𝑚𝑎𝑛𝑐𝑒 𝑃𝑟𝑜𝑑𝑢𝑐𝑡
∑ 𝑅𝑃𝐴 11

0.921 *7823 = 7207.748

4.468/(20188/4163) = 0.921

0.921 *20188 = 18600.284

(6655.752 + 17700 + 7207.748

+18600.284) /

(7171+17766+7823+20188) =

0.947

OEE

Quality*  Availability * Performance

0.85 * 0.92 * 0.95

0.74

OEE display in the MOC for the above example:

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

MDE-KMO_82.docx

Version: 1.0.23524

Seite 26 von 27

KPI Monitoring / OEE (MOC)

  OEE

  Availability

  PerformanceQualityBasic data detail application

The detail application Basic data displays basic data in graphic format:

  Planned operating time

  Machine run time

  Actual utilization

  Yield utilization

This application shows basic data for each workplace selected in the tabular detail application.

Values are durations, X-axis labeling is carried out automatically.

MDE-KMO_82.docx

Version: 1.0.23524

Seite 27 von 27

