Manual

Supplier Assessment /
Assessment Management
WEP-LFB 8.2

Version 1.2.23049

Last changed on: 02.09.2020

Supplier Assessment / Assessment Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEP-MLB_82.docx

Version: 1.2.23049

Page 2 of 16

Supplier Assessment / Assessment Management

Contents

1  Supplier Assessment / Assessment Management ....................................... 4

2  Criteria Analysis ........................................................................................... 5

3  Comparison of Assessed Parties ............................................................... 11

WEP-MLB_82.docx

Version: 1.2.23049

Page 3 of 16

Supplier Assessment / Assessment Management

1  Supplier Assessment / Assessment Management

Purpose

This component is used if suppliers or departments are to be assessed for a specific period on the basis of

previously created assessment catalogs. Assessment can be performed manually, but also automatically

for some criteria. With regard to automatic assessment criteria, an appropriate data basis must previously

have been entered in HYDRA, e.g. goods receipt inspections.

Implementation Considerations

If, for instance in the ERP system, supplier assessment is an integral part of the system, but there is no

rating of quality criteria, HYDRA can determine these by using this application. In addition, it is also possible

to perform a complete supplier assessment in HYDRA. Use is also recommended if a department-related

assessment is to be performed.

Integration

This component considers the data of goods receipt inspection requirements and complaint management.

These are the basis for automatic determination of quality-relevant statistical values.

Features

The following functions are available:

  Determination  of  limit  values  for  rating  in  freely  definable  assessment  classes  (e.g.  supplier

classes)

  Free definition of assessment systems

  Determination  of  statistical  values  regarding  to  time  and  quantity-related  deviations  from

specifications as well as from the supplied quality (WEP-PPW license required)

  Determination of statistical values regarding complaints (REK-EVA required)

  Creation of various assessment catalogs

  Free definition of assessment criteria with variable weighting

  Assessment of different organizations, e.g. suppliers, departments

  Comprehensive evaluations (e.g. supplier development, supplier comparison)

WEP-MLB_82.docx

Version: 1.2.23049

Page 4 of 16

Supplier Assessment / Assessment Management

2  Criteria Analysis

Overview

Menu

Quality management  QM evaluation  Criteria analysis

Quality management  Evaluation  Criteria analysis

Transaction code

suevaa

Function authorization

suevaa

This document provides a description of the "Criteria analysis" application in the Manufacturing Operation

Center (MOC).

Usage

This  evaluation  can  be  used  to  visualize  the  development  of  assessment  criteria  over  a  period  of  time

and/or compare the criteria over a period of time. To this end, the assessed party whose criteria you intend

to observe needs to be selected in the filter.

WEP-MLB_82.docx

Version: 1.2.23049

Page 5 of 16

Supplier Assessment / Assessment Management

Integration

This evaluation only uses assessments from Assessment Management.

Prerequisite

There are no specific prerequisites. The only prerequisite is the execution of assessments, e.g. supplier

assessments.

Selection Criteria

Since the selection criteria are self-explanatory, they are not explained separately.

Toolbar

No other special function buttons are available in addition to the standard functions.

"Criteria in Comparison" Detail Applications

The  data  is  displayed  in  a  pivot  table  in  combination  with  a  graphic  format  with  bar  charts.  Various

application  functions  are  available  for  the  display.  The  assessment  data  previously  filtered  by  selection

criteria are used as the data basis.

The general pivot functions are not described in detail at this point. The remarks below are limited to the

elementary functions of this evaluation.

Pivot evaluation offer the following advantages:

  Large data volumes can be summarized and presented quickly.

  Rows and columns can be rotated in order to have different summaries of source data displayed.

  Simple filtering by "drag & drop" with additional detail filter.

  The interactive presentation enables the data to be summarized and analyzed in various formats

and with different calculation methods.

The following context menu can be opened by clicking the right mouse button:

WEP-MLB_82.docx

Version: 1.2.23049

Page 6 of 16

Supplier Assessment / Assessment Management

The "Show field list" function enables selection of the fields to be used for the pivot analysis. The figure

below shows a possible field list.

The requested fields can be dragged and dropped into the evaluation area.

WEP-MLB_82.docx

Version: 1.2.23049

Page 7 of 16

The "Show filter editor" function enables a further, flexible restriction of the data basis in addition to the

Supplier Assessment / Assessment Management

selection

criteria.

By showing the settings, the following window is opened:

WEP-MLB_82.docx

Version: 1.2.23049

Page 8 of 16

