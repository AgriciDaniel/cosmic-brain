# ActualLab.Fusion, the distributed state sync monster

<a href="https://www.youtube.com/watch?v=eMO7AmI6ui4">
  <img src="https://img.youtube.com/vi/eMO7AmI6ui4/maxresdefault.jpg" 
       alt="Watch the video" 
       style="border: 1px solid #000; border-radius: 8px; max-height: 10em; height: auto;">
</a>

## Table of Contents

- Introduction and Background ([0:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=0s))
- Redis Baseline ([0:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=39s))
- Fusion Speed ([1:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=68s))
- What is Fusion ([1:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=107s))
- Voxt Demo ([8:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=488s))
- Compute State Component ([9:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=557s))
- Why Real-time is Hard ([11:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=690s))
- Fusion Features ([15:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=947s))
- Todo App Demo ([18:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1128s))
- Code Explanation ([43:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2639s))
- How Fusion Works ([1:07:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4051s))
- Performance and Benchmarks ([1:21:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7289s))
- Conclusion ([1:49:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=8963s))

## Transcript

[00:00:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=0s)
so I recorded this video yesterday and after uh composing the final version I

[00:00:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7s)
realized that two hours is way too long for any kind of intro

[00:00:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=14s)
so uh I decided to record a prequel to this

[00:00:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=21s)
intro uh an intro for intro and uh that's uh what we are going

[00:00:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=29s)
to start uh with so what you see here is uh how radius

[00:00:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=39s)
performs on my machine um it's 120,000 calls per second uh and let's uh

[00:00:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=47s)
think of this number as a baseline right uh you can run this Benchmark in any

[00:00:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=52s)
radius container the utility is called R Benchmark so 120,000 callers calls per

[00:01:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=62s)
second and that's the number you are expected to get with Fusion on the same

[00:01:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=68s)
machine it's a kind of similar one

[00:01:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=74s)

130 but million calls per second and that's if you use fusions

[00:01:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=81s)
client um so it's 1,500 times speed

[00:01:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=87s)
up and if you use uh Fusion just on the server side so without its client then

[00:01:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=93s)
the speed up is going to be about 20x and by the way notice that this number I

[00:01:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=99s)
mean almost 90,000 calls per second it's pretty similar to what you saw for Ed is

[00:01:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=105s)
so in this case the underlying storage is POS gra and uh yeah obviously when

[00:01:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=110s)
there is not a lot of data then they are supposed to produce nearly the same kind of results uh

[00:01:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=117s)
okay uh what you see here is even crazier so um the data on right or like

[00:02:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=126s)
the traffic over webset connection on the right shows that um Fusion client is

[00:02:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=133s)
uh managed to resolve six calls uh using a single uh round trip to

[00:02:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=140s)
the server uh so first few uh first two

[00:02:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=145s)
messages are a part of handshake and basically one is outg goinging and one

[00:02:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=151s)
is incoming and six calls are resolved uh so why six uh well uh we need some

[00:02:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=159s)
data to resolve a user from station and show this piece right then one call is

[00:02:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=165s)
for summary and three calls out for this part the first one gets the list of IDs and then like two more calls gets the

[00:02:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=173s)
data and uh I think what's weird is that uh there is a clearer data depend

[00:02:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=179s)
dependency right so for example you need to get the IDS first and only after that you can get the items by these IDs or

[00:03:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=187s)
like to get this whole piece of data you probably need to authenticate first so how it's possible that this thing

[00:03:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=193s)
manages to kind of puckle of these calls into a single packet and get back the

[00:03:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=199s)
data right uh and yeah right now I'm going to prove

[00:03:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=205s)
you this so that's the real qu of UI component that renders the list of items

[00:03:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=211s)
and basically all it does is it gets the list of IDs and well puts them into your

[00:03:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=217s)
model and like when the model is rendered uh so the next component that's

[00:03:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=222s)
the component that renders the item it gets the data for the item by uh well

[00:03:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=228s)
basically it's ID so as I said there is a clear data dependency nevertheless

[00:03:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=234s)
what you saw is like it's real uh a single uh round Tre to the server

[00:04:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=241s)
um so you may think that this is kind of fictional scenario right and it's a small sample but that's the real app uh

[00:04:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=248s)
actual chat the app that we built and it's built on top of fusion so it sends

[00:04:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=255s)
around uh 1300 calls uh when it starts or reconnects at least for my account

[00:04:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=263s)
right uh I have a decent number of chats and stuff like this and um it needs

[00:04:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=270s)
approximately 15 messages to kind of get the data for them typically uh and it's just 10 kilobytes

[00:04:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=277s)
of data on reconnection and uh yeah it supports offline mode as well which doesn't require any extra code so

[00:04:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=283s)
basically if you start without internet connection it's still going to render nearly the same

[00:04:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=289s)
stuff uh and that's the code from actual chat you you can instantly spot that the

[00:04:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=296s)
code looks weird right I mean okay like stuff like this you maybe can

[00:05:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=302s)
run it locally but like it doesn't seem like you can do this with uh on the

[00:05:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=308s)
client side assuming that most of these calls are going to the server side and like basically trigger some kind of RPC

[00:05:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=316s)
uh nevertheless that's the real code and moreover this code like actually uh so

[00:05:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=322s)
it triggers one of frequent animations uh I'll talk about this a little bit

[00:05:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=328s)
later so that's the repository uh that's uh where Fusion lives and uh uh the

[00:05:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=338s)
original uh so originally it was called as a Steel fusion uh I started the

[00:05:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=345s)
project while I was a CTO at service Tian and I think I left during one year

[00:05:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=351s)
after that um I contributed to the original repository for the next I think

[00:05:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=357s)
couple years but then we decided to basically start maintaining our own fork

[00:06:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=362s)
and that's the address of the fork uh so

[00:06:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=368s)
uh yeah the reason why it happened is like I was basically the like almost uh

[00:06:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=374s)
exclusively the only contributor there so uh it makes sense actually

[00:06:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=381s)
um now I'm also known for some posts on medium uh fancy comparison of Go versus

[00:06:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=389s)
C I mean in reality it's very in-depth comparison so if you are interested and

[00:06:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=395s)
definitely check this out and like most of my posts are uh kind of circling

[00:06:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=400s)
around uh performance uh and do map um so as I said I'm also known as a

[00:06:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=409s)
creator of actual chat um it's a fancy chat up that

[00:06:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=415s)
uh allows you to talk uh in like uh

[00:07:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=421s)
really talk and we provide both instant transcription and deliver your voice so

[00:07:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=426s)
basically every chat is kind of like a walkie-talkie where people uh can talk

[00:07:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=432s)
but don't have to listen all the time uh and uh yeah they can join at any moment

[00:07:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=438s)
uh continue conversation by typing or just uh well telling what they want to

[00:07:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=444s)
say okay and uh uh yeah uh I think I

[00:07:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=449s)
think we bet on one simple thing that like many people actually don't like to type I mean think about your

[00:07:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=456s)
grandparents or like young children or uh situations where you it's just not

[00:07:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=462s)
convenient to type right and U uh we basically mix these two experiences into

[00:07:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=469s)
a single medium typing and talking um there are a few different

[00:07:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=476s)
versions of this app you can download any and uh in any other sense it's more

[00:08:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=482s)
or less uh like normal chat so um it

[00:08:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=488s)
should be a good Feit for like either family chatting or like a small team where conversations are

[00:08:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=494s)
frequent okay and now we are going to see the first demo like the first

[00:08:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=505s)
example so um that's how actual chat works you

[00:08:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=513s)
press this big recording button and start talking and everyone else who sees the same chat they see the transcription

[00:08:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=520s)
and can listen to what other person says but like in reality uh yeah if you want

[00:08:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=527s)
to respond you typically just respond and uh uh that's it so I'm going to talk

[00:08:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=533s)
about this little button you see it's spinning right now um probably yeah I'll have to to

[00:08:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=539s)
replay this part so this little button uh it spins

[00:09:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=545s)
when someone else talks in uh the chat

[00:09:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=550s)
you uh in in the chat you are in right so

[00:09:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=557s)
it's a fusion component and all of them inherit from computer State component uh

[00:09:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=564s)
the model uh is declared right here the model I mean the data that uh basically

[00:09:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=571s)
this thing uh produces to render uh itself and uh that's the key method so

[00:09:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=578s)
compute state is a method that exists in every computer State component so that's

[00:09:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=585s)
the DAT compute computes and we are going to focus on is animated property

[00:09:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=592s)
here or flag uh as you see like the way it produces this uh flag is first it get

[00:09:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=599s)
gets uh chat audio state from chat audio UI well basically it's clear that it's

[00:10:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=608s)
uh some uh kind of state that describes what what's going on with audio right

[00:10:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=614s)
now uh is something Plank and so so on so as you see first it checks that like

[00:10:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=623s)
uh you aren't listening right now which means that like this button is depressed

[00:10:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=628s)
uh sorry yeah uh not pressed uh and then we get uh information about the current

[00:10:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=635s)
chat uh get last text entry there see if it's streaming if it's has an audio

[00:10:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=641s)
entry right and if that's the case then we get uh your own author in this chat

[00:10:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=650s)
and uh check if the message is basically not originating from you so if like

[00:10:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=656s)
someone else is talking then we start any so that's the code like and I think

[00:11:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=664s)
what's unusual here right is that I mean okay like if you have all the data

[00:11:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=669s)
locally then this code may work but in reality it works on the client nevertheless the code is kind

[00:11:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=676s)
of it's it's weird it it looks like everything is like literally every bit

[00:11:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=683s)
of data uh exists on the client right so why real time is

[00:11:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=690s)
hard uh it's hard not because uh like just

[00:11:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=696s)
reporting changes is something that's complex it's hard because you usually

[00:11:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=702s)
have tons of different components right uh which report the state changes and in

[00:11:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=709s)
the end you need to combine a single state for example you show the one you

[00:11:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=714s)
show in the UI um and you need to make sure that the the single state is eventually

[00:12:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=721s)
consistent the changes there are displayed in the right temporal order and so so on and that's the part uh

[00:12:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=729s)
which is hard to get right uh

[00:12:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=734s)
overall you need some uh framework and some set of core

[00:12:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=740s)
principles uh that uh allow you to build all of that uh otherwise it's going to

[00:12:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=747s)
be extremely complicated and let me show you why so

[00:12:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=753s)
um let's say we want to like uh approach real time uh like we normally do so

