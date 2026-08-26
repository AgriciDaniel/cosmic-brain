Group assignment

1  Group assignment

Overview

HYDRA menu

Master data  Workplaces/machines  Group assignment

FEDRA menu

Detailed scheduling  Master data   Group assignment

Transaktionscode

grpa

Function authorization  mdgrpa

Purpose

This function allows for resources to be assigned to groups.

Integration

At the moment, this is needed to assign workplaces/machines to

  Capacity groups that are used in the shop floor scheduling module,



location groups that may be taken into account for scheduling,

  evaluation/report groups that may be used as selection criterion in versatile evaluations/reports,



line groups that are used by the industry solution "bottling".

Additional assignments may be performed but they are not relevant to the system processing.

Requirements

The requirement for assigning a resource is that the group you want to assign the resource to has already

been created. This is performed by the configuration Master data => Workplaces/machines => Groups .

Please note in this context the "Notes on editing groups and group assignments".

Selection criteria

The application provides the following selection criteria:

group

Group ID

MOC_ResourceGroupAssignment.docx  Version: 1.3.23270

Page 1 of 2

Group assignment

Resource

Selection of the assigned resource

Resource type

Selection of the resource type

Field descriptions

group

Identification number of the group

If the group is a capacity group it may only be 8 characters long at most. In case of numeric machine

numbers (configured in the basic parameter settings of HYDRA), the number has to be filled up to 8

characters with leading zeros.

Resource type

Resource type of the resource that is to be assigned to the group. The following has to be taken into

account:

Assignment of people from the HR master:

"PNR"

Assignment of workplaces/machines:

"MNR"

Assignment of other resources (WRM/DNC):

Respectively configured resource type in

Resource

Unique resource number. Subject to the resource type, it is

WRM/DNC

"PNR"

Personnel number with leading zeros according to the length configured in

the basic parameter settings of system.

"MNR"

Workplace/machine  number,  a  max.  of  8  characters.  The  number  has

generally to be filled up to 8 characters with leading zeros.

<Resource type>

Resource according to WRM/DNC

Position

This field allows for the sequence of workplaces within a capacity group to be defined for capacity

groups that are planned in the graphic planning board.

MOC_ResourceGroupAssignment.docx  Version: 1.3.23270

Page 2 of 2

