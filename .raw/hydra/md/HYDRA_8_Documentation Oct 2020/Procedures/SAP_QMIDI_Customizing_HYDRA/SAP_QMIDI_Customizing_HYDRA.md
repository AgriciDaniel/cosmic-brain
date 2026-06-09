Application-relevant settings in HYDRA

1

 Application-relevant settings in HYDRA

Configuring variants for Stand-alone CAQ

The request for inspection specifications is based on a uniform selection table. Opposite to the integration

scenarios with PP-PDC and/or HYINFO, for stand-alone CAQ integration it is not possible to use any data

provided by SAP to request the specifications.

For the following reason there is a customizing table in HYDRA. The table represents the QAILS selection

structure  defined  by  SAP  and  allows  though,  requesting  inspection  specifications  from  SAP.  Right  now

there  is  no  graphical  user  interface  to  maintain  the  table,  though  any  adjustments  have  to  be  done  by

using database interface.

Table: CAQ_QAILS_VORMERK

Field

SATZART

T
CHAR

Description
L
3  Record type for request

Fixed „Q40“

Meaning / Remark

record

LOSNR_VON

NUMC

12  From inspection batch

Should not be used for selection

number

LOSNR_BIS

NUMC

12  To inspection batch number   Should not be used for selection

PLNFL

CHAR

6  Operation sequence in task

Should not be used for selection

list

VORNR_VON

CHAR

4  From operation number

Should not be used for selection

VORNR_BIS

VORGWERK

CHAR

4  To operation number

Should not be used for selection

CHAR

4  Plant of operation to be

Should be used for selection

processed

SUBSYS

CHAR

6

Identifier of the subsystem   Value as defined in SAP customizing

PRPLATZ

CHAR

8  Work center

Default: QM0001

Useable for selection

PRPLATZWRK

CHAR

4  Plant of the work center

Useable for selection

MATNR

CHAR

18  Material number

Useable for selection

DATUM_VON

CHAR

15  From creation date of
inspection batch

It  is  possible  to  calculate  the  “date  from”  dynamically
according to  the current  date minus  x  days.  For  that  the
entry has to be done such as:
TODAY–n (n represents the number of days, e.g. 5)
Default: TODAY

DATUM_BIS

CHAR

15  To creation date of inspection

batch

It  is  possible  to  calculate  the  “date  from”  dynamically
according to  the current  date minus  x  days.  For  that  the
entry has to be done such as:
TODAY-n (n represents the number of days, e.g. 5)
Default: Today

PRUEFSTAT]

CHAR

1  Status of the inspection

Useable for selection

ART

CHAR

8

Inspection type

Useable for selection

HERKUNFT

CHAR

2  Origin of the inspection batch  Useable for selection

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 1 of 14

Application-relevant settings in HYDRA

Field

CHARG

AUFNR_VON

AUFNR_BIS

LIFNR

KUNNR

MBLNR

T
CHAR

Description

L
10  Batch number

Meaning / Remark

Should not be used for selection

CHAR

12  From order number

Should not be used for selection

CHAR

12  To order number

Should not be used for selection

CHAR

10  Vendor number

Should not be used for selection

CHAR

10  Customer number

Useable for selection

CHAR

10  Number of the material document Should not be used for selection

MAXLOSANZ

NUMC

4  Maximum number of batches per

Fixed “9999”

BEARB

TA_ID

STATISCH

STATUS

BEARB_DATE

BEARB_TIME

USER_D_01

USER_D_02

USER_N_03

USER_N_04

USER_N_05

USER_F_07

USER_F_08

USER_C_09

USER_C_10

Verweis

transmission

CHAR

User

CHAR

30

CHAR

CHAR

1

3

DATE

TIME

DATE

DATE

Flag “Static entry”

User field

User field

NUMC

8  User field

NUMC

8  User field

NUMC

8  User field

DEC

DEC

13,3  User field

13,3  User field

CHAR

20  User field

CHAR

40  User field

Future use

Future Use

Fixed “J”

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Future use

Database serial

Consecutive number

Use  the  HYDRA  Scheduler  to  maintain  entries  for  the  download  of  inspection  specifications  in  CAQ

stand-alone  scenario.  The  program  has  only  to  be  called  once  per  subsystem.  It  will  then  execute  all

entries in the CAQ_QAILS_VORMERK table one after the other

Parameter name

Value

Product key

License key

SAP-QMIDI

SAP-QM-IDI

Command (Windows):

sh.exe

./hysapqmc.scr

/MESTYP_OUT=ZQM_IDI

/VARIANTE=QM_IDI /LOGSYS=<created logical system>

Command (Unix):

./hysapqmc.scr /MESTYP_OUT=ZQM_IDI /VARIANTE=QM_IDI

/LOGSYS=<created logical system>

