Manual

MES-Cockpit Client Shop
Floor Information
MC-CSI 3.1

Version 1.0.23049

Last changed on: 01.09.2020

MES-Cockpit Client Shop Floor Information

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-CSI_31.docx

Version: 1.0.23049

Page 2 of 23

MES-Cockpit Client Shop Floor Information

Contents

1  MES-Cockpit Client Shop Floor Information ................................................ 4

2  Workplaces/Machines .................................................................................. 5

2.1  General ............................................................................................................... 5

2.2  Functions ............................................................................................................ 7

3  KPI Monitor ................................................................................................ 10

3.1  General ............................................................................................................. 10

3.2  Detail application OEE ...................................................................................... 11

3.3  Detail application Rate of capacity utilization ..................................................... 11

3.4  Detail application Produced quantities ............................................................... 12

3.5  Detail application Scrap rate .............................................................................. 12

3.6  Detail application Production times and downtimes ........................................... 13

3.7  Detail application Failure report ......................................................................... 13

3.8  General – KPI Monitor ....................................................................................... 14

3.9  General – Detail applications ............................................................................. 16

4  Contacts ..................................................................................................... 18

4.1  General ............................................................................................................. 18

4.2  Summary ........................................................................................................... 18

5  Messages Listing ....................................................................................... 20

5.1  General ............................................................................................................. 20

MC-CSI_31.docx

Version: 1.0.23049

Page 3 of 23

MES-Cockpit Client Shop Floor Information

1  MES-Cockpit Client Shop Floor Information

Purpose

The  function  package  Client  Shop  Floor  Information  in  MES-Cockpit  provides  extensive  functions  to

display instance-related online information on the following objects:

  Workplaces/machines

Tabular  overview  of  workplaces/machines  to  visualize  the  current  machine  condition  (status,

point  in  time  since  when  the  status  is  applicable)  including  basic  information  on  the

workplace/machine.

  KPI monitor

When starting the KPI monitor, it first provides an overview of the whole site and enables to drill

down key figures in relation to cost centers, machine groups and the single object "machine".

  Messages listing

List of planned maintenance orders (pool of orders including orders/OPs of the "maintenance"

category).

  Contact person

Search for contact partners within the company and check if they are available.

MC-CSI_31.docx

Version: 1.0.23049

Page 4 of 23

MES-Cockpit Client Shop Floor Information

2  Workplaces/Machines

2.1  General

App name

Workplaces/Machines

Short name of app

Workplaces

Function authorization

sma.wpov

The  tabular  overview  Workplaces/Machines  visualizes  the  current  machine  status  (status,  point  in  time

since when the status is available) including basic information on the workplace/machine. The application

helps to increase transparency in the shop floor. The user gets a clear overview of the current statuses of

machines and workplaces.

Selection criteria

The application provides the following selection criteria:

Resource

Enter the resource number (workplace number) to select from the workplaces.

Status text

Select the relevant status text to select the status that is displayed.

Field descriptions – List

Image

Shows the picture of the machine stored in the configuration of workplaces and resources.

Note: The picture is loaded when the selection is made. Before selection, a dummy image is shown

for the different machines.

Workplace number - workplace designation

Shows  the  workplace  number  and  workplace  name.  The  system  only  shows  the  workplaces  that

are included in the responsibility area the user is authorized for.

Group

Workplace group of the machine

Status

The  respective  workplace  statuses  are  presented  with  the  following  colors  used  for  the  available

resource performance accounts:

  RPA 1: dark-green

MC-CSI_31.docx

Version: 1.0.23049

Page 5 of 23

MES-Cockpit Client Shop Floor Information

  RPA 2: red

  RPA 3: pink (fuchsia)

  RPA 4: purple

  RPA 5: black

  RPA 6: dark-gray

  RPA 7: light turquoise

  RPA 8: pale blue

  RPA 9: dark blue

  RPA 10: brown

  RPA 11: light green

  RPA 12: turquoise

Field descriptions – Detail

Image

See description "List".

Workplace number - workplace designation

See description "List".

Status

See description "List".

Status text

Defined status text of the current status

Status since

Date when the status was set

Duration so far

Duration of the status (until now)

Expected end

If specified, the estimated end of the current status

Article

Article logged on to the machine

Article name

Name of the article/item logged on to the machine

MC-CSI_31.docx

Version: 1.0.23049

Page 6 of 23

MES-Cockpit Client Shop Floor Information

MES order number

MES order number of the operation currently logged on. If several operations are logged on to the

workplace at the same time, the operation is displayed that was logged on last.

If you click the MES order number, you are redirected to the Operation overview.

OP name

Name of the OP logged on

Company

Company of the workplace

Cost center

Cost center of the workplace.

Group

Workplace group of the workplace

2.2  Functions

Subject to the purchased licenses and the available authorizations, the application Workplaces/Machines

provides the following functions:

 TOP 5 of malfunctions during shift

Shows the ranking list of the TOP 5 downtimes at the machine including information on the duration

and

how

frequently

the  malfunction

occurred

at

the

respective  machine.

It is also possible to show the TOP 5 based on the frequency or total duration.

 Running OPs (Operations logged on)

The list shows all operations logged on to the machine. If you click the operation, you can change

to the Operation overview.

 Last 10 malfunctions

The list shows the 10 malfunctions that last occurred at the machine.

 Change status

Use  this  function  to  change  the  status  of  the  selected  machine.  A  list  of  the  possible  machine

statuses is provided. Select the relevant status.

Note: This function is included in the package SMA-AMF. Function authorization: sma.setstatus

MC-CSI_31.docx

Version: 1.0.23049

Page 7 of 23

MES-Cockpit Client Shop Floor Information

 Operation overview

Click  this  button  to  switch  to  the  Operation  overview  and  to  display  detail  information  on  the

operation, which was displayed in the detail view of the machine.

 Log operation on

Use  the  dialog  Log  operation  on  to  log  an  operation  on  to  the  currently  selected  workplace.

Select the operation (MES order number) and machine status via search dialog from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logon

 Log operation off

Use  the  dialog  Log  operation  off  to  log  an  operation  off  from  the  currently  selected  workplace.

You can use the logoff dialog to enter the operation number (MES order number), yield and scrap

quantities,  the  relevant  scrap  reason  and  a  new  machine  status.  You  can  use  a  search  dialog  to

select the MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logoff

 Interrupt operation

Use  the  dialog  Interrupt  operation  to  interrupt  an  operation  logged  on  to  the  currently  selected

workplace.

You can enter the operation number (MES order number), yield and scrap quantities, the relevant

scrap  reason  and  a  new  machine  status  in  the  dialog.  You  can  use  a  search  dialog  to  select  the

MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.interrupt

 Posting of part quantity (partial confirmation)

You can use the Partial confirmation dialog to post part quantities for an operation logged on to the

currently selected workplace.

You  can  enter  the  operation  number  (MES  order  number),  yield  and  scrap  quantities  and  the

relevant scrap reason in the dialog. You can use a search dialog to select the MES order number

and the scrap reason.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partial conf

MC-CSI_31.docx

Version: 1.0.23049

Page 8 of 23

MES-Cockpit Client Shop Floor Information

 Change partitioning

Use  the  Change  partitioning  dialog  to  change  the  current  partitioning  for  the  workplace  currently

selected.

The operation number (MES order number) and the new partitioning can be entered in the dialog.

You can use a search dialog to select the MES order number from the list of operations logged on.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partition

 Application settings

In this dialog, you can make specific settings for this application.

  Reload machine status:

o  No: The open application is not automatically updated.

o  Cyclic  loading:  If  this  option  is  set,  the  status  of  the  displayed  workplaces/machines  is

cyclically  updated.  The  duration  between  two  updates  is  defined  via  the  option  Reload

time.

o  EMQTT:  The  machine  status  is  promptly  updated  when  the  status  of  the  machine

changes  (via  EMQTT).  Requirement:  You  use  the  centralized  MDE  and  the  relevant

settings are made. If data collection is not performed via centralized MDE for the machine

and  if  the  machine  is  then  not  updated  via  MQTT,  an  update  in  the  application

Workplaces/Machines is also not possible.

  Reload time: The reload time specifies the time between the status updates. You can define a

value between 30 and 300 seconds as reload time.

To  enable  the  settings,  click  Save  after  having  performed  the  changes  and  close  the

application using

.

MC-CSI_31.docx

Version: 1.0.23049

Page 9 of 23

MES-Cockpit Client Shop Floor Information

3  KPI Monitor

3.1  General

App name

KPI monitor

Short name of app

KPI

Function authorization

sma.kpim

When  you  open  the  application  KPI  monitor,  you  get  a  clear  an  overview  of  the  KPIs  defined  for  the

factory/site. You can also get more detailed information and drill down the different KPIs in relation to the

integrated dimensions and the relevant object "machine".

The KPI monitor currently provides the following KPIs:

  OEE and its components

The  KPI  monitor  (start  screen)  shows  the  OEE  and  its  components  for  all  machines  (site)  as  a

bar chart in the OEE section.

o  OEE

o  OEE performance

o  OEE availability

o  OEE quality

The calculation is based on the formulas defined in HYDRA.

If you click the OEE section, you are forwarded to the detail application OEE.

  Rate of capacity utilization (utilization efficiency)

The KPI monitor (start screen) shows the current KPI rate of capacity utilization for all machines

(site) in a horizontal bar chart in the Rate of capacity utilization section.

If  you  click  the  Rate  of  capacity  utilization  section,  you  are  forwarded  to  the  detail  application

Rate of capacity utilization.

  Produced quantities

The  KPI  monitor  (start  screen)  shows  the  produced  yield  and  scrap  quantity  for  all  machines

(site) in a horizontal bar chart in the Produced quantities section.

If you click the produced quantities section, you are forwarded to the detail application produced

quantities.

  Scrap rate

The KPI monitor (start screen) shows the scrap rate for all machines (site) in a  bar chart in the

scrap rate section.

If you click the scrap rate section, you are forwarded to the detail application scrap rate.

MC-CSI_31.docx

Version: 1.0.23049

Page 10 of 23

MES-Cockpit Client Shop Floor Information

  Production times and downtimes

The KPI monitor (start screen) shows the production times and downtimes for all machines (site)

in a in a pie chart in the production and downtimes section.

If  you  click  the  production  and  downtimes  section,  you  are  forwarded  to  the  detail  application

production times and downtimes.

  Failure report

The  KPI  monitor  (start  screen)  shows  the  produced  yield  and  failure  (defective)  quantity  for  all

machines (site) in a horizontal bar chart in the  failure report section. The failure quantity results

from the number of recorded failure types and their weighting.

If you click the failure report section, you are forwarded to the detail application.

3.2  Detail application OEE

Graphic presentation (diagram) of the KPI OEE and its components for the object selected in the list.

Please note: The list only shows the workplaces for which data is available to calculate the OEE.

3.2.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

  Changing the dimension displayed

You can display KPIs for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

3.3  Detail application Rate of capacity utilization

Graphic presentation (diagram) of the KPI rate of capacity utilization (green) for the object selected in the

list.

The KPI rate of capacity utilization is calculated as follows:

𝑅𝑎𝑡𝑒 𝑜𝑓 𝑐𝑎𝑝𝑎𝑐𝑖𝑡𝑦 𝑢𝑡𝑖𝑙𝑖𝑧𝑎𝑡𝑖𝑜𝑛 =

𝑅𝑃𝐴11
∑ 𝑅𝑃𝐴1−11

Please  note:  The  list  only  shows  the  workplaces  for  which  data  is  available  to  calculate  the  rate  of

capacity utilization.

MC-CSI_31.docx

Version: 1.0.23049

Page 11 of 23

MES-Cockpit Client Shop Floor Information

3.3.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

o  Pie chart

  Changing the dimension displayed

You can display KPIs for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

3.4  Detail application Produced quantities

Graphic presentation of the produced yield and scrap quantities each in the "primary" quantity unit.

Please  note:  The  list  only  shows  the  workplaces  for  which  data  is  available  to  calculate  the  produced

quantities.

3.4.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

  Changing the dimension displayed

You can display KPIs for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

3.5  Detail application Scrap rate

Graphic presentation (diagram) of the KPI scrap rate for the object selected in the list. The KPI scrap rate

is calculated as follows:

𝑆𝑐𝑟𝑎𝑝 𝑟𝑎𝑡𝑒 =

𝑆𝑐𝑟𝑎𝑝𝑃𝑟𝑖𝑚𝑎𝑟𝑦
𝑆𝑐𝑟𝑎𝑝𝑃𝑟𝑖𝑚𝑎𝑟𝑦 + 𝑌𝑖𝑒𝑙𝑑𝑃𝑟𝑖𝑚𝑎𝑟𝑦

Please note: The list only shows the workplaces for which data is available to calculate the scrap rate.

MC-CSI_31.docx

Version: 1.0.23049

Page 12 of 23

MES-Cockpit Client Shop Floor Information

3.5.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

o  Pie chart

  Changing the dimension displayed

You can display KPIs for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

3.6  Detail application Production times and downtimes

Graphic  presentation  (diagram)  of  production  times  and  downtimes  for  the  object  selected  in  the  list.

Production time refers to the time posted to the resource performance account (RPA) 11 and downtime

refers to the durations posted to the resource performance accounts (RPA) 1-10.

Please note: The list only shows the workplaces for which data is available to calculate production times

and downtimes.

3.6.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

  Changing the dimension displayed

You can display KPIs for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

3.7  Detail application Failure report

Graphic  presentation  of  the  produced  yield  in  the  "primary"  quantity  unit  and  the  failure  (defective)

quantity of quality inspections. The failure quantity results from the number of recorded failure types and

their weighting.

Please  note:  The  list  only  shows  the  workplaces  for  which  data  is  available  to  calculate  the  produced

quantities.

MC-CSI_31.docx

Version: 1.0.23049

Page 13 of 23

MES-Cockpit Client Shop Floor Information

3.7.1.1

Functions of the detail application

  Changing the display layout

You can switch between the following display options:

o  Horizontal bar chart

o  Vertical bar chart

  Changing the dimension displayed

You can display the KPI failure rate in ppm for the following dimensions in the detail view:

o  Workplace group/machine group

o  Cost center

o  Workplace/machine

The KPI failure rate in ppm is calculated as follows:

𝑆𝑐𝑟𝑎𝑝 𝑟𝑎𝑡𝑒 =

𝐹𝑎𝑖𝑙𝑢𝑟𝑒 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦
𝑆𝑐𝑟𝑎𝑝𝑃𝑟𝑖𝑚𝑎𝑟𝑦 + 𝑌𝑖𝑒𝑙𝑑𝑃𝑟𝑖𝑚𝑎𝑟𝑦

∗ 1.000.000

3.8  General – KPI Monitor

3.8.1.1

Selection/filter options of the KPI monitor

 The KPI monitor provides the following selection options:

Date from / to

The selection criterion Date from/to specifies the period of time you want to evaluate.

Filter mode time/shift

Use the filter mode to specify whether the selection is based on a time or shift specified.

Shift

If you use the selection criterion Shift, you select shifts to specify the evaluated period of time (date

from  ...  to  ...).  If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system

automatically selects the medium-term data area.

Time from/to

If  you  use  the  selection  criterion  Time,  you  select  a  time  (from...  to...)  to  specify  the  evaluated

period  of  time  (date  from  ...  to  ...).  If  the  selection  period  exceeds  the  period  for  the  online  data

area, the system automatically selects the medium-term data area.

When you open the KPI monitor, the system uses the default selection for the display, which is

defined  in  the  application  settings.  If  you  change  the  selection,  this  selection  applies  for  the

MC-CSI_31.docx

Version: 1.0.23049

Page 14 of 23

MES-Cockpit Client Shop Floor Information

duration of the session.

Use the button Reset to reset the selection to the default selection defined in the application settings.

If you click a detail application, the selection criteria are used for the detail application.

The Failure report cannot show any evaluations based on shifts. If you have made a selection

by shift, this report does not display any key figure then. The KPIs in the Failure report are only

available if you have made a selection by Time from/to.

3.8.1.2

Application settings in the KPI monitor

 The KPI monitor provides the following application settings. These settings are used to predefine the

selection criteria used to open the KPI monitor:

Default date in filter

Use the field Default date in filter to assign the current date (date when KPI monitor is called) to the

selection field Date from/to or a calculated date with a relative specification. If you specify a relative

date, the following options are available:

  Number with the signs + and -

  Time period with the following options: days/weeks/months/years

Example:

Date of call

Default

date

in

filter

Transfer  to  the  selection  field

(relative)

Date from/to

15.05.2019

from: -2 days

to: + 3 days

from: 13.05.2019

to: 18.05.2019

Preset filter mode

If you use the field  Preset filter mode, the selection field filter mode is predefined, which specifies

whether the selection is based on a time or shift specified.

Default shift

Use the field Default shift to predefine the selection field Shift, which specifies the evaluated period

of time (date from ... to ...) using the shifts selected.

Time from/to

Use  the  field  Time  from/to  to  predefine  the  selection  field  Time  from/to,  which  specifies  the

evaluated period of time (date from ... to ...) using the time (from... to...) selected.

MC-CSI_31.docx

Version: 1.0.23049

Page 15 of 23

MES-Cockpit Client Shop Floor Information

3.9  General – Detail applications

3.9.1.1

Selection/filter options in the detail applications

 The detail applications provide the following selection options:

Resource

Enter the resource number (workplace number) to select from the workplaces.

Group

Workplace group

Cost center

Cost center of workplaces

Date from / to

The selection criterion Date from/to specifies the period of time you want to evaluate.

Filter mode time/shift

Use the filter mode to specify whether the selection is based on a time or shift specified.

Shift

If you use the selection criterion Shift, you select shifts to specify the evaluated period of time (date

from  ...  to  ...).  If  the  selection  period  exceeds  the  period  for  the  online  data  area,  the  system

automatically selects the medium-term data area.

Time from/to

If  you  use  the  selection  criterion  Time,  you  select  a  time  (from...  to...)  to  specify  the  evaluated

period  of  time  (date  from  ...  to  ...).  If  the  selection  period  exceeds  the  period  for  the  online  data

area, the system automatically selects the medium-term data area.

If you change the selection, this selection applies for the duration of the session and is also used when

you call the KPI monitor the next time.

The detail application Failure report cannot show any evaluations based on shifts. The selection

fields Filter mode time/shift and Shift are therefore not available.

3.9.1.2

Field descriptions – List

KPI

Numeric presentation of the KPI

Machine

Machine number and short description of the machine

MC-CSI_31.docx

Version: 1.0.23049

Page 16 of 23

MES-Cockpit Client Shop Floor Information

Full name of machine

Full name of the machine

3.9.1.3

Field descriptions – Detail

Machine

Machine number and short description of the machine

Graphic

Graphic display of the relevant KPI in a diagram

MC-CSI_31.docx

Version: 1.0.23049

Page 17 of 23

MES-Cockpit Client Shop Floor Information

4  Contacts

4.1  General

The application's aim is to search for contact persons within the company, to check if they are available

and to contact them directly from the application (depending on the hardware in use).

4.2  Summary

The  list  of  contacts  shows  information  about  the  relevant  persons  and  by  clicking  the  phone  or  mobile

number, the selected contact can directly be called. By clicking the e-mail address, a new e-mail opens to

send  a  message  to  the  contact.  Both  functions  can  only  be  used  if  the  hardware  in  use  supports  this

function.

A user name and password are required to log in to the "contact partners" application in the HR section

(login  via  badge  number  and  PIN  code  is  not  sufficient),  as  this  function  also  shows  data  of  other

employees  and  not  only  data  of  the  person  logged  in.  The  logged  in  user  can  only  see  the  employees'

data for whom they are authorized by responsibility areas.

The list of contacts shows the most important information about the persons, e.g.:

  Picture

  Company

  Area

  Cost center

  Function

  Phone numbers

  E-mail address

Selection criteria

The search field of the header allows searching across all displayed values.

Field descriptions - list

Person's name

The person's name showing the last name and first name

Attendance

Attendance statuses are represented by the following colors:

  Light-green: present

  Green: break

MC-CSI_31.docx

Version: 1.0.23049

Page 18 of 23

MES-Cockpit Client Shop Floor Information

  Blue: planned absent

  Yellow: day off

  Red: unplanned absent

  White: person does not clock in/out

  Gray: no status

Company phone

The person's business phone number

Mobile, company

The person's business mobile number

Company e-mail

The person's business e-mail address

Location

Location where the person clocked in

Planned present

For absent employees this refers to the date when they are planned to be present

MC-CSI_31.docx

Version: 1.0.23049

Page 19 of 23

MES-Cockpit Client Shop Floor Information

5  Messages Listing

5.1  General

The  application  provides  an  overview  of  the  maintenance  OPs  and/or  upcoming  and  thus  active

maintenance activities existing in the system. Consequently, the user is always aware of all maintenance

activities.

Selection criteria

The following selection criteria are available in the application:

Resource

Selects the specified resource.

Resource type

Selects the specified resource type.

Classification

Selects the classification of maintenances

Field descriptions - list

Resource

Resource number.

Resource designation

Name of resource

Resource type

Type of resource

Field descriptions - detail

"General" section

Order

This field is only relevant in connection with the additional feature "generate maintenance orders" or

the "generation of calibration (inspection) orders. If this field is filled out the included order number

refers  to  a  maintenance/calibration  order.  The  activity  will  automatically  be  reset  if  the

maintenance/calibration  order  is  finished.  As  the  maintenance/calibration  order  is  finished  for  this

activity, the order number is also removed from this input field.

Resource

Shows the combined order and operation number.

MC-CSI_31.docx

Version: 1.0.23049

Page 20 of 23

MES-Cockpit Client Shop Floor Information

Resource designation

Current status text of the operation.

Activity

Designation of the activity.

"Information" section

Information

To  ensure  that  the  user  or  the  maintenance  worker  receives  more  detailed  information  about

running  the  activity  (e.g.  notes  on  regulations  to  be  observed,  materials  to  be  used),  a  short

description can be stored for each maintenance activity.

"Assignment" section

Project number

This  field  is  only  relevant  to  the  activity  type  "K"  (calibration),  whereas  there  are  two  different

variants subject to system configuration.

Variant 1 (there is exactly one work plan for all calibration inspection plans):

=> Input of the calibration inspection plan number (without taking the version number into

account)

 Variant 2 (there is a separate work plan for each calibration inspection plan)

=> should remain empty.

.

Planned order

Control field that is currently not used. Consequently it remains empty.

Cost object

Control field that is currently not used. Consequently it remains empty.

Activity type

Identifies the activity type, calibrations, for example, are identified by the type K.

"Resource information" section

Inventory number

Displays  the  inventory  number  defined  in  the  resource  configuration.  Additional  information

including comments.

Engraving number

Shows the engraving number defined in the resource configuration. Additional information including

comments.

MC-CSI_31.docx

Version: 1.0.23049

Page 21 of 23

MES-Cockpit Client Shop Floor Information

Drawing number

Shows  the  drawing  number  defined  in  the  resource  configuration.  Additional  information  including

comments.

Manufacturer

Shows  the  manufacturer  defined  in  the  resource  configuration.  Additional  information  including

comments.

Owner

Shows  the  owner  name  defined  in  the  resource  configuration.  Additional  information  including

comments.

"Interval based on time" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The period of time, after which the maintenance activity is to be run, should be entered here.

Next activity

Point in time when the next activity becomes due.

"Interval based on operating hours" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The  period  of  time  (number  of  operating  hours)  after  which  the  maintenance  activity  is  to  be  run,

should be entered here.

Hours recorded so far

The time previously posted in HYDRA for this resource is shown here. This value is updated by a

cyclical process. It is to be observed here that, for the previously recorded hours, only those RPA

times are used, which have been marked as such in the resource type (option:  RPAs as hours of

operation in the Maintenance Calendar).

Next activity

Number of hours of operation after which the next activity becomes due.

MC-CSI_31.docx

Version: 1.0.23049

Page 22 of 23

MES-Cockpit Client Shop Floor Information

"Interval based on cycles" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The number of machine cycles after which maintenance is to be carried out.

Previously recorded cycles

The number of resource cycles recorded so far in HYDRA is displayed here. This value is updated

by a cyclic process.

Next activity

Number of cycles after which the next activity becomes due.

5.1.1.1

MC-CSI_31.docx

Version: 1.0.23049

Page 23 of 23

