User Fields

1  User Fields

Overview

HYDRA menu

FEDRA menu

System  administration    System  settings    User  fields    User  field
elements

System  administration    System  settings    User  fields    User  field
elements

Transaction code

Function authorization

uf

uf

Purpose

You use user fields to store customer-specific information for specified objects in the system in addition to

the fields available in the system standard.

You also use this function to structure the user field key. The system assigns the individual fields to the

generated administration entry of the user field key.

Integration

You can usually display the direct user fields in the respective application/dialog (e.g. Order information,

Workplace/machine  configuration)  in  the  tab  User  fields  or  in  the  category  User  fields.  The  user  fields

include the user field key and the unit (if used). The display is configurable.

For further information, please refer to the documentation MBL_Userfields.pdf.

Requirements

If you want to create user fields in the system, make sure that an administration entry is available for the

User field key you want to assign. Only then, can you assign user fields. You first generate the user field

key. Then you create a user field and assign the user field to this user field key. If you create user fields,

you must also define the field types.

For further information on the configuration of user field keys and user fields, refer to the documentation

Configuration_Userfields.pdf.

Field descriptions

You use the following fields to assign user fields to user field keys:

Object type

Object type assigned to the user field (e.g. AGNR - OP number)

MOC_UserFieldElements.docx

Version: 1.4.23322

Page 1 of 3

User Fields

User field key

Unique identification of the user field key the user field is assigned to (e.g. SYSTEM)

Field ID

Unique identification of the user field

Field type

Field type of the used user field (e.g. SZY - target cycle). You can define and edit the field types

in the application Type definition.

Name

Name of the user field. This name is also used as label text of the user field in the application.

Designation (name)

Descriptive name of the user field

Display position

Position of the user field in the application

Access mode

Direct or indirect user field.

Once you have created a user field, you cannot change the access mode

(direct/indirect). If you want to change the access mode, delete the user field and

create a new one.

Invisible in MOC

If this option is enabled, the user field is not visible in the MOC applications.

Additional information

Do not mix the access type (direct/indirect) for one user field key. You only assign direct

user fields to a user field key or the user field key only includes master-detail fields

(indirect).

The number of user fields and the field type are specific to the object and can vary. See

also the three examples for different objects:

Object

Order

Number of user fields

Type

66 user fields

User field 1-6 – Date

User field 7-22 – Integer

User field 23-28 – Decimal

User field 29-44 – Char (1)

User field 45-50 – Char (10)

User field 51-64 – Char (20

User field 65-66 – Char (40)

MOC_UserFieldElements.docx

Version: 1.4.23322

Page 2 of 3

Machine

66 user fields

User field 1-6 – Date

User Fields

User field 7-22 – Integer

User field 23-28 – Decimal

User field 29-44 – Char (1)

User field 45-50 – Char (10)

User field 51-64 – Char (20

User field 65-66 – Char (40)

Machine status

16 user fields

User field 1-4 – Integer

User field 5-6 – Decimal

User field 7-11 – Char (1)

User field 12-13 – Char (10)

User field 14-15 – Char (20)

User field 16 – Char (40)

MOC_UserFieldElements.docx

Version: 1.4.23322

Page 3 of 3

