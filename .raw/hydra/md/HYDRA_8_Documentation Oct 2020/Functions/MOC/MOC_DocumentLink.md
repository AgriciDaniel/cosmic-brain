Document Management

1  Document Management

Summary

Menu

can be started via the menu bar of object-specific applications

Transaction code

n/a

Function authorization

docli

As many documents and/or document links can be assigned to each HYDRA object.

In  general,  four  different  link  types  are  available.  (They  can  be  maintained  via  the  configuration  of

document types)

File

The  selected  file  is  transferred  to  the  server  and  retrieved  from  there  for  display  according  to  the

configured document type and path.

If  a  document  assignment  of  the  link  type  "File"  is  deleted,  the  document  file  remains  in  the

defined directory. The document file is not deleted.

If an assigned document of the link type "File" is edited and a new file is stated, the file will not

be transferred once more to the server. In this case, it is assumed that the file is already stored

in the target directory.

Filelink

A file included in a specified directory (according to the configured document type and path) is linked and

retrieved from there for display.  It is not transferred to the server.

URL

The link type "URL" allows indicating a URL link in order to access a file in the internet or intranet.

Text

The link type "text" enables text to be entered directly.

MOC_DocumentLink.docx

Version: 1.0.2770

Page 1 of 4

Document Management

Utilization

A  designation/description  can  be  assigned  to  each  defined  document.  Once  saved,  a  consecutive  item

number  (numeric)  is  automatically  assigned  to  each  entered  document.  Provided  that  no  number  was

entered when the document was assigned initially.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible  to  assign  simple  documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  But  a

suitable  program,  which  can  display  this  format,  must  be  installed.  The  documents  are  opened  by  the

program, which was indicated as link in Windows.

Requirements

Relevant document types and, if necessary, their path configuration must be edited/maintained to be able

to assign documents.

Selection criteria

The application provides the following selection criteria:

Document type

Selects the document type

Link type

Selects the link type

Name/Description

This  selection  criterion  refers  to  the  name  of  the  assigned  document.  The  wildcard  character

(placeholder %) can be used.  Searching for %Text% reveals  all document assignments matching

the word "text".

Document type and keys including their values

These  selection  criteria  are  assigned  by  default,  always  active  and  cannot  be  changed.  These

fields  are  completed  with  corresponding  criteria  subject  to  the  application  where  the  document

management function was started.

Field Descriptions

Item

Item number of document assignment. A consecutive number is generated automatically if no item

number is entered when the document is assigned initially.

Name/Description

Description of document assignment. It is only used as commentary in HYDRA.

MOC_DocumentLink.docx

Version: 1.0.2770

Page 2 of 4

Document Management

Document type

Shows the document type of the document assignment.

Link type

Shows the link type of the document assignment.

URL link

Here the defined URL path is shown for documents of the link type URL. The file name including

sub-directory, if necessary, is shown for the link types FILELINK and FILE.

Text

The defined text is shown here for documents of the type TEXT.

Visible on terminal screen

Shows the assigned document on the AIP terminal.

Terminal user

The terminal number must be entered here if documents are assigned via a terminal.

Created on

Time and date when the document was assigned.

Created by

User who assigned the document. (If assigned via MOC)

Modified by

User who changed the document assignment most recently.

Modified on

Time and date when the document assignment was changed most recently.

Terminal user

The terminal number must be entered here if the assigned document is changed using the terminal.

Toolbar

"General" tab

  Add

Opens the dialog to add document assignments.

   Edit

Opens the dialog to edit document assignments.

MOC_DocumentLink.docx

Version: 1.0.2770

Page 3 of 4

Document Management

  Delete

Deletes document assignments.

  Show document

If a document link is stored this button opens and shows the linked document. However, a program,

which can show the linked file type, has to be installed on the PC.

MOC_DocumentLink.docx

Version: 1.0.2770

Page 4 of 4

