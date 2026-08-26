Graphic order sequencing

1  Graphic order sequencing

Overview

Menu

Production control  Production support  Graphic order sequencing

Transaction code

Function
authorization

graps

graps

Purpose

The  Graphic  order  sequencing  (GAV)  is  an  integrated  planning  module.  Within  the  scope  of  the

production  control,  you  can  use  the  Graphic  order  sequencing  to  generate  sequencing  lists  for  an

organizational unit. The Graphic order sequencing (GAV) includes the following functions:

  Display of operations that are scheduled for a workplace or still in the pool of groups.

  Planning of an operation for a workplace/machine

  Re-plan an operation on another workplace or group

  Define  a processing sequence (“sequencing”) that specifies how the  operations  to be produced are

displayed in the sequencing list on the terminal

  Splitting of operations (requires separate license)

The Graphic order sequencing is a cost-effective alternative to the HYDRA shop floor scheduling (HLS) to

schedule production orders and sort them in a queue.

Integration

You can use the Graphic order sequencing to assign operations to the machines and workplaces of the

shop floor.

If  you  schedule  an  operation  for  a  workplace,  you  define  the  processing  sequence  in  production.  The

sequencing list of the shop floor terminal shows this processing sequence.

The  Graphic  order  sequencing  does  not  compare  the  planning  with  the  defined  shift

model  of  the  workplace  as  does  the  HYDRA  shop  floor  scheduling  (HLS).  The  Graphic

order sequencing also does not include secondary resources in the planning (production

resources and tools, material components, persons).

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 1 of 31

Graphic order sequencing

Requirements

If you want to display the current planning in the graphic order sequencing, the following is required:

  Create  orders  relevant  for  planning  (production  orders,  maintenance  orders,  project  orders)  in  the

system or transfer these orders from a higher system.

  Coordinate  responsibilities  within  your  company  and  specify  the  persons  responsible  for  order

planning.  Also  specify  which  workplace/machine  groups  should  be  planned.  Based  on  these  initial

steps, you have defined the necessary planning profiles.

Note:  You  cannot  use  the  Workplace  assignment  of  the  Personnel  Scheduling  product

group  (PEP)  and  the  Graphic  order  sequencing  simultaneously.  Inconsistencies  might

occur  if  personnel  and  capacities  are  planned  at  the  same  time,  as  the  Workplace

assignment uses data structures of the Graphic order sequencing.

1.1  Graphic order sequencing

The basic element of the Graphic order sequencing is the graphic planning board. The graphic planning

board is modeled after a traditional planning board.

If you request data in the graphic order sequencing, the planning situation is displayed that corresponds

to the currently available state in the database.  All order types are relevant for planning that have been

configured using the ID "Planning". You can customize these Order types in the system.

The display includes all workplaces/machines or groups for which the planner is authorized (it is checked

if  the  workplace  is  included  in  the  responsibility  area).  Optionally,  the  user  can  define  so-called  user

profiles. The user can then specify in detail the respective display within the responsibility areas the user

is authorized for.

The following illustration shows the application Graphic order sequencing:

Note: This screenshot shows  one possible presentation of the graphic order sequencing. Depending on

the settings, the presentation may vary.

In  the  Graphic  order  sequencing,  you  can  realize  an  interactive  planning  by  manually  changing  the

current planning situation. You can make the following interactive changes of the planning state:

  Schedule an operation for a workplace

  Re-plan a planned operation

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 2 of 31

Graphic order sequencing

  Reassign an operation to another machine within the machine group

  Deallocate an operation to the pool of groups

Planning  changes  are  stored  in  the  database  on  saving.  The  current  planning  state  is  discarded,  if  you

exit the Graphic order sequencing without saving the planning.

1.1.1 Toolbar

This  chapter  describes  the  functions  that  you  can  call  via  the  toolbar.  The  access  to  specific  functions

depends on the assignment of function authorizations.

1.1.1.1

Tab Main page

Category Data

Data is requested

Data  matching  the  selection  criteria  entered  in  the  tab  Selection  is  read  from  the  database  and

loaded into the graphic order sequencing.

Cancel

Interrupts the process of requesting data.

Save planning

Function authorization: grapt.save

The  current  assignment  is  saved.  Changes  are  stored  in  the  database  and  are  thus  available  for

other planners.

On saving, the internal fields used to sort the terminal's sequencing list are set to the start date and

the start time that have been specified by the planner in the graphic order sequencing.

A pop-up dialog appears to notify the planner that changes have been saved.

Category Options

Search operation

All operations matching the criteria entered are selected.

Notes on the individual fields:

  Operation: This is a combined order/operation number (MES order number).

  Article:  The  article/item  stored  in  the  operation  (see  Order  information  >  Operations  >  tab

Operation > field Article)

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 3 of 31

Graphic order sequencing

  Tool:  The  (main)  tool  stored  in  the  operation  (see  Order  information  >  Operations  >  tab

Operations > field Tool)

You can also run a search using wildcards (at the beginning and/or end of a character string).

Next time you call the function, the dialog shows the selection criteria that you have entered the last

time.

Settings

