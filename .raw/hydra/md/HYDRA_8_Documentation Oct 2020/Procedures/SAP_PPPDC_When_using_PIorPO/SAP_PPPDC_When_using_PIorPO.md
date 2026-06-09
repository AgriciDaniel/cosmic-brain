Configuration when using SAP PI / SAP PO

1  Configuration when using SAP PI / SAP PO

Configuration of upload requests in SAP

Assign the fields as described below to configure the job requesting uploads for the PP-PDC interface (SAP

transaction CI45N):

Parameter name

Value

Logical system

Empty or logical system created for HYDRA

- Request time ticket upload/confirmation

Leave empty / do not check

Request time ticket events

Leave empty / do not check

Assign the fields as described above if you carry out the transaction manually.

Changing the program call for myerprck.exe/out

When using PI/PO, you have to change the program call for the upload program myerprck.exe/out in the

HYDRA Scheduler:

Situation

Value

Default program call (Windows) as delivered

sh.exe ./myerprck.scr

/MESTYP=PPCC2PRETTICKET /KAT=FA

Call including PI/PO (Windows)

sh.exe ./myerprck.scr

/MESTYP=PPCC2PRETTICKET /KAT=FA /PI

Default program call (Linux) as delivered

./myerprck.scr

/MESTYP=PPCC2PRETTICKET

/KAT=FA > /dev/null 2> /dev/null

Call including PI/PO (Linux)

./myerprck.scr

/MESTYP=PPCC2PRETTICKET

/KAT=FA /PI > /dev/null 2> /dev/null

SAP_PPPDC_When_using_PIorPO.docx  Version: 1.0.18468

Page 1 of 3

Configuration when using SAP PI / SAP PO

Changing the segment name in the distribution model

Create the entry in the HYDRA distribution model in order to transfer time tickets as outbound configuration

based on the following values:

Parameter name

Value

Message type

PPCC2PRETTICKET

Description

IDoc type

PP-PDC – Upload of SAP time tickets

PPCC2PRETTICKET01

Retention period

10

Log. target system

Created logical system

Segment name 1

E2BP_PP_TIMETICKET000

Create the entry in the HYDRA distribution model in order to request the upload as inbound message type

based on the following values:

Parameter name

Value

Message type

PPCC2REQCONF

Priority

Command

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BP_PP_TIMETICKET000

Description

PP-PDC – Upload request

Log. target system

Created logical system

Retention period

10

Requirements

SAP_PPPDC_When_using_PIorPO.docx  Version: 1.0.18468

Page 2 of 3

Configuration when using SAP PI / SAP PO

Procedure

Result

SAP_PPPDC_When_using_PIorPO.docx  Version: 1.0.18468

Page 3 of 3

