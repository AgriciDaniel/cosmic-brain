Manual

Flexible Working Time
PZW-FAZ 8.3

Version 1.0.23479

Last changed on: 01.10.2020

Flexible Working Time

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 2 of 16

Flexible Working Time

Contents

1  Flexible Working Time - Overview ............................................................... 4

2  Personal Models .......................................................................................... 5

3  Personal Day Types ..................................................................................... 8

4  Personal Working Time .............................................................................. 12

5  Breaks Depending on Working Time ......................................................... 14

PZW-FAZ_83.docx

Version: 1.0.23479

Page 3 of 16

Flexible Working Time

1  Flexible Working Time - Overview

Purpose

This function package contains functions to flexibly re-plan working time and payment.

Implementation Considerations

Use this function package to:



flexibly re-plan employee working time and shift rhythm model;

  define breaks depending on the actual working time.

Integration

This personnel scheduling function package requires  Time and Labor Data Evaluation to define working

time and payment models.

The Personal Day Types and Personal Working Time can be called up in Personnel Scheduling through

the context menu.

Features

  Personal models

o  Re-plan  original  working  time  and  payment  models  for  employees  or  employee  groups

for the corresponding periods

  Personal day types

o  Re-plan  the  day  types  for  employees  and  employee  groups  within  the  original  working

time and payment models for the corresponding periods

  Personal working time

o  Re-plan  the  planned  working  time  on  a  temporary  basis  without  the  need  to  define

working time day types

  Breaks depending on working time

o  Compensate breaks depending on the actual working time and the clocked breaks

PZW-FAZ_83.docx

Version: 1.0.23479

Page 4 of 16

Flexible Working Time

2  Personal Models

Summary

HYDRA menu

Human resources management --> Planning --> Personal models

FEDRA menu

Advanced resource planning  Master data  Personal models

Transaction Code

pmod

Function authorization

pmod

Use the “Personal models” module to assign a working time model, shift rhythm model, payment model or

an  overtime  type  to  an  employee,  cost  center,  area  or  an  entire  company  for  a  certain  period.  This

assignment then overrides the models configured the HR master data.

This function allows short term switches between individual models without having to change allocations

in the HR master data.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 5 of 16

Flexible Working Time

The following priorities apply to the definition of personal models:

1. Employee

2. Cost center

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

PZW-FAZ_83.docx

Version: 1.0.23479

Page 6 of 16

When it comes to plans that are to be rescheduled for longer  periods, we recommend making

the changes using the HR master that may be kept in different versions.

Flexible Working Time

Toolbar

 Reset labor time calculation

In the reset labor time calculation dialog the results of labor time calculation have to be reset for the

selected  range  of  people  and  dates  when  it  comes  to  plans  relating  to  the  past,  in  order  for  the

changes to become effective.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 7 of 16

Flexible Working Time

3  Personal Day Types

Overview

HYDRA menu

Human resources management  Planning  Personal day types

FEDRA menu

Advanced Resource Planning  Master data  Personal day types

Transaction code

pdat

Function authorization

pdat

You can use the application Personal day types to assign a working time day type or payment day type to

a person, a cost center, an area or an entire company for a specified period. This entry then overrides the

specification in the relevant working time or payment model.

Using  this  function,  you  can  make  short-term  and  individual  changes  of  the  working  time  and  payment

without having to change the relevant models.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 8 of 16

Flexible Working Time

Purpose

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are on top.

When you define personal day types, the following priorities apply:

1. Person

2. Cost center

3. Area

4. Company

That means that person-related plans override cost center related plans. Personal day types for

an area override company-related plans.

Selection criteria

The application provides the following selection criteria:

Valid from, valid until

Only the personal day types included in this period are available for selection.

Field descriptions

Company, Person, Cost center, Area

Selection criteria for the person or group of persons for which you want to plan a personal day type.

You must additionally select the company if several companies are managed in the system and the

allocation by company is not clear and unambiguous.

Valid from, to

Start and end date of the planning of the personal day type. If you leave the end date field empty, a

plan without time limit is created.

Working time day type

Working time day type that is used to evaluate the selected person or group of persons.

Shift type

Shift type of the working time day type.

Payment day type

The Payment day type used to settle the working time.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 9 of 16

Flexible Working Time

Using  the  function  Personal  day  types,  you  can  plan  the  working  time,  the  payment  or  both.

Information  that  is  missing  during  planning  is  completed  with  values  from  the  models  of  the

relevant person. Example: To plan a different shift type, you do not need to enter the shift day

type.

If  you  want  to  use  a  personal  day  type  to  store  a  different  working  time  day  type  for  a  longer

period, then you usually have to create a separate planning for each week. Otherwise the target

time is also stored for the weekends.

Comment

You  can  enter  a  comment  in  this  field.  You  can  enter  the  reason  why  a  personal  day  type  is

created, for example.

Color

You can use this field to specify a color that identifies the days for which a personal day type is

stored. Using different colors you can identify the changes of different users. In this case, each

user highlights the personal day types with a different color.

Working time before beginning of skeleton time

If the field Working time before beginning of skeleton time is set to Rejected, then the working

time before start of skeleton time is rounded up  to the start of the skeleton time. These fields

therefore override the rounding settings specified in the Control of labor time calculation.

If the field Working time before beginning of skeleton time is set to Approved, then the working

time  before  start  of  skeleton  time  is  rounded  using  the  rounding  settings  Working  time  before

beginning  of  skeleton  time  specified  in  the  Control  of  labor  time  calculation.  If  these  rounding

settings are empty, the time is rounded using the normal rounding settings for flextime or shift.

Times that are blocked in the Control of labor time calculation are not processed if the working

time  before  start  of  skeleton  time  is  approved  (it  does  not  matter  if  the  blocked  times  are

included  in  the  skeleton,  core  or  normal  time  because  in  all  3  cases  the  working  time  before

start of skeleton time can be subject to blocking).

If the field Working time before beginning of skeleton time is set to Approved and if a payment

rule  is  set  for  the  Working  time  before  beginning  of  skeleton  time  that  requires  authorization,

then this authorization requirement is reset.

Working time after end of skeleton time

If the field Working time after end of skeleton time is set to Rejected, then the working time after

end  of  skeleton  time  is  rounded  down  to  the  end  of  the  skeleton  time.  These  fields  therefore

override the rounding settings specified in the Control of labor time calculation.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 10 of 16

Flexible Working Time

If  the  field  Working  time  after  end  of  skeleton  time  is  set  to  Approved,  then  the  working  time

after  end  of  skeleton  time  is  rounded  using  the  rounding  settings  Working  time  after  end  of

skeleton  time  specified  in  the  Control  of  labor  time  calculation.  If  these  rounding  settings  are

empty, the time is rounded using the normal rounding settings for flextime or shift. Times that

are blocked in the Control of labor time calculation are not processed if the working time after

end  of  skeleton  time  is  approved  (it  does  not  matter  if  the  blocked  times  are  included  in  the

skeleton, core or normal time because in all 3 cases the working time after end of skeleton time

can be subject to blocking).

If the field Working time after end of skeleton time is set to Approved and if a payment rule is

set  for  the  Working  time  after  end  of  skeleton  time  that  requires  authorization,  then  this

authorization requirement is reset.

Breaks not taken

The options in the group  Breaks not taken hide the respective breaks. The options also have

an  effect  when  you  plan  a  personal  working  time.  The  personal  working  time  therefore  takes

priority  over  the  working  time  day  types  und  the  shift  type  in  the  personal  day  type.  But  the

personal  working  time  has  a  lower  priority  than  the  options  of  group  Breaks  not  taken.  If  a

Break  depending  on  working  time  is  stored,  this  break  is  processed  and  the  setting  of  the

options in group Breaks not taken has no effect. This can have the effect that the break of the

working time day type is not processed, but the break depending on working time is processed.

Toolbar

Reset labor time calculation

In the dialog Reset labor time calculation, you must reset the results of the labor time calculation for

plannings  of  the  past  for  the  persons  and  dates  selected.  Only  then  the  changes  can  become

effective.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 11 of 16

Flexible Working Time

4  Personal Working Time

Summary

HYDRA menu

Human resource management  Planning  Personal working time

FEDRA menu

Advanced resource planning  Master data  Personal working time

Transaction code

pwot

Function authorization

pwot

The function Personal working time enables the working time of an employee to be planned individually

for  one  or  more  days.  In  contrast  to  Personal  day  types  with  which  only  the  existing  day  types  can  be

stored,  with  Personal  working  time  there  is  an  option  to  modify  the  planned  working  time  day  type  in  a

targeted  manner.  Application  examples  include  breaks  that  are  not  taken,  which  can  be  deleted  for  a

person by planning a personal working time.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 12 of 16

Flexible Working Time

Field descriptions

The field descriptions correspond with the descriptions of the working time day types

When  a  personal  working  time  is  created,  the  person's  respective  clockings  are  automatically

reset.  In  this  case,  the  rounded  times,  the  working  time  day  type  and  payment  day  type  from

these  clockings  are  deleted.  Manually  edited  and  authorized  clockings  are  not  automatically

reset so that the editor's desired modifications are not overwritten.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 13 of 16

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

PZW-FAZ_83.docx

Version: 1.0.23479

Page 14 of 16

Flexible Working Time

-  Those breaks will be accounted for, for which a clocking was made and/or that were automatically

compensated  at the corresponding  working day. Also those paid breaks will be  accounted for that

are stored to the working time day type .

Only the breaks depending on  working time with the same combination of company, area and

working  time  day  type  will  be  active  for  one  person.  If  for  example  a  break  depending  on

working  time  is  defined  for  a  company  and  for  an  area,  entries  applying  to  the  complete

company will not be processed. Configurations applying to a working time day type will have the

strongest priority here.

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

If  this  option  is  enabled,  the  break  depending  on  working  time  will  only  be  applied  in  those

instances, in which no break is stored to the working time scheduling of a day. A modification of the

setting will apply to all breaks depending on working time for the selected combination of company

and area.

Consider interruptions of work outside of break frame

If this option is inactive, only the existing breaks within the break frame and no interruptions of work

outside of the break frame will be accounted for in the compensation of the breaks depending on

working time.

PZW-FAZ_83.docx

Version: 1.0.23479

Page 15 of 16

Flexible Working Time

Allocate break completely when working time is exceeded

This  option  causes  the  break  depending  on  working  time  to  be  deducted  completely,  once  the

specified working time has been achieved (e.g.: working time: 6 hours, break: 30 minutes; 6.05  -->

5.35).  If  this  option  is  not  enabled  the  break  depending  on  working  time  will  be  hidden  after  the

specified working time has been achieved (e.g.: working time: 6 hours, break: 30 minutes, 6.05  -->

6.00).

PZW-FAZ_83.docx

Version: 1.0.23479

Page 16 of 16

