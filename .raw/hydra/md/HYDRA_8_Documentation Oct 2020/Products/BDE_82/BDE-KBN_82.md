Manual

e-Kanban
BDE-KBN
HYDRA 8.2

Version 1.2.23049

Last changed on: 01.09.2020

e-Kanban

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-KBN_82.docx

Version: 1.2.23049

Page 2 of 48

e-Kanban

Contents

1  Overview: e-Kanban ..................................................................................... 4

2  Configuration eKanban ................................................................................ 6

3  e-Kanban .................................................................................................... 14

4  Material Master .......................................................................................... 28

5  Production Levels ....................................................................................... 32

6  Closed Loops / Supply Relationships ........................................................ 35

7  Kanban Configuration ................................................................................ 38

8  Closed Loop/Terminal Assignment ............................................................ 41

9  Kanban Stock Levels ................................................................................. 42

10  eKanban Data Collection ........................................................................... 45

BDE-KBN_82.docx

Version: 1.2.23049

Page 3 of 48

e-Kanban

1  Overview: e-Kanban

Usage

The kanban control as decentralized production control managed by staff has been designed to apply the

pull principle to achieve efficient logistical structures for the production of customized goods and services.

Higher-ranking structures get a new role and are re-defined based on the overall context.

Mandatory prerequisites for implementing a kanban control affecting the relevant items:

  Uniform customer demand for the relevant item

  Limited variants of the product

  Production structure based on material flow

  Short setup times

The  manufacturing  of  an  item/material  is  generally  triggered  by  withdrawing  a  kanban  container  at  the

consumption.

Then  the  kanban  card  is  transferred  to  the  supply  (e.g.  preceding  machine,  machine  group,  material

buffer), which in turn triggers new supplies/replenishment.

The  kanban  control  based  on  the  pull  principle  is  represented  in  electronic  form  within  MES  and,  as  a

result, the flow of the relevant kanban objects is displayed within their closed loop (from the supply to the

consumption and vice versa).

BDE-KBN_82.docx

Version: 1.2.23049

Page 4 of 48

e-Kanban

BDE-KBN_82.docx

Version: 1.2.23049

Page 5 of 48

e-Kanban

2  Configuration eKanban

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

This command activates the default dialogs. If you use terminal-specific dialogs in the system,

these dialogs need to be modified by an MPDV consultant.

BDE-KBN_82.docx

Version: 1.2.23049

Page 6 of 48

e-Kanban

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

Order type

Status

Value

e.g. "KBN“

"P"

BDE-KBN_82.docx

Version: 1.2.23049

Page 7 of 48

e-Kanban

Parameter name

Entry: Control

Entry: can be logged on

Value

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 8 of 48

If  the  INI  configuration  KAPA_AUART  is  enabled,  the  system  searches  for  kanban  capacity

orders when kanban orders are generated. Work plans are no longer used then.

e-Kanban

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 9 of 48

Configuration: Advanced object configuration

Menu

System administration  System settings  Advanced object configuration

e-Kanban

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 10 of 48

e-Kanban

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 11 of 48

Extensions of the order list

You can add configurations in ctaiplay.ini, section "[sequencing list (auto)]" (AIP 8.1, AIP 8.2):

e-Kanban

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 12 of 48

e-Kanban

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

BDE-KBN_82.docx

Version: 1.2.23049

Page 13 of 48

e-Kanban

3  e-Kanban

Utilization

The kanban control as decentralized production control has been designed to apply the pull principle.

MES represents kanban control based on this principle in electronic form (e-kanban). Therefore, the flow

of the relevant kanban objects is displayed within their closed loop (from supply to consumption and vice

versa).

Prerequisites

These general definitions need to be taken into account for using e-kanban:



Instead of physic kanban cards, MES uses or manages (electronic) kanban objects.

  The ideal total quantity of circulating kanban objects has to be calculated in advance. MES does

not provide calculations or algorithms for this purpose.



In  MES  the  kanban  objects  are  always  posted  from  one  material  buffer  to  the  next.  It  is  not

intended to repost them to the object "machine" or "machine group".

Consequently, supply and consumption are represented as material buffers in the system and to

be configured accordingly.

  The basic package first only refers to the simple case. Here, the closed loop between one supply

and  one  consumption  is  only  taken  into  account,  i.e.  it  is  not  taken  into  account  how  many

machines  actually  pertain  to  the  consumption  and  how  often  the  material/kanban  object

physically moves from one "consumption buffer" to the consuming machine.

The  kanban  objects  are  not  traced  within  the  supply  even  if  it  comes  to  multi-level  processes

(kanban order includes several OPs) for replenishment production.

Procedure

Creating kanban objects

The kanban objects are created and managed in MES. Generally, a status is kept for the objects. Once

the kanban object has been created, it is assigned the status "initial".

Generation of filled kanban object at the supply

The supply (material buffer) for replenishment production can be operated by one or several machines.

A machine produces the relevant material/article for a kanban order.

BDE-KBN_82.docx

Version: 1.2.23049

Page 14 of 48

e-Kanban

If a kanban object is filled, the status of the kanban object is set to "filled" by the dialog "fill kanban".

However, it is irrelevant at which machine of the supply the kanban object was produced.

The kanban object is directly posted in the material buffer of the consumption defined within the closed

loop.

Provision of the kanban object at the end point: consumption

The kanban object is provided at the consumption and, once it has been filled, it is directly posted into the

material buffer of the consumption that is defined within the closed loop.

In MES the consumption (material buffer) is represented as:

  A general material buffer (supermarket for several machines/machine groups). In this case, the

system cannot trace the kanban object (to which machine it was sent)

  The material buffer of the machine (preceding)

