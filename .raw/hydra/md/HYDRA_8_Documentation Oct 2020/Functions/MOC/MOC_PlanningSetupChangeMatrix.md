Setup Change Matrix
1 Setup Change Matrix
Overview
Menu Master data  Production control  Setup change matrix
Transaction code setmx
Function authorization mdsetmx
Purpose
You use this application to configure setup change times.
Integration
Using setup change times, HYDRA Shop Floor Scheduling can calculate dynamic, i.e. assignment-
dependent setup times. You can define setup change times for tools, material, colors or articles.
Requirements
Depending on the area or scope of application, you must have entered and maintained data in the tool,
color, material and/or article fields of the operation.
Selection criteria
The application provides the following selection criterion:
Type
You can use the combo box to restrict setup change times to
 Tool
 Color
 Material
 Article
Additionally, you can select specific user fields of the order header and operation. But you have to assign
the user fields to the user field key SYSTEM when you configure the system. The system supports
alphanumeric and integer user fields. Please note that unassigned integer user fields have the value 0.
Further information on user fields can be found below.
MOC_PlanningSetupChangeMatrix.docx Version: 1.4.10801 Page 1 of 8

Setup Change Matrix
Field descriptions
Type
Defines the type of setup change time. This might be: Tool change, material change or color
change.
Group
Setup times apply specifically to a capacity group. This field can be left blank, in which case the
dynamic setup time is the same across all capacity groups.
Workplace
If the setup times should only apply to one particular workplace within a capacity group, this must
be specified here. In addition, the group the workplace is assigned to must be correctly specified.
This field can be left blank, in which case the dynamic setup time is the same across all capacity
groups.
From
Depending on the type selected, the corresponding value is defined here that should be used to
determine the dynamic setup time. In this case, "from" means that the value is defined in the
preceding operation.
To
Depending on the type selected, the corresponding value is defined here that should be used to
determine the dynamic setup time. In this case, "to" means that the value is defined in the
subsequent operation.
Dynamic setup time
Setup time that must be specified additionally because of the setup change. This value is stored in
the field "Setup time addition" of the operation. If the value is negative, it is deducted from the static
setup time (up to a max. of 0). When the operation is saved, the negative value is transferred and
saved in the field "setup time addition"; the static time is saved unchanged.
Ignore static setup time
If this option is set and the "from/ to" criteria are met, the static setup time (preparation) is ignored.
Doing so - unlike for dynamic setup times - you can define that the "static setup time" transferred
from the ERP system and defined at the operation should only be used if no change (e.g. color
change) is made.
Processing notes
The check is run against the tool, color, material and/or article fields at the operation and the configured
user fields of the order header or operation.
MOC_PlanningSetupChangeMatrix.docx Version: 1.4.10801 Page 2 of 8

|     |     |     |     | Setup Change Matrix  |
| --- | --- | --- | --- | -------------------- |

Case sensitivity
Value comparisons are generally case sensitive. Therefore, make sure to use correct spelling when
configuring the setup change matrix and in the pool of operations data.
Example:

