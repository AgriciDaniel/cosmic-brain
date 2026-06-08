# Fusion Overview  

## What is "Real-time User Interface"?

> It is the UI displaying always up-to-date content, which 
gets updated even when the user doesn't take any actions. 

Let's look at seemingly unrelated problem first: 
**caching with real-time entry invalidation**. 
A pseudocode solving this problem for a specific computation
would look as follows:

```cs
var key = (nameof(ComputeValueFor), arg1, arg2, arg3, ...);
for (;;) {
    var observableValue = await ComputeAsync(arg1, arg2, arg2, ...);
    await cache.SetAsync(key, observableValue.Value);
    await observableValue.ChangedAsync();
    await cache.Evict(key);
}
```

Now, think `observableValue` is either HTML or some other markup
defining either a whole UI or its fragment. If it is similarly capable
of signaling when it gets changed (or when it likely gets changed),
your real-time UI update logic could look as follows:

```cs
for (;;) {
    var observableMarkup = await ComputeMarkupAsync(arg1, arg2, arg2, ...);
    Render(observableMarkup);
    await observableValue.ChangedAsync();
}
```  

There is a broad range of problems which could be solved nicely
with an abstraction allowing you to write functions, which, like
`async` functions, return a wrapper over their true output that
later signals when the output (for the same set of arguments) 
is going to change.

So if we compare this with `async` functions, the difference is:
* Async function returns `Task<T>`, which allows to asynchronously
  await for the completion of a computation - in other words,
  subscribe for ~ `Completed` event. Once you've got this event,
  you can access task's `Result` and `Exception` properties.
* Our new functions should return `IComputed<T>`, which similarly
  allows to access `Value` and `Error` (and you don't have to
  await to get these), but also allows to asynchronously await 
  for the moment when call to the same function would produce
  `IComputed<T>`, which `(Value, Error)` pair would differ from the
  ones you have.

Ultimately, this is exactly what Fusion brings - 
an abstraction for `IComputed<T>` and a way to write functions
returning these [Computed Values]. 

Surprisingly, Fusion doesn't require you to both "wrap" and "unwrap" 
these `IComputed<T>` "boxes" everywhere - soon you'll learn that
methods of [Compute Services] are implicitly "backed" by `IComputed<T>` 
boxes behind the scenes, even though their return type stays the same.
It looks like a violation of "explicit is better than implicit" principle, 
but hopefully you'll recognize is exactly the case when an exception 
just proves the rule is right, because it's all about the readability:
* Nearly all [Compute Service] methods are supposed to be asynchronous, 
  and seeing `Task<IComputed<Whatever>>` instead of `Task<Whatever>` 
  everywhere is already painful.
* But unwrapping such outputs with 
  `var value = (await GetSomethingAsync(...).ConfigureAwait(false)).Value`
  is even more painful, assuming you usually have more than one call
  site for every method you write.

And even more importantly, Fusion also automatically tracks dependencies
between [Computed Values] produced by [Compute Services], so once
any of them gets invalidated, it ensures all the values dependent
on it are invalidated too. This feature saves a tremendous amount
of time, because in fact, **Fusion requires you to manually invalidate
just the values produced from external (non Fusion-based) data sources**;
the rest gets invalidated automatically.

But before we dig deeper, let's learn how all of this is related to 
*eventual consistency* - more precisely, how this approach dramatically
improves the most important property of any eventually consistent system.

## Caching, Invalidation, and Eventual Consistency

Quick recap of what consistency and caching is:

1. **"Consistency"** is the state when the values observed satisfy the
   relation rules defined for them. Relations are defined as
   a set of predicates (or assertions) about the values, but 
   the most common relation is `x == fn(a, b)`, 
   i.e. it says `x` is always an output of some function `fn` 
   applied to `(a, b)`. In other words, it's a **functional relation**.

2. Consistency can be **partial** - e.g. you can say that triplet `(x, a, b)`
   is in consistent state for all the relations defined for it, but
   it's not true for some other values and/or relations. In short,
   "consistency" always implies some scope of it, and this scope can be as
   narrow as a single value or a consistency rule.

3. Consistency can be **eventual** - this is a fancy way of saying that
   if you'll leave the system "untouched" (i.e. won't introduce new changes), 
   *eventually* (i.e. at some point in future) you will find it in 
   a consistent state. 
   
