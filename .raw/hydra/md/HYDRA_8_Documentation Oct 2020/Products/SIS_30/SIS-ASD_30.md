Manual

Recording of Changes to
Master Data
SIS-ASD 3.0/3.1

Version 1.1.15126

Last changed on: 19.06.2020

Recording of Changes to Master Data

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-ASD_30.docx

Version: 1.1.19468

Page 2 of 22

Recording of Changes to Master Data

Contents

1  Recording Changes in Master Data ............................................................. 4

2  Logging – configuration ................................................................................ 6

Object logging (1st generation) ..................................................................................... 6

Dialog logging (2nd generation)..................................................................................... 8

Service logging (3rd generation).................................................................................... 9

3  Logging Key Maintenance .......................................................................... 12

4  Logging - Change Management................................................................. 14

5  Übersicht-Logging Keys ............................................................................. 16

SIS-ASD_30.docx

Version: 1.1.19468

Page 3 of 22

Recording of Changes to Master Data

1  Recording Changes in Master Data

Purpose

HYDRA logging is a basic function within the HYDRA MES Weaver that can be used to enter changes to

a  data  object  (master  data/  configuration).  Depending  on  the  configuration,  optional  or  mandatory

comments can be entered concerning changes that have been made.

An  evaluation  can  be  used  to  illustrate  changes  that  have  been  made.  Depending  on  the  type  of

recording, changes can be illustrated or different versions of an object compared to one another.

Implementation considerations

You employ this component if:

  You basically would like to keep track of changes made to an object

  You would like to have traceability for reasons of product or manufacturer documentation to meet

legal regulations

  You would like to transfer changes to an object to connected systems via an interface

Integration

HYDRA logging represents a central function that is available for all master data objects.

Features

  Configuration:

o  Definition  of  whether  changes  to  a  data  object  (e.g.  master  data  for  machines,  tools,

staff) should be recorded.

o  Definition  of  whether  a  comment  entry  is  optional  or  mandatory  when  a  data  object  is

newly created/ modified/ deleted

  Evaluation:

o  List of changes to a data object (old vs. new value)

  Version administration:

o  List of changes to a data object (old vs. new value)

o  Undo function used to re-activate an earlier version of the data object

SIS-ASD_30.docx

Version: 1.1.19468

Seite 4 von 22

Recording of Changes to Master Data

<<XcludeSubDocument=\\archive\mast_ind\Produktdokumentationen\en\FunctionPackages\SIS-

ASD_3.0\MBL_Base_system_logging.docx>>

SIS-ASD_30.docx

Version: 1.1.19468

Seite 5 von 22

Recording of Changes to Master Data

2  Logging – configuration

Overview

Menu

System administration  Logging  Logging - configuration

Transaction code

logcfg

Function authorization

logcfg.*

Purpose

Use the application to activate or change the recording method for changes of master data objects.

Integration

The logging function is a central function available to all master data objects.

Selection criteria

The application provides the following selection criteria:

Service

Third generation configurations. Logging of service calls.

Dialog

Second generation configuration. Logging of dialog calls for a called dialog.

Object

First generation configuration. Logging of objects that are firmly stored in the software including the

respective values. You can restrict logging to the actions of the respective objects. In this case, you

cannot enter comments / labels.

If  you  generate  logging  configurations,  you  must  also  consider/carry  out  the  archiving  of  the

generated logging data.

Object logging (1st generation)

Application area

HLS-Save

SIS-ASD_30.docx

Version: 1.1.19468

Seite 6 von 22

Recording of Changes to Master Data

Field descriptions

Object

The object identifies a HYDRA data object.

Example:

You want to log changes of the machine configuration. Thus, “MNR” is the object identification

for the machine. In this case, you must define “MNR” as object.

Action

The  “action”  field  specifies  how  an  object  has  been  changed,  i.e.  whether  it  has  been  created

(INSERT), changed (UPDATE) or deleted (DELETE).

Create an object:

INSERT

Change an object:

UPDATE

Delete an object:

DELETE

You  can  use  the  placeholder  “%”  for  an  action  if  you  want  to  log  the  changes  made  to  an  object

irrespective of the method in use.

Example:

You  want  to  record  all  changes  of  the  machine  configuration.  Thus,  “MNR”  is  the  object

identification for the machine. In this case, you must define “MNR” as object and “%” as action.

You only want to log changes (UPDATE) of the machine configuration. Thus, “MNR” is the object

