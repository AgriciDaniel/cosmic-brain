Application-Relevant Settings in SAP

1  Application-Relevant Settings in SAP

Customizing the order type

In SAP the PP-PDC interface will only take those production orders into account, for which the order
type  has  been  marked  as  “BDE  active”.  This  is  specified  in  Customizing  SPRO    Production  
Production control Master data Order Order type dependent parameters (OPL8).

For each relevant combination of plant and order type, the indicator “BDE active” must be set on the
“realization” tab.

Definition of new subsystem groupings

To the extent that the subsystem groupings included in the SAP delivery do not suffice, it is possible to
define  new  one  using  SAP  Customizing  -  SPRO    Labor  time  management    Shop  floor  data
collection  General settings  Groupings for subsystem connection.

Maintenance at the workplace

Once an order type is identified as "BDE active", the PP-PDC interface will only take those operations
into account, for which at least one subsystem grouping is stored to the workplace.

The subsystem grouping at the workplace is maintained using the workplace maintenance (CR02)  
Basic  data    Subsystems.  There,  the  relevant  subsystem  can  be  selected  from  several  stored
subsystems.

Setting of the posting time

Depending on the settings in SAP, the PP-PDC interface supports two confirmation/upload scenarios:



Immediate posting

If  the  "Immediate  posting"  indicator  is  active  in  Customizing  (CI41),  time  ticket  uploads
transferred from HYDRA to SAP will immediately be posted. If this posting cannot be made - if
for  example  a  production  order  is  being  blocked  -  the  confirmations/uploads  will  stay  pre-
posted and will be posted during the next posting run.

  Posting using job

If the "Immediate posting” indicator is not set in Customizing (CI41), the confirmations/uploads
will be pre-posted (AFRP0 table). They will then be posted later depending on the job, using
Job CORUPROC1.

Definition of user fields

The  PP-PDC  interface  can  be  used  to  transfer  selected  user  fields  of  the  work  plan/  operation  from
SAP. HYDRA offers default interpretations for these fields. In order to enable the values to be stored
to the user fields in SAP, a user field key must be defined and saved to the operation's work plan.

The user field key is defined in Customizing via SPRO  Production  Production control  Master
data Work plan data User field definition (OPEC).

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 1 of 6

Application-Relevant Settings in SAP

A meaning must be saved for the following user fields:

SAP user field

SAP user field in the download
structure

Meaning

USR00

USR01

USR04

USERFIELD_CH20_1

Target cycle

USERFIELD_CH20_2

Te/ tr

USERFIELD_QUAN

Partitioning

The created user field key and the corresponding values must be stored to the operation's work plan.

Maintenance of the SAP partner agreement – outbound processing

Maintain the following settings for outbound processing in the partner agreement in SAP (WE20)

Parameter name

Value

To download the production orders

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

PPCC2RECORDER

Created port

1

Transmit IDoc immediately

PPCC2RECORDER

To download the upload request

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

To download the workplaces

Partner number

Partner type

LS

PPCC2REQCONF

Created port

1

Transmit IDoc immediately

PPCC2REQCONF01

Created logical system

LS

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 2 of 6

Parameter name

Value

Application-Relevant Settings in SAP

Message type

Receiver port

Package size

Output mode

Basis type

PPCC2RECWORKCENTER

Created port

1

Transmit IDoc immediately

PPCC2RECWORKCENTER01

To download the variances

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

DIFFE2

Created port

1

Transmit IDoc immediately

DIFFE2

To download generally applicable quantity units

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

UNIT2

Created port

1

Transmit IDoc immediately

UNIT2

To download material-dependent quantity units

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

LS

UNIMA2

Created port

1

Transmit IDoc immediately

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 3 of 6

Parameter name

Basis type

Value

UNIMA2

Application-Relevant Settings in SAP

Maintenance of the SAP partner agreement – inbound processing

Maintain the following settings for inbound processing in the partner agreement in SAP (WE20)

Parameter name

Value

Partner number

Partner type

Message type

Transaction code

Created logical system

LS

PPCC2PRETTICKET

BAPI

Maintenance of the SAP distribution model - outbound processing

Parameter name

Value

To download the production orders

Model view

Sender/ client

Recipient/ server

Created model view

Logical system of the client

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

Filter

To download the upload request

Model view

Sender/ client

ReceiveProdOrder

If  necessary,  maintain  the  BDE  grouping  as  filter
criterion

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

RequestProdOrdConf

To download the workplaces

Model view

Sender/ client

Created model view

Logical system of the client

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 4 of 6

Application-Relevant Settings in SAP

Parameter name

Recipient/ server

Value

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

Filter

To download the variances

Model view

Sender/ client

Recipient/ server

Message type

To download generally applicable quantity units

Model view

Sender/ client

Recipient/ server

Message type

To download material-dependent quantity units

Model view

Sender/ client

Recipient/ server

Message type

ReceiveWorkCenter

If  necessary,  maintain  the  BDE  grouping  as  filter
criterion

Created model view

Logical system of the client

Logical system for the recipient system

DIFFE2

Created model view

Logical system of the client

Logical system for the recipient system

UNIT2

Created model view

Logical system of the client

Logical system for the recipient system

UNIMA2

Maintenance of the SAP distribution model - inbound processing

Parameter name

Value

To upload time tickets

Model view

Sender/ client

Created model view

Logical system for the sender system

Recipient/ server

Logical system of the client

Object name/ interface

ProdOrdConfirmation

Method

CreatePredefTimeTicketMultiple

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 5 of 6

Application-Relevant Settings in SAP

Parameter name

Value

Filter

If  necessary,  maintain  the  BDE  grouping  as  filter
criterion

Planning of relevant jobs

The  following  programs/  reports  must  be  planned  as  job  to  ensure  that  the  PP-PDC  interface  will
operate automatically:

Program/ report

Meaning

Please note:

CIBDOP_DOWN_PP

Download  production  orders/
operations

Planning of a variant WITHOUT
indication of a target system

CIBDCONF_REQUEST

Download of the upload request  Planning  of  a  variant  and
indicator  “Request  upload  of
time  tickets”  set  and  as  option
indication of a target system.

Relevant transactions

Transaction

Meaning

Please note:

CI42N

CI45N

CO16N

Download  Production  orders/
operations

Download of the upload request

Reworking of incorrect postings

-

-

-

SAP_PPPDC_Customizing_SAP.docx

Version: 1.0.1362

Page 6 of 6

