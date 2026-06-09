Package

Manual

How to Operate the MES
Operation Center

Version 1.34

Last changed on: 19.06.2020

How to Operate the MES Operation Center

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

All rights reserved.

MOC_CC.docx

Version: 1.36

Page 2 of 51

How to Operate the MES Operation Center

Contents

1  Operation of the MES Operation Center ...................................................... 5

1.1  General notes on the document .......................................................................... 5

1.2  Requirements for using the MOC ........................................................................ 5

2  Getting started .............................................................................................. 6

2.1  Start and exit the MOC ........................................................................................ 6

2.2  The MOC desktop ............................................................................................... 8

2.3  MOC Start menu ................................................................................................. 9

2.4  The MOC system menu .................................................................................... 12

2.5  The MOC taskbar .............................................................................................. 12

2.6  MOC help functions ........................................................................................... 13

3  Structure and use of applications ............................................................... 14

3.1  Overviews and evaluations/reports. ................................................................... 14

3.2  Editing functions ................................................................................................ 19

3.2.1  Main view of editing applications ........................................................... 19

3.2.2

Insert new data records ......................................................................... 21

3.2.3  Copy a data record ................................................................................ 21

3.2.4  Edit a data record .................................................................................. 22

3.2.5  Delete data records ............................................................................... 22

3.3  Operation of applications ................................................................................... 23

3.3.1  Selection profiles ................................................................................... 23

3.3.2  MOC table functions .............................................................................. 23

3.3.3  How to use simple charts....................................................................... 25

3.3.4  Pivot tables in combination with pivot charts .......................................... 26

3.3.5  Print application contents....................................................................... 32

3.3.6  Export application contents .................................................................... 33

3.3.7  Shortcuts ............................................................................................... 33

4  System functions ........................................................................................ 34

4.1  Configure the MOC user interface ..................................................................... 34

4.1.1  Change the MOC layout ........................................................................ 34

4.1.2  Change number, time and date format .................................................. 34

4.1.3  Change the language ............................................................................ 34

MOC_CC.docx

Version: 1.36

Page 3 of 51

How to Operate the MES Operation Center

4.1.4  Change the type of table export ............................................................. 34

4.1.5  Change the start menu .......................................................................... 34

4.1.6  Change the open mode for applications ................................................ 35

4.1.7  MDI mode .............................................................................................. 35

4.1.8  Automatic update .................................................................................. 37

4.1.9  UAC mode ............................................................................................. 37

4.1.10  Change the type of date input ................................................................ 38

4.2  Menu editor ....................................................................................................... 38

4.3  Professional mode............................................................................................. 39

4.4  Development Suite ............................................................................................ 39

4.5

Log window ....................................................................................................... 39

4.6  Delete user settings ........................................................................................... 40

4.7  Delete user settings for the application .............................................................. 40

4.8  System information............................................................................................ 40

4.9  Search for updates (HYDRA installation version lower than SP9) ..................... 41

4.9.1  Overview ............................................................................................... 41

4.9.2  Detailed description of the update process ............................................ 41

4.10  Search for updates (HYDRA installation version higher than SP9) .................... 43

4.10.1  Manual update search ........................................................................... 44

4.10.2  Automatic update search via MOC ........................................................ 47

4.10.3  Manual start of the maintenance program MOC Updater ....................... 47

4.11  Transaction codes for system functions ............................................................. 49

4.12  Allocate and deallocate licenses ........................................................................ 51

4.13  Windows ........................................................................................................... 51

MOC_CC.docx

Version: 1.36

Page 4 of 51

How to Operate the MES Operation Center

1  Operation of the MES Operation Center

1.1  General notes on the document

This document describes  how to operate the MES Operation Center (MOC).  This manual focuses on  a

detailed  presentation  of  the  general  functions,  which  are  available  for  all  applications.  The  different

applications are described in the respective application manuals, which can be opened by clicking the F1

button or using the link in the application package manual.

1.2  Requirements for using the MOC

For the MOC installation, the PC must meet the following requirements:





Installed operating system: Windows 7 or higher

.NET Framework 4.5.2

  PDF Viewer to use the MOC help

When being started, the MOC checks whether these components are available or not.

MOC_CC.docx

Version: 1.36

Page 5 of 51

How to Operate the MES Operation Center

2  Getting started

2.1  Start and exit the MOC

Start the MOC via the Windows start menu or use a link on the desktop. While being started, the MOC start

screen is displayed, visualizing the loading process. Once all necessary components have been loaded,

the MOC start screen closes and the MOC desktop with its login window appears. Enter the user name and

password you have received from system administration.

If the MOC installation is a multi-system installation, you can select the system you want to log on to from

the System combo box.

The

 button logs you in. Note: User name and password are case sensitive.

The

 button terminates the MOC and cancels the login process.

After successful login process, the system reads the user's authorizations and releases the system menu

and the start menu. We recommend changing the password given by the administrator when logging in to

the MOC for the first time. To do so, select File  Change password in the system menu.

You can start and run the MOC several times on a PC. Each started MOC instance can access another

system. Consequently, you can access the integration and production/live system or monitor the systems

of two different factories at the same time.

MOC_CC.docx

Version: 1.36

Page 6 of 51

How to Operate the MES Operation Center

Log off

Select this option in the system menu to log off from the current system: File  Log off. Then you can either

log on another user or you can change the target system.

Exit

Select this option to exit the selected MOC instance: MOC system menu  File  Exit.

Language check

With each MOC login, the system checks whether the language last selected is licensed. If the language is

not licensed, an error message is displayed informing about the missing license. The MOC contents are

then displayed in the fallback language (English). Change the language in the system menu. Go to: Extras

 Configuration.

MOC_CC.docx

Version: 1.36

Page 7 of 51

How to Operate the MES Operation Center

2.2  The MOC desktop

The MOC desktop is the frame application including all control functions, such as the start menu and the

quick launch bar. The MOC desktop also shows the different applications.

MOC_CC.docx

Version: 1.36

Page 8 of 51

How to Operate the MES Operation Center

2.3  MOC Start menu

The MOC start menu provides access to the MOC applications. By default, the function calls provided in

the MOC start menu are based on the VDI 5600 role definition. The user can change the menu according

to the individual requirements. See section "4.1.5 Change the start menu" and "4.2 Menu editor".

MOC_CC.docx

Version: 1.36

Page 9 of 51

Minimize main categories to the footer of the start menu

How to Operate the MES Operation Center

The start menu is split horizontally into main categories and sub

categories including their menu calls. You can use this splitter to

minimize the main categories to the footer of the start menu. To

do so, use the splitter to drag the  area of the main categories

down. Then the main categories  are  displayed as  icons. If the

mouse  touches  one  of  the  icons  the  name  of  the  category  is

displayed in a tooltip.

Change the width of the start menu

You  can  change  the  width  of  the  start  menu  by  moving  the

