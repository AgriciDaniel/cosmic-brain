Time Sheet

1  Time Sheet

Summary

Menu

Human resources management  Month-end closing  Time sheet

Transaction code

ptsh

Function authorization

ptsh

The time sheet contains the clock events and the related compensation for a settlement period.

Usage

If multiple  versions  of  a  person  exist  within  the  settlement  period,  the  status  at  the  end  of  the

settlement  period  is  decisive  for  the  selection  of  the  person  and  the  inspection  of  the

responsibility area. Users that are authorized for the respective person on this day may view the

time sheet for the entire period. The display of the HR master data in the list corresponds with

the date.

MOC_PersonalTimeSheet.docx

Version:

Page 1 of 4

Time Sheet

Selection criteria

The following selection criteria are available in the application:

Time sheet

Selection  of  various  time  sheets.  Users  may  only  select  the  time  sheets  for  which  they  are

authorized.

Sorting

These two fields affect the field order for the time sheet printouts.

Field descriptions

Header

In  the  list  header  for  each  person  the  following  is  displayed:  the  name  of  the  employee,  the

employee's  personnel  number,  the  month  evaluated  and  the  balances  of  the  existing  accounts  at

the beginning of the month.

Date

Evaluation day with designation of the weekday

Mo

Tu

Monday

Tuesday

We

Wednesday

Th

Fr

Sa

Su

Thursday

Friday

Saturday

Sunday

All  of  the  days  of  the  evaluation  period  appear  without  a  gap  in  the  list,  even  if  there  were  no

clockings or compensation on a particular day.

Beginning

Clocked start time of the clocking;

in case of an absence record the planned start time is output here.

End

Clocked end time of the clocking;

in case of an absence record the planned end time is output here.

Break

The duration  of the  break is determined from the sum of the interruptions  within the break frame,

breaks depending on working time and the free break based on the working-day type).

MOC_PersonalTimeSheet.docx

Version:

Page 2 of 4

Time Sheet

Type

The status of a clocking record can be "K" for present or "F" for an absence record. If the clocking

has been manually edited or created, then an asterisk (*) is output before the status.

Payment

The  number  and  the  short  designation  of  the  payment  day  type  according  to  which  the  clocking

time was evaluated are displayed here.

Target time

The planned target working time for the evaluation day is indicated in hours and minutes.

Actual time

The  actual  time  achieved  on  the  evaluation  day  is  indicated  in  hours  and  minutes.  The  actual

working time is calculated from the rounded clocking times and consists of the attendance time and

absences.

+/-

In  this  column,  the  difference  between  the  actual  working  time  and  the  planned  target  time  is

displayed.  The  difference  is  displayed  in  hours  and  minutes.  If  the  value  displayed  here  has  a

negative sign, this means that the employee did not achieve the target working time for this day.

Flexible time

The modification of the flexible time account (third account in the configuration of the accounts) on

the evaluation day is displayed here.

Overtime

Displayed here is the time posted for an employee for the evaluation day to a wage type with the

identifier for overtime. Wage types entered as undertime are displayed as negative. The definition

of  such  wage  types  is  stored  in  the  configuration  of  wage  types.  For  this  reason,  users  can

determine the display in this last column themselves.

Totals

At the end of the list, for each person the following totals are included: the target and actual working

time and the difference between them, the sum of the daily flexible time changes and the sum of

the overtime in the evaluation period.

Balances

In  addition,  the  balances  of  the  accounts  at  the  end  of  the  month  are  displayed.  If  an  account  is

limited, then at the end of the list the carryforward to the following month for the respective account

is shown.

MOC_PersonalTimeSheet.docx

Version:

Page 3 of 4

Time Sheet

Toolbar

 Time sheet configuration

Function authorization: ptsc

Calls up the Time sheet configuration.

 Report designer

Function authorization: ptsc

How to design time sheets is described separately.

 Send e-mail

Function authorization: ptsh or ptsh.sendemail

Sending time sheets by e-mail to employees as PDF files.

This  option  can  be  disabled  by  deleting  the  function  authorization  ptsh  and  adding  the

function authorization ptsh.view.

The functions Time sheet configuration, Report designer and Send e-mails-are only available if

the license PZW-ZNW is enabled.

The function "Send e-mail" is only available if the modification PZW-ZNW-MAIL is enabled.

MOC_PersonalTimeSheet.docx

Version:

Page 4 of 4

