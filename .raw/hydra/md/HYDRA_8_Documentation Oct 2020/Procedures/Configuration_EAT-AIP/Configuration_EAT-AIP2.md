Extended Application Configuration

1  Extended Application Configuration

1.1

Overview of INI configuration files

INI file

Configurations

ctaip.ini

Host name, terminal number, virtual keyboard on/off, inputs/outputs

ctaip.mld

Translation of labels

ctaipbut.ini

Configuration of buttons: order, positioning, icons, if necessary licenses

ctaiplay.ini

Configuration of grid layout; basic screen: height of tables and buttons; layout

of BDE comments; OP info, machine info

dialog.ini

Configuration of font type/size in dialogs and of tab sizes in workflow dialogs

keyboard.ini

Configuration of the virtual keyboard: size and behavior

1.2  General

1.2.1  Identification of lists / elements in the terminal

The following shortcut activates information about available lists or elements in the terminal:

CTRL + ALT + F6

or in

AIP DEBUG menu: Further debug functions  Activate hints (scroll down)

A tooltip is shown when hovering the mouse pointer over a table or element.

The value "table" identifies the list:

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 1 of 22

Extended Application Configuration

1.3  Modifications to ctaipbut.ini

1.3.1  General

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations are developed in specific, customized directories.

e.g. for customized terminal groups \mip\<SystemNo>\custom\aip2\tgrp_xxx

(xxx = number of terminal group)

An  empty  file  (ctaipbut.ini)  is  generated  in  these  directories.  All  customized  sections  e.g.  [ANR-ALL-

Page1] are copied to this file. Then the configuration is performed in this file.

After  restarting  the  terminal,  files  from  the  main  directory  \mip\ctnet\win\aip2  are  merged  with  files  from

customized directories (e.g. \mip\<SystemNo>\custom\aip2\tgrp_xxx). The merged file is then transferred

to the local terminal directory C:\MPDV\AIP2.

The  directory  \mip\ctnet\win\aip2  must  not  be  changed,  otherwise  AIP2  might  no  longer  work

properly.  In  addition,  default  files  are  stored  there  and  any  changes  made  will  be  lost  after

updating (e.g. service pack)!

1.3.2  Modifications to the toolbar

A ctaipbut.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

Example:

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 2 of 22

The order of buttons should be changed in the "machines" section of the AIP2 basic screen (position

button "change status" first and then the "lock production status" button).

Extended Application Configuration

Initial configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

4=M_MST,L,Status ändern,Status Flag Yellow.png

5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

New configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=M_MST,L,Status ändern,Status Flag Yellow.png

4=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png
5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

1.3.3  Modifications to button labeling

A ctaipbut.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

The required sections can just be inserted if a customized ctaipbut.ini file already exists, e.g. due to

changes to the order of buttons.

Example:

Labeling of buttons in the "operation" section should be changed as follows:







"Partial confirmation" --> "Part. conf."

"Interrupt operation" --> "Interrupt OP"

"Log off operation" --> "Log off OP"

Initial configuration

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_TR,R,Teilrückmeldung,SyBluAdd.png

3=A_UN*,R,Arbeitsgang unterbrechen,SyBluPau.png

4=A_AB*,R,Arbeitsgang abmelden,SyBluStp.png

New configuration

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 3 of 22

Extended Application Configuration

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_UN*,R,AG unterbrechen,SyBluPau.png

3=A_TR,R,Teilrück.,SyBluAdd.png

4=A_AB*,R,AG abmelden,SyBluStp.png

1.3.4  Modifications to icons

 General

Generate the file pict_cust.zip in the customer specific directory \mip\<SystemNo>\custom\.

Enter customer-specific icons (e.g. custom tools.png) to the file pict_cust.zip.

Note:

The file pic.zip contains all icons used at the terminal.

The file name for the button icon can be changed in the customized section of ctaipbut.ini.

Example:

Changing the icon for the button "Log on operation" from SyBluPly.png to Custom Tools.png.

Initial configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

4=M_MST,L,Status ändern,Status Flag Yellow.png

5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

New configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; Switch basic display between list display and single machine display:

2=VIEW,L,,VirtualTourSmall.png3=P_SPERRE,L,Lock production status,Security Risk.png

4=M_MST,L,Change status,Status Flag Yellow.png

5=A_AN*,R,Logon operation,Custom Tools.png

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 4 of 22

Extended Application Configuration

1.4  Modifications to ctaiplay.ini

1.4.1  General

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations are developed in specific, customized directories.

e.g. for customized terminal groups \mip\<SystemNo>\custom\aip2\tgrp_xxx

(xxx = number of terminal group)

An  empty  file  (ctaiplay.ini)  is  generated  in  these  directories.  All  customized  sections  e.g.  [ANR-ALL-

Page1] are copied to this file. Then the configuration is performed in this file.

After  restarting  the  terminal,  files  from  the  main  directory  \mip\ctnet\win\aip2  are  merged  with  files  from

customized directories (e.g. \mip\<SystemNo>\custom\aip2\tgrp_xxx). The merged file is then transferred

to the local terminal directory C:\MPDV\AIP2.

The  directory  \mip\ctnet\win\aip2  must  not  be  changed,  otherwise  AIP2  might  no  longer  work

properly.  In  addition,  default  files  are  stored  there  and  any  changes  made  will  be  lost  after

updating (e.g. service pack)!

1.4.2  Enter user fields in a table

Overview

A ctaiplay.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

ctaiplay.ini is configured in two steps:

  Activate the additional loading of the user fields for operation- or order-related XML files in the

section [ Custom Userfields ANR ]. Activate the user fields for machines in the [ Custom

Userfields MNR ] section.

  Configure the field to be displayed in the grid in the section (e.g. to display the additional field in

the order list), e.g. [Order list].

Below both steps are explained in detail.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 5 of 22

Extended Application Configuration

If the user field is only to be displayed in the GUI with XML configuration, the configuration for

display in the grid in the [Order List] or [Machine List] can be omitted.

Available user field in machine and order lists

All identifiers of user fields and also other fields that can be reloaded are located in the headers.dat file in

the "spool" directory of the terminal. It consists of four lines:

Start of the row  Content

10|…

*10|…

11|…

*11|…

Machine list: Fields that are always included in the list.

Machine list: Fields that can be reloaded.

Order list: Fields that are always included.

Order list: Fields that can be reloaded.

The following user fields can be reloaded:

  Machine list:

o  FU:1 to FU:66:

Machine user field

  Order list:

o  ANR_FU_1 to ANR_FU_66:

Operation user fields

o  AUNR_FU_1 to AUNR_FU_66:

Order user fields

o  MNR_FU_1 to MNR_FU_66:

Machine user fields

o  VERARBCODE_FU_1 to VERARBCODE_FU_66:

Processing code user fields

o  AGR_FU_1 to AGR_FU_66:

Operation status user fields (reserved for customizations)

Example 1: User fields in the operation list

User field 1 of the operation should be entered in the order list with the name " Order date ".

User field 66 of the machine with the name "My long user field" should be added to the order list.

Step 1  Field definition of the section [ Custom Userfields ANR ]

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 6 of 22

Extended Application Configuration

[ Custom Userfields ANR ]

GRID_LIST_TYP=ANR

; Additional fields in list of operations

ANR_FU_1= ; User field 1 of operation, MyDate FU:1 [operations list]

MNR_FU_66= ; User field 66 of machine, My long user field [operations list]

Step 2  add the field to the grid [order list]

If the user field is only to be displayed in the GUI with XML configuration, the configuration in

the [Order List] can be omitted.

[Order list]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_LIST_TYP=ANR

EXAMINE_BITMAP1=B1,OPT_INFOAN,T=Attach Notes.png

