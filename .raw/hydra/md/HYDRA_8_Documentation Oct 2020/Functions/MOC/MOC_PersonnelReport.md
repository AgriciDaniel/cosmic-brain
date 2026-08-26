Personalreport

1  Personnel report

Overview



Menu

Order Management => Production Reports => Personnel Report

Transaction code

pnrp

Function authorization

pnrp

Available user fields

Where?

Object type/user field key

Source (type)

Table Personnel report

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  personnel  report  function  has  been  designed  to  create  a  list,  where  all  personnel  postings  are

displayed with a target/actual comparison on time and quantity within a certain time interval for selected

people.

Integration

Order data logs are the data basis for the evaluation .

Requirements

If you want to use the personnel report, personnel postings must have been executed and the respective

postings must be available in the system.

Selection criteria

The application provides the following selection criteria:

MOC_PersonnelReport.docx

Version: 1.5.21378

Page 1 of 5

Personalreport

Date … to …

Data records are restricted by the date and time.

The evaluation period refers to the logon time of the person, that is, all person-related log records

(record type B) are selected with a logon time within the selection period.

In the case of interrupted operations, the log on time from the persona-related log records is used.

The current logged on date is used for logged operations. If the selection period exceeds the period

for  the  online  data  area,  the  data  from  the medium-term  data  area  is  automatically  selected.  You

need not explicitly activate the access to the medium-term data area.

Consider current logons

This option enables to view the people who have logged in during the specified period of time and

who are currently still logged on.

Person from … to …

Personnel number of the person to be displayed

Company

This selection criterion refers to the company defined in the HR master. All persons are shown that

are  assigned  to  the  selected  company.  In  general,  current  HR  master  data  is  selected  (different

versions of the HR master are not supported).

Cost center

The  people's  cost  center  according  to  the  HR  master.  In  general,  current  HR  master  data  is

selected (different versions of the HR master are not supported).

Area

The area defined for the people according to the HR master. In general, current HR master data is

selected (different versions of the HR master are not supported).

Department

The department defined for the people according to the HR master. In general, current HR master

data is selected (different versions of the HR master are not supported).

Last name

Selects by the person's last name according to the HR master. In general, current HR master data

is selected (different versions of the HR master are not supported).

Workplace ... to ...

This selection criterion refers to the workplace stored in the machine or workplace master data. The

selected workplace is displayed.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

MOC_PersonnelReport.docx

Version: 1.5.21378

Page 2 of 5

Personalreport

Group ... to ...

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application shows all workplaces/machines assigned to the selected group.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application shows all workplaces/machines assigned to the selected company.

Order

Selection by edited orders

Category

This is the order type category.

Planned order

Planned order defined for the order.

Project number

Project number defined for the order.

Sales order

Selects by edited sales orders.

Customer name/designation

Selects by the customer designation defined for the order.

Order group

Selects by the order group defined for the order.

MRP controller

Selects by the MRP controller defined for the order.

Detail Application: Personnel Report

The list only contains data on persons for whom the operator is authorized (authorization via the person's

area  of  responsibility;  selection  via  the  current  HR  master  record;  no  support  of  versioned  HR  master

records).  ONLY  individual  operations  are  displayed,  not  the  merged  operations  themselves,  when  it

comes to merged operations generated at the console.

The requested data is displayed including the following information in a tabular structure:

Person category

Person

HR master data such as name, operator position, premium indicator, person group, or the person's

cost center.

MOC_PersonnelReport.docx

Version: 1.5.21378

Page 3 of 5

Personalreport

"Logon/logoff" category

Logon/logoff

Point in time when the person logs on or off.

Workplace category

Workplace

Workplace  to  which  the  person  has  been  logged  on  as  well  as  the  cost  center  assigned  to  the

workplace.

Order category

Order

Order/operation number for which the person has produced.

"Primary quantities" category

Target quantity/yield/scrap/unit

Target quantity of the operation as well as the yield or scrap produced (i.e. recorded)by the person.

The latter are gathered from personal postings (record type „B“).

For  further  information  on  the  personal  posting  of  quantities,  please  refer  to  the  chapter  entry  of

quantities  in the document entitled implementation of HYDRA BDE and MDE .

Please note: Target quantities are not target quantities that are calculated proportionately, but the

total quantity to be produced of the operation (please see order information, “quantities” tab)

Durations category

Proportionate labor duration/setup time/processing time/actual setup time/produciton/downtimes

The time posted by the person is displayed - distributed according to production time and downtime

-  in  addition  to  the  (target)  setup  time  and  the  (target)  processing  time  of  the  operation.  If  the

person  is  logged  on  to  different  orders  the  labor  time  accrued  for  the  order  is  displayed  in  the

column proportionate labor duration (provided that current registrations are considered).

Note:  The  (target)  setup  time  and  the  (target)  processing  time  of  the  operation  are  not  times  that

are calculated proportionately but values that are displayed in the "Order information" dialog.

Detail application: PivotTable

The detail application "Pivot Table" allows for data to be evaluated and accumulated by further criteria.

By default, all people and their cost center are displayed and compared with each other with respect to

the  labor  utilization  rendered  at  the  different  cost  centers.  The  "cost  center"  column  refers  to  the  cost

center of the workplace to which the people have logged on.

MOC_PersonnelReport.docx

Version: 1.5.21378

Page 4 of 5

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

Personalreport

 Order information (function authorization: orin)

Use this button to call the application  Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_PersonnelReport.docx

Version: 1.5.21378

Page 5 of 5

