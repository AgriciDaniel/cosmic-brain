|     |     |     | User Fields  |
| --- | --- | --- | ------------ |

1  User Fields
Use of User fields
Detail views (e.g. table views or layouts) may be allocated to user fields by defining the object type and
the user field key.
Steps
| o   | Configure detail application                                        |     |     |
| --- | ------------------------------------------------------------------- | --- | --- |
| o   | User fields 1 / 2  command button                                   |     |     |
| o   | Type and user field key selection                                   |     |     |
| o   | Checkbox "Generate parameter in selection panel".                   |     |     |
| o   | Press "OK" => User fields are shown in table view and detail view.  |     |     |

At present, the user fields are only supported in table and detail views (layout).

After pressing the OK button, the user configuration is read and all user fields are returned along with a
configuration.
On basis of the identified user field - field names, all acronyms with the same field name will be identified
in the related data source of the current detail application. The data source BOOrderOverview.list has two
acronyms with "userfield53" in the following example. The user may choose which acronyms shall be
used for the read user field configuration.

| MDS-Userfields.docx  |     | Version: 1.0.8238  | Page 1 of 2  |
| -------------------- | --- | ------------------ | ------------ |

User Fields
Upon pressing OK, a new category, "User fields" with related columns is created.
After saving the application, this information is stored in the application configuration. Should
the user field configuration have changed, the procedure must be followed again.
User fields may be deleted by entering a blank object type and user field key in the user field
configuration.
User fields as Independent Detail View
User fields may be shown in an independent detail view. A separate application type, UserFieldDetail, is
available for this. This allows for displaying several user field definitions in one application.
After selecting the user fields, the standard columns of the data source are deleted and only the user
fields are shown.
MDS-Userfields.docx Version: 1.0.8238 Page 2 of 2