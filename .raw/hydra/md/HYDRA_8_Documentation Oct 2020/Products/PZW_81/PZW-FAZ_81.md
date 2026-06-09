Manual

Flexible Working Time
PZW-FAZ 8.1

Version 1.0.54

Last changed on: 19.06.2020

Flexible Working Time

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 2 of 15

Flexible Working Time

Contents

1  Flexible Working Time - Overview ............... Error! Bookmark not defined.

2  Personal Models .......................................................................................... 5

3  Personal Day Types ..................................................................................... 8

4  Personal Working Time .............................................................................. 11

5  Breaks Depending on Working Time ......................................................... 13

PZW-FAZ_81.docx

Version: 1.0.18468

Page 3 of 15

Flexible Working Time

1  Flexible Working Time

Purpose

This function package contains functions to flexibly reschedule working time and payment.

Implementation Considerations

Use this function package to:



flexibly reschedule employee working time and shift rhythm model;

  define breaks depending on the actual working time.

Integration

This personnel scheduling function package requires  Time and Labor Data Evaluation to define working

time and payment models.

The Personal Day Types and Personal Working Time can be called in Personnel Scheduling though the

context menu.

Features

  Personal models

o  Reschedule  original  working  time  and  payment  models  for  employees  or  employee

groups for the corresponding periods

  Personal day types

o  Reschedule  the  day  types  for  employees  and  employee  groups  within  the  original

working time and payment models for the corresponding periods

  Personal working time

o  Reschedule  the  planned  working  time  on  a  temporary  basis  without  the  need  to  define

working time day types

  Breaks depending on working time

o  Compensate breaks depending on the actual working time and the clocked breaks

PZW-FAZ_81.docx

Version: 1.0.18468

Page 4 of 15

Flexible Working Time

2  Personal Models

Summary

Menu

Human Resources Management --> Planning --> Personal Models

Transaction Code

pmod

Function authorization

pmod

With  “Personal  models”,  an  employee,  a  cost  center,  an  area  or  an  entire  company  can  be  allocated  a

working  time  model,  a  shift  rhythm  model  or  a  remuneration  model  or  an  overtime  type  for  a  certain

period, which overrides any corresponding models allocated in the HR master data.

With this function, short term switches between individual models are possible without having to change

allocations in the HR master data.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

The following priorities apply to the definition of personal models:

1. Employee

2. Cost center

PZW-FAZ_81.docx

Version: 1.0.18468

Page 5 of 15

Flexible Working Time

3. Section

4. Company

That means that personnel related plans override cost center related plans. Personal models for

an area override company related plans.

Selection Criteria

The application provides the following selection criteria:

Valid from, valid to

Restricts the personal models that may be selected to those applying in this period.

Field Descriptions

Company, Employee, Cost center, Section

Selection  criteria  for  the  employee  or  employee  group,  for  which  the  personal  model  is  to  be

planned. An additional company restriction is necessary if several companies are managed in the

system and the allocation by company is not clear and unambiguous.

Valid from, to

Start and end dates for the planning of the personal model. If the end date field is left empty, a plan

without time limit will be created.

Working time model

Working  time  model,  according  to  which  the  selected  employee  or  group  of  employees  is  to  be

evaluated.

Shift rhythm model

Shift rhythm model used for the determination of the shift type.

Payment model

Payment model to which working time is to be allocated.

Overtime type

Overtime  type  which  overrides  the  period  entered  in  the  HR  master  data  sheet.  For  periods  of

overtime calculation that are longer than one day, the planning of an overtime type for one or more

days during that period always affects the whole period.

It  is  not  necessary  to  fill  in  all  fields  when  planning  personal  models.  For  empty  fields,  the

models from the HR master data will be processed.

When it comes to plans that are to be rescheduled for longer periods, we recommend making

the changes using the HR master that may be kept in different versions.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 6 of 15

Flexible Working Time

Toolbar

 Reset labor time calculation

In the reset labor time calculation dialog the results of labor time calculation have to be reset for the

selected  range  of  people  and  dates  when  it  comes  to  plans  relating  to  the  past,  in  order  for  the

changes to become effective.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 7 of 15

Flexible Working Time

3  Personal Day Types

1.1  Summary

Menu

Human Resources Management --> Planning --> Personal Day Types

Transaction Code

pdat

Function authorization

pdat

With the “Personal day types” module, an employee, a cost center, an area or an entire company can be

assigned  a  working  time  day  type  or  a  payment  day  type  for  a  certain  period,  which  overrides  the

definition in the corresponding working time model or payment model.

In this way, short term individual working time and remuneration rules can be created without having to

change the relevant models.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 8 of 15

Flexible Working Time

The following priorities apply to the definition of personal day types:

1. Employee

2. Cost center

3. Section

4. Company

That means that personnel related plans override cost center related plans. Personal day types

