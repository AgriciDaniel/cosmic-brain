Configuration of Inspection Planning

Configuration of Inspection Planning

1  Configuration of Inspection Planning

1.1

Inspection plan header

The  inspection  plan  header  includes  four  different  options  significantly  affecting  the  generation  of

inspection plans and inspection requirements.

1.1.1  Operation assignment

You can choose from the two assignment types "One inspection plan for each operation" and "One

inspection plan for all operations". By assigning operations, you can specify whether the characteristics of

various operations ("One inspection plan for all operations") shall be included in the inspection plan to be

generated, or whether the inspection plan shall only include the characteristics of one operation.

"One inspection plan for all operations"

By default, you can only use the setting "One inspection plan for all operations". With this setting, you

have to enter all characteristics to be inspected in one or more operations of this article/group in the

inspection plan.

You can assign a characteristic to an operation directly in the inspection plan characteristic:

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 1 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

"One inspection plan for each operation"

In order to be able to use the setting "One inspection plan for each operation", the system must

be customized by MPDV.

This setting results in the generation of a separate inspection plan for each operation of an item whose

characteristics are to be inspected. The dialog now shows the fields "Operation" and "Operation

designation". You can enter the operation number directly in the inspection plan header.

You may only indicate the operation designation if solely HYDRA-CAQ is licensed. In all other

cases,  you  may  only  store  the  operation  number.  (This  field  must  be  used  if  operations  are

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 2 of 9

Configuration of Inspection Planning

processed!)

Please note

Configuration of Inspection Planning

If possible, you should use the setting "One inspection plan for all operations". This, for
instance, allows for printing all inspection characteristics of an item even if it comprises several
operations.

In areas without any allocation to a production order, you should use the option "One inspection
plan for all operations". The advantage here is that the "fictional" operation must be entered in
the inspection plan header once only, instead of having to be entered for each inspection plan
characteristic. The system must be configured accordingly by MPDV Consulting in order to use
this inspection plan option.

Operation, operation designation

If operations are used, you only have to complete one of the two fields "Operation" or "Operation

Designation". If an inspection requirement/inspection order shall automatically be created by the logon of

an operation belonging to a production order, you only have to enter the operation number in the field

“Operation”. Please note that these fields are used as search criteria in the subsequent generation of an

inspection order. This means if only the designation is entered for the operation in the inspection plan,

you must also enter this precise information when creating the inspection order.

Even in areas without any allocation to a production order (e.g. in
goods receipt and test equipment management), you must assign a "fictional" operation (e.g.
9999). This is necessary if inspection steps are generated.

1.1.2

IO (inspection order) + inspection station

This option defines the procedure of generating inspection steps. You can choose whether "One

inspection step (=IO) for each inspection station" or "One inspection step (=IO) for all inspection stations"

is created.

Basis: Assignment of an inspection station to a characteristic

By assigning an inspection station to a characteristic, you can generate inspection steps which comprise

only the characteristics of one inspection station, each. The decisive criterion for this is the configuration

setting in the inspection plan header.

"One inspection step (=IO) for each inspection station"

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 3 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

If one inspection step is created for each inspection station, this information can in turn be used as a filter

for the inspection orders available at the AIP inspection terminal. In addition, the terminal has to be

configured accordingly.

"One inspection step (=IO) for all inspection stations"

If you specified in the inspection plan header that an inspection step is not to be generated for each

inspection station, the inspection station assigned to a characteristic only represents supplementary

information.

1.1.3

Generate new QM OPs

If you use this option, you can specify whether or not additional QM operations are produced during the

generation of an inspection requirement.

You  should  choose  "none"  for  in-production  inspections,  since  the  operations  of  a  production  order

already exist.

You  should  select  the  setting  "when  generating  new  inspection  requirements"  for  areas  with  no

assignment  to  a  production  order;  e.g.  goods  receipt,  test  equipment  management.  In  these  areas,

inspection  requirements  are  triggered  by  other  processes  (e.g.  ERP  interface,  order  generation  in  test

equipment management, manual generation).

This setting generates separate QM operations when inspection requirements are generated. These OPs

are to be logged in to the terminal in order to perform the inspection.

In areas with no assignment to a production order (e.g. in goods receipt and in  test equipment

management), a "fictional" operation is to be assigned (e.g. 9999). This is necessary if you want

to generate inspection steps later on.

1.1.4

IO + generate characteristics

This option specifies the time when an inspection step with the associated characteristics is generated:

  With  inspection  requirement  generation:  The  appropriate  inspection  steps  are  generated  at

the same time as the inspection requirement.

  With operation logon: The inspection steps are only generated when an operation is logged on

to the terminal. Only then are the specifications for the individual characteristics identified.

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 4 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

You  can  select  the  option  "With  operation  logon",  for  example,  if  an  operation  is  not  regularly

included in a production order. The inspection step for this operation is only generated if the OP

is logged  on.  As a consequence,  you do not have to complete the inspection step manually  if

this operation is not included in the production order.

In addition, this setting makes sense if, for example, an extended period has expired between

