Graphic Machinery

1  Graphic Machinery

Overview

Menu

Production facility management  Current information
 Graphic machinery

Information management  Production overview  Graphic machinery

HR management  Access control  Security control center

Transaction code

mpark

Function authorization  mpark

Purpose

The graphic machinery provides a clear presentation of important workplace and production information

and the relevant contexts in space and time. The user can create and display different presentations (so-

called layouts) of all organizational units (e.g. halls, departments).

You  can  use  the  Graphic  machinery  as  a  quick  overview  tool  for  the  production  manager.  But  the

application  can  also  be  used  in  the  shop  floor  to  provide  a  current  overview  of  production  statuses  on

large screens.

Integration

In the graphic machinery, you can visualize up-to-date status information of objects from various HYDRA

products:

  BDE/MDE: Machines, groups, line groups, key performance indicators (KPI), logged in operations

  MW: Terminals

  WRM/EMG: Resources (no file-based resources, no DNC resources)

  MPL: Material buffers

  ZKS: Accesses, access groups

You can only add and show KPIs if you enable the extensions mpark2kpi.

You  can  only  add  and  show  the  operations  logged  on  if  you  enable  the  extensions

mpark2roptemp.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 1 of 10

Requirements

Set up the relevant objects you want to visualize on the Station Andon Board in the system master data.

Graphic Machinery

Use the Layout editor to create the layouts required.

Structure of graphic machinery

You  can  use  the  Graphic  machinery  to  show  different  layouts  of  different  organizational  units.  You  can

generate these layouts according to your requirements.

To navigate through the layouts, use the table  on the right hand side (2). The table contains the layout

names and additional information on the different layouts.  Left-click a table row to switch to the relevant

layout which is then displayed in the layout panel (1).

(1)  Layout panel

(2)  List of available layouts

(3)  Detail panel with information on the currently selected layout.

(4)  Zooms in and out displayed layouts

(5)  Starts the full screen mode; use the "Esc" button to cancel this mode.

(6)  Editing functions to create a new layout and edit or delete an existing layout.

(7)  Calls the  the layout editor for graphic editing of the layout.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 2 of 10

Graphic Machinery

The  application  updates  the  statuses  of machines,  groups,  terminals,  etc.  at  regular  intervals  (every  30

seconds).

You  can  only  request  the  Help  function  via  F1  if  the  list  of  created  layouts  has  the  focus.  In

other cases, call up the Help function using the

 Help on application button.

Operation

Use the table on the right hand side of the screen (2) to navigate through the graphic machinery. Click a

table row to switch to the requested layout.

Click  the  Save  settings  button  to  save  the  width  of  the  table  on  the  right  hand  side  user-

specifically. You cannot hide the table completely. Tip: You can "fold away" the table to the side

using  the  respective  button.  You  can  find  additional  information  on  general  operation  in  the

documentation "Operation of the MES Operation Center".

If  you  right-click  an  icon  in  the  layout  panel  (1),  a  context  menu  opens  where  you  can  switch  to  other

applications, provided that you have the required authorization.

When  you  mouse  over  a  template  in  a  specific  layout,  a  tooltip  specific  to  each  object  opens  showing

additional information. You cannot configure the display time.

Details  on

the

information  displayed

in  a

tooltip  are  described

in

the  document

MOC_GraphicMachinery2Edit.pdf, section Notes on templates.

Field descriptions

The following field descriptions refer to the table "Layout" and the detail view "Layout":

Layout

Layout name, e.g. "Hall 1"

Comment

Comment that describes the layout in more detail.

Sequence

If  you  specify  a  sequence/order  and  sort  the  table  by  the  "order"  column,  the  application  always

shows  a  particular  layout  by  default  when  you  call  up  the  function.  Please  note  that  the  defined

order is not user-related.

Responsibility area

You  can  optionally  assign  a  responsibility  area  to  a  layout.  In  this  case,  only  users  who  are

authorized for the entered responsibility area can use this layout.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 3 of 10

Graphic Machinery

Internal ID

