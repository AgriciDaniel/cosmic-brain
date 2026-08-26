Setup change list

1  Setup change list

1.1  General

App name

Setup change list

App name mini

Setup list

Function authorization

sma.setli

The  setup  change  list  provides  the  user  with  an  overview  of  the  machines  to  be  set  up  next.  The

operations listed which are planned in next. Setups, due to material, tool or color changes, are marked to

improve your overview.

In  addition,  the  setup  change  list  has  been  designed  as  preview  for  (subsequent)  shifts,  which  enables

the responsible persons in the shift to know which machines have to be set up next.

Selection Criteria

The application provides the following selection criteria:

Resource

Resource used for maintenance.

Date from ... to ...

Date range when the maintenance should be carried out.  The period is stored in default which is

today's date plus 5 days.

Field description - List

MES order number

Combined order and operation number

OP name

Stored name of the operation

Icon for setup change

Display of required action using a symbol

Status

Current OP status

SetupListOverview.docx

Version: 1.1.7256

Page 1 of 3

Setup change list

Field descriptions - detail

Order

Order header number of the operation

Status

Current OP status

OP name

Stored name of the operation

Workplace

Shows the workplace where the OP is currently planned for OPs that are not running (status U or

V).  For  running  OPs,  the  workplace  is  displayed  where  the  OP  is  currently  logged  on.

Click  on  workplace  and  the  application  workplace/machine  opens.  The  system  displays  the

information

regarding

the

workplace.

Note:  Function right sma.wpov is required to display the application "workplace/machine" and the

relevant package (SMA-FMO) must be available.

Article

Article

of

the

operation

Click on the article and the application "operation overview" opens. The system displays information

regarding

the

operation.

Note:  Function right sma.wpov is required to  display the application "operation  overview" and the

relevant package (SMA-FMO) must be available.

Article name

Name of the article to be produced

M/O rel. setup

Machine/operator relation for setup; the value is taken from the operation.

Setup change

In order to set the value into the column "change" the operations next (planned dates) to that one

are considered. If the value changes in the field "tool", then this value is entered.  (Priority 1) If the

value changes in the field "color", then the value "color" is entered. (Priority 2) If the value changed

in the field "article", then the value "article" is entered in the column "change".  (Prio 3)

Tool

DNC

The value is taken from the operation.

The value is taken from the operation.

Material

The value is taken from the operation.

SetupListOverview.docx

Version: 1.1.7256

Page 2 of 3

Setup change list

Color

The value is taken from the operation.

Person OK

The value is taken from the operation.

Tool OK

The value is taken from the operation.

Material OK

The value is taken from the operation.

Target setup time

Total of the planned values "setup time" and "additional setup time" at the operation.

Target processing time

Planned processing time is stored in the operation.

RRT according to formula

Currently calculated RRT of an operation using the stored formula

Planned start

Planned setup date; corresponds to the planned start date of the operation.

Planned end

Planned end date for the operation

SetupListOverview.docx

Version: 1.1.7256

Page 3 of 3

