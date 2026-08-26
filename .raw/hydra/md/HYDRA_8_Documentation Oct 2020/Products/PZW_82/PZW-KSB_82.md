Manual

Cost Center Posting
PZW-KSB 8.2

Version 1.0.1374

Last changed on: 19.06.2020

Cost Center Posting

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-KSB_82.docx

Version: 1.0.19468

Page 2 of 11

Cost Center Posting

Contents

1  Cost Center Posting - Overview ................................................................... 4

2  Cost Centers ................................................................................................ 5

3  Cost Center Posting ..................................................................................... 7

PZW-KSB_82.docx

Version: 1.0.19468

Page 3 of 11

Cost Center Posting

1  Cost Center Posting - Overview

Purpose

Application Service for entering and processing cost center-related clocking.

Implementation Considerations

You use the function package if:



you intend to distribute the working time of employees to various cost centers.

  employees  are  to  enter  the  cost  center  at  the  labor  time  recording  terminal  by  means  of  cost

center badges, buttons or lists.

Integration

This  function  package  can  only  be  used  if  HYDRA  is  used  for  personnel  time  management  (function

package Time and Labor Data Evaluation).

Features

  Cost center logging

o  Entry  of  cost  centers  at  PZE  terminal  via  selection  list,  bar  code  panel  or  cost  center

badges (depending on terminal type)

  Cost centers

o  Functions for the management and maintenance of available cost centers

  Printing of cost center badges

o  Print-out of cost center badges with bar codes to be read at the time recording terminal

  Maintenance of cost center posting

o  Possibility  to  correct  and  subsequently  enter  the  cost  center  data  contained  in  clocking

records.

PZW-KSB_82.docx

Version: 1.0.19468

Page 4 of 11

Cost Center Posting

2  Cost Centers

Summary

Menu

Master Data  Labor Time  Cost Centers

Transaction code

costc

Function authorization

costc

Cost centers may be edited in this dialog:

Field Descriptions

Company, cost center

Cost center and the corresponding company.

Designation

Detailed description of the cost center, which is displayed in result lists.

PZW-KSB_82.docx

Version: 1.0.19468

Page 5 of 11

Cost Center Posting

Payroll accounting – cost center

The entry in this field is used instead of the cost center if it is transferred to payroll accounting using

an interface. This field is not supported by all interfaces.

Payroll accounting – control indicator

This field is reserved for future enhancements and not used at the moment.

Further  information  on  the  subject  can  be  found  in  the  corresponding  document  dealing  with

cost center postings.

Toolbar

 Print cost center badges

Cost center badges are printed for all selected cost centers.

The  below  report  is  used  to  print  cost  center  badges  as  barcode  cards  to  be  able  to  enter  cost

centers at the terminal:

PZW-KSB_82.docx

Version: 1.0.19468

Page 6 of 11

Cost Center Posting

3  Cost Center Posting

Summary

The  additional  module  “cost  center  posting”  allows  for  a  cost  center  to  be  recorded  in  addition  to  the

clock-in  and  clock-out  times.  The  cost  center  is  entered  every  time  when  it  comes  to  a  clock-in  or  an

alternate  clocking.  If  no  cost  center  is  entered  the  system  posts  the  hours  worked  onto  the  employee’s

master cost center.

Consequently, it can be requested how much time has been posted onto the individual cost centers over

any  period  of  time.  Another  report  shows  how  much  time  an  employee  has  spent  on  the  different  cost

centers.

The times are divided by wage types, which makes it possible to calculate the amount with which the cost

center is to be charged.

Definition of cost centers

Cost centers are defined in the cost centers application.

Collection of cost centers at the terminal

There are different possibilities to enter the cost center at the terminal:

By cost center badges

In this context, a cost center badge is read in at the terminal before the clock-in is performed. The

corresponding  cost  center  is  displayed  and  entered  along  with  the  clock-in  that  follows.  This  cost

center will be charged until the next clock-in (with or without another cost center card) or clock-out

takes place.

By cost center buttons

With this option, one or several function keys of the terminal are assigned to a cost center. Before

clocking-in,  the  user  has  to  decide  on  which  cost  center  the  time  is  to  be  posted.  In  this  case  as

well, this cost center will be charged until the next clocking follows.

By a cost center list

With  this  option,  a  function  key  of  the  terminal  is  assigned  to  the  cost  center  list  function.  This

function key has to be selected prior to clocking-in. After posting using the staff badge, a list opens

that  includes  all  cost  centers  that  exist  for  the  employee’s  company.  The  employee  may  select  a

cost  center  from  the  list.  After  affirming  this  by  clicking  “OK”,  the  cost  center  is  posted  with  the

clocking. In this case as well, this cost center will be charged until the next clocking follows.

PZW-KSB_82.docx

Version: 1.0.19468

Page 7 of 11

Cost Center Posting

By terminal configuration

If  a  cost  center  is  entered  within  the  terminal  configuration,  all  clocking  records  performed  at  this

terminal will be posted on to the entered cost center. This cost center can be overridden by a cost

center entered at the terminal using the cost center badges, cost center buttons or cost center list.

In  the  basic  parameter  settings  of  PZE,  it  is  possible  to  automatically  interpret  several,

successive  clocking-ins  as  alternate  clockings.  In  this  context,  the  previous  clocking-in  is

automatically completed with a clocking-out.

Only terminals of the type series CT-36x, CT-37x and CT-38x support cost center lists.

Print Cost Center Badges

The cost centers application describes how cost center badges are printed.

Cost  center  badges  require  card  cases  that  are  wider  than  those  for  staff  badges.  The

corresponding perforated paper can also be purchased from MPDV.

Cost center badges can only be printed  if the corresponding company  and cost center  do not

include lower case letters. Upper case letters are allowed only.

PZW-KSB_82.docx

Version: 1.0.19468

Page 8 of 11

Configuration of a Cost Center Button

Cost center buttons are configured in the terminal configuration in the “HR functions” tab:

Cost Center Posting

By entering “KST”, the corresponding button is defined as cost center button. The cost center is defined

within the corresponding text. The designation of this cost center may be entered behind the cost center,

separated by  a blank. If a  comma is inserted between the cost center and  its designation  only the cost

center designation will be displayed on the function key and when cost centers are posted.

Cost center keys are only supported by terminals of the types series CT-36x, CT-37x and CT-

38x.

Configuration of a Cost Center List

The key for the cost center list  is also configured  within  the  terminal configuration in the “HR functions”

tab:

PZW-KSB_82.docx

Version: 1.0.19468

Page 9 of 11

Cost Center Posting

The entry “KSL” defines the corresponding key for the cost center list. The key labeling is defined within

the designation field.

Only terminals of the type series CT-36x, CT-37x and CT-38x support cost center lists.

PZW-KSB_82.docx

Version: 1.0.19468

Page 10 of 11

Cost Center Posting

Evaluations By Cost Centers

The wage type statistics dialog provides the “charged cost center” category.

A  list  showing  the  times  incurred  per  cost  center  is  displayed  by  grouping  the  “charged  cost  center”

column, for example.

The cost center in the “person” category is the person’s master cost center.

When the  wage  types statistics function  is configured, it  has to be  taken into account that the

time to be evaluated (e.g. the attendance time) is completely represented by the selected wage

types.  In  addition,  it  has  to  be  ensured  that  no  wage  data  is  used,  which  includes  the

corresponding time twice or several times.

PZW-KSB_82.docx

Version: 1.0.19468

Page 11 of 11

