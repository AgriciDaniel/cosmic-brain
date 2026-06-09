Manual

Controlling of Machine Data
MDE-CMD 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Controlling of Machine Data

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

MDE-CMD_81.docx

Version: 1.0.8853

Page 2 of 46

Controlling of Machine Data

Contents

1  Overview of Machine Data Controlling ......................................................... 4

2  Status Report, Machine-Related .................................................................. 6

3  Status Report ............................................................................................. 11

4  Status Profile .............................................................................................. 16

5  Status Hit List ............................................................................................. 20

6  ABC Analysis ............................................................................................. 22

7  Minor/ Major Stops ..................................................................................... 25

8  Status Class Report ................................................................................... 28

9  Status Class Profile .................................................................................... 32

10  RPA Report ................................................................................................ 36

11  PRA Profile ................................................................................................. 40

12  Status Analysis ........................................................................................... 44

MDE-CMD_81.docx

Version: 1.0.8853

Page 3 of 46

Controlling of Machine Data

1  Overview of Machine Data Controlling

Purpose

Machine data controlling provides the ability to evaluate data that was entered in the system as concerns

how  recorded  durations  are  distributed  to  various  time  accounts.  It  also  analyzes  any  statuses  that

occurred with respect to the duration and number of the occurrences.

Implementation considerations

You use the function package if:

  You  would  like  to  perform  a  downtime  /  status  assessment  of  separate  machines  or  machine

groups over a choice of time periods.

  You would like to perform a status class evaluation for a selected machine or group of machines

over a choice of time periods or shifts.

  You would like to perform an evaluation of the time accounts of a selected machine or group of

machines over a choice of time periods or shifts.

Integration

Times and quantities entered and statuses posted in MDE are accessed for presentation.

Features

  Status report (workplace/machine-related)

o  Tabular  downtime  /  status  assessment  of  separate  machines  over  a  choice  of  time

periods.  Graphical  comparison  of  production

times  and  downtimes.  Graphical

presentation of a machine hit list that shows the machines with either the longest or the

most downtimes.

  Status report

o  Tabular downtime / status evaluation of a selected machine or group of machines across

a  choice  of  time  periods  or  shifts.  Graphical  comparison  of  production  times  and

downtimes. Graphical presentation of a status hit list that shows the longest or the most

downtimes.

  Status class report

o  Tabular  and  graphical  status  class  evaluation  of  a  selected  machine  or  group  of

machines over a choice of time periods or shifts.

  RPA report

o  Tabular and graphical RPA evaluation of a selected machine or group of machines over

a choice of time periods or shifts.

MDE-CMD_81.docx

Version: 1.0.8853

Page 4 of 46

Controlling of Machine Data

  Status profile

o  Chronological  evaluations  of  status  /  downtimes  of  separate  machines  or  machine

groups. Staging of data in table and pivot table form. Data evaluation in pivot table based

on various criteria. Graphical data presentation in pivot table form.

  Status class profile

o  Chronological  evaluations  of  status  classes  for  separate  machines  or  machine  groups.

Staging  of  data  in  table  and  pivot  table  form.  Data  evaluation  in  pivot  table  based  on

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 5 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 6 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 7 of 46

Controlling of Machine Data

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 8 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 9 of 46

%

Proportion of the number of downtimes for the specific machine in relation to the total number of all

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 10 of 46

Controlling of Machine Data

3  Status Report

Summary

Menu

Operating facilities management  Status analyses  Status report

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 11 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 12 of 46

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 13 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 14 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 15 of 46

Controlling of Machine Data

4  Status Profile

Summary

Menu

Operating facilities management  Status analyses  Status profile

Transaction code

mstpf

Function authorization  mstpf

Usage

The status profile evaluates the  statuses by shift, by  day, by calendar  week or by month over a certain

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 16 of 46

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 17 of 46

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 18 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 19 of 46

Controlling of Machine Data

5  Status Hit List

Summary

Menu

Operating facilities management  Status analyses  Status hit list

Transaction code

sthitl

Function authorization

sthitl

Usage

The status hit list provides a quick overview of which statuses occurred  most often at the machines and

which  state  lasted  the  longest.  It  supplies  information  about  the  duration  and  the  number  of  machine

events recorded as a status. Also included in this overview are the production status (the status assigned

to RPA 11) and the break status (the status assigned to RPA 12).

Statuses are both the machine/ workplace status, which is often also referred to as "Downtime reasons"

or "Disturbances",  but also other parallel statuses, such as program, operation  type, operation mode or

disturbance first value posting (depends on license/ project).

Selection criteria

The application provides the following selection criteria:

Workplace

Workplaces/ machines that match the criteria entered.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time,  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for ADE and MDE data, not for WRM data.

Shift/ time

Selection by shift (only ADE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

MDE-CMD_81.docx

Version: 1.0.8853

Page 20 of 46

Controlling of Machine Data

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Top

Limits  the  number  of  statuses  displayed  for  each  selected  machine  to  those  with  the  longest

duration. Pre-assignment: 5

Status type

Selection of status types that are included in the evaluation. By default, the machine status will be

available here; additional status types are available depending on the license.

Field descriptions

Resource

Workplace/ machine number

Resource Type

For workplaces/ machines, generally "MNR".

Designation

The name used to designate the workplace/ machine.

Status, status text

Status number and status test for the status that applied. The status is displayed in the status text

color that was configured.

Duration

Length of time that the status applied.

Total number

Number of times that the status applied.

Status type

Description  of  the  status  type  that  the  status  belongs  to.  Typically  this  is  "Machine  status";  other

status types are available depending on the license or the specific project.

MDE-CMD_81.docx

Version: 1.0.8853

Page 21 of 46

Controlling of Machine Data

6  ABC Analysis

Summary

Menu

Operating facilities management  Status analyses  ABC analysis

Transaction code

stabc

Function authorization

stabc

Usage

All statuses are listed in this evaluation that occur while a selected machine is running. The statuses are

broken down based on the “Pareto principle” – which means they are sorted, added up and classified by

their size and divided into the three categories A, B and C by the duration of their occurrence. Threshold

values may be selected.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines for which workplace the ABC analysis is shown.

Status type

Narrows down the error messages displayed to a status type (depends on license or project).

Threshold value 1

Parameter used to set the  ABC thresholds. For threshold 1,  the  threshold  is defined between the

limits A and B. The predefined value is 50%.

Threshold value 2

Parameter used to set the  ABC thresholds. For threshold 2,  the  threshold  is defined between the

limits B and C. The predefined value is 30%.

Date from - to/ shift/ time

Narrows down the time period from which the error message is reviewed.

Field descriptions

Status

The  number  of  the  status.  The  color  in  which  it  appears  is  based  on  how  the  status  text  is

configured.

Status text

Designation of the status.

MDE-CMD_81.docx

Version: 1.0.8853

Page 22 of 46

Status type

This  selection  criteria  is  used  to  narrow  down  the  status  type  shown  (depends  on  the  license  or

project). The following status types, for example, are possible options in the selection criteria:

Controlling of Machine Data

  Machine status

  Malfunction

  Operation mode

  Operation state

  Program

  …

Status type designation

Designation of the active status type

Duration

Calculated duration during which the status was active at the machine.

Duration % and quantity

Quantity of the status that occurred and proportion in percent of the total duration.

Shift

Shift number during which the status occurred.

Shift start/ shift end

Shift start and shift end during which the status occurred.

ABC analysis detail application

The ABC analysis detail application provides a presentation of the sum total of all durations that occurred

and displays  the number of individual postings that are included in it. The data  is broken down in three

classes A, B, C based on the percentages in relationship to the total duration. This is done in a “Pareto

summation”, i.e. the individual rows are sorted by their size in descending order into the classes A to C

and  added  to  the  class  until  the  total  sum  exceeds  the  threshold  value  (to  be  more  precise:  threshold

value specified 100%). Then the next class will be filled.

MDE-CMD_81.docx

Version: 1.0.8853

Page 23 of 46

Controlling of Machine Data

Individual listing detail application

By  selecting  a  line  in  the  ABC  analysis,  you  can  display  the  separate  lines  included  in  the  individual

listing.

MDE-CMD_81.docx

Version: 1.0.8853

Page 24 of 46

Controlling of Machine Data

7  Minor/ Major Stops

Summary

Menu

Operating facilities management  Status analyses  Minor/ major stops

Transaction code

minmaj

Function authorization  minmaj

Usage

This  analysis  shows  the  production  interruptions  (first  values  posting)  for  the  selected  machine.  The

interruptions  are  divided  into  minor  and  major  stops  based  on  their  duration.  Minor  stops  are  shorter

interruptions.  They  have  no  noticeable  effect  on  production,  because  they  are  absorbed  by  buffers,  for

example.  However,  if  the  duration  of  a  minor  stop  exceeds  a  time  threshold  defined  in  advance,  it

becomes a major stop.

In  the  list  of minor  and  major  stops,  all  stops  with  the  same  cause  or  with  an  identical  posting  text  are

initially compiled as one item. When a cause is unfolded, these stops are listed individually, whereas the

stop that occurred last is shown as the uppermost/ first entry in the list.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines for which workplace the stops are shown.

Date from - to/ shift/ time

Narrows down the time period in which the stop is reviewed.

Status type

Narrows down the stop displayed to a status type or to a cause or a posting text.

Minor/ major thresholds

The  threshold  that  is  decisive  in  determining  if  the  stop  is  considered  minor  or  major.  The  pre-

assignment is set to 5 minutes.

MDE-CMD_81.docx

Version: 1.0.8853

Page 25 of 46

General detail application

Controlling of Machine Data

Graphic illustration of the total time and how the time is distributed in percent to minor and major stops.

Minor report detail application

The minor report shows the selected stops for the chosen machine with a duration that is shorter than the

minor/ major threshold entered.

Major report detail application

The major report shows the selected stops for the chosen machine with a duration that is longer than the

minor/ major threshold entered.

Field descriptions

Status

Number of the status and therefore also the cause for the stop that occurred.

Status text

Status text for the status.

MDE-CMD_81.docx

Version: 1.0.8853

Page 26 of 46

Status type

These selection criteria are used to narrow down the status type shown. The following status types,

for example, are possible options in the selection criteria (depending on license and/or project):

Controlling of Machine Data

  Machine status

  Malfunction

  Operation mode

  Operation state

  Program

  Sequencer A - module

  Sequencer B - programs

  Sequencer B - steps

  Sequencer B - module

  Sequencer B - programs

  Sequencer B - steps

  Sequencer gen. - status

Status type designation

Name of the active status type

Start/ end

Start and end times for the stop

Duration

Calculated duration during which the stop was active at the machine.

Duration % and quantity

Quantity  of  the  status  that  occurred  and  proportion  in  percent  of  the  total  duration  of  the

disturbance.

Shift

Shift number during which the stop occurred.

Shift start/ shift end

Shift start and shift end during which the stop occurred.

MDE-CMD_81.docx

Version: 1.0.8853

Page 27 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 28 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 29 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 30 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 31 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 32 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 33 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 34 of 46

Controlling of Machine Data

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status class profile detail application

Tabular presentation of the status class profile with the following columns:

Shift date/ shift/ calendar week/ year

The durations of the status classes are displayed per shift (i.e. shift date/ shift number). Calendar

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 35 of 46

Controlling of Machine Data

10    RPA Report

Summary

Menu

Operating facilities management  Status analyses  RPA report

Transaction code

rparp

Function authorization

rparp

Usage

The RPA report provides status information relating to a workplace/ machine for a specific period of time

and  a  certain  number  of  workplaces.  In  it,  the  workplace/  machine  related  status  are  consolidated  into

resource performance accounts that were assigned in a previous step.

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

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MDE-CMD_81.docx

Version: 1.0.8853

Page 36 of 46

Controlling of Machine Data

Short name

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. There is an option to

use wild cards.

Designation

This field references the designation (in HYDRA: comment) used for the machines and workplaces

in  the  machine  master  data.  Under  designation,  only  those  machines  are  displayed  that  are

identical to the string that was entered. There is also the option to use wild cards (placeholders *) in

this field.

Inclusive status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When selecting via shift(s), the shift date is evaluated, while when selecting by time the selection is

based on the start date. Please keep in mind that a selection by shift is only supported for BDE and

MDE data, not for WRM data.

Shift(s)/ Time

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 37 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 38 of 46

Controlling of Machine Data

RPA report detail application

RPA/ abbreviation/ designation

Number, abbreviation and name used to define the resource performance account.

Duration

Time period during which the status assigned to the RPA was created/ set.

%

Percentage of duration to total duration.

Quantity

Number of times the status assigned to the RPA was created/ set.

%

Percentage of quantity to total quantity.

Duration detail application

In  the  duration  detail  application,  the  resource  performance  account  durations  are  displayed  in  a  bar

chart.  The  results  are  displayed  by  decreasing  duration.  The  color  code  for  each  of  the  resource

performance accounts is in accordance with the standard definitions.

Quantity detail application

In the quantity detail application, the number of statuses for the selected machines are displayed in the

form  of  a  bar  chart,  broken  down  by  RPA.  The  results  are  displayed  by  decreasing  quantity.  The  color

code for each of the resource performance accounts is in accordance with the standard definitions.

MDE-CMD_81.docx

Version: 1.0.8853

Page 39 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 40 of 46

Controlling of Machine Data

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

Selection by shift (only BDE  and MDE events) or by time period. If no shift has been selected, all

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 41 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 42 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 43 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 44 of 46

Controlling of Machine Data

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

MDE-CMD_81.docx

Version: 1.0.8853

Page 45 of 46

Controlling of Machine Data

Quantity

The Quantity field reflects how often a status applied. Because only one status is displayed here at

a time, generally a 1 is displayed as the quantity.

A 0 is displayed  if the status was set due to an  automatic status change that took place during a

shift change and it is no different than the previous status (before the shift change).

Pivot table detail application

Available in the detail application "Pivot table" are data found that are used for a pivot analysis. Functions

such as those known from Microsoft Excel® can be used for this purpose.

The colors used in the graphic do not depend on the colors used for status configuration.

MDE-CMD_81.docx

Version: 1.0.8853

Page 46 of 46

