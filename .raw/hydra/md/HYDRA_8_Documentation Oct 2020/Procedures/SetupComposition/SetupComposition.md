Setup of Composition

1  Setup of Composition

Usage

You  use  the  "composition"  application  to  control  planning,  monitoring  and  execution  of  the  melting

process.

The sections that follow describe how to configure composition functions.

General

Composition always uses unique units of weight ("kg", "KG", "t"). Consequently, the target quantity unit of

charging orders is identical to the unit of weight of input materials in the batch stock.

Basic configuration

Please proceed as follows if the composition function is installed on an already existing HYDRA 8 system:

1.  Enable the patch dbp_mpl_composition as follows:

a.  UNIX  systems  (run  at  server  prompt  within

the  HYDRA  directory):  hydscr.out

db_sql/dbp_mpl_composition.hsc

b.  Windows  systems  (run  in  a  DOS  window  within  the  HYDRA  directory):  hydscr.exe

db_sql/dbp_mpl_composition.hsc

2.  Check the patch output

3.  Save the existing dialog configuration:

a.  UNIX  systems  (run  at  the  server  prompt  in  the  HYDRA  directory):  hydlgcfg.out

DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

b.  Windows  systems  (run  in  a  DOS  window  within  the  HYDRA  directory):  hydlgcfg.exe

DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%% DATEI=dialog.dlg

4.  Now load the new dialog configurations by the following command:

a.  UNIX systems:

hymw.out -u9999 -b db_sql/aip_gat.dlg

b.  Windows systems:

hymw.exe -u9999 -b db_sql\aip_gat.dlg

