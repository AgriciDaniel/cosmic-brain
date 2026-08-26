Manual

MES Cockpit Services for
HYDRA Systems
MC-CSHS 3.2

Version 1.2.23049

Last changed on: 01.09.2020

MES Cockpit Services for HYDRA Systems

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-CSHS_32.docx

Version: 1.2.23049

Page 2 of 33

MES Cockpit Services for HYDRA Systems

Contents

1  MES Cockpit Services for HYDRA Systems ................................................ 4

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

4  User administration .................................................................................... 11

5  Function authorizations .............................................................................. 14

6  Function profiles ......................................................................................... 18

7  Responsibility Areas ................................................................................... 21

8  Responsibility Profiles ................................................................................ 23

9  Licensing .................................................................................................... 25

10  Management of Target Values ................................................................... 28

11  Assignment of Responsibility Areas (Workplaces) .................................... 32

MC-CSHS_32.docx

Version: 1.2.23049

Page 3 of 33

MES Cockpit Services for HYDRA Systems

1  MES Cockpit Services for HYDRA Systems

Purpose

The  function  package  MES  Cockpit  Services  for  HYDRA  Systems  provides  extensive  functions  to

evaluate and compare the data collected in HYDRA systems.

The following packages are available for the different evaluation purposes:

  Performance Analysis

For  further  information  on  the  Performance  Analysis,  refer  to  the  documents  MC-CPAM_32.pdf

and MC-CPAA_32.pdf.

  Performance Monitoring

For further information, refer to the documentation MC-PMC_32.pdf.

  Production Information:

For further information, refer to the documentation MC-CSI_32.pdf.

MC-CSHS_32.docx

Version: 1.2.23049

Page 4 of 33

MES Cockpit Services for HYDRA Systems

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 5 of 33

MES Cockpit Services for HYDRA Systems

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

By clicking "OK", you confirm the entered data and log in with the relevant user to the  selected system.

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 6 of 33

MES Cockpit Services for HYDRA Systems

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 7 of 33

MES Cockpit Services for HYDRA Systems

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 8 of 33

MES Cockpit Services for HYDRA Systems

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 9 of 33

MES Cockpit Services for HYDRA Systems

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

Can only  be started  in  the  editing mode. It  allows  inserting  new objects in  an  existing  dashboard in the

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

MC-CSHS_32.docx

Version: 1.2.23049

Page 10 of 33

MES Cockpit Services for HYDRA Systems

4  User administration

Overview

Menu

System administration  User administration  Users

Transaction code

user

Function authorization

user

On start of the MOC, the user name and password are requested. HYDRA offers the possibility to assign

individual authorizations to each MOC user for the separate sub-areas. All programs of the MOC, which

offer  the  possibility  to  correct  or  change  collected  data,  are  equipped  with  authorization  checks  for

functions  and  for  areas  of  responsibility.  The  system  does  the  same  check  for  evaluations/reports  and

information dialogs that display "confidential" data.

Prior to be allowed to work in MOC, the following activities must be performed for each user.

- Create the user

- Assign function authorizations

- Assign responsibility areas

Purpose

The User application can be used to create individual users.

Selection criteria

User

Unique user name

Field descriptions

User

A unique/unambiguous MOC user identification must be entered here. We recommend to use the

user names from mail programs or ERP programs that are already in use. This way, the respective

person can use the same user name in all programs.

Name

The name describes the user more precisely. Enter first and last name here.

Password

The  Password  field  is  used  to  define  the  password  by  which  the  user  can  log  on  to  the  HYDRA

system. The password is checked by the Password confirmation field. Both entries will be hidden.

MC-CSHS_32.docx

Version: 1.2.23049

Page 11 of 33

MES Cockpit Services for HYDRA Systems

locked

If the "locked" field is checked, a period can be defined during which the user cannot log on to the

system. If only  the start time for blocking is  defined  here, the user account  will stay  blocked from

this time on and if only the end time is defined for blocking, it will stay blocked until this time. If no

period is defined the user account will stay blocked.

Please note:

The user account can automatically be blocked according to the account lockout policies.

User has to change password when logging on the next time

The "User has to change password...” option will force the user to change the password to log on

again.

Company, Name, Person

These fields have been designed to assign the user to a person in the HR master.

SSO active, SSO user, SSO domain

These  fields  enable  Single  Sign  On  for  the  user.  In  case  Single  Sign  On  is  active,  the  Windows

user’s name and domain are used to identify and log in the relevant HYDRA user.

Please note:

-  In  combination  with  the  following  INI  entry,  the  fields  for  password  entry  /  password  change

request are hidden.

INI configuration to hide the password entry for SSO users:

Name =

SYSTEM

Section =

ExclusiveSingleSignOn

Key =   ISACTIVE

TRUE

[CHECKED]

Value =

Active =

Please

Copy function: SSO configuration of the user to be copied will not be copied.

note:

MC-CSHS_32.docx

Version: 1.2.23049

Page 12 of 33

MES Cockpit Services for HYDRA Systems

Toolbar

 Password rules

Link to the application: Password rules

Function authorizations

Link to the application: Function authorizations

Responsibility areas

Link to the application: Responsibility areas

 Synchronize users

Function authorization: wfusr

This function is used to synchronize the HYDRA users with the MES – workflow management

server.

These attributes are taken over:

MOC field

User

Name







MES workflow management

Login name

Full name

Person (e-mail, company) 

Attributes (InSign:ADDR_EMAIL)

Synchronization of users

If  the  Workflow  Management  is  in  use,  the  HYDRA  users  will  be  synchronized  with  the  users  in  the

Workflow Management system (Inspire) by way of the manual function "synchronize users" and a cyclic

Scheduler process.

These  users  are  required,  for  example,  in  order  that  the  HYDRA  users'  tasks  can  be  requested  and

displayed.  The  used  language  depends  on  the  language  ID  assigned  to  the  user  in  the  Workflow

Management  system  (Inspire).  If  the  language  is  to  be  changed,  this  has  to  be  done  in  the  Workflow

Management system.

MC-CSHS_32.docx

Version: 1.2.23049

Page 13 of 33

MES Cockpit Services for HYDRA Systems

5  Function authorizations

Overview

Menu

System administration  User administration  Function authorizations

Transaction code

faut

Function authorization

faut

Use

You  use

function  authorizations

to  control  which  user  can  access  or  execute  a  specified

application/function.

You  can  assign  individual  function  authorizations  for  specified  functions,  or  you  can  assign  Function

profiles  (defined  groups  of  authorizations).  All  applications,  which  include  editing  functions  for  recorded

data, are protected. Only authorized users can use the functions.

Integration

In the MOC client, the function authorizations are used to control the access to e.g. applications or fields.

Requirements

You must create the users before you can assign function authorizations.

Selection criteria

The application provides the following selection criteria:

User

Select the function authorizations that are assigned to a user.

Function

Select the function authorizations assigned to a user via the function.

MC-CSHS_32.docx

Version: 1.2.23049

Page 14 of 33

Field description

MES Cockpit Services for HYDRA Systems

Type "Function authorization" (single authorization)

Function

If you assign authorizations for a specific function, you can not only assign the authorization for the

function, but also for specific actions.

Action

To edit data, the following actions are available in the selection list:

  create

  copy

  edit

  delete

  view (= view only)

You can enter further actions. Actions are documented in the application that processes the special

actions.

If you assign a function without restriction to the possible data maintenance actions (the "Action"

field  remains  empty),  authorization  is  assigned  for  the  create/copy/change/delete/display

actions.

If you want to assign several actions of a function authorization to a user, then you must define

the required authorization with the respective actions.

The  actual  function  authorization  is  made  up  of  the  function  and  the  action  in  the  form

"<function>.<action>".

The  independent  field  Action  is  only  available  when  you  create  data  records.  You  can  easily

select the respective actions then. In the other detail applications, the  Action is included in the

MC-CSHS_32.docx

Version: 1.2.23049

Page 15 of 33

MES Cockpit Services for HYDRA Systems

field Function.

Example:

If you want to assign the authorizations  Create user and Edit user to a user, but not Delete, the

required authorizations are user.create and user.edit.

Authorization

The usual function authorizations do not process this field. You should set the value of this field to

the default value 1.

In special use cases,  you  can enter an authorization  level  or another key number for the function

authorization. The authorization level is rarely used and is then documented by the user where this

exception is required.

Function locks

To improve the protection  of personal  data,  Service  Pack 13 has introduced  the option  of locking

individual functions for specific users:

  Print

  Export, STRG+C

The  function  locks  are  available  for  the  application  "Persons".    You  can  add  functions  if  a

customization of the standard is required.

The field "Action" remains empty if you create function locks.

Available function locks

You can deactivate the print function in the HR master data application by assigning "pers_disprt"

to a user or profile (buttons "Print preview" and "Print all" are hidden and the associated keyboard

shortcuts are deactivated).

You  can  deactivate  an  export  in  the  HR  master  data  by  assigning  "pers_disexp"  (Excel  export

buttons  in  the  context  menu  and  the  export  buttons  in  the  print  preview  are  hidden.  Furthermore,

the key combination CTRL+C is ineffective for selected table cells).

Type "Function profile"

Function profile

You can assign an existing Function profile to a user.

MC-CSHS_32.docx

Version: 1.2.23049

Page 16 of 33

MES Cockpit Services for HYDRA Systems

MC-CSHS_32.docx

Version: 1.2.23049

Page 17 of 33

MES Cockpit Services for HYDRA Systems

6  Function profiles

Overview

Menu

System administration  User administration  Function profiles

Transaction code

fautp

Function authorization

fautp

Use

Function  profiles  are  used  to  easily  assign  authorizations  in  the  user  administration.  A  function  profile

consists of 1 – n function authorizations.

If you assign a function profile to a user, the user automatically obtains all authorizations included in the

profile.

If you change the profile subsequently, the changes are directly enabled when the user logs on the next

time.

Selection criteria

The application provides the following selection criteria:

Function profile

Select one or several function profiles, e.g. enter wildcards

Function

If you select the functions, all function profiles are displayed that include the individual function(s).

Field descriptions

Function profile

Function profile key

Function

Assigned function authorization

Name

Name of the function authorization

MC-CSHS_32.docx

Version: 1.2.23049

Page 18 of 33

MES Cockpit Services for HYDRA Systems

Action

To edit data, the following actions are available in the selection list:

  create

  copy

  edit

  delete

  view (= view only)

You can enter further actions. The actions are documented with the application that processes the

specific actions.

If you assign a function without restriction to the possible data maintenance actions (the "Action"

field  remains  empty),  authorization  is  assigned  for  the  Create/Copy/Change/Delete/Display

actions.

If you want to assign several actions of a function authorization to a user, you must define the

required authorizations with the respective actions for this user.

The  actual  function  authorization  is  made  up  of  the  function  and  the  action  in  the  form

"<function>.<action>".

The  independent  field  Action  is  only  available  when  you  create  data  records.  You  can  easily

select the respective actions then. In the other detail applications, the  Action is included in the

field Function.

Example:

If  you  want  to  assign  the  authorizations  Create  user  and  Edit  user  to  a  user,  but  not  Delete,  the

required authorizations are user.create and user.edit.

Authorization

The usual function authorizations do not process this field. You should set the value of this field to

the default value 0.

In special use cases,  you  can enter an authorization  level  or another key number for the function

authorization. The authorization level is rarely used and is then documented by the user where this

exception is required.

When  data  records  are  edited,  you  can  only  change  the  field  Authorization,  as  the  Function

profile  and  Function  are  key  fields  of  the  data  record.  This  means:  You  must  delete  the  data

record and insert a new one to change the field Function profile and/or Function.

MC-CSHS_32.docx

Version: 1.2.23049

Page 19 of 33

MES Cockpit Services for HYDRA Systems

Function locks

To improve the protection  of personal  data,  Service  Pack 13 has introduced  the option  of locking

