HYDRA Documentation

HYDRA MW4.0pe
Preparation Guide for
Windows Server 2019

Version 1.0.23049

Last changed on: 02.09.2020

Preparation Guide for Windows Server 2019

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 2 of 18

Preparation Guide for Windows Server 2019

Contents

1

Introduction .................................................................................................. 4

2  Operating System ........................................................................................ 5

2.1  Web Browser Software ...................................................................................... 15

3  Hard Disk Layout ........................................................................................ 16

4  Database ORACLE .................................................................................... 17

5  Database Microsoft SQL Server ................................................................ 18

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 3 of 18

Preparation Guide for Windows Server 2019

1

Introduction

This configuration manual explains how to configure Windows Server 2019 for use as a server for MPDVs

Manufacturing Integration Platform (MIP) based products like MIP 1.1, HYDRA MW4.0pe or FEDRA 1.1.

The  configuration  of  the  server  should  always  be  based  on  MPDVs  hardware  and  software

recommendations for the respective MIP based product.

See manuals: HW_SW_GUIDE.pdf

!ATTENTION!

The Server must be a dedicated server for running any MIP based products.

There  must  be  no  additional  functionality  used,  e.g.  like  File  Server,  Print  Server,  OPC  Server,

Domain Controller (PDC, BDC), Active Directory Controller or similar.

If  the  configuration  of  your  server  deviates  from  the  configuration  described  in  this  manual,

additional efforts and expenses might be necessary for the installation of MIP based products.

Already  agreed  shipping  or  installation  appointments  might  be  delayed  or  may  have  to  be

postponed.

MIP based products might not be able to work properly on such a server.

It might even be impossible to perform a successful installation on such a server.

It might not be possible to install different MIP based products on the same server.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 4 of 18

Preparation Guide for Windows Server 2019

2  Operating System

  Server platform according to the hardware and software recommendations of MPDV Mikrolab GmbH

is required.

  The Windows server must be a dedicated server for running any MIP based product.

There  must  be  no  additional  functionality  be  used,  e.g.  like  Domain  Controller  (PDC,  BDC),  Active

Directory Controller, File Server, Print Server, OPC Server or similar.

In such cases it might be impossible to perform a successful installation of MIP based products.

Pre  installation  tasks  at  a  MPDV  site  might  also  not  be  possible  or  only  with  additional  effort  and

expenses.

  Windows Server 2019 with a graphic user interface (GUI) is required.

During the installation of Windows Server 2019 select the option "Desktop Experience":

  The Windows desktop resolution should be set to 1920 x 1080 at least to 1280 x 1024.

  The recent Windows Service Pack approved by MPDV Mikrolab GmbH for the respective MIP based

product must be installed on the server. See manual for hardware and software recommendations.

  For information about hard disk requirements and partitioning see chapter “3 Hard Disk Layout”.

All partitions must be formatted with file system NTFS.

  Windows must be installed either with Desktop language English or German.

The language versions of the operating system and the database must match!

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 5 of 18

Preparation Guide for Windows Server 2019

  The system locale of Windows must either be set to

“English (United States)” or “German (Germany)”:

If available, do not activate the option “Use Unicode UTF-8 for worldwide language support”!

  Virtual Memory:

Automatically manage paging file size for all drives (= Windows Default, recommended by MPDV)

If  you  choose  to  use  individual  settings,  please  make  sure  to  follow  the  recommendations  of  the

operating systems manufacturer to ensure a stable and performant system.

  Network

TCP/IP network protocol (IPv4) based on an Ethernet network must be available.

At least the following TCP/IP ports and port ranges must be available for MIP based products:

1434, 1521, 3300-3399, 3299, 8080, 9000-9005, 10000, 10100, 10103, 10111, 10120-10127, 10150,

10177, 18080, 30101-30108

If  these  ports  (especially  port  10000  for  HYDRA)  are  not  available  there  might  be  additional  efforts

necessary during the installation.

Additional ports  will be required when the MIP based product is supposed to be installed as a multi

system installation (e.g. HYDRA) or when additional functionality should be used.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 6 of 18

Preparation Guide for Windows Server 2019

  Choose any IP address and hostname for the server which suits your needs.

It is necessary that the MIP based product server uses a dedicated IP address.



Installed Feature .NET Framework 3.5 (includes .NET 2.0 and 3.0) is required.
Start-Button – Server Manager – Manage – Add Roles and Features

