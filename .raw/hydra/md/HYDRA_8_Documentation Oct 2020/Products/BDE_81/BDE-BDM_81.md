Manual

Shop Floor / Order Data
Management
BDE-BDM 8.1

Version 1.5.7737

Last changed on: 19.06.2020

Shop Floor / Order Data Management

Copyright

©Copyright 2012 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-BDM_81.docx

Version: 1.5.18468

Page 2 of 125

Shop Floor / Order Data Management

Contents

1  Overview Shop Floor / Order Data Management ......................................... 6

2  Fields of Application for HYDRA-BDE ......................................................... 8

2.1  Summary ............................................................................................................. 8

2.2  Basics of shop floor data collection ..................................................................... 8

2.3  Presentation of recording results ....................................................................... 10

2.3.1  Time Recording ..................................................................................... 10

2.3.2  Quantity collection ................................................................................. 11

2.3.3  Options of Machine Data Collection ....................................................... 12

3  Erfassungsarten der BDE (arbeitsgangbezogen) ...................................... 15

3.1  Serial production ............................................................................................... 15

3.2  Parallel production............................................................................................. 15

3.3  Merged operations ............................................................................................ 15

3.4  Splits ................................................................................................................. 16

3.5  Multiple machine production .............................................................................. 16

3.6

"Mixed operation" .............................................................................................. 16

4  Erfassungsarten der BDE (personenbezogen) .......................................... 17

4.1

1.1 Summary ..................................................................................................... 17

4.2  Single machine operation .................................................................................. 17

4.3  Multiple machine operation ................................................................................ 17

4.4  Group work ....................................................................................................... 18

4.5

"Mixed operation" .............................................................................................. 19

5  Erfassung in der BDE ................................................................................. 21

5.1

1.1 Summary ..................................................................................................... 21

6  Validation Checking ................................................................................... 23

6.1  Summary ........................................................................................................... 23

6.2  Validation checks regarding overdelivery or underdelivery ................................ 23

6.2.1  Summary ............................................................................................... 23

6.2.2  Overdelivery/underdelivery checking activated in relation to

operations ............................................................................................. 24

BDE-BDM_81.docx

Version: 1.5.18468

Page 3 of 125

Shop Floor / Order Data Management

6.2.3  Overdelivery/underdelivery check activated in relation to staff ............... 25

6.2.4  Overdelivery/underdelivery check for the automatic collection of

quantities ............................................................................................... 26

7  BDE Log Records ...................................................................................... 30

7.1  General ............................................................................................................. 30

7.2  Record type A ................................................................................................... 30

7.3  Record type T .................................................................................................... 31

7.4  Record type U ................................................................................................... 32

7.5  Record type E ................................................................................................... 33

7.6  Record type H ................................................................................................... 34

7.7  Record type B ................................................................................................... 34

7.8  Special features ................................................................................................ 35

8  Updating of the Posting Status................................................................... 37

8.1

1.1 Summary ..................................................................................................... 37

9  Posting of Times ........................................................................................ 38

9.1  General ............................................................................................................. 38

9.2  Special features ................................................................................................ 40

10  Posting of Quantities .................................................................................. 42

10.1  General ............................................................................................................. 42

10.2  Special features ................................................................................................ 43

11  Controlling the Sequencing List ................................................................. 45

12  Order and Operation-Related Functions .................................................... 48

13  Day Types .................................................................................................. 54

14  Days Off ..................................................................................................... 57

15  Year Model ................................................................................................. 59

16  Order Types ............................................................................................... 65

17  Order Status Texts ..................................................................................... 80

BDE-BDM_81.docx

Version: 1.5.18468

Page 4 of 125

Shop Floor / Order Data Management

18  Order Status Assignment ........................................................................... 82

19  Order-Related Posting ............................................................................... 90

20  Event Maintenance .................................................................................. 105

21  Foreman's Checklist ................................................................................. 120

BDE-BDM_81.docx

Version: 1.5.18468

Page 5 of 125

Shop Floor / Order Data Management

1  Overview Shop Floor / Order Data Management

Purpose

The  function  package  “shop  floor  /  order  data  management”  provides  an  extensive  range  functions  for

recording times and quantities in orders / operations. In addition, it provides  the ability to correct entered

data later on.

Implementation considerations

You use the function package if you:

  would like to enter times and quantities for orders / operations so that these can be posted back

to other systems, if required

  would like to modify data entered in the system at a later date.

Features

  Order administration

o  Configuration  used  to  set  customer-specific  order  numbers,  order  sequence  numbers,

operation numbers or split number lengths

o  Support  for  different  types  of  orders  like  production  orders,  overhead  cost  orders,

capacity orders, maintenance orders and project orders

o  Administrative function for locking or releasing operations

o  Administrative function for terminating operations that are not (no longer) logged on.

o  Administrative function for reactivating inadvertently logged off operations

  Order-related entry and posting functions:

o  Log-on /off, interrupt and partially confirm orders or operations

o  Entering yields, scrap quantities, rework quantities or open quantities

o  Posting of recorded production and downtimes to freely definable resource performance

accounts

o  Comparing  recorded  workplace  /  machine  times  with  the  shift  model  stored  at  the

workplace

o  Posting runtimes and numbers of units per operation

  Maintaining entered data using posting maintenance:

o  Displaying order-related log records (postings) generated based on the data entered

o  The ability to edit and correct order-related log records

o  Generating cancellation log records during processing after uploading to the ERP system

  Event maintenance

o  The ability to display and correct entered BDE events

o  The ability to edit and correct BDE events as an alternative to posting maintenance

BDE-BDM_81.docx

Version: 1.5.18468

Page 6 of 125

Shop Floor / Order Data Management

o  Recalculation function based on changed/corrected BDE events Generating updated log

records (postings)

o  Generating cancellation log records during processing after uploading to the ERP system

BDE-BDM_81.docx

Version: 1.5.18468

Page 7 of 125

Shop Floor / Order Data Management

2  Fields of Application for HYDRA-BDE

2.1  Summary

The goal of the following description is to present the many collection and processing options offered by

HYDRA shop floor data collection (HYDRA-BDE) and machine data collection (HYDRA-MDE).

2.2  Basics of shop floor data collection

The  postings  (e.g.  logon/logoff,  end/interruption,  etc.)  associated  with  shop  floor  data  collection  in  the

HYDRA system are generally based on the machine, order and person components. Depending on the

approach  and  the  main  focus  of  the  individual  use  of  HYDRA,  different  components  might  play  a

prominent role or they might be unnecessary and therefore as far as possible disabled.

Machine/workstation – where does production happen?

Logging  an  order  or  employee  on  or  off  is  basically  machine  or  workstation  related.  Logging  on  to  a

machine  answers  the  question  of  where  a  BDE  posting  takes  place.  BDE  postings  can  basically  be

executed only on those machines or workstations which have been configured accordingly in the HYDRA

master data.

The designations machine and workstation are synonymous in HYDRA. In HYDRA-MDE, the expression

"machine" is favored. In HYDRA-BDE, the designation "workstation" is favored.

Order/operation - what is produced?

All tasks which employees perform on machines are order related. Logging the order or its operation on

answers the question what is done or which activity is executed.

HYDRA  differentiates  between  different  order  types  to  classify  orders  according  to  their  utilization.

Different control information that is decisive for managing the orders is defined for each order type.

HYDRA provides the following order types by default. Further order types can be created according to the

customer's requirements:

  Production order

A production order generally relates to the article/item and is characterized by a target quantity as

well as a completion date.

BDE-BDM_81.docx

Version: 1.5.18468

Page 8 of 125

Shop Floor / Order Data Management

  Overhead cost order

An overhead cost order (e.g. cleaning of the workplace) normally only refers to cost-accounting.

  Capacity order

A capacity order has only been designed for planning purposes (assignment of capacities) within

HYDRA  shop  floor  scheduling.  Normally,  capacity  orders  are  later  converted  into  production

orders.

  Project order

A  project  normally  is  unique.  The  project  steps  to  be performed  as  a  part  of  the  project  can  be

summarized in a project order.

  Maintenance order

A maintenance order has been designed for the planning or recording of maintenance measures.

In  general,  orders  are  created  in  a  higher  level  system  (e.g.  ERP  system)  and  transferred  to  HYDRA

using an interface. Nevertheless, orders can also be created manually in HYDRA. Planning of orders (in

the ERP system or HYDRA) depends on precise requirements.

Orders  are  mostly  multi-level  and  divided  into  several  operations  to  be  processed  on  different

workstations and machines. The order and operation are generally logged on to the shop floor terminal at

the  individual  workplace.  Data  can  only  be  posted  onto  operations  at  shop  floor  terminals  if  a

corresponding pool of orders exists in the HYDRA database.

The  terms  'order'  and  'operation'  are  mostly  synonymous  in  the  handbook  descriptions.  Usually,  when

posting  functions  on  the  terminal  are  being  described,  the  operation  is  meant,  and  documentation  on

HYDRA shop floor data collection also emphasizes operation data. Only in certain HYDRA descriptions is

the 'Order' used as an umbrella term for the whole multi-level production order.

Person - who is working?

Logon and logoff of the employee to/from the shop floor terminal is used in HYDRA to create the relation

to  the  machine  and  operation.  The  work  confirmations  of  employees  form  a  basis  for  the  calculation  of

personal  expenses  and  for  performance  determination.  The  logon/logoff  of  personnel  answers  the

question, who is working where and what they are working on.

BDE-BDM_81.docx

Version: 1.5.18468

Page 9 of 125

Shop Floor / Order Data Management

The  relation  of  a  posting  to  an  employee  is  mostly  optional.  The  logging  on  and  off  of  production

personnel  is  subject  to  fundamental  decisions  which  are  made  before  an  MES  system  is  introduced.

HYDRA  usually  only  allows  those  employees  to  log  on,  who  are  stored  in  the  HR  master  data  of  the

HYDRA database and authorized in the company.

2.3  Presentation of recording results

The components of data collection  - machine, order,  person,  - are summarized  to the  greatest possible

extent  in  logical  dialogs.  Consequently,  an  employee  may,  for  example,  log  on  and  off  to  and  from  a

terminal together with an order.

Decisions as to the design of individual dialogs on the shop floor terminals depend on the environment in

which  it  is  used,  the  industry  sector,  the  organization,  the  range  of  items,  the  order  structure  and  the

machinery involved.

The data collection options in HYDRA represent a range of exemplary uses, which are supported by the

modules  of  the  standard  system.  A  single  installation  requires  only  one  selection  of  the  possible

configuration options. Individual HYDRA settings are finalized by the HYDRA user, usually together with

an MPDV consultant, after successful installation and in the course of customizing.

2.3.1

Time Recording

"Posting events" on shop floor terminals form the basis for the posting of particular machine times to an

operation. A time posting is initiated by the posting event "logon" and completed logically by the posting

event "logoff" or "interruption". This basic principle applies to all order and personnel posting events.

The  time  posting  of  shop  floor  data  collection  primarily  occurs  in  two  different  time  accounts,  one  for

machine scheduling duration and the other for labor utilization.

The machine duration is determined here by the time interval between logon and logoff of an operation.

The machine scheduling time is compared with the shift calendar and planned shift breaks are removed

from the time interval calculation.

Labor utilization represents the total of all labor times for each operation. This period is determined by

the time interval between logon and logoff of the user or users. The basis for personnel postings is, once

again,  the  shift  model  of  the  workstation  and  the  breaks  it  contains.  If  employees  are  processing  more

than one order in parallel, then the HYDRA system carries out a proportional calculation of the operating

time of each operation.

BDE-BDM_81.docx

Version: 1.5.18468

Page 10 of 125

Shop Floor / Order Data Management

For further details on this please refer to the section entitled "posting of times".

The results are documented in "log records" that are generated automatically due to posting events.

2.3.2  Quantity collection

Quantities  are  separately  maintained  in  HYDRA  for  each  data  collection  level:  machine,  order,  and

person:

-  Machine related

e.g. for display of the shift performance in the machine efficiency report

-  Operation related

e.g. for display of the target-actual comparison in the order information

-  Personnel related

e.g. as the basis for incentive pay based on quantities

Depending  on  the  data  collection  type,  quantities  are  either  entered  automatically  (MDE/BDE  terminal

with counter connection) or must be entered manually.

Manual quantity postings are carried out in the entry dialog at the end of personnel or order processing

or as partial confirmation/upload during  order processing. Depending on the  objective, the entry  dialogs

Interrupt operation, Logoff operation, Logoff person and Partial confirmation/upload are configured for the

input  of  quantities.  Quantities  that  are  recorded  manually  are  always  posted  onto  the  operation  that  is

logged on. Posting  onto the person realizing the posting depends on the posting type or the respective

parameter settings configured in HYDRA.

Along  with manual entry of quantities, HYDRA also supports  automatic entry of quantities with active

machine  data  collection.  With  this  type  of  entry  of  quantities,  a  continuous  quantity  posting  to  the

machine, and to the logged on operation and the logged on employees takes place at cyclical intervals.

All OPs  and  employees logged on to the machine are automatically  assigned quantities. The quantities

are  computed  according  to  the  partitioning/cavity  that  is  respectively  defined  for  the  operation  and  are

posted onto the operations or persons.

BDE-BDM_81.docx

Version: 1.5.18468

Page 11 of 125

Shop Floor / Order Data Management

HYDRA  provides  different  accounts  for  quantity  posting.  The  accounts  that  are  predominantly  used  are

yield and scrap. The two fields are provided appropriately during data collection. Scrap quantities can be

classified by a scrap reason. The available scrap reasons are configured in HYDRA.

"Rework"  and  "open  quantity"  are  other  quantity  accounts.  Normally,  they  are  only  used  specifically  for

customer-specific scenarios. The fields can be made available by way of customizing.

2.3.3  Options of Machine Data Collection

By connecting a machine to the shop floor terminal an automated collection becomes possible:

-

-

-

Collection of production times and downtimes

Direct assignment of malfunction reasons by receiving operating signals from the machine control

Piece number recording for yield, total quantity and scrap

Every  workstation  and machine is assigned a shift model by the  HYDRA configuration. The shift model

determines the capacity of the machine and gives the shift calendar a reference time for the performance

of  a  machine.  All  machines  for  which  recording  of  standstills  is  carried  out  in  HYDRA,  have  a  definite

machine status at all times during the shift. The total of all production and downtimes during a shift gives

exactly the shift standard time.

Definition of downtime reasons

The determination of the relevant machine statuses forms the basis of machine monitoring by means of

machine signals. Together with the "production" status all data collection relevant downtime reasons for

the machine are created in HYDRA. The user may configure them individually.

Classification in HYDRA resource performance accounts

HYDRA resource performance accounts are a system of time accounts, consisting of 12 accounts. They

group  together  similar  downtime  reasons  in  a  single  account  (e.g.  all  technical  disturbances  go  in  the

"disturbance-caused  interruptions"  (DCI)  resource  performance  account).  During  data  collection,

accumulating times are posted to the resource performance account to which the current machine status

is assigned in the system configuration.

The standard definition of the HYDRA resource performance accounts is as follows:

BDE-BDM_81.docx

Version: 1.5.18468

Page 12 of 125

Shop Floor / Order Data Management

No.  Abbreviat

Description

ion

1

2

3

4

5

6

7

8

9

10

11

12

SUT

Secondary utilization time

DCI

Disturbance-caused interruption (= technical interruption)

LCI

Logistics-caused interruption (= organizational interruption)

SCI

Staff caused (personnel related) interruption

IMN

Idle mode, not scheduled (e.g. repairs)

IMS

Idle mode, scheduled (e.g. maintenance)

SET

Setup

STA

Startup

U8

Free for user (e.g. trial production)

U9

Free for user

MUT  Main utilization time; "Production"

FB

Neutral times, e.g. free, breaks etc.

If  recording  of  downtimes  is  not  required  or  if  the  recording  of  downtime  reasons  gives  no  clear  result

(e.g. for HYDRA group workplaces), then time recording generally takes place with Production status and

is represented in the resource performance account 11 (MUT) main utilization time.

The HYDRA resource performance accounts are also kept relating to operations and persons. Machine

scheduling times (machine duration) for operations and personnel result from the following calculation:

Scheduling time = total (RPA 1 .. RPA 11).

Automatic recording of number of pieces using machine signal connection

Recording a cyclical signal from the machine enables the recognition of downtimes, and by counting the

recorded cycles it is also possible to record the number of pieces produced.

To  ensure  an  accurate  determination  of  the  number  of  pieces,  HYDRA  supports  the  multiplication  of

recorded  cycles  with  multiple  accesses  per  cycle.  "Partitioning"  (also  called  cavity)  is  a  tool  specific

parameter, which is transferred to the terminal when an operation is logged on. As a default value specific

to articles/items, partitioning is defined in every operation for processing at the corresponding machine.

BDE-BDM_81.docx

Version: 1.5.18468

Page 13 of 125

Shop Floor / Order Data Management

Automatically recorded data are posted as machine performance in HYDRA and simultaneously assigned

to the operation and personnel currently logged on.

Entry

operation-related

person-related

actual quantities

machine times

labor utilization

X

X

X

X

X

X

BDE-BDM_81.docx

Version: 1.5.18468

Page 14 of 125

Shop Floor / Order Data Management

3  Erfassungsarten der BDE (arbeitsgangbezogen)

3.1  Serial production

The  serial  production  is  the  "classic"  approach  of  manufacturing  operations.  This  means  that  only  one

operation is produced at a machine at a time.

Serial production has the advantage that machine efficiency can be easily planned.

3.2  Parallel production

Parallel  production  means  that  more  than  one  operation  is  processed  simultaneously  on  the  same

machine.

At individual workplaces the system assumes that the two operations belong together (e.g. production

of  upper  and  lower  parts  with  the  same  tool  as  two  separated  operations).  Consequently,  the  system

connects each person (who is logged on) with every operation. However, the labor utilization relating to

operations is thereby halved.

At group workplaces, in contrast, parallel production is possible without the system linking the person to

all  operations  that  are  currently  being  processed.  This  is  mainly  used  at  assembly  workstations  where

several workers at the "Assembly" workstation process several operations in parallel. A disadvantage of

this option is that the planning of such workstations is difficult.

3.3  Merged operations

This is a special type of serial production. At the planning stage (e.g. HYDRA shop floor scheduling) or at

the shop floor terminal, different short running operations are grouped together in logical blocks with an

easy  to  handle  running  time  (i.e.  merged  operations).  For  these  merged  operations  HYDRA  creates  a

“representative” operation, which is logged  on for all individual operations included. The entered data is

divided according to different configurable perspectives.

BDE-BDM_81.docx

Version: 1.5.18468

Page 15 of 125

Shop Floor / Order Data Management

3.4  Splits

If an operation should  be  processed on several machines in parallel, the HYDRA shop floor scheduling

module allows for the operation to be split into several "splits". These splits are  handled by HYDRA like

separate operations and can separately be logged on and off independently of each other. The collection

of all actual data then pertains to the particular splits and to the original operation (master split), which is

known to the PPS system.

3.5  Multiple machine production

If  no  planning  tool  is  used  in  HYDRA  (e.g.  HYDRA  shop  floor  scheduling  module),  the  system  can  be

configured in a way that allows for an operation to be processed, i.e. logged on, on several machines at

the same time, without having to be split. Data is collected separately for every machine. A disadvantage

of this variant is that planning becomes very difficult.

3.6

"Mixed operation"

As regards the shop floor, HYDRA generally supports all forms of mixed operation. Consequently, splits,

merged  operations  and  "normal"  operations  can  be  processed  serially,  in  parallel  or  as  multi-machine

production. Data collection refers in each case to the collection forms presented above.

In this way, it might be possible in HYDRA, for example, that while an upper and lower part are produced,

the operation called "compression lower part" can be logged on to another workstation at the same time

for reworking purposes (e.g. debur).

BDE-BDM_81.docx

Version: 1.5.18468

Page 16 of 125

Shop Floor / Order Data Management

4  Erfassungsarten der BDE (personenbezogen)

4.1

1.1  Summary

The  sections  that  follow  describe  the  different  personnel-related  views  by  way  of  examples.  Postings

based  on  people  and  on  operations  are  displayed.  To  simplify  matters,  breaks  are  not  included  in  the

calculation of time intervals.

4.2  Single machine operation

"Single machine operation" means that one person works alone on an operation at one workstation.

4.3  Multiple machine operation

Multi machine operation means that one person processes several operations at several workstations at

the  same  time.  This  is  normal,  for  example,  on  semi  or  fully  automatic  machines,  where  one  person

monitors  several  machines,  feeding  them  with  raw  material  and  removing  the  finished  parts.  The  labor

utilization  relating  to  operations  is  reduced  according  to  the  number  of  machines  that  are  operated

simultaneously.

BDE-BDM_81.docx

Version: 1.5.18468

Page 17 of 125

Shop Floor / Order Data Management

Example

One person processes two operations at the same time on two machines.

                                             │ Record  │ Dur-  │  Labor     │
                                             │ type    │ ation │  duration  │
                                             ├─────────┼───────┼────────────┤
MACHINE 1                                    │         │       │            │
                                             │         │       │ d1    2.00 │
OP1 ╠═══════════════════╣                    │    U    │  5.00 │ d2/p  1.50 │
                                             │         │       │ Total 3.50 │
                                             ├─────────┼───────┼────────────┤
                                             │         │       │ d1    2.00 │
P1  ├───────────────────┤                    │    B    │  5.00 │ d2/p  1.50 │
                                             │         │       │ Total 3.50 │
MACHINE 2                                    ├─────────┼───────┼────────────┤
                                             │         │       │ d2/p  1.50 │
