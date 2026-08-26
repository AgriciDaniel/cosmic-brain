Manual

Alternative Data Collection
Methods
BDE-AEV 8.2

Version 1.2.23049

Last changed on: 01.09.2020

Alternative Data Collection Methods

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-AEV_82.docx

Version: 1.2.23049

Page 2 of 5

Alternative Data Collection Methods

Contents

1  Overview of Alternative Methods for Data Collection ................................... 4

BDE-AEV_82.docx

Version: 1.2.23049

Page 3 of 5

Alternative Data Collection Methods

1  Overview of Alternative Methods for Data Collection

Purpose

The  component  alternative  data  collection  methods  provides  basic  functions  that  allow  you  to  execute

posting rules deviating from the ones provided in the standard delivery or that make it possible to enter

and post other order-related performances/activities other than quantities and times.

Examples of application scenarios

  Orders have very few units but a very long run time (e.g. 3 units, duration 4 weeks; estimated net time

approx. 40 hrs).

The customer would like to log the OP on and off in order to identify the OP's status. However, there

are many active OPs in the workshop, yet that does not reveal which one is being actively processed.

For example, the time used is entered once a week by the supervisor. In addition, it would also be a

nice option if, regardless of the time used, it were possible to enter the remaining working time (this

example can also be transferred very well to a maintenance solution).

  Furthermore, in many projects the task is to "simply" enter a specific value and upload it to the higher-

level system without this involving any other processing operations in HYDRA.

  Sometimes what is required is that the relevant number of employees involved must be posted, rather

than  logging  people  on  and  off  individually.  Labor  utilization  is  then  the  result  of  multiplying  the

duration  recorded  by  this  number  of  persons.  (This  often  also  involves  the  works  council,  which

makes this requirement in these kinds of projects particularly important.)

  Often, what is required is that additional data is entered beyond the typical data entry variables such

as quantities and times. Example: Power consumption

Implementation notes

You use the function package if:

  You  have  activities  (operations)  or  workplaces,  where  time  use  cannot  be  determined  by

calculating  the  difference  between  operation  logon  and  logoff,  but  instead  must  be  entered

separately.

  For a specific order, you want to enter and post other order/operation-related activities other than

quantities produced and times used.

BDE-AEV_82.docx

Version: 1.2.23049

Page 4 of 5

Alternative Data Collection Methods

Integration

The basic functions included in this component are used to enter and post activities from the server. They

do  not  provide  any  visual  functions.  The  modifications  needed  for  this  at  the  shop  floor  client  (e.g.

terminal) must be considered separately.

If  additional  activities  entered  should  also  be  uploaded  to  a  higher-level  system,  then  you  have  to

configure the interface separately. Additionally entered activities are not available for evaluation in MOC

at this time.

Features

Basic functions for processing different data collection methods in the BDE environment:

  Time event-related entry and based on it, the calculation of the time to be posted.

  Time-ticket-based entries

  Combination of the two entry types

  Automatic  calculation  from  other  variables,  e.g.  calculation  of  labor  utilization  from  duration  x

explicitly entered number of persons

  Order-related  posting  of  consumption  data  entered  (e.g.  consumption  of  power,  water,  energy,

supplies ...)

Please  note:  Adding  and  coordinating  the  specific  requirements  and  implementing  them  are

considered a customized HYDRA service (a service subject to an added charge).

BDE-AEV_82.docx

Version: 1.2.23049

Page 5 of 5

