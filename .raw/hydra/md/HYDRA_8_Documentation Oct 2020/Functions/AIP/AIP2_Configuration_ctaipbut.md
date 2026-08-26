AIP2 - Lokale Konfigurationsdatei ctaipbut.ini
1 AIP2 - Local Configurations File ctaipbut.ini
Buttons are configured for specific terminals in the file ctaipbut.ini stored in the terminal directory
c:\MPDV\AIP2.
The button pages of the main view and the OP info dialog may be configured in the configuration file
ctaipbut.ini.
The buttons can only be configured like this in the main view if the new design of the
AIP2 has been deactivated.
The server directory \<serverDir>\ctnet\win\aip2 contains the complete INI files of the
standard. Deviations from this are created in the customer-specific directories provided
for this purpose, e.g. \<serverDir>\1\custom\aip2\tgrp_901.
Create the corresponding, empty file (e.g.: ctaipbut.ini) in this directory. Copy all sections
e.g. [ANR-ALL-Page1] to this file. The configuration is performed in this file.
After the terminal restart a merge (summary) of the files from the root directory
\<serverDir>\ctnet\win\aip2 with the files of the custom directory
\<serverDir>\1\custom\aip2\tgrp_901 takes place, which are transferred locally to the
terminal in the directory c:\MPDV\AIP2.
All sections including the string "-Page" are imported.
AIP2_Configuration_ctaipbut.docx Version: 1.3.22316 Page 1 of 6

    AIP2 - Lokale Konfigurationsdatei ctaipbut.ini

Entry  Comment
Definition of sections  General schematic structure of a button page
  Definition of a section
[ LST-MODUS-PageX.]  LST  = List identifier of the button page
     ( MNR, ANR, LIST3)
MODUS = Mode of the machine
|   LN = MPL – Mode  |     |     |
| ------------------ | --- | --- |
|   DN = DLL – Mode  |     |     |
  LR = RF – Mode (reel-based manufacturing)
  LS = RS – Mode (cutting reels)
|   LC = Handling unit (packing station)  |     |     |
| --------------------------------------- | --- | --- |
or
|   XX = <MPL_MOD>[1] + <TYPE>[]  |     |     |
| ------------------------------- | --- | --- |
  YY = Value from the MNR.LST column
  <MNRBTN.MODUS>
| Otherwise           |  if no applicable entry is found for the machine  |     |
| ------------------- | ------------------------------------------------- | --- |
| mode, the section   |                                                   |     |
|   ...ALL            |  will be used (if available)                      |     |
X  = Button page
The definition specifying the mode a machine is running on is
implemented in the AIP application program.
General structure:
Sample configuration

x=<Function>,<Alignment>,<ButtonName>,<Icon>
[MNR-...-Page1]

1=A_AN, L, log on OP  For example:
1=A_AN,L,log OP on,AGAN.PNG
2=BLANK, L

3=$MPL-PAL$PAL_AN,L,log  on
| - Function  | A_AN  |     |
| ----------- | ----- | --- |
pallet,
| - Alignment  | L or R (from the first "R“ on always "R“)  |     |
| ------------ | ------------------------------------------ | --- |

| - ButtonName  | Log on OP  |     |
| ------------- | ---------- | --- |
4=%BART:PZE=J%PZE,R,PZE,PZE.
| - Icon    | optional icon name   |     |
| --------- | -------------------- | --- |
PNG
|     | (PNG, resolution 24x24 px)  |     |
| --- | --------------------------- | --- |

  Note:  Special functions:
In one section numbering of entries

must be consecutive from 1...n. A gap  $...$ (e.g. $MPL-PAL$ )
in numbering indicates the completion
| License check  | fails    |     |
| -------------- | -------- | --- |
of a page!
 Button is deleted

%...% (e.g. %BART:PZE=J% . )
| Check field with value in (T)terminal (K) label   |     |     |
| ------------------------------------------------- | --- | --- |
 only show if they match

BLANK
Insert distance between buttons

AIP2_Configuration_ctaipbut.docx  Version: 1.3.22316  Page 2 of 6

    AIP2 - Lokale Konfigurationsdatei ctaipbut.ini

Entry  Comment
Configuration  of  functions  using  The dialog to be opened is located as described below if buttons
| wildcards               | are configured using wildcards  |     |     |     |     |
| ----------------------- | ------------------------------- | --- | --- | --- | --- |
|   x=A_AN*,L, log on OP  | ID A_AN*                        |     |     |     |     |
  - Calling dialog: A_AN

    - Identification of the machine type
  x=A_UN*,R, interrupt OP
