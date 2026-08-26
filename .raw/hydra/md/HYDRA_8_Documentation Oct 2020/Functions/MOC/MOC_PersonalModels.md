Personal Models

1  Personal Models

Summary

HYDRA menu

Human resources management --> Planning --> Personal models

FEDRA menu

Advanced resource planning  Master data  Personal models

Transaction Code

pmod

Function authorization

pmod

Use the “Personal models” module to assign a working time model, shift rhythm model, payment model or

an  overtime  type  to  an  employee,  cost  center,  area  or  an  entire  company  for  a  certain  period.  This

assignment then overrides the models configured the HR master data.

This function allows short term switches between individual models without having to change allocations

in the HR master data.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

MOC_PersonalModels.docx

Version: 1.0.23456

Page 1 of 3

Personal Models

The following priorities apply to the definition of personal models:

1. Employee

2. Cost center

3. Section

4. Company

That means that personnel related plans override cost center related plans. Personal models for

an area override company related plans.

Selection Criteria

The application provides the following selection criteria:

Valid from, valid to

Restricts the personal models that may be selected to those applying in this period.

Field Descriptions

Company, Employee, Cost center, Section

Selection  criteria  for  the  employee  or  employee  group,  for  which  the  personal  model  is  to  be

planned. An additional company restriction is necessary if several companies are managed in the

system and the allocation by company is not clear and unambiguous.

Valid from, to

Start and end dates for the planning of the personal model. If the end date field is left empty, a plan

without time limit will be created.

Working time model

Working  time  model,  according  to  which  the  selected  employee  or  group  of  employees  is  to  be

evaluated.

Shift rhythm model

Shift rhythm model used for the determination of the shift type.

Payment model

Payment model to which working time is to be allocated.

Overtime type

Overtime  type  which  overrides  the  period  entered  in  the  HR  master  data  sheet.  For  periods  of

overtime calculation that are longer than one day, the planning of an overtime type for one or more

days during that period always affects the whole period.

It  is  not  necessary  to  fill  in  all  fields  when  planning  personal  models.  For  empty  fields,  the

models from the HR master data will be processed.

MOC_PersonalModels.docx

Version: 1.0.23456

Page 2 of 3

When it comes to plans that are to be rescheduled for longer periods, we recommend making

the changes using the HR master that may be kept in different versions.

Personal Models

Toolbar

 Reset labor time calculation

In the reset labor time calculation dialog the results of labor time calculation have to be reset for the

selected  range  of  people  and  dates  when  it  comes  to  plans  relating  to  the  past,  in  order  for  the

changes to become effective.

MOC_PersonalModels.docx

Version: 1.0.23456

Page 3 of 3

