e-Kanban

1  e-Kanban

Utilization

The kanban control as decentralized production control has been designed to apply the pull principle.

MES represents kanban control based on this principle in electronic form (e-kanban). Therefore, the flow

of the relevant kanban objects is displayed within their closed loop (from supply to consumption and vice

versa).

Prerequisites

These general definitions need to be taken into account for using e-kanban:



Instead of physic kanban cards, MES uses or manages (electronic) kanban objects.

  The ideal total quantity of circulating kanban objects has to be calculated in advance. MES does

not provide calculations or algorithms for this purpose.



In  MES  the  kanban  objects  are  always  posted  from  one  material  buffer  to  the  next.  It  is  not

intended to repost them to the object "machine" or "machine group".

Consequently, supply and consumption are represented as material buffers in the system and to

be configured accordingly.

  The basic package first only refers to the simple case. Here, the closed loop between one supply

and  one  consumption  is  only  taken  into  account,  i.e.  it  is  not  taken  into  account  how  many

machines  actually  pertain  to  the  consumption  and  how  often  the  material/kanban  object

physically moves from one "consumption buffer" to the consuming machine.

The  kanban  objects  are  not  traced  within  the  supply  even  if  it  comes  to  multi-level  processes

(kanban order includes several OPs) for replenishment production.

Procedure

Creating kanban objects

The kanban objects are created and managed in MES. Generally, a status is kept for the objects. Once

the kanban object has been created, it is assigned the status "initial".

Generation of filled kanban object at the supply

The supply (material buffer) for replenishment production can be operated by one or several machines.

A machine produces the relevant material/article for a kanban order.

MBL_eKanban.docx

Version: 1.0.1362

Page 1 of 14

e-Kanban

If a kanban object is filled, the status of the kanban object is set to "filled" by the dialog "fill kanban".

However, it is irrelevant at which machine of the supply the kanban object was produced.

The kanban object is directly posted in the material buffer of the consumption defined within the closed

loop.

Provision of the kanban object at the end point: consumption

The kanban object is provided at the consumption and, once it has been filled, it is directly posted into the

material buffer of the consumption that is defined within the closed loop.

In MES the consumption (material buffer) is represented as:

  A general material buffer (supermarket for several machines/machine groups). In this case, the

system cannot trace the kanban object (to which machine it was sent)

  The material buffer of the machine (preceding)

Emptying the kanban object at the end point: consumption

The kanban material provided at the consumption is "used/consumed" for production at a machine.

If the kanban material of a container is completely consumed, the kanban object is set to the status

"empty" by the dialog "empty kanban" and directly posted onto the defined material buffer of the supply.

However, it is irrelevant to the kanban process at which machine following the consumption the container

was actually emptied.

Generation of orders on request

If required, the consumption takes the kanban object from the supply. If machines are indirectly regarded

as subordinate elements of the supply, replenishment production will be triggered by consuming or

emptying the kanban objects (dialog: empty kanban) at the relevant machine/terminal.

The requirement of a new kanban object for this material/closed loop is visualized immediately at the

supply/terminal - electronic kanban board.

Once a minimum quantity of empty kanban objects has been reached, a planned kanban order that is

shown within the order list at the supply can be generated automatically. The planned kanban order is

enhanced by any further empty kanban object.

If the maximum quantity of empty kanban objects is reached, the planned kanban order becomes a fixed

kanban order that can no longer be changed. Quantities are no longer updated. The fixed kanban order is

also shown in the order list at the source.

MBL_eKanban.docx

Version: 1.0.1362

Page 2 of 14

e-Kanban

Used master data and their connection

The following, cooperating master data are used to represent the kanban process within MES. They need

to be created in the system.

MBL_eKanban.docx

Version: 1.0.1362

Page 3 of 14

Procedure: changing statuses / locating kanban objectsEventEventPlace before eventPlace before eventPlace after eventPlace after eventStatus after eventStatus after eventINITIALFULLEMPTYFULLSystemConsumptionSupplyConsumptionConsumptionSystemSupplySupplyDialogFill kanban/ post to consumptionCreate kanban objectDialog empty kanban/ post to supplyDialog fill kanban/post to consumption

e-Kanban

Order generation

General:

In  general,  a  kanban  order  is  generated  from  a  work  plan  created  in  MES  or  from  a  capacity  order

provided by the ERP system for the order type "KBN" (can be named flexibly). However, the  generation

itself might be due to several different situations.

Consequently, the following options to generate kanban orders are provided:

•  Manually at the AIP

The dialog "electronic kanban board" provides the option to generate a kanban order for an

article/material and closed loop at the push of a button.

•  Manually at MOC (function of the application "kanban stock")

Orders pertaining to kanban orders are generated manually by the foreman at MOC from a

separately created work plan or a provided capacity order at least for each article or article and

closed loop.

