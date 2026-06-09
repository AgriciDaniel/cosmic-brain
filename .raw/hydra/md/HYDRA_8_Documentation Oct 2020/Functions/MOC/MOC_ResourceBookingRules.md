Overview of Energy Management
1 Resources Posting Rules
Overview
Menu Master data  Resources  Resources booking rules
Transaction code resbr
Function authorization resbr
This document provides a description of the "Resources booking rules" application in the Manufacturing
Operation Center (MOC).
Usage
Flexible posting structures can be defined for energy management or for consumption entry. In addition to
the fact that the BOM is displayed in a tree-like structure, offering selection options for report creation,
there is also an option for compensation methods to be defined using booking paths. This option makes it
possible to define multi-level images of calculated posted resources from counter resources that were
entered either manually or automatically. In the process, the values can be added or subtracted as a
percentage. Thus, in a sense a formula and an imaging path are defined. So, a source and a target
resource as well as the compensation rule are always shown as a percentage. Random multiple
relationships are possible, which allow the rules to be combined as formulas.
Integration
Compensation is a cyclical process, which creates documents based on the defined compensation rules
based on documents that were already entered. Compensation is performed broken down at the most
down to 10 steps. The target resource specified in a compensation rule includes the quantities and
durations of the source resource added to or subtracted from the specified proportion.
Selection criteria
The application provides the following selection criteria:
Target resource type/ target resource
Definition of the target resource
Source resource type/ source resource
Definition of the source resource
MOC_ResourceBookingRules.docx Version: 1.0.1362 Page 1 of 2

|     |     | Overview of Energy Management  |
| --- | --- | ------------------------------ |

Field descriptions
Target resource type/ target resource
Definition of the target resource
Source resource type/ source resource
Definition of the source resource
Valid from/ valid to
Rule's period of validity
Proportion
Proportion in percent, positive (added to) or negative (subtracted from) value
Toolbar
  Paste
| Opens the dialog in which a compensation rule is entered.  |     |     |
| ---------------------------------------------------------- | --- | --- |
  Copy
| Opens the dialog into which a compensation rule is copied.  |     |     |
| ----------------------------------------------------------- | --- | --- |
  Edit
| Opens the dialog in which a compensation rule is edited.  |     |     |
| --------------------------------------------------------- | --- | --- |
 Delete
| Deletes one or several compensation rules.  |     |     |
| ------------------------------------------- | --- | --- |

MOC_ResourceBookingRules.docx  Version: 1.0.1362  Page 2 of 2