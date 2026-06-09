Manual

Personnel Requirements
depending on Orders
HLS-APE 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Personnel Requirements depending on Orders

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-APE_82.docx

Version: 1.0.23049

Page 2 of 6

Personnel Requirements depending on Orders

Contents

1  Overview: personnel requirements depending on orders ............................ 4

2  Definition of Workforce Requirements ......................................................... 5

2.1  Workforce Requirements of the Machine/Operator Relation ................................ 5

2.2  Personnel requirements of production resources and tools ................................. 5

3  Priorities when processing workforce requirements .................................... 6

HLS-APE_82.docx

Version: 1.0.23049

Page 3 of 6

Personnel Requirements depending on Orders

1  Overview: personnel requirements depending on orders

Purpose

Use  this  function  package  to  define  for  each  operation  the  personnel  requirements  for  setting  up  and

producing  orders.  If,  for  example,  personnel  requirements  depend  on  the  item  to  be  manufactured,  this

function package enables you to configure the requirements for each operation.

Implementation notes

Use the function package if:

  personnel requirements for a workplace are not constant, but depend on the planned operation.

Integration

In  order  to  use  this  function  package,  you  require  the  function  package  Management  Functions  for

Personnel Scheduling.

Features

  Personnel requirements defined by the machine/operator relation of operations

o  The application identifies personnel requirements based on the machine/operator relation

defined for the operation and the assigned qualification.

  Personnel requirements of production resources and tools

o  The resource list defined for the operation can also specify the personnel requirements.

  Transfer of order run times

o  The application transfers order run times from the HYDRA detailed planning tools to define

personnel  requirements  (graphic  planning  /  graphic  order  sequencing  in  HYDRA-BDE;

separate license required).

HLS-APE_82.docx

Version: 1.0.23049

Page 4 of 6

Personnel Requirements depending on Orders

2  Definition of Workforce Requirements

2.1  Workforce Requirements of the Machine/Operator Relation

You can define workforce requirements for setup and production of operations using the machine/operator

relations for setup and production. You can define these requirements in the fields "M/O relation production"

and "M/O relation setup" in the “processing” tab. An entered value is only interpreted as staff requirement

if the required qualification is assigned in the “qualification” field.

If  you  use  the  machine/operator  relations  to  define  workforce  requirements,  you  can  only  specify  one

qualification each for setup and production. If several different qualifications are required for setup or for

processing the operation, you have to define the workforce requirements via the production resources and

tools list.

The two qualification fields are only visible if the license PEP-AEP (order-dependent identification

of workforce requirements) has been purchased.

2.2  Personnel requirements of production resources and tools

You

can

use

production

resources

and

tools

D:\live\svn\en\Functions\MOC\MOC_EditProdResources.pdfto  define  workforce

requirements.  The

resource type PRU defines the requirements for the setup of an operation. The resource type PER specifies

the requirements for the production of an operation. The field "resource" includes the number of the required

qualification and the field "required quantity" includes the personnel requirements. You do not have to enter

a unit for the required quantity.

The  production  resources  and  tools  enable  you  to  configure  several  requirements  with  different

qualifications for setup and production.

HLS-APE_82.docx

Version: 1.0.23049

Page 5 of 6

Personnel Requirements depending on Orders

3  Priorities when processing workforce requirements

There are several options to define workforce requirements. The following priorities apply:

Priority

Workforce requirements

1

2

3

Workforce requirements of production resources and tools

Workforce requirements of the machine/operator relation of operations

of
Workforce
workplaces..\..\functions\MOC\MOC_PersonnelRequirementOfWorkplaces.pdf

requirements

This  means,  personnel  requirements  defined  for  a  workplace  will  only  be  processed,  provided  that  the

production resources and tools and the machine/operator relations do not include staff requirements for the

operation.

HLS-APE_82.docx

Version: 1.0.23049

Page 6 of 6

