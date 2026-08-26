Manual

Machining Center / Pool of
Orders
BDE-BEA 8.2

Version 1.2.23049

Last changed on: 01.09.2020

Machining Center / Pool of Orders

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-BEA_82.docx

Version: 1.2.23049

Page 2 of 13

Machining Center / Pool of Orders

Contents

1  Overview: Machining Center/Pool of Orders ................................................ 4

2  Machining Center / Order Pool ..................................................................... 6

BDE-BEA_82.docx

Version: 1.2.23049

Page 3 of 13

Machining Center / Pool of Orders

1

 Overview: Machining Center/Pool of Orders

Purpose

Using this component, you can illustrate issues of a "machining center/pool of orders".

Implementation notes

This  function  package  is  used  if  you  have  machines  or  machining  centers  where  different  items/orders

are processed simultaneously.

In a machining center several operations are logged on to a machine (= machining center) at the same

time.  As  several  operations  are  processed  sequentially  at  a  machine,  they  need  to  be  differentiated  to

post  the  duration  and  labor  utilization  only  to  the  active  operation.  In  HYDRA  MDE  (Machine  Data

Collection) produced quantities are only posted onto active operations.

In the classical sense of a machining center, e.g. a robot works on several tables with different orders at

the  same  time.  In  a  machining  center  several  orders  can  be  processed  alternately  at  a  machine  or

workstation.

This  example  is  to  explain  how  machining  centers  can  be  used.  A  machining  center  has  two  painting

stations that are fed by a robot. Painting station 1 uses the color blue and painting station 2 uses the color

green.  Different  articles  are  produced  (item  1  and  item  2).  One  operation  or  one  production  order  is

required for each article/item to be produced. This example has two production orders:

Article

Blue

Item 1

Green

Item 2

These  two  articles  can  be  produced  and  painted  at  the  same  time.  The  items  can  be  processed  in

different order or with different quantities at the robot.

BDE-BEA_82.docx

Version: 1.2.23049

Page 4 of 13

Machining Center / Pool of Orders

Integration

Two different connection or collection options are possible:

1.

  Interactive activation of an operation (from the list of running operations) at the terminal. Downtime

monitoring is realized by machine interface/UMPS or manual notification.

2.

  Recording  of  the  events  "order  start"  and  "order  end"  using  an  interface.    Provided  that  machines

are connected correspondingly, information can be received from the machine or machine control to

automate the change of operations.

Functions

  Functions to map specific requirements when working with a pool of orders at machining centers

  Configuration of machines and workplaces as machining center including pool of orders

  Login of several operations as pool of orders and login of people to the Windows terminal

  Recording of the events order start and order end, i.e. posting of the actual time when processing

of an operation has started or ended

  Automatic  registration  of  events  by  data  taken  over  from  machine  controls  (PLC)  using  an

interface or manual registration by inputting events at the shop floor terminal

  Downtime  monitoring  at  the  Windows  terminal  including  alternative  downtime  monitoring  using

machine interfaces or manual input

  Direct posting of recorded quantities and production times onto the corresponding operation

  Proportionate posting of downtimes and malfunction periods onto the registered operations

BDE-BEA_82.docx

Version: 1.2.23049

Page 5 of 13

Machining Center / Pool of Orders

2  Machining Center / Order Pool

Purpose

You can use the functionality "Machining center/Order pool" on the AIP to process the operations, which

are logged on in parallel, in a specified sequence.

Requirements

If you use AIP 8.2, you require at least version AIP 8.2.1.26 or service pack 13 (2018).

If the machine data collection is run via a stand-alone PCC ("central MDE"), you require at least service

pack 13 (2018) and AIP 8.2.

Check  in  the  Dynamic  dialog  configuration,  that  the  dialogs  NC_AN  and  NC_AB  are  existing  and

activated. If the dynamic dialog NC_AN and NC_AB  are not  available,  proceed  as described  in chapter

Load dynamic dialogs.

If required, execute the configurations described in chapter AIP configuration .

Activation

You enable the functionality "Machining center" on the MOC in the machine/workplace configuration:

Go to: Master data  Workplace/resource configuration  Tab Workplace configuration  Workplace

category=J <Machining center>

The functionality "Machining center" includes the specific posting of durations. For this reason,

you  must  set  the  option  Posting  of  machine  time  with  operations  logged  on  simultaneously  to

"N" (also included in the tab workplace configuration).

This functionality is also available on the AIP 8.2, if the PCC is run stand-alone ("central MDE").

Posting procedure and posting

The operator logs on the different operations to the respective machine. Further persons can optionally

log on.

One operation is processed at a point in time X. If the machine is in status "Production", the duration and

the  complete  labor  utilization  is  posted  to  the  active  OP.  If  no  operation  is  active,  the  system  does  not

record  any  duration  for  an order.  In  case  of  a machine  failure,  the  duration  and  the  labor  utilization  are

proportionally posted to all operations.

BDE-BEA_82.docx

Version: 1.2.23049

Page 6 of 13

Machining Center / Pool of Orders

If  the  system  records  automatic  quantities  for  this machine,  the  quantities  and  the  production  times  are

posted the same way: the automatic quantities are only posted to the active operation and for the persons

logged on to this operation. Manual quantities are assigned to the operation to  which the quantities are

posted.

Also a HYDRA group workplace can be a machining center.

You  cannot  create  merged  operations  for  a  machining  center,  because  the  production  times  and

downtimes  are  always  posted  proportionally.  This  processing  of  postings  contradicts  the  processing  of

postings for a machining center.

The  posting  events  "Activate  operation"  and  "Deactivate  operation"  are  displayed  in  the  event

maintenance (events NC_AN, NC_AB).

BDE-BEA_82.docx

Version: 1.2.23049

Page 7 of 13

Functions on the terminal AIP 8.1

Machining Center / Pool of Orders

The  list  "Operations  on  workplace"  of  the  main  view  shows  all  operations  logged  on.  If  the  order  list  is

configured accordingly, the operation currently active is colored (green).

In the dialog "Activate OP", the operation selected in the main view is used and preassigned.

In the dialog "Deactivate OP", the active operation is automatically set.

Functions on the terminal AIP 8.2

Main view

The  list  "Operations  on  workplace"  of  the  main  view  shows  all  operations  logged  on.  A  green  frame

highlights the active operation. The MES order number of the inactive operations is displayed in gray.

BDE-BEA_82.docx

Version: 1.2.23049

Page 8 of 13

Machining Center / Pool of Orders

Detail view of the operation

To activate or deactivate an operation, just click on the operation. In the detail view of the operation, the

section "Operation" shows if the operation is active (green) or inactive (gray).

You can use the buttons on the left hand side to "Activate operation" or "Deactivate operation".

BDE-BEA_82.docx

Version: 1.2.23049

Page 9 of 13

Machining Center / Pool of Orders

Dialog "Activate operation"

In the dialog "Activate operation", the selected workplace is pre-assigned. You can select the operation in

the list that you want to activate. If an operation is currently active, this operation is shown in green until

you select the row of this operation.

Dialog "Deactivate operation"

In the dialog "Deactivate operation", the selected workplace and the selected operation are pre-assigned.

BDE-BEA_82.docx

Version: 1.2.23049

Page 10 of 13

Machining Center / Pool of Orders

Machine connection

To connect a machine, you must coordinate all details with the customer or the machine manufacturer. A

subsequent customization is required. The following details must be discussed:

Details of technical communication.

  Examples: OPC-UA, File-Interface, UMPS, etc.



Is the PCC run in stand-alone operation? (Note: only possible if you use AIP 8.2)

Details of logical communication.

  Can the machine control provide the data listed in the table below? If no:

o  How can the system identify this information?

o  Do you have to make extensions in the data collection dialogs?

  Which format does the data provided have?

  Does  the  machine  control  send  a  command  to  activate  an  operation  and  then  to  deactivate  an

operation or does the machine control only send a command to activate an operation?

Commands to activate or deactivate an operation

Field ID

DLG

MNR

ANR

Description

