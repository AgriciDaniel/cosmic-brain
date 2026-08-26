OEE Report
1 OEE Report
Overview
The analysis concerns machine-related OEE performance data for a certain period of time and a certain
number of workplaces. The result depends on the selection and therefore on the selection criteria made
available on the selection panel.
Selection criteria
The application provides the following selection criteria:
Workplace
This selection criterion references the workplace in the machine or workplace master data. You can also
run a search using wildcards (placeholders *).
Group
This selection criterion references the group in the machine or workplace master data. All machines or
workplaces are displayed that are assigned to the selected report group. You can also run a search using
wildcards.
Cost center
This selection criterion references the cost center defined in the machine or workplace master data. All
machines or workplaces are displayed that are assigned to the selected cost center. You can also run a
search using wildcards.
Short designation
This selection criterion references the short name of the machines in the master data. All of the machines
or workplaces are displayed that match the string that was entered. You can also run a search using
wildcards.
Report group
This selection criterion references the report groups. All machines or workplaces are displayed that are
assigned to the selected report group. You cannot run a search using wildcards.
Date from ... to (shift/ time)
The period for the data to be evaluated can be limited via the date selection option.
If a selection is made via a shift (shifts), the shift date is evaluated. If no shift has been selected, all shifts
are considered.
HWEB_OEEReport.docx Version: 1.0.1362 Page 1 of 4

|     |     |     |     |     |     |     | OEE Report |
| --- | --- | --- | --- | --- | --- | --- | ---------- |

The two times each refer to the start or to the end of the date periods listed above.
OEE report
The OEE report detail application relates to machine-related OEE performance data for a certain period
of time and a certain number of workplaces.
The following data is available:
  Workplace
  Group
  Availability can be understood as a characteristic for the machine. It is, like the OEE itself, a number
less than one. A machine's productivity is calculated for a period of time based on the following
formula:
RPA11
|     | Availability |    |     |     |     |     |     |
| --- | ------------ | --- | --- | --- | --- | --- | --- |
11
RPA
1
  A machine's performance is calculated for a period of time based on the following formula:
T argetcycle*
|     | Effectiveness |    |     |     |     |     |     |
| --- | ------------- | --- | --- | --- | --- | --- | --- |
Actualcycle
Whereas for the actual cycle the ratio RPA 11 to the number of recorded strokes is used,
|     |     |   |     |    |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
RPA
|     | Actualcycle |          | 11  |    |     |     |     |
| --- | ----------- | ---------- | --- | --- | --- | --- | --- |
|     |             | Strokes* |     |    |     |     |     |
|     |             |           |     |    |     |     |     |
the target cycle is an arithmetically averaged value, because during the selected period, various
target cycles can be applied:
|     |     |     | T argetcyclearith. |     | (T argetcycle*RPA11) |     |     |
| --- | --- | --- | ------------------ | --- | --------------------- | --- | --- |
argetcycle*
|     |   T |     |    |     |    |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
RPA11
Durationarith.
Strokes*: If no strokes were recorded for the machine, the strokes are calculated from the yield
(primary quantity unit) and the partitioning:
|     | Strokes* | Yield /Partitioning  |     |     |     |     |     |
| --- | -------- | --------------------- | --- | --- | --- | --- | --- |

| HWEB_OEEReport.docx  |     |     |     | Version: 1.0.1362  |     |     | Page 2 of 4  |
| -------------------- | --- | --- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     |     |     |     |     | OEE Report |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- |

Please note with regard to the calculation:
Performance is always calculated based on the total sum of the basic values. If the evaluation is
based on several shifts or several machines, the individual values for all of the MDE bookings
concerned are added up and then added into the formula mentioned above.
At MDE booking level, the system checks whether the stroke value was booked. If no stroke was
booked, the stroke value is calculated for this booking based on yield and partitioning.
Yield
|     | Stroke |    | Primary |     |     |     |     |     |
| --- | ------ | --- | ------- | --- | --- | --- | --- | --- |

|     |     | calculated Partitioning |     |     |     |     |     |     |
| --- | --- | ----------------------- | --- | --- | --- | --- | --- | --- |
  The quality represents the ratio of the produced yield to the total quantity (here: yield + scrap +
rework + open quantity) and allows insight into the material to be processed and the quality of the
process. A machine's quality is calculated for a period of time based on the following formula:
Yield
|     | Quality |        |        |         | Primary |                |         |     |
| --- | ------- | ------- | ------ | ------- | ------- | -------------- | ------- | --- |
|     |         | Yield   | Scrap | Rework |         | Open_Quantity |         |     |
|     |         | Primary |        | Primary | Primary |                | Primary |     |
  OEE: The OEE is calculated as follows: OEE = availability x performance x quality
  Planned operation time
= Total machine runtime throughout the selected evaluation period (Total RPA 1 ... 11)
  Machine runtime
= Main utilization time (RPA 11)
  Actual utilization
= yield utilization * (target cycle/ actual cycle)
= yield utilization * performance
  Yield utilization
 = main utilization time * quality
Graphic OEE report
This detail application generates a graphic illustration of the quantities of the workplaces marked in the
tabular detail application. For each workplace, shown in bar form are:
  OEE (red)

| HWEB_OEEReport.docx  |     |     |     | Version: 1.0.1362  |     |     |     | Page 3 of 4  |
| -------------------- | --- | --- | --- | ------------------ | --- | --- | --- | ------------ |

OEE Report
 Availability (green)
 Performance (blue)
 Quality (purple).
Graphic OEE profile
Shown in a line chart in the Graphic OEE profile detail application are the key figures
 OEE (red)
 Availability (green)
 Performance (blue)
 Quality (purple)
distributed over a period of time (grid spacing on the X axis on a shift level).
Please note: for technical reasons, the partial paths of the lines are shown in the form of a dotted line.
HWEB_OEEReport.docx Version: 1.0.1362 Page 4 of 4