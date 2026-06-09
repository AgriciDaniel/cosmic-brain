Fields of Application BDE

1  Fields of Application BDE

1.1  Overview

The goal of the following description is to present the many collection and processing options offered by

HYDRA shop floor data collection (HYDRA-BDE) and machine data collection (HYDRA-MDE).

1.2  Basics of shop floor data collection

The postings of the HYDRA-side production data collection are based on the components machine, order

and  person.  Depending  on  the  approach  and  the  main  focus  of  the  individual  use  of  HYDRA,  different

components might play a prominent role or they might be unnecessary and therefore as far as possible

disabled.

Machine/workplace – where does production happen?

Logging an order or employee on or off is basically machine or workplacerelated. Logging on to a machine

answers the question of where a BDE posting takes place. BDE postings can basically be executed only

on those machines or workplacess which have been configured accordingly in the HYDRA master data.

The  names  machine  and  workplaces  are  synonymous  in  HYDRA.  In  HYDRA-MDE,  the  expression

"machine" is favored. In HYDRA-BDE, the name "workplaces" is favored.

Order/operation – what is produced?

All tasks performed by staff at machines are based on orders. Logging the order or its operation on answers

the question what is done or which activity is executed.

HYDRA differentiates between different order types to classify orders according to their utilization. Different

control information that is decisive for managing the orders is defined for each order type.

HYDRA provides the following order types by default. Further order types can be created according to the

customer's requirements:

  Production order

A production order generally relates to the article/item and is characterized by a target quantity as

well as a completion date.

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 1 of 7

Fields of Application BDE

  Overhead cost order

An overhead cost order (e.g. cleaning of the workplace) normally only refers to cost-accounting.

  Capacity order

A capacity order has only been designed for planning purposes (assignment of capacities) within

HYDRA shop floor scheduling. You usually change capacity orders into production orders at a later

stage.

  Project order

A project normally is unique. A project order combines the project steps that are carried out during

a project.

  Maintenance order

A maintenance order has been designed for the planning or recording of maintenance measures.

In general, orders are created in a higher level system (e.g. ERP system) and transferred to HYDRA using

an interface. Nevertheless, orders can also be created manually in HYDRA. Planning of orders (in the ERP

system or HYDRA) depends on precise requirements.

Orders are mostly multi-level and divided into several operations to be processed on different workplaces

and machines. The order and operation are generally logged on to the shop floor terminal at the individual

workplace. Data can only be posted onto operations at shop floor terminals if a corresponding pool of orders

exists in the HYDRA database.

The  terms  'order'  and  'operation'  are  mostly  synonymous  in  the  handbook  descriptions.  Usually,  when

posting  functions  on  the  terminal  are  being  described,  the  operation  is  meant,  and  documentation  on

HYDRA shop floor data collection also emphasizes operation data. Only in certain HYDRA descriptions is

the 'Order' used as an umbrella term for the whole multi-level production order.

Person - who is working?

The relation to the machine and operation is established in HYDRA by logging staff on and off at shop floor

terminals. The work confirmations of employees form a basis for the calculation of personal expenses and

for performance determination. With the logon or logoff of staff, you are informed who is working, where

the person is working and what is done.

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 2 of 7

Fields of Application BDE

The relation of a posting to an employee is mostly optional. The logging on and off of production personnel

is subject to fundamental decisions which are made before an MES system is introduced. HYDRA usually

only allows those employees to log on, who are stored in the HR master data of the HYDRA database and

authorized in the company.

1.3  Presentation of recording results

The components of data collection  - machine, order,  person,  - are summarized  to the  greatest possible

extent in logical dialogs. Consequently, an employee may, for example, log on and off to and from a terminal

together with an order.

Decisions as to the design of individual dialogs on the shop floor terminals depend on the environment in

which  it  is  used,  the  industry  sector,  the  organization,  the  range  of  items,  the  order  structure  and  the

machinery involved.

The data collection options in HYDRA represent a range of exemplary uses, which are supported by the

modules  of  the  standard  system.  A  single  installation  requires  only  one  selection  of  the  possible

configuration options. Individual HYDRA settings are finalized by the HYDRA user, usually together with an

MPDV consultant, after successful installation and in the course of customizing.

1.3.1

Time recording

"Posting events" on shop floor terminals form the basis for the posting of particular machine times to an

operation. A time posting is initiated by the posting event "logon" and completed logically by the posting

event "logoff" or "interruption". This basic principle applies to all order and personnel posting events.

The  time  posting  of  shop  floor  data  collection  primarily  occurs  in  two  different  time  accounts,  one  for

machine scheduling duration and the other for labor utilization.

The  machine  time  is  specified  by  the  time  interval  between  the  logon  and  logoff  of  an  operation.  The

machine scheduling time is harmonized with the shift calendar of the machine. Planned shift breaks are not

included in the time interval calculation.

Personnel deployment represents the total of all labor times for each operation. This period is determined

by the time interval between logon and logoff of the user or users. The basis for personnel postings is, once

again, the shift model of the workplaces and the breaks it contains. If employees are processing more than

one order simultaneously, then the HYDRA system carries out a proportional calculation of the operating

time for each operation.

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 3 of 7

Fields of Application BDE

For further details on this please refer to the section entitled "posting of times".

