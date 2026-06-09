Manual

Personnel / Wage Type
Statistics
PZW-PLS 8.2

Version 1.0.1374

Last changed on: 19.06.2020

Personnel / Wage Type Statistics

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-PLS_82.docx

Version: 1.0.18468

Page 2 of 14

Personnel / Wage Type Statistics

Contents

1  Personnel/Wage Type Statistics - Overview ................................................ 4

2  Wage Type Groups ...................................................................................... 5

3  Wage Type Statistics ................................................................................... 7

4  Configuration of Wage Type Statistics ....................................................... 10

5  Labor Time Statistic ................................................................................... 12

PZW-PLS_82.docx

Version: 1.0.18468

Page 3 of 14

1  Personnel/Wage Type Statistics - Overview

Personnel / Wage Type Statistics

Possible fields of application

Extensive statistics about labor times and wage types

Implementation notes

The function package is used if you:

  would like to evaluate labor times or the wage types generated thereof in a statistic for employees

or groups of employees

Integration

This  function  package  can  only  be  used  if  Personnel  Time  Management  is  done  in  HYDRA  (function

package "assessment of labor times").

Functions

  Cost center posting

o  Posting  of  the  recorded  cost  centers  onto  wage  types  and  summation  for  month-end

closing

o  Evaluation of the wage types posted onto the cost centers

  Labor time statistic

o  Evaluation  of  the  target  times,  actual  times  and  absence  times  per  day  including

summation  per  employee,  group  of  employees,  weekday,  calendar  week  or  month  to

present the working time trend or as absence statistic

o  Display of planned working times and absence times for periods that have already been

evaluated or future periods

o  Graphic presentation of the labor time statistic  with configurable assignment of  diagram

axes

  Wage type statistic

o  Evaluation of working times, absence times and account changes on the basis of posted

wage  types  including  summation  for  employees,  groups  of  employees,  weekdays,

calendar weeks and months

o  Summary  of  wage  types  to  wage  type  groups  including  percentage  weighting  of

individual wage types

o  Graphic  presentation  of  the  wage  type  statistic  including  percentage  distribution  (e.g.

absences)

PZW-PLS_82.docx

Version: 1.0.18468

Page 4 of 14

Personnel / Wage Type Statistics

2  Wage Type Groups

Summary

Menu

Master data Labor time Wage type groups

Transaction code

wtgr

Function authorization  wtgr

The "wage type groups" module allows to comprise several wage types to one group. These groups can

then be comprised to any form of list under configuration of wage type statistics or be used to restrict the

display of the monthly wage types under time sheet configuration.

Field descriptions

Wage type group

Abbreviation and extensive designation of the wage type group

Wage type

Wage type that is to be assigned to the group.

PZW-PLS_82.docx

Version: 1.0.18468

Page 5 of 14

Personnel / Wage Type Statistics

Factor

Factor by which this wage type will be weighted within the wage type groups. With a negative factor

the duration will not be added to the wage type group but be subtracted from it. This allows to form

wage type differences.

Origin

This option can be used to select whether the daily wage type postings or the monthly wage types

will be accessed. Monthly wage types will be assigned to the last day of a month's period. Monthly

wage types can also be used to show account limitations, for example.

Include wage type postings

The  buttons  Not  subject  to  approval,  Authorized,  Unauthorized  and  Refused  define  which  wage

types are to be displayed. This button is only available for daily wage types.

PZW-PLS_82.docx

Version: 1.0.18468

Page 6 of 14

Personnel / Wage Type Statistics

3  Wage Type Statistics

Summary

Menu

Human resources management Evaluations Wage type statistics

Transaction code

wtst

Function authorization  wtst

All times entered to wage types can be evaluated using the Wage type statistics.

Usage

The user is only allowed to display that type of wage type statistics, for which he is authorized.

When the application is opened, the field Wage type statistics will automatically be preoccupied with the

shortest existing list, for which the user is authorized.

It is possible to switch between the table view and the bar chart.

PZW-PLS_82.docx

Version: 1.0.18468

Page 7 of 14

Personnel / Wage Type Statistics

Selection criteria

The following selection criteria are available in the application:

List

Selection of the wage type statistics to be shown.

Duration minimum, maximum

Restrictions as to the daily minimum or maximum durations of the wage groups that must be shown

in the list can be entered here.

Field descriptions

Charged cost center

Cost center to which the wage type is posted. This field is completed when cost center postings are

