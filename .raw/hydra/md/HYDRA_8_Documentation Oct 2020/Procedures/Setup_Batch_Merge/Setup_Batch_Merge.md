Merge Batches at AIP

1  Merge Batches at AIP

Usage

You use the function  to merge several batches to one batch at  AIP.  Subject  to  the batch type, batches

may be merged in the following ways:

  Merging simple batches and/or their quantities to one batch

  Merging  individual  batches  pertaining  to  an  already  existing  merged  batch  to  one  new  merged

batch

Dialog configuration

Dialog configuration (CNR.SUMMARIZE)

Define the AIP function keys in the file ctaipbut.ini:

[ANR-LN-Page3]

…

2=BATCH_MERGE,L,Lose zusammenfassen,Lose_zusammenfassen.png

The  sections  [BATCH_MERGE]  and  [DOC_BATCH_MERGE.LST]  and  [ATTR_BATCH_MERGE.LST]

are required in the layout configuration of ctaiplay.ini:

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

Setup_Batch_Merge.docx

Version: 1.0.579

Page 1 of 2

Merge Batches at AIP

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

EINH=C20,60,L,unit

TEXT=C20,200,L,text

System configuration

Further system configurations are not required to group batches.

Setup_Batch_Merge.docx

Version: 1.0.579

Page 2 of 2

