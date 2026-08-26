Manual

Shopfloor Monitor
(Graphic Machinery)
MDE-SFM 8.2

Version 1.0.23049

Last change on: 01.09.2020

Shopfloor Monitor (Graphic Machinery)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-SFM_82.docx

Version: 1.0.23049

Page 2 of 34

Shopfloor Monitor (Graphic Machinery)

Contents

1  Overview Graphic Machinery ....................................................................... 4

2  Graphic Machinery ....................................................................................... 5

3  Graphic Machinery - Layout Editor ............................................................. 15

3.1

Layout editor ..................................................................................................... 16

3.2  Notes on tooltip templates ................................................................................. 26

3.3  Description of the templates for workplaces/machines ...................................... 29

3.4  Description of the templates for KPIs ................................................................ 33

MDE-SFM_82.docx

Version: 1.0.23049

Page 3 of 34

Shopfloor Monitor (Graphic Machinery)

1  Overview Graphic Machinery

Purpose

The  Graphic  Machinery  displays  a  company's  machinery  of  a  specific  level  (production  hall,  supervisor

area,  etc.).  The  Graphic  Machinery  displays  the  master  data  and  also  the  actual  data  that  is  currently

recorded as part of the Machine Data Collection (MDE) and Shop Floor Data Collection (BDE).

Implementation notes

You use the function package if:

  You want to display the available machines of your company and the relevant actual data.

Integration

The  Graphic  Machinery  uses  the  current  MDE  data  (e.g.  machine  status,  current  quantities)  and  the

current BDE data (e.g. operations logged on).  You can also display the current  statuses of terminals or

ZKS accesses (Access Control).

Features

  Graphic display

o  Graphic display of the machinery of a company: of a production hall, of a department, of

a supervisor's area, etc.

  Two-level structure

o  The  two-level  structure  includes  separate  machines  and  their  assignment  to  machine

groups, cost centers and lines.

  Display of the current machine statuses

o  The current machine status is visualized using different colors

  Tooltip

o  The info window (tooltip) provides detailed information

  Quantity progress

o  A bar chart visualizes the actually produced number of pieces and compares this number

to the planned target number of pieces.

  Layout editor

o  Graphic  editor  to  create  layouts  of  halls  where  the  symbols  for  machines,  machine

groups and production lines can be placed according to your requirements.

MDE-SFM_82.docx

Version: 1.0.23049

Page 4 of 34

Shopfloor Monitor (Graphic Machinery)

2  Graphic Machinery

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

Requirements

Set up the relevant objects you want to visualize on the Station Andon Board in the system master data.

Use the Layout editor to create the layouts required.

2.1.1.1

Structure of graphic machinery

You  can  use  the  Graphic  machinery  to  show  different  layouts  of  different  organizational  units.  You  can

generate these layouts according to your requirements.

MDE-SFM_82.docx

Version: 1.0.23049

Page 5 of 34

Shopfloor Monitor (Graphic Machinery)

To navigate through the layouts, use the table  on the right hand side (2). The table contains the layout

names and additional information on the different layouts. Left-click a table row to switch to the relevant

layout which is then displayed in the layout panel (1).

(1)  Layout panel

(2)  List of available layouts

(3)  Detail panel with information on the currently selected layout.

(4)  Zooms in and out displayed layouts

(5)  Starts the full screen mode; use the "Esc" button to cancel this mode.

(6)  Editing functions to create a new layout and edit or delete an existing layout.

(7)  Calls the  the layout editor for graphic editing of the layout.

The  application  updates  the  statuses  of machines,  groups,  terminals,  etc.  at  regular  intervals  (every  30

seconds).

You  can  only  request  the  Help  function  via  F1  if  the  list  of  created  layouts  has  the  focus.  In

other cases, call up the Help function using the

 Help on application button.

Operation

Use the table on the right hand side of the screen (2) to navigate through the graphic machinery. Click a

table row to switch to the requested layout.

MDE-SFM_82.docx

Version: 1.0.23049

Page 6 of 34

Shopfloor Monitor (Graphic Machinery)

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

Internal ID

The  system  assigns  this  number  automatically  every  time  you  add  a  new  layout.  You  cannot

change this number.

File name

The layout configuration is saved in a file on the server. The system automatically assigns the file

