Manual

Shop Floor / Order Data
Management
BDE-BDM 8.2

Version 1.7.23570

Last changed on: 08.10.2020

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 2 of 130

Shop Floor / Order Data Management

Contents

1  Overview Shop Floor / Order Data Management ......................................... 6

2  Fields of Application BDE ............................................................................. 8

2.1  Overview ............................................................................................................. 8

2.2  Basics of shop floor data collection ..................................................................... 8

2.3  Presentation of recording results ....................................................................... 10

2.3.1  Time recording ...................................................................................... 10

2.3.2  Recording quantities .............................................................................. 11

2.3.3  Options of Machine Data Collection ....................................................... 12

3  HYDRA-BDE Input Types (relating to operations) ..................................... 15

3.1  Serial production ............................................................................................... 15

3.2  Parallel production............................................................................................. 15

3.3  Merged operations ............................................................................................ 15

3.4  Splits ................................................................................................................. 16

3.5  Multiple machine production .............................................................................. 16

3.6

"Mixed operation" .............................................................................................. 16

4  HYDRA-BDE Input Types (relating to personnel) ...................................... 17

4.1

1.1 Summary ..................................................................................................... 17

4.2  Single machine operation .................................................................................. 17

4.3  Multiple machine operation ................................................................................ 17

4.4  Group work ....................................................................................................... 18

4.5

"Mixed operation" .............................................................................................. 19

5  Data Collection in HYDRA-BDE ................................................................. 21

5.1

1.1 Summary ..................................................................................................... 21

6  Validation Check ........................................................................................ 23

6.1  Overview ........................................................................................................... 23

6.2  Validation checks regarding overdelivery or underdelivery ................................ 23

6.2.1  Overview ............................................................................................... 23

6.2.2  Operation-related activation of the overdelivery/underdelivery

check ..................................................................................................... 24

BDE-BDM_82.docx

Version: 1.7.23570

Page 3 of 130

Shop Floor / Order Data Management

6.2.3  Person-related activation of the overdelivery/underdelivery check ......... 25

6.2.4  Overdelivery/underdelivery check with automatic recording of

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

12  Order and Operation related Functions ..................................................... 48

13  Day Types .................................................................................................. 56

14  Days Off ..................................................................................................... 59

15  Year Model ................................................................................................. 60

16  Order Types ............................................................................................... 66

17  Order Status Texts ..................................................................................... 83

BDE-BDM_82.docx

Version: 1.7.23570

Page 4 of 130

Shop Floor / Order Data Management

18  Order Status Assignment ........................................................................... 85

19  Order Postings ........................................................................................... 93

20  Event Maintenance .................................................................................. 110

21  Foreman’s Checklist ................................................................................. 125

BDE-BDM_82.docx

Version: 1.7.23570

Page 5 of 130

Shop Floor / Order Data Management

1  Overview Shop Floor / Order Data Management

Purpose

The  function  package  “shop  floor  /  order  data  management”  provides  an  extensive  range  functions  for

recording times and quantities in orders / operations. In addition, it provides the ability to correct entered

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 6 of 130

Shop Floor / Order Data Management

o  Recalculation function based on changed/corrected BDE events Generating  updated log

records (postings)

o  Generating cancellation log records during processing after uploading to the ERP system

BDE-BDM_82.docx

Version: 1.7.23570

Page 7 of 130

Shop Floor / Order Data Management

2  Fields of Application BDE

2.1  Overview

The goal of the following description is to present the many collection and processing options offered by

HYDRA shop floor data collection (HYDRA-BDE) and machine data collection (HYDRA-MDE).

2.2  Basics of shop floor data collection

The postings of the HYDRA-side production data collection are based on the components machine, order

and  person.  Depending  on  the  approach  and  the  main  focus  of  the  individual  use  of  HYDRA,  different

components might play a prominent role or they might be unnecessary and therefore as far as possible

disabled.

Machine/workplace – where does production happen?

Logging  an  order  or  employee  on  or  off  is  basically  machine  or  workplacerelated.  Logging  on  to  a

machine  answers  the  question  of  where  a  BDE  posting  takes  place.  BDE  postings  can  basically  be

executed only on those machines or workplacess which have been configured accordingly in the HYDRA

master data.

The  names  machine  and  workplaces  are  synonymous  in  HYDRA.  In  HYDRA-MDE,  the  expression

"machine" is favored. In HYDRA-BDE, the name "workplaces" is favored.

Order/operation – what is produced?

All  tasks  performed  by  staff  at  machines  are  based  on  orders.  Logging  the  order  or  its  operation  on

answers the question what is done or which activity is executed.

HYDRA  differentiates  between  different  order  types  to  classify  orders  according  to  their  utilization.

Different control information that is decisive for managing the orders is defined for each order type.

HYDRA provides the following order types by default. Further order types can be created according to the

customer's requirements:

  Production order

A production order generally relates to the article/item and is characterized by a target quantity as

well as a completion date.

BDE-BDM_82.docx

Version: 1.7.23570

Page 8 of 130

Shop Floor / Order Data Management

  Overhead cost order

An overhead cost order (e.g. cleaning of the workplace) normally only refers to cost-accounting.

  Capacity order

A capacity order has only been designed for planning purposes (assignment of capacities) within

HYDRA  shop  floor  scheduling.  You  usually  change  capacity  orders  into  production  orders  at  a

later stage.

  Project order

A  project  normally  is  unique.  A  project  order  combines  the  project  steps  that  are  carried  out

during a project.

  Maintenance order

A maintenance order has been designed for the planning or recording of maintenance measures.

In  general,  orders  are  created  in  a  higher  level  system  (e.g.  ERP  system)  and  transferred  to  HYDRA

using an interface. Nevertheless, orders can also be created manually in HYDRA. Planning of orders (in

the ERP system or HYDRA) depends on precise requirements.

Orders are mostly multi-level and divided into several operations to be processed on different workplaces

and machines. The order and operation are generally logged on to the shop floor terminal at the individual

workplace.  Data  can  only  be  posted  onto  operations  at  shop  floor  terminals  if  a  corresponding  pool  of

orders exists in the HYDRA database.

The  terms  'order'  and  'operation'  are  mostly  synonymous  in  the  handbook  descriptions.  Usually,  when

posting  functions  on  the  terminal  are  being  described,  the  operation  is  meant,  and  documentation  on

HYDRA shop floor data collection also emphasizes operation data. Only in certain HYDRA descriptions is

the 'Order' used as an umbrella term for the whole multi-level production order.

Person - who is working?

The  relation  to  the  machine  and  operation  is  established  in  HYDRA  by  logging  staff  on  and  off  at  shop

floor  terminals.  The  work  confirmations  of  employees  form  a  basis  for  the  calculation  of  personal

expenses  and for performance determination. With the logon or logoff of staff,  you are informed who is

working, where the person is working and what is done.

BDE-BDM_82.docx

Version: 1.7.23570

Page 9 of 130

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

Time recording

"Posting events" on shop floor terminals form the basis for the posting of particular machine times to an

operation. A time posting is initiated by the posting event "logon" and completed logically by the posting

event "logoff" or "interruption". This basic principle applies to all order and personnel posting events.

The  time  posting  of  shop  floor  data  collection  primarily  occurs  in  two  different  time  accounts,  one  for

machine scheduling duration and the other for labor utilization.

The  machine  time  is  specified  by  the  time  interval  between  the  logon  and  logoff  of  an  operation.  The

machine scheduling time is harmonized with the shift calendar of the machine. Planned shift breaks are

not included in the time interval calculation.

Personnel  deployment  represents  the  total  of  all  labor  times  for  each  operation.  This  period  is

determined  by  the  time  interval  between  logon  and  logoff  of  the  user  or  users.  The  basis  for  personnel

postings  is,  once  again,  the  shift  model  of  the  workplaces  and  the  breaks  it  contains.  If  employees  are

processing  more  than  one  order  simultaneously,  then  the  HYDRA  system  carries  out  a  proportional

calculation of the operating time for each operation.

BDE-BDM_82.docx

Version: 1.7.23570

Page 10 of 130

Shop Floor / Order Data Management

For further details on this please refer to the section entitled "posting of times".

The results are documented in "log records" that are generated automatically due to posting events.

2.3.2  Recording quantities

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

are  computed  according  to  the  partitioning/cavity  that  is  respectively  defined  for  the  operation  and  is

posted onto the operations or persons.

BDE-BDM_82.docx

Version: 1.7.23570

Page 11 of 130

Shop Floor / Order Data Management

HYDRA  provides  different  accounts  for  quantity  posting.  The  accounts  that  are  predominantly  used  are

yield and scrap. The two fields are provided appropriately during data collection. Scrap quantities can be

classified by a scrap reason. The available scrap reasons are configured in HYDRA.

Other quantity accounts are Rework and Open quantity. These are usually only used specifically in form

of customer-specific scenarios; the fields are provided as part of the customizing process.

2.3.3  Options of Machine Data Collection

If you connect a machine to a shop floor terminal, the automatic data collection is possible.

-

-

Collection of production times and downtimes

  Direct  assignment  of  malfunction  reasons  by  collecting  operating  signals  from  machine  control

systems

-

Piece number recording for yield, total quantity and scrap

Every  workplaces  and  machine  is  assigned  a  shift  model  in  the  HYDRA  configuration.  The  shift  model

determines the capacity of the machine and gives the shift calendar a reference time for the performance

of  a  machine.  All  machines  for  which  recording  of  standstills  is  carried  out  in  HYDRA,  have  a  definite

machine status at all times during the shift. The total of all production and downtimes during a shift gives

exactly the shift standard time.

Definition of downtime reasons

The determination of the relevant machine statuses forms the basis of machine monitoring by means of

machine signals. Together  with the "production" status all data collection relevant downtime reasons for

the machine are created in HYDRA. The user may configure them individually.

Classification in HYDRA resource performance accounts (RPA)

HYDRA resource performance accounts are a system of time accounts, consisting of 12 accounts. They

group  together  similar  downtime  reasons  in  a  single  account  (e.g.  all  technical  disturbances  go  in  the

"disturbance-caused  interruptions"  (DCI)  resource  performance  account).  During  data  collection,

accumulating times are posted to the resource performance account to which the current machine status

is assigned in the system configuration.

The standard definition of the HYDRA resource performance accounts is as follows:

BDE-BDM_82.docx

Version: 1.7.23570

Page 12 of 130

Shop Floor / Order Data Management

No.  Acronym

Description

s

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

BKS

Neutral times, e.g. free, breaks etc.

If  recording  of  downtimes  is  not  required  or  if  the  recording  of  downtime  reasons  gives  no  clear  result

(e.g. for HYDRA group workplaces), then time recording generally takes place with Production status and

is represented in the MUT main utilization time performance account.

The HYDRA resource performance accounts are also kept relating to operations and persons. Machine

scheduling times (machine duration) for operations and personnel result from the following calculation:

Scheduling time = total (RPA 1 .. RPA 11).

Automatic recording of number of pieces using machine signal connection

Recording a cyclical signal from the machine enables the recognition of downtimes, and by counting the

recorded cycles it is also possible to record the number of pieces produced.

To  ensure  an  accurate  determination  of  the  number  of  pieces,  HYDRA  supports  the  multiplication  of

recorded  cycles  with  multiple  accesses  per  cycle.  "Partitioning"  (also  called  cavity)  is  a  tool  specific

parameter, which is transferred to the terminal when an operation is logged on.

BDE-BDM_82.docx

Version: 1.7.23570

Page 13 of 130

Shop Floor / Order Data Management

Automatically recorded data are posted as machine performance in HYDRA and simultaneously assigned

to the operation and personnel currently logged on.

Collection

operation-related

Personal

actual quantities

machine times

Labor utilization

X

X

X

X

X

X

BDE-BDM_82.docx

Version: 1.7.23570

Page 14 of 130

Shop Floor / Order Data Management

3  HYDRA-BDE Input Types (relating to operations)

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

“representative” operation, which is logged on for all individual operations included. The entered data is

divided according to different configurable perspectives.

BDE-BDM_82.docx

Version: 1.7.23570

Page 15 of 130

Shop Floor / Order Data Management

3.4  Splits

If an operation should  be  processed on several machines in parallel, the HYDRA shop floor scheduling

module allows for the operation to be split into several "splits". These splits are handled by HYDRA like

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 16 of 130

Shop Floor / Order Data Management

4  HYDRA-BDE Input Types (relating to personnel)

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 17 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 18 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 19 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 20 of 130

Shop Floor / Order Data Management

5  Data Collection in HYDRA-BDE

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 21 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 22 of 130

Shop Floor / Order Data Management

6  Validation Check

6.1  Overview

The validation check of a dialog verifies whether the system can completely  process all resulting events

(in  the  current  status).  If  the  dialog  cannot  be  processed,  i.e.  not  all  events  have  been  checked

successfully, the dialog is rejected without making changes to the system.

The validation checks evaluate dialog data, the generated events and the HYDRA data set and interpret

the posting status. Some (partly optional) configurations are also integrated.

Examples of validation checks for dialog data:

 if an OP is logged on, the logged on OP must exist in the HYDRA data set,

 if an OP is logged on, the machine where the OP is logged on must exist in the HYDRA data set,

 if staff is logged on, the logged on person must exist in the HYDRA data set,

 when postings are performed for group workplaces, the postings must include the persons.

Examples of validation checks for the posting status:

 if a part quantity is uploaded for an OP, the OP must be logged on to the machine where the posting is

performed,

 if staff is logged off, the logged off person must have been logged on to the machine where the posting

is performed.

Examples of validation checks for configurations:

 if an OP is logged on, the person who performs the logon must be authorized to log on the OP,

 if a part quantity is uploaded for an OP, the overdelivery quantity may not be exceeded.

Some validation checks are explained in more detail in the sections that follow:

6.2  Validation checks regarding overdelivery or underdelivery

6.2.1  Overview

If part quantities are uploaded for an operation or if an operation is interrupted or logged off, a validation

check  can  be  performed  for  the  quantities  posted.  It  is  checked  if  there  is  an  overdelivery.  When  an

operation is logged off, you can also check if there is an underdelivery.

BDE-BDM_82.docx

Version: 1.7.23570

Page 23 of 130

Shop Floor / Order Data Management

By default, quantity checks in HYDRA are designed for the manual input of quantities. The quantity check

is performed if a posting dialog includes a quantity <> 0. The quantity check is also always performed if a

quantity <> 0 is posted. In case of an overdelivery, the check is also performed if the quantity has already

been confirmed and a deviation reason has been entered.

The  overdelivery/underdelivery  check,  also  referred  to  as  target  quantity  check,  can  be  activated  for

operations or for persons.

6.2.2  Operation-related activation of the

overdelivery/underdelivery check

You  can  activate  a  validation  check  for  overdelivery  or  underdelivery  for  the  operation.  The  following

values/settings are relevant:

Underdelivery

Value in percent. The posted quantity can deviate from the target quantity by the percentage specified.

Example:

Target quantity of the operation: 120 items

Underdelivery: 84%

The actual quantity must not fall below 101 items.

Overdelivery

Value  in percent. The posted quantity can deviate from the target  quantity  by the percentage specified.

Example:

Target quantity of the operation: 120 items

Overdelivery: 168%

The actual quantity must not exceed 201 items.

Reaction

If  the  limits  specified  in  the  fields  overdelivery  or  underdelivery  are  exceeded,  a  warning  or  an  error

message can be issued. Possible values are:

"blank"   no reaction

W

X

 warning

 error

If a warning is activated ("W"), you can confirm a quantity deviation on the Windows terminal by entering

a deviation reason. If an error is activated ("X"), a quantity deviation is rejected.

BDE-BDM_82.docx

Version: 1.7.23570

Page 24 of 130

Shop Floor / Order Data Management

Notes

By default, the operation-related validation check is performed for the actual yield quantity recorded

(primary quantity unit). You can also configure the processing code and activate a validation check

for  scrap,  rework  or  problem  quantities.  A  validation  check  for  alternative  quantity  units  (e.g.

secondary quantity, etc.) is not provided in the standard.

In general: DOS terminals generally reject all quantity deviations with an error, even if the option is

set to "W".

The functionality, which is available for Windows terminals, does not exist on the MOC.

If you use the SAP interface "PP-PDC", limit values for overdelivery/underdelivery are transferred as

absolute values. HYDRA converts these values to percentage values in the interface.

6.2.3  Person-related activation of the

overdelivery/underdelivery check

In addition or as an alternative, you can also activate a person-related overdelivery/underdelivery check.

For  this  purpose,  the  HR  master  provides  the  "target  quantity  check"  option  in  the  "BDE"  tab.  Possible

values:

1) No check.

2)  Order  logoff: When  an  operation  is  logged  off,  the  system  checks  if  the  current  yield  is  between  the

specified minimum and maximum target quantity. Both quantities are also specified in the HR master for a

person.

3) Underdelivery/overdelivery: All quantity postings are checked for overdelivery, when orders are logged

off/partially  uploaded  and  interrupted.  When  an  operation  is  logged  off,  it  is  also  checked  for

underdelivery.

You can confirm the validation check on the Windows terminal, if you enter a deviation reason.

Notes

The person-related validation checks are only performed for yield (primary quantity unit).

BDE-BDM_82.docx

