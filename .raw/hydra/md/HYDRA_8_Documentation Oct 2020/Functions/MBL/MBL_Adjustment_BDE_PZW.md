Active PZE/ADE Comparison

1  Active PZW/BDE Comparison

1.1  Overview

The  active  PZW/BDE  comparison  within  the  HYDRA  system  environment  is  a  function

enabling  the  best  possible  comparison  of  personal  BDE  postings  ("B"  records)  with  the

personal and calculated time intervals of PZW on a daily level. In general, the PZW posting is

foremost; the personal BDE posting depends on the wage type postings of the PZW labor time

calculation.

The active comparison is initially not active in a standard HYDRA system. It is only set

up  and  activated  in  the  HYDRA  system  by  MPDV  staff  if  required.  The  activation  is

described in section Activating the Environment Variable.

1.2  PZW Data

The  wage  type  postings  and  labor  time  recording  provide  the  basis  for  the  PZW/BDE

comparison.  The  clock-in/clock-out  data  originate  from  recording  at  the  terminal.  Such

clockings are synchronized in the course of labor time calculation according to the applicable

time model of the relevant employee.

The  results  of  labor  time  calculation  are  employee  and  day-related  time  intervals  posted  to

wage types. The prerequisite for the PZW-BDE comparison is the error-free result of the PZW

labor time calculation. A correct system result is obtained when HYDRA is able to generate a

daily result on the basis of the available clock-in and clock-out data. If clocking-in or clocking-

out is forgotten, the labor time calculation cannot obtain a daily result. This error is identified

as requiring correction in the PZW posting list.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 1 of 22

Active PZE/ADE Comparison

PZW result:

Matching clockings (not relevant for the active comparison BDE/PZW)

Date

Person

In

Out

In
(evaluated)

Out
(evaluated)

Duration

22-OCT

P 1

6:53

16:05

7:00

16:00

8.25 hrs

PZE
Original clocking

In

Working time model

6:53

Out

16:05

7:00

12:00  12:45

16:00

Wage type postings
per  employee   / day

Wage type postings

LA 100   5h

LA 100   3h15

Date

10/22

10/22

Person

P1

P1

Start

7:00

12:45

End

12:00

16:00

Duration

5.00 hrs

3.15 hrs

Note:

The  time  interval  between  clock-in  and  clock-out  is  transferred  to  two  wage  type

postings by labor time calculation on the basis of the planned break. For comparison,

the wage type postings are relevant.

The existing correct system result may nevertheless be "incorrect" in terms of the contents if

the employee has clocked incorrectly.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 2 of 22

Active PZE/ADE Comparison

1.3  BDE Data

Identifying the duration of a BDE posting

When the employee logs off, the BDE postings (B records) are created online. The time for the

posting is calculated using the times of logon and logoff. To calculate this duration, only the

time intervals are used that are defined in the shift model. Breaks and time intervals that are

outside the defined shift, are not used to calculate the duration. The basic settings specify if

the system uses the shift model of the workplace, which created the posting, or the BDE shift

model of the person.

Resource performance accounts with reference to machine status

The  personal  posting  depends  on  the  machine  status  progress  during  the  employee  logon

time.  The  times  of  individual  machine  statuses  are  balanced  in  the  relevant  resource

performance accounts.

Proportionate identification of the duration with logon to several machines

or operations

HYDRA takes account of multiple assignments of employees to orders as well as of multiple

machine  operation.  With  regard  to  any  employee-related  BDE  posting,  the  so-called  labor

duration is allocated proportionately:



If  a  person  is generally  only  logged on to  one  operation,  the  interval  of  the  posting  is

equal to the proportionate labor duration.



If a person is logged on to more than one operation, the interval between the person's

logon  and  logoff  will  exceed  the  proportionate  labor  duration,  because  in  the  case  of

parallel  allocations  of  persons  to  several  orders,  HYDRA  will  divide  the  time  by  the

number of simultaneous order allocations.



Breaks  in  the  BDE  time  model  are  always  taken  account  of  and  excluded  from  the

posting.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 3 of 22

Active PZE/ADE Comparison

Development of
machine status

Setup

Production

Defect