|     |     -  Supplementing  |     | the  dialog  | based  | on  the  |
| --- | --------------------- | --- | ------------ | ------ | -------- |
   machine type
    -  Check whether or not the dialog is available
       if this is the case - calling dialog: A_AN_MPL
  - Evaluation of the posting type (only with A_AN)
    - Supplementing the dialog based on the posting type
    -  Check whether or not the dialog is available
             if this is the case - calling dialog: A_P_AN_MPL
  - Calling up the located workflow or dialog

If the function is <A_UN*> or <A_AB*>, it will be checked whether
or not the OP to be logged off is a merged OP.
|     |  - If this is the case,   |     | <A_UN*> is changed into <SA_UN>  |     |     |
| --- | ------------------------- | --- | -------------------------------- | --- | --- |
|     |                           | or  | <A_AB*> into <SA_AB>             |     |     |

If the virtual column <MNRDLG.SUFFIX> includes a value, it will
always be used (if available).
|                            |       ButtonFkt                                   | MNRDLG.SUFFIX      Dialog  |                   |     |     |
| -------------------------- | ------------------------------------------------- | -------------------------- | ----------------- | --- | --- |
|                            |  e.g.   A_AN*        <XYZ>                        |                            |    A(_P)_AN_XYZ   |     |     |
|                            |            A_TR*                                  |     <ABC>                  |         A_TR_ABC  |     |     |
| Further standard buttons:  | Lock status "production"                          |                            |                   |     |     |
| P_SPERRE                   | Switching of the basic view:                      |                            |                   |     |     |
| VIEW                       | List view  presentation of individual machines  |                            |                   |     |     |
ICON  Calling up icon view (only possible if configured in the machine
configuration)
PDV_ISTW
Calling up the actual value view of PDV
WF_BDE_KOM
| SA_AN     | Input of BDE comments              |     |     |     |     |
| --------- | ---------------------------------- | --- | --- | --- | --- |
| DNC       | Log on merged operation            |     |     |     |     |
| MINIMIZE  | Calling up the DNC startup screen  |     |     |     |     |
Minimizing of the terminal program  Windows 7 requires the
compatibility mode XP
USER1…USER9
User-defined buttons showing and starting external software
The programs are configured in the section [ext. software] of the
ctaip.ini file
|     | Consequently,  | the  relevant  | info  dialog  | including  the  | selected  |
| --- | -------------- | -------------- | ------------- | --------------- | --------- |
Button IDs for the machine info
[MNR-ALL-Page2]  page is opened in the foreground. Switching to other pages is
allowed.
1=M_INFO.INFO,L,show
information  M_INFO may be used to show the info page in the foreground:
  M_INFO=M_INFO.INFO
2=M_INFO.PERS,L,staff
3=M_INFO.MSPROT,L,machine
status log

AIP2_Configuration_ctaipbut.docx  Version: 1.3.22316  Page 3 of 6

|     |     |     |   AIP2 - Lokale Konfigurationsdatei ctaipbut.ini  |     |     |     |
| --- | --- | --- | ------------------------------------------------- | --- | --- | --- |

|     | Entry  |                |                | Comment       |                 |           |
| --- | ------ | -------------- | -------------- | ------------- | --------------- | --------- |
|     |        | Consequently,  | the  relevant  | info  dialog  | including  the  | selected  |
Button IDs for OP info:
[ANR-ALL-Page3]  page is opened in the foreground. Switching to other pages is
allowed.
1=A_INFO.DOKU,L,documents
2=A_INFO.HILF,L,production  A_INFO  may  be  used  to  show  the  information  page  in  the
foreground:
resources and tools
| 3=A_INFO.KOMP,L,components  |     |   A_INFO= A_INFO.INFO  |     |     |     |     |
| --------------------------- | --- | ---------------------- | --- | --- | --- | --- |
| 4=A_INFO.BMK,L,RPA          |     |                        |     |     |     |     |
| 5=A_INFO.FORT,L,progress    |     |                        |     |     |     |     |
6=A_INFO.NOTE,L,notes
Direct call of user-defined pages configured in the section [OP

info] of the ctaiplay.ini file.

Example:

Dialog1=WF_BDE_KOM_LIST,BDE comments
| A_INFO.TEXT1,L,User  | text1  |     |     |     |     |     |
| -------------------- | ------ | --- | --- | --- | --- | --- |
 A_INFO.DIALOG1,L,BDE comments
| A_INFO.PICT1,L,User    | image1  |     |     |     |     |     |
| ---------------------- | ------- | --- | --- | --- | --- | --- |
| A_INFO.SCRINF1,L,User  |         |     |     |     |     |     |
scriptInfo1

A_INFO.DIALOG1,L,User
dialogs

