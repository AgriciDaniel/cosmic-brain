Application-Relevant Settings in HYDRA

1  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model - outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Parameter name

Value

For the upload of time tickets

Message type

WMMBXY

Description

IDOC type

Storage duration

MM-MOB - Upload of material movements

WMMBID02

10

Log. target system

Created logical system

Segment name 1

E2MBXYH

Maintenance of the HYDRA Scheduler

Use the HYDRA Scheduler to plan jobs for outbound processing:

Parameter name

Value

Transfer of goods movements to MLE outbound transactions

Product key

License key

SAP-MMMOB

SAP-MMMOB

Command (Windows):

sh.exe ./myerprck.scr /MESTYP=WMMBXY

Command (Unix):

./myerprck.scr /MESTYP=WMMBXY

Comment:

SAP-MMMOB:  Upload  of  goods  movements    MLE  outbound

transactions

SAP_MMMOB_Customizing_HYDRA.docxVersion: 1.0.18468

Page 1 of 2

Application-Relevant Settings in HYDRA

Parameter name

Interval

Value

5

Upload of confirmations from MLE outbound transactions to SAP MM

Product key

License key

SAP-MMMOB

SAP-MMMOB

Command (Windows):

sh.exe

./hysapupl.scr

/UPLSEGNAM=E2MBXYH

/SINGLE_IDOC /SUBLEVEL=2

Command (Unix):

./hysapupl.scr

/UPLSEGNAM=E2MBXYH

/SINGLE_IDOC

/SUBLEVEL=2

Comment:

SAP-MMMOB  -  Upload  of  goods  movements  MLE  outbound

transactions  SAP MM

Interval

5

Please  make  sure  that  the  upload  program  myerprck.exe/out  has  not  been  started  for  the

message  types  ZWAU  (goods  issues  in  the  HYDRA  format)  and  ZWEI  (goods  receipts  in  the

HYDRA format) using the script myerprck.scr, since it cannot be operated with SAP-MMMOB at

the same time.

Maintenance of the HYDRA material type

In many cases, the HYDRA material type is relevant for the interface and needs to be activated to be able

to transfer goods movements. For this reason, enable the flag “goods movements  transfer to interface”

for the HYDRA material type.

If the HYDRA material type is not available as application, the flag can also directly be set using

the database:

update hz_typen set we_ext_kz = ‚J‘ where hz_typ = ‘<Material type for

which the flag is to be set>’;

SAP_MMMOB_Customizing_HYDRA.docxVersion: 1.0.18468

Page 2 of 2

