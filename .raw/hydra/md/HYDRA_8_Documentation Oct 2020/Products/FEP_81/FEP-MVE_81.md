Manual

Failure Mode Analysis/
Measures Tracking for initial
sample inspection
FEP-MVE 8.1

Version 1.1.1374

Last changed on: 19.06.2020

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

FEP-MVE_81.docx

Version: 1.1.4583

Page 2 of 17

sample inspection

Contents

Failure  Mode  Analysis/  Measures  Tracking  for  initial

1  Failure Mode Analysis/ Measures Tracking for Initial Sample

Inspection ..................................................... Error! Bookmark not defined.

2  Failure Mode Analysis .................................................................................. 5

3  Measure Tracking ...................................................................................... 12

FEP-MVE_81.docx

Version: 1.1.4583

Page 3 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

1  Failure Mode Analysis/ Measures Tracking for initial sample

inspection

Purpose

This component is used if, based on the recorded defects in the process of initial sample inspection, you

would like to determine the main defects in order to be able to introduce targeted improvements so as to

increase the quality of the product.

Measures tracking makes it possible to process measures centrally and to filter the results specifically, for

example by open measures.

Implementation considerations

Use of this component is recommended if, when recording inspection data in the initial sample inspection,

the  defect  recording  or  the  automatic  generation  of  defects  function  is  used  or  rather  measures  are

implemented via the AIP.

Integration

This  component  requires  the  "Inspection  planning  for  initial  sample  inspections"  component  with  the

corresponding  inspection  requirements  and  the  defects  and  measures  corresponding  to  the  inspections

results, whereas the inspection data must first be recorded via the AIP input client.

Features

The component offers the following functions:

  Graphic evaluation of the recorded defect types, locations and causes with an extensive range of

filter criteria and illustration option in the form of a pivot analysis.

  Comprehensive measures tracking with various processing options (status, effectiveness, degree

of fulfillment, actual dates, comments about the activities taken, filtering by person in charge, etc.)

FEP-MVE_81.docx

Version: 1.1.4583

Page 4 of 17

Failure  Mode  Analysis/  Measures  Tracking  for  initial

sample inspection

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

FEP-MVE_81.docx

Version: 1.1.4583

Page 5 of 17

sample inspection

Integration

Failure  Mode  Analysis/  Measures  Tracking  for  initial

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

FEP-MVE_81.docx

Version: 1.1.4583

Page 6 of 17

sample inspection

Overall result

Failure  Mode  Analysis/  Measures  Tracking  for  initial

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

FEP-MVE_81.docx

Version: 1.1.4583

Page 7 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

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

FEP-MVE_81.docx

Version: 1.1.4583

Page 8 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

The function "show field list" allows for the fields that are to be used in the pivot analysis to be  selected.

The below figure shows a possible field list.

The requested fields may be put into the evaluation area by drag & drop.

In addition to the selection criteria, the "show filter editor" function enables further flexible restrictions of

the data basis.

FEP-MVE_81.docx

Version: 1.1.4583

Page 9 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

The below dialog is opened to show the settings made.

If  the  "selection"  option  is  checked  entire  areas  may  be  selected  in  the  table  view.  In  this  case,  the

graphic representation is based on the selected rows. If the "label" option is checked it is possible to show

the total number of each bar.

The below figure explains these functions.

FEP-MVE_81.docx

Version: 1.1.4583

Page 10 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

The  row  showing  the  total  result  may  be  displayed  additionally  in  the  bar  chart  if  the  "totals"  option  is

checked. Provided that the "selection" function is checked and the corresponding cells of the "total result"

row are selected, the total result of the corresponding column is added to the respective bar.

It  is  switched  between  the  graphic  presentation  of  the  corresponding  number  of  columns  or  rows  by

checking/unchecking the "columns" option.

"Failure list" detail applications

The  failure  list  shows  the  failures  including  the  referenced  data  that  are  filtered  based  on  the  used

