User fields
1 User fields
Purpose
User fields are fields without pre-defined meaning which are available with many objects (e.g. order,
machine/workplace,...). User fields offer the possibility to store customer-specific information in HYDRA in
addition to the default fields available in HYDRA.
The so-called user field key specifies the available user fields and their meaning. Each user field key thus
describes a combination of user fields. The management of the user field key (and therefore the meaning
of the fields) is different for each object.
The following applications show user fields:
 Detail view
 Table
Types of user fields
Depending on the object, different types of user fields are supported:
Direct user fields
Direct user fields are directly defined in the object (technically: in the object's table).
Benefits resulting from this kind of storage:
A quick database access to the fields is possible.
You can use the fields for customizations, which are easily realized.
The fields have differentiated data types.
Direct user fields can be referenced in formulas (provided that a processing in HYDRA is
planned)
Disadvantage:
The number of user fields is limited.
Indirect user fields
Indirect user fields are not directly defined in the object (i.e. in the object's table) but in a separate
table. You logically reference this table via the user field configuration.
Benefits resulting from this kind of storage:
 You can theoretically define any number of user fields.
Restrictions:
MBL_Userfields.docx Version: 1.0.18468 Page 1 of 3

|     |     |     |     |     |     | User fields  |
| --- | --- | --- | --- | --- | --- | ------------ |

  These user fields do not have differentiated data types within the database.
  A quick database access to the fields is not possible; the selection and formatting of the fields is
less trivial.
|    | You cannot use the fields for customizations.        |     |     |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- | --- | --- |
|    | You cannot display the fields in evaluation tables.  |     |     |     |     |     |
Additional information in the HR master data and badges (type HR)
In the HR master data and in the Badges, the following fields (type HR) are available to store additional
information:
  Field data type  Number of  Database field name  Database data type
fields
|   Text field, length 40  |     | 10  | infotext_1…10   |     | CHAR(40)  |     |
| ------------------------ | --- | --- | --------------- | --- | --------- | --- |
|   Text field, length 20  |     | 5   | infotext_11…15  |     | CHAR(20)  |     |
|   Text field, length 10  |     | 5   | infotext_16…20  |     | CHAR(10)  |     |
|   Numeric                |     | 5   | infowert_1…5    |     | INTEGER   |     |
|   Date                   |     | 5   | infodatum_1…5   |     | DATE      |     |

User fields in the manufacturing environment (type MF-D, MF-C)
The following user fields (type MF-D) are available in the MF environment:
  Field ID/index  Field data type  Number of  Database field  Database data
|     |              |     | fields  | name            |     | type  |
| --- | ------------ | --- | ------- | --------------- | --- | ----- |
|     | 1 - 6  Date  |     | 6       | USER_D_01...06  |     | DATE  |
  7 - 22  Numeric, time, duration  16  USER_N_07...22  INTEGER
|     | 23 -28  Decimal value  |     | 6   | USER_F_23...28  |     | FLOAT/DECIMAL  |
| --- | ---------------------- | --- | --- | --------------- | --- | -------------- |
  29 - 44  Text field, length 1  16  USER_C_29...44  CHAR(1)
  45 - 50  Text field, length 10  6  USER_C_45...50  CHAR(10)
  51 - 64  Text field, length 20  14  USER_C_51...64  CHAR(20)
  65 - 66  Text field, length 40  2  USER_C_65...66  CHAR(40)

In selected Configurations, user fields of type MF-C are available. But compared to the above-mentioned
user fields of type MF-D, the number of user fields is inferior:
  Field ID/index  Field data type  Number of  DB field name  DB data type
fields
  1 – 4  Numeric, time, duration  4  USER_N_01...04  INTEGER
|     | 5 – 6  Decimal value          |     | 2   | USER_F_05..06   |     | FLOAT/DECIMAL  |
| --- | ----------------------------- | --- | --- | --------------- | --- | -------------- |
|     | 7 – 11  Text field, length 1  |     | 5   | USER_C_07...11  |     | CHAR(1)        |
  12 – 13  Text field, length 10  2  USER_C_12...13  CHAR(10)
  14 – 15  Text field, length 20  2  USER_C_14...15  CHAR(20)
|     | 16  Text field, length 40  |     | 1   | USER_C_16  |     | CHAR(40)  |
| --- | -------------------------- | --- | --- | ---------- | --- | --------- |

| MBL_Userfields.docx  |     | Version: 1.0.18468  |     |     |     | Page 2 of 3  |
| -------------------- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     | User fields  |
| --- | --- | --- | --- | ------------ |

User fields in the quality management environment (type QM)
The following user fields (type QM) are available in the QM environment:
  Field ID/index  Field data type  Number of  DB field name  DB data type
fields
|     | 1 - 5  Text field, length 50  |     | 5  USER_C_01...06  | CHAR(50)  |
| --- | ----------------------------- | --- | ------------------ | --------- |
  6 - 10  Numeric, time, duration  5  USER_N_01...05  INTEGER
|     | 11 - 12  Decimal value  |     | 2  USER_F_01...02  | FLOAT/DECIMAL  |
| --- | ----------------------- | --- | ------------------ | -------------- |
|     | 13 - 14  Date           |     | 2  USER_D_01...02  | DATE           |

Configuration of user fields
The documentation Configuration of user fields describes how to configure user fields.

| MBL_Userfields.docx  |     | Version: 1.0.18468  |     | Page 3 of 3  |
| -------------------- | --- | ------------------- | --- | ------------ |