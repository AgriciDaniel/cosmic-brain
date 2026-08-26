AIP2 - Local Configuration File ctaiplay.ini

1  AIP2 - Local Configuration File ctaiplay.ini

The  layout  is  configured  for  specific  terminals  in  the  file  ctaiplay.ini  stored  in  the  terminal  directory

C:\MPDV\AIP2.

The  layout  is  configured  for  specific  terminals  in  the  file  ctaiplay.ini  stored  in  the  terminal  directory

C:\MPDV\AIP2.

This file is basically used for the configuration of grids in AIP2.

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations from the standard are created in the customer-specific directories

provided for this purpose, e.g. \mip\1\custom\aip2\tgrp_901.

Create the corresponding, empty file (e.g. ctaiplay.ini) in this directory. Modified sections

are copied to this file. Make the respective configurations in this file.

After restarting the terminal, files from the main directory \mip\ctnet\win\aip2 are merged

with  files  from  the  customized  directory  \mip\1\custom\aip2\tgrp_901.  Then  the  merged

file is transferred to the local terminal directory C:\MPDV\AIP2.

Changes to the configuration file ctaiplay.ini will not take effect until the terminal software

has been restarted.

Entry

Section [OP info]
Deaktiviert=AG_Bmk,AG_Fort

Sortierung=AG_TechInfo,*

Section [main]
Nachkommastellen=0
Repaint_time=60
PopupSize->EmptyQueue=300
PopupSize->ReloadPze=200
SymbolSubstDesignation=MBEZK

Comment

- indicated info pages are not shown
 - AG_Info (OP info) cannot be disabled
 - Entries affected by sorting are not
   disabled.
- Order of info pages in the icon list
- if the list ends with " ,* " the non-listed
  standard pages are added at the end.
- Standard pages:
AG_Info,AG_ZuInfo,AG_Bmk,AG_TechInfo,AG_Fort,AG_FertP
ap

Decimal places for quantities in the order/machine overview
Cycle for updating the view (for machine list and machine info)
Empty popup window size for quick queue
Reload popup window size for PZE configuration
The specified field replaces the machine number in the icon
view.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 1 of 16

AIP2 - Local Configuration File ctaiplay.ini

Entry

SymbolAdditionalInfo=MBEZK

Comment

Display of any field from the machine list in the icon view
between machine number and operation number:

MaxExpressions=50

Sections for list layouts
[Personenliste]
[Bedienposition]
[Maschinenstatusliste]
[Ausschussgruende]
[Abweichungsgruende]
[Auftragsliste]
[Vorgabeliste]
[Schichtinfo]
[Maschinenliste]
[Eingangslosliste] input batch list

[Ausgangslosliste]
Syntax of table formatting
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_FIXCOLS=0

The configured field replaces the machine number for lines and
aggregates.
Please note: Only in the design/GUI of AIP 8.1
For the configurations used in the list layouts for coloring rows
or cells, 20 entries can be made by default.
e.g.EXAMINE_CELLBKCOLOR20=..
The MaxExpressions setting can be used to increase the
number of entries.
 EXAMINE_CELLBKCOLOR50=..
This maximum index applies to all EXAMINE configurations in
all grids. Internally, a corresponding amount of memory is
always reserved for each grid, even if no EXAMINE
configuration is used.
(from AIP 8.2.1.12)

List displayed when staff is logged on
Predefined list of "operator positions"
Predefined list of "machine statuses"
Predefined list of "scrap reasons"
Predefined list of "deviation reasons"
Lower list in the main view
Order sequencing list
List of shift info
Upper list in the main view
List  of  input  batches,  e.g.  when  "logging  on  the  OP"  in  batch
mode
List of preceding batches when "changing output batches"

Font type
Font size
Font Color
Background color
Number of fixed columns

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 2 of 16

AIP2 - Local Configuration File ctaiplay.ini

Entry

Comment

GRID_ORDER=MSZEIB
GRID_ORDER=MSZEIB=-

Sorting
Sorting in descending order

in

ascending

order

Sorting is executed according to the formatting of the column.

Examples:

ANR_DATB=C10,65,L, planned start

  Alphanumeric  sorting  (the  date  is  provided  in  format

MM/DD/YYYYY)

ANR_DATB=dd.mm.yyyy,65,L,planned start

  Sorting by date

