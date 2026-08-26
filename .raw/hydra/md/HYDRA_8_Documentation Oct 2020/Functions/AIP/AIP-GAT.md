Composition - AIP

1  Composition - AIP

Definition (source: http://de.wikipedia.org/wiki/Gattierung )

In  foundry,  composition  (optimization  of  composition)  means  the  make-up  of  foundry  material  that  is

melted down in the melting furnace. Composition is necessary to achieve an as exact chemical make-up

of  the  cast  material  as  possible  without  having  to  add  many  ingredients.  The  result  is  kept  in  a

composition list acting as a bill of material.

However, it is required to have detailed knowledge about the chemical analysis of the raw materials, i.e.

normally  pig  iron,  steel  scrap  and  recycled  material.  Based  on  this  analysis,  it  is  calculated  in  which

proportion they have to be put into the furnace to achieve the required characteristics of the material.

Composition has to be optimized if the charge make-up is to be performed in a cost-effective manner. To

do  so,  the  required  quantities  of  the  raw  materials,  such  as  steel  scrap  or  pig  iron  are  calculated  using

mathematical procedures in order to achieve the required characteristics of the material by combining the

raw  materials  as  economically  as  possible.  Therefore,  an  exact  chemical  analysis  of  raw  materials  is

required.  The  mathematical  calculation  is  performed  using  specialized  computer  software  for  the

optimization of composition.

AIP-GAT.docx

Version: 1.1.18468

Page 1 of 6

Composition - AIP

1.1  Perform charging

The dialog "perform charging" shows the current list of materials the furnace is fed with. The list includes

the planned, reserved and already fed quantities as well as the required remaining quantities.

The quantities can be edited here.

Figure: Perform charging – C_CHPF

Data from the selected row are entered in the below input fields

The button "post" prompts posting of the material in the machine's input buffer. Then the list is reloaded.

For this purpose, the terminal needs to be connected online with the HYDRA server.

The dialog remains opened until the button "cancel" is clicked.

The  list  does  not  show  the  material  that  has  already  been  confirmed  by  the  dialog  "confirm  charging".

Consequently,  the  list  of  the  dialog  "perform  charging"  is  empty  directly  after  finishing  the  charging

process.  Unplanned  material  may  also  be  added  to  the  dialog  "perform  charging".  This material  is  then

shown in the list.

AIP-GAT.docx

Version: 1.1.18468

Page 2 of 6

1.2  Confirm charging

The  current  list  of  materials  is  shown  again  to  confirm  charging.  Besides  the  badge  number,  no  further

input is required.

Composition - AIP

Figure: Confirm charging – C_CHCF

Once  confirmed,  the  materials  from  the  input  buffer  are  posted  onto  the  machine's  output  buffer.  The

reservation of remaining quantities of materials reserved for the charging order is cancelled.

AIP-GAT.docx

Version: 1.1.18468

Page 3 of 6

1.4  Take sample

A sample is taken to check the actual composition of the melt.

Composition - AIP

Figure: Take sample – C_CHTS

Using this dialog, a sample number is assigned  by the HYDRA server and returned as the result to the

terminal. A label that includes the sample number is printed. Consequently, the relevant label has to be

configured and assigned to the dialog C_CHTS.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

AIP-GAT.docx

Version: 1.1.18468

Page 4 of 6

1.5  Cast

Casting means to withdraw a (partial) quantity from the melt.

Composition - AIP

Figure: Casting – C_CHCA

The  withdrawn  quantity  and  the  target  buffer  to  which  this  quantity  is  posted  are  entered  in  this  dialog.

The terminal determines the batch number automatically, provided that the "automatic generation of the

batch number" has been enabled in the "MPL" tab of the workplace configuration.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

AIP-GAT.docx

Version: 1.1.18468

Page 5 of 6

1.6  Implementation / configuration

The dialogs C_CHPF, C_CHCF, C_CHTS and C_CHCA have to be available at the terminal. The buttons

in ctaipbut.ini are configured by using the same IDs:

Composition - AIP

1=C_CHPF,R,perform charging
2=C_CHCF,R,confirm charging
3=C_CHTS,R,take sample
4=C_CHCA,R,cast

The section [charge list] is required in the layout configuration of ctaiplay.ini:

[charge list]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite

MAT_VIS=C25,80,L
MATBEZ_VIS=C30,115,L
SOLL_MENGE_VIS=N12.3,78,R,target quantity
EINH=C3,40,L
RES_MENGE_VIS=N12.3,78,R,remaining quantity
VERBR_MENGE_VIS=N12.3,78,R,delivered quantity
MATPUF=C30,80,L
MATPUF_MENGE=N12.3,78,R,remaining quantity
EMAT_MENGE_VIS=N12.3,78,R,input buffer

Further configuration details are described in the relevant procedure for composition functions.

AIP-GAT.docx

Version: 1.1.18468

Page 6 of 6

