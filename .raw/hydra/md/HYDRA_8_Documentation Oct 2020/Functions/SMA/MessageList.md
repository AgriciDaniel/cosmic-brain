Messages Listing

1  Messages Listing

1.1  General

The  application  provides  an  overview  of  the  maintenance  OPs  and/or  upcoming  and  thus  active

maintenance activities existing in the system. Consequently, the user is always aware of all maintenance

activities.

Selection criteria

The following selection criteria are available in the application:

Resource

Selects the specified resource.

Resource type

Selects the specified resource type.

Classification

Selects the classification of maintenances

Field descriptions - list

Resource

Resource number.

Resource designation

Name of resource

Resource type

Type of resource

Field descriptions - detail

"General" section

Order

This field is only relevant in connection with the additional feature "generate maintenance orders" or

the "generation of calibration (inspection) orders. If this field is filled out the included order number

refers  to  a  maintenance/calibration  order.  The  activity  will  automatically  be  reset  if  the

maintenance/calibration  order  is  finished.  As  the  maintenance/calibration  order  is  finished  for  this

activity, the order number is also removed from this input field.

Resource

Shows the combined order and operation number.

MessageList.docx

Version: 1.0.1362

Page 1 of 4

Messages Listing

Resource designation

Current status text of the operation.

Activity

Designation of the activity.

"Information" section

Information

To  ensure  that  the  user  or  the  maintenance  worker  receives  more  detailed  information  about

running  the  activity  (e.g.  notes  on  regulations  to  be  observed,  materials  to  be  used),  a  short

description can be stored for each maintenance activity.

"Assignment" section

Project number

This  field  is  only  relevant  to  the  activity  type  "K"  (calibration),  whereas  there  are  two  different

variants subject to system configuration.

Variant 1 (there is exactly one work plan for all calibration inspection plans):

=> Input of the calibration inspection plan number (without taking the version number into

account)

 Variant 2 (there is a separate work plan for each calibration inspection plan)

=> should remain empty.

.

Planned order

Control field that is currently not used. Consequently it remains empty.

Cost object

Control field that is currently not used. Consequently it remains empty.

Activity type

Identifies the activity type, calibrations, for example, are identified by the type K.

"Resource information" section

Inventory number

Displays  the  inventory  number  defined  in  the  resource  configuration.  Additional  information

including comments.

Engraving number

Shows the engraving number defined in the resource configuration. Additional information including

comments.

MessageList.docx

Version: 1.0.1362

Page 2 of 4

Messages Listing

Drawing number

Shows  the  drawing  number  defined  in  the  resource  configuration.  Additional  information  including

comments.

Manufacturer

Shows  the  manufacturer  defined  in  the  resource  configuration.  Additional  information  including

comments.

Owner

Shows  the  owner  name  defined  in  the  resource  configuration.  Additional  information  including

comments.

"Interval based on time" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The period of time, after which the maintenance activity is to be run, should be entered here.

Next activity

Point in time when the next activity becomes due.

"Interval based on operating hours" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The  period  of  time  (number  of  operating  hours)  after  which  the  maintenance  activity  is  to  be  run,

should be entered here.

Hours recorded so far

The time previously posted in HYDRA for this resource is shown here. This value is updated by a

cyclical process. It is to be observed here that, for the previously recorded hours, only those RPA

times are used, which have been marked as such in the resource type (option:  RPAs as hours of

operation in the Maintenance Calendar).

Next activity

Number of hours of operation after which the next activity becomes due.

MessageList.docx

Version: 1.0.1362

Page 3 of 4

Messages Listing

"Interval based on cycles" section

Interval type

Interval type for the activity. (Z = maintenance based on time, T = maintenance based on cycles, B

= maintenance based on operating hours)

Interval

The number of machine cycles after which maintenance is to be carried out.

Previously recorded cycles

The number of resource cycles recorded so far in HYDRA is displayed here. This value is updated

by a cyclic process.

Next activity

Number of cycles after which the next activity becomes due.

MessageList.docx

Version: 1.0.1362

Page 4 of 4