name when you add a new layout. You cannot change this file name.

Type

Always "N"

MDE-SFM_82.docx

Version: 1.0.23049

Page 7 of 34

Shopfloor Monitor (Graphic Machinery)

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

Editing

Function authorization: mparkle.edit

You may change the following data in an existing layout

- Layout

- Comment

- Order

- Responsibility area

MDE-SFM_82.docx

Version: 1.0.23049

Page 8 of 34

Shopfloor Monitor (Graphic Machinery)

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

Once you have selected the object, the list of available layouts indicates all layouts containing the

relevant object. The application shows one of these layouts automatically. The searched object is

highlighted with a red frame.

When  you  save  a  layout,  the  application  identifies  the  objects  included  in  the  layout.  You  might

have  to  save  older  layouts  once  more  in  order  for  the  application  to  select  and  highlight  the

included objects.

Selection criteria

Selection  criteria  are  not  available  in  the  graphic  machinery.  When  you  start  the  application,  the

application loads all configured layouts automatically and displays the first layout in the list.

If you specify the layout order and sort the list using the "order" column, the application always

shows a particular layout by default when you call up the function. Please note that the defined

order is not user-related.

MDE-SFM_82.docx

Version: 1.0.23049

Page 9 of 34

Shopfloor Monitor (Graphic Machinery)

2.1.1.2

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

  Command: mpark

  Parameter: fullscreen id=<Internal ID of the layout>

The parameter "fullscreen" opens the defined layout in full screen mode. The details pane of

the graphic machinery shows the internal ID of the layout.

Example: “Layout 1” has the internal ID 87 (see screenshot).

Menu editor

MDE-SFM_82.docx

Version: 1.0.23049

Page 10 of 34

Shopfloor Monitor (Graphic Machinery)

If  you  use  the  "auto  start"  function,  you  can  open  a  defined  layout  in  full  screen  mode  when

starting the MOC.

Auto start: right click and select Add to autostart.

Setting the refresh interval

The refresh interval refers to the time interval between two update runs in the graphic machinery. You can

set the interval via an INI configuration.

The value corresponds to the time interval in milliseconds between two update runs.

The  default  value  of  60000  milliseconds  (60  seconds)  applies,  if  you  enter  a  value  less  than

60000 milliseconds (60 seconds) or if nothing is entered.

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

MDE-SFM_82.docx

Version: 1.0.23049

Page 11 of 34

But to  inform the user, the window title of the full screen indicates the  note  "(Offline)" behind the layout

name.

Shopfloor Monitor (Graphic Machinery)

Automatic layout change

In  the  graphic  machinery,  you  can  change  layouts  automatically  in  the  full-screen  mode.  You  can

configure the display duration and the order of changing the layouts.

Select the layouts and specify the display duration

Hold  the  CTRL  key  down  to  select  several  layouts  at  once  in  the  table.  Then  click  the  button

"configuration" in order to define the display duration.

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

MDE-SFM_82.docx

Version: 1.0.23049

Page 12 of 34

Shopfloor Monitor (Graphic Machinery)

Inspection status = checked

An  operation  including  an  inspection  step  has  been  logged  on  to  the  machine/workplace.

For this inspection step, no inspection point is available.

Inspection status = inspection not possible

The operation logged on to the machine/workplace does not include an operation step or no

operation is logged on to the machine/workplace.

Machines/workplaces of workplace type "F – in-production inspection" are inspection

stations. To this type of machines/workplaces, no operations are logged on. These

machines/workplaces always have a blue "inspection status".

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

MDE-SFM_82.docx

Version: 1.0.23049

Page 13 of 34

The screenshot below illustrates the entries for the object "inspection points".

Shopfloor Monitor (Graphic Machinery)

MDE-SFM_82.docx

Version: 1.0.23049

Page 14 of 34

Shopfloor Monitor (Graphic Machinery)

3  Graphic Machinery - Layout Editor

Overview

Menu

Production facility management  Current information
 Graphic machinery

Human resources management  Access control

 Security control center

Information management  Production overview  Graphic machinery

Transaction code

Mpark

Function authorization  mparkle.layedit

Function key

Layout editor

Purpose

Use the layout editor of the Graphic machinery  to "design" layouts showing user-defined organizational

