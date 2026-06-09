Manual

HYDRA@Web PZE Clocking
WEB-PS 8.1

Version 1.0.23049

Last changed on: 02.09.2020

HYDRA@Web PZE Clocking

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEB-PS_81.docx

Version: 1.0.23049

Page 2 of 10

HYDRA@Web PZE Clocking

Contents

1  Overview: HYDRA@Web PZE Clocking ...................................................... 4

2  Time & Attendance in WEB .......................................................................... 5

2.1  Perform clockings ................................................................................................ 6

2.2  Display of account balances ................................................................................ 7

2.3  Show recent clocking records .............................................................................. 8

2.4  Settings ............................................................................................................... 9

WEB-PS_81.docx

Version: 1.0.23049

Page 3 of 10

HYDRA@Web PZE Clocking

1  Overview: HYDRA@Web PZE Clocking

Purpose

This function package provides the opportunity to perform Time & Attendance clockings in the intranet or

internet.

Implementation notes

You use the function package if:

  employees of external sites are supposed to be integrated in Time & Attendance processes but

no PZE (T&A) terminal is installed at this location

  employees  in  field  service  are  supposed  to  perform  their  clockings  via  an  internet  compatible

device.

Integration

This function package can only be used if Time & Attendance is performed in HYDRA (function package

Recording and maintenance of labor times).

Features

  HYDRA@Web PZE clocking

o  PZE clockings via internet and/or intranet

o  Display of current account balances in internet and/or intranet

o  Display of clockings of the previous week

WEB-PS_81.docx

Version: 1.0.23049

Page 4 of 10

HYDRA@Web PZE Clocking

2  Time & Attendance in WEB

Summary

The following screen is shown to enter clockings in WEB:

WEB-PS_81.docx

Version: 1.0.23049

Page 5 of 10

The labeling and number of icons may be configured in MOC terminal configuration. The relevant terminal

number can be defined in the settings and is assigned to 254 by default.

HYDRA@Web PZE Clocking

2.1  Perform clockings

A clocking is performed by clicking one of the following icons:

Icon  Description

Clock-in

Clock-out

Clocking out for break

Absence clocking:
An absence clocking generates a clock-in or clock-out (depending on the
person's current status) including a reason for the delay or early leaving.

Open a list of absences:
The appropriate absence reason can be chosen from this list.

This dialog opens to perform a clocking:

WEB-PS_81.docx

Version: 1.0.23049

Page 6 of 10

HYDRA@Web PZE Clocking

In this dialog employees enter their personnel number or badge number and PIN code as defined in the

HR master and click OK. The personnel number or badge number and PIN code may be defined in the

settings. Consequently, these data do not have to be entered every time a clocking is performed. It is also

possible to configure there if the fields  "person",  "badge" and "PIN code" are visible at all  or if they  are

generally taken from the settings.

The field to select cost centers is only visible if it is enabled in the settings.

Once the clocking has been performed, a success message is shown in the main screen:

2.2  Display of account balances

Employees may view their current account balances by clicking the icon

:

Subject to the settings made, a dialog where the personnel number or badge number and PIN

code are to be entered might appear before account balances are shown.

WEB-PS_81.docx

Version: 1.0.23049

Page 7 of 10

HYDRA@Web PZE Clocking

2.3  Show recent clocking records

Employees may view their clockings of the previous week by clicking the icon

:

Subject to the settings made, a dialog where the personnel number or badge number and PIN

code are to be entered might appear before account balances are shown.

WEB-PS_81.docx

Version: 1.0.23049

Page 8 of 10

HYDRA@Web PZE Clocking

2.4  Settings

The performance/behavior  of the application can be configured in the  "settings" tab  when logging on to

the application:

Field description

System

It  can  be  configured  here  which  HYDRA  system  the  user  logs  on  to.  If  only  one  system  is

implemented, this system will be assigned by default.

Show "person" field, show "badge" field

These  two  options  define  if  the  user  logs  in  by  indicating  the  personnel  number  or  the  badge

number. If both options are disabled,  the application  does not show a  login dialog but the person

who is already logged in is used.

WEB-PS_81.docx

Version: 1.0.23049

Page 9 of 10

HYDRA@Web PZE Clocking

Terminal

Input  of  the  terminal  number  the  terminal  configuration  of  which  applies.  The  buttons  and  their

labeling may be defined in  terminal configuration. This field is  automatically assigned to 254. It  is

recommendable  to  use  the  terminal  number  254,  unless  several  different  configurations  are

required.

Cost center posting

This option specifies if a cost center may be selected when a clocking is performed.

Company for cost center posting

The selection list of cost centers may be restricted to a specific company by an entry in this field.

Company for absence reason list

The selection list for absence reasons may be restricted to a specific company by an entry in this

field.

WEB-PS_81.docx

Version: 1.0.23049

Page 10 of 10

