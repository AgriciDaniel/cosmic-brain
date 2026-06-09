Application-Relevant Settings in HYDRA

1  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model – inbound processing

Edit entries for HYDRA inbound processing in the HYDRA distribution model:

Parameter name

Value

For processing of network plans

Message type

Priority

Command

OPERA4

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to be used>

Description

PS-CC4 – Download of network plans

Log. target system

Created logical system

Storage duration

10

For processing of upload request

Message type

Priority

Command

REQUI4

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2CONF7

Description

PS-CC4 – Upload request

Log. target system

Created logical system

Storage duration

10

SAP_PSCC4_Customizing_HYDRA.docx  Version: 1.3.18468

Page 1 of 3

Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model – outbound processing

Edit entries for the HYDRA outbound processing in the HYDRA distribution model:

Parameter name

Value

For uploading time tickets

Message type

CONF42

Description

IDoc type

Storage duration

PS-CC4 – Upload of time tickets

CONF42

10

Log. target system

Created logical system

Segment name 1

E2CONF7

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

<Date value in the format MM/DD/YYYY>

Yes

SAP_PSCC4_Customizing_HYDRA.docx  Version: 1.3.18468

Page 2 of 3

Application-Relevant Settings in HYDRA

Parameter name

Value

Comment

Activation of initial download

SAP_PSCC4_Customizing_HYDRA.docx  Version: 1.3.18468

Page 3 of 3