units (e.g. halls, departments, etc.).

Integration

The layout editor is  integrated  in  the application  Graphic machinery  . Use the button

 to start  the

layout editor.

Requirements

The objects that you want to show in a layout must be available in the system master data. If necessary,

you must create the objects in the master data. And you must have created a layout entry for the Graphic

machinery.

MDE-SFM_82.docx

Version: 1.0.23049

Page 15 of 34

3.1  Layout editor

Shopfloor Monitor (Graphic Machinery)

(1)  Layout panel

(2)  Pool  of  objects:  If  you  click  an  object  type  (e.g.  machine),  the  dialog  shows  the  following  additional

data:

(3)  Templates of the object type

(4)  Available objects (e.g. machines)

(5)  The  upper  panel  shows  the  "tools"  you  can  use  to  edit  a  layout  graphically  (this  is  an  example;

chapter Toolbar describes all available icons).

(6)  Graphic objects: templates, rectangle, circle, lines, text, image, video and/or video stream (mms).

In  the  layout  editor  you  cannot  start  the  help  via  F1.  Start  the  help  by  clicking  the  button

Help on application.

Toolbar

Please note that the layout editor does not provide a quick launch bar and you cannot minimize

the toolbar.

The layout editor does not support functions of the MES Development Suite.

MDE-SFM_82.docx

Version: 1.0.23049

Page 16 of 34

Shopfloor Monitor (Graphic Machinery)

The layout editor does not support the functions

 "print preview" and

 "print all".

Layout category

 Save

Click "save" if you changed the layout.

Note:  No  confirmation  prompt  appears  when  exiting  the  application,  even  though

changes have been made.

Zooms out the layout in the layout editor.

Note:  Changing  the  size  in  the  layout  editor  does  not  affect  the  data  displayed  in  the  graphic

machinery.

Zooms in the layout in the layout editor.

Note:  Changing  the  size  in  the  layout  editor  does  not  affect  the  data  displayed  in  the  graphic

machinery.

Text category

You can use the functions described below to format a static text that you integrated in the layout using

drag and drop via the button

.

Changes always affect the entire text within a text field.

Note:



the buttons do not show current formatting of a text

and



font type, font size and color are also reset if you change the format (e.g. change to italics).

Changes the font of a static text.

Changes the font size of a static text.

Changes the font color of a static text. Changes the entire text included in the text field.

MDE-SFM_82.docx

Version: 1.0.23049

Page 17 of 34

Shopfloor Monitor (Graphic Machinery)

Shows the text in bold letters.

Click the button once more to undo formatting.

Shows the text in italic letters.

Click the button once more to undo formatting.

Underlines the text.

Click the button once more to undo formatting.

Left aligns static text:

Center aligns static text:

Right aligns static text:

Justifies static text:

MDE-SFM_82.docx

Version: 1.0.23049

Page 18 of 34

Shopfloor Monitor (Graphic Machinery)

Alignment category

Use the functions of this category to align graphic objects.

Brings the currently selected item to the foreground

Brings the currently selected item into the background

Moves the currently selected item one level forward.

Moves the currently selected item one level back.

Left aligns the selected items.

Right aligns the selected items.

Top aligns the selected items.

Bottom aligns the selected items.

Draw category

Use the functions described below to format a graphic object that you integrated in the layout using drag

and drop via the buttons

.

Changes always refer to all selected objects.Note:

  The buttons do not show current formatting of a graphic element and



the color is also reset if the format is changed (e.g. changed color gradient direction).

MDE-SFM_82.docx

Version: 1.0.23049

Page 19 of 34

Shopfloor Monitor (Graphic Machinery)

Background color

  Changes the object color for objects without color gradient.

Changes the first color for objects with color gradient.

Changes  the  background  color  for  text  fields;  you  can  change  the  foreground

color by choosing a color in the text category.

2nd background color

  Changes the second color of objects with color gradient.

With  text  fields,  the  background  color  changes;  you  can  change  the  foreground

color by choosing the color in the text category.

Line color/border color

Changes the line color.

   Changes the border color of the object.

Changes the line thickness.

   Specifies the fill effect, i.e. fill or gradient.

With text, the background is specified.

Left-click to select a fill effect before drawing one of the objects -

