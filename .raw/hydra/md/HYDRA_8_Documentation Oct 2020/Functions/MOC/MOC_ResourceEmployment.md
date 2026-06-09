Use of Resources

1  Use of resources

Overview

Menu

Production facility management  Resource analysis  Use of resources

Transaction code

Resemp

Function authorization  Resemp

Purpose

Depending  on  the  selection  made,  this  evaluation  displays  the  actual  values  of  resources  to  which

postings  were  made  for  time,  quantities  and  cycles/strokes/shots.  You  can  select  the  time  period  you

want to consider. You may specify the resources you wish to view in the upper part of the selection pane.

The selection is based on the logon time of the posting. The time for data selection may vary depending

on the extent of the selection period.

In addition to resource-related master data, the application provides the following data:

  Cycles/strokes/shots  posted  since  implementation  or  within  a  certain  period  of  time  (depending

on selection)

  Quantity posted since implementation or within a certain period of time (depending on selection)

  Downtimes  times  posted  since  implementation  or  within  a  certain  period  of  time  (depending  on

selection), totaled and divided up according to resource performance accounts (RPAs)

The application also pulls information from postings already transferred into archive tables.

The  evaluation  only  integrates  those  resources  that  are  assigned  to  the  "consider  in

evaluations"  option  in  the  "configuration"  category  of  the  resource  stock.  The  option  "Post  to

resource"  needs  to  be  checked  in  order  for  quantities,  cycles  and  times  to  be  posted  to

resources. Posting takes place when the operation to which the resource is assigned is logged

on.

File-based resources and resources with DNC processing can be neither logged in nor posted.

After  changing  or  adding  data  records,  you  have  to  refresh  the  data  manually  to  view  the

changed/added data (click the "request data button).

Selection criteria

The application provides the following selection criteria:

MOC_ResourceEmployment.docx

Version: 1.1.14795

Page 1 of 3

Use of Resources

Resource

Selected resource.

Resource type

You can filter data by the resource type.

Family

You can filter data by the resource family.

Workplace

Machine where the resource was logged on.

Order

You can filter data by the logged in order.

Article

You can filter data by the article of the logged in order.

Field descriptions

General, master data

Shows the resource master data.

Order, article machine/workplace

Shows order data.

Date

Date of the included postings; including  separate fields for year, month and day. You can use the

fields to group data:

-  Date/time specification

-  Year

-  Month

-  Day

Quantities

Quantity totals of the postings.

RPA

Account totals of the postings.

MOC_ResourceEmployment.docx

Version: 1.1.14795

Page 2 of 3

Use of Resources

Toolbar

Main page tab

  Insert

Opens the dialog for adding data.

  Copy

Opens the dialog for copying data.

  Edit

Opens the dialog for editing data.

 Delete

Deletes the selected entry.

  Authorize

Not relevant at the moment. For later use.

MOC_ResourceEmployment.docx

Version: 1.1.14795

Page 3 of 3

