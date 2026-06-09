Advanced Batch Information

1  Advanced Batch Information

Usage

You  use  the  function  to  view  information  on  a  batch  at  the  AIP  terminal.  Advanced  batch  information

includes:

  General batch information

  Quantities

  Batch attributes

  Alternative batch numbers

Dialog configuration

Dialog configuration (LOS_INFOS)

Define the AIP function key in the file ctaipbut.ini:

[ANR-LN-Page3]

1=LOS_INFOS,L,Losinformation,Shipping Box Closed Information.png

The sections [LOS_INFOS_ATTR.LST] and [LOS_INFOS_QUA.LST] and [LOS_INFOS_ALTER.LST] are

required in the layout configuration of ctaiplay.ini:

[LOS_INFOS_ATTR.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

KENNUNG=C20,100,L,Attribute

ATTR_VAL=C20,80,L,Value

EINH=C20,80,L,Unit

TXT=C20,80,L,

MATTYP=C40,140,

Setup_ExpandedBatchInformation.docx

Version:

Page 1 of 2

Advanced Batch Information

[LOS_INFOS_QUA.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

KENN=C20,100,L,

ALIAS LEER1=(DUMMY1)=C1,30,L

MENGE=C20,80,R,

EINH=C4,40,R,

ALIAS LEER2=(DUMMY1)=C1,30,L

REST=C20,80,R,

[LOS_INFOS_ALTER.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

ALT=C20,100,L,

CNR=C20,200,L,

System configuration

Further system configurations are not required to display advanced batch information.

Setup_ExpandedBatchInformation.docx

Version:

Page 2 of 2

