Maintenance Manager 2.0

1  Maintenance Manager 2.0

Overview

The Maintenance Manager is a web based maintenance tool to manage HYDRA systems.

You use this tool to edit server and client components.

  Purpose

Open the web front end browser in order to use the Maintenance Manager.

The  address  for  the  web  front  end  is  http://ServerName:Port/  (e.g.  http://hydra:18080/  if  the  server  is

hydra and the standard port 18080 is used for the first system. Then port 18081, … for further systems).

  Login

You have to log in to use the Maintenance Manager. Password for the login is:

Mosbach74821

MaintenanceManager_20.docx

Version: 1.0.23230

Page 1 of 21

Maintenance Manager 2.0

Figure 1: Login Maintenance Manager

After the login, the start page of the Maintenance Manager opens.

Figure 2 Main Page Maintenance Manager

MaintenanceManager_20.docx

Version: 1.0.23230

Page 2 of 21

Maintenance Manager 2.0

  Configuration

Menu item: Settings

Prior to use, you can configure the Maintenance Manager and adjust the manager to the conditions of the

HYDRA system. The user can neglect the above if you use the relevant installation service.

However, the user must edit the following values in tab System:

Value

WSP host

WSP port

Description

Host name of the WSP server

Port of the WSP server

Tomcat path

Installation directory of the Tomcat

Tomcat version

Tomcat Version (compatible with 6 or 8)

Java version

Java Version (compatible with 5 or 8)

Optionally, you can define a directory that is read at regular intervals and that automatically reads update

packages that have not yet been installed. For example, you can use a network share to update and/or

install several systems with the same update packages.

Click the Save button to save the configuration.

Figure 3 System configuration

MaintenanceManager_20.docx

Version: 1.0.23230

Page 3 of 21

The  tab  MOC  settings  includes  the  settings  to  configure  the  MOC  Updater.  Use  these  settings  to

configure the process and input fields of the MOC Updater GUI. You can also specify whether users are

allowed to change the fields in the MOC Updater GUI.

Maintenance Manager 2.0

Figure 4: Configuration master server

Value

Description

Master host

Standard  value  of  the  host  name  of  the  master  server  that  the

MOC Updater uses during setup.

Standard  value:  Identical  with  the  host  name  of  the Maintenance

Manager.

If  several  systems  are  available  and  only  one  master  server  is

configured, this master server must be entered.

Master port

Standard value of the port of the master server that is used in the

GUI of the MOC Updater during setup.

Standard  value:  Identical  with  the  port  of  the  Maintenance

Manager.

MOC root directory

Standard value of the target directory of the MOC installation that

is used in the GUI of the MOC Updater during setup.

Standard value: "C:\Program Files (x86)\MPDV\MOC"

MaintenanceManager_20.docx

Version: 1.0.23230

Page 4 of 21

Maintenance Manager 2.0

Lock MOC root

The  lock  specifies  if  the  user  can  change  the  GUI  of  the  MOC

Updater.

Standard value: disabled

Path to ZIP archive

Standard  value  of  the  file  path  to  the  ZIP  archive  of  the  MOC

installation  that  is  used  in  the  GUI  of  the  MOC  Updater  during

setup.

Standard value: not specified

Lock ZIP path

The  lock  specifies  if  the  user  can  change  the  path  to  the  ZIP

archive in the GUI of the MOC Updater.

Standard value: disabled

Default setup source is zip

Activates  the  ZIP  archive  as  standard  value  for  the  installation

source in the GUI of the MOC Updater.

Standard value: "Maintenance Manager"

Lock default setup source

The  lock  specifies  if  the  user  can  change  the  value  for  the

installation source in the GUI of the MOC Updater.

Standard value: disabled

Days to keep backups

Specifies the  duration (in  days) of how  long to keep the backups

generated during update in the client.

Standard value: 30

Shortcuts only for current user  This  activates  that  the  systems  selects  by  default  only  the

currently  logged  on  user,  when  generating  MOC  links  in  the  GUI

of the MOC Updater.

Standard value: "All users of this PC".

Click  Rescan  to  release  the  saved  settings  so  that  the  MOC  Updater  can  distribute  and  use  these

settings.

If you make changes to the  MOC subdirectory of the Runtime directory, then  you also have to click the

Rescan  button.  This  process  is  necessary  for  the  MOC  Updater  to  find  and  install  the  changes  when

searching for updates.

Click the Save button to save the configuration.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 5 of 21

The Logbook tab provides information about the last deployments.

Maintenance Manager 2.0

Figure 5: Information on the last installations.

The Environment tab shows the current environment variables.

Figure 6: Display of system settings

  Package Deployment

1.4.1 General

