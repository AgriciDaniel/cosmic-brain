Configuration eKanban

1  Configuration eKanban

Basic configuration

If  you  want  to  install  the  e-kanban  functions  on  an  already  existing  HYDRA  8  system,  proceed  as

described below:

1.  Activate the patch dbp_mpl_ekanban as follows:

a.  UNIX systems (run in the server prompt of the HYDRA directory):

hydscr.out db_sql/dbp_mpl_ekanban.hsc

b.  Windows systems (run in a DOS window of the HYDRA directory):

hydscr.exe db_sql/dbp_mpl_ekanban.hsc

2.  Check the patch output

3.  Back up the existing dialog configuration:

a.  UNIX systems:

hydlgcfg.out DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=%

DATEI=dialog.dlg

b.  Windows systems:

hydlgcfg.exe DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%%

DATEI=dialog.dlg

4.  Now load the new dialog configurations with the following command:

a.  UNIX systems:

hymw.out -u9999 -b db_sql/aip_kbn.dlg

b.  Windows systems:

hymw.exe -u9999 -b db_sql\aip_kbn.dlg

The  dialogs  KBN_BOARD,  KBN_FILL,  KBN_EMPTY  are  then  imported  as  template  (with  type

"AIPDEF“ and dialog user "999“) or existing dialogs are updated, if required.

5.  Go to the MOC application: System administration  Terminals  Dynamic dialogs (transaction code

ddconf). Copy the dialogs KBN_BOARD, KBN_FILL, KBN_EMPTY from the template (type "AIPDEF"

with  dialog  user  "999")  to  type  "AIPDEF"  and  dialog  user  "0".  To  do  so,  switch  to  the  HYDRA

Professional Mode.

6.  Activate the new dynamic dialogs:

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

Setup_eKanban.docx

Version: 1.2.21516

Page 1 of 8

This command activates the default dialogs. If you use terminal-specific dialogs in the system,

these dialogs need to be modified by an MPDV consultant.

Configuration eKanban

Configuration: Order types

Menu

Master data  Order  Order types

Configure one Order type  for the kanban orders and one order type for the kanban capacity orders.

Kanban orders

You can use the preconfigured order type "KBN" as order type for kanban orders.

Kanban capacity orders

If  you  want  to  generate  kanban  orders  from kanban  capacity  orders,  you  must  create  a  separate  order

type  (e.g.  "ZKABA").  The  behavior  of  the  order  type  for  kanban  capacity  orders  must  be  similar  to  the

behavior of production orders (order type 0).

Do not mix up the order type for kanban capacity orders (e.g. "ZKAPA") with the preconfigured

order type 3.

Configuration: Order status texts

Menu

Master data  Order  Order status texts

Create a status text for planned kanban orders and operations:

Parameter name

Status text

Status text name

Value

e.g. 901

planned

Configuration: Order status

Menu

Master data  Order  Order status assignment

Configure the status "P" as order status "planned" for the order type, which is defined as order type for

kanban orders (e.g. "KBN").

Parameter name

Value

Setup_eKanban.docx

Version: 1.2.21516

Page 2 of 8

Configuration eKanban

Parameter name

Order type

Status

Entry: Control

Entry: can be logged on

Value

e.g. "KBN“

"P"

S = None



Planning: Planning

N = No planning

Options: Initial status during creation



Configuration: Operation status

Menu

Master data  Order  Order status assignment

Configure the status "P" as order status "planned" for the order type, which is defined as order type for

kanban orders (e.g. "KBN").

Parameter name

Order type

Status

Entry: Control

Entry: can be logged on

Entry: Sequencing list

Value

e.g. "KBN“

"P"

S = None





Planning: Planning

N = No planning

Options: Initial status during creation



INI configuration

Menu

System administration  System settings  INI configuration
System administration  System settings  INI data configuration

Configure in the INI configuration under the name "MPL" in the "KANBAN" section:

Key

KBN_AUART

KAPA_AUART

Value

(example)

KBN

ZKAPA

Comment

Kanban order type

Capacity order type

Setup_eKanban.docx

Version: 1.2.21516

Page 3 of 8

Configuration eKanban

If  the  INI  configuration  KAPA_AUART  is  enabled,  the  system  searches  for  kanban  capacity

orders when kanban orders are generated. Work plans are no longer used then.

Configuration: Scheduler

Menu

System administration  System settings  Scheduler

Make the following entry in the Scheduler to automatically generate kanban orders:

Type

Alterable

Type

Visible

Active

HYDRA user

S – Standard

 Yes

I – Interval

Visible

 Active

0

Command (Windows)

sh.exe ./kbn_sgen.scr

Command (Unix)

kbn_sgen.scr

Comment

Interval

Generation of kanban orders

Hour: 1

Minute: 00

Configuration: Resource status configuration

Menu

Master data  Resources  Resource status

Configure the following three kanban resource statuses for the kanban objects (resource type):

Resource
key

KBN

KBN

KBN

type

Status (example)

Designation

1

102

103

Initial

Full

Empty

Setup_eKanban.docx

Version: 1.2.21516

Page 4 of 8

Configuration: Advanced object configuration

Menu

System administration  System settings  Advanced object configuration