| Type      | From    | To          | Dyn. setup time  |     |
| --------- | ------- | ----------- | ---------------- | --- |
| TOOL      | Wz1     | WZ2         | 3:00             |     |
| TOOL      | WZ2     | WZ1         | 5:00             |     |
| OP 1      |         | OP 2        |                  |     |
| - TOOL:   | WZ1     | - TOOL:     | WZ2              |     |
| - COLOR:  | YELLOW  |   - COLOR:  | BLUE             |     |
If OP 1 (tool WZ1) is planned after OP 2 (tool WZ2), then it is given 5:00 hours of dynamic
(additional) setup time. If, on the other hand, they are planned in opposite order (OP 2 after OP 1),
then no dynamic setup time is used, because "Wz1“ (not "WZ1“) is the first entry in the setup
change matrix.
Additive setup times
Generally, you must keep in mind that setup change times are used additively if multiple setup
change criteria are valid when an operation is planned. It makes no difference here whether or not
they are the result of different setup change criteria (e.g. for color and tool) or if they are created
within a setup change criterion (e.g. tool) when wildcards are used.
Example using different setup change criteria:
| Type   | From  | To   | Dyn. setup time  |     |
| ------ | ----- | ---- | ---------------- | --- |
| TOOL   | WZ1   | WZ2  | 3:00             |     |
| TOOL   | WZ2   | WZ1  | 5:00             |     |
| COLOR  | BLUE  | YELL | 3:00             |     |
OW
| COLOR   | GREEN  | YELL | 1:00  |     |
| ------- | ------ | ---- | ----- | --- |
OW
| OP 1      |         | OP 2        |       |     |
| --------- | ------- | ----------- | ----- | --- |
| - TOOL:   | WZ1     | - TOOL:     | WZ2   |     |
| - COLOR:  | YELLOW  |   - COLOR:  | BLUE  |     |
If OP 1 is planned after OP 2, it is given the dynamic (additional) setup time: 5:00 + 3:00 = 8:00
hours. If, on the other hand, they are planned in the opposite order (OP 2 after OP 1), then the
dynamic setup time is only 3:00 hours.

MOC_PlanningSetupChangeMatrix.docx  Version: 1.4.10801  Page 3 of 8

