Manual

Time & Attendance with ST-
300
TSW-ST 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Time & Attendance with ST-300

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

TSW-ST_81.docx

Version: 1.0.23049

Page 2 of 9

Time & Attendance with ST-300

Contents

1  Time & Attendance with ST-300 .................................................................. 4

2  Time and Attendance with ST-300 ............................................................... 5

2.1  Operation of the PZE terminal ............................................................................. 5

2.2  Auto-Status ......................................................................................................... 6

2.3  Absence reason clocking..................................................................................... 6

2.4  Display of account balance information ............................................................... 7

2.5  Error messages ................................................................................................... 8

2.6  Terminal status display ........................................................................................ 8

3  Commissioning of ST-300 ............................................................................ 9

3.1  Terminal configuration ......................................................................................... 9

3.2  Versions .............................................................................................................. 9

TSW-ST_81.docx

Version: 1.0.23049

Page 3 of 9

Time & Attendance with ST-300

1  Time & Attendance with ST-300

Purpose

The terminal software included in this function package allows for recording In, Out and Break clockings

as well as the recording of absence reasons for late In, early Out or  working time interruptions  with the

time  recording  terminal  type  ST-300.  In  addition  to  these  recording  functions,  you  can  also  view  the

account balances.

Implementation notes

You use the function package if you:

  wish to record the clocking times of your employees

  wish to record the absences of your employees

  wish to provide your employees with information on their account balances

Integration

Data  recorded  by  means  of  this  terminal  software  can  be  displayed  and/or  evaluated  in  the  MOC  in

various applications.

Features

  Personnel time recording/Time & Attendance

TSW-ST_81.docx

Version: 1.0.23049

Page 4 of 9

Time & Attendance with ST-300

2  Time and Attendance with ST-300

ST-300  (Subterminal  300)  is  used  to  record  the  personnel  working  time.  In  addition  to  recording  the  in,

out and break times, information regarding current account balances may be displayed to the employees.

2.1  Operation of the PZE terminal

The clocking type is set by pressing the different keys (in, out, break or absence reason keys) on the PZE

terminal. The currently active clocking type and/or function is indicated on the display by an appropriate

text. An employee clocks by reviewing the terminal status first, confirming the relevant key (in, out, ...) and

then holding his/her company badge in front of the reader. In addition, employees may view their account

balances (e.g. flextime, flexible time, remaining leave, ...) by pressing the information key.

Before each clocking and/or activity, the user has to check whether the function to be performed is active.

If this is not the case, the relevant function has to be activated by pressing the appropriate key.

Key

Function

Description

1

2

3

In

Start of working time

Break

Start or end of break

Out

End of working time

TSW-ST_81.docx

Version: 1.0.23049

Page 5 of 9

Time & Attendance with ST-300

4-6, 8

Absence reasons

These keys provide for the option of recording a reason for
late  arrival  or  early  leaving  or  working  time  interruptions
(e.g.  for  business  trips  or visits  to  the  doctor)  by  means  of
entering an absence reason.

0

Information

Display of account balances

The selected function is now performed by reading the badge.

After successful clocking, the activity performed and the badge number are indicated on the display.

Break clocking is not mandatory. If break times have been defined in the system, they are offset

automatically.

2.2  Auto-Status

If  the  terminal  was  configured  for  the  "Auto-Status"  (AST)  operating  mode,  the  system  automatically

decides whether an In or an Out clocking is performed. If Auto-Status is active, the display indicates the

text "Auto-Status".

Automatic status identification can be overridden by the employee explicitly pressing the In or Out key, if

required.

2.3  Absence reason clocking

Postings  for  absence  reasons,  so-called  advance  clockings  or  subsequent  clockings,  may  be  made  on

the PZE terminal. The term "advance clocking" means that the absence reason is entered in advance of

the actual time of absence. In the case of "subsequent clockings", the absence reason is only notified to

the terminal after the actual time of absence.

For entering an absence reason, the keys with the numbers 4-6 and 8 are used.

Procedure for entering an absence reason

  Press one of the absence reason keys.

  Perform clocking using the company badge.

If  the  terminal  was  in  "Auto-Status"  before,  HYDRA  automatically  decides  whether  the  absence  reason

clocking  is  an  advance  or  subsequent  clocking.  If  the  terminal  was  in  the  "In"  status,  a  subsequent

clocking is made; if the "Out" status was active, an advance clocking is made.

TSW-ST_81.docx

Version: 1.0.23049

Page 6 of 9

Time & Attendance with ST-300

2.4  Display of account balance information

After  pressing  the  information  key  and  posting  by  using  the  company  badge,  the  display  indicates  the

account  balances  of  the  relevant  person.  If more  than  2  accounts  are  active,  the  keys  7  and  9  may  be

used to scroll the list up and down.

Which  time  and/or  day  accounts  are  displayed  on  the  terminal  can  be  specified  in  the  configuration  of

accounts in HYDRA.

TSW-ST_81.docx

Version: 1.0.23049

Page 7 of 9

Time & Attendance with ST-300

2.5  Error messages

The following error messages may be displayed:

Message

Description

"Double clocking"

  The person attempted to clock the same function within 2

minutes. This check is only performed if no other employee
has clocked in the meantime.

"No access authorization"

  The person has no access authorization on this terminal.

"No business trip authorization"

The person is not authorized to clock a business trip.

All other messages are displayed in the "general message line" on the bottom of the screen.

Other error messages are:

Message

Description

"Incorrect company number"

  No correct company badge.

"No memory space. No connection to the
server"

  The local memory space for clocking is used up (in
OFFLINE mode). If the connection to the server is
interrupted, the terminal saves approx. 10000
clockings locally before this message is displayed.

2.6  Terminal status display

If the subterminal does not have any connection to the master terminal, the time in the display is indicated

with an asterisk between the hours and the minutes.

TSW-ST_81.docx

Version: 1.0.23049

Page 8 of 9

Time & Attendance with ST-300

3  Commissioning of ST-300

3.1  Terminal configuration

Subterminals  of  type  ST-300  are  connected  to  a  master  terminal  of  type  CT-385  in  the  same  way  as

access readers. This master terminal requires an entry with the Access terminals ("ZZG") operation mode

in the terminal configuration.

One entry  per subterminal  must also exist in the terminal configuration. Type 300 (ST-300) enables the

fields Master terminal and Reader in the Configuration group of the General tab. The Master terminal field

includes the terminal number of the master terminal, and the Reader field includes the reader number of

the subterminal.

3.2  Versions

The new terminal type ST-300 is available in MOC from SP7. The master terminal requires the following

versions:

-  ctwin: ctwin.exe 7.2.7.81 (08.07.2015)

-  AIP 8.1: ctaip.exe 2.0.3.53 (08.07.2015, pzezks72.dll 2.0.1.28)

-  AIP 8.2: The connection of ST-300 does not depend on the version.

In all three cases, the driver plg_crypt.dll is required as from version 2.1.0.0.

TSW-ST_81.docx

Version: 1.0.23049

Page 9 of 9