Comment:

SAP-QMIDI: Download inspection specifications

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 2 of 14

Application-relevant settings in HYDRA

Parameter name

Intervall

Value

5

Configuring call for catalog master data

Catalog master data of SAP is needed for all integration scenarios. The catalog master data download is

also executed by the hysapqmc.exe/out program. Use the HYDRA Scheduler to maintain entries for the

download of catalog master data.

Parameter name

Value

Product key

License key

SAP-QMIDI

SAP-QM-IDI

Command (Windows):

sh.exe  ./hysapqmc.scr  /MESTYP_OUT=ZHYQMIDI_CATALOG

/LOGSYS=<created  logical  system>  /VARIANTE=<variant  as

definded in table SAP_SF_PARAM_CFG>

Command (Unix):

./hysapqmc.scr

/MESTYP_OUT=ZHYQMIDI_CATALOG

/LOGSYS=<created  logical  system>  /VARIANTE=<variant  as

definded in table SAP_SF_PARAM_CFG>

Comment:

Intervall

SAP-QMIDI: Download catalog master data

5

The  HYDRA  scope  of  delivery  includes  the  “QM_IDI”  variant  for  the  QIRF_SEND_CATALOG_DATA2

function module as an example. In the example all parameter values are empty.

If necessary multiple entries have to be created to download all necessary catalog master data from SAP.

It is strictly recommended to create the variants in the customer name space, starting with “U_”.

Configuring call for inspection point download – HYDRA-triggered

Inspection  points  from  SAP  are  needed  for  all  integration  scenarios.  The  inspection  point  download  is

also executed by the hysapqmc.exe/out program. Use the HYDRA Scheduler to maintain entries for  the

download of inspection points.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 3 of 14

Application-relevant settings in HYDRA

Parameter name

Value

Product key

License key

SAP-QMIDI

SAP-QM-IDI

Command (Windows):

sh.exe

./hysapqmc.scr

/MESTYP_OUT=ZHYQMIDI_INSPPOINT

/LOGSYS=<created

logical system> /VARIANTE=ALL

Command (Unix):

./hysapqmc.scr

/MESTYP_OUT=ZHYQMIDI_INSPPOINT

/LOGSYS=<created logical system> /VARIANTE=ALL

Comment:

Intervall

SAP-QMIDI: Download inspection points

5

The  HYDRA  scope  of  delivery  includes  the  “QM_IDI”  variant  for  the  QIRF_INSPPOINT_GETLIST

function module as an example. The variant has mandatory to be copied into variant “ALL”.

To  enable  a  dynamically  operation,  the  parameter  values  for  the  parameters  INSPLOT,  INSPOPER,

INSPPOINT_FROM  and  INSPPOINT_TO  can  be  set  to  “USE_PROG_PARAMS”.  In  this  case  the

program parameters of the same name will be evaluated for the function module call. I.e. :

hysapqmc.exe/out

.....

/INSPLOT=000012345678

/INSPOPER=0010

/INSPPOINT_FROM=1

/INSPPOINT_TO=500

If necessary multiple entries have to be created to download all necessary inspection points from SAP. It

is strictly recommended to create the variants in the customer name space, starting with “U_”.

Configuring call for inspection point download – dynamically-triggered

Inspection  points  from  SAP  are  needed  for  all  integration  scenarios.  The  inspection  point  download  is

also  executed  by  the  hysapqmc.exe/out  program.  It  is  executed  based  on  downloaded  inspection  data.

For configuration of the dynamically-triggered scenario several steps have to be performed:

  Configuration for the incoming QM-data message type:

The  incoming  QM  data  has  to  be  processed  twice  –  once  to  import  the  data  into  HYDRA  and

another  time  to  download  the  inspection  point.  For  that  reason  the  script  mle72imp_pp_qm.scr

has to be used and edited accordingly.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 4 of 14

Application-relevant settings in HYDRA

Please note the importance to copy the script into the customer name space (starting “u_”) before

changing it and calling it from the MLE distribution model.

  Additional parameters for the function module variant

In configuration table sap_fb_param_cfg additional parameters have to be inserted

Parameter name

Value

HY_SEGMENT_NAME

Segment from which inspection  lot  number and the

operation number has to be taken from.

DEFAULT: Z2QAIVC000X000

HY_SEGMENT_INSPLOT_FROM

Position

in

the  specified  segment  where

the

inspection lot number starts

HY_SEGMENT_INSPLOT_TO

Position

in

the  specified  segment  where

the

inspection lot number ends

HY_SEGMENT_INSOPERFROM

Position

in

the  specified  segment  where

the

operation number starts

HY_SEGMENT_INSOPER_TO

Position

in

the  specified  segment  where

the

operation number ends

  Programm parameter for hysapqmc.exe/out

