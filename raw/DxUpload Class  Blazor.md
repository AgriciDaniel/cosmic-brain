---
title: "DxUpload Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload"
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

## DxUpload Class

In This Article

A control that allows users to upload files to a web server.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxUpload :
    DxControlComponent<UploadBaseJSInteropProxy>,
    IUploadViewOwner
```

## Remarks

The DevExpress Upload component for Blazor (`<DxUpload>`) allows users to upload files to a server. Users can select files in the open file dialog or drag and drop files to the appropriate drop zone.

![Upload Overview](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/Upload#Overview)

[Read Tutorial: Upload Files to a Cloud Storage](https://docs.devexpress.com/Blazor/404494/components/file-management/upload-files-to-cloud-storage)

### Upload vs. File Input

DevExpress Blazor UI Component Library includes two components that allow you to handle file upload. The key differences between these components are outlined below:

`DxUpload`

This component requires that you create a web API controller in your application project or separate web API project. Once a user selects a file, the Upload component packs the file into an Ajax request and sends this request to the controller that processes the file.

[DxFileInput](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput)

This component allows you to access and process contents of selected files directly in razor code. To configure the component, you should implement file upload in the [FilesUploading](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxFileInput.FilesUploading) event handler.

### Add an Upload to a Project

To add an Upload component to an application, you should:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxUpload>...</DxUpload>` markup to your application.
3. .
4. .
5. Specify other Upload options (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxUpload Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload._members).

### Static Render Mode Specifics

Blazor Upload does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### How File Upload Works

Once a user selects a file, the Upload control packs the file into an Ajax request and sends this request to the server ().

![Upload Progress Bars](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-progress-bars.png)

The controller’s upload action processes this file and sends a response to the Upload control. The Upload control displays the response result (for instance, shows the **Uploaded** text if the file was uploaded successfully).

![Upload - The file was uploaded successfully](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-file-uploaded.png)

Users can click the cancel button to interrupt file upload operations and remove files from the list. To hide the cancel button, set the [AllowCancel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowCancel) property to `false`.

The [SelectedFilesChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.SelectedFilesChanged) event occurs each time the file list changes. You can also handle other events to operations. Set the [ShowFileList](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ShowFileList) property to `false` to hide the file list.

### Connect the Upload Component to the Server

1. Specify the Upload component’s [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.Name) property. Its value is required to access uploaded files on the server.
2. Set the [UploadUrl](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.UploadUrl) property to a path of a server-side controller’s action that processes upload requests.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/">
</DxUpload>
```

### Create an Upload Controller on the Server

Follow the steps below to create an Upload controller:

1. If you use a Blazor Server project, you can add a controller to the same project (see the next step).
	If you use a Blazor WebAssembly project, create a separate [Web API application](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api).
2. .
3. *Optional.*. Do this for projects with a controller and Upload component on different servers.

#### Add a Controller and Implement a Controller Action

Create a controller action that accepts the uploaded file, checks it, and saves it to the target location on a server. Follow the steps below to implement a controller action:

1. Add the **Controllers** folder to your project.
2. Right-click on the **Controllers** folder and select **Add** | **Controller**.
3. In the **Add New Scaffolded Item** wizard, select **MVC Controller - Empty** and click **Add**.
4. On the next page, select **API Controller - Empty**, rename the controller (for example, **UploadController**), and click **Add**.
5. Make sure that your *Program.cs* file contains the `MapControllers` method call. Refer to the following topic for additional information: [Attribute routing for REST APIs](https://learn.microsoft.com/en-us/aspnet/core/mvc/controllers/routing#ar6).

Use one of the following variants to access the uploaded file:

- Create an action with a parameter whose name matches the `Name` property value.
	```csharp
	public ActionResult Upload(IFormFile myFile) {
	    // ...
	}
	```
- Use the `Name` property value to get the uploaded file from form variables.
	```csharp
	public ActionResult Upload() {
	    // ...
	    var myFile = Request.Form.Files["myFile"];
	    // ...
	}
	```

The following example implements the upload controller:

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlazorDemo.AspNetCoreHost;
[Route("api/[controller]")]
[ApiController]
public class UploadController : ControllerBase {
    [HttpPost("[action]")]
    public ActionResult Upload(IFormFile myFile) {
        try {
            // Write code that saves the 'myFile' file.
            // Don't rely on or trust the FileName property without validation.
        } catch {
            return BadRequest();
        }
        return Ok();
    }
}
```

