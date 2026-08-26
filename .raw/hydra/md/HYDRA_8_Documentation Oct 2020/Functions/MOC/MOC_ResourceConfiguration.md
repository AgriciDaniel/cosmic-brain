Workplace and Resource Configuration

1  Workplace and Resource Configuration

Overview

HYDRA menu

Master data  Resources  Resource configuration

Master data  Workplaces/machines  Workplace configuration

FEDRA menu

Detailed Scheduling  Master data  Resource configuration

Transaction code

res

Function authorization  mdres

mdresgenh for fields in combination with Test Equipment Management

Available user fields

Where?

Object type/user field key

Source (type)

Tab User fields

<Res.type*)>/depending  on  data
record

Resource (MF-D)

Table

RES/SYSTEM

Resource (MF-D)

*) <Res.typ> = resource type

The resource configuration is the central function to manage resources in the MES.

Purpose

This  application  manages  the  master  data  of  workplaces/machines  and  other  resources  (tools,  DNC

resources,  etc.).  The  resource  type  classifies  resources.  Each  resource  type  is  also  linked  to  specific

functions and applications, which provide further functionalities of the MES for resources of the specified

type.

Integration

Use  this  application  to  view  the  resource  information  of  all  resource  types  available  in  the  system. The

resource type also specifies how and if data records can be edited. Depending on the resource type, you

cannot edit all fields or create and delete all resources.

Based on the resource type, the MES also includes further applications that are especially tailored to these

types. The machine data collection application package, for example, is based on resources of the type

"machine".

MOC_ResourceConfiguration.docx

Version: 1.2

Page 1 of 39

Workplace and Resource Configuration

In addition to the resource configuration, the resource overview application is available. You cannot use

the resource overview application to edit data. This application only allows administrative operations for the

daily handling of resources such as the stock transfer of resources.

Requirements

Create a year model/shift calendar prior to creating a workplace or machine. If you want to use the various

resource types effectively, you also need the advanced licenses for these types.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Workplaces  and  machines  always  have  the  resource  type  MNR.  But  you  can  assign  individual

resource types to the other resources by configuration. Predefined resource types include:

DNC

NC/DNC program

DOC

Document

ENE

Energy meter

ENT

Removal device

ENT

Removal device

MNR  Workplace/Machine

PAC

Packaging, transportation container

PRM

Test and measuring equipment

PER

Production staff / general

PRU

Setup staff

TEM

Tempering equipment

VOR

Device

WNR

Tool

We recommend using the predefined resource types.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 2 of 39

Workplace and Resource Configuration

The displayed detail resource information varies with the resource selected in the table

overview.

Name

Name of the resource.

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

Cost center

Cost center of the resource.

Short name

Short name of the resource.

Resource family

Family the resource is assigned to.

Responsibility area

Responsibility area the resource is assigned to.

Storage location

Regular storage location of the resource.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

This detail application includes four main tabs:

-  Resource configuration

-  Resource list

-  Resource attributes

-  DNC versions

Main tab Resource configuration

Here, you can define the configurations and master data of resources.

General tab

Resource type

Resource type of the resource. The system delivery includes some default resource types. Create

additional resource types in the application .

MOC_ResourceConfiguration.docx

Version: 1.2

Page 3 of 39

Workplace and Resource Configuration

Resource

Enter the number of the resource or workplace to be collected in this field.

The resource type also specifies the maximum number of characters that are allowed for the resource

number:

-  Resources of the type MNR: a maximum of 8 digits

-  Resources of a type <> MNR: a maximum of 20 digits

Permitted characters: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_.-+#. Do not use spaces

and other special characters. For technical reasons, you can enter * (asterisk) and % (percent), but

they are nonetheless not permitted because they are not valid characters. When you exit the input

field, the system automatically converts lower case letters into CAPITAL LETTERS.

Please note for workplaces/machines (resource type MNR):

For  technical  reasons,  the  system  does  not  check  the  maximum  number  of  digits  allowed  for

resources  of  the  type  MNR.  For  this  reason,  make  sure  that  the  resource  number  length  (=

workplace/machine number) does not exceed 8 digits.

Please note: If you set the resource type MNR before entering the resource ID (machine number),

the GUI only allows you to enter eight digits.

If  you  select  the  option  "numeric  machine  number"  (basic  parameter  settings)  for  use  with  DOS

terminals, you must ensure that the resource number (= workplace/machine number) only includes

numerical digits and that its length is exactly 8 digits. If necessary, prefix leading zeroes to the number

to extend it to eight digits, when creating the workplace/machine.

Short name

Short  name  of  the  resource.  Only  use  this  field  with  workplaces/machines  (resources  of  the  type

MNR).

Name

Use this field to assign a short, unique name to each resource. Reports and overviews as well as

terminal dialogs show this name, which is also useful for orientation purposes.

Responsibility area

Use responsibility areas to restrict the data users can view in different evaluations/reports. Users can

only view the data they are allowed to according to their responsibility area authorization.

The responsibility area field can also remain empty. In this case, the resource is always displayed

regardless of the user's assigned responsibility authorizations.

If you leave the responsibility area field empty, the system automatically enters the value

"--DEFAULT--" in the field. Resources including this value are always displayed regardless

of the user's assigned responsibility authorizations.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 4 of 39

Workplace and Resource Configuration

Cost center

This field includes the cost center the resource is assigned to.

Inventory number, engraving number, drawing number, manufacturer, owner

Additional information in form of comments.

Acquisition date, acquisition costs

Additional information in form of comments.

Configure the currency for the entire system in the basic settings.

Storage location

Location where the resource is stored when it is not being used (original storage location).

In connection with the Material and Production Logistics (MPL) product group, this field specifies a

material buffer. If you log on an input batch, the logged on input batch(es) will be transferred from the

previous material buffer to the material buffer entered in this field (upstream of the machine).

Delivery date, start-up date, guarantee date

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

External designation, resource type designation, usage, purchase order number

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Supplier and party in charge including detail fields

Additional  information  in  form  of  comments.  These  fields  are  only  available  if  Test  Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Workplace configuration tab

This tab is only available if you select a resource of the type "MNR".

Workplace master data

Workplace category

N  Machine

P   Workplace

Defined  as  machine  or  workplace.  If  you  exclusively  use  BDE  and/or  MDE  and  PDV,  the  two

categories are identical as regards processing.

J   Machining center (BDE-BEA only)

The "Machining center" category and its functionality are described in detail in the BDE-BEA product

documentation.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 5 of 39

Workplace and Resource Configuration

L

Line (MDE-SFL only)

A   Aggregate (MDE-SFL only)

The categories "Aggregate" and "Line" and their functions are described in detail in the MDE-SFL

product documentation.

Q  CAQ inspection station

Workplace is defined as mere CAQ inspection station and does not affect BDE or MDE statistics.

