Manual

Complaint Monitoring
SMA-CMO 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Complaint Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-CMO_81.docx

Version: 1.0.23049

Page 2 of 10

Complaint Monitoring

Contents

1  Complaint Monitoring ................................................................................... 4

2  Complaint Analysis ....................................................................................... 5

3  Analysis of Complaint Costs ........................................................................ 7

4  Complaint Failure ......................................................................................... 9

SMA-CMO_81.docx

Version: 1.0.23049

Page 3 of 10

Complaint Monitoring

1  Complaint Monitoring

Purpose

The Complaint monitoring contains the following SMA applications.

  Complaint analysis

  Complaint failure

  Analysis of complaint costs

All applications provide graphic evaluations using pivot analyses. In addition to the graphic evaluations, the

filtered data can also be displayed in tables.

You can define different application profiles for each application. This way, you can predefine individualized

evaluation profiles for specific use cases. You can change the evaluation profile manually or you can select

another application profile. Another option is to manually change the evaluation profile.

Implementation notes

If you want to show information/evaluations of different complaint data for a specified time or filter range in

a clear overview, then the applications of the Complaint monitoring are the ideal products.

Integration

You can integrate the applications of the Complaint monitoring in the application Information Dashboard.

Features

The following functions are available:

  Graphic  and  tabular  analysis  of  all  complaint  data  including  extensive  filter  criteria  and  display

options.

  Monitoring of complaints, e.g. development of complaints, status of current complaints, analysis of

results.

  Analysis of complaint failures, their causes and main areas.

  Analysis of complaint costs, e.g. you can identify the main cost types and distribution of costs per

customer/supplier.

SMA-CMO_81.docx

Version: 1.0.23049

Page 4 of 10

Complaint Monitoring

2  Complaint Analysis

Overview

App name

Complaint analysis

Short name of app

Complaint analysis

Function authorization

SMA.CA

The application Complaint analysis provides the graphic analysis of collected complaint data in form of a

pivot  analysis.  Example:  You  can  use  the  Complaint  analysis  to  display  the  number  of  complaints  per

complaining  party  including result for a specified period of time. The results of the analysis  are  used  to

decide whether measures must be taken.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Complaint analysis includes the following functions:

  Graphic and tabular analysis of collected complaint data

  General  display  of  the  complaint  development  per  months,  years  or  for  specific  customers,

suppliers, etc.

  Calculation of the complaint frequency per customer, supplier, article, etc.

  Analysis of complaint results

SMA-CMO_81.docx

Version: 1.0.23049

Page 5 of 10

Complaint Monitoring

Integration

The complaint analysis function only evaluates contents of the  Complaint management. The system can

automatically generate complaints after a negative inspection result.

Requirements

There are no special requirements. The only requirement is that complaints and the relevant detail data

must be collected.

Selection criteria

Use the button

 to open the selection area.

Use  the  configuration  button

  of  the  selection  area  to  open  the  fields  that  are  available  for  this

application. Select the required fields to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-CMO_81.docx

Version: 1.0.23049

Page 6 of 10

Complaint Monitoring

3  Analysis of Complaint Costs

Overview

App name

Analysis of complaint costs

Short name of app

Analysis of complaint costs

Function authorization

SMA.CCA

The application Analysis of complaint costs provides the graphic analysis of the collected complaint costs

in form of a pivot analysis. To collect complaint costs, you use the cost types defined in the master data of

the  quality  management.  You  can  assign  the  complaint  costs  directly  to  the  complaint  or  to  the  article

complained about. The article complained about belongs to the complaint details.

The Analysis of complaint  costs can for example display the main costs per complaining party  during a

period of time previously specified. The results of the analysis are used to decide whether measures must

be taken.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Analysis of complaint costs includes the following functions:

  Graphic and tabular analysis of the costs that were collected for a complaint or article.

  Detailed analysis of collected complaint costs for different cost types.

  Display of the development of complaint costs per month, year or for specific customers, suppliers,

internal departments, etc.

  Calculation of the main complaint costs per customer, supplier, article, etc.

SMA-CMO_81.docx

Version: 1.0.23049

Page 7 of 10

Complaint Monitoring

Integration

The application Analysis of complaint costs only evaluates contents of the Complaint management. Note:

Also a negative inspection result can be used to automatically generate a complaint.

Requirements

There are no special requirements. The only requirement is that complaints and the relevant detail data

must be collected. The article complained about belongs to the complaint details.

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  of  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Use a separate identifier to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-CMO_81.docx

Version: 1.0.23049

Page 8 of 10

Complaint Monitoring

4  Complaint Failure

Overview

App name

Complaint failure

Short name of app

Complaint failure

Function authorization

SMA.CFA

The  application  Complaint  failure  provides  a  graphic  analysis  of  articles  complained  about  and  of  the

failures  assigned  to  the  articles.  A  pivot  chart  is  used  to  visualize  the  analysis.  The  application  collects

failure type, failure location, failure cause and origin for the detected failures. The analysis of  Complaint

failures can for example display the main failures per complaining party including result during a period of

time previously specified. The results of the analysis are used to decide whether measures must be taken.

In addition to the graphic view, you can also display the data in a table.

Purpose

The application Complaint failure includes the following functions:

  Graphic and tabular analysis of the failures that were collected for an article.

  Display  of  the  development  of  complaint  failures  per  month,  year  or  for  specific  customers,

suppliers, internal departments, etc.

  Calculation of the complaint failure frequency per customer, supplier, article, etc.

SMA-CMO_81.docx

Version: 1.0.23049

Page 9 of 10

Complaint Monitoring

Integration

The  application  Complaint  failure  only  evaluates  contents  of  the  Complaint  management.  Note:  Also  a

negative inspection result can be used to automatically generate a complaint. If a complaint is generated

automatically, the failure triggering the complaint in the inspection process is automatically assigned to the

complaint.

Requirements

There are no special requirements. The only requirement is that complaints and the relevant detail data

must be collected. The article complained about belongs to the complaint details.

Selection criteria

Use the button

 to open the selection panel.

Use  the  configuration  button

  of  the  selection  panel  to  open  the  fields  that  are  available  for  this

application. Use a separate identifier to enable these fields as filter fields.

Editing functions

This application does not include any editing functions.

SMA-CMO_81.docx

Version: 1.0.23049

Page 10 of 10

