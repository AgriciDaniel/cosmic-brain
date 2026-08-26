Manual

HYDRA@Web Absence
Workflow
WEB-WFG 8.1

Version 1.0.23049

Last changed on: 02.09.2020

HYDRA@Web Absence Workflow

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEB-WFG_81.docx

Version: 1.0.23049

Page 2 of 9

HYDRA@Web Absence Workflow

Contents

1  HYDRA@Web Absence Workflow - Overview ............................................ 4

2  Request Absences ....................................................................................... 5

3  Absence Planning in WEB ........................................................................... 8

WEB-WFG_81.docx

Version: 1.0.23049

Page 3 of 9

HYDRA@Web Absence Workflow

1  HYDRA@Web Absence Workflow - Overview

Purpose

With this function package, employees may request absence times in the Intranet or Internet. In addition,

supervisors can also approve or reject their employees' requests by means of a web application.

Implementation Considerations

You use the function package if:



you wish to map the requests and approvals of absence times via web applications.

Integration

This function package can only  be used if absence planning  is performed in HYDRA (function  package

Assessment of labor time and/or Labor time planning).

Features

  HYDRA@Web absence requests

o  Calendar for display of requested and scheduled absence times of employees

o  Requesting of absence times and withdrawal of requests

o  Planning of absence times not requiring a request

  HYDRA@Web absence planning

o  Calendar for display of requested and scheduled absence times of employees

o  Requesting of absence times and withdrawal of requests

o  Planning, processing and deletion of absence times not requiring a request

WEB-WFG_81.docx

Version: 1.0.23049

Page 4 of 9

HYDRA@Web Absence Workflow

2  Request Absences

Overview

After  logging  into  the  HYDRA@WEB  Web  portal  and  after  the  login  details  have  been  authorized,  the

employee  may  request  absence  via  intranet.  In  order  to  be  able  to  request  an  absence,  the  Absence

planning function must be called up in the Web Portal.

Absence planning

Absence  planning  begins  with  an  overview  of  the  yearly  calendar  for  the  current  year  and  it  shows  the

currently planned absences for the employee.

WEB-WFG_81.docx

Version: 1.0.23049

Page 5 of 9

HYDRA@Web Absence Workflow

Requesting absence always begins by clicking on a specific calendar day. A form will open, in which the

values for the personnel number, the name and date have already been defined.

The  values  that  identify  the  person  (personnel  number  and  name)  cannot  be  modified.  The  user  may

modify the other fields, whereas the entry from the comments field in the calendar is shown as a tooltip. In

addition,  the  comments  on  the  days  on  which  absence  is  planned  are  also  shown  in  the  attendance

overview.  Save  the  entry  by  clicking  on  the  OK  icon.  The  calendar  is  then  restructured,  whereas  the

requested absence is entered in italics. Absence times that have already been  approved or for which a

request does not need to be submitted are shown in normal format.

WEB-WFG_81.docx

Version: 1.0.23049

Page 6 of 9

HYDRA@Web Absence Workflow

From the configuration Control of absence times you can define which absence times to select.

The  settings  are  defined  there  from  the  icon  "Absence  time  may  be  requested"  and  "Request

needs to be approved".

You can cancel  an  absence request using  the function "Cancel request" as  long as it has  not  yet been

authorized or refused. Requested absence times are displayed in italics. To cancel a  request, you must

again click on the absence time in the calendar.

Absence planning for days in the past opens the form in display mode. You cannot modify these absence

times.

WEB-WFG_81.docx

Version: 1.0.23049

Page 7 of 9

HYDRA@Web Absence Workflow

3  Absence Planning in WEB

Overview

After  logging  in  at  the  MES  Info  Portal,  a  user  will  be  provided  with  an  overview  of  the  requested  and

scheduled absence times of his/her employees via the Absence planning menu item.

In  addition  to  the  Company,  Personnel  number,  Name  and  Activity  fields  for  each  person,  this  person's

current  leave  account  status  and  the  calculated  leave  account  status  by  the  end  of  the  year  will  be

displayed.

In the calendar, requested periods of absence are indicated in italics. Absence times which have already

been approved or for which a request does not need to be submitted are shown in standard type.

WEB-WFG_81.docx

Version: 1.0.23049

Page 8 of 9

Planning absence times starts with a mouse click on the start date of the period of absence. A form will

open in which the fields for personnel number, name and date are set automatically.

HYDRA@Web Absence Workflow

The entry in the Comment field will be shown as a tooltip in the calendar. In addition, the comments on

the days on which absence is planned are also shown in the attendance overview.

By  clicking  on  a  requested  absence  time  (in  italics),  a  dialog  for  approving  or  rejecting  the  request  is

opened:

The editor can also enter reasons for his/her decision in the Reason box.

WEB-WFG_81.docx

Version: 1.0.23049

Page 9 of 9

