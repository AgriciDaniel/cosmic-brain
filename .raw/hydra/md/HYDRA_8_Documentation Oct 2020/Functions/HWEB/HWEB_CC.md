General HYDRA@WEB Operating Instructions

1  General HYDRA@WEB Operating Instructions

Depending  on  the  scope  of  your  installation,  HYDRA@WEB  gives  you  access  to  various  applications

such  as  the  Web  portal  or  the  Web  client  with  an  array  of  different  functions.  This  chapter  provides  a

description of the general use of HYDRA@WEB and focuses on the functions typical in all applications.

1.1  Basic functions

In  the  "Function"  section  in  the  navigation  menu  of  each  HYDRA@WEB  application  you  are  given  a

description of the basic functions listed below.

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

HWEB_CC.docx

Version: 1.1.1362

Page 1 of 12

General HYDRA@WEB Operating Instructions

If  an  application  is  not  used  for  a  longer  period  of  time,  the  user  may  be  logged  off

automatically.

Language selection

From  the  list  "Language  selection"  you  can  define  in  which  of  the  languages  installed  you  would  like

HYRDA@WEB to be shown.  Upon request, MPDV can make additional language packages available.

Help

HYDRA@WEB  provides  you  with  context  dependent  help  functions,  i.e.  the  content  of  the  help  file

displayed focuses on the content of the current window.

If  a  help  file  is  available  for  the  current  content,  a  link  will  be  displayed  accordingly  in  the  "Function"

section of the navigation menu.

HWEB_CC.docx

Version: 1.1.1362

Page 2 of 12

General HYDRA@WEB Operating Instructions

1.2  Navigation

HYDRA@WEB  offers  different  options  to  switch  between  different  functions.  Among  them  is  the  menu,

the side navigations and the links from the applications themselves.

Navigating in the menu

Depending on which application is active, from the navigation menu on the left hand side of the browser

window, you can go to the available functions and the function that is currently called up in other pages.

In some cases, the available functions may be divided into submenus. To save space, only the functions

of the current menu are visible.

Keep in mind that the menu adapts itself dynamically to the current function. For example, oftentimes it is

only possible to go to a detail function if data has already been selected in the current (overview) function.

Illustration 1: The go-to option in the "Graphic order shift log" detail function does not appear until after at

least one data record was highlighted in the "Order shift log" in the Web client application.

Page navigation

For  performance  reasons,  the  number  of  data  records  that  can  be  shown  on  one  page  in  the  browser

when a query is made in a function is limited (by default to a maximum of 150 data records).

If a data query delivers more than the maximum number of data records, the results are divided up onto

several pages. The data from the subsequent pages are loaded into the local browser by the server only

after the corresponding page is selected in the page navigator.

HWEB_CC.docx

Version: 1.1.1362

Page 3 of 12

General HYDRA@WEB Operating Instructions

Illustration 2: In this illustration, 330 data records were calculated as a result of the data selection; shown

here are the first 150 records. By clicking on the "2" in the page navigator, the next 150 data records are

displayed, etc.

The  number  of  data  records  displayed  is  controlled  via  the  URL  of  the  displayed  web  page.

Where  necessary,  they  can  be  modified  manually  so  that  when  data  is  queried,  the  page

displays  either  a  larger  or  smaller  number  of  data  records.  For  example,  Illustration  2  was

generated by the following URL.

<server>/WebClient/IndexData/0/PageSize/150?query=&applicationName=_OrderRelatedStatistics

However,  you  can  also  easily  modify  the  parameters  for  PageSize  in  the  URL  in  order  to

display all of the data records on one page.

<server>/WebClient/IndexData/0/PageSize/400?query=&applicationName=_OrderRelatedStatistics

Keep  in  mind  that  if  you  modify  the  sort  sequence  by  clicking  on  the  column  header  this  will

reset the page counter to 1 (cf. 0).

Favorites

HYDRA@WEB  is  a  web  application,  which  is  why  navigation  between  separate  pages  involves  URLs

being transmitted to the web server, which then transmits the web page that matches the URL to the local

browser.  When  data  is  queried,  in  addition  to  the  selected  function,  the  web  server  also  transmits  the

parameters that result in the data selection.

This is why HYDRA@WEB makes it easy to use the favorites function of your browser to store queries as

links  in  the  browser's  favorites  bar,  which  can  then  be  called  up  from  there  at  a  later  date  by  simply

clicking on them. Of course, you can also send these lines, by e-mail for example.

HWEB_CC.docx

Version: 1.1.1362

Page 4 of 12

General HYDRA@WEB Operating Instructions

Illustration 3: In this application, first the machine history for machine "50612" was saved in the browser's

favorites bar as a link for the time period between "1.1.12" to "1.31.12". After logging into the system, this

evaluation was then reestablished from the favorites bar.