.

Click  this  icon  if  you  want  to  draw  a  rectangle  (rectangle,  square).  Drag  and  drop  the  item  to  the

layout.

Click this icon if you want to draw a circle or oval. Drag and drop the item to the layout.

Click  this  icon  if  you  want  to  draw  a  vertical  line.  Drag  and  drop  the  line  in  the  defined  thickness

(see above) to the layout.

Once you have dropped the icon in the layout panel, a square is shown. You can change the size

and the shape of the object as long as it is selected.

MDE-SFM_82.docx

Version: 1.0.23049

Page 20 of 34

Note: You cannot draw diagonal lines.

Shopfloor Monitor (Graphic Machinery)

Click this icon if you want to draw a horizontal line. Drag and drop the line in the defined thickness

(see above) to the layout.

Once  you  have  dropped  the  icon  in  the  layout  panel,  a  circle  is  shown.  You  can  change  the  size

and the shape of the object as long as it is selected.

Note: You cannot draw diagonal lines.

Click  this  icon  if  you  want  to  enter  a  (static)  text.  Drag  and  drop  the  text  in  the  defined  font,  font

size, color and/or background color (see above) to the layout.

Once  you have dropped the icon in the layout panel,  the application displays a text field showing

the letters "ABC". You can change this text as long as the object is selected.

Use  this  icon  to  insert  an  image  into  the  layout.  Once  you  have  dropped  the  icon  in  the  layout

panel, a "File Open" dialog appears where you can select and insert the image into the layout.

The following formats are supported: jpg, png, bmp, gif.

Note: The image is transferred to the layout, i.e. to the zip file of the layout. Therefore, the file size

affects the load time of the layout. We recommend using compressed file formats for images. The

file size should range between double-digit and triple-digit kilobytes at most.

Use this icon to integrate videos or video streams. Select the icon, drag it into the layout and then

drop it. A dialog opens where you can enter the path of the video or video stream.

The following formats are supported:

  Video: mp4, wmv

You can enter an absolute or relative path referring to the MOC directory.

  Video stream: mms

The MMS protocol (Microsoft Media Server Protocol) is a protocol developed by Microsoft

that  has  been  designed  to  transfer  multimedia  streams.  The  stream  has  to  start  with

mms://, e.g. mms://192.168.50.10:8080/

MDE-SFM_82.docx

Version: 1.0.23049

Page 21 of 34

Shopfloor Monitor (Graphic Machinery)

Note: The video itself is not integrated in the layout, but the path to the video. Therefore, make sure

that the video is stored in a central location that all MOC clients can access.

Note: If you select an object in a layout, the functions provided are adjusted to the properties of

the selected object. Except for these options:

  Underlined

  Alignment (right, left, center, justify)

Operation

Note that the layout editor does not provide an "undo" function.

Integrating a graphic object, e.g. rectangle, line, text, image, etc. in the layout

In general, you can position a graphic object in the layout panel as follows:

1.

If  you  want  to  add  a  rectangle,  circle  or  text,  choose  the  fill  effect  at  first  by  left  clicking:

. The selected icon is highlighted in color.

2.  Left-click to select an object:

. The selected icon is highlighted in color.

3.  Hold the left mouse button down and drag this object to the layout panel and drop it at the required

position (drag&drop).

4.

If  you  insert  an  image  or  video/video  stream,  a  dialog  opens  to  select  the  image  or  an  input  field

opens where you can enter the path of the video and/or video stream.

5.  As long as the object is selected,

you can change its properties or move the object to another position by drag&drop.

Selecting an object in the layout

To  select  a  single  graphic  object,  click  that  object.  A  "border"  is  shown  around  the  object.  Please  find

below an example for a square:

Before (before clicking):

After (after clicking):

MDE-SFM_82.docx

Version: 1.0.23049

Page 22 of 34

Shopfloor Monitor (Graphic Machinery)

Selecting several objects in the layout

To select multiple objects at a time, hold the left mouse button down and "go" around the required objects

so that an orange-colored, dotted circle occurs. Then release the left mouse button:

Before releasing the left mouse button:

After releasing the left mouse button:

Changes to the format, such as changing the (background) color now affect all selected objects.

Integrating objects, e.g. machine, group, etc.  in the layout