The programm hysapqmc.exeout has to be executed with an  additional programm parameter to

enable dynamical download of inspection points:

/GET_INSPPOINTS_4_INSPLOTS

The  functionality  of  dynamically  downloading  inspection  points  is  available  starting  with

hysapqmc.exe/out V8.1.1.26

Configuring for inspection point creation in HYDRA

When inspection points are not downloaded from SAP, they are created in HYDRA. The creation for time

and  quantity  related  inspection  points  is  done  by  a  cyclic  process,  that  is  scheduled  in  the  HYDRA

Scheduler. Use the HYDRA Scheduler to maintain an entry for the creation of inspection points.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 5 of 14

Application-relevant settings in HYDRA

Parameter name

Value

Product key

License key

QMS-SQM

QMS-SQM

Command (Windows):

sh.exe hyqmsipcr.scr

Command (Unix):

./hyqmsipcr.scr

Comment:

Intervall

QMS-SQM: Creation of inspection points in HYDRA

1

Configuration of confirmations

After data recording in HYDRA the confirmation data has to be transferred back to SAP. The confirmation

is  done  on  a  cyclic  base  (Default:  15  minutes).  Use  the  HYDRA  Scheduler  to  maintain  an  entry  for  the

creation of inspection points.

Parameter name

Value

Product key

License key

SAP-QMIDI

SAPQM-IDI

Command (Windows):

sh.exe ./qm_idi_rck.scr

Command (Unix):

./qm_idi_rck.scr

Comment:

Intervall

SAP-QMIDI: Confirmation of inspection results HYDRA  SAP

15

Confirming  defect  items  to  SAP  it  is  possible  that  SAP  only  accepts  single  defect  items.  To

transfer each defect item in a separate function call,  the  parameter  /SINGLE_IDOC has to be

added in hysapupl.exe/out command line for defect items inside the script qm_idi_rck.scr.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 6 of 14

Application-relevant settings in HYDRA

Configuring origin of results data

The  origin  of  results  data  can  be  configured  in  SAP  customizing.  To  enable  HYDRA  to  transfer  this

information  when  uploading  inspection  results  to  SAP,  the  entry  has  to  be  customized  in  HYDRA

accordingly. The customizing is only possible in HYDRA professional mode in the CAQ options:

Parameter name

Option

Option ID

Value

1101

0

Option Description

Origin of results data

Module

Value

List

QMS

<value as defined in SAP>

Yes

Configuring partial confirmations for inspection lots

Partial confirmations (transferring results before the final usage decision is made) for inspection lots can

be configured HYDRA CAQ customizing.

Parameter name

Option

Option ID

Module

Value

Addition

Value

1101

0

QMS

<value as defined in SAP>

NONE

[DIRECT]

By activating the CAQ option 1128 (value = Y) partial confirmations for inspection lots will be transferred

to SAP even when the final usage decision is not done yet.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 7 of 14

Application-relevant settings in HYDRA

Remarks:

By activating the option WITHOUT the additional setting [DIRECT] the system will behave such as:



Inspection points will be confirmed after closing them. Together with the inspection points single

results and characteristic results will be transferred.

  For  operations  that  are  not  inspection  point  relevant,  the  characteristic  results  with  their  single

and  sample  results  will  be  confirmed  when  closing  the  inspection  order  (usually  when  finishing

the operation).

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant

operations.

  The  usage  decision  will  be  confirmed  when  it  is  done,  usually  after  closing  the  inspection

requirement.

By activating the option WITH the additional setting [DIRECT] the system will behave such as:

  All  inspection  point  details,  recorded  results  und  defect  items  will  be  confirmed  directly  after

recording.

  The characteristics  will be  confirmed as closed,  when the  assigned  inspection order is finished,

usually when finishing the last operation.

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant

operations.

  Sample results will be confirmed as closed, when the assigned inspection order has been closed

or the inspection point is closed.

ATTENTION!!  Setting  the  option  might  cause  problems  when  reactivating  CAQ-relevant

operations.

  The  usage  decision  will  be  confirmed  after  recording,  usually  when  the  assigned  inspection

requirement is closed.

Activating the option with additional setting [DIRECT] is only available for testing reasons. The

setting is NOT released for customers / productive usage.

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 8 of 14

Application-relevant settings in HYDRA

In case the option is not available or inactive, all inspection  lot data  will be transferred after making the

final usage decision.

Settings in HYDRA MES Link Enabling Inbound – Stand-alone CAQ

Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:

Name of the parameter

Value

Download inspection specifications

Message type

Priority

Command

ZQM_IDI

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to use>

Description

QM-IDI – Download inspection specifications

Log. Target system

Created logical system

Storage duration

10

Download catalogue master data

Message type

ZHYQMIDI_CATALOG

Priority

Command

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to use>

