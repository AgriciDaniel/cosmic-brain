Basic Settings

1  Basic Settings

Menu

Master data System settings  Basic settings

Transaction code

setup

Function authorization

setup

Incorrect and/or subsequent changes can seriously affect the complete data collection process.

For this reason, make the below configurations before system implementation.

Most parameter changes only become effective once HYDRA has been restarted.

Purpose

The system-specific configurations in the basic settings define the specifications that apply for the complete

system.  The  basic  settings  therefore  control  the  processing  in  the  different  subsystems  (e.g.  terminal,

posting, etc.).

Integration

A multitude of applications and functions use the specifications defined here. Refer to the documentations

of the applications for descriptions of the settings/configurations made for an application.

Field descriptions - General

HYDRA version

Entry of the HYDRA Kernel version. This number is used to inform the customer and can be used to

perform HYDRA-internal checks. In general, the software modules work with several versions and

can distinguish between the versions.

Kernel version

Entry of the serial number of the HYDRA Kernel within the HYDRA version. This number is used to

inform  the  customer  and  can  be  used  to  process  HYDRA-internal  inspections.  This  enables  the

software modules to detect whether the installed kernel supports specific processing types or not.

Project name

The  project  name,  which  is  predefined  by  MPDV,  is  used  to  control  individual  customer-specific

processing  methods  and  is  entered  during  implementation.  For  default  systems  "HYDRA"  will  be

used as project name.

MOC_Setup.docx

Version: 1.32.21891

Page 1 of 25

Basic Settings

MW3.x: Customer number

The  MPDV  customer  number  is  entered  here.  The  modules  are  licensed  on  the  server  and  the

customer number is used to request the license keys. For this reason

- correctly use the customer number;

- you must not change the customer number.

MW4.0pe: Installation ID

Enter  the MPDV installation ID. The modules are  licensed on the server and the installation ID  is

used to request license keys. For this reason:

- correctly use the installation ID

- and you must not change the installation ID.

System number

You use a unique system number for security reasons. The number entered here is printed in front

of  the  badge  number  when  personal  badge  cards  are  printed.  When  clockings  are  made  on  a

terminal, a validation check is made for this entry. Because of this check, third-party badge cards

cannot make postings in this system.

Must be defined by the customer before implementation when existing badge cards are used.

If you use dormakaba terminals, this system number (dormakaba: company number) is checked

as mandatory parameter. For this reason, this field must not remain empty because otherwise

the badge card cannot be read. If you enter a minus sign "-", this check is skipped. Optionally,

you  can  also  prefix  the  system  number  by  the  minus  sign  and  directly  store  it  in  the  terminal

configuration.

For security reasons, always operate a PZE/ZKS system with system number.

Length of personnel no., fill characters for personnel no.

The 'Length of personnel no.' and 'Fill characters for personnel no.' data fields are used to define the

conversion of the numeric personnel number from the PZE system into the alphanumeric personnel

number in the BDE system.

The only fill character permitted is "0". If "0" is used as fill character, HYDRA will format the personnel

number aligned to the right and will adapt it to the length of the personnel number with leading zeros.

You must not change the length of the personnel number offhand, if the system already includes

personal data. A change of length will imply that data existing at that point in time in the database

will have to be converted explicitly.

MOC_Setup.docx

Version: 1.32.21891

Page 2 of 25

Basic Settings

When Windows terminals are used, the new dialogs must be created in advance.

You must restart the system after a change.

If you must change the lengths, please contact MPDV Support beforehand.

Must be defined by the customer before implementation.

Length of badge number

The length of the staff badge number is specified. The specified length is used for validation checks.

Change length: If you change the length of the badge number, the system automatically changes

the already existing badge numbers to this new length.

If you reduce the length of the badge number, an error message is issued if badge numbers exist

in the HR master data or in the Badges where the places you want to delete are not filled with

zeros. Also historical data valid in the past is included in this validation check. The system checks

all data and it does not matter whether users have access to this data. The badge numbers are

also checked if the customer does not use the access control.

If the length of the badge number must be reduced despite error message, this can only be made

by MPDV as part of a custom service that will be charged. The data responsible that the badge

number length cannot be reduced must be identified. The handling of this data is then coordinated

specifically. Data consistency must always be guaranteed in the process and any badge number

(also historical numbers) must be unique in the system at any time. If required, contact MPDV.

The barcode of a staff badge is composed of:

-

-

-

length of the system number

length of the badge number (max. 10 digits)

1 check digit

You must restart the system after a change.

If you use Windows terminals, you must first create new dialogs.

MOC_Setup.docx

Version: 1.32.21891

Page 3 of 25

Must be defined by the customer before implementation.

Basic Settings

Length of upload number

If you want to enter OP postings via the upload number on Windows terminals (CTWIN / CTAIP), you

can define the field length here. Note the following:

- The length must be identical to the actual upload/confirmation number that is transferred by the PPS

system and/or generated in HYDRA.

- If you enter the confirmation/upload number as barcode, it must always have the complete length.

Numeric  confirmation/upload  numbers  will  not  be  filled  to  the  length  defined  in  the  HYDRA  basic

parameter settings.

Must be defined by the customer before implementation.

Confirmation/upload number

This option can be used to define whether the confirmation number is generated in HYDRA or not. If

the confirmation/upload number is transferred from the PPS system, this option must be set to "Do

