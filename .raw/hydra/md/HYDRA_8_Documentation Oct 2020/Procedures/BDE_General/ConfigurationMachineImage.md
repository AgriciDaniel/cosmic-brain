 Configuration  of  Machine  Pictures  for  the  MOC
Application Workplaces/Machines

1  Configuration of Machine Pictures for the MOC Application

Workplaces/Machines

Usage

This  document  describes  the  configuration  required  to  display  images  in  the  MOC  application

workplaces/machines.

Prerequisites

The pictures (files) have to be stored in a directory that may be accessed from the system.

Procedure

1.  Store the files to be displayed in a central directory that may be accessed using the system's means

of communication.

2.  Make sure the user who accesses the directory has the relevant authorizations.

3.  Set  the  path  configuration  for  the  logical  path  MOCWPIMG.  Further  information  on  the  path

configuration can be found here.

Example of a path configuration

(The files are stored locally on the Windows HYDRA Server):

ConfigurationMachineImage.docx

Version: 1.2.20935

Page 1 of 4

4.  Enter  a  valid  file  name  in  the  field  "file  name"  of  the  workplace/resource  configuration  application.

 Configuration  of  Machine  Pictures  for  the  MOC
Application Workplaces/Machines

Result

The picture is shown in the MOC application workplaces/machines:

Trouble Shooting

If  the  picture  is  not  shown  (message:  "No  data  available"),  the  reason  for  this  can  be  determined  by

evaluating the LOG file on the server. To do so, proceed as follows:

1.  On the server go to the subdirectory ...\JHYDRADIR\<System>\err, where the web service calls are

recorded for the system. As a general rule, it can be found within the system directory on the HYDRA

server, e.g. g:\hydra4. In case of doubt, please contact MPDV Support.

2.  Search for the current LOG file in the directory. This is the file with the extension ".log“.

3.  Open the LOG file by using an editor (attention: the LOG file might be very large!) and search for the

error message, as mentioned below for example.

ConfigurationMachineImage.docx

Version: 1.2.20935

Page 2 of 4

 Configuration  of  Machine  Pictures  for  the  MOC
Application Workplaces/Machines

4.  Check the displayed file name and the displayed path (highlighted in red).

Please note: If necessary, you even have to search in LOG files with older time stamps, provided that the

message occurred some time ago.

Error message in the LOG file (e.g. hydra-java-4.log)

2012-12-02 14:08:07,024 ERROR http-8083-2 -
(de.mpdv.plugin.service.bopDocLinks.BopDocLinksList.doService():-1) - 1 - 7c8d71a2-cc0c-406e-
aa1d-50168927deab - 76 - Error opening graphic file 33021.jpg in HYDRA path MOCWPIMG. Exception
was:
de.mpdv.common.data.hyPath.exceptions.UnreachableHyPathException: Could not open file:
\\scc5\D:\Hydra72\1\grafik\bde

at

de.mpdv.common.hyPath.pathResolver.FileHyPathResolver.checkHyPath(FileHyPathResolver.java:124)
at de.mpdv.common.hyPath.HydraPathManager.checkPath(HydraPathManager.java:545)
at de.mpdv.common.hyPath.HydraPathManager.openFile(HydraPathManager.java:131)
at de.mpdv.plugin.service.bopDocLinks.BopDocLinksList.doService(Unknown Source)
at

de.mpdv.mesClient.businessService.impl.ServiceDispatcher.doInteract(ServiceDispatcher.java:238)

Possible reason: wrong path configuration

In this example, the pictures are stored on another server than the HYDRA server. For this reason, the

HYDRA server (Windows) needs to access another server (Windows). The drive letter (here: "g:\") for the

remote server has been entered in the URL path field of the path configuration.

Wrong path configuration

ConfigurationMachineImage.docx

Version: 1.2.20935

Page 3 of 4

Correct path configuration

 Configuration  of  Machine  Pictures  for  the  MOC
Application Workplaces/Machines

Possible reason: access by user/password denied

The MOC client does not directly access the path but the Java Server (Tomcat) that in turn provides the

MOC client with the image. As Tomcat is running as service, the server uses the service account user for

accessing the file.

For this reason, it is to be checked whether the file included in the shared path can also be accessed from

the server. If this is the case, another check has to be made as to whether only specific combinations of

users/passwords might be able to access the path.

ConfigurationMachineImage.docx

Version: 1.2.20935

Page 4 of 4

