---
title: "Get Started with Blazor Scheduler | Blazor"
source: "https://docs.devexpress.com/Blazor/401775/components/scheduler/get-started-with-scheduler"
author:
published: 2001-04-15
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Get Started with Blazor Scheduler

In This Article

This tutorial describes how to build a simple Blazor application with a [DevExpress Scheduler component](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxScheduler). Follow the sections below to setup three different scheduler view types and then populate the control with different appointment types (including all-day and recurrent events).

![Get Started with Scheduler - Result](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-result.png)

## Create an Application

Create an application as described in the following topic: [Get Started With DevExpress Components for Blazor](https://docs.devexpress.com/Blazor/401057/get-started).

## Enable Interactivity on a Page

Blazor Scheduler does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

## Create a Data Source

This section [binds](https://docs.devexpress.com/Blazor/404771/components/scheduler/bind-to-data) the Scheduler to runtime data.

Declare the following classes:

- `Appointment` - An appointment that is rendered in the Scheduler.
- `AppointmentCollection` - An appointment data source.

- [Appointment](#tabpanel_F4chT-4Tcr_tabid-4)
- [AppointmentCollection](#tabpanel_F4chT-4Tcr_tabid-5)

```csharp
public class Appointment {
    public Appointment() {}

    public int Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Caption { get; set; }
    public int Label { get; set; }
    public int Status { get; set; }
    public bool AllDay { get; set; }
}
```

> [!note] Note
> You can also bind the Scheduler to a [remote data source](https://docs.devexpress.com/Blazor/404771/components/scheduler/bind-to-data#bind-to-remote-data).

## Add a Scheduler and Bind It to Data

Add a Scheduler component (`<DxScheduler>`) with a [Week view](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerWeekView) (`<DxSchedulerWeekView>`) to a Razor page.

```
<DxScheduler>
    <DxSchedulerWeekView />
</DxScheduler>
```

Follow the steps below to bind the Scheduler to data:

1. In the Razor `@code` block, use the constructor without parameters to create a [DxSchedulerDataStorage](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerDataStorage) object.
2. Use the [DxSchedulerDataStorage.AppointmentsSource](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerDataStorage.AppointmentsSource) property to fill the storage with a collection of data objects.
3. Create a [DxSchedulerAppointmentMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerAppointmentMappings) object and map data source fields to appointment properties.
4. Assign a new [DxSchedulerAppointmentMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerAppointmentMappings) object to the [DxSchedulerDataStorage.AppointmentMappings](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerDataStorage.AppointmentMappings) property. In this object, map the data source fields to appointment properties.

You can set the view’s [ShowWorkTimeOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.ShowWorkTimeOnly) property to `true` if you wish to display only working hours in the view.

```
<DxScheduler DataStorage="@DataStorage">
    <DxSchedulerWeekView ShowWorkTimeOnly="true" />
</DxScheduler>

@code {
    DxSchedulerDataStorage DataStorage = new DxSchedulerDataStorage() {
        AppointmentsSource = AppointmentCollection.GetAppointments(),
        AppointmentMappings = new DxSchedulerAppointmentMappings() {
            Id = "Id",
            Start = "StartDate",
            End = "EndDate",
            Subject = "Caption",
            LabelId = "Label",
            StatusId = "Status"
        }
    };
}
```

![Get Started with Scheduler - Week view](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-week-view.png)

## Add Views

You can add multiple [views](https://docs.devexpress.com/Blazor/404776/components/scheduler/views) to the Scheduler. The following code snippet defines **Day**, **Week**, and **Work Week** views.

```
<DxScheduler DataStorage="@DataStorage">
    <DxSchedulerDayView ShowWorkTimeOnly="true" />
    <DxSchedulerWeekView ShowWorkTimeOnly="true" />
    <DxSchedulerWorkWeekView ShowWorkTimeOnly="true" />
</DxScheduler>
```

The Scheduler now displays the **Day** view because it is defined first. The view selector allows users to switch between views.

![Get Started with Scheduler - Day view](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-day-view.png)

## Customize Views

Each view has its customization settings. This section describes how to specify the following settings for the **Day** view:

- Display 3 days at a time (the [DayCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.DayCount) property).
- Set the time scale interval to 1 hour (the [TimeScale](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.TimeScale) property).
- Set work time to 9AM - 6PM (the [WorkTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.WorkTime) property).
- Set the visible time interval to 8AM - 7PM (the [VisibleTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.VisibleTime) property). Time cells outside the work time interval have a gray background.
- Hide the current time indicator (the [TimeIndicatorVisibility](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.TimeIndicatorVisibility) property).

```
<DxSchedulerDayView DayCount="3"
                    TimeScale="@(new TimeSpan(1,0,0))"
                    WorkTime="new DxSchedulerTimeSpanRange(TimeSpan.FromHours(9), TimeSpan.FromHours(18))"
                    VisibleTime="new DxSchedulerTimeSpanRange(TimeSpan.FromHours(8), TimeSpan.FromHours(19))"
                    TimeIndicatorVisibility="SchedulerTimeIndicatorVisibility.Never">
</DxSchedulerDayView>
```

![Get Started with Scheduler - Customize view](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-customize-view.png)

If you set the [ShowWorkTimeOnly](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.ShowWorkTimeOnly) property to `true`, the Scheduler displays the time interval specified by the [WorkTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.WorkTime) property. Otherwise, the component displays the [VisibleTime](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxSchedulerDayViewBase.VisibleTime) interval.

## Create a Recurrent Appointment

To allow the Scheduler to manage [recurrent](https://docs.devexpress.com/Blazor/404770/components/scheduler/appointments#recurring-appointments) appointments, declare the `AppointmentType` and `Recurrence` fields in the `Appointment` object and map these fields to the appointment’s [Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerAppointmentItem.Type) and [RecurrenceInfo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerAppointmentItem.RecurrenceInfo) properties.

- [Appointment](#tabpanel_F4chT-4Tcr-1_tabid-app)
- [Razor](#tabpanel_F4chT-4Tcr-1_tabid-razor)

```csharp
public class Appointment {
    // ...
    public int Id { get; set; }
    public int AppointmentType { get; set; }
    public string Recurrence { get; set; }
}
```

In the application, a user should follow the steps below to create a recurrent appointment:

1. Click an empty cell in a view. This invokes the compact Appointment form.
2. Specify the appointment caption (`Daily Meeting`), start and end times.
	![Get Started with Scheduler - A new appointment](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-new-appointment.png)
3. Click the **Expand Arrows** ( ) button to open the pop-up edit form.
4. In the **Repeat** field, select **Daily** to specify the rule:
	![Get Started with Scheduler - An Appointment form](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-appointment-form.png)
	Another extended form is invoked. In it, you can specify the recurrence settings:
	![Get Started with Scheduler - A Recurrence rule](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-recurrence-rule.png)
5. *Optional.* In the **Label** and **Status** fields, specify the appointment [label](https://docs.devexpress.com/Blazor/404768/components/scheduler/labels-status-items#labels) and [status](https://docs.devexpress.com/Blazor/404768/components/scheduler/labels-status-items#status-items), respectively.
	![Get Started with Scheduler - Label](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-label.png)
6. Click **Save**.

The newly created appointment is marked with the recurrent icon:.

![Get Started with Scheduler - A recurring appointment](https://docs.devexpress.com/Blazor/images/scheduler/blazor-scheduler-gs-recurring-appointment.png)

> [!note] Note
> The Scheduler is bound to data created at runtime. Newly created appointments do not persist when you close the application. To save changes, bind the Scheduler to a [remote data source](https://docs.devexpress.com/Blazor/404771/components/scheduler/bind-to-data#bind-to-remote-data). Refer to the following example: [Scheduler for Blazor - How to implement CRUD operations with a Web API Service](https://github.com/DevExpress-Examples/blazor-scheduler-bind-to-web-api-service).

To create the **Daily Meeting** recurrent appointment in code, you need to add a new appointment to the data source. Set its type to `1` (corresponds to the `Pattern` [type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.SchedulerAppointmentType)) and initialize the `Recurrence` field as shown below:

- [AppointmentCollection](#tabpanel_F4chT-4Tcr-2_tabid-1)

```csharp
public static partial class AppointmentCollection {
    public static List<Appointment> GetAppointments() {
        DateTime date = DateTime.Today;
        var dataSource = new List<Appointment>() {
            // appointments
            // ...
            new Appointment {
                Id = 6,
                AppointmentType = 1,
                Caption = "Daily Meeting",
                StartDate = date + (new TimeSpan(0, 9, 00, 0)),
                EndDate = date + (new TimeSpan(0, 10, 00, 0)),
                Label = 10,
                Status = 1,
                Recurrence = string.Format("<RecurrenceInfo Type=\"0\" Start=\"{0}\" Range=\"1\"
                    OccurrenceCount=\"10\" Frequency =\"1\" Id=\"72e3db8f-cdb6-4aaa-afe1-e3c6b80ce995\"/>",
                    ToString(date + (new TimeSpan(1, 9, 00, 0))))
            }
        };
        return dataSource;
    }
}
```

Refer to [DxSchedulerRecurrenceInfo](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSchedulerRecurrenceInfo) for additional information.

## Complete Code

- [Appointment](#tabpanel_F4chT-4Tcr-3_tabid-2)
- [AppointmentCollection](#tabpanel_F4chT-4Tcr-3_tabid-3)
- [Razor](#tabpanel_F4chT-4Tcr-3_tabid-result)

```
<DxScheduler DataStorage="@DataStorage">
   <DxSchedulerDayView DayCount="3"
                       TimeScale="@(new TimeSpan(1,0,0))"
                       WorkTime="new DxSchedulerTimeSpanRange(TimeSpan.FromHours(9), TimeSpan.FromHours(18))"
                       VisibleTime="new DxSchedulerTimeSpanRange(TimeSpan.FromHours(8), TimeSpan.FromHours(19))"
                       TimeIndicatorVisibility="SchedulerTimeIndicatorVisibility.Never">
   </DxSchedulerDayView>
   <DxSchedulerWeekView ShowWorkTimeOnly="true" />
   <DxSchedulerWorkWeekView ShowWorkTimeOnly="true" />
</DxScheduler>

@code {
   DxSchedulerDataStorage DataStorage = new DxSchedulerDataStorage() {
       AppointmentsSource = AppointmentCollection.GetAppointments(),
       AppointmentMappings = new DxSchedulerAppointmentMappings() {
           Id = "Id",
           Type = "AppointmentType",
           Start = "StartDate",
           End = "EndDate",
           Subject = "Caption",
           AllDay = "AllDay",
           LabelId = "Label",
           StatusId = "Status",
           RecurrenceInfo = "Recurrence"
       }
   };
}
```