Manual

Inspection Result
Documentation
SMA-PED 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Inspection Result Documentation

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

SMA-PED_82.docx

Version: 1.0.23049

Page 2 of 12

Inspection Result Documentation

Content

1

Inspection Result Documentation ................................................................ 4

2  List of Inspection Points ............................................................................... 6

3  Process Inspection Point .............................................................................. 7

4  List of Characteristics ................................................................................... 8

5

Inspect Variable Characteristics................................................................... 9

6

Inspect Attributive Characteristics .............................................................. 10

7  Display Inspection Documents ................................................................... 11

8  Display Measured Values / Inspection Results .......................................... 12

SMA-PED_82.docx

Version: 1.0.23049

Page 3 of 12

Inspection Result Documentation

1

Inspection Result Documentation

Possible fields of application

This function package is used if inspection data are collected on a mobile device.  Also, measured values

for variable characteristics or number of defect parts for attributive characteristics can be collected.  The

function package supports the inspection by displaying linked inspection documents.

Implementation notes

A  typical  application  for  the  package  is  if  large,  heavy  parts  to  be  inspected  cannot  be  collected  in  a

central  inspection  station.    In  this  case  the  "mobile  inspection  station"  travels  to  to  the  parts  to  be

inspected.

In  order  to  use  this  package  inspection  points  must  be  generated  beforehand.    The  generation  of

inspection points requires in turn an auditable inspection step.

Inspection  points  can  be  manually  generated  via  the  MOC  or  the  AIP.    Also,  defined  events  in  the

production  environment  can  automatically  generate  inspection  points.    However,  it  is  required  that  an

order or an inspection step is logged on in the AIP.  Possible events are the following:

  Completing a piece or time interval

  Order logon

  Shift change

  Output batch change

  Machine status change

Integration

Documented  inspection  results  using  this  function  package  on  a  mobile  device  is  directly  related  to  the

function of the inspection requirement, inspection step and inspection point in the MOC.

Functions Scope

What does this function package offer, especially relating to the documented functions of the license?

SMA-PED_82.docx

Version: 1.0.23049

Page 4 of 12

Inspection Result Documentation

This  package  offers  the  following  performance  features  to  document  inspection  results  on  a  mobile

device:

  Guided inspection result collection displaying quality-relevant information (i.e. specified limits).

  Collecting  measured  values  for  variable  characteristics  and  the  number  of  defect  part  for

attributive inspections.

  Completion of inspection points with automatically generated inspection point usage decision.

  Visualization  of  inspection  documents  (drawings,  inspection  instruction  etc.)  which  have  been

assigned to the corresponding inspection plan.

SMA-PED_82.docx

Version: 1.0.23049

Page 5 of 12

Inspection Result Documentation

2  List of Inspection Points

On  the  left  hand  side  a  list  containing  all  auditable  inspection  points  appear.    The  list  can  be  restricted

using a filter.  A match code filter is available for the user.  Content to be filtered in a text is replaced by

the symbol "*".  Using the symbol "?" an individual symbol can be replaced.  The complete content of the

inspection point list can be filtered.  The following information is part of the inspection point list:

  Order - operation

Both are separated with a hyphen and are shown in the first line of the inspection point.  Example

of a display format: 12345678 – 0010“ („12345678“ is the order number, „0010“ is the operation).

  Article number - article description - date of when inspection point was created

The information is part of the 2. line and are also separated by a hyphen.

Also, the status of an inspection point result is highlighted by a colored LED symbol.  The following color

assignments are valid:

  o.k. => green LED



fail => red LED => rote LED

A special filter containing can be requested by the filter symbol to look for the area and the inspection

point status. This is in addition to the possibility to filter using a match code.  To facilitate the filter process

corresponding selection lists are available. .

In the right display area detailed information is shown in the list for the selected inspection point.  The

parallel display of the left and right display area is dependent on the selected device.  On a smartphone

only the inspection list is shown.  In order to show details the required inspection point should be

selected.

The detailed display enables using special function buttons for the following create/process function:

  Request the characteristics list

  Editing inspection point

  Completion of inspection point

Based on the inspection result of the corresponding inspection point characteristics when the function

"Completion of inspection point" is triggered, the inspection point usage decision is automatically

identified and the inspection is completed at the same time.

SMA-PED_82.docx

Version: 1.0.23049

Page 6 of 12

Inspection Result Documentation

3  Process Inspection Point

The dialog to process inspection point details is separated into groups:





 Order

Identification

  Additional fields

.

The field content of the group "Order" contain information about the subordinate order and cannot be

edited.  Amongst others order and operation number and information about the article are shown.

Referring to the group "Identification" a clearly defined inspection point number and inspection result

based on previous inspections is shown.  The field content is again not editable.

All other inspection point fields can be edited.  Some of these field only carry a general description "Field

1" up to "Field 7".  This reasons for it is that in the CAQ system option these fields contain different labels

per area in the MOC presentation.  Currently the area dependent labelling is not supported by the SMA.

SMA-PED_82.docx

Version: 1.0.23049

Page 7 of 12

Inspection Result Documentation

4  List of Characteristics

On the left hand side a list containing all characteristics for previously selected inspection points appears.

The list can be restricted using a filter.  A match code filter is available for the user.  Content to be filtered

in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.  The

