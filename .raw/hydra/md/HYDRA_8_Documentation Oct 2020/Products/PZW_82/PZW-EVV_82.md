Manual

Enhanced Compensation
Rules
PZW-EVV 8.2

Version 1.0.15655

Last changed on: 19.06.2020

Enhanced Compensation Rules

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PZW-EVV_82.docx

Version: 1.0.19468

Page 2 of 18

Enhanced Compensation Rules

Contents

1  Enhanced Compensation Rules - Overview ................................................ 4

2  Leave Entitlement ........................................................................................ 5

3  Payment Depending on Shift Type .............................................................. 7

4  Periods for Overtime Calculation ................................................................. 9

5  Additional Allowances Rule ........................................................................ 12

6  Wage Type Relations ................................................................................. 15

PZW-EVV_82.docx

Version: 1.0.19468

Page 3 of 18

Enhanced Compensation Rules

1  Enhanced Compensation Rules - Overview

Purpose

Application Service to define extended compensation rules and posting rules

Implementation Considerations

Use this function package to:

  define leave entitlement depending on an employee's age or staff membership time;





compensate overtime on a weekly basis (or on the basis of a different period);

control wage types depending on employee attendance or other wage types.

Integration

This function package  can only be used if HYDRA is used for time management (function package Time

and Labor Data Evaluation).

Features

  Leave entitlement

o  Recording  annual  leave  entitlement  optionally  depending  on  employee  age  or  staff

membership time

  Payment depending on shift type

o  Defining different payment rules depending on shift worked

  Overtime compensation on a weekly basis

o  Optional compensation of overtime on a weekly basis or based on another period

  Additional allowances rules

o  Posting  wage  types  for  additional  allowances  (e.g.  travel  cost)  depending  on  the  initial

wage type duration

  Wage types relations

o  Rules  to  repost,  summarize  or  delete  wage  types  depending  on  the  initial  wage  type

duration

PZW-EVV_82.docx

Version: 1.0.19468

Page 4 of 18

Enhanced Compensation Rules

2  Leave Entitlement

Summary

Menu

Master Data --> Labor Time --> Leave Entitlement

Transaction code

plen

Function authorization

plen

The leave entitlement may be defined for different groups of employees, subject to their staff membership

or age. But the leave entitlement may also be defined for such groups without any dependencies.

Field descriptions

Company

Restricts  the  leave  entitlement  to  a  particular  company.  If  this  field  remains  without  an  entry,  the

leave entitlement applies for all companies.

PZW-EVV_82.docx

Version: 1.0.19468

Page 5 of 18

Enhanced Compensation Rules

Personnel selection, value

The  personnel  selection  field  specifies  whether  the  leave  entitlement  is  to  be  configured  for  a

person  or  a  group  of  employees.  The  available  employee  groups  include  area,  cost  center,

department,  personnel  number,  employee  subgroup,  activity  and  salaried/non-salaried  employee.

The value for the personnel selection field is defined within the "value" field. The leave entitlement

applies to all employees if no selection is made.

Reference, value

Leave entitlement may either be planned subject to the age or staff membership. The employee's

age and/or staff membership on January 1st is used in each case. If there are configurations for the

age  and  for  the  staff  membership,  the  first  applicable  configuration  takes  priority.  If  both

configurations are applicable, the leave entitlement specified for the age will be used.

Leave entitlement

The  values  of  the  fields  Annual  leave,  Special  leave  and  Additional  leave  will  be  entered  in  the

relevant fields of the HR master and credited to the employee's leave account (4th account when

defining accounts) on  1st January.  Any changes made to the entitlement to  annual  leave, special

leave or additional leave are only reflected in the leave account when the labor time calculation for

the 1st January is started.

Leave entitlement may only be entered with a maximum of one decimal place, regardless

of whether the leave account is kept as day account or time account.

Valid from, to

These two fields restrict the validity of the leave entitlement to a specific period of time. If only one

of these two fields is filled out, the entry is either valid from or until that date.

Priority

If  leave  entitlement  is  defined  for  different  employee  groups  and  more  than  one  of  these

