Configuration of Campaign Production

1  Configuration of Campaign Production

Overview

The function Generate campaign included in HYDRA shop floor scheduling (HLS) offers the option to group

operations in campaigns if the operations have one specific criterion in common.

In the following, find the necessary configurations to use the function Generate campaign.

Configuration of comparison criterion for campaigns

Menu

System administration  System settings  Advanced object configuration

Transaction code

adoc

Function authorization

adoc.*

Create comparison criteria for campaigns in the Advanced object configuration. Define the following values

for new objects:

Parameter

Object type

Value

MNR

Object ID 1

<workplace number>

Parameter

campaign

Parameter value  <comparison criterion>

The following table shows an example of such a configuration. If this configuration is enabled, the machine

50610 can group operations with identical article number (operation.article) in campaigns:

Object

Object ID 1  Object ID 2  Object ID 3  Object ID 4  Parameter

Parameter value

Active

type

MNR

50610

campaign  operation.article



The following table lists possible values for the comparison criterion.

formula.formula

operation.act.blocked

operation.act.first_logon_ts

operation.userfield01

operation.userfield02

operation.userfield03

HLS-KPG_Configuration.docx

Version:1.2.9523

Page 1 of 5

Configuration of Campaign Production

operation.act.fixed

operation.act.labor_utilization

operation.act.last_interruption_ts

operation.act.last_logoff_ts

operation.act.last_logon_ts

operation.act.last_posting_ts

operation.act.ordertype

operation.act.plant

operation.act.pre_production_indicator

operation.act.predecessor_status

operation.act.predecessor_status.led

operation.act.problem.base

operation.act.problem.primary

operation.act.problem.secondary

operation.act.problem.tertiary

operation.act.production_indicator

operation.act.remain_labor_utilization

operation.act.remaining_total_duration

operation.act.resource_status1

operation.act.resource_status2

operation.act.resource_status3

operation.act.resource_status4

operation.act.resource_status5

operation.act.resource_status6

operation.act.rework.base

operation.act.rework.primary

operation.act.rework.secondary

operation.act.rework.tertiary

operation.act.rpa11

operation.act.rpa7

operation.act.scheduled

operation.act.scrap.base

operation.act.scrap.primary

operation.act.scrap.secondary

operation.act.scrap.tertiary

operation.act.secondary_status

operation.act.status

operation.act.status.led

operation.act.status.text

operation.act.status.textnumber

operation.act.total_duration

operation.act.unit.primary

operation.act.workplace

operation.act.yield.base

operation.userfield04

operation.userfield05

operation.userfield06

operation.userfield07

operation.userfield08

operation.userfield09

operation.userfield10

operation.userfield11

operation.userfield12

operation.userfield13

operation.userfield14

operation.userfield15

operation.userfield16

operation.userfield17

operation.userfield18

operation.userfield19

operation.userfield20

operation.userfield21

operation.userfield22

operation.userfield23

operation.userfield24

operation.userfield25

operation.userfield26

operation.userfield27

operation.userfield28

operation.userfield29

operation.userfield30

operation.userfield31

operation.userfield45

operation.userfield46

operation.userfield47

operation.userfield48

operation.userfield49

operation.userfield50

operation.userfield51

operation.userfield52

operation.userfield53

operation.userfield54

operation.userfield56

operation.userfield58

operation.userfield60

operation.userfield61

operation.userfield62

operation.userfield63

HLS-KPG_Configuration.docx

Version:1.2.9523

Page 2 of 5

Configuration of Campaign Production

operation.act.yield.primary

operation.act.yield.secondary

operation.act.yield.tertiary

operation.article

operation.articledesignation

operation.color

operation.commentary_indicator

operation.company

operation.costcenter

operation.costtype

operation.customerdesignation

operation.cycle.actual

operation.cycle.target

operation.default_value2

operation.delivery_time

operation.designation

operation.dnc

operation.earliest_end_ts

operation.earliest_start_ts

operation.employee_ratio

operation.employee_ratio_setup

operation.external_priority

operation.external_processing_indicator

operation.id

operation.input_component_list

operation.inspection_time

operation.last_operation

operation.last_scheduled_ts

operation.latest_end_ts

operation.latest_start_ts

operation.lead_time

operation.max_number_of_split

operation.max_wait_time

operation.mother_operation

operation.userfield64

operation.userfield65

operation.userfield66

operation.wait_time

operation.waiting_time

operation.workplace_group

operation.workplan

order.act.userfield45

order.act.userfield49

order.article

order.articledesignation

order.batch_number

order.company

order.delivery_time

order.designation

order.dnc

order.earliest_end_ts

order.earliest_start_ts

order.external_priority

order.external_processing_indicator

order.id

order.latest_end_ts

order.latest_start_ts

order.mrpcontroller

order.ordergroup

order.orderindex

order.ordertype

order.plan.buffer_time

order.plan.end_ts

order.plan.start_ts

order.plan.yield.base

order.plannedorder

order.processing_time

order.projectnumber

operation.number_of_personnel_requirements_in_resources

order.salesorder

operation.operation

operation.operation_link_type

operation.operation_position

operation.ordertype

operation.partitioning.target

operation.plan.buffer_time

operation.plan.demand

operation.plan.end_ts

operation.plan.scrap.base

order.salesorder.item

order.scheduled_end_ts

order.scheduled_start_ts

order.scheduling_indicator

order.scheduling_type

order.setup_time

order.teardown_time

order.type

order.userfield01

HLS-KPG_Configuration.docx

Version:1.2.9523

Page 3 of 5

operation.plan.scrap.primary

operation.plan.scrap.secondary

operation.plan.scrap.tertiary

operation.plan.start_ts

operation.plan.te

operation.plan.teb

operation.plan.tr

operation.plan.trb

operation.plan.unit.base

operation.plan.unit.delivery

operation.plan.unit.primary

operation.plan.unit.secondary

operation.plan.unit.tertiary

operation.plan.workplace

operation.plan.yield.base

operation.plan.yield.primary

operation.plan.yield.secondary

operation.plan.yield.tertiary

operation.plant

operation.processing_code

operation.processing_time

operation.production_variant_reference

operation.qualification

operation.qualification.setup

operation.remaining_runtime.formula

operation.remaining_runtime2.formula

operation.remaining_yield.primary

operation.responsibilityarea

operation.scheduled_end_ts

operation.scheduled_start_ts

operation.scheduling_indicator

operation.sequence

operation.sequencing_list

operation.setup_time

operation.setup_time.supplement

operation.sorting_ts

operation.split_indicator

operation.split_number

Configuration of Campaign Production

order.userfield02

order.userfield03

order.userfield04

order.userfield05

order.userfield06

order.userfield07

order.userfield08

order.userfield09

order.userfield10

order.userfield11

order.userfield12

order.userfield13

order.userfield14

order.userfield15

order.userfield16

order.userfield17

order.userfield18

order.userfield19

order.userfield20

order.userfield21

order.userfield22

order.userfield23

order.userfield24

order.userfield25

order.userfield26

order.userfield27

order.userfield28

order.userfield29

order.userfield30

order.userfield45

order.userfield53

order.userfield54

order.userfield60

order.workplan

orderstatus.color

ordertype.category

ordertype.consider_production_variant_in_planning

ordertype.consideration_setup_time

operation.splitting_authorization

planableoperations.campaign_number

operation.suboperation

operation.teardown_time

operation.tool

operation.transport_time

planableoperations.orderstatus.precedessor.color

planableoperations.planning1

planableoperations.planning2

planableOperations.remaining_runtime

operation.transport_time.minimum

processingcode.external_processing

HLS-KPG_Configuration.docx

Version:1.2.9523

Page 4 of 5

Configuration of Campaign Production

operation.transport_time.normal

processingcode.not_interruptible

operation.type

operation.underdelivery.percentage

operation.underdelivery.reaction

operation.unit_of_unit_quantity

processingcode.overlapping

processingcode.planning

processingcode.splitting_authorization

operation.material_type

Configuration of number range for campaign production

Menu

System administration  System settings  Number ranges

Transaction code

mdnumr

Function authorization

numr

Define the following number range for the campaign production:

Parameter

Value

Object

Key

Value

Type

Assignment
code

CAMPAIGNNO

SYSTEM

-

V

NUM

Prefix

C

Range from

00000000001

Range to

99999999999

Current value

00000000001

Please note: The length of prefix + range must not exceed the length of the MES order number.

Processing code

Menu

Master data  Order  Processing codes

Transaction code

pc

Function authorization  mdpc

Edit  the  processing  codes  that  should  be  controlled  by  the  campaign  control.  Select  tab  Posting.  Go  to

Terminate OP when reaching target quantity and enter K - Campaign control: Finish automatically and log

on subsequent OP of the same campaign. Save your settings.

HLS-KPG_Configuration.docx

Version:1.2.9523

Page 5 of 5