In the dialog Settings, you can make different settings, e.g. change the color of bars. The section

Settings describes the individual options.

Save

You must save changes, if the changed configurations should be available after having closed the

application.  So  save  the  settings  if  you  perform  one  of  the  activities  mentioned  in  the  following.

Click the Save icon in the toolbar to save the changed application layout.

  You add or delete a detail application of the tab Planning details.

  You add or delete columns in a table.

  You change the layout of categories and columns in a table.

  Make settings in the dialog Settings.

1.1.1.2

Tab Selection

Category Data

The functions are similar to the ones in Tab Main page.

Category Selection

planning profile

Planners with many responsibility areas should use planning profiles.

Advantages of planning profiles:

-  Better overview

-  Faster load times when requesting data

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 4 of 31

Graphic order sequencing

Select  a  planning  profile  before  requesting  data.  Using  this  planning  profile,  the  groups  of

workplaces/machines  that  are  assigned  to  the  planning  profile  are  loaded  and  displayed  and  can

then be scheduled.

If  you  do  not  enter  a  planning  profile,  all  workplaces  are  loaded  that  are  assigned  to  your

responsibility areas.

Planning horizon

You can change the dates "Planning horizon from/to" manually. The data selection always refers to

the dates entered in the input fields. The system selects all operations with a scheduled start time

within this period.

Order type

If you select one or several order types, only those operations are loaded and displayed that belong

to an order of the respective order type.

Using  this  selection  option,  you  can  for  example  select  and  plan  capacity  or

simulation orders. The planning of the production orders is not affected in this case.

Important: Always include all order types when you select production orders before

you perform and save a real planning.

1.1.1.3

Tab View

Category Planning board

Expand/collapse all groups

Open or close the workplace/machine groups.

Zoom in

You  modify  the  Gantt  presentation  in  order  to  increase  the  degree  of  accuracy  of  the  time  scale.

You  can  also  enlarge  the  presentation  using  the  key  combination  Ctrl  +  "+"  (numeric  keypad)  or

using the mouse wheel: turn the mouse wheel while keeping the Ctrl key held down.

Zoom out

You modify the Gantt presentation in order to get a better overview. You can also reduce the size of

the presentation using the key combination Ctrl + "-" (numeric keypad) or using the mouse wheel:

turn the mouse wheel while keeping the Ctrl key held down.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 5 of 31

Graphic order sequencing

General view

The  general  view  is  an  additional  window  showing  the  complete  Gantt  chart.  A  frame  indicates

which  chart  section  is  currently  displayed  in  the  main  window.  If  you  move  the  frame  with  the

mouse,  the  section  displayed  in  the  main  window  is  moved  accordingly  when  you  release  the

mouse  button.  Similarly,  you  can  zoom  the  frame.  The  display  detail  in  the  main  window  is  then

changed  accordingly.  And  vice  versa,  size  and  position  of  the  frame  also  change,  if  you  zoom  or

scroll the section displayed in the main window.

Open and close the General view by clicking the relevant button. Every time you request data, the

General view is automatically closed.

Legend

The  legend  view  is  an  additional  window  to  present  a  legend  on  the  screen.  The  following

information is shown:

  Target  processing  time  (in  some  cases,  shown  multiple  times  because  of  different  color

codes!). It is the remaining run time (calculated using the remaining run time formula).

  Target setup time

  Teardown/retooling time

The  configurations

in

the  Settings,  section  Bar

layout,  specify

the  respective  display.

Open and close the legend by clicking the relevant button. Every time you request data, the legend

is automatically closed.

Print preview

The  Print  preview  shows  the  complete  print  area.  You  can  restrict  or  zoom  the  print  area  in  this

view. Refer to the chapter 1.1.7 Print preview for more information.

Category Operations

Links

Not used

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 6 of 31

Graphic order sequencing

Notes on operations

Function authorization: edopnote

Shows the detail application Notes on operations. The use of this function is described here.

Open and close the detail application by clicking the relevant button.

Show delays

You can identify delayed operations. The use of this function is described here.

1.1.1.4

Tab Planning details

pool of groups

Function authorization: grapv.tabgrp

The function call pool of groups opens a detail application showing the operations that are planned

for a group. The display includes the scheduled operations for all groups.

Open and close the detail application by clicking the relevant button.

Available workplaces/Workplace backlog

Function authorization: grapv.tabwp

The  function  call  Available  workplaces/Workplace  backlog  opens  a  detail  application  showing  all

scheduled operations of a workplace in tabular form.

Open and close the detail application by clicking the relevant button.

Order network (requires authorization key)

Function authorization: grapv.orview

The  function  call  Order  network  opens  an  application  showing  the  Order  network  the  selected

operation is assigned to.

Open the detail application by clicking the relevant button. Unlike the other detail applications, the

order network is not closed by clicking the button again, but by closing the window.

1.1.2 Time scale

A  blue,  vertical  line  identifies  the  current  point  in  time  "now".  In  addition,  red  vertical  lines  visualize  the

end of each day.

The dimension of the time scale is defined in the Settings.

