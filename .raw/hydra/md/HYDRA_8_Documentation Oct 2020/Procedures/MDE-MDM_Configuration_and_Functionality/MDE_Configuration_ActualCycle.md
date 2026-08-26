Configurations to Identify the Actual Cycle

1  Configurations to Identify the Actual Cycle

Purpose

In  a  production  using  clocks,  the  display  of  the  current  actual  cycle  of  a  machine  is  an  important

information. The system provides different options to calculate the actual cycle:

  Calculating the actual cycle via CT-MSS

  Calculating the actual cycle via CT-UMPS

  Calculating the actual cycle via direct connection to control systems (provision of variables via control

system)

  Calculating the actual cycle on the terminal AIP 8.1/AIP 8.2, if you do not use CT-MSS or CT-UMPS

  Calculating the actual cycle on the server

This document describes the different data collection configurations and calculations options of the actual

cycle. This document also  describes the configuration options for the  display on  the shop floor terminal

AIP.

You can display the actual cycle on the MOC in the following MOC applications:

  Workplaces/machines

  Cycle progression.

In addition to the current  actual cycle, the shop floor  data collection (BDE) provides an actual

cycle  for  the  respective  operation.  The  calculation  of  the  operation-related  actual  cycle  is

described in the document OBJECT_MES-Operation_ActualData.pdf.

Calculating the actual cycle via CT-MSS

The CT-MSS measures the actual cycle with each clock. To calculate the actual cycle, the system uses

the first counter configured with the option "cycle monitoring" (counter with the smallest counter number).

The  sampling  rate  (precision)  is  100  milliseconds  by  default.  The  maximum  actual  cycle  that  you  can

identify is 50 minutes.

For  machines  with  very  rapid  clocks,  the  sampling  rate  can  be  reduced  to  20  milliseconds  via  the

following configuration in the ctaip.ini. The maximum actual cycle that you can identify in this case is 10

minutes.

[MSS-INIT]

MSSZyklusReferenz=2

; sampling rate: 0 = 100ms, 2 = 20 ms, default is 0

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 1 of 8

Configurations to Identify the Actual Cycle

The  actual  cycle  is  passed  from  the  CT-MSS  to  the  terminal  where  you  can  visualize  it.  The  terminal

sends  the  actual  cycle  (acronym  IZY)  with  each  status  update  (dialog  M_AST,  usually  every  120

seconds)  to  the  server.  The  server  then  writes  the  actual  cycle  to  the  database  (data  field

maschinen_status.mstck).

Deactivating the calculation of the actual cycle

You  can  deactivate  the  calculation  of  the  actual  cycle  via  MSS.  Enter  the  following  configuration  in  the

ctaip.ini in section [MSS-INIT]:

[MSS-INIT]

MSSZyklusBerechnung=OFF

(Note: if the entry is not available, the calculation of the actual cycle is performed)

In  this  case,  no  actual  cycle  is  passed  to  the  PCC;  the  PCC  calculates  the  actual  cycle  (see  section

Calculating the actual cycle via PCC).

Calculating the actual cycle via CT-UMPS

The CT-UMPS measures the actual cycle with each clock. To calculate the actual cycle, the system uses

the first counter configured with the option "cycle monitoring" (counter with the smallest counter number).

The sampling rate (precision) is 10 milliseconds by default.

To this end, you must define an OPC variable Z:Z00X in the configuration file opcmpdv.ini:

Z:Z00X=CT-UMPS/Cycle_Time_Y

The  actual  cycle  is  passed  from  the  CT-UMPS  to  the  terminal  where  you  can  visualize  it.  The  terminal

sends  the  actual  cycle  (acronym  IZY)  with  each  status  update  (dialog  M_AST,  usually  every  120

seconds)  to  the  server.  The  server  then  writes  the  actual  cycle  to  the  database  (data  field

maschinen_status.mstck).

Deactivating the calculation of the actual cycle

You can deactivate the calculation of the actual cycle via CT-UMPS. Enter the following configuration in

the ctaip.ini in section [MSS-INIT]:

[MSS-INIT]

MSSZyklusBerechnung=OFF

(Note: if the entry is not available, the calculation of the actual cycle is performed)

Other  option  –  for  example,  if  the  PCC  is  run  stand-alone,  the  configuration  definition  Z:Z00X  is  not