identification  for  the  machine.  In  this  case,  you  must  define  “MNR”  as  object  and  “UPDATE”  as

action.

Log mode

You can specify the log mode for the object.

Key

Call

In this case, the system only logs fields of the object that are configured as keys.

The entire call is logged.

Signalization

To  use  the  logging  as  source  for  uploads  to  external  systems,  you  can  use  the  “SIGUSR”

communication to upload data “online”. In this context, the upload program is actively informed by

the logging application. To let the system know which program is to be informed, enter the program

name here in lower case letters without file extension, e.g. “myerprck“.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 7 von 22

Recording of Changes to Master Data

Segment

When  data  is  uploaded  from  the  HYDRA  logging  function  to  external  systems,  the  logging

configuration must include a segment name. If you specify the segment name, the upload program

can identify the data records that must be uploaded.

Log ERP data

This option activates the logging of data transferred via interfaces from external systems.

If  the  option  is  activated,  interface  data  is  logged  as  well.  If  the  entry  of  a  comment  or  label  is

enabled for the corresponding object and method, it will be ignored when interface data is logged.

Dialog logging (2nd generation)

Application area

  Terminal dialogs

  OP logons via MOC



Interface transactions via BAPI

Field descriptions

Dialog

Definition of the BAPI call you want to log.

Log mode

You can specify the log mode for the object.

  Key
In this case, the system only logs fields of the object that are configured as keys.

  Call
The entire call is logged.

  Total data
The call is logged and data that is not included in the call is reloaded.

Comment

  Mandatory
You must enter a comment when you carry out the dialog. The input field for the comment is

opened and the action cannot be performed if you do not enter a comment.

  Optional
The input of a comment is optional when you carry out the dialog. A dialog to enter a comment

is opened, but you can also perform the action without including a comment.

  No entry
You cannot enter a comment when you carry out the dialog.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 8 von 22

Recording of Changes to Master Data

Labeling

  Mandatory
You must enter a label  when  you carry out the dialog. The input  field for the label is opened

and the action cannot be performed if you do not enter a label.

  Optional
The  input  of  a  label  is  optional  when  you  carry  out  the  dialog.  A  dialog  to  enter  a  label  is

opened, but you can also perform the action without including a label.

  No entry
You cannot enter a label when you carry out the dialog.

Signalization

To  use  the  logging  as  source  for  uploads  to  external  systems,  you  can  use  the  “SIGUSR”

communication to upload data “online”. In this context, the upload program is actively informed by

the logging application. To let the system know which program is to be informed, enter the program

name here in lower case letters without file extension, e.g. “myerprck“.

Segment

When  data  is  uploaded  from  the  HYDRA  logging  function  to  external  systems,  the  logging

configuration must include a segment name. If you specify the segment name, the upload program

can identify the data records that must be uploaded.

Log ERP data

This option activates the logging of data transferred via interfaces from external systems.

If  the  option  is  activated,  interface  data  is  logged  as  well.  If  the  entry  of  a  comment  or  label  is

enabled for the corresponding object and method, it will be ignored when interface data is logged.

Service logging (3rd generation)

Application area

  Service calls (MOC / interface)

Field descriptions

Service

Definition of the service call you want to log.

Log mode

You can specify the log mode for the service call.

  Key

SIS-ASD_30.docx

Version: 1.1.19468

Seite 9 von 22

In this case, the system only logs fields of the service that are configured as keys.

Recording of Changes to Master Data

  Call
The entire service call is logged.

Comment

  Mandatory
You must enter a comment when you carry out the service. The input field for the comment is

opened and the service call cannot be performed if you do not enter a comment.

  Optional
The input of a comment is optional when you carry out the service. A dialog to enter a comment

is opened, but you can also carry out the service call without including a comment.

  No entry
You cannot enter a comment when you carry out the service call.

Labeling

  Mandatory
You must enter a label when you carry out the service. The input field for the label is opened

and the service call cannot be performed if you do not enter a label.

  Optional
The input of a label is optional when you carry out the service call. A dialog to enter a label is

opened, but you can also carry out the service call without including a label.

  No entry
You cannot enter a label when you carry out the dialog.

Signalization

To  use  the  logging  as  source  for  uploads  to  external  systems,  you  can  use  the  “SIGUSR”

communication to upload data “online”. In this context, the upload program is actively informed by

the logging application. To let the system know which program is to be informed, enter the program

