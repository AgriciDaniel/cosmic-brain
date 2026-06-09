Manual

Monitoring of Process Data
PDV-MPD 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Monitoring of Process Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-MPD_82.docx

Version: 1.0.23049

Page 2 of 21

Monitoring of Process Data

Contents

1  Monitoring of Process Data .......................................................................... 4

2  Target Value Analysis (in table form) ........................................................... 5

3  Violation of Limit Values, tabular .................................................................. 7

4  Process Analysis (based on machines) ....................................................... 9

5  Process Analysis (based on orders) .......................................................... 12

6  Process Analysis (based on batches) ........................................................ 15

7  Process Events .......................................................................................... 18

8  Event Durations .......................................................................................... 20

PDV-MPD_82.docx

Version: 1.0.23049

Page 3 of 21

Monitoring of Process Data

1

 Monitoring of Process Data

Overview

Purpose

The  PDV-MPD  function  package  includes  functions  to  analyze  process  data.  The  values  and  events

collected from the machines may be listed and deviations from default values and limit values that have

not been adhered to can be analyzed.

Integration

This function package requires available data in the system (via PDV collection functions).

The licenses and functions for shop floor data collection or batch data collection are required in order to

evaluate recorded data based on orders and batches.

Features

  Evaluation of the collection rule values changed by the specification list

  Evaluation of process disturbances for single machines over specified periods

  Collection  and  evaluation  of  modifications  to  target  values  that  have  been  made,  e.g.  due  to

process  optimizations.  Functions  to  save  changed  target  values  including  consideration  of  past

changes

  Process  log  for  individual  machines  or  articles/items  over  specified  periods.  Recorded  process

parameters can be filtered.

  Tabular listing of occurred process events. Events and periods can be selected.

  Tabular  listing  of  durations  of  occurred  events.  The  durations  are  calculated  by  intervals

considering  the  beginning  and  end  of  events.  Events  and  periods  can  be  selected.  Occurred

events can be analyzed based on time and quantity using grouping and sorting functions.

PDV-MPD_82.docx

Version: 1.0.23049

Page 4 of 21

Monitoring of Process Data

2  Target Value Analysis (in table form)

Summary

Menu

Quality management  Process analysis  Target value analysis

Transaction code

ptva

Function authorization

ptva

The tabular analysis of default values is used to perform process analyses in quality management.

Usage

The  tabular  view  offers  the  user  an  overview  of  the  target  value  changes  resulting  from  manual  or

automated activities. This designates the limit values and the target value of the characteristics defined in

the collection rule.

Requirements

For  modifications  of  the  target  values  from  the  machine,  the  machine  and  the  machine  interface  must

transfer  these  values;  and  the  corresponding  assignments  to  the  target  values  must  be  made  in  the

logical channels.

Selection parameters

The following selection criteria are available in the application:

Machine

The pool application machine can be used to select the desired machine.

Process parameter

Possibility to enter a process parameter.

Event timestamp (from - until)

By restricting the event timestamp precise time intervals can be selected. In addition, the start and

end time of an event may be selected by defining a relative date.

Default type

It  is  also  possible  to  use  a  drop-down  list  to  select  a  default  type.  These  default  types  may  be

selected:

PDV-MPD_82.docx

Version: 1.0.23049

Page 5 of 21

Monitoring of Process Data

  Upper process action limit

  Upper tolerance limit

  Target value

  Lower tolerance limit

  Lower process action limit

Consider long-term data

Enabling this check box allows for long-term data to be considered.

Detail application: target value analysis (in tabular form)

This tabular report shows the changed default values recorded and saved in the database including the

following information:

Event timestamp

Point in time when the modified default value was recorded

Machine

Machine at which the default value change was recorded/performed

Process parameter

Technical name of the process parameter for which default values have been changed

Default type

Default type that has been changed

Value

Value of the recorded default value change

PDV-MPD_82.docx