performed.

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 2 of 8

Configurations to Identify the Actual Cycle

In  this  case,  no  actual  cycle  is  passed  to  the  PCC;  the  PCC  calculates  the  actual  cycle  (see  section

Calculating the actual cycle via PCC).

Calculating the actual cycle via direct connection of control system

The  actual  cycle  can  be  passed  directly  from  the  machine  control  system  as  separate  variable  (e.g.

OPC).

To this end, you must define a variable Z:Z00X in the respective configuration file. Examples:

  opcmpdv.ini:

Z:Z001=S7/Cycle_Time

Note:  The  mapping

to

the  S7  address

is  made

in

the  OPC  server  configuration,  e.g.

S7/Cycle_Time=DB100.DBW2

  e63.ini:

Z:Z001=ActTimCyc

The actual cycle must be passed in [msec]. The data format of the variable defines the maximum actual

cycle.

Deactivating the calculation of the actual cycle

If  the  machine  control  cannot  calculate  an  actual  cycle,  the  configuration  definition  is  not  performed.  In

this case, the PCC can calculate the actual cycle (see section Calculating the actual cycle via PCC).

Calculating the actual cycle on the terminal AIP 8.1

If you do not use CT-MSS or CT-UMPS, the terminal can identify the actual cycle.

Only  with  terminals  in  operation  mode  "MDE",  the  actual  cycle  is  calculated.  The  actual  cycle  is  only

updated  if  the  machine  is  in  the  "production"  status  and  if  a  valid  shift  is  currently  available  for  the

machine according to the defined shift calendar. In addition, the terminal must actually record cycles and

data  must  be  transferred  from  the  terminal  to  the  server  (online).  Otherwise,  the  previous  value  is  still

displayed, even if the machine is no longer in the "production" status.

The system does not calculate the actual cycle, if the quantities are only recorded manually.

The  terminal  can  only  identify  an  actual  cycle  if  at  least  two  clocks  are  recorded.  The first clock  after  a

malfunction is skipped, as otherwise a wrong actual cycle would be identified.

To  calculate  the  actual  cycle,  the  system  uses  the  first  counter  configured  with  the  option  "cycle

monitoring" (counter with the smallest counter number). This counter must also be set if operating signals

are monitored and the terminal is supposed to identify actual cycles in addition to operating signals.

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 3 of 8

Configurations to Identify the Actual Cycle

To  smooth  cycle  time  fluctuations  in  production,  the  system  calculates  mean  values  using  the  last  20

measured values.

Make the following entries in the configuration file ctaip.ini on the Windows terminal:

[MSS-INIT]

CalculateCycle=ON

MSSZyklusberechnung=OFF

If CalculateCycle=ON, then MSSZyklusBerechnung=ON is implicitly disabled, if available.

[Layout]

ActualCycleView=on

The  terminal  sends  the  actual  cycle  (acronym  IZY)  with  each  status  update  (dialog  M_AST,  usually

every  120  seconds)  to  the  HYDRA  server.  The  HYDRA  server  then  writes  the  actual  cycle  to  the

database (data field maschinen_status.mstck).

Calculating the actual cycle via PCC / on the terminal AIP 8.2

The PCC calculates the actual cycle, if the following conditions are fulfilled:

  The  PCC  is  active,  i.e.  the  PCC  runs  either  stand-alone  or  in  an  AIP 8.2  in  so-called  combined

operation.

  The file mdeb2.dll has at least version 8.1.0.16.

You can find the version number in file #dirinfo.lst in the spool directory. The file is generated with a

terminal  upload.  To  start  the  terminal  upload,  use  the  function  Terminal  administration  >  Request

diagnosis files in the Terminal configuration.

  Via CT-MSS, CT-UMPS or via OPC, no actual cycle is passed, i.e.

o  no Z channel is configured or

o

in the ctaip.ini, MSSZyklusberechnung=OFF is configured



In the Counter configuration, at least one counter is configured where the option Cycle monitoring is

enabled.

To  calculate  the  actual  cycle,  the  system  uses  the  first  counter  configured  with  the  option  "cycle

monitoring" (counter with the smallest counter number). This counter must also be set if operating signals

and actual cycles are identified. The setting Monitoring type in the Workplace and resource configuration

has no effect on the calculation of the actual cycle.

