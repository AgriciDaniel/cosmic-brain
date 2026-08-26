Manual

SMA-ZIK Time Recording,
Information, Corrections
SMA-ZIK 8.2

Version 1.1.23049

Last changed on: 02.09.2020

  SMA-ZIK Time Recording, Information, Corrections

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 2 of 13

  SMA-ZIK Time Recording, Information, Corrections

Contents

1  SMA-ZIK Time Recording, Information, Corrections .................................... 4

2  Mobile Time Recording ................................................................................ 5

2.1  General ............................................................................................................... 5

2.2  Overview ............................................................................................................. 5

3  Workforce requirements plan ....................................................................... 8

3.1  General ............................................................................................................... 8

3.2  Overview ............................................................................................................. 8

4  Time Sheet ................................................................................................... 9

4.1  General ............................................................................................................... 9

4.2  Overview ............................................................................................................. 9

5  Escalation for a Subsequent Clocking Entry .............................................. 11

5.1  Subsequent entry of clocking (STMP.APPLICATION_FILED) ........................... 11

SMA-ZIK_82.docx

Version: 1.1.23049

Page 3 of 13

  SMA-ZIK Time Recording, Information, Corrections

1  SMA-ZIK Time Recording, Information, Corrections

Purpose

The  function  package  SMA-ZIK  Time  Recording,  Information,  Corrections  includes  the  following

components:

  Mobile time recording

Mobile time recording allows clockings to be made via a mobile phone, tablet PC or the Internet.

In addition, information on the current account balances can be displayed.

  Personnel schedule

This application shows the employee his/her personnel schedule for the next days. In addition to

the  planned  shift  and  absence  times,  the  workplace  for  which  the  employee  is  planned  is

displayed.

  Time sheet

This application can be used by the employee to obtain a display of his/her own time sheet and

request the subsequent entry of forgotten clockings.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 4 of 13

  SMA-ZIK Time Recording, Information, Corrections

2  Mobile Time Recording

2.1  General

Employees can use the application Time and attendance to make clockings optionally at stationary PZE

terminals or on a smartphone, tablet or the web.

2.2  Overview

If you call the application, the following screen opens:

In the HYDRA standard, the terminal number 254 ist stored in the SMA settings. This way, the SMA Time

and attendance uses the selection of absence reasons and label texts for keys specified for terminal 254

in  the  terminal  configuration  (MOC).  If  you  want  to  specify  a  different  selection  of  absence  reasons  or

different  label  texts  on  a  specific  PC  used  for  SMA,  then  you  must  store  an  additional  terminal

configuration (MOC).  Use terminal number 255, for example. For the PC in question, store the  terminal

number 255 in the SMA settings. The configuration of terminal 255 is then used for this PC.

If you change SMA settings, this change is stored for each Windows user separately.  If you change the

terminal configuration (MOC), these changes are applied when a person logs in the next time.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 5 of 13

  SMA-ZIK Time Recording, Information, Corrections

Note: For information on the terminal configuration on the MOC, refer to the documentation of the SMA

implementation.

When  you  configure  the  terminal  on  the  MOC,  you  must  be  careful  to  use  terminal  type  254  (not

terminal number !). This terminal type specifies the terminal as SMA terminal. This terminal type is not

used  when  the  licenses  (e.g.  AIP-HRF)  are  calculated  and  when  system  parameters  for  terminals  are

identified. This specification ensures that the number of required licenses is correctly calculated.

Making a clocking

To make a clocking, the following dialog opens:

SMA-ZIK_82.docx

Version: 1.1.23049

Page 6 of 13

  SMA-ZIK Time Recording, Information, Corrections

If  you  click  the  field  Cost  center,  a  selection  list  opens.  The  time  is  then  posted  for  the  selected  cost

center. This field is only available if the option Cost center posting is activated in the settings.

Use  the  personnel  number  or  the  staff  badge  number  and  the  pin  code  to  identify  the  employee.  The

fields  Show  "person"  field  and  Show  "badge"  field  in  the  settings  specify  which  of  the  two  fields  is

available. If all three fields are not visible, the values stored in the settings are processed.

Info

Use the button with the symbol

 to show the current account balances:

Displaying clockings

Use the button with the symbol

 to show the clockings of the current day and of the last 7 days.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 7 of 13

  SMA-ZIK Time Recording, Information, Corrections

3  Workforce requirements plan

3.1  General

In the application Workforce requirements plan, the employee can view their planned absences and the

work schedule for the days to follow. In addition, the workplace and the activity planned for the employee

are shown if they have been assigned.

3.2  Overview

If you call the application, the following screen opens:

SMA-ZIK_82.docx

Version: 1.1.23049

Page 8 of 13

  SMA-ZIK Time Recording, Information, Corrections

4  Time Sheet

4.1  General

