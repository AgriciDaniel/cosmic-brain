# Programmatic

## Before you start﻿ <a href="#before-you-start" id="before-you-start"></a>

For this guide, we will need the following:

* An [Elsa Server](https://elsa-workflows.github.io/elsa-documentation/elsa-server.html?section=Programmatic) project

Please return here when you are ready.

## Workflow Overview﻿ <a href="#workflow-overview" id="workflow-overview"></a>

We will define a new workflow called `GetUser`. The purpose of the workflow is to handle inbound HTTP requests by fetching a user by a given user ID from a backend API and writing them back to the client in JSON format.

For the backend API, we will use [reqres.in](https://reqres.in/), which returns fake data using real HTTP responses.

Our workflow will parse the inbound HTTP request by getting the desired user ID from a route parameter and use that value to make an API call to reqres.

The following is an example of such an HTTP request that you can try right now from your browser: [https://reqres.in/api/users/2](https://reqres.in/api/users/2)

The response should look similar to this:

```json
{
    "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
    }
}
```

Our workflow will essentially be a proxy sitting in front of the reqres API and return a portion of the response.

## Create C# Workflow﻿ <a href="#create-workflow-using-csharp" id="create-workflow-using-csharp"></a>

Follow these steps to create the workflow from code.

{% stepper %}
{% step %}
Create Workflow

Create GetUser.cs and add the following code:

{% code title="GetUser.cs" %}
```csharp
using System.Dynamic;
using System.Net;
using Elsa.Http;
using Elsa.Http.Models;
using Elsa.Workflows;
using Elsa.Workflows.Activities;
using Elsa.Workflows.Contracts;

namespace WorkflowApp.Web.Workflows;

public class GetUser : WorkflowBase
{
    protected override void Build(IWorkflowBuilder builder)
    {
        var routeDataVariable = builder.WithVariable<IDictionary<string, object>>();
        var userIdVariable = builder.WithVariable<string>();
        var userVariable = builder.WithVariable<ExpandoObject>();

        builder.Root = new Sequence
        {
            Activities =
            {
                new HttpEndpoint
                {
                    Path = new("users/{userid}"),
                    SupportedMethods = new(new[] { HttpMethods.Get }),
                    CanStartWorkflow = true,
                    RouteData = new(routeDataVariable)
                },
                new SetVariable
                {
                    Variable = userIdVariable,
                    Value = new(context =>
                    {
                        var routeData = routeDataVariable.Get(context)!;
                        var userId = routeData["userid"].ToString();
                        return userId;
                    })
                },
                new SendHttpRequest
                {
                    Url = new(context =>
                    {
                        var userId = userIdVariable.Get(context);
                        return new Uri($"https://reqres.in/api/users/{userId}");
                    }),
                    Method = new(HttpMethods.Get),
                    ParsedContent = new(userVariable),
                    ExpectedStatusCodes =
                    {
                        new HttpStatusCodeCase
                        {
                            StatusCode = StatusCodes.Status200OK,
                            Activity = new WriteHttpResponse
                            {
                                Content = new(context =>
                                {
                                    var user = (dynamic)userVariable.Get(context)!;
                                    return user.data;
                                }),
                                StatusCode = new(HttpStatusCode.OK)
                            }
                        },
                        new HttpStatusCodeCase
                        {
                            StatusCode = StatusCodes.Status404NotFound,
                            Activity = new WriteHttpResponse
                            {
                                Content = new("User not found"),
                                StatusCode = new(HttpStatusCode.NotFound)
                            }
                        }
                    }
                }
            }
        };
    }
}
```
{% endcode %}
{% endstep %}
{% endstepper %}

Let's go over this workflow section by section.

### Workflow Variables﻿ <a href="#workflow-variables" id="workflow-variables"></a>

```csharp
var routeDataVariable = builder.WithVariable<IDictionary<string, object>>();
var userIdVariable = builder.WithVariable<string>();
var userVariable = builder.WithVariable<ExpandoObject>();
```

Here, we defined 3 workflow variables.

The `routeDataVariable` variable is used to capture route data output from the HTTP endpoint activity. This variable is a dictionary.

The `userIdVariable` variable is used to store the user ID value that we get from the `routeDataVariable` dictionary.

The `userVariable` variable is used to capture the parsed response from the reqres API call. Since reqres returns JSON content and the capturing variable is of type `ExpandoObject`, the `SendHttpRequest` activity will parse the received JSON response into an `ExpandoObject`.

### HttpEndpoint Activity﻿ <a href="#httpendpoint-activity" id="httpendpoint-activity"></a>

```csharp
new HttpEndpoint
{
    Path = new("users/{userid}"),
    SupportedMethods = new(new[] { HttpMethods.Get }),
    CanStartWorkflow = true,
    RouteData = new(routeDataVariable)
},
```

Here we see the `HttpEndpoint` activity being defined and configured to be a trigger by setting `CanStartWorkflow` to `true`.

We set its `Path` property to respond to `users/{userid}`. Notice that we are using a route parameter using the name `userid`. This is the key we will use to grab the provided user ID from the inbound URL path.

To capture the route data, we assign the `routeDataVariable` variable to the `RouteData` output of the activity.

### SetVariable Activity﻿ <a href="#setvariable-activity" id="setvariable-activity"></a>

```csharp
new SetVariable
{
    Variable = userIdVariable,
    Value = new(context =>
    {
        var routeData = routeDataVariable.Get(context)!;
        var userId = routeData["userid"].ToString();
        return userId;
    })
},
```

Here we see the `SetVariable` activity defined and configured to set the `userIdVariable` variable to the dictionary entry with key `"userid"`.

We set its `Variable` property to reference the `userIdVariable` variable and its `Value` property to a callback that returns the received user ID from the route data dictionary.

### SendHttpRequest Activity﻿ <a href="#sendhttprequest-activity" id="sendhttprequest-activity"></a>

```csharp
new SendHttpRequest
{
    Url = new(context =>
    {
        var userId = userIdVariable.Get(context);
        return new Uri($"https://reqres.in/api/users/{userId}");
    }),
    Method = new(HttpMethods.Get),
    ParsedContent = new(userVariable),
    ExpectedStatusCodes =
    {
        new HttpStatusCodeCase
        {
            StatusCode = StatusCodes.Status200OK,
            Activity = new WriteHttpResponse
            {
                Content = new(context =>
                {
                    var user = (dynamic)userVariable.Get(context)!;
                    return user.data;
                }),
                StatusCode = new(HttpStatusCode.OK)
            }
        },
        new HttpStatusCodeCase
        {
            StatusCode = StatusCodes.Status404NotFound,
            Activity = new WriteHttpResponse
            {
                Content = new("User not found"),
                StatusCode = new(HttpStatusCode.NotFound)
            }
        }
    }
}
```

The `SendHttpRequest` activity is configured to send an HTTP request to the reqres API endpoint.

We set its `Url` property to a URL that includes the received user ID.

To capture the response, we assign its `ParsedContent` output to the `userVariable` variable.

Since the caller of the workflow might provide user IDs that don't correspond to a user record in the reqres backend, we configure the activity to handle two possible HTTP status codes:

* 200 OK
* 404 Not Found

For each of these possible status codes, we assign an appropriate `WriteHttpResponse` activity.

for the 200 case, the WriteHttpResponse activity access the `data` field of the user response object received from reqres:

```
new HttpStatusCodeCase
{
    StatusCode = StatusCodes.Status200OK,
    Activity = new WriteHttpResponse
    {
        Content = new(context =>
        {
            var user = (dynamic)userVariable.Get(context)!;
            return user.data;
        }),
        StatusCode = new(HttpStatusCode.OK)
    }
},
```

## Run Workflow﻿ <a href="#run-workflow" id="run-workflow"></a>

Since the workflow uses the `HttpEndpoint` activity, it will trigger when we send an HTTP request to the /workflows/users/{userId} path.

Try it out by navigating to [https://localhost:5001/workflows/users/2](https://localhost:5001/workflows/users/2).

The response should look similar to this:

```json
{
    "id": 2,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
}
```

### Summary﻿ <a href="#summary" id="summary"></a>

In this guide, we learned how to define a workflow from code.

We leveraged the `HttpEndpoint` activity and used is as a trigger to start the workflow.

The workflow is able to read route parameters and store it in a variable, which we then used as an input to send an API call to the reqres API that in turn returns the requested user.

We have also seen how to handle various responses from reqres: 200 OK and 404 Not Found

The source code for this guide can be found [here](https://github.com/elsa-workflows/elsa-guides/tree/main/src/guides/http-workflows).
