Manual

Controlling Machine Data
MDE-CMD 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Controlling Machine Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-CMD_82.docx

Version: 1.1.23049

Page 2 of 46

Controlling Machine Data

Contents

1  Overview: Machine Data Controlling ............................................................ 4

2  Status Report, Machine-Related .................................................................. 6

3  Status Report ............................................................................................. 11

4  Status Profile .............................................................................................. 16

5  Status Ranking List .................................................................................... 20

6  ABC Analysis ............................................................................................. 22

7  Minor/Major Stops ...................................................................................... 25

8  Status Class Report ................................................................................... 28

9  Status Class Profile .................................................................................... 32

10  RPA Report ................................................................................................ 36

11  PRA Profile ................................................................................................. 40

12  Status Analysis ........................................................................................... 44

MDE-CMD_82.docx

Version: 1.1.23049

Page 3 of 46

Controlling Machine Data

1  Overview: Machine Data Controlling

Purpose

Machine Data Controlling  provides the ability to evaluate  data collected  in the  system as concerns how

recorded durations are distributed to  various time accounts. It  also analyzes any statuses that  occurred

with respect to the duration and number of occurrences.

Implementation notes

You use the function package if:

  You  would  like  to  assess  downtimes  /  statuses  of  separate  machines  or  machine  groups  over

selected time periods.

  You  would  like  to  evaluate  status  classes  for  a  selected  machine  or  group  of  machines  over

selected time periods or shifts.

  You  would  like to  evaluate the time accounts of a selected machine  or group of machines over

selected time periods or shifts.

Integration

The system accesses the times and quantities entered and statuses posted in MDE to display data.

Features

  Status report (workplace/machine-related)

o  Tabular downtime / status assessment of separate machines over selected time periods.

Graphical  comparison  of  production  times  and  downtimes.  Graphical  presentation  of  a

machine  ranking  list  showing  the  machines  with  either  the  longest  or  the  most

downtimes.

  Status report

o  Tabular downtime / status evaluation of a selected machine or group of machines across

selected time periods or shifts. Graphical comparison of production times and downtimes.

Graphical  presentation  of  a  status  ranking  list  showing  the  longest  or  the  most

downtimes.

  Status class report

o  Tabular  and  graphical  status  class  evaluation  of  a  selected  machine  or  group  of

machines over selected time periods or shifts.

  RPA report

o  Tabular and graphical RPA evaluation of a selected machine or group of machines over

selected time periods or shifts.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 4 von 46

Controlling Machine Data

  Status profile

o  Chronological  evaluations  of  status  /  downtimes  of  separate  machines  or  machine

groups. Presentation of data in table and pivot table form. Data evaluation in pivot table

based on various criteria. Graphical data presentation in pivot table form.

  Status class profile

o  Chronological  evaluations  of  status  classes  for  separate  machines  or  machine  groups.

Presentation of data in table and pivot table form. Data evaluation in pivot table based on

various criteria. Graphical presentation of data in pivot table form.

  RPA profile

o  Evaluation  of  resource  performance  accounts  of  separate  machines  or  machine  groups

in tabular and graphical form.

  Status analysis

o  Evaluation  of  status  /  downtimes  using  a  pivot  table.  Definition  of  the  pivot  table

presentation based on various criteria. Graphical presentation (bar chart).

  Status hit list

o  Table  showing  cumulative  times  over  a  time  period  for  active  machine  statuses,  each

sorted by duration and restricted to the x longest durations.

  Minor/major stops

o  Table  showing  cumulative  times  over  a  time  period  for  active  workplace  /  machine

statuses, broken down into short (minor) and long (major) statuses.

  ABC analysis

o  Table  showing  cumulative  times  over  a  time  period  for  active  workplace  /  machine

statuses, categorized into three ABC classes, each depending on the relationship of the

durations in percent. Drill-down option used to list separate status times in a detail table.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 5 von 46

Controlling Machine Data

2  Status Report, Machine-Related

Summary

Menu

Operating  facilities  management    Status  analyses    Status  report
(machine-related)

Transaction code

mstrpm

Function authorization  mstrpm

Usage

The  status  report  (machine-related)  is  an  evaluation  in  operating  facilities  management.  The  analysis

provides summarized status information relating to a workplace/ machine for a certain period of time and

a certain number of workplaces. The data is presented in charts for informational purposes. You can also

compare several machines with each other using this status report.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. You can also run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made  using  the  field  Group  in  the  workplace/  machine  configuration.  You  can  also  run  a  search

using wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

also run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can also

run a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 6 von 46

Controlling Machine Data

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This field references the short name of the machines and workplaces in the machine's master data.

