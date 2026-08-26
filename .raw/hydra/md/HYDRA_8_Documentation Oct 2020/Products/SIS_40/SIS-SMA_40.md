Manual

Basic Services for Smart MES
Applications
SIS-SMA 4.0pe

Version 1.1.23049

Last changed on: 12.06.2019

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

SIS-SMA_40.docx

Version: 1.1.23049

Page 2 of 6

Basic Services for Smart MES Applications

Contents

1  Basic Services for Smart MES Applications................................................. 4

2  SMA Login .................................................................................................... 5

SIS-SMA_40.docx

Version: 1.1.23049

Page 3 of 6

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

SIS-SMA_40.docx

Version: 1.1.23049

Page 4 of 6

Basic Services for Smart MES Applications

2  SMA Login

Overview

You must log in to SMA in order to use applications in SMA. There are two login methods: a user login and

a person login. Each application requires a specific login.

User login

For the user login, three tabs are provided: HYDRA user, Language and Settings.

  HYDRA  user:  This  tab  represents  the  actual  login.  Enter  a  valid  HYDRA  user  with  the  relevant

password. Use the link Change password to change the current password for the active user. First

enter the current password, then the new password.

  Language: You can select between the languages German, English and Chinese.  The selected

language  is  only  used  once  the  user  has  logged  in.  Before  login,  the  language  specified  in  the

browser is used, if possible. If the selected language is not licensed, the system issues an error

message informing that SMA is not available in the language selected. A login is then not possible.

  Settings: Select the HYDRA system where the user wants to log in.

If you click the button OK, the login with the relevant settings is performed.

Person login

For the person login, three tabs are provided: Person, Language and Settings.

  Person: This tab represents the actual login. To identify the person, enter the personnel number in

field Person or the staff badge number in field Badge plus the relevant pincode of the person. Use

the link Change pincode to change the current pincode for the active person. First enter the current

pincode, then the new pincode.

If  devices  of  "dormakaba"  are  used  and  you  require  the  pincode  for  the  access  control,  this

pincode must have four digits.

  Language: You can select between the languages German, English and Chinese.  The selected

language is only used once the person has logged in. Before login, the language specified in the

browser is used, if possible. If the selected language is not licensed, the system issues an error

message informing that SMA is not available in the language selected. A login is then not possible.

SIS-SMA_40.docx

Version: 1.1.23049

Page 5 of 6

Basic Services for Smart MES Applications

  Settings: Select the HYDRA system where the person wants to log in. The following settings are

available:

o  Terminal mode: If the terminal mode is activated, the personal information stored for the

session is deleted when you call the application Time and Attendance. (Use this mode if

the browser is used by several persons for clocking purposes. Here, the person must exit

the application Time and Attendance on the host when the clocking is performed. This way,

other users can perform clockings and the personal data is deleted.)

o  Show "person" field: If the terminal mode is activated, this setting or the field Show "badge"

field must also be activated.  If the terminal mode is not activated, you can use this setting

to check the relevant person again (i.e. before clocking).

o  Show "badge" field: If the terminal mode is activated, this setting or the field Show "person"

field must also be activated.  If the terminal mode is not activated, you can use this setting

to check the relevant person again (i.e. before clocking).

o  Terminal: Specifies the PZE terminal configured in HYDRA. This configuration is required

to collect times.  By default, a configuration for the terminal 254 is searched for in HYDRA.

o  Cost center posting: If this setting is activated, you can select a cost center when you make

a clocking.

o  Company for cost center posting: The entry is used as a filter to select a cost center.  Only

use this field if the cost center posting is activated.

o  Company for absence reason list: If a list of absence reasons is stored in the configured

terminal, this setting is used to add the absence reasons to the list, which are assigned to

this  company.  (Absence  reasons  without  assignment  to  a  company  +  absence  reasons

assigned to this company).

If you click the button OK, the login with the relevant settings is performed.

SIS-SMA_40.docx

Version: 1.1.23049

Page 6 of 6

