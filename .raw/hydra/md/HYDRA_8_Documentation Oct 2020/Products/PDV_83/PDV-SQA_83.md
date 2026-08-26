Handbuch

Sequenzanalyse
PDV-SQA 8.3

Version 1.0.23049

Letzte Änderung: 02.09.2020

Sequenzanalyse

Copyright

©Copyright 2020 Alle Rechte vorbehalten.

SAP® und R/3® sind eingetragene Warenzeichen der SAP AG.

WINDOWS® ist eingetragenes Warenzeichen von Microsoft Corporation.

MPDV® und HYDRA® sind eingetragene Warenzeichen der MPDV Mikrolab GmbH.

ORACLE® ist ein eingetragenes Warenzeichen der  ORACLE Corporation, Kalifornien, USA.

Weitergabe und Vervielfältigung dieser Dokumentation oder von Teilen daraus sind, zu welchem Zweck und in welcher Form auch
immer, ohne die ausdrückliche schriftliche Genehmigung durch MPDV nicht gestattet.

Alle Rechte vorbehalten.

PDV-SQA_83.docx

Version: 1.0.23049

Seite 2 von 7

Sequenzanalyse

Inhaltsverzeichnis

1  Sequence Analysis ....................................................................................... 4

2  Sequence Analysis ....................................................................................... 5

PDV-SQA_83.docx

Version: 1.0.23049

Seite 3 von 7

Sequenzanalyse

1  Sequence Analysis

Overview

Purpose

The product PDV-SQA includes functions for the graphic display of a sequence of process parameters.

Integration

To  display  sequence  curves,  you  must  record  a  process  parameter  and  a  process  parameter  that  is

defined as TAG type (alphanumeric tag).

Features

This product provides the following functions:

  Presentation of the process values saved as sequence (set of curves)

  Possible import of a reference curve for a process parameter

PDV-SQA_83.docx

Version: 1.0.23049

Seite 4 von 7

Sequenzanalyse

2  Sequence Analysis

Overview

Menu

Quality management  Process analysis  Sequence analysis

Transaction code

pdsa

Function authorization

pdsa

Purpose

You use the sequence analysis to display a set of curves. The display includes several sequences of a

process  parameter  progression.  A  sequence  is  the  period  of  time  between  two  specified  separators.  A

process parameter of data type "tag" is used as separator.

Requirements

To  display  sequence  curves,  you  must  record  a  process  parameter  and  a  process  parameter  that  is

defined as TAG type (alphanum. tag).

The TAG type value is used in the sequence analysis to identify the limits of the separate sequences. The

sequence therefore is the  period of time between two recorded  values of the process parameter that is

used as TAG type.

Note:

The sequence analysis requires that all relevant process data is linked to tag contents (e.g. serial

numbers). A curve is drawn for the time domain that is continued as long as a TAG content does not

change its value. If no TAG value is assigned to one or several process values, these process values are

not used in the evaluation.

Selection criteria

The application provides the following selection criteria:

Process parameter

This  selection  criterion  specifies  the  process  parameters.  The  measured  values  of  these  process

parameters are then displayed. You can select a process parameter from the list.

TAG type

This selection criterion refers to the tag type for which the measured values have been recorded.

PDV-SQA_83.docx

Version: 1.0.23049

Seite 5 von 7

Sequenzanalyse

Workplace

This selection criterion refers to the workplace where the measured values have been recorded.

Number of curves

This selection field specifies the number of sequences displayed in a chart. The default value five is

preset in this selection field. You can enter other integer numeric values.

Time domain

This selection criterion defines the evaluation period for which the measured values are displayed.

You

can

specify

the

time

domain

to

the

millisecond.

When you open the application, the time domain is preset with a time domain from opening time to

eight hours into the past.

Note:

For performance reasons, the data query for the sequence analysis is restricted to a maximum of 10,000

data points.

You can increase the maximum number of data points via INI configuration. If you increase the maximum

number of permitted data points beyond 10,000, this has a negative effect on the evaluation speed and is

the responsibility of the customer.

INI configuration: "SYS_WS_PARAM"

Section: "ANALYSISPROCESSDATA.LISTBYWORKPLACELASTTAGVALUESDECIMALBASED"

Key: "CORE.TOP_COUNT")

Toolbar

 Import reference curve

You use this function to import a data file that includes a reference curve. The file size is limited to 1

megabyte.

Detail applications

In  the  sequence  chart,  a  tooltip  is  shown  at  the  relevant  position  of  the  cursor  including  the  following

information:

  Point in time within the sequence

  Measured values of the curves displayed

PDV-SQA_83.docx

Version: 1.0.23049

Seite 6 von 7

Sequenzanalyse

  Upper tolerance limit

  Upper process action limit

  Lower process action limit

  Lower tolerance limit

PDV-SQA_83.docx

Version: 1.0.23049

Seite 7 von 7

