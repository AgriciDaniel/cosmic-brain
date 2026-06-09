Edit Order Network

1  Edit Order Network

Summary

HYDRA Menu

Order Management  Order management  Edit order network

FEDRA menu

Advanced Process Modeling  Edit  Edit order network

Transaction code

ednet

Function authorization

ednet

Usage

You  use  this  application  to  create  dependencies  for  orders  beyond  the  existing  operation  sequence.

These dependencies are referred to as relationships.

Keep  in mind that only the end-start relationships can be created. These  are relevant for both planning

and for data entry. Enter the MES order number (combined order/ OP number) during data entry.

Requirement

The linked orders, including all of their operations, must exist in the system.

Selection criteria

The application provides the following selection criteria:

Order

The relationships are displayed for the selected order number.

OP

The relationships are displayed for the selected operation.

Predecessor/ successor/ predecessor and successor

Only the relationships relating to the selection are displayed.

Toolbar

This application only allows relationships to be created or deleted.

Any relationships created by the system automatically (origin = "S") may not be deleted by the

user.

MOC_EditOrderNetwork.docx

Version: 1.0.23225

Page 1 of 2

Edit Order Network

Field descriptions

Predecessor

Order number of the preceding operation

Preceding OP

Operation number of the preceding operation

Successor

Order number of the succeeding operation

Succeeding OP

Operation number of the succeeding operation

Relationship

Only the end-start relationships ("ES”) can be created in the setup process.

Origin

Relationships  created  manually  or  explicitly  via  the  interface  are  created  using  "E"  =  externally

created.

The relationships created by the system are marked with "S".

Active

In principle, relationships are always active. Relationships created due to alternative sequences are

the exception. Relationships of inactive alternative sequences are marked as inactive.

Relevance

The system differentiates between relationships for planning and relationships for data entry.

P

V

X

Relationship is only relevant for planning.

Relationship is only relevant for data entry.

Relationship is neither relevant for planning nor for data entry.

<empty>  Relationship is relevant for planning and for data entry.

Explicitly set relationships can only be created with relevance =<empty>.

MOC_EditOrderNetwork.docx

Version: 1.0.23225

Page 2 of 2

