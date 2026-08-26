|     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

1  MYERPRCK - Program Parameters
|     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
Purpose
Use the upload program myerprck.exe/out to create confirmations/uploads to higher-level systems. In
addition to the settings you make directly in the applications, you can also use program parameters to
control confirmations/uploads.
Integration
The confirmation/upload is integrated with numerous components, for example:
  Shop floor data collection
  Tracking and tracing as well as material and production logistics
  Detailed scheduling
Available program parameters:
| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
Program parameters to control processing:
/MESTYP=XXXX  The  parameter  MESTYP  defines  the  All  Yes
structure to be generated.
/GRP=XXXX  The grouping type specifies the criterion  Requires  Requires
by  which  uploads  should  be  grouped.  customizations  customizations
Possible values:
PLANT --> Groups by plant
/V=sssss  Since  SAP  R/3  PP  does  not  support  EIS-ERP  Yes
|     |     | correction  | postings,              | HYDRA  allows  | to             |     |
| --- | --- | ----------- | ---------------------- | -------------- | -------------- | --- |
|     |     | retain      | confirmations/uploads  |                | for  EIS-XPPS  |     |
|     |     | correction  | purposes               | in  HYDRA      | for  a         |     |
SAP-PPPDC
specific period of time.
SAP-PPREM
Use the parameter /V=sssss  (sssss =
|     |     | delay  time  | in  seconds)  | to  activate  | the  |     |
| --- | --- | ------------ | ------------- | ------------- | ---- | --- |
SAP-PPPI
above described delay when the upload
|     |     | program is called.  |     |     | SAP-PMCC3  |     |
| --- | --- | ------------------- | --- | --- | ---------- | --- |
|     |     | Examples:           |     |     | SAP-PSCC4  |     |
  myerprck.exe/out /V=3600
SAP-COILV
The system only uploads postings
that are older than one hour.

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 1 of 9

|     |     |     |     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters       |     |     | Meaning/use  |      |            |     |              | Relevant    | Productive  |
| ---------------- | --- | --- | ------------ | ---- | ---------- | --- | ------------ | ----------- | ----------- |
|                  |     |     |              |      |            |     |              | interfaces  | release     |
| /BIS=DDMMYYHHMM  |     |     | Use          | the  | parameter  |     | /BIS=        | EIS-ERP     | Yes         |
|                  |     |     | DDMMYYHHMM   |      | (date      | +   | time)  when  |             |             |
/BIS=HHMM  calling the upload program to enter the  EIS-XPPS
delay as a point in time. You can enter
| /TILLDATE=MM/DD/YYYY  |     |     |     |     |     |     |     | SAP-PPPDC  |     |
| --------------------- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- |
this point in time with date and time or
you can just enter the time in the format
| /TILLTIME=sec  |     | after  |          |     |              |        |            | SAP-PPREM  |     |
| -------------- | --- | ------ | -------- | --- | ------------ | ------ | ---------- | ---------- | --- |
|                |     |        | "HHMM".  | In  | the  latter  | case,  | the  time  |            |     |
midnight
refers to the current day.
SAP-PPPI
|     |     |     |   Myerprck.exe  |     |     |     |     | SAP-PMCC3  |     |
| --- | --- | --- | --------------- | --- | --- | --- | --- | ---------- | --- |
/BIS=2505110600
|     |     |     | This  | parameter  |     | uploads  | postings  | SAP-PSCC4  |     |
| --- | --- | --- | ----- | ---------- | --- | -------- | --------- | ---------- | --- |
that were recorded until 06:00 a.m.
SAP-COILV
on 25 May 2011.
|     |     |     |   Myerprck.exe  |            |     |          | /BIS=0600  |     |     |
| --- | --- | --- | --------------- | ---------- | --- | -------- | ---------- | --- | --- |
|     |     |     | This            | parameter  |     | uploads  | postings   |     |     |
that were recorded until 06:00 a.m.
of the current day.
/TZ=+/-sssss  Use the parameter /TZ=+/-sssss to adapt  SAP-PPPDC  Yes
|     |     |     | uploads  | to  different  |     | time  | zones.  The  |     |     |
| --- | --- | --- | -------- | -------------- | --- | ----- | ------------ | --- | --- |
parameter adjusts the time specifications
|     |     |     | entered  |     | in  | the  | fields  |     |     |
| --- | --- | --- | -------- | --- | --- | ---- | ------- | --- | --- |
EXEC__START_TIME,
EXEC_FIN_TIME and LOGTIME of the
|     |     |     | upload  | structure  | of  | the  SAP-PPPDC  |     |     |     |
| --- | --- | --- | ------- | ---------- | --- | --------------- | --- | --- | --- |
interface according to its specifications.
/KST=XXX  Use this parameter to restrict the data to  EIS-ERP  Yes
|     |     |     | be  uploaded.  |     | In  this  | case,  | the  system  |     |     |
| --- | --- | --- | -------------- | --- | --------- | ------ | ------------ | --- | --- |
ESI-XPPS
|     |     |     | only  uploads  |     | data  of  | a  specified  | cost  |     |     |
| --- | --- | --- | -------------- | --- | --------- | ------------- | ----- | --- | --- |
center.
SAP-PPPDC
|     |     |     | Use  the  | parameter  | /KST=XXX  |     | (XXX  | =   |     |
| --- | --- | --- | --------- | ---------- | --------- | --- | ----- | --- | --- |
SAP-PPREM
cost center, a max. of 8 characters) when
|     |     |     | calling  | the  | upload  |     | program  |     |     |
| --- | --- | --- | -------- | ---- | ------- | --- | -------- | --- | --- |
SAP-PPPI
|     |     |     | myerprck.exe/out  |               | to  enable     |       | the  above-  |            |     |
| --- | --- | --- | ----------------- | ------------- | -------------- | ----- | ------------ | ---------- | --- |
|     |     |     | described         | restriction.  |                | Then  | the  system  | SAP-PMCC3  |     |
|     |     |     | only  uploads     |               | data  records  |       | that  were   |            |     |
SAP-PSCC4
posted to machines of the specified cost
|     |     |     | center.  | The  | system  | checks  | the  cost  |     |     |
| --- | --- | --- | -------- | ---- | ------- | ------- | ---------- | --- | --- |
SAP-COILV
center of the machine/workplace that is
|     |     |     | entered  |     | as  | the  | posting  |     |     |
| --- | --- | --- | -------- | --- | --- | ---- | -------- | --- | --- |
workplace/machine in the posting record.
The system only checks the cost center
of the workplace/machine.
You can specify the parameter several
times per call.
Example:

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 2 of 9

