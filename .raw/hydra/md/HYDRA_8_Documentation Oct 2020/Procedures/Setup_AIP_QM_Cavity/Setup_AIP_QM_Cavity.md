Configuration AIP QM Cavity Entry

1  Configuration AIP QM Cavity Entry

Basic Configuration

In  the  case  of  subsequent  installation  of  AIP  QM  cavity  entry  on  an  existing  HYDRA  8  system,  please

follow the steps below:

1.  Save the existing dialog configuration:

a.  UNIX  systems  (to  be  performed  on  server  prompt  in  HYDRA  directory):  hydlgcfg.out

DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

b.  Windows systems (to be performed in a DOS window in HYDRA directory): hydlgcfg.exe

DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%% DATEI=dialog.dlg

2.  Please load the new dialog configurations with the following command now:

a.  UNIX systems:

hymw.out -u9999 -b db_sql/aip_qm_cavity.dlg

b.  Windows systems:

hymw.exe -u9999 -b db_sql\aip_qm_cavity.dlg

This  will  mean  that  the  affected  dialog(s)  (currently  only  QEE_MW_ME_ES_PP_SI)  are  read  as

default (with type "DEF" and dialog user "999") and/or the existing one(s) is/are updated.

3.  Copy  the  dialog  QEE_MW_ME_ES_PP_SI  from  the  default  (type  "DEF"  with  dialog  user  "999")  to

type  "DEF"  and  dialog  user  "0"  on  MOC  using  the  System  settingsTerminalsDynamic  dialogs

application  (transaction  code  ddconf).  For  this  purpose,  you  have  to  switch  to  HYDRA  Professional

Mode.

4.  Activate the new dynamic dialogs:

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

Please  note:  This  command  will  activate  the  default  dialogs.  If  the  system  uses  terminal-

specific dialogs, these must be adapted by an MPDV consultant.

5.

If  terminal  groups  are  used,  the  dialogs  are  to  be  copied  to  the  relevant  groups  and  activated  for

these terminal groups.

Setup_AIP_QM_Cavity.docx

Version: 1.0.1362

Page 1 of 1

