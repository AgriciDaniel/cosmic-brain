Grouping of Batches

1  Grouping of Batches

Usage

The function is used to apply several batches of a group in AIP processes.

Dialog configuration

Dialog configuration (BATCH_GROUP_B)

Define the function key "generate batch group" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and

the key "BDE comments". Then the following entries must be changed in the configuration of the copied

key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page4]

…

3=BATCH_GROUP_B,L,Losgruppenbildung,Losgruppierung.png

The  below-mentioned  section  is  required  in  the  layout  configuration  of  ctaiplay.ini,  irrespective  of  the

used design:

[BATCH_GROUP_B.LST]

GRID_FONT=Arial

AIP2_Setup_BatchGroupingV2.docx

Version: 1.0.5201

Page 1 of 2

Grouping of Batches

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,

ATK=C20,100,L,

ATKBEZ=C40,140,

HZTYP=C40,150,L,

RESANR=C12,100,L,Operation

System configuration

Further system configurations are not required in order to group batches.

An appropriate OP must exist in the system to be able to use the batches in the dialog and in

order for an OP to be logged on in the background.

The relevant OP can be identified via:

o  a special batch reservation (across all orders)

o

the order network (sequence of OPs in an order)

AIP2_Setup_BatchGroupingV2.docx

Version: 1.0.5201

Page 2 of 2