If  several  criteria  are  indicated  (separated  by  |)  only  the  first
criterion can be sorted in descending order. All other criteria are
sorted in ascending order.
The  following  entry  must  be  set  in  the  configuration  for  the
section so that the sorting is used in the display:
ORDER=#USE#INI#ITEM#

GRID_LIST_TYP=MNR
GRID_LIST_TYP=ANR

Example for the section Sequencing List (Auto)
[WF@ANR]
CMD=DLG=LIST;11|MOD=V|MNR=<MNR>|
…..
SECTION=Sequencing List (Auto)
…..
ORDER=#USE#INI#ITEM#
The  list  type  of  the  section  is  indicated  with  this  entry,  if  fields
are displayed that need to be loaded additionally.
This entry also enables the search when starting.
The entry has to be entered above the IDs to be reloaded!!!
All
file
the
to  be  reloaded  can  be
headers.dat  in  the  "spool"  directory  of  the  terminal.  It  consists
of four lines:

identifiers

found

in

1.  10|…: Fields that are always included in the machinery

list

2.  *10|…: Fields that can be reloaded for the machine list
3.  11|…: Fields that are always included in the order list
4.  *11|…: Fields that can be reloaded for the order list
The  font  color  switches  from  clWhite  to  clSilver  every  time  the
MGRP value changes.
Up to 8 colors can be defined.

The machine groups 71/72/73 are presented in green font color;
the groups 96/97/101 are displayed in red font color.

Up to 8 colors each can be defined.

EXAMINE_CONTENTS_CHANGE=MG
RP
EXAMINE_COLOR_C1=clWhite
EXAMINE_COLOR_C2=clSilver
EXAMINE_SCANEXPR1=MGRP=71|7
2|73
EXAMINE_SCANEXPR2=MGRP=96|9
7|101
EXAMINE_SCANCOLOR1=ClGreen
EXAMINE_SCANCOLOR2=ClRed

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 3 of 16

AIP2 - Local Configuration File ctaiplay.ini

Entry

Comment

All lines  with BATTRIB=1  are shown in blue background color;
rows with BATTRIB=2 are displayed in lime.
Up to 8 colors each can be defined.

Specification  of  a  column  that  includes  the  color  value  for  the
row (e.g.: 0-Black; 255-Red, 16777215-White)
Setting  of  the  background  color  depends  on  whether  the  field
value reaches different threshold values.

EXAMINE_SCANBKEXPR1=BATTRIB
=1
EXAMINE_SCANBKEXPR2=BATTRIB
=2
EXAMINE_SCANBKCOLOR1=clBlue
EXAMINE_SCANBKCOLOR2=clLime
EXAMINE_COLOR=TEXTCOLOR
EXAMINE_BKCOLOR=HGRCOLOR
EXAMINE_CELLBKLEVEL2=EGR:AUS
P,EGR:AUSP,<1*clLime|<=5*clYellow|>
15*clRed
EXAMINE_ROWBKLEVEL1=SGR:RES
T,
SGR:REST,<=0*clRed|<=5*clLime|>15*
clYellow
Syntax of column definitions
MNR=C8,80,R
MGRP=N6,60,R
AGR:AUS=N10.2,125,R
MSDATB=dd.mm.yy,70,L
MSZEIB=hh:mm,70,L
SKDATB=dd.mm.yyyy,90,L
SKZEIB=hh:mm:ss,80,L
MSDAUER=ddd.iii,60,R
AGR:BMK11=hhh:mm:ss,80,R,TESTH
EADER
ALIAS KOPIE=MNR=N8,120,R,TITEL  ALIAS             new name is being introduced

Alpha-numeric, 8 characters, 80 pixels, right-aligned
Numeric, 6 characters, 60 pixels, right-aligned
Decimal, 10 digits, 2 decimal places
Displayed in the form "23.03.98", (left-aligned)
Displayed in the form "08:24"
Displayed in the form "23.03.1998"
Displayed in the form "08:24:39"
Displayed in industrial time unit " 22,982"
TESTHEADER: new column caption

Setting  of  the  background  color  depends  on  whether  the  field
value  reaches  different  threshold  values.  The  entire  row  is
colored because of the threshold value.

ALIAS
AKA=MNR[1..3]=N8,120,R,ARRAY[1..3
]
ALIAS
ATTR=MNR(2)=N8,120,R,PARAMETE
R(2)
ALIAS
U=(R*6.2831)=N10.3,60,L,Scope
ALIAS
SOLLZ={_INT((_DATETIME(|SKDATE|,
|SKZEIE|)-
_DATETIME(|SKDATB|,|SKZEIB|))*864
00)}=hh:mm:ss,60,R,SOLLZ
;target
time of shift
GRID_BROWSEROW=0
GRID_CELLPAINT=ON
GRID_REFRESH=5000

           new identification
KOPIE=
ID in data file
MNR=
Formatting
N8,120,R,
column caption in table
TITEL
The first three characters from MNR are displayed.

The second part separated by „ ; “ is displayed.
Example: „ 12;20;130 “  „20“

Conversion of a value
Syntax: see below
Complex calculations relating to several fields
Syntax: see below

only the active row is colored yellow
Requirements for coloring rows column by column
Cycle  for  updating  the  display  [ms]    lists  are  not  reloaded
from the server!
Recommended  if  a  constantly  changing  value  is  calculated
using an ALIAS function.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 4 of 16

AIP2 - Local Configuration File ctaiplay.ini

Entry

Comment

GRID_POSITION=ON

Display of the grid position

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=WTK:STA
,WTK:STA,0-clGreen|1-clBlue|2-
clYellow|3-clRed

can also be used with index:
EXAMINE_CELLBKCOLOR1..8

Limited/no  support  when  scrolling  using  scroll  bars  and  page
scrolling
One single column is colored in every cell subject to a value.
1st value: ID of the column to be colored.
2nd value: ID of the reference column
3rd value: Configuration (color for possible values)

Notes:

-  The  reference  column  MUST  be  shown  in  the  list,  if

required with length 0

-  The  values  are  converted  into  capital  letters  when  being

EXAMINE_CELLBKCOLOR1..20

compared.

EXAMINE_CELLBKCOLOR=DMY,COL
OR

Take over the color directly from the "color" column.
The column <DMY> is shown in the color defined in the column
<COLOR>

; Definition virt. column(1)
EXAMINE_CELLVALUE1=CV1,REF1,S
=DAT|P=ZEI|A=REST|N=INFO
; Definition virt. column(2)
EXAMINE_CELLVALUE2=CV2,REF2,1
0=MGRP|20=MNR|30=COLOR|40=MS
TTXT

...
; Layout/Position virt. column(1)
CV1=CELLVALUE,150,Z,Data
...
; Layout/Position virt. column(2)
CV2=CELLVALUE,150,Z,M/C/T

GRID_RANDOMSORT=ON

GRID_CLIPBOARD=<BUTTON>@<SE
LECT>@<DATA>
Special entries
[Maschinenliste]
ALIAS StkProMin=IZYSM=
              N8,48,R,Stk/min

Filling  of  a  virtual  "Case"  column  with  values  from  different
columns subject to the value of a reference column.

1rd value:

Identification of the virtual "case" column

2rd value:

Identification of the reference column

3rd value:
Configuration

Reference value + ‚=’ + display column

CV1=CELLVALUE,150,Z,YST

Please  note:  the  virtual  "case"  column  needs  to  be  configured
as follows
<Identifier>=<Key word>,<Width>,<Alignment>,<Caption>
e.g.
This options randomly sorts the list.
Please  note:  If  this  option  is  active,  any  configured  sorting  will
be ignored.
This option copies data from a table/grid into the clipboard.

Activation  of  calculation  &  display  of  the  produced  pieces  per
minute

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 5 of 16

AIP2 - Local Configuration File ctaiplay.ini

Entry

Comment

[layout pze]

Configuration of the PZE terminal

KundenBitmap=kunde.bmp

"Kundenbitmap=<File name>“ file with customer logo
When restarting the terminal, this file is copied from the server
directory ".\ctnet\win\aip2\etc\“ into the application directory
".\etc\“.

„DienstGangTaste=1,3“  Default [ empty ]
By entering the function key numbers (1...4), a check specifying
if the person is allowed to go on a business trip is performed
during the posting.

Configuration of the used font types/font sizes as well as the
layout of the date and time display.

DienstGangTaste=1,3

StdSchrift=Arial
StdDateSize=30
StdStatusSize=26
StdSpdBttnSize=16
InfoSchrift=Courier New
InfoSchriftSize=20
SmallStatusFontSize=16
DateTimeLayout=dd.mm.yyy hh:mm:ss

1.1  Formulas used in grid layout

Simple conversion of a value
Syntax:

 ALIAS <Alias>=(<formula>)=formatting

  <formula>: [1/]<ID>[<Operator><Value2>]

    <ID>: ID from list (The current value from the list is entered here

            in the formula)

