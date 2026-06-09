Activating Material Monitoring
1 Activating Material Monitoring
Usage
You activate the material monitoring job if you would like the system to automatically implement the status
of known batches in the system based on durations defined in the system.
Requirements
You defined the process time defaults for minimum storage time, warning time and/or expiry time in
material type or in assignment of material to material type.
Procedure
Make an entry in the Scheduler for the cyclic call of the monitoring job and define the call interval, if it is
different.
Parameter name Value
For uploading material receipts:
Product key MPL-MMO
License key MPL-MMO
Command (Windows): sh.exe ./mpl_lsta.scr
Command (Unix): ./mpl_lsta.scr
Comment: MPL - Status monitoring
Interval 5
The job is run every five minutes in the system standard delivery. If this interval is sufficient for
you, no further adjustments are required.
Results
The system runs the job cyclically at the defined interval.
Activating_Material-Monitoring-Job.docx Version: 1.0.18468 Page 1 of 2

|     |     | Activating Material Monitoring  |
| --- | --- | ------------------------------- |

Activating_Material-Monitoring-Job.docx  Version: 1.0.18468  Page 2 of 2