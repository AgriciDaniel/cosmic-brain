Manual

MES Development Suite MLE
MDS-MLE 8.1

Version 1.1.23347

Letzte Änderung: 22.09.2020

MES Development Suite MLE

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 2 von 40

MES Development Suite MLE

Contents

1  MLE Customizing - Overview ....................................................................... 4

2  MES Link Enabling - Overview..................................................................... 5

2.1  Basics ................................................................................................................. 5

2.2  System structure ................................................................................................. 5

2.3

Integration with other HYDRA modules ............................................................... 7

3  MES Link Enabling - Principles .................................................................... 8

3.1  Basics of MLE communication ............................................................................ 8

3.1.1  BAPI basics ............................................................................................. 8

3.1.2  BAPIs and commands ............................................................................. 8

3.1.3  Dialog strings ........................................................................................... 9

3.1.4  Customer-specific acronyms/variables .................................................. 10

3.2  MLE concepts ................................................................................................... 11

3.2.1  Dialog data strings ................................................................................. 11

3.2.2  Memory variables .................................................................................. 12

3.2.3  Formulas/conditions .............................................................................. 13

3.3  System structure ............................................................................................... 14

3.4  Namespaces ..................................................................................................... 15

4  MLE Basic Configuration ............................................................................ 16

5  MLE Segment Configuration ...................................................................... 19

6  MLE Field Configuration ............................................................................. 24

7  MLE Formula/Conditions ............................................................................ 30

8  SAP Order Sequencing .............................................................................. 35

9  SAP Upload ................................................................................................ 37

10  Activity Types SAP ..................................................................................... 39

MDS-MLE_81.docx

Version: 1.1.23347

Seite 3 von 40

MES Development Suite MLE

1  MLE Customizing - Overview

Fields of Application

The MLE Customizing provides several functions and options to extend existing interface and / or create

new interfaces.

Implementation Notes

You use MLE Customizing when:

  You want to change / extend existing interfaces

  Create new interfaces

Integration

The MLE Customizing allows changes and extension in the MLE layer, which is used to  provide data for

the entire system.

Features

  Several functions and options to extend existing interfaces and / or create new interfaces

MDS-MLE_81.docx

Version: 1.1.23347

Seite 4 von 40

MES Development Suite MLE

2  MES Link Enabling - Overview

2.1  Basics

Today modern IT environments rarely consist of so-called “stand-alone” systems. Networking of different

systems instead becomes more and more important. A multitude of interfaces, which have to be planned,

realized and serviced afterwards, is involved in the networking. At the same time, the requirements with

respect to reliability constantly increase while implementation times are reduced.

The HYDRA function MES Link Enabling (MLE) allows for this situation. MLE renders it possible to easily

create  interfaces  from  partner  systems  to  transfer  data  to  HYDRA.  In  this  context,  MLE  works  as

middleware analyzing incoming data and preparing them in order that they can be transferred to HYDRA

via the HYDRA BAPI standard interface and can be posted there. Transferring data via the HYDRA BAPI

guarantees that data are processed and posted uniformly in HYDRA, irrespective of the fact whether they

have been changed manually in the system or whether hey have been transferred by external systems.

This document describes the structure and mode of operation of the MES Link Enabling and shows how

and by way of which mechanisms the transferred data can be prepared and formatted.

2.2  System structure

MLE  constitutes  the  middleware  between  the  communication  level  via  RFC/Idoc  or  file  transfer  and

posting  via  the  HYDRA  BAPI.  As  such,  it  uses  the  data  provided  by  the  RFC  server  or  file  server.  It  is

started from the distribution model of the HYDRA MLE communication. In this context, a the one hand the

processing  program  is  started  but  on  the  other  hand  it  is  also  indicated  which  specific  variant  is  to  be

used to prepare original data. A variant summarizes the specific rules for transferring data. On the basis

of this variant data are prepared into a format that is suitable for HYDRA-BAPI in order to be able to be

posted afterwards.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 5 von 40

MES Development Suite MLE

Within the MES Link enabling configuration is based on four levels:

Basic level

The basic level is the highest level of an MLE configuration (of one variant). The definition whether

a message type is to be processed transactionally or not is an essential characteristic.

Segment level

One or several BAPIs are assigned to each segment for execution on the segment level. Within the

segment level the execution order of the BAPIs can be determined.

Field level

The field level describes which places (from/to) of a data record correspond to which BAPI acronym

and  thus  finally  which  database  field.  If  the  types  have  to  be  converted  when  it  comes  to  the

assignment of acronyms they are defined here.

Level of conditions

By way of the condition level fields can be (re)calculated on the basis of original data or their values

can be changed depending on certain inspections.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 6 von 40

MES Development Suite MLE

2.3

Integration with other HYDRA modules

Communication  with  partner  systems  is  configured  via  the  HYDRA  MLE  communication.  For  detailed

information  on  the  maintenance  of  these  data,  please  refer  to  the  configuration  of  MLE  communication

(hyd-mlek.pdf) document.

The current variants included in the scope of delivery of HYDRA are respectively  described in separate

documents, for example the documents HKMPP-PDC.pdf as well as HYD-PPS_72.pdf.

When posting data via MLE errors may occur. They can be caused by the posting program, for example,

in  case  the  variant  indicated  within  the  MLE  distribution  model  is  not  available.  Moreover,  errors  may

appear  when  posting  the  data.  This  can  be  the  case  when  not  all  data  required  for  the  posting  are

available  or  if  there  are  other  reasons  that  are  opposed  to  the  data  being  posted.  In  these  cases,  the

update program – HYDRA BAPI – displays an error code that defines the posting error. Provided that the

escalation management module is licensed, this error code can be forwarded to it and analyzed there.

The  formulas  used  in  the  level  of  formulas  and  conditions  are  filed  in  the  cross-module  formula

management.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 7 von 40

MES Development Suite MLE

3  MES Link Enabling - Principles

3.1  Basics of MLE communication

Irrespective of whether it is an SAP Idoc or a file interface, MLE communication is based on a data record

consisting of 1000 characters. Depending on the content of the interface in use all 1000 characters may

be filled with user data or even less.

Normally,  there  are  no  data  field  labels  within  these  data  strings.  This  means  that  it  is  not  possible  to

recognize the type of any place of the data record by merely considering the data record.

The  segments  or  segment  names  have  been  designed  to  differentiate  between  the  different  structures

within the data string. This name uniquely defines the data string structure. Consequently, statements on

the content of a data record can only be made if the segment is known (which segment name).

For  this  reason,  within  the  scope  of  MLE  segment  names  control  the  processing  within  data  packets

(IDocs).

