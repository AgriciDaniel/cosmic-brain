Manual

Management of visitor badges
(MOC)
ZKS-BAV 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Management of visitor badges (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

ZKS-BAV_81.docx

Version: 1.0.23049

Page 2 of 14

Management of visitor badges (MOC)

Contents

1  Management of Visitor Badges - Overview .................................................. 4

2  Configuration of HR Master Fields and Badge Fields .................................. 5

3  Badge Layouts ............................................................................................. 7

4  Designing Badge Layouts ............................................................................ 9

ZKS-BAV_81.docx

Version: 1.0.23049

Page 3 of 14

Management of visitor badges (MOC)

1  Management of Visitor Badges - Overview

Possible fields of application

The management of visitor badges allows for visitor badges to be managed and printed in the system. In

addition to that, the management of visitor badges provides additional information fields for the badge the

designation of which can be configured.

Implementation notes

The function package is used if you:

  use  the  HYDRA  access  control  system  (ZKS),  record  visitors  in  the  system  and  if  you  want  to

authorize them to open entrances by visitor badges.

Integration

This function package can only be used if the HYDRA access control module is in use (function package

"access control management functions").

Functions

  Visitor badges

o  Management of visitor badges

  Printing of visitor badges

o  Printing of visitor badges or visitor passes including several layouts that can be defined

  Additional badge fields

o  Configurable  badge  fields  to  enter  additional  information  relating  to  the  badge  (e.g.

license plate, parking lot, safety briefing)

ZKS-BAV_81.docx

Version: 1.0.23049

Page 4 of 14

Management of visitor badges (MOC)

2  Configuration of HR Master Fields and Badge Fields

1.1  Summary

Menu

Master Data --> People --> Configuration of HR Master Data Fields
Master Data --> Access Control --> Configuration of Badge Fields

Transaction Code

pefc

Function authorization

pefc

The personnel information license (PZE-INF) allows for additional information about individual  people to

be defined in the HR master. For badges this function is activated using the visitor's badge management

license (ZKS-BAV). The configured fields are respectively displayed in the "additional info" tab.

30 possible fields are displayed in the configuration of HR master fields and badge fields. The position,

designation, length, default value and visibility of additional fields may be changed here.

Field Descriptions

Position

Position of the field  within  the HR master dialog. By  changing the  number, a field may be moved

forward  or  backward.  All  fields  lying  in  between  are  moved  by  one  position.  This  allows,  for

example, for a date or figure field to be moved forward.

ZKS-BAV_81.docx

Version: 1.0.23049

Page 5 of 14

Management of visitor badges (MOC)

Active

This checkbox is used to set the terminal to 'active' or 'inactive'. Inactive fields are not available in

the selection of HR master fields for lists and reports.

Designation

Designation that is to be displayed in front of the corresponding field within the HR master.

Length

The  field  length  can  be  configured  here.  The  length  has  to  range  between  1  and  the  maximum

length. The maximum field length cannot be changed.

Default value

The default value is automatically taken over when a person is created and may still be changed for

the person.

Responsibility area

The  responsibility  are  controls  which  user  is  allowed  to  use  which  additional  field  as  selection

criterion. The "use" function is checked in this context for the responsibility area. In addition to this,

the  "display"  function  of  the  responsibility  area  defines  whether  or  not  the  user  may  view  the

corresponding additional field in the HR master.

Type

The data type of a field is  predefined. If a field  with another data type is required it is possible to

move a field that is assigned to the corresponding data type to this position (see "position" field).

Only integer values may be entered in additional fields that are assigned to the "numeric" type.

ZKS-BAV_81.docx

Version: 1.0.23049

Page 6 of 14

Management of visitor badges (MOC)

3  Badge Layouts

Overview

Menu

Master data  Access control  Badges

Transaction code

bala

Function authorization

bala

Different badge layouts may be defined and activated for various groups, e.g. employees and visitors.

Configuration 0 - the HYDRA standard layout - is included by default and must not be changed. In order

to create own layouts, an existing layout must be copied.

Modifications in the layout of badges are filed on the server and available at all MOCs.

The configuration for the badge layouts is called up in the  badges using the relevant button in

the toolbar.

Field Descriptions

Designation

Designation of badge layout

ZKS-BAV_81.docx

Version: 1.0.23049

Page 7 of 14

Management of visitor badges (MOC)

Comment

Detailed designation of badge layout.

Toolbar

 Activate badge layout

This button is used to activate a badge layout.

 Deactivate badge layout

This button is used to deactivate a badge layout.

ZKS-BAV_81.docx

Version: 1.0.23049

Page 8 of 14

Management of visitor badges (MOC)

4  Designing Badge Layouts

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

ZKS-BAV_81.docx

Version: 1.0.23049

Page 9 of 14

Management of visitor badges (MOC)

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

ZKS-BAV_81.docx

Version: 1.0.23049

Page 10 of 14

In  ReportConfiguration,  the  badge  layout  to  be  edited  is  displayed  in  the  Template  file  field.  The

List&Label Designer is started by clicking on the Report Designer button.

Management of visitor badges (MOC)

No changes must be made to these settings.

Editing Functions

The "Report Designer" button can be used to edit the report. Before this, data must have been requested.

The design is performed in the external Report Designer.

ZKS-BAV_81.docx

Version: 1.0.23049

Page 11 of 14

Management of visitor badges (MOC)

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

ZKS-BAV_81.docx

Version: 1.0.23049

Page 12 of 14

Report Structure:

Management of visitor badges (MOC)

The report container includes the  BadgesList table showing the  data of the selected badges. For each

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

ZKS-BAV_81.docx

Version: 1.0.23049

Page 13 of 14

Management of visitor badges (MOC)

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

ZKS-BAV_81.docx

Version: 1.0.23049

Page 14 of 14

