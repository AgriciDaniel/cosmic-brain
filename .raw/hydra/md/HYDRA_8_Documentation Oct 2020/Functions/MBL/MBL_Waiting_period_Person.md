Waiting Period - Person

1  Waiting Period - Person

Utilization

Waiting period processing is an optional function, which allows for complete recording of labor times in

shop floor data collection (BDE). This applies to both, gaps between individual personnel postings in

BDE as well as between the personnel postings in BDE and the clock-in or clock-out postings of the

time & attendance module (PZE).

Even if time & attendance functions are not integrated, a very good posting quality can be achieved in

BDE  (shop  floor  data  collection)  if  the  advanced  logon  time  function,  waiting  period  processing  and

appropriate  options  to  log  off  staff  automatically  at  the  end  of  shifts  are  in  use.  This  can  still  be

improved for flexible working times if the option "PZE (in/out) controls BDE" is used.

Integration

Provided that the time & attendance component (PZE) is in use, the waiting period processing function

can also be controlled by PZE clock-in and clock-out records.

Prerequisite

The waiting period processing is enabled in the basic parameter settings --> BDE --> Waiting period

processing BDE --> Activate waiting period processing.

The  function  can  be  used  in  connection  with  the  time  &  attendance  module  (PZE).  However,  using

PZE is not mandatory. If integration with PZE is required, the relevant options needs to be enabled in

the basic parameter settings --> BDE --> PZE (in/out) controls BDE".

Configuration options

The  personal  waiting  period  processing  is  configured  across  the  system  in  the  basic  parameter

settings. The document dealing with the basic parameter settings provides further information on this.

Filling the gaps between BDE personnel postings

The  "waiting  period"  is  defined  in  minutes  within  the  basic  parameter  settings  if  waiting  period

processing is enabled. It indicates the maximum time that may pass between a logoff at an operation

and the logon to the next operation or it indicates  within  what time an employee has to log  on to an

operation after his/her clocking-in. If this  waiting period is  not  exceeded,  the person's logon is dated

back  to  the  time  he/she  logged  off  at  last  or  to  his/her  clocking-in.  In  case  the  waiting  period  is

exceeded, the system posts the time exceeded to the defined waiting period operation.

A  "maximum  waiting  period"  is  also  defined  within  the  "basic  parameter  settings".  The  maximum

waiting period indicates the period of time as of which HYDRA rejects waiting period postings. If the

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 1 of 8

Waiting Period - Person

maximum  waiting  period  is  set  to  0,  waiting  period  postings  will  not  be  rejected.  The  system  always

generates  a  waiting  period  posting  if  waiting  period  processing  is  enabled.  Even  at  the  end  of  a

working day, it starts with the time when an employee logs off last and ends with the first logon on the

next  day,  provided  it  is  not  interrupted  by  clocking-out  if  the  control  by  PZE  option  is  enabled.  This

data record spanning two working days of an employee can be suppressed by the maximum waiting

period.

The waiting period has to be posted to a "resource performance account (RPA)". An account has to be

defined  within  the  basic  parameter  settings  for  posting  purposes.  Please  note  that  only  the  account

number may be entered, e.g. 9 for RPA U8 or 10 for RPA U9. These accounts are  free accounts and

can be used for waiting period processing without affecting the events.

Options with "PZE (in/out) controls BDE“

The  functions  of  ”PZE  controls  BDE“  process  a  BREAK  clocking  (beginning  of  break)  as  a

clocking-out. The end of the break corresponds to a clocking-in.

No control

Clocking records pertaining to the time & attendance module (PZE) do not result in employees

being logged on or off in BDE and do not cause any waiting period processing.

Waiting period processing

Processing  is enabled if the waiting period  is activated in  BDE  --> PZE (IN/OUT) controls BDE

within the basic parameter settings.

When clocking-in, the person is automatically logged on to a waiting period operation in the shop

floor system.

If  the  user  logs  on  to  a  production  OP  during  the  "waiting  period"  the  duration  between  the

clocking-in and the logon to the production operation is posted onto the registered operation. The

logon of the production operation is posted forward to the posting in HYDRA-PZE.

The system generates a "waiting period posting" as soon as the waiting period is exceeded. The

data  posted  to  the  production  order  is  not  changed.  This  processing  is  also  activated  for  the

times between the logoff and logon of staff during the working time.

Once the person clocks out in the time & attendance module, they are automatically logged off in

HYDRA-BDE as well. Provided that the person was no longer logged on to an operation at the

time of clocking out, a waiting period posting is generated for the period of time between the last

logoff  of  the  person  and  the  clocking-out.  This  is  even  the  case  if  the  waiting  period  is  not

exceeded.

The  operation  is  interrupted  automatically  if  the  last  person  who  works  on  the  operation  clocks

out.

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 2 of 8

Waiting Period - Person

Waiting period processing with "auto in"

Waiting  period  processing  is  activated,  provided  that  it  is  enabled  with  "auto  in"  in  the  basic

parameter settings --> BDE --> PZE (IN/OUT) controls BDE. In this case, however, the person is

automatically logged on to the operation that was posted the last time by this person.

As a prerequisite for this logon, this operation must neither be active nor finished already.

In case the operation could be logged on, the person is also logged on to the operation. In this

case, however, the person is always directly logged on; there is never an advance logon.

The  logon  is  made  on  that  workplace  to  which  the  person  and  the  operation  were  logged  on

before  clocking  out.  If  it  is  an  individual  workplace  all  people  who  are  already  active  are

connected to the new operation and the new person is connected with all OPs that are already

active at this workplace.

If  an  advance  logon  of  staff  is  required  instead,  it  might  be  configured  by  an  entry  in  the  INI

configuration:

Parameter name

Parameter value

Name

Key

Value

PZE_CONTROLS_BDE

ADVANCED_LOGON_OF_STAFF

TRUE / FALSE

Comment

Generate advance logon of staff optionally

If this processing is activated by the INI entry

  An advance  logon  of staff is generated  instead,  when clocking in, provided  that  the person

clocks in within the advance logon period for the machine or the machine is in the "no shift"

status (time without shift).

  No OP is logged on, if the person clocks in at a time when the machine is in the "no shift"

status and the operation to be posted is in the "automatically interrupted" status.

Waiting period processing with clock-out

If  the  waiting  period  processing  with  clock-out  is  activated  in  the  basic  parameter  settings  -->

BDE --> PZE (IN/OUT) controls BDE, the person is automatically logged off from all machines

and  orders  as  soon  as  they  clock  out.  In  addition,  the  operation  is  also  interrupted,  if  the  last

person who is logged on to the operation is logged off.

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 3 of 8

General notes

Waiting Period - Person

Operations are  not  logged  on automatically by the function  "PZE controls BDE",  provided that

resources  are  posted  for  the  operation  or  inspection  operations  are  connected  with  the

operation.

In such cases, only the person is logged on or off by the PZE clocking.

When it comes to group workplaces or overhead cost operations, it might also be the case that

the  person  cannot  be  logged  off  automatically  in  the  cases  mentioned  above,  as  one  person

always has to be logged on to an operation.

When operations are merged at the terminal, staff is logged off from this merged operation as

soon  as  they  clock  out.  However,  they  cannot  be  logged  on  automatically  to  the  merged

operation.

In the mentioned cases, it is recommended to log the operation on and off explicitly, if required.

The  "waiting  period"  and  "auto  in"  options  automatically  compare  the  first  staff  logon  within  a

shift with the rounding rules of HYDRA-PZE if the option "rounding of the first personnel logon"

is enabled. This is why, the HYDRA-BDE posting might deviate from the actual time.

If  the  relevant  option  is  enabled  in  the  basic  parameter  settings,  the  personnel  logon  time  in

BDE  is  dated  forward  to  the  beginning  of  the  working  time  temporarily  rounded  by  PZE  if  a

person is logged in by a clocking-in.

Example: a person clocks in at 5.55 a.m. However, the person's working time only starts at 6.00

a.m. according to the shift  model and the  PZE rounding rules. Waiting period processing  logs

the person on at 6.00 a.m. in BDE instead at 5.55 a.m. (if enabled at all).

This option only affects such personnel logons in BDE that are performed due to waiting period

processing of a person clocking in. This option neither affects staff logging on or off using BDE

posting dialogs nor further clocking-in records of the person on the same day.

The  waiting  period  processing  is  not  activated  if  the  person  clocks  in  outside  of  the  skeleton

working time, i.e. before the beginning of the skeleton time.

In contrast to HYDRA-BDE, postings in HYDRA-PZE are not transferred ONLINE but at a later

point in time. At first they are buffered locally. When it comes to postings that depend on each

other (e.g. within the scope of waiting period processing), this might lead to HYDRA-BDE being

more  up-to-date  than  HYDRA-PZE  postings.  In  this  case,  HYDRA-BDE  postings  are  not

backdated.

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 4 of 8

Waiting Period - Person

Backdating to the beginning of the last shift at most takes place at workplaces/machines, which

are directly assigned to a terminal of the operation mode "MDE".

When  the  waiting  period  function  for  personnel  and  machines  is  used  at  the  same  time,  the

person  is  postdated  to  the  time  when  the  operation  is  logged  on  at  most.  A  waiting  period

posting for the person  is generated for the remaining time, irrespective of  whether the  waiting

period has been exceeded or not. The waiting period for machines always takes priority.

If  the  person  is  logged  off  automatically  by  clocking  out,  and  if  quantities  in  B  records  are

required, he/she has to upload his/her quantities beforehand using partial uploads.

Effects of the settings in the HR master

The recorded waiting period for a person is compared with the person's annual model as it is defined

in the HR master; the generated posting of the record type "B"  is assigned the  ("master") workplace

defined in the HR master. If these fields are not filled out the waiting period is 0, provided that the year

model is missing or if the workplace is missing it is set to the value 0 or blank.