configurations applies to a single employee, the priority determines which entry has precedence.

The corresponding entitlement is taken from the HR master, if one of the fields for entitlement to

annual  leave,  additional  leave  or  special  leave  is  left  empty.  This  allows,  for  example,  for  the

annual leave entitlement to be specified by configuration and the additional leave entitlement for

severe disability to be edited using the HR master.

PZW-EVV_82.docx

Version: 1.0.19468

Page 6 of 18

Enhanced Compensation Rules

3  Payment Depending on Shift Type

Summary

Menu

Human Resources Management  Models  Payment Depending on Shift
Type

Transaction code

past

Function authorization

past

The “payment depending on shift type” option allows for payment day types to be defined subject to the

shift type. Consequently, it is possible to use different payment models for early shift and night shift.

If the day type entered in the “from payment” column is planned for a person and this person worked in

the shift type that is entered in the “for shift type” column the day type entered in the “to payment” column

will be used for payment:

Utilization

This function is used  if payment for the single shifts is different and the shift rhythm cannot be planned

properly due to frequent changes.

The shift type payment is also processed for absences. This allows for absences to be allocated

subject to the shift type.

PZW-EVV_82.docx

Version: 1.0.19468

Page 7 of 18

Enhanced Compensation Rules

Field Descriptions

“From payment” day type

Number of the payment day type for which the configuration applies.

For shift type

If this shift type occurs the first payment day type will be converted to another one.

“To payment” day type

Day type to which the first day type is to be converted.

PZW-EVV_82.docx

Version: 1.0.19468

Page 8 of 18

Enhanced Compensation Rules

4  Periods for Overtime Calculation

Summary

Menu

Master Data  Labor Time  Periods for Overtime Calculation

Transaction code

ptop

Function authorization

ptop

The periods for overtime calculation are defined in this dialog.

Utilization

Overtimes may be compensated on the level of days, weeks or settlement periods. The selected period

affects the process of evaluations:

-  Overtime compensation on a daily basis has the advantage that wage types are evaluated quickly

and  posted  clearly.  Provided  that  no  urgent  reasons  in  favor  of  longer  periods  are  available,  we

recommend to configured the “daily” period.

PZW-EVV_82.docx

Version: 1.0.19468

Page 9 of 18

Enhanced Compensation Rules

-  Overtime  compensation  on  a  weekly  basis  is  used  if  weekly  remuneration  rules  are  available  and

results  in  overtime  and  reduced  working  hours  to  be  balanced  during  the  week  and  the  result  of

overtime or reduced working time to be compensated at the end of the week using the overtime type

that  is  entered  in  the  HR  master.  The  entire  week  is  recalculated  if  a  clocking  record  changes  as

overtime or reduced working hours might have changed as well. For this reason the daily evaluation

for weekly overtime periods takes a little bit longer.

Examples for weekly remuneration rules:

The first five hours of “overtime” during the week are paid with an overtime bonus of 25%. A bonus

of 50% is paid once five hours of overtime have been exceeded during the week.

-  When it comes to the compensation on the basis of settlement periods the entire settlement period

is recalculated. This kind of settlement is rarely used. Remuneration rules on the basis of settlement

periods are mostly represented by account limits.

Periods for overtime calculation that apply to periods of the past cannot be deleted. Changing of

periods for overtime calculation applying to the past  might lead to errors in the  compensation.

The  validity  end  date  of  the  current  configuration  has  to  be  set  and  a  new  entry  needs  to  be

created to avoid this.

Field Descriptions

Valid, until

Validity  period  to  configure  periods  for  over  time  calculation.  The  configuration  applies  without

restrictions  if  both  fields  remain  empty.  The  validity  end  date  normally  remains  empty  and  is  only

set if the periods for overtime calculation change as of a specific date.

Type

Daily

Daily periods for overtime calculation are configure using this option.

Weekly

This option configures weekly periods for overtime calculation.  Partial periods are generated at the

end of the settlement period if this  option is set. The  results of the first partial  week are taken  into

account, when the second partial week is evaluated. But wage types that have already been posted

are no longer changed.

Settlement periods