Emptying the kanban object at the end point: consumption

The kanban material provided at the consumption is "used/consumed" for production at a machine.

If the kanban material of a container is completely consumed, the kanban object is set to the status

"empty" by the dialog "empty kanban" and directly posted onto the defined material buffer of the supply.

However, it is irrelevant to the kanban process at which machine following the consumption the container

was actually emptied.

Generation of orders on request

If required, the consumption takes the kanban object from the supply. If machines are indirectly regarded

as subordinate elements of the supply, replenishment production will be triggered by consuming or

emptying the kanban objects (dialog: empty kanban) at the relevant machine/terminal.

The requirement of a new kanban object for this material/closed loop is visualized immediately at the

supply/terminal - electronic kanban board.

Once a minimum quantity of empty kanban objects has been reached, a planned kanban order that is

shown within the order list at the supply can be generated automatically. The planned kanban order is

enhanced by any further empty kanban object.

If the maximum quantity of empty kanban objects is reached, the planned kanban order becomes a fixed

kanban order that can no longer be changed. Quantities are no longer updated. The fixed kanban order is

also shown in the order list at the source.

BDE-KBN_82.docx

Version: 1.2.23049

Page 15 of 48

e-Kanban

Used master data and their connection

The following, cooperating master data are used to represent the kanban process within MES. They need

to be created in the system.

BDE-KBN_82.docx

Version: 1.2.23049

Page 16 of 48

Procedure: changing statuses / locating kanban objectsEventEventPlace before eventPlace before eventPlace after eventPlace after eventStatus after eventStatus after eventINITIALFULLEMPTYFULLSystemConsumptionSupplyConsumptionConsumptionSystemSupplySupplyDialogFill kanban/ post to consumptionCreate kanban objectDialog empty kanban/ post to supplyDialog fill kanban/post to consumption

e-Kanban

Order generation

General:

In  general,  a  kanban  order  is  generated  from  a  work  plan  created  in  MES  or  from  a  capacity  order

provided by the ERP system for the order type "KBN" (can be named flexibly). However, the generation

itself might be due to several different situations.

Consequently, the following options to generate kanban orders are provided:

•  Manually at the AIP

The dialog "electronic kanban board" provides the option to generate a kanban order for an

article/material and closed loop at the push of a button.

•  Manually at MOC (function of the application "kanban stock")

Orders pertaining to kanban orders are generated manually by the foreman at MOC from a

separately created work plan or a provided capacity order at least for each article or article and

closed loop.

•  Automatic generation

The system automatically generates a planned kanban order for the relevant article from a work

plan or provided capacity order when the "yellow zone" (minimum quantity of empty kanban

cards) has been reached.

BDE-KBN_82.docx

Version: 1.2.23049

Page 17 of 48

e-Kanban

•  Quantities are updated for the kanban order by every new, empty kanban object.

•  The worker may start the generated, planned kanban order at the AIP at any time.

•  To generate kanban orders, at least one separate work plan is created or capacity order

is transferred from ERP for each article.

•  Once  the  "red"  zone  (allowed  maximum  quantity  of  empty  kanban  cards)  has  been

reached,  the  quantities  are  updated  for  the  planned  kanban  order  the  last  time  and  the

planned kanban order becomes a fixed kanban order.

The work plans to generate kanban orders are created in MES or capacity orders are transferred from

ERP. The system considers the below-mentioned situations:

Generation from a work plan:

BDE-KBN_82.docx

Version: 1.2.23049

Page 18 of 48

Generation from a capacity order:

e-Kanban

Utilization of a work plan/capacity order

•  Utilization of a work plan/capacity order for each article and supply relationship/closed loop

Even though there might be several supply relationships/closed loops (ways from supply to

consumption) for one article/item, the system has to generate a relevant kanban order for exactly

one specific closed loop. The work plan/capacity order defined for this article/closed loop is used.

The ID of the supply relationship/closed loop is entered in the header data to find the correct work

plan / capacity order (shown in work plan header/ order header --> assignment --> master data --

> supply relationship/ closed loop).

If no closed loop ID is available at the work plan/capacity order header, the first work

plan/capacity order found for the article number will be used.

The closed loop number of the triggering closed loop is taken over for the generated kanban

order.

•  Utilization of a work plan/capacity order for each article only

•  This is sufficient, for example, if there is only one supply and consumption for each article, i.e.

there is only one closed loop and no differentiation has to be made. In this case, it is not

necessary to define a closed loop number for the work plan header/capacity order header.

BDE-KBN_82.docx

Version: 1.2.23049

Page 19 of 48

e-Kanban

If no closed loop ID is available at the work plan/capacity order header, the first work

plan/capacity order found for the article number will be used.

For which closed loop the generated kanban order is used, results from the assignment of the

closed loop ID for which the kanban order is triggered/generated (e.g. by using the relevant

AIP function or the automatic generation function). The closed loop number of the triggering

closed loop is taken over to the generated kanban order.

•

It might be the case that there are several closed loops for each article but the same and only

created work plan/capacity order is always used. Then it is not necessary to define a closed

loop number for the work plan/capacity order. For which closed loop the generated kanban

order is used, once again results from the assignment of the closed loop ID for which the

kanban order is triggered/generated (e.g. by the relevant AIP function or the automatic

generation function).

•  Another possibility is to define a work plan/capacity order for each article/item only but to

enter or select a specific closed loop number when generating a kanban order by using MOC

functions. For which closed loop the generated kanban order is used, results from the

assignment of the entered closed loop ID for which the kanban order is triggered/generated.

Prerequisites, operating conditions



It has to be defined in advance whether a system uses capacity orders or work plans to

