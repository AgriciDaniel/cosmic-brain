Manual

Optimization of Assignments
(Occupancy)
HLS-BOP 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Optimization of Assignments (Occupancy)

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 2 of 11

Optimization of Assignments (Occupancy)

Contents

1  Optimization of Assignments (Occupancy) .................................................. 4

2  Optimization ................................................................................................. 5

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 3 of 11

Optimization of Assignments (Occupancy)

1

 Optimization of Assignments (Occupancy)

Integration and functions

The "optimization" function has been integrated in the graphic planning board and provides the following,

advanced functions:

  Optimization  algorithm  based  on  evolutionary  strategies  for  which  parameters  are  varied  (different

weighting) to perform several planning runs and the best parameters are used for final planning.

  Configuration options to define optimization parameters.

  Selection of pre-defined key figures/KPIs (basic key figures) to specify optimization.

  Definition of individual KPIs by combining and weighting the basic key figures existing in HYDRA.

  Definition of which key figure is to be optimized (e.g. optimization of the order processing time).

  Specification of which weighting parameters (e.g. processing time, priority) are to affect planning and

how often weighting parameters are to be varied (iterations of planning).

  Automatic creation of individual plans by varying the defined weighting parameters and assessments

based on the specified KPIs.

  Final  planning  based  on  the  best  weighting  parameters  and  integration  of  the  plan  to  the  planning

board. Presentation of the KPIs resulting from final planning.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 4 of 11

Optimization of Assignments (Occupancy)

2  Optimization

Overview

Menu

Tab

Production control  Preparations for production  Graphic planning

Optimization

Function authorization

sfs.opt

Purpose

The "optimization" function of the HYDRA Shop Floor Scheduling uses configurable targets to identify the

best  assignment/occupancy.  To  identify  the  best  assignment/occupancy,  several  planning  runs  are

performed. The user specifies the number of planning runs.

Each  planning  run  performs  an  automatic  assignment.  For  each  run,  a  key  figure  is  calculated  that

evaluates  the  planning.  The  separate  planning  runs  use  different  input  parameters  to  vary  the  planning

("mutation"). The optimization algorithm of the HYDRA Shop Floor Scheduling uses the planning strategy

of the target-oriented planning. Using this strategy, the different planning parameters can be changed.

The parameters that influence the automatic assignment are changed at random. The different planning

results are evaluated using key figures defined by the user. The key figures are calculated at the end of

each planning run.

When  all  planning  runs  are  performed,  the  planning  run  with  the  best  key  figure  is  identified.  The

parameters used in this planning run are then used for the final planning.

Requirements

Load a planning scenario in the Graphic planning to perform an optimization run.

You  must  be  authorized  to  use  the  optimization  function  (license  HLS-BOP)  and  the  functions  of  the

detailed planning and assignment (HLS-FBF).

Toolbar

Tab Optimization in the toolbar provides the different optimization functions. This tab is only visible if the

relevant license is available.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 5 of 11

Optimization of Assignments (Occupancy)

 Start optimization

Function authorization: sfs.opt

Opens the dialog to enter optimization parameters and to perform the optimization..

 Show last result

Shows the last optimization result.

 Key figures

Opens the configuration of Key figures.

Start optimization

To perform an optimization run, you must load a planning scenario in the planning board.

The optimization process of HYDRA Shop Floor Scheduling can be divided into the following steps:

Definition of
Parameters

Performing
planning runs
(simulations)

Running
the "best" plan

1) Definition of parameters

Make the following settings in the Optimization dialog for an optimization run.

Optimization based on key figure

Select  the  key  figure  used  for  the  optimization.  The  objective  of  different  planning  processes  in  an

optimization run is to identify the best possible value for this key figure.

For optimization,  you can  use one  of the key figures that can  also  be displayed in the graphic planning

board (Gantt). You can use a basic key figure or a key figure defined by the user.

If  the  dialog  is  opened  for  the  first  time  or  in  case  the  relevant  file  has  been  deleted  in  the  local  log

directory, the last key figure included in the list is used by default.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 6 of 11

Optimization of Assignments (Occupancy)

Parameters

To vary the different planning runs ("mutation of characteristics"), the parameters of the planning strategy

"target-oriented  planning"  are  used.  These  parameters  get  a  different  weighting  in  each  of  the  planning

runs.  The  weighting  is  defined  at  random  for  each  planning  run.  The  user  defines  the  range  for  the

weighting of a parameter, i.e. the minimum and maximum variation.

The  total  of  all  weightings  of  the  different  parameters  can  be  greater  or  less  than  100.  In  this  case,

weightings are converted internally to the basis 100 [%].

Number of iterations per parameter

Planning processes are performed for each parameter having a weighting > 0. This value specifies how

often the parameter is changed (number of variations). A maximum of 999 planning processes (iterations)

can be performed for each parameter. The total number of planning runs is calculated as follows:

Number of planning processes = (number of parameters with weighting > 0) x (number of iterations per

parameter) + 1.

The last planning (+ 1) is based on the parameters of the key figure with the best result (see below).

The more iterations are made per parameter, the longer the optimization time!

Subject to the number of iterations and number of set parameters having a weighting > 0, the

duration of an optimization run can range between a few minutes and several hours! During that

time, you cannot work on the MOC.

We recommend to perform optimization runs with only a few iterations (e.g. 10) and to monitor

the run time.

Also watch the optimization result. Because it is possible that a high number of iterations does