Configuration eKanban

Specify in the Advanced object configuration which status is used:

Parameter name

Object type

Object ID 1

Object ID 2

Object ID 3

Parameter

Value

MPL

Initial status, e.g. 1

Status for filled kanban, e.g. 102

Status for empty kanban, e.g. 103

RESTYP

Parameter value

KBN

Configuration: Number ranges

Menu

System administration  System settings  Number ranges

Create a number range for the kanban orders. This number range is used for the generation of kanban

orders.

Parameter name

Object

Key

Value

Value

AUNR

AART

KBN  (value from INI configuration for KBN_AUART)

Assignment code

NUM

Prefix

Range from

Range to

KBN  (see below)

100000  (see below)

199999  (see below)

Current value

0

The  number  of  digits  resulting  from  <prefix>  and  range  from/to  must  be  identical  to  the  order

number length configured in the Basic settings.

Setup_eKanban.docx

Version: 1.2.21516

Page 5 of 8

Configuration eKanban

AIP configuration

Minimum AIP version for e-kanban: 2.0.2.80

Display of electronic kanban board

Configuration in ctaiplay.ini (AIP 8.1, AIP 8.2):

[WF@KBOARD]
CMD=DLG=LIST;u_l_kbn|MOD=B|KBN.TNR:ID=<*TNR>|
FILTER=
SECTION=Kanban table
DATAFIELDS=
FILE=kanban.lst
AUTOFILTERCOL=
KBN_INTERVAL=60
;ORDER=KBN.STA=-

 [Kanban table]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite

GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=STA1,KBN.STA,1-clLime|2-clYellow|3-clRed

;Status
ALIAS STA1=(DUMMY)=C1,50,L,Status
KBN.STA=C1,0,L
;Kanban material number
KBN.ATK=C25,145,Z
;Control loop
KBN.ID=C15,90,Z
;Withdraw
KBN.ZLO=C30,90,Z
;Total quantity of kanban objects in circulation
KBN.ANZ=N12,90,R
;Configured/ planned quantity of the kanban object
KBN.EGR:P=N10,90,R
;Full KBN
KBN.ANZ:F=N10,90,R
;Empty KBN
KBN.ANZ:E=N10,90,R
;Minimum stock level
KBN.MIN=N10,100,R
;Maximum stock level
KBN.MAX=N10,100,R

Setup_eKanban.docx

Version: 1.2.21516

Page 6 of 8

Extensions of the order list

You can add configurations in ctaiplay.ini, section "[sequencing list (auto)]" (AIP 8.1, AIP 8.2):

Configuration eKanban

; Enable coloring specific to the cell:
GRID_CELLPAINT=ON
; KANBAN orders: orange (here AUART=KBN – can deviate)
EXAMINE_CELLBKCOLOR=COL1,AUART,KBN-$0080FF
; Foreground color: planned/prepared OPs
EXAMINE_SCANEXPR1=AST=P
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=AST=V
EXAMINE_SCANCOLOR2=clBlue
; Dummy column for orange coloring
ALIAS COL1=(DUMMY2)=C1,100,L
; required column as color reference (is not shown)
AUART=C1,0,L

Fill kanban

Configuration of list in ctaiplay.ini (AIP 8.1, AIP 8.2):

[control loops]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CAPTION=control loops

;KBN.STA= C15,120,L
;KBN.ATK=C15,120,L
KBN.ID=C15,120,L
KBN.ZLO=C15,120,L
KBN.PUFFER=C15,120,L
KBN.ANZ=N4,80,R
KBN.MENGE=N4,80,R
KBN.ANZ:F=N4,80,R
KBN.ANZ:E=N4,80,R
KBN.MIN=N4,80,R
KBN.MAX=N4,80,R
KBN.EGR:P=N4,80,R

[Kanban objects]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CAPTION=control loops

;KBN.STA= C15,120,L
;KBN.ATK=C15,120,L
;KBN.ID=C15,120,L
KBN.RES:NR=C15,120,L

Setup_eKanban.docx

Version: 1.2.21516

Page 7 of 8

Configuration eKanban

KBN.RES:LNR=N4,80,R
KBN.ZLO=C15,120,L
KBN.PUFFER=C15,120,L
KBN.ANZ=N4,80,R
KBN.MENGE=N4,80,R
KBN.ANZ:F=N4,80,R
KBN.ANZ:E=N4,80,R
KBN.MIN=N4,80,R
KBN.MAX=N4,80,R
KBN.EGR:P=N4,80,R

Configuration of keys in ctaipbut.ini (AIP 8.1):

<n1>=KBN_BOARD,electronic kanban board
<n2>=KBN_FILL,fill KANBAN
with <nx>=1, 2, 3, … - depending on where the buttons are placed.

Configuration of keys in l_main.xml (AIP 8.2)

  Create a backup of the file l_main.xml.

  Open the file l_main.xml using a text editor.

  Search for the text

<Caption Function="Translate" LanguageKey="lkeKanban">eKanban</Caption>



In the row above, change the value from false to true:

<Visible>True</Visible>

  Save the file l_main.xml and restart the terminal.

Setup_eKanban.docx

Version: 1.2.21516

Page 8 of 8

