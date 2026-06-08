---
title: Localization
order: 0002
category: 20|General
route: /localization
icon: LocalLanguage
---

# Localization

Localization allows the text in some components to be translated.

## Explanation

**FluentUI Blazor** itself provides English language strings for texts found in.
To customize translations in **FluentUI Blazor**, you can register a custom `IFluentLocalizer` implementation as a service.

Here's a step-by-step guide:

1. **Create a Custom Localizer**

    Implement the `IFluentLocalizer` interface to provide your custom translations.

    ```csharp
    using Microsoft.FluentUI.AspNetCore.Components;

    public class CustomFluentLocalizer : IFluentLocalizer
    {
        public string this[string key, params object[] arguments]
        {
            get
            {
                // Provide custom translations based on the key
                return key switch
                {
                    "SomeKey" => "Your Custom Translation",
                    "AnotherKey" => String.Format("Another Custom Translation {0}"),

                    // Fallback to the Default/English if no translation is found
                    _ => IFluentLocalizer.GetDefault(key, arguments),
                };
            }
        }
    }
    ```

   > [!NOTE] The list of keys can be found in the `Core\Microsoft.FluentUI.AspNetCore.Components\Localization\LanguageResource.resx` file.  
   > Or you can use a constant from the `Microsoft.FluentUI.AspNetCore.Components.Localization.LanguageResource` class.
   > Example: `Localization.LanguageResource.MessageBox_ButtonOk`.

2. **Register the Custom Localizer**

    Register your custom localizer in the `Program.cs` file, during the service registration.

    ```csharp
    builder.Services.AddFluentUIComponents(config => config.Localizer = new CustomFluentLocalizer());
    ```

## Globalization and localization

For Blazor localization guidance, which adds to or supersedes the guidance in this article,
see [ASP.NET Core Blazor globalization and localization](https://learn.microsoft.com/aspnet/core/blazor/globalization-localization).

In summary, you need to:

1. Add localization services

   Apps are localized using [Localization Middleware](https://learn.microsoft.com/aspnet/core/fundamentals/localization#localization-middleware).
   Add localization services to the app with AddLocalization.

   Add the following line to the `Program.cs` file, where services are registered:

   ```csharp
   builder.Services.AddLocalization();
   ```

2. Dynamically set the culture from the `Accept-Language` header.

   ```csharp
   app.UseRequestLocalization(new RequestLocalizationOptions()
       .AddSupportedCultures(new[] { "en-US", "es-CR", "fr", "nl" })
       .AddSupportedUICultures(new[] { "en-US", "es-CR", "fr", "nl" }));
   ```

## Example using an embedded resource (`.resx` file)

You can use an embedded resource to store your translations.

1. Create a resource file

   Create a resource file with the translations. The file should be named `FluentLocalizer.resx` and should be placed in the `Resources` folder.
   Verify that the `Build Action` property of the file is set to `Embedded Resource`,
   and the `Custom Tool` property is set to `ResXFileCodeGenerator` (or `PublicResXFileCodeGenerator`).

2. Add other languages

   Add other languages by creating a resource file with the same name as the default resource file, but with the language code appended.
   For example, for French, create a file named `FluentLocalizer.fr.resx`.

3. Create a custom localizer

   Add this code to read the translations from the resource file:
   ```csharp
   public class EmbeddedCodeGeneratedLocalizer : IFluentLocalizer
   {
       /// <summary>
       /// Gets the string resource with the given key, depending of the current UI culture.
       /// </summary>
       /// <param name="key"></param>
       /// <param name="arguments"></param>
       /// <returns></returns>
       public string this[string key, params object[] arguments]
       {
           get
           {
               // Need to add
               //  - builder.Services.AddLocalization();
               //  - app.UseRequestLocalization(new RequestLocalizationOptions().AddSupportedUICultures(["en", "fr", "nl"]));
     
               // Gets the localized version of the string
               var localizedString = Resources.FluentLocalizer.ResourceManager.GetString(key, CultureInfo.CurrentCulture);
     
               // Fallback to the Default/English if no translation is found
               return localizedString == null
                   ? IFluentLocalizer.GetDefault(key, arguments)
                   : string.Format(CultureInfo.CurrentCulture, localizedString, arguments);
           }
       }
   }
   ```

## Default translations

{{ LocalizationDefaultTranslations SourceCode=false }}
