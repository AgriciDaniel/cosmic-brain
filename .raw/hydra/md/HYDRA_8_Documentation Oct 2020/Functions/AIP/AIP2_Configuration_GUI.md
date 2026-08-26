AIP2 - Konfiguration der GUI

1  AIP2 - GUI Configuration

1.1  Overview

The layout for the new GUI of the AIP2 terminal (tile design) is stored in XML files. XML files can be edited

using a standard text editor. Microsoft's XML Notepad 2007 can also be used. This XML editor provides a

clearer presentation, a user-friendly copy function for entire objects and the possibility to move complete

objects. XML Notepad 2007 was used for the generation of screenshots included in this document.

In the configuration, font sizes and positions are given in points in relation to a screen resolution

of 600 points in height.  Values must be scaled and then rounded to  whole dots when  using  a

screen with a higher resolution.  Therefore, the proportions can slightly vary depending on the

screen resolution.

Colors  are  specified  in  XML  files  in  a  reversed  RGB  notation  (Blue/Green/Red  instead  of

Red/Green/Blue). If the entry is in the hexadecimal format, the two places behind the symbol $

define the color blue, the next two places the color green and red is defined by the last two places.

1.2  Filing XML files in the server

Like the INI files ctaiplay.ini and ctaipbut.ini, the XML files that define the GUI are located on the server in

the sub directory ctnet\win\aip2.  XML files are filed in the sub directory gui.

1.2.1  Scope Concept

The  INI  files  in  the  subdirectory  <SystemNo>\custom\aip2  and  the  XML  files  in  the  subdirectory

<SystemNo>\custom\aip2\gui  can  be  overridden  customer-specifically  in  deviation  from  the  standard.

Various scopes are provided in order that the different changes do not overwrite each other.

Scope

Directory

Standard

ctnet\win\aip2\<x>.<y>

Standard scope

<SystemNo>\custom\aip2\<x>.<y>

Examples
ctnet\win\aip2\ctaiplay.ini
ctnet\win\aip2\gui\l_anr.xml
1\custom\aip2\ctaiplay.ini
1\custom\aip2\gui\l_anr.xml

Custom Scope

<SystemNo>\custom\aip2\<x>@custom.<y>  1\custom\aip2\ctaiplay@custom.ini

VAR scope

<SystemNo>\custom\aip2\<x>@var.<y>

Local scope

<SystemNo>\custom\aip2\<x>@local.<y>

1\custom\aip2\gui\l_anr@custom.xml
1\custom\aip2\ctaiplay@var.ini
1\custom\aip2\gui\l_anr@var.xml
1\custom\aip2\ctaiplay@local.ini
1\custom\aip2\gui\l_anr@local.xml

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 1 of 41

AIP2 - Konfiguration der GUI

Standard scope

The  Standard  Scope  is  used  to  create  a  copy  of  the  standard.  This  ensures  that  changes  to  the

standard, sometimes supplied with a service pack, do not interfere with the collection terminal and

therefore,  the  collection  software  remains  unchanged.  After  generating  the  copy,  the  required

changes  to  the  standard  must  be  either  copied  again  or  synchronized.  The  changes  can  then  be

integrated into the Standard Scope.

Custom Scope

The Custom Scope is reserved for MPDV to file customer specific configurations.  A file is stored in

the Custom Scope if the file name includes @custom before the extension.

VAR scope

The VAR Scope is reserved for partners (Value Added Reseller) to store changes for customers of

partners.  A file is stored in the VAR scope if @var is inserted before the extension.

Local scope

The Local Scope is reserved for customers to store their own customized files. A file is stored in the

Local Scope if @local is inserted before the extension.

The priority of the different scopes is ascending from the standard scope to the local scope. A file in the

local scope takes priority over a file included in the standard scope.

INI and CFG files are processed differently to XMLfiles:

INI  and  CFG  files  are  merged  per  section,  that  means  sections  in  the  standard  are  totally  replaced  by

potentially existent sections deriving from individual scopes.  Settings in the Local Scope have highest

priority as they are processed at last and therefore overwrite settings from the scope located above.

XML files are not merged but accepted.  That means only files are processed located in the list of scopes

at the bottom.

The only exception is the file globaldefines.xml. The content of that file is merged with the settings

of the individual scopes.  It is therefore possible to overwrite individual settings (i.e. font size or

color) without copying the complete file.  If you would like to overwrite a certain element of the file

globladefines.xml, please copy the file, delete all elements to be accepted from the standard file

and then store the file in the relevant Scope.

1.2.2  Specific layouts of terminals or terminal groups

Like the INI files ctaiplay.ini and ctaipbut.ini, the XML files that define the GUI are stored on the HYDRA

server in the subdirectory <SystemNo>\custom\aip2. Standard XML files are filed in the sub directory gui.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 2 of 41

AIP2 - Konfiguration der GUI

If different GUI layouts are required for specific terminals or terminal groups, the non-standard XML files

are stored in the following subdirectories:

Reference