selection criteria. Normally, the referenced data corresponds to the field list for the pivot analysis.

FEP-MVE_81.docx

Version: 1.1.4583

Page 11 of 17

Failure  Mode  Analysis/  Measures  Tracking  for  initial

sample inspection

3  Measure Tracking

Summary

Menu

Quality management --> QM evaluation --> Measure tracking

Quality management  Complaint management  Measure tracking

Transaction code

Function authorization

tm

tm

The measure tracking function provides an overview of all generated measures. The "type" specifies from

which area/application the measure derives. The application allows for measures to be edited at a central

place and assigned statuses to be changed.

Utilization

Filtering by the "status" is the central element allowing to select, for example, all measures that are open,

done,  read  or  in  process.  If  this  is  combined  with  filtering  or  grouping  by  the  party  responsible,  it  is

possible to create a list showing all measures that are still open by person, department, etc.

Measures may be changed. In addition to changing statuses, it is also allowed to enter a comment about

the  activities  made  in  the  fields  "measure  text"  and/or  "comment.  Furthermore,  this  application  also

includes the actual date indicating when a measure has been completed and the degree of effectiveness

and fulfillment in %. It is even allowed to change the party responsible.

FEP-MVE_81.docx

Version: 1.1.4583

Page 12 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

The "reference" group provides information on the origin of the measure. If it is, for example, a measure

generated in complaint management, the type, area and the complaint or complaint detail will be shown

here.

The  relevant  application  can  be  opened  by  clicking  the  corresponding  button  in  the  toolbar.  The

application is determined by the content of the "context" field.

The "long-term data" tab is only available if the archiving license has been purchased. If this option is set,

long-term data will also be used when measures are displayed and tracked.

Integration

The measure tracking function is connected with all applications where measures are documented.

Prerequisite

There are no special requirements to be met.

Selection criteria

Except  for  the  "reference"  tab,  selection  criteria  are  self-explanatory  and  not  described  separately.  The

filter fields "key 1" up to "key 5" of the "reference" tab allow for measures to be restricted specifically to

the  origin  of  the  measure.  In  case  of  a  complaint  measure,  the  field  "key  1"  includes,  for  example,  the

complaint  number  generated  automatically  in  HYDRA.  The  key  field  2  then  includes  the  number  of  the

complaint detail.

Field descriptions

The  display  dialog  shows  different  tabs.  However,  if  newly  created/edited,  there  is  only  one  tab  (the

"measure" tab) that includes all pieces of information.

Measures tab

Measure

Measure  number and/or selection  or direct entry of a measure number. The relevant master data

catalog can be opened for selection purposes.

Measure designation

The designation of the assigned measure number is shown. If the measure number is input directly,

the designation will only be shown upon saving.

Text

Free text field to enter a complementary measure text.

FEP-MVE_81.docx

Version: 1.1.4583

Page 13 of 17

sample inspection

Comment

Failure  Mode  Analysis/  Measures  Tracking  for  initial

Free text field to enter a complementary comment for the measure.

Status

Available measure types can be displayed or selected. The types "in process", "read", "done" and

"open" are provided by default.

Measure type

Available measure types can be displayed or selected. The following types are available by default

"short-term", "medium-term", "long-term" and "no assignment".

Fulfillment [%]

Fulfillment in % can be displayed or entered.

Effectiveness [%]

Effectiveness in % can be displayed or entered.

External

This field can be used to control the printout of forms. However, it does not have a special function.

Context

Assigned  object,  e.g.  inspection  requirement,  inspection  step,  complaint  management,  complaint

detail, energy management

Type

Area

The referenced application type can be displayed or  selected, e.g. in-production inspection, goods

receipt/goods  issue  inspection,  initial  sample  inspection,  test  equipment  inspection,  complaint

management, energy management

The area of the type can be displayed or selected, e.g. production for in-production inspection

Key 1 to 5 (general)