3.1.1 BAPI basics

Posting  data  on  the  database  is  based  on  general  guidelines  securing  consistency  and  uniformity.

Therefore, all writing accesses to the database are carried out by programs providing a  unique interface

for this purpose.

Consequently,  every  writing  access  to  the  HYDRA  database  is  carried  out  by  programs  with  a  defined

interface,  irrespective  of  whether  they  are  started  in  the  HYDRA  application  or  from  external

applications/systems.

Essentially, this is the HYDRA BAPI. Within the scope of the MES Link Enabling this one is used to post

the data transferred to HYDRA from superior systems.

3.1.2 BAPIs and commands

In HYDRA such a BAPI generally exists for each object (that can be maintained via the  HYDRA client).

Objects  in  this  context  may  be  a  (production)  order  or  master  data  records.  Furthermore,  there  are

different methods for each of such objects to access them. In the simplest case it is a method to create

(INSERT), change (UPDATE) and delete data records (DELETE).

In more complex cases or if the application requires it further methods are also implemented. This may be

modified methods summarizing the insertion and changing or further, application-specific methods.

Such a BAPI is started via the so-called dialog command, which is structured as follows:

MDS-MLE_81.docx

Version: 1.1.23347

Seite 8 von 40

MES Development Suite MLE

<Object>.<Method>

In  the  following  please  find  an  exemplary  summary  (making  no  claim  on  being  exhaustive)  of  available

objects and their selected methods.

Object

ANR

MNR

FERTVAR

RES

Methods

INSERT

UPDATE

DELETE

MODIFY

INSERT

UPDATE

DELETE

INSERT

UPDATE

DELETE

INSERT

UPDATE

DELETE

Comment

The  ANR  object  designates  the

order.

The  MNR  object  designates

machines/workplaces.

The

FERTVAR

object

designates production variants.

The  RES  object  designates  the

resources of the WRM module.

3.1.3 Dialog strings

Having started the BAPI initially via the command user data are transferred in the so-called dialog string

or dialog data string. User data are uniquely identified within the dialog string by way of IDs, also known

as acronyms.

Such an acronym may represent at least one database field or may have a controlling function in terms of

posting purposes. An equals sign “=” and the value transferred for this acronym follows the acronym. The

single  acronyms  and  their  values  are  separated  by  each  other  as  well  as  from the  dialog  command  by

pipes “|”.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 9 von 40

MES Development Suite MLE

3.1.4 Customer-specific acronyms/variables

MPDV  defines  the  acronyms  for  HYDRA  standard  BAPIs.  Moreover,  the  BAPI  processes  unknown

acronyms without issuing an error message.

In the course of programming an MES Link Enabling variant it could be required to buffer certain values

while processing a data record, for example, to be able to recalculate values or to reassign fields subject

to conditions.

The MES Link Enabling function does not provide explicit variables for this purpose. However, there is the

possibility to benefit from the above-mentioned properties of the HYDRA BAPI. For this purpose, optional

acronyms can be used to collect data in a first step. In a second step, they are manipulated and assigned

to an acronym via which posting takes place then.

Please note in this context that MPDV cannot guarantee that the acronyms chosen individually will not be

interpreted  and  posted  by  the  HYDRA  BAPI  at  a  later  point  in  time.  To  prevent  this  it  is  urgently

recommended to use such acronyms only within the customer name space.

The customer name space is identified by the prefix “U:”, which means that all acronyms starting with “U:”

are protected from being used within and by the HYDRA standard. Moreover, it has to be guaranteed that

these acronyms are not utilized within the HYDRA script extensions of the HYDRA standard BAPIs. For

this reason, the naming convention

U:MLE_<designation >

should be kept.

In the following please find an example for this procedure:

A single string should be composed of several places of a data record. Only this one should be posted,

the individual strings should not be posted.

Acronym

Place from

Place to

Meaning

U:MLE_AKRONYM_1

1

U: MLE_AKRONYM_2

22

U: MLE_AKRONYM_3

34

U: MLE_AKRONYM_4

127

U: MLE_AKRONYM_5

189

10

23

38

135

195

Interface fragment

Interface fragment

Interface fragment

Interface fragment

Interface fragment

MDS-MLE_81.docx

Version: 1.1.23347

Seite 10 von 40

Acronym

Place from

Place to

Meaning

ANR.ATKBEZ

0

0

Composite string

MES Development Suite MLE

The  acronyms  "U:AKRONYM_1"  to  "U:AKRONY_5"  are  created  within  the  customer  name  space  and

respectively  adopt  the  interface  fragments  assigned.  The  following  formula  is  defined  for  the

"ANR.ATKBEZ" acronym:

U: MLE_AKRONYM_1 + U: MLE_AKRONYM_2 + U: MLE_AKRONYM_3 + U: MLE_AKRONYM_4 + U:

MLE_AKRONYM_5

When it comes to posting the composite string of the ANR.ATKBEZ acronym is posted on the database.

The acronyms "U: MLE_AKRONYM_1" to "U: MLE_AKRONY_5" are ignored by the BAPI as they are not

known to it.

3.2  MLE concepts

The  mode  of  operation  of  MES  Link  Enabling  provides  numerous  options  to  manipulate  and  edit  data

transferred  from  other  systems  before  posting  them  in  HYDRA.  A  set  of  basic  concepts  is  used  in  this

context, which are described in the following sections.

3.2.1 Dialog data strings

As already explained, dialog data strings  constitute the basis for posting data in HYDRA. MLE provides

functions to generate these dialog data strings. A data string consisting of 1000 characters is the basis.

The data string can be identified by a segment name.

Within  MLE  the  BAPI  used  for  posting  is  defined  on  the  basis  of  the  segment  name.  n-BAPIs  can  be

defined for each segment, whereas the sequence of processing the different BAPIs is defined as well.

Relating  to  the  segment  name  and  the  BAPI  assigned,  it  is  defined  on  field  level  which  place  of  the

original data record – identified by “place from” and “place to” – is to be transferred with which acronym to

the  dialog  data  string.  Prior  to  the  transfer,  original  data  can  still  be  transformed  or  the  transfer  might

depend on certain conditions. Moreover, it is possible to recalculate values via formulas.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 11 von 40

MES Development Suite MLE

3.2.2 Memory variables

3.2.2.1  General

Customer-specific acronyms render it possible to include data contents in order to use them in formulas,

for example. However, this can only be used provided that processing is continued within the same data

record.  If  it  is  required  that  the  data  can  still  be  accessed  in  the  subsequent  dialog  string,  so-called

memory variables may be accessed within MES Link Enabling.

These are variables that do not only apply for the processing of a single data record but – based on one

data record – are also available for editing other data records.

Among other things, memory variables are always used if, for example, key values of a data record are to

be used to identify a subsequent data record in a hierarchical structure. Thus, they have been designed

to  save  data  records  across  all  segments.  Without  them  it  would  not  be  possible  to  edit  a  value  of  a

preceding segment.

Memory variables are configured on field level. It is possible to configure for each field whether it is to be

memorized or not (note field). Moreover, it can also be defined whether the value is only to be noted or

also to be added to the current dialog string (suppress field).

At run time memory variables are administered in a list that is structured as follows:

Segment name (C30) – Segment name [KEY 1]

Acronym (C40) – Acronym [KEY 2]

Value (C40) – Value

Memory variables may be read in two different ways. On the one hand, there is the direct access when

reading a field out (field source = ‘M’) and on the other hand when using the acronym within a function or

condition. When it comes to the processing of formulas and conditions it is always tried at first to fill the

variables  of  the  formula/condition  from  the  acronyms  of  the  dialog  string.  If  this  fails  the  list  of  memory

variables  is  searched.  Irrespective  of  the  context  in  which  the  memory  variables  are  to  be  accessed,

searching the memory variable list is identical – from back to front.

3.2.2.2

Processing logic

When memory variables are searched for in the list of memory variables it is always searched from back

to front, which means, the memory variable list is searched backwards and the first match is processed.

Thus, the most current value of an acronym is always in use.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 12 von 40

MES Development Suite MLE

In  theory,  it  might  be  the  case  that  two  acronyms  of  the  same  name  are  saved  in  the  list  of  memory

variables. If this is the case, the acronym inserted at last will be used. If this procedure leads to problems

in  practice, the indirect  way  via customer-specific acronyms can be applied. If the  value of a customer-

specific  acronym  is  then  to  be  assigned  to  a  standard  acronym,  this  can  be  realized  via  a  respective

formula.

Where are the fields of application of memory variables?

As already briefly mentioned, memory variables are used at two spots.

1) Data source:

In  general,  raw  data  are  cut  out  of  the  data  segment  when  editing  a  field  (field  configuration:

from/to). But there is also the option to configure  it in  such a way that a memory variable is used

instead (field configuration: field source). The acronym that is searched for is also defined within the

configuration (field configuration: acronym). If the acronym is found in the list its value is utilized to

continue processing.

2) Usage in functions and conditions:

The  second  option  is  its  use  within  functions  and  conditions.  In  this  context,  the  acronym  can  be

used as if it would be available within the current segment. When it comes later to the search for

unknown  acronyms,  at  first  the  current  dialog  data  string  and  then  the  list  of memory  variables  is

automatically searched for the acronyms used in the formula.

3.2.3 Formulas/conditions

It is often required to check single field contents with respect to their content or to recalculate them anew

or in a different way before they will be booked. In the MES Link Enabling function these requirements are

executed on the level of conditions. The formula management of HYDRA MES-Weaver is used as basis

in this context.

3.2.3.1

Formulas

On  the  condition  level  one  or  several  formulas/conditions  can  be  assigned  to  a  field,  which  enables

individual  calculations.  The

formula

itself

is  defined  within

the  HYDRA  MES-Weaver

formula

management.

The  computation  of  the  formula  is  triggered  by  transferring  the  complete  formula  incl.  acronyms,  e.g.

"ANR.SZY * 1000". The formula is parsed and unknown parameters (acronyms) are determined. Now the

triggering  routine  is  provided  with  them.  Having  filled  the  parameters  with  values  the  calculation  of  the

formula is restarted and the result is computed.

When the values for the parsed acronyms are determined it is proceeded as follows:

MDS-MLE_81.docx

Version: 1.1.23347

Seite 13 von 40

MES Development Suite MLE

At first, it is checked whether it is the current acronym of the field which is assigned to the formula. In this

case, the current value would be entered.

If it is not the current acronym the DLG string generated so far will searched for it.

If this fails as well the memory variables will be searched.

If this search is not successful either an error will be forwarded to ESK and the values will not be taken

over. (Processing of this field will be cancelled.)

If  the  acronym  can  be  found  as  described  above  it  will  be  used  as  new  input  value  of  the  calculation

routine and the next unknown acronym will be searched.

Provided that another step is defined within the configuration of formulas and conditions this one will now

be carried out. But now the newly computed result is to be entered. If no further step follows the result is

assigned to the acronym.

Please  note:  A  formula  may  only  contain  acronyms,  which  have  already  been  entered  in  this  BAPI

dialog, are currently being edited or are available within the memory variable list. If this is not the case,

the order of filling the DLG string has possibly to be changed.

3.2.3.2  Conditions

Conditions  are  checked  along  the  lines  of  calculation  functions.  Unknown  acronyms  are  found  and  are

made available for the triggering routine to enter real values. A condition is identified by the “B” ID within

the configuration.

In contrast to formulas, conditions, however, do not return a computed result but the values "TRUE" (the

condition is true) or "FALSE " / "0" (the condition is false). Depending on the inspection result the further

processing may  be  defined. In  this context, it is  differentiated  whether the result of the condition turned

out positive or negative.

3.3  System structure

MLE  ranks  between  the  communication  level  (below)  and  the  posting  level  (above).  Basically,  MLE

consists  of  a  processing  program.  This  program  analyzes  the  configuration  defined  in  the  database.  In

addition to this, it accesses other components of the HYDRA MES-Weaver.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 14 von 40

MES Development Suite MLE

3.4  Namespaces

To protect the customer application from being overwritten unintentionally  by  MPDV,  MLE  differentiates

between MPDV namespace and customer name space. The namespaces are distinguished by different

initial letters of the MLE variant.

Customer name space

Variants of the customer name space always start with “U:”, which is guaranteed by the system.

MPDV name space

MPDV  can  use  all  other  letters  and  numbers  to  designate  variants.  MPDV  does  never  deliver  a

standard variant to the customer name space.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 15 von 40

MES Development Suite MLE

4  MLE Basic Configuration

Overview

Menu

System  administration    MES  Link  Enabling  (MLE)    MLE  basic
configuration

Transaction code

mlebcfg

Function authorization  mlebcfg

Purpose

You use the application to create or change MLE variants in the system.

Integration

MLE variants are combinations of configurations used to process data in HYDRA inbound processing.

Requirements

Some of the functions require the development license MDS-MLE to be fully available. Without

development  license,  you  can  in  general  only  display  the  data,  but  not  change  the  data.  The

functions, which are only available with development license, are identified via (*).

Field descriptions

Message type

