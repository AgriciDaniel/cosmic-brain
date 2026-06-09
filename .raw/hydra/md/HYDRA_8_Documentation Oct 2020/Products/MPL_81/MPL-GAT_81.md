Manual

Composition
MPL-GAT 8.1

Version 1.0.54

Last changed on: 19.06.2020

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 2 of 59

Composition

Contents

1  Composition ................................................. Error! Bookmark not defined.

2  Setup of Composition ................................................................................... 8

3  Composition Procedure / Recomposition ................................................... 16

4  Composition Recipe ................................................................................... 20

5  Material Usage Restrictions ....................................................................... 25

6  Permitted Input Materials ........................................................................... 28

7  Material Master .......................................................................................... 31

8  Work Plan - Edit Order Components.......................................................... 35

9  Work Plan - Edit Production Resources & Tools ....................................... 37

10  Edit Order Components ............................................................................. 39

11  Edit Production Resources and Tools ........................................................ 43

12  Composition ............................................................................................... 46

13  Composition - AIP ...................................................................................... 54

13.1  Perform charging ............................................................................................... 55

13.2  Confirm charging ............................................................................................... 56

13.4  Take sample...................................................................................................... 57

13.5  Cast .................................................................................................................. 58

13.6

Implementation / configuration .......................................................................... 59

MPL-GAT_81.docx

Version: 1.0.18468

Page 3 of 59

Composition

1  Composition

Summary

General

Composition means the chemical make-up of input materials that are melted down in foundry to produce

a  defined  alloy.  Furthermore,  composition  makes  sure  (by  calculation)  that  the  chemical  composition  of

the  alloy  can  be  achieved  by  adding  as  few  ingredients  as  possible  taking  into  account  the  current

material stock. The objective is to use materials in a cost-effective manner in the production process.

Possible fields of application

The function package "composition" supplements the function packages "shop floor data collection" and

"material and production logistics" by functions to manage recipes, optimize material usage and analyze

materials for the production of alloys.

Implementation notes

The function package "composition" is used if

  You  would  like  to  define  and  manage  composition  recipes  for  the  production  of  alloys  in  the

system.

  You would like to use the composition function

o  as an analysis tool to make sure by calculation that the chemical composition of the melt

matches the target specifications of an alloy.

o

to plan material usage for the production of alloys taking into account the actual material

stock.

Functions

  Configuration of the material master

  Configuration of the composition recipe

  Configuration of restricted material usage

  Configuration of permitted materials

  Composition/re-composition

  Charging process at the terminal

o  Log order on

o  Perform charging

o  Confirm charging

o  Sample taking

MPL-GAT_81.docx

Version: 1.0.18468

Page 4 of 59

Composition

o  Cast

Integration

The  sections  that  follow  describe  the  functional  connection  of  individual  components  and  functions

necessary to perform composition in the system.

Orders/OP

The following orders/OPs are used in MES, in particular in connection with composition. They each have

a special order type and differ from common production orders/OP.

  Melting order

Normally, "melting orders" are transferred from the ERP system to MES. They include the

quantity as well as alloy to be produced.

  Charging order

If the melting order exists in MES, a "charging order" may be generated from it (composition -->

generate charging order). Primarily, it has been copied from the melting order and takes over the

relevant data.

The generated charging order is shown in the list of charging orders within the function

"composition".

MPL-GAT_81.docx

Version: 1.0.18468

Page 5 of 59

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

All materials available in stock will be shown if selection within the composition function is not restricted to

the permitted input materials.

Several additional restrictions (formulas) may be defined by the function "material usage restriction". They

will also be shown in the composition function. But restrictions can only be used optionally.

Material stock/ Material master

All materials used in composition have to be defined (anonymously, without batch reference) in the MES

material master.

Defined materials are:

  Chemical elements: they are used as inspection characteristic within the composition recipe.



Input materials: These can be:

MPL-GAT_81.docx

Version: 1.0.18468

Page 6 of 59

Composition

o  Raw material

o  Alloys

o  Scrap/recycling material (alloys)

  Target alloys

The MES keeps the inventory of materials defined in the material master.

MPL-GAT_81.docx

Version: 1.0.18468

Page 7 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 8 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 9 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 10 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 11 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 12 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 13 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 14 of 59

Composition

MPL-GAT_81.docx

Version: 1.0.18468

Page 15 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 16 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 17 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 18 of 59

Composition

MPL-GAT_81.docx

Version: 1.0.18468

