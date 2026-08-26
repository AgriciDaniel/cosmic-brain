Manual

Composition
MPL-GAT 8.2

Version 1.0.23435

Last changed on: 28.09.2020

Composition

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MPL-GAT_82.docx

Version: 1.0.23435

Page 2 of 87

Composition

Contents

1  Composition ................................................................................................. 5

2  Setup of Composition ................................................................................... 9

3  Composition Procedure / Recomposition ................................................... 17

4  Composition Recipe ................................................................................... 21

5  Material Usage Restrictions ....................................................................... 26

6  Permitted Input Materials ........................................................................... 29

7  Material Master .......................................................................................... 32

8  Work Plan - Edit Order Components.......................................................... 36

9  Work Plan - Edit Production Resources & Tools ....................................... 38

10  Edit Order Components ............................................................................. 40

11  Edit Production Resources and Tools ........................................................ 44

12  Characteristic Master Data ......................................................................... 47

12.1  Sampling schemes ............................................................................................ 59

12.2  Control charts for variable characteristics .......................................................... 60

12.3  Control charts for attributive characteristics ....................................................... 62

12.4  Calculation of formulas ...................................................................................... 63

12.4.1  Operators, functions and constants ....................................................... 63

12.4.2  Formulas referring to other inspection results ........................................ 65

12.4.3  Extended formulas................................................................................. 67

12.4.4  General notes on calculated characteristics .......................................... 71

12.5  Last off inspection ............................................................................................. 72

13  Composition ............................................................................................... 74

14  Composition - AIP ...................................................................................... 82

MPL-GAT_82.docx

Version: 1.0.23435

Page 3 of 87

Composition

14.1  Perform charging ............................................................................................... 83

14.2  Confirm charging ............................................................................................... 84

14.4  Take sample...................................................................................................... 85

14.5  Cast .................................................................................................................. 86

14.6

Implementation / configuration .......................................................................... 87

MPL-GAT_82.docx

Version: 1.0.23435

Page 4 of 87

Composition

1  Composition

Summary

General

Composition means the chemical make-up of input materials that are melted down in foundry to produce

a  defined  alloy.  Furthermore,  composition  makes  sure  (by  calculation)  that  the  chemical  composition  of

the  alloy  can  be  achieved  by  adding  as  few  ingredients  as  possible  taking  into  account  the  current

material stock. The objective is to use materials in a cost-effective manner in the production process.

Purpose

The function package "composition" supplements the function packages "shop floor data collection" and

"material and production logistics" by functions to manage recipes, optimize material usage and analyze

materials for the production of alloys.

Implementation Considerations

The function package "composition" is used if

  You  would  like  to  define  and  manage  composition  recipes  for  the  production  of  alloys  in  the

system.

  You would like to use the composition function

o  as an analysis tool to make sure by calculation that the chemical composition of the melt

matches the target specifications of an alloy.

o

to plan material usage for the production of alloys taking into account the actual material

stock.

Features

  Configuration of the material master

  Configuration of the composition recipe

  Configuration of restricted material usage

  Configuration of permitted materials

  Composition/re-composition

  Charging process at the terminal

o  Log on order

o  Perform charging

o  Confirm charging

o  Sample taking

MPL-GAT_82.docx

Version: 1.0.23435

Page 5 of 87

Composition

o  Cast

Integration

The  sections  that  follow  describe  the  functional  connection  of  individual  components  and  functions

necessary to perform composition in the system.

Orders/OP

The following orders/OPs are used in MES, in particular in connection with composition. They each have

a special order type and differ from common production orders/OP.

  Melting

order

Normally,  "melting  orders"  are  transferred  from  the  ERP  system  to  MES.  They  include  the

quantity as well as alloy to be produced.

  Charging order

If the melting order exists in MES, a "charging order" may be generated from it (composition -->

generate charging order). Primarily, it has been copied from the melting order and takes over the

relevant data.

The generated charging order is shown in the list of charging orders within the function

"composition".

MPL-GAT_82.docx

Version: 1.0.23435

Page 6 of 87

Composition

Chemical composition/composition recipe

The  composition  function  shows  the  composition  recipe  in  addition  to  the  target  alloy  (article)  of  the

charging order.

The composition recipe is defined for each target alloy within MES. Where it may be:

  edited in general



fed  with  characteristics  (chemical  elements).  The  target  value,  upper  tolerance  limit  as  well  as

lower tolerance limit also have to be specified for these characteristics.



released

o  Then the status of the composition recipe is "released" and no longer "in process". Only

released composition recipes can be enabled/activated.

  enabled/disabled

o

If  activated,  a  composition  recipe  will  be  used  for  the  composition  of  an  alloy  or  its

sampling.

A composition recipe normally only includes chemical elements. Alloys from the material master are not

used.

Permitted input materials and material usage restrictions

The  function  "permitted  input  materials"  defines  which  input  materials  may  at  all  be  used  for  the

composition  of  an  alloy.  This  also  identifies  which  materials  (provided  that  material  is  available)  are

actually shown for an alloy within the "composition" function. Materials that are not permitted or permitted

materials that are not available are not displayed.

All  materials  available  will  be  shown  if  selection  within  the  composition  function  is  not  restricted  to  the

permitted input materials.

Several additional restrictions (formulas) may be defined by the function "material usage restriction". They

will also be shown in the composition function. But restrictions can only be used optionally.

Material stock/ Material master

All materials used in composition have to be defined (anonymously, without batch reference) in the MES

material master.

Defined materials are:

  Chemical elements: they are used as inspection characteristic within the composition recipe.



Input materials: These can be:

o  Raw material

o  Alloys

MPL-GAT_82.docx

Version: 1.0.23435

Page 7 of 87

o  Scrap/recycling material (alloys)

  Target alloys

The MES keeps the inventory of materials defined in the material master.

Composition

MPL-GAT_82.docx

Version: 1.0.23435

Page 8 of 87

Composition

2  Setup of Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 9 of 87

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 10 of 87

Scheduler configuration

Enter  the  following  values  in  MOC  System  administration  System  settings  Scheduler  in  order  to

calculate average values or material costs and to complete inspection requests for finished orders:

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 11 of 87

Parameter name

Value

Preceding material buffer

Material buffer of the type C (casting buffer)

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 12 of 87

Definition of input materials

Create all materials that you would like to use as input material for composition in the material master.

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 13 of 87

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 14 of 87

Composition

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

Define the following buttons for  AIP: "perform charging", "confirm charging", "take sample" and "cast” in

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 15 of 87

Composition

MPL-GAT_82.docx

Version: 1.0.23435

Page 16 of 87

Composition

3  Composition Procedure / Recomposition

Procedure/ composition process

The procedure or composition process is to be performed as follows in general.

The relevant procedure describes how to configure the required composition functions.

Generate charging order

The  composition  process  starts,  once  the  melting  order  has  been  received  from  the  ERP  system  or  by

being generated from an MES work plan.

