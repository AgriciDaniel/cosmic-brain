|     |     |     | Mapping of SAP-PPREM in HYDRA  |
| --- | --- | --- | ------------------------------ |

1  Mapping of SAP-PPREM in HYDRA
Usage
In the context of connecting HYDRA to SAP PM-REM, it is the task of HYDRA to collect actual data in the
production process and to upload the collected actual quantities (yield and scrap quantities) to SAP PP-
REM. Requirements represent the data basis in SAP R/3. With regard to these requirements, planned
orders are created as replenishment elements in the course of the MRP run in SAP. These created
planned orders are adopted from SAP and are used as the target for production in relation to time, date
and the quantity to be produced.
The download of planned orders is initiated cyclically by R/3. The data are stored in an IDoc (intermediate
document) and uploaded to HYDRA. In general, planned orders are not a constant unit. With each
planning run, requirements are re-calculated and new planned orders are created as replenishment
elements. Planned orders are transferred discretionally to HYDRA, i.e. for a transferred planned order
number, the system creates an order or operation record in HYDRA or runs an update for these values if
such records exist already. After order data adoption by HYDRA, the planned orders are ready for
collection as production orders of the order type "REM".
Uploading the confirmations from HYDRA is controlled in accordance with user requirements. In the
course of the confirmation, yield and scrap quantities are primarily transferred to SAP. The transfer of
recorded actual times is not supported by SAP.
Communication with SAP R/3 takes place via two technical interfaces:
Download of planned orders via LO-SCI:
| IDoc type:     | LOIPLO01     |     |     |
| -------------- | ------------ | --- | --- |
| Segment Type:  | E1PLAFL      |     |     |
|                |   E1PLOPL    |     |     |
|                |     E1PLUVL  |     |     |
|                |     E1KBEDL  |     |     |
|                |   E1RESBL    |     |     |
Upload of confirmations for storage scenario:
| BAPI:    | RepManConfirmation1  |     |     |
| -------- | -------------------- | --- | --- |
| Method:  | CreateMTS            |     |     |

MBL_SAP_Implementation_REM_Overview.docxVersion: 1.0.1362  Page 1 of 2

Mapping of SAP-PPREM in HYDRA
Planned Orders Download SAP  HYDRA
The download of data to HYDRA is initiated by R/3 through SAP workflow processes. The download of
planned orders is performed via the LO-SCI interface by means of IDoc LOIPLO01. The transfer is
always fully completed, which means that all planned orders available for the selection period chosen in
SAP are transferred to HYDRA. In HYDRA, these planned orders are created with the order type "REM".
Confirmation Upload HYDRA  SAP
The basis for confirmation to SAP are the log records collected in HYDRA. Depending on the
configuration, these may be T/U/E or H records. Collected yield and scrap quantities are uploaded
cyclically in accordance with the configuration in the HYDRA Scheduler. Confirmation is made through
the BAPI RepManConfirmation using the CreateMTS method via synchronous RFC (sRFC).
MBL_SAP_Implementation_REM_Overview.docxVersion: 1.0.1362 Page 2 of 2