<Operator>: + | - | * | / | ^

  <Value2>: 2nd Operand

Extensive formulas:
Formulas that can also relate to several table fields  can be recognized by braces.

 Syntax: ALIAS <Alias>={<Formula>}
 <Formula>: (<Operand1>[<Operator><Operand2>])
 <Operand>: <Value> / <Function> / <Formula> / |KENN|
<Operator>: |+|-|*|/|^|
   <Value>: Constant ('0'..'9','e','E','.','-')
    |Kenn|: reads out a value from the table
<Function>: _<Fname>(<Operand>[,<Operand>[,...]])
           _DATETIME(<Date>,<Time>)

 <Date>: mm/dd/yyyy
  <Time>: ssss (Seconds of the day (0..86400))

             ==> Real value as TDateTime
           _INT(<Operand>)

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 6 of 16

AIP2 - Local Configuration File ctaiplay.ini

             returns a value without decimal places
           _REAL(<Operand>)
             returns a value with decimal places
           _ROUND(<Operand>)
             returns rounded value without decimal places
           _MOD(<Operand1>,<Operand2>)
             ==> Operand1 mod Operand2
           _ABS(<Operand>)
             absolute amount of a figure
           _EXP(<Operand>)
             e raised to the power of X (e: basis of the natural logarithm)
           _LN(<Operand>)
             natural logarithm (Ln(e) = 1)
           _FRAC(<Operand>)
             proportion of decimal places
           _LOG(<Operand1>,<Operand2>)
             LOG(N,X): logarithm to base N of X

     _MAX(<Operand1>,<Operand2>)
             the greater value of two values
           _MIN(<Operand1>,<Operand2>)
             the lesser value of two values
           _SQRT(<Operand>)
             ==> Square root of Operand1
           _PI()
             ==> 3.14151926535...

Examples:

Calculation of the target time of a shift (ZEISS):
ALIAS SOLLZ={_INT((_DATETIME(|SKDATE|,|SKZEIE|)-
_DATETIME(|SKDATB|,|SKZEIB|))*86400)}=hh:mm:ss,60,R,SOLLZ

ALIAS TEST={_INT(|AGR:GUT|/|TLG|)},N3,30,R,Test

ALIAS test1={_LN(2.7182818)}=C8,80,L,Test1

New (V7.2.3.74): Utilization of intermediate variables in ALIAS functions:

ALIAS U_Brutto={|AGR:GUT|+|AGR:AUS|}=N8,40,Z,Brutto

ALIAS U_BPMN={_REAL(60000/|SZY|)*|TLG|}=N8,35,Z,BpmN

ALIAS TK_TEST={|*U_Brutto|+|*U_BPMN|}=N8,35,Z,TK*

Setting  of  the  background  color  depends  on  whether  the  field  value  reaches  different  threshold
values.
Syntax: EXAMINE_CELLBKLEVEL<i>=<Akro>,<Akro_ref>,
                              <Comp1><Val1>*<Col1>|
                              <Comp2><Val2>*<Col2>...
       <i>: Index 1..8
    <Akro>: Identification of the field to be colored
<Akro_ref>: Identification of the reference column
    <Comp>: Limiting characters (<,>,<=,>=)
    <Val1>: Limit value (integer or Real or ID
            of a reference value for comparison purposes)
            alternative: (Akro) – column of limit value
    <Col1>: Color (Delphi name)

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 7 of 16

AIP2 - Local Configuration File ctaiplay.ini

Threshold  values  are  searched  from  the  left  to  the  right.  If  a  "<“  or  a  "<=“  –  criterion  is  met,  the

corresponding color is set and the evaluation/report is finished. If a ">“ or ">=“ criterion is met, it will first

be checked whether or not the condition that follows is also met.

The direct comparison with "=“ is not allowed. But the same function can be achieved by processing the

comparisons relating to "<“..„<=“ or „>“…“>=“.

An  identification  put  in  parentheses  may  also  be  indicated  instead  of  the  limit  value.  During  the

comparison, the current field content including the specified ID is read out from the same row as the limit

value.

All three fields (field to be colored, reference field and limit value field, if required) must be  configured as

fields to be displayed. The field width can be set to zero if one of these fields should not be visible.

The color value clWhite may be entered to prevent sections from being colored.

The values are compared as they are displayed. The actual values 0.5 and 1 are considered being equal

if displayed values are to be rounded to integer values.

