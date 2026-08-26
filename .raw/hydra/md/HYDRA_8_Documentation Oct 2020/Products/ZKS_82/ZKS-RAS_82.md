Manual

Control of Room Zones,
Elevators, Security Gates
ZKS-RAS 8.2

Version 1.0.23049

Last changed on: 02.09.2020

  Control of Room Zones, Elevators, Security Gates

Copyright

©Copyright 2020 Alle Rechte vorbehalten.

SAP® und R/3® sind eingetragene Warenzeichen der SAP AG.

WINDOWS® ist eingetragenes Warenzeichen von Microsoft Corporation.

MPDV® und HYDRA® sind eingetragene Warenzeichen der MPDV Mikrolab GmbH.

ORACLE® ist ein eingetragenes Warenzeichen der  ORACLE Corporation, Kalifornien, USA.

Weitergabe und Vervielfältigung dieser Dokumentation oder von Teilen daraus sind, zu welchem Zweck und in welcher Form auch
immer, ohne die ausdrückliche schriftliche Genehmigung durch MPDV nicht gestattet.

Alle Rechte vorbehalten.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 2 of 10

  Control of Room Zones, Elevators, Security Gates

Contents

1  Control of Room Zones, Elevators, Security Gates - Overview ................... 4

2  Room Zones ................................................................................................. 5

3  Room Zone Overview .................................................................................. 7

4  Elevator Control ........................................................................................... 9

5  Security Gate Control ................................................................................. 10

ZKS-RAS_82.docx

Version: 1.0.23049

Page 3 of 10

  Control of Room Zones, Elevators, Security Gates

1  Control of Room Zones, Elevators, Security Gates - Overview

Purpose

The present function package in combination with  the access control system offers the possibility to log

the presence of employees in room zones, to control elevators with different authorizations for each floor

and to map security gates in the system where only one door may be opened at a time.

Implementation notes

You use the function package if:



you  use  the  HYDRA  access  control  system  (ZKS)  and  want  to  monitor  room  zones,  control

elevators or security gates.

Integration

This  function  package  can  only  be  used  if  the  HYDRA  access  control  product  group  is  in  use  (function

package access control management functions).

Features

  Room zones

o  Definition  of  room  zones  and  by  which  entrances  these  room  zones  are  entered  or

exited.

o  Validation check of presence or absence when entering or leaving a room zone.

o  Room  zone  overview  to  show  the  employees  who  are  currently  present  and  who  were

present at a point in time in the past.

o  Editing function to log staff in and out.

  Elevator control

o  Elevator control with different authorizations for each floor.

  Security gate control

o  Definition  of  room  zones  and  by  which  entrances  these  room  zones  are  entered  or

exited.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 4 of 10

  Control of Room Zones, Elevators, Security Gates

2  Room Zones

Summary

Menu

Master data  Access control  Room zones

Transaction code

rozo

Function authorization

rozo

Room  zones  can  be  used  to  verify  whether  or  not  employees  are  present  in  specific  rooms  or  areas.

Room  zones  can  be  entered  and  exited  using  access  points.  This  can  be  configured  along  with  the

access points.

Validation checks may be enabled to make sure that an employee may only enter a room zone if he/she

is not already present or may only leave it if he/she is already present.

A maximum occupation rate can be defined for room zones. Consequently, employees might be rejected

if the parking lot is full, for instance.

Two requirements need to be met to be able to use room zones:

1.  Both, the entries and the exits need to be controlled by access control.

2.

It has to be ensured that all  employees log  in  and out individually  at the  entries  and  exits. This

can either be realized by an organizational or technical approach (e.g. turnstiles).

ZKS-RAS_82.docx

Version: 1.0.23049

Page 5 of 10

  Control of Room Zones, Elevators, Security Gates

Field description

Room zone, designation

Number of the room zone and its name

Responsibility area

Responsibility  area  which  the  room  zone  is  assigned  to.  The  responsibility  area  is  checked  when

editing this configuration and, in addition, it is also verified whether or not the "use" authorization is

available  when  room  zone  assignments  are  created,  changed  and  deleted  within  the  room  zone

overview.

Validation checking upon entry, validation checking upon exit

These  two  options  specify  whether  the  entrance  into  the  room  zone  is  denied  if  the  badge  is

already present in the room zone or whether the exit from the room zone is denied if the badge is

not present in the room zone.

Log attendance in room zone