vertical  splitter.  If  the  selected  width  is  too  small,  the  menu

entries cannot be displayed completely any more. In this case, a

tooltip  appears  if  the  mouse  points  at  a  menu  entry  for  some

seconds.

Dock the start menu

By default, the start menu is docked to the MOC desktop on the left-hand side. But you can also dock the

start menu to the top, the bottom or the right-hand side. To do so, click the title bar of the start menu and

drag it out of the docking position. The possible docking positions are now displayed for better overview.

You can also leave the start menu undocked on the MOC desktop or outside of the frame application.

Hide the start menu / pin

You can hide the start menu in order to clear space for applications on the MOC desktop: Click

when the start menu is undocked. If the start menu is docked, you can also use the pin option

. Once

clicked

, the icon is displayed in a horizontal position and the start menu is hidden automatically as soon

as the mouse has left the menu.

Hide categories in the start menu

 This button in the footer of the start menu opens a menu to configure menu categories. Here, you can

hide or show main categories.

MOC_CC.docx

Version: 1.36

Page 10 of 51

How to Operate the MES Operation Center

Filter start menu by function profile

You can select any function profile in the MOC taskbar. The system then filters the menu according to the

selected function profile. Only the menu items are displayed, which are included in the function profile.

Manage favorites in the start menu

You  can  define  applications  as  favorites  to  adjust  the  function  calls  according  to  your  personal

requirements. Select an application in the start menu, open the context menu and choose Add to favorites.

The selected favorites are then contained in the Favorites category.

You can also remove entries from the Favorites.  Select Remove in the context menu.

Autorun

Applications  stored  in  the  Autorun  menu  are  opened  automatically  when  you  start  the  MOC.  Select  an

application in the start menu, open the context menu and choose Add to autostart.

MOC authorization

HYDRA 8 MOC authorization works as described below. The authorization process affects the following

MOC objects:

  Applications (e.g. workplace overview).

  Detail applications (e.g. cycle view in the application workplace overview).

  Functions you can start (e.g. the Edit function in the application Units).

  Fields and field groups in detail applications.

You  first  assign  authorization  keys  to  the  listed  objects.  To  release  the  objects,  you  require  a  function

authorization or a license.

Authorization of applications

If an application is grayed out in the start menu, this application is neither authorized nor activated. Install

licenses  or  create  function  authorizations  to  activate  the  component.  The  tooltip  of  the  grayed  out

application tells you whether a license or function authorization is missing for the application.

MOC_CC.docx

Version: 1.36

Page 11 of 51

How to Operate the MES Operation Center

2.4  The MOC system menu

The MOC system menu includes functions to manage the MOC. This is a fixed menu that can neither be

changed  by  the  user  nor  by  the  system  administrator.  The  functions  provided  in  the  system  menu  are

explained in section 4 System functions.

2.5  The MOC taskbar

The MOC taskbar is located at the bottom of the MOC desktop. The taskbar contains control functions such

as the forward/backward navigation or transaction calls and shows also system information, such as the

currently used system, the current user, etc.

Call applications using transaction codes

You can call applications using the input field of the taskbar that is to the right. When you click the input

field, a list opens showing the transaction codes and names of all available applications. Enter a search

term to filter the list. A matching list entry is highlighted. To select the relevant entry, press the Enter key or

click the mouse. The quick launch shows the application that was last opened. Click the Repeat button to

restart this application.

Navigate forward and backward

When working with the MOC, several applications are usually opened at the same time. Use the navigation

arrows

 to follow the course of application calls and to activate the relevant applications. Consequently,

you can go to  applications,  which  have already  been  opened, or reopen applications,  which  have been

closed.  You  can  also  display  or  change  the  currently  opened  applications  using  the  Windows  option  or

change the active application using Ctrl + Tab.

Show open applications

The drop-down option next to the navigation arrows in the MOC taskbar opens the history. This list also

shows  all  applications  that  are  currently  opened.  Use  the  shortcut  Ctrl+TAB  to  go  through  all  open

applications.

MOC_CC.docx

Version: 1.36

Page 12 of 51

How to Operate the MES Operation Center

System information

The MOC taskbar shows the following system information on the right-hand side:

  Version:

Version of the MOC software in use.

  Customer number:

Customer number that is set in the used instance.

  User:

User that is currently logged in to this MOC instance

  System:

System the used MOC instance is connected to

  System time:

Date and time.

2.6  MOC help functions

The MOC help consists of three components. Click the F1 key of your keyboard to open the help function.

Then  the  MOC  opens  the  help  function  that  corresponds  to  your  selected  item.  If  you  select  a  detail

application, for example, and press the F1 key, the help function matching this detail application opens.

You can also open the help function in every application by clicking the respective toolbar button:

Help on operation

Click  this  button  to  open  the  help  file  describing  how  to  operate  the  MOC.  The  document  is  entitled

“MOC_CC.pdf” (this document). The document describes how to use the MOC in general and applies for

all applications.

Help on application

The function Help on application opens the manual that describes the application from which the help file

was  requested.  The  application  manual  explains  how  the  application  works.  The  documentation  also

includes all detail applications.

Help on detail application

The function Help on detail application opens the application manual at the section/bookmark where the

respective detail application is described.

MOC_CC.docx

Version: 1.36

Page 13 of 51

How to Operate the MES Operation Center

3  Structure and use of applications

3.1  Overviews and evaluations/reports.

Each MOC application has been designed and implemented for special activities. However, all applications

have the same structure.

The toolbar

The toolbar contains all function calls of an application.

  The toolbar has one or more tabs. The above example shows the tabs Main page, Entry and Staff.

  Every tab is divided into categories. The above example shows the  Entry tab with its categories

Data, Settings and Help.

The toolbar is context sensitive. This means that for each detail application selected, the tabs assigned to

this  detail  application  are  displayed.  But  the  application  functions  of  the  categories  Data  and  Help  are

always available regardless of which detail application is selected.

You can hide the toolbar by double-clicking a tab or opening the context menu.

In the same way, you can show the toolbar.

MOC_CC.docx

Version: 1.36

Page 14 of 51

How to Operate the MES Operation Center

Quick launch bar

For each application, you can define individual application favorites that are displayed in the quick launch

bar of the application. The user can use these functions even if the toolbar is hidden.

Choose the Add to quick launch bar option in the context menu of the function call to qualify a function as

an application favorite. Consequently, the icon to start the function is inserted at the end of the quick launch

toolbar. Choose the Remove from quick launch bar option in the context menu of the icon to remove an

icon from the quick launch toolbar.

Selection pane

The  selection  pane  includes  filter  criteria  that  are  specific  to  each  application.  Each  selection  pane  can

contain one or more tabs with filter criteria.

By default, each tab shows a maximum of two rows. You can access the other filters via the scrollbar to the

right of the selection pane.

With some selection criteria, further, more detailed selection criteria can be called.

