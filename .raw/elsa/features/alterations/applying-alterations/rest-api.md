# REST API

The Alterations module exposes a REST API for applying alterations directly. For example, to apply an alteration that modifies a variable, migrates the workflow instance to a new version and to schedule an activity, use the following request:

```http
POST /alterations/run HTTP/1.1
Host: localhost:5001

{
    "alterations": [
        {
            "type": "ModifyVariable",
            "variableId": "83fde420b5794bc39a0a7db725405511",
            "value": "Hello world!"
        },
        {
            "type": "Migrate",
            "targetVersion": 9
        },
        {
            "type": "ScheduleActivity",
            "activityId": "mY1rb4GRjkW3urm8dcNSog"
        }
    ],
    "workflowInstanceIds": [
        "88ce68d00e824c78a53af04f16d276ea"
    ]
}
```

Notice that the JSON structure is exactly the same as when submitting a plan. The only difference is that the request is sent to the `/alterations/run` endpoint instead of the `/alteration/submit` endpoint.

The response wil include the execution results:

```json
{
  "results": [
    {
      "workflowInstanceId": "88ce68d00e824c78a53af04f16d276ea",
      "log": {
        "logEntries": [
          {
            "message": "ModifyVariable succeeded",
            "logLevel": 2,
            "timestamp": "2023-10-05T12:35:23.197167+00:00"
          },
          {
            "message": "Migrate succeeded",
            "logLevel": 2,
            "timestamp": "2023-10-05T12:35:23.202805+00:00"
          },
          {
            "message": "ScheduleActivity succeeded",
            "logLevel": 2,
            "timestamp": "2023-10-05T12:35:23.205629+00:00"
          }
        ]
      },
      "isSuccessful": true
    }
  ]
}
```
