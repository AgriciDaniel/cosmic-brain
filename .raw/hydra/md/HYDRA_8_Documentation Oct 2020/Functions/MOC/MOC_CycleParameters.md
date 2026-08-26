Cycle Parameters
1 Cycle Parameters
Summary
Menu Master data  Workplaces/ machines  Cycle parameters
Transaction code cycpa
Function authorization mdcycl
Usage
HYDRA provides the ability to monitor cycle times within the machine data recording function without
requiring HYDRA process data processing to be used.
The purpose of this function is to configure the action and tolerance limits.
Integration
Values are marked in different colors in the Workplace overview depending on whether the action or
tolerance limit was exceeded:
Standard Black
If the value drops below or exceeds the action limit Blue
If the value drops below or exceeds the tolerance Red
limit
If a limit is exceeded, no further processing steps are taken in HYRDRA.
Requirement
Before defining any configurations, you must first set up the machine.
Selection criteria
The application provides the following selection criteria:
Machine
Selection by machine/ workplace
MOC_CycleParameters.docx Version: 1.0.18468 Page 1 of 2

|     |     |     |     |     | Cycle Parameters  |
| --- | --- | --- | --- | --- | ----------------- |

Field descriptions
Machine
Machine for which the configuration applies.
Tolerance limit positive, negative
Values may not drop below or exceed the percentage values defined here.  The cycle time of the
logged on operation is always used as the target value for cycle time monitoring. This can be
corrected at the terminal. The limit value is entered as a percentage of the target value.
| Example: Target value:                             |                      |     | 20 sec/ cycle  |     |     |
| -------------------------------------------------- | -------------------- | --- | -------------- | --- | --- |
|                                                    | tolerance positive:  |     | 10 %           |     |     |
|                                                    | tolerance negative:  |     | 5 %            |     |     |
| Thus, this results in the following limit values:  |                      |     |                |     |     |
|                                                    | Upper limit value:   |     | 22 sec/ cycle  |     |     |
|                                                    | lower limit value:   |     | 19 sec/ cycle  |     |     |
Action limit positive, negative
Percentage values can be entered here, triggering a warning once they have been reached. This is
why the action limits should be defined more narrowly than the tolerance limits. The limit value is
entered as a percentage of the target value.

| MOC_CycleParameters.docx  |     |     | Version: 1.0.18468  |     | Page 2 of 2  |
| ------------------------- | --- | --- | ------------------- | --- | ------------ |