Version: 1.7.23570

Page 25 of 130

Shop Floor / Order Data Management

The limit values for overdelivery and underdelivery do not affect the person-related settings and are

checked  separately,  if  activated.  If  both  validation  checks  are  active,  then  first  the  person-related

target quantity check is performed, then the operation-related check.

6.2.4  Overdelivery/underdelivery check with automatic

recording of quantities

In  HYDRA  standard,  the  target  quantity  check  is  designed  for  the  manual  entry  of  quantities.  It  is  only

performed  if  a  quantity  <>  0  is  entered  in  the  posting  dialog.  The  paragraphs  below  describe  different

scenarios  where  the  validation  check  is  performed  in  connection  with  the  automatic  recording  of

quantities.

Scenario 1

If a quantity posting is performed for an operation in the active "production" status (interruption, logoff or

partial  confirmation/upload),  the  quantities  that  have  been  recorded  automatically  since  the  last  posting

(e.g.  status  change,  operation  posting,  personnel  posting)  and  the  quantities  that  might  have  been

recorded  manually  are  sent  to  the  server  to  be  booked.  A  validation  check  is  performed,  because  the

command (DLG=...) sent to the server includes a quantity. It does not matter if the operator has manually

entered  a  quantity  <>  0.  The  validation  check  is  now  performed  for  the  quantity  automatically  recorded

(AGR:GUT=...) and for the manually entered quantity (EGR:GUT=...=).

BDE-BDM_82.docx

Version: 1.7.23570

Page 26 of 130

Shop Floor / Order Data Management

Scenario 2

If  a  machine  switches  from  the  production  status  to  “malfunction”,  the  quantities  recorded  so  far

(AGR:GUT=...) are sent to the server with the status change (DLG=M_MST|...) to be booked. As  this is

an automatic posting (status change), a validation check is not performed.

If  a  posting  is  later  on  performed  for  the  operation,  a  validation  check  is  only  performed  if  the  operator

manually  enters  a  quantity  <>  0.  This  quantity  is  sent  to  the  server  with  the  posting  (e.g.

DLG=A_UN|EGR:GUT=...).

If the worker, for example, does not enter a quantity when the operation is interrupted (quantity = 0), no

validation check is performed, because no quantity is sent to the server (DLG=A_UN|...).

As no automatic quantities have been recorded since the last status change, this posting does not include

any automatic quantities, which could be checked.

BDE-BDM_82.docx

Version: 1.7.23570

Page 27 of 130

ProductionAutomatically entered quantitiesMachine statusIncl. manual quantityInterruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsUnderdelivery/overdelivery checkingyesnoWorker has not entered a manual quantity. The automatically recorded quantity is only transferred.e.g. DLG=A_TR|AGR:GUT=7|….The quantity manually recorded by the worker is transferred along with the automatically collected quantitye.g. DLG=A_TR|AGR:GUT=6| EGR:GUT=4|….*Underdelivery is only checked if operations are logged off

Shop Floor / Order Data Management

Scenario 3

Automatic  quantities  can  still  be  recorded,  even  if  the  machine  is  in  the  malfunction  status  and  the

production lock is set.

In  this  case,  this  automatic  quantity  is  sent  to  the  server  along  with  the  manual  quantity  entry  (e.g.

DLG=A_UN|AGR:GUT=...) and is checked for validity.

The validation check is performed as described in scenario 1. It does not matter if the operator has made

manual quantity entries or not.

BDE-BDM_82.docx

Version: 1.7.23570

Page 28 of 130

ProductionMalfunction XAutomatically collected quantitiesMachine statusIncl. manual quantityChecking of underdelivery/ overdeliveryJaThe worker has not entered a quantity manually. (The automatically recorded quantity has already been posted along with changing the status)e.g. DLG=A_UN|….The manual quantity entered by the worker is transferrede.g. DLG=A_UN|EGR:GUT=4|….Overdelivery is not checked*  Machine status change(M_MST)Automtically collected quantities are automatically posted when machine statuses change. e.g. DLG=M_MST|AGR:GUT=6|…..Interruption (A_UN), Logoff (A_AB) or Partial upload (A_TR) of operationsNo

Shop Floor / Order Data Management

BDE-BDM_82.docx

Version: 1.7.23570

Page 29 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 30 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 31 of 130

Shop Floor / Order Data Management

In addition, the automatic collection of counters allows for quantities to be posted onto active operations.

T  records  are  generated  for  these  quantities  as  well.  HYDRA  accumulates  the  quantities  from  the

automatic collection over a period of time and generates the corresponding T record(s),  but only if the

scenario changes. This may be, for example, an order or person that is logged on manually, a manual,

partial upload/confirmation or a manual or automatic machine status change.

The single partial uploads/confirmations also represent the collection of quantities with different  reasons

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 32 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 33 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 34 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 35 of 130

Shop Floor / Order Data Management

Operation splits

When it comes to split operations, the log record is ONLY generated for the split operation. A log record is

not generated for the split master itself. The status of the split master is only updated.

Merged operations

Log  records  are  generated  for  merged  operations  as  well  as  for  individual  operations.  The  statuses  of

individual operations are also updated accordingly. While posting, the recorded quantities and times of a

merged  operation  are  distributed  to  the  corresponding  individual  operations  according  to  different

configurations. The log records of individual operations only include proportionate quantities and times.

BDE-BDM_82.docx

Version: 1.7.23570

Page 36 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 37 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 38 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 39 of 130

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

When it comes to project time recording, the times to be posted are  recorded manually instead of being

calculated by the system.

Post production time to main utilization time (MUT) during break

Cross-system configuration in the basic parameter settings of HYDRA.

RPA to calculate labor times

Cross-system configuration in the basic parameter settings of HYDRA.

Proportionate RPA posting in personnel postings

Cross-system configuration in the basic parameter settings of HYDRA.

BDE-BDM_82.docx

Version: 1.7.23570

Page 40 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 41 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 42 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 43 of 130

Shop Floor / Order Data Management

Split operations

Further information on how to post split operations or their split master can be found here.

BDE-BDM_82.docx

Version: 1.7.23570

Page 44 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 45 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 46 of 130

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 47 of 130

Shop Floor / Order Data Management

12  Order and Operation related Functions

Purpose

You can use the functions described below to perform activities for orders or operations.

Integration

You  can  call  the  functions  from  several  applications.  The  relevant  applications  are  listed  below  in  the

descriptions of the different functions.

Requirements

The orders/operations must be created in the system. The function descriptions include the requirements

to use the separate functions.

Change order status

Function authorization

or.statchg

Change order status

The  status  of  a  complete  order  can  be  changed  using  this  function.  The  function  is  integrated  in  the

following application:

  Order overview  Tab Order  Category Change order status

Processing using BDE 8.1 and BDE 8.2 including Service Pack 14 (only applies when using HYDRA):

When you call this function, the dialog described below is called for each order selected.

Processing using BDE 8.1 and BDE 8.2 including Service Pack 15 (only applies when using HYDRA):

If exactly one order is selected, the dialog Change order status described below is opened when you call

this function. The dialog provides the following fields

Order

Order number

Current status

Current status of the order

Action

The current status controls the available actions:

Current status

Not free

Possible new statuses

- Release order (default)

BDE-BDM_82.docx

Version: 1.7.23570

Page 48 of 130

Shop Floor / Order Data Management

Current status

(specific status that is only available as part of
a customization)

Possible new statuses

- Set order to "in process"
- Terminate order

Prepared

Started

- Set order to "in process" (default)
- Terminate order

- Terminate order

With the other statuses, you cannot select any action.

If several orders are selected, the processing is as follows:











If all orders selected have the same order type and the control indicator "S" (other status), then the
orders are set to the status with control indicator "V" (prepared).
If  all  orders  selected  have  the  same  order  type  and  the  control  indicator  "V"  (prepared),  then  the
orders are set to the status with control indicator "L" (in process).
If  all  orders  selected  have  the  same  order  type  and  the  control  indicator  "L"  (in  process),  then  the
orders are set to the status with control indicator "E" (finished).
If the orders selected have a status with a control indicator that is not "S", "V" or "L", then the button is
disabled.
If the orders selected have different statuses, then the button is disabled.

You can only set the order status to finished if no operation is currently logged on. If the order status is

set to "finished", the status is also set to "finished" for all operations of the order.

If the order is finished using this function, the system only generates a log record (record type

E) for the operations of this order if the option Generation of log record terminate OP (client) is

set in the basic settings. To generate the log record, the workplace is used that is stored for the

operation  (it  does  not  matter  if  the  operation  is  planned  for  the  workplace  or  not).  If  no

workplace is stored, the workplace with the lowest number of the group is identified.

Update order

Function authorization

or.actualize

Update order

Use  the  function  Update  order  to  update  one  or  several  selected  orders.  The  action  "update  order"  is

directly  performed.  No  window  opens  to  confirm  the  action.  Via  the  update  function,  not  only  data  is

requested, but the recalculation of values (formulas) is also started.

After the update, the order data is refreshed, so that also the data display is updated.

The following applications provide this function:

  Order overview  Tab Order  Category Execute

  Order information  Tab Main Page  Category Execute

BDE-BDM_82.docx

Version: 1.7.23570

Page 49 of 130

Shop Floor / Order Data Management

  Edit operations  Tab Other functions  Category Change status

Schedule order

Function authorization

or.terminate

Schedule order

Use the function Schedule order to schedule one or several selected orders. The action "schedule order"

is directly performed. No window opens to confirm the action.

You can also call the scheduling for one or several selected operations. In this case, the orders of these

operations are scheduled.

After the update, the order data is refreshed, so that also the data display is updated.

The following applications provide this function:

  Order overview  Tab Order  Category Execute

  Order information  Tab Main Page  Category Execute

Change operation status

Function authorization

op.statchg

Change operation status

Use  this  function  to  change  the  status  of  an  operation.  Whether  you  can/may  change  the  status  of  an

operation depends on its current (previous) status.

You  cannot  change  operations  with  status  Running  using  the  function  Change  status.  You  can  only

change  these  OPs  using  Interrupt  OP  or  Log  OP  off.  You  can  only  set  an  interrupted  operation  to

Running using the function Log OP on.

The following only applies when using HYDRA and HYDRA BDE:

Processing with BDE 8.1 or BDE 8.2 including Service Pack 14

When  you  call  this  function,  the  dialog  Change  operation  status  described  below  is  called  for  each

operation selected.

Processing with BDE 8.2 as of Service Pack 15:

If  exactly  one  operation  is  selected,  the  dialog  Change  operation  status  is  opened  when  you  call  this

function. The dialog provides the following fields

BDE-BDM_82.docx

Version: 1.7.23570

Page 50 of 130

Shop Floor / Order Data Management

Order / Sequence / OP / Split

Operation number

Current status

Current status of operation

Action

The current status controls the available actions:

Current status

Not free
(specific status that is only available as part of a
customization)

Possible new statuses

- Release (default)
- Terminate

Prepared

Interrupted

- Terminate

- Terminate

With the other statuses, you cannot select any action.

If several operations are selected, the processing is as follows:









If all operations selected have the same order type and the control indicator "S" (other status), then
the operations are set to the status with control indicator "V" (prepared).
If  all  operations  selected  have  the  same  order  type  and  the  control  indicator  "V"  (prepared)  or  "U"
(interrupted), then the operations are set to the status with control indicator "E" (finished).
If  the  operations  selected  have  a  status  with  a  control  indicator  that  is  not  "S",  "V"  or  "U",  then  the
button is disabled.
If the operations selected have different statuses, then the button is disabled.

Depending on the option Generation of log record terminate OP in the basic system settings, the system

not only sets the operation to status "E", but also generates an end posting (log record of record type "E")

that  can  be  uploaded  to  the  higher-level  ERP  system  when  you  finish  an  operation.  When  an  order  is

finished, all operations are finished.

To generate the log record, the workplace is used that is stored for the operation (it does not matter if the

operation  is  planned  for  the  workplace  or  not).  If  no  workplace  is  stored,  the  workplace  with  the  lowest

number of the group is identified.

You  can  also  use  this  function  to  finish  overhead  cost  operations  that  cannot  be  finished  using  the

"normal" posting dialogs A_AB on the terminal and the console.

You  can  change  the  status  of  a  waiting  period  operation  via  Change  status.  The  status  change  is  not

important because during a waiting period operation no activity is performed. The status change is used

to  inform  the  user.  The  posting  functions  in  the  dialog  boxes  are  not  relevant  for  waiting  period

operations. Also error messages are not relevant that you might receive with logon or logoff.

BDE-BDM_82.docx

Version: 1.7.23570

Page 51 of 130

Shop Floor / Order Data Management

Change secondary status

Function authorization

op.secstatchg

Change secondary status

Use the button Change secondary status to change the secondary status of an operation. You can only

call  the  function  if  the  current  status  of  the  operation  is  configured  with  the  option  "Editable  secondary

status" (customization).

The function is integrated in the following application:

  Order overview  Tab Operation  Category Change status

The following only applies when using HYDRA and HYDRA BDE:

Processing with BDE 8.1 or BDE 8.2 including Service Pack 14

When you call this function, the dialog Secondary status is called for each operation selected where the

new secondary status can be set.

Processing with BDE 8.2 as of Service Pack 15:

If exactly one operation is selected, the processing is as follows:

  The dialog Secondary status is called. The dialog displays the order, operation and split number for

the selected operation and the text of the previous secondary status.

  Use the combo box to select a new secondary status.

  Confirm  to set the new secondary status for the selected operation.

If several operations of the same order type are selected, the processing is as follows:

  The  dialog  Secondary  status  is  called.  The  dialog  only  provides  the  combo  box  to  set  a  new

secondary status.

  Use the combo box to select a new secondary status.

  Confirm  to set the new secondary status for all selected operations.

You can manually enter the new secondary status or select the status from a selection list of secondary

statuses. Note: The field is a mandatory field. You cannot delete the current status. If you want to "reset"

the set secondary status, a respective secondary status must be provided.

Change resource status

Function authorization

op.resstatchg

Change resource status

BDE-BDM_82.docx

Version: 1.7.23570

Page 52 of 130

Use  the  function  Change  resource  status  to  change  the  resource  status  of  an  operation.  The  following

applications provide this function:

Shop Floor / Order Data Management

  Order overview  Tab Operation  Category Change status

  List of Material Requirements

The following only applies when using HYDRA and HYDRA BDE:

Processing with BDE 8.1 or BDE 8.2 including Service Pack 14

When  you  call  this  function,  the  dialog  Change  resource  status  is  called  for  each  operation  selected

where the new resource statuses can be set.

All three resource statuses are always set at the same time.

Processing with BDE 8.2 as of Service Pack 15:

If exactly one operation is selected, the processing is as follows:

  The  dialog  Change  resource  status  is  called.  The  dialog  displays  the  order,  operation  and  split

number of the selected operation and the preceding resource statuses.

  Enter new values in the input fields Person OK, Tool OK or Material OK.

  Confirm  to set the new resource status for the selected operation.

All three resource statuses are always set at the same time.

If several operations of the same order type are selected, the processing is as follows:

  The dialog Change resource status is called. The dialog only provides the fields Person OK, Tool OK

and Material OK.

  Enter new values in the input fields Person OK, Tool OK or Material OK.

  Confirm  to set the new resource status for all selected operations.

All three resource statuses are always set at the same time.

Lock operation

Function authorization

op.lock

Block operation

BDE-BDM_82.docx

Version: 1.7.23570

Page 53 of 130

Shop Floor / Order Data Management

Use the function Block to lock one or several selected operations. You cannot make BDE postings for a

locked  operation  and  the  locked  operation  is  not  shown  in  the  sequencing  list  on  the  terminal  (applies

only when using HYDRA).

An operation lock does not affect the planning in the shop floor scheduling.

The following applications provide this function:

  Order overview  Tab Operation  Category Lock

  Edit operations  Tab Other functions  Category Lock

The action is directly performed. No window opens to confirm the action.  If at least one operation of the

selected  operations  is  already  locked,  the  lock  is  also  performed.  No  error  message  is  shown  for  the

operation already locked. An error message is only shown if an operation cannot be locked that has not

been locked before.

Unlock operation

Function authorization

op.unlock

Unlock operation

Use the function Unlock to unlock one or several selected operations. The operation can again be logged

on and is again displayed in the sequencing list.

The following applications provide this function:

  Order overview  Tab Operation  Category Lock

  Edit operations  Tab Other functions  Category Lock

The action is directly performed. No window opens to confirm the action. If at least one operation of the

selected  operations  is  not  locked,  the  unlock  is  also  performed.  No  error  message  is  shown  for  the

operation not locked.

An error message is only shown if an operation cannot be unlocked that has been locked.

Note:  Operations  that  have  been  split  (the  so-called  split  master)  are  also  locked.  You  cannot  use  this

function to unlock these operations!

Reactivate operation

Function authorization

op.reactivate

Reactivate operation

BDE-BDM_82.docx

Version: 1.7.23570

Page 54 of 130

Shop Floor / Order Data Management

Use the function Reactivate to reactivate finished operations in the system. The function is integrated in

the following application:

  Order overview

The following only applies when using HYDRA and HYDRA BDE:

Processing with BDE 8.1 or BDE 8.2 including Service Pack 14:

You can only call the function for exactly one operation. If several operations are selected, the function is

not active. You can only call this function for finished operations.

When the user calls the function, the user must confirm the reactivation in a dialog. Confirm to reacitvate

the finished operation: the operation changes to the status with control indicator interrupted. You can now

log on the operation again.

Processing with BDE 8.2 as of Service Pack 15:

If exactly one finished operation is selected, the processing is as described above.

If  several  finished  operations  are  selected,  the  selected  operations  are  reactivated.  No  dialog  is

displayed.

BDE-BDM_82.docx

Version: 1.7.23570

Page 55 of 130

Shop Floor / Order Data Management

13  Day Types

Overview

HYDRA menu

Master data  Production control  Day types

FEDRA menu

Detailed scheduling  Master data   Day types

Transaction code

dtmf

Function authorization  mddtmf

Day  types  are  defined  to  specify  the  shift  schedule  for  every  workday.  In  a  day  type,  you  specify  the

planned working times and break times for up to four shifts a day.

Purpose

You should consider the following issues prior to the definition and configuration:

You only need one day model for days with identical shifts.

Several (different) day models are required, if the hours worked vary (e.g. "early Friday“).

Machines with the same shifts but different breaks require different day models.

Machines  having  the  same  shifts,  but  a  different  number  of  shifts  (2-shift  operation,  3-shift

operation) require different day models.

Only  the  last  shift  of  a  day  model  may  include  a  day  changeover/midnight  (e.g.  10:00  p.m.  –

6:00 a.m.)!

If  a  day  type  is  changed,  this  change  directly  affects  all  machines  where  this  day  model  is

assigned  in  the  year  model.  Therefore,  we  advise  against  changing  day  models  that  are

currently being used (i.e. changes affecting that specific day).

If, contrary to expectations, modifications are required these modifications may exclusively refer

to subsequent shifts (not to the current shift). Furthermore, these modifications must be carried

out at least 2 hours before the change of shifts. Reason: Different system components read the

BDE-BDM_82.docx

Version: 1.7.23570

Page 56 of 130

shift models in cyclic intervals and compare them with the locally saved shifts.

Shop Floor / Order Data Management

Requirements

The days off must be specified beforehand.

Selection criteria

Day type ... until ...

Restricted to the Day Type Number.

Name

Name of the day type

Field descriptions

day type

Unique identification of the day type

Name

Name of the day type

Shift time

Indication of start times and end times of the respective shift

Please note: For technical reasons a shift must not start or end at 0:00.

Type

At the moment this field is not relevant for processing.

Breaks

Indication of breaks (times of beginning and end) within the current shift.

If  breaks  are  determined  the  times  accrued  in  these  periods  of  time  are  “cut  out”  of  RPA  time

accounts.

Number of labor capacities

Production:

 This setting is only relevant in connection with the planning of group workplaces

in  the  graphic  planning  board.  The  group  workload  in  the  shop  floor  scheduling  module  is

calculated according to the defined shift calendar and the production capacities planned. Capacity

1 is accepted if no labor capacity is defined.

Setup:

This setting is currently not taken into account.

BDE-BDM_82.docx

Version: 1.7.23570

Page 57 of 130

Shop Floor / Order Data Management

Autom.  status  change  to  status  999  (only  relevant  for  HYDRA-MDE  configuration  and  only  if

HYDRA is applied)

This indicator can be used to automatically assign a machine status at the end of certain shifts (e.g.

Friday evening) and in turn to cancel this status at the start of another shift (e.g. Monday morning).

No activation:  Shift automatic will not be activated.

Activate after end of shift:

The  status  999  is  automatically  assigned  to  the  machine  at  the

end of the shift. If no status change occurs in the next shift, the status 999 remains set for the entire

shift. Note: If the "Production" status is applied at the end of a shift, it remains set in the next shift.

In this case, status 999 is not assigned.

Deactivate at beginning of shift:

At  the  beginning  of  a  shift  the  terminal  automatically

switches  either  to  the  status  "not  assigned“  or  to  the  status  that  was  present  before  having

activated status 999 – depending on whether the extended weekend automatic option is activated

within the MDE configuration of the machine configuration. The possible status 999 will be finished.

The  status  999,  which  indicates  e.g.  weekend,  should  be  assigned  to  the  resource  performance

account “free breaks” to prevent it from falsifying MDE evaluations.

BDE-BDM_82.docx

Version: 1.7.23570

Page 58 of 130

Shop Floor / Order Data Management

14  Days Off

Overview

HYDRA menu

Master data  Production control  Days off

FEDRA menu

Detailed scheduling  Master data  Days off

Transaction code

wfmf

Function authorization  mdwfmf

Entries of dates for all days off of the corresponding year are written in the list of the days off. The list of

the days off is used for the distinction between working days and free days when assigning day types to a

year model. You use the list "Days off" to specify working days and days off when you assign day types in

a year model.

Purpose

Once you have created the list of days off, it is available for all year models. Thus, the list has once to be

created at the beginning of the year and then all year models of the respective year may access the list.

You  must  first  create  the  list  of  days  off  before  you  create  the  year  models.  If  entries  are  changed

retroactively  in  the  days  off  list  these  changes  will  only  affect  year  models  that  are  created  after  this

modification. Year models that have already been established remain unchanged and, if necessary, the

user has to adjust them manually.

Selection criteria

The application provides the following selection criteria:

Date from/to

Date restrictions

Field descriptions

Date

Date of the non-working day

Description

Description of the non-working day

Year

Year for which the day off was defined

BDE-BDM_82.docx

Version: 1.7.23570

Page 59 of 130

Shop Floor / Order Data Management

15  Year Model

Overview

HYDRA menu

Master data  Production control  Year model

FEDRA menu

Detailed scheduling  Master data  Year model

Transaction code

ymmf

Function authorization  mdymmf

The year models are used as shift calendar of workplaces and machines.

Deactivating the calendar grid

Function authorization

ymmf_nocal

The display of the calendar grid in the application  Year model provides a clear overview of the different

day types used.

If  a  great  number  of  year  models  is  used,  the  calendar  grid  display  can  considerably  slow  down  the

display of the year models. In this case, assign the function authorization ymmf_nocal to the users. They

can then deactivate the calendar grid display.

Purpose

You  require  a  year  model  to  assign  a  shift  calendar  to  a  machine/workplace.  In  the  year  model,  a  day

type  is  assigned  to  each  working  day.  The  previously  defined  non-working  days  can  be  ignored  (no

shifts). Exactly one year model can be assigned to each machine.

Note the following



If a day type is changed, this modification directly affects all machines assigned to this day type

within the year model.

  Only change the year model for future days/periods. We strongly advise against changing the

year model for the current day.

In the year model, a day type is specified for each day. The calculation of times in the system is based on

this day type.

Requirements

Create the following master data before creating a year model:

BDE-BDM_82.docx

Version: 1.7.23570

Page 60 of 130

Shop Floor / Order Data Management

  The days off must be specified.

  The day types must be specified.

Selection criteria

The application provides the following selection criteria:

Year from to

Narrows down the year models to the selected years.

Field descriptions

Year model, designation

This field shows the year model that is currently edited and its designation.

Factory calendar

You  can  set  the  identifier  Factory  calendar  for  one  year  model  only  (maximum).  The  factory

calendar  is  used  for  the  planning/Scheduling.  If  you  use  the  shop  floor  scheduling,  you  must

therefore define a valid factory calendar for every year.

The year model, which is specified as factory calendar, does not affect the data collection.

Graphic display

The graphic display of the year model shows for every day of the year the relevant day type, which

is assigned to this day. The background coloring is as follows:

Monday - Friday

 gray

Saturday, Sunday

orange

Days off

red

Current day ("today")

dark red

The assigned day type is displayed for each day (number of day type). If a day does not have an

entry, then no day type is  assigned to  this  day.  These days are treated by the  system as without

shifts.

Assignment

At the bottom, the dialog provides functions to assign day types to the days of the year model. You

can use the Weekdays or a specified Rhythm to assign day types.

The  section  below  describes  how  to  assign  day  types  to  the  days  of  a  year  model:  See

Specification of a year model.

Specification of a year model

Proceed as follows to specify a new year model:

BDE-BDM_82.docx

Version: 1.7.23570

Page 61 of 130

Select the editing function  Insert. The editing dialog opens. Select tab Weekdays or Rhythm and assign

Shop Floor / Order Data Management

day types to the year model.

Weekdays

Date from ... to ...

A day type is assigned to the period of time specified here.

If  you select  Weekdays, the graphic display  of the  year model automatically selects all  weekdays

(Monday to Friday), which are included in the specified period.

You  can  also  select  by  single  weekdays.  The  graphic  display  of  the  year  model  then  selects  the

days specified via selection for the period of time specified above.

If you select Weekend, the system automatically selects all Saturdays and Sundays of the period of

time specified above.

You  can  also  select  either  Saturday  or  Sunday  only.  The  graphic  display  of  the  year  model  then

selects the days specified via selection for the period of time specified above.

Include public holidays

If  this  option  is  enabled,  all  public  holidays  (defined  as  days  off)  are  included  in  the  selection  of

time.

Example:

The user selected Weekdays and Include public holidays. When the user then specifies a day type

for the selected days, all public holidays on a weekday (Monday to Friday) are also assigned this

day type.

Exclude public holidays

If  this  option  is  enabled,  all  public  holidays  (defined  as  days  off)  are  excluded  from  the  period  of

time specified.

Example:

Weekdays and Exclude public holidays are selected. When the user then specifies a day type for

the selected days, all public holidays on a weekday (Monday to Friday) are not assigned this day

type.

BDE-BDM_82.docx

Version: 1.7.23570

Page 62 of 130

Public holidays only

If  this  option  is  enabled,  only  public  holidays  (defined  as  days  off)  are  selected  in  the  specified

Shop Floor / Order Data Management

period of time.

Example:

Weekdays and Only public holidays are selected. When the user then specifies a day type for the

selected  days,  only  the  public  holidays  on  a  weekday  (Monday  to  Friday)  are  assigned  this  day

type. All other public holidays, which are at a weekend, and all normal weekdays are not assigned

any day type.

day type

Enter the day type in this field that you want to assign to the days previously selected.

Click this button to assign the entered day type to the selected days. The selected day type is then

displayed in the year model for the days selected before.

Click this button to delete a day type assignment.

Note

There  is  another  method  to  select  days  or  a  period  of  time  without  using  the  selection  fields.  Directly

select  the  first  day  in  the  graphic  year  model,  press  the  left  mouse  button  and  keep  it  pressed  while

dragging  the  mouse  pointer  to  the  last  day.  Here,  release  the  mouse  button.  All  days  between  the  first

and the last day specified are then selected (all days in chronological order).

You can add further days to this selection, if you click specific days while holding down the Ctrl key.

Rhythm

Use  this  tab  to  define  a  rhythm  that  you  want  to  assign  to  the  year  model  in  a  specified  period  of  time

(from - to or the days selected in the graphic display).

Step by step, define the rhythm and specify the day type and the number of days (for example: day type 4

for 1 day, day type 1 for 3 days, day type 2 for 1 day, day type 0 (no day type) for 2 days).

Apply the defined rhythm to the year model.

Rhythm duration

After the specified number of days, the rhythm used to transfer the day type to  the  year model is

repeated.

BDE-BDM_82.docx

Version: 1.7.23570

Page 63 of 130

Shop Floor / Order Data Management

Date from - to

The defined rhythm is assigned in the period of time specified here.

Duration

The day type is transferred to the year model for the specified number of consecutive days.

day type

Enter the day type in this field that you want to assign.

Click this button to assign the previously defined rhythm to the selected days.

From <date from>, the <day type>  is applied for the  number of days specified in <duration>. The

day type is applied from the first <duration> day and is repeated after <rhythm duration> days.

The  <day  type>  is  then  displayed  in  the  graphic  display  of  the  year  model  for  the  days  selected

before.

Then,  the  <date  from>  is  moved  by  the  days  specified  in  <duration>.  From  the  new  <date  from>

onwards, you can then configure a new rhythm.

How to proceed in case of changes of shift calendars - Recommendations

It  can  be  necessary  to  make  changes  of  day  types  and/or  year  models  for  operational  reasons.

Examples:

  Reorganization of shifts (e.g. from 2-shift operation to 3-shift operation)

  Change of shift times

In general, if the day types and year models are configured or used improperly, this can lead to unwanted

results – similar to all system configurations.

Therefore,  we  strongly  advise  against  changing  day  types  that  are  currently  being  used  (i.e.

changes affecting the current day).

In this case, we recommend to proceed as follows:



In general, do not make changes on the very day when the changes become active.

  Call the application Day types.

  Create  a  new  day  type  or  change  an  existing  day  type,  but  not  the  active  day  type  (i.e.  the

assigned  day  type).  (We  urgently  advise  against  changing  existing  day  types  that  are  already

assigned to one or several year models.)

  Call the application Year model and open the year model where you want to make changes.

BDE-BDM_82.docx

Version: 1.7.23570

Page 64 of 130

  Assign the  new  day type. (Important:  You must select a date  in the future as the day  when the

day type first applies).

Shop Floor / Order Data Management

BDE-BDM_82.docx

Version: 1.7.23570

Page 65 of 130

Shop Floor / Order Data Management

16  Order Types

Overview

HYDRA menu

Master data  Order  Order types

FEDRA menu

Detailed scheduling  Master data  Order types

Transaction code

ot

Function authorization  mdot

Purpose

You use this function to create or modify order types in the system.

Integration

You  use  order  types  to  classify  orders  according  to  their  use.  For  each  order  type,  different  control

information  is  stored,  which  is  important  for  the  order  management.  You  configure  the  possible  order

types  in  the  system  that  control  the  system  behavior.  Set  the  order  type  in  the  order  header  and  also

store this information with the operations (for information purposes).

Assign a category to each order type. A category combines similar order types.

We strongly recommend to copy order types only within one category.

Selection criteria

The selection panel provides the following selection criteria:

Category

See field description

Active

This is a tri-state checkbox which enables you to select either only active order types, inactive order

types or both.

BDE-BDM_82.docx

Version: 1.7.23570

Page 66 of 130

Shop Floor / Order Data Management

Field descriptions

General tab

Order type

Defines  the  order  type.  The  parameters  of  this  configuration  specify,  among  other  things,  system

behavior.

Name

Name of the order type.

Active

If  this  checkbox  is  set,  the  order  type  is  available  and  you  can  use  it.  The  system  verifies  if  this

checkbox is set when you attempt to create or modify an order.

Category

The  category  is  used  to  classify  and  to  combine  similar  order  types.  The  category  is  a  logical

umbrella term. Possible values:

PO

Production order

Standard production orders, which are created for example with an interface in

the system, are assigned to the category production order.

PJ

Project order

Projects are characterized by their uniqueness. A project order combines the

project steps that are carried out during a project.

PM

Maintenance order

You use maintenance orders to plan and/or record maintenance activities.

KP

Capacity order

Use  orders  of  this  order  type/category  for  capacity  reservations  in  the  shop

floor scheduling.

GK

Overhead cost order

Use overhead cost orders to collect overheads.

Category icon

You  can  assign  an  icon  or  symbol  to  the  order  type.  Various  functions/evaluations/reports  (e.g.

order overview) display this icon.

The  icon  size  must  not  exceed  16x16  pixels.  The  file  must  be  in  BMP

format (16 colors).

Dialog control

Here,  you  can  store  a  dialog  control  that  deviates  from  how  the  system  behaves  by  default.  This

dialog control can be referenced in the dynamic dialog. You can then show or hide input fields on

the terminal as required.

BDE-BDM_82.docx

Version: 1.7.23570

Page 67 of 130

Shop Floor / Order Data Management

Note

You  can  also  store  this  setting  for  the  workplace  (machine/workplace

configuration).  When  a  terminal  dialog  is  opened,  the  dialog  control  for

both  order  type  and  workplace  are  integrated.  For  this  reason,  we

recommend that dialog control be defined  either for the order type  or for

the workplace.

Authorization for the editing of inventory data

Reserved; currently not used.

Authorization for the editing of collected data

Reserved; currently not used.

Planning tab

Planning

This setting specifies  whether and/or how orders of this type are relevant for detailed scheduling.

The following settings are available:

N

T

No planning

Scheduling only

The order is scheduled. This means that the lead time is calculated using the

process  times  and  then  the  dates  are  set  accordingly.  The  (lead  time)

scheduling does not integrate competitive situations.

F

Scheduling and detailed planning

The  order  is  relevant  for  detailed  planning:  scheduling  processes  and

automatic and/or interactive planning processes integrate this order.

Note:  The  automatic  planning  process  plans  operations  for  workplaces.  This

process

integrates

the  workplace's  capacity  and  assignment  status.

Consequently, it might be the case that you cannot plan the OP on the planned

date (resulting from lead time scheduling).

Note

Whether  or  which  operations  are  in  fact  integrated  during  scheduling  or

detailed planning also depends on the configuration of the same name in

the processing code or the order-related status configuration.

Planned dates

Specifies how planned dates behave during (re)scheduling:

O

Planned dates are not overwritten (by default).

BDE-BDM_82.docx

Version: 1.7.23570

Page 68 of 130

Shop Floor / Order Data Management

T

Planned dates are overwritten by scheduling.

Setup time in shop floor planning

Subject  to  the  settings  configured  for  the  order  type,  you  can  choose  from  the  below-mentioned

options  to  present  the  static  setup  time  of  interrupted  operations  in  the  graphic  planning  board

(interactive planning):

„  „

R

B

Target setup time

Remaining setup time: Target setup time – RPA07 (posted setup times)

In  case  the  operation  has  already  been  started  (i.e.  it  is  now  interrupted),  a

setup time of 0 is assumed.

Running operations do not take into account the setup time.

These settings  only apply for interactive planning.

User field for requirements calculation formula

This  field  is  only  relevant  in  connection  with  the  license  for  multiple  assignments.  Further

information can be found in the relevant documentation.

Scheduling without implicit order release

This setting prevents order release (setting the status using the control indicator "V") during the first

scheduling run.

Consideration of production variants when transferring OP

This processing is only active if the license for production variants is available.

E

The  system  identifies  whether  a  valid  production  variant  exists  at  the  time  the

OP  is  transferred/created  and  the  following  data  is  transferred  from  the

production variant:

-  Target cycle if the target cycle transferred via interface is 0.

-  Partitioning if the partitioning transferred via interface is 0.

-  Tool if included in the production variant.

If the system cannot identify a valid production variant, then the operation is not

created.

This  functionality  is  only  available  if  the  following  conditions  are

fulfilled:

Interface consulting services are required in advance.


  A customization must have been ordered.
  Production resources and tools are not transferred to the system

For information, also refer to the document

BDE-BDM_82.docx

Version: 1.7.23570

Page 69 of 130

Shop Floor / Order Data Management

Considering_of_production_variants_when_transferring_OPs.pdf.

P

The  system  verifies  if  the  transferred  data  matches  a  valid  production  variant

(validation check) at the time an OP is transferred/ created.

If the system cannot identify a valid production variant, then the operation is not

created.

N

No identification/ validation check

Considering production variants in planning

This processing is only active if the license for production variants is available.

E

P

The  system  identifies  if  a  valid  production  variant  is  available  in  graphic

planning  at  the  time  an  operation  is  planned.  The  default  values  of  the

production variant selected are used.

The system checks if a valid production variant is available in the system when

the  operation  is  scheduled  (validation  check).  You  cannot  select  a  production

variant and the default values of the production variant are not transferred.

G

Group-specific  verification.  During  scheduling,  the  system  checks  like  with

option "P" if a valid production variant is available in the system for the OP that

is scheduled (validation check). And it is checked if the group stored for the OP

is identical to  the group  of the  production variant. This check ensures that  an

OP  can  only  be  scheduled  in  the  originally  specified  group  also  in  case  a

production variant is used.

N

Not used.

This  processing  can  be  controlled  in  more  detail  on  the  level  of  capacity  groups.  For  further

information refer to the relevant documentation dealing with the configuration of Groups .

Processing tab

Sequencing list

This  setting  specifies  whether  the  sequencing  list  at  the  terminal  shows  operations  of  orders  with

this order type.

The following settings are available:

F

N

The list shows fixed operations. You can set the fixed indicator manually in the

shop floor scheduling.

No; the sequencing list on the terminal generally does not show orders of this

order type. This makes sense, for example, with overhead cost operations.

BDE-BDM_82.docx

Version: 1.7.23570

Page 70 of 130

Shop Floor / Order Data Management

Notes

With  all  options  except  option  “N”,  the  “sequencing  list”  configurations  of

the  same  name  defined  in  the  processing  code  and/or  the  order-related

status configuration are always used additionally.

In general, the sequencing list does not show blocked OPs.

Recordable

This option specifies whether operations of orders with this order type can be recorded, i.e. posted.

Y

Yes, operations can be recorded.

Whether an operation can really be recorded also depends on the setting with

the same name in the processing code.

N

No;  Operations  may  not  be  recorded.  If  you  attempt  to  log  on  any  such

operation is rejected with a validation error.

Combined logon of order

You can use this option for "overhead cost operations".

Y

T

This  order  type  links  the  operation  with  the  person.  The  posting  behavior  is

identical to that of a group workplace (GWP).

No overhead cost processing.

Log on OP with start of shift

This option specifies the logon behavior of operations when a shift starts.

Y

N

X

Logs on operation automatically when the shift starts.

Does not log on the operation when the shift starts.

Processing  depends  on  the  relevant  setting  in  the  workplace/  machine

configuration

Note

This  processing  is  only  relevant  for  "MDE  workplaces".  An  MDE

workplace must meet the following conditions:

- The workplace must be assigned to a terminal.

- The terminal must be configured in MDE operation mode.

(only applies if HYDRA is in use)

May OPs of the order be terminated?

This  option  defines  whether  OPs  of  this  order  type  may  be  finished.  The  following  settings  are

available:

BDE-BDM_82.docx

Version: 1.7.23570

Page 71 of 130

Shop Floor / Order Data Management

Y

S

N

Yes, you may finish the OPs.

Checks  the  status  of  the  preceding  OP.  In  this  case,  the  status  of  the

preceding OP must be assigned the option "successor can be logged off".

No, operator shall not finish the OP. A validation check is run when you attempt

to log off an OP.

Note

It can be useful to configure overhead cost orders so that they cannot be

logged off via the dialog Log OP off, since their operations should exist as

cost collectors over a longer period of time. In this case, you can set this

option to "N" to prevent the OP from being logged off.

Log person off when shift ends

Use  this  option  to  configure  the  personnel-related  data  collection  at  MDE  workplaces.  Since

HYDRA MDE generates fully automatic shift terminations via the terminals, you can set whether the

persons  logged  on  at  the  workplace  are  to  be  logged  off  automatically  at  the  end  of  the  shift  or

remain logged on (only applies when using HYDRA).

Y

N

X

Always log off staff when the shift ends.

Always save staff when the shift ends except for manual logoff.

Processing  depends  on  the  relevant  setting  in  the  workplace/  machine

configuration

Notes

This processing is only relevant for "MDE workplaces" (see above).

Set this option to "N" if the combined logon of order (see above) is active.

(only applies if HYDRA is used)

Serial number obligation

This  option  defines  whether  an  order  requires  a  serial  number,  and  if  so,  how  the  serial  number

should be entered.

N

No serial numbers required.

+ (plus)  Serial  numbers  required,  "positive"  entry,  i.e.  the  yield  is  entered  with  serial

numbers.

- (minus)  Serial  numbers required, "negative" entry,  i.e. the scrap or problem quantities

are entered with serial numbers.

BDE-BDM_82.docx

Version: 1.7.23570

Page 72 of 130

Shop Floor / Order Data Management

Note

The option "Serial number obligation" specifies at the processing code  or

the  operation  directly  as  of  which  operation  you  have  to  enter  the  serial

number.

Assignment of serial numbers

This  option  is  only  relevant  if  the  option  "Serial  number  obligation"  is  not  set  to  "N".  The  option

defines how serial numbers are allocated.

P

H

The PPS system transfers the serial numbers.

The  system  generates  serial  numbers  according  to  the  number  range

configuration.

Note

The  option  "H"  is  provided  for  future  upgrades/modifications.  Currently,

the system only supports the option "P".

Order is not logged off automatically

Processing can take place subject to the termination of the order (header). You can use this option

to prevent the order from being set to finished when the last recordable operation was finished.

N

Y

Finishing  all  recordable  OPs  automatically  terminates  the  order  (setting  the

order status to the control indicator "E").

Does not log off order automatically, i.e. finishing all recordable OPs does  not

automatically terminate the order.

Notes

Currently,

the

status  of

the  order

(header)  only  affects:

- the deletion of order data or

- the transfer of order data into long-term tables.

You  must  set  this  option  for  the  GKP  and  GKM  order  types  (order  types

for  waiting  period  orders).  Reason:  waiting  period  operations  cannot  be

recorded. If you changed the status of a waiting period operation or if you

deleted a waiting period operation, the system would set the order status

to  the  control  indicator  "E".  Conversely,  this  means  you  have  to  set  a

waiting period order (header) explicitly to finished (MOC function "Change

status").

Milestone processing only for the last operation

Activates milestone processing.

BDE-BDM_82.docx

Version: 1.7.23570

Page 73 of 130

Shop Floor / Order Data Management

Show OP info when logging on

Defines whether or not a notification or additional information is shown when logging the OP on to a

Windows terminal (CTWIN, AIP). (only applies if HYDRA is in use)

Parallel order posting

This option specifies if linked operations are logged on, interrupted or logged off when you log on,

interrupt or log off an operation.

Linked operations must have the following properties:

  You must specify the link type: H = main OP; N = sub-OP

Please note: You cannot set this field via the MOC.

  You must maintain the number of the main operation:

o  Sub-OP: MES order number of the main OP

o  Main OP: MES order number of the main OP (references itself).

You can find the field "main operation" in the operation tab "CBM".

The  linked  operations  are  logged  on  to  the  same  workplace  where  the  first  operation

has been logged on. For this reason, the option "Logon of several OPs" must not be set

to "N" in the Workplace and resource configuration.

The  function  does  not  support  operations  that  require  batch  management,  inspection

operations or operations with assigned resources.

The terms "main OP" and "mother OP" are used as synonyms.

Plausibility tab

Check specifications in backlog of orders

This option activates the following validation check when logging on operations:

Y

You can only log on the OP to the planned workplace.

If  you  check  this  option,  then  during  logon  the  system  checks  the  workplace

number  entered  at  the  terminal  and  compares  it  to  the  workplace  number

defined  in  the  system  order  backlog.  You  can  only  log  on  the  OP  to  the

planned  workplace.  If  you  want  to  produce  an  operation  at  a  different

workplace (e.g. in the event of a machine breakdown), you have to replan this

operation in graphic shop floor scheduling or in order sequencing.

G

You can only log on an operation to the planned group, i.e. you can log on the

operation either to

- the planned workplace,

- a workplace belonging to the group or to

- a workplace planned for the group (still in pool of groups).

BDE-BDM_82.docx

Version: 1.7.23570

Page 74 of 130

Shop Floor / Order Data Management

K

OP  logon  only  permitted  either  on  a  planned  workplace  or  on  a  workplace  of

the same category. Please note: This check requires that a category is defined

for both workplaces (field "category" must not be empty), i.e. for the workplace

where  you  planned to  log  on the operation  AND for the  workplace  where  you

actually logged on the operation.

S

Group control: This option differentiates between the following initial situations:

Situation 1:

You have planned the operation for a workplace. You can log on this operation

either to the planned workplace or to a workplace of the same category.

Situation 2:

You  have  planned  the  operation  for  a  group.  Consequently,  the  operation  is

still  in  the  pool  for  the  group  (pool  of  groups).  You  can  only  log  on  this

operation to a workplace that has the same category as the first available (not

locked) workplace of the planned group.

N

No validation check

Check status of preceding OP

This option activates a check that specifies whether or when the current operation may be logged

on.

Minimum send-ahead quantity of preceding OP

This option defines whether a validation check for the minimum send-ahead quantity should be run

when logging on the operation.

M

Check  the  minimum  send-ahead  quantity  when  logging  on  operations.  In  this

case,  a  minimum  send-ahead  quantity  (yield)  must  have  been  posted  to  the

preceding  operation  so  that  the  succeeding  operation  can  be  logged  on.  The

minimum send-ahead quantity is defined in the preceding operation.

N

No check is run.

You have to enable the relevant configuration in the order type  in order to verify

the  minimum  send-ahead  quantity  when  logging  on  OPs.  Configure  the

processing  code  accordingly  to  plan  overlapping  operations  based  on  the

minimum send-ahead quantity (or the lead time). You can enable this function in

the processing code while customizing the system.

When  the  system  checks  the  minimum  send-ahead  quantity,  only  the  yield

quantity (primary quantity unit) collected so far is used.

Quantities  are  not  converted.  For  this  reason,  make  sure  that  adjacent

BDE-BDM_82.docx

Version: 1.7.23570

Page 75 of 130

Shop Floor / Order Data Management

operations have the same primary quantity unit.

Example:

Operation 0100

Target quantity 1000  Send-ahead quantity 50

Operation 0200

Target quantity 1000

If checking is enabled, operation 0200 can only be logged on as soon as a

yield (in primary quantity unit) of at least 50 has been uploaded/confirmed

for operation 0100.

The system does not check the operation status of the preceding operation. You

cannot log on the current operation, in case the preceding operation has already

been finished, but the send-ahead quantity has not yet been reached.

Only OPs of the same order type can be logged on simultaneously

If this option is set, you can only log on operations in parallel that are assigned to the same order

type.

The system will run this check if this option is set at least for one operation, i.e. the operation to be

logged on or the operations that have already been logged on.

Check if shop floor papers are printed

If you set this option, you enable a validation check when logging on operations verifying the print

status of time tickets. Under proper conditions, this function can help prevent erroneous postings or

rather "guide" production.

Y

N

You can only log on an OP if its shop floor papers have been printed.

No validation check

Note

A corresponding identifier at the operation indicates the print status. It can

be set when printing the time tickets (additional license).

Check against M/O relation when person logs in

You  can  define  the  maximum  number  of  employees  needed  to  produce  this  operation  (M/O

relation, production) in the system's operation data.

The system verifies the following when staff logs in:

Y

Machine/ operator relation. When a person logs on to an operation, a check is

run  to  determine  if  the  maximum  number  of  employees  has  already  been

reached. If this is the case, the system rejects the login.

N

No check.

BDE-BDM_82.docx

Version: 1.7.23570

Page 76 of 130

Shop Floor / Order Data Management

K

Planned; currently not used.

Note:

The check is not performed for group workplaces.

If  the  M/O  ratio  defined  for  the  operation  is  not  an  integer,  the  value  is

rounded up to the next whole number.

Checking also includes advance logons of staff.

Quantity check of send-ahead quantity

G

If  this  identifier  is  set,  then  the  system  runs  a  check  for  manual  quantity

postings  at  the  terminal  to  determine  whether  the  sum  total  of  the  previously

entered  yield  and  the  currently  entered  yield  is  greater  than  the  already

produced  yield  of  the  preceding  OP.  If  this  is  the  case,  the  system  does  not

allow the posting with the entered yield quantity.

S

If  this  identifier  is  set,  then  the  system  runs  a  check  for  manual  quantity

postings  at  the  terminal  to  determine  whether  the  sum  total  of  the  previously

entered total quantity (yield + scrap + rework + open quantity) and the currently

entered  quantity  (yield  +  scrap  +  rework  +  open  quantity)  is  greater  than  the

already produced yield of the preceding OP. If this is the case, the system does

not allow the posting with the entered quantity.

N

No check.

Note

This requires that the current operation and the preceding operation each

have the same primary quantity unit.

Quality tab

CAQ area

This field is currently not used.

Generate CAQ inspection steps

This field is currently not used.

Confirmation tab

Upload order postings

Upload

This  identifier  specifies  whether  entered  data  (postings)  of  orders  pertaining  to  this  type  must  be

uploaded to the ERP system or not.

BDE-BDM_82.docx

Version: 1.7.23570

Page 77 of 130

Shop Floor / Order Data Management

Y

N

OP logins

Uploads  postings.  Use  the  following  options  to  define  which  postings  are

uploaded/confirmed and/or how they are uploaded.

Does not upload postings. In this case, the following options are irrelevant.

If you set this option, operation logins (record type "A" postings) are uploaded to the ERP system.

The same structure is maintained during an upload as for postings, but in this case the quantity and

duration fields are set to 0.

Postings  of  type  "A"  records  are  generated  for  each  operation  login,  including  those  automatic

logins at the time of automatic shift change processes.

Please note: If the PP-PDC/KK3/KK4 interface uploads the postings to SAP, the OP logins are

assigned the SAP record type L10.

As of program version myerprck.exe/out V8.1.1.103,  you can use SAP-compliant record types

to upload operation logins to SAP. You can find details in the following documents:

  HYDRA setup configurations for PP-PDC
  HYDRA setup configurations for KK3
  HYDRA setup configurations for KK4

Postings of part quantities (partial confirmations)

If  this  identifier  is  set,  part  quantities  (record  type  "T"  postings)  are  uploaded/confirmed  to  the

ERP/PPS  system.  In  this  case,  the  posting  generates  U/E  records  that  do  not  contain  any

quantities. Only the T-records still contain quantities.

As far as the  ERP/PPS system is concerned, uploads based on T-records are represented at the

upload  interface  in  the  same  manner  as  record  type  "U"  posting  records.  However,  they  only

contain  quantities,  no  durations.  Durations  continue  to  be  uploaded  from  the  postings  of  record

types "U" and/or "E".

If the identifier is not set, the U/E records generated by the posting process are, in addition to the

durations,  also  given  the  accumulated  quantities  of  all  T  records  generated  between  logon  and

interruption/ logoff.

Upload of scrap including reason

Unlike  with  the  "partial  confirmations",  the  "Upload  of  scrap  including  reasons"  only  uploads  the

scrap  including  scrap  reason.  The  record  type  U  and/or  E  postings  confirm  the  yield,  rework

quantity and problem quantity.

Use  this  option  to  upload/confirm  the  recorded  scrap  quantities  and  scrap  reasons  based  on  the

recorded  T  records  to  the  ERP  system.  The  system  only  uploads  yield,  once  the  operation  has

been interrupted and logged off.

BDE-BDM_82.docx

Version: 1.7.23570

Page 78 of 130

Shop Floor / Order Data Management

Please note: If both options are set, the "Partial confirmations" option has the higher priority.

Approved order postings only

If  this  option  is  set,  order  postings  are  not  uploaded  until  they  are  approved.  After  5  days  at  the

latest  (standard  setting,  can  be  changed  via  the  parameter  /ABZEICH=  in  the  program

myerprck.exe/.out).), non-authorized postings are also confirmed/uploaded.

Upload company of actual workplace

If  you  set  this  option,  the  system  uploads/confirms  the  company  that  is  defined  in  the  machine

master record of the actual workplace, instead of the company that is defined for the workplace in

the orders/operations table (auftrags_bestand).

Order postings instead of batch postings

For MPL machines, batch  postings are  uploaded  by  default (record type  "H" postings). Instead  of

batch postings, this option allows you to upload order postings (record type "U"/"E" postings).

Upload type

Reserved

Change after upload

This option specifies how the changes/corrections are processed that are made to postings, which

have  been  uploaded  to  the  ERP/PPS  system.  This  option  is  evaluated  when  you  use  the  editing

functions for postings and for events.

Y

E

N

Changes/  corrections  to  already  uploaded  postings  are  allowed;  changes  are

also uploaded to the PPS system.

Changes/  corrections  to  already  uploaded  postings  are  allowed;  however,

these corrections are not uploaded to the PPS system.

No more changes/ corrections are allowed to already uploaded postings

Note:

If you edit a posting, the system evaluates this option with direct reference

to the relevant operation. But if you edit an event, the system uses the last

operation with "N" or "E" and locks all previous events irrespective of the

order type.

Do not set this option if you use the SAP PP-PDC interface because this

interface  does  not  support  cancellations/corrections.  Please  contact

MPDV  to  discuss  options  available  to  nonetheless  upload  corrections  to

SAP.

Cancellation message job end first

Currently not used.

BDE-BDM_82.docx

Version: 1.7.23570

Page 79 of 130

Shop Floor / Order Data Management

Upload of waiting period postings

If  this  option  is  set,  then  postings  identified  as  "waiting  period"  (ade_protokoll.karenz  =  'P'  or  'M')

are uploaded to the PPS system.

If  you  only  want  approved  waiting  period  postings  to  be  uploaded,  then  you  must  set  the  option

"Upload approved order postings only" or "Upload approved personnel postings only".

Upload of batch logon postings

Please note: This option is released for uploads via the HYDRA HY72PPS interface only. You must

not use this option with the interfaces PP-PDC, KK3, KK4 or HY71PPS!

This option uploads batch logons  via the HY72PPS upload interface. The upload record does not

contain quantities/ durations and the logon/ logoff times correspond to the posting time.

Please  note:  In  HYDRA  standard  processing,  order  logons  and  batch

logons are uploaded first, i.e. if an order is logged on twice and interrupted

once  between  two  posting  intervals,  then  the  two  logons  are  uploaded

before the interruption.

Personnel postings

Personnel postings

If  this  option  is  set,  then  record  type  "B"  postings  (personnel  postings)  are  uploaded  to  the  PPS

system.

  Note:

This  option  may  not  be  set  for  customers  who  use  the  SAP  PP-PDC

interface.

Upload personnel postings only.

Upload personnel postings only.

  Note:

If this option is set, then record type "B" and "E" postings are uploaded to

the PPS system.

Approved personnel postings only

If  this  option  is  set,  record  type  "B"  postings  (personnel  postings  and  personnel  waiting  period

postings, if configured for uploading) are not uploaded until after approval. After 5 days at the latest

(standard  setting,  can  be  changed  via

the  parameter

/ABZEICH=

in

the  program

myerprck.exe/.out).), non-authorized postings are also confirmed/uploaded.