•  Automatic generation

The system automatically generates a planned kanban order for the relevant article from a work

plan or provided capacity order when the "yellow zone" (minimum quantity of empty kanban

cards) has been reached.

MBL_eKanban.docx

Version: 1.0.1362

Page 4 of 14

e-Kanban

•  Quantities are updated for the kanban order by every new, empty kanban object.

•  The worker may start the generated, planned kanban order at the AIP at any time.

•  To generate kanban orders, at least one separate work plan is created or capacity order

is transferred from ERP for each article.

•  Once  the  "red"  zone  (allowed  maximum  quantity  of  empty  kanban  cards)  has  been

reached,  the  quantities  are  updated  for  the  planned  kanban  order  the  last  time  and  the

planned kanban order becomes a fixed kanban order.

The work plans to generate kanban orders are created in MES or capacity orders are transferred from

ERP. The system considers the below-mentioned situations:

Generation from a work plan:

MBL_eKanban.docx

Version: 1.0.1362

Page 5 of 14

Generation from a capacity order:

e-Kanban

Utilization of a work plan/capacity order

•  Utilization of a work plan/capacity order for each article and supply relationship/closed loop

Even though there might be several supply relationships/closed loops (ways from supply to

consumption) for one article/item, the system has to generate a relevant kanban order for exactly

one specific closed loop. The work plan/capacity order defined for this article/closed loop is used.

The ID of the supply relationship/closed loop is entered in the header data to find the correct work

plan / capacity order (shown in work plan header/ order header --> assignment --> master data --

> supply relationship/ closed loop).

If no closed loop ID is available at the work plan/capacity order header, the first work

plan/capacity order found for the article number will be used.

The closed loop number of the triggering closed loop is taken over for the generated kanban

order.

•  Utilization of a work plan/capacity order for each article only

•  This is sufficient, for example, if there is only one supply and consumption for each article, i.e.

there is only one closed loop and no differentiation has to be made. In this case, it is not

necessary to define a closed loop number for the work plan header/capacity order header.

MBL_eKanban.docx

Version: 1.0.1362

Page 6 of 14

e-Kanban

If no closed loop ID is available at the work plan/capacity order header, the first work

plan/capacity order found for the article number will be used.

For which closed loop the generated kanban order is used, results from the assignment of the

closed loop ID for which the kanban order is triggered/generated (e.g. by using the relevant

AIP function or the automatic generation function). The closed loop number of the triggering

closed loop is taken over to the generated kanban order.

•

It might be the case that there are several closed loops for each article but the same and only

created work plan/capacity order is always used. Then it is not necessary to define a closed

loop number for the work plan/capacity order. For which closed loop the generated kanban

order is used, once again results from the assignment of the closed loop ID for which the

kanban order is triggered/generated (e.g. by the relevant AIP function or the automatic

generation function).

•  Another possibility is to define a work plan/capacity order for each article/item only but to

enter or select a specific closed loop number when generating a kanban order by using MOC

functions. For which closed loop the generated kanban order is used, results from the

assignment of the entered closed loop ID for which the kanban order is triggered/generated.

Prerequisites, operating conditions



It has to be defined in advance whether a system uses capacity orders or work plans to

generate  kanban  orders.  Both  variants  cannot  be  used  at  the  same  time. The  system

uses the INI configuration specifying if work plans or capacity orders are to be used.

  Within  the  system  work  plans  relating  to  articles  or  to  articles  and  closed  loops

generally have to be defined for the order type "kanban orders" (e.g. "KBN").



In  general,  the  planned  kanban  quantities  have  to  be  defined  for  all  kanban  articles

within the system.

  Number  ranges  for  the  automatic  generation  of  the  order  number  for  kanban  orders

have to be created or used within the system. Number ranges can be configured flexibly

and depend on the order type.

Data:

Input data to find the appropriate work plan/capacity order to "generate orders":

  Article number of the triggering article (from AIP function, MOC function, automatism)

  Closed  loop  ID  of  the  triggering  closed  loop  (from  the  relevant  AIP  function,  MOC  function,

automatism)

  All data defined in the capacity order or work plan

MBL_eKanban.docx

Version: 1.0.1362

Page 7 of 14

e-Kanban

The generated kanban order uses the following data from the provided work plan or capacity order:

  Scheduled start  point in time of the generation

  Scheduled end  point in time of the generation + quantity * target cycle  standard formula

  The work plan/capacity order may include several  operations; however, in general it is only one

OP.  They  are  taken  over  for  order  generation  and  used  for  planning  based  on  the  default

configuration.

  The quantities for the generation depend on the number of empty KBN objects and planned KBN

quantities (from kanban master data) for the triggering article/closed loop and are calculated for

the kanban order.

  The  machine  group  of  the  OP/OPs  is  entered  in  the  work  plan/capacity  order  and  planning  is

