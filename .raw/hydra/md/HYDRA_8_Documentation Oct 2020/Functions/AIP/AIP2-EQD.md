Expanded View of Quality Data

1  Expanded View of Quality Data

Purpose

Use the function "expanded view of quality data", if you want to show further quality data in parallel to the

input dialog. This is for example necessary if you want to permanently display a stamped drawing in addition

to the inspection data. You can show assigned documents as a list or optionally in full screen mode.

Requirements

Meet the following requirements:

  Active license AIP-EQD with AIP 8.2.







ctaip.exe as of version:

8.2.0.24

caq_dc_t.dll as of version:  8.2.0.13

caq72.dll as of version:

8.2.0.3

The planned machine or machine group must be included in the group "Workplace" in the MOC application

Inspection requirement, on the level of the inspection step, tab Inspection step. This requires that the option

One  inspection  step  for  each  inspection  station  is  set  in  the  inspection  planning.  On  the  level  of  the

characteristics, no inspection stations need to be assigned.

Activation

To  activate  the  option,  make  the  following  entry  in  the  file  "caq_dc_t.ini".  This  file  is  stored  in  the  AIP

subfolder "functions".

[OPTIONS]
ACTIVATE_EQD=1

Features

Use the expanded view of quality data to show additional context-sensitive information in the CAQ recording

of  measured  values.  Possible  contexts  are:  measured  value,  inspection  point  or  characteristic.  The

application provides the following display elements to show the information:

-  Control chart

-  Histogram

-  Data list

E.g. failures of a specific characteristic

-  Document

E.g. image of a part

view

AIP2-EQD.docx

Version: 1.5.14913

Page 1 of 9

Expanded View of Quality Data

-  Document list with document preview

Configure a list of documents with direct document view.

-  Document list without document preview

Show a list and double-click a document that will then open in a separate window.

See the following layout examples:

Inspection points

Showing measured values:

Recording of measured values

AIP2-EQD.docx

Version: 1.5.14913

Page 2 of 9

Expanded View of Quality Data

Configure the display elements (e.g. control chart, histogram and data list) using a configurable number of

rows and columns of the recording of measured values. Configure  every display  element separately for

each input type. Example:

Show a list of failures for a characteristic and show a control chart for the measured values.

Use XML files for the configuration. Change specific properties of an element directly in the respective tag

of the XML configuration.

Sample configuration for a display element

The below example shows a document list with direct display of the contents of the selected data record.

For further information refer to the document Configuration_AIP-EQD.

Integration of customer-specific components

In addition to the above-mentioned display elements and their configuration properties, you can also show

customer-specific components in a specific display area of the AIP screen. To do so, the system sends the

current  node  data  to  the  component  when  you  change  nodes  in  the  inspection  list.  Therefore,  you  can

always refer to current CAQ data.

AIP2-EQD.docx

Version: 1.5.14913

Page 3 of 9

2  Alternative Inspection Start - Inspection without Operation

Expanded View of Quality Data

Logon

Purpose

The following three fields of application have specific requirements regarding the inspection process. They

are different to the usual in-production inspection on the production terminal.





Incoming goods inspection

In-production inspection at an exclusive inspection station (e.g. in the lab)

  Calibration

Use the Alternative Inspection Start for these three inspection processes. You do not need to log on an

operation.

Requirements

Meet the following requirements:

  Active license AIP-EQD with AIP 8.2.







ctaip.exe as of version:

8.2.0.33

caq_dc_t.dll as of version:  8.2.0.15

caq72.dll as of version:

8.2.0.7

Activation

The following fields of application have specific inspection modes:





Incoming goods inspection

In-production inspection at an exclusive inspection station (e.g. in the lab)

  Calibration

Only one of the modes can be active. Restart the terminal software if you change mode. For activation, one

of the following configurations is required in the file „hytnrcfg.ini“ in the section „[CAQ->Optionen 0]“:

Inspection mode "Goods receipt inspection"

[CAQ->Options 0]

TERM_MODE= GOODS_RECEIPT

Inspection mode "Production inspection at an exclusive inspection station (e.g. in the lab)".

[CAQ->Options 0]

TERM_MODE=LAB

AIP2-EQD.docx

Version: 1.5.14913

Page 4 of 9

Expanded View of Quality Data

Inspection mode "Calibration"

[CAQ->Options 0]

TERM_MODE=CALIBRATION

The terminal uses the first entry found for "TERM_MODE".

If  the  parameter  "TERM_MODE"  in  section  "[CAQ->OPTIONS  0]"  includes  several  entries,

