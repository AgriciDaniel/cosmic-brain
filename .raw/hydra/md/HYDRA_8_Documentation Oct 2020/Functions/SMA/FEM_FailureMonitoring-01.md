Fehlermonitoring

1  Failure monitoring

The basis of this application is the analysis of types of failures, causes and sources, which were recorded

or generated automatically in the inspection process. The following areas are in use:

  Goods Receipt

  Production

  Goods issue

  First sample and calibration



Calling the SMA application "failure monitoring" immediately displays the top 10 failure types of the last

28 days from the production area as a bar chart. A descending distribution according to the frequency of

the failure type description is displayed.

The buttons "Failure description" and "Article description" can be used to switch directly between these

two evaluations. The following additional evaluation criteria can be selected via a function button with a

special symbol.

  Machine number random sampling

  Workplace number inspection point

  Workplace number inspection step

  Article group level 1

  Article group level 2

  Failure name

  Failure group level 1

  Failure group level 2

  Characteristic description

  Customer name

  Supplier name

  Failure date

Click on the graphic to switch between an ascending and descending display.

Use the SMA filter symbol in the standard function bar at the top right to filter data can be filtered

according to different criteria. The following filter parameters are available:

  Type n (default: 10)

  Area type as selection list (default: In-productin inspection)

  Area as selection type (default: Production)

FEM_FailureMonitoring-01.docx

Version: 1.0.10269

Page 1 of 3

Fehlermonitoring

  Failure type as selection list (type of failure, location, cause and source, default: Failure type)

  Failure number (direct entry)

  Article group level 1 (here the description of the article group of the 1st level must be entered) (*)

  Article group level 1 (here the description of the article group of the 1st level must be entered) (*)

  Failure time from

A calendar opens to facilitate the completion of the date fields which is dependent on the

browser.  This function is not supported by every browser. It is not supported by the Internet

Explorer.  If the calendar does not open, the date must be collected in the format "YYYY-MM-

DD".  If the detailed display includes date fields, they are displayed in the format "DD.MM.YYYY".

If only one entry is performed (the entry of a date which stipulates the failure time from ....), the

date in the "Failure time to" field is automatically entered.

  Failure time to

A calendar opens to facilitate the completion of the date fields which is dependent on the

browser.  This function is not supported by every browser. It is not supported by the Internet

Explorer.  If the calendar does not open, the date must be collected in the format "YYYY-MM-

DD".  If the detailed display includes date fields, they are displayed in the format "DD.MM.YYYY".

If the user enters a date to, a date from must also be entered.  If this is not done, a corresponding

message is issued after the filter storage.

  Article number

  Order (entry of the order number without operation number).

  Machine number for the random sampling

  Workplace number for the inspection point

  Workplace number for the inspection point

  Customer number

  Supplier number





Inspection point batch

Inspection point partial batch

  Field 1 of the inspection point (the field name can vary per area, which is why the filter field is

generally referred to here as "Field 1")

  Field 2 of the inspection point (the field name can vary per area, which is why the filter field is

generally referred to here as "Field 2")

  Field 3 of the inspection point (the field name can vary per area, which is why the filter field is

generally referred to here as "Field 3")

(*) A filter for these fields requires a service pack higher than SP7. Furthermore, these fields automatically

support match code filtering.

Example: If you enter "Surface", everything is automatically filtered that includes this term.

FEM_FailureMonitoring-01.docx

Version: 1.0.10269

Page 2 of 3

Fehlermonitoring

As soon as the filter is called and no time filter is set, the restriction to the last 28 days is canceled.

After the application has been closed and the call has been started, the default filter and display are reset.

If the display of the "Failure" is limited, e.g. to the top 5 and other "Failure" occur, which have the same

frequency as the last "Failure", then this fact is indicated in the status message bar at the top left

FEM_FailureMonitoring-01.docx

Version: 1.0.10269

Page 3 of 3

