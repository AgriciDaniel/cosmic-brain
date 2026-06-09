Manual

Alarm System
ZKS-ALS 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Alarm System

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 2 of 13

Alarm System

Contents

1  Alarm System - Overview ............................................................................. 4

2  Current Alarms and Malfunctions ................................................................. 5

3  Alarms and Malfunctions .............................................................................. 7

4  Alarm Suppression ....................................................................................... 8

5  Access Control Escalations .......................................................................... 9

5.1  Summary ............................................................................................................. 9

5.2  Configuration of ZKS escalations ...................................................................... 10

ZKS-ALS_81.docx

Version: 1.0.23049

Page 3 of 13

Alarm System

1  Alarm System - Overview

Fields of application

The alarm system of the access control module has been configured to report alarms and disturbances

occurring at accesses. Existing alarms and malfunctions are displayed in a special status overview, past

alarms  and  disturbances  can  be  viewed  in  an  evaluation/report.  E-mails  can  be  used,  for  example,  to

notify the relevant people of alarms. Access points have to be configured additionally for the functions of

the alarm system.

Implementation notes

You use the function package if you:

  use the HYDRA access control system (ZKS) and you wish to generate alarms for access points

or the access control hardware

Integration

This  function  package  can  only  be  used  if  the  HYDRA  access  control  is  in  use  (function  package

administration functions, access control).

Features

  Generation of alarms

o  Alerts are generated if access points are opened too long or without authorization and if

the access technology is sabotaged or fails

  Notification of alarms

o  Notification e.g. by e-mail if an alarm occurs

  Alarm overview and history

o  Listing and confirmation of currently applicable and past alerts

  Alarm suppression

o  Exception for the suppression of alarms (e.g. on open days)

ZKS-ALS_81.docx

Version: 1.0.23049

Page 4 of 13

Alarm System

2  Current Alarms and Malfunctions

Menu

Human  Resources  Management    Access  Control    Current  Alarms  and
Disturbances

Transaction code

acca

Function authorization

acca

This  status  dialog  shows  all  current  alarms  and  disturbances  as  well  as  those  that  have  not  yet  been

confirmed/acknowledged. Each entrance/access where an alarm or disturbance occurred remains in this

overview  until  the  alarm  or  disturbance  has  been  signed.  If  an  alarm  or  disturbance  is  signed,  but  the

corresponding condition is still available the color changes from red to yellow. The alarm or disturbance is

no longer displayed in the list, once the status/condition has been finished.

The  view  of  current  alarms  and  disturbances  is  refreshed  automatically  approximately  once  a

minute.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 5 of 13

Alarm System

Toolbar

 Sign alarm

Function authorization: acca.sign

The  following  dialog  opens  when  an  alarm  is  to  be  signed.  This  dialog  provides  the  option  to

choose  whether

the  currently  selected  alarm  or

the  alarms  and  disturbances  of  all

entrances/accesses are to be signed:

ZKS-ALS_81.docx

Version: 1.0.23049

Page 6 of 13

Alarm System

3  Alarms and Malfunctions

Summary

Menu

Human  Resources  Management    Access  Control    Alarms  and
Disturbances

Transaction code

acad

Function authorization

acad

This report shows all alerts and disturbances for the selected period of time.

The columns “badge”, “company” and “person“ are only filled out if the “opened too long” status

is available.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 7 of 13

Alarm System

4  Alarm Suppression

Summary

Menu

Human Resources Management  Access Control  Alarm Suppression

Transaction code

acas

Function authorization

acas

The “alarm suppression” function releases accesses. In this context, releasing of accesses means that no

alarm  will  be  triggered  during  the  specified  period  of  time  if  the  access/entrance  is  opened  too  long  or

without permission. “Free” is displayed as access status.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 8 of 13

Alarm System

5  Access Control Escalations

5.1  Summary

Using  the  escalation  management  alarms  and  access  attempts  may  be  sent  by  e-mail,  SMS  or  as

message to the console of certain users.

Within access control the following events can be sent using the escalation management:

ZNR.OPEN_TOO_LONG

The  entrance  has  been  opened  too  long.  This  alarm  also  indicates  the  badge  number  that  has

opened the entrance.

ZNR.OPEN_TOO_LONG_END

The access, which was opened too long, has been closed again.

ZNR.OPEN_WITHOUT_PERMISSION

The entrance has been opened without permission (e.g. by way of a key or tool).

ZNR.OPEN_WITHOUT_PERMISSION_END

The entrance, which was opened without permission, has been closed again.

ZNR.READER_SABOTAGE

The  access  reader  has  been  opened  (this  message  only  appears  when  the  reader  has  got  a

sabotage contact).

ZNR.READER_SABOTAGE_END

The access reader has been closed again (this message only appears when the reader has got a

sabotage contact).

ZNR.READER_FAILURE

Communication between the HYDRA-ZKS terminal and the access reader has broken down.

ZNR.READER_FAILURE_END

The connection between the terminal and the reader has been re-established.

ZNR.ACCESS_POINT_OFFLINE

The access has not sent a status within the given status time. Thus, the access status is not known.

The connection between the server and the HYDRA-ZKS terminal has broken down.

ZNR.ACCESS_POINT_OFFLINE_END

The access has sent a status again.

ZNR.ACCESS

The entrance has been opened by an authorized badge.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 9 of 13

Alarm System

ZNR.ACCESS_ATTEMPT

The entrance could not be opened by an unauthorized badge.

5.2  Configuration of ZKS escalations

Something has to be entered in the configuration of the escalation to be able to report an escalation from

the HYDRA-ZKS module:

The event can directly be reported to a person or a group of persons (function group). If the message is to

be  forwarded  by  e-mail,  the  IP  address  of  the  mail  server  and  the  person’s  e-mail  address  (company)

have  to  be  defined  in  the  basic  settings.  To  be  able  to  send  the  event  to  a  console,  the  assignment

between personnel number and user needs to be established in the user management function.

ZKS-ALS_81.docx

Version: 1.0.23049

Page 10 of 13

The text is entered with placeholders for variable data in the message tab:

Alarm System

How the message is sent is defined in the “notification” tab.

Notifications about access attempts may have different reasons. The ZPR.ZVG variable determines that

only  certain  access  attempts  are  displayed.  Several  configurations  with  different  conditions  have  to  be

created for the respective event in order to get different messages for different causes.

The following reasons for access attempts are possible:

ZPR.ZVG

Description

2001

Unauthorized badge

2002

No badges loaded

2003

Beyond time zone

2004

Beyond opening hours

ZKS-ALS_81.docx

Version: 1.0.23049

Page 11 of 13

Alarm System

2005

Wrong pin code

2006

Wrong company number

2007

Bag check

2008

Alarm system activated

2010

Duplicate posting within lock time

2013

Missing pin code

2014

Badge beyond validity period

2015

Finger print does not match

2020

Other entry of security gate/safety lock is open

2030

Already present in room zone

2031

Not present in room zone

2032

Room zone completely occupied

ZKS-ALS_81.docx

Version: 1.0.23049

Page 12 of 13

The following screenshot shows the exemplary condition to send a message if an employee tries to enter

a room zone twice:

Alarm System

ZKS-ALS_81.docx

Version: 1.0.23049

Page 13 of 13