name here in lower case letters without file extension, e.g. “myerprck“.

Segment

When  data  is  uploaded  from  the  HYDRA  logging  function  to  external  systems,  the  logging

configuration must include a segment name. If you specify the segment name, the upload program

can identify the data records that must be uploaded.

Key fields (key / key name)

You can use the specified key fields and their respective name to filter data within the evaluations.

Key 1
The domain of the service that you want to log is preset here.

Key name 1
The name of the domain (source repository) is preset here.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 10 von 22

Recording of Changes to Master Data

Key 2-5
The key fields of the service that you want to log are available for selection.

Key name 2-5
The respective key names of the keys of the service that you want to log.

Key word columns

You  can  assign  key  words  to  the  configured  service.  These  key  words  are  available  within  the

evaluation. You can assign each acronym of the configured service as key word.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 11 von 22

Recording of Changes to Master Data

3  Logging Key Maintenance

Usage

Logging keys need to be maintained, as the logging function does not have any information about the key

fields of an object if the changed data or the entire data are to be logged. Only does the unique key allow

tracing back the changes made to an object. In this context, the system generates a consecutive change

order for each object/key field combination. These keys can only be edited by the application.

Integration

The system can record changes to objects on the basis of the information that is kept here.

Field description

Object

Just  as  it  is  the  case  for  the  logging  configuration,  the  object  is  to  be  entered  in  this  field.  In  this

case, it does not play a role if only key fields, changes or the entire object is to be logged.

Example:

All  changes  to  the  machine  configuration  are  to  be  logged.  “MNR”  is  the  object  identification  for

logging changes.

Action

The  action  can  be  defined  in  this  field.  Since  the  key  fields  for  most  of  the  BAPIs  are  identical

irrespective  of  the  method,  “%AKTION%“  can  be  used  as  placeholder  to  be  able  to  represent  all

actions by one entry.

Key 1

The  key  1  of  a  BAPI  corresponds  to  the  object.  This  means  that  “MNR”  is  to  be  defined  for  the

above example.

Designation 1

A designation may be defined for key 1. This name will be reused in evaluations/reports.

Key 2

Key 2 and the following keys identify a single object. Please refer to annex A for further information

on which values may be defined here.

Designation 2

Designation 2 and the following designations are the keys to identify a single object. Please refer to

annex A for further information on which values may be defined here.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 12 von 22

Recording of Changes to Master Data

Key 3

See key 2

Designation 3

See designation 2

Key 4

See key 2

Designation 4

See designation 2

Key 5

See key 2

Designation 5

See designation 2

SIS-ASD_30.docx

Version: 1.1.19468

Seite 13 von 22

Recording of Changes to Master Data

4  Logging - Change Management

5.1 Summary

Menu

System administration  Logging  Logging - Change management

Transaction code

atrail

Function authorization

atrail.view - Display

atrail.diff – Show differences

Purpose

You  use  the  Logging  Change  Management  if  you  want  to  compare  various  changes  to  an  object  and

possibly revert to an earlier version of an object.

Integration

The logging function is a central function available to all master data objects.

Field descriptions

Modified on

Here you can specify the selection area to display logging entries.

Modified by

Modified by/ trigger of a logging entry.

Input type

- New

Identifies a recreated entry.

- Change

Identifies an existing, edited entry.



Labeling

Documented labeling when recreating / changing / deleting.

Comment

Documented comment when recreating / changing / deleting.

Searching for keywords

The system filters keywords. Configuration / assignment of keywords during logging configuration.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 14 von 22

Recording of Changes to Master Data

Key 1

Key 1 of a BAPI corresponds to the object.  In the example above, please store "MNR" (machine

number).

Key 2

Key 2 and the following keys are used to identify a single object.

Key 3

Refer to key 2.

Key 4

Refer to key 2.

Key 5

Refer to key 2.

Toolbar

Display of logging data

Display  logging data of the logged dialog.  Requirement to display  dialog  data is activation  of the

object "Logging dialog data" in the logging configuration of the object and maintaining the logging

key.

Display differences

Display differences between 2 logged dialogs.  You must beforehand mark the required versions for

the  compared  dialogs. While  pressing  the  STRG key  when  selecting  the  first  entry,  please  select

the second entry.  Then select the function you want to compare.

Requirement  to  display  dialog  data  is  activation  of  the  object  "Logging  dialog  data"  in  the  logging

configuration of the object and maintaining the logging key.

