Local Configuration File keyboard.ini

1  Local Configuration File keyboard.ini

Settings  for  the  virtual  keyboard  are  configured  for  specific  AIP  terminals  in  the  keyboard.ini  file  of  the

directory c:\ctaip.

Changes to the configuration file will not take effect until after the terminal software has

been restarted.

Logic enabling the virtual keyboard:

The AIP terminal shows the keyboard for fields where data can be entered. The keyboard is positioned as

described below:

Logic for positioning of the virtual keyboard:

As soon as the activation command has been sent, the keyboard receives the coordinates for the center

as well as information on the height and width of the control element to which it is added.

At first, an attempt is made to attach the keyboard directly below the control element. If the lower margin

is  not  sufficient,  an  attempt  is  made  to  place  the  keyboard  directly  above  the  control  field.  If  the  space

above the control element is not sufficient for the keyboard, an attempt is made to position the keyboard

at the bottom margin of the screen. In case the space above the control panel is three times as large as

the one below the control element, the keyboard will be positioned at the top margin of the screen.

These are the priorities for horizontal alignment:

-

-

-

to the right of the control

to the left of the control

to the screen margin that is farther from the control

If the “VirtScreenSize“ option is enabled, the virtual keyboard is not aligned within the virtual screen but

still within the real screen. Consequently, the keyboard may also reach beyond the terminal program.

Entry

Comment

Section [User]

General settings

AIP_Configuration_keyboard.docx

Version: 1.1.12661

Page 1 of 3

Local Configuration File keyboard.ini

Entry

Comment

Definition  of  additional  customer-specific  keys  displayed  in  the
upper row:

Key1=del,8,Delete
Key2=<,37,Cursor left
Key3=>,-39,Cursor right
Key4=<<,36,Cursor
at
beginning
Key5=/

the

Keys  are  configured  with  the  following  syntax  in  tasten32.ini
within the section [User]:
Key<i>=<CH>[,<Code>[,<Comment>]]
Key<i>:  Key1..Key5
<CH>: Characters displayed on the key and the code of which is
sent
successfully tested characters:
§=)/?`´{[]}#.;<>_*~:€äüöÖ²³@ªº¿®ÇüéâäæÆø£®½¼©¥ãµ
Characters that lead to errors while testing: !“$%(&,’
<Code>: Code that is sent instead of the character code
<Comment>: any comment

Show key "shift"
The  key  has  been  designed  for  switching  between  upper  case
and lower case letters
Starting from version 2.0.1.5 of keyboard.exe (30 April 2012), the
virtual  keyboard  automatically  shows  or  hides  letters.  This
depends on whether the current field is numeric or alphanumeric.
This  button  disables  the  function  so  that  the  virtual  keyboard  is
always "opened" ("dropped down").

ButtonShift=ON

ContextSensitive=off

AIP_Configuration_keyboard.docx

Version: 1.1.12661

Page 2 of 3

HideTime=10
HideTime=0

HideMode=1
HideMode=2

Trace=1

Local Configuration File keyboard.ini

Entry

Comment

Starting  from  version  2.0.1.5  of  keyboard.exe  (30  April  2012),
there  is  a  new  button  on  the  virtual  keyboard  allowing  to
disable/hide  the  keyboard  for  a  configurable  period  of  time  (by
default=10  sec.).  Once  switched  to  a  new  field,  the  virtual
keyboard will immediately appear at the new position even if the
hide period has not yet expired.
The "hide" button is removed by configuring HideTime=0.

HideMode=0  (by  default)  means  the  virtual  keyboard  appears,
once  another  dialog  (e.g.  a  message  indicating  "...  is  being
loaded...") is opened and the input focus returns to the dialog.
1: The virtual keyboard is hidden over the indicated period, even
though  another  AIP  dialog  is  opened.  The  virtual  keyboard  is
shown immediately after switching to another field of the dialog.
2:  Like  (1)  but  the  virtual  keyboard  remains  hidden  even  after
switching  to  another  field  of  the  dialog.  The  virtual  keyboard  is
only  shown  before  the  HideTime  has  expired,  if  the  dialog  is
closed and reopened.
Trace=1 enables logging (prot_kbd.txt) for the virtual keyboard.
(AIP 2.0.3.25 / keyboard 2.0.2.3)
Additional  scaling  factor  reducing  or  increasing  the  keyboard.
This  makes  it  possible  to  cover  as  less  information  as  possible
and to keep maximum user friendliness. This setting is useful, in
particular, for large screens with low resolution and vice versa.
(keyboard.exe  V2.0.1.5)
Alphanumeric mode based on the German typewriter keyboard
(keyboard.exe  V2.0.2.2)
General settings

Configuration of the skin (normally, default values are sufficient –
the section is not required)

Shows a button enabling and disabling the skin

ScaleMultiplier=0.7

KEYMODE=QWERTZ

Section [SKIN]

[SKIN]
Directory=..\..\..\tastatur\
skins
Name=mpdv
Saturation=0
Hue=0
SkinButton=on

AIP_Configuration_keyboard.docx

Version: 1.1.12661

Page 3 of 3

