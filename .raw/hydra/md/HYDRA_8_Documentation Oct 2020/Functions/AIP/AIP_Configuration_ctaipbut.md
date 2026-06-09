Local Configuration File ctaipbut.ini
1 Local Configuration File ctaipbut.ini
Buttons are configured for specific terminals in the file ctaipbut.ini in the terminal directory c:\ctaip.
The button pages of the main view and the OP info dialog may be configured in the configuration file
ctaipbut.ini.
The server directory \hydra\ctnet\win\aip includes complete INI files pertaining to the
HYDRA standard. Any deviations from that are developed in specific, customized
directories e.g. \hydra\1\custom\aip\tgrp_901.
The relevant, empty file (e.g.: ctaipbut.ini) is created here. All sections e.g. [ANR-ALL-
Page1] are copied to this file. Then configuration takes place in this file.
After restarting the terminal, files from the main directory \hydra\ctnet\win\aip are merged
with files from the customized directory \hydra\1\custom\aip\tgrp_901. Then the merged
file is transferred to the local terminal directory C:\aip.
All sections including the string "page" are imported.
Entry Comment
Definition of sections General schematic structure of a button page
Definition of a section
[ LST-MODUS-PageX.] LST = List identifier of the button page
( MNR, ANR, LIST3)
MODUS = Mode of the machine
LN = MPL – Mode
DN = DLL – Mode
LR = RF – Mode (reel-based manufacturing)
LS = RS – Mode (cutting reels)
LC = Handling unit (packing station)
or
XX = <MPL_MOD>[1] + <TYPE>[]
YY = Value from the MNR.LST column
<MNRBTN.MODUS>
Otherwise if no applicable entry is found for the machine
mode, the section
...ALL will be used (if available)
X = Button page
The definition specifying the mode a machine is running on is
implemented in the AIP application program.
AIP_Configuration_ctaipbut.docx Version: 1.1.12661 Page 1 of 6

|     |     |     |     |     |     | Local Configuration File ctaipbut.ini  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------------------- | --- | --- |

|     | Entry  |     |     |     |     | Comment  |     |     |
| --- | ------ | --- | --- | --- | --- | -------- | --- | --- |
General structure:
Sample configuration
|     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
x=<Function>,<Alignment>,<ButtonName>,<Icon>
[MNR-...-Page1]

| 1=A_AN, L, log OP on  |     |     | e.g.  |     |     |     |     |     |
| --------------------- | --- | --- | ----- | --- | --- | --- | --- | --- |
1=A_AN,L,log OP on,AGAN.PNG
2=BLANK, L

| 3=$MPL-PAL$PAL_AN,L,log  |     |     | pallet      |       |     |     |     |     |
| ------------------------ | --- | --- | ----------- | ----- | --- | --- | --- | --- |
|                          |     |     | - Function  | A_AN  |     |     |     |     |
on,
|     |     |     | - Alignment  | L or R (from the first "R“ on always "R“)  |     |     |     |     |
| --- | --- | --- | ------------ | ------------------------------------------ | --- | --- | --- | --- |

|     |     |     | - ButtonName  | Log OP on  |     |     |     |     |
| --- | --- | --- | ------------- | ---------- | --- | --- | --- | --- |
4=%BART:PZE=J%PZE,R,PZE,PZE.
|     |     |     | - Icon    | optional icon name   |     |     |     |     |
| --- | --- | --- | --------- | -------------------- | --- | --- | --- | --- |
BMP
|     |     |     |     | (PNG, resolution 24x24 px)  |     |     |     |     |
| --- | --- | --- | --- | --------------------------- | --- | --- | --- | --- |
|     |     |     |     |                             |     |     |     |     |
Please note:
Special functions:
| In  one                                 | section  the  | numbering  | of                       |        |     |     |     |     |
| --------------------------------------- | ------------- | ---------- | ------------------------ | ------ | --- | --- | --- | --- |
| entries has to be consecutive 1...n. A  |               |            | $...$ (e.g. $MPL-PAL$ )  |        |     |     |     |     |
| gap  in                                 | numbering     | indicates  | the                      |        |     |     |     |     |
|                                         |               |            | License check            | fails  |     |     |     |     |
completion of a page!
 Button is deleted

%...% (e.g. %BART:PZE=J% . )
|     |     |     | Check field with value in (T)terminal(K)label   |     |     |     |     |     |
| --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- |
 only show if they match

BLANK
Insert distance between buttons
Configuration  of  functions  using  The dialog to be opened is located as described below if buttons
| wildcards               |     |     | are configured using wildcards  |     |     |     |     |     |
| ----------------------- | --- | --- | ------------------------------- | --- | --- | --- | --- | --- |
|   x=A_AN*,L, log OP on  |     |     | ID A_AN*                        |     |     |     |     |     |
|                         |     |     |   - calling dialog: A_AN        |     |     |     |     |     |
    - Determination of the machine type
  x=A_UN*,R, interrupt OP
|     |     |     |     -  Supplementing  |     | the  | dialog  | based  on  | the  |
| --- | --- | --- | --------------------- | --- | ---- | ------- | ---------- | ---- |

