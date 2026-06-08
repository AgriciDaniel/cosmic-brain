---
title: "DxMap Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxMap Class

In This Article

An interactive component that displays a geographic map with markers and routes.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxMap :
    ClientComponentBase,
    IModelProvider<MapApiKeyModel>,
    IModelProvider<MapLocationModel>,
    IModelProvider<ProviderConfigModel>,
    IModelProvider<ClientComponentCollectionModel<MapMarkerModel>>,
    IModelProvider<ClientComponentCollectionModel<MapRouteModel>>
```

## Remarks

The DevExpress Map for Blazor (`<DxMap>`) can display Google and Azure maps and allows you to create markers and routes. Built-in controls allow a user to zoom and navigate the map or change its type.

![map with route](https://docs.devexpress.com/Blazor/images/map/blazor-map-route-opacity.png)

[Run Demo](https://demos.devexpress.com/blazor/Map)

### Prerequisites

You must have a map API key to display maps in your application. For information on where to get a key, refer to the following topics:

- [Manage Your Azure Maps Account](https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-account-keys).
- [Google Maps Platform: Use API Keys](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Add a Map to a Project

Follow the steps below to add a Map component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxMap>` … `</DxMap>`.
3. Set the [Provider](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.Provider) property to the control’s map data provider: `Azure`, `Google`, or `GoogleStatic`.
4. Assign your map API key to the corresponding property ([Azure](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapApiKeys.Azure), [Google](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapApiKeys.Google), or [GoogleStatic](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapApiKeys.GoogleStatic)) in the [DxMapApiKeys](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapApiKeys) object.
5. Use [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.Width) properties to set control size.
6. Configure other options (see sections below).

