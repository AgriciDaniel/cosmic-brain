Implementation Guide: BDE

1

Implementation Guide: BDE

This  section  describes  how  HYDRA-BDE  interacts  with  DMC.  This  section  is  based  on  the  DMC

Implementation Guide.

Further applicable documents

The following documents deal with DMC basics or add to the contents of this document:

-  DMC Implementation Guide

-  DMC Implementation Guide MDE

-  DMC-SDK (delivered with DMC)

o  DMC-API documentation

o  Sample ImplementationGuide

The  SDK  Sample  ImplementationGuide  provides  examples  on  how  BDE  integrates  in  the  reference

process.

Data posted onto the operation

The DMW (Dynamic MES Weaver) controls the production process of items/parts on the production line.

Every physical item is represented by a digital workpiece. The operation is the basis for manufacturing an

item.

Once production  is completed and depending on the  production result, the DMW posts a  yield or scrap

quantity for the operation. Configure the following components in the factory model to enable this function.

Configure the component ProductionManager for all stations, i.e. add an instance as child to the relevant

station.

<ComponentConfiguration

Name="ProductionManager"
Class="mpdv.MachineDataCollector.Dmc.Production.ProductionManager"
Children="HydraMDEFileWriter" />

Assign a HydraMDEFileWriter component as child to the ProductionManager component in order to transfer

postings to HYDRA. Refer to the DMC-API documentation and the Implementation Guide MDE for further

information on these components.

Instead  of  using  the  default  ProductionManager  component,  you  can  develop  and  use  an  alternative

component to integrate BDE.

DMC_ImplementationGuideBDE.docx

Version: 1.1.9348

Page 1 of 2

Implementation Guide: BDE

The digital workpiece stores the production period and place of production (station). The digital workpiece

includes  detailed

information  on  each  process  and  work  step

(BeginOfManufacturing  and

EndOfManufacturing).

Collection of personnel times

If staff is logged on to a workstation, the digital workpiece records for every work step:

- the staff involved in production and

- the period of time.

The component PersonnelManager collects this information. Configure this component for every station:

<ComponentConfiguration Name="PersonnelManager"

Class="mpdv.MachineDataCollector.Dmc.Production.PersonnelManager">
    <Parameter Name="PersonRepositoryComponent" Value="PersonsDataRepository" />
</ComponentConfiguration>

Set an instance of a component as value for the parameter PersonRepositoryComponent. This component

must provide objects including the field PersonId. This can be, for example:

<ComponentConfiguration Name="PersonsDataRepository"

Class="mpdv.MachineDataCollector.Dmc.Model.SimpleDataRepository">

    <Parameter Name="ReadConnector" Value="JtpConnector" />
    <Parameter Name="ListServiceName" Value="BOPerson.list" />
</ComponentConfiguration>

The digital workpiece status stores personnel times as EventInfo. You can send login and logoff details to

the capability PersonnelManager of the component PersonnelManager. Use the inputs LogOnPerson and

LogOffPerson that transfer the PersonId. Refer to the DMC-API documentation for further information.

DMC_ImplementationGuideBDE.docx

Version: 1.1.9348

Page 2 of 2