Coloring of the field only works if the option "GRID_CELLPAINT=ON“ is set.

The option "GRID_BROWSEROW=0“ should also be set in order for the coloring to be recognized even if

the row is selected.

Examples:
EXAMINE_CELLBKLEVEL1=MNR,MST,<=1*clLime|<=2*clYellow|>2*clRed
EXAMINE_CELLBKLEVEL2=FS,FS,<90*clLime|>=90*clYellow|>=100*clRed
EXAMINE_CELLBKLEVEL3=EGR:GUT,EGR:GUT,<(SGR:GUT)*clLime|>=(SGR:GUT)*clYellow

1.2  Translations in grid layout

Column  contents  can  be  configured  to  be  translated  and  displayed  by  entering  e.g.  the  configuration

<XYZ=T10,100,L>  instead  of  <  XYZ=C10,100,L>  in  the  configured  grid  columns.  A  <#>  character  must

be prefixed for these "resource strings" to provide for better classification. This modification can be used

in every INI file (hytnrcfg.ini,..) where grid layouts are configured.

Please  note:  The  data  do  not  include  any  translated  values.  In  order  for  them  to  be  displayed  in  e.g.

dynamic  dialog  fields,  an  explicit  translation  must  be  performed  using  the  VB  script  function  <

vbsTranslateDataValues( “<columns>“ , “<data row>“ ) >.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 8 of 16

AIP2 - Local Configuration File ctaiplay.ini

Column  contents  can  be  configured  to  be  translated  and  displayed  by  entering  e.g.  the  configuration

<PSPERRE=U1,100,L> instead of <PSPERRE=C1,100,L> in the configured grid columns. The entry for

the "resource string" that depends on the field has the following structure:

„#<Acronym>#<Value>“

e.g.

„#PSPERRE#J“

"production lock enabled“

„#PSPERRE#N“

„ “

(blank character)

This modification can be used in every INI file (hytnrcfg.ini,..) where grid layouts are configured.

Please  note:  The  data  do  not  include  any  translated  values.  In  order  for  them  to  be  displayed  in  e.g.

dynamic  dialog  fields,  an  explicit  translation  must  be  performed  using  the  VB  script  function

vbsTranslateDataFields( “<columns>“ , “<data row>“ ) >.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 9 of 16

1.3  Table of color values

AIP2 - Local Configuration File ctaiplay.ini

Farbe

Name

clWhite

clBlack

clBlue

clLime

clRed

clYellow

clFuchsia

clAqua

clOrange

Color value

$FFFFFF

$000000

$FF0000

$00FF00

$0000FF

$00FFFF

$FF00FF

$FFFF00

$0080FF

$8000FF

$FF8000

$FF0080

$80FF00

$00FF80

$808080

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 10 of 16

AIP2 - Local Configuration File ctaiplay.ini

1.4  Modifications to GRID configuration / clipboard

The AIP2 provides for the configuration of copying values from the table into the clipboard.

Data can be copied into the clipboard using the shortcut "Ctrl + C", by right clicking with the mouse or an

optionally configured button.

The copied values are transmitted as string in the internal format.

-

-

-

-

Date columns as "MM/DD/YYYY“

Time in "seconds after midnight"

Durations in "seconds"

Quantities with a dot as decimal separator

Data is copied including a  header into the clipboard. The columns of the header and the corresponding

values are separated by <TAB>. Lines are completed with <CR> <LF>.

The configuration is as follows:

GRID_CLIPBOARD=<BUTTON>@<SELECT>@<DATA>@<HEADER>

<BUTTON>

Optionally, using "Y" a button can be shown in the top right margin of the table. This
button copies the selected data into the clipboard.

<SELECT>

Optional configuration of one or several selection criteria. Selection criteria are separated
and/or linked with "|“.

GRID_CLIPBOARD=..@SELECT=X|*@..

The default selection criterion is "X“ (e.g. @SELECT@ becomes @SELECT=X@ )

<DATA>

The data to be copied into the clipboard can be configured here.

-
-
-

<ALL>
<VISIBLE>
<COL1|COL2|COL3|…>

All columns of the line
Visible columns (Pixel>0)
configured columns

For the configuration options <ALL> + <VISIBLE> the selection column is removed
automatically from the columns to be copied if only one selection criterion is indicated.

In case no selection criterion is stated, the selected line is copied into the clipboard
according to configuration.

<HEADER>