EXAMINE_BITMAP2=B2,OPT_INFOAI,T=Text Document.png

ATK=C25,100,L,Article

ANR_FU_1=dd.mm.yyyy,90,L,MyDate FU:1

MNR_FU_66=C40,150,L,My long user field of machine

Example 2: User field in the machine list

User field 66 of the machine with the name "My long user field" should be added to the machine list.

Step 1  Field definition of the section [ Custom Userfields MNR ]

[ Custom Userfields MNR ]

GRID_LIST_TYP=MNR

; Additional fields in list of machines

ANR_FU_66= ; User field 66 of machine, My long user field

Step 2  Enter the field for the grid [Machine list]

If the user field is only to be displayed in the GUI with XML configuration, the configuration in

the [Machine List] can be omitted.

[Machine list]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_LIST_TYP=ANR

EXAMINE_BITMAP1=B1,OPT_INFOAN,T=Attach Notes.png

EXAMINE_BITMAP2=B2,OPT_INFOAI,T=Text Document.png

ATK=C25,100,L,Article

FU:66=C40,150,L,My long user field

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 7 of 22

Extended Application Configuration

Explaination of the syntax using the order list

ANR_FU_1 = user field of of the operation

dd.mm.yyyy = formatted as date

90 = number of pixel for the column

L = aligned to the left

MyDate FU:1 = column header

MNR_FU_66 = user field 66 of the machine

C40 = alphanumeric field with 40 digits

150 = number of pixel for the column

L = left aligned

My long user field = column header

1.4.3  Change order of columns in AIP2

A ctaiplay.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

The required sections can just be inserted if a customized ctaiplay.ini file already exists, e.g. due to

changes to the order of buttons.

Example:

The "order" column should be displayed in the first place and then the "article" column.

Initial configuration

[Order list]

…

ATK=C25,100,L,Artikel

AUNR=C10,85,L,Auftrag

ANR_FU_65=C30,150,L,Artikelbezeichnung 2
AGNR=C4,39,R," "

New configuration

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 8 of 22

Extended Application Configuration

list]