OP2         ╠══════════════════════════╣     │    U    │  6.00 │ d3    3.00 │
                                             │         │       │ Total 4.50 │
                                             ├─────────┼───────┼────────────┤
                                             │         │       │ d2/p  1.50 │
P1          ├──────────────────────────┤     │    B    │  6.00 │ d3    3.00 │
                                             │         │       │ Total 4.50 │
                                             └─────────┴───────┴────────────┘

    ├───────┼───────────┼─────────────┤  Time intervals
      d1=2h     d2=3h        d3=3h
       p=1       p=2          p=1
    ├────────────────┴────────────────┤  Time scale in h
   8.00            12.00            16.00

   p : the number of times the same person has logged in
   di: time interval i

4.4  Group work

Group  work  means  that  several  people  process  a  single  operation  at  one  workstation.  With  every

additional person who is logged on, the labor utilization increases accordingly.

Example

Three people process an operation on one machine.

                                          │ Record  │ Dur-  │ Labor    │
                                          │ type    │ ation │ duration │
                                          ├─────────┼───────┼──────────┤
OP ╠════════════════════════════════╣     │    U    │  8.00 │   15.00  │
                                          ├─────────┼───────┼──────────┤
P1 ├───────────────┤                      │    B    │  4.00 │    4.00  │
                                          ├─────────┼───────┼──────────┤
P2         ├────────────────────────┤     │    B    │  6.00 │    6.00  │
                                          ├─────────┼───────┼──────────┤
P3             ├────────────────────┤     │    B    │  5.00 │    5.00  │
                                          └─────────┴───────┴──────────┘

   ├───────┴───┴───┴────────────────┤  Time scale
  8.00            12.00            16.00

BDE-BDM_81.docx

Version: 1.5.18468

Page 18 of 125

Shop Floor / Order Data Management

4.5

"Mixed operation"

HYDRA allows for all of the above-mentioned variants to be mixed, that is, HYDRA correctly handles the

situation where a person with multi-machine operation is additionally logged on to a machine with group

work.

Example

Several  people  process

several  operations  on

several  machines

(parallel  production).

Machine 1 is an individual workplace

Machine 2 is a group workplace

                                                       │ Record │ Dur-   │  Labor       │
                                                       │ type   │ ation  │  duration    │
                                                       ├────────┼────────┼──────────────┤
Machine 1 Individual Workplace                         │        │        │              │
                                                       │        │ d1    2│ d1    2.0  P1│
OP 1 ╠═════════════════════════╣                       │   U    │ d2    1│ d2/2  0.5  P1│
                                                       │        │ d3    2│ d3/3  0.7  P1│
                                                       │        │ Total 5│ Total 3.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d1    2│ d1    2.0    │
P1  ├─────────────────────────┤                        │   B    │ d2    1│ d2/2  0.5    │
                                                       │        │ d3    2│ d3/3  0.7    │
                                                       │        │ Total 5│ Total 3.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d2    1│ d2/2  0.5  P1│
OP2           ╠══════════════════════════════════╣     │   U    │ d3    2│ d3/3  0.7  P1│
                                                       │        │ d4    1│ d4/2  0.5  P1│
                                                       │        │ d5    2│ d3/2  1.0  P1│
                                                       │        │ d6    1│ d6    1.0  P1│
                                                       │        │ Total 7│ Total 3.7    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d2    1│ d2/2  0.5    │
P1            ├──────────────────────────────────┤     │   B    │ d3    2│ d3/3  0.7    │
                                                       │        │ d4    1│ d4/2  0.5    │
                                                       │        │ d5    2│ d5/2  1.0    │
                                                       │        │ d6    1│ d6    1.0    │
                                                       │        │ Total 7│ Total 3.7    │
                                                       └────────┴────────┴──────────────┘

BDE-BDM_81.docx

Version: 1.5.18468

Page 19 of 125

Shop Floor / Order Data Management

                                                       ┌────────┬────────┬──────────────┐
Machine 2 Group Workplace                              │        │        │              │
                                                       │        │ d1    2│ d1    2.0  P2│
OP 3 ╠═════════════════════════════╣                   │   U    │ d2    1│ d2    1.0  P2│
                                                       │        │ d3    2│ d3    2.0  P2│
                                                       │        │ d4    1│ d4    1.0  P2│
                                                       │        │ Total 6│ Total 6.0    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d1    2│ d1    2.0    │
P2  ├─────────────────────────────┤                    │   B    │ d2    1│ d2    1.0    │
                                                       │        │ d3    2│ d3    2.0    │
                                                       │        │ d4    1│ d4    1.0    │
                                                       │        │ Total 6│ Total 6.0    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d3    2│ d3/3  0.7  P1│
OP 4                ╠════════════════════════╣         │   U    │ d4    1│ d4/2  0.5  P1│
                                                       │        │ d5    2│ d5/2  1.0  P1│
                                                       │        │ Total 5│ Total 2.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d3    2│ d3/3  0.7    │
P1                 ├────────────────────────┤          │   B    │ d4    1│ d4/2  0.5    │
                                                       │        │ d5    2│ d5/2  1.0    │
                                                       │        │ Total 5│ Total 2.2    │
                                                       └────────┴────────┴──────────────┘

    ├─────────┼────┼─────────┼────┼─────────┼────┤  Time intervals
       d1=2h  d2=1h  d3=2h   d4=1h   d5=2h   d6=1h

    ├────┴────┴────┴────┴────┴────┴────┴────┴────┤  Time scale in h
  08:00     10:00     12:00     14:00     16:00

   di: Time interval i

BDE-BDM_81.docx

Version: 1.5.18468

Page 20 of 125

Shop Floor / Order Data Management

5  Erfassung in der BDE

5.1

1.1  Summary

In HYDRA data is generally recorded by collecting and processing dialogs. Processing of a dialog results

in events that are the basis for updating (calculation of statuses) and posting (generation of log records).

Core functions of data acquisition are the functions to resolve dialogs into events as well as checking and

processing functions that lead to the generation of events within the system.

Dialogs

Dialogs represent the system's interface with the shop floor.

Events  are  generated  by  resolving  the  dialog.  Resolving  of  the  dialog  into  individual  events  is

performed  based  on  dialog  data,  the  processing  logic  of  the  dialog  (incl.  configurations)  and  the

context of the dialog (posting status).

Some of the HYDRA-BDE input dialogs are:

Dialog

A_AN

Meaning

Log operation on

A_P_AN

Log operation and person on (together)

A_TR

A_UN

A_AB

P_AN

P_AB

P_AAB

SA_AN

SA_TR

SA_AB
SA_ABME

Confirm/upload OP partially

Interrupt operation

Log operation off

Log person on

Log person off

Log all persons off (1... n P_AB)

Log merged operation on

Partial upload of merged operation

Log merged operation off

Events

Events result from resolving dialogs and are thus the result of  data input. Which events get to the

system at what times, as a result, represents an important point of controlling the software.

BDE-BDM_81.docx

Version: 1.5.18468

Page 21 of 125

Shop Floor / Order Data Management

Further, partly optional, data acquisition functions are:

 logging of the dialog and the resulting event,

 provision of the posting result,

 provision  of  current

information

in

the

form  of

lists

(e.g.  machine

lists,  order

lists),

 escalations.

BDE-BDM_81.docx

Version: 1.5.18468

Page 22 of 125

Shop Floor / Order Data Management

6  Validation Checking

6.1  Summary

Validation  checking  of  a  dialog  verifies  whether  the  system  is  in  the  position  to  completely  process  all

resulting  events  in  the  current  status.  If  the  dialog  cannot  be  processed,  i.e.  not  all  events  have  been

checked successfully, the dialog is rejected without making changes to the system.

These  checks  evaluate  dialog  data,  the  generated  events  and  the  HYDRA  dataset  and  interpret  the

posting status. Furthermore, different (partly optional) configurations are taken into account.

Examples of validation checks based on dialog data:

--> if an OP is logged on, the registered OP has to exist within the HYDRA dataset

-->  if  an  OP  is  logged  on,  the  registered  machine  has  to  exist  within  the  HYDRA  dataset

--> if personnel is logged on, the person who performs the posting needs to exist in the HYDRA dataset

--> when posting to group workplaces, the person has always to be logged on as well

Examples of validation checks regarding the posting status:

 if an OP is uploaded partially, the registered OP has to be logged on to the registered machine

-->  if  staff  is  logged  off  the  person  who  performs  the  posting  needs  to  be  logged  on  to  the  registered

machine.

Some examples of configuration options taken into account by validation checking:

 if an OP is logged on, the person carrying out the posting must be allowed to log the OP on

-> if an OP is partially uploaded, the overdelivery quantity may not be exceeded

Some of the validation checks are explained in more detail in the sections that follow:

6.2  Validation checks regarding overdelivery or underdelivery

6.2.1  Summary

Quantities  that  are  posted  when  an  operation  is  partially  uploaded,  interrupted  or  logged  off  can  be

checked as regards overdelivery. In addition, they may also be checked as regards underdelivery when

an operation is logged off.

BDE-BDM_81.docx

Version: 1.5.18468

Page 23 of 125

Shop Floor / Order Data Management

By  default,  quantity  checking  in  HYDRA  has  generally  been  designed  for  the  manual  collection  of

quantities. On the one hand, it is only performed if a quantity <> 0 is included in the posting dialog and, on

the  other,  it  is  performed  every  time  a  quantity  <>  0  is  posted.  The  same  applies  when  it  comes  to

overdeliveries, even if they were confirmed beforehand by entering a deviation reason.

The  overdelivery/underdelivery  check,  also  referred  to  as  target  quantity  check,  can  be  activated  in

relation to operations as well as to staff.

6.2.2  Overdelivery/underdelivery checking activated in relation

to operations

An  overdelivery  or  underdelivery  check  can  be  enabled  for  the  operation.  The  following  values/settings

are relevant in this context:

Underdelivery

Value in percent that may deviate from the target quantity. Example:

-  Target quantity of the operation: 120 items

-  Underdelivery:84%

The actual quantity must not fall below 70 pieces.

Overdelivery

Value in percent that may deviate from the target quantity. Example:

-  Target quantity of the operation: 120 items

-  Overdelivery: 168%

The actual quantity must not exceed 140 pieces.

BDE-BDM_81.docx

Version: 1.5.18468

Page 24 of 125

Shop Floor / Order Data Management

Reaction

In case the limit values of the overdelivery or underdelivery fields are exceeded, a possible response may

be to display a warning or an error message. Possible values are:

"blank"   no reaction

W

X

 warning

 error

Provided that a warning is activated ("W"), a quantity variance may be confirmed at the Windows terminal

by entering a deviation reason. If an error is enabled ("X"), a quantity variance will be rejected.

Please note

By default, checking based on operations applies to the collected yield (primary quantity unit).

However,  by  customizing  the  processing  code,  it  may  also  apply  for  scrap,  rework  or  the  problem

quantity. Alternative quantity units (e.g. secondary quantity, etc.) are not planned to be checked by

default.

Basically:  DOS  terminals  generally  reject  any  quantity  variance  with  an  error,  even  if  the  option  is

set to "W".

MOC (console) does not provide this function that is available at Windows terminals.

If the  SAP  interface "PP-PDC"  is  in  use,  limit  values  for overdelivery/underdelivery  are transferred

as absolute values. HYDRA converts them into percentage values at the interface.

6.2.3  Overdelivery/underdelivery check activated in relation to

staff

In addition or as an alternative, it is also possible to enable a personal overdelivery/underdelivery check.

For  this  purpose,  the  HR  master  provides  the  "target  quantity  check"  option  in  the  "BDE"  tab.  Possible

values:

1) No check.

2) Logoff of order: A check is only performed on the logoff of an operation to verify whether the current

yield is between the specified minimum and maximum target quantity, when the operation is logged off.

Both quantities are also defined with respect to staff in the HR master.

BDE-BDM_81.docx

Version: 1.5.18468

Page 25 of 125

Shop Floor / Order Data Management

3) Underdelivery/overdelivery: All quantity postings are checked for overdelivery, when orders are logged

off/partially  uploaded  and  interrupted.  When  an  operation  is  logged  off,  it  is  also  checked  for

underdelivery.

Please note

In general, personal checks only refer to yield (primary quantity unit).

The limit values for overdelivery and underdelivery defined in operation data do not affect this and

are checked separately - provided that they have been set accordingly. In this case, the personnel-

related target quantity check is performed, then the operation-related check.

6.2.4  Overdelivery/underdelivery check for the automatic

collection of quantities

In HYDRA standard, the target quantity check has generally been designed for the  manual collection of

quantities.  It  is  only  performed  if  a  quantity  <>  0  is  included  in  the  posting  dialog.  The  paragraphs  that

follow  describe  different  scenarios  that  explain  processing  in  connection  with  the  automatic  entry  of

quantities.

Scenario 1

If  an  operation  is  posted  (interruption,  logoff  or  partial  confirmation/upload)  in  the  active  "production"

status,  the  quantities  that  have  been  recorded  automatically  since  the  last  posting  (e.g.  status  change,

operation posting, personal posting) and the quantities that might have been recorded manually are sent

to the server for updating. As the command (DLG=...) sent to the server includes a quantity, a validation

check  is  performed,  irrespective  of  whether  the  worker  has  additionally  posted  a  manual  quantity  <>  0.

The check now refers to the automatically collected quantity (AGR:GUT=...) as well as to the quantity that

might be collected manually (EGR:GUT=...).

BDE-BDM_81.docx

Version: 1.5.18468

Page 26 of 125

Shop Floor / Order Data Management

Scenario 2

If  a  machine  switches  from  the  production  status  to  “malfunction”  the  quantities,  which  have  been

recorded up to this point in time (AGR:GUT=...) are sent along with the status change (DLG=M_MST|...)

to  the  server  for  updating.  As  this  is  an  automatic  posting  (status  change),  a  validation  check  is  not

required.

In case an operation is posted afterwards, a check is only performed if the worker has manually recorded

a quantity <> 0. This quantity is sent to the server along with the posting (e.g. DLG=A_UN|EGR:GUT=...).

If the worker, for example, does not enter a quantity when the operation is interrupted (quantity = 0), no

checking is performed, as no quantity is sent to the server (DLG=A_UN|...).

As  automatic  quantities  have  not  been  collected  since  the  last  status  change,  this  posting  does  not

include any automatic quantities, which could be checked for validity.

BDE-BDM_81.docx

Version: 1.5.18468

Page 27 of 125

ProductionAutomatically entered quantitiesMachine statusIncl. manual quantityInterruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsUnderdelivery/overdelivery checkingyesnoWorker has not entered a manual quantity. The automatically recorded quantity is only transferred.e.g. DLG=A_TR|AGR:GUT=7|….The quantity manually recorded by the worker is transferred along with the automatically collected quantitye.g. DLG=A_TR|AGR:GUT=6| EGR:GUT=4|….*Underdelivery is only checked if operations are logged off

Shop Floor / Order Data Management

Scenario 3

Automatic  quantities  can  still  be  collected,  even  if  the  machine  is  in  the  malfunction  status  and  the

production lock is set.

In  this  case,  this  automatic  quantity  is  sent  along  with  the  manual  posting  to  the  server  using  the

command (e.g. DLG=A_UN|AGR:GUT=...) and is checked for validity.

This  is  performed  just  as  described  in  scenario  1,  irrespective  of  whether  the  worker  has  entered

quantities manually or not during the posting process.

BDE-BDM_81.docx

Version: 1.5.18468

Page 28 of 125

ProductionMalfunction XAutomatically collected quantitiesMachine statusIncl. manual quantityChecking of underdelivery/ overdeliveryJaThe worker has not entered a quantity manually. (The automatically recorded quantity has already been posted along with changing the status)e.g. DLG=A_UN|….The manual quantity entered by the worker is transferrede.g. DLG=A_UN|EGR:GUT=4|….Overdelivery is not checked*  Machine status change(M_MST)Automtically collected quantities are automatically posted when machine statuses change. e.g. DLG=M_MST|AGR:GUT=6|…..Interruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsNo

Shop Floor / Order Data Management

BDE-BDM_81.docx

Version: 1.5.18468

Page 29 of 125

ProductionMalfunction Xincluding production lockAutomatically recorded quantitiesMachine statusIncl. manual quantityUnderdelivery/ overdelivery is checkedYesNoWorker has not entered manual quantities. Automatically collected quanttiy since status change: 3, e.g. DLG=A_UN|AGR:GUT=3|….The manual quantity entered by the worker will be transferred, e.g. DLG=A_UN|AGR:AUS=3| EGR:GUT=4|….Overdelivery is not checked*  Machine status changel(M_MST)Interruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsAutomatically recorded quantities are posted autoamtically when machine statuses are changede.g. DLG=M_MST|AGR:GUT=6|…..

Shop Floor / Order Data Management

7  BDE Log Records

7.1  General

The "posting" function generates log records from recorded events. Log records describe a period of time

and include the evaluation of different values, such as quantities, durations or performances.

A BDE log record is an evaluated data record that is generated due to posting events. "Evaluated" means

that this data record

  generally refers to a period of time (in an extreme case, this period of time is reduced to a point

in time),

and



includes durations (machine times, labor utilization, resource performance accounts) or

  evaluated quantities (e.g. yield, scrap)

HYDRA-BDE log records describe postings based on operations, staff and batches. Which log record is

generated  at  which  point  in  time  depends  on  different  factors,  such  as  triggering  posting  events,

configured  posting  rules  or  the  HYDRA  modules  in  use.  The  different  types  of  log  records  are

differentiated by their record type. The following record types based on orders are distinguished:

7.2  Record type A

General

A log record of the record type A is generated when an operation is logged on. It has been designed to be

able to upload operation logons to the higher-level ERP/PPS system.

Triggering events and dialogs

Events: Logon of operation (A_AN)

Dialogs: Log operation on (A_AN),

Log operation and person on (together) (A_P_AN),

Log operation on with output batch (A_AN_MPL),

Beginning of shift (A_AAN)

etc.

BDE-BDM_81.docx

Version: 1.5.18468

Page 30 of 125

Shop Floor / Order Data Management

Special remarks

Using  optional  configurations,  different  other  dialogs  can  also  cause  an  operation  to  be  logged  on  (e.g.

change order if the machine status changes).

The log record is not displayed in the maintenance of postings function. Consequently, it cannot be edited

(changed, deleted).

7.3  Record type T

General

A  log  record  of  the  record  type  T  is  generated  when  "partial  uploads/confirmations"  are  recorded.  In

contrast to all other record types that refer to a period of time, this log record always refers to exactly one

point in time (beginning of posting and end of posting are identical in the log record). Thus, this log record

does  not  include  durations,  i.e.  fields  relating  to  durations  do  not  include  a  value  (0).  The  log  record

contains the quantities recorded with the upload.

Triggering events and dialogs

Events: all events that include a manual quantity (A_TR, A_UN, A_AB, etc.)

Dialogs:

all dialogs that include a manual quantity .

Special remarks

In general, a partial upload may be performed for an operation that is logged on. However, the "posting

onto OPs that are not logged on" configuration (workplace/machine configuration) allows for an inactive

operation to be uploaded by way of a "quantity upload”.

All quantities posted onto an operation are included in the single partial uploads (record type T) and as

total in the log records "interruption of operation" (record type U) and "logoff of operation" (record type E).

Thus, a T record is generated for each quantity that is collected and posted on an operation.

Manual quantities may be recorded in any dialogs, e.g. in a partial upload, when personnel is logged off,

when an operation is interrupted or logged off, when batches are posted, etc. The log record of the record

type T with manual quantities is directly generated, when the dialog is recorded/posted (not only when the

operation is logged off/interrupted, for example).

BDE-BDM_81.docx

Version: 1.5.18468

Page 31 of 125

Shop Floor / Order Data Management

In addition, the automatic collection of counters allows for quantities to be posted onto active operations.

T  records  are  generated  for  these  quantities  as  well.  HYDRA  accumulates  the  quantities  from  the

automatic collection over a period of time and generates the corresponding T record(s),  but only if the

scenario changes. This may be, for example, an order or person that is logged on manually, a manual,

partial upload/confirmation or a manual or automatic machine status change.

The single partial uploads/confirmations also represent the collection of quantities with different reasons

(e.g. scrap reasons).

Example:

Scrap  (quantity  1)  with  the  reasons  1,  2  and  3  each  was  recorded  for  an  operation.  The  U  or  E  record

shows a total scrap quantity of 3. In addition, HYDRA records three T records each with a scrap quantity

of 1 and the corresponding reason.

7.4  Record type U

General

A  log  record  of  the  record  type  U  is  generated,  when  an  operation  is  interrupted.  Either  the  user  can

interrupt the OP manually  or it can also be made automatically, for example, by the "shift automatic" of

HYDRA-MDE at the end of the shift.

The  log  record  of  an  operation  includes  the  period  of  time  between  logon  and  interruption  of  the

operation.  The  durations  included  in  the  log  record  refer  to  exactly  this  period  of  time  and  are

synchronized with the shift model of the workplace to which the operation was logged on: the times are

distributed  onto  the  individual  resource  performance  accounts  according  to  the  workplace/machine

statuses  that  occurred  during  this  period  of  time.  The  breaks  that  are  included  according  to  the  shift

model are posted onto the resource performance account 12.

The quantities and times posted in the log record are also posted onto the operation status.

Triggering events and dialogs

Events: Interruption of operation (A_UN),

Quantity upload to an inactive operation (A_MR)

Dialogs:

Interruption of operation (A_UN),

Quantity upload to an inactive operation (A_MR)

End of shift (A_AUN)

etc.

BDE-BDM_81.docx

Version: 1.5.18468

Page 32 of 125

Shop Floor / Order Data Management

Special remarks

In general,  an operation may only  be  interrupted  if it was logged on before. However, the "posting onto