The  message  type  is  the  central  key  in  MLE  inbound  processing.  With  SAP  R/3,  the  type  is

specified by SAP. If other PPS systems are used, it is defined by HYDRA.

In the inbound processing, the MLE dispatcher uses the message type of the distribution model to

identify  the  current  variant  for  this  message  type.  The  MLE  Dispatcher  then  calls  the  processing

program with the message type and the variant.

Variant

The  variant  defines  a  specific  configuration  for  a  message  type.  A  variant  includes  all  relevant

settings  for  a  specific  message  type.  To  activate  a  variant,  the  variant  is  stored  in  the  MLE

distribution model. For each message type, different variants may be available.

By  default,  HYDRA  includes  several  variants  for  specific  interfaces.  These  variants  cannot  be

changed in the MLE configuration. If you want to change a variant according to your requirements,

this  variant  must  be  copied  to  the  customer  namespace.  This  namespace  starts  with  "U:".  The

system rejects changes in the MPDV namespace.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 16 von 40

MES Development Suite MLE

Message function

You use the message function to control the processing in detail. Using the message function, you

can externally identify the processing of data records without having to define different segments.

The message function is transferred to HYDRA as follows:

If  the  partner  system  is  an  SAP  system,  the  message  function  is  transferred  with  the  IDoc  from

SAP.

If  the  partner  system  is  a  PPS  system,  the  extension  of  the  file  provided  by  the  PPS  system

identifies  the  message  function.  The  documentation  of  the  MLE  Communication  (HYD-MLEK.pdf)

lists the message functions that are supported by MLE.

Processing

The processing defines whether the program formats data using the configuration and transfers it to

HYDRA or whether the complete processing is exported to a user exit.

Edit configuration:

The processing program takes all the data required for the transfer from the MLE configuration.

User exit

If  the  User  exit  (mle_verarbseg_in.hsc)  is  used  on  the  basic  level,  any  MLE  configuration  is

ignored and the user exit exclusively controls the data transfer.

The data records are transferred row by row from the inbound table (hysap_inbound_data) to

the user exit. Also the parameters message type (MESTYP), message function (MESFCT) and

variant are transferred. The user exit processes the rows using the segment name (SEGNAM)

and  writes  the  result  in  up  to  three  return  strings.  The  number  of  possible  BAPI  strings  is

therefore limited to 3 strings that are transferred to the server one by one.

NOTE:

It is not enough to set the option to User exit to implement the user exit. Further steps are

required.

Comment

You can use the comment to enter notes as free text.

Transaction

You use the transaction to control the transfer logic. This means that you can configure if an IDoc (a

transaction) is only transferred as a whole of if also parts can be transferred.

If an IDoc with transaction = "J" is transferred, the data records are only actually posted, if ALL data

records of the IDoc have been posted successfully. If this fails for only  one  data record, NO data

record of the IDoc is transferred.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 17 von 40

For  this  reason  it  is  recommended  to  do  without  transactional  brackets  with  interfaces  based  on

operations (HY72PPS / PP-PDC). With the transfer of master data, it can be useful to transfer all

MES Development Suite MLE

data records or none.

Toolbar

 MLE Segment configuration

You can show the Segment configuration for a selected data record.

Insert, Edit, Delete (*)

Use these functions to edit data records.

 Copy (*)

Use this function to copy an existing data record and create a new MLE variant in the system using

this copy.

You  can  only  copy  the  header  of  the  selected  basic  configuration  or  the  complete  configuration

including its structure.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 18 von 40

MES Development Suite MLE

5  MLE Segment Configuration

Overview

Menu

System administration  MES Link Enabling  MLE segment configuration

Transaction code

mlescfg

Function authorization  mlescfg

Purpose

The segment configuration is the configuration level used to store the BAPIs (e.g. ANR.MODIFY) that are

executed for the specified segment.

Integration

MLE variants are combinations of configurations used to process data in HYDRA inbound processing.

Requirements

Some of the functions require the development license MDS-MLE to be fully available. Without

development  license,  you  can  in  general  only  display  the  data,  but  not  change  the  data.  The

functions, which are only available with development license, are identified via (*).

Field descriptions

Message type

The message type refers to a message type created in the basic configuration.

Variant

The variant refers to a variant created in the basic configuration.

Message function

The message function refers to a message function created in the basic configuration.

Segment

The segment is the key on segment level. For each segment of an IDoc, you specify the BAPIs that

are called for this segment. The segment name must be identical to the segment name of the IDoc.

Hierarchy

A hierarchy level is assigned to each segment. The value "1" is automatically preassigned. This is

the highest hierarchy  level of an IDoc. You can assign more than one segment to each hierarchy

level.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 19 von 40

MES Development Suite MLE

You use the hierarchy level to specify the structures in an IDoc. This controls the processing. It is

therefore  possible  that  specific  segments  are  not  transferred  if  the  transfer  in  a  higher  hierarchy

level was not successful. Example:

If the system identifies for  an  operation that data  of this operation cannot be transferred because

the  operation  is  running,  then  the  transfer  of  segments  that  belong  to  this  operation  (e.g.

components) can be skipped.

To this end, you must combine the assignment of hierarchy levels and the definition of the segment

type "Special handling of OP".

Processing

The processing defines whether the program formats data using the configuration and transfers it to

HYDRA or whether the complete processing is exported to a user exit.

Edit configuration:

The processing program gets all data required for the transfer from the MLE configuration.

User exit

On segment level, three user exits can be used. Each user exit intervenes at a specified time in

the transfer process:

User exit before MLE processing (UB):

On  segment  level,  the  user  exit  (mle_modifysapdata_in.hsc)  provides  a  complete  SDATA

string. Further parameters that are transferred are message type (MESTYP), message function

(MESFCT)  and  variant.  The  user  exit  can  then  prepare  the  string.  Afterwards  the  string  runs

through the configured MLE process.

User exit instead of MLE processing (U):

If the user exit (mle_convsapdata_in.hsc) is used, the data records are transferred row by row

to  the  user  exit.  In  return,  BAPI  strings  are  expected  that  are  directly  posted.  Processing  via

MLE configuration does not take place.

User exit after MLE processing (UA):

If  the  user  exit  (mle_modifydlgstr_in.hsc)  is  used,  a  BAPI  dialog  string  created  by  the  MLE

configuration is transferred to the user exit. This dialog string can be modified in the user exit.

The  dialog  string  is  then  transferred  to  the  BAPI  for  posting.  MLE  does  not  perform  a  further

check and/or processing.

NOTE:

It  is  not  enough  to  set  the  option  to  User  exit  to  implement  the  user  exit.  Further

steps are required.

Call BAPI directly (B):

MDS-MLE_81.docx

Version: 1.1.23347

Seite 20 von 40

MES Development Suite MLE

You can also transfer data via MLE interface if the data is directly available in  HYDRA dialog

data format. An interpretation in the MLE layer is not required. In this case, you can set the flag

Call BAPI directly on segment level. The segment definition requires the following structure:

Field name

Transaction

Type

Description

Example

CHAR

20

Transaction ID (dialog ID in
HYDRA)

PNR.MODIFY

Description

CHAR

40  Plain text designation as

Download HR master

Data

CHAR

comment

940  Dialog data string for HYDRA  DLG=PNR.MODIFY|PNR.P
NR=12345678|PNR.KNR=0
0000001|
Details see section 2.3.1

If the flag is set on segment level, no further evaluation / processing of existing configurations is

performed on the field or condition level.

BAPI dialog

The  BAPI  dialog  describes  the  object  (order,  component,...)  and  the  kind  of  posting  made  for  the

object.

To store the BAPI, the following pattern is used: <object>.<method>. Example: "ANR.MODIFY" to

modify order data.

Segment sorting

You  can  use  the  segment  sorting  to  define  a  specific  sequence  of  segments.  The  sorting  is  not

fixed. You can change the sorting at a later time.

You  can  manually  define  the  segment  sorting.  Just  enter  the  respective  number.  If  you  do  not

change the default value ("0") in the field, the system automatically identifies the next consecutive

number. To identify the next consecutive number, the system uses steps of 10.

Currently, the segment sorting does not include a function.

BAPI sorting

You can use the BAPI sorting to define a sequence for the different BAPI calls that are filled with

the data of a segment. This is required if you want to transfer the order header and the operations

from a segment, for example. You can change the defined sorting at any time.

You can manually specify the BAPI sorting. Just enter the respective number. If you do not change

the default value ("0") in the field, the system automatically identifies the next consecutive number.

To identify the next consecutive number, the system uses steps of 10.

The  MLE  processing  program  prepares  the  dialog  strings  for  the  BAPIs  using  the  defined  BAPI

sorting and posts the strings in the defined order.

Consec. BAPI no.

The  consecutive  BAPI  number  can  be  assigned  manually  or  automatically  by  the  system.  This

number internally identifies a data record.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 21 von 40

It  is  recommended  to  assign  the  number  automatically.  In  this  case,  you  must  not  change  the

MES Development Suite MLE

default value ("0").

Segment type

The segment type is used to control the transfer.

Segment type " " (default):

The segment is processed according to the MLE configuration.

Segment type "Special handling of OP" (AS):

If  you  use  the  segment  type  Special  handling  of  OP,  the  processing  of  the  subsequent

hierarchy levels depends on the processing result of the currently configured segment.

As a result, the segments of a lower hierarchy level are not executed if the segment of a higher

hierarchy level could be posted. Example:

If  the  system  finds  out  that  you  cannot  make  postings  for  an  operation  (hierarchy  level  2)

because  it  is  running,  then  also  for  the  components  (hierarchy  level  3)  you  cannot  make

postings. The system cancels the processing of these segments. The next data record that is

executed,  is  a  segment  of  the  same  level  or  of  a  higher  (e.g.  "1")  hierarchy  level  than  the

operation.

BAPI call

The BAPI call defines how often a BAPI of a segment can be called.

Always run BAPI (A):

The  BAPI  is  executed  with  every  segment  processing.  How  often  a  BAPI  is  executed  is

therefore specified by the number of segments of this segment type per IDoc.

Run BAPI only once (O):

The  BAPI  is  executed  once  per  segment  AND  per  IDoc.  The  number  of  BAPI  runs  per  IDoc

does therefore not depend on the number of segments.

Delete flag

The memory variables are completely deleted if a segment of the same name is available a second

time.



Here, the memory variables of the segment are not deleted, but overwritten by new values.

Dialog data

In  the  dialog  data,  you  can  store  fixed  acronyms  that  are  transferred  with  each  BAPI  call.  Close

each acronym using "|". To store fixed dialog data, 100 characters are available.

If this is not enough, you can store further acronyms on field level.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 22 von 40

MES Development Suite MLE

Toolbar

 MLE field configuration

You can show the Field configuration for a selected data record.

Insert, Copy, Edit, Delete (*)

Use these functions to edit data records.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 23 von 40

MES Development Suite MLE

6  MLE Field Configuration

Overview

Menu

System administration  MES Link Enabling  MLE field configuration

Transaction code

mlefcfg

Function authorization  mlefcfg

Purpose

On field level, you specify the section of the data record that is assigned to a specific BAPI acronym. This

way, also the database field is specified where the data string section is stored.

Before  the  assignment  to  a  BAPI  acronym,  you  can  convert  the  data  to  the  HYDRA  data  format.  The

system provides a series of conversion routines to this end.

Integration

MLE variants are combinations of configurations used to process data in HYDRA inbound processing.

Requirements

Some of the functions require the development license MDS-MLE to be fully available. Without

development  license,  you  can  in  general  only  display  the  data,  but  not  change  the  data.  The

functions, which are only available with development license, are identified via (*).

Field descriptions

Message type

The message type refers to a message type created in the segment configuration.

Variant

The variant refers to a variant created in the segment configuration.

Message function

The message function refers to a message function created in the segment configuration.

Segment

The segment refers to a segment created in the segment configuration.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 24 von 40

MES Development Suite MLE

Consec. BAPI no.

The consecutive BAPI number links the field configuration to the segment configuration. Because it

is possible to call several BAPI calls per segment, the number is used to link to exactly one BAPI

call.

The consecutive BAPI number explicitly refers to the static, consecutive BAPI number and NOT to

BAPI sorting.

You  must  assign  this  value  with  the  first  field  configuration  of  a  segment.  With  all  further  field

configurations, this number is used as default value if an existing field configuration is selected.

Consec. field no.

The  consecutive  field  number  can  be  assigned  manually  or  automatically  by  the  system.  This

number internally identifies a data record.

It  is  recommended  to  assign  the  number  automatically.  In  this  case,  you  must  not  change  the

default value ("0").

Sort sequence

You  use  the  sort  sequence  to  build  a  BAPI  dialog  string  in  a  specific  sequence.  The  sequence

specifies  the  sections  of  the  data  string  that  are  first  cut  and  inserted  in  the  dialog  string.  The

sections are chronologically inserted in the specified sequence from left to right.

The sequence used to insert data into the dialog string is important if the values of a dialog string

are  offset  or  compared  using  formulas.  When  the  formulas  are  processed  (level:  condition

configuration), the variables used in the formula are searched in the dialog string from right to left