Configuration of a function  In  the  configured  examples,  the  dialog  <  RES_WART  >  is
| with different modes  |     |     |     |     |     |     |
| --------------------- | --- | --- | --- | --- | --- | --- |
requested with the below-mentioned modes.
| Just as it is the case for  |     | 1 < MNR >  |     |     |     |     |
| --------------------------- | --- | ---------- | --- | --- | --- | --- |
| the  configuration          | of  | the        |     |     |     |     |
2 < RES >
| ANR/MNR                     | info  tabs,  | a               |     |     |     |     |
| --------------------------- | ------------ | --------------- | --- | --- | --- | --- |
| function can be configured  |              | 3 without mode  |     |     |     |     |

with different modes.
1=RES_WART.MNR,L,machine  The values can be read out as follows in the terminal script.
maintenance
|     |     | VPar(“BTN.FKT“)  | Function + mode  |     |     |     |
| --- | --- | ---------------- | ---------------- | --- | --- | --- |
2=RES_WART.RES,L,resource
|     |     | VPar(“BTN.FUNC“)  | Function  |     |     |     |
| --- | --- | ----------------- | --------- | --- | --- | --- |
maintenance
|     |     | VPar(“BTN.MODE“)  | Mode  |     |     |     |
| --- | --- | ----------------- | ----- | --- | --- | --- |
3=RES_WART,L,other
maintenance

AIP2_Configuration_ctaipbut.docx  Version: 1.3.22316  Page 4 of 6

AIP2 - Lokale Konfigurationsdatei ctaipbut.ini
Entry Comment
Available button sections and
buttons for pages of the OP info
dialog:
Overview
[A_INFO-Page1]
Document view
[A_INFO.DOKU-Page1]
3=AI_VIEW,R,open document Production resources and tools
4=AI_VIEW_CLOSE,R,close
document
Components
[A_INFO.HILF-Page1]
Resource Performance Accounts (RPA)
[A_INFO.KOMP-Page1]
Progress bar
[A_INFO.BMK-Page1]
Notes
[A_INFO.FORT-Page1]
Configuration of a default page (used if no section is defined for
[A_INFO.NOTIZ]
the tab).
The IDs may also be used for the keys in the dynamic dialog
[A_INFO.DEFAULT-Page1]
(field "function").
Recommended for all pages:
1=AI_CLOSE,L,close OP
information
Available button sections and
buttons for pages of the machine
info dialog:
[M_INFO-Page1]
Overview
[M_INFO.PERS-Page1]
Staff logged on
2=P_AN,R,log person on
3=P_AB,R,log person off
4=P_AAB,R,log everyone off
[M_INFO.MSPROT-Page1]
Machine status log
Configuration of a default page (used if no section is defined for
[M_INFO.DEFAULT-Page1]
the tab).
For all pages:
1=MI_CLOSE,L,close machine
information
AIP2_Configuration_ctaipbut.docx Version: 1.3.22316 Page 5 of 6

AIP2 - Lokale Konfigurationsdatei ctaipbut.ini
Entry Comment
Definition of sections General section for the configuration of global settings for
[ ButtonPanel ] all used button panels
 2 in main view ( MNR , ANR )
 (W)ork(F)low
functionkey_visible=on Shows function keys (e.g. "F3") in button panels in order for the
selection to be made using function keys (by default = off ).
radiobuttonkey_visible=on Presentation of function keys in radio group boxes of a workflow
(by default = off).
functionkey_pze_visible=on Display of function keys in PZE module (by default = off ).
Definition of sections General section configuring functions of the configurable
[ LIST3-ALL-Page1 ] third list of the main screen.
INFO:
The different types of the "3rd list" are configured in the machine
label. The layout of a "3rd list" is defined in the "hytnrcfg.ini" file.
as of CTAIP V# 2.0.2.33
..=~<VISLIST-ID>~,L,,<PNG-File>  All used lists have to be configured with their identifier „“ as
follows.
 When changing machines, the "3rd list" is hidden/shown and
The characters "~“ (or previously "§“,
buttons for "3rd lists" that are not configured are disabled.
should no longer be used) have been
designed to identify third list buttons.
Correct processing/updating
(disabled/enabled) is only possible in
the third grid list of the main screen.
1=~M~,L,,PALETTE20x20.PNG Entry for "material list"
 "[ VISLIST3(M) ]“ from "hytnrcfg.ini“
2=~P~,L,,PERSON20x20.PNG Entry for "list of persons“
 "[ VISLIST3(P) ]“ from "hytnrcfg.ini“
3=~R~,L,,RESS20x20.PNG Entry for "MNR_AMAT.LST“
 "[ VISLIST3(R) ]“ from "hytnrcfg.ini“ with the configured Bitmap
„“
4=~A~,L,,NUM.PNG Entry for "material list"
 "[ VISLIST3(A) ]“ from "hytnrcfg.ini“
5=~G~,L,,PERSON20x20.PNG Entry for "list of persons GWP“
 "[ VISLIST3(G) ]“ from "hytnrcfg.ini“
AIP2_Configuration_ctaipbut.docx Version: 1.3.22316 Page 6 of 6