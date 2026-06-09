Manual

HYDRA@WEB Project Time
Recording
WEB-PR 8.1

Version 1.0.23049

Last changed on: 02.09.2020

HYDRA@WEB Project Time Recording

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEB-PR_81.docx

Version: 1.0.23049

Page 2 of 24

HYDRA@WEB Project Time Recording

Contents

1  HYDRA@Web Project Time Recording - Overview ..................................... 4

2  General HYDRA@WEB Operating Instructions ........................................... 5

2.1  Basic functions .................................................................................................... 5

2.2  Navigation ........................................................................................................... 7

2.3  Use of functions .................................................................................................. 9

2.4  Print .................................................................................................................. 15

3  Project Time Recording using HYDRA@WEB .......................................... 17

WEB-PR_81.docx

Version: 1.0.23049

Page 3 of 24

HYDRA@WEB Project Time Recording

1  HYDRA@Web Project Time Recording - Overview

Possible fields of application

Hours  performed  for  project  orders  can  be  uploaded/confirmed  via  the  Intranet  or  Internet  using  this

function package.

Implementation notes

The function package is used if:

  employees are to upload their hours performed for project orders



time recording is not to be performed by logging on and off, as it is normally the case at shop floor

terminals, but by entering an absolute duration



this upload is to be performed using an Internet browser

Integration

This  function  package  is  based  on  the  HYDRA  shop  floor  data  collection  (function  package  shop

floor/order data management).

Functions

  Transfer of released project orders from an ERP system by the HYDRA ERP interface** or from

SAP PS using the SAP interface CA-PDC / CC4**.

  Creation of project orders in the MES Operation Center**.

  Display  of  the  pool  of  orders  (=  order  list  including  different  selection  options)  with  all  project

orders assigned to an employee that can be uploaded using HYDRA@WEB.



Input dialog for the upload of durations relating to projects (relating to orders). Data are posted in

the HYDRA database.

  Evaluation and display of uploaded data (durations) including cancellation function (deletion of log

records generated from the upload).

  Evaluation and editing options for data on project orders in the MES Operation Center, e.g. order

information, order overview, maintenance of postings**.

  Upload of recorded times to an ERP system using the HYDRA ERP interface** or SAP PS using

the SAP interface CA-PDC / CC4**.

** subject to the license.

WEB-PR_81.docx

Version: 1.0.23049

Page 4 of 24

HYDRA@WEB Project Time Recording

2  General HYDRA@WEB Operating Instructions

Depending  on  the  scope  of  your  installation,  HYDRA@WEB  gives  you  access  to  various  applications

such  as  the  Web  portal  or  the  Web  client  with  an  array  of  different  functions.  This  chapter  provides  a

description of the general use of HYDRA@WEB and focuses on the functions typical in all applications.

2.1  Basic functions

In  the  "Function"  section  in  the  navigation  menu  of  each  HYDRA@WEB  application  you  are  given  a

description of the basic functions listed below.

2.1.1.1

Login and logoff

You  will  need  to  log  in  to  a  HYDRA  system  in  order  to  make  use  of  the  HYDRA@WEB  functions.

Depending on the application, there are several different login methods.

System selection

From the "System" selection list, you can select the HYDRA system that you would like to work with. The

available systems are defined during initial installation or by your administrator.

Log in with a user name

The  user  logs  in  by  entering  the  name  of  a  user  name  created  in  HYDRA  and  the  corresponding

password. A user logs in this way, for example, when logging into the Web client application.

Keep  in  mind  that  most  browsers  remember  the  user  name  and  often  also  offer  to  store  the

corresponding password. This is not a HYDRA@WEB function and for this reason it cannot be

deactivated there.

Log in with a personnel number/ badge number

When  logging  in  using  a  personnel  number  or  a  badge  number,  you  will  require  the  pin  code  that  was

entered  in  the  master  data  for  the  corresponding  person.  So,  this  kind  of  log  in  does  not  require  that  a

HYDRA  user  was  created.  A  user  logs  in  this  way,  for  example,  when  logging  into  the  Web  portal

application.

Logoff

You close an application by logging off - you will only be able to use the application's functions again after

logging back in.

WEB-PR_81.docx

Version: 1.0.23049

Page 5 of 24

