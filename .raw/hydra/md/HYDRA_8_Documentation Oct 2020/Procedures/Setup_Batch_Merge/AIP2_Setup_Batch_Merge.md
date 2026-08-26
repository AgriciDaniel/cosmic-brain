Configurations for Merging Batches in the AIP

1  Configurations for Merging Batches in the AIP

Usage

You  use the function  to merge several  batches into  one batch at  the  AIP terminal.  Subject to the batch

type, batches may be merged in the following ways:

  Merging simple batches and/or their quantities to one batch

  Merging  individual  batches  belonging  to  an  already  existing  merged  batch  to  one  new  merged

batch

Dialog configuration

Dialog configuration (CNR.SUMMARIZE)

Define the function key "pool batches" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and the key

"BDE comments". Then the following entries must be changed in the configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page3]

…

2=BATCH_MERGE,L,Lose zusammenfassen,Lose_zusammenfassen.png

AIP2_Setup_Batch_Merge.docx

Version: 1.0.5203

Page 1 of 3

Configurations for Merging Batches in the AIP

The  sections  [BATCH_MERGE]  and  [DOC_BATCH_MERGE.LST]  and  [ATTR_BATCH_MERGE.LST]

are required for the layout configuration of ctaiplay.ini, irrespective of the used design:

[BATCH_MERGE]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

EXAMINE_SCANEXPR1=SLOS=J

EXAMINE_SCANCOLOR1=clBlue

DLL=C20,150,Z,batch

ATK=C20,150,L,article

SGR:REST=N12.0,100,R,quantity

EINH=C3,60,Z,unit

[DOC_BATCH_MERGE.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

LINK=C20,400,L,link/document

[ATTR_BATCH_MERGE.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

;GRID_ORDER=DAT=-|ZEI=-|SNR

ATTR=C20,100,L,attribute

VALUE=C20,80,L,value

AIP2_Setup_Batch_Merge.docx

Version: 1.0.5203

Page 2 of 3

Configurations for Merging Batches in the AIP

EINH=C20,60,L,unit

TEXT=C20,200,L,text

System configuration

Further system configurations are not required in order to merge batches.

AIP2_Setup_Batch_Merge.docx

Version: 1.0.5203

Page 3 of 3