OPs  that  are  not  logged  on"  configuration  (workplace/machine  configuration)  allows  for  an  inactive

operation to be uploaded using a "quantity upload”. In this case, the log record refers to a point in time

and, as a result, does not include any durations.

An  operation  may  also  be  triggered  to  be  interrupted  even  by  different  other  dialogs  through  optional

configurations  (e.g.  order  change  when  the  machine  status  is  changed  or  automatic  interruption  of  the

operation when the target quantity is reached).

7.5  Record type E

General

A log record of the record type E is generated, when an operation is logged off. As regards content, this

data record corresponds to a log record of the record type U.

Triggering events and dialogs

Events: Operation is logged off (A_AB),

An inactive operation is terminated (A_BE)

Dialogs:

Operation is logged off (A_AB),

An inactive operation is terminated (A_BE)

etc.

Special remarks

If an inactive operation is finished the log record refers to a point in time and, as a result, does not include

any durations.

An  operation  may  also  be  triggered  to  be  logged  off  even  by  different  other  dialogs  through  optional

configurations  (e.g.  the  operation  is  logged  off  automatically,  when  the  target  quantity  is  reached  or

predecessor operations are logged off automatically).

BDE-BDM_81.docx

Version: 1.5.18468

Page 33 of 125

Shop Floor / Order Data Management

7.6  Record type H

General

A log record of the record type H is generated, when an (output) batch is changed/logged off (ADE-CHV,

MPL). Either the user can change the batch manually or it can also be made automatically, for example,

by a machine signal or by interrupting the operation or by the "shift automatic" of HYDRA-MDE at the end

of the shift.

The log record includes the period of time between logon and logoff of the batch to/from the machine and

operation.  The  durations  included  in  the  log  record  refer  to  exactly  this  period  of  time  and  are

synchronized with the shift model of the workplace to which the batch and operation were logged on: the

times  are  distributed  onto

the

individual

resource  performance  accounts  according

to

the

workplace/machine  statuses  that  occurred  during  this  period  of  time.  The  breaks  that  are  included

according to the shift model are posted onto the resource performance account 12.

The quantities posted in the log record are also posted onto the batch.

Triggering events and dialogs

Events: Logoff of (output) batch (CA_AB)

Dialogs:

(Output) batch change (CA_WL)

Interruption or logoff of operation (A_UN, A_AB),

End of shift (A_AUN)

etc.

Special remarks

A batch posting does neither include labor utilization nor personal resource performance accounts.

A  batch  may  also  be  triggered  to  be  posted  even  by  different  other  dialogs  through  optional

configurations.

7.7  Record type B

General

A log record of the record type B is generated if a person is logged off from a workplace and an operation

that is active at this workstation. Either the user can log the person off manually or it can also be made

automatically, for example, by interrupting the operation or by the person clocking out (HYDRA-PZE: out)

or by the "shift automatic" of HYDRA-MDE at the end of the shift.

BDE-BDM_81.docx

Version: 1.5.18468

Page 34 of 125

Shop Floor / Order Data Management

The  log  record  includes  the  period  of  time  between  the  person  being  logged  on  and  logged  off  to  and

from the workplace and operation. The durations included in the log record refer to exactly this period of

time and, subject to the respective configuration, they are compared with the shift model of the workplace

to  which  the  person  and  operation  were  logged  on  or  with  the  person's  BDE  shift model:  the  times  are

distributed  onto  the  individual  resource  performance  accounts  according  to  the  workplace/machine

statuses  that  occurred  during  this  period  of  time.  The  breaks  that  are  included  according  to  the  shift

model are posted onto the resource performance account 12.

Triggering events and dialogs

Events:

Log person off (P_AB)

Dialogs:

Person is logged off (P_AB)

Interruption or logoff of operation (A_UN, A_AB),

End of shift (A_AUN)

HYDRA-PZE out (P_GEH)

etc.

Special remarks

A  person  may  also  be  triggered  to  be  logged  off  even  by  different  other  dialogs  through  optional

configurations (e.g. staff is logged off when the machine status is changed).

7.8  Special features

Evaluation date

The field “evaluation date” is defined for the work day evaluation of PZW (Personnel Time Management)

and the wage calculation of the LLE module. It has been designed to assign postings to a settlement day

for the LLE module and for the BDE/PZW comparison. Due to flexible working times, this settlement day

may differ from the ADE shift date, in particular for night shifts.

Further information can be found in the document entitled GLOSSARY_EvaluationDate.pdf.

Corresponding shift

The  time  stamp  for  logging  off  pertaining  to  a  BDE  log  record  determines  the  shift  (shift  date,  shift

number) to which the log record belongs.

BDE-BDM_81.docx

Version: 1.5.18468

Page 35 of 125

Shop Floor / Order Data Management

Operation splits

When it comes to split operations, the log record is ONLY generated for the split operation. A log record is

not generated for the split master itself. The status of the split master is only updated.

Merged operations

Log  records  are  generated  for  merged  operations  as  well  as  for  individual  operations.  The  statuses  of

individual operations are also updated accordingly. While posting, the recorded quantities and times of a

merged  operation  are  distributed  to  the  corresponding  individual  operations  according  to  different

configurations. The log records of individual operations only include proportionate quantities and times.

BDE-BDM_81.docx

Version: 1.5.18468

Page 36 of 125

Shop Floor / Order Data Management

8  Updating of the Posting Status

8.1

1.1  Summary

The functional area "updating of the posting status" has been designed to calculate statuses on the basis

of recorded events. A status describes the condition of an object regarding the values that vary over time

(e.g. OP status, posting status, etc.) and the relations between objects (e.g. OP is logged on to machine,

person is logged on to OP and machine).

Usually,  posting  relations  are  generated  for  logons  (operation  to  machine,  person  to  machine  and

operation) and canceled when they are interrupted/logged off.

An object's posting status is updated every time when the event to be posted directly or indirectly affects

the object.

Examples:

  By logging an operation on, this registered operation is set to the "running" status. The "operation

logon" event directly affects the operation.

  By  way  of  automatically  recorded  machine  counters,  resulting  quantities  are  posted  onto  the

operations  that  are  currently  active  at  the  machine.  The  "automatic  counter  posting"  event

indirectly affects the operation(s).

The posting status also has an essential influence on which events are triggered by a dialog. Thus, the

"log all persons off" dialog (P_AAB), for example, determines all persons who are active at the machine

from the posting status and generates or posts a "personnel logoff" event for each person.

BDE-BDM_81.docx

Version: 1.5.18468

Page 37 of 125

Shop Floor / Order Data Management

9  Posting of Times

9.1  General

The machine duration (or just duration) is determined by the time interval between logon and logoff of an

operation.  The machine  scheduling  time  is  harmonized  with  the  shift  calendar  of  the machine,  whereas

planned shift breaks are removed from the time interval calculation.

The  labor  utilization  (or  labor  duration)  is  the  sum  of  all  labor  times  for  each  operation.  This  period  is

determined by the time interval between logging the user(s) on and off. The shift model of the workplace

and the breaks included in this model are the basis even for personal postings (record type B). If several

persons  process  several  orders  at  the  same  time,  the  working  time  will  be  allocated  proportionately  for

the corresponding operation in HYDRA according to the number of operations to which the persons are

logged on.

The  determined  times  (duration,  labor  utilization)  are  updated  in  the  operation  status  (actual  duration,

actual labor utilization) and saved within the posting results - the log records.

Within the log record, assignment and meaning of time-related fields depend on the record type of the log

record:

Field

Record type U/E

Record type H *)

Record type B

Duration

The operation's production

The output batch's production

The person's sheer

time on the workplace

time on the workplace

registration time on the

operation.

Labor

Total of labor utilization of all

No labor utilization is defined

The person's labor

utilization

persons logged on to the

in the log record for batch

utilization at the

operation.

postings.

operation = evaluated

registration time

depending on the

person being logged

on (number of

operations and

workplaces).

RPA based

The operation's production

The output batch's production

The person's sheer

on orders

time on the workplace

time on the workplace

registration time on the

BDE-BDM_81.docx

Version: 1.5.18468

Page 38 of 125

Shop Floor / Order Data Management

Field

Record type U/E

Record type H *)

Record type B

distributed onto resource

distributed onto resource

operation distributed

performance accounts.

performance accounts.

onto resource

performance accounts.

Please note: Subject to the

current machine status, the

resource performance

account, which has been

assigned to this status during

the configuration, is

“charged”.

Personal

Total of the personal

Personal resource

By way of the

RPA

resource performance

performance accounts are not

"proportionate RPA

accounts (see record type B)

defined in the log record for

posting in personnel

of all employees logged on to

batch postings.

postings" option, the

the operation.

person's resource

performance accounts

(just as it is the case

for the labor utilization)

can be calculated

proportionately -

depending on the

person's registration

(number of operations

and workplaces).

If this option is not

active personal RPAs

correspond to RPAs

based on orders.

*) Batch posting (only with operations that are subject to management in batches).

Time-related fields do not play a role with log records of the record type A and T (always 0) and therefore

they are not included in this overview.

The  document  entitled  "data  collection  in  HYDRA-BDE  (personal)"  explains  the  process  of  determining

times within personnel postings in different scenarios using examples.

BDE-BDM_81.docx

Version: 1.5.18468

Page 39 of 125

Shop Floor / Order Data Management

Please note:

The determination of durations when status postings are recorded online at the terminal (or via PDM) only

takes into account a limited number of shifts relating to the point in time of the last posting made for this

machine.

However, durations might be missing or faulty in BDE log records if no postings (order postings, personal

postings, status changes, shift changes, or similar) are entered for a machine over a longer period of time

(e.g. the terminal is shut down).

9.2  Special features

Logging staff off during status 30000 "not assigned"

If a person logs off in status 30000 "not assigned", the duration of the labor utilization will be posted onto

the resource performance account that is assigned to the "general disturbance" status within the personal

BDE log record (record type "B"). If then the machine status is changed, the machine is assigned this new

status over the complete period of time. Thus, resource performance accounts might vary.

Specific configurations

The following configuration options may influence the above-mentioned posting of times/durations:

Proportionate posting for parallel OPs

Configuration based on workplaces (tab configuration > general).

Project time recording

When it comes to project time recording, the times to be posted are recorded manually instead of being

calculated by the system.

Post production time to main utilization time (MUT) during break

Cross-system configuration in the basic parameter settings of HYDRA.

RPA to calculate labor times

Cross-system configuration in the basic parameter settings of HYDRA.

Proportionate RPA posting in personnel postings

Cross-system configuration in the basic parameter settings of HYDRA.

BDE-BDM_81.docx

Version: 1.5.18468

Page 40 of 125

Shop Floor / Order Data Management

Synchronize labor utilization with the person's HYDRA BDE shift model

Cross-system configuration in the basic parameter settings of HYDRA.

HYDRA-ADE waiting period processing

Cross-system configuration in the basic parameter settings of HYDRA.

Merged operations

If  several  operations  are  grouped  into  a  merged  operation,  the  times  are  distributed  onto  the  individual

operations according to different configurations.

Split operations

Further information on how to post split operations or their split master can be found here.

BDE-BDM_81.docx

Version: 1.5.18468

Page 41 of 125

Shop Floor / Order Data Management

10  Posting of Quantities

10.1  General

Manually collected quantities

Manual  quantities  are  always  posted  onto  the  registered  operation  and,  subject  to  the  respective

configurations in HYDRA, to the person carrying out the posting as well. The below table shows whether

or when manually collected quantities are posted onto the operation and/or the reporting person.

Posting

Posting to operation

Posting to reporting person

Interrupt OP

Log OP off

Partial
confirmation/uploa
d

Log person off

Yes

Yes

Yes

Yes

*) compare the "Notes on personal posting of quantities"

No *)  **)

No *)  **)

Yes **)

Yes

**)  The  person  who  performs  the  posting  needs  to  enter  his/her  personal  badge  number  in  the  posting

dialog.

Please note for entering the quantity when personnel is logged off:

If  several  operations  are  logged  on  simultaneously,  the  quantities  will  be  posted  onto  all  operations.

Recommendation:

The  relevant  quantities  based  on  operations  should  be  recorded  as  partial  upload  for  each  operation,

before the person logs off (without entering a quantity).

Automatically collected quantities

All OPs and employees logged on to the machine are assigned automatic quantities. Automatic quantities

result, for example from counter collection.

The quantities to be posted are computed according to the partitioning/cavity that is respectively defined

for the operation and operations or staff are posted.

BDE-BDM_81.docx

Version: 1.5.18468

Page 42 of 125

Shop Floor / Order Data Management

Notes on the personal posting of quantities

The  personal  posting  of  quantities  depends  on  the  workplace  on  which  an  operation  was  produced.  In

general: automatically collected quantities are always posted onto all persons who are logged on.

Individual workplace (EAP)

If quantities are neither recorded automatically nor with respect to staff (i.e. no quantity is entered when a

person logs off), no quantities will be taken over to the person. Consequently, the quantity fields within the

personal posting dialog (posting of record type "B") are empty (0).

Exceptions:

a)  The "quantity posting to staff" configuration option within the machine/workplace configuration allows

for the manually recorded quantity to be posted onto the person who has so far been logged on for

the longest time, when an OP is interrupted or logged off.

b)  Using  the  option  of  the  HYDRA  basic  parameter  settings  "post  manual  quantities  as  automatic

quantities" allows for manually recorded quantities to be posted like automatically collected quantities,

i.e. they are posted onto all OPs and persons logged on.

Group workplace (GWP/GAP)

At  group  workplaces,  the  quantity  is  always  taken  over  to  the  person  when  the  OP  is  interrupted  or

finished, as a unique assignment between person and operation has been established.

10.2  Special features

The following configuration options may influence the above-mentioned quantity posting:

Post manual quantities as automatic quantities

Cross-system configuration in the basic parameter settings of HYDRA.

Quantity posting to staff

Configuration based on workplaces.

Merged operations

If  several  operations  are  grouped  into  a  merged  operation,  quantities  are  distributed  onto  the  individual

operations according to different configurations.

BDE-BDM_81.docx

Version: 1.5.18468

Page 43 of 125

Shop Floor / Order Data Management

Split operations

Further information on how to post split operations or their split master can be found here.

BDE-BDM_81.docx

Version: 1.5.18468

Page 44 of 125

Shop Floor / Order Data Management

11  Controlling the Sequencing List

General

The  sequencing  list  of  the  shop  floor  terminal  is  flexible  and  can  be  adjusted  to  meet  specific

requirements.  The  settings  described  below  control  how  data  is  provided  in  the  sequencing  list.  Please

keep in mind that certain settings can only be made during the customizing process.

Workplace/ machine configuration: "Sequencing list" setting

Description

Which  order  pool  is  used  to  generate  the  sequencing  list  can  be  defined  in  the  sequencing  list
configuration of the workplace configuration dialog.

The  pool  of  orders  is  determined  by  planning  in  HYDRA  shop  floor  scheduling  or  by  the  specifications

from the PPS system and is a result of whether the OP was planned directly for a machine or a machine

group.

Possible settings

S - Basic setting
The value is transferred from the option with the same name in the HYDRA basic parameter settings.

M - Pool of workplaces
Only the operations planned for the workplace are displayed in the sequencing list at the terminal.

G - Pool of workplaces and groups
The sequencing list at the terminal displays those OPs that are either planned for the current workplace
or for a different workplace in the group or that are still in the pool of groups.

K - Pool of workplaces and categories
The sequencing list at the terminal displays only the operations that are planned for workplaces in the
same machine category.

H - Group control
The sequencing list at the terminal displays those OPs that are either planned for the current workplace
or for a different workplace in the group.

Workplace/ machine configuration: "Number of OPs" setting

Description

The maximum number of OPs for the sequencing list can be configured by the option "number of OPs"
within  the  workplace  configuration.  The  OPs  are  selected  in  ascending  order  based  on  how  the
sequencing list is sorted.

Possible settings

0

= no restriction (display all existing OPs)

1-999  = maximum number of OPs

BDE-BDM_81.docx

Version: 1.5.18468

Page 45 of 125

Shop Floor / Order Data Management

Order types: "Sequencing list" setting

Description

The configuration is made at order level in the sequencing list option under order types.

This setting can only be changed during customizing.

Possible settings

J

F

The OP should be displayed in the sequencing list.

The OP should only be displayed in the sequencing list if it is fixed.

N

The OP should not be displayed in the sequencing list.

Processing code: "Sequencing list" setting

Description

Whether or not an OP with this processing code should be displayed in the sequencing list can also be
defined in the processing codes ..\..\functions\moc\MOC_ProcessingCodes.pdfconfiguration.

This setting can only be changed during customizing.

Possible settings

J

The OP should be displayed in the sequencing list.

N

The OP should not be displayed in the sequencing list.

Order status assignment: "Sequencing list" setting

Description

Whether an OP should appear in the sequencing list based on its status can be defined using this option
under  order  status  assignment.  If  an  "N"  is  defined  here,  an  OP  in  this  status  is  not  displayed  in  the
sequencing list.

This  is  used  as  a  standard  feature  to  ensure  that  only  prepared  or  interrupted  OPs  appear  in  the
sequencing list.

Furthermore, it can be configured that running OPs also appear in the sequencing list.

This setting can only be changed during customizing.

Possible settings

J

The OP should be displayed in the sequencing list.

N

The OP should not be displayed in the sequencing list.

BDE-BDM_81.docx

Version: 1.5.18468

Page 46 of 125

Shop Floor / Order Data Management

Miscellaneous notes

Generally, the following operations never appear in the sequencing list:

  Locked operations



Individual operations from merged operations that were generated at MOC.

  The original operation for split operations

  Operations of inactive alternative sequences

Order of operations in the sequencing list

Generally,  the  data  listed  below  defines  how  the  operations  are  ordered  in  the  sequencing  list  at  the

terminal:

1.

Internal field for the planned start date (auftrags_bestand.sort_dat)

2.

Internal field for the planned start time (auftrags_bestand.sort_dat)

3.  HYDRA combined order/ operation number (auftrags_bestand.auftrag_nr)

The system fills in the internal fields for the planned start date and planned start time. This depends on

how  the  operation  was  created  in  the  system  (transferred  via  the  interface  or  manually  created  in  the

system) and on the planning functions used subsequently. How the system does this is described in each

applicable documentation.

  Manual editing via the user interface or via the system interface – initial data creation

  Manual editing via the user interface or via the system interface - modification

  Using HYDRA Shop Floor Scheduling

  Using HYDRA Order Sequencing

When using order sequencing, we recommend to only use the "M" option (pool of workplaces)

to  configure  the  sequencing  list;  the  order  within  the  sequencing  list  at  the  terminal  is  not

defined when the other options are used.

BDE-BDM_81.docx

Version: 1.5.18468

Page 47 of 125

Shop Floor / Order Data Management

12  Order and Operation-Related Functions

Usage

The functions described here allow the performance of order and/or operation-related functions.

Integration

Functions are called in various applications. These applications are listed in detail in the descriptions of

various functions.

Prerequisite

Orders/operations must be defined in the system. The prerequisite for using the individual functions are

listed in the function descriptions.

Change Order Status

Function authorization

or.statchg

Change Order Status

This  function  may  be  used  to  convert  the  status  of  a  complete  order.  The  function  is  integrated  in  the

following application:

  Order overview  Order tab  Category 'Change status'

The dialog contains the following fields

Order

Order number

Current status

Current status of the order

Action

The action available depends on the current status:

Current status

Possible new status

Not free
(specific
customizing)

status

Prepared

only

available

under

- Release order (default)
- Set order to "in process"
- Terminate order

- Set order to "in process" (default)

BDE-BDM_81.docx

Version: 1.5.18468

Page 48 of 125

Shop Floor / Order Data Management

Current status

Possible new status

Started

- Terminate order

- Terminate order

Setting the status to 'Terminated' is only permissible if no operation is running. As soon as an order status

is set terminated, the status of all other operations of this order is also set terminated.

If an order is terminated by  using this function, a  log (record type  E) is only generated for the

associated operations, if the option " Generation of log record for terminate OP (MOC)" is set.

The  workplace  used  for  generating  the  log  is  that  registered  for  the  operation  (regardless  of

whether or not the operation has been scheduled for this workplace). If no workplace has been

registered, the workplace with the lowest number within the group is identified.

Update order

Function authorization

or.actualize

Update order

The function "Update order" is used to update one or several marked orders. The action for updating an

order is performed directly; there is no additional window opening so that the action is confirmed.

After  updating,  the  order  data  will  be  updated  so  that  potentially  updated  data  will  be  displayed  in  their

updated condition.

The function is integrated in the following applications:

  Order overview  Order tab  Category 'Execute''

  Order information  General tab  Category 'Execute''

  Process operations  Other functions  Category 'Change status'

Terminate order

Function authorization

or.terminate

Terminate order

BDE-BDM_81.docx

Version: 1.5.18468

Page 49 of 125

Shop Floor / Order Data Management

The  function  "Terminate  order"  is  used  to  terminate  one  or  several  selected  orders.  The  action  for

terminating  an  order  is  performed  directly;  there  is  no  additional  window  opening  so  that  the  action  is

confirmed.

It is also possible to call the termination for one or several selected operations. In this case, the orders of

these operations are terminated.

After  updating,  the  order  data  will  be  updated  so  that  potentially  updated  data  will  be  displayed  in  their

updated condition.

The function is integrated in the following applications:

  Order overview  Order tab  Category 'Execute''

  Order information  General tab  Category 'Execute''

Change operation status

Function authorization

op.statchg

Change operation status

This function may be used to convert the status of an operation. Whether or not the status of an operation

can/may be changed also depends on its current (previous) status.

Operations  in  the  'Running'  status  may  not  be  changed  through  the  "Change  status"  function,  but  may