Subdirectory

Example

Terminal group
Terminal

tgrp_<Terminal group>\gui
tnr_<Terminal number>\gui

tgrp_900\gui
tnr_100\gui

XML files stored in these sub directories replace standard files with the exception of the globaldefines.xml

file whose content is merged with the relevant standard files.

1.2.3

Loading configuration files during restart

Every  time  the  AIP2  is  started,  INI,  CFG  and  XML  files  are  updated  from  the  server  and  automatically

activated in the terminal.

When changing the layout, please note that the changed layouts are not overwritten when the

AIP is started.  Updating of configuration files can be deactivated in the file ctaip.ini by adding the

parameter SkipAipStartupUpdate to the entry parameters= in the section [system].

1.2.4  Syntax check via XML Schema Definition (XSD)

An XML Schema Definition (XSD) defines the structure of an XML file. Depending on the editor used, a

syntax check of the edited XML file is performed. In addition, you can select the value of specific fields via

a selection list.

In  the  XML  Notepad  2007  of  Microsoft,  you  can  enter  XML  Schema  Definitions  via  the  menu  item

View – Schemas… and enable or disable them:

The file globaldefines.xsd includes the schema for the file globaldefines.xml. The file gui.xsd includes the

schema for the other XML files used for the GUI configuration. The two XSD files are located in the HYDRA

server in the same directory as the corresponding XML files.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 3 of 41

AIP2 - Konfiguration der GUI

The two XSD files globaldefines.xsd and gui.xsd are not compatible. For this reason, one of these

files must always be disabled.

The following example shows a syntax check and a selection list:

1.3  Settings

The  file  globaldefines.xml  includes  general  settings,  constants,  data  sources,  calculated  fields  and

functions.

Changes in the file globaldefines.xml are only active after restart of the AIP2.

1.3.1  General settings

Standard settings control program processing and may not be changed.

1.3.2  Constants (Defines)

The section Defines specifies the Constants used for different layout configurations. For example, you can

change color or font size at a central location using these constants.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 4 of 41

AIP2 - Konfiguration der GUI

The following constants can be set:

FONT_NAME

This constant sets the font of the GUI.  The standard setting is  „Tahoma“.

FONT_SIZE_LABEL

This constant sets the font size for the GUI labeling. The standard setting is 8.

FONT_SIZE

The constant FONT_SIZE sets the font size for the displayed data in the GUI.  The standard setting

is 10.

FONT_SIZE_HEADING

FONT_SIZE_HEADING defines the font size for the headings on the right hand side. The standard

setting is 10.

FORMAT_QUANTITY

This constant sets the format for the display of quantities.

Standard setting is „%g“.

"%g": Automatically formats the shortest display: If the quantity is an integer, then without decimal

places and without decimal separators. If the quantity is not an integer, the existing decimal places

are output after a decimal separator (maximum 15 decimal places). No thousand separator is output.

"%0.0f": No decimal places, without thousands separator.

„%0.2f“: Always two decimal places, without thousands separator.

„%0.2n“:  The  format  n  is  the  same  as  the  format  f,  but  the  resulting  string  contains  thousands

separators, if a thousands separator is configured in the regional settings.

The set format only  affects configured  layouts and not dynamic dialogs. A delimiter for

thousands is not available for dynamic dialogs.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 5 of 41

AIP2 - Konfiguration der GUI

FORMAT_CYCLE

FORMAT_CYCLE defines the output format for cycle times (target cycle and actual cycle) if they are

not output as durations (as in the standard system) but in seconds. Formatting is issued like in the

previous field.  Standard setting is "%0.3f". Please refer to section "1.2.4 CalculatedFields" for further

information.

The set format only affects configured layouts and not dynamic dialogs.

COLOR_MENU_BUTTON

This constant defines the background color for specific buttons on the left hand side, like the button

"<back" and "PZE". For example the button "< Back" and the button "PZE" on the start page belong

here. Standard setting is "$C0C0C0" (light gray).

COLOR_MENU

This  constant  controls  the  background  color  of  the  buttons  used  for  selecting  workplaces  in  the

"Home"-page  and  for  calling  functions  if  an  object  was  selected.    Standard  setting  is  "$E0E0E0"

(lighter gray).

COLOR_MENU_ACTIVE

This constant can set a background color for the selected workplace.  Standard setting is "$909090"

(gray).

COLOR_BACKGROUND

This constant can set a background color to display data on the right hand side.  The color should

correspond with the COLOR_MENU_ACTIVE. Standard setting is "$909090" (gray).

COLOR_MARGINS

This constant sets the color for the borders of the layout.  Standard setting is "$FFFFFF" (white).

COLOR_HEADING

This constant defines the background color for the upper headings on the right hand side.  Standard

setting "$833014" (dark blue).

COLOR_HEADING_2

This constant defines the  background color for  the headings in the middle on the right hand side.

Standard setting is "$974428" (blue).

COLOR_HEADING_3

This constant defines the background color for the lower headings on the right hand side.  Standard

