Configuration of Transport Orders

1  Configuration of Transport Orders

Overview

Purpose

In the Material and Production Logistics, you can use so-called transport orders to integrate the transport

of batches or resources.

If  you  want  to  use  transport  orders,  you  must  first  make  the  following  configurations  for  the  different

objects.

Configuration of the workplace/machine

In  the  workplace  configuration  (Master  data    Workplaces/machines  Workplace  configuration),  you

must configure if the system must automatically generate transport orders for a specific workplace.

The configuration options are as follows:

  Generate transport order for output material
  Generate transport order for input material

If  you  make  these  setting  for  the  material  type,  the  settings  of  the  workplace/machine  are

overwritten.

Configuration of the material type

In the master data configuration (Master data  Material Material type), you must make the following

settings for the Material type if you want to automatically generate transport orders for a material type.

The configuration options are as follows:

  Generate transport order for output material
  Generate transport order for input material

Configuration of the order type

A transport order is integrated in HYDRA using a specific order type (e.g. TRNS).

Default setting of the order type transport orders

Fields in Order types

Transport orders

Order type

TRNS

Setup_TransportOrders.docx

Version: 1.4.18468

Page 1 of 6

Configuration of Transport Orders

Fields in Order types

Transport orders

Order
composition

type

for

M

Category

Upload

Plan

Planned dates

Symbol

Sequencing list

Recordable

May  OPs  oft  he  order  be
finished

Combinded order logon

Log  on  again  when  shift
starts

Log  person  off  when  shift
ends

FA

YNN N NNNN  NNN  NY

F

O

fa.bmp

Y

Y

Y

T

Y

Y

Serial numbers required

N

Assignment
numbers

of

serial

N

Change after upload

Check  status  preceding
OP

Check  min.  send-ahead
qty.  of  preceding  OP
when order is logged on

Quantity  check  of  send-
ahead quantity

Plausibility check if PERS
IN

N

N

N

N

N

Priority control

Check if shop floor papers
are printed

GN

N

Consideration
production variants

of

NE

Active

Y

Designation

Transport order

Order  is  not  logged  off
automatically

Milestone processing only
for the last OP

N

N

Only  OPs  oft  he  same
order  type  can  be  logged

Y

Setup_TransportOrders.docx

Version: 1.4.18468

Page 2 of 6

Configuration of Transport Orders

Fields in Order types

Transport orders

on simultaneously

Generate inspection order
number

N

Configuration of the order/operation status

Order status assignment for the order type “TRNS” (identical to the order type = 0 production orders):

(initial status)

  Prepared (I)
  Reserved (V)
  Transport (L)
  Finished (E)

Configuration of the work plan

If you want to use the functions of the transport management, a work plan must exist in the system and

this work plan must be activated using the application "Work plan determination".

The work plan must be configured as follows:

-  Order header

o  Order type: specifically configured order type for the transport management (e.g. TRNS)
o  Article




In case of transport of a batch: article number
In case of transport without batch: empty

-  Operation

o  Exactly 1 operation
o  Article




In case of transport of a batch: article number
In case of transport without batch: empty

o  Planned for: Group
o  Recordable: yes
o  Batch manag. requirement: no
o  Parallel logon possible: no

Activate the work plan using the application "Work plan determination". Make the following settings:

-  Work plan: store the previously defined work plan
-  Active: yes
-  Order type: specifically configured order type for the transport management (e.g. TRNS)
-  Article: enter the article of the work plan in field "Article".

Configuration for AIP functions (general)

Setup_TransportOrders.docx

Version: 1.4.18468

Page 3 of 6

Configuration of Transport Orders

You  must  have  run  the  database  patch  dbp_mpl_transportation.hsc  for  all  functions

listed in the following.

You must make the following configuration. It does not matter if you use AIP or AIP 8.2.

To display the columns in the grid, the following entries in the file ctaiplay.ini are required:

;*** Section for transport-specific  ANR – fields
;*** in TGRP X for terminals with transport functions
[ MPL-TRA - transport orders ]
GRID_LIST_TYP=ANR
; Additional fields in the order list
AGR_TRANR_ART= ; ..
AGR_TRANR_CNR= ; ..
AGR_TRANR_RES= ; ..
AGR_TRANR_RESTYP= ; ..
AGR_TRANR_SMP= ; ..
AGR_TRANR_TMP= ; ..
AGR_TRIGGER_ANR= ; ..

;*******************************************************************
[ TRANRLIST ]
GRID_FONT=Arial                           ; font
GRID_FONTSIZE=9
GRID_COLOR=clBlack                        ; font color
GRID_BACKGROUND=clWhite                   ; background color

GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=AST,AST,I-clCyan|V-clGray|U-clGray|L-clLime

EXAMINE_SCANEXPR1=AST=I
EXAMINE_SCANCOLOR1=clBlue
EXAMINE_SCANEXPR2=AST=L
EXAMINE_SCANCOLOR2=clGreen
EXAMINE_SCANEXPR3=AST=E
EXAMINE_SCANCOLOR3=clRed