Description

QM-IDI – Download catalogs

Log. Target system

Created logical system

Storage duration

10

Download inspection points

Message type

ZHYQMIDI_INSPPOINT

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 9 of 14

Application-relevant settings in HYDRA

Name of the parameter

Priority

Command

Value

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to use>

Description

Log. Target system

Created logical system

Storage duration

10

Settings in HYDRA MES Link Enabling Inbound – PP-PDC integration

Use  the  HYDRA  distribution  model  to  maintain  entries  for  HYDRA  inbound  processing  for  PP-PDC

integration. Depending on the implementation sequence existing entries have to be changed and/or new

entries have to be created.:

Name of the parameter

Value

Processing for PP-PDC message type PPCC2RECORDER:

Message type

PPCC2RECORDER

Priority

Command

None

hysapqmc.scr

Command parameter

/VARIANTE =QM_IDI

Description

QM-IDI – Download inspection specifications

Log. Target system

Created logical system

Storage duration

10

Combined import of production order data and inspection specifications

Message type

PPCC2RECORDER_QM_IDI

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 10 of 14

Application-relevant settings in HYDRA

Name of the parameter

Priority

Command

Value

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to use>

Description

QM-IDI / PP-PDC: Import data

Log. Target system

Created logical system

Storage duration

10

Settings in HYDRA MES Link Enabling Inbound – SAP-ISS integration

Use the HYDRA distribution model to maintain entries for HYDRA inbound  processing for PP-PDC and

SAP-ISS  integration.  Depending  on  the  implementation  sequence  existing  entries  have  to  be  changed

and/or new entries have to be created.:

Name of the parameter

Value

Processing for PP-PDC message type PPCC2RECORDER:

Message type

PPCC2RECORDER

Priority

Command

Command parameter

None

hysapinf.scr

/REC_TYPE

Description

SAP-ISS – Download additional data

Log. Target system

Created logical system

Storage duration

10

Request inspection specifications:

Message type

PPCC2HYINFOORDER

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 11 of 14

Application-relevant settings in HYDRA

Name of the parameter

Priority

Command

Value

None

hysapqmc.scr

Command parameter

/VARIANTE =<MLE variant to use>

Description

QM-IDI – Request insp. specifications

Log. Target system

Created logical system

Storage duration

10

Combined import of production order data, additional data and inspection specifications

Message type

PPCC2HYINFOORDER_QM_IDI

Priority

Command

None

mle72imp.scr

Command parameter

/VARIANTE=<MLE variant to use>

Description

QM / PP: Import data

Log. Target system

Created logical system

Storage duration

10

Settings in HYDRA MES Link Enabling outbound

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Name of the parameter

Value

To upload original values

Message type

ZHYQMIDI_ORIGINAL_VALUES

Description

IDoc-Typ

QM-IDI – Upload original values

ZHYQMIDI_ORIGINAL_VALUES

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 12 of 14

Application-relevant settings in HYDRA

Name of the parameter

Storage duration

Value

10

Log. Target system

<created logical system>

Segment name 1

Z2QAISE000X000

To upload sample values

Message type

ZHYQMIDI_SAMPLE_VALUES

Description

IDoc-Typ

QM-IDI – Upload sample values

ZHYQMIDI_SAMPLE_VALUES

Storage duration

10

Log. Target system

<created logical system>

Segment name 1

Z2QAISR000X000

To upload feature values

Message type

ZHYQMIDI_FEATURE_VALUES

Description

IDoc-Typ

QM-IDI – Upload feature values

ZHYQMIDI_FEATURE_VALUES

Storage duration

10

Log. Target system

<created logical system>

Segment name 1

Z2QAIMR000X000

To upload inspection points

Message type

ZHYQMIDI_INSP_POINTS

Description

IDoc-Typ

QM-IDI – Upload inspection point

ZHYQMIDI_INSP_POINTS

Storage duration

10

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 13 of 14

Application-relevant settings in HYDRA

Name of the parameter

Value

Log. Target system

<created logical system>

Segment name 1

Z2QAIPP000X000

To upload usage decisions

Message type

ZHYQMIDI_USAGE_DECISION

Description

IDoc-Typ

QM-IDI – Upload usage decision

ZHYQMIDI_USAGE_DECISION

Storage duration

10

Log. Target system

<created logical system>

Segment name 1

Z2QAIVE000X000

To upload defect items

Message type

ZHYQMIDI_DEFECT_ITEMS

Description

IDoc-Typ

QM-IDI – Upload defect items

ZHYQMIDI_DEFECT_ITEMS

Storage duration

10

Log. Target system

<created logical system>

Segment name 1

Z2QMIFE000X000

SAP_QMIDI_Customizing_HYDRA.docx  Version: 1.4.18468

Page 14 of 14

