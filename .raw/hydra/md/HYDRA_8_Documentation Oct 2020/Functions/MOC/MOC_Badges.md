Badges

1  Badges

Overview

Menu

Human resources management  Access control  Badges
Master data  Access control  Badges

Transaction code

badg

Function authorization

badg

You use this application to manage the existing badges and the respective owners.

Available user fields

Where

Object type/user field key

Source (type)

Table and detail view

KNR/SYSTEM

Badges (HR)

How to configure user fields?

Which user field types are available?

MOC_Badges.docx

Version: 2.0.18468

Page 1 of 7

Badges

If you create a person, a badge is automatically created for this person, if a badge number has

been entered in the HR master data.

Field descriptions

Badge

The badge number can include numbers (0-9) and the letters A-F.

Badge type

Define the badge type. The following badge types are available:

Employee

An employee's badge

Replacement  An employee's replacement badge

Visitor

Free

Visitor's badge

Free badge that is currently not used. It can be assigned to a new person.

The  badge  types  Replacement,  Visitor  and  Free  are  only  available,  if  the  license

Advanced  access  control  (ZKS-EZK)  or  Management  of  visitor  badges  (ZKS-BAV)  is

available.

Person, company

In case  of staff badges and  replacement badges,  you must assign the badges  to a  person and a

company. Visitor badges are created with the personnel number 0.

Last name, first name

Enter the person's last name and first name. If you  select a personnel number, the two fields are

automatically populated with the person's names from the HR master data.

PIN code, Confirmation

If you enter a PIN code in the reader, the badge cannot be misused by unauthorized persons. This

function is not available for all terminal types. For Kaba Benzing terminals, this PIN code must be

numeric and requires four digits. If you change the PIN code, the digits are masked by asterisk and

must be entered a second time in the field Confirmation.

Responsibility area

You use the responsibility area to control the users who have access to a badge.

MOC_Badges.docx

Version: 2.0.18468

Page 2 of 7

Badges

Valid from, to

You  can  define  a  validity  period  for  a  badge.  If  you  do  not  enter  an  end  date,  the  validity  of  the

badge  is  unlimited.  You  can  restrict  the  validity  time  on  the  first  and  last  day  of  validity  using  the

time  fields.  The  validity  time  is  only  processed  by  terminals  of  type  CT-385.  You  can  restrict  the

validity time, but you cannot create a badge for multiple time periods of one specific day.

Input with keyboard

This  option  specifies  if  you  can  enter  the  badge  number  instead  of  using  the  biometric  data  for

identification. You can use this option if the biometric data cannot be read.

For security reasons, we recommend to use this option only in combination with additional

PIN code entry.

Input with badge

This  option  specifies  if  you  can  read  the  badge  via  RFID  instead  of  using  the  biometric  data  for

identification. You can use this option if the biometric data cannot be read.

Block badge

You use this option to block a badge. Blocked badges are not allowed to enter any access points.

They are used to document the previous function and user.

Comment, Comment 2

You  can  enter  any  information  in  the  comment  fields.  For  example,  it  might  be  useful  to  enter  a

comment for visitor badges (company and purpose of the visit).

Contact person

For visitor badges, you can store the personnel number of the contact person.

Number plate

You can store the number plate of the badge owner in this field.

Badge handout, Badge return

Point in time when the badge is issued or returned.

Picture recording

Point in time of the last image assigned to the person.

Badge printing

Point in time when the function Badge printing was last called for this badge.

Badge layout

In this field, enter the badge layout to be used for this badge.

Badge layout printed

This field shows the badge layout that was last used for this badge.

MOC_Badges.docx

Version: 2.0.18468

Page 3 of 7

Badges

The  fields  Picture  recording,  Badge  printing,  Badge  layout  and  Badge  layout  printed  are  only

available, if the extension BadgesVersion2 is activated.

Additional info

In tab Additional info, up to 30 fields are available. Name, length and position of the user fields can

be configured in the Configuration of badge fields.

Toolbar

 Edit all selected badges

Function authorization: badg.massedit

You can use this function to edit data of several badges at the same time. You can select up to 10

HR master data fields and assign a value:

The function Edit all selected badges is only available, if the extension BadgesVersion2 is

activated.

MOC_Badges.docx

Version: 2.0.18468

Page 4 of 7

Badges

 Badge handout

Function authorization: badg.handout

Opens a dialog to enter the point in time when the badge is issued. The point in time of the badge

generation is preassigned.

 Badge return

Function authorization: badg.return

Opens  a  dialog  to  enter  the  point  in  time  when  the  badge  is  returned.  Returned  badges  are

automatically blocked and the validity end date is set to today if the end date is empty or the date is

in the future.

 Badge printing

Function authorization: badg.print

Opens a window to print the selected badges.

 Modify image

Function authorization: badg.picture

To assign an image, the following dialog opens:

 HR master data

Calls the HR master data.

The button to call the HR master data is only available, if the extension BadgesVersion2 is

activated.

 Access authorizations

Shows the Access profile assignments for the selected badge.

 Access log

Calls the Access log of the selected badge.

MOC_Badges.docx

Version: 2.0.18468

Page 5 of 7

The  button  to  call  the  access  log  is  only  available,  if  the  extension  BadgesVersion2  is

activated.

Badges

 Room zone overview

Calls the Room zone overview of the selected badge.

The  button  to  call  the  room  zone  overview  is  only  available,  if  the  extension

BadgesVersion2 is activated.

 Badge layouts

Function authorization: bala

Calls the configuration of the Badge layouts.

 Report designer

Function authorization: bala

Design of the selected badge layout. You must first request data, then you can call the function.

Integration

Synchronization of HR master data and badges

If you make changes in the HR master data, specific badge data are synchronized.

Company

Name and first name

PIN code

Picture

Additional information (configured HR master data and badge fields)

Date of joining and date of leaving

The system only synchronizes the additional information that has the same designations, data types and

field formats.

Badges that were valid in the past are not changed. If you change name, company or an additional info

field  in  the  HR  master,  a  new  version  is  created  in  the  badges,  if  required.  Picture  and  PIN  code  are

synchronized for all versions.

If the date of joining specified in the HR master data und the start of validity of a badge were identical, the

start of validity changes if you change the date of joining. The same applies for the date of leaving in the

HR master data.

MOC_Badges.docx

Version: 2.0.18468

Page 6 of 7

Badges

For the date of joining and leaving, there are some restrictions. For example, you cannot change dates of

the past and the validity time of badge versions must not overlap. The badge version is deleted if the start

of validity of a badge is later than the end of validity after synchronization of the date of joining or leaving.

Start and end of a badge validity can be moved, but not to an earlier point in time than the start of validity

and not to a later point in time than the end of validity specified in the changed HR master data version.

And also vice versa, changed badge data is synchronized with specific data fields in the HR master data.

For further details, refer to the documentation of the HR master data.

MOC_Badges.docx

Version: 2.0.18468

Page 7 of 7

