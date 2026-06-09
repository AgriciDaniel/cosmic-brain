Production Variants

1  Production Variants

Overview

Menu

Master data  Production control  Production variants

Transaction code

prodvar

Function authorization

prodvar

Purpose

You can use the function to create or modify production variants in the system.

Integration

You  can  use  production  variants  to  define  different  options  for  specific  articles.  The  system  integrates

these  options  during  planning  in  HYDRA  Shop  Floor  Scheduling  (HLS).  You  can  define  different

production  variants for one article/item. An alternative production variant must exist for the article, if the

order  type  specifies  that  production  variants  are  used  for  planning.  Otherwise,  you  cannot  plan  the

operation for the machine.

If  you  do  not  want  to  use  production  variants  for  all  areas,  they  can  be  "skipped"  for  single  groups.

Consequently, the Group configuration takes priority over the order type configuration.

An exceptional case occurs if "N" - no utilization" is configured for the order type. In this case, production

variants  are  generally  not  used for this order type. The  group configuration  does not  have any  effect in

this case.

Selection criteria

The application provides the following selection criteria:

Article

The system searches for production variants available for the entered article/item.

Workplace

Number of the workplace / machine where you can manufacture the article with the resource.

Workplace group

Number of the capacity group where you can manufacture the article.

Resource

Resource (number) you can use to manufacture an article as part of a production variant.

MOC_ProductionVariants.docx

Version: 1.9.18468

Page 1 of 5

Production Variants

If you want to include a resource (e.g. tool) in checking for valid production variants and in planning,

you  should  specify  the  resource  here,  otherwise  leave  the  field  empty.  You  cannot  define  a

production variant at the same time for both a resource and a resource family.

Resource family

The system does not support this field when identifying production variants. You can merely use it

for comments.

Status (blocked/released)

Possible values describing the current status of a production variant.

Only  one version  at a time may have  a status  value  of  Released per  production variant.  You can

use this field to filter by released or blocked production variants.

Detail application "production variants"

The table view of the detail application offers an overview of existing entries.

Field description

Article

Article number of the article to be manufactured.

The article number length is restricted to 15 characters if HYDRA ALS (interfacing to the ARBURG

host computer system) is used.

Article designation/name

Name of the article.

Group

Number of the workplace group where the article can be manufactured with the tool.

Complete  this  field  in  any  case,  even  if  the  production  variant  should  only  be  based  on  the

combination of Article and Workplace.

Workplace

Number of the workplace / machine where you can manufacture the article with the resource.

Leave this field empty, if the production variant should only be based on the combination of  Article

and Group.

Resource type

Type  of  the  resource  you  can  use  to  manufacture  an  article  as  part  of  a  production  variant.  The

system only supports the resource type "WNR".

MOC_ProductionVariants.docx

Version: 1.9.18468

Page 2 of 5

Production Variants

Resource

Resource (number) you can use to manufacture an article as part of a production variant.

If you want to include a resource (e.g. tool) in checking for valid production variants and in planning,

you  should  specify  the  resource  here,  otherwise  leave  the  field  empty.  You  cannot  define  a

production variant at the same time for both a resource and a resource family.

This  is  a  key  field  if  the  interfacing  to  the  ARBURG  host  computer  system  (ALS)  is  used.  The

resource number length (tool number) is restricted to 15 characters in this case.

Resource family

The system does not support this field when identifying production variants.  You can merely use it

for comments.

Please observe the following restrictions:



If  you  create  a  new  production  variant  and  assign  a  resource,  the  resource  family  is  not

automatically taken from the pool of resources.

  The system does not check whether the resource family is valid. In case of doubt, you can

select the resource family via the search dialog.



If  you  change  a  resource  family  for  a  resource  in  the  pool  of  resources,  the  system  does

not synchronize this with the production variant.

Number of resources

The number of resources required for the production variant.

Machine/operator relation for setup/production including qualifications

Define  the  personnel  requirements  that  are  needed  for  setting  up  or  producing  the  operation

including the relevant qualification.

You  cannot  use  a  production  variant  to  reset  (set  to  zero)  the  workforce  requirements  previously

defined for the OP.

You can define the machine/operator relation for production variants as of SP13 and

HLS-FFV  8.2.  Existing  customers  who  want  to  use  the  fields  must  execute  the

database patch provided by SP13.

Priority

Priority for identifying the production variant. A higher value stands for a higher priority.

Version

You can use this field (as part of the key) to assign version numbers to  production variants. Enter

"1" at the very left of the field if versioning is not used.

Only one version of a production variant at a time may have the "released" status (cf.  Status field

description).

MOC_ProductionVariants.docx

Version: 1.9.18468

Page 3 of 5

Target cycle

Target cycle for machine monitoring in MDE. This value is defined per 1000 machine cycles.

The system keeps the target cycle defined for the operation, if you enter 0 in the "target cycle" field.

Production Variants

Admissible deviation

Reserved.

Partitioning

Number of the quantity  produced during one machine cycle. For  each machine  cycle,  the system

enters/posts a quantity produced that corresponds to the partitioning value.

The system keeps the partitioning defined for the operation, if you enter 0 in the "partitioning" field.

Setup time

When planning in HYDRA Shop Floor Scheduling, the system uses this value instead of the default

setup time value defined for the operation.

Please  note:  If  setup  time  is  stored  as  a  formula  for  the  operation,  the  setup  time  value  is

recalculated  each  time  you  change  the  group  manually  or  you  update  the  order.  In  this  way,  the

setup time value entered here can be overwritten again.

Teardown/retooling time

When planning in HYDRA Shop Floor Scheduling, the system uses this value instead of the default

teardown/retooling time value defined for the operation.

Please  note:

If  retooling/teardown

time

is  stored  as  a

formula

for

the  operation,

the

retooling/teardown  time  value  is  recalculated  each  time  you  change  the  group  manually  or  you

update  the  order.  In  this  way,  the  retooling/teardown  time  value  entered  here  can  be  overwritten

again.

Valid from

Date from which the production variant is valid.

Valid until

Date  up  to  which  the  production  variant  is  valid.  Enter  31.12.9999  here  if  the  production  variant

should be valid until further notice. The system does not update the "valid until" date if the status is

changed.

Status

Possible values describing the current status of a production variant:

F

S

Released

Blocked

MOC_ProductionVariants.docx

Version: 1.9.18468

Page 4 of 5

Production Variants

Only  one  version  at  a  time  may  have  a  status  value  of  Released  per  production  variant.  If  you

create a new production variant with the released status or if you change the status of an existing

variant to released, HYDRA checks whether an existing production variant has already the released

status. If so, the existing version is automatically set to the blocked status.

Blocking reason

You can enter a numeric blocking reason here if a production variant is set to the "blocked" status.

Comment

Comment field for this production variant.

Toolbar

 Generate order

Use  the  "generate  order"  function  to  create  orders  from  work  plans  based  on  the  specified

configuration.

Activation of production variants

You  can  configure  in  the  order  type  if  you  want  to  use  production  variants.  Select  the  order  type  and

modify the entry for "consideration of production variants in planning".

Consideration of production variants in planning:



Identification (E): you can select from existing production variants.

  Checking only (P): the system only checks whether a valid production variant exists.

  No use (N): the system does not check the production variants.

MOC_ProductionVariants.docx

Version: 1.9.18468

Page 5 of 5

