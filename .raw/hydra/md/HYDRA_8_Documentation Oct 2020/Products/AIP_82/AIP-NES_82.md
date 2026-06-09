Manual

Collection of Quality Data
referring to Cavities
AIP-NES 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Collection of Quality Data referring to Cavities

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-NES_82.docx

Version: 1.0.23049

Page 2 of 99

Collection of Quality Data referring to Cavities

Contents

1  Collection of Quality Data referring to Cavities ............................................ 6

2  Collection of quality data referring to cavities .............................................. 7

3  Overview of Data Collection and Information Functions for Quality

Data on the AIP ............................................................................................ 8

3.1

Integration in the main view ................................................................................. 9

3.1.1  Due date status ....................................................................................... 9

3.1.2  Special features in case of shift change and queue mode ..................... 10

3.2

Inspector ID ....................................................................................................... 11

3.2.1  Constant user ........................................................................................ 12

3.2.2  Changing user ....................................................................................... 13

3.3  Recording of inspection results.......................................................................... 13

3.3.1  The inspection list .................................................................................. 14

3.3.2  The input panel ...................................................................................... 19

3.4  General input functions ..................................................................................... 20

3.4.1  Recording of failures .............................................................................. 20

3.4.2  Recording of measures ......................................................................... 21

3.4.3  Mandatory recording of failures and measures (as of CAQ 8.2 +

add-on) .................................................................................................. 23

3.4.4  Calculated characteristics ...................................................................... 23

3.4.5  Display and identification of the quality status (as of CAQ 8.2 +

add-on) .................................................................................................. 24

3.4.6  Automatic completion of inspection points (as of CAQ 8.2 + add-on) ..... 24

3.4.7  Assigning a test equipment number ....................................................... 25

3.5  Data collection with inspection points ................................................................ 26

3.5.1

Inspection step ...................................................................................... 26

3.5.2

Inspection point ..................................................................................... 26

3.5.3

Inspection point characteristic ............................................................... 29

3.5.4  Attributive data collection ....................................................................... 31

3.5.5  Variable collection ................................................................................. 33

3.5.6

Inspection chart ..................................................................................... 34

3.5.7  Data collection for cavities ..................................................................... 37

AIP-NES_82.docx

Version: 1.0.23049

Page 3 of 99

Collection of Quality Data referring to Cavities

3.5.8  Visual assignment of failures (as of CAQ 8.2)........................................ 42

3.5.9

Inspections based on catalogs (as of CAQ 8.2) ..................................... 45

3.5.10

Inspections based on catalogs, random selection (as of CAQ 8.2) ........ 47

3.6  Data collection without inspection points ........................................................... 47

3.6.1  Attributive data collection ....................................................................... 47

3.6.2  Variable collection ................................................................................. 48

3.6.3

Inspection chart ..................................................................................... 48

3.7  Sampling ........................................................................................................... 48

3.7.1  Sampling (simplified) ............................................................................. 48

3.7.2  Advanced Sampling (as of CAQ 8.2) ..................................................... 52

3.8

Information on characteristics ............................................................................ 54

3.8.1  Description ............................................................................................ 54

3.8.2  Documents ............................................................................................ 55

3.8.3  Process overview - variable ................................................................... 59

3.8.4  Process overview - attributive ................................................................ 60

3.8.5  Control chart #1 ..................................................................................... 61

3.8.6  Control chart #2 ..................................................................................... 62

3.8.7  Histogram .............................................................................................. 63

3.8.8  Failure history ........................................................................................ 64

3.8.9  History of measures ............................................................................... 67

3.9  MDI drivers ........................................................................................................ 68

3.9.1  Backup of MDI drivers ........................................................................... 68

3.10  Document management (as of CAQ 8.2) ........................................................... 74

3.10.1  Configuration / inspection point ............................................................. 75

3.10.2  Configuration / attributive data collection ............................................... 76

3.10.3  Configuration / variable data collection .................................................. 76

3.11  Transferring measured values for all characteristics  (as of CAQ 8.2) ............... 77

3.11.1  Configuration in HYDRA ........................................................................ 78

3.11.2  Function description / operating instructions .......................................... 79

3.12  Saving measured values using the ENTER key (as of CAQ 8.2) ....................... 83

3.12.1  Configuration in HYDRA ........................................................................ 84

3.12.2  Function description / operating instructions .......................................... 84

3.13

Integration of CAQ-MPL/TRT (as of CAQ 8.2) ................................................... 85

3.14  Preceding list of inspection points (as of CAQ 8.2) ............................................ 86

3.14.1  Configuration ......................................................................................... 86

3.15  General notes .................................................................................................... 89

AIP-NES_82.docx

Version: 1.0.23049

Page 4 of 99

Collection of Quality Data referring to Cavities

3.15.1  Field length in dynamic dialogs .............................................................. 89

3.15.2  Processing and display of automatic failures ......................................... 92

3.16  Asynchronous collection of measured values and failures (as of CAQ 8.1

and CAQ 8.2) .................................................................................................... 92

3.16.1  Configuration ......................................................................................... 92

3.16.2  Supported dialogs and actions .............................................................. 93

3.17  Calculated characteristic including calculation of eigenvalue (as of CAQ

8.2) .................................................................................................................... 94

3.18  Check if complaints exist when operations are logged on (as of SP13) ............. 99

AIP-NES_82.docx

Version: 1.0.23049

Page 5 of 99

Collection of Quality Data referring to Cavities

1  Collection of Quality Data referring to Cavities

Purpose

This component enables the collection of inspection data relating to a cavity number. Reports referring to

cavities can be generated based on the collected data.

Implementation notes

This  component  has  to  be  used  if  it  is  required  to  record  and  evaluate  inspection  data  in  relation  to

cavities.

Integration

This  component  uses  the  "data  collection  and  information  functions  for  quality  data"  and  upgrades  the

data collection functions of the AIP data acquisition client.

Functions

The following functions are available:





cavity information is assigned to inspection data (measured values)

the  user  is  guided  through  the  process  of  inspecting  defined  cavities  and  still  has  the  option  to

intervene manually

Licenses for Tool and Resource Management and the application services for cavity management (WRM-

NST)  are  required.  Additionally,  the  license  FEP-NES  and/or  WEP-NES  for  cavity-related  inspection

planning must be available.

Further  information  on  how  data  is  collected  with  the  AIP  terminal  can  be  found  in  the  document  AIP-

CAQ.

AIP-NES_82.docx

Version: 1.0.23049

Page 6 of 99

2  Collection of quality data referring to cavities

Collection of Quality Data referring to Cavities

Application

Document

Inspection planning

MOC_InspectionPlan.pdf

Evaluation of control charts

MOC_ControlChart.pdf

Failure mode analysis

MOC_FailureModeAnalysis

Transaction
code

Function
authorization

iplp

ccep

faep

iplp

ccep

faep

AIP-NES_82.docx

Version: 1.0.23049

Page 7 of 99

3  Overview of Data Collection and Information Functions for

Collection of Quality Data referring to Cavities

Quality Data on the AIP

Purpose

The CAQ basic functionality provides the inspection steps to perform inspections. In the combined BDE +

CAQ operation mode, the system identifies the respective inspection step when you log on an operation

or the system identifies the inspection plan for an article and operation number. Using the inspection plan,

the inspection step is created and logged on with the operation. Different events can trigger an inspection

(time and piece interval, machine status change, etc.).

Depending  on  its  configuration,  you  can  also  use  the  AIP  as  an  exclusive  inspection  station  to  record

inspection data.

In  addition  to  the  inspections  in  production,  you  also  use  the  AIP  to  perform  inspections  in  the  goods

receipt and goods issue, to inspect the initial sample and to perform calibrations.

AIP-NES_82.docx

Version: 1.0.23049

Page 8 of 99

Collection of Quality Data referring to Cavities

3.1

Integration in the main view

If a terminal is operated as a QM terminal, the main view of the AIP2 terminal also shows CAQ data. The

machine and order list show the inspection status graphically or in text form:

Figure: Main view if QM operation is enabled

If the inspection point list is used that is provided with FEP, WEP, PMV 8.2, the inspection statuses are

not shown. With this configuration, the inspection points are only requested when the inspection point list

is requested.

3.1.1  Due date status

Only the main view for machines and orders shows the due date status.

The due date status specifies if inspection specifications have been reached. The due date status does

not depend on user rights or any other user-dependent limitations.

The due date status is made up of three information components:

-  Colored inspection status: due date status as a symbol

-

Inspection status in text form: due date status in plain text

-  Time

AIP-NES_82.docx

Version: 1.0.23049

Page 9 of 99

Collection of Quality Data referring to Cavities

There is a separate due date status used to display incorrect configurations:

Incorrect configuration

Error

(e.g. with unknown evaluation basis or inspection sequence)

The following colors are available to display other due date statuses:

Entry required to reach the minimum inspections

 due for x minute(s)

Minimum inspection scope reached

checked

Minimum inspection scope not reached

checked

Inspection step or inspection requirement completed

completed

With attributive characteristics, the minimum inspection scope is reached if the number of inspected parts

matches  the  inspection  scope.  This  is  based  on  the  default  configuration  "less  than"  for  the  inspection

scope indicator. The inspection scope indicator is defined in the CAQ system option 1176.

If  the  sample  size  is  not  defined  (0  or  empty),  the  minimum  inspection  scope  is  never  reached.  In  this

case, the color of the node point is light green.

With cavity characteristics, the inspection scope indicator is always set to "EGAL". The color of the node

point therefore does not change and is light green.

3.1.2  Special features in case of shift change and queue mode

During a change of shifts, most of the requests sent to the HYDRA server are collected in a queue and

processed  in  the  same  order  after  the  shift  change.  The  same  processing  applies  for  CAQ  inspection

activities such as saving a measured value, creating  an inspection point, etc. If these activities have an

effect on the structure of the inspection list (generation and completion of inspections points), this will not

affect the shift change.

And  for  example,  inspection  points  generated  on  the  server  during  shift  change  cannot  be  seen  on  the

AIP, because in this case communication with the server is limited.

The  system  uses  two  kinds  of  messages  to  indicate  if  a  queue  is  available  (recognizable  by  the

underlined number in the footer next to the AIP status) or if all stored commands in the queue have been

processed.

AIP-NES_82.docx

Version: 1.0.23049

Page 10 of 99

Collection of Quality Data referring to Cavities

3.1.2.1  Commands in queue mode

For some activities that are run in queue mode, a message is displayed that informs about the available

restrictions. By default, the following messages are output:

Generation of inspection points, completion of inspection points

Communication  with  the  HYDRA  server  is  currently  limited.  Data  will  be  updated  when  server

communication is running again and when no more dialogs are open.

Show info

Communication with the HYDRA server is currently limited. Data might not be current.

Update display

Communication with the HYDRA server is currently limited. Data cannot be updated.



Configuration

Buttons of the inspection list

Configure individual settings for message texts or enable and disable messages

in the configuration file caq_dc_t.ini.

3.1.2.2  Action when exiting queue mode

CAQ data is automatically updated when the queue mode is closed.



Configuration

CAQ action after queue mode

Configure individual settings for message texts or enable and disable messages

in the configuration file caq72.ini.

3.2

Inspector ID

Depending on the terminal configuration, the terminal can show a dialog to identify the inspecting person

before the dialog to record inspection results is opened.

You can therefore record inspection results in two different user modes. The system either uses so-called

constant or changing users.

AIP-NES_82.docx

Version: 1.0.23049

Page 11 of 99

Collection of Quality Data referring to Cavities

3.2.1  Constant user

Before  opening  the  inspection  results  recording,  the  system  asks for  the  staff  badge  number  to  identify

the inspecting person.

The  staff  badge  number  entered  here  is  constant  for  all  input  dialogs  that  follow  and  can  no  longer  be

changed in the input dialogs of inspection results.

Figure: Dialog to enter the staff badge number

Configuration

Configure  the  dialog  to  enter  the  staff  badge  number  on  the  MOC.  Go  to:  File    Status  information  

Terminal status. To do this, enable the option Inspector identification before opening inspection dialog in

the CAQ tab.

You can extend this query function if you also enable the sub-option "Only if inspector is unknown". This

setting is only useful with a constant user.