not generate".

You use the MOC application Number ranges to define the number ranges.

The number ranges are usually defined by the customer in the PPS. If HYDRA is used as leading

system  for  the  generation  of  number  ranges,  the  customer  must  define  this  before

implementation.

Length of order no./ operation number

In  HYDRA,  the  posting  ID  is  always  the  entire  order/operation  number  (the  so-called  MES  order

number). This is always the combined number consisting of order number and OP number. If you use

sequences  and/or  splits,  the  fields  "sequence  number"  or  "split  number"  are  added  to  the

"order/operation number".

You can change the length of the order and operation number  in specific system areas but they must

be constant within the overall system. This configuration must be made before transferring data to

the system for the first time. The above configuration specifies at the same time the format of the

operation's barcode that is used to make postings for the operations in the system.

Note: It can also be required to make changes in the number range management.

Maximum value: order number:

Maximum value: operation number:

20

10

MOC_Setup.docx

Version: 1.32.21891

Page 4 of 25

Basic Settings

By default, the number range management provides configurations based on order numbers with

a length of eight characters that can be used for the following orders:

  overhead cost or waiting period orders (order type: GKP, GKM), if the order number is

generated automatically.

  merged operations (MOP). The system assigns a separate order number to these

operations when they are created.

If  the  order  number  length  deviates,  you  must  also  change  the  length  in  the  number  range

management.

Must be defined by the customer before implementation.

Length of the sequence number

This input field is only enabled if the relevant license is available .

For SAP customers, HYDRA provides the opportunity to integrate parallel or alternative sequences

(condition: this must be possible in the interface). In this case,  you have to define which rounding

precision shall apply for the sequence number in HYDRA.

Maximum value: 6

Must be defined by the customer before implementation.

Length of split number

This input field is only enabled if the relevant license is available .

In contrast to the previous versions of HYDRA (HYDRA 7 and below), it is no longer the last digit of

an operation that is used to specify a split number. Instead, the split number is transferred to a field

of its own. The length of the split number is defined here.

Maximum value: 2 (this results in a maximum of 99 split operations per operation; with a split number

length of 1, an operation can be split into a maximum of 9 split operations).

The terminal input fields are adjusted accordingly (dynamic dialogs have to be activated once more).

The split number is not shown in the sequencing list on the terminal. As a rule, the split number is not

important to the operator. OPs are split for planning reasons. Consequently, the split number only

becomes visible, once the OP has been selected from the sequencing list and entered in the input

field of the posting dialog.  If required, the split number can  also be shown at other places on the

terminal.

MOC_Setup.docx

Version: 1.32.21891

Page 5 of 25

Basic Settings

The total length of all fields must not exceed 25 digits. If DOS-based terminals are used, the total

length of all fields must not exceed 16 digits.

You  must  not  change  the  length  of  numbers  offhand,  if  the  system  already  includes  orders.

Among others, you must proceed as described below:

1) Back up database

2) Explicitly convert the data that already exists in the database (MPDV services)

3) Change number range management

4) If Windows terminals are used: unload (back up) existing dialogs and generate new dynamic

dialogs

5) Restart HYDRA and all terminals

6) Test

You can only do this, if no one is working (no shift), since no orders/ operations must be logged

on during the conversion.

If  you  must  change  the  lengths,  please  contact  MPDV  Project  Management  in  good  time

beforehand.

Must be defined by the customer before implementation.

Currency unit

Use this field to show a currency unit that is displayed in different HYDRA applications.

Please note: The currency will not be processed (e.g. converted).

Time lag for requesting lists

Reloading  lists  when  shifts  change  strongly  charges  the  system.  You  can  use  the  "Time  lag  for

requesting lists" option to define the time lag (OFSLST) between terminal groups for reloading lists.

This way, a better distribution of the load is possible.

Ten  points  in  time  are  calculated  when  the  terminals  are  started.  Each  of  these  points  in  time  is

delayed by the value entered in the 'Time lag' field. At each of the calculated points in time, a group

of terminals starts. If the terminal numbers are sequence numbers, the delay is allocated using the

numbers so that the groups have a similar size.

MOC_Setup.docx

Version: 1.32.21891

Page 6 of 25

Basic Settings

Example:

Time lag: 10 seconds; 35 terminals are connected (terminal numbers 1-35).

The formula ((terminal number - 1 ) % 10) * OFSLST will lead to the following behavior when

shifts change:

At the time of a shift change:

1, 11, 21, 31

lists are reloaded

10 seconds later

2, 12, 22, 32

again 10 seconds later: 3, 13, 23, 33

again 10 seconds later: 4, 14, 24, 34

again 10 seconds later: 5, 15, 25, 35

again 10 seconds later: 6, 16, 26

again 10 seconds later: 7, 17, 27

again 10 seconds later: 8, 18, 28

again 10 seconds later: 9, 19, 29

again 10 seconds later: 10, 20, 30

...

...

...

...

...

...

...

...

...

Field descriptions "BDE"

BDE maintenance based on events

This  mode  activates  the  function  of  the  tabular  event  maintenance  as  editing  function.  The

maintenance of posting function can still be used to evaluate HYDRA postings but corrections will no

longer be possible.

If this option is not set, the tabular event maintenance function is disabled, i.e. you can no longer edit,

