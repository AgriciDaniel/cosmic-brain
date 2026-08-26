Manual

Group Bonus Reports (MOC)
LLE-AGP 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Group Bonus Reports (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

LLE-AGP_81.docx

Version: 1.0.23049

Page 2 of 24

Group Bonus Reports (MOC)

Contents

1  Group Incentives Reports - Overview .......................................................... 4

2  Bonuses ....................................................................................................... 5

3  Group bonus records ................................................................................... 9

4  Time tickets ................................................................................................ 12

5  Group performance development .............................................................. 16

6  Monthly Group Performance ...................................................................... 20

7  Personal Group Participation ..................................................................... 23

LLE-AGP_81.docx

Version: 1.0.23049

Page 3 of 24

Group Bonus Reports (MOC)

1

 Group Incentives Reports - Overview

Overview

Purpose

This function packet contains the user interface with reports, planning functions and master data for the

function packets Calculating group incentives and Premium areas for group incentives.

Integration

The function package Calculating premium/ incentive wages is required for this function packet.

Features

Results for group incentives are displayed in the form of reports, lists and clear presentations:

  Entering master data for group incentives

  Assignment of machines/ workplaces to group incentives

  Configuring reasons for bonuses and deductions using compensation control

  Update function for bonuses and deductions within the group bonus calculation

  Listing  workday  results  for  group  incentives  and  the  individual  pay  slips,  from  which  the  results

were calculated

  Average monthly group results presented in graphs and tables

  Monthly overview of employee group participation in group incentives used to determine personal

premium amounts

  Detailed listing of employee time tickets used to calculate group incentives

  Graphs and tables of group incentives by day for selectable periods of time

LLE-AGP_81.docx

Version: 1.0.23049

Page 4 of 24

Group Bonus Reports (MOC)

2  Bonuses

Summary

Menu

Data Collection  Incentive Wages  Bonuses

Transaction code

bonus

Function authorization

bonus

Bonuses  allow  for  corrective  action  to  be  taken  with  respect  to  calculating  wages.  Bonuses  may  be

assigned for piecework for each day,  person and  order. For group premiums they may  be  allocated for

each premium group and day.

Bonuses may have a positive or negative effect for employees. A bonus that has a negative effect also

has a negative algebraic sign and is also designated as deduction.

LLE-AGP_81.docx

Version: 1.0.23049

Page 5 of 24

Group Bonus Reports (MOC)

Within the framework of wage computation that has been adjusted by the “premium/incentive wage based

on formulas” option, bonuses are occasionally used to record external data.

Field Descriptions

Person, order/OP, premium group

Key  to  assign  the  bonus/deduction.  When  it  comes  to  bonuses  without  premium  group,  the

personnel number as well as the order number need to be indicated. However, personnel and order

numbers are no mandatory fields for premium groups bonuses.

Article, planned workplace

Shows the article and workplace onto which the operation is planned. These fields derive from the

operation and cannot be changed.

Reason

Reason for which the bonus/deduction has been assigned. The configuration of bonus reasons is

described in a separate document.

Date, time

When  it  comes  to  bonuses/deductions  for  people,  all  bonuses  are  imputed  to  the  person’s  time

ticket  that  corresponds  to  the  order/OP  using  the  “date”  criterion.  In  case  the  bonus/deduction

matches several time tickets, it is divided among these time tickets.

For  bonuses/deductions  for  premium  groups,  the  bonus/deduction  is  assigned  by  the  “date”  and

“premium group” and allocated on the corresponding premium group day.

Please note: The “time” factor does not affect the calculation of wages. It only specifies the input

time when bonuses/deductions are recorded at the terminal.

Value

Bonus  as  decimal  value.  By  default,  the  bonus  is  a  point  in  time  stated  in  the  industrial  minutes

format HH,III. A negative algebraic sign identifies a “deduction”. Bonuses might be entered in other

units, e.g. as percentage rates or quantities, when it comes to customer-specific wage calculation

that is adjusted by the “premium/incentive wage based on formulas” option.

Quantity, te, approver

Instead  of  an  absolute  value,  it  is  possible  to  enter  a  bonus  te  and  a  quantity,  which  is  then

automatically converted to an absolute value if the bonus was entered at the terminal. The values

that were originally entered at the terminal are saved here.

The approving foreman may also be entered at the terminal and saved here.

LLE-AGP_81.docx

Version: 1.0.23049

Page 6 of 24

Editing Functions

The below window opens in which a data record can be edited:

Group Bonus Reports (MOC)

Toolbar

 Authorize

Function authorization: bonus.sign

Sign bonus.

LLE-AGP_81.docx

Version: 1.0.23049

Page 7 of 24

Bonuses entered at the terminal might be subject to authorization if this is configured at the bonus

Group Bonus Reports (MOC)

reason.

 Reject

Function authorization: bonus.reject

Reject bonus. The bonus is not allocated in this case.

Bonuses entered at the terminal might be subject to authorization if this is configured at the  bonus

reason.

LLE-AGP_81.docx

Version: 1.0.23049

Page 8 of 24

Group Bonus Reports (MOC)

3  Group bonus records

Overview

Menu

Human  resources  management    Incentive  wage    Group  performance
records

Transaction code

grprec

Function authorization

grprec.*

This list displays data records that lead to the Daily group performance.  This list also shows the current

status of the Daily performance data for Premium groups.

This means that the system does not access the daily results that have already been pre-calculated using

wage  calculation  for  Premium  groups.  Instead,  the  results  displayed  here  are  recalculated  from  the

postings each time they are called. This makes it possible to check the effects on the Daily group results

immediately  after  corrections,  without  having  to  calculate  wages  beforehand.  When  comparing  values

from  the  Daily  group  performance  or  the  Monthly  group  performance  with  Group  premium  records,

different values can be displayed if the postings from ADE, PZE or bonuses have been changed since the

last wage calculation.

If you include labor times from time tickets in the premium calculation, you must first perform a

wage calculation for any corrections to the posting data that lead to this time ticket, since this is

the only way to update the time ticket.

If the time ticket is deduced from the PZE (personnel time management) Wage type postings, a

Personnel time calculation of the PZW must be carried out in order to see updated data.

LLE-AGP_81.docx

Version: 1.0.23049

Page 9 of 24

Group Bonus Reports (MOC)

Selection criteria

Order postings, Pers. postings, bonuses:

If the corresponding option is activated, each posting is displayed in addition to the results records.

These records are used to check which factors from the postings are included in the Group results.

Name of the Premium groups

You can filter the Premium group names with wildcards.

Field descriptions

Values  are  only  in  the  columns  if  the  column  is  relevant  for  the  posting  type  and  if  it  contains  data.

Otherwise, the field is empty.

Posting type

The  system  shows  rows  with  Daily  results,  Order  postings,  Pers.  postings  and  bonuses.    Daily

results are always displayed. Other Posting types are displayed if you click on the selection fields.

Data records that are not result records are displayed in italic letter and gray for us to distinguish

them from result records.

LLE-AGP_81.docx

Version: 1.0.23049

Page 10 of 24

Group Bonus Reports (MOC)

Standard  time,  bonuses,  unproductive,    time,  duration,  downtime,  overhead  costs,  performance

level

The meaning  of  these  columns  corresponds  to  that  of  the  Monthly  groups  results  application  and

represents the calculated Group premium performance for the corresponding day.

The following columns

The data belonging to the posting are displayed in the following column, depending on the posting

type:

Further  columns

(co-called  premium  accounts)  are  available  when  using

"Formula-based

premium/incentive wages". We can also implement other calculation methods and types of premiums by

using customer-specific formulas.

LLE-AGP_81.docx

Version: 1.0.23049

Page 11 of 24

Group Bonus Reports (MOC)

4  Time tickets

Overview

Menu

Human  resources  management    Incentive  wage    Group  performance
records

Transaction code

timtic

Function authorization

timtic.*

Time  tickets  show  the  activities  and  times  used  to  calculate  a  premium  wage  for  an  employee.    The

system  calculates  time  tickets  with  the  time  tickets  from  the  collected  output  data  of  the  order  data

collection, sometimes also using personnel time managements and bonuses.  If feasible, a performance

level is calculated even if it is not a piecework time ticket.

Selection criteria

Tab "Time type"

You can select time tickets for specified time types.

LLE-AGP_81.docx

Version: 1.0.23049

Page 12 of 24

Group Bonus Reports (MOC)

Name of the Premium groups

You can filter the Premium group names with wildcards.

Field descriptions

When  using  "Formula-based  premium/incentive  wages",  the  meaning  of  the  fields  may  differ  from  the

standard. You can find further information in your customer documentation.

Wage type

The  wage  type  is  identified  using  the  collected  output  data  and  also  using  specific  wage  type

determination.

Time type

The  Time  type  is  usually  deduced  from  the  time  type  which  is  stored  in  the  wage  type.  The  list

makes no sense without having the time type displayed or available for selection.

Premium group (cid:129)

In  the  case  of  time  tickets  in  group  incentives,  this  field  is  used  to  assign  the  time  ticket  to  a

premium group.

Duration

Contains the effective time ticket duration.

Bonuses

This column contains the bonuses that were credited to the time ticket.

Standard time

This column contains the standard time for piece work.  Bonuses are not included!

Performance level

The system calculates the performance level using the standard time, bonuses and duration.  The

standard time is calculated from the quantity *  te + tr. The relevant quantities and whether the  tr is

included are set in the basic settings or wage types.

Cost center

The cost center is transferred from the underlying recorded data.

Wage group

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Quantity

Total quantity used to calculate the standard time. Depending on the Basic settings incentive wage

and the Wage types the yield and scrap quantities of different units of measure are used for this.

Reference

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

LLE-AGP_81.docx

Version: 1.0.23049

Page 13 of 24

Group Bonus Reports (MOC)

Year, month, calendar week, day

You can activate these columns via the column configurator and allow statistical analysis.

Calculated at

The time when the time ticket was calculated by the system.

Tab "Bonus accounts"

The  premium  accounts  are  calculated  customer-specifically  with  the  „Formula-based  premium/

incentive  wage".  You  can  find  further  information  on  premium  accounts  of  time  tickets  in  your

customer documentation.

Order, workplace/machine

Order and workplace/machine are taken from the collected postings, e.g. ADE personnel postings.

Bonus reason

Is completed for time ticket with the time type "Bonus".

te, tr, teb, trb

Requirements for Incentive wage are from the underlying ADE personnel postings.

Comment

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Start, end

Reporting times from the underlying recorded postings.

RPA number (Resource Performance Account)

In  the  case  of  time  tickets  from  production  orders,  the  number  of  the  RPA  from  which  the  time

originates is shown here.

Shift type

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Yield (P) + scrap (P) + rework (P) + outstanding quantity (P)

Primary quantity from the underlying ADE personnel posting.

Tab "Person“:

Selection at the field from the HR master data to generate information and grouping in the table.

Tab "Additional information"

Configured HR master data fields.

Toolbar

Personnel day results

Branching to the time tickets for the selected "Person day".

LLE-AGP_81.docx

Version: 1.0.23049

Page 14 of 24

Group Bonus Reports (MOC)

 Labor Time Maintenance

You can directly go to "Labor time maintenance" to edit time in the Personnel Time Management.

Order-related postings

This button directly opens the order-related posting dialog to correct or analyze times of the Shop

Floor Data Collection module.

LLE-AGP_81.docx

Version: 1.0.23049

Page 15 of 24

Group Bonus Reports (MOC)

5  Group performance development

Overview

Menu

Human  resources  management    Incentive  wage    Group  performance
records

Transaction code

pergd

Function authorization

pergd.*

This  application  shows  you  the  daily  results  of  the  premium  groups.    This  evaluation  can  display  the

performance of one or more premium groups over time in tabular and graphical form . The performance is

displayed per group and day.

Selection criteria

Name of the Premium groups

You can filter the Premium group names with wildcards.

LLE-AGP_81.docx

Version: 1.0.23049

Page 16 of 24

Group Bonus Reports (MOC)

Field descriptions

The  meaning  of  the  other  fields  corresponds  to  that  of  the  Monthly  group  performance  application  and

represents the calculated  Results of Group incentives for the relevant day.

Year, month, week, weekday

These columns can be displayed if required and allow for statistic summarizations.

Adding performance level

The  performance  level  of  the  Total  lines  are  calculated  with  the  columns  Standard  time  and

Duration.    For  a  meaningful  summarized  display  of  the  performance  level,  all  types  of  group

bonuses used must be structured in such a way that the performance level can also be generated

in  summary  form  as  a  quotient  of  the  Standard  time  and  Duration.  This  is  guaranteed  for  the

standard types like Incentive and Utilization bonus. Any other bonus types must be customized like

customer-specific bonus types with "formula-based premiums/performance wages".

Detail applications

Table details

Data  display  from  the  selected  table  row  The  meaning  of  the  other  fields  corresponds  to  that  of  the

Monthly group performance application and represents the calculated  Results of Group incentives for the

relevant day.

LLE-AGP_81.docx

Version: 1.0.23049

Page 17 of 24

Graphic 1

Display of the table content as a line chart.  This chart enables you to detect time trends.

Group Bonus Reports (MOC)

Graphic 2

Display  of  the  table  content  as  a  three-dimensional  bar  chart.    This  is  a  good  way  of  conducting

comparisons.

LLE-AGP_81.docx

Version: 1.0.23049

Page 18 of 24

Group Bonus Reports (MOC)

Pivot table

You  can  use  the  pivot  table  to  make  evaluations  of  the  available  summarization  criteria.  The  result

column is displayed in graphic form.

LLE-AGP_81.docx

Version: 1.0.23049

Page 19 of 24

Group Bonus Reports (MOC)

6  Monthly Group Performance

Summary

Menu

Human  Resources  Management    Incentive  Wages    Monthly  Group
Performance

Transaction code

pergm

Function authorization

pergm.*

This application shows the results of premium groups for a selected month.

Selection Criteria

Year, month

Year  and  month  are  preassigned  to  the  previous  month.  If  data  relating  to  the  past  is  requested

long term data, which has already been archived, is automatically accessed, if required.

LLE-AGP_81.docx

Version: 1.0.23049

Page 20 of 24

Group Bonus Reports (MOC)

Field Descriptions

Please  note  that  if  the  “premium/incentive  wage  based  on  formulas”  is  in  use  it  might  be  the

case  that  the  described  fields  deviated  from  the  standard  or  that  not  all  of  the  fields  are

assigned to reasonable values.

Premium group, designation, type

Premium group data.

Performance level

Final  result  as  performance  level  or  rate  of  capacity  utilization  according  to  the  rules  of  group

premiums in percent. Even for customer-specific premium forms with the “premium wage/incentive

wage  based  on  formulas”  the  performance  level  is  shown  as  final  result  in  summary  as  it  is

displayed in the graphic view.

Standard time

The standard time computed from the standard times te, tr  and the produced quantity is displayed

for  incentive  bonuses  and  utilization  bonuses.  Order  postings  at  machines  of  the  premium  group

are the basis for the produced quantity. In general a standard time, which results in the computation

of  the  incentive  bonus,  is  indicated  even  for  customer-specific  premium  types  with  the

“premium/incentive wage based on formulas”.

Duration

The  entire,  personal  processing  time  according  to  the  above  formula  is  included  for  the  incentive

bonus.  This  is  the  machine  scheduling  time  for  the  utilization  bonus.  In  general  a  duration,  which

results in the computation of the performance level, is indicated even for customer-specific premium

types with the “premium/incentive wage based on formulas.

Bonuses

This  is  the  total  of  assigned  bonuses  and  deductions  for  incentive  bonuses.  When  it  comes  to

utilization bonuses the column includes the numbers 1 to 99.

Credit note

When  it  comes  to  the  utilization  bonus,  the  column  includes  the  bonuses  ranging  between  the

numbers 100 to 9999. This column is irrelevant for incentive bonuses.

Unproductive time

With  utilization  bonus:  Total  of  the  durations  of  unauthorized,  unproductive  overhead  cost  order

postings. This column is irrelevant for incentive bonuses.

Downtime

With  utilization  bonus:  Total  of  the  durations  of  approved,  unproductive  overhead  cost  order

postings.  Authorization is  given  by reposting the times to the resource performance account “UB”

by the foreman. This column is not included in the computation of performances and has only been

designed for information purposes. This column is irrelevant for incentive bonuses.

LLE-AGP_81.docx

Version: 1.0.23049

Page 21 of 24

Group Bonus Reports (MOC)

Premium average

With incentive bonus. Total of all personal overhead cost time including operation numbers the first

character of which is less than 5 (e.g. OPs ranging between 0000 and 4999 for operation numbers

that are four characters long). This column is irrelevant for utilization bonuses.

Waiting time

With  incentive  bonus:  Total  of  all  personal  overhead  cost  times  including  operation  numbers  the

first character of which is greater than or equal to 5 (e.g. OPs ranging between 5000 and 9999 for

operation numbers that are four characters long). This column is irrelevant for utilization bonuses.

Premium accounts

Customer-specific  computations  are  made  in  premium  accounts  if  the  “premium/incentive  wages

based on formulas” function is in use. No premium accounts are filled by default.

Date from, date to

Evaluation period

Detailed  data  on  individual  days  and  even  on  individual  HYDRA-ADE  postings  that  are  included  in  the

computation of these monthly results can be found in the “daily group performance” application.

Detail Applications

The bar chart displays and compares the performance levels of premium groups and premium areas, if

necessary.

LLE-AGP_81.docx

Version: 1.0.23049

Page 22 of 24

Group Bonus Reports (MOC)

7  Personal Group Participation

Summary

Menu

Human  Resources  Management  -->  Incentive  Wages  -->Personal  Group
Participation

Transaction Code

pgpart

Function authorization

pgpart.*

This application shows the times which individual people have worked in the single premium groups. This

helps to prove every month from which premium group the people receive which kind of group bonus.

The  labor  times  are  based  on  the  time  tickets  assigned  to  the  "group  premium"  time  type  and  are

recalculated every time the list is opened.

Selection criteria

Year, month

The year and month fields are preassigned to the previous month. If data is requested in the past

long-term data of the archived data area is automatically accessed, if required.

LLE-AGP_81.docx

Version: 1.0.23049

Page 23 of 24

Group Bonus Reports (MOC)

Field Descriptions

Personal group participation [hours]

Labor times are based on the time tickets assigned to the "group bonus" time type.

The  meaning  of  the  other  fields  corresponds  to  that  of  the  monthly  group  performance  application  and

represents the computed results for the group bonus for the corresponding day.

LLE-AGP_81.docx

Version: 1.0.23049

Page 24 of 24