individual functions for specific users:

  Print

  Export, STRG+C

The  function  locks  are  available  for  the  application  "Persons".    You  can  add  functions  if  a

customization of the standard is required.

The field "Action" remains empty if you create function locks.

Available function locks

You can deactivate the print function in the HR master data application by assigning "pers_disprt"

to a user or profile (buttons "Print preview" and "Print all" are  hidden and the associated keyboard

shortcuts are deactivated).

You  can  deactivate  an  export  in  the  HR  master  data  by  assigning  "pers_disexp"  (Excel  export

buttons  in  the  context  menu  and  the  export  buttons  in  the  print  preview  are  hidden.  Furthermore,

the key combination CTRL+C is ineffective for selected table cells).

MC-CSHS_32.docx

Version: 1.2.23049

Page 20 of 33

MES Cockpit Services for HYDRA Systems

7  Responsibility Areas

Summary

Menu

System administration User administration Responsibility areas

Transaction code

respa

Function authorization

respa

Usage

In addition to the function authorizations controlling the access to applications/ functions, there is also the

possibility to control the access to the data included in the system.

This  is  made  by  restricting  authorizations  to  responsibility  areas.  This  enables  customers  with  several

sites, for example, to protect configurations  that do only apply  to  one specific site against modifications

made by users of different sites.

The responsibility areas will not explicitly be created individually and then be assigned to the user. New

responsibility areas are directly created when an assignment is made to a user.

Integration

Responsibility areas can be created for several objects.

  Machines (resources)

  Staff

  Orders/ operations

Requirements

In order to assign responsibility areas, the users must be created.

Selection criteria

The following selection criteria are available in the application:

Originator

User that is created in the user administration.

Responsibility profile/ area

Name of the responsibility area or profile.

MC-CSHS_32.docx

Version: 1.2.23049

Page 21 of 33

MES Cockpit Services for HYDRA Systems

Field descriptions

Responsibility profile

Key of the responsibility profile

Responsibility area

Key of the assigned responsibility area

Authorizations

Authorizations define how the user may process or use the data.

Display:

The user is allowed to view the data.

Use:

Insert:

Edit:

Delete:

Only used in the PZE.

The user may create new data records.

The user may edit existing data records.

The user may delete existing data records.

MC-CSHS_32.docx

Version: 1.2.23049

Page 22 of 33

MES Cockpit Services for HYDRA Systems

8  Responsibility Profiles

Summary

Menu

System administration  User administration  Responsibility profiles

Transaction code

rpp.*

Function authorization

respp

Usage

Responsibility  profiles  are  used  to  facilitate  the  granting  of  rights  in  the  administration  of  responsibility

areas. A responsibility profile is comprised of 1 – n responsibility areas.

By the assignment of a responsibility profile to a user, the user will automatically receive all responsibility

areas included in this profile.

Later logins to a profile will have direct effects on the login without further modifications.

Integration

Responsibility areas can be created for several objects.

  Machines (resources)

  Staff

  Orders/ operations

Requirements

In order to assign responsibility areas the users must be created.

Selection criteria

The following selection criteria are available in the application:

Responsibility profile

Selection of the created responsibility profiles using the designation (wildcard entries are possible)

Field descriptions

Originator

User, to whom the responsibility area is to be assigned.

MC-CSHS_32.docx

Version: 1.2.23049

Page 23 of 33

MES Cockpit Services for HYDRA Systems

Responsibility profile/ area

It is possible to assign individual responsibility areas or such responsibility areas that are comprised

to profiles. For more information on responsibility profiles, see the manual on responsibility profiles.

Authorizations

Authorizations define how the user may process or use the data.

Display:

The user is allowed to view the data.

Use:

Insert:

Edit:

Delete:

Only used in the PZE.

The user may create new data records.

The user may edit existing data records.

The user may delete existing data records.

MC-CSHS_32.docx

Version: 1.2.23049

Page 24 of 33

MES Cockpit Services for HYDRA Systems

9  Licensing

Overview

Menu

