Implementation Guide MDE

1

Implementation Guide MDE

This  section  describes  how  HYDRA-MDE  (Machine  Data  Collection)  interacts  with  DMC  (Dynamic

Manufacturing Control). The document is based on the DMC Implementation Guide.

Further applicable documents

The following documents contain basic technical information on DMC or supplement this document:

-  DMC Implementation Guide

-  DMC SDK (included in DMC delivery)

o  DMC API documentation

o  Sample ImplementationGuide

MDE configuration

DMC offers the possibility  to integrate  MDE (Machine  Data Collection).  To this end,  you must configure

three components:

  MachineDataManager

  MachineStatusProvider (three options. Default: No monitoring)

o  CycleMonitoringMachineStatusProvider (Cyclic monitoring)

o  ProductionMonitoringMachineStatusProvider (Operating signal monitoring)

  HydraMDEFileWriter

You must set up the MachineDataManager and the MachineStatusProvider as child attribute of the

workstation component supporting an MDE functionality.

The document DMC_MDE.docx describes the configuration settings of this component.

Driver  data  ensure

the  correct

function  of

the  components  MachineDataManager  and

MachineStatusProvider. The bridge component provides this driver data. You can find details in the section

2.3.7. Bridge. You must configure the bridge component as children attribute. In our reference process, the

bridge component is the OPCDriver.

The FactoryModel (fm_reference.xml) of the reference process shows how MDE components are used in

DMC. Find extracts in the following:

<ComponentConfiguration Name="HydraMDEFileWriter"
              Class="mpdv.MachineDataCollector.Dmc.MachineData.HydraMDEFileWriter">

<Parameter Name="FileTimespan" Value="Minute" />
<Parameter Name="OutputDirectory" Value="MDE" />

DMC_ImplementationGuideMDE.docx

Version: 1.1.18468

Page 1 of 3

Implementation Guide MDE

  </ComponentConfiguration>

<ComponentConfiguration Name="PreHeatingMachineDataManager"
              Class="mpdv.MachineDataCollector.Dmc.MachineData.MachineDataManager"
              Children="HydraMDEFileWriter,OpcDriver">
    <Parameter Name="MachineDataManager_CounterConfiguration"
               Value="counter://HeatingCounters.xml" />
    <Parameter Name="MachineDataManager_SendingIntervalToHydra" Value="20" />
  </ComponentConfiguration>

<ComponentConfiguration Name="PreHeatingMachineStatusProvider"
              Class="mpdv.MachineDataCollector.Dmc.MachineData.MachineStatusProvider"
              Children="OpcDriver">
    <Parameter Name="MachineStatus_MachineStatusConfiguration"
               Value="wpstatus://HeatingWorkplaceStatusConfiguration.xml" />
    <Parameter Name="MachineStatus_OutputMachineLock" Value="1" />
    <Parameter Name="MachineStatus_OutputMachineDowntime" Value="2" />
  </ComponentConfiguration>

<ComponentConfiguration Name="PREHEAT"
             Class="mpdv.MachineDataCollector.Dmc.Entities.Workstation"
             Children="…,
                     PreHeatingMachineStatusProvider,
                     PreHeatingMachineDataManager
                    ,…"
/>

Figure 1 MDE processing) shows details of the MDE data collection.

DMC_ImplementationGuideMDE.docx

Version: 1.1.18468

Page 2 of 3

Implementation Guide MDE

Figure 1 MDE processing

The component MachineDataManager sends dialog data to the component HydraMDEFileWriter at cyclical

intervals or event oriented. The MachineDataManager receives status changes of the machine from the

MachineStatusProvider. With  this  information,  HydraMDEFileWriter  creates  files  with  Hydra  dialog  data.

The dialog data are stored in the file pipe-separated.

The files created can then be stored directly in a server directory or they can be transferred at a specified

interval using the component FileTransporter.

If  you  perform  the  DMC  instance  with  the  MDE  components  in  the  server,  you  do  not  need  the

FileTransporter. If you use the network to transfer the files, you must use the  FileTransporter. Using the

FileTransporter, the transaction is safe. No data is lost during transaction.

<ComponentConfiguration Name="HydraMDETransporter"
             Class="mpdv.MachineDataCollector.Core.Components.FileTransporter">
    <Parameter Name="InputDirectory" Value="MDE" />
    <Parameter Name="OutputDirectory" Value="\\DMC-TEST-01\hydra\1\DMC\DMW_01" />
    <Parameter Name="Interval" Value="90" />
    <Parameter Name="SearchPattern" Value="*.mdat" />
  </ComponentConfiguration>

You must set up a corresponding HYMW service (filemode) for HYDRA to process the data (i.e. load data

into the database).

Please refer to the DMC API documentation for further details on the components mentioned.

DMC_ImplementationGuideMDE.docx

Version: 1.1.18468

Page 3 of 3