only be changed by "Interrupt OP" or "Log OP off". An operation which was interrupted may only be reset

to 'Running' by using the function "Log OP on".

The dialog contains the following fields

Order / Sequence / OP / Split

Operation number

Current status

Current status of the operation

Action

The action available depends on the current status:

Current status

Possible new status

Not free
(specific status only available under customizing)

Prepared

Interrupted

- Released (default)
- Terminate

- Terminate

- Terminate

BDE-BDM_81.docx

Version: 1.5.18468

Page 50 of 125

Shop Floor / Order Data Management

Depending on the option “Generation of log record for terminate OP (MOC)” in the HYDRA basic settings,

in  addition  to  setting  the  operation  to  status  "E",  an  appropriate  end  posting  (log  of  record  type  "E")  is

generated  when  an  operation  is  terminated  and  may  also  be  reported  to  the  higher  level  ERP/PPS

system. This takes place for all operations when an order is terminated.

The workplace used for generating the log is that registered for the operation (regardless of whether or

not  the  operation  has  been  scheduled  for  this  workplace).  If  no  workplace  has  been  registered,  the

workplace with the lowest number within the group is identified.

This  function  may  also  be  used  to  terminate  overhead  cost  operations/orders  which  may  not  be

terminated by using the "normal" dialogs A_AB at the terminal and MOC.

The  status  of  a  waiting  period  operation  may  be  changed  by  "Change  status".  However,  the  status

change  is  not  important,  because  a  waiting  period  operation  is  not  an  operation  in  which  an  activity  is

carried  out.  The  status  changes  are  a  mere  information  for  the  user.  The  reporting  functions  on  the

screens  are  not  relevant  for  waiting  period  operations.  This  also  applies  to  error  messages  that  might

appear when logging on or off.

Change secondary status

Function authorization

op.secstatchg  Change secondary status

The button "Change secondary status" may be used to change the secondary status of an operation. The

function  is  only  available  if  the  current  status  of  an  operation  has  been  configured  with  inclusion  of  the

option "Editable secondary status" (Customizing).

The function is integrated in the following application:

  Order overview  Operation  Category 'Change status'

The new secondary status may be entered manually or selected from a shortlist. Please note that the field

is  compulsory;  deleting  the  current  status  is  not  possible.  If  a  secondary  status  is  to  be  "reset"  after

having been set, an appropriate secondary status is to be provided for this.

Change resource status

Function authorization

op.resstatchg  Change resource status

The function "Change resource status" may be used to change the resource of an operation. The function

is integrated in the following application :

BDE-BDM_81.docx

Version: 1.5.18468

Page 51 of 125

Shop Floor / Order Data Management

  Order overview  Operation tab  Category 'Change status'

Please note that all resource statuses are always set simultaneously.

Lock operation

Function authorization

op.lock

Lock operation

The function "Lock" is used to lock one or several selected operations. A locked operation may no longer

be  logged  on  in  the  BDE  module  (shop  floor  data  collection)  and  will  no  longer  appear  in  the  terminal

sequencing list, either.

Locking an operation will not have any effect on planning in the HYDRA shop floor  scheduling

module (HLS).

The function is integrated in the following applications:

  Order overview  Operation tab  Category 'Lock'

  Process operations  Other functions  Category 'Lock

The action is performed directly, i.e. there is no additional window opening so that the action is confirmed.

If a minimum of one operation is already locked among the  selected operations, locking is implemented

nevertheless.  No  error  message  is  generated  for  the  already  locked  operation(s).  An  error  message  is

only indicated if an operation previously unlocked could not be locked.

Unlock operation

Function authorization

op.unlock

Unlock operation

The  function  "Unlock"  may  be  used  to  unlock  one  or  several  operations;  after  that,  logging  on  the

operation as well as displaying it in the sequencing list is possible again.

The function is integrated in the following applications:

  Order overview  Operation tab  Category 'Lock'

  Process operations  Other functions  Category 'Lock

The action is performed directly, i.e. there is no additional window opening so that the action is confirmed.

If  a  minimum  of  one  operation  is  not  locked  among  the  selected  operations,  unlocking  is  implemented

nevertheless. No error message is generated for the unlocked operation(s).

BDE-BDM_81.docx

Version: 1.5.18468

Page 52 of 125

Shop Floor / Order Data Management

An error message is only indicated if the lock on an operation previously locked could not be canceled.

Please  note:  Operations  that  were  split  (so-called  "Split  masters")  are  also  locked.  These  operations

must not be unlocked through this function!

Reactivate operation

Function authorization

op.reactivate  Reactivate operation

The function 'Reactivate' may be used to reactivate terminated operations within the system. The function

is integrated in the following application:

  Order overview

The  function  may  only  be  operated  for  precisely  one  operation  at  a  time.  If  several  operations  are

selected,  the  function  is  not  active.  In  addition,  the  function  may  only  be  operated  for  terminated

operations.

After  operating  the  function,  the  user  has  to  confirm  the  reactivation  in  a  dialog.  By  confirming,  the

terminated  operation  is  reactivated:  the  operation  changes  into  the  status  with  control  indicator

interrupted. The operation may now be logged on again.

BDE-BDM_81.docx

Version: 1.5.18468

Page 53 of 125

Shop Floor / Order Data Management

13  Day Types

Summary

Menu

Master data  Production control  Day types

Transaction code

dtmf

Function authorization  mddtmf

Day  types  must  first  be  defined  before  the  shift  plan  can  be  created  for  each  work  day.  The  planned

working times and break times for up to four shifts for each day are defined in a day type.

Usage

The following points must be considered in advance before setting the definitions and configurations:

For days that have identical shift cycles, only one day model needs to be defined.

On  the  other  hand,  however,  if  work  schedules  are  planned  differently  on  different  days  (e.g.

"short Friday"), then several (different) day models will be required.

Machines  assigned  to  the  same  shift  cycle,  but  with  different  breaks,  require  different  day

models.

Machines  assigned  to  the  same  shift  cycle,  but  with  a  different  number  of  shifts  (two  shift

operation, three shift operation) require different day models.

Only the last shift of a day model may include a day change (e.g. 10.00 pm - 6.00 am)!

If a day model is modified, this change will have an immediate effect on all machines that are

assigned to this day model within the year model. Therefore, we strongly advise against making

any changes to the day models currently in use (i.e. valid for the shift day on which the changes

are made).

If, contrary to expectations, it should become necessary to make changes, then these changes

may only relate to subsequent shifts (no longer affecting the current shifts). Furthermore, these

changes  must  be  made  at  least  two  hours  before  a  shift  change.  Reason:  different  HYDRA

components  read  the  shift  models  in  cyclical  intervals  and  compare  them  to  the  shifts  stored

locally.

BDE-BDM_81.docx

Version: 1.5.18468

Page 54 of 125

Shop Floor / Order Data Management

Requirement

The days off should be set up first.

Selection criteria

Day type ... to ...

Narrows down to day type number

Designation

Designation of the day type

Field descriptions

Day type

Unique day type identification

Designation

Designation of the day type

Shift time

Details about the beginning and end times for each shift

Please note: For technical reasons, a shift may not start or end at 12:00 am (midnight).

Type

At this time, this field is not relevant for processing.

Breaks

Details about breaks (beginning and end times) within the current shift.

When  defining  breaks,  the  times  accrued  in  these  periods  are  "cut  out"  from  the  RPA  time

accounts.

Number of personnel capacity

Production:  This  setting  is  only  relevant  in  conjunction  with  planning  group  workplaces  in  the

graphic planning board. In  HYDRA shop floor scheduling, group  utilization is calculated based  on

the  defined  shift  calendar  and  the  planned  production  capacities.  If  no  personnel  capacity  is

defined, the system implicitly assumes capacity 1.

Set up:  This setting is currently not considered.

Autom. status change to status 999 (only relevant for MDE configuration)

A machine status can be assigned automatically using this indicator at the end of certain shifts (e.g.

on  Friday  evenings)  and  vice  versa  this  status  can  then  again  be  cleared  at  the  beginning  of

another shift (e.g. Monday mornings).

BDE-BDM_81.docx

Version: 1.5.18468

Page 55 of 125

Shop Floor / Order Data Management

No activation: Automatic shift is not activated.

Activate after end of shift:  At the end of a shift, the machine is automatically assigned to status

999. If no status change is made when the next shift begins, the status remains at 999 for the entire

shift.

Please note: If at the end of a shift the status is set to "Production", this status remains set in the

subsequent shift; in this case, status 999 is not assigned.

Deactivate at beginning of shift: At the start of a shift, depending on how the extended weekend

automatic is activated for the machine configuration in the MDE configuration, the terminal switches

automatically to either status "not assigned" or to the status that was defined prior to the status 999

activation. If status 999 is set, it is terminated.

Recommendation:  To  ensure  that  the  MDE  evaluations  are  not  distorted,  status  999,  which,  for

example,  signals  a  weekend,  should  be  assigned  to  the  resource  performance  account  "Free

breaks".

BDE-BDM_81.docx

Version: 1.5.18468

Page 56 of 125

Shop Floor / Order Data Management

14  Days Off

Summary

Menu

Master data  Production control  Days off

Transaction code

wfmf

Function authorization  mdwfmf

The dates for all of the days off for a relevant year are entered in the days off list. The days off list is used

to differentiate between workdays and days off when assigning day types to a year model.

Usage

Once the days off list has been created, it is available for all year models. This means you only have to

create the list once at the beginning of the year and the data will be considered in all year models for the

relevant year.

The  days  off  list  must  be  created  before  setting  up  the  year  models.  If  any  entries  are  changed  in  the

days off list at a later time, these changes can only be considered in those year models that are created

after this change. Any year models that have already been created remain unchanged and may need to

be adjusted by the user himself/herself.

Selection criteria

The application provides the following selection criteria:

Date from to

Limited by date

Field descriptions

Date

Date of the day off.

Description

Description

Number

Unique number for the day off

Year

Year for which the day off was defined

BDE-BDM_81.docx

Version: 1.5.18468

Page 57 of 125

Shop Floor / Order Data Management

BDE-BDM_81.docx

Version: 1.5.18468

Page 58 of 125

Shop Floor / Order Data Management

15  Year Model

Summary

Menu

Master data  Production Control  Year Model

Transaction code

ymmf

Function authorization  mdymmf

The year models serve as the machine's shift calendar.

Usage

The year model is required in order to assign a shift calendar to a machine/ workplace. To this end, each

work day is assigned exactly to a day type in the year model. The days off defined earlier do not need to

be considered (no shifts). Each machine can be assigned to exactly one year model.

The following points must be considered when doing so



If a year model is modified, this change will affect all machines indirectly that are assigned to this

day model within the year model.

  Any  changes  to  the  year  model  should  only  be  carried  out  for  days/  periods  set  in  the  future.

We strongly advise against making any changes to the year model for the current day.

A shift model is defined for each day in the year model, which HYDRA uses as the basis for calculating

working time. Each workday is assigned exactly to one day type.

Requirement

The following master data must have been created before setting up a year model.

  The days off should be set up.

  The day types should be set up.

Selection criteria

The application provides the following selection criteria:

Year from to

Narrows down the selection to the year models for the chosen years

BDE-BDM_81.docx

Version: 1.5.18468

Page 59 of 125

Shop Floor / Order Data Management

Field descriptions

Year model, designation

The current year model to be edited and its designation are shown at the top.

Factory calendar

The factory calendar identifier can be set for (a maximum of) one year model. Because it is used for

planning/  scheduling,  a  valid  factory  calendar  must  be  defined  for  each  year  when  using  HYDRA

shop floor scheduling.

The year model for which this identifier is set is of no further importance for data entry.

Graphic display

The day model assigned to each day in the separate fields of the year model are shown in the

graphic display. The background colors used depict the following:

Monday – Friday

gray

Saturday, Sunday

orange

Days off

red

Current day ("today")

dark red

For each day, the assigned day type (day type number) is displayed. No day type is assigned to

days on which no entries were made. HYDRA treats these days as "no shift" days.

Assignment

In  the  lower  range  are  functions  that  can  be  used  to  assign  day  types  to  the  year  model.  When

doing so, you have the option of either assigning the day types by weekday or by rhythm.

The  procedure  used  to  assign  a  day  type  to  a  year  model  is  described  in  the  following  chapter

Defining a year model.

Editing functions

Defining a year model

Do the following to define a year model:

Select the editing function Insert; an editing dialog will open. Use the index tab  Weekdays or Rhythm to

now assign day types to the year model.

BDE-BDM_81.docx

Version: 1.5.18468

Page 60 of 125

Shop Floor / Order Data Management

Weekdays

From ... to ...

Defining the period for which a day type should be assigned.

When  making  your  selection  in  graphic  display,  all  weekdays  (Monday  -  Friday)  are  selected

automatically that are in the above mentioned period.

Alternately, you can also select individual workdays. The selection then made in the graphic display

is based on what you previously selected, in each case for the period mentioned above.

When  making  your  selection  in  graphic  display,  all  Saturdays  and  Sundays  are  selected

automatically that are in the above mentioned period.

Alternately, you can also select the particular Saturday or Sunday. The selection then made in the

graphic  display  is  based  on  what  you  previously  selected,  in  each  case  for  the  period  mentioned

above.

Include public holidays

If this is selected, all public holidays (defined as days off) are included in the selected period.

Example:

You selected Weekdays and Include public holidays. When a day type is assigned in the next step,

all public holidays that fall on a weekday (Monday - Friday) will also be assigned to this day type.

Exclude public holidays

If this is selected, all public holidays (defined as days off) are excluded in the selected period.

Example:

You selected Weekdays and Exclude public holidays. When a day type is assigned in the next step,

all public holidays that fall on a weekday (Monday - Friday) will not be assigned to this day type.

BDE-BDM_81.docx

Version: 1.5.18468

Page 61 of 125

Shop Floor / Order Data Management

Public holidays only

If this is selected, only public holidays (defined as days off) are considered in the selected period.

Example:

You  selected  Weekdays  and  Public  holidays  only. When  a  day  type  is  assigned  in  the  next  step,

only public holidays that fall on a weekday (Monday  - Friday) will be assigned to this day type. All

other public holidays that fall on a weekend as well as normal weekdays are not assigned to a day

type.

Day type

Enter the day type here that you would like to assign to the days you selected previously.

Click on this icon to assign the day type entered to the selected days. The day type will then appear

in the graphic display for each selected day.

To delete a day type assignment, click on this icon.

Please note:

Alternately to entering a period and to defining the selected weekdays, you can also make a selection in

the graphic display directly by hovering the mouse cursor over the first day, by then clicking and holding

down the left mouse button and by now dragging the cursor to the last day where you then release the

mouse button. All days that chronologically fall between the first and the last day are now highlighted.

Another  option  is  to  press  the  Ctrl  key  and  clicking  with  the  mouse  on  each  day  that  you  would  like  to

include in the selection.

Rhythm

In this index tab you can define a rhythm that you would like to assign to the year model in a period (from

- to or the days selected in the graphic display).

To do so, enter one by one the definition of the rhythm in which you would like to define the day type and

the number of days (for example: Day type 4 for one day, day type 1 for three days, day type 2 for one

day, day type 0 (no day type) for two days).

Then, accept the defined rhythm in the year model.

BDE-BDM_81.docx

Version: 1.5.18468

Page 62 of 125

Type, duration

Day type and duration that should be transferred to the rhythm table.

Shop Floor / Order Data Management

Accept the type and duration in the rhythm table.

Delete the selected entry from the rhythm table.

From - to

Period in which the defined rhythm should be assigned.

Click  on  the  icon  to  assign  the  days/rhythm  previously  selected  to  the  selected  days.  The  relevant  day

type will then appear in the graphic display for each selected day.

Method recommended for changes in the shift calendar

It may be necessary for reasons within the operation to make changes to the shift calendars.  This might

be the case, for example, when:

  The company switches its shift operation (e.g. from a two shift to a three-shift operation)

  Shift times are changed

Generally, the HYDRA shift calendar is a function that if configured or handled improperly, as is the case

for all HYDRA configurations, can have unpredictable effects.

We strongly advise against making any changes to the day models currently in use (i.e. that are

valid for the day the changes are made).

In this case, we recommend to follow the following procedure:

  As a rule, you should not wait until the day to make changes on which the changes will be active.

  Call up the dialog Day type.

  Create a new day type or change an existing, but not an active (i.e. not an assigned), day type.

(Contrary to the above, we strongly advise against making any change to existing day types that

have already been assigned to one or more year models.)

  Call up the dialog Year model for which the change is to be made.

  Assign the new day type. (When doing so, it is critical to keep in mind that the time as of  which

the new day type should take effect for the first time should definitely be in the future.)

BDE-BDM_81.docx

Version: 1.5.18468

Page 63 of 125

Shop Floor / Order Data Management

BDE-BDM_81.docx

Version: 1.5.18468

Page 64 of 125

Shop Floor / Order Data Management

16  Order Types

Summary

Menu

Master data  Order  Order types

Transaction code

ot

Function authorization  mdot

Usage

You use this function to create or modify order types in the system.

Integration

Order  types  are  issued  to  structure  the  orders  in  accordance  with  their  use.  Each  order  type  includes

various  control  information  that  is  decisive  when  managing  orders.  The  possible  order  types  are

configured in HYDRA and as such, the settings define how they behave/perform in the system. The order

type is set for the order header and also included in the operations (for information purposes).

Each order type is assigned to a category. This category combines similar order types.

We strongly recommend that order types only be copied within one category.

Selection criteria

The below-mentioned criteria can be used for selection within the selection panel:

Category

See field description

Active

This  is  a  tri-state  checkbox  which  enables  to  select  either  only  active  order  types,  inactive  order

types or both.

Field descriptions

General index tab

Order type

Definition  of  the  order  type.  The  parameters  of  this  configuration  control,  among  other  things,

performance within the system.

BDE-BDM_81.docx

Version: 1.5.18468

Page 65 of 125

Shop Floor / Order Data Management

Designation

Designation of the order type

Active

If this indicator is set, then this order type  is available and can be used. The indicator  is checked

when an order is first created or modified.

Category

The classification establishes a logical umbrella term covering similar order types. Possible values:

FA

Production order

Standard  production orders created e.g.  by  an  interface in HYDRA are to be

assigned to the “production order” category

PJ

Project order

Projects  are,  among  others,  characterized  by  their  uniqueness.  The  project

steps  that  are  to  be  performed  as  a  part  of  a  project  can  be  combined  in  a

project order

PM

Maintenance order

Maintenance  orders  have  been  designed  for  the  planning  or  collection  of

maintenance measures

KP

Capacity order

Orders  of

this  order

type/category  have  been  designed

for  capacity

reservations

in

the  HYDRA  shop

floor  scheduling  module

(HLS).

Consequently, data, for example, cannot be recorded for them.

GK

Overhead cost order

Orders for the collection of overhead costs.

Symbol

Graphic that can optionally be assigned to the order type. It is displayed in several functions/reports

(e.g. order overview).

The size of the graphic must not exceed 16x16 pixels and it has to be a

file in the BMP format (16 colors).

Comment

Designation or description of the order type

Dialog control

Here you can enter a dialog control that deviates from how the system typically  behaves and it can

be referenced accordingly in the dynamic dialog. This makes it possible to show or hide situation-

specific input fields at the terminal.

BDE-BDM_81.docx

Version: 1.5.18468

Page 66 of 125

Shop Floor / Order Data Management

Please note:

This  setting  can  also  be  defined  at  the  workplace  (machine/  workplace

configuration).  When  a  terminal  dialog  is  opened,  dialog  control  for  both

order type and workplace are considered. For this reason, we recommend

that dialog control be defined either in the order type or at the workplace.

Editing inventory data

Reserved; currently not available for editing

Editing recorded data

Reserved; currently not available for editing

Planning index tab

Planning

This setting determines whether and/ or how orders of this type are relevant for detailed scheduling.

You can choose from following settings:

N

T

No planning

Scheduling only

The order is scheduled, that is the lead time is calculated based on the process

times  and  the  dates  are  set  accordingly.  No  competitive  situations  are

considered during (lead time) scheduling.

F

Scheduling and detailed planning

The order is relevant for detailed planning and is consequently  - in addition to

scheduling - considered during automatic and/ or interactive planning.

Please  note:  During  automatic  dispatch  (detailed  scheduling),  operations  are

dispatched to a  workplace. In the process, the situation pertaining to capacity

and  assignment  is  considered  for  the  workplace,  which  may  result  in  the

inability to dispatch by the planned date determined from lead time scheduling.

Please note:

Whether  or  which  operations  are  in  fact  considered  during  scheduling  or

detailed planning also depends on the configuration of the same name in

the processing code or the order-related status configuration.

Planning dates

How planning dates behave during (re)scheduling/re-planning

O

T

Planning dates are not overwritten (default)

Planning dates are overwritten by scheduling

BDE-BDM_81.docx

Version: 1.5.18468

Page 67 of 125

Shop Floor / Order Data Management

Setup time in shop floor scheduling

Subject to the settings configured for the order type, the below-mentioned options are available to

present  the  static  setup  time  of  interrupted  operations  in  the  graphic  planning  board  (interactive

planning):

"  "

Target setup time

R

B

Remaining setup time: Target setup time – RPA07 (posted setup times)

In  case  the  operation  has  already  been  started  (i.e.  it  is  now  interrupted),  a

setup time of 0 is assumed.

Running operations do not take into account the setup time.

These settings only apply for interactive planning.

User field for requirements calculation formula

This  field  is  only  relevant  in  connection  with  the  license  for  multiple  assignments  (HLS-MFB).

Further information can be found in the relevant document.

Scheduling without implicit order release

This setting prevents order release (setting the status using the control indicator "V") during the first

scheduling run.

Consideration of production variants when transferring OP