In the dialog that opens, further selection criteria are available. Example:

MOC_CC.docx

Version: 1.36

Page 15 of 51

How to Operate the MES Operation Center

The above dialog is a standard software component. The dialog provides a predefined selection of selection

criteria.  The  same  standard  software  components  are  provided  in  different  applications.  The  possible

selection criteria are only processed as part of the selection if the relevant value is provided in the selection

field of the application's selection pane.

Example:

The field Basic date start only provides a date selection.

The standard software component also permits a selection by "Fixed time".

The  selection  field  Basic  date  start  does  not  provide  the  field  Fixed  time.  A  selection  by  Fixed  time  is

therefore not possible.

Group columns for selection

You can group columns on the MOC and create a tree structure. The tree structure can sometimes include

a drill-down functionality.

This kind of layout for selection criteria is helpful in many applications because this layout is flexible and

provides many different combinations.

For example, material can be displayed in a selection by order and then by operation including also totals

values (see screenshot).

MOC_CC.docx

Version: 1.36

Page 16 of 51

How to Operate the MES Operation Center

In other cases, it is helpful to generate one selection key from two (or more) columns in order to get a flat

structure of selection criteria. When you next use the MOC application, you need less clicks to open the

required data records and the possible combinations of column entries are immediately visualized as one

selection key.

Standard structure:

Flat structure via column combination:

MOC_CC.docx

Version: 1.36

Page 17 of 51

How to Operate the MES Operation Center

The context menu does not provide any command for the flat structure of the selection criteria. But you can

use drag and drop and press the CTRL button at the same time to group the selection criteria.

Request data

When  you  have  selected  the  filter  criteria  for  an  application,  you  can  request  data:  make  the  relevant

function call or press the ENTER key of your keyboard.

Detail applications

The functions of an application are included in one or more detail applications. If an application consists of

more than one detail application, they are normally linked with each other. Examples of detail applications:

tables or charts.

MOC_CC.docx

Version: 1.36

Page 18 of 51

How to Operate the MES Operation Center

Save application layout

If you change the default application layout, for example, by adding or removing columns, changing the

alignment of categories and columns, or by making other configurations for detail  applications, and  you

want to keep these changes, you have to save this layout of the application. To do so, click Save in the

Settings category of the toolbar.

Open an application several times

You can open most of the applications of an MOC instance multiple times. Just open the application once

more using the menu or the transaction code.

3.2  Editing functions

The sections below describe how the editing functions work.

3.2.1  Main view of editing applications

Use the Functions category of the toolbar to call editing applications.

MOC_CC.docx

Version: 1.36

Page 19 of 51

How to Operate the MES Operation Center

The main view of editing applications provides the toolbar to start functions and the selection pane – just

as all other applications. In addition, the editing application shows a table of already existing entries and a

detail view of the selected data record.

MOC_CC.docx

Version: 1.36

Page 20 of 51

3.2.2

Insert new data records

How to Operate the MES Operation Center

Select Insert to add new data records in an editing application. The available input fields depend on the

selected editing function. Click the green check to close the editing dialog. If you want to exit the dialog

without saving data click the red cross.

3.2.3  Copy a data record

There are two methods to copy data records. The method depends on the relevant application:

Data record as template

When you copy a table entry, the data record selected in the table is used as template for the

data record to be inserted. You can edit the properties and close the dialog by clicking "OK".

Copy several data records

Use this option to copy several data records from one object to the next. The object of this example is the

"group". The available copy options depend on the application that is selected.

MOC_CC.docx

Version: 1.36

Page 21 of 51

3.2.4  Edit a data record

How to Operate the MES Operation Center

When  you  edit  a  data  record,  you  can

change  some  properties  of  the  data

record  -  in  this  example  you  can  only

change

the  "position".  You  cannot

change  the  key  values  of  the  data

record - in this case "group", "resource

type" and "resource".

Click "OK" to confirm the dialog.

3.2.5  Delete data records

When you delete data records, you can either delete the selected data record or several data records. If

you want to delete several data records at once, select the relevant records and click Delete.

If you select several data records, the system sends a confirmation prompt you have to confirm in order to

delete these data records. The confirmation prompt should prevent you from deleting multiple data records

unintentionally.

MOC_CC.docx

Version: 1.36

Page 22 of 51

How to Operate the MES Operation Center

3.3  Operation of applications

3.3.1  Selection profiles

If  you  use  evaluations/reports  several  times,  it  is  helpful  to  save  the  frequently  used  filter  criteria  for

evaluations/reports. For this reason, each application supports an individual management of such profiles.

This means: You can create profiles for each application and reuse these profiles every time you open the

application.

Create a selection profile

Go to the Profile tab of the toolbar to create a selection profile. Enter the name of the profile to be created

in the combo box. Click the Save button to save the criteria that are currently set in the selection pane under

the specified name.

Select a selection profile

You can select a selection profile from the combo box at any time. Once you have selected a selection

profile, the selection fields are completed with the values stored in this selection profile.

Change a selection profile

You can change an existing selection  profile  by saving the changed selection criteria under the already

assigned name.

You can overwrite global selection profiles with the function authorization "syspadm".

3.3.2  MOC table functions

You  can  change  the  tables  on  the  MOC  according  to  your  requirements.  You  can  use  the  functions

described in the sections below with all tables (with very few exceptions).

The  settings  made  for  a  table  are  only  valid  for  the  detail  application  where  the  settings  were

made. You cannot apply these changes to all tables in the system. To save the settings made for

the tables and to re-use the table filter criteria, you must save the application settings (click Save

in the toolbar).

Sort table data

Click the table header to sort table data in descending order. If you click the table header once more, data

is sorted in ascending order. The selected sorting option is shown.

You can sort data by several columns: Press the Shift key of your keyboard after sorting the first column.

Then click the other column headings by which you want to sort. You can start sorting as follows:

1.  Right click the column name.

2.  Select the option Sort descending or Sort ascending.

MOC_CC.docx

Version: 1.36

Page 23 of 51

How to Operate the MES Operation Center

Group data in the table

You can group table data if the group by area is shown. If the group by area is not shown, you can show

the area via the context menu of the table header (Show/Hide group by box).

To group by a column, click the column header and drag it to the group by area. Multiple grouping is also

supported. If you have grouped table data, you can expand or collapse all groups. Open the context menu

of the grouped elements and select Full collapse or Full expand.

Copy table data

Use the shortcut CTRL + C to copy the values of the currently selected table row. Use the shortcut CTRL

+ ALT + C to copy the currently selected table cell.

Optimum column width (best fit)

Select the option Best fit in the context menu of the table header to adjust the column width of the selected

column to the optimum width. In this case, ”optimum” means that the column is as wide as the largest entry

in the selected column.

Optimum column width (all columns) / Best fit (all columns)

Click this function to adjust all columns to the optimum width.

Change column width

You can also change the column width using the mouse, i.e. move the space between two cells to the left

