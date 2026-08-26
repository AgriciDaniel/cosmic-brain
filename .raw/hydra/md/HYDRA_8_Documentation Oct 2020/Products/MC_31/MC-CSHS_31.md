Manual

MES-Cockpit Services for
HYDRA Systems
MC-CSHS 3.1

Version 1.0.23049

Last changed on: 01.09.2020

MES-Cockpit Services for HYDRA Systems

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-CSHS_31.docx

Version: 1.0.23049

Page 2 of 10

MES-Cockpit Services for HYDRA Systems

Contents

1  MES-Cockpit Services for HYDRA Systems ................................................ 4

2  General Operating Instructions for MES-Cockpit ......................................... 5

2.1  Home Screen ...................................................................................................... 5

2.2  Basic functions of the Home Screen .................................................................... 5

2.3  Further basic functions ........................................................................................ 7

3  MES-Cockpit - Overview of General Functions ........................................... 8

3.1  Minimized objects ................................................................................................ 8

3.2  Dealing with selection boxes ............................................................................... 8

3.3  Functions of the title bar ...................................................................................... 8

3.4  Selection status ................................................................................................... 9

3.5  Menu bar ............................................................................................................. 9

3.6  Search field ....................................................................................................... 10

MC-CSHS_31.docx

Version: 1.0.23049

Page 3 of 10

MES-Cockpit Services for HYDRA Systems

1  MES-Cockpit Services for HYDRA Systems

Purpose

The  function  package  MES-Cockpit  Services  for  HYDRA  Systems  provides  extensive  functions  to

evaluate and compare the data collected in HYDRA systems.

The following distinctions are made to evaluate the different pieces of information:

  Performance Analysis

Further  information  on  Performance  Analysis  can  be  found  in  the  documents  entitled  MC-

CPAM_31.pdf and MC-CPAA_31.pdf.

  Performance Monitoring

Further information can be found in the document entitled MC-PMC_31.pdf.

  Production Information:

Further information can be found in the document entitled MC-CSI_31.pdf.

MC-CSHS_31.docx

Version: 1.0.23049

Page 4 of 10

MES-Cockpit Services for HYDRA Systems

2  General Operating Instructions for MES-Cockpit

Depending  on  the  installed  version,  MES  Cockpit  provides  you  with  different  applications,  such  as  the

performance  analysis  or  current  overviews  with  different  functions.  This  section  deals  with  the  general

operation of MES Cockpit focusing on functions applicable to multiple applications.

2.1  Home Screen

The  "Home  Screen"  is  the  start  page  for  MES  Cockpit  and  enables  the  user  to  go  to  the  available

applications  (depending  on  the  license)  and  display  relevant  data.  The  user  can  switch  between  the

following applications:

  Performance analysis

Leads to the KPI analysis referring to several systems showing the trend of KPIs. Information and

KPIs are provided for the following objects: workplaces, orders and operations.

  Production Monitoring

Shows  an  overview  of  status  information  across  several  systems  on  the  objects  workplaces,

orders and operations including display of current shift KPIs for the selected objects.

  Workplaces/machines

Tabular  overview  of  workplaces/machines  to  visualize  the  current  machine  condition  (status,

point  in  time  since  when  the  status  is  applicable)  including  basic  information  on  the

workplace/machine. It is an application relating to systems.

  KPI monitor

When starting the KPI monitor, it first provides an overview of the whole site and enables to drill

down key figures in relation to cost centers, machine groups and the single object "machine". It is

an application relating to systems.

  Messages listing

List of planned maintenance orders (pool of orders including orders/OPs of the "maintenance"

category). It is an application relating to systems.

  Contact person

Search for contact partners within the company and check if they are available. It is an

application relating to systems.

2.2  Basic functions of the Home Screen

Besides  the  possibility  to  switch  to  the  available  applications,  the  home  screen  of  MES  Cockpit  also

provides the following functions:

MC-CSHS_31.docx

Version: 1.0.23049

Page 5 of 10

MES-Cockpit Services for HYDRA Systems

2.2.1.1

 Log on and off

You  have  to  log  on  to  MES  Cockpit  to  be  able  to  use  MES  Cockpit  functions.  Upon  calling  online

functions,  MES  Cockpit  automatically  logs  on  to  the  registered  HYDRA  system  and  relevant  data  is

shown.

HYDRA user

The logon requires a user created for MES Cockpit and a relevant password.

The  "change  password"  function  changes  the  password  defined  for  the  user  to  log  in  to  the  single

systems via the web interface.

Please note that most of the browsers save the login name and often offer to save the relevant

password.  This  function  is  not  part  of  MES  Cockpit  and  therefore  cannot  be  disabled  in  MES

Cockpit.

Language

Using the radio group buttons, it is possible to switch between the different languages that are available

for the user. MPDV can provide additional language packs on request.

Settings

By the "system" selection list, you can choose the HYDRA system you intend to work with. The available

systems are defined during implementation and/or by your administrator.

By clicking "OK", you confirm the entered data and log in with the relevant user to the selected system.

An error message occurs, if the login fails.

2.2.1.2

Help

MES Cockpit provides a context-sensitive help function, i.e. the content of the displayed help file depends

