Inspection points

1

Inspection points

Overview

Menu

Quality management  In-production inspection  Inspection points

Quality management  Goods receipt  Inspection points

Quality management  Goods issue  Inspection points

Quality management  QM subsystem   Inspection points

Quality management  Initial sample inspection  Inspection points

Quality management  QM evaluation  Inspection point

Transaction code

ipp

Function authorization

ipp.*

Available user fields

Where

Object type/user field key

Source (type)

Table and detail view

CPANUMP/PPUNKT

QM

How to configure user fields?

Which user field types are available?

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 1 of 10

Inspection points

Purpose

With this function the user can display and edit inspection points. Since the functional requirements are

almost  identical  in  all  areas  (for  example,  goods  receipt,  production,  goods  issue,  and  QM  subsystem),

the actual applications for these areas are identical.

Requirements

Filtering by inspection points depends on the entries made in the selection panel.

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

listed. Only the inspection point fields are described.

Inspection point number

Direct entry of the inspection point number you want to filter.

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 2 of 10

Inspection points

Cause for creation

Selection list of the configured cause of creation.

Workplace

Direct  input  or  opening  of  the  Workplace  catalog  and  taking  over  the  number  from  the  selected

entry.

Partial batch

Entry of the Partial batch inspection point.

ERP batch

Entry of the Batch inspection point.

Sample group

Entry of the Sample group inspection point

Inspection result

Selection list of possible inspection results of the inspection point.

Status

Selection list of possible inspection point statuses.

Field 1 to field 8

Entry of the additional User fields inspection point

Editing functions

You cannot change the key fields Area, Inspection request no., Inspection step no. and Inspection point

number in the editing mode.

Toolbar

  Release

Function authorization: ipp.release

Sets the Open status for a completed inspection point.

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 3 of 10

Inspection points

 Complete

Function authorization: ipp.complete

The inspection points is assigned the status Completed. With the function enhancements for In-

production Inspection it is possible to label a checkpoint decision as Setup check. Measured values

and attributive test results of a Setup test are automatically rendered invalid when the test point is

completed. You can find details on Option 1223 in the procurement document

Configuration_QM_Options.

 Inspection requirement

Function authorization: irp.*

The application Inspection request is opened and the selected inspection request is displayed. The

Default  application  for  inspection  requirements  is  also  opened  for  inspection  points  of  the  QMS

module. If required, the application for QMS inspection requests is to be opened via the menu (and

not by clicking the above-described button).

 Document management

Function authorization: ipcdoc.*

The  Document  management  application  is  filtered  and  opened  for  the  documents  assigned  to  the

selected checkpoint. There is the option to create new documents and also to change existing ones.

 Batch data overview

   Function authorization: batov.*

The application Batch data overview is filtered by order numbers.

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 4 of 10

Inspection points

Detail application Inspection points

For technical reasons, no inspection point user fields are displayed in the maintenance dialogs.

Here  the  display  is  restricted  to  the  General  user  fields.  If  required,  the  user  can  view  the

contents of the checkpoint user fields in the checkpoint list grid.

If  the  contents  of  these  inspection  point  user  fields  must  be  updated,  the  user  opens  the

application of the inspection request with the actual inspection point.

Detail application Failures

A  Failure  list  is  shown  for  inspection  points.  This  list  shows  all  entries  for  Failure  type,  Failure  location,

Failure  cause  and  Originator,  which  have  been  assigned  to  the  characteristics,  samples  or  measured

values  of  the  inspection  point  during  the  inspection  process.  The  list  even  shows  the  failure  types  that

have been generated automatically, e.g. Upper tolerance limit not respected.

In addition to the respective failure, the following referenced data is also available:



Inspection step

  Operation sequence number (OP sequence)

  Sample number

  Value number

  Failure type

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 5 of 10

Inspection points

  Characteristic number and description

  Workplace number and description

  Weighting (number, e.g. for an inspection chart characteristic)

  Comment,

  Failure date

  Failure time

You  can  restrict  the  list  using  the  individual  column  filter.  You  can  also  use  the  Group  by  function.

Example: You can list the failures for each characteristic.

Detail application Measures

A Measure list detail application is provided for inspection points. This list shows all measures and actions

which  have  been  assigned  to  the  characteristics,  samples  or  measured  values  during  the  inspection

process.

In addition to the actual measure number and designation, the following data is also referenced:



Inspection requirement



Inspection step

  Operation sequence number (OP sequence)

  Sample number

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 6 of 10

Inspection points

  Value number

  Measure type

  Party in charge incl. type

  Status

  Comment

  Text

  Effectiveness

You  can  restrict  the  list  using  the  individual  column  filter.  Use  the  Group  by  function  to  have  further

options of analysis.

Field descriptions - characteristics

Only  the  fields  that  differ  from  the  characteristic  master  data  or  inspection  plan  characteristics  are

described below.

Specifications

Sample size

This field shows  the  identified sample size if a sampling scheme is defined  in the inspection  plan

characteristic and if this sampling scheme does not specify the sample size. The reason for it is that

the  sample  size  is  calculated  using  the  actual  quantity  of  the  inspection  requirement.  This  is  the

case for the sampling schemes Batch inspection or 100% inspection.

 Go to

The other fields included in the tabs are the same as the fields of the characteristic master data and are

described in the documentation CAQ characteristic master data .

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 7 of 10

Detail application Inspection point characteristics

Inspection points

The  detail  application  of  inspection  point  characteristics  is  nearly  identical  to  the  master  data  of

characteristics application. Therefore, only additional features or modifications are described here.

 Go to

For further information on the definition of characteristics, refer to the function description in the document

MOC_CharacteristicsQM.

Detail application Samples

You  can  find  the  KPIs  for  every  single  sample  in  the  detail  application  Samples  inspection  of  the  point

characteristics.

In  addition  to  the  referenced  key  fields,  such  as  the  inspection  requirement  number,  inspection  step

number and sample number, the following statistical values are listed if available/calculated:

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 8 of 10

Inspection points

  Xq

  Xq floating

  R floating

  Standard deviation s



s floating

  Minimum

  Maximum

  Range

  Median

  P

  U

  Number of defects

The  list  also  shows  the  characteristic  specifications  (tolerance,  action  and  warning  limits)  including  the

referenced machine.

Detail application Single value

You  can  find  the  single  measured  values  for  all  variable  inspection  step  characteristics  in  the  Single

values detail application of the inspection point characteristics.

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 9 of 10

Inspection points

The following information is displayed for the attributive characteristics:

  Number of defects

  Number of NCU (non-conforming units) and

  Failure

You can also identify if the measured value or the attributive assessment is valid or invalid.

In addition to the referenced key fields such as inspection requirement number, inspection step number,

sample number and value number, the detail application lists the characteristic specifications (tolerance,

action and warning limits). You also have details for each entry. There is the date and time when the entry

was recorded and edited and also the responsible user.

MOC_InspectionPoints.docx

Version: 1.6.18468

Page 10 of 10