At the bottom, only those machines are displayed that are identical to the string that was entered.

You can also run a search using wildcards (placeholders *) in this field.

Inclusive status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When selecting via shift(s), the shift date is evaluated, while when selecting by time the selection is

based on the start date. Please keep in mind that a selection by shift is only supported for ADE and

MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only ADE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

For this kind of evaluation  type, only  the finished  ADE postings are considered. If the order is

currently  still  running  on  the  machine,  the  time  period  between  the  last  logon  and  now  is  not

taken into account. As such, it is by all means possible that there are differences between the

machine evaluation and the order-related evaluation. Only ADE postings are taken into account

that  have  started  during  the  evaluation  period.  If  necessary,  the  selection  period  must  be

selected  so  that  the  ADE  postings  that  are  to  be  taken  into  account  are  within  this  selection

period. For this order-related evaluation, MPDV recommends the shift-related selection option.

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 7 von 46

Controlling Machine Data

If orders are  logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known from MDE 7.2 console is set by default in MOC. What this means is that postings

that were generated as a result of a shift change are not considered when determining the quantity.

All that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 8 von 46

Controlling Machine Data

Status report - machine related detail application

In the tabular evaluation, the detailed status of a  workplace/ a machine or group is presented  within an

arbitrarily  selected  period  of  time.  The  durations  and  quantities  (frequencies)  are  compressed  to  each

separate status.

The following data is available:

Machine/ workplace category

Workplace

Number of the machine/ workplace.

Group

Group that the workplace is assigned to based on the resource configuration.

Cost center

Cost center that the workplace is assigned to based on the resource configuration.

Company

Company that the workplace is assigned to based on the resource configuration.

Duration category

Duration

Total  time  of  all  disturbances  within  the  evaluation  period  (i.e.  not  all  downtimes  within  this

evaluation period are compressed in this field).

%

Proportion  of  total  downtime  durations  for  the  specific  machine  in  relation  to  the  total  duration  of

disturbances of all of the displayed workplaces shown in percent.

Production

Durations posted to RPA 11

RPA

When delivered from the factory, the durations set for the resource performance accounts 1-10 are

listed  in  the  pool  of  columns.  They  are  stored  there  with  their  abbreviation  and  can  be  shown  as

needed.

Please  keep  in  mind  that  there  are  resource  performance  account  columns  for  duration  and

quantities.

Quantity category

Quantity

Total number of disturbances that was active at each machine within the evaluation period.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 9 von 46

%

Proportion of the number of downtimes for the specific machine in relation to the total number of all

Controlling Machine Data

of the workplaces displayed shown in percent.

Production

Number of RPA 11 statuses in the evaluation period.

RPA

When delivered from the factory, the number of resource performance accounts 1-10 is listed in the

pool of columns. They are stored there with their abbreviation and can be shown as needed.

Please  keep  in  mind  that  there  are  resource  performance  account  columns  for  duration  and

quantities.

Rate of capacity utilization

Rate of capacity utilization in %

Comparison production - downtimes detail application

The  "Comparison:  production  -  downtimes"  detail  application  provides  a  summary  of  durations  for

production (RPA 11) and for the downtimes (RPA 1-10) for the workplaces marked in the table and these

are compared graphically in the form of a bar chart.

The percentages shown relate to the total of both bars.

Machine hit list (durations) detail application

The downtime durations for each of the  workplaces marked in the table are shown in the form of a bar

chart in the machine hit list (durations) detail application.

In  the  combo  box  "Displayed  series"  you  can  define  whether  the  durations  displayed  as  a  percentage

should  relate  to  the  total  number  of  downtimes  (RPA  1-10)  or  to  the  total  duration  (RPA  1-11).  If  both

options have been selected, both bars are displayed (for each workplace).

Machine hit list (quantity) detail application

In the machine hit list (quantity) detail application, the number of downtimes per machine is displayed in a

chart. As opposed to the previous detail applications, no further display options are available here.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 10 von 46

Controlling Machine Data

3  Status Report

Summary

Menu

Production Facility Management  Status analyses  Status report

Transaction code

mstrp

Function authorization  mstrp

The  status  report  is  an  indispensable  tool  for  any  production  executive.  Whether  planner,  foreman  or

team leader, this report can be individually configured to show downtimes  in any form.

Usage

This evaluation provides status information relating to a workplace/ machine for a specific period of time

and a certain number of workplaces. All of the accrued downtimes are pulled together in this evaluation

and can be prepared in the form of a graphic or in table form based on what the user intends to achieve.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. You can run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made using the field Group in the  workplace/ machine configuration.  You can run  a search using

wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can run

a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 11 von 46

