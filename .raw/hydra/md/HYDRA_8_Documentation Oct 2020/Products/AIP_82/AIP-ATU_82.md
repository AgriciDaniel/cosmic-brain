Manual

AIP Add-On Task Switching
AIP-ATU 8.2

Version 1.0.23049

Last changed on: 01.09.2020

AIP Add-On Task Switching

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-ATU_82.docx

Version: 1.0.23049

Page 2 of 6

AIP Add-On Task Switching

Contents

1  AIP Task Switching Add-On - Overview....................................................... 4

2  AIP Add-On Task Switching ......................................................................... 5

AIP-ATU_82.docx

Version: 1.0.23049

Page 3 of 6

AIP Add-On Task Switching

1  AIP Task Switching Add-On - Overview

Purpose

Add-on to AIP if other compatible application programs are to be used on the terminals in addition to the

HYDRA  application.  There  is  the  option  to  switch  to  other  applications  directly  by  configuring  the  touch

buttons in the HYDRA control panel.

Implementation considerations

You use the function package if:

  Other applications other than HYDRA should run on the entry PC or the terminal.

  You would like to switch directly to other applications effectively and securely via the AIP (and, for

example, not using the taskbar).

Integration

The function can be added on to AIP at any time.

Features

  Capability of configuring a maximum of 9 buttons in order to switch to a maximum of nine different

applications

AIP-ATU_82.docx

Version: 1.0.23049

Page 4 of 6

AIP Add-On Task Switching

2  AIP Add-On Task Switching

AIP display

AIP allows for the integration of buttons starting third-party applications in all toolbars. These buttons

- start third-party applications if they are inactive

- bring third-party applications to the front when they are running

The customer is responsible for proper installation and functioning of third-party applications.

Configuration of the first button

In order to call up an external program, it must be entered in the section [ext. software] of the ctaip.ini file:

ProgFileName

The path and file name of the program to be requested are defined here.

WindowName

The string entered in this field is used to check in the process list if the application has already been

started. If this is the case, the running application is brought to the front.

SearchParts=On

This  option  defines  that  not  the  entire  process  name  must match  the  entered  WindowName.  It  is

sufficient if it includes the WindowName.

If further external programs should be started, a number (starting with 2) must be added to the relevant

entries.

Example:

[ext. software]
ProgFileName=c:\Windows\notepad.exe
WindowName=Notepad
SearchParts=On
ProgFileName2=c:\Windows\System32\mspaint.exe
WindowName2=Paint
SearchParts2=On

Starting  external  programs  is  similar  to  starting  dynamic  dialogs  (see  previous  chapter).  Identifiers  for

external programs are "USER1“ for the 1st entry and "USER2“ to "USER9“ for the entries that follow:

AIP-ATU_82.docx

Version: 1.0.23049

Page 5 of 6

AIP Add-On Task Switching

AIP-ATU_82.docx

Version: 1.0.23049

Page 6 of 6