4. **Any non-malfunctioning system is at least eventually consistent**.
   Being worse than eventually consistent is almost exactly the same as 
   "being prone to a failure you won't recover from - *ever*".
   
5. **"Caching"** is just a fancy way of saying "we store the results of 
   computations somewhere and reuse them without running the actual
   computation again". 
   * Typically, "caching" implies use of high-performance key-value 
     stores with some built-in invalidation policies (LRU, timer-based 
     expiration, etc.), but...
   * If we define "caching" broadly, even storing the data in CPU
     register is an example of caching. Further I'll be using
     "caching" mostly in this sense, i.e. implying it is a "reuse 
     of previously stored computation results w/o running a computation
     again".
     
Now, let's say we have two systems, A and B, and both are eventually
consistent. Are they equally good for developers? 
No. The biggest differentiating factor between eventually consistent 
systems is the probability of finding them in consistent (or inconsistent) 
state. You can also define this as ~ an expected length of inconsistency 
period for a random transaction that follow the update - in other words,
the duration of a period after a random update during which a random
user of this system might get some data that captures the inconsistency.
* If this period is tiny, such a system is quite similar to 
  always-consistent one. Most of the reads there are consistent, 
  so you as a developer can optimistically ignore the inconsistencies 
  on reads and check for them only when you apply the updates.
* On contrary, large inconsistency periods are quite painful -
  you have to take them into account everywhere, including the
  code that reads the data.

> "Tiny" and "large inconsistency periods" above are a relative
> term &ndash; all you care about is the percent of transactions
> that capture the inconsistency. So if the users of your app 
> are humans, "tiny" is ~ a millisecond or so, but if you build 
> an API for robots (trading, etc.), "tiny" might be a sub-microsecond.

Long story short, we want tiny inconsistency periods. But wait...
If we look at what most caches offer, there are just two ways of
controlling this:
* Setting entry expiration time  
* Evicting the entry manually. 

The first option is easy to code, but has a huge trade-off:
* Tiny expiration time gives you smaller inconsistency periods,
  but simultaneously, it decreases your cache hit rate.
* And on contrary, large expiration time can give you a good cache
  hit ratio, but much longer inconsistency periods might turn
  into a huge pain.

![](img/InconsistencyPeriod.gif)
      
So here is the solution plan:
* Assuming we care only about `x == f(...)`-style consistency rules,
  we need something that will tell us when the output of a certain 
  function changes &ndash; as quickly as possible.
* If we have this piece, we can solve both problems:
  * Cache inconsistency
  * Real-time UI updates.
    
## The Implementation

