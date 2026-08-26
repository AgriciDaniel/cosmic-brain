Configuration for Preregistered Input Batches

1  Configuration for Preregistered Input Batches

Configuration for Display of Third List on AIP (INI Configuration)

Please set the following parameters/values in the INI configuration for displaying input batches logged on

in advance in the third list on AIP.



Ini name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

TNR_VANCNR =Y

Configuration for Logging on Input Batches when Logging On an OP on

AIP (INI configuration)

Please set the following parameters/values in the INI configuration so that the input batches  logged on in

advance are also logged on/considered when an OP is logged on to AIP.



Ini name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

USE_VANCNR =Y

Configuration for Keyboard Layout on AIP (Ctaipbut.INI)

For  the  function  key  display  on  AIP  in  the  basic  view,  the  following  entry  must  be  made  in  the

configuration file Ctaipbut.ini. The file is to be saved accordingly on the server.

Setup_Preregister_InputBatch.docx

Version: 1.0.1362

Page 1 of 2

Configuration for Preregistered Input Batches

Entry in Ctaipbut.ini:

[ANR-LN-Page2]

1=A_INFO.Dialog1,L,BDE-Kommentar,Attach Notes.png

2=A_SMG,L,Sollmenge ändern,Shipping Box Open Move Down Up.png

3=A_ELW,R,Eingangsloswechsel,CE_WL.png

4=CE_VWL_MPL,R,Eingangslosvoranmeldung,CE_WL.png

5=%BART:CAQ=J%CAQ_DC_T,R,Prüfung durchführen,Generators.png

Configuration for Marking Input Batches Logged On in Advance on AIP

(Ctaiplay.INI)

To enable color marking of the input batches logged on in advance in the input batch list, material list and

BOM on AIP, the following entry must be made in the configuration file Ctaiplay.ini. The file is to be saved

accordingly on the server.

Entry in Ctaiplay.ini:

Coloring of preregistered batches:

Sections [input batch list], [Material list] and [ FHM list (KOMBI) ]:

...

EXAMINE_SCANEXPR1=CST=X

EXAMINE_SCANCOLOR1=ClPurple
...

Setup_Preregister_InputBatch.docx

Version: 1.0.1362

Page 2 of 2

