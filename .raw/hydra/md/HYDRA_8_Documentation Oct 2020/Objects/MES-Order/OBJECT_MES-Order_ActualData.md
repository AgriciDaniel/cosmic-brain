Status information on the order

1  Status information on the order




This document describes the current status information and actual data pertaining to an order. Basically,

this  data  results  from  the  operation-related  data  collection  in  BDE  (Shop  Floor  Data  Collection).  The

document Data structure of order describes basic operation data.

The  below-mentioned  data  is  available  in  certain  applications.  The  categories  used  there  might  deviate

from  the  categories  mentioned  below.  It  is  not  a  fault  if  a  piece  of  information  is  missing  in  a

report/evaluation.

Status

Order status (LED and text)

The order status represents the status of a whole production order. Possible statuses are:

 prepared:

the order has not yet been started.

 started:

the order has already been started.

 finished:

the order has been finished.

Status since

Time since the order status exists.

Progress

Number of OPs

Total  of  operations  for  which  you  can  enter  and  post  data,  i.e.  operations  with  an  assigned

processing code that is set to the "recordable" option.

Finished OPs

Total of the finished, recordable operations, i.e. operations for which you can record and post data

and that are assigned the status "finished" or "archived".

Remaining run time 

Total  of  remaining  run  times  (RRT  formula  1)  of  all  recordable  operations  pertaining  to  the  order

that have not yet been finished. Remaining run times that return negative results due to the formula

calculation are processed as "0".

Remaining run time 2 

Total  of  remaining  run  times  (RRT  formula  2)  of  all  recordable  operations  pertaining  to  the  order

that have not yet been finished. Remaining run times that return negative results due to the formula

calculation are processed as "0".

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 1 of 8

Current operation

The operation that is logged in with the highest operation number within the order network of the current

Status information on the order

order.

Current OP sequence

Reserved.

Current OP number

Reserved.

Current OP split

Reserved.

Current OP name

Reserved.

Current target quantity of OP

Reserved.

Current OP unit

Reserved.

Current yield of OP

Reserved.

Quantities

Target quantity

Base quantity from the order header. This quantity and all quantities that follow are entered in base

quantity unit!

Target scrap

Base quantity from order header

Unit

Yield

Base quantity unit from the order header

Recorded yield in base quantity unit of the last operation that can be recorded/posted for the order.

It is not the "current operation", as this quantity is currently not significant since the order itself has

not  yet  delivered  a  quantity  when  production  is  still  running  and  only  half  of  the  OPs  have  been

processed at that point in time.

A program integrated in the HYDRA Scheduler identifies the last recordable operation of the order

at regular intervals (by default: once a day). You can find further information on how to activate this

program here.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 2 of 8

Status information on the order

To  do  so,  you  have  to  store  the  conversion  factors  from  primary  quantity  unit  to  base

quantity unit in the operation. The same also applies to scrap, rework and open quantity.

Scrap

Sum of the scrap quantities entered for all operations posted in base quantity unit.

Irrespective of whether data can be entered/posted or if the OP is active/inactive.

Rework

Sum of the rework quantities entered for all operations posted in base quantity unit.

Open quantity

Sum of the open quantities entered for all operations posted in base quantity unit.

Target times

Planned lead time

HYDRA Scheduling,  if activated,  calculates the  planned lead time. You can calculate the planned

lead time from the difference between the scheduled end and the scheduled beginning of the order,

compared to the Gregorian calendar.

Minimum lead time

HYDRA Scheduling, if activated, calculates the minimum lead time of the order. The minimum lead

time results from the difference between the  planned lead time and the time that can  be reduced

(see below).

Order buffer

The scheduling each results in the buffer of the order relating to the required date. The basic end

date stands for the required date. You can determine the order buffer from the difference between

the  basic  end  date  and  the  scheduled  end  date.  Once  this  buffer  gets  negative,  the  order  is

delayed.

OP buffer

HYDRA  Scheduling,  if  activated,  calculates  the  OP  buffer.  This  buffer  results  from  the  total

operation  buffers  of  the  individual  operations  pertaining  to  the  order.  You  can  calculate  the

operation buffer from the difference between the latest start date (LSD) and the earliest start date

(ESD) of the operation.

Reducible time

HYDRA Scheduling, if activated, calculates the reducible time. This time represents the sum total of

reducible  times  affecting  all  operations  pertaining  to  the  order.  This  value  indicates  how  many

(more) hours can be reduced from the lead time of an order.

Target setup time

Total of setup time, additional setup time and retooling time of all active operations.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 3 of 8

Status information on the order

Target processing time

Total of the processing time of all active operations.

Target execution time

Total of planned setup time and planned processing time.

Personnel deployment/labor utilization

Total target labor utilization of all recordable, active operations.

Delivery time

Total delivery time of all recordable, active OPs assigned to the "external processing" option.

Waiting time

Total waiting time of all recordable, active OPs.

Wait time

Total wait time/idle time of all recordable, active OPs.

Transport time

Total transport time of all recordable, active OPs.

Actual times

Retention period of order

The retention period of the order results from the period of time between:

- when the order was first transferred from the PPS system ("order release" = creation date of the

order header in HYDRA) and

- when the last active operation of the order is actually logged off (chronological order). The

retention period of the order is 0 as long as the order has not yet been finished.

Please note:

We cannot identify or take into account if

- the PPS system transfers the order for the first time or

- the order has meanwhile been deleted and resent due to technical problems.

In case an order is transferred several times and the previous order is deleted with each transfer,