Now the dialogs C_CHPF, C_CHCF, C_CHTS, C_CHCA  are imported as template (with type "DEF“

and dialog user "999“) or, if necessary, existing dialogs are updated.

5.  Copy the dialogs C_CHPF, C_CHCF, C_CHTS, C_CHCA from the template (type "DEF" with dialog

user "999") to type "DEF" and dialog user "0" using the MOC application: system administration  -->

terminals --> dynamic dialogs (transaction code ddconf). To do so, switch to the HYDRA Professional

Mode.

6.  Enable the new dynamic dialogs:

SetupComposition.docx

Version: 1.5.18468

Page 1 of 7

Setup of Composition

a.  UNIX systems:

hydialog.scr AIPTNR 0

b.  Windows systems:

sh.exe hydialog.scr AIPTNR 0

Please note: This command enables the default dialogs. Provided that dialogs specific to

the terminal are used on the system, they need to be modified by an MPDV consultant.

Basic parameter settings

Enable the option "Automatic generation of batch no. when creating batches" in the MPL tab of the basic

settings in MOC (system administration --> system settings --> basic settings).

Configuration: INI configuration

The below-mentioned settings entered in the INI configuration "MPL" within the section "COMPOSITION“

affect calculation of the average material price for composition within the material master:

Key

Value

Comment

FIELD_SUM_CONSUMPTION

ist_lst_01

DB field for sum of consumption in order status

(Sum of consumption)

FIELD_SUM_TOTAL_PRICE

ist_lst_02

DB field for sum of the total price in order status

(Total price for all component entries)

CALCAVG_BEGIN_DAYS

10

Begin  date  (=  today  -  <value>)  for  calculation  of  the

average price

CALCAVG_END_DAYS

5

End  date  (=  today  -  <value>)  for  calculation  of  the

average price

The following conditions need to apply:

-  CALCAVG_BEGIN_DAYS >= CALCAVG_END_DAYS >= 0

-  Valid  columns  of  the  order  status  (table  auftrag_status)  have  to  be  indicated  for  the  fields

FIELD_SUM_CONSUMPTION and FIELD_SUM_TOTAL_PRICE.

Please note:

-  The  configured  columns  (ist_lst_01  and  ist_lst_02)  are  calculated  when  finishing  the  charging

order.

-  The ini configuration is not enabled by default.

SetupComposition.docx

Version: 1.5.18468

Page 2 of 7

Scheduler configuration

Enter  the  following  values  in  MOC  System  administration  System  settings  Scheduler  in  order  to

calculate average values or material costs and to complete inspection requests for finished orders:

Setup of Composition

Type

Alterable

Type

Visible

Active

S – Standard

Yes

F -  Fixed

Visible

 Active

HYDRA user

0

Command

sh.exe hycompupd.scr (Windows)

hycompupd.scr (Unix)

Comment

Composition tool

Fixed point in time

Hour: 0

Minute: 30

Configuration of units

Create the unit "%“ (if it does not yet exist) to be able to use it for composition recipes.

Activation at the machine

Define the previous and subsequent material buffer in the machine master --> workplace configuration -->

MPL:

Parameter name

Value

Workplace type

M = melting aggregate / furnace

Maximum capacity

Specification  of  the maximum  load  capacity  of  the

furnace in kg

Batch management

N

SetupComposition.docx

Version: 1.5.18468

Page 3 of 7

Parameter name

Value

Preceding material buffer

Material buffer of the type C (casting buffer)

Setup of Composition

This  material  buffer  is  the  collection  point  in

front of the furnace. Input materials are gathered

on this material buffer.

This  material  buffer  needs  to  be  assigned  to

exactly one machine (unique assignment). It is not

allowed  to  assign  it  to  several  machines.  But  the

system does not prevent it.

Subsequent material buffer

Material buffer of the type C (casting buffer)

This material buffer represents the contents of

the furnace. Once the charging process has been

confirmed  (i.e.  the  materials  gathered  on  the

collection  point  have  been  put  into  the  furnace),

this buffer includes a batch of the output material.

This  material  buffer  needs  to  be  assigned  to

exactly one machine (unique assignment). It is not

allowed  to  assign  it  to  several  machines.  But  the

system does not prevent it.

Activation at the material buffer

Configure one or several  material buffers as casting buffers that include the anonymous (input) material

(see material type):

Parameter name

Value

Type

C =Casting buffer

Activation at the material type

Configure a material type for the batches included in the casting buffers:

Parameter name

Value

Input batch processing: inventory management

A = Anonymous

SetupComposition.docx

Version: 1.5.18468

Page 4 of 7

Definition of input materials

Create all materials that you would like to use as input material for composition in the material master.

Setup of Composition

Parameter name

Value

Material number

"Material number“

Input material for composition: Input material



Activation at order type

Configure an order type for charging orders. Scheduling must not release the order.

Parameter name

Order type

Value

e.g. "CHRG“

Options/order type for composition

C = charging order

Planning/scheduling  without

implicit  release  of



orders

Configure an order type for melting orders.

Parameter name

Order type

Value

e.g. "MELT“

Options/order type for composition

M = melting order

Please note that the generation of inspection requirements is pre-configured for the order type "CHRG" if

the  order  status  switches  from  "N"  (not  free)  to  "V"  (prepared).  Customizing  services  by  MPDV  are

required if another order type is used (table: ade_aart_cbereich).

Configuration of number ranges

Create  a  number  range  for  charging  orders  (object  "AUNR“,  key  "AART“  and  value  "CHRG“  or  the

relevant  order  type  for  charging  orders).  This  number  range  is  required  to  be  able  to  create  charging

orders using the function "generate charging order" in the MOC application "composition".

SetupComposition.docx

Version: 1.5.18468

Page 5 of 7

Setup of Composition

Example



Create number range

Configuration

Configuration of order statuses

Configure  the  order  status  "N"  as  the  initial  order  status  for  the  order  type  that  has  been  defined  as

charging order by the order type for composition (e.g. "CHRG").

Parameter name

Order type

Status

Data collection / control

Value

e.g. "CHRG“

"N“

S = None

Options / Initial status for the creation



Configuration of permitted input material

Define for each output material, all permitted input materials that may be used for producing the melt of

the  output  material.  Consequently,  the  composition  function  allows  for  data  to  be  restricted  to  the

permitted materials, which simplifies the selection process.

SetupComposition.docx

Version: 1.5.18468

Page 6 of 7

Setup of Composition

Configuration of characteristics

Create  a  characteristic  for  each  chemical  element  (e.g.  Al,  Cu,  Si,  Mn)  that  is  to  be  considered  in

composition.  The  characteristic  number  and  characteristic  designation  are  only  relevant  to  composition.

The characteristics are created in the composition recipe.

Configuration of composition recipe (target analysis)

Create  a  composition  recipe  (target  analysis)  specifying  the  components  (see  characteristics)  of  the

material in percent (specifications: upper tolerance limit, target value, lower tolerance limit) for each input

material. The target analysis defines the expected composition/make-up of an input material.

Configuration of restricted material usage

Formulas have to be defined and assigned to the recipe/material to map specific conditions (e.g. share of

silicium at least 3x share of iron --> Fe >= Si * 3).

This is performed within the application material usage restrictions.

AIP configuration

Define the following buttons for  AIP: "perform charging", "confirm charging", "take sample" and  "cast” in

the file ctaipbut.ini.

[ANR-ALL-Page1]
…
6=C_CHPF,R,Perform charging
7=C_CHCF,R,Confirm charging
8=C_CHTS,R,Take sample
9=C_CHCA,R,Cast

The layout of the charging list is configured within the section [charge list] of the layout configuration file

ctaiplay.ini:

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

SetupComposition.docx

Version: 1.5.18468

Page 7 of 7