System administration  System settings  Licensing

Transaction code

Function authorization

lic

lic

licov – License status report (as of SP7)

Purpose

The system administrator uses the Licensing function to view the available licenses and to license further

products.

Field descriptions

Category

Assigns the license to a logical category.

License date

Date when the license was created.

License key

Cryptic license key.

Product

Technical product key.

Product name

Product group the product belongs to.

Release

Valid release version.

Valid until

Date until which the license is valid.

Activation period until

Available as of MW 4.0pe.

Expiration date of the activation period for this license. If you have not activated the license by that

date, the license ceases to be effective.

Number

Shows the number of licenses.

MC-CSHS_32.docx

Version: 1.2.23049

Page 25 of 33

MES Cockpit Services for HYDRA Systems

As of MW4.0pe the licenses displayed in the table are highlighted in color:

-  Red: licenses that are not active.

-  Yellow: licenses that are active but not yet activated.

-  Green: licenses that are active and activated.

Toolbar

 License status

Calls the report for the license status (as of SP7).

 Request activation

As of MW 4.0pe.

Creates  the  activation  request  file.  This  file  includes  all  installed  licenses  and  current  system

parameters.

The following dialog opens:

like.

Click  Save  as  to  save  the  activation  request  file  anywhere  you

Click  Request  activation  by  e-mail  to  send  the  activation  request  file  to  the  Customer  Service

Center  of  MPDV  Mikrolab  GmbH  (CustomerServiceCenter@mpdv.com).  An  e-mail  with  pre-

populated values opens. Attach the activation request file manually to this e-mail (e.g. clipboard).

The  file  will  be  saved  automatically  if  you  did  not  save  it  explicitly  by  clicking  "save  as".  In  both

cases, a dialog box opens to indicate the storage location. The file is also available in the clipboard.

Then you receive the activation file by e-mail. Please note that this process can take one or several

business days. Save this file locally.

 Install activation file

As of MW 4.0pe.

Use  this  function  to  install  the  activation  file.  If  you  received  the  activation  file  by  e-mail,  save  it

locally. Select the locally saved activation file to activate your licenses.

After activation, the table view highlights all activated licenses in green.

MC-CSHS_32.docx

Version: 1.2.23049

Page 26 of 33

MES Cockpit Services for HYDRA Systems

MC-CSHS_32.docx

Version: 1.2.23049

Page 27 of 33

MES Cockpit Services for HYDRA Systems

10  Management of Target Values

Summary

Menu

System administration  MES-Cockpit  Management of target values

Transaction code

mctv

Function authorization  mctv

Usage

By defining target values, MES-Cockpit not only shows calculated KPIs (actual values) but also specified

target values to enable direct comparisons.

The  "management  of  target  values"  application  allows  editing  of  such  target  values  for  MES  Cockpit.

Target  values  are  defined  for  individual  KPIs  (definitions  of  key  performance  indicators),  a  period  and

dimension.

If target values are defined for the current period and current dimension of the evaluation diagram, they

will be displayed along with the actual values.

Only one target value may exist at a time for an object type and KPI.

If the "valid from"/"valid to" date is not set, the specified target value applies without limitation of

time.

The user is responsible for setting correct periods, if necessary.

These object types are available to define a target value:

  Workplace

Target values are specified for each workplace and displayed with the dimension "workplace"

in the evaluation diagram.

  Cost center

Target values are specified for each cost center and displayed with the dimension "cost

center" in the evaluation diagram.

  Workplace group

Target values are specified for each workplace group and displayed with the dimension

"workplace group" in the evaluation diagram.

MC-CSHS_32.docx

Version: 1.2.23049

Page 28 of 33

MES Cockpit Services for HYDRA Systems

  No selection

Target  values  are  specified  for  a  KPI  and  displayed  with  the  "time"  dimension  in  the

evaluation diagram.

Relevant objects can be defined subject to which object type is specified.

Calculation of target values

Target values  are defined  for a period  of time that can  be broken down to single days. If an evaluation

period is to be displayed for which no direct assignment exists, the displayed target value is determined