SIS-ASD_30.docx

Version: 1.1.19468

Seite 15 von 22

Recording of Changes to Master Data

5  Übersicht-Logging Keys

Summary

Please note:

The “action” field is used as “%AKTION%“ in any case. For lack of space, this is not stated in each
individual case.

T
K
E
J
B
O

R
N
M

F
O
R
P
T
K
F

T
K
F
B
R
A
E
B

I

S
E
R
K
R
N

T
R
A
U
A

T
X
T
T
S
M

F
C
D
L
F
R
S
U

E
D
D
L
F
R
S
U

G

F

1
Y
E
K

R
N
M

F
O
R
P
T
K
F

T
K
F
B
R
A
E
B

I

S
E
R
K
R
N

T
R
A
U
A

T
X
T
T
S
M

F
C
D
L
F
R
S
U

4
Y
E
K

5
Y
E
K

%

F
O
R
P
T
K
F
%

T
H
C
E
R
E
B

.

K
F
B
R
A
E
B
%

%
T
K
F
T

.

K
F
B
R
A
E
B
%

T
H
C
E
R
E
B
T

.

%

%
T
K
F

.

%
T
R
A
T

.

%
T
R
A

2
Y
E
K

.

N
M
R
N
M
%

%
R

F
O
R
P
T
K
F
%

F
O
R
P
T
K
F

.

K
F
B
R
E
A
B
%

%
B
R
A
E
B
T

.

%

3
Y
E
K

F
O
R
P
T
K
F
%

K
F
B
R
A
E
B
%

.

I

S
E
R
K
R
N
%

.

I

S
E
R
K
R
N
%

.

A
T
R
A
U
A
%

.

T
X
T
T
S
M
%

%
P
Y
T
J
B
O

%
T
R
A
U

%
R
N
T
S

C
D
L
F
R
S
U
%

P
Y
T
J
B
O
G
F

.

%

G

C
D
L
F
R
S
U
%

D
L
F
R
S
U
G
F

.

%

E
D
D
L
F
R
S
U

D
D
L
F
R
S
U
  %
F

%
N
N
E
K
F
E

.

D
D
L
F
R
S
U
%

:

Z
N
N
E
K
F
E

.

%

4
E
M
A
N
Y
E
K

o
i
t
a
z
i
r
o
h
t
u
a

n
o
i
t
c
n
u
f

n

5
E
M
A
N
Y
E
K

o
i
t
a
z
i
r
o
h
t
u
a

n

3
E
M
A
N
Y
E
K

n
o
i
t
c
n
u
f

e
p
y
t

m
r
o
f

l

d
e
i
f
r
e
s
u

1
E
M
A
N
Y
E
K

i

s
e
n
h
c
a
m

n
o
i
t
c
n
u
f

s
e

l
i
f
o
r
p

o
i
t
a
z
i
r
o
h
t
u
a

n
o
i
t
c
n
u
f

r
e
b
m
u
n

e
g
n
a
r

s
n

e
p
y
t

r
e
d
r
o

s
t
x
e
t

s
u
t
a
t
s

l

d
e
i
f

r
e
s
u

y
e
k

s
n
o
i
t
i
n
i
f
e
d

e
p
y
t
d
e
i
f

l

2
E
M
A
N
Y
E
K

m
u
n
n
h
c
a
m

i

r
e
b

n
o
i
t
c
n
u
f

l
i
f
o
r
p

r
e
s
u

e
p
y
t
t
c
e
b
o

j

e
p
y
t

r
e
d
r
o

r
e
b
m
u
n

s
u
t
a
t
s

e
p
y
t

t
c
e
b
o

j

e
p
y
t
d
e
i
f

l

SIS-ASD_30.docx

Version: 1.1.19468

Seite 16 von 22

Recording of Changes to Master Data

3
E
M
A
N
Y
E
K

l

d
e
i
f

r
e
s
u

s
y
e
k

m
r
o
f

l

i

a
n
m
r
e
t

p
y
t
e
c
r
u
o
s
e
r

e

e
c
n
e
r
e
f
e
r

5
E
M
A
N
Y
E
K

4
E
M
A
N
Y
E
K

D

I
-
d
e
i
f

l

n
o
s
a
e
r

e
c
r
u
o
s
e
r

r
a
e
y

4
Y
E
K

E
D
L
F
R
S
U
%

%
X
D

I
.

M
E
L

.

