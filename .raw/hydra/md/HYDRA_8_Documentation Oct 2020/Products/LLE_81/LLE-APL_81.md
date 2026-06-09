Manual

Premium/ Incentive Wage
Reports (MOC)
LLE-APL 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Premium/ Incentive Wage Reports (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

LLE-APL_81.docx

Version: 1.0.23049

Page 2 of 36

Premium/ Incentive Wage Reports (MOC)

Contents

1  Premium/ Incentive Wage Reports - Overview ............................................ 4

2  Bonus Reasons ............................................................................................ 5

3  Wage Type Determination ........................................................................... 8

4  Configuration of message listings .............................................................. 13

5  Bonuses ..................................................................................................... 15

6  Record Listing ............................................................................................ 19

7  Message list  Overview .............................................................................. 26

8  Time tickets ................................................................................................ 29

9  Personnel day results ................................................................................. 33

LLE-APL_81.docx

Version: 1.0.23049

Page 3 of 36

Premium/ Incentive Wage Reports (MOC)

1  Premium/ Incentive Wage Reports - Overview

Purpose

This function packet contains the user interface with reports, planning functions and master data for the

function packet Calculating premium/ incentive wages.

Features

Results of premium and incentive wage calculations are displayed in the form of reports, lists and easy to

read presentations:

  Definition of rules used to determine wage type, e.g. based on machine, order type or person

  Time limits on rules, e.g. during on-the-job machine training or maternity leave.

  Configuring reasons for bonuses and deductions using compensation control

  Update function for bonuses and deductions within the piecework calculation

  Lists of personal BDE documents that provide the data for wage calculation

  Listing  of  individually  calculated  time  tickets  including  the  performance  efficiency  rate  for  each

processed order.

  Presentation of workday results for all people

  Configurable messages listing of irregularities during wage calculation plus correction notes

LLE-APL_81.docx

Version: 1.0.23049

Page 4 of 36

Premium/ Incentive Wage Reports (MOC)

2  Bonus Reasons

Summary

Menu

Master Data  Incentive Wages  Bonus Reasons

Transaction code

bonrea

Function authorization

bonrea.*

Bonus reasons are configured in this application.

LLE-APL_81.docx

Version: 1.0.23049

Page 5 of 36

Premium/ Incentive Wage Reports (MOC)

Selection Criteria

The application provides the following selection criteria:

Show authorized entries only

Bonus  reasons  are  assigned  to  a  responsibility  area.  If  this  option  is  checked  only  those  bonus

reasons are displayed for which the user has the corresponding responsibility area authorization for

editing.  Provided  that  the  option  is  not  active,  all  other  bonus  reasons  may  be  displayed  but  not

edited.

Field Descriptions

Reason, designation

Number and description of the bonus reason.

Affects

Affects target time or actual time when group bonuses are computed. Consequently, the bonus is

processed  as  credit  above  the  fraction  line  (target  time)  or  below  the  fraction  line  (actual  time),

when the performance efficiency rate is calculated for the premium group.

This option does not affect bonuses for individual piecework. These bonuses/deductions are always

charged to the standard time of piecework.

Posting indicator

Optional  input.  If  this  field  includes  “-AKK”  bonuses/deductions  with  this  bonus/deduction  reason

are  not  offset  with  piecework  time  tickets.  This  allows  for  any  data  to  be  recorded  with

bonuses/deductions, which exactly is not to be charged to piecework time tickets. The field is also

used in premium/incentive wages based on formulas.

Responsibility area

Responsibility area to check authorizations. The responsibility area may also remain empty.

BDE authorization

If the bonus is  entered by  operators at the terminal:  Authorization level for terminal postings. The

person  sending  the  posting  must  at  least  have  the  authorization  level  that  is  entered  here.  If  no

authorization level is entered the person sending the posting must at least be assigned to level 3.

Authorization required

If the bonus is entered by operators at the terminal:

If this option is checked the bonus requires approval if it is entered at the terminal.

If  the  bonus  is  entered  by  an  administrator  at  the  HYDRA  client  it  is  automatically  considered  as

being approved.

LLE-APL_81.docx

Version: 1.0.23049

Page 6 of 36

Premium/ Incentive Wage Reports (MOC)

Allocate if still subject to authorization

If the bonus is entered by operators at the terminal: If this option is checked the bonus is allocated

for the computing of wages even if it is still subject to authorization. If the option is not checked

bonuses that are subject to authorization are only allocated, once they have been approved.

LLE-APL_81.docx

Version: 1.0.23049

Page 7 of 36

Premium/ Incentive Wage Reports (MOC)

3  Wage Type Determination

Overview

Menu

Master data  Incentive wage  Wage type determination

Transaction code

wtdet

Function authorization  wtdet.*

You  use  the  Wage  type  determination  to  assign  the  wage  type  to  the  time  tickets  that  are  allocated

individually  for  each  person.  To  identify  the  relevant  wage  type,  you  create  a  set  of  rules  that  are

processed in a specified sequence. Using these rules, the wage type is identified which then controls the

further calculation of the incentive wage.

Example and explanation

Sequence 100: wage type from posting

The combination */* as reference/value means that this first rule uses the wage type of the original

posting.  With  BDE  personnel  postings,  this  is  the  wage  type  that  has  been  passed  from  the

operation to the personnel posting when the personnel posting has been recorded.

Sequence 110: wage type from operation if wage type is empty

The combination wage type/"" (empty) as reference/value means that this second rule only applies

if  the  time  ticket  does  not  yet  have  a  wage  type.  In  this  case,  the  wage  type  of  the  operation  is

passed to the time ticket. If the posting does not include an operation or if the operation does not

include a wage type, the wage type of the time ticket remains empty.

LLE-APL_81.docx

Version: 1.0.23049

Page 8 of 36

Premium/ Incentive Wage Reports (MOC)

Sequence 120: assign wage type 4100 for overhead operations

This rule has the effect that wage type 4100 is assigned to all BDE personnel postings that include

an overhead cost operation, regardless the wage type that is currently specified for the time ticket.

The category of the BDE order type specifies if it is an overhead cost operation.

The special function authorization "wtdet_foreman" has been created for users who must make

small changes to the Wage type determination in the day-to-day business to integrate specific

exceptional  situations.  It  is  a  limited  function  authorization.  Users  with  this  function

authorization have less rights than users without this limited function authorization.

Users with the function authorization "wtdet_foreman" can only edit the following rules:

•

•

Conditions for persons, machines, machine groups or premium groups

Sequences from 500 to 600

With  this  function  authorization,  the  user  can  remove  single  persons  or  machines  from  the

piecework or the group incentives. The user can view other data records, but not edit them. The

system  rejects  unauthorized  editing  attempts  and  issues  the  error  message  No.  1923  "Not

authorized for this sequence or condition".

If you want to create and edit system configurations for sequences below 500 and above 600,

the user must be the system administrator (without the function authorization "wtdet_foreman").

The initial data of the system contain the function authorization "wtdet_foreman" in the function

profile "LLE user". Use the function profile "LLE admin" for users who must be fully authorized.

The function profile "LLE admin" includes all authorizations of the profile "LLE user".

Optionally,  you  can  also  delete  the  function  authorization  "wtdet_foreman"  from  the  function

profile "LLE user".

Field description

Sequence

The  rules  are  processed  according  to  the  specified  sequence.  If  several  rules  contain  the  same

entry in field Sequence, then the sorting is performed using the condition/value 1 to 5, the source of

the wage type and the wage type.

Comment

Free comment field

Valid from/until

You can use these two fields to limit the validity period of rules.

LLE-APL_81.docx

Version: 1.0.23049

Page 9 of 36

Premium/ Incentive Wage Reports (MOC)

Assign wage type

This  setting  specifies  the  wage  type  that  is  assigned  to  the  time  ticket  if  the  rule  is  applied

(according to the specifications made).

The specified wage type: the wage type specified in the field below is assigned.

From posting: the wage type passed with the posting is assigned. The posting itself is based on

the time ticket. The wage type is usually the wage type of the BDE personnel posting.

From  operation:  the  wage  type  stored  with  the  operation  is  identified  and  assigned  to  the  time

ticket.

From HR master data: the wage type stored in the  HR master data is identified and assigned to

the time ticket.

If – conditions 1 to 5

Using up to five conditions, you can control when the rule is applied. All conditions specified must

be true. Only then the rule comes into effect. The following conditions with the respective values are

Available with function
authorization
wtdet_foreman

X

X

X

X

available:

Reference

Value

Machine

Machine number

Machine group  Machine group

Person

Personnel number

The person's
cost center

Cost center of the person defined in the HR
master

Cost center of
the posting

Premium group

Cost center of the posting

Premium group
The value "*" is permitted. This means that the
rule always applies, if a premium group is
entered in the posting.
The value "" (empty) is also permitted. This
means that the rule applies, if no premium
group is entered in the posting.

Premium
indicator

Premium indicator defined for the person in the
HR master

Incentive wage
indicator

Piecework
indicator

Order type

Incentive wage indicator of the machine

Piecework indicator of the operation

Order type (e.g. is used to assign overhead
cost orders to a different wage type)

Category order
type

Order type category (e.g. is used to assign
overhead cost orders to a different wage type)

LLE-APL_81.docx

Version: 1.0.23049

Page 10 of 36

(cid:129)

Premium/ Incentive Wage Reports (MOC)

Premium group
type

Wage type

(none)

Premium group type

Wage type
Wage type that has been assigned to the
posting up to now (for changes). Empty value
is permitted.

Always
This reference does not restrict the rule, the
rule always applies.

LLE-APL_81.docx

Version: 1.0.23049

Page 11 of 36

Premium/ Incentive Wage Reports (MOC)

Editing functions

The following dialog opens to edit a data record:

LLE-APL_81.docx

Version: 1.0.23049

Page 12 of 36

Premium/ Incentive Wage Reports (MOC)

4  Configuration of message listings

Overview

Menu

Master data  Labor time  Configuration of message listings

Transaction code

ptmc

Function authorization

ptmc

As  individual  messages  from  the  day  and  month  evaluations  are  rated  with  varying  importance  by

different  customers  and  some messages  should  not  be  shown  at  all,  you  can  configure  the  contents  of

the message lists individually.

Use the Configuration of message listings to combine the messages in user-defined lists.

Purpose

You can choose from the following two options to configure a new message list:

1.  Create a new list and add the single messages.

2.  Copy an existing list and delete the messages that are not required.

LLE-APL_81.docx

Version: 1.0.23049

Page 13 of 36

Premium/ Incentive Wage Reports (MOC)

Field descriptions

Message listing

Number of the message list.

Use  the  message  listing  999  to  configure  the  messages  that  are  displayed  in  the  labor

time  maintenance.  Use  the  message  listing  998  to  specify  the  messages  that  are

displayed when you open the message listing in the monthly evaluation.

Message

Message to be displayed in the list.

The  messages  are  generated  by  the  labor  time  calculation  and/or  monthly  evaluation.  You

cannot add custom messages.

LLE-APL_81.docx

Version: 1.0.23049

Page 14 of 36

Premium/ Incentive Wage Reports (MOC)

5  Bonuses

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

LLE-APL_81.docx

Version: 1.0.23049

Page 15 of 36

Premium/ Incentive Wage Reports (MOC)

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

Reason for which the bonus/deduction has been assigned. The  configuration of bonus reasons is

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

LLE-APL_81.docx

Version: 1.0.23049

Page 16 of 36

Premium/ Incentive Wage Reports (MOC)

Editing Functions

The below window opens in which a data record can be edited:

Toolbar

 Authorize

Function authorization: bonus.sign

Sign bonus.

LLE-APL_81.docx

Version: 1.0.23049

Page 17 of 36

Bonuses entered at the terminal might be subject to authorization if this is configured at the  bonus

Premium/ Incentive Wage Reports (MOC)

reason.

 Reject

Function authorization: bonus.reject

Reject bonus. The bonus is not allocated in this case.

Bonuses entered at the terminal might be subject to authorization if this is configured at the  bonus

reason.

LLE-APL_81.docx

Version: 1.0.23049

Page 18 of 36

Premium/ Incentive Wage Reports (MOC)

6  Record Listing

Summary

Menu

Human resources management  Incentive wages  Record listing

Transaction code

reclis

Function authorization

reclis.*

The record listing displays the ADE personnel postings and the bonuses for people. It provides a preview

of the results of the wage calculation to be expected. The documents are provided with an identifier for a

time  type  with  which  the  payment  type  is  visible.  Users  in  payroll  accounting  and  the  employees

themselves use the record listing as evidence of the order processing performed.

From the record listing, ADE personnel postings can be modified, created and deleted using a simplified

editing dialog. The simplified editing dialog is also the basis for the subsequent entry function in labor time

maintenance.

For times related to piecework, the standard time, the actual time and the resulting performance efficiency

rate  are  indicated  as  percentages.  However,  bonuses  and  reductions  are  not  yet  considered  in  this

performance efficiency rate calculation!

PLEASE NOTE:

The record listing does not cover all of the possible calculation rules for the wage calculation and it also

does  not  include  all  customer-specific  rules  of  the  customer-specific  payment  forms  when  using  the

formula based incentive wages. It is a simplified preview based on the collected basic data.

LLE-APL_81.docx

Version: 1.0.23049

Page 19 of 36

Premium/ Incentive Wage Reports (MOC)

Field descriptions

The  data  displayed  corresponds  with  the  ADE  personnel  postings,  the  bonuses  and  the  associated

master  data  of  machines,  orders  and  bonus  reasons.  There  is  an  independent  display  for  the  following

fields in the record list:

Time type

For bonuses, the time type is "Bonus". For ADE personnel postings with a premium group, the time

type  is  "Group  incentives".  For  other  ADE  personnel  postings,  the  time  type  of  the  wage  type  is

displayed.

Daily assignment: collection

Shift date from the ADE collection

Daily assignment: wage

Intelligent  daily  assignment,  including  personnel  time  management.  This  data  field  is  set  by  the

PZW  day  evaluation  and  the  wage  calculation  and  it  provides  a  connected  and  consistent

consideration of the night shift, even with irregular working times. If this field is empty, the date from

the "Daily assignment: collection" field applies for the wage as well.

LLE-APL_81.docx

Version: 1.0.23049

Page 20 of 36

Premium/ Incentive Wage Reports (MOC)

Standard time

ADE personnel postings:

The standard time is calculated from yield, te and, depending on the basic settings, from scrap and

if necessary tr as well.

Bonus:

The bonus is displayed in this column if the bonus reason affects the target time.

Labor utilization

ADE personnel postings:

Labor utilization of ADE personnel postings (total of all resource performance accounts, except for

“breaks”).

Bonus:

The  bonus  is  displayed  in  this  column  if  the  bonus  reason  affects  the  actual  time.  Since  these

bonuses normally reduce the actual time, these bonuses are displayed with a  reversed algebraic

sign.

Performance level

The performance level is calculated in a simplified way from the calculated standard time and the

labor  utilization  of  the  ADE  personnel  posting.  For  this  reason,  it  does  not  always  equal  the

performance level of the resulting time ticket.

For the record list, this is a display function of the collected data. For this reason, the calculated

results displayed are to be viewed as independent and simplified calculated information and do

not necessarily equal the final results of the incentive wage calculation.

LLE-APL_81.docx

Version: 1.0.23049

Page 21 of 36

Premium/ Incentive Wage Reports (MOC)

Editing functions

This function allows for ADE personnel postings to be edited. However, bonuses cannot be edited here.

They have to be kept using the bonuses application.

The below window opens to edit ADE personnel postings:

LLE-APL_81.docx

Version: 1.0.23049

Page 22 of 36

Premium/ Incentive Wage Reports (MOC)

LLE-APL_81.docx

Version: 1.0.23049

Page 23 of 36

Premium/ Incentive Wage Reports (MOC)

This  is  a  simplified  maintenance  function  for  ADE  personnel  postings.  The  fields  are  described  in  the

standard function.

The  simplified  maintenance  function  makes  the  subsequent  manual  entry  of  ADE  personnel  postings

easier.

LLE-APL_81.docx

Version: 1.0.23049

Page 24 of 36

Premium/ Incentive Wage Reports (MOC)

LLE-APL_81.docx

Version: 1.0.23049

Page 25 of 36

Premium/ Incentive Wage Reports (MOC)

7  Message list

Overview

Menu

Human Resources Management  Maintenance  Messages listing

Transaction code

ptml

Function authorization

ptml

The  message  list  displays  messages  for  personnel  time  calculation,  monthly  calculation,  and  incentive

wage calculation..

The messages generated by the "Messages list" can be differentiated by the three colors.

1.  The messages highlighted in red reading  "Erroneous clocking sequence", shows errors that

must be corrected so that the labor time calculation for the day in question can be processed

without errors.

LLE-APL_81.docx

Version: 1.0.23049

Page 26 of 36

Premium/ Incentive Wage Reports (MOC)

2.

If there is a message highlighted in blue, e.g. "Wage type posting subject to authorization" are

warnings that have an effect on the posting. These messages can be processed, but are not

mandatory.

3.  The  black  colored  messages  e.g.  "Comes  too  early"  are  only  an  information  message  and

have to be read.

Purpose

Selection criteria

The application provides the following selection criteria:

Message listing

You  can  use  the  number  of  the message  list  to  access  various  Configuration  of message  listings

lists that have been defined.

Field descriptions

Posting

The messages are identified by the following processing steps and are described in the following:

  Process of labor time calculation

  Processing monthly calculations



Incentive pay calculation

Posting details

The fields "Posting details" shows further posting details.  For example, the message details in the

example " Erroneous clocking sequence" inform you that the clock-in has taken place at 08:00 and

that the clock-out is missing.

LLE-APL_81.docx

Version: 1.0.23049

Page 27 of 36

Premium/ Incentive Wage Reports (MOC)

Toolbar

Labor time maintenance

Calls  the  Labor  time  maintenance  for  the  selected  person.  Labor  time  maintenance  can  also  be

called by double clicking on the posting in the message listing table.

Personnel scheduling

Calls the Personnel scheduling for the selected person.

Order-related postings

Click this button to call the Order-related postings.

 Send e-mail

Provided that an e-mail address is defined for the selected person in the HR master, an e-mail may

be generated by clicking this button, which is addressed to this person.

 Send e-mail to supervisor

If  a  supervisor  with  an  e-mail  address  is  stored  for  the  selected  person  in  the  HR  master  record,

you can use this button to generate an e-mail whose addressee is the superior.

LLE-APL_81.docx

Version: 1.0.23049

Page 28 of 36

Premium/ Incentive Wage Reports (MOC)

8  Time tickets

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

LLE-APL_81.docx

Version: 1.0.23049

Page 29 of 36

Premium/ Incentive Wage Reports (MOC)

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

LLE-APL_81.docx

Version: 1.0.23049

Page 30 of 36

Premium/ Incentive Wage Reports (MOC)

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

LLE-APL_81.docx

Version: 1.0.23049

Page 31 of 36

Premium/ Incentive Wage Reports (MOC)

 Labor Time Maintenance

You can directly go to "Labor time maintenance" to edit time in the Personnel Time Management.

Order-related postings

This button directly opens the order-related posting dialog to correct or analyze times of the Shop

Floor Data Collection module.

LLE-APL_81.docx

Version: 1.0.23049

Page 32 of 36

Premium/ Incentive Wage Reports (MOC)

9  Personnel day results

Overview

Menu

Human resources management  Incentive wage  Personnel day results

Transaction code

perpd

Function authorization

perpd.*

The  application  "Personnel  day  results"  offers  an  overview  of  incentives  relating  to  individual  persons.

The "Personnel day results" application adds up information from the time ticket of the relevant person.

The evaluation lists one line per person and day and displays the result in a summarized form for the day.

The evaluation is used to check piecework results of the employee.

Only persons are displayed on the system who are actually working at the company.  Also, only persons

are  displayed  that  have  an  LLE  premium  indicator  attached.    Person  days  with  a  value  for  the  result

columns are always displayed, even if the person has already left or does not have a premium indicator.

LLE-APL_81.docx

Version: 1.0.23049

Page 33 of 36

Premium/ Incentive Wage Reports (MOC)

Field descriptions

Performance level

The performance level is calculated from the standard time and duration.

Duration

The duration includes the actual time to calculate the daily performance efficiency rate.

The  actual  time  depends  on  the  setting  for  the  "Incentive  wages"  in  the  field  "Piecwork  calc.  of

perf.eff.rate" of the set calculation time for the "Daily perf. effc. rate":

Only in the BDE:

Contains the sum of the actual time of the daily piecework time tickets.

From BDE and PZE

The actual time for piecework is calculated  daily from the PZE time of the person minus the time

that is collected on other time tickets.

Times of the time ticket types are deducted in the PZE time which are:

Time wage

On-the-job training

Overhead costs

Waiting times

Group premiums The remaining time is the actual time to calculate piece work in the person day

results.

The  PZE  time  Tpze  derives  from  the  time  ticket  with  the  time  type  "Attendance".  These  are

generated as follows:

1. If there is a wage type with an activated indicator "Personnel time for incentive wage", then the

PZE time derives from the "PZE wage type postings" and is the sum of all wage types with active

indicator "Personnel time for incentive wage".

2. If there is no wage type with the indicator "Personnel time for incentive wage", then the PZE time

is taken from the PZE daily result.

Standard time

The column includes the standard time from the piecework tickets.  It also contains the bonuses.

LLE-APL_81.docx

Version: 1.0.23049

Page 34 of 36

%100DauertVorgabezeiradLeistungsgGRPKARGKEAZLpzeTTTTTTIstzeit

Premium/ Incentive Wage Reports (MOC)

Time ticket duration

This is the duration of all time tickets of an employee per day. An exception is the time ticket with

the time type "Attendance".

PZE time

Duration from time tickets of the time type "Attendance".

BDE time

This column is not filled in the standard.

Start, end

This time period shows the time tickets from this person's BDE postings.

Max. perform. level, min. perform. level

You can find in this colum the min. and max. performance level from the piecework time ticket for a

specific person on this day.  This allows outliers to be found quickly.

Archived

Archived, daily results cannot be recalculated.

Year, month, calendar week, day

You can activate these columns with the column configurator and get a statistical view.

Toolbar

Time tickets

Branching to the time tickets for the selected "Person day".

Labor time maintenance

You can directly go to "Labor time maintenance" to edit time in the Personnel Time Management.

Order-related postings

This button directly opens the order-related posting dialog to correct or analyze times of the Shop

Floor Data Collection module.

LLE-APL_81.docx

Version: 1.0.23049

Page 35 of 36

Premium/ Incentive Wage Reports (MOC)

Detail applications

There  is  a  pivot  table  integrated  in  the  detail  panel.    This  pivot  table  can  be  used  to  create  summary

reports based on the data displayed in the table.

LLE-APL_81.docx

Version: 1.0.23049

Page 36 of 36

