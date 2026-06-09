Application-Relevant Settings in HYDRA

1  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model - inbound processing

Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:

Name of the parameter

Value

To process production orders

Message type

Priority

Command

PPCC2RECORDER

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

Log. Target system

Storage duration

To process the upload request

Message type

Priority

Command

PP-PDC – Download of production orders

Created logical system

10

PPCC2REQCONF

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BP_PP_TIMETICKET

Description

Log. Target system

Storage duration

To process variances

Message type

Priority

Command

PP-PDC – Upload request

Created logical system

10

DIFFE2

None

mle72imp.scr

Command parameter

/VARIANTE =<<MLE variant to be used>

Description

Log. Target system

Storage duration

PP-PDC – Variances

Created logical system

10

SAP_PPPDC_Customizing_HYDRA.docxVersion: 1.0.18468

Page 1 of 3

Application-Relevant Settings in HYDRA

Name of the parameter

Value

To process general quantity units

Message type

Priority

Command

UNIT2

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

Log. Target system

Storage duration

To process material-dependent quantity units

Message type

Priority

Command

PP-PDC – Gen. qty. unit

Created logical system

10

UNIMA2

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

Log. Target system

Storage duration

PP-PDC – Gen. qty. unit

Created logical system

10

Maintenance of the HYDRA distribution model - outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Name of the parameter

Value

To upload time tickets

Message type

Description

IDoc type

Storage duration

Log. target system

Segment name 1

PPCC2PRETTICKET

PP-PDC – Upload of time tickets

PPCC2PRETTICKET01

10

Created logical system

E2BP_PP_TIMETICKET

SAP_PPPDC_Customizing_HYDRA.docxVersion: 1.0.18468

Page 2 of 3

Application-Relevant Settings in HYDRA

Activation of initial download

Since program version

.\lib\b_anr.dll

V8.1.1.326

the initial download function needs to be enabled explicitly for security reasons.

Create  the  following  entry  in  the  HYDRA  INI  configuration  if  you  would  like  to  enable  the  initial
download function for the system:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

SAP

INITIAL_DOWNLOAD_ACTIVATION

ACTIV_TILL

<date in the format MM/DD/YYYY>

Yes

Activation of the initial download

Behavior when deleting interrupted operations

Specific  application  functions  of  the  production  order  or  its  operations  result  in  a  deletion  download
from SAP to HYDRA. This includes, among other things:

  Setting of a deletion flag
  Technical completion in SAP

By default, data of an interrupted operation will be deleted if the deletion download arrives in HYDRA.

However,  special  customizing  settings  within  order  status  assignment  can  prevent  this  process.  The
following configurations have to be set e.g. for the “interrupted” operation status:

Field

Alterable order data

Action

Value

J or M

E or X

SAP_PPPDC_Customizing_HYDRA.docxVersion: 1.0.18468

Page 3 of 3