based on it.

  Target  data  (target  cycle,  partitioning,  bill  of  material,  etc.)  is  taken  over  from  the  work

plan/capacity order.

  The article  numbers of the order header and the last OP  are  identical. The article number from

the  order  header  is  used  for  order  generation.  The  other  article  numbers  of  the  order  are  filled

based on the work plan/capacity order.

  The closed loop ID of the triggering closed loop is used for the kanban order. The closed loop ID

that is defined for the work plan/capacity order is not used.

If the kanban order is generated by the MOC function "generate order", the entered closed loop

ID is used and transferred to the kanban order.

Procedure/processing

A kanban order can be generated by the following three possibilities:

  Manually at MOC

Utilization of the function "Generation of kanban orders using MOC“ and generation of a kanban

order from a defined work plan or capacity order.

  Manually at AIP

The "electronic kanban board“ of AIP enables the generation of kanban orders for a selected

article and closed loop. The order is generated from a work plan/capacity order created for this

article/martial and closed loop.

  Automatic generation

If the minimum stock level of empty kanban cards (yellow zone, e.g. > = 5) that is configured

within the supply relationships/closed loop for an article (e.g. 5 empty kanban objects) is

exceeded, a planned kanban order is generated from the work plan/capacity order defined for the

article and closed loop.

MBL_eKanban.docx

Version: 1.0.1362

Page 8 of 14

e-Kanban

Once another kanban object with the status "empty" is available, the number of empty kanban

containers increases and the planned kanban order is increased by the empty kanban object (e.g.

the included planned kanban quantity):

•

quantities  are  updated  for  the  planned  kanban  order  by  every  additional  empty  kanban

object

•

the worker may start the generated, planned kanban order at the AIP at any time

the order/operation status of the kanban order remains "planned" and the OP can be logged on.

Once the allowed maximum quantity of empty kanban cards ("red" zone) has been reached, the

quantities are updated for the planned kanban order the last time and the planned kanban order

becomes a fixed kanban order

The order/operation status of the kanban order is prepared and the OP can be logged on.

The kanban order is no longer changed by an automatic or manual quantity update.

Please note: This function can be enabled/disabled. This function cannot be used

in a reasonable manner if the generation from the electronic kanban board is to be

used.

The actual logic/function for generating orders is triggered by the mentioned three possibilities.

Result:

The article number and closed loop ID of the triggering closed loop or the triggering function are used as

input data for all variants to find the appropriate work plan or capacity order and to generate the kanban

order.

  The order or operation quantity refers to the number of currently empty kanban objects from this

closed loop times the defined kanban quantity from the supply relationships/closed loops.

Order quantity/operation quantity = number of empty kanban objects x defined kanban quantity of the

material

  The order type = KBN

  The order/operation status of the kanban order is prepared and the OP can be logged on

  The closed loop ID of the triggering closed loop is transferred automatically to the order header

(in assignment --> master data --> closed loop) of the generated kanban order. The closed loop

ID that might be defined for the work plan/capacity order is not taken over.

  A cyclic program checks for which article and closed loop the minimum

stock/maximum stock of empty kanban objects has been reached and

successively generates one order after the other of the kanban order.

MBL_eKanban.docx

Version: 1.0.1362

Page 9 of 14

  While a kanban order is being generated for an article/closed loop, this entry is

blocked for other functions (this prevents the AIP user from generating a kanban

order for the same closed loop during automatic generation).

e-Kanban

Return values

  General

o  Shows  the  generated  kanban  orders/OP  in  the  status  "prepared"  within  the  MOC  order

overview

o  Shows  the  generated  kanban  orders/OP  in  the  status  "prepared"  within  the  AIP

sequencing list (selected as fixed kanban orders/selected as planned kanban orders)

  The generated kanban order includes an assignment for the closed loop at  the order header for

which  it  was  created  (see  order  info    tab  order  header  assignment    master  data    closed

loop number).

Capacity orders/ERP interface

General:

There  is  a  general  interface  connection  to  diverse  ERP  systems  for  e-kanban  (SAP-PPPDC  and  EIS-

ERP).  Consequently,  orders  can  be  transferred  from  ERP  to  HYDRA  and,  vice  versa,  uploads  can  be

posted on them (recorded durations and quantities).

The transferred orders differ from common production orders, as they are "capacity orders". In contrast to

common production orders, they have the following tasks:

  Capacity orders are provided to generate planned/fixed kanban orders within MES. Within MES

the capacity order is regarded as a work plan or template to create kanban orders and, therefore,

it includes all relevant data required to produce operations within the order structure.

  Consequently,  capacity  orders  are  generated  within  ERP  and  transferred  to  MES  including  the

BOM,  PRT  list  and  additional  data  (target  specifications)  that  are  determined  from  ERP  master

