Public holidays

1  Public holidays

Overview

Menu

Human resources management  Models  Public holidays

Transaction code

ptph

Function authorization

ptph

The following application opens for planning public holidays:

Purpose

The  public  holidays  stored  in  the  system  are  considered  when  year  models  are  created.  Subsequent

modifications in the public holidays table do not affect already existing year models.

Public  holidays  for  which  you  have  defined  an  absence  payment  also  have  the  same  effect  as  if  an

absence was planned. In order for the system to generate an absence, you must have planned a target

time for the corresponding days in the working time models.

Field descriptions

Type

Here you can specify whether it is a Public holiday, a Religious holiday or an Other day off. In week

and period models, you can plan different day types for the particular types.

MOC_PersonalTimePublicHolidays.docx  Version: 1.2.14582

Page 1 of 2

Public holidays

Absence payment

Payment  day  type  which  should  be  used  to  create  an  absence.  If  this  field  is  left  empty,  then  no

absence is planned for this day.

Company

Use  this  option  to  restrict  the  public  holiday  to  a  particular  company.  Use  this  field  if  a  particular

holiday  is  not  valid  in  all  companies  or  if  different  absences  should  be  created  for  different

companies. Otherwise, you should leave this field empty.

Personnel selection

Use this field to plan public holidays for groups of persons or individual persons. This is mainly

required if employees also work on public holidays due to a continuous shift model. For a specific

group of persons, you can disable a public holiday that is planned for the entire company, if you

select the option No public holiday. The following priorities apply, if several public holidays with

different personnel selections are defined for an employee on one day:

  1) person

  2) employee subgroup

  3) cost center

  4) area

  5) department

  6) activity

  7) employment relationship

  8) person does not clock

The  field  Personnel  selection  and  the  option  No  public  holiday  are  only  available  if  the

modification PZW_FEIERT is enabled.

MOC_PersonalTimePublicHolidays.docx  Version: 1.2.14582

Page 2 of 2

