---
title: "Get Started with Blazor Rich Text Editor | Blazor"
source: "https://docs.devexpress.com/Blazor/403121/components/rich-edit/get-started-with-rich-text-editor"
author:
published: 2001-01-15
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## Get Started with Blazor Rich Text Editor

In This Article

This topic describes how to or to use a [DevExpress Rich Text Editor](https://docs.devexpress.com/Blazor/DevExpress.Blazor.RichEdit.DxRichEdit) component.

## Create a New Project (DevExpress Templates)

Follow [this tutorial](https://docs.devexpress.com/Blazor/405308/get-started/template-kit) to create a Blazor application using the DevExpress Template Kit. To add the Rich Text Editor to the application, choose the correponding option in the Kit.

![DevExpress Template Kit - Settings](https://docs.devexpress.com/Blazor/images/rich-edit/blazor-rich-template-kit.png)

## Configure an Existing Project

Follow the steps below to incorporate the Rich Text Editor into a Blazor app created with a [Microsoft template](https://learn.microsoft.com/en-us/aspnet/core/blazor/tooling).

### 1\. Register Common DevExpress Resources

Create an application as described in the following topic: [Get Started With DevExpress Components for Blazor](https://docs.devexpress.com/Blazor/401057/get-started).

### 2\. Register Rich Text Editor Resources

1. Install the **DevExpress.Blazor.RichEdit** NuGet package.
	1. Select **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**.
		2. In the invoked dialog, open the **Browse** tab, select the **DevExpress** package source, and install the **DevExpress.Blazor.RichEdit** NuGet package.
	The DevExpress package is automatically added as a package source to your NuGet configuration files if you use the [DevExpress.NET Product Installer](https://docs.devexpress.com/GeneralInformation/15615/installation/download-the-registered-version).
	![NuGet Package Manager](https://docs.devexpress.com/Blazor/images/rich-edit/blazor-rich-get-started-nuget.png)
2. Register the Rich Text Editor’s CSS file in the `<head>` section of the *Components/App.razor* file for Blazor Web applications.
	```
	<head>
	    @DxResourceManager.RegisterTheme(Themes.Fluent)
	    <link href=@AppendVersion("_content/DevExpress.Blazor.RichEdit/dx-blazor-richedit.css") rel="stylesheet" />
	    @* ... *@
	</head>
	@code {
	    private string AppendVersion(string path) => FileVersionProvider.AddFileVersionToPath("/", path);
	}
	```
	We recommend that you refresh cached resources on user machines to avoid [rendering issues](https://docs.devexpress.com/Blazor/403286/troubleshooting/common-component-issues/blazor-components-are-rendered-incorrectly#static-resources-are-cached). For example, our DevExpress Blazor project template uses [IFileVersionProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.ifileversionprovider):
	```
	<head>
	    @*...*@
	    @DxResourceManager.RegisterTheme(Themes.Fluent)
	    <link href=@AppendVersion("css/site.css") rel="stylesheet" />
	    <link href=@AppendVersion("<ProjectName>.styles.css") rel="stylesheet" />
	</head>
	@code {
	    private string AppendVersion(string path) => FileVersionProvider.AddFileVersionToPath("/", path);
	}
	```
	Note: Blazor hybrid applications use the `BlazorWebView` component to render Razor markup. Since this component does not retain the browser cache between application sessions, you may omit this step. If you still wish to implement this solution, make sure that you register a theme in a `Razor` component.
	Such techniques ensure that web browsers on user machines use the current version of DevExpress CSS resources instead of the previously cached version. Refer to [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) for additional information about the browser cache.
3. Register the [DevExpress.Blazor.Office](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Office) and [DevExpress.Blazor.RichEdit](https://docs.devexpress.com/Blazor/DevExpress.Blazor.RichEdit) namespaces in the *Components/Imports.razor* file:
	- [\_Imports.razor](#tabpanel_TJqK2VUymG_tabid-markup)
	```
	@using DevExpress.Blazor.Office
	@using DevExpress.Blazor.RichEdit
	```
4. *Optional.* Set up the Rich Text Editor’s culture. See the following topic for details: [Localization](https://docs.devexpress.com/Blazor/401564/common-concepts/localization).

## Add a Rich Text Editor

Add the `<DxRichEdit />` tag to the `Pages/Index.razor` page. Blazor Rich Text Editor does not support static render mode. You need to enable interactivity on a Razor page to allow Blazor Rich Text Editor to execute scripts and display data.

- [Index.razor](#tabpanel_TJqK2VUymG-1_tabid-markup)

```
@rendermode InteractiveServer

<DxRichEdit />
```

Run the application to see the result:

![Rich Text Editor](https://docs.devexpress.com/Blazor/images/rich-edit/blazor-rich-get-started.png)