[00:12:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=763s)
let's say we have an API which returns a single item right and we want to render

[00:12:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=770s)
it and then we want to observe for its changes and render each of these changes

[00:12:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=777s)
right so that's the quote we probably would write in this case uh the only thing that's missing here I guess is I

[00:13:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=784s)
forgot to write state has changes uh somewhere here

[00:13:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=789s)
right well uh reality is very different uh like there are many problems in this

[00:13:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=797s)
code and uh yeah right now I'll show you some so first of all we need to

[00:13:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=806s)
unsubscribe from like receiving changes at some point so we can do it by

[00:13:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=812s)
implementing I disposable here right and like implementing some sort of cancellation token we pass to observe

[00:13:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=820s)
changes which is going to abort in the end and unsubscribe but like another problem is

[00:13:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=827s)
that we need to call this method first uh and only after that call this one

[00:13:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=832s)
because otherwise we may miss some changes uh and uh

[00:14:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=840s)
so another problem is that this code doesn't do anything in case we

[00:14:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=846s)
disconnect basically doesn't handle the situation with disconnects and

[00:14:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=851s)
reconnects right and we also didn't touch the code on the server side because observe item has to be like

[00:14:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=859s)
nearly as complex and as the code here actually maybe even more because you may

[00:14:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=864s)
have a mesh of servers on the server side and state might be

[00:14:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=870s)
um composed as well so um uh that's nearly the scenario we

[00:14:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=878s)
have to deal with right and what I shown you here is like I didn't even touch the

[00:14:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=885s)
piece where we combine a state from like multiple sources uh so even this part I mean when

[00:14:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=893s)
we deal with a single Source it's kind of complicated already right and uh

[00:15:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=900s)
these complications or like complexity that we get is what uh what we want to

[00:15:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=907s)
avoid by all means because uh like

[00:15:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=912s)
complexity I mean it's good to some extent but like uh it's well known that

[00:15:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=920s)
that's sort of uh sorry the source of uh well the worst problems you may F face

[00:15:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=927s)
in especially in the kind of second half of a lifetime of any product uh and it

[00:15:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=934s)
skills not just products but the societies so you may find some

[00:15:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=940s)
interesting analysis on this on the web okay okay so uh what is

[00:15:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=947s)
fusion fusion is um distributed State Management obstruction which kind of

[00:15:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=954s)
views the whole state of Europe as something it manages

[00:16:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=960s)
uh that includes the state that's Exposed on the clients on the servers on

[00:16:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=966s)
backends basically it connects all these pieces together and make sure that like

[00:16:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=972s)
they get all the updates in real time uh

[00:16:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=977s)
interestingly it's um it also solves many problems which don't look like even

[00:16:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=986s)
related to uh real time for example caching uh well and uh

[00:16:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=994s)
that's because like you have a perfect caching right you need to evict a stuff

[00:16:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1001s)
from cash at the right moment I mean ideally as quickly as possible and uh to have this part you

[00:16:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1009s)
need something that tells you that like this thing changed so that's how it's related to real time then um it's also

[00:16:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1018s)
related to uh mobile apps and like reducing the network traffic basically

[00:17:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1024s)
being very savy on network traffic uh because again uh if you know that

[00:17:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1032s)
certain thing still stays the same you don't have to request it again from uh

[00:17:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1038s)
the server uh it's also related to uh monoliths and microservices basically it

[00:17:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1044s)
allows you to build a monolith that is extremely easy to transition to

[00:17:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1050s)
microservice architecture and yeah I'll later I'll explain why and um like as

[00:17:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1056s)
you saw already right uh another interesting piece is that like the code you write with Fusion looks kind of

[00:17:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1064s)
almost normal uh it looks almost exactly like the code you would write but

[00:17:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1070s)
without Fusion so that's a cool part because it's quite readable quite clean

[00:17:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1075s)
and uh easy to understand well and finally it's uh really kind of Blazer friendly

[00:18:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1084s)
there is a very thin integration with blazer but basically it's a natural fit for Blazer ups and uh yeah one of again

[00:18:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1093s)
kind of fancy consequences is that you can build um server side Blazer UI and

[00:18:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1101s)
web assembly UI for hybrid UI and it's going to be the same code like you don't

[00:18:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1106s)
really need to make any changes begin to work uh that's how it works in actell

[00:18:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1112s)
chat and in all Fusion samples so you can switch them from server side Blazer to web assembly basically Standalone

[00:18:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1119s)
client or client running on the server and it's it's the same thing okay um so now I'm going to show

[00:18:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1128s)
you one of U kind of uh bigger samples uh from Fusion it's

[00:18:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1136s)
called Todo up and uh I'm going to um basically my goal is to

[00:19:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1144s)
illustrate how uh all of that uh

[00:19:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1149s)
basically impacts on um certain behaviors of the app so let's

[00:19:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1159s)
start let's start the app right

[00:19:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1169s)
so I already have a couple windows open you see that it just reconnected and I

[00:19:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1176s)
am authenticated here well let's item

[00:19:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1182s)
three and do the check box so you see that basically all these properties they

[00:19:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1187s)
update and this one is by the way working Blazer server this one is web

[00:19:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1193s)
assembly let's switch this one to web assembly as well

[00:19:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1198s)
so you see they work in sync right now I'm going to sign out just to show how

[00:20:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1205s)
it works and or sign in so it basically does this in both

[00:20:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1211s)
windows okay um sign

[00:20:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1217s)
out um so um there are two versions of

[00:20:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1222s)
uh this uh to-do page and uh um the

[00:20:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1228s)
version two is the one we are going to uh study and

[00:20:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1236s)
um yeah let's have one item here for now

[00:20:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1243s)
so um yeah I'm I'm going to stop the up

[00:20:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1250s)
right

[00:20:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1257s)
now so um let's open these pages

[00:21:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1263s)
right to do page one and is to do page two

[00:21:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1269s)
right um so what's the difference the difference here is uh how like computed

[00:21:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1278s)
State uh is implemented um you see that uh on page

[00:21:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1284s)
one it basically calls uh some to-do service and gets all the items and the item here

[00:21:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1293s)
is to- do item if we click on it we will see that basically it contains

[00:21:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1299s)
everything right then uh if we go to to do page

[00:21:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1304s)
two uh you will find out that this thing

[00:21:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1309s)
fetches IDs of the items and its model it uh uh exposes these IDs so uh the

[00:21:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1319s)
code that renders the page uses to- do item view which gets the ID if you click

[00:22:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1326s)
on to do item view then you will see that its compute State method uh

[00:22:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1333s)
actually gets the item by this ID and renders it and uh as for the first page

[00:22:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1342s)
it's a little bit different there it use a different component to render the item

[00:22:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1348s)
call too item row you and this one doesn't fetch anything it basically gets

[00:22:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1354s)
the item and renders it so uh I think uh what's reasonable to

[00:22:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1362s)
ask right now is like um what happens uh under the hood right what kind of uh

[00:22:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1369s)
requests it sends to the server and U like how basically it gets all the data

[00:22:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1377s)
so we're going to run it again right now and um I'm also going to leave just

[00:23:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1384s)
one of these windows and open

[00:23:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1389s)
Chrome inspector okay

[00:23:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1395s)
okay so first let's refresh the page oh

[00:23:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1401s)
my God let not to do uh let's refresh the page right

[00:23:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1410s)
uh and how do we clear everything

[00:23:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1422s)
here okay now uh

[00:23:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1430s)
let's let's retry okay so it sends um

[00:23:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1439s)
so it doesn't uh use HTTP client to send all these requests it uses custom

[00:24:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1446s)
protocol and that's why I basically enabled some logging and showing you

[00:24:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1452s)
what kind of um calls it makes uh so uh that's the first call uh

[00:24:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1459s)
the first call is handshake right then it uh calls get summary that's this

[00:24:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1465s)
component right then Authentication part like pulls I think that's to render this

[00:24:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1472s)
component uh pulls some data you see that uh get summary now got a

[00:24:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1479s)
response uh then uh I guess uh authentication get user get a response

[00:24:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1486s)
and um I think in the end well uh let's

[00:24:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1491s)
focus on list this yeah so it uh I think

[00:24:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1496s)
all these calls if you look at the like timing of all these calls it basically like sends all these calls almost

[00:25:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1504s)
simultaneously right and then gets the first kind of chunk of data let's add

[00:25:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1510s)
one more item two and I want to add also item three and item

[00:25:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1517s)
four so let's uh let's uh do uh refresh

[00:25:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1523s)
once more so you see that uh like

[00:25:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1530s)
as soon as uh list IDs returns uh the

[00:25:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1536s)
result it sends like all these get methods like I mean go get requests for

[00:25:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1542s)
the item data in parallel and uh uh like gets the data right if you go to tut2

[00:25:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1549s)
page two and press refresh you will I think

[00:25:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1555s)
um wait uh

[00:26:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1563s)
sorry so you will basically see the same uh output so it's like list ID returns

[00:26:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1570s)
then it sends a bunch of calls to get the items right and as for everything

[00:26:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1576s)
else so basically they Works in a very similar way

[00:26:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1581s)
right okay so um

[00:26:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1588s)
now let's uh also look at the networking tab right and um what I want to do here

[00:26:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1596s)
again let's uh clean blog so I want to show you how basically many exchanges

[00:26:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1604s)
happens here so these first two are handshakes then that's the request that

[00:26:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1611s)
combines a bunch of calls and uh like get summary data user data I think and

[00:26:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1616s)
other stuff and this is the request that uh I think gets all the

[00:27:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1622s)
items so what's interesting is that like from the networking standpoint uh it

[00:27:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1628s)
looks like uh like accept handshake just two exchanges I mean just two like round

[00:27:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1634s)
trips happened right okay um and yeah by the way I'm so

[00:27:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1641s)
I'm going to uh now I'm going to show you

[00:27:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1646s)
uh the

[00:27:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1653s)
um the most option sorry optimal version of this

[00:27:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1659s)
exchange uh so uh what I did uh before

[00:27:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1665s)
running this sample is I disabled one of services here and um basically the

[00:27:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1672s)
service uh is called uh local storage remote

[00:27:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1678s)
computed cach you can uh click on it it's implemented right here it's a very simple service

[00:28:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1685s)
that like basically extend extends remote computed cache so you can have a

[00:28:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1691s)
custom version of it better one than this one but uh so let's see what's

[00:28:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1698s)
going to happen uh once I run the app with this service

