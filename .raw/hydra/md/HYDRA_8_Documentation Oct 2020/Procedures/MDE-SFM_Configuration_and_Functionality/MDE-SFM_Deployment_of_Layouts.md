Deployment of Layouts of the Shop Floor Monitor

1  Deployment of Layouts of the Shop Floor Monitor

Usage

If  layouts  are  created  for  the  Shop  Floor  Monitor  (MDE-SFM),  they  may  also  be  transferred  to  other

systems.

Prerequisites

These requirements have to be met:

  The layouts have to be created in the Shop Floor Monitor. It is impossible to transfer layouts from

a machinery used with HYDRA 7 or run based on java applets. (Previous version MPARK)

  The used templates and objects, such as workplaces have to be available in the target system.

  The target system has to match the technical status of the source system.

  The target system must not include layouts with the same name.

Procedure

Please proceed as follows to deploy layouts:

  Copy the required layouts (*.zip directories) from the source server to the target system (target

server) in the same folder structure:

<Server>\<HYDRA directory>\<system number>\custom\mpark

The ZIP files stored here are filed with their unambiguous, technical name. This name can be

shown in the list of layouts of the Shop Floor Monitor application.

  The table hyd_parklayout can be unloaded and transferred with the following restrictions:

xunload to hyd_parklayout.unl

select * from hyd_parklayout where typ = ‘N‘

Please note: The restriction "type = N" only exports layouts that were created in the Shop Floor Monitor.

MDE-SFM_Deployment_of_Layouts.docx

Version: 1.0.20999

Page 1 of 1

