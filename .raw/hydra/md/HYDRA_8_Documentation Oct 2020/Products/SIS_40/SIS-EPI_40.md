Manual

Extended Personnel
Information
SIS-EPI 4.0pe

Version 1.0.23503

Last changed on: 6/12/2019

Extended Personnel Information

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-EPI_40.docx

Version: 1.0.23503

Page 2 of 19

Extended Personnel Information

Contents

1  Extended Personnel Information - Overview ............................................... 4

2  Categories .................................................................................................... 6

3  Qualifications ................................................................................................ 7

4  Staff qualifications ........................................................................................ 9

5  Work Equipment Management ................................................................... 13

6  Digital Personnel File ................................................................................. 17

SIS-EPI_40.docx

Version: 1.0.23503

Page 3 of 19

Extended Personnel Information

1  Extended Personnel Information - Overview

Possible fields of application

System Integration Service to manage additional personnel information, such as advanced trainings, work

equipment and entries in the digital personnel file.

Implementation notes

The function package is used if:



you would like to enter the employees' qualifications, advanced training or medical examinations

in HYDRA





you would like to document the dates of issue and return of work equipment or work clothes.

you  would  like  to  keep  a  digital  personnel  file  in  HYDRA  to  save,  for  example,  appraisal  or

absence interviews.

Integration

The employees need to be managed by the function package "integrated HR master" to be able use the

"extended personnel information" function.

The  included  functions  can  be  used  irrespective  of  the  used  product  groups  (e.g.  shop  floor  data

collection, time & attendance, quality management).

Functions

  Categories

o  Maintenance  of  categories  to  control  authorizations  for  the  digital  personnel  file,  work

equipment management and the assignment of qualifications to employees.

  Planning of advanced training

o  Qualifications  master  and  assignment  of  qualifications  to  employees  with  planning  of

advanced training sessions.

  Work equipment management

o

Issue and return of work equipment (tools, measuring tools, work clothes, keys, …)

  Digital personnel file

o  Digital  personnel  file  to  store  additional  information,  such  as  applications,  appraisals,

absence interviews, …

  Storage of documents

o  Files  can  be  stored  in  addition  to  the  entries  in  the  "digital  personnel  file",  "work

equipment management" and "assignment of qualifications".

SIS-EPI_40.docx

Version: 1.0.23503

Page 4 of 19

Extended Personnel Information

SIS-EPI_40.docx

Version: 1.0.23503

Page 5 of 19

Extended Personnel Information

2  Categories

Summary

HYDRA menu

System administration  System settings  Categories

FEDRA menu

Advanced Resource Planning  Maser data  Categories

Transaction code

catg

Function authorization

catg

The  "categories"  application  has  been  designed  to  manage  categories  for  different  applications.  The

categories advanced training, instructions, driver's license, inspection, etc., for example, may be defined

for the qualifications. The categories are also used in the digital personnel file (e.g. application, appraisal,

etc.) and the work equipment management.

Field description

Category

Alphanumeric key for the category

Designation

Category name

Application

Transaction code for the application in which the category is to be used.

Responsibility area ("category" group)

The responsibility area which the category is assigned to. This responsibility area is checked when

the category is edited but it does not affect using the category in other applications.

Responsibility area ("Authorization check for using the category" group)

The  responsibility  area  entered  here  is  checked  if  you  want  to  show,  create,  change  or  delete  a

data  record  assigned  to  this  category  in  another  application.  This  authorization  controls,  for

example, if a  user in the  digital  personnel file  is allowed to  view, create, change or delete  entries

assigned to the "appraisal" category.

SIS-EPI_40.docx

Version: 1.0.23503

Page 6 of 19

Extended Personnel Information

3  Qualifications

Overview

HYDRA menu

Master data  Staff  Qualifications

FEDRA menu

Advanced resource planning  Master data  Qualifications

Transaction code

qual

Function authorization

qual

Individual qualifications are defined using the related settings in the master data for qualifications:

Field descriptions

Qualification

Unique qualification number. This number can be freely selected when creating a qualification.

Name/designation

Description of the qualification

Category

Category  which  this  qualification  belongs  to.  The  category  controls  authorizations  for  viewing  and

editing qualifications within the application Staff qualifications.

