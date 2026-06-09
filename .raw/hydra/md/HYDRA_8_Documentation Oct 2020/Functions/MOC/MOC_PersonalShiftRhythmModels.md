Shift Rhythm Models

1  Shift Rhythm Models

Overview

HYDRA menu

Human resources management  Models  Shift rhythm models

FEDRA menu

Advanced resource planning  Master data  Shift rhythm models

Transaction code

srmo

Function authorization

srmo

To specify the working time of a shift worker, you require the working time model and the so-called shift

rhythm model. This model specifies the shift type of the different workdays.

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 1 of 6

In tab Calendar view, the selected shift rhythm model is displayed in a current calendar view. With shift

rhythm  models  that  have  been  created  long  ago,  the  calendar  view  provides  an  overview  of  the  shift

rhythm of the current year. This way it is easier to assign the correct model to a person.

Shift Rhythm Models

The calendar view is only available if the extension  PersonalShiftRhythmModelsCalendar

is enabled.

Purpose

In the shift rhythm model, you can enter a shift type for the selected days. This is also possible

if no day type has been stored for the respective day in the working time model. This way, it is

often easier to create a shift rhythm model.

Insert week model

 Insert week model

To insert a Week model, the following dialog opens:

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 2 of 6

Shift Rhythm Models

Valid from

You can use the Valid from field to define week models with the same model number and different

validity start dates. If you must edit a week model, you can store this change retroactively using a

new week model with identical model number.

Monday, Tuesday, …., Sunday

You enter the shift type of the respective weekday in these fields. In tabs Public holiday, Important

public holidays and Other days off, you can store a different shift type for the weekday that is used

if the day is defined as a public holiday with the relevant holiday type. If these fields are left empty,

then the day type from the Weekday tab is used on public holidays.

Insert period model

Insert period model

To insert a Period model, the following dialog opens:

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 3 of 6

Shift Rhythm Models

Field description

Reference date

The periods of time defined in the table are repeated from the day onwards specified as Reference

date.

Use the button Insert to define the different periods of the period model:

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 4 of 6

Shift Rhythm Models

Field description

No of days

Duration of the period in days

Day type

Specifies the shift type.

Day type with Public holiday, Important public holiday, Other day off

In  these  3  fields,  you  can  enter  a  different  day  type  for  public  holidays,  important  public  holidays

and other days off. If the fields are left empty, then the value of the field  Day type is used on the

relevant public holidays.

Insert year model

Insert year model

To insert a Year model, the following dialog opens:

Date from, to

Period of assignment

Weekdays, Weekend, Mon, Tue, …, Sun

Weekdays that you want to assign. The button Weekdays includes the days from Monday to Friday

and the Weekend button includes Saturday and Sunday.

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 5 of 6

Shift Rhythm Models

Include public holidays, Exclude public holidays, Public holidays only

This  option  specifies  if  the  public  holidays  are  integrated  during  the  assignment  or  not  or  if  only

public holidays are assigned. Public holidays are displayed in brown in the year calendar.

Day type

Specifies the shift type that is entered in the year calendar on the selected days.

Function buttons in tab Weekdays

Assigns the shift type entered to the selected days.

Deletes the shift types entered on the selected days in the year calendar.

MOC_PersonalShiftRhythmModels.docx  Version: 1.0.23492

Page 6 of 6

