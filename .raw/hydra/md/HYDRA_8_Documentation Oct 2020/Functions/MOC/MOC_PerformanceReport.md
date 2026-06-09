Efficiency report

1  Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 1 of 7

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 2 of 7

The illustration below shows an example of how ADE and MDE postings can overlap. The ADE postings

take priority  in this evaluation type. The  yellow areas show the result of this evaluation. MDE quantities

and durations are calculated on a pro rata basis to achieve the result.

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 3 of 7

Category Workplace

The following workplace/machine-related master data are available:

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 4 of 7

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 5 of 7

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 6 of 7

Efficiency report

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

MOC_PerformanceReport.docx

Version: 1.7.12009

Page 7 of 7

