Attributes

1  Attributes

Summary

Menu

Master data  Material  Attributes

Transaction code

batatt

Function authorization

batatt

Usage

This function is used to create or modify batch attributes in the system.

Integration

The recording function on the terminal can be activated (when changing to a output batch) by assigning

batch attributes to a material type.

Requirement

The material types must already be defined.

Selection criteria

Material type

Only attributes with the selected material type are selected.

Field index

Only attributes with the selected field index are selected.

Attributes

Only the specified attributes are selected.

When using multiple selection criteria - if nothing else is specified - the amount of overlap of the selection

criteria is displayed.

Field descriptions

Material type

The material type is a key field. The attribute refers to the selection material type (material type =

summary of identical materials).

MOC_BatchAttributeConfiguration.docx  Version: 1.1.18468

Page 1 of 2

Field index

The field index is a key field. There are 40 text fields, 20 numerical fields and 20 decimal fields from

Attributes

which to select.

Display position

Specifies the order for display on the terminal.

Name

Designation of the attribute.

Unit

Unit of the attribute

Display attribute

If this identifier is set, the attribute is taken into consideration in the display in other masks.

Print attribute on batch ticket, printing position

Reserved; currently no processing.

Capture attribute while generating batch

If this identifier is set, the attribute can be captures during batch generation.

Automatic transfer (additional option)

Field  value

from

the  operation  or  order  header  can  be

transferred  automatically.

The specification is made for this from:

MES  operation  or  MES  order  header  via  a  field  acronym  that  can  be  selected  (e.g.  ATK  –

item/article number, FU:10 - User field 10, etc.)

Data type

Here the data type of the field is specified,  including field length and decimal places, if necessary.

However, it is not useful to place a text in a decimal field or decimal input in a text field.

MOC_BatchAttributeConfiguration.docx  Version: 1.1.18468

Page 2 of 2

