Configuration for the Collection of Serial Numbers
1 Configuration for the Collection of Serial Numbers
Activation at machine/workplace
These configurations have to be made for the machine / workplace to enable the collection of serial
numbers:
Parameter name Value
Workplace configuration  Workplace master N Machine
data  Workplace category
Workplace configuration  Workplace master E Single workplace
data  Workplace type
Workplace configuration  MPL  Batch L Batch tracing (input/output batches)
management
Workplace configuration  MPL  Preceding If required, define a preceding material buffer.
material buffer
Workplace configuration  MPL  Subsequent If required, define a subsequent material buffer.
material buffer
Workplace configuration  MPL  Automat. J Automatic generation of batch numbers
generation of batch numbers for production batches (MPL) enabled
Maintain material types - for the operation
Maintain the material types to be defined for the operation and adapt them to your specific requirements
of data collection.
Maintain material types – for components
Maintain the material types to be defined in the component list and adapt them to your specific
requirements of data collection. Configure at least the following values for the component that is
integrated as merged batch including assigned serial numbers in the operation:
Parameter name Value
Setup_SNR_Recording.docx Version: Page 1 of 5

    Configuration for the Collection of Serial Numbers

| Parameter name  | Value  |     |     |     |
| --------------- | ------ | --- | --- | --- |
Input batch processing  Inventory management  R - Yes, backflush (retrograde)
General  Options  transferred at interface
|     | Enable  this  | option  if  you  | expect  | consumption  |
| --- | ------------- | ---------------- | ------- | ------------ |
postings or final backflushes (notification of goods
receipts) for this material type.
Then another configuration can be used to control
|     | the  transfer  | of  merged  | batches  | and  serial  |
| --- | -------------- | ----------- | -------- | ------------ |
numbers separately.

Maintain reasons
Maintain reasons for scrap and rework as well as reasons for open quantities, if you use these quality
classes.
Maintain transport units
Create transport units in the system if you want to use them for data collection. Assign transport unit ans
according material type.
Assign material types to transport units
If you want to use transport units and you created them in the system, you may assign them to the
material types maintained in the system and define a default transport unit for each material type. This
one will then be selected in advance in the input dialog.
Perform the assignment in the assignment of TPU to material type.
Activation at the operation
These options have to be set for the operation.
| Parameter name                | Value                            |     |     |     |
| ----------------------------- | -------------------------------- | --- | --- | --- |
| Batch management requirement  | Yes                              |     |     |     |
| Serial number requirement     | A  Collection of serial numbers  |     |     |     |

These options are available to edit this information:

| Setup_SNR_Recording.docx  | Version:   |     |     | Page 2 of 5  |
| ------------------------- | ---------- | --- | --- | ------------ |

    Configuration for the Collection of Serial Numbers

Manual maintenance in the operation
Edit the options manually for the operation
Maintenance of processing code (customizing)
Edit the options for the processing code.
Maintenance of the template (customizing)
Edit the options of the processing code with value "A" - collection of serial numbers and assign the
processing code to an operation template.
Explicit specifications for the interface (recommended procedure)
Explicitly transfer the options for the operation at the interface.
Activation in components list
Maintain the input quantity in the component list by entering "1.0" units for components listed as merged
batch including assigned serials numbers. Assign the relevant material types to the components.
Activation of the link between serial number and input batch
For tracing it is necessary to link the incorporated input batches with the produced serial numbers. To
enable this processing, a configuration has to be enabled in INI configuration. The entry itself is part of
the default delivery and only needs to be enabled.
| Parameter name  | Value             |     |
| --------------- | ----------------- | --- |
| INI name        | MPL               |     |
| Section         | SERIALNUMBER      |     |
| Key             | CONNECT_SNR_CNR   |     |
| Value           | Y                 |     |
| Active          | Enable the entry  |     |

Configure batch attributes for data collection when recording serial
numbers
If you want to enter batch attributes manually when collecting serial numbers, create the batch attributes
to be recorded in the system in relation to the material type of the operation. To do so, maintain at least
these configurations:

| Setup_SNR_Recording.docx  | Version:   | Page 3 of 5  |
| ------------------------- | ---------- | ------------ |

|     |     |     |   Configuration for the Collection of Serial Numbers  |     |     |     |
| --- | --- | --- | ----------------------------------------------------- | --- | --- | --- |

| Parameter name  |                        |                    | Value               |     |     |     |
| --------------- | ---------------------- | ------------------ | ------------------- | --- | --- | --- |
| Options         |   Capture  attribute  | while  generating  | Enable the option.  |     |     |     |
batch
Options  Position  Specify  the  position  -  the  system  sorts  the
|     |     |     | configured  | attributes  | in  an  ascending  | numeric  |
| --- | --- | --- | ----------- | ----------- | ------------------ | -------- |
order (bottom up).
Data type  Maintain the data type and length of the attribute
to be recorded
Control the generation of goods movements
Define for incorporated merged batches and serials numbers as well as for produced merged batches
and serial numbers if you require goods movements subject to uploads to be provided. To do so,
configure the following settings in advanced object configuration:
The goods movement option has to be enabled for the relevant material type to be able to use
this configuration.

| Parameter name  |     |     | Value  |     |     |     |
| --------------- | --- | --- | ------ | --- | --- | --- |
Configuration for goods issues (consumptions)
| Object type  |     |     | MPL                  |     |     |     |
| ------------ | --- | --- | -------------------- | --- | --- | --- |
| Object ID 1  |     |     | SNR - serial number  |     |     |     |
SAM - merged batch
| Object ID 2      |     |     | MATTYP                               |     |     |     |
| ---------------- | --- | --- | ------------------------------------ | --- | --- | --- |
| Object ID 3      |     |     | Material type the entry applies for  |     |     |     |
| Object ID 4      |     |     | CMM_A                                |     |     |     |
| Parameter        |     |     | CREATE_MOVEMENT                      |     |     |     |
| Parameter value  |     |     | Y                                    |     |     |     |

| Setup_SNR_Recording.docx  |     |     | Version:   |     |     | Page 4 of 5  |
| ------------------------- | --- | --- | ---------- | --- | --- | ------------ |

    Configuration for the Collection of Serial Numbers

| Parameter name  | Value  |     |
| --------------- | ------ | --- |
Configuration for goods receipts (generated material)
| Object type  | MPL                  |     |
| ------------ | -------------------- | --- |
| Object ID 1  | SNR - serial number  |     |
SAM - merged batch
| Object ID 2      | MATTYP                               |     |
| ---------------- | ------------------------------------ | --- |
| Object ID 3      | Material type the entry applies for  |     |
| Object ID 4      | CMM_E                                |     |
| Parameter        | CREATE_MOVEMENT                      |     |
| Parameter value  | Y                                    |     |

| Setup_SNR_Recording.docx  | Version:   | Page 5 of 5  |
| ------------------------- | ---------- | ------------ |