Product.

6.45 a.m.

08.30 a.m.

2.00 p.m.

3.30 p.m.

5.00

Order sequence
at machine

p.m.

14.01 p.m. 3:28 p.m.

4711/10

5711/10

6711/10

6.45 a.m.

1.59 p.m.

3:31 p.m. 4.05 p.m.

Personnel postings
B records

P1  /  4711/10

2:01 pm  3.28 pm.

P1 /
4711/10

P1 /
6711/10

6.55 a.m.

2.59 p.m.

3:31 p.m. 4.05 p.m.

BDE result (before comparison):

Date

Person  Order

Duration  RPA

22.10.

P 1

4711/10

7.14 h

7=1:45 h
11=5:29
h

Person
logon

Person
logoff

Personnel
time

6:55

13:59

7.04 h

22.10.

22.10.

P 1

P 1

5711/10

1.27 h

2=1:27 h

14:01

6711/10

1.29 h

11=1:29
h

15:31

15:28

16:05

1.27 h

0.34 h

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 4 of 22

Active PZE/ADE Comparison

1.4  Active Comparison Procedure

1.4.1  Comparison  of  recorded  and/or  maintained  BDE

personnel postings

The PZW-BDE comparison is started automatically after the PZW labor time calculation and

processes  the  personal  BDE  postings  of  persons  and  days  evaluated  by  the  labor  time

calculation. The PZW-BDE comparison processes both results generated for the first time and

corrected results of labor time calculation.

The  PZW-BDE  comparison  compares the  PZW  wage  type  postings  with  the  personal  BDE

postings ("B" records) of the employee and makes the following corrections.



The start and end times of the employee's PZW posting are foremost. The PZW-BDE

comparison uses any relevant wage type posting of a day (e.g. the wage type posting

from before noon between 07:00 AM - 12:00 AM and the wage type posting from the

afternoon between 1:00 PM and 5:00 PM) and searches for the associated personal

BDE postings relating to the wage type posting period. The BDE postings may start

earlier or later and end during or after the wage type posting.



Note:

Only BDE postings are used that are made up to two hours before or after the PZW

wage type postings. If a clock-out has been forgotten and to prevent these long

durations from falsifying the result, the system only uses the postings made within an

interval of up to 10 hours before or after the PZW wage type postings. BDE postings,

which are even further outside the PZW wage type postings, must be edited manually.



Example: the PZW wage type postings cover the time from 6:00 to 14:00.





A BDE posting from 15:30 to 18:00 is booked, the duration is set to 0.

A BDE posting from 16:10 to 18:00 is not booked because this posting starts later

than two hours after 14:00. The duration is not changed.



A  BDE  posting  from  15:30  to  1:00  of  the  next  day  is  not  booked  because this

posting ends more than 10 hours after 14:00. The duration is not changed.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 5 of 22

Active PZE/ADE Comparison



In HYDRA-PZW it is possible to configure whether a wage type is relevant for the active

comparison.  Time  intervals  not  posted  to  appropriately  identified  wage  types  are

excluded in the BDE postings. This is of interest, for example, for break times which are

to be remunerated in PZW but excluded in BDE. If several wage types are identified as

relevant, they can also overlap. Overlapping wage type postings are scaled to one single

time scale during comparison.



BDE times not covered by any relevant PZW wage type posting are not valid in terms of

the PZW-BDE comparison and are excluded from the duration of the BDE posting. This

means  that  the  PZW-BDE  comparison  can  always  only  reduce  the  personal  BDE

postings and will never increase them.



If no relevant PZW wage type postings are available, the BDE times are not changed.

The comparison is only made if relevant PZW wage type postings exist for the person

on the specified day.

This way, the actually recorded BDE times are not set to a duration of 0 with persons

who generally do not use PZW or who have no relevant wage type postings on this day

because of a clocking or planning error in the PZW.



The comparison will change the following values of the personal BDE posting (B

record):

Personal resource performance account HNZ (RPA11) = synchronized proportionate

labor duration

Labor duration = synchronized proportionate labor duration

Order-related resource performance account HNZ = synchronized labor duration, not

proportionate

Sum total of order-related RPA = synchronized labor duration, not proportionate

