Manual

Personalized Logon/Reports
BDE-PMA 8.1

Version 1.1.4716

Last changed on: 19.06.2020

Personalized Logon/Reports

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-PMA_81.docx

Version: 1.1.18468

Page 2 of 20

Personalized Logon/Reports

Contents

1  Overview – Personalized Evaluations .......................................................... 4

2  Staff Logged on / Personnel Overview ........................................................ 5

3  Personnel Report ....................................................................................... 10

4  Personnel Shift Log .................................................................................... 15

BDE-PMA_81.docx

Version: 1.1.18468

Page 3 of 20

Personalized Logon/Reports

1

 Overview – Personalized Evaluations

Purpose

The  function  package  provides  overviews  and  evaluations  in  MOC  on  BDE  postings  for  which

personalized postings exist.

Integration

The display or evaluation is performed on the basis of the personalized postings at the BDE terminal as

part  of  the  function  package  "Personalized  BDE  functions"  (BDE-BPF)  and  the  resulting  posting  in  the

system.

Features

  Personnel shift log with person-related and shift-related listing of the completed orders, incl. graphic

representations of quantities and times.

  Personnel  overview  with  display  of  which  employees  are  currently  logged  on  at  which  machines  /

workplaces and cost centers.

  Personnel report with list of which employees of an organizational unit (foreman's area, cost center,

department) have processed which operations in selected shifts or periods, incl. statistics with target/

actual comparison of times and quantities.

BDE-PMA_81.docx

Version: 1.1.18468

Page 4 of 20

Personalized Logon/Reports

2  Staff Logged on / Personnel Overview

Overview

Menu

Production control  Production overview  Staff logged on

Transaction code

pnov

Function authorization

pnov

Usage

The personnel overview provides the user in structured form current context related information relevant

to personnel in production. The necessary information is displayed from the standpoint of the relevant

person.

Integration

The  personnel  overview  is  an  indispensable  instrument  for  persons  with  HR  responsibilities  and  for

planners.  The  user  has  all  of  the  information  needed  at  a  glance  that  will  allow  her/him  to  make

spontaneous decisions on personnel issues. In day-to-day operations, especially at times when swift, yet

sensible decisions need to be made in production, the personnel overview is an extremely helpful tool to

those with responsibility.

Shown  in  the  personnel  overview  are  all  people  who  are  currently  logged  onto  a  workplace  and  who

match the selection criteria entered in the selection panel. If the "waiting period processing" is active, the

system also shows those people who are currently logged onto a waiting period operation.

Irrespective of the selections made below, only persons are shown for whom the editor has been

authorized for the relevant responsibility area.

The  review  of  the  valid  responsibility  area  authorization  is  performed  by  checking  against  the

responsibility  area  for  the  workplace  at  which  the  person  is  logged  on.  If  the  person  is  logged  onto  a

waiting period operation, then the review is based on the person's responsibility area.

Selection criteria

The application provides the following selection criteria:

Person from … to …

This selection criterion refers to the personnel number in the HR master data. All people are shown

who are found in the range of the selected personnel number.

BDE-PMA_81.docx

Version: 1.1.18468

Page 5 of 20

Personalized Logon/Reports

Employee group from … to …

This  selection  criterion  refers  to  the  employee  group  in  the  HR  master  data.  All  people  are

displayed who belong to the selected employee group. You can also run a search using wildcards

(placeholders *) in the field.

Last name

This selection criterion relates to the last name in the HR master data. All people are displayed with

the selected last name. You can also run a search using wildcards.

Company

This selection criterion refers to the company in the HR master data. All people are displayed who

are assigned to the selected company. You can also run a search using wildcards.

Area

This selection criterion relates to the area in the HR master data. All people are displayed who are

assigned to the selected area. You can also run a search using wildcards.

Cost center

This selection criterion refers to the cost center in the HR master data. All people are displayed who

are assigned to the selected cost center. You can also run a search using wildcards.

Workplace from … to …

This  selection  criterion  references  the  workplace  in  the  machine  or  workplace  master  data.

Displayed  are  all  people  currently  logged  onto  a  workplace  that  matches  the  specified  selection

criteria. You can also run a search using wildcards in the field.

Group from … to …

This  selection  criterion  references  the  group  in  the  machine  or  workplace  master  data.  Displayed

are  all  people  currently  logged  onto  a  workplace  that  is  assigned  to  the  group  that  was  entered.

You can also run a search using wildcards in the field.

Cost center

This selection criterion references the cost center defined in the machine or workplace master data.

Displayed are all people currently logged onto a workplace that is assigned to the cost center that

was entered. You can also run a search using wildcards.

Order

All  people  currently  logged  onto  an  order/  operation  pertaining  to  the  order  number  entered  are

displayed. You can also run a search using wildcards.

Order type

All  people  are  displayed  who  are  currently  logged  onto  an  order/  operation  for  the  selected  order

type.

BDE-PMA_81.docx

Version: 1.1.18468

Page 6 of 20

Personalized Logon/Reports

Staff logged on detail application

Person category

Person

Personnel number according the HR master data

Last name

Last name according the HR master data

First name

First name according the HR master data

Name

Entire name (last name, middle name and first name) according the HR master data.

Operator position

Operator position (abbreviation) that the person used to log onto the workplace.

This requires that operator positions are configured for the workplace and that the system expects

an  operator  position  to  be  entered  in  the  posting  dialog  (depending  on  how  the  system  was

customized/ configured).

Staff badge number

Staff badge number according the HR master data

Company

Company that the person is assigned to according to HR master data.

Area

Area that the person is assigned to according to HR master data.

Department

Department that the person is assigned to according to HR master data.

Cost center

Cost center that the person is assigned to according to HR master data.

Employee group

Employee group that the person is assigned to according to HR master data.

Premium indicator

Premium indicator (abbreviation) that the person used to log onto the workplace.

This requires that wage/ premium indicators are configured for the workplace and that the system

expects a premium indicator to be entered in the posting dialog (depending on how the system was

customized/ configured).

BDE-PMA_81.docx

Version: 1.1.18468

Page 7 of 20

Personalized Logon/Reports

Logon category

Date

Time

Point in time (date) since when the person has been logged onto the workplace.

Point in time (time) since when the person has been logged onto the workplace.

Workplace category

Workplace

Number of the workplace at which the person is logged on.

If the person is logged onto a waiting period operation, shown here is the workplace that the person

is assigned to according to the HR master data.

Group

Group that the workplace is assigned to according to the master data.

Cost center

Cost center that the workplace is assigned to according to the master data.

Company

Company that the workplace is assigned to according to the master data.

Order category

Order type

Order type of the operation at which the person is logged on.

Order

Order number of the operation at which the person is logged on.

Sequence

Sequence number of the operation at which the person is logged on (depending on how the system

was customized/ configured).

Operation number of the operation at which the person is logged on.

Split  number  of  the  operation,  if  the  operation  that  the  person  is  logged  onto  is  a  split  operation

(depending on how the system is customized/ configured).

OP

Split

SOP

Sub operation number (reserved)

Operation designation

Operation designation for the operation at which the person is logged on.

Article

Operation number for the operation at which the person is logged on.

BDE-PMA_81.docx

Version: 1.1.18468

Page 8 of 20

Personalized Logon/Reports

Article designation

Article designation for the operation at which the person is logged on.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Log person off

A person can be logged off from an operation/ workplace using the log person off function.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

BDE-PMA_81.docx

Version: 1.1.18468

Page 9 of 20

Personalized Logon/Reports

3  Personnel Report

Overview



Menu

Order management  Production reports  Personnel report

Transaction code

pnrp

Function authorization

pnrp

Usage

The purpose of the personnel report is to provide the ability to create a list in which all  personal postings

are  displayed  for  a  selection  of  people  showing  a  target/  actual  comparison  that  indicates  time  and

quantities over a certain time interval.

Integration

Define a report period applicable for the data to be requested and shown in the report.

The date area is clearly differentiated from the login date.

For interrupted operations, the login time from the personal postings is used and the current login time is

used for running operations.

Requirement

To  use  the  personnel  report,  what  is  required  is  that  personnel-related  postings  were  made  and  that

relevant postings are in the system.

Selection criteria

The application provides the following selection criteria:

BDE-PMA_81.docx

Version: 1.1.18468

Page 10 of 20

Personalized Logon/Reports

Date … to …

Narrows down the data records based on the date and time.

The  report  period  relates  to  the  person's  login  time,  i.e.  all  personal  log  records  (record  type  B)  are

selected that have a login time that is within the selection period.

Consider current logons

Choose this option to also show persons who were logged on in the period entered and who are currently

still logged on.

Person from … to …

Personnel number of the persons displayed.

Company

This selection criterion relates to the company defined in the HR master data. All persons are displayed

that are assigned to the selected company. Generally, the selection is based  on the current HR master

data (the HR master data of this version is not supported)

Cost center

The  person's  cost  center  as  defined  in  the  HR  master  data.  Generally,  the  selection  is  based  on  the

current HR master data (the HR master data of this version is not supported)

Area

Area defined for the persons as defined in the HR master data. Generally, the selection is based on the

current HR master data (the HR master data of this version is not supported)

Department

Department defined for the persons as defined in the HR master data. Generally, the selection is based

on the current HR master data (the HR master data of this version is not supported)

Last name

Selection by the person's last name as defined in the HR master data. Generally, the selection is based

on the current HR master data (the HR master data of this version is not supported)

Workplace ... to …

This selection criterion references the workplace in the machine or workplace master data. The selected

workplace is displayed.

Cost center

This selection criterion references the cost center defined  in the machine  or  workplace master data.  All

machines or workplaces are displayed that are assigned to the selected cost center.

BDE-PMA_81.docx

Version: 1.1.18468

Page 11 of 20

Personalized Logon/Reports

Group … to …

This  selection  criterion  references  the  group  in  the  machine  or  workplace  master  data.  All  machines  or

workplaces are displayed that are assigned to the selected report group.

Company

This  selection  criterion  references  the  company  defined  in  the  machine  or  workplace  master  data.  All

machines or workplaces are displayed that are assigned to the selected company.

Order

Selection by edited orders.

Category

This is the order type category.

Planned order

A planned order defined at the order.

Project number

A project number defined at the order.

Sales order

Selection by processed sales orders.

Customer designation

Selection by the customer designation defined at the order.

Order group

Selection by the order group defined at the order.

MRP controller

Selection by the MRP controller defined at the order.

Personnel report detail application

The  list  only  includes  data  of  people  for  whom  the  user  has  authorized  rights  to  (authorization  via  the

person's  area  of  responsibility).  As  concerns  merged  operations  formed  at  the  console,  ONLY  the

individual operations are displayed, not the merged operations themselves.

A table is generated for the requested data and output showing the following information:

Person category

Person

Personal master data such as name, operator position, premium indicator, employee group or even

the person's cost center.

BDE-PMA_81.docx

Version: 1.1.18468

Page 12 of 20

Personalized Logon/Reports

Logon/ Logoff category

Logon/ Logoff

Point in time when the person logs on or logs off.

Workplace category

Workplace

Workplace at which the person was logged on, as well as the cost center assigned to him.

Order category

Order

Order/ operation number assigned to what the person produced.

Primary quantities category

Target quantity/ yield/ scrap/ unit

Target quantity of the operation and the yield or scrap produced by the person (i.e. logged in). The

latter is drawn from personal postings (record type "B").

Additional  information  about  personal  quantity  postings  can  be  found  in  the  chapter  Entry  of

quantities in the document Introduction to HYDRA BDE and MDE.

Please note: The target quantities shown are not proportionately calculated target quantities, but in

fact  the  total  target  quantity  to  be  produced  for  the  operation  (cf.  Order  information,  index  tab

quantities).

Duration category

Proportionate  staff  duration/  setup  time/  processing  time/  actual  setup  time/  production/

standstills

In  addition  to  the  (target)  setup  time  and  the  (target)  processing  time  for  the  operation,  also

displayed is the logged in duration for the person, allocated by time of production and by standstill

period. If the person is logged on at different orders, what will be shown in the column Prop. labor

utilization will be the labor utilization attributed to the order (considering current logons).

Please note: The (target) setup time and the (target) processing time for the operation are not the

proportionately calculated durations, but in fact the values shown in the order information.

PivotGrid detail application

The  "PivotGrid"  detail  application  makes  it  possible  to  report  and  accumulate  the  data  based  on  other

criteria.

The  data  delivered  shows  all  people  and  their  cost  centers  and  provides  a  comparison  showing  which

labor utilization was provided for which cost center. The "Cost center" columns refer to the cost center for

the workplace at which the people logged on.

BDE-PMA_81.docx

Version: 1.1.18468

Page 13 of 20

Personalized Logon/Reports

BDE-PMA_81.docx

Version: 1.1.18468

Page 14 of 20

Personalized Logon/Reports

4  Personnel Shift Log

Overview

Menu

Order management  Production reports  Personnel shift log

Transaction code

pspr

Function authorization

pspr

Usage

The  personnel  shift  log  is  an  absolute  necessity  for  anyone  in  a  position  of  responsibility  in  production.

Here, the shift supervisor, the shift manager and the foreman are each provided a clear overview of all of

the important information needed relating to their staff.

The personnel shift log is a function in production management. This function makes it possible to create

shift-related  reports  about  the  produced  orders  by  person.  With  the  additional  graphic  presentations

showing  quantities  and  durations,  the  user  is  given  an  excellent  overview  of  all  data  concerning

personnel.

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities produced, the log also shows the time that was required in each case. This is shown for each

person logged on at the operation.

Integration

Shown in the personnel shift log are all operations that were selected in the selection panel. Here, only

BDE log records of record type "B" are considered.

When data is requested, if selected from the cost center, the responsibility area of the person is verified

and if selected from the workplace or group, the responsibility area of the workplace is verified.

It

is

possible

to

correct

the

entered

personnel

postings

in

the

BDE-related

postings\\archive\mast_ind\Functions\MOC\MOC_OrderBookings.pdf function.

Prerequisite

In order to use the personnel shift log, what is required is that personnel-related postings are performed

and that the relevant, finished postings (log records) exist in the system.

Selection criteria

The application provides the following selection criteria:

BDE-PMA_81.docx

Version: 1.1.18468

Page 15 of 20

Personalized Logon/Reports

Date from ... to ...

The  time  period  entered  restricts  the  selection  by  log  records.  The  log  records  are  selected  that

have a start date (logon date) within the defined period.

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

Operations that are logged in during the currently running shift at the time the data

are selected are not considered, because no log records have been generated for

them yet.

Workplace from … to …

Selects the log records posted to the  workplace that was entered, the responsibility area of which

the user has authorized rights to. You can also run a search using wildcards in the field.

Group from … to …

Selects  the  log  records  posted  to  the  workplaces,  the  responsibility  area  of  which  the  user  has

authorized rights to, and that are assigned to the entered group. You can also run a search using

wildcards in the field.

Cost center

Selects the log records posted to the staff, the responsibility area of which the user has authorized

rights to and that are assigned to the entered cost center.

Personnel shift log detail application

The following fields are displayed in the table:

Shift category

Shift date

Shift date of the shift in which the operation is completed.

Shift

Shift in which the operation is completed.

Person category

Person

Personnel number of the person logged on at the operation.

Last name

Last name of the person logged on at the operation.

BDE-PMA_81.docx

Version: 1.1.18468

Page 16 of 20

Personalized Logon/Reports

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

Article/ article designation

Article number and article designation of the operation.

Workplace category

Workplace/ group/ cost center

The  workplace  (including  the  workplace's  group  and  cost  center)  at  which  the  operation  is  being

completed in the selected shift is shown in addition to the order and article number.

Primary quantities category

Target quantity

The  operation's  target  quantity  in  each  of  the  quantity  units  (primary  quantity  unit,  secondary

quantity unit, tertiary quantity unit, base quantity unit).

This  column  is  not  added  up.  Since  totals  formation  is  not  correct  if  one  and  the

same operation is produced during several shifts.

BDE-PMA_81.docx

Version: 1.1.18468

Page 17 of 20

Personalized Logon/Reports

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

((Operation's target cycle [per 1000]) / 1000 / the operations partitioning * operation's target quantity

in primary quantity unit) + operation's setup time

This  column  is  not  added  up.  Since  totals  formation  is  not  correct  if  one  and  the

same operation is produced during several shifts.

Production

The production time entered for this person at the operation in relationship to the selected shift.

Downtime

The downtime entered for this person at the operation in relationship to the selected shift.

Sum

Sum of all production times and downtimes (sum of columns Production + Downtime)

RPA category

RPA

Detailed presentation of the actual times entered at the resource performance accounts  level.

Please note:

Displaying the actual quantities and the actual durations (RPA)

For  workplaces  that  are  either  not  assigned  to  any  terminal  or  for  those  that  are  assigned  to  a

terminal configured as a BDE (shop floor data collection) terminal, there is no shift automation. This

means that there are  no  automatic order or  person-related  postings at the end  of shifts. Because

this means that there is also no exact shift relationship to the entered quantities and durations, in

this case  a proportionate  assignment is made in  the  shift log. This assignment is made using the

workplace's shift calendar as the basis.

BDE-PMA_81.docx

Version: 1.1.18468

Page 18 of 20

Personalized Logon/Reports

Example:

In this case  we  have a shift model set for shift 1: 6.00 am to 2.00  pm and for shift 2: 2.00 pm to

10.00 pm. This shift model is assigned to a workplace that is in accordance with the criteria listed

above. Furthermore, we also have an OP log-in at 1.00 pm and an OP logoff at 4.00 pm. For the

OP logoff, 90 is uploaded as the yield.

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

7.30 hours will be posted as main utilization time for a person logged on from 6.00 am  - 2.00 pm

(assumption:  no  multiple  machine  operation)  -  if  the  identifier  "Post  production  to  main  utilization

during  break"  is  set. When  the  personnel  shift  log  is  called  up,  this  time  is  compared  to  the  shift

calendar  so  that  a  main  utilization  time  of  7.00  hours  is  calculated  for  the  shift  model  provided

above.

Durations acc. to person detail application

Shown  in  the  "Durations  acc.  to  person"  detail  application  are  the  durations  posted  to  each  person.

Considered here are the operations that were selected in the personnel shift log detail application.

The  bar  chart  shows  the  person  (personnel  number)  for  the  selected  operations  on  the  Y  axis  and  the

absolute values (durations) on the X axis. The bar colors are based on each quantity account (production/

RPA 11: green; downtimes/ RPA 1-11: red). Bars are sorted in descending order by production duration.

You can define for which durations you would like to show bars from a multi-combo box:

- Production

- Downtimes

The bars are shown "stacked" so that as a result the total quantity can be defined differently for each user

specifically.

By  activating  the  check  box  "Show  labels",  the  values  are  shown  on  the  bars.  What  needs  to  be

considered is that these labels are displayed for each selected duration.

BDE-PMA_81.docx

Version: 1.1.18468

Page 19 of 20

Personalized Logon/Reports

Quantities acc. to person detail application

Shown in the "Quantities acc. to person" detail application are the cumulated quantities (primary quantity

unit) posted to each person. Considered here are the operations that were selected in the personnel shift

log detail application.

The bar chart shows the person for the selected operations on the Y axis and the posted quantities on the

X axis. The bar colors are based on  each quantity account (yield: green; scrap: red, rework: blue, open

quantity: gray). Bars are sorted in descending order by yield.

You can define for which quantity accounts (primary quantity unit) you would like to show bars from a

multi-combo box:

- Yield

- Scrap

- Rework

- Open quantity

The bars are shown "stacked" so that as a result the total quantity can be defined differently for each user

specifically.

By  activating  the  check  box  "Show  labels",  the  values  are  shown  on  the  bars.  What  needs  to  be

considered is that these labels are displayed for each selected quantity account.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

BDE-PMA_81.docx

Version: 1.1.18468

Page 20 of 20

