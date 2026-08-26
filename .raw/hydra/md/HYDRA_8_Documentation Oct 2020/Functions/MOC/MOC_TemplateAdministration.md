Template Management

1  Template Management

Overview

HYDRA menu

Order management  Template management  Template management

FEDRA menu

Detailed Scheduling  Master data  Template management

Transaction code

edtpl

Function authorization

edtpl

Purpose

A  template  can  be  regarded  as  a  default  to  populate  operation  fields  for  which  no  data  is  entered  or

transmitted from the ERP system.

Integration

Depending on the action involved, the system determines the values from the template and assigns these

values to the operation. These actions can be:

  manual creation of new operations



transfer of operations from the ERP system



change of operation if the workplace group has changed

Production resources and tools, components or long texts cannot be defined as templates.

A template number can only include one active template .

Selection criteria

The application provides the following selection criteria:

Order type

Order type for which the template is valid.

Group

Workplace group for which the template is valid.

Workplace

Workplace for which the template is valid.

MOC_TemplateAdministration.docx

Version: 1.4.23296

Page 1 of 3

Template Management

Type

Template type

AU = Order Header

AG = Operation

Order

Order used as the basis for generating an order when templates are used.

Active

Specifies if the template is active.

Field descriptions

Template

Template number

Active

Specifies if the template is active.

Type

Template type

AU = Order Header

AG = Operation

Version

Template version

Order type

Order type for which the template is used.

Order

Order or operation defined for the template.

If  you  create  a  template  for  the  type  "order  header",  enter  a  number  that

corresponds  to  the  configured  order  number  length.  Recommendation:  If

possible, use the template number as order number.

If  you  create  a  template  for  the  "operation"  type,  the  allowed  number  length

depends on the configuration  in the  basic settings. The  length  of the  number

must  not  exceed  the  order  number  length  +  sequence  number  length  +

operation number length if the split number length is > 0.

Group

Workplace group for which the template is used.

Workplace

Workplace for which the template is used.

MOC_TemplateAdministration.docx

Version: 1.4.23296

Page 2 of 3

Template Management

Comment

Template comment.

Toolbar

Edit order (function authorization edtpl.order)

Use the function to edit the order header data for a template:

Edit operation (function authorization edtpl.operation)

Use the function to edit the operation data for a template:

Processing

The system uses the following order to identify a template:

  Order type + machine

  Order type + machine group

  Order type

MOC_TemplateAdministration.docx

Version: 1.4.23296

Page 3 of 3