not lead to better results.

2) Performing planning runs

When  you  have  entered  the  required  parameters  and  the  dialog  is  confirmed,  the  optimization  is

performed. For the optimization, the different planning runs are performed (simulated). A dialog shows the

planning progress.

You cannot cancel an optimization run!

We recommend to perform optimization runs with only a few iterations (e.g. 10) and to monitor

the run time.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 7 of 11

Optimization of Assignments (Occupancy)

To  make  sure  that  you  can  compare  the  different  planning  results,  the  planning  always  uses  the  same

initial assignment/occupancy situation. This means: All operations that are not fixed are deallocated and a

complete re-planning can be performed.

A "coefficient of sequence" (RFK) is specified for each operation at the beginning of each planning. This

coefficient is calculated using the selected parameters (parameters with weighting > 0) and specifies the

sequence ("queue") used to plan the different operations.

Example

RFK = K.BearbZ * BearbZ + K.PufferZ * PufferZ + K.PRIO * Prio

K.x are the weighting factors that specify the influence of the separate elements.

BearbZ,  PufferZ,  Prio  are  values  of  the  order  or  operation.  These  values  are  standardized  internally  to

make sure that the values can be compared (e.g. prio 0 - 9 does not match a processing time (BearbZ) of

1000 h).

The  individual  plans  are  performed  for  each  parameter  (with  the  specified  number  of  iterations  per

parameter).  In  this  context,  the  weighting  factor  varies  randomly  within  the  range  resulting  from  the

specified  variation  (see  above).  The  assignments  are  made  according  to  the  same  principles  as  for  a

simple, automatic assignment. The key figure (see above) defined by the planner is identified and saved

at the end of each planning run.

The sequence used to vary the different weighting parameters is as follows:

  Processing time

  Buffer time

  Lateness

  Reduction level

  Priority

  Number of capacities

The different weighting parameters are explained below.

When all planning processes for the different parameters are completed, the weighting factor is identified

that returned the best key figure. This weighting factor is used for further planning.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 8 of 11

Optimization of Assignments (Occupancy)

3) Running the best plan

When  all  planning  processes  with  all  parameters  are  performed,  the  different  planning  processes  are

evaluated and the "best planning" is identified. The "best planning" is the planning with the best result for

the key figure specified by the planner.

The final planning is then performed using the parameters and weightings of the "best planning" identified

before.

At  the  end  of  the  optimization  run,  a  dialog  "optimization  result"  opens  showing  the  results  of  the

optimization run. The dialog is described in section "Show last result“.

When  the  last  planning  is  executed,  this  planning  is  not  immediately  stored  in  the  database.

You can reject the planning without saving or edit the planning and then save it.

Show last result

You can only call this function if you have performed at least one optimization run.

It  can  take  several  minutes  until  the  dialog  is  displayed  that  shows  the  results  of  the  (last)

optimization  run.  The  time  depends  on  the  number  of  iterations  and  the  number  of  set

parameters having a weighting > 0.

The dialog "optimization result" shows the results of the current or last optimization run. The dialog shows

the following information:

Progression of key figures

A line chart shows the progression of the key figure that has been specified at the beginning of the (last)

optimization run.

For  each  iteration,  the  optimization  function  shows  the  key  figure  without  dimension  that  has  internally

been identified.

The  x-axis  shows  the  numbers  of  plannings  included  in  the  optimization  run.  The  y-axis  is  not  labeled

because the values are displayed without dimension.

Distribution of optimized parameters in percent

The parameter values of the planning run that has achieved the best key figure is displayed to the right of

the line chart.

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 9 of 11

Optimization of Assignments (Occupancy)

The  absolute  values  are  shown  in  the  lower  section;  the  upper  section  shows  the  distribution  of  these

values in a pie chart. The values are standardized based on 100%. Because these standardized values

deviate from the absolute values, they are not labeled in the pie chart.

The

information  displayed  here

is  stored

locally

in

files  of

the  user  directory

c:\Users\<user>\AppData\Roaming\MPDV\MOC\log\ during the optimization run. If this directory

or its files are deleted, a last result can no longer be displayed.

Weighting parameters

The following weighting parameters can be selected:

Processing time

The  processing  time  is  calculated  using  the  remaining  run  time  of  the  operation  according  to  the

remaining  run  time  formula  plus  (static)  setup  and  teardown  time.  You  use  the  option  "Prioritize  longer

processing  time"  to  specify  whether  operations  with  shorter  processing  times  or  operations  with  longer

processing times take priority.

If an operation can be planned for several, alternative workplaces, the average of all processing times of

the workplaces is used as processing time.

Buffer time

Buffer time of the order (order buffer).

Delay time

The delay time is calculated from the scheduled end of the order minus the basic end date of the order.

Reduction level

Current reduction level of the order (only reasonable if reduction strategies are used).

Priority

Priority of order.

Number of alternative capacities

The number of alternative (primary) capacities results from the available resources that could be used. If

production variants are available, these variants are also integrated.

Example for variability

Parameter

Weighting

Variability

Processing time

Delay time

30

70

Number of iterations:   5

20

50

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 10 of 11

Using  the  above  sample  figures  and  a  weighting  of  30  [%]  for  the  criterion  "processing  time",  then  the

following range is calculated with 5 deviation values specified randomly.

Optimization of Assignments (Occupancy)

Optimization of Assignments (Occupancy) Version: 1.1.23049

Page 11 of 11

