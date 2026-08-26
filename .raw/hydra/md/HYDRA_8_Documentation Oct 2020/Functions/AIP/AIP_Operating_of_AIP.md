Operation of AIP

1  Operation of AIP

1.1  Special control and display elements within AIP

Tables

Tables are displayed in a uniform way within AIP. This affects the basic display (workplaces, operations,

…) as well as the selection lists of posting dialogs.

 Provided that information is available for more than one page, the page numbers

are displayed below the table. The current page is highlighted in bold letters. By clicking/touching the user

can directly switch to another page.

An operation may be selected using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

The content of tables or lists depends on the respective context. Please find the following example: When

an operation  is logged  on,  those operations may  be selected that are included  in the sequencing  list or

that  are  planned  for  the  corresponding  workplace  or  group.  However,  when  operations  are  interrupted,

only running operations may be selected.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the  left  or  right.  Only  those  buttons  are  activated  that  are  reasonable  for  the

current situation. This figure shows that scrolling to the left has been deactivated.

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 1 of 6

Operation of AIP

  A

“table filter” may optionally be displayed (customizing). This is an automatic filter that,  once  it has been

entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through  full-text

search for (defined) columns. The search is case-insensitive.

Virtual keyboard

The virtual keyboard allows for data to be entered manually via touch screen or a connected mouse. To

make it easier for inexperienced users to find the required keys, the numeric key pad is organized like the

telephone  and  letters  are  aligned  in  alphabetical  order.  Consequently,  both  differ  from  the  computer

keyboard  which  usually  is  aligned  in  the  “QWERTZ keyboard  layout”.  The  virtual  keyboard  is  displayed

automatically as soon as an input field is focused.

Moving the
virtual keyboard

Hide keyboard
for 10 seconds

Delete

Tabulator

Space bar

The  driver  needs  to  be  configured  respectively  for  the  touch  screen  to  be  able  to  move  the

keyboard

(settings

in

the

control

panel

of

the

terminal/PC)!

The  virtual  keyboard  only  supports  the  characters  "0"  -  "9",  "A"  -  "Z"  and  "+“,  "-“  ,  ".“  and  ",“.

Other  characters  or  languages  are  not  supported.  It  is  recommendable  to  use  an  additional

keyboard if texts in other languages have to be entered.

The start position of the virtual keyboard can be defined by a setting in the configuration file keyboard.ini.

Subject to the screen resolution, the parameters xpos= and ypos= need to be enabled in the configuration

file.

If  the  virtual  keyboard  is  not  to  be  shown  in  general,  the  parameter  –t  needs  to  be  included  in  the

parameter bar parameters= of the configuration file ctaip.ini.

Date display

AIP  supports  a  country-specific  date  format  in  dynamic  dialogs.  This  can  be  configured  in  the  "control

panel",  "regional  settings",  "short  date"  dialog  of  the  terminal/PC.  The  following  has  to  be  taken  into

account in this context:

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 2 of 6

Operation of AIP

  Years are always four characters long.

  Months and days are always 2 characters long.



“-“, “/“ and “.“ are allowed separators

  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

  English(USA)
  Danish
  Customer-specific 1
  Customer-specific 2
  Customer-specific 3

Please note

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD
MM/YYYY/DD

If the date format does not correspond to conventions a note appears when the  program is started and

the date format is set to MM/DD/YYYY.

The year is displayed only by two characters in the status bar.

1.2  General description of the posting process with AIP

In  general,  posting  dialogs  are  divided  into  several  visual  views  at  AIP.  These  views  (partial  dialogs)

cover  the  entire  screen  and  only  one  dialog  is  visible  at  a  time.  In  a  “workflow  concept”  the  user  is

navigated  through  the  posting  dialog  step  by  step.  This  process  is  described  by  way  of  the  following

example (interrupt operation). The other dialogs can be operated in the same way.

The  “interrupt  operation”  function  is  executed.  This  task  is  started  by  clicking  the  “interrupt  operation”

function from the second toolbar:

The “interrupt operation” dialog opens and the first view is displayed. The function that is currently being

executed (in this case: interrupt operation) is shown in the header.

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 3 of 6

Operation of AIP

The first view “enter quantities” provides the user with the possibility to enter the produced yield or scrap

quantities. The virtual keyboard is shown or hidden automatically, subject to the active input field.

Quantities can be entered using the virtual keyboard or real keyboard. The user can go to the next field

using  the  tabulator  key  (which  can  also  be  found  on  the  virtual  keyboard).  Once  all  values  have  been

entered in the first view, the next view can be opened by clicking the “next” button.

The  “cancel”  button  is  displayed  in  all  partial  dialogs  and  allows  for  the  entire  posting  dialog  to  be

cancelled/closed at any time.

The  next  view  can  be  opened  either  by  clicking  the  “next”  button  or  by  clicking  another  tab  (in  our

example: “select status” or “confirm”). Please note in this context, that no view can be skipped when the

views are navigated bottom up (view 1  view 2  view 3). This means: if you are in the first view (enter

quantities) and you click the third view (confirm), the second view (select status) will be displayed first.

Vice versa, when navigating top down (e.g. from the “confirm” view to the “enter quantities” view), every

view  may  directly  be  opened  by  clicking  at  it.  In  this  case,  views  are  actually  skipped.  But  the  “back”

button also allows for the views to be opened one after the other (top down).

As long as the dialog has not been confirmed, entered data may be changed at any time by scrolling back

and forth.

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 4 of 6

Operation of AIP

The  workplace  status  that  is  to  be  set,  once  the  operation  has  been  interrupted,  is  determined  in  the

second  view  “select  status”.  This  status  may  be  chosen  from  the  displayed  status  list.  This  list  can  be

restricted  using  the  “filter”  field.  Once  the  required  values  have  been  entered,  the  next  view  can  be

opened by clicking “next” (in our example it is the last view).

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 5 of 6

Operation of AIP

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that the

user  agrees  with  the  entered  data,  the  “interrupt  operation”  dialog  can  be  confirmed,  once  the  badge

number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted  in  red  in  the  corresponding  view  and  focused  to  enable  the  user  to  directly  correct  the  field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also

the case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the

virtual keyboard.

AIP_Operating_of_AIP.docx

Version: 1.3.1362

Page 6 of 6

