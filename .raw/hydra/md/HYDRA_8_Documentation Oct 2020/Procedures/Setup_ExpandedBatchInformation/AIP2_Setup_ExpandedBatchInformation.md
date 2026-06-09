Additional Batch Information

1  Additional Batch Information

Usage

You use the function to view information about a batch in the AIP terminal. Additional batch  information

include:

  General batch information

  Quantities

  Batch attributes

  Alternative batch numbers

Dialog configuration

Dialog configuration (LOS_INFOS)

Define the function key "batch information" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and the

key "BDE comments". Then the following entries must be changed in the configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page3]

1=LOS_INFOS,L,Losinformation,Shipping Box Closed Information.png

AIP2_Setup_ExpandedBatchInformation.docxVersion: 1.0.5205

Page 1 of 3

The sections [LOS_INFOS_ATTR.LST] and [LOS_INFOS_QUA.LST] and [LOS_INFOS_ALTER.LST] are

required for the layout configuration of ctaiplay.ini, irrespective of the used design.

Additional Batch Information

[LOS_INFOS_ATTR.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

KENNUNG=C20,100,L,attribute

ATTR_VAL=C20,80,L,Value

EINH=C20,80,L,unit

TXT=C20,80,L,

MATTYP=C40,140,

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

AIP2_Setup_ExpandedBatchInformation.docxVersion: 1.0.5205

Page 2 of 3

Additional Batch Information

[LOS_INFOS_ALTER.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

ALT=C20,100,L,

CNR=C20,200,L,

System configuration

Further system configurations are not required in order to display additional batch information.

AIP2_Setup_ExpandedBatchInformation.docxVersion: 1.0.5205

Page 3 of 3