[Order

…

AUNR=C10,85,L,Auftrag

ATK=C25,100,L,Artikel

ANR_FU_65=C30,150,L,Artikelbezeichnung2

AGNR=C4,39,R," „

1.4.4  Changing the height of AIP2 lists

Changing the height of lists (operation and machine list) in the basic screen [MainView1] of AIP2.

The configured heights are scaled to the current height. Consequently, the total sum of entered

heights is irrelevant.

The  height  of  lists  and  elements  of  the  basic  screen  (machines,  order  grid,  3rd  list,  toolbar)  can  be

configured in section [MainView1] of the customized ctaiplay.ini file.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 9 of 22

Extended Application Configuration

[MainView1]

; Values are scaled to match the current resolution

; in order to use the full screen. Percentage values can also be entered

OrderGridHeight=440

MachineGridHeight=380

;List3GridHeight=200

ButtonBarHeight=50

Explanation: SYNTAX of order list

OrderGridHeight = height of the order list (indicated in pixels)

MachineGridHeight = height of the machine list (indicated in pixels)

List3GridHeight= height of the third list (tools, staff, batches,…) (indicated in pixels)

ButtonBarHeight= height of the toolbar (indicated in pixels)

1.4.5  Changing the filter function in tables

The filter function is activated for many tables.  The filter function  You can configure on which column the

filtering is to take effect.

Requirements:

  The  field  for  filtering  is  activated  for  the  table  in  the  dialog  configuration  (field  attribute

"AUTOFILTERFIELD").

  There  is  an  entry  "AUTOFILTERCOL"  in  the  configuration  file  ctaiplay.ini  which  specifies  the

column to be filtered.

Proceed as follows:

1.  Use the shortcut "Ctrl+Alt+F6" in the AIP2 to activate the tooltip.

2.  Display the required table on the AIP that already has a filter field.

3.  Use the tooltip to identify the affected section in the ctaiplay.ini file by moving the mouse pointer

over the desired table. E.g.„… Cfg: WF@AGNR …“.

4.  Find  the  section  in  the  standard  configuration  file  <server>\mip\ctnet\win\aip2\ctaiplay.ini  and

copy

the

section

to

your

customized

global

file

<server>\mip\<SystemNo>\custom\aip2\ctaiplay.ini  or

to  a

terminal  group  specific

file

<server>\mip\<SystemNo>\custom\aip2\tgrp_<TerminalGrpup>\ctaiplay.ini

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 10 of 22

Extended Application Configuration

5.  Change  the  value  of  the  existing  AUTOFILTERCOL  property  in  the  copied  customer-specific

section.  You can find information on availale columns in other attributes of the  section or in the

file  headers.dat.    If  the  property  AUTOFILTERCOL  is  not  available,  the  filtering  cannot  be

changed  by  configuration.    If  the  filtering  is  not  activated,  you  first  need  to  check  further

requirements and activate the filtering via a customizing.

The setting AUTOFILTERCOL=<ALL> ensures that the filter value applies to all columns of the

table. Following, a row is displayed if the column contains filter text.

Example<server>\mip\<SystemNo>\custom\aip2\ctaiplay.ini:

;******************************************************************************************
;
; ctaiplay.ini (customer’s)
;
; -----------------------------------------------------------------------------------------

[WF@ANR]
CMD=DLG=LIST;11|MOD=V|MNR=<MNR>|
MODE=CMD:MODE=#LOCKED#|DATALOCKUNTILSHOW=TRUE|ADDCALCULATEDFIELDS=A|FOCUSLISTITEM=ANR=<ANR>|
FILTER=
SECTION=Sequencing List (Auto)
DATAFIELDS=ANR & AGNR & ATK & ATKBEZ & AGBEZ & *CHPFL=CHPFL & ANR.ATK=ATK & ANR.ATKBEZ=ATKBEZ & ANR.AGBEZ=AGBEZ &
ANR.SGR:GUTP=SGR:GUTP & ANR.EGR:GUTP=EGR:GUTP & ANR.EGR:AUSP=EGR:AUSP & ANR.AUNR=AUNR & RMNR=ANR_RMNR & ANR.FERTIG=FERTIG
FILE=vlist.<MNR>.lst
AUTOFILTERCOL=AGNR

;*******************************************************************************************

1.4.6  Cyclic reload of the sequencing list

The sequencing list is cyclically updated on the AIP. The setting of the cycle takes place in ctaipnet.ini

mdereloadvorgabeliste=600

If the sequencing list is to be reloaded each time the operation logon dialog is called, the parameter

CMD:MODE=#LOCKED#| must be removed from the section [WF@ANR] in the MODE entry of the

ctaiplay.ini. If you want to make a custom implementation, you should copy this section into a new

(empty, if not already existing) file ctaiplay.ini and delete the above entry.

1.5  Changes to ctaip.ini

1.5.1  General

The  file  ctaip.ini  is  not  merged  with  a  file  stored  in  the  server.  The  file  must  be  edited  locally  in  the

terminal.

1.5.2  Start Third-Party Application from AIP

Starting a third-party application is configured as follows:

  Configure a button in the ctaipbut.ini file

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 11 of 22

Extended Application Configuration

  Configuration of the function

AIP allows for the integration of buttons starting third-party applications in all toolbars. These buttons

- start third-party applications provided they are not running

- bring third-party applications to the front when they are running

Configuration of buttons

The first button starting a third-party software is configured as "USER1" in ctaipbut.ini.

Further buttons starting third-party software can be configured as "USER2" to "USER9" in the ctaipbut.ini

file.

Example:

Configuration of a new button. The button is to be displayed for a specific terminal group in the

"machines" section of the AIP2 basic screen. It is configured in the ctaipbut.ini file specific to terminal

groups in the server.

\mip\<SystemNo>\custom\aip2\tgrp_xxx\ctaipbut.ini)