as follows:

Example: presentation of target values with different dimensions:

Workplaces

KPI

Valid from  Valid until  Target value

4711

OEE

2014-01-

2014-02-

0.8

01

10

4711

OEE

2014-02-

2014-03-

0.7

11

31

4711

OEE

2014-04-

2014-12-

0.8

01

31

Presentation and calculation of target values for the "month" dimension:

  Target value for January: 0.8

  Target value for February:

(10*0.8 + 18*0.7) / 28 = (8 + 12.6) / 28 = 0.73571 = 0.74

  Target value for March: 0.7

MC-CSHS_32.docx

Version: 1.2.23049

Page 29 of 33

MES Cockpit Services for HYDRA Systems

Graphic presentation:

Selection criteria

The following selection criteria are available in the application:

Object type

Object type of defining KPIs. The following object types are available:

  Workplace

  Cost center

  Workplace group

  No selection

Object

Depending on the selected object type, the relevant object may be selected in this field.

Site

KPI

Can only be filled out if the "workplace" object is searched.

The available KPI definitions may be selected.

MC-CSHS_32.docx

Version: 1.2.23049

Page 30 of 33

MES Cockpit Services for HYDRA Systems

Field descriptions

Site

Site which the target value applies for. Can only be edited if object type = workplace.

Object type

Type of object for which the target value is to be defined.

Possible selections from the drop-down list: workplace, cost center, machine group, no selection

Object

This  field  is  shown  depending  on  the  selected  object  type.  Subject  to  the  selected  object  type,  a

workplace, cost center, workplace group or no object may be selected. By taking over a workplace,

the "site" field is filled out automatically.

KPI

KPI for which the target value is to be defined

Valid from / until

Validity range of the target value (dates)

Target value

Specified target value as decimal value with a maximum of 2 decimal places

Modified by

User who last edited this entry

Modified on

Point in time when the data record was last edited.

MC-CSHS_32.docx

Version: 1.2.23049

Page 31 of 33

MES Cockpit Services for HYDRA Systems

11  Assignment of Responsibility Areas (Workplaces)

Summary

Menu

System administration  MES-Cockpit  Assignment of responsibility areas
(workplaces)

Transaction code

mcwpra

Function authorization  mcwpra

Usage

In addition to function authorizations specifying the access to applications/functions, it is also possible to

control access to data included in the system.

The  access  to  data  can  be  monitored  by  restricting  authorizations  for  responsibility  areas.  This  allows

customers with several sites or factories, for example, to protect configurations which only  apply  to one

site from being edited by users at other sites.

Integration

In  general,  responsibility  areas  can  be  created  for  different  objects  such  as  KPIs,  dashboards  and

workplaces. They are assigned to workplaces in this application.

Prerequisite

Users have to be created before responsibility areas can be assigned.

Selection criteria

The following selection criteria are available in the application:

Company

Name of the system from which the workplace was exported.

Workplace

Workplace number of exported workplaces.

Short description

Short name of the exported workplace.

Responsibility area

Responsibility area of workplaces.

MC-CSHS_32.docx

Version: 1.2.23049

Page 32 of 33

MES Cockpit Services for HYDRA Systems

Field descriptions

Company

Name of the system from which the workplace was exported. The name cannot be edited/changed.

Workplace

Workplace  number  of  exported  workplaces.  A  workplace  can  be  identified  unambiguously  by  a

combination of the company/site and the workplace number.

Short description

Short name of the exported workplace. The short name cannot be edited/changed.

Description

Description of the exported workplace. The description cannot be edited/changed.

Responsibility area

Responsibility  area that can be  assigned to a  workplace. The responsibility areas available  in the

system are listed in a drop-down box. Assignments are not overwritten if workplaces are exported

once more.

Individual  workplaces  are  exported  from  connected  systems.  For  this  reason,  additional

workplaces cannot be added manually.

All users are allowed to evaluate/assess the workplace if no responsibility area is defined.

MC-CSHS_32.docx

Version: 1.2.23049

Page 33 of 33