setting is "$AA583B" (light blue).

COLOR_FONT_HEADING

This  constant  defines  the  font  color  of  the  headings  on  the  right  hand  side.    Standard  setting  is

"$FFFFFF" (white).

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 6 of 41

AIP2 - Konfiguration der GUI

COLOR_TILE

This constant defines the background color of the individual tiles on the right hand side.  Standard

setting is "$F8F8F8" (very light gray).

COLOR_FONT

COLOR_FONT sets the standard font color.  Standard setting is "$202020" (dark gray).

COLOR_STATUS_PRODUCTION

This constant defines the color for the status production. Standard setting is "1077248" (dark green,

$107000). With this constant, the color must be entered as a decimal value to avoid the display in a

different color on specific screens.

COLOR_STATUS_NO_PRODUCTION

This constant controls the color for the all statuses except production. Standard setting is "$1090FF"

(dark yellow).

COLOR_STATUS_NOT_ASSIGNED

This constant defines the color for the status "Not assigned".  Standard setting is "$1010D0" (dark

red).

COLOR_YIELD

This  constant  defines  the  color  to  display  yields.    Standard  setting  is  "1077248"  (dark  green,

$107000). With this constant, the color must be entered as a decimal value to avoid the display in a

different color on specific screens.

COLOR_SCRAP

COLOR_SCRAP controls the color to display scrap.  Standard setting is "$1010D0" (dark red).

COLOR_INSPECTION_DUE

This  constant  can  set  a  background  color  to  display  a  CAQ  inspection  due.    Standard  setting  is

"$1090FF" (yellow).

COLOR_INSPECTION_DONE

This background color indicates if a minimum inspection scope  was reached.   Standard setting is

"1077248" (dark green, $107000). With this constant, the color must be entered as a decimal value

to avoid the display in a different color on specific screens.

COLOR_INSPECTION_ERROR

If an error occurs in the inspection planning, the relevant area is shown in the color set.  Standard

setting is "$1010D0" (dark red).

COLOR_MAINTENANCE_STATUS_0, …, COLOR_MAINTENANCE_STATUS_3

Color  to  display  maintenance  status  of  resources.  Standard  settings  are  "$FFFFFF"  (white),

"$873418" (blue), "$1090FF" (yellow) and "$1010D0" (red).

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 7 of 41

AIP2 - Konfiguration der GUI

The name of customer specific constants must include the prefix "U". This way, they cannot be

mixed up with constants of the standard.

The following example shows how to override a constant in a scope so that it is merged with the settings in

the standard scope.

1.3.3  Data sources (ProviderDefinition)

The settings define the correlation between the individual data sources and may not be changed.

1.3.4  Calculated fields

Calculated fields configure the display of the target and actual cycle.  Both fields can be provided either as

"time for 1000 pieces", "time for one piece" or "pieces per minute". The setting is done using the calculated

fields SZY_CALC and IZY_CALC. The following formulas can be stored in the attribute Expression :

  Field

Presentation

Formula

Target cycle

Time for 1000 pieces

FloatToVar(FieldValue('SZY', AsDouble, 0))

Time for one piece

FloatToVar(FieldValue('SZY', AsDouble, 0) / 1000)

Pieces per minute

FloatToVar(60000 / FieldValue('SZY', AsDouble, 0))

Actual cycle

Time for 1000 pieces

FloatToVar(FieldValue('IZY', AsDouble, 0))

Time for one piece

FloatToVar(FieldValue('IZY', AsDouble, 0) / 1000)

Pieces per minute

FloatToVar(60000 / FieldValue('IZY', AsDouble, 0))

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 8 of 41

Three options can be used as comments in the file globaldefines.xml:

AIP2 - Konfiguration der GUI

The formatting of both fields is configured using the constant FORMAT_CYCLE.  Please refer to section

"1.2.2 Constants (Defines)" for further information.

1.3.5

Functions (ScriptDefinitions)

The settings may not be changed during configuration of the GUI.

Fields that start a function are identified by the attributes Extention and ScriptName. The following example

controls the height of the entries in the list of workplaces in the main view (a_list_mnr.xml):

The entry in the field #text is not active in this case. It is overwritten by the result of the previously entered

function. If you want to change the height entered in this field, you must delete the two attributes Extention

and ScriptName. Please note that in this case the data dependent identification of the height is disabled.

1.4  Layout definition

The  definition  of  the  layout  is  separated  into  layout  files  beginning  with  „l_“  and  areas  consisting  of  file

names beginning with "a_".

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 9 of 41

AIP2 - Konfiguration der GUI

There are the following layouts and areas in the standard:

l_view_mnr.xml

The tile view shows workplaces assigned to the terminal:

The structure for the individual workplaces is stored in the file a_view_mnr.xml.

The following screenshots show the assignment of the elements in the file to the objects in the GUI.

The element on the highest level of the tree structure is the big outer tile with gray frame:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 10 of 41

The elements in the next level of the tree structure are the 3 tiles in light gray and the tile including

