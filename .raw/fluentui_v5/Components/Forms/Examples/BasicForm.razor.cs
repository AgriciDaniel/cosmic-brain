// ------------------------------------------------------------------------
// This file is licensed to you under the MIT License.
// ------------------------------------------------------------------------

using FluentUI.Demo.SampleData;

namespace FluentUI.Demo.Client.Documentation.Components.Forms.Examples;

public partial class BasicForm
{
    private Starship starship { get; set; } = new();

    protected override void OnInitialized()
    {
        starship.ProductionDate = System.DateTime.Now;
    }

    private static void HandleValidSubmit()
    {
        Console.WriteLine("HandleValidSubmit called");
        // Processing the valid form is not implemented for demo purposes
    }
}