Version: 1.0.23049

Page 6 of 21

Monitoring of Process Data

3  Violation of Limit Values, tabular

Summary

Menu

Quality management  Process analysis  Tabular violations of limit values

Transaction code

plima

Function authorization

plima

The "tabular violations of limit values" function is used for the process analysis in quality management.

Usage

In this application, the collected limit value violations of the process characteristics are shown. The limits

are  defined  in  the  collection  rule.  The  table  shows  the  violations  and  the  return  to  the  "OK  range"

indicating the point in time and the measured value.

Integration

The limits must be defined in the collection rule.

Selection parameters

The following selection criteria are available in the application:

Machine

In the machine pool application, the desired machine can be selected.

Process parameters

In addition, a process parameter can be input.

Event from - to

Restricts the event period by defining the start and end time. In addition, the start and end time may

be selected by defining a relative date.

Violation

Restricted by the type of violation using a drop down list

Consider long-term data

Long-term data may also be taken into account by clicking the relevant checkbox.

"Tabular violations of limit values" detail application

This  tabular  report  shows  the  infringed  limit  values  recorded  and  saved  in  the  database  including  the

following information:

PDV-MPD_82.docx

Version: 1.0.23049

Page 7 of 21

Monitoring of Process Data

Machine

Machine where the limit value violation was recorded

Process parameters

Technical name of the characteristic or the entered process parameter

Event timestamp

Time when the limit violation was recorded

Value

Value of the recorded process parameter by which the limit has been exceeded

Violation

Specifies which limit defined within the collection rule has been infringed

PDV-MPD_82.docx

Version: 1.0.23049

Page 8 of 21

Monitoring of Process Data

4  Process Analysis (based on machines)

Summary

Menu

Quality  management    Process  analysis    Process  analysis  (based  on
machines)

Transaction code

tpdam

Function authorization

tpdam

The process analysis, based on machines, is used for the process analysis in quality management.

Usage

The table view of the detail application offers the user an overview of the existing entries. The display of

the information can be sorted using the representation in the grid and is oriented based on the specified

selection parameters.  The display of the fields can be adjusted for each user with the context menu.

Integration

The  function  displays  collected  measured  values  of  process  characteristics.  These  values  must  have

been previously collected in the system.

Selection parameters

The following selection criteria are available in the application:

Machine

A detailed search can be made for the machine using the pool application.

Time domain from - until

Specifies the time interval to be selected.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Tag type + tag ID

Selection of the tag type and tag ID

Consider long-term data

Long-term data is taken into account.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it is not recommendable to select too large periods and data sets. In addition to this, data might no longer

be displayed clearly in graphics without additional functions, such as the zoom.

PDV-MPD_82.docx

Version: 1.0.23049

Page 9 of 21

Monitoring of Process Data

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support

Detail application: process analysis (based on machines)

This tabular report shows the process characteristics recorded and saved  in the database including the

following information:

Characteristic

Technical name of the characteristic or the entered process parameter

Designation

Defined characteristic name

Target value

The target value defined for this recorded process parameter at that specific point in time

UTL

The upper tolerance limit defined for this recorded process parameter at that specific point in time

UPAL

The upper process action limit defined for this recorded process parameter at that specific point in

time

LTL

The lower tolerance limit defined for this recorded process parameter at that specific point in time

LPAL

The lower process action limit defined for this recorded process parameter at that specific point in

time

Unit

Unit of the recorded characteristic

Measured value

Measured value recorded for the characteristic at the time of measurement

Time of measurement

Time of measurement of the characteristic

Detail application: PivotTable

This  report  shows  the  process  characteristics  recorded  and  saved  in  the  database  in  a  pivot  table

including a graphic.

PDV-MPD_82.docx

Version: 1.0.23049

Page 10 of 21

Monitoring of Process Data

PDV-MPD_82.docx

Version: 1.0.23049

Page 11 of 21

Monitoring of Process Data

