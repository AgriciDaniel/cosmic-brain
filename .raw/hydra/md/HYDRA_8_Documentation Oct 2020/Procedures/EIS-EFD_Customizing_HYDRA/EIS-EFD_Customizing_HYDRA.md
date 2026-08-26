HYDRA Settings relevant for the Application

1  HYDRA Settings relevant for the Application

Proceed as described in the following to activate the interface for the upload of planning changes from the

HYDRA Shop Floor Scheduling (HLS):

Activating the logging

Edit the following entries in the Logging configuration:

Parameter name

For the scheduling of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

Value

HLS

EINPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

For the replanning of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

HLS

UMPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

For the deallocation of operations

Object

Action

Logging of dialog data

Logging

Comment

Labeling

HLS

AUSPLANEN

Yes

Entire object

No

No

Segment – for the upload to non-SAP systems

HY72ADRCK_SCHEDULE

Segment – for the upload to SAP systems

Z2HY72ADRCK_SCHEDULE000X000

EIS-EFD_Customizing_HYDRA.docx

Version: 1.3.18468

Page 1 of 4

HYDRA Settings relevant for the Application

Activating the upload for the order type

If required, activate for the relevant Order type (s) > Confirmation > Confirmation of planning changes in

shop floor scheduling:

Parameter name

Upload PPS operations only

Upload delayed operations only

Value

Activate if required

Activate if required

Upload operations with deviating assignment only

Activate if required

Upload PPS operations only

Upload PPS operations only

  If you activate this option, the operations created in HYDRA are not uploaded.

Upload delayed operations only

Upload delayed operations only

  If you activate this option, only delayed operations are uploaded.

Upload operations with deviating assignment only

Upload operations with deviating assignment only

  If  you  activate  this  option,  only  operations  are  uploaded  that  have  been  planned  for  another

workplace than the workplace initially transferred.

You can use the option Upload PPS operations only no matter whether the other options are enabled or

not.  But  you  can  only  enable  one  of  the  two  options  Upload  delayed  operations  only  and  Upload

operations with deviating assignment only.

Activating the upload in the scheduler

Use the HYDRA Scheduler to plan jobs for the outbound processing:

Parameter name

Value

Transfer of uploads to the  MLE outbound transactions

Product key

License key

Command (Windows):

Command (Unix):

Comment:

sh.exe ./myerprck.scr /LOGGING
/LOGGING_SEGNAM=HY72ADRCK_SCHEDULE

./myerprck.scr /LOGGING
/LOGGING_SEGNAM=HY72ADRCK_SCHEDULE

EIS-EFD: Upload of planning changes
-> MLE outbound transactions

EIS-EFD_Customizing_HYDRA.docx

Version: 1.3.18468

Page 2 of 4

HYDRA Settings relevant for the Application

Parameter name

Interval

Value

5

Upload of confirmations from the MLE outbound transactions to the ERP system

Product key

License key

Command (Windows) for the upload to
a non-SAP system:

sh.exe ./hysapupl.scr
/UPLSEGNAM=HY72ADRCK_SCHEDULE

Command (Windows) for the upload to
an SAP system:

sh.exe ./hysapupl.scr
/UPLSEGNAM=Z2HY72ADRCK_SCHEDULE000X000

Command  (Unix)  for  the  upload  to  a
non-SAP system:

./hysapupl.scr /UPLSEGNAM=HY72ADRCK_SCHEDULE

Command  (Unix)  for  the  upload  to  an
SAP system:

./hysapupl.scr
/UPLSEGNAM=Z2HY72ADRCK_SCHEDULE000X000

Comment:

Interval

EIS-EFD: Upload of planning changes MLE outbound
transactions -> ERP system

5

Editing the HYDRA distribution model – output for non-SAP systems

Use the HYDRA distribution model to edit an entry for the HYDRA outbound processing:

Parameter name

To upload time tickets

Message type

Description

IDoc type

Retention period

Log. target system

Segment name 1

Value

HY72ADRCK_SC

EIS-EFD – upload of planning changes

HY72ADRCK_SC

10

Created logical system

HY72ADRCK_SCHEDULE

Editing the HYDRA distribution model – output for SAP systems

Use the HYDRA distribution model to edit an entry for the HYDRA outbound processing:

Parameter name

To upload time tickets

Message type

Description

IDoc type

Retention period

Value

ZHY72ADRCK_SC

EIS-EFD – upload of planning changes

ZHY72ADRCK_SC01

10

EIS-EFD_Customizing_HYDRA.docx

Version: 1.3.18468

Page 3 of 4

HYDRA Settings relevant for the Application

Parameter name

Log. target system

Segment name 1

Value

Created logical system

Z2HY72ADRCK_SCHEDULE000X000

EIS-EFD_Customizing_HYDRA.docx

Version: 1.3.18468

Page 4 of 4