comment out the irrelevant ones.

Activate a specific main layout for the tile view of each of the inspection modes. The layout files can be

found in the AIP subfolder "gui". Activate the main layout as follows:

Inspection mode "Goods receipt inspection"

Rename the file "l_main#lgoods#.xml“ in "l_main.xml".

Inspection mode "Production inspection at an exclusive inspection station (e.g. in the lab)".

Rename the file "l_main#llab#.xml“ in "l_main.xml".

Inspection mode "Calibration"

Rename the file "l_main#lcal#.xml“ in "l_main.xml".

In addition, the CAQ option 1157 must be enabled and have the entry Y in the field Value. Also assign the

parameter

[GROUP:GEPLANT,MNR,MGRP,OPT_PLAN]

in

the

field  Addition.  The  parameter

[GROUP:GEPLANT,MNR,MGRP,OPT_PLAN]  groups  the  inspection  step  characteristics  by  assigning

them to the fields  "Planned", Machine group", "Machine" and "Inspection station". For each combination

an inspection step is generated. The inspection steps will then include the contents of the grouping criteria

in the respective fields. The inspection steps must include these grouping criteria. The system uses the

grouping criteria to specify the respective inspection steps that are required for the three special inspection

modes.

The system creates an inspection step, if option  1157 is configured accordingly for each combination of

grouping criteria and if the option One inspection step for each inspection station is enabled in the inspection

plan header.

For the inspection mode Calibration, you must set the parameter PAN_AU/AUNR_COPY in the field Action

of the application Area-Order type configuration (Menu entry System administration  System settings).

This configuration automatically generates a calibration inspection requirement if the calibration calendar

includes a calibration order.

AIP2-EQD.docx

Version: 1.5.14913

Page 5 of 9

Logging of data

Expanded View of Quality Data

If  logging  is  required,  you  must  set  the  following  parameter  in  the  hytnrcfg.ini  in  section

"[OPTIONS 0]".

TERM_MODE_DEBUG=ON

Using this parameter, the inspection data included in the spool directory is not deleted when the

inspection dialog is closed. This is required in case of an upload with this inspection mode, for

example.

It is best to set this parameter in the local file hytnrcfg.ini, to write-protect the file and to restart

the  AIP.  After  the  secured  logging  (e.g.  via  upload),  remove  the  write-protection,  delete  the

parameter and restart the terminal.

Functionality – Inspection mode "Goods receipt inspection"

The inspection mode "Goods receipt inspection" is displayed in a special layout.

All possible inspection steps of this workplace are displayed. The displayed inspection steps are identified

as follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the machine group matches the one of the

inspection station. In addition, the inspection steps planned for the machine are identified, if the

machine and the inspection station are identical.

As  soon  as  the  system  generates  a  goods  receipt  inspection  via  interface  in  HYDRA,  the  inspection  is

displayed after a cyclic update.

You can configure the update interval in the file "caq72.ini" in the subfolder "packets" using the parameter

"LOADCYCLE".

[DATACONTEXT_GOODS_RECEIPT]
LOADCYCLE=300
DATAPROVIDER_ID=PAUMNR
LIST=u_l_caq_inspstep_tnr

AIP2-EQD.docx

Version: 1.5.14913

Page 6 of 9

Expanded View of Quality Data

The standard layout can display up to 18 inspection steps at the same time. You can integrate the filter field

and  then  filter  by  all  displayed  inspection  step  contents.  By  default,  the  displayed  inspection  steps  are

sorted in ascending order according to the date/time of inspection step generation. You can use the "caliper"

button to access the inspection process.

The  function  to  complete  the  inspection  requirement  is  a  special  feature.  This  function  automatically

identifies inspection steps and inspection requirement results. If required, you can change them.

When you complete an inspection step, the system automatically sets the QM operation to "completed".

Requirement: the QM operation must not be logged on and the processing code must define the OP as

inspection OP. If the finished QM operation is the last operation to be finished in the order, the order is then

set to the status "Completed".

If the inspection step is completed in the offline status, the operation is not automatically set to

"completed".  This  would  require  a  manual  posting  later  on  when  the  terminal  is  online  again

("posting required").  If the  required  posting is  not made,  the inspection step is  not completed.

There is no message that the inspection step has not been completed.

Functionality – Inspection mode "In-production inspection at an

exclusive inspection station"

This inspection mode does not require an operation logon either. Contrary to the in-production inspection

at an exclusive inspection station requiring a QM logon, this inspection mode instantly shows all possible