HYDRA@WEB Project Time Recording

If  an  application  is  not  used  for  a  longer  period  of  time,  the  user  may  be  logged  off

automatically.

2.1.1.2

Language selection

From  the  list  "Language  selection"  you  can  define  in  which  of  the  languages  installed  you  would  like

HYRDA@WEB to be shown.  Upon request, MPDV can make additional language packages available.

2.1.1.3

Help

HYDRA@WEB  provides  you  with  context  dependent  help  functions,  i.e.  the  content  of  the  help  file

displayed focuses on the content of the current window.

If  a  help  file  is  available  for  the  current  content,  a  link  will  be  displayed  accordingly  in  the  "Function"

section of the navigation menu.

WEB-PR_81.docx

Version: 1.0.23049

Page 6 of 24

HYDRA@WEB Project Time Recording

2.2  Navigation

HYDRA@WEB  offers  different  options  to  switch  between  different  functions.  Among  them  is  the  menu,

the side navigations and the links from the applications themselves.

2.2.1.1

Navigating in the menu

Depending on which application is active, from the navigation menu on the left hand side of the browser

window, you can go to the available functions and the function that is currently called up in other pages.

In some cases, the available functions may be divided into submenus. To save space, only the functions

of the current menu are visible.

Keep in mind that the menu adapts itself dynamically to the current function. For example, oftentimes it is

only possible to go to a detail function if data has already been selected in the current (overview) function.

Illustration  1:  The  go-to  option  in  the  "Graphic  order  shift  log"  detail  function  does  not  appear

until  after  at  least  one  data  record  was  highlighted  in  the  "Order  shift  log"  in  the  Web  client

application.

2.2.1.2

Page navigation

For  performance  reasons,  the  number  of  data  records  that  can  be  shown  on  one  page  in  the  browser

when a query is made in a function is limited (by default to a maximum of 150 data records).

If a data query delivers more than the maximum number of data records, the results are divided up onto

several pages. The data from the subsequent pages are loaded into the local browser by the server only

after the corresponding page is selected in the page navigator.

WEB-PR_81.docx

Version: 1.0.23049

Page 7 of 24

HYDRA@WEB Project Time Recording

Illustration 2: In this illustration, 330 data records were calculated as a result of the data selection;

shown  here  are  the  first  150  records.  By  clicking  on  the  "2"  in  the  page  navigator,  the  next  150

data records are displayed, etc.

The  number  of  data  records  displayed  is  controlled  via  the  URL  of  the  displayed  web  page.

Where  necessary,  they  can  be  modified  manually  so  that  when  data  is  queried,  the  page

displays  either  a  larger  or  smaller  number  of  data  records.  For  example,  Illustration  2  was

generated by the following URL.

<server>/WebClient/IndexData/0/PageSize/150?query=&applicationName=_OrderRelatedStatistics

However,  you  can  also  easily  modify  the  parameters  for  PageSize  in  the  URL  in  order  to

display all of the data records on one page.

<server>/WebClient/IndexData/0/PageSize/400?query=&applicationName=_OrderRelatedStatistics

Keep  in  mind  that  if  you  modify  the  sort  sequence  by  clicking  on  the  column  header  this  will

reset the page counter to 1 (cf. 2.3.1.4).

2.2.1.3

Favorites

HYDRA@WEB  is  a  web  application,  which  is  why  navigation  between  separate  pages  involves  URLs

being transmitted to the web server, which then transmits the web page that matches the URL to the local

browser.  When  data  is  queried,  in  addition  to  the  selected  function,  the  web  server  also  transmits  the

parameters that result in the data selection.

This is why HYDRA@WEB makes it easy to use the favorites function of your browser to store queries as

links  in  the  browser's  favorites  bar,  which  can  then  be  called  up  from  there  at  a  later  date  by  simply

clicking on them. Of course, you can also send these lines, by e-mail for example.

WEB-PR_81.docx

Version: 1.0.23049

Page 8 of 24

HYDRA@WEB Project Time Recording

Illustration 3: In this application, first the machine history for machine  "50612" was saved in the

browser's  favorites  bar  as  a  link  for  the  time  period  between  "1.1.12"  to  "1.31.12".  After  logging

into the system, this evaluation was then reestablished from the favorites bar.

