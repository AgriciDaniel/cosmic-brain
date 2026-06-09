Manual

Process Data Management
Collection Rules
PDV-VRP 8.3

Version 1.0.23049

Last changed on: 02.09.2020

Process Data Management Collection Rules

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-VRP_83.docx

Version: 1.0.23049

Page 2 of 11

Process Data Management Collection Rules

Contents

1  Process Data Management: Processing Rules ........................................... 4

2  Collection Rules ........................................................................................... 6

3  Collection Request ..................................................................................... 11

PDV-VRP_83.docx

Version: 1.0.23049

Page 3 of 11

1

 Process Data Management: Processing Rules

Process Data Management Collection Rules

Overview

Purpose

The product PDV-VRP "Processing rules for process data" provides the functions used to define collection

rules  and  collection  processes.  You  define  collection  rules  and  logical  channels  to  specify  and  connect

process characteristics and access paths. This activates the process data collection.

Integration

This  function  package  requires  a  machine  interface  for  data  collection  in  the  Process  Communication

Controller (PCC) and the basic package PDV-PDM.

Features

This product provides the following functions:

  Development  of  machine-related  collection  rules  managed  in  versions.  Specification  of

characteristics  planned  for  this  machine.  Definition  of  limits.  Specification  of  the  statistics

processing.

  Generation of article-related collection rules managed in versions. Specification of characteristics

planned for this article. Definition of limits. Specification of the statistics processing.



If  you  use  the  specification  list,  you  can  redefine  the  planned  values  with  reference  to  tools,

machines or articles.

  The collection rules have a version number. The user can block or release a version. The version

number does not change if you change the collection rule. You can activate a version of a collection

rule. The collection of measured values is then based on this collection rule.

  You  can  define  conversion  factors  for  characteristics  and  calculate  new  characteristics  using

existing characteristics.

  Collection rules become active collection requests as soon as an order is processed (with collection

rules  based  on  articles)  or  with  manual  input  (with  collection  rules  based  on  machines).  The

collection requests control the collection. They can also be used to evaluate the process data.

  When the collection request is changed, running collection processes are notified and the collection

specifications are automatically changed at run time.

PDV-VRP_83.docx

Version: 1.0.23049

Page 4 of 11

Process Data Management Collection Rules

PDV-VRP_83.docx

Version: 1.0.23049

Page 5 of 11

Process Data Management Collection Rules

2  Collection Rules

Overview

Menu

Quality management  Process data collection  Collection rules

Transaction code

Function authorization

iplpd

iplpd

Purpose

The automatic data collection of process characteristics is based on the collection rules specified in the

Process Data Collection module.

Integration

Collection  rules  result  in  collection  requests.  Collection  requests  activate  the  defined  rules  for  data

collection.  Characteristics  are  the  basis  for  collection  rules.  You  can  take  the  characteristics  from  the

characteristics  master  data  catalog.  The  generation  of  collection  requests  activates  the  actual  data

collection process. The data collection uses the logical channel that is defined by the process parameter of

the characteristic.

PDV-VRP_83.docx

Version: 1.0.23049

Page 6 of 11

Process Data Management Collection Rules

Requirements

The characteristics catalog must be defined.

Selection criteria

The application provides the following selection criteria:

You can choose from three different tabs to select data. You can use the tabs "Collection rule", "Workplace

and article" and "User fields".

Collection rule:

Area (drop-down list)

You can use the drop-down list to select the required area.

Collection number

Select the collection number.

Collection index

Select the collection index.

Active checkbox

Enable the checkbox to select active collection rules.

PDV-VRP_83.docx

Version: 1.0.23049

Page 7 of 11

Process Data Management Collection Rules

Workplace and article:

Machine

Select the required machine.

Article number

You can use a search application to search for and select an article number.

Article name/designation

You can select the article name.

User fields:

Object type

You can select an object type.

User field key

Use the drop-down list to select a user field key.

Field descriptions

