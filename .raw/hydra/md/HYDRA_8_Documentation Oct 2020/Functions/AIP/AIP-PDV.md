PDV Functions - Process Visualization in AIP

1  PDV Functions - Process Visualization in AIP

Purpose

As a part of the basic HYDRA-PDV functionality, the AIP terminal program transfers inspection plans to

the respective interface via MWP2 or a driver DLL. Vice versa, the AIP terminal then transfers incoming

measured values to the HYDRA server.

The  process  visualization  function  allows  to  monitor  the  status  of  measurement  channels  at  the  AIP

terminal.

1.1  Display of measuring channels

By  pressing  the  "PDV"  button  in  the  “workplaces”  section  of  the  AIP  terminal  it may  be  switched  to  the

respective display. The measuring channels of the machine selected in the basic  screen are shown. The

workplace may also be changed in the HYDRA-PDV view. An empty HYDRA-PDV dialog will be opened

if no measuring channels are configured for the selected machine.

The value range of all displays corresponds to the tolerance range of the respective measuring channel

configured within the inspection plan.

Different modes are available to display measuring channels. The mode may be chosen from the lower

button bar.

Pointer display

Measuring channels are displayed as pointers. All of the up to 16 configurable measuring channels

of a machine are also displayed at the same time.

AIP-PDV.docx

Version: 1.0.1362

Page 1 of 6

PDV Functions - Process Visualization in AIP

Digital representation

Measuring channels are represented as digital values. All of the up to 16 configurable measuring

channels of a machine are also displayed at the same time.

AIP-PDV.docx

Version: 1.0.1362

Page 2 of 6

PDV Functions - Process Visualization in AIP

Trend display

The progress including a corresponding legend is shown for each process parameter in a graphic.

The other process parameters can be reached by the arrow keys at the right margin of the screen.

Bar display

Measuring channels are displayed as bars. All of the up to 16 configurable measuring channels of a

machine are displayed at the same time:

AIP-PDV.docx

Version: 1.0.1362

Page 3 of 6

PDV Functions - Process Visualization in AIP

1.2  Change default value

Default  values  represent, among other things, a  decisive factor  when process data are displayed. They

may be changed by clicking the “change default value” button.

Posting procedure

The required workplace has to be selected, before changing default values.

Starting of the “change default value” function

The “change default value“ button is to be clicked. As soon as the function has been started, the user

is navigated through the dialog. The workplace has already been defined.

AIP-PDV.docx

Version: 1.0.1362

Page 4 of 6

Select process parameter

PDV Functions - Process Visualization in AIP

The required process parameter, the default values of which have to be changed is to be chosen from the

available list.

Change default values

The individual values that are to be changed are entered in the dialog that opens. This dialog shows the

previous values as well as the new default values. The following values are concerned:

  Upper tolerance limit

AIP-PDV.docx

Version: 1.0.1362

Page 5 of 6

PDV Functions - Process Visualization in AIP

  Upper process action limit

  Target value

  Lower process action limit

  Lower tolerance limit

Badge number

The badge number of the person changing the data is to be entered here.

Confirmation of “change default values”

The default values are updated in the system by confirming the dialog. They in turn affect HYDRA-

PDV display at the AIP terminal.

AIP-PDV.docx

Version: 1.0.1362

Page 6 of 6