Page 19 of 59

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

The paragraph  that follows shows some of the available selection criteria. Self-explanatory filter options

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 20 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 21 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 22 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 23 of 59

Composition

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A designation may be assigned to each defined document. Moreover, it may also be determined in which

order  the  documents  are  to  be  listed.  The  "position"  field  is  used  for  this  purpose  (numeric  input).  The

specifications made within this list must be unique. In addition, the checkbox "display during inspection"

specifies whether or not the document may be shown during the inspection process.

MPL-GAT_81.docx

Version: 1.0.18468

Page 24 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 25 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 26 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 27 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 28 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 29 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 30 of 59

Composition

7  Material Master

Summary

Menu

Master data --> Material --> Material master

Transaction code

matc

Function authorization  matc

Utilization

This function can be used for the creation of a material master of the materials in use within the system.

Integration

The material master has been designed to edit materials. This refers to especially defined master data.

The material data defined there are used, among other things, by the composition function or e-kanban

systems.

Prerequisite

The  material  type  and  material  buffer  already  have  to  be  available  in  the  system,  when  creating  the

master data for a material.

Selection criteria

The following selection criteria are available in the application:

"General" tab

Material number

Material number

Drawing issue number

Drawing issue number of the material, also often referred to as index

Designation

Designation of the material

Inactive

Inactive, active materials. The checkbox is not enabled by default.

"Composition" tab

Scrap material

MPL-GAT_81.docx

Version: 1.0.18468

Page 31 of 59

Composition

Selects materials identified as scrap material

End product

Selects materials identified as end products

Input material

Selects materials identified as input material. The checkbox is enabled by default.

"Kanban" tab

The user authorization "kov" is required for displaying these fields.

Kanban material

Selects the materials used in the kanban process.

"User fields" tab

This  tab  enables  the  selection  based  on  the  user  fields  defined  for  the  object  type  "ARTIKEL“  and  the

user field key "SYSTEM“.

Field descriptions

Material number

Material number

Drawing issue number

Drawing issue number of the material, also often referred to as index

Designation

Designation of the material

Material type

Material type of the material

Specific weight

The specific weight of the material in the unit g/mm³

Inactive

Inactive, active materials. The checkbox is not enabled by default.

MPL-GAT_81.docx

Version: 1.0.18468

Page 32 of 59

Input material

The material is an input material of the composition. This option has to be enabled for materials

Composition

used in composition.

Scrap material

Identifies a material as scrap material

Material buffer

Material buffer of the material

Fragmented size

The fragmented size of the material in kg.

Price

The price of the material in €/kg

End product

Identifies a material as end product of composition

"Kanban" tab

The user authorization "kov" is required for displaying these fields.

Kanban material

Identifies a material as kanban material

User fields tab

User  fields  offer  the  possibility  to  store  further  customer-specific  information  to  MES  besides  the  fields

available in MOC standard. The tab provides eight sub tabs each of which providing eight user fields. The

so called user field key determines which user fields are involved and which meaning they have.

Object type

Default "ARTIKEL“

User field key

Default "SYSTEM“

User fields

The following user fields are available after customizing the system:

Field data type

Date

Number of
fields
6

MPL-GAT_81.docx

Version: 1.0.18468

Page 33 of 59

Composition

Field data type

Number of
fields
16

6
16
6

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

length

length

field,

field,

14

2

User field keys are not defined by default in the system. The system has to be customized accordingly to

be able to support this kind of user fields.

Toolbar

 Composition recipe

This function opens the relevant composition recipe for the selected material.

MPL-GAT_81.docx

Version: 1.0.18468

Page 34 of 59

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

The fields pertaining to production resources and tools are described here

Editing functions

Please use the available buttons to create new or edit existing work plan components. A copy function for

components is not planned.

Please note that the BOM item must be unique within the operation if HYDRA-MPL is in

use!

Toolbar

Edit operations

Function authorization: edwop

Opens  the application Work plan – edit operations.

MPL-GAT_81.docx

Version: 1.0.18468

Page 35 of 59

Composition

Edit orders

Function authorization: edwor

Opens  the application Work plan – edit orders.

MPL-GAT_81.docx

Version: 1.0.18468

Page 36 of 59

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

resource and tool that is  not of the resource type "DNC" or "MAT" is taken over into the "tool"

field of the operation. In addition, the "tool" field is checked whether it already includes a value,

when inserting a production resource and tool that is not of the "DNC" or "MAT" resource type.

