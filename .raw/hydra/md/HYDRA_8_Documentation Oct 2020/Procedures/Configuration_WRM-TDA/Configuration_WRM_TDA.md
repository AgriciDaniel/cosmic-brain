|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

  WRM-TDA Configuration
|     | Installation HIM-Bridge  |     |     |     |
| --- | ------------------------ | --- | --- | --- |
  You must install the HIM-Bridge in the HYDRA server.
  Unpack the zip-file anywhere on the HYDRA server.
  Start the setup as the administrator using the file installer.exe.
  Enter the HYDRA instance number (in case of single-instance systems always 1 / with other
systems enter the number of the instance the bridge is installed for).

The host of the HYDRA server is localhost as the installation is run in the same system.

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 1 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

Enter the Tomcat port of the instance (usually 8080 for instance 1, 8081 for instance 2,... If you do not know
the port, you can look it up in the system list of the MOC logon window).

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 2 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

Enter the path to JHYDRADIR (usually the folder JHYDRADIR or JHYDRADIRX in the HYDRA directory)

Enter the port of the HIM-Bridge (usually the Tomcat port + 20000).

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 3 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

WRM-TDA Configuration
Confirm the data overview and finish the installation.
Test the HIM-Bridge by calling the following URL in a browser in the HYDRA server: http://localhost:<port
of HIM bridge>/version (e.g. http://localhost:28081/version).
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 4 of 12

WRM-TDA Configuration
Test the connection between the HIM-Bridge and HYDRA by calling the following URL in a browser in the
HYDRA server: http://localhost:<port of HIM bridge>/data/SYSSetup/list
Please note: Use a valid MOC user when asked to enter user and password.
Installation MDC (Machine data collector)
Unpack the zip file to the install location selected for MDC.
Open a prompt as administrator.
Go to the MDC installation directory. Install MDC as Windows service by using the following command
(replace HYDRA-X with the instance number - e.g. HYDRA-1-MDC):
bin\mpdv.MachineDataCollector.Console.exe --install HYDRA-X-MDC
Copy the file
<MDC directory>\bin\config\config_balluff.xml
to
%ProgramData%\mpdv\mdc\config_HYDRA-X-MDC.xml
(replace HYDRA-X-MDC with the name used above)
Open the configuration file previously created in an editor.
Set the port on which the http server listens to requests from Mold-ID. You can find the port in row 6 of the
configuration. The default port is 30080. In case of several HYDRA instances, use e.g. 30080 for instance
1, 30081 for instance 2, etc.
<Parameter Name="Config_Port" Value="30080" />
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 5 of 12

WRM-TDA Configuration
Configure the host / port that includes the HIM-Bridge of the HYDRA instance in row 9 of the configuration
(host name of the HYDRA server and port as assigned in chapter 1.1 on installing the HIM-Bridge).
<Parameter Name="RemoteEndpoint" Value="http://scc7:28081" />
Configure user name and password of an MOC user used for calling HYDRA web services. The user must
be available in HYDRA.
Please note: The encrypted password is stored in the configuration file. An MDC tool is used to encrypt the
password. You can call the tool in the command line as follows:
mpdv.MachineDataCollector.Console.exe --encode Password
<Parameter Name="UserName" Value="12345" />
<Parameter Name="Password" Value="J1FuIQ==" />
Start the created service.
Required HYDRA master data
Make sure that all tags connected via Mold-ID exist in HYDRA as a resource. Only then, the data can be
transferred into the system.
The tags attached via Mold-ID only have a "resource number" (form name). To identify a resource, HYDRA
actually uses a resource type + resource number.
For this reason, the resource type used with Mold-ID is permanently defined in the system.
Defining a resource type that will be used for all Mold-ID
tags
You can use e.g. the type MID as resource type for Mold-ID tags. Make the settings as displayed in the
screenshot.
Master data -> Resources -> Resource types
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 6 of 12

|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

|     | Defining statuses for the resource type  |     |     |     |
| --- | ---------------------------------------- | --- | --- | --- |
A tag can have 4 statuses. All 4 statuses must exist in HYDRA for the resource type that will be used. One
status must be configured as release status.
Define the 4 statuses as displayed in the screenshots.
Master data -> Resources -> Resource status

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 7 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 8 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

|     |     |     | WRM-TDA Configuration  |     |
| --- | --- | --- | ---------------------- | --- |

|     | Configuration of the resource type for Mold-ID tags  |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- |
Define the resource type that will be used for Mold-ID tags via the Advanced object configuration.
System administration -> System settings -> Advanced object configuration

| Configuration_WRM_TDA.docx  |     | Version: 1.0.8956  |     | Page 9 of 12  |
| --------------------------- | --- | ------------------ | --- | ------------- |

WRM-TDA Configuration
Creating the resource (per Mold-ID tag)
Create a resource with the previously defined type for each tag in HYDRA.
Master data -> Resources -> Resource configuration
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 10 of 12

WRM-TDA Configuration
Restrictions
The last device name of the Mold-ID tag is stored in HYDRA as Current storage location of the resource.
The value must not exceed 12 characters. If the value is longer, an error occurs and data cannot be
transferred.
Configuration in Mold-ID
Mold-ID needs to be configured to send data to the MDC server via http. You can make the configurations
in the web interface of Mold-ID.
Setup -> Mold ID
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 11 of 12

WRM-TDA Configuration
Check the option "Network Reporting: http".
IP address is the IP address of the system running MDC.
Port number is the port configured as "Config_Port" in MDC.
Path is the URL. Enter permanently the value "/MoldId/SendRfidData/" here.
Configuration_WRM_TDA.docx Version: 1.0.8956 Page 12 of 12