correct  and  recalculate  events.  In  this  case,  you  can  correct  entered  data  via  the  Order-related

postings.

Editing of scrap with reason (partial quantity postings)

This  option  is  no  longer  evaluated  since  MES  Weaver  2.0.  In  principle,  partial  quantity  postings

(postings of the "T" record type) can now be shown and edited in the Order-related postings.

Generating MDE postings

This  option  is  required  to  execute  MDE  evaluations/reports  if  terminals  without  machine  data

collection are used. In this case, MDE postings are generated using the BDE module.

If this option is not set, no MDE postings are generated.

Posting manual quantities as automatic quantities

Use this option to book manual  quantities as  automatic ones,  i.e. the  quantities are booked to all

operations and persons logged on.

MOC_Setup.docx

Version: 1.32.21891

Page 7 of 25

Basic Settings

Only merged operations generated on the terminal are excluded. In this case, manual quantities are

only booked via specific posting functions for merged operations.

If this option is not set, manual quantities are only booked for the logged-on OP.

This option only affects postings at MDE machines, i.e. the machines assigned to an MDE terminal.

Only activate this option after consultation with MPDV.

Enhanced split function

If you are authorized, you can split operations in the tabular or graphic order sequencing of the BDE

module or in the graphic planning board of the HLS module.

Once you have enabled this option, the split function is converted from the "simple" split function to

the "advanced" split function.

Booking production time to MUT during break

This option is used to book production times arising during a break defined in a shift model to the

RPA main utilization time (MUT) and as labor utilization. Downtime periods during the break will be

booked to the RPA of the break (FP) and be hidden in the labor utilization.

If this option is not set, the break duration defined in the shift model will, in general, be booked to the

RPA  of  the  break  (FP)  and  hidden  in  the  labor  utilization  even  when  the  production  was  running

during this period.

See also the example based on the following configuration.

Proportionate RPA posting in personnel postings

Using this option, the system makes proportionate bookings for the number of parallel logons of a

person (number of operations and machines) to the person-related resource performance accounts

in the log records of record type U, E and B.

If this option is not set, no proportional RPA booking is made.

This function cannot be used together with the following other settings:

Basic settings  BDE tab  Process merged operations  "Standard time (terminal)" or

"Default quantity (terminal)"

Terminal configuration  MF functions  Generation  "Per machine"

Synchronizing labor times with the person's BDE shift model

The times accumulated in "resource performance accounts", the "labor utilization" in the personnel

postings  and  the  "labor  utilization"  in  the  order  postings  are  synchronized  with  the  employee's

personal shift model.

MOC_Setup.docx

Version: 1.32.21891

Page 8 of 25

Basic Settings

To do so, store a personal shift model in the  HR master data of the person concerned. If 0 or an

inexistent model is stored in the personal shift model, the person's times will be synchronized with

the machine's shift model.

If a person is  logged on  longer than specified  in the  shift model defined for them, this time is not

posted to the resource performance accounts and the labor utilization. The posting times/logon times

themselves are not changed.

Also the breaks are identified and posted according to the personal shift model.

Generating log record "finish OP"

If this option is active and you finish the operation via the Order overview and the function "operation

status", a corresponding record (posting with the record type "E") is generated and the operation is

set to the status "E". This record is transferred to the higher-level PPS system.

If you use the "change status" function to "finish" the complete order, a final posting is generated for

all operations of the order and their status is set to "E".

If this option is not set, the system does not generate a final posting. When you finish an operation

or order, only the operation status is set to "E".

Check for PZE clock-in

This option is used to check if a person is present in the PZE system when this person logs on to a

machine or when there is an advance logon to a machine. If this the person is not present in the PZE

system, the system will refuse the staff logon and/or advance logon to the machine.

N

No check

Validation check is inactive

J

Check with staff logon

Validation check is only activated for staff logons

M

Check with staff logon and advance logon (MDE)

Validation check is activated for staff logons and advance logons

Processing of merged operations

The  documentation  Processing  of  Merged  Operations  describes  the  possible  options  and  their

processing.

Sequencing list with OP logon

Defines whether a sequencing list based on machines or machine groups is used.

Subject to the production structure and depth of production control, the user uses this configuration

to control the selection list of operations that can be logged on.

MOC_Setup.docx

Version: 1.32.21891

Page 9 of 25

Basic Settings

M

G

Sequencing list based on machines/workplaces. The sequencing list only shows those OPs

that are actually planned (in detail) for the workplace/machine.

Specific  to  groups.  The  sequencing  list  shows  those  OPs  that  are  either  planned  for  the

current workplace or another workplace of the group or that are still located in the pool for

the group.

You  can  override  this  system  setting  if  you  select  the  "sequencing  list"  option  in  the  workplace

configuration.

RPAs to calculate labor times

If this option is set, you must specify the times that are used to calculate the labor utilization.

If this option is not set, all times are used for the labor time (e.g. breaks).

This  option  is  used  in  combination  with  the  option  Post  production  time  to  MUT  during

break. See the following example

The  following  example  illustrates  the  two  configuration  options  above.  It  is  assumed  that  all  RPA  times

except RPA 12 "BKS" (break) are used for the calculation according to option RPAs for calculating labor

time.

Machine/WP

Setup (SET)

Beginning of shift
6.00 a.m.

Shift break

9.15 a.m.   9.30 a.m.

Shift break