If this is not the case, this component is taken over. For this reason, it is recommended to insert

MPL-GAT_81.docx

Version: 1.0.18468

Page 37 of 59

Composition

the "main production resource & tool" at first in the list of production resources and tools.

Please note with regard to documents: If a new document is assigned to an operation a  file is

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 38 of 59

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

Materials required for manufacturing an article/item are assigned to an  operation or order as "(material)

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 39 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 40 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 41 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 42 of 59

Composition

11  Edit Production Resources and Tools

Summary

Menu

Order management  Order management  Edit production resources and
tools

Transaction code

edres

Function authorization

edres

Usage

Resources can be defined at operations in the list of production resources and tools.

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

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource type must be known in the system. Predefined resource types must be chosen from the

selection  menu.  Additional  resource  types  can  be  defined  when  customizing  HYDRA.  For

documents, the resource type to be entered here must be DOC.

Resource

Enter the resource number (material number) of the production resource or tool.

MPL-GAT_81.docx

Version: 1.0.18468

Page 43 of 59

Composition

Designation

Here, you can enter a name for the production resource.

Comment 1/ C\comment 2

These are comment fields.

Required quantity/ U\unit

Resource quantity required to carry out the operation. When planning the operation in HYDRA shop

floor scheduling (HLS), this number of resources is entered in terms of capacities. The quantity unit

is only used as a comment.

Please  note:  In  HYDRA  shop  floor  scheduling  (HLS),  the  quantity  0  is  interpreted  implicitly  as

quantity 1.

Path

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined  in  the  path  configuration  (menu:  File  >  System  administration  >  Paths).  No  path  must  be

stored for DNC resources; it is determined based on the path stored for the resource type. The field

should be left empty for all other production resources.

File

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined in the path configuration.

No file name must be stored for DNC resources; it is determined based on the file name defined for

the resource. The field should be left empty for all other production resources.

Modified by/ date/ time

Editor as well as the date and time the last change was made.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

MPL-GAT_81.docx

Version: 1.0.18468

Page 44 of 59

Composition

Toolbar

 Edit operations

Calls up the application Edit operations.

 Edit orders

Calls up the application Edit orders.

 Order information

Calls up the application Order information.

MPL-GAT_81.docx

Version: 1.0.18468

Page 45 of 59

Composition

12 Composition

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 46 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 47 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 48 of 59

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

Planned bottom sump material or the current bottom sump is  indicated by the BOM item "0". The

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 49 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 50 of 59

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

The quantity  can only  be changed if the  new quantity is greater than or equal to the quantity that

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 51 of 59

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 52 of 59

Composition

MPL-GAT_81.docx

Version: 1.0.18468

Page 53 of 59

Composition

13  Composition - AIP

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 54 of 59

Composition

13.1  Perform charging

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 55 of 59

13.2  Confirm charging

The  current  list  of  materials  is  shown  again  to  confirm  charging.  Besides  the  badge  number,  no  further

input is required.

Composition

Figure: Confirm charging – C_CHCF

Once  confirmed,  the  materials  from  the  input  buffer  are  posted  onto  the  machine's  output  buffer.  The

reservation of remaining quantities of materials reserved for the charging order is cancelled.

MPL-GAT_81.docx

Version: 1.0.18468

Page 56 of 59

13.4  Take sample

A sample is taken to check the actual composition of the melt.

Composition

Figure: Take sample – C_CHTS

Using this dialog, a sample number  is assigned by the HYDRA server and returned as the result to the

terminal. A label that includes the sample number is printed. Consequently, the relevant label has to be

configured and assigned to the dialog C_CHTS.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

MPL-GAT_81.docx

Version: 1.0.18468

Page 57 of 59

13.5  Cast

Casting means to withdraw a (partial) quantity from the melt.

Composition

Figure: Casting – C_CHCA

The  withdrawn  quantity  and  the  target  buffer  to  which  this  quantity  is  posted  are  entered  in  this  dialog.

The terminal determines the batch number automatically, provided that the "automatic generation of the

batch number" has been enabled in the "MPL" tab of the workplace configuration.

The “quantity“ field  is assigned the quantity  of the  output buffer by  default. This requires, however, that

the terminal is connected online with the HYDRA server.

MPL-GAT_81.docx

Version: 1.0.18468

Page 58 of 59

13.6

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

MPL-GAT_81.docx

Version: 1.0.18468

Page 59 of 59

