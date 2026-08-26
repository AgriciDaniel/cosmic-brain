Target Value Analysis (in table form)
1 Target Value Analysis (in table form)
Summary
Menu Quality management  Process analysis  Target value analysis
Transaction code ptva
Function authorization ptva
The tabular analysis of default values is used to perform process analyses in quality management.
Usage
The tabular view offers the user an overview of the target value changes resulting from manual or
automated activities. This designates the limit values and the target value of the characteristics defined in
the collection rule.
Requirements
For modifications of the target values from the machine, the machine and the machine interface must
transfer these values; and the corresponding assignments to the target values must be made in the
logical channels.
Selection parameters
The following selection criteria are available in the application:
Machine
The pool application machine can be used to select the desired machine.
Process parameter
Possibility to enter a process parameter.
Event timestamp (from - until)
By restricting the event timestamp precise time intervals can be selected. In addition, the start and
end time of an event may be selected by defining a relative date.
Default type
It is also possible to use a drop-down list to select a default type. These default types may be
selected:
MOC_TargetValueAnalysis.docx Version: Page 1 of 2

|     |     |     | Target Value Analysis (in table form)  |     |
| --- | --- | --- | -------------------------------------- | --- |

|     |   Upper process action limit  |     |     |     |
| --- | ------------------------------ | --- | --- | --- |
|     |   Upper tolerance limit       |     |     |     |
|     |   Target value                |     |     |     |
|     |   Lower tolerance limit       |     |     |     |
|     |   Lower process action limit  |     |     |     |
Consider long-term data
Enabling this check box allows for long-term data to be considered.
Detail application: target value analysis (in tabular form)
This tabular report shows the changed default values recorded and saved in the database including the
following information:
Event timestamp
Point in time when the modified default value was recorded
Machine
Machine at which the default value change was recorded/performed
Process parameter
Technical name of the process parameter for which default values have been changed
Default type
Default type that has been changed
Value
Value of the recorded default value change

| MOC_TargetValueAnalysis.docx  |     | Version:   |     | Page 2 of 2  |
| ----------------------------- | --- | ---------- | --- | ------------ |