The personal and order-related RPA01, RPA02, RPA03, RPA04, RPA05, RPA06,

RPA07, RPA08, RPA09, RPA10, RPA12 are set to 0.

The terminal number of the posting is set to 999.

The posting is signed off, the originator is set to "PZADE".



Start and end times are retained

The original posting times of the personal BDE posting ("B record") are retained. The

correction only affects the duration and the labor duration.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 6 of 22

Active PZE/ADE Comparison



Proportionate posting of labor utilization

The proportionate labor utilization times of the personal BDE posting are again

determined in relation to the existing simultaneous order processing by the PZW-BDE

comparison. With regard to merged operations, too, the labor time is divided by the

number of simultaneously processed operations and is equally allocated to these

operations.

As with normal entries, the order-related resource performance accounts and their time

total are not calculated proportionately.

7.00 a.m.

12:00  12.45 p.m.

4.00 p.m.

Wage types postings
per  employee  / day

WT 100 5h

WT 100 3h 15

Personnel postings
B records

Person on OP 1 (P/OP1)

2.01 p.m.

3.28p.m.

P /
OP2

P /
OP3

6.55 a.m.

Person (P)    on order  1

1.59 p.m.

3.31 p.m.

4.05 p.m.

Duration 5:00 h

1:14
h

1:27h

0:29
h

Personnel postings
Compared with PZW

6.55 a.m.

PZW-BDE Comparison Result:

The data in the table below refer exclusively to the date 10/22 and person P1.

Start

End

Order

Log
person
on

Log
person
off

Labor
dur.

Start
(synchronized)

End
(synchronized)

Labor duration
(synchronized)

7:00
AM

12:00
PM

4711/10  6:55
AM

12:45
PM

4:00
PM

4711/10  6:55
AM

4711/10  6:55
AM

1:59
PM

1:59
PM

1:59
PM

7:04
hrs

7:04
hrs

6:14
hrs

7:00 AM

12:00 PM

5:00 hrs

12:45 PM

1:59 PM

1:14 hrs

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 7 of 22

12:45
PM

4:00
PM

5711/10  2:01
PM

5711/10  2:01
PM

12:45
PM

4:00
PM

6711/10  3:31
PM

6711/10  3:31
PM

3:28
PM

3:28
PM

4:05
PM

4:05
PM

1:27
hrs

1:27
hrs

0:34
hrs

0:29
hrs

Active PZE/ADE Comparison

2:01 PM

3:28 PM

1:27 hrs

3:31 PM

4:00 PM

12:29 AM
hrs

The PZW-BDE comparison result is represented by the personal BDE postings in bold type

not highlighted in color. The start and end times from the original BDE posting are retained,

but the labor duration is synchronized with the evaluated PZW times of the person.

Please note:



