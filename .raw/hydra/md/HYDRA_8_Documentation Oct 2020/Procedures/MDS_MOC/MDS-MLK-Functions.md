MDS MLK Functions

1  MOC Layout Configuration

1.1  Changing the size of detail applications

You can change the size and place of each detail application using drag and drop in the space reserved

for the detail applications.

To  change  the  size,  move  the  mouse  pointer  to  the  edge  of  an  application,  click  and  hold  the  mouse

button, drag the application to the required size and then release the mouse button.

1.2  Docking

You  can  place  the  detail  applications  next  to  or  below  each  other  or  you  can  dock  them.  The  term

"Docking" results from the fact that separate applications are always docked to either the edge of a (main)

application  or next to or above  each other,  i.e.  a single detail application always  has a reference to the

related main or affiliated application.

By activating the MES Development Suite, the docking mechanism is automatically activated. Using this

mechanism, you can place the detail application where you like using drag and drop. Click the title bar of

a detail application, hold the mouse button and move the mouse.

The  mouse  movement  releases  the  current  docking  state  of  the  application  and  the  available  docking

options are shown by arrow symbols (see screenshot). If the released application is now moved  towards

one of the symbols, a color change indicates the effect of a shift. When you release the mouse button, the

detail applications will dock at the required location.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 1 of 10

MDS MLK Functions

You  can  use  other  detail  applications  or  the  main  application  as  possible  docking  locations.  A  special

feature is provided by the icon for "tabbing" detail applications, where applications are placed one above

the other. You then use the tabs to display a detail application in the foreground.

From a technical point of view, it is generally possible to arrange detail applications "undocked"

or  "floating",  but  these  detail  applications  will  then  leave  the  "context"  of  the  MOC  and  are

treated  as  separate  windows  by  Windows.  For  this  reason,  the  undocked  detail  application  is

not recommended.

When you create a docking configuration, you must configure the location with reference to the

lines because if you change the size of the main application, the detail applications are changed

accordingly  (this  is  important  when  you  change  to  the  "maximize"  window  mode).  See  the

examples below:

Example 1: Docking in a multi-line application

The  following  example  describes  how  a  multi-line  docking  configuration  is  created  and  how  it  can  be

used, for example, in the application Workplace overview.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 2 of 10

Step  1:  Detail  application  1  is  always  docked  to

the selection panel of the main application.

MDS MLK Functions

Step  2:  In  the  example,  detail  application  2  must

be displayed to the right of detail application 1. For

this  reason,  it  is  docked  to  the  right  of  the  detail

application.  An  invisible  "virtual  docking  panel"

opens  that  includes  both  applications.  This  virtual

docking  panel  makes  sure

that  both  detail

applications always have the same height – this is

then called a line with detail applications.

Step  3:  You  want  to  display  detail  application  3

below the existing applications. For this reason,  it

is  docked  to  the  bottom  of  the  "virtual  docking

panel".

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 3 of 10

MDS MLK Functions

Step 4: Detail application 4 is again docked on the

right  hand  side  of  detail  application  3.  Another

"virtual docking panel" is created that ensures the

correct height of detail applications 3 and 4.

Step 5: You want to customize detail application 5

as

"tabbed  detail  application"  with  detail

application  4.  To  generate

tabbed  detail

applications,  new  detail  applications  are  simply

dragged "into" an existing application.

Tabbed  detail  applications  behave  like  single

applications  if  their  size  is  changed.  As  many

detail applications as required may be tabbed.

Step  6:  A  new  line  is  generated  -  the  new  detail

application is docked to the "virtual docking panel"

of the second line and, as a result, the next detail

application is docked to the right of it into the new,

third line.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 4 of 10

MDS MLK Functions

Step  7:  The  third  line  is  to  include  three  detail

applications  next

to  each  other.  The

third

application  is  docked  to  the  right  of  the  second

application,  and  as  a  result,  automatically  to  the

"virtual docking panel" of the third line.

This results in an application that is docked line by

line. The height of the rows can be changed at the

marked positions.

The  MOC  provides  a  mechanism  for  changes  of

size. If the size of a detail application is changed,

the  detail applications at the bottom automatically

change  their  size,  too,  and  empty  spaces  are

avoided.

The empty space shown in the picture on the right

is

filled  automatically  when