The  system  assigns  this  number  automatically  every  time  you  add  a  new  layout.  You  cannot

change this number.

File name

The layout configuration is saved in a file on the server. The system automatically assigns the file

name when you add a new layout. You cannot change this file name.

Type

Always "N"

Modified by / Modified on

This information refers to the last time a layout entry of the table was edited, and not to the last time

the graphic layout was edited.

Toolbar

 Insert

Function authorization: mparkle.create

Add a new entry to create a new layout. Please provide the following information:  -

- Layout: Layout name

- Comment: Description

- Order: you can sort the list by this column

- Responsibility area (optional)

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 4 of 10

Graphic Machinery

Editing

Function authorization: mparkle.edit

You may change the following data in an existing layout

- Layout

- Comment

- Order

- Responsibility area

 Delete

Function authorization: mparkle.delete

The system deletes the layout entry from the database, once you have confirmed the deletion.

Please note: The file that saves the actual layout information on the server is not deleted.

   Layout editor

Function authorization: mparkle.layedit

Calls up the Layout editor for the entry currently selected in the list.

  Full screen

Zooms in the active layout to the full screen size. Press "Esc" to exit the full screen view.

  Zoom out

Zooms out the current layout in the application.

   Zoom in

Zooms in the current layout in the application.

Search

Use these two drop-down list boxes to search for specific objects in layouts. Select the object type

(workplaces/machines,  groups,  line  groups,  material  buffers,  resources,  terminals,  accesses  and

access groups) in the upper field. Select the number of the searched object in the lower field.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 5 of 10

Graphic Machinery

Once you have selected the object, the list of available layouts indicates all layouts containing the

relevant object. The application shows one of these layouts automatically. The searched object is

highlighted with a red frame.

When  you  save  a  layout,  the  application  identifies  the  objects  included  in  the  layout.  You  might

have  to  save  older  layouts  once  more  in  order  for  the  application  to  select  and  highlight  the

included objects.

You  can  only  use

the

function  "searching

for  objects"

if  you  enable

the  upgrade

GraphicMachinery2Search.

  The  graphic  machinery  does  not  support  the  functions

  "Print  preview"  and

  "Print

all".

Selection criteria

Selection  criteria  are  not  available  in  the  graphic  machinery.  When  you  start  the  application,  the

application loads all configured layouts automatically and displays the first layout in the list.

If you specify the layout order and sort the list using the "order" column, the application always

shows a particular layout by default when you call up the function. Please note that the defined

order is not user-related.

Additional features of the graphic machinery

Opening full screen layouts

Use the menu editor to create an entry opening a defined layout in normal view or full-screen mode in the

menu of a specific MOC client (menu depending on the user --> USER scope).

You can only use this function if the menu editor and the corresponding function authorization

mparklink are available.

Proceed as follows if the menu editor is used:

1.  Open the menu editor:

Menu --> Extras --> Menu editor

2.  Drag  the  graphic  machinery  to  the  required  menu  and  change  the  values  (enable  advanced

settings).

  Caption: select individually, e.g. Mpark layout 1



ID: GraphicMachinery2

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 6 of 10

Graphic Machinery

  Command: mpark

  Parameter: fullscreen id=<Internal ID of the layout>

The parameter "fullscreen" opens the defined layout in full screen mode. The details pane of

the graphic machinery shows the internal ID of the layout.

Example: “Layout 1” has the internal ID 87 (see screenshot).

Menu editor

If  you  use  the  "auto  start"  function,  you  can  open  a  defined  layout  in  full  screen  mode  when

starting the MOC.

Auto start: right click and select Add to autostart.

Setting the refresh interval

The refresh interval refers to the time interval between two update runs in the graphic machinery. You can

set the interval via an INI configuration.

The value corresponds to the time interval in milliseconds between two update runs.

The  default  value  of  60000  milliseconds  (60  seconds)  applies,  if  you  enter  a  value  less  than

60000 milliseconds (60 seconds) or if nothing is entered.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 7 of 10

Graphic Machinery

