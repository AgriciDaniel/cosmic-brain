Manual

Upgraded Access Control
ZKS-EZK 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Upgraded Access Control

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

All rights reserved.

ZKS-EZK_82.docx

Version: 1.0.23049

Page 2 of 7

Upgraded Access Control

Contents

1  Upgraded Access Control - Overview .......................................................... 4

2  Replacement badges ................................................................................... 5

3  Permanent opening of doors ........................................................................ 6

4  Pin codes ..................................................................................................... 7

ZKS-EZK_82.docx

Version: 1.0.23049

Page 3 of 7

Upgraded Access Control

1  Upgraded Access Control - Overview

Purpose

This function package offers advanced options for the access control management.

Implementation notes

You use the function package if:







you want to create replacement badges for employees who have forgotten their badge;

you want to open access points automatically at defined times;

you want to secure access points via an additional request of a pin code.

Integration

This function package can only be used if the HYDRA access control module is in use (function package

access control management functions).

Features

  Replacement badges

o  You can define replacement badges for employees who have forgotten their badge.

  Opening doors permanently

o  You can open access points permanently for a specific period of time depending on the

weekday and public holidays.

  Pin codes

o  You can request an additional pin code at security relevant access points at predefined

times (e.g. at night, at the weekend, on public holidays).

ZKS-EZK_82.docx

Version: 1.0.23049

Page 4 of 7

Upgraded Access Control

2  Replacement badges

Replacement badges can be assigned to employees who have forgotten their Badge.

If  you  create  or  modify  a  replacement  badge,  the  system  directly  takes  over  the  Access  profile

assignments  of  the  corresponding  staff  badge.  This  ensures  that  the  replacement  badge  has  the  same

authorizations as the staff badge.

Clocking  authorizations  for  time  &  attendance  are  assigned  to  the  person  via  the  personnel

number. They automatically apply for the replacement badge. Replacement badges can also be

used for the shop floor data collection.

ZKS-EZK_82.docx

Version: 1.0.23049

Page 5 of 7

Upgraded Access Control

3  Permanent opening of doors

You control the permanent opening of a door via the Opening hours of an Access group. An access point

is  permanently  opened  if  the  two  options  Badge  required  and  Pin  code  required  are  disabled  for  an

Access period.

ZKS-EZK_82.docx

Version: 1.0.23049

Page 6 of 7

Upgraded Access Control

4  Pin codes

If an employee loses his/her badge, unauthorized persons can misuse this badge as long as this loss has

not  been  notified  and  the  badge  has  not  been  blocked  in  the  system.  You  can  avoid  this  misuse  if

relevant access points require the badge and the employee's pin code.

An  employee's  pin  code  is  defined  in  the  field  Pin  code  in  the  submenu  Badge.  Employees  without  pin

code cannot enter an access point if the pin code request is enabled at this access point.

You define the times and weekdays or public holidays which require the pin code in addition to the badge

in  the  menu  point  Opening  hours  of  the  Access  group.  Set  the  option  Pin  code  required  in  the  Access

periods to enable this processing.

Access attempts that were rejected because of a  wrong pin code are shown  in the  Access log  with the

reason "wrong pin code".

ZKS-EZK_82.docx

Version: 1.0.23049

Page 7 of 7