Controlling Machine Data

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This  selection  criterion  references  the  name  of  the  machines  and  workplaces  in  the  machine's

master data. At the bottom, only those machines are displayed that are identical to the string that

was entered. You can also run a search using wildcards (placeholders *) in this field.

Status

Limits  the  selection  to  a  certain  status.  Displayed  in  the  combo  box  are  the  status  texts  that  the

selection is filtered through.

Include status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time,  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for ADE and MDE data, not for WRM data.

Shift/ time

Selection by shift (only ADE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For this kind of evaluation  type, only  the finished  ADE postings are considered. If the order is

currently still running on the machine, the time period between the last logon and “now” is not

taken into account. As such, it is by all means possible that there are differences between the

machine evaluation and the order-related evaluation. Only ADE postings are taken into account

that  have  started  during  the  evaluation  period.  If  necessary,  the  selection  period  must  be

selected  so  that  the  ADE  postings  that  are  to  be  taken  into  account  are  within  this  selection

period. For this order-related evaluation, MPDV recommends the shift-related selection option.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 12 von 46

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

Controlling Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 13 von 46

Controlling Machine Data

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

The status assigned to RPA 12

Status assigned to RPA 12 (typically the status for breaks and for shift-free times) are not selected.

Status report detail application

Tabular evaluation of the downtimes for a specific period of time and a certain number of workplaces. The

result  depends  on  the  selection  and  therefore  on  the  selection  criteria  made  available  on  the  selection

panel.

The following data are available:

Status category

Status

Status number as per configuration

Designation

Designation of the status

RPA

Resource performance account number

Status class

Abbreviation of the status class

Duration category

Duration

Total time of all statuses determined within the evaluation period (i.e. not all downtimes within this

evaluation period are compressed in this field).

%

Proportion  of  total  status  duration  as  compared  to  the  total  duration  of  disturbances  shown  as  a

percentage.

Quantity category

Quantity

Total number of statuses determined that were applicable during the evaluation period.

%

Proportion of the number of statuses to the total number shown as a percentage.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 14 von 46

Controlling Machine Data

Comparison production - downtimes detail application

In  this  detail  application,  the  production  time  (green)  accrued  during  the  evaluation  period  and  the  sum

total of all determined status times, not including RPA 11 and 12 (red) are compared in the form of a bar

chart.

The  presentation  always  relates  to  all  of  the  displayed  statuses  (there  is  no  highlighting  option  in  this

table).

Status hit list (durations) detail application

The  downtime  durations  for  each  status  marked  in  the  table  are  shown  in  the  form  of  a  graphic  in  the

status hit list (durations) detail application.

In  the  combo  box  "Displayed  series"  you  can  define  whether  the  durations  displayed  as  a  percentage

should  relate  to  the  total  number  of  downtimes  (RPA  1-10)  or  to  the  total  duration  (RPA  1-11).  If  both

options have been selected, both bars are displayed (for each status).

Status hit list (quantity) detail application

The total number of status changes for each status marked in the table is shown in the form of a graphic

in the status hit list (quantities) detail application.

As opposed to the previous detail applications, no further display options are available here.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 15 von 46

Controlling Machine Data

4  Status Profile

Summary

Menu

Operating facilities management  Status analyses  Status profile

Transaction code

mstpf

Function authorization  mstpf

Usage

The status profile  evaluates the statuses by shift, by  day, by calendar  week or by month over a certain

period of time. The result depends on the selection and therefore on the selection criteria made available

on the selection panel.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. There is an option to search using wild cards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made  using  the  field  group  in  the  workplace/  machine  configuration.  You  can  run  a  search  using

wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can run

a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 16 von 46

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

Controlling Machine Data

search using wildcards.

Designation

This  selection  criterion  references  the  name  of  the  machines  and  workplaces  in  the  machine's

master data. At the bottom, only those machines are displayed that are identical to the string that

was entered. You can also run a search using wildcards (placeholders *) in this field.

Status text

Limits  the  selection  to  a  certain  status.  Displayed  in  the  combo  box  are  the  status  texts  that  the

selection can be filtered through.

Inclusive status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time,  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for ADE and MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only ADE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For  this  kind  of  evaluation  type,  only  the  finished  ADE  postings  are  considered.  If  the  order  is

currently still running on the machine, the time period between the last logon and now is not taken

into  account.  As such, it  is by all means possible that there are  differences between the machine

evaluation  and  the  order-related  evaluation.  Only  ADE  postings  are  taken  into  account  that  have

started during the evaluation period. If necessary, the selection period must be selected so that the

ADE  postings  that  are  to  be  taken  into  account  are  within  this  selection  period.  For  this  order-

related evaluation, MPDV recommends the shift-related selection option.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 17 von 46

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

Controlling Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type the resource postings take priority. The principle is the same as when running an

evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the  implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 18 von 46

Controlling Machine Data

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status profile detail application

Tabular presentation of the status with the following columns:

Shift date/ shift/ calendar week/ year

The  durations  in  the  statuses  are  displayed  in  groups  by  shift  (i.e.  shift  date/  shift  number).

Calendar  week,  month  and  year  (based  on  the  shift  date)  are  provided  as  additional  sorting/

grouping criteria.

Status/ designation

Number  and  designation  of  the  status.  The  status  column  is  displayed  in  color  as  defined  in  the

status text configuration.

RPA

Resource performance account number

Abbreviation

Abbreviation of the status class

Duration

Total time of all statuses within the evaluation period.

Quantity

Total number of statuses that was applicable during the evaluation period.

Pivot table detail application

You can evaluate status based on additional criteria in the pivot table detail view.

The bar colors in the chart are set "arbitrarily" using a color chart defined internally.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 19 von 46

Controlling Machine Data

5  Status Ranking List

Overview

Menu

Production Facility Management  Status analyses  Status ranking list

Transaction code

sthitl

Function authorization

sthitl

Purpose

The  Status  ranking  list  provides  an  overview  of  the  most  frequent  or  longest  lasting  statuses.  The  list

indicates the duration and number of machine events collected as status. Also included in this overview

are production statuses (statuses assigned to RPA 11) and break statuses.

There are two sorts of statuses: The machine/workplace status which is often referred to as "Downtime

reason" or "Malfunction", and the further parallel statuses, e.g. program, operation type, operation mode

or disturbances and production interruptions (depending on the license/project).

Selection criteria

The application provides the following selection criteria:

Workplace

Workplaces/machines matching the criteria entered.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

Date

Data should be selected from the entered period of time.

When selecting by shift(s), the shift date is evaluated, when selecting by time the selection is based

on the start date. Please keep in mind that a selection by shift is only supported with BDE and MDE

data, not with WRM data.

The  display  shows  the  evaluation  of  the  selected  period  of  time  whether  the  data  is  already

archived or not.

Shift/ time

Selection according to shifts (HYDRA-BDE and HYDRA-MDE events only) or according to periods.

If no shift is selected, all shifts are integrated.

Both times refer respectively to the start or end of the date period specified above.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 20 von 46

Controlling Machine Data

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected report group.

Responsibility area

This selection criterion refers to the responsibility area in the machine master data. Please note that

you may only view those machines you are authorized for by the responsibility area.

Top

Limits  the  number  of  statuses  displayed  for  each  selected  machine  to  those  with  the  longest

duration. Pre-assignment: 5

Status type

Selection  of  status  types  that  are  included  in  the  evaluation.  By  default,  the  machine  status  is

available here; further status types are available depending on the license.

Field descriptions

Resource

Workplace/machine number

Resource type

For workplaces/machines always "MNR"

Designation

  Designation of the workplace/machine

Status, Status text

Status number and status text of the status that was available. The status text is displayed in the

status text color that was configured.

Duration

Duration indicating how long the current status was available.

Total number

Number of times a status was available.

Status type

Description of the status type a status belongs to. By default, the machine status is available here;

further status types are available depending on the license or the project.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 21 von 46

Controlling Machine Data

6  ABC Analysis

Overview

Menu

Production Facility Management  Status analyses  ABC analysis

Transaction code

stabc

Function authorization

stabc

Purpose

This report lists all malfunctions that occurred while the selected machine was running. The ABC analysis

is intended to be a pure report on "Failures" = "Malfunctions". For this reason, the status "Production" is

not evaluated.

The statuses are sorted according to the "Pareto Principle" - i.e sorted according to their size, summed up

and  classified  -  and  classified  as  A,  B  and  C  depending  on  how  long  the  status  lasted.  The  threshold

values are configurable.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines the workplace for which the ABC analysis is to be displayed.

Status type

Restricts the displayed error messages to one status type (depending on license or project).

Threshold value 1

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  1,  the  threshold  is  defined

between the limits A and B. The predefined value is 50 %.

Threshold value 2

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  2,  the  threshold  is  defined

between the limits B and C. The predefined value is 30 %.

Date from …to (Shift / Time)

The error messages of the selected period of time are used.

Field descriptions

Status

Status number. The coloring is based on the status text configuration.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 22 von 46

Controlling Machine Data

Status text

Status name

Status type

The  selection  criteria  restrict  the  displayed  status  type  (depending  on  license  or  project).  For

example, the selection criteria provide the following status types:

  Machine status

  Malfunction

  Operation mode

  Operation state

  Program

  …

Status type designation

Designation of the active status type

Duration, %

Total status duration  indicating how  long the status  was active at the machine  and  percentage of

the total duration.

Quantity, %

Number  indicating  how  often  this  status  was  active  at  the  machine  and  percentage  of  the  total

number.

Shift

Shift number indicating the shift when the status was active.

Shift start / End of shift

Beginning and end of shift during which the status was active.

Detail application ABC analysis

The  detail  application  ABC  analyses  provides  a  sum  total  of  all  accrued  durations  and  displays  the

number  of  individual  postings  included.  The  data  is  classified  in  the  three  classes  A,  B  and  C.  The

classification is based on the percentages referring to the total duration. The values are totaled according

to  the  "Pareto  principle",  i.e.  the  individual  rows  are  sorted  by  their  size  in  descending  order  into  the

classes A to C and added to the class until the total sum exceeds the threshold value (to be more precise:

threshold value specified 100 %). Then the next class is filled.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 23 von 46

Controlling Machine Data

Detail application Individual listing

If  you  select  a  row  in  the  ABC  analysis,  the  Individual  listing  shows  the  individual  rows  included  in  the

selected row.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 24 von 46

Controlling Machine Data

7  Minor/Major Stops

Overview

Menu

Production Facility Management  Status analyses  Minor/major stops

Transaction code

minmaj

Function authorization  minmaj

Purpose

This report shows production interruptions for a selected machine. Subject to their duration, interruptions

are  classified  as  minor  and  major  stops.  Minor  stops  are  shorter  interruptions.  They  do  not  affect

production processes, as they are compensated by buffer times. But if a "minor stop" exceeds a threshold

value previously specified, it becomes a "major stop".

In the lists of the minor and major stops, all stops with the same cause or the same text are summarized

in  one  position.  The  single  causes  are  listed  by  expanding  one  cause.  The  last  stop  that  occurred  is

shown at the top of the list.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines the workplace for which the stops are to be displayed.

Date from …to (Shift / Time)

The stops of the selected period of time are used.

Status type

Restricts the displayed stops to one defined status type.

If you did not select a status type, the status type Machine status (MST) is selected by default.

Minor/major thresholds

This threshold specifies, if a stop is a minor or a major stop. The predefined value is 5 minutes.

Detail application General

MDE-CMD_82.docx

Version: 1.1.23049

Seite 25 von 46

Controlling Machine Data

Graphic presentation of the total time and how the time is distributed in percent to minor and major stops.

Detail application Minor report

The Minor report shows the selected stops of the selected machine. The duration of the displayed stops

is shorter than the minor/major threshold entered.

Detail application Major report

The Major report shows the selected stops of the selected machine. The duration of the displayed stops

is longer than the minor/major threshold entered.

Field descriptions

Status

Status number and also cause of the accrued stop.

Status text

Status text of the status.

Status type

The  selection  criteria  restrict  the  displayed  status  type.  For  example,  the  selection  criteria  can

provide the following status types (depending on license or project):

  Machine status

MDE-CMD_82.docx

Version: 1.1.23049

Seite 26 von 46

Controlling Machine Data

  Malfunction

  Operation mode

  Operation state

  Program

  Sequencer A - module

  Sequencer A - programs

  Sequencer A - steps

  Sequencer B - module

  Sequencer B - programs

  Sequencer B - steps

  Sequencer gen. - status

Status type designation

Designation of the active status type

Start / End

Beginning and end of stop

Duration, %

Total stop duration indicating how long the stop was active at the machine and percentage of total

duration.

Quantity, %

Total status number indicating how often this status was active and percentage of the total number.

Shift

Shift number indicating the shift when the stop occurred.

Shift start / End of shift

Beginning and end of shift during which the stop occurred.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 27 von 46

Controlling Machine Data

8  Status Class Report

Summary

Menu

Operating facilities management  Status analyses  Status class report

Transaction code

stclrp

Function authorization

stclrp

Usage

The  evaluation  provides  status  information  for  a  specific  period  of  time  and  a  certain  number  of

workplaces. In it, the statuses are consolidated into status classes that were assigned in a previous step.

The application provides the user with the ability to run an analysis of the booked status classes.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. You can run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made using the field Group in the  workplace/ machine configuration.  You can run  a search using

wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can run

a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 28 von 46

Controlling Machine Data

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This  selection  criterion  references  the  name  of  the  machines  and  workplaces  in  the  machine's

master data. At the bottom, only those machines are displayed that are identical to the string that

was entered. You can also run a search using wildcards (placeholders *) in this field.

Date

The period of time from which data should be selected.

When selecting via shift(s), the shift date is evaluated, while when selecting by time the selection is

based on the start date. Please keep in mind that a selection by shift is only supported for BDE and

MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only BDE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For  this  kind  of  evaluation  type,  only  the  finished  BDE  postings  are  considered.  If  the  order  is

currently still running on the machine, the time period between the last logon and now is not taken

into  account.  As such, it  is by all means possible that there are  differences between the machine

evaluation  and  the  order-related  evaluation.  Only  BDE  postings  are  taken  into  account  that  have

started during the evaluation period. If necessary, the selection period must be selected so that the

BDE  postings  that  are  to  be  taken  into  account  are  within  this  selection  period.  For  this  order-

related evaluation, MPDV recommends the shift-related selection option.

The  following  illustration  shows  an  example  of  an  overlapping  of  BDE  and  MDE  postings.  The  BDE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 29 von 46

Controlling Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 30 von 46

Controlling Machine Data

Status class report detail application

Tabular presentation of the status class reports

Status class

Status class number

Abbreviation

Abbreviation of the status class

Designation

Description of the status class

Duration

Total time of all statuses within the evaluation period, accumulated to status classes.

%

Proportion of the total duration of the status classes.

Quantity

Total number of all statuses within the evaluation period, accumulated to status classes.

%

Proportion of the number of statuses to the total number of all statuses.

Status class hit list (durations) detail application

Displayed in a bar chart in the status class hit list (durations) detail application are the durations posted to

status classes. Displayed here are the status classes that were highlighted in the tabular detail application

status class report. The red bars are shown in descending order by duration.

Status class hit list (quantities) detail application

Displayed in a bar chart in the status class hit list (quantities) detail application are the number of status

classes. Displayed here are the status classes that were highlighted in the tabular detail application status

class report. The red bars are shown in descending order by quantity.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 31 von 46

Controlling Machine Data

9  Status Class Profile

Summary

Menu

Operating facilities management  Status analyses  Status class profile

Transaction code

stclpf

Function authorization

stclpf

Usage

The status class profile evaluates the status classes by shift, by day, by calendar week or by month over

a certain period of time. The result depends on the selection and therefore on the selection criteria made

available on the selection panel.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. You can run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made using the field Group in the  workplace/ machine configuration.  You can run  a search using

wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can run

a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 32 von 46

Controlling Machine Data

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This selection criterion references the short name of the machines and workplaces in the machine's

master  data.  The  machines  or  workplaces  are  displayed  that  are  identical  to  the  string  that  was

entered. You can also run a search using wildcards (placeholders *) in this field.

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time,  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for BDE and MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only BDE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For  this  kind  of  evaluation  type,  only  the  finished  BDE  postings  are  considered.  If  the  order  is

currently still running on the machine, the time period between the last log on and now is not taken

into  account.  As such, it  is by all means possible that there are  differences between the machine

evaluation  and  the  order-related  evaluation.  Only  BDE  postings  are  taken  into  account  that  have

started during the evaluation period. If necessary, the selection period must be selected so that the

BDE  postings  that  are  to  be  taken  into  account  are  within  this  selection  period.  For  this  order-

related evaluation, MPDV recommends the shift-related selection option.

The  following  illustration  shows  an  example  of  an  overlapping  of  BDE  and  MDE  postings.  The  BDE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 33 von 46

Controlling Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies  the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 34 von 46

Controlling Machine Data

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set  by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status class profile detail application

Tabular presentation of the status class profile with the following columns:

Shift date/ shift/ calendar week/ year

The durations of the status classes are displayed per shift  (i.e. shift date/ shift number). Calendar

week, month and year (based on the shift date) are provided as additional sorting/ grouping criteria.

Status class/ abbreviation/ designation

Number, abbreviation and designation used for the status class

Duration

Time duration in which the status class was created/ set within the evaluation period.

Quantity

Number of times that the status class was created/ set within the evaluation period.

Pivot table detail application

You can evaluate status classes based on additional criteria in the pivot table detail view.

The bar colors in the chart are set "arbitrarily" using a color chart defined internally.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 35 von 46

Controlling Machine Data

10  RPA Report

Overview

Menu

Production facility management  Status analyses  RPA report

Transaction code

rparp

Function authorization

rparp

Purpose

The  RPA  report  provides  status  information  of  workplaces/machines  over  a  specified  time  and  for  a

specified number of workplaces. For the report, the workplace/machine statuses are assigned to resource

performance accounts where they are totaled.

Selection criteria

The application provides the following selection criteria:

Workplace

Selection by machine/workplace. You can use wildcards.

Group

Selection by workplaces/machines that are assigned to the machine group specified. The selection

is made using the field Group in the Workplace/machine configuration. You can use wildcards.

Cost center

Selection  by  workplaces/machines  that  are  assigned  to  the  cost  center  specified.  You  can  use

wildcards.

Company

Selection  by  workplaces/machines  that  are  assigned  to  the  company  specified.  You  can  use

wildcards.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  stored  in  the  machine  master  data.  Note:

The user can only view those machines that are included in the responsibility areas assigned to the

user.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected report group.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 36 von 46

Controlling Machine Data

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows  all  machines  or  workplaces  matching  the  entered  character  string.  You  can  also  use

wildcards.

Designation

This  field  refers  to  the  designation/name  of  machines  and  workplaces  defined  in  the  machine

master  data  (in  HYDRA:  comment).  The  application  only  shows  the  machines  matching  the

character string specified. You can also use wildcards (placeholders *).

Including status for RPA 11

The status assigned to RPA 11 is integrated in the report (usually status "production").

Date

The data included in the period of time specified is used.

If  you  perform  the  selection  using  shift(s),  the  shift  date  is  evaluated,  if  you  use  the  time  for

selection, the selection is based on the start date. Note: a selection by shift is only supported with

BDE and MDE data, not with WRM data.

Shift(s)/time

Selection  by  shifts  (HYDRA-BDE  and  HYDRA-MDE  events  only)  or  using  a  period  of  time.  If  no

shift is selected, all shifts are used.

Both times refer to the beginning or end of the date period specified above.

Order/article

If you selct the option Order, you must specify an order or an article.

With this selection type,  only completed  BDE postings are used. If the order is still running  at the

machine,  the  system  does  not  integrate  the  time  period  between  the  last  logon  and  now.  It  is

therefore possible that there is a difference between the machine evaluation and the order-related

evaluation. The system only uses BDE postings that start in the evaluation period. If required, you

must  specify  the  selection  period  so  that  the  required  BDE  postings  are  actually  included  in  this

period. For this order-related evaluation, MPDV recommends to select data by shift.

The illustration below shows an example of how BDE and MDE postings can overlap. The BDE postings

take priority with this evaluation type. The yellow fields show the result of this evaluation. MDE  quantities

and times are used proportionately to calculate the result.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 37 von 46

Controlling Machine Data

If  several  orders  are  logged  on  to  the  machine  at  the  same  time,  this  evaluation  type  assigns  the

complete machine  time and number of pieces to  each of the orders (yellow field). Times and quantities

are not assigned proportionately when orders are logged on in parallel.

Resource type/resource

If you selct the option Resource, you must specify a resource.

Also  with  this  selection  type,  only  completed  postings  are  used.  With  this  evaluation  type,  the

resource postings take priority. The principle is the same as for evaluations by order.

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the medium-term data area.  You  need  not  explicitly activate the access to the

medium-term data area.

Using quantities during time of shift only

This  option  known  from  MDE  7.2  is  set  by  default  in  MOC. With  this  option,  the  postings  created

during  shift  change  are  not  used  when  the  quantity  is  identified.  The  machine  status  must  have

been set and only then the quantities produced are used. If this moment is outside of the evaluation

interval, then the output is 0.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 38 von 46

Controlling Machine Data

Detail application RPA report

RPA / Abbrev. / Designation

Number, abbreviation and name of the resource performance account.

Duration

Time that the status lasted/was set that is assigned to this RPA.

%

Share of time in the total time.

Quantity

Number of times that the status assigned to this RPA was available/set.

%

Share of the number of times in the total number of times.

Detail application Duration

The  detail  application  Duration  displays  the  durations  of  the  resource  performance  accounts  in  a  bar

chart.  The  durations  are  sorted  and  displayed  in  descending  order.  The  different  resource  performance

accounts are colored according to the default definition.

Detail application Quantity

The detail application  Quantity displays the number of times that a status  was available at the selected

machine. The statuses are displayed according to the RPA in a bar chart. The number of times are sorted

and displayed in descending order. The different resource performance accounts are colored according to

the default definition.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 39 von 46

Controlling Machine Data

11  PRA Profile

Summary

Menu

Operating facilities management  Status analyses  RPA profile

Transaction code

rparp

Function authorization

rparp

Usage

The  RPA  profile  provides  status  information  for  a  specific  period  of  time  and  a  certain  number  of

workplaces. In it, the status of resource performance accounts that were assigned in a previous step are

consolidated and displayed by shift.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace You can also run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made  using  the  field  Group  in  the  workplace/  machine  configuration.  You  can  also  run  a  search

using wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

also run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can also

run a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 40 von 46

Controlling Machine Data

Short name

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This field references the designation (in HYDRA: comment) used for the machines and workplaces

in the machine master data. At the bottom, only those machines are displayed that are identical to

the string that was entered. There is also the option to use wild cards (placeholders *) in this field.

Inclusive status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When selecting via shift(s), the shift date is evaluated, while when selecting by time the selection is

based on the start date. Please keep in mind that a selection by shift is only supported for BDE and

MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only BDE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For  this  kind  of  evaluation  type,  only  the  finished  BDE  postings  are  considered.  If  the  order  is

currently still running on the machine, the time period between the last log on and now is not taken

into  account.  As such, it  is by all means possible that there are  differences between the machine

evaluation  and  the  order-related  evaluation.  Only  BDE  postings  are  taken  into  account  that  have

started during the evaluation period. If necessary, the selection period must be selected so that the

BDE  postings  that  are  to  be  taken  into  account  are  within  this  selection  period.  For  this  order-

related evaluation, MPDV recommends the shift-related selection option.

The  following  illustration  shows  an  example  of  an  overlapping  of  BDE  and  MDE  postings.  The  BDE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 41 von 46

Controlling Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 42 von 46

Controlling Machine Data

Overview of detail application

Shift date/ shift/ calendar week/ year

The durations in the resource performance accounts are displayed in groups by shift (i.e. shift date/

shift number).

Calendar  week  and  year  are  displayed  as  a  possible  sorting/  grouping  criterion.

The calendar week and the year match the shift date.

RPA/ abbreviation/ designation

When delivered from the factory, the durations set for the resource performance accounts 1-10 are

listed  in  the  pool  of  columns.  They  are  stored  there  with  their  abbreviation  and  can  be  shown  as

needed.

Duration

Time duration in which the status was created/ set within the evaluation period.

Quantity

Number of times that the status was created/ set within the evaluation period.

Duration detail application

In the duration detail application, the resource performance account durations are displayed in the form of

a  stacked  bar  chart.  They  are  displayed  in  chronological  form  (X  axis)  or  accumulated  to  shift  date  (Y

axis).  The color code for each of the resource performance accounts is in accordance with the standard

definitions.

Quantity detail application

In the quantity detail application, the number of statuses for the selected machines are displayed in the

form of a stacked bar chart, broken down by  RPA. They are displayed in chronological form (X axis) or

accumulated  to  shift  date  (Y  axis).  The  color  code  for  each  of  the  resource  performance  accounts  is  in

accordance with the standard definitions.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 43 von 46

Controlling Machine Data

12  Status Analysis

Summary

Menu

Operating facilities management  Status analyses  Status analysis

Transaction code

stata

Function authorization

stata

Usage

Because of how flexible it is, the status analysis answers all questions relating to downtimes, malfunction

reasons and production times, information that is useful for the shift foreman and team leaders, from the

production controller to the production manager.

The recorded production times represent the basic data made available by the status analysis. The status

postings are provided here in the finest detail and using the pivot table function, they can be compiled to

generate informative reports.

Selection criteria

The application provides the following selection criteria:

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

search using wild cards.

Workplace

Search by machine/ by workplace. You can search using wild cards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Company

Search  by  workplaces/  machines  that  are  assigned  to  the  company  that  was  entered.  You  can

search using wild cards.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 44 von 46

Controlling Machine Data

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for ADE and MDE data, not for WRM data.

Shift/ time

Selection by shift or by time period. If no shift has been selected, all shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status analysis detail application

The results that were found are displayed in this detail application in tabular form. The results answer the

question: When was a certain status recorded for which machine and for how long?

The following columns are shown, among others:

Workplace/ short designation

Number and short name of the workplace

Beginning/ end

Beginning period or ending period of the status respectively.

Shift date/ shift number

Shift date and shift in which the status applied.

Status/ status text

Number and designation of the active status

Duration

Duration of the status

MDE-CMD_82.docx

Version: 1.1.23049

Seite 45 von 46

Controlling Machine Data

Quantity

The Quantity field reflects how often a status applied. Because only one status is displayed here at

a time, generally a 1 is displayed as the quantity.

A 0 is displayed  if the status was set due to an  automatic status change that took place during a

shift change and it is no different than the previous status (before the shift change).

Pivot table detail application

Available in the detail application "Pivot table" are data found that are used for a pivot analysis. Functions

such as those known from Microsoft Excel® can be used for this purpose.

The colors used in the graphic do not depend on the colors used for status configuration.

MDE-CMD_82.docx

Version: 1.1.23049

Seite 46 von 46

