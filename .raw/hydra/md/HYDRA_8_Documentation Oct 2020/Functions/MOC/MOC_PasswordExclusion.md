Password Exclusion List
1 Password Exclusion List
Summary
Menu System Administration  User Administration  Password Exclusion List
Transaction code passex
Function authorization passex.*
Utilization
This function allows for a list of terms, which must not be included in a password, to be configured.
On the one hand, free terms can be defined that must not occur in any password. The entry “HYDRA”, for
example, means that “HYDRA” must not be contained in the password, thus the password “HYDRAADM”
may not be used either.
On the other hand, variables can be chosen from the list of the input field “terms to be excluded”, which
refer to the user’s HR master record.
Integration
The black list/exclusion list defined in the system is taken into account every time a password is changed.
Prerequisite
Users have been defined within the users master and people have been created in the HR master. Both
objects have been linked with each other if it is intended that selected data from the HR master cannot be
included in the password.
Field Descriptions
Excluded terms
Enter any term – please consider case sensitivity.
As an alternative you may also choose from a list of IDs by way of which HR master data is
referenced and may be prevented from being used in the password. The following IDs are
available:
PNR.PVORNAME the person’s first name
PNR.PNAME the person’s last name
PNR.PNR Personnel number
MOC_PasswordExclusion.docx Version: 1.2.23273 Page 1 of 3

|     |     |     | Password Exclusion List  |     |
| --- | --- | --- | ------------------------ | --- |

PNR.KNR    Badge number

If the user “John Smith” is entered in the HR master data with his first name as “John” (and “Smith”
as  his  last  name)  then  entering  PNR.PVORNAME  (or  PNR.PNAME)  in  the  exclusion  list  of
passwords will exclude the string “John” (or “Smith”) from being used in his password. Thus, the
passwords “john123”, “johnsmith” or “abcsmith” are not valid. The variables PNR.PNR (personnel
number) and PNR.KNR (badge number) are handled in the same way.
|     |     |     |     |     |
| --- | --- | --- | --- | --- |

| MOC_PasswordExclusion.docx  |     | Version: 1.2.23273  |     | Page 2 of 3  |
| --------------------------- | --- | ------------------- | --- | ------------ |

|     |     | Password Exclusion List  |
| --- | --- | ------------------------ |

MOC_PasswordExclusion.docx  Version: 1.2.23273  Seite 3 von 3