AIP-NES_82.docx

Version: 1.0.23049

Page 12 of 99

Collection of Quality Data referring to Cavities

3.2.2  Changing user

The system does not ask for the staff badge number when you open the recording of inspection results.

Enter the staff badge number manually in each dialog if needed.

In some cases, a validation check of the user or of the user's rights might be run directly on the server or

in a dialog.

3.3  Recording of inspection results

You  use  the  recording  of  inspection  results  to  collect  QM  data  on  the  terminal.  The  inspection  results

recording  also  provides  features  allowing  to  present  graphics  (e.g.  control  charts)  and  to  prepare  and

present additional information, such as statistical KPIs, for example.

The dialog of the inspection results recording is divided into two windows.

The  left  hand  side  permanently  shows  the  so-called  inspection  list  with  the  respective  action  elements.

The  inspection  list  is  presented  in  a  tree  structure.  The  tree  structure  is  always  entirely  expanded.  The

structure cannot be collapsed.

The  right  hand  side  shows  the  input  panel  with  the  respective  action  elements.  This  panel  shows  the

detail data for the element selected in the inspection list. The data is with or without write protection (read-

only mode), depending on the mode configured.

AIP-NES_82.docx

Version: 1.0.23049

Page 13 of 99

Collection of Quality Data referring to Cavities

Figure: Recording of inspection results - the left hand side always shows the inspection list, the right hand

side shows a variable input panel



Note

Recording of inspection results with many inspection points

In the recording of inspection results, there  are usually  few  inspection points for

the  operation  logged on.  An increasing number of inspection points and  a great

number  of  inspection  point  characteristics  have  a  negative  impact  on  the

performance.

For  this  purpose,  the  system  provides  the  function  of  the  "preceding  inspection

point  list"  as  of  FEP,  WEP,  PMV  8.2.  The  preceding  inspection  point  list  is

opened  before  the  actual  inspection  list  is  called.  You  use  this  list  to  select  the

inspection  point  that  you  want  to  check.  Consequently,  the  contents  of  the

inspection list are reduced to one inspection point.

3.3.1

The inspection list

The inspection list consists of individual action elements (= tree nodes).

AIP-NES_82.docx

Version: 1.0.23049

Page 14 of 99

Collection of Quality Data referring to Cavities



Note

Buttons of the inspection list

If  you  switch  back  and  forth  between  different  action  elements,  you  change  the

input area and the buttons for the inspection list.

3.3.1.1  Buttons of the inspection list

The buttons are located at the bottom of the inspection list. Depending on the active action element, the

displayed buttons offer different functions matching the relevant context.



Configuration

Buttons of the inspection list

Configure the buttons individually in the configuration file caq_dc_t.ini.

3.3.1.2

Page 1 - context-sensitive buttons

The buttons on page 1 contain the functions used most frequently.

They depend exclusively on the type of action element currently selected in the inspection list.

One button on page 1 does not depend on the context. You can use this button to exit the recording of

inspection results.

"Close" button

You can use this button to exit the inspection results recording and go back to the machine overview.

Figure: Page 1 - context-independent button "Close"

"New inspection point" button

If  you  select  an  inspection  point  or  an  inspection  step,  which  is  relevant  to  an  inspection  point,  in  the

inspection list, the inspection list also shows the button New inspection point:

Figure: Page 1 - context-dependent button "New inspection point"

AIP-NES_82.docx

Version: 1.0.23049

Page 15 of 99

Click  this  button  to  manually  create  a  new  inspection  point.  The  newly  created  inspection  point  then

Collection of Quality Data referring to Cavities

appears in the inspection list.

"New measurement" button

If you select a characteristic or a single value (individual piece inspection) in the inspection list, the button

New measurement is shown at the bottom of the inspection list:

Figure: Page 1 - context-dependent button "New measurement"

Click

this  button

to  manually

create  an  action  element

for  a  new  measurement.

"Show info" button

If you select a characteristic or a single value (active individual piece inspection) in the inspection list, the

button Show info is also shown at the bottom of the inspection list:

Figure: Page 1 - context-dependent button "Show info"

By clicking on this button, a screen appears with information on the characteristic.

3.3.1.3

Page 2 - other functions [update]

The system provides one or more buttons in order to update/refresh data. The relevant function specifies

which data is updated when clicking this button.

Figure: Page 2 - button "Update display"

The function "update display" provides three different processing options for the provision of data on the

terminal. The following sections describe these options:

AIP-NES_82.docx

Version: 1.0.23049

Page 16 of 99

Collection of Quality Data referring to Cavities

1)  Function "update all"

The system updates the data of all inspection steps available on the terminal.

This  function  is  useful,  for  example,  if  you  want  to  view  the  recently  recorded  inspection  results  of

other workplaces.

This function can be useful if a user was absent over a longer period of time and the user wants to

update all QM data. Using this function, the user need not repeat the update in every inspection list.



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout  definitions  for  buttons  of  the  CAQ  inspection  list,  e.g.  here  in

relation to the inspection point

[CAQ_DC_T-PPKT-Page2]
1=DQC_RELOAD_LEGACY,R,Anzeige aktualisieren

  Default caq_dc_t.dll version <= 2.0.2.50 (AIP 8.1)

2)  Function "update inspection point"

The system refreshes the data of the currently selected inspection point.

Use this function to request calculated inspection results from the server for characteristics calculated

externally.



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout  definitions  for  buttons  of  the  CAQ  inspection  list,  e.g.  here  in

relation to the inspection point

[CAQ_DC_T-PPKT-Page2]
1=DQC_RELOAD_PPKT,R,Anzeige aktualisieren

  Default caq_dc_t.dll version >=2.0.2.51 (AIP 8.1)
  Default caq_dc_t.dll version >=8.0.2.7  (AIP 8.2)

3)  Function "intelligent update"

AIP-NES_82.docx

Version: 1.0.23049

Page 17 of 99

Collection of Quality Data referring to Cavities

This function identifies in which mode1 you opened the inspection list and the context of the selected

node.

According to the criteria mentioned above, the system selects one of the  above-described functions

1) or 2).

o  context = inspection point or

context = any node below an inspection point

  executes the function "update inspection point"

o  context <> inspection point

  executes the function "update all"



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout  definitions  for  buttons  of  the  CAQ  inspection  list,  e.g.  here  in

relation to the inspection point

[CAQ_DC_T-PPKT-Page2]
1=DQC_RELOAD,R, update display

  Default caq_dc_t.dll version >=2.0.2.51 (AIP 8.1)
  Default caq_dc_t.dll version >=8.0.2.7  (AIP 8.2)

You can also integrate several buttons with update functions. The user can then update different data.

The default configuration always provides one button to update data. This button does not depend on the

node currently selected in the inspection list. The button then executes the function "intelligent update".



Note

Recording of inspection results with many inspection points

If  you  operate  the  terminal  in  the  mode  QUEUE_MODE_RELOAD,  you  cannot

update data as described above.

1 mode a) standard

mode b) preceding inspection list

AIP-NES_82.docx

Version: 1.0.23049

Page 18 of 99

Collection of Quality Data referring to Cavities

When you update the display, the system requests all inspection data once more from the HYDRA server.

Depending on the data volume, the action of requesting lists, filling the data structure and structuring the

inspection list can take quite a bit of time.



Note

"Update display" button

You  cannot  specify  a  concrete  time  that  the  update  requires.  The  data  volume

that  must  be  updated  has  a  big  influence.  Requirement:  The  hardware  and

software conditions must be fulfilled and the HYDRA server's response time must

be within the normal range.

3.3.1.4  Collection status

You  can  identify  the  respective  collection  status  via  the  color  of  the  symbol  that  is  placed  before  the

action element in the inspection list.

The following options are available:

There is a separate collection status used to display incorrect configurations:



Incorrect configuration

(e.g. with unknown evaluation basis or inspection sequence)

The following entries are available to show other collection statuses:









Data collection required

 Further data can be recorded

No further data can be recorded but corrected

Completed

3.3.2

The input panel

The input panel is different for the different action elements. Depending on the selected action element,

the application loads and displays the correct dialog including data.

AIP-NES_82.docx

Version: 1.0.23049

Page 19 of 99

Collection of Quality Data referring to Cavities

Some of the dialogs are only for information purposes, others can be used to record data. If the dialog is

an  input  dialog,  the  write  permission  must  be  available,  if  required.  A  dialog  can  also  be  read-only,

because additional processing is no longer allowed.

Similar to the inspection list, the different dialogs provide different buttons. The buttons provided depend

on the functionalities provided by the dialog.

3.4  General input functions

The  input  panel  shows  the  input  functions.  Presentation  and  number  of  available  input  functions  are

different.

The input functions can be included in one or several tabs. At this point, we refer to so-called workflows.

The selected action element specifies which input functions are displayed.

3.4.1  Recording of failures

The input dialog Classic recording of failures is integrated in many different input functions. Depending on

the context, different data is assembled.

AIP-NES_82.docx

Version: 1.0.23049

Page 20 of 99



Note



Note

Collection of Quality Data referring to Cavities

Assignment

The  items  offered  for  selection  in  the  radio  group  depend  on  the  context  and

therefore they are made available dynamically.

Input type

By default, the radio group provides the following items:

-  Failure type

-  Failure location

-  Failure cause

There are recording functions such as the Inspection chart where the input types

must be dynamically assembled.

-

If an analysis selection catalog is defined for a characteristic, this catalog specifies the possible

entries.

-  Enter a filter to restrict the failures displayed for selection in the field Input type.

Behavior and operation of the Classic recording of failures is the same in all dialogs.

-  Click the button Save failure to save the current failure entry. In this case, the user remains in the

current index tab and can save additional failure analysis criteria.

-

If  you  have  not  saved  a  failure  and  you  click  the  button  Next  or  Back,  the  program  will

automatically send a confirmation prompt.

-  After clicking the button Done, the application saves the selected failure.  You can now switch to

another action element.

3.4.2  Recording of measures

The input dialog Classic recording of measures is integrated in many different input functions.

AIP-NES_82.docx

Version: 1.0.23049

Page 21 of 99

Collection of Quality Data referring to Cavities

-

If  an  analysis  selection  catalog  is  defined  for  a  characteristic,  this  catalog  specifies  the  possible

entries.

-  Enter a filter to restrict the measures displayed for selection.

Performance and operation: “Classic recording of measures“:

-  Click  the  button  ”save  measure”  to  save  the  current  measure.  In  this  case,  the  user  remains  in

the current tab and can save further measures

-  The program displays a prompt if the button “Next“ or “Back“ is clicked without having saved the

measure

-  After  clicking  the  button  Done,  the  selected  measure  is  saved.  You  can  now  switch  to  another

action element.

-  You can edit the text in the input field “measure“.

AIP-NES_82.docx

Version: 1.0.23049

Page 22 of 99

Collection of Quality Data referring to Cavities

3.4.3  Mandatory recording of failures and measures (as of

CAQ 8.2 + add-on)

If  this  function  is  enabled,  you  can  be  forced  to  enter  failure  data  and/or  measures  when  you  record

measured values.

To identify if a failure occurred, the following types are available:

-  Automatically generated failure in HYDRA

-  Quality status of the measured value

You can define the following failure data:

-  Failure type

-  Failure location

-  Failure cause

Configure general settings in the file caq_dc_t.ini. You can define a separate configuration for each input

type in the dialog-specific INI file.

3.4.4  Calculated characteristics

The input panel for calculated characteristics is always read-only.

You  must  update  the  display  manually  to  show  the  results  of  the  calculated  characteristics  in  the

inspection list when you have recorded the inspection results of all source characteristics.

To this end, click the button “Update display”.

The terminal must be ”online“ to request calculated characteristics.



Note

Individually calculated characteristics

The function to calculate characteristics individually is not supported.

AIP-NES_82.docx

Version: 1.0.23049

Page 23 of 99

Collection of Quality Data referring to Cavities

3.4.5  Display and identification of the quality status (as of CAQ

8.2 + add-on)

Install  the  add-on  to  show  the  quality  status  of  the  measured  value  in  the  inspection  list.  The  terminal

calculates the quality status when the measured value is entered. Calculations include the tolerance and

action limits and/or the quantities accepted and rejected. The following symbols are available:

Upper tolerance limit violated (fail)

Upper action limit violated (conditionally pass)

Lower tolerance limit violated (fail)

Lower action limit violated (conditionally pass)

Number of non-conforming units (conditionally pass)

(Non-conforming units < rejection quantity) and

(Non-conforming units > acceptance quantity)

Number of non-conforming units (fail)

(Rejection quantity <= number of non-conforming units)

3.4.6  Automatic completion of inspection points (as of CAQ 8.2

+ add-on)

If  configured  accordingly,  you  can  use  the  add-on  to  complete  inspection  points  automatically.  The

HYDRA  server  takes  the  usage  decision  (pass,  fail)  if  operated  in  this  mode.  You  can  configure  the

following:

-  All

The system completes the inspection point automatically when the last measured value has been

collected.

-  Only valid measured values

AIP-NES_82.docx

Version: 1.0.23049

Page 24 of 99

Collection of Quality Data referring to Cavities

The system only completes inspection points with quality status "pass" or "conditionally pass".

When the inspection point is completed, the system continues processing (if auto navigation is enabled)

or completes the inspection data collection.

3.4.7  Assigning a test equipment number

After installation of feature pack FP04-2018 (CAQ 8.2 add-ons), the function of the automatic assignment

of a test equipment used in an inspection to the measured value or the attributive inspection is available.

The test equipment used (the test equipment number) is displayed in the MOC application  Single values

in  field  Test  equipment  (used).  This  field  is  contained  in  the  list  of  available  columns  of  the  list  Single

values.

Condition for the automatic assignment of the test equipment used for an inspection: you must specify a

test  equipment  number  or  a  test  equipment  group  for  the  relevant  inspection  plan  characteristic.  If  you

have  specified  a  test  equipment  number  for  the  inspection  plan  characteristic  and  therefore  also  the

inspection step characteristic, this number is stored with the measured value recorded or the attributive

inspection result for each inspection. If you have specified a test equipment group for the inspection plan

characteristic and therefore also for the inspection step characteristic, the system identifies and stores the

test equipment number as follows:

1.  The system identifies the  workplace where the measured value or the attributive inspection has

been recorded. The required workplace number is derived from the respective sample.

2.  The system uses the workplace number to identify the resource of type "PRM" (test equipment) in

the resource list, which belongs to a test equipment group (resource family) that matches the one

of the inspection characteristic.

3.

If  the  system  identifies  more  than  one  test  equipment  belonging  to  a  matching  test  equipment

group in the resource list, the first test equipment group identified for the measured value or the

attributive inspection is saved.

In  case  of  calculated  characteristics  including  calculation  of  eigenvalue,  the  test

equipment is only saved for the calculated value.

You cannot change the automatically identified and saved test equipment number using

the editing function of the MOC application Single values.

AIP-NES_82.docx

Version: 1.0.23049

Page 25 of 99

Collection of Quality Data referring to Cavities

3.5  Data collection with inspection points

  Inspection with inspection point

3.5.1

Inspection step

The input function "inspection step" includes only one tab. You use this function to display data because

there is no interaction with the user.

The function shows  information about  the  order, the  operation, the article  and the article  name. For the

QM, the function shows the inspection requirement and the inspection step.

The dialog does not allow interaction with the user (buttons, fields, etc.).

Figure: Function "inspection step" (right)

3.5.2

Inspection point

You must not change the structure of workflows and dialog settings of the data collection for

"inspection points".

AIP-NES_82.docx

Version: 1.0.23049

Page 26 of 99

Collection of Quality Data referring to Cavities

Discuss change requests with MPDV Consulting and/or MPDV CAQ Software Development.

The input function "inspection point" is made up of two index tabs.

By  default,  the  first  index  tab  Identification  includes  several  fields.  Via  customization,  you  can  specify  if

the fields are visible or invisible and if the fields are optional or mandatory fields.

By  default,  the  second  index  tab  "Details"  also  includes  several  fields.  Also  in  the  second  tab,  you  can

specify  via  customization  if  the  fields  are  visible  or  invisible  and  if  the  fields  are  optional  or  mandatory

fields.

Note the following for this input function:

-  When the AIP terminal generates a new inspection point, the application completes the fields with

default data:

o  Shop  floor  workstation  (machine)    current  machine  where  the  inspection  results  are

collected

o  Date (USER_D1)  current system date

o  Time (USER_T1)  current system time

-  The field shop floor workstation is read-only

-

If the inspection point is not completed, the usage decision is set to  undefined by default. In this

case, the fields Group and Code are both left empty.



Note

Usage decisions

The usage decisions that are available for an inspection step are specified via a

filtering of the catalog for this inspection step.

-

If a usage decision other than undefined is selected, the inspection point is completed by clicking

the button Done in tab Details. The inspection point now has the processing status Completed.

-

If  you  do  not  want  that  the  user  takes  usage  decisions,  you  stop  access  to  the  selection  list

Usage decisions and to the fields Group and Code.

AIP-NES_82.docx

Version: 1.0.23049

Page 27 of 99

Collection of Quality Data referring to Cavities

-  The  fields  Partial  batch  and  ERP  Batch  in  tab  Details  become  mandatory  fields  if  configured

accordingly.

-  The key fields of the "Identification" index tab are only shown if the respective control flags have a

numeric value greater than 0 and less than 99 (mandatory fields).

-  Key fields are never shown if the values are less than or equal to 0.

-

If values greater than or equal to 99 are entered, the key fields become  optional fields. You can

use a parameter to specify if apart from the mandatory fields of an inspection point, the optional

fields

are

also

displayed.

--> see chapter Configuration qee_insppoint.ini



Note

Failures / measures

If you do not use the QMS environment, the option to record failures or measures

for the inspection point is not provided.

In  a  non-QMS  environment,  the  recording  of  failures  is  integrated  on  the

respective levels:

-

-

-

Inspection requirement

Inspection step

Inspection point characteristic

-  Sample

-  Single values

3.5.2.1  Configuration qee_insppoint.ini

Entry

Comment

Section [CONFIGURATION]

AIP-NES_82.docx

Version: 1.0.23049

Page 28 of 99

Collection of Quality Data referring to Cavities

Entry

Comment

SHOW_OPTIONAL_USERFIELDS=[ON,OFF]  Option  to  show  or  hide  optional  fields  of  an  inspection

point.

Default  OFF

Example 1
SHOW_OPTIONAL_USERFIELDS=ON

Using  this  configuration,  the  terminal  does  not  only
display  the  mandatory  fields  of  an  inspection  point
(values  ranging  between  0-98),  but  also  all  optional
fields (value greater than 98).

Example 2
SHOW_OPTIONAL_USERFIELDS=OFF

The  terminal  displays  only  the  mandatory  fields  (values
ranging between 0-98) of an inspection point.

3.5.3

Inspection point characteristic

This  type  of  data  collection  includes  a  single-part  inspection.  On  the  level  of  the  characteristic,  the

terminal only shows a summary of the characteristic inspections for this inspection point.

AIP-NES_82.docx

Version: 1.0.23049

Page 29 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Inspection point characteristic"/ "inspection data" index tab

By  default,  this  input  function  does  not  have  any  other  dialogs  (as  Classic  recording  of  failures  for

example).

The dialog does not allow interaction with the user (buttons, fields, etc.).

AIP-NES_82.docx

Version: 1.0.23049

Page 30 of 99

3.5.4  Attributive data collection

Collection of Quality Data referring to Cavities

Figure: Input function "Attributive data collection / "inspection data" index tab

-  By default, the value 0 is preset in the field non-conforming units.

-  By default, the sample size is preset in the field Checked units. If the sample size is smaller than

or unequal to 1, the field remains empty.

-  The focus is initially set on the field non-conforming units.

-  You can click the Done button to save the data entered for the attributive characteristic.

-

If you click the Next button, the data entered for the attributive characteristic is saved.

AIP-NES_82.docx

Version: 1.0.23049

Page 31 of 99



Note



Note

Collection of Quality Data referring to Cavities

Save data

To save the data entered, you can click the Done button or the Next button ( go

to next index tab). In both cases, the data is saved.

Number of checked units/ number of non-conforming units

The  number  of  non-conforming  units  must  be  less  than  or  equal  to  the  number

entered for Checked units.



Configuration

Relevant configuration files in the "Inspection data" index tab

-  mm_be_st_pp_si.ini

-  qee_mm_be_st_pp_si.ini

The recording of attributive characteristics in tab Failure data is additionally provided. This is the Classic

recording of failures on the AIP terminal. This dialog is integrated in many data collection functions.

In  this  input  dialog,  you  record  the  failure  data  of  the  sample  for  the  respective  inspection  point  or

characteristic.



Note

Classic failure recording/ failure data

By default, you can record the following failures:

-  Failure types

-  Failure locations

-  Failure causes

AIP-NES_82.docx

Version: 1.0.23049

Page 32 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Attributive collection / "failure data" index tab



Configuration

Relevant configuration files in tab "Failure data"

-  ctaiplay.ini

-  mm_be_st_pp_si.ini

-  qee_err_classic.ini

3.5.5  Variable collection

You record the single values for the sample of the inspection point.

AIP-NES_82.docx

Version: 1.0.23049

Page 33 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Variable recording / "inspection data" index tab

If the MDI connection is active, the system requests all MDI driver values of the corresponding

channel without setting filter criteria.

3.5.6

Inspection chart

Use  an  inspection  chart  to  record  different  failure  types  concerning  a  sample  relating  to  an  inspection

point.

AIP-NES_82.docx

Version: 1.0.23049

Page 34 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Inspection chart"/ "inspection data" index tab

The  selection  of  available  failure  types  depends  on  whether  an  Analysis  selection  catalog  has  been

assigned to the characteristic or not.

If an Analysis selection catalog exists, the catalog is used to populate the entries of the inspection chart.

The advantage is that there is an individual and in some cases a small selection.

If  no  analysis  selection  catalog  has  been  assigned  to  the  characteristic,  all  existing  failure  types  are

available in the inspection chart.

-  The default value 0 is preset in the fields Non-conforming units and for each (failure type) entry of

the inspection chart.

-  By default, the sample size is preset in the field Checked units. If the sample size is smaller than

or unequal to 1, the field remains empty.

-

Initially, the field Checked units has the focus.

-  Save the inspection chart by clicking the Done button.

AIP-NES_82.docx

Version: 1.0.23049

Page 35 of 99

Collection of Quality Data referring to Cavities

-  Save the inspection chart by clicking the Next button.



Note

Save data

To save the data entered, you can click the Done button or the Next button ( go

to next index tab). In both cases, the data is saved.

-  The  system  automatically  calculates  the  number  of  non-conforming  units  from  the  sum  total  of

failures  entered  in  the  inspection  chart.  At  this  point,  the  user  can  manually  overwrite  the

automatically calculated number of non-conforming units.



Note



Note

There are no automatic failures in the inspection chart

The system does not generate automatic failures for inspection charts.

Number of checked units/ number of non-conforming units

The  number  of  non-conforming  units  must  be  less  than  or  equal  to  the  number

entered for Checked units.



Configuration

Relevant configuration files in the "Inspection data" index tab

-  ctaiplay.ini

-  mm_be_st_pp_fs.ini

-  qee_mm_be_st_pp_fs.ini

For the data collection in the inspection chart, the terminal also provides the tab  Failure data. This is the

Classic  recording  of  failures  on  the  AIP  terminal.  This  dialog  is  integrated  in  many  data  collection

functions.

Of  particular  interest  in  the  context  of  the  Inspection  chart  is  that  the  failure  data  is  recorded  for  each

sample of the relevant inspection point.



Note

Classic failure recording/ failure data

You cannot record failure types here.

AIP-NES_82.docx

Version: 1.0.23049

Page 36 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Inspection chart"/ "failure data" index tab



Configuration

Relevant configuration files in tab "Failure data"

-  ctaiplay.ini

-  mm_be_st_pp_fs.ini

-  qee_err_classic.ini

3.5.7  Data collection for cavities

You  must  generate  inspection  points  to  collect  data  for  cavities  because  the  tool  is  assigned  to  the

inspection point and the tool specifies the number of cavities. When the inspection point  is created, the

