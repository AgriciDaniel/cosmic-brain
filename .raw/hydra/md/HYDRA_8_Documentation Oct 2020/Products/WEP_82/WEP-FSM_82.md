Manual

Failure Mode Analysis /
Action Tracking
WEP-FSM 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Failure Mode Analysis / Action Tracking

Copyright

©Copyright 2015 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-FSM_82.docx

Version: 1.0.23049

Page 2 of 12

Failure Mode Analysis / Action Tracking

Contents

1  Failure Mode Analysis / Action Tracking ...................................................... 4

2  Failure mode analysis .................................................................................. 5

WEP-FSM_82.docx

Version: 1.0.23049

Page 3 of 12

Failure Mode Analysis / Action Tracking

1  Failure Mode Analysis / Action Tracking

Purpose

This component is used to determine failure modes on the basis of collected failures in order to introduce

improvements that enhance the productivity.

Action tracking enables the central processing of actions and to filter these for example for actions yet to

be concluded.

Implementation Considerations

Use  of  this  component  is  recommended  when,  within  the  collection  of  inspection  data,  failures  are

automatically generated or actions are taken through the AIP.

Integration

The  component  "Inspection  Planning  for  Goods  Receipt  Inspections"  with  its  associated  inspection

requirements  and  the  failures  collected  with  the  inspection  results  forms  the  base  data,  where  the

inspection data must have been previously entered through the AIP data entry client.

Features

The component contains the following functions:

  Graphical pivot analysis evaluation of collected failure types, locations and causes with a wealth

of filtering criteria and display options

  Cross-sectoral

tracing  of  measures/action

tracking

including  editing  capabilities  (status,

effectiveness, degree of completion, actual date, comments on activities taken, filtering according

to responsibilities etc.)

WEP-FSM_82.docx

Version: 1.0.23049

Page 4 of 12

Failure Mode Analysis / Action Tracking

2  Failure mode analysis

Overview

Menu

Quality management  QM evaluation  Failure mode analysis

Transaction code

faep

Function authorization

faep

Purpose

Use  the  failure  mode  analysis  to  evaluate  failures  of  the  following  types.  These  failures  are  collected

during the inspection process or generated automatically.

  Failure type (FT)

  Failure location (FL) and

  Failure cause (FC).

Use  the  available  pivot  functions  to  evaluate  the  data.  Using  these  functions,  you  can  display  the

distribution of defect types (frequency) for each article/item over a specified period of time. This analysis

helps you to specify core areas that might require action to optimize the quality in the production process.

WEP-FSM_82.docx

Version: 1.0.23049

Page 5 of 12

Failure Mode Analysis / Action Tracking

Integration

The failure mode analysis evaluates failures of inspection requirements from the area types:

  Goods receipt



Initial sample inspection

  Production

  Goods issue

 Consequently, the failure mode analysis is a general analysis tool.

Requirements

There are no special requirements. You only have to record the failures. To do so, you have to define the

failures beforehand in the master data of Quality Management.

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

listed.

Order tab

Area type

Selection list of area types

    - in-production inspection

    - goods receipt inspection

    - goods issue inspection

    - initial sample inspection

The list of area types depends on the licenses in use. The list can be restricted.

Area

Selection list of the configured areas matching the previously filtered area type. By default, the

following areas are available:

    - in-production inspection: production

    - goods receipt inspection: goods receipt

    - goods issue inspection: goods issue

    - initial sample inspection: initial sample

You can add further areas through customizing.

Inspection requirement status

Selection list including multiple selection options for all inspection requirement statuses.

WEP-FSM_82.docx

Version: 1.0.23049

Page 6 of 12

Failure Mode Analysis / Action Tracking

Overall result

Selection list for the results of inspection requirements (pass, fail, conditionally pass).

Usage decision

Selection list of usage decisions (e.g. release, special permit, rework, reject, sort) that are available,

once an inspection requirement has been completed.

Inspection point identification tab

If these fields are not available, you require a new program version of this application.

Workplace

Workplace number

Partial batch

Number of partial batch

ERP batch

ERP batch number

Field 1…3

Additional fields for inspection points

Additional fields for inspection points tab

If these fields are not available, you require a new program version of this application.

Field 4…8

Additional fields for inspection points

WEP-FSM_82.docx