BDE-BDM_82.docx

Version: 1.7.23570

Page 80 of 130

Shop Floor / Order Data Management

Confirmation of planning changes in shop floor scheduling

Upload PPS operations only

Upload PPS operations only

  If you activate this option, the operations created in HYDRA are not uploaded.

Upload delayed operations only

Upload delayed operations only

  If you activate this option, only delayed operations are uploaded.

Upload operations with deviating assignment only

Upload operations with deviating assignment only

  If  you  activate  this  option,  only  operations  are  uploaded  that  have  been  planned  for  another

workplace than the workplace initially transferred.

You can use the option Upload PPS operations only no matter whether the other options are enabled or

not.  But  you  can  only  enable  one  of  the  two  options  Upload  delayed  operations  only  and  Upload

operations with deviating assignment only.

Quality tab

CAQ area

This field is reserved for future functions.

Generate CAQ inspection orders

This field is reserved for future functions.

Options tab

Priority control

Y

The priority management integrates orders of this order type (see configuration

Order group). This means that if you create a new order or manually change an

order  in  HYDRA,  the  system  runs  a  check  to  identify  whether  the  assigned

priority  is  allowed.  If  the  maximum  number  has  been  exceeded,  the  action  is

rejected.

The system only runs the priority check when changing orders/operations if you

