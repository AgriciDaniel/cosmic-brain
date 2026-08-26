Process Analysis (based on batches)

1  Process Analysis (based on batches)

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

MOC_ControlTableProcessdataAnalysisBatch.docxVersion:

Page 1 of 3

Process Analysis (based on batches)

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

MOC_ControlTableProcessdataAnalysisBatch.docxVersion:

Page 2 of 3

Process Analysis (based on batches)

Time of measurement

Time of measurement of the characteristic

Detail application: PivotTable

This  report  shows  the  process  characteristics  recorded  and  saved  in  the  database  in  a  pivot  table

including a graphic.

MOC_ControlTableProcessdataAnalysisBatch.docxVersion:

Page 3 of 3