Proceed as described below to display an object, e.g. a machine, group, in the layout:

1.  Make  sure  the  right  detail  panel  shows  the  object  types.  To  do  so,  click  the  text  "pool  of  objects".

Then  all  object  types  are  displayed  (the  number  is  only  displayed  in  the  above  screenshot;  the

number is only for orientation and is not shown in the application):

MDE-SFM_82.docx

Version: 1.0.23049

Page 23 of 34

Shopfloor Monitor (Graphic Machinery)

2.  Now click the object type you want to insert in the layout. Two windows appear below the object type:

Top (3): the templates that are available for this object type

Bottom (4): the objects of this type available in HYDRA

(the  numbers  are  only  displayed  in  the  above  screenshot;  the  numbers  are  only  for  orientation  and

are not shown in the application):

Please  wait  a

few  seconds  until

the  below  window  shows

IDs  and  designations.

The  number  of  columns  and  column  headers  in  the  below  selection  dialog  depends  on  the

object type.

3.  Now select the template you want to show for the object in the layout by left clicking the template. The

selected template is highlighted in color:

4.  Now select the object you want to show in the layout by left clicking the object in the lower selection

dialog. The selected object is highlighted in color:

MDE-SFM_82.docx

Version: 1.0.23049

Page 24 of 34

Shopfloor Monitor (Graphic Machinery)

5.  Hold the left mouse button down and drag this object from the selection window to the layout panel

and drop it at the required position (drag&drop).

6.  Click the object in the layout panel to change its size or to move it to another position by drag & drop.

Inserting links between layouts

Use the context menu to add a link to another layout for objects. To do so, enter the appropriate layout

ID. Proceed as follows:

1.  Right-click the object you want to link. It does not matter if it is an inserted layout or another object.

2.  Select the context menu item: Links

3.  Enter the layout ID you want to add.

4.  Confirm with ok.

Note:  You  can  find  the  layout  ID  for  the  link  in  the  list  of  layouts  in  the  Graphic  machinery  (shop  floor

monitor). If the column indicating the layout ID is not displayed, add the column to the list by choosing the

option "select columns".

Adjusting drawing canvas

Use  the  context  menu  of  the  layout  editor  to  adjust  the  available  drawing  canvas.  In  the  context  menu,

select the option "canvas height" and "canvas width" and enter the required values.

Templates in the Graphic Machinery

The graphic machinery provides ready-made templates for the below-mentioned object types.

  Workplaces/machines

MDE-SFM_82.docx

Version: 1.0.23049

Page 25 of 34

Shopfloor Monitor (Graphic Machinery)

  Groups (capacity groups)

  Lines (workplaces/machines of the "L" type)

  Material buffer

  Resources (no DNC and file resources)

  Terminals

  Access points

  Access groups

  KPIs of energy resources

  Machine-specific energy meters

  Key performance indicators (current, shift-related KPIs for workplaces/machines)

  Operations logged on (up to three operations)

You can change existing templates as part of a customization.

Deployment of layouts

You can pass created layouts from one system to the other. MPDV explains how to pass layouts as part

of a service.

3.2  Notes on tooltip templates

Workplaces/machines

The tooltip shows the following data:

Workplace and machine data:

  Workplace – Unique identification of the workplace/machine according to the Configuration.

  Designation – Name of the workplace according to the Configuration.

  Workplace category – Workplace category according to the Configuration.

  Status – Status text of the status currently set for the workplace

  Status since – Beginning of the current status

  Target cycle – Current target cycle (format: hours:minutes:seconds per 1000 cycles)

  Actual cycle – Current actual cycle (format: hours:minutes:seconds per 1000 cycles)

  Yield (P) – Yield recorded for the workplace in the current shift (primary quantity unit)

  Scrap (P) – Scrap recorded for the workplace in the current shift (primary quantity unit)

Operation  related  data  for  the  currently  logged  on  operation.  If  several  operations  are  logged  on  to  the

workplace at the same time, the data of the operation last logged on is displayed.

  MES order number

  OP designation

MDE-SFM_82.docx

Version: 1.0.23049

Page 26 of 34