|     |     |     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use     |     |     |              |     | Relevant    | Productive  |
| ----------- | --- | --------------- | --- | --- | ------------ | --- | ----------- | ----------- |
|             |     |                 |     |     |              |     | interfaces  | release     |
|             |     |   Myerprck.exe  |     |     | /KST=BDE100  |     |             |             |
/KST=BDE200
The system only uploads records
that were posted onto machines of
the cost center BDE100/BDE200.
/CLEAR_RES  Use  the  parameter  "/CLEAR_RES“  to  SAP-PPPDC  Yes
assign an "X" to the field CLEAR_RES of
the upload structure when it comes to a
|     |     | final  confirmation/upload  |     |     | (record  |     | type  |     |
| --- | --- | --------------------------- | --- | --- | -------- | --- | ----- | --- |
L40). Consequently, SAP will clear open
reservations for the respective order.
| /NEG_MENGE  |     |                        |             |      |            |         | SAP-PPPDC  | Yes  |
| ----------- | --- | ---------------------- | ----------- | ---- | ---------- | ------- | ---------- | ---- |
|             |     | By  default,           | quantities  |      | (L20/L40)  | cannot  |            |      |
|             |     | be  uploaded           | to          | SAP  | PP  using  |         | partial    |      |
|             |     | confirmations/uploads  |             |      | via        | the     | SAP-       |      |
PPPDC interface if data is collected at
|     |     | the  same  | time  | via  | the  total  | quantity  |     |     |
| --- | --- | ---------- | ----- | ---- | ----------- | --------- | --- | --- |
counter of MDE machines, since SAP is
not able to process negative quantities.
|     |     | This  type  | of  | collection  | can  | result  | in  |     |
| --- | --- | ----------- | --- | ----------- | ---- | ------- | --- | --- |
negative quantity postings for yield when
OPs are finished.
This restriction does no longer apply, if it
|     |     | is  possible  | to  | process  | such  | negative  |     |     |
| --- | --- | ------------- | --- | -------- | ----- | --------- | --- | --- |
postings (e.g. by using the SAP standard
|     |     | BAPI  or  | customizations).  |               | In  | this       | case,  |     |
| --- | --- | --------- | ----------------- | ------------- | --- | ---------- | ------ | --- |
|     |     | you  can  | use               | the  program  |     | parameter  |        |     |
/NEG_MENGE to enable the upload of
these quantities.
/LA_MNR  The SAP_PMCC3 interface requires the  SAP-PMCC3  Yes
activity type to be uploaded to SAP PM.
The activity type can be identified via the
|     |     | machine/workplace  |     | where  |       | the  posting  |     |     |
| --- | --- | ------------------ | --- | ------ | ----- | ------------- | --- | --- |
|     |     | was  performed.    |     | Use    | this  | program       |     |     |
parameter to enable identification of the
activity type.
Then the system uses the machine to
identify the activity type from the activity
types kept in HYDRA.
/IDENT_PRAEFIX=  In  the  upload  structure  of  the  SAP- SAP-PPPDC  Yes
|     |     | PPPDC  | interface,  | the  | field  | EX_IDENT  |     |     |
| --- | --- | ------ | ----------- | ---- | ------ | --------- | --- | --- |
SAP-PPPDCC
|     |     | uniquely  | identifies  |     | uploads  |     | from  |     |
| --- | --- | --------- | ----------- | --- | -------- | --- | ----- | --- |
subsystems. HYDRA populates the field.
You can add a prefix to the EX_IDENT
|     |     | field  to  | differentiate  |     | between  | uploads  |     |     |
| --- | --- | ---------- | -------------- | --- | -------- | -------- | --- | --- |

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 3 of 9