or right.

Show and/or hide columns and entire categories

Use  the  context  menu  function  Select  columns  to  show  and/or  hide  individual  columns  and  entire

categories. For this purpose, select the function in the context menu and then drag the required columns

and/or categories from the table to the pool or from the pool to the table.

Change the sequence of columns and categories

Also use the mouse to change the display order of columns and categories. To do so, drag the column or

category  you  want to move and drop it at the required location. The system will  indicate the location  to

which the column and/or category will be allocated when you release the left mouse button.

Filter table data

If  you  have  already  requested  data,  you  can  filter  the  data  displayed  in  the  table  by  entering  individual

criteria. To do so,  you can use the  AutoFilter function in the table  header. Click the filter  icon

 in the

column where you intend to set the filter and select the required filter option from the list; i.e. you select one

of the values available in the table or compose a combination of values in the user-defined filter.

MOC_CC.docx

Version: 1.36

Page 24 of 51

How to Operate the MES Operation Center

You  can  also  set  several  filters  in  different  columns.  The  table  footer  indicates  that  the  table  has  been

filtered and also shows the filter criteria. Select the function Edit filter on the right of the footer to open the

filter editor. Use the filter editor to create complex filter criteria across all columns. You may also open the

filter editor via the context menu of the table header.

Search box

Open the context menu of the table header and select the option Show search box. This option provides a

search box in the table. Use this box to quickly search and/or filter the requested data. Simply start typing

in this box and the system will only show those rows matching the data you typed. The more characters

you enter, the more you narrow down the result.

Filter row

Open the context menu of the table header and select the option Show filter row. This option provides an

additional row that is displayed below the table header. You can enter a search term in any column, and

the system will narrow down the displayed rows appropriately. The system supports wildcards. You can

also combine search terms in various columns to restrict the search result.

Show column totals for group

Open the context menu of the table header to select the Show column totals for group option. This option

enables you to show or hide a totals row for each group (subtotal).

This option is only available if a totals row is displayed in the application. The totals row per group

is  only  visible  once  you  have  saved  and  reopened  the  application.  You  cannot  show/hide  the

totals row according to your specific requirements.

Fix category (freeze)

Open the context menu of the table header and select the  Fix category  option  (freeze) to fix/freeze the

required  categories  on  the  left-hand  side  of  the  table.  The  fixed/frozen  categories  are  not  affected  by

scrolling; they remain static.

3.3.3  How to use simple charts

Some reports support charts that depend on the selections made. This means: the charts of the different

detail  applications  are  based  on  the  data  records  selected  in  the  relevant  table  and  only  refer  to  these

selected data records.

If you change the selected area, the chart presentation changes as well. Hold down the shift key to select

areas in the table. Use the CTRL key to select specific data records.

MOC_CC.docx

Version: 1.36

Page 25 of 51

How to Operate the MES Operation Center

3.3.4  Pivot tables in combination with pivot charts

Pivot tables aggregate extensive data volumes and present a clear overview. They are the basis for simple

and flexible evaluations.

Many  HYDRA  evaluations  are  based  on  tables  and  provide  a  parallel  visualization  of  the  data  in  pivot

charts.

A pivot table is structured as follows:

  Row fields (row header)

  Column fields (column header)

  Data fields

Row and column fields group the data contents. The data fields provide the content of the pivot table.

There are different aggregate functions to calculate the content of the data fields. The aggregate functions

are called as follows:

  Move  the  mouse  pointer  over  a  data  field  (in  the  screenshot  field  with  green  frame,  Failure

weighting).

  Right-click

  Select the menu item Summary function

The following fonctions are available to aggregate data:

  Sum (total)

MOC_CC.docx

Version: 1.36

Page 26 of 51

How to Operate the MES Operation Center

  Quantity

  Minimum

  Maximum

  Average (mean value)

  Corrected sample variance

  Variance

  Corrected standard deviation

  Standard deviation

  Ratio

The different aggregate functions are identical to the general functions of pivot tables. For this reason, only

the most frequent aggregate functions are described below.

To explain the aggregate functions, the data of the pivot application Failure mode analysis is used as an

example. Data field is the field Failure weighting. The content of the field Failure weighting is the number

of parts with a specific failure. The column field (column header) is the article designation and the row field

(row header) is the failure designation.

Failure designation

Failure weighting

Article designation: metal pen 4-color 10000m capacity

attr. failure

attr. failure

attr. failure

attr. failure

attr. failure

attr. failure

attr. failure

attr. failure

Article designation: Mirror left black

attr. failure

attr. failure

attr. failure

Sum (total)

1

1

1

1

1

2

3

7

1

1

1

MOC_CC.docx

Version: 1.36

Page 27 of 51

How to Operate the MES Operation Center

For each combination of row and column field, the system uses the basic data to calculate the

total of the values for this data field.

Result of the example:

Quantity

For each combination of row and column field, the system uses the basic data to calculate the

quantity (number) of data records that include a figure for this data field.

Result of the example:

Minimum

For each combination of row and column field, the system uses the basic data to identify the data

record with the smallest value for this data field.

Result of the example:

Maximum

For each combination of row and column field, the system uses the basic data to identify the data

record with the greatest value for this data field.

Result of the example:

Average (mean value)

MOC_CC.docx

Version: 1.36

Page 28 of 51

How to Operate the MES Operation Center

The system uses the basic data to identify the number of data records for each different

combination of row and column field. The result of the aggregate function Sum is then divided by

the number of data records identified using the basic data and is output as average (mean

value).

Result of the example:

Field list

The area of the optional evaluation fields can be extended using fields of the field list. To activate the field

list, right-click in the area of the optional evaluation fields. The following context menu opens.

Select the item Show field list to open a list of all available evaluation fields. Use drag and drop to drag the

required fields into the area of the optional evaluation fields. You can also move a field from the field list

directly into the area of the row, column or data fields. And vice versa, you can also use drag and drop to

move a row or column field into the field list. Also use drag and drop to move the row and column fields into

the area of the optional evaluation fields. To move a field into the field list, you must drag the field outside

of the area of the pivot table.

Use the menu item Show all fields to move all fields of the field list into the area of the optional evaluation

fields. And vice versa, use the menu item  Hide all fields to move all fields from the area of the optional

evaluation fields into the field list.

Filter editor

The function Show filter editor complements the selection criteria and helps to further narrow down the data

basis. You can configure different filters and combine different parameters. Click a parameter to open the

list of available parameters.

Example:

MOC_CC.docx

Version: 1.36

Page 29 of 51

How to Operate the MES Operation Center

Objective = display all failures for article "42887" or "42888".

Proceed as follows:

1.  Click "and" --> select "or"

2.  Click the "+" next to "or"

3.  Click "Finished on/at" --> select the field "article number"

4.  Click "Begins with" --> select "Equals"

5.  Click "Enter value" --> enter "42887"

