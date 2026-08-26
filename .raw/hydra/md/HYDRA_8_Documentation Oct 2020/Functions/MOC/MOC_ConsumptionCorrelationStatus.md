Verbrauchskorrelation

1  Status of Consumption Correlation

Overview

Menu

Resource management  Resource analysis

 Status of consumption correlation

Transaction code

concorsta

Function authorization

concorsta

This  document  describes  the  application  "Status  of  consumption  correlation"  in  the  Manufacturing

Operation Center (MOC).

Application

The  application  "Status  of  consumption  correlation"  is  new.    The  status  of  consumption  correlation

graphically shows the energy consumption in relation to the recorded statuses of workplaces/machines.

You can present energy consumption in connection with the accrued information on statuses. This way, it

is e.g. possible to identify the energy consumption during the setup or a disturbance.

Energy documents are assigned to the statuses by time and selection.

Please note:

The application only shows completed status documents.

Selection criteria

Reference

Selection of resources using the resource list

Date from / until

Selection of a period for consumption correlation

Workplace

Selection of workplace using the workplaces dialog

Group from / to

Selection based on a group. Selection by drop-down list

Report group

Selection based on a report group. Selection by drop-down list

MOC_ConsumptionCorrelationStatus.docx Version: 1.0.8416

Page 1 of 2

Verbrauchskorrelation

Automatic counter assignment

  If this option is checked, HYDRA identifies automatically the relevant energy counters following the

counter to machine assignment.

Detail application status of consumption correlation

The  detail  application  includes  two  sections.  The  upper  part  shows  the  status  of  machines/workplaces,

the lower section displays the consumption.

The  statuses  matching  the  above  mentioned  selection  criteria  (period  from/to,  workplace,  group/report

group) are displayed as individual bars in the detail application (1 row for each workplace/machine).

The user can select the displayed status log records (multiple selection is possible by using the Ctrl key).

The resulting time slice/s is/are used for presenting the consumption.

The lower section of the detail application shows two sections with different information for each selected

consumption meter.

Section 1:

This section shows the result of the correlation: The periods result from the selected order and multiple

selection of order bars.

Section 2:

The  consumption  documents  matching  the  selected  consumption  meter  and  period  entered  in  the

selection  panel  are  shown.  However,  they  are  not  displayed  as  complete  document  but  rather  as

averaged  point  (average  power  in  the  document).  This  refers  to  the  load  profile  of  the  consumption

resource.

MOC_ConsumptionCorrelationStatus.docx Version: 1.0.8416

Page 2 of 2

