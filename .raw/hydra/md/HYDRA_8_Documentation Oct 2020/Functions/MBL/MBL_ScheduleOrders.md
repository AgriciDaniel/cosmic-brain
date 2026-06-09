Lead Time Scheduling

1  Lead Time Scheduling

Usage

You use the lead time scheduling function if you are set up to use HYDRA shop floor scheduling and your

PPS/ ERP system does not allow for lead time scheduling to calculate operation-related basic dates.

Integration

Lead  time  scheduling  calculates  operation-related  basic  dates  based  on  order-related  basic  dates  –

earliest  start,  earliest  end,  latest  start,  latest  end.  Operations  are  scheduled  between  these  dates  in

HYDRA shop floor planning so as to assure that the order-related basic finish date is maintained.

Requirement

The following requirements must be met in order for orders to be scheduled by lead time scheduling:

  The order type can either be relevant for scheduling or relevant for detailed planning (customized

setting).

  The  order  status  can  either  be  relevant  for  scheduling  or  relevant  for  detailed  planning

(customized setting).

  The  operation  status  can  either  be  relevant  for  scheduling  or  relevant  for  detailed  planning

(customized setting).

  The  operation  is  flagged  based  on  its  processing  code  as  either  relevant  for  scheduling  or

relevant for detailed planning (customized setting).

This document will provide a description of which order types and status, or which

processing  code,  are  flagged  as  relevant  for  scheduling  or  relevant  for  detailed

planning at the time of delivery.

  Scheduling is activated as a cyclic job in the scheduler (Script hls_term.scr).

1.1  Procedure

Lead  time  scheduling  determines  the  start  times  and/or  end  times  for  all  operations  of  an  order  and

consequently  also  for  the  order  itself.  Lead  time  scheduling  includes  both  forward  and  backward

scheduling. In the operation, forward scheduling determines the earliest start (earliest start time/EST) and

the  earliest  end  (earliest  end  time/EET)  while  backwards  scheduling  determines  the  latest  start  (latest

start time/LST) and the latest end (latest end time/LET).

MBL_ScheduleOrders.docx

Version:

Page 1 of 6

Lead Time Scheduling

Defining the EST/EET

In order to define EST/EET, you have the option to specify the production order start date; otherwise the

current  time  will  be  set.  However,  the  planning  lead  time  defined  in  the  HYDRA  basic  settings  is  also

included in the calculation of the current time so that the earliest start date is  "now" + the planning lead

time. When calculating the dates, the system takes the so called factory calendar (i.e. the shift calendar

that is designated as "factory calendar") into account.

Example

The  following  shifts  are  defined  in  the  factory  calendar:  5:45  a.m.  -  8:00  a.m.,  8:15  a.m.  -  11:30  a.m.,

12:00 noon - 1:45 pm, …; in the HYDRA basic settings 5 hours of planning lead time are set.

Start of scheduling: 10:20 a.m.

Calculation: 10:20 a.m. + 5 hours + 0:30 hours for shift break (11:30 a.m.-12:00 noon)

Results: The earliest start time for scheduling is therefore 3:50 pm

Defining the LST/LET

Either the production order finish date (customer deadline,  delivery date) or the  earliest end time of the

production order is used to define the LST/LET.

Processing times

The total processing time is calculated for the individual operations for scheduling purposes. This total

processing time is derived from the sum of the process times (durations) defined for the operations

- wait time

- setup time

- processing time/ remaining run time (see below)

- dismantling time/retooling (teardown) time

- idle time

- transport time

These  process  times  are  either  set  explicitly  (manually  or  via  interface)  or  calculated  using  defined

formulas.

Processing time/ Remaining run time

The processing time/ remaining run time is calculated based on the remaining run time formula defined in

the  operation.  In  this  context,  the  performance  level  defined  for  the  workplace/  at  the  machine  is  taken

into consideration. If the operation has not yet been planned in detail, then the performance level is used

that is defined for the planned group.

MBL_ScheduleOrders.docx

Version:

Page 2 of 6

Lead Time Scheduling

During scheduling, the available capacity is considered, calculated based on the results of the shift model

-  year  model  field  or  otherwise  the  year  model  defined  as  deviating  planning  model  at  the  planned

workplace.  If  the  operation  is  not  yet  assigned  to  any  individual  workplace,  the  group  shift  calendar  is

used. Exceptions to this are transition times that - depending on the transition time - are matched to the

Gregorian calendar or even to a specific shift calendar (transport time).

Please  pay  attention  to  the  fact  that  the  default  values  that  are  used  for  calculating  the

remaining  run  time  formula  are  edited/maintained  completely/correctly  at  the  operation,  for

new operations that are included in the pool of groups and that have not yet been planned.

Production variants are not taken into account for lead time scheduling.

Affected orders

Orders that match the following criteria are scheduled with lead time:

  The order is of the order type 0, 2, 3, 5 or 6.

  The order status is prepared or started.

If these order-related criteria are met, then in continuation the following operations are considered.

Affected operations

  The operation status is prepared, running, interrupted or automatically interrupted.

  The  operation  is  flagged  based  on  its  processing  code  as  either  relevant  for  scheduling  or

relevant for detailed planning (customized setting).

In the standard delivery, all operations receive the processing code SYSTEM. This is flagged as

either relevant for scheduling or relevant for detailed planning.

General processing

The individual operations of the order are considered and started with scheduling, beginning with the first

operation relevant for scheduling that is not yet finished. For operations already planned for workplaces,

