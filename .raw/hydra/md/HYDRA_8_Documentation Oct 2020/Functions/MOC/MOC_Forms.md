Forms

1  Forms

Summary

Menu

Master data  Quality management  Form

Transaction code

form

Function authorization

Form

If  you  have  the  authorization  “form.design”  the  print  selection  dialog  also
shows entries/reports that  have  not  yet  been released. This enables  you to
design and test reports before you publish them.

The catalog of forms has been designed to manage CAQ reports. New form entries may be created and

existing entries can be changed with respect to their options or descriptions. A new form entry is the basis

for the creation/designing of a new report. The report design is not part of this application.

Utilization

Some  CAQ  applications,  e.g.  inspection  planning,  inspection  requirement  and  failure  analysis  of

complaint management allow for a context-related list of Word forms to be opened using a special “print

button”  in  the  toolbar.  As  these  Word  forms  are  not  just  based  on  the  available  list  data,  an  export

program  is  required  that  “collects”  appropriate  data  and  makes  them  available  to  the  form.  Each  Word

form needs such an export program. Vice versa, many different forms can be created on the basis of an

export program.

MOC_Forms.docx

Version: 1.0.1362

Page 1 of 4

Forms

Export programs have been designed in a way so as to provide an as large amount of data as possible.

For example, the export program that is responsible for printing inspection plans including characteristics

exports  the  essential  header  data  of  the

inspection  plan  and

the  lower-level  characteristics.

Consequently,  different  inspection  plan  forms  can  be  created  on  this  basis  for  any  purpose.  The  same

applies to forms for printing inspection results/certificates.

The  context  of  the  corresponding  application  determines  which  forms  are  suggested  for  printing  in  the

relevant  application.  The  context  “InspectionPlan”  applies

for

inspection  planning,

the  context

“InspectionRequirment” applies for inspection requirements and “ComplaingManagement” applies for the

complaint module. One or several export programs are available subject to the context.

Integration

The below applications use the contents of this form catalog





Inspection planning (goods receipt, production, goods issue, gages, initial sample)

Inspection requirement (goods receipt, production, goods issue, gages, initial sample) and

  Complaint management (failure analysis)

Prerequisites

The Word versions Microsoft Office 2010 or 2012 are required for using this function of creating/designing

new forms or changing the design of existing forms. Word is not needed if the entries of this catalog are

only edited/maintained.

Selection criteria

The selection criteria are not described separately as they are self-explanatory.

Field descriptions

Form type

Form  type;  HYDRA  specifies  the  selection,  only  the  type  “Word  for Windows”  is  supported  at  the

moment.

Designation

Designation of the form as displayed in the print dialog

Context des.

Context in which the form is to be printed.

Form no.

Unique form ID

MOC_Forms.docx

Version: 1.0.1362

Page 2 of 4

Forms

File name

The file name of the HYDRA Word Report to be designed needs to be entered at first in the “file

name” field. Then all macro libraries in use have to be entered, separated by semicolon. Normally,

only the HYDRA macro library is used (HydraMacroLibrary.dotm). Moreover, the form number

must not start with the terms “TABELLE_“, „CAQ_“ or „GANT_“, as these are reserved prefixes.

Language

Language ID (e.g. DE, EN) for the user’s information. The language specified here is not related to

the  language  configured  for  the  console.  Foreign-language  forms  may  have  a  language  ID  that

does neither depend on the form ID nor the designation.

Position

  Numeric specification of which position the form should have in the list of printable forms. The list of

the print dialog does not automatically sort by the position number. It is up to the user’s decision by

which column the content is to be sorted. It is not checked if the position number is unique.

Print destination “e-mail“, “file“, “screen“ and “printer“

The activation of the print destination defines which destinations will later be available for this form

for  printing  in  the  corresponding  application.  If  only  the  “screen”  option  is  enabled  it  can  be

achieved, for example, that the report needs to be opened on the screen for reviewing the content.

Only then can printing be triggered manually.

Additional parameter

Additional parameters provide further control options for printing forms. Forms provided by HYDRA

CAQ can include control parameters. The export program provides information on possible control

parameters if new forms are created or existing forms are changed by the user. Further details on

the relevant export programs are described in separate documents.

Export program

Export program providing the data basis and that is assigned to the form

Export group

Export group assigned to the form

Active

Identifying the form as active/inactive. Only active forms may be selected for printing

Description

Detailed description of the form (max. 250 characters); the description is displayed at the bottom of

the print dialog when selecting the form

Options (number of copies / from page / to page)

The activation of options defines which options will later be available for this form when it is printed

in the corresponding application.

MOC_Forms.docx

Version: 1.0.1362

Page 3 of 4

Toolbar

Besides the standard functions, there are no other special function buttons.

Forms

MOC_Forms.docx

Version: 1.0.1362

Page 4 of 4