Keep in mind that the links will only deliver data if the user has logged himself into the relevant

HYDRA system first. If a link is called up without logging in first, the system will display the login

page.

The system does not store the results of the evaluation, but instead it saves the parameters that

led to the evaluation. So, if this link is called up at a later time, the results may be different.

2.3  Use of functions

This  section  illustrates  the  common  control  elements  of  the  different  HYDRA@WEB  functions.  In

particular,  the  chapter  will  discuss  how  to  select  data,  how  to  use  selection  dialogs  and  how  to  go  to

overviews in detail functions.

2.3.1.1

Data selection

Many functions have a selection area to select data in order to control the quantity of data displayed.

WEB-PR_81.docx

Version: 1.0.23049

Page 9 of 24

HYDRA@WEB Project Time Recording

In  some  cases,  HYDRA@WEB  supports  the  ability  to  enter  selection  parameters  using  special  entry

elements (e.g. to enter dates) or by using selection dialogs (cf. Section 2.3.1.2).

After entering the selection parameters in the input fields in the selection  area, the data query is started

by clicking on the arrow icon and the results are then shown in the data area.

If the query returns more data records than the maximum number of results that can  be shown on  one

page, the results are divided onto several pages (s. Section 2.2.1.2).

2.3.1.2

Selection dialogs

Selection dialogs are a tool to help you enter selection parameters for elements available in the system,

such as when entering workplace numbers.

If a selection dialog is available for an input field, a magnifier icon is shown behind the input field. Clicking

on the magnifier icon will open the selection dialog, from where you can calculate the desired value.

WEB-PR_81.docx

Version: 1.0.23049

Page 10 of 24

HYDRA@WEB Project Time Recording

Illustration 4: In a selection dialog (here using selecting workplaces as an example) you can then

in  turn  first  limit  the  number  of  data  to  be  displayed  by  entering  selection  parameters  and  then

click on the arrow icon to send the selection query to the server. After the results are displayed,

click on the desired data record; this will close the window and the relevant value will be assumed

in the input field.

2.3.1.3

Linking/ drill down

In  certain  (overview)  functions,  there  is  the  option  to  go  to  a  detail  function  from  the  current  page  (drill

down) If only the current data record can be transmitted as the basis for the drill down, then a magnifier

icon will appear in front of this data record (cf. Illustration 5).

WEB-PR_81.docx

Version: 1.0.23049

Page 11 of 24

HYDRA@WEB Project Time Recording

Illustration  5:  From  the  current  data  record,  go  to  a  detail  function  by  clicking  on  the  magnifier

icon, here for example the "Attendance overview" function.

If the function supports transmitting several data records, then the desired data records are selected by

clicking on the check boxes and the go-to function is shown in the menu. (cf. Section  2.2.1.1). You can

also select all of the data records displayed by clicking on the check box in the selection column header.

WEB-PR_81.docx

Version: 1.0.23049

Page 12 of 24

HYDRA@WEB Project Time Recording

Illustration 6: In this illustration, all of the displayed data records were highlighted by clicking on

the header line and then the detail function "Graphic efficiency report" (dynamically shown in the

menu) was called up.

Only  the  data  records  displayed  can  be  transmitted  to  a  detail  function.  So,  if  a  query  returns

data records on more than one page, only those data records can be transmitted to the detail

function that are displayed on the current page.

2.3.1.4

Sorting in table view

When  in  table  view,  the  way  the  data  records  are  sorted  can  be  changed  by  clicking  on  the  column

header. The first time you click on a header, the data records are sorted in ascending order. If the data

records are already sorted based on a column, then you will reverse the sorting sequence if you click on

the same column again.

Keep in mind that the sorting relates to all of the data records that match the data query and not

to  all  of  the  data  records  currently  being  displayed.  Any  change  to  the  sorting  sequence  will

therefore then return the page counter to page 1 if several pages are shown.

WEB-PR_81.docx

Version: 1.0.23049

Page 13 of 24

HYDRA@WEB Project Time Recording

Keep in mind that other than the sorting sequence, the table view cannot be modified by a user

activity. Only the customizing option will allow columns to be moved, shown, and hidden or their

width to be modified.

WEB-PR_81.docx

Version: 1.0.23049