Setup Change Matrix
Using the wildcards * and ?
You can also use wildcards in the setup change matrix:
* as a placeholder for random characters
? as a placeholder for exactly one random character.
Entering [from * to *] means that the dynamic setup time entered in the relevant row is added to any
value. However, if the value of the preceding OP corresponds to that of the subsequent OP, the
dynamic setup time entered in the relevant row will not be added.
Entering [from * to <value>] means that the dynamic setup time is added to any value of the
preceding operation if the subsequent operation includes the value <value>. Vice versa, entering
[from <value> to *] means that the dynamic setup time is added to any value of the subsequent
operation, if the preceding operation includes the value <value>.
Please note to add the wildcard * as a suffix.
Please note: if the value of the preceding OP corresponds to that of the subsequent
OP, a dynamic setup time will be added - in contrast to if [from * to *] is entered. If
you want to ignore the dynamic setup time for identical values, you can enter an
additional value with negative dynamic setup time. Please also compare the below-
mentioned example "change of color".
Using the wildcard #
If you configure the entry [from # to #], then the dynamic setup time is added if the value of the
preceding OP and the value of the succeeding OP are identical.
If you enter [from ##?? to ##??] in the setup change matrix, the dynamic setup time will be added
for each value of the preceding operation if the third and fourth character of the subsequent OP are
different. For example: GREEN -> GRAY meets the requirement. BROWN -> BLUE does not meet
the requirement.
Generally when you use wildcards, keep in mind that these kinds of setup change entries are not
given any priority when a search is run, but are instead treated as of equal value to other setup
change entries so that any other valid setup change entries are integrated as well, and their
dynamic setup times are also added.
MOC_PlanningSetupChangeMatrix.docx Version: 1.4.10801 Page 4 of 8

|     |     |     |     |     | Setup Change Matrix  |
| --- | --- | --- | --- | --- | -------------------- |

| Example:      |         |     |     |     |     |
| ------------- | ------- | --- | --- | --- | --- |
| OP 1   TOOL:  | WZA1    |     |     |     |     |
| OP 2   TOOL:  | WZA1    |     |     |     |     |
| OP 3   TOOL:  | WZA2    |     |     |     |     |
| OP 4   TOOL:  | WZB1    |     |     |     |     |
| OP 5   TOOL:  | WZBX    |     |     |     |     |
Setup change matrix:
| Type  | From  | To    | Dyn. setup time  |       |     |
| ----- | ----- | ----- | ---------------- | ----- | --- |
| TOOL  | WZA*  | WZB*  |                  | 4:00  |     |
| TOOL  | WZB*  | WZA1  |                  | 3:00  |     |
| TOOL  | WZB*  | WZA2  |                  | 2:00  |     |
| TOOL  | WZB*  | WZ?1  |                  | 1:00  |     |
Planning (sequence):
Preceding OP  Tool  Succeeding OP  Tool  Results in dynamic setup time
| OP 1  | WZA1  | OP 2  |     | WZA1  | 0:00                |
| ----- | ----- | ----- | --- | ----- | ------------------- |
| OP 1  | WZA1  | OP 3  |     | WZA2  | 0:00                |
| OP 1  | WZA1  | OP 4  |     | WZB1  | 4:00                |
| OP 1  | WZA1  | OP 5  |     | WZBX  | 4:00                |
| OP 3  | WZA2  | OP 1  |     | WZA1  | 0:00                |
| OP 3  | WZA2  | OP 2  |     | WZA1  | 0:00                |
| OP 3  | WZA2  | OP 4  |     | WZB1  | 4:00                |
| OP 3  | WZA2  | OP 5  |     | WZBX  | 4:00                |
| OP 4  | WZB1  | OP 1  |     | WZA1  | 3:00 + 1:00 = 4:00  |
| OP 4  | WZB1  | OP 2  |     | WZA1  | 3:00 + 1:00 = 4:00  |
| OP 4  | WZB1  | OP 3  |     | WZA2  | 2:00                |
| OP 4  | WZB1  | OP 5  |     | WZBX  | 0:00                |
| OP 5  | WZBX  | OP 1  |     | WZA1  | 3:00 + 1:00 = 4:00  |
| OP 5  | WZBX  | OP 2  |     | WZA1  | 3:00 + 1:00 = 4:00  |
| OP 5  | WZBX  | OP 3  |     | WZA2  | 2:00                |
| OP 5  | WZBX  | OP 4  |     | WZB1  | 1:00                |

| Example for the color change:  |          |     |     |     |     |
| ------------------------------ | -------- | --- | --- | --- | --- |
| OP 1   Color:                  | White    |     |     |     |     |
| OP 2   Color:                  | Black    |     |     |     |     |
| OP 3  Color:                   | White    |     |     |     |     |
Setup change matrix:
| Type   | From   | To     | Dyn. setup time  |         |     |
| ------ | ------ | ------ | ---------------- | ------- | --- |
| COLOR  | *      | WHITE  |                  | 10:00   |     |
| COLOR  | WHITE  | WHITE  |                  | -10:00  |     |
Planning (sequence):
Preceding OP  Color  Succeeding OP  Color  Results in dynamic setup time

MOC_PlanningSetupChangeMatrix.docx  Version: 1.4.10801  Page 5 of 8

|     |     |     |     |     |     |     | Setup Change Matrix  |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------- | --- |

Preceding OP  Color  Succeeding OP  Color  Results in dynamic setup time
| OP 1  |     | WHITE  | OP 2  |     | BLACK  |                        | 0:00   |     |
| ----- | --- | ------ | ----- | --- | ------ | ---------------------- | ------ | --- |
| OP 1  |     | WHITE  | OP 3  |     | WHITE  | 0:00 (+10:00 - 10:00)  |        |     |
| OP 2  |     | BLACK  | OP 1  |     | WHITE  |                        | 10:00  |     |
| OP 2  |     | BLACK  | OP 3  |     | WHITE  |                        | 10:00  |     |
| OP 3  |     | WHITE  | OP 1  |     | WHITE  | 0:00 (+10:00 - 10:00)  |        |     |
| OP 3  |     | WHITE  | OP 2  |     | BLACK  |                        | 0:00   |     |

Including setup change times in shop floor scheduling
The static and dynamic setup times are recalculated and become visible in the OP bar if turns out
during planning/replanning that the values defined in the setup change matrix match an operation
value. If an OP had been planned and its static setup time was supposed to be canceled/ignored,
and if this OP is now re-planned and there is no entry in the setup change matrix for this new
situation, then this static setup time must be used again.
Example of a setup change matrix
| Type      | From    | To      | Addition  |     | Ignore static setup time  |     |     |     |
| --------- | ------- | ------- | --------- | --- | ------------------------- | --- | --- | --- |
| Material  | Mat2    | Mat1    | 1 h       |     | No                        |     |     |     |
| Color     | Green   | Red     | 2         |     | No                        |     |     |     |
| Material  | Mat2    | Mat3    | -1        |     | No                        |     |     |     |
| Material  | Mat2    | Mat4    | -3        |     | No                        |     |     |     |
| Material  | Mat5    | Mat6    | 0         |     | Yes                       |     |     |     |
| Material  | Mat7    | Mat8    | -1        |     | Yes                       |     |     |     |
| Color     | Purple  | Yellow  | 1.5       |     | Yes                       |     |     |     |
Planning (sequence):
The static and dynamic setup times are calculated for every second operation.
Plan OP "from -  Static setup  Material  Color  Setup change matrix  Calculate Setup
| to"  |     | time of the  |     |     | Y/ N = ignore static  |     | d stat.  | time       |
| ---- | --- | ------------ | --- | --- | --------------------- | --- | -------- | ---------- |
|      |     | OP           |     |     | setup time            |     | setup    | addition   |
|      |     |              |     |     |                       |     | time     | of the OP  |
2 h etc. = dyn. setup
time
| HLS100000050  |     | 1.5  | Mat2  | Green  |                       |     |     |     |
| ------------- | --- | ---- | ----- | ------ | --------------------- | --- | --- | --- |
| HLS200000050  |     | 1.0  | Mat1  | Red    | Mat1 -> Mat2; N; 1 h  |     | 1   | 3   |
green -> red; N; 2 h
---------  --------  ----------  --------------------------------  ----------  ---------
--------------------
| HLS100000050  |     | 1.5  | Mat2  | Green  |                       |     |     |     |
| ------------- | --- | ---- | ----- | ------ | --------------------- | --- | --- | --- |
| HLS200000100  |     | 1    | Mat3  | Red    | green -> red; N; 2 h  |     | 1   | 1   |
Mat2 -> Mat3; N; -1 h
--------------------  ---------  --------  ----------  --------------------------------  ----------  ---------
| HLS300000050  |     |     | Mat5  | Blue  |     |     |     |     |
| ------------- | --- | --- | ----- | ----- | --- | --- | --- | --- |
HLS400000050
|     |     | 1.0  | Mat6  | Blue  | Mat5 -> Mat6; Y; 0 h  |     | 0   | 0   |
| --- | --- | ---- | ----- | ----- | --------------------- | --- | --- | --- |
--------------------  ---------  --------  ----------  --------------------------------  ----------  ---------
| HLS500000100  |     |     | Mat7  | Yellow  |     |     |     |     |
| ------------- | --- | --- | ----- | ------- | --- | --- | --- | --- |
HLS400000200  1.0  Mat8  Purple  Mat7 -> Mat8; Y; -1 h  0  0
--------------------  ---------  --------  ----------  --------------------------------  ----------  ---------
| HLS400000200  |     |     | Mat8  | Purple  |     |     |     |     |
| ------------- | --- | --- | ----- | ------- | --- | --- | --- | --- |

MOC_PlanningSetupChangeMatrix.docx  Version: 1.4.10801  Page 6 of 8

|     |     |     |     |     |     | Setup Change Matrix  |     |     |
| --- | --- | --- | --- | --- | --- | -------------------- | --- | --- |

Plan OP "from -  Static setup  Material  Color  Setup change matrix  Calculate Setup
| to"  |     | time of the  |     |     | Y/ N = ignore static   | d stat.  | time       |     |
| ---- | --- | ------------ | --- | --- | ---------------------- | -------- | ---------- | --- |
|      |     | OP           |     |     | setup time             | setup    | addition   |     |
|      |     |              |     |     | 2 h etc. = dyn. setup  | time     | of the OP  |     |
time
HLS500000100  1.0  Mat7  Yellow  purple->yellow, Y; 1.5 h  0  1.5
--------------------  ---------  --------  ----------  --------------------------------  ----------  ---------
| HLS600000200  |     |      | Mat8  | Yellow  |                         |     |     |     |
| ------------- | --- | ---- | ----- | ------- | ----------------------- | --- | --- | --- |
| HLS700000100  |     | 2.0  | Mat7  | Red     | yellow->red; Y; -0.5 h  | 0   | 0   |     |
--------------------  ---------  --------  ----------  --------------------------------  ----------  ---------
| HLS700000200  |     |     | Mat8  | Yellow  |     |     |     |     |
| ------------- | --- | --- | ----- | ------- | --- | --- | --- | --- |
HLS800000100  1.5  Mat7  Green  yellow->green; N; -0.5 h  1.5  -0.5

Consideration during lead time scheduling
The "current" static setup time is considered each time during scheduling. That is to say: after the
production order is transferred from the ERP system, the system takes into account the static setup
time transferred during scheduling.
When planned OPs are scheduled, the "additional setup time" is subtracted from the static setup
time. Static setup time cannot be less than zero (0).

Information on user fields
Restricted selection of user fields
Altogether, you can choose from a maximum of 21 alphanumeric setup change criteria of different length
and 16 numeric setup change criteria. They are provided as user fields at the operation. You can use the
following user fields of the operation (object = AGNR) as setup change criteria:
  Field  ID  /  Field data type  Type  Exceptions  Number  of    DB data type
| index     |            |     |            |     |     | fields  |     |          |
| --------- | ---------- | --- | ---------- | --- | --- | ------- | --- | -------- |
|   7 – 22  | Numeric,   |     | 107 – 122  |     |     | 16      |     | INTEGER  |
time, duration
|   29 – 31  | Text field, length 1  |     | 129 – 131  |     |     | 3   |     | CHAR(1)  |
| ---------- | --------------------- | --- | ---------- | --- | --- | --- | --- | -------- |
  45 – 50  Text field, length 10  145 – 150    6    CHAR(10)
  51 – 64  Text field, length 20  151 – 164  55,57,58,59  10    CHAR(20)

MOC_PlanningSetupChangeMatrix.docx  Version: 1.4.10801  Page 7 of 8

|     |     |     |     | Setup Change Matrix  |     |     |
| --- | --- | --- | --- | -------------------- | --- | --- |

  Field  ID  /  Field data type  Type  Exceptions  Number  of    DB data type
| index  |     |     |     | fields  |     |     |
| ------ | --- | --- | --- | ------- | --- | --- |
  65 – 66  Text field, length 40  165 – 166    2    CHAR(40)

Altogether, you can choose from a maximum of 6 alphanumeric setup change criteria of different length
and 16 numeric setup change criteria. They are provided as user fields at the order header. You can use
the following user fields of the order header (object = AUNR) as setup change criteria:
  Field  ID  /  Field data type  Type  Exceptions  Number  of    DB data type
| index     |            |            |     | fields  |     |          |
| --------- | ---------- | ---------- | --- | ------- | --- | -------- |
|   7 – 22  | Numeric,   | 207 – 222  |     | 16      |     | INTEGER  |
time, duration
|   29 – 30  | Text field, length 1   | 229 – 230  |     | 2   |     | CHAR(1)   |
| ---------- | ---------------------- | ---------- | --- | --- | --- | --------- |
|   45       | Text field, length 10  | 245        |     | 1   |     | CHAR(10)  |
  53 – 54  Text field, length 20  253 – 254    2    CHAR(20)
|   60  | Text field, length 20  | 260  |     | 1   |     |     |
| ----- | ---------------------- | ---- | --- | --- | --- | --- |

MOC_PlanningSetupChangeMatrix.docx  Version: 1.4.10801  Page 8 of 8