The  PZW-BDE  comparison  does  not  process  the  order-related  BDE  postings  ("U

records" and "E records").



A button can be used to set whether or not manually modified BDE postings ("B records")

are processed by the PZW-BDE comparison.

  With regard to the processed B records, the originator PZADE is entered in the posting.

In addition, the comparison signs off the posting.



Gaps occurring in the posting sequence between the logons and logoffs of persons can

be avoided by activating the waiting period processing in the HYDRA setup.

1.4.2  Closing Gaps

Similar to BDE waiting period processing, gaps between BDE personnel postings may be filled

by waiting period orders in the comparison.

The waiting period order must be entered in the HYDRA basic settings.

Gap filling by waiting period orders is activated by MPDV staff through an INI configuration.

Optionally,  the gap  between PZW start  and  the first  BDE  personnel  posting  or the  last gap

between the last BDE personnel posting and PZW end can each be filled by separate waiting

period operations. This is also activated by MPDV staff through an INI configuration.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 8 of 22

Active PZE/ADE Comparison

Rules for closing gaps

1.  The persons relevant for gap filling are those who have the "PZW/BDE comparison" option

activated in the HR master data ("BDE" tab, "Incentive payment data" group).

2.  Days on which no BDE personnel posting is available at all will also be filled for the relevant

persons.

3.  The PZW times relevant for gap filling are derived from the PZW definition of wage types.

In this regard, the identifier "Use wage type for  BDE comparison" is decisive, as it is for

comparing personnel postings. Wage types must be maintained appropriately so that, for

example, absence times such as holidays are not relevant for gap filling.

4.  Gap filling will not result in any BDE order postings (record types U/E). No U/E records will

be created upon subsequent comparison, either.

5.  Long  running  BDE  personnel  postings  may  occur,  for  example,  from  maintenance  or

posting errors. Such postings are always only assigned to a defined PZW evaluation date

if  HYDRA  time  management  is  used.  This  is  the  last  possible  date  of  PZW  evaluation.

(Same  assignment  as  in  the  comparison  list  and  the  subsequent  entry  via  the  "PZW

evaluation date" column.)

6.  Intentional gaps in the BDE timeline are not possible if gap filling is used, since they will

always be filled automatically. If gaps are specifically requested in production orders, such

gaps must be filled by the employee or the person in charge by posting at the terminal or

by means of manual maintenance, e.g. by inserting an overhead costs posting. Alternately,

a gap may be created in the PZW times relevant for comparison by selecting an appropriate

payment day type in PZW or by manually processing the wage type postings.

1.4.2.1  Closing Gaps in Mode WAITINGPERIODOP

To  close  gaps,  you  always  use

fixed  orders  specifically  configured

in  mode

WAITINGPERIODOP. Usually, the waiting period OP is used, which is stored in the HYDRA

basic settings.

To close the gap between PZW start and the first BDE personal posting and to close the last

gap between the last BDE personnel posting and the PZW end, separate waiting period OPs

can optionally be used. An MPDV consultant can acitvate this option via INI configuration.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 9 of 22

Active PZE/ADE Comparison

Special rules for closing gaps in mode WAITINPERIODOP

1.  The  personnel  postings  are  used  to  close  gaps,  these  postings  include  the  workplace

where the person has last been logged on before the gap. If no previous BDE postings of

the  person  are found, then  the  waiting  period  posting  includes the  machine  that follows

after  the  gap.  If  no  machine  can  be  identified  this  way,  the  gap  is  not  closed.  This  is

recorded in a log file. This can happen with persons who are new.

The following examples describe how the "close gap" function works.

Legend:

   PZW posting

 entered BDE posting (B record) PO: Production order

  Overhead  cost  order  start  (gaps  between  clock-in  and  first

BDE login INI-configuration FIRSTOP)

  Overhead  cost  order  end  (gaps  between

last  BDE

posting and clock-out INI-configuration LASTOP)

  Overhead  cost  order  (gaps  between  BDE  postings  Setup  –

Waiting period processing – Posting to OP)

Example 1

The first gap was filled with GKANF, the last with GKEND.

Example 2

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 10 of 22

Active PZE/ADE Comparison

In this case, there are two PZW postings with an interruption. For this case, two waiting period

postings with GKANF are generated.

Example 3

In this case, there are two PZW postings with an interruption. For this case, two waiting period

postings with GKANF are generated. At the end, two waiting period postings with GKEND are

generated.

Example 4

The gap between the production orders is filled with an overhead cost waiting period posting.

Example 5

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 11 of 22

Active PZE/ADE Comparison

This  is  based  on  example  4.  Now,  the  latest  BDE  posting  (PO)  is  deleted  manually.  The

following scenario is generated for the next run.

Example 6

There are no BDE postings for this day. Through the comparison, three waiting period postings

with GKANF are generated.

Please note: These GKANF waiting period postings are only generated if an BDE posting can

be  found  for  this  person  in  the  past  10  days.  This  posting  from  the  past  determines  the

workplace to which this posting is allocated. If no posting is found, no waiting period posting is

generated, either.

Example 7

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 12 of 22

Active PZE/ADE Comparison

This is based on example 6. The two latest waiting period postings are deleted manually. The

following scenario is again generated for the next run.

It is verified whether the previously generated BDE posting was also a waiting period posting

with this order number (GKANF). If so, this GKANF waiting period posting is continued.

1.4.2.2  Closing Gaps in Mode PREDECESSOR

Special rules for closing gaps in mode PREDECESSOR

1.  You start to close gaps from the "start" following the rule "The person works on their orders

until other postings are available".

2.  The  function  to  close  gaps  is  relevant  for  all  persons  with  the  active  option  BDE/PZW

comparison in the HR master data (tab Incentive wages).

3.  The PZW times that are relevant for the close gap function are defined in the PZW wage

types. Here, the option Use wage type for comparing with HYDRA-BDE enables or disables

the function, as it is with the comparison of personnel postings. The wage types are edited

by the customer. For example, it must be specified that absence times like holidays are not

used to close gaps.

4.  In case of days without any BDE personnel posting, the gaps are closed for the relevant

persons.

5.  Multiple  machine  operation  in  a  gap  is  not  supported.  A  gap  is  only  closed  using  an

operation.  The  system  uses  the  operation  where  the  person  has  last  logged  off.  If  the

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 13 of 22

Active PZE/ADE Comparison

person  has  logged  off from  several  operations  at  the  same  time,  the  operation  with  the

largest number is used.

6.  Editing or posting errors can create long lasting BDE personnel postings. These postings

are always assigned to a defined day of PZW evaluation. Here, the last day of the possible

days  of  PZW  evaluation  is  used.  (Same  assignment  as  in  application  Labor  time

comparison and subsequent entry using the column PZW evaluation day).

7.  The system still posts to finished OPs, but does not reacitvate the OPs. For this reason,

SAP PP can receive confirmations/postings for operations that have already been finished.

8.  If no previous BDE postings of the person can be found, then the gap cannot be closed.

This is recorded in a log file. This can happen with persons who are new or after very long

absences of persons.

The following examples describe how the "close gap" function works.

Legend:

   PZW wage type posting

 recorded BDE posting (B record) FA: production order

 gap before comparison

 gap closed after comparison with production order FA1

 gap closed after comparison with production order FA2

Example 1

Example 2

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 14 of 22

Active PZE/ADE Comparison

Example 3

Example 4

Example 5

No production order is found here in the past. The first two gaps cannot be closed.

Example 6

The system does not support to close a gap with multiple machine operation. A gap is only

closed using an operation. The system uses the operation where the person has last logged

off. If the person has logged off from several operations at the same time, the operation with

the largest number is used.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 15 of 22

Active PZE/ADE Comparison

1.5  Configurations Required

1.5.1  HR Master Data

For persons who are to be processed by the comparison, the "BDE/PZW comparison" option

must be set in the HR master data, "incentive payment" tab.

1.5.2  Wage Types

In PZW, you must enable the option "Use wage type for comparing with HYDRA-BDE" for the

wage types relevant for the comparison.

1.5.3  Customizing “Close Gap” function

1.5.3.1  Mode WAITINGPERIODOP

HYDRA basic settings

In the HYDRA basic settings, the waiting period operation must be entered. Here, the BDE

waiting period processing should also be suitably configured, so that small gaps between BDE

personnel postings are avoided in the entry already.

Activate closing gap

Closing gap is activated through an INI configuration.

Ini-Name:

Section:

ADEPZECOMP

FILLGAP

Key/Value:

MODE=WAITINGPERIODOP

Optional: own waiting period operations for start/end

Note:

The  options  for  special  waiting  period  operations  at  the  beginning  and  end  are  only

available, if the close gap function is activated in mode WAITINGPERIODOP. The special

waiting period OPs are only useful, if the comparison is made for a day. This condition in

only fulfilled if you have configured daily evaluation periods for the overtime compensation

in the Personnel Time Management.

Ini-Name:

Section:

ADEPZECOMP

FILLGAP

Key/Value:

FIRSTOP=<Waiting period operation number>

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 16 of 22

Active PZE/ADE Comparison

Ini-Name:

Section:

ADEPZECOMP

FILLGAP

Key/Value:

LASTOP=<Waiting period operation number>

1.5.3.2  Mode PREDECESSOR

Activate closing gaps

The function is activated via INI configuration

Ini name:

Section:

ADEPZECOMP

FILLGAP

Key/Value:

MODE=PREDECESSOR

1.6  System Requirements

1.6.1  Restrictions



The active PDE/PZW comparison is only available in HYDRA with operation mode

"Maintenance of postings".



The comparison function books all durations in the processed BDE personnel postings

(B records) to resource performance account 11 only. The RPA assignment that depends

on the workplace status is discarded.

1.6.2  Activating the Environment variable

The active BDE/PZW comparison is not active by default. The comparison must be activated.

The reasons for this approach are the following:

  The active BDE/PZW comparison changes the BDE data and you cannot undo these

changes.  Because  of  the  restrictions  and  conditions,  the  data  changed  by  the

comparison is different to the data recorded online. Example: The active comparison

function  books  all  durations  to  resource  performance  account  11  only.  The  RPA

assignment that depends on the workplace status is discarded.

  The active comparison is integrated in the labor time calculation of the Personnel Time

Management PZW. If the active comparison is activated, this has an effect on the run

time of the labor time calculation, which you must not neglect.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 17 of 22

Active PZE/ADE Comparison

Follow the instructions below to activate or deactivate the active BDE/PZW comparison. If you

are  not  sure  how  to  proceed  or  which  effects  might  result,  then  you  can  have  the  active

comparison activated or deactivated by MPDV as service including consulting.

General

You use the system environment variable PZE_ADE_ABGL to activate the active comparison

on the server. Two options are available:

PZE_ADE_ABGL=ALL

All  B  records  (also  manually  changed  records)  are

compared with the PZE (default).

PZE_ADE_ABGL=NOEDIT

Manually changed B records are not compared with the

PZE.

Different activation steps must be performed for the different server operating systems. Please

mind the valid standard installation instruction for HYDRA.

Windows activation

Perform the following  steps for  each system  number  where the  active comparison must  be

activated:

1.  Activate the entry for the environment variable in the file <SystemNr>\hymap.cfg

Select the relevant option ALL or NOEDIT:

...

# Activation of active BDE/PZW comparison

# PZE_ADE_ABGL=ALL    : All B records, even those edited manually, are

#                       synchronized by BDE/PZW comparison (default).

# PZE_ADE_ABGL=NOEDIT : Manually edited B records are not synchronized

#                       by BDE/PZW comparison.

PZE_ADE_ABGL=ALL
...

Note: It is possible that the comments in the file on your system are different.

2.  Create a file <SystemNr>\hymap_pzw_ade.cfg on the server with the following

contents.

Select the same value for PZE_ADE_ABGL as in the file above.

Mind the correct system number of HYSYSTEM!

[Default]

HYSYSTEM=1

[Environment]
PZE_ADE_ABGL=ALL

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 18 of 22

3.  Install the new file using the following command (change the system number!):

ntinst -if 1\hymap_pzw_ade.cfg

Active PZE/ADE Comparison

Screen output:

HYDRA 1

hydadm:1:D:\hydra>ntinst -if 1\hymap_pzw_ade.cfg

----------------------------------------------------

[Default]

hysystem=1

Key SOFTWARE\MPDV\Hydra\1\Environment created.

[Environment]

Key SOFTWARE\MPDV\Hydra\1\Environment created.

Key SOFTWARE\MPDV\Hydra\1\Environment value PZE_ADE_ABGL with content ALL created.

hydadm:1:D:\hydra>

4.  Restart HYDRA on the server.

Checking the result

On

the

server,

an

entry

with

key

PZE_ADE_ABGL

in

path

"HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\Hydra\<SystemNo>\Environment"  must  be

available in the registry.

  Mind the correct system number.

  The value must be ALL or NOEDIT.

You  can  use  the  command  "hygetenv"  to  check  in  the  command  line  on  the  server  if  the

environment variable of the registry is correctly evaluated in the software:

hydadm:F:\Hydra3>hygetenv.exe +PZE_ADE_ABGL
ALL
hydadm:F:\Hydra3>

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 19 of 22

Active PZE/ADE Comparison

The output must be ALL or NOEDIT depending on the option selected.

If the environment variable is included in the registry or if it is not shown with hygetenv, then

you must check the activation steps and correct them, if required.

Windows deactivation

Perform the following  steps for  each system  number  where the  active comparison must  be

deactivated: The instructions refer to the activation steps mentioned above:

1.  Set

the  comment  character

in

front  of

the  activated  entry

in

file

<SystemNo>\hymap.cfg in front of the value PZE_ADE_ABGL

2.  Delete the key PZE_ADE_ABGL from the registry.

3.  Restart HYDRA on the server.

Linux activation

1)  Activate the entry for the environment variable in the file <SystemNo>\hy_env.scr.

Select the relevant option ALL or NOEDIT:

...

#

# Activation of active BDE/PZW comparison

# PZE_ADE_ABGL=ALL    : All B records, even those edited manually, are

#                       synchronized by BDE/PZW comparison (default).

# PZE_ADE_ABGL=NOEDIT : Manually edited B records are not synchronized

#                       by BDE/PZW comparison.

export PZE_ADE_ABGL=ALL
...

Note: It is possible that the comments in the file on your system are different.

2)  Restart HYDRA on the server.