|     |     |     |     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use  |          |        |     |             |     | Relevant    | Productive  |
| ----------- | --- | ------------ | -------- | ------ | --- | ----------- | --- | ----------- | ----------- |
|             |     |              |          |        |     |             |     | interfaces  | release     |
|             |     | from         | various  | HYDRA  |     | subsystems  |     |             |             |
connected to one SAP instance.
Example:
  Myerprck.exe
/IDENT_PRAEFIX=ABC
|     |     |     | The  | prefix  | may  | only  | include  |     |     |
| --- | --- | --- | ---- | ------- | ---- | ----- | -------- | --- | --- |
hexadecimal characters: A –H und
0 – 9.
/ABZEICH=XX  While  customizing  the  order  type,  you  EIS-ERP  Yes
can specify that only signed data records
|     |     | are uploaded.  |     |     |     |     |     | EIS-XPPS  |     |
| --- | --- | -------------- | --- | --- | --- | --- | --- | --------- | --- |
SAP-PPPDC
|     |     | Use  | the  parameter  |     | /ABZEICH=XX  |     |     | to  |     |
| --- | --- | ---- | --------------- | --- | ------------ | --- | --- | --- | --- |
specify a period of time in days after that
SAP-PPREM
|     |     | you  | can  upload  |     | even  | unsigned  | data  |     |     |
| --- | --- | ---- | ------------ | --- | ----- | --------- | ----- | --- | --- |
records.
SAP-PPPI
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/TRANSFER=  Use  the  parameter  "/TRANSFER="  to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
were transferred from a specific system.
|     |     | The    | transfer  | indicator  |             | is  set  | during  | SAP-PPPDC  |     |
| --- | --- | ------ | --------- | ---------- | ----------- | -------- | ------- | ---------- | --- |
|     |     | HYDRA  | inbound   |            | processing  | and      | may     |            |     |
SAP-PPREM
vary from interface to interface.
SAP-PPPI
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/NOTRANSFER=XXX  Use the parameter "/NOTRANSFER=" to  EIS-ERP  Yes
only upload records whose specifications
ESI-XPPS
|     |     | were  | NOT  | transferred  | from  | a   | specific  |     |     |
| --- | --- | ----- | ---- | ------------ | ----- | --- | --------- | --- | --- |
system.
SAP-PPPDC
|     |     | The  | transfer  | indicator  |     | is  set  | during  |     |     |
| --- | --- | ---- | --------- | ---------- | --- | -------- | ------- | --- | --- |
SAP-PPREM
|     |     | HYDRA                              | inbound  |     | processing  | and  | may  |           |     |
| --- | --- | ---------------------------------- | -------- | --- | ----------- | ---- | ---- | --------- | --- |
|     |     | vary from interface to interface.  |          |     |             |      |      | SAP-PPPI  |     |
SAP-PMCC3
SAP-PSCC4

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 4 of 9

