Weighing of Components

1  Weighing of Components

Summary

Some production areas require components to be weighed using scales and to provide them for further

production processes.

Usage

The  function  is  always  used  when  the  user  prepares  charges  using  the  relevant material  quantities.  To

save time, users often weigh several charges at once.

The logical process and posting are described here.

Prerequisite/configuration

The configuration is described here.

Weighing components

Components for a charge are weighed by the AIP dialog A_VBRKOMP.

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

The  "weighing"  function  at  the  terminal  provides  a  list  of  required  input  materials  (discrete  material

components). The component-related data collection can be opened from this list.

Once the operation to be weighed has been logged on, the "weighing components" dialog can be started

by the "weigh" function key from the toolbar of the basic screen of the terminal. After opening the dialog,

the terminal automatically generates a new batch for the order. This is presented as batch in the following

dialog.

Please note: The dialog only opens if "discrete" material components (consumption type = D) exist for the

running operation.

The actual weighing process of the relevant components is performed by the "weigh charge" function in a

detailed dialog (see below).

Dialog

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 1 of 6

Weighing of Components

Workplace

Weighing workplace to which the operation to be weighed is logged on.

Operation

Weighing order/operation

Batch

Batch number for the charge that is currently to be produced.

Material

Material number for the charge that is currently to be produced.

Status

Batch status for the charge that is currently to be produced after weighing. This can be:

  Free

  Locked

Staff badge number

The user's staff badge number.

Components list

The  component  list  shows  all  components  of  the  currently  registered  weighing  operation  that  are

relevant for the charge to be produced. These details for the component are displayed to perform

weighing:

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 2 of 6

Weighing of Components

  Article number (material number of the component from the component list)

  Target quantity

  Actual quantity (quantity entered upon weighing, at first 0,000)

  Remaining quantity (computed remaining quantity after weighing, at first 0,000)

  Designation (component name from the component list)

  Tolerance (calculated, admissible tolerance of the component/component list)

  Deviation (calculated, admissible deviation of the component/component list)

Procedure:

The user selects the first component that is to be weighed and starts weighing.

  The  relevant  component  row  is  highlighted  in  green  if  the  component  is  within  the  variance

tolerance (at the component, percentage).

  Materials falling short of the variance tolerance are highlighted in red.

  Materials  the  weighing  result  of  which  exceeds  the  variance  tolerance  but  is  still  within  the

tolerances of quantity adjustment (of the component) are highlighted in blue.

  The row is shown in black font, provided that the component has not yet been weighed.



If  the  weight  value  is  beyond  the  variance  tolerance  but  within  the  tolerance  of  quantity

adjustment,  posting  will  be  accepted  but  the  user  has  to  adjust  quantities  for  the  other

components (automatically in the system). The input dialog cannot be closed if this modification is

not made.

Quantities have to be entered for all input materials included in the component list.

Functions

The paragraphs that follow describe the functions provided in the input dialog to weigh components:

"Weigh charge"

The "weigh charge" function opens the dialog to weigh a selected individual component (KOMP_WIEG).

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 3 of 6

Weighing of Components

The  current  status  of  target  and  actual  quantity  is  presented  after  selecting  a  component  that  is  to  be

weighed. The user has to enter a relevant batch for consumption posting in the "component batch" input

field. The batch has to be available in HYDRA with the appropriate material and the status "free" and it

must have a remaining quantity >=0. The dialog can be closed by entering the weighing quantity and the

staff badge number (optional).

Successful weighing has the following additional effects on the system:



Indicators are recorded for the component

  The weighed quantity is added to the actual quantity of the component

  Material movements are generated for consumption (261)

  A batch assignment is generated for the batch  component batch.

  The article of the batch always has to match the article of the component.

  A component may also be weighed several times.

  The  amount  (stock)  of  component  batches  is  only  reduced  if  the  relevant

material type is assigned the "retrograde inventory collection" flag.

Once the weight has been entered, the displayed actual quantity and remaining quantity are updated.

The displayed component requirements are updated in the table once the component has been weighed

successfully.

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 4 of 6

Weighing of Components

A warning message the user may skip is output if the value of the actual deviation is greater than the one

of the target deviation.

"Reject charge" function

Due  to  the  weighing  process,  it  might  be  the  case  that  an  entire  batch  cannot  be  used.  The  "reject

charge" function can be  used to identify the current charge/batch as "scrap". The material  used for this

charge  is  uploaded  to  ERP  and  the  generated  scrap  quantity  (identified  as  charge  scrap  by  SYSTEM

reason 910) is posted to the order. The batch is generated with the "locked" status and the "scrap" batch

class (goods movement 531).

A confirmation prompt the user has to affirm comes up with this function.

Then the original target quantity for each charge is restored and the components are reset. Consequently,

the weighing process can be restarted for a new batch.

"Adjust quantity" function

Once  the  first  component  has  been  weighed,  the  user  can  apply  the  "adjust  quantity"  function  to

automatically  adjust  the  input  quantities  of  the  other  components  in  proportion  to  the  weighing  result  of

the first component and its default quantity. This function can only be used once for each charge.

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 5 of 6

Weighing of Components

The function  adjusts  the  target  quantities  of  all  components  to  the  weighed  quantity  of  one  component.

Quantities are adjusted by changing the primary target quantity for each charge of the operation.

However, quantities may only be adjusted if the component is weighed within its tolerances.

"Complete charge" function

Using  this  function,  the  charge/batch  is  completed  (generated)  and  the  dialog  is  closed.  However,  the

charge/batch  can  only  be  completed,  once  all  components  have  been  weighed  and  are  within  their

specified tolerances.

Completed successfully, the charge/batch is generated and transferred as goods movement 101 to ERP.

Optionally,  the  charge/batch  is  assigned  a  minimum  shelf-life  (from  the  material  type  of  the  OP).

In  addition,  the  PPS  batch  from  the  order  is  determined  and  stored  as  PPS  batch  in  the  batch  of  the

charge (optionally).

The  quantity  of  the  generated  batch  results  from  the  input  quantity  recorded  as  consumption  for  each

component.

The user may also directly block the batch/charge by selecting a status from the component requirements

dialog. By default, the batch is always assigned the status "free".

AIP_WeighingComponents.docx

Version: 1.0.18468

Page 6 of 6

