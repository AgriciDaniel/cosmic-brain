---
title: Migration FluentInputFile
route: /Migration/InputFile
hidden: true
---

- ### Changed properties

  | V4 Property | V5 Property | Change |
  |-------------|-------------|--------|
  | `OnFileError` (`EventCallback<FluentInputFileEventArgs>`) | `OnFileError` (`EventCallback<FluentInputFileErrorEventArgs>`) | Type changed to new error-specific event args |
  | `AnchorId` (`string`, default `""`) | `AnchorId` (`string?`) | Now nullable |

- ### Removed properties 💥

  - `OnFileCountExceeded` (`EventCallback<int>`) — merged into `OnFileError`.
    The file count exceeded scenario is now reported via `FluentInputFileErrorEventArgs.FileCountExceeded`.

    ```csharp
    // V4
    <FluentInputFile OnFileCountExceeded="@HandleTooManyFiles" OnFileError="@HandleError" />

    // V5
    <FluentInputFile OnFileError="@HandleError" />
    // In handler, check: if (args.FileCountExceeded) { ... }
    ```

- ### New properties

  - `Width` (`string?`)
  - `Height` (`string?`)
