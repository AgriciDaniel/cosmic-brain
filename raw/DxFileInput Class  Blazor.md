---
title: "DxFileInput Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput"
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

## DxFileInput Class

In This Article

A component that allows you to access the contents of selected files directly in razor code.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxFileInput :
    DxControlComponent<FileInputJSInteropProxy>,
    IFileInputViewOwner,
    IUploadViewOwner
```

## Remarks

The DevExpress File Input component for Blazor allows users to select files in the **Open** dialog or drag these files onto a drop zone. The component supplies a [Stream](https://learn.microsoft.com/dotnet/api/system.io.stream) that allows you to read file content for each selected file. Once the read operation is completed, you can send the file to another destination, save it to the file system, or display the file’s content on a web page.

> [!note] Note
> The File Input component does not upload selected files automatically. Handle the [FilesUploading](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.FilesUploading) event to upload files.

![File Input Overview](https://docs.devexpress.com/Blazor/images/file-management/file-input/blazor-file-input-overview.png)

[Run Demo: File Input - Overview](https://demos.devexpress.com/blazor/FileInput#Overview)

### Upload vs. File Input

DevExpress Blazor UI Component Library includes two components that allow you to handle file upload. The key differences between these components are outlined below:

[DxUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload)

This component requires that you create a web API controller in your application project or separate web API project. Once a user selects a file, the Upload component packs the file into an Ajax request and sends this request to the controller that processes the file.

`DxFileInput`

This component allows you to access and process contents of selected files directly in razor code. To configure the component, you should implement file upload in the [FilesUploading](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.FilesUploading) event handler.

### Add a File Input to a Project

Follow the steps below to add a File Input component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the following markup to a `.razor` file: `<DxFileInput>` … `</DxFileInput>`.
3. .
4. Specify other File Input options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxFileInput Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput._members).

### Static Render Mode Specifics

Blazor File Input does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Implement File Upload

The File Input component does not upload selected files automatically. Instead, the component raises the `FilesUploading` event once you or users start (or restart) an upload operation.

Handle the [FilesUploading](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.FilesUploading) event to access selected [Files](https://docs.devexpress.com/Blazor/DevExpress.Blazor.FilesUploadingEventArgs.Files) and call a file’s [OpenReadStream](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IFileInputSelectedFile.OpenReadStream\(System.Decimal-System.Threading.CancellationToken\)) method to read file content. Once the read operation is completed, you can send the file to another destination, save it to the file system, or display file content on a web page.

> [!note] Note
> Do not read a stream directly in memory to avoid performance and security-related issues. Instead, copy the stream to a file on a disk or pass file content to an external service.

The following example reads contents of uploaded files:

```
<DxFileInput FilesUploading="OnFilesUploading" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (var file in args.Files) {
            try {
                /* The following code is intended for demonstration purposes only.
                Do not read a stream directly in memory to avoid performance and security-related issues. */
                using var stream = new System.IO.MemoryStream();
                await file.OpenReadStream(file.Size).CopyToAsync(stream);
            }
            catch (OperationCanceledException ex) {
                // Handle the cancel action here
            }
        }
    }
}
```

[Run Demo: File Input - Overview](https://demos.devexpress.com/blazor/FileInput)

Based on the render mode, the File Input component streams file content in one of the following ways:

- In **Interactive WebAssembly** mode, the component streams file data directly to razor code in the user browser.
- In **Interactive Server** mode, the component streams file data from the client over the SignalR connection to the server’s razor code.

If you use the [ReadAsync](https://learn.microsoft.com/en-us/dotnet/api/system.io.stream.readasync?view=net-8.0) method to read stream content, note that this method may read fewer bytes than requested. To ensure correct read operations, call the [ReadAsync](https://learn.microsoft.com/en-us/dotnet/api/system.io.stream.readasync?view=net-8.0) method within the `while` loop as follows:

```csharp
async Task OnFilesUploading(FilesUploadingEventArgs args) {
    foreach (var file in args.Files){
        int fileSize = (int)file.Size;
        Stream stream = file.OpenReadStream(fileSize);
        try {
            int totalBytesRead = 0;
            int bytesReadCount = 0;
            byte[] FileBytes = new byte[fileSize];
            do {
                bytesReadCount = await stream.ReadAsync(FileBytes, totalBytesRead, fileSize - totalBytesRead);
                totalBytesRead += bytesReadCount;
            } while (bytesReadCount != 0);
        }
        finally {
            stream?.Close();
        }
    }
}
```

### File List and Upload Operations

Once a user selects files in the **Open** dialog or drags files onto a drop zone, the File Input component adds these files to the file list. The file list displays each file’s upload status and upload, cancel, reload, and remove buttons. On the image below, the file list contains 4 files in different states:

![file list](https://docs.devexpress.com/Blazor/images/file-management/file-input/blazor-file-input-upload-queue.png)

Handle the [SelectedFilesChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.SelectedFilesChanged) event to access the collection of files in the file list. Call the following methods to manage these files in code:

|  | Start Upload | Cancel Upload | Restart Canceled Upload | Remove Files from List |
| --- | --- | --- | --- | --- |
| **One File** | [UploadFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.UploadFile\(DevExpress.Blazor.UploadFileInfo\)) | [CancelFileUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelFileUpload\(DevExpress.Blazor.UploadFileInfo\)) | [ReloadFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ReloadFile\(DevExpress.Blazor.UploadFileInfo\)) | [RemoveFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.RemoveFile\(DevExpress.Blazor.UploadFileInfo\)) |
| **Multiple Files** | [UploadFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.UploadFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) | [CancelFilesUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelFilesUpload\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) | [ReloadFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ReloadFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) | [RemoveFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.RemoveFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) |
| **All Files** | [UploadAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.UploadAllFiles) | [CancelAllFilesUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelAllFilesUpload) | [ReloadAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ReloadAllFiles) | [RemoveAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.RemoveAllFiles) |

Disable the [AllowCancel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.AllowCancel) property to hide cancel buttons and prevent users from canceling upload operations. Set the [ShowFileList](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ShowFileList) property to `false` to hide the file list.

#### Upload Modes

In `Instant` upload mode (**default**), upload buttons are hidden. Once a user selects files in the **Open** dialog or drags files onto a drop zone, the File Input component adds these files to the file list and starts an upload operation.

Set the [UploadMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.UploadMode) property to `OnButtonClick` to display upload buttons and start upload operations in response to a button click:

![OnButtonClick Upload Mode](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-use-buttons-mode.png)

```
<DxFileInput UploadMode="UploadMode.OnButtonClick" FilesUploading="OnFilesUploading" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (IFileInputSelectedFile file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

[Run Demo: File Input - Upload Modes](https://demos.devexpress.com/blazor/FileInput#UploadModes)

#### Multiple File Upload

The File Input component allows users to add one file to the file list at a time. Enable the [AllowMultiFileUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.AllowMultiFileUpload) property to allow users to add multiple files to the file list simultaneously. The [MaxFileCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.MaxFileCount) property specifies the maximum size of the file list. When the file list reaches its size limit, users can add new files only after they remove one or more uploaded files.

> [!note] Note
> We do not recommend that you increase the [MaxFileCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.MaxFileCount) property value beyond `1000` (**default**). However, you can set this property to `0` to remove the size limit of the file list.

The following example allows users to add multiple files to the file list:

```
<DxFileInput AllowMultiFileUpload="true" MaxFileCount="500" FilesUploading="OnFilesUploading" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (IFileInputSelectedFile file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

[Run Demo: File Input - Multiple File Selection](https://demos.devexpress.com/blazor/FileInput#MultiFileSelection)

### Drag and Drop

You can enable drag and drop functionality in the File Input component. To enable this functionality, create a drop zone and assign its CSS selector to the [ExternalDropZoneCssSelector](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ExternalDropZoneCssSelector) property. The [ExternalDropZoneDragOverCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ExternalDropZoneDragOverCssClass) property specifies the CSS class applied to this drop zone when users drag files over it.

The following example implements a drop zone container for the File Input component:

![File Input Drop Zone](https://docs.devexpress.com/Blazor/images/file-management/file-input/blazor-file-input-drop-zone.png)

- [Razor](#tabpanel_mVbTkiTWYu_tabid-0)
- [CSS](#tabpanel_mVbTkiTWYu_tabid-1)

```
<div id="overviewDemoDropZone" class="card custom-drop-zone bg-light rounded-3 w-100 m-0">
    <span class="drop-file-icon mb-3"></span>
    <span>Drag and Drop File Here</span>
</div>

<DxFileInput FilesUploading="OnFilesUploading"
             ExternalDropZoneCssSelector="#overviewDemoDropZone"
             ExternalDropZoneDragOverCssClass="bg-light border-secondary text-dark" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (var file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

### Validate Files

#### Built-In Validation

Once a user adds a file to the file list, the File Input component validates the file’s size and extension. If validation fails, the File Input hides the and displays an error message. Specify the following properties to place additional restriction on files that users can upload:

[AcceptedFileTypes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.AcceptedFileTypes)

Filters files in the Open File dialog and specifies [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) the File Input component can upload.

[ValidateByAcceptedFileTypes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ValidateByAcceptedFileTypes)

Specifies whether the component validates files against [accepted file types](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.AcceptedFileTypes) before uploading them.

[AllowedFileExtensions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.AllowedFileExtensions)

Specifies file extensions that the File Input component can upload.

[MaxFileSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.MaxFileSize)

Specifies the maximum file size in bytes.

[MinFileSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.MinFileSize)

Specifies the minimum file size in bytes.

The following example validates size and extensions of uploaded files:

![File Input Validation](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-validation.png)

```
<DxFileInput MinFileSize="1000"
             MaxFileSize="4000000"
             FilesUploading="OnFilesUploading"
             AllowedFileExtensions="@(new List<string> { ".jpg", ".jpeg", ".gif", ".png" })" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (IFileInputSelectedFile file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

#### Custom Validation

To introduce secure file upload operations to your application, we recommend that you add different validation types to the [FilesUploading](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.FilesUploading) event’s handler, for example:

- Validate the file name. Pass the [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.IFileInputSelectedFile.Name) property value to the [Path.GetFileName](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getfilename?view=net-8.0) method to obtain the actual file name.
- Limit file name length and restrict allowed characters.
- If you save the file to a real file system, check whether the result file path is within the expected root directory. Call the [Path.GetFullPath](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getfullpath?view=net-8.0) method to resolve path information:
	```csharp
	var rootDirectory = new Directorylnfo(".");
	var resolvedPath = Path.GetFullPath(Path.Combine(rootDirectory.FullName, Path.GetFileName(file.Name)) ) ;
	if (!resolvedPath.StartsWith(rootDirectory.FullName + Path.DirectorySeparatorChar)) {
	    throw new Exception();
	}
	```
- Limit file size.
- Validate file extensions and manage allowed extensions. Call the [Path.GetExtension](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getextension?view=net-8.0) method to obtain the actual file extension:
	```csharp
	var extension = Path.GetExtension(file.Name).ToUpperInvariant();
	if (!imageExtensions.Contains(extension))
	    throw new InvalidOperationException();
	```

The following code sample validates sizes and extensions of uploaded files:

```
<DxFileInput AllowedFileExtensions="imageExtensions"
             MaxFileSize="MaxValidFileSize"
             FilesUploading="OnFilesUploading" />

@code {
    const long MaxValidFileSize = 4_000_000;
    List<string> imageExtensions = new List<string> {".JPG", ".JPEG", ".GIF", ".PNG"};

    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (var file in args.Files) {
            try {
                var extension = Path.GetExtension(file.Name).ToUpperInvariant();

                if (imageExtensions.Contains(extension) && file.Size <= MaxValidFileSize) {
                    /* The following code is intended for demonstration purposes only.
                    Do not read a stream directly in memory to avoid performance and security-related issues. */
                    using var stream = new System.IO.MemoryStream();
                    await file.OpenReadStream(file.Size).CopyToAsync(stream);
                }
                else
                    throw new Exception();
            }
            catch (Exception ex) {
                // Handle exceptions here
            }
        }
    }
}
```

For additional information and examples, refer to the following topics:

- [Unrestricted File Upload](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [Azure Validation](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-input-validation#controls-users)
- [Microsoft Security Considerations](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#security-considerations)
- [Validation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#validation)

### Select Button Customization

The **Select File** button invokes the **Open** dialog. In this dialog, users can select files that the File Input component should upload. Specify the [SelectButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.SelectButtonText) property to change the caption of the built-in select button:

```
<DxFileInput FilesUploading="OnFilesUploading" SelectButtonText="Select My File" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (IFileInputSelectedFile file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

Disable the [ShowSelectButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ShowSelectButton) property to hide the built-in select button. Specify the [ExternalSelectButtonCssSelector](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.ExternalSelectButtonCssSelector) property to implement an external select button.

The following example implements a that invokes the **Open** dialog on click:

![Upload Validation](https://docs.devexpress.com/Blazor/images/file-management/file-input/blazor-file-input-select-button-customization.png)

- [Razor](#tabpanel_mVbTkiTWYu-1_tabid-0)
- [CSS](#tabpanel_mVbTkiTWYu-1_tabid-1)

```
<div id="overviewDemoDropZone" class="card custom-drop-zone bg-light rounded-3 w-100 m-0">
    <span>Drag & Drop a file</span>
    <span>…or click to browse for a file instead.</span>
</div>

<DxFileInput FilesUploading="OnFilesUploading"
             ExternalSelectButtonCssSelector="#overviewDemoDropZone"
             ExternalDropZoneCssSelector="#overviewDemoDropZone" />

@code {
    async Task OnFilesUploading(FilesUploadingEventArgs args) {
        foreach (var file in args.Files) {
            /* The following code is intended for demonstration purposes only.
            Do not read a stream directly in memory to avoid performance and security-related issues. */
            using var stream = new System.IO.MemoryStream();
            await file.OpenReadStream(file.Size).CopyToAsync(stream);
        }
    }
}
```

### Keyboard Navigation

The DevExpress Blazor File Input component supports keyboard shortcuts that allow users to navigate between the component’s buttons. Keyboard navigation is implemented on the client and works seamlessly in Blazor Server apps with a slow connection.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus to the next button. |
| Shift + Tab | Moves focus to the previous button. |
| Enter, Space | Presses the focused button. |

![File Input Keyboard Navigation](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-keyboard-navigation.gif)

[Run Demo: File Input - Overview](https://demos.devexpress.com/blazor/FileInput#Overview)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent-1) <DevExpress.Blazor.Internal.JSInterop.FileInputJSInteropProxy>

[DxControlComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxControlComponent-1) <DevExpress.Blazor.Internal.JSInterop.FileInputJSInteropProxy>

DxFileInput

See Also

[DxFileInput Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput._members)