|     |     |     |    machine type      |     |     |     |     |     |
| --- | --- | --- | -------------------- | --- | --- | --- | --- | --- |
    -  Check whether or not the dialog is available
       if this is the case - calling dialog: A_AN_MPL
  - evaluation of the posting type (only with A_AN)
    - Supplementing the dialog based on the posting type
    -  Check whether or not the dialog is available
             if this is the case - calling dialog: A_P_AN_MPL
  - Calling up the located workflow or dialog

If the function is <A_UN*> or <A_AB*>, it will be checked whether
or not the OP to be logged off is a merged OP.
|     |     |     |  - If this is the case,   |     | <A_UN*> is changed into <SA_UN>  |     |     |     |
| --- | --- | --- | ------------------------- | --- | -------------------------------- | --- | --- | --- |
|     |     |     |                           | or  | <A_AB*> into <SA_AB>             |     |     |     |

If the virtual column <MNRDLG.SUFFIX> includes a value, it will
always be used (if available).
|     |     |     |       ButtonFkt                 | MNRDLG.SUFFIX      Dialog  |     |                   |     |     |
| --- | --- | --- | ------------------------------- | -------------------------- | --- | ----------------- | --- | --- |
|     |     |     |  e.g.   A_AN*        <XYZ>      |                            |     |    A(_P)_AN_XYZ   |     |     |
|     |     |     |            A_TR*                |     <ABC>                  |     |         A_TR_ABC  |     |     |

AIP_Configuration_ctaipbut.docx  Version: 1.1.12661  Page 2 of 6

|     |     |     |     | Local Configuration File ctaipbut.ini  |     |
| --- | --- | --- | --- | -------------------------------------- | --- |

|     | Entry  |     |     | Comment  |     |
| --- | ------ | --- | --- | -------- | --- |
Further standard buttons:

| P_SPERRE  |     | Block production status                           |     |     |     |
| --------- | --- | ------------------------------------------------- | --- | --- | --- |
| VIEW      |     | Switching of the basic view:                      |     |     |     |
|           |     | List view  presentation of individual machines  |     |     |     |
ICON  Calling up icon view (only possible if configured in the machine
configuration)
PDV_ISTW
| WF_BDE_KOM  |     | Calling up the actual value view of PDV  |     |     |     |
| ----------- | --- | ---------------------------------------- | --- | --- | --- |
| SA_AN       |     | Input of BDE comments                    |     |     |     |
| DNC         |     | Log merged operation on                  |     |     |     |
| MINIMIZE    |     | Calling up the DNC startup screen        |     |     |     |
Minimizing of the terminal program (as of V2.0.2.23)  Windows
7 requires the compatibility mode XP
USER1…USER9
User-defined buttons to show and start external software
The programs are configured in ctaip.ini within the section [ext.
software]
Button IDs for the machine info  Consequently,  the  relevant  info  dialog  including  the  selected
[MNR-ALL-Page2]  page is opened in the foreground (with focus). Switching to other
pages is allowed.
1=M_INFO.INFO,L,show
information  M_INFO may be used to show the info page in the foreground
| 2=M_INFO.PERS,L,staff      |     | (with focus):         |     |     |     |
| -------------------------- | --- | --------------------- | --- | --- | --- |
| 3=M_INFO.MSPROT,L,machine  |     |   M_INFO=M_INFO.INFO  |     |     |     |
status log
Button IDs for OP info:  Consequently,  the  relevant  info  dialog  including  the  selected
page is opened in the foreground (with focus). Switching to other
[ANR-ALL-Page3]
| 1=A_INFO.DOKU,L,documents  |     | pages is allowed.  |                |                             |                |
| -------------------------- | --- | ------------------ | -------------- | --------------------------- | -------------- |
|                            |     | A_INFO             | may  be  used  | to  show  the  information  | page  in  the  |
2=A_INFO.HILF,L,production
| resources and tools  |     | foreground:  |     |     |     |
| -------------------- | --- | ------------ | --- | --- | --- |
  A_INFO= A_INFO.INFO
3=A_INFO.KOMP,L,components
| 4=A_INFO.BMK,L,RPA  |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- |
5=A_INFO.FORT,L,progress

6=A_INFO.NOTE,L,notes  Direct call of user-defined pages configured in ctaiplay.ini in the

section [OP info].

Example:

Dialog1=WF_BDE_KOM_LIST,BDE comments
| A_INFO.TEXT1,L,User  | text1  |     |     |     |     |
| -------------------- | ------ | --- | --- | --- | --- |
 A_INFO.DIALOG1,L,BDE comments
A_INFO.PICT1,L,User  image1
| A_INFO.SCRINF1,L,User  |     |     |     |     |     |
| ---------------------- | --- | --- | --- | --- | --- |
| scriptInfo1            |     |     |     |     |     |
A_INFO.DIALOG1,L,User
dialogs

AIP_Configuration_ctaipbut.docx  Version: 1.1.12661  Page 3 of 6

|     |     |     |     | Local Configuration File ctaipbut.ini  |
| --- | --- | --- | --- | -------------------------------------- |

