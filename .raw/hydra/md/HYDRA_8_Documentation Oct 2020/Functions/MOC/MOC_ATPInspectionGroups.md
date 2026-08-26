ATP Inspection Groups

1  ATP Inspection Groups

Overview

Menu

Master data -> production control -> ATP inspection groups

Transaction code

atpig

Function authorization

atpig

This document describes the application "ATP inspection groups" in the MES Operation Center (MOC).

Purpose

You use this function to create and modify ATP inspection groups in the system.

Integration

ATP inspection groups are used in the system to visualize material processing in the HYDRA Shop Floor

Scheduling module.

Selection criteria

The application provides the following selection criteria:

Name

Selection using the name of the ATP inspection group

Field descriptions

Name

Name of the ATP inspection group

Active

Shows which application can display the ATP inspection group.

Consumption during setup time

This field shows if materials assigned to this ATP inspection group are consumed during setup.

Consumption during processing time

This  field  shows  if  materials  assigned  to  this  ATP  inspection  group  are  consumed  during

processing.

Please  note  that  when  creating  and  changing  ATP  inspection  groups  at  least  one  option

"Consumption during setup time" or "Consumption during processing time" is active. Otherwise,

ATP Inspection Groups

Version: 1.0.5943

Page 1 of 4

ATP Inspection Groups

you cannot create or change a data record.

Consumption type

  Complete: Material is completely consumed at the beginning of the OP (operation).

  Linear: Material is continuously consumed during the OP.

  Discrete: Material is evenly consumed during the OP in specified numbers.

"Fragmented size" (piece-sized)

Shows material quantities consumed during discrete consumption. Example: "Fragmented size" of

50 means that the consumption is divided into steps of 50 over the total operation.

Example:

OP  0100  (processing  time  1  hour)  requires  200  pieces  of  an  article  (400  available  at  start).  If  the

machine uses a piece size of "50", material consumption is as follows: The required material of 200

pieces would be divided into four blocks of 50 and evenly consumed during the processing time. At

the end of the OP 200 pieces of the required article (material) are available.

Discard parts

Gives  the  number  of  left  over  material  to  be  cleared  at  the  end  of  an  operation.  If  that  option  is

active, then consumption at the end of an operation is rounded up.

Provision during processing time

This field shows the availability of the produced material during processing time.

Provision during teardown time

This field shows the availability of the produced material during teardown/retooling time.

Provision during wait time

This field shows the availability of the produced material during wait time.

ATP Inspection Groups

Version: 1.0.5943

Page 2 of 4

06:0006:1506:3006:4507:00400350300250200OP 010005:45

ATP Inspection Groups

Please  note  that  when  creating  and  changing  ATP  inspection  groups  at  least  one  option

"Provision  during  processing  time",  "Provision  during  teardown  time"  or  "Provision  during  wait

time" is active. Otherwise, you cannot create or change a data record.

Type of provision

  Complete: All the material is provided at the end of the operation.

  Linear: Material is made available evenly during operation.

  Discrete: Material is made available evenly distributed during the OP in specified numbers.

"Fragmented size" (piece-sized)

Shows  material  quantities  provided  with  type  discrete.  Example:  "Fragmented  size"  of  50  means

that the provision is divided into steps of 50 for the total operation.

Example:

OP  0200  (processing  time  1  hour)  produces  a  total  of  200  pieces  of  an  article  (150  available  at

start).  If  the  machine  uses  a  piece  size  of  "50",  material  production  is  as  follows:  The  produced

material  of  200  pieces  would  be  divided  into  four  blocks  of  50  and  evenly  produced  during  the

processing time. At the end of the OP 350 pieces of the required article (material) are available.

Modified by

Last editor of the ATP inspection group.

Modified on

Point in time of last change of this ATP inspection group.

"General" tab

ATP Inspection Groups

Version: 1.0.5943

Page 3 of 4

06:0006:1506:3006:4507:00150350300250200OP 0200

ATP Inspection Groups

  Add

Opens the dialog to add an ATP inspection group.

Copy

Opens the dialog to copy an ATP inspection group.

 Edit

Opens the dialog to edit an ATP inspection group.

Delete

Deletes an ATP inspection group.

ATP Inspection Groups

Version: 1.0.5943

Page 4 of 4

