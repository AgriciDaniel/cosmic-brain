Manual

Rule-Based Machine
Assignment
HLS-RBM 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Rule-Based Machine Assignment

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 2 of 12

Rule-Based Machine Assignment

Contents

1  Rule-Based Machine Assignment ................................................................ 4

2  Automatic Assignment ................................................................................. 5

2.1  Automatic assignment ......................................................................................... 5

2.1.1  Specification of the assignment order ...................................................... 7

2.1.2  Controlling capacity selection .................................................................. 7

2.1.3  Complete assignment of planning board .................................................. 9

2.2  Planning strategies/priority rules .......................................................................... 9

2.2.1  Rule-based machine scheduling ............................................................ 10

2.2.2  Variable machine assignment ................................................................ 10

2.2.3  Target-oriented machine assignment .................................................... 11

2.3  Other notes ....................................................................................................... 11

Rule-Based Machine Assignment

Version: 1.0.23049

Page 3 of 12

Rule-Based Machine Assignment

1

 Rule-Based Machine Assignment

Purpose

Priority rules are used in order processing for detailed planning (and sequencing) once an order has been

released. With  the  aid  of  priority  rules,  detailed  planning  specifies  how  released  orders  are  assigned  to

workstations.  This  becomes  particularly  important  when  several  orders  are  lined  up  at  a  workstation

awaiting processing, and thus competing for resources.

Based  on  a  queuing  model,  a  random  number  of  resources  (generally  machines  /  workplaces)  is

combined,  from  which  a  queue  of  operations  ready  for  planning  is  generated.  Each  queue  is  given  a

priority rule to identify the highest priority operation (so-called contender) in the queue.

Implementation notes

You  use  the  function  package  if  the  queue  sequence  should  be  built  based  on  one  of  the  priority  rules

listed below:

Integration

The priority rules are used as part  of automatic planning  / assignment in  order to specify the sequence

with regard to the next highest-priority orders / operations.

Features

  Planning strategies controlling automatic machine assignment based on standard strategies:

o  Longest processing time remaining (GRB)

o  Shortest operation time (KOZ)

o  Shortest processing time remaining (KRB)

o  Longest operation time (LOZ)

o  Lowest setup times (UK)

  Selection of sorting rules when defining planning options

Rule-Based Machine Assignment

Version: 1.0.23049

Page 4 of 12

Rule-Based Machine Assignment

2  Automatic Assignment

Purpose

You  can  use  the  function  Automatic  assignment  to  automatically  perform  a  planning  scenario,  which  is

defined via planning profile and planning horizon.

The  function  is  used  to  plan  orders  and  the  included  operations  to  capacities.  The  system  uses

assessment  criteria  –  the  so-called  Assignment  strategy  –  to  sort  the  operations  and  to  distribute  the

operations to the workplaces of the group.

Requirements

Before  you  start  the  detailed  planning,  you  must  define  and  create  the  relevant  Planning  profiles  that

integrate aspects of organization, planning procedure and competencies.

2.1  Automatic assignment

The  automatic  assignment,  also  called  capacity  planning,  is  used  to  plan  orders  or  their  operations  to

capacities.  To  meet  the  demand  of  each  operation,  the  system  selects  a  resource  or  a  combination  of

resources from the resources available. As a result of planning, the operation is assigned a start and end

time (planned start and planned end).

To  calculate  the  planned  duration  of  the  operation,  the  system  uses  the  workplace/machine  that  meets

the main demand plus the dynamic setup time between the preceding operation and the operation itself.

The  workplace/machine  is  the  resource  that  meets  the  "main  demand".  The  alternatives  to  meet  the

demand are the workplaces/machines of the same group (the group the operation has been assigned to).

The assignment of a workplace to a group is configured in the master data.

Production resources and tools are used to meet the further demand. They are stored for the operation.

If Production variants are used, the combination of workplace and resource meets the relevant demand.

Here,  a  resource  is  specified  in  the  Tool  and  Resource  Management  (WRM)  and  assigned  to  a

production variant.

An automatic planning run is performed in the following steps:

1.  The order of assignment is specified via sorting of the operations that must be planned ("queue")

according to the defined planning strategy (priority rule).

The orders that must be planned are sorted according to their priority and placed in a queue. To

identify the priorities, different rules are available.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 5 of 12

Rule-Based Machine Assignment

2.  The operations are distributed among the available workplaces according to the specified

procedure (control of capacity selection).

The following rule applies to specify the planned date of an operation that has been assigned to a

machine via capacity selection:

- If the planning variant includes the active option Displacem. to the left (left shift) for the planning horizon,

then the earliest possible date within the planning horizon is selected as planned start. With this planned

start, the capacity is available and the relationships between operations are respected and free of

conflicts. - If the option Displacem. to the left (left shift) is not active in the planning variant, the system

tries to schedule the operation at its scheduled start time. In case of a forward scheduling, the start time

is the earliest start, in case of a backward scheduling, it is the latest start of the operation. If no capacity