Page 14 of 24

HYDRA@WEB Project Time Recording

2.4  Print

HYDRA@WEB does not have its own print function, but instead uses the print function in your browser

(called up, for example, by clicking on CTRL + P).

Keep  in  mind  that  only  the  data  area  is  printed  (so,  not  the  menu,  for  example)  and  only  the

data records that are currently being displayed.

Illustration 7: Example for printing out a function with table view

WEB-PR_81.docx

Version: 1.0.23049

Page 15 of 24

HYDRA@WEB Project Time Recording

Illustration 8 Example for printing out a detail function with graphics

WEB-PR_81.docx

Version: 1.0.23049

Page 16 of 24

HYDRA@WEB Project Time Recording

3  Project Time Recording using HYDRA@WEB

Usage

Completion  confirmations/uploads  document  the  status  of  operation  processing  and  allow  for  forecasts

being  made  on  how  the  project  will  develop.  Exact  completion  confirmations/uploads  are  required  to

ensure realistic and exact project planning and project tracking.

The following data may be entered for uploads:

  Point in time

  Actual duration



Indicator on the upload status (partial upload, final upload)

Integration

The  recorded  uploads  are  integrated  in  BDE  (shop  floor  data  collection)  and  can  be  evaluated  in  most

BDE functions of MOC.

Prerequisite

These configurations have to be made or the following requirements need to be met to be able to capture

project times:

WEB-PR_81.docx

Version: 1.0.23049

Page 17 of 24

HYDRA@WEB Project Time Recording

User Administration

Create the user WEB and block this user within the user administration.

Then  assign  the  responsibility  areas  of  the  workplaces  recorded  by  project  time  recording  using

HYDRA@WEB to this user.

This user does not require any function authorizations.

Workplace configuration

The following has to be configured for workplaces onto which project times are to be posted/uploaded:

  The “posting onto OPs that are not logged on” option has to be set.

  Sequencing list: The sequencing list setting should be set to "M" (pool of machines/workplaces) or “H”

(group control). Please also consider the notes on the planning process in the “work plan” section.

For these workplaces project time may ONLY be uploaded/posted by HYDRA@WEB. Postings

like “log OP on’” or “log OP off” using the terminal or MOC are not supported.

HR master

Two issues have to be taken into account when persons/users are configured:

  A pin code needs to be assigned, in order for a person to be able to log on to the system. The user

may authenticate to the system either by using the badge number and the pin code or the company

with personnel number and pin code.

  A (master) workplace must be assigned to the person who is supposed to log on to the system in the

BDE  tab  of  the  HR master.  The  operations  for  which  the  person  is  to  perform  the  uploads/postings

have to be planned for this workplace.

Work plan

  To  provide  for  differentiated  uploads,  the  order  including  its  operations  should  correspond  to  the

individual  activities  that  are  to  be  carried  out  within  the  project  /  order  or  to  the  activities  which  are

possible within the scope of the project / order.

  The orders are to be created with order type “5 – project order”. Only operations of the order type 5

may be collected using this application.

  Each operation which is to be uploaded has to be planned for a corresponding workplace. Thus, the

operations either should already be planned (in detail) by the ERP/PPS system or by using one of the

planning functions provided by HYDRA.

WEB-PR_81.docx

Version: 1.0.23049

Page 18 of 24

HYDRA@WEB Project Time Recording

Provided that planning is performed using HYDRA shop floor scheduling (HLS) or graphic

order sequencing (GAV), the remaining run time formula needs to be defined so as for it to

be reduced based on the actual duration (time posted onto RPA 11).

Procedure for uploads using HYDRA@WEB

Proceed as follows to capture uploads/confirmations:

1.  Open the menu item "order list"

2.  Select the operation for which uploads are to be made from the order list

3.  Enter the data to be uploaded.

These steps are described in more detail in the paragraphs that follow.

The menu item "direct posting" allows for data to be entered directly. In this case, specific input

fields are not pre-assigned and have to  be  entered manually. It is recommended, however,  to

enter data using the menu item "order list".

Select the operation

There are the following options to find the requested operation:

  Search by the order number (including wildcard characters).

  Search by the project order (including wildcard characters).

  Search by the operation's article (including wildcard characters)

  Search by the operation's OP designation (including wildcard characters).