In the next step, an employee executes the function "generate charging order" (material management  

composition    composition    "start  composition“  tab    generate  charging  order).  This  generates  the

charging order that is then shown in the list of charging orders including the relevant melting order. The

charging order has the order status "not free". Consequently, it cannot be used/started yet at the terminal.

Start composition

The  defined  composition  recipe  including  the  relevant  default  values  as  well  as  the  permitted  input

materials with their respective quantities is shown by the user selecting the charging order.

Composition is now started for the charging order. Consequently, the order status changes from "not free"

to "reserved".

Material assignment

Once  composition  has  started,  the  user  can  take  over  the  bottom  sump  remaining  in  the  furnace  to

current  composition.  In  this  case,  the  current  bottom  sump  quantity  will  be  taken  over/used.  The

theoretical values (planned bottom sump) assumed up to now and resulting from the sequence of orders

are overwritten by current information.

Then  the  user  can  assign  further  materials  from  the  list  of  permitted  materials.  The  user  selects  the

required  material  and  clicks  the  function  "assign  material"  (material  management  -->  Composition  -->

Composition --> tab "perform reservation" --> assign material). By double clicking the assigned material,

the user can now enter the target quantity.

Subject to the added material, the list showing the selected materials is supplemented and the theoretical

analysis is updated within the sample view.

Material reservation

MPL-GAT_82.docx

Version: 1.0.23435

Page 17 of 87

Composition

Once  material  has  been  assigned,  the  materials  can  be  reserved  for  the  relevant  charging  order  within

the  inventory  (material  management  -->  composition  -->  composition  -->  tab  "perform  reservation"  -->

reservation/perform reservation (including material).

All or only single materials included in the list "selected materials" may be reserved for the charging order.

If the reservation is performed, the material will be reserved explicitly for this charging order and cannot

be used for other charging orders.

However, it is still possible to undo or cancel reservations. Consequently, all materials are separated from

the charging order and removed from the list of selected materials.

It is possible to cancel the reservation for all materials or only single materials.

In case a material has already been partially consumed, the reservation can be cancelled indeed, but the

consumption will be deducted from the target quantity.

Release charging order/charging list

In  case  composition  has  been  performed  successfully,  the  charging  order  will  be  released  (material

management --> composition --> composition --> tab "release" --> release of charging order). The status

of the charging order is "prepared". The charging order can now be used/logged on to the terminal.

The  release  analysis  is  generated  by  the  release  and  saved  in  the  system  as  the  originally  suggested

charging result.

Once the charging order has been released, a "charging list" (bill of material for the charging order) can

be  generated  by  the  user  (material  management  -->  composition  -->  composition  -->  tab  "release"  -->

charging list).

Employees working in production/warehouse management are provided with the charging list to provide

the relevant materials.

Procedure/ charging process

Charging  is  performed  by  an  employee  at  the  terminal  pertaining  to  the  melting  furnace.  To  do  so,  the

following steps are performed one after the other.

  Log charging order on

o  Log the generated charging order on

  Perform charging

o  Provision of the material in compliance with the displayed charging list from the charging

order.

  The melting furnace is fed with the components and charging is completed.

MPL-GAT_82.docx

Version: 1.0.23435

Page 18 of 87

Composition

  A sample is taken from the melt.

  Please also note: The result of sample taking might make re-composition necessary at MOC.

  The melt is cast. This completes the charging process.

Analysis of sampling and re-composition

The composition function enables viewing of sample results and, if necessary, to perform recomposition.

The below entries can be found in this detailed application.

Release analysis

The release analysis is the original composition result after composition has been first released and, as a

result,  it  is  the  first  theoretical  analysis.  The  release  analysis  provides  the  original  default  values  for

charging and is saved/frozen as the initial status.

Theoretical analysis

The  theoretical  analysis  first  shows  the  current  status  of  the  used  materials  in  relation  to  how  the

chemical  make-up  from  the  composition  recipe  has  been  achieved.  Therefore,  the  theoretical  analysis

represents a default value at first.

This default value, however, is constantly recalculated, e.g. if re-composition is performed after sampling

and, as a result, further materials are added to the melt.

Consequently,  calculation  of  the  current,  theoretical  analysis  is  always  based  on  the  results  of  actual

values  that  are  currently  available  in  the  system  after  sampling  and  not  on  the  release  analysis.  This

means:









the current sample and its point in time as well as the sample weight are determined

the actual values of the characteristics/elements of this sample are determined

the target quantities that need to be recharged are determined (after taking the sample)

the  target  material  (including  its  make-up)  is  now  added  to  the  current  sample's  material

(including  its  make-up)  and,  based  on  this,  the  composition  of  the  theoretical  analysis  is

calculated.

Samples (analysis based on sampling)

A  sample  is  taken  at  the  melting  furnace.  The  chemical  composition  of  the  sampling  is  transferred  to

MES. The result is shown by the entry "sample" within the composition function.

If  required,  the  user  can  reblend  composition  and  add  further  materials.  The  bottom  sump  cannot  be

taken into account with recomposition. The already used bottom sump has been consumed along with the

release analysis/released composition and therefore frozen.

MPL-GAT_82.docx

Version: 1.0.23435

Page 19 of 87

Composition

MPL-GAT_82.docx

Version: 1.0.23435

Page 20 of 87

Composition

4  Composition Recipe

Summary

Menu

Master data  Material  Composition recipe

Transaction code

core

Function authorization

core

Utilization

The  composition  recipe  defines  the  expected  chemical  composition  of  input  materials  and  output

materials.

Integration

The  composition  recipe  is  the  basic  prerequisite  for  composition.  Once  the  charging  order  has  been

released,  the  recipe  is  used  for  the  determination  of  samples.  An  inspection  request  is  generated  as  a

part of the release process. The used inspection plan is referenced in the generated inspection request.

Prerequisite

The material  for  which  the  recipe  is  to  be  created  needs  to  be  defined  within  the material  master  to  be

able  to  create  composition  recipes.  In  addition,  the  chemical  elements  to  be  used  in  the  composition

recipe also need to be defined.

Selection criteria

The paragraph that follows  shows some of the available selection criteria. Self-explanatory filter options

are not listed.

Area

"Composition recipe" is set here by default.

Active

By checking this checkbox, the list of composition recipes can be restricted to active recipes. If this

checkbox  is  not  checked,  the  list  only  shows  composition  recipes  in  the  status  "in  process"  and

"released". The third state of this checkbox (grayed out) shows all composition recipes. This is the

initial state.

Recipe number

Filters the recipe numbers of composition recipes.

Recipe version

Filters the recipe version of composition recipes.

MPL-GAT_82.docx

Version: 1.0.23435

Page 21 of 87

Composition

Field descriptions

Area, recipe number, recipe version

The "area", "recipe number" and "recipe version" uniquely identify all existing composition recipes.

The  area  is  set  to  "composition  recipe".  The  recipe  number  and  recipe  version  may  be  entered

using alphanumeric characters. All these fields are mandatory fields.

By  assigning  a  structured  recipe  number,  it  is  possible  to  provide  specific  information.  This

information might be useful later during sorting. If an existing recipe version is to be modified, yet it

cannot just be changed because it has already been used for the generation of inspection orders, it

is  recommended  to  copy  the  original  composition  recipe  and  to  modify  the  recipe  version  (e.g.

incrementing it by 1). The recipe number should be kept as far as possible.

Material number

Shows the material number. If it is known it can be entered directly. Otherwise, the material dialog

can  be  opened  and  the  provided  filter  and  sort  criteria may  be  used  to  identify  and  take  over  the

required  material.  Once  a  material  has  been  chosen  from  the  master  data  record,  the  material

designation,  customer  article  number  and  drawing  issue  number  are  taken  over  and  displayed  in

the relevant fields.

Released/active

Shows whether the inspection recipe is "released" and/or "active". If the recipe is released or active

the  corresponding  checkboxes  are  checked.  A  recipe  is  released  and  enabled,  i.e.  its  status  is

changed, only by  using the corresponding toolbar functions. A recipe has to be released before it

can be activated.

Inspection  orders  are  generated  in  the  system  to  perform  composition.  Please  note  that  the

automatic generation of inspection orders only considers released composition recipes.

Released by / on

Shows the HYDRA user who has released the recipe. The release date is displayed additionally.

Valid from / until

If required, a validity period may be entered here, instead of the "unrestricted" activation (using the

toolbar).  This  period  is  then  taken  into  account  when  the  inspection  order  is  generated.  Yet

activation for a certain period means that the user has no clear overview of currently valid inspection

plans,  and  it  is  therefore  recommended  to  use  the  "global/unrestricted"  activation  option  using  the

toolbar. If activated by toolbar functions, the system carefully monitors whether an active inspection

plan  already  exists  for  the  specified  article  and  it  also  includes  the  same  drawing  issue  number,

customers  and  suppliers.  If  this  is  indeed  the  case,  the  previously  active  inspection  plan  will

automatically be disabled.

MPL-GAT_82.docx

Version: 1.0.23435

Page 22 of 87

Editing functions

The key fields "area", "recipe number" and "recipe version" cannot be changed in the editing mode.

Composition

Toolbar

Copy

A corresponding dialog opens for copying of a composition recipe.

The  target  area  type  and  target  area  may  be  entered  here.  Normally,  the  user  should  choose  an

area that is identical to that of the source inspection plan. Then the new recipe number and recipe

version need to be  entered. In case a new version  is  generated from an existing recipe, normally

the same recipe number is used and only the recipe version is changed.

Activate

Function authorization: core.activate

Makes the composition recipe status "active“.

Deactivate

Function authorization: core.deactiv

Puts the composition recipe that is in the "active" status back to the "released" status.

Release

Function authorization: core.release

Puts a composition recipe that is in the "in process" status to the "released" status.

In process

Function authorization: core.unreal

Puts a composition recipe that is in the "active" or "released" status to the "in process" status.

Detail application "print form"

Function authorization

core.print

The print dialog opens a  list of available reports. These are Word forms.  The potential content of these

forms is determined by the Web services that are available in the respective context. The form entries, i.e.

the  contents  of  the  list  of  forms  of  the  corresponding  print  dialog,  are  defined  within  the  master  data  of

quality management. The basis for new forms and the corresponding form properties are defined there as

well. A corresponding license is required to be able to change the forms as regards content and design.

MPL-GAT_82.docx

Version: 1.0.23435

Page 23 of 87

Composition

Detail application "characteristics"

The  detail  application  for  characteristics  is  nearly  identical  to  the  master  data  of  characteristics

application. For this reason, reference is made here only to modifications or additional features.

The  relevant  characteristics  are  assigned  to  the  previously  defined  composition  recipe  on  the  level  of

characteristics.  Characteristics  are  assigned  by  creating  a  new  data  record  and  by  opening  the

characteristic catalog and accepting the characteristic selected there. All master data entries are copied

into  the  characteristic,  once  the  characteristic  has  been  taken  over.  Each  (copied)  information  can  be

changed  and/or  amended  afterwards.  Characteristic  designations  are  often  supplemented  to  define  the

characteristic in more detail.

It  is  also  possible  to  create  a  characteristic  that  is  not  included  in  the  characteristics  catalog.  However,

this is recommended only in exceptional cases, since all analyses (e.g. failure mode analysis) are based

on  characteristics  included  in  the  catalog.  It  is  therefore  recommendable  to  maintain  the  characteristics

catalog properly.

Different properties and settings can still be defined, before specific characteristic data is supplemented.

Field descriptions

Position

The position determines the order of subsequent inspections. The input must be unique. Ideally, the

position  number  should  be  incremented  in  steps  of  ten  when  new  data  records  are  created.

Consequently,  a new characteristic may still be inserted  between two existing characteristics at  a

later point in time.

Characteristics number

Number of the characteristic selected from master data.

Characteristic designation

Designation of the selected characteristic.

Detail application "inspection plan documents"

As  many  documents  as  required  may  be  assigned  to  each  composition  recipe,  provided  that  the

"inspection plan documents" tab has been enabled in the master detail grid. By enabling these tabs, the

toolbar provides corresponding buttons to edit documents.

All  formats  registered  by  Windows  are  available,  when  documents  are  assigned.  Consequently,  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos  may  be  assigned.  However,  the

corresponding programs that are able to display the required formats have to be installed. In this context,

the documents are opened by the program that has been linked in Windows.

MPL-GAT_82.docx

Version: 1.0.23435

Page 24 of 87

Composition

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A designation may be assigned to each defined document. Moreover, it may also be determined in which

order  the  documents  are  to  be  listed.  The  "position"  field  is  used  for  this  purpose  (numeric  input).  The

specifications made within this list must be unique. In addition, the checkbox "display during inspection"

specifies whether or not the document may be shown during the inspection process.

MPL-GAT_82.docx

Version: 1.0.23435

Page 25 of 87

Composition

5  Material Usage Restrictions

Summary

Menu

Master data  Material  Material usage restrictions

Transaction code

rest

Function authorization

rest

Utilization

Material  usage  restrictions  (composition  restrictions)  include  formulas  that  are  used  for  checking  the

composition (e.g. the relation of materials) for the production of a material (alloy).

Integration

The  composition  for  the  charge  make-up  is  calculated  or  analyzed  based  on  the  material  usage

restrictions.

Selection criteria

Material

The material for which material usage restrictions are to be shown.

Formula

The formula specifying a restriction

Comment

Comment to explain the usage restriction.

Description

Brief description of the usage restriction.

Field descriptions

Material

The material to which the usage restriction refers.

Formula

MPL-GAT_82.docx

Version: 1.0.23435

Page 26 of 87

The  formula  characterizing  the  restriction.  The  formula  expression  is  shown  in  addition  to  the

formula key. Formulas of the type = 7 "formulas for composition restrictions" or type = 8 "formulas

for composition scrap rate" are used for composition.

Composition

Comment

The comment assigned to the formula.

Usage type

Only option "C" for composition is supported at the moment.

Description

Brief description of the usage restriction.

Comment

Comment to explain the usage restriction

Editor

The user who edited the data record at last

Modified on

The time when this data record was edited at last

How to use formulas

The below-mentioned variables may be used in formulas

"Material“

All components/elements (defined as characteristics in composition recipes) can be used with their

names in formulas

SCRAPMATERIAL

Total target quantity of scrap material in the selected materials

RAWMATERIAL

Total target quantity of raw material ("non" scrap material) in the selected materials

SUMP

Target quantity of the current bottom sump

MAXCAPACITY

The maximum capacity of the melting aggregate(s)

MPL-GAT_82.docx

Version: 1.0.23435

Page 27 of 87

Composition

Examples

This section shows some examples for formulas

Share of iron max.1/2 share of copper: Fe <= (Cu / 2)

The variables (here: Fe und Cu) are assigned based on the components/elements of the materials

to be used

Scrap rate max.40%: SCRAPMATERIAL / (SCRAPMATERIAL + RAWMATERIAL) < 0.4

The  target  quantity  for  scrap  material  (SCRAPMATERIAL)  relating  to  the  total  quantity  (scrap

material plus raw material) must not reach 40%

Max. capacity: SCRAPMATERIAL+RAWMATERIAL+SUMP<MAXCAPACITY

The target quantity for scrap material (SCRAPMATERIAL) plus raw material (RAWMATERILA) plus

current  sump  (SUMP)  must  be  less  than  the  maximum  capacity  of  the  melting  aggregate(s)

(MAXCAPACITY).

MPL-GAT_82.docx

Version: 1.0.23435

Page 28 of 87

Composition

6  Permitted Input Materials

Summary

Menu

Master data  Material  Permitted input materials

Transaction code

pema

Function authorization

pema

Utilization

This application defines the input materials permitted for composition.

Integration

Only input materials defined as "permitted input materials" may be used in composition for manufacturing

a material (an alloy). If an input material has been identified as additional material, it may also be used for

re-composition.

Composition is supported by the defined, permitted input materials.

Prerequisite

Selection criteria

The following selection criteria are available in the application:

Material

Material for which a permitted input material has been defined.

Input material

Input material of composition.

Additional material

Selected data records that have been identified as additional material.

Comment

Comment to explain the relation

Description

A brief description of the relation

MPL-GAT_82.docx

Version: 1.0.23435

Page 29 of 87

Composition

User fields

The defined user fields of the object type MATZEMAT

Field descriptions

These parameters are shown:

Material

Material for which a permitted input material has been defined.

Input material

Permitted input material for the (end) material

Additional material

The  input  material  has  been  defined  as  additional  material  for  the  (end)  material  and  may,  for

example, be used for re-composition.

Comment

Comment to explain the relation

Description

A brief description of the relation

Editor

The user who edited the data record at last

Modified on

The time when this data record was edited at last

User fields tab

User  fields  offer  the  possibility  to  store  further  customer-specific  information  to  MES  besides  the

fields available in MOC standard. The tab provides eight sub tabs each of which providing eight user

fields.  The  so  called  user  field  key  determines  which  user  fields  are  involved  and  which  meaning

they have.

Object type

Default "MATZEMAT"

MPL-GAT_82.docx

Version: 1.0.23435

Page 30 of 87

User field key

Default "SYSTEM“

User fields

The following user fields are available after customizing the system:

Composition

Field data type

Number of
fields
6
16

Date
Numeric,
time, duration
Decimal value
Text field, length 1
Text
length
field,
10
Text
20
Text
40
A maximum of 8 fields are shown for each page.

6
16
6

length

length

field,

field,

14

2

User  field  keys  are  not  defined  by  default  in  the  system.  The  system  has  to  be  customized

accordingly to be able to support this kind of user fields.

MPL-GAT_82.docx

Version: 1.0.23435

Page 31 of 87

Composition

7  Material Master

Overview

Menu

Master data  Material  Material master

Transaction code

matc

Function authorization  matc

Available user fields

Where?

Detail view

Object type/user field key

Source (type)

ARTIKEL/SYSTEM

Material (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You use this function to create a material master in the system for the materials used.

Integration

The material master has been designed to edit materials. This refers to especially defined master data.

The material data defined in the master data are used by the composition function or e-kanban systems.

Requirements

When  you create the master data for a material,  the  material type  and the material  buffer must already

exist in the system.

Selection criteria

The application provides the following selection criteria:

Tab General

Material number

Material number

Drawing issue number

Drawing issue number of the material, also referred to as index

Designation (name)

Material name

MPL-GAT_82.docx

Version: 1.0.23435

Page 32 of 87

Composition

Inactive

Inactive, active materials. The checkbox is not enabled by default.

Tab Composition

Scrap material

Selects materials identified as scrap material.

End product

Selects materials identified as end products.

Input material

Selects materials identified as input material. The checkbox is enabled by default.

Tab Kanban

To show these fields, you require the user authorization "kov".

Kanban material

Selects the materials used in the kanban process.

Tab User fields

You  can  use  this  tab  to  perform  a  selection  according  to  the  definded  user  fields  for  object  type

"ARTIKEL" and the user field key "SYSTEM".

Field descriptions

Material number

Material number

Drawing issue number

Drawing issue number of the material, also referred to as index

Designation (name)

Material name

Material type

Material type of the material

MPL-GAT_82.docx

Version: 1.0.23435

Page 33 of 87

Composition

Specific weight

The specific weight of the material in the unit g/mm³

Inactive

Inactive, active materials. The checkbox is not enabled by default.

Input material

The material is an input material of the composition. This option has to be enabled for materials

used in composition.

Scrap material

Identifies a material as scrap material.

Material buffer

Material buffer of the material

Fragmented size

The material piece size in kg.

Price

The price of the material in €/kg

End product

Identifies a material as end product of the composition.

Tab Kanban

To show these fields, you require the user authorization "kov".

Kanban material

Identifies a material as kanban material.

Tab MSL (only with HYDRA for Electronics)

The  Moisture  Sensitivity  Level  (MSL)  specifies  the  moisture  sensitivity  of  semiconductor  components

during packing, storage and assembly.

MSL material

This option specifies if the MSL level is relevant to material of this material type.

MSL term

Time period in hours in which the material must be used after opening.

Level/threshold

Specifies the level of the MSL material.

MPL-GAT_82.docx

Version: 1.0.23435

Page 34 of 87

Composition

Comment

You can enter a comment in this field.

Tab User fields

You can use user fields to store additional customer-specific information in the MES. The user fields tab

includes  eight  sub-index  tabs,  which  each  has  eight  additional  user  fields.  The  so-called  user  field  key

specifies the available user fields and their meaning.

Object type

Default "ARTIKEL“

User field key

Default "SYSTEM“

User fields

The following user fields are available after system customization (maximum):

Field data type

Number of
fields
6
16

time,

Date
Numeric,
duration
Decimal value
Text field, length 1
Text
length
field,
10
Text
20
Text
40
Each page shows a maximum of 8 fields.

6
16
6

length

length

field,

field,

14

2

By default, no user field keys are defined. You must activate in the system via customization that this kind

of user fields is supported.

Toolbar

 Composition recipe

This function calls the relevant composition recipe for the selected material.

MPL-GAT_82.docx

Version: 1.0.23435

Page 35 of 87

Composition

8  Work Plan - Edit Order Components

Summary

Menu

Order management  Routing management
 Work plan – Edit components of the order

Transaction code

edworcmp

Function authorization

edworcmp

The "work plan - edit components of the order" application allows for the material components, which are

required to produce the article in the current manufacturing level (current operation), to be displayed and

edited.

Normally,  these  components  are  transferred  to  HYDRA  using  an  interface  from  the  higher-level  ERP

system, as these components are already defined in the ERP work plan.

Selection criteria

The following selection criteria are available in the application:

Order

The components assigned to a work plan order may be selected by entering an order.

Field descriptions

The fields pertaining to components are described here

Editing functions

Please use the available buttons to create new or edit existing work plan components. A copy function for

components is not planned.

Please note that the BOM item must be unique within the operation if HYDRA-MPL is in

use!

Toolbar

Edit operations

Function authorization: edwop

Opens  the application Work plan – edit operations.

MPL-GAT_82.docx

Version: 1.0.23435

Page 36 of 87

Composition

Edit orders

Function authorization: edwor

Opens  the application Work plan – edit orders.

MPL-GAT_82.docx

Version: 1.0.23435

Page 37 of 87

Composition

9  Work Plan - Edit Production Resources & Tools

1.1

Summary

Menu

Order management --> Routing management --> Work plan - Edit production
resources & tools

Transaction code

edwres

Function authorization

edwres

The "production resources & tools" application allows for the resources, which are required to produce the

article in the current manufacturing level (current operation), to be displayed and edited.

Production resources and tools may be, for example, tools, documents, NC programs, etc.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The production resources and tools assigned to a work plan operation may be selected by entering

the  MES  work  plan  number.  The  MES  work  plan  number  is  the  combined  work  plan/operation

number.

Enter the whole MES work plan number if you would like to view the production resources & tools

assigned to a specific operation.

If you would like to view the production resources & tools of all operations of a work plan only enter

the work plan number, followed by "*“.

Field Descriptions

The fields of a production tool and resource are described here.

Editing functions

Please  use  the  available  buttons  to  create  or  edit  production  resources  &  tools  of  work  plans.  A  copy

function for production resources & tools is not planned.

If  the  tool  and  resource  management  module  (HYDRA-WRM)  is  in  use,  the  first  production

resource and tool that is not of the resource type "DNC" or "MAT" is taken over into the "tool"

field of the operation. In addition, the "tool" field is checked whether it already includes a value,

when inserting a production resource and tool that is not of the "DNC" or "MAT" resource type.

If this is not the case, this component is taken over. For this reason, it is recommended to insert

MPL-GAT_82.docx

Version: 1.0.23435

Page 38 of 87

Composition

the "main production resource & tool" at first in the list of production resources and tools.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

Edit operations

Function authorization: edwop

Opens  the application work plan - edit operations.

Edit orders

Function authorization: edwor

Opens  the application work plan - edit orders.

-  

MPL-GAT_82.docx

Version: 1.0.23435

Page 39 of 87

Composition

10  Edit Order Components

Summary

Menu

Order management  Order management  Edit components of the order

Transaction code

edorcomp

Function authorization

edorcomp

Utilization

Materials required for manufacturing an article/item  are assigned to an  operation or order as "(material)

components". This function allows for material components of an order to be displayed or edited.

Normally,  these  components  are  transferred  to  HYDRA  using  an  interface  from  the  higher-level  ERP

system, as these components are already defined in the ERP work plan.

Prerequisite

The relevant order has to be created.

Selection criteria

The following selection criteria are available in the application:

Order

The components assigned to an order may be selected by entering an order.

Field descriptions

Order

The order number to which the production resources and tools are to be assigned can be entered

in this field.

Material

The material number of the material component can be entered here.

Designation

The material designation can be entered in this field.

Comment 1 / comment 2

These are comment fields.

MPL-GAT_82.docx

Version: 1.0.23435

Page 40 of 87

Composition

BOM item

In a bill of material the components of a product are referred to as items. The number entered here

arranges  the  BOM  items  within  the  BOM.  Consequently,  identical  material  numbers may  occur  in

the component list but data will still be assigned to the correct position of the component.

When  it  comes  to  reel-based  manufacturing,  it  refers  to  the  position  of  the  component  within  the

layer structure.

Please note that the BOM item is an integral part of the identification key.

BOM level

A component can also have several levels. Enter the BOM level here, provided that it is available

and known.

Please  note:  Postings  can  only  be  made  for  materials  of  the  BOM  level  0.  If  a  BOM  level  >  0  is

entered, the component type (see next field) will generally be set to "I" (information component).

Component type

Component type. Possible values are:

M

Material component. The component type is to be indicated here. The other types might

also be relevant for MPL or its reel-based solution MPL-RF.

I

T

Z

A

Material type

Info  component.  Information  components  can  be  shown  in  the  component  list  without

having to be posted.

Carrier material (MPL-RF).

A maximum of one input batch may be logged on to the machine as carrier material (T) or

added material (Z).

Added material as alternative for the carrier

Scrap/waste material

Material  type  of  the  material  component.  The  material  type  controls  processing  specific  to  the

material in HYDRA.

Unless otherwise stated in the project, the material type SYSTEM is to be assigned.

The material type must exist in HYDRA. If no material type  is entered, HYDRA tries to determine

the  material  component  (prerequisite:  the  assignments  of  material  to  the  material  type  are  up-to-

date). If no material type is found HYDRA assigns the material type SYSTEM.

Please note: A separate material type (e.g. INFO) should be defined and assigned for information

components (material type "I").

Consumption type

The following input options are planned for material components. The definition of individual options

and their usage depends, among other things, on which HYDRA modules are in use.

MPL-GAT_82.docx

Version: 1.0.23435

Page 41 of 87

Composition

K = None

This option specifies that no consumption is collected for this material component. In this case, the

material component is only displayed.

"Info components" (see above: material type) have to be set to this option.

D = Discrete

With  this  component,  the  consumption  is  determined  in  a  retrograde  manner  at  the  Windows

terminal,  i.e.  based  on  the  last  produced  quantity  and  suggested  in  the  posting  dialog.  The

consumption is posted for the component and a material movement (goods issue from production)

is  generated  that  can  be  uploaded  to  the  higher-level  ERP  system  (however,  this  requires  the

relevant interface for uploading goods movements).

This  type  of  material  consumption  recording  needs  to  be  configured  especially  while  HYDRA  is

customized.

L = with batch reference (relevant if MPL/TRT is in use)

This option results in the material component to be logged on and off as HYDRA batch. Calculating

the consumption for this material component (retrograde, with logging the input batch off) depends

on the configuration of the material type to which the material component is assigned.

Required quantity/unit

Planned total quantity of the component within the operation.

It  is  calculated  automatically  from  the  target  quantity  of  the  operation  (primary  quantity  unit)

multiplied by the input quantity of the component.

The required quantity is only shown in the table as well as in the detail panel.

Input quantity

Planned input quantity of the component for each unit of the operation's primary quantity.

MPL, consumption type D: Planned input quantity of the component for each unit of the operation's

primary quantity

Unit

Quantity unit for the input quantity

Input quantity in % / upper tolerance limit / lower tolerance limit

Reserved. No processing. Should be set to 0.

Replaceable

If this flag is set, another than the planned material  may be used for the component. However, in

this case, only material of the same material type can be used.

Requirement to change output batch

The input  batch change for a batch of this material also requires an output  batch change. Please

note in this context:

MPL-GAT_82.docx

Version: 1.0.23435

Page 42 of 87

Composition

, if type = T or Z

, if type = I or A

/, if type = M

Otherwise: N

Superior component: BOM item/BOM level

Reserved. No processing.

Toolbar

Edit operations

Starts the application edit operations.

Edit orders

Starts the application edit orders.

 Order information

Starts the application order information.

MPL-GAT_82.docx

Version: 1.0.23435

Page 43 of 87

Composition

11  Edit Production Resources and Tools

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit production resources and
tools

Detailed Scheduling  Order management  Edit production resources and
tools

Transaction code

edres

Function authorization

edres

Purpose

Resources can be defined for operations in the list of production resources and tools.

Further  information  on  how  to  define  workforce  requirements  via  production  resources  and

tools can be found in the document entitled Definition_of_Workforce_Requirement.pdf

Requirement

The corresponding operation must already be defined.

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operations. This is why the entire key must be

entered.  By  entering  the  order  number  followed  by  *,  the  system  will  list  all  components  for  an  entire

order.

Field descriptions

Order/ operation

Enter  the  order/  operation  number  for  the  operation  that  is  to  be  assigned  to  the  production

resource or tool here.

MPL-GAT_82.docx

Version: 1.0.23435

Page 44 of 87

Composition

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource type must be known in the system. Predefined resource types must be chosen from the

selection  menu.  Additional  resource  types  can  be  defined  when  customizing  HYDRA.  For

documents, the resource type to be entered here must be DOC.

Resource

Enter the resource number (material number) of the production resource or tool.

Designation

Here, you can enter a name for the production resource.

Comment 1/ C\comment 2

These are comment fields.

Required quantity/ unit

Resource  quantity  required  to  carry  out  the  operation.  When  planning  the  operation  in  the  shop

floor scheduling, this number of resources is entered in terms of capacities. The quantity unit is only

used as a comment.

Please note: In the shop floor scheduling, the quantity 0 is interpreted implicitly as quantity 1.

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined  in  the  path  configuration  (menu:  File  >  System  administration  >  Paths).  No  path  must  be

stored for DNC resources; it is determined based on the path stored for the resource type. The field

should be left empty for all other production resources (only applies when using HYDRA).

Path

File

When identifying a document as a production resource, the file name (including file extension) is to

be entered here.

No file name must be stored for DNC resources; it is determined based on the file name defined for

the  resource.  The  field  should  be  left  empty  for  all  other  production  resources(only  applies  when

using HYDRA).

Modified by/ date/ time

Editor as well as the date and time the last change was made.

MPL-GAT_82.docx

Version: 1.0.23435

Page 45 of 87

Composition

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

 Edit operations

Calls the application Edit operations.

 Edit orders

Calls the application Edit orders.

 Order information

Calls the application Order information.

MPL-GAT_82.docx

Version: 1.0.23435

Page 46 of 87

Composition

12  Characteristic Master Data

Overview

Menu

Master data  Quality management  Characteristics

Transaction code

chrq

Function authorization

chrq

Available user fields

Where?

Object type/user field key

Source (type)

Table and detail view

CMM/SYSTEM

QM

How to configure user fields?

Which user field types are available?

Purpose

The catalog of characteristics has been designed to define characteristics and, as a result, to predefine

characteristic data of inspection plans. For this reason, it aims at people involved in inspection planning.

MPL-GAT_82.docx

Version: 1.0.23435

Page 47 of 87

Composition

The  catalog  of  characteristics  is  one  of  the  most  important  basic  catalogs.  You  cannot  set  up  any

inspection plan  without this catalog.  As this catalogue is used to predefine characteristics for inspection

plans, it includes extensive input options. Basically, the catalog of characteristics should only include such

data, which will not have to be modified when the characteristics are assigned to the inspection plan later

on. For example, the definition of limit values is usually not reasonable as these values are only known

when an inspection plan is set up. Only when you assign data to an inspection plan, a relation between

data and article is established. Note this and you will know what kind of information you should predefine.

For example, it must be carefully considered  whether  the characteristic "outer diameter" is only created

once  and  detailed  information  is  stored  in  the  inspection  planning  later  on  or  whether  several  "outer

diameter characteristics" are created, e. g. with specification of limit values. Usually, it is an advantage to

store a restricted number of general characteristics. The required evaluations/reports also play  a role in

this  context.  If  a  new  "outer  diameter  characteristic"  is  created  for  almost  every  tolerance  change,  this

characteristic is "valid" for one article only. In a subsequent failure analysis, a comprehensive evaluation

is not possible in this case!

It  is  important  that  each  detail  defined  here  can  be  modified  in  the  inspection  planing  later  on  or  that

details, which have not been stated, can still be added.

The configurations made in the characteristics' master data are not final. The characteristics' master data

is  used  as  a  template  for  later  inspection  planning.  You  can  complete  and  modify  all  settings  of  the

characteristics' master data during inspection planning.

Integration

The catalog of characteristics is a global catalog that is used in many QM applications. Please find below

some possible fields of application that refer to the catalog of characteristics.





Inspection planning for production, goods receipt, goods issue, initial samples and calibration

Inspection requirements for production, goods receipt, goods issue, initial samples and calibration

  Failure analysis in complaint management

  Several reports/evaluations

Requirements

There are no special requirements.

Selection criteria

The application provides the following selection criteria:

MPL-GAT_82.docx

Version: 1.0.23435

Page 48 of 87

Composition

  Characteristic no.:

Number of the characteristic

  Characteristic designation:

Designation of the characteristic –  Note: You may use wildcards "*"

  Characteristic type:

Inspection type: attributive, inspection chart, variable

Tab Details

  Gage

Select a gage

  Gage designation:

Select a gage designation

Tab User fields



If user fields are created, they may be selected

If several selection criteria are used, overlapping results are displayed in the characteristics' master data.

In addition, the column filter allows for the content of each individual column to be filtered.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

Tab Characteristics

Characteristic no.

Unique number of the characteristic

Characteristic designation/name

Designation of the characteristic

Input type

Automatic or manual data collection. This field controls the release of HYDRA-PDV fields (in case

of  automatic  collection).  If  the  automatic  collection  function  is  selected,  the  characteristic  type  is

restricted to the "variable" option.

MPL-GAT_82.docx

Version: 1.0.23435

Page 49 of 87

Composition

Characteristic type

This option specifies whether the collection of measured values (variable) or the identification of the

number  of  detected  failures  (attributive)  is  used  for  the  inspection.  If  you  select  the  attributive

inspection,  use  the  input  type  to  define  whether  the  collection  should  be  based  on  a  catalog  or

whether the standard collection is performed. Further characteristic types are the inspection chart

and the information characteristic. If you select the inspection chart, you can enable the input type

visual  defects recording. The  information characteristic is only  used to display  a document during

the  inspection  process.  Subject  to  the  input  type,  the  lower  area  of  the  dialog  provides  the

respective sampling schemes.

Visual  recording:  The  characteristic  document  (not  the  inspection  requirement  document)  is

displayed with the position 1. This must be type FILE. The system supports these formats: JPEG,

JPG, PNG. To divide a graphic in different areas, you must define the grid for the x-axis and the y-

axis (e.g. A,B,C,D,E)

Inspection result base

This  setting  defines  whether  all  samples  or  only  the  sample  recorded  last  is  used  to  identify  the

inspection result (pass/fail).

Mandatory inspection

If this option is activated, you must enter at least one measured value for this characteristic, before

you can complete an inspection order including this characteristic.

Formula:

See chapter Calculation of formulas.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.formula".

Tab Details

Group Gage

Gage

Defines whether a gage or gage group is to be assigend to the characteristic:

Assignment of the gage (or gage group) to be used.

You  can  also  use  resources  of  resource

type  "PRM"  of

the  resource  management.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.gage".

Gage designation (name of test equipment)

Shows the name of the gage

MPL-GAT_82.docx

Version: 1.0.23435

Page 50 of 87

Composition

Group Properties

Certificate printing

The  selected  option  defines  whether  this  characteristic  is  to  be  printed  (display  selection  or  print

always)  or  not  (print  never)  when  certificates  are  printed  at  a  later  stage  (e.g.  acceptance,

inspection  certificate).  If  you  select  the  option  "display  selection",  a  list  of  the  characteristics  with

this printing option set is displayed prior to printing. In the list, these characteristics are preselected

for  the  print  of  a  certificate.  However,  this  selection  may  be  removed.  Finally,  all  selected

characteristics  and  the  characteristics  with  the  "print  always"  option  are  included  in  the  certificate

print.  Characteristics  with  the  "print  always"  option  do  not  appear  in  a  selection  list,  as  they  are

printed in any case. Please note that this option only affects certificate forms.

Failure weighting

If the inspection result for the characteristic is "fail", you can classify the result here for information

purposes.

Group Inspect

Analyseauswahlkatalog

Here,  you  can  select  an  analysis  selection  catalog.  The  catalog  restricts  the  selection  of  possible

failures you can enter (failure types, failure location, etc.). (All available failures may still be entered,

if you directly enter their number).

Designation of analysis selection

Shows the designations of analysis selection catalogs

Tab Specifications

Once the "specifications" tab has been selected, the  sample scheme and constructional measures may

be entered. In this context, it has to be considered that (as already mentioned) the definition of tolerance

limits  in  the  master  data  of  characteristics  is  only  reasonable  if  certain  conditions  are  met.  The  same

applies to the definition or calculation of action and warning limits. This section explains the possibilities in

detail.

Group Sampling scheme

Sampling scheme

The following sampling schemes are available:

  100% inspection





k value inspection

lot inspection

  n-c inspection

  SPC inspection

MPL-GAT_82.docx

Version: 1.0.23435

Page 51 of 87

Composition

The  sampling  scheme  defines  the  inspection  procedure.  In  case  of  an  n-c  inspection  and

parameters 5-0, 5 pieces are checked and 0 failures may be detected.

Find a more detailed description in section Sampling schemes.

Sample size/expected sample size

Specification  of  the  sample  size  (number  of  samples)  or  the  expected  sample  size  depending  on

the sampling scheme, see section Sampling schemes.

Acceptance quantity

Acceptance quantity for the n-c inspection, please also see section Sampling schemes.

Interval type

Input for SPC or n-c inspections: time, pieces, once, none. See chapter Sampling schemes .

Interval value

Specifies the interval subject to the interval unit.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

Interval unit

For n-c or SPC inspections, e.g. minutes, hours.

With output batch change

If the output batch changes, an inspection becomes due.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

  Note:

  The  option  With  output  batch  change  only  triggers  the  generation  of  an  inspection  point,  if  the

respective  change  of  the  output  batch  is  included  in  the  dialog  "Change  of  batches"  (dialog  ID:

CA_WL). For example, reel cutting dialogs do not generate inspection points.

With machine status change

If the machine status changes, an inspection becomes due.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

  Source status

Here, you can specify source statuses (specific non-productive machine statuses) – separated by

commas. If the machine then changes from a specified source status into a productive machine

status, an inspection becomes due.

MPL-GAT_82.docx

Version: 1.0.23435

Page 52 of 87

Composition

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

As of SP8, the following configurations are available in addition.

  The field is completely empty: For this characteristic, a machine status change always

generates an inspection point, if the machine changes from a non-productive into a

productive status.



"x-y", comma-separated: If the machine changes from source status x to target status y

(may be non-productive), an inspection point is generated for this characteristic.



"x-": If the machine changes from source status x to an arbitrary target status (may be non-

productive), an inspection point is generated.



"-y": If the machine changes from an arbitrary source status to target status "y" (may be

non-productive), an inspection point is generated.

With change of shifts

An inspection becomes due on changing shifts.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

Inspection due date of last off inspection

For details on the configuration of a last off inspection, refer to the section "Last off inspection".

Group Constructional measures

Unit

Pieces, meter, kg, etc. Unit of the characteristic. Allocate the units by using the unit catalog.

Decimal places

Number of decimal places. Leading zeros before the comma are not displayed in the specification

fields. By default, the number of decimal places defined in the system settings is pre-assigned.

Size (measure type)

Plausibility  and  tolerance  limits  can  be  entered  as  absolute,  relative  or  percentage  values.  Please

note  that  relative  or  percentage  lower  limits  (lower  tolerance  limit,  lower  process  limits)  must  be

specified with a negative algebraic sign.

Standard

Calculation of tolerances based on specific standards (e.g. ISO metric fits). Subject to the selected

standard, further information is requested (e.g. engineering fit). The system automatically calculates

the tolerance limits on the basis of these specifications.

MPL-GAT_82.docx

Version: 1.0.23435

Page 53 of 87

Fit

Calculation of tolerance limits on the basis of a specific standard and engineering fit. The selected

Composition

fit depends on the selected standard.

Upper PL

Specfies the upper plausibility limit

Upper TL

Specifies the upper tolerance limit (upper specification limit)

Target value

Specifies the target value

Lower TL

Specifies the lower tolerance limit (lower specification limit)

Lower PL

Specifies the lower plausibility limit

Generate failure (UTL)/(LTL)

If measured values  are recorded  and the checkbox  Generate failure  is enabled,  a violation  of the

limit  value  automatically  results  (in  the  background)  in  the  failure  type  "limit  value  violation"

(AUTO:TG>  or  AUTO:TG<).  This  option  is  not  available  for  attributive  characteristics,  as  the

specification is only used for information purposes in this case.

User fields tab

If you have defined user fields for characteristics, they are displayed and may be edited here.

Tab Chart 1/Chart 2

In tab chart1/chart2, you can define the control charts to be used. These control charts are later available

in  the  integrated  measurement  recording  and  in  the  measurement  recording  for  terminals  (SPCM).  You

can  define  a  total  of  two  different  control  charts.  Here,  you  can  store  for  each  control  chart  the  action

limits, warning limits and the mean value of variable characteristics. There are two different possibilities to

define these limit values. You can enter the limit values manually or the limit values are calculated using

the  specified  default  values  included  in  tab  Default  values  chart1/2.  For  further  information  on  control

charts,  refer  to  sections  12.2  Control  charts  for  variable  characteristics  and  12.3Control  charts  for

attributive characteristics.

Chart 1 / Chart 2

Specifies the control chart displayed in the measurement recording dialog on the terminal. You can

define action limits on the basis of the control chart type.

MPL-GAT_82.docx

Version: 1.0.23435

Page 54 of 87

Composition

Upper AL

Specifies the upper action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Upper WL

Specifies the upper warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

MV (Mean value)

Specifies a mean value, e.g. as basis for the automatic calculation of limits by the system.

Lower WL

Specifies the lower warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Lower AL

Specifies the lower action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Generate trend error

The option "generate trend error" has to be activated to be able to generate an automatic error if a

trend  exists  (e.g.  seven  values  in  a  row  are  descending  or  ascending,  the  number  of  values  is

defined  while  the  system  is  customized).  To  identify  a  trend,  the  samples  of  an  inspection  step

characteristic are checked, sorted by their sample number  – regardless of the machine where the

data has been recorded.

Generate error (UWL) / (LWL)

Enable  the  checkboxes  Generate  error  (UWL)  /  (LWL)  to  generate  automatically  (in  the

background) the failure type "Limit value violation" (AUTO:WG> or AUTO:WG<), if a limit value is

violated during the recording of measured values. Here, the violation of the limit value is identified

using the stored control chart. In case an xq chart is stored, the automatic error is only generated if

the respective xq value of the control chart, and not the single value, exceeds the warning limits.

Generate error (UAL) / (LAL)

Enable the checkboxes Generate error (UAL)) / (LAL) to generate automatically (in the background)

the failure type "Limit value violation" (AUTO:EG> or AUTO:EG<), if a limit value is violated during

the recording of measured values. Here, the violation of the limit value is identified using the stored

control chart. In case an xq chart is stored, the automatic error is only generated if the respective xq

value of the control chart, and not the single value, exceeds the action limits.

Tab Default values chart 1 / Default values chart 2

For further information on control charts, refer to sections Control charts for variable characteristics and

Control charts for attributive characteristics.

MPL-GAT_82.docx

Version: 1.0.23435

Page 55 of 87

Group Default for calculating limit values

Calculation type

Default  values  to  calculate  limit  values:  Cpk,  Sigma,  sq/an,  Rq/dn,  relative  deviation  from  xq,

Composition

deviation from xq in percent

Cpk

Default value of cpk

Sigma

Default value or calculated sigma value

Rq/sq (RQuer/sQuer)

Default value for Rq/sq (RQuer/sQuer)

Group Non-action probability

Action limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Warning limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Group Deviation from xq specification

rel. AL

Direct entry of the action limits (only visible with calculation types relative/percentage deviation).

rel. WL

Direct entry of the warning limits (only visible with calculation types relative/percentage deviation).

Group Confidence interval

Confidence interval

One-sided or two-sided. You can select one-sided or two-sided for the control charts R and s.

Group xq

XQ

Target  value,  mid-tolerance,  mean  value  of  xq  chart,  input  (only  visible  and  can  only  be  selected

with an xq control chart)

MPL-GAT_82.docx

Version: 1.0.23435

Page 56 of 87

Editing functions

The  below  screenshot  shows  an  example  of  an  editing  dialog.  Design  and  alignment  of  fields  may

deviate.

Composition

MPL-GAT_82.docx

Version: 1.0.23435

Page 57 of 87

Composition

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail application Documents

If  you  have  activated  the  tab  Documents,  you  can  assign  an  arbitrary  number  of  documents  to  each

characteristic.  If  this  tab  is  activated,  the  respective  buttons  in  the  toolbar  to  edit  the  documents  are

equally activated.

All  formats  registered  by  Windows  are  available  when  assigning  documents.  You  can  assign  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to  make  sure  to

install  a  program  that  is  able  to  display  the  used  format.  The  appropriate  program  linked  in  Windows

opens the documents.

The  file  types  "File",  "URL",  and  "Text"  are  available.  If  you  select  the  type  "file",  you  can  enter  the  file

name including path manually. Select the file type “URL” to access the internet or intranet. Select the file

type "text" to directly enter a text.

Note:

The  different  types  of  file  format  "URL"  that  the  shop  floor  client  supports  are  listed  in  the  respective

manual of the shop floor client. It might happen that "https" URL entries are displayed on the MOC, but

not on the AIP shop floor client.

MPL-GAT_82.docx

Version: 1.0.23435

Page 58 of 87

Composition

You  can  assign  a  designation/name  to  each  document.  You  can  also  define  the  list  order  of  the

documents. Use the field "position" to define the order (numeric input). Position numbers must be unique

in  this  list.  Enable  the  checkbox  Display  to  define  that  the  document  is  displayed  during  inspection

process.

Speaking of documents, you also have to decide if a document assignment without precise reference to

an article is reasonable. Normally, the document assignment depends on the article.

Taskbar Document

In addition to the standard functions, the application also provides the button to show documents.

Show documents

If  a  document  link  is  stored,  click  this  button  to  open  and  show  the  linked  document.  However,  a

program, which can show the linked file type, must be installed on the PC.

12.1  Sampling schemes

The  user  can  select  from  five  sampling  schemes  in  a  specified  list.  Subject  to  the  selected  sampling

scheme, some additional information has to be defined. It is subject to the subsequent use in the different

inspection  plan  areas  (e.g.  production,  goods  receipt,  goods  issue),  if  all  or  only  a  smaller  selection  of

sampling schemes is available.

Sampling  scheme  n-c  inspection:  The  sample  size  is  entered  in  the  "sample  size"  field  (=  n)  and  the

maximum  number  of  admissible  non-conforming  units  is  entered  in  the  "acceptance  quantity"  (=c)  field.

The figure "c" is defined as acceptance number. This means: if n = 50 und c = 1, the characteristic and

thus the piece is only classified as "fail" if two non-confirming units are identified (with sample size = 50).

Sampling scheme 100% inspection: In general, the sampling scheme 100% inspection is only used in

goods receipt and goods issue. The sample size is calculated from the actual quantity of the inspection

requirement and corresponds to it.

Sampling scheme SPC inspection: The sampling scheme "SPC inspection" nearly corresponds to the

"n-c" inspection plan. The only difference is that the acceptance limit "c" is not used in this case.

Sampling  scheme  batch  inspection:  In  the  standard  configuration,  the  sampling  scheme  "batch

inspection" only applies to the areas "goods receipt" and "goods issue". The percentage specifying how

much percent of the batch is to  be checked is entered here. Later in the inspection order characteristic

the sample size is calculated from the actual quantity of the inspection requirement and multiplied by the

specified percentage.

MPL-GAT_82.docx

Version: 1.0.23435

Page 59 of 87

Composition

If you must calculate action limits, you must enter the expected sample size here.

Sampling  scheme  k-value  inspection:  With  the  k  value  inspection  the  entered  k  value  is  checked

against the calculated k value and if this value is violated the sample is rated "fail".

12.2  Control charts for variable characteristics

For variable characteristics, the charts xq, s and R are available.

In statistical quality assurance, production dispersion is used for many calculations. One example is the

calculation  of  capability  indices  and  action  limits  of  a  quality  control  chart.  Vice  versa,  if  you  have

specified a process capability index, you can estimate the production dispersion and calculate the action

limits on this basis.

The  specifications  for  the  calculation  of  limit  values  can  be  found  in  the  tab  "default  values  chart  1"  or

"default values chart 2", where values to estimate the production  dispersion can be entered. The action

and warning limits can be calculated on the basis of these specifications. However, it is also possible to

enter the production dispersion directly. The system provides three calculation options.

You  first  describe  the  specifications  using  the  xq  and  s  chart.  The  differences  with  the  R  chart  are

explained in more detail in the sections that follow.

There is often a specification for the process capability index cpk. This specification is reasonable. If the

process  capability  index  cpk  is  respected,  you  can  then  produce  pieces  within  the  range  of  tolerance.

Based on the specified cpk value, the system calculates internally an estimated value for Sigma, which is

entered  to  the  right  of  the  option  "Sigma"  for  information  purposes.  The  estimated  basic  value  that  has

been calculated is used to calculate the limit values of the xq/s chart. The calculation is performed, once

further data has been entered using the Calculate button. The calculation method "cpk" is set by default.

In addition, there are also the calculation methods "sigma" and "sq/an".

The  cpk  value  of  1,33  ensures  that  99.725%  of  the  characteristic  values  are  within  the  tolerance.

However, it is often required that 99.994% of the characteristic values are within the tolerance limit, which

corresponds to a cpk value of 1.67.

MPL-GAT_82.docx

Version: 1.0.23435

Page 60 of 87

Composition

The  calculation  method  sq/an  means  that  an  estimate  of  the  standard  deviation  is  calculated  from  the

quotient of the medium standard deviation and a correction factor an. This correction factor depends on

the sample size, which is identified by the index n. The values for an are defined in the system and are

requested  automatically.  This  estimate  of  the  standard  deviation  is  best  in  case  that  there  is  no

specification  of  the  process  capability  index  and  the  production  dispersion  is  unknown  and  thus  the

specification  of  the  sq-value  has  still  to  be  corrected  by  a  correction  factor.  It  is  also  the  most  efficient

method under the given conditions.  You must specify  the sq-value to calculate the limit values later on.

Enter the value in the field on the right hand side of the option sq/an. If you click the button Calculate later

on, the estimate sq/an is calculated using the specified sq value. The result is entered on the right hand

side  of  the  option  Sigma for  information  purposes.  This  estimate  is  then  the  basis  for  the  calculation  of

action and warning limits of the xq/s chart

The third calculation method requires the specification of a sigma value. In this case it  is assumed that

sigma is known and consequently the correction factor is not required. Enter the Sigma value to the right

of the “sigma” option. In comparison to the previous method, sq/an is replaced by sigma. In the majority of

cases sigma is not known. Therefore, it is best to use the calculation method using the specified sq value

to automatically calculate the estimate sq/an for variances in case of doubt.

If  you  select  the  “relative  deviation  from  xq”  or  the  “deviation  from  xq  in  percent”  as  “specification  to

calculate limit values”, the input option for “action probability in %” disappears. Instead, you can enter the

“deviation from target value”. These values and the specified value of xq are then used to calculate the

limit values (target value, middle of tolerance, mean value of xbar chart, input).

Further details have  to be  made in order to identify action and  warning  limits of the xq chart.  You must

specify  an  xq  value.  The  system  offers  the  possibility  of  setting  the  xq  value  equal  to  the  middle  of

tolerance or the target value or of specifying a value manually. If the process is supposed to be aligned to

the mean value, the middle of tolerance should be preferred as xq value.

The  action  probability  must  be  entered  in  percent  in  order  to  calculate  action  and  warning  limits  of  the

xq/s-chart. For this purpose, you must first dedice, if you want to use one-sided or two-sided limit values

for the calculation. Selct one of the two options.

Once you have specified the option 'one-sided' or 'two-sided', enter the action probability in percent. The

possible and reasonable action probabilities are defined in the system and only need to be selected from

the list. For the xq-chart, the calculation is based on the standard distribution. For example, if 99.725% of

the characteristic values must be within the action limits, select the value 99.725. As the specification of a

sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

If  warning  limits  are  also  to  be  calculated,  an  action  probability  must  be  entered  here.  Note:  The

probability value of the warning limit must be lower than the action limit value.

MPL-GAT_82.docx

Version: 1.0.23435

Page 61 of 87

Composition

The sigma area is not displayed in the selection list, since the distribution of chi² is used to calculate the

limit values of the s-chart. Apart from that, the input is the same as for the xq chart.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

As already mentioned, the user can enter the limit values directly without any specified values.

If  the  R-chart  is  selected  instead  of  the  xq  or  s-chart,  the  option  sq/an  is  replaced  by  Rq/dn  in  the

specifications of the calculation. The estimate of sigma is now calculated using the specified mean range

R  divided  by  the  correction  factor  dn.  This  correction  factor  depends  on  the  sample  size  n.  The

corresponding values are defined in the system and are selected automatically. Apart from that, the rest

is the same as for the xq or s-chart. Note: In case of an R-chart, the calculation of the limit values is not

based on a chi² distribution, but on a table stored in the system, which is based on standardized ranges.

Notes:

  You can only use the calculation specifications "relative/percentage deviation from xq" if you use

an  xq  control  chart.  For  this  reason,  the  fields  of  the  group  "Xq"  are  only  visible,  if  you  have

previously selected the xq control chart.

  The user must select the confidence interval (one-sided/two-sided). Usually, you do not define a

lower limit for an s-chart. In this case, select "one-sided".



If only one of the two tolerance limits is available,  you cannot use the calculation method "cpk".

The calculation formula of the cpk method requires both tolerance limits.

12.3  Control charts for attributive characteristics

The p- and u-charts are available for attributive characteristics.

p identifies the proportion of defective units in the sample and u identifies the failures/defects per unit in

the sample. As to the p chart, it is important that each item is either defined as defect-free or defective. If

an item has several failures/defects it is only once referred to as defective.

In contrast to the variable characteristics, there are no lower limit values. Furthermore, it is normally not

necessary to state the values UTL, LTL and target value.

It is necessary to enter a pq or uq value in percent for the automated calculation of specifications. This

can be done in the default values tab.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

MPL-GAT_82.docx

Version: 1.0.23435

Page 62 of 87

Composition

Calculation  is  respectively  based  on  normal  distribution.  The  value  99,725  has  to  be  selected  if,  e.g.

99,725% of the characteristic values are supposed to lie below the upper action limit. As the specification

of  a  sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

12.4  Calculation of formulas

If  you store  a formula,  you can automatically calculate measured values  by  way of measured values or

statistical values of other characteristics that have been inspected before.

If the extension QMSingleValue.FormulaArguments is enabled, you have the possibility to use extensive

arguments  to  calculate  the  single  value  you  want  to  collect.  In  addition,  you  have  more  possibilities  to

access  specification  values  and  values  of  inspection  results  of  other  characteristics.  For  more  details,

refer to the section "".

If this extension is not enabled, you can only calculate characteristics using the inspection results of other

characteristics  that  have  already  been  entered.  Find  details  in  the  section  "Calculation  via  reference  to

other inspection results".

12.4.1  Operators, functions and constants

The following operators, functions and constants for calculating measured values are supported:

MPL-GAT_82.docx

Version: 1.0.23435

Page 63 of 87

Composition

Functions

abs(x)

atan(x)

cosh(x)

float(x)

sqrt(x)

acos(x)

Calculates the absolute value

Calculates the arc tangent

Calculates the hyperbolic cosine

Converts the value into a floating point number

Calculates the square root

Calculates the arc cosine

atan2(y,x)

Calculates the arc tangent of y/x

exp(x)

log(x)

sin(x)

tan(x)

asin(x)

cos(x)

int(x)

log10(x)

round(x)

Calculates the exponential value

Calculates the natural logarithm

Calculates the sine

Calculates the tangent

Calculates the arc sine

Calculates the cosine

Converts the value into an integer

Calculates the common logarithm

Rounds to integer value

round(x,y)

Rounds the value x to y decimal places

sinh(x)

tanh(x)

trunc(x)

trunc(x,y)

Operators

x + y

x – y

x / y

x * y

x ** y

Constants

pi

e

Calculates the hyperbolic sine

Calculates the hyperbolic tangent

Reduces the value x to an integer value

Reduces the value x to y decimal places

Addition

Subtraction

Division

Multiplication

Calculates x to the power of y

3.141592654

2.718281828

If constant numeric values are used in formulas, you must be careful not to use thousand separators. If

these  constants  are  floating  point  numbers,  be  careful  to  use  a  dot  as  decimal  separator  instead  of  a

comma.

MPL-GAT_82.docx

Version: 1.0.23435

Page 64 of 87

Composition

12.4.2  Formulas referring to other inspection results

Formulas  including  a  reference  to  other  inspection  results  are  always  calculated  when  an  inspection

result referenced in the formula is created, changed or deleted.

For these characteristics,  you must first specify  the level of the formula calculation.  The following types

are available:

  V – Calculation on the level of single values (Value).

For  each  single  value  of  the  characteristics  involved,  one  single  value  is  generated  for  the

calculated characteristic.

  S - Calculation on the level of samples (Sample).

For each sample of the characteristics involved, exactly one single value is generated for the

calculated characteristic.

  C - Calculation on the level of characteristics (Criteria).

Exactly  one  single  value  is  generated  for  the  calculated  characteristic  (with  respect  to  the

overall statistic of all characteristics involved)

The actual formula follows this identifier (see previous chapter).

The following syntax applies for the variables identifying the single values or statistical values of the order

characteristics involved [x:y:z].

The x parameter identifies the statistical value to be used. The available values are listed below. Please

bear in mind that the calculation level might cause restrictions.

  X – Single value

(is only available for calculations on the level of single values)

  AVG – Mean value

(is only available for calculations on the level of samples or characteristics)

  MIN – Minimum

(is only available for calculations on the level of samples or characteristics)

  MAX – Maximum

(is only available for calculations on the level of samples or characteristics)

MPL-GAT_82.docx

Version: 1.0.23435

Page 65 of 87

Composition

  SUMX – Sum of single values

(is only available for calculations on the level of samples or characteristics)

  R – Range

(is only available for calculations on the level of samples or characteristics)

  S – Standard deviation

(is only available for calculations on the level of samples or characteristics)

  N – Sample size

(is only available for calculations on the level of samples or characteristics)

  M – Number of samples

(is only available for calculations on the level of characteristics)

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

A  new  characteristic  is  calculated  from  the  single  values  of  the  characteristic  assigned  to  the

number "LENGTH”/”LAENGE" divided by 2.5. A corresponding single value is supposed to be

calculated  for  each  single  value  of  the  source  characteristic  (calculation  on  the  level  of  single

values).

 Formula: V: [X:INCR:LAENGE] / 2.5

MPL-GAT_82.docx

Version: 1.0.23435

Page 66 of 87

Composition

Example 2:

The  characteristic  "surface"  results  from  the  product  of  the  characteristics  with  the  characteristic

number  “LENGTH”/”LAENGE”  and  “WIDTH_TOTAL”/”BREITE_GES”.  A  single  value  of

the  characteristic  "surface"  is  supposed  to  be  calculated  for  each  single  value  of  both  source

characteristics (calculation on the level of single values).

 Formula: V: [X:INCR:LAENGE] * [X:INCR:BREITE_GES]

Example 3:

The  characteristic  "maximum  margin  width"  results  from  the  subtraction  of  the  minimum  of  the

characteristic "inside diameter" (OP sequence 10) from the maximum of the characteristic "outside

diameter"  (OP  sequence  20).  A  single  value  of  the  characteristic  "maximum  margin  width"  is

supposed to be calculated for each sample of both source characteristics (calculation on the level

of samples).

 Formula: S: [MAX:SENO:20] - [MIN:SENO:10]

For the calculation of formulas including references to other inspection results,  it is allowed to calculate

new  formula  characteristics  that  are  based  on  calculated  formula  characteristics.  However,  this  nesting

may  not  have  more  than  10  references  one  below  the  other.  Furthermore,  double  concatenations  must

not  be  created  (Example:  characteristic  A  is  calculated  from  characteristic  B  and  characteristic  C;

characteristic C is calculated from characteristic A).

12.4.3  Extended formulas

The extended formulas provide the following advantages compared to the formulas including references

to other inspection results:

  You can enter arguments for these characteristics that are used to calculate the measured value.

In most cases, you do not need to use other "source characteristics".

  On  saving  the  inspection  result,  the  measured  value  is  calculated  and  is  immediately  available.

You do not need to refresh the measured values in the AIP to see the measured values.

  For the calculation,  you can optionally use single values or sample or characteristic statistics of

other characteristics. You may combine these in any way.

  You can use variables for the target value, the upper and the lower tolerance limit of the current

characteristic or of other characteristics in the formula.

For this reason, you should primarily use the extended formulas.

MPL-GAT_82.docx

Version: 1.0.23435

Page 67 of 87

Composition

The  following  syntax  applies  for  the  variables  identifying  the  single  values,  statistical  or  specification

values of the order characteristics involved [x:y:z].

The  x  parameter  identifies  the  statistical  value  to  be  used.  The  available  values  are  listed  below.  Note:

Depending  on  the  respective  shop  floor  client  used,  it  is  possible  that  not  all  10  argument  fields  are

available.

  VAR1 – Argument 1 of the inspection result of the own inspection step characteristic

  VAR2 – Argument 2 of the inspection result of the own inspection step characteristic

  VAR3 – Argument 3 of the inspection result of the own inspection step characteristic

  VAR4 – Argument 4 of the inspection result of the own inspection step characteristic

  VAR5 – Argument 5 of the inspection result of the own inspection step characteristic

  VAR6 – Argument 6 of the inspection result of the own inspection step characteristic

  VAR7 – Argument 7 of the inspection result of the own inspection step characteristic

  VAR8 – Argument 8 of the inspection result of the own inspection step characteristic

  VAR9 – Argument 9 of the inspection result of the own inspection step characteristic

  VAR10 – Argument 10 of the inspection result of the own inspection step characteristic

  X – Single value of another characteristic

  AVG – Mean value of the sample of another characteristic

  MIN – Minimum of the sample of another characteristic

  MIN – Maximum of the sample of another characteristic

  SUMX – Sum of the single values of the sample of another characteristic

  R – Range of the sample of another characteristic

MPL-GAT_82.docx

Version: 1.0.23435

Page 68 of 87

Composition

  S – Standard deviation of the sample of another characteristic

  SREL – Relative standard deviation of the sample of another characteristic

  N – Sample size of another characteristic

  AVG_ALL – Mean value of all samples of another inspection step characteristic

  MIN_ALL – Minimum of all samples of another inspection step characteristic

  MAX_ALL – Maximum of all samples of another inspection step characteristic

  SUMX_ALL – Sum of the single values of all samples of another inspection step characteristic

  R_ALL – Range of all samples of another inspection step characteristic

  S_ALL – Standard deviation of all samples of another inspection step characteristic

  N_ALL – Total sample size of all samples of another inspection step characteristic

  M_ALL – Number of samples of another inspection step characteristic

  TV – Target value of an inspection step characteristic

  UTL – Upper tolerance limit of an inspection step characteristic

  LTL – Lower tolerance limit of an inspection step characteristic

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

MPL-GAT_82.docx

Version: 1.0.23435

Page 69 of 87

Composition

The characteristic number must not include any special characters. A minus sign "-" is

not permitted, for example.

  SELF – Identification of the own calculated characteristic

The characteristic that is to be calculated identifies itself. Only in this case, the parameter z is not

required.

Note: You may only use the identification of the own characteristic for the argument fields and for

the target value and the tolerance limits.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

The measured value of the current characteristic is calculated from the sum of the argument fields

1 to 4.

 Formula: [VAR1:SELF] + [VAR2:SELF] + [VAR3:SELF] + [VAR4:SELF]

Example 2:

The characteristic is the result of the product of the maximum measurements of the inspection step

characteristics  with  the  characteristic  numbers  'LAENGE’  and  'BREITE_GES’  ('LENGTH'

and 'WIDTH_TOTAL').

 Formula: [MAX_ALL:INCR:LAENGE] * [MAX_ALL:INCR:BREITE_GES]

Example 3:

The measured value is calculated from the sum of the following three summands:

  Content of argument field 1

  Middle of the tolerance of the current characteristic

  Sample mean value of the characteristic with OP sequence 10

  Formula:  [VAR1:SELF]  +  (([UTL:SELF]  +  [LTL:SELF])  /  2)  +

[AVG:SENO:10]

Note the following when using extended formulas:

MPL-GAT_82.docx

Version: 1.0.23435

Page 70 of 87

Composition

  Contrary  to  the  formulas  including  references  to  other  inspection  results,  the  measured  values

are not calculated when the "source characteristics" are changed. The measured values are only

calculated, if the inspection result of the respective calculated characteristic is explicitly collected

or changed (e.g. via the argument fields).

  When  the  inspection  result  is  saved,  the  system  must  be  able  to  identify  valid  values  for  all

variables  used  in  the  formula  (single  values,  sample  or  characteristic  statistics,  specification

values of other characteristics, all used arguments).

Otherwise, an error message occurs and the inspection result is not saved.

  You cannot directly edit the calculated measured value. The measured value is always the result

of a calculation.



If  you  use  the  parameter  [X:…],  the  respective  single  values  of  other  characteristics  are

searched for using the absolute single value and sample number. For the current characteristic,

the parameter [X:…] is not available.



If  you  use  the  statistical  parameters  [MAX:…],  [MIN:…],  [AVG:…],  [SUMX:…],  [R:…],

[S:…] , [SREL:…] or [N:…], the respective statistical values are searched for using the

absolute sample number. Here, you cannot use statistical parameters of the own characteristic.



If you want to use the statistical parameters of the complete characteristic using the parameters

[MAX_ALL:…],

[MIN_ALL:…],

[AVG_ALL:…],

[SUMX_ALL:…],

[R_ALL:…],

[S_ALL:…], [M_ALL:…] or [N_ALL:…], only the data of other characteristics is available

(not the data of the own characteristic).

  Via  customization,  extensions  can  be  made  available

to  obtain  any  variables

in

the

syntax[VAR:<Object>:<Identifier>].

  You cannot use characteristics that include extended formulas as sources to calculate formulas

including  references  to  other  inspection  results.  But  you  can  use  these  characteristics  for  other

characteristics with extended formulas.

12.4.4  General notes on calculated characteristics

If  unknown  variables  are  used  within  a  formula  (faulty  parameters  x  and/or  y),  the  escalation

CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE is triggered.

If  problems  occur  on  assigning  an  identified  value  to  a  variable  of  the  formula,  the  escalation

CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE is triggered.

Both actions described require the escalation management license.

Tool numbers, machine numbers, cavity numbers or similar information are not stored for the calculated

single values.

MPL-GAT_82.docx

Version: 1.0.23435

Page 71 of 87

Composition

To  transfer  a  corresponding  number  (batch  number,  sample  number,  serial  number,  etc.),  all  source

samples of the calculation must be assigned the same number. If there is no number that is assigned to

all source samples, you cannot assign a number to the calculated sample. If several numbers are found

that have been assigned to all source samples, only the first number found is assigned to the calculated

sample.

This function only applies to numbers, which have been assigned on sample level.

12.5  Last off inspection

As part of the function extension for the in-production inspection, the function of the last off inspection is

available.  For  this  function,  you  must  have  created  the  CAQ  system  option  1222  manually  as  a

precondition.  For  details,  refer  to  the  procedure  document  "Configuration_QM_Options.pdf".  The

documentation  of  the  CAQ  system  option  specifies  which  characteristic  user  fields  must  be  created

(master data characteristic, inspection plan characteristic and inspection step characteristic), so that you

can specify a characteristic for a last off inspection.

To  specify  a  characteristic  for  a  last  off  inspection,  the  user  field  of  the  last  off  inspection  must  have  a

content.

The  function  "Last  off  inspection"  is  not  offline  capable.  And  you  cannot  use  the  last  off

inspection with operations that are specified as Inspection OP via processing code.

If the operation is  logged off or interrupted in  offline  mode, the  buffered activities/postings are

processed  one  after  the  other  when  the  online  mode  is  restored.  This  has  the  effect  that  the

operation is logged off or interrupted although the last off inspection is missing.

The processing code generally defines if any check for a defined last off inspection is performed

at all during logoff/interruption. If the processing code in tab Quality is set to Inspection OP, no

check and no last off inspection is performed.

If an inspection step has been "logged on" with the logon of an operation on the AIP, the system

proceeds as follows for the last off inspection when the operation is logged off or interrupted.

1.  The system checks if an inspection point with cause for creation Last off inspection exists for this

inspection step at the workplace in question. It does not matter if the inspection point is

completed or not. If the check is also performed with an interruption, the system checks if an

inspection point with cause of creation Last off inspection has been created since the last logon.

If an inspection point is found, the operation is interrupted or logged off.

2.

If no inspection point is found in item 1, the system checks if the relevant inspection step logged

on includes characteristics with the inspection due date Last off inspection. If this is not the case,

the operation is logged off or interrupted.

MPL-GAT_82.docx

Version: 1.0.23435

Page 72 of 87

Composition

3.

If the processes described in item 1 and 2 have the result that an inspection point must be

created with the cause of creation Last off inspection, the following message is shown:

Last off inspection is missing!

Enforce posting using the option "posting required"?

Using the option Posting required, you can perform the logoff/interruption without having made a

last off inspection. Use the CAQ system option 1154 to activate the logoff/interruption using the

option Posting required.

4.

If the operation is not logged off or interrupted because of the missing inspection point with the

cause of creation Last off inspection, you must go to the inspection to create an inspection point

with the cause of creation "Last off inspection". You can use the option Last off inspection in the

inspection list on the level Inspection step to create an inspection point with cause of creation

Last off inspection.

If you try to log off or interrupt the operation that includes an inpsection point with cause of creation  Last

off inspection that has not been completed, the standard processes apply. This means that the operation

can  optionally  be

logged  off  or

interrupted  although

the

last  off

inspection  has  not  been

performed/completed using the option "Posting required".

MPL-GAT_82.docx

Version: 1.0.23435

Page 73 of 87

Composition

13 Composition

Summary

Menu

Material management  Composition  Composition

Transaction code

comp

Function authorization

comp

Usage

You  use  the  "composition"  application  to  control  planning,  monitoring  and  execution  of  the  melting

process. This application includes the following functions:

  Generation of charging orders

  Performance  of  composition  planning  based  on  existing  and  advised  stocks  as  well  as  the

planned bottom sump

  Reservation of the planned material for the planned melt

  Generation of a charging list

  Release for material provision (perform charging)

  Execution of composition based on the provided materials and the actual bottom sump

  Checking of the theoretical analysis

  Saving of theoretical analyses

  Display of the target analysis including tolerances and restrictions



*Execution of charging and sampling at the terminal*

  Comparison  of  actual  analysis  and  target  analysis  by  identifying  the  elements  using  traffic  light

colors.

  Performance of re-composition

The configuration of composition functions are described in the relevant procedure.

Selection criteria

The following selection criteria are available in the application:

Category "charging order"

The  selection  criteria  of  this  category  have  been  designed  to  restrict  data  in  the  detail  application

"charging orders".

Order

Charging order

MPL-GAT_82.docx

Version: 1.0.23435

Page 74 of 87

Composition

Order status

Order status of the charging order

Finished article

Finished article of the charging order

Machine

Planned melting aggregate

"Dates" category

The  selection  criteria  of  this  category  have  been  designed  to  restrict  data  in  the  detail  application

"charging orders".

Basic start date / basic end date

Temporal restriction using basic dates

Scheduled start/scheduled end

Temporal restriction by scheduling

Category "input material"

The  selection  criteria  of  this  category  have  been  designed  to  restrict  data  in  the  detail  application

"inventory of permitted materials".

Material

Input material.

Material designation

Designation of input material.

Material buffer

Material buffer to identify the material

Material type

Material type for classification

Category "options"

The  selection  criteria  of  this  category  have  been  designed  to  restrict  data  in  the  detail  applications

"inventory of permitted materials" as well as "charging orders".

Show additional material only

If  this  option  is  enabled,  the  detail  application  "inventory  of  permitted  materials"  will  only  show

materials configured as "additional materials" for the output material (finished article of the charging

order) that is to be produced by the charging order.

MPL-GAT_82.docx

Version: 1.0.23435

Page 75 of 87

Composition

Show permitted material only

If  this  option  is  enabled,  the  detail  application  "inventory  of  permitted  materials"  will  only  show

materials  configured  as  "permitted  input  materials"  for  the  material  that  is  to  be  produced  by  the

charging order.

Absolute values for materials

Displays quantities as absolute values or in percent in the detail application "inventory of permitted

materials".

Absolute values for order materials

Displays quantities as absolute values or in percent in the detail applications "selected materials",

"composition recipe" and "samples".

Detail application "charging orders“

The detail application "charging orders" shows the list of charging orders.

Charging order

The  charging  order  is  indicated  with  planned  order,  finished  article  as  well  as  target  quantity  and

unit.

Planning

Shows the planned dates as well as the melting aggregate

Status

Shows the order status as well as composition status. The composition status results from the last

sample taken for this charging order. If this sample is ok ("pass") the composition status is green; if

it is not ok ("fail") the status is red.

Price

Shows the average price per kg in € for the material to be produced, the current price per kg in € as

well as the total price in €.

Miscellaneous

Displays  the  scrap  rate  relating  to  the  selected  materials  and  their  properties  configured  in  the

material master. The column is highlighted in red if at least one formula for checking the scrap rate

is not met. It is highlighted green if all defined formulas are met.

Shows the weight and max. capacity of the melting aggregates used in the order.

Detail application "inventory of permitted materials"

Subject  to  the  entered  selection  criteria,  the  list  only  shows  materials  that  are  permitted  for  the  output

material or materials that are permitted and have been defined as additional material.

MPL-GAT_82.docx

Version: 1.0.23435

Page 76 of 87

Composition

Only will material be taken into account that has been assigned to a casting buffer and to a material type

that has been defined as anonymous material (inventory management).

Available quantity

Remaining quantity of a material that is in the batch status "free" and that has not been reserved.

Advised quantity

Remaining quantity of a material that is in the batch status "advised".

Reserved quantity

Remaining quantity of a material that is in the batch status "free" and that has been reserved.

Detail application "selected materials"

This detail application shows the assigned materials.

Input type

Current  bottom  sump:  material  that  can  currently  be  found  in  the  output  buffer  of  the  machine

(melting aggregate). The material is determined by the function "adjust bottom sump".

Planned bottom sump material that will be available in the machine's output buffer. The material is

determined by the function "adjust bottom sump".

Reserved: material which has been assigned manually using the function "assign material".

BOM item

Planned bottom sump material or the current bottom sump is indicated by the BOM item "0". The

material is assigned the BOM item "1" at first. Once charging has been performed and confirmed at

the AIP terminal, all materials pertaining to this BOM item are grayed out and the BOM item "1" is

blocked. Further materials are now assigned to the next BOM item. Consequently, the current BOM

item is blocked every time charging has been performed and the BOM item is increased by one if

further materials are added.

Material, designation

Material

Target quantity

Target quantity planned for the production of the finished material. This quantity can be changed by

double clicking or the shortcut <Ctrl + Q>. All calculations (formulas, samples: theoretical analysis,

charging orders: composition status and scrap rate) are based on the target quantity.

Reserved quantity

Actually  reserved  quantity  that  has  been  reserved  using  the  function  "perform  reservation"  within

the batch stock.

Consumed quantity

Actual quantity that has already been consumed and placed in the melting aggregate.

MPL-GAT_82.docx

Version: 1.0.23435

Page 77 of 87

Composition

Editor, editing time

The user who has performed the assignment is entered here. The editing time is updated, once the

charged material has been confirmed at the AIP terminal.

Detail application "composition recipe"

This  detail  application  shows  the  composition  recipe  for  the  material  (finished  article)  of  the  selected

charging order. The components/elements are indicated with target quantity ("composition recipe" row) as

well as with the upper and lower tolerance limits ("upper/lower tolerance limit" rows).

Detail application "formulas“

This detail application shows the composition restrictions for the finished material and the results of the

corresponding formula. If the formula is true, the fields are highlighted in green; in any other case they are

red.

Formulas are calculated based on the latest sample, i.e. on the current composition of the material (from

the analysis process determining the make-up of the sample) and the quantity that is actually entered with

this sample at the AIP terminal. All materials assigned after sampling and that have not yet been charged

are  considered  with  the  relevant  target  composition  and  target  quantity.  All  materials  that  have  been

charged  and  confirmed  at  the  AIP  terminal  after  taking  the  sample  are  considered  with  the  target

composition and the consumed quantity. The calculation is based on all assigned materials, provided that

a sample has not yet been taken.

Detail application "Samples"

This detail application shows the samples with the respective sample ID, date and time as well as status

(PPKT_NIO=inspection  point  failed,  PPKT_IO=inspection  point  pass).  The  share  of  each  element  is

shown and evaluated (green = value within tolerance limits, yellow = value below the lower tolerance limit,

red = value above the upper tolerance limit).

A  theoretical  analysis  is  shown  additionally  referring  to  the  last  sample  (provided  that  samples  have

already been entered) and its current composition as well as to the materials assigned subsequently that

might have been charged already - just as it is also the case for the calculation of formulas.

MPL-GAT_82.docx

Version: 1.0.23435

Page 78 of 87

Once  the  charging  order  has  been  released,  the  theoretical  analysis  is  saved  as  the  "release  analysis"

Composition

("theoretical analysis for the release").

Toolbar

Start composition

    Generate charging order

Provided  that  no  charging  order  exists  for  a  melting  order,  this  function  can  be  used  to  generate

one.

    Start composition for charging order

In case a charging order exists or has been generated, composition is started for the charging order

by  using  the  function  of  the  same  name.  Data  of  the  charging  order  and  of  the  assigned  melting

order are shown.

Material reservations

    Assign material

Inserts the material or materials selected in "inventory of permitted materials" with the quantity 0 kg

for  the  selected  charging  order  in  the  "list  of  charging  orders".  The  material  cannot  be  assigned,

provided that the BOM item has already been assigned this material and has not yet been blocked

(by confirming the charging process at the AIP terminal).

Change quantity

Changes  the  target  quantity  of  a  selected  material.  This  editing  dialog  cannot  be  opened  via  the

quick launch bar. It can only be opened by double clicking a row of the detail application "selected

materials" or the shortcut <Ctrl+Q>

The quantity can only  be changed if the  new quantity is greater than or equal to the quantity that

has  already  been  consumed/used.  If  this  is  not  the  case,  the  user  will  be  informed  by  an  error

message.

The  quantity  cannot  be  changed  if  the  BOM  item  is  blocked,  i.e.  the  charging  process  has  been

confirmed for all materials of this current BOM item at the AIP terminal.

    Perform reservation / perform reservation (including material)

This  function  reserves  materials  for  the  selected  charging  order.  Consequently,  the  required

quantities of materials are reserved for this charging order (if available in sufficient quantities) and

cannot be used for any other charging order. The reservation applies for all unblocked entries of the

order's component list by using the function "perform reservation". As an alternative, it can only be

performed  for  the  transferred  material  by  using  the  function  "perform  reservation  (including

material)".

MPL-GAT_82.docx

Version: 1.0.23435

Page 79 of 87

Composition

    Cancel reservation / cancel reservation (including material)

The reservation of materials is canceled for all unblocked entries of the order's component list using

the  function  "cancel  reservation"  or  only  for  the  selected  material  using  the  function  "cancel

reservation  (including  material).  A  reservation  can  only  be  canceled  completely,  provided  that

material has not yet been consumed.

    Adjust bottom sump

This function transfers the material of the batch that is currently within the furnace (current bottom

sump)  to  the  currently  active  composition.  In  this  case,  the  current  bottom  sump  quantity  is  also

taken over. The theoretical values (planned bottom sump) assumed up to now  and resulting from

the sequence of orders are overwritten by current information. The bottom sump can no longer be

adjusted, once the first charging process has been performed and confirmed at the AIP terminal.

    Copy recipe

This  function  copies  the  recipe  from  one  charging  order  to  the  other.  The  reservation  can  be

performed afterwards.

Release

    Release of charging order

Once  the  charging  order  has  been  released  and  the  materials  have  been  selected,  the  order  is

available for execution in production. The "theoretic analysis" presented in the samples is saved as

the "release analysis".

    Charging list

The charging list can be printed for the released charging order. This list includes the melting order,

charging order and a list of required materials.

Further functions

    Reuse

If the required material cannot be achieved by adding material (as the melting aggregate's capacity

would, for example, be exceeded), the charging order can be assigned to another or new melting

order.

    Melting report

The melting report outputs all pieces of information referring to the melting process:

  Charging order

  Assigned material and quantity in kg

  Composition recipe

  Current analysis including samples and theoretical analysis

MPL-GAT_82.docx

Version: 1.0.23435

Page 80 of 87

Composition

MPL-GAT_82.docx

Version: 1.0.23435

Page 81 of 87

Composition

14  Composition - AIP

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 82 of 87

Composition

14.1  Perform charging

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 83 of 87

14.2  Confirm charging

The  current  list  of  materials  is  shown  again  to  confirm  charging.  Besides  the  badge  number,  no  further

input is required.

Composition

Figure: Confirm charging – C_CHCF

Once  confirmed,  the  materials  from  the  input  buffer  are  posted  onto  the  machine's  output  buffer.  The

reservation of remaining quantities of materials reserved for the charging order is cancelled.

MPL-GAT_82.docx

Version: 1.0.23435

Page 84 of 87

14.4  Take sample

A sample is taken to check the actual composition of the melt.

Composition

Figure: Take sample – C_CHTS

Using this dialog, a sample number is assigned by the HYDRA server and returned as the result to the

terminal. A label that includes the sample number is printed. Consequently, the relevant label has to be

configured and assigned to the dialog C_CHTS.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

MPL-GAT_82.docx

Version: 1.0.23435

Page 85 of 87

14.5  Cast

Casting means to withdraw a (partial) quantity from the melt.

Composition

Figure: Casting – C_CHCA

The  withdrawn  quantity  and  the  target  buffer  to  which  this  quantity  is  posted  are  entered  in  this  dialog.

The terminal determines the batch number automatically, provided that the "automatic generation of the

batch number" has been enabled in the "MPL" tab of the workplace configuration.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

MPL-GAT_82.docx

Version: 1.0.23435

Page 86 of 87

14.6

Implementation / configuration

The dialogs C_CHPF, C_CHCF, C_CHTS and C_CHCA have to be available at the terminal. The buttons

in ctaipbut.ini are configured by using the same IDs:

Composition

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

MPL-GAT_82.docx

Version: 1.0.23435

Page 87 of 87