(i.e. the reverse chronological order of generation). For this reason, it is useful to cut sections that

are relevant for the formulas and to include them in the dialog string.

You can manually specify the sort sequence. Enter the respective number. If you do not change the

default  value  ("0")  in  the  field,  the  system  automatically  identifies  the  next  consecutive  number.

When the next consecutive number is identified, the system uses steps of 10. You can change the

sort order at any time.

Field designation

The field name refers to a section of the data string. The name stored is displayed as field name in

the  MLE  communication  (menu:  File  -->  System  information  -->  MLE  communication  -->

Inbound/outbound transactions).

Acronym

The acronym uniquely defines a section of a data record and therefore defines the database field

where the data is stored. The acronym is stored without "=".

From/to

The fields From / To specify the position in the data string where the required data is placed. The

right and the left limits are specified. Example:

MDS-MLE_81.docx

Version: 1.1.23347

Seite 25 von 40

MES Development Suite MLE

From:

To:

4

7

Data record:

ABCDEFGHIJKLMNO

The data positions 4, 5, 6 and 7 are used. Result: "DEFG" are inserted in the dialog data string.

If you want to insert acronyms in the dialog string that cannot directly be cut in a data string or that

are calculated using a formula, then you must enter "0" in both fields.

Function

You use the function to convert data from the data string before the data is inserted in the dialog

string. This is required, e.g. if time or date formats do not match the HYDRA internal format. MLE

provides the required routines:

SAP QUAN --> HYDRA DEC (FKT02):

The function converts data from the SAP QUAN format ("nnnnnnnnnn.mmm+") to the HYDRA

internal DEC format ("+nnnnnnnnnnn.mmm").

The  function  also  converts  data  from  the  exponential  format  of  the  PP-PI-PCS  interface  (e.g.

2.3650000000000002E+00) to the HYDRA decimal format.

SAP DATE --> HYDRA DATE (FKT03):

The function converts data from the SAP date format "YYYYMMDD" to the HYDRA date format

"MM/DD/YYYY".

SAP TIME --> HYDRA TIME (FKT04):

The function converts data from the SAP time format "HHMMSS" to the HYDRA internal time

format seconds since midnight.

HY71PPS date  HYDRA date (FKT05)

The  function  converts  data  from  the  8  digit  date  format  of  the  HY71PPS  interface  to  the

HYDRA date format.

HY71PPS (DAT6) Date  HYDRA Date (FKT06)

The  function  converts  data  from  the  6  digit  date  format  of  the  HY71PPS  interface  to  the

HYDRA date format.

To Upper --> Upper case letters (FKT07)

The function converts all characters of a string to UPPER CASE LETTERS.

To Lower --> Lower case letters (FKT08)

The function converts all characters of a string to lower case letters.

Sprintf() Funktion --> Conversion of input values (FKT09)

You can use this function to convert types.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 26 von 40

MES Development Suite MLE

SAP QUAN --> HYDRA DEC round (FKT10)

Similar  to  the  function  FKT02,  this  function  converts  values.  But  this  function  also  rounds  to

integer values.

Parameter

Parameters are filled automatically if one of the above-mentioned conversion functions is used. It is

not recommended to make manual entries.

Processing

The  processing  defines  whether  the  program  formats  data  using  the  configuration  and  then

transfers the data to HYDRA or whether the processing for the relevant field is exported to a user

exit.

Edit configuration:

The processing program takes all the data required for the transfer from the MLE configuration.

User exit

If  the  user  exit  (mle_convfield_in.hsc)  is  used,  the  user  exit  is  provided  with  the  original  field

content of the data string. The user exit then provides the prepared value that can directly be

transferred into the dialog string by MLE without further processing.

Comment

You can store comments in this field.

Field type

This is the field type specified for the MLE processing. By default, all fields are text fields. Here, the

conversion routines stored with Function can also be used.

The  field  type  is  important  if  the  contents  of  several  acronyms  are  combined  in  string  operations

(via the condition level). By default, the function stored identifies independently if it is a string or a

figure. With data fields that are strings and include numbers, this leads to errors.

If the field type is specified, you can control this. You can then also combine figures in strings.

Field source

The field source specifies the data basis used to insert data in the dialog string. Several options are

available:

Data string (default):

In this case, data is taken from the current, original data string. This is the “normal case".

Constant value:

If  a  constant  value  is  used,  this  value  is  integrated  in  the  dialog  string.  The  value  itself  is

defined in the Field data field.

Difference segment configuration --> dialog data

MDS-MLE_81.docx

Version: 1.1.23347

Seite 27 von 40

Acronyms  and  their  values  stored  in  the  dialog  data  are  in  any  case  integrated  in  the  dialog

string.  To  integrate  the  constant  stored  in  the  dialog  string,  you  can  additionally  define  a

MES Development Suite MLE

condition.

Memory variable:

Memory variables are used to receive specific field contents of a data record and to make them

available to other data records.

If  you  specify  a  field  as  memory  variable,  the  system  tries  to  access  the  acronym  of  the

memory  variable  stored  under  Field  data.  If  the  memory  variable  is  found,  the  value  of  the

memory variable is included in the dialog string.

Field data

Field  data  is  used  in  two  different  cases  –  if  constant  value  or  memory  variable  is  defined  as  the

Field source.

Constant value:

The field includes the value of the constant. The acronym has already been defined within the

Acronym field in the General tab.

Memory variable:

The  field  contains  the  acronym  of  the  memory  variable.  The  system  searches  the  memory

variable  in  the  existing  pool  of  memory  variables.  The  value  of  the  memory  variable  and  the

value defined in the Acronym field (General tab) are integrated in the current dialog string.

Suppress acronym

If this option is enabled, the acronym and the value from the current data string are included in the

list  of  memory  variables  and  are  then  available  in  the  subsequent  segments.  The  value  is  not

integrated  in  the  current  dialog  string.  This  option  is  only  useful  in  combination  with  the  option

Memorize acronym.

If this option is not active, the acronym and the value from the current data string are included in the

list of memory variables and are then available in the subsequent segments. The acronym and the

value of the current data string are additionally integrated in the current dialog string.

Memorize acronym

If this option is enabled, the acronym and the value from the current data string are included in the

list  of memory  variables  and  are  then  available  in  the  subsequent  segments.  The  option  Suppress

acronym specifies if the acronym is additionally integrated in the current dialog string.

If the option is not active, the acronym and the value from the current data string are not included in

the  list  of memory  variables  and  are  then  not  available  in  the  subsequent  segments.  The  acronym

