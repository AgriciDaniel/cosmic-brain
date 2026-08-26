Cycle progression

1  Cycle progression

Overview

Menu

Resource management  Key figures  Cycle progression

Transaction code

Cycl

Function authorization  Cycl

Purpose

The purpose of this overview is to show a timely presentation of a machine's cycle development over a

period of time that you can select.

Integration

The data displayed here  are collected and saved as  part of the machine data collection (MDE).  Please

also note the information about the database at the end of this section.

Requirements

Please also note the information about the database at the end of this section.

Selection criteria

The application provides the following selection criteria:

Workplace

Enter  the  number  of  the  workplace/  machine,  for  which  you  would  like  to  display  a  cycle

progression.

Point in time ... to ...

When the application is pulled up, the point in time is predefined as follows:

From:

Date = "yesterday"/ time = "now"

To:

Date = "today"/ time = "now"

Choose the point in time for which the cycle progression should be displayed. Please keep in mind

that the length of the point in time will affect data calculation and therefore the response time for the

evaluation.

Grid

When the application is pulled up, the grid "point in time" is predefined. Choose the desired grid in

which you would like the evaluation to run.

MOC_CycleProgression.docx

Version: 1.5.18468

Page 1 of 5

Cycle progression

If grid spacing is chosen (not equal to "point in time"), then the calculated actual cycle

is the arithmetic mean value of all random samples of actual cycles in the relevant grid

spacing period:

The  time  for  the  values  in  this  case  is  the  end  time  of  the  grid  interval.  Thus,  for

example, for hour grids, the values between 13.00 and 14.00 are averaged and 14.00

is displayed as the point in time.

Tabular report

Different presentation options can be chosen for the table view. The below-mentioned data is shown:

Date, time

Point  in  time  when  actual  cycle  data  was  saved.  Please  also  note  the  information  about  the  data

basis at the end of this section.

Sec/ cycle (depending on the selected table)

Shows the actual cycle in [seconds/cycle].

Cycle/ sec (depending on the selected table)

Shows the actual cycle in [cycles/seconds].

Min/ cycle (depending on the selected table)

Shows the actual cycle in [minutes/cycle].

Cycle/ min (depending on the selected table)

Shows the actual cycle in [cycles/minutes].

LTL (lower tolerance limit)

Calculated lower tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration Cycle parameter.

Formula: LTL = Target cycle - (Target cycle * [Tolerance limit, negative] / 100)

LAL

Calculated lower action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration Cycle parameter.

Formula: LAL = Target cycle - (Target cycle * [action limit, negative] / 100)

MOC_CycleProgression.docx

Version: 1.5.18468

Page 2 of 5

Cycle progression

UAL

Calculated upper action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration Cycle parameter.

Formula: UAL = Target cycle + (Target cycle * [action limit, positive] / 100)

UTL (upper tolerance limit)

Calculated upper tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration Cycle parameter.

Formula: UTL = Target cycle + (Target cycle * [Tolerance limit, positive] / 100)

The application does not show the target cycle that is active when saving an actual cycle.

Changes to data in the "machine-related postings" application do not affect this application.

Graphic detail applications

Similar to the tabular detail applications, there are four different detail applications available to show the

values as a graphic display, each of which present the data in a different unit:

  Seconds/ cycle

  Cycles/ second

  Minutes/ cycle

  Cycles/ minute

The tolerance limits (red) and action limits (yellow) are shown in graphics.

Notes on the data basis for the display of cycle progression

The  current  actual  cycle  for  each  of  the  separate  machines  is  stored  together  with  the  current  point  in

time and the currently set target cycle in a special log table using a cyclic process.

MOC_CycleProgression.docx

Version: 1.5.18468

Page 3 of 5

Schematic process:

Cycle progression

By default, the cycle for which the process stores the data in the log table for cycle progression is set to

every 30 minutes. If necessary, this cycle can also be set to lower intervals (e.g. every 15 minutes) while

taking into account the total capacity of the customer's system.

If the value  of an actual cycle stays for a longer time at e.g. 0, the scheduler continues  to

create  cyclic  entries.  All  entries  include  the  same  actual  cycle  and  the  same  time  stamp

(time stamp when the value was set).

Subsequent changes to data in the "machine-related postings" application do not affect the

cyclic process.

The application Cycle progression accesses values stored in the log table and displays these as a graph

in the time progression.

By  default,  the  cycle  data  for  a  machine  are  available  for  50  calendar  days.  If  necessary,  the  data  for

each  machine  can  also  be  stored  for  a  longer  time  (e.g.  90  days)  while  taking  into  account  the  total

capacity of the customer's system (must be assured by the customer).

For both cases (modifying logging interval or availability duration of the data), the respective entry must

be adjusted in the Scheduler:

Field

Type

Category

Alterable

Visible

Product key

Value

S (Standard)

I (interval)

Yes

Visible

MDE-BP

MOC_CycleProgression.docx

Version: 1.5.18468

Page 4 of 5

Cycle progression

Field

License key

Value

MDE-BP

HYDRA users

0

Command

Comment

Interval

Active

./mz_zykl.exe  50

MDE cycle progression

00:30:00



You must restart the MES after having modified the values.

The  value  behind  the  command  is  the  availability  period  of  log  data  in  days  for  cycle

analyses.

MOC_CycleProgression.docx

Version: 1.5.18468

Page 5 of 5

