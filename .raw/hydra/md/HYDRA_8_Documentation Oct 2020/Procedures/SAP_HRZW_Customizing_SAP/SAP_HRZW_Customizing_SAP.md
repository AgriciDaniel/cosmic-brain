1  Application-Relevant Settings SAP

Application-Relevant Settings SAP

Maintenance of the SAP Partner Agreement– Inbound

Maintain the below-mentioned settings for inbound processing in the partner agreement in SAP (WE20):

Parameter name

Value

To upload monthly wage types

Partner number

Created logical system

Partner type

Message type

LS

REM_SPEC_WITH_COST

Processing code

BAPI

To upload absences

Partner number

Created logical system

Partner type

Message type

Processing code

LS

ATT_ABS

BAPI

Maintenance of the SAP distribution model – Inbound

Parameter name

Value

To upload monthly wage types

Model view

Sender / client

Created model view

Logical system of the instance

Recipient / server

Logical system for the recipient's system

SAP_HRZW_Customizing_SAP.docx

Version: 1.0.1362

Page 1 of 2

Application-Relevant Settings SAP

Parameter name

Value

Object name/interface

PTMgrExtRemunSpec

Method

InsertWithCostAssignment

To upload absences

Model view

Sender / client

Created model view

Logical system of the instance

Recipient / server

Logical system for the recipient's system

Object name/interface

PTManagerExtAttAbs

Method

Insert

SAP_HRZW_Customizing_SAP.docx

Version: 1.0.1362

Page 2 of 2

