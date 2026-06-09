Information Dialog

1

Information Dialog

The  info  dialog  is  opened  by  clicking/touching  the  MPDV  symbol  at  the  bottom-left  of  the  screen.

Particular special functions may be accessed from here:

Please note for info dialog and password dialog:

By default, the info/password dialog is automatically closed after 5 seconds.

The time that has to pass before one of the dialogs is closed automatically may be configured within the

CTAIP.INI file. If nothing is entered, 5 seconds are specified by default.

If  something  is  entered  in  the  password  dialog  using  the  keyboard,  the  close  timer  is  reset  and  starts

anew; the same applies for the info dialog when returning from another dialog.

The AIP HR terminal also requires the password dialog to access the debug functions.

[system]

Time till closing the About dialog in seconds

CloseAboutDialogSec=x

Time till closing the “password” dialog in seconds

ClosePasswordDialogSec=x

Meaning of the buttons:

The “BOOT” button

Allows  for  the  terminal  to  be  rebooted,  without  pulling  the  plug.  To  avoid  misuse  of  this  function,  a

password  is required (which is made known during the system administrator training).

AIP_InfoDialogue.docx

Version: 1.1.1362

Page 1 of 5

Information Dialog

The “Master” button

Is  only  shown  if  it  has  been  configured  as  the  master  terminal.  It  opens  an  overview  of  the  connected

DS100 devices. Communication to the devices can thereby be monitored.

The “DEBUG” button

Once  the  above-mentioned  password  has  been  entered,  the  “debug”  button  causes  another  menu  to

open:

Upload

The  “Upload”  function  allows  for  local  terminal  data  to  be  copied  to  the  server.  Once  the  data  to  be

transferred  has  been  selected  (normally  default  settings  can  be  kept),  the  transfer  is  started  by  clicking

the  “Start  upload”  button.  This  function  enables  the  user  to  search  for  the  cause  of  an  unexpected

behavior of the terminal.

AIP_InfoDialogue.docx

Version: 1.1.1362

Page 2 of 5

Information Dialog

A  ZIP  file  is  generated  at  the  terminal.  This  file  is  copied  as  upload2xxx.zip  file  into  the  old  SPL2xxx

directory  on  the  server  (XXX  stands  for  the  terminal  number).  All  *.ini,  *.txt,  *.cfg  files  from  the  ctaip

directory and everything as of the spool directory including the CAQ sub directories is zipped.

Window during the ZIP process at the upload

Screen for the upload at the terminal, when an upload is being performed.

Activate protocols

The “Activate protocols” function  enables various logs. Just as it the case for the upload function, these

logs are used for the analysis of terminal problems.

AIP_InfoDialogue.docx

Version: 1.1.1362

Page 3 of 5

As the functions  provided in this dialog should only  be used together  with MPDV  Support, the

individual options cannot be explained here in further detail.

Information Dialog

Timing analysis

The "Timing analysis" button is used to configure a log making the flow of various programs visible.

As  the  terminal  becomes  very  slow  if  this  function  is  enabled,  it  should  only  be  activated  on

MPDV’s request.

Further debug functions

The  “Further  debug  functions”  button  enables  touch  screen  access  to  some  debug  functions  that

otherwise can only be accessed by keyboard.

These are also functions which should only be used together with MPDV Support.

Start VNC

The “Start VNC” button calls the VNC remote control program, if this is installed by the Start menu of the

terminal. Consequently, the terminal can then be operated from a PC within the local network.

AIP_InfoDialogue.docx

Version: 1.1.1362

Page 4 of 5

Continuous long-term use of VNC is not advisable, as the program gradually fills the terminal’s

main storage. Consequently, the terminal program becomes slower and slower.

Information Dialog

AIP_InfoDialogue.docx

Version: 1.1.1362

Page 5 of 5

