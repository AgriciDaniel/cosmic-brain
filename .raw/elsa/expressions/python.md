# Python

When creating workflows, you'll often need to write dynamic expressions. This page provides an overview of enabling Python expressions and what functions and objects you can use.

## Installing Python

Before we can use Python Expressions, we first need to have Python itself installed.

### Windows

Follow these steps to install Python on Windows.

{% stepper %}
{% step %}
Download the Installer

* Visit the [official Python downloads page](https://www.python.org/downloads/windows/).
* Click on the "Download Windows installer" link for the latest version.
{% endstep %}

{% step %}
Run the Installer

* Locate the downloaded `.exe` file and double-click to start the installation.
* In the installer window, ensure you check the box labeled "Add Python to PATH."
* Click "Install Now" and follow the on-screen instructions.
{% endstep %}

{% step %}
Verify the Installation

* Open Command Prompt (`cmd`).
* Type `python --version` and press Enter.
* You should see the Python version number displayed.
{% endstep %}

{% step %}
Find the Python Installation Path

To locate the Python installation directory on Windows:

* Open Command Prompt.
* Type `where python` and press Enter.
* This command will display the path to the Python executable.

The shared library (`python38.dll`) is typically located in the same directory as the Python executable.

Take note of the full path to the `python38.dll` file. We will need it shortly.
{% endstep %}
{% endstepper %}

### MacOS

Follow these steps to install Python on MacOS.

{% stepper %}
{% step %}
Download the Installer

* Navigate to the [official Python downloads page](https://www.python.org/downloads/macos/).
* Click on the "Download macOS 64-bit installer" link for the latest version.
{% endstep %}

{% step %}
Run the Installer

* Locate the downloaded `.pkg` file and double-click to start the installation.
* Follow the on-screen instructions to complete the installation.
{% endstep %}

{% step %}
Verify the Installation

* Open Terminal.
* Type `python3 --version` and press Enter.
* You should see the Python version number displayed.
{% endstep %}

{% step %}
Find the Python Installation Path

* Open Terminal.
*   Type the following command and press Enter:

    ```bash
    which python3
    ```
* This will display the path to the Python executable.

The shared library (`libpython3.8.dylib`) is typically located in the `lib` directory within the Python installation path.

Take note of the full path to the `libpython3.8.dylib` file. We will need it shortly.
{% endstep %}
{% endstepper %}

### Configure Environment Variables

Make sure to configure the `PYTHONNET_PYDLL` environment variable to point to the python DLL found in the previous step.

Also make sure to set `PYTHONNET_RUNTIME` to `coreclr`

{% hint style="info" %}
Refer to the [Pythonnet GitHub project](https://github.com/pythonnet/pythonnet) for detailed documentation.
{% endhint %}

## Installing the Python Feature

The Python Expressions feature is provided by the following package:

```bash
dotnet add package Elsa.Expressions.Python
```

You can enable the feature as follows:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UsePython();
});
```
{% endcode %}

### Configuration

The `UsePython` extension provides an overload that accepts a delegate that lets you configure the `PythonFeature`, which itself exposes a delegate to configure `PythonOptions`.

For example:

{% code title="Program.cs" %}
```csharp
services.AddElsa(elsa =>
{
   elsa.UsePython(python =>
   {
      python.PythonOptions += options =>
      {
         options.AddScript(sb =>
         {
            sb.AppendLine("def greet():");
            sb.AppendLine("    return \"Hello, welcome to Python!\"");
         });
      }
   });
});
```
{% endcode %}

## Globals

The following functions and objects are available to all Python expressions:

* [output](python.md#output)
* [input](python.md#input)
* [variables](python.md#variables)
* [execution\_context](python.md#execution_context)

### output

The `output` object provides methods to access an activity's output.

```python
# Get the output of the specified activity, optionally specifying a specific output.
get(string, string?): object?

# Gets the output of the last executed activity.
last_result(): object?
```

### input

### variables

The `variables` object provides access to the workflow variables. For example, if your workflow has a variable called OrderId, you can get and set that workflow variable using the following Python expression:

```python
import uuid

# Set the OrderId workflow variable.
variables.OrderId = uuid.uuid4();

# Get the OrderId workflow variable.
orderId = variables.OrderId;

# Set the OrderId workflow variable using the 'set' method.
variables.set("OrderId", uuid.uuid4())

# Get the OrderId workflow variable using the 'get' method.
orderId = variables.get("OrderId")
```

The input object provides access to workflow input.

```python
input.get(string): object?
```

### execution\_context

The execution\_context object provides access to the following information:

```python
workflow_instance_id: string
correlation_id: string
```
