Configuration of the AIP Document Management

1  Configuration of the AIP Document Management

Purpose

You use the AIP Document Management to store documents, information, etc. for any objects.

Currently, the document management supports the following objects by default:

Object

Batch

Documents assigned to a "batch"

Description

Maintenance

Documents assigned to a "maintenance"

MaintenanceReset

Documents assigned to a "maintenance reset"

Requirements

To use the AIP document management, you require the following components in the specified versions:

Program

Version

Description

ctaip.exe

2.0.3.13

Terminal program

./etc/mpdv-aip.zip

xx.05.2014

Terminal scripts (aip_mpdv-DOCLINK*.scr)

Configuration to call the document management

You  can  call  the  document  management  from  a  dialog/workflow  if  you  configure  a  button  with  the

following attributes:

Field / attribute

Function

License

DLG=DOCLINK

DOC-LINK

Return code

9

Value

ID

ID index

Configuration of the document object to be stored, e.g.
batch
-  BATCH
maintenance
-  MAINTENANC

VIEW
Optional, to lock the functions "Add, Modify, Delete" in the dialog
Assign documents - DOCLINK.

AIP_setup_doclinks.docx

Version: 1.3.21037

Page 1 of 5

Configuration of the AIP Document Management

Reset maintenance

To  create  the  button  in  the  dialog  Reset  maintenance  (RES_WART),  tab  "Reset  maintenance"

(WF_RES_WART_CHK), perform the following steps in the HYDRA server:

a.  UNIX  systems:  Run  the  following  commands  in  a  server  prompt  in  the  HYDRA  directory.  Make

sure  that  you  have  loaded  the  environment  variables  of  the  required  HYDRA  system  (request:

hysys.scr).

b.  Windows systems: Run the following commands in a DOS prompt in the HYDRA directory. Make

sure  that  you  have  called  the  DOS  prompt  for  the  required  HYDRA  system  from  the  folder

"HYDRA system administration".

2.  Back up the existing dialog configuration:

a.  UNIX systems:

hydlgcfg.out DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

b.  Windows systems:

hydlgcfg.exe

DLGCFG.TYP=%%

DLGCFG.DLGUSR=%%

DLGCFG.DLG=%%

DATEI=dialog.dlg

3.  Use the command listed below to load the configuration for the button "Document management".

If you want to lock the functions "Add, Modify, Delete" in the dialog  Assign documents,

add

the  value  VIEW

to

the  parameter  DLGBTN.KENNIDX

in

the  command:

DLGBTN.KENNIDX=VIEW.

a.  UNIX systems:

hymw.out -u9999 -

c"DLG=DLGBTN.INSERT|DLGCFG.DLG=WF_RES_WART_CHK|DLGCFG.TYP=AIPDEF|DLGCFG.

DLGUSR=0|DLGBTN.NR=3|DLGBTN.KENN=MAINTENANC|DLGBTN.KENNIDX=|DLGBTN.TASTE

=|DLGBTN.TXT=Dokumentenzuordnung|DLGBTN.INFO=Dokumentenzuordnung|DLGBTN.

ICON=TABLE.PNG|DLGBTN.FKT=DLG=DOCLINK|DLGBTN.RCODE=9|DLGBTN.AKTIV=

|DLGBTN.LIZ=DOC-

LINK|DLGBTN.POSX=310|DLGBTN.POSY=400|DLGBTN.X=100|DLGBTN.Y=30|DLGBTN.USR

DEF:1=AUTO|DLGBTN.USRDEF:2=|DLGBTN.USRDEF:3=|DAT=today|ZEI=now|"

b.  Windows systems:

hymw.exe -u9999 -

c"DLG=DLGBTN.INSERT|DLGCFG.DLG=WF_RES_WART_CHK|DLGCFG.TYP=AIPDEF|DLGCFG.

AIP_setup_doclinks.docx

Version: 1.3.21037

Page 2 of 5

Configuration of the AIP Document Management

DLGUSR=0|DLGBTN.NR=3|DLGBTN.KENN=MAINTENANC|DLGBTN.KENNIDX=|DLGBTN.TASTE

