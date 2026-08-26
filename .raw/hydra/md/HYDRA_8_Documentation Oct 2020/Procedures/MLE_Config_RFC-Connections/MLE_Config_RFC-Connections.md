Configuration of RFC Connections

1  Configuration of RFC Connections

RFC Server (MES inbound processing)

Parameter

TYPE

PROGID

GWHOST

GWSERV

RFC_TRACE

Entry / Value

The  type  of  the  server  program  depends  on  its

behavior/performance.  The  entry  “R”  means  that

the server registers to an SAP gateway and is the

default entry.

STANDARD: "R“

PROGID designates the name by which the server

registers to the gateway. The entry in this field has

to  correspond  to  the  entry  for  ALE  customizing

(SAP transaction SM59).

STANDARD: "HYDRA_RFC_DISPATCH“

GWHOST  designates  the  host  name  of  the  SAP

system.  This  name  can  be  requested  from  the

system administrator of the SAP system.

GWSERV designates the service name/instance of

the  SAP  gateway.  This  number  can  be  requested

from the system administrator of the SAP system.

Please  note  that  the  number  has  to  start  with

"sapgw". Example:

sapgw00

This  entry  specifies  whether  or  not  a  log  file  is  to

be  written  by  the  SAP RFC library  when receiving

data  from  SAP  R/3  using  the  RFC  connection.

Possible entries are:

0  no tracing

1  with tracing

MLE_Config_RFC-Connections.docx

Version: 1.2.1362

Page 1 of 5

Configuration of RFC Connections

RFC Client (MES outbound processing)

Parameter

TYPE

ASHOST

SYSNR

CLIENT

USER

PASSWD

Entry / Value

The  client  type  is  to  be  entered.  “3”  has  to  be

entered for the MLE client.

STANDARD: "3“

ASHOST designates the host name of the specific

application  server.  This  name  can  be  requested

from the system administrator of the SAP system.

SYSNR designates the  SAP system number. This

number  is  to  be  requested  from  the  system

administrator of the SAP system.

The  number  of  the  gateway  has  to  be  provided

without "sapgw“.

The  entry  for  an  SAP  system  with

instance

“sapgw01” is therefore “01”.

The SAP client number is to be entered here. This

number  is  to  be  requested  from  the  system

administrator of the SAP system.

The  client  logs  on  accordingly  to  access  an  SAP

system.  Normally,  users  do  not  have  dialog

authorizations and, as a result, they are no security

risk.

Password to log in with the above-mentioned user.

The password is encoded. The password has to be

entered twice for confirmation purposes.

MLE_Config_RFC-Connections.docx

Version: 1.2.1362

Page 2 of 5

Parameter

TRACE

Configuration of RFC Connections

Entry / Value

This  value  specifies  whether  or  not  a  log  file  is  to

be written when sending data to SAP R/3 using the

RFC connection. Possible values are:

0  without tracing

1  with tracing

LANG

The  value  in  the  LANG  field  specifies  the  login

language to the SAP system.

STANDARD: "D“

PLEASE NOTE:

The  language  configured  here  has  to  match  the

language of the SAP system!!

RECONNECT_COUNT

RECONNECT_COUNT

indicates  how  many

attempts  the  client  has  to  do  if  no  connection  can

be established.

STANDARD: "3“

RECONNECT_TIME

RECONNECT_TIME specifies the time in seconds

the  client  waits  between  two  connection  attempts.

RFC_DESTINATION_FOR_TRFC

If the PP-PI-PCS interface is in use this parameter

STANDARD: "10“

defines  to  which  RFC  destination  (defined  in  the

transaction SM59 of SAP) return messages are to

be sent by SAP. Generally, this entry corresponds

to  the  RFC  destination  created  for  the  SAP

download.

Configuration of load balancing

MSHOST

Host name of the SAP message server

MLE_Config_RFC-Connections.docx

Version: 1.2.1362

Page 3 of 5

Parameter

MSSERV

R3NAME

GROUP

Configuration of RFC Connections

Entry / Value

Service of the SAP message server

Name of the SAP system

Name of the application server group

USE_LOAD_BALANCING

Enabling of the Load Balancing mode; active = "1",

inactive = "0"

IDoc settings

Port number

The  port  number  designates  the  physical  place  of

data  transfer  in  SAP.  This  place  is  determined  for

MLE  within  ALE  customizing.  In  R/3  it  can  be

determined via the port definition (SAP transaction

WE21)  or  using

the  partner  profile

(SAP

transaction WE20).

The  SAP  system  administrator  can  be  asked  for

the port number of the R/3 system. The port mostly

consists of “SAP” + system name. An SAP system

with

the  name  “CE6”  has,

for  example,

the

following port number: "SAPCE6”.

Please note: R/3 assigns the port number for older

SAP  releases  (incl.  4.0).  They  have  the  following

form:  Axxxxxxxxx.

Partner type

Logical  systems  specify

the  partner

type.

Partner number

Generally, it corresponds to "LS“.

The  partner  number  is  the  name  of  the  logical

system,  with  which  the  subsystem  has  been

configured within ALE customizing.  Please refer to

the SAP distribution model for details on this (SAP

transaction BD64).

The  SAP  administrator  can  be  asked  for  the

partner number of the SAP system.

MLE_Config_RFC-Connections.docx

Version: 1.2.1362

Page 4 of 5

The port to be used has to be configured additionally on operating system level to establish the

Configuration of RFC Connections

connection to a Load Balancing SAP system.

C:\WINDOWS\system32\drivers\etc\services

 e.g.: sapmsCL1        3665/tcp

MLE_Config_RFC-Connections.docx

Version: 1.2.1362

Page 5 of 5

