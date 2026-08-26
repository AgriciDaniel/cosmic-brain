Units

1  Units

Overview

HYDRA menu

System administration  System settings  Units

FEDRA menu

System administration  System settings  Units

Transaction code

unit

Function authorization  mdunit

Purpose

The units are stored in an administration table. This table is used during validation checking to compare

the  quantity  units  entered  (e.g.  at  an  operation)  or  to  check  the  information  transferred  at  the  interface.

Application of units:

Integration

The units are stored in an administration table. This table is used during validation checking to compare

the  quantity  units  entered  (e.g.  at  an  operation)  or  to  check  the  information  transferred  at  the  interface.

The units are used in different areas:

  Quantity units in the order backlog

  Quantity units in order entry and posting

  Quantity units used to enter rolls

Field descriptions

Unit

Unit of quantity, such as kg

Unit ISO

ISO quantity unit, if different

Type

This field can be used to group different quantity units, such as mm, cm, m, km, etc. belonging to

the "length" type.

This value can be selected and transferred from the list. Alternately, any other arbitrary  value can

be entered here manually.

MOC_Units.docx

Version: 1.3.23369

Page 1 of 2

Units

Designation

Designation or description of the unit (e.g. kilogram)

SI unit

Unit as stipulated by the "SYSTEME INTERNATIONAL" agreements.

Values Y/N; there can be a maximum of one SI unit within one type. However, there can also be

types that do not have an SI unit.

Usage: One unit of measure is designated as SI unit in each dimension. Among other things, this is

the reference point used when converting from one unit to another.

Examples: The SI unit used for length is meter; the SI unit used for time is second, etc.

MOC_Units.docx

Version: 1.3.23369

Page 2 of 2

