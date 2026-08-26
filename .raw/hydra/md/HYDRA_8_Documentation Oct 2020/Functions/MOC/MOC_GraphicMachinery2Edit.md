Graphic Machinery - Layout Editor

1  Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 1 of 20

1.1  Layout editor

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 2 of 20

The layout editor does not support the functions

 "print preview" and

 "print all".

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 3 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 4 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 5 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 6 of 20

Note: You cannot draw diagonal lines.

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 7 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 8 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 9 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 10 of 20

Graphic Machinery - Layout Editor

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 11 of 20

Graphic Machinery - Layout Editor

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

You can only add and show KPIs if you enable the extensions mpark2kpi.

You  can  only  add  and  show  the  operations  logged  on  if  you  enable  the  extensions

mpark2roptemp.

You can change existing templates as part of a customization.

Deployment of layouts

You can pass created layouts from one system to the other. MPDV explains how to pass layouts as  part

of a service.

1.2  Notes on tooltip templates

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 12 of 20

Graphic Machinery - Layout Editor

  Scrap (P) – Scrap recorded for the workplace in the current shift (primary quantity unit)

Operation  related  data  for  the  currently  logged  on  operation.  If  several  operations  are  logged  on  to  the

workplace at the same time, the data of the operation last logged on is displayed.

  MES order number

  OP designation

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 13 of 20

Graphic Machinery - Layout Editor

Resource

The templates for resources show the resource status.

  Resource – Identifies the resource according to the Configuration

  Resource type – Resource type of the resource according to the Configuration

  Designation – Name of the resource according to the Configuration

  Current storage location – Current storage location of the resource

  Resource status – Number of the current resource status

  Resource status – Name of the current resource status according to the Configuration

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 14 of 20

Graphic Machinery - Layout Editor

Key performance indicators (current, shift-related KPIs for

workplaces/machines)

You can only add and show KPIs if you enable the extensions mpark2kpi.

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

Availability

Performance

Quality

tec_ef

yie_ra

scr_ra

oee

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

You  can  only  add  and  show  the  operations  logged  on  if  you  enable  the  extensions

mpark2roptemp.

The template shows up to three logged on operations including the following information on the operation:

  Article number

  Target quantity (P)

  Yield (P)

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 15 of 20

Graphic Machinery - Layout Editor

  Scrap (P)

  Scrap ratio in %

The system calculates the relation of scrap (P) to the total yield quantity (P) and scrap quantity (P).

The result includes two decimal places. The application indicates "undef." if the scrap rate cannot be

calculated.

The values are displayed left aligned. The point in time of the operation logon specifies the order in which

the application shows the data of the logged on operations. The operation logged on last is displayed first.

The template does not provide tooltips. Create a static text where you can enter the workplace.

Therefore, you can identify later to which workplace this information refers.

1.3  Description of the templates for workplaces/machines



Available as of service pack 13/2018:

In the Status assignment, you can specify  a time for each machine status in field "Warning in

the  Graphic  Machinery".  If  a machine  status  lasts  longer  than  the  specified  time,  the  machine

status symbol starts to flash. If the template supports the flashing status symbol, the machine

status is marked with .

Template name

Screenshot

Description and content of the

Machines_Cycles

Machines_Description

template

Display of target and actual cycle for

the workplace/machine. For the display,

the format is used that is defined for the

display in the MOC.

Display of the workplace/machine

number and of the name.

Machines_OperationArticle

Display of OP name and of article of the

logged on operation. If several

operations are logged on, the operation

logged on last is displayed.

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 16 of 20

Template name

Screenshot

Description and content of the

Graphic Machinery - Layout Editor

Machines_QuantityLevel

template

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 17 of 20

Template name

Screenshot

Description and content of the

Graphic Machinery - Layout Editor

template

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 18 of 20

Template name

Screenshot

Description and content of the

Graphic Machinery - Layout Editor

template

-  Graphic comparison of the

target quantity and the yield

produced up to now (primary

quantity unit) of the currently

logged on operation.

Machines_Template6

Display of the following information:

Machines_TrafficLight

Machines_StatusCircle

Machines_MaintenanceStatus1

Available  as  of  service  pack

13/2018

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 19 of 20

Template name

Screenshot

Description and content of the

Graphic Machinery - Layout Editor

template

maintenance due, the background color

is blue.

If no maintenance is due, no symbol

and no background color is displayed.

Machines_MaintenanceStatus2

See Machines_MaintenanceStatus1

Available  as  of  service  pack

13/2018

1.4  Description of the templates for KPIs

Template name

Screenshot

Description and content of the

template

keyfigure_template_label

Display of the following information:

-  KPI name

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

MOC_GraphicMachinery2Edit.docx

Version: 1.14.18468

Page 20 of 20