the creation date of the order header coincides with the last data transfer (chronological order).

Lead time

The order duration results from the period of time between:

- the first logon of an operation of the order and

- the logoff of the last active operation (chronological order). The lead time is 0 as long as the order

has not yet been finished.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 4 of 8

Status information on the order

Setup time

The setup time of the order is based on the total setup times (RPA 7) of all active operations that

can be posted.

Processing time

The processing time of the order is based on the total main production times (RPA 11) of all active

operations that can be posted.

Downtime

The downtime of the order is based on the total downtimes (RPA 1 to 6, RPA 8 to 10) of all active

operations that can be posted.

Occupancy time

The occupancy/assignment time is based on the total setup times (RPA 7), processing times (RPA

11) and downtimes (RPA 1...6, RPA 8...10) of all active operations that can be posted.

Personnel deployment/labor utilization

Total labor utilization of all active operations of the order that can be posted.

Transition time 

The transition time refers to the total transition times of all operations.

The transition time of an operation refers to the time period between

- the (last) actual logoff of the current ("preceding") operation and

- the (first) actual logon of the next ("subsequent") operation. The transition time is 0 if two OPs

coincide.

Times  are  synchronized  based  on  the  Gregorian  calendar  (the  shift  model  is  not  taken  into

account).

Please note: According to  technical literature, transition times often represent the largest share of

the  lead  time.  In  contrast  to  this,  the  occupancy/assignment  time  often  only  amounts  to

approximately 10-20%.

Wait time/idle time 

The  order-related  wait  time  results  from  times  during  which  no  operation  of  the  order  was  logged

on.  Consequently,  this  time  includes  the  operation-related  wait  times.  You  can  identify  the  "gaps"

using the BDE log records  with record type U/E.

Times  are  synchronized  based  on  the  Gregorian  calendar  (the  shift  model  is  not  taken  into

account).

The  total  wait  time  of  all  operations  does  not  necessarily  have  to  correspond  to  the

order's wait time. This is particularly true if you process operations simultaneously.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 5 of 8

Personnel deployment/labor utilization

The labor utilization of the order is the total of personnel deployment times of all active operations

Status information on the order

that can be posted.

RPA

SUT…BKS

Total of the times posted to the relevant resource performance account of all active operations.

Actual dates

Order start date/time

Results from the start of the earliest operation.

Order end date/time

Results from the end of the last operation logged off (chronological order). Empty, as long  as the

order has not been finished/archived.

Deviations

Yield/target quantity [%]

100 / Target quantity * yield

Setup [%]

Total (100 / target setup * RPA7) of all finished operations that can be posted.

Processing [%]

Total (100 / target processing * RPA11) of all finished operations that can be posted.

Labor utilization [%]

Total (100 / target labor utilization * labor utilization) of all finished operations that can be posted.

KPIs

Displayed in % including 2 decimal places

Utilization efficiency (rate of capacity utilization)

Relation of the processing time (RPA 11) compared to the assignment/occupancy time (RPA 1...11)

in percent.

Setup ratio

Relation  of  the  setup  time  (RPA  7)  compared  to  the  assignment/occupancy  time  (RPA  1..11)  in

percent.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 6 of 8

Status information on the order

Throughput rate

Produced quantity/lead time (DLZ)

Formula: yield.primary / DLZAU

DLZ= (order end (logoff of last OP) – order start (first logon of first OP of order))

Use the formula trp_au to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Production process ratio

Main production time/lead time (DLZ)

Formula: rpa11/ DLZAU * 100

DLZAU= (order end (logoff of last OP) – order start (first logon of first OP of order))

Use the formula ppr_au to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Actual to planned scrap ratio

Scrap quantity/planned scrap quantity

Formula: scrap.primary / order.plan.scrap.base *100

Use the formula psc_au to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Scrap ratio

Scrap quantity/ produced quantity

Formula: scrap.primary / (yield.primary + scrap.primary + rework.primary + problem.primary) * 100

Use the formula scr_au to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Rework ratio

Rework quantity / produced quantity

Formula: rework.primary / (yield.primary + scrap.primary + rework.primary + problem.primary) * 100

Use the formula rew_au to customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

Allocation ratio

Occupancy time / lead time

Formula: BLZ / DLZAU * 100

BLZ = total occupancy/assignment time = RPA1-11

DLZAU= (order end (logoff of last OP) – order start (first logon of first OP of order))

Use the formula all_au to  customize the calculation. If the formula management does not include

this formula, you have to create the formula in order to change the calculation.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 7 of 8

Status information on the order

You cannot change the formula elements DLZAU and/or DLZAG.

The  KPIs  throughput  rate,  production  process  ratio,  actual  to  planned  scrap  ratio,  scrap  rate,

rework ratio and allocation ratio are only available if you enable the upgrade orst82.

Information on order-related KPIs 

When calculating order-related KPIs (in this document identified with the icon  ), the system integrates

all operations of an order matching the below-mentioned criteria:

  You can enter/post data for the operation ("recordable" option at the operation)



It is a "normal" operation or a split master (individual splits are not taken into account).

  The operation pertains to an active sequence.

  The operation is neither inactive nor deleted (control indicators <> "Y“ and <> "D“).

Merged operations are not taken into account.

A program integrated in the HYDRA Scheduler calculates order-related KPIs (identified by ) at

regular  intervals  (by  default:  once  a  day).  You  can  find  further  information  on  how  to  activate

this program here.

OBJECT_MES-Order_ActualData.docx  Version: 1.7.18468

Page 8 of 8

