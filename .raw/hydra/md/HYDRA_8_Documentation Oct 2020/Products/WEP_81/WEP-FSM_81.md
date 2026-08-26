Manual

Failure Mode Analysis /
Action Tracking
WEP-FSM 8.1

Version 1.0.1361

Last changed on: 19.06.2020

Failure Mode Analysis / Action Tracking

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-FSM_81.docx

Version: 1.0.2366

Page 2 of 11

Failure Mode Analysis / Action Tracking

Contents

1  Failure Mode Analysis / Action Tracking ...................................................... 4

2  Failure Mode Analysis .................................................................................. 5

WEP-FSM_81.docx

Version: 1.0.2366

Page 3 of 11

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

WEP-FSM_81.docx

Version: 1.0.2366

Page 4 of 11

Failure Mode Analysis / Action Tracking

2  Failure Mode Analysis

Summary

Menu

Quality management  QM evaluation  Failure mode analysis

Transaction code

faep

Function authorization

faep

Utilization

The failure mode analysis allows for failures of the following types recorded during the inspection process

or generated automatically to be evaluated.

  Failure type (FT)

  Failure location (FL) and

  Failure cause (FC).

In this context evaluations/reports are based on pivot functions. They allow for the distribution of failure

types (frequency) to be presented for each article/item referring to a period of time that has been filtered

before. These analyses help determine the core areas that might require  action to be taken to optimize

the production process with respect to quality.

WEP-FSM_81.docx

Version: 1.0.2366

Page 5 of 11

Failure Mode Analysis / Action Tracking

Integration

The failure mode analysis evaluates failures of inspection requirements from the area types:

  goods receipt,



initial sample inspection,

  production and

  goods issue

Consequently, the failure mode analysis is a comprehensive analysis tool.

Prerequisite

There are no special requirements. The only prerequisite  is that failures  have to be recorded,  which, in

turn, need to be defined within the master data of quality management before.

Selection criteria

The paragraph that follows shows some of the available selection criteria. Self-explanatory filter options

are not listed.

"Order" tab

Area type

Selection list of area types

    - in-production inspection

    - goods receipt inspection

    - goods issue inspection

    - initial sample inspection

The list of area types may be restricted subject to the respective licenses in use.

Area

Selection list of the configured areas of the previously filtered area type. By default, the following

areas are available. .

    - In-production inspection: production

    - Goods receipt inspection: goods receipt

    - Goods issue inspection: goods issue

    - Initial sample inspection: initial sample

Further areas can be generated through customizing.

Inspection request status

Selection list including multiple selection options for all inspection request statuses

WEP-FSM_81.docx

Version: 1.0.2366

Page 6 of 11

Failure Mode Analysis / Action Tracking

Overall result

Selection list for the results of inspection requests (pass, fail, conditionally pass)

Usage decision

Selection  list  of  usage  decisions  (e.g.  release,  conditional  release,  rework,  reject,  sort)  that  are

available, once an inspection request has been completed.

"Inspection point identification" tab

If these fields are not available, you require a new program version of this application.

Workplace

Workplace number

Partial batch

Partial batch number

Batch

Batch number

Field 1…3

Additional fields for inspection points

"Additional fields for inspection points“ tab

 If these fields are not available, you require a new program version of this application.

Field 4…8

Additional fields for inspection points

WEP-FSM_81.docx

Version: 1.0.2366

Page 7 of 11

Failure Mode Analysis / Action Tracking

The fields "field 1" to "field 8" are enabled subject to MPDV customizing and are assigned

individual names. As these field names are flexible, they are only entitled "field 1" to "field 8" in

this document.

Field 1 includes, for example, the tool if cavity-related data collection is enabled.

"Sample" tab

Machine sample

Selection list of machines/workplaces

The machine assigned to the first measured value is filtered here, provided that different machines

are assigned to the measured values of the same sample.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

"Graphic failure analysis" detail applications

Data  is  displayed  in  a  pivot  table  in  combination  with  bar  charts.  Different  application  functions  are

provided for the presentation. The failures that have been filtered beforehand are the data basis.

The general pivot functions are not described in more detail in this document. The paragraphs that follow

only describe the elementary functions of this evaluation/report.

Pivot evaluations/reports provide the following benefits.

  Large amounts of data may quickly be summarized and presented.

  Rows and columns can be exchanged to have the source data summarized differently.

  Simple filters by "drag and drop" with additional detail filters.

  Due  to  an  interactive  way  of  representation,  data  can  be  summarized  and  analyzed  in  different

formats and using different calculation methods.

The below context menu can be opened by clicking the right mouse button.

WEP-FSM_81.docx

Version: 1.0.2366

Page 8 of 11

The function "show field list" allows for the fields that are to be used in the pivot analysis to be selected.

The below figure shows a possible field list.

Failure Mode Analysis / Action Tracking

The requested fields may be put into the evaluation area by drag & drop.

In addition to the selection criteria, the "show filter editor" function enables further flexible restrictions of

the data basis.

WEP-FSM_81.docx

Version: 1.0.2366

Page 9 of 11

Failure Mode Analysis / Action Tracking

The below dialog is opened to show the settings made.

If  the  "selection"  option  is  checked  entire  areas  may  be  selected  in  the  table  view.  In  this  case,  the

graphic representation is based on the selected rows. If the "label" option is checked it is possible to show

the total number of each bar.

The below figure explains these functions.

WEP-FSM_81.docx

Version: 1.0.2366

Page 10 of 11

Failure Mode Analysis / Action Tracking

The  row  showing  the  total  result  may  be  displayed  additionally  in  the  bar  chart  if  the  "totals"  option  is

checked. Provided that the "selection" function is checked and the corresponding cells of the "total result"

row are selected, the total result of the corresponding column is added to the respective bar.

It  is  switched  between  the  graphic  presentation  of  the  corresponding  number  of  columns  or  rows  by

checking/unchecking the "columns" option.

"Failure list" detail applications

The  failure  list  shows  the  failures  including  the  referenced  data  that  are  filtered  based  on  the  used

selection criteria. Normally, the referenced data corresponds to the field list for the pivot analysis.

WEP-FSM_81.docx

Version: 1.0.2366

Page 11 of 11

