Shift Automatism

1  Shift Automatism

Usage

The  shift  automatism  activates  functions  that  facilitate  data  collection  as  well  as  operability  by  enabling

the terminal to automatically recognize shift start and shift end for the  workplaces/machines assigned to

it.

Integration

An active shift automatism has an effect on







the generation of order-related postings (log records) in shop floor data collection (BDE).

the generation of machine-related postings (log records) in machine data collection (MDE).

the test times in CAQ.

Prerequisite

The  functions  described  below  are  only  active  on  a  machine/a  workplace  meeting  the  following

requirements:

  The machine/workplace is configured as a so-called "Single workplace".

  The machine/workplace is attributed to a terminal configured with operation mode "MDE".

These functions are not available at workplaces configured as group workplaces.

In order to ensure processing, the terminal software must be running!

Features

The following actions are initiated upon an automatic shift change:

  at the end of shift according to the BDE shift calendar, the running OP is interrupted automatically;

  at the next shift start according to the BDE shift calendar, this OP is logged on again automatically.

  Persons may perform an "Advance logon" at a terminal by a specific deadline prior to shift start (acc.

to  BDE  shift  calendar).  At  the  next  shift  start,  the  terminal  will  then  log  these  persons  on  to  the

operation. The time range is determined by the Waiting period for advance logon of staff option of the

terminal configuration.

AIP_ShiftAutomatism.docx

Version: 1.0.1362

Page 1 of 2

Shift Automatism

The chart below shows the time sequence of logons and logoffs upon a shift change.

Description of sequence:

1.

An OP was logged on in the current shift 1 and is also to be continued in the following shift 2.

2.

Person 1 logs on to the workplace.

3.

Person  2  arrives  shortly  before  the  end  of  shift  and  logs  onto  the  workplace.  Since  logon  takes

place  within the specified 30 minutes of advance logon time, the terminal recognizes an advance

logon.

4.

At  the  end  of  shift,  the  running  OP  is  interrupted  automatically  and  all  persons  logged  on  are

logged off.

5.

At  the  start  of  the  next  shift,  the  previously  interrupted  OP  is  logged  on  again.  In  addition,  the

persons with advance logon are logged on.

Since data collection at the terminals must not be interrupted and not all terminals may send all

postings  simultaneously  at  the  end  of  shift,  the  log  records  are  buffered.  Subsequently,  the

buffer  is  transferred  in  brief  intervals  to  the  server.  This  process  depends  on  the  number  of

machines defined at a terminal. Postings made during this period are buffered in turn.

AIP_ShiftAutomatism.docx

Version: 1.0.1362

Page 2 of 2

