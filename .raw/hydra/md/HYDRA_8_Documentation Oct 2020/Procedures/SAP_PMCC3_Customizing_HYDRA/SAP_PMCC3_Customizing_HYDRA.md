Anwendungsrelevante Einstellungen HYDRA

1

 Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model - inbound processing

Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:

Name of the parameter

Value

To process PM/ CS production orders

Message type

Priority

Command

OPERA3

None

mle72imp.scr

Command parameter

/VARIANT= <MLE variant to be used>

Description

PM-CC3 – download PM/ CS orders

Log. target system

Created logical system

Storage duration

10

To process the upload request

Message type

Priority

Command

REQUI3

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2CONF5

Description

PP-CC3 – Upload request

Log. target system

Created logical system

Storage duration

10

SAP_PMCC3_Customizing_HYDRA.docx Version: 1.0.18468

Page 1 of 3

Anwendungsrelevante Einstellungen HYDRA

Maintenance of the HYDRA distribution model - outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Name of the parameter

Value

To upload time tickets

Message type

CONF32

Description

IDoc-Typ

Storage duration

PP-CC3 – Upload time tickets

CONF32

10

Log. target system

Created logical system

Segment name 1

E2CONF5

Activation of initial download

As of program version

.\lib\b_anr.dll

V8.1.1.326

the initial download has to be enabled explicitly for security reasons.

Create the following entry in HYDRA INI configuration if you would like to activate the initial download for

the system:

Parameter name

INI name

Section

Key

Value

Active

Value

SAP

INITIAL_DOWNLOAD_ACTIVATION

ACTIV_TILL

<date value in the format MM/DD/YYYY>

Yes

SAP_PMCC3_Customizing_HYDRA.docx Version: 1.0.18468

Page 2 of 3

Anwendungsrelevante Einstellungen HYDRA

Parameter name

Value

Comment

Activation of initial download

SAP_PMCC3_Customizing_HYDRA.docx Version: 1.0.18468

Page 3 of 3

