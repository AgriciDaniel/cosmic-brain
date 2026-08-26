|     |     |     | AIP Add-On Task Switching  |     |
| --- | --- | --- | -------------------------- | --- |

1  AIP Add-On Task Switching
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
1=M_INFO,L,,InfoRed.png

| 2=VIEW,L,,VirtualTourSmall.png                            |     |     |     |     |
| --------------------------------------------------------- | --- | --- | --- | --- |
| 3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png  |     |     |     |     |
| 4=M_MST,L,Status ändern,Status Flag Yellow.png            |     |     |     |     |
| 5=$DNC-BP$DNC,L,DNC,DNC.png                               |     |     |     |     |
| 6=M_INFO.MSPROT,L,Statusprotokoll,Table.png               |     |     |     |     |
7=USER1,R,Total Cmd
The actual functions are configured in section [ext. software] of the configuration file ctaip.ini:
[ext. software]

Button=Commander
WindowName=Total Commander
| ProgFileName=c:\Program Files\totalcmd\TOTALCMD.EXE  |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- |
SearchParts=On
Configuring additional buttons
Additional buttons that can be used to access external software are configured for "USER2" through
"USER9" in ctaipbut.ini. Example:

| AIP-ATU_base.docx  |     | Version: 1.0.1362  |     | Page 1 of 2  |
| ------------------ | --- | ------------------ | --- | ------------ |

|     |     |     | AIP Add-On Task Switching  |     |
| --- | --- | --- | -------------------------- | --- |

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

| AIP-ATU_base.docx  |     | Version: 1.0.1362  |     | Page 2 of 2  |
| ------------------ | --- | ------------------ | --- | ------------ |