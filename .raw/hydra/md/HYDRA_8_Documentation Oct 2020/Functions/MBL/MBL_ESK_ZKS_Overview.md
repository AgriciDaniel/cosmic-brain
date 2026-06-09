Access Control Escalations
1 Access Control Escalations
1.1 Summary
Using the escalation management alarms and access attempts may be sent by e-mail, SMS or as
message to the console of certain users.
Within access control the following events can be sent using the escalation management:
ZNR.OPEN_TOO_LONG
The entrance has been opened too long. This alarm also indicates the badge number that has
opened the entrance.
ZNR.OPEN_TOO_LONG_END
The access, which was opened too long, has been closed again.
ZNR.OPEN_WITHOUT_PERMISSION
The entrance has been opened without permission (e.g. by way of a key or tool).
ZNR.OPEN_WITHOUT_PERMISSION_END
The entrance, which was opened without permission, has been closed again.
ZNR.READER_SABOTAGE
The access reader has been opened (this message only appears when the reader has got a
sabotage contact).
ZNR.READER_SABOTAGE_END
The access reader has been closed again (this message only appears when the reader has got a
sabotage contact).
ZNR.READER_FAILURE
Communication between the HYDRA-ZKS terminal and the access reader has broken down.
ZNR.READER_FAILURE_END
The connection between the terminal and the reader has been re-established.
ZNR.ACCESS_POINT_OFFLINE
The access has not sent a status within the given status time. Thus, the access status is not known.
The connection between the server and the HYDRA-ZKS terminal has broken down.
ZNR.ACCESS_POINT_OFFLINE_END
The access has sent a status again.
ZNR.ACCESS
The entrance has been opened by an authorized badge.
MBL_ESK_ZKS_Overview.docx Version: 1.0.18468 Page 1 of 5

|     |     |     | Access Control Escalations  |     |
| --- | --- | --- | --------------------------- | --- |

ZNR.ACCESS_ATTEMPT
The entrance could not be opened by an unauthorized badge.
| 1.2  | Configuration of ZKS escalations  |     |     |     |
| ---- | --------------------------------- | --- | --- | --- |
Something has to be entered in the configuration of the escalation to be able to report an escalation from
the HYDRA-ZKS module:

The event can directly be reported to a person or a group of persons (function group). If the message is to
be forwarded by e-mail, the IP address of the mail server and the person’s e-mail address (company)
have to be defined in the basic settings. To be able to send the event to a console, the assignment
between personnel number and user needs to be established in the user management function.

| MBL_ESK_ZKS_Overview.docx  |     | Version: 1.0.18468  |     | Page 2 of 5  |
| -------------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | Access Control Escalations  |     |
| --- | --- | --- | --------------------------- | --- |

The text is entered with placeholders for variable data in the message tab:

How the message is sent is defined in the “notification” tab.
Notifications about access attempts may have different reasons. The ZPR.ZVG variable determines that
only certain access attempts are displayed. Several configurations with different conditions have to be
created for the respective event in order to get different messages for different causes.
The following reasons for access attempts are possible:
| ZPR.ZVG  |                       | Description  |     |     |
| -------- | --------------------- | ------------ | --- | --- |
| 2001     | Unauthorized badge    |              |     |     |
| 2002     | No badges loaded      |              |     |     |
| 2003     | Beyond time zone      |              |     |     |
| 2004     | Beyond opening hours  |              |     |     |

| MBL_ESK_ZKS_Overview.docx  |     | Version: 1.0.18468  |     | Page 3 of 5  |
| -------------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | Access Control Escalations  |     |
| --- | --- | --- | --------------------------- | --- |

| 2005  | Wrong pin code                                    |     |     |     |
| ----- | ------------------------------------------------- | --- | --- | --- |
| 2006  | Wrong company number                              |     |     |     |
| 2007  | Bag check                                         |     |     |     |
| 2008  | Alarm system activated                            |     |     |     |
| 2010  | Duplicate posting within lock time                |     |     |     |
| 2013  | Missing pin code                                  |     |     |     |
| 2014  | Badge beyond validity period                      |     |     |     |
| 2015  | Finger print does not match                       |     |     |     |
| 2020  | Other entry of security gate/safety lock is open  |     |     |     |
| 2030  | Already present in room zone                      |     |     |     |
| 2031  | Not present in room zone                          |     |     |     |
| 2032  | Room zone completely occupied                     |     |     |     |

| MBL_ESK_ZKS_Overview.docx  |     | Version: 1.0.18468  |     | Page 4 of 5  |
| -------------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | Access Control Escalations  |     |
| --- | --- | --- | --------------------------- | --- |

The following screenshot shows the exemplary condition to send a message if an employee tries to enter
a room zone twice:

| MBL_ESK_ZKS_Overview.docx  |     | Version: 1.0.18468  |     | Page 5 of 5  |
| -------------------------- | --- | ------------------- | --- | ------------ |