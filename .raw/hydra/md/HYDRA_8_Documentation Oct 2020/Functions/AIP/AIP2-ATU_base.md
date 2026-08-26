AIP Add-On Task Switching

1  AIP Add-On Task Switching

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

AIP2-ATU_base.docx

Version: 1.0.5589

Page 1 of 1

