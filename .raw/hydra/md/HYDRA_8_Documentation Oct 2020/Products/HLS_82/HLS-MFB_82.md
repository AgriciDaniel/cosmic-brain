Manual

Multiple Assignment of
Resources
HLS-MFB 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Multiple Assignment of Resources

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Multiple Assignment of Resources

Version: 1.1.23049

Page 2 of 6

Multiple Assignment of Resources

Contents

1  Overview: Multiple Assignment of Resources .............................................. 4

2  Configuration Multiple Assignment of Resources ........................................ 5

Multiple Assignment of Resources

Version: 1.1.23049

Page 3 of 6

Multiple Assignment of Resources

1

 Overview: Multiple Assignment of Resources

Purpose

In  the  HYDRA  Shop  Floor  Scheduling  module  the  capacity  check  and  automatic  assignment  function

assume that only 1 order/operation may run at the same time. In case of a manual multiple assignment, a

dialog  informs  the  user  about  the  double  assignment;  automatic  assignment  always  assumes  single

assignment.

Different  workplaces  or  machines  provide  the  ability  for  operations  to  be  multiply  assigned  (parallel

assignment). Examples for this are pallet machines, furnaces, assembly workplaces.

Due to different requirements, the scope of available multiple assignment options can certainly vary. For

example, a pallet machine has the capability  of processing five orders at the same time, while  where  a

furnace is concerned, the assignment may depend on the size of the items to be processed. At assembly

workplaces,  the  utilization  and  assignment may  depend  on  the  dimensions  of  the  parts/  products  being

assembled.

You  make  use  of  this  function  package,  if  these  kinds  of  application  scenarios  are  found  in  your

production and they need to be accounted for planning in the HYDRA Shop Floor Scheduling module.

Integration

The results of planning are shown in the order sequencing list of the shop floor terminal.

Features

  Function  supporting  a  (parallel)  multiple  assignment  of  workplaces/  machines  (e.g.  furnaces,

assembly workplaces) in the graphic planning board of HYDRA Shop Floor Scheduling.

  Definition of the workplace/ machine-related availability (available capacities)

  Calculation of requirements based on factors defined for the operation, such as required space

Multiple Assignment of Resources

Version: 1.1.23049

Page 4 of 6

Multiple Assignment of Resources

2  Configuration Multiple Assignment of Resources

Overview

The  planning  component  within  HYDRA  shop  floor  terminal  is  currently  based  on  the  assumption  of  no

shift-free  times  with  a  fixed  availability  of  1000  at  any  one  workplace.  An  operation's  requirement  is

currently also set fix at 1000. So, when an operation is assigned, the availability of the workplace is used

up entirely (availability 1000 - requirement 1000 = availability 0).

To allow for greater flexibility within the HYDRA shop floor terminal, the availability can now be changed

on one side and the requirement can be changed on the other side.

Described below are the steps with which to activate multiple assignments in HYDRA shop floor terminal.

Workplace availability

At the workplace (workplace/ machine configuration, index tab HLS), availability is defined in one field.

The valid range of values for the availability field is between 1000-99999.

Configuration for defining the requirement

Configuring the order type

The requirement is defined via the operation. To assure the highest possible flexibility, a formula can be

defined at the operation that is then used to calculate the requirement for an operation. The reference to a

formula for this is defined to one of the operation's user fields so that the customer can transfer it via the

interface. Which particular user field contains the reference to the formula is defined by specific order type

(order type configuration). The formula itself is defined in HYDRA in formula management.

The formula defined in the operation's specified user field calculates its requirement. Possible values for

the user field are 45-66.

Creating a formula

The formula is defined in HYDRA formula management that is meant to calculate the requirement for the

operation.

Currently,  the  following  user  fields  can  be  used  in  a  formula  to  calculate  the  requirement:  ANR.FU:23,

ANR.FU:24, ANR.FU:25, ANR.FU:26, ANR.FU:27, ANR.FU:28.

Configuring user fields

Depending on the formula, the user fields used must be added to the operation.

Multiple Assignment of Resources

Version: 1.1.23049

Page 5 of 6

Multiple Assignment of Resources

In  this  example,  the  formula  is  stored  in  user  field  45  (see  configuring  order  types).  Now  user  field  45

must be configured for the operation.

User fields 23 and 24 are used in the formula "REQUIREMENT", i.e. these must also be configured at the

OP.

Defining the requirement at the operation

The values defined at the operation are used to determine the requirements.

If  no  formula  is  defined  at  the  operation,  a  requirement  of  1000  is  assumed.  This  is  the  simplest  of

scenarios, because with it, multiple assignments can be defined based on the number of operations. For

this purpose, a multiple of 1000 is defined as availability. The operation displayed above would have an

requirement of 2000.

Multiple Assignment of Resources

Version: 1.1.23049

Page 6 of 6