This processing is only active in conjunction with an HLS license for production variants.

E

P

N

The system determines whether a valid production variant exists at the time the

OP is transferred/ created.

At the time an OP is transferred/ created, the data transferred is checked only

to verify that it matches a valid production variant (validation check).

No determination/ validation check

Considering production variants in planning

This processing is only active in conjunction with an HLS license for production variants.

E

P

Determination. A valid production variant is determined at the time an operation

is planned in graphic planning.

Testing  only.  At  the  time  of  planning,  the  data  transferred  is  checked  only  to

verify  that  it  matches  a  valid  production  variant  (validation  check).  Default

values are not taken over from the production variant.

G

Group-specific testing. At the time of planning, the data transferred is checked

to  verify  that  it  matches  a  valid  production  variant  (validation  check),  as  it  is

also the case with option "P". However, in contrast to the option "P", checking

is only performed within the group defined for the operation. Default values are

BDE-BDM_81.docx

Version: 1.5.18468

Page 68 of 125

Shop Floor / Order Data Management

not taken over from the production variant.

N

Not used.

This processing can be controlled in more detail on the level of capacity groups. Further information

on this can be found in the relevant documentation dealing with the configuration of groups.

Processing index tab

Sequencing list

This  setting  determines  whether  operations  for  orders  of  this  order  type  are  displayed  in  the

sequencing list at the terminal.

The following settings are available:

F

N

Operations  that  were  fixed  are  displayed.  The  fixing  indicator  can  be  set

manually in HYDRA shop floor scheduling.

No; orders of this order type are generally not displayed in the sequencing list

at the terminal. This makes sense, for example, for overhead cost operations.

Please note

With the exception of the option “N”, for  all other options, in addition, the

configurations “sequencing list” with the same name are always taken into

account

in

the  processing  code  or

in

the  order-related  status

configuration.

Locked OPs are generally not displayed.

Recordable

This identifier defines whether operations for orders of this order type can be recorded, i.e. posted.

J

Yes, operations can be recorded.

Whether an operation is really recordable also depends on the setting with the

same name in the processing code.

N

No; Operations may not be recorded. An attempt to log any such operation on

is rejected with a validation error.

Combined logon of order

This identifier is used for displaying "overhead cost operations".

J

With  this  order  type,  operation  and  person  are  firmly  linked  with  one  another.

Its  behavior  (posting)  is  the  same  as  with  a  posting  to  a  group  workplace

(GAP).

T

No overhead cost processing.

BDE-BDM_81.docx

Version: 1.5.18468

Page 69 of 125

Shop Floor / Order Data Management

Logging OP on again at shift start

This identifier defines operation logon behavior at the start of a shift.

J

N

X

Automatically log operation back on at start of shift.

Do not log an operation back on at start of shift.

The processing depends on the appropriate setting in the workplace/ machine

configuration

Please note:

This  processing  is  only  relevant  for  "MDE  workplaces".  An  MDE

workplace must meet the following conditions:

- The workplace must be assigned to a terminal

- The terminal must be configured in MDE operation mode

May OPs of the order be finished?

This  identifier  defines  whether  OPs  of  this  order  type  may  be  finished.  The  following  settings  are

available:

J

S

N

Yes, OPs may be finished.

Checking  status  of  predecessor.  In  this  case,  the  status  of  the  preceding  OP

must have the identifier "Successor can be logged off" set.

No, OPs may not be finished. A validation check is done when an OP is logged

off.

Please note:

It  can  be  useful  for  overhead  cost  orders  to  configure  them  so  that  they

cannot  be  logged  off  using  the  posting  dialog  Log  OP  off,  since  their

operations should exist as cost collectors over a longer period of time. In

this  case,  this  identifier  can  be  set  to  "N"  so  that  an  OP  logoff  is

prevented.

Log person off when shift ends

This  identifier  is  used  for  detailed  configuration  of  personal  data  entry  at  MDE  workplaces.  Since

fully automatic shift ends are generated via the terminals when HYDRA MDE is used, here the user

can  set  whether  the  persons  logged  on  to  the  workplace  should  be  automatically  logged  off  or

remain logged on at the end of a shift.

J

N

Always log staff off when the shift ends

Always save staff when the shift ends except for manual logoff

BDE-BDM_81.docx

Version: 1.5.18468

Page 70 of 125

Shop Floor / Order Data Management

X

The  processing  depends  on  the  relevant  setting  in  the  workplace/  machine

configuration

Please note

This processing is only relevant for "MDE workplaces" (see above).

If combined logon of order (see above) is active, then this option must be

set to "N"

Serial number obligation

This identifier defines whether an order requires a serial number, and if so, how the serial number

should be entered.

N

No serial number requirement

+ (plus)  Serial  number  obligation,  "positive"  entry,  i.e.  the  yield  is  entered  with  serial

numbers.

- (minus)  Serial number obligation, "negative" entry, i.e. the scrap or problem quantities

are entered with serial numbers.

Please note:

The  identifier  "Serial  number  obligation"  determines  at  the  processing

code  or  the  operation  directly  as  of  which  operation  the  serial  number

must be entered.

Assignment of serial numbers

This identifier is only relevant if the identifier "Serial number obligation" is not set to "N". It defines

how serial numbers are allocated

P

H

Serial numbers are transferred/ expected from the PPS system.

Serial  numbers  are  generated  by  HYDRA  according  to  the  number  range

configuration

Please note:

The  "H"  option  is  provided  for  future  upgrades/modifications.  Currently,

only the "P" option is supported.

Order is not logged off automatically

Processing can take place subject to the termination of the order (header). Using this identifier can

prevent the order from being set to finished if the last recordable operation was finished.

N

J

Finishing  all  recordable  OPs  automatically  sets  the  order  to  finished  (setting

order status using the control indicator "E")

Order is not logged off automatically, i.e. finishing all recordable OPs does not

BDE-BDM_81.docx

Version: 1.5.18468

Page 71 of 125

Shop Floor / Order Data Management

automatically set the order to finished.

Please note

Currently, only  the deletion of order backlog data or the transfer of order

backlog data into the long-term tables depends on the status of the order

(header).

This option must be set for the GKP and GKM order types (order types for

waiting  period  orders).  Reason:  the  waiting  period  operations  are  all

identified  as  "unrecordable".  If  the  status  of  a  waiting  period  operation

were  changed,  or  if  a  waiting  period  operation  were  deleted,  this  would

result  in  the  status  of  the  order  itself  being  set  with  control  indicator  "E".

Conversely,  this  means  that  a  waiting  period  order  (header)  must  be

explicitly set to finished ("Change status" function of MOC).

Milestone processing only for the last operation

Activation of milestone processing

Show OP info when logging on

Defines  whether  or  not  the  note  or  the  additional  information  is  to  be  displayed  when  logging  the

OP

on

to

the

Windows

terminal

(CTWIN,

AIP).



Plausibility index tab

Check for specifications in backlog of orders

This identifier activates the following validation check during operation logon:

J

An OP logon is only allowed at the planned workplace

If this option is set, then during logon the system checks the workplace number

entered  at  the  terminal  and  compares  it  to  the  workplace  number  in  the

HYDRA  order  backlog  for plausibility.  An  operation  may  only  be  logged  on  to

the  planned  workplace.  If  an  operation  is  to  be  produced  at  a  different

workplace  (e.g.  in  the  event  a  machine  breaks  down),  this  operation  must  be

re-planned in graphic shop floor scheduling (HLS) or in order sequencing.

G

An  operation  logon  is  only  allowed  to  the  planned  group,  i.e.  an  operation

logon is possible either to the planned workplace, to a workplace belonging to

the group or to a workplace planned for the group (still in pool of groups).

K

An operation logon is possible either to the planned workplace or to a

BDE-BDM_81.docx

Version: 1.5.18468

Page 72 of 125

Shop Floor / Order Data Management

workplace of the same category.

Please note: This check requires that a category is defined at both workplaces

(not empty), i.e. at the workplace where the operation logon was planned AND

at the workplace where the operation is in fact logged on. Furthermore, the

operation to be logged on must already be planned for a workplace (no longer

in the pool of groups).

N

No validation check

Check status of preceding OP

This identifier activates the check of whether or when the current operation may be logged on.

S

Checking status of preceding operation.

In  this  case,  the  status  of  the  preceding  operation  must  have  the  identifier

"Successor can be logged on" set.

N

No check

Check minimum send-ahead qty. of preceding OP

This identifier defines whether a validation check for the minimum send-ahead quantity should be

run during operation logon.

M

Check for minimum send-ahead quantity during operation logon. In this case, a

minimum send-ahead quantity (yield) must have been posted to the preceding

operation  so  that  the  succeeding  operation  can  be  logged  on.  The  minimum

send-ahead quantity is defined at the preceding operation.

N

No check.

The  relevant  configuration  needs  to  be  enabled  at  the  order  type  to  check  the

minimum  send  ahead  quantity,  when  logging  OPs  on.  The  system  supports

overlapping operations with respect to the minimum send ahead quantity (or the

lead time). This is enabled at the processing code.

The  check  for  the  minimum  send  ahead  quantity  only  considers  the  yield  that

has so far been collected (primary quantity unit).

Quantities  are  not  converted.  For  this  reason,  please  pay  attention  to  the  fact

that adjacent operations have the same primary quantity unit.

Example:

Operation 0100

Target quantity 1000  Send ahead quantity 50

Operation 0200

Target quantity 1000

If checking is enabled, operation 0200 can only be logged on as soon as a

yield (in primary quantity unit) of at least 50 has been uploaded/confirmed

BDE-BDM_81.docx

Version: 1.5.18468

Page 73 of 125

Shop Floor / Order Data Management

for operation 0100.

Checking does not include the operation status of the preceding operation. The

current  operation  cannot  be  logged  on,  in  case  the  preceding  operation  has

already been finished, but the send-ahead quantity has not yet been reached.

Only OPs of the same order type can be logged on simultaneously

If  this  option  is  set,  only  operations  that  are  assigned  to  the  same  order  type  may  be  logged  on

simultaneously.

This check will be performed if this option is set at least for one operation, i.e. the operation to be

logged on or the operations that have already been logged on.

Check that shop floor papers are printed

This setting can activate a validation check during login of operations depending on the print status

of the time tickets. Under the proper conditions, this function can help prevent erroneous postings

or rather can "guide" production.

J

N

An OP may only be logged on if its shop floor papers were printed beforehand.

No validation check

Please note:

The print status is registered by means of a corresponding identifier at the

operation. It can be set when printing the time tickets (additional license).

Check against M/O relation when person logs on

The  maximum  number  of  employees  needed  to  produce  this  operation  (M/O  relation,  production)

can be defined in the operation data in the system.

Validation check when person logs on relating to:

J

N

K

Machine/ operator relation. When a person logs on to an operation, a check is

run  to  determine  if  the  maximum  number  of  employees  has  already  been

reached. If this is the case, this personnel logon is rejected.

No check

Component list of requirements to be transferred (planned, currently not used)

Please note:

The check is not performed at group workplaces.

If  the  M/O  ratio  defined  at  the  operation  is  not  an  integer,  the  value  is

rounded up to the next whole number.

Advance logons of staff are also taken into account during this check.

BDE-BDM_81.docx

Version: 1.5.18468

Page 74 of 125

Quantity check of send-ahead quantity

Shop Floor / Order Data Management

If this  identifier is set, then a check is run for manual quantity  postings at the

terminal to determine whether the sum total of the previously entered yield and

the  currently  entered  yield  is  greater  than  the  already  produced  yield  of  the

preceding OP. If it is the case, the posting is not allowed with the yield quantity

entered.

If this flag is not set, no validation check is run.

Please note:

This requires that the current operation and the preceding operation each

have the same primary quantity unit.

Upload index tab

Upload order postings

Upload

It  can  be  decided  based  on  this  identifier  whether  entered  data  (postings)  of  orders  of  this  type

must be uploaded to the ERP/PPS system or not.

J

N

OP logins

Postings  are  uploaded.  Which  postings  are  uploaded  and/or  how  they  are

uploaded is defined by the identifiers listed below.

Postings are not uploaded. In this case, the following identifiers are irrelevant.

If  this  identifier  is  set,  operation  logins  (record  type  "A"  postings)  are  uploaded  to  the  ERP/PPS

system.  The  same  structure  is  maintained  during  an  upload  as  for  postings,  but  in  this  case  the

quantity and duration fields are set to 0.

Please note: When uploading to  SAP via  PP-PDC interface, the OP logins are  assigned the  SAP

record type L10.

Postings  of  type  "A"  records  are  generated  for  each  operation  login,  including  those  automatic

logins at the time of automatic shift change process.

Partial confirmations/uploads

If  this  identifier  is  set,  partial  quantities  (record  type  "T"  postings)  are  uploaded  to  the  ERP/PPS

system. In this case, the posting generates U/E records that do not contain any quantities. Only the

T-records still contain quantities.

BDE-BDM_81.docx

Version: 1.5.18468

Page 75 of 125

Shop Floor / Order Data Management

As  far  as  the  ERP/PPS  system  is  concerned,  uploads  based  on  T-records  are  displayed  at  the

upload  interface  in  the  same  manner  as  record  type  "U"  posting  records.  However,  they  only

contain  quantities,  no  durations.  Durations  continue  to  be  uploaded  from  the  postings  of  record

types "U" and/or "E".

If the identifier is not set, the U/E records generated by the posting process are, in addition to the

durations,  also  given  the  accumulated  quantities  of  all  T  records  generated  between  logon  and

interruption/ logoff.

Upload of scrap including reason

Unlike  with  "Upload  of  partial  confirmations",  with  "Upload  of  scrap  including  reasons"  only  the

scrap  from  the  partial  confirmations  is  uploaded.  Yield,  rework  quantity  and  problem  quantity  are

transferred from the postings of record type U and/or E.

Please note: If both options are set, the "Partial confirmations" option has the higher priority.

Approved order postings only

If this option is set, order postings are not uploaded until they are approved. After five days at the

latest, not even approved postings are uploaded (default setting, can be changed by calling up the

parameter /ABZEICH= in the program myerprck.exe/.out).

Upload company of actual workplace

<HELP missing>

Order postings instead of batch postings

For MPL machines, batch  postings are  uploaded  by  default (record type  "H" postings). Instead  of

batch  postings,  this  option  makes  it  possible  to  upload  order  postings  (record  type  "U"/"E"

postings).

Upload type

Reserved:

Change after upload

This identifier defines how changes/ corrections to postings uploaded to the ERP/PPS system are

handled.  The  identifier  is  evaluated  during  posting  maintenance  as  well  as  during  event

maintenance.

J

E

N

Changes/  corrections  are  allowed  to  already  uploaded  postings;  changes  are

also uploaded to the PPS system.

Changes/  corrections  are  allowed  to  already  uploaded  postings;  however,

these corrections are not uploaded to the PPS system.

No more changes/ corrections are allowed to already uploaded postings

BDE-BDM_81.docx

Version: 1.5.18468

Page 76 of 125

Shop Floor / Order Data Management

Please note:

In posting maintenance, the identifier is evaluated directly in relation to the

corresponding  order.  In  event  maintenance,  on  the  other  hand,  the  last

order  with  an  "N"  or  "E"  applies,  and  all  previous  events  are  locked

irrespective of the particular order type.

This  option  may  not  be  set  for  customers  who  use  the  SAP  PP-PDC

interface,  because  it  does  not  support  cancellations/  corrections.  Please

contact  MPDV  to  discuss  options  available  to  nonetheless  upload

corrections to SAP.

Cancellation message job end first

<HELP missing>

Upload of waiting period postings

If

this

identifier

is  set,

then  postings

identified  as

"waiting  period"

in

the  posting

(ade_protokoll.karenz = 'P' or 'M') are uploaded to the PPS system.

If  only  approved  waiting  period  postings  are  uploaded,  then  the  option  "Upload  approved  order

postings only" or "Upload approved personnel postings only" must be set.

Upload of batch logon postings

Please  note:  This  option  is  approved  for  uploads  using  the  HYDRA  HY72PPS  interface  only  and

may not be set in conjunction with the PP-PDC, KK3, KK4 or HY71PPS interfaces!

This  option  causes  batch  logons  to  be  uploaded  via  the  HY72PPS  upload  interface.  The  upload

record contains no quantities/ durations and the logon/ logoff times correspond to the posting time.

Please  note:  In  HYDRA  standard  processing,  order  logons  and  batch

logons are uploaded first, i.e. if an order is logged on twice and interrupted

once  between  two  posting  intervals,  then  the  two  logons  are  uploaded

before the interruption.

Personnel postings

Personnel postings

If this identifier is set, then record type "B" postings (personnel postings) are uploaded to the PPS

system.

Please note:

This  option  may  not  be  set  for  customers  who  use  the  SAP  PP-PDC

BDE-BDM_81.docx

Version: 1.5.18468

Page 77 of 125

Shop Floor / Order Data Management

interface.

Upload personnel postings only

Upload personnel postings only

Approved personnel postings only

If  this  option  is  set,  record  type  "B"  postings  (personnel  postings  and  personnel  waiting  period

postings,  if  configured  for  uploading)  are  not  uploaded  until  after  approval.  After  five  days  at  the

latest, not even approved postings are uploaded (default setting, can be changed by calling up the

parameter /ABZEICH= in the program myerprck.exe/.out).

Upload of planning changes in shop floor scheduling

Upload PPS operations only

Upload PPS operations only

Upload delayed operations only

Upload delayed operations only

Upload operations with deviating assignment only

Upload operations with deviating assignment only

Quality index tab

CAQ area

This field is reserved for future functions.

Generate CAQ inspection orders

This field is reserved for future functions.

Options index tab

Priority

control

U

G

Priority control is order-related, i.e. the priority is set in the order (header) and
has an impact on all OPs.

Priority control is operation-related.

Priority management

J

Orders  of  this  order  type  are  considered  during  priority  management  (see

Order group configuration). That is, when newly creating or manually modifying

an  order  in  HYDRA,  the  system  runs  a  check  to  determine  whether  the

assigned priority is allowed, and if the maximum number of priorities has been

exceeded, the action is rejected.

The  priority  check  is  only  performed  for  order/  operation  modifications  if  the

BDE-BDM_81.docx

Version: 1.5.18468

Page 78 of 125

Shop Floor / Order Data Management

priority was actually changed during the modification process.

If  the  order  is  transferred  by  the  PPS  interface  and  the  maximum  number  of

priorities has been exceeded, the order  will  not  be rejected as a result of this

check. In this case, however, the priority will be automatically set to 1.

Please note

This check is only performed if the option Priorities is set to 'U'.

Only those orders are considered that have an order status that is set to

the identifier "Priority check".

N

Orders of this order type are not considered during priority management.

Order postings need to be signed

