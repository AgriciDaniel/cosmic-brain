Configuration of Discrete Consumption Input

1  Configuration of Discrete Consumption Input



Summary

Material  consumption  can  be  entered  at  the  AIP  shop  floor  terminal  while  an  operation  is  being

interrupted, while an operation is being logged off or when entering a partial confirmation/upload

System configuration

The  relevant  utilization  material  must  be  assigned  to  the  operation  in  order  to  discretely  record

consumption. The meaning of  the following fields must be observed  in particular (logical consideration).

The material components can be assigned in HYDRA manually (Order management: edit components) or

from the upper level system

Material number

The material number uniquely identifies a material. In the component list, a material is only unique

in association with a BOM item.

BOM item

The BOM item combined with the material number forms a unique key for a material component at

an operation.

Material designation

The material designation is used to describe a material more exactly. It functions as commentary

and is displayed in the input dialog.

Material category (type)

The material category controls, among other things, the  way a material is technically processed in

the  HYDRA  system.  Relating  to  the  material  consumption  input  (not  batch-related),  the  following

value is important:

"M"   Material component, should be entered in terms of consumption

Material type

The material type is another parameter used for processing control in HYDRA. The material type is

used  to  control  whether  goods  movement  created  from  the  material  consumption  should  be

uploaded  to  the  ERP  system  or  not.  Unless  defined  otherwise  assign  the  material  type  SYSTEM

here.

To assure that a goods issue is uploaded via the interface, the option "Transfer to interface"  must

be set at the material type that the utilization material is based on.

Setup_DiscreteConsumptionInput.docx

Version:

Page 1 of 3

Configuration of Discrete Consumption Input

When  launching  HYDRA  for  the  first  time  or  during  discrete  consumption  input,  it  will  need  to  be

coordinated  whether  or  for  which  material  components  consumption  should  be  uploaded  to  the

ERP  system.  If  the  MPL  module  is  not  used,  this  configuration  is  to  be  made  during  the  HYDRA

customizing process.

Consumption type

Set  the  consumption  type  to  "D"  (discrete  consumption  input)  for  material  components  that  this

function is used for to collect material consumption.

It is  possible to transfer the consumption type using  the relevant component segment of

the ERP interface (EIS-ERP). When using the HYINFO interface as a part of the PP-PDC

interface, the consumption type is made available by customizing the system accordingly.

The interface necessary to upload material consumption is not a part of this function.

Input quantity

The  input  quantity  is  a  component  quantity  needed  to  manufacture  one  unit  (one  piece,  for

example) of the output material (article/item) being produced. It is used to calculate the theoretical

material consumption based on the produced quantity.

Unit

Quantity unit of the material component in which material consumption is recorded.

Dialog configuration

In addition to making the necessary programs available, please also consider the following:

  Activate the dynamic dialog A_VERB, accounting for existing terminal groups in some cases



Integrate the button used to call up the consumption input dialog in the relevant posting dialogs. The

following configurations are possible here, whereas a) can be seen as an alternative to b) and c):

a.

Integration

into

the

workflow

step

WF_AA_QUA.

The button is found in the standard dialogs

  Interrupt OP (A_UN),

  Log off OP (A_AB), and

  Partial confirmation/upload (A_TR)

  in each workflow step in which quantities are entered manually.

b.

Integration

into

the

workflow

dialog

WF_AUN_CHK

The  button  is  available  in  the  standard  dialog  Interrupt  OP  (A_UN)  in  the  confirmation

workflow step.

c.

Integration

into

the

workflow

dialog

WF_AAB_CHK

The  button  is  available  in  the  standard  dialog  Log  off  OP  (A_AB)  in  the  confirmation

workflow step.



Integrating or checking the grid configuration for the dialog A_VERB (ctaiplay.ini)

Setup_DiscreteConsumptionInput.docx

Version:

Page 2 of 3

  Optional: Uploading the material consumption as goods movement

Configuration of Discrete Consumption Input

  Determining  which material type  is transferred to the material component from the ERP

system (typically SYSTEM)

  Setting the flag "Transfer to interface" at the material type. Options:

  Directly via the master data configuration (only possible, if MPL/ TRT is active)

  Per

SQL

to

the

HYDRA

server

(hysql

-r

-):

update hz_typen set we_ext_kz = 'J' where hz_typ = 'SYSTEM';

  Per SQL via the SQL tester in MOC:

 update  hz_typen  set  we_ext_kz  =  'J'

where hz_typ = 'SYSTEM'

  Per BAPI to the HYDRA server (Observe system!):

hymwb -u9999 -

c"DLG=MATTYP.UPDATE|MATTYP.MATTYP=SYSTEM|MATTYP.WEEXT:GEN

=J|DAT=today|ZEI=now|"

  Check per SQL: select hz_typ, we_ext_kz from hz_typen

  Activate the material upload interface (see relevant documentation).

Setup_DiscreteConsumptionInput.docx

Version:

Page 3 of 3

