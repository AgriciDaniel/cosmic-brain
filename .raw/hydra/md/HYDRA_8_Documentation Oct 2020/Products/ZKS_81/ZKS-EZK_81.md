Manual

Enhanced Access Control
ZKS-EZK 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Enhanced Access Control

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-EZK_81.docx

Version: 1.0.23049

Page 2 of 7

Enhanced Access Control

Contents

1  Enhanced Access Control - Overview ......................................................... 4

2  Replacement Badges ................................................................................... 5

3  Permanent Door Opening ............................................................................ 6

4  Pin Code Processing .................................................................................... 7

ZKS-EZK_81.docx

Version: 1.0.23049

Page 3 of 7

Enhanced Access Control

1  Enhanced Access Control - Overview

Fields of application

This function package provides further options to manage access control.

Implementation notes

You use the function package if you wish:







to create replacement badges for employees who forgot their badge

to open accesses/entrances automatically at certain times

to secure accesses/entrances by entering an additional pin code

Integration

This function package can only be used if the HYDRA access control module is in use (function package

administration functions, access control).

Features

  Replacement badge processing

o  Definition of replacement badges for employees who forgot their badge

  Permanent opening of the door

o  Time-controlled  permanent  release  of  accesses/entrances  subject  to  weekdays  and

public holidays

  Pin code processing

o  Additional request of the pin code at security-relevant entrances at specific times (e.g. at

night, on the weekend and public holidays)

ZKS-EZK_81.docx

Version: 1.0.23049

Page 4 of 7

Enhanced Access Control

2  Replacement Badges

Another badge may be assigned to employees who, for example, forgot their badge.

The access profile assignments of the employee badge are copied to the replacement badge. This makes

sure that the replacement badge has the same authorizations as the current employee badge.

Clocking  authorizations  for  time  &  attendance  are  assigned  to  the  person  by  the  personnel

number and, as a result, they also apply for the replacement badge. A replacement badge can

also be used for shop floor data collection.

ZKS-EZK_81.docx

Version: 1.0.23049

Page 5 of 7

Enhanced Access Control

3  Permanent Door Opening

Opening hours of an access group control the permanent opening of doors. An entrance is permanently

opened if the two options “access required” and “pin code” are disabled for an access period.

ZKS-EZK_81.docx

Version: 1.0.23049

Page 6 of 7

Enhanced Access Control

4  Pin Code Processing

If an employee loses his/her badge unauthorized persons can misuse this badge as long as this loss has

not been  identified and the badge has not been  blocked in the system.  This misuse  can be  avoided  by

asking for the employee’s pin code at relevant entrances.

An employee’s pin code is defined in the “pin code” field of the badge. Employees who do not have a pin

code are not granted access if the pin code is requested at the entrance/access.

The opening hours of access groups define the times and weekdays or public holidays which additionally

require the pin code to be entered. This processing is enabled by setting the option “pin code required” in

the corresponding access periods.

The reason “wrong pin code” is shown  in the  access protocol for access attempts denied because of a

wrong pin code.

ZKS-EZK_81.docx

Version: 1.0.23049

Page 7 of 7