Checking the result

You  can  use  the  command  "hygetenv"  to  check  in  the  command  line  on  the  server  if  the

environment variable is correctly evaluated in the software:

server:hydadm:1:/u1/hydra1> hygetenv.out +PZE_ADE_ABGL
ALLserver:hydadm:1:/u1/hydra1>
server:hydadm:1:/u1/hydra1>

The output must be ALL or NOEDIT depending on the option selected.

If the environment variable is not shown with hygetenv, then you must check the activation

steps and correct and repeat them, if required.

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 20 of 22

Active PZE/ADE Comparison

Linux deactivation

Perform the following  steps for  each system  number  where the  active comparison must  be

deactivated: The instructions refer to the activation steps mentioned above:

1)  Set the comment character in the file <SystemNr>\hy_env.scr in front of the entry

for the environment variable PZE_ADE_ABGL.

2)  Restart HYDRA on the server.

1.7  Logging

1.7.1

Log files

The active BDE/PZW comparison automatically creates log files on the server. The log files

include technical information. The log files can inform about missing settings when the active

BDE/PZW  comparison  is  activated  or  the  log  files  are  requested  by  the  MPDV  support  to

analyze specific issues.

For each personnel number, an own log file is created. It is then easier to make person-related

analyzes. If the files have a specific size, they are renamed and a new file is started. The log

