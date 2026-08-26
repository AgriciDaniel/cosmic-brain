Wage type determination

1  Wage Type Determination

Overview

Menu

Master data  Incentive wage  Wage type determination

Transaction code

wtdet

Function authorization  wtdet.*

You  use  the  Wage  type  determination  to  assign  the  wage  type  to  the  time  tickets  that  are  allocated

individually  for  each  person.  To  identify  the  relevant  wage  type,  you  create  a  set  of  rules  that  are

processed in a specified sequence. Using these rules, the wage type is identified which then controls the

further calculation of the incentive wage.

Example and explanation

Sequence 100: wage type from posting

The combination */* as reference/value means that this first rule uses the wage type of the original

posting.  With  BDE  personnel  postings,  this  is  the  wage  type  that  has  been  passed  from  the

operation to the personnel posting when the personnel posting has been recorded.

Sequence 110: wage type from operation if wage type is empty

The combination wage type/"" (empty) as reference/value means that this second rule only applies

if  the  time  ticket  does  not  yet  have  a  wage  type.  In  this  case,  the  wage  type  of  the  operation  is

passed to the time ticket. If the posting does not include an operation or if the operation does not

include a wage type, the wage type of the time ticket remains empty.

MOC_WageTypeDetermination.docx

Version: 1.1.17307

Page 1 of 5

Wage type determination

Sequence 120: assign wage type 4100 for overhead operations

This rule has the effect that wage type 4100 is assigned to all BDE personnel postings that include

an overhead cost operation, regardless the wage type that is currently specified for the time ticket.

The category of the BDE order type specifies if it is an overhead cost operation.

The special function authorization "wtdet_foreman" has been created for users who must make

small changes to the Wage type determination in the day-to-day business to integrate specific

exceptional  situations.  It  is  a  limited  function  authorization.  Users  with  this  function

authorization have less rights than users without this limited function authorization.

Users with the function authorization "wtdet_foreman" can only edit the following rules:

•

•

Conditions for persons, machines, machine groups or premium groups

Sequences from 500 to 600

With  this  function  authorization,  the  user  can  remove  single  persons  or  machines  from  the

piecework or the group incentives. The user can view other data records, but not edit them. The

system  rejects  unauthorized  editing  attempts  and  issues  the  error  message  No.  1923  "Not

authorized for this sequence or condition".

If you want to create and edit system configurations for sequences below 500 and above 600,

the user must be the system administrator (without the function authorization "wtdet_foreman").

The initial data of the system contain the function authorization "wtdet_foreman" in the function

profile "LLE user". Use the function profile "LLE admin" for users who must be fully authorized.

The function profile "LLE admin" includes all authorizations of the profile "LLE user".

Optionally,  you  can  also  delete  the  function  authorization  "wtdet_foreman"  from  the  function

profile "LLE user".

Field description

Sequence

The  rules  are  processed  according  to  the  specified  sequence.  If  several  rules  contain  the  same

entry in field Sequence, then the sorting is performed using the condition/value 1 to 5, the source of

the wage type and the wage type.

Comment

Free comment field

Valid from/until

You can use these two fields to limit the validity period of rules.

MOC_WageTypeDetermination.docx

Version: 1.1.17307

Page 2 of 5

Wage type determination

Assign wage type

This  setting  specifies  the  wage  type  that  is  assigned  to  the  time  ticket  if  the  rule  is  applied

(according to the specifications made).

The specified wage type: the wage type specified in the field below is assigned.

From posting: the wage type passed with the posting is assigned. The posting itself is based on

the time ticket. The wage type is usually the wage type of the BDE personnel posting.

From  operation:  the  wage  type  stored  with  the  operation  is  identified  and  assigned  to  the  time

ticket.

From HR master data: the wage type stored in the  HR master data is identified and assigned to

the time ticket.

If – conditions 1 to 5

Using up to five conditions, you can control when the rule is applied. All conditions specified must

be true. Only then the rule comes into effect. The following conditions with the respective values are

Available with function
authorization
wtdet_foreman

X

X

X

X

available:

Reference

Value

Machine

Machine number

Machine group  Machine group

Person

Personnel number

The person's
cost center

Cost center of the person defined in the HR
master

Cost center of
the posting

Premium group

Cost center of the posting

Premium group
The value "*" is permitted. This means that the
rule always applies, if a premium group is
entered in the posting.
The value "" (empty) is also permitted. This
means that the rule applies, if no premium
group is entered in the posting.

Premium
indicator

Premium indicator defined for the person in the
HR master

Incentive wage
indicator

Piecework
indicator

Order type

Incentive wage indicator of the machine

Piecework indicator of the operation

Order type (e.g. is used to assign overhead
cost orders to a different wage type)

Category order
type

Order type category (e.g. is used to assign
overhead cost orders to a different wage type)

MOC_WageTypeDetermination.docx

Version: 1.1.17307

Page 3 of 5

(cid:129)

Wage type determination

Premium group
type

Wage type

(none)

Premium group type

Wage type
Wage type that has been assigned to the
posting up to now (for changes). Empty value
is permitted.

Always
This reference does not restrict the rule, the
rule always applies.

MOC_WageTypeDetermination.docx

Version: 1.1.17307

Page 4 of 5

Editing functions

The following dialog opens to edit a data record:

Wage type determination

MOC_WageTypeDetermination.docx

Version: 1.1.17307

Page 5 of 5

