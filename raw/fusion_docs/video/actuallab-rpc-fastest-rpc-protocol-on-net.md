## ActualLab.Rpc - the fastest RPC protocol on .NET

<a href="https://www.youtube.com/watch?v=vwm1l8eevak">
    <img src="https://img.youtube.com/vi/vwm1l8eevak/maxresdefault.jpg" 
        alt="Watch the video"
        style="border: 1px solid #000; border-radius: 8px; max-height: 15em; height: auto;">
</a>

## Table of Contents

- Introduction and Background ([0:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=0s))
- What is Fusion ([1:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=66s))
- History with HTTP ([1:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=117s))
- Problems with HTTP ([2:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=124s))
- Building Own Protocol ([4:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=252s))
- ActualLab RPC Features ([5:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=354s))
- Performance Highlights ([10:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=601s))
- Benchmarks ([18:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=1091s))
- Comparison with Other Protocols ([22:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1328s))
- Demo ([39:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=2343s))
- Code Explanation ([42:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2568s))
- Mesh Demo ([55:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=3359s))
- Conclusion ([1:02:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=3753s))

## Transcript

[00:00:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=0s)
so a little bit more on uh like who am

[00:00:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=7s)
I um you can find me on medium I uh

[00:00:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=13s)
wrote uh a number of posts related to Performance these are some of the uh

[00:00:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=19s)
kind of uh more uh interesting ones uh

[00:00:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=25s)
then um I'm also the creator of uh actual

[00:00:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=32s)
chat uh you can try the app and uh um my

[00:00:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=37s)
like previous talk on Fusion was uh covering a decent amount of code from

[00:00:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=43s)
actual chat so um I definitely recommend you to play with it to see uh the

[00:00:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=51s)
Technologies we are going to talk about in this talk yeah that's a screenshot okay and

[00:00:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=59s)
but like ultimately it's uh about fusion and its RPC protocol which you can use

[00:01:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=66s)
independently uh from Fusion so you don't need Fusion to use actual La

[00:01:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=72s)
RPC uh so just a kind of reminder right what Fusion is it's a distributed uh

[00:01:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=81s)
realtime State Management abstraction that's like extremely powerful by itself

[00:01:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=86s)
but like this it's distributed part is powered by uh the protocol that uh well

[00:01:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=96s)
uh is built in particular to address some of the problems uh other or like

[00:01:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=104s)
more let's say standard protocols uh don't address or like can't address well

[00:01:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=111s)
and here I'm going to talk mostly like like right now at least uh I'm I'm going

[00:01:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=117s)
to explain why so uh yeah

[00:02:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=124s)
that's so a bit of a history uh a long time ago like one year ago

[00:02:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=131s)
actually a little bit more than one year ago uh Fusion was relying on

[00:02:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=138s)
HTTP and U HTTP works like this right you have a client uh which um well sorry

[00:02:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=148s)
when it has to get some date from the server it sends the call it's like one

[00:02:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=154s)
message right and gets the response back uh so all of his stuff HTTP is a text

[00:02:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=160s)
based protocol on top of TCP IP and um

[00:02:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=165s)
uh that's near it so uh for Fusion to so to make it work for

[00:02:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=173s)
Fusion uh well I built kind of extension to this prodoc

[00:03:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=180s)
on top of this protocol uh basically when Fusion uh

[00:03:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=185s)
sends the call it sends a special header um and uh when a web server

[00:03:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=195s)
replies it responds with another header if it sees this one and basically the

[00:03:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=202s)
value it gets in this header uh allows uh or like uh it's

[00:03:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=210s)
basically the ID of um publication uh on

[00:03:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=216s)
the server side and if you watch messages uh on the Web soet Channel basically you can think of it as a site

[00:03:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=222s)
channel for inv validations right and so sorry Fusion watches for these messages

[00:03:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=228s)
so basically it kind of establishes this channel in background and watches for

[00:03:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=234s)
the messages there and like uh the computed values it creat

[00:04:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=240s)
on the client it also invalidates them when it sees the invalidation message here right um so uh well I mean all of

[00:04:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=252s)
this uh seems pretty weird if you don't know like much about Fusion but

[00:04:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=258s)
nevertheless like if you know about Fusion then this uh is like

[00:04:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=264s)
uh how to say well basically all of this is very logical right

[00:04:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=270s)
it needs one other message to indicate that certain value is kind of expired or

[00:04:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=275s)
stale or invalidated and that's how it gets this message now uh yeah and uh I guess uh

[00:04:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=286s)
why well um what else this protocol allows is well I mean if your client is smart

[00:04:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=293s)
and it knows that like when you send certain requests like for example first

[00:04:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=299s)
time you send the request for Session One get user and gets the data right and

[00:05:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=304s)
invalidation message for it didn't came through yet or like it just wasn't invalidated then when you send the same

[00:05:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=311s)
or like when the client gets a request to execute the same call for the second time and it knows for sure that it's the

[00:05:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=318s)
same value right the one you got because invalidation message didn't came and it

[00:05:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=324s)
returns it so that's like uh like what kind of fusion does in general and uh

[00:05:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=332s)
it's uh like one of its key features it eliminates like tons of calls it's it's about networking calls it's about remote

[00:05:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=339s)
computation or like local computations does it in the same way like like nearly like is described here

[00:05:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=345s)
right um so uh and yeah that's uh how like Call of f

[00:05:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=354s)
actually looks in terms of what it adds to the protocol so

[00:06:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=360s)
basically um uh response has some extra headers

[00:06:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=367s)
request has some extra headers but what I want you to pay attention to is the

[00:06:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=372s)
amount of data transferred here well or like I think there was a bunch of

[00:06:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=379s)
problems actually with the specific implementation I think first is that like uh well so we were using all this

[00:06:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=387s)
in actual chat and the amount of traffic you get uh if you use HTTP it's

[00:06:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=394s)
like it's way higher than we want to be want to have so uh ideally you want to

[00:06:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=402s)
use more compact protocol right then uh the second piece is like

[00:06:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=409s)
this stuff with uh site websocket Channel and like primary sort of

