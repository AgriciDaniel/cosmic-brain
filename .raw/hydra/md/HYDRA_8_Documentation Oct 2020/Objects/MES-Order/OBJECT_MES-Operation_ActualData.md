Current Status Information on the Operation

1  Current Status Information on the Operation

This document describes the current status information, actual data and KPIs pertaining to an operation.

Basically, this data results from the operation-related data collection in BDE (Shop Floor Data Collection).

The document data structure of operation describes the operation data.

The below-described data is available in some applications. The categories used there might deviate from

the  categories  mentioned  below.  It  is  not  a  fault  if  a  piece  of  information  is  not  available  in  a

report/evaluation.

Status

Status (LED), status text

The status represents the current condition of an operation. Possible statuses are:

 prepared:

 running

the operation has not yet been started

the operation is currently being logged on

 automatically interrupted:

the  operation  is  currently  being  logged  on  but  has  been

interrupted  automatically  at  the  end  of  the  shift  due  to  the  shift

 interrupted

 finished:

Status since

automatic.

the operation has been interrupted.

the operation has been logged off.

Time since the order status is available.

Predecessor status

Status of the predecessor operation. This status indicates  whether the predecessor operation has

already been started and thus material, which will be further processed in the current operation, has

already been processed or produced.

The  predecessor  status  only  affects  one  order.  The  predecessor  status  of  the  first

operation of an order is always "finished", no matter if there is a preceding operation in

another order due to a relationship (order network).

Secondary status

Displays the currently set secondary status.

See here to change the secondary status.

Please note: You can configure secondary statuses for specific projects while customizing HYDRA.

Resource status

By default, the resource status refers to "person", "tool", "material".

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 1 of 9

Current Status Information on the Operation

See here to change the resource status.

Target times

The document entitled data structure of operation describes the target times. Further data:

Total target setup time

Target setup time + dynamic setup time + target retooling time

Execution time

Total target setup time + processing time

Target labor utilization

The target labor  utilization  refers to the  workforce requirements planned for the  processing  of the

operation. Only relevant with BDE-AEV, otherwise the field is 0. As part of a customization, you can

have the field completed via the interface.

Buffer time

HYDRA Scheduling, if activated, calculates the buffer time.

The system determines the buffer time from the difference between the latest start date (LST) and

the earliest start date (EST) for an operation.

Please note: The system stores the total of buffer times of all operations in the  Order (header) in

the field OP buffer.

Reducible time

HYDRA Scheduling, if activated, calculates the reducible time.

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available (basic end date will be exceeded), then HYDRA will attempt to take reduction measures to

shorten the lead time accordingly. Reducible times are the wait times and the transport time.

This value indicates how many (more) hours can be reduced from the lead time of an order. This

time results from the sum of the:

- difference from the current waiting time and the minimum waiting and the

- difference from the current transport time and the minimum transport time

Reducible time = (current waiting time - minimum waiting time) + (current transport time - minimum

transport time). These differences are displayed here as totals.

The document entitled bde-bk.doc describes the configuration of reduction strategies in the section

reduction strategies.

You can find further information in the section Reduction of the Glossary (bde-glos.doc).

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 2 of 9

Current Status Information on the Operation

Target production time per piece (time/piece)

The  time  per  piece  is  the  calculated  target  duration  per  1  or  1000  produced  units  of  the

corresponding quantity unit (primary). The calculation includes the cycle time and partitioning of the

operation.

Example: The quantity unit is pieces. The time per piece is calculated for min/piece and min/1000

pieces. Calculation is as follows:

min/piece

for the unit (cycle time (sec/1000) / 1000 / 60) * partitioning

min/1000 pieces: for the unit (cycle time (sec/1000) / 60) * partitioning

Actual times

Updating of actual times depends on the workplace. When it comes to an individual workplace assigned

to a terminal with operation mode "MDE", times are updated cyclically approximately every two minutes

or  when  the  machine/workplace  status  is  changed  the  next  time.  In  case  of  a  group  workplace  or  an

individual workplace that is not assigned to a terminal or to a terminal with operation mode "BDE", times

are only updated when the operation is interrupted or logged off.

Setup time

Times posted onto the resource performance account 7 (SET)

Processing time

Times posted onto the resource performance account 11 (MUT)

Execution time

Setup time + processing time

Downtime

Sum total of the times posted to the resource performance accounts 1 - 6 and 8-10.

