Status Ranking List

1  Status Ranking List

Overview

Menu

Production Facility Management  Status analyses  Status ranking list

Transaction code

sthitl

Function authorization

sthitl

Purpose

The  Status  ranking  list  provides  an  overview  of  the  most  frequent  or  longest  lasting  statuses.  The  list

indicates the duration and number of machine events collected as status. Also included in this overview

are production statuses (statuses assigned to RPA 11) and break statuses.

There are two sorts of statuses: The machine/workplace status which is often referred to as "Downtime

reason" or "Malfunction", and the further parallel statuses, e.g. program, operation type, operation mode

or disturbances and production interruptions (depending on the license/project).

Selection criteria

The application provides the following selection criteria:

Workplace

Workplaces/machines matching the criteria entered.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

Date

Data should be selected from the entered period of time.

When selecting by shift(s), the shift date is evaluated, when selecting by time the selection is based

on the start date. Please keep in mind that a selection by shift is only supported with BDE and MDE

data, not with WRM data.

The  display  shows  the  evaluation  of  the  selected  period  of  time  whether  the  data  is  already

archived or not.

Shift/ time

Selection according to shifts (HYDRA-BDE and HYDRA-MDE events only) or according to periods.

If no shift is selected, all shifts are integrated.

Both times refer respectively to the start or end of the date period specified above.

MOC_StatusHitList.docx

Version: 1.3.9404

Page 1 of 2

Status Ranking List

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected report group.

Responsibility area

This selection criterion refers to the responsibility area in the machine master data. Please note that

you may only view those machines you are authorized for by the responsibility area.

Top

Limits  the  number  of  statuses  displayed  for  each  selected  machine  to  those  with  the  longest

duration. Pre-assignment: 5

Status type

Selection  of  status  types  that  are  included  in  the  evaluation.  By  default,  the  machine  status  is

available here; further status types are available depending on the license.

Field descriptions

Resource

Workplace/machine number

Resource type

For workplaces/machines always "MNR"

Designation

  Designation of the workplace/machine

Status, Status text

Status number and status text of the status that was available. The status text is displayed in the

status text color that was configured.

Duration

Duration indicating how long the current status was available.

Total number

Number of times a status was available.

Status type

Description of the status type a status belongs to. By default, the machine status is available here;

further status types are available depending on the license or the project.

MOC_StatusHitList.docx

Version: 1.3.9404

Page 2 of 2

