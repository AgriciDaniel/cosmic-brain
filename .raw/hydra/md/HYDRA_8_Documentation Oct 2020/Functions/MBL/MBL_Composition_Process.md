Composition Procedure / Recomposition

1  Composition Procedure / Recomposition

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

MBL_Composition_Process.docx

Version: 1.0.18468

Page 1 of 3

Composition Procedure / Recomposition

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

MBL_Composition_Process.docx

Version: 1.0.18468

Page 2 of 3

Composition Procedure / Recomposition

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

MBL_Composition_Process.docx

Version: 1.0.18468

Page 3 of 3