generate  kanban  orders.  Both  variants  cannot  be  used  at  the  same  time. The  system

uses the INI configuration specifying if work plans or capacity orders are to be used.

  Within  the  system  work  plans  relating  to  articles  or  to  articles  and  closed  loops

generally have to be defined for the order type "kanban orders" (e.g. "KBN").



In  general,  the  planned  kanban  quantities  have  to  be  defined  for  all  kanban  articles

within the system.

  Number  ranges  for  the  automatic  generation  of  the  order  number  for  kanban  orders

have to be created or used within the system. Number ranges can be configured flexibly

and depend on the order type.

Data:

Input data to find the appropriate work plan/capacity order to "generate orders":

  Article number of the triggering article (from AIP function, MOC function, automatism)

  Closed  loop  ID  of  the  triggering  closed  loop  (from  the  relevant  AIP  function,  MOC  function,

automatism)

  All data defined in the capacity order or work plan

BDE-KBN_82.docx

Version: 1.2.23049

Page 20 of 48

e-Kanban

The generated kanban order uses the following data from the provided work plan or capacity order:

  Scheduled start  point in time of the generation

  Scheduled end  point in time of the generation + quantity * target cycle  standard formula

  The work plan/capacity order may include several operations; however, in general it is only one

OP.  They  are  taken  over  for  order  generation  and  used  for  planning  based  on  the  default

configuration.

  The quantities for the generation depend on the number of empty KBN objects and planned KBN

quantities (from kanban master data) for the triggering article/closed loop and are calculated for

the kanban order.

  The  machine  group  of  the  OP/OPs  is  entered  in  the  work  plan/capacity  order  and  planning  is

based on it.

  Target  data  (target  cycle,  partitioning,  bill  of  material,  etc.)  is  taken  over  from  the  work

plan/capacity order.

  The article  numbers of the order header and the last OP are  identical. The article number from

the  order  header  is  used  for  order  generation.  The  other  article  numbers  of  the  order  are  filled

based on the work plan/capacity order.

  The closed loop ID of the triggering closed loop is used for the kanban order. The closed loop ID

that is defined for the work plan/capacity order is not used.

If the kanban order is generated by the MOC function "generate order", the entered closed loop

ID is used and transferred to the kanban order.

Procedure/processing

A kanban order can be generated by the following three possibilities:

  Manually at MOC

Utilization of the function "Generation of kanban orders using MOC“ and generation of a kanban

order from a defined work plan or capacity order.

  Manually at AIP

The "electronic kanban board“ of AIP enables the generation of kanban orders for a selected

article and closed loop. The order is generated from a work plan/capacity order created for this

article/martial and closed loop.

  Automatic generation

If the minimum stock level of empty kanban cards (yellow zone, e.g. > = 5) that is configured

within the supply relationships/closed loop for an article (e.g. 5 empty kanban objects) is

exceeded, a planned kanban order is generated from the work plan/capacity order defined for the

article and closed loop.

BDE-KBN_82.docx

Version: 1.2.23049

Page 21 of 48

e-Kanban

Once another kanban object with the status "empty" is available, the number of empty kanban

containers increases and the planned kanban order is increased by the empty kanban object (e.g.

the included planned kanban quantity):

•

quantities  are  updated  for  the  planned  kanban  order  by  every  additional  empty  kanban

object

•

the worker may start the generated, planned kanban order at the AIP at any time

the order/operation status of the kanban order remains "planned" and the OP can be logged on.

Once the allowed maximum quantity of empty kanban cards ("red" zone) has been reached, the

quantities are updated for the planned kanban order the last time and the planned kanban order

becomes a fixed kanban order

The order/operation status of the kanban order is prepared and the OP can be logged on.

The kanban order is no longer changed by an automatic or manual quantity update.

Please note: This function can be enabled/disabled. This function cannot be used

in a reasonable manner if the generation from the electronic kanban board is to be

used.

The actual logic/function for generating orders is triggered by the mentioned three possibilities.

Result:

The article number and closed loop ID of the triggering closed loop or the triggering function are used as

input data for all variants to find the appropriate work plan or capacity order and to generate the kanban

order.

  The order or operation quantity refers to the number of currently empty kanban objects from this

closed loop times the defined kanban quantity from the supply relationships/closed loops.

Order quantity/operation quantity = number of empty kanban objects x defined kanban quantity of the

material

  The order type = KBN

  The order/operation status of the kanban order is prepared and the OP can be logged on

  The closed loop ID of the triggering closed loop is transferred automatically to the order header

(in assignment --> master data --> closed loop) of the generated kanban order. The closed loop

ID that might be defined for the work plan/capacity order is not taken over.

  A cyclic program checks for which article and closed loop the minimum

stock/maximum stock of empty kanban objects has been reached and

successively generates one order after the other of the kanban order.

BDE-KBN_82.docx

Version: 1.2.23049

Page 22 of 48

  While a kanban order is being generated for an article/closed loop, this entry is

blocked for other functions (this prevents the AIP user from generating a kanban

order for the same closed loop during automatic generation).

e-Kanban

Return values

  General

o  Shows  the  generated  kanban  orders/OP  in  the  status  "prepared"  within  the  MOC  order

overview

o  Shows  the  generated  kanban  orders/OP  in  the  status  "prepared"  within  the  AIP

sequencing list (selected as fixed kanban orders/selected as planned kanban orders)

  The generated kanban order includes an assignment for the closed loop at the order header for

which  it  was  created  (see  order  info    tab  order  header  assignment    master  data    closed

loop number).

Capacity orders/ERP interface

General:

