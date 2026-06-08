---
title: InputFile
route: /InputFile
icon: ArrowUpload
---

# InputFile

The `FluentInputFile` wraps the native Blazor [InputFile](https://learn.microsoft.com/en-us/aspnet/core/blazor/file-uploads) component
and extends it with drag/drop zone support. See the examples below for some different ways on how to use this component.

**Customization:** You can localize this component by customizing the content of `ChildContent`,
and also the content of the progress area via the `ProgressTemplate` attribute.  
The default progress area displays <i>Loading</i>, <i>Completed</i> or <i>Canceled</i> labels via
the embedded [Localization](https://fluentui-blazor-v5.azurewebsites.net/localization) service.

## Example

The component can be customized by adapting the `ChildContent`.  
The areas that need to be associated with the opening of the file selection dialog
must be included in a `label for` that references the component `Id`: E.g. `<label for=“my-file-uploader”>browse...</label>`.

> [!NOTE] By default, this component uses the `SaveToTemporaryFolder` mode, which creates a local file. However,
> this might not always be possible depending on the user's permissions on the host system.
> You may need to change the `InputFileMode` based on your specific use case.

{{ InputFileDefault }}

## Manual upload

By using the parameter `DragDropZoneVisible=“false”`, the component is completely invisible. In this case, use the parameter `AnchorId` to
specify the component that will trigger the opening of the file selection dialog.

{{ InputFileByCode }}

## DialogService

A easy way to open the file selection dialog is to use the injected **DialogService** service.
1. During the `OnInitialized` method, **register** your trigger HTML element 
   using the method `MyFileInstance = DialogService.RegisterInputFileAsync(id)`.
1. Set the `OnCompletedAsync` method to handle the files uploaded.
1. Don't forget to **unregister** the trigger element in the `Dispose` method 
   using `MyFileInstance.UnregisterAsync();` or `DialogService.UnregisterInputFileAsync(id)`.

```csharp
[Inject]
public IDialogService DialogService { get; set; }

protected override async Task OnInitializedAsync()
{
    await DialogService.RegisterInputFileAsync("MyButton", OnCompletedAsync, options => { /* ... */ });    
}

private Task OnCompletedAsync(IEnumerable<FluentInputFileEventArgs> files)
{
    // `files` contains the uploaded files
}

public async ValueTask DisposeAsync()
{
    await DialogService.UnregisterInputFileAsync("MyButton");
}
```

{{ InputFileDialogService }}

## Mode = InputFileMode.Buffer

By default, the component has a parameter `Mode=“InputFileMode.SaveToTemporaryFolder”`.  
Change this parameter to `InputFileMode.Buffer` to control the reception of files directly into memory.
When the `OnCompleted` event is triggered, the entire file content is present in the `file.Buffer` property.

This mode is recommended if you can't store files locally, are working with small files, and have enough memory.

{{ InputFileBufferMode }}

## Mode = InputFileMode.Stream

If you want to transfer very large files and do not want to save your files locally (in a temporary folder, for example),
you can retrieve the file stream from the `OnFileUploaded` event and the `file.Stream` property. Keep in mind that you will need to implement stream handling yourself.

> [!WARNING] Remember to always dispose each stream to prevent memory leaks!

{{ InputFileStream }}

## Disabled Component

Thanks to the `Disabled` parameter, the component becomes inaccessible to the user from the graphical interface.

{{ InputFileDisabled }}

## Known Issues

Starting with .NET 6, the `InputFile` component does not work in Server-Side Blazor applications using Autofac IoC containers.
This issue is being tracked here: [aspnetcore#38842](https://github.com/dotnet/aspnetcore/issues/38842).  

Enable the HubOptions [DisableImplicitFromServicesParameters](https://learn.microsoft.com/en-us/dotnet/api/Microsoft.AspNetCore.SignalR.HubOptions.DisableImplicitFromServicesParameters)
in program/startup to workaround this issue.

```csharp
builder.Services
       .AddServerSideBlazor()
       .AddHubOptions(opt =>
       {
           opt.DisableImplicitFromServicesParameters = true;
       });
```


## API FluentInputFile

{{ API Type=FluentInputFile }}

## Migrating to v5

- The `OnFileCountExceeded` event was replaced by the `OnFileError` event.