|     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
SAP-COILV
| /SEK  |     | The EIS-ERP interface uploads the times  |              |           | EIS-ERP  | Yes  |
| ----- | --- | ---------------------------------------- | ------------ | --------- | -------- | ---- |
|       |     | of  resource                             | performance  | accounts  | in       |      |
ESI-XPPS
hours.
In particular with very short lead times
this may effect that logon times are cut
off by a conversion into hours.
|     |     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | --- | ---------- | ------------------- | ----------- | --- | --- |
times in seconds.
/RMTYP=  When  customizing  the  order  type,  you  EIS-ERP  Yes
can assign an upload type to the order
|     |     | type.  |     |     | ESI-XPPS  |     |
| --- | --- | ------ | --- | --- | --------- | --- |
SAP-PPPDC
|     |     | Use  this  | program  parameter  | to  | only  |     |
| --- | --- | ---------- | ------------------- | --- | ----- | --- |
upload data records of this upload type.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV
/KAT=  When  customizing  the  order  type,  you  EIS-ERP  Yes
|     |     | can  connect  | the  order  | type  with  | a   |     |
| --- | --- | ------------- | ----------- | ----------- | --- | --- |
ESI-XPPS
category.
|     |     | Use  the  | program  parameter  | /KAT=  | to  SAP-PPPDC  |     |
| --- | --- | --------- | ------------------- | ------ | -------------- | --- |
only upload data records of this category.
SAP-PPREM
You can specify the parameter several
SAP-PPPI
times per call.
SAP-PMCC3
SAP-PSCC4
SAP-COILV
| /SART=  |     | The  system  | only  uploads  | ADE  | log  EIS-ERP  | Yes  |
| ------- | --- | ------------ | -------------- | ---- | ------------- | ---- |
postings of the specified record type.
ESI-XPPS
Therefore, you can use different program
|     |     | parameters per call and record type for  |     |     | SAP-PPPDC  |     |
| --- | --- | ---------------------------------------- | --- | --- | ---------- | --- |
uploading.
SAP-PPREM
Requirement: You have to activate the
SAP-PPPI
corresponding uploads when customizing
the order type.

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 5 of 9

|     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use                            |     |     | Relevant    | Productive  |
| ----------- | --- | -------------------------------------- | --- | --- | ----------- | ----------- |
|             |     |                                        |     |     | interfaces  | release     |
|             |     | You can specify the parameter several  |     |     | SAP-PMCC3   |             |
times per call.
SAP-PSCC4
Example:
SAP-COILV
|     |     |   Myerprck.exe  |     | /SART=A  |     |     |
| --- | --- | --------------- | --- | -------- | --- | --- |
/SART=E
  The system only uploads A and
E records.
/NOLOCK  When starting the upload program, the  All  Requires
|     |     | system   | checks  if  there  | are  any  | lock   | customizations  |
| --- | --- | -------- | ------------------ | --------- | ------ | --------------- |
|     |     | entries  | for  the           | database  | table  |                 |
ADE_PROTOKOLL. If this is the case,
the upload is not carried out.
You can use this program parameter to
prevent this check.
|     |     | Set this parameter, in particular,  |                 |          | if the  |     |
| --- | --- | ----------------------------------- | --------------- | -------- | ------- | --- |
|     |     | upload                              | is  not  based  | on  the  | table   |     |
ade_protokoll.
/EINH_CC34  The  interfaces  SAP-PMCC3  and  SAP- SAP-PMCC3  Yes
|     |     | PSCC4  | transfer  the  | uploaded  activity  |     |     |
| --- | --- | ------ | -------------- | ------------------- | --- | --- |
SAP-PSCC4
quantity in seconds (SEC) to SAP. Use
the parameter "/EINH_CC34“ to upload
|     |     | the  data  | in  other  units.  | The  following  |     |     |
| --- | --- | ---------- | ------------------ | --------------- | --- | --- |
units are supported:
Hours:  H, HUR, STD
|     |     | Minutes:  | MIN  |     |     |     |
| --- | --- | --------- | ---- | --- | --- | --- |
|     |     | Seconds:  | SEC  |     |     |     |
Example:
  Myerprck.exe
/EINH_CC34=HUR
The system uploads the recorded
times in the unit "HUR“ (hours).
/SDAT_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes
the change date along with the correction
records.
|     |     | Use  this  | program  parameter  | to  upload  |     |     |
| --- | --- | ---------- | ------------------- | ----------- | --- | --- |
the initially collected shift date instead.
/NORFC_STORNO  The  SAP-PPPDCC  interface  transfers  SAP-PPPDCC  Yes

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 6 of 9

|     |     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use  |     |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | --- | ----------- | ----------- |
|             |     |              |     |     |     | interfaces  | release     |
the cancellation records via sRFC.
Use the program parameter to transfer
the data in the IDoc format to SAP. To do
|     |     | so,  inbound  | processing  |     | must  | be  |     |
| --- | --- | ------------- | ----------- | --- | ----- | --- | --- |
implemented in SAP.
|     |     | The  system  | uploads   | the       | cancellation  |     |     |
| --- | --- | ------------ | --------- | --------- | ------------- | --- | --- |
|     |     | records      | via  the  | standard  | PP-PDC        |     |     |
segment (with record type K20/K40) as if
the PP-PDCC license was not available.
| /PI  |     | If you use the SAP Process Integration  |           |                  |               | SAP-PPPDC      | Yes  |
| ---- | --- | --------------------------------------- | --------- | ---------------- | ------------- | -------------- | ---- |
|      |     | (previously:                            | Exchange  | Infrastructure)  |               | to             |      |
|      |     | communicate                             | with      | SAP,             | the  version  | of  SAP-PMCC3  |      |
the transferred segment is checked more
SAP-PSCC4
strictly.

Use the program parameter to transfer
segment names with the version number
|     |     | (i.e.  the  | trailing  | zeros  of  | the  segment  |     |     |
| --- | --- | ----------- | --------- | ---------- | ------------- | --- | --- |
name).
/INDEX_TMP_TABLE  Use this parameter to accelerate uploads  All  Requires
|     |     | if ORACLE is used as database system  |     |     |     |     | customizations  |
| --- | --- | ------------------------------------- | --- | --- | --- | --- | --------------- |
and large amounts of data are affected.
To do so, use an index for a temporary
table where all data to be uploaded is
transferred in a first step.
/UE_PARAMS=  Program parameter for the stand-alone  Various  Yes
user exit processing (DD format).
| /NOSTORNO  |     | Use this program parameter to prevent  |          |     |       | All    | Yes  |
| ---------- | --- | -------------------------------------- | -------- | --- | ----- | ------ | ---- |
|            |     | cancellation                           | records  |     | from  | being  |      |
uploaded.
Therefore, you can use different program
parameters per call and record type for
uploading.
Requirement: You have to activate the
corresponding uploads when customizing
the order type.
/RECALC_NEG_YIELD  Use  this  parameter  to  offset  negative  SAP-PPPDCC  Requires
|     |     | yield  with  | already  | posted  | positive  |     | customizations  |
| --- | --- | ------------ | -------- | ------- | --------- | --- | --------------- |
uploads.
Program parameters to use the SIGUSR communication:

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 7 of 9

|     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use  |     |     | Relevant    | Productive  |
| ----------- | --- | ------------ | --- | --- | ----------- | ----------- |
|             |     |              |     |     | interfaces  | release     |
/LOGGING  Use this program parameter to activate  INDIVIDUAL  Yes
|     |     | communication from the database table  |     |     | CASE  |     |
| --- | --- | -------------------------------------- | --- | --- | ----- | --- |
HYD_LOGGING.
|     |     | To  do  | so,  a  customization  | might  | be  |     |
| --- | --- | ------- | ---------------------- | ------ | --- | --- |
required.
/WAIT_SIGUSR1=XX  The  program  parameter  specifies  the  INDIVIDUAL  Yes
|     |     | time in seconds that has to pass before  |     |     | CASE  |     |
| --- | --- | ---------------------------------------- | --- | --- | ----- | --- |
the upload is performed via the SIGUSR
communication even without trigger.
| /PEEK_SIGUSR1=XX  |     |     |     |     | INDIVIDUAL  | Yes  |
| ----------------- | --- | --- | --- | --- | ----------- | ---- |
CASE
Use this parameter to delay execution of
|     |     | an  action  | triggered  | by  the  SIGUSR  |     |     |
| --- | --- | ----------- | ---------- | ---------------- | --- | --- |
communication.
The delay time is entered in seconds for
this parameter.
|     |     | The  program  | interprets  | this  time  | as  |     |
| --- | --- | ------------- | ----------- | ----------- | --- | --- |
follows:
If within the next second after the initial
trigger there is another trigger, then wait
|     |     | for  not  | more  than  <specified  |     | value>  |     |
| --- | --- | --------- | ----------------------- | --- | ------- | --- |
seconds.
|     |     | If  in  a  | specific  case,  | triggers      | would  |     |
| --- | --- | ---------- | ---------------- | ------------- | ------ | --- |
|     |     | indeed     | arrive  every    | second  then  | the    |     |
WAIT_SIGUSR time (e.g. 120 seconds)
would apply; i.e. the system would in fact
perform the upload after 2 minutes.
/SEND_SIGUSR1=  This  program  parameter  defines  which  INDIVIDUAL  Yes
|     |     | other process/ program must be triggered  |     |              | CASE  |     |
| --- | --- | ----------------------------------------- | --- | ------------ | ----- | --- |
|     |     | after  processing                         | by  | the  SIGUSR  |       |     |
communication.
Specify the process/program WITHOUT
file extension.
/COUNT_SIGUSR1=XX  Uploading in signal mode can hardly be  INDIVIDUAL  Yes
|     |     | subjected to tracing. This is due to the  |     |     | CASE  |     |
| --- | --- | ----------------------------------------- | --- | --- | ----- | --- |
fact that the program in those cases is
started once via the scheduler but won't
shut off. Any redirection of the program
|     |     | call  with  | -d  to  a  log  | file  will  | then  |     |
| --- | --- | ----------- | --------------- | ----------- | ----- | --- |
necessarily lead to very large log files,
|     |     | which  | will  negatively  | affect  | the  |     |
| --- | --- | ------ | ----------------- | ------- | ---- | --- |
performance.

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 8 of 9

|     |     |     |     |     |     |     |     | MYERPRCK - Program Parameters  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

| Parameters  |     | Meaning/use        |      |               |      |            |        | Relevant    | Productive  |
| ----------- | --- | ------------------ | ---- | ------------- | ---- | ---------- | ------ | ----------- | ----------- |
|             |     |                    |      |               |      |            |        | interfaces  | release     |
|             |     | Use                | the  | new  program  |      | parameter  |        |             |             |
|             |     | /COUNT_SIGUSR1=XX  |      |               | to   | specify    | after  |             |             |
|             |     | how  many          |      | calls         | the  | program    | will   |             |             |
automatically shut down. A call in these
|     |     | instances  | is  | both,  a  | call  | via  | SIGUSR  |     |     |
| --- | --- | ---------- | --- | --------- | ----- | ---- | ------- | --- | --- |
communication and the cyclical program
|     |     | execution  | which  | is  | controlled  |     | via  the  |     |     |
| --- | --- | ---------- | ------ | --- | ----------- | --- | --------- | --- | --- |
parameter /WAIT_SIGUSR1.
Then the scheduler restarts the program.
|     |     | But  this  | will  | lead  to  | a  time  | period  | "t"  |     |     |
| --- | --- | ---------- | ----- | --------- | -------- | ------- | ---- | --- | --- |
during which SIGUSR calls will not be
processed. It is, however, assumed that
this will not lead to data losses since the
data to be uploaded are already saved to
the DB.
Benefits:
|     |     | If  the  | program  | is  started  |     | via  | a  script  |     |     |
| --- | --- | -------- | -------- | ------------ | --- | ---- | ---------- | --- | --- |
(*.scr) from the scheduler, you can store
there the routine to generate a date/ time
|     |     | stamp  | file  name  | for  | the  | log  file  | to  be  |     |     |
| --- | --- | ------ | ----------- | ---- | ---- | ---------- | ------- | --- | --- |
created. This allows to restrict the log file
size.
Program parameters for debugging/ tracing/ testing/ logging purposes:
/ONLYERR  This  program  parameter  specifies  that  All  Yes
system log entries are only created if an
error occurred during uploading.
This reduces the entries in the system
log.
| /SIM  |     | The system does not upload/confirm data  |     |              |            |     |       | All  | No  |
| ----- | --- | ---------------------------------------- | --- | ------------ | ---------- | --- | ----- | ---- | --- |
|       |     | during                                   |     | simulations  |            |     | (the  |      |     |
|       |     | uploaded/confirmed                       |     |              | indicator  | is  | set   | to   |     |
"'True").
/SIMULATION  The system does not upload/confirm data  All  No
|     |     | to  | SAP  | during  |     | simulation  |     |     |     |
| --- | --- | --- | ---- | ------- | --- | ----------- | --- | --- | --- |
(confirmed/uploaded indicator will not be
changed).

MBL_MYERPRCK_Program_Parameters.docxVersion: 1.3.19158  Page 9 of 9