There  is  a  general  interface  connection  to  diverse  ERP  systems  for  e-kanban  (SAP-PPPDC  and  EIS-

ERP).  Consequently,  orders  can  be  transferred  from  ERP  to  HYDRA  and,  vice  versa,  uploads  can  be

posted on them (recorded durations and quantities).

The transferred orders differ from common production orders, as they are "capacity orders". In contrast to

common production orders, they have the following tasks:

  Capacity orders are provided to generate planned/fixed kanban orders within MES. Within MES

the capacity order is regarded as a work plan or template to create kanban orders and, therefore,

it includes all relevant data required to produce operations within the order structure.

  Consequently,  capacity  orders  are  generated  within  ERP  and  transferred  to  MES  including  the

BOM,  PRT  list  and  additional  data  (target  specifications)  that  are  determined  from  ERP  master

data.

  Normally, capacity  orders  are built on a monthly basis as capacitive forecast  and transferred to

MES.

  The planned target quantity of the capacity order is reduced by the number of actual quantities to

be produced for a generated kanban order that is planned/fixed or with each quantity update for

the kanban order. This is shown in MES.

BDE-KBN_82.docx

Version: 1.2.23049

Page 23 of 48

e-Kanban

  The recorded quantities and durations of a kanban operation are also posted in relation to orders

on the capacity order/operation and uploaded to ERP. Thus, goods movements or consumption

can be performed in a retrograde manner in ERP.

A  goods  movement  is  not  generated  and  transferred  to  ERP  every  time  a  kanban  object  is

produced.

If work plans are already used as template to generate kanban orders, capacity orders

cannot be used at the same time.

In MES the capacity order is not used for capacity planning/machine assignment in HLS.

Prerequisites, operating conditions:

  Utilization of the standard ERP interface for production orders (including component list)

o  EIS-ERP

o  EIS-EZI

  Utilization of the standard SAP interface for discrete production orders (including component list,

order type)

o  SAP-PPPDC

o  SAP-ISS

Data within the capacity order:

These definitions have to be made or this data has to be transferred within the order interface.

ERP  MES (Download)

  Order header data

  Order type for capacity orders = e.g. ZKAP (Please note: the order type can be configured)

  Article for which the kanban order is to be generated

  Closed  loop  for  which  the  kanban  order  is  to  be  generated  (new  field  in  ERP-EIS  and  SAP-

ISS/function module AK)

  Target quantity (monthly target quantity)

  Operation data

  Article

  Machine group

  Flag "planned for machine group“

  Target quantity (monthly target quantity)

MES  ERP (uploads)

BDE-KBN_82.docx

Version: 1.2.23049

Page 24 of 48

e-Kanban

Relevant data included in uploads for capacity orders:

  Capacity order number

  Durations from kanban orders

  Quantities from kanban orders

  Please note: The machine number might not be known in ERP

Procedure/processing

Capacity orders are generated  in ERP. Once they  have  been released, they  are transferred to MES. In

the first place, capacity orders are used as "templates" to generate kanban orders in MES. In general, the

procedure is as follows:

Transfer of capacity orders from ERP

ERP transfers the capacity order e.g. with the order type "ZKAP" (can be configured). MES takes over the

capacity  order  and  displays  it  in  all  relevant  standard  applications  (just  as  it  is  the  case  for  production

orders). These are, for example:

•

Inbound transactions

•  Backlog of orders

•  Order information

In MES the capacity order is used like a work plan for an article and closed loop.

BDE-KBN_82.docx

Version: 1.2.23049

Page 25 of 48

e-Kanban

Once collected in MES, the capacity order may have the following statuses for the different objects:

•  Order header  prepared

•  Operations  prepared

The  system  may  only  include  one  valid  capacity  order  at  a  time  from  which  kanban  orders  can  be

generated. Even though several capacity orders might exist for an article/closed loop in the system.

The valid capacity order is always the newest/most recent capacity order within the system.

Utilization of capacity orders in MES

Capacity orders are used as "replacement work plan" and kanban orders are generated from them. For

this reason, kanban orders are generated by using the same functions as for work plans. Triggers are:

•  Manually at AIP

•  Manually at MOC

•  Automatic generation of orders

Generation of orders from capacity orders

Orders are always generated based on the same logic. The found capacity order (for article, closed loop,

validity date) is used as template and a kanban order is generated.

The  procedure  for  generating  kanban  orders  from  capacity  orders  is  the  same  as  for  generating  them

from MES work plans.

The  essential  difference  for  the  generation  of  kanban  orders  from  capacity  orders  is  that  the  target

quantity  within  the  capacity  order  is  reduced  by  the  order  quantity  of  the  kanban  order  every  time  a

kanban order is generated.

With the automatic generation of planned/fixed kanban orders, the target quantity within the kanban order

is increased and the target quantity within the capacity order is reduced every time quantities are updated

(with every new, empty kanban object for this article and closed loop).

Uploads to capacity orders

The produced quantities and durations from the kanban order are transferred to the capacity order (added

up).

For  capacity  orders,  uploads  relating  to  orders  are  also  transferred  to  the  ERP  system.  They  are

generated if a kanban order is interrupted/finished.

BDE-KBN_82.docx

Version: 1.2.23049

Page 26 of 48

e-Kanban

Status of a capacity order

The capacity order may have the following order/operation statuses (they are identical):

  Prepared: The capacity order has been transferred from ERP and created in MES.

  Started: The first kanban order has been generated for the capacity order.

  Finished: the last kanban order has been generated for the capacity order and the capacity order

is no longer applicable (a newer capacity order is available).

BDE-KBN_82.docx

Version: 1.2.23049

Page 27 of 48

e-Kanban

4  Material Master

Overview

Menu