6.  Click the "+" next to "or" (on top)

7.  Repeat steps 3 to 5 with number "42888"

8.  Click button Apply.

Field filter

Use the row and column fields to filter the data of the pivot table. You can also use the fields in the area of

the optional evaluation fields for filtering. If the mouse is moved over one of these fields, a small filter symbol

is  shown.  If  you  click  the  filter  symbol,  a  list  of  all  data  for  this  field  opens.  You  can  activate/deactivate

specific data in this list.

MOC_CC.docx

Version: 1.36

Page 30 of 51

How to Operate the MES Operation Center

Using the context menu of the data fields, you can also activate an ascending or descending sorting of the

values of the relevant data field. If you click the relevant row or column field, you can also select between

an ascending or descending sorting. Even after each row or column of the pivot table you can activate an

ascending or descending sorting. Right-click a row or column header to activate the sorting. In the context

menu that opens via right-click, you can also cancel the sorting.

Chart settings

The menu item Show settings activates a setting dialog to configure the pivot chart.

Top N

The option Top N restricts the data displayed in the chart to the contents of the row or column fields with

the "N" greatest values.

Using  the  context  menu  of  the  data  field  (Failure  weighting  in  the  example),  you  can  also  activate  of

deactivate the display of the "Top N" without opening the settings dialog for the chart.

Totals

Check the Totals option to display the row  Overall result in the pivot chart. If this option is enabled, the

selected cells are used to calculate the overall result.

Selection

MOC_CC.docx

Version: 1.36

Page 31 of 51

How to Operate the MES Operation Center

Check the Selection option and select a specific area to specify the contents of the tabular display. If the

option  Selection  is  enabled,  the  graphic  display  is  based  on  the  selected  cells.  If  you  check  the  Labels

option, you can display the total number for each bar.

The screenshot below illustrates these functions.

Columns

Check/uncheck the Columns option to switch between the graphic presentation of the relevant number of

columns or rows.

3.3.5  Print application contents

You can print all applications included in the system. The following options are available:

  Print all

Use this option to print all detail applications at once.

  Print

preview

Use this option to print a specific detail application. Use this option, e.g. to print out a chart in a

combined evaluation/report.

Both options provide the print preview. The print preview allows  you to adjust printing according to  your

specific requirements.

Use the user/group authorizations to disable the print permission.

MOC_CC.docx

Version: 1.36

Page 32 of 51

How to Operate the MES Operation Center

3.3.6  Export application contents

You can export table contents into other formats like Microsoft Excel or PDF. You can start the Excel export

directly from the context menu of the table header. Once you have selected the option, the Save as dialog

of  the  operating  system  is  shown,  where  you  can  select  the  storage  location  and  the  file  name  of  the

document.

If  you  would  like to export  table contents into the  PDF format, first select  the print preview  of the detail

application. Click the Export option in the print preview to start the export into the PDF format. Once you

have selected the option, the Save as dialog of the operating system is shown, where you can select the

storage location and the file name of the document.

Use the user/group authorizations to disable the export permission.

3.3.7  Shortcuts

Enter

Requests data in evaluations and overviews.

Ctrl-F4

Closes the current window (no editing dialogs).

Esc

Alt-F4

Closes an editing dialog after the security prompt/confirmation prompt.

For  editing  dialogs:  Closes  the  dialog  after  displaying  a  security/confirmation  prompt.

Otherwise: closes the application.

Ctrl-Tab

Changes the current window.

Tab, -Tab

cursor goes to the next or previous field .

,     Scrolls through the table row by row, the selection bar is positioned in the next row each.

,     In date fields, use these keys to increase or reduce the date by one day, month or year; it depends

on which part of the date is selected.



Deletes input in selection lists.

Use the user/group authorizations to disable the permission for using CTRL+C (copy).

MOC_CC.docx

Version: 1.36

Page 33 of 51

How to Operate the MES Operation Center

4  System functions

4.1  Configure the MOC user interface

4.1.1  Change the MOC layout

The  MOC  is  delivered  in  a  pre-defined  design  (skin).  We  also  deliver  a  selection  of  other  skins.

Consequently, you can choose a display format that meets your individual requirements.

You can configure the MOC skin in the MOC configuration that can be opened in the system menu: Extras

 Configuration. Please note that skins change the structure of user interface elements (controls).

4.1.2  Change number, time and date format

You can change the MOC formatting options according to your requirements. To do so, open the system

menu:  Extras   Configuration  and  choose  the  required  formatting  options.  The  options  offered  there

depend on the operating system in use and the relevant formats for numbers, times and dates apply for the

selected regional settings.

4.1.3  Change the language

You can change the MOC system language. To do so, open the system menu: Extras  Configuration and

select the required language. Please note that you can only select those languages that are licensed in the

system.

4.1.4  Change the type of table export

The  MOC  can  export  table  contents  to  Excel.  In  addition  to  the  current  Excel  versions,  the  MOC  also

supports the formats for Excel 97-2003. Normally, the MOC automatically identifies and uses the version

of the installed Office version. However, you can also set the required format manually. To set the format,

open Extras --> Configuration in the system menu and select the required format in Export tables as.

If you want to perform an export to computers where no Office package is installed,  you must

explicitly specify the format you want to use.

If MS Office is not installed and the table export type is set to "automatic", the export function is

not available.

4.1.5  Change the start menu

You can change the used MOC menu. You can find the available menu variations in the system menu in

Extras  Configuration. Use the menu editor to create individual menu variations.

MOC_CC.docx

Version: 1.36

Page 34 of 51

How to Operate the MES Operation Center

Select  the  Use  standard  menu  option  to  use  the  default  menu.  This  configuration  is  used  for  service

purposes.

4.1.6  Change the open mode for applications

You can specify if applications are opened only once or if several instances of an application should be

opened simultaneously when you open an application via the menu or transaction code. To do so, select

the required options in: Extras  Configuration  Application mode.

When you call an application from another application, the target application will always be opened in a new

window.

4.1.7  MDI mode

Use the MDI mode to specify if applications are managed as separate subwindows (mode MDI window) or

as tabs (mode tab) in the MOC program window.


Note

Activate MDI mode option

The menu item to select the MDI mode is only available if the function authorization

"mdimode.edit" is activated.

4.1.7.1  MDI window mode

If you select the MDI window mode, subwindows are like program windows. You can move them anywhere

and change their size.

MOC_CC.docx

Version: 1.36

Page 35 of 51

How to Operate the MES Operation Center

4.1.7.2

Tab mode

If  you  select  the  Tab  mode,  the  system manages  the  subwindows  as  tabs.  Use  drag  and  drop  and  the

docking options to position subwindows within the MOC program window. Additionally, you can also use

applications as separate windows outside the MOC program window, e.g. on a second screen.

MOC_CC.docx

Version: 1.36

Page 36 of 51

How to Operate the MES Operation Center

