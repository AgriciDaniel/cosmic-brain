Batch Grouping
1 Batch Grouping
Usage
You make use of the function to use several batches of a group within the process at AIP.
Dialog configuration
Dialog configuration (BATCH_GROUP_B)
Define the AIP function keys in the file ctaipbut.ini:
[ANR-LN-Page4]
…
3=BATCH_GROUP_B,L,Losgruppenbildung,Losgruppierung.png
The section [BATCH_GROUP_B.LST] is required in the layout configuration of ctaiplay.ini:
[BATCH_GROUP_B.LST]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
CNR=C20,100,L,
ATK=C20,100,L,
ATKBEZ=C40,140,
HZTYP=C40,150,L,
RESANR=C12,100,L,Operation
System configuration
Further system configurations are not required to group batches.
An appropriate OP has to be available in the system to be able to use the batches in the dialog
and in order for an OP to be logged on in the background.
The relevant OP can be determined by:
Setup_BatchGroupingV2.docx Version: 1.0.1362 Page 1 of 2

|     |     |     | Batch Grouping  |
| --- | --- | --- | --------------- |

o  a special batch reservation (affecting several orders)
o  the order network (sequence of OPs in an order)

| Setup_BatchGroupingV2.docx  |     | Version: 1.0.1362  | Page 2 of 2  |
| --------------------------- | --- | ------------------ | ------------ |