[00:06:55](https://www.youtube.com/watch?v=vwm1l8eevak&t=415s)
Communication channel it was extremely

[00:07:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=420s)
difficult to kind of make it work right in sense that like imagine a mobile app

[00:07:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=426s)
right and you are in the car and disconnect happens like each and every

[00:07:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=432s)
time so for HTTP uh like you send a message and it's

[00:07:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=438s)
like if you know how uh HTTP works and like you get a time out uh you may get

[00:07:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=444s)
that time out way after uh like you send the call right so basically at some

[00:07:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=449s)
point it detects that like okay you are disconnected but it's not immediate

[00:07:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=455s)
right then like it's different with your websocket Channel with your regular

[00:07:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=460s)
messages so basically it's Ms and uh um I think that was like ultimately the

[00:07:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=467s)
main reason to build uh like our own protocol for um um well communication uh

[00:07:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=476s)
which is extendable enough to support this uh kind of um 1 plus two transmission model that

[00:08:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=485s)
Fusion needs so that that's one of slides from

[00:08:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=493s)
my old presentation about Fusion basically it Compares like kind of

[00:08:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=501s)
like um not quite Compares but mentions that uh I long time ago I wanted to uh

[00:08:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=511s)
Implement more efficient protocol for Fusion specifically uh but like so the kind of

[00:08:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=521s)
um the special ability that Fusion has is eliminates Network calls right and

[00:08:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=529s)
like no other protocol has it so that's why I think uh Fusion was kind of more

[00:08:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=537s)
interesting choice than for example grpc even before all of that but like so all

[00:09:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=544s)
of this changed nearly year ago and uh yeah I'm that's just kind of

[00:09:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=552s)
uh uh to you probably already understand how it works uh with Fusion uh so it

[00:09:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=560s)
yeah sends request gets response and maybe maybe at some point later gets an

[00:09:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=567s)
invalidation or doesn't um and it also supports uh like cing uh

[00:09:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=574s)
like with you can think of this scheme as EAC scheme but like it implements it

[00:09:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=581s)
for like any calls you make so um yeah

[00:09:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=586s)
back to kind of now and um we already so

[00:09:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=591s)
we have this uh protocol action lab RPC which is incredibly fast

[00:10:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=601s)
and here is like uh well here are some

[00:10:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=606s)
highlights uh so first of all in terms of calls well per single core uh your server can

[00:10:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=616s)
process around 300 uh 50 uh th000 calls per second per

[00:10:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=627s)
core uh it's an extremely high number if you look uh for example at like

[00:10:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=635s)
well-known grpc benchmarks uh you will notice that uh you see the same number

[00:10:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=642s)
but for maybe four course uh for streaming yeah it supports

[00:10:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=649s)
streaming uh it's about 5 million items per second and that's completely crazy

[00:10:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=656s)
number because like normally you need well I'll show you soon like how big

[00:11:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=665s)
these numbers are actually compared to other uh protocols so how large these

[00:11:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=672s)
numbers um and besides that it's also extremely convenient if you use it on

[00:11:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=679s)
net and by the way it doesn't work anywhere else so it's if you are building everything on net and your

[00:11:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=685s)
client is on net or like your cluster of servers is all on net and that's uh like

[00:11:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=691s)
an extremely uh basically good Feit but otherwise like you well I no one

[00:11:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=698s)
prevents you from using other protocols it's just like this thing works only on

[00:11:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=703s)
that net so um it's extremely convenient

[00:11:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=711s)
basically all you need to use it is a shared interface between client and server uh you don't need to put any

[00:12:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=720s)
attributes or like whatever uh and uh

[00:12:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=725s)
um all you need is to uh like properly register the client or the servers it's

[00:12:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=732s)
about Service registration it supports streams uh I mentioned it already uh

[00:12:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=738s)
moreover like it supports streams better than anyone else it can I mean you can

[00:12:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=744s)
send streams uh with items containing streams and uh uh like can send them as

[00:12:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=751s)
arguments to calls as part of arguments to certain calls as part of results and

[00:12:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=757s)
so so on so basically it's like a fully native citizen there or a fully native

[00:12:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=763s)
data type uh there well it also supports um oneway

[00:12:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=771s)
calls these are the calls you sent and don't expect the don't expect to get the

[00:12:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=776s)
result back and it's not going to be sent so it's like no response calls or like

[00:13:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=782s)
uh they're called RPC no weight calls in RPC

[00:13:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=788s)
it's and it's interesting that like in reality these calls are used by the

[00:13:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=794s)
protocol to deliver back the results and so basically all the system level stuff that happens it's kind of powered by

[00:13:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=801s)
these calls uh there is a system service that runs on like one kind of I mean

[00:13:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=808s)
available as a server on the client and on the server site and basically uh

[00:13:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=813s)
regular calls happen because these two things they exchange with system messages which are oneway

[00:13:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=820s)
calls okay and uh one interesting thing is that the protocol is fully

[00:13:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=826s)
bidirectional which means that the um the server can call the client one once

[00:13:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=833s)
it connects so it's not like just the client can call the server you can do the opposite as well

[00:14:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=840s)
um and uh it also supports extremely flexible routing in sense that when you

[00:14:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=847s)
send the call the destination I mean the server that will process the call it's

[00:14:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=854s)
determined uh not like in advance but right when you send the call so

[00:14:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=860s)
basically um a single like client can route calls to like hundreds of servers

[00:14:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=868s)
and uh all of this happens transparently finally so uh

[00:14:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=876s)
unsurprisingly it uses the fastest serializers available on net um memory P

[00:14:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=883s)
message pack and uh yeah custom serializers are also supported Json of

[00:14:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=891s)
course as well uh and it's aot friendly

[00:14:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=897s)
uh which means uh well I mean you can use it on

[00:15:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=905s)
uh you can use it uh in Maui you can use it well literally anywhere where you

[00:15:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=912s)
probably don't want to run uh full blown. net um there is a bunch of interesting

[00:15:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=919s)
features for example transparent reconnection uh it's like uh I mean typically right

[00:15:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=926s)
if the server is unavailable then like call will fail so with RPC it's never

[00:15:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=932s)
like this uh the call Will Fail only when you cancel it explicitly by

[00:15:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=937s)
canceling the cancellation token so at least that's what happens by default you can overwrite this for certain calls and

[00:15:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=942s)
stuff like this but by default it doesn't cancel any calls and like it basically will be trying to send it and

[00:15:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=948s)
process it until the moment you cancel it uh so once connection so if you are

[00:15:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=954s)
not connected right now then the call is going to kind of it's going to

[00:16:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=960s)
be running let's say so the whoever sent it is not going to get the result until

[00:16:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=967s)
the connection is established and like the call is executed and the result

[00:16:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=972s)
comes through back okay and um overall this is an

[00:16:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=979s)
extremely good I mean this this alone is like a solution to so many problems um

[00:16:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=986s)
um you basically don't need to care of uh this reconnection thing uh and or

[00:16:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=993s)
like you you don't need to worry about broken connections and stuff like this so This the processing of all of this

[00:16:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=1000s)
stuff is kind of baked into the uh client and the protocol uh and it runs on top of web

[00:16:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=1008s)
sockets okay so uh yeah how efficient

[00:16:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=1013s)
this thing is and uh this is the I think what you need to pay attention

[00:16:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1019s)
here is um this part the yellow kind of bucket

[00:17:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=1027s)
of numbers you see that probably it's like 2 kilobytes or so right for a

[00:17:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=1033s)
pretty tiny number of calls and if we look at uh similar kind of scenario here

[00:17:23](https://www.youtube.com/watch?v=vwm1l8eevak&t=1043s)
it also sends I think I don't know like five or six calls and uh so first two

[00:17:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=1049s)
are uh handshakes so it's like it happens just once but the rest I think

[00:17:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=1055s)
it's um how much well my guess is like uh 400 bytes right five time five times

[00:17:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=1063s)
less that's nearly the same set of data is transmitted and so it's basically way

[00:17:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=1069s)
more efficient than HTTP of course and uh interestingly that like yeah if we

[00:17:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=1076s)
turn on other Fusion features like local caching then it's going to be even well in terms of data more but in terms of

[00:18:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=1083s)
number of Transmissions like all the calls are sent single packet and you get a single response pack so it's it's

[00:18:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=1091s)
extremely efficient okay now we are going to benchmarks and uh let's uh remember a

[00:18:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=1100s)
single number 120,000 call per

[00:18:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=1106s)
second um any this instance or like at least um okay like default uh Docker

[00:18:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=1117s)
container for redus has radius Benchmark tool which uh can Benchmark redus so

[00:18:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=1123s)
that's the number of calls uh radius instance can process per second on my

[00:18:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=1129s)
machine it's unconstrained right and like basically um it sends them in parallel

[00:18:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=1136s)
and stuff like this and so that's the number of calls that's kind

[00:19:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=1143s)
of uh presumed to be normal for high performance service right okay now I'm

[00:19:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=1152s)
well uh now I'm going to uh run RPC

[00:19:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=1159s)
Benchmark and that's a benchmark that like sorry you can run it uh on your own

[00:19:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=1167s)
R uh I I'll run it's doed version oh let's run it for calls

[00:19:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=1178s)
right uh so it's going to um well oh okay cool it's already built in my

[00:19:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=1186s)
case um so what's interesting here um

[00:19:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=1192s)
the server in this Benchmark is constrained to four course and you can

[00:19:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1199s)
compare uh some results from this Benchmark with uh grpc Benchmark uh I

[00:20:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=1207s)
think there is one um I so I'll add the link in the end but uh one of tests here

[00:20:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=1216s)
is directly comparable uh with grpc Benchmark um and uh but what also worth

[00:20:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=1225s)
mentioning is that uh well it actually benchmarks JPC

[00:20:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=1230s)
on.net and so this thing is capable of benchmarking nearly every at least kind

[00:20:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=1237s)
of every well-known RPC protocol onnet so right now it runs kind of a

[00:20:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=1246s)
little bit uh slower than it's supposed to run uh because well of this video

[00:20:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=1253s)
recording and like processing uh so uh

[00:20:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1259s)
um uh it's not exactly the result uh that you uh or that's kind of the best

[00:21:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=1267s)
on my machine but nevertheless um so instead of like

[00:21:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=1274s)
waiting here I guess I'll run a video with uh all of these benchmarks

[00:21:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=1285s)
recorded uh yeah uh I think the speed up is like 30X or 20x

[00:21:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=1294s)
here and that's basically it shows uh what you are supposed to see if you run

[00:21:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=1301s)
these benchmarks locally so sorry some are in Docker some

[00:21:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=1308s)
are just uh running locally uh so the docker version is

[00:21:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=1314s)
constrained to four course remember this okay so that's uh like what you are

[00:22:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=1320s)
supposed to see but um with uh decent speed up yeah so

[00:22:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1328s)
um I'm not going to wait till the very end here I I'll just show later that these numbers are nearly the same in my

[00:22:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=1336s)
slides um okay so let's get back to um

[00:22:23](https://www.youtube.com/watch?v=vwm1l8eevak&t=1343s)
well two slides right so remember right already

[00:22:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=1349s)
is 120,000 calls per second so what

[00:22:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=1354s)
actual RPC does with for core server it's around

[00:22:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=1361s)
well 1 million to 15,000 calls per second I think the most

[00:22:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=1369s)
recent version even does a little bit more uh and uh by the way uh speaking of

[00:22:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=1376s)
the call you can compare with other benchmarks so say hello scenario is the

[00:23:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=1382s)
one you can compare with grpc Benchmark on like every I mean there is an

[00:23:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=1389s)
implementation of basically this thing for every platform and you can directly compare uh the results here but overall

[00:23:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=1396s)
actual op RPC is like two to maybe 4X faster than

[00:23:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=1402s)
grpc uh on calls and uh probably like again well it's uh I don't know 1.5 to

[00:23:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=1410s)
2x faster than signal r as for streams

[00:23:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=1416s)
uh uh the difference is even bigger um I think it's 3x faster than

[00:23:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=1425s)
grpc uh on streams with short like with small items and uh well I mean why small

[00:23:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=1434s)
items and why it's important is well we measure

[00:23:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1439s)
the extra expenses uh that framework adds right or like Library ODS uh so the

[00:24:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=1446s)
smaller is the item the more kind of complex is the scenario it basically highlights the cost of uh kind of

[00:24:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=1453s)
processing the stream item by the library so that's why so stream one is

[00:24:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=1459s)
like I think extremely short items probably I mean the array they sent is

[00:24:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=1465s)
one by array but the item itself so basically there is some Envelope as well but it's small and stream 100 is uh 100

[00:24:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=1473s)
byte items uh so but even on 100 byte items

[00:24:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=1478s)
the difference is pretty huge with grpc and again that's uh on Docker so it's

[00:24:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=1485s)
like a server constraint to to for course that's how much it can

[00:24:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=1492s)
process now if we uh run the same tests uh just uh

[00:24:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1499s)
without Docker and unconstrained and uh on um my machine which is uh Ryon well

[00:25:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1508s)
this Ryon uh so for calls and remember the

[00:25:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=1514s)
client and server uh both are running on these machines so it's like nearly um I

[00:25:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=1520s)
mean you can get twice of that if you run just server so it's uh I think uh

[00:25:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=1527s)
6.5 million calls currently at Peak for uh

[00:25:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=1533s)
the kind of small calls and um uh as for

[00:25:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=1539s)
the larger ones uh well it's still basically um about 4 million calls and

[00:25:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=1546s)
yeah this result here it's an exception basically there is a lck contention in

[00:25:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=1551s)
concurrent que uh with memory pack but uh there's no such problem with message

[00:25:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=1557s)
PS it's basically like I think they hit some weird scenario where for the

[00:26:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=1563s)
specific payload serialization is much slower somehow but yeah so it's not

[00:26:10](https://www.youtube.com/watch?v=vwm1l8eevak&t=1570s)
related to uh RPC protocol it's related to memory pack and like ultimately

[00:26:17](https://www.youtube.com/watch?v=vwm1l8eevak&t=1577s)
concurrent Q on that net and uh here is the chart for

[00:26:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=1584s)
streaming so uh as you can see the

[00:26:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=1590s)
server here sends uh I think um about 70 million calls per

[00:26:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=1600s)
second I mean server plus client on the same machine so why it's

[00:26:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=1607s)
fast uh well I think the key piece is automatic batching and it's also based

[00:26:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=1616s)
on uh the fact it uses a Channel of RPC

[00:27:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=1621s)
messages basically a lowlevel obstruction that kind of um sends and

[00:27:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1628s)
receives call is channel of RPC messages and channels are extremely efficient and

[00:27:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=1635s)
Powerful think on net if you never used them then you should learn about them but like basically they allow you to

[00:27:23](https://www.youtube.com/watch?v=vwm1l8eevak&t=1643s)
create really nice pipelines so uh automatic batching is uh

[00:27:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=1651s)
basically a piece of code that awaits new messages on a channel and

[00:27:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=1660s)
uh while it can get these messages synchronously it packs it it packs them

[00:27:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=1666s)
into a single uh networking bucket and um uh more like when it hits

[00:27:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=1674s)
a certain size threshold but uh like this this piece is even customizable

[00:28:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=1680s)
actually um and uh why this thing is important is like well the less weights

[00:28:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=1687s)
you have the more efficient your pipeline is so like basically the more you can pack

[00:28:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=1695s)
into a single pocket the better it's not better just in terms of networking but

[00:28:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=1701s)
like also in terms of uh the extras you kind of spend on the receiving gun

[00:28:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=1709s)
right um there is also one nice unification everything that like the

[00:28:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=1716s)
protocol can actually deal with is a call just uh well some calls I uh oneway

[00:28:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=1724s)
calls they don't require a response and that's how RPC sends a response to

[00:28:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=1731s)
regular calls like basically you send it sends a call uh to One Direction and

[00:28:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=1736s)
gets back a message called like system. okay I mean that's the name of the method or system. error uh which

[00:29:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=1744s)
delivers the result of this call so uh the unification of course helps to

[00:29:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=1752s)
build a simpler pipeline uh and instead of like dealing with I don't know like tons of different

[00:29:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=1759s)
messages um it has just one uh so that's why it's kind of cool

[00:29:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=1766s)
piece um and U one other important thing is that

[00:29:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=1774s)
like yeah it uses the fastest serializers available

[00:29:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=1780s)
onnet all thanks to uh yesui Kawai if you don't know who is this guy well you

[00:29:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=1787s)
definitely should U read about uh well

[00:29:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=1793s)
both these two serializers and the person but it's it it's interesting that

[00:29:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=1799s)
like two fastest binary serializers on net are implemented by same

[00:30:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=1805s)
person um so uh yeah besides that there

[00:30:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=1812s)
is a fancy argument list type which is basically a type that efficiently wraps

[00:30:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=1820s)
uh method call arguments without boxing uh or like with just one allocation so

[00:30:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=1826s)
it's like uh for example if you look at how signal are or like other RPC libraries process something similar they

[00:30:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=1834s)
allocate every I mean they box every argument and the argument list is exactly what uh kind of allows

[00:30:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=1842s)
to uh skip on boxing um there are special Parts eliminating

[00:30:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=1849s)
some uh memory copies uh in case uh the amount of data to copy is relatively

[00:30:55](https://www.youtube.com/watch?v=vwm1l8eevak&t=1855s)
large and uh even some like really kind

[00:31:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=1861s)
of lowlevel optimizations on the protocol or like sorry on serialization

[00:31:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=1868s)
format um level you you can optionally turn them on and for example it can send

[00:31:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=1875s)
uh method name hashes instead of method names and it kind of seems stupid because you can get hash collisions

[00:31:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=1882s)
right but like in reality the chance of collision is well just like 100 of a

[00:31:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=1888s)
percent so it's like one per 10,000 um if you have thousand methods

[00:31:34](https://www.youtube.com/watch?v=vwm1l8eevak&t=1894s)
so it's very low and it makes sense to use it if you actually need the peak for

[00:31:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=1901s)
output right and finally finally the last piece is uh

[00:31:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=1907s)
well the proxies that actual La RPC uses

[00:31:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=1913s)
interestingly the uh proxy generator and the proxy code that is used by actual

[00:32:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=1921s)
lab RPC is the same these are the same proxies as Fusion uses which means that

[00:32:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=1927s)
these proxies are generic generic in sense that like they can intercept any

[00:32:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=1933s)
calls it's basically like they are generated once and you can reconfigure

[00:32:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=1939s)
them to do different kind of processing dependently on what kind of Interceptor

[00:32:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=1944s)
you plug in it's kind of similar to Castle dynamic proxy but the difference

[00:32:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=1950s)
is that well first of all it's two it's 2x faster because the number of

[00:32:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=1955s)
allocations is way way lower here and I I'll show you that and uh

[00:32:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=1963s)
it's like literally a single allocation for intercepted call and the second

[00:32:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=1968s)
piece is that these proxies are generated in compile time not in the run

[00:32:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=1974s)
run time and because of that it's aot friendly

[00:33:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=1980s)
uh so and yeah there are some other optimizations like for example this

[00:33:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=1985s)
argument list type has special parts for cancellation token access um and like

[00:33:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=1991s)
special because otherwise there would be a virtual generic call or boxing so um

[00:33:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=1999s)
yeah uh so there is a decent number of such uh optimizations that kind of um

[00:33:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=2007s)
eliminate the most uh kind of frequent um wastes let's

[00:33:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=2015s)
say okay uh let me show you the proxy quote right and uh that's a benchmark

[00:33:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=2023s)
you can find it in Fusion repository probably wouldn't so basically it's like one of tests in Fusion repository but

[00:33:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=2030s)
you can see that like what's interesting here is that for example for this call right first of all uh well

[00:33:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=2039s)
um actual La do interception Interceptor or like proxies they uh process uh these

[00:34:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=2049s)
SKS 2x faster than CLE Dynamic proxy so 2x plus I would say but another

[00:34:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=2058s)
interesting piece is that like they allocate just 32 bytes per call well

[00:34:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=2064s)
this this is literally like an object header 16 bytes on 64bit platform plus like 16 more bytes

[00:34:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=2072s)
that's probably for the arguments here right and that's literally it and um as for

[00:34:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=2079s)
Castle Dynamic proxy as I said like basically it boxes every argument that's why there is way more of like way more

[00:34:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2088s)
sorry way more data is allocated on the Heap I think in this case it should be

[00:34:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2094s)
at least four allocations per call okay and uh yeah so you can I guess walk

[00:35:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=2102s)
through uh like you can do this I mean

[00:35:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=2107s)
you can put a break point uh into I think every call chain involving Fusion

[00:35:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=2114s)
or RPC and you will see something like this here at some point you will see the

[00:35:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=2120s)
interceptors on the call stack and the proxy on the call stack so and I

[00:35:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=2128s)
I'm let me quickly show you a proxy code here like why it basically explains why

[00:35:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=2135s)
it's so efficient so this first part uh happens just once because of these uh

[00:35:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=2141s)
two question marks equals and like what happens here is it cat the delegate that

[00:35:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2148s)
uh may call the base method or like the actual proxy Target it has to be here

[00:35:55](https://www.youtube.com/watch?v=vwm1l8eevak&t=2155s)
because if it calls the base method like literally has to be here right you can't kind of call base from base method from

[00:36:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=2163s)
the random spot but like so this piece happens just on the first call uh as for

[00:36:10](https://www.youtube.com/watch?v=vwm1l8eevak&t=2170s)
the rest um so I zoom out a little bit but as for the rest like what happens is

[00:36:17](https://www.youtube.com/watch?v=vwm1l8eevak&t=2177s)
it Con constructs invocation which is a struct here there is a single allocation

[00:36:23](https://www.youtube.com/watch?v=vwm1l8eevak&t=2183s)
that's kind of that actually happens and um yeah passes intercepted delegator so

[00:36:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=2191s)
that you can call like your Interceptor can call Base method basically the method that is intercepted right and uh

[00:36:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=2200s)
uses this weird thing to actually invoke an Interceptor the reason why it uses

[00:36:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=2207s)
this weird thing is that like so in reality in

[00:36:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=2212s)
reality uh it calls this method with

[00:36:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=2219s)
um well the sorry so it calls C intercepted one here right and if you

[00:37:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=2226s)
look at what cach intercepted one it's an Interceptor do intercept method but

[00:37:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=2232s)
uh with uh parameterized with this generic parameter so basically like it

[00:37:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=2239s)
Cates the uh you may think of this is as it it Cates the delegate that points to

[00:37:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=2246s)
uh um an instance of generic method with specific parameters like the return type

[00:37:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2253s)
here um so and yeah that that also allows you

[00:37:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=2259s)
allows this thing to kind of get rid of some allocations uh so that's nearly how it

[00:37:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=2267s)
works oh and yeah the other interesting part is that it generates kind of module

[00:37:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2274s)
initializer for every uh proxy which does in reality it does

[00:38:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=2282s)
nothing because like this method it actually doesn't call this thing but

[00:38:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=2288s)
nevertheless the compiler uh thinks that all these methods are invoked and basically this is something that allows

[00:38:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=2295s)
you to um well first of all it uh kind of marks

[00:38:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=2301s)
everything that's supposed to be used by aot but also it allows you to kind of extend this thing uh because uh uh

[00:38:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=2310s)
well some types that are used here are interfaces and if you implement them

[00:38:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=2317s)
like it's going to think that like okay every implementation with uh like uh

[00:38:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=2324s)
every implementation of uh the interface is supposed to be used with like certain

[00:38:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=2330s)
method parameters and methods so that's why uh that's what uh kind of makes this

[00:38:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=2337s)
thing aot friendly as

[00:39:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=2343s)
well well and yeah finally I think like it caches nearly everything that's

[00:39:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=2349s)
possible to cach uh so that when it processes uh the call both on sending

[00:39:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=2356s)
site or on receiving site it doesn't do

[00:39:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=2361s)
any work that actually shouldn't be done

[00:39:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=2367s)
okay now it's a demo time and U that's

[00:39:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2373s)
uh going to be the very first demo here or maybe I'll start from uh well more

[00:39:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=2381s)
visually attractive one it's one of fusion demos but I think

[00:39:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=2386s)
the interesting part here is this one so it's um basically it uses RPC streaming

[00:39:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=2393s)
so Fusion is not used here or at least like it like this part shows just the RPC piece

[00:40:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=2402s)
and yeah it shows that like it basically can send uh well a stream of images with

[00:40:10](https://www.youtube.com/watch?v=vwm1l8eevak&t=2410s)
uh well nearly the origin FPS um and yeah it's web

[00:40:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=2419s)
assembly okay uh nevertheless Let's uh let's uh [Music]

[00:40:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=2426s)
run uh the sample that

[00:40:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2433s)
uh actually shows the RPC in

[00:40:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=2445s)
action I'll close well but we can leave it uh so if you saw my previous video

[00:40:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2454s)
you already saw this sample but I didn't show this part right uh so this part

[00:41:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=2460s)
shows just the RPC uh uh calls and uh

[00:41:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=2467s)
you can see that if you refresh the page and like basically it's stream of rows

[00:41:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=2474s)
with stream of items you can switch it to server by the way so there is no any

[00:41:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=2479s)
RPC it just shows that okay these streams also work locally I think the only thing that doesn't work is like

[00:41:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=2485s)
this pink p with uh oneway calls uh

[00:41:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=2491s)
so okay so let's uh let me show you a couple things here

[00:41:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=2500s)
first uh what happens over the network right in this

[00:41:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=2507s)
case so you can see that it sends uh actually like pretty big messages

[00:41:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2514s)
sometimes uh which Buck a a bunch of calls and uh uh so streaming is

[00:42:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=2521s)
extremely efficient it's uh yeah it tries to p as many stream items into a

[00:42:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=2527s)
single batch and like multiple uh sorry items from multiple streams into a

[00:42:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=2532s)
single uh Network transmission so uh in terms of traffic it's uh extremely

[00:42:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=2539s)
efficient the like uh I think the only why I can scroll so that what's

[00:42:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=2545s)
happening right now is is like this ping pong stuff and these are uni dire sorry

[00:42:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2553s)
oneway calls and basically like 32 bytes and 42 bytes response I think most of

[00:42:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=2560s)
this stuff is like at least large part of this stuff is the message itself okay so let's look at the code I

[00:42:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2568s)
guess right and see

[00:42:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2574s)
so yeah so that's let's start from the

[00:42:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=2579s)
client um so I think everything that happens here

[00:43:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=2586s)
happens in initializing oh by the way let me show you one other thing so

[00:43:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=2593s)
we so it's interesting right how it's going to behave if

[00:43:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=2598s)
we uh shut down the server right now and we'll go to the same page right so I

[00:43:25](https://www.youtube.com/watch?v=vwm1l8eevak&t=2605s)
stop the server

[00:43:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=2610s)
um so you know that this stuff works even if you are disconnected kind of

[00:43:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=2616s)
works renders stuff because I mean I can uh yeah uh

[00:43:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=2622s)
still uh kind of scroll through these Pages even if you are disconnected because there is an offline cach but

[00:43:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=2631s)
like if we go here it doesn't show anything right and like reconnecting so

[00:43:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=2637s)
will it work if I'm going to start the server

[00:44:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=2646s)
right yeah I'm curious It's supposed to work so you see that like basically as

[00:44:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=2651s)
soon as it connected it like started to show the data and if you uh again stop

[00:44:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=2658s)
it then like okay it sends tries to send pinks but doesn't get pong back so

[00:44:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=2667s)
that's what happens uh let me kind of Click uh a

[00:44:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2673s)
bunch of times here to make this

[00:44:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=2679s)
counter uh count for at least like 30 seconds or

[00:44:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=2685s)
so okay so now it's going to take a while for it to reconnect so again I'm

[00:44:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=2692s)
running the server right now and let's

[00:44:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=2697s)
get to some other page you see that the counter is like the same but now if

[00:45:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=2705s)
yeah so it's not connected that's why basically it can like run the I mean the

[00:45:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=2713s)
all these calls in initializer sync they are waiting and if I click reconnect and

[00:45:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=2720s)
like things too spin okay so let let's look at the code here right

[00:45:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=2733s)
uh uh so um yeah we need this page to be

[00:45:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=2739s)
disposable that's like uh what you have to do if you of course

[00:45:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=2745s)
deal with streams and want to kind of shut them down gracefully uh so what we do here we send

[00:45:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2754s)
greet call and we send get table call and also start Ping

[00:46:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=2760s)
Pong task let's start from this thing right so greet is uh simple call

[00:46:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=2767s)
returning string yes string and if we go to the

[00:46:13](https://www.youtube.com/watch?v=vwm1l8eevak&t=2773s)
implementation then like that's the result it produces on the server side so

[00:46:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=2778s)
nothing fancy um once uh greeting task is completed it

[00:46:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=2787s)
says greeting right um uh it's interesting interesting well

[00:46:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=2795s)
I mean we could put something like uh state has changed here right but it

[00:46:41](https://www.youtube.com/watch?v=vwm1l8eevak&t=2801s)
waits for everything before like well uh rendering basically this thing but so

[00:46:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=2808s)
the point is then like it also sends get table call and uh ping pong task starts

[00:46:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=2814s)
ping pong task so let's look at get table a it returns table of in what is

[00:47:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=2821s)
table table is actually a table of T

[00:47:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=2826s)
here so uh it's an instance of generic type and um it has a title and RPC

[00:47:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=2835s)
stream of row of T right and row of T has an index and RPC stream of

[00:47:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=2842s)
items uh so as you might guess this thing can travel over the

[00:47:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=2851s)
um well RPC protocol and uh you can use it as part of other

[00:47:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=2858s)
objects uh and as part of arguments like

[00:47:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=2863s)
here and uh well deeply inside some other objects and like yeah you can send

[00:47:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=2869s)
items which stream items which contain other streams so uh

[00:48:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=2881s)
let's look on like so here we get table right and then

[00:48:10](https://www.youtube.com/watch?v=vwm1l8eevak&t=2890s)
create a model and also start read table method so what read table does it

[00:48:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=2896s)
literally iterates through its rows and uh like adds the

[00:48:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=2902s)
row then for every row it calls r r

[00:48:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=2907s)
and if you look at the redraw it's uh it's kind of even more interesting right it

[00:48:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=2916s)
basically iterates through items and uh puts them into the model but like in the

[00:48:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=2923s)
end it calls like when it basically gets uh the next item which calls update sum

[00:48:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=2931s)
and uh update some uh gets the roll

[00:48:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=2937s)
and uh creates an RPC stream out of its items and sends uh the call to some

[00:49:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=2944s)
method which gets this Stream So basically like the point is like this sample shows all kinds of streaming you

[00:49:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=2952s)
can get and finally the ping pong part it's um uh the unusual thing here is that

[00:49:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=2959s)
like the calls that it sends are oneway calls so that's why we

[00:49:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=2968s)
uh so this check it's just like it can't work of course if uh there is no RPC but

[00:49:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=2975s)
like we start send Pink's task here and uh then uh on the so there is a

[00:49:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=2985s)
like um so client side service is um basically the service that registers

[00:49:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=2991s)
calls to punks and it exposes these like results in punks

[00:49:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=2997s)
channel uh so but I think that's the only interesting part here it's uh if we

[00:50:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=3002s)
go to send pinks then like we get Pier uh so for oneway call you uh

[00:50:11](https://www.youtube.com/watch?v=vwm1l8eevak&t=3011s)
can um you have to pre-out most of them and that's why we get the peer and uh

[00:50:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=3021s)
uh oh no no no sorry uh you don't have to you uh like yeah you don't have to

[00:50:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=3029s)
but like if you for example respond to such calls on server site and you need to know the P that kind of send you the

[00:50:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=3037s)
uh ping to respond but here we just wait for like when it this spear gets

[00:50:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=3044s)
connected because like these calls they are kind of fire and forget and if you

[00:50:49](https://www.youtube.com/watch?v=vwm1l8eevak&t=3049s)
are not connected then it's just going to be kind of skipped so we

[00:50:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=3057s)
uh call this method in the end simple service the P pass a message and uh if

[00:51:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=3062s)
you look at the signature the important part here is that there is RPC no weight

[00:51:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=3068s)
um so basically it's it's a method that returns task of RPC no when you see such

[00:51:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=3075s)
method it indicates for RPC that it's a call that doesn't expect like you don't

[00:51:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=3081s)
have to send a response to such a call okay and uh that's that's why you alsoa

[00:51:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=3088s)
typically don't need to have a cancellation Tok in there just I mean like these calls they are sent like

[00:51:36](https://www.youtube.com/watch?v=vwm1l8eevak&t=3096s)
almost synchronously and so they enter that kind of send Channel like

[00:51:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=3103s)
synchronously so uh let's look at the server site

[00:51:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=3111s)
right so it's pretty easy we so get rows

[00:51:56](https://www.youtube.com/watch?v=vwm1l8eevak&t=3116s)
at I think it should uh return the sync enumerable of rows right and all we need

[00:52:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=3121s)
to do is to kind of re this rra this stuff into RPC stream to um make it work

[00:52:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=3129s)
so basically RPC stream is a wrapper over a sync inumerable the reason why

[00:52:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=3135s)
you can't pass just a sync inumerable like simply a sync inumerable is that for most of serializers there is no way

[00:52:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3142s)
to like override the serialization for this type but but there is an easy way

[00:52:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=3148s)
to override serialization for your custom type that's why there is a rer RPC stream well plus it actually

[00:52:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=3155s)
provides you with a few useful properties so for example this two uh period and

[00:52:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=3164s)
acknowledgement period and acknowledgement Advance it basically tells you have like you can customize it

[00:52:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=3170s)
on per stream basis okay so for streaming I think it's

[00:52:55](https://www.youtube.com/watch?v=vwm1l8eevak&t=3175s)
more or less clear right it's like you uh well you literally like deal almost

[00:53:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=3183s)
with the syn enumerables but the streams so one thing you need to remember is that like on the client side the stream

[00:53:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=3189s)
can be enumerated just once you can't enumerate it multiple times um okay so and for get rows so you

[00:53:17](https://www.youtube.com/watch?v=vwm1l8eevak&t=3197s)
basically you you see that like every time it needs to send a stream it constructs it from a syn numerable or

[00:53:24](https://www.youtube.com/watch?v=vwm1l8eevak&t=3204s)
regular en numerable okay and uh I think the only tricky part here is pink method

[00:53:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=3212s)
and it's like uh it has to respond with PK so the way it responds with PK to the

[00:53:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=3217s)
same P it uh gets the inbound RPC cont text and gets the peer here then it

[00:53:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=3225s)
creates outbound RPC context and activates it so inside this using block

[00:53:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=3230s)
basically the outbound RPC context is kind of pre-created and uh um so since it passes

[00:53:58](https://www.youtube.com/watch?v=vwm1l8eevak&t=3238s)
the pier there um by default so if you

[00:54:03](https://www.youtube.com/watch?v=vwm1l8eevak&t=3243s)
don't do that then RPC will use uh its

[00:54:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=3248s)
uh router to find the pier uh and that's what happens normally but in this case

[00:54:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=3256s)
we want to send a response to the same P that like got this call right I mean from

[00:54:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3262s)
which we got U we uh got here so that's why we kind of pre- Route the

[00:54:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=3270s)
call we are going to send and other than so other than that it's that's that's it

[00:54:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=3278s)
so okay um um yeah I'm not sure like I guess it's

[00:54:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=3284s)
more or less clear I think what I want to show is like you can use RPC without

[00:54:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=3290s)
Fusion all you need to do is nearly this

[00:54:58](https://www.youtube.com/watch?v=vwm1l8eevak&t=3298s)
so first you add RPC then you do this and so we don't of

[00:55:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=3308s)
course like we can't expose Fusion clients but like we can expose RPC clients so and in

[00:55:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=3316s)
this case so we literally like that's literally all you need to do to uh

[00:55:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3322s)
configure RPC on the client side you add RPC it is it's the same by the way on

[00:55:27](https://www.youtube.com/watch?v=vwm1l8eevak&t=3327s)
the server side as well and then you uh well

[00:55:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=3333s)
uh tell that you're going to use web soet client for this RPC protocol and

[00:55:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=3339s)
like you add the client for this service and basically that what uh that's what

[00:55:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=3346s)
ensures that you will be able to use it it's proxy in like you will be resolved

[00:55:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=3352s)
basically this service okay that's uh that's mostly it I

[00:55:59](https://www.youtube.com/watch?v=vwm1l8eevak&t=3359s)
think for the RPC did I change

[00:56:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=3366s)
something oh okay okay [Music]

[00:56:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=3374s)
um let me think about what else is like

[00:56:19](https://www.youtube.com/watch?v=vwm1l8eevak&t=3379s)
worth mentioning here oh uh the last part and I guess uh is

[00:56:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=3386s)
going to be the most weird one and also the fun one so there is a demo called

[00:56:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=3395s)
mesh C

[00:56:40](https://www.youtube.com/watch?v=vwm1l8eevak&t=3400s)
uh and uh it shows that like uh well let

[00:56:47](https://www.youtube.com/watch?v=vwm1l8eevak&t=3407s)
me find

[00:56:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=3413s)
onec helpers route callede so and

[00:57:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=3421s)
usages so um you can so RPC call router is a

[00:57:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=3429s)
delegate and you can register your custom one so default one routes every

[00:57:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=3435s)
call to the default Pier default client Pier but you can register your own call

[00:57:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3442s)
router and uh uh if you look at the code here here basically you will see that

[00:57:28](https://www.youtube.com/watch?v=vwm1l8eevak&t=3448s)
this method gets an RPC method def the method that's that was called on the

[00:57:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=3453s)
client and all of its arguments right and uh it needs to return uh PF in the

[00:57:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=3463s)
end this thing that's that's I think think of it as a URL but more

[00:57:50](https://www.youtube.com/watch?v=vwm1l8eevak&t=3470s)
flexible uh so basically it's like a custom URL with custom scheme something

[00:57:55](https://www.youtube.com/watch?v=vwm1l8eevak&t=3475s)
like this so you see that this thing basically gets the type of the first argument

[00:58:01](https://www.youtube.com/watch?v=vwm1l8eevak&t=3481s)
checks if it's host TR it's like if the first argument of a call is an exact

[00:58:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=3487s)
reference to specific cost then it's going to return a special ref that is a

[00:58:16](https://www.youtube.com/watch?v=vwm1l8eevak&t=3496s)
post ref uh I mean basically it will it will

[00:58:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3502s)
construct a reference to appear that is kind of associated with specific cost

[00:58:30](https://www.youtube.com/watch?v=vwm1l8eevak&t=3510s)
then there is a more complex thing that uh like if it sees a Shar ref then it

[00:58:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=3518s)
returns basically a ref to a sharp and the difference is that like I mean if

[00:58:43](https://www.youtube.com/watch?v=vwm1l8eevak&t=3523s)
you implement Dynamic sharding when poost join and like Lea shards right and

[00:58:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=3528s)
A Single Shard May resolve to one host first like at some point in time right

[00:58:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=3534s)
then to another host and so so on so uh basically it's a dynamic thing right and

[00:59:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=3540s)
that's why there is not PF that's more complex you by the way can see that they

[00:59:05](https://www.youtube.com/watch?v=vwm1l8eevak&t=3545s)
are implemented right here so as part of this demo they uh you basically can find

[00:59:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=3552s)
all the source code that you need so and anyway and let's say if it sees that the

[00:59:18](https://www.youtube.com/watch?v=vwm1l8eevak&t=3558s)
first argument is integer then like in reality it gets this integer construct a

[00:59:23](https://www.youtube.com/watch?v=vwm1l8eevak&t=3563s)
Shard reference to a shard that can be associated with this integer and so so

[00:59:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=3571s)
basically like it's fully Dynamic routing and

[00:59:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=3579s)
um let me find mesh RPC here

[00:59:46](https://www.youtube.com/watch?v=vwm1l8eevak&t=3586s)
right uh so when you run this sample that's it's and that's not it actually

[00:59:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=3593s)
so there is more here but so I'll pause it at some point and show you what's

[01:00:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=3600s)
going on so basically it simulates a situation when hosts are starting dying

[01:00:07](https://www.youtube.com/watch?v=vwm1l8eevak&t=3607s)
and uh join basically some map of sharts and so plus here indicates that like

[01:00:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=3614s)
this host with this name like virtual host but it's like real server here uh I

[01:00:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=3621s)
mean real as.net server uh with uh uh

[01:00:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=3626s)
actual La RPC uh so it took Shard number one three

[01:00:32](https://www.youtube.com/watch?v=vwm1l8eevak&t=3632s)
and like I don't know what this number is and the scheme changes right and so

[01:00:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=3638s)
what it does is like if you scroll here you will see that like it sends uh calls

[01:00:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=3645s)
to like basically so sorry so the service on each of these hosts it

[01:00:52](https://www.youtube.com/watch?v=vwm1l8eevak&t=3652s)
basically tries to communicate with other hosts and and uh they maintain uh

[01:00:58](https://www.youtube.com/watch?v=vwm1l8eevak&t=3658s)
like this map of sharts independently and like basically communicate

[01:01:04](https://www.youtube.com/watch?v=vwm1l8eevak&t=3664s)
independently and so the whole point of this demo is that like there should be

[01:01:09](https://www.youtube.com/watch?v=vwm1l8eevak&t=3669s)
no red lines showing that some calls like failed in a hard way without

[01:01:15](https://www.youtube.com/watch?v=vwm1l8eevak&t=3675s)
reprocessing and stuff like this and yeah that that's what happens here I mean I can stop like and by the way it

[01:01:22](https://www.youtube.com/watch?v=vwm1l8eevak&t=3682s)
calls Fusion Services nonfusion services and like basically basically it shows that the protocol is extremely tolerant

[01:01:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=3689s)
to different kind of failers so that's that's nearly it you see that like right

[01:01:35](https://www.youtube.com/watch?v=vwm1l8eevak&t=3695s)
now kind of throws these calls very rapidly

[01:01:42](https://www.youtube.com/watch?v=vwm1l8eevak&t=3702s)
okay so that's what actual RPC is um so

[01:01:48](https://www.youtube.com/watch?v=vwm1l8eevak&t=3708s)
this part with uh routing and so so on it's kind of complicated and you really

[01:01:54](https://www.youtube.com/watch?v=vwm1l8eevak&t=3714s)
need it only if you want to have a mesh of services on the server side and um

[01:02:00](https://www.youtube.com/watch?v=vwm1l8eevak&t=3720s)
like I think the problem it solves like ultimately is that like you really don't need a low balancer with it and this

[01:02:08](https://www.youtube.com/watch?v=vwm1l8eevak&t=3728s)
kind of also allows you to implement a more efficient communication schema

[01:02:14](https://www.youtube.com/watch?v=vwm1l8eevak&t=3734s)
about on your server side uh plus uh yeah it's extremely how to say well

[01:02:21](https://www.youtube.com/watch?v=vwm1l8eevak&t=3741s)
basically the error reprocessing like connection U problem and so so on they

[01:02:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=3746s)
are kind of out of scope because of the uh protocol and the

[01:02:33](https://www.youtube.com/watch?v=vwm1l8eevak&t=3753s)
library okay uh back to slides

[01:02:39](https://www.youtube.com/watch?v=vwm1l8eevak&t=3759s)
right that's not a slide so yeah I already

[01:02:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=3765s)
shown you this demo and yeah it's just a reminder that

[01:02:53](https://www.youtube.com/watch?v=vwm1l8eevak&t=3773s)
if you use it together with usion you get like uh the numbers that are uh

[01:03:02](https://www.youtube.com/watch?v=vwm1l8eevak&t=3782s)
completely out of reach uh even with RPC itself so it's a very different story if

[01:03:10](https://www.youtube.com/watch?v=vwm1l8eevak&t=3790s)
you use it with Fusion so uh and just a reminder right um we

[01:03:20](https://www.youtube.com/watch?v=vwm1l8eevak&t=3800s)
started uh from I think like not started but there was a slide showing how many

[01:03:26](https://www.youtube.com/watch?v=vwm1l8eevak&t=3806s)
calls RIS can process if you think about these calls these are extremely

[01:03:31](https://www.youtube.com/watch?v=vwm1l8eevak&t=3811s)
lightweight in terms of processing right so it's basically like kind of Dictionary

[01:03:37](https://www.youtube.com/watch?v=vwm1l8eevak&t=3817s)
lookups so that I think I would say that the networking part in this case should

[01:03:44](https://www.youtube.com/watch?v=vwm1l8eevak&t=3824s)
be kind of more expensive than the rest nevertheless so just 100

[01:03:51](https://www.youtube.com/watch?v=vwm1l8eevak&t=3831s)
20,000 right calls per second and so here you

[01:03:57](https://www.youtube.com/watch?v=vwm1l8eevak&t=3837s)
see numbers like well I mean these are kind of heavy calls so just 1.5 million

[01:04:06](https://www.youtube.com/watch?v=vwm1l8eevak&t=3846s)
calls per second but yeah more lightweight calls similar to probably

[01:04:12](https://www.youtube.com/watch?v=vwm1l8eevak&t=3852s)
the test on radius are well 6 million calls per second on this

[01:04:17](https://www.youtube.com/watch?v=vwm1l8eevak&t=3857s)
machine okay it's like 60x like 50x compared to R this

[01:04:29](https://www.youtube.com/watch?v=vwm1l8eevak&t=3869s)
so yeah that's where you can find actual up RPC samples and thanks a lot for

[01:04:38](https://www.youtube.com/watch?v=vwm1l8eevak&t=3878s)
watching please feel free to reach me out ask any questions and yeah if you

[01:04:45](https://www.youtube.com/watch?v=vwm1l8eevak&t=3885s)
would like to contribute something then that would be amazing okay thank you
