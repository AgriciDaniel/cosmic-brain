SDI Toolkit

1  SDI Toolkit

1.1  Introduction

The SDI Toolkit provides auxiliary functions. These functions are implemented by SDI means using System

Utilities.  For  the  application  developers,  these  functions  are  available  as  part  of  the  Simple  Developer

Interface (SDI).

1.2  Class RespAreaChecker

You can use this class to check if a user has a specific responsibility area (optionally with a specific mode

of the responsibility area).

Method

Description

checkRespArea()

Checks  if  the  user  has  the  responsibility  area  (optional:  also  a

specific function is checked).

True if:

-  Responsibility area is empty, null, or --DEFAULT--
-  User empty, null, @ or SAP
If no mode is specified
-

o

If there is an entry for the user and the
responsibility area

-

If mode is specified (

o  Mode UPDATE: entry stating update = J
o  Mode LOCK: entry stating view or update = J
o  Mode INSERT and COPY: entry stating create

=J

o  Mode DELETE: entry stating delete = J
o  Mode VIEW and LIST: entry stating view = J
o  Mode USE: entry stating use = J

Return type:

boolean – True, if the user has the resp. area (with the function),

otherwise false.

Input:

ISystemUtilFactory factory – Object to access System Utilities

MDS-SDI-Toolkit.docx

Version: 1.0.12802

Page 1 of 5

SDI Toolkit

String user – the user

String responsibilityArea – the responsibility area

CheckRespAreaMode mode  – (Optional)  A specific function that

the user should have for the area

Exception:

-

checkRespAreaPerson()

Checks if the user has the person's responsibility area (optional,

also a specific function is checked and the responsibility area that

was assigned to the person at a specific date).

Identifies  the  person's  responsibility  area  at  a  specific  date  and

then uses the function checkRespArea.

Return type:

CheckRespAreaResult  –  result  of  the  check  (for  further  details,

refer to the description of the data type)

Input:

ISystemUtilFactory factory – Object to access System Utilities

String user – the user

Integer personId – personnel number

Calendar  validityDate  –  (Optional)  Date  to  identify  the  person's

resp. area

CheckRespAreaMode mode  – (Optional)  A specific function that

the user should have for the area

Exception:

-

1.2.1  Enum CheckRespAreaMode

Describes a function within a responsibility area

MDS-SDI-Toolkit.docx

Version: 1.0.12802

Page 2 of 5

Value

VIEW

USE

INSERT

UPDATE

DELETE

LOCK

COPY

LIST

SDI Toolkit

Description

Data record may be displayed

Data record may be used

You may create a data record with the resp. area.

Data record may be modified

Data record may be deleted

Data record may be locked

Data record may be copied

Data  record  is  displayed  upon  calling  the  list

function

1.2.2  Enum CheckRespAreaResult

Result of a person's check

Value

Description

PERSON_NOT_EXISTING

Person does not exist

ALLOWED

User has resp. area of the person

NOT_ALLOWED

User does not have resp. area of the person

1.3  Class ShiftModelUtil

This class uses two time stamps to identify a duration that is compared to the shift calendar.

Method

Description

MDS-SDI-Toolkit.docx

Version: 1.0.12802

Page 3 of 5

getDurationWithoutUnAssignedDays()  Returns the duration between two time stamps. Days that are

not assigned to a day type are skipped.

SDI Toolkit

Return type:

long – the identified duration

Input:

ISystemUtilFactory factory – Object to access System Utilities

Calendar start – start of time stamp

Calendar end – end of time stamp

int shiftModel – number of the year model

boolean usePlantModel – flag indicating if the factory calendar

is to be used instead of shiftModel

Exception:

-

getDurationSyncedWithYearModel()

Returns the duration between two time stamps. Times without

shift and breaks are omitted.

Return type:

long – the identified duration

Input:

ISystemUtilFactory factory – Object to access System Utilities

Calendar start – start of time stamp

Calendar end – end of time stamp

int shiftModel – number of the year model

boolean usePlantModel – flag indicating if the factory calendar

is to be used instead of shiftModel

Exception:

MDS-SDI-Toolkit.docx

Version: 1.0.12802

Page 4 of 5

-

SDI Toolkit

MDS-SDI-Toolkit.docx

Version: 1.0.12802

Page 5 of 5