[00:28:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1719s)
so again cleaning V refresh we need updated

[00:28:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1725s)
client and you see the first refresh it's nearly the same exchange right so it's

[00:28:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1730s)
basically um let me actually do one interesting

[00:28:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1737s)
thing so I'll change the protocol as well right now and uh we'll use the protocol

[00:29:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1746s)
that at least uh shows uh the names of the methods it uh calls right in so

[00:29:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1753s)
basically the one that was used here it's like extremely efficient version and it uses um anyway that's I guess

[00:29:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1763s)
I'll explain it later but for now just let's switch it to uh um let's switch

[00:29:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1769s)
the client to a less efficient protocol in terms of like the amount of data send

[00:29:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1776s)
a little bit less efficient so I refresh and click here there is

[00:29:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1782s)
literally so this is a handshake request response right but this one I mean this

[00:29:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1790s)
message it combines literally everything uh I mean we see that there is a get

[00:29:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1796s)
summary get user and even uh to do API get uh

[00:30:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1805s)
methods like basically get list IDs uh so literally everything

[00:30:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1813s)
uh is combined into a single uh Network

[00:30:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1818s)
packet and moreover that's how the response looks like so the question is

[00:30:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1824s)
like what's going on right uh how it's possible that this thing um literally

[00:30:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1832s)
just makes just a single network round FP and gets all the

[00:30:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1837s)
data and uh yeah let me show you uh what happens

[00:30:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1844s)
under the foot so if we go into the application local storage so I shown you

[00:30:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1850s)
that like we now use cash and uh what

[00:30:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1855s)
actually happens is that Fusion CL basically emulates

[00:31:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1862s)
the connectivity with the server and like when it gets a request to call one

[00:31:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1869s)
of remote methods if it has a value in its local cash then it immediately

[00:31:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1875s)
responds and uh at the same time it validates it against the I mean

[00:31:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1882s)
basically sends a request to the server which uh checks if the value that client

[00:31:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1889s)
has is still the same and sends back the data only if it differs otherwise it

[00:31:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1894s)
responds that hey your data is still correct um so

[00:31:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1901s)
um now so so um let me clear it uh and uh just again

[00:31:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1911s)
to show how the exchange starts so that that's

[00:31:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1918s)
what happens when you have an empty cache right basically it sends the first Chun of calls the once it gets all in

[00:32:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1927s)
like in a single Network bucket uh uh when you refresh the page gets a

[00:32:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1934s)
response and then sends next Chun of calls okay

[00:32:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1943s)
um so uh let's check a few uh things here first let's see if it's going to

[00:32:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1950s)
work if I disable web sockets uh like disable web sockets

[00:32:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1957s)
completely so what okay should be use

[00:32:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1962s)
web soet right

[00:32:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1969s)
mhm okay so we will disable this

[00:32:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1974s)
part and I'm yeah let's restart the

[00:33:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1988s)
server so you see that it's unable to reconnect right right now basically if I

[00:33:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1994s)
click reconnect nothing happens it can't reconnect uh and if we go to console

[00:33:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2002s)
then uh well it's going to dump your messages here um but like

[00:33:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2011s)
it kind of pretends like it works uh I just clicked here right and it can

[00:33:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2017s)
basically run any actions but nevertheless right now it's kind of let

[00:33:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2025s)
me show you I can even switch these Pages give it you authentication like basically it behaves

[00:33:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2030s)
like it works let's refresh the page so I just clicked refresh it still

[00:33:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2038s)
can't reconnect it basically um yeah it dumps all these zor messages

[00:34:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2046s)
because it can't reconnect uh but nevertheless I still can uh kind of

[00:34:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2053s)
scroll through the app and so that's what uh this remote computed cat does

[00:34:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2060s)
basically emulates the presence of a server uh the server that responds

[00:34:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2065s)
instantly with the last version of well whatever data you requested that it

[00:34:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2071s)
knows on the other hand since like and you will learn about this later in this

[00:34:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2077s)
video but since everything is designed that basically every piece of data May uh kind of become stale and report that

[00:34:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2085s)
it has to be updated and like uh this emulation is possible because uh well

[00:34:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2091s)
literally if server or like if the client sees that the new value on the server is different

[00:34:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2098s)
uh like for example after reconnection right then um it will

[00:35:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2107s)
uh it will run a process that will invalidate it here and like recompute

[00:35:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2113s)
and fetch the new data so basically um all of this uh kind of works in tandem

[00:35:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2123s)
with uh this mechanism that allows uh Fusion to distribute the information

[00:35:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2131s)
about changes okay let's check one more thing uh here

[00:35:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2136s)
so right now uh so right now uh we're going to leave this

[00:35:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2143s)
client operational and we going to change the back end on the server side

[00:35:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2149s)
and restart the server uh what like supposed to happen right uh

[00:35:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2158s)
is that like okay there is a different server different band so it has to

[00:36:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2163s)
update the data because like it can cannot expose this data anymore um let

[00:36:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2171s)
me do this so first let's reenable web

[00:36:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2178s)
circuits and run it I just want you to like see that the client will reconnect

[00:36:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2187s)
in this case is and like basically will continue working as it's supposed

[00:36:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2193s)
to just connect it yeah so the data is there you can make

[00:36:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2199s)
changes now now I'm again stopping the server you see that okay

[00:36:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2205s)
disconnected and um so let's replace

[00:36:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2212s)
uh uh so you see that like the service that's uh um I2 do API is the service

[00:37:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2222s)
that uh is used on the client side and

[00:37:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2228s)
uh there is a server for this service right so that's how the server is

[00:37:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2233s)
registered Fusion at server and that's the service and that's the

[00:37:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2239s)
implementation so we are going to swap it right now with this thing and uh so

[00:37:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2246s)
this thing goes to the dat database and like it's even more complex than that and I'm going to like use right now a

[00:37:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2253s)
completely different implementation and uh so let's start the

[00:37:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2259s)
server and see what's going to happen here right just connected so you see

[00:37:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2264s)
that it like refreshed everything right now basically if you look here uh it

[00:37:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2272s)
sent all these calls that are necessary to refresh the data right

[00:37:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2278s)
and uh so which one is spending uh this one right we are

[00:38:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2285s)
looking for it basically tries to connect I guess too many

[00:38:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2294s)
times I'm not okay finished finished

[00:38:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2302s)
finished yeah I'm not sure like uh how to find the right web

[00:38:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2309s)
circuit connection now but I guess it's fine so the point was that like it

[00:38:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2314s)
changed the state okay let's add a bunch of items

[00:38:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2321s)
here well no wait uh so we need yeah we can't use in memory service

[00:38:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2329s)
for this it's going

[00:38:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2334s)
to and so um my point is it works but if I shut

[00:39:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2341s)
down the server right then um it's going to uh well um the state will be uh will

[00:39:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2355s)
disappear so um let me quickly get back to the old

[00:39:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2363s)
version H it's it's by the way it's wait wait wait wait uh so it's a fancy thing

[00:39:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2370s)
it just reconnected and uh shown the Old State yeah I wanted to show like what's

[00:39:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2376s)
going to happen here so uh now the interesting question

[00:39:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2382s)
is so it sends uh a bunch of calls right when it starts right and uh I think the

[00:39:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2390s)
question is like if this state is catched what part of logic is

[00:39:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2395s)
responsible for sying that cach State and right now I'm going to show you that

[00:40:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2401s)
like uh it's uh okay so I just refreshed oh by the

[00:40:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2409s)
way that's that's also interesting to see it right so that's what what happens

[00:40:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2414s)
in presence of a cache so you see that like it literally throws every call like

[00:40:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2421s)
in parallel before it even gets the response it's like get summary and and

[00:40:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2427s)
it looks here that it sends the Gap all first it just kind of goes through first right in reality it requested this thing

[00:40:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2434s)
it responded immediately then it sends uh like it requested all these things and like uh basically that's how it gets

[00:40:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2443s)
this single packet uh to send on the server because like all these calls they

[00:40:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2448s)
are literally produced synchronously and uh they are ready to

[00:40:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2454s)
send basically at almost the same time uh so let's let's uh just modify the UI

[00:41:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2463s)
code and remove this uh thing and I think the expected effect is that we should not see these calls as well right

[00:41:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2477s)
um so we need let's do this on Tod do page two uh which features the IDS

[00:41:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2485s)
right um

[00:41:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2501s)
I think it's fine uh let's start

[00:41:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2508s)
it so right now I have to refresh the client and

[00:41:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2515s)
uh I click control r so you see that uh there are no calls to

[00:42:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2524s)
both list IDs and get uh like uh uh I

[00:42:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2530s)
mean to do api. getet if we go to

[00:42:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2535s)
another version of this page and we didn't modify it then like that's what

[00:42:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2541s)
going to happen it sends all these calls and if you will go to uh networking tab

[00:42:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2551s)
you may see that I think all these calls were sent so this is list this get get

[00:42:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2560s)
get they were sent at once and uh yeah uh in terms of

[00:42:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2568s)
responses uh so they came in two different pockets and that's basically

[00:42:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2574s)
depends on server right if server can produce the response syn noly synchronously like because data is

[00:43:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2580s)
available and it does it otherwise it may send send a bunch of buckets

[00:43:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2586s)
okay so a lot of fun stuff but I think the main conclusion here is that like

[00:43:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2592s)
it's extremely efficient in terms of getting the data via Network and uh like

[00:43:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2599s)
even packaging it into uh basically the least possible number of Transmissions

[00:43:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2606s)
not exactly least possible but quite close to that okay now we are going to see how it

[00:43:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2615s)
works so basically what is the code that's responsible for all these real time updates in this app and um like

[00:43:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2624s)
look a little bit deeper so far we saw mainly the UI code right and uh we are

[00:43:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2631s)
going to look into the server site code okay um

[00:43:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2639s)
so I'm I'm going to um basically undo some of my changes

[00:44:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2646s)
here and what else what else let me see

[00:44:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2651s)
yeah I think that's the only change that I I made oh yeah so like let's keep this

[00:44:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2659s)
protocol for now so let's start from

[00:44:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2667s)
uh to- do page one the one that basically fetch everything with this

[00:44:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2676s)
call so what is todu todu is to

[00:44:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2682s)
do uh let's see how this thing is registered

[00:44:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2688s)
right um You can easily see that it's

[00:44:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2693s)
registered as a compute service which is scoped scoped means it lives in like

[00:45:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2701s)
Blazer scop so basically it's a client side service like we are talking about the Blazer um apps