To change the resolution, resize the time scale (by holding down the left mouse button).

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 7 of 31

Graphic order sequencing

Every time you request data, the time scale is set back to its original setting.

The format of the date values displayed on the Gantt chart depends on the format specified by

the operating system. The MOC format is not relevant.

1.1.3 Presentation of groups and workplaces/machines

The workplaces/machines that are available for planning are displayed on the left hand side. A workplace

is shown if the following criteria are met:

  The identifier Planning function is set to 'P' or 'H' in the Workplace and resource configuration.

  The workplace is not "blocked" in the Workplace and resource configuration.

  The workplace is assigned to a Group that is defined as a capacity group.

  The  group  the  workplace  is  assigned  to  is  also  assigned  to  the  selected  planning  profile  and

configured there as Visible in shop floor planning.

  The workplace/machine is part of the planner's Responsibility area.

If you click Request data, the overview of the workplace groups is shown. The group number is shown.

You can define the order of the groups using the field Order in the configuration of the planning profile.

Note:  The  values  in  the  field  Order  must  be  unambiguous  within  a  planning  profile.

Otherwise the order is random.

Select a group by clicking it. The workplaces/machines of this group are shown. Use the field  Position in

the  Group  assignment  configuration  to  specify  the  order  in  which  workplaces  of  a  group  are  displayed.

Note:  The  values  in  the  field  Position  must  be  unambiguous  within  a  group.  Otherwise  the  order  is

random.

List of workplaces: Columns

The following columns are available for display in the list of workplaces:

Header

(none)

Meaning

Comment

Status color or RPA color
(according to the Setting)

Due  to  the  linked  logic,  group  workplaces  always
have
the
to
the  status  Production  (assigned
resource performance account Main utilization).
You  can  define  the  update  interval  of  the  status  in
tab General of the settings.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 8 of 31

Graphic order sequencing

Header

Workplace

Short name

Designation

Group

Meaning

Comment

Number of the
workplace/machine

Short name of the
workplace/machine

Full name of the
workplace/machine.

Group of the
workplace/machine.

Symbol

Graphic

Performance
level

Current performance
level of the
workplace/machine.

The  performance  level  is  read  from  the  database
when data is requested.

The  planner  defines  in  the  tab    General  of  the  settings  which  columns  are  displayed  in  the  table.  The

configuration  is  saved  user-specifically.  Change  the  column  widths  directly  in  the  table  (click  and  drag

across). This modification is saved user-specifically.

Tooltip

If the mouse pointer rests on a workplace, a tooltip is displayed providing the following data:

Header

Meaning

Single
workplace

Group workplace

Workplace

Short name

Designation

Cost center

Workplace
type

Status

Number of the workplace/machine
according to configuration

Short name of the
workplace/machine according to
configuration

Full name of the
workplace/machine as configured

Cost center of the
workplace/machine as configured

Workplace type as configured:
E = Individual workplace
G = Group workplace

Status number and name of the
workplace/machine status as
configured

Status since

Point in time (date, time) since
when the status has been active.

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

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 9 of 31

Graphic order sequencing

1.1.4

Functions on the level of the group/workplace

You can perform the functions described in the following if you select a workplace or group in the column

Workplace and right-click it (to open the context menu). The order in the context menu may vary from the

order the functions are described here:

Workplaces/Machines

The  menu  item  Workplaces/machines  calls  the  application  Workplaces/Machines  for  the  current

workplace/machine or the current group. The workplace number or group is transferred to the application

as selection criterion.

Single-line presentation

With single-line presentation, operations assigned twice are not displayed one below the other (i.e. listed)

but one on top of the other (i.e. overlapping).

Two-line presentation:

Single-line presentation:

  With single-line presentation, the label text on OP bars might partly not be visible.



It is  only  a temporary  presentation option. Every time  you request data, parallel

operations are again displayed one below the other.

Selecting operations in the pool of groups

This entry is available if you call the context menu on group level. Click this entry to select all operations

included in the pool of groups.

Select the planned operations

The  entry  is  available  if  you  request  the  context  menu  on  workplace  level.  Click  this  entry  to  select  all

operations planned for this workplace.

With the functions mentioned above,  you can select multiple operations by holding down the CTRL key

and clicking further operations.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 10 of 31

Graphic order sequencing

1.1.5 Displaying operations in the Gantt

Order backlog / pool of groups / pool of orders

Operations transferred from the ERP system are generally planned for a group and therefore included in

the pool of groups. You can show the pool of groups in tabular form and/or as Gantt chart.

If  the  machine/capacity  group  is  changed  for  a  workplace,  you  must  also  change  the

group  for  the  planned  operations  in  the  order  backlog.  Otherwise,  the  Graphic  order

sequencing no longer shows the operations.

Pool of groups in Gantt

In order to graphically display operations in the pool of groups of the Gantt, you must activate the option

Show operations in pool of groups of the Gantt in the settings in tab  General. In this case, operations are

displayed according to their scheduled start time.

Planned operations

Planned operations are displayed for the individual capacity (workplace/machine), i.e. in the relevant row

(only if the view is expanded).

Duration/length of an operation bar