%
R
G
R
G
%

.

S
E
R
P
R
G
%

%
S
E
R

I

T
E
F
E
D
M
%

%
R
H
A
J
.
G

3
Y
E
K

E
D
L
F
R
S
U
%

L
F
R
S
U
M
E
L

.

%
D

%
T
R
A
R
G
%

.

.

R
N
T
R
N
M
%

%
R
N
T

.

S
E
R
P
R
G
%

%
P
Y
T
S
E
R

I

T
E
F
E
D
M
%

I

S
E
W
R
E
V
G

.

%

K
T
S
.
L
K
T
S
%

%
R
N
L

M
E

T
K
E
J
B
O

L
E
D
L
F
R
S
U

T
X
T
R
G

R
G

R
N
T
R
N
M

S
E
R
P
R
G

D
O
M
T
E
D
B

I

G
T
E
F
E
D
M

D
O
M
J
E
D
B

L
K
T
S

T
R
A
W
S
E
R

M
E

1
Y
E
K

L
E
D
L
F
R
S
U

T
X
T
R
G

R
G

R
N
T
R
N
M

S
E
R
P
R
G

D
O
M
T
E
D
B

I

G
T
E
F
E
D
M

D
O
M
J
E
D
B

L
K
T
S

T
R
A
W
S
E
R

2
Y
E
K

E
D
L
F
R
S
U
%

Y
T
J
B
O
M
E
L

.

.

G
T
X
T
R
G
%

%
R
N
T
X
T
R

.

R
N
M
R
G
%

.

R
N
T
R
N
M
%

.

S
E
R
P
R
G
%

%

%
R
N
M

%
P
R
G

O
M
T
E
D
B
%

N
D
O
M
K
S
D

.

I

T
E
F
E
D
M
%

%
T
A
D
G

.

O
M
J
E
D
B
%

%
R
H
A
J
.
D

K
T
S
.
L
K
T
S
%

R
A
W
S
E
R
%

%
L

I

S
E
W
R
E
V
T

.

%
P

%
R

%

5
Y
E
K

1
E
M
A
N
Y
E
K

s
d
e
i
f

l

r
e
s
u

t
x
e
t

n
o
s
a
e
r

t
n
e
m
n
g
s
s
a

i

n
o
s
a
e
r

i

-
e
n
h
c
a
m

p
u
o
r
g

s
e
p
y
t

y
a
d

s
y
a
d

i
l

o
h
.
b
u
p

l

e
d
o
m

r
a
e
y

e
c
n
a
b
r
u
t
s
D

i

l

i

a
n
m
r
e
t

t
n
e
m
n
g
s
s
a

i

s
e
s
s
a
c

l

c
n
a
n
e
t
n
a
m

i

r
a
d
n
a
c

l

e

t
n
e
m
n
g
s
s
a

i

2
E
M
A
N
Y
E
K

e
p
y
t

t
c
e
b
o

j

t
x
e
t

n
o
s
a
e
r

l

e
c
a
p
k
r
o
w

i

e
n
h
c
a
m

p
u
o
r
g

e
p
y
t

y
a
d

e
t
a
d

r
a
e
y

e
c
n
e
r
e
f
e
r

SIS-ASD_30.docx

Version: 1.1.19468

Seite 17 von 22

T
K
E
J
B
O

P
Y
Z

P
R
G
T

G
F
C
G
L
D

S
O
P
B

H
N
E

I

E
D
O
C
A
V

R
M
U
H
N
E

I

R
P
X
E

1
Y
E
K

P
Y
Z

P
R
G
T

G
F
C
G
L
D

S
O
P
B

H
N
E

I

E
D
O
C
A
V

R
M
U
H
N
E

I

R
P
X
E

C
I
L

C
I
L

K
M
B

K
M
B

2
Y
E
K

.

R
N
M
P
Y
Z
%

.

G
T
P
R
G
T
%

%

%
P
R

.

G
F
C
G
L
D
%

I

%
S
E
W
R
E
V

.

N
M
S
O
P
B
%

%
R

3
Y
E
K

4
Y
E
K

5
Y
E
K

:

.

R
N
M
P
Y
Z
%

%
Z

.

G
F
C
G
L
D
%

%
P
Y
T

.

G
F
C
G
L
D
%

%
R
S
U
G
L
D

.

G
F
C
G
L
D
%

.

P
B
S
O
P
B
%

%
G
L
D

%
S
O

