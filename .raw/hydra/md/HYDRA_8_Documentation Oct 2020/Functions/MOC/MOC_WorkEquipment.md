Work Equipment Management

1  Work Equipment Management

Overview

Menu

Master data  Staff  Work equipment management

Transaction code

weqi

Function authorization  weqi

Use  the  application  Work  equipment  management  to  manage  in  HYDRA  the  work  equipment  that  has

been issued and returned:

Note: In the English version, the former label texts Handing out / Handed out on/by have been replaced

with Issued and Issued on/by as of August 2019.

Available user fields

MOC_WorkEquipment.docx

Version: 1.1.18468

Page 1 of 4

Work Equipment Management

Where?

Table

Object type/user field key

Source (type)

PNR/SYSTEM

HR master data (HR)

How to configure user fields?

Which user field types are available?

Selection criteria

The application provides the following special selection criteria:

Currently valid, Valid in the future, Valid in the past

This  selection  specifies  the  time  when  the  work  equipment  has  been  issued.  Only  the  date  is

entered here when the work equipment has been issued or returned. The time is ignored.

Field descriptions

Person, Name

Personnel number and name of the person

Category

Assigns the  entry to a  Category.  Using categories,  you can control the authorizations that specify

the access to work equipment.

Designation (name)

Description of the work equipment

Inventory number

Inventory number of the work equipment

Serial number

Serial number of the work equipment

Manufacturer

Manufacturer of the work equipment

Model

Model of the work equipment

Size

Size, e.g. size or shoe size

Supplier

Supplier of the work equipment

Storage location

Storage location of the work equipment, if it is not lent out at the moment

MOC_WorkEquipment.docx

Version: 1.1.18468

Page 2 of 4

Work Equipment Management

Comment 1, comment 2, comment 3

3 comment fields to enter additional information

File

You can store a file for each entry included in the Work equipment management. Use the 3 buttons

in the toolbar to add, show or delete the file. This field shows the unique file name used to store the

file on the server. The name of files assigned to work equipment starts with "weqi".

Issued on

When the data record is created, the system automatically preassigns the current date as the date

when the  work equipment has been issued.  You can  manually change the date. Use the function

Issued in the toolbar to have the field populated with the current time.

Issued by*

The user name of the person that issues the equipment is automatically set if a personnel number

is entered to change the date. The field cannot be changed manually.

Returned on

The return date and time can be entered manually. Use the function Returned in the toolbar to have

this field populated with the current date.

Received by

User name of the person who received the work equipment. The user name is automatically set if

the return time is changed. If the time of the return is set to empty, the person is deleted. The field

cannot be changed manually.

Modified by, modified on

Person who last edited the data record including date and time.

Toolbar

 Send e-mail

Opens an e-mail addressed to the employee of the currently selected entry. If an e-mail address is

entered for this employee in the Company e-mail field of the HR master, this address is used.

 Add file (function authorization weqi.edit)

Opens a dialog to select a file. When the file is selected, the file is saved with a unique name in the

HYDRA path ”MOCHRIMG“ on the server. The field File then shows the file name.

 Show file (function authorization weqi.edit)

If a file is assigned, this file is shown. The file is displayed using the application that is linked in the

operation system to the relevant file extension.

MOC_WorkEquipment.docx

Version: 1.1.18468

Page 3 of 4

Work Equipment Management

 Delete file (function authorization weqi.edit)

This function deletes the assigned file. When you have called this function, the file does no longer

exist on the server.

 Issued* (function authorization weqi.handout)

Using this function, you can enter the current time in field Issued on and the logged on user in field

Issued  by.  If  the  personnel  number  is  not  entered  when  the  work  equipment  is  issued,  an  error

message is displayed and the booking is not carried out.

 Returned (function authorization weqi.return)

Using this function,  you can enter the current time in field  Returned on and the logged on user in

field Received by.

 Note: In the English version, the former label texts Handing out / Handed out on/by have been replaced

with Issued and Issued on/by from August 2019.

MOC_WorkEquipment.docx

Version: 1.1.18468

Page 4 of 4