If  the  option  Cycle  monitoring  is  not  enabled  with  any  counter,  the  actual  cycle  is  not  calculated.  No

acronym IZY is passed to the server.

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 4 of 8

Configurations to Identify the Actual Cycle

The actual cycle  is only  identified,  if the machine  is  in  production. And  the system must actually record

cycles  (via  C  channels).  Otherwise,  the  value  0  is  passed  to  the  terminal  or  server  as  actual  cycle.  If

quantities are only recorded manually, the PCC does not calculate an actual cycle.

To  identify  an  actual  cycle,  at  least  two  clocks  must  have  been  recorded.  The  first  clock  after  a

malfunction is skipped, as otherwise a wrong actual cycle would be identified.

Calculation of the mean value

To  smooth  cycle  time  fluctuations  in  production,  the  system  calculates  mean  values  using  the  last  20

values of actual cycles. See the following examples:

For  a  better  overview,  the  actual  cycle  is  presented  in  seconds  in  the  examples  that  follow  (e.g.  2.1

seconds). Internally, the system identifies and saves the actual cycle in milliseconds (e.g. 2119 [msec]).

The system uses the  last  20 actual cycles remembered and the current actual  cycle (curr.) to calculate

the mean  value for the actual cycle that  is sent to the terminal or server.  At the  same time, the current

actual cycle is remembered (not the mean value); the oldest actual cycle that  has been remembered is

removed.

Time t0:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.0

2.1

2.0

2.0

2.1

2.1

2.1

1.9

2.0

2.1

2.0

2.0

2.0

2.1

2.0

2.1

2.1

2.0

2.1

2.1

2.0

20…1 = the last 20 actual cycle values identified | curr. = currently identified actual cycle

Time t1:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.1

2.0

2.0

2.1

2.1

2.1

1.9

2.0

2.1

2.0

2.0

2.0

2.1

2.0

2.1

2.1

2.0

2.1

2.1

2.0

1.9

If an actual cycle is identified that deviates significantly from the actual cycle values previously recorded,

this actual cycle is "channelled" through the 20 values. This deviating actual cycle affects the mean value

displayed for the actual cycle during this period of time.

Time t0:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.0

2.1

2.0

2.0

2.1

2.1

2.1

1.9

2.0

2.1

2.0

2.0

2.0

2.1

2.0

2.1

2.1

2.0

2.1

2.1

9.0

Time t7:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.0

2.1

2.0

2.0

2.1

2.1

1.9

2.1

2.0

2.1

2.0

2.0

2.0

9.0

2.0

2.1

2.1

2.0

2.1

2.1

2.0

Time t14:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.1

2.0

2.1

2.0

2.0

2.0

9.0

2.0

2.1

2.1

2.0

2.1

2.1

2.0

1.9

2.0

2.1

2.0

2.0

2.1

1.9

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 5 of 8

Configurations to Identify the Actual Cycle

In case of a malfunction, all previously recorded values for the actual cycle are deleted:

Last calculation of mean value before changing from production  malfunction:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

2.0

2.1

2.0

2.0

2.1

2.1

2.1

1.9

2.0

2.1

2.0

2.0

2.0

2.1

2.0

2.1

2.1

2.0

2.1

2.1

9.0

Change production  malfunction:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

After  a  restart,  i.e.  after  a  change  from  malfunction    production,  no  values  for  the  actual  cycle  of  the

past are available. The calculation of the mean value therefore uses only the values for the actual cycle

remembered up to the respective point in time, until 20 values are again available for the actual cycle:

Time t0 after change from malfunction  production:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

1.9

Time t6:

20

19

18

17

16

15

14

13

12

11

10

9

8

7

6

5

4

3

2

1

curr.

1.9

2.0

2.0

1.9

2.1

2.1

2.0

Note: You can change the number of measured values used to calculate the mean value. To change the

number,  you  must  explicitly  request  the  acronym  MWANZ  for  the  [machine  list]  in  the  configuration  file

ctaiplay.ini.  Also specify the  Number of cycles to  be  evaluated (1 to a maximum of 9) in the  Workplace

configuration on the MOC. If you enter the value 0 in the input field, the default number of 20 measured

values is used.

Communication with terminal AIP 8.2 or server

The mean value of the actual cycle (acronym IZY) is cyclically sent  – every 120 seconds – to the server