As of CTAIP V# 2.0.3.35 "N" can be used to prevent the header from being displayed in
the clipboard.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 11 of 16

The following example shows the machine status list including multiple selection and copy button for the

clipboard.

AIP2 - Local Configuration File ctaiplay.ini

Fig. Configuration with button (red arrow) and multiple selection

[Maschinenstatusliste]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CLIPBOARD=Y@KSTART=X|*@KSTART|MNR|MST|MSTTXT
GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=KSTART,KSTART,X-clLime|*-clAqua

ALIAS LEER1=(DUMMY1)=C1,10,L
KSTART=C1,30,Z,*
MST=N8,60,R,
DUMMY=C3,10,R
MSTTXT=C70,150,L,Status
ALIAS LEER2=(DUMMY2)=C1,475,L

The data selected in the screenshot have been copied into Excel using the above-described
configuration for the clipboard.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 12 of 16

AIP2 - Local Configuration File ctaiplay.ini

The modified configuration

[Maschinenstatusliste]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CLIPBOARD=@@<VISIBLE>

ALIAS LEER1=(DUMMY1)=C1,10,L
MST=N8,60,R,
DUMMY=C3,10,R
MSTTXT=C70,150,L,Status
ALIAS LEER2=(DUMMY2)=C1,475,L

copies data of visible columns (pixel > 0) of the selected line into the clipboard

1.5  Configuration of basic screens

The  dialogs/screens  are  configured  using  dynamic  dialogs.  For  this  reason,  the  following  dialogs  are

always required:

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 13 of 16

MMINFO  Section referring to machines in the single machine view

MAINFO  Section referring to orders in the single machine view

AIP2 - Local Configuration File ctaiplay.ini

MINFO  Description of the machine information

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 14 of 16

AINFO  Description of the order information

AIP2 - Local Configuration File ctaiplay.ini

The heights of the individual components of the basic screens and, as a result, the positions of the button

bar are configured in the ctaiplay.ini file using the below-mentioned parameters:

Section [MainView1]

MachineGridHeight=415
OrderGridHeight=500
ButtonBarHeight=50

Section [MainView2]

MachineGridHeight=50
MachineInfoHeight=415
OrderInfoHeight=355
ButtonBarHeight=50

Configuration of the basic screen

Height configuration of components for the basic screen (machines,
order grid, button bar)
The  configured  heights  are  scaled
the  current  height.
Consequently, the total sum of entered heights does not play a role.
Configuration of the single machine view

to

Single-row grid to select the machine
Information on the machine
Information on the order
Height of both button bars
The  configured  heights  are  scaled
the  current  height.
Consequently, the total sum of entered heights does not play a role.

to

1.5.1  Available fields for the dialog configuration of basic

screens

A script function completing the fields according to the customer's requirements is not available .

In  general,  the  fields  of  the  machine  list  and  the  order  list  are  available.  "MNR."  or  "ANR."  must  be

prefixed for identification purposes.

Known quantity fields are formatted to match the configured number of decimal places.

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 15 of 16

AIP2 - Local Configuration File ctaiplay.ini

Some fields are calculated. The following fields are additionally available:

Identification

Description

ANR.SOLL_SEIT

Target quantity since login

The  value  is  determined  locally  at  the  terminal.  This  is  only  useful  for  MDE

machines.  However,  the  order  must  be  logged  on  locally  after  restarting  the

terminal.

ANR.ABWEICH

Deviation [%]

Comparison of "target quantity since logon" and "actual quantity since logon“

MNR.SZY

Target cycle

Field  is  transferred  including  "internal  decimal  places".  The  number  of

characters displayed is determined by the field of the dialog configuration.

MDE.IZY

Actual cycle

The machine's current actual cycle  - only if MDE processing is active for the

machine at this terminal.

MNR.MSZEIB

Start time of the current status

MNR.MSDATB

Start time of the current status

MNR.MSDAUER

Duration of the current status

ANR.BEARBZ

Planned duration

MNR.MSTTXT

Status text

MNR.TLG

Partitioning

Calculated based on the orders running at the machine.

ANR.FERTIG

Progress bar

TNRPSPERRE

Translated text for the production lock

(corresponds  to  the  configuration  "TNRPSPERRE=U1,150,L,Hinweis“  in

ctaiplay.ini)

(the value J/N from the list can be found in MNR.TNRPSPERRE)

AIP2_Configuration_ctaiplay.docx

Version: 1.5.22161

Page 16 of 16