Master data  Material  Material master

Transaction code

matc

Function authorization  matc

Available user fields

Where?

Detail view

Object type/user field key

Source (type)

ARTIKEL/SYSTEM

Material (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You use this function to create a material master in the system for the materials used.

Integration

The material master has  been designed to edit materials. This refers to especially defined master data.

The material data defined in the master data are used by the composition function or e-kanban systems.

Requirements

When  you create the master data for a material,  the  material type  and the material  buffer must already

exist in the system.

Selection criteria

The application provides the following selection criteria:

Tab General

Material number

Material number

Drawing issue number

Drawing issue number of the material, also referred to as index

Designation (name)

Material name

BDE-KBN_82.docx

Version: 1.2.23049

Page 28 of 48

e-Kanban

Inactive

Inactive, active materials. The checkbox is not enabled by default.

Tab Composition

Scrap material

Selects materials identified as scrap material.

End product

Selects materials identified as end products.

Input material

Selects materials identified as input material. The checkbox is enabled by default.

Tab Kanban

To show these fields, you require the user authorization "kov".

Kanban material

Selects the materials used in the kanban process.

Tab User fields

You  can  use  this  tab  to  perform  a  selection  according  to  the  definded  user  fields  for  object  type

"ARTIKEL" and the user field key "SYSTEM".

Field descriptions

Material number

Material number

Drawing issue number

Drawing issue number of the material, also referred to as index

Designation (name)

Material name

Material type

Material type of the material

BDE-KBN_82.docx

Version: 1.2.23049

Page 29 of 48

e-Kanban

Specific weight

The specific weight of the material in the unit g/mm³

Inactive

Inactive, active materials. The checkbox is not enabled by default.

Input material

The material is an input material of the composition. This option has to be enabled for materials

used in composition.

Scrap material

Identifies a material as scrap material.

Material buffer

Material buffer of the material

Fragmented size

The material piece size in kg.

Price

The price of the material in €/kg

End product

Identifies a material as end product of the composition.

Tab Kanban

To show these fields, you require the user authorization "kov".

Kanban material

Identifies a material as kanban material.

Tab MSL (only with HYDRA for Electronics)

The  Moisture  Sensitivity  Level  (MSL)  specifies  the  moisture  sensitivity  of  semiconductor  components

during packing, storage and assembly.

MSL material

This option specifies if the MSL level is relevant to material of this material type.

MSL term

Time period in hours in which the material must be used after opening.

Level/threshold

Specifies the level of the MSL material.

BDE-KBN_82.docx

Version: 1.2.23049

Page 30 of 48

e-Kanban

Comment

You can enter a comment in this field.

Tab User fields

You can use user fields to store additional customer-specific information in the MES. The user fields tab

includes  eight  sub-index  tabs,  which  each  has  eight  additional  user  fields.  The  so-called  user  field  key

specifies the available user fields and their meaning.

Object type

Default "ARTIKEL“

User field key

Default "SYSTEM“

User fields

The following user fields are available after system customization (maximum):

Field data type

Number of
fields
6
16

time,

Date
Numeric,
duration
Decimal value
Text field, length 1
Text
length
field,
10
Text
20
Text
40
Each page shows a maximum of 8 fields.

6
16
6

length

length

field,

field,

14

2

By default, no user field keys are defined. You must activate in the system via customization that this kind

of user fields is supported.

Toolbar

 Composition recipe

This function calls the relevant composition recipe for the selected material.

BDE-KBN_82.docx

Version: 1.2.23049

Page 31 of 48

e-Kanban

5  Production Levels

1.1  Summary

Menu

Master data  Material  Production Levels

Transaction code

plev

Function authorization

plev

Utilization

The function is used to create or modify  production  levels within the system and to assign machines or

material buffers for each production level.

Integration

The creation of production levels allows for machines and material buffers, which may be used in different

evaluations/reports e.g. in the estimation of the range of coverage, to be summarized individually.

The application "production levels" is divided into two areas:

  Production levels and their editing functions

A production level may be selected, added or edited in this dialog.

  Assignment functions and their relevant editing functions

This screen shows the machines and material buffers assigned to the selected production level.

Further machines and material buffers are also added or edited.

Selection criteria

The application provides the following selection criteria:

Production level

The production level may be selected or entered.

Material buffer

The material buffer can be selected or entered.

Machine

The machine may be selected or entered.

Field descriptions "production levels"

Production level

The production level may be selected or entered.

BDE-KBN_82.docx

Version: 1.2.23049

Page 32 of 48

e-Kanban

Description

Designation of the production level

Editing functions

The following dialog opens to edit a data record:

 Add

Inserts a new production level

 Edit

Edits an existing production level

  Delete

Deletes the selected or several selected production levels

"Production levels assignment" detail application

The "assignment" detail application shows the below-mentioned data for each production level:

Category, type

These assignments are possible:

  Machine

  Material buffer

Name

Subject to the assignment, this field shows the machine number or the material buffer.

Description

Comment field / text field

Company

Abbreviated company name

Cost center

Affected cost center

Site / company

Affected site

Editor

Last editor of the data record

BDE-KBN_82.docx

Version: 1.2.23049

Page 33 of 48

Last modification

Last modification to the data record.

e-Kanban

The documentation dealing with the assignment of production levels describes the editing details for the

selected production levels and, as a result, the detail application "assignment".

BDE-KBN_82.docx

Version: 1.2.23049

Page 34 of 48

e-Kanban

6  Closed Loops / Supply Relationships

Summary

Menu

Master data Material Supply relationships

Transaction code

Function authorization

intsc

intsc

Usage

By forming closed loops/supply relationships, the successor and predecessor levels of defined production

levels can be defined. One production level can have several successor and predecessor levels.

Integration

The  closed  loops/supply  relationships  are  used  in  the  evaluation  of  ranges  as  well  as  in  the  e-kanban

process as base data.

Requirements

The production levels must already be created in the system.

Selection criteria

The following selection criteria are available in the application:

Preceding level/supply - production level

Displays all supply relationships with the selected production level

Preceding level/supply - description

Displays all supply relationships with the selected description

Subsequent level/consumption  - production level

Displays all supply relationships with the selected production level

Subsequent level/consumption - description

Displays all supply relationships with the selected description

The user authorization "kov" is required for displaying the below-mentioned fields.

Material number

Shows all closed loops/supply relationships matching the entered material number.

BDE-KBN_82.docx

Version: 1.2.23049

Page 35 of 48

Closed loop/supply relationship ID

Shows  the  closed  loop/supply  relationship  matching  the  entered  ID  that  is  specific  within  the

e-Kanban

system.

Field descriptions

"General" index tab:

Preceding level/supply

Selected preceding level/supply of a closed loop

If e-kanban is in use the preceding level/supply (place of production) represents the starting point of

the closed loop for a kanban object. The supply is chosen from the production levels created in the

system.

In  case  the  supply  is  a  supermarket,  warehouse  or  intermediate  production  buffer,  it  has  to  be

created as material buffer within MES and is chosen from the production levels (the material buffers

are assigned to).

If e-kanban is in use, it is not possible to directly assign a machine group as the supply

or a relevant material buffer for an entire machine group. But in fact the same material

buffer is entered as common material buffer of the entire machine group for all affected

machines pertaining to a machine group. This common material buffer is then selected

as the supply.

Subsequent level/consumption of the closed loop

Selected subsequent level/consumption of a closed loop.

If e-kanban is in use the consumption represents the end point (place of consumption) of the closed

loop for a kanban object. The consumption is chosen from a production level created in the system.

In case the consumption is a supermarket or intermediate production buffer, it has to be created

as material buffer within MES and is chosen from the production levels (the material buffers are

assigned to).

If  e-kanban  is  in  use,  it  is  not  possible  to  directly  assign  a  machine  group  as  the

consumption  or  a  relevant  material  buffer  for  an  entire  machine  group.  But  in  fact  a

common material buffer (supplying the whole machine group) is entered or selected as

preceding machine buffer for all affected machines pertaining to a machine group.

BDE-KBN_82.docx

Version: 1.2.23049

Page 36 of 48

e-Kanban

The user authorization "kov" is required for displaying the below-mentioned fields.

Material number

Material  number  of  the  kanban  article  for  which  the  closed  loop  applies.  Several  closed  loops  (n

entries) can be defined for a material.

Closed loop/supply relationship ID

Specifically identifies the closed loop/supply relationship. A supply relationship can only be created

once within the system.

"Kanban" index tab:

Number of KBN in circulation

Total number of all kanban objects circulating within this closed loop.

Minimum stock level of empty kanbans (start "yellow" zone)

The  minimum  stock  level  of  empty  kanbans  represents  the  upper  stock  limit  of  empty  kanban

containers  that  may  reached  before,  for  example,  production  (replenishment)  is  triggered

automatically  and  a  changeable,  planned  kanban  order  is  generated  initially.  Hence,  the  minimum

stock  level  of  empty  kanbans  represents  the  limit  between  the  "green"  and  "yellow"  zone  (status

lights at the terminal). The minimum stock level needs to be configured for the display in:

  Electronic Kanban Board (AIP)

Maximum stock level of empty kanbans (start "red“ zone)

The  maximum  stock  level  of  empty  kanbans  represents  the  lower  stock  limit  of  empty  kanban

containers  that  may  be  reached.  If  this  limit  is  exceeded,  the  planned  kanban  order,  for  example,

automatically  becomes  an  unchangeable,  fixed  kanban  order.  Hence,  the  maximum  stock  level  of

empty  kanbans  represents  the  limit  between  the  "yellow"  and  "red"  zone  (status  lights  at  the

terminal). The maximum stock level needs to be configured for the display in:

  Electronic Kanban Board (AIP)

Planned KBN quantity

Planned, defined quantity of kanban objects (contents).

BDE-KBN_82.docx

Version: 1.2.23049

Page 37 of 48

e-Kanban

7  Kanban Configuration

Summary

Menu

Master data  Material  Kanban configuration

Transaction code

kres

Function authorization

kres

Utilization

To  be  able  to  use  e-kanban,  each  kanban  included  in  the  system  is  used  as  an  object  similar  to  a

resource.

The  master  data  for  all  used  kanban  objects  are  created  and  managed  in  this  application.  In  HYDRA

kanban objects are considered as resources with the pre-defined resource type "KBN".

Selection criteria

The following selection criteria are available in the application:

Resource from ... to ...

This selection criterion refers to the unique ID of the kanban object. Wildcards (placeholders *) can

be used.

Designation

Designation of the kanban object.

Kanban article

Article number/material number for which the kanban object is used.

Closed loop

Unique ID of the closed loop/supply relationship for which the kanban object was created.

Field descriptions

"General" category

Resource/ object

This field includes the ID matching the resource or kanban object to be entered. The ID/number is

unique for each resource type.

Allowed characters are:

ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/_.-+#. Blank-

BDE-KBN_82.docx

Version: 1.2.23049

Page 38 of 48

e-Kanban

Other special characters are not allowed. For technical reasons, * (asterisk) and % (percent) can be

input, but are nonetheless not permitted because they are not valid characters. When the input field

is exited, lower case letters are automatically transformed into CAPITAL LETTERS.

Designation

This  field  has  been  designed  to  assign  a  short,  distinct  designation  to  each  kanban  object.  This

designation is displayed in reports and overviews and it is useful for orientation.

Kanban article

Article number/material number for which the kanban object is used. This field is a mandatory field

and key field. The article number/material number can also be chosen from the material master.

Closed loop/supply relationship

Unique  ID  of  the  closed  loop/supply  relationship  for  which  the  object  was  created.  This  field  is  a

mandatory  field  and  key  field.  The  ID  can  also  be  chosen  from  the  application  "supply

relationships".

Consec. number

Consecutive number of the kanban object from the total number of kanban cards (e.g. 1 out of 10

kanban objects) circulating in this closed loop/supply relationship.

"User fields" category

User  fields  offer  the  possibility  to  store  further  customer-specific  information  to  MES  besides  the  fields

available in MOC standard. The tab provides eight sub tabs each of which providing eight user fields. The

so called user field key determines which user fields are involved and which meaning they have.

Object type

User fields are configured in a fixed manner for the resource type = KBN

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and  therefore  the  purpose  of  the  fields)  varies  from  one  object  to  the  next.  User  field  keys  are

defined in coordination with the customer during the customizing process.

User fields

The following user fields are available after customizing the system:

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
length
field,
Text
10

Number of
fields
6
16

6
16
6

BDE-KBN_82.docx

Version: 1.2.23049

Page 39 of 48

e-Kanban

Field data type

Number of
fields
14

field,

length

Text
20
Text
40
A maximum of 8 fields are shown for each page.

length

field,

2

User field keys are not defined by default in the system. The system has to be customized accordingly to

be able to support this kind of user fields.

"Comment" category

The Comment tab allows additional comments about the resource to be stored in six input fields.

Toolbar

 Insert

Opens the dialog for adding a comment.

 Copy

Opens the dialog for copying a comment.

 Edit

Opens the dialog for editing a comment.

 Delete

Deletes one or several resources.

 Resource status

Opens the application to configure the resource status/kanban status.

 Kanban overview

Opens the application "kanban overview"

 Status change

Opens the dialog for changing the resource status/kanban status.

BDE-KBN_82.docx

Version: 1.2.23049

Page 40 of 48

e-Kanban

8  Closed Loop/Terminal Assignment

Summary

Menu

Master data  Material  Closed loop/terminal assignment

Transaction code

Function authorization

tla

tla

Utilization

This application can be used to assign the required closed loops/supply relationships for each supply (AIP

of the supply) to be displayed in the electronic kanban board at the terminal.

Selection criteria

The following selection criteria are available in the application:

Terminal

Terminal number/ identification

Closed loop

Unique ID of the closed loop/supply relationship assigned to the terminal.

Position

Position of the closed loop/supply relationship to be displayed at the terminal

Field descriptions

Terminal

Terminal number/ identification

Closed loop

Unique ID of the closed loop/supply relationship assigned to the terminal.

Position

Position of the closed loop/supply relationship to be displayed at the terminal

BDE-KBN_82.docx

Version: 1.2.23049

Page 41 of 48

e-Kanban

9  Kanban Stock Levels

Summary

Menu

Material management  Kanban  Kanban stock

Transaction code

ksto

Function authorization

ksto

Utilization

This application shows the current kanban requirements. The user is informed about the following:

  Current status of empty kanban objects for a material within a special, closed loop compared to

the allowed minimum and maximum stock level.

  Relative fill level of empty kanban objects for each material and closed loop.

  Current  status  of  all  empty  kanban  objects  for  a  material  (total  of  all  empty  kanban  objects

accumulated  from  all  closed  loops)  compared  to  the  accumulated,  allowed  minimum  and

maximum stock levels.

  Quantities for each material within a closed loop/supplier relationship.

  Quantities for each material (total)

This shows  when the  next  kanban order is  generated/should be generated as  well as the current stock

level of material or the current stock level of empty kanban objects.

It  is  displayed  for  each  material  and  closed  loop/supply  relationship  as  single  entry  within  the  grid.  In

addition, grouping by material numbers is allowed. The below-mentioned values are accumulated in this

case:

  KBN in circulation

  KBN stock: empty

  KBN stock: filled

  KBN stock: miscellaneous

  Current quantities

  Planned quantities

Selection criteria

The following selection criteria are available in the application:

Closed loop

Unique ID of the closed loop/supply relationship

BDE-KBN_82.docx

Version: 1.2.23049

Page 42 of 48

e-Kanban

Material

Kanban material

Material designation

Designation of the kanban material

Field descriptions

Closed loop

Unique ID of the closed loop/supply relationship in which kanban objects are circulating.

Material

Kanban material/kanban article from the material master

Material designation

Designation of the kanban material/kanban article from master data

Number of KBN in circulation

Number of kanban objects of this material or article/resource type (total)

Minimum stock level of empty kanban

Minimum stock level of empty kanbans  limit value from master data

Maximum stock level of empty kanban

Maximum stock level of empty kanbans  limit value from master data

KBN stock: empty

Number of all kanban objects of this material or article assigned to the "empty" status

KBN stock: filled

Number of all kanban objects of this material or article assigned to the "filled" status

KBN stock: miscellaneous

Number of all kanban objects of this material or article assigned to another status (neither "empty"

nor "filled")

Current quantities

Shows the current quantity (e.g. number of pieces/quantity) for a material/article. The calculation is

based on the kanban stock level with the "filled" status and the actual quantity.

Planned quantities

Shows the planned quantity (e.g. number of pieces/quantity) for a material/article. The calculation is

based on the kanban stock level with the "filled" status and the planned quantity.

Relative fill level

Shows the relative fill level for a material/article. The calculation is based on the  relation between

KBN with status = empty / initial and KBN in circulation. Data is entered in percent.

BDE-KBN_82.docx

Version: 1.2.23049

Page 43 of 48

e-Kanban

Toolbar

  Generate kanban order

Authorization: kbn.generate

BDE-KBN_82.docx

Version: 1.2.23049

Page 44 of 48

e-Kanban

10  eKanban Data Collection

Main view

The main view provides the following functions for the kanban process. The available functions change,

when the screen changes (supply or demand).

  Electronic kanban board

  Fill kanban

  Empty kanban

Electronic kanban board

On the supply side, the AIP displays the  Electronic kanban board. The electronic kanban board informs

the user about the number of empty kanban objects of a specified material in a defined control cycle.

To  open  the  electronic  kanban  board,  click  the  button  Electronic  kanban  board  on  the  main  view.  The

system  then  loads  all  kanban  items  (including  the  relevant  additional  information)  that  are  part  of  the

control cycles assigned to this AIP.

The following information is displayed for the user:

  Status

o  Green:

The number of empty kanban objects is less than the minimum number of empty kanban

objects

o  Yellow:

The number of empty kanban objects is greater than or equal to the minimum number of

empty kanban objects

o  Red

The number of empty kanban objects is greater than or equal to the maximum number of

empty kanban objects

  Material

  Control cycle

  Demand

  Kanban objects in the control cycle

  Maximum number of empty kanbans

  Minimum number of empty kanbans

BDE-KBN_82.docx

Version: 1.2.23049

Page 45 of 48

e-Kanban

Fill kanban (dialog KBN_FILL)

The  dialog  Fill  kanban  is  used  on  the  AIP  terminal  on  the  supply  side.  Here,  you  set  the  status  of  the

actual  kanban  object  in  the  system  from  empty  to  filled  when  the  container  has  been  filled.  The  dialog

workflow is as follows:

  Open the dialog Fill kanban on the main view.

  Enter/scan the material number

  Select the control cycle for the material number entered

o  The system only  displays the control cycles  and the  additional  information if the control

cycles are configured for the material number entered.

o  The following additional information is displayed for the control cycle:

  Supply / demand

  Objects in the control cycle

  Full objects in the control cycle

  Empty objects in the control cycle

  Planned quantity per object

  The fields Supply and Demand are automatically filled when you select the control cycle.

  When  you  have  selected  the  control  cycle,  the  system  automatically  suggests  the  next  kanban

object  with  status  Empty.  If kanban  objects  with  status  Initial  are  available  in  the  system,  these

objects are used first. The field Consec. No. is filled accordingly. Also the fields Kanban quantity

and  Planned   kanban  qty.  are filled  with the value  of the planned kanban quantity stored in the

resource  master  data.  The  user  can  change  the  quantity  in  field  Kanban  quantity  and  enter

another actual quantity.

  After confirmation, the dialog KBN.FILL is sent to the server.

  A label/an accompanying material document is printed for this kanban object.

  Kanban containers need not be filled 100 %.

  The  labels  are  destroyed  when  the  material  is  used  up  (demand).  The  labels

are  only  destroyed  when  the  container  has  been  emptied  or  the  dialog

KBN_EMPTY has been executed.

Empty kanban (dialog KBN_EMPTY)

On the demand side, the dialog Empty kanban is used on the AIP terminal. Here, you set the status of the

actual kanban object in the system from filled to empty when the containers have been processed. When

the dialog has been executed, the label/accompanying document for this kanban object is destroyed and

the kanban object is assigned the status Emptied. The dialog workflow is as follows:

BDE-KBN_82.docx

Version: 1.2.23049

Page 46 of 48

e-Kanban

  Open the dialog Empty kanban on the main view.

  Enter/scan the kanban object

  The following information is automatically displayed:

o  Consec. no.

o  Material number

o  Kanban objects in the cycle

o  Control cycle ID

o  Supply

o  Demand

o  Planned kanban quantity

o

(Actual) kanban quantity

  The  user  confirms  the  dialog  via  staff  badge  number  and  clicks  the  button  Empty  kanban.  The

dialog is closed. The kanban object is set to the status Empty in the system. The kanban object is

posted back to the supply side.



If the user clicks the Cancel button, the dialog is interrupted and exited. The status is not changed

and in the system, the kanban object is still on the demand side.

  The system only empties kanban containers completely (100%)

  For  this  reason,  only  kanbans/containers  that  have  been  emptied  entirely  are

posted. If a container includes a remaining quantity, the container is considered

as full container and put back on the shelf. The withdrawal from the container is

not  known  to  HYDRA.  The  quantity  entered  on  the  label  or  accompanying

document is unchanged (full quantity). The quantity is not adjusted and a new

label is not printed.

  The kanban object number must be unique in the system. This way, the number

can  be  used  and  the  number  of  the  control  cycle  need  not  be  entered

additionally.

Order list

You call the order list using the dialog Log operation on. The order list shows the normal orders and the

kanban orders/OPs.

The order list of a machine (supply) displays the following orders:

o  Production orders/OPs (planned for this machine/machine group)  data record is "blue"

o  Fixed kanban orders (of the supply/machine group from the generated order/OP)  data

record is "lilac"

BDE-KBN_82.docx

Version: 1.2.23049

Page 47 of 48

o  Planned  kanban  orders  (of  the  supply/machine  group  from  the  generated  order/OP)  

data record is "orange"

You can log on kanban orders using the dialog Log operation on.

e-Kanban

BDE-KBN_82.docx

Version: 1.2.23049

Page 48 of 48