[00:45:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2709s)
right uh so uh and uh you see that it was uh

[00:45:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2716s)
registered as compute service and uh it also kind of extends this weird

[00:45:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2723s)
interface I compute Service uh so it's a tagging interface well

[00:45:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2732s)
for yeah the comment is wrong here but it's tagging interface for comput

[00:45:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2738s)
service yeah uh so basically I think it's it's a copy from RPC service requ

[00:45:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2744s)
iing proxy probably from one of these interfaces but the point is like uh this

[00:45:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2750s)
is a tagging interface you don't have to implement any methods it just like tells

[00:45:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2756s)
uh Pro generator that this thing needs a proxy and I'll talk about this later

[00:46:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2762s)
then so we were calling this method here right and uh uh what it does it calls to

[00:46:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2770s)
do API list IDs then it for each of these IDs it calls this method so

[00:46:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2776s)
basically gets the item collect is Task one0 basically it's like a we can

[00:46:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2782s)
rewrite it as T all and

[00:46:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2788s)
um something like this wait it's it's uh

[00:46:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2796s)
well it here something like this it's the same code

[00:46:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2802s)
uh I'll return it back collect is just a little bit more flexible thing

[00:46:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2809s)
um so what you see here is that like this

[00:46:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2816s)
thing literally calls uh to do API and gets all the data from it kind of

[00:47:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2821s)
rearranges it right pugs it into uh basically uh a single array or list

[00:47:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2829s)
right and um returns it now uh so what is to- do API um Tod

[00:47:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2836s)
do API is um an interface let's see how this thing

[00:47:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2843s)
is registered and uh um well you can find

[00:47:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2850s)
there is a number of registrations but we need the one that's uh registered on

[00:47:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2856s)
the client that's the thing basically it's a fusion client for this uh

[00:47:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2864s)
service if we click on it then we see that it has well add door update and

[00:47:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2870s)
remove methods uh like Let's ignore this command Handler thing but again we see

[00:47:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2876s)
this comput method compute method compute method on get list this and get

[00:48:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2882s)
summary so that's the method that uh that's

[00:48:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2888s)
basically Fusion method the method that's kind of backed by Fusion uh

[00:48:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2895s)
logic um and

[00:48:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2902s)
um let's find the server right for this client uh um so I'm going

[00:48:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2908s)
to uh do the same thing and that's how it is registered on the server site at

[00:48:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2916s)
server Tod do API let's go to the to-do

[00:48:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2924s)
API um so list IDs here uh

[00:48:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2931s)
um it's pretty simple it calls get folder uh and pass the station here

[00:48:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2938s)
right and then calls back end uh passing

[00:49:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2943s)
the folder so you may think of this as uh so uh to do API is basically a

[00:49:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2951s)
front-end service a service that is responsible for kind of rewrapping what

[00:49:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2958s)
backends can provide but uh running extra security checks and basically uh

[00:49:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2965s)
kind of filtering out what you can't access right and what it does is like uh

[00:49:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2970s)
basically if you look at get folder method there you will see that uh it

[00:49:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2977s)
resolves the user uh from s and so ignore the tenant part but I think

[00:49:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2984s)
basically if the so this thing is going to be empty uh in this case because we

[00:49:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2990s)
don't run it in multi- tency mode but yeah sample can be executed in multi

[00:49:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2995s)
tency mode as well so this thing is going to be empty uh this whole piece

[00:50:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3002s)
right and ultimately it like basically returns a prefix to some key value store

[00:50:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3009s)
right which is either this or that if you are dependently on whether you are

[00:50:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3014s)
authenticated or not right and then for this prefix or folder it uh so oh sorry

[00:50:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3023s)
list ID SCS uh well method providing

[00:50:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3028s)
this folder so you you can think of it as like basically this part uh did some

[00:50:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3033s)
Security checks right and kind of rout at the user to the right location on the

[00:50:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3038s)
backend storage and then like it calls the back end and gets the data and uh um

[00:50:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3047s)
let's look at this thing right so theend is also compute Service uh and uh and by the way uh let

[00:50:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3055s)
me show you one other I think get user is also compute service

[00:51:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3061s)
so um you see that like nearly every call that they make is uh a compute

[00:51:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3069s)
service method or a method that calls some other compute service methods like like this one it doesn't have this

[00:51:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3074s)
compute service thing oh let me clarify one thing uh so there is no compute

[00:51:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3080s)
service attribute here but it's inherited from the interface kind of inherited because it's here okay so the

[00:51:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3089s)
point is uh the point is uh so let's go to the list on the back end and go to

[00:51:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3097s)
now I'll just use I'm going to use this very way simpler navigation and just

[00:51:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3102s)
give to the implementation oh and yeah one of my old break points is here so if

[00:51:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3109s)
you look here you will find out that like this code is again like almost

[00:51:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3115s)
normal in terms of like what it does it basically gets the DB context right

[00:52:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3122s)
using some uh well um additional service

[00:52:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3128s)
but uh ultimately it gets the DB context and then just Runing query and gets all

[00:52:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3134s)
the keys right uh maybe by like with some kind of

[00:52:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3140s)
postprocessing uh so um what's unusual is I guess this part

[00:52:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3148s)
right but that's nearly it so let's

[00:52:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3156s)
um so the question is right what happens when we add the new

[00:52:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3162s)
too item so that like somehow somehow this method gets called

[00:52:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3168s)
again right and the answer would

[00:52:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3174s)
be uh well yeah let's let's leave these break

[00:53:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3180s)
points actually let's leave these break points um the answer would be this

[00:53:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3190s)
piece uh so any method that makes some change it has a block like this uh and

[00:53:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3200s)
um this block is responsible for uh running socalled invest validations

[00:53:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3207s)
basically whatever method is called here with whatever arguments

[00:53:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3212s)
passed um the result of this method if it was cached before then it's going to

[00:53:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3220s)
be you you may think of it as if it's going to be evicted from the cach so in

[00:53:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3226s)
reality it's not exactly like this and it's it's a little bit different and but

[00:53:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3231s)
you may think of like what happens here as I just described basically if you

[00:53:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3237s)
call uh for example get summary method with some folder here and default is for

[00:54:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3243s)
cancellation token I just want to show you so you can remove it but like it's

[00:54:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3248s)
going to highlight it right so okay uh I mean the writer is going to kind of

[00:54:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3254s)
complain uh so let me show you one thing I'm going to comment out this piece right now and

[00:54:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3262s)
uh now when I will be removing an item summary is not going to

[00:54:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3269s)
update so since we changed just the server right now let me see right so

[00:54:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3278s)
that's the only change that we've made then uh I don't have to update the client sorry that's not the that's not

[00:54:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3287s)
what I want to show okay so summary you

[00:54:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3293s)
see that like right now it's updating the delay there is intentional so it's not like there is a protocol delay or

[00:55:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3300s)
something it's basically one of settings I'm not going to show like uh well maybe

[00:55:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3307s)
I'll show how easy it is to like control all these delays but the point is so

[00:55:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3313s)
right now you see that summary gets updated now let's try to remove

[00:55:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3318s)
one and you will see that like it wouldn't change and moreover

[00:55:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3326s)
uh it will never change like uh basically unless uh I mean I can call

[00:55:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3332s)
like state has changed inv validate recompute I can open another version of

[00:55:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3338s)
this page and it's still incorrect because uh because no one told

[00:55:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3346s)
Fusion that summary has to be invalidated uh so that's that's how it

[00:55:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3353s)
works but if we will add the a new it or like edit this one for

[00:56:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3360s)
example oh no so on edits it's not going to be updated but when we add an

[00:56:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3369s)
item it it's again in sync right now so um uh let me get back to

[00:56:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3379s)
the code that we we're playing

[00:56:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3384s)
quiz so get some I think the reasonable question to ask is like why there is such a weird syntax

[00:56:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3392s)
and what actually happens because it's like it feels

[00:56:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3398s)
like uh this code it kind of cannot run

[00:56:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3404s)
once right I mean it feels like this method runs the number of times and

[00:56:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3411s)
that's that's what actually happens uh so when this method is executed for the

[00:56:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3417s)
first time or like when basically the original call is made it goes through

[00:57:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3424s)
basically this part and uh this condition is false

[00:57:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3431s)
but uh once it completes and once the transaction uh is getting committed and

[00:57:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3438s)
that's why by the way it uses a special call here to get uh Deb text uh such DB

[00:57:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3446s)
context or like basically it tells that like okay this method makes changes and

[00:57:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3452s)
it needs a special DB context that is going to be uh I mean the transaction is

[00:57:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3458s)
going to be created there and a bunch of other things that kind of make this Machinery work but ultimately in the end

[00:57:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3465s)
when the transaction uh is committed it's going to run this piece and it's

[00:57:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3470s)
going to run it not only on like this single machine but on every machine in

[00:57:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3476s)
the uh cluster that uh like talks to the same

[00:58:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3481s)
DB uh so basically uh it's uh like another aspect

[00:58:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3489s)
that kind of helps uh this distributed Mode work uh I mean on the server side

[00:58:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3495s)
it doesn't even have to kind of sync something over the network protocol or

[00:58:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3502s)
like basically there is a different uh approach that allows different servers

[00:58:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3508s)
to uh invalidate uh a part of their State uh

[00:58:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3513s)
when you make changes on one of these machines and it's extremely reliable uh

[00:58:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3520s)
like uh uh I think well I mean the simple explanation would be that it uses

[00:58:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3527s)
outbox pattern but in reality it's like a little bit more complex and

[00:58:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3533s)
advanced um okay

[00:58:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3538s)
um and yeah one thing I want to show you

[00:59:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3543s)
is API so if you like don't involve the

[00:59:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3549s)
DB and use more kind of low level approach then uh that's the code that

[00:59:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3557s)
actually uh allows you to invalidate something uh you uh run this thing in

[00:59:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3565s)
using log and whatever you call inside is uh getting

[00:59:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3570s)
invalidated so uh in this case basically the block like this is executed by one

[00:59:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3579s)
of pipeline handlers for this command like any command actually basically

[00:59:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3585s)
detects that okay there is an operation that was committed so I have to run this

[00:59:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3590s)
command G but in the invalidation mode that's nearly how it works uh um let me

[00:59:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3597s)
show you the last thing uh right now so I'm going to run uh Aspire host for uh

[01:00:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3606s)
this sample and

[01:00:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3612s)
uh it is going to be even more

[01:00:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3618s)
interesting I don't want to open it here okay let me open it in Chrome as

[01:00:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3630s)
well oh wait I need this

[01:00:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3636s)
thing okay so right now this thing starts started like six

[01:00:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3645s)
hosts uh three API hosts on five, five 6

[01:00:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3651s)
and seven and for each of these host hosts it started back end hosts so

[01:00:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3657s)
backend hosts they run a backend API host they run to do API and API talks to

[01:01:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3665s)
a backend on corresponding host so um

[01:01:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3671s)
now let's do

[01:01:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3679s)
well we're going to close this thing and yeah

[01:01:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3687s)
and we're going to go to another post here so remember they still talk to the

[01:01:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3696s)
same I mean they still use the same DB and what I'm going to show you now is

[01:01:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3701s)
how these distributed inv validation on back end for so you see that like this

[01:01:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3707s)
is a different front end host and this is like also a different front end host

[01:01:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3712s)
they use different backend hosts but in the end they use the same DB so what's

[01:01:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3718s)
going to happen if I click here

[01:02:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3723s)
oh

[01:02:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3729s)
um six what happened with this thing

[01:02:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3747s)
okay now let me show you the last uh piece about this sample so I'm going to

[01:02:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3754s)
start Aspire host and

[01:02:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3759s)
uh yeah um not here so I already opened it here

[01:02:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3770s)
will it yeah it works so um let me

[01:02:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3776s)
let me get full screen for now so uh Aspire host started six hosts

[01:03:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3787s)
uh basically three API hosts and three backend hosts and each API host like

[01:03:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3794s)
this one for example running on 50005 Port is tooking to this back end

[01:03:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3800s)
and like basically to do API Services working here and uh uh it uses backend

[01:03:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3809s)
as a fusion client so I to do backend which uh actually uh is hosted

[01:03:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3817s)
here and this service uses this backend and so so on

[01:03:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3823s)
so now uh yeah let's refresh both

[01:03:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3830s)
things so you may notice that ports are different here right basically they use

[01:03:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3836s)
different front ends so the different apis um API hosts and these API hosts

[01:04:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3842s)
they use different backhand hosts and the only common thing they use is

[01:04:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3849s)
database uh so are they going to

[01:04:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3855s)
sync well as you see they do uh and that's how this distributed invalidation

[01:04:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3862s)
on backand Works uh like yeah they stay in sync as they are

[01:04:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3871s)
supposed to be um so let me you can Swit switch this to server like really

[01:04:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3878s)
doesn't matter what you do uh so let's

[01:04:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3886s)
um let's do one other thing

[01:04:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3892s)
sohm you can find traces here for any host but I'm going to focus on metric

[01:05:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3900s)
and we are going to uh observe metrix from

[01:05:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3910s)
the let's observe Matrix from uh this back

[01:05:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3915s)
end and let's go to call duration call count right so uh

[01:05:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3924s)
list IDs uh basically it gets called when we

[01:05:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3930s)
change something right I mean in terms of number of items in the

[01:05:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3936s)
list Let's uh okay I can't click here yeah so I just removed we get another

[01:05:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3943s)
call so the interesting question is what's going to happen if I

[01:05:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3951s)
um click refresh here that's the first thing will it call back backend uh once

[01:05:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3957s)
more cuz like I mean in in the normal situation right uh like this thing will

[01:06:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3964s)
try to get the data and will hit the back end again so I'm refreshing

[01:06:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3971s)
it refreshed refreshed it doesn't hit the

[01:06:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3977s)
back end right uh the reason is that like the value the value that it gets

[01:06:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3984s)
it's catched on the front end let's kill the back

[01:06:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3991s)
endm so we go to resources po one backend can we kill it

[01:06:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=3999s)
[Music] somehow let's try

[01:06:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4009s)
to well

[01:06:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4015s)
looks like yeah I can't kill it here

[01:07:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4022s)
unfortunately um yeah I don't know how to like U but

[01:07:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4029s)
my point was that like if I kill the front end then uh of course uh it would

[01:07:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4036s)
get the heat on the back end so I can show this

[01:07:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4041s)
unfortunately okay so uh that's uh the demo part and let's move

[01:07:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4051s)
on so we went through the most complex part and uh now uh I'm going to explain

[01:07:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4061s)
how all of this stuff works so think about how you build uh binaries

[01:07:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4071s)
uh now most of uh build tools like make uh Ms build uh net build whatever they

[01:08:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4080s)
are incremental Builders which means that they uh build the final binary by

[01:08:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4087s)
building some intermediates from basically the very low level inputs like

[01:08:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4093s)
well files or like whatever they reference and uh so imagine that you

[01:08:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4101s)
change one of these files right for example services. CS

[01:08:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4106s)
then like whatever depends on this file kind of gets you you may think of like

[01:08:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4113s)
what incremental Builder does is that it kind of marks everything that depends on this file as stale or like

[01:08:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4121s)
invalidated and uh uh so for example if you want to build this thing up. ex

[01:08:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4129s)
there right and it will rebuild server. dll services. DL and so basic basically

[01:08:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4135s)
whatever was uh like on this path right and uh as for the rest it will simply

[01:09:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4143s)
reuse that right for example uidl is going to be reused and that's exactly

[01:09:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4149s)
what Fusion does uh like uh it might be unclear how it's relevant

[01:09:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4157s)
to what you saw but Fusion does exactly the same thing but for your functions so

[01:09:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4164s)
you like may look at your build processes function calls like where the

[01:09:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4169s)
argument like that's the function right you call and that's the argument and uh if

[01:09:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4176s)
Fusion gets a chance to transform these functions to such incremental Builders

[01:09:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4182s)
then like you would get exactly the same thing as incremental build there is one of samples by the way in I think it's

[01:09:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4192s)
uh probably hello world sample or something like this it does exactly this in like but like simulating exactly this

[01:10:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4201s)
but on top of fusion yeah or like uh so I think that's

[01:10:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4210s)
uh the same graph but with just different methods and different

[01:10:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4215s)
arguments so that's how Fusion works and I

[01:10:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4221s)
think the only thing you need to

[01:10:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4226s)
kind of add to so you already can like build or

[01:10:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4232s)
describe such graphs in your programs right by just calling functions the only

[01:10:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4238s)
missing piece is this like uh inv validation concept and I already shown

[01:10:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4244s)
you how it works in case with Fusion you basically use inv validation block and

[01:10:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4250s)
call functions which has to be marked as stale with like the arguments you pass

[01:10:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4256s)
there so that's nearly how it works now uh

[01:11:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4262s)
yeah and obviously like if you think about um I mean any modern app then like

[01:11:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4271s)
in reality you can think of it as you simply rebuild the UI when like by

[01:11:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4279s)
calling functions which call other functions and so so on and uh so if you

[01:11:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4284s)
have this feature right that basically marks uh certain call as stale and like

[01:11:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4292s)
you can rebuild the UI so uh as a reaction to some

[01:11:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4297s)
change okay so uh how Fusion works well it wraps

[01:11:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4307s)
your functions into basically higher order function uh decorator uh uh that

[01:11:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4316s)
adds this incremental build and caching behavior and uh a very

[01:12:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4323s)
very or like extremely simplified version of this decorator would look

[01:12:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4329s)
like this it produces a key from function and function you call I mean

[01:12:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4337s)
and it's input input includes This and like all the other arguments right then it looks into some cach trying to get

[01:12:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4346s)
basically a box that kind of describes previously computed value let's call

[01:12:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4352s)
this boxes computed right and uh well if it gets one it uses it uh otherwise

[01:12:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4361s)
locks uh well this key and tries to get it once more so it's basically a double

[01:12:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4367s)
check locking right and returns it if it finds it but if it can't find such a box

[01:12:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4374s)
then it basically it produces it and um uh so here like it basically creates the

[01:13:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4381s)
Box exposes it and then calls the function that is supposed to

[01:13:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4388s)
uh compute the value for this box and uh so

[01:13:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4393s)
interestingly uh if during the computation it gets calls to similar

[01:13:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4399s)
functions right then they will resolve with this use or this use or this use

[01:13:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4404s)
and since we exposed the current box and basically this thing allows them to

[01:13:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4410s)
register as dependencies in the current box and that's how it builds this graph

[01:13:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4416s)
of uh basically cached computed values uh each time it computes something it

[01:13:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4423s)
kind of updates or like rilds the small part of this graph so in reality it's way more

[01:13:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4430s)
complex than this way more complex because like first uh well

[01:13:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4436s)
uh you can't it's pseud code right you can write it on C and second is like

[01:14:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4441s)
it's a synchronous it's truly threat safe and like many many other things but ultimately it's basically does nearly

[01:14:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4449s)
this job okay and yeah if you think of like uh how so what happens with these

[01:14:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4458s)
boxes over their lifetime or like what happens with computations right and so

[01:14:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4465s)
Al you start the computation and get is result or error and like we can kind of

[01:14:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4471s)
draw a separate part for cancellation on that net so it's like in reality it's

[01:14:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4477s)
Herer but like special kind of here right and so with Fusion it kind of

[01:14:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4482s)
extends this thing uh since this thing produces a box that sits behind the scenes and no one kind of sees it except

[01:14:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4490s)
Fusion right then like B basically it Returns the value from this box but the

[01:14:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4496s)
Box itself stays and uh at some point later it may become

[01:15:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4504s)
invalidated uh so this is a very very ancient kind of Animation that I create

[01:15:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4510s)
on like how invalidation works so that's why this part it's like it's totally

[01:15:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4518s)
irrelevant uh right now it works a little bit differently but uh I think

[01:15:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4524s)
it's kind good in terms of illustrating what happens under the scene when some

[01:15:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4531s)
invalidation happens and then recomputation happens so we invalidate like let's say like one of low level

[01:15:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4538s)
values for example like on back end right and it invalidates everything until the front end that depends on it

[01:15:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4546s)
and then front end like decides okay I need to recompute this and then basically it rebuilds a set of nodes by

[01:15:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4552s)
and some of these noes May reuse other computed values implicitly so you

[01:15:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4558s)
like you don't have to do anything to for this to happen but like nevertheless

[01:16:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4563s)
that's nearly what happens under the

[01:16:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4568s)
food okay uh yeah so

[01:16:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4574s)
uh we will skip this part because I already shown how it works uh and uh I

[01:16:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4582s)
think uh we already kind of know what approximately happens when we

[01:16:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4588s)
invalidate or don't invalidate things now