the planning dates are interpreted as scheduled dates (regardless of their scheduled dates), because it is

assumed that the operation is processed by this date. If, on the other hand, the planning dates are set in

the past, then they are ignored, i.e. the operation is rescheduled.

If the EET of an operation is later than the basic finish date of the production order, or the LST is earlier

than the basic start date of the production order, then the basic finish date of the production order cannot

be met. If a reduction strategy was assigned to the production order, then based on this strategy, a step-

by-step attempt is now made to shorten the total duration of the order so that the basic finish date is not

exceeded.

MBL_ScheduleOrders.docx

Version:

Page 3 of 6

Lead Time Scheduling

Each  order  is  scheduled  independently  of  the  other  orders.  The  scheduling  result  valid  for  the  order

(scheduled start time, scheduled end time) is defined based on the scheduling type in the order header. If

no scheduling type is defined, then the scheduling type defined in the HYDRA basic settings is used.

If the order's basic start date is set in the future, then backwards scheduling sets the basic start date to

"now + planning lead time". As a result, the basic start date of the order is ignored.

For  operations  that  have  the  planning  indicator  at  the  processing  code  set  to  "N",  processing  time  is

treated as zero regardless of the processing times defined. In doing so, the start date of such operations

is set to equal the scheduled finish date of the preceding operation and the finish date set to equal to the

start date of the subsequent operation.

Planned operations are scheduled "as usual" (the planning dates are not taken into consideration). EST

and  LST  are  calculated.  After  scheduling  is  completed,  the  planning  dates  will  overwrite  the  scheduled

dates.

For running operations, the planned finish date is calculated and scheduling is continued from that time

on.

Continued scheduling after OP end

If  a  finished  operation  is  set  in  the  past,  the  earliest  start  (in  forward  scheduling)  of  the  successor

operation  is  calculated  based  on  the  idle  time,  transport  time  and  wait  time.  If  the  earliest  start  is  >

planning lead time, the earliest start of the successor is set to earliest start = now + planning lead time +

wait time.

Results of scheduling

Results of lead time scheduling are updated dates for each operation.

The  difference  between  LST  and  EST  yields  the  buffer  time  for  an  operation.  Operations  with  negative

buffer times are deemed critical, because every delay to such an operation would result in a delay in the

production order.

Calculating the order buffer or the delay when the buffer is negative:

This  value  is  derived  from  the  difference  between  the  latest  finish  date  (=requirement  date)  and  the

order's  scheduled  end  time.  Thus,  the  only  way  to  make  this  buffer  positive  is  by  using  forward

scheduling. If the buffer is negative, then the order is late.

1.2  Reduction measures

It is possible to apply reduction measures as part of lead time scheduling:

If  it  turns  out  during  scheduling  that  the  lead  time  for  a  given  order  is  longer  than  the  allotted  time

available, then the system will attempt to take reduction measures to shorten the lead time accordingly.

MBL_ScheduleOrders.docx

Version:

Page 4 of 6

Lead Time Scheduling

Lead times are reduced in increments. To this end, the operation is repeated until either the deadline is

met  or  the  maximum  reduction  has  been  reached  and  it  becomes  inevitable  that  the  deadline  will  be

exceeded. In which steps each reduction takes place in the operation is defined by the reduction strategy

that is referenced accordingly in the order header (Index tab Dates).

The reduction strategy can be applied to reduce the times listed below:

  Wait time, down to which, based on the steps of the reduction strategy, reductions can be made

(at most: minimum value).

  Transport time, down to  which, based on the  steps of the reduction strategy, reductions can be

made (at most: minimum value).

By  scheduling  using  the  reduction  strategy  described  above  you  can  reduce  the  lead  time  in  order  to

meet the requirement date. Each result (reduction level) is recorded in the order header.

Please note:

The reduction strategies are defined during HYDRA customizing.

1.3  Executing lead time scheduling

The  actions  listed  below  cause  an  order  to  be  scheduled.  Keep  in  mind  that  only  those  orders  are

scheduled that meet the criteria described in operation flow:

  When an order or a separate operation is created this order will run through lead time scheduling.

This applies equally to orders that are transferred via interface from the ERP/ PPS system as well

as to those that were created manually.

  Planning,  re-planning  and  deallocating  (removing)  operations  in  HYDRA  shop  floor  scheduling.

Keep in mind here that scheduling does not run until after the planning has been saved.

  Modifications  made  to  the  operation  manually  using  the  operation  editing  functions  at  the  client

will cause the operation to be rescheduled or will initiate scheduling:

o  Modification of the workplace

o  Modification of the "external processing" flag

o  Modification of a target quantity

o  Modification of a target cycle

MBL_ScheduleOrders.docx

Version:

Page 5 of 6

Lead Time Scheduling

o  Modification  of  process  times  (also  by  changes  to  parameters  contained  in  formulas):

Lead time, wait time, setup time, additional setup time, processing time, inspection time,

dismantling/teardown time, idle time, synchronization time, transport time, delivery time

In  all  cases,  the  order  number  of  the  order  to  which  a  modification  was  made  is  stored  in  a  table

(ade_auto_verarb).

A  process  runs  through  each  of  the  orders  listed  in  the  table  cyclically.  The  periodicity  in  which  this

operation is started is set in the schedulerand it should be defined based on the system.

Scheduling can also be initiated manually. The relevant functions are described here.

MBL_ScheduleOrders.docx

Version:

Page 6 of 6

