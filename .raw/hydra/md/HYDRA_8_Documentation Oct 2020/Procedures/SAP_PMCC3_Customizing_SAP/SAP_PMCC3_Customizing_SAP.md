Application-Relevant settings in SAP
1 Application-Relevant Settings in SAP
Customizing the order type
In SAP the CA-PDC interface (KK3) will only take those maintenance and service orders into account for
which the order type has been marked as “BDE-active”. This is marked in Customizing (OIOE).
For each relevant combination of plant and order type the indicator “BDE-active” must be set.
Maintenance at the workplace
Once an order type is identified as “BDE-active” the CA-PDC interface (KK3) will only take those
transactions into account for which at least one subsystem grouping is saved to the workplace.
The subsystem grouping at the workplace is maintained using the workplace maintenance (CR02/ IR02)
 basic data  subsystems. There, the relevant subsystem can be selected from several saved
subsystems.
Definition of new subsystem groupings
To the extent that the subsystem groupings included in the SAP delivery do not suffice, it is possible to
define new ones using SAP Customizing - SPRO  Personnel time management  Business data
collection  General settings  Define grouping for subsystem connection.
Setting of the posting times
Depending on the settings in SAP, the CA-PDC interface (KK3) supports two confirmation scenarios:
 Immediate posting
If the “Immediate posting” indicator is active in Customizing (CI31), HYDRA will immediately post
time ticket confirmations transferred to SAP. If this posting cannot be made - if for example a
maintenance or service order is being blocked - the confirmations will stay prebooked and will be
posted during the next posting run.
 Posting using Job
If the "Immediate posting“ indicator is not set in Customizing (CI31), the confirmations will be
prebooked. They will then be posted later depending on the job, using Job CIP3.
SAP_PMCC3_Customizing_SAP.docx Version: 1.0.1362 Page 1 of 4

|     |     |     |     | Application-Relevant settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

Planning of relevant jobs
The following programs/ reports must be planned as job to ensure that the PP-PDC interface will operate
automatically:
| Program/ Report  |     | Meaning  |     | Please note:  |
| ---------------- | --- | -------- | --- | ------------- |
CIBDOPDE  Download  maintenance/  service  Planning with one variant
orders
SAPCDUP3  Download of the upload request  Planning with one variant

Maintenance of the SAP partner agreement/profile – outbound processing
| Name of the parameter  |     |     | Value  |     |
| ---------------------- | --- | --- | ------ | --- |
To download PM/ CS orders
| Partner number    |     |     | Created logical system     |     |
| ----------------- | --- | --- | -------------------------- | --- |
| Partner type      |     |     | LS                         |     |
| Message type      |     |     | OPERA3                     |     |
| Message function  |     |     | APP/ UPD/ DEL              |     |
| Receiver port     |     |     | Created port               |     |
| Package size      |     |     | 1                          |     |
| Output mode       |     |     | Transmit IDoc immediately  |     |
| Basis type        |     |     | OPERA3                     |     |
To download the upload request
| Partner number  |     |     | Created logical system  |     |
| --------------- | --- | --- | ----------------------- | --- |
| Partner type    |     |     | LS                      |     |
| Message type    |     |     | REQUI3                  |     |

SAP_PMCC3_Customizing_SAP.docx  Version: 1.0.1362  Page 2 of 4

Application-Relevant settings in SAP
Name of the parameter Value
Message function REQ
Receiver port Created port
Package size 1
Output mode Transmit IDoc immediately
Basis type REQUI3
Maintenance of the SAP partner agreement/profile – inbound processing
Maintain the following settings for inbound processing in the partner agreement/profile in SAP (WE20)
Name of the parameter Value
Partner number Created logical system
Partner type LS
Message type CONF32
Transaction code CON5
Maintenance of the SAP distribution model - outbound processing
Name of the parameter Value
To download PM/ CS orders
Model view Created model view
Sender/ Client Logical system of the client
Recipient/ Server Logical system for the recipient system
Message type OPERA3
Filter If necessary, maintain the BDE grouping as filter
SAP_PMCC3_Customizing_SAP.docx Version: 1.0.1362 Page 3 of 4

|     |     |     |     | Application-Relevant settings in SAP  |
| --- | --- | --- | --- | ------------------------------------- |

| Name of the parameter  |     |     | Value  |     |
| ---------------------- | --- | --- | ------ | --- |
criterion
To download the upload request
| Model view         |     |     | Created model view                       |     |
| ------------------ | --- | --- | ---------------------------------------- | --- |
| Sender/ Client     |     |     | Logical system of the client             |     |
| Recipient/ Server  |     |     | Logical system for the recipient system  |     |
| Message type       |     |     | REQUI3                                   |     |

Maintenance of the SAP distribution model - inbound processing
| Name of the parameter  |     |     | Value  |     |
| ---------------------- | --- | --- | ------ | --- |
To upload time tickets
| Model view         |     |     | Created model view                    |     |
| ------------------ | --- | --- | ------------------------------------- | --- |
| Sender/ Client     |     |     | Logical system for the sender system  |     |
| Recipient/ Server  |     |     | Logical system of the client          |     |
| Message type       |     |     | CONF32                                |     |

Relevant transactions
| Transaction  |     | Meaning           |               | Please note:  |
| ------------ | --- | ----------------- | ------------- | ------------- |
| CI32         |     | Initial download  |               |               |
| CI34         |     | Download          | maintenance/  | service  -    |
orders as delta download
| CI35  |     | Download of the upload request   |     | -   |
| ----- | --- | -------------------------------- | --- | --- |
| IW46  |     | Reworking of incorrect postings  |     | -   |

SAP_PMCC3_Customizing_SAP.docx  Version: 1.0.1362  Page 4 of 4