=|DLGBTN.TXT=Dokumentenzuordnung|DLGBTN.INFO=Dokumentenzuordnung|DLGBTN.

ICON=TABLE.PNG|DLGBTN.FKT=DLG=DOCLINK|DLGBTN.RCODE=9|DLGBTN.AKTIV=

|DLGBTN.LIZ=DOC-

LINK|DLGBTN.POSX=310|DLGBTN.POSY=400|DLGBTN.X=100|DLGBTN.Y=30|DLGBTN.USR

DEF:1=AUTO|DLGBTN.USRDEF:2=|DLGBTN.USRDEF:3=|DAT=today|ZEI=now|"

The command integrates the button in the default dialog (type AIPDEF, dialog user 0). If

you  use  terminal-specific  dialogs  in  the  system,  you  must  adjust  the  command  to  the

terminal-specific dialogs. If required, you may contact MPDV.

4.  Activate the new dynamic dialogs:

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

This  command  activates  the  default  dialogs.  If  you  use  terminal-specific  dialogs  in  the

system, you must also activate these dialogs.

5.  Restart the terminals.

Layout configurations of the document management

This section describes the contents of the configuration file "doclink.ini". The configuration file is

usually supplied with the AIP 8.1 or AIP 8.2. In general, no changes are required here.

You  configure  the  display  of  the  dialog  Assign  documents  in  the  file  "doclink.ini"  in  the  section

"DOCLINK.LST":

[ DOCLINK.LST ]
GRID_FONT=Microsoft Sans Serif
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=SORT

GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=DOCTYPE,TYPE,URL-clAqua|TEXT-clLime|FILE-clSilver|FILELINK-clYellow

SORT=N10,80,R,lkSORT
DOC_ID=C10,80,Z,lkDOC_ID
OBJECT=C10,120,Z,lkOBJECT
TYPE=C10,0,Z,lkTYPE
DOCTYPE=C10,120,Z,lkDOCTYPE
BEZ=C150,150,L,lkBEZ
URL=C150,650,L,lkURL

AIP_setup_doclinks.docx

Version: 1.3.21037

Page 3 of 5

Configuration of the AIP Document Management

You  configure  the  display  of  the  link  types  that  you  can  select  in  the  file  "doclink.ini"  in  the  section

"DOCLINK.LST":

[ DOCLINKTYPE.LST ]
GRID_FONT=Microsoft Sans Serif
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=TYPE

GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=DMY,TYPE,URL-clAqua|TEXT-clLime|FILE-clSilver|FILELINK-clYellow

DOCTYPE=C35,300,Z,lkDOCTYPE
DMY=C1,30,Z
TYPE=C25,200,Z,lkTYPE

AIP_setup_doclinks.docx

Version: 1.3.21037

Page 4 of 5

Configuration of the AIP Document Management

You require the following mapping to link the terminal configuration and the server processing. Note the

following:

  The identifiers of the terminal configuration are written in upper case letters.

  The identifiers of the server configuration use the CamelCase notation.

  The identifiers are fixed and may not be changed.

You use the file "doclink.ini" in the section "DOCLINK->OBJECT" for the configuration, e.g.:

[ DOCLINK->OBJECT ]
BATCH=Batch
MAINTENANC=Maintenance
MAINTENANCERESET=MaintenanceReset

Further application configurations

Resetting a maintenance

Using  the  configuration  "RECORDING=ON",  you  can  activate  the  recording  of  document  assignments

after a "Maintenance reset". This configuration is not active by default.

You  perform  this  configuration  in  the  file  "doclink.ini"  in  section  "[MAINTENANCERESET  0]"  for  all

terminals and in section "[ MAINTENANCERESET 2xxx ]" for a HYDRA user (2000+terminal number):

; Activation
[MAINTENANCERESET 0 ]
RECORDING=ON
POPUP=ON

[MAINTENANCERESET 2090 ]
RECORDING=ON
POPUP=ON

Using  the  configuration  "POPUP=ON",  you  can  configure  a  confirmation  prompt  for  all  terminals/for  a

HYDRA USER in the respective section. This prompt must be answered/closed by clicking "Yes" to call

the document management.

AIP_setup_doclinks.docx

Version: 1.3.21037

Page 5 of 5

