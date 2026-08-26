Workforce Requirements - Operations

1  Workforce Requirements - Operations

Summary

The  workforce  requirements  are  defined  depending  on  the  scheduled  operations.  The  requirement  is

specified  either  with  the  production  resources  and  tools  or  the  machine/  operator  relation.  As  an

alternative, the workforce requirements can also be stored at the workplace.

Definition of the workforce requirements in the production resources and

tools

Menu

Order management  Order management  Prod. resources + tools

Transaction code

edres

Function authorization

edopres

The workforce requirements for each operation can be stored in the production resources and tools.

MOC_PersonnelRequirementOfOrders.docxVersion: 1.0.18468

Page 1 of 4

Workforce Requirements - Operations

Field descriptions

MES order number

Operation number to which the production resources and tools are assigned.

Resource type

Type  of  the  resources  and  tools,  an  operation  shall  be  assigned  to.  For  personnel  scheduling,

resource types PER (production) and PRU (set up) are relevant.

Resource

Unique number of the qualification from the qualifications of the personnel scheduling.

Designation

Here you can indicate a designation of the production resources and tools.

Remark 1/ Remark 2

These fields are comment fields.

Required quantity/ unit

Number  of  employees  with  the  corresponding  qualification  required  for  processing  the  operation.

The  workforce  requirements  can  be  entered  with  up  to  two  decimal  places.  The  quantity  unit  has

the character of a comment.

Path

File

Relevant  for  production  resources  and  tools  DOC.  This  field  must  be  left  blank  for  all  other

production resources and tools.

Relevant  for  production  resources  and  tools  DOC.  This  field  must  be  left  blank  for  all  other

production resources and tools.

Multiple  workforce  requirements  with  various  qualification  can  be  defined  for  one  operation  in

production resources and tools.

Definition of the requirement in the machine/ operator relation

Menu

Order management  Order management  Edit operations

Transaction code

edop

Function authorization

edop

MOC_PersonnelRequirementOfOrders.docxVersion: 1.0.18468

Page 2 of 4

Workforce Requirements - Operations

As an alternative to defining the workforce requirements using production resources and tools, it can also

be  stored  in  the  machine/operator  relation  of  the  operation.  Contrary  to  the  production  resources  and

tools for setup and production the personnel requirements can only be defined for one qualification.

When  editing  operations,  the  fields  M/O  relation  setup  and  M/O  relation  production  are  found  in  the

Processing tab.

Field descriptions

M/O relation setup

Workforce requirements for set up.

MOC_PersonnelRequirementOfOrders.docxVersion: 1.0.18468

Page 3 of 4

Workforce Requirements - Operations

Qualification (Setup)

Unique number of the qualification from the qualifications of the personnel scheduling.

M/O relation production

Workforce requirements for production.

Qualification (production)

Unique number of the qualification from the qualifications of the personnel scheduling.

The  machine/  operator  relation  is  only  relevant  for  personnel  scheduling  if  a  qualification  is

entered into the underlying field.

MOC_PersonnelRequirementOfOrders.docxVersion: 1.0.18468

Page 4 of 4