SIS-EPI_40.docx

Version: 1.0.23503

Page 7 of 19

Extended Personnel Information

Color

Color  highlighting  the  qualification  in  personnel  assignment.  This  field  is  only  available  if  the

additional function "enhanced selection and visualization" is available.

The  field  "color"  is  only  available  if  the  license  "enhanced  selection  and  visualization"  (PEP-

ESV) is enabled (only applicable if HYDRA is used).

Relevant to workforce requirements planning

This  field  specifies  whether  the  qualification  is  to  be  displayed  and  processed  in  workforce

requirements planning.

Assign automatically

This  option  specifies  if  the  qualification  is  considered  in  the  automatic  planning  and  only  affects

workforce requirements defined via the machine/operator relation of the operation or the production

resources and tools.

Order

You  can  configure  the  order  in  which  multiple  qualifications  for  a  workplace  are  displayed  in  the

Workplace Assignment.

Responsibility area

Responsibility area of the qualification

Validity period

Indicates  how  long  the  qualification  will  be  valid  (in  days).  If  a  value  is  entered  in  this  field,  the

validity  period  will  be  assigned  automatically  starting  from  the  current  day  until  the  end  of  the

specified validity period, when an assignment is created for this qualification.

Max. validity period

Maximum  validity  of  the  qualification  in  days  that  is  checked,  when  an  assignment  is  created  or

edited. If the validity start date is not indicated it will automatically be set to “Today”. If the validity

end  date  is  not  entered,  it  will  automatically  be  set  to  the  validity  start  date  +  maximum  validity

period. If both fields are assigned values and the maximum validity period is exceeded, editing of a

qualification will be canceled by issuing the error message “maximum validity period exceeded.

The fields ”category”, “relevant to workforce requirements planning”, “validity period" and "max.

validity  period”  are  only  available  if  the  license  "enhanced  personnel  information"  (SIS-EPI)  is

enabled or PEP 8.2 is in use (only applicable if HYDRA is used).

SIS-EPI_40.docx

Version: 1.0.23503

Page 8 of 19

Extended Personnel Information

4  Staff qualifications

Overview

HYDRA menu

Master data  Staff  Staff qualifications

FEDRA menu

Advanced Resource Planning  Master data  Staff qualifications

Transaction code

pequal

Function authorization

pequal

You can define the employees' qualifications in the Staff qualifications application:

Employees without qualification cannot be planned automatically in the Workplace assignment

application.

SIS-EPI_40.docx

Version: 1.0.23503

Page 9 of 19

Extended Personnel Information

Selection criteria

The application provides the following selection criteria:

Qualification

Enter a specific qualification to restrict the displayed assignments.

Category

Use this field to restrict the category assigned to the qualifications.

Validity ends ... to

Specifies when the qualification expires. If you use this option to restrict data, the application shows

all assignments whose validity end date coincides with the selected period.

Advanced training planned

Specifies  the  date  when  a  training  is  planned.  Use  this  option,  to  identify  all  employees  who  are

planned to participate in a training for a specific qualification and a specific date. As a result you get

a "list of participants".

The  selection  criteria  Category,  Validity  ends  ...to  and  Advanced  training  planned  are  only

available, if you enable the license  Extended personnel information (SIS-EPI) or version 8.2 of

the Personnel Scheduling (PEP) module.

Field descriptions

Person

The person's personnel number.

Qualification

Qualification number.

Ranking order

Ranking  of  the  qualification.  The  system  plans  qualifications  with  higher  ranking  first  during

automatic planning. You can use the numbers ranging between 99 and 1 to define the ranking.

Valid from, to

The validity period for the assigned qualification.

Without date specification => unlimited validity

Valid from - until

=> restricted to a date range

Valid from

Valid until

=> Workforce requirements apply as of the specified date

=> Workforce requirements apply until the specified date

SIS-EPI_40.docx

Version: 1.0.23503

Page 10 of 19

Extended Personnel Information

Evaluation

In  this  field,  you  can  enter  an  evaluation/rating  of  the  qualification  for  information  purposes.  The

field is only available if the user has the function authorization pequal or pequal.rating.

If  this  field  should  not  be  displayed  for  specific  users,  you  have  to  delete  the  function