Finding  of  the  waiting  period  OP  with  waiting  period  processing  based

on personnel

HR master

Overhead cost OP

defined?

Yes

No

HYDRA
basic parameter settings

Overhead cost OP

defined?

Yes

Post to
this
operation

No

Generation of the
waiting period OP no.

Overhead cost OP:=
GK00..<PNR>

The  resource  performance  account  that  is  configured  in  the  basic  parameter  settings  is  posted,

regardless of the object where the waiting period operation is found.

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 5 of 8

Waiting Period - Person

Upload to the PPS system

By default, waiting period postings are not uploaded to the higher-level ERP system. However, if it is

required  to  upload  these  postings  as  well,  HYDRA  can  be  customized  accordingly.  To  do  so,  the

HYDRA standard interface (HYD-ERP) has to be used.

Status of a waiting period operation

By  default,  a  waiting  period  operation  is  always  assigned  to  the  status  "available  (waiting  period)",

irrespective  of  whether  the  waiting  period  operation  has  already  been  posted  or  if  a  person  or  a

machine "is waiting".

Processing  is  not  affected,  if  the  status  of  a  waiting  period  operation  or  a  waiting  period  order  is

changed  to the  "completed" status  using the function  "change status"  in the  order overview  or order

information dialog. The defined waiting period operation is still posted. Please also take into account

the notes on changing a waiting period operation in the basic parameter settings.

Reactivation of a waiting period operation

Processing is not affected if a waiting period operation is reactivated using the "reactivate OP" function

in  the  order  overview  dialog.  By  default,  the  status  is  set  to  "available  (waiting  period)"  again  in

HYDRA (this is an internal status with control indicator "U").

Example  1:  Effects  of  the  planned  working  time  in  HYDRA-PZE  on

HYDRA-BDE

Prerequisites:

  HYDRA-BDE and HYDRA-PZE are in use

  The option "PZE (in/out) controls BDE" has to be set to "waiting period " or "Auto in".

Planned  attendance PZE Person 1020
                       6:00 am
                        ├─────────────────────────────────

Person 1020 clocks in
                  5:55 am
                   ├──────────────────────────────────

                       6:00 am (determined by the planned attendance)
OP 70010 030 is logged on├──────────────────────────────────────────
Person 1020 is logged on ├─────────────────────────────-----------------

Example 2 "waiting period exceeded"

The waiting period is set to 10 minutes in this and the following examples

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 6 of 8

Waiting Period - Person

last logoff(or clock-in) of the person
     5:30 am
               ├────────....

the person is logged on the next time at
                       6:00 am
                        ├─────────────────────────────────

A waiting period posting of 30 minutes is generated for this person and posted on the waiting period

RPA for the period of time between 5.30 am and 6.00 am. No backdating takes place.

Example 3 "waiting period not exceeded"

Last logoff or clock-in of the person
              5:55 am
                    ├───....

The person is logged in the next time at
                       6:00 am
                        ├─────────────────────────────────
                   ß├──(Backdating to 5:55 am)

The  person's  logon  is  backdated  to  5.55  am.  The  five  minutes  of  waiting  period  are  posted  on  the

waiting period RPA. No waiting period posting is generated.

Example 4 "logoff of staff before clocking out in PZE"

The person is logged off
                       1:55 pm
      ───────────────────┤

The person clocks out
                          2:00 pm
      ──────────────────────┤..

In  this  case,  a  waiting  period  posting  between  the  last  person  that  logs  off  (HYDRA-BDE)  and  the

clock-out  (HYDRA-PZE)  is  generated,  even  if  the  waiting  period  is  not  exceeded,  as  there  is  no

(longer)  an  operation  onto  which  this  time  could  be  posted.  The  five  minutes  of  waiting  period  are

posted onto the RPA defined within the basic parameter settings. The time when the last person logs

off is not postdated.

Example 5 – "logon of staff with PZE rounding“

The person arrives at 5.55 am. This time is already dated to 6.00 am by the clocking time gradation

function  of  HYDRA-PZE;  i.e.  the  shop  floor  collection  module  (BDE)  logs  the  person  on  at  6.00  am

(HYDRA-BDE  does  not  know  the  original  clocking  time  in  HYDRA-PZE).  Consequently,  the  person

works on the waiting period OP as of 6.00 am.

Logging an OP/a person on at 6.05 am triggers a backdating or waiting period posting.

As in this case, the waiting period has not been exceeded (6.00 am  - 6.05 am: is a maximum of five

minutes,  which  is  less  than  the  10  minutes  waiting  period),  the  logon  time  for  the  OP/person  is

backdated to 6.00 am.

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 7 of 8

If the OP/person is logged on at 6.10.01 am the waiting period is exceeded and HYDRA generates a

waiting period posting of 10 minutes and 1 sec.

The logon time for the OP/person remains at 6.10.01 am.

Waiting Period - Person

MBL_Waiting_period_Person.docx

Version: 1.3.18468

Page 8 of 8

