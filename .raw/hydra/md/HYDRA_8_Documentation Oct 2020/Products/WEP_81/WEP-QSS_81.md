Manual

qs-STAT Interface for WEP
WEP-QSS 8.1

Version 1.0.6563

Last changed on: 19.06.2020

qs-STAT Interface for WEP

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEP-QSS_81.docx

Version: 1.0.7567

Page 2 of 6

qs-STAT Interface for WEP

Contents

1  qs-STAT Data Export for WEP ..................................................................... 4

2  qs-STAT® Data Export ................................................................................ 5

Starting the Function ..................................................................................................... 5

Default Application Layout ............................................................................................. 5

Selection of the data set ................................................................................................ 6

Automatic start of qs-STAT® ......................................................................................... 6

WEP-QSS_81.docx

Version: 1.0.7567

Page 3 of 6

qs-STAT Interface for WEP

1  qs-STAT Data Export for WEP

Purpose

This  component  enables  the  export  of  inspection  data  in  the  qs-STAT  data  export  as  DFQ  file  format,

using comprehensive filter criteria.

Implementation notes

You  should  use  this  component  if  special  statistical  evaluations  are  required  and  the  external  software

"qs-STAT®" by Q-DAS has been installed.

Integration

This  component  is  based  on  the  quality  data  recorded  in  HYDRA  with  regard  to  the  variable  and

attributive inspection step characteristics.

Features

The following functions are available:

  Filtering of the existing data pool of in-production and goods issue inspections

  Automatic processing of filtered data for further processing in qs-STAT®

  Automatic start of qs-STAT with filtered and processed data

WEP-QSS_81.docx

Version: 1.0.7567

Page 4 of 6

qs-STAT Interface for WEP

2  qs-STAT® Data Export

Summary

This  document  describes  the  application  "qs-STAT®  data  export"  within  the  Manufacturing  Operation

Center (MOC).

Starting the Function

Menu

Quality management --> QM evaluation --> qs-STAT® data export

Transaction code

qsstat

Function authorization

qsstat.export

Default Application Layout

Utilization

This  application  allows  for  characteristics  (sample  data)  to  be  transferred  to  the  program  package  qs-

STAT® for further analysis. The amount of data selected can be restricted by a variety of filters based on

orders, available inspection plans, characteristics and samples.

Selection criteria

At least the fields

  Area type

  Area

have to be filled out to be able request data. An error message occurs if data is requested and these two

filter criteria are not filled out.

WEP-QSS_81.docx

Version: 1.0.7567

Page 5 of 6

qs-STAT Interface for WEP

If  the  checkbox  "summarize  characteristics"  is  checked,  all  inspection  results  matching  the  filter  criteria

are exported as "one characteristic" to qs-STAT®. This is also the case if HYDRA inspection results are

recorded based on several different characteristics.

The other filter criteria are not explained in detail here, as they are self-explanatory.

Selection of the data set

In  this  application  characteristics  can  generally  be  identified  either  by  the  OP  sequence  number  or  the

characteristic number.

If filtered by the OP sequence, a characteristic can be identified uniquely within an inspection plan. This

can  be  useful,  for  example,  even  if  an  inspection  plan  includes  several  characteristics  with  identical

characteristic number.

If  filtered  by  the  characteristic  number,  reports  can  also  be  started  if  the  number  and/or  order  of

characteristics has changed over several inspection plans.

Automatic start of qs-STAT®

The  user  has  to  make  sure  that  the  file  extension  is  connected  with  the  correct  program  to  start  the

relevant qs-STAT® program automatically after an export. If assistance is required Q-DAS (manufacturer

of qs-STAT®) has to be contacted.

WEP-QSS_81.docx

Version: 1.0.7567

Page 6 of 6