12.00 noon

       12.30 p.m.

End of shift

14.00 p.m.

7.00 a.m.

10.00 a.m.   10.30 a.m.   11.30  12.10 p.m.

Production (MUT)

Malfunction (DCI)

Break (BKS)

OP 1234  010

Person 9997

HYDRA Basic Parameter Settings

(1)

(2)

[X]

[X]

Post production to main utilization (MUT) during break

RPAs for calculating labor times: all RPAs except "BKS" (breaks)

Postings generated by HYDRA (depending on option set):

MOC_Setup.docx

Version: 1.32.21891

Page 10 of 25

Basic Settings

(1) [   ]

(2) [   ]

RPA SET  1:00 hrs.

RPA DCI

00:30 hrs.  Personnel deployment/labor utilization*   7:15

hrs.

RPA MUT  5:15 hrs.

RPA BKS  1:15 hrs.

(1) [X]

(2) [   ]

RPA SET

 1:00 hrs.

RPA DCI

00:30 hrs.

Personnel

deployment/labor

utilization*

7:50 hrs.

RPA MUT  5:50 hrs.

RPA BKS

00:40 hrs.

(1) [   ]

(2) [X]

RPA SET

1:00 hrs.

RPA DCI  00:30 hrs.

Personnel

deployment/labor

utilization*

6:45 hrs.

RPA MUT

5:15 hrs.

RPA BKS  1:15 hrs.

(1) [X]

(2) [X]

RPA SET

 1:00 hrs.

RPA DCI  00:30 hrs.

Personnel

deployment/labor

utilization*

7:20 hrs.**

RPA MUT

 5:50 hrs.

RPA BKS  00:40 hrs.

*

**

Assumption: 1-machine operation
If several machines are operated the posting will be proportional

the following times are deducted: 10:00 - 10:30 AM and 12:00 - 12:10 PM

Interfacing to the Engel Monitoring System (EMS)

If this option is enabled, Windows terminals can be connected to the Engel Monitoring System (EMS):

-  HYDRA terminals can trigger the transfer of CNC data via EMS

-  data will then be adopted from the EMS, instead of a machine interface

-  Via EMS HYDRA data will directly be shown on machine displays

When interfacing to the Engel Monitoring System is activated, the following additional Configuration

options are available in HYDRA:

PZE (IN/ OUT) controls BDE

Optionally,  clocking  records  pertaining  to  the  Time  &  Attendance  module  (PZE)  may  trigger

processing in BDE (Shop Floor Data Collection). You can use the waiting period processing between

logoff and logon of persons in BDE; it does not matter if and how it is used in the PZE module. The

following options are available for integration with PZE:

"PZE  controls  BDE"  is  only  processed  if  the  IN/OUT  clocking  is  performed  at  a  PZE

terminal.  If  you  create  IN/OUT  clockings  using  the  MOC  application  Labor  time

maintenance, this does not affect the function "PZE controls BDE".

MOC_Setup.docx

Version: 1.32.21891

Page 11 of 25

With  the  functions  "PZE  controls  BDE",  a  BREAK  clocking  (beginning  of  break)  is

processed like an OUT clocking. The end of break clocking is an IN clocking.

Basic Settings

N

No control

Postings made in the Time and Attendance do not affect the BDE.

K

Waiting period

If this option is in use, you must activate the option "Activate waiting period processing"

described below.

When clocking-in, the person is automatically logged  on to a  waiting period operation in the shop

floor data collection system (BDE).

If the user logs on to a production OP during the "waiting period", the duration between the clocking-

in and the logon to the production operation is posted to the logged on operation. The logon time of

the production operation is postdated to the PZE posting.

The system generates a "waiting period posting" as soon as the waiting period is exceeded. Data

posted to the production order is not changed. This processing also applies for the times between

the logoff and logon of staff during working time.

The person is automatically logged off with clock-out. If the person was no longer logged on to an

operation at the time of the clock-out, a waiting period posting is generated for the time between last

logoff of the person and clock-out. This is even the case if the waiting period is not exceeded.

The operation is interrupted automatically, if the last person who works on the operation clocks out

(see note below).

A

Auto-in

If this option is in use, you must activate the option "Activate waiting period processing"

described below.

Waiting  period  processing  (as  described  in  the  "waiting  period"  section  above)  is  enabled.  If  an

operation  where  the  person  worked  is  interrupted  automatically,  this  operation  is  logged  on

automatically with the first IN clocking of a person. Requirements for the logon: this operation must

not be running or this operation has already been finished.

Example:

If five employees are logged on to an operation and they clock out one after the other, the

operation will be interrupted automatically, as soon as the last employee clocks out.

If one of these employees clocks in first the next time, we speak of the "first clock-in of a

person". When the employee clocks-in, the operation is logged on again.

MOC_Setup.docx

Version: 1.32.21891

Page 12 of 25

Basic Settings

The logon takes place at the workplace where the person and the operation were logged on before

he or she clocked out.

If it is a single workplace, all persons who are already active are connected to the new operation and

the new person is connected to all operations that are already active at this workplace.

G

Out

If an employee clocks out, then he  or she will automatically be  logged off from all  operations and

orders. If the last person logged on to an operation logs off, then the operation will be interrupted.

The waiting period processing is not active with this mode.

The operation is not interrupted when the last person logs off

- if resources are logged on to the operation or