and the value of the current data string are only integrated in the current dialog string.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 28 von 40

MES Development Suite MLE

Display in MLE communication

If  the  option  is  enabled,  the  field  is  displayed  in  the  MLE  communication  with  the  field  designation

stored.

If  the  option  is  not  enabled,  the  field  is  not  displayed  in  the  MLE  communication  with  the  field

designation stored.

Toolbar

 MLE formula/conditions

You can show the Formula/Condition configuration for a selected data record.

 Field up

Moves a field in the field sorting one level up.

 Field down

Moves a field in the field sorting one level down.

Insert, Copy, Edit, Delete (*)

Use these functions to edit data records.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 29 von 40

MES Development Suite MLE

7  MLE Formula/Conditions

Overview

Menu

Systemadministration  MES Link Enabling (MLE)
 MLE formula/conditions

Transaction code

mleecfg

Function authorization  mleecfg

Purpose

The configuration of conditions provides the following possibilities:

- You can check conditions before you transfer data to HYDRA and if required you can then change the

data.

- You can influence the further processing.

- You can use formulas to recalculate the data transferred.

- You can use formulas to calculate new data using the data transferred.

Integration

MLE variants are combinations of configurations used to process data in HYDRA inbound processing.

Requirements

Some of the functions require the development license MDS-MLE to be fully available. Without

development  license,  you  can  in  general  only  display  the  data,  but  not  change  the  data.  The

functions, which are only available with development license, are identified via (*).

Field descriptions

Message type

The message type refers to a message type created in the segment configuration.

Variant

The variant refers to a variant created in the segment configuration.

Message function

The message function refers to a message function created in the segment configuration.

Segment

The segment refers to a segment created in the segment configuration.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 30 von 40

MES Development Suite MLE

Consec. BAPI no.

The consecutive BAPI number references a specific BAPI of a segment.

You  must  assign  this  value  with  the  first  configuration  of  a  formula  /  condition  for  a  field. With  all

further configurations, this number is used as default value if an existing configuration is selected.

Consec. field no.

The  consecutive  field  number  references  a  specific  field.  The  formula  or  condition  is  assigned  to

this field.

The consecutive field number explicitly refers to the static, consecutive field number and NOT to the

field sorting.

You  must  assign  this  value  with  the  first  configuration  of  a  formula  /  condition  for  a  field. With  all

further field configurations, this number is used as default value if an existing field configuration is

selected.

Consec. formula no.

The  consecutive  formula  number  can  be  assigned  manually  or  automatically  by  the  system.  This

number internally identifies a data record.

It  is  recommended  to  assign  the  number  automatically.  In  this  case,  you  must  not  change  the

default value ("0").

Sort sequence

You use the sort sequence to calculate or check the formulas/conditions in a specified sequence.

Using the sort sequence, the conditions are checked one after the other. The processing of the sort

sequence can directly be controlled via the fields With neg. result / With pos. result.

You  can  manually  specify  the  sort  sequence.  Directly  enter  the  respective  number.  If  you  do  not

change the default value ("0") in the field, the system automatically identifies the next consecutive

number.  When  the  next  consecutive  number  is  identified,  the  system  uses  steps  of  10.  You  can

change the sort sequence at any time.

Type

The type specifies if it is a formula or a condition.

Formula:

Formulas return a calculated value as result.

Condition:

Conditions  return  the  values  True  or  False  as  result.  The  relevant  value  can  then  trigger  the

processing of further conditions or formulas.

Formula

Here, you can access the global Formula management. If the required formula does not exist, you

can create the formula.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 31 von 40

MES Development Suite MLE

To classify the formulas stored in the system, you use the formula type. We recommend to use the

formula type 50 MLE conditions (MES Link Enabling) for formulas used here.

You can use a placeholder when you define formulas. The placeholder is replaced with the current

acronym  before

the

formula/condition

is  checked.  This  way,  you  can  use

the  same

formula/condition for different fields.

Use %AKR% as placeholder in the formula.

Result with pos. condition

The result with positive condition is relevant for formulas and conditions.

Formula:

If  formulas  are  used,  the  calculated  value  can  be  integrated  using  "%ERG%"  The  string

"%ERG%" is then replaced with the calculated result of the formula.

NOTE:

In this row, only the data itself may be entered. The acronym is already specified via the field

referenced.

Condition:

In case of a condition, three options are possible:

"%ERG%":

Here, the result of the condition is used, i.e. "0" (false) or "1" (true).

"%AKR%"

Here, the original value of the acronym is used.

Value

Instead of the integrated or calculated values, you can also store a new value.

Result with neg. condition

The result with negative condition is normally only relevant with conditions.

Three options are generally possible:

"%ERG%":

Here, the result of the condition is used, i.e. "0" (false) or "1" (true).

"%AKR%"

Here, the original value of the acronym is used.

Value

Instead of the integrated or calculated values, you can also store a new value.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 32 von 40

MES Development Suite MLE

With neg. condition / With pos. condition

Using these settings, you can combine several formulas or conditions. This way, you can check a

complete cascade of conditions. Important: Independent of the number of values checked, only one

value/result can be integrated in the dialog string.

Depending on the result, the following processing options are available:

"W" – Continue:

If  the  option  "W"  is  selected,  the  system  continues  to  process  the  formulas/conditions  stored

next. The sort sequence specifies the formula/condition that is checked next.

"S" - Stop:

If the option "S" is selected, the processing of formulas/conditions is stopped here. The system

uses  the  value  stored  in  the  relevant  result  row  (%ERG%,  %AKR%,  value)  as  value  in  the

acronym and dialog string.

"ES" – Exit Segment:

If the option "ES" is selected, the generation of the dialog data string is canceled. This means

that all existing data of the current dialog string is deleted and the next segment is processed.

The hierarchy level of the subsequent segment is not important in this context.

"EH" – Exit hierarchy:

If the option "EH" is selected, the generation of the dialog string is canceled. This means that all

existing data of the current dialog string is deleted. The processing is continued with the next

segment of a higher hierarchy level. All segments are skipped, which are of the same or of a

lower  hierarchy  level  between  the  canceled  segment  and  the  next  segment  of  a  higher

hierarchy level

"EM" – Exit Minor:

If the option "EM" is selected, the  generation of the dialog string is canceled. This means that

all existing data of the current dialog string is deleted. The processing is continued with the next

segment of a same or a higher hierarchy level. All segments are skipped, which are of a lower

hierarchy  level  between  the  canceled  segment  and  the  next  segment  of  a  same  or  a  higher

hierarchy level

"EB" – Exit Bapi:

If  the  option  "EB"  is  selected,  the  generation  of  the  current  dialog  string  is  canceled.  This

