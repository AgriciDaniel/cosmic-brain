MOC Update Package Creator

1  MOC Update Package Creator

1.1  Overview

Menu

Extras  Generate update package

Transaction code

Function authorization  mupc

You can generate update packages with the "MOC Update Package Creator".  You can create packages

for the MOC client and for the server.  You use the Maintenance Manager to install the generated update

packages on the server. The MOC updates are distributed via the MOC updater.

You mainly use the MOC Update Package Creator to generate updates for the deployment of applications

and services that you have developed using the MES Development Suite. You can also use the generated

update packages to distribute the configurations that you have made locally in the MOC.

The  MOC  Update  Package  Creator  is  available  in  German  and  English.  The  MOC  Update

Package Creator is an independent Windows application. Therefore, the Update Package Creator

does not use the language set in the MOC, but the language set in the operating system.

Experienced users can start the MOC Update Package Creator via the Windows command line

from the installation directory of the MOC or via a link. Enter the language using command line

parameters.

MOCUPC.exe path=<MOC_inst_path> l=<language> s=<scope>

<MOC_inst_path>: path of the MOC installation

<language>: language ("en" or "de")

<scope>: "local" or "custom" (custom only for MPDV or partner)

Example: D:\Moc>MOCUPC.exe path=d:\moc l=en s=local

After start of the MOC Update Package Creator, two tabs are available: One tab for the generation of MOC

packages and one for server packages. You must generate separate update packages for MOC and server.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 1 of 7

1.2  Generate MOC packages

MOC Update Package Creator

For the generation of MOC packages, you must select the files in a tree view that you want to include in

the update. You can save the selected files in "update package profiles". Later, you can reload these profiles

and generate a new package with the same files.

The packages include a version number. The last created version number is saved in the "update package

profile".  If  you  create  a  new  version  of  the  same  package,  you  can  easily  identify  the  last  version  and

increase the number by one.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 2 of 7

MOC Update Package Creator

Field description

Folder, which contains the relevant files for the update

This  field  shows  the  installation  directory  of  the  MOC,  which  includes  the  configurations  or

adjustments. On start of the MOC Update Package Creator, the system populates this field with the

correct entry. The folder with the relevant files for the update includes the subfolders with the selected

configuration scope ("local" or "custom").

Folder that contains the generated update, once it has been created

The  generated  updates  are  stored  in  this  folder.  This  folder  must  already  exist.  It  is  not  created

automatically.

Update file name

Name of the update file. The file name of the update is also the name of the update package profile

if you save the profile.

The update name must not include blank characters or umlauts.

Brief description of the update

This description is, e.g., displayed in the update overview of the Maintenance Manager.

Version number

MOC packages include version numbers. You can only install packages with the same name in the

Maintenance Manager, if they have a higher version number. The version number is automatically

populated. The version number that has been created last is entered here. The update overview of

the Maintenance Manager also shows the version.

Version numbers should have the following format: "<x>.<y>.<customer abbreviation>.<zzzz>", e.g.

"1.1.CUST.17".

Configuration scope

The configuration scope "local" includes the developments of the customer. The configuration scope

"custom" is used by MPDV or the MPDV partners.

File selection (tree view)

Select the files in the tree view that you want to include in the update.

Load/Save/Delete Update Package Profile

The system uses the name of the field "Update file name" for the administration of the update package

profiles. The saved profiles include the following information:

  Folder that contains the generated update once it has been created

  Update file name

  Short description of the contents

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 3 of 7

MOC Update Package Creator

  Last created version number

  Configuration scope

  The files that you have selected in the tree view

If you load an existing profile, you should check in the tree view, if new files have been added since

the last time the profile was saved in the directory structure. If required, you must activate the new

files and add them to the profile by saving the profile again.

Click the button "Generate update package" to create the update package. The Maintenance Manager can

then install the update package in the server.

In the MOC clients, the updates are usually installed with the MOC Updater. You can immediately search

for updates, if you select in the menu: Help  Search for updates.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 4 of 7

1.3  Generate server packages

MOC Update Package Creator

You  use  "Server  packages"  to  distribute  server  data  of  the  MPDV  repository.  You  can  also  use  server

packages to distribute JAVA artifacts that you have developed yourself using the MES Development Suite

(MDS). A list view shows the domains created in the repository.

Activate the domains in the list view that you want to include in the update package. The system assigns

version numbers to the domains. With server packages, each domain gets an own version number. The

installation in the Maintenance Manager can only be performed, if the domains in the server package have

a higher version number than the domain versions that are already installed.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 5 of 7

MOC Update Package Creator

Field descriptions

Development directory, which contains the domains for the update

This field shows the directory where the MPDV Repository Client (MRC) stores the server domains.

It is the same path that is entered as "Server source" in the MRC workset.

If you want to use server packages to distribute configuration files and JAVA artifacts that you

have developed  yourself using the MES Development Suite (MDS), you must store these files

and artifacts in the domain directory structure of the MRC.

<Source directory>/

    <Domain1>/

        Interpreter/

            List Interpreter and BAPI interpreter configurations

        ReferenceData/

            Reference data configurations

        ExtSvc/

            JAVA Class files of the Simple External Services (including package structure)

        ExtSvcMapping/

            Mapping configuration files of the SimpleExternalServices

        User exit/

            JAVA Class files of the User Exits (including package structure)

    <Domain2>/

        …

Folder that contains the generated update, once it has been created

The  generated  updates  are  stored  in  this  folder.  This  folder  must  already  exist.  It  is  not  created

automatically.

Package name

Name of the update file. The Update Package Creator automatically adds "-server" to the file name.

You can therefore use the same name for the client and the server package.

The update name must not include blank characters or umlauts.

Brief description of the update

This description is, e.g., displayed in the update overview of the Maintenance Manager.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 6 of 7

MOC Update Package Creator

Set standard version,

Complete column "Version" in the domain table

With the server package, a version is required for each domain. If you enter a version number in the

field "Set standard version", this version number is assigned to all domains that are activated in the

list. You can also assign individual version numbers for activated domains. If the field "Set standard

version" is left empty, you must assign an individual version to each activated domain.

Version numbers should have the following format: "<x>.<y>.<customer abbreviation>.<zzzz>", e.g.

"1.1.CUST.17".

Domain selection (list view)

The list shows the domains that are included in the development directory. Activate the domains in

the list view that you want to include in the update package. The system assigns version numbers to

the domains.

Click the button "Generate update package" to create the update package. The Maintenance Manager can

then install the update package in the server.

The system stores the values of the two fields "Development directory, which contains the domains for the

update" and "Folder,  which contains the relevant files for the update". When the MOC Update  Package

Creator is started the next time, the application populates these two fields with the values that were last

entered in this field.

MOC_UpdatePackageCreator.docx

Version: 1.1.22363

Page 7 of 7

