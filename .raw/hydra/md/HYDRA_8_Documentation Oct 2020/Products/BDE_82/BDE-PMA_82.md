Manual

Staff Logon / Reports
BDE-PMA 8.2

Version 1.2.23049

Last changed on: 01.09.2020

Staff Logon / Reports

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-PMA_82.docx

Version: 1.2.23049

Page 2 of 21

Staff Logon / Reports

Contents

1  Overview: Staff-Related Evaluations/Reports .............................................. 4

2  Staff Logged On / Personnel Overview ........................................................ 5

3  Personnel report ......................................................................................... 10

4  Personnel shift log ...................................................................................... 15

BDE-PMA_82.docx

Version: 1.2.23049

Page 3 of 21

Staff Logon / Reports

1

 Overview: Staff-Related Evaluations/Reports

Purpose

The  function  package  provides  overviews  and  evaluations  in  MOC  on  BDE  postings  for  which  staff-

related postings exist.

Integration

The system displays and evaluates data based on staff-related postings made at the shop floor terminal

as part of the function package "staff-related BDE functions" (BDE-PBF).

Features

  Personnel  shift  log  with  staff-related  and  shift-related  listing  of  completed  orders,  including  graphic

representations of quantities and times.

  Personnel  overview  indicating  which  employees  are  currently  logged  on  to  which  machines  /

workplaces and cost centers.

  Personnel  report  listing  which  employees  of  an  organizational  unit  (supervisor  area,  cost  center,

department)  have  processed  which  operations  in  selected  shifts  or  periods,  including  statistics  with

target/ actual comparison of times and quantities.

  User  fields  in  the  HR  master  including  additional,  staff-related  information  (e.g.  number  plate,  size,

graduation). These user fields are configured as part of customizing services.

BDE-PMA_82.docx

Version: 1.2.23049

Page 4 of 21

Staff Logon / Reports

2  Staff Logged On / Personnel Overview

Overview

Menu

Production control  Production overview  Staff logged on

Transaction code

pnov

Function authorization

pnov

Available user fields

Where?

Table

Object type/user field key

Source (type)

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  personnel  overview  provides  a  clear  overview  of

the  staff  situation

in  production.

The information required is displayed from the point of view of the relevant person.

Integration

The personnel overview is an important tool for planners and persons responsible for staff. At a glance,

the  user  gets  the  necessary  information  and  can  take  spontaneous  personnel  decisions.  If  quick  and

helpful  decisions  are  required  in  production,  the  personnel  overview  is  very  helpful  for  the  responsible

persons in their daily routine.

The personnel overview shows all persons that are currently logged on to a workplace and that match the

criteria specified in the selection pane. If the "waiting period processing" is active, the system also shows

those persons who are currently logged on to a waiting period operation.

Irrespective of the selections made below, the user can only view persons that are included in the

responsibility area the user is authorized for. To check the responsibility area authorization, the system

checks the responsibility area of the workplace where the person is logged on. If the person is logged on

to a waiting period operation, the system checks the responsibility area of the person.

Selection criteria

The application provides the following selection criteria:

Person from … to …

This  selection  criterion  refers  to  the  personnel  number  in  the  HR  master  data.  All  persons  are

shown that are included in the specified range of personnel numbers.

BDE-PMA_82.docx

Version: 1.2.23049

Page 5 of 21

Staff Logon / Reports

Employee group from … to …

This selection criterion refers to the employee group in the HR master data. All persons are shown

that  are  included  in  the  specified  employee  group.  You  can  also  run  a  search  using  wildcards

(placeholders *) in the field.

Last name

This selection criterion refers to the last name in the HR master data. All persons are displayed with

the selected last name. You can also use wildcards.

Company

This selection criterion refers to the company stored in the HR master data. All persons are shown

that are assigned to the selected company. You can also use wildcards.

Area

This selection criterion specifies the area stored in the HR master data. All persons are shown that

are assigned to the selected area. You can also use wildcards.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  HR  master  data.  All  persons  are

shown that are assigned to the selected cost center. You can also use wildcards.

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. The

application  displays  all  persons  that  are  currently  logged  on  to  a  workplace  that  matches  the

specified selection criteria. You can use wildcards in the field.

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application displays all persons that are currently logged on to a workplace that is included in the

group specified. You can use wildcards in the field.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data.  The  application  displays  all  persons  that  are  currently  logged  on  to  a  workplace  that  is

assigned to the cost center specified. You can also use wildcards.

Order

The application displays all persons that are currently logged on to an order/operation of the order

number specified You can also use wildcards.

Order type

All persons are displayed that  are currently  logged on to an order/operation of  the selected  order

type.

BDE-PMA_82.docx

Version: 1.2.23049

Page 6 of 21

Person logged on longer than

The application only shows persons that are logged on for a longer time than the value specified in

Staff Logon / Reports

hours.

Detail application Staff logged on

Person category

Person

Personnel number according to the HR master data

Last name

Last name according to the HR master data

First name

First name according to the HR master data

Name

Entire name (last name, middle name and first name) according to the HR master data.

Staff badge

Staff badge number according to the HR master data.

Note: this column is only available if the user has the function authorization pers.

Company

Company that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Area

Area that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Department

Department that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Cost center

Cost center that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Employee group

Employee group that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Operator position/function

Function of the operator (abbreviation) that the person used to log on to the workplace.

BDE-PMA_82.docx

Version: 1.2.23049

Page 7 of 21

Staff Logon / Reports

Condition:  The  Operator  positions  must  be  configured  for  the  workplace  and  the  input  dialog

requires an entry in field Operator position (depending on configuration).

Premium indicator

Premium indicator (abbreviation) that the person used to log on to the workplace.

Condition: The Wage/Premium indicators must be configured for the workplace and the input dialog

requires an entry in field Premium indicator (depending on configuration).

Logon category

Date

Time

The person is logged on to the workplace since the point in time (date) specified here.

The person is logged on to the workplace since the point in time (time) specified here.

Duration

The  person  is  logged  on  to  the  workplace  for  the  duration  displayed.  The  duration  is  calculated

using the logon time and the current time when data is requested.

Workplace category

Workplace

Number of the workplace where the person is logged on.

If  the  person  is  logged  on  to  a  waiting  period  operation,  this  field  displays  the  workplace  that  is

assigned to the person in the HR master data.

Group

Group that the workplace is assigned to according to the master data.

Cost center

Cost center that the workplace is assigned to according to the master data.

Company

Company that the workplace is assigned to according to the master data.

Order category

Order type

Order type of the operation where the person is logged on.

Order

Order number of the operation where the person is logged on.

Sequence

Sequence  number  of

the  operation  where

the  person

is

logged  on

(depending  on

customization/configuration).

OP

Number of the operation where the person is logged on.

BDE-PMA_82.docx

Version: 1.2.23049

Page 8 of 21

Staff Logon / Reports

Split

SOP

Split  number  of  the  operation,  if  the  operation  where  the  person  is  logged  on  is  a  split  operation

(depending customization/configuration).

Sub operation number (reserved).

Operation designation

Name of the operation where the person is logged on.

Article

Article number of the operation where the person is logged on.

Article designation

Name of the article produced in the operation where the person is logged on.

Toolbar

When  you  call  a  function  or  target  application,  the  parameters  of  the  table  are  transferred.  For  this

reason, always select an entry to call an application.

    Log person off (function authorization: pn.logoff)

You can use the function Log person off to log off a person from the specified workplace (this is not

possible with group workplaces or with a combined logon of order and persons).

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-PMA_82.docx

Version: 1.2.23049

Page 9 of 21

Staff Logon / Reports

3  Personnel report

Overview



Menu

Order Management => Production Reports => Personnel Report

Transaction code

pnrp

Function authorization

pnrp

Available user fields

Where?

Object type/user field key

Source (type)

Table Personnel report

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  personnel  report  function  has  been  designed  to  create  a  list,  where  all  personnel  postings  are

displayed with a target/actual comparison on time and quantity within a certain time interval for selected

people.

Integration

Order data logs are the data basis for the evaluation .

Requirements

If you want to use the personnel report, personnel postings must have been executed and the respective

postings must be available in the system.

Selection criteria

The application provides the following selection criteria:

BDE-PMA_82.docx

Version: 1.2.23049

Page 10 of 21

Staff Logon / Reports

Date … to …

Data records are restricted by the date and time.

The evaluation period refers to the logon time of the person, that is, all person-related log records

(record type B) are selected with a logon time within the selection period.

In the case of interrupted operations, the log on time from the persona-related log records is used.

The current logged on date is used for logged operations. If the selection period exceeds the period

for  the  online  data  area,  the  data  from  the medium-term  data  area  is  automatically  selected.  You

need not explicitly activate the access to the medium-term data area.

Consider current logons

This option enables to view the people who have logged in during the specified period of time and

who are currently still logged on.

Person from … to …

Personnel number of the person to be displayed

Company

This selection criterion refers to the company defined in the HR master. All persons are shown that

are  assigned  to  the  selected  company.  In  general,  current  HR  master  data  is  selected  (different

versions of the HR master are not supported).

Cost center

The  people's  cost  center  according  to  the  HR  master.  In  general,  current  HR  master  data  is

selected (different versions of the HR master are not supported).

Area

The area defined for the people according to the HR master. In general, current HR master data is

selected (different versions of the HR master are not supported).

Department

The department defined for the people according to the HR master. In general, current HR master

data is selected (different versions of the HR master are not supported).

Last name

Selects by the person's last name according to the HR master. In general, current HR master data

is selected (different versions of the HR master are not supported).

Workplace ... to ...

This selection criterion refers to the workplace stored in the machine or workplace master data. The

selected workplace is displayed.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

BDE-PMA_82.docx

Version: 1.2.23049

Page 11 of 21

Staff Logon / Reports

Group ... to ...

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application shows all workplaces/machines assigned to the selected group.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application shows all workplaces/machines assigned to the selected company.

Order

Selection by edited orders

Category

This is the order type category.

Planned order

Planned order defined for the order.

Project number

Project number defined for the order.

Sales order

Selects by edited sales orders.

Customer name/designation

Selects by the customer designation defined for the order.

Order group

Selects by the order group defined for the order.

MRP controller

Selects by the MRP controller defined for the order.

Detail Application: Personnel Report

The list only contains data on persons for whom the operator is authorized (authorization via the person's

area  of  responsibility;  selection  via  the  current  HR  master  record;  no  support  of  versioned  HR  master

records).  ONLY  individual  operations  are  displayed,  not  the  merged  operations  themselves,  when  it

comes to merged operations generated at the console.

The requested data is displayed including the following information in a tabular structure:

Person category

Person

HR master data such as name, operator position, premium indicator, person group, or the person's

cost center.

BDE-PMA_82.docx

Version: 1.2.23049

Page 12 of 21

Staff Logon / Reports

"Logon/logoff" category

Logon/logoff

Point in time when the person logs on or off.

Workplace category

Workplace

Workplace  to  which  the  person  has  been  logged  on  as  well  as  the  cost  center  assigned  to  the

workplace.

Order category

Order

Order/operation number for which the person has produced.

"Primary quantities" category

Target quantity/yield/scrap/unit

Target quantity of the operation as well as the yield or scrap produced (i.e. recorded)by the person.

The latter are gathered from personal postings (record type „B“).

For  further  information  on  the  personal  posting  of  quantities,  please  refer  to  the  chapter  entry  of

quantities  in the document entitled implementation of HYDRA BDE and MDE .

Please note: Target quantities are not target quantities that are calculated proportionately, but the

total quantity to be produced of the operation (please see order information, “quantities” tab)

Durations category

Proportionate labor duration/setup time/processing time/actual setup time/produciton/downtimes

The time posted by the person is displayed - distributed according to production time and downtime

-  in  addition  to  the  (target)  setup  time  and  the  (target)  processing  time  of  the  operation.  If  the

person  is  logged  on  to  different  orders  the  labor  time  accrued  for  the  order  is  displayed  in  the

column proportionate labor duration (provided that current registrations are considered).

Note:  The  (target)  setup  time  and  the  (target)  processing  time  of  the  operation  are  not  times  that

are calculated proportionately but values that are displayed in the "Order information" dialog.

Detail application: PivotTable

The detail application "Pivot Table" allows for data to be evaluated and accumulated by further criteria.

By default, all people and their cost center are displayed and compared with each other with respect to

the  labor  utilization  rendered  at  the  different  cost  centers.  The  "cost  center"  column  refers  to  the  cost

center of the workplace to which the people have logged on.

BDE-PMA_82.docx

Version: 1.2.23049

Page 13 of 21

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

Staff Logon / Reports

 Order information (function authorization: orin)

Use this button to call the application  Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-PMA_82.docx

Version: 1.2.23049

Page 14 of 21

Staff Logon / Reports

4  Personnel shift log

Overview

Menu

Order management  Production reports  Personnel shift log

Transaction code

pspr

Function authorization

pspr

Purpose

The  personnel  shift  log  is  an  absolute  necessity  for  anyone  in  a  position  of  responsibility  in  production.

Here, the shift supervisor, the shift manager and the foreman are each provided a clear overview of all of

the important information needed relating to their staff.

The personnel shift log is a function in production management. This function makes it possible to create

shift-related  reports  about  the  produced  orders  by  person.  With  the  additional  graphic  presentations

showing  quantities  and  durations,  the  user  is  given  an  excellent  overview  of  all  data  concerning

personnel.

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities produced, the log also shows the times needed. This is shown for each person logged on at the

operation.

Integration

Shown in the personnel shift log are all operations that were selected in the selection panel. Here, only

BDE log records of record type "B" are considered.

When requesting the data, the system checks









the person's area of responsibility when selecting by cost center

the responsibility area of the workplace when selecting by workplace or group

the responsibility of the workplace when selecting by report group

the person's responsibility area when selecting by employee group.

It is possible to correct the entered personnel postings in the Order-related postings function.

Requirements

In order to use the personnel shift log, what is required is that personnel-related postings are performed

and that the relevant, finished postings (log records) exist in the system.

BDE-PMA_82.docx

Version: 1.2.23049

Page 15 of 21

Staff Logon / Reports

Selection criteria

The application provides the following selection criteria:

Date from ... to ...

Enter a period of time to narrow down the displayed log records. The system selects the log records

with a start date (logon date) in the period defined.

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Workplace from … to …

Selects the log records posted to the  workplace that was entered, the responsibility  area of which

the user has authorized rights to. You can also run a search using wildcards in the field.

Group from … to …

Selects  the  log  records  posted  to  the  workplaces,  the  responsibility  area  of  which  the  user  has

authorized rights to, and that are assigned to the entered group. You can also run a search using

wildcards in the field.

Cost center

Selects the log records posted to the staff, the responsibility area of which the user has authorized

rights to and that are assigned to the entered cost center.

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the medium-term data area.  You  need  not  explicitly activate the access to  the

medium-term data area.

Personnel shift log detail application

The detail application provides the following fields:

BDE-PMA_82.docx

Version: 1.2.23049

Page 16 of 21

Staff Logon / Reports

Category Shift

Shift date

Shift date of the shift in which the operation is completed.

Shift

Shift in which the operation is completed.

Person category

Person

Personnel number of the person logged on at the operation.

Last name

Last name of the person logged on at the operation.

First name

First name of the person logged on at the operation.

Name

Entire  name  of  the  person  (last  name,  middle  name  and  first  name)  who  was  logged  on  at  the

operation.

Operator position, designation, description

Operator  position  that  was  used  when  the  person  logged  onto  the  workplace  (depending  on  how

the system is configured).

Order category

Category

Order category for the order/ operation, e.g. production order (FA) or overhead cost order (GK).

Order type

Order type of the order

Order

Order number of the order/ operation.

Sequence

Sequence number for the operation (depending on how the system is customized/ configured).

Operation

Operation number for the operation

Split

Split number of the operation, if the operation is a split operation (depending on how the system is

customized/ configured).

Article/article designation

Article number and article designation of the operation.

BDE-PMA_82.docx

Version: 1.2.23049

Page 17 of 21

Staff Logon / Reports

Workplace category

Workplace/group/cost center

In  addition  to  the  order  and  article  number,  the  workplace  is  displayed  (including  group  and  cost

center of the workplace) where the operation has been produced in the selected shift.

Primary quantities category

Target quantity

The  operation's  target  quantity  in  each  of  the  quantity  units  (primary  quantity  unit,  secondary

quantity unit, tertiary quantity unit, base quantity unit).

For this column, no total is calculated. In some cases, one operation is produced

during several shifts and here it is not correct to calculate totals.

Yield

The yield posted for this operation in relationship to the selected shift.

Scrap

The scrap posted for this operation in relationship to the selected shift.

Rework

The rework quantity posted for this operation in relationship to the selected shift.

Open quantity

The open quantity posted for this operation in relationship to the selected shift.

Quantity unit

The relevant unit of quantity.

Duration category

Target duration

The target duration relating to the operation is edited as follows:

((Operation's  target  cycle  [per  1000])  /  1000  /  the  operation's  partitioning  *  operation's  target

quantity in primary quantity unit) + operation's setup time

For this column, no total is calculated. In some cases, one operation is produced

during several shifts and here it is not correct to calculate totals.

Production

The production time entered for this person at the operation in relationship to the selected shift.

Downtime

The downtime entered for this person at the operation in relationship to the selected shift.

Sum (total)

Total of all production times and downtimes (sum of columns Production + Downtime).

BDE-PMA_82.docx

Version: 1.2.23049

Page 18 of 21

Staff Logon / Reports

RPA category

RPA

Detailed presentation of the actual times entered at the resource performance accounts  level.

Note

Displaying the actual quantities and the actual durations (RPA)

The shift automatic option is not available for workplaces that are not assigned to any terminal or

that  are  assigned  to  a  terminal  configured  as  a  BDE  terminal  (shop  floor  data  collection).  This

means  that  there  are  no  automatic  order  or  person-related  postings  at  the  end  of  shifts.  In  this

case,  you  cannot  exactly  assign  the  recorded  quantities  and  durations  to  the  shifts.  The  system

therefore  assigns  quantities  and  durations  proportionally.  This  assignment  is  based  on  the

workplace's shift calendar.

Example:

In the example, the shift model is as follows: shift 1: 6:00 am to 2:00  pm; and shift 2: 2:00 pm to

10:00 pm. This shift model is assigned to a workplace that is in  accordance with the criteria listed

above. An OP has been logged on at 1:00 pm and off at 4:00 pm. For the OP logoff, 90 is uploaded

as the yield.

In this case, the shift log for the operation in shift 1 will calculate an order duration of 60 minutes

and a yield of 30. For shift 2, an order duration of 120 minutes is calculated and a yield of 60. The

RPA-related durations are also calculated based on the shift model that the workplace is based on.

Display of the personnel time in the personnel shift log

In the personnel shift log, the identifier  "Post production to main utilization  during break" from the

HYDRA  basic  settings  is  NOT  taken  into  account.  This  means  that  the  labor  duration  posted  to

main  utilization  (RPA  11)  during  breaks  is  removed  from  the  postings  the  calculation  is  based  on

(record type "B").

For  example:  the  calculation  is  based  on  a  shift  model  from  6.00  am  -  2.00  pm  with  a  break

between 12.00 noon and 1.00 pm. The status Production is in effect from 6.00 am to 12.30 pm and

from 1.00 pm to 2.00 pm.

7.30 hours will be posted as main utilization time for a person logged  on from 6.00 am - 2.00 pm

(assumption:  no  multiple  machine  operation)  -  if  the  identifier  "Post  production  to  main  utilization

during  break"  is  set. When  the  personnel  shift  log  is  called  up,  this  time  is  compared  to  the  shift

calendar  so  that  a  main  utilization  time  of  7.00  hours  is  calculated  for  the  shift  model  provided

above.

Durations acc. to person detail application

Shown  in  the  "Durations  acc.  to  person"  detail  application  are  the  durations  posted  to  each  person.

Considered here are the operations that were selected in the personnel shift log detail application.

BDE-PMA_82.docx

Version: 1.2.23049

Page 19 of 21

Staff Logon / Reports

The  bar  chart  shows  the  person  (personnel  number)  for  the  selected  operations  on  the  Y  axis  and  the

absolute values (durations) on the X axis. The respective quantity accounts specify the color of the bars

(production/RPA  11:  green;  downtimes/RPA  1-11:  red).  Bars  are  sorted  in  descending  order  by

production duration.

You can use a multi-combo box to define the durations that are shown as a bar:

- Production

- Downtimes

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the values on the bars. Note: These labels are displayed

for the selected duration.

Quantities acc. to person detail application

Shown in the "Quantities acc. to person" detail application are the cumulated quantities (primary quantity

unit) posted to each person. Considered here are the operations that were selected in the personnel shift

log detail application.

The bar chart shows the person for the selected operations on the Y axis and the posted quantities on the

X axis. The bar colors are based on each quantity account (yield: green; scrap: red, rework: blue, open

quantity: gray). Bars are sorted in descending order by yield.

You can define for which quantity accounts (primary quantity unit) you would like to show bars from a

multi-combo box:

- Yield

- Scrap

- Rework

- Open quantity

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the  values on the bars. What needs to be considered  is

that these labels are displayed for each selected quantity account.

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

BDE-PMA_82.docx

Version: 1.2.23049

Page 20 of 21

Staff Logon / Reports

 Order information

Use this button to call the application  Order information.

Order overview

Use this button to call the application Order overview.

BDE-PMA_82.docx

Version: 1.2.23049

Page 21 of 21