If  this  field  is  selected  periods  for  overtime  calculation  are  processed  just  as  it  is  the  case  for

settlement periods.

Periods

If this field is selected configurations for fixed periods can be created.

PZW-EVV_82.docx

Version: 1.0.19468

Page 10 of 18

Enhanced Compensation Rules

Duration of a period

Only enabled for the “periods” type:

Duration of a period in days. “7” is entered here for weekly compensations.

Start of first period

Only enabled for the “periods” type:

Defines on which day the first period is supposed to start for the overtime calculation. This field may

include the following entries:

<Leer>:

The

first  period  starts  on

the  entered  validity  start  date.

Mon/Tue/Wed/Thu/Fri/Sat/Sun:  Weekday

in

the

first  week  after

the  validity  start  date

when the first period starts.

Partial periods at the end of settlement periods

Only enabled for the “periods” type:

If  this  option  is  checked  partial  periods  are  generated  at  the  end  of  the  settlement  period.  The

results of the first partial week are taken into account, when the second partial week is evaluated.

But  wage  types  that  have  already  been  posted  are  not  changed  anymore.  This  configuration  is

required if the settlement is to be made before the second partial week is over.

If this option is disabled the month-end closing may only be performed once the complete week is

over  that  includes  the  two  different  settlement  periods,  as  evaluated  days  of  the  new  settlement

period may affect the data of the previous settlement period.

PZW-EVV_82.docx

Version: 1.0.19468

Page 11 of 18

Enhanced Compensation Rules

5  Additional Allowances Rule

Overview

Menu

Master data  Labor time  Add. allowances rule

Transaction code

atbo

Function authorization

atbo

You  can  use  the  application  Additional  allowances  rule  to  assign  an  additional  bonus  (e.g.  attendance

bonus)  if  employees  work  on  specific  days.  You  can  also  assign  fixed  allowances  for  travel  and

subsistence expenses. A wage type triggers the respective posting. If this wage type (initial wage type) is

used, the system posts a time bonus for the so-called presence wage type. The initial wage type can be

deleted after settlement. To calculate the presence wage type, the time posted for the initial wage type is

used.

PZW-EVV_82.docx

Version: 1.0.19468

Page 12 of 18

Enhanced Compensation Rules

Field descriptions

Initial wage type

When  the  specified  wage  type  is  posted,  the  system  creates  the  presence  wage  type.  You  can

create  several  rules  for  one  initial  wage  type.  In  this  case,  only  the  additional  allowance  rule  with

the highest value in field Duration is processed for this initial wage type.

Reference

You can define additional allowances rules with reference to the duration or to a percentage of the

target or the normal time.

Duration / Percentage

Total time that must be posted at least for the initial wage type on the settlement day. Only if this

minimum is reached, the posting for the presence wage type is performed.

You  can  define  the  required  total  time  as  absolute  duration  or  as  a  percentage  of  the  target  or

normal time.

Delete

All  postings  of  the  initial  wage  type  are  deleted  when  the  rule  has  been  performed  and  are  no

longer available.

Presence wage type

Wage type used to post the time bonus of field Duration.

Duration

Time posted for the presence wage type. The entry has the format hours:minutes.

Alignment

Before:

The posting of the presence allowance ends at the specified time.

To:

The posting of the presence allowance starts at the specified time.

Point in time

Time when the posting of the presence wage type is performed

Midnight:

The posting is performed at 0:00 hours.

Beginning:

The posting is performed at the start of the first posting of the initial wage type.

End:

The posting is performed at the end of the last posting of the initial wage type.

PZW-EVV_82.docx

Version: 1.0.19468

Page 13 of 18

Enhanced Compensation Rules

Authorization required

The posting for the presence wage type requires authorization.

Company

Restricts  the  additional  allowance  rule  to  a  particular  company.  If  no  company  is  entered,  the

additional allowance rule is active for all companies.

Valid from, to

Validity  period  of  the  additional  allowances  rule.  If  both  fields  are  empty,  the  validity  of  the

additional allowance rule is unlimited.

Personnel selection

This field is used to further narrow down the range of validity of a rule. You can select the following