the image:

AIP2 - Konfiguration der GUI

The elements in the next level of the tree structure are assigned as shown in the example of the light

gray tile on top and the tile including the image at the bottom:

The lowest element in the list defines the layout of the tile including the screwdriver.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 11 of 41

l_main.xml

Select a workplace to reach the main view:

AIP2 - Konfiguration der GUI

The file a_list_mnr.xml contains the structure of the view of a workplace located in the list on the left

hand side.

The  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display  data  for  the

workplace.  This area is used for all layouts that follow.

The file a_list_anr.xml stores the layout of an operation in the middle of the screen on the right hand

side.  The button to the left, which is used to log on an operation, as well as all other buttons outside

a red frame are located directly in the l_main.xml layout.

Various lists can be displayed at the bottom on the right hand side. You can set in the workplace

configuration which of the 3 lists are available at a workplace. The displayed data are defined in the

following files:

- a_list_pnr.xml: Persons logged on

- a_list_pnrg.xml: Persons logged on at a group workplace

- a_list_res.xml: Resources logged on

- a_list_emat.xml: Logged on input material

- a_list_amat.xml: Produced output batches

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 12 of 41

l_mnr.xml

If you click on the area showing the data for the selected workplace, you will get to the workplace

layout:

AIP2 - Konfiguration der GUI

As described, the file a_data_mnr.xml defines the upper area on the right hand side to display data

for the workplace.

The buttons on the left side are located in the layout l_mnr.xml.

l_anr.xml

If you click an operation in the main view, the operation layout appears:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 13 of 41

AIP2 - Konfiguration der GUI

As described, the file a_data_mnr.xml defines the upper area on the right hand side to display data

for the workplace.

The file a_data_anr.xml contains the definition for the area in the middle of the layout showing data

for the operation.

The buttons on the left side are located in the layout l_anr.xml.

l_pnr.xml

The layout for staff appears if you select a person in the main view

As described, the file a_data_mnr.xml defines the upper area on the right hand side to display data

for the workplace.

The file a_data_pnr.xml contains the definition for data relating to staff in the middle of the layout.

The button on the left side is located in the layout l_pnr.xml.

This  layout  is  also  used  to  display  data  and  to  request  functions  for  staff  logged  on  to  a  group

workplace. When requesting the functions, an error message appears as staff and operations are

logged on together to a group workplace.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 14 of 41

l_res.xml

The resource layout opens if in the main view the third list "Resources logged on" is displayed and

you click a resource:

AIP2 - Konfiguration der GUI

As described, the file a_data_mnr.xml defines the upper area on the right hand side to display data

for the workplace.

The file a_data_res.xml contains the definition for data relating to a resource in the middle of the

layout.

The buttons on the left side are located in the layout l_res.xml.

l_mat.xml

To request material layout, go to the main view. Click the button containing three dots to the left of

the 3. lists "Input material logged on" and "Produced output batches":

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 15 of 41

AIP2 - Konfiguration der GUI

As described, the file a_data_mnr.xml defines the upper area on the right hand side to display data

for the workplace.

The buttons on the left side are located in the layout l_mat.xml.

1.4.1  Overview XML files

Icon

view:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 16 of 41

Main

view:

AIP2 - Konfiguration der GUI

Workplace

layout:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 17 of 41

Operation

layout:

AIP2 - Konfiguration der GUI

1.4.2

Layouts depending on the worplace type

You can  override the layouts requested  in the main view depending on the  batch management and the

workplace  type.  Both  settings  are  stored  in  the  dialog  Workplace  and  resource  configuration  in  the  tab

Workplace configuration and consist of one letter. If you copy a layout and both letters are written as lower

case letters, are separated by an underscore ("_") and added to the file name, then this layout is used for

all workplaces including batch management and used with the relevant workplace type.

For example, buttons should be made available with other dynamic dialogs for order postings at a packing

station (letter "C") without batch management (letter "N"). To do so, copy the layout l_anr.xml onto the file

name l_anr_nc.xml. You can then modify the buttons for the packing station in this layout.

1.4.3

Taking over changes in the layout configuration

Using the attribute „ActionOnLostFocus“, you can make the following settings per layout:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 18 of 41

AIP2 - Konfiguration der GUI

laFree

Using this setting, the displayed layout is discarded on changing to another layout and loaded anew

from the XML files on the next start of this layout. Changes in the configuration of this layout, which

were made in the meantime, are taken over.

laHide

With this setting, the layout is not discarded, but stays in the background when you change to another

layout. Changes of the layout configuration, that were saved after the first layout display, do not have

an effect as the layout is not loaded anew from the XML files.

The setting laHide is applied by default in the layout of the main view (l_main.xml) to keep the scroll position

in the lists on the right hand side when you return to this layout from another layout.

When  you  change  the  language  during  runtime  using  the  flag  in  the  status  bar,  the  currently

displayed layout is loaded. Changes of the layout in the main view are then taken over.