|     | Entry  |     |     | Comment  |
| --- | ------ | --- | --- | -------- |
Configuration of a function  In the configured examples, the dialog < RES_WART > is called
| with different modes  |     |     |     |     |
| --------------------- | --- | --- | --- | --- |
with the below-mentioned modes.
| Just as is the case for the  |     | 1 < MNR >  |     |     |
| ---------------------------- | --- | ---------- | --- | --- |
| configuration                | of  | the        |     |     |
2 < RES >
| ANR/MNR                     | info  tabs,  | a               |     |     |
| --------------------------- | ------------ | --------------- | --- | --- |
| function can be configured  |              | 3 without mode  |     |     |

with different modes.
1=RES_WART.MNR,L,machine  The values can be read out as follows in the terminal script.
maintenance
|     |     | VPar(“BTN.FKT“)  | Function + mode  |     |
| --- | --- | ---------------- | ---------------- | --- |
2=RES_WART.RES,L,resource
|     |     | VPar(“BTN.FUNC“)  | Function  |     |
| --- | --- | ----------------- | --------- | --- |
maintenance
|     |     | VPar(“BTN.MODE“)  | Mode  |     |
| --- | --- | ----------------- | ----- | --- |
3=RES_WART,L,other
maintenance

| Available                         | button  sections  | and       |     |     |
| --------------------------------- | ----------------- | --------- | --- | --- |
| buttons for pages of the OP info  |                   |           |     |     |
| dialog:                           |                   |           |     |     |
|                                   |                   | Overview  |     |     |
[A_INFO-Page1]

|     |     | Document view  |     |     |
| --- | --- | -------------- | --- | --- |
[A_INFO.DOKU-Page1]

| 3=AI_VIEW,R,open document  |     | Production resources and tools  |     |     |
| -------------------------- | --- | ------------------------------- | --- | --- |
4=AI_VIEW_CLOSE,R,close

document
Components

[A_INFO.HILF-Page1]
Resource performance accounts

[A_INFO.KOMP-Page1]
Progress bar

[A_INFO.BMK-Page1]
Notes (as of ADE 7.3)

[A_INFO.FORT-Page1]

Configuration of a default page (is used if no section is defined
[A_INFO.NOTIZ]
for the tab).
|     |     |     |     |     |
| --- | --- | --- | --- | --- |

The IDs may also be used for the keys within the dynamic dialog
[A_INFO.DEFAULT-Page1]
(field "function").

Recommended for all pages:
| 1=AI_CLOSE,L,close  |     | OP  |     |     |
| ------------------- | --- | --- | --- | --- |
information

AIP_Configuration_ctaipbut.docx  Version: 1.1.12661  Page 4 of 6

Local Configuration File ctaipbut.ini
Entry Comment
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
Configuration of a default page (is used if no section is defined
[M_INFO.DEFAULT-Page1]
for the tab).
For all pages:
1=MI_CLOSE,L,close machine
information
AIP_Configuration_ctaipbut.docx Version: 1.1.12661 Page 5 of 6

Local Configuration File ctaipbut.ini
Entry Comment
Definition of sections General section for the configuration of global settings for
[ ButtonPanel ] all used button panels
 2 in main view ( MNR , ANR )
 (W)ork(F)low
functionkey_visible=on Shows function keys (e.g. "F3") in button panels in order for the
selection to be performed using function keys (default = off ).
radiobuttonkey_visible=on Presentation of function keys in radio group boxes of a workflow
(default = off).
functionkey_pze_visible=on Display of function keys in PZE module ( default = off ).
Definition of sections General section for the configuration of functions of the
[ LIST3-ALL-Page1 ] configurable third list of the main screen.
INFO:
The different types of the "3rd list" are configured in the machine
label. The layout of a "3rd list" is defined in the "hytnrcfg.ini".
as of CTAIP V# 2.0.2.33
..=~<VISLIST-ID>~,L,,<BITMAP>  All used lists have to be configured with their identifier „“ as
follows.
 When changing machines, the "3rd list" may be hidden/shown
The characters "~“ (or previously "§“,
and buttons for the "3rd lists" that are not configured may be
should no longer be used) have been
disabled, if necessary.
designed to identify third list buttons.
Correct processing/updating
(disabled/enabled) is only given in the
third grid list of the main screen.
1=~M~,L,,PALETTE20x20.BMP Entry for "material list"
 "[ VISLIST3(M) ]“ from "hytnrcfg.ini“
2=~P~,L,,PERSON20x20.BMP Entry for "list of persons“
 "[ VISLIST3(P) ]“ from "hytnrcfg.ini“
3=~R~,L,,RESS20x20.BMP Entry for "MNR_AMAT.LST“
 "[ VISLIST3(R) ]“ from "hytnrcfg.ini“ with the configured Bitmap
„“
4=~A~,L,,NUM.BMP Entry for "material list"
 "[ VISLIST3(A) ]“ from "hytnrcfg.ini“
5=~G~,L,,PERSON20x20.BMP Entry for "list of persons GWP“
 "[ VISLIST3(G) ]“ from "hytnrcfg.ini“
AIP_Configuration_ctaipbut.docx Version: 1.1.12661 Page 6 of 6