R  Coil-based manufacturing (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

S  Cutting unit (only for coil-based manufacturing)

This type controls specific functions for the coil-based manufacturing.

D  Parallel output batches (only MPL)

You can produce parallel output batches on the machine for an operation that requires batch

management.

C  Packing station (only MPL)

You can use specific posting functions of the machine to represent a packing station. The functions

are described in detail in the AIP-LCS product documentation.

M  Melting aggregate

This option defines a machine as melting aggregate in terms of composition.

F      Laboratory/in-production inspection

This workplace is configured as inspection station. The inspection points are displayed, which are

assigned to this workplace or machine group of this workplace because of the higher-level inspection

point.  You  must  activate  the  workplace-specific  layout  here.  Use  the  following  parameters  for

activation in the AIP layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

W     Goods receipt inspection

This workplace is configured as inspection station. The goods receipt inspection points are

displayed, which are assigned to this workplace or machine group of this workplace. You must

activate the workplace-specific layout here. Use the following parameters for activation in the AIP

layout file "globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

K     Calibration

This workplace is configured as inspection station. The calibration inspection points are displayed,

which are assigned to this workplace or machine group of this workplace. You must activate the

workplace-specific layout here. Use the following parameters for activation in the AIP layout file

"globaldefines.xml".

<MachineSpecifiedLayout>True</MachineSpecifiedLayout>

MOC_ResourceConfiguration.docx

Version: 1.2

Page 6 of 39

Workplace and Resource Configuration

Workplace type

E  Single workplace (SWP)

G  Group workplace (GWP)

Group workplaces are workplaces without machine data collection or MDE evaluations.

In case of group  workplaces,  you cannot post to resource performance accounts in an

operation-related manner with postings based on the current machine status. Only main

production  times  (RPA  11)  are  recorded.  You  must  define  a  status  with  the  control

indicator "production" in the .

The system does not generate  for group workplaces. Therefore, MDE evaluations that

evaluate MDE log records are not possible.

Like single workplaces, you can assign group workplaces to terminals. In this case, you

have to make sure that the  is set to operation mode "BDE" or the option Processing is set

to "BDE processing" in the .

External workplace

This field identifies external workplaces. Currently, it only functions as a comment.

Locked

If this option is checked, the machine/workplace has been (logically) deleted. In this case, the system

does no longer permit the following changes:

- Order postings on the terminal

- Order postings on the MOC (e.g. using the "order overview" function)

- Changes when editing events

The graphic planning board of the Shop Floor Scheduling and the application Workplace assignment

do no longer show the machine/workplace.

Blocked  machines/workplaces  are  shown

in  evaluations  and  overviews.

If  blocked

machines/workplaces are not shown, this is then described in the relevant documentation of the MOC

application.

Tip: In applications where data is selected according to the responsibility area authorization, you can

hide machines/workplaces if you remove the responsibility area.

Company

Use this field to differentiate the individual machines/ workplaces. The system can use this field for

evaluation purposes.

Group

Use this field to assign the workplace/machine to a logical group. In planning, this is a capacity group.

Capacity groups combine primary capacities.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 7 of 39

Workplace and Resource Configuration

If you create a new workplace, it is automatically assigned to a group of the same name (menu BDE:

Master data > Workplaces/machines > Groups), which is defined as a capacity group. If the capacity

group  does  not  yet  exist,  the  system  automatically  creates  a  capacity  group  and  assigns  the

workplace.

Category

Enter the category of the machine. By means of this, you can enable a validation check according to

the BDE configuration: Master data > Order configuration > Order types, tab validation, option Check

planned workplace/group/category on OP logon (value category).

Year model

Enter a valid year model . The times to be posted are compared with this shift model when they are

recorded. If you have not defined a planned year model in the HLS tab, the shift model entered here

is also used in the Shop Floor Scheduling.

Standard rate, machine

Enter the arithmetical standard rate of machines for calculations. The Shop Floor Scheduling uses

this value for some (evaluated) KPIs.

Standard labor rate

Enter the arithmetical standard labor rate for calculations. The Shop Floor Scheduling uses this value

for the KPI "Evaluated labor utilization".

Performance level

You can enter the performance level of the workplace/machine in percent in this field. The Shop Floor

Scheduling  and  the  evaluation  of  material  requirements  integrate  this  value  when  calculating  the

remaining run time.

Incentive wage indicator

Defines the type of calculation used for incentive wages. This option is mostly used in combination

with the incentive wages based on formulas for customer-specific configurations. In addition, use the

"incentive wage indicator" as selection criterion for the wage type determination to calculate incentive

wages.

Leave this field empty, if you do not use the incentive wage module.

The incentive wages indicator G=group calculation has a special meaning. If this option is set for a

workplace/machine, you have to assign a premium group every time you log on an order. You can

do

this

either

via

- the "assignment of premium groups" option of the product group Incentive wages or, optionally, via

- an additional field in the terminal dialog for the logon of orders. If no assignment is available, the

system rejects the logon of the order by issuing a validation error.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 8 of 39

Workplace and Resource Configuration

Therefore,  you  may  only  assign  the  incentive  wage  indicator  G  =  Group  calculation,  if  the

group premium conditions are met in the  incentive wages calculation, as otherwise orders

can no longer be logged on!

You can specify the meaning of the other incentive wage indicators according to your requirements

while customizing the system.

File

You can assign a graphic to each machine/workplace. The workplace overview or the AIP shows this

graphic, for example. The following image formats are supported: jpg, gif, tif, bmp, ico, emf, wmf.

In the path configuration, you must have configured the following:

- the path ID "MOCWPIMG" for the MOC or SMA

-  the  path  ID  “HYDRA”  (also  see  )  for  the  AIP.  The  file  name  length  of  graphic  files  is

restricted to 12 characters (8.3 notation). Note for Linux installations: only use lower case

letters for file names.

Maximum capacity (KG)

If a machine is configured as melting aggregate, define the maximum capacity in KG here.

Accuracy class, unit, etc.

  Information fields in order to describe the accuracy. These fields are only available if Test Equipment

Management (PMV-PPK or PMV-SVP) is licensed and the right "mdresgenh" is assigned.

Data collection

Display 3rd list

Use the options described here to show/enable a third list in the main view of a Windows terminal

(CTWIN / AIP). You can switch between the respective terminal lists depending on the options set.

The following settings are possible. Please note that the contents displayed in the lists depend on

the product group in use:

 Input material (MPL): shows logged on input materials/ batches.

 Resources (WRM): shows logged on resources and tools.

 Staff (BDE): shows logged on staff.

Output material (MPL): Produced output batches are displayed.

Show material/PRT list when OP is logged on

This option is only relevant in connection with the WRM module and the resources logged on to the

Windows terminals (CTWIN / AIP).

MOC_ResourceConfiguration.docx

Version: 1.2

Page 9 of 39

Workplace and Resource Configuration

If this option is set and you log on an OP, a specific login dialog opens. This dialog includes a list of

components/production resources and tools. This list shows resources that meet at least one of the

following requirements:

- the option "posting to terminal" is set in the resource type;

- the option "log on with OP" is set to "explicit logon" for the resource.

- the resource is a so-called "required resource" (option is set for the resource).

Please note: If the workplace is relevant for MPL, the list also shows material components.

Sequencing list

This option defines which operations are displayed in the sequencing list of the terminal. The following

settings are available:

S

Basic  setting.  The  system  takes  the  value  from  the  option  of  the  same  name  in  the

HYDRA basic settings.

M

Pool of workplaces. The terminal sequencing list only shows the operations planned for

the workplace.

G

Pool of workplaces and groups. The terminal sequencing list shows operations that are:

- planned for the current workplace or

- for another workplace of the group or

- that are still located in the pool of groups.

K

Pool  of  workplaces  and  categories.  The  terminal  sequencing  list  only  shows  the

operations that are planned for workplaces of the selected category.

H

Group control. The terminal sequencing list shows the operations that are

- planned for the current workplace or

- for another workplace of the group.

Number of OPs in sequencing list

Enter the maximum number of operations that are to be displayed in the terminal sequencing list.

Enter 0 if you want to show all operations.

Compulsory sequence

Use this option to specify if it is mandatory to log on the OPs in the planned sequence. The following

parameters are permitted:

N

J

Disabled

Enabled

If the parameter is "enabled" and you log on an OP, the system checks whether the order backlog

for this machine/workplace includes an OP that is planned for the same time or previous to this OP,

but has not yet been started (i.e. status  = V/prepared). If yes, the system rejects the logon of this

OP.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 10 of 39

Workplace and Resource Configuration

Note:  If  you  plan  orders  in  the  system  using  the  Order  sequencing  (menu  Production  control  

Production support  Order sequencing) and you configure the sequencing list with any other option

than  "M"  (pool  of  workplaces)  and  you  enable  the  compulsory  sequence,  this  might  lead  to  a

combination that does not make sense.

Please note for the sequencing list:



If the sequencing list includes operations that are in the status "interrupted", you can log on

these OPs at any time, irrespective of the specified compulsory sequence.

Dialog control

To meet this requirement, define a dialog control that deviates from the standard behavior for the

workplace in the dynamic dialog configuration of the Windows terminal (CTWIN / AIP). Then refer to

the dialog control in the dialog.

Use this configuration only as part of customizing the HYDRA system. Otherwise the configuration is

not relevant.

Logon of several OPs

Select this option, if several different operations should be processed on the machine. Otherwise, the

system only allows one operation to be logged on to the machine.

Possible values:

Y

Log on as many OPs as required at the same time.

Please note: The system allows a maximum of 20 operations to be logged on

simultaneously  to  a  machine,  if  the  machine  is  assigned  to  a  terminal  with

operation mode MDE. If more than 20 operations must be logged on at the same

time, MPDV must review the conditions in order to remove the limitation. If MPDV

agrees to remove the limitation, you can do so, otherwise search for alternative

solutions. MPDV analyzes the conditions as part of a service.

N

You can log on one OP only.

1...9

You can log on a maximum of n OPs.

Posting

Quantity posting to staff

Use this function to post the quantity of order interruptions/logoffs to the person who is logged on for

the longest period.

Detailed information about quantity posting to staff can be found .

MOC_ResourceConfiguration.docx

Version: 1.2

Page 11 of 39

Workplace and Resource Configuration

Posting for OPs that are not logged on

Use this option if you want to

- interrupt

- finish

- report part quantities for

operations that are not logged on to this workplace.

If  you  record  quantities  for  an  operation  that  is  not  logged  on,  the  system  posts  these

quantities  onto  the  operation  in  the  BDE  module.  The  MDE  module  does  not  post  the

quantities.

If you want to use this function with the AIP terminal, the BDE posting dialogs that are installed by

default require the following:

- use the simplified BDE posting dialogs (the so-called "") or

- customize the dialogs.

Then you will be able to enter an operation that is not logged on.

Posting of machine time with simultaneously logged on operations

If  this  option  is  set  and  OPs  are  logged  on  simultaneously,  the  system  posts  the  machine  time

proportionately onto the operations.

Y

N

V

Z

Proportionate posting on OP according to the number of OPs

No proportionate posting. If the option is not set, the complete machine time is
posted for each operation.

According to the default quantity of the OPs. Make sure that the default quantity
(target quantity in primary quantity unit) of the operation is > 0.

According  to  the  standard  time  of  the  OPs.  Make  sure  that  the  standard  time
(processing time) of the operation is > 0.

Please note:

This  option  is  also  evaluated  for  group  workplaces  and  in  general  you  should  better  not  use  this

option for group workplaces.

Automatic logoff of staff when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the order

type.

Use  this  option  to  configure  the  personnel-related  data  collection  at  MDE  workplaces.  If  you  use

HYDRA  MDE,  the  terminals  can  generate  fully  automatic  shift  ends.  You  can  configure  here  if

- the staff logged on to the workplace should be logged off automatically at the end of the shift or

- if they should remain logged on.

Y

N

Always log off staff when the shift ends.

Always save staff when the shift ends except for manual logoff.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 12 of 39

Workplace and Resource Configuration

X

Evaluate the person's settings. The system searches for the corresponding settings

of the person .

Automatic OP posting when shift ends

This option is only relevant, if you set an "X" for (enable) the option of the same name in the order

type.

Y

N

Interrupt and log on again at beginning of shift

Interrupt

Shop Floor Scheduling

Find further information about the HLS product group in the relevant HLS documentation.

Planning function

This option specifies whether a workplace or a machine will be displayed and if so, in which planning

function.

P

H

T

A

N

Planning in the graphic planning board of the Shop Floor Scheduling or in the graphic order
sequencing (GAV), i.e. you plan the workplace via the Shop Floor Scheduling or the graphic
order  sequencing;  the  workplace  is  then  displayed  in  these  applications,  but  not  in  the
tabular order sequencing (AVG).

Note: There are also other settings that specify  whether a  workplace is displayed in the
Shop Floor Scheduling or in the graphic order sequencing:
- the workplace must be assigned to a group identified as a "capacity group"
- you must be authorized for the responsibility area of this workplace
- planning profile

Only relevant, if you use the HYDRA Shop Floor Scheduling module (HLS).

Like P.

Reserved

Planning in the tabular order sequencing (AVG), i.e. you plan the workplace using the AVG
product group.

No planning; the tabular order sequencing (AVG), the graphic order sequencing and the
HLS module do not show the workplace.

Planned year model

Here, you can enter a special year model only used for planning in the Shop Floor Scheduling. This

year model does not affect data collection and posting in the product groups BDE/MDE. If you do not

define a planned year model, the system uses the year model (Master data tab) for the planning.

Availability

Define the available capacity of a workplace/machine. The default value for the available capacity is

1000 [per mill].

MOC_ResourceConfiguration.docx

Version: 1.2

Page 13 of 39

Workplace and Resource Configuration

In  the  Shop  Floor  Scheduling,  the  capacity  check  and  automatic  assignment  assume  that  each

operation has a capacity requirement of 1000  [per mill],  i.e. exactly  one operation can run on  the

workplace/machine at a time. In case of a manual multiple assignment, a dialog informs you about

the double assignment. If you use the automatic assignment, multiple assignments are generally not

feasible.

Use  this  setting  to  extend  the  availability  of  the  workplace  such  that  a  multiple  assignment  is

permitted. If the workplace capacity allows, for example, processing of two operations at the same

time, set the available capacity to 2000 [per mill] in this field.

If nothing is entered in this field or if you enter the value 0, the system interprets this as the default

value of 1000 [per mill].

This functions requires a corresponding license.

Check personnel availability

Choose from the following options:

  Check if at least one person is planned

  Check personnel availability

  Check personnel availability and qualification

When you  operations in the , the system checks whether persons are planned in the application  for

the time of the scheduling You will find further information on the display of personnel capacities in

the Graphic Planning .

This option is only available if you enable the extension .

MPL

For further information on the MPL product group, refer to the relevant MPL documentation.

Batch management

Activates the entry of the batch number for this machine within the terminal posting dialogs. Possible

values are:

N

L

D

J

No batch processing

Batch tracing (input/ output batches) as part of HYDRA MPL/TRT

Throughput batch processing as part of HYDRA MPL/TRT

Individual batch tracing (CHV)

The  following  functions  are  only  available  in  connection  with  the  product  group  Material  and

production logistics and are supported only by Windows terminals (CTWIN / AIP).

MOC_ResourceConfiguration.docx

Version: 1.2

Page 14 of 39

Workplace and Resource Configuration

Preceding material buffer

Irrelevant.

Subsequent material buffer

If you specify a material buffer in this field, the field Target buffer in each of the entry dialogs (e.g.

output batch change, log off operation) is automatically populated with this value.

If you do not enter a material buffer in the input dialog (e.g. deleted from the input field), the system

automatically  posts  the  output  batch  to  the  material  buffer  specified  in  the  "subsequent  material

buffer" field.

Automatic generation of batch number

If you set this option, the system automatically generates a batch number for the output batch to be

produced. Otherwise, the system expects you to enter the batch number for the new output batch to

be produced, when you log on an operation or change the output batch.

Please note: If, in the field Batch management you set the option D (= Throughput batch recording),

the system automatically sets the value for the Automatic generation of batch number to "J". In this

case, you cannot enter the batch number manually.

Consumption balance

When  you  log  off  an  OP,  the  system  opens  an  additional  dialog  (V_BLZ)  displaying  the  material

components and their consumption quantities in relation to the OP that is currently logged on. In this

dialog, you can also log off input batches that are still running. This option is only activated, once you

have enabled the consumption balance for the material type of the output material.

Generate transport order for output batches

This option creates a transport order relating to batches for a generated output batch. The transport

starts from the material buffer where the output batch is included. The configurations of the material

type override the corresponding options of the resource configuration.

Generate transport order for input material

This option creates an article-related transport order relating to a material component, when you plan

an operation for a machine via the Shop Floor Scheduling module. Transport starts from the output

material  buffer  of  the  preceding  operation.  The  configurations  of  the  material  type  override  the

corresponding options of the resource configuration.

Quantities tab

This tab is only available if you select a resource of the type "MNR".

MOC_ResourceConfiguration.docx

Version: 1.2

Page 15 of 39

Workplace and Resource Configuration

Conversion factors for base quantity

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for  different

quantity accounts. In general, the system supports the following quantity accounts:

Yield

Scrap

Rework (Windows terminal CTWIN/AIP only)

Open quantity (problem quantity; Windows terminal CTWIN/AIP only)

The following quantity types are supported with each quantity account:

Primary quantity

Secondary quantity (Windows terminal CTWIN/AIP only)

Tertiary quantity (Windows terminal CTWIN/AIP only)

Basic quantity (Windows terminal CTWIN/AIP only)

The system design specifies the use of several quantity types or accounts. For example: If you  want to

enter  the  rework  quantity  manually,  a  corresponding  input  field  must  be  configured  in  the  input  dialog

(customization).

Use the quantity type "primary quantity" if you want to collect quantities automatically.

Quantity units and conversion factors for base quantity

Define a quantity unit for each quantity type. Use the alternative quantity accounts to enter data/quantities

manually. In this case, the system does not convert quantities automatically.

If you do not enter data manually in the alternative quantity accounts, the server converts the quantities into

the alternative accounts using:

- the conversion factors or

- the units that are configured in the MOC machine master data.

For further information on the conversion of quantities and examples, refer to the document

.

Basis for HYDRA-MDE quantity conversion

Define the basis for the quantity conversion.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 16 of 39

Workplace and Resource Configuration

A

Use the conversion factors of the OP that is logged on. If no operation is logged on,

the  system  uses  the  quantity  conversion  stated  in  the  machine/workplace

configuration.

M

Use conversion factors from the workplace configuration for the quantity conversion.

Units and conversion factors for base quantity (P)

Quantity unit (P)

Indicate the quantity unit you want to use for data collection at this machine/ workplace. If you collect

quantities automatically, these quantities are generally primary quantities.

If  you  want  to  convert  quantities  automatically  into  another  quantity  type,  indicate  the  conversion

factors for the base quantity here.

Units and conversion factors for base quantity (S)

Quantity unit (S)

Indicate  the  secondary  quantity  unit  you  want  to  use  for  posting  the  quantities  to  the

workplace/machine. If you want to convert quantities automatically, indicate the conversion factors

for the base quantity here.

Units and conversion factors for base quantity (T)

Quantity unit (T)

Indicate the tertiary quantity unit you want to use for posting quantities to the workplace/machine. If

you  want  to  convert  quantities  automatically,  indicate  the  conversion  factors for  the  base  quantity

here.

Units and conversion factors for base quantity

Quantity unit (B)

Indicate the base quantity unit you want to use for posting quantities to the workplace/machine.

Manual entry of quantities, yield

Manual entry of yield

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 17 of 39

Workplace and Resource Configuration

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of yield

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case, the

entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting yield as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, scrap

Manual entry of scrap

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of scrap

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case, the

entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting scrap as cycles

Requirement: Set the option "Manual entry".

MOC_ResourceConfiguration.docx

Version: 1.2

Page 18 of 39

Workplace and Resource Configuration

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, rework

Manual entry of rework quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing  of the

dynamic dialogs).