used.

PZW-PLS_82.docx

Version: 1.0.18468

Page 8 of 14

Personnel / Wage Type Statistics

Toolbar

 Labor time maintenance

Call of the  labor time maintenance for the selected  person. It  is also  possible to access the labor

time maintenance by double clicking on the message in the messages listing table.

 Personnel scheduling

Call of the personnel scheduling for the selected person.

 Delete selected lines

One or several records can be marked in the list of the displayed wage types and be deleted from

the display. This offers the possibility to delete public holidays from the statistics, for example. As

soon as the data will be requested again, all records will be re-shown. If a grouping is marked, the

entire grouping will be deleted.

PZW-PLS_82.docx

Version: 1.0.18468

Page 9 of 14

Personnel / Wage Type Statistics

4  Configuration of Wage Type Statistics

Summary

Menu

Master data Labor time  Configuration of wage type statistics

Transaction code

wtsc

Function authorization  wtsc

The configuration of wage type statistics is used to assign wage type groups to freely definable statistics.

The number of statistics and of wage type groups per wage type statistics is not restricted.

Field descriptions

Wage type group

Number and/or abbreviation of the wage type group, that is to be added to the list.

The wage type groups will be displayed in the wage type statistics sorted by the number and/or

abbreviation of the wage type group.

PZW-PLS_82.docx

Version: 1.0.18468

Page 10 of 14

Personnel / Wage Type Statistics

PZW-PLS_82.docx

Version: 1.0.18468

Page 11 of 14

Personnel / Wage Type Statistics

5  Labor Time Statistic

Summary

Menu

Human Resource Management  Reports  Labor Time Statistics

Transaction code

ptst

Function authorization

ptst

Labor  time  statistics  offers  the  option  to  display  target  times  and  attendance  times  as  well  as  various

absences for selected employees.

Usage

The evaluation/report contains one row per employee and day. The statistics only include those days on

which  at  least  one  target  time,  one  normal  time,  one  attendance  time  or  one  absence  is  available.  By

grouping the statistics according to one or more columns (e.g. calendar week, person, month, etc.), group

totals  can  be  calculated  and  displayed.  The  percentages  displayed  are  determined  with  respect  to  the

target time and normal time.

PZW-PLS_82.docx

Version: 1.0.18468

Page 12 of 14

The  category  in  Control  of  absence  times  is  used  to  define  the  following  absence  groups  that  can  be

displayed in the labor time statistics:

Personnel / Wage Type Statistics

Category

Leave day/ half a leave day

Special leave

Illness with continued pay

Illness without continued pay

Accident at work

Cure

Maternity leave

Release

Further training

Flextime reduction

Overtime reduction

Public holiday

Other paid

Other unpaid

Suspended  employment  relationships  (e.g.  maternity  leave,  military  service,  temporary  annuity,  partial

retirement) can be hidden in the target time if they are assigned to the category "Maternity leave" (MUT)

in Control of absence times.

Switching between the table and chart views is possible:

PZW-PLS_82.docx

Version: 1.0.18468

Page 13 of 14

Personnel / Wage Type Statistics

Field Descriptions

Days of absence/target time, Days of absence/normal time, ...

Labor time statistic shows  the days in relation to the target time and normal time. Whole days are

displayed  in  the  result,  if  the  respective  duration  (absence,  illness,  public  holiday,  ...)  at  least

amounts  to  75%  of  the  target  or  normal  time.  If  this  is  not  the  case,  half  days  will  be  shown,

provided that the duration is greater than or equal to 25 % of the target or normal working time.

% Illness/target time, % Illness/normal time

Percentage  rate  of  the  illness  relating  to  the  target  or  normal  working  time.  These  two  fields  are

generally empty in the table. The percentages are only shown as group totals or as totals.

Toolbar

 Delete selected lines

One or more records can be selected in the list of daily results and deleted from the display. In this

way  there  is  an  option  to  delete  public  holidays  from  the  statistics,  for  example.  After  the  data  is

requested again, all records are displayed. If a grouping is selected, the entire grouping is deleted.

 Labor time maintenance

Calls  the  labor  time  maintenance  for  the  selected  person.  Labor  time  maintenance  can  also  be

called by double clicking on the posting in the message listing table.

 Personnel scheduling

Calls the personnel scheduling for the selected person.

PZW-PLS_82.docx

Version: 1.0.18468

Page 14 of 14