The selection of the MDI mode or the Tab mode is only available,if the extension mdimode_active

is activated.

4.1.8  Automatic update

You can specify here if you want to search automatically for updates. If the mode Find and import updates

automatically is enabled, the system searches for updates every time you start the program. If you select

the disabled option, the system does not search for updates automatically. You must select this mode if

Citrix is used. For information on the automatic updates, see section 4.10.2.

4.1.9  UAC mode

The UAC mode specifies if further authorizations are required to install updates. The option  automatic is

set by default. This mode checks if updates are installed in the Windows program directory. If this is the

case, additional authorizations are necessary. If the active option is selected, the update is always executed

with  extended  authorizations.  If  the  disabled  option  is  selected,  the  update  is  performed  with  the  user's

authorizations who started the MOC. If this user does not have sufficient authorizations, the update cannot

be installed and the process is cancelled.

MOC_CC.docx

Version: 1.36

Page 37 of 51

How to Operate the MES Operation Center

4.1.10  Change the type of date input

You can enter date values with or without separators in the MOC.
If you use separators to enter the date (set by default), you must use another key to switch to the next date

range, e.g. enter a separator or use the <right arrow> key, after you've entered a value for day, month, year

or time.

If you enter dates without separator, you switch automatically to the next date area, once the current area

(day/month/year)  has  been  completed.  Note:  If  you  use  this  input  type  and  enter  a  separator,  you  also

switch to the next date area.

Note: This is a global setting and applies to all date inputs on the MOC.

4.2  Menu editor

Use the menu editor to design menu variations according to your requirements. You can change existing

menus,  create  new  menus  or  delete  your  customized  menus.  You  need  the  function  authorization

"sysmenu" to open the menu editor. Start the menu editor in the system menu: Extras  Menu editor.

Load a menu into the configurator.

If you want to change an existing menu, load it into the menu editor. To do so, select the required menu in

the combo box and choose the "load" function. As a result, this menu is shown in the configurator. To open

the menu, click the "+" character in front of the top menu entry.

Edit a menu

Once you have loaded a menu into the configurator, you can edit the menu by dragging individual entries

from the overview list of functions to the menu (drag&drop). You can move existing entries within the menu.

Please note that you can position menu entries only on the level of sub menus. In case you have not defined

sub menus and you drag a menu entry to a category, the system generates a sub menu automatically. You

can still change the submenu labeling at a later point in time.

Create new menu

You create a new menu by entering the name of the menu you want to create in the combo box of the menu

selection. If you enter a name already used for another menu, this menu will be overwritten.

The  system  internally  manages  your  individual  menus  with  reference  to  your  user  name. This

means: If you edit an existing menu, which has not been generated by the logged in user, the

system  internally  generates  a  copy  with  reference  to  the  user  name.  You  then  edit  the  user-

specific copy. If you delete your copy, the system uses the original version of the menu.

Delete your customized menu

MOC_CC.docx

Version: 1.36

Page 38 of 51

You can delete your individual menu by selecting this menu in the combo box and clicking the delete button.

This deletion process initiated by the user deletes the locally saved menu. The other menus applying to the

How to Operate the MES Operation Center

whole system are not affected.

4.3  Professional mode

The Professional mode is no longer available in MW 3.1 from service pack 12 onwards.

  Most  of  the  functions  provided  by  the  professional  mode  are  now  integrated  as

"configuration" and are available without the Professional mode.

  Some  of  the  functions  are  integrated  as  "customization"  and  are  available  with  the

relevant  development

license

for

the  MES  Development  Suite.  The  category

"customization"  includes  functions  to  create  new  data  objects  in  the  fields  "dialog

configuration" and "MLE configuration". If these functions are not available on the MOC,

the tooltip or the online help can inform you which license is required.

In  MW  3.0,  the  Professional  mode  is  still  available  because  the  license  model  of  the  MES

Development  Suite  was  changed  in  the  early  days  of  MW  3.0  and  not  all  customers  with  a

"customization" authorization have activated the licenses in their system that are used today.

The  professional  mode  is  used  for  a  specific  system  customization.  But  to  use  the  functions,  specific

knowledge is required and the changes made imply a modification of the system. For this reason, only use

these functions if specific  conditions are fulfilled.  You can activate the professional mode in  the system

menu: Extras  Professional mode.

4.4  Development Suite

The Development Suite is a development environment that can be used by authorized and trained users to

create their own applications in the system. You can activate the Development Suite in the system menu

in: Extras  Development Suite.

4.5  Log window

The log window shows intrinsic operations in tabular form. Only use this function on instruction for service

purposes. You can activate the log window in the system menu in: Extras  Log window.

A new window opens showing the entries of the current log file. The log window dynamically reloads new

entries generated by the MOC.

If  you  enable  the  tailing  option,  the  tool  automatically  scrolls  to  the  latest  entries.  This  function  is  also

enabled if you scroll down to the end of the table. If you scroll up the table, tailing will be disabled.

MOC_CC.docx

Version: 1.36

Page 39 of 51

How to Operate the MES Operation Center

Use the option Clear log file to delete the contents of the current log file. Only use this function carefully.

This function is useful if you want to reproduce and record a specific behavior.

Use  the  shortcut  CTRL  +  F  to  open  a  search  form  you  can  use  to  browse  log  contents.  If  you  use  this

function in combination with the filter row of the table view, you can quickly find specific log entries.

4.6  Delete user settings

The system saves the user's changes made to the application, such as the column width of tables or the

alignment  of  applications  on  the  desktop,  in  the  user  settings.  You  can  delete  these  settings  to  reset  a

user's  settings  to  the  default  factory  settings.  In  an  intermediate  dialog,  the  system  shows  at  first  the

directory from which data is to be deleted. You delete all of a user's settings in the system menu in: Extras

 Delete user settings.

4.7  Delete user settings for the application

Use  this  function  to  delete  the  settings  of  an  application.  In  this  context,  only  the  settings  of  the  active

application are deleted. In an intermediate dialog the system shows at first the application name and the

directory from which the data is to be deleted. Delete the settings for the active application in the system

menu in: Extras  Delete user settings of the application.

4.8  System information

The  system  information  in  Help   System  information  provides  you  with  an  overview  of  the  system's

different settings and statuses. System information is usually used for service purposes. However, some

information  may  also  be  interesting  to  the  user,  such  as  the  transaction  codes.  You  can  request  the

following pieces of information in the single sections of the system information function:

System

The  System  section  shows  the  system's  configurations,  such  as  the  installation  location  and  current

information, like logged in users.

Authorization

The  Authorization  tab  shows  the  functions  that  may  be  authorized  in  the  system  as  well  as  their

authorization status.

Configuration

The Configuration tab shows the local configurations of the executed client instance.

Transaction codes

Use the transaction codes to start applications from the taskbar. The Transaction code tab shows which

transaction code is assigned to which application.

MOC_CC.docx

Version: 1.36