files are located in a subdirectory of the installation directory:

Schema:

<InstDir>\<SystemNr\err\pzeadeab_<PersonnelNo>.pro

Example:

\\MyServer\Hydra3\3\err\pzeadeab_00906000.pro

If no log files are available after a labor time calculation, then the activation was not correct.

Example of the content:

07.03.19 12:00 ==================== S T A R T ===================
--------------------------------------------------
07.03.19 12:00 Start PZE/ADE comparison PNR: [906000] DATB: [02/15/2019] DATE:[03/14/2019] SCOPE: [ALL]
07.03.19 12:00 Option PZE/ADE comparison [N] is not set for person 906000, 02/15/2019 - 03/14/2019
07.03.19 12:00 No PZE bookings for person [906000] available. DATB: [02/15/2019] DATE:[03/14/2019]
07.03.19 12:00 End   PZE/ADE comparison PNR: [906000]
07.03.19 12:00 ==================== E N D =======================
07.03.19 12:11 ==================== S T A R T ===================
--------------------------------------------------
07.03.19 12:11 Start PZE/ADE comparison PNR: [906000] DATB: [02/15/2019] DATE:[03/14/2019] SCOPE: [ALL]
07.03.19 12:11 DB pzebuchung[906000] --> PzeList.size: (0)
07.03.19 12:11 No PZE bookings for person [906000] available. DATB: [02/15/2019] DATE:[03/14/2019]
07.03.19 12:11 End   PZE/ADE comparison PNR: [906000]
07.03.19 12:11 ==================== E N D =======================
07.03.19 12:12 ==================== S T A R T ===================
--------------------------------------------------
07.03.19 12:12 Start PZE/ADE comparison PNR: [906000] DATB: [02/15/2019] DATE:[03/14/2019] SCOPE: [ALL]
07.03.19 12:12 DB pzebuchung[906000] --> PzeList.size: (4)
ZEIB: 26.02. 05:00:00 ZEIE: 26.02. 10:15:00 PZEAWTAG(43521): 02/26/2019 00:00:00
ZEIB: 26.02. 10:45:00 ZEIE: 26.02. 13:00:00 PZEAWTAG(43521): 02/26/2019 00:00:00
ZEIB: 04.03. 14:00:00 ZEIE: 04.03. 18:15:00 PZEAWTAG(43527): 03/04/2019 00:00:00
ZEIB: 04.03. 18:45:00 ZEIE: 04.03. 22:00:00 PZEAWTAG(43527): 03/04/2019 00:00:00
07.03.19 12:12 Last B-Booking to old PNR: [906000] ZEIE: [05.11. 09:49:40] MAXABSENCE: [10]
07.03.19 12:12 No past B-Booking found for PNR: [906000] MAXABSENCE: [10]
07.03.19 12:12 HyFillGap --> m_opMap.size: (1) m_mode:(0)
AdeBookings Result (0):
07.03.19 12:12 End   PZE/ADE comparison PNR: [906000]
07.03.19 12:12 ==================== E N D =======================
07.03.19 12:25 ==================== S T A R T ===================
--------------------------------------------------

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 21 of 22

