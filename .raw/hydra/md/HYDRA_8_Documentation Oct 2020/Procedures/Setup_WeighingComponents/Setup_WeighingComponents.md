Configuration of Weighing Components
1 Configuration of Weighing Components
Usage
You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the
generated output batch when changing output batches.
Dialog configuration
The input function is controlled by the dynamic dialogs A_VBRKOMP and KOMP_WIEG
Activation of the posting function at the terminal
Specific posting functions are enabled at AIP by an entry in the file ctaipbut.ini.
This is an example for the entry in ctwinbut.ini:
CTAIPBUT.INI
F1=A_VBRKOMP,weigh
The dynamic dialogs A_VBRKOMP and KOMP_WIEG must be available.
System configuration
Operation data
The following additional fields have be filled out for the operation using the PPS interface:
 No batch management requirement
 Target quantity per charge (calculated form primary target quantity / secondary
quantity)(ab.soll_menge_ansatz)
 Number of charges (secondary quantity in pieces) - default = 1
 Batch
Data included in component list
These parameters have to be filled out for discrete material components using the PPS interface:
 Tolerance (in percent)  mlst_hy.mengen_tol
Setup_WeighingComponents.docx Version: Page 1 of 2

|     |     |     | Configuration of Weighing Components  |     |
| --- | --- | --- | ------------------------------------- | --- |

  Deviation (absolute value)  mlst_hy.mengen_abweichung
  Input quantity and unit of input quantity
  Component type must be D - discrete

| Setup_WeighingComponents.docx  |     | Version:   |     | Page 2 of 2  |
| ------------------------------ | --- | ---------- | --- | ------------ |