Sending Time Sheet via E-mail
1 Sending Time Sheet via E-mail
Overview
You can use this function to send the time sheet to employees via e-mail. You call the function in the
application Time sheet using the button Send e-mail.
Requirements
The e-mail address of persons that send/receive e-mails must be stored in the HR master data in field
Company e-mail. You can find two methods to send e-mails in the following. We recommend the method
SMTP.
If the persons have an e-mail address, the name is displayed in blue font and underlined on the
right hand side of the detail application.
Method SMTP
The e-mails are sent via HYDRA server. To activate the e-mail dispatch using the SMTP protocol, you
must make the following entry in the INI configuration:
INI configuration: PERSONALTIMESHEET
Section: SENDEMAIL
Key: PROTOCOL
Value: SMTP
To send the time sheet using the SMTP protocol, you must carefully update the fields SMTP Server and
Sender in tab ESK of the Basic settings.
MOC_PersonalTimeSheetMail.docx Version: 1.2.18468 Page 1 of 5

|     |     |     |     | Sending Time Sheet via E-mail  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

If you want to receive a send confirmation with this sending method (SMTP), you can activate the
confirmation via an additional INI configuration:
|   INI configuration:  |     | FORWARD_MAIL_CONFIG                     |     |     |     |
| --------------------- | --- | --------------------------------------- | --- | --- | --- |
|   Section:            |     | FORWARD_MAIL_CONFIG                     |     |     |     |
|   Key:                |     | BCCMAILADDRESS                          |     |     |     |
|   Value:              |     | @user or a central mail address (e.g.   |     |     |     |
  timesheet.confirmsending@ex.com)
If you enter the value @user in the INI configuration, the confirmation mail is always sent to the
e-mail address of the person that is stored for the MOC user. If you enter a central e-mail
address as value, e.g. timesheet.confirmsending@ex.com in the INI configuration, the
|     | confirmation mail is always sent to this central e-mail address.  |     |     |     |     |
| --- | ----------------------------------------------------------------- | --- | --- | --- | --- |

With this dispatch mode (SMTP), you can be informed if mail delivery failed (e.g. recipient address does
not exist). To activate this notification, make this additional INI configuration:

MOC_PersonalTimeSheetMail.docx  Version: 1.2.18468  Page 2 of 5

|     |     |     |     | Sending Time Sheet via E-mail  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

|   INI configuration:  |     | FORWARD_MAIL_CONFIG                     |     |     |     |
| --------------------- | --- | --------------------------------------- | --- | --- | --- |
|   Section:            |     | FORWARD_MAIL_CONFIG                     |     |     |     |
|   Key:                |     | BOUNCEMAILADDRESS                       |     |     |     |
|   Value:              |     | @user or a central mail address (e.g.   |     |     |     |
|                       |     | timesheet.error@ex.com)                 |     |     |     |
If you enter the value @user in the INI configuration, the error message is always sent to the e-
mail address of the person that is stored for the MOC user. If you enter a central e-mail address
as value, e.g. timesheet.error@ex.com in the INI configuration, the error message is always
|     | sent to this central e-mail address.  |     |     |     |     |
| --- | ------------------------------------- | --- | --- | --- | --- |

Method XMAPI
Instead of using the SMTP protocol (Simple Mail Transfer Protocol), you can also use the XMAPI protocol
(eXtended Messaging Application Program Interface) to send the time sheet via e-mail. In this case, you
must install an e-mail program that supports the XMAPI protocol on the PC where you send the mails. E-
mails are sent using the account of the registered user.
The dispatch of time sheets via the XMAPI interface has been tested and released for Microsoft
Outlook. If other mail systems are used, the customer must test these.

Processing
When the e-mails are sent, the system informs the user about the number of time sheets sent to
employees. The system also identifies the number of persons where no e-mail address is stored in the
HR master data:

With dispatch mode XMAPI, the mails are stored in the outbox of the e-mail client.

MOC_PersonalTimeSheetMail.docx  Version: 1.2.18468  Page 3 of 5

|     |     |     | Sending Time Sheet via E-mail  |
| --- | --- | --- | ------------------------------ |

Configuration
You can change the file name of the PDF file sent and the e-mail texts using the INI configuration
PERSONALTIMESHEET with section SENDEMAIL:
| Key        | Description                                    |     |     |
| ---------- | ---------------------------------------------- | --- | --- |
| FILENAME   | File name without extension "pdf"              |     |     |
| SUBJECT    | E-mail subject                                 |     |     |
| MESSAGE_1  | Message text (body) of the e-mail              |     |     |
| MESSAGE_2  | Message text (body) of the e-mail (2nd part)   |     |     |
| MESSAGE_3  | Message text (body) of the e-mail (3rd part)   |     |     |
| MESSAGE_4  | Message text (body) of the e-mail (4th part)   |     |     |
| MESSAGE_5  | Message text (body) of the e-mail (5th (part)  |     |     |
(the 5 message texts are each linked with a line break.)
| SENDEMAIL  | FALSE: The e-mail is created but not sent.  |     |     |
| ---------- | ------------------------------------------- | --- | --- |
Otherwise (default): The e-mail is created and sent immediately.

The system processes the following placeholders in these configured texts:
Placeholders  Data field
<year>  Year
<period>  Period
<from_date>  Date from
<to_date>  Date to
<person>  Personnel number
<name>  Name
<firstname>  First name
<lastname>  Last name
<newline>  Line break

MOC_PersonalTimeSheetMail.docx  Version: 1.2.18468  Page 4 of 5

Sending Time Sheet via E-mail
The screenshot below shows an example of the INI configuration PERSONALTIMESHEET:
MOC_PersonalTimeSheetMail.docx Version: 1.2.18468 Page 5 of 5