The results are documented in "log records" that are generated automatically due to posting events.

1.3.2  Recording quantities

Quantities are separately maintained in HYDRA for each data collection level: machine, order, and person:

-  Machine related

e.g. for display of the shift performance in the machine efficiency report

-  Operation related

e.g. for display of the target-actual comparison in the order information

-  Personnel related

e.g. as the basis for incentive pay based on quantities

Depending on the data collection type, quantities are either entered automatically (MDE/BDE terminal with

counter connection) or must be entered manually.

Manual quantity postings are carried out in the entry dialog at the end of personnel or order processing

or as partial confirmation/upload during  order processing. Depending on the  objective, the entry  dialogs

Interrupt operation, Logoff operation, Logoff person and Partial confirmation/upload are configured for the

input  of  quantities.  Quantities  that  are  recorded  manually  are  always  posted  onto  the  operation  that  is

logged on. Posting  onto the person realizing the posting depends on the posting type or the respective

parameter settings configured in HYDRA.

Along with manual entry of quantities, HYDRA also  supports automatic entry of quantities with active

machine data collection. With this type of entry of quantities, a continuous quantity posting to the machine,

and to the logged on operation and the logged on employees takes place at cyclical intervals.

All OPs and employees logged on to the machine are automatically assigned quantities. The quantities are

computed according to the partitioning/cavity that is respectively defined for the operation and is posted

onto the operations or persons.

HYDRA  provides  different  accounts  for  quantity  posting.  The  accounts  that  are  predominantly  used  are

yield and scrap. The two fields are provided appropriately during data collection. Scrap quantities can be

classified by a scrap reason. The available scrap reasons are configured in HYDRA.

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 4 of 7

Fields of Application BDE

Other quantity accounts are Rework and Open quantity. These are usually only used specifically in form of

customer-specific scenarios; the fields are provided as part of the customizing process.

1.3.3  Options of Machine Data Collection

If you connect a machine to a shop floor terminal, the automatic data collection is possible.

-

-

Collection of production times and downtimes

  Direct  assignment  of  malfunction  reasons  by  collecting  operating  signals  from  machine  control

systems

-

Piece number recording for yield, total quantity and scrap

Every  workplaces  and  machine  is  assigned  a  shift  model  in  the  HYDRA  configuration.  The  shift  model

determines the capacity of the machine and gives the shift calendar a reference time for the performance

of  a  machine.  All  machines  for  which  recording  of  standstills  is  carried  out  in  HYDRA,  have  a  definite

machine status at all times during the shift. The total of all production and downtimes during a shift gives

exactly the shift standard time.

Definition of downtime reasons

The determination of the relevant machine statuses forms the basis of machine monitoring by means of

machine signals. Together with the "production" status all data collection relevant downtime reasons for the

machine are created in HYDRA. The user may configure them individually.

Classification in HYDRA resource performance accounts (RPA)

HYDRA resource performance accounts are a system of time accounts, consisting of 12 accounts. They

group  together  similar  downtime  reasons  in  a  single  account  (e.g.  all  technical  disturbances  go  in  the

"disturbance-caused  interruptions"  (DCI)  resource  performance  account).  During  data  collection,

accumulating times are posted to the resource performance account to which the current machine status

is assigned in the system configuration.

The standard definition of the HYDRA resource performance accounts is as follows:

No.  Acronym

Description

s

1

SUT

Secondary utilization time

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 5 of 7

Fields of Application BDE

No.  Acronym

Description

s

2

3

4

5

6

7

8

9

10

11

12

DCI

Disturbance-caused interruption (= technical interruption)

LCI

Logistics-caused interruption (= organizational interruption)

SCI

Staff caused (personnel related) interruption

IMN

Idle mode, not scheduled (e.g. repairs)

IMS

Idle mode, scheduled (e.g. maintenance)

SET

Setup

STA

Startup

U8

Free for user (e.g. trial production)

U9

Free for user

MUT  Main utilization time; "Production"

BKS

Neutral times, e.g. free, breaks etc.

If recording of downtimes is not required or if the recording of downtime reasons gives no clear result (e.g.

for  HYDRA  group  workplaces),  then  time  recording  generally  takes  place  with  Production  status  and  is

represented in the MUT main utilization time performance account.

The HYDRA resource performance accounts are also kept relating to operations and persons. Machine

scheduling times (machine duration) for operations and personnel result from the following calculation:

Scheduling time = total (RPA 1 .. RPA 11).

Automatic recording of number of pieces using machine signal connection

Recording a cyclical signal from the machine enables the recognition of downtimes, and by counting the

recorded cycles it is also possible to record the number of pieces produced.

To  ensure  an  accurate  determination  of  the  number  of  pieces,  HYDRA  supports  the  multiplication  of

recorded  cycles  with  multiple  accesses  per  cycle.  "Partitioning"  (also  called  cavity)  is  a  tool  specific

parameter, which is transferred to the terminal when an operation is logged on.

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 6 of 7

Automatically recorded data are posted as machine performance in HYDRA and simultaneously assigned

to the operation and personnel currently logged on.

Fields of Application BDE

Collection

operation-related

Personal

actual quantities

machine times

Labor utilization

X

X

X

X

X

X

Fields_of_application_for_HYDRA-BDE.docxVersion: 1.1.23326

Page 7 of 7