inspection points at this inspection station.

All possible inspection points of this workplace are displayed. The displayed inspection points are identified

as follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the machine group matches the one of the

inspection station. In addition, the inspection steps planned for the machine are identified, if the

machine and the inspection station are identical.

4.  For each of the identified inspection steps, all possible inspection points are identified.

As soon as an inspection point is generated when an inspection is due, the terminal shows the inspection

point of the specific inspection station after the specified updating interval.

AIP2-EQD.docx

Version: 1.5.14913

Page 7 of 9

You can configure the update interval in the file "caq72.ini" in the subfolder "packets" using the parameter

Expanded View of Quality Data

"LOADCYCLE".

[DATACONTEXT_LAB]
LOADCYCLE=300
DATAPROVIDER_ID=PPKTMNR
LIST=u_l_caq_insppoint_tnr
SECTION=DATACONTEXT_LAB_INSP_PT_MATURITY

In the list of the inspection point tiles, you can manually generate free inspection points using the "+" button.

Using the button, the relevant inspection steps of this inspection station are identified and displayed in a

list you can filter. Select an inspection point in the list and use the button "Generate inspection point". A

free inspection point is generated for this inspection step. If you do not want to generate further inspection

points, close the list of inspection steps manually.

Inspection  steps  can  be  completed  in  this  inspection  mode.  Focusing  on  detail  information  on

Workplace/Machine,  you  can  complete  an  inspection  step  using  the  button  "Complete".  The  relevant

inspection steps of this inspection station are identified and displayed in a list you can filter (see above:

generating an inspection point). Select an inspection step and use the button "Complete inspection step".

When you complete an inspection step, the system automatically sets the QM operation to "completed".

Requirement: the QM operation must not be logged on and the processing code must define the OP as

inspection OP. If the finished QM operation was the last operation to be finished in the order, the order is

then set to the status "Completed". If you do not want to generate further inspection points, close the list of

inspection steps manually.

If the inspection step is completed in the offline status, the operation is not automatically set to

"completed".  This  would  require  a  manual  posting  later  on  while  the  terminal  is  online  again

("posting required").  If the  required  posting is  not made,  the inspection step is  not completed.

There is no message that the inspection step has not been completed.

Functionality – Inspection mode "Calibration"

This  inspection  mode  automatically  produces  a  calibration  inspection  requirement  including  respective

inspection steps when a calibration order is generated in the calibration calendar. If you want to generate

a calibration inspection requirement via calibration order, the following conditions must be fulfilled:

  Configure the calibration inspection plan as follows:

o  Operation assignment: “One inspection plan for all operations"

o

IO + inspection station: "One inspection step (=IO) for each inspection station"

o  Generate new QM OPs: "None"

o

IO + generate characteristics: "When generating inspection requirements"

AIP2-EQD.docx

Version: 1.5.14913

Page 8 of 9

Expanded View of Quality Data

  The  inspection  plan  characteristics  for  the  calibration  must  be  planned  for  a  machine/machine

group.

The inspection mode "Calibration" has a specific layout. The displayed inspection steps are identified as

follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the the machine group matches the one of

the inspection station. In addition, the inspection steps planned for a machine are identified if the

machine is the one of the current workplace.

4.  You  can  configure  the  update  interval  in  the  file  "caq72.ini"  in  the  subfolder  "packets"  using  the

parameter "LOADCYCLE".

These inspection steps are instantly displayed in the inspection mode "Calibration" without operation logon.

[DATACONTEXT_CAL]
LOADCYCLE=300
DATAPROVIDER_ID=PAUMNR
LIST=u_l_caq_inspstep_tnr

A special feature of the inspection mode "Calibration" is that you can complete the calibration directly on

the  AIP  when  finishing  the  inspection  step  and  requirement.  In  the  process,  you  also  select  the  test

equipment status, the calibration result and the basis for calculating the next calibration.

If  you  complete  the  inspection  requirement,  the  calibration  order  is  automatically  completed,  too.  As  a

condition, the respective QM operation must not be logged on and the OP must be defined as inspection

OP via processing code.

The system resets the calibration in the calibration calendar in the same way as a maintenance activity.

If the inspection requirement is completed in the offline status, the operation is not automatically

set to "completed". This would require a manual posting later on while the terminal is online again

("posting  required").  If  the  required  posting  is  not  made,  the  inspection  requirement  is  not

completed. There is no message that the inspection requirement has not been completed.

AIP2-EQD.docx

Version: 1.5.14913

Page 9 of 9