- if inspection operations are linked to the operation.

In these cases, the logoff of the person via PZE clocking depends on the workplace type

or order type:

If it is a group workplace or an overhead cost operation, then the PZE clocking logs off the

person. The last active/logged on person cannot be logged off automatically because in

this case one person must always be logged on to the operation.

It is recommended to log on/off or interrupt the operation via explicit postings

- if resources are logged on to the operation or

- if inspection operations are linked to the operation.

Rounding 1st staff logon

This option defines whether the first person logging on to a workplace on the work day is rounded to

the

first

clock-in

of

the

same

day.  This

processing

is

only

effective

if:

-  the  previous  field  "PZE  (in/out)  controls  BDE"  is  set  to  "waiting  period"  or  "auto  in"  and

- the clock-in triggers the staff logon. The first clock-in is then prematurely rounded according to the

rounding  mode  rules  (PZW).  This  rounding  is  usually  performed  later  as  part  of  the  work  day

evaluation. Here, the rounding is performed early to identify the time of the logon to the workplace.

This rounding does not affect the actual work day evaluation.

Waiting period processing BDE

Activate waiting period processing

To activate the personal waiting period processing, set this option; and fill the following fields.

Proceed as described in the link to enable waiting period processing in the system.

MOC_Setup.docx

Version: 1.32.21891

Page 13 of 25

Basic Settings

Waiting time

Use this field to specify a time frame in minutes if waiting period processing is activated. This field

specifies the maximum time that can pass between the clock-in of an employee and the logon to an

operation. The field also specifies the maximum time that an employee has between logoff from an

operation and logon to the next operation. If this waiting period is exceeded, the system will post the

excess time to the stored waiting period operation.

Max. waiting period

The maximum waiting period specifies the maximum duration (time gap) that HYDRA waits before

discarding waiting period postings. The system always generates a waiting period posting, if waiting

period processing is enabled. At the end of a working day, the waiting period posting starts at the

time  an  employee  logs  off  last  and  ends  with  the  first  logon  on  the  next  day  if  this  posting  is  not

interrupted by a clock-out with  an  active  option  "PZE controls  BDE".  Define the maximum waiting

period, if you want to suppress this data record spanning two working days of an employee. If you

set the maximum waiting period to 0, no waiting period bookings are discarded.

RPA

The waiting period must be posted to an RPA account. Enter an account to do so. Note that you can

only enter the number of the account, such as 9 for RPA U8 or 10 for RPA U9. These accounts are

free accounts and can be used for waiting periods without affecting the events.

Posting to OP

Combined order/OP number. The waiting period is booked for the specified operation. This way, the

individual events can be tracked. You can also define a waiting period OP in the HR master. This OP

then takes priority over the waiting period OP defined in the basic parameter settings. The document

dealing  with  personal  waiting  period  processing  describes  how  to  identify  waiting  period  OPs.  A

posting is only performed for times; quantities, etc. are not posted.

You can only change  a  waiting  period operation,  if no person  is  logged on to this

waiting  period  OP  at  the  time  of  the  change.  The  personnel  overview  indicates

whether a person is logged on to the currently entered waiting period operation.

Only assign operations of the order type "GKP".

Configure  additional  settings  in  the  HR  master  in  order  to  use  waiting  period

processing.

Waiting period processing of machines

Activate waiting period processing

To activate the machine-related waiting period processing, set this option; and fill the following fields.

MOC_Setup.docx

Version: 1.32.21891

Page 14 of 25

Basic Settings

Lower waiting period/ RPA for unplanned times

Only active, if the configuration for the "waiting period processing of the machine" is enabled:

Times shorter than this waiting period (specified in minutes) are posted to the resource performance

account 11 of the production order. This production order will be logged on after this non-productive

interval.

The  system  generates  a  separate  machine-based  overhead  cost  order  for  non-productive  times

greater than or equal to this waiting period interval. This overhead cost order posts the time to the

resource performance account specified in the configuration (RPA for unplanned times).

If you want to post times shorter than the waiting period to another resource performance account of

the  production  order,  define  this  with  respect  to  machines/workplaces  in  the  Advanced  object

configuration as of HYMW Version 8.1.1.512. Use the following parameters:

Object type

BDE

Object ID1

WAITING-PERIOD-PROCESSING

Object ID2

MACHINE-DEFAULT-RPA

Parameter

<workplace number>  (8-digit)

Parameter value  <RPA number>  (Possible values: 1..12)

Active



Upper waiting period/ RPA for planned times

Only active, if the configuration for the "waiting period processing of the machine" is enabled:

For  non-productive  times  at  a  machine,  use  this  second  configuration  to  define  a  time  limit  (in

minutes). When the time limit is then exceeded, this time will be posted to a different RPA (RPA for

planned times) as part of the machine-related overhead cost operation. Purpose of this configuration

is to transfer unplanned periods at a machine directly to a separate account to minimize in advance

the subsequent posting efforts for the foreman and/or work scheduling.

Note: If the time without logged-on operation is shorter than the upper waiting period, the time will be

posted to the RPA for unplanned times. But if the time is longer than the upper waiting period, the

time without logged on operation will entirely be posted to the RPA for planned times (the time is not

distributed to both RPAs).

Posting to OP

The waiting period is posted to the operation specified.

You can only change the waiting period operation, if no machine is logged on to that

