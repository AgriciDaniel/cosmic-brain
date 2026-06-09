Configuration of Activity Recording

1  Configuration of Activity Recording

Usage

The BDE allows for further activities (e.g. meter readings, energy consumption,  etc.) to  be recorded for

the operation in addition to the special activities, such as durations and quantities.

The sections that follow describe how to configure the input of activities.

Configuration of the MOC activity code

Define an activity code and assign it the activities to be recorded as well as their input type.

Transfer of activity codes to the operation

There are generally two options to transfer the activity code to an operation:

  The activity code is transferred directly by the interface

In general, the activity code can be provided directly along with other operation data from third-

party systems. The prerequisites are:

o  The external system can manage or generate this information at the interface.

o  The used interface and its structure for operation data provide the option to  transfer the

activity code. If this is not the case, it has to be checked whether or not it is possible to

modify the interface according to the customer's/project's requirements.

  Transfer of the activity code from a template (customizing templates)

Provided that the activity code cannot be transferred from the third-party system and the interface

cannot  be  modified,  it  is  possible  to  transfer  the  activity  code  from  the  MES  Templates  to  the

operation data provided by the external system.

  Transfer of activity codes when generating orders from work plans

If orders/operations are generated directly from MES work plans, the activity code is defined for

the work plan and transferred to the operations.



Input of activity codes when creating orders

The activity code is entered manually for the operation if orders/operations are created directly in

MES.

Configuration_ActivityRecording.docx

Version: 1.1.18468

Page 1 of 2

Configuration of Activity Recording

Modification of dynamic dialogs for data collection at the terminal

Specify the input dialogs that are to be enhanced by the activities

Create a field for each activity to be recorded in these dialogs. Please note the following:

  Use  the  provided  field  types  if  possible.  Create  separate  field  type  definitions  if  this  is  not

possible.

  These acronyms may be used:

o  EGR:LST01... EGR:LST10, to be used for activities

o  RGR:LST01... RGR:LST10, to be used for remaining activities



"SETVALUE" has to be entered as function if the values that have already been recorded are not

to be assigned by default in the terminal dialog.

Configuration_ActivityRecording.docx

Version: 1.1.18468

Page 2 of 2