complete  content  of  the  inspection  point  list  can  be  filtered.    The  following  information  is  part  of  the

inspection point list:

  AFO - description of characteristics

Both are separated with a hyphen and are shown in the 1. line of a characteristics.  Example of a

display format: "10” - total length („10" is equivalent to the operation sequence number/AFO).

  Characteristics type

Collection types to be used are "attributive" and "variable".

On the right hand side detailed information (i.e. test equipment and specifications) about the

characteristics in the list is shown.  The parallel display of the left and right display area is dependent on

the selected device.  Only the characteristics list is displayed on the smartphone.  In order to show details

the required characteristic should be selected.

The detailed display enables using special function buttons for the following create/process function:

  Check variable / attributive characteristic (depending on the type of the previously selected

characteristics)



Inspection documents

  List of measured values

SMA-PED_82.docx

Version: 1.0.23049

Page 8 of 12

Inspection Result Documentation

5

Inspect Variable Characteristics

The main role of the dialog is collecting measured values from previously selected characteristics.  Added

information is tolerance limits, measurement unit, target value, sample size and the used test equipment

or specified test equipment group.

If the 1. measured value is collected for a characteristics and the sample size is for example 3,  the field

"Value no." is pre allocated with the "1".  If the valued measure and optionally a comment is saved, the

collection dialog is automatically closed and opens instantly after storage.  The field "Value no" is now pre

allocated with " ".  If the inspection data could is saved successfully, a message line containing relevant

information is sent right after closing the dialog and before the collection catalog is opened again.  The

message line is located above the characteristics list.  If the data is saved the message line is highlighted

in green.  If it is not saved the color is pink.  This can happen if the measured value has not been saved

due to a violation of plausibility.

The value no. always increased by one number if the collection dialog is opened again.  It might be the

case that the value no. "4" is preset but the sample size has the number "3".  If no more measured values

are to be collected or the specified sample size has been reached, the collection dialog must be closed

manually.

SMA-PED_82.docx

Version: 1.0.23049

Page 9 of 12

Inspection Result Documentation

6

Inspect Attributive Characteristics

The main role of the dialog is the evaluation from previously selected characteristic.  Evaluation is done

using information of the number of nonconforming units (field "No of nonconforming units").  Also the

number of inspected parts must be collected (inspected sample size).  The sample size to be inspected is

displayed for information purposes.  The inspection result incl. of optional comments are automatically

assigned to "Value no" 1.

If the inspection result could is saved successfully, a message line containing relevant information is sent

right after closing the dialog and before the collection catalog is opened again.  The message line is

located above the characteristics list.  If the data is saved the message line is highlighted in green.  If it is

not saved the color is pink.  That is the case if there is no network connection.

SMA-PED_82.docx

Version: 1.0.23049

Page 10 of 12

Inspection Result Documentation

7  Display Inspection Documents

The  overview  of  the  documents  can  be  called  from  the  list  of  characteristics  or  the  collection  dialog  for

attributive and variable characteristics.

In  the  document  overview  a  list  of  documents  for  the  previous  selected  characteristic  or  a  presently

inspected characteristic appears on the left hand side.

The content can be restricted using a filter.  A match code filter is available for the user.  Content to be

filtered in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.

The  complete  content  of  the  document  list  can  be  filtered.    The  following  information  is  part  of  the

document list:

  Document

Failure

type

type

number

The information is displayed in the 1. line of the document entry.

  Description

The information is displayed in the 2. line of the document entry.

In  the  right  display  area  detailed  information  is  shown  in  the  list  for  the  selected  document  entry.    The

parallel display of the left and right display area is dependent on the selected device.  Only the document

list  is  displayed  on  the  smartphone.    In  order  to  show  details  the  required  document  entry  should  be

selected.

The fields "Externally" and "Position" are not available on the smartphone.

Document content can be displayed selecting a function button.  The content of the field "Text" is shown

with  the  document  type  "Text".      For  the  type  "URL"  or  "File"  the  "linked"  document  is  opened  with  the

respective  program  and  displayed.    In  order  to  display  the  URL  entry  a  "Link"  in  form  of

http://www.mpdv.de is required.  An entry in the form of www.mpdv.de cannot be displayed.

SMA-PED_82.docx

Version: 1.0.23049

Page 11 of 12

Inspection Result Documentation

8  Display Measured Values / Inspection Results

The measured/single values list derives from the list of characteristics.

On the left hand side this list appears with all previously collected measured values or attributive results.

The content can be restricted using a filter.  A match code filter is available for the user.  Content to be

filtered in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.

The  complete  content  of  the  document  list  can  be  filtered.    The  following  information  is  part  of  the

measured value list:

  Variable characteristics: Upper tolerance limit, actual value and lower tolerance limit. The

information is separated by a pipe slash "|".

This information is displayed in the 1. line.

  Collection point in time (Date and hour)

This information is displayed in the 2. line of the document entry.

In  the  right  display  area  detailed  information  is  shown  in  the  list  for  the  selected  entry.    The  parallel

display of the left and right display area is dependent on the selected device.  Only the measured/single

values list is displayed on the smartphone.  In order to show details the required entry should be selected.

In the detailed display also inspection requirements, inspection step number and the corresponding area

(i.e. P for production) are shown.

SMA-PED_82.docx

Version: 1.0.23049

Page 12 of 12