Keep in mind that the links will only deliver data if the user has logged himself into the relevant

HYDRA system first. If a link is called up without logging in first, the system will display the login

page.

The system does not store the results of the evaluation, but instead it saves the parameters that

led to the evaluation. So, if this link is called up at a later time, the results may be different.

1.3  Use of functions

This  section  illustrates  the  common  control  elements  of  the  different  HYDRA@WEB  functions.  In

particular,  the  chapter  will  discuss  how  to  select  data,  how  to  use  selection  dialogs  and  how  to  go  to

overviews in detail functions.

Data selection

Many functions have a selection area to select data in order to control the quantity of data displayed.

HWEB_CC.docx

Version: 1.1.1362

Page 5 of 12

General HYDRA@WEB Operating Instructions

In  some  cases,  HYDRA@WEB  supports  the  ability  to  enter  selection  parameters  using  special  entry

elements (e.g. to enter dates) or by using selection dialogs (cf. Section 0).

After entering the selection parameters in the input fields in the selection area, the data query is started

by clicking on the arrow icon and the results are then shown in the data area.

If the query returns more data records than the maximum number of results that can  be shown on  one

page, the results are divided onto several pages (s. Section 0).

Selection dialogs

Selection dialogs are a tool to help you enter selection parameters for elements available in the system,

such as when entering workplace numbers.

If a selection dialog is available for an input field, a magnifier icon is shown behind the input field. Clicking

on the magnifier icon will open the selection dialog, from where you can calculate the desired value.

HWEB_CC.docx

Version: 1.1.1362

Page 6 of 12

General HYDRA@WEB Operating Instructions

Illustration 4: In a selection dialog (here using selecting workplaces as an example) you can then in turn

first limit the number of data to be displayed by entering selection parameters and then click on the arrow

icon to send the selection  query  to  the server. After the results are  displayed, click on the  desired data

record; this will close the window and the relevant value will be assumed in the input field.

Linking/ drill down

In  certain  (overview)  functions,  there  is  the  option  to  go  to  a  detail  function  from  the  current  page  (drill

down) If only the current data record can be transmitted as the basis for the drill down, then a magnifier

icon will appear in front of this data record (cf. Illustration 5).

HWEB_CC.docx

Version: 1.1.1362

Page 7 of 12

General HYDRA@WEB Operating Instructions

Illustration 5: From the current data record, go to a detail function by clicking on the magnifier icon, here

for example the "Attendance overview" function.

If the function supports transmitting several data records, then the desired data records are selected by

clicking  on  the  check  boxes  and  the  go-to  function  is  shown  in  the  menu.  (cf.  Section  0).  You  can  also

select all of the data records displayed by clicking on the check box in the selection column header.

HWEB_CC.docx

Version: 1.1.1362

Page 8 of 12

General HYDRA@WEB Operating Instructions

Illustration  6:  In  this  illustration,  all  of  the  displayed  data  records  were  highlighted  by  clicking  on  the

header line and then the detail function "Graphic efficiency report" (dynamically shown in the menu) was

called up.

Only  the  data  records  displayed  can  be  transmitted  to  a  detail  function.  So,  if  a  query  returns

data records on more than one page, only those data records can be transmitted to the detail

function that are displayed on the current page.

Sorting in table view

When  in  table  view,  the  way  the  data  records  are  sorted  can  be  changed  by  clicking  on  the  column

header. The first time you click on a header, the data records are sorted in ascending order.  If the data

records are already sorted based on a column, then you will reverse the sorting sequence if you click on

the same column again.

Keep in mind that the sorting relates to all of the data records that match the data query and not

to  all  of  the  data  records  currently  being  displayed.  Any  change  to  the  sorting  sequence  will

therefore then return the page counter to page 1 if several pages are shown.

HWEB_CC.docx

Version: 1.1.1362

Page 9 of 12

General HYDRA@WEB Operating Instructions

Keep in mind that other than the sorting sequence, the table view cannot be modified by a user

activity. Only the customizing option will allow columns to be moved, shown, and hidden or their

width to be modified.

HWEB_CC.docx

Version: 1.1.1362

Page 10 of 12

General HYDRA@WEB Operating Instructions

1.4  Print

HYDRA@WEB does not have its own print function, but instead uses the print function in your browser

(called up, for example, by clicking on CTRL + P).

Keep  in  mind  that  only  the  data  area  is  printed  (so,  not  the  menu,  for  example)  and  only  the

data records that are currently being displayed.

Illustration 7: Example for printing out a function with table view

HWEB_CC.docx

Version: 1.1.1362

Page 11 of 12

General HYDRA@WEB Operating Instructions

Illustration 8 Example for printing out a detail function with graphics

HWEB_CC.docx

Version: 1.1.1362

Page 12 of 12

