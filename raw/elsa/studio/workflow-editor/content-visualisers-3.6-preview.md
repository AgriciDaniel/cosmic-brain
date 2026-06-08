# Content Visualisers (3.6-preview)

## Overview

Content visualizers are an extensible viewer that allows simple and complex objects to displayed in either Prettified, Tabular or Raw formats. To open the visualizer, click either the magnifier icon or the show all <mark style="color:blue;">\[...]</mark> ellipsis.

<figure><img src="../../.gitbook/assets/Screenshot 2025-07-06 234638.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The <mark style="color:blue;">\[...]</mark> will appear only when the content exceeds 300 characters.
{% endhint %}

&#x20;The `DefaultContentVisualizerProvider` attempts to resolve the content by invoking the `CanVisualize` method of each registered visualizer. If a matching visualizer is found, it is automatically selected—this can be seen in the top-right corner. If no visualizer matches, the `DefaultContentVisualizer` is used as a fallback. You can switch between available visualizers using the dropdown in the top-right. Once a visualizer is selected, its supported renderers are displayed in the tabs on the left.

<figure><img src="../../.gitbook/assets/Screenshot 2025-07-07 002030.png" alt=""><figcaption><p>Pretty renderer</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2025-07-07 002508.png" alt=""><figcaption><p>Tabular renderer</p></figcaption></figure>

The Copy icon now copies the content in its Prettified format, rather than the Raw format used in the table view.

{% hint style="info" %}
The small Lock icon enables editing of both the Pretty and Raw content within the popup. While changes are not persisted, they can be helpful for debugging or testing workflows and activities.
{% endhint %}

## Custom visualizers

Elsa Studio comes with a built in JSON visualiser, that supports both prettified json and tabular renderings for array values. Here is an example of  the`JsonContentVisualizer` implementation:

```csharp
public class JsonContentVisualizer : IContentVisualizer
{
    // The display name of the visualizer
    public string Name => "Json";

    // The Syntax used to render the language in the Monaco Editor
    public string Syntax => "json";

    /// Evaluates the input and returns true if this visualizer can be used
    public bool CanVisualize(object input)
    {
        // Code here...
    }

    /// The method to return prettyfied contents
    /// Note: Return null if this method is not supported in your visualizer
    public string? ToPretty(object input)
    {
        // Code here ...
    }

    /// The method to return tabulated contents
    /// Note: Return null if this method is not supported in your visualizer
    public TabulatedContentVisualizer? ToTable(object input)
    {
        // Code here ...
    }
}
```

Visualizers can then be registered with:

<pre class="language-csharp"><code class="lang-csharp"><strong>// Register the content visualizer with DI.
</strong>services.AddContentVisualizer&#x3C;JsonContentVisualizer>();
</code></pre>

This will then be available in the visualizer drop-down list and be used when evaluating availiable visualizers.
