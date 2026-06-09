Configuration Inspection Requirement

1  Configuration Inspection Requirement

1.1  Process generating inspection requirements

The following graphic shows how the function to generate inspection requirements works. The function

operates either by using OP logon at the terminal or independent of the terminal configuration or triggered

manually.

(Text marked in red is only valid if the system generates inspection requirements using the terminal.)

The system generates true QM OPs depending on the terminal configuration, which integrates these

automatically into the real order.  Please note that the system selects the OP number for inspection plan

characteristics accordingly, as it only generates true QM OPs if the stated OP number does not exist yet.

Usually, the ERP interface generates inspection requirements in goods-receipt.  The ERP system is

sending specific information to HYDRA. On this basis, the system generates the inspection requirement.

Terminal „Filter functions“

Configuration_InspectionRequirement.docx Version: 1.0.5661

Page 1 of 2

Configuration Inspection Requirement

Specifying the area and area type is possible in the "CAQ" tab.  These details determine in which CAQ

area the system looks for inspection steps or inspection plans that can be logged in order to create

inspection steps. If the details are not correct, the system cannot log an inspection step in the terminal.

(Example: Settings for in-production inspection in order to log a goods-receipt inspection.)

The option “input only allowed if inspection station matches” restricts the inspection steps that can be

logged on to those inspection steps matching the selected inspection station. Depending on the

inspection plan configuration, this can lead to the inspection step not being generated for this inspection

station and thus no inspection step can be logged on. In order to be able to use this function, the global

option “An IO for each inspection station” must be activated in the inspection plans. If this is not the case

no inspection steps can be logged on to the terminal.

1.2  Calculation of characteristics

The system transfers no content (machine, cavity ...) onto the calculated characteristics.   The reason for

it is that the values used for calculation should be collected on different machines. This means the value

of the calculated characteristic cannot be assigned to a specific machine.

Configuration_InspectionRequirement.docx Version: 1.0.5661

Page 2 of 2

