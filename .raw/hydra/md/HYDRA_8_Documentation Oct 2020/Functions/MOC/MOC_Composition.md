Composition

1  Composition

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

MOC_Composition.docx

Version: 1.1.18468

Page 1 of 7

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

MOC_Composition.docx

Version: 1.1.18468

Page 2 of 7

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

MOC_Composition.docx

Version: 1.1.18468

Page 3 of 7

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

Planned bottom sump material or the current  bottom sump is indicated by the BOM item "0". The

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

MOC_Composition.docx

Version: 1.1.18468

Page 4 of 7

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

MOC_Composition.docx

Version: 1.1.18468

Page 5 of 7

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

MOC_Composition.docx

Version: 1.1.18468

Page 6 of 7

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

MOC_Composition.docx

Version: 1.1.18468

Page 7 of 7