system automatically uses the tool assigned to the operation for the inspection point.

If  the  function  extension  for  the  in-production  inspection  is  not  available,  the  collection  for

cavities  is  limited  to  variable  characteristics  with  inspections  based  on  characteristics.  If  the

function  extension  for  the  in-production  inspection  is  available,  the  collection  for  cavities  also

covers attibutive characteristics and supports a data collection with reference to pieces.

AIP-NES_82.docx

Version: 1.0.23049

Page 37 of 99

Collection of Quality Data referring to Cavities

In the inspection point, the tool number must not be greater than 15 digits. If the tool assigned

to  the  operation  has  more  digits,  you  must  create  a  custom  dialog  for  the  terminal  or  the

terminal group. You can use the dialog "QEE_INSSPOINT" to change the field length.

You  record  the  single  values  for  the  sample  of  the  inspection  point.  The  example  below  is  based  on  a

collection of measured values for cavities that is based on characteristics.

Figure: Input function “Variable recording including cavity“ / tab “inspection data“

-

Initially the field measured value has the focus.

-

In  the  Cavity  field,  the  system  enters  the  value  that  is  specified  for  the  Tool  in  the  cavity  list

(available  primary  tool  of  the  logged  on  operation).  You  can  change  this  field  value,  as  long  as

the measured value is not saved.

AIP-NES_82.docx

Version: 1.0.23049

Page 38 of 99

Collection of Quality Data referring to Cavities



Note

Manual input of a cavity

If  you  manually  enter  a  value  in  the  Cavity  field,  no  validation  check  is  run  that

checks  if  the  cavity  entered  actually  exists.  However,  you  must  enter  a  value  in

the Cavity field (mandatory field).

-  Click the Done button to save the recorded data of the variable characteristic with cavity.

-  The  Cavity  field  is  read-only  and  can  no  longer  be  edited  when  you  have  entered  a  measured

value.

-  Click the invalid button to invalidate the recorded value. Click the button new measurement if you

want to replace the invalid value with a new value.

-  Click the Next button to save the recorded data of the variable characteristic with cavity. Use this

function if you want to collect further data in the workflow, e.g. failure recording

-  The  sample  size  of  the  characteristic  is  calculated  via  the  product  of  sample  size  *  number  of

cavities  included  in  the  cavity  list.  Consequently,  the  sample  size  of  the  inspection  plan

characteristic  matches  the  number  of  measured  values  to  be  recorded  for  each  cavity.  Empty

rows for measured values are displayed, once the inspection list has been updated or opened the

next time.

The  sample  size  for  cavity-related  data  collection  is  not  subject  to  restrictions.  Consequently,

validation  checks  are  not  performed.  This  means:  with  cavity  characteristics,  the  inspection

scope indicator is always set to "EGAL". The color of the node point therefore does not change

and is light green.



Note

Terminal behavior: Inspection results of different machines for a cavity

It is possible that you record different samples for a cavity of an (inspection step)

characteristic.  For  example,  this  is  the  case  if  the  inspection  results  are  from

different

machines.

The  terminal  does  not  show  the  results  of  both  machines  in  the  inspection  list.

Only the results of the current machine are shown.

AIP-NES_82.docx

Version: 1.0.23049

Page 39 of 99



Note



Note

Collection of Quality Data referring to Cavities

Display of measured values in the inspection list

You cannot configure the label for cavity-related measured values.

Re-sorting of measured values in the inspection list

The application only re-sorts the measured values of a characteristic that relates

to

cavities

a) when you call the recording of inspection results the next time

or

b) when you manually update the values displayed.

  See section Cavity list

In case of an attributive inspection for a cavity, the cavity number is only displayed in the inspection list.

The cavity number is not displayed in the actual input dialog.

In  case  of  a cavity-related  data  collection  for  a  variable  characteristic  with  piece-related  inspection,  you

can  define  the  content  that  is  displayed  in  the  inspection  list  for  the  node  "shot/part".  You  make  this

definition

in

the  configuration

file

"caq_dc_t.ini"

(AIP  sub

folder

functions)

in  section

"[GROUP_BY_SP_NEST_SCHUSS]". In section "[MW_SCHUSS_NEST]", you configure the content that

is displayed for the node of the measured values in the context of a piece-related inspection. For details

on the configurations, refer to the document "Configuration_AIP-QM.pdf".

3.5.7.1

Tool


Note

Requirements for the operation: resource type

You must define a resource of the type WNR for the operation in order to use the

cavity function with the AIP terminal.

If  required,  you  can  change  the  tool  while  working  with  an  inspection  point.  You  can  do  so  in  the

“inspection point" input function of the terminal.

Please note in this context that the cavity list (contents and/or order) might change if you change the tool.

AIP-NES_82.docx

Version: 1.0.23049

Page 40 of 99

Collection of Quality Data referring to Cavities

Changing  the  tool  of  an  inspection  point  when  the  terminal  is  in  “offline“  status  does  not  affect  the

currently available cavities. Updating the cavity list requires the “online” status.

  See section Cavity list

3.5.7.2  Cavity list

The cavity list results from the assignment of cavities to the tool.

The terminal shows the cavity list according to the order of the inspection list defined in the MOC.

The below changes can affect the content of a cavity list:

-  Assignment of another tool to the inspection point

-  Blocking of (individual) cavities

Example:

If a cavity is blocked (e.g. in MOC) during a terminal session or the tool is changed directly on the

terminal,  this  cavity  is  removed  from  the  terminal,  once  the  inspection  list  has  been  updated.

Provided that measured values have already been recorded for this cavity, they are still shown in

the inspection list. If required, the inspection list shows empty rows for measured values in order

to reach the sample size.



Note

Modification of the cavity list on the terminal

The terminal uses information from cavity assignments available at the time when

the cavity list is requested (not at the time of generating the inspection point).

The  inspection  list  shows  the  changes  made,  once  you  have  clicked  the  button

.

You can make such changes directly on the terminal or the MOC.

  See section Tool

AIP-NES_82.docx

Version: 1.0.23049

Page 41 of 99

Collection of Quality Data referring to Cavities

3.5.8  Visual assignment of failures (as of CAQ 8.2)

Input type BEWERT_STICHPR_PPUNKT_RASTER

Use this input type to enter the defect positions in the grid.

The system only supports this input type in combination with inspection points.

You must not change the dynamic dialog QEE_MM_BE_ST_PP_RA without contacting MPDV.

This  dialog  shows  the  characteristic  document  (not  the  inspection  requirement  document)  at

position 1. It must be of the type "FILE".

The picture size might have an impact on the time it takes to display the picture in the workflow.

Therefore, you should use small-size pictures.

The AIP automatically scales the pictures to the ideal size.

We recommend to use square pictures.

The following formats are supported:

-

JPEG, JPG, PNG

In order to be able to divide a graphic into different areas, you must define a pattern for the x-

axis and y-axis of the available inspection plan characteristic.

Use a comma to separate the data entered for the inspection plan characteristic.

AIP-NES_82.docx

Version: 1.0.23049

Page 42 of 99

Collection of Quality Data referring to Cavities

But

the  comma  must  neither  be

the

first  nor

last  character

in  an  axis  definition.

Several commas must not succeed one another.

Figure: Visual defects recording

-  Select a "failure type" to complete the field "failure". Click the button behind the "failure" field to

open a list of "failure types" where you can select a failure. The respective number of the failure

type is then entered in the "failure" field.

AIP-NES_82.docx

Version: 1.0.23049

Page 43 of 99

Collection of Quality Data referring to Cavities

Figure: Selection list of failure types

-  The "position" fields are completed with the coordinates of the area you selected in the graphic.

-  By  default,  the  sample  size  is  preset  in  the  field  Checked.  If  the  sample  size  is  smaller  than  or

unequal to 1, the field remains empty.

-  The default value 0 is preset in the field Defective.



Note

Automatic assignment of the field Defective

To  optimize  data  collection,  the  application  assigns  the  value  1  in  the  field

"defective" when the first defect position is entered if the field is empty or includes

the value 0.

For all further actions, this automatism does not apply.

-

Initially, the field Failure has the focus.

Click the button "save defect position" to save the following values:

- the selected failure type,

- the specified position and

- the inspection result (contents of the fields "checked", "defective" and "inspector").

The system does not change to another characteristic. The characteristic is still selected so that you can

enter further defect positions.

AIP-NES_82.docx

Version: 1.0.23049

Page 44 of 99

Collection of Quality Data referring to Cavities

Saving defect positions:



Note

Requirements for saving defect positions

An  inspection result for the characteristic must be available. Only then,  you can

enter the position of failures.

-  The "failure" field is mandatory.

-  The fields where you enter the position are mandatory.

-  You can save the collected data by clicking the button "generate samples".

Clicking  the  buttons  "Done"  or  "Next"  only  saves  the  inspection  result  of  the  characteristic  but  not  the

defect position. Click the button "done" to change characteristics.

Saving the "inspection result of the characteristic":

-  The "checked" field is mandatory, 0 is not a valid value.

-  The "defective" field is mandatory, 0 is a valid value.

-  The "inspector" field is mandatory.

-  You can save the collected data by clicking the button "Done".

-  You can save the collected data by clicking the button "Next".

Click the button "store defect position" and then "Done" to enter one defect position.



3.5.9

Inspections based on catalogs (as of CAQ 8.2)

Input type CODE_STICHPR_PPUNKT_SIMPLE

Use this input type to enter attributive characteristics via catalogs.

The system only supports this input type in combination with inspection points.

AIP-NES_82.docx

Version: 1.0.23049

Page 45 of 99

Collection of Quality Data referring to Cavities

Figure: Inspections based on catalogs

-  Select an entry from the above list to complete the fields "group/code". Both fields are read-only.

-  By  default,  the  sample  size  is  preset  in  the  field  Checked.  If  the  sample  size  is  smaller  than  or

unequal to 1, the field remains empty.

-  The default value 0 is preset in the field Defective.



Note

Automatic assignment of the field Defective

To  optimize  data  collection,  the  application  enters  the  value  "1"  in  the  field

Defective  if  you  select  an  entry  classified  as  "fail".  Requirements:  The  field

Defective  is  empty  or  it  includes  the  value  "0"  and  the  inspection  result  has  not

yet been saved.

If these conditions are not met, the field is not subject to the automatism.

-

Initially, the field "defective" has the focus.

Saving inspection results:

-  The fields "group/code" are mandatory

-  The "checked" field is mandatory, 0 is not a valid value.

-  The "defective" field is mandatory, 0 is a valid value.

-  The "inspector" field is mandatory.

AIP-NES_82.docx

Version: 1.0.23049

Page 46 of 99

Collection of Quality Data referring to Cavities

-  You can save the collected data by clicking the button "Done".

-  You can save the collected data by clicking the button "Next".



3.5.10

Inspections based on catalogs, random selection (as of

CAQ 8.2)

Input type CODE_STICHPR_PPUNKT_ZUF_SIMPLE

Use this input type to enter attributive characteristics via catalogs.

This

input

type

is

similar

to

the

catalog-based

inspection  using

the

input

type

CODE_STICHPR_PPUNKT_SIMPLE. This input type provides a random selection of entries that you can

select to complete the group/code field.

The system only supports this input type in combination with inspection points.

  See section 3.5.9



3.6  Data collection without inspection points

  Sample-related inspection

3.6.1  Attributive data collection

This

function

is

equivalent

to

the

input

type

BEWERT_STICHPR_PPUNKT_SIMPLE

 see chapter Attributive collection

AIP-NES_82.docx

Version: 1.0.23049

Page 47 of 99

Collection of Quality Data referring to Cavities

The data collected always refers to a (machine-dependent) sample.

The "Failure recording" dialog configured for this purpose records defects/failures relating to  samples. In

contrast to the input type  BEWERT_STICHPR_PPUNKT_SIMPLE that records defects/failures relating to

inspection points.

3.6.2  Variable collection

The  display  of  data  is  similar  to  the  display  of  the  input  type  MESSW_ESTCK_PPUNKT_SIMPLE.

 See section Variable collection

The data collected always refers to a (machine-dependent) sample.

The "Failure recording" dialog configured for this purpose records failures with reference to samples. This