5  Process Analysis (based on orders)

Summary

Menu

Quality  management    Process  analysis    Process  analysis  (based  on
orders)

Transaction code

tpdao

Function authorization

tpdao

The process analysis, based on orders, is used for the process analysis in quality management.

Usage

The table view of the detail application offers the user an overview of the existing entries. The display of

the information can be sorted using the representation in the grid and is oriented based on the specified

selection parameters.  The display of the fields can be adjusted for each user with the context menu.

Integration

The  function  displays  collected  measured  values  of  process  characteristics.  These  values  must  have

been previously collected in the system.

Selection parameters

The following selection criteria are available in the application:

MES order number

A detailed search can be made for the order using the pool application.

Article

Article

Batch

Selects a produced batch

Time domain from - until

Specifies the time interval to be selected.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Tag type + tag ID

Selection of the tag type and tag ID

Consider long-term data

Long-term data is taken into account.

PDV-MPD_82.docx

Version: 1.0.23049

Page 12 of 21

Monitoring of Process Data

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Detail application: process analysis (based on orders)

This tabular report shows the process characteristics recorded and saved  in the database including the

following information:

Characteristic

Technical name of the characteristic or the entered process parameter

Designation

Defined characteristic name

Target value

The target value defined for this recorded process parameter at that specific point in time

UTL

The upper tolerance limit defined for this recorded process parameter at that specific point in time

UPAL

The upper process action limit defined for this recorded process parameter at that specific point in

time

LTL

The lower tolerance limit defined for this recorded process parameter at that specific point in time

LPAL

The lower process action limit defined for this recorded  process parameter at that specific point in

time

Unit

Unit of the recorded characteristic

Measured value

Measured value recorded for the characteristic at the time of measurement

Time of measurement

Time of measurement of the characteristic

PDV-MPD_82.docx

Version: 1.0.23049

Page 13 of 21

Monitoring of Process Data

Detail application: PivotTable

This  report  shows  the  process  characteristics  recorded  and  saved  in  the  database  in  a  pivot  table

including a graphic.

PDV-MPD_82.docx

Version: 1.0.23049

Page 14 of 21

Monitoring of Process Data

6  Process Analysis (based on batches)

Summary

Menu

Quality  management    Process  analysis    Process  analysis  (based  on
batches)

Transaction code

tpdac

Function authorization

tpdac

The process analysis, based on batches, is used for the process analysis in quality management.

Usage

The table view of the detail application offers the user an overview of the existing entries. The display of

the information can be sorted using the representation in the grid and is oriented based on the specified

selection parameters.

The display of the fields can be adjusted for each user with the context menu.

Integration

The  function  displays  collected  measured  values  of  process  characteristics.  These  values  must  have

been previously collected in the system.

Selection parameters

The following selection criteria are available in the application:

Batch number

A detailed search can be made for the produced batch using the pool application.

Alternative batch number 1

Selects the alternative batch number 1 at the produced batch

Throughput batch number

Throughput batch number

Time domain from - until

Specifies the time interval to be selected.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Tag type + Tag ID

Selection of the tag type and tag ID

PDV-MPD_82.docx

Version: 1.0.23049

Page 15 of 21

Monitoring of Process Data

Consider long-term data

Long-term data is taken into account.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server.

Detail application: process analysis (based on batches)

This tabular report shows the process characteristics recorded and saved  in the database including the

following information:

Characteristic

Technical name of the characteristic or the entered process parameter

Designation

Defined characteristic name

Target value

The target value defined for this recorded process parameter at that specific point in time

UTL

The upper tolerance limit defined for this recorded process parameter at that specific point in time

UPAL

The upper process action limit defined for this recorded process parameter at that specific point in

time

LTL

The lower tolerance limit defined for this recorded process parameter at that specific point in time

LPAL

The lower process action limit defined for this recorded process parameter at that specific point in

time

Unit

