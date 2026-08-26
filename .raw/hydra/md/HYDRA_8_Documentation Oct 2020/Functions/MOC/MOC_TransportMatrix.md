Transport Matrix
1 Transport Matrix
Summary
Menu Master Data  Production Control  Transport Matrix
Transaction code ttx
Function authorization mdttx
A transport matrix can be defined to determine the transport time between two operations.
Usage
When a new operation is created or when an explicit workplace or group change is made manually using
the operation update function, the transport time is determined using this matrix and the results are
transferred into the operation. Any change to the transport matrix or any rescheduling in the graphic
planning board later will have no effect on already existing operations.
This function is only meaningful and therefore relevant if order scheduling is run in HYDRA.
In order to reduce the amount of data when determining the transport time from one workplace to
another, the workplaces should be assigned to so-called location groups first. To do this, create a group
in the configuration application Groups with the identifier "Location group" and use the configuration
application Group assignment to assign the location group to a workplace.
Field descriptions
From location group
Location group of the original workplace
To location group
Location group of the target workplace
Transport time - normal
Normal transport time in hours.
Transport time - minimum
Minimum transport time in hours, down to which, based on the steps of the reduction strategy,
reductions can be made.
Calendar
With regard to the calendar that scheduling is based on, the following options are available:
MOC_TransportMatrix.docx Version: 1.0.18468 Page 1 of 2

|     |     |     | Transport Matrix  |
| --- | --- | --- | ----------------- |

|    | G = Gregorian calendar  |     |     |
| --- | ----------------------- | --- | --- |
Transport times are scheduled using the Gregorian calendar.
|    | S = Shift calendar  |     |     |
| --- | ------------------- | --- | --- |
When this option is set, the shift calendar or the original workplace is used for scheduling.
|    | T = Shift model from transport matrix  |     |     |
| --- | -------------------------------------- | --- | --- |
The shift model entered in the field Shift model is used for scheduling.
Shift model
Shift model that should be used when the option "T" is set in the calendar field.
Please note: The number of different shift models that are defined here should be kept to a
minimum,  because  an  increased  number  of  different  shift  models  may  adversely  impact
performance in HYDRA shop floor scheduling.
Comment
Comment about this entry

| MOC_TransportMatrix.docx  |     | Version: 1.0.18468  | Page 2 of 2  |
| ------------------------- | --- | ------------------- | ------------ |