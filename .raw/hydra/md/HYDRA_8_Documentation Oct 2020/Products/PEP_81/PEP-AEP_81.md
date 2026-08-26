Manual

Order-Dependent Workforce
Requirements
PEP-AEP 8.1

Version 1.0.4788

Last changed on: 19.06.2020

Order-Dependent Workforce Requirements

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PEP-AEP_81.docx

Version: 1.0.18468

Page 2 of 7

Order-Dependent Workforce Requirements

Contents

1  Order-Dependent Workforce Requirements - Overview .............................. 4

2  Workforce Requirements of Machine/Operator Relation ............................. 5

3  Workforce Requirements of Production Resources and Tools .................... 6

4  Priorities when Processing Workforce Requirements .................................. 7

PEP-AEP_81.docx

Version: 1.0.18468

Page 3 of 7

Order-Dependent Workforce Requirements

1  Order-Dependent Workforce Requirements - Overview

Purpose

This  function  package  contains  functions  to  define  the  personnel  requirement  for  order  setup  and

completion  per  operation.  If,  for  example,  the  personnel  requirement  is  dependent  on  the  article  to  be

manufactured, this function package allows the setup of the requirement per operation.

Implementation Considerations

Use this function package if:



the  personnel  requirement  at  a  workplace  is  not  constant,  but  depending  on  the  planned

operation.

Integration

Use  of  this  function  package  requires  function  package  Personnel  Scheduling  Administration  Functions

(PEP-VWF).

Features

  Personnel requirement in the machine / operator relation of the operations

o  Personnel  requirement  determination  based  on  the  co-worker  /  operator  relation  of  the

operation and the respective qualification

  Personnel requirement for production resources and tools

o  Alternative definition of personnel requirement through the operation's resource list

  Order duration transfer

o  Order duration transfer from HYDRA detailed scheduling tools (graphic planning / graphic

order sequencing in HYDRA-BDE)

PEP-AEP_81.docx

Version: 1.0.18468

Page 4 of 7

Order-Dependent Workforce Requirements

2  Workforce Requirements of Machine/Operator Relation

Summary

Workforce  requirements

for  setup  and  production  can  be  defined

for  operations  using

the

machine/operator relations for setup and production in the fields M/O relation production and M/O relation

setup  of  the  “processing”  tab.  An  entered  value  is  only  considered  staff  requirements  if  the  required

qualification is assigned in the “qualification” field.

Using the machine/operator relations for defining workforce requirements only allows the definition of one

qualification each for setup and for production. If several different qualifications are required for  setup or

for  processing  the  operation,  workforce  requirements  have  to  be  defined  using  the  list  of  production

resources and tools.

The two  qualification fields are  only  visible if the  license PZE-AEP (order-dependent  workforce

requirements) has been purchased.

PEP-AEP_81.docx

Version: 1.0.18468

Page 5 of 7

Order-Dependent Workforce Requirements

3  Workforce Requirements of Production Resources and Tools

Summary

Workforce requirements can be defined using  production resources and tools. The resource type “PRU”

defines the requirements for the setup of an operation. The resource type “PER” defines the requirements

for the production of an operation.

The  production  resources  and  tools  enable  configuration  of  several  requirements  with  different

qualifications for setup and production.

PEP-AEP_81.docx

Version: 1.0.18468

Page 6 of 7

Order-Dependent Workforce Requirements

4  Priorities when Processing Workforce Requirements

Summary

There are several options to define workforce requirements. The following priorities apply:

Priority

Workforce requirements

1

2

3

Workforce requirements of production resources and tools

Workforce requirements of the machine/operator relation of operations

Workforce requirements of workplaces

This  means,  for  example,  workforce  requirements  defined  for  a  workplace  will  only  be  processed  if  no

workforce  requirements  are  defined  in  the  production  resources  and  tools  and  the  machine/operator

relation for this operation.

PEP-AEP_81.docx

Version: 1.0.18468

Page 7 of 7

