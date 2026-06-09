ABC Analysis

1  ABC Analysis

Overview

Menu

Production Facility Management  Status analyses  ABC analysis

Transaction code

stabc

Function authorization

stabc

Purpose

This report lists all malfunctions that occurred while the selected machine was running. The ABC analysis

is intended to be a pure report on "Failures" = "Malfunctions". For this reason, the status "Production" is

not evaluated.

The statuses are sorted according to the "Pareto Principle" - i.e sorted according to their size, summed up

and  classified  -  and  classified  as  A,  B  and  C  depending  on  how  long  the  status  lasted.  The  threshold

values are configurable.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines the workplace for which the ABC analysis is to be displayed.

Status type

Restricts the displayed error messages to one status type (depending on license or project).

Threshold value 1

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  1,  the  threshold  is  defined

between the limits A and B. The predefined value is 50 %.

Threshold value 2

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  2,  the  threshold  is  defined

between the limits B and C. The predefined value is 30 %.

Date from …to (Shift / Time)

The error messages of the selected period of time are used.

Field descriptions

Status

Status number. The coloring is based on the status text configuration.

MOC_StatusABCAnalysis.docx

Version: 1.3.9335

Page 1 of 3

ABC Analysis

Status text

Status name

Status type

The  selection  criteria  restrict  the  displayed  status  type  (depending  on  license  or  project).  For

example, the selection criteria provide the following status types:

  Machine status

  Malfunction

  Operation mode

  Operation state

  Program

  …

Status type designation

Designation of the active status type

Duration, %

Total status duration  indicating how  long the status  was active at the machine  and  percentage of

the total duration.

Quantity, %

Number  indicating  how  often  this  status  was  active  at  the  machine  and  percentage  of  the  total

number.

Shift

Shift number indicating the shift when the status was active.

Shift start / End of shift

Beginning and end of shift during which the status was active.

Detail application ABC analysis

The  detail  application  ABC  analyses  provides  a  sum  total  of  all  accrued  durations  and  displays  the

number  of  individual  postings  included.  The  data  is  classified  in  the  three  classes  A,  B  and  C.  The

classification is based on the percentages referring to the total duration. The values are totaled according

to  the  "Pareto  principle",  i.e.  the  individual  rows  are  sorted  by  their  size  in  descending  order  into  the

classes A to C and added to the class until the total sum exceeds the threshold value (to be more precise:

threshold value specified 100 %). Then the next class is filled.

MOC_StatusABCAnalysis.docx

Version: 1.3.9335

Page 2 of 3

Detail application Individual listing

If  you  select  a  row  in  the  ABC  analysis,  the  Individual  listing  shows  the  individual  rows  included  in  the

selected row.

ABC Analysis

MOC_StatusABCAnalysis.docx

Version: 1.3.9335

Page 3 of 3

