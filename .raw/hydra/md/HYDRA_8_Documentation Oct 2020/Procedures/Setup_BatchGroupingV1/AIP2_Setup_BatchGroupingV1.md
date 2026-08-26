Create / Cancel Group Batch

1  Create / Cancel Group Batch

Usage

The function can be used to combine several batches into a group of batches at the AIP terminal and to

cancel this grouping at a later point in time.

Dialog configuration

Dialog configuration (CNR.BATCH_GROUP_A)

AIP2_Setup_BatchGroupingV1.docx

Version: 1.0.5199

Page 1 of 4

Define the function keys "generate group of batches" and "cancel group of batches" by copying the layout

gui\l_anr.xml  to  gui\l_anr_ln.xml  and  by  copying  twice  the  key  "BDE  comments".  Then  the  following

entries must be changed in the configuration of the copied keys:

Create / Cancel Group Batch

If you do not use tiles for the AIP2, define the function keys in the file ctaipbut.ini:

[ANR-LN-Page4]

…

1=BATCH_GROUP_A,L,Gruppenlos bilden,Losgruppe_bilden.png

2=BATCH_GROUP_C,L,Gruppenlos aufloesen,Losgruppe_aufloesen.png

AIP2_Setup_BatchGroupingV1.docx

Version: 1.0.5199

Page 2 of 4

The  sections  [BATCH_GROUP_A.LST]  and  [BATCH_GROUP_C.LST]  are  required  in  the  layout

configuration of ctaiplay.ini, irrespective of the used design:

Create / Cancel Group Batch

[BATCH_GROUP_A.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,Batch

ATK=C20,100,L,Material

ATKBEZ=C40,140,Designation

HZTYP=C40,150,L,Material Type

RESAUNR=C12,100,L,Order

RESAGNR=C4,50,L,OP

; for set then position

;U_POSITION=C8,60,R,Position

[BATCH_GROUP_C.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,Batch

ATK=C20,100,L,Material

ATKBEZ=C40,140,Designation

HZTYP=C40,150,L,Material Type

RESAUNR=C12,100,L,Order

RESAGNR=C4,50,L,OP

; for set then position

;U_POSITION=C8,60,R,Position

AIP2_Setup_BatchGroupingV1.docx

Version: 1.0.5199

Page 3 of 4

System configuration

Further system configurations are not required in order to group/cancel batches.

Create / Cancel Group Batch

AIP2_Setup_BatchGroupingV1.docx

Version: 1.0.5199

Page 4 of 4