The table view of the detail application offers an overview of existing entries. You can sort the displayed

information using table functions. The displayed data complies with the specified selection parameters.

The table view is an integrated master-detail table, which contains not only the collection rules, but can also

be expanded to show the recorded characteristics:

PDV-VRP_83.docx

Version: 1.0.23049

Page 8 of 11

Process Data Management Collection Rules

Depending  on  the  selected  line,  the  details  pane  shows  the  corresponding  information.  The  tabs  vary

accordingly.

When you call up an editing function, this function affects the entry/entries selected in the table.

Toolbar

In addition to the standard buttons for creating, deleting and editing, the following, context sensitive buttons

are available for the collection rules:

 Activate

Function authorization: iplpd.activate

Click this button to enable the selected collection rule. Only one version of a collection rule can be

active  at  a  time!  If  you  activate  continuous  monitoring  rules,  the  system  immediately  generates  a

collection request. This activates data collection. If  you activate article-related collection rules, the

system automatically generates a collection request the next time you log on a production order for

this article.

 Deactivate

Function authorization: iplpd.deactivate

Click this button to deactivate the selected collection rule. If you deactivate continuous monitoring

rules, the system terminates the collection request.

 Release

Function authorization: iplpd.release

Click this button to release the selected collection rule. You can no longer edit released rules. You

can only activate released rules.

 In process

Function authorization: iplpd.inprocess

Click this button to cancel the release for the selected collection rule. You can now edit the rule.

PDV-VRP_83.docx

Version: 1.0.23049

Page 9 of 11

Process Data Management Collection Rules

Detail applications

The detail view shows the information matching the entry selected in the table view.

The  detail  view  consists  of  two  tabs,  i.e.  the  collection  rule  and  the  recorded  characteristic.  These  tabs

include some additional sub-tabs.

Collection rule:

Collection: The detail view shows the data that has to do with data collection. These include the

collection rule, the status, the machine and the article.

Administration: This detail view displays the data that has to do with data management. This is

primarily a time stamp for the selected inspection plan.

User fields: Shows the object type and the user field key.

Recorded characteristic:

Characteristics: This detail view shows the characteristics for the current inspection plan.

Specifications:  This  detail  view  shows  the  samples  and  dimensions  in  detail.  You  need  the

function authorization iriscp.interval in order to store an interval value in the sampling scheme.

Please note that sample-related reports/evaluations are not available for process characteristics

whose limit values are controlled via specification lists.

Storage: Shows the selected filter function.

Visualization: Detail view for the visualization.

Inspection - computation: Detail view for inspection and calculation.

Administration: This detail view displays the data that has to do with data management. This is

primarily a time stamp for the selected inspection plan.

User fields: Shows the object type and the user field key.

PDV-VRP_83.docx

Version: 1.0.23049

Page 10 of 11

Process Data Management Collection Rules

3  Collection Request

Summary

Menu

Quality Management  Process Data Collection  Collection Request

Transaction code

crpd

Function authorization

crpd

The  collection  requests  are  generated  according  to  defined  rules  from  the  collection  rules.  The  actual

collection of data is activated by the collection requests.

Usage

The collection requests are generated by

-  Continuous  collection  rules,  fully  automatic  when  the  collection  rule  is  activated.  When  it  is

deactivated, the request is automatically closed again.

-  Article related collection rules, fully automatic when production orders for the defined article are

generated or logged on.

Integration

The collection requests are created from the collection rules and then transferred to the collection computer

in compressed form so that it starts the collection after it receives the rule.

Normally no manual intervention into the collection requests is necessary because they are created and

ended automatically. Rather, the function is used only for purposes of analysis.

Requirement

In addition to the collection rules, the collection of the logical channels must be defined so that collection

can occur.

Toolbar

The toolbar contains function for controlling the activity of the collection requests such as release,

complete and cancel.

PDV-VRP_83.docx

Version: 1.0.23049

Page 11 of 11