Active PZE/ADE Comparison

07.03.19 12:25 Start PZE/ADE comparison PNR: [906000] DATB: [02/15/2019] DATE:[03/14/2019] SCOPE: [ALL]
07.03.19 12:25 DB pzebuchung[906000] --> PzeList.size: (4)
ZEIB: 26.02. 05:00:00 ZEIE: 26.02. 10:15:00 PZEAWTAG(43521): 02/26/2019 00:00:00
ZEIB: 26.02. 10:45:00 ZEIE: 26.02. 13:00:00 PZEAWTAG(43521): 02/26/2019 00:00:00
ZEIB: 04.03. 14:00:00 ZEIE: 04.03. 18:15:00 PZEAWTAG(43527): 03/04/2019 00:00:00
ZEIB: 04.03. 18:45:00 ZEIE: 04.03. 22:00:00 PZEAWTAG(43527): 03/04/2019 00:00:00
07.03.19 12:25 Last B-Booking to old PNR: [906000] ZEIE: [05.11. 09:49:40] MAXABSENCE: [10]
07.03.19 12:25 No past B-Booking found for PNR: [906000] MAXABSENCE: [10]
07.03.19 12:25 HyFillGap --> m_opMap.size: (1) m_mode:(0)
AdeBookings Result (1):
  @  ID:      47995            0  MNR=50500  ANR=100000020004  ZEIB=04.03.  13:37:44  ZEIE=04.03.  22:17:54  AGL=  27000  (7.50)  CALC=  31210
