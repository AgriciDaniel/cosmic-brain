Implementation of EMS
1 Implementation of EMS
Usage
Implement the connection to an Engel-Monitoring-System (EMS) if you use it in one production area at
least.
Requirements
You have activated the connection to the Engel-Monitoring-System in the Basic settings BDE  Other
settings  EMS machine interface.
Approach
Terminal configuration
Use the terminal configuration to select whether the EMS interfacing must be active at this terminal
(if this is terminal type CT 76x or CT 8xx).
Configuration machines/ workplaces
The serial number of the Engel machine may be stored under configuration of the machines/
workplaces. Since any information available in the Engel Monitoring System is based on the serial
number provided by the company Engel and since the customer can specify individual machine
numbers in HYDRA, this serial number is used for the communication between HYDRA and EMS.
Copying of a machine's status
With an Engel interfacing the machine statuses from 0 to 9799 are reserved for Engel (in line with
the Engel alarms that are automatically registered). These statuses are machine-specific and are
therefore not automatically copied when the machine status is copied to the extent that the EMS
interfacing is activated in the basic settings.
Recommendation for the machine status occupation in HYDRA for EMS machines:
Status Comment
0 - 9799 Alarms in accordance with the definition from EMS
9801 - Manual downtime causes according to the definition in EMS.
9899 The company Engel will only supply them on request
9900 Production
9901 Setup
9902-97 Only those downtime reasons that are manually defined in HYDRA
9998 Others: Alarm (here: unknown EMS alarm)
IMPLEMENTING_EMS.docx Version: 1.1.18468 Page 1 of 2

|     |     |     | Implementation of EMS  |     |
| --- | --- | --- | ---------------------- | --- |

Status  Comment
9999  General malfunction

| IMPLEMENTING_EMS.docx  |     | Version: 1.1.18468  |     | Page 2 of 2  |
| ---------------------- | --- | ------------------- | --- | ------------ |