Version: 1.0.23049

Page 7 of 12

Failure Mode Analysis / Action Tracking

If required, the fields Field 1 to Field 8 are enabled as part of an MPDV customization. The field

labels are assigned individually. As these field names are customizable, they are only entitled

Field 1 to Field 8 in this document.

Field 1 includes, for example, the tool if cavity-related data collection is enabled.

Sample tab

Sample machine

Selection list of machines/workplaces

The machine assigned to the first measured value is displayed here, provided that different

machines are assigned to the measured values of the same sample.

The application assigns the machine where the failure was recorded to the failure. If the failure was

recorded at an inspection station, the system assigns the machine number of the inspection station

to the failure.

Machine group

Selection list of machine groups

The application shows the failures that are assigned to a machine pertaining to the selected

machine group.

Invalid

The application shows the failures whose superordinate sample is valid or invalid. If necessary, you

can also filter the valid and invalid failures.

Failure tab

Failure time

You can filter data by the time the failure was recorded.

If you activate the license FEP-AQF, the failures tab does not show the fields you can use to filter by

the failure time. But you can use filter fields to restrict the displayed failures by the shifts and the

shift date and time.

Date, shift, time

These fields are only available if you activate the license "FEP-AQF".

WEP-FSM_82.docx

Version: 1.0.23049

Page 8 of 12

Failure Mode Analysis / Action Tracking

If you select the radio button shift and enter a from/to date, the application filters the data by the shift

date and the selected shift number. The date filter field is automatically set to the shift date. The shift

date corresponds to the start date of the shift of the corresponding machine. The system identifies

the machine where the corresponding order is logged on.

If you select the radio button time, the application filters the data by the date and time when the

failure analysis entry is recorded.

If you filter data by the shift and optionally enter the shift date, the application only filters

those failures where the superordinate inspection point was generated after the license FEP-AQF
has been activated. All inspection points recorded before the activation of the license neither show a
shift number nor a shift date. If you want to filter failures by the shift, you have to collect data in
relation to inspection points.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Graphic failure analysis detail applications

Data  is  presented  in  a  pivot  table  including  bar  charts.  Different  application  functions  are  available  to

display data. The filtered failures represent the data basis for evaluations.

This document does not describe the general pivot functions in more detail. The paragraphs that follow

only describe the basic functions of this evaluation/report.

Pivot evaluations/reports provide the following benefits:

  You can quickly summarize and present large amounts of data.

  You can exchange rows and columns to have the source data summarized differently.

  You can filter data easily using drag and drop and additional detail filters.

  You  can  use  the  interactive  way  of  presentation  to  summarize  and  analyze  data  in  different

formats and using different calculation methods.

Right-click to open the below context menu:

WEP-FSM_82.docx

Version: 1.0.23049

Page 9 of 12

You  can  use  the  function  Show  field  list  to  select  the  fields  you  want  to  use  for  the  pivot  analysis.  The

below figure shows what a field list could look like.

Failure Mode Analysis / Action Tracking

You can drag the required fields and drop them in the evaluation area (drag and drop).

In addition to the selection criteria, you can use the function Show filter editor to further narrow down the

data displayed.

WEP-FSM_82.docx

Version: 1.0.23049

Page 10 of 12

Failure Mode Analysis / Action Tracking

If you click Show settings in the context menu, the below dialog opens:

Check the Selection option and select a specific area to specify the contents of the tabular display. In this

case, the graphic representation is based on the selected cells. Check the Label option to display the total

number for each bar.

The below figure illustrates these functions.

WEP-FSM_82.docx

Version: 1.0.23049

Page 11 of 12

Failure Mode Analysis / Action Tracking

Check  the  Totals  option  to  display  the  row  Overall  result  in  the  bar  chart.  If  you  check  the  Selection

option,  the  pivot  report  is  only  based  on  the  data  of  the  selected  cells.  The  application  also  uses  the

selected cells to identify the overall result.

Check/uncheck  the  Columns  option  to  switch  between  the  graphic  presentation  of  the  corresponding

number of columns and rows.

Failure list detail applications

The failure list shows the failures including referenced data matching the  entered selection criteria. The

referenced data usually corresponds to the field list for the pivot analysis.

WEP-FSM_82.docx

Version: 1.0.23049

Page 12 of 12