is available at that time, the next later point in time is identified when the required capacity is available.

With backward scheduling, the operation is then scheduled "too late". Optionally, the option

IGNORE_TIMING_DIRECTION can be set to "J" in the INI configuration. With this configuration and in

case of backward scheduling, the automatic planning searches for a start date beginning with the earliest

start. To identify the start date, the planned machine must provide the required capycity.

The result of the automatic assignment is a planning scenario that can actually be realized. This means

that the planning is free of capacity overloads or conflicts because of relationships. If these conditions

must be fulfilled, it might not be possible to schedule all operations in due time. It is therefore possible

that some operations must be planned with a delay. This depends on the planning situation, the available

resources and the selected planning strategy. If the capacity required for an operation is not available

until the end of the planning horizon and with respect of the situation and the respective configuration,

then this operation remains in the pool of groups also after an automatic assignment.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 6 of 12

Rule-Based Machine Assignment

2.1.1  Specification of the assignment order

The automatic assignment is based  on a  queue concept. The  workplaces assigned to a capacity group

are regarded  as a  unit, in front of  which a  queue  is formed, i.e. the operations to be  planned  line up  in

front  of  this  unit.  Each  queue  is  given  a  priority  rule  to  identify  the  highest  priority  operation  (so-called

contender) in the queue.

The  user  can  specifically  set  queue  sorting  (assignment  strategy)  when  the  system  is  customized  and

therefore  adapt  it  to  the  respective  requirements.  Each  operation  is  weighted  with  the  corresponding

factors  based  on  the  assignment  strategy.  The  operations  are  then  sorted  accordingly  and  then

distributed to the workplaces.

Operation
9820 010

Operation
9217 020

Operation
0282 010

Operation
2963 010

Operation
4927 020

Operation
6238  020

?

Various  bottleneck  and  scheduling  resources  can  be  defined  for  scheduling  within  the  planning  horizon

(the  specification  is  made  in  the  group).  When  you  schedule  operations  within  the  planning  horizon,

resources are checked, i.e. the system checks availability of all resources not only of workplaces.

Apart from the required demand and the possible elements that meet the demand, capacity planning also

takes  into  account  further  restrictions,  such  as  maximum  time  intervals  between  two  operations  to  be

synchronized.

2.1.2  Controlling capacity selection

How  operations  are  distributed  to  the  individual  workplaces  can  be  controlled  using  the  adjustable

capacity selection in the planning variants.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 7 of 12

Rule-Based Machine Assignment

Operation
9820 010

Operation
9217 020

Operation
2963 010

Operation
0282 010

Operation
6238 020

Operation
4927 020

Alternatives for the production of an operation

A

?

B

?

C

?

The following alternatives are available:

The first free capacity

The capacity that is available first in terms of time.

Capacity having the most "capacity"

Selects the capacity that provides the most available capacity with respect to the planning horizon.

Capacity having the least "capacity"

The capacity is selected which, with respect to the planning horizon, provides the least capacity.

Shortest processing time

When attempting to dispatch operations, the order in which capacities are selected is based on the

shortest processing time (while taking into account performance level).

Please  note:  This  is  of  particular  significance  in  conjunction  with  alternative  production  methods

(production variants), since these provide certain values used in calculating process times.

Shortest setup time

When attempting to dispatch operations, the order in which capacities are selected is based on the

shortest  setup  time.  Dynamic  setup  times  based  on  the  increases  or  reductions  in  setup  time

defined in the setup change matrix are taken into consideration.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 8 of 12

Rule-Based Machine Assignment

Constraints  within  the  order  network  are  appropriately  taken  into  consideration  during  automatic

scheduling.  Operations  that  are  already  running  are  not  rescheduled.  If  an  assignment  is  not  possible

because there are overlaps with the predecessor or successor operations, for example, the operation is

not scheduled and appears in a list at the end of automatic planning.

During automatic assignment, fixed operations that are still set in the past are moved to the right and set

to "now" plus planning lead time at the earliest. Fixed operations in the future are not modified, but remain

scheduled as they are.

2.1.3  Complete assignment of planning board

Automatic assignment of the entire planning board is accessed using the icon

 in the toolbar. A

dialog opens from which the following options can be selected:

Schedule unplanned operations only (pre-assignment)

Using  this  option  operations  that  are  in  the  pool  of  groups  are  weighted  according  to  the  current

assignment strategy and distributed to/ scheduled for the workplaces of the group. Operations that have

already been scheduled remain scheduled in their position (workplace, date).

If  an  assignment  is  not  possible  because  there  are  overlaps  with  the  predecessor  or  successor

operations,  for  example,  the  operation  is  not  scheduled  and  appears  in  a  list  at  the  end  of  automatic

planning.

Reschedule entire planning scenario

If  all  operations  are  to  be  rescheduled,  select  option  "Reschedule  all".  In  this  case,  all  workplaces  for

operations already scheduled, and that are not fixed or running, are scheduled first, that is moved to the

pool of groups before automatic assignment takes place.

