Splitting Batches at AIP

1  Splitting Batches at AIP

Usage

You use the function to split up a  batch into several batches at AIP.  Subject to the batch type, batches

may be split in the following ways:

  Splitting off quantities into individual batches

  Splitting off individual batches from existing merged batches into a new merged batch

Dialog configuration

Dialog configuration (CNR.SPLIT)

Define the AIP function keys in the file ctaipbut.ini:

[ANR-LN-Page3]

…

3=BATCH_INFO,L,Los splitten,Los_splitten.png

The  sections  [BATCH_S_SPLIT]  and  [BATCH_SPLIT]  are  required  in  the  layout  configuration  of

ctaiplay.ini:

[BATCH_S_SPLIT]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=SELECT,SELECT,X-clLime

SELECT=C1,50,Z,*

DLL=C20,150,Z,batch

ATK=C20,150,L,article

SGR:REST=N12.0,100,R,quantity

Setup_Batch_Split.docx

Version: 1.0.1362

Page 1 of 2

Splitting Batches at AIP

EINH=C3,60,Z,unit

;CKL=C1,150,Z,class

[BATCH_SPLIT]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=CKL,CKL,G-clLime|A-clRed|N-clBlue|O-clYellow

EGR=N12.3,250,R,quantity

CKL=C1,150,Z,class

EGG=C4,100,Z,reason

System configuration

Further system configurations are not required to split batches.

Setup_Batch_Split.docx

Version: 1.0.1362

Page 2 of 2