PZEAWTAG=03/04/2019
ADEPRO.SELECT        RET: [0] VERWEIS:(47995) RET.VERWEIS: [47995] UPDATE.RET:[0]
ADEPRO SetValue      -------- VERWEIS:(47995) --> changing EGR:BMK07 from "1620" to "0"
ADEPRO.UPDATE        RET: [0] VERWEIS:(47995) RET.VERWEIS: [47995] UPDATE.RET:[0]
ADEPRO.SIGN          RET: [0] VERWEIS:(47995) RET.VERWEIS: [47995] UPDATE.RET:[0]
07.03.19 12:25 End   PZE/ADE comparison PNR: [906000]
07.03.19 12:25 ==================== E N D =======================

Option PZE/ADE comparison [N] is not set for person

For  this  person,  the  active  BDE/PZW  comparison  is  not  activated.  Activate  the  option

"BDE/PZE comparison" in the HR master data. Only then a comparison can be made for

this person.

No PZE bookings for person

Either the labor time calculation did not calculate the wage type postings because of an

error, or you must activate the option Use wage type for comparing with HYDRA-BDE in

the master data of wage type(s).

B-Booking to old

The last BDE posting of the person cannot be used to close the gap because it is too long

in the past.

B-Booking / AdeBookings

Information on BDE personnel postings (B records).

MBL_Adjustment_BDE_PZW.docx  Version: 1.1.20699

Page 22 of 22

