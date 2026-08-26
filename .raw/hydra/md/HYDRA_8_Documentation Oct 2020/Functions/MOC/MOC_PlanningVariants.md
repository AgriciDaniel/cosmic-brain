Planning Variants

1  Planning Variants

Overview

Menu

Master data  Production control  Planning variants

Transaction code

plvar

Function authorization  mdplvar

Purpose

Use this function to create or modify planning variants in the system.

Integration

A planning variant combines specific settings that are relevant for the planning. The settings included in a

planning variant are usually used by the function Automatic assignment.

Requirements

The Priority rule used is defined in the system.

Selection criteria

The application provides the following selection criteria:

Planning variant

Enter  the  required  search  criterion  to  search  for  a  planning  variant.  Please  note  case  sensitivity.

You can also use wildcards.

Personal

This checkbox is a "tri-state" checkbox that can have three different states:

 Only those planning variants are selected that are not identified as personal.

 Only those planning variants are selected that are identified as personal.

 All planning variants are selected.

Field descriptions

Planning variant

Name of the planning variant

Comment

Comment

MOC_PlanningVariants.docx

Version: 1.6.18468

Page 1 of 3

Planning Variants

Owner

User name of the owner of the variant.

Personal

If a planning variant is identified as personal, only the person who created this variant can use or

edit it.

Planning lead time

Period of time that the planning function identifies as lead time; result: no assignment is made. The

period of time specified is the minimum time that is required to implement a planning.

Planning time fence

After  an  automatic  scheduling  run,  the  system  automatically  fixes  the  operations  that  start  in  the

specified planning time fence if the relevant option is enabled in the HLS settings. This means that

the planning time fence must not be larger than the planning horizon.

Priority rule

You  can  select  a  strategy  for  the  automatic  planning.  You  can  select  from  preconfigured  rules

(HLS-RBM) and self-configured rules (HLS-VMB; HLS-ZMB). The following preconfigured rules are

available:

-

Lowest setup costs: to calculate the setup costs, setup time + teardown time are totaled (dynamic

setup times are not integrated).

-  Shortest operation time: operation time = setup time + processing time + teardown time

-  Shortest  remaining  processing  time:  the  remaining  processing  time  is  calculated  using  the

remaining run time formula stored for the OP.

-

-

Longest operation time: operation time = setup time + processing time + teardown time

Longest  remaining  processing  time:  the  remaining  processing  time  is  calculated  using  the

remaining run time formula stored for the OP.

Displacement to the left

In case of an automatic planning of operations, this option can specify different start dates for the

scheduling. Condition: The start of the operation must be within the planning horizon.

If  this  option  is  disabled,  then  the  scheduled  start  date  will  be  the  earliest  possible  date  (forward

scheduling) or the latest possible start date (backward scheduling).

If the option is enabled, the "left shift" is activated and the scheduled start date is set to "now" plus

planning lead time. In other words, an attempt is made to plan the operation as early as possible.

This option ignores the scheduling result, i.e. you can plan the operation before the

earliest  start  date.  If  the  scheduling  is  performed  in  the  higher-level  system,  we

recommend to disable this option.

MOC_PlanningVariants.docx

Version: 1.6.18468

Page 2 of 3

Capacity selection

The Capacity selection controls for which capacity, i.e. workplace, the operation is planned that is next in

Planning Variants

the queue and must be planned next.

The first free capacity

The capacity that is available first in terms of time.

Capacity having the most "capacity"

Selects the capacity that provides the most available capacity with respect to the planning horizon.

Capacity having the least "capacity"

Selects the capacity that provides the least available capacity with respect to the planning horizon.

Shortest processing time

Selects  the  capacity  where  the  processing  time  is  the  shortest  (calculation  includes  the

performance level).

Note: This is important with production variants because the values to calculate the process times

can change. The capacity that is available first in terms of time.

Shortest total setup time (static + dynamic)

This  rule  for  capacity  selection  integrates  the  static  and  dynamic  setup  time  when  assigning

operations  to  a  workplace.  If  this  option  is  set,  the  system  always  assigns  the  operation  to  the

workplace  where  the  total  of  static  and  dynamic  setup  time  is  the  lowest.  If  two  machines  have

identical  setup  times,  the  system  selects  the  workplace  with  the  number  that  comes  first  in

alphanumeric order.

Shortest static setup time

Selects the capacity where the static setup time is the shortest.

Highest priority

If  this  option  is  set,  this  rule  for  capacity  selection  uses  the  priority  of  the  production  variant

(assigned to the relevant workplace) to assign an operation to a workplace.

If you do not use production variants, all workplaces have the same priority. The system selects the

workplace that provides available capacities first. If two workplaces (production variants) have the

same  priority,  the  system  selects  the  workplace  that  provides  available  capacities  first.  If  two

workplaces  provide  available  capacities  at  the  same  time,  the  system  selects  the  workplace  with

the  number  that  comes  first  in  alphanumeric  order.  If  there  are  two  production  variants  using

different tools, the system selects the production variant using the tool with the number that comes

first in alphanumeric order.

Note:  The  higher  the  priority  value  of  a  production  variant,  the  greater  the  probability  that  this

variant is used.

MOC_PlanningVariants.docx

Version: 1.6.18468

Page 3 of 3