as part of the so-called status update (dialog M_AST). And also with each status change (dialog M_MST),

the  actual  cycle  is  sent  to  the  server.  The  HYDRA  server  then  writes  the  actual  cycle  to  the  database

(data field maschinen_status.mstck).

If  the  status  changes  from  production  to    malfunction,  the  status  update  (M_MST)  includes  the  last

actual cycle of the production.

Display of the actual cycle on the terminal if the MDE data collection runs in combined operation

The actual cycle on the terminal AIP 8.2 is immediately updated.

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 6 of 8

Configurations to Identify the Actual Cycle

Display of the actual cycle on the terminal if the  MDE data collection is performed with a stand-

alone PCC

The  actual  cycle  is  updated  on  the  terminal  AIP  8.2  with  the  cyclic  reload  of  the  machine  list  (default:

every 10 minutes).

Display of the actual cycle on the MOC

If communication to the server is not possible, the  MOC continues to show the last value. This value is

also shown if the machine is not in production any more.

The  actual  cycle  displayed  on  the  MOC  can  be  different  to  the  actual  cycle  displayed  on  the

AIP 8.2  because  the  actual  cycle  is  only  sent  to  the  server  in  case  of  specific  events  (dialogs

M_AST, M_MST).

Identification of actual cycle on the server

If the actual cycle cannot be calculated on the terminal or via PCC and if the following requirements are

fulfilled, then the server calculates the actual cycle:

  The dialog string that the terminal/PCC sends to the server does not include the acronym IZY.



In the Counter configuration, the option "Posting as cycles" is enabled for at least one counter.

The server uses the following formula to calculate the actual cycle:

𝐴𝑐𝑡𝑢𝑎𝑙 𝑐𝑦𝑐𝑙𝑒 =

𝐶𝑦𝑐𝑙𝑒𝑠 𝑟𝑒𝑐𝑜𝑟𝑑𝑒𝑑 𝑑𝑢𝑟𝑖𝑛𝑔 𝑠𝑡𝑎𝑡𝑢𝑠 "𝑃𝑟𝑜𝑑𝑢𝑐𝑡𝑖𝑜𝑛 (𝐴𝐺𝑅:𝐻𝑈𝐵)

𝐷𝑢𝑟𝑎𝑡𝑖𝑜𝑛

The  time  results  from  the  difference  between  current  time  and  the  time  when  the  actual  cycle  was  last

calculated, i.e. since the last status update (dialog M_AST, acronym "IZY", usually every 120 seconds).

The server might calculate an actual cycle, which does not necessarily match the actual cycle

time of the machine!

Display of cycles on the terminal AIP 8.1

Via  customization,  you  can  display  the  actual  cycle/target  cycle  in  the  dialogs  on  the  AIP  that  show

machine information (MMINFO and MINFO). The following formats are supported:

  Seconds/1000 cycles (equals milliseconds per 1 cycle)

  Seconds/cycle

  Cycles/minutes

You must store the acronym MNR.IZY in the respective dynamic dialogs to this end.

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 7 of 8

Configurations to Identify the Actual Cycle

In AIP standard processing, the field is automatically downloaded when data is reloaded.

If you use a customized version of the ctaiplay.ini file, this file could overwrite the downloaded

field.

To display the respective format, you must store the required acronym in the dialogs:

  Display "actual cycle [sec/cycle] / [sec/stroke]" using "MNR.IZY/HUB"

o  Acronym: MNR.IZY/HUB referred to as Actual cycle [sec/cycle] or Actual cycle

[sec/stroke]

  Display "actual cycle [cycles/min.] / [strokes/min.]" using "MNR.IZY/MIN"

o  Acronym: MNR.IZY/MIN referred to as Actual cycle [cycles/min.] or Actual cycle

[strokes/min.]

Display of cycles on the terminal AIP 8.2

The  document  AIP2_Configuration_GUI.pdf  describes

in  chapter  Constants

(Defines),  section

FORMAT_CYCLE, and in chapter CalculatedFields the configuration options that are available to display

the actual cycle or target cycle in the tile view on the AIP 8.2.

To display the actual cycle or the target cycle in the dynamic dialogs, e.g. in the machine information, the

configuration options described in the previous section apply (Display of cycles on the terminal AIP 8.1).

MDE_Configuration_ActualCycle.docx

Version: 1.10.18468

Page 8 of 8