To add this feature the directory x:\sources\sxs from the Windows installation DVD is needed.

To avoid unnecessary delays during the installation please make sure this feature is activated

prior to the installation date!



Installed Visual C++ 2013 Redistributable (x64) minimum version 12.0.30501 is required, e.g.:

https://www.microsoft.com/en-US/download/details.aspx?id=40784



Installed Visual C++ 2015-2019 Redistributable (x64) minimum version 14.20.27508 is required, e.g.:

https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 7 of 18

Preparation Guide for Windows Server 2019

  Allow remote connections to the server:

Start-Button – Control Panel – System and Security – System – Advanced system settings –

Remote

  The local Windows Firewall should be turned off:

Start-Button  –  Control  Panel  –  System  and  Security  –  Windows  Defender  Firewall  –  Turn

Windows Defender Firewall on or off

If the local firewall needs to stay turned on there must be appropriate Inbound and Outbound rules

configured to allow connections to and from the required ports of the MIP based product (see above):

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 8 of 18

Preparation Guide for Windows Server 2019

  User mipadm

There  should  be  a  local  user  account  "mipadm"  with  full  name  "mipadm"  and  an  appropriate

description, e.g. “MIP Administrator” or “MIP+HYDRA Administrator”.

Alternatively to a local user account it would be possible to provide a domain user account "mipadm"

from the customers Active Directory Domain Services.

User "mipadm" must be at least a member of the local groups "Administrators", "Remote Desktop

Users" and "Users".

The password for user “mipadm” must never expire and should be set to "Mip74821".

Optionally any other password can be used which must then be disclosed to the MPDV employees who

are installing the MIP based product for you.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

Periodic changes of the user’s password would be possible as long as you take into account that there

will be at least one MIP service running on the server using the login credentials for user “mipadm”.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 9 of 18

Preparation Guide for Windows Server 2019

  User Account Control (UAC) must be deactivated.

Start-Button  –  Control  Panel  –  User  Accounts  –  User  Accounts  –  Change  User  Account

Control settings

Never notify



In “Local Security Policy” the following policy must be disabled:
Start-Button  –  Windows  Administrative  Tools  –  Local  Security  Policy  –  Local  Policies  –

Security Options – User Account Control: Run all administrators in Admin Approval Mode

Disabled

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 10 of 18

Preparation Guide for Windows Server 2019

  Log on as service

In “Local Security Policy” add the user “mipadm” to the “Log on as service Properties”
Start-Button – Control Panel – System and Security – Administrative Tools – Local Security

Policy – Local Policies – User Rights Assignment – Log on as a service

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 11 of 18

Preparation Guide for Windows Server 2019

  Logon to the MIP server as local user "mipadm".

  Start-Button – Control Panel – Appearance and Personalization – Taskbar and Navigation

Taskbar location on screen: Bottom

Combine taskbar buttons: Never

  Start-Button – Control Panel – Appearance and Personalization – File Explorer Options – View

Activate: Show hidden files, folders and drives

Deactivate: Hide extensions for known file types

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 12 of 18

  Start-Button – Settings – Personalization – Themes – Desktop icon settings

Preparation Guide for Windows Server 2019

Activate all Desktop icons

  Right click on the Windows desktop and then in “View” select: "Small icons"

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 13 of 18

Preparation Guide for Windows Server 2019

  Allow multiple Remote Desktop Sessions per User (optionally if required)

Start-Button – Windows System – Command Prompt

type in the following commands:

cd %systemroot%\system32

GPEDIT.MSC

In the Local Group Policy Editor make the following settings:

Local  Computer  Policy  –  Computer  Configuration  –  Administrative  Templates  –  Windows

Components  –  Remote  Desktop  Services  –  Remote  Desktop  Session  Host  –  Connections  –

Restrict Remote Desktop Services users to a single Remote Desktop Services session

Disabled

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 14 of 18

Preparation Guide for Windows Server 2019

2.1  Web Browser Software

If  you plan to use  MPDV’s product  Smart MES Applications (SMA) version  8.2  you must be aware that

Microsoft’s Internet Explorer (IE) is no longer supported by MPDV.

You  need  to  provide  an  alternative  web  browser  software  like  Google  Chrome  which  is  MPDV’s

recommended web browser software for using SMA 8.2.

Please make sure that Google Chrome is installed on your Windows server.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 15 of 18