Configuration:

INI configuration name:

MPARK

Section:

Key:

Value:

MPARK2

REFRESHRATE

240000 (corresponds to 4 min)

Disabling offline messages

If the graphic machinery cannot establish a connection to the server (offline), the application displays an

error message every time you request data.

You  might  not  want  this  behavior,  especially  if  you  use  the  full  screen  mode.  Configure  the  INI

configuration as follows to prevent the error message from being displayed:

Configuration:

INI configuration name:

MPARK

Section:

Key:

Value:

MPARK2

SUPPRESSCONNECTIONERRORMESSAGE

y

Default value: n

If  you  start  the  graphic  machinery  the  next  time  and  you  cannot  request  data  (as  a  connection  to  the

server cannot be established), the system only records entries in the MOC Log window.

But to  inform the user, the window title of the full screen indicates the  note  "(Offline)" behind the layout

name.

Automatic layout change

You can only activate the automatic layout change if you enable the extensions mpark2layrot.

In  the  graphic  machinery,  you  can  change  layouts  automatically  in  the  full-screen  mode.  You  can

configure the display duration and the order of changing the layouts.

Select the layouts and specify the display duration

Hold  the  CTRL  key  down  to  select  several  layouts  at  once  in  the  table.  Then  click  the  button

"configuration" in order to define the display duration.

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 8 of 10

Graphic Machinery

A dialog opens where you can configure the display duration in seconds for a layout. The least interval for

the automatic change is 30 seconds.

Once  you  have  confirmed  the  dialog,  the  application  stores  the  layouts  and  the  display  duration  in  a

configuration file (LayoutRotation.config) in the MOC user directory.

Starting and stopping the layout change

Click the  button  Start to start changing  the layouts.  After reading the stored settings,  the system opens

the full screen. Then the application changes layouts in full screen mode at the specified interval.

The time it takes to display the next layout depends on the number of objects displayed in the

layout.

Click the button Stop or close full screen mode to stop changing the layouts automatically.

Objects "Inspection" and "Inspection points"

If  the  in-production  inspection  is  activated  and  data  is  collected  for  inspection  points,  the  current

inspection  status  can  also  be  integrated.  To  show  the  inspection  status,  select  the  object  "inspection"

(caliper symbol). The background color illustrates the different inspection statuses.

Inspection status = due

An operation including an inspection step has been logged on to the machine/workplace.

At least one inspection point is available for this inspection step.

Inspection status = checked

An  operation  including  an  inspection  step  has  been  logged  on  to  the  machine/workplace.

For this inspection step, no inspection point is available.

Inspection status = inspection not possible

The operation logged on to the machine/workplace does not include an operation step or no

operation is logged on to the machine/workplace.

Machines/workplaces of workplace type "F – in-production inspection" are inspection

stations. To this type of machines/workplaces, no operations are logged on. These

machines/workplaces always have a blue "inspection status".

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 9 of 10

Graphic Machinery

Inspection status = error

If  the  system  cannot  identify  any  inspection  step  for  a  logged  on  operation  because  of  an

error, then the inspection status is displayed in red.

You  can  not  only  show  the  inspection  status,  but  you  can  also  show  the  number  of  open  or  closed

inspection points for the logged on operation.  Select  the  object  "inspection  points" to this end. With the

number  of  closed  inspection  points,  the  system  also  displays  the  number  of  pass  and  fail  inspection

points.  Condition:  with  the  operation,  an  inspection  step  must  have  been  logged  on  to  the

machine/workplace.  The  classification  of  an  inspection  point  as  pass  or  fail  is  based  on  the  inspection

point decision.

You  define  the  inspection  point  decisions  in  the  application  Catalog  of  the  quality  management  master

data  using  the  catalog  type  Usage  decision  for  inspection  points.  The  screenshot  below  illustrates  the

possible evaluations of an inspection point.

The screenshot below illustrates the entries for the object "inspection points".

MOC_GraphicMachinery2.docx

Version: 1.10.18225

Page 10 of 10

