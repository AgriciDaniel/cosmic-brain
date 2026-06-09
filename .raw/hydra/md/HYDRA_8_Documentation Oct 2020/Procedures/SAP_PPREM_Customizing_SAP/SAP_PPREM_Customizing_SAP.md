Application-Relevant Settings in SAP

1  Application-Relevant Settings in SAP

Define production scheduler

Scheduling  settings  for  planned  orders  are  defined  for  each  plant/order  type  and  production  scheduler.

The  production  scheduler  can  be  edited  as  a  part  of  the  customizing  in  SPRO    Production  

Production control  master data  routing data  define production scheduler (OPJ8).

Configure scheduling parameters

Scheduling options can  now be configured for  planned orders  by  the production scheduler. This is  also

performed in customizing using SPRO Production  capacity planning  master data  operations 

scheduling  define scheduling parameters for planned orders (OPU5).

If  the  scheduling  level  “by  detailed  scheduling”  is  configured  there  operations  will  also  be  transferred

when downloading planned orders.

Configure serial production profile

The  serial  production  profile  defines  how  uploads  are  to  be  performed  (counting  point  upload/post

services…). This is configured in customizing using SPRO  Production  serial production  control 

define serial production profiles.

Definition of user fields

Selected  user  fields  of  the  work  plan/operation  are  transferred  from  SAP  by  the  PP-REM  interface.

HYDRA provides a default interpretation for these fields. A user field key has to be defined and saved for

the operation within the work plan to be able to define values in user fields in SAP.

User field keys are defined in customizing using SPRO  production  production control  master data

 work plan data define user fields (OPEC).

A meaning is to be defined for the following user fields:

SAP user field

SAP user field in the download

Meaning

USR04

USR01

structure

USR04

USR05

Partitioning

Target cycle

SAP_PPREM_Customizing_SAP.docx

Version: 1.0.1362

Page 1 of 3

Application-Relevant Settings in SAP

The created user field key and corresponding values are to be defined for the operation within the routing.

Maintenance of the SAP partner agreement/profile – outbound

Maintain the following settings for outbound processing of the SAP partner agreement/profile (WE20):

Parameter name

Value

To download production orders

Partner number

Created logical system

Partner type

Message type

Recipient port

Package size

Output mode

Basis type

LS

LOIPLO

Created port

1

Transfer IDoc immediately

LOIPLO01

Maintenance of the SAP distribution model – outbound

Parameter name

Value

To download planned orders

Model view

Sender / client

Recipient/erver

Message type

Created model view

Logical system of the client

Logical system for the recipient system

LOIPLO

SAP_PPREM_Customizing_SAP.docx

Version: 1.0.1362

Page 2 of 3

Application-Relevant Settings in SAP

Hide unnecessary segments

If specific segments of the IDoc are not to be transferred (e.g. the segment for the components is not to

be transferred as they are only transferred in relation to the header) this can be realized as a part of the

customizing using the transaction BD56.

However, the SAP partner agreement/profile has to be maintained to be able to use this configuration.

IDoc enhancement

SAP standard provides the option to enhance the IDoc by customer-specific data without modification:

Enhancement

LOI00001

User exit

EXIT_SAPLLOI1_001

Planning of relevant jobs

The following programs/ reports must be planned as job to ensure that the PP-REM interface will operate

automatically:

Program / report

Meaning

Note

RCCLTRAN

Start of the download for planned

Planning as variant

orders according to the selection

Relevant transactions

Transaction

Meaning

Note

POIT

Start of the download for planned

-

orders

SAP_PPREM_Customizing_SAP.docx

Version: 1.0.1362

Page 3 of 3

