Configuration of user fields

1  Configuration of user fields

Purpose

User  fields  are  fields  without  pre-defined  meaning  which  are  available  with  many  objects  (e.g.  order,

machine/workplace,...). User fields offer the possibility to store customer-specific information in HYDRA in

addition to the default fields available in HYDRA.

The so-called user field key specifies the available user fields and their meaning. Each user field key thus

describes a combination of user fields. The management of the user field key (and therefore the meaning

of the fields) is different for each object.

User fields are displayed in different MOC applications:





in detail views,

in tables.

Please refer to the documentation of the application to find out, if the  application supports the display of

user fields

Types of user fields

The document MBL_Userfields.pdf describes the different types and the available number of user fields.

How to configure user fields in the HR master and the Badges

The  document  MOC_PersonalFieldsConfiguration.pdf  describes  how  to  configure  user  fields  in  the  HR

master and Badges.

How to configure user fields

Proceed as follows to configure user fields:

1.  Preparation

  Define the object (e.g. operation, resource, inspection plan) for which you want to configure user

fields. The object types are specified in accordance with the application. If you want to display user

fields in an application, you can check in the respective documentation whether the display of user

fields is supported and which object types are supported.

  Define  the  name  of  the  user  field  key.  Please  note  that  the  user  field  key  must  not  exceed  8

characters.

Configuration_Userfields.docx

Version: 1.0.18468

Page 1 of 4

Configuration of user fields

In defined MOC applications, you can display user fields in tables . In some cases, you

must configure a specific user field key to this end. The documentation of the respective

MOC application describes which user field key must be configured here.

  Define the items described in the following and note them down:

  Tip: Create a table including the following columns:

Name

Type  Object type  User field

key

Direct/
Indirect

Field
ID

Data  type,
format

Field
type

  Define the user fields you want to create.

  Define the name to be displayed.

  Define the data type of the respective user field, e.g.

- text limited to max. 20 characters

- numeric with 3 decimal places

  Specify whether it is a direct or indirect user field.

You must not mix the access type (direct/indirect) within one user field key. You

can assign only direct user fields or only indirect user fields to one user field key.

  Use the table above to find out if the necessary number of user fields of the required data type is

available for the respective object. Note down the field ID that you want to use for the user field.

If you want to add further user fields to an existing user field key, you must check if user fields of

the required data type are still available for the new user fields.

  Define the field type for each user field. Check in the application Type definition if the required field

type already exists. If the required field type does not yet exist, you must create this field type (see

the following section).

2.  Configuration in the application "Type definition"

It depends on the data type and the format of the new user field whether you can use the pre-configured

field types or whether you must create new field types.

  Call the application Type definition.

  Check, if the required field types already exist.



If necessary, create new field types. Ensure that the new field types start with U:

Configuration_Userfields.docx

Version: 1.0.18468

Page 2 of 4

Configuration of user fields

3.  Configuration of the user field key

  Call the application User field key .

  Call the function Insert.

  Enter

o  Object type

o  User field key

o  Description (is shown as category in tables)

  Save the settings.

4.  Configuration of the user fields that should be assigned to the user field key

  Call the application User fields.



In the selection panel, enter the object type and the user field key and click Request data.

  Call the function Insert.

  Enter

o  Object type

o  User field key

o  Field ID

o  Field type

o  Name (is shown as column header in tables; in detail applications in the tab User fields it

is displayed as field label before the input field)

o  Designation

o  Display position (order of the user fields in the tab User fields in detail applications)

o  Access type: direct

  Save the settings.

When defining direct user fields, you must make sure that the used object type of the

user field corresponds to the data type of the underlying user field.

Example:

If you want to define a user field "additional text" with the length 10, you must make sure

that  an  object/field  type  (e.g.  U:USER_T10)  with  data  type  "text"  and  length  10  is

available. When assigning a user field to a user field key, make sure that you use the

defined object/field type as object type AND that you select a user field via the field "Field

ID" whose data type is equally "text" and whose length is greater than or equal to 10

characters (in the table above, this would be a field with field ID 45 to 66)

Configuration_Userfields.docx

Version: 1.0.18468

Page 3 of 4

Configuration of user fields

Note the following with regard to DNC:

Please note for the configuration of DNC user fields: If the two options "Mandatory field

for  upload"  and  "Not  alterable  (read-  only)"  are  enabled,  the  input  field  in  the  upload

dialog of the shop floor client AIP is generally displayed as a field accepting input. We

therefore recommend to make sure that you do not enable both options when configuring

DNC user fields.

Configuration_Userfields.docx

Version: 1.0.18468

Page 4 of 4

