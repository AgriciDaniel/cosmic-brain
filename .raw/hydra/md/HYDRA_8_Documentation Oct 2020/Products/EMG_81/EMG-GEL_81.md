Manual

Graphic Energy Counter
Equipment (MOC)
EMG-GEL 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Graphic Energy Counter Equipment (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-GEL_81.docx

Version: 1.0.23049

Page 2 of 16

Graphic Energy Counter Equipment (MOC)

Contents

1  Overview Graphic Energy Counter Equipment ............................................ 4

2  Graphic Machinery ....................................................................................... 5

3  View mode ................................................................................................... 6

4  Edit mode ..................................................................................................... 9

5  Shortcuts .................................................................................................... 16

EMG-GEL_81.docx

Version: 1.0.23049

Page 3 of 16

Graphic Energy Counter Equipment (MOC)

1

 Overview Graphic Energy Counter Equipment

Purpose

The  graphic  energy  counter  equipment  based  on  the  graphic  machinery  visualizes  the  company's

machinery  on  a  particular  level  (workshop,  foreman's  area,  …).  Energy  counter  resources  can  also  be

entered  in  this machinery.  Not  only  does this function visualize master data, but it also presents  in real

time actual data recorded at the time energy data are recorded.

Implementation considerations

You use the function package if:

  You would like to have a graphical presentation of your company's available energy counter that

is supplemented by current actual data.

Integration

Current  EMG  data  (e.g.  counter  status,  actual  consumption  quantities)  is  used  in  the  presentation.  The

energy data monitor (EMG-GEM) provides the appropriate overview in tabular form.

Features

  Graphical presentation

o  Graphical  presentation  of  the  company's  machinery  with  energy  counters  in  the  hall,

department, foreman's area or the like.

  Display of current counter state

o  Display of the current state of the counter resources using different colors

  Tooltip

o  Detailed information in the info-window (Tooltip)

  Graphic editor

o  Graphic  editor  for  creating  hall  layouts  with  individual  placement  of  the  energy  counter

symbols, machine symbols, machine groups and production lines.

EMG-GEL_81.docx

Version: 1.0.23049

Page 4 of 16

Graphic Energy Counter Equipment (MOC)

2  Graphic Machinery

Summary

Menu

Production  facilities  management    Current  information      Graphic
machinery

Information management  Production overview  Graphic machinery

Transaction code

mpark

Function authorization  mpark

Usage

Graphic  machinery  provides  a  very  striking  presentation  of  essential  workplace  and  production

information  shown  in  terms  of  time  and  space.  It  allows  various  presentations  (layouts)  of  a  random

selection of organizational units, which the user can create as required.

On the  one hand,  graphic  machinery can serve as  an indicator for the  production manager, and  on the

other hand, it can be shown on large screens in the production department as a continuous overview of

production status.

The user interface

The graphic machinery user interface differs depending on the mode the user is in. Here, we differentiate

between the following modes:

  View  mode    this  is  where  current  data  are  displayed,  where  already  existing  layouts  can  be

selected or new ones can be created.

  Edit  mode    this  is  where,  among  other  things,  objects  that  have  defined  templates  can  be

assigned to a layout so that it can be displayed in view mode.

EMG-GEL_81.docx

Version: 1.0.23049

Page 5 of 16

Graphic Energy Counter Equipment (MOC)

3  View mode

In  view  mode,  among  other  things,  the  layouts  that  were  created  are  displayed  with  their  individual

elements and current data. In addition, display options can be selected and new layouts created.

Sections

We differentiate among the following sections of the user interface:

1

2

3

Active, open layout window
The selected layouts and their component objects are displayed in this section.

Overview panel
The overview panel provides an overview of the current open layout and shows the user which part

of the layout is currently displayed in the layout window.

Table of available layouts
To be able to navigate between these layouts, there is a table on the right side of the screen that

contains the names of the separate layouts and information about them. Using this table, the user

can switch to the different layouts.

By double-clicking the left mouse button on a line of the table, the display switches to that particular

layout.  The  name  of  the  active  layout  is  shown  in  the  field  at  the  upper  edge  of  the  window  that

opens.

EMG-GEL_81.docx

Version: 1.0.23049

Page 6 of 16

Graphic Energy Counter Equipment (MOC)

4

5

Viewer toolbar
You can select display options from the viewer toolbar and switch to edit mode.

Explorer toolbar
Layouts are created and maintained in the explorer toolbar.

6  Menu bar

Explorer and viewer toolbar functions, among other things, can be accessed from the menu bar.

Viewer toolbar

Combo box "zoom factor"

Predefined zoom factors can be selected, or user-defined zoom factors entered here.

The "Select" button

By  clicking  on  this  button,  the  mouse  is  set  to  "select"  mode.  In  this  mode  detail  views  can  be

opened with a double-click. By right-clicking on a HYDRA object, the context menu opens.

The "Zoom rectangle" button

By clicking on this button, the mouse is set to "zoom rectangle" mode. In this mode, you can draw a

rectangle around the layout, to which the layout is then sized.

The "Full screen view" button

Here,  the  active  layout  is  zoomed  in  to  full-screen  size.  You  exit  full-screen  view  by  clicking  the

mouse or pressing space bar, return or escape.

The "Update all layouts" button

This button updates all currently opened layouts.

The "Start update" button

This starts the automatic update. Current  values are  now transferred to the  layouts from the data

server and they are updated accordingly.

The "Stop update" button

This stops the automatic update.

The "Switch to editor mode" button

Clicking on this button switches machinery to editor mode.

Combo box "Layout arrangement"

Using this combo box, you can determine how the currently open layouts should be arranged.

EMG-GEL_81.docx

Version: 1.0.23049

Page 7 of 16

Explorer toolbar

Graphic Energy Counter Equipment (MOC)

The "Load layout" button

This button opens the layout window for the layout entry selected in the table.

The "Search for layout" button

Clicking on this button opens the "search" dialog.

Here,  you  can  define  the  object  type  (machine,  line,  terminal,  ...)  and  attribute  (number,

designation, ...) you would like to search for, and then type the search value in the text field. After

clicking  on  the  search  button,  the  dialog  closes  and  the  layouts  containing  the  search  object  are

displayed  and  shown  highlighted  in  the  explorer  table.  If  a  highlighted  layout  is  open,  the  objects

found in it are marked with handles.

The "Delete search" button

Clicking  on  this  button  removes  the  highlighting  for  the  layouts  found  in  the  explorer  table.  The

search criteria are removed from the session.

The "New layout" button

Clicking this button opens a new layout window. The respective entry is incorporated into the table.

The "Rename layout" button

After clicking on this button, the "Rename layout" dialog appears.

Here, you can edit the layout name as well as the associated comment.

The "Save layout" button

Clicking on this button saves the layout selected in the table to the server.

The "Delete layout" button

Clicking on this button removes the selected layout from the table and closes the associated layout

window.

The "Import layout" button

This function is currently not available (future use).

The "Export layout" button

This function is currently not available (future use).

EMG-GEL_81.docx

Version: 1.0.23049

Page 8 of 16

Graphic Energy Counter Equipment (MOC)

4  Edit mode

You  can  integrate  individual  objects  using  a  presentation  template  and  other  configurations  into  each

layout, and you can also add standard geometries to them in edit mode. This is available in view mode by

clicking on the "Switch to edit mode" button.

By  integrating  a  defined  object,  e.g.  a  machine,  using  a  presentation  template,  it  is  displayed  in  view

mode with the information currently defined in the presentation template like the status, for example.

Sections

The user interface is divided into the following sections:

4

3

EMG-GEL_81.docx

Version: 1.0.23049

Page 9 of 16

Graphic Energy Counter Equipment (MOC)

Select object type

The  following  object  types  are  currently  available  for  selection  (the  relevant  HYDRA  products  are

entered in parentheses):

  Machine (BDE/MDE)

  Machine group (BDE/MDE)

  Terminal (MW)

  Material buffer (MPL)

  Lines (MDE)

  Accesses (ZKS)

  Access groups (ZKS)

  Resources (WRM/EMG; resources that are no DNC resources and not configured as "file-

based")

Preview of the presentation template
In this section you can see a preview of the presentation template available for an object.

Available objects
The objects available to an object type in the system(s) connected respectively are listed in a table

in the available objects section.

Toolbar with standard geometries
The standard geometries available here can also be integrated into layouts.

Toolbar with graphic styles
Standard geometries can be configured from the toolbar with graphic styles.

Editor toolbar
Among other things, the editor tool bar can be used to configure the display and to switch to view

2

3

4

5

6

mode.

7  Menu bar

The menu bar can be used, among other things, to call up editor toolbar functions and to switch to

view mode.

Editor toolbar

The "Undo" button

By clicking on this button the last action performed is undone.

EMG-GEL_81.docx

Version: 1.0.23049

Page 10 of 16

Graphic Energy Counter Equipment (MOC)

The "Redo" button

By clicking on this button the last action undone is restored.

The "Cut" button

By  clicking  on  this  button,  the  elements  selected  are  copied  to  the  clipboard. When  the  elements

are pasted, the original elements are removed.

The "Copy" button

When you click on this button, the elements selected are copied to the clipboard.

The "Paste" button

When you click on this button, the elements on the clipboard are copied into the layout.

The "Delete" button

Clicking on this button deletes the selected elements.

The "Grid on/off" button

The drawing grid can be activated/ deactivated by clicking on this button.

The "View mode" button

Clicking on this button switches machinery to view mode.

The "Create group" button

Clicking on this button compiles the selected elements into a group.

The "Cancel group" button

If a group is selected in the layout, it can be canceled by clicking on this button.

Graphic styles toolbar

Combo box "Line thickness"

The line thickness of the selected element can be defined here.

Combo box "Line type"

The line thickness of the selected element can be defined here.

Combo box "Fill type"

The fill type can be defined here. Normal color, pattern and color gradient are the choices.

Combo box "Fill pattern"

If "Pattern" is selected as fill type, a pattern may be selected here.

Combo box "Color gradient"

If "Color gradient" is selected as fill type, the type of gradient may be defined here.

EMG-GEL_81.docx

Version: 1.0.23049

Page 11 of 16

Graphic Energy Counter Equipment (MOC)

Combo box "Line color"

The line color of the selected elements can be defined here.

Combo box "Fill color 1"

This combo box is used if "normal color" was selected as fill type. The fill color is selected here.

Combo box "Fill color 2"

If "Color gradient" is selected as fill type, the second color may be selected here.

Standard geometry toolbar

The "Select" button

Sets the mouse mode to "Select". Elements can be selected, moved and scaled.

The "Select in group" button

If there is a group in the layout, an element within a group can be selected using this mouse mode.

The "Rotate" button

The mouse mode "Rotate" is set here. A green dot appears on the selected element that represents

its center of rotation. The center of rotation can be moved. The element can be moved around the

center of rotation by holding down the left mouse button.

EMG-GEL_81.docx

Version: 1.0.23049

Page 12 of 16

Graphic Energy Counter Equipment (MOC)

The "Points" button

Used to set points in the layout.

The "Line" button

Used to draw lines in the layout.

The "Rectangle" button

Used to draw a rectangle.

The "Circle" button

Used to draw a circle.

The "Ellipse" button

Used to draw an ellipse.

The "Polyline" button

Used to draw a polyline.

The "Polygon" button

Used to draw a polygon.

The "Open spline" button

Used to draw an open spline.

The "Closed spline" button

Used to draw a closed spline.

The "Arc" button

Used to draw an arc.

The "Circle segment" button

Used to draw a segment of a circle.

The "Sector" button

Used to draw a sector of a circle.

The "Insert text" button

Fixed texts can be placed in the layout using this button.

"Insert BMP graphic" button

Existing images can be inserted into the layout using this button.

EMG-GEL_81.docx

Version: 1.0.23049

Page 13 of 16

Graphic Energy Counter Equipment (MOC)

Properties dialogs in the editor

The properties dialog of a graphic element is opened in the editor by "right click-->properties“ or double-

click.  If  this  is  a  standard  geometry,  the  geometric  properties  of  the  element  can  be  modified  using  the

first tab. The "Line style" and "Fill style" tabs contain options that allow you to manipulate the graphic style

of the element.

The  properties  of  the  object  are  displayed  in  the  properties  dialog  of  a  HYDRA  object.  In  addition,  the

templates are assigned here.

The presentation template is the template with which the HYDRA object is displayed.

You open the detail view template in the viewer by double-clicking on the object.

The context menu template determines the appearance and behavior of this object's context menu.

The tool tip template is used as tool tip for this object.

Edit layout

Integrate an object

After selecting an object type, e.g. machine, terminal, all the presentation templates and objects available

for this object type are displayed in the preview.

After you have chosen the object you would like to select (highlighted in the table) and have then selected

a presentation template in  which  the object  is displayed  in  the corresponding  layout, single click on the

open layout to insert the object and display it using the selected presentation template.

By  switching  to  view  mode,  the  current  values  of  the  inserted  objects  are  then  received  from  the  data

server and updated accordingly.

A  defined  object  can  be  integrated  into  a  layout  more  than  once  by  selecting  it  several  times  from  the

objects list.

Select objects

Individual objects of a layout can be selected by clicking on them, or via a window using the mouse, and

they can then be edited.

If you want to highlight multiple objects,  you must either use a window or click on the individual objects

while holding down the "shift" key.

EMG-GEL_81.docx

Version: 1.0.23049

Page 14 of 16

Graphic Energy Counter Equipment (MOC)

Zoom in edit mode

You can use the zoom function in edit mode by clicking on the "View" menu item. Here, you can select a

zoom  factor  or  use  the  zoom  rectangle  to  select  an  image  section  to  enlarge  it,  so  that  it  is  displayed

filling out the layout window completely.

EMG-GEL_81.docx

Version: 1.0.23049

Page 15 of 16

Define zoomrectangleSelect zoomfactor

Graphic Energy Counter Equipment (MOC)

5  Shortcuts

Menu item "Layout"

Open

New

Rename layout

Save

Delete layout

Import layout (future use)

Export layout (future use)

Menu item "Edit"

Undo

Restore

Cut

Copy

Paste

Delete

Select all

Menu item "Element"

In the background

In the foreground

Create icon

Cancel icon

Properties

Menu item "Update"

Update

Begin update

Stop update

Ctrl. + O

Ctrl. + N

Ctrl. + R

Ctrl. + S

Ctrl. + D

Ctrl. + I

Ctrl. + E

Ctrl. + Z

Ctrl. + Y

Ctrl. + X

Ctrl. + C

Ctrl. + V

Del

Ctrl. + A

Ctrl. + B

Ctrl. + F

Ctrl. + G

Ctrl. + U

ALT + Enter

F5

F7

F9

EMG-GEL_81.docx

Version: 1.0.23049

Page 16 of 16

