Manual

Quality Data Analysis
Suppliers/Goods
Receipt/Production
SMA-QDA 8.2

Version 1.0.23049

Last changed on: 02.09.2020

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-QDA_82.docx

Version: 1.0.23049

Page 2 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Contents

1  Quality Data Analysis Suppliers/Goods Receipt/Production ........................ 4

2  Failure mode analysis .................................................................................. 6

3  Analysis of usage decisions ......................................................................... 8

4  Analysis of Inspection Quality and Costs ................................................... 10

5  Comparison of Assessed Parties ............................................................... 12

6  Development of an Assessed Party ........................................................... 14

7  Criterion Analysis ....................................................................................... 16

SMA-QDA_82.docx

Version: 1.0.23049

Page 3 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

1  Quality Data Analysis Suppliers/Goods Receipt/Production

Purpose

The Quality data analysis contains the following SMA applications.

  Failure mode analysis

  Analysis of usage decisions

  Analysis of inspection quality and costs

  Comparison of assessed parties

  Development of an assessed party

  Criterion analysis

The  quality  data  analysis  is  based  on  the  performed  supplier  evaluations  and  the  inspection  data  from

goods  receipt  and  production.  The  inspection  data  is  made  up  of  the  inspection  points  including  detail

information, failures recorded in the inspection process and data of the inspection requirements.

All applications provide graphic evaluations using pivot analyses. In addition to the graphic evaluations, the

filtered data can also be displayed in tables.

You can define different application profiles for each application. This way, you can predefine individualized

evaluation profiles for specific use cases. You can change the evaluation profile manually or you can select

another application profile. Another option is to manually change the evaluation profile.

Implementation notes

To evaluate the product quality and to identify methods to improve quality, the applications of the Quality

data analysis in combination with the actions taken are the ideal products.

Integration

You can integrate the applications of the Quality data analysis in the application Information Dashboard.

Features

The following functions are available:

  Graphic and tabular analysis with extensive filter criteria and display options.

  Failure  mode  analysis  to  evaluate  recorded  failure  types,  locations  and  causes  for  each

characteristic, article, machine, supplier, month, etc.

  Display of the development of inspection costs per day, month, quarter, year

  Calculation of inspection costs for each article, article group, machine group, operation, tool.

  Analysis of inspection point decisions

SMA-QDA_82.docx

Version: 1.0.23049

Page 4 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

  Monitoring of the development of the inspection reliability in a day, week, month, quarter, year (ratio

between completed and open inspection points to the total number of inspection points).

  Analysis of the goods received regarding:

o  usage decisions (release, special permit, rework, lock, etc.)

o  processing times and their development in a month, quarter and year.

  Monitoring of supplier evaluations:

o  Analysis  and  development  of  evaluation  criteria  (progress)  in  the  course  of  evaluations

performed at cyclic intervals.

o  Development of evaluated suppliers

o  Comparison of suppliers

SMA-QDA_82.docx

Version: 1.0.23049

Page 5 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

2  Failure mode analysis

Overview

App name

Failure mode analysis

Short name of app

Failure mode analysis

Function authorization

SMA.FMA

Use the Failure Mode Analysis to evaluate failures of the following types in a pivot analysis. These failures

are collected during the inspection process or generated automatically.

  Failure type

  Failure location

  Failure cause

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Failure mode analysis includes the following features:

SMA-QDA_82.docx

Version: 1.0.23049

Page 6 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

  Graphic and tabular analysis of the failures recorded manually or  generated automatically during

the inspection process.

  Monthly presentation of the failure development.



Identification of the failure frequency per article, failure group, machine, machine group, operation,

tool, etc.

  Analysis of variations in quality  to initiate preventive and corrective action  with the aim to avoid

failures in future.

Integration

The Failure mode analysis evaluates failures of inspection requirements from the following area types:

  Goods receipt



Initial sample inspection

  Production

  Goods issue

Consequently, the Failure mode analysis is a general analysis tool.

Requirements

Requirements:  You  have  to  collect  the  failures  manually  or  the  system  must  generate  the  failures

automatically. You have to define the failures beforehand in the master data of Quality Management.

Selection criteria

Use the button

 to open the selection area.

Use  the  configuration  button

  of  the  selection  area  to  open  the  fields  that  are  available  for  this

application. Select the required fields to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 7 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

3  Analysis of usage decisions

Overview

App name

UsageDecisionDurationAnalysis

Short name of app

UsageDecisionDurationAnalysis

Function authorization

SMA.UDDA

Use the application Analysis of usage decisions to analyze the usage decisions of inspection requirements

in a graphical pivot analysis. In addition to the graphic view, you can also display the data in a table.

Purpose

The application Analysis of usage decisions mainly evaluates goods receipt inspection requirements.

The application Analysis of usage decisions includes the following functions:

  Graphical and tabular analysis of inspection costs based on the inspection duration of an inspection

requirement.

The inspection duration results from the period between creation and completion of the respective

inspection requirement.

  Display of the development of inspection costs per day, month, quarter, year.

  Graphical  and  tabular  analysis  of  usage  decisions  of  inspection  requirements.  Possible  usage

decisions are:

o  Release

o  Special permit

o  Rework

SMA-QDA_82.docx

Version: 1.0.23049

Page 8 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

o  Rejection

  Analysis of the development of usage decisions per month, quarter, year.

Integration

The  application  Analysis  of  usage  decisions  is  directly  connected  with  the  Inspection  requirements

application.

Once  you  have completed  an inspection requirement, the system identifies the time difference between

creation and completion of the inspection requirement and stores this time as the inspection duration for

the inspection requirement. The inspection duration is the basis for analyzing inspection costs.

The usage decision resulting from the completion of an inspection requirement is the basis for analyzing

