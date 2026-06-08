---
title: "DxCarousel Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel"
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

## DxCarousel Class

In This Article

An interactive component that displays an image collection or custom content in a carousel.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxCarousel :
    DxComponentBase,
    INestedSettingsOwner,
    IDisposable
```

## Remarks

The DevExpress Carousel for Blazor (`<DxCarousel>`) displays a collection of images or custom items in a carousel. The component supports bound and unbound modes, automatic slide show and loop modes, and navigation through carousel items.

![DxCarousel - Overview](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-overview.png)

[Run Demo: Carousel](https://demos.devexpress.com/blazor/Carousel)

### Add a Carousel to a Project

Follow the steps below to add a Carousel component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxCarousel>` … `</DxCarousel>`.
3. the component to data or create an.
4. Configure.
5. Customize.

### API Reference

Refer to the following list for the component API reference: [DxCarousel Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel._members).

### Static Render Mode Specifics

Blazor Carousel does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Bind to Data (Bound Mode)

Use the [Data](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.Data) property to bind the `<DxCarousel>` component to a data source. Specify [ImageSrcField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ImageSrcField) and [ImageAltField](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ImageAltField) properties to populate Carousel items with images and corresponding [alt attributes](https://www.w3schools.com/tags/att_alt.asp) from data source fields.

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            ImageSrcField="Source"
            ImageAltField="AlternateText"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>

@code {
    List<CarouselData> GetCarouselData() {
        List<CarouselData> result = new List<CarouselData>();
        result.Add(new CarouselData("../images/image1.jpg", "image 1"));
        result.Add(new CarouselData("../images/image2.jpg", "image 2"));
        result.Add(new CarouselData("../images/image3.jpg", "image 3"));
        result.Add(new CarouselData("../images/image4.jpg", "image 4"));

        return result;
    }

    public class CarouselData {
        public string Source { get; set; }
        public string AlternateText { get; set; }

        public CarouselData(string source, string alt) {
            Source = source;
            AlternateText = alt;
        }
    }
}
```

### Item Template

The `<DxCarousel>` component allows you to customize layout and appearance of Carousel items. Use the [ItemTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ItemTemplate) property to specify a common template for all items.

The following code snippet renders images and displays corresponding alternate attributes as image titles:

![Carousel - Item Collection](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-items.png)

- [Razor](#tabpanel_hYI70zuuB3_tabid-razor1)
- [CSS](#tabpanel_hYI70zuuB3_tabid-css1)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
    <ItemTemplate>
        @{
            var item = context.DataItem as CarouselData;
        }
        <div class="caruselItemContainer">
            <p class="caruselItemCaption">@item?.AlternateText</p>
            <img src="item?.Source" alt="item?.AlternateText" />
        </div>
    </ItemTemplate>
</DxCarousel>
```

### Unbound Item Collection

The `<DxCarousel>` component supports unbound mode. Populate its `<Items>...</Items>` tag with [DxCarouselItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarouselItem) objects to create an unbound item collection.

The following code snippet populates the Carousel component with different series types of the [DxChart<T>](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxChart-1) component:

- [ChartData](#tabpanel_hYI70zuuB3-1_tabid-csharp111)
- [Razor](#tabpanel_hYI70zuuB3-1_tabid-razor111)

```
@inject ISalesInfoDataProvider Sales
@* ... *@
    <DxCarousel Width="100%"
                Height="450px"
                SizeMode="Params.SizeMode"
                AllowPagingByClick="false"
                CssClass="demo-carousel-container">
        <Items>
            @foreach(var info in ChartInfos) {
                <DxCarouselItem>
                    <div class="demo-carousel-content">
                        <DxLoadingPanel @bind-Visible="PanelVisible"
                                        IsContentBlocked="true"
                                        ApplyBackgroundShading="false"
                                        IndicatorAreaVisible="true"
                                        Text="Loading..."
                                        CssClass="h-100">
                            <DxChart Data="chartsData"
                                     Width="100%"
                                     Height="100%"
                                     Rendered="@ChartRendered">
                                <DxChartTitle Text="@info.Title"></DxChartTitle>
                                @RenderSeries(info.Type, FirstSeriesName)
                                @RenderSeries(info.Type, SecondSeriesName)
                                <DxChartLegend HorizontalAlignment="HorizontalAlignment.Right"/>
                            </DxChart>
                        </DxLoadingPanel>
                    </div>
                </DxCarouselItem>
            }
        </Items>
```

[Run Demo: Carousel](https://demos.devexpress.com/blazor/Carousel#Template)

### Loop Mode

The `<DxCarousel>` component allows a user to switch slides (items) from the first item to the last and back. To enable loop navigation between Carousel items, set the [LoopNavigationEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.LoopNavigationEnabled) property to `true`.

![Carousel - Loop Navigation](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-loop-navigation.gif)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

### Slide Show

Set the [SlideShowEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowEnabled) property to `true` to enable the slide show functionality in a `<DxCarousel>` component. To adjust the time interval between slide changes, use the [SlideShowDelay](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowDelay) property.

![Carousel - Slide Show](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-slideshow.gif)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop"
            SlideShowEnabled="true"
            SlideShowDelay="1500">
</DxCarousel>
```

You can also use the following properties to specify whether users can stop or pause slide show:

[StopSlideShowOnPaging](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.StopSlideShowOnPaging)

Specifies whether to stop the [slide show](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowEnabled) on paging.

[PauseSlideShowOnHover](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.PauseSlideShowOnHover)

Specifies whether to pause the [slide show](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowEnabled) on hover.

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop"
            SlideShowEnabled="true"
            StopSlideShowOnPaging="true"
            PauseSlideShowOnHover="true">
</DxCarousel>
```

#### React to Slide Show State Changes

Use the [SlideShowState](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowState) property to specify the current slide show state. To respond to state changes, handle the [SlideShowStateChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowStateChanged) event.

The following code snippet obtains the current slide show state and changes it on a button click:

```
<DxCarousel Width="700px"
            Height="400px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop"
            SlideShowEnabled="true"
            @bind-SlideShowState="@IsRunning"
            SlideShowDelay="1500"
            SizeMode="SizeMode.Large" />

<DxButton Text="@GetButtonText()"
          RenderStyle="ButtonRenderStyle.Primary"
          RenderStyleMode="ButtonRenderStyleMode.Outline"
          IconCssClass="@GetIconCssClass()"
          Click="SlideShowControl"
          SizeMode="SizeMode.Large" />

@code {
    bool IsRunning { get; set; } = true;

    string GetIconCssClass() {
        return IsRunning ? "oi oi-media-stop" : "oi oi-play-circle";
    }
    string GetButtonText() {
        return IsRunning ? "Stop Slide Show" : "Start Slide Show";
    }

    void SlideShowControl(MouseEventArgs args) {
        IsRunning = !IsRunning;
    }
}
```

### User Interaction Options

The `<DxCarousel>` component supports multiple options that allow users to switch slides. These options include:

- [Swipe gestures](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SwipeMode)
- [Mouse wheel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AllowMouseWheel) and [clicks](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AllowPagingByClick)

Users can click the right or left side of the content area to switch slides. Set the [AllowPagingByClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AllowPagingByClick) property to `false` to disable paging by mouse clicks.

Enable the [AllowMouseWheel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AllowMouseWheel) property to allow users to switch Carousel slides with the mouse wheel.

#### Navigation Controls

`<DxCarousel>` displays navigation controls (buttons and pager) within the content area. Use [NavButtonsDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.NavButtonsDisplayMode) and [PagerDisplayMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.PagerDisplayMode) properties to specify display modes for navigation controls. `AlwaysVisible`, `VisibleOnHover`, and `Hidden` property values are available.

The following code snippet hides navigation buttons and displays the pager on hover:

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            NavButtonsDisplayMode="CarouselControlsDisplayMode.Hidden"
            PagerDisplayMode="CarouselControlsDisplayMode.VisibleOnHover"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

#### Keyboard Navigation

The `<DxCarousel>` component supports keyboard navigation. Users can navigate through Carousel items and stop/start the slideshow.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab, Shift + Tab | When the Carousel is focused, moves focus to the next/previous focusable element on a page.   **For templated Carousel items:** Moves focus to the next/previous focusable element within the template. |
| Right Arrow | Navigates to the next Carousel item. |
| Left Arrow | Navigates to the previous Carousel item. |
| Shift + Right Arrow | Navigates to the last Carousel item. |
| Shift + Left Arrow | Navigates to the first Carousel item. |
| Space | Stops/starts the slide show if [SlideShowEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowEnabled) is set to `true`. |

### Item Navigation in Code

The `<DxCarousel>` component allows you to navigate through its items in code.

Call the [SlideNextAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideNextAsync) or [SlidePreviousAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlidePreviousAsync) method to navigate to the next or previous Carousel item. Note that the method behavior depends on the [LoopNavigationEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.LoopNavigationEnabled) property value.

The following code snippet navigates between Carousel items on custom button clicks:

![Carousel - Navigation Methods](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-nav-methods.gif)

```
<DxCarousel Width="500px"
            Height="300px"
            @ref="carousel"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            NavButtonsDisplayMode="CarouselControlsDisplayMode.Hidden"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>

<DxButton IconCssClass="oi oi-arrow-left" Click="OnPreviousButtonClick" />
<DxButton IconCssClass="oi oi-arrow-right" Click="OnNextButtonClick" />

@code {
    DxCarousel carousel;

    async Task OnNextButtonClick(MouseEventArgs args) {
        await carousel.SlideNextAsync();
    }

    async Task OnPreviousButtonClick(MouseEventArgs args) {
        await carousel.SlidePreviousAsync();
    }
}
```

You can also call the [SlideToItemAsync(Int32)](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideToItemAsync\(System.Int32\)) method to navigate to the Carousel item with the specified index.

```
<DxCarousel Width="500px"
            Height="300px"
            @ref="carousel"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>

<DxButton Text="First Item" Click="MoveToFirst" />

@code {
    DxCarousel carousel;

    async Task MoveToFirst (MouseEventArgs args) {
        // Navigates to the first item
        await carousel.SlideToItemAsync(0);
    }
}
```

#### Active Item Index

Use the [ActiveItemIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ActiveItemIndex) property to activate a particular Carousel item programmatically. Handle the [ActiveItemIndexChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ActiveItemIndexChanged) event to respond to the property change.

- [DataSource](#tabpanel_nRumBwqkgT_tabid-csharp)
- [Razor](#tabpanel_nRumBwqkgT_tabid-razor)

```csharp
int CarouselItemIndex { get; set; } = 1;
string ItemIndexInfo { get; set; }

void OnActiveItemIndexChanged(int newItemIndex) {
    CarouselItemIndex = newItemIndex;
    ItemIndexInfo = "You switched to item " + (newItemIndex + 1);
}
List<CarouselData> GetCarouselData() {
    List<CarouselData> result = new List<CarouselData>();
    result.Add(new CarouselData("../images/image1.jpg", "image 1"));
    result.Add(new CarouselData("../images/image2.jpg", "image 2"));
    result.Add(new CarouselData("../images/image3.jpg", "image 3"));
    result.Add(new CarouselData("../images/image4.jpg", "image 4"));

    return result;
}

public class CarouselData {
    public string Src { get; set; }
    public string Alt { get; set; }

    public CarouselData(string src, string alt) {
        Src = src;
        Alt = alt;
    }
}
```

![Carousel - Activate Items in Code](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-active-item-index.png)

### Customization

This section describes how you can customize the Carousel component’s appearance and behavior.

#### Size

Use [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.Height) and [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.Width) properties to specify the size of the `<DxCarousel>` component. To apply different size modes to navigation controls, specify the component’s [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SizeMode) property.

![Carousel - Size Modes](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-size-mode.png)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            SizeMode="SizeMode.Large"
            ImageSrcField="Source"
            ImageAltField="AlternateText"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

You can also use the [ImageSizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ImageSizeMode) property to specify how the Carousel component scales an image to fit or fill the content area.

![DxCarousel - Image Size Modes](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-image-size-modes.png)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

#### Animation

The `<DxCarousel>` component animates slide (item) changes. Use the [AnimationDuration](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AnimationDuration) property to specify the animation duration. To disable current animation, set the [AnimationEnabled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.AnimationEnabled) property to `false`.

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            AnimationDuration="1000"
            LoopNavigationEnabled="true"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

#### CSS Classes

Assign a CSS class name to the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.CssClass) property to customize the appearance of the `<DxCarousel>` component.

The following code snippet customizes Carousel borders:

![DxCarousel - CSS Customization](https://docs.devexpress.com/Blazor/images/carousel/blazor-carousel-css-customization.png)

- [Razor](#tabpanel_hYI70zuuB3-2_tabid-razor1)
- [CSS](#tabpanel_hYI70zuuB3-2_tabid-css1)

```
<DxCarousel Width="500px"
            Height="300px"
            Data="@GetCarouselData()"
            CssClass="carousel-class"
            ImageSizeMode="CarouselImageSizeMode.FillAndCrop">
</DxCarousel>
```

### Task-Based Examples

#### Set a Slide Show Delay for Individual Items

You may need to set a slide show delay for each carousel item individually. Follow the steps below to implement this functionality:

1. Add an interger field (**Delay**) to your data source and define its values for each carousel item.
2. Declare an interger property (**CurrentDelay**) and bind it to the [SlideShowDelay](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.SlideShowDelay) property.
3. Assign the first item’s **Delay** field value to the **CurrentDelay** property in the [OnInitialized](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle#component-initialization-oninitializedasync) lifecycle method.
4. Handle the [ActiveItemIndexChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxCarousel.ActiveItemIndexChanged) event. In the handler, use the current item’s index to apply the corresponding slide show delay.

```
<DxCarousel @ref="carousel"
            Height="600px"
            Data="@carouselItems"
            ImageSrcField="ImageSource"
            ImageAltField="ImageAlt"
            SlideShowEnabled="true"
            SlideShowDelay="@CurrentDelay"
            LoopNavigationEnabled="true"
            ActiveItemIndexChanged="OnActiveItemIndexChanged">
</DxCarousel>

@code {
    int CurrentDelay { get; set; }
    DxCarousel carousel;

    protected override void OnInitialized() {
        base.OnInitialized();
        CurrentDelay = carouselItems.First().Delay;
    }
    async void OnActiveItemIndexChanged(int index) {
        if (index != null) {
            CurrentDelay = carouselItems.ElementAt(index).Delay;
        }
    }
    public class CarouselItem {
        public string ImageSource { get; set; }
        public string ImageAlt { get; set; }
        public int Delay { get; set; }
    }
    IEnumerable<CarouselItem> carouselItems = new List<CarouselItem>() {
        new CarouselItem{ImageSource="/images/image1.jpg", ImageAlt="Image 1", Delay=1000},
        new CarouselItem{ImageSource="/images/image2.jpg", ImageAlt="Image 2", Delay=3000},
        new CarouselItem{ImageSource="/images/image3.jpg", ImageAlt="Image 2", Delay=5000},
    };
}
```