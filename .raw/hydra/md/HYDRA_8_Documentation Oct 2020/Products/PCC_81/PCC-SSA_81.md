Manual

PCC module ARGBURG-SGM
via serial interface
PCC-SSA 8.1

Version 1.0.23049

Last changed on: 02.09.2020

PCC module ARGBURG-SGM via serial interface

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PCC-SSA_81.docx

Version: 1.0.23049

Page 2 of 4

PCC module ARGBURG-SGM via serial interface

Contents

1  Overview of the PCC-Module ARBURG-SGM via Serial Interface .............. 4

PCC-SSA_81.docx

Version: 1.0.23049

Page 3 of 4

PCC module ARGBURG-SGM via serial interface

1  Overview of the PCC-Module ARBURG-SGM via Serial

Interface

Possible fields of application

There  are  different  connection  options  to  establish  direct  communication  with  Arburg  machines.  The

Arburg  Selogica  protocol is supported,  among others, using serial interface. The PCC-SSA module  has

been  integrated  as  protocol  module  in  HYDRA-PCC  (Process  Communication  Controller).  Using  this

client, generally all data fields of machines provided by the protocol can be read out. This approach can

be used for data from the HYDRA modules

-

-

-

MDE - Machine Data Collection (counter, cycle, status)

PDV - Process Data Collection (process values)

DNC - Direct Numerical Control (setting values)

Implementation notes

The function package is used if you:

  want Arburg machines to communicate with HYDRA using the machine's server interface.

Integration

The protocol module has been integrated in HYDRA-PCC. Please also see the  documents dealing  with

the products SCS-PCP and SCS-PCB.

Functions

Communication  module  to  transfer  process  data  and  machine  data  from  the  control  of  an  ARBURG

injection  molding  machine  or  transfer  of  setting  parameters  (NC  data)  used  for  the  control  by  serial

interfaces; required once for each connected machine.

Prerequisite:  machines  have  been  equipped,  parameters  have  been  set  for  the  control  and  the  used

protocols are available according to MPDV's availability list.

PCC-SSA_81.docx

Version: 1.0.23049

Page 4 of 4