;MNR=C8,100,L,Maschine
AST=C10,60,Z,Status
ANR=C10,150,L,AG
ATK=C25,125,L,Artikel

SGR:GUTP=N10.3,80,R,Sollmenge
SGE:P=C3,50,Z,Einheit

AGR_TRANR_CNR=C10,100,L,Los
AGR_TRANR_SMP=C10,80,L,Quellpuffer
AGR_TRANR_TMP=C10,80,L,Zielpuffer
AGR_TRANR_RES=C10,80,L,Ressource
;AGR_TRANR_RESTYP=C10,50,Z,Res.typ

AGR_TRANR_ART=C10,40,Z,Art

Configuration for the AIP

Configuration of the dialog "Generate transport order"

AIP configuration

If  you  want  to  use  the  function  Generate  transport  order  (MBL),  you  must  configure  the  entry

TRANR_GEN in the button configuration (ctaipbut.ini/<tgrp>).

Exactly store the following entry:

6=U_TRANR_GEN,R,Transportauftrag anlegen

Display configuration of the "Sequencing list"

Setup_TransportOrders.docx

Version: 1.4.18468

Page 4 of 6

Configuration of Transport Orders

If  you  want  to  use  this  function,  you  must  configure  the  respective  entry  in  the  ctaipbut.ini  button

configuration.

If the button configuration  is customized,  e.g. using "ctaipbut.ini", the function can be configured for the

required button by manually adding "TRANRLIST".

Example:

[ANR-ALL-Page2]
…
2=TRANRLIST,R,Transportmanagement

Configuration of the dialog "Start transport order"

If you want to use the function Start transport order (MBL), you must configure the respective entry in the

ctaipbut.ini button configuration.

The dynamic dialog TRANR_AN must be available in the terminal.

Configuration of the dialog "Finish transport order"

If  you  want to use the function  Finish transport  order  (MBL),  you must configure the respective  entry  in

the ctaipbut.ini button configuration.

The dynamic dialog TRANR_AB must be available in the terminal.

Configuration for the AIP 8.2

You  must  explicitly  configure  the  function  calls  for  the  dialogs  TRANR_GEN  (Generate  transport  order)

and TRANRLIST (List of transport orders) in the AIP 8.2. If required, the configuration of the function calls

can be customized.

Configuration of the dialog "Generate transport order"

Add the following section, for example in the file "l_mnr.xml".

From file "l_mnr.xml"

[…]
<!--Buttons-->
<ScrollBox>
[…]
<!--Create transport order-->
<element class="TGUIButton">
  <Align>alTop</Align>
  <AlignWithMargins>true</AlignWithMargins>
  <BorderWidth>5</BorderWidth>
  <Height>50</Height>
  <Margins>

Setup_TransportOrders.docx

Version: 1.4.18468

Page 5 of 6

Configuration of Transport Orders

    <Top>0</Top>
    <Left>0</Left>
    <Right>10</Right>
    <Bottom>7</Bottom>
  </Margins>
  <Alignment>taLeftJustify</Alignment>
  <Color Define="COLOR_MENU">$E0E0E0</Color>
  <Caption Function="Translate" LanguageKey="lkCreateTransportOrder">Transportauftrag generieren</Caption>
    <OnClick Identifier="TRANR_GEN" Parameterprozessor="TFocusedDataRows">Notify</OnClick>
</element>
</ScrollBox>
[…]

The dynamic dialog TRANR_GEN must be available in the terminal.

Display configuration of the "List of transport orders"

Add the following section, for example in the file "l_mnr.xml".

From file "l_mnr.xml"

[…]
<!--Buttons-->
<ScrollBox>
[…]
<!--Create transport order-->
<element class="TGUIButton">
  <Align>alTop</Align>
  <AlignWithMargins>true</AlignWithMargins>
  <BorderWidth>5</BorderWidth>
  <Height>50</Height>
  <Margins>
    <Top>0</Top>
    <Left>0</Left>
    <Right>10</Right>
    <Bottom>7</Bottom>
  </Margins>
  <Alignment>taLeftJustify</Alignment>
  <Color Define="COLOR_MENU">$E0E0E0</Color>
  <Caption Function="Translate" LanguageKey="lkTransportManagement">Transportmanagement</Caption>
    <OnClick Identifier="TRANRLIST" Parameterprozessor="TFocusedDataRows">Notify</OnClick>
</element>
</ScrollBox>
[…]

In this function, you can make a reservation for transport orders.

The dynamic dialog TRANRLIST must be available in the terminal.

Configuration of the dialog "Start transport order"

To use the function Start transport order (MBL), use the dialog TRANRLIST.

The dynamic dialog TRANR_AN must be available in the terminal.

Configuration of the dialog "Finish transport order"

To use the function Finish transport order (MBL), use the dialog TRANRLIST.

The dynamic dialog TRANR_AB must be available in the terminal.

Setup_TransportOrders.docx

Version: 1.4.18468

Page 6 of 6

