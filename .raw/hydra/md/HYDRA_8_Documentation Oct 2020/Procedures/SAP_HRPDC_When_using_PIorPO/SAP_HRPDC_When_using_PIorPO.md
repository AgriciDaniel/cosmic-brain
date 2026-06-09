Configuration when using SAP PI / SAP PO

1  Configuration when using SAP PI / SAP PO

Changing the program call for sap45rck.exe/out

When using PI/PO, you have to change the program call for the upload program myerprck.exe/out in the

HYDRA Scheduler:

Situation

Value

Default program call (Windows) as delivered

sh.exe ./sap45rck.scr -K

Call including PI/PO (Windows)

sh.exe ./sap45rck.scr -K -B

Default program call (Linux) as delivered

./sap45rck.scr -K > /dev/null 2> /dev/null

Call including PI/PO (Linux)

./sap45rck.scr -K -B > /dev/null 2> /dev/null

Changing the segment name in the distribution model

Create  the  entry  in  the  HYDRA  distribution  model  in  order  to  transfer  clocking  records  as  outbound

configuration based on the following values:

Parameter name

Value

Message type

HRCC1UPTEVEN

Description

IDoc type

HR-PDC – Upload clocking records

HRCC1UPTEVEN01

Retention period

10

Log. target system

Created logical system

Segment name 1

E2BPCC1UPTEVEN000

Create the entry in the HYDRA distribution model in order to request the upload as inbound message type

based on the following values:

SAP_HRPDC_When_using_PIorPO.docx  Version: 1.0.18468

Page 1 of 2

Configuration when using SAP PI / SAP PO

Parameter name

Value

Message type

HRCC1REQUPTEVEN

Priority

Command

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BPCC1UPTEVEN000

Description

HR-PDC – Request upload

Log. target system

Created logical system

Retention period

10

SAP_HRPDC_When_using_PIorPO.docx  Version: 1.0.18468

Page 2 of 2

