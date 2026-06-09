Time tickets

1  Time tickets

Overview

Menu

Human  resources  management    Incentive  wage    Group  performance
records

Transaction code

timtic

Function authorization

timtic.*

Time tickets show the activities and times used to calculate a premium wage for an employee.  The system

calculates  time  tickets  with  the  time  tickets  from  the  collected  output  data  of  the  order  data  collection,

sometimes  also  using  personnel  time  managements  and  bonuses.    If  feasible,  a  performance  level  is

calculated even if it is not a piecework time ticket.

Selection criteria

Tab "Time type"

You can select time tickets for specified time types.

MOC_TimeTickets.docx

Version: 1.1.20369

Page 1 of 4

Time tickets

Name of the Premium groups

You can filter the Premium group names with wildcards.

Field descriptions

When  using  "Formula-based  premium/incentive  wages",  the  meaning  of  the  fields  may  differ  from  the

standard. You can find further information in your customer documentation.

Wage type

The  wage  type  is  identified  using  the  collected  output  data  and  also  using  specific  wage  type

determination.

Time type

The Time type is usually deduced from the time type which is stored in the wage type. The list makes

no sense without having the time type displayed or available for selection.

Premium group (cid:129)

In the case of time tickets in group incentives, this field is used to assign the time ticket to a premium

group.

Duration

Contains the effective time ticket duration.

Bonuses

This column contains the bonuses that were credited to the time ticket.

Standard time

This column contains the standard time for piece work.  Bonuses are not included!

Performance level

The system calculates the performance level using the standard time, bonuses and duration.  The

standard time is calculated from the quantity *  te + tr. The relevant quantities and whether the tr is

included are set in the basic settings or wage types.

Cost center

The cost center is transferred from the underlying recorded data.

Wage group

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Quantity

Total quantity used to calculate the standard time. Depending on the Basic settings incentive wage

and the Wage types the yield and scrap quantities of different units of measure are used for this.

Reference

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

MOC_TimeTickets.docx

Version: 1.1.20369

Page 2 of 4

Time tickets

Year, month, calendar week, day

You can activate these columns via the column configurator and allow statistical analysis.

Calculated at

The time when the time ticket was calculated by the system.

Tab "Bonus accounts"

The  premium  accounts  are  calculated  customer-specifically  with  the  „Formula-based  premium/

incentive  wage".  You  can  find  further  information  on  premium  accounts  of  time  tickets  in  your

customer documentation.

Order, workplace/machine

Order and workplace/machine are taken from the collected postings, e.g. ADE personnel postings.

Bonus reason

Is completed for time ticket with the time type "Bonus".

te, tr, teb, trb

Requirements for Incentive wage are from the underlying ADE personnel postings.

Comment

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Start, end

Reporting times from the underlying recorded postings.

RPA number (Resource Performance Account)

In  the  case  of  time  tickets  from  production  orders,  the  number  of  the  RPA  from  which  the  time

originates is shown here.

Shift type

Reserved for customer-specific processing with "Formula-based premium/incentive wages".

Yield (P) + scrap (P) + rework (P) + outstanding quantity (P)

Primary quantity from the underlying ADE personnel posting.

Tab "Person“:

Selection at the field from the HR master data to generate information and grouping in the table.

Tab "Additional information"

Configured HR master data fields.

Toolbar

Personnel day results

Branching to the time tickets for the selected "Person day".

MOC_TimeTickets.docx

Version: 1.1.20369

Page 3 of 4

Time tickets

 Labor Time Maintenance

You can directly go to "Labor time maintenance" to edit time in the Personnel Time Management.

Order-related postings

This button directly opens the order-related posting dialog to correct or analyze times of the Shop

Floor Data Collection module.

MOC_TimeTickets.docx

Version: 1.1.20369

Page 4 of 4

