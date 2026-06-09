Manual

OPC Server for Siemens
Controls
OPC-SSS 8.1

Version 1.0.23049

Last changed on: 02.09.2020

OPC Server for Siemens Controls

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

OPC-SSS_81.docx

Version: 1.0.23049

Page 2 of 5

OPC Server for Siemens Controls

Contents

1  Overview OPC Server for Siemens Controls ............................................... 4

OPC-SSS_81.docx

Version: 1.0.23049

Page 3 of 5

OPC Server for Siemens Controls

1  Overview OPC Server for Siemens Controls

Overview

In  the  world  of  automation  the  OPC  standard  has  spread  more  and  more  and  is  still  advancing  to

establish  a  direct  communication  with  machines.  For  further  information  on  OPC  (OLE  for  Process

Control),  please  refer  to  the  respective  documentation  or  the  website  of  the  OPC  foundation

http:\\www.opcfoundation.org.

Purpose

HYDRA provides an OPC server to connect Siemens controls to the HYDRA system.

This OPC server reads out the data fields of the Siemens control and provides the OPC client with it.

This approach can be used for data from the following HYDRA modules:

-

-

-

-

MDE - Machine Data Collection (counters/meters, cycle, status)

PDV - Process Data Collection (process values)

DNC - Direct Numerical Control (setting values)

Scale values

Implementation notes

In general, communication is based on the exchange of data using defined variables in the OPC server.

The variable contents of machines are provided as labeled data points/OPC items in the OPC server. The

OPC  client  connects  application  programs  with  these  variables.  Thus,  read  and  write  accesses  to  OPC

items  are  made  available  for  application  programs  in  a  specific  and  transparent  way.  The  OPC-DA

specification  in  version  2.0  defines  the  data  transport.For  further  details  on  which  data  points  can  be

provided by a specific control, please refer to the corresponding documentation about the control

in question.

Integration

The OPC server is installed on a data acquisition PC and/or terminal (Windows).

Please  note:  Further  components  might  be  required  if  used  with  a  control  by  Siemens,  (e.g.

communication module).

OPC-SSS_81.docx

Version: 1.0.23049

Page 4 of 5

OPC Server for Siemens Controls

Functions

Configurable OPC server to communicate  with S5/S7 controls transferring OPC  variables, e.g. machine

statuses, process data and meter readings.

OPC-SSS_81.docx

Version: 1.0.23049

Page 5 of 5

