Manual

Interface qs-STAT for FEP
FEP-QSS 8.1

Version 1.0.1373

Last changed on 19.06.2020

 Interface qs-STAT for FEPInterface qs-STAT for FEP

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Distribution or reproduction of this document, either in whole or in part, without the express written permission of MPDV, is strictly
prohibited, irrespective of the purpose or in what form.

Information contained in this documentation may be changed or amended without notice.

FEP-QSS_81.docx

Version: 1.0.6249

Page 2 of 6

 Interface qs-STAT for FEPInterface qs-STAT for FEP

Contents

1

Interface qs-STAT for FEP ........................................................................... 4

2  Qs-STAT® data export ................................................................................. 5

Function activation ......................................................... Error! Bookmark not defined.

Application default layout................................................ Error! Bookmark not defined.

Selection of data volume ............................................................................................... 6

Automatic activation of qs-STAT® ................................................................................. 6

FEP-QSS_81.docx

Version: 1.0.6249

Page 3 of 6

 Interface qs-STAT for FEPInterface qs-STAT for FEP

1

Interface qs-STAT for FEP

Purpose

This  component  enables  you  to  export  inspection  data  in  the  qs-STAT  data  export  as  DFQ  file  format,

using comprehensive filter criteria.

Implementation notes

You  use  this  component  if  special  statistical  evaluations  are  required  and  the  third-party  software  "qs-

STAT®" by Q-DAS has been installed.

Integration

The  basis  for  this  component  is  the  quality  data  recorded  in  HYDRA  with  regard  to  the  variable  and

attributive inspection step characteristics.

Features

The following functions are available:

  Filtering of the existing data pool of in-production and goods issue inspections

  Automatic processing of filtered data for further processing in qs-STAT®

  Automatic start of qs-STAT with filtered and processed data

FEP-QSS_81.docx

Version: 1.0.6249

Page 4 of 6

 Interface qs-STAT for FEPInterface qs-STAT for FEP

2  Qs-STAT® data export

Overview

This document describes the "qs-STAT® Data Export" application in the Manufacturing Operation Center

(MOC).

Starting the function

Menu

Quality management  QM evaluation  qs-STAT® Data Export

Transaction code

qsstat

Function authorization

qsstat.export

Default application layout

Usage

This  application  enables  characteristics  (sample  data)  to  be  transferred  to  the  program  package  qs-

STAT® for further analysis. The selection can be limited using numerous filters based on the orders, the

underlying inspection plans, characteristics and samples.

Selection criteria

For requesting the data, the fields

  Area type

  Area

must  be  filled  as  a  minimum  requirement.  If  data  are  requested  without  these  two  filter  criteria  being

specified, an error message will occur.

FEP-QSS_81.docx

Version: 1.0.6249

Page 5 of 6

 Interface qs-STAT for FEPInterface qs-STAT for FEP

If  the  checkbox  "Summarize  characteristics"  is  checked,  all  inspection  results  matching  the  filter  criteria

are  exported  to  qs-STAT®  as  "one  characteristic".  This  is  also  the  case  if  the  inspection  results  were

recorded for multiple different characteristics in HYDRA.

A detailed description of the other filter criteria is not included here, as they are self-explanatory.

Selection of data volume

In  general,  a  characteristic  in  this  evaluation  can  be  identified  via  the  operation  sequence  number  (OP

sequ. no.) or the characteristic number.

If  you  filter  by  the  OP  sequence,  a  characteristic  can  be  identified  unambiguously  within  an  inspection

plan.  This  can  make  sense  if,  for  example,  several  characteristics  with  identical  characteristic  number

appear within an inspection plan.

If  filtered  by  the  characteristic  number,  reports  can  also  be  started  if  the  number  and/or  sequence  of

characteristics has changed across several inspection plans

Automatic start of qs-STAT®

The  user  has  to  ensure  that  the  file  extension  is  linked  with  the  correct  program  to  start  the  qs-STAT®

program automatically after an export. If assistance is required,  you must contact Q-DAS (manufacturer

of qs-STAT®).

FEP-QSS_81.docx

Version: 1.0.6249

Page 6 of 6

