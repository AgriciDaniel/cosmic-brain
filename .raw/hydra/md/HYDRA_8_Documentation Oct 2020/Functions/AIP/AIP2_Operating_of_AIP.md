AIP2 Operation

1  AIP2 Operation

1.1  Special Control and Display Elements on the AIP2

Tables

Uniform selection lists are used in AIP 8.2 posting dialogs:

  If  information  is  available  for  more  than  one  page,  the  page  numbers  are

displayed  below  the  table.  The  current  page  is  highlighted  in  bold  letters.  If  the  user  clicks/touches  a

page, the display directly changes to this page.

If more pages are available than the page numbers displayed, the following buttons can be displayed on

the left or right hand side depending on the context (available as of SP10/2016):









 :  If  you  click  this  button,  the  system  jumps  to  the  first  page  of  the  next  page  navigation.

This  means:  If  Page  1  ...  Page  9  were  displayed  for  the  page  navigation,  the  system  jumps  to

Page 10.

 :  If  you  click  this  button,  the  system  jumps  to  the  first  page  of  the  next  page  navigation.

This means: If Page 10 ... Page 18 were displayed for the page navigation, the system jumps to

Page 9.

 : If you click this button, the system directly jumps to Page 1.

 : If you click this button, the system directly jumps to the last page.

You can select an operation using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner or

by entering it manually.

The content of tables or lists depends on the respective context. Example: When you log on an operation,

those  operations  are  available  that  are  included  in  the  sequencing  list  or  planned  for  the  respective

workplace or group. When you interrupt an operation, only running operations are available for selection.

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 1 of 6

AIP2 Operation

 Scrolling page by page (up or down) in the table.

 Scrolling to the left or right. Only those buttons are activated that make sense for the current

situation (context sensitive). This figure shows that scrolling to the left has been deactivated.

Optionally you can display a “table filter” (customization). This is an automatic filter that, once it has been

entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through  full-text

search for (defined) columns. The search is case-insensitive.

Virtual keyboard

Using  the  virtual  keyboard,  you  can  enter  data  manually  via  touch  screen  or  a  connected  mouse.  The

virtual keyboard is displayed automatically as soon as the focus is on an input field. The keyboard layout,

which  is  installed  and  activated  in  the  Windows  language  settings,  specifies  the  layout  of  the  virtual

keyboard.

 Moving the virtual keyboard

 Hiding the keyboard for 10 seconds

 Switching between the alphanumeric and numeric keyboard

 Selecting the keyboard layout (language)

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 2 of 6

AIP2 Operation

 Changing the scaling/size of the keyboard

To move  the  keyboard,  you  must  configure  the  driver  accordingly  (configuration  in  the  control

panel of the terminal/PC)!

If you do not want to display the virtual keyboard in general, you must enter the parameter –t in the entry

parameters= of the configuration file ctaip.ini.

Date display

AIP supports a country-specific date format in dynamic dialogs. The option "short date" has to be selected

in the "regional settings" of the Windows "control panel" of the terminal/PC. Please note:

  Years are always four characters long.

  Months and days are always 2 characters long.

  Allowed separators are: '-‘ (minus), '/‘ (backslash) and '.‘ (dot).

  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

  English(USA)
  Danish
  Customer-specific 1
  Customer-specific 2
  Customer-specific 3

Note

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD
MM/YYYY/DD

If the date format used is other than the permitted formats, a note appears when the program is started

and the date format is set to MM/DD/YYYY.

In the status bar, the year format is shortened and displayed only with two characters.

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 3 of 6

AIP2 Operation

1.2  General description of the posting process on the AIP2

Many AIP posting dialogs are divided  into several  views (sub-dialogs). These views (sub-dialogs) cover

the entire screen so that only one dialog is visible at a time. In a “workflow concept” the user is navigated

through  the  posting  dialog  step  by  step.  In  the  following,  this  process  is  described  using  the  example

Interrupt operation. Other posting dialogs are operated in the same way.

The action Interrupt operation is performed. To start this action,  you click the button  Interrupt  when  you

have selected an operation:

The dialog Interrupt operation opens and the first view (sub-dialog) is displayed. The header displays the

function that is currently being executed (here: Interrupt operation).

1st view (sub-dialog)
The views are run through one after the other

Posting that is currently being performed

Quantities already
recorded (yield,
scrap)

General OP data

Active input field

Virtual keyboard

In the first dialog Enter quantities, the user can enter the produced yield or scrap quantities. Subject to the

active input field, the virtual keyboard is shown or hidden automatically.

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 4 of 6

AIP2 Operation

Quantities can be entered using the virtual or real keyboard. The user can go to the next field using the

tabulator key (which can also be found on the virtual keyboard). When the user has entered all values in

the first view, the next view (sub-dialog) can be opened by clicking Next.

The Cancel button is displayed in all sub-dialogs. Click this button to cancel/close the entire process at

any time.

To  open  the  next  view  (Select  status  in  the  example),  click  the  Next  button  or  another  tab  (in  our

example: Select status or Confirmation). Please note in this context, that no view can be skipped when

they  are  navigated  upwards  (view  1    view  2    view  3).  This  means:  When  you  are  in  the  first  view

(enter  quantities)  and  you  click  the  third  view  (confirmation),  the  second  view  (select  status)  will  be

displayed first.

Vice  versa,  when  navigating  downwards  (e.g.  from  the  confirm  view  to  the  enter  quantities  view),  each

view  can  directly  be  opened  by  clicking  the  required  tab.  In  this  case,  views  can  actually  be  skipped.

Using the Back button, views are opened one after the other (upwards).

As long as the dialog has not been confirmed, the data entered can be changed at any time by scrolling

back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has been

interrupted. You can select the status from the status list displayed. This list can be restricted using the

Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be  opened  by

clicking Next (in our example it is the last view).

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 5 of 6

AIP2 Operation

Workplace data

Quantities posted for the OP

Input field for the badge number

The sub-dialog Confirmation shows a summary of all values entered in the dialog. If the user agrees with

the  entered  data,  the  Interrupt  operation  dialog  can  be  confirmed,  once  the  badge  number  has  been

entered. Then the dialog is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  completed  properly  (e.g.  a  mandatory  field  is  empty),  the  field  is

highlighted in red in the respective view and gets the focus. The user can then directly correct the value.

If a workflow dialog is opened, you can click the ESC key to directly exit the dialog. This exit is

also possible, if the virtual keyboard is displayed. As a consequence, you cannot use the ESC

key to close the virtual keyboard.

AIP2_Operating_of_AIP.docx

Version: 1.5.22529

Page 6 of 6