Supplier Assessment / Assessment Management

Activating the selection option allows content areas of the tabular presentation to be marked. In this case,

the graphic format is based on the marked cells. An activated label display enables the sum total of the

numbers from each bar to be shown.

The following figure illustrates these functions.

WEP-MLB_82.docx

Version: 1.2.23049

Page 9 of 16

Supplier Assessment / Assessment Management

The sum function enables the Overall Result row in the bar graph to be shown also. If the selection function

is activated, the overall result of the respective column is added to the respective bar when the Total Result

row cells are marked accordingly.

By activating/deactivating the "Columns" option, the presentation switches between the graphic format of

the respective number of columns and/or rows.

"Criteria Development" Detail Applications

In analogy to the "Criteria in comparison" detail application, there is also the analysis of criteria development

featuring the same pivot functions.

"Assessment Basis" Detail Applications

The  assessment  basis  shows  the  assessments  filtered  on  the  basis  of  the  selection  criteria  applied,

including the referenced data, in a list. The referenced data usually correspond to the field list for the pivot

analysis.

WEP-MLB_82.docx

Version: 1.2.23049

Page 10 of 16

Supplier Assessment / Assessment Management

3  Comparison of Assessed Parties

Overview

Menu

Quality management  QM evaluation  Comparison of assessed parties

Quality management  Evaluation  Comparison of assessed parties

Transaction code

suevac

Function authorization

suevac

This  document  provides  a  description  of  the  "Comparison  of  assessed  parties"  application  in  the

Manufacturing Operation Center (MOC).

Usage

This  evaluation  may  be  used  to  compare  several  assessed  parties  with  each  other.  Should  several

assessments for one assessed party be included in the filtered data, the latest version is always considered.

WEP-MLB_82.docx

Version: 1.2.23049

Page 11 of 16

Supplier Assessment / Assessment Management

Integration

This evaluation only uses assessments from Assessment Management.

Prerequisite

There are no specific prerequisites. The only prerequisite is the collection of assessments in Assessment

Management.

Selection Criteria

Since the selection criteria are self-explanatory, they are not explained separately.

Toolbar

No other special function buttons are available in addition to the standard functions.

"Comparison of Assessed Parties" Detail Applications

The  data  is  displayed  in  a  pivot  table  in  combination  with  a  graphic  format  with  bar  charts.  Various

application functions are available for the display. The complaint data previously filtered by selection criteria

are used as the data basis.

The general pivot functions are not described in detail at this point. The remarks below are limited to the

elementary functions of this evaluation.

Pivot evaluations offer the following advantages:

  Large data volumes can be summarized and presented quickly.

  Rows and columns can be rotated in order to have different summaries of source data displayed.

  Simple filtering by "drag & drop" with additional detail filter.

  The interactive presentation enables the data to be summarized and analyzed in various formats

and with different calculation methods.

The following context menu can be opened by clicking the right mouse button:

WEP-MLB_82.docx

Version: 1.2.23049

Page 12 of 16

Supplier Assessment / Assessment Management

The "Show field list" function enables selection of the fields to be used for the pivot analysis. The figure

below shows a possible field list.

The requested fields can be dragged and dropped into the evaluation area.

WEP-MLB_82.docx

Version: 1.2.23049

Page 13 of 16

The "Show filter editor" function enables a further,  flexible restriction of the data basis in addition to the

Supplier Assessment / Assessment Management

selection

criteria.

WEP-MLB_82.docx

Version: 1.2.23049

Page 14 of 16

Supplier Assessment / Assessment Management

By showing the settings, the following window is opened:

Activating the selection option allows content areas of the tabular presentation to be marked. In this case,

the graphic format is based on the marked cells. An activated label display enables the sum total of the

numbers from each bar to be shown.

The following figure illustrates these functions.

WEP-MLB_82.docx

Version: 1.2.23049

Page 15 of 16

Supplier Assessment / Assessment Management

The sum function enables the Overall Result row in the bar graph to be shown also. If the selection function

is activated, the overall result of the respective column is added to the respective bar when the Total Result

row cells are marked accordingly.

By activating/deactivating the "Columns" option, the presentation switches between the graphic format of

the respective number of columns and/or rows.

"Assessment Basis" Detail Applications

The  assessment  basis  shows  the  assessments  filtered  on  the  basis  of  the  selection  criteria  applied,

including the referenced data. The referenced data usually correspond to the field list for the pivot analysis.

WEP-MLB_82.docx

Version: 1.2.23049

Page 16 of 16