Use  the  Maintenance  Manager  to  install  update  packages  for  the  HYDRA  system.  Such  an  update

package may contain content for the client (MOC), the server, web services (JAVA) and updates for the

Maintenance Manager itself.

Such an Update Package contains different types of packages.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 6 of 21

Maintenance Manager 2.0

-  Client   Updates for MOC

-

Java  Updates for web services

-  Server  Update for non-web service components of the server

-  Maintanance Manager → Update of the Maintenance Manager

The different internal packages are installed for update according to their type.

1.4.2 Internal Package Types

1.4.2.1

Java

The  Java  software  is  located  in  the  Tomcat  "Web  archive".  This  file  has  the  extension  .war.  Web

applications  usually  require  further  files  (configurations,  user  exits,  ...).  These  files  are  located  in  a

subdirectory (e.g. MOC) that is specified by the environment variable JHYDRADIR.

In  order  to  keep  the  update  packages  small,  it  is  not  always  the  complete  web  application  that  is

exchanged but only the modified components.

1.4.2.2

Server

The server packages are the packages that have already been used with HYDRA 7. The packages are

forwarded to the BAPI HYDRA.INSTALL which then manages the packages.

1.4.2.3  Client

The  client  software  is  managed  and  supplied  for  each  domain.  To  execute  the  software  in  the  client,  a

different structure is required.

For this reason the Maintenance Manager uses a split structure:

Updates

These  are  the  individual  update  packages  (containing  one  or  several

domains) installed in the Maintenance Manager.

MaintenanceManager\upd\MOC

Runtime

This is the runtime version that the client requires to execute it.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 7 of 21

MaintenanceManager\rt\MOC

Maintenance Manager 2.0

1.4.3 Deployment

Menu item: Update

The screen to deploy update packages contains only a button to select a file.  The user must select the

required  update  package.  The  button  "Deploy  package"  installs  the  package  in  the  Maintenance

Manager. You can automatically activate the package if you  select Auto activate after deployment.  This

option is selected by default.

IMPORTANT:

The  function  Overwrite  newer  versions  is  only  available  for  Java  components  of  the  update  package.

Only use this function after consultation with MPDV.

Figure 7: Selection of update package

MaintenanceManager_20.docx

Version: 1.0.23230

Page 8 of 21

Maintenance Manager 2.0

Figure 8: Deployment

During  installation  of  update  packages,  the  column  Version  of  the  included  internal  packages  may  be

highlighted in color. If the column is highlighted in yellow, then the update package has the same version.

If  the  column  is  highlighted  in  red,  the  shown  version  is  older  than  the  version  of  the  already  installed

update package.  In this case, the button Deploy update is blocked until the user selects Overwrite newer

versions.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 9 of 21

Maintenance Manager 2.0

Figure 9: Installing older update packages

Figure 10: Progress during installation

1.4.4 Finishing an update

If you want to perform an update automatically at a specific point in time, select the required point in time

for the update in the field Planned update time and confirm by clicking Deploy update.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 10 of 21

Maintenance Manager 2.0

Figure 11: Scheduling of an update

The  menu  item  Update  shows  the  planned  update  time.  Cancel  the  planned  update  using  the  function

Cancel planned update.

Figure 12: Cancelling an update

Open  the  log  of  the  update  using  the  menu  item  Settings/Logbook  to  check  if  the  update  has  been

performed successfully.

You can only schedule one update at a time. If you must install several updates simultaneously, you must

combine all packages in one.

1.4.5 Automatic installation of updates

You can install updates automatically. Define a directory in the network where the Maintenance Manager

checks  every  5  minutes  if  new  packages  are  available  that  are  not  yet  installed.  If  a  new  package  is

found, it is immediately installed. The update is automatically activated.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 11 of 21

Maintenance Manager 2.0

If several new UPDs are available in the directory, the packages are installed one by one. The oldest file

is installed first.

  Deployment

1.5.1 Administration of update packages

Menu item: Package administration

Tab: Server/Client

The process is the same for the deployment of client update packages and for Java update packages. If

there are differences, then they are mentioned separately.

All updates installed in the Maintenance Manager are listed in the administration of update packages.

Whether  or  not  an  update  package  has  been  deployed  to  the  runtime  structure  can  be  found  in  the

content of the column Deployed at. If the update package has been deployed, then date and time of the

update is shown in the column. If the update package has not been deployed to the runtime structure or

has previously been undeployed, then the column remains empty. But the update package remains in the

Maintenance Manager until it is finally deleted.

If the user selects an update package, detailed information is available for the package.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 12 of 21

Maintenance Manager 2.0

Depending on whether or not you have deployed an update package, the function Deploy or Undeploy is

