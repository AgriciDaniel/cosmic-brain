Server-Controlled Shift Change: Configuration

1  Server-Controlled Shift Change: Configuration
Activation of server-controlled shift change
You can configure the server-based shift change for the entire system in the HYDRA INI configuration.
Instead of a global activation, you can enable the server-based shift change for specific machines only:
| Parameter name  | Value  |     |
| --------------- | ------ | --- |
System-wide definition
| INI name  | MDE                                  |                              |
| --------- | ------------------------------------ | ---------------------------- |
| Section   | SERVER_BASED_AUTOMATIC_SHIFT_CHANGE  |                              |
| Key       | SYSTEM                               | for system-wide definition.  |
| Value     | Y  automatic shift change.           |                              |
N  no automatic shift change
  (by default)
| Active   | Yes  |     |
| -------- | ---- | --- |
| Comment  | …    |     |
Machine-related definition
| INI name  | MDE                                  |                      |
| --------- | ------------------------------------ | -------------------- |
| Section   | SERVER_BASED_AUTOMATIC_SHIFT_CHANGE  |                      |
| Key       | <Machine>                            | Machine / workplace  |
| Value     | Y  automatic shift change.           |                      |
N  no automatic shift change
  (by default)
| Active   | Yes  |     |
| -------- | ---- | --- |
| Comment  | …    |     |

Setup_ServerBasedShiftChange.docx  Version: 1.2.18468  Page 1 of 2

Server-Controlled Shift Change: Configuration
Activate the cyclic trigger program
You can configure a trigger program in the HYDRA scheduler in order to change shifts even if the sender
does no longer send messages (offline mode or no production).
Parameter name Value
Product key
License key
Command (Windows): sh.exe ./ade_aswtrigger.scr
Command (Unix): ./ade_aswtrigger.scr
Comment: Trigger for the server-controlled shift change.
Interval 30
Setup_ServerBasedShiftChange.docx Version: 1.2.18468 Page 2 of 2