1.5  Configuration of lists

The configuration of lists is explained using the list of the logged on operations in the layout l_main.xml:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 19 of 41

AIP2 - Konfiguration der GUI

Lists of operations have their own panel in order to keep their position if operations of aggregates (a line is

separated) are hidden.

The class TfrmLayoutGrid is responsible for the list display.

The settings below PnlHeader specify if and how a heading is displayed above a list.

The settings below PnlAdd define the button to create a new entry. In the above example, it's the button

containing a "+"-symbol .

In the Grid area the data source (DataProvider) is set for the list. LayoutFile specifies which file defines the

display of an element in the list. Below OnCellClicked you control what happens if you click an element in

the list.

1.5.1

Filtering the displayed elements in the user interface (as

of version 8.2.1.1)

The displayed lists can be filtered in the user interface. A text field must be included in the header of the

list of type TFrmLayoutGrid.

The search syntax is equal to the search syntax of the lists in the dynamic dialogs.

A search field is integrate to a list of the type TFrmLayoutGrid eingebunden:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 20 of 41

AIP2 - Konfiguration der GUI

<element class="TfrmLayoutGrid">

<SearchPanel>

<Settings>

<EnableSearch>true</EnableSearch>
<SearchType></SearchType>
<ExecuteEvent>return</ExecuteEvent>
<SearchFields>ANR|AGNR</SearchFields>
<SearchControlWidth>50</SearchControlWidth>

</Settings>

</SearchPanel>
<SearchPanelPosition>header</SearchPanelPosition>

…
</element>

Details on the properties

Properties

Description

Settings.EnableSearch

Display search panel

Settings.SearchType

Currently,  only  text  is  possible.  Describes  the

visual search component.

Settings.ExecuteEvent

Event

that  should

trigger

the  search.  The

following

configurations

are

possible:

1.

KeyDown

The search is performed immediately on pressing

the

key.  Compared

to

the

following

configurations, the above configuration costs a lot

of  time  and  shoud  only  be  used  for  small  data

quantities.

2.

Button

The  search

is  performed  by  clicking  an

additionally displayed button.

3.

Return

(Extension

of

"Button")

The  search  can  also  be  performed  by  pressing

the return key.

Settings.SearchFields

Fields in the data source where you want to find

the text you entered.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 21 of 41

Settings.SearchControlWidth

Width of the input text box

TfrmLayoutGrid.SearchPanelPosition

Search panel position

AIP2 - Konfiguration der GUI

row:

A row above the cells

header:

In the header of the TFrmLayoutGrids

If the search line is displayed, the list of type TFrmLayoutGrid requires more space in height. This

space is at the expense of the tiles showing the data in the view. It is therefore recommended

that you also change the height of the tiles with your data when using this functionality.

1.6  Request dynamic dialogs

You can store an action in the individual fields and elements in order to perhaps request a dynamic dialog.

In case of a button which is included on the left hand side in many layouts, you can enable this by using

the entry OnClick:

This example shows the button "Change status" in the layout l_mnr.xml.

The entry Identifier defines the dynamic dialog to be requested. Both other entries are constant.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 22 of 41

In a list of the class TfrmLayoutGrid containing several objects, the entry is called OnCellClicked and affects

the elements below:

AIP2 - Konfiguration der GUI

This example shows the request "MES Batch information" when selecting the  input material in the layout

l_main.xml.

1.6.1  Return after a dynamic dialog

After the execution of a dynamic dialog, you return to the layout where the dialog has been requested from.

Alternatively, you can leave this layout and return to the previous layout which is normally the main view.

Once an operation is logged off, it makes more sense to return to the main view than still displaying the

data of a logged off operation.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 23 of 41

AIP2 - Konfiguration der GUI

A script request is stored in the setting Identifier. Depending on the workplace settings, the script request

controls which dynamic dialog is requested. The first parameter specifies the script to be run and the second

parameter the default value which is used if the script does not exist.

You  then  return  to  the  previous  view  no  matter  if  the  dialog  was  completed  or  not,  if  errors

occurred or if the dialog was interrupted without a change.

1.7  Positioning

The individual elements in the layout are arranged in a tree structure. The positioning of a subordinate item

is always done in relation to the superior one (folder).

If a field shows a description and a corresponding value, the position of the description and the value refers

to the top left corner of the field.

There are two ways to specify the position of the information. They are described in the following chapters.

1.7.1

Fixed positioning

Here, the position and the size of an element is specified with the following properties:

Top

Left

Distance from the top

Distance from the left

Height

Height of the element

Width

Width of the element

Properties can be found below the entry control.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 24 of 41

The following example shows a logged on person for a_data_pnr.xml:

AIP2 - Konfiguration der GUI

The property Alignment also specifies if the element is positioned towards the left (taLeftJustify), or the right

(taRightJustify) or towards the center (taCenter). If no other property is explicitly set, the standard setting

is left-aligned. The following example shows a position towards the right of the label  Group of workplace

data (a_data_mnr.xml):