[01:16:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4595s)
uh one other interesting part is like this Fusion client right so you saw that

[01:16:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4603s)
um web assembly client talks to the server and servers may talk to other

[01:16:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4609s)
servers like for example the backend um uh could

[01:16:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4615s)
talk with the uh sorry the front end API service could talk with backend service

[01:17:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4621s)
running on another poost so

[01:17:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4627s)
um and uh the reason why uh Fusion uses

[01:17:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4632s)
uh well basically a special client is that this protocol and that's

[01:17:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4640s)
the protocol you kind of normally use for like any other RPC service it

[01:17:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4646s)
doesn't work in Fusion case and you probably already know why it's not

[01:17:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4652s)
enough for Fusion so uh you see that like we throw one message to send the

[01:17:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4659s)
call and throw like the server responds with another message and delivers the

[01:17:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4664s)
result in case with Fusion there can be a third message uh called

[01:17:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4671s)
invalidate why I'm saying can be well because uh in

[01:17:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4676s)
reality uh I think for a majority of data that leaves on the

[01:18:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4684s)
client uh it doesn't get it uh even like

[01:18:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4690s)
I mean every session so um just think about this like most of user data most

[01:18:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4696s)
of like uh whatever you show it actually doesn't change so this part almost never

[01:18:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4703s)
happens in reality uh but nevertheless the protocol has to support this piece right and one other

[01:18:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4711s)
important thing is that like if you think about this uh it doesn't change

[01:18:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4716s)
anything that this piece exist in sense that like okay you uh so instead of like

[01:18:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4726s)
one one round trip you get like one plus maybe two uh Transmissions but in terms

[01:18:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4734s)
of like it doesn't change the big picture basically and this message is extremely short it basically tells that

[01:19:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4741s)
the call number three is now invalidated well and uh I think it worth

[01:19:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4748s)
mentioning that Fusion protocol also supports this thing it's like it basically it's designed in assumption

[01:19:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4755s)
that the client may have an offline cash for any result it gets so since this

[01:19:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4763s)
part is is kind of is here right then

[01:19:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4768s)
well basically when this message goes uh to the client it can evict the value from cash instantly right and uh

[01:19:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4776s)
basically if you don't have this piece then your client side cash is kind of useless because it's going to return uh

[01:19:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4784s)
well mostly it's going to return stale values I guess right and if you have this part on the other hand then like it

[01:19:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4792s)
becomes well basically extremely useful and you still need some extensions to

[01:19:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4797s)
the protocol right for example this kind of response much response that doesn't

[01:20:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4802s)
send the data back right um to make it

[01:20:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4808s)
work okay so

[01:20:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4815s)
um and now I think uh that's

[01:20:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4821s)
um like why this part explains why it's so efficient so if you think about the

[01:20:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4827s)
call that uh your client kind of wants to make

[01:20:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4833s)
right for example we want to get an item with certain ID right and if we think

[01:20:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4840s)
about the chances of how this call is going to be resolved then like I think

[01:20:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4846s)
the highest chance is that it's already computed on the client so basically the value is available right then like okay

[01:20:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4855s)
uh let's assume it's not computed then maybe it can be computed from other

[01:21:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4861s)
values on the client which are are already computed and okay if it's not

[01:21:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4867s)
this spot then maybe okay we resort to RPC but it can be computed on the server

[01:21:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4874s)
already and basically the same process repeats on server and like it may not hit the can server and so so on so

[01:21:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4881s)
that's why uh like so if you think about this it's exactly what incremental build does and that's why um Fusion is so

[01:21:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4889s)
efficient in terms of traffic in terms of like literally everything in terms of saving CPU Cycles Network traffic

[01:21:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4897s)
literally everything

[01:21:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4902s)
so it's kind of interesting to think of like how efficient uh

[01:21:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4910s)
it actually is right um and like how it translates into the

[01:21:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4919s)
number of calls per second for example or uh like so what's the speed up what's

[01:22:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4925s)
the actual speed up right and uh so there is a test uh you can run it I'll

[01:22:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4931s)
probably run it right now actually let me so what I want to run I want to run

[01:22:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4939s)
let's run it in Docker uh yeah this this thing is fine

[01:22:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4945s)
so I'm going to run it right now um yeah it's going to build but let me kind

[01:22:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4952s)
of um quickly show you the

[01:22:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4960s)
results so you will see near these results maybe

[01:22:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4965s)
a little bit uh less impressive because I'm going to run it uh with Docker right

[01:22:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4972s)
now and I'm also recording video I'm also um like I mean there's so basically

[01:22:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4979s)
a bunch of things are running on my machine right now but the point is so if

[01:23:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4987s)
you have a local Fusion service and it if it gets a chance to kind of cash a

[01:23:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4993s)
large percent of uh method calls in this case uh so this test uh like basically

[01:23:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5001s)
runs uh like uh a few hundred re ERS and the single writer that modifies

[01:23:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5007s)
continuously modifies one random uh item so I think the chance that it kind of

[01:23:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5014s)
gets uh basically if if it's about the local

[01:23:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5019s)
service then most of these calls are going to be resolved from like cash right and uh so when it hits this happy

[01:23:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5028s)
path scenario then it runs well 100 so

[01:23:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5033s)
it's basically something like I think if you run it on a single core it's going to be around 15 million calls per second

[01:24:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5042s)
per core in like uh my machine is more powerful but it's like I think 32 cores

[01:24:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5051s)
in reality so of course it can't scale like uh with

[01:24:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5056s)
literally uh no uh penalty but uh so it's uh 16

[01:24:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5065s)

165 million calls per second now the interesting part is that

[01:24:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5070s)
if you are going to use Fusion client for the same service and service is

[01:24:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5076s)
going to be located remotely then there will be almost no change the reason is that it just doesn't send the call right

[01:24:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5083s)
when it knows um that a given value is still consistent so like literally it's

[01:24:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5091s)
almost identical number of calls per second but like when you use a

[01:24:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5098s)
networking client Fusion client and that's why so remember the beginning of

[01:25:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5104s)
uh this talk right I was showing you uh service from actual chat like sorry

[01:25:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5109s)
small UI component from actual chat that renders the uh listening

[01:25:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5115s)
button and the quot looks like uses just local stuff and somehow it works so

[01:25:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5121s)
that's the reason why it works uh the reason is quite simple networking services like built on

[01:25:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5128s)
top of fusion I mean the services CL networking clients right built on top of fusion they nearly as efficient as like

[01:25:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5136s)
local services and I mean moreover they also cash calls so that's why uh like there

[01:25:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5144s)
is no difference between using like a service that reides on your machine or

[01:25:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5149s)
resides remotely and in most of cases there is like no

[01:25:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5155s)
difference uh and that's why the whole UI in actual chat is designed like this

[01:26:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5162s)
it's basically like just throws calls to different Services gets the data and

[01:26:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5168s)
feels like like it doesn't have to do any extra to kind of efficiently process

[01:26:13](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5173s)
it or uh react to something it just like sends the calls and gets the data

[01:26:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5182s)
rewraps it and shows in right okay

[01:26:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5189s)
Soh as for like some other results here uh so that's uh like uh so Fusion

[01:26:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5197s)
Service uh versus the same service but without Fusion uh decorator or proxy

[01:26:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5204s)
it's I think 1,000 times slower which is expected because this thing is go is

[01:26:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5210s)
going to database each time you call it here then like a few other interesting

[01:26:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5216s)
results is that like so this is a fusion networking client right smart client

[01:27:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5222s)
that knows when a value is still consistent and doesn't send the call so

[01:27:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5227s)
what if we replace it with like less smart client but based on the same

[01:27:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5234s)
protocol that Fusion uses so this like I'm going to uh record a video dedicated to this

[01:27:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5242s)
protocol basically uh uh that shows how efficient this protocol is but even here

[01:27:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5248s)
you can see that like uh if you basically strip off this feature with

[01:27:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5253s)
caching uh on the client then it's going to send something

[01:27:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5259s)
like uh 50 sorry uh 1.5 million calls

[01:27:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5265s)
per second and uh that's five times faster than HTTP client would do uh by

[01:27:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5274s)
wearing the same service um well and this is the result you would get in like normal case in

[01:28:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5283s)
sense that there is no Fusion no Fusion clim nothing so that's what you are

[01:28:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5290s)
expected to have in in case you don't add any extras and by the way nearly the

[01:28:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5295s)
same you would get nearly the same output if you would use r cach on top of

[01:28:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5301s)
that I mean together with this thing I'll show you why uh quite soon or maybe

[01:28:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5309s)
like maybe it's going to be in the next video

[01:28:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5316s)
okay so uh let's see uh what's the output right for

[01:28:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5324s)
our um Benchmark that we run in Docker so

[01:28:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5329s)
it's a kind of quite close to what you just so so it's like slightly lower

[01:28:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5337s)
numbers but still interestingly that https I mean the HTTP client like just

[01:29:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5343s)
inside the docker is it's marginally faster

[01:29:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5349s)
okay so let's let's stop this thing

[01:29:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5356s)
um oh let me show you one more thing related to uh our samples right

[01:29:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5364s)
um so is it running yeah it's running uh

[01:29:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5370s)
let's run console client for this sample because it's it's kind of

[01:29:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5376s)
interesting to see how it's going to work will it work so that's the

[01:29:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5386s)
sample oh my God I I want to run it

[01:29:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5395s)
let's stop console client uh I want to run it in uh

[01:30:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5401s)
dedicated now I mean yeah external

[01:30:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5410s)
conso mhm okay yeah

[01:30:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5416s)
let's can we do something like this uh

[01:30:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5422s)
yeah uh so since we are not authenticated I don't have to uh use any

[01:30:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5428s)
session ID it's still going to use the same set of items I mean Global one remember so I'm just uh okay I have to

[01:30:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5438s)
enter something I guess um basically there is some validation

[01:30:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5445s)
Logic for this station ID think uh doesn't allow you to use short IDs so

[01:30:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5455s)
um yeah these are our items right let's change

[01:31:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5462s)
something yeah it changed let's delete

[01:31:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5467s)
[Music] delete so it works uh so uh let me show you the client uh so as you might guess

[01:31:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5476s)
it's very simple up right and um

[01:31:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5486s)
uh yeah this [Music] one

[01:31:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5491s)
okay um

[01:31:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5499s)
so what do we have here so station ID let uh like Let's

[01:31:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5506s)
ignore this stuff what we do here is we build service provider by adding Fusion

[01:31:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5513s)
adding soet client add think authentication client to do API uh so this thing is used in like uh

[01:32:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5522s)
RPC demo part we don't need it here actually and we can comment it out but

[01:32:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5529s)
the point is like uh so how it gets these updates in real time right and

[01:32:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5534s)
then it like at some point it calls observe to do and uh you see that like

[01:32:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5542s)
what you can do is for example example you can create a new computed which is uh wrapping this

[01:32:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5551s)
computation you instantly update this because like this thing I mean this part

[01:32:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5556s)
can be executed synchronously and to compute something you need like uh to

[01:32:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5562s)
run a synchronous computation this thing this thing all of this is a synchronous

[01:32:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5567s)
right so we want B basically if uh we remove this part and the first value

[01:32:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5573s)
it's going to be output it's going to be the default basically for like this

[01:32:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5579s)
thing um and default uh for this for the type of

[01:33:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5586s)
like what's this so basically now in this case right okay and uh then you can observe

[01:33:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5597s)
changes like this there are lots of so these the overloads for changes methods

[01:33:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5603s)
and some other uh you see that for example there is an update delayer you can pass uh let me show

[01:33:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5611s)
you delayer get well so this is going to be one

[01:33:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5618s)
second delay and let's also yeah oh did I click stop consol client

[01:33:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5627s)
let's run it again so uh the first update is quick of

[01:33:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5635s)
course because we run it explicitly but like let

[01:34:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5640s)
me move it to so I click here one second

[01:34:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5645s)
later you see the change here and like that's the power of this abstraction

[01:34:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5651s)
basically it uh allows uh you to see things in inconsistent State and know

[01:34:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5658s)
about this okay uh I guess we are done with this this

[01:34:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5664s)
part um like what's the impact of all of this in real

[01:34:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5670s)
apps and uh you can find this chart in Fusion repository I mean on fusion page

[01:34:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5679s)
uh but basically it shows how uh our actual server responds to one of the

[01:34:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5686s)
most frequent calls chat get tile it's basically returns like five messages uh

[01:34:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5693s)
starting from from like certain uh boundary uh so you see that most of

[01:35:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5700s)
these calls are resolved in 30 microsc it's not milliseconds it's

[01:35:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5706s)
microsc and uh like we get timings like three milliseconds only when uh it

[01:35:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5714s)
actually hits the database um moreover I think what kind

[01:35:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5720s)
of what's important here is that like most of these calls are actually

[01:35:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5727s)
eliminated on the clients so these are the calls that kind of made it to the

[01:35:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5733s)
server uh and way more calls of course were eliminated on The Client because

[01:35:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5739s)
the value was still the same uh okay yeah that's a famous quote on cash

[01:35:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5747s)
in validation and unsurprisingly naming things uh so the interesting piece here

[01:35:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5754s)
is I guess that like Fusion offers a fancy solution to this

[01:36:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5761s)
problem now like how many calls are actually tracked in Fusion based apps so

[01:36:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5771s)
actual chart is a good example here and as you can see like uh in for example in

[01:36:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5778s)
my case it tracks I think uh more than 1,000 calls so basically these are the

[01:36:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5785s)
values it kind of watches on the server side

[01:36:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5790s)
observes um and it costs nothing like uh it

[01:36:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5797s)
moreover uh now I'm going to also show yeah so that's like how the actual uh

[01:36:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5805s)
cache looks like it uses index DB uh in case with actual chat not local storage

[01:36:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5811s)
because like local storage is like there are much more constraints right but uh

[01:36:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5817s)
you can see that uh so that's for def instance and that's why uh the number of

[01:37:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5822s)
Kiss is much lower here but it's still 600 uh so basically 600 results of

[01:37:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5829s)
calls are cached right and uh this is how actual Network

[01:37:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5835s)
traffic looks like uh so you see that that's the very beginning of the communication and the protocol used here

[01:37:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5841s)
is also a little bit kind of out dated I I think I made this screenshot maybe a

[01:37:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5848s)
month ago or so and I made a bunch of improvements to the protocol so right now it's much more efficient but the

[01:37:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5854s)
point is like you see that like after the handshake it sends again one big

[01:37:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5861s)
call with like well sorry one big packet which kind of packs a bunch of calls

[01:37:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5868s)
right and then like it starts getting uh so the first response is like almost 5

[01:37:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5874s)
kilobytes it also uh includes the data for like a number of calls you can see I

[01:38:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5881s)
think what's highlighted here is that like uh you even can see by the pattern

[01:38:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5887s)
that probably it's uh the same method that uh sorry the same kind of response

[01:38:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5896s)
and yeah that's match response telling that basically hey your value uh that's

[01:38:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5902s)
catched is still correct so okay we are getting to the

[01:38:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5909s)
very final part right now and

[01:38:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5914s)
uh there is a bunch of kind of comparison slides uh for what Fusion

[01:38:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5922s)
versus some more kind of well-known abstractions so for uh State Management

[01:38:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5930s)
abstractions like fluxer MX and Redux and there are many of them uh I think

[01:38:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5939s)
the key difference between fusion and them is that Fusion is distributed of

[01:39:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5944s)
course then it's also threat safe and as synchronous and that's important because

[01:39:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5950s)
uh this is what makes Fusion kind of a fit for server side piece so you don't

[01:39:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5956s)
have to use it on the client you can use it just on the server side and uh this will speed up your basically API

[01:39:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5966s)
um one other interesting thing is that like I think no one does the same stuff

[01:39:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5971s)
with methods as what Fusion does basically this kind of decoration part

[01:39:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5977s)
and impling cach implicit caching um yeah most of these

[01:39:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5984s)
obstructions they are very explicit in terms of like expressing that you want

[01:39:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5989s)
certain computation to be dependent on like like so there are no like methods

[01:39:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=5995s)
with you can just call right and um again it's quite important thing

[01:40:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6002s)
because that's what makes your code clean and readable uh well as for

[01:40:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6007s)
everything else I think uh uh yeah uh well I I'll probably skip it

[01:40:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6014s)
for now but you can read right there are of course like many other

[01:40:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6020s)
differences okay now so what people typically use to address

[01:40:27](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6027s)
these real time scenarios right and I think one of most well-known kind of

[01:40:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6033s)
combinations is signal R Plus radius um so uh why you may want to use

[01:40:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6041s)
Fusion instead well because uh it's simple versus easy and I think I'll get

[01:40:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6049s)
back to this part later and like uh we will touch this topic but the point

[01:40:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6055s)
is like Fusion offers a

[01:41:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6061s)
framework um something that like allows you to build uh

[01:41:09](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6069s)
well everything in a consistent fashion like every piece of realtime logic is

[01:41:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6076s)
going to look the same with fusion and as for signal and radius sorry signal R

[01:41:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6082s)
and radius uh yeah you will be basically doing the same but like each time you are going to

[01:41:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6088s)
solve the same problem again and again and in the end like of course this approach is way more error prone because

[01:41:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6096s)
all depends on a developer who works on a given part of the app and if they know

[01:41:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6102s)
how like uh to do it right then it's going to maybe work well but what if

[01:41:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6109s)
they don't right and uh so yeah and finally it's kind of it's a lot

[01:41:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6118s)
about reliability right so if the framework takes care of like uh making

[01:42:06](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6126s)
certain things work the same way it's actually way better than like when a

[01:42:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6134s)
developer a different developer uh each time takes care of the

[01:42:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6140s)
same problem CU like okay it may be solved in 80% of cases but like the

[01:42:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6146s)
remaining 20% are not going to work well and moreover these issues are extremely

[01:42:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6152s)
hard to debat or like even identify uh so I think the picture here

[01:42:38](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6158s)
is kind of shows that like yeah you can kind of drive on manual transmission but

[01:42:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6164s)
like who does it nowadays um so and I think the

[01:42:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6171s)
interesting scenario or like one interesting Cas is like graphql uh and

[01:42:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6177s)
similar protocols because they sort of uh at least the perception is that they

[01:43:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6184s)
can help you to solve the same problem and uh well the harsh truth is that not

[01:43:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6194s)
quite if you think about what Fusion does is like in terms of efficiency and

[01:43:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6200s)
so so on of course like graphql allows you to I'll basically reshape the results and filter out the stuff you

[01:43:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6206s)
don't need but like each time you refresh the page each time you start a

[01:43:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6211s)
client or like even like go to a certain part of UI maybe sometimes right you're

[01:43:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6217s)
going to get this data from server as a single huge box and that's what's shown

[01:43:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6223s)
on the right side right as for the fusion scenario you saw that like in

[01:43:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6230s)
reality first of all it kind of doesn't need this thing with well basically

[01:43:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6237s)
boxing everything into a single box it it does it like completely differently

[01:44:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6244s)
it allows you to literally like uh run the computation in such a way that the

[01:44:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6251s)
client uh well just uh sends request to

[01:44:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6257s)
each individual single small item and nevertheless all these requests give at

[01:44:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6263s)
once um and like literally in a single Network pocket and moreover the response

[01:44:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6269s)
will be much shorter because more likely than not they are cashed on the client

[01:44:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6274s)
so that's I think in case with actual chat for example the traffic you get on

[01:44:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6280s)
reconnect is typically just 10 kilobytes it's like when it reconnects or restart you restart the app you get 10 kilobyte

[01:44:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6287s)
of traffic uh for the sake of clarity I think in May I mean this year in May the

[01:44:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6294s)
traffic was about 1 Megabyte and that's uh before the moment we added this

[01:45:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6300s)
protocol that kind of uh I mean we added this extension for local caches and

[01:45:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6307s)
stuff like this uh because and I think that's what you are kind of expected to

[01:45:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6312s)
have with signal R sorry with graphql for example so yeah you you basically um

[01:45:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6318s)
you may uh optimize things and so so on but like if if there is nothing like

[01:45:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6325s)
this and the like there is no cash or if there is a cash that it's not like

[01:45:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6332s)
tweaked for tiny items you fetch individually there is so like you

[01:45:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6339s)
wouldn't get the same result and uh um yeah that's the

[01:45:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6346s)
scenario okay so there are a few more uh

[01:45:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6351s)
code examples from ual chat um and uh

[01:45:56](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6356s)
I'm not going to like um I guess um cover them in all the details I I'll

[01:46:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6363s)
just show that you can use all of this stuff so for example here uh this

[01:46:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6372s)
um stuff with observing a result of some computation you see that online 81 for

