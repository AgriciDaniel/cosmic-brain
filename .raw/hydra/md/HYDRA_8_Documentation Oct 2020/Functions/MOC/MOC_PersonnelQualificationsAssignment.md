Staff qualifications

1  Staff qualifications

Overview

HYDRA menu

Master data  Staff  Staff qualifications

FEDRA menu

Advanced Resource Planning  Master data  Staff qualifications

Transaction code

pequal

Function authorization

pequal

You can define the employees' qualifications in the Staff qualifications application:

Employees without qualification cannot be planned automatically in the Workplace assignment

application.

MOC_PersonnelQualificationsAssignment.docx Version: 1.2.23488

Page 1 of 3

Staff qualifications

Selection criteria

The application provides the following selection criteria:

Qualification

Enter a specific qualification to restrict the displayed assignments.

Category

Use this field to restrict the category assigned to the qualifications.

Validity ends ... to

Specifies when the qualification expires. If you use this option to restrict data, the application shows

all assignments whose validity end date coincides with the selected period.

Advanced training planned

Specifies  the  date  when  a  training  is  planned.  Use  this  option,  to  identify  all  employees  who  are

planned to participate in a training for a specific qualification and a specific date. As a result you get

a "list of participants".

The  selection  criteria  Category,  Validity  ends  ...to  and  Advanced  training  planned  are  only

available, if you enable the license  Extended personnel information (SIS-EPI) or version 8.2 of

the Personnel Scheduling (PEP) module.

Field descriptions

Person

The person's personnel number.

Qualification

Qualification number.

Ranking order

Ranking  of  the  qualification.  The  system  plans  qualifications  with  higher  ranking  first  during

automatic planning. You can use the numbers ranging between 99 and 1 to define the ranking.

Valid from, to

The validity period for the assigned qualification.

Without date specification => unlimited validity

Valid from - until

=> restricted to a date range

Valid from

Valid until

=> Workforce requirements apply as of the specified date

=> Workforce requirements apply until the specified date

MOC_PersonnelQualificationsAssignment.docx Version: 1.2.23488

Page 2 of 3

Staff qualifications

Evaluation

In  this  field,  you  can  enter  an  evaluation/rating  of  the  qualification  for  information  purposes.  The

field is only available if the user has the function authorization pequal or pequal.rating.

If  this  field  should  not  be  displayed  for  specific  users,  you  have  to  delete  the  function

authorization  pequal  for  these  users.  Then  you  have  to  add  the  required  function

authorizations pequal.create, pequal.edit, pequal.delete and pequal.copy.

Comment 1-3

Use these fields to add up to three comments for each assignment.

Advanced training planned

Date when a training is planned for this qualification.

Start time

Start time of the training.

Advanced training done

Check this field to document that the training has been completed.

The  fields  Evaluation,  Comment  1-3,  Advanced  training  planned,  Start  time  and  Advanced

training done are only available, if you enable the license Extended personnel information (SIS-

EPI) or version 8.2 of the Personnel Scheduling (PEP) module.

Toolbar

 Add file

Opens a dialog to select a file. Once selected, the file is saved with a unique name in the  HYDRA

path ”MOCHRIMG“ on the server. The File name field shows the file name.

 Show file

Shows any assigned file. Subject to the file extension, the application linked in the operating system

displays the file.

 Delete file

Deletes the assigned file.  Once  you have  used this function, the file  is no  longer available on the

server.

The  buttons  Add  file,  Show  file  and  Delete  file  are  only  available,  if  you  enable  the  license

Extended  personnel  information  (SIS-EPI)  or  version  8.2  of  the  Personnel  Scheduling  (PEP)

module (only applicable if HYDRA is used).

MOC_PersonnelQualificationsAssignment.docx Version: 1.2.23488

Page 3 of 3

