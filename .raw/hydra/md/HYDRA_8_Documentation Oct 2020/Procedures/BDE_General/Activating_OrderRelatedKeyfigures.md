Order-related KPIs

1  Order-related KPIs

Purpose

Different order-related key  performance  indicators (KPI) and  information  are not calculated  online  when

requesting  data  but cyclically by a  program started by the HYDRA Scheduler. This affects the following

KPIs and information:

KPIs relating to operations

  Transition time - operation

  Wait time - operation

KPIs relating to orders

  Last recorded operation: the yield of the order is taken from this operation.

  Current operation

  Remaining  run  time  of  the  order:  Total  of  remaining  run  times  (remaining  run  time formula  1)  of  its

operations

  Remaining run time 2 of the order: Total of remaining run times (remaining run time formula 2) of its

operations

  Transition time: order

  Wait time: order

The HYDRA Scheduler automatically calculates KPIs via a batch job with the following configurations.

Requirements

Meet  the  following  requirements  to  show  the  above-mentioned  KPIs  and  information  in  the  MOC

applications:

  Provide the following programs/files on the server:

o  adekeyfigures.exe/out version 8.1.1.2 or higher

o  adekeyfigures.scr

o  db_sql\dbp_adekeyfigures.hsc version 1.80899 or higher

  Run the following database patches:

o  hydscr db_sql\dbp_adekeyfigures.hsc >.\tmp\ dbp_adekeyfigures.log

o  hydscr db_sql/dbp_adekeyfigures_wait_time_between_ops.hsc

>.\tmp\dbp_adekeyfigures_wait_time_between_ops.log

Activating_OrderRelatedKeyfigures.docx  Version: 1.3.20937

Page 1 of 4

Order-related KPIs

These patches calculate KPIs for all available operations. This process might take a

while depending on the data volume.

Check entries in the two log files:

  Enable the entry "Order Keyfigure Calculation“ in the HYDRA Scheduler:

  Windows command: sh.exe ./adekeyfigures.scr AUNR=*

Linux command: ./adekeyfigures.scr AUNR=*

Procedure

If the HYDRA Scheduler does not include this entry, use a patch to create it:

  Windows:  hydscr db_sql/dbp_adekeyfigures.hsc

  Linux:

hydscr.out db_sql\dbp_adekeyfigures.hsc

Then, enable the entry in the HYDRA Scheduler.

As  an  alternative,  you  can  also  enter  the  settings  manually  in  the  HYDRA  Scheduler  (please  leave

unmentioned fields empty):

Field

Command tab

Type

Category

Visible

Active

HYDRA user

Command (Windows)
Command (Linux)

Comment

Fixed point in time tab

Hour

Minute

Value

S (Standard)

F (Fixed)

Visible

0

sh.exe ./adekeyfigures.scr AUNR=*
./adekeyfigures.scr AUNR=*

Order Keyfigure Calculation

0

30

We recommend  running  the  program  only  once  a  day  (at  night),  as  it  affects  the  entire  online

order data. Customers may only disregard this recommendation in individual cases if it is sure

that the entire system load will not be affected.

Result

The following applications, among others, show the calculated data:

Activating_OrderRelatedKeyfigures.docx  Version: 1.3.20937

Page 2 of 4

Order-related KPIs

  Order overview

  Order profile

  Lean Performance Analysis

1.1  Miscellaneous

Integration of archived orders

HYDRA 7 calculated  wait times upon data request. The order overview and order profile showed  these

wait times. The system calculated all requested data, no matter if they were  archived. This has changed

with HYDRA 8. HYDRA 8 calculates some KPIs, such as the wait time, at cyclic intervals and stores the

result with the object. The Scheduler triggers this cyclic job that "only" integrates online data. Therefore,

this calculation does not affect archived data.

If  you  want  to  calculate  the  KPIs  for  archived  order  data,  you  can  start  the  KPI  program  as  of  version

8.1.1.6 once or multiple times (depending on the parameters). Normally, the Scheduler triggers this KPI

program cyclically.

You can run the program using the following parameters or a combination of these parameters:







/ARCHIV

/MAXRUNTIME

/LAST_LOGOFF

ARCHIV parameter

Only edits archived orders.

MAXRUNTIME parameter

Defines  a  maximum  runtime  for  the  program.  Specifies  the  runtime  in  minutes.  The  default  value  is  60

minutes.

LAST_LOGOFF parameter

Only  edits  orders  with  at  least  one  operation  finished  during  the  defined  period  (starting  today  until  the

specified LAST_LOGOFF date). Specify the date in the following format: MM/DD/YYYY

If  after  reaching  the  maximum  runtime,  the  program  identifies  that  the  archive  still  includes  orders  that

have  to  be  calculated,  the  program  records  this  information  in  a  log  file  entitled  adekeyfigures.pro.  You

can find this file here: <System>\err\adekeyfigures.pro.

Activating_OrderRelatedKeyfigures.docx  Version: 1.3.20937

Page 3 of 4

Order-related KPIs

Example:

*********************************************************************

02.02.16 17:49 max. runtime (30 min) reached  => program stop

02.02.16 17:49 please restart the program to calculate 134827 remaining orders!

*********************************************************************

Once the program has calculated all archived orders, the output can look as follows:

*********************************************************************

02.02.16 17:51 keyfigure calculation in archive finished!

*********************************************************************

Example with all available parameters:

  Windows:  sh.exe ./adekeyfigures.scr /ARCHIV /MAXRUNTIME=60 /LAST_LOGOFF=01/01/2014

  Linux:

./adekeyfigures.scr /ARCHIV /MAXRUNTIME=60 /LAST_LOGOFF=01/01/2014

Wait time between operations

The patch dbp_adekeyfigures_wait_time_between_ops.hsc generates an INI entry including the following

data at the end of processing:

Name:

Section:

ADEKEYFIGURES

AG

Key:  WAIT_TIME_BETWEEN_OPS

Value:

Active

Y

This  INI  entry  activates  the  calculation  of  wait  times  between  operations.  This  processing  is  quite  time-

consuming.  You  should  disable  the  processing,  if  you  do  not  need  the  KPI  "wait  time  between

operations".

Activating_OrderRelatedKeyfigures.docx  Version: 1.3.20937

Page 4 of 4

