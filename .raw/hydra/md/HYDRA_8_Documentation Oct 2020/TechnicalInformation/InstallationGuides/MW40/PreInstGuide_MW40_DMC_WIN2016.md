HYDRA Documentation

HYDRA MW4.0pe
Windows Server 2016
Preparation Guide for DMC

Version 1.0.23049

Last changed on: 02.09.2020

  Windows Server 2016 Preparation Guide for DMC

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 2 of 13

  Windows Server 2016 Preparation Guide for DMC

Contents

1

Introduction .................................................................................................. 4

2  Operating System ........................................................................................ 5

3  Hard Disk Layout ........................................................................................ 13

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 3 of 13

  Windows Server 2016 Preparation Guide for DMC

1

Introduction

This configuration manual explains how to configure Windows Server 2016 for use as a server for MPDVs

HYDRA Dynamic Manufacturing Control (DMC) software in a HYDRA MW4.0pe environment.

The  configuration  of  the  server  should  always  be  based  on  MPDVs  hardware  and  software

recommendations for HYDRA MW4.0pe systems.

See manuals: HW_SW_GUIDE.pdf

!ATTENTION!

The Server must be a dedicated server for running HYDRA Dynamic Manufacturing Control (DMC).

There  must  be  no  additional  functionality  used,  e.g.  like  File  Server,  Print  Server,  OPC  Server,

Domain Controller (PDC, BDC), Active Directory Controller or similar.

If the configuration of your HYDRA DMC server deviates from the configuration described in this

manual, additional efforts and expenses might be necessary for the DMC installation.

Already  agreed  shipping  or  installation  appointments  might  be  delayed  or  may  have  to  be

postponed.

HYDRA DMC might not be able to work properly on such a server.

It might even be impossible to perform a successful HYDRA DMC installation on such a server.

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 4 of 13

  Windows Server 2016 Preparation Guide for DMC

2  Operating System

  Server platform according to the hardware and software recommendations of MPDV Mikrolab GmbH

is required.

  The Windows server must be a dedicated server for running HYDRA DMC.

There  must  be  no  additional  functionality  be  used,  e.g.  like  Domain  Controller  (PDC,  BDC),  Active

Directory Controller, File Server, Print Server, OPC Server or similar.

In such cases it might be impossible to perform a successful installation of HYDRA DMC.

Pre  installation  tasks  at  a  MPDV  site  might  also  not  be  possible  or  only  with  additional  effort  and

expenses.

  Windows Server 2016 with a graphic user interface (GUI) is required.

During the installation of Windows Server 2016 select the option "Desktop Experience":

  The Windows desktop resolution should be set to 1920 x 1080 at least to 1280 x 1024.



Installed .NET Framework 4.5.2 or higher.

  The  recent  Windows  Service  Pack  approved  by  MPDV  Mikrolab  GmbH  for  HYDRA  DMC  must  be

installed on the server. See manual for hardware and software recommendations.

  All partitions must be formatted with file system NTFS.

See chapter “3 Hard Disk Layout” for more detailed information.

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 5 of 13

  Windows Server 2016 Preparation Guide for DMC

  Windows must be installed either with Desktop language English or German.

  The system locale of Windows must either be set to

“English (United States)” or “German (Germany)”:

  Virtual Memory

Automatically manage paging file size for all drives (= Windows Default, recommended by MPDV)

If  you  choose  to  use  individual  settings,  please  make  sure  to  follow  the  recommendations  of  the

operating systems manufacturer to ensure a stable and performant system.

  Network

TCP/IP network protocol (IPv4) based on a Ethernet network must be available.

Default port used by HYDRA DMC: 3270 (if necessary that port can be changed).

Depending on the extent of the DMC installation additional ports might be necessary.

  Choose any IP address and hostname for the server which suits your needs.

It is necessary that the HYDRA DMC server uses a dedicated IP address.

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 6 of 13

  Windows Server 2016 Preparation Guide for DMC

  Allow remote connections to the server:

Start-Button – Control Panel – System and Security – System – Advanced system settings –

Remote

  The local Windows Firewall should be turned off:

Start-Button  –  Control  Panel  –  System  and  Security  –  Windows  Firewall  –  Turn  Windows

Firewall on or off

If the local firewall needs to stay turned on there must be appropriate Inbound and Outbound rules

configured to allow connections to and from the required ports of HYDRA (see above):

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 7 of 13

  Windows Server 2016 Preparation Guide for DMC

  User mipadm

There  should  be  a  local  user  account  "mipadm"  with  full  name  "mipadm"  and  description

“MIP+HYDRA Administrator” (see screenshots).

Alternatively to a local user account it would be possible to provide a domain user account "mipadm"

in the customers Active Directory Domain Services.

User "mipadm" must be at least a member of the local groups "Administrators", "Remote Desktop

Users" and "Users".

The password for user “mipadm” must never expire and should be set to "Mip74821".

Optionally any other password can be used which must then be disclosed to the MPDV employees who

are installing HYDRA.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

Periodic changes of the user’s password would be possible as long as you take into account that there

might be services running on the server using the login credentials for user “mipadm”.

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 8 of 13

  Windows Server 2016 Preparation Guide for DMC

  User Account Control (UAC) must be deactivated.

Start-Button  –  Control  Panel  –  User  Accounts  –  User  Accounts  –  Change  User  Account

Control settings

Never notify



In “Local Security Policy” the following policy must be disabled:
Start-Button  –  Windows  Administrative  Tools  –  Local  Security  Policy  –  Local  Policies  –

Security Options – User Account Control: Run all administrators in Admin Approval Mode

Disabled

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 9 of 13

  Windows Server 2016 Preparation Guide for DMC

  Logon to the HYDRA DMC server as local user "mipadm".

  Start-Button – Control Panel – Appearance and Personalization – Taskbar and Navigation

Taskbar location on screen: Bottom

Combine taskbar buttons: Never

  Start-Button – Control Panel – Appearance and Personalization – File Explorer Options – View

Activate: Show hidden files, folders and drives

Deactivate: Hide extensions for known file types

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 10 of 13

  Windows Server 2016 Preparation Guide for DMC

  Start-Button – Control Panel – Appearance and Personalization – Personalization – Change

desktop icons

Activate all Dektop icons

  Right click on the Windows desktop and then in “View” select: "Small icons"

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 11 of 13

  Windows Server 2016 Preparation Guide for DMC

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

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 12 of 13

  Windows Server 2016 Preparation Guide for DMC

3  Hard Disk Layout

The size of the available hard disk(s) installed depends on the recent recommendations made by MPDV

Mikrolab GmbH for certain HYDRA Dynamic Manufacturing Control (DMC) system sizes.

There must be at least the following two partitions available: C:\ and D:\.

Depending on Windows and the available amount of RAM drive C:\ should be at least 80-100 GB in size.

Depending on the dedicated DMC system size drive D:\ must provide 100 – 500 GB of available disk space.

Available CD/DVD drives should use a drive letter at the end of the available range, e.g.: Z:\.

All partitions must be formatted with file system NTFS.

Configuration example:

C:\ NTFS

100 GB

Windows, tools and pagefile.sys

D:\ NTFS

500 GB

DMC application and DMC data and archive files

PreInstGuide_MW40_DMC_WIN2016.docxVersion: 1.0.23049

Page 13 of 13

