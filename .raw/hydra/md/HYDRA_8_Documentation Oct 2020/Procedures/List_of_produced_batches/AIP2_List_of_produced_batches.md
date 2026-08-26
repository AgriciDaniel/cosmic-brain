Settings for List of Produced Output Batches

1  Settings for List of Produced Output Batches

Activation at the machine

For the purpose of activating the list of produced output batches in the basic screen of the terminal, the

display of the third list of the machine to be activated has to be activated in the  machine master record

(Workplace configuration  Entry  Display 3rd list).

Definition of the Number of Entries in the List

The number of entries in the list may be customized by extending the data provision for the machine list

(mnr.lst)  at  the  terminal  on  the  server  side  (extended  customizing).  For  this  purpose,  the  additional

column "MNR.NUMBER_OF_BATCHES" has to be provided at the server.

Customization of Visible Columns in the List

The list contents can be configured in section [ MNR_AMAT.LST ] of the file ctaiplay.ini.

Example:

CTAIPLAY.INI

[ MNR_AMAT.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=ROW.IDX=-
GRID_CAPTION=Produzierte Ausgangslose

EXAMINE_SCANEXPR1=KLASSE=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=KLASSE=A
EXAMINE_SCANCOLOR2=clRed

; ROW.IDX=N10,50,R,Row
CNR=C20,150,L,Losnummer
;CNR=*CNR,Los
ATK=C25,125,L,Artikel
; ATK=*ATK
; KLASSE=C3,40,Z,*
MENGE=N12.0,70,R,Menge
EINH=C3,30,Z,ME
DAT=dd.mm.yyyy,70,L,Datum
ZEI=hh:mm:ss,60,L,Zeit
ATKBEZ=C30,200,L,Artikelbezeichnung

AIP2_List_of_produced_batches.docx

Version: 1.0.18468

Page 1 of 2

Settings for List of Produced Output Batches

Configuration of Server-Based Comparison

The  server-based  comparison  is  activated  by  an  entry  in  the  customer-specific  configuration  file

"ctwinlisten.ini".  As  with  hytnrcfg.ini,  this  file  can  be  maintained  both  globally  (for  all  terminals),  on  a

terminal group level, and on terminal level.

Activation is effected by entering a LOADCYCLE larger than 0 (seconds).

CTLISTEN.INI

[#LIST#TNR-ALOSE]
LOADCYCLE=900

The  prerequisite  for  the  server  comparison  is  the  default  configuration  file  "ctlisten.cfg",  which  contains

the application-specific configurations of the server list.

CTLISTEN.CFG

[#LIST#TNR-ALOSE]
CMD=DLG=LIST;13|MOD=P|
LOADCYCLE=0
QUEUEEMPTY=TRUE
FORCENOTIFY=TRUE

; (Default <ANZ=250>)

AIP2_List_of_produced_batches.docx

Version: 1.0.18468

Page 2 of 2

