Application-Relevant Settings in HYDRA

1  Application-Relevant Settings in HYDRA

Maintenance of the SMS path

A  path  defined  in  HYDRA  establishes  the  connection  between  escalation  management  and  the  mail

server that has been designed as the connecting link to the SMS gateway. Maintain the following entry in

the HYDRA path configuration:

Parameter name

Path

Schema

Host

Port

Value

SMSGW

smtp

Name  of  the  SMTP  server  or  its  IP  address,  e.g.

mailserver.firma.intern

Port of the SMTP server.

“0“  means  that  the  standard  SMTP  port  is  to  be

used.

URL path

Target address of the SMS gateway, e.g.

User

Password

Comment

smsgateway@firma.com

User name is not required, remains empty

Password is not required, remains empty

SIS-VES: Sending of SMS by Gateway

Maintenance in the basic parameter settings – assignment of the SMS path

The  entry  for  the  SMS  path  kept  in  the  HYDRA  path  configuration  has  to  be  defined  in  the  escalation

management configuration of the HYDRA basic parameter settings:

Parameter name

SMS path

Value

SMSGW

ESK_SMS-Gateway.docx

Version: 1.0.18468

Page 1 of 2

Application-Relevant Settings in HYDRA

HR master maintenance

A  mobile  phone  number  has  to  be  stored  in  the  HR  master  for  every  recipient  that  is  to  be  notified  by

SMS. The format in which the number is to be defined depends on the requirements of the mail server or

SMS gateway (both software by third-parties).

Parameter name

Value

Mobile phone number, company

Phone number in the relevant format

ESK_SMS-Gateway.docx

Version: 1.0.18468

Page 2 of 2

