First Pass Yield

1  First Pass Yield

Overview

Menu

Quality management  Process analysis  First Pass Yield

Transaction code

fpygen / fpyrep

Function authorization

fpyrep

First Pass Yield (FPY) is a key figure of the quality management and the process management. The FPY

describes the number of parts produced in the first manufacturing cycle without failure or rework.

Purpose

The application First Pass Yield provides a KPI with the same in the MOC.

The KPI FPY can be shown in the following units:

  Percent.  The  FPY  is  usually  indicated  in  percent.  An  FPY  of  86  %  signifies  that  86  out  of  100

produced units comply with the specifications.

  dpmo (defects per million opportunities)

  ppm (parts per million)

By default, the FPY is indicated in percent.

The higher the FPY, the higher the profitability with regards to process quality.

In addition to First Pass, there are the other KPIs Second Pass (SPY), Third Pass (TPY) and No Pass (NP).

An application is to be made available at the MOC, which allows to determine the KPIs FPY, SPY, TPY

and NP on the basis of the work process, the article and the time period.

Integration

Requirements

  Use/configuration of the characteristics etc... for PDV 8.2.

  Can only be used to trace single parts.

  A serial number is mandatory. This serial number is transferred from the machine as a tag with the

relevant process data.

MOC_FirstPassYield.docx

Version: 1.0.10249

Page 1 of 3

First Pass Yield

  The data record that contains the characteristic FAIL / PASS (1/0) is transferred from the workplace

for each test run.

  Use tables in the TNT structure.

  The system performs for each operation the calculation to pass a part with FPY.  The process is

not performed if the OP is interrupted.

Selection criteria

The application provides the following selection criteria:

Article/item

The collected data is displayed for an entered article.

Year

The collected data is displayed for an entered period of time.

MES order number

The system shows the collected data for the entered MES order number.

Field descriptions

MES order number

The field MES order number shows the MES order number.

Article/item

The field Article shows the article number from the operation performed.

Article name

The field Article name shows the article name from the operation performed.

FPY

SPY

TPY

NP

The field FPY shows the KPI First Pass Yield in percent.

The field SPY shows the KPI Second Pass Yield in percent.

The field TPY shows the KPI Third Pass Yield in percent.

The field NP shows the KPI NO Pass in percent.

MOC_FirstPassYield.docx

Version: 1.0.10249

Page 2 of 3

First Pass Yield

Detailed view - Bar chart

In addition to the display of FPY, SPY, TPY and NP in the table, a further view is available as a bar chart.

If the user selects an order on the right hand side, the system displays a corresponding bar chart on the

left hand side.

Detail view - pie chart_1

The view pie chart_1 shows the KPI FPY. Other KPIs are displayed together as "Others".

Detail view - pie chart_2

The view pie chart_2 shows the KPI FPY. The rest of the KPIs (SPY/TPY/NP) are shown individually.

MOC_FirstPassYield.docx

Version: 1.0.10249

Page 3 of 3