Allocation of rework

Requirement: Set the option "Manual entry".

Use this option to offset manually entered quantities against other quantity accounts. In this case, the

entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting the rework quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

Manual entry of quantities, open quantity

Manual entry of open quantity

Set this option, if you want

- to collect quantities manually;

- to set off the quantities against another account;

- to post the manual quantities as cycles.

For Windows terminals this option does not affect the quantity fields displayed in the input dialogs.

Change these quantity fields via dialog configurations (terminal configuration or customizing of the

dynamic dialogs).

Allocation of open quantity

Requirement: Set the option "Manual entry".

MOC_ResourceConfiguration.docx

Version: 1.2

Page 19 of 39

Workplace and Resource Configuration

Use this option to offset manually entered quantities against other quantity accounts. In this case, the

entered quantity is deducted from the specified account.

Note: If you offset quantities, the resulting values can be negative values.

Note

Do NOT set this option for DOS terminals, if in the counter configuration yield is offset against scrap

or scrap is offset against yield.

Posting open quantity as cycles

Requirement: Set the option "Manual entry".

If this option is set, the system also posts manually entered quantities as cycles. Note here that the

entered quantity is posted directly as cycles (partitioning is not integrated).

"MDE configuration" tab

This tab is only available if you select a resource of the type "MNR".

Monitoring

Monitoring type

Choose from the following monitoring types:

Monitoring via operating signal

No monitoring

Cyclic monitoring

If you select cyclic or operating signal monitoring, you can only enter a malfunction if the terminal

prompts you to do so ("Assign malfunction"). If you do not use automatic monitoring, you can enter

a new machine status at any time.

If you use the cyclic monitoring option, the machine automatically switches to the "production" status

when counting pulses occur. If you select the "operating signal" option, the machine automatically

switches  to  the  status  "production"  as  soon  as  the  operating  signal  is  set.  If  you  do  not  use  the

"automatic monitoring" option, you must assign the "Production" status manually.

Entry of disturbance reason required with specified delay time in [s]

You  can  only  use

this

function,

if

the

following  requirements  are  met:

- it is a Windows terminal (CTWIN, AIP)

- The Process Communication Controller (PCC) does not run in stand-alone mode.

If the system identifies a downtime without a reason, the terminal opens the input dialog "Change

machine status" after the specified delay time. If the terminal goes back into production, the window

still remains open.

If  you now enter  a machine status (during production), this data  input  activates  a transfer posting

event  that  changes  the  most  recently  recorded  status  from  "General  disturbance"  to  the  newly

entered status. If this change is ok, the window closes; otherwise, it remains open.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 20 of 39

Workplace and Resource Configuration

However, if the system identifies the next downtime (with or without a reason), you can no longer

change to the previously noted status. The window closes automatically.

If the system identifies another downtime without a reason and the delay time has expired, then the

input window opens as described above.

If the system identifies a downtime without a reason and the machine switches to production before

the delay time expires, then the terminal does not automatically prompt you to enter a malfunction

reason.

Important note:

This  change  only  affects  the  HYDRA  Machine  Data  Collection.  The  system  does  not  correct  the

resource performance accounts of the currently running OP online!

Please note for data maintenance:

The  tabular  event  maintenance  of  the  MOC  shows  all  changed  machine  statuses.  However,  you

cannot edit the transfer posting event as it is locked. In order to perform recalculations correctly with

respect to orders and machines, change the original event with the status "NOT ASSIGNED" to the

correct status. The transfer posting event does not affect recalculation!

Minimum malfunction time

Specify  a  time  in  seconds  for  the  minimum  malfunction  time.  This  value  defines  the  time  that  a

malfunction/disturbance must continue before the machine changes from the status "Production" to

the status "Not assigned".

If operating signals are monitored, the status is directly changed. You can use the following explicit

option in the MDEB2.ini to disable this behavior (deactivation of direct status change). Result: the

status is only changed when the minimum disturbance time has expired:

MDEB2.INI

[INIT]
;Activating the direct status change (globally or for a specific machine)
SetMStatusDirect=1
SetMStatusDirect@<machine number>=1

;Deactivating the direct status change (globally or for a specific machine)
SetMStatusDirect=0
SetMStatusDirect@<machine number>=0

Minimum cycle time

If you select the cyclic monitoring option, specify a minimum cycle time in seconds in this field.

The terminal uses this minimum cycle time and the target cycle that is stored with the (logged in)

operation and that is set off against the cycle extension to calculate the maximum value. The terminal

uses this maximum value as the default cycle time.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 21 of 39

Workplace and Resource Configuration

If both, the minimum cycle time and the target cycle stored for the operation, are 0, the default cycle

time is set to 60000 seconds [per 1000 machine clocks].

Cycle extension

If you select the cyclic monitoring option, enter the percentage for extending the target cycle time in

this field. Enter a value ranging between 0 and 5000.

The system offsets the target cycle stored with the (logged in) operation against this percentage. A

value less than 100 is a shortened cycle; a value greater than 100 is an extended cycle.

Number of target cycles

If you select the "cyclic monitoring" option, enter the number of cycles (0 to a maximum of 9) after

which the terminal automatically switches from a status unequal to "production" into the "production"

status within the cycle time (requirement: the status that is unequal to production is not locked for the

"production" status).

Some production processes provide machine cycles during the setup phase. Set a value greater than

0  in  order  to  prevent  the  current  machine  status  from  changing  immediately.  Please  note:  The

quantities you collect until the machine switches to the "production" status are neither posted as yield

nor scrap.

Cycles to be evaluated

Reserved Enter 0 in this field.

Management

Posting during production lock

Use  this  setting  to  specify  how  to  post  the  counting  pulses  that  are  collected  while  the  status

"production" is suspended. This configuration takes effect for all counters configured as "Yield".

Posting as scrap

If this option is configured for the counter, the system offsets the counting

pulses  against the partitioning/ pulse factor and posts these pulses  as scrap.  Even  if  you  defined

another quantity account for offsetting, this one will not be used.

Posting as yield parts

the system posts the counting pulses as yield

No posting

the system does not post the quantities while the "production" status is suspended.

Pulse factor specific to machines

Use the pulse factor, for example, if you want to collect lengths (e.g. using a wheel).

Set  the  value  to  0  for  machines  where  a  discrete  or  integral  number  of  quantities  (e.g.  pieces)  is

collected per pulse. In this case, the pulse factor is not evaluated. That means, the number of cycles

posted corresponds to the actual pulses transferred via the MSS (machine interface).

MOC_ResourceConfiguration.docx

Version: 1.2

Page 22 of 39

Workplace and Resource Configuration

The MSS (machine interface) records the signals transferred from the machine (counting pulses).

According  to  the  configured  number  of  pulses,  the  system  calculates  and  posts  the  quantities  as

follows:

Quantity for the machine = pulse * partitioning for the machine/ pulse factor for the machine

Quantity for the operation = pulse * partitioning for the operation/ pulse factor for the operation

Please note: The pulse factor will be calculated as a fraction. When the quantity is calculated, the

pulse is used as denominator and the partitioning is the numerator.

The system interprets pulses that occur during a malfunction or a production lock (configuration of

Posting during prod. lock > scrap) as scrap. Also use the above-mentioned formula to calculate the

scrap quantities.

Partitioning specific to machines

Enter the partitioning specific to the machine in this field. Multiply the machine-specific partitioning by

the partitioning stored with the operation in order to integrate the machine-specific partitioning into

quantity calculation. Enter the value 1 in this field, if you do not want this to happen.

Extended weekend automatic

If you select this option and the system is configured accordingly, the system assigns at the beginning

of the shift the status that was available before status 999 was activated.

Note:

To use this option, the workplace must already be assigned to a terminal.

Find detailed information about the automatic activation of status 999 in the document .

Waiting period, short-term disturbance

Configure a short-term disturbance status for each machine/ workplace to improve the overview, e.g.

in the machine history. Use this status as a “repository” for unconfirmed statuses, which only existed

for a specific (short) period.

If  the  terminal  automatically  identifies  a  downtime  and  the  machine  automatically  goes  back  into

production, the system checks if this disturbance is shorter than the time period configured for short-

term disturbances.

If this is the case, the still unfounded malfunction is justified with the status that is configured as the

"short-term disturbance" status for the machine.

Inputs/ outputs

Machine lock/ Target quantity reached/ Machine downtime/ Free I/O

Enter  the  logical  output  where  a  digital  signal  should  occur  when  the  corresponding  status  is

available.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 23 of 39

Workplace and Resource Configuration

Machine lock output

The system sets this output, if you enabled the option "set machine

lock output" in the current machine status.

Target quantity reached output  The system sets this output, if the collected yield reaches the target

quantity of the OP.

Machine downtime output

The system sets this output, if the machine is in a status unequal

to Production. When changing to the production status, the system

sets the output back to 0.

Free I/O

Free input/ output for customizations.

Use these statuses for connecting a monitoring light or a horn, for example.

Enter the corresponding number in one of the fields in order to assign an output and to specify

which relay is interconnected by the terminal when the predefined status occurs. Enter "0" to

prevent any action. Note that you cannot assign a terminal output more than once.

Please note

Specify the statuses that trigger the activation of the machine lock in the Status assignment.

Generally, enter the value "1" in the input field, when the machine lock is activated via the available

relay output of a DS 100. In this case, the system sets the machine lock if

- a correspondingly configured status occurs and

- the status is not assigned.

Output batch change**

Customer-specific assignment of an input with an automatic output batch change (MPL). By default,

enter 0 in this field.

PDE (Process Data Collection)

Collect process data

This parameter specifies if the system collects process data for this machine. If this parameter is not

set for a machine, you cannot collect process data for this machine.

External connection

The AIP 8.2 and/or the PCC in stand-alone mode (MDE-Blade 2 Version 8.1.0.1) do no longer

support the options marked with **. As they use other configurations for the connection.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 24 of 39

External connection

If this machine is assigned to a master terminal the following connection options are available:

Workplace and Resource Configuration

No external device

External devices are not connected

DS100

DS100 connection

Arburg control system**

Arburg connection

Engel interfacing**

Connection of Engel machines

MT3**

PDE**

MT3 connection

Process data collection

If you activate a DS100 or MT3** connection, you can select the field "device address". If you activate

the  option  "Engel  interfacing",  you  can  select  the  field  "serial  number".  If  you  activate  the  option

"Arburg server system", you can select the field "class".

Note regarding the combination of connections on a master terminal:

"DS 100" and "No external device": allowed

"MT 3" and "No external device": allowed

"MT3" and "DS 100" not allowed!

Serial number (Engel interfacing)**

Enter the serial number of the connected Engel machine. Set the option "EMS machine interface" in

the HYDRA basic parameter settings  if you want to use Engel machines.

Device address

You can select this field, if you activate a DS100 or MT3** connection. Enter the device address of

the sub-bus participant.

"Resource configuration" tab

For resources of type "MNR", only the fields marked with "*" are available:

  Family (section resource master data)

  Cycles (section target utilization)

  Runtime (section target utilization)

Resource master data

Type

Identifies the type of resource:

Resource: A resource can be uniquely identified, i.e. the resource is actually present. Its quantity is

always 1.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 25 of 39

Workplace and Resource Configuration

Anonymous resource: An anonymous resource cannot be uniquely identified. If the identifier is set,

then  you  can  change  the  value  in  the  field  Number  from  1  to  another  positive  integer  value.  You

cannot post  data onto  anonymous resources because anonymous resources do not relate to  one

specific resource.

Required  resource:  A  required  resource  stands  for  one  or  more  actual  resources  that  can  be

identified. Specify in the configuration WRM: Master data > Required resources which resources are

represented  by  a  required  resource.  The  number  results  from  the  number  of  actual  resources

assigned to the required resource.

Please note: If this field is empty, the resource is implicitly an ("actual") resource.

Equal type

Reserved for future modifications.

Version

Revision number; store here the program version for resources of the type DNC.

Quantity

You can only edit this field, if it contains an anonymous resource and the option Anonymous resource

is set (see above). A value > 1 indicates how many of these resources are available.

This field is calculated automatically for required resources.

Family*

Assign  a  resource  family.  If  you  change  the  resource  family  subsequently,  an  information  dialog

appears as a warning because user fields might possibly be assigned via the resource family.

Target utilization

Cycles*

The field Cycles provides additional information. The cycles value defines how long the resource is

to be used.

Runtime*

The field Runtime provides additional information. It defines how long the resource is to be used.

Input unit

Input unit

Absolute value limit (EMG 8.1, function authorization: resablim)

Enter the absolute value limit of the (meter) resource. The energy monitor shows this limit value in

addition  to  the  current  meter  reading.  Use  the  Escalation  Management  to  generate  an  escalation

message, if the counter value of the resource exceeds the specified absolute value limit. You need

the function authorization "resablim" to view this field.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 26 of 39

Workplace and Resource Configuration

Actual utilization

The periods when a resource was logged on to a workplace are the basis for posting the cycles (clocks),

runtime, yield, and scrap as actual utilization.

Clocks

The cycles (clocks) posted for the resource up to now.

Runtime

The total time in hours posted for the resource up to now. The total time is the sum total of all times

posted onto RPA 1 to 11.

Yield (B)

The yield posted for the resource up to now (base quantity unit).

Yield (P)

The yield posted for the resource up to now (primary quantity unit).

Scrap (B)

The scrap posted for the resource up to now (base quantity unit).

Scrap (P)

The scrap posted for the resource up to now (primary quantity unit).

Configuration

Target cycle

Target duration in seconds for 1000 machine cycles if this tool is used.

Please note: The target cycle stored in the OP is relevant for the planning in the HLS module and for

the machine data collection at the terminal.

Original partitioning

Partitioning of the tool (= number of cavities) when using this tool.

Current partitioning

Current partitioning of the tool. This value can deviate from the original partitioning, e.g. if the original

quantity can no longer be produced with one cycle/clock due to a tool defect.

Always use the current partitioning to post cycles to the tool.

Please note: The partitioning stored in the OP is relevant for the planning in the HLS module and for

the machine data collection via the terminal.

Partitioning due to cavities

If  you  set  the  option  "partitioning  due  to  cavities",  the  system  (re-)calculates  the  fields  "current

partitioning" and "original partitioning" using the values defined in the cavity management. Then, you

can no longer change the fields manually.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 27 of 39

Workplace and Resource Configuration

Log on with OP

Use this option to specify whether or not you want to log on the resource with the OP. To do so, the

resource must be included as a component in the operation's list of production resources and tools.

Possible values:

None:

The resource is not logged on.

Implicit:  The system automatically (implicitly) logs on the resource that is assigned to the operation

as  a  production  resource  and  tool;  you  can  neither  log  on  the  resource  manually  (explicitly)  nor

change the logon.

Explicit:  You  can  manually  (explicitly)  log  on  the  resource  that  is  assigned  to  the  operation  as  a

production resource and tool or you can log on another resource instead. If you do not log on the

resource  or  another  resource  explicitly,  the  system  implicitly  (automatically)  logs  on  the  current

resource; in this way, the current resource serves as a "default".

Please note:

If you log on another resource explicitly (manually), this resource will be logged on for the resource

that has the same  resource type in the operation's list of production resources and tools. For this

reason, you can only log on those resources explicitly (manually) that are included as a requirement

in the operation's list of production resources and tools. In this way, you cannot log on a resource

that is not included as a requirement in the list of production resources and tools (the resource must

be entered in the list).

In general,  you should not enable this option for the resource type DNC. The DNC product group

handles this differently (NC programs are logged on separately).

The system also logs on resources that are defined in the BOM of the machine.

Parallel logon/ planning possible

You can log on/plan the tool simultaneously.

Please note:  You can only log on a resource to one  machine more than  once.  Consequently, the

option "Parallel logon possible" refers to several different OPs logged on to one machine.

In this case, the system posts data proportionately as follows:

  Post quantities proportionally.

  Post times 100% for each resource. This means that the system posts double the time to the

resource, if the resource is logged on twice.

Post to resource

Specifies whether or not the quantities and times are posted to the resource. Due to a high degree

of  complexity,  you  should  only  assign  this  option  to  those  resources  that  you  actually  want  to

evaluate.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 28 of 39

Workplace and Resource Configuration

Collective lock

If you lock a lower-level (assigned) resource using the BOM function, the system sets a collective

status for the higher-level resource. If this collective status is set, the system treats the higher-level

resource as locked when a download request is made.

If you enable this function, the system passes the collective lock to the higher-level resource.

Planning

Setup time

Duration in hours for setting up the tool.

Please note: The setup time stored in the OP is relevant for the planning in the HLS module.

Teardown/retooling time

Duration in hours for removing the tool.

Please note: The retooling time stored in the OP is relevant for the planning in the HLS module.

Assignment

Not used. The system uses the configuration option of the same name stored in the resource type to

integrate the resource allocation in the HYDRA Shop Floor Scheduling.

Evaluation

Integrate in evaluations

Reserved for future modifications.

File

File exists

Shows whether or not the file is stored in the specified path. A cyclic process checks the files and

sets the options subject to whether or not the file is available.

File name

File  name;  without  file  extension  for  DNC.  The  system  adds  the  file  extension  according  to  the

configuration in the resource type. The defined paths specify the storage location.

Comparison resources

Enter  two  comparison  resources  for  energy  consumption  resources.  They  will  then  be  shown  in

comparative evaluations/reports, e.g. the energy monitor.

Resource 1

Resource number of the resource to be compared.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 29 of 39

Workplace and Resource Configuration

Resource type 1

Resource type of the resource to be compared.

Resource 2

Resource number of the resource to be compared.

Resource type 2

Resource type of the resource to be compared.

Accuracy

Enter  more  detailed  information  on  measuring  accuracy  and  measuring  range  for  test  equipment

resources.

Tab User fields

You can use user fields to store additional customer-specific information in the MES. The user fields tab

includes  eight  sub-index  tabs,  which  each  has  eight  additional  user  fields.  The  so-called  user  field  key

specifies the available user fields and their meaning.

The workplace and resource configuration provides data of two basic object types. You can also edit this

data in the workplace and resource configuration: on the one hand these are machines and workplaces

and on the other these are the resources. Machines and workplaces are also "resources". But resources

are not automatically machines and workplaces.

Object type

The system configures the user fields of machines/workplaces in relation to the object type "MNR".

The system stores data contents to  the machines/workplaces table and the resources table of the

database to ensure data consistency.

The system configures user fields for resources in relation to the object type matching the resource

type  of  the  resource  (example:  create  resources  of  the  type  "PAC"  in  relation  to  the  object  type

"PAC"). The system stores data contents to the the resources table of the database.

User field key

Each user field key describes a combination of user fields. The management of the user field key

(and therefore the meaning of the fields) is different for each object.

User fields

The following user fields are available after configuration:

Field data type
Date
Numeric,
time, duration
Decimal value
Text field, length 1

Number of fields
6
16

6
16

MOC_ResourceConfiguration.docx

Version: 1.2

Page 30 of 39

Workplace and Resource Configuration

Field data type
Text field, length 10
Text field, length 20
Text field, length 40

Number of fields
6
14
2
Each page shows a maximum of 8 fields.

By default, no user field keys are defined. Configure the system accordingly to support

this kind of user fields.

As the table shows resources of different types, use the user field key "SYSTEM" of the

object "RES" to identify the column headings for the user fields.

Comment tab

Store additional resource comments in the "comment" tab.

Main tab Resource attributes

Shows  additional  resource  attributes  via  the  user  field  definitions  of  the  resource  family.  Use  the

"resource attributes" button for editing.

Main tab Resource list

Shows the resource list for the selected resource. Click the "resource list" button to go directly to the

BOM application for editing purposes.

Main tab DNC versions (available as of DNC 8.2)

Shows the available versions of a DNC resource including a flag indicating the currently applicable

version. HYDRA provides this valid version for machine downloads.

Toolbar

General tab

Insert

Function authorization: mdres.create

Opens  the  dialog  for  adding  a  resource.  This  dialog  provides  the  fields  that  match  the  selected

resource type.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 31 of 39

Workplace and Resource Configuration

Copy

Function authorization: mdres.copy

Opens the dialog for copying an existing resource. Subject to the selected resource and its resource

type, the copy function differentiates the following:

  Copy function for resources of resource type = MNR (workplaces, machines)

  Copy function for resources that do not have the type MNR

Copy function for resources of resource type = MNR (workplaces, machines)