fields  of  the  HR  master  data:  area,  cost  center,  department,  personnel  number,  employee

subgroup,  activity  and  employment  relationship  (salaried/non-salaried  employee).  If  you  have

selected a criterion, a further field is displayed where you can enter the relevant value.

PZW-EVV_82.docx

Version: 1.0.19468

Page 14 of 18

Enhanced Compensation Rules

6  Wage Type Relations

Summary

Menu

Master data Labor time Wage types relations

Transaction code

wtia

Function authorization  wtia

This module can be used to configure relations between wage types.

PZW-EVV_82.docx

Version: 1.0.19468

Page 15 of 18

Enhanced Compensation Rules

Usage

When hiding, only the  "stronger"  wage type  will  be  maintained  if there  are two  wage types  in the same

time. Example:

When two wage types are comprised to a third one, the period during which the corresponding wage type

postings will overlap, will be posted with the third wage type. Example:

A transfer posting of a wage type is used to repost the posting of one wage type to another one. This is

useful in connection  with the selection of the area of validity of the rules for "company" and "selection".

Reposts can effect for example that different wage types are posted for salaried employees than for non-

salaried  employees.  This  is  possible  using  reposts  of  corresponding  validity  criteria  without  having  to

change two different payment day types.

The deletion  of a wage type is used to delete remaining auxiliary  wage types again so that they  will no

longer be shown in the display of the user interface.

PZW-EVV_82.docx

Version: 1.0.19468

Page 16 of 18

Enhanced Compensation Rules

Field descriptions – Wage types relations tab

Processing

This is used to select whether a wage type is summarized, hidden, reposted, deleted or copied.

Initial wage type

In hiding, the "strong" wage type will be shown here; for a summary this would be the first source

wage  type,  for  of  a  deletion  the  wage  type  to  be  deleted,  for  of  a  repost  the  wage  type  to  be

reposted and for of a copy the wage type to be copied.

Initial wage type 2

In hiding, the "weak" wage type will be shown here and  for of a summary the second initial wage

type.

Target wage type

For of a summary, repost or copy the target wage type will be shown here. No entry will be made

into this field when hiding and deleting.

Sequence

A number can be assigned to each wage type relation. The rules will be processed in the order of

the numbers and also be shown as such on the screen.

Duration from, to

These  fields  allow  to  restrict  the  wage  type  relation  to  an  interval  of  that  daily  duration  that  was

posted to the source wage type. The wage type relation is used for the total duration - irrespective

of the Duration from.

Process from

Duration,  from  which  on  the  wage  type  relation  will  be  active.  The  wage  type  relation  will  not  be

applied to that posted time that comes before that duration. This field can be used for example to

effect that overtime from the 2nd hour on will be posted to a higher bonus.

Comment

It is possible to enter a comment for each rule.

Date from, to

These fields can be used to restrict the validity period of a rule. The fields can be left empty if no

restriction regarding the start or end of validity is to be defined.

Company

This field can be used to restrict the validity of a rule to a specific company. If this field is left empty,

the rule will apply for all companies.

PZW-EVV_82.docx

Version: 1.0.19468

Page 17 of 18

Enhanced Compensation Rules

Selection

This  field  is  used  to  additionally  restrict  the  validity  area  of  a  rule.  A  selection  can  be  made

according  to  the  following  fields  of  the  HR  master  data:  area,  cost  center,  department,  personnel

number, employee subgroup, activity and employee relationship. If a selection was made, another

field will be visible into which the corresponding value will be entered.

Field description - Options tab

Period

If  the  duration  of  the  overtime  periods  exceeds  one  day,  this  can  be  used  to  define  whether  the

wage type relation will be executed individually per day or for the total overtime period. This setting

will also affect the determination of the duration in order to control the condition  Duration from, to

and the field Process.

Point in time

This  option  can  be  used  to  define  whether  the  wage  type  relation  is  to  be  processed  at  the  daily

evaluation,  prior  to  or  after  the  account  compensation,  or  at  the  monthly  evaluation  (after  the

limitation of the accounts).

PZW-EVV_82.docx

Version: 1.0.19468

Page 18 of 18