for an area override company related plans.

Selection Criteria

The application provides the following selection criteria:

Valid from, valid to

Restricts the personal day types that may be selected to those applying in this period

Field Descriptions

Company, Employee, Cost center, Section

Selection  criteria  for  the  employee  or  employee  group,  for  which  the  personal  day  type  is  to  be

planned. An additional company restriction is necessary if several companies are managed in the

system and the allocation by company is not clear and unambiguous.

Valid from, to

Start and end dates for the planning of the personal day type. If the end date field is left empty, a

plan without time limit will be created.

Working time day type

Working time day type, according to which the selected employee or group of employees is to be

evaluated.

Shift type

Shift type from the shift or flexible shift day types.

Payment day type

The payment day type to which the working time is to be allocated.

With the “Personal day type” function it is possible to plan the working time, the remuneration or

both. Information missing from the plan is completed with values from the models of the person

concerned. Accordingly, the planning of another shift type does not require the input of the shift

day type.

If one wishes to define another working time day type for a longer period, using a personal day

type, then it is usually necessary to create a plan for each week, as otherwise target time will be

PZW-FAZ_81.docx

Version: 1.0.18468

Page 9 of 15

Flexible Working Time

defined for the weekend.

Toolbar

 Reset labor time calculation

In the "reset labor time calculation" dialog the results of labor time calculation have to be be reset

for the selected range of people and dates when it comes to plannings relating to the past, in order

for the changes to become effective.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 10 of 15

Flexible Working Time

4  Personal Working Time

Summary

Menu

Human resource management  Planning  Personal working time

Transaction code

pwot

Function authorization

pwot

The function Personal working time enables the working time of an employee to be planned individually

for  one  or  more  days.  In  contrast  to  Personal  day  types  with  which  only  the  existing  day  types  can  be

stored,  with  Personal  working  time  there  is  an  option  to  modify  the  planned  working  time  day  type  in  a

targeted  manner.  Application  examples  include  breaks  that  are  not  taken,  which  can  be  deleted  for  a

person by planning a personal working time.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 11 of 15

Flexible Working Time

Field descriptions

The field descriptions correspond with the descriptions of the working time day types

When  a  personal  working  time  is  created,  the  person's  respective  clockings  are  automatically

reset.  In  this  case,  the  rounded  times,  the  working  time  day  type  and  payment  day  type  from

these  clockings  are  deleted.  Manually  edited  and  authorized  clockings  are  not  automatically

reset so that the editor's desired modifications are not overwritten.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 12 of 15

Flexible Working Time

5  Breaks Depending on Working Time

Summary

Menu

Human  resources  management  Models  Breaks  depending  on  working
time

Transaction code

wtdb

Function authorization  wtdb

Depending  on  the  executed  working  time,  this  configuration  allows  to  offset  unpaid  breaks  from  the

working time:

Usage

The following rules apply for processing breaks depending on working time:

-  The entries from the list are applied in ascending working time order. Only the difference between

the entered break and the already offset break will be deducted for an entry.

-  The compensation of a break depending on working time is made  after that point in time, at which

the specified working time has been achieved.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 13 of 15

-  Those breaks will be accounted for, for which a clocking was made and/or that were automatically

compensated  at the corresponding  working day. Also those paid breaks will be  accounted for that

are stored to the working time day type .

Flexible Working Time

Field descriptions

Company

Specification of that company to which the configuration shall apply.

Area

Criterion  to  restrict  the  area.  This  can  be  used  to  restrict  to  certain  areas  the  compensation  of

breaks depending on working time.

Working time day type

Working time day type, to which the break depending on working time shall apply.

Valid from, to

Validity period for the break depending on working time.

Working time

Time that must be achieved in order to compensate the break depending on working time.

Break

Time that  will be deducted as break from the executed  working time. The break will no  longer be

shown once the specified working time has been achieved.

Allocate only if no break is planned

If  this  button  is  activated,  the  break  depending  on  working  time  will  only  be  applied  in  those

instances, in which no break is stored to the working time scheduling of a day. A modification of the

setting will apply to all breaks depending on working time for the selected combination of company

and area.

Consider interruptions of work outside of break frame

If this button is inactive, only the existing breaks within the break frame and no interruptions of work

outside of the break frame will be accounted for in the compensation of the breaks depending on

working time.

Only the breaks depending on working time with the same combination of company, area and

working  time  day  type  will  be  active  for  one  person.  If  for  example  a  break  depending  on

working  time  is  defined  for  a  company  and  for  an  area,  entries  applying  to  the  complete

company will not be processed. Configurations applying to a working time day type will have the

strongest priority here.

PZW-FAZ_81.docx

Version: 1.0.18468

Page 14 of 15

Flexible Working Time

PZW-FAZ_81.docx

Version: 1.0.18468

Page 15 of 15