.

I

N
E
H
N
E
%

I

%
H

R
M
U
H
N
E
%

I

%
T
A
M

.

R
M
U
H
N
E
%

I

%
P
Y
T
T
A
M

.

.

E
D
O
C
A
V
%

O
C
B
R
A
R
E
V

%
E
D

R
M
U
H
N
E
%

I

.

X
E
R
P
X
E
%

%
T
A
C
C
I
L
%

.

.

K
M
B
K
M
B
%

:

%
V
H
N
E

I

.

%
R
P

%
R
N

R
M
U
H
N
E
%

I

:

%
Z
H
N
E

I

.

K
O
R
P
C
I
L
%

.

%
Y
E

Recording of Changes to Master Data

3
E
M
A
N
Y
E
K

4
E
M
A
N
Y
E
K

5
E
M
A
N
Y
E
K

1
E
M
A
N
Y
E
K

s
r
e
t
e
m
a
r
a
p

l

e
c
y
c

2
E
M
A
N
Y
E
K

i

e
n
h
c
a
m

r
e
b
m
u
n

l

i

a
n
m
r
e
t

s
p
u
o
r
g

s
g
o
a
d

i

l

s
e
d
o
c

i

n
o
s
r
e
v
n
o
c

n
e
m
e
g
a
n
a
m

t

i

c
m
a
n
y
d

s
t
i
n
u

i

g
n
s
s
e
c
o
r
p

t
i
n
u

l

a
u
m
r
o
f

s
e
s
n
e
c

i
l

e
c
n
a
m
r
o
f
r
e
p

e
c
r
u
o
s
e
r

t
n
u
o
c
c
a

l

i

a
n
m
r
e
t

e
c
n
e
r
e
f
e
r

t
i
n
u

m
o
r
f

t
i
n
u

l

a
u
m
r
o
f

y
r
o
g
e
t
a
c

u
n
e
c
r
u
o
s
e
r

p
u
o
r
g

r
e
b
m

l

g
o
a
d

i

e
p
y
t

r
e
s
u

l

a
i
r
e
t
a
m

n
o
i
t
a
c

i
l

p
a

l

a
i
r
e
t
a
m

e
p
y
t

o
t

t
i
n
u

t
c
u
d
o
r
p

SIS-ASD_30.docx

Version: 1.1.19468

Seite 18 von 22

2
Y
E
K

C
S
A
B
E
L
M
%

%
N

I

I

E
W
R
E
V
G
F

.

I
.
I

I

N
%

3
Y
E
K

4
Y
E
K

5
Y
E
K

C
S
A
B
E
L
M
%

A
V
S
E
M
G
F

.

%
R

C
S
A
B
E
L
M
%

C
F
S
E
M
G
F

.

%
T

%
S

C
S
A
B
E
L
M
%

Y
T
S
E
M
G
F

.

%
P

%
R
S
U

.
I

I

N
%

C
Y
A
L
N
R
P
%

%
D

I
.

G
F

S
K
B
R
A
E
B
%

%
B
R
A
E
B
T

.

C
Y
A
L
N
R
P
%

S
K
B
R
A
E
B
%

%
P
Y
T
G
F

.

%
R
F
T

.

I

S
K
B
R
A
E
B
%

%
T
S
K
T

.

G

G

1
E
M
A
N
Y
E
K

o
i
t
a
r
u
g
i
f
n
o
c

i

c
s
a
b
E
L
M

n

o
i
t
a
r
u
g
i
f
n
o
c

o
i
t
a
r
u
g
i
f
n
o
c

I

N

I

t
r
o
p
e
r

n

n

r
e
t
n
e
c

t
s
o
c

o
i
t
a
z
i
r
o
h
t
u
a

n

Recording of Changes to Master Data

5
E
M
A
N
Y
E
K

n
o
i
t
c
n
u
f

e

3
E
M
A
N
Y
E
K

p
y
t
e
g
a
s
s
e
m

r
e
s
u

e
p
y
t

y
n
a
p
m
o
c

4
E
M
A
N
Y
E
K

t
n
a
i
r
a
v

r
e
t
n
e
c

t
s
o
c

2
E
M
A
N
Y
E
K

e
c
n
e
r
e
f
e
r

I

N

I

o
i
t
a
r
u
g
i
f
n
o
c

r
e
u

e
c
n
e
r
e
f
e
r

n

s
a
e
r
a

y