Unit of the recorded characteristic

Measured value

Measured value recorded for the characteristic at the time of measurement

PDV-MPD_82.docx

Version: 1.0.23049

Page 16 of 21

Monitoring of Process Data

Time of measurement

Time of measurement of the characteristic

Detail application: PivotTable

This  report  shows  the  process  characteristics  recorded  and  saved  in  the  database  in  a  pivot  table

including a graphic.

PDV-MPD_82.docx

Version: 1.0.23049

Page 17 of 21

Monitoring of Process Data

7  Process Events

Summary

Menu

Quality Management  Process Analysis  Process Events

Transaction code

pevea

Function authorization

pevea

This application is used for the event analysis of process events that have been recorded in the process

data collection of the machine.

Usage

The application lists the process events in table form. An entry is made for each event regarding whether

the event was started (bit value = 1) or ended (bit value = 0).

Integration

The  way  analog  measured  values,  i.e.  process  parameters  for  defined  process  characteristics  are

recorded from the machine using PDV, the events are digital process values. These can be unevaluated

signals, error signals or message signals.

Prerequisite

The process data collection must be set up for collecting the events.

Selection criteria

The following selection criteria are available in the application:

Machine

The machine to be evaluated.

Event ID

The event to be evaluated or, with wildcards, multiple events.

Event from - to

Limitation of the search for events to this period. The start and end events are selected within this

period. In addition, the start and end time of an event may be selected by defining a relative date.

PDV-MPD_82.docx

Version: 1.0.23049

Page 18 of 21

Detail application: process events

This tabular report shows the process events recorded and saved in the database including the following

Monitoring of Process Data

information:

Machine

Machine where the process event was recorded

Short designation

Short name of the machine where the process event was recorded

Designation

Name of the machine where the process event was recorded

Event ID

Technical name of the recorded event

Designation

Event name

Event time

Time of measurement of the process event

Value

Value of the recorded process event

PDV-MPD_82.docx

Version: 1.0.23049

Page 19 of 21

Monitoring of Process Data

8  Event Durations

Summary

Menu

Quality management  Process analysis  Event durations analysis

Transaction code

pevedrp

Function authorization

pevedrp

This application is used for the event analysis of process events that have been recorded in the process

data collection of the machine. These events are evaluated as intervals.

Usage

The  application  "Event  durations"  lists  the  process  events  in  table  form.  It  is  assumed  here  that  a  start

event  (bit  value  =  1)  and  an  end  event  (bit  value  =  0)  belong  together  and  form  an  interval.  The

application shows these intervals and their durations. In addition, by grouping the events, a quantity and

total time of occurrence of this event becomes visible.

Integration

The events and thus digital process values are recorded from the machine using the PDV module, similar

to  analog  measured  values,  i.e.  process  parameters  for  defined  process  characteristics.  These  can  be

unevaluated signals, error signals or message signals.

The events displayed in the "process events" application are processed further here.

Requirement

The process data collection must be set up for collecting the events.

Selection parameters

The following selection criteria are available in the application:

Machine

The machine to be evaluated.

Event type

Based on the configuration  in the event master data,  the type of the events may be filtered here,

e.g. "F" or "H".

PDV-MPD_82.docx

Version: 1.0.23049

Page 20 of 21

Monitoring of Process Data

Period from - until

Limitation of the search for events to this period. The start and end events are selected within this

period. In so doing, open end intervals are always calculated up to the end of the selection period.

In addition, the start and end time may be selected by defining a relative date.

Consider long-term data

Long-term data may also be taken into account by clicking the relevant checkbox.

Field descriptions

Machine category

Master data of the machine such as machine, short name and designation

Event category

Master data of the recorded process event

Period category

Start, end and duration of the interval

Grouping:

If grouped by the event designation, the number of events and their total duration are displayed in

the total line.

PDV-MPD_82.docx

Version: 1.0.23049

Page 21 of 21

