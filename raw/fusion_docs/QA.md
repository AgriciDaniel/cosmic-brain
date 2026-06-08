# Q/A

## General questions

> Q: What's the best place to ask questions related to Fusion?

[Fusion Place] is currently the best place to ask questions and
track project updates.

[![Fusion Place](https://img.shields.io/badge/Fusion%20%40%20Voxt-BE145B)](https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo)

> Q: Can I contribute to the project?

Absolutely &ndash; just create your first
[pull request](https://github.com/ActualLab/Fusion/pulls) or
[report a bug](https://github.com/ActualLab/Fusion/issues).

You can also contribute to [Fusion Samples].

## Comparison to other libraries

- [How similar is Fusion to SignalR?](https://medium.com/@alexyakunin/how-similar-is-stl-fusion-to-signalr-e751c14b70c3?source=friends_link&sk=241d5293494e352f3db338d93c352249)
- [How similar is Fusion to Knockout / MobX?](https://medium.com/@alexyakunin/how-similar-is-stl-fusion-to-knockout-mobx-fcebd0bef5d5?source=friends_link&sk=a808f7c46c4d5613605f8ada732e790e)

## Possible use cases, pros and cons

> Q: Can I use Fusion with server-side Blazor?

Yes, you can use it to implement the same real-time update logic there.
The only difference here is that you don't need API controllers supporting
Fusion publication in this case, i.e. your models might depend right on the
_server-side compute services_ (that's an abstraction you primarily deal with,
that "hides" all the complexities of dealing with `Computed<T>`
and does it transparently for you).

> Q: Can I use Fusion _without_ Blazor at all?

The answer is yes &ndash; you can use Fusion in all kinds of .NET Core
apps, though I guess the real question is:

> Q: Can I use Fusion with some native JavaScript client for it?

Right now there is no native JavaScript client for Fusion, so if you
want to use Fusion subscriptions / auto-update features in JS,
you still need a counterpart in Blazor that e.g. exports the "live state"
maintained by Fusion to the JavaScript part of the app after every update.

There is a good chance we (or someone else) will develop a native
JavaScript client for Fusion in the future.

> Q: Are there any benefits of using Fusion on server-side only?

Yes. Any service backed by Fusion, in fact, gets a cache, that invalidates
right when it should. This makes % of inconsistent reads there is as small
as possible.

Which is why Fusion is also a very good fit for caching scenarios requiring
nearly real-time invalidation / minimum % of inconsistent reads.

## API related questions

TBD.

[Fusion Samples]: https://github.com/ActualLab/Fusion.Samples
[Fusion Place]: https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo
