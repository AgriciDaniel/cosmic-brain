Status Report

1  Status Report

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

MOC_StatusReport.docx

Version: 1.2.11564

Page 1 of 5

Status Report

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

currently still running on the machine, the time period between the last logon and  “now” is not

taken into account. As such, it is by all means possible that there are differences between the

machine evaluation and the order-related evaluation. Only ADE postings are taken into account

that  have  started  during  the  evaluation  period.  If  necessary,  the  selection  period  must  be

selected  so  that  the  ADE  postings  that  are  to  be  taken  into  account  are  within  this  selection

period. For this order-related evaluation, MPDV recommends the shift-related selection option.

MOC_StatusReport.docx

Version: 1.2.11564

Page 2 of 5

The  following  illustration  shows  an  example  of  an  overlapping  of  ADE  and  MDE  postings.  The  ADE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

Status Report

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

MOC_StatusReport.docx

Version: 1.2.11564

Page 3 of 5

Status Report

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

MOC_StatusReport.docx

Version: 1.2.11564

Page 4 of 5

Status Report

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

MOC_StatusReport.docx

Version: 1.2.11564

Page 5 of 5

