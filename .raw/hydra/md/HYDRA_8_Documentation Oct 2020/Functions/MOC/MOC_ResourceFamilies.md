Resource Families

1  Resource Families

Overview

HYDRA menu

Master data  Resources  Resource families

FEDRA menu

Detailed Scheduling  Master data  Resource families

Transaction code

resfam.*

Function authorization  mdrfam

This document describes the application "Resource Families” on the client.

Purpose

If you look at the assignment of resources to resource types, you soon recognize that in a manufacturing

company various resources of the same type exist that are possibly handled quite differently. This means

that in general the classification by resource types is not sufficient to organize resources in a useful way.

If you define "resource families" (groups), you can introduce sub-classes of resource types. The diagram

below  illustrates  how  the  resource  type  "Tool"  is  sub-divided  into  the  two  resource  families  "Drill"  and

"Injection mold". Each of the individual resources is assigned to one of the two resource families.

Resource type
Tool

Resource family
Drill

Resource family
Injection mold

Drill 5mm
002-392-42

Drill 4mm
002-402-49

Insert
836-630-50

Base frame
014-302-48

Integration

The  resource  families  offer  another  structural  level  subordinate  to  the  resource  types.  You  can  use

resource types to define the master/detail user fields of resources. You can improve these master/detail

user fields through definition in the resource families. In particular for DNC, you can use resource families

as the main search criterion and assignment criterion for machines.

MOC_ResourceFamilies.docx

Version: 1.1.23268

Page 1 of 4

Selection parameters

In the selection panel, you can filter by superordinate or assigned resources. The application provides the

Resource Families

following selection criteria:

Resource type

Type of resource.

Resource family

The resource family to which the resource is assigned.

Field descriptions

Resource type

Resource type to which the resource families refers.

Resource family

Unique, descriptive name of the resource family.

You can select this value  in the various functions. Only the resource type allows  you to  identify a

resource or its resource ID uniquely. That  is  why,  evaluations also show the resource type of the

resource.

Description

This field includes the description of the resource family; serves as a comment.

Responsibility area

Definition of the responsibility area. If you specify the responsibility area for a resource family, you

also specify the responsibility area for the assigned resources. The responsibility area controls the

visibility and editing options for these resources.

Field description for tab General

User field key

Reference  to  a  valid  user  field  key.  The  user  field  key  entered  here  overwrites  the  entries  in  the

resource type.

Note regarding DNC filtering using a DNC family and its search fields (when using HYDRA only):

The  definition  of  suitable  user  field  combinations  is  important  if  you  want  to  use  the  flexible  filter  and

search  functions  in  the  DNC  module.  You  can  define  such  user  field  combinations  as  part  of  the

configuration. The user is responsible for the assignment and utilization of these user field keys. Use the

defined  search  fields  in  the  terminal  to  filter  the  DNC  records  in  addition  to  the  DNC  family  of  the

machine. You can also use these fields as search criteria in the MOC.

Starting with release DNC 7.2, the following preconfigured user field keys will be delivered:

MOC_ResourceFamilies.docx

Version: 1.1.23268

Page 2 of 4

Resource Families

User field key

Description of the search fields

DNC_K

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

DNC_K_V

Plastic injection molding:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Tool, mandatory field, cannot be edited

4.  Version, mandatory field, cannot be edited

DNC_K_W

Plastic (tool reference only):

1.  Tool, mandatory field, cannot be edited

DNC_K_WV

Plastic (tool reference and version):

1.  Tool, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC

NC programs:

1.  Article, mandatory field, cannot be edited

DNC_NC_V

NC programs:

1.  Article, mandatory field, cannot be edited

2.  Version, mandatory field, cannot be edited

DNC_NC_M

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

DNC_NCMV

NC programs:

1.  Machine, mandatory field, cannot be edited

2.  Article, mandatory field, cannot be edited

3.  Version, mandatory field, cannot be edited

DNC_FREI

1.  Search field 1, Text20, mandatory field, can be edited

2.  Search field 2, Text20, optional field, can be edited

3.  Search field 3, Text20, optional field, can be edited

4.  Search field 4, Text20, optional field, can be edited

MOC_ResourceFamilies.docx

Version: 1.1.23268

Page 3 of 4

Resource Families

Notes on the DNC administration

DNC records are used exclusively with machines. In order to avoid false entries or false allocations, every

machine is assigned to a definite DNC resource family. This is stored in the machine resource data (the

Resource family DNC field). In this way, you can make sure that only programs belonging to a particular

resource family and, indirectly, to a particular resource type can be loaded to a machine.

Furthermore,  for  the  management  of  DNC  records  certain  criteria  are  necessary,  which,  among  other

things,  simplify  selection  and  evaluation,  thereby  simplifying  location  and  editing  and  enabling

inspections.  As  widely  different  machine  types  can  be  dealt  with  by  DNC  administration  (including,  for

example,  injection  mold  machines,  printers  and  NC  machines),  a  rigid  determination  of  these  criteria  is

not advisable. For this reason, the resource family exists. You can use the user fields to assign attributes

to the resource families. These attributes describe and specify the variable parameters.

Therefore, you can use the attributes for identification purposes and  you can assign validation functions

and allocations. In doing so, you establish a connection between the DNC programs on the one hand and

the machines and operations on the other (see section entitled "User fields").

There are variables, such as the temperature and humidity, which influence the behavior of the machines

and  can  therefore  have  an  influence  on  production.  You  can  also  record  these  "environmental  factors".

For this purpose, you just have to define further attributes in the user fields.

MOC_ResourceFamilies.docx

Version: 1.1.23268

Page 4 of 4