The  length  of  an  operation  represents  the  sum  total  of  setup  time,  processing  time/Remaining  run  time

and retooling time (teardown time). This time is called execution time. You can define the process times

either directly or the system can calculate these times using a formula.

Setup  time  is  generally  integrated  in  the  calculation  of  execution  times  in  Graphic  order

sequencing,  also  if  the  operation  has  already  been  started  and  is  currently  in  status

Interrupted.

You can customize the configuration and define if the setup time of interrupted operations

is  integrated  in  the  graphic  order  sequencing  or  not.  To  configure  the  order  type,  the

following options are available in the field Setup time in shop floor planning:

  R: Remaining setup time

Integrate remaining setup time: target setup time minus "times posted to RPA 7"

  B: Target setup time 0, if OP is started

Ignore setup time if the operation has already been started (even if OP is interrupted)

Running operations do generally not include the setup time.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 11 of 31

Graphic order sequencing

If  the  current  remaining  run  time  of  an  operation  is  0  or  negative  (e.g.  in  case  of

overproduction),  the  remaining  runtime  is  set  to  0  for  a  running  operation.  In  case  of  a

prepared  or  interrupted  operation,  the  remaining  run  time  is  set  to  900  seconds  =  15

minutes  by  default.  This  way,  this  operation  can  still  be  re-planned  manually  using  the

drag  &  drop  function  in  the  Gantt.  You  can  change  this  duration  in  the  settings  of  the

graphic order sequencing in tab Bar layout.

Color coding of operations

You can define the color of operation bars in the settings in tab Bar layout.

Exceeding basic dates

Make the following setting to enable the colored presentation of the operation bar:

  Settings  tab Bar layout

  Enable the option Operation delayed.

If an operation is planned outside the predefined basic dates and the planned end date is later than the

"latest end time" (LET), the presentation changes. The operation bar is hatched or displayed in a different

color.

Double clicking an operation bar

If the user has the authorization grapt.edop.edit, the user can double-click an operation in the Gantt (only

operations that  are not logged  on). A dialog opens  and the user can change default  values/target  data.

The following data can be changed in the dialog:

  Target quantity (primary quantity unit)

  Partitioning

  Setup time

  Target cycle

  Teardown/retooling time

  Wait time

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 12 of 31

Graphic order sequencing

Confirm  the  dialog  to  store  the  changed  data  directly  in  the  operation  and  to  update  the  graphic  order

sequencing.

1.1.6  Operation functions

Right-click a selected operation to open a context menu including the following functions:

Deallocate

Use  this  function  to  deallocate  selected  operations.  The  operations  are  then  available  in  the  pool  of

groups.

Order overview

The Order overview is opened for the selected operation. The order number of the selected operation is

transferred as selection.

 Order information

The  Order information including relevant default data and current information about the order is opened

for the selected operation.

Order network

This menu item opens the application Order network for the selected operation. The order network shows

the operations that are related to the selected operation in a graphic (Gantt chart).

This function requires the respective authorization (license).

Split operation

Subject  to  the  setting  of  the  option  Enhanced  split  function  in  the  Basic  settings,  you  can  find  the

requirements and more information about operation splitting in one of the below-mentioned documents:

  Enhanced split function is not enabled: Operation Split

  Enhanced split function is enabled: Enhanced split function

This function requires the respective authorization (license).

dissolve split

Use the function Cancel split to undo the splitting of an operation.

Subject  to  the  setting  of  the  option  Enhanced  split  function  in  the  Basic  settings,  you  can  find  the

requirements and more information about operation splitting in one of the below-mentioned documents:

  Enhanced split function is not enabled: Operation Split

  Enhanced split function is enabled: Enhanced split function

Create note

You  can  create  one  or  more  notes  for  the  selected  operation.  You  must  have  activated  the  respective

detail view Notes to be able to show notes.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 13 of 31

Graphic order sequencing

Select all operations of the order

The  function  Select  all  operations  of  the  order  selects  all  operations  included  in  the  Gantt  chart  and

belonging to the same order as the current operation.

In  connection  with  the  function  Deallocate,  you  can  remove  an  entire  order  from  planning.  Note:  Fixed

operations must first be unfixed.

Select this OP and all following OPs of the order

Use  the  function  Select  this  OP  and  all  following  OPs  of  the  order  to  select  this  operation  and  all

operations included in the Gantt chart that belong to the same order and have a higher operation number

than the current operation.

Select the planned operations

Use the function Select the planned operations to select all operations scheduled in the Gantt chart.

In  connection  with  the  function  Deallocate,  you  can  remove  all  operations  from  planning.  Note:  Fixed

operations must first be unfixed.

1.1.7 Print preview/Print

The  functions  and  options  described  in  this  chapter  are  part  of  the  used  Gantt

visualization  component.  As  the  Gantt  visualization  component  is  a  standard  third-party

product, changes to the layout and the functionality are only possible to a limited extent.

You can print the graphic order sequencing using the print preview screen that is opened via the button

 in tab Different screens of the toolbar.

You  can  view  each  single  page  or  see  an  overview  of  all  pages  of  your  presentation.  You  can  also