Page 40 of 51

How to Operate the MES Operation Center

Applications

The tab Applications shows the version details for each installed application.

Assembly versions

This tab shows the version of the installed system components.

4.9  Search for updates (HYDRA installation version lower than

SP9)

Use the system menu function: Help  Search for updates to update your local MOC installation.

4.9.1  Overview

Normally, it is sufficient to check in the dialog whether newer updates exist on the server by clicking the

Search for updates button. If this is the case, updates are downloaded automatically and can be installed

by clicking the Install button. In this context, the MOC is finished automatically and an external maintenance

program ("Updater") is started. Click the Start copy process button to start updating your installation based

on the downloaded files. Click the Start MOC option to restart the system, once the copy process has been

finished.

You can also update the MOC directly, i.e. without using an update server. To do so, you must

enter the directory including the updated version in the Update directory text field and click the

button Import updates.

4.9.2  Detailed description of the update process

The update process provides different options that are described in the below paragraphs.

Search for updates dialog

  The Search for updates since option specifies which files are to be downloaded from the server. In this

context,  the  date  is  compared  with  the  change  date  of  the  files  on  the  server.  The  date  is  updated

automatically once updates have been downloaded successfully.

  Use the All updates option to download all files available on the server.

  The Update server option includes the address of the server that provides the updates. By default, the

field is populated with the values specified when the MOC was installed or with values transferred from

the MOC configuration file. Make sure spelling is correct for any changes you make.

  The  Search  for  updates  option  connects  to  the  server,  searches  for  updates  and  downloads  these

updates,  if  necessary.  This  process  might  take  a  while,  subject  to  the  network  connection  and  the

amount of data to be downloaded. The downloaded files are then stored in the Update directory folder.

MOC_CC.docx

Version: 1.36

Page 41 of 51

How to Operate the MES Operation Center

  Use  the  Direct  update  import  option  to  start  the  external  maintenance  program  automatically  after

downloading the files.

  The  Update  directory  option  includes  the  directory  that  contains  the  updated  MOC  program  files.

Usually, this directory receives its data from the  Search for updates function. But you can also copy

data from other sources (e.g. CD).

  The Import updates option terminates the MOC and starts the external maintenance program.

Maintenance program Updater

The external maintenance program Updater updates the files pertaining to the local MOC installation. The

Updater  reads  the  data  from  the  specified  source  directory  and  writes  this  data  to  the  defined  target

directory.

Normally, the maintenance program makes changes to the Windows  Programs folder. For this

reason, Windows 7 shows a UAC message when starting the maintenance program to inform the

user that such modification is to take place.

You may choose from the following options:

  The Overwrite newer files option overwrites files in the target directory, even if they have a newer date

stamp.

  The Start button starts the copy process. In this context, all files from the source directory are copied

to the target directory if these files are more up-to-date than the existing files (or if the above option is

set). Files that could not be copied are shown in the section Uncopied files.

  The Start MOC button is available, once the copy process has been completed. The Start MOC button

closes the Updater and starts the MOC.

MOC_CC.docx

Version: 1.36

Page 42 of 51

How to Operate the MES Operation Center

Manual start of the maintenance program “Updater“

The external maintenance program Updater updates the MOC. Usually, the MOC starts the MOC Updater

but you can also start the Updater manually. In this case, you have to specify the following parameters.

target

Target directory for the update (MOC installation directory).

source

Source directory including the files for the update. You can also use shared networks.

startwithoutasking (optional)

Starts the update without confirmation.

appname

Name of the application that is to be updated.

appexe

Application that is to be started after the update.

Example (enter in one row):

C:\ProgramData\mpdv\moc\updates\updater.exe

-target='C:\Program Files (x86)\MPDV\HYDRA 8\MOC'

-source='C:\ProgramData\mpdv\moc\updates\files'

-appName=MOC

-appExe='C:\Program Files (x86)\MPDV\HYDRA 8\MOC\MOC.exe'

4.10  Search for updates (HYDRA installation version higher than

SP9)

Use  the  Update  function  to  update  your  local  MOC  installation.  This  update  process  starts  the  external

maintenance program MOC Updater. Use the MOC Updater to update your MOC installation.

If the MOC is installed in the Programs directory, you need administrative permissions to write

data to this directory. If you do not have these rights, Windows displays a message asking for

these permissions. Optionally, you can get write permissions for  the Programs directory. If you

have write permissions but no administrative rights, you have to configure the MOC UAC settings

accordingly (see 4.1.9 UAC mode).

If the update process overwrites or deletes files, the system additionally stores these files in the currently

logged

in

user's

Local

directory.  You

can

find

these

backups

in

the

folder

MPDV\MOCUpdater\Backup\<Date><Time>.

MOC_CC.docx

Version: 1.36

Page 43 of 51

How to Operate the MES Operation Center

You can find further information on how to configure the MOC Updater in the HYDRA document dealing

with the Maintenance Manager.

4.10.1  Manual update search

Click  Help    Search  for  updates  to  start  searching  for  updates.  The  search  for  updates  is  started

automatically, once you have started the MOC Updater. You can close the MOC Updater if no updates can

be found. Updates are downloaded if updates are found. Click Cancel to stop the download process.

If  a  newer  version  of  the  MOC  Updater  is  found  while  searching  for  updates,  the  MOC  Updater  will  be

updated first and then  the  search will be continued. Follow the instructions on the screen to update the

MOC Updater.

MOC_CC.docx

Version: 1.36

Page 44 of 51

How to Operate the MES Operation Center

.

After downloading the update package, you can install this package. Click Install to continue the process.

Close the MOC instance you want to update. The MOC Updater checks if an MOC instance is opened and,

if necessary, displays a dialog  window  where  you can close the active instance. The update process is

cancelled if you do not close the instance.

If the logged in user does not have the required authorizations to install the update, the MOC Updater tries

to  increase  the  user's  authorization  level.  A  message  is  displayed.  If  the  authorization  level  cannot  be

increased, an error message is displayed and the process is cancelled.

MOC_CC.docx

Version: 1.36

Page 45 of 51

Wait until the update is completed and then click Next.

How to Operate the MES Operation Center

Click Finish to complete the update. If you do not want to start the MOC, uncheck the checkbox. Click Open

archive to view a directory including the original files that have been changed by the update. Use these files

as a backup until they are deleted after the retention period (in days) specified in UpdateConfiguration.txt.

Click Finish to start the MOC.

MOC_CC.docx

Version: 1.36

Page 46 of 51

How to Operate the MES Operation Center

4.10.2  Automatic update search via MOC

The automatic update search starts as soon as you log on to the MOC. The MOC Updater is started without

active user interface. A tray icon indicates that the MOC Updater is active. Click the tray icon to show the

user interface of the MOC Updater. The MOC Updater terminates itself if no updates are found. If updates

are found, they are downloaded immediately to the computer. The following note in the taskbar informs the

user about the process.