Shopfloor Monitor (Graphic Machinery)

  Article – Article defined in the operation

  Article designation – Article designation defined in the order

  Tool – Tool defined for the operation

  Yield (P) – Yield posted for the operation (primary quantity unit)

  Scrap (P) – Scrap posted for the operation (primary quantity unit)

  Open quantity (P) – Open quantity posted for the operation (primary quantity unit)

  Rework (P) – Rework quantity posted for the operation (primary quantity unit)

Groups

The tooltip shows the following data:

  Group – Identifies the group according to the Configuration

  Designation – Name of the group according to the Configuration

  Cost center – Cost center of the group according to the Configuration

Line group

The tooltip shows the following data for line workplaces (type L):

  Workplace – Unique identification of the workplace/machine according to the Configuration.

  Designation – Name of the workplace according to the Configuration.

  Workplace category – Workplace category according to the Configuration.

Terminal

Terminal templates do not provide any tooltips.

Material buffer

The tooltip shows the following data:

  Material buffer – Identifies the material buffer according to the Configuration

  Material – Material number according to the Configuration

Resource

The templates for resources show the resource status.

  Resource – Identifies the resource according to the Configuration

  Resource type – Resource type of the resource according to the Configuration

  Designation – Name of the resource according to the Configuration

  Current storage location – Current storage location of the resource

  Resource status – Number of the current resource status

MDE-SFM_82.docx

Version: 1.0.23049

Page 27 of 34

  Resource status – Name of the current resource status according to the Configuration

Shopfloor Monitor (Graphic Machinery)

Access points

The tooltip shows the following data:

  Access point – Number of the access point according to the Configuration

  Designation – Name of the access point according to the Configuration

Access groups

The tooltip shows the following data:

  Access group – Number of the access group according to the Configuration

  Designation – Name of the access group according to the Configuration

  Location – Location of the access group according to the Configuration

  Number status OK – Number of access points with status OK

  Number status error – Number of access points with status "error"

  Number status not active – Number of access points with status "not active"

  Status color access group – for internal use

KPIs of energy resources

The templates for KPIs of energy resources do not provide any tooltips.

Machine-specific energy meters

The templates for machine-specific energy meters do not provide any tooltips.

Key performance indicators (current, shift-related KPIs for

workplaces/machines)

You can choose from the following key performance indicators:

KPI

Formula ID used for changes in the formula management
and for the configuration of limit values (optional)

Rate
utilization

of

capacity

rcu

Assignment  utilization
rate

ocu

Techn. efficiency

Rate

Scrap rate

OEE

tec_ef

yie_ra

scr_ra

oee

MDE-SFM_82.docx

Version: 1.0.23049

Page 28 of 34

Shopfloor Monitor (Graphic Machinery)

KPI

Availability

Performance

Quality

Formula ID used for changes in the formula management
and for the configuration of limit values (optional)

avail

pf_rat

qual

Machine run time

mch_rt

Actual utilization

Yield utilization

act_ut

yie_ut

Refer to the following document MDE_KPI_Configuration.pdf for further information on the configuration.

The templates for KPIs do not provide any tooltips. Create a static text and enter the workplace.

This way, later on you will know the workplace this KPI refers to.

Operations logged on

The template shows up to three logged on operations including the following information on the operation:

  Article number

  Target quantity (P)

  Yield (P)

  Scrap (P)

  Scrap ratio in %

The system calculates the relation of scrap (P) to the total yield quantity (P) and scrap quantity (P).

The result includes two decimal places. The application indicates "undef." if the scrap rate cannot be

calculated.

The values are displayed left aligned. The point in time of the operation logon specifies the order in which

the application shows the data of the logged on operations. The operation logged on last is displayed first.

The template does not provide tooltips. Create a static text where you can enter the workplace.

Therefore, you can identify later to which workplace this information refers.

3.3  Description of the templates for workplaces/machines



Available as of service pack 13/2018:

In the Status assignment, you can specify  a time for each machine status in field "Warning in

MDE-SFM_82.docx

Version: 1.0.23049

Page 29 of 34

Shopfloor Monitor (Graphic Machinery)

the  Graphic  Machinery".  If  a machine  status  lasts  longer  than  the  specified  time,  the  machine

status symbol starts to flash. If the template supports the flashing status symbol, the machine

status is marked with .

Template name

Screenshot

Description and content of the

