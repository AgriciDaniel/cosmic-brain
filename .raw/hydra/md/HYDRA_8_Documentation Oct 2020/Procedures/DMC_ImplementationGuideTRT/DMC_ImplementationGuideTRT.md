Implementation Guide TRT

1

Implementation Guide TRT

This  section  describes  how  HYDRA-TRT  (Tracking  and  Tracing)  interacts  with  DMC  (Dynamic

Manufacturing Control). The document is based on the DMC Implementation Guide.

Further applicable documents

The  following  documents  contain  basic  technical  information  on  DMC  or  add  up  to  the  contents  of  this

document:

-  DMC Implementation Guide

-  DMC Implementation Guide MDE

-  DMC-SDK (included in DMC delivery)

o  DMC-API documentation

o  Sample ImplementationGuide

The  SDK  Sample  ImplementationGuide  provides  examples  on  how  TRT  integrates  in  the  reference

process.

Tracking and Tracing

Configure DMC as follows in order to enable the functions and to integrate them using HYDRA.

Include the component MaterialManager into the FactoryModel at each station. Assign the component to

the corresponding workplace as child.

<ComponentConfiguration Name="MaterialManager"

Class="mpdv.MachineDataCollector.Dmc.Material.MaterialManager" />

This  component  can  be  supplied  with  material  scan

information  via

the

inputs  of

the

MaterialManagerCapability. Refer to the DMC API documentation for further details on the component and

the corresponding Capability.

The recorded material information is stored in the workpiece. If you want to send this information to HYDRA,

you must use the component MaterialMovementRepository.

<ComponentConfiguration Name="MaterialMovementRepository"

Class="mpdv.MachineDataCollector.Dmc.Material.MaterialMovementRepository">

    <Parameter Name="WriteConnector" Value="JtpPersistentConnector" />
  </ComponentConfiguration>

In  this  example,  you  have  configured  the  use  of  a  safe  connection  to  HYDRA  via  the  parameter

WriteConnector.

DMC_ImplementationGuideTRT.docx

Version: 1.1.9260

Page 1 of 4

Implementation Guide TRT

You use the component MaterialAssignmentManager to check if a material can be installed in an item. This

component implements the interface IMaterialAssignmentManager:

string TryAssign(Workpiece workpiece, Material inputMaterial, Material candidate);

The  MaterialManager  then  asks  if  the  assignment  is  possible  with  the  component  that  implements  the

interface. If you implement this interface, you can e.g. create a component that stores the installed serial

numbers in a database. This component then ensures that the numbers are unique.

Configuration of TRT archiving

Contrary to the default archiving, the trace data recorded in DMC is not batch-related. The trace data is

immediately archived if no batch is assigned to the trace data. This condition is always true for DMC data.

For this reason, you must change the TRT default archiving.

Delete the condition for the object LOSZUORD and set the retention period to e.g. 35 days:

DMC_ImplementationGuideTRT.docx

Version: 1.1.9260

Page 2 of 4

Implementation Guide TRT

Delete the condition for the object LOSEVENTMLB and set the retention period to e.g. 35 days:

DMC_ImplementationGuideTRT.docx

Version: 1.1.9260

Page 3 of 4

Implementation Guide TRT

DMC_ImplementationGuideTRT.docx

Version: 1.1.9260

Page 4 of 4

