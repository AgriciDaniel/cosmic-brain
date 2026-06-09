Application-relevant customizing in SAP

1  Application-relevant customizing in SAP

Maintain control recipe destination

For each HYDRA system connected to SAP PP-PI a control recipe destination has to be maintained. In a

first  step  the  control  recipe  destination  is  linked  with  the  RFC  destination  created  in  SAP  transaction

SM59. In further steps the process instructions have to be assigned.

To maintain  the  control  recipe  destination  SAP  transaction  O10C  is  used  (path  with  transaction  SPRO:

Production  Planning  for  Process  Industries    Process  Management    Decentralized  Process

Management   Define  and  Set  Up  Control  Recipe  Destinations).  It  is  important  to  maintain  the  control

recipe destination of type “2”, as this is the type supported by the HYDRA PP-PI-PCS implementation.

Maintain control recipe destination in master recipe

The control recipe destination created in transaction O10C has to be assigned to a specific phase in the

master recipe. By assigning control recipe destination that phase is relevant for downloading to HYDRA

when the control recipe is created.

In most cases the operations in the master recipe are not relevant for HYDRA but only the phases.

Define background job for sending control recipe

In this step  a background job for sending control recipes in  the SAP client is defined. For each job,  the

following settings have to be made (SAP transaction SM36):

Start date of the job

One of the following options can be used:

The job should be started each time a new control recipe has been created in your client:

After event SAP_NEW_CONTROL_RECIPES

Event parameter <client>

Periodic job

The job should run periodically at certain intervals (option Date/Time with the time interval stored as

a period value).

Steps to be carried out

The job should start the ABAP report program RCOCB006.

SAP_PPPI_Customizing_SAP.docx

Version: 1.0.1362

Page 1 of 2

Application-relevant customizing in SAP

Define background job for sending process messages

In this step, a background job for sending process messages automatically is defined. This is necessary

to  process  the  process messages  with  confirmations  sent  from  HYDRA  to  SAP  within  SAP  and  to  post

the data to the process order. To define the job SAP transaction SM36 is used.

Types of sending

The following options are available for background jobs:

Cross-plant sending
You use program RCOCB002 for this.

Plant-specific sending
You use program RCOCB004 for this. You specify the plant of the messages to be selected in a selection
variant.

The system processes all messages that have status:

  Created

  To be resubmitted

  To be resubmitted with warning

Start date of the job

In certain time intervals

After the event SAP_NEW_PROCESS_MESSAGES, this means, every time new messages are available

For cross-plant sending, you specify the client as the event parameter.

For plant-specific sending, you specify the client and plant as the event parameters.

Define production scheduling profiles

In  the  production  scheduling  profile  it  is  defined,  if  the  control  recipe  is  created  automatically  when

releasing the process order. Production scheduling profiles can be assigned to a

  material (work scheduling screen in material master)

  production scheduler (Customizing)

The assignment to the material has a higher priority.

The production scheduling profile is copied to the production order or process order on order creation.

SAP_PPPI_Customizing_SAP.docx

Version: 1.0.1362

Page 2 of 2

