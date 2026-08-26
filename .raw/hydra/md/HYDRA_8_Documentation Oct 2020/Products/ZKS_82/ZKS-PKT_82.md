Manual

Security Check
ZKS-PKT 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Security Check

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-PKT_82.docx

Version: 1.0.23049

Page 2 of 6

Security Check

Contents

1  Security Check - Overview ........................................................................... 4

2  Bag Check .................................................................................................... 5

ZKS-PKT_82.docx

Version: 1.0.23049

Page 3 of 6

Security Check

1  Security Check - Overview

Purpose

This  function  package  offers  the  possibility  to  define  settings  for  the  access  control  that  trigger  random

security checks on employees who leave the factory premises.

Implementation notes

You use the function package if:



you  use  HYDRA  access  control  system  (ZKS)  and  want  to  specify  which  employees  are  to  be

checked on leaving the factory premises.

Integration

This  function  package  can  only  be  used  if  the  HYDRA  access  control  product  group  is  in  use  (function

package access control management functions).

You must control the exits via the HYDRA access control system to use this function.

Features

  Security check

o  Configuration of periods and frequency of security checks.

o  A signal indicates the security check to the employee and the security personnel; the exit

can optionally be locked.

o  Exemptions for specific badges that are not subject to security checks (e.g. executives).

ZKS-PKT_82.docx

Version: 1.0.23049

Page 4 of 6

Security Check

2  Bag Check

Summary

Menu

Master Data  Access Control  Bag Check

Transaction code

back

Function authorization

back

The  “bag  check”  function  allows  for  the  access  control  function  to  decide  which  employees  are  to  be

checked  when  leaving  the  premises.  The  decision  is  made  using  a  random  generator  where  the

probability can  be specified. If a bag check is to be  carried out the ZKS terminal triggers a contact that

announces the bag check by an optical or acoustic signal.

ZKS-PKT_82.docx

Version: 1.0.23049

Page 5 of 6

The “bag check” function is only provided by terminals of the type CT-385.

Security Check

Field Descriptions

Access

Access where a bag check is to be carried out.

Active

This  option  enables  or  disables  the  currently  displayed  entry.  Inactive  configurations  are  not

processed at entries.

Open entrance

This  option  defines  whether  the  entrance  is  to  be  opened  or  remains  closed  during  a  bag  check.

This  depends,  however,  on  whether  the  bag  check  takes  place  in  front  of  or  behind  the  access

point.

Bag check at … out of … access attempts

Number of checks that are to be performed for a specified number of access attempts. The above

screenshot is configured so as to check six out of 100 access attempts on average, i.e. every 17th

access  is  checked.  The  decision  is  made  for  each  entry  using  a  random  generator  with  the

probability  that  is  configured  here.  Consequently,  it  might  be  the  case  that  two  bag  checks  are

performed directly one after the other. But it may also be  the case that there are far more than 17

access attempts between two checks.

Comment

Comment on the configuration

Valid from, valid until

Validity period for the bag check. The bag check function is not restricted if the validity end date is

not filled out.

Time, until

Period of time during which the bag check is performed.

Monday, Tuesday, ..., Other day off

Weekdays  when  the  bag  check  is  performed.  Three  types  of  public  holidays  are  supported  in

addition to weekdays.

ZKS-PKT_82.docx

Version: 1.0.23049

Page 6 of 6

