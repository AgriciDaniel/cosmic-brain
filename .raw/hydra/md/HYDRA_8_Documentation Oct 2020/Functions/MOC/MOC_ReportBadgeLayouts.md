Designing Badge Layouts

1  Designing Badge Layouts

Overview

Different badge layouts may be defined for various groups, e.g. employees and visitors. Individual layouts

can be customized by calling up the Report Designer function in the Badges application.

Prerequisite

The modification of badge layouts is only possible if the license ZKS-BAV is available.

 Badge layouts

If  a  new  badge  layout  is  to  be  created,  it  must  first  be  created  in  the  configuration  of  the  badge

layouts.

 Report Designer

An existing badge layout can be modified by calling up the Report Designer function.

Filing Badge Layouts on the HYDRA Server

Badge layouts are saved in the report directory on the HYDRA server. For this purpose, the "MOCREP"

path is required". The path must always be directed at <system>/custom/reports. It is not permissible to

change the path.

Example of configuration in Windows (System 1):

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 1 of 6

Designing Badge Layouts

For saving on the server, the current scope on MOC is taken account of:







If the scope is "User" or "Local", the report file is saved as "<reportname>_local.lul".

If the scope is "Custom", the report file is saved as "<reportname>_custom.lul".

If the scope is "Standard", the report file is saved as "<reportname>.lul".

With regard to the loading sequence, the current scope on MOC is taken account of:

  Scope "User" or "Local"

File

from

the

report

directory

on

the

server, "<reportname>_local.lul"

before

"<reportname>_custom.lul"  before  "<reportname>.lul".  If  none  of  the  three  exists,  the  client  is

searched (user=>local=>custom=>standard).

  Scope "Custom"

File

from

the

report  directory  on

the

server,  "<reportname>_custom.lul"  before

"<reportname>.lul". If none of the two exists, the client is searched (custom=>standard).

  Scope "Standard"

File from the report directory on the server, "<reportname>.lul". If the file does not exist, the client

is searched (standard).

Calling up the Report Designer

The  "Report  Designer"  button  is  used  to  modify  the  currently  selected  and  displayed  badge  layout.  For

this purpose, the "Badges" entry is selected and subsequently the "Edit" button is pressed.

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 2 of 6

In  ReportConfiguration,  the  badge  layout  to  be  edited  is  displayed  in  the  Template  file  field.  The

List&Label Designer is started by clicking on the Report Designer button.

Designing Badge Layouts

No changes must be made to these settings.

Editing Functions

The "Report Designer" button can be used to edit the report. Before this, data must have been requested.

The design is performed in the external Report Designer.

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 3 of 6

Designing Badge Layouts

The following special functions are available here:

mpdvTranslate("Language key")

"Language key" is an entry from the translation file in the form "lkXXX". The translation is performed

according to the language specified in MOC.

mpdvTimeFromSeconds(<SekundenSeitMitternacht>)

A  numeric  value  in  seconds  since  midnight  is  converted  into  a  time  and  displayed  in  the  given

format. Format: hh:ss

mpdvDuration(<SekundenSeitMitternacht>)

A numeric value in seconds since midnight is converted into a duration and displayed in the given

format. Format: h:ss

The manual of the integrated Designer is opened using the F1 key.

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 4 of 6

Report Structure:

Designing Badge Layouts

The report container includes the  BadgesList table showing the data of the selected badges. For each

badge,  there  is  a  MultipleImageDownload  table  which  contains  the  photographs  of  the  respective

persons.

  The BadgesList table contains the data relating to the badge.

  The photographs of the persons are provided in the sub-element MultipleImageDownload.

Field Descriptions

Variable / field list: Fields  BadgesList

The following data are available here:

Data field

Meaning

badgeslist.badge.type
badgeslist.badge.hand_out_ts
badgeslist.badge.commentary
badgeslist.badge.commentary2
badgeslist.badge.valid_from_ts
badgeslist.badge.valid_to_ts
badgeslist.badge.person.company
badgeslist.badge.infodate1 -5
badgeslist.badge.infotext1 -20
badgeslist.badge.infovalue1-5
badgeslist.badge.number_plate
badgeslist.badge.id
badgeslist.badge.person.name
badgeslist.badge.person.id
badgeslist.badge.contact.person.id

Badge type
Date and time of badge issue
Comment field 1
Comment field 2
Valid from
Valid until
Person's company
User field date 1 to 5
User field text 1 to 20
User field value 1 to 5
Number plate
Badge number
Name of person
Personnel number
Contact person

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 5 of 6

Designing Badge Layouts

badgeslist.badge.contact.person.name
badgeslist.badge.firstname
badgeslist.badge.return_ts
badgeslist.badge.responsibilityarea

Name of contact person
First name of person
Date and time of badge return
Responsibility area

Variable / field list: Fields  MultipleImageDownload

The following data are available here:

Data field

multipleImagedownload.file.data
multipleImagedownload.file.name

Meaning

Path and file name of image
Badge image file name

MOC_ReportBadgeLayouts.docx

Version: 1.1.20406

Page 6 of 6

