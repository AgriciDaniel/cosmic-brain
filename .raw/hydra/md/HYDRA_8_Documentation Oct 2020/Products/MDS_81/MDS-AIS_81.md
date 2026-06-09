Manual

MES Development Suite
Acquisition & Information
MDS-AIS 8.1

Version 1.4.23049

Last changed on: 01.09.2020

  MES Development Suite Acquisition & Information

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDS-AIS_81.docx

Version: 1.4.23049

Page 2 of 7

  MES Development Suite Acquisition & Information

Contents

1  General overview ......................................................................................... 4

1.1  MDS-AIS features ............................................................................................... 4

2  Overview – AIP2 .......................................................................................... 5

2.1  Features .............................................................................................................. 5

3  Overview – AIP / CTWIN .............................................................................. 6

3.1  Features .............................................................................................................. 6

4  Overview – Server ........................................................................................ 7

4.1  Features .............................................................................................................. 7

MDS-AIS_81.docx

Version: 1.4.23049

Page 3 of 7

  MES Development Suite Acquisition & Information

1  General overview

1.1  MDS-AIS features

The  MES  Development  Suite  Business  Applications  &  Services  is  a  function  package  of  the  MES

Development  Suite  version  8.1  to  customize  functions  around  the  Acquisition  Information  Panels  (AIP)

and further processing on the server

  You can implement customized booking procedures and validation checks after data input on the

shop floor terminals AIP2 and the older terminals AIP and CTWIN.

  You  can  customize  the  processing  functions  of  the  AIP  (e.g.  new  fields,  dependencies,  new

dialogs, display of information in lists).

  You  can  implement  dynamic  actions  via  scripting  on  the  current  shop  floor  client  AIP2  and  the

older clients AIP and CTWIN.

  You can implement customized dialogs and dialog control on the shop floor terminals.

  You can change the processing of the server for different processing steps using many specified

user exits.

The range of available functions is so extensive that it is not useful to discuss all subjects in one product

documentation. The product documentation therefore contains several documents:

Document

MDS-AIS_81

Content

This  document  only  provides  an  overview  of  the  range  of  functions.

Detailed  information  on  the  single  subjects  is  included  in  the  separate

documents listed below.

MDS-AIS_81_AIP2

This document describes how to implement extensions and customizations

of the processing in the shop floor client AIP2.

MDS-AIS_81_AIP_CTWIN

This document describes how to implement extensions and customizations

of the processing in the older shop floor clients AIP and CTWIN.

MDS-AIS_81_Server

This document describes how to implement extensions and customizations

of the processing in the server.

For detailed information, please refer to the documents listed.

MDS-AIS_81.docx

Version: 1.4.23049

Page 4 of 7

  MES Development Suite Acquisition & Information

2  Overview – AIP2

2.1  Features

You can use the MES Development Suite to change and extend the data collection and the data display

on the shop floor client AIP2.

The  document  MDS-AIS_81_AIP2  describes  the  functions  that  the  MES  Development  Suite  Business

Applications  &  Services  provides  to  change  and  extend  the  data  collection  and  the  data  display  on  the

shop floor client AIP2.

  Using configuration files, you can change the layout displayed on the shop floor client AIP2. The

configuration files are available as XML or INI files depending on intended use.

  Using the dialog configuration on the MOC, you can change and define the dialogs and workflows

to enter and display data.

  For  the  data  collection  via  dynamic  dialogs,  you  can  use  the  user  exits  provided  to  implement

dynamic  actions.  The  user  exits  are  implemented  in  a  script  language.  The  script  language  is

similar to the programming language Visual Basic and easy to learn.

  Also  for  the  configured  GUI  (tile  GUI),  user  exits  are  provided  that  you  can  use  to  implement

dynamic  behavior.  The  user  exits  of  the  tile  GUI  are  implemented  in  the  script  language

PasScript. The script language is similar to the programming language Pascal and easy to learn.

  Using  deployment  mechanisms,  you  can  automatically  deploy

the  customer-specific

configurations and user exits to the shop floor clients.

The document MDS-AIS_81_AIP2 is the reference manual of the functions provided. To learn all about

the  MES  Development  Suite  Business  Applications  &  Services,  MPDV  offers  specific  trainings.  MPDV

recommends to attend this training to be able to successfully use this product.

MDS-AIS_81.docx

Version: 1.4.23049

Page 5 of 7

  MES Development Suite Acquisition & Information

3  Overview – AIP / CTWIN

3.1  Features

You can use the MES Development Suite to change and extend the data collection and the data display

on the shop floor clients AIP and CTWIN.

The  document  MDS-AIS_81_AIP_CTWIN  describes  the  functions  that  the  MES  Development  Suite

Business Applications & Services provides to change and extend the data collection and the data display

on the shop floor client AIP or CTWIN.

  Using  configuration  files,  you  can  change  the  layout  of  the  shop  floor  client  AIP/CTWIN.  The

configuration files are available as INI files.

  Using the dialog configuration on the MOC, you can change and define the dialogs and workflows

to enter and display data.

  The shop floor clients AIP and CTWIN provide user exits that you can use to implement dynamic

actions  in  the  data  collection.  The  user  exits  are  implemented  in  a  script  language.  The  script

language is similar to the programming language Visual Basic and easy to learn.

  Using  deployment  mechanisms,  you  can  automatically  deploy

the  customer-specific

configurations and user exits to the shop floor clients.

The document MDS-AIS_81_AIP_CTWIN is the reference manual of the functions provided. To learn all

about  the  MES  Development  Suite  Business  Applications  &  Services,  MPDV  offers  specific  trainings.

MPDV recommends to attend this training to be able to successfully use this product.

MDS-AIS_81.docx

Version: 1.4.23049

Page 6 of 7

  MES Development Suite Acquisition & Information

4  Overview – Server

4.1  Features

You can use the MES Development Suite (MDS) to change and extend the server functions of the data

collection. You can also use user exits to intervene in the processing of the standard at other predefined

points.

The document MDS-AIS_81_Server describes the functions that the MES Development Suite Business

Applications  &  Services  provides  to  change  and  extend  the  processing  in  the  server  according  to  your

requirements.

To  make  changes  in  the  server,  the  performant  script  language  "HYDRA  script"  is  available.  HYDRA

script is easy to learn and is optimized to match the functions required in the system environment of the

server. To access the database, you use the query language SQL.

  You  can  extend  the  standard  processing  and  add  additional  processing  steps,  e.g.  additional

validation checks or data.

  You can extend the HYDRA database and include own objects.

  You  can  create  own  server  commands  (PDM  dialogs)  to  record  and  change  data  (so-called

BAPIs).

  You can create  your own lists that  you can use to display data on the shop floor terminal or as

selection list.

  You  can  not  only  change  the  data  collection  using  the  MES  Development  Suite  Business

Applications & Services, but you can also use the specified user exits in other parts of the server

software.  Examples:  Customization  of  the  labor  time  calculation  of  the  PZW  or  generation  of

manual editing options for order-related BDE postings on the MOC.

The document MDS-AIS_81_Server is the reference manual of the functions provided. To learn all about

the  MES  Development  Suite  Business  Applications  &  Services,  MPDV  offers  specific  trainings.  MPDV

recommends to attend this training to be able to successfully use this product.

MDS-AIS_81.docx

Version: 1.4.23049

Page 7 of 7

