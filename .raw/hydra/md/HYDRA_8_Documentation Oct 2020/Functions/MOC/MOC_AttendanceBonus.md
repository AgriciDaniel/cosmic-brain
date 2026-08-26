Additional Allowances Rule

1  Additional Allowances Rule

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

MOC_AttendanceBonus.docx

Version: 1.1.15647

Page 1 of 3

Additional Allowances Rule

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

MOC_AttendanceBonus.docx

Version: 1.1.15647

Page 2 of 3

Additional Allowances Rule

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

The

field

Personnel

selection

is

only

available

if

the

extension

AddAllowRuPersonnelSelection is activated.

MOC_AttendanceBonus.docx

Version: 1.1.15647

Page 3 of 3