Occupancy time

Setup time + processing time + downtime

Lead time

The lead time results from the period of time between:

- the first logon of the operation and

- the last logoff of the operation (if the operation is finished) or

- the last interruption (if the operation is not finished).

Lead times are synchronized based on the Gregorian calendar (the shift calendar is not taken into

account).

The lead time is 0 if no difference can be calculated (between logging on and off).

Wait time 

The wait/idle time includes those times of the lead time during which the operation was not logged

on.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 3 of 9

Current Status Information on the Operation

Times  are  calculated  based  on  the  BDE  log  records.  Lead  times  are  synchronized  based  on  the

Gregorian calendar (the shift calendar is not taken into account).

The wait time is 0 if there is only one log record for an operation.

The total of wait times of all operations does not necessarily have to correspond to the

order's wait time. This is particularly true if you produce operations simultaneously.

Transition time 

The transition time of an operation refers to the time period between

- the (last) actual logoff of the current ("preceding") operation and

- the (first) actual logon of the next ("subsequent") operation. The transitional time is 0 if two OPs

coincide.

Transition times are synchronized based on the Gregorian calendar (the shift calendar is not taken

into account).

Please note: According to technical literature, the transition times often represent the largest share

of  the  lead  time.  In  contrast  to  this,  the  occupancy/assignment  time  often  only  amounts  to

approximately 10-20%.

Personnel deployment/labor utilization

Labor time posted onto the operation.

Actual labor  utilization  is updated  when the person is logged off from the operation  or the person

logs off from the OP.

Actual production time per piece (time/piece)

The  time  per  piece  is  the  calculated  actual  duration  per  1  or  1000  produced  units  of  the

corresponding quantity unit (primary). The calculation includes the cycle time and partitioning of the

operation.

Example: The quantity unit is pieces. The time per piece is calculated for min/piece and min/1000

pieces. Calculation is as follows:

min/piece:

for the unit (actual cycle (sec/1000) / 1000 / 60) * partitioning

min/1000 pieces:  for the unit (actual cycle (sec/1000) / 60) * partitioning

Please note: You cannot calculate and view the actual time per piece for prepared operations.

Remaining run time

Remaining run time

Calculated remaining run time as per remaining run time formula 1.

The remaining run time is even calculated for finished  operations - this applies for the

RRT formula 1 and the RRT formula 2.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 4 of 9

Current Status Information on the Operation

Remaining run time 2

Calculated remaining run time as per remaining run time formula 2.

KPIs

Target activity

The operation-related activity describes the quantity produced or to be produced per hour.

Target activity = Target quantity [primary quantity unit] / target processing time

The  term  "activity"  is  also  used  in  another  context  (e.g.  in  HYDRA  MDE).  There,  the

term has another meaning (calculation rule).

Actual activity (gross)

Actual gross activity

= Yield [primary quantity unit] / Assignment/occupancy time

= Yield [primary quantity unit] /  RPA 1 - 11

Actual activity (net)

Actual net activity = Yield [primary quantity unit] / RPA 11

Activity [%]

Activity [%] = Actual net activity / target activity

Target run time

The run time specifies the planned or required processing time in the format hrs.min:sec.

The  target  run  time  corresponds  to  the  target  processing  time  (see  document  data  structure  of

operation).

Actual run time (gross)

Actual run time (gross) =  RPA 1 - 11

Actual run time (net)

Actual run time (net) = RPA 11

Run time [%]

Run time [%] = Actual run time (net) / target run time

Target remaining run time

Remaining run times are shown in the format hrs.min:sec. They can also be negative.

Target remaining run time = Target run time - actual run time (gross)

HYDRA  Shop  Floor  Scheduling  (HLS)  uses  the  formula  defined  in  the  field  "formula

RRT 1" to calculate the processing time or remaining run time.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 5 of 9

Current Status Information on the Operation

Remaining run time (gross)

Remaining run time (gross)

=  Actual  assignment  time  /  Yield  *  Quantity  that  is  still  to  be

produced

= Actual assignment time / Yield * (Target quantity - Yield)

The quantities in primary quantity unit are used as target quantity and yield.

Remaining run time (net)

Remaining run time (gross)

=  Actual  processing  time  /  Yield  *  Quantity  that  is  still  to  be

produced

= RPA 11 [sec] / Yield * (Target quantity - Yield)

