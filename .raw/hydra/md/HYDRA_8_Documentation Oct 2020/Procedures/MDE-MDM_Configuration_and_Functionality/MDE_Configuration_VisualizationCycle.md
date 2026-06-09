Configurations for the Display of Actual and Target Cycle

1  Configurations for the Display of Actual and Target Cycle

Purpose

In a production using clocks, the display of the current actual and target cycle of a machine is an important

information. The system provides different options or units to display the cycle:

  Seconds/1000 clocks (is equal to milliseconds per 1 clock)

  Seconds/clock

  Clocks/minutes

This document describes the configuration options allowing the display of the actual and the target cycle

on the shop floor terminal AIP 8.1 and 8.2 and on the MOC.

Display of cycles on the MOC

The MOC shows the target/actual cycle in seconds per clock/stroke. You can display the cycle on the MOC

in the following MOC applications:

  Workplaces/Machines

  Cycle progression.

In the shop floor data collection (BDE), you can not only display the current actual cycle, but

also the actual cycle of a specific operation. The calculation of the operation-related actual cycle

is described in the document OBJECT_MES-Operation_ActualData.pdf.

In  the  application  Configure  syntactic  types,  you  can  configure  the  cycle  display  on  the  MOC.  This  is

described in the document MOC_Configuration.pdf in section "2 Change table data - Cycle configuration".

If communication to the server is not possible, the MOC continues to show the last value. This

value is also shown if the machine is not in production any more.

The actual cycle displayed on the MOC can be different to the actual cycle displayed on the

AIP 8.2 because the actual cycle is only sent to the server in case of specific events (dialogs

M_AST, M_MST).

Display of cycles on the terminal AIP 8.1

Via customization, you can display the actual cycle/target cycle in the dynamic dialogs on the AIP that show

machine information (MMINFO and MINFO). The following formats are supported:

  Seconds/1000 clocks (is equal to milliseconds per 1 clock)

MDE_Configuration_VisualizationCycle.docx  Version: 1.2.22805

Page 1 of 5

Configurations for the Display of Actual and Target Cycle

  Seconds/clock

  Clocks/minutes

To this end, you must store the acronym MNR.IZY or MNR.SZY in the relevant dynamic dialogs. In AIP

standard processing, the field is automatically downloaded when data is reloaded.

If you use a customized version of the ctaiplay.ini file, this file could overwrite the downloaded

field.

To display the respective format, you must store the required acronym in the dialogs:

Meaning

Identifier  in  dynamic  dialog

Identifier

in  dynamic  dialog

[target cycle]

[actual cycle]

Seconds/1000  clocks  (is

MNR.SZY

MNR.IZY

equal  to  milliseconds  per

1 clock)

Seconds/clock

MNR.SZY/HUB

MNR.IZY/HUB

Clocks/minutes

MNR.SZY/MIN

MNR.IZY/MIN

  Display "actual cycle [sec/cycle] / [sec/stroke]" using "MNR.IZY/HUB"

o  Acronym: MNR.IZY/HUB with name Actual cycle [sec/cycle] or Actual cycle

[sec/stroke]

  Display "actual cycle [cycles/min.] / [strokes/min.]" using "MNR.IZY/MIN"

o  Acronym: MNR.IZY/MIN with name Actual cycle [cycles/min.] or Actual cycle

[strokes/min.]

To display the target cycle in the relevant format, you must make the above acronym definition

for SZY (see table above).

Display of cycles on the terminal AIP 8.2

The  document  AIP2_Configuration_GUI.pdf  describes    the  configuration  options  that  are  available  to

display  the  actual  cycle  or  target  cycle  in  the  tile  view  on  the  AIP 8.2.  Refer  to  the  sections  Constants

(Defines), paragraph FORMAT_CYCLE, and the section CalculatedFields to this end.

To display the actual cycle or the target cycle in the dynamic dialogs, e.g. in the machine information, the

configuration options described in the previous section apply (Display of cycles on the terminal AIP 8.1).

MDE_Configuration_VisualizationCycle.docx  Version: 1.2.22805

Page 2 of 5

Configurations for the Display of Actual and Target Cycle

Sample configuration of dialog "Change target cycle (M_SZY)"

Field: Display Current target cycle

For the current target cycle, the displayed format is cycle/min in this example. The configuration must be

set as follows:

Tab General:

Tab Functions:

Field: Input field - New target cycle

For the new target cycle, the displayed or entered format is cycle/min in this example. The configuration

must be set as follows:

MDE_Configuration_VisualizationCycle.docx  Version: 1.2.22805

Page 3 of 5

Configurations for the Display of Actual and Target Cycle

Tab General:

Tab Functions:

Special feature in dialog Change target cycle (M_SZY)

The dynamic dialog provides the display of the current actual and target cycle and a field to enter a new

target cycle. To display the current values, you must change the display as described above.

To change the format of the input field, note the following:

You use the field with the identifier SZY:MODE to specify the compensation rule for the value entered. This

field is not visible and can include the following values for the attribute Default:

  SZY/MIN cycles per minute

  SZY/MSEC milliseconds per cycle

  SZY/HUB seconds per cycle (default processing)

MDE_Configuration_VisualizationCycle.docx  Version: 1.2.22805

Page 4 of 5

Configurations for the Display of Actual and Target Cycle

The new field for the compensation rule is already included in the dialog <M_SZY / AIPDEF / 0 >

with all new installations from SP13. If the field is not available, you must manually insert it in the

dynamic dialog M_SZY.

If you must manually insert the field in the dynamic dialog M_SZY, the fields must be assigned as follows:

Attribute

Text

Information

Identifier

ID index

Default

Field attribute 1

Visible

Content

SZY:MODE

SZY:MODE

SZY

MODE

SZY/MIN

STATUS

-

Default or proposal

Proposal

Proposal

Default

Default

Default

Default

Proposal

Also change / extend and activate all dialogs that are specified for specific terminals or terminal

groups!

MDE_Configuration_VisualizationCycle.docx  Version: 1.2.22805

Page 5 of 5

