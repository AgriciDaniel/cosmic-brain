# Packages

Elsa is available as a collection of NuGet packages. Some packages are required for executing workflows, while others provide integrations with systems like service buses, cloud services, and additional features such as email delivery.

## **Main Package**

The primary package you'll need to get started with Elsa is the `Elsa` package. It's a bundle that includes the following essential packages:

* Elsa.Api.Common
* Elsa.Mediator
* Elsa.Workflows.Core
* Elsa.Workflows.Management
* Elsa.Workflows.Runtime

To install the core `Elsa` package, use the `dotnet` CLI:

```
dotnet add package Elsa
```

## **Package Feeds**

Elsa packages are distributed through various feeds based on their stability and release phase:

<table><thead><tr><th width="228">Type</th><th width="100">Feed</th><th>URL</th></tr></thead><tbody><tr><td>Releases</td><td>NuGet</td><td>https://api.nuget.org/v3/index.json</td></tr><tr><td>Release Candidates</td><td>NuGet</td><td>https://api.nuget.org/v3/index.json</td></tr><tr><td>Previews</td><td>Feedz</td><td>https://f.feedz.io/elsa-workflows/elsa-3/nuget/index.json</td></tr></tbody></table>

### **Releases** <a href="#releases" id="releases"></a>

Stable versions of Elsa are distributed via NuGet.org.

### **Release Candidates (RC)** <a href="#release-candidates-rc" id="release-candidates-rc"></a>

RC packages are also available on NuGet.org. They offer a sneak peek into upcoming features, allowing users to test and provide feedback before the final release. While RC packages are generally stable, they might still undergo changes before the final release.

### **Previews** <a href="#previews" id="previews"></a>

Preview versions represent the cutting-edge developments in Elsa. They are automatically built and deployed to a public feed on Feedz whenever changes are pushed to the `v3` branch. While they provide the latest features and fixes, they might introduce breaking changes.

To access preview packages, include the feed URL when using the dotnet CLI or add it to your `NuGet.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="NuGet official package source" value="https://api.nuget.org/v3/index.json" />
    <add key="Elsa 3 preview" value="https://f.feedz.io/elsa-workflows/elsa-3/nuget/index.json" />
  </packageSources>
</configuration>
```

{% hint style="warning" %}
**Preview Packages**

Ensure the "Preview" checkbox is ticked in your NuGet explorer to view the preview packages.
{% endhint %}

## **Versioning Strategy** <a href="#versioning-strategy" id="versioning-strategy"></a>

Elsa uses to the following versioning strategy:

* **Released** packages: Major.Minor.Revision (e.g., `3.0.1`)
* **Release Candidate** packages: Major.Minor.Revision-rcX (e.g., `3.0.2-rc1`)
* **Preview** packages: Major.Minor.Revision-preview.X (e.g., `3.0.2-preview.128`)

The major version remains consistent unless significant changes occur. New features increment the minor version, while fixes or minor improvements bump the revision number.\