After this has been confirmed, the separate workplaces are now assigned. In the process, all operations

in  the  pool  of  groups  are  weighted  according  to  the  current  assignment  strategy.  These  operations  are

then distributed/ dispatched to the workplaces in the group.

If  an  assignment  is  not  possible  because  there  are  overlaps  with  the  predecessor  or  successor

operations,  for  example,  the  operation  is  not  dispatched  and  appears  in  a  list  at  the  end  of  automatic

planning.

2.2  Planning strategies/priority rules

A planning strategy/ priority rule  specifies a priority code (PKZ) for each of the operations transferred to

the queue.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 9 of 12

Rule-Based Machine Assignment

In  addition  to  the  predefined  strategies  in  the  system  -  rule-based  machine  assignment  -  user-defined

strategies  are  also  possible  (target-oriented  rules  and  sorting).  Whether  or  not  individual  planning

algorithms  can  be  used  for  this  purpose  depends  on  the  license.  Planning  algorithms  are  selected

through selecting a planning variant.

2.2.1  Rule-based machine scheduling

Lowest setup costs

The setup costs equal the sum of setup time + teardown time.

The  operation  in  the  queue  having  the  lowest  setup  costs  for  the  machine  in  question  gets  the

highest  priority  (dynamic  setup  times  are  not  included;  these  times  are  used  with  the  capacity

selection).

Shortest operation time

Operation time = setup time + processing time + machine teardown time

The operation in the queue having the shortest operation time gets the highest priority.

Shortest remaining processing time

The operation in the queue having the shortest remaining processing time gets the highest priority.

The  remaining  processing  time  is  calculated  using  the  remaining  run  time  formula  stored  for  the

operation.

Longest operation time

Operation time = setup time + processing time + machine teardown time

The operation in the queue having the longest operation time gets the highest priority.

Longest remaining processing time

The operation in the queue having the longest remaining processing time gets the highest priority.

The  remaining  processing  time  is  calculated  using  the  remaining  run  time  formula  stored  for  the

operation.

2.2.2  Variable machine assignment

Planning  strategy  for  controlling  automatic  machine  assignment  based  on  customer-specific  sorting

criteria (sorting rules).

The sorting rule calculates a priority number for each of the operations presented. It works more or less

like a sifter in which ultimately only the highest priority operation in the queue is trapped. If, for example,

only one operation is left over after the first sorting criterion is processed, this operation is scheduled as

the next one and the other sorting criteria are not further considered.

The  configuration  used  to  create  sorting  rules  is  described  here.  The  possible  sorting  criteria  are  also

described there.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 10 of 12

Rule-Based Machine Assignment

By default, automatic assignment is carried out in the following sequence:

Sequence

1  Scheduled start (date) of operation
2  Priority of operation
3  Order buffer time (from scheduling)
4  Order index of the order
5  HYDRA order number (order/OP number)

Sorting
Ascending
Descending
Ascending
Descending
Ascending

2.2.3

Target-oriented machine assignment

Planning strategy for controlling automatic machine assignment based on weighted targets.

This planning strategy involves indexing the operations to be scheduled according to a variable weighting

and  then  sorting  the  queue  according  to  this  index.  In  contrast  to  priority  rules,  the  actual  target  is

weighted in this case, and assignment is then aligned with the target.

The  configuration  used  to  create  sorting  rules  is  described  here.  The  possible  sorting  criteria  are  also

described there.

2.3  Other notes

Please note the following:

Taking wait time into consideration

The wait time defined in the operation is NOT taken into consideration in planning (automatic assignment

or manual assignment). This wait time is considered being a wait time for planning purposes that is thus

only considered as buffer time when it comes to scheduling the lead time.

Planning variants and basic settings

You can make different settings for the time horizons and the automatic assignment in the  Basic settings

and  in  the  Planning  variants.  If  you  do  not  select  a  planning  variant  in  the  Graphic  planning,  the  basic

settings are used. The following graphic shows the logic applied for the use of the different settings.

Rule-Based Machine Assignment

Version: 1.0.23049

Page 11 of 12

Rule-Based Machine Assignment

The internal priority rule (sorting rule) of the planning component is as follows:

Sequence

1  Scheduled start (date) of operation
2  Priority of operation
3  Order buffer time (from scheduling)
4  Order index of the order
5  HYDRA order number (order/OP number)

Sorting
Ascending
Descending
Ascending
Descending
Ascending

Rule-Based Machine Assignment

Version: 1.0.23049

Page 12 of 12

Has a planning variant been selected?yesnoUse the settings from the selectedplanning variantIs there the SYSTEM planning variant?yesnoUse the settings from the SYSTEM planning variantUse the settingsfrom HYDRA basic settingsGeneral capacity selection: first available capacityPlanning strategy: see arrowDoes the planning variant include a planning strategy?yesnoUse the planning strategyassignedDoes the default planningstrategy exist? (hls_prioregel.verweis =1)yesnoUse thisplanningstrategyThe internalprio rule of the planning component is used

