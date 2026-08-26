Manual

Advanced Terminal Functions
AIP-EBM 8.1

Version 1.1.23049

Last changed on: 01.09.2020

Advanced Terminal Functions

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-EBM_81.docx

Version: 1.1.23049

Page 2 of 5

Advanced Terminal Functions

Contents

1  Advanced Terminal Functions ...................................................................... 4

AIP-EBM_81.docx

Version: 1.1.23049

Page 3 of 5

Advanced Terminal Functions

1  Advanced Terminal Functions

Purpose

You  use  this  functions  package  is  you  need  to  configure  data  entry  via  AIP  for  specific  application

scenarios.

Integration

This function can be used integrated in the BDE, MDE (note the details below about automatic quantity

input), MPL and WRM products to enter data at AIP.

Features

The  analysis  of  specific  requirements  and  the  illustration  of  the  processes  are  a  special

customizing  service  that  is  offered  for  an  additional  charge.  In  order  to  be  able  to  use  the

functions described, you must request this added service.

  The ability to assign a HYDRA machine to more than one terminal

  The capability of synchronizing manual posting between the terminals with the same machine so that

current postings can be viewed at all logically connected devices:

Example:  An  order  was  logged  onto  machine  24  (terminal  1).  After  the  function  was  activated,  the

order is also immediately "visible" on machine 24 at terminal 2.

  The ability to create an option with which to perform postings that belong to one machine at different

terminals, for example, if, because of the long travel paths, there are several of them placed on a line,

but in BDE/ MDE they are logically assigned to one machine

  Considering  the  data  quantities  and  performance  capabilities  of  the  devices,  terminals  can  be

configured so that more than 16 machines (= normally the upper limit) are assigned to one terminal.

Checklist: Which functions should especially be considered

  When  assigning  multiple  terminals  to  one  machine,  the  number  of  terminals  should  be  kept  to  a

minimum:  Communication  between  terminals  increases  significantly  and  in  some  cases  may

adversely impact the availability of the terminals.

  During an automatic entry of quantities, automatic quantities may only be entered through exactly one

of the terminals.

  The list of logged on batches at AIP is not a part of the AIP-EBM synchronization function.

  The posting volume and how often data are posted at the terminals, especially during a shift change,

must be considered: In a worst-case scenario, there may be problems with the synchronization, which

might result in incorrect postings.

AIP-EBM_81.docx

Version: 1.1.23049

Page 4 of 5

Advanced Terminal Functions

  The number of machines per terminal must be accounted for based on the posting volume, the data

volume and the performance capabilities of the terminal hardware.

Too  many  postings  may,  in  some  cases,  result  in  conflicts  during  operation  and  if  there  are  any

network failures, this will result in longer waiting periods until the local queues have been emptied.

  The maximum number of machines per terminal is limited to 32 (technical limit).

  Customer  specific  adjustments  are  by  default  not  compatible  with  AIP-EPM.  In  any  case,  they  will

need to be reviewed in terms of whether AIP-EBM can be used.

AIP-EBM_81.docx

Version: 1.1.23049

Page 5 of 5

