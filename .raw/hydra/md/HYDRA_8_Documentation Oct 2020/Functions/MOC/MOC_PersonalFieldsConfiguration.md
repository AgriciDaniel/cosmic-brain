  Configuration of HR Master Fields and Badge Fields

1  Configuration of HR Master Fields and Badge Fields

1.1  Summary

Menu

Master Data --> People --> Configuration of HR Master Data Fields
Master Data --> Access Control --> Configuration of Badge Fields

Transaction Code

pefc

Function authorization

pefc

The personnel information license (PZE-INF) allows for additional information about individual people to

be defined in the HR master. For badges this function is activated using the visitor's badge management

license (ZKS-BAV). The configured fields are respectively displayed in the "additional info" tab.

30 possible fields are displayed in the configuration of HR master fields and badge fields. The position,

designation, length, default value and visibility of additional fields may be changed here.

Field Descriptions

Position

Position of the field  within  the HR master dialog. By  changing the number, a field may be moved

forward  or  backward.  All  fields  lying  in  between  are  moved  by  one  position.  This  allows,  for

example, for a date or figure field to be moved forward.

MOC_PersonalFieldsConfiguration.docx  Version: 1.0.1362

Page 1 of 2

  Configuration of HR Master Fields and Badge Fields

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

MOC_PersonalFieldsConfiguration.docx  Version: 1.0.1362

Page 2 of 2