on the contents of the current screen.

2.2.1.3

 Logout

By clicking the "logout" button the user logs off from MES Cockpit. The user has to log in once more to

switch to the other applications.

2.2.1.4

 Back

By using the MES Cockpit icon or the arrow in front of it, it is possible to go back step by step.

MC-CSHS_31.docx

Version: 1.0.23049

Page 6 of 10

MES-Cockpit Services for HYDRA Systems

2.3  Further basic functions

In addition to the above-described basic functions, the applications provide further basic functions:

2.3.1.1

 Home

The "Home" button leads the user back to the home screen.

2.3.1.2

Update

The displayed page is refreshed.

2.3.1.3

Filter

The  filter  allows  restricting  the  data  displayed  online.  This  function  cannot  be  used  in  the  Performance

Analysis.

MC-CSHS_31.docx

Version: 1.0.23049

Page 7 of 10

MES-Cockpit Services for HYDRA Systems

3  MES-Cockpit - Overview of General Functions

3.1  Minimized objects

Besides the displayed objects, a document may also include minimized objects that are hidden.

Such objects can be shown by double clicking the relevant icon or the title.

3.2  Dealing with selection boxes

The individual selection boxes/list boxes provide the user with the following options and/or functions:







Sort: The table is sorted in ascending or descending order by clicking the displayed arrow.

Select: By clicking the little down arrow, contents are shown as in a drop-down box and values

may directly be selected. A search by entering letters can be carried out.

Search:  The  "magnify"  function  opens  a  search  field  where  the  searched  term  may  be

entered.

o  Search using wildcards: Wildcards (*) may be used when searching for a term.

o  Fuzzy  search:  The  search  term  is  preceded  by  a  tilde/swung  dash  (~)  for  the  fuzzy

search.

o  Normal search: no additional characters are added to the search term. A normal search

without wildcards is performed.

The search dialog opens even if the object was selected and letters were entered.

Not all of the above-mentioned functions are available in all list boxes/selection boxes.

3.3  Functions of the title bar

These functions are available in the title bar of individual evaluation objects:







 Unselect

All selections made that are not locked will be canceled.

 Export to Excel

Current values for displaying the evaluation object are inserted in a separate Excel file.

 Change to different diagram

The display can switch to the presentation selected for the evaluated object. The position of the

"change" icon can be chosen in the title bar or the diagram.



 Minimize

The diagram is minimized and can be displayed again by double clicking.

MC-CSHS_31.docx

Version: 1.0.23049

Page 8 of 10

MES-Cockpit Services for HYDRA Systems



 Menu

All functions of the evaluated object are displayed in a drop-down menu where they may also be

selected.

Not all of the above-mentioned functions are available in all list boxes/selection boxes.

3.4  Selection status

All selections and restrictions made are displayed in the selection status where they may also be edited

or deleted. It provides a general overview of individual selection options.

These activities can be performed in the selection status:





:  By  clicking  the  displayed  rubber/eraser  icon,  the  complete  restriction  is  deleted.  All  other

restrictions remain intact.

:  By  clicking  the  arrow,  additional  or  different  objects  of  the  object  type  can  be  selected.  A

search by entering letters can be carried out.

3.5  Menu bar

The menu bar is available on each dashboard and provides the following functions:

3.5.1.1

Clear

All  selections  made  are  removed  and  data  is  displayed  without  restriction  and  selection.  However,  this

might lead to the fact that no KPIs are selected in the evaluation/report and no data can be displayed.

3.5.1.2

Back/Forward

Scrolls backward and/or forward in the selections made on a dashboard.

3.5.1.3

Undo/redo layout

Changes made to the layout (changes can only be made if relevant authorizations are available) can be

removed and/or restored.

3.5.1.4

Lock/unlock all selections

The  selections  made  are  locked  and  cannot  be  removed  by  the  "clear"  function.  However,  additional

selections can still be made.

MC-CSHS_31.docx

Version: 1.0.23049

Page 9 of 10

MES-Cockpit Services for HYDRA Systems

3.5.1.5

Selections

The box of the selection status listing all selections made is displayed.

3.5.1.6

Show/hide notes

Notes are shown and/or hidden  will be used in future in MES-Cockpit

3.5.1.7

Repository

Can only be started in the editing mode. It represents the properties of individual objects.

3.5.1.8

New sheet object

Can only  be started  in  the  editing mode. It  allows  inserting new objects in  an  existing  dashboard in the

web.

3.5.1.9

Select fields…

Can only be started in the editing mode and shows a list of available fields.

3.5.1.10

Add/remove bookmarks

Adding and removing bookmarks. A bookmark saves the selection and/or restrictions made, which is/are

required  once  more  or  has/have  to  be  restarted.  The  stored  bookmarks  are  available  in  the  "select

bookmark" option where they may be selected by the user.

3.5.1.11

Select report

This menu item opens created and integrated reports.

3.6  Search field

The integrated search field looks for the entered term in all objects and data of the document. The results

are shown in a list below the search field. The user may also select data from this list.

MC-CSHS_31.docx

Version: 1.0.23049

Page 10 of 10