The  employees  can  use  this  application  to  display  their  own  time  sheets  for  the  current  and  for  past

settlement periods.

If clockings are missing, you can also make subsequent clockings and forward them to the supervisor for

approval.

4.2  Overview

If you call the application, the following screen opens:

You  can  specify  the  time  sheet  layout  for  each  employee  in  the  HR  master  data.  If  no  time  sheet  is

entered here, the time sheet number 10 is processed.

The  time  sheets  are  displayed  as  PDF.  The  browser  must  natively  support  the  display

(example: Chrome) or you must install a plug-in in the browser (example: Adobe Reader plug-

in). It therefore depends on the browser and viewer/plug-in how  you can control the display. If

configured  accordingly,  it  is  possible  that  the  PDF  is  not  displayed,  but  the  document  is

downloaded.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 9 of 13

  SMA-ZIK Time Recording, Information, Corrections

Function keys

 Previous month

Displays the time sheet of the previous settlement period.

 Subsequent entry of clocking

This button opens the dialog to record a subsequent clocking:

When you have filled the field and confirmed the dialog by clicking OK, the clocking is forwarded to

the supervisor for approval.

The button Subsequent entry of clocking is only available with HYDRA 8. To activate this

button,  set  the  entry  "PersonEditClockings“  to  "true“  in  the  file  Web.config  of  the  SMA

installation (default storage location: "C:\inetpub\wwwroot\SMA\Web.config“):

    <!-- Person edit clockings -->

    <add key="PersonEditClockings" value="true"/>

 Next month

Displays the time sheet of the next settlement period.

By default, the settlement periods of the current year and of the last two years are available. If

no  data  or  no  more  data  is  available  for  a  specific  month  because  of  data  storage,  an  empty

time sheet is issued.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 10 of 13

  SMA-ZIK Time Recording, Information, Corrections

5  Escalation for a Subsequent Clocking Entry

The  present  documentation  describes  the  escalation  for  the  subsequent  entry  of  a  clocking.  If  this

process is to be activated, a configuration must be created for the escalation.

5.1  Subsequent entry of clocking (STMP.APPLICATION_FILED)

If  an  employee  has  forgotten  to  clock,  he/she  may  enter  it  subsequently  in  the  time  sheet  in  SMA.  By

doing  so,  the  escalation  STMP.APPLICATION_FILED  is  initiated.  This  escalation  can  be  used,  for

example,  to  notify  the  supervisor  by  e-mail.  With  regard  to  the  configuration  of  the  escalation  ,  the

recipient type Supervisor must be entered in this example.

In the Message tab, the text for the message can be entered:

SMA-ZIK_82.docx

Version: 1.1.23049

Page 11 of 13

  SMA-ZIK Time Recording, Information, Corrections

When  SMA  is  used,  the  recipient  can  access  the  SMA  application  for  approving  and/or  rejecting  the

clocking entry directly from the e-mail via the link

http://mos-hydra-01:8082/AppliedClockings/Confirm?clockingId=%STMP.VERWEIS%.

The

correct server and, separated by a colon, the related port must be entered in the link. This link is used by

the  editor  to  access  the  following  SMA  application  where  he/she  may  approve  or  reject  the  requested

clocking entry:

The function authorization sma.ac is required to start the SMA application.

As an alternative to this SMA application, the clocking entry can also be approved or rejected when the

escalation is concluded in the application current escalations.

As long as a clocking entry is requested, it is indicated in HYDRA but not processed. It will, for example,

only be considered in the labor time calculation after its approval.

SMA-ZIK_82.docx

Version: 1.1.23049

Page 12 of 13

  SMA-ZIK Time Recording, Information, Corrections

In the notification tab you can configure that the message is to be sent by e-mail.

The following placeholders are available for generating the message or for defining conditions:

Event

Identifiers

Description

STMP.APPLICATION_FILED

STMP.PNR

Personnel number

STMP.NAME:PNR  Name of person

STMP.PNAME

Last name of person

STMP.PVORNAME  First name of person

STMP.FIR

Person's company

STMP.DATB

Clocking date

STMP.ZEIB

STMP.ZEIE

Start time

End time

STMP.DAT:APPLY  Request date

STMP.ZEI:APPLY

Request time

STMP.KST

STMP.BEM

Clocked cost center

Comment

STMP.VERWEIS

Unambiguous record number

PNR.BER

PNR.KST

PNR.ABT

Area

Cost center

Department

PNR.PKREIS

Employee subgroup

PNR.TAETIGKEIT

Activity of the person

PNR.BESCHVERH  Employment relationship

PNR.TEL:FIR

Company phone

PNR.EMAIL:FIR

Company e-mail

PNR.VGS:PNR

Supervisor personnel number

PNR.VGS:FIR

Supervisor company

SMA-ZIK_82.docx

Version: 1.1.23049

Page 13 of 13