1.7.2  Dynamic positioning:

If the positioning is done dynamically then the elements adapt their position and size to the one's above or

next to it.  The property Align can set the following:

Align=alTop / Align=alBottom

This element takes over the upper or lower limit and the width of the superior element. The property

Height specifies the height.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 25 of 41

AIP2 - Konfiguration der GUI

Align=alLeft / Align=alRight

This element takes over the right or left limit and the height of the superior element. The property

Width specifies the width.

Align=alClient

Aligns itself to the complete space of the superior element.

The  following  example  defines  the  area  for  the  color  display  of  the  maintenance  status  in  the  list  of

resources (a_list_res.xml):

If neighboring elements have the same entry in the property Align, then they are displayed below or next to

each other. This functionality is used in the button bars to request individual functions and ensures that

there are no gaps if a function is hidden:

1.7.3  Positioning of workplaces in the icon view

Positioning of individual workplaces in the icon view can be changed during runtime.  You can start the

design mode (password protected "mos6050") by double click the AIP icon in the top left corner. You can

then  position  the  workplaces  by  Drag&Drop.  Double  click  the  AIP  icon  to  finish  the  design  mode.  The

positioning of the workplaces is stored in the file gui\p_view_mnr.xml.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 26 of 41

AIP2 - Konfiguration der GUI

To reset the positioning, please delete the file gui\p_view_mnr.xml.

1.8  Text formatting

Text formatting in the GUI is performed using the entries below the field Font:

You can make the following settings:

Size

Set the font size

Color

Set the font color in reversed RGB notation

If  the  attribute  Define  is  applied,  the  value  entered  in  the  field    #text  is  not  used.  Instead  the

content of the entered constant is used (with both settings).

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 27 of 41

AIP2 - Konfiguration der GUI

1.9  Formatting functions

You can display data with the aid of different formatting functions:

FormatDate

This function sets a date depending on the date format date (short) set in the operating system:

There is an example located in the workplace data (a_data_mnr.xml) for the start date of the current

status

FormatTime / FormatTimeLong

The function FormatTime  sets the time depending on the time format Time (short) set in the operating

system:

FormatTimeLong uses the format Time (long).

FormatDuration / …

There are various functions to display durations in different output formats.

Function

Format

FormatDuration

Hours:Minutes

FormatDurationMMSS

Minutes:Seconds

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 28 of 41

AIP2 - Konfiguration der GUI

FormatDurationHHMMSS

Hours:Minutes:Seconds

FormatDurationHHII

Hours,decimal hours (Industrial minutes)

FormatDurationHHIII

Hours, decimal hours (3 decimal places)

FormatDurationMMII

Minutes,decimal minutes

You can find an example for the output of a duration in workplace data(a_data_mnr.xml). It states

the duration of the current status :

1.10  Multilingualism

AIP2 uses just like the AIP the Multilizer to translate text into another language.  Language keys with the

prefix "Ik" are used for the new GUI.  German texts without the prefix "Ik" are also processed if they are

included in the mld file.

Text  for  translation  can  be  added  using  the  function  "Translate"  and  the  entry  "LanguageKey"  (in

accordance with the language set).

This example contains a German text "Arbeitsgang" (operation) which does not affect the processing. The

text is replaced by the translated text using the language key during runtime.

1.11  Examples / exercises

This chapter shows customization options of the layout using examples.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 29 of 41

1.11.1  Change existing fields

Replace the field "group" with "cost center" in the displayed workplace data.

AIP2 - Konfiguration der GUI

You  need  to  change  the  entries  for  "label  group"  and  "MGRP"  (machine  group)  in  the  parameter

a_data_mnr.xml as follows:

Entries with the description "#comment" are comments which do not affect processing.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 30 of 41

AIP2 - Konfiguration der GUI

The  first  element  in  the  red  frame  shows  the  description  above  the  data.    The  language  key

IkWorkplaceGroup is replaced by IKCostCenter. You can directly insert the text in the field "#text" if there

is  no  language  key  available  for  the  description.  Both  entries  "Function"  and  "LanguageKey"  must  be

deleted in this case.

The  description  is  displayed  towards  the  right  hand  side  at  position  180  ("Left":  180;  "Alignment":

taRightJustify).

The second element is responsible for the display of the data field.  Change the entry "DataFieldName"

from MGRP to KST.

1.11.2  Add a new field

Display the duration booked on RPA 12 to the right of the status display.

This is done by copying the element with the comment Workplace.  This element specifies the light gray

space and includes 2 other elements including name and data.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 31 of 41

AIP2 - Konfiguration der GUI

The comment located above is also copied and changed on BMK12.

The  position  of  the  light  gray  area  ("left")  is  made  up  of  position  ("left")  and  the  width  of  the  element

Workplace Status plus a distance of 5 dots (345 + 190 + 5= 540). Both fields are located below the entry

"Control".

The  elements  Label  BMK12  and  AGR:BMK12  are  located  on  the  light  gray  area.    The  position  of  both

