Manual

Joint Production
HLS-KUP 8.2

Version 1.0.23232

Last changed on: 15.09.2020

Joint Production

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-KUP_82.docx

Version: 1.0.23232

Page 2 of 8

Joint Production

Contents

1  Overview Joint Production ........................................................................... 4

2  Joint Production ........................................................................................... 5

HLS-KUP_82.docx

Version: 1.0.23232

Page 3 of 8

Joint Production

1  Overview Joint Production

Purpose

The  function  package  HLS-KUP  8.2  provides  the  option  to  link  operations  in  the  HYDRA  Shop  Floor

Scheduling (HLS) and to plan them as one.

Implementation notes

You use the function package HLS-KUP 8.2 if you want to integrate in the planning the parallel processing

of different operations at one workplace. Example: This scenario is frequent with manufacturing companies

in injection molding where you often produce left and right parts with one tool. Here, a production order with

different article numbers exists for the left and the right part.

If you want to plan these operations as one and log the operations on as one to the terminal, you must link

the operations. You link the operations in the application "Graphic Planning".

  You can link operations of different production orders to plan them as one in the HYDRA Shop

Floor Scheduling

  You can plan the same tool for linked operations without conflict

  You make one posting for linked operations on the terminal

Integration

The function package HLS-KUP 8.2 is integrated into the HYDRA Shop Floor Scheduling. You can log on,

log off and interrupt linked operations on the terminal as one.

Features

  Function  to  link  operations  in  the  graphic  planning  board.  The  linked  operations  are  planned  in

parallel (identical planned start).



If you link operations, you can plan the simultaneous production of left and right parts, for example.

  Configuration of the maximum number of operations that you can link

  Visualization of the linked operations

  Functions to schedule, cancel and replan linked operations

  You can log on, log off and interrupt the linked operations as one on the shop floor terminal if you

use the AIP.

HLS-KUP_82.docx

Version: 1.0.23232

Page 4 of 8

Joint Production

2  Joint Production

Overview

HYDRA menu

Production control  Preparations for production  Graphic planning

FEDRA menu

Detailed Scheduling  Planning  Graphic planning

Transaction code

grap

Function authorization

grap

Purpose

You use the joint production if you want to link operations and plan them for a workplace as one operation.

Linked operations have an identical planned start.

Integration

You can use the graphic planning board to plan capacities for machines and workplaces in your production

department.

With operations linked via the "joint production" function, you cannot use the following functions:

- the "coil cutting" function (MPL)

- the function to build a merged operation (BDE) (only applies if HYDRA is used).

Requirements

Proceed as described below in order to display the most up-to-date planning in the graphic planning board:

  You  have  created  orders  required  for  planning  on  the  system  (production  orders,  maintenance

orders, project orders) or you have downloaded these orders from a higher-level system.

  You have defined the responsibilities regarding order planning in your company and determined

which  workplace/machine  groups  are  used  for  planning.  Based  on  these  initial  steps,  you  have

defined the necessary planning profiles.

You require the respective authorizations to be able to change the planning in the graphic planning board.

Joint production – settings

In  the  settings  of  the  Graphic  Planning,  you  must  configure  the  specifications  that  are  used  to  link

operations. Make the settings for joint production in tab Operation links. The settings listed in the following

can be edited.

HLS-KUP_82.docx

Version: 1.0.23232

Page 5 of 8

Joint Production

-  Max. number of linked OPs:

Enter the maximum number of operations that can be linked.

-

Linked OPs visualization:

o  Only show master OP

Only the master operation is displayed. The included operations that have been linked are

not displayed.

o  Show master OP with icon

Only the master operation is displayed. The included operations that have been linked are

not displayed. The master operation is identified using a symbol.

o  Show all operations

All operations linked are shown.

o  Show all operations with icon

All operations linked are shown. Each of the operations linked is identified using a symbol.

-  Allow linking of planned operations:

Specify if you are allowed to link operations that have already been scheduled. If you do not enable

the option, you can only link operations of the pool of groups.

-  Do not adjust bar length:

If you enable the option, the bar length of the individual operations linked does not change. If you

do not enable the option, the bar lengths of all operations linked are changed to the bar length of

the operation with the longest bar.

Joint production – Linking and unlinking

Linking operations

You require the function authorization "op.cmbbuild" to link operations.

Select the operations that you want to link. You can select the operations in the planning board or in the

tables  (pool  of  groups,  pool  of  workplaces).  The  relevant  configurations  in  the  system  settings  specify

whether you can link operations that have already been scheduled.

After having selected the operations, right-click to open the context menu of one of the selected operations.

Select the entry "Link operations". The system then links the selected operations. The system checks if the

maximum number of operations that can be linked is respected. The system uses the configuration made

in the system settings to this end.

The  configurations  made  in  the  system  settings  also  specify  how  the  bars  of  the  linked  operations  are

displayed and if the bar lengths change.

HLS-KUP_82.docx

Version: 1.0.23232

Page 6 of 8

If you link several operations, the mother operation does not change the position (planned start and planned

end on workplace or group level). The other operations linked are based on the mother operation. These

operations now have the same planned start as the mother operation. The mother operation is the operation

with the longest bar length.

Joint Production

All operations linked must have the same tool stored for the operation or no tool at all.

If you have linked operations and you want to add further operations, you must first cancel the

existing operation links and unlink the operations. You cannot add further operations to operations

that are already linked.

Unlinking operations

You require the function authorization "op.cmbdissolv" to unlink operations.

If you want to unlink operations, open the context menu of one of the linked operations and select "Unlink

operations". You are then free to plan and link the operations as required.

If the bar lengths of the unlinked operations have been changed during linking, the original bar

lengths are only restored after a new "Request data".

Joint production – Perform planning actions

You  can  plan,  deallocate  and  replan  linked  operations.  To  perform  planning  actions,  you  can  use  the

functions  you  are  authorized  for.  The  system  performs  all  checks  of  planning  actions  for  the  master

operation  only  (for  example,  conflict  checks  or  sequence  of  operations  assigned  to  a  workplace).  The

system does not perform any checks for the operations linked with the master operation.

The terms "master operation" and "mother operation" are used synonymously.

Joint production – Posting

The system can process postings of linked operations in parallel. If required, you can configure for the order

type that the operations are automatically logged on, logged off and interrupted in parallel (tab "Processing",

field "Parallel order posting").

If several operations are linked and you interrupt/log off or post a part quantity, the collected quantities are

only posted for the selected operation. The postings for the operations linked to the master operation must

be made separately, if required.

HLS-KUP_82.docx

Version: 1.0.23232

Page 7 of 8

If  the  Parallel  order  posting  is  activated,  this  does  not  mean  that,  on  the  AIP,  resources  are

automatically logged on for all operations linked. For each operation, you must manually log on

input batches, tools, etc.

Joint Production

HLS-KUP_82.docx

Version: 1.0.23232

Page 8 of 8