The  key  fields  are  assigned  depending  on  the  context.  These  fields  are  empty  for  measures

pertaining to energy management.

Key 1

Shows the internal and unique complaint number for measures from complaint management. The

inspection  requirement  number  is  entered  here  for  measures  of  inspection  requirements  or

inspection steps.

Key 2

Shows  the  complaint  detail  number  for  measures  from  complaint  management  including

assignment  to  the  complaint  detail.  The  inspection  step  number  is  entered  here  for  measures  of

inspection requirements or inspection steps.

FEP-MVE_81.docx

Version: 1.1.4583

Page 14 of 17

sample inspection

Key 3

Failure  Mode  Analysis/  Measures  Tracking  for  initial

Shows  the  internal,  unique  ID  number  of  all  failure  analysis  entries  of  a  complaint  for  measures

from complaint management that are also collected in failure analysis. The OP sequence number of

the  characteristic  is  entered  here  for  measures  of  inspection  requirements  or  inspection  steps,

provided that data in relation to the characteristic has been collected.

Key 4

This field is empty for measures from complaint management. The sample number is entered here

for  measures  of  inspection  requirements  or  inspection  steps,  provided  that  data  in  relation  to  the

sample number has been collected.

Key 5

This  field  is  empty  for  measures  from  complaint  management.  The  measured  value  number  is

entered  here  for  measures  of  inspection  requirements  or  inspection  steps,  provided  that  data  in

relation to the sample number has been collected.

Party in charge tab

Party in charge type

Different  types  may  be  selected  when  inputting  data.  The  type  "external  person"  is  used,  as

normally people are responsible for dealing with measures.

Party in charge

The party in charge is shown or it may be chosen from the list of responsible parties. Which entry is

transferred to the list of responsible parties is defined within master data. The selected entry is used

as the responsible party.

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Dates tab

Target date/time

A date and optionally a time by which the measure has to be finished may be displayed or entered.

It will not be monitored automatically, whether or not this time limit is kept. The content of this field

is  fundamental  to  the  "measures  tracking"  application,  as  it  may  be  determined  manually  for  all

measures (global) which of them have exceeded the target date, for example.

Actual date/time

A  date  and  optionally  the  time  by  which  the  measure  has  been  finished  may  be  displayed  or

entered. However, this field does not have a special function. In the "measure tracking" application,

this field can be used to manually determine measures that have been completed with delay.

FEP-MVE_81.docx

Version: 1.1.4583

Page 15 of 17

Failure  Mode  Analysis/  Measures  Tracking  for  initial

sample inspection

"Reference" tab

Area

Shows the referenced area within the application type, e.g. production

 Toolbar

Apart  from  standard  functions,  the  referenced  measure,  referenced  inspection  requirement  or  the

consumption analysis can be called up for the measures from complaint management.

 Calling up of referenced complaints

Function authorization: cm.*

Calls up the complaint referenced for the selected measure.

  Calling up of referenced inspection requirements

Function authorization: irp.*

Calls up the inspection requirement referenced for the selected measure.

 Calling up of the consumption analysis

Function authorization: cona.*

Calls up the "consumption analysis" application

Editing functions

New measures can be created, provided that relevant skills are available. Consequently, users must have

profound  knowledge,  as  they  are  not  guided  through  the  process  of  data  collection/modification  and

validation checking is not performed.

Relevant data need to be entered manually in the key fields 1 to 5 as well as in the context, type and area

fields to enter new measures. The field descriptions provide further details about these field functions.

Please note:

FEP-MVE_81.docx

Version: 1.1.4583

Page 16 of 17

sample inspection

Failure  Mode  Analysis/  Measures  Tracking  for  initial

New measures for complaints should be created within Complaint Management, as the creation within the

Measure Tracking function requires the internal HYDRA complaint number to be entered.

FEP-MVE_81.docx

Version: 1.1.4583

Page 17 of 17

