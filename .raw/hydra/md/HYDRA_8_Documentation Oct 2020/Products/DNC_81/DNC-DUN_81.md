Manual

Download/Upload Service
DNC-DUN 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Download/Upload Service

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

DNC-DUN_81.docx

Version: 1.0.23049

Page 2 of 5

Download/Upload Service

Contents

1  Download/Upload Service ............................................................................ 4

DNC-DUN_81.docx

Version: 1.0.23049

Page 3 of 5

Download/Upload Service

1  Download/Upload Service

Purpose

The DNC administration treats NC programs or setting data records as resources in the HYDRA system.

This  package  forms  the  basis  for  uploads  and  downloads.  A  terminal  client  is  required  to  control  the

function.

You use the function package when:

  You wish to transmit DNC records from HYDRA to the machine (download), or to transmit new or

optimized programs and setting data records from the machine to HYDRA (upload).

Integration

The DNC-PVW basic module is a precondition for the use of the functions. A terminal client is required to

operate  and  control  the  functions.  There  are  no  further  operating  functions  on  the  MOC  client.  The

changing of status is made possible by the DNC-MON package on the MOC.

The  HYDRA  process  communication  controller  (SCS-PCB)  and  the  corresponding  logging  modules

contained  in the MPDV compatibility  list must be licensed for communication  with the machines and for

transmission of the NC data records.

Features

Application  service  for  downloading  NC  files  to  machine  controllers  and  for  uploading  optimized  NC

programs from the machines to the HYDRA MES:

  Functions for editing the existing programs and assignment of status information (e.g. barring and

enabling NC programs).

  Assignment of the NC record to be transmitted by entering in the FHM list of the operation

  Assignment of the NC record to be transmitted by manual input of the DNC number

  Transfer of the NC data records to the BDE/DNC terminals

  Plausibility  check  with  automatic  restriction  by  assignment  of  the  NC  data  records  to  the

machines via the defined attributes

  Transfer of the NC data records from the BDE/DNC terminal to the machine controller (download

or loading function)

  Transfer  of  NC  data  records  which,  e.g.  for  optimization  reasons,  were  edited  in  the  machine

controller, incl. storage of the NC files in the BDE/ DNC terminal

  Recording of attributes for the transferred NC data record at the BDE/DNC terminal.

  Transfer of the NC data records from the BDE/DNC terminals to the HYDRA database

  Saving of the edited NC programs to the HYDRA database

DNC-DUN_81.docx

Version: 1.0.23049

Page 4 of 5

Download/Upload Service

DNC-DUN_81.docx

Version: 1.0.23049

Page 5 of 5