the  size  of

the

application is changed.

Example 2: Docking in an application with detail applications of different

heights

The  next  example  shows  how  an  application  is  created  that  includes  detail  applications  with  different

heights. The activity calendar is an example for such an application.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 5 of 10

Step  1:  Detail  application  1  is  docked  to  the

selection panel of the main application.

MDS MLK Functions

Step  2:  Detail  application  2  is  docked  to  the  right

of  detail  application  1.  This  results  again  in  a

"virtual  docking  panel"  that  includes  the  two  detail

applications.

Step  3:  Detail  application  3  is  docked  inside  of

detail  application  1  to  the  bottom.  This  generates

another  "virtual  docking  panel"  at  the  location

where  detail  application  1  has  been  before.  This

"virtual  docking  panel"  now

includes  detail

application  1 and detail application 3 and together

with  detail  application  2  it  also  represents  the

content of the first "virtual docking panel".

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 6 of 10

MDS MLK Functions

The result is an application where you can change

the height of the lines at the highlighted points.

The  next  time  sizes  are  changed,  the  free  space

below the applications is automatically filled so that

the two lower applications fully use it.

1.3  Simple customization of table views

Most  applications  use  table  views  ("grids")  to  display  data.  Tables  have  several  columns.  The  columns

are grouped in so-called categories.

Show and hide columns and categories

Using drag and drop, you can move columns within categories and you can move the entire categories.

Any user can individually make this kind of changes for any table view in any application.

You  can  also  use  the  layout  configuration  to  remove  columns  and  categories  or  show  hidden  columns

and categories using the context menu (right-click the column header to open the context menu).

If you want to show a column of a hidden category, you must first show and add the category to

the table.

Filtering table results

In the grid, you can filter by specific values in the columns. Just click the pin next to the column header. A

selection list of all values in this column is shown. This is the same procedure as filtering in MS Excel.

If you have set a filter for a column, this filter is displayed at the bottom left of the grid. Click the checkbox

to delete the filter. You can edit and refine the filter subsequently. For this purpose, the button "Edit filter"

is shown at the bottom right of the grid. Click to open the window with the filter editor. Optionally, you can

open  the  filter  editor  using  the  function  Filter  editor  in  the  context  menu.  In  the  dialog,  you  can  select

columns and specify comparison operators and values for each column.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 7 of 10

MDS MLK Functions

Red text: if you click the red text, a list of possible link methods for several filters is shown.

Blue text: A list of columns included in the grid is shown. You can define a filter for these columns.

Green text: The list of available comparison operators for a filter is shown.

Plus: A new filter is added.

Cross: The relevant filter is removed.

You can subsequently extend an existing filter. The column of the column header, which has been clicked

to show the dialog, is always suggested as comparison value.

Filters entered once are saved and can be called again. You can therefore create a list of filters. When

the list has been stored in the customization level "Local", the list can be distributed to the users.

1.4  Customization of symbols

You can not only translate label texts, but you can also replace MOC symbols. You only need to store an

image  file  with  the  required  name  and  in  a  format  that  is  supported  (PNG,  JPG,  ICO)  in  the  folder

%scope%/resources/images.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 8 of 10

You  can  identify  the  symbols  and  images  used  and  their  names  using  the  dialog  Selected  icons.

Example: To replace the "ApplicationLogo" icon, an image file with precisely this name must be stored in

the "resources" folder.

MDS MLK Functions

Most symbols are available in the resolutions  32x32  (xxxLarge) and  16x16 (xxxSmall).  The table  below

shows some exceptions.

Symbol / image

Name

Resolution

Start screen (splash screen)

splash.jpg

480x285

MOC logo (taskbar on the bottom right)

Logo.png

69x25

Start button (taskbar on the bottom left)

StartButton.png

104x20

If  an  image  has  a  different  resolution  than  the  one  mentioned  above,  unwanted  effects  in  the

display can occur, for example on the MOC desktop.

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 9 of 10

You can use the MOC "Update Package Creator" (Extras  Generate Update Package) to create update

packages  with  own  icons.  This  update  package  can  be  loaded  in  the  Maintenance  Manager  and

distributed to all clients of the system.

MDS MLK Functions

MDS-MLK-Functions.docx

Version: 1.2.16837

Page 10 of 10