Click the message in the taskbar to show the MOC Updater.

After downloading the updates, the user interface of the MOC Updater is activated and shown to carry out

the update process. See section 4.10.1 for further information on the process.

4.10.3  Manual start of the maintenance program MOC Updater

By default, the MOC starts the external maintenance program MOC Updater. The MOC Updater updates

your  MOC  installation.  But  you  can  also  start  the  program  manually  and  configure  the  following

parameters. The following parameters are supported:

Note that the command line to start the MOC Updater requires administrator rights or make sure that the

required rights are available.

Parameter

--updateMode

Description

Starts the MOC Updater in the update mode.

If you do not indicate this parameter, the MOC Updater

The  following  parameters  are  only

starts in standard mode or installation mode.

effective

in  combination  with  -

updateMode.

--rootDirectory

Target  path  to  the  MOC  directory  where  the  update

process is carried out.

e.g.: “c:\Program Files (x86)\MPDV\MOC\”

--MMhost

Address  of  the  Maintenance  Manager  used  for  the

update process.

e.g.: “http://MaintenanceManager:18080“

MOC_CC.docx

Version: 1.36

Page 47 of 51

--searchUpdates

Triggers  the  search  for  updates  after  starting  the  MOC

How to Operate the MES Operation Center

Updater.

If  you  add  –silent,  the  update  search  is  started  without

user interface. If updates are found, the user interface is

shown.  If  no  updates  are  found,  the  MOC  Updater  is

closed automatically.

--instantStart

Triggers  that  detected  and  downloaded  updates  are

installed automatically.

If  you  add  –silent,  updates  are  installed  without  user

interface and the MOC Updater is closed automatically.

--startApplicationAfterUpdate

Restart of the MOC after successful installation or update

by the MOC Updater.

As of MW 4.0pe and service pack 15, the 32-bit MOC is

started by default with this parameter.

Optionally,  you  can  additionally  specify  x86  or  x64  to

control whether the 32- or 64-bit MOC is started.

e.g.: --startApplicationAfterUpdate x64

--silent

Ensures  that  the  user  interface  is  not  displayed  during

the update process.

A specific tray icon indicates that the update process is

running.  Click  the  icon  to  activate  the  user  interface.

Additionally, the user interface is shown in cases of error

and/or if user interaction is required.

--UACmode (On/Off)

Off:

No  extended  authorizations  are  requested.  The  logged

in user requires write permissions for the target directory.

On:

Extended authorizations are always requested.

If  the  --UACmode  is  not  specified,  the  MOC  Updater

checks  if  extended  authorizations  are  needed.  If  the

target  directory  is  located  in  the  Programs  directory,

extended authorizations are always required.

--DE

Starts the program in German (default value is English).

MOC_CC.docx

Version: 1.36

Page 48 of 51

How to Operate the MES Operation Center

Example 1: Update process without user interface (enter in one row):

c:\Program Files (x86)\MPDV\MOC\update\MOCUpdater.exe

--updateMode

--searchUpdates

--instantStart

--silent

--MMhost "http://hydra:18080/"

--rootDirectory "C:\Program Files (x86)\MPDV\MOC"

The MOC Updater is started without active user interface and immediately starts searching for updates. If

updates are found, they are installed immediately and the MOC Updater is finished.

Example 2: Update process with user interface (enter in one row):

c:\Program Files (x86)\MPDV\MOC\update\MOCUpdater.exe

--updateMode

--searchUpdates

--MMhost "http://hydra:18080/"

--rootDirectory "C:\Program Files (x86)\MPDV\MOC"

The  MOC  Updater  is  started  with  active  user  interface  and  immediately  starts  searching  for  updates.  A

wizard guides the user through the update process. Use this example to repair a corrupt MOC installation

on a workstation computer.

4.11  Transaction codes for system functions

Use the MOC transaction codes to request various kinds of system information. The menu does not provide

all of this information. The below table describes the most important functions:

Use the function Help  System Information to open the complete list of transaction codes.

sqltest

Starts the “SQL tester” application you can use to send SQL queries to the

database. The function authorization “sqltest” is required.

Please  note:  These  SQL  commands  are  directly  sent  to  the

database where they are executed without further checking.

MOC_CC.docx

Version: 1.36

Page 49 of 51

How to Operate the MES Operation Center

sysClearCache

Clears the temporary file cache by way of which MOC accelerates access to

certain  files.  Once  the  command  has  been  executed,  the  cache  is  rebuilt

automatically, which might slow down the first access to specific functions.

sysClearWSCache

Calls  for  server  functions  (web  services)  are  buffered  temporarily,  if

necessary, to prevent data from being called too often. If the cache is cleared,

calling of this data is enforced once more before the cache time has expired.

sysclosewindows

Closes all open application windows.

sysdebugon

sysdebugoff

/

sysdebugon  enables  a  special  analysis  mode.  This  mode  is  used  when

problems occur to show additional information in a status row that opens and

to write this information to the log file.

sysdebugoff disables (hides) the status row and reduces the number of data

included in the log file.

syskeys

Shows a list of referenced but unavailable language keys as well as further

potential configuration problems.

sysDebugPep

Starts the application Workplace assignment in a special debug mode. The

debug mode remains active until the MOC is restarted.

sysDebugGrap

Starts the application Graphic planning in a special debug mode. The debug

mode remains active until the MOC is restarted.

sysproc

Used to access running MOC background processes.

sysproc shows running processes.
sysproc help shows potential parameters for the command.
sysproc stop <process name> | all stops the specified | all processes.
sysproc start <process name> | all starts the specified | all processes.
sysproc exec <process name> executes the specified process (once).

syssettings

Outputs a list of available system options. Use the file

MOC.ApplicationSettings.config to set these values.

These options control diverse internal MOC settings. Changes

may only be made according to instructions or by especially

trained staff.

syswslog

Opens the application to analyze the web service communication.

MOC_CC.docx

Version: 1.36

Page 50 of 51

How to Operate the MES Operation Center

4.12 Allocate and deallocate licenses

You can only use the available MOC functions (applications, buttons, etc.) if the system includes sufficient

licenses. A required license is only allocated, once you call the function. This can be the case, if you open

applications via the start menu or if you start a function by clicking a button in an application.

In general, licenses activate a set of functions. If you start a function pertaining to a specific license, this

license is allocated and all other functions assigned to this license will also be released.

The licenses allocated to a user are released once the user logs off from the system (i.e. you do not have

to close the MOC).

One license can cover several functions and one function can be assigned to several licenses.

4.13  Windows

This menu item includes a list of the open applications. If you click one of the entries, the relevant application

is activated.

Depending on the MDI mode selected (see section 4.1.7), the menu item also includes further functions to

place and structure MOC sub windows automatically. Use the menu item Reset window layout to reset the

layout and move the windows to their default place.

MOC_CC.docx

Version: 1.36

Page 51 of 51

