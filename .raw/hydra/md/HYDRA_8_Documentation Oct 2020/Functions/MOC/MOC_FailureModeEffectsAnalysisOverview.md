FMEA

1  FMEA (Failure Mode and Effects Analysis)

Overview

Menu

Quality management  FMEA  FMEA

Transaction code

fmea

Function authorization

fmea

The Failure Mode and Effects Analysis (FMEA) is a targeted method to identify potential failures at an early

stage.  Using this method, you assess the risks resulting from failures and develop countermeasures. We

differentiate between system and process FMEA depending on the object.

Purpose

This functions generates and manages FMEAs.  The function generates process or system FMEAs.

Integration

You need the application to process FMEAs.

When generating an FMEA, different masterdata is accessed:

  Companies or persons, employees in charge, ordering party, project manager, created by (name),

team stored in HYDRA

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 1 of 7

FMEA

  FMEA article

  Orders/operations

  FMEA Rating Numbers

Requirements

The licenses FMEA-EVS and FMEA-VDF are required for this function.

Masterdata must be created to generate a FMEA.  Maintenance of masterdata depends on the respective

application.  As a rule the following masterdata must be maintained:

  Article/Item

  FMEA Rating Numbers

  Failure

  Measures

  Staff

  Responsibility areas

Selection criteria

The application provides the following selection criteria:

Tab FMEA

Number

You can filter by entering the manually assigned FMEA number. The number can contain numbers

and letter.

FMEA type

FMEAs are separated into system or process FMEA.  Either type is displayed depending on selection.

Responsibility area

Assigned responsibility areas are filtered.  Like assignment of locations specified in the

configuration.

Tab Project manager

Project manager

The contents of the list of the project managers are filtered. In the master data it is defined, which

entry is accepted to the list of the party in charge.

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 2 of 7

FMEA

Project manager, name 1

Content of the field "name 1" of project leader's list is filtered.  For departments it is the name of the

department, for external persons the surname and for companies the company name

Tab Party in charge

Party in charge

The contents of the party in charge list may be filtered. In the master data it is defined, which entry is

accepted to the list of the party in charge.

Party in charge, name 1

The content of the field "name 1" of the list of responsible persons may be filtered. For departments

it is the name of the department, for external persons the surname and for companies the company

name

Field descriptions

Tab FMEA

Number

Alphanumerical field for free allocation of an FMEA number

Version

Alphanumerical versioning of a FMEA number

FMEA type

Here you can select if it is a process or a system FMEA

Project title

Free text field to allocate a project name

Responsibility area

You can allocate, if available, areas of responsibilities.

Assessment catalog

You can select an assessment catalog from the master data to draw numbers for further processing

the FMEA.

Name of assessment catalog

Name of the assessment catalog selected from master data

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 3 of 7

FMEA

Status

Displays

the

abbreviation  of  FMEA

status  There  are

the

following

statuses:

"completed"

"in

"open"

process"

"measure definition"  Further statuses can be added by way of customzing.

Processing degree in %

You can manually enter in this field the processing status of the FMEA in percentages.

Measure as of (status)

You can document in this field manually the current measure status (date) of the FMEA.

Operation

Here you can open the standard application "Operation" and the selected operation is accepted.

OP name

Associated operation name of the operation number, that is automatically displayed after selection

of operation.

Article Id / designation / model / ABC / drawing issue number / drawing number

The selection list of the article master data may be opened to accept an article in order to specify

information for the FMEA.  Article data is automatically displayed (designation, model, ABC, drawing

issue number, drawing number). Instead of selecting the article, the article number and drawing

issue number can also be entered. In this case, article related data is generated from the master

data catalog and is displayed after storage.

Release type

Different types may be selected when inputting data. This field does not have a special function,

meaning it depends on the corresponding application who is to be entered as the responsible

party. However, this is not monitored by a special function.

Release

Display the list of people or show the assigned party in charge of the release.  List entry of party

in charge of the release is defined in the master data.  The selected entry is accepted. (Party in

charge of release)

Release Name 1, Name 2, Name 3

Display of the content of the fields name 1, name 2 and name 3 of the party in charge of the release

The customer name and the content of the address fields 1 and 2 are displayed for customers. The

last name, first name and initials are displayed for external persons.

Released on

Selection / display date of release

Party in charge, type

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 4 of 7

FMEA

Different types may be selected when inputting data. This field does not have a special function,

meaning it depends on the corresponding application who is entered as the responsible party.

Generally, it is the person responsible for detailed processing meaning provision of information for

the FMEA.  However, this is not monitored by a special function.

Party in charge

Display list of parties in charge or display of the assigned party in charge.  In the master data it is

defined, which entry is accepted to the list of the party in charge. The selected entry is used as the

responsible party.

Party in charge, Name 1, Name 2, Name 3

The field contents of Name 1, Name 2 and Name 3 of the party in charge are shown. The customer

name and the content of the address fields 1 and 2 are displayed for customers. The last name, first

name and initials are displayed for external persons.

Project manager, type

Different types may be selected when inputting data. This field does not have a special function,

meaning it depends on the corresponding application who is entered as the responsible party.

Generally, it is the person responsible for detailed processing meaning provision of information for

the FMEA.  However, this is not monitored by a special function.

Project manager

Display list of parties in charge or display of the assigned party in charge.  In the master data it is

defined, which entry is accepted to the list of the party in charge. The selected entry is used as the

responsible party.

Project manager (project manager, - type, name 1, name 2, name 3)

Display content of the fields name 1, name 2 and name 3 of the project manager The customer

name and the content of the address fields 1 and 2 are displayed for customers. The last name, first

name and initials are displayed for external persons.

Ordering party (Ordering party, -type, name 1, name 2, name 3)

Display content of the field name 1, name 2 and name 3 of the project sponsor The customer name

and the content of the address fields 1 and 2 are displayed for customers. The last name, first name

and initials are displayed for external persons.

Team no., team name

A team may be entered or selected. Teams are defined within master data. After saving, the name

is displayed in addition to the team number.

Start date

Display or entry of the FMEA start date

Finish date

Display or entry of the FMEA finish date

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 5 of 7

FMEA

Duration

Automatic generation of the duration (difference between start and finish date)

Target expenditure in days

Display or entry of the planned FMEA expenditure

Actual expenditure in days

Display or entry of the planned FMEA expenditure

Production release date

Display or entry of the production release date

Objective

Empty field to describe the FMEA objective in detail

Toolbar

The below dialog opens to copy a data record:

The selected data record is displayed.  Either the number or the version must be changed in order to copy

the data record.  Click on the green check and the previously selected FMEA is copied and stored with a

new name.  All sub structures and the assigned team are also copied.

 FMEA

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 6 of 7

FMEA

The FMEA for the selected header data record is opened.  FMEA

Team

Link to request the application Team members

Document

This function opens the application Document management.

MOC_FailureModeEffectsAnalysisOverview.docxVersion: 1.0.18468

Page 7 of 7