Machines_Cycles

Machines_Description

Machines_OperationArticle

Machines_QuantityLevel

template

Display of target and actual cycle for

the workplace/machine. For the display,

the format is used that is defined for the

display in the MOC.

Display of the workplace/machine

number and of the name.

Display of OP name and of article of the

logged on operation. If several

operations are logged on, the operation

logged on last is displayed.

Graphic comparison of the target

quantity and the yield produced up to

now (in primary quantity unit) of the

currently logged on operation.

If several operations are logged on, the

information of the operation logged on

last is displayed.

Machines_Template1

Display of the following information:

-  Machine name

-  Machine number

-  Graphic display of machine

status 

-  Current target cycle and actual

cycle of the machine in the

format that has been defined

for the display in the MOC.

-  Operation designation

-  Article name of the operation

MDE-SFM_82.docx

Version: 1.0.23049

Page 30 of 34

Template name

Screenshot

Description and content of the

Shopfloor Monitor (Graphic Machinery)

template

You can use the free space to add an

image of the respective machine.

Machines_Template2

Display of the following information:

-  Machine number

-  Machine name

-  Graphic and text display of

machine status 

-  Primary target quantity, yield

and scrap of the operation

logged on.

-  Current target cycle and actual

cycle of the machine in the

format that has been defined

for the display in the MOC.

-  Operation designation

-  Article name of the operation

-  Graphic comparison of the

target quantity and the yield

produced up to now (primary

quantity unit) of the currently

logged on operation.

Machines_Template3

Display of the following information:

-  Machine number

-  Machine name

-  Graphic and text display of

machine status 

Machines_Template4

Display of the following information:

-  Machine name

-  Operation and article name of

the logged on operation

-  Color display of machine status

as background color 

MDE-SFM_82.docx

Version: 1.0.23049

Page 31 of 34

Template name

Screenshot

Description and content of the

Shopfloor Monitor (Graphic Machinery)

template

-  Graphic comparison of the

target quantity and the yield

produced up to now (primary

quantity unit) of the currently

logged on operation.

Machines_Template5

Display of the following information:

-  Machine name

-  Machine number

-  Operation and article name of

the logged on operation

-  Current target and actual cycle

of the machine using the unit

that has been defined for the

display in the MOC.

-  Graphic comparison of the

target quantity and the yield

produced up to now (primary

quantity unit) of the currently

logged on operation.

Machines_Template6

Display of the following information:

Machines_TrafficLight

-  Machine number

-  Machine name

-  Color display of machine status

as background color 

Traffic light display including the

following information :

-  Color red: Status "Not assigned"

-  Color yellow: All statuses except

"Production"

-  Color green: Status "Production"

MDE-SFM_82.docx

Version: 1.0.23049

Page 32 of 34

Template name

Screenshot

Description and content of the

Shopfloor Monitor (Graphic Machinery)

Machines_StatusCircle

Machines_MaintenanceStatus1

Available  as  of  service  pack

13/2018

template

Color display of machine status 

using the colors defined with the status

text.

If the activity/maintenance calendar

includes at least one maintenance that

is due, this maintenance due is

displayed using a symbol.

If there is at least one "red"

maintenance due, the background color

is red.

If there is at least one "yellow"

maintenance due, the background color

is yellow.

If there is at least one "blue"

maintenance due, the background color

is blue.

If no maintenance is due, no symbol

and no background color is displayed.

Machines_MaintenanceStatus2

See Machines_MaintenanceStatus1

Available  as  of  service  pack

13/2018

3.4  Description of the templates for KPIs

Template name

Screenshot

Description and content of the

template

keyfigure_template_label

Display of the following information:

-  KPI name

MDE-SFM_82.docx

Version: 1.0.23049

Page 33 of 34

Template name

Screenshot

Description and content of the

Shopfloor Monitor (Graphic Machinery)

template

-

-

current shift-related KPIs

color display of the KPI as

background color

keyfigure_template_label_border

Display of the following information:

-  KPI name

-

-

current shift-related KPIs

color display of the KPI as

bar

keyfigure_template_simple

Display of the following information:

-

-

current shift-related KPIs

color display of the KPI as

background color

MDE-SFM_82.docx

Version: 1.0.23049

Page 34 of 34