The quantities in primary quantity unit are used as target quantity and yield.

Yield/target quantity [%]

Yield/target quantity [%] = 100 / Target quantity * Yield

The quantities in primary quantity unit are used.

Setup [%]

Setup [%]   = 100 / Target setup time (total)  * Actual setup time

= 100 / Target setup time + Additional setup time  + Target retooling time * RPA 7

Processing [%]

Processing [%]   = 100 / Target processing time * Actual processing time

= 100 / Target processing time * RPA 11

Labor utilization [%]

Labor utilization [%] = 100 / Target labor utilization * Actual labor utilization

The target labor utilization can be transferred according to the customer's requirements

via the ERP interface.

Utilization efficiency (rate of capacity utilization)

Rate of capacity utilization

=  100  /  Actual  assignment/occupancy  time  *  Actual  processing

time

= 100 /  (RPA 1 - 11) * RPA 11

Throughput rate

Produced quantity/lead time (DLZ)

Formula: yield.primary / DLZAG

DLZAG= (operation logoff – operation logon (first logon))

Use the formula trp_ag to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 6 of 9

Current Status Information on the Operation

Production process ratio

Main production time/lead time (DLZ)

Formula: rpa11/ DLZAG * 100

DLZAG= (operation logoff – operation logon (first logon))

Use the formula ppr_ag to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Actual to planned scrap ratio

Scrap quantity/planned scrap quantity

Formula: scrap.primary / operation.plan.scrap.primary *100

Use the formula psc_ag to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Scrap ratio

Scrap quantity/ produced quantity

Formula: scrap.primary / (yield.primary + scrap.primary + rework.primary + problem.primary) * 100

Use the formula scr_ag to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Rework ratio

Rework quantity / produced quantity

Formula: rework.primary / (yield.primary + scrap.primary + rework.primary + problem.primary) * 100

Use the formula rew_ag to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Allocation ratio

Assignment time/lead time

Formula: BLZ / DLZAG * 100

BLZ = total occupancy/assignment time = BMK1-11

DLZAG= (operation logoff – operation logon (first logon))

Use the formula all_ag to  customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

You cannot change the formula components DLZAU and/or DLZAG.

The  KPIs  throughput  rate,  production  process  ratio,  actual  to  planned  scrap  ratio,  scrap  rate,

rework ratio and allocation ratio are only available if you enable the upgrade. orst82.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 7 of 9

Current Status Information on the Operation

RPA

SUT…BKS

Order-related times posted onto the relevant resource performance account.

Personnel deployment/labor utilization

Labor times posted onto the operation.

Total duration

Sum total of the times posted to the resource performance accounts 1 - 11.

Postings

First logon

Point in time when the operation was first logged on.

Last logon

Point in time when the operation was last logged on.

Last interruption

Point in time when the operation was last interrupted.

Last logoff

Point in time when the operation was last logged off.

Further data

This paragraph is not restricted to a special category of MOC applications.

Actual cycle

The system calculates the operation-related actual cycle as follows:

1) OP prepared: by definition the actual cycle is 0.

2)  OP  logged  on:  the  actual  cycle  is  the  current  actual  cycle  from  the  MDE  machine  connection.

The application Workplaces/machines (transaction code wpov) also shows the actual cycle.

3)  OP interrupted or logged off/finished: The system calculates an average cycle time. To calculate

the average cycle time, divide the main production time posted onto the operation (RPA 11) by the

total  number  of  cycles  posted  onto  the  operation.  The  system  only  calculates  the  average  cycle

time for these order  postings (no recalculation, e.g.  after changes  in the maintenance  of postings

dialog).

Please note for order-related KPIs 

When calculating  order-related  KPIs (identified  with the icon   in the  document), the system integrates

those operations matching the below-mentioned criteria:

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 8 of 9

Current Status Information on the Operation

  Data can be entered for the operation (flag at the operation)



It is a "normal" operation or a split master (individual splits are not taken into account).

  The operation pertains to an active sequence.

  The operation is neither inactive nor deleted (control indicators <> "Y“ and <> "D“).

Merged operations are not taken into account.

A program integrated in the HYDRA Scheduler calculates order-related KPIs (identified by ) at

cyclic intervals (by default: once a day). Further information on how to activate this program can

be found here.

OBJECT_MES-Operation_ActualData.docxVersion: 1.10.18468

Page 9 of 9

