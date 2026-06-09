Manual
AIP AddOn Task Switching
AIP-ATU 8.1
Version 1.0.23049
Last changed on: 01.09.2020

AIP AddOn Task Switching
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
AIP-ATU_81.docx Version: 1.0.23049 Page 2 of 6

|     |     |     | AIP AddOn Task Switching  |     |
| --- | --- | --- | ------------------------- | --- |

Inhaltsverzeichnis
1  AIP Task Switching Add-On - Overview....................................................... 4
2  AIP Add-On Task Switching ......................................................................... 5

| AIP-ATU_81.docx  |     | Version: 1.0.23049  |     | Page 3 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |

AIP AddOn Task Switching
1 AIP Task Switching Add-On - Overview
Purpose
Add-on to AIP if other compatible application programs are to be used on the terminals in addition to the
HYDRA application. There is the option to switch to other applications directly by configuring the touch
buttons in the HYDRA control panel.
Implementation considerations
You use the function package if:
 Other applications other than HYDRA should run on the entry PC or the terminal.
 You would like to switch directly to other applications effectively and securely via the AIP (and, for
example, not using the taskbar).
Integration
The function can be added on to AIP at any time.
Features
 Capability of configuring a maximum of 9 buttons in order to switch to a maximum of nine different
applications
AIP-ATU_81.docx Version: 1.0.23049 Page 4 of 6

|     |     |     | AIP AddOn Task Switching  |     |
| --- | --- | --- | ------------------------- | --- |

2  AIP Add-On Task Switching
Display on the AIP
Buttons for external applications can be integrated into all AIP key bars
- to start the external application when it is not currently running
- to run the external application in the foreground while it is currently being executed
The customer is responsible for assuring that the external application is correctly installed and functions
properly.
Configuring the first button
The first button that can be used to access external software is configured for "USER1" in ctaipbut.ini.
Example:
[MNR-ALL-Page1]

| 1=M_INFO,L,,InfoRed.png                                   |     |     |     |     |
| --------------------------------------------------------- | --- | --- | --- | --- |
| 2=VIEW,L,,VirtualTourSmall.png                            |     |     |     |     |
| 3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png  |     |     |     |     |
4=M_MST,L,Status ändern,Status Flag Yellow.png

| 5=$DNC-BP$DNC,L,DNC,DNC.png                  |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- |
| 6=M_INFO.MSPROT,L,Statusprotokoll,Table.png  |     |     |     |     |
7=USER1,R,Total Cmd
The actual functions are configured in section [ext. software] of the configuration file ctaip.ini:
[ext. software]
Button=Commander
WindowName=Total Commander
ProgFileName=c:\Program Files\totalcmd\TOTALCMD.EXE

SearchParts=On
Configuring additional buttons
Additional buttons that can be used to access external software are configured for "USER2" through
"USER9" in ctaipbut.ini. Example:

| AIP-ATU_81.docx  |     | Version: 1.0.23049  |     | Page 5 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |

|     |     |     | AIP AddOn Task Switching  |     |
| --- | --- | --- | ------------------------- | --- |

[MNR-ALL-Page1]
| 1=M_INFO,L,,InfoRed.png         |     |     |     |     |
| ------------------------------- | --- | --- | --- | --- |
| 2=VIEW,L,,VirtualTourSmall.png  |     |     |     |     |
3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

| 4=M_MST,L,Status ändern,Status Flag Yellow.png  |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | --- |
| 5=$DNC-BP$DNC,L,DNC,DNC.png                     |     |     |     |     |
| 6=M_INFO.MSPROT,L,Statusprotokoll,Table.png     |     |     |     |     |
7=USER1,R,Total Cmd
8=USER2,R,Notepad
The actual functions are configured in section [ext. software] of the configuration file ctaip.ini:
[ext. software]
Button2=Notepad
WindowName2=Notepad
ProgFileName2=c:\WINDOWS\NOTEPAD.EXE
SearchParts2=On
Consequently,  a  maximum  of  nine  buttons  can  be  configured  in  ctaip.exe  (USER1..USER9).  The
respective  entries  in  [ext.  software]  receive  a  corresponding  index  for  this  purpose  (Button2,
Windowname2, …).
Field descriptions
Button(x)
Logical name of the button
WindowName(x)
Window title for the external application running
ProgFileName(x)
Windows path and file name for the external application
SearchParts(x)
If "SearchParts=On“, then AIP uses a substring search to determine the window to switch to the
| external application that is running:  |     |     |     |     |
| -------------------------------------- | --- | --- | --- | --- |
WindowsName=Total Commander then also finds the window entitled
"Total Commander 7.5"

| AIP-ATU_81.docx  |     | Version: 1.0.23049  |     | Page 6 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |