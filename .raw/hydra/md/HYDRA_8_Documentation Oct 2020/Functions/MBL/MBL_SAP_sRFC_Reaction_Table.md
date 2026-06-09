Reaktion auf sRFC-Fehler

1  Reaction to sRFC Errors

Usage

With  sRFC-communication  the  calling  system  will  receive  next  to  a  technical  return  code  also  business

information regarding the success of an intended action.

The evaluation of the return parameters from the SAP function module can be optimized here as regards

the  question  whether  to  reject  specific  data  immediately  (in  this  case  the  next  data  record  would  be

edited) or whether to wait "online" for a couple of seconds before trying again to post the data to SAP.

Requirements

You use the synchronous RFC for the communication with SAP.

You execute the upload client hysapupl.exe/out by the command parameter /SINGLE_IDOC

Mapping

A general error handling function is integrated into the confirmation program to SAP hysapupl.exe/out that

provides for a uniform error handling of sRFC-calls. This function assumes the error handling:



if there is an error such as a RFC-exception and/or an exception of the function module,



if the posting success is returned to a BAPIRET-structure,



If the posting success is returned to a BAPIRET-table,



if in case of the QM-IDI the posting success is returned to a QIERR-table.

  This uniform return code handling is made synchronously for all called RFC-modules, and in doing so

existing island solutions were customized to this uniform processing method.

Processing  is  activated  using  the  new  program  parameter/  RET_CODE_EVALUATION.  This  is  used  to

evaluate  the  existing  parameter/  REDO_CANCEL=  for  all  synchronous  calls.  If  this  is  not  set,  HKMPP-

PDCC  will  be  used  as  default.  In  addition,  it  will  be  checked  in  the  sap_fb_return_cfg  table  whether  it

contains entries for the respective synchronous module.

In  error  handling  the  existing  table  sap_fb_return_cfg  will  be  evaluated  and  any  returned  error  will  be

handled correspondingly. To do so, the following logics is used:

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 1 of 6

Reaktion auf sRFC-Fehler

PRIO 1 :

Error handling when the function module returns an exception.

This will be checked against the table sap_fb_return_cfg and be handled according to the configuration

applying to that combination of function module name and exception.

If there is no entry, the data record will "normally" be handled as REDO-cancel and will automatically be

set to "ToDo" and/or "DONE_ERROR".

PRIO 2 :

Error handling when the functional module does NOT return an exception but return the result in a return

structure (Prio 2).

This will be checked against the table sap_fb_return_cfg and be handled according to the configuration

applying to that combination of function module name and ret_type / ret_id / ret_number.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

DONE ERROR



"A"

DONE ERROR

PRIO3 :

Error handling when the functional module does NOT return an exception but return the result in a return

table.

This return table may include more entries of different ret_type. This is the reason why this table will be

used to  iterate  and in  line  with the following priority the table sap_fb_return_cfg  will be searched for an

entry:



ret_type = A

  2. ret_type = E

  3. ret_type = W

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 2 of 6

Reaktion auf sRFC-Fehler

If an entry will be found, the configuration in the table sap_fb_return_cfg will be used for further handling.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

(at least one entry – Prio 2) DONE ERROR



"A"

(at least one entry – Prio 1) DONE ERROR

PRIO4 :

Error  handling  when  the  functional  module  does  NOT  return  an  exception  but  return  the  result  in  a

QUIERR table.

This return table may include more entries of different ret_type. This is the reason why this table will be

used to  iterate  and in  line  with the following priority the table sap_fb_return_cfg  will be searched for an

entry:



ret_type = A

  2. ret_type = E

  3. ret_type = W

If an entry will be found, the configuration in the table sap_fb_return_cfg will be used for further handling.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

(at least one entry – Prio 2) DONE ERROR



"A"

(at least one entry – Prio 1) DONE ERROR

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 3 of 6

Reaktion auf sRFC-Fehler

If an entry is found in the table sap_fb_return_cfg for a return code, the system will interpret this entry as

follows:

  ACTION = "A“ (only for SAP-PPPDCC)

The data record will be marked immediately as DONE_ERROR without taking the program parameter

"/REDO_CANCEL" into account.

  ACTION = "R"

The system will wait for the time period specified in DELAY (in seconds) online (with live connection

to SAP) and once this time period has elapsed will attempt to post the data once again.

If this is possible (=successful), the data record will be marked as DONE.

If this can again not be posted (e.g. because the data record is still being blocked in SAP), it will be

marked  in  HYDRA  as  TODO  (try  again)  or  DONE_ERROR  (impossible  to  post)  while  the  value

defined  via

the  program  parameter

"/REDO_CANCEL"  will  be

taken

into  account.

If  REDO_CANCEL  is  not  explicitly  specified  during  the  program  call,  the  DEFAULT  value  will  be

used.

Entries or changes to this table need to be agreed with MPDV since erroneous configurations

may lead to unwanted side effects.

Table: sap_fb_return_cfg

Field
FB_NAME

KEY  Type  L  D  Meaning

X

CHAR

30     Name of the functional

module

EXCEPTION

X

CHAR

30     Exception

RET_TYPE

X

CHAR

1  0  Message type: S

Notes/ Usage in HYDRA
Used to determine
whether there are entries in
this table to this FB
Exception that is triggered by
the module
FUTURE USE
Possible entries:

Success, E Error, W
Warning, I Info, A Abort

"E" --> Error
"A" --> Abort
"W" --> Warning

RET_ID

RET_NUMBER

RET_MESSAGE
RET_LOG_NO

X

X

CHAR

20  0  Messages, message

Message type, e.g. "RU"

class

NUMC

3  0  Messages, message

Message number, e.g. "486"

CHAR
CHAR

number

220  0  Message text

20  0  Application log: Protocol

number

FUTURE USE
FUTURE USE

RET_LOG_MSG_NO

NUMC

6  0  Application log : internal

FUTURE USE

serial number of the
message

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 4 of 6

Reaktion auf sRFC-Fehler

Field
RET_MESSAGE_V1

KEY  Type  L  D  Meaning

CHAR

50  0  Messages, message

Notes/ Usage in HYDRA
FUTURE USE

RET_MESSAGE_V2

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_MESSAGE_V3

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_MESSAGE_V4

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_PARAMETER
RET_ROW
RET_FIELD
RET_SYSTEM

variable

CHAR
INT4
CHAR
CHAR

32  0  Name of the parameter
10  0  Line in parameter
30  0  Field in parameter
10  0  System (logical system)
that issued the message

FUTURE USE
FUTURE USE
FUTURE USE
FUTURE USE

ACTION

CHAR

2     Action to be executed

DELAY

NUMC

8     Delay in seconds

This defines which action will
be executed by
hysapupl.exe/out:
"A" --> Cancel (immediate
setting apart)
"R" --> Online repetition
If "R"epeat is stored to the
ACTION field, than this
defines the time interval in
seconds after which the
repetition is to be made.

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 5 of 6

Reaktion auf sRFC-Fehler

MBL_SAP_sRFC_Reaction_Table.docx  Version: 1.0.1362

Page 6 of 6

