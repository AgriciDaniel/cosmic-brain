Performance profile

1  Performance profile

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

application shows all machines or workplaces that are assigned to  the selected company. You can also

use wildcards.

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 1 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 2 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 3 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 4 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 5 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 6 of 7

Performance profile

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

MOC_PerformanceProfile.docx

Version: 1.3.11703

Page 7 of 7