Dialog/record ID: always:
„NC_AN“ – activate OP.
„NC_AB“ – deactivate OP.

Workplace/machine number according to configuration

MES order number (order/OP)

Beforehand, you must manually log on the operations on the terminal.

Identification of the MES order number

If the machine control cannot pass the MES order number, a specific customization is required  to add the

MES order number (ANR) to the command to activate or deactivate an operation.

Load dynamic dialogs

Execute the following activities on the HYDRA server in the system directory.

1.  Save the existing dialog configuration:

UNIX systems (run at the server prompt in the HYDRA directory):
hydlgcfg.out DLGCFG.TYP=% DLGCFG.DLGUSR=% DLGCFG.DLG=% DATEI=dialog.dlg

Windows systems (Execute in a DOS window in the HYDRA directory):
hydlgcfg.exe DLGCFG.TYP=%% DLGCFG.DLGUSR=%% DLGCFG.DLG=%% DATEI=dialog.dlg

2.  Now load the new dialog configurations using the following command:

BDE-BEA_82.docx

Version: 1.2.23049

Page 11 of 13

Machining Center / Pool of Orders

UNIX systems:

hymw.out -u9999 -b
db_sql/aip_bde_bea.dlg

Windows systems:

hymw.exe -u9999 -b
db_sql\aip_bde_bea.dlg

Please note:
If UNIX systems are used, you must enter the file name in lower case letters, as HYDRA Install
converts all file names into lower case letters during installation.

3.  Activate the new dynamic dialogs:

UNIX systems:

hydialog.scr AIPTNR 0

Windows systems:

sh.exe hydialog.scr AIPTNR 0

Note:
This command activates the default dialogs. If terminal or terminal group-specific dialogs are used on
the system, they must be customized by an MPDV consultant.

4.  Execute configurations described in chapter "Activation" or the "Configuration AIP".  If terminal or

terminal group-specific dialogs are used on the system, the settings should ideally be made with the
support of an MPDV consultant.

5.  Start the terminal and test the function.

AIP configuration

Display of the active operation on the terminal AIP 8.1 (if required)

Older installations of the AIP 8.1 can still include the following configuration. Make the following settings

in the ctaiplay.ini to highlight the currently active operation on the terminal:

[order list]
…
GRID_COLOR=clSilver
GRID_BACKGROUND=clWhite
EXAMINE_SCANEXPR1=AKTIV=J
EXAMINE_SCANEXPR2=AKTIV=N
EXAMINE_SCANCOLOR1=clBlack
EXAMINE_SCANBKEXPR1=AKTIV=J
EXAMINE_SCANBKEXPR2=AKTIV=N
EXAMINE_SCANBKCOLOR1=clLime
EXAMINE_SCANBKCOLOR2=clWhite
…

Configuration of the buttons on the terminal AIP 8.1 (if required)

Older installations of the AIP 8.1 can still include the following configuration. Make the following settings

in  the  ctaipbut.ini  to  show  the  buttons  Activate  and  Deactivate  on  the  terminal.  You  can  position  the

buttons  anywhere  as  long  as  the  existing  buttons  are  respected.  You  must  ensure  that  the  buttons  are

entered in the required section of the file ctaipbut.ini and that numbers are consecutive.

BDE-BEA_82.docx

Version: 1.2.23049

Page 12 of 13

Machining Center / Pool of Orders

Example:

[ANR-ALL-Page4]
1=NC_AN,L,Activate OP
2=NC_AB,L,Deactivate OP

Automatic deactivation of active operation
Parameter in ctaip.ini:

[System]
NC_AUTO_DEACTIVATE=Y

Use  this  parameter  to  disable  the  plausibility  function,  which  ensures  that  only  one  operation  can  be

active. At the same time, the following automatic is active when you activate an operation:

The currently (previously) active operation is first deactivated. Then the new operation is activated. Note:

The system does not perform these processing steps in one transaction. The system also deactivates the

previously active operation if the new operation cannot be activated because of a plausibility error.

BDE-BEA_82.docx

Version: 1.2.23049

Page 13 of 13