In  general,  only  operations  of  the  (master)  workplace  defined  for  the  person  are  selected.  If  any  other

workplace is entered, no operations will be shown.

If no workplace is defined for the person and no workplace is entered, no data will be shown.

If  no  workplace  is  defined  for  the  person  and  a  workplace  is  entered,  the  operations  planned  for  this

workplace will be shown.

WEB-PR_81.docx

Version: 1.0.23049

Page 19 of 24

HYDRA@WEB Project Time Recording

For these workplaces project time may ONLY be uploaded/posted by HYDRA@WEB. Postings

like “log OP on’” or “log OP off” using the terminal or MOC are not supported. The system does

not check this!

If  necessary,  enter  the  required  selection  criteria.  Please  consider  case  sensitivity.  All  fields  support

wildcard characters (except for the “workplace” field). As soon as data are requested

, the operations

matching the entered selection criteria are searched.

If  operations  are  found,  they  will  be  shown  in  a  list  (150  operations  per  page).  The  following  data  are

displayed:

Field

MES order number

Meaning

Combined order/ OP number.
The combined order/sequence/OP number will be shown here if
the system is configured for sequence processing.

Please note that only orders/operations of the order

type  5  are  displayed  in  general.  Irrespective  of

whether  or  which  further  selection  criteria  have

been entered.

Project

Article

Project number

Article number (from the operation)

Article designation

Article designation

OP designation

Operation designation

Workplace

Group

Workplace for which the operation is planned.

Workplace group for which the operation is planned.

Now choose the operation onto which you would like to post/upload data by clicking the button

 in the

left column of the relevant data row.

Input of upload data

Enter your project times in the dialog "enter upload".

Provided that the order search function was used beforehand, the "MES order number" and  “workplace”

fields are automatically assigned the data from the overview. In addition to this, the date and time fields

are assigned with current values (current point in time).

Now enter the data for the upload:

Field

Comment

WEB-PR_81.docx

Version: 1.0.23049

Page 20 of 24

HYDRA@WEB Project Time Recording

Field

Comment

MES order number

Workplace

Date

Time

Duration

Finish operation

Person

Combined order/ OP number.
The combined order/sequence/OP number is to be entered
here if the system is configured for sequence processing.

If no workplace is entered, data will be posted onto the first
workplace of the group for which the operation is planned.

Assigned to the current date.

Assigned to the current time .

Duration to be uploaded in hrs:min.

Specifies whether or not the operation is finished.
Set to "No" by default

Pre-assigned to the personnel number used for logging in,
cannot be changed.

The entered data are posted in HYDRA and the dialog is  closed, once the input has been confirmed by

clicking the relevant button.

Posting

The entered data are posted,  once  they  have been confirmed in the  dialog. It  is an interruption posting

from

the

system's

point

of

view

(DLG=A_UN|ANR=<MES

Order

Number>|MNR=<Workplace>|DATB=<Date>|ZEIB=<Time>|EGR:BMK11=<Duration>|).  Consequently,  a

BDE log record of the record type U is generated in HYDRA.

However, the interruption posting will only be sent if a duration greater than 0 is entered.

Provided that the workplace has been configured as a "group workplace " (type = G), a personal BDE log

record of the record type B is generated in addition to the order-related posting.

Der Service sendet den Parameter OPT:AGISTPNR=G in den Dialogdaten an den Leitrechner. Dadurch

wird bei einer AG-IST-Meldung an GAP einen "B"-Satz für die meldende Person angelegt. Der "B"-Satz

ist eine 1:1 Kopie des "U" oder "E"-Satz. Es erfolgt keine spezielle Behandlung von Personaleinsatz oder

den Personal-BMKs - diese Zeitleistungen müssen im Leistungscode konfiguriert bzw. eingeben werden.

Provided  that  the  option  "finish  operation"  has  been  set  to  "yes",  a  logoff/finish  posting  (DLG=A_BE)  is

sent,  once  the  duration  has  been  uploaded/posted  onto  the  operation.  This  logoff  posting  results  in  the

generation of a BDE log record of the record type E and the operation is finished (status "finished"). This

logoff posting is sent even if no upload is performed as the duration "0" is entered.

Once the operation has been finished, nobody can post data onto the operation anymore.

