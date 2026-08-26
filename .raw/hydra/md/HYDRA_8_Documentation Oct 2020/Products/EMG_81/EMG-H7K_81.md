Manual

HYDRA 7 Energy Management
Interfacing
EMG-H7K 8.1

Version 1.0.23049

Last changed on: 01.09.2020

HYDRA 7 Energy Management Interfacing

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-H7K_81.docx

Version: 1.0.23049

Page 2 of 5

HYDRA 7 Energy Management Interfacing

Contents

1  HYDRA 7 Energy management interfacing ................................................. 4

EMG-H7K_81.docx

Version: 1.0.23049

Page 3 of 5

1  HYDRA 7 Energy management interfacing

HYDRA 7 Energy Management Interfacing

Overview

Purpose

HYDRA  7  This  provides  the  required  BDE/MDE  data  from  the  HYDRA  7  system  for  selected  analysis

tools in HYDRA 8 EMG.

Implementation considerations

You use energy management interfacing if you:



intend to operate a HYDRA 8 EMG installation parallel to an existing HYDRA 7 (MW 2.1) solution

with BDE/MDE.

  wish  to  use  the  relevant  operation  data  and  recorded  MDE  data  from  the  HYDRA  7  system  for

evaluation  purposes  and  parameter  calculation  within  HYDRA  8  EMG  in  the  consumption

correlation and efficiency report (energy-related).

HYDRA 7 and HYDRA 8 use the same database system (ORACLE or Microsoft SQL Server).

The database system versions may be different.

Currently supported ORACLE versions:

  Oracle 9.2

  Oracle 10g

  Oracle 11g Release 2

Currently supported MS SQL server versions:

  Microsoft SQL Server 2000

  Microsoft SQL Server 2008

  Microsoft SQL Server 2008 R2

  Microsoft SQL Server 2012

Please note:

It is not possible to establish a connection from a Microsoft SQL Server 2012 to a Microsoft SQL Server

2000.

EMG-H7K_81.docx

Version: 1.0.23049

Page 4 of 5

HYDRA 7 Energy Management Interfacing

Integration

Energy management interfacing provides the ADE and MDE logs for the HYDRA 8 energy management

evaluations

  Consumption correlation

  Efficiency report (energy-related)

Features

The  BDE/MDE  data  recorded  in  HYDRA  7  that  are  relevant  for  evaluation  are  made  available  in  the

HYDRA 8 MOC analysis applications Consumption correlation and Efficiency report (energy-related).

The machine master data are not adopted from the HYDRA 7 system. These must be entered

manually in the HYDRA 8 EMG system.

The application "Consumption correlation"  provides the order  and operation  data of the  online

area.  Order  and  operation  data  contained  in  the  archive  tables  (long-term  data)  are  not

available  for  evaluation.  If  access  to  long-term  data  is  necessary,  it  is  possible  to  switch  to

"Long-term" by means of a specific HYDRA configuration. Evaluation of the data of the online

area will then no longer be possible.

EMG-H7K_81.docx

Version: 1.0.23049

Page 5 of 5