actually changed the priority.

If the order is transferred from the ERP interface and the maximum number is

exceeded, the order is not be refused as a result of this validation check. In this

case, however, the priority is automatically set to 1.

BDE-BDM_82.docx

Version: 1.7.23570

Page 81 of 130

Shop Floor / Order Data Management

Notes

This check is only performed if the option Priorities is set to 'U'.

The  check  only  uses  the  orders  where  the  option  Priority  check  is

enabled for the order status in the Configuration of the order status.

Priority management does not integrate orders of this order type.

The  priority  is  controlled  via  the  order.  This  means  that  a  priority  set  for  the

order (header) is applied to all operations of the order.

The priority is controlled via the operation. This means that a change of priority

for  the  order  (header)  does  not  change  the  priority  of  the  operations  of  this

Priorities

N

U

G

order.

Order postings need to be signed off

This  option  specifies

that  order  postings

for  operations  with

this  order

type  must  be

signed/approved  (see  also  the  manual  of  escalation  "ANR.UNCERTIFIED_BOOKINGS“).  If  the

postings are not signed/approved, the foreman's checklist includes the corresponding log records.

This option does not affect uploads via interface.

Personnel postings need to be signed

This  option  specifies  that  personnel  postings  for  operations  with  this  order  type  must  be

signed/approved  (also  see  manual  of  escalation  "ANR.UNCERTIFIED_BOOKINGS“).  If  the

postings are not signed/approved, the foreman's checklist includes the corresponding log records.

This option does not affect uploads via interface.

Order type for composition

The  composition  takes  into  account  charging  orders.  Charging  orders  are  assigned  to  melting

orders. In this case, the planned order number field of the charging order includes the order number

of the melting order.

“C“ = Charging order,

“M“ = Melting order

Tab User fields

The system can be customized to enable user fields for the object type "AUART".

BDE-BDM_82.docx

Version: 1.7.23570

Page 82 of 130

Shop Floor / Order Data Management

17  Order Status Texts

Overview

HYDRA menu

Master data  Order Order status texts

FEDRA menu

Detailed Scheduling  Master data  Order status texts

Transaction code

  osst

Function authorization  mdostt

You can use the application Order status texts to configure the description of the relevant order status.

Purpose

In the status text dialog,  you assign  a descriptive text to all possible order statuses. These descriptions

are  then  used  in  the  order  status  assignment  performed  later.  The  objective  is  to  use  standard  status

texts for all order types.

Procedure

Create the status texts that you would like to use for status assignment later.

Assign a unique status text number and an informative text.

Then, categorize each of the status texts to an order or operation status.

Integration

The  texts  defined  here  are  displayed  on  the  client  based  on  the  order  status  assignment  performed  in

various evaluations/reports.

Selection criteria

The application provides the following selection criteria:

Status text designation

Search for a status text by status text designation. You can also run a search using wildcards.

Field description

Field descriptions status text

Status text identification

Designation

Status text

BDE-BDM_82.docx

Version: 1.7.23570

Page 83 of 130

Shop Floor / Order Data Management

BDE-BDM_82.docx

Version: 1.7.23570

Page 84 of 130

Shop Floor / Order Data Management

18  Order Status Assignment

Overview

HYDRA menu

Master data  Order  Order status assignment

FEDRA menu

Detailed Scheduling  Master data  Order status assignment

Transaction code

ost

Function authorization  mdost

Purpose

You can use the Order status assignment to configure the order statuses for the different order types. The

order status provides the current status of the order.

Integration

Because order data are recorded in the system based on the operation, the system manages one status

for each individual operation. The status indicates whether the operation has not yet begun, for example,

or whether it has begun, was interrupted or has already been finished.

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

The order status texts and order types must be created first.

BDE-BDM_82.docx

Version: 1.7.23570

Page 85 of 130

Shop Floor / Order Data Management

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

Status tab

Status text no.  (A, G, S)

Reference to the order status text table

BDE-BDM_82.docx

Version: 1.7.23570

Page 86 of 130

Shop Floor / Order Data Management

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

Color of the relevant status (text). At this time, this color is only used in the shop floor scheduling.

Entry tab

Control

Status type A (order status)

V

L

E

S

Prepared

Release (for automatic release)

Running

At least one OP was started

Finished

All OPs are finished or deleted.

None

All others

  Status type G (OP status)

V

Prepared

BDE-BDM_82.docx

Version: 1.7.23570

Page 87 of 130

Shop Floor / Order Data Management

"Release indicator" for status; before OP is edited for the first time

L

U

F

E

S

Running

Is set automatically once OP is logged on

Interrupted

Is set automatically once OP is interrupted

Autom. interrupted

Is set by the server if you want the OP to be interrupted automatically at the

time of a shift change (when using HYDRA and the MDE function on the

terminal)

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

Please  note:  if  an  OP  or  an  order  has  been  set  with  the  flag  "locked",  then  the  OP  may  not  be

displayed under any circumstances (irrespective of this setting).

Successor can be logged on

If the indicator "Check of preceding OP" ("Plausibilities" index tab) is set to “S" = status at the order

type, then this indicator is used to check whether the subsequent OP can be logged on.

The indicator relates to the preceding OP!

BDE-BDM_82.docx

Version: 1.7.23570

Page 88 of 130

Shop Floor / Order Data Management

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

The  release  is  only  processed  if  the  operation  status  has  changed  after  an  operation

posting (logon, interruption, logoff).

If this indicator is set, then setting the status will result in the status of the subsequent OP(s) being

set to the release status, i.e. set to the status assigned with the control indicator "V".

This only happens if the subsequent OP(s) has (have) not yet been run, was (were) interrupted or

has (have) been finished.

Thus, this option only makes sense if new operations are not created/ transferred using the status

with the control indicator "V".

Planning tab

Planning

N

T

F

No planning (no transfer to the planning component)

Scheduling only

Scheduling and detailed planning (dispatching) - also includes the simulation

BDE-BDM_82.docx

Version: 1.7.23570

Page 89 of 130

Shop Floor / Order Data Management

Please note:

The  indicator  "N"  at  the  order  overrides  the  indicator  at  the  operations.  Conversely,  the

indicators at the operations override the indicator "J" (y – yes) at the order

Posting tab

Posting order duration

Posting

M

Posting to the RPA of the workplace status

A posting to the RPA of the operation is made using the RPA of the status

currently active at the workplace (default).

Posting RPA

Reserved; currently not used

Options tab

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

Priority check

Checking the priority in the priority management (order group)

If the priority control is activated in the configuration of the Order types, then the system performs a

check using the priority management (Order group) when an order is created or changed.

The check includes all orders with the status where this option is enabled.

BDE-BDM_82.docx

Version: 1.7.23570

Page 90 of 130

Shop Floor / Order Data Management

Note: The priority is ony checked if actually the priority was changed.

Alterable order data

If this status is set, the order or the OP may either be altered by the PPS system or manually or it

may no longer be altered.

J = console and MLE interface (PPS=J) alterable

N = console and MLE interface not alterable

K = Only console alterable (not via the MLE interface)

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

Order is set to status with control indicator "D" and is deleted/  archived using

the archiving/ deletion program (data management) after the set period. How

the  operations  are  treated  is  described  via  the  indicator  RESET  ACTION

(LOESCHAKTION) at the status of each OP.

X

If the action was triggered by the MLE interface:

Order is set to the status with the control indicator "E".

WARNING: Only the order header, i.e. for the OPs the indicator must also be

BDE-BDM_82.docx

Version: 1.7.23570

Page 91 of 130

Shop Floor / Order Data Management

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

BDE-BDM_82.docx

Version: 1.7.23570

Page 92 of 130

Shop Floor / Order Data Management

19  Order Postings

Overview

Menu

Data collection  Corrections  Order-related postings

Transaction code

oboo

Function authorization

oboo

Available user fields

Where?

Object type/user field key

Source (type)

Table and detail view

ADEPRO/SYSTEM

BDE log record (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The application  Order-related postings is  a  very  useful tool for any foreman, team leader, supervisor or

other responsible person who wants to check/edit postings that have been recorded during production.

Integration

The order-related postings integrate all data that has been collected during production. The postings and

results from production are listed here in great detail and can be reviewed and edited.

The list in the application shows all postings that are included in the selection made in the selection panel.

The system only displays the postings of workplaces/machines (record types unequal "B") and of persons

(record type "B") that are included in the user's responsibility area.

In case of staff postings (record type "B"), the system only checks the current responsibility area

of  the  person  and  not  the  responsibility  area  that  was  valid  at  the  point  in  time  of  the  posting

(the different versions of the HR master data are disregarded).

Requirements

Postings  (logon,  interruption,  posting  of  part  quantities/partial  confirmation,  logoff) must  be  collected  for

each operation.

The  HYDRA  basic  setting  Maintenance  on  the  basis  of  events  specifies  which  editing  functions  are

available to modify postings.

If  this  option  is  not  set,  all  postings  may  be  edited  using  the  editing  function  for  postings,  i.e.  postings

recorded manually and postings generated automatically by HYDRA due to the recorded events.

BDE-BDM_82.docx

Version: 1.7.23570

Page 93 of 130

Shop Floor / Order Data Management

If this option is enabled, postings generated automatically in HYDRA (due to events) cannot be corrected

nor  deleted  using  the  editing  function  for  postings.  Such  postings  can  only  be  edited  using  the  function

Event  maintenance.  Using  the  editing  function  for  postings,  you  can  only  correct  or  delete  manually

recorded postings.

Automatically generated postings and manually recorded postings

In  HYDRA,  there  are  automatically  generated  postings  and  manually  recorded  postings.  Automatically

generated  postings  are  postings  generated  automatically  by  HYDRA  based  on  the  recorded  posting

events. In contrast to this, manually recorded postings are postings that are recorded manually using the

editing function. They do not relate to events.

HYDRA  does  not  generate  or  correct  subsequent  events  for  manually  created  or  edited

postings.

If you change/generate/delete a BDE posting (shop floor data collection), this does not have an

impact on MDE  postings (machine data collection)!

If  you  change/generate/delete  a  posting,  this  does  not  result  in  a  recalculation  of  the  actual

cycle that relates to an operation.

Selection criteria

The application provides the following selection criteria:

Order

All postings for this order are shown when the order number is entered.

Operation

This selection criterion refers to the operation number. All postings are shown that are posted to the

operation number that was entered.

Workplace

This selection criterion specifies the workplace number where the posting was made. All postings

are displayed that were generated as a result of the events at this machine/this workplace.

Cost center

If you select a cost center, all postings are shown that were posted at the workplaces/machines of

this cost center in the specified period of time.

Record type

It is possible to limit the selection by record type ("U/ E/ H/ B/ T records").

If no explicit selection is made, the system filters the records of type "U" and "E" for operations that

do not require batch management. For operations that require batch management, the system only

displays postings of record type "H", if no explicit selection of record types is made.

BDE-BDM_82.docx

Version: 1.7.23570

Page 94 of 130

Shop Floor / Order Data Management

Person from … to …

If  you  enter  a  personnel  number,  all  staff  postings  ("B  records")  can  be  displayed  that  were

generated  via  personnel  postings  of  the  specified  person.  Also  the  manual  postings,  which  were

generated with the staff badge number, are displayed.

Order type

Select one or more order types to display all postings for orders of the selected order type.

Category

Select one or more categories (order categories) to display  all postings for orders of the selected

category.

Interruption reason

If you enter an interruption reason, all postings are displayed that were canceled or interrupted with

this interruption reason.

Premium group

In HYDRA Incentive Wage LLE, you assign workplaces/machines or persons to premium groups. If

you  enter  a  premium  group,  all  postings  are  shown

that  were  made

for  persons  or

workplaces/machines of this premium group in the period of time entered.

Modified by/modified on

If you enter a person in the "modified by" field and an editing date, you can view all postings that a

person edited on this day.

Incl. cancellation log records

This option is used to select and display cancellation log records (postings of record type "S").

Incl. original log records

Use this option to additionally display original postings (postings of record type "O").

Non-authorized postings

Use this check box to restrict the display to order-related postings that have not yet been authorized

(record  type  U,  E,  H,  T,  B).  This  makes  sense  if  postings  should  not  be  uploaded  until  they  have

been authorized.

Date from ... to ...

All postings made in the specified period are displayed.

The selection of a shift might issue a different result than the selection of a time for a specified date.

Note: This application only selects and edits data that is included in the online data area.

Shift

Enter a shift to select postings that were posted during a specific shift (according to the BDE shift

model).

BDE-BDM_82.docx

Version: 1.7.23570

Page 95 of 130

Shop Floor / Order Data Management

Note: The logoff time stamp of a BDE log record identifies the shift (shift date, shift number) the log

record is assigned to.

Time

Use  the  time  to  further  restrict  the  selection  of  postings.  This  selection  criterion  references  the

posting's start time. Please note in this context that this start date may definitely go back farther into

the past for workplaces where the shift automatic function has not been activated.

If you enter several selection criteria, the data is displayed that matches all selection criteria.

Note  on  merged  operations:(cid:13)

If  you  have  merged  operations  via  MOC,  ONLY  the  separate

single operations can be displayed and changed. If you change/correct the log records of single

workplaces, the status of the merged operation is updated.

Note on split operations:(cid:13)

In case of split operations, the log records of the split operations are

displayed. No log records are generated from the split operations for the split master. When log

records of split operations are changed/corrected, the status of the split master is updated.

Toolbar

 Authorize (function authorization: oboo.sign)

Function to Authorize postings

 Machine-related postings (function authorization: mboo)

Click this button to call the application Machine-related postings

When  you  call  the  function,  workplace,  cost  center,  date/time  and  shift  are  transferred  from  the

selection panel.

 Order information (function authorization: orin)

Click this button to call the Order information.

Inspection points (function authorization ipp)

Click this button to call the application Inspection points

Field description

In  the  table  view,  the  posting's  data  is  displayed  including  other  additional  information.  In  the  editing

dialog, only the data relevant to the posting is displayed.

BDE-BDM_82.docx

Version: 1.7.23570

Page 96 of 130

Shop Floor / Order Data Management

Tab General

Record type

Record type of an order-related posting:

U order interruption: The interruption of the operation triggered the posting

E Posting of finished order: The posting is triggered, when the operation is finished.

B Staff posting: Personnel-related posting

H  Change  of  batches:  Posting  that  relates  to  batches.  If  you  use  the  Material  and  Production

Logistics  (MPL),  the  postings  for  operations  that  require  batch  management  always  relate  to  the

specific batch. In this case, the postings of record type U or E are not displayed if the record type is

not selected explicitly.

T Partial confirmation: Posting of a part quantity (scrap with reason)

Order

Order number

Sequence

If sequences are used, the sequence is displayed here.

The specified order/operation must exist; the status is not checked.

OP

Split

If splits are used, the split number is displayed here.

Workplace

Number of the workplace/machine where the operation was logged on.

Cost center

Cost center of the workplacewhere the operation was logged on/posted.

Person

Personnel number of the person who triggered the posting.

This  number  must  exist  in  HYDRA.  In  case  of  staff  postings  (record  type  "B"),  it  is  mandatory  to

enter a personnel number. The field can remain empty with the other record types.

Employee group (only displayed in tabular view)

Assigned employee group according to the HR master data

Interruption reason

Status of the machine/workplace at the time of the interruption or completion posting. This relates to

the workplace/machine status.

Internal MES batch number (only relevant when using MPL)

Produced batch number or entered batch number

BDE-BDM_82.docx

Version: 1.7.23570

Page 97 of 130

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

Rework quantity in primary quantity unit

Open quantity

Recorded open quantity in the primary quantity unit

Unit

Quantity unit, is taken over from the operation.

Note: The field cannot be changed in editing mode

Total cycles (only displayed in tabular view)

Cycles posted while the operation was logged on (only for postings of record type U, E)

Cycles during MUT (only displayed in tabular view)

Cycles  posted  while the operation  was logged on and the status "Production"  was available (only

for postings of record type U, E).

Secondary quantity/tertiary quantity/basic quantity

Yield, scrap, rework, open quantity, unit

Posted quantities in the respective quantity unit.

Note: You cannot change the Unit fields in editing mode.

Durations index tab

Login

Date and time of the start posting that issued this posting.

Logoff

Date and time of the start posting or the end posting that issued this posting.

If you change the points in time Login or Logoff, then this does not change the saved

points in time of "First logon", "Last interruption, "Last logoff" or "Status since" in the

order or operation status.

BDE-BDM_82.docx

Version: 1.7.23570

Page 98 of 130

Shop Floor / Order Data Management

Shift, shift date, shift start, end of shift

Number of the shift, shift date assigned to the posting according to the BDE shift model, and shift

times.

Shift model (only displayed in tabular view)

Day type that was used for the (automatic) posting.

Usually,  the  day  type  of  the  shift  model  of  the  workplace  is  used  here.  If  the  basic  setting

Synchronize labor times with the person's BDE shift model is enabled, the day type of the BDE shift

model that is assigned to the person is used here.

Shift type (only displayed in tabular view)

Shift type that was defined in the day type configuration.

Order-related RPA

Order-related times that were posted to the resource performance accounts.

Personal RPA

Personal times that were posted to the resource performance accounts.

Duration (only displayed in tabular view)

The posting duration is the sum total of the order-related times that were posted to RPA 1-11.

Sum (without breaks) (in the editing dialog only)

The value corresponds to the duration of the posting (column “duration” in the tabular view) and is

calculated automatically from the sum total of RPA 1 to RPA 11.

Difference (in the editing dialog only)

The difference between the original duration and

- the new duration from the total of RPA1-11 or

- from the different posting times

is shown for information purposes.

Labor utilization

Time of labor utilization. The calculation depends on the option RPAs to calculate labor times in the

Basic settings.

Compensation with RPA

If  you  edit  the  durations  and  as  a  result  you  have  a  difference,  this  difference  is  displayed  in  the

respective field in the editing dialog. To offset this difference, an RPA is specified. When you then

save the changes, the difference is assigned to the specified RPA.

If  you  click  the  icon

  in  the  title  bar  of  the  editing  dialog,  the  difference  is  offset  against  the

specified RPA.

Offset labor utilization

You can use the option Offset labor utilization to offset the difference against labor utilization.

BDE-BDM_82.docx

Version: 1.7.23570

Page 99 of 130

Shop Floor / Order Data Management

If  you  have clicked the icon

 and  the personal RPAs  have been offset, the RPA durations  are

totaled and the sum is entered in the field labor utilization.

In  the  Basic  settings,  tab  BDE,  section  RPAs  to  calculate  labor  times:  If  the  option  Processing

active is enabled, only the RPAs are integrated that are enabled in this section of the basic settings

when the RPA durations are totaled up.

In  general,  order-related  resource  performance  accounts  and  personal  resource  performance  accounts

are displayed and can be edited separately.

In case of staff postings (record type "B"), the display of order and staff postings depends on the option

Proportionate RPA posting in personnel postings in the Basic settings.



If the option Proportionate RPA posting in personnel postings is enabled in the basic settings, the

order-related  and  the  personal  resource  performance  accounts  are  displayed  for  staff  postings

(record type “B”).



If the option Proportionate RPA posting in personnel postings is not enabled in the basic settings,

only  the  personal  resource  performance  accounts  are  displayed  for  staff  postings  (record  type

“B”). The order-related resource performance accounts are automatically set to the values of the

person-related resource performance accounts.

Field descriptions in tab Wage data

te

tr

teb

trb

Default  individual  time  for  labor  time  in  [h/1000].  Is  taken  over  from  the  operation  (requires  the

relevant LLE license).

Target specification for setup time in [h]. Is taken over from the operation (requires the relevant LLE

license).

Default  individual  time  for  the  (machine)  occupancy  time  in  [h/1000].  Is  taken  over  from  the

operation (requires the relevant LLE license).

Default individual time for the (machine) setup time in [h]. Is taken over from the operation (requires

the relevant LLE license).

Wage type

The wage type is taken over from the operation (requires the relevant LLE license).

Note: Not this value is uploaded as wage type at the ERP upload interface, but the value defined in

the order backlog of the operation.

BDE-BDM_82.docx

Version: 1.7.23570

Page 100 of 130

Shop Floor / Order Data Management

Premium group (cid:129)

In HYDRA Incentive Wage LLE, either  workplaces/machines or persons are assigned to premium

groups (requires the relevant LLE license).

In this case, the specified premium group must be valid.

Operator position/function

Operator position entered for the posting (only relevant for personnel postings).

Premium indicator

Premium indicator entered for the posting (only relevant for personnel postings).

Settlement date

The system uses the settlement date to assign a posting to a settlement day for the calculation of

the incentive pay and the PZE-BDE comparison function. If the settlement date is filled, the order-

related posting  is assigned to this day. If the field  Settlement  date  is empty, the  field  Shift date is

used for the assignment. If the shift date regularly does not correspond to the PZE assignment, the

BDE shift models need to be adjusted.

The  field  is  filled  in  as  a  result  of  the  PZE  work  day  evaluation  or  via  the  editing  function  for

postings. This means that normally the field is initially empty for all postings of the current day and

that it will not be updated until the next morning after the PZE work day evaluation has been run. As

a result, postings for the current day may be incorrectly assigned to the previous day. The incorrect

assignment will normally disappear on the next day.

The following rules apply for the assignment of the settlement date:

Order-related staff postings (B records)

Staff postings are assigned to the PZE personal day if the postings are within a time frame of +/- 2

hours to the rounded working times of the reporting person.

PZE                        IN                                           OUT
                           21:47  22:00                           6:00  6:17
                        ------------|------------------------------|----------->t
                                    IN ROUNDED           OUT ROUNDED
Rounded working time                [==============================]

                        -2         +2       -2         +2         -2         +2
B records              |---[======]---|    |---[======]---|      |---[======]---|

If a staff posting lasts several days, it is assigned to the first PZE personal day, because usually a

person has forgotten to log off (P_AB).

Order-related postings (U/E/T records)

Order-related postings are assigned to the PZE personal day of the reporting person if the end time

of the postings is within a time frame of +/- 2 hours to the rounded working times of the reporting

person.

BDE-BDM_82.docx

Version: 1.7.23570

Page 101 of 130

Shop Floor / Order Data Management

PZE                        IN                                           OUT
                           21:47  22:00                           6:00  6:17
                        ------------|------------------------------|----------->t
                                    IN ROUNDED           OUT ROUNDED
Rounded working time                [==============================]

                               -2  +2             -2  +2           -2  +2
                              |---|---|          |---|---|        |---|---|
U/E records               [=====]        [=======]            [=]

If a posting lasts several days, it  is assigned to the last PZE personal day,  because the reporting

person is identified using the logoff and therefore the person logging off posts the quantities. If no

personnel number is entered in the posting, the settlement day cannot be assigned.

User fields index tab

See above.

Administration index tab

Modified by

Person who last edited the posting.

Modified on

Date when the posting was last edited.

Name

Name of the person who last edited the posting (according to the user administration).

Confirmed

This  field  informs  whether  the  posting  has  already  been  uploaded  to  a  higher-level  system.  Y  =

uploaded, N = not uploaded, X = blocked

Confirmation date, Confirmation time (only with tabular view)

Date and time when the posting has been uploaded.

Wage confirmed

This  field  informs  whether  data  is  uploaded  to  a  payroll  system  according  to  the  customer's

requirements.

Date of authorization, Authorization time (only with tabular view)

Date and time when the posting was last authorized.

Reference

Unique reference of the posting

Type

This field informs how this data record was collected or changed.

(empty): Original posting from data collection.

BDE-BDM_82.docx

Version: 1.7.23570

Page 102 of 130

Shop Floor / Order Data Management

E: Manually created or changed posting. Postings that have been edited (type "E") are not copied

and stored as a type "O" posting.

O: If original posting is edited, the original posting is copied and stored with type "O". The original

information remains available and can be displayed.

S: Cancellation for PPS

Cancellation and original postings cannot be modified or deleted.

Other fields

Posting date, posting time

Reserved for future add-ons.

Insert new posting

Function authorization

oboo.create

If  you  manually  create  a  posting  of  record  type  “U“  or  “E”,  a  posting  of  record  type  “T”  is  automatically

created. The  posting  of record  type T includes the  quantities of the U/E posting, but no times. The end

time of the U/E posting is used as point in time.

Automatic status change of the operation



If a posting of record type “E” is created for an operation, the operation is set to the operation status

“E”, if the operation status was “V” or “U”. Additionally, the points in time of the “first logon” or the "last

logoff" are set in the order status, if these times are not yet available.



If a posting of record type “U” is created for an operation, the operation is set to the operation status

“U”, if this status was “V”. Additionally, the point in time of the “first logon” or the "last interruption" are

set in the order status, if this time is not yet available.

  Note:  In  both  cases,  the  processing  is  not  identical  to  the  processing  of  an  operation  interruption

(A_UN) or an operation logoff (A_AB/A_BE).

  The points in time that are saved for "first logon", "last interruption" or "last logoff" are not changed in

the order status, if the operation has already been started. In this case, the date is the actual date of

the real, first logon.

Automatic change of quantity of the operation



If a posting of record type “E” or “U” is created for an operation, the order quantity is corrected in the

order status.

At  the  same  time,  a  posting  of  a  part  quantity  (posting  of  record  type  “T”)  including  the  quantity  is

created.



If a posting of record type “T” is created for an operation, the order quantity is changed in the relevant

order posting of record type “U” or “E” and order quantities are revised in the order status.

BDE-BDM_82.docx

Version: 1.7.23570

Page 103 of 130



If a posting of record type “E” is created, target quantities are not compared.

Shop Floor / Order Data Management

Change posting

Function authorization

oboo.editall

A cancellation record is generated if a posting is already uploaded to the PPS system (confirmation flag

“J”). In any other case, the data record is changed physically.

Note: When you change a posting, there must not be any running ERP uploads.

Automatisms when postings are changed

  The original data record is saved if the posting is generated automatically.

  You cannot change cancellation bookings and original bookings.

Changing postings that are already uploaded

You can configure in the Order type , if changes made in the editing functions are uploaded to the ERP

system. The following options are available:

J

E

N

Allow modification and upload

Allow modification; no upload – data may be changed but not uploaded.

No, modifications are not allowed – data can no longer be changed.

The check is performed in the order type of the order that you want to change.

If the option is set to "J" and you change an already uploaded posting, a cancellation posting is created.

This  cancellation  posting  keeps  the  original  reference.  The  changed  posting  is  created  with  the  new

reference.

Note: No check is performed for MDE postings.

Changing the record type

The record type of a posting cannot be changed from

- record type "H" / "U" / "E" to record type "B"

- record type "B" to record type "H" / "U" / "E"

A validation check rejects the change.

Correcting the order number in a posting

The below-mentioned procedure/order has to be observed to change the order number in a posting:

BDE-BDM_82.docx

Version: 1.7.23570

Page 104 of 130

Shop Floor / Order Data Management

  Copy the posting to be changed to the new order number.

First copy the order-related posting (record type “U”, “E”) and then the staff posting (record type “B”).

  Delete the postings made for the wrong order number.

Changing the quantity for an order posting (record type "U"/"E")



If  the  quantity  is  reduced,  a  posting  of  a  part  quantity  (posting  of  record  type  “T”)  including  the

difference quantity is generated. Here, the posting includes negative quantities.



If  the  quantity  is  increased,  a  posting  of  a  part  quantity  (posting  of  record  type  “T”)  including  the

difference quantity is generated. In this case, this posting includes positive quantities.

  The scrap reason of the U/E-posting is used as scrap reason for the new posting (record type “T”).

  Order quantities are corrected in the order status

  Target quantities are not compared if a posting of record type “E” is corrected.



If  you use the Material  and Production  Logistics (HYDRA-MPL),  quantities may  ONLY  be corrected

within the H records and not within the U/E postings!

Changing quantities for a posting of a part quantity (record type "T")

  The quantity is changed in the respective order-related posting (record type “U” or “E”).

  The batch record (posting of record type “H”) is changed if the operation requires batch management.

Changing quantities for a batch posting (record type "H")



If  the  quantity  is  reduced,  a  posting  of  a  part  quantity  (posting  of  record  type  “T”)  including  the

difference quantity is generated. Here, the posting includes negative quantities.



If  the  quantity  is  increased,  a  posting  of  a  part  quantity  (posting  of  record  type  “T”)  including  the

difference quantity is generated. In this case, this posting includes positive quantities.

  The quantities are adjusted in the U/E record.

  The batch status is not adjusted!



If  you use the Material  and Production  Logistics (HYDRA-MPL),  quantities may  ONLY  be corrected

within the H records!

Changing quantities for a staff posting (record type "B")

Quantity changes for staff postings generally do not affect the order status or order-related postings.

Changing the time in an order posting (record type "U"/"E")



If  times  (logon/logoff)  of  an  order  posting  (record  type  “U”  or  “E”)  are  changed,  the  times  of  the

posting(s) of part quantities (record type “T”) are also changed, if this/these posting(s) would then no

longer be within the order posting.

BDE-BDM_82.docx

Version: 1.7.23570

Page 105 of 130

Shop Floor / Order Data Management



If you want to shorten the times (logon/logoff) of an order posting (record type "U" or "E"), you must

first adjust the times of staff postings (record type = "B") that might be included. As otherwise, there

would be staff postings outside of order postings that could no longer be changed.

  The points in time of the "first logon", "last interruption" or "last logoff", which are saved in the order

status, are no longer adjusted, if you change the points in time (logon/logoff).

Changing the time in a staff posting (record type "B")



If points in time (logon/logoff) of a staff posting (record type "B") are changed so that the middle of the

staff posting is outside of an order posting, an error message will occur because a staff posting must

not exist without a respective order posting.

Procedure for changing times in posting records





If an order posting is shortened, you must first shorten the staff postings that might relate to it.

If you want to extend a staff posting (longer than the original order posting), you must first extend the

related order posting.

Changing RPAs in staff postings (record type "B")

  The  personal  resource  performance  accounts  are  changed  accordingly  in  the  order  posting.  This

change is always made, irrespective of the option Proportionate RPA posting in staff postings in the

HYDRA basic settings.



In  the  section  Personal  resource  performance  accounts,  the  labor  time  is  changed,  if  an  RPA  is

changed  and  if  the  option  Offset  labor  utilization  is  enabled.  The  total  of  the  RPAs  without  RPA  12

(BKS - breaks) is displayed in the field Sum (without breaks). The total of the RPAs can deviate from

the labor time because labor times can be changed manually.

Use the following INI configuration to permanently activate the option Offset labor utilization in

the editing dialog:

Field

Name

MOC user

Section

Key

Value

Active

Value

BDE

0

CALC_LABOR_UTILIZATION

SET_CHECKBOX

TRUE



Comment

Set checkbox to calculate labor utilization in order bookings

BDE-BDM_82.docx

Version: 1.7.23570

Page 106 of 130

Shop Floor / Order Data Management

Labor time / personal RPAs in order-related postings (record type "U"/"E")



In order-related postings, the field "labor time" is not automatically changed if  you make changes in

the staff postings. You must change the labor time manually in the order booking.

You  can  manually  change  the  duration  or  use  the  option  Offset  labor  utilization  to  integrate  the

changes made as described in the paragraph Changing RPAs in staff postings (record type "B").



If a staff posting is changed, the personal resource performance accounts are changed accordingly in

the order posting. This change is always made, irrespective of the option Proportionate RPA posting

in staff postings in the HYDRA basic settings.

Copy posting

Function authorization

oboo.copy

If you use the copy function, you create a new posting. The only difference to a completely new posting is

that the data of the copied posting is entered into the fields of the dialog box.

With  postings  of  record  type  U,  E,  H  or  T,  the  preassigned  values  of  the  person-related

resource performance accounts are not saved.

Delete posting

Function authorization

oboo.delete



If a posting has already been uploaded to the PPS system (confirmation flag “J”), then a cancellation

record is created. Otherwise, the data record is physically deleted.

  The operation is reactivated automatically if a posting of record type “E” is deleted.



If you delete a posting of record type “U” or “E”, all included postings of part quantities (record “T”) are

automatically deleted.

  Staff postings (record type “B”) are not deleted when you delete order-related postings (record type

“U”/”E”). Consequently, they should be deleted manually before deleting order-related postings.



If the HYDRA basic setting Maintenance on the basis of events is enabled, then you can only delete

manually created postings.

  The saved points  in time "first logon",  "last interruption"  or "last  logoff" are not updated  in the  order

status if an order-related posting is deleted (record type "U"/"E").

Authorize postings

Function authorization

oboo.sign

When you authorize a posting, the date of authorizing and the authorizing person are set.

If  the  data  record  is  also  included  in  the  Foreman’s  checklist  in  the  category  Non-authorized  personnel

postings or Non-authorized order postings, this posting is identified as Settled in the foreman's checklist.

BDE-BDM_82.docx

Version: 1.7.23570

Page 107 of 130

Shop Floor / Order Data Management

If an open Escalation  "ANR.UNCERTIFIED_BOOKINGS" exists for the posting, the escalation is closed

with the comment "booking signed".

You can define for each Order type  that postings should only be uploaded after authorization.

After 5 days at the latest (standard setting, can be changed), non-authorized postings are also

confirmed/uploaded.

General validation checks



If  a  posting  has  already  been  uploaded  and  the  option  No  change  after  upload  is  set,  you  cannot

change or delete the posting.



If a posting has already been uploaded and the configuration Change allowed, no upload is enabled

in  the  order  types,  then  you  can  change  or  delete  the  posting  after  confirming  it  in  an  information

dialog.  In  this  case,  the  status  is  corrected  in  HYDRA  but  an  upload/cancellation  is  not  sent  to  the

higher-level system.

  You  can  only  edit  or  delete  postings  that  have  been  recorded/generated  automatically  if  the  event

maintenance  function  is  disabled.  But  you  can  always  change  or  delete  posting  records  that  have

been created manually.

  You cannot change or delete cancellation postings (record type “S”) and original postings (record type

“O”) because these postings are only created for reasons of traceability.



If you insert/edit/copy order postings (U/E records), the system checks whether the times overlap with

already existing order postings. The period, order number and machine are checked in this context.

If  record  type  "E"  or  "U"  is  entered,  the  system  does  not  check  if  at  the  time  of  the

generation  or  change  of  the  posting  the  operation  was  logged  on,  already  finished  or

interrupted or not logged on at all.



If  you  insert/edit/copy  a  posting  of  a  part  quantity  (record  type  “T”),  it  is  checked  whether  a

corresponding order posting exists.



If you insert/edit/copy a batch posting (record type "H"), it is ensured that

-a corresponding order posting exists

-the operation requires batch management

-no overlapping batch posting exists for the order/workplace.

-either yield or scrap can be entered, but not both quantities.

BDE-BDM_82.docx

Version: 1.7.23570

Page 108 of 130

Shop Floor / Order Data Management

  The user must be authorized for the responsibility  area that  includes the  workplace indicated  in  the

posting record.

  When you change a posting, there must not be any running uploads.



If  you  use  the  editing  function  for  postings  to  change  automatically  collected  data  or  to  create

completely new postings (e.g. external orders), it is checked whether or not the workplace is currently

blocked by the event maintenance function.

BDE-BDM_82.docx

Version: 1.7.23570

Page 109 of 130

Shop Floor / Order Data Management

20  Event Maintenance

Overview

Drei kleine textuelle Korrekturen/Änderungen.

Menu

Data collection  Data correction  Event maintenance

Transaction code

evli

Function authorization

evli

Purpose

You  can  use  the  Event  maintenance  to  edit  and  recalculate  the  posting  events  provided  by  the  data

collection. You can also delete events or create new events.

Integration

The  user  can  use  the  maintenance  function  to  subsequently  change  events.  The  system  can  then

perform a validation check and recalculate the events. The resulting postings can be integrated (selected)

in the different evaluations or uploaded to the higher-level ERP system.

The  special  feature  of  the  event  maintenance,  compared  to  the  editing  functions  for  postings,  is  that  it

includes  a  recalculation  function.  The  changed  data  (events)  is  then  used  to  generate  new  postings.

When data is recalculated, the system performs the same validation checks as for postings of the online

data collection. This procedure ensures consistent data.

Requirements

The  event  maintenance  provided  with  this  application  requires  activation.  If  the  activation  is  not

performed,  the  following  message  is  shown  when  the  application  is  called:  "The  event-related  BDE

maintenance has been disabled in the basic settings. Modifications cannot be saved." Without activation,

the events can only be selected and displayed, but you cannot add new events or edit or delete existing

events.

By default, the event maintenance is not active.

Only activate the event maintenance if the relevant requirements or the restrictions listed in

the following have been checked.

BDE-BDM_82.docx

Version: 1.7.23570

Page 110 of 130

Shop Floor / Order Data Management

Restrictions

Some  posting  functions  are  pure  data  collection  functions.  The  collected  data  cannot  be  edited  or

recalculated in the event maintenance. You must check for each function whether the event maintenance

can be used. Find a list of these functions in the following.

Data from data collection that cannot be edited

  Comments  entered  in  different  posting  dialogs  on  the  shop  floor  terminal  cannot  be  displayed  or

edited in the event maintenance.

  Serial  numbers  collected  for  OPs  that  require  serial  numbers  cannot  be  displayed  or  edited  in  the

event maintenance.

  The  system  can  collect  quantities  in  alternative  units.  In  the  event  maintenance,  you  can  only  edit

quantities in primary quantity unit.

  You can post manual activities in the system or calculate them using formulas. You cannot use the

event maintenance to show or edit activities.

  Posting with OP reference or confirmation/upload number:   In  the  event  maintenance,  you  require

the MES order number for editing.

  Changes  of  the  production  lock  are  logged  as  events.  You  can  display  these  events  in  the  event

maintenance, but you cannot edit them.

  User fields that were integrated in posting dialogs as part of a customization (e.g. OP logoff) cannot

be displayed or edited in the event maintenance.

  Automatic  posting  processes  and  their  configurations  are  not  used  and  recalculated  in  the  event

maintenance (e.g. finish/interrupt or automatically log off a preceding operation when target quantity

is reached).

  Events that are based on resource-related postings (WRM or DNC) cannot be displayed or edited in

the event maintenance.

  The "Automatic OP change" option in tab BDE of the HR master data is only integrated during online

processing; it is not integrated during recalculation in the event maintenance.

  The option "OP change with status change" in the status assignment of machines/workplaces is only

integrated during online processing; it is not integrated during recalculation in the event maintenance.

  Postings of personnel or machine waiting periods are not displayed in the event maintenance.

  The recalculation in the event maintenance does not trigger escalations.

  Optional  data  that  has  additionally  been  recorded  in  the  "Change  machine  status"  dialog  is  not

displayed  in  the  editing  dialog  and  cannot  be  changed.  This  additional  data  can  be  the  "expected

duration", a comment or any additional data for escalation management.

Merged operations

An  assignment  of  a  new  OP  to  a  merged  operation  is  NOT  supported  in  the  event  maintenance.  Only

data for already posted merged operations can be modified.

BDE-BDM_82.docx

Version: 1.7.23570

Page 111 of 130

Shop Floor / Order Data Management

If data is recorded for a merged operation using the "Merged operation per machine" function, this data

CANNOT be edited in the event maintenance.

A  recalculation  is  no  longer  possible  for  merged  operations  that  were  generated  on  the  MOC  if  the

operations contained in the MOP were changed.

PZE controls ADE

The  "PZE  controls  ADE“  setup  setting  can  lead  to  scenarios  in  the  event  maintenance  where  the

personnel logon event is displayed before the actual order logon, because the logon is then rounded to

the PZE time.

If inconsistent postings exist in the event maintenance  – because a personnel logon is displayed before

the actual order logon – then the postings must be corrected. The personnel logon time must be changed

to the time of the order logon.

Interface to SAP

The event maintenance cannot be used in combination with the PP-PDC interface, because the standard

SAP system does not accept cancellations from external systems.

MDE shift change events

If these events are changed, it is possible that shifts are not calculated completely or that gaps result. For

this reason, generally do not edit shift change events.

A  recalculation  of  the  entire  shift  is  not  guaranteed  here  because  the  relevant  events  that  identify  the

times of start and end of shift might no longer be available at the relevant point in time.

Shift change events are events triggering status changes "M_MST“

end of shift dialog A_AUN

beginning of shift  dialog A_AAN

Shift end events (event M_MST with dialog A_AUN) may only include the status 20000 "no shift“.

Editing of finished operations

Operations  that  have  already  been  finished  can  be  edited  in  the  event  maintenance  dialog.  Note:  The

status of a finished operation does not change. The status is also not changed if an OP logoff is deleted

or if the OP logoff is changed into an interruption.

If you want to reactivate an operation that has already been finished, you must always use the function

"Reactivate operation".

BDE-BDM_82.docx

Version: 1.7.23570

Page 112 of 130

Shop Floor / Order Data Management

Material and Production Logistics (MPL)

Some operations require batch management. The following restrictions apply for these operations in the

event maintenance:

  Only MPL machines with batch processing can be edited. Machines of the types roll cutting, parallel

output batches, throughput batch mode, etc. are not supported.

  The  event  maintenance  supports  input  batch  postings  for  an  operation  to  a  limited  extent  only.

Postings  that  are  not  included  in  the  OP  posting  are  not  integrated.  Consequently,  consumption

postings for input batches are not integrated.



It is not allowed to change output batch numbers or to delete events CA_AN/CA_AB.

  Using the event maintenance, you cannot display or change batch attributes.

  The existing batch tracing is not changed subsequently by the maintenance function.

Event modified by

You  can  store  a  user  ID  for  the  event.  For  technical  reasons,  the  user  ID  has  a  maximum  of  9  digits

(column "Modified by"). This means: If you enter a user ID with 10 digits, the last digit is cut when the user

is transferred to the "Modified by" column in the event maintenance.

Editing of the partitioning

If  a  machine  partitioning  event  (M_TLG)  is  edited,  only  the  shifts  included  in  the  recalculation  are

integrated.

If  an  order  is  produced  in  several  shifts  (automatic  re-logon),  all  events  must  be  recalculated  that  are

affected by this change of partitioning event.

Respect the following process for an event that includes a change of the partitioning:



If partitioning is changed, the entire period for which this modification applies needs to be selected,

i.e. until the operation is interrupted or finished manually.

  When changes are made, the relevant partitioning event must be changed

AND

if the operation was automatically produced during several shifts, the subsequent manual interrupt or

finish posting of the order must also be changed.

If you manually interrupt or finish the order, it is enough to save the data without change.

BDE-BDM_82.docx

Version: 1.7.23570

Page 113 of 130

Shop Floor / Order Data Management

  When data is then recalculated, all data between the change of partitioning and the manual interrupt

or finish posting is automatically used for this recalculation.

Note:

The events that must be recalculated are not selected automatically, because the change of partitioning

can affect several shifts; also shifts that are no longer included in the selection period.

Selection criteria

The application provides the following selection criteria:

Workplace/machine

All data relating to the selected workplace is shown.

MES order number

The result list shows all events of workplaces where the order was logged on in the selected period

of time. You can also use wildcards.

Person … to …

The result list shows all events of the workplaces where the person (persons) was (were) logged on

in the selected period of time. You cannot use wildcards.

Date … to …

All events that are included in the selected period of time are displayed.

Note: This application only selects and edits data that is included in the online data area.

Parallel staff logins

The option "Parallel staff logins" selects the data of all workplaces where a person was logged on.

Set  this  option  if  you  want  to  edit  data  of  workplaces  where  persons  are  logged  on  with  multiple

machine operation.

For more information, see here.

Refresh data

Use this option to control if the new data is displayed in the event maintenance after recalculation

(with  large  amounts  of  data,  this  can  have  a  negative  effect  on  performance).  Note:  If  an  error

occurred during recalculation, the data freezes in the display.

If  more  than  1000  events  are  selected  according  to  the  data  selection,  the  following  error

message  is  displayed:  "The  requested  amount  of  data  is  too  large.    Please  restrict  the  data

using selection criteria."

When  data  is  requested,  all  selection  fields  are  disabled  except  the  checkbox  "Refresh  data".

BDE-BDM_82.docx

Version: 1.7.23570

Page 114 of 130

Shop Floor / Order Data Management

The fields are only enabled again when the button "Discard" is clicked.

If you request data and this data is currently locked by another user, then you can specify if the

data is displayed. Here, the data is only displayed and cannot be edited.

Toolbar

You can call the following functions from the toolbar. Note the Requirements for editing events:

 Edit an existing event

Function authorization: evli.edit

The relevant dialog for the event selected is opened.

 Delete an existing event

Function authorization: evli.delete

The selected event is deleted.

 Recalculate

After  the  confirmation  prompt,  a  validation  check  is  performed  for  all  added,  edited  or  deleted

events;  the  postings  resulting  from  the  events  are  regenerated.  When  the  recalculation  is

completed, a message is issued.

If an error occurs during recalculation (e.g. because of logically invalid values), an error message is

displayed.

 Discard

After confirmation, all added, edited or deleted events are discarded and the list is cleared.

 Order information

Function authorization: orin

Calls the applicationOrder information.

 Workplaces/machines

Function authorization: wpov

Calls the applicationWorkplaces/machines.

Tab Create event

Function authorization: evli.create

BDE-BDM_82.docx

Version: 1.7.23570

Page 115 of 130

Shop Floor / Order Data Management

This tab includes the buttons

 to create events. Different categories are available:

Operation category:

o  Log OP on (A_AN)

o  Log OP off (A_AB)

o  Partial confirmation/posting of part quantity (A_TR)

o  Quantity upload (A_MR)

o

Interrupt OP (A_UN)

o  Finish OP (A_BE)

Person category:

o  Log person on (P_AN)

o  Log person off (P_AB)

Machine/workplace category:

o  Change status (M_MST)

o  Change partitioning (M_TLG),

o  Automatic counter (M_CTR_AUTO),

o  Automatic quantity (M_AUTO)

Material category:

o  Log output batch on (CA_AN)

o  Log output batch off (CA_AB)

o  Log input batch on (CE_AN)

o  Log input batch off (CE_AB)

Other category:

o  Activate OP (NC_AN)

o  Deactivate OP (NC_AB)

Field descriptions

Class

Internal event classification:

P = Personal data

M = Workplace data

A = Order data

BDE-BDM_82.docx

Version: 1.7.23570

Page 116 of 130

Shop Floor / Order Data Management

C = Batch data

Event

The possible events and their colors are listed here.

Dialog

This field shows the dialog that triggers the event. Some dialogs have the same name as the event

(e.g. A_AN, A_UN, ...), but a different dialog can also trigger the event.

Date, time

Date and time when the event was posted.

Workplace/machine

The event was posted for the workplace specified.

MES order number

The event was posted for the specified combined order/operation number. This field is only filled in

if the event has an order reference.

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

Base quantity

Yield,  yield  reason,  scrap,  scrap  reason,  rework  quantity,  rework  quantity  reason,  open  quantity,

open quantity reason

Modified by

Last editor of the event

BDE-BDM_82.docx

Version: 1.7.23570

Page 117 of 130

Shop Floor / Order Data Management

Date, time

Date and time when the data record was last edited.

Editable

J = Event can be edited

N = Event cannot be edited, e.g. is the master of an MOP or is locked by a change in the log record

Reference

Unique ID of the data record

Priority

Priority specification for events of the same time (1 = highest priority)

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

Events C_GEN, C_UMB, CE_AN, CE_AB, CA_AN, CA_AB: target location/material buffer

Attribute 2

Event P_AN: Wage/ premium indicator

Events CE_AB, C_GEN: info on batch

Otherwise: Internal use

Attribute 3

Event P_AN: Operator position

Events CA_AB, C_GEN: transport unit

Event CE_AN: BOM item

Event CE_AB: Batch status

Attribute 4

Internal use

BDE-BDM_82.docx

Version: 1.7.23570

Page 118 of 130

Shop Floor / Order Data Management

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

Partial confirmation / posting of part quantity

Order-related event

Interrupt operation

Order-related event

Log operation off

Finish operation

Order-related event

Order-related event

A_MR

Quantity upload

Order-related event

You  can  use  the  quantity  upload  to  upload
quantities for operations, which are not logged
on at the moment. This way, you can correct a
quantity  of  an  operation  without  having  to  log
the operation on and off.

  If an operation is logged on, you may not
use  this  event.  Use  instead  the  event
A_TR.

P_AB

P_AN

Log person off

Log on person

Person-related event

Person-related event

P_VAN

Person advance logon

Person-related event

BDE-BDM_82.docx

Version: 1.7.23570

Page 119 of 130

Shop Floor / Order Data Management

Event

Designation

Type

Cannot be edited.

The event is not used during
recalculation.

M_MST

Change workplace/machine status

Machine-related event

M_AUTO

Automatic quantity posting from the terminal  Machine-related event

M_CTR_AUTO  Automatic counter posting from terminal

Machine-related event

M_TLG

Change of partitioning

Machine-related event

M_SZY

Change of target cycle

M_PSPERRE

Production lock

Machine-related event

Cannot be edited.

If the target cycle is changed, the
change is not used during
recalculation.

Machine-related event

Cannot be edited.

Production lock events are not
used during recalculation.

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

NC_AN

Activate OP (ADE-BEA)

Other event

Other event

The colors of the listed events are the following:

Color

Meaning

blue

Order-related events

green

Person-related events

red

Machine-related events

brown

Batch-related events

BDE-BDM_82.docx

Version: 1.7.23570

Page 120 of 130

Shop Floor / Order Data Management

Color

Meaning

black

Locked events

purple

If the order type option "Change after upload" is set to "Allow no changes" or "Allow
modification, no upload", then all the events already uploaded to the ERP system are
displayed in purple.

The column "Dialog" shows the dialog that triggered the event. Some dialogs have the same name as the

event (e.g. A_AN, A_UN, ...). The following other dialogs can also trigger the events mentioned above:

Dialog

Meaning

A_P_AN

Log order + person on in one (A_AN + P_AN)

P_AAB

Log all staff off (1..n P_AB)

A_AUN

OP is automatically interrupted with shift change

A_AAN

OP is automatically logged on again with shift change

SA_AN

Log on merged operation

SA_TR

Partial confirmation for merged operation

SA_AB

Log merged operation off

SA_ABME

P_KOM

PZE Clock-in

P_GEH

PZE Clock-out

CA_WL

Output batch change

Display of automatically recorded counter values:

If quantities are automatically recorded for a workplace using the Windows terminal software, then these

unevaluated counter quantities are collected and posted as event M_CTR_AUTO. The counter values of

the counter events M_CTR_AUTO are not displayed in the columns for yield, scrap, etc., but in separate

columns of the category "counter".

The  primary  quantities  resulting  from  the  counter  values  (evaluated)  are  logged  and  displayed  as

information in the columns for yield, scrap, etc.

BDE-BDM_82.docx

Version: 1.7.23570

Page 121 of 130

Shop Floor / Order Data Management

The  resulting  (evaluated)  quantities  are  not  logged  in  other  quantity  units.  This  means:  The

base, secondary and tertiary quantities of the counter events are always 0.

No reason is added to the logging of the resulting (evaluated) quantities.

Recalculation of changed data

When you have completed the editing, click button

 and confirm the prompt to start the recalculation

function. The recalculation can take some time depending on the extent of changes made.

The following steps are performed during recalculation:

1.  Validation check of the modified data

The system checks if all events involved are fully processed (same check as with online processing).

If the validation check fails for one of the events, then the recalculation is rejected and the changes

are  not  accepted  in  the  system.  If  a  validation  error  occurs,  then  an  error  message  is  displayed

including information on the relevant event.

2.  Canceling existing results

If  all  validation  checks  were  completed  successfully,  then  the  still  available,  current  results  are

canceled. If postings have already been uploaded to the ERP system (upload identifier “J“), then the

relevant cancelation records are generated; this is the same processing when postings are manually

changed  using  the  editing  function  for  postings.  The  quantities  and  times  contained  in  the  order-

related posting are also canceled for the operation status.

3.  Calculating new results

After a successful validation check and cancellation, the modified events are reevaluated and a new

posting  is  generated.  The  quantities  and  durations  calculated  for  the  order-related  posting  are  also

posted to the operation status.

Note: If the configuration has been changed in the meantime, it is possible that you cannot

change events any more that have already been recorded or the changed configuration can

lead to other results.

Example:  If  two  operations  were  logged  on  to  a  machine  at  the  same  time,  and  in  the

meantime  the  option  Parallel  logon  of  OP  was  deactivated,  then  the  recalculation  of  one

operation leads to a validation error. Recalculation is no longer possible.

If the recalculation could be completed successfully, a success message is shown.

BDE-BDM_82.docx

Version: 1.7.23570

Page 122 of 130

Shop Floor / Order Data Management

Locking concept in the event maintenance

The selected data is locked for editing. The selected machine and the selected period of time specify the

data locked.

All locks of the event maintenance are displayed in System administration > Locked data records and can

only be deleted by a user with the relevant function authorization.

If a lock is deleted, the recalculation of the currently displayed data in no longer possible on this console.

The user must discard the scenario and request data again.

Option "Parallel staff logins" in the event maintenance

If  the  employees  log  on  to  multiple  machines,  you  must  activate  this  option  in  the  event  maintenance

selection area. The personnel times are then allocated according to the order postings.

All  machines  are  then  displayed  where  the  displayed  persons  were  logged  on  during  the  evaluation

period.

If a nesting of the data is available, this nesting might be too complex and the data cannot be recalculated

because the start events are no longer included in the period of time selected.

Example:

Person 1 is logged on to workplaces 100 and 200

Person 2 is logged on to workplace 200 at a different, but overlapping time

Person 3 is logged on to workplaces 200 and 300 at a different, but overlapping time

When  data  is  recalculated,  all  events  of  an  order  are  integrated.  With  nested  order  events,  a  great

number of order events must be recalculated. Here, a constellation is possible that does no longer allow a

recalculation.

Note: You cannot use the event maintenance with such complex nested personnel postings.

Option "Optimized parallel staff logins" in the event maintenance

If this option is selected, the following optimized processing is performed with parallel staff

logins/personnel postings:

  Only the data specified via selection is displayed or requested (machine, order/OP, person)

  Only if a recalculation is performed, the machines are selected that must be recalculated because of

parallel staff logins.

The system uses the changed data to identify the relevant machines.



If an error occurs during recalculation, the additional machines are also displayed and the user can

correct the data.

BDE-BDM_82.docx

Version: 1.7.23570

Page 123 of 130

Shop Floor / Order Data Management

Waiting period processing

Waiting  period  processing  is  an  optional  processing  that  controls  the  system  behavior  when  personnel

postings are collected. You activate the processing in the basic settings.

If the waiting period is exceeded, a separate waiting period posting is generated (personnel posting to the

defined  waiting  period  operation).  If  the  waiting  period  is  not  exceeded,  the  personnel  posting  is

backdated (and also the OP posting, if required).

The  posting  times  of  the  events  remain  unchanged  during  waiting  period  processing,  i.e.  the  posting

times are edited in the event maintenance.

If  the  events  are  recalculated,  the  changed  postings  are  used  to  identify  whether  the  times  must  be

backdated according to the waiting period processing.

Changes after upload

As  part  of  the  customization,  you  specify  for  each  order  type  whether  changes  made  in  the  event

maintenance are uploaded to the ERP system. The following options are available:

  Allow modification and upload

  Allow modification, no upload - You can change data, but the data is not uploaded

  Do not allow modification - data cannot be changed.

The  validation  check  is  performed  for  the  workplace:  If  an  order  at  a  workplace  cannot  be  edited

according to the order type configuration (purple font color), then all events are locked that are older than

the last upload date/time of this order. The lock is performed for the workplace, i.e. also orders that could

be edited, are locked.

BDE-BDM_82.docx

Version: 1.7.23570

Page 124 of 130

Shop Floor / Order Data Management

21  Foreman’s Checklist

Overview

Menu

Information management  Messages  Foreman's checklist

Transaction code

fmchkl

Function authorization

fmchkl

Purpose

You use the foreman's checklist to monitor the operations produced in the foreman's area:

  The list shows unusual data (e.g. time or quantity deviations)

  The list shows postings that the foreman must authorize.

The  information  displayed  in  the  foreman's  checklist  is  generated  and  saved  in  a  database  table  on  a

daily  basis  (using  an  application  on  the  server  that  is  automatically  started  during  the  night).  The  list

shows information on the last 7 days. The application evaluates the collected information.

Integration

The  data  displayed  here  (e.g.  time,  quantity  deviations)  is  based  on  the  data  collection  performed  via

collection units (e.g. terminals).

Selection criteria

The application provides the following selection criteria:

Order

Selection using the order number. You can use wildcards.

Category

Selection using order categories.

Order type

Selection using order types.

Workplace

The application displays the postings that are made for the workplace number entered.

BDE-BDM_82.docx

Version: 1.7.23570

Page 125 of 130

Responsibility area

The  application  displays  the  postings  that  are  made  for  the  workplaces  that  are  assigned  to  the

Shop Floor / Order Data Management

responsibility area entered.

Cost center

The application displays the postings that are made for the workplaces that are assigned to the cost

center entered.

Company

The  application  displays  the  postings  that  are  made  for  the  workplaces  that  are  assigned  to  the

company entered.

Posting

The  following  information  is  logged.  If  you  specify  the  field  Posting,  you  can  narrow  down  the

display to the required posting categories:

(2) Postings with target-actual quantity deviation exceeding +/ - 5%

Finished  operations,  for  which  a  yield  (in  primary  quantity  unit)  is  posted  of  more  than  +/- 5%

compared to the target quantity (in primary quantity unit).

(B) Postings with target-actual time deviation exceeding 10%

Finished operations with an order duration (times that are posted to   11) of more than 10% of the

target processing time. Only operations with a target processing time greater than 0 are used here.

(5) Non-authorized personnel postings

Non-authorized BDE log records for staff (record type "B"). The log records can be authorized using

the application Order-related postings.

Via customization, you can specify for each order type whether these postings are logged.

(6) Non-authorized order postings

Non-authorized  order-related  BDE  log  records  (record  tpe  "U",  "E")  for  overhead  cost  operations.

These log records can also be authorized using the application Order-related postings.

Via customization, you can specify for each order type whether these postings are logged.

(9) Open operations of finished production orders

Operations  of  production  orders  (category  "FA")  that  are  still  active  (prepared,  running  or

interrupted)  and with a last operation already showing a status "finished".

(1) Postings showing scrap without reason

Log-offs  or

interruptions  of  operations  are

displayed  where  the  (only)  scarp  reason  is  999.  Condition:  Scrap  reason  999  and  manual  scrap

postings on the terminal with scrap reason 999 must be configured.

BDE-BDM_82.docx

Version: 1.7.23570

Page 126 of 130

Shop Floor / Order Data Management

Show finished messages

If this checkbox is not set, only pending postings are shown. If the checkbox is enabled, completed

and pending postings are shown.

In  general,  only  data  is  output  if  the  user  is  authorized  for  the  relevant  responsibility  area.  If  you  select

operation data, the responsibility area of the machine/workplace is used where the order was produced. If

you show staff data, the responsibility area of the person is used as selection criterion.

Field descriptions

The foreman's checklist shows the postings generated for a day in a table. The table shows information

on  the  posting  and  the  connected  master  data  (workplace,  order,  persons)  that  is  read  from  the  tables

stored.

The totals line shows the number of entries in column "Posting".

Posting category

Posting: see paragraph Selection criteria.

Production date/production time: the data's origin for this value depends on the type of posting:

- Postings of finished operations with target/actual deviation: time of most recent log-off

- Open operations of finished production orders: time of the last posting (for running and interrupted

operations), otherwise empty

- Non-authorized personnel/order postings: Log-off time of the log record

- Postings showing scrap without reason:  Log-off time of the log record

Operation category

Order

Operation

Article (of the operation)

Article designation

OP name

Other category

Workplace

Short name (of the workplace)

Person (personnel number)

Name (first and last name)

Last name

First name

BDE-BDM_82.docx

Version: 1.7.23570

Page 127 of 130

Shop Floor / Order Data Management

Personnel data is shown with the following postings:

- Non-authorized personnel postings

-  Non-authorized  order  postings  if  a  staff  badge  number  has  been  entered  with

logoff/interruption.

-  Postings  of  scrap  without  reason  if  a  staff  badge  number  has  been  entered  with

logoff/interruption.

The other postings do not provide any personnel data; the (cumulated) status information

of the operation is used here.

Order category

Evaluation  date  (start  of  the  evaluation  period;  the  start  of  the  evaluation  period  is  calculated  as

follows:  "today"  -  INTERVAL.  If  you  call  the  hy_mst  application  on  the  server,  INTERVAL  can  be

transferred as a parameter. If this parameter is not transferred, 7 is assumed as the default value).

Category (order category)

Order type

Final article (article of the order header)

MRP controller

Order group

Project number

Sequence

Split

First logon (of operation, date/time)

Last posting (for the operation, date/time)

Target quantity: target quantity of the operation (primary quantity unit), only filled if a "target/actual

quantity deviation" is posted.

Actual  quantity:  yield  of  the  operation  (primary  quantity  unit),  only  filled  if  a  "target/actual  quantity

deviation" is posted.

Target duration: target processing time of the operation, only filled if a "target/actual time deviation"

is posted.

Actual  duration:  main  utilization  time  posted  onto  the  operation  (RPA  11),  only  filled  if  a

"target/actual time deviation" is posted.

Workplace category

Designation

Group

Cost center

BDE-BDM_82.docx

Version: 1.7.23570

Page 128 of 130

Shop Floor / Order Data Management

Company

Responsibility area

Person category

Company

Cost center

Area

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

Calls the Order information. The order number is transferred as parameter.

 Order overview

Function authorization: orov

Calls the Order overview. The order number is transferred as parameter.

 Workplaces/ machines

Function authorization: wpov

Calls the application Workplaces/machines. The workplace number is transferred as parameter.

BDE-BDM_82.docx

Version: 1.7.23570

Page 129 of 130

Shop Floor / Order Data Management

 Order related postings

Function authorization: oboo

Calls  the  application  Order-related  postings.  The  following  values  are  transferred  as  parameters:

Workplace, order, operation, production date.

 Done

Function authorization: fmchkl.sign

Selected postings can be marked "done" by this function (multiple selection is possible).

Processing notes

The  information  listed  in  the  foreman's  checklist  is  generated  and  saved  in  a  database  table  on  a  daily

basis (by an application started on the server automatically overnight). This database table is then used

by the MOC application. The checklist includes information on the last seven days (default setting).

If required, the below-mentioned call parameters can be added to the application hy_mst.exe/.out that is

integrated in the HYDRA Scheduler:

/INTERVAL=days

Increase evaluation period (default: "today“ - 7 days)

/DEL_SIGNED= days

Delete authorized postings after <days> (default: 7 days)

/DEL_UNSIGNED= days

Delete non-authorized postings after <days> (default: 999 days)

/NO_CERT

Non-authorized personnel postings are not integrated in the foreman's checklist.

For this parameter, you can specify via customization which order types

o  personnel postings

o  order postings

must be authorized and are then shown in the foreman's checklist.

BDE-BDM_82.docx

Version: 1.7.23570

Page 130 of 130

