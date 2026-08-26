# The Story Behind Fusion

Somewhere in 2011, I started to use [Knockout](https://knockoutjs.com/)
by [Steve Sanderson](http://blog.stevensanderson.com/) &ndash;
a JavaScript library that eventually became a de-facto standard "backbone"
for your view models in
[SPA](https://en.wikipedia.org/wiki/Single-page_application)s
running on the Microsoft web stack.
The [computed observable abstraction](https://knockoutjs.com/documentation/computedObservables.html)
it offers provides an astonishingly convenient way of describing how
certain parts of the model change in response to changes made to other parts.

In 2012 I joined [Quora](https://www.quora.com/) and learned it's built on
the company's own web framework with its own gemstone:
[quora.com](https://www.quora.com/) updates the content all of its users see
in real-time. When someone upvotes an answer or writes a comment,
other users instantly see the change without refreshing the page, and this
applies to every piece of content! It is 2012, and as far as I remember,
none of the top websites were capable of something remotely similar to this &ndash;
in short, this was quite unusual, and the problem looked really hard to tackle at such a scale.
You can learn more about the underlying technology in
[Shreyes Seshasai's Tech Talk @ Stanford from May 2011: "webnode2 and LiveNode"](https://www.quora.com/q/shreyesseshasaisposts/Tech-Talk-webnode2-and-LiveNode),
but overall, Quora used (and AFAIK, still uses) an abstraction allowing
its UI components to capture and track the dependencies on data and re-render
themselves on server-side once these dependencies change.

My thoughts at that point were nearly the following:

- Steve Sanderson's Knockout is an amazing technology recomputing parts
  of your view model once their dependencies change.
  Unfortunately, it works only on the client.
- Quora's LiveNode + webNode2 is another incredible technology solving
  a very similar problem on the server-side.
  Moreover, [Quora.com](https://www.quora.com/) is a live proof you can
  rely on such dependency tracking and successfully scale to
  300M+ monthly active users.
- So... Can we write a library that works _both_ on the server-side
  _and_ the client-side enabling developers not just to use the same
  abstractions everywhere, but also to propagate the state changes
  in any direction relying on shared models and APIs?
  And can we make these abstractions _truly transparent_?

It took a while to get back to this problem &ndash; my first few years at
[ServiceTitan](https://www.servicetitan.com/) were absolutely terrific,
but also quite intense in terms of the workload. 2020 was the first
year I got a chance to write a fair amount of code;
besides that, a few other things happened over these years:

- [React](https://reactjs.org/) (I love it from the day one)
  took #1 spot among web UI frameworks
- [Knockout](https://github.com/knockout/knockout) got a strong competitor:
  [MobX](https://github.com/mobxjs/mobx), which does the same, but almost
  transparently. A very similar "computed observable" abstraction was
  implemented in many other UI libraries &ndash;
  e.g. [Vue.js uses it as well](https://vuejs.org/v2/guide/computed.html).
- I realized the problem with dependency tracking is deeply connected with
  caching and eventual consistency. You can read about this further, but
  overall, the further you scale, the more it becomes desirable for you
  to have a technology that invalidates cached data as quickly as possible
  after the moment it becomes inconsistent with the ground truth.
- And finally,
  [Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)
  made it possible to run .NET code in browser /
  [WebAssembly](https://webassembly.org/) &ndash; and in particular,
  enable server-side and client-side code to use shared .NET assemblies.
  FYI, Blazor was also created by Steve Sanderson &ndash; yes, the same
  person who long time ago created Knockout!

So the demand for such a library was still there, and moreover,
all the tools needed to build it became available.

![](./img/MissingPiece.jpg)

The only missing piece was Fusion itself.

#### [Back to Documentation &raquo;](./index.md)
