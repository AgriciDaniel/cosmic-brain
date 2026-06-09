Protecting fields of planned operations

1  Protecting fields of planned operations

Purpose

Use the configuration described in this document to prevent specific data fields of a (planned) operation

from being overwritten when the operation is transferred once more via the ERP interface.

This function only affects ANR.MODIFY and/or ANR.UPDATE and operations.

Operations  are  only  updated  if  the  status  of  the  order/operation  generally  allows  it.  The

configuration described below does not apply if the status (see order status assignment) cannot

be changed in general.

Requirements

You require the relevant function authorization to access INI configuration and INI data configuration.

Procedure from service pack 12 onwards (b_anr.dll version 8.1.1.354)

Create a new entry in the INI configuration:

Field name

Value

Name

BAPINOUPDATE

Description

Enter a description.

For this entry, create an entry including the following values in INI data configuration:

Field name

Section

Key

Value

Active

Value

ANR

List the fields (HYDRA BAPI acronyms) that are not overwritten.

The value includes a condition. Enter the condition, for example, as follows:
ANR.ATYP=AG

Yes

Use "@" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions

are processed one after the other.

You can define the values for "key" and "value" separately. The entries are processed one after the other.

The conditions entered in the "value" field correspond to an AND operation.

MLE_Protect_fields_from_Scheduled_OPs.docxVersion: 1.4.18468

Page 1 of 4

Protecting fields of planned operations

As of service pack 12 only use the "@" character as separator if you create new entries or change

existing ones. You do not have to change existing configurations (prior to service pack 12). In this

case, the "|" character is still supported.

You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as

you define the values for "key" and "value" separately.

Procedure up to service pack 11

Create a new entry in the INI configuration:

Field name

Value

Name

BAPINOUPDATE

Description

Enter a description.

For this entry, create an entry including the following values in INI data configuration:

Field name

Section

Key

Value

Active

Value

ANR

List the fields (HYDRA BAPI acronyms) that are not overwritten.

Enter  the  condition  that  has  to  be  met  to  make  sure  fields  will  not  be
overwritten. Enter BAPI acronyms including value.

Yes

Use "|" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions

are processed one after the other.

Up to service pack 11 only use the "|" character as separator.

You can define the values for "key" and "value" separately. The entries are processed one after the other.

The conditions entered in the "value" field correspond to an AND operation.

You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as

you define the values for "key" and "value" separately.

If you cannot enter the pipe character ("|") using the GUI, you can still enter the values via the database:

  To do so, create a new entry as described above via the INI configuration. Now use the following

SQL statement to determine the internal DB counter for the header entry in the INI configuration:

MLE_Protect_fields_from_Scheduled_OPs.docxVersion: 1.4.18468

Page 2 of 4

Protecting fields of planned operations

select * from hyd_ini

  Determine the value of the "VERWEIS" column for the new entry.

  Create the required entries. Use the following SQL statement to assign the database table fields

and application fields as described below:

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung, aktiv)
values (<reference from previous SQL>, 'ANR', '<fields to be protected>', '<values>',
'<comment>', 'J')

Use  the  "|"  (pipe)  character  to  separate  the  acronyms  of  the  fields  you  want  to  protect  and  the

acronyms of the values.

Use a pipe character "|" to complete the list of the fields you want to protect and

the list of values.

Database field

INI_VERWEIS

SECTION

IDENT

VALUE

BEMERKUNG (comment)

AKTIV

Values/content

The value of the VERWEIS column identified
from the HYD_INI table via SQL.

Section

Key

Value

Comment

Active

List of frequently used acronyms

The following table lists the most frequently used acronyms and their meaning. Please contact MPDV

Support if the list does not include the acronym you require.

Acronym

ANR.MGRP

ANR.MNR

ANR.OPT:PLAN

ANR.DATB

ANR.ZEIB

ANR.DATE

ANR.ZEIE

Meaning

Machine group

Workplace/
machine

Planning indicator:
M
G

Planned for workplace/machine
Planned for machine group

Start date planned (via HLS)

Start time planned (via HLS)

End date planned (via HLS)

End time planned (via HLS)

MLE_Protect_fields_from_Scheduled_OPs.docxVersion: 1.4.18468

Page 3 of 4

Protecting fields of planned operations

Example: protect the planned workplace

If the operation is planned on a workstation, you have to prevent the ERP interface from cancelling this

planning. To do so, enter the below-mentioned data:

Field name

Section

Key

Value

Active

SLQ statement:

Value

ANR

ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@

ANR.ATYP=AG@ANR.OPT:PLAN=M@

Yes

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,

aktiv) values (<reference from previous SQL>, 'ANR',

'ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@', 'ANR.ATYP=AG@ANR.OPT:PLAN=M@', '<comment>',

'J')

Example: protect the start/end dates of a planned OP

If the operation is planned on a workstation and, as a result, its start time is specified, you have to prevent

the ERP interface from cancelling this planning. To do so, enter the below-mentioned data:

Field name

Section

Key

Value

Active

SLQ statement:

Value

ANR

ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@

ANR.ATYP=AG@ANR.OPT:PLAN=M@

Yes

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,

aktiv) values (<reference from previous SQL>, 'ANR',

'ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@', ' ANR.ATYP=AG@ANR.OPT:PLAN=M@',

'<comment>', 'J')

MLE_Protect_fields_from_Scheduled_OPs.docxVersion: 1.4.18468

Page 4 of 4

