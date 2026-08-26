Definition of Workforce Requirements
1 Definition of Workforce Requirements
1.1 Workforce Requirements of the Machine/Operator Relation
You can define workforce requirements for setup and production of operations using the
machine/operator relations for setup and production. You can define these requirements in the fields
"M/O relation production" and "M/O relation setup" in the “processing” tab. An entered value is only
interpreted as staff requirement if the required qualification is assigned in the “qualification” field.
If you use the machine/operator relations to define workforce requirements, you can only specify one
qualification each for setup and production. If several different qualifications are required for setup or for
processing the operation, you have to define the workforce requirements via the production resources
and tools list.
The two qualification fields are only visible if the license PEP-AEP (order-dependent
identification of workforce requirements) has been purchased.
1.2 Personnel requirements of production resources and tools
You can use production resources and tools ..\..\functions\MOC\MOC_EditProdResources.pdfto define
workforce requirements. The resource type PRU defines the requirements for the setup of an operation.
The resource type PER specifies the requirements for the production of an operation. The field "resource"
includes the number of the required qualification and the field "required quantity" includes the personnel
requirements. You do not have to enter a unit for the required quantity.
The production resources and tools enable you to configure several requirements with different
qualifications for setup and production.
Definition_of_Workforce_Requirement.docxVersion: 1.0.18468 Page 1 of 2

|     |     | Definition of Workforce Requirements  |     |
| --- | --- | ------------------------------------- | --- |

2  Priorities when processing workforce requirements
There are several options to define workforce requirements. The following priorities apply:
| Priority  Workforce requirements  |     |     |     |
| --------------------------------- | --- | --- | --- |
1  Workforce requirements of production resources and tools
2  Workforce requirements of the machine/operator relation of operations
| 3  Workforce  | requirements  |     | of  |
| ------------- | ------------- | --- | --- |
workplaces..\..\functions\MOC\MOC_PersonnelRequirementOfWorkplaces.pdf

This means, personnel requirements defined for a workplace will only be processed, provided that the
production resources and tools and the machine/operator relations do not include staff requirements for
the operation.

Definition_of_Workforce_Requirement.docxVersion: 1.0.18468  Page 2 of 2