[MNR-ALL-Page1]
1=M_INFO,L,,InfoRed.png
; Switching the basic screen between list view and presentation of individual machines:
2=VIEW,L,,VirtualTourSmall.png
3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png
4=M_MST,L,Status ändern,Status Flag Yellow.png
5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png
6=USER1,R,Notepad

Configuration of the function

The function is configured in section [ext. software] of the local terminal configuration file "ctaip.ini":

Example:

[ext. software]
Button=Notepad
WindowName=Notepad
ProgFileName=C:\Program Files (x86)\Notepad++\notepad++.exe
SearchParts=On

Please note:

"SearchParts=“  If this entry is set, it is sufficient to enter the program name only partly in

WindowName.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 12 of 22

Extended Application Configuration

1.5.3  Remember staff badge number

The  person  memorized  by  the  terminal  only  changes  if  the  person  logs  on  with  the  order.  (A_P_AN

instead of A_AN)

The memorized person is removed from the memory when the person explicitly logs off from the machine

(the same applies for "log off all").

This pre-assignment can be suppressed. Configure "default=0" and set the field attribute SETVALUE in

the dialog configuration.

The  number  is  pre-assigned  in  all  dialogs  for  order  postings,  status  changes  and  when  batches  are

posted C_UMB, C_GEN, CA_WL.

The  memorized  persons  are  deleted  in  the  memory  for  all  machines  when  shifts  change  or  at  the

beginning  of  a  new  shift  (Note:  If  the  shift  changes  at  one  machine  of  the  terminal,  the  persons  at  the

other machines of the terminal are also deleted)!

This can be configured via the entry "HoldPersonInfo=on" in section [SYSTEM] of the ctaip.ini file.

Example:

[System]
…..
HoldPersonInfo=on

1.6  Hide virtual keyboard

The virtual keyboard can also be switched off if the terminal is connected to a real keyboard. This can be

configured in section [SYSTEM] of the local ctaip.ini file. Example:

[SYSTEM]

Parameters=-t

Syntax:

+t/-t --> enables/disables the virtual keyboard; irrespective of the terminal type

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 13 of 22

Extended Application Configuration

1.7

Dynamic dialogs

1.7.1  Overview

1.7.2  AIP2 dialog types

AIP2 provides the following dialog types:

  AIPDEF

– Default dialogs

(customization)

  AIPTGRP

– Dialogs for specific terminal groups

(configuration)

  AIPTNR

– Dialogs for specific terminals

(customization)

You can only create/change dialogs for specific terminal groups.You can change existing

dialogs for a specific terminal.

But default dialogs cannot be changed.

The terminal has to be rebooted after dialogs were changed.

1.7.3  Dialogs for specific terminal groups

You can make configurations for specified terminal groups.

Before starting the configuration, make a backup copy of the concerned dialogs in a backup group (e.g.

AIPTGRP 999). (In case old backups exist, delete them beforehand).

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 14 of 22

Extended Application Configuration

Activate the new dialogs and reboot the terminal.

Example:

Special  posting  dialogs  should  be  used  for  terminal  group  xxx.  The  workflows  and  dynamic  dialogs  are

assigned to this terminal group.

How to proceed

1.  Assign terminal to terminal group

2.  Copy workflows to terminal group xxx

3.  Copy dynamic dialogs to terminal group xxx

4.  Activate dialogs

Assign terminal (MOC)

Menu: System administration --> Terminals --> Terminal groups

Copy workflows (MOC)

Menu: System administration --> Terminals --> Workflow

Copy complete workflow configuration from AIPDEF 0 to AIPTGRP xxx.

Copy dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Copy the complete dialog configuration from AIPDEF 0 to AIPTGRP xxx