interactively zoom in on a section of your chart and then print it.

The  status  line  provides  information  about  the  total  number  of  pages  and  the  horizontal  and  vertical

distribution of pages. In the view Show single page, the current page number is additionally shown.

Functions of the print preview

Close

You exit the print preview and return to the application.

Note: The settings made in the print preview are currently not saved.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 14 of 31

<

Only active if the button Show single page has been clicked. If the chart takes up several pages, you can

view each single page. Click this button to return to the previous page. You move through the pages from

Graphic order sequencing

right to left in ascending rows.

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

You can only select the  zoom factor if single pages are shown. The print is not affected. Depending on

the selected size, vertical and/or horizontal scroll bars are displayed. You can also use the mouse wheel

to move the image (without shift key vertically, with shift key horizontally).

Auto is preset as zoom factor. With this setting, the size of the page is always reduced or enlarged so that

it fills the screen.

Page setup

If  you  click  this  button,  you  are  forwarded  to  the  dialog  Page  setup,  where  you  can  change  the  page

layout. The options of this dialog are described below.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 15 of 31

Graphic order sequencing

Print/print area

If you click this button, you are directed to the Windows dialog  Print. If you have zoomed in a section in

the  print  preview,  the  label  text  of  the  button  changes  to  Print  area.  If  you  click  this  button,  the  option

Location is preselected in the Windows dialog Print. Click OK to print the section shown on the screen.

Note: The zoom factor selected in the print preview does not change the scaling factor in the dialog  field

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

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 16 of 31

Graphic order sequencing



If a fixed number of pages is defined for scaling: The zoom factor is calculated so that the full height

of the set number of pages is printed. At the same time, the time scale is compressed or stretched so

that the full width of the defined number of pages is made use of.



If a zoom factor is defined for scaling: The time scale is compressed or stretched so that the full width

of the defined number of pages is made use of.

Pad pages with space

Use this option to define whether you want to leave space between the chart and the boxes for title and

legend. If you enable this option, the boxes are always positioned on the page margin and printed in full

width  on  each  page.  If  this  option  is  disabled,  the  boxes  are  printed  without  space  next  to  the  chart.

Depending on the chart, the width of the boxes may vary on the different printed pages.

Show frame outside

Activate this checkbox so that a frame is printed around the chart. If  the option  Repeat title/ table/ time

scale is enabled, a frame will be printed on each page; otherwise a frame will be drawn around the entire

chart.

Alignment

Define the alignment of the charts on the page.

Show crop marks

If you enable this option, crop marks are set on the chart. This way it is easier to glue the printed single

pages to create a full chart.

Show folding marks (DIN 824)

For  construction  diagrams,  the  German  national  standard  DIN  824  defines  a  very  specific  folding

procedure  that  allows  you  to  fold  up  the  drawing  to  a  DIN  A4  format  size.  If  this  option  is  enabled,  the

folding marks on your diagram facilitate the folding procedure. The following formats are available:

  Form  A: With a filing margin on the left side so that holes can be punched into the folded drawing.

The drawing can then be filed in a folder without filing clip.

  Form B: This format is somewhat narrower. A filing clip is attached and the drawing plus clip have the

format DIN A4.

  Form C: The folded drawing is not punched, but placed in a clear cover.

The folding marks can be added for any target format, whereas DIN 824 only includes the formats DIN A0

to A3.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 17 of 31

Graphic order sequencing

Page numbering

If you check this option, the page number is printed on the bottom left of every page. You can select from

the following options:

  Row.column: This option is useful if the chart covers more than one page in length and width. The

position of the page in vertical order is printed before the dot, the position in horizontal order is printed

after the dot.

  Column.row: This option is useful if the chart covers more than one page in length and  width. The

position of the page in horizontal order is printed before the dot, the position in vertical order is printed

after the dot.

  Page/count (total number): The first number shows the current page number, the second the total

number of pages: 1/6, 2/6, etc.

Text

Enable this option, if you want to add a random text at the bottom left of every page. In some cases, this

text is printed to the right of the page number.

For  page  numbering,  you  can  enter  the  following  placeholders  in  the  row  Additional  text.  These

placeholders are then replaced with the relevant content when the document is printed.

{PAGE} = Consecutive page number

{NUMPAGES} = Total number of pages

{ROW} = Row position of the detail section in the total chart

{COLUMN} = Column position of the detail section in the total chart

Print date

If you check this option, the print date is printed on the bottom left of every page. In some cases, the print

date is printed to the right of the page number and the additional text.

Sheet margins

Define  the  sheet  margins  in  cm  using  the  fields  Top,  Bottom,  Left  and  Right.  You  cannot  go  below  the

minimum margins that printers preset for technical reasons.

1.2  Settings

If you click

, you call a dialog where you can make custom settings. The settings are saved user-

specifically. The next time you call the graphic planning, the settings are available.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 18 of 31

Some  changes  are  only  activated,  when  you  request  data  the  next  time.  We  therefore

recommend  to  request  data  in  the  graphic  order  sequencing  after  having  performed

