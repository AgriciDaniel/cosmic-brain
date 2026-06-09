DNC Configuration

1  DNC Configuration

Basic Configuration

In the case  of subsequent installation of DNC on  an  existing HYDRA 8 system, please follow  the steps

below:

1.  Save the existing dialog configuration:

a.  UNIX  systems  (to  be  performed  on  server  prompt  in  HYDRA  directory):  hydlgcfg.out

DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

b.  Windows systems (to be performed in a DOS window in HYDRA directory): hydlgcfg.exe

DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%% DATEI=dialog.dlg

2.  Now load the new dialog configurations with the following command:

a.  UNIX systems:

hymw.out -u9999 -b db_sql/aip_dnc.dlg

b.  Windows systems:

hymw.exe -u9999 -b db_sql\aip_dnc.dlg

This means that the DNC dialog is read as default (with type "DEF" and dialog user "999") and/or the

existing one is updated.

3.  Copy the DNC dialog from the default (type "DEF" with dialog user "999") to type "DEF" and dialog

user  "0"  on  MOC  using  the  System  settingsTerminalsDynamic  dialogs  application  (transaction

code ddconf). For this purpose, you have to change to HYDRA Professional Mode.

4.  Activate the new dynamic dialogs:

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

Please note: This command will activate the default dialogs. If the system uses terminal-

specific dialogs, these must be adapted by an MPDV consultant.

Configuration at AIP

The button for calling up the DNC is already included in the standard configuration. It is activated if the

DNC-BP license is available.

SetupDNC.docx

Version: 1.0.1362

Page 1 of 1

