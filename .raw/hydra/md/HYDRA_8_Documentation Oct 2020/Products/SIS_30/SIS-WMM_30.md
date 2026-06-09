Manual

Further MES Instances
SIS-WMM 3.0/3.1

Version 1.0.23049

Last changed on: 2 September 2020

Further MES Instances

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-WMM_30.docx

Version: 1.0.23049

Page 2 of 5

Further MES Instances

Contents

1  MES Weaver - Additional MES Instances .................................................... 4

SIS-WMM_30.docx

Version: 1.0.23049

Page 3 of 5

Further MES Instances

1  MES Weaver - Additional MES Instances

Purpose

A  HYDRA  instance  makes  it  possible  for  several  independent  HYDRA  systems  to  be  operated  on  the

same server.

Application scenarios for a separate HYDRA instance are:

o  Production system (instance 1) and test system (instance 2)

o  Systems divided up into separate instances based on special criteria, such as

- one instance per company

- one instance per plant

- one instance per time zone

Implementation considerations

It is possible to upgrade by adding an additional instance at any time, whereas the following requirements

must be considered:

-

-

-

The  server  must  have  sufficient  resources  (see  HYDRA  hardware/  software  recommendations)

The  server

is  not  available

for  a  certain  amount  of

time  during

installation

MPDV implementation performs the expansion by adding an additional HYDRA instance

Please refer to the hardware/ software recommendations mentioned above for more information

Integration

-

Features

o  Separate system settings for each instance or system

o  Multisystem-capable availability of all HYDRA modules

o  Data storage in logically separate databases

o  Data back-up capability for each system or instance

o  Separate time zone for each instance

SIS-WMM_30.docx

Version: 1.0.23049

Page 4 of 5

Further MES Instances

SIS-WMM_30.docx

Version: 1.0.23049

Page 5 of 5