Graphic order sequencing

changes.

1.2.1 Tab Main page

General settings

Update statuses

The  setting  Update  statuses  defines  if  and  at  which  interval  the  workplace/machine  status  is  read.  The

updated  status  is  displayed  on  the  left  hand  side  of  the  Graphic  order  sequencing  (column  without

caption).

Update data

The  setting  Update  data  defines  if  and  at  which  interval  the  Graphic  order  sequencing  is  updated  (i.e.

data  is  read  and  displayed).  If  changes  have  been  made  in  the  meantime,  a  prompt  pops  up  asking

whether the changed data should be saved or not.

Update order overview automatically when selecting an operation

  The function is available as of Service Pack 16.

If  you  click  on  one  of  the  following  elements,  the  order  number  of  the  operation  is  copied  into  the    Order

overview and the display in the order overview is updated:

  Operation bar in the planning board (Gantt)

  Operation in the tabular pool of workplaces

  Operation in the tabular pool of groups

Following, you see the order progress for the whole order in the order overview.

Requirement: The option "Update order overview automatically when selecting an operation" is set and the

order overview is opened in parallel.

Each  click  updates  the  order  overview  and  switches  it  to  the  front.  Therefore  the  order

overview should be placed on a second screen.

If  you  click  on  different  operations  too  quickly  in  succession,  the  update  may  be  delayed

and a popup will be displayed, indicating that data queries are still running and asking you

to

wait

for

the

result.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 19 of 31

Graphic order sequencing

Presentation

Period of the past

The setting  Period of the past identifies the range/period that  is displayed  left to the blue  line indicating

"now".

Time scale

Define the time scale that you want to show on top of the chart in the Graphic order sequencing. Possible

values: Minutes, hours, days, weeks, months.

Show operations in pool of groups of the Gantt

If this option is set, the operations included in the pool of groups are shown in the pool of groups of the

Graphic order sequencing (Gantt). The operations are shown there at their scheduled date.

If you want to display the operations only in the Gantt pool of groups, you must hide the tabular pool of

groups.

One of the two presentations of the pool of groups should always be visible.

Alternative presentation of relationships

Not used.

Save options

Save automatically updated planned dates

If you close the graphic order sequencing or request new data, the prompt that asks if you want to save

the  changes  distinguishes:  Are  the  changes  due  to  explicitly  performed  planning  changes  (manual

planning, calling the automatic assignment, ...) or are the changes due to the automatic update (moving

delayed operations (planned and running) to the line indicating "Now").

  The option "For planned operations" is set:

The prompt that asks if you want to save the planning also appears if operations are implicitly re-

planned.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 20 of 31

Graphic order sequencing

  The option "For running operations" is set:

Running OPs are saved if the planned end date has been recalculated.

1.2.2 Tab Bar layout

Bar colors

Color gradient

If the option Color gradient is set, the operation bars in the Graphic order sequencing are displayed with a

color gradient.

3D effect

(reserved)

You can choose from the following options to display the processing time in color:

Status

The operation bars are displayed in the color that has been defined for the respective operation status in

the status assignment. This way, currently logged on OPs can be identified via the respective color.

Predecessor status

The  operation  bars  are  displayed  in  the  color  that  has  been  defined  for  the  status  of  the  predecessor

operation in the status assignment.

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

Processing time

The bar of the processing time is displayed in the color that has been configured.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 21 of 31

Color from OP user field

If a color has been defined for an operation in the configured user field (possible user fields: 7  - 28), the

operation is displayed in the respective color. In this case, coloring depends on the number entered in the

Graphic order sequencing

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

Enable  the  option  Display  setup  times  to  show  setup  times  as  part  of  the  operation  bar.  If  you  have

enabled the option, you can display setup time, dynamic setup time or retooling time (teardown time) in

one of the available colors.

Setup time

Select the color for the display of the setup time that is defined and stored in the operation.

Teardown/retooling time

Select the color for the display of the teardown time that is stored in the operation.

Operation delayed

If the option Operation delayed is enabled, delayed operations are shown in a hatched pattern or in color.

An operation is considered delayed if its planned end extends beyond the latest end date (LET/SEZ).

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 22 of 31

Minimum bar length

If the remaining run time of an operation is less than or equal to 0, the processing time of this operation is

shown with the duration entered in the field Minimum bar length. Consequently, you can still edit (select,

Graphic order sequencing

move) the operation.

Note available

If  the  option  "Note  available"  is  enabled,  the  operation  bar  shows  the  icon

  indicating  that  a  note  is

available for the operation.

1.2.3 Tab Tooltip/bar text

In  tab  Tooltip/bar  text,  define  the  information  you  want  to  display  in  the  operation's  tooltip  or  in  the

processing bar.

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

Some data might change dynamically during planning. In the below table this data is identified by an "X"

in the column Dynamic modification.

Description

Order

Sequence

Operation

Split

MES order number

Operation status

Secondary status

OP name

Dynamic
modificat
ion

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 23 of 31

Description

Article

Article designation

Fixed (yes, no)

Graphic order sequencing

Dynamic
modificat
ion

