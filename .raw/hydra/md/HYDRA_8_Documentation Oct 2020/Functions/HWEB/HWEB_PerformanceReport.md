Performance Report

1  Performance Report

Overview

The  analysis  concerns  workplace/  machine-related  performance  data  for  a  certain  period  of  time  and  a

certain number of workplaces. The results depend on the selections made. The performances displayed

in graphic form for quantities and duration provide the production controller with the desired information

immediately at a glance.

Selection criteria

The application provides the following selection criteria:

Workplace

This selection criterion references the workplace in the machine or workplace master data. You can also

run a search using wildcards (placeholders *).

Group

This  selection  criterion  references  the  group  in  the  machine  or  workplace  master  data.  All  machines  or

workplaces  are  displayed  that  are  assigned  to  the  selected  group.  You  can  also  run  a  search  using

wildcards.

Cost center

This selection criterion references the cost center defined  in the machine  or  workplace master data.  All

machines or workplaces are displayed that are assigned to the selected cost center. You can also run a

search using wildcards.

Short designation

This selection criterion references the short name of the machines in the master data. All of the machines

or  workplaces  are  displayed  that  match  the  string  that  was  entered.  You  can  also  run  a  search  using

wildcards.

Report group

This selection criterion references the report groups.  All machines or  workplaces are displayed that  are

assigned to the selected report group. You cannot run a search using wildcards.

Date from ... to (shift/ time)

The period for the data to be evaluated can be limited via the date selection option.

If a selection is made via a shift (shifts), the shift date is evaluated. If no shift has been selected, all shifts

are considered.

The two times each refer to the start or to the end of the date periods listed above.

HWEB_PerformanceReport.docx

Version: 1.0.1362

Page 1 of 4

Performance Report

Performance report

The  performance  report  concerns  workplace/  machine-related  performance  data  for  a  certain  period  of

time  and  a  certain  number  of  workplaces.  The  results  depend  on  the  selection  and  therefore  on  the

selection criteria made available on the selection panel.

The following workplace/ machine-related master data is available:

  Workplace

  Short designation

  Group

  Yield (primary quantity unit)

  Scrap (primary quantity unit)

  Unit (primary quantity unit)

  Rate = 100 / ((yield (primary quantity) + scrap

(primary quantity) + rework quantity (primary quantity) + open quantity (primary quantity)) * yield

(primary quantity)

  Scrap rate = 100 / ((yield (primary quantity) + scrap (primary quantity)) * scrap (primary quantity)

  Number of booked cycles

  MUT = RPA11

  Downtimes = RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07 + RPA08 + RPA09 +

RPA10

  Total = production + downtime

HWEB_PerformanceReport.docx

Version: 1.0.1362

Page 2 of 4

Performance Report

  Rate of capacity utilization

The rate of capacity utilization represents the ratios derived from the effective runtime and the

machine operation time.

Rate of capacity utilization = 100/ (RPA01 + RPA02 + RPA03 + RPA04 + RPA05 + RPA06 + RPA07

+ RPA08 + RPA09 + RPA10 + RPA 11) * RPA11

  Assignment utilization rate:

The assignment utilization rate represents the relationship resulting from the effective runtime (main

utilization time) and the adjusted machine operation time (i.e. without scheduled downtimes).

Assignment utilization rate = 100 / (total of RPA 1 to RPA 11 minus RPA 6) * RPA 11

  Technical efficiency

The variable showing the technical efficiency represents the sum total of the effective runtime and

interruptions caused by technical (machine-related) disturbances. The times for all other disturbances

(e.g. organization-related disturbances) are not accounted for in this calculation:

Technical efficiency = 100 / (RPA02 + RPA11) * RPA11

Graphic efficiency report

This detail application creates two graphic presentations:

Shown in the resource performance accounts graphic are the posted durations broken down by each of

the resource performance accounts 1-12 in the form of a pie chart. Illustrated in the legend to the right of

the  chart  for  each  of  the  resource  performance  accounts  are,  in  addition  to  the  color,  the  RPA  number

and the designation, also the durations as absolute values as well as their share of the total number of

resource performance accounts in percent.

Shown in the primary quantities graphic are the posted quantities broken down by each separate quantity

types (yield, scrap, rework and open quantity), also in the form of a pie chart. Illustrated in the legend to

the right of the chart for each of the resource performance accounts are, in addition to the color and the

quantity type, also the quantities as absolute values as well as their share of the total number of resource

performance accounts in percent.

Graphic performance profile

Two graphics are available in the graphic performance profile detail application:

Based  on  the  entries  selected  in  the  table,  the  posted  absolute  time  durations  -  time  of  production  and

standstill  period  -  are  shown  in  the  Durations  chart  as  stacked  bars. The  values  (grid  spacing  on  the  X

axis) are presented on the shift level.

HWEB_PerformanceReport.docx

Version: 1.0.1362

Page 3 of 4

Performance Report

Similar  to  the  durations,  the  quantities  of  the  posted  absolute  quantities  (primary  quantity  unit)  -  yield,

scrap  -  are  also  shown  in  the  chart  as  stacked  bars.  The  values  (grid  spacing  on  the  X  axis)  are  also

presented on the shift level.

Graphic capacity utilization profile

Shown in a line chart in the graphic capacity utilization profile detail application are the key figures

  Rate of capacity utilization

  Assignment utilization rate

  Technical efficiency

  Rate

distributed over a period of time (grid spacing on the X axis on a shift level). The color code for each of

the key figures is listed in the legend on the right side of the chart.

Please note: for technical reasons, the partial paths of the lines are shown in the form of a dotted line.

HWEB_PerformanceReport.docx

Version: 1.0.1362

Page 4 of 4