the first logon of the order (typically logon of the first operation (= time of inspection requirement

generation)  and  the  first  logon  of  a  subsequent  operation.  Specifications  might  have  changed

and the modified ones are to be used for the subsequent operation.

1.1.5  Recommended basic settings for each area



In this regard, you should consider various combinations of the 4 options, since some of them

have an impact on each other and some combinations are not appropriate.

In addition, you should take into account the recommended "basic settings" for each field of

application (production, goods receipt, goods issue, test equipment calibration, initial sample,

etc.). For instance, you should enable the setting for the generation of QM operations for goods

receipt.

In-production inspection

  Operation assignment: one inspection plan for all operations



IO + inspection station:  one IO for each inspection station (if inspection stations are used)

  Generate new QM OPs: none





IO + generate characteristics: when generating inspection requirement

IO + generate characteristics: when generating inspection requirement

Initial sample inspection

  Operation assignment: one inspection plan for all operations



IO + inspection station:  one IO for each inspection station (if inspection stations are used)

  Generate new QM OPs: when generating new inspection requirements



IO + generate characteristics: when generating inspection requirement

Goods receipt inspection

  Operation assignment: one inspection plan for all operations



IO + inspection station:  one IO for all inspection stations (normally only one inspection station is

used in goods receipt)

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 5 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

  Generate new QM OPs: when generating new inspection requirements



IO + generate characteristics: when generating inspection requirement

Goods issue inspection

  Operation assignment: one inspection plan for all operations



IO + inspection station:  one IO for all inspection stations (normally only one inspection station is

used in goods issue)

  Generate new QM OPs: when generating new inspection requirements



IO + generate characteristics: when generating inspection requirement

Test equipment management

  Operation assignment: one inspection plan for all operations



IO + inspection station: one IO for all inspection stations (normally only one inspection station is

used in test equipment management)

  Generate new QM OPs: none



IO + generate characteristics: when generating inspection requirement

1.1.6  Properties

The tab of general inspection plan details includes further inspection plan characteristics:

•

•

 Inspection type (characteristic or piece-related) and

 Action  (create  and  immediately  release  inspection  step,  or  only  create  inspection  step

and release it manually at a later point in time).

The inspection plan characteristic "Inspection type" defines the subsequent inspection sequence.

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 6 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

Option  1:  record  the  measured  values  of  the  first  characteristic  for  all  items  to  be  inspected,  and  then

change  the  characteristic  and  again  record  the  measured  values  for  all  items  (characteristic-related

inspection - the item changes with every recorded measured value).

Option  2:  Check  each  item  separately  and  completely  (piece-related  inspection  -  the  characteristic  is

changed after each recorded measured value).

The inspection plan characteristic "Action" defines whether the inspection plans generated  based on this

inspection  plan  shall  be  released  immediately  or  manually.  The  option  "Generate  inspection  step"  only

makes sense if specific information yet to be assigned to the inspection step is missing at the time  when

the inspection step is being generated.

The gage method is only available for the gage management.

You  only  have  to  specify  dynamic  modification  for  goods  receipt  and  goods  issue.  You  can  define

whether dynamic modification takes place in relation to a characteristic or in relation to a batch.

Normally the cavity assignment is only used in the production inspection.

1.2

Inspection plan characteristics

Machine / Group

During inspection planning, you must enter a machine (a workplace) or a group for goods receipt, goods

issue,  initial  sampling  and  calibration  (test  equipment),  because  true  QM  operations  are  generated  in

these areas.

If true QM operations are also to be generated in production, you have to assign a machine or a group to

these characteristics. The assignment is necessary for  true QM operations, because the sequencing list

for logging in operations to the terminal only shows operations planned at the corresponding machine or

group.

If CTWIN is used instead of AIP, machine or group assignment is omitted.

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 7 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

If there are identical operations, a separate inspection step is generated for each combination

"Machine" or "Machine group" with a single "Inspection station".

Possibilities of planning QM operations by graphic planning/order sequencing

By logging on the first operation of an order, the system generates the inspection requirement and all

inspection steps, depending on the inspection plan configuration. As a consequence, the QM operations

are generated, too, if this is defined in the inspection plan.

These QM operations may then be planned from the group to individual workplaces and/or other

workplaces in the graphic planning/order sequencing.

The generation of the inspection requirement and hence the QM operations directly after transmission of

the production order to HYDRA or in case of a specific status change of an operation (e.g. from not ready

to prepared) is also possible. These individual logics have to be specified for each individual customer in

the project.

Inspection result base

The settings for the "inspection result base" define whether all or only the last sample is used for the

characteristic result.

If inspection points are used

  All samples: all samples, i.e. all inspection points, are used for the characteristic result.

  Last sample: only the last inspection point where inspection data was recorded for the

characteristic is used for the characteristic result.

Special case: in a cavity-related inspection, several samples (= several inspection points) exist

for a characteristic-wise inspection. For this reason, the setting 'Last sample' is not

recommended and not correct for these characteristics.

If no inspection points are used

  All samples: all samples are used for the characteristic result.

  Last sample: only the last sample is used for the characteristic result.

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 8 of 9

Configuration of Inspection Planning

Configuration of Inspection Planning

Mandatory inspection

If inspection points are used

  Variable characteristics: the first measured value of the characteristic is shown in yellow for each

inspection point. The other measured values are shown in light green.

  Attributive / inspection chart: the characteristic is shown in yellow for each inspection point.

If no inspection points are used

  The first value to be recorded / the first sample of the characteristic is shown in yellow, regardless

of the sample number.

Calculated characteristics

No context (e.g. machine, cavity, etc.) is transmitted to calculated characteristics. The reason is that the

values to be used in the calculation are, for example, recorded on different machines. This results in an

ambiguity as to which value of the calculated characteristic is to be assigned to which machine.

Configuration_InspectionPlan.docx

Version: 1.0.6266

Page 9 of 9

