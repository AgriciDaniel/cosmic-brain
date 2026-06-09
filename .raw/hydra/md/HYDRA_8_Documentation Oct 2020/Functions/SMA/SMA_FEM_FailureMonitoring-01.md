Failure MonitoringFailure Monitoring

1  Failure Monitoring

App name

Failure monitoring

App name Mini

Failure monitoring

Function authorization

sma.failure

The basis of this application is the analysis of failure types, locations, causes and causers, which were

manually recorded or automatically generated in the inspection process. The basis for this are the

following areas

  Goods receipt

  Production

  Goods issue



Initial samples and

  Calibration.

By activating the SMA application "Failure monitoring", the top 10 failure types in Production from the past

28 days are immediately displayed as a bar chart. The display shows the descending distribution

according to the frequency of the failure type description.

The buttons "Failure description" and "Article description" are used to change directly between these two

types of evaluation. A special symbol button is used to select the following additional evaluation criteria:

  Sample: machine number





Inspection point: workplace number

Inspection step: workplace number

  Article group, level 1

  Article group, level 2

  Failure description

  Failure group, level1

  Failure group, level 2

  Characteristic description

  Customer name

  Supplier name and

  Failure date

A click on the graph changes from the ascending to the descending presentation.

The SMA filter symbol in the standard toolbar on the top right is used to filter the data according to

different criteria. The following filter criteria are available:

SMA_FEM_FailureMonitoring-01.docx

Version: 1.1.6321

Page 1 of 3

Failure MonitoringFailure Monitoring

  Top n (by default: 10)

  Area type as selection list (by default: In-production inspection)

  Area as selection list (by default: Production)

  Failure type as selection list (failure type, location, cause and causer, by default: failure type)

  Failure number (direct entry)

  Article group, level 1 (the name of the article group of the 1st level has to be entered here) (*)

  Article group, level 2 (the name of the article group of the 2nd level has to be entered here) (*)

  Failure from

Depending on the browser, a calendar is opened to support the entry for date fields.

This function is not supported by all browsers. Internet explorer, for instance, does not support it.

If entries are not supported by a calendar, the date must be entered in the format "YYYY-MM-

DD". In the detail display with date fields, these dates are indicated in the format "DD.MM.YYYY".

If a "from date" only is entered, the same date is automatically entered in the field "Failure until"

when the entry is saved.

  Failure until

Depending on the browser, a calendar is opened to support the entry for date fields. This function

is not supported by all browsers. Internet explorer, for instance, does not support it. If entries are

not supported by a calendar, the date must be entered in the format "YYYY-MM-DD". In the detail

display with date fields, these dates are indicated in the format "DD.MM.YYYY".

A "to date" entry requires the entry of a "from date". If this entry is not made, an appropriate

message is generated after saving the filter.

  Article number

  Order (entry of order number without operation number)

  Machine number for sample

  Workplace number for inspection point

  Workplace number for inspection step

  Customer number

  Supplier number

  Batch of inspection point

  Partial batch of inspection point

  Field 1 of the inspection point (the field name may vary according to the area, which is why the

filter field is generally designated as "Field 1" here)

  Field 2 of the inspection point (the field name may vary according to the area, which is why the

filter field is generally designated as "Field 2" here)

  Field 3 of the inspection point (the field name may vary according to the area, which is why the

filter field is generally designated as "Field 3" here)

SMA_FEM_FailureMonitoring-01.docx

Version: 1.1.6321

Page 2 of 3

Failure MonitoringFailure Monitoring

(*) Filtering according to these fields requires a Service Pack higher than SP7. In addition, these fields

automatically support match code filtering.

Example: If "surface" is entered, everything that contains this term is filtered.

As soon as the filter is activated and no time filter is set, the initial limitation to 28 days is canceled.

When the application is shut down and then re-activated, the default filters and default presentation are

set again.

If the display of presented "Failures" is limited, e.g. to the top 5, and there are more "Failures" occurring in

the same frequency as the last "Failure" indicated, this is indicated in the status bar at the top left.

SMA_FEM_FailureMonitoring-01.docx

Version: 1.1.6321

Page 3 of 3

