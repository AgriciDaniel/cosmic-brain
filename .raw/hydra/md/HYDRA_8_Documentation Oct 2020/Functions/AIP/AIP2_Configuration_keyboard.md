AIP2 - Local Configuration File keyboard.ini

1  AIP2 - Local Configuration File keyboard.ini

You  configure  the  virtual  keyboard  of  the  AIP2  terminal  in  the  keyboard.ini  file  in  the  directory

c:\mpdv\aip2 for the specific terminal.

To activate the changes in the configuration file, you must restart the terminal software.

Logic enabling the virtual keyboard:

The AIP2 terminal shows the keyboard if an input field is focused. The keyboard is placed with reference

to the field as described below:

Logic for placing the virtual keyboard:

It is tried to place the keyboard directly below the input field. If there is not enough space to the bottom of

the screen, it is tried to place the keyboard directly above the input field. If the space above the control

element is not sufficient for the keyboard, the keyboard is placed at the bottom of the screen.

These are the priorities for horizontal alignment:

-

-

-

to the right of the control

to the left of the control

to the edge of the screen that is further away from the control

If the “VirtScreenSize“ option is enabled, the virtual keyboard is not aligned on the virtual screen but still

on the real screen. Consequently, the keyboard may also reach beyond the terminal program.

The virtual keyboard can be configured in the local keyboard.ini file on the terminal. Example:

[Keyboard]

HideTime=10

ScaleMultiplier=0.9

FixNumbers=ON

Configuration=ON

;Logging=ALL

;Processes=ctaip.exe

;ClassesForLetters=TVtEdit

;ClassesForNumbers=TMPDVSimpleNumericField

HideTime

The set value specifies for how many seconds the keyboard is invisible if you click on the key showing the

icon

 on the left hand side. This key is not visible if the value "0" is entered.

AIP2_Configuration_keyboard.docx

Version: 1.5.22524

Page 1 of 3

AIP2 - Local Configuration File keyboard.ini

ScaleMultiplier

The keyboard size can be reduced and increased. The value range is between 0.9 and 4.0. A dot is used

as decimal separator.

The default value is 1.0.

FixNumbers

Allowed values: ON|OFF

If  FixNumbers=On  is  set,  the  number  keys  located  in  the  top  row  of  the  virtual  keyboard  remain  visible

even if the Shift key or CapsLock key is pressed. ON is set by default.

Configuration

Allowed values: ON|OFF

The  keyboard  layout,  which  is  installed  and  activated  in  the  Windows  language  settings,  specifies  the

layout  of  the  virtual  keyboard.  You  can  activate  different  keyboards  in  the  operating  system.  For  the

virtual keyboard, you can then switch between the different activated keyboards.

The entry Configuration=ON activates the button

. Use this button to open the dialog to select one of

the keyboards activated in the operating system.

Default is OFF.

Logging

Allowed values: OFF|ON|ALL

Logging can be enabled using this entry. The advanced logging is configured by setting ALL.

OFF is set by default.

Processes

The  entry  "Processes"  specifies  for  which  additional  processes  the  virtual  keyboard  will  be  used.  The

separate entries are separated by comma (e.g. processes=notepad.exe.explorer.exe).  If this entry is not

included, the keyboard for these processes is available in ctaip.exe und iniedit.exe.

AIP2_Configuration_keyboard.docx

Version: 1.5.22524

Page 2 of 3

AIP2 - Local Configuration File keyboard.ini

ClassesForLetters

This  entry  defines  for  which  additional  classes  the  alpha-numeric  keyboard  should  be  displayed.  The

current classes for AIP2 (TMPDVSimpleField, TsEdit, TsMemo, TMPDVTypEdit, TMPDVSimpleEditField,

TMPDVPictureField,TEdit,  TButtonedEdit,  TEditControl)  are  fixed  in  the  source  code.  This  entry  can  be

used to extend the list.

ClassesForNumbers

This  entry  defines  for  which  additional  classes  the  numeric  keyboard  should  be  displayed.  The  current

classes  applicable  for  the  AIP2  (TMPDVNumericField,  TPagerNumField,  TMPDVSimpleNumericField,

TVTEdit) are fixed in the source code. This entry can be used to extend the list.

The classes that are fixed in the source code cannot be overridden using a different entry in the

configuration file. If you want to display the other keyboard for a field, you can change the input

type of the field in Dialog Configuration.

Dialog-specific configuration

There is the option from version 1.6.0.0 of the keyboard.exe to configure the location of the virtual

keyboard per dynamic dialog.  The user has to extend the configuration file keyboard.ini accordingly.

Sample configuration:

[WF_AA_QUA]

=> Name of the dynamic dialogs

X-Position=50

=> Distance in pixels from the left edge of the screen

Y-Position=50

=> Distance in pixels from the top edge of the screen

-  Specifying the X- and Y-position is mandatory.

-  The configuration is only available for dynamic dialogs that are configured on the MOC.

The virtual keyboard can also be switched off if the terminal is connected to a real keyboard. This can be

configured in section [SYSTEM] of the local ctaip.ini file.

Example:

[SYSTEM]

Parameters=-t

Syntax:

+t/-t --> enables/disables the virtual keyboard; irrespective of the terminal type

AIP2_Configuration_keyboard.docx

Version: 1.5.22524

Page 3 of 3