From: resource type, resource, short name, name

  Resource type (fixed "MNR“)

  Workplace/machine number

  Short name

  Name

of the workplace you want to copy. You cannot change these values. They derive from the

selected data record.

To: resource type, resource, short name, name

  Resource type (corresponds to the resource type of the workplace you want to copy;

cannot be changed).

  Workplace/machine number

  Short name

  Name

of the target workplace.

Copy machine status

Function authorization: mdmst.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Copy counter configuration

Function authorization: mdctr.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

Note that the counter numbers of the new workplace are identical with the counter numbers

of the workplace you copied. If necessary, you have to adjust the counter numbers.

Copy reasons

Function authorization: mdreas.copy

If you set this option, the system automatically creates and transfers all  of the workplace

you want to copy to the new workplace.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 32 of 39

Workplace and Resource Configuration

Copy function for resources that do not have the resource type MNR

The copy function for all resources that do not have the type MNR opens the "insert" dialog and takes

over the details from the previously selected resource. But you can edit and change all fields.

Edit

Function authorization: mdres.edit

Opens the dialog to edit a resource and provides the tabs and fields of the relevant resource type.

As of MES Weaver 4.0pe, you can change master data of several selected resources of the same

resource type at the same time. You can select up to 10 fields and assign a value. You require the

function authorization mdresmm to edit several resources at once.

  Delete

Function authorization: mdres.delete

Deletes one or several selected resources.

Resource tab

 Configuration – resource status

Opens the application "resource status" to define statuses for all resources that do not have the type

MNR.

 File - show file

Opens  the  file  view  –  only  available  for  document  resources,  which  are  configured  as  file-based

resources without DNC processing in the Resource type. And only available if the relevant license

and function authorization are available.

 Go to - resource list

Opens the Resource list application. The selected resource is entered as default value for the higher-

level resource.

 Go to – required resources

Opens the "required resources" application. The selected resource is entered as default value for the

required resource.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 33 of 39

Workplace and Resource Configuration

 Go to – cavity assignment

Opens the "cavity assignment" application. The selected resource is entered as default value.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Functions – Measures

Opens the Measures application.

 Functions – Status change

Opens the dialog to change a resource status. The checkbox Including subordinate resources is not

relevant and reserved for future extensions.

 Functions – Release of resource

Opens the dialog to release a resource. The checkbox Including subordinate resources is not relevant

and reserved for future extensions.

 Functions – Stock transfer

Opens the dialog to transfer/relocate a resource.

Workplace tab

 Configuration – status assignment

Opens  the  application  "status  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – counter configuration

Opens  the  application  "counter  configuration".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Configuration – terminal assignment

Opens  the  application  "terminal  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 34 of 39

Workplace and Resource Configuration

 Entry – reasons

Opens the application "reasons". The system enters the selected resource in the corresponding field.

 Entry – Operator positions

Opens  the  application  "operator  positions".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Entry – premium indicator

Opens  the  application  "premium  indicator".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Groups - groups

Opens the application "groups". The system enters the group of the selected resource.

 Groups – group assignment

Opens  the  application  "group  assignment".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous – cycle parameter

Opens  the  application  "cycle  parameter".  The  system  enters  the  selected  resource  in  the

corresponding field.

 Miscellaneous - workforce requirements of workplaces

Opens  the  application  "workforce  requirements  of  workplaces".  The  system  enters  the  selected

resource in the corresponding field.

DNC tab

The tab is only available, if you select a DNC resource. These are resources configured as resources

with DNC processing in the resource type.

 Configuration – resource status

Opens the "resource status" application.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 35 of 39

Workplace and Resource Configuration

 Configuration - assignment of DNC family to machine

Opens the application "assignment of DNC family to machine".

  Copy resource attributes (as of DNC 8.2)

Copies values of resources attributes from one resource to another. Both  resources must use the

same user field key.

  File - comparison editor

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  See  below  for  further

information.

 File - export

Exports the file specified for the resource. You use the file explorer to specify the target file.

 File - import

Imports the file specified for the resource. You use the file explorer to specify the source file.

 File - viewer

Opens the file specified for the resource using the defined viewer program.

 File - editor

Opens the file specified for the resource for editing using the defined editing program.

 Set valid version (as of DNC 8.2)

Only active, if you select a version in the DNC versions tab. The selected version is set as the new

and valid version.

 Go to - resource attributes

Opens the application "resource attributes". The selected resource is entered as default value.

 Go to - resource list

Opens the Resource list application. The selected resource is entered as default value for the higher-

level resource.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 36 of 39

Workplace and Resource Configuration

 Functions – Status change

Opens the dialog to change a resource status.

 Functions – Release of resource

Opens the dialog to release a resource.

How to use the comparison editor

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  Two  operation  modes  are

available:

Selection of one resource:

The editor shows the released resource and the optimized version of the resource for comparison.

You can change the file displayed on the right-hand side of the editor. Once you have made the

changes, the comparison editor transfers these changes to the system, like the simple editor. You

can only use this mode for DNC types with the file processing type "optimized".

Selection of two resources:

MOC_ResourceConfiguration.docx

Version: 1.2

Page 37 of 39

Workplace and Resource Configuration

If you select two resources before you open the  comparison editor, the editor compares the two

selected resources. You can select the file type. You can change the file displayed on the right-

hand side of the editor. Once you have made the changes, the comparison editor transfers these

changes to the system, like the simple editor.

Click the relevant buttons or use the context menu (right clicking) to start the functions of the comparison

editor:

-  Reject: Rejects the difference identified (on the right). Accepts the value from the left file. The

editor does no longer highlight the difference.

-  Keep:  Accepts  the  difference  identified  (on  the  right).  The  editor  does  no  longer  highlight  the

difference.

-  Next difference: Goes to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row. Click the row and enter a value. Press ESC to quit

the row without changes. The editor then highlights the row as "changed".

-  Swap windows: Click this button to swap the windows. This function is necessary if you compare

two  resources.  The  place  where  a  resource  is  displayed  results  from  the  display  order  in  the

table;  the  system  does  not  know,  which  resource  must  be  changed.  If  you  only  select  one

resource, this button is not available as in this case you can only change the optimized program

version.

-  Save: Saves the changes made to the file on the left-hand side.

Processing notes for workplaces and machines

Configuration changes

Restart  the  terminal  which  the  workplace/machine  is  assigned  to  in  order  for  the  terminal  program  to

interpret the configurations or modifications made to this workplace/machine.

Deleting a machine/ workplace

In a first step, the system shows a confirmation prompt asking if you really want to delete the machine. If

you  confirm  this  prompt,  the  system  makes  an  attempt  to  delete  the  workplace.  You  can  only  delete  a

workplace successfully, if:









you have not yet collected data for the workplace;

you have currently not assigned the workplace to a terminal or a line;

you have currently not logged on operations to the workplace;

you have not planned operations for the workplace.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 38 of 39

Workplace and Resource Configuration

If  you  delete  the  workplace  successfully,  the  system  also  deletes  all  configuration  data,  e.g.  status

assignments, for this workplace.

Checking Business Parameter Containers (BSCs)

See  for further details on how to check the system against business parameters.

MOC_ResourceConfiguration.docx

Version: 1.2

Page 39 of 39