To maintain the highest possible security posture, we do not include the full implementation of the Upload controller. To incorporate secure file upload operations in your web app, we recommend that you add different validation types to upload controller code as described in the following help section: `Validation`. For information on controller implementation code for different file upload scenarios, refer to the following Microsoft article: [File Upload Scenarios](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#file-upload-scenarios).

#### Enable CORS for a Web API Application

For security reasons, browsers do not allow web pages to send requests to different domains (the same-origin policy). The Upload component and the Web API applications cannot communicate if you use them on different domains/servers.

To [enable cross-origin requests](https://learn.microsoft.com/en-us/aspnet/core/security/cors), configure the Web API application as explained below. You can omit this step if the controller and Upload component reside on the same server.

1. In the **Program.cs** file, specify the CORS policy name and call the [AddCors](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.corsservicecollectionextensions.addcors) method to apply this policy. Call the [UseCors](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.corsmiddlewareextensions.usecors) method to add the CORS middleware.
	- [Program.cs](#tabpanel_7b2v0Fgt0l_tabid-net6)
	```csharp
	// ...
	var builder = WebApplication.CreateBuilder(args);
	string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
	// ...
	builder.Services.AddCors(options => {
	    options.AddPolicy(MyAllowSpecificOrigins,
	    builder => {
	        builder.AllowAnyOrigin();
	    });
	});
	var app = builder.Build();
	// ...
	app.UseCors(MyAllowSpecificOrigins);
	app.UseAuthorization();
	// ...
	```
2. Apply the [EnableCors](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.cors.enablecorsattribute) attribute to the Upload controller with the policy name specified above.
	```csharp
	using Microsoft.AspNetCore.Cors;
	[ApiController]
	[EnableCors("_myAllowSpecificOrigins")]
	[Route("api/[controller]")]
	public class UploadController : ControllerBase {
	    // ...
	}
	```

If you deploy your application on an IIS web server, enable CORS in the server’s **web.config** file:

```xml
<system.webServer>
<cors enabled="true" failUnlistedOrigins="true">
    <add origin="\*" />
</cors>
</system.webServer>
```

### Upload Files

#### Common Information

Users can select files (to be uploaded) via the open file dialog or through `drag and drop` operations (drag/drop files to the appropriate drop zone).

![Upload - Upload Files](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-files.png)

To upload/reload files in code, use the methods below:

- [UploadFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.UploadFile\(DevExpress.Blazor.UploadFileInfo\)) / [ReloadFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ReloadFile\(DevExpress.Blazor.UploadFileInfo\)) - Uploads/reloads a specific file.
- [UploadFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.UploadFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) / [ReloadFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ReloadFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) - Uploads/reloads `multiple files`.
- [UploadAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.UploadAllFiles) / [ReloadAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ReloadAllFiles) - Uploads/reloads all files displayed in the Upload component except for [canceled](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowCancel) files.

#### Chunk Upload for Large Files

The Upload component can split large files into small packets and send them to the server in multiple requests (one by one). To enable chunk upload, set the [ChunkSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ChunkSize) property to a positive value that specifies packet size in bytes.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/UploadChunks/Upload/"
          ChunkSize="1000000">
</DxUpload>
```

You should configure your Upload controller to process file chunks. To access the uploaded file, use the Upload component’s [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.Name) property value. To get information about the file chunk, use chunk metadata serialized to a JSON object (see the `ChunkMetadata` class in the example below).

Use one of the following ways to access file and chunk metadata:

- Create an action with two parameters. The first parameter’s name should match the [Name](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.Name) property value. The second parameter should be a string that defines chunk metadata serialized to JSON.
	```csharp
	using System.Text.Json;
	public ActionResult Upload(IFormFile myFile, [FromForm] string chunkMetadata) {
	    // ...
	    var metaDataObject = JsonSerializer.Deserialize<ChunkMetadata>(chunkMetadata);
	    // ...
	}
	```
- Get the uploaded file and chunk metadata from form variables.
	```csharp
	using System.Text.Json;
	public ActionResult Upload() {
	    // ...
	    var myFile = Request.Form.Files["myFile"];
	    var chunkMetadata = Request.Form["chunkMetadata"];
	    var metaDataObject = JsonSerializer.Deserialize<ChunkMetadata>(chunkMetadata);
	    // ...
	}
	```

In the upload action, merge chunks and save the resulting file to the target location.

- [UploadController](#tabpanel_7b2v0Fgt0l-1_tabid-1)

```csharp
using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// Declare a class that stores chunk details.
public class ChunkMetadata {
    public int Index { get; set; }
    public int TotalCount { get; set; }
    public int FileSize { get; set; }
    public string FileName { get; set; }
    public string FileType { get; set; }
    public string FileGuid { get; set; }
}

[Route("api/[controller]")]
[ApiController]
public class UploadChunksController : ControllerBase {
    [HttpPost("[action]")]
    public ActionResult Upload(IFormFile myFile) {
        string chunkMetadata = Request.Form["chunkMetadata"];
        try {
            if(!string.IsNullOrEmpty(chunkMetadata)) {
                var metaDataObject = JsonSerializer.Deserialize<ChunkMetadata>(chunkMetadata);
                // Write code that appends the 'myFile' file chunk to the temporary file.
                // You can use the $"{metaDataObject.FileGuid}.tmp" name for the temporary file.
                // Don't rely on or trust the FileName property without validation.
                if(metaDataObject.Index == metaDataObject.TotalCount - 1) {
                    // Write code that saves the 'myFile' file.
                    // Don't rely on or trust the FileName property without validation.
                }
            }
        } catch {
            return BadRequest();
        }
        return Ok();
    }
}
```

![Upload Chunk Upload](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-chunk-upload.png)

[Run Demo: Upload - Chunk Upload](https://demos.devexpress.com/blazor/Upload#ChunkUpload)

In this mode, users can pause file upload operations within the UI. To hide the pause button, set the [AllowPause](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowPause) property to `false`.

#### Multiple File Upload

Set the [AllowMultiFileUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowMultiFileUpload) property to `true` to enable users to upload multiple files at once (asynchronously). You can also use the `MaxFileCount` property to limit the number of files that can be uploaded.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/"
          AllowMultiFileUpload="true"
          MaxFileCount="500">
</DxUpload>
```

The `MaxFileCount` property’s default value is `1000`. We recommend this limit to ensure correct operation of the `DxUpload` component. If you need to reset the limit and allow users to select any number of files, set the property to `0` (zero).

![Upload Multi File Upload](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-multi-file-upload.gif)

[Run Demo: Upload - Multiple File Selection](https://demos.devexpress.com/blazor/Upload#MultiFileSelection)

#### Upload Modes

The Upload component uploads files once a user selects or “drops” files ([UploadMode.Instant](https://docs.devexpress.com/Blazor/DevExpress.Blazor.UploadMode)). Set the [UploadMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.UploadMode) property to [UploadMode.OnButtonClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.UploadMode) to upload files after the user clicks the upload button.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/"
          UploadMode="UploadMode.OnButtonClick">
</DxUpload>
```

![Upload Use Buttons Mode](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-use-buttons-mode.png)

[Run Demo: Upload - Upload Modes](https://demos.devexpress.com/blazor/Upload#UploadModes)

#### Respond to File Upload

Handle the following events to respond to actions during the file upload process:

| Event | Description |
| --- | --- |
| [FileUploadStart](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadStart) | Fires when file upload is about to start. |
| [FileUploadStarted](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadStarted) | Fires when file upload starts. |
| [FileUploaded](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploaded) | Fires when a file is uploaded successfully. |
| [FileUploadAborted](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadAborted) | Fires when file upload is aborted. |
| [FileUploadPaused](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadPaused) | Fires when file upload is paused. |
| [FileUploadError](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadError) | Fires when an error occurs during file upload. |
| [FileReloaded](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileReloaded) | Fires when a file is reloaded. |
| [FileUploadProgressChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.FileUploadProgressChanged) | Fires when upload progress changes. |

### Cancel File Upload

Users can cancel file upload in the UI. To hide the cancel button, set the [AllowCancel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowCancel) property to `false`.

![Upload Cancel Button](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-cancel-button.png)

Users can then reload or remove the file whose upload was canceled.

![Upload Chunk Reload Button](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-reload-button.png)

To cancel file upload or remove files from the file list in code, use the methods below:

- [CancelFileUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelFileUpload\(DevExpress.Blazor.UploadFileInfo\)) / [RemoveFile](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.RemoveFile\(DevExpress.Blazor.UploadFileInfo\)) - Cancels a specific file’s upload or removes a specific file from the file list.
- [CancelFilesUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelFilesUpload\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) / [RemoveFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.RemoveFiles\(System.Collections.Generic.IEnumerable-DevExpress.Blazor.UploadFileInfo-\)) - Cancels upload of multiple files or removes multiple files from the file list.
- [CancelAllFilesUpload](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.CancelAllFilesUpload) / [RemoveAllFiles](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.RemoveAllFiles) - Cancels upload of all files or removes all files from the file list.

### Drag and Drop

To enable drag and drop in the Upload, implement an external zone where users can drop a file to upload. Use the following properties to define the drop zone UI:

- [ExternalDropZoneCssSelector](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ExternalDropZoneCssSelector) - Specifies the CSS selector of a container or HTML element wherein to drop the files.
- [ExternalDropZoneDragOverCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ExternalDropZoneDragOverCssClass) - Specifies the CSS class of the drop zone when users drag files over it.

- [Razor](#tabpanel_7b2v0Fgt0l-2_tabid-razor)
- [CSS](#tabpanel_7b2v0Fgt0l-2_tabid-css)

```
<div id="overviewDemoDropZone" class="card custom-drop-zone bg-light rounded-3 w-100 m-0">
    <span class="drop-file-icon mb-3"></span>
    <span>Drag and Drop File Here</span>
</div>
<DxUpload Name="myFile"
          UploadUrl="https://localhost:10000/api/Upload/Upload/"
          ExternalDropZoneCssSelector="#overviewDemoDropZone"
          ExternalDropZoneDragOverCssClass="bg-light border-secondary text-dark" >
</DxUpload>
```

![Upload Drag And Drop](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-drag-and-drop.gif)

[Run Demo: Upload - Overview](https://demos.devexpress.com/blazor/Upload#Overview)

### Validation

#### Client-Side Validation

Use the following Upload properties to validate uploaded files on the client:

[AcceptedFileTypes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AcceptedFileTypes)

Filters files in the Open File dialog and specifies [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types) that the Upload component can upload.

[ValidateByAcceptedFileTypes](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ValidateByAcceptedFileTypes)

Specifies whether the component validates files against [accepted file types](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AcceptedFileTypes) before uploading them.

[AllowedFileExtensions](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.AllowedFileExtensions)

Specifies file extensions that the Upload component can upload.

[MaxFileSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.MaxFileSize)

Specifies the maximum file size in bytes.

[MinFileSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.MinFileSize)

Specifies the minimum file size in bytes.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/"
          AllowedFileExtensions="@(new List<string> { ".jpg", ".jpeg", ".gif", ".png" })"
          MaxFileSize="4000000">
</DxUpload>
```

If validation fails, the Upload component displays an error message.

![Upload Validation](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-validation.png)

[Run Demo: Upload - Validation](https://demos.devexpress.com/blazor/Upload#Validation)

#### Server-Side Validation

To introduce secure file upload operations to your application, we recommend that you add different validation types to upload controller code, for example:

- Validate the file name: Use [Path.GetFileName](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getfilename?view=net-7.0) against the file name to obtain the actual file name.
- Limit file name length and restrict allowed characters.
- If using a real file system, check whether the file is within the expected root directory. Use [Path.GetFullPath](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getfullpath?view=net-7.0) to resolve path information.
	```csharp
	var rootDirectory = new Directorylnfo(".");
	var resolvedPath = Path.GetFullPath(Path.Combine(rootDirectory.FullName, Path.GetFileName(userProvidedPath)));
	if (!resolvedPath.StartsWith(rootDirectory.FullName + Path.DirectorySeparatorChar)) {
	    throw new Exception();
	}
	```
- Limit file size.
- Validate file extensions and manage allowed extensions. Use [Path.GetExtension](https://learn.microsoft.com/en-us/dotnet/api/system.io.path.getextension?view=net-7.0) against a file name to obtain the actual file name extension.
	```csharp
	var extension = Path.GetExtension(myFile.FileName).ToUpperInvariant();
	var isValidExtension = imageExtensions.Contains(extension);
	if(!isValidExtension) throw new InvalidOperationException();
	```

For additional information and examples, refer to the following documents:

- [Unrestricted File Upload](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [Azure Validation](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-input-validation#controls-users)
- [Microsoft Security Considerations](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#security-considerations)
- [Validation](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#validation)

The following code implements a simple upload controller and validates file extensions/file paths on the server side. You can also add implement other validation methods to further secure your solution.

- [UploadController](#tabpanel_7b2v0Fgt0l-3_tabid-1)

```csharp
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UploadValidationController : ControllerBase {
    const long MaxFileSize = 4_000_000;
    readonly string[] imageExtensions = { ".JPG", ".JPEG", ".GIF", ".PNG" };
    [HttpPost("[action]")]
    public ActionResult Upload(IFormFile myFile) {
        try {
            var extension = Path.GetExtension(myFile.FileName).ToUpperInvariant();
            var isValidExtension = imageExtensions.Contains(extension);
            var isValidSize = myFile.Length <= MaxFileSize;
            if(!isValidExtension || !isValidSize)
                throw new InvalidOperationException();
            // Write code that saves the 'myFile' file.
            // Don't rely on or trust the FileName property without validation.
        } catch {
            return BadRequest();
        }
        return Ok();
    }
}
```

[Run Demo: Upload - Validation](https://demos.devexpress.com/blazor/Upload#Validation)

### Select Button Customization

Use the [SelectButtonText](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.SelectButtonText) property to change the **Select File** button’s text.

```
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/"
          SelectButtonText="Select My File">
</DxUpload>
```

![Upload Select Button Custom Text](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-select-button-custom-text.png)

To hide the select button, set the [ShowSelectButton](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ShowSelectButton) property to `false`.

You can also implement an external select button that invokes the open file dialog. Use the [ExternalSelectButtonCssSelector](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.ExternalSelectButtonCssSelector) to specify the CSS selector of a button or another HTML element.

The following example implements the external **Select File** button and. Handle the [SelectedFilesChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.SelectedFilesChanged) event and use the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload.Visible) property to hide the Upload when the file list is empty.

- [Razor](#tabpanel_7b2v0Fgt0l-4_tabid-razor)
- [CSS](#tabpanel_7b2v0Fgt0l-4_tabid-css)

```
<div id="overviewDemoDropZone" class="card custom-drop-zone bg-light rounded-3 w-100 m-0">
    <span class="drop-file-icon mb-3"></span>
    <span>Drag and Drop File Here</span><span class="m-1">or</span>
    <button id="overviewDemoSelectButton" class="btn border-primary btn-primary m-1">Select File</button>
</div>
<DxUpload Name="myFile" UploadUrl="https://localhost:10000/api/Upload/Upload/"
          Visible="@UploadVisible"
          ExternalSelectButtonCssSelector="#overviewDemoSelectButton"
          ExternalDropZoneCssSelector="#overviewDemoDropZone"
          ExternalDropZoneDragOverCssClass="bg-light border-secondary text-dark"
          SelectedFilesChanged="@SelectedFilesChanged">
</DxUpload>

@code {
    bool UploadVisible { get; set; } = false;

    protected void SelectedFilesChanged(IEnumerable<UploadFileInfo> files) {
        UploadVisible = files.ToList().Count > 0;
        InvokeAsync(StateHasChanged);
    }
}
```

![Upload External UI](https://docs.devexpress.com/Blazor/images/file-management/upload/blazor-upload-external-ui.png)

[Run Demo: Upload - Overview](https://demos.devexpress.com/blazor/Upload#Overview)

### Keyboard Navigation

The DevExpress Blazor Upload component supports keyboard shortcuts that allow users to navigate between the component’s buttons. Keyboard navigation is implemented on the client and works seamlessly in Blazor Server apps with a slow connection.

> [!note] Note
> Keyboard support allows users to interact with application content in cases they cannot use a mouse or they rely on assistive technologies (like screen readers or switch devices). Refer to the [Accessibility](https://docs.devexpress.com/Blazor/404749/common-concepts/accessibility) help topic for information on other accessibility areas that we address.

The following shortcut keys are available:

| Shortcut Keys | Description |
| --- | --- |
| Tab | Moves focus to the next button. |
| Shift + Tab | Moves focus to the previous button. |
| Enter, Space | Presses the focused button. |

[Run Demo: Upload - Overview](https://demos.devexpress.com/blazor/Upload#Overview)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent-1) <DevExpress.Blazor.Internal.JSInterop.UploadBaseJSInteropProxy>

[DxControlComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxControlComponent-1) <DevExpress.Blazor.Internal.JSInterop.UploadBaseJSInteropProxy>

DxUpload

See Also

[DxUpload Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxUpload._members)