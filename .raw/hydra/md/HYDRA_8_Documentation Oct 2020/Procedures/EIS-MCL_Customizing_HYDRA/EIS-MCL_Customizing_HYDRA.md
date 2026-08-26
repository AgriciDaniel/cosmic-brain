Settings Relevant to the Application in HYDRA
1 Settings Relevant to the Application in HYDRA
Maintenance of the distribution model - HYDRA inbound processing
Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:
Parameter name Value
To process material staging/material supply
Message type ZMBEW
Priority None
Command mle72imp.scr
Command parameter /VARIANTE=<MLE variant to be used
Description Material staging ERP  HYDRA
Log. target system Created logical system
Storage duration 10
Please restart HYDRA after editing entries.
Maintenance of the distribution model - HYDRA outbound processing
Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:
Parameter name Value
To upload material withdrawals (consumptions):
Message type ZWAU
Description Upload material withdrawals
EIS-MCL_Customizing_HYDRA.docx Version: 1.5.18468 Page 1 of 6

Settings Relevant to the Application in HYDRA
Parameter name Value
IDoc type ZWAU
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2WAU000X000
To upload incoming materials:
Message type ZWEI
Description Upload incoming materials
IDoc type ZWEI02
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2WEI000X000
To upload the usage decision
Message type ZCNRVEW
Description Upload of the usage decision
IDoc type ZCNRVEW02
Storage duration 10
Log. target system Created logical system
Segment name 1 Z2CNRVEW000X000
Scheduler maintenance
The following entries must be made for confirmations/uploads of goods movements in the Scheduler:
Parameter name Value
EIS-MCL_Customizing_HYDRA.docx Version: 1.5.18468 Page 2 of 6

Settings Relevant to the Application in HYDRA
Parameter name Value
To upload incoming materials:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZWEI
Command (Unix): ./myerprck.scr /MESTYP=ZWEI
Comment: Goods receipt HYDRA  ERP
Interval 5
To upload material consumptions:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZWAU
Command (Unix): ./myerprck.scr /MESTYP=ZWAU
Comment: Goods issue HYDRA  ERP
Interval 5
To upload the usage decision:
Product key MPL-BP
License key MPL-BP
Command (Windows): sh.exe ./myerprck.scr /MESTYP=ZCNRVEW
Command (Unix): ./myerprck.scr /MESTYP=ZCNRVEW
Comment: Usage decision HYDRA  ERP
Interval 5
To upload incoming material:
EIS-MCL_Customizing_HYDRA.docx Version: 1.5.18468 Page 3 of 6

    Settings Relevant to the Application in HYDRA

| Parameter name      | Value                  |     |
| ------------------- | ---------------------- | --- |
| Product key         | MPL-BP                 |     |
| License key         | MPL-BP                 |     |
| Command (Windows):  | sh.exe ./hysapupl.scr  |     |
/UPLSEGNAM=Z2WEI000X000 /SINGLE_IDOC
/SUBLEVEL=2
| Command (Unix):  | ./hysapupl.scr  | /UPLSEGNAM=Z2WEI000X000  |
| ---------------- | --------------- | ------------------------ |
/SINGLE_IDOC /SUBLEVEL=2
| Comment:  | Upload of incoming goods HYDRA  ERP  |     |
| --------- | ------------------------------------- | --- |
| Interval  | 5                                     |     |
To upload outgoing material:
| Product key         | MPL-BP                 |     |
| ------------------- | ---------------------- | --- |
| License key         | MPL-BP                 |     |
| Command (Windows):  | sh.exe ./hysapupl.scr  |     |
/UPLSEGNAM=Z2WAU000X000
| Command (Unix):  | ./hysapupl.scr /UPLSEGNAM=Z2WAU000X000  |     |
| ---------------- | --------------------------------------- | --- |
| Comment:         | Upload goods issues HYDRA  ERP         |     |
| Interval         | 5                                       |     |
To upload the usage decision
| Product key         | MPL-BP                 |     |
| ------------------- | ---------------------- | --- |
| License key         | MPL-BP                 |     |
| Command (Windows):  | sh.exe ./hysapupl.scr  |     |
/UPLSEGNAM=Z2CNRVEW000X000
| Command (Unix):  | ./hysapupl.scr  |     |
| ---------------- | --------------- | --- |
/UPLSEGNAM=Z2CNRVEW000X000

EIS-MCL_Customizing_HYDRA.docx  Version: 1.5.18468  Page 4 of 6

    Settings Relevant to the Application in HYDRA

| Parameter name  | Value                            |     |     |     |
| --------------- | -------------------------------- | --- | --- | --- |
| Comment:        | Upload goods issues HYDRA  ERP  |     |     |     |
| Interval        | 5                                |     |     |     |

Activation in material type
Set the indicator Goods movements > Transfer to interface for the material types, for which a transfer of
the material movements is necessary.
In case the HYDRA material type is not available as application, the indicator can also be set
directly via the database:
  update hz_typen set we_ext_kz = ‚J‘ where hz_typ = ‘<Material type for
which the indicator is to be set>’;
INI-Configuration for segment Z2CNR_USRFLD000X000
Provided with version 1.8 of the script mle_rckmestyp_zwei_out.hsc there is the option to transfer/upload
the user fields of a batch as well. The transfer/upload has to be activated explicitly in the HYDRA INI
configuration.
| Parameter name  | Value                                      |     |      |          |
| --------------- | ------------------------------------------ | --- | ---- | -------- |
| INI name        | MCL                                        |     |      |          |
| Section         | ZWEI                                       |     |      |          |
| Key             | USERFIELDS                                 |     |      |          |
| Value           | J / Y  Transfer of the user field segment  |     |      |          |
| Active          | Ja (yes)                                   |     |      |          |
| Comment         | Transfer                                   | of  | the  | segment  |
Z2CNR_USRFLD000X000

EIS-MCL_Customizing_HYDRA.docx  Version: 1.5.18468  Page 5 of 6

    Settings Relevant to the Application in HYDRA

INI configuration for the segment Z2CNRATT_N001X000
Provided with version 1.72946 of the script mle_rckmestyp_zwei_out.hsc there is the option to use
Z2CNRATT_N001X000 to upload numeric batch attributes. Depending on the product version in use, the
segment has to be activated manually in HYDRA INI configuration:
| MPL/TRT 8.1  | MPL/TRT 8.2  |     |     |
| ------------ | ------------ | --- | --- |
Uploads via segment Z2CNRATT_N001X000 must  For new installations after SP7/2015 the segment
| be enabled manually.  | is used by default.  |     |     |
| --------------------- | -------------------- | --- | --- |
For installations prior to that date the segment has
to be enabled manually.

The transfer/upload has to be activated explicitly in the HYDRA INI configuration.
| Parameter name  | Value             |          |          |
| --------------- | ----------------- | -------- | -------- |
| INI name        | MCL               |          |          |
| Section         | ZWEI              |          |          |
| Key             | CNRATTR_DEC_13_3  |          |          |
| Value           | J / Y  Transfer   | of  the  | segment  |
Z2CNRATT_N001X000
| Active   | Ja (yes)                                   |     |     |
| -------- | ------------------------------------------ | --- | --- |
| Comment  | Transfer of the segment Z2CNRATT_N001X000  |     |     |

EIS-MCL_Customizing_HYDRA.docx  Version: 1.5.18468  Page 6 of 6