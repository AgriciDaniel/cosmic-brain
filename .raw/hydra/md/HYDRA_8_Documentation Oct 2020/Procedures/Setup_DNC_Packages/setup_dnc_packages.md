Configuration of DNC Package Management

1  Configuration of DNC Package Management

Basic configuration

The DNC package management and current DNC dialogs (enabled) must be installed in order to use the

function.

Dialog installation

1.  Save the existing dialog configuration:

a.  UNIX  systems  (execution  in  the  server  prompt  in  the  HYDRA  directory):  hydlgcfg.out

DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

b.  Windows  systems  (execution  in  a  DOS  screen  in  the  HYDRA  directory):  hydlgcfg.exe

DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%% DATEI=dialog.dlg

2.  Now load the new dialog configurations by using the following command:

a.  UNIX systems:

hymw.out -u9999 -b db_sql/aip_dnc_ppk.dlg

b.  Windows systems:

hymw.exe -u9999 -b db_sql\aip_dnc_ppk.dlg

As a result of this, the DNC dialogs are  imported as  template (with type  "AIPDEF" and dialog user

"999") and/or any existing dialog is updated.

3.  Copy  the  DNC  dialogs  from  the  template  (type  "AIPDEF"  with  dialog  user  "999")  to  type  "AIPDEF"

and dialog user "0" in the MOC using the application System settingsTerminalsDynamic dialogs

(transaction code ddconf). For this purpose, you have to change to the HYDRA Professional Mode.

4.  Activate the new dynamic dialogs:

setup_dnc_packages.docx

Version: 1.0.6493

Page 1 of 4

Configuration of DNC Package Management

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

Please note: This command activates the default  dialogs. If terminal-specific dialogs are

used in the system, they have to be adapted by an MPDV consultant.

Configuration of Hytnrcfg.ini

The file Hytnrcfg.ini is used to configure whether the BOM explosion and the serial processing (stop after

each transferred program and manual confirmation of the start of the next program transfer)  are used. If

the file Hytnrcfg.ini does not include any entry, the functions are deactivated.

; Activation of DNC channel formation with BOM item

EVAL_SLP=ON

; Activation of serial DNC package processing

SERIAL=ON

Activation of DNC channel formation with BOM item

If this option is activated, the BOM items are considered upon the upload and download of DNC

resources. This allows for transferring various DNC resources to different driver components.

The superordinate resource is always transferred to the driver with the channel configuration

D:DNC_<MNR>.  The  subordinate  resources  are  transferred  to  the  drivers  with  the  channel

configuration D:DNC_<MNR>_<SLP> in accordance with their BOM item (SLP).

Activation of serial DNC package processing

If  this  option  is  activated,  the  upload  or  download  stops  after  each  resource  transfer  and  a

dialog  has  to  be  confirmed  on  the  AIP,  stating  that  the  next  DNC  resource  can  now  be

transferred.

Configuration of ctaiplay.ini

You have to maintain the DNC list "PPK" in the file ctaiplay.ini in order for the packages to be marked in

color in the DNC dialog and the individual elements of the package to be visible.

setup_dnc_packages.docx

Version: 1.0.6493

Page 2 of 4

Configuration of DNC Package Management

[DNC list PPK]
GRID_FONT=Arial
GRID_FONTSIZE=9
;GRID_COLOR=clBlack
;GRID_BACKGROUND=clWhite

EXAMINE_SCANEXPR1=HARC:TYP=H
EXAMINE_SCANCOLOR1=clBlue

MVERWEIS=C10,30,L

RESTYP=C15,80,L,Typ
RES=C15,150,L,Element/Paket
RESFAM=C15,110,L,DNC-Familie
DATEI_SIZE=N6,60,R,Größe
DATEI_LOKAL=C1,15,L,V
RESSTABEZ=C20,80,L,Status
SSPERR=C20,90,Z,Sammelsperre

Model configuration of DNC channels for BOM explosion.

Starting situation:

The BOM explosion is activated in the file Hytnrcfg.ini. The dncficpy is used. The machine is designated

as MNR.

The  superordinate  DNC  resource  is  to  be  transferred  to  the  directory  "C:\dnc-programme\dnc\".  For  the

subordinate  DNC  resources  with  the  BOM  item  "1",  "C:\dnc-programme\1\"  is  configured  as  the  target

directory.

Dncficpy.ini
[SERVICE]
info=dncficpy.dll
intervall=500
testmode=0
tracing=1
TraceLevel=5
ExecuteQueue=0
Version=dncficpy 7.2.2.8 / 04.11.2013

[DNC001]
DNCProtokoll=ON

;TIMEOUT-DELETE-DOWNLFILES=10
;DNCTIMEOUT=300
;CLR_AFTER_DOWNLOAD=OFF
DOWN-DEST-EXT=DNC

D:DNC_MNR=C:\dnc-programme\dnc\

setup_dnc_packages.docx

Version: 1.0.6493

Page 3 of 4

Configuration of DNC Package Management

POLL=0
POLL_I=100

[DNC002]
DNCProtokoll=ON

;TIMEOUT-DELETE-DOWNLFILES=10
;DNCTIMEOUT=300
;CLR_AFTER_DOWNLOAD=OFF

D:DNC_MNR_1= C:\dnc-programme\dnc1\

POLL=0
POLL_I=100

DNC family allocation (MOC)

Filtering  of  DNC  resources  in  the  AIP  based  on  user  fields  only  takes  place  for  resources  of  the  DNC

family  with  the  "Default"  characteristic  in  the  "DNC  family/machine  assignment".  If  subordinate  DNC

resources  are  an  integral  part  of  other  families,  these  families  must  also  be  assigned  to  the  machine

(without "Default" flag).

DNC package formation

DNC packages are configured via the BOM application in HYDRA 8. A program package always consists

of a superordinate DNC resource and its subordinate DNC resources.

The upload and download of existing DNC packages implies a single-level BOM explosion.

Upload of DNC package resources

New resources (and/or new DNC packages) can only be uploaded as individual elements.  Later you can

combine these individual elements in a DNC package using the BOM in the MOC.

As  regards  existing  DNC  packages,  both  an  individual  download  of  a  single  resource  and  an  overall

transfer of all DNC resources of the package is possible.

setup_dnc_packages.docx

Version: 1.0.6493

Page 4 of 4

