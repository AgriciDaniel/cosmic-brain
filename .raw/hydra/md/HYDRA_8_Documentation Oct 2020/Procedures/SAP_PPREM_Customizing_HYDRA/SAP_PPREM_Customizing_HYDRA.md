Application-Relevant Settings in HYDRA

1  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model – inbound

Maintain entries for HYDRA inbound processing in the HYDRA distribution model:

Parameter name

Value

To process production orders

Message type

Priority

Command

LOIPLO

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to be used>

Description

PP-REM– Download of planned orders

Log. Target system

Created logical system

Retention period

10

Configuration of segment sorting

It might be required to re-sort segments if the SAP message type LOIPLO is enhanced using the user exit

that is provided by default in SAP.

The  SAP  user  exit  allows  to  transfer  additional  data  (=  additional  segments).  However,  this  is  only

possible directly below the order header segment. If, for example, a component  record is transferred at

this position it cannot be posted, as the operations created by the standard segment are not yet available.

A  configuration  in  the  HYDRA  INI  configuration  file  allows  to  enhance  the  segment  number  (on  which

sequential  processing  is  based)  by  a  prefix  before  this  number  is  inserted  in  the  database  and,  as  a

result, to enable an alternative sorting.

The transfer of the planned order number is enabled as follows in the HYDRA-INI configuration:

Parameter name

Value

SAP_PPREM_Customizing_HYDRA.docx Version: 1.1.18468

Page 1 of  5

Parameter name

Value

Application-Relevant Settings in HYDRA

INI name

Section

Key

Value

Active

Comment

HYALESRV

<MESTYP>_SORT

e.g. LOIPLO_SORT

<Segment name>

e.g. Z2BAPI000

<prefix>

e.g. Z

Yes

PP-REM – setting of the segment sorting

The  service  “HYDRA<client  number>  MLE-Server  SAP  1“  has  to  be  restarted  to  activate  the

configuration.

Maintenance of the HYDRA distribution model – outbound

Edit an entry for HYDRA outbound processing in the HYDRA distribution model:

Parameter name

Value

To upload time tickets

Message type

REPMANCONFIRMATION1_CREATEMTS

Description

IDoc type

PP-REM – Upload

BFLUSHDATAMTS

Retention period

10

Log. target system

Created logicl system

SAP_PPREM_Customizing_HYDRA.docx Version: 1.1.18468

Page 2 of  5

Application-Relevant Settings in HYDRA

Parameter name

Value

Segment name 1

BFLUSHDATAMTS

Maintenance of the HYDRA Scheduler

Edit entries for HYDRA outbound processing in the HYDRA Scheduler:

Parameter name

Value

For uploads from the application to the MLE outbound transactions

Product key

License key

SAP-PPREM

SAP-PPREM

Command (Windows):

sh.exe

./myerprck.scr

REPMANCONFIRMATION1_CREATEMTS

/RMTYP=REM

Command (Unix):

./myerprck.scr

REPMANCONFIRMATION1_CREATEMTS

/RMTYP=REM

/MESTYP=

/KAT=FA

/MESTYP=

/KAT=FA

Comment:

Interval

SAP-PPREM: upload  MLE outbound transactions

5

For uploads from MLE outbound transactions to SAP PP-REM

Product key

License key

SAP-PPREM

SAP-PPREM

Command (Windows):

sh.exe

./hysapupl.scr

/UPLSEGNAM=BFLUSHDATAMTS

/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON

Command (Unix):

./hysapupl.scr

/UPLSEGNAM=BFLUSHDATAMTS

Comment:

Interval

/SINGLE_IDOC /SUBLEVEL=2 /SUBPROT=ON

SAP-PPREM: Upload MLE outbound transactions -_> SAP

5

SAP_PPREM_Customizing_HYDRA.docx Version: 1.1.18468

Page 3 of  5

Application-Relevant Settings in HYDRA

Please proceed as follows  if  you use the upload to SAP  PP-REM on a HYDRA  system at the

same time as the upload to SAP PP using PP-PDC:

Maintain the upload type “PP” (customizing) for production orders at the HYDRA order type.

Add the parameter “/RMTYP=PP“ for calling the upload of time tickets to SAP using PP-PDC in

the HYDRA Scheduler

Keep the upload type “REM” for planned orders/serial production at the HYDRA order type.

Maintain  the  script  myerprck.scr  by  the  parameter  “/RMTYP=REM”  as  specified  above  for

calling uploads to SAP serial production in the HYDRA Scheduler“

Configuration of uploads

The  BAPI  used  for  uploads  to  SAP  serial  production  supports  several  upload  modes.  They  can  be

configured subject to the requirements in HYDRA:

Definition of the reference to the planned order

If the upload is to be performed in relation to the planned order this can be set by the die HYDRA-

INI configuration. By default, uploads are performed without indicating the planned order number.

In  case  the  planned  order  is  uploaded  at  the  same  time  as  the  planned  order  quantity,  posting

errors will be the result, as the planned order might no longer exist at this point in time.

The transfer of the planned order number is enabled in the HYDRA-INI configuration as follows:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

PP-REM

BFLUSHDATAGEN

PLANORDER

TRANSFER

transfer of the planned order

SUPPRESS

the planned order is not transferred (by default)

Yes

PP-REM: activation of the transfer of the planned order number

SAP_PPREM_Customizing_HYDRA.docx Version: 1.1.18468

Page 4 of  5

Application-Relevant Settings in HYDRA

Define upload type

It is up to your decision whether you use a counting point upload (by default) or an end upload.

If you decide in favor of a counting point upload the operation number will be transferred with the

upload.

With the counting point upload the SAP systems withdraws all material components consumed at

the  uploaded  counting  point  process  in  a  retrograde  manner,  posts  the  services  accrued  for  the

uploaded  counting  point  operation,  reduces  secondary  requirements  of  the  planned  orders  and

updates the information included in the logistic information system.

With  counting  point  uploads  scrap  is  uploaded  as  scrap  for  the  specified  counting  point

(BFLUSHFLAGS.RP_SCRAPTYPE = „1“).

The end upload function is used if you want to perform the upload and actual data collection at the

end of the production process.

The upload type is defined as described-below in the HYDRA-INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

PP-REM

BCKFLTYPE

BCKFLTYPE

01

upload as end upload without reference to the operation

02

upload  as  counting  point  upload  with  reference  to  the

operation

Yes

PP-REM: definition of the upload type

SAP_PPREM_Customizing_HYDRA.docx Version: 1.1.18468

Page 5 of  5