Note available (the internal indicator is shown):
X  -  at  least  one  note  is  available  but  no  note  is  identified  with  the  option  "display  on
terminal".
T  -  at  least  one  note  is  available  and  at  least  one  note  is  identified  with  the  option
"display on terminal".

Tool

Farbe

Material

Target cycle

Actual cycle

Target quantity (P) in the primary quantity unit

Yield (P) in the primary quantity unit

Remaining
(target quantity - yield in the primary quantity unit)

quantity

Unit (primary quantity unit)

Partitioning

Setup time

Dynamic setup time
(not relevant in the Graphic order sequencing)

Current
(Setup time + dynamic setup time)

setup

Target duration (see note below!)

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

(P)

time

X

X

X

X

X

X

X

X

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 24 of 31

Graphic order sequencing

Notes on specific fields:

Target duration:

The  field  Target  duration  does  not  display  the  net  processing  time  according  to  the  remaining  run  time

formula. Instead it shows the bar length shown in the graphic order sequencing and does not account for

shift breaks or any other breaks. The processing time depends on the status of the operation:

  For operations that are not logged on (status is not "running"), the bar length equals the sum total of
setup time + processing time according to the remaining run time formula + teardown time + dynamic
setup time (if available);

  For  operations  that  are  logged  on,  the  bar  length  equals  the  sum  total  of  the  processing  time

according to the remaining run time formula + retooling time.

The  calculation  is  based  on  current  values  (e.g.  remaining  quantity  to  be  produced).  If  a  field  that  is

included  in  the  calculation  of  the  remaining  run  time  is  changed  in  the  database  (e.g.  because  of  an

update in the PPS system), the changed value is only available once the graphic order sequencing has

been reloaded.

User fields: You can select different user fields that either refer to operations or orders. The configuration

of the user field keys AGNR/SYSTEM or AUNR/SYSTEM specifies the range of selectable user fields.

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

MES order number

Operation status

OP name

Article

Article designation

Tool

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 25 of 31

Graphic order sequencing

Description

Target cycle

Priority

Order index

To enable the settings, you must request data in the Graphic order sequencing.

1.2.4 Workplace tab

Visible columns

The  left  hand  side  of  the  graphic  order  sequencing  shows  the  capacity  groups  including  the  assigned

individual capacities (workplaces/machines) that match the planner's responsibility area or user profile.

You can display the following columns in this list of workplaces:

Column

Status

Meaning

Status
RPA
(depending on the option settings for "Use status text colors")

color

or

color

Workplace

Workplace/machine number

Short name

Short name of the workplace.

Designation

Full name of the workplace

Group

Symbol

Performance
level

Group of the workplace.

Graphic
See also the description for the button "Download workplace icons from server".

Current performance level of the workplace.

Change the column widths directly in the table (click and drag across). This modification is saved user-

specifically.

We recommend to display at least the workplace/machine number.

Use status text colors

If  this  option  is  enabled,  the  workplaces  are  colored  according  to  the  currently  active  status.  The

individual  status  color  is  defined  in  the  assigned  status  text.  If  no  color  is  defined  for  a  status  text,  the

workplace is shown without a color (white/transparent).

If this option is not set, the machines are colored according to the configured RPA.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 26 of 31

Graphic order sequencing

Show expected malfunction period

When  the  workplace/machine  status  is  updated,  the  expected  duration  of  a  malfunction  entered  in  the

Windows terminal can also be transferred.

If this option is set and if a status with a duration > 0 is available, the expected duration is displayed in the

graphic order sequencing. The expected end is calculated:

Expected

end

=  maschinen_status.prog_begin_dat/zeit

+  maschinen_status.prog_dauer

(compared to the Gregorian calendar)

If the expected end is in the future, the period of time between "now" and the expected end is shown as a

red  bar.  The  bar  does  also  cover  periods  without  shift  (times  without  shift  are  not  considered).  At  the

same  time,  a  respective  symbol  is  displayed  in  the  column  Symbol  of  the  workplace  list.  This  symbol

overrides the symbol that is normally displayed.

Tooltip

The red bar includes a tooltip showing the following information:

  Workplace: workplace number according to configuration

  Short name: short name of the workplace according to configuration

  Designation: name of the workplace according to configuration

  Current status: status number and status text of the status currently available for the workplace.

  Status since: date, time

  Expected malfunction period: duration in hrs:min:sec.

  Expected end: date, time

Conversion of malfunction period into times without shift

The red bar includes a context menu. The context menu includes the menu item Convert to time without

shift.  Once  you  have  clicked  this  menu  item,  the  dialog  Individual  shift  times  opens.  The  period  of  time

starting from "now" until the expected end is pre-assigned.

Malfunction

period

does

no

longer

apply

If the malfunction duration returns to 0 the next time the status is identified, the bar and the symbol are

removed and the initial symbol is shown again. If this period has been defined as time without shift, this

period remains and the planner must remove it explicitly.

Download workplace icons from server

By default, the following symbols are displayed:

  Single workplace according to configuration:

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 27 of 31

Graphic order sequencing

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

Extract

the

front

part

of

