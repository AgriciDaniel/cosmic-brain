Target-Oriented Planning

1  Target-Oriented Planning

Summary

Menu

Master data  Production control Target-oriented planning

Transaction code

plstrt

Function authorization  mdplstrt.*

Usage

You use this function to create or modify criteria applied in the system's automatic assignment based on

target-oriented planning.

Integration

Priority rules are used during automatic assignment. Using this priority rule, the operations to be planned

are rated and indexed by an adjustable weight, and the queue is sorted (prioritized) by this index. Unlike

other sorting rules, with this one the actual target is weighted and the assignment adjusted to it.

In order to use a priority rule, it is assigned to a planning variant.

Selection criteria

The application provides the following selection criterion:

Description

A  search  can  also  be  run  using  this  input  field  to  find  the  description  of  rules  that  were  already

created. The use of wildcards is supported.

Field descriptions

All of the configured rules are listed on the left in a table.

Strategy

All sorting rules are set up under the identification "TARGET". This is a fixed value that is assigned

when a new priority rule is created.

Designation

Detailed information about the priority rule.

Responsibility areas

Responsibility area can be used to control access to the priority rule.

MOC_PlanningStrategyTarget.docx

Version: 1.1.18468

Page 1 of 2

Target-Oriented Planning

When selecting  a rule, each of the assigned target criteria is displayed in the  detail view on the right  in

tabular or graphic form. The target criteria are the basis by which queues are sorted.

Target

This field describes the target that should be included when determining the weighting.

Weighting

A weighting can be defined for the parameters listed above. In addition, you can also set whether

the parameter is beneficial or detrimental to the overall  weighting.  The value of the weighting has

no size.

Toolbar

In addition to the icons available for creating, editing and deleting a priority rule, there is also an icon that

can be used to call up a dialog, in which you can define each of the weighting parameters.

  Edit target definition

To  edit  weightings,  a  dialog  opens  in  which  you  enter  the  values  based  on  which  the  weighting

should be performed. Weightings greater than 0 are displayed in the chart on the right.

Procedure

To create a priority rule, follow the steps listed below:

1.  Create a new profile rule by clicking on the icon Insert in the Functions category.

2.  Choose this priority rule from the list and now click on the icon Target definition to define each of the

separate weightings. The following weighting parameters can be defined:

Order duration

Scheduled end time of the order minus scheduled start time of the order

Buffer time of the order

Basic finish date of the order minus scheduled end time of the order

Order delay

Scheduled end time of the order minus latest end of the order

Reduction level

Current reduction level defined for the order

Priority

Priority defined for the operation

Variability

Relationship between the order's buffer time to the order's processing time

MOC_PlanningStrategyTarget.docx

Version: 1.1.18468

Page 2 of 2

