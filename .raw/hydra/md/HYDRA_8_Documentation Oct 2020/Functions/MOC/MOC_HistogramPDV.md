PDV Histogram

1  PDV Histogram

Overview

Menu

Quality management  Process analysis  PDV histogram

Transaction code

histp

Function authorization

histp

Usage

The "histogram" report shows the distribution of measured values for a characteristic/process parameter.

The data basis may be restricted by using versatile filters.

Integration

Histograms can be evaluated based on the (PDV) inspection data recorded in the areas

  PDV inspection planning relating to articles

  Production

  Machine capability

  PDV continuous monitoring

 Consequently, the "PDV histogram" report is a general analysis tool.

Requirements

Depending  on  the  selected  area,  different  filter  fields  have  to  be  completed  in  order  to  display  the

histogram.

For the "PDV continuous monitoring" area these are the fields:

  Type "PDV continuous monitoring" ("specifications" tab)

  Machine ("machine" tab)

  Date of first measured value from ... to ... ("machine" tab)

  Process parameters

Selection criteria

"Specifications" tab

MOC_HistogramPDV.docx

Version: 1.0.5114

Page 1 of 5

Area

Selection list of the configured areas of the previously filtered area type. By default, the following

PDV Histogram

areas are available.

    - PDV inspection planning relating to articles

    - Production

    - Machine capability

    - PDV continuous monitoring

"Inspection plan" tab

Inspection plan number

Inspection plan number

Inspection plan index

Inspection plan number

"Inspection requirement" tab

Inspection requirement number

Inspection requirement number

Article number

Article number

Order

Order

"Inspection step" tab

Inspection step number

Inspection step no.

Operation

Operation

MOC_HistogramPDV.docx

Version: 1.0.5114

Page 2 of 5

PDV Histogram

"Machine" tab

Machine

Machine

Date of first measured value from ... to ...

Date for the evaluation period

"Characteristic" tab

OP sequence

Machine

Characteristic no.

Characteristic no.

Process parameters

Process parameters

Toolbar

 Histogram settings

Opens  a  dialog  to  configure  histogram  settings.  The  corresponding  details  are  described  in  the

respective detail application.

"Histogram" detail applications

MOC_HistogramPDV.docx

Version: 1.0.5114

Page 3 of 5

The histogram is always based on the entire set of available measured values matching the selected filter

criteria.  The  appearance  of  the  histogram  is  determined  by  the  number  of  classes  and  by  elements

additionally displayed. The contents of this application are defined by opening the dialog to configure the

"histogram". Changes made via this dialog are saved according to the user's requirements.

PDV Histogram

The paragraphs that follow explain the essential configuration options.

Number of classes

Specifies the number of histogram classes according to which the measured values are distributed.

If  represented  within  the  tolerance  limits  (option  "scale  by  tolerance  limits")  one  histogram  class

each is outside of the tolerance limits.

Scale by tolerance limits

Enabled: The classes are in between the tolerance limits with one "outlier class" each to the left

and to the right.

Disabled: The classes include the range of all measured values (no separate classes for values

outside of the tolerance limits).

Consider long-term data

  Includes the archived data from the medium-term data area.

Show histogram title

If a special title is to be displayed it may be entered by enabling this option.

MOC_HistogramPDV.docx

Version: 1.0.5114

Page 4 of 5

PDV Histogram

X-axis labeling

The x-axis shows the corresponding values of the class limits if the "class limits" option is set. The

number of decimal places displayed may be set by the two configuration options for decimal places.

Consider the number of decimal places

Takes into account the defined number of decimal places in the x-axis labeling.

MOC_HistogramPDV.docx

Version: 1.0.5114

Page 5 of 5