waiting period OP.

MOC_Setup.docx

Version: 1.32.21891

Page 15 of 25

Basic Settings

Only assign operations of the order type "GKM".

You  can  define  the  waiting  period  operation  with  respect  to  the  machine/workplace  from  HYMW

version 8.1.1.512 on. For this purpose, enter the MES order number of the operation including the

following parameters in the Advanced object configuration:

Object type

BDE

Object ID1

WAITING-PERIOD-PROCESSING

Object ID2

GKM-OP

Parameter

<workplace number>  (8-digit)

Parameter value  <MES order number>  (length according to basic parameter settings)

Active



Process with sequencing list

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Entry of scrap reason

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Entry of interruption reason

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Entry of personal quantities

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Entry of operation-related quantities

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Manual yield recording

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Manual scrap recording

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also "terminal configuration").

MOC_Setup.docx

Version: 1.32.21891

Page 16 of 25

Basic Settings

Entry of staff badges (ADE)

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

Entry of staff badges (MDE)

Use  the  following  configuration  options  to  fill  the  fields  for  the  terminal-specific  dialog  control  for

Windows terminals (see also Terminal configuration).

MES Link Enabling (MLE) – Order number/ operation sequence/ operation number/ sub-operation

number - from / to

In general, SAP interfaces always transfer key fields in their full possible length irrespective of their

actual use in MES. Define here which characters of the SAP data fields make up the relevant HYDRA

data fields. This simplifies identification and helps you to customize these key fields according to the

data formats.

For the following fields define the field positions (from/ to) specifying the values that are integrated in

the HYDRA database.

The entered number of digits for the order number/OP must comply with the configured

number length for orders/OPs in the BDE tab!

Counting of these digits starts with one, i.e. if the order number is configured from 1 to 8, the system

transfers the characters from the first until the last (here: eighth) position included. Note here how

SAP proceeds to fill data fields depending on their contents:

  Numeric value: aligned to the right with leading zeros

  Alphanumeric value: aligned to the left with trailing blanks.

SAP split number attached to order number and not to OP

No longer supported.

Confirm HYDRA group as actual work center

If this option is enabled and recorded actual postings are uploaded, the system transfers the HYDRA

machine group of the actual machine as the actual work center to SAP.

If this option is not set, the system uploads the HYDRA actual machine as the actual work center to

SAP.

MOC_Setup.docx

Version: 1.32.21891

Page 17 of 25

Basic Settings

Suppress badge number in BDE uploads to SAP