elements ("Top" and "Left") refer to the top left corner of the light gray space.

The entry "Caption" specifies the displayed text. Here, language keys have not been used so the text is not

translated.

The entry DataFieldName below the comment AGR:BMK12 was changed to the field name AGR:BMK12.

The formatting function FormatDurationHHMMSS shows the duration in hours:minutes:seconds.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 32 of 41

AIP2 - Konfiguration der GUI

1.11.3  Add user fields

Add a user field to the interface by adding a new field as described in the previous chapter. Use the the

acronym of the user field (e.g. ANR_FU_65).

If  you  want  to  format  user  fields  for  dates,  times,  or  durations,  you  can  use  the  formatting

functions. See section "1.9 Formatting functions".

Load user field with cataiplay.ini

Note  that  the  AIP  lists  that  serve  as  data  providers  do  not  contain  user  fields  in  the  standard

system. In order for the user fields to be added to the list, you must configure it in the ctaiplay.ini

file. As long as the  user fields in the  ctaiplay.ini  file are not configured correctly, they remain

empty on the user interface.

In the customer-specific terminal directory (e.g. if user fields are to be added at terminal group level:

\mip\<systemnr>\custom\aip2\tgrp_xxx\) a ctaiplay.ini is created, which contains the different section.

  Activate the additional loading of the user fields for operation- or order-related XML files in the

section [ Custom Userfields ANR ].

  Activate the additional loading of user fields for machine-related XML files in the [ Custom

Userfields MNR ] section.

You can find examples on how to do it further along.

The activated fields are then available in all XML files connected to the DataProvider ANR or MNR.

Available user field in machine and order lists

All identifiers of user fields and also other fields that can be reloaded are located in the headers.dat file in

the "spool" directory of the terminal. It consists of four lines:

Start of the row  Content

10|…

*10|…

11|…

*11|…

Machine list: Fields that are always included in the list.

Machine list: Fields that can be reloaded.

Order list: Fields that are always included in the list.

Order list: Fields that can be reloaded.

The following user fields can be reloaded:

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 33 of 41

AIP2 - Konfiguration der GUI

Machine list

FU:1 to FU:66

Machine user fields

Order list

ANR_FU_1 to ANR_FU_66

Operation user fields

AUNR_FU_1 to AUNR_FU_66

Order user fields

MNR_FU_1 up to MNR_FU_66

Machine user fields

VERARBCODE_FU_1 up to VERARBCODE_FU_66

Processing code user fields

AGR_FU_1 to AGR_FU_66

User fields of the operation status (cannot be used in the standard system, reserved for Customizing!)

Example 1: User fields in the operation list

  User field 1 of the operation should be entered in the order list with the name " Order date ".
  User field 66 of the machine with the name "My long user field" should be added to the order

list.

Field definition in section [ Custom user fields ANR ]

[ Custom usernfields ANR ]

GRID_LIST_TYP=ANR

; additional fields of the order list

ANR_FU_1= ; User field 1 of operation, MyDate FU:1 [operations list]

MNR_FU_66= ; User field 66 of machine, My long user field [operations list]

Example 2: User field in the machine list

User field 66 of the machine with the name "My long user field" should be added to the machine list.

Field definition in the section [ Custom user fields MNR ]

[ Custom userbfields MNR ]

GRID_LIST_TYP=MNR

; Additional fields in the machine list

FU:66= ; User field 66 of machine, My long user field [machine list]

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 34 of 41

1.11.4  Remove button

Delete the button Change target quantity from the operation layout (l_anr.xml).

AIP2 - Konfiguration der GUI

The  new  entry  Visible=False  hides  the  button.  Optionally,  you  can  also  delete  the  comment  and  the

element.

1.11.5  Add button

You want to add a new button "Weighing" in the layout for "input material", "output batch" and (l_mat.xml).

First of all, copy an existing button including the corresponding comment.  In this case the button "Batch

information" was copied.  Change the comment in order to easily find the new button in the list of elements.

The  entry  "Caption"  specifies  the  displayed  text.  In  the  example,  the  English  text  "Weigh"  is  used  as

language key.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 35 of 41

The "Identifier" specifies which dynamic dialog is requested.

AIP2 - Konfiguration der GUI

1.11.6

Integration of a picture

The task is to have a logo displayed in the main view (l_main.xml) below the button "PZE".

Copy the button "PZE" and the comment. Change the comment.

As the button has no labeling, delete the entry "Caption". Also delete the entries "Visible" and "OnClick".

You  need  a  new  element  of  the  class  "TsImage“  in  order  to  display  the  new  picture.  This  element  was

copied from the staff list (a_list_pnr.xml) and has the class "TGridItemImage", as it is not located on a button

but in a list. Change the class to "TsImage" after copying. Delete the entry "Visible".

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 36 of 41

AIP2 - Konfiguration der GUI

The file name of the picture is entered in the field "Identifier" of the entry "Picture“. There are two options to

load the picture:

-  LoadPictureFromFile reads the file from the spool directory.

