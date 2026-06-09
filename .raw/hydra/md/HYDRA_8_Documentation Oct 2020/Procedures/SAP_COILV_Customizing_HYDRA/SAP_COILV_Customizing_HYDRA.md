Anwendungsrelevante Einstellungen HYDRA

1

 Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model – outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Parameter name

Value

To upload the time tickets for direct activity allocation

Message type

Description

IDoc type

Storage duration

Log. target system

Segment name 1

ACC_ACT_ALLOC

CO-ILV – Direct activity allocation

ACC_ACT_ALLOC02

10

Created logical system

E2ACC_ACT_ALLOC000

To upload the time tickets for indirect activity allocation

Message type

Description

IDoc type

Storage duration

Log. target system

Segment name 1

ACC_SENDER_ACTIVITIES

CO-ILV – indirect activity allocation

ACC_SENDER_ACTIVITIES

10

Created logical system

E2ACC_SENDER_ACTIVITIES

Scheduler maintenance

The following entries must be made for confirmations/uploads of goods movements in the
Scheduler:

Parameter name

Value

To upload the time tickets for direct activity allocation – confirmation/upload program

Product key

License key

SAP-COILV

SAP-COILV

SAP_COILV_Customizing_HYDRA.docx  Version: 1.0.18468

Page 1 of 4

Anwendungsrelevante Einstellungen HYDRA

Parameter name

Value

Command (Windows):

Command (Unix):

Comment:

Interval

sh.exe ./myerprck.scr /MESTYP=ACC_ACT_ALLOC
/KAT=GK /UE_PARAMS="<configured variant>"

./myerprck.scr /MESTYP=ACC_ACT_ALLOC /KAT=GK
/UE_PARAMS="<configured variant>"

Direct activity allocation HYDRA  SAP

5

To upload the time tickets for direct activity allocation - upload client

Product key

License key

Command (Windows):

Command (Unix):

Comment:

Interval

SAP-COILV

SAP-COILV

sh.exe ./hysapupl.scr
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2

./hysapupl.scr
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2

Direct activity allocation HYDRA  SAP

5

To upload the time tickets for indirect activity allocation - confirmation program

Product key

License key

Command (Windows):

Command (Unix):

Comment:

Interval

SAP-COILV

SAP-COILV

sh.exe ./myerprck.scr /MESTYP=ACC_SENDER_ACTIVITIES
/KAT=GK /UE_PARAMS="<configured variant>"

./myerprck.scr /MESTYP= ACC_SENDER_ACTIVITIES
/KAT=GK /UE_PARAMS="<configured variant>"

Indirect activity allocation HYDRA  SAP

5

To upload the time tickets for indirect activity allocation - upload client

Product key

License key

SAP-COILV

SAP-COILV

SAP_COILV_Customizing_HYDRA.docx  Version: 1.0.18468

Page 2 of 4

Anwendungsrelevante Einstellungen HYDRA

Parameter name

Value

Command (Windows):

Command (Unix):

Comment:

Interval

sh.exe ./hysapupl.scr
/UPLSEGNAM=/UPLSEGNAM=E2ACC_SENDER_ACTIVITIES
/SINGLE_IDOC /SUBLEVEL=2

./hysapupl.scr
/UPLSEGNAM=/UPLSEGNAM=E2ACC_ACT_ALLOC000
/SINGLE_IDOC /SUBLEVEL=2

Direct activity allocation HYDRA  SAP

5

SAP_COILV_Customizing_HYDRA.docx  Version: 1.0.18468

Page 3 of 4

Anwendungsrelevante Einstellungen HYDRA

SAP_COILV_Customizing_HYDRA.docx  Version: 1.0.18468

Page 4 of 4

