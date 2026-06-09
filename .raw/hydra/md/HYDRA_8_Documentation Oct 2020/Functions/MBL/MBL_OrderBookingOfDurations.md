Posting of Times

1  Posting of Times

1.1  General

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

MBL_OrderBookingOfDurations.docx

Version: 1.2.18468

Page 1 of 4

Posting of Times

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

MBL_OrderBookingOfDurations.docx

Version: 1.2.18468

Page 2 of 4

Posting of Times

Please note:

The determination of durations when status postings are recorded online at the terminal (or via PDM) only

takes into account a limited number of shifts relating to the point in time of the last posting made for this

machine.

However, durations might be missing or faulty in BDE log records if no postings (order postings, personal

postings, status changes, shift changes, or similar) are entered for a machine over a longer period of time

(e.g. the terminal is shut down).

1.2  Special features

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

MBL_OrderBookingOfDurations.docx

Version: 1.2.18468

Page 3 of 4

Posting of Times

Synchronize labor utilization with the person's HYDRA BDE shift model

Cross-system configuration in the basic parameter settings of HYDRA.

HYDRA-ADE waiting period processing

Cross-system configuration in the basic parameter settings of HYDRA.

Merged operations

If  several  operations  are  grouped  into  a  merged  operation,  the  times  are  distributed  onto  the  individual

operations according to different configurations.

Split operations

Further information on how to post split operations or their split master can be found here.

MBL_OrderBookingOfDurations.docx

Version: 1.2.18468

Page 4 of 4

