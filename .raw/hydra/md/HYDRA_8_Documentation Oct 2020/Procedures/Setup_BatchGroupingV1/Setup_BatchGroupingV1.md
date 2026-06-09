Create/Cancel Group Batch

1  Create/Cancel Group Batch

Usage

The function can be  used to combine several batches to a group batch at the  AIP and to cancel it at a

later point in time.

Dialog configuration

Dialog configuration (CNR.BATCH_GROUP_A)

Define the AIP function keys in the file ctaipbut.ini:

[ANR-LN-Page4]

…

1=BATCH_GROUP_A,L,Gruppenlos bilden,Losgruppe_bilden.png

2=BATCH_GROUP_C,L,Gruppenlos aufloesen,Losgruppe_aufloesen.png

The  sections  [BATCH_GROUP_A.LST]  and  [BATCH_GROUP_C.LST]  are  required  in  the  layout

configuration of ctaiplay.ini:

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

Setup_BatchGroupingV1.docx

Version: 1.0.577

Page 1 of 2

Create/Cancel Group Batch

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

System configuration

Further system configurations are not required to group/cancel batches.

Setup_BatchGroupingV1.docx

Version: 1.0.577

Page 2 of 2