[01:46:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6379s)
example we call computer. new then create a computed which basically in the

[01:46:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6385s)
end it returns a single Boolean right but like it basically awaits when you either uh leave the uh homepage or your

[01:46:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6396s)
account changes and uh yeah you can like create a computer that computes this

[01:46:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6401s)
value and await for it and uh basically create some logic that based on this so

[01:46:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6407s)
you can observe literally the sequence of uh so you

[01:46:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6413s)
let me rephrase this you can await that uh user uh on like of your up takes a

[01:47:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6423s)
sequence of steps and hits certain State and uh the like you can do this uh

[01:47:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6431s)
because every piece of your UI uh is like Fusion based so for example like

[01:47:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6438s)
service that Returns the current user account right or the browser history service history is browser history

[01:47:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6445s)
service that that that knows the like where you are in the app I mean in which

[01:47:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6451s)
URL and like what steps you took um so basically if all of this is based on

[01:47:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6456s)
Fusion then you can just wait for certain state to

[01:47:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6462s)
happen and finally testing right so in tests you can use this construction

[01:47:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6468s)
which calls a bunch of uh compute methods to again a wait when certain

[01:47:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6474s)
assertion kind of passes through in this case it's like chat IDs should not

[01:47:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6479s)
contain chat ID right so basically like the list of chat IDs that is produced

[01:48:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6485s)
here it's like uh there is no more certain chat in your contacts here and

[01:48:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6491s)
yeah this when is going to wait for up to 10 seconds and like recompute this thing every time something changes and

[01:48:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6499s)
uh once uh well basically this thing doesn't an exception it exits more like

[01:48:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6505s)
otherwise it will fail if it cannot satisfy it in certain time out so you

[01:48:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6511s)
can use this stuff in tests oh and that's a very ancient

[01:48:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6517s)
example I think it's like one of other like one other trick you can do in all

[01:48:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6523s)
these compute methods it's like you basically get the current computed and automatically invalidated after a

[01:48:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6530s)
certain period of time uh to make this thing recompute if

[01:48:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6537s)
someone uh watches over it right if no one watches then uh well okay you

[01:49:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6542s)
invalidated it but like who cares but if someone observes the value of this thing

[01:49:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6548s)
or uses it in some other computer right then like uh uh they will see the change

[01:49:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6555s)
every second okay so uh I guess

[01:49:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6563s)
um the purpose of this talk was to kind of um give

[01:49:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6570s)
you um an impression of what Fusion is about and what kind of problems it

[01:49:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6577s)
solves and uh yeah there are probably more questions than answers but like

[01:49:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6585s)
uh I think thinking about questions or like asking questions is I guess the first step to get his answers and that's

[01:49:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6592s)
normal right uh

[01:49:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6597s)
so why all of this is so important uh in my opinion because you can rarely get a

[01:50:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6607s)
performance Simplicity and like low cost

[01:50:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6612s)
I mean if we are talking about implementing some real time stuff then Fusion is like extremely lowc cost

[01:50:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6619s)
solution I'll show you later like how how tiny is the amount of code

[01:50:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6624s)
responsible to for real time in actual chart for example and um so um basically you get

[01:50:34](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6634s)
like 100x performance uh nearly the same Simplicity as you used to have without

[01:50:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6640s)
real time and like like the cost of real time is nearly zero for you

[01:50:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6646s)
okay and yeah you saw these numbers already but that's the speed up you are

[01:50:51](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6651s)
guante you kind of get right uh and that's a visualization of this speed up

[01:50:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6659s)
I mean literally a single server May uh handle a lot that otherwise would be uh

[01:51:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6667s)
handled by hundred of servers and that's it's crazy

[01:51:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6675s)
right now like uh what are some other reasons or like what might be some other

[01:51:21](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6681s)
reasons for you to try all of that well there was a famous I mean there is a

[01:51:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6688s)
famous St overflow survey they run it every year and uh one of questions in

[01:51:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6693s)
the last one was like what causes the most frustration for

[01:51:40](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6700s)
developers um it's easy to predict the number one item right and it's the

[01:51:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6707s)
amount of technical do in like literally every system that lives for like

[01:51:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6715s)
years that's number one kind of downside

[01:52:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6721s)
or like now number one thing that bothers everyone well at least like if

[01:52:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6727s)
we're talking about developers right uh so

[01:52:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6735s)
uh what else developers care about they want to improve the quality of code they

[01:52:22](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6742s)
want want to learn you Tech and I'll skip a bunch of items and they want to contribute to open

[01:52:28](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6748s)
source and uh like think what what basically kind of checkboxes

[01:52:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6755s)
fusion uh crosses in this case and uh yeah speaking of simple

[01:52:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6763s)
versus easy um I mentioned this earlier there is a

[01:52:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6769s)
famous top which uh has exactly this name uh or like almost exactly this name

[01:52:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6777s)
simple Made Easy uh the author of this talk is the

[01:53:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6782s)
creator of closure and uh uh yeah it's all about

[01:53:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6787s)
like why it's important to um reduce the complexity of your

[01:53:15](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6795s)
system so the the chart shown here is uh

[01:53:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6804s)
um shows the long-term impact of all these changes basically uh uh his

[01:53:32](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6812s)
description of easy versus simple is nearly this easy is what's

[01:53:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6819s)
easy to use easy to learn and uh like basically requires zero efforts to kind

[01:53:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6826s)
of start to uh or like

[01:53:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6832s)
B basically easy is something that doesn't require you to invest some time

[01:53:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6839s)
to learn adopt and use and on contrary

[01:54:04](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6844s)
simple is something that may require a decent investment in the beginning but

[01:54:11](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6851s)
in the end it allows you to produce a code that everyone understands the

[01:54:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6857s)
maintainable code that kind of code that's easy to read so uh

[01:54:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6864s)
obviously yeah you can basically I think and it's also a lot about the level of

[01:54:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6870s)
obstruction right so simple can be of a higher level of abstraction and that's

[01:54:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6876s)
why it requires you to kind of invest into uh studying it or like using it but

[01:54:45](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6885s)
like easy can be like easy so no investment uh but the problem

[01:54:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6892s)
is that like basically if you use these like lowlevel abstraction things right

[01:54:58](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6898s)
then you will quickly get into a state where you're like the system you build becomes kind of unmaintainable and hard

[01:55:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6905s)
to evolve okay and uh I think this illustration is

[01:55:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6912s)
uh a good example of like what level of abstraction means or like what I guess

[01:55:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6918s)
simple versus easy means uh so if you don't know about Ayn weight then the Cod

[01:55:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6925s)
on the left looks perfectly fine for you like you may even think like okay uh

[01:55:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6933s)
probably there is no better way to do that right and uh on the other hand if

[01:55:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6939s)
you know about a SN weight then this code looks kind of dumb

[01:55:44](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6944s)
right so speaking of fusion that's what uh that's nearly what it does with

[01:55:52](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6952s)
your code it's like yeah it's well probably even better because like it

[01:55:57](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6957s)
like in reality your new code looks almost like what you would right

[01:56:03](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6963s)
otherwise without any real time stuff catching them blah blah blah okay

[01:56:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6970s)
uh so what's the cost of like using fusion and uh the cost of well basically

[01:56:18](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6978s)
building real time up on top of f

[01:56:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6984s)
uh so if you look uh at the bottom part of the screen

[01:56:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6989s)
you will see that I was searching for if invalidation do is

[01:56:35](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=6995s)
right uh and basically I counted the number of invalidation blocks in actual

[01:56:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7003s)
chat so the total number is 90 it's like 90

[01:56:49](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7009s)
blocks uh and I think the total number of lines of quot is something like I

[01:56:55](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7015s)
don't remember exactly but probably like 200,000 something like this um so it's a

[01:57:02](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7022s)
a tiny tiny percent of cod like literally tiny percent of cod that makes

[01:57:10](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7030s)
like probably like almost the whole real time so so at

[01:57:16](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7036s)
least except maybe some rare Parts it's like what uh allows seual chat to

[01:57:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7043s)
display changes in real time uh I think

[01:57:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7049s)
uh I also remember that like uh I wrote a smaller sample but kind of close to

[01:57:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7056s)
real life as well board games and the number of invalidation calls there was

[01:57:41](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7061s)
around I think 30 or so to the invalidation blocks so basically like

[01:57:46](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7066s)
the Delta between an up you can write in like a week or so and an up but you like

[01:57:53](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7073s)
your team may uh spend like years on uh

[01:57:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7079s)
it's like not that big so what are some other benefits of

[01:58:07](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7087s)
uh Fusion well that's one of such benefits right

[01:58:12](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7092s)
typically you can't have the same code for implementing uh Blazer server up and

[01:58:20](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7100s)
Blazer web assembly up but not with fusion with Fusion it's exactly the same

[01:58:26](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7106s)
code

[01:58:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7111s)
uh I already mentioned that but the same is applicable to monolith versus

[01:58:37](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7117s)
microservice scenario and uh again it's

[01:58:42](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7122s)
the same thing uh if every service you build behaves nearly the same way

[01:58:50](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7130s)
whether it's local or mod then like what stops you from turning a system that is

[01:58:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7139s)
completely local like running on single server into a distributed one

[01:59:05](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7145s)
nothing um so and yeah speaking of like many other evils you may face otherwise

[01:59:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7154s)
there are plenty of them uh it's um well literally a pleora of tools that

[01:59:24](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7164s)
may help you to uh Implement real time Behavior or caching or

[01:59:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7170s)
whatever but uh the problem is that like you need to learn all of them like all

[01:59:36](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7176s)
of them in most of cases and all of them have their own issues and so so on and

[01:59:43](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7183s)
even if you think about like such simple scenario as UI for example right with

[01:59:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7188s)
Fusion you don't need any extra on UI because like the abstraction works

[01:59:54](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7194s)
everywhere on UI or like on like server site it's the same thing right and uh if

[02:00:01](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7201s)
you don't use it then you need something like fluer or whatever and uh the same about I mean

[02:00:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7208s)
the same is applicable to caching and same is applicable to some like uh

[02:00:14](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7214s)
transmission protocol like signal ER and stuff like this and like you really need

[02:00:19](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7219s)
to kind of learn all of that and and Tackle problems associated with any of

[02:00:25](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7225s)
these uh tools so okay we are getting back to uh

[02:00:33](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7233s)
the repository slides I guess which means that we are almost in the end of

[02:00:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7239s)
this talk yeah that's the URL uh you need
