 Range of Coverage Analysis and Material Availability

1  Range of Coverage Analysis and Material Availability

Usage

For the purpose  of analyzing material coverage ranges and/or material availability, so-called production

levels are defined. In this process, various machines as well as material buffers from where the machines

of a specific production level may retrieve material are assigned to a specific production level.

In  addition,  the  supply  relationship  between  production  levels  is  modeled.  A  production  level  may  have

several  subsequent  and/or  preceding  levels.  In  this  supply  relationship,  a  minimum  coverage  range  is

defined.

Prerequisites for Configuration

  Definition of production levels

  Assignment of machines/workplaces and consistently their material buffer for production levels.

  Assignment of additional material buffers for production levels.

  Definition  of  supply  relationships  between  production  levels;  in  this  regard,  a  preceding  level  is

considered as supplying, a subsequent level is considered as consuming.

  A preceding level may have several subsequent levels.

  A subsequent level may have several preceding levels.

Configuration of Production Levels

Define various production levels and create these production levels in the system.

Assign the related machines to the created production levels (production level assignment). By assigning

a  machine,  its  allocated  material  buffers  will  automatically  be  assigned,  too.  It  is  not  possible  to  delete

these material buffers explicitly, but they will be deleted automatically upon deletion of the assignment of

the related machine.

Assign the related material buffers to the created production levels (production level assignment).

Configuration of Supply Relationships

Define various supply relationships and create these supply relationships in the system by assigning one

preceding level and one subsequent level from the defined production levels in the system to each supply

relationship.

For  each  preceding  level  (predecessor  production  level),  several  entries  can  be  created  for  several

subsequent levels (consumer/successor).

Configuration_RangeOfCoverage.docx

Version: 1.0.18468

Page 1 of 2

 Range of Coverage Analysis and Material Availability

For  each  subsequent  level  (consumer/successor  production  level),  several  entries  can  be  created  for

several preceding levels (predecessor).

Configuration_RangeOfCoverage.docx

Version: 1.0.18468

Page 2 of 2