> [!important] Important
> Microsoft deprecated **Bing Maps for Enterprise** and specified retirement dates. This change is a part of Microsoft’s initiative to unify its enterprise map product offerings: **Bing Maps for Enterprise** and **Azure Maps**.
> 
> Our Blazor Map component now supports [Azure Maps](https://azure.microsoft.com/en-us/products/azure-maps). To display Azure Maps in your application, set the [Provider](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.Provider) property to `Azure` and assign the corresponding API key to the [DxMapApiKeys.Azure](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapApiKeys.Azure) property.
> 
> Refer to the following article for additional information: [Bing Maps for Enterprise Service Deprecation](https://community.devexpress.com/blogs/news/archive/2024/06/12/important-announcement-bing-maps-for-enterprise-service-deprecation.aspx).

### API Reference

Refer to the following list for the component API reference: [DxMap Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap._members).

### Static Render Mode Specifics

Blazor Map does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Map Navigation

The `DxMap` control automatically adjusts map center and zoom level to display all markers and routes. Set the [AutoAdjust](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.AutoAdjust) property to `false` to disable this behavior.

#### Manual Map Adjustment

You can specify the map center and zoom level manually.

- Use the [Zoom](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.Zoom) property to specify the initial map zoom level.
- Use the [DxMapCenter](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapCenter) object to specify a location that should be displayed in the center of the component.

```
<DxMap Zoom="14" Provider="MapProvider.Azure" Width="100%" Height="600px" >
    <DxMapApiKeys Azure="@MapApiKeyProvider.GetAzureProviderKey()" />
    <DxMapCenter GeoPosition="40.7061, -73.9969" />
</DxMap>
```

Manual map adjustment can be useful when automatic adjustment is not available:

- `DxMap` displays a static Google Map image.
- [AutoAdjust](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.AutoAdjust) property is set to `false`.
- The map does not contain markers or routes.

#### User Navigation Controls

Set the [ControlsVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.ControlsVisible) property to `true` to display map type and navigation controls.

```
<DxMap Zoom="14" Provider="MapProvider.Azure" Width="100%" Height="600px" ControlsVisible="true" >
    <DxMapApiKeys Azure="@MapApiKeyProvider.GetAzureProviderKey()" />
    <DxMapCenter GeoPosition="40.7061, -73.9969" />
</DxMap>
```

### Map Markers

To create a map marker, follow the steps below:

1. Place a [DxMapMarker](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarker) component in the [DxMapMarkers](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarkers) collection.
2. Add a [DxMapMarkerLocation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarkerLocation) object and specify marker location. You can use either the [GeoPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxMapLocation-1.GeoPosition) property or [Latitude](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxMapLocation-1.Latitude) and [Longitude](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxMapLocation-1.Longitude) properties.
3. *Optional.* Add a [DxMapMarkerTooltip](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarkerTooltip) object to specify a tooltip for the marker. Use the [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarkerTooltip.Text) property to specify the tooltip text and the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarkerTooltip.Visible) property to specify the initial tooltip visibility.
4. *Optional.* Use the [IconUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarker.IconUrl) property to specify a custom icon for the marker. You can use the [MarkerIconUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.MarkerIconUrl) property to set a common icon for every marker on the map.
5. *Optional.* Specify the [MarkerId](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapMarker.MarkerId) property. This value allows you to identify the clicked marker in the [MarkerClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap.MarkerClick) event handler.

```
<DxMap Zoom="14" Provider="MapProvider.Azure" Width="950px" Height="400px" >
    <DxMapApiKeys Azure="@MapApiKeyProvider.GetAzureProviderKey()" />
    <DxMapMarkers>
        <DxMapMarker>
            <DxMapMarkerLocation GeoPosition="51.519852,-0.077593" />
            <DxMapMarkerTooltip Text="Spitalfields Market" Visible="true" />
        </DxMapMarker>
        <DxMapMarker>
            <DxMapMarkerLocation GeoPosition="51.514763,-0.080787" />
            <DxMapMarkerTooltip Text="The Gherkin" Visible="true" />
        </DxMapMarker>
        <DxMapMarker>
            <DxMapMarkerLocation GeoPosition="51.508029,-0.078674" />
            <DxMapMarkerTooltip Text="Tower of London" Visible="true" />
        </DxMapMarker> 
    </DxMapMarkers>
</DxMap>
```

![Map - Tooltips](https://docs.devexpress.com/Blazor/images/map/blazor-map-tooltip.png)

[Run Demo: Map Markers](https://demos.devexpress.com/blazor/MapMarkers)

### Map Routes

To create a route, follow the steps below:

1. Place a [DxMapRoute](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoute) component in the [DxMapRoutes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoutes) collection.
2. Use the [Mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoute.Mode) property to specify the transportation mode: `Walking` or `Driving`.
3. Add the [DxMapRouteLocations](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRouteLocations) component and populate it with key route points ([DxMapRouteLocation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRouteLocation) objects).
4. *Optional.* Customize route style settings: [Color](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoute.Color), [Opacity](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoute.Opacity), and [Weight](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMapRoute.Weight).

```
<DxMap Zoom="14" Provider="MapProvider.Azure" Width="950px" Height="400px" ControlsVisible="true" >
    <DxMapApiKeys Azure="@MapApiKeyProvider.GetAzureProviderKey()" />
    <DxMapRoutes>
        <DxMapRoute Color="green" Weight="9" Mode="MapRouteMode.Walking" >
            <DxMapRouteLocations>
                <DxMapRouteLocation GeoPosition="St. Paul's Cathedral,London" />
                <DxMapRouteLocation GeoPosition="Tate Modern,London" />
            </DxMapRouteLocations>
        </DxMapRoute>
        <DxMapRoute Color="red" Weight="9" Mode="MapRouteMode.Driving" >
            <DxMapRouteLocations>
                <DxMapRouteLocation GeoPosition="St. Paul's Cathedral,London" />
                <DxMapRouteLocation GeoPosition="Tate Modern,London" />
            </DxMapRouteLocations>
        </DxMapRoute>
    </DxMapRoutes>
</DxMap>
```

![map with a walking and driving routes](https://docs.devexpress.com/Blazor/images/map/blazor-map-route-mode.png)

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase) DevExpress.Blazor.ClientComponents.Internal.ClientComponentBase

DxMap

See Also

[DxMap Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxMap._members)