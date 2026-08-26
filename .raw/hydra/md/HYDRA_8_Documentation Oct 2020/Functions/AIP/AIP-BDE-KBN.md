eKanban Data Collection

1  eKanban Data Collection

Main view

The main view provides the following functions for the kanban process. The available functions change,

when the screen changes (supply or demand).

  Electronic kanban board

  Fill kanban

  Empty kanban

Electronic kanban board

On the supply side, the AIP displays the  Electronic kanban board. The electronic kanban board informs

the user about the number of empty kanban objects of a specified material in a defined control cycle.

To  open  the  electronic  kanban  board,  click  the  button  Electronic  kanban  board  on  the  main  view.  The

system  then  loads  all  kanban  items  (including  the  relevant  additional  information)  that  are  part  of  the

control cycles assigned to this AIP.

The following information is displayed for the user:

  Status

o  Green:

The number of empty kanban objects is less than the minimum number of empty kanban

objects

o  Yellow:

The number of empty kanban objects is greater than or equal to the minimum number of

empty kanban objects

o  Red

The number of empty kanban objects is greater than or equal to the maximum number of

empty kanban objects

  Material

  Control cycle

  Demand

  Kanban objects in the control cycle

  Maximum number of empty kanbans

  Minimum number of empty kanbans

AIP-BDE-KBN.docx

Version: 1.1.15092

Page 1 of 4

eKanban Data Collection

Fill kanban (dialog KBN_FILL)

The  dialog  Fill  kanban  is  used  on  the  AIP  terminal  on  the  supply  side.  Here,  you  set  the  status  of  the

actual  kanban  object  in  the  system  from  empty  to  filled  when  the  container  has  been  filled.  The  dialog

workflow is as follows:

  Open the dialog Fill kanban on the main view.

  Enter/scan the material number

  Select the control cycle for the material number entered

o  The system only  displays the control cycles  and the  additional  information if the control

cycles are configured for the material number entered.

o  The following additional information is displayed for the control cycle:

  Supply / demand

  Objects in the control cycle

  Full objects in the control cycle

  Empty objects in the control cycle

  Planned quantity per object

  The fields Supply and Demand are automatically filled when you select the control cycle.

  When  you  have  selected  the  control  cycle,  the  system  automatically  suggests  the  next  kanban

object  with  status  Empty.  If kanban  objects  with  status  Initial  are  available  in  the  system,  these

objects are used first. The field Consec. No. is filled accordingly. Also the fields Kanban quantity

and  Planned   kanban  qty.  are filled  with the value  of the planned kanban quantity stored in the

resource  master  data.  The  user  can  change  the  quantity  in  field  Kanban  quantity  and  enter

another actual quantity.

  After confirmation, the dialog KBN.FILL is sent to the server.

  A label/an accompanying material document is printed for this kanban object.

  Kanban containers need not be filled 100 %.

  The  labels  are  destroyed  when  the  material  is  used  up  (demand).  The  labels

are  only  destroyed  when  the  container  has  been  emptied  or  the  dialog

KBN_EMPTY has been executed.

AIP-BDE-KBN.docx

Version: 1.1.15092

Page 2 of 4

eKanban Data Collection

Empty kanban (dialog KBN_EMPTY)

On the demand side, the dialog Empty kanban is used on the AIP terminal. Here, you set the status of the

actual kanban object in the system from filled to empty when the containers have been processed. When

the dialog has been executed, the label/accompanying document for this kanban object is destroyed and

the kanban object is assigned the status Emptied. The dialog workflow is as follows:

  Open the dialog Empty kanban on the main view.

  Enter/scan the kanban object

  The following information is automatically displayed:

o  Consec. no.

o  Material number

o  Kanban objects in the cycle

o  Control cycle ID

o  Supply

o  Demand

o  Planned kanban quantity

o

(Actual) kanban quantity

  The  user  confirms  the  dialog  via  staff  badge  number  and  clicks  the  button  Empty  kanban.  The

dialog is closed. The kanban object is set to the status Empty in the system. The kanban object is

posted back to the supply side.



If the user clicks the Cancel button, the dialog is interrupted and exited. The status is not changed

and in the system, the kanban object is still on the demand side.

  The system only empties kanban containers completely (100%)

  For  this  reason,  only  kanbans/containers  that  have  been  emptied  entirely  are

posted. If a container includes a remaining quantity, the container is considered

as full container and put back on the shelf. The withdrawal from the container is

not  known  to  HYDRA.  The  quantity  entered  on  the  label  or  accompanying

document is unchanged (full quantity). The quantity is not adjusted and a new

label is not printed.

  The kanban object number must be unique in the system. This way, the number

can  be  used  and  the  number  of  the  control  cycle  need  not  be  entered

additionally.

AIP-BDE-KBN.docx

Version: 1.1.15092

Page 3 of 4

eKanban Data Collection

Order list

You call the order list using the dialog Log operation on. The order list shows the normal orders and the

kanban orders/OPs.

The order list of a machine (supply) displays the following orders:

o  Production orders/OPs (planned for this machine/machine group)  data record is "blue"

o  Fixed kanban orders (of the supply/machine group from the generated order/OP)  data

record is "lilac"

o  Planned  kanban  orders  (of  the  supply/machine  group  from  the  generated  order/OP)  

data record is "orange"

You can log on kanban orders using the dialog Log operation on.

AIP-BDE-KBN.docx

Version: 1.1.15092

Page 4 of 4