Preparation Guide for Windows Server 2019

3  Hard Disk Layout

The storage demand of a MIP based system and its database usually increases over time.

Therefore the available disk storage should be large enough right from the start.

For a MIP based system we recommend the following hard disk capacity to be available:

200 GB for the MIP based application including possible archive data to be generated in the future

400 GB for the MIP based product database (default configuration)

Apart from a sufficiently large Windows boot and system partition (usually C:\) of at least 80-100 GB there

should be at least another partition D:\ available which must provide the above mentioned disk capacity of

at least 600 GB.

If there are additional hard disks and partitions available, e.g. like E:\, F:\, G:\, H:\ etc., the data files for the

MIP based product database could be spread for performance reasons.

When using online backup solutions for the database software the use of a dedicated hard disk and partition

is highly recommended.

All partitions must be formatted with file system NTFS.

CD/DVD drives should use a drive letter at the end of the available range, e.g.: Z:\.

Configuration example for a Windows server with 5 hard disks (each 500 GB in size):

1. hard disk:

C:\ NTFS

D:\ NTFS

100 GB

400 GB

Windows, tools and pagefile.sys

MIP based product and database application

2. hard disk:

E:\ NTFS

500 GB

database data files

3. hard disk:

F:\ NTFS

500 GB

database data files

4. hard disk:

G:\ NTFS

500 GB

database data files

5. hard disk (additional disk for online backup solutions):

H:\ NTFS

500 GB

backup files for online backup solutions

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 16 of 18

Preparation Guide for Windows Server 2019

4  Database ORACLE

For information about currently supported database versions please consult the recent recommendations

regarding hardware and software by MPDV Mikrolab GmbH.

If  the  Oracle  database  software  is  supposed  to  be  preinstalled  by  the  customer  himself,  please

contact MPDV Mikrolab GmbH first.

You will then be provided with the proper database installation and configuration manual(s) which will allow

you to do the installation and configuration according to the needs of the MIP based product.

If you plan to have separate application and database servers the 64Bit Oracle client software needs to be

installed on the MIP application server.

All MIP based product databases are supposed to use the character set AL32UTF8.

The use of other character sets is not supported and may cause problems with the MIP based application.

Should  the  MIP  based  product  be  installed  on  a  Windows  server  already  running  one  or  more  Oracle

databases, it is necessary that NLS_LANG in the Windows registry matches the requirements for the MIP

based product:

Key:

NLS_LANG=AMERICAN_AMERICA.AL32UTF8

If that is not possible, there is no way to install the MIP based product on such a server for the time being.

The Archive Log Mode for Oracle databases installed by MPDV Mikrolab GmbH is deactivated by default.

This will prevent an unnoticed overflow of file systems and therefore the halt of all database functionality.

The Archive Log Mode will be activated by MPDV Mikrolab GmbH on special request by the customer only.

When using online backup solutions with an activated Archive Log Mode the use of a dedicated hard disk

is highly recommended.

See chapter “3 Hard Disk Layout”.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 17 of 18

Preparation Guide for Windows Server 2019

5  Database Microsoft SQL Server

For information about currently supported database versions please consult the recent recommendations

regarding hardware and software by MPDV Mikrolab GmbH.

If the SQL Server software is supposed to be preinstalled by the customer himself, please contact

MPDV Mikrolab GmbH first.

You will then be provided with the proper database installation and configuration manual(s) which will allow

you to do the installation and configuration according to the needs of the MIP based product.

If you plan to have separate application and database servers the SQL Server Native Client software and

the SQL Server Management Studio need to be installed on the MIP application server.

The language versions of the operating system and the database must match (e.g.. English – English or

German – German).

Mixed language versions are not allowed and supported by Microsoft.

For performance reasons the write cache of the hard disk controller or the hard disks should be activated.

The recovery model for SQL Server databases installed by MPDV Mikrolab GmbH is initially set to "Simple"

by default.

This  will  prevent  an  unnoticed  overflow  of  the  transaction  log  file  and  subsequently  of  file  systems  and

therefore the halt of all database functionality.

Recovery model “Full” will be activated by MPDV Mikrolab GmbH on special request by the customer only.

When using online backup solutions with recovery model “Full”, the use of a dedicated hard disk is highly

recommended.

See chapter “3 Hard Disk Layout”.

PreInstGuide_MW40_WIN2019.docx

Version: 1.0.23049

Page 18 of 18