If this option is set, you can prevent the person entering data (the person's badge number) from being

uploaded from HYDRA to SAP in the PP time tickets. This might be useful in those instances where

data is collected in relation to staff in HYDRA, but the ID cards/badges used in SAP are not the same

as in HYDRA.

If this option is not set and HYDRA posts data in relation staff, HYDRA transfers the reporting person's

badge number and/or time ticket to SAP.

Suppress scrap in the BDE uploads to SAP

Use this option to prevent the actual scrap collected in HYDRA from being uploaded to SAP. In this

case, the scrap quantity is always 0.

By default, the scrap collected in HYDRA is transferred with the time ticket to SAP.

Field descriptions - "HLS"

Planning lead time

Period of time that the planning function identifies as lead time; result: no assignment is made. The

period of time specified is the minimum time that is required to implement a planning.

Scheduling:

Use the factory calendar to identify the EST* (earliest start time).

When planning an OP, use the shift calendar of the first "resource" to cover the central demand (i.e.

workplaces in HYDRA).

Planning horizon

Reserved. The planner may specify the planning horizon individually in the graphic planning board.

Simulation horizon

Reserved.

Planning time fence

After  an  automatic  scheduling,  the  system  can  automatically  fix  operations  that  start  within  the

planning time fence.

Fixed point scheduling

The  end  date  of

the  production  order  cannot  be  met

if

(despite

reduction):

- the earliest end time (EET) is later than the end date of the production order (forward scheduling)

or

- the latest start time (LST) comes before the start date of the production order (backward scheduling).

MOC_Setup.docx

Version: 1.32.21891

Page 18 of 25

If this is the case, the following indicators specify whether the system attempts to comply with the

Basic Settings

start or end of the order:

"S" = Start

"E" = End.

Default scheduling

If  no  scheduling  direction  is  defined  for  an  order  and  scheduling  is  made  in  HYDRA,  use  these

indicators to schedule the order:

"V" = forward scheduling

"R" = backward scheduling

Calculation of waiting time

To the extent that scheduling is made in HYDRA, use one of the following  options to calculate the

wait time of an operation:

G: Calculation of wait time according to the Gregorian calendar (by default)

V: Calculation of wait time according to the shift model of the group (if not yet planned) and/or of the

workplace (if already planned) of the preceding operation in the order network.

N: Calculation of wait time according to the shift model of the group (if not yet planned) and/or of the

workplace (if already planned) of the succeeding operation in the order network.

The  waiting  time  is  only  a  buffer  extending  the  time  distance  between  neighboring

operations  by  way  of  scheduling  and  that  thus  configures  the  dates  resulting  from

scheduling. If planning is performed in the HYDRA Shop Floor Scheduling module, the

system ignores the waiting time.

Consider priority

Automatic, server-based planning (specific processing) does not include orders with priorities smaller

than the value set here.  If this field is empty, then planning includes all orders (irrespective of their

priority).

Checking is based on the priority that is stored to the order header and not to the one

that is defined for the operations.

Displacement to the left

In case of an automatic planning of operations, this option can specify different start dates for the

scheduling. Condition: The start of the operation must be within the planning horizon.

If  this  option  is  disabled,  then  the  scheduled  start  date  will  be  the  earliest  possible  date  (forward

scheduling) or the latest possible start date (backward scheduling).

If the option is enabled, the "left shift" is activated and the scheduled start date is set to "now" plus

planning lead time. In other words, an attempt is made to plan the operation as early as possible.

MOC_Setup.docx

Version: 1.32.21891

Page 19 of 25

Basic Settings

This option ignores the scheduling result, i.e. you can plan the operation before the

earliest  start  date.  If  the  scheduling  is  performed  in  the  higher-level  system,  we

recommend to disable this option.

Material and Production Logistics

These options are not processed in the HYDRA default configuration.

Field descriptions - "PZE"

Max. interval for clocking supplement

Employees, who forgot to clock out, will automatically be set to "absent" after the time specified here.

This ensures with the terminal operation mode "Autom. status" a clock-in will be registered for the

employee the next morning.

Another  effect  of  this  setting  is  that  in  case  of  a  presence  exceeding  the  time  specified  here,  the

clocking records will not automatically be comprised to one clocking record. Correct this manually in

the "Maintenance of daily results" dialog.

PZE as SAP subsystem/ Version

Use  this  option  to  define  whether  PZE  is  used  as  SAP  subsystem.  If  this  field  is  activated,  the

collected  clocking  records  are  transferred  to  SAP  and  the  daily  evaluation  will  not  be  started  in

HYDRA.

The 'Version' field specifies which interface to SAP is used. Enter a value less than 4.5 to transfer

the clocking records to SAP via the KK1 interface. Enter a value from 4.5 on to enable the HR-PDC

interface.

Process alternate clocking

If this option is activated and a present person clocks in, the system completes the previous clocking

by a clock-out. This processing is used for example in those instances where the PZE cost center

changes are collected. By default this field is disabled.

Alternate clocking for absence reason

Use  this  option  to  specify  that  depending  on  a  person's  status,  a  clock-in  or  clock-out  will

automatically  be  entered  in  case  the  person  records  an  absence  reason.  By  default  this  field  is

activated.

Set access statuses (ZKS)

This setting defines that employees are maintained with the following statuses:

- "After entry“ after having entered the company premises

- "Before exit“ after clocking out. This option is only useful if you control the entrances and exits using

Access Control.

Process check digit

This attribute specifies whether the badge number on a barcode badge includes a check digit.

MOC_Setup.docx

Version: 1.32.21891

Page 20 of 25

Sign manually created and changed clockings automatically

This option defines whether postings resulting from manually created or changed clocking records

shall  automatically  apply  as  signed  or  whether  they  are  subject  to  approval,  if  configured

Basic Settings

correspondingly.

Field descriptions - "PDV"

PDV active (no longer relevant as of PDV 8.3)

Defines a flag, input options: Yes (J); No (N). Default: J.

Distributor Offset (no longer relevant as of PDV 8.3)

Defines the buffer time of the distributor (in seconds). This option does not calculate the entire period

until starting the distributor, but only adds the buffer time specified here, in case data is "still being

transferred". Default: 1200 seconds (20 minutes).

Configuration monitor interval

Defines  the  time  interval  in  seconds,  in  which  the  configuration  monitor  searches  for  files  to  be

transported. Default: 60.

Number of online tables (no longer relevant as of PDV 8.3)

Defines  how  many  tables  are  kept  online.  Default:  10  (10  days  online  data).  Use  this  option  to

calculate when a table will be exported. Specify the "Number of online tables“ according to the data

volume and the customer's hardware and database system.

Transport size (no longer relevant as of PDV 8.3)

Defines the maximum transport size for files (transport function= F) until the PDV.DLL transfers data

to the storage component. Unit: bytes, by default: 2000000.

Transport interval (no longer relevant as of PDV 8.3)

Defines the maximum transport time, i.e. the maximum time in seconds after which the current data

file must necessarily be closed. Default: 600.

Time lag (no longer relevant as of PDV 8.3)

Defines the maximum time lag (in seconds) between entering changed target values in the server

and on the collection level. Default: 10.

Cancelation period (no longer relevant as of PDV 8.3)

Defines the maximum period (in seconds) for recalculating the cancelation. Default: 3600.

Online visualization (no longer relevant as of PDV 8.3)

Defines whether online visualization is available. Possible settings: Yes (J), No (N). Default: N.

MOC_Setup.docx

Version: 1.32.21891

Page 21 of 25

Basic Settings

Transport function (no longer relevant as of PDV 8.3)

Defines the transport function. This transport function can be exchanged but not by the user. The

used function depends on the data volume and does not refer to individual collection components,

i.e.  it  applies  globally.  Setting  options:  FILE  (F);  (future  use:  STREAM  (S),  PDM  (P);  ODBC  (O)).

Default: F.

Show changed target values (no longer relevant as of PDV 8.3)

This  option  specifies  whether  the  times  when  a  target  value  is  changed  are  displayed  on  the

server/terminal  (SPC  =  set  point  change,  target  value  change).  Setting  options:  Yes  (J);  No  (N).

Default: N.

Target medium: measured data (no longer relevant as of PDV 8.3)

Defines  the  target  location  and/or  storage  medium  for  the  measured  values.  Use  one  of  the  two

options: store single values to the database system or store single values to the file system. Possible

settings: Database (D); file system (F). Default: D.

Archiving path (no longer relevant as of PDV 8.3)

Defines the path, to which exported tables are outsourced.

You can change the path during running operation as the complete path of a generated export file is

saved  to  the  archive  logs.  Default  PDVARC  -->  reference  to  hy_path.  The  name  of  the  system

directory is optional. Default: \<<MDT>>\pdv\archiv\

Transport path

Defines the Path for uploading data from the PDV.DLL to the HYPDVSRV. This may be an absolute

path that also applies to all drives. Use the masking <<MDT>> to replace the string in the path with

the current system directory.

- PDVTRANS: Path to the transport directory, reference to the HYDRA path configuration

Field descriptions - "MPL"

Length of batch number

This value controls the rounding precision (number of characters) of the input field Batch in the input

dialogs  and  the  MOC  evaluations/reports.  The  system  also  uses  this  value  to  generate  the  batch

number with Automatic generation of batch number.

The length must be between 8 and 20 digits.

The batch number length includes the "prefix for automatically generated batch number"!

Example:

If the prefix has 2 digits and you want to have a batch number with 15 digits, then the value for the

batch number length is 15. The batch number then has a 2-digit prefix and 13 digits including fixed

and dynamic parts. For more details on the structure of the HYDRA batch number, please refer to

the document Batch number generation.

MOC_Setup.docx

Version: 1.32.21891

Page 22 of 25

Basic Settings

Automatic generation of batch no. when creating batches

This option specifies whether HYDRA must create batch numbers automatically when the batches

themselves are created manually (e.g. goods receiving batches).

Automatic  generation  of  batch  no.  when  creating  batches  (e.g.  create  goods  receiving

batch)

The operator has to enter the batch number manually in the input dialog.

Prefix for automatically generated batch numbers

Fixed  number  of  digits  in  front  of  the  batch  number.  This  prevents  an  overlapping  of  number  ranges  of

batches  created  in  external  systems  and  transferred  to  HYDRA  with  batches  that  were  automatically

generated in HYDRA.

For  more  details  on  the  structure  of  the  HYDRA  batch  number,  refer  to  the  document  Batch  number

generation.

Create batch

Fixed number of digits in front of the batch number for GR (goods receipt)

batches.

Output batch change

Fixed number of digits in front of the batch number for production batches

(e.g. for CA_WL).

The number of digits/characters of both values must be identical

Automatic logoff of input batches when logging off the last OP

Option specifying whether all logged-on input batches are logged off, once the last OP logged on to

the machine is interrupted or logged off.

Enable this option to log off all logged-on input batches, once the last OP logged on to the machine

is interrupted or logged off.

Do not enable the option if you want to prevent the input batches from being logged off automatically.

Creating unknown batches

If this option is activated, HYDRA will collect unknown ERP batch numbers upon the first logon and

will also create all required internal entries in the batch management. This means that the ERP batch

ID is the only external information in HYDRA.

If this option is disabled, HYDRA will check the ERP batch number entered on the terminal against

the ERP batch numbers included in batch management. The system refuses the login, if the ERP

batch number does not exist in the batch management.

MOC_Setup.docx

Version: 1.32.21891

Page 23 of 25

Basic Settings

Field descriptions "ESK"

SMTP server

To send e-mails, enter the IP address or name of the local SMTP server in the SMTP server field.

SMTP port

Enter  the  port  of  the  SMTP  server  that  is  used  to  send  e-mails.  If  a  value  of  "0"  is  entered  here,

HYDRA will try to communicate with the server using port "25".

SMTP timeout

Depending on the  value entered  in this field (in milliseconds), HYDRA  will abort a communication

attempt when the server does not respond within the defined time span.

There is a time lag in the communication between client and server. For this reason, enter a value

greater than 1000ms in field SMPT Timeout.

Login type

The field "Login type" specifies if you activate the authentication for the SMTP server or not.

User:

The  field  "User"  is  secondary  to  the  field  "Login  type".  If  the  "Login  type"  has  the  value  "With

authentication", then the fields "User" and "Password" are shown. Enter the user name for the SMTP

server in field "User".

Password:

The  field  "User"  is  secondary  to  the  field  "Login  type".  If  the  "Login  type"  has  the  value  "With

authentication", then the fields "User" and "Password" are shown. Enter the password for the SMTP

server in field "Password".

SMTP sender

You can enter a central e-mail account. E-mails sent via HYDRA Escalation Management will then

have this central account as sender.

At the moment only use the database to edit the plain text description of e-mail addresses shown

in mail programs: table: esk_setup, column: .smtp_sendername.

SMS path

The Escalation Management offers the possibility to send SMS. To do so, store message files in a

specific directory. External applications can access this directory to send the messages.

Here, define the Path where SMS message files should be stored. Use the selection button to access

the overview dialog showing the paths that have already been configured.

MOC_Setup.docx

Version: 1.32.21891

Page 24 of 25

Pager path

The pager path is configured as the SMS path.

Basic Settings

MOC_Setup.docx

Version: 1.32.21891

Page 25 of 25