o
i
t
a
r
t
s
n
m
d
a

i

i

r
e
s
u

n

A
V
B
R
A
E
B
%

.

E
V
F
O
R
P
B

I

%
S
E
W
R

F
O
R
P

.

B
B
R
A
E
B
%

%
B
R
A
E

F
C
B
R
A
E
B
%

%
B
R
A
E
B
G

.

.

A
U
A
T
S
A
%

%
T
R

.

A
T
X
T
T
S
A
%

%
R
N
T
X
T
T
S

.

T
T
S
A
T
S
A
%

%
P
Y

.

T
S
A
T
S
A
%

%

t
i
l
i

i

b
s
n
o
p
s
e
r

r
e
s
u

t
n
u
o
c
c
a

s
u
t
a
t
s

r
e
d
r
o

t
x
e
t

s
u
t
a
t
s

%
S

O
R
P
B
R
A
E
B

R
P
B
R
A
E
B
  %
F

B
R
A
E
B
F
O

.

%

F

R
P
B
R
A
E
B
%

B
R
A
E
B
F
O

.

%
F
O
R
P

R
P
B
R
A
E
B
%

I

E
W
R
E
V
F
O

.

s
e
u
r

l

r
e
s
u

e
p
y
t

r
e
d
r
o

r
e
b
m
u
n
t
x
e
t

s
u
t
a
t
s

e
p
y
t

s
u
t
a
t
s

s
u
t
a
t
s

G

G

F
O
R
P

1
Y
E
K

F
C
S
A
B
E
L
M

I

N

I

F
C
Y
A
L
N
R
P

T
S
K
B
R
A
E
B

B
A
V
B
R
A
E
B

B
R
A
E
B

G
F
C
B
R
A
E
B

T
S
A

T
X
T
T
S
A

T
K
E
J
B
O

F
C
S
A
B
E
L
M

I

N

I

F
C
Y
A
L
N
R
P

T
S
K
B
R
A
E
B

B
A
V
B
R
A
E
B

B
R
A
E
B

G
F
C
B
R
A
E
B

T
S
A

T
X
T
T
S
A

O
R
P
B
R
A
E
B

SIS-ASD_30.docx

Version: 1.1.19468

Seite 19 von 22

3
Y
E
K

4
Y
E
K

5
Y
E
K

E
D
O
C
T
S
L
%

%
T
S
L
.

%

T
K
E
J
B
O

P
R
G

E
D
O
C
T
S
L

F
U
P
T
A
M

P
Y
T
T
A
M

1
Y
E
K

P
R
G

E
D
O
C
T
S
L

F
U
P
T
A
M

P
Y
T
T
A
M

2
Y
E
K

.

P
R
G
P
R
G
%

%

E
D
O
C
T
S
L
%

E
D
O
C
T
S
L
.

.

F
U
P
T
A
M
%

%
F
U
P
T
A
M

.

P
Y
T
T
A
M
%

%
P
Y
T
T
A
M

P
T
P
Y
T
T
A
M

P
T
P
Y
T
T
A
  M
E

T
P
Y
T
T
A
M
  %
E

P
Y
T
T
A
M
E
P

.

%

T
P
Y
T
T
A
M
%

%
E
P
T
E
P

.

Y
T
T
A
M
T
A
M

Y
T
T
A
M
T
A
  M
P

T
A
M
T
A
M
  %
P

%
T
A
M
P
Y
T

.

.

T
S
M
T
S
M
%

%

.

A
T
X
T
A
T
S
%

%
P
Y
T

.

R
N
M
T
S
M
%

.

R
N
P
R
N
P
%

%

%

.

S
T
X
T
A
T
S
%

%
R
N
T
X
T
A
T

.

R
N
T
R
N
T
%

%

T
S
M

R
N
P

T
X
T
A
T
S

T
S
M

R
N
P

T
X
T
A
T
S

R
N
T

R
N
T

Recording of Changes to Master Data

3
E
M
A
N
Y
E
K

4
E
M
A
N
Y
E
K

5
E
M
A
N
Y
E
K

s
u
t
a
t
s

1
E
M
A
N
Y
E
K

s
p
u
o
r
g

c
i
t
a
m
o
t
u
a

e
g
n
a
h
c

s
u
t
a
t
s

l

a
i
r
e
t
a
m

r
e
f
f
u
b

l

a
i
r
e
t
a
m

s
e
p
y
t

i

e
n
h
c
a
m