is  different  for  the  input  type  MESSW_ESTCK_PPUNKT_SIMPLE  that  records  failures  with  reference  to

inspection points.

3.6.3

Inspection chart

The  display  of  data  is  similar  to  the  display  of  the  input  type  BEWERT_STICHPR_PPUNKT_FSK.

 See section Inspection chart

The functions are the same as for the input type BEWERT_STICHPR_PPUNKT_FSK.

The data collected always refers to a (machine-dependent) sample.

The "Failure recording" dialog configured for this purpose records failures  with reference to  samples. In

contrast  to  the  input  type  BEWERT_STICHPR_PPUNKT_FSK  that  records  failures  with  reference  to

inspection points.

3.7  Sampling

3.7.1  Sampling (simplified)

The  input  function  “sampling“  includes  one  single  tab.  This  input  function  provides  the  user  with  the

possibility to trigger the generation of samples.

By default, the sampling tab only shows the field sample group.

AIP-NES_82.docx

Version: 1.0.23049

Page 48 of 99

Collection of Quality Data referring to Cavities

Figure: Input function “Sampling“ (right)

-  Click  the  generate  sample  button  to  generate  a  new  sample.  If  processing  is  successful,  a

message will appear showing the newly generated sample number.

Figure: Message with the generated sample number

AIP-NES_82.docx

Version: 1.0.23049

Page 49 of 99

Collection of Quality Data referring to Cavities



Note

Behavior in the event of failures

If an error occurs while generating the sample, the following message will appear:

  Sample could not be generated

This message only occurs if the terminal is online.

-  The  collection  status  of  the  sampling  characteristic  is  always  constant  and  never  changes.  The

collection status is centrally configured in the system and can have the following values:

o

o

 Data collection possible

 Data collection required (default setting)

  see section Collection status

-

If  you  click  the  Done  button,  no  further  action  will  take  place.  You  can  now  manually  switch  to

another  action  item.  No  actual  inspection  is  performed  for  a  sampling  characteristic.  For  this

reason,  the  default  setting  (collection  required)  remains  unchanged  even  when  the  sample  has

been  generated.  For  this  reason,  you  must  change  the  characteristic  manually  after  generating

the sample.



Note

Behavior in offline status

A message informs the user that the activity has been buffered.

Once  the  terminal  is  again  connected  with  the  HYDRA  server,  all  activities  that

have been buffered will be processed one after the other.

You cannot generate samples in the offline status.

Consequently, the user does not get a new sample number.

If samples are generated while the buffer is being processed (as described

above),  the  terminal  will  not  show  the  generated  sample  numbers  for

technical reasons.

AIP-NES_82.docx

Version: 1.0.23049

Page 50 of 99

Collection of Quality Data referring to Cavities

Figure: (Inspection station for samples) Example of a recording of data for an inspection point (for a

sample) that is generated by sampling



Configuration

Useful layout modifications in the  inspection list  at  inspection stations for

samples

Via  the  generated  sample  number,  you  can  identify  inspection  points  that  have

been generated when a sample has been created.

For  this  reason,  it  might  be  a  useful  layout  modification  to  show  the  sample

number in the inspection list, especially at inspection stations for samples.

  Please contact your MPDV CAQ consultant.

AIP-NES_82.docx

Version: 1.0.23049

Page 51 of 99

Collection of Quality Data referring to Cavities

3.7.2  Advanced Sampling (as of CAQ 8.2)

The data collection function "advanced sampling" includes one single tab. This input function provides the

user with the possibility to trigger the generation of samples.

Figure: Data collection function "advanced sampling" (right)

-  Click  the  "generate  sample"  button  to  generate  a  new  sample.  If  processing  is  successful,  a

message appears indicating the new "sample number".

Then, as it is also the case with other characteristic types, characteristics are changed and/or the

next inspection point is "selected".

Figure: Message with the generated sample number

AIP-NES_82.docx

Version: 1.0.23049

Page 52 of 99

Collection of Quality Data referring to Cavities



Note

Behavior in the event of failures

If an error occurs while generating the sample, the following message will appear:

  Sample could not be generated

This message only occurs if the terminal is online.

-

In contrast to the characteristic of a simple sampling, the data collection status for the "advanced

sampling characteristic" is not constant. It is similar to that of "attributive characteristics".

Other  than  for  the  attributive  characteristic  it  is  not  the  field  "checked  units"  that  is  critical  for

changing the data collection status but the field "generated samples".

The "generated samples" field informs the user about the number of generated samples.

  see section Collection status



Note

Behavior in offline status

Activities are buffered if the terminal is offline.

Once  the  terminal  is  again  connected  with  the  HYDRA  server,  all  activities  that

have been buffered will be processed one after the other.

If samples are generated while the buffer is being processed (as described

above),  the  terminal  will  not  show  the  generated  sample  numbers  for

technical reasons.



Note

Posting required

Irrespective  of  the  defined  sample  size,  you  can  generate  more  samples  than

specified  for  sampling  characteristics.  In  this  case,  you  can  complete  the

inspection point using the "posting required" option.

AIP-NES_82.docx

Version: 1.0.23049

Page 53 of 99

Collection of Quality Data referring to Cavities

3.8

Information on characteristics

Use  the  function  Information  on  characteristics  to  show  context  sensitive  information.  Technically

speaking, information on characteristics can be described as a workflow made up of index tabs that are

shown and hidden as required.

Click the "Display info" button to request information on characteristics.

The subchapters that follow deal with the information provided by the terminal.

3.8.1  Description

This  index  tab  shows  the  data  relating  to  the  current  characteristic  and  the  most  important  information

about the corresponding operation and the defined test equipment/gage.

Figure: Index tab "Description" in information on characteristics

The  information  referring  to  the  connection  status  of  the  test  equipment/gage  is  derived  from  the

corresponding  MDI  status  after  initialization.  The  following  statuses  are  available  for  the  connection

status:

   MDI test equipment connection is online

AIP-NES_82.docx

Version: 1.0.23049

Page 54 of 99

Collection of Quality Data referring to Cavities

  MDI test equipment connection is offline

  No MDI test equipment connection is defined or can be identified and as such is not available



Note

The  Description  index  tab  is  a  permanent  component  of  the  information  on

characteristics function.

Exiting information on characteristics

3.8.2  Documents

This  index  tab  shows  both  documents  defined  for  the  inspection  order  characteristic  and  documents

assigned to the inspection requirement.

The  inspection  requirement  documents  are  shown  in  a  first  block  (sorted  by  item  number)  and  the

characteristic documents in a second block (also sorted by item number).

As such, only those documents assigned to the option "display during inspection" are shown during the

inspection process.

AIP-NES_82.docx

Version: 1.0.23049

Page 55 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab "Documents" in information on characteristics

Exiting information on characteristics

Calling the document for the selected entry in tab "Documents".

Depending on the document, the system uses a different processing

to display the document.   see below for more information.

Button to close the document window.

If  you  click  the  button  Open  document,  the  system  behavior  is  as  follows  for  the  respective  document

entry and AIP configuration:

AIP-NES_82.docx

Version: 1.0.23049

Page 56 of 99

Collection of Quality Data referring to Cavities

The internal AIP display component displays the document.

In this case, a new screen opens displaying the content of the document. This new window takes up the

entire area that the characteristic information currently takes up. So, except for this window, you can only

see the AIP header and footer.

This window is shown as illustrated below:

Figure: Document display window called in the "Documents" index tab



Note

Document type/ links

The linked program (AIP configuration) opens the document.

The display of documents in the CAQ is similar to the displays in MF (manufacturing).

The following rules apply:

o  Documents  of  type  URL  are  processed  like  order  documents  that  were  defined  with  the  http

path scheme.

AIP-NES_82.docx

Version: 1.0.23049

Page 57 of 99

Collection of Quality Data referring to Cavities

The URL itself is taken directly from the document entry.

o  For Text type document entries, the contents of the text fields 1 to 10 are written in a temporary

text file. In the process, the masking for the line break is converted back into line breaks.

