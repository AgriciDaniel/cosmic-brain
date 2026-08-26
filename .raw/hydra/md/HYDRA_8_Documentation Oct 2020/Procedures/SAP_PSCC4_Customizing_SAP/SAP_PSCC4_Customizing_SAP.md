Application-Relevant Settings in SAP
1 Application-Relevant Settings in SAP
Customizing of the order type
In SAP the CA-PDC interface (KK4) will only take those network plans into account for which the type has
been marked as “BDE-active”. This is configured as a part of the customizing process (OPUV).
For each relevant combination of plant and order type the indicator “BDE-active” must be set.
Maintenance at the workplace
Once an order type is identified as “BDE-active” the CA-PDC interface (KK4) will only take those
transactions into account for which at least one subsystem grouping is saved to the workplace.
The subsystem grouping at the workplace is maintained using the workplace maintenance (CR02/ IR02)
 basic data  subsystems. There, the relevant subsystem can be selected from several saved
subsystems.
Definition of new subsystem groupings
To the extent that the subsystem groupings included in the SAP delivery do not suffice, it is possible to
define new ones using SAP Customizing - SPRO  Personnel time management  Shop floor data
collection  General settings  Define grouping for subsystem connection.
Setting of the posting times
Depending on the settings in SAP, the CA-PDC interface (KK4) supports two upload scenarios:
 Immediate posting
If the “Immediate posting” indicator is active in customizing (CI36), HYDRA will immediately post
time ticket confirmations transferred to SAP. If this posting cannot be made - if for example the
network plan is being blocked - the uploads will stay prebooked and will be posted during the next
posting run.
 Posting using Job
SAP_PSCC4_Customizing_SAP.docx Version: 1.0.1362 Page 1 of 5

|     |     |     |     | Application-Relevant Settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

If the "Immediate posting“ indicator is not set in customizing, the uploads will be prebooked. They
will then be posted later depending on the job, using Job CIP4.
Planning of relevant jobs
The following programs/ reports must be planned as job to ensure that the PP-PDC interface will operate
automatically:
| Program/ Report  |     | Meaning                 |     | Please note:               |
| ---------------- | --- | ----------------------- | --- | -------------------------- |
| CIBDOPDE         |     | Download network plans  |     | Planning with one variant  |
SAPCDUP4  Download of the upload request  Planning with one variant

Maintenance of the SAP partner agreement/profile – outbound processing
| Name of the parameter  |     |     | Value  |     |
| ---------------------- | --- | --- | ------ | --- |
To download network plans
| Partner number    |     |     | Created logical system     |     |
| ----------------- | --- | --- | -------------------------- | --- |
| Partner type      |     |     | LS                         |     |
| Message type      |     |     | OPERA4                     |     |
| Message function  |     |     | APP/ UPD/ DEL              |     |
| Receiver port     |     |     | Created port               |     |
| Package size      |     |     | 1                          |     |
| Output mode       |     |     | Transmit IDoc immediately  |     |
| Basis type        |     |     | OPERA4                     |     |
To download the upload request
| Partner number  |     |     | Created logical system  |     |
| --------------- | --- | --- | ----------------------- | --- |
| Partner type    |     |     | LS                      |     |

SAP_PSCC4_Customizing_SAP.docx  Version: 1.0.1362  Page 2 of 5

Application-Relevant Settings in SAP
Name of the parameter Value
Message type REQUI4
Message function REQ
Receiver port Created port
Package size 1
Output mode Transmit IDoc immediately
Basis type REQUI4
Maintenance of the SAP partner agreement/profile – inbound processing
Maintain the following settings for inbound processing in the partner agreement/profile in SAP (WE20)
Name of the parameter Value
Partner number Created logical system
Partner type LS
Message type CONF42
Transaction code CON7
Maintenance of the SAP distribution model - outbound processing
Name of the parameter Value
To download PM/ CS orders
Model view Created model view
Sender/ Client Logical system of the client
Recipient/ Server Logical system for the recipient system
Message type OPERA4
SAP_PSCC4_Customizing_SAP.docx Version: 1.0.1362 Page 3 of 5

|     |     |     |     | Application-Relevant Settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

| Name of the parameter  |     |     | Value                                              |     |
| ---------------------- | --- | --- | -------------------------------------------------- | --- |
| Filter                 |     |     | If necessary, maintain the BDE grouping as filter  |     |
criterion
To download the upload request
| Model view         |     |     | Created model view                       |     |
| ------------------ | --- | --- | ---------------------------------------- | --- |
| Sender/ Client     |     |     | Logical system of the client             |     |
| Recipient/ Server  |     |     | Logical system for the recipient system  |     |
| Message type       |     |     | REQUI4                                   |     |

Maintenance of the SAP distribution model - inbound processing
| Name of the parameter  |     |     | Value  |     |
| ---------------------- | --- | --- | ------ | --- |
To upload time tickets
| Model view         |     |     | Created model view                    |     |
| ------------------ | --- | --- | ------------------------------------- | --- |
| Sender/ Client     |     |     | Logical system for the sender system  |     |
| Recipient/ Server  |     |     | Logical system of the client          |     |
| Message type       |     |     | CONF42                                |     |

Relevant transactions
| Transaction  |     | Meaning           |               | Please note:  |
| ------------ | --- | ----------------- | ------------- | ------------- |
| CI32         |     | Initial download  |               |               |
| CI34         |     | Download          | maintenance/  | service  -    |
orders as delta download
| CI35  |     | Download of the upload request  |     | -   |
| ----- | --- | ------------------------------- | --- | --- |

SAP_PSCC4_Customizing_SAP.docx  Version: 1.0.1362  Page 4 of 5

|     |     |     |     | Application-Relevant Settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

| IW46  |     | Reworking of incorrect postings  |     | -   |
| ----- | --- | -------------------------------- | --- | --- |

SAP_PSCC4_Customizing_SAP.docx  Version: 1.0.1362  Page 5 of 5