available.  The  deployment  of  an  update  package  loads  the  contents  into  the  local  runtime  structure.

During  the  deployment,  all  files  are  saved  that  are  overwritten  by  the  content  of  the  update  package  to

enable an undeployment of the update package.

If the package that you want to deploy contains older versions than the runtime, the system queries if you

want  to  deploy  older  versions  nor  not.  (Only  carry  out  a  deployment  of  older  versions  after

consultation with MPDV!)  In case of a client undeployment, the versions are not checked as it might be

required in some cases to change a component with an older version.

The  undeployment  removes  the  components  of  the  update  package  from  the  runtime  structure  and

replaces the components with the backup of the previously loaded update package.

You  can  only  undeploy  the  last  deployed  update  package  because  components  of  a  newer  update

package might be overwritten during backup of the update package being currently undeployed.

Figure 13: Undeployment of WSP Packages

MaintenanceManager_20.docx

Version: 1.0.23230

Page 13 of 21

Maintenance Manager 2.0

Figure 14: Undeployment of MOC Packages

After  undeployment,  you  can  completely  delete  the  update  package.  That  deletes  the  backup  of  the

update package.  If the user has undeployed the update package, then the button Delete can be selected.

Via Delete the update package is completely removed from the system.

Figure 15: Delete server update packages

MaintenanceManager_20.docx

Version: 1.0.23230

Page 14 of 21

Maintenance Manager 2.0

Figure16: Delete client update packages

1.5.2 Creating update packages

You can combine and download update packages that have already been installed. For example, you can

then install the packages in another system.

Select  the  update  packages  and  click  the  function  Create  UPD.  Use  the  function  Download  UPD  to

download the generated update package.

Generate separately the update package for the web service provider (WSP) and the update package for

the MOC. To copy a system, you must generate a WSP package and an MOC package , both including

all update packages, and install them all in the new system.

1.5.3 Activating the software status

Menu item: Activate

During the activation of the local runtime structure, all libraries are gathered into one web application. This

application is activated in the Tomcat (if the application is already available, the old one is removed and

replaced with the new one).

Then the files are automatically activated in JHYDRADIR.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 15 of 21

Maintenance Manager 2.0

Figure 17: Activation of the software status

Use the button Activate.

Figure 18: Activation update packages

The activation takes approx. 3-5 minutes and is then confirmed.

Figure 19: Progress during update

MaintenanceManager_20.docx

Version: 1.0.23230

Page 16 of 21

When using Tomcat 6, the activation might be interrupted if the server is overloaded due to an increased

number of activation processes.  In this case, an error message occurs.  Any other activations are only

Maintenance Manager 2.0

available after a restart.

  Other functions

1.6.1 Request version of the Java components

Menu item: Current versions→ WSP versions

The version request provides the following data:

  Component name

  Component title

  Component version

  Supplier (vendor) of the component

  Modified on (date of component change)

Figure 20: Version information WSP

A comparison of versions provides the same data for the versions in the runtime structure and for active

versions.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 17 of 21

Maintenance Manager 2.0

1.6.2 Request version of the client components

The version request provides the following data:

  Component name

  Component title

Figure 21: Version information MOC

1.6.3 Administration

Menu item: System administration → Path configuration

The  menu  point  System  Administration  contains  functions  to  maintain  HYDRA  paths  and  to  manage

logged users.  This area of the application requires access data of a HYDRA user.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 18 of 21

Maintenance Manager 2.0

1.6.3.1

Editing HYDRA paths

Use the  Path configuration of the Maintenance Manager to  view, create, edit,  delete, and copy HYDRA

paths.  In  the  path  configuration  of  the  Maintenance  Manager,you  can  edit  the  same  fields  as  in  the

HYDRA path configuration. The HYDRA Documentation can be used to describe the values.

Menu item: System administration → Path configuration

Figure 22: Maintenance of HYDRA paths

1.6.3.2  Administration of logged in users

Menu item: System administration → Logged in users

MaintenanceManager_20.docx

Version: 1.0.23230

Page 19 of 21

Open the administration of logged in users to lock other users in the current Maintenance Manager.

Maintenance Manager 2.0

Figure 23: Administration of logged in users

Click Logout to log off the selected users. You can select multiple users (CTRL + mouse click).

Logout all logs off all users logged in.

A confirmation prompt is displayed for both functions.

Figure 24 Confirmation prompt

Use this icon and table to document notes (template).

MaintenanceManager_20.docx

Version: 1.0.23230

Page 20 of 21

Maintenance Manager 2.0

Use this icon and table to document warnings (template).

... is only available if the extension <<Authorization key>> is activated.

MaintenanceManager_20.docx

Version: 1.0.23230

Page 21 of 21