means  that  all  existing  data  of  the  current  dialog  string  is  deleted  and  the  dialog  string  is  not

executed. The processing is continued with the next BAPI of this segment or the next segment.

The system does not set a failure status or similar. The current BAPI dialog is only skipped. A

relevant logging in the inbound transactions is made.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 33 von 40

MES Development Suite MLE

Comment

You can use this field to store a comment.

Toolbar

Insert, Copy, Edit, Delete (*)

Use these functions to edit data records.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 34 von 40

MES Development Suite MLE

8  SAP Order Sequencing

Overview

HYDRA menu

System administration  MES Link Enabling  SAP order sequencing

FEDRA menu

System administration  MES Link Enabling  SAP order sequencing

Transaction code

mleoss

Function authorization  mleoss.*

Purpose

Use  the  SAP  order  sequencing  to  control  how  the  workplaces  specified  by  SAP  are  transferred  to  the

system. You can choose from the following options:

  The workplace transferred from SAP is interpreted as HYDRA group and the operation is planned

in the pool of groups (backlog for machine group).

  The  HYDRA  group  is  selected  for  the  workplace  transferred  from  SAP  and  the  operation  is

planned in the pool of groups (backlog for machine group).

  The  HYDRA  group  is  selected  for  the  workplace  transferred  from  SAP  and  the  operation  is

directly planned for the machine.

This decision either affects the workplace or the entire system.

Integration

Diverse interfaces use these configurations to transfer orders from SAP.

Requirements

You have created workplaces and groups in the system.

Field descriptions

Key

Use this field to specify whether the entry applies to a specific order type or a machine.

In general, the configuration refers to a workplace.

Value

If you selected order type as the key, use this field to enter the order type the configuration applies

for.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 35 von 40

MES Development Suite MLE

If you selected machine as the key:

  Enter  a  separate  workplace  in  the  value  field  if  the  configuration  should  apply  for  a  specific

workplace.

  Enter the value SYSTEM if you want the configuration to apply for the entire system.

Configurations referring to a specific machine take priority over the SYSTEM setting.

You  can  make  a  system  entry  for  the  majority  of  machines/workplaces/work  centers  and

exceptions may be configured specifically.

Detailed planning

  G

"Transfer the SAP workplace as HYDRA group, plan operation in the pool of groups (backlog for

machine group)."

  M

"Transfer the SAP workplace as HYDRA workplace, identify the HYDRA group, plan operation in

the pool of groups (backlog for machine group)."

  N

"Transfer the SAP workplace as HYDRA workplace, identify the HYDRA group, and plan the

operation for the workplace."

  Rule 1 - Rule 9

Use the rules 1 to 9 for customer-specific transfer logics, which will be implemented as part of the

project.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 36 von 40

MES Development Suite MLE

9  SAP Upload

Overview

HYDRA menu

System administration  MES Link Enabling (MLE)  SAP upload

FEDRA menu

System administration  MES Link Enabling (MLE)  SAP upload

Transaction code

mlecos

Function authorization  mlecos.*

Purpose

You  use  this  function  to  configure  the  transfer  from  the  resource  performance  accounts  to  the  SAP

activity types. You can make this setting for a single workplace or globally for the entire system.

Integration

This setting is used when the SAP time tickets are uploaded to SAP PP via the PP-PDC interface.

Requirements

You have created workplaces and groups in the system.

Field descriptions

Workplace

If  a  machine  is  specified,  the  configuration  is  applied  for  this  machine  (system  workplace).  If  you

enter "SYSTEM", this is a global setting and is used for all machines, except for machine with an

own, specific entry.

Activity 1 – Activity 6

These fields specify which combination of time accounts kept in the system is uploaded.  Possible

values:

  RPA1 – RPA12

Resource performance accounts of machine from U/E record

  PRPA1 – PRPA12

Resource performance accounts of persons from U/E record (the upload of times from the

resource performance accounts of persons must be activated separately.)

  P_DAUER

Labor utilization

MDS-MLE_81.docx

Version: 1.1.23347

Seite 37 von 40

MES Development Suite MLE

To post the total of several time accounts to an activity field, the accounts are listed separated by

the "+" sign.

Example: RPA1+RPA2+RPA3+RPA4+RPA5+RPA6+RPA7+RPA8+RPA9+RPA10+RPA11

You can also upload quantity accounts, not only time accounts. Possible values are:

GUT

(yield),

AUS

(scrap).

To post the total of several quantity accounts to an activity field, the accounts are listed separated

by the "+" sign.

Example: GUT+AUS

Unit 1 – Unit 6

Enter the relevant upload unit in these fields. Valid values:

Hours

Minutes

Seconds

H, HUR, HR, STD

MIN

SEC

One tenth of an hour (6 min)

ZE

Target activity 1 – Target activity 6

If  you  check  this  option,  you  activate  the  calculation  of  the  activities  using  the  number  of  pieces

defined in SAP for the activity type. If the option is enabled, the activities are no longer transferred

to  SAP.  If  you  disable  the  option,  the  transfer  is  enabled  again.  Also  this  setting  can  be  made

globally  for  the  entire  system  or  for  a  specific  machine  only.  If  the  fields  are  checked,  the  fields

TARGET_ACTI1 – TARGET_ACTI6 in the upload structure "TIMETICKET" are equally assigned an

"X".

MDS-MLE_81.docx

Version: 1.1.23347

Seite 38 von 40

MES Development Suite MLE

10  Activity Types SAP

Overview

HYDRA menu

System administration  MES Link Enabling (MLE) Activity types SAP

FEDRA menu

System administration  MES Link Enabling (MLE) Activity types SAP

Transaktionscode

mlecas

Function authorization  mlecas.*

Purpose

You  use  this  setting  if  you  want  to  link  the  activity  types  required  for  uploads  to  SAP  PM  with  the

workplaces created in the system.

You edit the assignment in relation to a workplace known in the system and the target module in SAP.

Integration

The setting is used for uploads to SAP PM.

Requirements

You have created workplaces and groups in the system.

Field descriptions

Activity type

Activity type to stipulate how to upload to SAP.

Cost center

Not relevant

SAP_Modul

Enter "PM" permanently for uploads to SAP PM.

Name

Free text

Year

No functional use: Date of validity

MDS-MLE_81.docx

Version: 1.1.23347

Seite 39 von 40

MES Development Suite MLE

Plant

No functional use: Plant where the workplace is located

Workplace

Workplace to which the setting applies

From PPS

Don't set the identification.

MDS-MLE_81.docx

Version: 1.1.23347

Seite 40 von 40

