// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using Microsoft.AspNetCore.Components;

namespace FluentUI.Demo.Client.Documentation.Components.Dialog.Examples.Dialog;

public class PersonDetails
{
    private static readonly string _longDescription = string.Join("", SampleData.Text.LoremIpsum.Select(i => $"<p>{i}</p>"));

    public string Age { get; set; } = "";

    public MarkupString VeryLongDescription => (MarkupString)_longDescription;

    public override string ToString() => $"Age: {Age}";
}
