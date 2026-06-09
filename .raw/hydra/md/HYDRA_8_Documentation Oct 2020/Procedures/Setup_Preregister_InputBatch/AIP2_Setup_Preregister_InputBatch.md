Configuration: Advance Logon of Input Batches

1  Configuration: Advance Logon of Input Batches

Configuration: display of third list on the AIP (INI configuration)

Set the parameters/values below in the INI configuration to display the input batches logged on in advance

in the third list on the AIP:



INI name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

TNR_VANCNR =Y

When  you  have  made  the  settings  in  the  INI  configuration,  restart  the  terminal.  The  INI

configuration is only activated when the terminal is restarted.

Configuration: logon of input batches with OP logon on the AIP (INI

configuration)

Set the parameters/values below in the INI configuration to log on the input batches logged on in advance

at the same time with an OP on the AIP.



INI name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

USE_VANCNR =Y

AIP2_Setup_Preregister_InputBatch.docx  Version: 1.3.21964

Page 1 of 3

Configuration: Advance Logon of Input Batches

When  you  have  made  the  settings  in  the  INI  configuration,  restart  the  terminal.  The  INI

configuration is only activated when the terminal is restarted.

Configuration of keyboard layout on AIP2

To  define  the  function  key  "Advance  logon  of  input  batches",  copy  the  layout  gui\l_anr.xml  to

gui\l_anr_ln.xml and copy the key "BDE comments". Change the following entries in the configuration of

the copied key:

If you do not use the AIP2 tile view, define the function key in the file ctaipbut.ini:

[ANR-LN-Page2]

1=A_INFO.Dialog1,L,BDE-Kommentar,Attach Notes.png

2=A_SMG,L,Sollmenge ändern,Shipping Box Open Move Down Up.png

3=A_ELW,R,Eingangsloswechsel,CE_WL.png

4=CE_VWL_MPL,R,Eingangslosvoranmeldung,CE_WL.png

5=%BART:CAQ=J%CAQ_DC_T,R,Prüfung durchführen,Generators.png

AIP2_Setup_Preregister_InputBatch.docx  Version: 1.3.21964

Page 2 of 3

Configuration: Advance Logon of Input Batches

Configuration: Highlighting the input batches logged on in advance on the

AIP (ctaiplay.ini)

To highlight the input batches logged on in advance in color in the list of input batches, material list and

BOM on the AIP, make the following entry in the configuration file "ctaiplay.ini". Store the file on the server.

Entry in Ctaiplay.ini:

Sections: [list of input batches], [material list] and [ PRT list (KOMBI) ].

...

EXAMINE_SCANEXPR1=CST=X

EXAMINE_SCANCOLOR1=ClPurple
...

Make sure that each key is only available once in a section.

If you want to store several rules, you can integrate this using sequence numbers at the end of
the keys:

EXAMINE_SCANEXPR1=ART=T|Z

EXAMINE_SCANCOLOR1=clBlue

EXAMINE_SCANEXPR2=ATKDIFF=F

EXAMINE_SCANCOLOR2=clGreen

EXAMINE_SCANEXPR3=ATKDIFF=J

EXAMINE_SCANCOLOR3=clRed

AIP2_Setup_Preregister_InputBatch.docx  Version: 1.3.21964

Page 3 of 3