Activate dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Button "Activate dialogs"

Dialog input: Type =AIPGRP ; User=xxx

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 15 of 22

Extended Application Configuration

Note:

You can delete all dialogs of a terminal group if you select all rows of the terminal group (AIPTGRP).

1.7.4  Hide fields (for specific terminal groups)

Identify the dialogs used on the AIP2 terminal.

Using the shortcut Ctrl + ALT + F6, a tooltip indicating the dialog name is shown.

General procedure:



Identify the dialog where a field should be hidden

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Choose the required field and check the option "blocked"

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 16 of 22

Extended Application Configuration

Activate dialog (MOC)

Activate dialogs for specific terminal groups

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 17 of 22

1.7.5  Default assignment in dialog fields (for specific terminal

Extended Application Configuration

groups)

General procedure:



Identify the dialog where a field should be completed with default values

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Set field "field attribute 2" to "SETVALUE"

Add field "default"

Allowed characters for dynamic dialog fields

The minus character "-" must always be placed at the end to prevent it from

being mistaken for the character used for the definition of "from" - "to" ranges.

Example:

a-z A-Z/-,. is interpreted as range from a to z and A to Z but in this case also as

range from "/" to ","

a-z A-Z/,.- is interpreted as range from a to z and A to Z and as the allowed

characters / , . and -

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 18 of 22

Extended Application Configuration

Activate dialog (MOC)

Activate dialogs for specific terminal groups

Change field name (for a specific terminal group)

General procedure:



Identify the dialog where a field name should be changed

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 19 of 22

Extended Application Configuration

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Change field contents of the column "text".

Activate dialog (MOC)

Activate dialogs for specific terminal groups

1.7.6  Activate simplified dialogs

There  are  simplified  dialogs  for:  logging  on  operations,  reporting  partial  quantities  for  operations,

interrupting operations, logging off operations.

Use  the  button  Enable  simple  dialogs  to  store  the  simplified  dialogs  for  the  standard

AIPDEF 0 in the workflow.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 20 of 22

Extended Application Configuration

How to proceed:

  Menu: System administration --> Terminals --> Dynamic dialogs --> Button "Enable simple

dialogs"

  Enable dialogs for AIPDEF 0

Only one dialog is entered in the workflow if simple dialogs are in use.

Once simplified dialogs have been activated, it cannot be undone by way of configuration. This

can only be changed by customizing the system, which has to be ordered from MPDV.

Activation via the standard dialogs AIPDEF 0.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 21 of 22

Extended Application Configuration

1.8  Customizing files

1.8.1  Terminal script files

File names and directories of default/customized terminal scripts must be named as follows.

AIP 2

Description

MPDV

.\ctnet\win\aip2\etc\aip_mpdv.zip

MPDV standard (not used)

MPDV

.\ctnet\win\aip2\etc\mpdv-aip.zip

MPDV standard

CUST

.\custom\userexit\aip2_<customer
number>.zip

Customization with customer number

CUST

.\custom\userexit\aip2_<project>.zip

Customization with project abbreviation

“aip_” is added as prefix to terminal script files for AIP2.

PRIO  AIP 2

Description

MPDV

1

.\aip_system_mpdv.scr
.\aip_<dialog>_mpdv.scr

MPDV standard (not used)

MPDV

2

.\aip_mpdv-system.scr
.\aip_mpdv-<dialog>.scr

MPDV standard

CUST

1

.\aip_system_<customer no.>.scr
.\aip_<dialog>_<customer no.>.scr

Customization with customer number

CUST

2

.\aip_system_<project>.scr
.\aip_<dialog>_<project>.scr

Customization
abbreviation

with

project

ZIP files are only unpacked in live operation, once they have been successfully DOWNLOADED from the

server. In DEMO mode there is no unpacking of terminal script ZIP files.

Configuration_EAT-AIP2.docx

Version: 1.7.22257

Page 22 of 22