By  this  option,  past  periods  when  an  employee  was  present  in  the  room  zone  can  be  recorded.

These  logs  can  be  viewed  using  the  room  zone  overview.  If  logging  is  disabled,  the  room  zone

overview  only  shows  the  currently  present  employees  and  these  entries  are  deleted  when  the

employee exits the room zone.

Maximum occupancy

The maximum number of employees that may be present in the room zone can be configured here.

Any  further  access  attempt  will  be  rejected  and  recorded  including  the  reason  "Room  zone

completely occupied" within the access log, once this maximum number has been exceeded.

Channel for max. occupancy

The channel specified here is triggered at the ZKS terminal if the maximum number of employees

that  may  be  present  in  the  room  zone  has  been  reached.  This  channel  can  trigger,  for  example,

lights (red/green traffic lights).

ZKS-RAS_82.docx

Version: 1.0.23049

Page 6 of 10

  Control of Room Zones, Elevators, Security Gates

3  Room Zone Overview

Summary

Menu

Human resource management Access control Room zone overview

Transaction code

rzov

Function authorization

rzov

Those employees, who are or were present in a room zone are displayed in the room zone overview.

Selection criteria

The following selection criteria are available in the application:

Currently present people/ Past entries and exits

This  option  can  be  used  to  select  whether  the  currently  present  employees  or  the  logs  of  past

presences shall be displayed.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 7 of 10

  Control of Room Zones, Elevators, Security Gates

Show deleted

When this button is activated, also deleted loggings will be shown. The columns Editor, Modified on

and Deleted lead to more details on deleted loggings.

The  loggings  of  room  zones  can  be  modified  since  it  might  happen,  for  example,  that  an

employee leaves a monitored room without that this exit is recorded. This might be the case if

the  employee  leaves  in  the  same  time  as  another  person  present.  If  the  plausibility  check  for

presences  in  the  room  zone  is  active,  this  employee  must  not  enter  the  room  again  since  the

access control assumes that he/she is still within the room zone.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 8 of 10

  Control of Room Zones, Elevators, Security Gates

4  Elevator Control

Summary

The elevator control allows for several entrances (floors) to be controlled via one reader. When a badge is

read, the terminal checks all entrances (floors) that are configured for this reader and releases the door

opener  contacts  of  the  authorized  accesses,  which  are  linked  with  the  pushbuttons  of  the  elevator  and

release the appropriate buttons.

The  door  status  contact  indicates  which  button  was  pushed.  Provided  that  the  door  status  contacts  are

configured in accesses, the access protocol is only generated, once a button has been pushed and thus it

is  possible  to  check  in  the  access  protocol  which  floor  the  employee  entered.  In  case  the  door  status

contacts are not configured in entrances, an access protocol is generated for each authorized floor. Thus,

it may be checked who might be in a floor, however without knowing whether the employee has actually

entered this floor.

A  separate  access/entrance  is  created  for  every  floor  of  an  elevator  control.  Consequently,  each  floor

may have different authorizations. If several accesses/entrances are created for one reader it is verified

that the floor number is unique. The floors are defined in the “advanced settings” tab of the access.

Online-checks are not performed for the elevator control to avoid one or several online checks

from being made every time the elevator is used by employees who are not allowed to enter all

floors.

A  maximum  of  nine  entrances  and,  as  a  result,  nine  floors  may  be  managed  by  one  ZKS

terminal.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 9 of 10

  Control of Room Zones, Elevators, Security Gates

5  Security Gate Control

Summary

A  security  gate  consists  of  two  or  several  entries.  Only  one  entry  may  be  opened  at  a  time.  Access  is

denied in case an entry is already open when trying to open another entrance.

A  security  gate  can  be  configured  within  the  field  “security  gate  with  access  point”  in  the  “advanced

settings” tab of the access.

To enhance the security gate by another entrance, the new entrance number is to be entered in one of

the two entrances.

The  access  by  way  of  which  the  security  gate  has  been  configured  cannot  be  changed.  However,

accesses  that  have  not  yet  been  assigned  to  a  security  gate  may  be  added  to  an  existing  one  or

entrances may be removed from a security gate.

All entries of a security gate have to be connected to the same HYDRA-ZKS terminal.

The access status has to be monitored for all entrances in order to be able to monitor a security

gate. The “maximum duration of open access” and “relay time door opener” have to be set for

this purpose.

ZKS-RAS_82.docx

Version: 1.0.23049

Page 10 of 10

