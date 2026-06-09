Resource Status Types

1  Resource Status Types

Overview

Menu

Master data  Resources  Resource status type

Transaction code

rstt

Function authorization  mdrstt.*

Purpose

The definition of the Resource status types defines the status types and their properties. The properties

specify e.g. the behavior during status change, shift change or when documents are generated.

Integration

The system only supports the collection of parallel statuses for resources of the resource type MNR.

Selection criteria

The application provides the following selection criteria:

Resource type, Resource family

These fields identify the resource type and the resource family.

The  system  only  supports  the  collection  of  parallel  statuses  for  resources  of  the  resource  type

MNR.

Status type

Selection of the available status types

Designation

Status type designation

Field descriptions

Resource type, Resource family

These fields identify the resource type and the resource family.

Status change

This  setting  specifies  if  you  allow  multiple  parallel  status  values  for  one  status  type  each  having

own  beginning  and  end  of  status.  If  the  option  is  checked,  the  previous  status  is  automatically

completed at the beginning of a status.

MOC_ResourceStatusType.docx

Version: 1.1.9411

Page 1 of 2

Resource Status Types

Status update (online)

This  setting  specifies  if  the  status  is  posted  in  the  current  resource  or  machine  status  set.  The

status change is then immediately visible in the reports.

The  input  field  Status  update  (online)  is  only  available  if  the  extension  rsttscript  is

enabled..

Generation of documents

During processing, the system generates posting documents from the status postings to enable a

subsequent assessment of status durations.

Status change when shift change

A shift change automatically generates a status change. The postings are then evaluated per shift.

Responsibility area

Responsibility area of the user who can see and edit the status value.

Script

Script to be executed when a status posting is processed.

The input field Script is only available if the extension rsttscript is enabled.

MOC_ResourceStatusType.docx

Version: 1.1.9411

Page 2 of 2

