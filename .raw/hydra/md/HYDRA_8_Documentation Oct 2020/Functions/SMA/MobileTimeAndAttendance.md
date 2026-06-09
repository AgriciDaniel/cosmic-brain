Mobile Time Recording

1  Mobile Time Recording

1.1  General

Employees can use the application Time and attendance to make clockings optionally at stationary PZE

terminals or on a smartphone, tablet or the web.

1.2  Overview

If you call the application, the following screen opens:

In the HYDRA standard, the terminal number 254 ist stored in the SMA settings. This way, the SMA Time

and attendance uses the selection of absence reasons and label texts for keys specified for terminal 254

in  the  terminal  configuration  (MOC).  If  you  want  to  specify  a  different  selection  of  absence  reasons  or

different label texts on a specific PC used for SMA, then you must store an additional terminal configuration

(MOC). Use terminal number 255, for example. For the PC in question, store the terminal number 255 in

the SMA settings. The configuration of terminal 255 is then used for this PC.

If you change SMA settings, this change is stored for each Windows user separately.  If you change the

terminal configuration (MOC), these changes are applied when a person logs in the next time.

MobileTimeAndAttendance.docx

Version: 1.0.20426

Page 1 of 3

Mobile Time Recording

Note: For information on the terminal configuration on the MOC, refer to the documentation of the SMA

implementation.

When you configure the terminal on the MOC, you must be careful to use terminal type 254 (not terminal

number !). This terminal type specifies the terminal as SMA terminal. This terminal type is not used when

the licenses (e.g. AIP-HRF) are calculated and when system parameters for terminals are identified. This

specification ensures that the number of required licenses is correctly calculated.

Making a clocking

To make a clocking, the following dialog opens:

MobileTimeAndAttendance.docx

Version: 1.0.20426

Page 2 of 3

Mobile Time Recording

If you click the field Cost center, a selection list opens. The time is then posted for the selected cost center.

This field is only available if the option Cost center posting is activated in the settings.

Use the personnel number or the staff badge number and the pin code to identify the employee. The fields

Show "person" field and Show "badge" field in the settings specify which of the two fields is available. If all

three fields are not visible, the values stored in the settings are processed.

Info

Use the button with the symbol

 to show the current account balances:

Displaying clockings

Use the button with the symbol

 to show the clockings of the current day and of the last 7 days.

MobileTimeAndAttendance.docx

Version: 1.0.20426

Page 3 of 3