s
u
t
a
t
s

r
e
t
s
a
m
R
H

a
t
a
d

2
E
M
A
N
Y
E
K

p
u
o
r
g

l

a
i
r
e
t
a
m

l

a
i
r
e
t
a
m

e
p
y
t

p
y
t
l
a
i
r
e
t
a
m

l

a
i
r
e
t
a
m

i

e
n
h
c
a
m

l

e
n
n
o
s
r
e
p

r
e
b
m
u
n

l

i

s
a
n
m
r
e
t

l

m
u
n
a
n
m
r
e
t

i

r
e
b

SIS-ASD_30.docx

Version: 1.1.19468

Seite 20 von 22

3
Y
E
K

4
Y
E
K

5
Y
E
K

Recording of Changes to Master Data

2
E
M
A
N
Y
E
K

3
E
M
A
N
Y
E
K

4
E
M
A
N
Y
E
K

5
E
M
A
N
Y
E
K

1
E
M
A
N
Y
E
K

t
r
o
p
s
n
a
r
t

t
i
n
u

t
i
l
i

i

b
s
n
o
p
s
e
r

s
e

l
i
f
o
r
p

y

l

a
i
r
e
t
a
m

l

f
f
u
b
a
i
r
e
t
a
m

r
e

T
A
M
T
A
M
%

P
T
A
M
F
U
P

.

%
F
U

.

T
S
M
T
S
M
%

.

M
W
E
U
R
%

%

%
P
R
G

T
K
E
J
B
O

E
P
T

F
O
R
P
B
A
V

T
R
A
W

1
Y
E
K

E
P
T

F
O
R
P
B
A
V

T
R
A
W

2
Y
E
K

.

E
P
T
E
P
T
%

F
O
R
P
B
A
V
%

.

N
M
T
R
A
W
%

%

F
O
R
P
B
A
V

.

%
R

%

U
P
T
A
M
T
A
M

U
P
T
A
M
T
A
  M
F

T
A
M
T
A
M
  %
F

%
T
A
M
F
U
P

.

.

R
N
M
T
S
M
%

.

Y
T
W
E
U
R
%

%

%
P

R
A
V
T
R
E
F
%

I

S
E
W
R
E
V

.

.

T
S
I
L
T
A
M
%

%
R
N
A

%

T
S
M

W
E
U
R

R
A
V
T
R
E
F

T
S
I
L
T
A
M

T
S
M

W
E
U
R

R
A
V
T
R
E
F

T
S
I
L
T
A
M

O
R
P
B
R
A
E
B

R
A
V
N
A
L
P

O
R
P
B
R
A
E
B

R
P
B
R
A
E
B
  %
F

B
R
A
E
B
F
O

.

%

F

R
P
B
R
A
E
B
%

B
R
A
E
B
F
O

.

%
F
O
R
P

R
P
B
R
A
E
B
%

%
N
N
E
K
F
O

.

R
P
B
R
A
E
B
%

%
L
A
V
F
O

.

R
A
V
N
A
L
P

R
A
V
N
A
L
P
%

R
A
V
N
A
L
P

.

%

SIS-ASD_30.docx

Version: 1.1.19468

Seite 21 von 22

Recording of Changes to Master Data

4
Y
E
K

5
Y
E
K

1
E
M
A
N
Y
E
K

2
E
M
A
N
Y
E
K

3
E
M
A
N
Y
E
K

4
E
M
A
N
Y
E
K

5
E
M
A
N
Y
E
K

3
Y
E
K

.

S
E
R
S
E
R
%

%

.

P
Y
T
S
E
R
%

T
X
E
Y
T
S
E
R

%

.

P
Y
T
S
E
R
%

:

L
E
B
S
U
A
L
P

%

T
K
E
J
B
O

S
E
R

P
Y
T
S
E
R

M
A
F
S
E
R

A
T
S
S
E
R

1
Y
E
K

S
E
R

P
Y
T
S
E
R

M
A
F
S
E
R

A
T
S
S
E
R

2
Y
E
K

.

S
E
R
S
E
R
%

%
P
Y
T

.

P
Y
T
S
E
R
%

%
P
Y
T
S
E
R

.

M
A
F
S
E
R
%

%
M
A
F
S
E
R

.

A
T
S
S
E
R
%

I

D
P
Y
T
S
E
R

%

SIS-ASD_30.docx

Version: 1.1.19468

Seite 22 von 22

