Manual

Access Control Reports
(MOC)
ZKS-AZK 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Access Control Reports (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 2 of 15

Access Control Reports (MOC)

Contents

1  Access Control Reports - Overview ............................................................. 4

2  Status of access point .................................................................................. 5

3  Access Log ................................................................................................... 8

4  Last Access ................................................................................................ 11

5  Access Authorizations ................................................................................ 13

6  History of Access Authorizations ................................................................ 14

ZKS-AZK_81.docx

Version: 1.0.23049

Page 3 of 15

1  Access Control Reports - Overview

Access Control Reports (MOC)

Fields of application

This function package includes functions to show lists about access status, access protocols and access

authorizations.

Implementation notes

You use the function package if you wish:







to have an overview of the status of accesses/entrances

to list the recorded accesses and access attempts and the last badge access

to show the current access authorizations and changes to access authorizations

Integration

This function package can only be used if the HYDRA access control module is in use (function package

administration functions of access control).

Features

  Access status

o  Presents the current status of individual accesses/entrances

  Access protocol

o  Lists recorded accesses and access attempts

  Last access

o  Displays a list showing the last badge accesses

  Access authorizations

o  Shows the access authorizations for a period of time for each badge or access group

  Authorization history

o  Records and lists the changed and deleted access authorizations including editor and the

point in time

ZKS-AZK_81.docx

Version: 1.0.23049

Page 4 of 15

Access Control Reports (MOC)

2  Status of access point

Overview

Menu

HR management  Access control  Access status

Transaction code

acst

Function authorization

acst

In this application, the current status and the time since this status occurred are displayed.

Here,  you  can  set  in  the  configuration  of  the  HYDRA  server  which  access  status  is

communicated from the terminal to the HYDRA server and how often Access points

An access can have the following statuses:

Closed

The access is closed.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 5 of 15

Access Control Reports (MOC)

Open

The  access  is  open  as  it  was  used  before.    This  status  is  only  displayed  if  a  door  contact  is

connected.

Online

If  the  access  is  configured  in  a  way  that  it  does  not  signal  the  Open  and  Closed  statuses  to  the

HYDRA server, the Online status is displayed instead. If there is no cyclic status posting, then the

access changes to "No message" (see below).

Opened too long

The  access  was  opened  because  there  was  an  authorized  access  and  the  allowed  opening  time

was exceeded. This status is only displayed if a door contact is connected.

Open w/o permission

The  access  was  opened  without  an  authorized  badge.    This  status  is  only  displayed  if  a  door

contact is connected.

Free

A permanent activation is currently in place for this access.

Disturbance

The terminal has no connection to the access reader.  The status of the access is unknown.

Sabotage

The access reader was opened.  This status only appears if the reader has a sabotage loop.

No message

The access (or the terminal to which the access is connected) has not responded within the cycle

time set for the access status. The status of the access is unknown.

Offline component

The access is an offline component for which no current status is available.

Alarms and disturbances are displayed in yellow in the list if they have been signed off and still

exist. Alarm and disturbances not signed off are shown in red.

Additional information on Dorma offline components:

The following additional information is displayed in the access status for the Dorma offline components:

Date from/time

Since  the  current  status  for  offline  components  is  not  known,  "Offline  component"  is  displayed

instead. The time displayed provides information about when data was last written to or read from

the palm.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 6 of 15

Access Control Reports (MOC)

Modified on

The editing of badges, access profiles, access authorizations, profile assignments and exceptional

authorizations has an effect on the time of the last change for the relevant accesses and therefore

causes the loaded authorizations to be displayed as no longer current.

Load badges

In addition to the time when the authorizations were loaded onto the Dorma XS component, this

category also shows the number of cards loaded and whether the authorizations in the account are

current. There are three different colors for LEDs:

A red LED indicates that the offline components are not current.

  A yellow LED indicates that the authorizations are loaded onto the palm but there is no message

whether the

  date was actually loaded.

  A green LED indicates if the authorizations for accesses are current.

Synchronize badges

If authorizations  were changed, this category  shows the time when the  data  was loaded onto the

palm.  You can also see the number of transferred badges.

Access logs

The access logs displayed here up to the point in time were fetched at the XS component and read

into  HYDRA.  It  is  not  guaranteed  that  the  access  logs  are  complete,  as  the  logs  in  the  offline

components are overwritten when the available memory is full.

Battery

This  category  shows  the  battery  status  of  the  XS  component.    If  a  red  minus  sign  is  displayed

instead of the green plus sign, the battery must be replaced. The battery status is identified when

the  data  is  read  from  the  offline  component  and  therefore  does  not  necessarily  represent  the

current status.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 7 of 15

Access Control Reports (MOC)

3  Access Log

Summary

Menu

Human Resources Management  Access Control  Access Log

Transaction code

aclo

Function authorization

aclo

The  access  log  shows  actual  accesses,  access  attempts  as  well  as  accesses  where  the  entrance/door

was opened too long. When it comes to access attempts, the “reason” column indicates why  the access

has been refused.

For employee badges, the list only shows entries if the user is authorized for the responsibility area that is

entered for the relevant person in the HR master. The responsibility area from the badge is checked for

visitor badges.

The “reason“ column shows the below-mentioned reasons for access attempts:

Reason

Description

ZKS-AZK_81.docx

Version: 1.0.23049

Page 8 of 15

Access Control Reports (MOC)

No badges loaded

There are no authorized badges for the entrance

Unauthorized badge

This badge is not authorized for the entrance

ID card beyond validity period

The access attempt was made outside of the validity period of the
badge

Beyond access time model

The access attempt was made outside of the assigned access
time model

Beyond opening hours

The access attempt was made outside of the opening hours of the
entrance

Missing PIN code

No PIN code was entered

Wrong PIN code

The wrong PIN code was entered

Wrong system number

The system number of the badge does not match the system
number of the basic parameter settings.

Bag check

The employee has been selected for bag checking

Alarm system activated

Access denied, as the alarm system is active

Duplicate posting within lock time

This badge has already entered the access within the specified
blocking period

Fingerprint does not match

The fingerprint read in does not match the fingerprint saved on the
badge

Other access point of sec. gate open  Another access point of the security gate was opened

Already present in room zone

Access to the room zone has been denied, as the badge is
already present in the room zone

Not present in room zone

Exiting the room zone has been denied, as the badge is not
present in the room zone

Room zone completely occupied

Access to the room zone has been denied as maximum
occupation has been reached

Office unlocked

The office has been unlocked by the access

Office locked

The unlocked office has been locked again

Access  logs  where  the  badge  number  only  consists  of  zeros  and  no  personnel  number  is

entered indicate that the entry has been opened using a door opener.

Selection criteria

The application provides the following selection criteria

ZKS-AZK_81.docx

Version: 1.0.23049

Page 9 of 15

Access Control Reports (MOC)

Time from; until

The  selection  criteria  “time  from“  or  “time  till”  do  not  directly  refer  to  the  “date  from”  or  “date  till”

fields but the specified period of time is processed for each day within the selected date range.

Toolbar

 Badges

Shows the badge for the selected access log.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 10 of 15

Access Control Reports (MOC)

4  Last Access

Summary

Menu

Human Resources Management  Access Control  Last Access

Transaction code

acla

Function authorization

acla

The “Last Access” application lists the points in time when badges entered a room/zone the last time.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 11 of 15

Access Control Reports (MOC)

Selection Criteria

The selection criteria correspond to those of the badges. In addition to this, the application also provides

the following selection criteria:

Date, until

Only badges the last access of which is within the selected date range are displayed.

Toolbar

 Badges

Shows the badge for the selected “last access”.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 12 of 15

Access Control Reports (MOC)

5  Access Authorizations

Summary

Menu

Human Resources Management  Access Control  Access Authorizations

Transaction code

acal

Function authorization

acal

The  list  of  access  authorizations  shows  all  badges  or  people  that  are  authorized  for  individual  access

groups  during  a  specific  period  of  time.  In  addition  to  this,  the  list  also  indicates  the  access  profile  and

access time model via which the authorization has been assigned and the periods of time for which the

authorization applies.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 13 of 15

Access Control Reports (MOC)

6  History of Access Authorizations

Summary

Menu

Human  Resources  Management    Access  Control    History  of  Access
Authorizations

Transaction code

acah

Function authorization

acah

The  changes  made  to  access  profile  assignments  of  badges  are  recorded  and  can  be  displayed  in  the

“authorization history” report.

Field Descriptions

Categories “new value” and “old value”

The  “new  value”  and  “old  value”  categories  show  which  changes  have  been  made  within  access

profile assignments.

Original data record number

The history of modifications made to an access profile assignment may  be displayed by  grouping

by the “original data record number” column.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 14 of 15

Access Control Reports (MOC)

The list shows the changes to access profile assignments, which have been made since version

7.2 of HYDRA-ZKS. Provided that HYDRA-ZKS in version 7.1 was used before, it depends on

the installed program version whether or not changes made to access profile assignments are

displayed.

ZKS-AZK_81.docx

Version: 1.0.23049

Page 15 of 15

