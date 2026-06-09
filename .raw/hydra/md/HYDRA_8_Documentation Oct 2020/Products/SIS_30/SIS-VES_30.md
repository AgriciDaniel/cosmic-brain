Manual

Dispatch of Escalation
Messages by SMS
SIS-VES 3.0/3.1

Version 1.0.16727

Last changed on: 19 June 2020

Dispatch of Escalation Messages by SMS

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-VES_30.docx

Version: 1.0.19468

Page 2 of 7

Dispatch of Escalation Messages by SMS

Contents

1  Sending of Escalation Messages by SMS ................................................... 4

2  SMS Dispatch .............................................................................................. 5

3  Application-Relevant Settings in HYDRA ..................................................... 6

SIS-VES_30.docx

Version: 1.0.19468

Page 3 of 7

Dispatch of Escalation Messages by SMS

1  Sending of Escalation Messages by SMS

Fields of application

The  function  package  SIS-VES  provides  functions  by  way  of  which  notifications  from  escalation

management can be sent to a third-party software by e-mail to have these messages sent by the external

software by SMS.

Implementation notes

You use the function package SIS-VES, if you:

  use the function package SIS-ESK (escalation management – basic/framework) and you wish to

send the messages also by SMS, apart from the notifications by e-mail or in the MES itself.

The function package helps you send the messages in real time to the recipients of escalations and, as a

result, to shorten your internal and/or external processes.

The  function  package  allows  to  send  e-mails  and  SMS  as  a  part  of  the  escalation  management  either

separately or at the same time.

Integration

The function package is based on the HYDRA escalation management (SIS-ESK) and enhances this one

by the function for sending text messages (SMS).

Features

The function package provides the following functions:

  Configuration of an SMTP path for a connection to the third-party software based on SMTP

  Storage of a mobile phone number for the recipient in the HYDRA HR master

  Provision of the messages to be sent as SMS by e-mail for the third-party software

SIS-VES_30.docx

Version: 1.0.19468

Page 4 of 7

Dispatch of Escalation Messages by SMS

2  SMS Dispatch

Mapping

SMS are sent by an SMS gateway (software by third-party) to which escalations are forwarded by SMTP.

The SMS  gateway is  provided  with  the mobile phone number of the determined recipient  in the subject

line and with the message to be sent included in the message text.

The original subject line of the escalation is overwritten. The SMS gateway might be required to shorten

the  message  text  to  be  transferred  due  to  possible  technical  restrictions  of  the  SMS  communication

service.

The mail address defined in the basic settings is used as the return address (just as it is the case for e-

mails).



If  required,  the  SMS  gateway  shortens  the  text  to  a  maximum  length.  Consequently,  important

information might get lost. For this reason, customers should adjust escalation texts, if necessary, so

as for the relevant information of an escalation to be written at the beginning of the message text.

It is recommendable to enter the most important information of the message at the beginning to

prevent important text from being cut off or to keep the sense and information content.

SIS-VES_30.docx

Version: 1.0.19468

Page 5 of 7

Dispatch of Escalation Messages by SMS

3  Application-Relevant Settings in HYDRA

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

SIS-VES_30.docx

Version: 1.0.19468

Page 6 of 7

Dispatch of Escalation Messages by SMS

HR master maintenance

A  mobile  phone  number  has  to  be  stored  in  the  HR  master  for  every  recipient  that  is  to  be  notified  by

SMS. The format in which the number is to be defined depends on the requirements of the mail server or

SMS gateway (both software by third-parties).

Parameter name

Value

Mobile phone number, company

Phone number in the relevant format

SIS-VES_30.docx

Version: 1.0.19468

Page 7 of 7