This  option  indicates  that  order  postings  for  operations  with  this  order  type  must  be  signed  (also

see the manual dealing with escalations "ANR.UNCERTIFIED_BOOKINGS“).

Personnel postings need to be signed

This  option  indicates  that  personnel  postings  for  operations  with  this  order  type  must  be  signed

(also see the manual dealing with escalations "ANR.UNCERTIFIED_BOOKINGS“).

Order type for composition

Charging  orders  are  taken  into  account  by  composition.  Charging  orders  are  assigned  to  melting

orders.  In  this  case,  the  planned  order  number  of  the  charging  order  is  the  order  number  of  the

melting order.

“C“ = Charging order,

“M“ = Melting order

User Fields Index Tab

The system can be configured to enable the user fields for the object type "AUART".

BDE-BDM_81.docx

Version: 1.5.18468

Page 79 of 125

Shop Floor / Order Data Management

17  Order Status Texts

Summary

Menu

Master data  Order Order status texts

Transaction code

  Osst

Function authorization  Mdostt

The order status text function allows you to configure the description for each order status.

Usage

In  the  status  text  dialog,  all  possible  order  statuses  are  designated  with  a  descriptive  text.  These

descriptions are then used in the status assignment performed later. The goal is to use standard status

texts for all order types.

Procedure

Create the status texts that you would like to use for status assignment later.

Assign a unique status text number and an informative text.

Then, categorize each of the status texts to an order or operation status.

Integration

The  texts  defined  here  are  displayed  on  the  client  (MOC)  based  on  the  order  status  assignment

performed in various evaluations/reports.

Requirement

You need the customizing key in order to configure the order status texts. Settings relating to a

customer specifically are configured in the customer specific documentation (CID).

Selection criteria

The application provides the following selection criteria:

Status text designation

Search for a status text by status text designation. You can also run a search using wildcards.

BDE-BDM_81.docx

Version: 1.5.18468

Page 80 of 125

Shop Floor / Order Data Management

Field description

Field descriptions status text

Status text identification

Designation

Status text

BDE-BDM_81.docx

Version: 1.5.18468

Page 81 of 125

Shop Floor / Order Data Management

18  Order Status Assignment

Summary

Menu

Master data  Order  Order status assignment

Transaction code

ost

Function authorization  mdost

Usage

The different order statuses can be configured for the various order types in the order status assignment

function.

The order status defines the order's current status.

Integration

Because  order  data  are  recorded  in  HYDRA  based  on  the  operation,  HYDRA  manages  one  status  for

each individual operation. The status indicates whether the operation has not yet begun, for example, or

whether it has begun, was interrupted or has already been finished.

In addition, a status is also kept in the order header, which provides information on whether the order has

not yet begun, whether it is currently being processed or whether it is already finished. At the time the last

operation that can be posted is finished, the status is set to finished in the order header. Operations that

cannot be posted will not be automatically finished when this occurs.

Both  order  and  operation  statuses  can  be  configured.  To  do  so,  the  status  texts  must  be  defined  first.

Then, the status texts are assigned to the individual statuses. What must be kept in mind is that for each

order  type,  the  order  status  or  the  operation  status  must  be  configured  with  one  control  indicator  each

(exception: statuses with a control indicator "S" may exist multiple times).

All possible order and operation statuses are configured in status assignment and are assigned to status

texts  using  unique  status  numbers.  The  selection  dialog  allows  you  to  select  and  display  statuses  that

have already been assigned to an order type.

Requirement

You  need  the  customizing  key  in  order  to  configure  the  order  status  assignment.  Settings

relating  to  a  customer  specifically  are  configured  as  described  in  the  customer  specific

documentation (CID).

BDE-BDM_81.docx

Version: 1.5.18468

Page 82 of 125

Shop Floor / Order Data Management

The order status texts and order types must be created first.

Selection criteria

Status type

Selection of the assigned status type

Status text

Defined status text

Order type

Order type that was assigned to the status

Field descriptions

This  dialog  is  used  to  define  the  statuses  used  in  both  the  order  (header)  as  well  as  in  the  separate

operations. There is also another option that allows you to define an operation in relation to the secondary

status. To differentiate which identifier is relevant for which status type, the corresponding status type is

written in parenthesis after the field:

  A = Order status

  G = Operation status

  S = Secondary status

Order type [A G S]

The status is configured based on the order type. This means that for each order type the relevant

order  and  operation  statuses  must  be  defined.  Enter  a  valid  order  type  in  this  field,  for  which  the

status should apply.

Status type (A/G/S)

A

G

S

Status refers to the (entire) order

Status refers to the operation

This is the preparation status (=secondary status) at the operation.

Status (A/G/S)

This is the externally valid status.

BDE-BDM_81.docx

Version: 1.5.18468

Page 83 of 125

Shop Floor / Order Data Management

Status index tab

Status text no.  (A, G, S)

Reference to the order status text table

Symbol  (G)

Symbol  assigned  to  the  status.  It  is  displayed  in  different  functions/  evaluations  (e.g.  order

overview).

The following values are allowed (case sensitive):

Color of the LED

Light green

Dark green

Gray

Yellow

Yellow/ light green

Pink

Black

Blue

Red

Color  (G)

Value that needs to be
entered in the editing
dialog.

Value shown in the detail
panel.

l.bmp

e.bmp

v.bmp

u.bmp

f.bmp

n.bmp

a.bmp

p.bmp

x.bmp

LED_LIGHT_GREEN

LED_GREEN

LED_GREY

LED_YELLOW

LED_YELLOW_GREEN

LED_PINK

LED_BLACK

LED_BLUE

LED_RED

Color  of  the  relevant  status  (text).  At  this  time,  this  color  is  only  used  in  HYDRA  shop  floor

scheduling (HLS).

Entry index tab

Control

Status type A (order status)

V

L

E

S

Prepared

Release (for automatic release)

In process

At least one OP was started

Finished

All OPs are finished or deleted.

None

All others

BDE-BDM_81.docx

Version: 1.5.18468

Page 84 of 125

Shop Floor / Order Data Management



  Status type G (OP status)

V

L

U

F

E

S

Prepared

"Release indicator" for status; before OP is edited for the first time

Running

Is set automatically once OP is logged on

Interrupted

Is set automatically once OP is interrupted

Autom. interrupted

Is set by the server if you want the OP to be interrupted automatically at the

time of a shift change (when using the MDE function at the terminal)

Finished

Is set automatically once OP is finished

None

Other status; not automatically set. Means that no work has yet been done on

the OP

Please note

An OP has not yet begun if its status is set with a control indicator: "V" or "S".

Explicitly setting an order to the status using the control indicator "E" will result in all OPs being set

to the status with the control indicator "E".

The  control  indicator  "A"  means  "archived";  it  is  not  set  via  configuration,  but  is  instead  a  fixed

setting made at the time the data are transferred into the long-term table.

Can be logged on

Check  to  assure  if  the  CURRENT  status  has  set  this  indicator.  If  the  operation  is  interrupted/

finished, the field is ignored. .

Please note: If an OP  or  an order have been set  with the flag "locked", then the OP may not  be

logged on under any circumstances (irrespective of this setting)

Sequencing list

If this status is set, the operation is shown in the sequencing list at the terminal.

BDE-BDM_81.docx

Version: 1.5.18468

Page 85 of 125

Shop Floor / Order Data Management

Please  note:  if  an  OP  or  an  order  has  been  set  with  the  flag  "locked",  then  the  OP  may  not  be

displayed under any circumstances (irrespective of this setting).

Successor can be logged on

If the indicator "Check of preceding OP" ("Plausibilities" index tab) is set to “S" = status at the order

type, then this indicator is used to check whether the subsequent OP can be logged on.

The indicator relates to the preceding OP!

If, for example, an OP logon of the subsequent OP is not to be allowed until the preceding OP has

at  least  begun,  then  this  indicator  must  be  set  if  the  status  is  "running",  "interrupted",  "finished"

(possibly "deleted").

If, for example, an OP logon of the subsequent OP is not to be allowed until the preceding OP has

finished, then this indicator needs only to be set if the status is "finished" (possibly "deleted").

All  preceding  OPs  resulting  from  relationships  in  ADE_AUFTRAGSNETZ,  are  checked  in  this

regard.

Successor can be logged off

If the indicator "Can be finished" ("Entry" index tab) is set to “S" = status at the order type, then this

indicator is used to check whether the subsequent OP can be logged off.

The indicator relates to the preceding OP!

Example 1: If an OP logoff of the subsequent OP is not to be allowed until the preceding OP has

also  at  least  begun,  then  this  indicator  must  be  set  to  "J"  (y  –  yes)  if  the  status  is  "running",

"interrupted" or "finished".

Example 2: If an OP logoff of the subsequent OP is not to be allowed until the preceding OP has

finished, then this indicator needs only to be set if the status is "finished" .

All  preceding  OPs  resulting  from  relationships  in  ADE_AUFTRAGSNETZ,  are  checked  in  this

regard.

Release of subsequent OP

If this indicator is set, then setting the status will result in the status of the subsequent OP(s) being

set to the release status, i.e. set to the status assigned with the control indicator "V".

This only happens if the subsequent OP(s) has (have) not yet been run, was (were) interrupted or

has (have) been finished.

Thus, this option only makes sense if new operations are not created/ transferred using the status

with the control indicator "V".

Please note: As opposed to processing up to ADE 7.1, the release is no longer given as a result of

automatically  scheduling  the  operation  to  a  planned  workplace,  but  instead  only  by  setting  the

aforementioned release status.

BDE-BDM_81.docx

Version: 1.5.18468

Page 86 of 125

Shop Floor / Order Data Management

Planning index tab

Planning

N

T

F

No planning (no transfer to the planning component)

Scheduling only

Scheduling and detailed planning (dispatching) - also includes the simulation

Please note:

The  indicator  "N"  at  the  order  overrides  the  indicator  at  the  operations.  Conversely,  the

indicators at the operations override the indicator "J" (y – yes) at the order

Posting index tab

Posting order duration

Posting

M

Posting to the RPA of the workplace status

A posting to the RPA of the operation is made using the RPA of the status

currently active at the workplace (default).

Posting RPA

Reserved; currently not used

Options index tab

Initial status

This relates to the initial status that should be set at the time an order (A) or an OP (G, S) is set.

Exactly one status must be set using this indicator for both the order as well as the operation.

Please note: If the initial status is not the status with the control indicator "V", then the status of the

first operation as well as that of the order is set using the control indicator "V" after the first

scheduling, provided that the indicator "Scheduling without implicit order release" is not set at the

order type.

Status can be set manually

Reserved; currently not used.

Authorization

Reserved; currently not used

Change of secondary status

Change of secondary status allowed (J (y – yes)/N)

BDE-BDM_81.docx

Version: 1.5.18468

Page 87 of 125

Shop Floor / Order Data Management

Priority check PRIO_PRUEFUNG

Check the priority (J (Y – yes)/N)

When an order is newly created/ modified, they system checks it against priority management

(order group). For this evaluation, all orders with statuses assigned to this indicator are checked.

Please note: The priority check is only performed for order/ operation modifications if the priority

was actually changed during the modification process.

Alterable order data

If this status is set, the order or the OP may either be altered by the PPS system or manually or it

may no longer be altered.

J = MOC and MLE interface (PPS=J) alterable

N = MOC and MLE interface not alterable

K = Only MOC alterable (not via the MLE interface)

M = Only MLE interface alterable (not via the console)

This option does not refer to the priority, notes, long texts, secondary statuses.

Deletable

May the order or the operation be deleted in this status (manually, via PPS system)?

Order

Yes, BUT only if the operations can be deleted, i.e. at no operation may a status be set that has a

control indicator "L” AND for which the "deletable" indicator is set to "N".

  Operation

If the OP is running, then the deletion flag  is set.

Please note: Operations with a current status with a control indicator "L" or "F" may as a rule not be

deleted, irrespective of this setting.

Action

Behavior indicating how the order or the operation should respond during the deletion process, i.e.

at the time of deletion (now) or when a deletion flag is triggered:

Order

L

E

If something is physically deleted and all operations are physically deleted as

well (order header controls the behavior)

Order is set to the status with the control indicator "E".

WARNING: Only the order header, i.e. for the OPs the indicator must also be

set!

D

Order is set to status with control indicator "D" and is deleted/ archived using

the archiving/ deletion program (data management) after the set period. How

BDE-BDM_81.docx

Version: 1.5.18468

Page 88 of 125

Shop Floor / Order Data Management

the  operations  are  treated  is  described  via  the  indicator  RESET  ACTION

(LOESCHAKTION) at the status of each OP.

X

If the action was triggered by the MLE interface:

Order is set to the status with the control indicator "E".

WARNING: Only the order header, i.e. for the OPs the indicator must also be

set!

If the action was NOT triggered by the MLE interface:

If something is physically deleted and all operations are physically deleted as

well (order header controls the behavior)

Operation

L

D

E

X

Is physically deleted.

Is set to the status with the control indicator "D".

OP is set to the status with the control indicator "E" (fixed).

If the action was triggered by the MLE interface:

OP is set to the status with the control indicator "E" (fixed).

If the action was NOT triggered by the MLE interface:

OP is physically deleted.

The reset/deletion action should be the same for both the order header as well as for the

OPs,  because  currently  the  settings  each  relate  to  the  order  or  to  OPs  and  the  OPs  do

not "inherit" anything from their order header.

To assure that an order or an operation can no longer be deleted as of a certain status,

the indicator must be set at all corresponding statuses.

BDE-BDM_81.docx

Version: 1.5.18468

Page 89 of 125

Shop Floor / Order Data Management

19  Order-Related Posting

Overview




Menu

Data collection  Corrections  Order-related postings

Transaction code

oboo

Function authorization

oboo

Usage

The  order-related  postings  application  is  ideal  for  any  foreman,  team  leader,  supervisor  or  anyone  else

who reviews/ adjusts postings entered during production.

Integration

The  order-related  postings  represent  a  database  of  all  of  the  data  entered  during  production.  More

precisely,  listed  here  are  all  postings  and  results  from  production  and  as  such  they  are  available  to  be

reviewed and can be modified.

Displayed  in  the  list  are  all  postings  matching  the  selection  made  in  the  selection  panel.  Displayed  are

only  postings  for  which  the  user  is  authorized  accordingly  to  the  responsibility  area  for  the  workplace/

machine (record types not equal to "B") or for the persons (record type "B") the postings are assigned to.

Requirement

Postings (logon, interruption, partial confirmation, logoff) must be entered for each operation.

The  basic  parameter  setting  of  HYDRA  “maintenance  on  the  basis  of  events”  determines  the  scope  of

editing postings in the maintenance of postings function.

If this option is  not set all  postings may  be  edited in  the maintenance of postings function, i.e. postings

recorded  manually  using  the  maintenance  of  postings  function  as  well  as  postings  generated

automatically by HYDRA due to the recorded events.

However, in case this option is enabled postings generated automatically in HYDRA (due to events) can

neither  be  corrected  nor  deleted  in  the  maintenance  of  postings  function.  Such  postings  can  only  be

edited by way of the “event maintenance”  function. The maintenance of postings function only allows for

the manually recorded postings to be corrected or deleted.

BDE-BDM_81.docx

Version: 1.5.18468

Page 90 of 125

Shop Floor / Order Data Management

Please note:

MPDV  recommends  using  the  maintenance  of  postings  function.  This  option  is  set  by  default  for  new

installations.

Automatically generated postings and manually entered postings

HYDRA  distinguishes  between  automatically  generated  postings  and  manually  recorded  postings.

Automatically generated postings are postings generated automatically by HYDRA based on the recorded

posting  events.  In  contrast  to  this,  manually  recorded  postings  are  postings  entered  manually  in  the

maintenance of postings function. They do not relate to posting events.

HYDRA  does  neither  generate  nor  correct  subsequent  events  for  manually  created  or  edited

postings in the maintenance of postings dialog!

If  a  BDE  (shop  floor  data  collection)  posting  is  changed/initially  created  or  deleted  does  not

have an impact on MDE (machine data collection) postings!

A  modification/initial  data  creation  or  deletion  does  not  result  in  a  recalculation  of  the  actual

cycle relating to operations.

Selection criteria

The application provides the following selection criteria:

Order

All postings for this order are shown when the order number is entered.

Operation

This selection criterion refers to the operation number. All postings are shown that are posted to the

operation number that was entered.

Workplace

This selection criterion relates to the workplace number where the posting originated. All postings

are displayed that were generated as a result of the events at this machine/ this workplace.

Cost center

By entering a cost center, all postings are shown that were posted at the workplaces/ machines of

this cost center in the period of time entered.

Record type

It  is  possible  to  limit  the  selection  by  record  type  ("U/  E/  H/  B/  T  records").  What  needs  to  be

considered  when  doing  so  is  that  only  postings  of  record  type  "H"  are  shown  for  operations  that

require batch management, unless there was a selection explicitly by record type.

BDE-BDM_81.docx

Version: 1.5.18468

Page 91 of 125

Shop Floor / Order Data Management

Person from … to …

By  entering  a  personnel  number,  all  personnel  postings  ("B  records")  can  be  displayed  that  were

generated  from  the  personnel  postings  for  the  person  entered  as  well  as  postings,  which  were

generated with the staff badge number for postings entered manually.

Order type

By selecting one or more categories, all postings are displayed with an order that is assigned to this

order type.

Order category

By selecting one or more categories, all postings are displayed with an order that is assigned to this

category.

Interruption reason

By entering an interruption reason, all postings are displayed that were canceled or interrupted with

this interruption reason.

Premium group

In HYDRA Incentive Wage Calculation LLE, either workplaces/ machines are assigned to premium

groups or persons are assigned to premium groups. By entering a premium group, all postings are

shown  that  were  posted  at  the  workplaces/ machines  of  this  premium  group  in  the  period  of  time

entered.

Modified by/ modified on

By entering data in the "modified by" field and the editing date, all postings will be displayed that a

person edited on this day.

Including cancellation log records

This option is used to select and display cancellation log records (postings of record type "S").

Including original log records

Original postings (postings of record type "O") are also displayed from this option.

Non-authorized postings

Use this check box to display order-related postings (record type

U, E, H, T, B) that have not yet been authorized. This makes sense if postings are not uploaded until

they have been authorized.

Date from ... to ...

All of the postings made in the limited period are displayed.

Different results might occur for a date, depending on whether the selection made is based on the

shift or time.

Please  note  that  this  application  only  allows  for  data  to  be  selected  and  edited  in  the

online data area.

BDE-BDM_81.docx

Version: 1.5.18468

Page 92 of 125

Shop Floor / Order Data Management

Shift

Time

By  entering the shift, postings can  be selected that  were posted during  a certain shift (as per the

BDE shift model).

Please keep in mind that the time stamp for logging off pertaining to a BDE log record determines

the shift (shift date, shift number) to which the log record belongs.

Postings  can  be  limited  even  further  using  the  time  selection  criterion.  This  selection  criterion

references the posting's start time. Please note in this context that this start date may definitely go

back farther into the past for workplaces where the shift automatic function has not been activated.

When using several selection criteria, the overlapping selection criteria is displayed.

Please note as concerns merged operations: For merged operations formed at the MOC, ONLY

the  individual  operations  are  displayed  and  only  these  can  be  modified.  When  log  records  of

individual  workplaces  are  modified/  corrected,  this  will  update  the  status  of  the  merged

operation.

Please  note  as  concerns  split  operations:  For  split  operations,  the  log  records  for  the  split

operations  are  displayed.  No  log  records  are  generated  from  the  split  operations  for  the  split

master. When log records of split operations are modified/ corrected, this will update the status

of the split master.

Toolbar

 Authorize

Function to validate postings\\archive\mast_ind\translate\across\sign - sign

 Machine-related postings

Starts the application machine-related postings

Transfers the workplace, cost center, date/time and the shift from the selection panel.

 Order information

Opens the order information

Field description

In the table view, the posting's data, including any other additional information, is displayed, while in the

maintenance/editing dialog only the data relevant to the posting are displayed.

BDE-BDM_81.docx

Version: 1.5.18468

Page 93 of 125

Shop Floor / Order Data Management

General index tab

Record type

Record type of an order-related posting:

U: The posting was triggered by the operation being interrupted.

E: The posting was triggered by the operation being ended.

B: Personnel-related posting ("B" is for "Bediener" = operator)

H:  Posting  relating  to  batches:  Posting  is  made  with  respect  to  batches  for  operations  that  are

subject to batch management, provided that HYDRA-MPL is in use. Postings of the record type U

or E are not displayed in this case if the record type is not selected explicitly.

T: Partial quantity confirmation/upload (scrap with reason)

Order

Order number

Sequence

If sequences are used, the sequence is displayed here.

OP

Split

The order/ operation specified must exist; there is no review relating to the status.

If splits are used, the split number is displayed here.

Workplace

Number of the workplace/ machine at which the operation was posted.

Cost center

Cost center of the workplace or cost center at which the posting was made

Person

Personnel number of the person who triggered the posting.

This number must exist in HYDRA. For personal postings (record type "B"), entering the personnel

number is mandatory. The field can remain empty for another record type.

Employee group (only displayed in tabular form)

Assigned employee group as per HR master data

Interruption reason

Status of the machine/ workplace at the time of the interruption or the completion confirmation. This

relates to the workplace/ machine status.

Batch number (only relevant when using MPL)

Produced batch number or entered batch number

BDE-BDM_81.docx

Version: 1.5.18468

Page 94 of 125

Shop Floor / Order Data Management

Quantity index tab

Primary quantity

Yield

Yield produced in the primary quantity unit

Scrap

Scrap produced in the primary quantity unit

Scrap reason

Scrap reason

Rework

Rework quantity in the primary quantity unit

Open quantity

Open quantity entered in the primary quantity unit

Unit

Quantity unit, is assumed from the operation.

Please note: the field cannot be modified in editing mode

Total cycles (only displayed in tabular form)

Cycles posted while the operation was logged on (only for postings of record type U, E)

Cycles during MUT (only displayed in tabular form)

Cycles posted while the operation was logged on and for which the status "Production" was active

(only for postings of record type U, E)

Secondary quantity/ tertiary quantity/ basic quantity

Yield, scrap, rework, open quantity, unit

Posted quantities in each quantity unit.

Please note: the units fields cannot be modified in editing mode.

Duration index tab

Logon

Date and time of the start posting which this posting results from.

Logoff

Date and time of the start posting or the end posting which this posting results from.

The  points  in  time  "first  logon",  "last  interruption"  or  "last  logoff"  saved  in  the  order

status are not affected by modifications to the points in time "logon" or "logoff".

BDE-BDM_81.docx

Version: 1.5.18468

Page 95 of 125

Shift, shift date, beginning of shift, end of shift

Number of the shift, shift date that the posting is assigned to according to the BDE shift model as

Shop Floor / Order Data Management

well as the shift times.

Shift type (only displayed in tabular form)

Shift type that was defined in the day type configuration.

Shift model (only displayed in tabular form)

Day type that was used for the posting.

Order-related RPA

Order-related times that were posted to the resource performance accounts.

Personal RPA

Personal times that were posted to the resource performance accounts.

Duration (only displayed in tabular form)

Posting duration.

Sum (in the editing dialog only)

The value corresponds to the duration of the posting (column “duration” in the tabular view) and is

calculated automatically from the total of RPA 1 to RPA 11.

Labor utilization

Duration of labor utilization

Difference (in the editing dialog only)

The difference between the original duration and

- the new duration from the total of RPA1-11 or

- from the different posting times

is shown for information purposes.

In  general,  order-related  resource  performance  accounts  and  personal  resource  performance  accounts

are displayed and may be edited separately.

For  personal  postings  (record  type  “B”),  order-related  and  personal  postings  are  shown  subject  to  the

setup configuration option “proportionate RPA posting in personnel postings”.

HYDRA basic parameter settings: option "proportionate RPA posting in personnel postings“

If the option “proportionate RPA posting in personnel postings” is enabled in the HYDRA basic parameter

settings,  the  order-related  as  well  as  personal  resource  performance  accounts  will  be  displayed  for

personnel postings (record type “B”).

BDE-BDM_81.docx

Version: 1.5.18468

Page 96 of 125

Shop Floor / Order Data Management

If  the  option  “proportionate  RPA  posting  in  personnel  postings”  is  not  enabled  in  the  HYDRA  basic

parameter  settings,  only  the  personal  resource  performance  accounts  will  be  displayed  for  personal

postings (record type “B”).

The  order-related  resource  performance  accounts  are  automatically  set  to  the  values  of  the  personal

resource performance accounts.

Field descriptions in the wage data index tab

te

tr

teb

trb

Default  individual  time  for  labor  time  in  [h/1000].  Is  assumed  from  the  operation  (requires  the

relevant LLE license).

Target specification for setup time in [h]. Is assumed from the operation (requires the relevant LLE

license).

Default individual time for the (machine) occupancy time in [h/1000]. Is assumed from the operation

(requires the relevant LLE license).

Default individual time for the (machine) setup time in [h]. Is assumed from the operation (requires

the relevant LLE license).

Wage type

The wage type is assumed from the operation (requires the relevant LLE license). Please note: Not

this value is uploaded as the wage type at the ERP/PPS upload interface, but the value defined in

the order backlog at the operation.

Premium group

In HYDRA Incentive Wage Calculation LLE, either workplaces/ machines are assigned to premium

groups or persons are assigned to premium groups (requires the relevant LLE license). In this case,

the specified premium group must be valid.

Operator position

Operator position entered for the posting (only relevant for personnel postings).

Premium indicator

Premium indicator entered for the posting (only relevant for personnel postings).

BDE-BDM_81.docx

Version: 1.5.18468

Page 97 of 125

Shop Floor / Order Data Management

Settlement date

The settlement date determines if the posting belongs to a settlement date in order to determine the

incentive wage and to perform the PZE-BDE comparison. Once the settlement date has been filled

in, then the order-related posting is assigned to this day.  If the field Settlement date is empty, the

field  Shift  date  will be assigned. If the shift date frequently  does not match the  assignment to the

PZE (time and attendance module), the BDE shift models will need to be adjusted.

The field is filled in as a result of the PZE work day evaluation or by the maintenance of postings.

This means that normally the field is initially empty for all postings for the current day and that it will

not  be  updated  until  the  next  morning  after  the  PZE  work  day  evaluation  has  run.  As  a  result,

postings  for  the  current  day  may  be  incorrectly  assigned  to  the  previous  day.  The  incorrect

assignment will normally disappear then on the next day on its own.

Settlement date assignment is subject to the following rules:

Order-related personnel postings (B records)

Personnel postings are assigned to the PZE personal day if they extend into a time window of +/- 2

hours of the rounded working times of the reporting person. If a personnel posting lasts several

days, it will be assigned to the first PZE personal day, because often a person has forgotten to log

off.

Order-related postings (U/E/T records)

Order-related  postings  are  assigned  to  the  PZE  personal  day  of  the  reporting  person  if  their  end

time is within a time window of +/- 2 hours of the rounded working time of the reporting person. If a

personal posting lasts several days, it will be assigned to the last PZE personal day, because the

reporting person is determined based on the logoff and the person logging off posts the quantities.

If no personnel number is entered in the posting, the settlement day cannot be assigned.

User fields index tab

All of the user fields are displayed with the key Object type= "ADEPRO" and User field key= "SYSTEM".

Administration index tab

Editor

The last person to edit the posting.

Last modification

Date on which the posting was last edited.

Name

The editor's name who edited the posting at last according to the user administration.

Uploaded

A flag showing  whether the posting has already  been uploaded to an  upper level system. J (Y) =

uploaded, N = not uploaded, X = blocked

BDE-BDM_81.docx

Version: 1.5.18468

Page 98 of 125

Shop Floor / Order Data Management

Upload date, upload time (only displayed in tabular form)

Time of the upload

Wage confirmed

Flag to upload data to a payroll system according to the customer's requirements.

Date of authorization, authorization time (only displayed in tabular form)

Date on which the posting was last authorized.

Reference

Unique reference for the posting

Type

This flag indicates how this data record was entered or modified.

(empty): Original posting from entry.

E:  Manually  created  posting  as  a  result  of  modifications.  Postings  that  have  already  been  edited

(Type "E") are not copied and are stored as a type "O" posting.

O: Once an original posting has been edited,  it is copied and stored as a type  "O". Thus, original

information will remain available to be displayed.

S: Cancellation for PPS

 cancellation and original postings cannot be modified or deleted.

Create new posting

Along with the manual creation of a posting of the record type “U“ or “E”, a posting of the record type “T”

is created automatically.

The  posting  of  record  type  T  includes  quantities  of  the  U/E  posting,  but  no  durations,  the  point  in  time

refers to the end time of the U/E posting

Automatic status change of the operation



If a posting of the record type “E” is created for an operation the operation will be set to the  operation

status “E”, provided that this status was “V” or “U” previously. Additionally, the point in time of the “first

login” or the "last logoff" are set in the order status, provided they had not yet been set.



If a posting of the record type “U” is created for an operation, the operation will be set to the operation

status “U”, provided that this status was “V” previously. Additionally, the point in time of the “first login”

or the "last interruption" are set in the order status, provided they had not yet been set.

  Please note: The mechanisms that are processed are not the same in both cases, in contrast to the

interruption of an operation (A_UN) or the logging off of an operation (A_AB/A_BE).

  The points in time of the "first logon", "last interruption"  or "last logoff" saved in the order status are

not adjusted, in case the operation has already been started. In this case, the date corresponds to the

date of the real, first logon.

BDE-BDM_81.docx

Version: 1.5.18468

Page 99 of 125

Shop Floor / Order Data Management

Automatic quantity adjustment of the operation



If a posting of the record type “E” or “U” is created for an operation the order quantity will be corrected

in the order status. A partial upload (posting of the record type “T”) including the quantity is generated

additionally



If a posting of the record type “T” is created for an operation the order quantity will be adjusted in the

corresponding  order posting of the record type “U” or “E” and  order quantities  will be revised  in the

order status

  Target quantities will not be compared if a posting of the record type “E” is created

Change posting

A  cancelation  record  will  be  generated  if  a  posting  is  already  uploaded  to  the  PPS  system  (upload  flag

“J”). In any other case, the data record is changed physically.

Please note: At the time of changing a posting, ERP/PPS uploads must not be running.

Automatisms to change postings

  The original data record will be saved if the posting is generated automatically.

  Cancelation postings and original postings cannot be changed.

Changing of already uploaded postings

As a part of HYDRA customizing it can be defined for each order type whether or not the changes made

in  the  posting  maintenance  are  to  be  uploaded  to  the  ERP/PPS  system.  The  following  possibilities  are

given:

J

E

N

Allow modification and upload

Allow modification; no upload – data may be changed but not uploaded.

No, modifications are not allowed – data can no longer be changed.

Checking respectively refers to the order type of the order to be changed.

A  cancelation  posting  is  generated  when  changing  a  posting  that  has  already  been  uploaded,  provided

that the option is set to “J”. This cancelation posting keeps the original reference. The changed posting is

created with the new reference.

Please note: No check is performed for MDE postings.

BDE-BDM_81.docx

Version: 1.5.18468

Page 100 of 125

Shop Floor / Order Data Management

Changing of the record type

The record type of a posting cannot be changed from

- record type "H" / "U" / "E" to record type "B"

- record type "B" to record type "H" / "U" / "E"

and is rejected by a validity check.

Correcting of an order number in a posting

The below-mentioned procedure/order has to be observed to change the order number in a posting:

  Copy the posting to be changed to the new order number.

Copy  the  order-related  posting  (record  type  “U”,  “E”)  at  first  and  then  the  personal  posting  (record

type “B”).

  Delete the postings made for the wrong order number.

Changing the quantity for an order posting (record type "U"/"E")



If  the  quantity  is  reduced  a  partial  upload  (posting  of  the  record  type  “T”)  including  the  difference

quantity will be generated. This posting includes negative quantities



If  the  quantity  is  increased  a  partial  upload  (posting  of  the  record  type  “T”)  including  the  difference

quantity will be generated. In this case, this posting includes positive quantities

  The scrap reason from the U-posting is used as scrap reason for the new posting (record type “T”)

  Order quantities are corrected in the order status

  Target quantities are not compared if a posting of the record type “E” is corrected.



If  the  Material  and  Production  Logistics  module  (HYDRA-MPL)  is  in  use  quantities  may  ONLY  be

corrected within the H records and not within the U/E postings!

Changing quantities for a partial upload (record type "T")

  The quantity is adjusted in the corresponding posting relating to the order (record type “U” or “E”).

  The batch record (posting of the record type “H”) is adjusted, provided that the operation is subject to

management in batches

Changing quantities for a batch posting (record type "H")



If  the  quantity  is  reduced  a  partial  upload  (posting  of  the  record  type  “T”)  including  the  difference

quantity will be generated. This posting includes negative quantities



If  the  quantity  is  increased  a  partial  upload  (posting  of  the  record  type  “T”)  including  the  difference

quantity will be generated. In this case, this posting includes positive quantities

  The quantities are adjusted in the U/E record.

  The batch status is not adjusted!

BDE-BDM_81.docx

Version: 1.5.18468

Page 101 of 125

Shop Floor / Order Data Management



If  the  Material  and  Production  Logistics  module  (HYDRA-MPL)  is  in  use  quantities  may  ONLY  be

corrected within the H records!

Changing quantities for a personal posting (record type "B")

Quantity changes to personal postings generally do not affect the order status or order-related postings.

Changing the time in an order posting (record type "U"/"E")



If times (logon/logoff) of an order posting (record type “U” or “E”) are changed the times for the partial

upload(s)  (record  type  “T”)  will  also  be  changed,  in  case  this  upload/these  uploads  would  then  no

longer be within the order posting.



If the times (logon/logoff) of an order posting (record type "U" or "E") are to be shortened, the times of

personnel  postings  (record  type  =  "B")  that  might  pertain  to  it  need  to  be  changed  at  first.  As

otherwise,  there  would  be  personnel  postings  outside  of  order  postings  and  could  no  longer  be

changed.

  The points in time of the "first logon", "last interruption" or "last logoff" saved in the order status are no

longer adjusted by changing the points in time (logon/logoff).

Changing the time in a personnel posting (record type "B")



If points in time (logon/logoff) pertaining to a personnel posting (record type "B") are changed outside

of  an  order  posting,  an  error  message  will  occur.  As  a  personnel  posting  must  not  exist  without  a

relevant order posting.

Procedure for changing times in posting records





If an order posting is shortened, personnel postings that might pertain to it need to be shortened first.

In  case  a  personnel  posting  is  to  be  prolonged  (longer  than  the  original  order  posting),  the  order

posting that pertains to it needs to be prolonged at first.

Changing of RPA in personal postings (record type "B")

  The  personal  resource  performance  accounts  are  adjusted  accordingly  in  the  order  posting.  This  is

generally  performed  irrespective  of  the  option  “Proportionate  RPA  posting  in  staff  postings”  in  the

HYDRA basic parameter settings.



If  an  RPA  is  changed  the  labor  time  is  adjusted  in  the  section  “personal  resource  performance

accounts”. The “duration” field shows the sum total of RPAs. The total of RPAs may deviate from the

labor time as labor times can be changed manually.

Labor time / personal RPAs in order-related postings (record type "U"/"E")



In  order-related  postings  the  field  "labor  time"  is  not  adjusted  automatically  if  modifications  to  the

personnel postings occur. The labor time needs to be changed manually within the order posting.

BDE-BDM_81.docx

Version: 1.5.18468

Page 102 of 125

Shop Floor / Order Data Management



If  a  personnel  posting  is  changed,  the  personal  resource  performance  accounts  are  adjusted

accordingly  within  the  order  posting.  This  is  generally  performed,  irrespective  of  the  option

“Proportionate RPA posting in staff postings” in the HYDRA basic parameter settings.

Copy posting

The copy function is the same as adding a new posting. In this case, though, the fields in the dialog box

are preset to the values of the currently selected posting.

Delete posting



If  a  posting  is  already  confirmed  to  the  PPS  system  (upload  flag  “J”),  then  a  cancellation  record  is

created. Otherwise, the data record is physically deleted.

  The operation is reactivated automatically if a posting of the record type “E” is deleted.

  When deleting a posting of the record type “U” or “E”, all the partial uploads (record “T”) pertaining to

it will be deleted automatically.

  Personal postings (record type “B”) are not deleted along with deleting order-related postings (record

type “U”/”E”). Consequently, they should be deleted manually prior to deleting order-related postings.

  Only manually created postings can be deleted if the HYDRA basic parameter option “maintenance

on the basis of events“ is enabled.

  The saved points  in time "first logon",  "last interruption"  or "last  logoff" are not updated  in the  order

status if an order-related posting is deleted (record type "U"/"E").

Authorizing of postings

The  date  of  the  approval  as  well  as  the  person  giving  the  approval  are  set  during  the  authorization

process.

Please note

When HYDRA is customized, it is possible to define for individual order types, that  postings can only be

uploaded/confirmed after authorization.

After  5  days  at  the  latest  (this  standard  setting  can  be  changed)  non-authorized  postings  are  also

confirmed/uploaded.

General checking



In case a posting has already been uploaded and the customizing option “no change after upload” is

set, the posting can neither be changed nor deleted anymore.

BDE-BDM_81.docx

Version: 1.5.18468

Page 103 of 125

Shop Floor / Order Data Management



In  case  a  posting  has  already  been  uploaded  and  the  configuration  “change  allowed,  no  upload”  is

enabled  in  the  order  type  dialog,  the  posting  can  be  changed/deleted  after  confirming  it  in  an

information dialog. In this case the status is corrected in HYDRA but an upload/cancelation is not sent

to the higher-level system.

  Postings  entered/generated  automatically  can  only  be  edited  or  deleted  if  the  event  maintenance

function is disabled. In contrast to this, posting records created manually may always be changed or

deleted.

  Cancelation  postings  (record  type  “S”)  and  original  postings  (record  type  “O”)  cannot  be

changed/deleted, as these postings have been designed for transparency/traceability reasons.

  When  order  postings  (U/E  records)  are  added/changed/copied,  it  is  checked  whether  they  coincide

with  already  existing  order  postings.  The  period,  order  number  and  machine  are  checked  in  this

context.

  When  a  partial  upload  (record  type  “T”)  is  added/changed/copied,  it  is  checked  whether  a

corresponding order posting exists.

  When a batch posting (record type “H”) is added/changed/copied, it is checked whether

- a corresponding order posting exists

-the operation is subject to management in batches

-any overlapping batch posting exists for the order/workplace.

-only yield or scrap is indicated. But not both quantity units.

  The user must be provided with the responsibility area authorization for the workplace indicated in the

posting record.

  Uploads must not be running when a posting is being changed

  When  the  posting  maintenance  functionality  is  used  to  change  automatically  collected  data  and  to

create completely new postings (e.g. external orders), it is checked whether or not the workplace is

currently blocked by the event maintenance function.

  

BDE-BDM_81.docx

Version: 1.5.18468

Page 104 of 125

Shop Floor / Order Data Management

20  Event Maintenance

Summary

Menu

Data entry  Data correction  Event maintenance

Transaction code

evli

Function authorization

evli

Usage

Event  maintenance  offers  the  ability  to  edit  and  recalculate  posting  events  resulting  from  data  entry.

Furthermore, events can be deleted or new events created.

Integration

The  update  function  gives  the  operator  the  ability  to  subsequently  modify  events  and  to  have  these

modifications recalculated by the system after a corresponding validation check and in so doing, to obtain

modified postings that can be taken into consideration (selected) in the various evaluations/reports and/or

uploaded to the higher-level ERP system.

The  distinctive  feature  of  event  maintenance,  as  opposed  to  posting  maintenance,  is  that  it  has  a

recalculation  function  that  makes  it  possible  to  regenerate  postings  that  result  from  the  modified  data

(events). In the process, like on-line posting at the time of data entry, all validation checks necessary for

generating a consistent database are likewise performed.

Requirements

The option needs to be activated to be able to edit events in this application. If this is not the case, the

following note will be displayed, when opening the application “The event-related BDE maintenance has

been disabled in the basic parameter settings. Modifications cannot be saved.” Consequently, events can

only be selected and displayed. But new events cannot be added. Existing events can neither be edited

nor deleted.

The maintenance of events option is disabled by default. The option is only enabled if required as a part

of customizing the system and once the corresponding prerequisites or the below-mentioned restrictions

have been checked and discussed with the customer.

Restrictions

Certain  posting  functions  are  purely  data  entry  functions  and  the  data  entered  using  them  cannot  be

edited  or  recalculated  in  event  maintenance.  Use  of  the  tabular  event  maintenance  in  conjunction  with

these functions must be tested in each case separately. These functions are described below.

BDE-BDM_81.docx

Version: 1.5.18468

Page 105 of 125

Shop Floor / Order Data Management

Uneditable data that has been entered

  Remarks  or  comments  entered  in  different  posting  dialogs  at  the  shop  floor  terminal  cannot  be

displayed or edited in event maintenance.

  Serial  numbers  collected  for  OPs  requiring  serial  numbers  cannot  be  displayed  or  edited  in  event

maintenance.

  Quantities  can  be  entered  in  the  system,  including  in  alternative  units.  However,  in  event

maintenance, quantities can only be edited in their primary quantity unit.

  Manual activities can be entered in the system or calculated based on formulas. Activities cannot be

displayed or edited in event maintenance.

  Posting using OP reference or upload number:

Editing can only be done in event maintenance based on the MES order number.

  Production  lock  modifications  are  documented  as  events  .  They  can  be  displayed  in  event

maintenance, but not edited.

  User fields that during the customizing process were integrated into posting dialogs (e.g. OP logoff)

cannot be displayed or edited in event maintenance.

  Automatic  posting  processes  and  their  configurations  (e.g.  terminating  predecessors/  interrupting  or

automatically logging off an operation if its target quantity is reached), are not taken into consideration

during recalculation in event maintenance.

  Events that occur because of resource-based postings (WRM or DNC) are not displayed or edited in

events maintenance.

  The "Automatic OP change" option in the BDE index tab of HR master data is only taken into account

online; in event maintenance it does not affect recalculation.

  The "OP change during status change" option in status assignment of machines/ workplaces is only

taken into account online; in event maintenance, it does not affect recalculation.

  Postings of personnel or machine waiting periods are not displayed in events maintenance.

  No escalations are triggered during recalculation in events maintenance.

  Additionally recorded optional data in the "Change machine status" dialog is not displayed in the input

dialog  and  cannot  be  modified.  This  refers  to  data  such  as  "expected  duration",  a  comment  or  any

additional data for escalation management.

Merged operations

Assignment of a new OP to a merged operation is NOT supported in event maintenance. Only data for

already posted merged operations can be modified.

Merged  operations  that  were  entered  using  the  "Merged  operation  per  machine"  function  CANNOT  be

edited in events maintenance.

A  recalculation  is  no  longer  possible  for  merged  operations  that  were  generated  in  MOC  if  the

composition of the MOP was changed.

BDE-BDM_81.docx

Version: 1.5.18468

Page 106 of 125

Shop Floor / Order Data Management

PZE controls ADE

The "PZE controls ADE“ setup setting can lead to scenarios in event maintenance in which the personnel

logon  event  is  displayed  before  the  actual  order  logon,  because  the  logon  is  then  rounded  to  the  PZE

time.

If  inconsistent  postings  exist  in  event  maintenance,  evident  because  a  personnel  logon  appears  before

the actual order logon, then they must be corrected   so that the personnel logon time is changed to the

time of the order logon.

Interface with SAP

Event maintenance cannot be used in conjunction with the PP-PDC interface, because the standard SAP

system does not permit cancellations from external systems.

MDE change of shifts events

Changing these events might result in gaps or the shifts being no longer calculated completely. For this

reason, shift change events should not be modified in general.

In  this  case,  recalculation  of  the  entire  shift  might  not  be  guaranteed,  as  the  relevant  events  identifying

the points in time of the shift start/shift end can no longer be found at the corresponding point in time.

Change of shift events are events triggering status changes "M_MST“

end of shift dialog A_AUN

beginning of shift  dialog A_AAN

Shift end events (event M_MST with dialog A_AUN) only may include the status 20000 "no shift“.

Editing of finished operations

Operations  that  have  already  been  finished  can  be  edited  in  the  event  maintenance  dialog.  However,

please note in this context, that the status of a finished operation does no longer change, not even if, for

example, the logoff of the operation is canceled or changed into an interruption.

Operations that have already been finished generally have to be reactivated using the function "reactivate

operation".

Material and production logistic (MPL)

There  are  the  following  restrictions  for  the  event  maintenance  in  conjunction  with  operations  subject  to

management in batches:

  Only MPL machines with batch processing can be edited. Machines of the types cutting reels, parallel

output batches, throughput batch mode, etc. are not supported.

BDE-BDM_81.docx

Version: 1.5.18468

Page 107 of 125

Shop Floor / Order Data Management



Input  batch  postings  relating  to  the  operation  are  only  supported  to  a  limited  extent  for  editing.

Postings outside of the OP posting are not taken into account. Consequently, consumption postings

to input batches are not considered.



It is not allowed to change output batch numbers or to delete events CA_AN/CA_AB.

  Batch attributes can neither be displayed nor changed using the event maintenance.

  Existing batch tracing is not changed subsequently by the editing function.

Editor of the event

For  technical  reasons,  a  user  ID  that  has  a  maximum  of  9  characters  can  be  defined  for  the  event

(column "editor"). This means, inputting a user ID that is 10 characters long results in the last digit to be

cut off in the "editor" column of event maintenance.

Edit partitioning

Editing of the machine partitioning event (M_TLG) only affects the shift included in recalculation.

If  an  order  runs  over  several  shifts  (automatic  relogin),  all  events  affected  by  this  event  changing  the

partitioning need to be recalculated.

For this reason, the following structure is to be kept for changing the partitioning event:



If partitioning is changed, the entire period for which this modification applies needs to be requested,

i.e. until the operation is interrupted or finished manually.

  When changes are made, the relevant partitioning event has to be changed

AND

if  the  operation  runs  automatically  over  several  shifts,  the  subsequent  manual  interruption  or

completion confirmation of the order has to be changed as well.

For the manual interruption/completion confirmation of the order, it is sufficient to just save the data

without changing it.

  Consequently,  the  recalculation  process  automatically  recalculates  all  data  that  coincide  with  the

period  between  changing

the  machine  partitioning  and

the  manual

interruption/completion

conformation.

BDE-BDM_81.docx

Version: 1.5.18468

Page 108 of 125

Shop Floor / Order Data Management

Please note:

The events to be recalculated are not selected automatically, as changes to the partitioning might affect

several shifts that might then no longer be included in the selection period.

Selection criteria

The application provides the following selection criteria:

Workplace

All data relating to the selected workplace are shown.

MES order number

Results list: The workplace events, to  which the order was posted during the selected period, are

shown. You can also run a search using wildcards.

Person … to …

Results list: The workplace events the person (persons) was (were) logged onto during the selected

period, are displayed. You cannot run a search using wildcards.

Date … to …

The period of time within which the events should be selected and displayed.

Please  note  that  this  application  only  allows  for  data  to  be  selected  and  edited  in  the

online data area.

Parallel staff logins

The  "Parallel  staff  logins"  option  selects  the  data  for  all  workplaces  a  person  was  logged  onto.  It

should  be  set  if  data  is  being  edited  on  workplaces  where  staff  is  posted  for  multiple  machine

operation.

More information is available here.

Refresh data

This  option  allows  you  to  control  whether  data  in  event  maintenance  should  be  refreshed  when

recalculation is completed (slower performance in the event of large amounts of data). Please note:

In the event of a recalculation error, the data freezes in the display.

Except  for  the  check  box  "Refresh  data",  all  selection  fields  are  disabled  when  data  is

requested. They cannot be input again until you have clicked on the "Discard" icon.

If the data are currently locked by another editor at the time data are requested, then the user

will still have the option to have the data be displayed. In this case, the data are only displayed;

BDE-BDM_81.docx

Version: 1.5.18468

Page 109 of 125

Shop Floor / Order Data Management

the data may not be modified.

Toolbar

The  following  functions  can  be  accessed  from  the  toolbar.  Please  also  consider  the  requirements  for

editing events:

Modify an existing event

Function authorization: evli.edit

The dialog opens that corresponds to the event selected.

Delete an existing event

Function authorization: evli.delete

The selected event is deleted.

Recalculate

After acknowledging the confirmation prompt, any added, modified or deleted events are checked

for validity; the postings resulting from the events are regenerated. Once recalculation is complete,

a note accordingly will finish the action.

If an error occurs during recalculation (e.g. because of logically invalid values), then this is indicated

by a message.

Discard

Any added, modified or deleted events are discarded after acknowledgment by the user and the list

is cleared.

 Order information

Function authorization: orin

Calls up the application order information.

 Workplaces/ machines

Function authorization: wpov

Calls up the application workplaces/machines.

Create events index tab

Function authorization: evli.create

BDE-BDM_81.docx

Version: 1.5.18468

Page 110 of 125

The icons

 for creating events are available in this index tab. The icons are divided into separate

Shop Floor / Order Data Management

categories:

Operation category:

o  Log OP on (A_AN)

o  Log OP off (A_AB)

o  Partial confirmation (A_TR)

o  Quantity upload (A_MR)

o

Interrupt OP (A_UN)

o  Finish OP (A_BE)

Person category:

o  Log person on (P_AN)

o  Log person off (P_AB)

Machine/ workplace category:

o  Change status (M_MST)

o  Change partitioning (M_TLG),

o  Automatic counter (M_CTR_AUTO),

o  Automatic quantity (M_AUTO)

Materials category:

o  Log output batch on (CA_AN)

o  Log output batch off (CA_AB)

o  Log input batch on (CE_AN)

o  Log input batch off (CE_AB)

Miscellaneous category:

o  Activate OP (NC_AN)

o  Deactivate OP (NC_AB)

  Field descriptions

Class

Internal event classification:

P = Personal data

M = Workplace data

BDE-BDM_81.docx

Version: 1.5.18468

Page 111 of 125

Shop Floor / Order Data Management

A = Order data

C = Batch data

Event

The possible events and their colors are listed here.

Dialog

Each event-triggered dialog is displayed here. Besides the dialogs of the same name (e.g. A_AN,

A_UN, ...) a different dialog can be the trigger for the event.

Date, time

The point in time when the event was posted.

Workplace

The workplace, to which the event was posted.

MES order number

The combined order/ operation number, for which the event was posted. This field is only filled in if

the event has an order reference.

Person

The person who triggered the event or for whom the event was triggered. This field is only filled in if

the event was triggered by a person or has a reference to a person.

Status

The workplace/ machine status that applied at the time of the event; this field contains only context-

related information.

PZE

Reference to clock-in or clock-out

Primary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Secondary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Tertiary quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Basic quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

BDE-BDM_81.docx

Version: 1.5.18468

Page 112 of 125

Shop Floor / Order Data Management

Editor

Last editor of the event

Date, time

Time of the last edit

Editable

Y = Event may be edited

N  =  Event  may  not  be  edited,  e.g.  is  the  master  of  an  MOP  or  is  locked  by  a  change  in  the  log

record

Reference

Unique ID of the data record

Priority

Priority specification for simultaneous events (1 = highest priority)

Sorting

Internal use

Status 1

Event M_MST: machine status/ interruption reason

Event M_TLG: Partitioning

Event M_SZY: Target cycle

Status 2

Internal use

Status 3

Internal use

Attribute 1

Events C_GEN, C_UMB, CE_AN, CE_AB, CA_AN, CA_AB: Target location/ material buffer

Attribute 2

Event P_AN: Wage/ premium indicator

Events CE_AB, C_GEN: Info on batch

Otherwise: Internal use

Attribute 3

Event P_AN: Operator position

Events CA_AB, C_GEN: Transport unit

Event CE_AN: BOM item

Event CE_AB: Batch status

BDE-BDM_81.docx

Version: 1.5.18468

Page 113 of 125

Shop Floor / Order Data Management

Attribute 4

Internal use

Attribute 5

Event CE_AB: Current batch

Counter 1, Type 1, Reason 1

Internal use

Counter 2, Type 2, Reason 2

Internal use

Counter 3, Type 3, Reason 3

Internal use

Counter 4-10, Type 4-10, Reason 4-10

Internal use

Partitioning

Partitioning. Is currently only displayed for the event M_TLG.

Displayed events

The following events are displayed:

Event

Designation

Type

A_AN

A_TR

A_UN

A_AB

A_BE

Log operation on

Order-related event

Partial confirmation

Order-related event

Interrupt operation

Order-related event

Log operation off

Order-related event

Terminate operation

Order-related event

A_MR

Partial confirmation

Order-related event

P_AB

P_AN

Log person off

Log person on

P_VAN

Person advance logon

Person-related event

Person-related event

Person-related event

Cannot be edited

M_MST

Change workplace/ machine status

Machine-related event

M_AUTO

Automatic quantity posting from the terminal  Machine-related event

BDE-BDM_81.docx

Version: 1.5.18468

Page 114 of 125

Shop Floor / Order Data Management

Event

Designation

Type

M_CTR_AUTO  Automatic counter posting from the terminal

Machine-related event

M_TLG

Change in partitioning

Machine-related event

M_SZY

Change target cycle

Machine-related event

Cannot be edited

M_PSPERRE

Production lock (beginning with MDE 7.2)

Machine-related event

Cannot be edited

CA_AB

Log output batch off (MPL)

Batch-related event

CA_AN

Log output batch on (MPL)

Batch-related event

CE_AB

Log input batch off (MPL)

Batch-related event

CE_AN

Log input batch on (MPL)

Batch-related event

NC_AB

Deactivate OP (ADE-BEA)

Miscellaneous event

NC_AN

Activate OP (ADE-BEA)

Miscellaneous event

The colors for the events listed are as follows:

Color

Meaning

Blue

Order-related events

Green

Person-related events

Red

Machine-related events

Brown

Batch-related events

Black

Locked events

Purple

If the order type option "Change after upload" is set to "Allow no changes" or "Allow
modification, no upload", then all the events already uploaded to the ERP system are
displayed in purple.

Each event-triggered dialog is apparent from the "Dialog" column. In addition to the dialogs of the same

name (e.g. A_AN, A_UN, ...) the following dialogs, among others, can be triggers for the events described

above:

BDE-BDM_81.docx

Version: 1.5.18468

Page 115 of 125

Shop Floor / Order Data Management

Dialog

Meaning

A_P_AN

Log order + person on together (A_AN + P_AN)

P_AAB

Log all staff off (1..n P_AB)

A_AUN

OP automatically interrupted as a result of a shift change

A_AAN

OP automatically logged on again as a result of a shift change

SA_AN

Log merged operation on

SA_TR

Partial confirmation with merged operation

SA_AB

Log merged operation off

SA_ABME

P_KOM

PZE Clock-in

P_GEH

PZE Clock-out

CA_WL

Output batch change

Display automatically recorded counter values

The counted values that have not yet been evaluated are recorded and posted as event M_CTR_AUTO

at  workplaces  the  automatic  quantity  collection  of  which  is  performed  using  the  Windows  terminal

software. The counted values from the counter events of M_CTR_AUTO are not displayed in the columns

for yield, scrap, etc., but rather in separate "counter" category columns.

The  primary  quantities  resulting  from  the  counted  values  (evaluated)  are  also  logged  and  displayed  as

information in the columns for yield, scrap, etc.

The  resulting  (evaluated)  quantities  are  not  logged  into  other  quantity  units.  That  is,  basic,

secondary and tertiary quantities are always 0 for the counter results.

The resulting (evaluated) quantities are logged irrespective of the reason.

Recalculation of modified data

After  modifications  have  been  completed,  recalculation  will  start  by  clicking  on  the

  icon  and  by

acknowledging the confirmation prompt. Depending on the extent of the modifications made, recalculation

may take some time.

BDE-BDM_81.docx

Version: 1.5.18468

Page 116 of 125

Shop Floor / Order Data Management

The following steps are performed during recalculation:

1.  Validity check of the modified data

Here, as with online data entry, all events involved are checked to make sure they can be fully

processed. If any events fail the validation check, then the recalculation is rejected without any

modifications being made in the system. If a validation error occurs, then an error message and a

notice referring to the event involved are displayed accordingly notifying the operator.

2.  Deleting existing results

If all the validation checks were completed successfully, then the still available, current results are

canceled first. If postings have already been uploaded to the ERP system (upload identifier “J“), then

the corresponding cancellation records are generated in the same way postings are modified

manually in posting maintenance. The quantities and durations contained in the order-related posting

are also canceled in the operation status.

3.  Calculating new results

After a successful validation check and cancellation, the modified events are reevaluated and a new

posting is generated.

 The quantities and durations calculated for order-related posting are also posted to the operation

status.

However,  keep  in  mind  here  that  any  configuration  changes  that  have  been  made  in  the

meantime  may  now  quite  possibly  make  it  impossible  to  make  any  subsequent

modifications to already entered scenarios or that this can lead to different results.

Example:  If  two  operations  were  logged  onto  a  machine  at  the  same  time,  and  in  the

meantime the option parallel OPs can be logged on was deactivated, then the recalculation

of  one  operation  will  bring  about  a  validation  violation.  Recalculation  is  now  no  longer

possible.

The user is notified accordingly once recalculation has completed successfully.

Locking concept in event maintenance

Edited data is selectively locked based on the chosen machine and the time domain entered.

All locked entries in event maintenance are displayed under System administration > Locked data records

and can only be deleted by a user who has the appropriate function authorization.

BDE-BDM_81.docx

Version: 1.5.18468

Page 117 of 125

Shop Floor / Order Data Management

Deleting a locked entry  will result in the inability to recalculate data currently  displayed on that console.

The user must discard the scenario and request data again.

The "parallel staff logins" option in event maintenance

If  multiple  machine  operation  is  taking  place,  this  option  must  be  activated  in  the  event  maintenance

selection area, because doing so will divide up time and labor data to match the order postings.

In  the  process,  all  machines  are  displayed  at  which  the  staff  displayed  was  logged  onto  during  the

evaluation period.

If, however, the nesting depth is too great, it might not be possible to recalculate the data, because the

starting events for this are no longer in the period selected.

Example:

Person 1 is logged onto workplaces 100 and 200

Person 2 is logged onto workplace 200 at a staggered overlapping time

Person 3 is logged onto workplaces 200 and 300 at a staggered overlapping time

Because  the  recalculation  of  all  events  must  be  considered  for  an  order,  and  because  of  nesting  more

and more order events must be recalculated, this may bring about a constellation in which a scenario can

no longer be recalculated.

Please note: Event maintenance is unusable when personnel postings are this deeply nested.

The "optimized parallel staff logins" option in event maintenance

When this option is selected, the following optimized processing takes place with parallel staff logins:

  Only data for the selection are displayed or requested (machine, order/OP, person)

  Machines that also have to be recalculated because of parallel staff logins are not added to the

selection until the recalculation process.

The additional machines are determined based on the modified data.



If an error occurs during recalculation, then the additional machines are subsequently also displayed,

and the user can correct the data.

Waiting period processing

Waiting period processing is an optional processing that controls how the system functions with respect to

entering personal postings. It is activated through the basic settings.

When the waiting period is exceeded, a separate waiting period posting is generated (staff postings to the

defined waiting period operation). If the waiting period is not exceeded, then the staff posting is backdated

(and the OP posting also, if required).

BDE-BDM_81.docx

Version: 1.5.18468

Page 118 of 125

Shop Floor / Order Data Management

The  posting  times  of  the  events  remain  unchanged  during  waiting  period  processing,  i.e.  the  posting

times are edited in event maintenance.

When events are recalculated, a new decision is made depending on the modified posting scenario about

whether to backdate because of the waiting period processing.

Modifications after upload

Whether modifications in event maintenance should be uploaded to the ERP system is determined based

on order type during the customizing process. The following options are available:

  Allow modification and upload

  Allow  modification,  no  upload

-  data  can  be  modified,  but  are  not  uploaded

  Do not allow modification - data can no longer be modified.

The verification is based on workplace: If an order at a workplace is not modifiable according to the order

type  configuration  (purple  font  color),  then  all  events  are  locked  that  are  older  than  the  last

confirmation/upload  date  of  this  order.  This  lock  is  order  independent  and  so  also  affects,  for  example,

orders that are modifiable.



BDE-BDM_81.docx

Version: 1.5.18468

Page 119 of 125

Shop Floor / Order Data Management

21  Foreman's Checklist

Summary

Menu

Information management  Messages  Foreman's checklist

Transaction code

fmchkl

Function authorization

fmchkl

Usage

The foreman's checklist is provided to allow the foreman to monitor operations produced in the foreman's

area:



It shows any out-of-the-ordinary data (e.g. time or quantity deviations)



It shows postings that the foreman must authorize.

The information listed on the foreman checklist is generated daily (by an application started on the server

automatically overnight) for the last seven days (default setting) and is stored in a database table  . The

application analyzes the information detected.

Integration

The data displayed here (e.g. time, quantity deviations) result from the data entry at the shop floor entry

units (e.g. terminals).

Selection criteria

The application provides the following selection criteria:

Order

Restricted to order number. There is an option to select using wildcards.

Category

Restricted to order categories.

Order type

Restricted to order types.

Workplace

Restricted  to  workplace  number;  only  postings  are  displayed  that  relate  to  the  workplace  number

entered.

BDE-BDM_81.docx

Version: 1.5.18468

Page 120 of 125

Shop Floor / Order Data Management

Responsibility area

Restricted  to  responsibility  area;  the  postings  are  displayed  that  relate  to  the  workplaces  that  are

assigned to the responsibility area entered.

Cost center

Restricted to cost center; the postings are displayed that relate to the workplaces that are assigned

to the cost center entered.

Company

Restricted to company; the postings are displayed that relate to the workplaces that are assigned to

the company entered.

Posting

The  following  information  is  logged.  By  clicking  on  the  check  box  Posting  you  can  limit  which

posting categories are displayed:

Postings with target-actual quantity deviation exceeding +/ - 5%

Finished operations, for which a yield (in primary quantity unit) is posted of more than +/ - 5% as

compared to the target quantity (in primary quantity unit).

Postings with target-actual time deviation exceeding 10%

Finished operations with an order duration (times that are posted to RPA 11) of more than 10% of

the target processing time. Here, only those operations are considered that themselves have a

target processing time that is greater than 0.

Non-authorized personnel postings

Non-authorized staff-related BDE log records (record type "B"). The log records can be authorized

using the application order-related postings.

During customizing you can define by order type whether or not these postings should be logged.

Non-authorized order postings

Non-authorized BDE log records relating to orders (record type "U", "E") for overhead cost

operations. These log records can also be authorized using the application order-related postings.

During customizing you can define by order type whether or not these postings should be logged.

Open operations of finished production orders

Any still active (prepared, running or interrupted) operations of production orders (Category "FA"),

with a final operation already showing a status "finished".

Postings showing scrap without reason

Log-offs or interruptions for operations are displayed for which the defined scarp reason is 999.

This requires that scrap reason 999 was configured and that scrap postings were made manually at

the terminal using scrap reason 999.

BDE-BDM_81.docx

Version: 1.5.18468

Page 121 of 125

Shop Floor / Order Data Management

Show completed postings

If  this  checkbox  is  not  set,  only  pending  postings  will  be  shown.  If  the  checkbox  is  enabled,

completed as well as pending postings will be shown.

In  general,  only  data  is  output  which  the  user  is  authorized  for  by  the  responsibility  area.  The

responsibility area of the machine/workplace where the order was produced is referred to if data based on

operations  is  selected.  The  user’s  responsibility  area  is  used  as  selection  criterion  if  personal  data  is

displayed.

Field descriptions

The  postings  generated  daily  are  shown  in  table  form  in  the  foreman's  checklist.  It  displays  not  only

information about  the  posting itself, but also the master data (workplace,  order,  persons) imported from

the HYDRA data pool charts.

The "posting" column of the totals line shows the number of entries.

Posting category

Posting: refer to section Selection parameters

Production date/production time: the data's origin for this value depends on the type of posting:

- Postings of finished operations with target/ actual deviation: Time of most recent log-off

- Open operations belonging to the finished production orders: Time of the most recent posting (for

running and interrupted operations)

- Non-authorized personnel/order postings: Log-off time of the log record

- Postings showing scrap without reason:  Log-off time of the log record

Operation category

Order

Operation

Article (of the operation)

Article designation

OP designation

"Miscellaneous" category

Workplace

Short name (of the workplace)

Person (personnel number)

Name (first and last name)

Last name

First name

BDE-BDM_81.docx

Version: 1.5.18468

Page 122 of 125

Shop Floor / Order Data Management

Order category

Evaluation  date  (start  of  the  evaluation  period;  the  start  of  the  evaluation  period  is  calculated  as

follows: "today" - INTERVAL. When calling up the hy_mst application on the server, INTERVAL can

be  transferred  as  a  parameter.  If  this  parameter  is  not  transferred,  7  is  assumed  as  the  default

value).

Category (order category)

Order type

Final article (article in the order header)

MRP controller

Order group

Project number

Sequence

Split

First logon (for the operation, date/time)

Last posting (for the operation, date/time)

Target  quantity:  target  quantity  of  the  operation  (primary  quantity  unit),  only  filled  out  when  the

"target/actual quantity deviation" is posted.

Actual quantity: yield of the operation (primary quantity unit), only filled out when the "target/actual

quantity deviation" is posted.

Target duration: target processing time of the operation, only filled out when the "target/actual time

deviation" is posted.

Actual duration: main utilization time posted onto the operation (RPA 11), only filled out  when the

"target/actual time deviation" is posted.

Workplace category

Designation

Group

Cost center

Company

Responsibility area

Person category

Company

Cost center

Area

BDE-BDM_81.docx

Version: 1.5.18468

Page 123 of 125

Shop Floor / Order Data Management

Department

Responsibility area

Signing category

Done

Shows whether or not the entry has already been marked "done" by a user.

Modified by

ID of the user who marked the entry as "done".

Done on

Point in time when the user marked the entry as "done".

Toolbar

Go to category

 Order information

Function authorization: orin

Order information is called up. The order number is transferred as the parameter.

 Order overview

Function authorization: orov

Order overview is called up. The order number is transferred as the parameter.

 Workplaces/ machines

Function authorization: wpov

This  calls  up  the  application  Workplaces/  machines.  The  workplace  number  is  transferred  as  the

parameter.

 Order related postings

Function authorization: oboo

This  calls  up  the  application  Order  related  postings.  The  following  values  are  transmitted  as

parameters: Workplace, order, operation, production date.

 Done

Function authorization: fmchkl.sign

Selected postings can be marked "done" by this function (multiple selections possible).

BDE-BDM_81.docx

Version: 1.5.18468

Page 124 of 125

Shop Floor / Order Data Management

Processing notes

The  information  listed  on  the  foreman  checklist  is  generated  daily  (by  an  application  hy_mst.exe/.out

started on the server automatically overnight) for the last seven days (default setting) and is stored in a

database table that is accessed by MOC.

If required, the below-mentioned call parameters can be added to the application hy_mst.exe/.out that is

integrated in the HYDRA Scheduler:

/INTERVAL=days

Increase evaluation period (default: "today“ - 7 days)

/DEL_UNSIGNED= days

Delete postings after x days (default: 999 days)

/NO_CERT

Personnel postings that have not been signed are not taken over into the foreman's checklist.

As  part  of  customizing  the  system  and  as  an  alternative  to  this  parameter,  it  can  be  defined  for

which order types

o  personnel postings

o  order postings

are to be signed and, as a result, shown in the foreman's checklist.

BDE-BDM_81.docx

Version: 1.5.18468

Page 125 of 125

