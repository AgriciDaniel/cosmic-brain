|     |     |     |     | Station Andon Board: Configuration  |     |     |
| --- | --- | --- | --- | ----------------------------------- | --- | --- |

1  Station Andon Board: Configuration
Configuration of the MQTT Broker
Set the following entry in the HYDRA INI configuration to configure the MQTT broker in the DMC
environment:
| Parameter name  |     | Value                       |                                     |         |     |         |
| --------------- | --- | --------------------------- | ----------------------------------- | ------- | --- | ------- |
| INI name        |     | DMC_MQTT                    |                                     |         |     |         |
| Section         |     | SERVERCONFIGURATION         |                                     |         |     |         |
| Key             |     | HOST                        |   Host of the MQTT broker.          |         |     |         |
|                 |     | PORT                        |   Port of the MQTT broker.          |         |     |         |
|                 |     | USERNAME                    | User name to log on to the broker.  |         |     |         |
|                 |     | PASSWORD                    | Password to log on to the broker.   |         |     |         |
|                 |     | USERID                      | the USERID is optional.             |         |     |         |
|                 |     |                             |   Add an internally generated ID    |         |     | to the  |
|                 |     | USERID                      | to                                  | define  | a   | client  |
|                 |     |                             |   distinctly.                       |         |     |         |
| Value           |     | Value of the relevant key.  |                                     |         |     |         |
| Active          |     | Yes                         |                                     |         |     |         |
| Comment         |     | Host of the MQTT broker.    |                                     |         |     |         |

The MQTT configuration in the DMC environment in the HYDRA INI configuration is not required
as of service pack 15 or with MW 4.x.

Installation MQTT Broker
You need to install the MQTT Broker in an instance only once.

| Setup_StationAndon.docx  |     | Version: 1.2.18513  |     |     |     | Page 1 of 3  |
| ------------------------ | --- | ------------------- | --- | --- | --- | ------------ |

Station Andon Board: Configuration
If the HYDRA server runs in a Windows-based operating system, the 'Visual C++ Redistributable
Package for Visual Studio 2013' must already have been installed before the installation of the
MQTT Broker.
In the HYDRA server, call the Maintenance Manager 2 for the instance where the centralized MDE should
run.
In the menu Settings, change to tab EMQTT settings.
The ports are preallocated and should only be changed after contacting MPDV.
If a firewall is used, the ports must be enabled for the MQTT Broker.
Click the button Install EMQTT. A pop-up window shows the installation progress:
If the system runs in a Windows-based operating system, a pop-up window is displayed at the end of the
installation. Run the script that is specified in the pop-up window. Make sure that you run the script as
administrator.
Setup_StationAndon.docx Version: 1.2.18513 Page 2 of 3

|     |     |     | Station Andon Board: Configuration  |     |
| --- | --- | --- | ----------------------------------- | --- |

Path configuration for storing global layouts
Create an entry in the Path configuration to store global layouts for all clients:
| Parameter name  |     | Value                                           |     |     |
| --------------- | --- | ----------------------------------------------- | --- | --- |
| Path            |     | Fixed "DMCSTATA“                                |     |     |
| Protocol        |     | file                                            |     |     |
| Host            |     | localfile                                       |     |     |
| Port            |     | 0                                               |     |     |
| URL path        |     | Explicit path to access the HYDRA server, e.g.  |     |     |
d:\hydra\1\dmc_stata_layouts
| Description  |     | Path for DMC Station Andon Board layouts.  |     |     |
| ------------ | --- | ------------------------------------------ | --- | --- |

| Setup_StationAndon.docx  |     | Version: 1.2.18513  |     | Page 3 of 3  |
| ------------------------ | --- | ------------------- | --- | ------------ |