the development of usage decisions.

The application Inspection requirements shows the inspection duration of an inspection requirement and

its usage decision. In the application Inspection requirements, you can complete inspection requirements

with any usage decision you want if  you have the right permissions. If the system completes inspection

requirements automatically, the usage decision is always based on the inspection results.

Requirements

You have to use the in-production inspection or the goods receipt inspection in order to complete inspection

requirements.

Selection criteria

Use the button

 to open the selection area.

Use  the  configuration  button

  of  the  selection  area  to  open  the  fields  that  area  available  for  this

application. Select the required fields once more to enable these fields as filter fields.

Editing functions

This application does not provide editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 9 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

4  Analysis of Inspection Quality and Costs

Overview

App name

Inspection cost and inspection quality

Short name of app

Inspection cost and inspection quality

Function authorization

SMA.IQEA

You can display the data in a the graphic view and in a table.

Purpose

The application Analysis of inspection quality and costs provides the following functions:

  Graphic and tabular analysis of inspection costs using the time required for the inspection of one

inspection point.

The time required for the inspection is the time between the first and the last measured value

recorded for an inspection point.

  Display of the development of inspection costs per day, month, quarter, year.



Identification of the inspection costs per article, article group, machine group, operation, tool, etc.

  Graphic and tabular analysis of inspection point decisions.

  Visualization of the development of the inspection reliability per day, week, month, quarter, year.

The  inspection  reliability  is  the  ratio  between  completed  and  open  inspection  points  to  the  total

number of inspection points.

SMA-QDA_82.docx

Version: 1.0.23049

Page 10 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Integration

The  application  Analysis  of  inspection  quality  and  costs  is  directly  connected  to  the  functions  to  collect

inspection data using AIP and SMA and the application Inspection points.

When  you record  inspection data, the measured  values and  attributive  inspections are recorded for the

characteristics  of  an  inspection  point.  The  difference  between  the  first  and  the  last  inspection  for  an

inspection  point  characteristic  is  called  inspection  time  or  duration  and  is  stored  as  information  on  the

inspection point. To analyze inspection costs, the inspection duration is used.

When you complete an inspection point, you take a usage decision. This usage decision is the basis for

the analysis of the inspection quality.

The  application  Inspection  points  shows  the  inspection  duration  and  the  usage  decision.  If  you  are  an

authorized  user,  you  can  also  change  the  inspection  point  decision  in  the  application  Inspection  points

and/or complete the inspection point.

Requirements

You  must  record  data  for  an  inspection  point.  And  the  inspection  point  must  be  completed  so  that  the

inspection duration can be calculated and an inspection point decision is available.

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  in  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Select the required fields to enable these fields as filter fields.

Editing functions

This application does not provide any editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 11 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

5  Comparison of Assessed Parties

Overview

App name

Comparison of assessed parties

Short name of app

Comparison of assessed parties

Function authorization

SMA.AOC

The application Comparison of assessed parties provides a graphic comparison of evaluation results of

different assessed parties, e.g. suppliers. The comparison is provided as pivot chart analysis. The

comparison of assessed parties is based on the overall results of supplier evaluations that were made

during a specified period of time.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Comparison of assessed parties includes the following functions:

  Evaluation results of different assessed parties, e.g. suppliers, are compared in graphic and tabular

form. The comparison is based on the overall results of supplier evaluations performed.

  The classification class of assessed parties is displayed.

  The  development  of  the  overall  results  of  performed  supplier  evaluations  is  displayed  and

compared for different evaluation periods.

SMA-QDA_82.docx

Version: 1.0.23049

Page 12 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Integration

This evaluation only uses assessments from the Assessment management.

Requirements

There are no special requirements. This application only requires supplier evaluations, which must have

been made for the Assessment management.

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  of  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Use a separate identifier to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 13 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

6  Development of an Assessed Party

Overview

App name

Development of an assessed party

Short name of app

Development of an assessed party

Function authorization

SMA.AOH

The application Development of an assessed party provides a graphic analysis of an assessed party.

Example: You can view the overall result of supplier assessments over a specified period of time in form

of a pivot analysis.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Development of assessed parties includes the following functions:

  Graphic and tabular analysis of the overall assessments based on the supplier evaluations made.

  The development of the overall results for performed supplier evaluations is displayed.

  The  resulting  classification  (class)  of  a  supplier/assessed  party  is  visualized  for  each  supplier

evaluation made.

Integration

This evaluation only uses assessments from the Assessment management.

SMA-QDA_82.docx

Version: 1.0.23049

Page 14 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Requirements

There are no special requirements. This application only  requires supplier evaluations, which must have

been made for the Assessment management.

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  of  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Use a separate identifier to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 15 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

7  Criterion Analysis

Overview

App name

Criterion analysis

Short name of app

Criterion analysis

Function authorization

SMA.EACA

The application Criterion analysis provides a graphic analysis of the development of assessment criteria

from supplier evaluations during a specified period of time. The analysis is provided in form of a pivot

analysis. You can also compare the different assessment criteria in a specified analysis period.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Criterion analysis includes the following functions:

  Graphic and tabular analysis of the assessment criteria based on the supplier evaluations made.

  Comparison of the classification of assessment criteria when a supplier evaluation was made.

  Display of the development of how assessment criteria were classified in a specified period of time

where several supplier evaluations were made.

Integration

This evaluation only uses assessments from the Assessment management.

Requirements

There are no special requirements. This application only requires supplier evaluations, which must have

been made for the Assessment management.

SMA-QDA_82.docx

Version: 1.0.23049

Page 16 of 17

                                                    Quality Data Analysis Suppliers/Goods Receipt/Production

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  of  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Use a separate identifier to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-QDA_82.docx

Version: 1.0.23049

Page 17 of 17