Detecting changes precisely is ~ as expensive as computing the function itself. 
But if we are ok with a small % of false positives, we can assume that
function's output always changes once its input changes. 
It's ~ similar to an assumption every function is a 
[random oracle](https://en.wikipedia.org/wiki/Random_oracle),
or a perfect hash function.

Once we agreed on this, the problem of detecting changes gets much simpler:
we only need to figure out what are all the inputs of every function.
Note that arguments is just one part of the input, another one is anything that's 
"consumed" from external state - e.g. static variables or other functions.

I'll explain how we'll use this convention shortly, but for now let's 
also think of the API we need to get change notifications for
anything we compute.

Let's say this is the "original" function's code we have:
```cs
DateTime GetCurrentTimeWithOffset(TimeSpan offset) {
    var time = GetCurrentTime()
    return time + offset;
}  
```

As you see, this function uses both the argument and the external state
(`GetCurrentTime()`) to produce the output. So first, we want to make it
return something that allows us to get a notification once its output 
is invalidated: 
```cs
IComputed<DateTime> GetCurrentTimeWithOffset(TimeSpan offset) {
    var time = GetCurrentTime()
    return Computed.New(time + offset); // Notice we return a different type now!
}  
```

[`IComputed<T>`] we return here is defined as:
```cs
interface IComputed<T> {
    ConsistencyState ConsistencyState { get; } // Computing -> Consistent -> Invalidated
    T Value { get; }
    Action Invalidated; // Event, triggered just once on invalidation

    void Invalidate();
}
```

Nice. Now, as you see, this method returns a different (in fact, a new) 
instance of `IComputed<T>` for different arguments, so this part 
of the function's input is always constant relatively to its output.
The only thing that may change the output (for a given set of arguments)
is the output of `GetCurrentTime()`.

But what if we assume this function also supports our API, i.e. it has
the following signature:
```cs
IComputed<DateTime> GetCurrentTime();
``` 

If that's the case, the working version of 
`GetCurrentTimeWithOffset()` could be:
```cs
IComputed<DateTime> GetCurrentTimeWithOffset(TimeSpan offset) {
    var cTime = GetCurrentTime()
    var result = Computed.New(cTime.Value + offset);
    cTime.Invalidated += () => result.Invalidate();
    return result;
}  
```

> If you ever used [Knockout.js](https://knockoutjs.com/) or 
> [MobX](https://mobx.js.org/), this is almost exactly
> the code you write there when you want to create a computed
> observable that uses some other observable &ndash; 
> except the fact you don't have to manually
> subscribe on dependency's invalidation (this happens
> automatically).

As you see, now any output of `GetCurrentTimeWithOffset()`
is automatically invalidated once the output of `GetCurrentTime()`
gets invalidated, so *we fully solved the invalidation problem for
`GetCurrentTimeWithOffset()`!* 

But what's going to invalidate the output of `GetCurrentTime()`?
Actually, there are just two options:
1. Either this function's output is invalidated the same way
   `GetCurrentTimeWithOffset()` output is invalidated - i.e. it similarly 
   subscribes to the invalidation events of all of its dependencies and
   invalidates itself once any of them signals.
2. Or there is some other code that invalidates it "manually".
   This is always the case when one of values it consumes don't support 
   `IComputed<T>`.

Let's ignore functions from the second category for now. Can we
turn every regular function from the first category to a function that
returns IComputed<T> without even changing its code? Yes:
```cs
// The original code in TimeService class
virtual DateTime GetCurrentTimeWithOffset(TimeSpan offset) {
    var time = GetCurrentTime()
    return time + offset;
}

// ...

// The "decorated" version of this function generated in a 
// descendant of TimeService class:                     
override DateTime GetCurrentTimeWithOffset(TimeSpan offset) {
    // Below is a GROSS SIMPLIFICATION of what really happens, I
    // provide it here mainly to explain all the high-level actions
    var dependant = Computed.GetCurrent(); // Relies on AsyncLocal<T>
    try {
        // 1. Trying to pull cached value w/o locking;
        //    the real cacheKey is, of course, more complex.
        var cacheKey = (object)(this, nameof(GetCurrentTimeWithOffset), offset);
        if (ComputedRegistry.TryGet(cacheKey, out var result))
            return result;
        
        // 2. Retrying the same with async lock to make sure 
        //    we never recompute the same result twice
        using var _ = await LockAsync(cacheKey);
        if (ComputedRegistry.TryGet(cacheKey, out result))
            return result;

        // 3. Nothing is cached, so we have to compute the result
        result = Computed.New();
        using var _ = Computed.SetCurrent(result);
        try {
            result.SetValue(base.GetCurrentTimeWithOffset(offset));
        }
        catch (Exception e) {
            result.SetError(e);
        }
        ComputedRegistry.Set(cacheKey, result);
        return result.Value; // Re-throws an error if SetError was called 
    }
    finally {
        // Let's setup a dependent-dependency link; again,
        // the real logic is very different from this.
        if (dependant is not null)
            result.Invalidated += () => dependant.Invalidate();
    }
}  
``` 

As you see, the only change I've made to the original was "virtual"
keyword to allow proxy type to override this method and implement
the desirable behavior without changing the base method's body.

> For the sake of clarity: the real Fusion proxy code is way more complex due
> to the following factors:
> * The caching logic (esp. related to key computation & comparison) 
    is more complex
> * It uses a different invalidation subscription model. The one shown above 
>   isn't GC-friendly: `dependency.Invalidated` handler references a closure
>   that references dependent instance, so while some low-level dependency 
>   is alive (reachable from GC roots), its whole subtree of dependants stays 
>   in heap too, which is obviously quite bad.
> * There are a few other pieces needed for a complete solution to work - e.g.
>   manual invalidation, faster and customizable equality comparison for 
>   method arguments (they have to be compared with what's in cache), 
>   `CancellationToken` handling, ...
>
> But overall, it's a very similar code on conceptual level.

Let's get back to the second part now - the methods that don't call other
methods returning `IComputed<T>` and thus getting no invalidation automatically. 
How do we invalidate them?

Well, we'll have to do this manually. On a positive side, 
think about the logic in a real-life app:
* 80% of it is high-level logic - in particular, anything you have on the 
  client-side and most of the server-side calls something else in the same 
  app to get the data. In particular, most of controller and service layer
  is such a logic.
* Maybe just 20% of logic pulls the data by invoking some third-party code 
  or API (e.g. queries SQL data providers). This is the code that has
  to support manual invalidation.

Shortly you'll learn it's not that hard to cover these 20% of cases. 
But first, let's look at some...

## Real Fusion Code

That's how real Fusion-based code of `GetTimeWithOffsetAsync` looks like:
```cs
public class TimeService
{
    ...

    [ComputeMethod]
    public virtual async Task<DateTime> GetTimeWithOffsetAsync(TimeSpan offset)
    {
        var time = await GetTimeAsync(); // Yes, it supports async calls too
        return time + offset;
    }
}
```

As you see, it's almost exactly the code you saw, but with a single difference:
* The method is decorated with `[ComputeMethod]` - the attribute is required
  mainly to enable some safety checks, though it also allows to configure the
  options for `IComputed<T>` instances backing this method.    

In any other sense it works nearly as it was described earlier.

Let's get back to manual invalidation. The code below is taken from 
`ChatService.cs` in Fusion samples; everything related to `CancellationToken` 
and all `.ConfigureAwait(false)` calls are removed for readability (that's
~ the same boilerplate code as in any other .NET async logic), but the rest 
is untouched.

```cs
// Notice this is a regular method, not a compute service method
public async Task<ChatUser> CreateUserAsync(string name)
{
    // The real-life code should do this a bit differently
    using var dbContext = DbHub.CreateDbContext();
    dbContext.ReadWrite();

    // That's the code you'd see normally here
    var userEntry = dbContext.Users.Add(new ChatUser() {
        Name = name
    });
    await dbContext.SaveChangesAsync();
    var user = userEntry.Entity;

    // And that's the extra logic performing invalidations
    using (Invalidation.Begin()) {
        _ = GetUserAsync(user.Id);
        _ = GetUserCountAsync();
    }
    return user;
}
```

As you see, it's fairly simple - you use `Invalidation.Begin()` block
to invalidate a set of compute service method call results.

I guess you anticipate there are some cases when it's hard to precisely 
pinpoint what to invalidate. Yes, there are, and here is a bit trickier
example:
```cs
// The code from ChatService.cs from ActualLab.Fusion.Samples.Blazor.Server.
[ComputeMethod]
public virtual async Task<ChatPage> GetChatTailAsync(int length)
{
    using var dbContext = DbHub.CreateDbContext();
    dbContext.ReadWrite();

    // The same code as usual
    var messages = dbContext.Messages.OrderByDescending(m => m.Id).Take(length).ToList();
    messages.Reverse();
    // Notice we fetch users in parallel by calling GetUserAsync(...) 
    // instead of using a single query with left outer join in SQL? 
    // Seems sub-optiomal, right?
    var users = await Task.WhenAll(messages
        .DistinctBy(m => m.UserId)
        .Select(m => GetUserAsync(m.UserId, cancellationToken)));
    var userById = users.ToDictionary(u => u.Id);

    await EveryChatTail(); // <- Notice this line
    return new ChatPage(messages, userById);
}

[ComputeMethod]
protected virtual async Task<Unit> EveryChatTail() => default;

```

> Q: Why this scenario is a bit more complex?

A: `GetChatTailAsync(...)` has `length` argument, so let's say we write
`AddMessageAsync` method - how it supposed to find every chat tail
to invalidate, assuming different clients were calling this method
with different `length` values?

> Q: Why fetching users in parallel is ok here?

A: `GetUserAsync()` is also a compute service method, which means its
results are cached. So in a real-life chat app these calls aren't expected
to be resolved via DB - most of these users should be already cached,
which means these calls won't hit the DB and will complete synchronously.

The second reason to call `GetUserAsync()` is to make the resulting 
chat page dependent on all the users listed there. This is the reason 
you instantly see the change of any user name in chat sample: when 
the name changes, it invalidates corresponding `GetUserAsync()` call
result, which in turn invalidates every chat page where this user 
was used. 

> Q: Why do you call  `EveryChatTail()`, which clearly does nothing?

A: This call is made solely to make any chat tail page dependent on it. 
If you look for usages of `EveryChatTail()`, you'll find another one:

```cs
public async Task<ChatMessage> AddMessageAsync(long userId, string text)
{
    using var dbContext = DbHub.CreateDbContext();
    dbContext.ReadWrite();
    
    // Again, this absolutely usual code
    await GetUserAsync(userId, cancellationToken); // Let's make sure the user exists
    var messageEntry = dbContext.Messages.Add(new ChatMessage() {
        CreatedAt = DateTime.UtcNow,
        UserId = userId,
        Text = text,
    });
    await dbContext.SaveChangesAsync(cancellationToken);
    var message = messageEntry.Entity;

    // And that's the extra invalidation logic:
    using (Invalidation.Begin())
        _ = EveryChatTail(); // <-- Pay attention to this line
    return message;
}
```

So as you see, we create a dependency on fake data source here &ndash;
`EveryChatTail()`, and invalidate this fake data source to invalidate
every chat tail independently on its length.

You can use the same trick to invalidate data in much more complex
cases &ndash; note that you can introduce parameters to such methods too,
call many of them, make them call themselves recursively with more "broad"
scope, etc.

Ok, now you know that manual invalidation typically requires ~ 1...3
extra lines of code per every method modifying the data, and zero (typically) 
extra lines of code per every method reading the data. Not a lot, but still,
do you want to pay this price to have a real-time UI? 

Of course the answer is "it depends", but the extra cost clearly doesn't 
look prohibitively high. If you need a real-time UI anyway, or a robust 
caching tier with real-time invalidation, the approach shown here might 
be the best option.

If we switch to Fusion terms, you've just learned about:
* [Compute Services] - services allowed to have Compute Methods.
  Such methods are decorated with `[ComputeMethod]` attribute and
  are provided with ...
* [`IComputed<T>`] AKA [Computed Values] behind the scenes.
  
There are a few more interesting concepts though, and [Replica Services]
is the next important one:

## Distributed Compute Services

First, notice that nothing prevents us from crafting this "kind" of `IComputed<T>`:
```cs
public class ReplicaComputed<T> : IComputed<T> {
    ConsistencyState ConsistencyState { get; } // Computing -> Consistent -> Invalidated
    T Value { get; }
    Action Invalidated;
    
    public ReplicaComputed<T>(IComputed<T> source) {
        Value = source.Value;
        ConsistencyState = source.ConsistencyState;
        source.Invalidated += () => Invalidate();
    } 

    public void Invalidate() { ... }
}
```

As you see, it does nothing but "replicates" the source's behavior. Doesn't seem
quite useful, right? But what about remote replicas? What if we implement something
allowing to publish a computed instance on server side, which will let clients
create its remote replicas, and these remote replicas will support all the same
operations - e.g. you could subscribe to their invalidation events or request an update?

Long story short, such type really exists in Fusion, and it works nearly as 
I described. Speaking about the updates - let's add one more useful method 
to our `IComputed<T>`:
```cs
interface IComputed<T> {
    ConsistencyState ConsistencyState { get; }
    T Value { get; }
    Action Invalidated; 
    
    void Invalidate();
    Task<IComputed<T>> UpdateAsync(); // THIS ONE
}
```

`UpdateAsync` allows us to get the most up-to-date `IComputed<T>`
that corresponds to the same computation. If the current `IComputed` is still
consistent, it will simply return itself, otherwise it will trigger the
computation again and produce the new `IComputed<T>` storing its most
current output - or maybe will just fetch it from cache, if it was
already produced by the time we call `UpdateAsync`.

If remote replicas support `UpdateAsync` too, remote clients are free to 
update any *currently inconsistent* value they consume at any time!

Now, can we make it work so that you don't even see the process boundary,
and don't bother about whether you consume a replica or a real computed 
instance? Can we make client-side code to look identical to server-side
code?

As you might guess, YES again!

Fusion provides a fancy base type for your ASP.NET Core API controllers:
`FusionController`. This controller currently provides a single extra method,
and here its complete source code:
```cs
protected virtual Task<T> PublishAsync<T>(Func<CancellationToken, Task<T>> producer)
{
    var cancellationToken = HttpContext.RequestAborted;
    var headers = HttpContext.Request.Headers;
    var mustPublish = headers.TryGetValue(FusionHeaders.RequestPublication, out var _);
    if (!mustPublish)
        return producer.Invoke(cancellationToken);
    return Publisher
        .PublishAsync(producer, cancellationToken)
        .ContinueWith(task => {
            var publication = task.Result;
            HttpContext.Publish(publication);
            return publication.State.Computed.Value;
        }, cancellationToken);
}
```

This is how you use it:
```cs
[Route("api/[controller]")]
[ApiController]
public class TimeController : FusionController, ITimeService
{
    TimeService Time { get; }
 
    ...

    [HttpGet("get")]
    public Task<DateTime> GetTimeAsync() 
        => PublishAsync(ct => Time.GetTimeAsync(ct)); // LOOK AT THIS LINE
}
```

That's all you need to get an `IComputed<T>` created by `Time.GetTimeAsync()`
published!

If you look at `PublishAsync` code above, you'll notice it checks if the
request has `RequestPublication` header (it's actual value is `"X-Fusion-Publish"`),
and:
* If this header presents, it runs a `producer` and does some extra to publish its output
* Otherwise, it simply returns the value produced.

All of this means that if you write your controllers like this, you get both a 
"normal" server-side API, and an API that supports Fusion publication mechanism
almost for free!

The proof: if you open Fusion samples and go to http://localhost:5005/swagger/ page,
you'll see this:

![](img/SwaggerDoc.jpg)

You can launch any of these methods right there, of course.

And if you check out what happens on networking tab, here is what you'll see
for Chat sample:

![](img/ChatNetworking.gif)

Notice that:
* Every `get*` API method is called just once (for a given set of arguments) - 
  one API call is enough to create a client-side replica of server-side computed
  instance that was created behind the scenes for this call.
* The updates to this replica are coming via WebSocket connection shown first.   
 
And here are the headers of such API requests:

![](img/FusionHeaders.gif)
 
You might be curious, how client-side code consuming Fusion API looks like. 
Here is nearly all client-side code (except view) that powers "Server Screen"
sample:

1.  This interface is *literally all you need* to "consume" the 
    API endpoint providing computed replicas behind the scenes!
    Fusion uses [RestEase](https://github.com/canton7/RestEase)
    to generate the actual HTTP client implementing this interface
    in runtime and "wraps" it once more to intercept everything 
    related to its replicas. 
    ```cs
    // typeof(ITimeService) on the next line tells the type Fusion exposes it as
    [RestEaseReplicaService(typeof(ITimeService))] 
    [BasePath("time")]
    public interface ITimeClient : IRestEaseReplicaClient
    {
        [Get("get")]
        Task<DateTime> GetTimeAsync(CancellationToken cancellationToken = default);
    }
    ```

2.  And this is auto-updating UI component using this service:
    ```razor
    @page "/serverTime"
    @using System.Threading
    @inherits ComputedStateComponent<DateTime>
    @inject ITimeService TimeService

    @{
        var time = State.LastValue.Format();
        var error = State.Error;
    }

    <h1>Server Time</h1>

    <p>Server Time: @time</p>

    @if (error is not null) {
        <div class="alert alert-warning" role="alert">
            Update error: @error.Message
        </div>
    }

    <button class="btn btn-primary" @onclick="() => State.Invalidate(true)">Refresh</button>

    @code {
        protected override Task<DateTime> ComputeState(CancellationToken cancellationToken)
            => TimeService.GetTimeAsync(cancellationToken);
    }
    ```  

This component inherits from `LiveComponentBase<T>`, which ensures
it has `State` property (a [Live State]) and all the logic needed to recompute it
once it changes; 
[here you can read more about this](https://github.com/ActualLab/Fusion/blob/master/README.md#enough-talk-show-me-the-code).

The feature allowing to replicate [Compute Service] on the client is called
[Replica Services]. Do such services differ from compute services? Yes and no:
* Yes, because they are implemented automatically
* No, because they behave almost exactly as a [Compute Service] they mimic, 
  so in particular, you can "consume" the values they produce in other 
  [Compute Services], and all the invalidation chains will just work.
  
![](img/ActualLab-Fusion-Chat-Sample.gif)

"Composition" sample (shown in a bottom-right window) proves exactly this. 
It "composes" its own model by two different ways: 
* First panel's UI model is 
  [composed on the server-side](https://github.com/ActualLab/Fusion.Samples/blob/master/src/Blazor/Server/Services/ComposerService.cs);
  its client-side replica is bound to the component displaying the panel
* The second panel uses an UI model
  [composed completely on the client](https://github.com/ActualLab/Fusion.Samples/blob/master/src/Blazor/Client/Services/LocalComposerService.cs) 
  by combining server-side replicas of all the values used there.
* **The surprising part:** two above files are almost identical!

That's why Fusion is a nearly...

## Transparent Abstraction     

Likely, you already spotted that you almost never have to deal 
with `IComputed<T>` directly:
* You never see it as a part of the API
* You never see it in a remote client
* And even the web API based on Fusion looks like a regular one!
* **Nevertheless, it's there and it works!**

In this sense, Fusion is quite similar to Garbage Collection - 
a much more famous transparent abstraction all of us love.

![](img/Invisiboard.jpg)

Stay focused, that's the last topic here :)

## Fusion And Other Technologies

### SignalR, Pusher, etc.

Technically, you don't need [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) 
or anything similar with Fusion:
* Yes, they are capable to push messages to the clients
* And although Fusion currently "pushes" just one type of message - 
  "the original computed instance for your replica is invalidated", 
  this is more than enough to have the rest, since the subsequent update 
  (or even another API call) can bring all the data needed.

You may think of this as follows:
* Usually the messages we send combine two pieces of information: 
  "the state has changed" + "that's how exactly it changed".
* Fusion is an abstraction designed to track state changes; and although it sends 
  just the first kind of message ("state changed"), getting the actual change once
  you get this notification is a cheap operation, because Fusion also ensures
  everything is computed just once after the change.

Here is an example of API endpoints that could be used to implement messaging:
```cs
Task<int> GetLastMessageIndexAsync(string userId);
Task<Message[]> GetLastMessagesAsync(string userId, int count);
```

Notice that such a solution is even better than something like a server-side
broadcast in SignalR (`Clients.All.*` calls), because if you persist these
messages, they'll be still reliably delivered after a temporary disconnection 
of a client and even a server restart &ndash; Fusion reconnects automatically 
and transparently for replicas, and once this happens, all the client-side 
replicas query its most current state.

Besides that, you don't have to think of concepts like "topics" or 
"subscriptions" - whatever you consume from a client automatically gets
the updates, and if it's something shared among multiple clients,
you may think of this as a "topic".

Of course, I don't mean SignalR is absolutely useless with Fusion - 
there are scenarios where you could still benefit from it - e.g.
if you really want to deliver the update as quickly as possible, 
SignalR could be a better choice: currently there is no way to tell Fusion
to push the update together with invalidation message, so any update
requires a explicit round-trip after the invalidation. Later
you will learn why this is behavior is actually quite reasonable,
but nevertheless, there are cases when this could be a deal breaker.
We consider addressing this particular scenario in future, but
even if this is done, there always be other cases and reasons
to prefer X over Fusion. It can't be a silver bullet, even though
it tries really hard to be the one :)

P.S. Check out ["How similar is Fusion to SignalR?"](https://medium.com/@alexyakunin/how-similar-is-stl-fusion-to-signalr-e751c14b70c3?source=friends_link&sk=241d5293494e352f3db338d93c352249) if you want to learn more about 
the similarities and differences.

### Fusion + Blazor = ❤

Why every single piece of a client-side code shown here is supposed to run on 
[Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)? 

![](img/Blazor.jpg)

Fusion is just 5 months old project (that's on Oct 1, 2020). 
In human terms she shouldn't even start to crawl yet :) 
And so far it's a one-man creation - more an MVP vs a finished product.
As you might guess, 3 months for all of this + samples, documentation,
and even the first real implementation (yep, we already have one!) 
is a very tight timeline. 

Adding a fully-featured JavaScript client to this "pack" would
expand the timeline by at least 1 month assuming we build it
relying on MobX, i.e. don't even try to replicate the fancy
"Transparent abstraction" concept we have on server.

This is the original reason I ditched the idea of even trying
to implement a JavaScript client and bet on Blazor.

> Though you're welcome to try doing this - and I'll be happy to help!
   
And that's how I learned **Blazor is absolutely amazing!** I am talking
about the client-side Blazor, i.e. its WebAssembly part, though 
I am absolutely sure server-side Blazor isn't any worse,
it just wasn't the right fit for what I tried to accomplish, so
I didn't play with it yet.
   
Let me list a few things about Blazor that impressed me the most:
* Its UI component model is a copycat of React tuned for .NET world.
  If you know React, you'll learn Blazor quite quickly - basically,
  there is 1-1 mapping for almost any concept you know.
* React-style component model is conceptually the best option 
  available for UIs nowadays.
* Blazor is *extremely compatible* with `netstandard2.1` targets.
  For example, I totally didn't expect that a 
  [code like this](https://github.com/ActualLab/Fusion/blob/master/src/%3Aactuallab_fusion/Async/TaskSource.cs#L89)
  is going to run on Blazor without any modifications. For the sake of
  clarity, it compiles a runtime-generated lambda expression
  that doesn't even pass validation if constructed as usual, 
  because it writes a private readonly field of `TaskCompletionSource`.
* I started to work with it while it was still in preview.
  No bugs or weird issues spotted - neither before the release nor after.
* Yes, the speed isn't on par with .NET Core - not on par at all, because
  currently the MSIL is interpreted there rather than JITted. But:
  * So far it even this level of performance was more than enough for me -
    and this is impressive, taking into account the amount of logic
    running on Fusion client (it's ~ exactly the same logic that is
    running on server, i.e. all these runtime-generated proxies, 
    argument capturing, caching, etc.)
  * The option to use Server-Side Blazor is super valuable as well -
    likely, this is going to be the primary option for the next year.
    And do you know that Fusion allows you to target both modes 
    with just a tiny bit of extra work? Check out its Blazor samples,
    the index page allows you to switch between these two modes.
  * Finally, AOT compilation for Blazor is expected somewhere in 
    ~ 1 year timeframe, which should make Blazor WebAssembly much more
    attractive.
  
Besides that, I think Blazor is a very good long-term bet - 
especially for the companies running their server-side code on .NET Core (or .NET).
* WASM is young, and it is improving pretty rapidly - e.g. recently it got threads.
  You won't get threads in JavaScript - ever (workers don't count - they are 
  much more like processes rather than threads). And even this single thing
  can make 20x performance difference in a world where 20+ core CPUs are getting 
  mainstream.
* JavaScript nowadays is more a VM rather than a real language you want to use.
  The real language you use is either TypeScript or one of its brothers designed
  to address all the painful problems of JavaScript. And it becomes more and
  more pointless to compile something to JavaScript assuming you can also
  compile it to WebAssembly. So why do you even want to bet on a tech like
  TypeScript, if the long-term future of a codebase written on it is actually
  under big question? I.e. not that it won't work, but what's the point to delay
  switching to something else assuming it's not going to be the best choice in 
  future?      

### Next Steps

* Check out the [Tutorial] or go to [Documentation Home]
* Join [Fusion Place] to ask questions and track project updates.


[Compute Services]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartF.md
[Compute Service]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartF.md
[`IComputed<T>`]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartR.md
[Computed Value]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartR.md
[Live State]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartB.md
[Replica Services]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/PartC.md

[Documentation Home]: README.md
[Q/A]: QA.md
[Samples]: https://github.com/ActualLab/Fusion.Samples
[Tutorial]: https://github.com/ActualLab/Fusion.Samples/blob/master/docs/tutorial/README.md
[Fusion In Simple Terms]: https://medium.com/@alexyakunin/stl-fusion-in-simple-terms-65b1975967ab?source=friends_link&sk=04e73e75a52768cf7c3330744a9b1e38

[Fusion Place]: https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo
