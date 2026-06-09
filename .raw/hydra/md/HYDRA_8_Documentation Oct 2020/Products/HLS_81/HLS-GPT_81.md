Manual

Graphic Planning Board
(MOC)
HLS-GPT 8.1

Version 1.0.23435

Last changed on: 28.09.2020

Graphic Planning Board (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-GPT_81.docx

Version: 1.0.23435

Page 2 of 56

Graphic Planning Board (MOC)

Contents

1  Overview: Graphic Planning Board .............................................................. 4

Graphic planning board ..................................................................................... 6

1.1  The graphic planning board ................................................................................. 7

1.1.1  Toolbar .................................................................................................... 8

1.1.2  Time scale ............................................................................................. 19

1.1.3  Presentation of groups and workplaces/machines ................................. 20

1.1.4  Functions on the level of the group/workplace ....................................... 22

1.1.5  Displaying operations in the Gantt ......................................................... 23

1.1.6  Operation functions ............................................................................... 26

1.1.7  Presentation of relationships / network view .......................................... 28

1.1.8  Print preview/Print ................................................................................. 28

1.2  Settings ............................................................................................................. 33

1.2.1  Tab Main page ...................................................................................... 33

1.2.2  Tab Planning component ....................................................................... 36

1.2.3  Tab Bar layout ....................................................................................... 38

1.2.4  Tab Tooltip/bar text................................................................................ 41

1.2.5  Workplace tab ....................................................................................... 45

1.2.6  Tab Priorities ......................................................................................... 48

1.2.7  Tab "Operation links" ............................................................................. 48

1.2.8  Tab Views ............................................................................................. 49

1.3  Tabular Pool of groups ...................................................................................... 49

1.4  Tabular Pool of workplaces ............................................................................... 49

1.5  Notes................................................................................................................. 50

1.6  Conflict list ......................................................................................................... 51

1.7  Processing notes ............................................................................................... 54

1.7.1  Show maintenance ................................................................................ 54

HLS-GPT_81.docx

Version: 1.0.23435

Page 3 of 56

Graphic Planning Board (MOC)

1

 Overview: Graphic Planning Board

Purpose

This function package provides basic features of the graphic planning board. The graphic planning board

clearly shows planned operations, specific machines  and scheduled times. Using the  intuitive operating

concept  of  the  graphic  planning  board  you  can  quickly  and  efficiently  plan,  replan  and  deallocate

operations.

You use the function package for the following purposes:







you want to plan operations in a graphical user interface

you want to get an overview of the current planning

you want to quickly identify free capacities in production and use these capacities

Features

  Time frames, zooming, scrolling

o  Planning  board  with  variable  time  frames,  zoom  and  scrolling  functions,  shift  calendars

as basis for the available capacity

  Gantt chart

o  Gantt chart with operations (machine assignment)

  Graphic order backlog

o  Graphical  presentation  of

the  order  backlog

for  machines/workplaces  or

machine/workplace groups

  Tabular order backlog

o  Tabular presentation of the order backlog for machine or workplace groups

  Tabular machine assignment

o  Tabular  presentation  of  planned  operations  (machine  assignment/occupancy)  for  each

machine/workplace

  Color-coded OP bars

o  Color-coded display of setup times, startup times, production times, retooling times and

idle  times  or  of  various  operation  statuses  (active,  interrupted,  done).  Coloring  can  be

defined individually.

  Tooltip

o  Configurable info window showing detailed information (tooltip) about operations

  Display of planning conflicts and schedule violations

o  Display of planning conflicts (double occupancy) and scheduling violations (delays)

  Display of current BDE uploads

HLS-GPT_81.docx

Version: 1.0.23435

Page 4 of 56

Graphic Planning Board (MOC)

o  Current BDE uploads (machine statuses, operation statuses) are shown

  Conflict list

o  Conflict  list  with  detailed  information  about  planning  conflicts  (e.g.  delayed  operations,

resource not available, resource overloaded, etc.)

  Print function

o  Print functions with page preview and various tools

  Ability to navigate to other applications

o  Ability to navigate in workplace overview, order information or order overview

HLS-GPT_81.docx

Version: 1.0.23435

Page 5 of 56

Graphic Planning Board (MOC)

Graphic planning board

Overview



HYDRA menu

FEDRA menu

Transaction code

Function authorization

Production control  Preparations for production  Graphic planning

Detailed scheduling  Planning  Graphic planning

grap

grap

HYDRA menu

Production control  Preparations for production  Info shop floor planning

Transaction code

grapi

Function authorization

grapi

Available user fields

Where?

Object type/user field key

Source (type)

Tabular Pool of groups

AUNR/SYSTEM

Tabular Pool of groups

AGNR/SYSTEM

Tabular Pool of workplaces

AUNR/SYSTEM

Tabular Pool of workplaces

AGNR/SYSTEM

Tooltip

Tooltip

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

Order (MF-D)

Operation (MF-D)

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You use the graphic planning board if:

  You would like to have the updated planning situation displayed,

and/ or

  You would like to make planning changes.

Integration

You  can  use  the  graphic  planning  board  to  plan  capacities  for  machines  and  workplaces  in  your

production department.

HLS-GPT_81.docx

Version: 1.0.23435

Page 6 of 56

Graphic Planning Board (MOC)

If  you apply the graphic planning board as information tool,  you only use  it to obtain an overview about

latest planning; no changes can be made in the info shop floor scheduling application.

Requirements

Proceed  as  described  below  in  order  to  display  the  most  up-to-date  planning  in  the  graphic  planning

board:

  You  have  created  orders  that  are  relevant  for  planning  in  the  system  (production  orders,

maintenance  orders,  project  orders)  or  you  have  downloaded  these  orders  from  a  higher-level

system.

  You have coordinated responsibilities within  your company as concerns order planning and  you

have defined which workplace/machine groups should be planned. Based on these initial steps,

you have defined the necessary Planning profiles.

In order to Change the planning in the graphic planning board, you must:



start the graphic planning board via the menu item Graphic planning, and

  have been issued the corresponding planning function authorizations.

Please  note  that  "workplace  assignment"  of  the  Personnel  Scheduling  module  (PEP)  and  the

graphic  planning  board  should  not  be  used  simultaneously.  Inconsistencies  might  occur  if

personnel  and  capacities  are  planned  at  the  same  time,  as  the  "workplace  assignment"

application uses data structures of "graphic planning" (only applicable if HYDRA is used).

1.1  The graphic planning board

The graphic planning board is the basic element of the planning system. The graphic planning board is

modeled  after  a  traditional  planning  board.  The  planning  board  compares  capacity  groups  including

individual  capacities  (workplaces/  machines)  with  the  pool  of  orders  (pool  of  groups)  or  the  operations

already planned for individual capacities.

All  order  types  are  relevant  for  planning  that  have  been  configured  using  the  ID  "Planning".  You  can

customize these Order types in the system.

The following chart illustrates the "Graphic planning" dialog:

HLS-GPT_81.docx

Version: 1.0.23435

Page 7 of 56

Graphic Planning Board (MOC)

Please note: This screenshot  illustrates  one  possible presentation of the planning board.  Depending on

the settings, the presentation may vary.

1.1.1 Toolbar

This chapter describes the functions that you can call via the toolbar. Please keep in mind that the ability

to  use  certain  functions  depends  both  on  which  licenses  are  available  as  well  as  how  the  function

authorizations were assigned.

Furthermore, some functions are generally not available in "info shop floor scheduling" mode.

1.1.1.1

Tab Main page

Category Data

Data is requested

Data matching the selection criteria  entered in the "selections" tab  is read from the database and

loaded into the planning board.

HLS-GPT_81.docx

Version: 1.0.23435

Page 8 of 56

Graphic Planning Board (MOC)

Each  operation  that  is  planned  in  the  detailed  graphic  planning  requires  a  remaining  time

formula. You use the remaining time formula to identify the planning duration of the operation.

HYDRA: as of service pack 16

FEDRA: as of version 1.1.

When  requesting  data,  a  note  appears  when  operations  are  loaded  where  the  remaining  run

time is missing.

HYDRA: as of service pack 16

Fedra: as of version 1.1

Starting with service pack 16, a note appears when operations are loaded with negative yield.

Cancel

Interrupts the process of requesting data.

Print all

Shows the entire print area. You can restrict or zoom the print area in this view. Refer to the chapter

1.1.8 Print preview for more information.

Save planning

Function authorization: grapt.save

The  current  assignment  is  saved.  Changes  are  stored  in  the  database  and  are  thus  available  for

other planners.

The  internal  fields  used  for  sorting  of  the  Terminal's  sequencing  list  are  set  to  the  start  date  and

start time as specified by the planner in the graphic planning board.

A pop-up dialog appears to notify the planner that changes have been saved.

A  maximum  of  32.768  operations  may  be  changed  and  stored  for  planning

purposes.

Lock all

The button "Lock all" is only available if the modification graplocking is enabled.

HLS-GPT_81.docx

Version: 1.0.23435

Page 9 of 56

Graphic Planning Board (MOC)

By clicking the button "lock all", you can lock all workplaces and groups of the planning scenario at

once. Further information on the locking mechanism you can find here .

This function does not require a function authorization.

Category Planning function

Automatic assignment

Function

authorization:

grapt.autopl

The  function  for  Automatic  assignment  is  called  up.  Doing  so,  this  function  distributes  all  of  the

operations to be planned in the planning board to the workplaces (capacities) based on the current

allocation strategy.

Plan operation

The button "plan operation" is only available if the extension grapt.sbsp is enabled.

Function authorization: grapt.sbsp

One-step planning is carried out. This method plans all  unplanned operations separately  (step  by

step) according to the current planning algorithm.

Close gaps

Function authorization: grapt.closegaps

If there are any gaps between individual operations, the function Close gaps closes these gaps.

Generate campaign

Function authorization: grapt.cpnbuild

The function for Generate campaign is called up. Operations meeting specific criteria can be

combined in a campaign.

Category Options

Search operation

All operations matching the criteria entered are selected.

Notes on the individual fields:

  Operation: this is a combined order/ operation number (MES order number).

  Article:  The  article/item  stored  in  the  operation  (see  Order  information  >  Operations  >  tab

Operation > field Article)

  Tool:  The  (main)  tool  stored  in  the  operation  (see  Order  information  >  Operations  >  tab

Operation > field Tool)

HLS-GPT_81.docx

Version: 1.0.23435

Page 10 of 56

You can also run a search using wildcards (at the beginning and/or end of a character string).

Next time you call the function, the dialog shows the selection criteria that you have entered the last

Graphic Planning Board (MOC)

time.

Settings

Here,  you  can  modify  different  settings,  such  as  changing  bar  colors.  Settings  describe  the

individual options.

Save

You can change the default layout of the application. You can e.g. change the following:

  Add or remove a detail application from the Planning details tab.

  Add or remove columns in a table and exchange the alignment of categories and columns in a

table.

  Change the width of the groups and workplaces/machines displayed on the left hand side of the

Gantt chart.

  Create settings in the dialog Settings.

You  must  save  these  changes,  if  the  changed  dialog  layout  should  still  be  available  after  having

closed the application. Click the Save icon in the toolbar to save the changed application layout.

1.1.1.2

Tab Selection

Category Data

The functions are similar to the ones in Tab Main page.

Category Selection

planning profile

Select a  Planning profile before requesting  data.  You use this planning profile to load,  display and plan

assigned capacity groups.

We recommend that planners with many responsibility areas make use of planning profiles. Benefits:

  Better overview

HLS-GPT_81.docx

Version: 1.0.23435

Page 11 of 56

Graphic Planning Board (MOC)

  Faster load times when requesting data

If you do not select a planning profile in the graphic planning board, all workplaces are loaded, which are

included in the responsibility areas the planner is authorized for.

Planning horizon

The user can manually modify the dates Planning horizon from/ to at any time. The data selection always

refers  to  the  dates  entered  in  the  input  fields.  The  system  selects  all  operations  with  a  scheduled  start

time within this period.

planning variant

Function authorization: grapt.plvar

There  is  also  the  option  to  work  with  so-called  Planning  variants.  A  planning  variant  combines  specific

settings that are relevant for the planning. For the most part, these are settings taken into account when

using  the  Automatic  assignment  function.  Please  keep  in  mind  that  the  extent  to  which  you  can  create

and edit planning variants/versions depends on the license.

Order type

If you select one or several order types, only those operations are loaded and displayed that belong to an

order of the respective order type.

Using this selection option, you can for example select and plan capacity or simulation orders.

The planning of the production orders is not affected in this case. Important: Always include all

order types when you select production orders before you perform and save a real planning.

1.1.1.3

Tab View

Category Planning board

Expand/collapse all groups

Opens or closes groups

Zoom in

You  modify  the  Gantt  presentation  in  order  to  increase  the  degree  of  accuracy  of  the  time  scale.

Alternately,  you  can  also  enlarge  the  presentation  using  the  key  combination  Ctrl  +  +  (numeric

keypad) or using the mouse wheel: turn the mouse wheel while keeping the Ctrl key held down.

HLS-GPT_81.docx

Version: 1.0.23435

Page 12 of 56

Graphic Planning Board (MOC)

Zoom out

You  modify  the  Gantt  presentation  in  order  to  get  a  better  overview.  Alternately,  you  can  also

reduce the size of the presentation using the key combination Ctrl + - (numeric keypad) or using the

mouse wheel: turn the mouse wheel while keeping the Ctrl key held down.

General view

The general view is an additional window showing the complete Gantt chart and the  Histogram (if

shown). One separate frame is displayed showing each chart and histogram section that the main

window is currently displaying. If you move the frame with the mouse, the section displayed in the

main  window  is  moved  accordingly  when  you  release  the  mouse  button.  Similarly,  you  can  zoom

the frame. The display detail in the main window is then changed accordingly. And vice versa, size

and  position  of  the  frame  also  change,  if  you  zoom  or  scroll  the  section  displayed  in  the  main

window.

Note:

Open and close the General view by clicking the relevant button. Every time you request data, the

General view is automatically closed.

Legend

The  legend  view  is  an  additional  window  to  present  a  legend  on  the  screen.  The  following

information is shown:

  Processing time (in some cases, shown multiple times because of different color codes!)

  Setup time

  Dynamic setup time

  Teardown/retooling time

  Operation fixed (blue arrow or red bar)

The  configurations

in

the  Settings,  section  Bar

layout,  specify

the  respective  display.

HLS-GPT_81.docx

Version: 1.0.23435

Page 13 of 56

Notes:

Open and close the legend by clicking the relevant button. Every time you request data, the legend

Graphic Planning Board (MOC)

is automatically closed.

Category Operations

Links

The relationships (links) between each of the operations are shown as lines.

The links are shown and removed by clicking the relevant button.

Priority

The  priorities  of  each  of  the  separate  operations  are  shown  as  triangles.  You  can  configure  their

color codings in the Settings.

The priorities are shown and removed by clicking the relevant button.

Fixing

A symbol (triangle) or a red bar identifes fixed operations. You can configure their color codings in

the Settings.

The symbols or bars are shown and removed by clicking the relevant. button.

Resource occupied/locked

You can identify reserved/blocked resources. The use of this function is described here.

Notes on operations

This  function  displays  the  detail  application  Notes  on  operations.  The  use  of  this  function  is

described here.

Open and close the detail application by clicking the relevant button.

Show delays

You can identify delayed operations. The use of this function is described here.

Category Adjust bar colors

The buttons of the category  Adjust bar colors link to the respective functions in the HLS settings. For a

description of the functions, please refer to the section Tab Bar layout - Bar colors.

HLS-GPT_81.docx

Version: 1.0.23435

Page 14 of 56

Graphic Planning Board (MOC)

1.1.1.4

Tab Planning details

conflict list

Function authorization: grapv.conflict

A  detail  application  is  opened  showing  the  planning  conflicts  for  the  current  planning  profile.  For

more information about the conflict list, refer to the details described here.

Open and close the detail application by clicking the relevant button.

KPI

Function authorization: grapv.keyf

A detail application opens showing KPI to assess the current planning.

Open and close the detail application by clicking the relevant button.

Utilization profile

Function authorization: grapv.capgroup

A detail application opens displaying the Utilization profile.

Open and close the detail application by clicking the relevant button.

Kapazitätsauslastung

Function authorization: grapv.captotal

A detail application opens showing the Capacity utilization.

Open and close the detail application by clicking the relevant button.

Histogram

Function authorization: grapv.hist

The Histogram is displayed below the Gantt.

Open and close the detail application by clicking the relevant button.

Resource view

Function authorization: grapv.resview

The Resource view is displayed.

Open and close the detail application by clicking the relevant button.

Pool of groups

Function authorization: grapv.tabgrp

The function call Pool of groups opens a detail application showing the operations that are planned

for a group. The display includes the scheduled operations for all groups.

HLS-GPT_81.docx

Version: 1.0.23435

Page 15 of 56

Graphic Planning Board (MOC)

Open and close the detail application by clicking the relevant button.

HYDRA: as of service pack 16

Fedra: as of version 1.1

Operations in the tabular and the graphic group list can be scheduled in the context menu.

You can select in the corresponding dialog the workplace/machine to be planned and the planned

start (menu point "Point in time") for the operation.

HLS-GPT_81.docx

Version: 1.0.23435

Page 16 of 56

Graphic Planning Board (MOC)

Available workplaces/Workplace backlog

Function authorization: grapv.tabwp

The function call Pool of workplaces opens a detail application showing all scheduled operations of

a workplace in tabular form.

Open and close the detail application by clicking the relevant button.

Order network

Function authorization: grapv.orview

An application opens showing the Order network the selected operation is assigned to.

Open the detail application by clicking the relevant button. Unlike the other detail applications, the

order network is not closed by clicking the button again, but by closing the window.

1.1.1.5

Planning functions tab

HYDRA: as of service pack 16

FEDRA: as of service pack 1.1

There  is  a  "Planning  functions"  tab  as  of  Service  Pack  16. The  buttons  for  the  following  functions  have

been moved to this tab:

Automatic assignment

Plan operation

Close gaps

Generate campaign

  Start optimization

The new tab also includes a button for the following function:

HLS-GPT_81.docx

Version: 1.0.23435

Page 17 of 56

Graphic Planning Board (MOC)

Cognitive planning

Reserved for future applications

.

1.1.1.6

Tab Simulation

The "Simulation mode" in the capacity planning table supports the creation and saving of different plans

on  the  basis  of  initial  situations  and  the  comparison  of  different  plans.  The  functions  of  the  simulation

mode are described at here.

A description of the buttons included in this tab is provided here

1.1.1.7

Tab Optimization

The  planner  can  use  the  "optimization"  function  to  calculate  several  planning  runs  automatically.  The

system  uses  different  parameters  for  the  calculation  of  the  individual  planning  runs  and  evaluates  the

planning  runs  using  a  KPI.  The  planning  providing  the  best  KPI  during  the  optimization  process  will  be

used.

How the optimization process works is described here.

1.1.1.8

Tab Personnel requirement

You  can  use  the  function  Personnel  requirement  of  the  graphic  planning  to  show  and  compare  the

required and available personnel in a histogram and a table.

The functions and input options provided in this tab are described here.

The display of personnel requirements in tabular form is available as of Service Pack 15.

1.1.1.9

Tab Energy consumption

Function authorization: grapv.egfc

A detail application opens showing the energy consumption for operations. This function is only available,

if you use the Energy Management EMG (only applicable if HYDRA is used).

Open and close the detail application by clicking the relevant button.

HLS-GPT_81.docx

Version: 1.0.23435

Page 18 of 56

Graphic Planning Board (MOC)

The  graphic  planning  integrates  seconds  to  display  the  planned  energy  consumption.  We

recommend to take this into account when you define the upper limit value.

Example (we used large numbers for demonstration purposes)

-  An  OP  has  a  target  quantity  of  1,000  pieces,  a  processing  time  of  1:00  hour  and  an

input quantity of 100 kWh that is stored as a component. In this example, the resulting

required  quantity  of  the  OP  is  100,000  kWh  (target  quantity  x  input  quantity).  In  the

graphic planning, an energy consumption of 27,78 kW is displayed for the OP (required

quantity / processing time [sec]).

-

In this example, the upper limit value is understood as load limit. If the supplier provides

27,000  kWh  within  a  time  frame  of  15  minutes,  an  average  of  30  kW  is  available  per

second in this time frame (provided quantity / time frame [sec]).  Here,  you should use

30 kW as upper limit value.

1.1.1.10  Tab Planned inventory levels

A detail application opens showing the material trend for materials or articles.

Open  and  close  the  detail  application  by  clicking  the  relevant  button.  The  functions  and  input  options

provided in this tab are described here.

1.1.2 Time scale

A  blue,  vertical  line  identifies  the  current  point  in  time  "now".  In  addition,  red  vertical  lines  visualize  the

end of each day.

The dimension of the time scale is defined in the Settings.

To change the resolution, resize the time scale (by holding down the left mouse button).

Another  blue,  vertical  line  shows  the  planning  time  fence.  This  time  fence  is  specified  in  the  planning

variant. If it is 0, no planning time fence is used. If no planning variant is specified, the planning time fence

of the basic settings is used. If it is 0, no planning time fence is used. If the planning horizon starts in the

future ("From" > today), then no planning time fence is used.

Note

Every time you request data, the time scale is set back to its original setting.

The format of the date values displayed on the Gantt chart depends on the format specified by

the operating system. The client format is not relevant.

HLS-GPT_81.docx

Version: 1.0.23435

Page 19 of 56

Graphic Planning Board (MOC)

1.1.3 Presentation of groups and workplaces/machines

The workplaces/machines that are available for planning are displayed on the left hand side. A workplace

is shown if the following criteria are met:

  The ID "planning function" is set to 'P' or 'H' in the Workplace and resource configuration.

  The workplace is not "blocked" in the Workplace and resource configuration.

  The workplace is assigned to a Group that is defined as a capacity group.

  The  group  that  the  workplace  is  assigned  to,  uses  the  selected  Planning  profile.  Here,  the  option

Visible in shop floor plan is enabled.

  The workplace/machine is in the planner's Responsibility area.

If you open the graphic planning board and request data, the overview of workplace groups is generally

shown. The group number is shown. You can define the order of the groups using the field  Sequence in

the configuration of the Planning profile.

Please  keep  in  mind  that  the  values  in  the  field  Sequence  must  be  unique  within  a  planning

profile. Otherwise the order is random.

Select a group by clicking it. The workplaces/machines of this group are shown. Use the field  Position in

the  Group  assignment  configuration  to  specify  the  order  in  which  workplaces  of  a  group  are  displayed.

Please  keep  in  mind  that  the  values  in  the  field  Position  must  be  unique  within  a  group.  Otherwise  the

order is random.

List of workplaces: Columns

The following columns are available for display in the list of workplaces:

Header

(none)

Meaning

Comment

Status color or RPA color
(according to the Setting)

Due to the linked logic, group workplaces always have
the  status  Production  (assigned
the  resource
to
performance account Main utilization).
You can define the update interval of the status in tab
General of the settings.
Note:  If  the  option  Show  personnel  assignment  is
enabled in the Settings, the symbol [+] or [-] is shown.
This  is  the  case  for  all  workplaces,  even  though  no
staff  is  assigned  in  the  Personnel  Scheduling  (PEP)
(only applicable if HYDRA is used).

Workplace

Number of the
workplace/machine

HLS-GPT_81.docx

Version: 1.0.23435

Page 20 of 56

Header

Meaning

Comment

Graphic Planning Board (MOC)

Short name

Designation

Group

Short name of the
workplace/machine

Full name of the
workplace/machine.

Group of the
workplace/machine.

Symbol

Graphic

Performance level  Current performance level of

the workplace/machine.

The performance level is read from the database when
requested.  When  updating  subsequent
data
statuses, the performance level is not updated.

is

The planner defines in the tab Workplace of the settings which columns are displayed in the table. The

configuration is saved user-specifically. You can also change column widths by "dragging" columns in the

table. This modification is also stored for the specific user.

If  the  extension  graplocking  is  enabled,  workplaces  or  opened  workplace  groups,  which  have

been  blocked  as  part  of  the  planning  process,  are  highlighted  in  color.  You  will  find  further

information on the display of personnel capacities in the Graphic Planning here.

Tooltip

If the mouse pointer rests on a workplace, a tooltip is displayed providing the following data:

Meaning

Single workplace

Group workplace

Header

Workplace

Short name

Designation

Cost center

Number of the workplace/machine
according to configuration

Short name of the workplace/machine
according to configuration

Full name of the workplace/machine
as configured

Cost center of the workplace/machine
as configured

Workplace type

status

Workplace type as configured:
E = Individual workplace
G = Group workplace

Status number and name of the
workplace/machine status as
configured

Status since

Point in time (date, time) since when
the status has been active.

X

X

X

X

X

X

X

X

X

X

X

X

-

-

HLS-GPT_81.docx

Version: 1.0.23435

Page 21 of 56

Graphic Planning Board (MOC)

1.1.4

Functions on the level of the group/workplace

You can perform the functions described in the following if you select a workplace or group in the column

Workplace and right-click it (to open the context menu). The order in the context menu may vary from the

order the functions are described here:

Workplaces/Machines

This menu item starts the application Workplaces/machines for the current workplace/machine or group.

The workplace number or group is transferred to the application as selection criterion.

Close gaps

Should there be any gaps between individual operations, you can use the Function to close these gaps.

If you open the context menu on group level, this function closes the gaps of all workplaces belonging to

the selected group. If you start the context menu from a workplace, you can only close the gaps for this

workplace.

Change shift model/ performance level

The  entry  is  only  available  if  you  request  the  context  menu  from  the  workplace.  You  can  change  the

following configurations for a workplace without having to switch to the workplace/machine configuration:

You  can  change  the  performance  level  of  a  workplace/machine.  The  performance  level  is  used  to

calculate the processing time/Remaining run time.

In addition, you can also define or change a year model used for planning that is not identical to the year

model used for data collection.

Please keep in mind: this data is only stored if you save the planning.

Add individual shift time

Call this function to define a time without shifts for a workplace that is different from the times defined in

the shift model. You can find more information about individual shift time here.

Single-line presentation

With single-line presentation, operations assigned twice are not displayed one below the other (i.e. listed)

but one on top of the other (i.e. overlapping).

Two-line presentation:

Single-line presentation:

HLS-GPT_81.docx

Version: 1.0.23435

Page 22 of 56

Graphic Planning Board (MOC)

Note:

- With single-line presentation the text on OP bars might partly not be visible

-  It  is  only  a  temporary  presentation  option.  Every  time  you  request  data,  parallel  operations  are  again

displayed one below the other.

Select operations in the pool of groups

This entry is available if you call the context menu on group level. Click this entry to select all operations

included in the pool of groups.

Select planned operations of the group

This entry is available if you call the context menu on group level. Click this entry to select all operations

planned on the workplaces of the group.

Select planned operations

The  entry  is  available  if  you  request  the  context  menu  on  workplace  level.  Click  this  entry  to  select  all

operations planned for this workplace. Also fixed operations are selected.

With the above-mentioned  functions and the functions  Select all operations of the order and  Select this

OP and all following OPs of the order that are included in the operation's context menu, you can select

multiple operations by  holding down the CTRL key,  i.e. the selected amount of  operations remains and

the newly selected operations are added.

If  you  want  to  select  all  operations  planned  for  workplaces  in  the  current  planning  scenario,

select the function Select planned operations from the operation's context menu.

The functions Select all operations of the order and Select this OP and all following OPs of the

order that are included in an operation's context menu only affect planned operations.

1.1.5 Displaying operations in the Gantt

Order backlog / pool of groups / pool of orders

Operations transferred from the ERP system are generally planned for groups and are therefore located

in the pool of groups. You can show the pool of groups in tabular form and/or as Gantt chart.

If the machine/capacity group is changed for a workplace, you must also change the group for

the planned operations in the order backlog. Otherwise, the planning board no longer shows the

operations.

HLS-GPT_81.docx

Version: 1.0.23435

Page 23 of 56

Graphic Planning Board (MOC)

Pool of groups in Gantt

In order to graphically display operations in the pool of groups of the Gantt, you must activate the option

Show operations in pool of groups of the Gantt in the settings in tab  General. In this case, operations are

displayed according to their scheduled start time.

For the pool of groups, the system shows the times without shift of the shift model that is defined for the

group.

Planned operations

Planned operations are displayed for the individual capacity (workplace/machine), i.e. in the relevant row

(only if the view is expanded).

If you log on an operation to several workplaces/machines, the graphic planning board will show

this operation as logged on to the workplace/machine where the operation has last been logged

on  to.  If  you  want  to  show  the  operation  in  the  graphic  planning  board  with  several

workplaces/machines, you must split the operation.

If  you  log off an operation  from a workplace, the  display of the  workplace  does  not change in

the  graphic  planning  board.  The  same  applies  if  the  operation  is  no  longer  logged  on  to

workplace scheduled last.

Duration/length of an operation bar

The  length  of  an  operation  is  the  sum  total  of  the  setup  time,  processing  time/Remaining  run  time  and

retooling time (teardown time). This time is called execution time. You can define the process times either

directly or the system can calculate these times using a formula.

The  planning  board  generally  includes  the  setup  time.  The  setup  time  is  also  included  if  the

processing of the operation has already started or if the status "interrupted" is available at the

moment.

But  you  can  customize  the  system  and  configure  if  you  want  to  integrate  the  setup  time  for

interrupted  operations  in  the  planning  board.  To  configure  the  order  type,  the  following  other

options are available :





Integrate remaining setup time: target setup time minus "Times posted to RPA 7"

Ignore setup time if processing of operation has already started (even if OP is interrupted)

Running operations do generally not include the setup time.

HLS-GPT_81.docx

Version: 1.0.23435

Page 24 of 56

Graphic Planning Board (MOC)

If  the  current  remaining  run  time  is  0  or  negative  for  an  operation  (e.g.  in  case  of

overproduction), the remaining run time is set to 0 for a running operation. In case of a prepared

or interrupted operation, the remaining run time is set to 900 seconds = 15 minutes by default.

This way, this operation can still be re-planned manually using the drag & drop function in the

Gantt. You can change this duration planning board settings in tab Bar layout.

Color coding of operations

You can define the color of operation bars in the settings in tab Bar layout.

Exceeding basic dates

If an operation  is planned  outside the predefined  basic dates and the planned  end date is  later than  its

"latest  end  date"  (LET),  the  presentation  changes.  The  operation  bar  is  then  hatched  or  displayed  in  a

different color. This requires that the option "Operation delayed" is enabled in the settings, tab Bar layout.

Double clicking an operation bar

Double clicking an operation not logged on in the Gantt will open the dialog to modify default values/target

data. To edit the data, you require the authorization grapt.edop.edit. You can change the following data in

the dialog:

  Target quantity (primary quantity unit)

  Partitioning

  Setup time

  Target cycle

  Teardown/retooling time

  Wait time

Confirm the dialog to store the changed data directly in the operation and to update the planning board.

HLS-GPT_81.docx

Version: 1.0.23435

Page 25 of 56

Graphic Planning Board (MOC)

1.1.6  Operation functions

If you right click a selected operation, a pop-up menu opens offering the following functions:

Fix operation

If you select this option, you can fix one or several operations. The settings (see tab  Bar layout) specify

how fixed operations are visualized.

Unfix operation

If you select this option, you can unfix one or several operations.

Deallocate

Use  this  function  to  deallocate  selected  operations.  The  operations  are  then  available  in  the  pool  of

groups. For more information, see here.

This menu entry is not available for fixed operations.

Order overview

The Order overview is opened for the selected operation. The order number of the selected operation is

transferred as selection.

 Order information

The    Order  information  with  relevant  default  data  and  current  information  about  the  order  is  opened  for

the selected operation.

Order network

This menu item opens the application Order network for the selected operation. The order network shows

the operations that are related to the selected operation in a graphic (Gantt chart).

This function requires the respective authorization (license).

Split OP

Subject  to  the  setting  of  the  option  Enhanced  split  function  in  the  Basic  settings,  you  can  find  the

requirements and more information about operation splitting in one of the below-mentioned documents:

  Enhanced split function is not enabled: Operation Split

  Enhanced split function is enabled: Enhanced split function

This function requires the respective authorization (license).

Cancel OP split

Use the function Cancel split to undo the splitting of an operation.

Subject  to  the  setting  of  the  option  Enhanced  split  function  in  the  Basic  settings,  you  can  find  the

requirements and more information about operation splitting in one of the below-mentioned documents:

HLS-GPT_81.docx

Version: 1.0.23435

Page 26 of 56

Graphic Planning Board (MOC)

  Enhanced split function is not enabled: Operation Split

  Enhanced split function is enabled: Enhanced split function

Generate campaign

You can combine OPS to a campaign.  You can find further information on campaign production at  This

document.

Cancel campaign

You  can  also  cancel  campaigns.    You  can  find  further  information  on  campaign  production  at    This

document.

Join operations

You can join operations.  Further information you can find on joint production at This document.

Cancel joined operations

You can also cancel operations  you have joined. Further information  you can find on joint production at

This document.

Create note

You can create one or more notes for a selected operation. In order to display notes, you must enable the

corresponding view Notes.

Production variants

You  can  select  an  alternative  Production  variant  (method)  here  if,  for  example,  the  tool  is  not  available

that is needed for the planned variant. From this overview,  you can switch to the editing mode and edit

the production variants if required.

This function requires the respective authorization (license).

Select all operations of the order

This  function  selects  all  operations  included  in  the  Gantt  chart  and  belonging  to  the  same  order  as  the

current operation.

In  connection  with  the  function  Deallocate,  you  can  remove  an  entire  order  from  planning.  Please  note

that you first have to unfix fixed operations.

Select this OP and all following OPs of the order

Use this function to select this operation and all operations included in the Gantt chart that belong to the

same order and have a higher operation number than the current operation.

Select the planned operations

This function selects all operations planned in the Gantt chart.

In connection with the function Deallocate, you can remove all operations from planning. Please note that

you first have to unfix fixed operations.

HLS-GPT_81.docx

Version: 1.0.23435

Page 27 of 56

Graphic Planning Board (MOC)

1.1.7 Presentation of relationships / network view

The Gantt chart shows the relationships between operations. You can choose from the following options:

  Click one operation to show the operation's relationships.

  Click  the  button

  in  the  toolbar  to  visualize  all  relationships  and  dependencies  of  all

operations. A complex presentation then shows all order relationships at the displayed workplaces.

Please note: Only the relationships relevant for planning are displayed.

1.1.8 Print preview/Print

The  functions  and  options  described  in  this  chapter  are  part  of  the  used  Gantt  visualization

component. As this is a standard third-party product, changes to the layout and the functionality

are only possible to a limited extent.

You  can  print  the  planning  board  using  the  print  preview  screen,  which  can  be  opened  by  clicking  the

button

 in the tab Different screens of the toolbar.

You  can  view  each  single  page  or  see  an  overview  of  all  pages  of  your  presentation.  You  can  also

interactively zoom in on a section of your chart and then print it.

The  status  line  provides  information  about  the  total  number  of  pages  and  the  horizontal  and  vertical

distribution of pages. In the view Show single page, the current page number is additionally shown.

Functions of the print preview

Close

You exit the print preview and return to the application.

Note: The settings made in the print preview are currently not saved.

<

Only active if the button Show single page has been clicked. If the chart takes up several pages, you can

view each single page. Click this button to return to the previous page. You move through the pages from

right to left in ascending rows.

HLS-GPT_81.docx

Version: 1.0.23435

Page 28 of 56

Graphic Planning Board (MOC)

>

Only active if the button Show single page has been clicked. If the chart takes up several pages, you can

view each single page. Click this button to go on to the next page. You move through the pages from left

to right in descending rows.

Overview

If the chart takes up several pages, you can either view each single page separately or in the overview. In

the Overview, all pages are displayed - depending on the number of pages, the view is zoomed out more

or less; in the Single page presentation mode, initially the first page of the chart is shown and zoomed in.

Click

 or

 to scroll through the pages. Double-click a page to easily switch between

the two presentation types Single page and Overview.

In the presentation mode Single page, you can interactively enlarge specific sections of your chart. To do

so, hold down the left mouse button and make a square frame around the section you want to zoom in.

As soon as you release the left mouse button, the framed-in image section is enlarged. The label text of

the button Print changes to Print area. You can now print the image section in the currently enlarged size.

Note: The zoom factor selected in the print preview does not change the scaling factor in the dialog field

Page setup.

Fit to single page

Use  this  button  to  reduce  a  chart  of  several  pages  to  one  page.  Here,  you  also  have  the  possibility  to

interactively enlarge sections of the chart as described in Single page/ overview and to print them.

Zoom factor

You can use a zoom factor from the list to change the presentation size of your chart in the print preview.

You can only select the zoom factor if single pages are shown. The print is not affected. Depending on

the selected size, vertical and/or horizontal scroll bars are displayed. You can also use the mouse wheel

to move the image (without shift key vertically, with shift key horizontally).

Auto is preset as zoom factor. With this setting, the size of the page is always reduced or enlarged so that

it fills the screen.

Page setup

If  you  click  this  button,  you  are  forwarded  to  the  dialog  Page  setup,  where  you  can  change  the  page

layout. The options of this dialog are described below.

Print/print area

If you click this button, you are directed to the Windows dialog  Print. If you have zoomed in a section in

the  print  preview,  the  label  text  of  the  button  changes  to  Print  area.  If  you  click  this  button,  the  option

Location is preselected in the Windows dialog Print. Click OK to print the section shown on the screen.

HLS-GPT_81.docx

Version: 1.0.23435

Page 29 of 56

Note: The zoom factor selected in the print preview does not change the scaling factor in the dialog field

Graphic Planning Board (MOC)

Page setup.

Functions of the dialog Page setup

Mode

Select  the  scaling  type  from  the  drop  down  list  and  the  relevant  values  for  Zoom  factor  or  Maximum

width/height to define the scale of the presentation's output. If you click Apply , the values resulting from

your settings are displayed in the section Current.

Zoom factor

If  the  scaling  factor  is  100%,  the  original  size  is  shown.  A  smaller  value  will  reduce  the  presentation,  a

larger value will increase it.

Fit to page count (Adjust to the number of pages)

Select this option to define the maximum number of pages for the width and the height. The chart output

is then divided accordingly (maximum width, maximum height). The charts are presented as large as

possible, but they are not distorted.

Zoom with horizontal fit

Select  a  zoom  factor  and  a  fixed  number  of  printed  pages  (width)  that  should  be  maintained  by

compressing or stretching the time scale during printing.

Repeat title/ table/ time scale/ legend

Check this option to include title, table, time scale and legend on each page of the printed chart.

Show table

Define whether or not to print the table. If this option is not selected, the table is not printed.

Table columns

Here,  you  define  which  table  columns  are  printed.  Enter  the  required  columns  separately  or  in  ranges

separated by a comma or semicolon. Example: "1;5-7;3" selects the columns 1, 3 and 5 to 7.

Show diagram

Here, you enable or disable the printing of the chart (time scale and bars).

Adjust time scale to width of pages

This option optimizes the space used on the printed pages:



If a fixed number of pages is defined for scaling: The zoom factor is calculated so that the full height

of the set number of pages is printed. At the same time, the time scale is compressed or stretched so

that the full width of the defined number of pages is made use of.

HLS-GPT_81.docx

Version: 1.0.23435

Page 30 of 56

Graphic Planning Board (MOC)



If a zoom factor is defined for scaling: The time scale is compressed or stretched so that the full width

of the defined number of pages is made use of.

Pad pages with space

Use this option to define whether you want to leave space between the chart and the boxes for title and

legend. If you enable this option, the boxes are always positioned on the page margin and printed in full

width  on  each  page.  If  this  option  is  disabled,  the  boxes  are  printed  without  space  next  to  the  chart.

Depending on the chart, the width of the boxes may vary on the different printed pages.

Show frame outside

Activate this checkbox so that a frame is printed around the chart. If the  option  Repeat title/ table/ time

scale is enabled, a frame will be printed on each page; otherwise a frame will be drawn around the entire

chart.

Alignment

Define the alignment of the charts on the page. The printer settings define the page orientation (portrait or

landscape).

Show crop marks

If you enable this option, crop marks are set on the chart. This way it is easier to glue the printed single

pages to create a full chart.

Show folding marks (DIN 824)

For  construction  diagrams,  the  German  national  standard  DIN  824  defines  a  very  specific  folding

procedure  that  allows  you  to  fold  up  the  drawing  to  a  DIN  A4  format  size.  If  this  option  is  enabled,  the

folding marks on your diagram facilitate the folding procedure. The following formats are available:

  Form A: With a binding margin on the  left side so that holes can be punched in the folded drawing

and can be placed in a binder without needing binding strips.

  Form  B:  All  in  all,  the  format  is  somewhat  narrower  so  that  a  binding  strip  can  be  attached,  and

combined with the drawing, achieves a DIN A4 format width.

  Form  C:  No  holes  are  punched  onto  the  folded  drawing,  but  instead  the  drawing  is  placed  in  a

transparent cover.

The folding marks can be added for any target format, whereas DIN 824 only includes the formats DIN A0

to A3.

Page numbering

If you check this option, the page number is printed on the bottom left of every page. You can select from

the following options:

HLS-GPT_81.docx

Version: 1.0.23435

Page 31 of 56

Graphic Planning Board (MOC)

  Row.column: This option makes sense if the chart extends beyond the page length or even its width.

The position of the page in vertical order is printed before the dot, the position in horizontal order is

printed after the dot.

  Column.row: This option makes sense if the chart extends beyond the page length or even its width.

The position of the page in horizontal order is printed before the dot, the position in vertical order is

printed after the dot.

  Page/ total number: The first number shown is the current page number followed by the total number

of pages: 1/6, 2/6 etc.

Text

Enable this option, if you want to add a random text at the bottom left of every page. In some cases, this

text is printed to the right of the page number.

For  page  numbering,  you  can  enter  the  following  placeholders  in  the  line  Additional  text.  These

placeholders are then replaced with the relevant content when the document is printed.

{PAGE} = Consecutive page number

{NUMPAGES} = Total number of pages

{ROW} = Row position of the detail section in the total chart

{COLUMN} = Column position of the detail section in the total chart

Print date

If you check this option, the print date is printed on the bottom left of every page. In some cases, the print

date is printed to the right of the page number and the additional text.

Sheet margins

With the fields Top, Bottom, Left and Right you can define in cm the space between the paper's margin

and the chart. You cannot go below the minimum margins that printers preset for technical reasons.

HLS-GPT_81.docx

Version: 1.0.23435

Page 32 of 56

Graphic Planning Board (MOC)

1.2  Settings

If you click

, you call a dialog where you can make user-specific settings. The settings are saved

user-specifically. The next time you call the graphic planning, the settings are available.

Some  changes  are  only  activated,  when  you  request  data  the  next  time.  For  this  reason,  we

recommend refreshing the data within the planning board, once changes have been made.

1.2.1 Tab Main page

General settings

Update statuses

Use  this  setting  to  define  if  and  at  which  interval  the  workplace/machine  status  is  read.  The  updated

status is displayed on the left hand side of the planning board (column without caption).

Update data

This setting defines if and at what interval the planning board is updated (i.e. data is read and displayed).

If changes have been made in the meantime, a prompt pops up asking whether the changed data should

be saved or not.

HLS-GPT_81.docx

Version: 1.0.23435

Page 33 of 56

Graphic Planning Board (MOC)

Update planning scenario automatically while requesting data

If  this  option  is  set,  then  corrections  are  made  to  the  planning  scenario  when  the  planning  board  is

updated: any delayed operations (operations that were planned in the past and which have not yet been

processed  or  started)  are  planned  in  the  order  in  which  they  were  originally  planned.  The  relative  gap

between an OP plan start and the current line remains. If this results in a conflict (resource conflict, order

network conflict) with operations planned in the future, they will be postponed further (future).

Note: This function only takes the assignment of the  workplace into  account.  Fixed operations  are also

moved.

This function can only  be  used if none  of the  workplaces/machines shown  in the planning

table contains more than 350 operations.

Update order overview automatically when selecting an operation

  The function is available as of Service Pack 16.

If you click on one of the following elements, the order number of the operation is copied into the   Order

overview and the display in the order overview is updated:

  Operation bar in the planning board (Gantt)

  Operation in the tabular pool of workplaces

  Operation in the tabular pool of groups

Following, you see the order progress for the whole order in the order overview.

Requirement:  The  option  "Update  order  overview  automatically  when  selecting  an  operation"  is  set  and

the order overview is opened in parallel.

Each  click  updates  the  order  overview  and  switches  it  to  the  front.  Therefore  the  order

overview should be placed on a second screen.

If you click on different operations too quickly in succession, the update may be delayed

and a popup will be displayed, indicating that data queries are still running and asking you

to wait for the result.

Presentation

Period of the past

This setting specifies the range/period that is displayed left to the blue indicating "now".

HLS-GPT_81.docx

Version: 1.0.23435

Page 34 of 56

Graphic Planning Board (MOC)

Time scale

Define the time scale that  you  want to show on top of the chart in the planning  board.  Possible  values:

Minutes, hours, days, weeks, months.

Display planning time fence

If this option is enabled, a vertical blue line visualizes the planning time fence.

The planning time fence is specified in the planning variant. If it is 0, no planning time fence is used. If no

planning variant is available, the planning time fence of the basic settings is used. If it is 0,  no planning

time  fence  is  used.  If  the  planning  horizon  starts  in  the  future  ("From"  >  today),  then  no  planning  time

fence is used.

Show operations in pool of groups of the Gantt

If this option is enabled, the operations included in the pool of groups are shown in the pool of groups of

the planning board (Gantt). The operations are shown there at their scheduled date.

If you want to display the operations only in the Gantt pool of groups, you must hide the tabular pool of

groups.

Please note: One of the two presentations of the pool of groups should be visible at all times.

Alternative presentation of relationships

By default, the lines between the operations are shown in the following manner:

With the option "Alternative presentation of relationships" the lines between operations are shown in the

following manner:

Note: If you select this presentation, the size of each row may change dynamically.

HLS-GPT_81.docx

Version: 1.0.23435

Page 35 of 56

Graphic Planning Board (MOC)

Save options

Fix operations within planning time fence when saving

Operations, which are scheduled in the graphic planning board and have a planned start date within the

planning  time  fence,  are  automatically  fixed  when  the  planning  board  is  saved.  This  way,  these

operations cannot be re-planned.

Save automatically updated planned dates

When  you  exit  the  planning  board  or  when  new  data  is  loaded,  a  prompt  asks  if  you  want  to  save  the

changes.  This  request  is  different  in  case  of  changes  that  are  the  result  of  explicit  planning  changes

(manual  planning,  start  of  the  automatic  assignment,...)  or  in  case  of  changes  that  are  due  to  the

automatic update (moving delayed operations (planned and running) to the "Now line").

  The option "For planned operations" is set:

The prompt that asks if you want to save the planning also appears if operations are implicitly re-

planned.

  The option "For running operations" is set:

Running OPs are saved if the planned end date has been recalculated.

1.2.2 Tab Planning component

You can enable or disable the following validation checks for interactive user action:

Checks with interactive planning

Further information on interactive planning can be found in the document entitled  Detailed

planning and assignment functions.

The  relevant  checks  are  processed  in  sequence.  If  a  user  action  (planning/re-planning)  is  not  allowed

following one of the (enabled) consistency checks described below, then the action is canceled, and the

remaining checks are not performed. The conflict is displayed in a pop-up window, where the planner can

decide which steps can be taken to resolve the conflict:

Check basic dates of operation

The system checks if the start of the operation is within the operation's time frame when you schedule the

operation for a workplace or when you move the operation within the time frame [earliest start, latest end].

The operation must be entirely between the earliest start and the latest end.

HLS-GPT_81.docx

Version: 1.0.23435

Page 36 of 56

Graphic Planning Board (MOC)

Note: The dates earliest start time (EST), latest start time (LST), earliest end time (EET) and latest end

time (LET) must either be downloaded from the ERP system or can be calculated in the MES using the

lead time scheduling.

Check for relationships

The  system  checks  if  the  operation  maintains  its  relationships  to  the  preceding  and  subsequent

operations that are defined in the order network when you plan the operation on a workplace or when you

move the operation to a start time X.

The application can only check preceding and subsequent operations if they are included in

the current planning profile.

Check for capacity availability

When  you  move  an  operation  and  schedule  it  at  a  specified  point  in  time,  the  system  checks  if  the

resources that are required to produce the operation are overloaded.

Here, "resources" refers to the workplace as a primary resource (workplace on which the OP is planned

or  re-planned)  and  the  resources  assigned  to  the  operation  (production  resources  and  tools).  However,

the production resources and tools can only be taken into account if they are defined in the system and if

their resource type is specified as "relevant for planning".

If a validation check is deactivated, resulting conflicts are not displayed, i.e. a possible conflict is implicitly

confirmed.

Warning if operation is re-planned onto another group

If  operations  are  planned  onto  another  group  than  the  one  intended  in  the  graphic  planning  board,  a

confirmation prompt is issued as warning.

Check material availability

This option is only available if you enable the extension grapvemvp.

The  system  checks  all  materials  required  by  the  operation  and  having  a  valid  ATP  inspection  group

assignment.  A  conflict  message  is  shown  if  required  material  is  not  available.  You  can  find  further

information on the material availability check here.

Material  availability  is  only  checked  if  the  detail  view  planned  inventory  levels  is  shown.  In

manual  planning,  the  system  informs  you  of  potential  material  conflicts  during  the  planning

activity. You can view the material conflicts that exist in planning in the conflict list.

Check personnel availability

You can enable the check for personnel availability in relation to workplaces in the  Workplace

and resource configuration, tab "workplace configuration" in the "HLS" section. The system only

carries  out  the  check  if  the  option  "show  personnel  assignment"  is  also  enabled  in  the

HLS-GPT_81.docx

Version: 1.0.23435

Page 37 of 56

Graphic Planning Board (MOC)

"workplace" tab.

Processing with automatic allocation

Fix operations in planning time fence after automatic assignment

If  the  option  Fix  operations  in  planning  time  fence  after  automatic  assignment  is  set,  the  system

automatically  fixes  the  operations  if  their  planned  start  time  is  within  the  planning  time  fence  after  the

automatic assignment.

1.2.3 Tab Bar layout

Bar colors

Color gradient

If this option is set, operation bars are displayed with a color gradient in the planning board .

3D effect

(reserved)

You can choose from the following options to display the processing time in color:

status

The  color  defined  for  the  respective  operation  status  is  used.  You  define  the  color  in  the  status

assignment. This way, currently logged on OPs can be identified via the respective color.

Predecessor status

The  color  is  used  that  has  been  defined  for  the  status  of  the  predecessor  operation  in  the  status

assignment.

Order

Operations  with  the  same  order  number  are  shown  in  the  same  color.  The  color  is  selected  randomly

using internal 8-color iteration.

Order type

Operations with the same order type are shown in the same color. The color is selected randomly using

internal 8-color iteration.

Article

Operations processing the same article are displayed in the same color. The color is selected randomly

using internal 8-color iteration.

Tool

Operations  using  the  same  tool  are  displayed  in  the  same  color.  The  color  is  selected  randomly  using

internal 8-color iteration.

HLS-GPT_81.docx

Version: 1.0.23435

Page 38 of 56

Graphic Planning Board (MOC)

Processing time

The bar of the processing time is displayed in the color that has been configured.

Color from OP user field

If a color has been defined for an operation in the configured user field (possible user fields: 7  - 22), the

operation is displayed in the respective color. In this case, coloring depends on the number entered in the

user field.

Number

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

Color

Green

Bright red

Pink

Purple

Black

Gray

Turquoise

Light blue

Blue

Brown

Light green

Yellow

White

Olive

Silver

Light yellow

Color of running OPs

Running operations can be displayed in a user-defined color.

Display setup times

Activate this option to display setup times as an integral part of the operation bar. If you have enabled the

option,  you  can  display  setup  time,  dynamic  setup  time  or  retooling  time  (teardown  time)  in  one  of  the

available colors.

Dynamic setup time

Select  the  color  in  which  additional  setup  times  should  be  shown.  Dynamic  setup  times  require  a

respective configuration in the setup time matrix (depending on license).

Setup time

Then, select the color for the display of the setup time that is stored in the operation (fixed).

Planned teardown time

Select the color for the display of the teardown time that is stored in the operation.

HLS-GPT_81.docx

Version: 1.0.23435

Page 39 of 56

Graphic Planning Board (MOC)

Other visualization

Operation fixed

If  this  option  is  set,  fixed  operations  are  either  shown  with  a  symbol  (blue  arrow  with  the  tip  showing

downward) in the center of the processing bar or with a vertical red bar at the beginning of the processing

time.

Note: You can also use the toolbar to enable/disable the symbol used to display fixed operations.

Operation delayed

If  this  option  is  set,  delayed  operations  are  shown  with  a  hatched  pattern  or  in  color.  An  operation  is

considered delayed if its planned end extends beyond the latest end date (LET/SEZ).

Resource occupied/locked

If  the  Tools  and  Resources  Management  (WRM)  is  active,  the  system  additionally  loads  the  resource

allocation  when orders are loaded into the planning board. It is also checked for double allocations and

locked resources. If the resource is already  occupied by another operation, or if the resource is locked,

the bar is shown in a different color.

If you manually move operations, the system checks whether the resource is already occupied by another

operation or whether it is locked during this period of time. A note is issued to show any possible conflicts.

This  requires  that  the  option  Check  for  capacity  availability  has  been  activated  in  the  tab  planning

component.

Specific  licenses  are  required  in  order  to  check  assignments  and  visualize  occupied/locked

resources.

Show material conflicts

If this option is enabled, the operation bar is displayed in the defined color in case of a material conflict.

Merged OPs

If  you  enable  this  option  and  you  merge  operations  (OPs),  the  system  displays  a  narrow  bar  in  the

configured color at the bottom of the bars of the respective merged operations in the Gantt chart.

Material available

If  the  option  Show  material  conflict  is  enabled,  the  operation  bar  is  displayed  in  the  defined  color  if  the

required material is available.

To  color  the  bars  with  reference  to  the  material  availability,  the  detail  view  Planned  inventory

levels must be open. The system performs the checks and colors the bars with reference to the

material availability of the selected material.

Color of line marker

HLS-GPT_81.docx

Version: 1.0.23435

Page 40 of 56

If you change the sequence of the operations in the workplace pool table, a line appears during the drag

& drop action at the point where the operations are entered. You can configure the color of the line with

Graphic Planning Board (MOC)

the setting "Color of line marker".

HYDRA: as of service pack 13

FEDRA: as of version 1.1

You can display and color the line marker.

Highlight selected OP bars

Set the option "Highlight bar selection" and a frame is added to the highlighted OP bars. You can select

the color and the thickness of the frame.

HYDRA: as of service pack 13

FEDRA: as of version 1.1

You can highlight selected OP bars.

Note available

If  this  option  is  set,  the  operation  bar  shows  the  symbol

  indicating  that  a  note  is  available  for  the

operation.

Show maintenance

This option is only available if you enable the extension graptmaint.

If  this  option  is  set,  the  system  graphically  notifies  the  user  that  a  maintenance  interval  will  end  during

processing of the planned operation. Further information on processing can be found in the section Show

maintenance.

Minimum bar length

If the remaining run time of an operation is less than or equal to 0, the processing time of this operation is

shown with the duration entered in the field Minimum bar length. Consequently, you can still edit (select,

move) the operation.

1.2.4 Tab Tooltip/bar text

In this tab,  you can define  the information that  is displayed in the operation's tooltip or in its processing

bar.

HLS-GPT_81.docx

Version: 1.0.23435

Page 41 of 56

Graphic Planning Board (MOC)

Tooltip

Click  the  section  Click  here  to  add  new  tooltip  to  select  an  additional  text  to  be  shown  in  the  tooltip.  A

selection window opens. Click on the text you want to display in the tooltip. The selection window closes.

The text is included in the list.

You can change the order in the tooltip. Click an entry in the list and move it without releasing the button.

Release the left mouse button to drop it (drag and drop). The selected entry is moved behind the position

where you release the left mouse button.

To delete an entry, select the entry you want to delete and click

.

Available tooltip information

The information in the tooltip is read from the database when data is requested.

Some data might change dynamically during planning. Alternative production methods or the setup matrix

can be named as examples. In the below table, this data is identified by an "X" in the column "dynamic

modification".

Description

Order

Sequence

Operation

Split

MES order number (order/OP)

Operation status

Secondary status

OP name

Article

Article designation

Fixed (yes, no)

Note available (the internal indicator is shown):
X  -  at  least  one  note  is  available  but  no  note  is  identified  with  the  option  "display  on
terminal".
T - at least one note is available and at least one note is identified with the option "display
on terminal".

Tool

Farbe

Material

Target cycle

Actual cycle

Dynamic
modificatio
n

X

X

X

Target quantity (P) in the primary quantity unit

HLS-GPT_81.docx

Version: 1.0.23435

Page 42 of 56

Graphic Planning Board (MOC)

Dynamic
modificatio
n

(P)

X

time

time

X

X

X

X

X

X

X

Description

Yield (P) in the primary quantity unit

Remaining
(target quantity - yield in the primary quantity unit)

quantity

Unit (primary quantity unit)

Partitioning

Setup time

Dynamic
(accounting for the setup change matrix)

Current
(Setup time + dynamic setup time)

Target duration (see note below!)

setup

setup

Earliest start

Latest start

Earliest end

Latest end

Scheduled start time

Scheduled end time

Planned start date

Planned end date

Basic start date

Basic end date

Priority

Order index

First logon

Last logon

User fields

Notes on specific fields:

Target duration: This field does not display the net processing time according to the remaining run time

formula. Instead  it shows the bar  length shown in the graphic  planning board  and does not  account for

shift breaks or any other breaks. The processing time depends on the status of the operation:

  For operations that are not logged on (status <> "running"), the bar length equals the sum total of the
setup time + processing time according to the remaining run time formula + teardown time + dynamic
setup time (if available);

  For operations that are logged on, the bar length equals the sum total of the processing time

according to the remaining run time formula + retooling time.

HLS-GPT_81.docx

Version: 1.0.23435

Page 43 of 56

Graphic Planning Board (MOC)

The  calculation  is  based  on  current  values  (e.g.  remaining  quantity  to  be  produced).  If  a  field  that  is

included  in  the  calculation  of  the  remaining  run  time  is  changed  in  the  database  (e.g.  because  of  an

update  in  the  PPS  system),  the  changed  value  is  only  available  once  the  planning  board  has  been

reloaded.

Tool: If you plan an operation by selecting a production variant for a workplace, the tool in the tooltip is no

longer  up-to-date.  When  you  save  the  current  planning,  the  correct  tool  (from  the  previously  selected

production variant) will be displayed in the tooltip.

User fields: You can select different user fields that either refer to operations or orders. The configuration

of the user field keys AGNR/SYSTEM or AUNR/SYSTEM specifies the range of selectable user fields.

You must not assign a name to a user field that already exists in the standard (field, tooltip or

bar text).

If you display the month in a user field, you must write the placeholders for the month in upper

case letters in the type definition: xx.MM.xxxx.

Bar legend

Click  the  section  Click  here  to  add  new  text  to  select  an  additional  text  to  be  shown  in  the  OP  bar.  A

selection window opens. Click on the text you want to display in the OP bar. The selection window closes.

The text is included in the list.

To delete an entry, select the entry you want to delete and click

.

Available information

Description

Order

Sequence

Operation

Split

MES order number (order/OP)

Operation status

OP name

Article

Article designation

Tool

Target cycle

Priority

Order index

HLS-GPT_81.docx

Version: 1.0.23435

Page 44 of 56

Graphic Planning Board (MOC)

You need to refresh data in the planning board to make sure the configurations are enabled.

1.2.5 Workplace tab

Visible columns

The  left  hand  side  of  the  planning  board  shows  the  capacity  groups  including  the  assigned  individual

capacities (workplaces/machines) that match the planner's responsibility area or user profile.

You can display the following columns in this list of workplaces:

Column

status

Meaning

Status color or RPA color
(depending on the option settings for "Use status text colors")

Workplace

Workplace/machine number

Short name

Short name of the workplace.

Designation

Full name of the workplace

Group

Symbol

Group of the workplace.

Graphic
See also the description for the button "Download workplace icons from server".

Performance level  Current performance level of the workplace.

Change the column widths directly in the table (click and drag across). This modification is saved user-

specifically.

We recommend to display at least the workplace/machine number.

Use status text colors

If  this  option  is  enabled,  the  workplaces  are  colored  according  to  the  currently  active  status.  The

individual  status  color  is  defined  in  the  assigned  status  text.  If  no  color  is  defined  for  a  status  text,  the

workplace is shown without a color (white/transparent).

If this option is not set, the machines are colored according to the configured RPA.

Show expected malfunction period

When  the  workplace/machine  status  is  updated,  the  expected  duration  of  a  malfunction  entered  in  the

Windows terminal can also be transferred.

If  this  option  is  set  and  if  a  status  is  available  for  which  the  duration  > 0,  then  the  expected  duration  is

made visible in the planning board. The expected end is calculated:

Expected end = maschinen_status.prog_begin_dat/zeit + maschinen_status.prog_dauer

(compared to the Gregorian calendar)

HLS-GPT_81.docx

Version: 1.0.23435

Page 45 of 56

Graphic Planning Board (MOC)

If the expected end is in the future, then the period of time between "now" and the expected end is shown

as a red bar. The bar does also cover periods without shift (times without shift are not considered). At the

same  time,  a  respective  symbol  is  displayed  in  the  column  Symbol  of  the  workplace  list.  This  symbol

overrides the symbol that is normally displayed.

Tooltip

The red bar includes a tooltip showing the below-mentioned information:

  Workplace: workplace number according to configuration

  Short name: short name of the workplace according to configuration

  Designation: name of the workplace according to configuration

  Current status: status number and status text of the status currently available for the workplace.

  Status since: date, time

  Expected malfunction period: duration in hrs:min:sec.

  Expected end: date, time

Conversion of the malfunction period into times without shift

The red bar includes a context menu. This menu includes the menu item "Convert to time without shift".

Once you have clicked this menu item, the dialog Individual shift times opens. The period of time starting

from "now" until the expected end is pre-assigned.

Remove

malfunction

period

If the malfunction duration returns to 0 the next time the status is identified, the bar and the symbol are

removed and the initial symbol is shown again. If this period has been defined as time without shift, this

period remains and the planner must remove it explicitly.

Show staff assignment

This option is only available if the modification  grapt.spe is enabled  and the user is assigned

the function authorization grapt.spe.

The personnel planned for a workplace in the Workplace assignment application is shown, if this option is

enabled. You can find further information about how to display planned staff in the graphic planning here.

Change the color of the workplace if an OP with production variant is selected

Set  this  option  to  show  the  workplaces  in  a  specified  color  where  an  operation  can  be  processed

according to defined production variants. Select the color for the workplaces where an operation can be

processed according to defined production variants.

If you select an operation with a defined production variant, all machines are displayed in color that can

be  used  to  produce  the  operation's  article/item  on  the  left  hand  side  of  the  workplace/machine  display

area. Clicking an empty space in the planning board will remove this color marking.

HLS-GPT_81.docx

Version: 1.0.23435

Page 46 of 56

Graphic Planning Board (MOC)

Selection of production variants of manual planning

In the section Selection of production variants of manual planning, select the option Automatic selection, if

only one production variant exists when you manually plan an operation on a workplace and you want to

select  the  production  variant  automatically  if  only  one  production  variant  is  stored  for  the  article  in  the

workplace.

Generate a production variant for machines from a production variant for groups

You can define production variants for  groups if you do not specify a workplace/machine when creating

the production variant. If you manually plan an operation in the planning board, you can plan this OP on

every workplace of the group.

If the option Generate a production variant for machines from a production variant for groups is set and

the  planner  has  selected  a  group  production  variant  during  manual  planning,  the  system  prompts  the

planner to confirm that he/she would like to use this production variant to generate a production  variant

for machines. After confirming the prompt, the system generates a production variant for machines.

Download workplace icons from server

By default, the following symbols are displayed:

  Single workplace according to configuration:

  Group workplace according to configuration:

Using this button, the planner can download workplace-specific symbols from the server and store them

locally so that they are displayed in the list of workplaces.

For  this,  the  system  selects  and  transfers  all  files  following  the  scheme  *_small.png  in  the  directory

defined via the logical Path MOCWPIMG.

When the list of workplaces is loaded, the system checks for every workplace if a file exists in the local

directory. If a file exists, the system displays this file (this image). If there is no file, the system checks if

the local directory includes a file for the group the workplace is assigned to. If there is a file for the group,

this file is displayed.

The search process uses the file name configured for the workplace in the  Resource configuration. File

sizes should be as small as possible for the display in the list of workplaces. For this reason the file must

comply with the naming conventions described below:

Example: File name configured for the workplace: 12330.jpg

HLS-GPT_81.docx

Version: 1.0.23435

Page 47 of 56

Graphic Planning Board (MOC)

Extract the front part of the file name  12330

Add "_small" 12330_small

Add the file extension ".png" 12330_small.png

Search for file 12330.png

If found, the image 12330_small.png is displayed in the list of workplaces.

Otherwise:

Display the default image depending on the workplace type as configured:

- E = Individual workplace:

- G = Group workplace:

1.2.6 Tab Priorities

Display priorities

You can use the priority of an operation as control tool. The priority is a single digit, numeric value. The

value increases in ascending order ("0" = lowest priority, "9" = highest priority).

If  this  option  is  enabled,  the  operation's  priority  is  shown  on  the  left  as  a  colored  triangle:

You can define the color for the individual priorities as you like.

Also in the toolbar, you can activate/deactivate the symbol used to display the priority.

Show delays

Using this option, you can identify operations that are expected to be delayed. A narrow bar is displayed

on top of the operation bar, if the planned end of a planned operation is x hours earlier than the latest end

of the operation (LET). Coloring depends on the configured hours.

1.2.7 Tab "Operation links"

Function authorization: op.cmbbuild

Here  you  can  undertake  configurations  that  have  an  effect  on  the  way  the  function  works  and  on  the

visualization of joint productions.  You can find further information at This document.

HLS-GPT_81.docx

Version: 1.0.23435

Page 48 of 56

Graphic Planning Board (MOC)

1.2.8 Tab Views

Resource types

The selection of resource types in the drop-down menu controls the display of resources in the resource

view.  Use  the  drop-down  menu  to  filter  the  resource  types.  Only  for  the  selected  resource  types,  the

respective resources are then displayed. You must request data, to activate the filter.

You can find the icon to activate the resource view in the toolbar, tab Planning details.

1.3  Tabular Pool of groups

Go to tab Planning details in the toolbar and click the icon Pool of groups.

The  tabular  pool  of  groups  shows  the  operations  planned  for  a  group.  It  shows  the  operations  of  all

groups of the planning board. The planner can individually define the sorting of the table.

Using  the  table's  filter  function,  you  can  restrict  the  pool  of  groups  to  single  groups.  Refer  to  the

documents on the general operation (moc_cc.pdf) for detailed information on the use of the filter function.

User fields: You can select different user fields that either refer to operations or orders. The configuration

of the user field keys AGNR/SYSTEM or AUNR/SYSTEM specifies the range of selectable user fields.

1.4  Tabular Pool of workplaces

The  tabular  pool  of  workplaces  shows  all  planned  operations  of  a  workplace  in  a  tabular  list.  The  list

shows operations sorted by  their planned start date.  However, running operations are always displayed

on top of the list, chronologically sorted by logon time.

It is possible to replan operations using the pool of workplaces tables.  If you drag an operation to the top

of the list (so that the drop line is at the top), the operation is planned at the start of the planning horizon.

If you drag an operation A so there is operation B above the drop line, the planned start of operation A is

put at the end of operation B.

It  is  not  possible  to  change  the  display  with  regard  to  the  sorting  of  operations  via  the  table  sorting

function.  Also,  you  cannot  use  the  grouping  function,  as  a  change  in  the  display  sequence  affects  the

sequence of operation planning.

You can switch to another workplace's pool of workplaces using one of these two options:

  Calling the menu item in the workplace's context menu in the Gantt workplace table

  Single clicking on the required workplace in the Gantt workplace table

HLS-GPT_81.docx

Version: 1.0.23435

Page 49 of 56

Graphic Planning Board (MOC)

The fields that are available in the tabular pool of workplaces are the same as the ones in the tabular pool

of groups.

Single clicking an operation in the tabular pool of workplaces

If  you  use  the  mouse  and  single  click  on  an  operation  with  the  left  button,  the  system searches  for  the

relevant operation in the other currently active views/dialogs and selects it.

Double clicking an operation in the tabular pool of workplaces

If you use the mouse and double click on an operation with the left button, the system opens the  Order

overview  dialog.  When  doing  so,  the  system  also  transfers  the  respective  order/operation.  In  the  order

overview,  the  system  automatically  displays  the  order  in  the  upper  detail  application  and  the  order's

operations in the lower detail application (order progress).

User fields: You can select different user fields that either refer to operations or orders. The configuration

of the user field keys AGNR/SYSTEM or AUNR/SYSTEM specifies the range of selectable user fields.

1.5  Notes

You can enter notes on an operation. You can view the notes already entered for an operation using the

detail application Notes on operations, which can be activated from the Toolbar.

The detail application includes a table and a memo field. The table shows the following columns on the

left hand side: short text, modified by, date, time, display on terminal, MES order number. To the right, the

memo text is displayed. The position of the splitter between table and memo field is saved.

If the detail application Notes is active, an additional tab Notes is shown in the toolbar. This tab contains

the functions needed to edit notes:

Insert a note

You  can  insert  a  new  note  using  the  operation's  context  menu.  You  require  the  function  authorization

edopnote.create  to  insert  a  new  note.  The  dialog  matches  the  editing  dialog  available  in  the  order

management.  When  you  call  the  dialog,  the  MES  order  number  of  the  operation  is  pre-assigned.  You

must enter a short text and a long text.

Disable  the  checkbox  Display  at  terminal  if  you  do  not  want  the  note  to  be  displayed  on  the  shop  floor

terminal (CTWIN, AIP).

Edit a note

You can edit an existing note with the corresponding buttons in the toolbar.

Delete a note

You can delete an existing note with the corresponding buttons in the toolbar.

HLS-GPT_81.docx

Version: 1.0.23435

Page 50 of 56

Graphic Planning Board (MOC)

Visualization with the operation bar

The icon

 displayed with the operation bar of the graphic planning board (Gantt) indicates if at least

one note is assigned to an operation. If the detail application  Notes is visible and you click one or more

OP bars, the contents of the detail application Notes are updated.

1.6  Conflict list

You  can  use  the  button

  to  call  the  conflict  list  from  the  graphic  planning  board.  It  shows  the

planning conflicts for the current planning profile. The conflict list is always updated online, i.e. it is always

updated after each planning action.

In case of manual user activities, the conflict list is only updated when the user activity is fully completed.

So, if any validation checks occur that must be edited by the planner, the conflict list is not updated. The

conflict list is only updated when the activity has been fully completed.

In case of automatic planning activities, the conflict list is only updated when the entire planning activity

has been fully completed.

Conflicts displayed

By default, the conflict list shows the conflicts listed below. You can use the combo box Conflict to restrict

the displayed conflicts.

Conflicts that are only shown for planned OPs

- Violation of a relationship

- Overloaded resource

- Planned end lies past latest end of the operation

- Planned start lies ahead of earliest start of the operation

- Planned start lies ahead of earliest start of the order

- Planned end lies past latest end of the order

 AOB

RES

 PEG

 PSG

PSA

 PEA

- Material not available (planned inventory levels)

  MVPMAT

-

Material

not

available

(energy

consumption)

    MVPEMG

- Insufficient staff available

     PEPKAPA

- Insufficient staff available with required qualification

 PEPQUALI

HLS-GPT_81.docx

Version: 1.0.23435

Page 51 of 56

Graphic Planning Board (MOC)

Conflicts shown for planned and unplanned OPs:

- Scheduled end lies past latest end of the operation

TEG

- Scheduled start lies ahead of earliest start of the operation

 TSG

- Scheduled start lies ahead of earliest start of the order

- Scheduled end lies past latest end of the order

- Personnel not available (Person OK = "N")

- Tool not available (Tool OK = "N")

- Material not available (Material OK = "N")

 TSA

 TEA

PNV

WNV

MNV

The  fields  "Person  OK",  "Tool  OK"  and  "Material  OK"  are  filled,  if  you  change  the  resource

status (e.g. in the application "Order overview", function Modify resource status).

Field description

The following fields (columns) can be displayed in the conflict list.

Conflict

Text description of the conflict: see above "Displayed conflicts"

Order / sequence / OP / split / MES order number

Operation triggering a conflict.

OP name

Name of the operation according to the order backlog

Article

Article number of the operation

Article designation

Article designation

Resource

Conflict  "Overloaded  resource"  (RES):  The  workplace/machine  or  the  resource  is  overloaded

because  of  the  scheduling  of  the  operation.  Usually,  this  conflict  is  the  result  of  a  double

assignment. This conflict might also be caused if you try to plan the operation during a period when

the resource is locked.

Other conflict: Workplace/machine or resource the operation is planned for.

Group

Group of the workplace/machine.

Planned start

Planned start date (date, time) when the operation is planned.

HLS-GPT_81.docx

Version: 1.0.23435

Page 52 of 56

Graphic Planning Board (MOC)

Planned end

Planned  end  (date,  time)  of  the  operation.  The  planned  end  is  calculated  using  the  planned  start

plus the remaining run time. The result is compared to the (planning) shift model of  the workplace

and the performance level stored in the workplace.

Earliest start

Earliest start date (date, time) of the operation according to lead time scheduling.

Earliest end

Earliest end date (date, time) of the operation according to lead time scheduling.

Latest start

Latest start date (date, time) of the operation according to lead time scheduling.

Latest end

Latest end date (date, time) of the operation according to lead time scheduling.

Scheduled start time

Scheduled start (date, time) of the operation.

Scheduled end time

Scheduled end (date, time) of the operation.

Order start date

Basic start date (date, time) of the order.

Order finish date

Basic end date (date, time) of the order.

Actual start

For running operations: Point in time (date, time) since when the operation has been logged on. For

operations  that  are  processed  at  workplaces  with  activated  shift  automatic,  the  actual  start  is  the

point in time of the beginning of the shift, if a shift change has taken place since the operation has

been logged on.

Conflict with OP

In  case  of  a  conflict  of  type  "Violation  of  a  relationship"(AOB),  the  MES  order  number  of  the

operation is displayed here.

Because  the  "other"  operation  is  also  "involved"  in  this  conflict,  a  conflict  is  displayed  for  this

operation as well.

Information

If the following conflicts occur, this field shows the material number of the material component that

will not be fully available at the planned point in time:

- "Material not available (planned inventory levels)" (MVPMAT),

- "Material not available (energy consumption)" (MVPEMG).

HLS-GPT_81.docx

Version: 1.0.23435

Page 53 of 56

Graphic Planning Board (MOC)

Priority

Priority of operation

Defect code

Internal number of the conflict

Running

Indicates if an operation is currently logged on (status "running")

Planned

Indicates if an operation is currently planned for a workplace.

Fixed

Indicates if the operation is fixed.

Target duration

The  target  duration  is  not  the  net  processing  time  according  to  the  remaining  run  time  formula.

Instead it refers  to  the bar length shown  in the graphic planning board and does not  account for

shift breaks or any other breaks. The processing time depends on the status of the operation:

  For operations not logged on (status <> "running"), the bar length is the sum total of the setup

time + dynamic setup time (if available) + processing time according to the remaining runtime

formula + teardown time.

  For running operations, this is the sum total of the processing time according to the remaining

run time formula + teardown time.

The calculation is based on current values (e.g. remaining quantity to be produced).

If a field included  in  the calculation of the remaining run time formula is changed in the database

(e.g. because of an  update from the ERP system), then  this changed  value  will not be taken into

account until the next time the planning board is reloaded.

Actual duration

Sum total of the times posted to the resource performance accounts 1 - 11.

1.7  Processing notes

1.7.1 Show maintenance

The function described below is only available if the extension graptmaint is enabled.

HLS-GPT_81.docx

Version: 1.0.23435

Page 54 of 56

Graphic Planning Board (MOC)

The system can show if a maintenance becomes due while a planned operation is processed. You can

configure  due  dates  for  maintenance  activities  in  the  MOC  application  Maintenance  calendar  /  Activity

calendar. You must enable the option Show maintenance in the HLS settings, in tab Bar layout, to have a

maintenance displayed that becomes due.

The icon

 above the operation bar indicates that during run time of the OP a maintenance is due for the

workplace where the OP is planned or for the resource assigned to the OP:

The system displays the following maintenance types:

  Maintenance based on cycles

  Maintenance based on time

  Maintenance based on hours of operation

Maintenance  dates  are  recalculated  every  time  the  graphic  planning  board  is  re-planned.  The

maintenance status "red" (compare configuration in the MOC application  Maintenance calendar / Activity

calendar) indicates when a maintenance activity is due.

The system calculates the next maintenance due dates based on the operations included in the current

planning profile or planning horizon.

If  maintenance  is  due  for  a  running  operation,  the  following  is  assumed  when  calculating  the  next

maintenance due date:

  The maintenance activity is performed after finishing the operation

  After the maintenance activity has been completed, the system calculates the next maintenance

dates for subsequent operations.

In case multiple operations are planned simultaneously and use the same resources, the due date for the

next maintenance is calculated separately for each operation (setup times not included).

For  technical  reasons,  maintenance  due  dates  are  not  shown  immediately  after  an  automatic

assignment but only once you have refreshed data.

Calculation with cycle-based maintenances

To  calculate  a  maintenance  due  date  in  the  future  (resource  cycles  required  by  an  operation),  use  the

following formula and include the operations planned for the resource:

Cycles = ( target quantity( primary ) – yield ( primary ) ) / partitioning of operation

HLS-GPT_81.docx

Version: 1.0.23435

Page 55 of 56

The system rounds up calculated cycles to integer values for each operation. If the calculated cycle value

is less than 0, the value will be set to 0. The value "cycles recorded so far" defined for the maintenance is

Graphic Planning Board (MOC)

used as the initial value.

Tooltip display

The  tooltip  shows  the  affected  resource  and  maintenance  type.  The  tooltip  also  shows  if  several

maintenance  activities  become  due  during  the  operation's  planned  term.  These  activities  are

automatically shown below the configured values. The following information is shown for a maintenance:

  Resource including resource type due for maintenance

  Type, class and description of due maintenance activity

For  reasons  of  clarity,  the  tooltip  shows  a  maximum  of  five  maintenance  activities  at  a  time  for  an

operation.

HLS-GPT_81.docx

Version: 1.0.23435

Page 56 of 56

