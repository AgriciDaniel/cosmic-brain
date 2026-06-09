Document Types

1  Document Types

Overview

Menu

can  be  started  by  creating  a  new  entry  in  the  "document  management"
application

Transaction code

n/a

Function authorization

doctype

This  configuration  is  used  in  order  to  create  or  change  the  document  types  available  in  the  system.

Document types are created for the entire system.

Utilization

There are different document types in order to classify document assignments and their properties.

In  addition  to  just  the  classification,  certain  functions  are  also  controlled  using  document  types.

Processing is controlled by indicating the link type within the document type.

Integration

Document types distinguish the different document assignments and specify the possibilities of document

recording.

Toolbar

"General" tab

  Add

Opens the dialog for adding a new document type.

Copy

Opens the dialog for copying a document type.

 Edit

Opens the dialog for editing a document type.

Delete

Deletes a document type.

MOC_DocumentTypes.docx

Version: 1.0.2718

Page 1 of 4

Document Types

Selection criteria

The application provides the following selection criteria:

Document type

Selects the document type.

Description

This  selection  criterion  refers  to  the  description  of  the  document  type.  Wildcard  characters

(placeholders) can be used.

Responsibility area

Selects the responsibility area.

Field Descriptions

Document type

"Self-explanatory" name for the document type

Description

Explanation of the document type. It is only used as commentary in HYDRA.

Responsibility area

The responsibility area which the document type is assigned to.

If displayed on the terminal screen (AIP), the responsibility area is not checked.

Link type

Indicates the link type. Four different link types are available:

(File, Filelink, URL and Text)

Path (only available with the link types FILE and/or FILELINK)

Path that can be configured in HYDRA in order to store files on the server (link type FILE) and/or to

indicate the directory of the document files to be linked (link type FILELINK).

Sub-directory (only with link type FILE)

Specifies processing in the storage directory.

None

The file is stored in the directory according to the path configuration

MOC_DocumentTypes.docx

Version: 1.0.2718

Page 2 of 4

Document Types

System variable

The file is stored in a sub-directory of the directory mentioned in the configured path. There are two

renaming options: YYYY-MM-DD and YYYY-MM-DD_HH-MM. With the first option a sub-directory

is created by the day while transferring a file and the documents are stored there. If the second

option is selected, documents are stored in minute by minute directories. If no such sub-directory is

created, it will be issued automatically.

Customer-specific

Reserved for customizations with respect to file handling

File name (only with link type FILE)

Specifies processing with respect to the file name

None

The file is stored with its original file name in the server. It will not be renamed.

System variable

The file is renamed according to the selected renaming option. There are three renaming options:

YYYY-MM-DD, YYYY-MM-DD_HH-MM and YYYY-MM-DD_HH-MM-SS. With the first option

selected, the file name is changed to the current date while transferring the file. The second option

sets the file name exactly to the minute and the third option sets it exactly to the second.

Customer-specific

Reserved for customizations with respect to file handling

Modified on

Time and date when the document type was changed at last.

Modified by

User who last changed and/or created the document type.

Link types

File

The  selected  file  is  transferred  to  the  server  and  retrieved  from  there  for  display  according  to  the

configured document type and path.

If  a  document  assignment  of  the  link  type  "File"  is  deleted,  the  document  file  remains  in  the

defined directory. The document file is not deleted.

MOC_DocumentTypes.docx

Version: 1.0.2718

Page 3 of 4

Filelink

A file included in a defined directory (according to the path configured in the document type) is linked and

retrieved  from  there  for  display.    The  document  file  is  not  transferred  to  the  server  when  assigning  the

Document Types

document.

URL

The link type "URL" allows indicating a URL link in order to access a file in the internet or intranet.

Text

The link type "text" enables text to be entered directly.

MOC_DocumentTypes.docx

Version: 1.0.2718

Page 4 of 4

