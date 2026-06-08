---
title: "DxPdfViewer Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer"
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

## DxPdfViewer Class

In This Article

A component that displays PDF documents directly in the browser.

**Assembly**: DevExpress.Blazor.PdfViewer.v25.2.dll

**NuGet Package**: [DevExpress.Blazor.PdfViewer](https://nuget.devexpress.com/packages/DevExpress.Blazor.PdfViewer/25.2.7)

## Declaration

```csharp
public class DxPdfViewer :
    ComponentBase
```

## Remarks

DevExpress PDF Viewer for Blazor (`<DxPdfViewer>`) can display a PDF document directly in your DevExpress Blazor application. The component allows you to navigate through individual pages, set zoom level, print and download the document. The PDF Viewer also supports single-page preview functionality and allows you to customize the built-in toolbar.

![PDF Viewer](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-multiple-page-preview.png)

[Run Demo: PDF Viewer - Overview](https://demos.devexpress.com/blazor/PdfViewer)

### Get Started

Use the following guide to create your first project:

[Read Tutorial: Get Started with Blazor PDF Viewer](https://docs.devexpress.com/Blazor/405847/components/pdf-viewer/get-started-with-pdf-viewer)

### API Reference

Refer to the following list for the component API reference: [DxPdfViewer Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer._members).

### Static Render Mode Specifics

Blazor PDF Viewer does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Open a PDF Document

Assign the binary content of a PDF document to the [DocumentContent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.DocumentContent) property to open the document in the PDF Viewer:

```
@using System.Reflection

<DxPdfViewer @ref="pdfViewer"
             DocumentContent="@DocumentContent" />

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("Pdf.DataSources.Document.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
}
```

### Single-Page Preview

If your PDF document contains multiple pages, `<PdfViewer>` displays all those pages in a preview.

![PDF Viewer - Multiple Page Preview](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-multiple-page-preview.png)

To preview one page at a time, enable the [IsSinglePagePreview](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.IsSinglePagePreview) property:

![PDF Viewer - Single Page Preview](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-single-page-preview.png)

```
@using System.Reflection

<DxPdfViewer @ref="pdfViewer"
             DocumentContent="@DocumentContent"
             IsSinglePagePreview="true" />

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("Pdf.DataSources.Document.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
}
```

### Document Navigation

Users can click the PDF Viewer’s toolbar commands to navigate through document pages.

![PDF Viewer - Ttoolbar Navigation Commands](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-toolbar-navigation-commands.png)

In code, you can use [ActivePageIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.ActivePageIndex) and [PageCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.PageCount) properties to obtain information about the current document’s pages.

### Document Adjustment

The PDF Viewer’s built-in toolbar contains commands that allow users to change the document’s zoom level.

![PDF Viewer - Toolbar Zoom Commands](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-toolbar-zoom-commands.png)

To specify the initial zoom level, use the [ZoomLevel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.ZoomLevel) property. The following code snippet sets the zoom level to 125%:

```
@using System.Reflection

<DxPdfViewer @ref="pdfViewer"
             DocumentContent="@DocumentContent"
             ZoomLevel="1.25"/>

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("PdfSample.DataSources.Invoice.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
}
```

### Download and Print Support

The PDF Viewer’s built-in toolbar contains commands that allow users to print and download the document.

![PDF Viewer - Toolbar Print and Download Commands](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-toolbar-print-download-commands.png)

In code, you can call [PrintAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.PrintAsync) and [DownloadAsync()](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.DownloadAsync) methods to print and download the document. Use the [DocumentName](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.DocumentName) property to specify the name of the downloaded document.

The following code snippet removes all predefined commands from the PDF Viewer’s toolbar and adds two custom buttons:

- The **Print** button invokes the **Print** dialog.
- The **Download** button downloads the document.

![PDF Viewer - Print and Download Methods](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-print-and-download-methods.png)

- [Razor](#tabpanel_8z3NHcuspO_tabid-razor5)
- [CSS](#tabpanel_8z3NHcuspO_tabid-css6)

```
@using System.Reflection
@using DevExpress.Blazor.Reporting.Models

<DxPdfViewer @ref="pdfViewer"
             DocumentContent="@DocumentContent"
             DocumentName="Custom name"
             CustomizeToolbar="OnCustomizeToolbar" />

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("Pdf.DataSources.Document.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
    protected void OnCustomizeToolbar(ToolbarModel toolbarModel) {
        toolbarModel.AllItems.Clear();

        var printToolbarItem = new ToolbarItem {
            Text = "Print",
            AdaptiveText = "Print",
            BeginGroup = true,
            Id = "Print",
            IconCssClass = "print-btn",
            Click = async (args) => {
                await pdfViewer.PrintAsync();
            }
        };

        var downloadToolbarItem = new ToolbarItem {
            Text = "Download",
            AdaptiveText = "Download",
            BeginGroup = true,
            Id = "Download",
            IconCssClass = "download-btn",
            Click = async (args) => {
                await pdfViewer.DownloadAsync();
            }
        };
        toolbarModel.AllItems.Add(printToolbarItem);
        toolbarModel.AllItems.Add(downloadToolbarItem);
    }
}
```

### Toolbar Customization

`<DxPdfViewer>` allows you to access and modify the built-in toolbar. Handle the [CustomizeToolbar](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.CustomizeToolbar) event to perform the following operations:

- Access toolbar items.
- Add predefined and custom items to the item collection.
- Remove items from the item collection.
- Customize items.

![PDF Viewer - Print and Download Methods](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-print-and-download-methods.png)

### Component Customization

This section describes settings that allow you to customize the appearance of the PDF Viewer component.

#### Size

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer.SizeMode) property to specify the size of the PDF Viewer component. The following code snippet applies the `Small` mode:

```
@using System.Reflection

<DxPdfViewer @ref="pdfViewer"
             DocumentContent="@DocumentContent"
             SizeMode="SizeMode.Small"/>

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("PdfSample.DataSources.Invoice.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
}
```

#### CSS Customization

Use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent.CssClass) property to customize the appearance of the PDF Viewer component. The following code snippet configures the component size and customizes border settings:

![PDF Viewer - CSS Customization](https://docs.devexpress.com/Blazor/images/pdfviewer/blazor-pdfviewer-css-customization.png)

- [Razor](#tabpanel_rJK4Lh+rIr_tabid-razor3)

```
@using System.Reflection

<DxPdfViewer @ref="pdfViewer"
             CssClass="component-class"
             DocumentContent="@DocumentContent" />

@code {
    DxPdfViewer pdfViewer { get; set; }
    byte[] DocumentContent { get; set; }

    protected override async Task OnInitializedAsync() {
        Assembly assembly = Assembly.GetExecutingAssembly();
        Stream stream = assembly.GetManifestResourceStream("Pdf.DataSources.Document.pdf");

        using (var binaryReader = new BinaryReader(stream)) {
            DocumentContent = binaryReader.ReadBytes((int)stream.Length);
        }
    }
}
```

- [CSS](#tabpanel_rJK4Lh+rIr-1_tabid-css4)

```
.component-class {
    height: 500px;
    margin-top: 50px;
    border: solid purple 1px;
}
```

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

DxPdfViewer

See Also

[DxPdfViewer Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.PdfViewer.DxPdfViewer._members)