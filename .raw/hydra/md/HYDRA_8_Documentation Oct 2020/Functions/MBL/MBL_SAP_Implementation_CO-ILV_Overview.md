Abbildung CO-ILV in HYDRA
1 Mapping CO-ILV in HYDRA
In the course of a connection of HYDRA to SAP CO, HYDRA must collect CO-relevant data and upload
them to SAP. As data basis serve both, the CO internal orders transferred from SAP to HYDRA and
orders that were created in HYDRA and that include the specific data required for the confirmation in
accordance with the creation convention.
The trigger to download CO internal orders comes from R/3. The data are transferred in an IDoc
(intermediate document) and maintained in HYDRA. In principle, internal orders are transferred by two
methods. On the one hand, it is possible to use the default interface HR-PDC to transfer internal orders to
HYDRA. It is true that this method uses the SAP default but in the same time it has the disadvantage that
the used structure is very narrow and does not include several often required data types (such as start
and end date or scheduled workplace).
Next to this method, it is also possible to transfer CO-internal orders in a customer-specific IDoc in the
HYDRA BAPI format. To use this method, a customer-specific function module is necessary which
selects the required data in SAP, transfers them to an IDoc and passes them then on to HYDRA.
To realize confirmations referred to cost centers to SAP CO there is also the possibility to create
overhead cost orders in HYDRA and to realize the confirmation to specific cost centers. This is only
possible if the sending and/or receiving cost center and an activity type are stored to HYDRA.
The upload of the confirmations is controlled via HYDRA in accordance with the requirements specified
by the user. In these instances is it not important whether these are confirmations of CO-internal orders or
for orders created in HYDRA.
To realize the communication with the BDE subsystems, SAP provides several standard-BAPIs/ IDocs via
the CO-interface. The following BAPIs/ IDocs are used:
MBL_SAP_Implementation_CO-ILV_Overview.docxVersion: 1.0.1362 Page 1 of 3

|     |     |     |     | Abbildung CO-ILV in HYDRA  |
| --- | --- | --- | --- | -------------------------- |

Download of CO-internal orders (customer-specific):
| IDoc type:     | ZHYDRA_CO_ORDER  |     |     |     |
| -------------- | ---------------- | --- | --- | --- |
| Message type:  | ZHYDRA_CO_ORDER  |     |     |     |
| Segment type:  | Z1BAPI000        |     |     |     |
Upload of confirmations (direct activity allocation):
| IDoc type:     | ACC_ACT_ALLOC02     |     |     |     |
| -------------- | ------------------- | --- | --- | --- |
| Message type:  | ACC_ACT_ALLOC       |     |     |     |
| Segment type:  | E1ACC_ACT_ALLOC000  |     |     |     |
|                | E1BPDOCHDRP000      |     |     |     |
|                | E1BPAAITM002        |     |     |     |
Upload of confirmations (indirect activity allocation):
| IDoc type:     | ACC_SENDER_ACTIVITIES01  |     |     |     |
| -------------- | ------------------------ | --- | --- | --- |
| Message type:  | ACC_SENDER_ACTIVITIES    |     |     |     |
| Segment type:  | E1ACC_SENDER_ACTIVITIES  |     |     |     |
|                | E1BPDOCHDRP000           |     |     |     |
|                | E1BPIAITM000             |     |     |     |

MBL_SAP_Implementation_CO-ILV_Overview.docxVersion: 1.0.1362  Page 2 of 3

|     |     | Abbildung CO-ILV in HYDRA  |
| --- | --- | -------------------------- |

MBL_SAP_Implementation_CO-ILV_Overview.docxVersion: 1.0.1362  Page 3 of 3