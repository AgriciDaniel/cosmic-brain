Collection Rules

1  Collection Rules

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

MOC_CollectingInstructionProcessData.docxVersion: 1.1.14932

Page 1 of 5

Collection Rules

Integration

Collection  rules  result  in  collection  requests.  Collection  requests  activate  the  defined  rules  for  data

collection.  Characteristics  are  the  basis  for  collection  rules.  You  can  take  the  characteristics  from  the

characteristics  master  data  catalog.  The  generation  of  collection  requests  activates  the  actual  data

collection process. The data collection uses the logical channel that is defined by the process parameter

of the characteristic.

Requirements

The characteristics catalog must be defined.

Selection criteria

The application provides the following selection criteria:

You  can  choose  from  three  different  tabs  to  select  data.  You  can  use  the  tabs  "Collection  rule",

"Workplace and article" and "User fields".

Collection rule:

Area (drop-down list)

You can use the drop-down list to select the required area.

Collection number

Select the collection number.

Collection index

Select the collection index.

Active checkbox

Enable the checkbox to select active collection rules.

MOC_CollectingInstructionProcessData.docxVersion: 1.1.14932

Page 2 of 5

Collection Rules

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

The table view is an integrated master-detail table,  which contains not only the  collection rules, but can

also be expanded to show the recorded characteristics:

MOC_CollectingInstructionProcessData.docxVersion: 1.1.14932

Page 3 of 5

Depending  on  the  selected  line,  the  details  pane  shows  the  corresponding  information.  The  tabs  vary

accordingly.

When you call up an editing function, this function affects the entry/entries selected in the table.

Collection Rules

Toolbar

In  addition  to  the  standard  buttons  for  creating,  deleting  and  editing,  the  following,  context  sensitive

buttons are available for the collection rules:

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

MOC_CollectingInstructionProcessData.docxVersion: 1.1.14932

Page 4 of 5

Detail applications

The detail view shows the information matching the entry selected in the table view.

Collection Rules

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

MOC_CollectingInstructionProcessData.docxVersion: 1.1.14932

Page 5 of 5

