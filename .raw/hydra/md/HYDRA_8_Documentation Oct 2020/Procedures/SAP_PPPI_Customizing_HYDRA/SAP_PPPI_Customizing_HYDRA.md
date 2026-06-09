Application-relevant settings in HYDRA

1  Application-relevant settings in HYDRA

Maintenance of the HYDRA distribution model - inbound processing

Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:

Name of the parameter

Value

To process production orders

Message type

PP_PI_PCS_HYDRA_INBOUND

Priority

Command

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to use>

Description

PP-PI – Download of process orders

Log. Target system

Created logical system

Storage duration

10

Maintenance of the HYDRA distribution model - outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Name of the parameter

Value

To upload phase confirmations

Message type

PI_PHCON

Description

IDoc-Typ

Storage duration

PP-PI – Upload of phase confirmations

PI_PHCON

10

Log. Target system

Created logical system

SAP_PPPI_Customizing_HYDRA.docx  Version: 1.1.20790

Page 1 of 3

Application-relevant settings in HYDRA

Name of the parameter

Value

Segment name 1

PI_PHCON

Maintenance of the tRFC-Destination

Also  for  the  MLE  upload  PP-PI-PCS  specific  settings  have  to  be  applied.  In  the  configuration  of  MLE

Logical System a new  entry  has to be applied for the program type “RFC-Client”. In that entry the RFC

destination name that has been created in SAP has be to provided.

Name of the parameter

Value

RFC_DESTINATION_FPR_TRFC

<Name of the RFC-destination created for HYDRA

in SAP (SM59)>

Configuration of the confirmation prefix

In  order  to  be  able  to  transfer  confirmations  from  several  HYDRA  systems  back  into  SAP  PP-PI,  an

unique identifier has to be applied. In case no INI-entry is given or the value is blank, the value “01” will

be used.

This prefix can be configured using HYDRA-INI-Configuration:

Parameter name

Value

INI-Name

Section

Key

Value

Active

Remark

PP-PI_PCS

PP-PI-PCS_MSID_PREFIX

KEY

<Value to be used as unique identifier>

Yes

PP-PI-PCS: Confirmation prefix

SAP_PPPI_Customizing_HYDRA.docx  Version: 1.1.20790

Page 2 of 3

Application-relevant settings in HYDRA

Maintenance of the HYDRA Scheduler

Use the HYDRA Scheduler to maintain entries for HYDRA outbound processing:

Parameter name

Value

To transfer confirmations from the application into the MLE outbound transactions

Product key

License key

SAP-PPPI

SAP-PPPI

Command (Windows):

sh.exe ./myerprck.scr /MESTYP=PI_PHCON /KAT=FA

Command (Unix):

./myerprck.scr /MESTYP=PI_PHCON /KAT=FA

Comment:

Intervall

SAP-PPPI: Confirmations  MLE outbound transactions

5

To transfer confirmations from the MLE outbound transactions to SAP PP-PI

Product key

License key

SAP-PPPI

SAP-PPPI

Command (Windows):

sh.exe

./hysapupl.scr

/UPLSEGNAM=PI_PHCON

/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON /PP-PI-PCS

Command (Unix):

./hysapupl.scr

/UPLSEGNAM=BFLUSHDATAMTS

/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON /PP-PI-PCS

Comment:

Intervall

SAP-PPPI: Confirmations MLE outbound transactions  SAP

5

SAP_PPPI_Customizing_HYDRA.docx  Version: 1.1.20790

Page 3 of 3

