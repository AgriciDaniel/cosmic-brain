Activating Waiting Period Processing

1  Activating Waiting Period Processing

Procedure

Workplace for waiting period processing

A  special  workplace  should  be  set  up  in  an  initial  step  and  it  should  be  clear  that  this  is  a  separate

workplace at which waiting periods will be processed.

Setting up a waiting period order

A waiting period order is set up using the edit orders menu option.

Because waiting period operations are not explicitly posted and are not meant to be confirmed/uploaded

to the PPS system in every case, these must be set up

  using order type GKP (to process personal waiting periods)

  using order type GKM (to process machine-related waiting periods).

Initially, the order will be set with the status "available (waiting period)".

Assigning operations to a waiting period order

An operation must now be assigned to the waiting period order. This is done by using the edit operations

menu option. When doing so, make sure that the workplace for waiting period processing that was set up

in the initial step is set in the field "workplace".

At  this  operation,  define  an  authorization  level  that  corresponds  to  the  authorization  levels  set  for  the

persons listed in the HR master data.

Initially, the operation will be set with the status "available (waiting period)".

The operation is also assigned the processing code "GK".

Optionally, further waiting period operations may be created and assigned using the HR master.

Overhead  cost  operations  may  only  be  changed  if  they  are  not  active  at  the  moment,  i.e.  no

person or machine may currently be logged on to the OP.

Activating_Waiting_Period.docx

Version: 1.2.18468

Page 1 of 2

Activating Waiting Period Processing

Activating waiting period in the HYDRA basic settings

The waiting period operation that was just set up is then defined in the basic settings (combined order /

operation number). The waiting periods are posted to this operation. You cannot assign an operation with

a different order type.

Settings in HR master data

What is important for waiting period processing is that for each person for whom postings are carried out

by BDE that a year model and a workplace are defined for this person in the HR master data.

As a rule, the authorization level for order postings must be set to >  0 set for a person in the HR master

data so that waiting period processing is active for this person.

If during waiting period processing (PZE controls ADE in "Waiting period" mode; "Auto on" or "Out") the

operations  for  the  persons  are  automatically  interrupted  and  in  some  cases  logged  back  on  by  PZE

Out/In, then these persons must also have all authorization rights to post operations:

  Authorization "Log OP on" must be active.

  Authorization  level  "OP  postings"  for  the  person  must  be  greater  than  or  equal  to  the

authorization level of the operation.

Another option is to define a waiting period OP (order type GKP) to which waiting periods should be

posted.

Activating_Waiting_Period.docx

Version: 1.2.18468

Page 2 of 2