-  LoadPictureFromAIP uses pictures included in the AIP2 in the file "pict.zip" or "pict_cust.zip". This

information is more efficient as these picture are stored in a  buffer.  This method only supports

images of type PNG and BMP.

Different settings are available to display the picture.

- -  Transparent – For example, PNG files support  transparent areas  where the background of the

picture is visible. Functionality can be switched off using the value False.

- -  Stretch specifies if the picture is shown in its original size (value False) or if Height and Width are

adjusted (value True).

- -  Proportional controls whether the ratio of the width of the image and the height of the image is

maintained (value True) or not (value False) when the image size is adjusted to the specified Height

and Width.

1.11.7  Change quantity format

Generally show the quantity format with 2 decimal places.

The quantity format is configured in the file globaldefines.xml using the constant FORMAT_QUANTITY:

The value "%0.2f" ensures that quantities are displayed with 2 decimal places.

You  can  find  an  example  for  this  constant  (Define)  when  yield  is  displayed  for  data  of  the  workplace

(a_data_mnr.xml):

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 37 of 41

AIP2 - Konfiguration der GUI

The set format only affects configured layouts and not dynamic dialogs.

1.11.8  Postings for operations not logged on

The workplace configuration in the MOC has a button called "Posting of operations not logged on". If this

button is activated, you can interrupt or log off the operations not logged on (posting to the server).  You

have to extend the configuration if you would like to carry out these postings in the AIP2.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 38 of 41

The operation layout only  opens in the AIP by using the buttons  Interrupt and Logg off  if you select the

logged operation.  If the following extension in the file l_main.xml is carried out, this layout also opens if you

click the empty space in the list of operations.

AIP2 - Konfiguration der GUI

The dynamic dialogs must also be customized in order to interrupt and logg off operations. Unless so-called

simple dialogs are used.

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 39 of 41

AIP2 - Konfiguration der GUI

1.12

Index

#comment ................................................................................................................................................... 31
#text ................................................................................................................................................ 10, 28, 32
ActionOnLostFocus .................................................................................................................................... 19
alBottom...................................................................................................................................................... 26
alClient ........................................................................................................................................................ 26
Align ............................................................................................................................................................ 26
Alignment .................................................................................................................................................... 26
alLeft ........................................................................................................................................................... 26
alRight ......................................................................................................................................................... 26
alTop ........................................................................................................................................................... 26
Caption ................................................................................................................................................. 33, 35
Color ........................................................................................................................................................... 28
control ......................................................................................................................................................... 25
DataFieldName ..................................................................................................................................... 32, 33
DataProvider ............................................................................................................................................... 21
Define ................................................................................................................................................... 28, 37
Defines...........................................................................................................................................................5
Extention ..................................................................................................................................................... 10
Font ............................................................................................................................................................. 28
FormatDate ................................................................................................................................................. 29
FormatDuration ........................................................................................................................................... 29
FormatDurationHHII ................................................................................................................................... 30
FormatDurationHHIII .................................................................................................................................. 30
FormatDurationHHMMSS ..................................................................................................................... 30, 34
FormatDurationMMII ................................................................................................................................... 30
FormatDurationMMSS ................................................................................................................................ 30
FormatTime ................................................................................................................................................ 29
FormatTimeLong ........................................................................................................................................ 29
Function ...................................................................................................................................................... 32
Grid ............................................................................................................................................................. 21
Height ................................................................................................................................................... 25, 26
Identifier .................................................................................................................................... 23, 24, 35, 36
laFree .......................................................................................................................................................... 19
laHide .......................................................................................................................................................... 19
LanguageKey ....................................................................................................................................... 30, 32
LayoutFile ................................................................................................................................................... 21
Left .............................................................................................................................................................. 25
LoadPictureFromAIP .................................................................................................................................. 37
LoadPictureFromFile .................................................................................................................................. 36
OnCellClicked ....................................................................................................................................... 21, 23
OnClick ....................................................................................................................................................... 23
PnlAdd ........................................................................................................................................................ 21
PnlHeader ................................................................................................................................................... 20
Proportional ................................................................................................................................................ 37
ScriptName ................................................................................................................................................. 10
Size ............................................................................................................................................................. 28
Stretch ........................................................................................................................................................ 37
taCenter ...................................................................................................................................................... 26
taLeftJustify ................................................................................................................................................ 26
taRightJustify ........................................................................................................................................ 26, 32
TfrmLayoutGrid ..................................................................................................................................... 20, 23
TGridItemImage .......................................................................................................................................... 36
Top .............................................................................................................................................................. 25
Translate ..................................................................................................................................................... 30
Transparent ................................................................................................................................................ 37
TsImage ...................................................................................................................................................... 36

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 40 of 41

Visible ......................................................................................................................................................... 34
Width ..................................................................................................................................................... 25, 26

AIP2 - Konfiguration der GUI

AIP2_Configuration_GUI.docx

Version: 1.7.22221

Page 41 of 41

