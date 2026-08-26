Manual

Machining Center/ Pool of
Orders
BDE-BEA 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Machining Center/ Pool of Orders

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-BEA_81.docx

Version: 1.0.18468

Page 2 of 9

Machining Center/ Pool of Orders

Contents

1  Overview of Machining Center/Pool of Orders ............................................. 4

2  Machining Center / Order Pool ..................................................................... 6

BDE-BEA_81.docx

Version: 1.0.18468

Page 3 of 9

Machining Center/ Pool of Orders

1

 Overview of Machining Center/Pool of Orders

Possible fields of application

This component allows for the problems of a "machining center/pool of orders" to be represented.

Implementation notes

This  function  package  is  used  if  you  have  machines  or  machining  centers  where  different  items/orders

are processed simultaneously.

In a machining center several operations are logged on to a machine (= machining center) at the same

time.  As  several  operations  are  processed  sequentially  at  a  machine,  they  need  to  be  differentiated  to

post  the  duration  and  labor  utilization  only  to  the  active  operation.  In  HYDRA-MDE  (Machine  Data

Collection) produced quantities are only posted onto active operations.

In the classical sense of a machining center, e.g. a robot works on several tables with different orders at

the  same  time.  In  a  machining  center  several  orders  can  be  processed  alternately  at  a  machine  or

workstation.

This  example  is  to  explain  how  machining  centers  can  be  used.  A  machining  center  has  two  painting

stations that are fed by a robot. Painting station 1 uses the color blue and painting station 2 uses the color

green.  Different  articles  are  produced  (item  1  and  item  2).  One  operation  or  one  production  order  is

required for each article/item to be produced. This example has two production orders:

Blue

Article

Article 1

Green

Article 2

These  two  articles  can  be  produced  and  painted  at  the  same  time.  The  items  can  be  processed  in

different order or with different quantities at the robot.

BDE-BEA_81.docx

Version: 1.0.18468

Page 4 of 9

Machining Center/ Pool of Orders

Integration

Two different connection or collection variants are possible:

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

  Automatic  registration  of  events  by  data  taken  over  from  machine  controls  (SPS)  using  an

interface or manual registration by inputting events at the shop floor terminal

  Downtime  monitoring  at  the  Windows  terminal  including  alternative  downtime  monitoring  using

machine interfaces or manual input

  Direct posting of recorded quantities and production times onto the corresponding operation

  Proportionate posting of downtimes and malfunction periods onto the registered operations

BDE-BEA_81.docx

Version: 1.0.18468

Page 5 of 9

2  Machining Center / Order Pool

Machining Center/ Pool of Orders

Usage

The  "Machining  center  /  Order  pool"  functionality  in  AIP  allows  for  the  sequential  processing  of  several

operations logged on at the same time.

Prerequisite

Using the functionality requires provision of the configurations described in section Configuration .

Logon Procedure and Posting

Different  operations  are  logged  on  to  the  relevant  machine  by  the  operator.  Other  persons  may  log  on

optionally.

Precisely one operation is edited at a time. If the machine is in the "Production" mode, the duration and

full labor utilization is posted to  the  active OP only. If no operation is active, no duration  is recorded as

regards the order. If there is a machine failure, the duration and labor utilization is proportionately posted

on all operations.

BDE-BEA_81.docx

Version: 1.0.18468

Page 6 of 9

Machining Center/ Pool of Orders

If  automatic  quantities  are  recorded  for  this  machine,  posting  is  performed  in  analogy  to  the  time  of

production: the automatic quantities are only assigned to the active operation and the persons logged on

to it. Manual quantities are assigned to the operation for which the quantities are posted.

A HYDRA group workplace , too, may represent a machining center. In this regard, however, automatic

connection via interface is not possible.

The  formation  of  a  merged  operation  at  a  machining  center  is  not  permissible,  since  production  and

disturbance times are always posted proportionately for merged operations and this is in contradiction to

the definitions of a machining center.

The  posting  events  "Activate  operation"  and  "Deactivate  operation"  are  displayed  in  the  event

maintenance (Events NC_AN, NC_AB).

Function at Terminal

The "Operations at workplace" list in the basic screen shows the operations logged on. Given the relevant

configuration of the list of orders (cf. section Configuration), the relevant active operation is color-marked.

BDE-BEA_81.docx

Version: 1.0.18468

Page 7 of 9

Machining Center/ Pool of Orders

In  the  "Activate  OP"  dialog,  all  operations  logged  on  to  the  machine  are  shown  (including  the  currently

active operation). The operation marked in the basic screen is adopted as the selection.

In the "Deactivate OP" dialog, the active operation is set automatically.

Automatic deactivation of the active operation

Parameter in ctaip.ini   [System]  NC_AUTO_DEACTIVATE=Y

 (Default: N)

This button deactivates the validation function that only one OP may be active, and an automatic process

is activated instead: the currently (previously) active operation is deactivated first and the new operation

is  activated  subsequently.  It  is  to  be  observed  that  this  process  is  not  related  to  a  transaction,  but  that

deactivation takes place even if subsequent activation is not possible due to an error. Such processing is

effective both with manual operation on the terminal and if controlled via a PCC-ADP telegram.

Configuration

Activation on MOC

The "Machining center" functionality is activated in the Machine / Workplace configuration :

Menu Master data  Workplace/Resource configuration  Tab Workplace configuration  Workplace

category=J <Machining center>

Display of the active operation at the terminal

In order to highlight the currently active operation at the terminal, the settings listed below are required in

ctaiplay.ini:

[Order list]
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
....

Configuration of keys in ctaipbut.ini

Buttons  may  be  freely  positioned,  but  consideration  of  the  existing  buttons  is  required.  It  must  also  be

observed that the buttons are entered in the requested section and numbers are consecutive. Example:

[ANR-ALL-Page4]
1=NC_AN,L,Activate OP
2=NC_AB,L,Deactivate OP

BDE-BEA_81.docx

Version: 1.0.18468

Page 8 of 9

Machining Center/ Pool of Orders

Connection via PCC-ADP Telegram

Connection via PCC-ADP requires additional licenses.

The  details  of  the  planned  connection  are  coordinated  through  joint  discussions  and  the

required settings on the application adapter are made in the course of customizing.

For activating the processing of a machine, the "Machining center" value is to be set active as the Type in

the  machine  configuration  (see  above).  For  these  machines,  the  terminal  evaluates  the  data  sent  via  a

PCC-ADP telegram. Operations must previously be logged on at the terminal manually.

An  automatic  status  change  and/or  downtime/standstill  monitoring  as  for  the  file  interface  will  not  take

place!

Dialog string for entry

Field
identification

Type

Description

DLG

C10

Dialog/Record identification:
"NC_AN" – Activate OP
"NC_AB" – Deactivate OP

MNR

ANR

C20

C20

Workplace/Machine number according to configuration

MES order number (order/OP)

Should  identification  of  the  operation  not  be  possible  in  the  PCC-ADP  telegram,  a  customer-specific

extension is required in order to supplement the dialog string by the operation number!

BDE-BEA_81.docx

Version: 1.0.18468

Page 9 of 9

