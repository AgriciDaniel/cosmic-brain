Manual

Monitoring of Process Data
PDV-MPD 8.3

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

PDV-MPD_83.docx

Version: 1.0.23049

Page 2 of 9

Monitoring of Process Data

Contents

1  Monitoring of Process Data .......................................................................... 4

2  Tabular Process Analysis ............................................................................. 5

3  Characteristic Attributes ............................................................................... 8

PDV-MPD_83.docx

Version: 1.0.23049

Page 3 of 9

Monitoring of Process Data

1

 Monitoring of Process Data

Overview

Purpose

The  product  PDV-MPD  function  package  provides  functions  to  analyze  the  collected  process  data.  You

can list the collected process values of the machines.

Integration

This product requires the data that the system has collected using the PDV data collection functions.

For  the  evaluation  of  the  data  collected  for  orders  and  batches,  the  licenses  and  functions  of  the  shop

floor  data  collection  or  the  batch  data  collection  are  required.  You  can  also  record  data  for  specified

orders or batches using TAG process values.

Features

This product provides the following functions:

  Evaluation  of the specifications of a collection rule that have  been changed  by the specification

list

  Tabular process analysis of single machines over a specified period of time via TAG IDs. You can

filter the collected process parameters.

PDV-MPD_83.docx

Version: 1.0.23049

Page 4 of 9

Monitoring of Process Data

2  Tabular Process Analysis

Overview

Menu

Quality management  Process analysis  Tabular process analysis

Transaction code

pdt

Function authorization

pdt

Purpose

The  Tabular  process  analysis  provides  an  evaluation  of  the  measured  values  recorded  in  the  process.

The evaluation is included in a data table.

You  can  sort  the  information  displayed  in  the  table.  The  defined  selection  parameters  specify  the

information in the table. Display and grouping of fields is saved for each user separately.

Integration

The  application  Tabular  process  analysis  is  based  on  the  measured  values  recorded  for machines  or

articles.

Selection criteria

The application provides the following selection criteria:

Selection tab Workplace

Workplace

The measured values have been recorded for the workplace specified in this field.

Process parameter

This  selection  criterion  specifies  the  process  parameters  for  which  the  measured  values  are

displayed.

Time from,to

The measured values of the evaluation period selected in this field are displayed.

Selection tab Tag

Tag type

This selection criterion refers to the tag type used to record the measured values. If a tag type  is

specified, then you must additionally specify the tag content as selection criterion.

PDV-MPD_83.docx

Version: 1.0.23049

Page 5 of 9

Monitoring of Process Data

Tag content

This  selection  criterion  defines  the  value  of  the  specified  tag  type  that  is  used  to  select  the

measured values. You can also use a wildcard (*) as content.

If  a  value  is  specified  for  the  tag  content,  then  you  must  additionally  specify  the  tag  type  as

selection criterion.

Workplace

The measured values have been recorded for the workplace specified in this field.

Process parameter

This  selection  criterion  specifies  the  process  parameters  for  which  the  measured  values  are

displayed.

Time domain

The measured values of the evaluation period selected in this field are displayed.

Detail applications

The measured values that match the selection criteria are displayed in a grid table.

Field descriptions

Workplace

The field Workplace specifies the workplace assigned to the measured value

Process parameter

Name of the process parameter assigned to the measured value.

Point in time

Time  when  the  measured  value  displayed  has  been  recorded.  The  time  is  displayed  to  the

millisecond.

Point in time (sec)

Time when the measured value displayed has been recorded. The time is displayed to the second.

Process parameter description

This field shows the name of the process parameter displayed.

Value

The measured value recorded for the process parameter at the point in time of the data collection.

Unit

The unit of the measured value.

PDV-MPD_83.docx

Version: 1.0.23049

Page 6 of 9

Monitoring of Process Data

Unit description

Name of the unit.

Lower tolerance limit

Value of the lower tolerance limit when the measured value has been recorded.

Lower process action limit

Value of the lower process action limit when the measured value has been recorded.

Target value

The target value that was valid when the measured value has been recorded.

Upper tolerance limit

Value of the upper tolerance limit when the measured value has been recorded.

Upper process action limit

Value of the upper process action limit when the measured value has been recorded.

PDV-MPD_83.docx

Version: 1.0.23049

Page 7 of 9

Monitoring of Process Data

3  Characteristic Attributes

Summary

Menu

Quality Management  Process Data Collection  Characteristic Attributes

Transaction code

ipcapd

Function authorization

ipcapd

Evaluation/report  about  the  characteristic  attributes  used  over  time  due  to  the  deviations  defined  in  the

specification lists.

Utilization

When logging operations on, input requests are generated for article-related collection rules. These basic

attributes  within  the  characteristic  specifications  of  the  collection  rule  can  be  overwritten  by  definitions

made in the specification list. Over time, this report shows the specifications that have actually been used

for data collection in table form. In this context, entries are only made if deviations to the collection rule

are defined.

Integration

The  specifications  made  in  the  characteristics  of  the  collection  rules  and  the  deviations  defined  by  the

specification list define the characteristic attributes.

Selection criteria

The application provides the following selection criteria:

Area

The article-related data collection can only be selected for the PDV module.

Inspection requirement number, inspection step no., OP sequence, characteristic number

Identification attributes for inspection requirements and their characteristics

Period

The report is restricted to a specific period of time.

Field descriptions

These are the fields of the characteristic specifications as they can also be defined within the master data

of characteristic definitions or the collection rules and the specification list.

PDV-MPD_83.docx

Version: 1.0.23049

Page 8 of 9

Monitoring of Process Data

PDV-MPD_83.docx

Version: 1.0.23049

Page 9 of 9

