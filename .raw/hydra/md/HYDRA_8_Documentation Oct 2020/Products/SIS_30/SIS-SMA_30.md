Manual

Basic Services for Smart MES
Applications
SIS-SMA 3.0

Version 1.1.15248

Last changed on: 19.06.2020

Basic Services for Smart MES Applications

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-SMA_30.docx

Version: 1.1.19468

Page 2 of 7

Basic Services for Smart MES Applications

Contents

1  Basic Services for Smart MES Applications................................................. 4

2  SMA Login .................................................................................................... 5

SIS-SMA_30.docx

Version: 1.1.19468

Page 3 of 7

Basic Services for Smart MES Applications

1  Basic Services for Smart MES Applications

Overview

Smart  MES  Applications  (SMA)  provide  a  selection  of  applications,  which  can  be  used  to  work  with  a

HYDRA system via mobile devices or via WEB.

Purpose

The web-based implementation of SMA provides a wide range of uses. You can use SMA at the employee's

workplace or remotely at the customer's site. You call SMA using a HTML5 capable web browser. For some

devices,  MPDV  provides  the  possibility  to  use  SMA  as  application  (for  example  Android  devices  as  of

version 4.3; availability according to the MPDV compatibility list).

Implementation notes

Use  SMA  if  the  company  requires  mobile  access  to  the  information  managed  in  HYDRA.  You  cannot

replace an MOC with SMA. SMA supplements the MOC.

Integration

SMA is installed on an IIS server and communicates with the web service interface of HYDRA.

Features

Basic functions for the use of HYDRA MES applications on mobile devices or on the WEB.

Server  software  to  connect  the  mobile  clients  to  the  HYDRA  infrastructure.  The  login  is  based  on  the

HYDRA  authorization  concept  including  user  administration,  function  and  cost  center  authorizations,

responsibility areas, user profiles and password rules.

SIS-SMA_30.docx

Version: 1.1.19468

Page 4 of 7

Basic Services for Smart MES Applications

2  SMA Login

Overview

In order to access SMA, you need a login.  We differentiate between a HYDRA administrator login and a

user login.

Administrator login (HYDRA user login)

The administrator login is divided into three tabs: HYDRA user, language and settings.

  HYDRA user (administrator): This tab initiates the login.   You must have HYDRA administration

rights and a valid password.  You can change the current password for the assigned administrator

using the link "Change password".  You need to enter the previous password.

  Language: You can select between the languages German, English and Chinese.  The selected

language is valid when the HYDRA user is logged on.  Initially the system uses the language set

in the browser.

  Settings: Here the user can select the system to log on.

Clicking "Ok" button carries out the login of the settings.

SIS-SMA_30.docx

Version: 1.1.19468

Page 5 of 7

User login (Person login)

Basic Services for Smart MES Applications

The Person login is divided into three tabs: Person, language and settings.

  Person (HR user): This tab initiates the login.  The user must enter the staff number in the field

"Person" or the badge number in the field "Pin code" to identify the person and the relevant pincode

of the person.  The current password for the assigned user can be changed using the link "Change

password".  You need to enter the previous pincode.

  Language: You can select between the languages German, English and Chinese.  The selected

language  is valid  when the user is logged on.  Initially  the system uses the language set  in the

browser.

  Settings: Here the user can select the system to log on.  The following settings are available:

o  Terminal mode: If the terminal mode is activated, the application "Time and Attendance"

when requested deletes the previously stored personnel information.   You should use this

mode  if  the  browser  is  used  by  several  people  for  clocking  purposes.  The  person  in

question  should  then  exit  using  the  application  "Time  and  Attendance".    This  enables

another user a quick clocking and your own data is deleted accordingly.

o  Display field "Person": If the terminal mode is activated, the setting or the field "Staff badge

no" must also be activated.  This setting enables to check the relevant person again (i.e.

before clocking) if this terminal mode is not activated.

SIS-SMA_30.docx

Version: 1.1.19468

Page 6 of 7

Basic Services for Smart MES Applications

o  Display  field  "Display  badge":  If  the  terminal  mode  is  activated,  the  setting  or  the  field

"Person" must also be activated.  This setting enables to check the relevant person again

(i.e. before clocking) if this terminal mode is not activated.

o  Terminal: States the PZE terminal configured for HYDRA.  The configuration is required to

collect times.  A configuration for the terminal 254 is searched for in HYDRA by default.

o  Cost center posting: If this setting is activated, then a clocking can be made for a certain

cost center.

o  Company  for  cost  center  posting:  The  entry  is  used  as  a  filter  to  select  a  cost  center.

Please use exclusively with active cost center postings.

o

"Company  for  absence  reason  list":  This  entry  list  for  absence  reasons  is  used  in  a

configured  terminal  to  add  "reasons"  specifically  assigned  to  a  company.    (Absence

reasons with assignment to a company + absence reasons assigned to this company).

Clicking "Ok" button carries out the login of the settings.

SIS-SMA_30.docx

Version: 1.1.19468

Page 7 of 7