data.

  Normally, capacity  orders  are built on a monthly basis as capacitive forecast  and transferred to

MES.

  The planned target quantity of the capacity order is reduced by the number of actual quantities to

be produced for a generated kanban order that is planned/fixed or with each quantity update for

the kanban order. This is shown in MES.

MBL_eKanban.docx

Version: 1.0.1362

Page 10 of 14

e-Kanban

  The recorded quantities and durations of a kanban operation are also posted in relation to orders

on the capacity order/operation and uploaded to ERP.  Thus, goods movements or consumption

can be performed in a retrograde manner in ERP.

A  goods  movement  is  not  generated  and  transferred  to  ERP  every  time  a  kanban  object  is

produced.

If work plans are already used as template to generate kanban orders, capacity orders

cannot be used at the same time.

In MES the capacity order is not used for capacity planning/machine assignment in HLS.

Prerequisites, operating conditions:

  Utilization of the standard ERP interface for production orders (including component list)

o  EIS-ERP

o  EIS-EZI

  Utilization of the standard SAP interface for discrete production orders (including component list,

order type)

o  SAP-PPPDC

o  SAP-ISS

Data within the capacity order:

These definitions have to be made or this data has to be transferred within the order interface.

ERP  MES (Download)

  Order header data

  Order type for capacity orders = e.g. ZKAP (Please note: the order type can be configured)

  Article for which the kanban order is to be generated

  Closed  loop  for  which  the  kanban  order  is  to  be  generated  (new  field  in  ERP-EIS  and  SAP-

ISS/function module AK)

  Target quantity (monthly target quantity)

  Operation data

  Article

  Machine group

  Flag "planned for machine group“

  Target quantity (monthly target quantity)

MES  ERP (uploads)

MBL_eKanban.docx

Version: 1.0.1362

Page 11 of 14

e-Kanban

Relevant data included in uploads for capacity orders:

  Capacity order number

  Durations from kanban orders

  Quantities from kanban orders

  Please note: The machine number might not be known in ERP

Procedure/processing

Capacity orders are generated  in ERP. Once they  have  been released, they  are transferred to MES. In

the first place, capacity orders are used as "templates" to generate kanban orders in MES. In general, the

procedure is as follows:

Transfer of capacity orders from ERP

ERP transfers the capacity order e.g. with the order type "ZKAP" (can be configured). MES takes over the

capacity  order  and  displays  it  in  all  relevant  standard  applications  (just  as  it  is  the  case  for  production

orders). These are, for example:

•

Inbound transactions

•  Backlog of orders

•  Order information

In MES the capacity order is used like a work plan for an article and closed loop.

MBL_eKanban.docx

Version: 1.0.1362

Page 12 of 14

e-Kanban

Once collected in MES, the capacity order may have the following statuses for the different objects:

•  Order header  prepared

•  Operations  prepared

The  system  may  only  include  one  valid  capacity  order  at  a  time  from  which  kanban  orders  can  be

generated. Even though several capacity orders might exist for an article/closed loop in the system.

The valid capacity order is always the newest/most recent capacity order within the system.

Utilization of capacity orders in MES

Capacity orders are used as "replacement work plan" and kanban orders are generated from them. For

this reason, kanban orders are generated by using the same functions as for work plans. Triggers are:

•  Manually at AIP

•  Manually at MOC

•  Automatic generation of orders

Generation of orders from capacity orders

Orders are always generated based on the same logic. The found capacity order (for article, closed loop,

validity date) is used as template and a kanban order is generated.

The  procedure  for  generating  kanban  orders  from  capacity  orders  is  the  same  as  for  generating  them

from MES work plans.

The  essential  difference  for  the  generation  of  kanban  orders  from  capacity  orders  is  that  the  target

quantity  within  the  capacity  order  is  reduced  by  the  order  quantity  of  the  kanban  order  every  time  a

kanban order is generated.

With the automatic generation of planned/fixed kanban orders, the target quantity within the kanban order

is increased and the target quantity within the capacity order is reduced every time quantities are updated

(with every new, empty kanban object for this article and closed loop).

Uploads to capacity orders

The produced quantities and durations from the kanban order are transferred to the capacity order (added

up).

For  capacity  orders,  uploads  relating  to  orders  are  also  transferred  to  the  ERP  system.  They  are

generated if a kanban order is interrupted/finished.

MBL_eKanban.docx

Version: 1.0.1362

Page 13 of 14

e-Kanban

Status of a capacity order

The capacity order may have the following order/operation statuses (they are identical):

  Prepared: The capacity order has been transferred from ERP and created in MES.

  Started: The first kanban order has been generated for the capacity order.

  Finished: the last kanban order has been generated for the capacity order and the capacity order

is no longer applicable (a newer capacity order is available).

MBL_eKanban.docx

Version: 1.0.1362

Page 14 of 14