the

file

name



12330

Add

Add

Search

"_small"

12330_small

the

file

extension

".png"

12330_small.png

for

file

12330.png

If found, the image 12330_small.png is displayed in the list of workplaces.

Otherwise:

The default image is displayed that references the configured workplace type:

- E = Single workplace:

- G = Group workplace:

1.2.5 Tab Priorities

Display priorities

You can use the priority of an operation as control tool. The priority is a single digit, numeric value. The

value increases in ascending order ("0" = lowest priority, "9" = highest priority).

If  this  option  is  enabled,  the  operation's  priority  is  shown  on  the  left  as  a  colored  triangle:

You can define the color for the individual priorities as you like.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 28 of 31

Graphic order sequencing

Also in the toolbar, you can activate/deactivate the symbol used to display the priority.

Show delays

Using this option, you can identify operations that are expected to be delayed. A narrow bar is displayed

on top of the operation bar, if the planned end of a planned operation is x hours earlier than the latest end

of the operation (LET). Coloring depends on the configured hours.

1.3  Tabular Pool of groups

Go to tab Planning details in the toolbar and click the icon Pool of groups.

The  tabular  pool  of  groups  shows  the  operations  planned  for  a  group.  It  shows  the  operations  of  all

groups of the graphic order sequencing. The planner can individually define the sorting of the table.

Using  the  table's  filter  function,  you  can  restrict  the  pool  of  groups  to  single  groups.  Refer  to  the

documents on the general operation (moc_cc.pdf) for detailed information on the use of the filter function.

1.4  Tabular Pool of workplaces

The  tabular  pool  of  workplaces  shows  all  planned  operations  of  a  workplace  in  a  tabular  list.  The  list

shows operations sorted by  their planned start date.  However, running operations are always displayed

on top of the list, chronologically sorted by logon time. You cannot change the sorting via the table sorting

function.

Change to the pool  of workplaces of another workplace by single clicking the required  workplace in the

Gantt workplace table.

The fields that are available in the tabular pool of workplaces are the same as the ones in the tabular pool

of groups.

Single clicking an operation in the tabular pool of workplaces

If  you  use  the  mouse  and  single  click  on  an  operation  with  the  left  button,  the  system searches  for  the

relevant operation in the other currently active views/dialogs and selects it.

Double clicking an operation in the tabular pool of workplaces

If you double-click (left) an operation, the Order overview is called. When you call the order overview, the

current order/operation is transferred. In the order overview, the system  automatically displays the order

in the upper detail application and the order's operations in the lower detail application (order progress).

1.5  Notes

You can enter notes on an operation. You can view the notes already entered for an operation using the

detail application Notes, which can be activated from the Toolbar.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 29 of 31

Graphic order sequencing

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

Disable the checkbox  Display on terminal  if  you do not  want the note to  be displayed on the shop floor

terminal AIP.

Edit a note

You can edit an existing note using the respective button in the toolbar.

Delete a note

You can delete an existing note using the respective button in the toolbar.

Visualization with the operation bar

If at least one note is assigned to an operation, a symbol

 is displayed with the operation bar in the

graphic order sequencing (Gantt). If the detail application  Notes is visible and you click one or more OP

bars, the contents of the detail application Notes are updated.

1.6  Planning functions

1.6.1 Manual scheduling using drag & drop

Usually,  the  operations  are  planned  for  a  (capacity)  group  in  the  ERP  system.  Once  the  individual

capacities (workplaces) are loaded into the planning board, you use drag & drop to schedule operations

from  the  tabular  or  graphic  pool  of  groups  for  the  workplace.  Left-click  an  operation  and  drag  it  to  the

required location in the graphic planning board.

1.6.2 Replan an operation for another group

It is generally possible to re-plan an operation for another capacity group or a workplace of another group

in the graphic planning board. But this is not a planning function in the sense of the above definition. Note

the following:

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 30 of 31

Graphic order sequencing

  Process times are not recalculated during replanning.

  Assigned resources (components, production resources and tools) remain assigned.

  The application does not check if replanning makes sense (e.g. you replan a drilling operation for a

"milling" group).

1.6.3 Deallocate operation

If you deallocate an operation, the operation is returned to the pool of groups. Depending on the setting of

the option "Show OPs in the pool of groups of the Gantt", proceed as follows:

Option "Show OPs in the pool of groups of the Gantt" is set

To deallocate an operation, use drag & drop to select the required operation in the planning board and

move it back into the graphic pool of groups in the planning board.

The  operation  is  displayed  at  the  scheduled  start  time  in  the  pool  of  groups  of  the  planning  board  (not

necessarily the same place where you "dropped" the operation).

Option "Show OPs in the pool of groups of the Gantt" is not set

To deallocate (unplan) an operation, select the required operation in the planning board and move (drag

and drop) it into the graphic pool of groups in the planning board (not into the tabular pool of groups).

When you save planning, the system sets the option "planned" to "group" for deallocated

operations. The workplace the operation was previously planned for is NOT deleted.

MOC_GraphicPlanningGAV.docx

Version: 1.4.22110

Page 31 of 31