authorization  pequal  for  these  users.  Then  you  have  to  add  the  required  function

authorizations pequal.create, pequal.edit, pequal.delete and pequal.copy.

Comment 1-3

Use these fields to add up to three comments for each assignment.

Advanced training planned

Date when a training is planned for this qualification.

Start time

Start time of the training.

Advanced training done

Check this field to document that the training has been completed.

The  fields  Evaluation,  Comment  1-3,  Advanced  training  planned,  Start  time  and  Advanced

training done are only available, if you enable the license Extended personnel information (SIS-

EPI) or version 8.2 of the Personnel Scheduling (PEP) module.

Toolbar

 Add file

Opens a dialog to select a file. Once selected, the file is saved with a unique name in the  HYDRA

path ”MOCHRIMG“ on the server. The File name field shows the file name.

 Show file

Shows any assigned file. Subject to the file extension, the application linked in the operating system

displays the file.

 Delete file

Deletes the assigned file.  Once  you have  used this function, the file  is no  longer available on the

server.

The  buttons  Add  file,  Show  file  and  Delete  file  are  only  available,  if  you  enable  the  license

Extended  personnel  information  (SIS-EPI)  or  version  8.2  of  the  Personnel  Scheduling  (PEP)

module (only applicable if HYDRA is used).

SIS-EPI_40.docx

Version: 1.0.23503

Page 11 of 19

Extended Personnel Information

SIS-EPI_40.docx

Version: 1.0.23503

Page 12 of 19

Extended Personnel Information

5  Work Equipment Management

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

Where?

Object type/user field key

Source (type)

SIS-EPI_40.docx

Version: 1.0.23503

Page 13 of 19

Extended Personnel Information

Table

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

Comment 1, comment 2, comment 3

3 comment fields to enter additional information

SIS-EPI_40.docx

Version: 1.0.23503

Page 14 of 19

Extended Personnel Information

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

SIS-EPI_40.docx

Version: 1.0.23503

Page 15 of 19

Extended Personnel Information

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

SIS-EPI_40.docx

Version: 1.0.23503

Page 16 of 19

Extended Personnel Information

6  Digital Personnel File

Summary

Menu

Master data  Staff  Digital personnel file

Transaction code

pefi

Function authorization

pefi

The application "digital personnel file" allows for staff information to be stored in HYDRA in the form of a

digital personnel file. Several categories with different access rights can be managed within the personnel

file. A file may be stored for each entry in the digital personnel file:

Field descriptions

Person, Name

The person's personnel number and name

Date

The date to which this entry belongs.

SIS-EPI_40.docx

Version: 1.0.23503

Page 17 of 19

Category

Assigns the entry to a category. If categories are used, the authorizations for accessing entries can

Extended Personnel Information

be controlled by responsibility areas.

Designation

Description of the entry

Comment 1, comment 2, comment 3

3 comment fields to enter additional information

File

A file may be stored for each entry in the digital personnel file. Three toolbar buttons allow for a file

to be added, viewed or deleted. This field shows the unique file name under which the file has been

stored on the server. The names of the files assigned to the "digital personnel file" start with "pefi".

Created by, created on

Editor and point in time when the entry was created

Modified by, modified on

Editor and point in time of the last modification

Toolbar

 Send e-mail

Opens an e-mail addressed to the employee of the currently selected entry. If an e-mail address is

entered for this employee in the "e-mail, company" field of the HR master, this address will be used.

 Add file

Opens  a  dialog  to  select  a  file.  Once  selected,  the  file  is  stored  with  a  unique  name  within  the

HYDRA path ”MOCHRIMG“ on the server. The “file” field shows the file name.

 Show file

Shows  the  files  that  might  be  assigned.  Subject  to  the  file  extension,  the  file  is  opened  and

displayed by the application connected in the operating system.

 Delete file

Deletes  the  assigned  file.  Once  this  function  has  been  used,  the  file  will  no  longer  exist  on  the

server.

SIS-EPI_40.docx

Version: 1.0.23503

Page 18 of 19

Extended Personnel Information

 Note: In the English version, the former label texts Handing out / Handed out on/by have been replaced

with Issued and Issued on/by from August 2019.

SIS-EPI_40.docx

Version: 1.0.23503

Page 19 of 19

