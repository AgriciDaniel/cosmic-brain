Access Control
1 Access Control
Summary
The access control (HYDRA-ZKS) module has been designed to control accesses/entrances (e.g. doors,
gates) as well as to check and record access attempts at entrances by HYDRA terminals.
Accesses are entrances, exits or passages that are to be monitored. When accesses are configured,
they are assigned to a terminal and their properties are configured.
Accesses, which are supposed to get the same access authorizations, are summarized to access
groups to allow for a simple editing and handling of access authorizations.
People receive badges for access control purposes. Their validity may be restricted with respect to time.
The licenses entitled “enhanced access control” (ZKS-EZK) and “visitor badge management” (ZKS-BAV)
allow for replacement badges or visitor badges to be created and handed out.
Access time models are created for accesses and people who are allowed to enter. These access time
models include the access periods of week days and public holidays when accesses are allowed.
Access profiles are created to simplify editing of access authorizations. These profiles are assigned to
all people or badges that are to receive the same access authorizations.
Access authorizations are defined in access profiles by assigning access groups including the
corresponding access time models.
The opening hours of accesses are defined by assigning an access time model to individual access
groups. These entrances may be opened during the access time periods that result from this procedure.
These opening times may also control the recording of accesses and access attempts as well as if entries
can be opened permanently.
The access functions at the terminal are available even if the connection to the HYDRA server breaks
down. In this case, access authorizations are based on the situation that existed before the connection
broke down.
MOC_AccessControl.docx Version: 1.0.1362 Page 1 of 2

|     |     |     | Access Control  |
| --- | --- | --- | --------------- |

Configuration of Access Control
Where? Who?
Terminal Badges
Management of the
Terminal configuration
employees‘  badges
Access Profile assignment
Assignment of the access to a
Assignment of access profiles to
terminal badges
Access group Access profile
Combining of accesses to  Groupingofaccess
access groups authorizationstoprofiles
|     | Opening hours | Time models |     |
| --- | ------------- | ----------- | --- |
Public holidays
|     | Definition of times when the | Time periods  of authorizations |     |
| --- | ---------------------------- | ------------------------------- | --- |
Definition of holidays
|     | entrance is open | for weekdays and holidays |     |
| --- | ---------------- | ------------------------- | --- |
When?

This diagram explains the connections to HYDRA-ZKS configurations.

| MOC_AccessControl.docx  |     | Version: 1.0.1362  | Page 2 of 2  |
| ----------------------- | --- | ------------------ | ------------ |