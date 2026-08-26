---
address: c-000122
status: developing
title: "FluentUI Blazor InputFile"
tags:
  - fluentui-blazor
  - components
  - file-upload
  - input
---

# FluentUI Blazor InputFile

The `FluentInputFile` component wraps the native Blazor `InputFile` component and extends it with drag/drop zone support. Supports multiple upload modes: temporary folder, buffer (memory), and stream.

Related to: [[FluentUI Blazor]], [[FluentUI Blazor Forms]]

---

## Upload Modes

The `Mode` parameter (`InputFileMode`) controls how files are handled:

| Mode | Description | Best For |
|------|-------------|----------|
| `SaveToTemporaryFolder` (default) | Saves files to a temp folder on disk | General file uploads |
| `Buffer` | Keeps file data in memory | Small files, no temp storage |
| `Stream` | Streams file data via events | Very large files |

---

## Quick Start (Drag/Drop Zone)

Customize the drop zone via `ChildContent`. Use a `<label for="...">` element to associate clickable areas with the file dialog.

```razor
<FluentInputFile Id="my-file-uploader"
                 Mode="InputFileMode.SaveToTemporaryFolder"
                 Multiple="true"
                 MaximumFileCount="4"
                 MaximumFileSize="@FileSizeConverter.FromMegaBytes(10)"
                 Accept="image/*"
                 @bind-ProgressPercent="@ProgressPercent"
                 OnCompleted="@OnCompletedAsync"
                 Height="300px">
    <ChildContent>
        <label for="my-file-uploader">
            <FluentIcon Value="@(new Icons.Regular.Size24.ArrowUpload())" Color="@Color.Primary" />
        </label>
        <div>
            Drag files here to upload,
            or <label for="my-file-uploader">browse</label> for them.
            <br />
            <em>Maximum of 4 files allowed.</em>
        </div>
    </ChildContent>
</FluentInputFile>

@code {
    int ProgressPercent = 0;
    FluentInputFileEventArgs[] Files = [];

    private async Task OnCompletedAsync(IEnumerable<FluentInputFileEventArgs> files)
    {
        Files = files.Where(i => !i.IsCancelled).ToArray();
        foreach (var file in Files) { file.LocalFile?.Delete(); }
        await Task.Delay(3000);
        ProgressPercent = 0;
    }
}
```

---

## Manual Upload (No Drop Zone)

Set `DragDropZoneVisible="false"` and use `AnchorId` to point a button at the component.

```razor
<FluentInputFile DragDropZoneVisible="false"
                 Mode="InputFileMode.SaveToTemporaryFolder"
                 AnchorId="MyUploadButton"
                 MaximumFileSize="@FileSizeConverter.FromMegaBytes(100)"
                 Accept=".mp4, .mov, .avi"
                 OnCompleted="@OnCompleted" />

<FluentButton Id="MyUploadButton" Appearance="ButtonAppearance.Primary">Upload files</FluentButton>
```

---

## Using DialogService

Inject `IDialogService` to register a trigger element programmatically. Useful when you need full control over the upload lifecycle.

```razor
@inject IDialogService DialogService
@implements IAsyncDisposable

<FluentButton Id="OpenInputFile" Appearance="ButtonAppearance.Primary">Upload files</FluentButton>

@code {
    protected override async Task OnInitializedAsync()
    {
        await DialogService.RegisterInputFileAsync("OpenInputFile", OnCompletedAsync, options =>
        {
            options.Multiple = true;
            options.OnFileErrorAsync = (e) => DialogService.ShowErrorAsync(e.ErrorMessage);
            options.OnProgressChangeAsync = (e) => { /* update progress */ };
        });
    }

    private Task OnCompletedAsync(IEnumerable<FluentInputFileEventArgs> files)
    {
        // Handle uploaded files
        return Task.CompletedTask;
    }

    public async ValueTask DisposeAsync()
        => await DialogService.UnregisterInputFileAsync("OpenInputFile");
}
```

---

## Buffer Mode

For in-memory file handling. File content is available in the `file.Buffer` property after completion.

```razor
<FluentInputFile Mode="InputFileMode.Buffer"
                 AnchorId="MyUploadBuffer"
                 DragDropZoneVisible="false"
                 OnProgressChange="@OnProgressChangeAsync"
                 OnCompleted="@OnCompleted" />
```

Write buffer to file in the progress handler:

```csharp
async Task OnProgressChangeAsync(FluentInputFileEventArgs file)
{
    if (!Files.ContainsKey(file.Index))
    {
        var localFile = Path.GetTempFileName() + file.Name;
        Files.Add(file.Index, localFile);
    }
    await file.Buffer.AppendToFileAsync(Files[file.Index]);
}
```

---

## Stream Mode

For large files where you want to process the stream directly. Handle each file in the `OnFileUploaded` event.

```razor
<FluentInputFile Mode="InputFileMode.Stream"
                 AnchorId="MyUploadStream"
                 OnFileUploaded="@OnFileUploadedAsync"
                 OnCompleted="@OnCompleted" />
```

> [!WARNING] Always dispose each stream to prevent memory leaks.

```csharp
async Task OnFileUploadedAsync(FluentInputFileEventArgs file)
{
    if (file.Stream is not null)
    {
        await using FileStream fs = new(localFile, FileMode.Create);
        await file.Stream.CopyToAsync(fs);
        await file.Stream.DisposeAsync();
    }
}
```

---

## Disabled State

Set `Disabled="true"` to make the component inaccessible.

```razor
<FluentInputFile Id="my-file-uploader-disabled" Disabled="true" Height="200px">
    <ChildContent>
        <div>This component is disabled.</div>
    </ChildContent>
</FluentInputFile>
```

---

## Known Issues

.NET 6 Server-Side Blazor with Autofac: The native `InputFile` component has a known issue. Workaround:

```csharp
builder.Services
       .AddServerSideBlazor()
       .AddHubOptions(opt => {
           opt.DisableImplicitFromServicesParameters = true;
       });
```

---

## API Reference

- **`API Type=FluentInputFile`**

Key parameters: `Mode` (`InputFileMode`), `Multiple` (`bool`), `MaximumFileCount` (`int`), `MaximumFileSize` (`long`), `Accept` (`string`), `AnchorId` (`string`), `DragDropZoneVisible` (`bool`), `Disabled` (`bool`), `ProgressPercent` (`int`), `OnCompleted` / `OnProgressChange` / `OnFileUploaded` (events).

---

## Migration Notes (v4 to v5)

- `OnFileCountExceeded` replaced by `OnFileError` event.