This text file is then displayed "internally" (display switches between "open document" and "close

document")

o  File  type  documents  are  either  opened  directly  or  are  requested  from  the  HYDRA  server  and

then opened. The following rules apply for the different methods:

  Paths below the CAQ documents directory

If a file name does not start with a dot, a slash or a backslash and if there is no colon

in the second position (D:\) then the CAQ document path will automatically be

placed in front of the file name.

By default, this path is configured with ./caq/dokus/.

However, you can override this path at any time if you change an AIP INI option

globally or for a specific terminal.

This path can then be either an absolute or a relative path. In order to access the file,

proceed as described below.

  Relative path details

If  a  file  name  starts  with  ./  or  .\  then  the  system  assumes  that  it  is  a  HYDRA

subdirectory.

In  this  case,  the  following  part  can  only  contain  a  file  name  (./ReadMe.txt)  or  a

combination

of

subdirectories

and

the

file

name

(./cad_files/Artikel_0815.dxf).

  For  document  entries  of  this  type,  the  system  requests  the  file  from  the  server  and

loads  the  file  into  the  spool  directory.  The  file  is  then  opened  either  internally  or

externally.

AIP-NES_82.docx

Version: 1.0.23049

Page 58 of 99

Collection of Quality Data referring to Cavities

  Absolute path details

It is an absolute path:

- If a file name begins with a backslash

(\\server1\vol2\files\CAQ_2345.txt) or

- a slash (//server1/vol2/files/CAQ_2345.txt) or

- if the file name contains a colon in the second position

(M:\files\CAQ_2345.txt).

For document entries of this type, the system opens the file via direct internal or

external access.

3.8.3  Process overview - variable

The application only shows this index tab if the current characteristic is variable and at least Control chart

#1 is defined.

The "variable" process overview is set up to display

-  Control chart #1,

-

if required Control chart #2,

-

if required a Histogram

-

and the most important statistical values

If Control chart #2 is not available, then the size of Control chart #1 is increased. It fills the area intended

for both control charts.

AIP-NES_82.docx

Version: 1.0.23049

Page 59 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab "Process - variable" in the dialog "information on characteristics" (with Control chart #1)



Note

Displaying the histogram

The  application  only  shows  the  histogram  if  data  collection  is  based  on  single

values.

Exiting information on characteristics

3.8.4  Process overview - attributive

The  application  only  shows  this  index  tab  if  the  current  characteristic  is  attributive  and  at  least  Control

chart #1 is defined.

AIP-NES_82.docx

Version: 1.0.23049

Page 60 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab "Process - attributive" in the dialog "information on characteristics" (with Control chart

#1)

Exiting information on characteristics

3.8.5  Control chart #1

This index tab shows the Control chart #1 defined for the characteristic and the limit values.

AIP-NES_82.docx

Version: 1.0.23049

Page 61 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab "Control chart #1" in information on characteristics



Note

Display of Control chart #1,

If no control chart #1 is defined for the characteristic, this index tab is hidden.

Exiting information on characteristics

3.8.6  Control chart #2

What is presented here is similar to what is shown in the index tab for control chart #1. However, here the

default values and the progression of Control chart #2 are visualized.

AIP-NES_82.docx

Version: 1.0.23049

Page 62 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab "Control chart #2" in information on characteristics



Note

Display of Control chart #2,

If no control chart #2 is defined for the characteristic, this index tab is hidden.

Exiting information on characteristics

3.8.7  Histogram

This index tab is hidden if the characteristic is not a variable characteristic, or if no input type with single-

part inspection has been assigned to the characteristic.

AIP-NES_82.docx

Version: 1.0.23049

Page 63 of 99

Collection of Quality Data referring to Cavities



Note

Displaying the histogram

This index tab is hidden:

- if the characteristic is not a variable characteristic, or

- if no input type with single piece inspection was assigned to the characteristic.

Figure: Index tab "Histogram" in information on characteristics

Exiting information on characteristics

3.8.8

Failure history

This tab is only configured in the standard workflow definition of the characteristic information.

AIP-NES_82.docx

Version: 1.0.23049

Page 64 of 99

Collection of Quality Data referring to Cavities

This  index  tab  shows  all  entries  of  failure  types  assigned  to  the  current  characteristic  or  to  global

structures (inspection step / inspection requirement).

For  inspection  steps  relevant  to  inspection  points,  this  tab  shows  all  entries  of  failure  types  that  are

assigned to the current inspection point (without characteristic assignment).

3.8.8.1  General failure history

Figure: Index tab "failure history" in information on characteristics

Exiting information on characteristics

AIP-NES_82.docx

Version: 1.0.23049

Page 65 of 99

Collection of Quality Data referring to Cavities

3.8.8.2

Failure history for the visual assignment of failures (as

of CAQ 8.2)

Figure: Index tab "Failure history, visual assignment of failures" in the information on characteristics

dialog

AIP-NES_82.docx

Version: 1.0.23049

Page 66 of 99

Collection of Quality Data referring to Cavities



Note

Extended display of the failure history

The failure history shows the following additional columns if the input type "visual

defects recording [JIT/JIS]" is assigned to the selected characteristic.

-  X pos.

-  Y pos.

 see section Visual defects recording [JIT/JIS] as of MW 3.0

Exiting information on characteristics





3.8.9  History of measures

This tab is only configured in the standard workflow definition of the characteristic information.

This  tab  shows  all  measures  assigned  to  the  current  characteristic  or  global  structures  (inspection

step/inspection requirement).

This  tab  also  shows  all  measures  belonging  to  the  current  inspection  point  (without  characteristic

assignment) for inspection steps relevant to inspection points.

AIP-NES_82.docx

Version: 1.0.23049

Page 67 of 99

Collection of Quality Data referring to Cavities

Figure: Index tab “History of measures“ in the characteristics information dialog

Exiting information on characteristics

3.9  MDI drivers

You can install and manage MDI drivers via the Inst32 start menu.

3.9.1  Backup of MDI drivers

Select the following entry in the main menu:

[ E ] Tools

AIP-NES_82.docx

Version: 1.0.23049

Page 68 of 99

Collection of Quality Data referring to Cavities

Go to the first submenu and select the following entry:

[ 5 ] more Tools

In order to switch to the next submenu, as a final step select:

[ 1 ] Backup

There will first be a query asking whether you would like to run a backup.

For the backup, the server uses the file <hydradir>\ctnet\win\ctaipbackup.txt

or a terminal-specific file <hydradir>\ctnet\win\ctaipbackup2xxx.txt

(xxx is the terminal number).

First, the system attempts to load a terminal-specific file.

If no terminal-specific file exists, the system will then attempt to load the file ctaipbackup.txt.

This file contains all of the files or registry entries that need to be backed up.

Example:

\ctaip\*.INI

\ctaip\*.cfg

\ctaip\cfg\*.*

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\

The configuration files for an MDI driver are usually located in its installation directory and typically have

INI as the file extension. Refer to the driver's documentation to learn which configuration files are relevant

for which drivers. Below is an example of how to back up settings of two separately installed MDI drivers:

\mdi\Steinwald\*.INI

\mdi\Messwertdatei\*.INI

The terminal generates a Zip file and stores it in the server.

The file is located in the server under:

The backup Zip file is given the name:  ctaipbackup2xxx.zip

 ->xxx = terminal number

(terminal-

specific for Hydra user 2xxx)

This backup file is then stored in the server under

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip .

Restore MDI drivers

Select the following entry in the main menu:

[ E ] Tools

AIP-NES_82.docx

Version: 1.0.23049

Page 69 of 99

Collection of Quality Data referring to Cavities

Go to the first submenu and select the following entry:

[ 5 ] more Tools

In order to switch to the next submenu, as a final step select:

[ 2 ] Restore

There will first be a query asking whether you would like to run a restore.

"Restore" tries to load a backup file located in the server and then automatically restores all the backed

up files and any backed up registry entries.

A backup file is stored on the server in the directory:

For a single system installation:

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip

For a multi-system installation:

<hydradir>\<system>\custom\backup\ctaip\ctaipbackup2xxx.zip

as already described under backup.

Installing 3rd party MDI drivers

Select the following entry in the main menu:

[ E ] Tools

Go to the first submenu and select the following entry:

In order to switch to the next submenu, as a final step select:

[ 5 ] more Tools

[ 3 ] Installation 3rd Party

There will first be a query asking whether you would like to perform a 3rd party installation.

AIP-NES_82.docx

Version: 1.0.23049

Page 70 of 99

Collection of Quality Data referring to Cavities

After confirming the query by clicking on OK, the following list will appear showing the directories found in

<hydradir>\ctnet\win\install.

Installation button:

Click  the  Installation  button  to  display  a  list  indicating  all  of  the  directories  starting  with  directory

<hydradir>\ctnet\win\install.

The directories found  will be offered for selection in a dialog. Once  you have confirmed a directory, the

system downloads this directory and shows its contents.

AIP-NES_82.docx

Version: 1.0.23049

Page 71 of 99

Collection of Quality Data referring to Cavities

Check  whether  the  directory  of  the  MDI  driver  you  would  like  to  install  is  included  in  a  directory.  If  not,

load the MDI installation in the appropriate subdirectory of <hydradir>\ctnet\win\install.

Exit button:

Click Exit to cancel the process and return to the main menu.

Therefore, you can add further directories to the directory <hydradir>\ctnet\win\install.

Content of a previously selected directory

Button "Copy File" / "Copy all Files"

After clicking on one of the two buttons "Copy File" or "Copy all Files", a selection window will appear to

select a directory into which you can now copy the selected file or all files being displayed. Select the file

first, if you would like to copy a single file from the list.

Selection window to select a directory

Return button:

Press the Return key to return to the selection of directories

AIP-NES_82.docx

Version: 1.0.23049

Page 72 of 99

Collection of Quality Data referring to Cavities

Execute button:

Click

this

button

to

start

the

installation

process

of

the  MDI

driver.

The execution program defined in Windows is used to display or execute the selected file.

Example: Installing the Steinwald MDI driver

Activity in preparation (once)

Copy

the  Steinwald

installation

files

into  a  server  sub-directory

(e.g.

"mdi_steinwald")

<hydradir>\ctnet\win\install.

Installation on the terminal (must be installed for each terminal)

0.  Start the start menu Inst32

1.

In the main menu, select [ E ] Tools

2.

In the first submenu, select [ 5 ] more Tools

AIP-NES_82.docx

Version: 1.0.23049

Page 73 of 99

Collection of Quality Data referring to Cavities

3.

In the next submenu, select [ 3 ] Installation 3rd Party

4.  Confirm the security prompt that appears next with OK

 You will see a list with the sub-directories located in the <hydradir>\ctnet\win\install directory on

the server.

5.  Now, select the "mdi_steinwald" folder and click the  Installation button to continue the process

(optionally, you can click the Exit button to return to the previous submenu).

 You will see an overview showing all of the files found in the "mdi_steinwald" folder.

6.

In a next step, store all of the files from the "mdi_steinwald" folder locally by clicking on the Copy

all Files button.

7.  Now, select the desired target location where you would like to copy the files.

8.  To  start  copying  the  files,  press  the  Select  Directory  button  (optionally,  you  can  click  on  the

Return  button  to  return  to  the  previous  dialog  without  copying  the  files).  When  copying  is

completed, the dialog closes.

9.  Select the setup program in the overview to install the driver and confirm by clicking the Execute

button.

10.  Execute the installation process of the Steinwald MDI driver.

3.10  Document management (as of CAQ 8.2)

The terminal shows the following message if document management is started and inspection

results recording has not yet been saved.

AIP-NES_82.docx

Version: 1.0.23049

Page 74 of 99

Collection of Quality Data referring to Cavities

For further information on the document management, refer to the respective manual.

3.10.1  Configuration / inspection point

You can manage documents

-

in relation to an inspection point.



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout definitions for buttons of the CAQ inspection list

[CAQ_DC_T-PPKT-Page3]
1=$DOC-LINK$DOCLINK.InspectionPoint,L,Dokumente Pruefpunkt

For  space  reasons,  we  recommend  to  place  the  buttons  for  the  document
management on a new, empty page (here page 3).

Figure: Layout for buttons added to the inspection list/document management in relation to an inspection

point

AIP-NES_82.docx

Version: 1.0.23049

Page 75 of 99

Collection of Quality Data referring to Cavities

3.10.2  Configuration / attributive data collection

As part of the attributive data collection, you can manage documents for the

-

-

-

inspection step characteristic

inspection point characteristic

inspection result



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout definitions for buttons of the CAQ inspection list

[CAQ_DC_T-STICHPR-Page3]
1=$DOC-LINK$DOCLINK.InspectionCharacteristic,L,Dok. Merk.-Pruefschritt
2=$DOC-LINK$DOCLINK.InspectionPointCharacteristic,L,Dok. Merk.-Pruefpunkt
3=$DOC-LINK$DOCLINK.QMSingleValue,L,Dok. Pruefergebnis

For  space  reasons,  we  recommend  to  place  the  buttons  for  the  document
management on a new, empty page (here page 3).

Figure: Layout for buttons added to the inspection list/document management in relation to an attributive

characteristic

3.10.3  Configuration / variable data collection

In relation to a variable characteristic you can manage documents for the

-

-

inspection step characteristic

inspection point characteristic

In relation to inspection results recording you can manage documents for

-

the inspection result (measured values, attributive assessments, inspection chart)

AIP-NES_82.docx

Version: 1.0.23049

Page 76 of 99

Collection of Quality Data referring to Cavities



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

  Layout definitions for buttons of the CAQ inspection list

[CAQ_DC_T-ESTCK-Page3]
1=$DOC-LINK$DOCLINK.InspectionCharacteristic,L,Dok. Merk.-Pruefschritt
2=$DOC-LINK$DOCLINK.InspectionPointCharacteristic,L,Dok. Merk.-Pruefpunkt
3=$DOC-LINK$DOCLINK.QMSingleValue,L,Dok. Pruefergebnis

For  space  reasons,  we  recommend  to  place  the  buttons  for  the  document
management on a new, empty page (here page 3).

Figure: Layout for buttons added to the inspection list/document management in relation to a variable

characteristic

Figure: Layout for buttons added to the inspection list/document management in relation to inspection

results recording for variable characteristics

3.11  Transferring measured values for all characteristics  (as of

CAQ 8.2)

Transferring  measured  values  irrespective  of  the  characteristic  is  only  available  for  variable

characteristics in relation to an inspection point.

These  characteristics  must  not  be  in  the  status  "skip  lot".  The  characteristics  must  have  the

status "can be checked", "checked" or "result".

MDI processing does not integrate characteristics with a calculation formula.

This function transfers measured values for all characteristics.

In  contrast  to  the  (individual)  collection  of  inspection  results  on  the  terminal,  this  function  enables

processing of

-

-

-

a multitude of measured values relating to an inspection point

for several characteristics

triggered by a single user action

AIP-NES_82.docx

Version: 1.0.23049

Page 77 of 99

Collection of Quality Data referring to Cavities

Organizational requirements

The user must ensure that the number of measured values available for the data transfer does

not exceed the sample size of the characteristic.

Performance

This function does not reduce the time that is required to save measured values. This function

"only" automates the processing/save processes.

Consequently,  the  time  required  for  processing/saving  depends  on  the  number  of  measured

values.

3.11.1  Configuration in HYDRA

In relation to an inspection point, you can transfer measured values for all characteristics.



Configuration

Terminal configuration file caq_dc_t.ini / caq_dc_t.*

Please add/change the following in the terminal configuration file caq_dc_t.ini

/ caq_dc_t.* in order to transfer measured values for all characteristics:

  Layout definitions for buttons of the CAQ inspection list

[CAQ_DC_T-PPKT-Page2]
1=DQC_TRANSFER_DATA,L, accept measurement data
2=DQC_RELOAD,R, update display

  The  modifications  become  effective,  once  you  have  restarted  the

terminal.

Figure: Layout for buttons added to the inspection list/transferring measured values for all characteristics in relation to

an inspection point

AIP-NES_82.docx

Version: 1.0.23049

Page 78 of 99

Collection of Quality Data referring to Cavities

3.11.2  Function description / operating instructions

If  you  click  the  button  "Accept  measurement  data",  you  start  the  transfer  of  measured  values  for  all

characteristics in the inspection list.

Then the HYDRA server immediately processes the data.

Data is always transferred in relation to the inspection point currently selected in the inspection list.



Note

Behavior in offline status

Processing  does  not  take  place  in  the  offline  status,  as  an  online  connection  is

required between the terminal and the HYDRA server.

The  terminal  is  still  available  to  the  user,  while  the  HYDRA  server  is  processing  the  measured  values.

You can continue collecting (individual) inspection results, if necessary.



Note

Updating of data

You can only manually update inspection results on the terminal.

No message appears when the server finishes processing.

AIP-NES_82.docx

Version: 1.0.23049

Page 79 of 99

Collection of Quality Data referring to Cavities



Note

The

following  scenarios  are  possible  because

the  processing

is

independent of other inspection activities:

Scenario 1:

  The terminal user triggers the transfer of measured value for all

characteristics on the AIP and continues with another task. But

measurement recording still remains open.

  The HYDRA server processes the measured values. But the program

does not update the displayed data.

  After the lunch break, the user then sees an outstanding inspection point

on the terminal and wants to enter results.

After transferring measured values for all characteristics, the terminal

does not automatically display the recorded values. The user must

update the display manually. If no update is performed, a message

informs that the value is already available.

  Solution: Click the button Update display

Scenario 2:

  The  user  triggers  the  measured  value  transfer  for  all  characteristics  on

the AIP and manually enters further inspection data.

  The inspection will be completed and/or is supposed to be completed.

  However,  it  is  possible  that  not  all  measured  values  have  been

processed  entirely  when

the

inspection  point

is  completed.  The

inspection point cannot be completed if the minimum sample size, e.g. for

mandatory inspections, has not been reached.

Before  measured  values

for  all  characteristics  are  accepted,

the  system  checks

if:

the inspector has been identified when starting the CAQ inspection results recording. And if a staff badge

number has been defined for CAQ inspection results recording.

If this is not the case, the application shows the dialog for the inspector identification.

AIP-NES_82.docx

Version: 1.0.23049

Page 80 of 99

Collection of Quality Data referring to Cavities

Figure: Dialog to enter the staff badge number

Click "OK" to accept the measured values for all characteristics.

Click the button "cancel" to exit the dialog without processing the data.



Note

Technical requirements

Ensure

the

following

to  establish  communication  with  all  MDI  drivers:

-  the  HYDRA  server  must  be  able  to  communicate  via  TCP/IP  and  the

corresponding  communication  port  with  the  computer  where  the  MDI  driver  is

running.



Note

Logging

In case of errors/issues, the HYDRA server generates log files in the log directory

(<system>\prot).

File

names

of

log

files

have

the

following

structure:

hy_cmdilrv_AUFTRAG_CAPTURE_*.csv. Store log files in the CSV format and

view the files e.g. with Excel.

AIP-NES_82.docx

Version: 1.0.23049

Page 81 of 99

Collection of Quality Data referring to Cavities



Note

Processing of measured values by MDI driver

The  system  only  processes  confirmed  MDI  measured  values  (CONFIRMED=1).

The  system  always  deletes  unconfirmed  MDI  measured  values  (CONFIRMED=0)

from the MDI buffer without posting the data in HYDRA.

The system checks if the MDI measured values respect the validation limits of the

characteristic.  If  a  measured  value  violates  these  limits,  the  measured  value  is

deleted  (if  MDI  is  configured  accordingly).  If  you  do  not  want  to  delete  the  MDI

measured value, processing of the current characteristic is stopped.

The system stores the following MDI parameters (if available):

SERIAL

Unique identifier of the MDI measured value

MVALUE

Actual measured value

This is a mandatory parameter.

MDATE

Date of data collection

MTIME

Time of data collection

MFROM

Inspector name (instead of badge number)

MTEXT

Comment

NEST

Cavity

number

The  application  only  saves  this  parameter,  if  you  want  to

record  the  characteristic  relating  to  cavities  on  the  "sample"

level.  In  this  case,  the  cavity  number  is  a  mandatory

parameter.

The following AIP data is also stored:

  The inspector's badge number

  Machine/workplace number

AIP-NES_82.docx

Version: 1.0.23049

Page 82 of 99

Collection of Quality Data referring to Cavities



Note

Requesting measured values from MDI driver

The system requests the measured values from the MDI drivers. The system only

returns and processes the measured values matching the following filter criteria.

ANR

AGNR

ATK

CNR

MNR

Order number of the inspection requirement

Operation number of the inspection step (primary) or

the inspection requirement (secondary).

Article number of the inspection requirement

ERP batch of the inspection requirement

Workplace  where

inspections

are

currently

performed.

PPKT:TLOS

Partial batch of the inspection point.

PPKT:CNR

ERP batch of the inspection point.

PPKT:EQUIP

Tool of the inspection point

(MOC inspection point list: field 1)

PPKT:PROBE

Sample of the inspection point

(MOC inspection point list: field 3)

PPKT:USERC1

User field C1 of the inspection point

(MOC inspection point list: field 4)

PPKT:USERC2

User field C2 of the inspection point

(MOC inspection point list: field 5)

PPKT:USERN1

User field N1 of the inspection point

(MOC inspection point list: field 6)

PPKT:USERN2

User field N2 of the inspection point

(MOC inspection point list: field 7)

3.12  Saving  measured  values  using  the  ENTER  key  (as  of  CAQ

8.2)

In some dialogs you can confirm inspection results directly by pressing the ENTER key of the (hardware)

keyboard.

AIP-NES_82.docx

Version: 1.0.23049

Page 83 of 99

Collection of Quality Data referring to Cavities

But you can also click the "Done" button.

3.12.1  Configuration in HYDRA





Configuration

Terminal configuration file hytnrcfg.ini

Change  the  terminal  configuration  file  hytnrcfg.ini  as  described  below  in

order  to  use  the  Enter  key  to  confirm  the  data  input  (simulating  the  "done"

button):

Insert the following rows

[DYNAMIC-DIALOG->Options 0]

USE_ENTER_BUTTON=1

Default  0

  Restart the respective terminals to enable the modification.

The following list provides an overview of the dynamic dialogs where you can use the ENTER key:

-  QEE_MW_ME_ES_PP_SI

-  QEE_MM_BE_ST_PP_SI

-  QEE_MM_BE_ST_PP_FS

-  QEE_INSPPOINT

-  QEE_INSPPOINT_DETAIL

-  QEE_MM_PR_PP_SI

-  QEE_MASS_CLASSIC

-  QEE_ERR_CLASSIC

-  Q_P_AN

3.12.2  Function description / operating instructions

Pressing the ENTER key triggers the "Done" button.

AIP-NES_82.docx

Version: 1.0.23049

Page 84 of 99

Collection of Quality Data referring to Cavities



Note

The following applies ...

The ENTER key is triggered irrespective of

-

-

the currently focused field of the data input panel

the currently focused area of the GUI (left:

           inspection list, right: data input panel).



Note

Exceptions

The ENTER key is not triggered if the focus is on

-

-

-

one of the buttons of the inspection list

another button of the data input area

one of the selection list buttons of the data input area

           has the focus

3.13  Integration of CAQ-MPL/TRT (as of CAQ 8.2)



Note



Note

Transferring batch information to the inspection point

When an inspection point is generated, the system enters MPL batch information

in the "ERP batch" field of the inspection point (PPKT:CNR, 50 characters).

Properties of MPL batch fields

In general, you can enter up to 40 characters in the MPL batch fields Alternative

batch number 5 to 20.

But the AIP can only display up to 20 characters. You must therefore make sure

that the used MPL batch fields alternative batch number 5 to 20 only include 20

characters.

AIP-NES_82.docx

Version: 1.0.23049

Page 85 of 99

Collection of Quality Data referring to Cavities



Note

Further restrictions of the CAQ-MPL integration

It is possible that the system assigns the "wrong batch" or that the system cannot

uniquely identify the machine if you have manually generated an inspection point.

3.14  Preceding list of inspection points (as of CAQ 8.2)

mpdv-aip.zip

aip-qm.dlg

>=2015-06-22

>=2015-06-22

This function is available as of CAQ 8.2 but not enabled by default.

The following configuration description explains how to enable the function.

If customizations are in use, this function can be restricted and/or disabled.

Figure: Preceding inspection point list

Go to the inspection list in order to generate inspection points manually. Once generated, exit

the inspection list, select the new inspection point and reopen the inspection list.

3.14.1  Configuration

AIP-NES_82.docx

Version: 1.0.23049

Page 86 of 99

Collection of Quality Data referring to Cavities

Once you have enabled the preceding inspection point list, the "update" button of the inspection

list does no longer work. Close and reopen the inspection list in order to update its data.

You  can  enable  the  preceding  inspection  point  list  for  specific  terminals  only  if  you  define

terminal-specific configurations (CAQ --> Option 99 for terminal 99).

AIP-NES_82.docx

Version: 1.0.23049

Page 87 of 99

Collection of Quality Data referring to Cavities



Configuration

Terminal configuration file hytnrcfg.ini

In  order  to  use  the  "preceding  inspection  point  list"  on  the  terminal,  make  the

following changes to the terminal configuration file hytnrcfg.ini.

Insert the following rows

[CAQ->Optionen 0]

LOAD_MEASUREMENTS_ON_DEMAND=ON

INTERPOSE_FUNCTION=QEE_FILTER_INSPPOINT

RECALL_ON_EXIT_INSP_LIST=ON

REQUEST_RELOAD_ON_EXIT_INSP_LIST=MNR,ANR

  Restart the respective terminals to enable the modification.

Note:

You must set the option "LOAD_MEASUREMENTS_ON_DEMAND” to "ON" if you

use the preceding inspection point list.

If the option "INTERPOSE_FUNCTION” does not include a parameter or if the

entry does not exist, the inspection point list cannot be reopened automatically

after you exited the inspection. Enter the dialog that is called as parameter.

If  the  option  “RECALL_ON_EXIT_INSP_LIST”  is  set  to  "OFF"  or  if  the  entry

does  not  exist,  the  inspection  point  list  cannot  be  reopened  automatically  after

you exited the inspection.

If  you  configured  the  option  "REQUEST_RELOAD_ON_EXIT_INSP_LIST="  with

"MNR,ANR", the application  updates  the order  and machine list, once  you have

exited the preceding inspection point list. This also updates the inspection status.

If you only configure the parameter "ANR", the application only updates the order

list.  If  this  option  does  not  exist,  the  order  and  machine  list  will  not  be  updated

when  you  exit  the  preceding  inspection  point  list.  Configure  the  order  and

machine  list  display  if  you  want  to  display  the  order  and  machine  list  instead  of

tiles.

AIP-NES_82.docx

Version: 1.0.23049

Page 88 of 99

Collection of Quality Data referring to Cavities



Configuration

Terminal configuration file hytnrcfg.ini

If you exit the inspection list and directly go to the machine and order list, these

lists  and  the  inspection  status  are  not  updated.  Make  the  following  entry  to

configure this behavior:

[DLL_DLG 0]

DISABLE=MNR,ANR,PNR,MSTAT,BPOS,AGRD,RES,LOKVLIST,ZLO,HZTYP,LI

CENSE,AART,PATHS,MAT,LPKZ,TPE,SKAL,QRD,PAUMNR,PPKTMNR

This entry ensures that the lists are not updated during the inspection. When the

inspection list is closed, the specified lists are updated.

Important:

The  configured  lists  are  not  updated  until  the  inspection  list  is  closed  –

whatever the consequences. For example, if the shift list is not loaded for

a  very  long  time,  at  some point  in  time  the  MDE  processing  runs  out  of

shifts. In this case, the system cannot post a shift change that is due.

3.15  General notes

This  section  provides  general  information  on  the  functionalities  provided  by  the  CAQ  recording  of

inspection data recording with the AIP.

3.15.1  Field length in dynamic dialogs

Note the following if you use dynamic dialogs:



Note

Data origin: interfaces or MOC

In  general,  dynamic  dialog  data  deriving  from  interfaces  or  the  MOC  can  be

displayed in an abbreviated form.

Subject  to  the  origin  of  data,  texts  in  dynamic  dialogs  can  be  displayed  in  an  abbreviated  form.

Note:  After  saving,  these  shortened  contents  are  integrated  irrevocably  in  the  system.  The

shortening and saving also applies for fields that cannot be edited, i.e. their content is only displayed.

AIP-NES_82.docx

Version: 1.0.23049

Page 89 of 99

Collection of Quality Data referring to Cavities



Note

Configuration options

If the text of fields (displayed or entered) must be abbreviated, you can still adjust

the size of the single fields via configuration.

You can even move a field to another line to take up the full length of the dynamic

dialog.

This applies for fields that are saved or only displayed.

Please note that input fields, which are hidden or removed, are ALSO saved

  Please contact your MPDV CAQ consultant.



Note

Effects of configuration: field size

Changes  to  the  field  size  can  have  considerable  effects  on  the  layout  of  a

dynamic dialog.



Configuration

Configuration options

If you change field sizes, you can adjust the aspect ratio between the “inspection

list”  and  the  “input  panel”  to  harmonize  the  appearance  of  the  user  interface

“inspection results recording”.

Please contact your MPDV CAQ consultant.

List of (text) fields that are automatically saved by default:

Designation

Dynamic dialog

Field/ID

Field

Field  length:

(name)

length:

Dynamic

HYDRA

dialog

DB

Inspection point

QEE_INSPPOINT

CPANUMP.PPKT:USERC1

50

15

/  dynamic

label

from

PAU.PPKT:USERC1LAB

CPANUMP.PPKT:USERC2

50

15

AIP-NES_82.docx

Version: 1.0.23049

Page 90 of 99

Collection of Quality Data referring to Cavities

/  dynamic

label

from

PAU.PPKT:USERC2LAB

CPANUMP.PPKT:EQUIP

20

15

/  dynamic

label

from

PAU.PPKT:EQUIPLAB

CPANUMP.PPKT:TPLATZ

20

15

/  dynamic

label

from

PAU.PPKT:TPLATZLAB

CPANUMP.PPKT:PROBE

20

15

/  dynamic

label

from

PAU.PPKT:PROBELAB

Inspection

point

QEE_INSPPOINT_DETAIL  CPANUMP.PPKT:TLOS  /

50

details

Partial batch

CPANUMP.PPKT:CNR  /

50

ERP batch

CPANUMP.ENT:GRUPPE

10

/ Group

CPANUMP.ENT:CODE  /

10

Code

Attributive

data

QEE_MM_BE_ST_PP_SI

CPAUMW.BEM

collection

QEE_MM_BE_ST_SI

Comment

Variable collection

QEE_MW_ME_ES_PP_SI

CPAUMW.BEM

QEE_MW_ME_ES_ST_SI

Comment

/

/

250

250

CPAUMW.NEST / Cavity

50

15

15

11

5

26

29

10

26

Inspection chart

QEE_MM_BE_ST_PP_FS

CPAUMW.BEM

QEE_MM_BE_ST_FS

Comment

Failure data

QEE_ERR_CLASSIC

CPAUERR.ERRNR

Number

/

/

250

50

15

AIP-NES_82.docx

Version: 1.0.23049

Page 91 of 99

Collection of Quality Data referring to Cavities

Measures

QEE_MASS_CLASSIC

CMASSN.MASNR

Number

CMASSN.MASTEXT

Measure

CMASSN.BEM

Comment

/

/

/

50

250

250

Sampling

QEE_MM_PR_PP_SI

PRBGRP / Sampling

50

15

30

30

26

3.15.2  Processing and display of automatic failures

You can enable/disable the processing and display of automatic failures on the AIP.

 See Option 1214 in the document Configuration_QM_Options.docx

3.16  Asynchronous collection of measured values and failures

(as of CAQ 8.1 and CAQ 8.2)

mpdv-aip.zip

caq_async.ini

>=2015-11-03

>=2015-11-03

Use  the  following  settings  to  have  the  terminal  input  processed  asynchronously  by  the  server.

Immediately  after  the  processing  request,  the  server  sends  an  "OK"  status  and  only  then  starts

processing the data. Therefore, the user can go on and record further data, while the system is saving the

previously collected data.

Error processing

If data is collected  asynchronously, the user is  not  directly  informed about errors. Only on the

MOC, you can view error messages sent by the server: go to System administration --> Logging

--> Dialog error logs.

3.16.1  Configuration

Configure the asynchronous processing in the separate INI file "caq_async.ini" in the directory \functions.

AIP-NES_82.docx

Version: 1.0.23049

Page 92 of 99

Collection of Quality Data referring to Cavities

The following configuration settings are supported:

-  Asynchronous processing of all dialogs and actions released by MPDV:

To do so, set the option "ENABLE_ASYNC“ = "ON“ in the section "[SYSTEM]“.

-

If the global option "ENABLE_ASYNC" is set, you can still disable the asynchronous processing

for each dialog and action. To do so, create a section with the dialog name. Set the option to "=

OFF"  for  all  dialog  actions  you  do  not  want  to  process  asynchronously.  The  below  example

disables the action "CPAUMW.INSERT" in the dialog "QEE_MW_ME_ES_PP_SI“:

[System]

ENABLE_ASYNC=ON

[QEE_MW_ME_ES_PP_SI]

CPAUMW.INSERT=OFF

Note

MPDV  has  defined  the  dialogs  and  actions  that  are  allowed  to  be  processed  asynchronously

(see section Supported dialogs and actions).

3.16.2  Supported dialogs and actions

Currently, you can enable/disable the asynchronous processing for the following dialogs and actions:

Dialog

Action

QEE_MASS_CLASSIC

CMASSN.INSERT

QEE_ERR_CLASSIC

CPAUERR.INSERT

QEE_MM_BE_ST_PP_RA

CPAUERR.INSERT

QEE_MM_BE_ST_FS

CPAUERR.INSERT

QEE_MM_BE_ST_FS

CPAUERR.DELETE

QEE_MM_BE_ST_PP_FS

CPAUERR.INSERT

AIP-NES_82.docx

Version: 1.0.23049

Page 93 of 99

Collection of Quality Data referring to Cavities

QEE_MM_BE_ST_PP_FS

CPAUERR.DELETE

QEE_MM_BE_ST_PP_SI

CPAUMW.INSERT

QEE_MM_BE_ST_SI

CPAUMW.INSERT

QEE_MM_BE_ST_SI

CPAUMW.UPDATE

QEE_MM_CO_ST_PP_SI

CPAUMW.INSERT

QEE_MW_ME_ES_PP_SI

CPAUMW.INSERT

QEE_MW_ME_ES_ST_SI

CPAUMW.INSERT

QEE_MW_ME_ES_ST_SI

CPAUMW.UPDATE

QEE_MM_BE_ST_PP_SI

CPAUMW.UPDATE

QEE_MM_CO_ST_PP_SI

CPAUMW.MODIFY

QEE_MW_ME_ES_PP_SI

CPAUMW.UPDATE

QEE_INSPPOINT

CPANUMP.ABSCHLIESSEN

QEE_INSPPOINT

CPANUMP.UPDATE

QEE_INSPPOINT_DETAIL

CPANUMP.ABSCHLIESSEN

QEE_INSPPOINT_DETAIL

CPANUMP.UPDATE

3.17  Calculated characteristic including calculation of

eigenvalue (as of CAQ 8.2)

mpdv-aip.zip

mpdv-aip.zip

aip_qm.dlg

>=2015-11-05

>=2015-11-05

>=2015-11-05

This  function  is  compatible  with  the  option  "save  measured  value  with  the  ENTER  key"  and  the

"asynchronous processing" of inspection data.

AIP-NES_82.docx

Version: 1.0.23049

Page 94 of 99

Collection of Quality Data referring to Cavities

You can use the following input types / workflows:



Input type:  MESSW_ESTCK_PPUNKT_CALC (characteristic node)

Workflows: WF: MM_ME_ES_PP_CA / DYN DLG AIP: QEE_MM_ME_ES_PP_CA



Input type MESSW_ESTCK_STICHPR_CALC (characteristic node)

Workflows: MM_ME_ES_SI_CA / DYN DLG AIP: QEE_MM_ME_ES_SI_CA



Input type MESSW_ESTCK_PPUNKT_CALC (characteristic node)

Workflows: MW_ME_ES_PP_CA / DYN DLG AIP: QEE_MW_ME_ES_PP_CA

Workflows: MW_ME_ES_PP_CA / DYN DLG AIP: QEE_ERR_CLASSIC

Workflows: MW_ME_ES_PP_CA / DYN DLG AIP: QEE_MASS_CLASSIC



Input type MESSW_ESTCK_STICHPR_CALC (characteristic node)

Workflows: MW_ME_ES_SI_CA / DYN DLG AIP: QEE_MW_ME_ES_SI_CA

Workflows: MW_ME_ES_SI_CA / DYN DLG AIP: QEE_ERR_CLASSIC

Workflows: MW_ME_ES_SI_CA / DYN DLG AIP: QEE_MASS_CLASSIC

Use  these  input  types  to  enable  the  recording  of  calculated  characteristics  including  calculation  of

eigenvalue.

AIP-NES_82.docx

Version: 1.0.23049

Page 95 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Calculated characteristics including calculation of eigenvalue" with reference to the

inspection point.

AIP-NES_82.docx

Version: 1.0.23049

Page 96 of 99

Collection of Quality Data referring to Cavities

Figure: Input function "Calculated characteristics including calculation of eigenvalue" for a single value

with reference to the inspection point.

The  functions  of  the  sample-related  input  type  are  identical  to  the  functions  of  the  input  type

relating to inspection points.

But  here,  the  sample-related  data  collection  is  performed  for  the  respective  (machine-related)

sample.

Functions / special features:

Field description

-  The field Gage shows the test equipment used for the characteristic.

AIP-NES_82.docx

Version: 1.0.23049

Page 97 of 99

Collection of Quality Data referring to Cavities

-  The  field  Connection

indicates

the  current  (connection)  status  of  the

test  equipment.

-  The fields Argument 1 to 4 are dynamically displayed or hidden. The fields are displayed, if they

are included in the calculation formula of the characteristic. The fields are hidden if they are not

included. By default, the field is empty. You can enter values that equal 0.

The field does not show the unit of the characteristic.

The standard MDI function is available for these fields.

-  The field Result shows the calculated value.

-  The  Indicator  of  measured  values  is  linked  to  the  field  Result  and  always  responds  if  the  field

Result includes a value. The field is read-only.

-

Initially, the first visible "argument field" has the focus.

Start the calculation (button

)

-

If the dialog shows an argument field, then it is a mandatory field.

-  Depending on the configuration, the field "inspector" is a mandatory field.

-  You can calculate the result by clicking the "calculate" button. Then the field "result" shows the

value. But the value is not yet saved.

Saving inspection results:

-

If the dialog shows an argument field, then it is a mandatory field.

-  Depending on the configuration, the field "inspector" is a mandatory field.

-  You can save the collected data by clicking the button "Done".

-  You can save the collected data by clicking the button "Next".

If required, you can change the dialog to include up to 10 argument fields.  You can also add a

comment field by changing the dialog configuration.

If the MDI connection is active, the system requests all MDI driver values of the corresponding

channel without setting filter criteria.

AIP-NES_82.docx

Version: 1.0.23049

Page 98 of 99

Collection of Quality Data referring to Cavities

In contrast to other characteristics, the system enters the MDI measured value directly into the field that

has  the  focus.  The  focus  switches  to  the  next  argument  field,  if  the  MDI  measured  value  is

confirmed(CONFIRMED=1). If you are in the last argument field, the focus remains in this last field. The

following options are available:

o  Press the ENTER key

o  Click the button "Done"

o  Click the button

3.18  Check if complaints exist when operations are logged on

(as of SP13)

When you log on operations on the AIP, the system can check if complaints are available for the article to

be  produced  that  is  specified  in  the  order  header.  To  activate  this  function,  manually  create  the  CAQ

option  1219.  The  option  1219  defines  the  complaint  types,  complaint  results  and  complaint  statuses,

which are checked. In the option, you also define the period of time that is checked. For details, refer to

the procedure document of the option documentation "Configuration_QM_Options".

When creating the  option  1219  with the  value "Y", the system uses the configuration parameters in the

"Addition" field during OP logon to check if complaints exist for the article or article + article index of the

production order (order header). If complaints are found, then they are displayed in a message.

AIP-NES_82.docx

Version: 1.0.23049

Page 99 of 99

