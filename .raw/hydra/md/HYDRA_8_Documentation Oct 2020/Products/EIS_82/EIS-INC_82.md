Manual

DNC Import Interface
EIS-INC 8.2

Version 1.0.23049

Last changed on: 01.09.2020

DNC Import Interface

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EIS-INC_82.docx

Version: 1.0.23049

Page 2 of 4

DNC Import Interface

Contents

1

Import Interface DNC ................................................................................... 4

EIS-INC_82.docx

Version: 1.0.23049

Page 3 of 4

DNC Import Interface

1

Import Interface DNC

Summary

In  the  course  of  MES  implementation  different  master  data  need  to  be  created  within  MES.  This  may

affect, to some extent, large datasets that cannot be edited manually or that require additional efforts to

do so.

For  this  reason,  master  data  can  be  transferred  automatically  from  external  systems.  The  information

required  for  the  master  data  transfer  is  described  in  the  documentation  dealing  with  the  EIS-SDF

interface.

Moreover, data may be exchanged automatically if CAD systems are connected. Further information on

this interface is described in the EIS-CAD documentation.

Functions

Enterprise  Integration  Service  to  transfer  NC  programs  and  setting  data  from  external  programming

systems  by  using  HYDRA  standard  interfaces,  such  as  EIS-SDF  (master  data  transfer  from  external

systems) or EIS-CAD (interface to CAD systems).

Please  note:  A  transfer  concept  needs  to  be  defined  and  the  relevant  transfer  procedures  have  to  be

customized to implement this function for customers. The involved services for concept, customizing and

implementation are not covered by the license.

EIS-INC_82.docx

Version: 1.0.23049

Page 4 of 4

