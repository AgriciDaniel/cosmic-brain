1  Campaign production

Campaign Production

Purpose

You use this function to combine several operations to one campaign and process these over a specified

period on one workplace/one machine without interruption.

Integration

You can use the campaign production in the Graphic planning and request the function as follows:

-  Button Generate campaign in the toolbar.

-  Context menu of the operation.

o

o

In the Gantt chart.

In the pool of workplaces.

Requirements

You can use the function Generate campaign if you performed the required configuration for the comparison

criteria and, if required, for  the processing code.  The configuration is described in this document.

You can combine the operations under the following conditions:

-  Operations must not be logged on.

-  Operations must not be fixed.

-  The time lag between two operations must not exceed the configured value in the HLS (shop floor

scheduling) settings.

-

If you use production variants, then you have to plan the operations before you combine them to a

campaign.

You can cancel (or cancel in parts) campaigns under the following conditions:

-  You can terminate the campaign under the following condition:

o  No operation  of the campaign is logged on.

o  No operation of the campaign has been completed.

-  You can terminate the campaign in parts under the following conditions:

o  At least one operation of the campaign was started or completed.

MOC_CampaignProduction.docx

Version: 1.5

Page 1 of 5

o  At least one operation of the campaign has not been completed and is not logged on.

Campaign Production

Generate campaign

Function authorization

op.cpnbuild

Make sure that all conditions are met regarding the combination of operations for one campaign.

You need to specify the max. time lag between two neighboring operations of a campaign.    The system

has stored a standard value of 60 minutes.

Afterwards you can build campaigns in different ways. The different options are described below:

Option 1: Button in the toolbar

Click Generate campaign.

A dialog box appears as follows:

Enter a value in the "Days" unit in the field "Period for generating the campaign". Decimal numbers are

reliable.  The field  "End of generating the campaign" updates accordingly when you exit it.  Confirm the

entry with "OK".  The basis to build a campaign is the scheduling of operations that had previously been

performed.  In accordance with scheduling, the system processes the operations in sequence and checks

to determine whether the operations can be combined.

MOC_CampaignProduction.docx

Version: 1.5

Page 2 of 5

Campaign Production

This check integrates an operation if its planned start lies in the period of time when you want to

generate the campaign.

A dialog is opened informing on how many operations can be combined and how many campaigns can be

built.

For the operations assigned to the campaign, the field "mother OP" is then filled with the leading (first) OP

of the campaign.

Option 2: Context menu of the operation (Gantt chart, pool of workplaces)

Select  the  operations  that  you  want  to  use  to  build  a  campaign.  Open  the  context  menu  of  one  of  the

selected operations. You can then manually generate a campaign for the selected operations.

If a campaign exists for some of the selected operations, then the new operation(s) are added to the existing

campaign.

If no campaign exists for the selected operations, a new one is generated.  For the operations assigned to

the campaign, the field "mother OP" is then filled with the leading (first) OP of the campaign.

If the system identifies during the campaign generation that there is no neighboring operation with

the same criteria, this single operation will not become a "single campaign", but it will remain as

a separate operation.

Cancel campaign

Function authorization

op.cpndissolve

Ensure that all requirements are fulfilled (see above section "Requirements") in order to cancel operations

for a campaign.

You can cancel the campaign in the Gantt chart or in the pool of workplaces using the context menu.

If the requirements are not violated, a confirmation dialog for a (part) cancellation of the campaign appears.

For  a  part  cancellation,  the  completed  operations  remain  in  the  campaign.  Prepared  operations  are

removed from the campaign and set to the status "not released".

You have two options for interrupted operations:

-  Only the interrupted operations are finished.  No further quantities are produced for the interrupted

operations.  The interrupted operations remain in the campaign.

MOC_CampaignProduction.docx

Version: 1.5

Page 3 of 5

Campaign Production

-  The  interrupted  operations  are  split  (requirement:  license  HLS-AGS  (only  applies  if  HYDRA  is

used)). The new (previously unprocessed) split operation has not yet been assigned to a campaign

and can be used again to generate a campaign.  The rest of the operations are finished and remain

in the campaign.

After the campaign (or part of the campaign) finishes, the layout of operations that are no longer part of the

campaign is updated according to the system settings.

Plan a campaign

You can plan and replan operations that had been combined to a campaign.  To perform planning actions,

you can use the functions you are authorized for.

If you manual plan activities, you must replan the first operation.  If you replan any other operation, an error

window pops up with the operation name.

Display of generated campaigns

You can configure the display of operations combined to campaigns in the system settings.

Select via checkbox if the operations combined to campaigns are highlighted in a specific color.

When you activate the checkbox, a narrow bar is displayed in the Gantt chart in the configured color below

each operation (OPs) that is affected by the campaign generation. A narrow bar extends over the entire

length of the relevant operation (dynamic set-up time, set-up time, processing time, downtime). This narrow

bar is also displayed for logged on operations if they are combined.

MOC_CampaignProduction.docx

Version: 1.5

Page 4 of 5

Campaign Production

Posting campaigns

All operations that are combined into one campaign can be processed serially. If required, you can configure

an automatic log on and off in the processing code.

If you have combined several operations to a campaign, you may only log on the first planned

operation of the campaign.

MOC_CampaignProduction.docx

Version: 1.5

Page 5 of 5