WEB-PR_81.docx

Version: 1.0.23049

Page 21 of 24

HYDRA@WEB Project Time Recording

The logoff/finish posting (DLG=A_BE) is assigned the current point in time (of the server), in contrast to

the interruption posting (DLG=A_UN) for which the point in time (date, time) may be entered or changed

manually. Consequently the times for interruption postings and logoff postings always vary.

Posting to RPA

The captured actual duration is posted onto RPA 11 of the operation.

Start date/finish date

Start  date  and  finish  date  are  only  used  for  informational  purposes.  They  do  not  affect  the  actual

duration. The period of time between the start date and the finish date is not double-checked with

respect to the actual duration.

Start  date  and  finish  date  are  always  identical  (the  end  date  is  not  computed  based  on  the  start

date and the duration).

Shift date/shift

The shift date as well as the shift number defined for the posting are derived from the entered start

date.

The  data  captured  by  using  project  time  recording  cannot  be  recalculated  in  the  event

maintenance. Consequently, postings need to be edited in the maintenance of postings.

Displaying and canceling of uploads

You can view your uploads by the menu item "order-related postings". To do so, enter the period of time

for which you want to view the uploads/postings (date from / to, pre-assigned by default to <today> minus

7 days until <today>. Then the system determines the data records from the start date as of 0.00 midnight

until the end date 11.59 pm.

Whether or not all uploads/postings can be shown for the specified period of time depends on

their retention period configured in HYDRA. Uploads/postings of the last 35 days are available

by default.

The  uploads/postings  you  have  entered  are  shown  (150  uploads  per  page),  once  data  have  been

requested:

Field

MES order number

Meaning

Combined order/ OP number.
The combined order/sequence/OP number will be shown here if
the system is configured for sequence processing.

Article

Article number (from the operation)

Article designation

Article designation

WEB-PR_81.docx

Version: 1.0.23049

Page 22 of 24

HYDRA@WEB Project Time Recording

Field

Meaning

OP designation

Operation designation

Workplace

Duration

Start

Record type

Workplace for which the upload/posting has been made

The  duration  from  the  recorded  posting/upload  posted  onto  RPA

11

Posting time of the upload

"Interruption of order" if the option "finish operation" is set to "No"

for the upload.

"Finishing of order“ if the option "finish operation" is set to "yes" for

the upload.

The  list  of  order-related  postings  includes  the  interrupted  orders  (DLG=A_UN)  as  well  as  the

finished orders (DLG=A_BE). Normally, the postings  for finishing orders can be  distinguished

from them for interrupting orders by the duration 00:00.

A posting/upload can be canceled, i.e. deleted by choosing the respective upload from the list of uploads

by clicking the button

 at the beginning of the row and deleting this one by using the relevant function.

Consequently, the selected posting is deleted. If there is a corresponding posting of the record type B, it

will also be deleted.

If the posting of a finished operation is deleted, the operation status will again be set to "U = interrupted".

An upload/posting can only be deleted, provided it has not yet been uploaded to the ERP/PPS

system.

The option "change after upload" set for the order type is not evaluated, i.e. once a posting has

been  uploaded,  it  can  no  longer  be  deleted  even  if  the  option  is  set  differently  for  the  order

type. In this case, deletion has to be performed in MOC.

Evaluations in MOC

The times recorded and posted onto the operation are shown at following positions in MOC:

Order information

Shows the actual durations posted onto RPA 11 of an operation.

Order overview > Progress

Shows the posted actual durations in the column of RPA 11, just as it is the case for the "status" tab of

the order information dialog.

WEB-PR_81.docx

Version: 1.0.23049

Page 23 of 24

HYDRA@WEB Project Time Recording

Order-related postings

The actual durations posted onto the resource performance account 11 can be displayed and changed in

the maintenance of postings dialog.

Personnel report

Provided  that  the  workplace,  for  which  you  posted  data,  has  been  configured  as  group  workplace,  this

report shows the actual durations posted onto resource performance accounts.

Upload to the ERP system

The recorded data are uploaded to the ERP/PPS system. For further information on the upload structure,

please refer to the respective documentation dealing with the interface.

WEB-PR_81.docx

Version: 1.0.23049

Page 24 of 24

