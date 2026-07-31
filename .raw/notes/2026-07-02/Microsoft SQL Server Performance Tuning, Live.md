---
title: "Microsoft SQL Server Performance Tuning, Live"
source: "https://www.youtube.com/watch?v=uDFX1YHfRqo"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2019-01-05
created: 2026-07-02
description: "Brent's session at Microsoft Ignite 2015 in Chicago. He covers trace flag 4199, columnstore indexes, scaling out to AG secondaries, Cardinality Estimator changes, delayed durability, in-memory OLTP, B"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=uDFX1YHfRqo)

Brent's session at Microsoft Ignite 2015 in Chicago. He covers trace flag 4199, columnstore indexes, scaling out to AG secondaries, Cardinality Estimator changes, delayed durability, in-memory OLTP, Buffer Pool Extensions, and more.

## Transcript

**0:00** · good morning ladies and gentlemen I feel sorry for you having to sit so close to all these unattractive people this is kind of how things go I said give me the smallest room possible cuz you know why wouldn't it just be fun to hang out like our families do plus it's Chicago and everything here is tiny I mean it looks really big like the conference but my apartment is like the size of a shoebox so today we're going to be talking about I keep wanting to call it watch brent toon servers Microsoft sequel server performance tuning live if you want to

**0:30** · ask questions live and you've got enough room to open your cell phone or tablet you can go over to ignite Microsoft comm search for that breakout code I have this the Yammer second screen up on my second laptop so I can see the questions that you ask although at least this room is nice and comfortable enough that you can just throw up your hand and stop and ask questions those poor suckers in the overflow room they don't have that luxury oh you snooze you lose so and it's not

**0:58** · all their fault because like it's really hard to get here from one session room to another the theme for this conference is I would walk 500 miles by the Proclaimers because that's basically what we're doing in between sessions so a little bit about myself before we get started I'm a Microsoft Certified Master in MVP which just means I've made a lot

**1:17** · of really expensive mistakes over the years and now I help other people avoid those same mistakes I've written a lot of tools and utilities and I'm blog extensively over at Brando's are calm I don't one of the few presenters here who doesn't work for Microsoft they would never hire somebody like me they just bring me in to present so that their employers employees look much smarter after my session is done so we're gonna start with a question what is a fast car

**1:44** · when I asked you to think about what is it that makes a car fast when we look at the car we drive versus the car we'd like to drive how do we describe the differences between those two and usually in my in-person classes I ask

**2:01** · people to turn to the person next to them and start describing that but for now I'm just going to ask you to stop and think for 10 seconds because I could never get all of you people to shut up when she's first start talking so thing for 10 seconds about but it is that you would describe a fast car with so well who said something what

**2:23** · engine ok the poor guys is he sitting on the floor in the back you can't even see me oh my goodness that's probably not being able to see me is probably the best seat in the house um so the way that most people will do it is they'll say I'm gonna go look at the dashboard on the car this is a picture of my car's dashboard the speedometer goes up to like a hundred and forty miles an hour I guarantee you my car won't do 140 if you throw it out of a plane but there's two

**2:50** · numbers on there that are important the speedometer in miles per hour tells you how fast that car can go and the tachometer right next to it the little thing that might my wife likes to call it the volume meter when it's all the way over the right-hand side the cars really loud that's why she doesn't use the manual transmission anymore after the incident the one over on the other

**3:13** · side is our shows us in rpms how hard the engine is working in order to go that fast generally we're used to glancing at the dashboard and seeing this all day long we can tell you how fast a car is in terms of miles per hour now turn around and think about how you would describe a fast sequel server over

**3:35** · and over again when people come up to me at conferences they say things like I have a big database I have a large table my server goes really fast and I say okay cool give me the numbers to describe that and everybody gets the same blank look well I never want you to have that blank look again so here's the metrics that you're going to use to describe whether or not your sequel server is fast first off batch requests per second is

**4:01** · how many queries per second your sequel server is handling there is a similar perfmon counter called transactions per second as it turns out not every query is a transaction so even though it sounds more accurate it's actually less accurate batch requests per second is your sequel server speedometer second down there is wait time per second for every second on the clock how many seconds does your sequel server spend waiting on stuff you want to

**4:34** · memorize these two things whenever you're dealing with a sequel server so that when you go to ask somebody how do I make this sequel server go faster it's a lot like going to a performance tuner and saying I need my car to go faster if you tell them it's doing about 30 miles an hour after they stop laughing at you they're going to tell you to just you know fix the flat tires on it and you're going to be able to go dramatically faster so I'm going to show you how to measure these and we're gonna take a few workloads and change sequel server features to see how they affect those

**5:05** · numbers today I'm going to be using the stack overflow database how many of us have seen stack overflow calm before okay so for those of you who haven't it's a website where you post all your hard questions about technology someone else does the work and you get to claim all of the credit because your boss hasn't heard about this website yet one of the cool things about this is they publish the whole database under Creative Commons so you can actually download it to your laptop and use it

### Stack Overflow

**5:35** · for demos I love Microsoft but I never want to see another bicycle adventureworks demo again as long as I live like that's like the most boring data in the world to me whereas I love looking at Stack Overflow questions because I can see things about technology I'm going to be using sequel query stress and I'll show you how that works and I'm going to talk you through how I gather these metrics we're gonna start in and jump right into the demos so I'll switch over here and now I have

**6:04** · sequel server management studio and I am running sequel server 2014 I was hoping that I'd be able to show you 2016 today but they begin you guys have been bombarded with all kinds of stuff that you're never actually going to be able to use in production for the next two years and by the time it comes out and your company's willing to use it you would have changed jobs anyway so we're going to just be talking about stuff you

**6:28** · can actually use today I have on here you know it's true I heard the guys the guys were laughing the hardest they've already got their resume out on like monster.com so I've got on here the stackoverflow database it's got things like users questions questions are just commonly hidden as posts is the way that they're described here votes is how we vote up and down answers over at Stack Overflow tags on questions like is it a Windows

**6:53** · question a Linux question and so forth everything in this demo script you guys actually have as part of my ignite resources you can go download this and play along with it at home when you get back now of course you're gonna see different performance numbers on your machines because you have different machines than I do that's okay it's still good for troubleshooting purposes I've got a link in here explaining how you go and get the stack overflow database it's about 60 gigs went over your end done and good all set up so now

**7:24** · normally you'll see presenters crippled their laptops they'll give it like one gig of ram or one core I'm taking off all my virtual servers handcuffs today I'm making sure that I have all my cores available and I'm even doing some best practices setups like setting my cost threshold for parallelism 250 I've got

**7:42** · reasons in there inside the query notes as to why I do this and why I recommend everyone do it just as a good practice for first getting started so I'm going to go through and run a bunch of scripts just to make sure that my sequel server is always up and running or is ready to go cuz being a presenter very often we leave our virtual machines and nasty states now I'm gonna pretend that my

**8:05** · whole sequel servers mission in life is just to run this query I'm going to show you harder and harder workloads as we go on but in the beginning I'm just gonna run this one go get me the total number of users or the total number of reputation points for all of my users in a certain date range now when I run this

**8:27** · when I hit execute it finishes pretty quickly I'm gonna grab bring up this so you can just see me run it over and over again it seems like it's going pretty quick so my end user should never complain unless

**8:42** · I hit the gas pedal unless I start doing a thousand of these per second over at Stack Overflow we do two to a 5,000 batch requests a second all day long so a query that takes a second may not really be acceptable so I need to be able to simulate load really hammering this query over and over again on my sequel server I'm gonna show you the tool that I use to do it and it's totally free it's at a Mechanics sequel

**9:09** · query stress sequel query stress will run any query that you want over and over again against your sequel server so what I'm going to do is go click the database button and I'm gonna tell it I want you to hit sequel prod 1 we're

**9:25** · gonna use my built-in account I could also use sequel authentication if I wanted to and then when I hit the drop down here to test it it lets me pick which database I'm going to run in I'm gonna run it in the stack overflow database and I'm gonna click test only because my tests always succeed and I like for things to work for me every now and then I'm gonna click OK and now I'm going to tell it what query I want to run so I'm gonna switch back over here into SSMS I'm gonna copy that all back out because I was never smart as a boy I

**9:56** · never learned to alt-tab correctly and then I'm gonna paste back out over here so now I have the query in sequel query stress how whoops how many times do I want it to run let's do a hundred thousand and let's do it across say 20 threads when I hit go sequel query

**10:15** · stress shows me the number of queries that have completed that's the iterations completed area over here on the right hand side and gives me statistics about how long this query is taking now I need to start measuring my sequel server and figure out what's going on with it is it coping well with this load if you were near the podium you could probably hear my laptop start to hover because the CPU fans will be going on here

**10:45** · pretty quickly my CPUs jump straight up to a hundred percent well of course we don't really want to do troubleshooting by using task manager over a remote desktop right that's where one of our diagnostic scripts comes in let's go take a look at something called SP ask

**11:01** · Brent so I'm gonna run it get way down here and you'll notice in the demo scripts I've got all kinds of comments in there it's like me talking you through the demos as you go through and run it later SP asked Brent what it does is it takes a five-second snapshot of what your sequel server is doing how many things like our high CPU utilization if you use

**11:25** · my SP blitz how many of you have used my SP blitz before ok cool you're my people the rest of you not so much I'll tolerate you anyway it gives you a prioritized to-do list of the problems on your server right now same thing here the first result set says this is the version of SPS brant the second one says hey bozo you have high CPU utilization so what exactly is high let's go take a

### High Cpu Utilization

**11:50** · look eighty-three percent so my sequel server is running an average of 83 percent right now and I get my dashboard numbers here it tells me that right now my sequel server is doing fifteen batch requests a second or as you could think of it as 15 miles an hour it also tells me how much wait time I have for every

**12:16** · second on the clock every core is waiting for three seconds now if you go to the URLs across each of these links it'll give you more details about how to interpret each of these metrics but for today I'm just gonna think of it as 15 miles an hour and the cars doing some weights if I was really good I would go

**12:38** · off and do query performance tuning I would figure out what's broken about that query and try to fix it but how many of us can't control the queries that run on our sequel server right and a lot of times the developers just tell us to shut up and deal with it right this is work fine on my machine so all right you have the same users or same developers I have Microsoft has kept execution plans pretty much the same since sequel Server 2005 one of the

**13:12** · really cool things about Microsoft is they would rather give you a stable sequel server than give you an unpredictable one they would rather not change the engine willy-nilly with every version upgrade this is why when you go and do upgrades you don't really stress out about query plans you stress out about doing things like backup and recovery or maybe how full text search changes but they've actually been really hard at work improving execution plans since 2005 they just don't show the

**13:46** · improvements to you by default because sometimes they're better sometimes they're the opposite of better as it turns out my particular query plan has an interesting thing going on with it if I go look at my query I've got this

**14:05** · query and I'm gonna go get the estimated execution plan sequel servers going hey man I'm gonna do a clustered index scan I'm gonna go scan across the whole entire table even though I have indexes that would make this run faster sequel server decides to choose not to use them Microsoft knows about this issue and they've built it a fix and I can turn that on let me show you how with

**14:36** · something called a trace flag now there's a trace flag that you can turn on 4199 and I see people writing down them hold your pens because things will get a little bit more interesting here in a second when I turn on $41.99 it gives me some of the execution plan improvements that have happened since 2005 they're not on by default but I can

**15:01** · turn them on as long as I know what they're doing it's like a bright crack break glass bang the switch kind of thing so let's go break the glass and turn that switch on but before I do it I want you to get a good look at sequel query stress and kind of notice

**15:17** · how the numbers are moving so look at that iterations completed and it's twenty four hundred twenty four thirty it's not particularly moving quickly let's go ahead and make use of all this beautiful screen real estate man Microsoft did a good job with the projectors here over on the right-hand side as my iterations completed I'm gonna go turn on that trace flag boom yeah yeah yeah that's kind of cool so I

**15:48** · have to be really quickly normally I would zoom in on that wait for a while but I got to go run SPS print to make sure I catch something kind of quickly because I want to go look at my speedometer but in a second I'm gonna run out of Road I am now doing 9,000 batch requests per second how many

**16:06** · people like that better than 13 yeah right now I am NOT saying you should turn that on all across the board and boom there goes a sequel query stress so go ahead and stop that guy the other thing that's interesting with that is when I go through and look at the execution plan for it now let me go back and find my query go see my execution

**16:27** · plan hey wait a minute it's not prescribing me a missing index anymore because there was an index there all along sequel server just decided not to use it now I know what you're thinking first thing I can get to a computer and a VPN I'm gonna go turn on trace flag $41.99 across the board hold off this is

**16:49** · one of those carefully crafted demos where I think about sequel server as a pie chart different workloads respond differently to different things I'm gonna give you a few tools that work for small pieces of the pie chart in a perfect world you would turn this on in a dev environment and test your ugliest queries there first to see if they made a difference or not but let's be honest most of you aren't going to do that you're all do it live because that's how you roll I know yes

**17:20** · this is why people come to my sessions because it hurts so close to home um so the thing that you need to know and one of the reasons that I'm not such a big fan of trace Flags is that you are getting an untested or less tested branch of the sequel server engine there are known problems with trace flag $41.99 and I'd rather not turn it on by

**17:42** · default for example cannot bulk load when I turn on trace flag 41 ninety nine and six ten running sequel server 2014 so I'm not a big fan of trace Flags and instead I'm going to show you something a little bit different I'm gonna turn off that trace flag and zoom back out

**18:03** · now normally when I go look at database properties if I right-click on database properties and I go into options here for the stack overflow database there's this compatibility level drop-down that everybody always gets drunk and plays around with they don't really understand what it means and they go as long as I leave it on an old one my bender will never know that I've moved to the cloud you know are things like that for a long

### Compatibility Level

**18:30** · time this is only influenced the way that T sequel gets interpreted it didn't really implement influence performance but starting with sequel server 2014 when you switch to the new compatibility

**18:45** · level when I change this to 2014 and hit OK I get the new cardinality estimator plus other improvements to the way that execution plans are built just by changing that I can suddenly get different query plans I love this when I

**19:07** · can't control the queries because my developers will often say things like if my third-party vendors will say things like you can't turn on trace flags that's unsupported but then when I ask them about things like compatibility level they're like well sure I guess we've never really tried that awesome the less you know and the better so we'll say okay now

**19:27** · what I've done is I've turned on compat level 2014 and I'm gonna run this command D BCC trace status this just shows you that I don't have any trace flags hidden up my sleeves there are no trace Flags turned on right now I don't have any trace flags turned on all I've done is set compat level to 2014 and now when I

**19:51** · go run my load test I get the same improvements that used to be bundled under the trace flag this thing is flying now even though I don't have the trace flags turned on wool sequel 2014

**20:08** · out-of-the-box better execution plans in 2014 compatibility level if you're one of those database administrators that's always left that as non-functional not really touched it after an upgrade now is time to start paying attention when you go off and implement this guy so let me show you the takeaways on this is I like to type all this stuff out because some people are verbal or some people are visible so if you're on sequel

### Takeaways

**20:35** · Server 2012 and you're not allowed to upgrade and you do have the time to do some testing play around with trace flag $41.99 and see if it makes your ugliest queries go faster if you don't get on sequel 2014 as quickly as you can do not

**20:51** · turn the comp at level 2 2014 immediately you know how it is with your users anytime you change anything they're gonna blame you for everything that happens afterwards so I want to minimize the number of things I'm changing I want to leave it in the old compat level when I first do the upgrade and then about two weeks later when the partying you know is stopped and everybody's not worried about continuously breaking and fixing things then I'll go switch it to 2014 compatibility level on a weekend and see

**21:20** · if I hear anybody screaming cuz sometimes query plans can actually get worse instead of better this is why I want to change it over a weekend rather than doing it on Monday morning now what's tough is unless you've got really good monitoring where it's hard to know which queries got better or worse this is where the next version of sequel Server 2016 has

**21:44** · something called the query store that will track what they call plan regressions I'm not gonna go into depth in this here I've already written about it on the blog and you can play around with it when the ctp comes out in the summer the beautiful part is you'll be able to spot quickly which queries got better or worse and you can pin the old 2012 execution plans to them without doing anything with your developers you can simply jump back to a better performing execution plan for that one query any questions about this piece so far you're all wrapped and paying

### Plan Regressions

**22:18** · attention oh my god you're all still thinking about the trace flag and no one's done anything on my Yammer either okay cool so that's one workload but now I want to work at a look at a different workload what I have here let me zoom out a little is a reporting system built atop Stack Overflow and I have things like show me which users do which kinds

**22:43** · of queries on which kinds of tags so this report users tags table is really wide it has all kinds of columns this is what a data warehouse fact table looks like there's like a couple of keys and then a gajillion measures questions answers questions last year questions this year and I can never predict what

**23:06** · my users are going to query they query any number of these columns trying to do analysis I'm going to show you what the data looks like first and then we're gonna go run a couple of analytical queries so the top thousand rows out of this table just to show you says things like for user ID 26 837 here's all the

**23:27** · tags he's played around with he's 41 years old I'm not happy about that but I had a birthday and these things go on the number of down votes I've done where I live my website all kinds of statistics about my answers on various tags well what my users like to do is they like to run queries that look like this and I'm going to zoom in to show you while it runs it's gonna take 30 to 60 seconds for this thing to run show me for every tag how

**24:00** · old are the users people who use this tag very frequently how old are they and think for a second if you use Stack Overflow what kinds of tags you're going to expect to see come up there now as

**24:16** · you can kind of expect with a data warehouse system I'm running up against 30 seconds here this is normal for what a data warehouse does data warehouse reporting queries take like 30 seconds 60 seconds and our users are usually just happy if it takes less than five minutes they go just please make sure my reporting queries don't timeout they're not happy about these kinds of runtimes but they're willing to live with it so our results as it turns out the oldest users do things like legacy code visual

**24:48** · sourcesafe Delphi 2010 and legacy okay so that kind of makes sense really old stuff not many of you were laughing it's okay that you're older than me and we'll go on to the next query that's out of here similar kind of analytical query which tags users have the lowest

**25:08** · reputation so if you go in and do certain kinds of work on Stack Overflow what are the kinds of users that never get uploaded maybe what are the tags that people don't appreciate very much same thing this thing's gonna take about 30 seconds in order to execute 19

**25:25** · seconds will take ten-second bio break here I'm bio breaks the wrong term that sounds like you're going to the bathroom it's a tightly packed room please don't do that but those of you in the overflow room go right ahead so now we see the top 10 or top you know 20 tags the ones that are unappreciated that people don't seem to like very much Wow okay that's cool I understand it's

**25:51** · whatever I don't make this stuff up um all kinds of similar questions and they always take about 30 seconds and when I look at those queries if I go back in there and take a look at the kinds of queries that we're doing it's really hard to index for these because the selects are different the wares are different the grouping buys are all over the place the order buys are all over the place so sequel server is introduced something that is amazing for those kinds of queries and I'm gonna go run a

**26:24** · all I know oh I'm gonna skip that one I'm gonna skip that one only because it's not fair let's do something else I there's Microsoft people in the room and I don't there's some things I don't want to show I might show that later if we have time so I'm going to create something called a non-clustered columnstore index normally when you

**26:45** · create an index in sequel server you don't want to include very many fields in it right you've seen the kind of fee indexes the database tuning advisor tells you to create they have like a hundred fields in them and then you create that index and everything goes slow non-clustered and clustered columnstore indexes are different it's

### Non-Clustered and Clustered Columnstore Indexes

**27:06** · kinda like creating an index for every single column but this index can be used together so that when my users query just five out of these 50 fields sequel server is able to jump directly to the individual columns and only get the data that it needs I like to think about

**27:26** · everything in sequel server being stored on 8k pages think of it just like a spreadsheet page it's got all of the columns on there but half the time I don't want all of the columns they're really crappy columns that I had to use because the data warehouse team made me so what this thing does is it creates a different copy of the table stored in a different kind of way while it creates

**27:51** · cuz it's gonna take about three minutes in order for this thing to get created I'm gonna copy something into another window and show you a little thought exercise with this if I created an index for every single column how well is that data going to compress

**28:12** · if I look at the first column user ID all the fields are the same well there's gonna be all of the users are in this table but any one user is going to have hundreds of records in here so I could just store that once and compress it massively this column for tags it's not going to compress very well age all these other columns are going to compress beautifully with columnstore indexes it's not unusual to get a 90%

**28:42** · compression rate on your data warehouse tables you know that terabyte table that sounds like it's so very big now what if you could get it down to just a hundred gigs and cache the whole thing in memory all of a sudden performance looks completely different now in my particular database we'll look at the sizes on these as this guy finishes he's still going which tells you something else interesting about columnstore indexes when in sequel server 2012 how

**29:14** · many of us still are only working with sequel Server 2012 and it's okay not to be ashamed I mean it's it's okay to be ashamed whatever you know you're all you're all ashamed here and my session the problem with 2012 is that when you create a columnstore index it immediately makes the table read-only how many of you can have read-only tables there's a lot less hands going up it could be useful for data warehouses

**29:38** · where you load everything in a batch process at night it actually turns out to be amazing for that starting with sequel server 2014 you can create a clustered columnstore index that is updatable which is perfect for your data warehouse fact tables and also in sequel server 2014 non-clustered columnstore that used to be like read-only in 2012 they're still read-only in 2014 but

### Create a Clustered Columnstore Index

**30:05** · that's ok because starting with sequel 2016 then those suddenly become writable so now this thing is created it took two minutes and 48 seconds let's go take a quick look at the table first let's right-click on my table here report users tabs and go to properties tags and look at storage data space this is how big my reporting table is 32 gigs the only index I have

**30:35** · on that table the non-clustered columnstore index has all of the fields on it and it's less than one gig this is magical for queries that are doing reporting stuff suddenly I can fit the whole data set and RAM whereas I couldn't before on this crappy laptop and of course I'm just saying that because it's a Microsoft conference it's actually an Apple laptop but I digress so now let's go back and run our

**31:01** · query again so remember our oldest users query so this is the one that tells me how old our oldest are excellent which popular tags users are the oldest I'm gonna hit execute and I'm gonna zoom back out and I'm gonna have to move the results pane around and you didn't clap because it went so fast let's try again execute this used to take 30 seconds two

**31:27** · seconds oh you're just doing that to be nice now it's not like I wrote the code and then we'll try another one we'll try one of my other ones which users have the lowest reputation let's go execute that boom done in less than a second boom boom boom boom boom boom boom then

**31:45** · going on down to the other one that I didn't even have the time to run boom it's done just that fast this is the magic of columnstore indexes and they truly are amazing if you have the right use case so what is the right use case

**32:02** · when we jump up and show you here here's where they make sense this section right here if you have a data warehouse type server where the biggest waits are waiting on storage to deliver all of your data your data is too big to fit into memory you have really wide tables and you only select a few columns of those and your users love doing grouping and aggregation non-clustered and clustered columnstore indexes can be pretty awesome in 20 throw in this I

**32:35** · can't talk about column store without plugging this guy Nikko news of our he's poor Portuguese see I can barely even say Portuguese let alone what his last name is nicko port comm columnstore this guy has an over-50 part blog series explaining all of the internals with columnstore indexes and how they work fantastic series of blog posts then sequel server 2016 gets even better

### Sequel Server 2016

**33:02** · here's the improvements in 2016 you can finally update your non-clustered columnstore indexes you can put regular indexes on top of clustered columnstore indexes better Sarge ability all kinds of really interesting improvements in one of my favorites being able to query them among always-on availability groups secondaries as well any questions about columnar indexes how many of you want to go back and play around with that when you get back to the office yeah awesome stuff I also put

**33:33** · a link to one of the sessions where the breakout sessions just dedicated to columnstore ignite arts already put up all of the videos on there so now I've been doing a lot of reads let's do something a little bit different what about workloads that are very write heavy in stack overflow everything is

**33:55** · considered a post whether it's a question or an answer anytime you ask something on Stack Overflow we call it a post pin it all goes into the post table and then on the side of Stack Overflow we actually track the view count for every question which sounds ridiculous you know a lot of us use things like web analytics I'm skipping a purpose perp of vendors name here this shows you how many hits your web pages get at Stack Overflow we actually track that stuff inside the database we have view count

**34:28** · materialized in the database you get to see that you can imagine on a website that gets two to ten thousand hits every single second updating that sucks you don't really want to update that live in the database and of course at Stack Overflow we don't every time you hit the database we don't do or every time you hit a website we don't directly update the database we queue those up but that's because the stackoverflow developers are way smarter than your

**34:55** · developers your developers are probably hitting the database every single time somebody hits the website so let's pretend that our developers up here are as bad as your developers I know it's hard to come comprehend and you came to this session in order to get away from that kind of thing so if I go through and I have the stored procedure update post views it goes through and bumps the number of views on a post every time I run it let's go get our buddy sequel

**35:26** · query stress and Hammer the daylights out of this to see what happens if I go copy paste this out and I jump into our buddy sequel query stress I know it's uh

**35:41** · makes me cough too so I've got that stored procedure in there now and I can go off and hit go and it's gonna run it's doing a decent clip I'm getting a couple thousand a second most likely if I go in and look at that it's short the truck and right along let's go in and run espy asked Brent to see what this thing looks like now I've added a

**36:05** · different parameter in SPS Brent for this one I'm turning on expert mode only because it gives me a little bit more information it doesn't do extra checks it just reveals more information about the checks that it did remember we talked about our speedometer being batch requests per second we're doing 11,000 miles an hour which is awesome I'm pretty happy with that but I have a weight type called write log my sequel

**36:35** · server is being bottlenecked because it can't write data to the transaction log fast enough the reason that I turned on expert mode here is that sequel server will give me or that to ask Brent will give me more detailed information saying for example we waited on this thing 23,000 times in order to write wait to the Tran true go right to the transaction log normally when people say

**37:00** · I need to make my transaction log go faster they knocking on the sand admins door that's usually not very effective right they throw us out and then they go off to their BMW and drive over to the steak house for lunch because San admins seem to make a lot of money a lot of us are probably used to having the 15-second IO warnings as well your i/o has taken more than 15 seconds in order to complete in the past our guidance for fixing right

**37:27** · log weights was just to make your storage faster or write less to the database but starting in sequel server 2014 there is an amazing button that you can push of course I love pushing buttons so let's go do it check this little command out alter database set delayed durability equals forced when I

### Alter Database Set Delayed Durability

**37:54** · run this what sequel server is going to start doing is considering your transactions committed even though they haven't hit the transaction log a lot of you are probably thinking that's dangerous you're right you get a gold star for the day this isn't something that you want to use for financial transactions payroll gambling or

**38:16** · whatever it is that you maybe with my gambling record you probably do want to erase all records of your history but let's go ahead and cancel this load test going he's really churning right along there and let's go change that database I got to move out of it in order to change it when we switch over and a master and run it all right so now I've gone through and I've set it to delayed durability this is also something that I can see at the databases option screen this is database level not server level

**38:46** · so I can set it for just my crappy databases that I don't really care about now let's go back through and run our transaction load test again go and run our SPS Brent again which will take about five seconds in order to check out its results now before we were doing

### Transaction Load Test

**39:07** · like 11,000 miles an hour now we're doing like 12,000 miles an hour which is better but not dramatic right but the interesting thing is my weight stats no longer say anything about right log Cacique well server just isn't even bothering waiting for my transaction log to say we're good it's just going yep the view counts are right get out of here and go on with the next transaction this is only good if

**39:36** · you have data that you're willing to walk away from and write log is your biggest wait for stuff like view counts this is perfect who cares if I lose 30 seconds worth of pageviews on a database this is also perfect for things like data warehouse staging tables where you're just gonna do the whole load and if the server crashes you could just restart the load again anyway you're probably going to have bigger problems but there's a gotcha in here and I have to say it because it's really important

**40:11** · you're okay losing transactions even when you gracefully shut the server down whether you accidentally shut the server down or you gracefully shut the server down sequel server does not guarantee that your transactions are not are going to hit the transaction log even if you

### If You Just Failover a Cluster Even if You Do It Manually the Only Way You Can Really Get around this Is To Run a Command That Flushes All Your Transactions and Hope and Pray no One Adds a Transaction before You Shut It Down or Fail It over Which Isn't Very Realistic so What some People Will Do and Is Totally Valid I'M Not Just Saying that You Have a Different Option for Delayed Durability Delayed Durability Can Be Allowed but Not Forced so that if You Have Crappy Transactions You Don't Really Care About like Updating View Hits What You Can Do Is Add that in Your Stored Procedure To Say I'M Going To Commit this Transaction

**40:31** · just failover a cluster even if you do it manually the only way you can really get around this is to run a command that flushes all your transactions and hope and pray no one adds a transaction before you shut it down or fail it over which isn't very realistic so what some people will do and is totally valid I'm not just saying that you have a different option for delayed durability delayed durability can be allowed but

**40:58** · not forced so that if you have crappy transactions you don't really care about like updating view hits what you can do is add that in your stored procedure to say I'm going to commit this transaction with delayed durability on this one is

**41:16** · flushable meaning who cares we're gonna flush it down the drain if we happen to fail the server over whereas the rest of my transaction logs transactions still get the good stuff they still only get persisted when they act get committed to disk it's a really

**41:31** · slick solution but only when we have that data that we're allowed to walk away from for me because I really care about this data I'm gonna turn that back off for the rest of today I'm gonna switch back to whoopsie-daisy I'm gonna switch back to regular so now I have delayed durability is turned off altogether because I'm not particularly concerned about losing my data here all

**41:56** · right any questions so far No all right good I'm not saying any people aren't smart I'm just saying that I'm a really good explainer all right so the next thing that we're gonna do is we're going to run what I call a noisy workload I've been showing you really simplistic ones so far oops oh I gotta cancel did I cancel him stop stop working I'm going to this is

**42:22** · one of the things with sequel query stress it is a little buggy it's actually really buggy and sometimes you have to force task sequel query stress add a mechanic if you're watching this cover your eyes oh it's not that I'm killing your children just you never really kept that child up to date anyway so I'm gonna go in and now run something that I call my noisy workload I have one

**42:49** · stored procedure but it's actually calling all kinds of other random stored procedures because I want to make this server look like the crazy one you have back at the office I have in the notes details on how you can mimic to this exact task because I want when I go and

**43:06** · look at the sequel server I want a server to look like it's got all kinds of crazy things going on and all kinds of crazy different weights so let's go through and run him he's not particularly fast there's your first warning that things aren't going pretty quickly and I don't even have to look at the speedometer I'm going to look at another tool at a mechanic's SP who is active how many of you have not seen who

**43:34** · is active before okay so for those of you if you don't bring anything else away from Microsoft ignite that conference ticket just paid for itself you've probably been using SP whoo which is built into the product or heaven forbid Activity Monitor which is like babe bell-bottoms in that no one should ever see you like that in public SP who is active instead does what it says on the tin it gives you the list of active queries and then you can

**44:04** · click on any one of them so I'm going to click on one and it gives me the exact query complete with the formatting in the way that the end user sent it in I can also do things like look at where it's coming from which login it's using who's blocking it

**44:22** · how many reads and writes it's done what its current status is where you go to break legs like which host it's coming from in this case everything's coming from my laptop when it started which crap the application it is I'm not saying dotnet is crap it's actually awesome it's just that my queries are really crappy so I'm running espy who is active to see what's going on on my sequel server right now and it gives me the oldest queries to the newest so it's saying these queries have

**44:52** · been running for like 16 seconds these have been running for only a few seconds I can execute this really quickly a few times to get a really quick idea of what my servers load looks like and I can see in here in this weight column what these queries are waiting on you don't have to

**45:12** · be a Microsoft certified master in order to guess that lck probably means locks one of these queries is holding locks that a bunch of other queries want if I look at the first query in that list which happens to be the blocker I can identify the blocker by looking at this session ID over here let me just drink it a little so I can get everything on one page these guys are being blocked by 65 these guys are being blocked by 67 here 67 this 65 guy here he's not

**45:41** · waiting on anything and there's no one blocking him as it turns out he's doing an insert into a table that everyone else wants to read from it's really common and sequel server did with blocking problems with some crappy query that's holding a lock on the entire table we've got multiple people trying to read from a table that everybody else is trying to write to sequel server ships with something called pessimistic locking turned on it

**46:11** · wants to be really really careful but since sequel server 2005 there's been an awesome option optimistic locking let me show you the command that's involved in order to configure this zoom down a little bit so you can see it this guy right here for Stack

**46:34** · Overflow we are going to turn on something called read committed snapshot as soon as I turn this on readers won't block writers and writers won't block readers think of this podium as my table

**46:51** · think of it as the phone book the white pages of the phone book that your grandpa used to have around on the refrigerator back before the intertubes and it's organized by last names so Adams bellman whatever all our names are I'm back I should have said back see there you go so ABCDEF if I'm reading through that

**47:11** · table and I get to Jane Doe and Jane Doe has a lock on her row I may have to wait for a second read committed snapshot when I turn that on as sequel servers got a lock on a row it makes a copy of the original row over in temp DB along with the timestamp so when I'm reading

**47:31** · through the table and I get to Jane Doe I go oh this has a timestamp that's newer than when my query started I can go look over in temp DB see Jane's row as of the time she started Mike where he started and then keep right on going even though there's a lock on James Rick James jane doe's row james row boy that

**47:50** · then the political joke start now the challenging thing with this is that I have to get everybody out of the database in order to do this so I'm going to cancel that query and then I'm going to change that setting about Stack Overflow reports now if I get hung up here that means someone else's in the database so this is one of those times where SP who is active comes in so insanely useful I can go SP who is active alright here's my query I'm

**48:20** · trying to do an alter database someone else is blocking me with a spit of 55 you just won my coffee don't you I see how it is now he wants my laptop oh my god there's a robbery in progress yeah you can yank that you can totally Eggman so someone is blocking my speed query 5554 is blocking mine so I'm gonna do exactly what you would do I would say kill 55 execute that and now his queries

**48:47** · out of my way and mine finished successfully well that one's mine that's seriously that's mine might be the other one guy the other one might be something else yeah yeah and there's a bag under there too that's it's like it's like a it's like a salvage sale I see how it is tell Sheree

**49:03** · by the way tell sherry she did a great job despite all the a/v gremlins woohoo alright so I now set on my altar database read committed snapshot and with no wait now I magically have turned this on and if I go back over and run my load test again so I'm gonna go fire off and go with my noisy workload you'll see it's moving faster but not necessarily dramatically faster let's go look at SP who is active again to see what's going on so SP who is active and of course

**49:37** · because I run a case-sensitive sequel server I have to get it exactly right so now before when I was running this you saw a blizzard of lakh weights you saw all kinds of them now you only see a few the selects are going through without a lock but writers still block writers so

**50:01** · in the example I have here the top guy is doing an insert the next three are doing deletes out of that same table I can't fix that I can't have multiple people not modifying the same rows at the same time but now at least I've gotten the selects to not be a problem at all and I've simply vaporized a great deal my locking problem a lot of other

**50:24** · database platforms ship with this feature on by default it's amazing and we're just as good as they are we just want to make sure you know what you're doing before you turn this on and we've got a great set of resources online showing you how that works let me go jump over here so here's when you turn that on you turn

**50:50** · it on when your biggest wait type is locking you can't fix the indexes or the queries and you're okay with the risks that we explained at /go slash our CSI some of them include for example your temp TB is going to suddenly get a lot busier and can get larger too because

**51:10** · you need enough space to store the version store you need to store all the copies of the rows that you're constantly changing so temp TV may not have been a problem before and it may suddenly be a problem when you turn on our CSI I don't want to warn you away from it it's not terrifying it's not a huge workload it's very rare like five percent of the time when I've seen turning that on caused a problem you just want to know about that before you go in and turn it on so we covered a lot of stuff today we

**51:41** · covered trace Flags columnstore indexes all kinds of fun stuff on that link I have a copy of a presentation for you to go take home with you when you go back to the office summing up what I just said here because I want you to be able to go back and explain the changes that you want to be able to make I also have

**52:04** · all a recap of the NBA type stuff that was revealed about sequel server 2014 during this week so it's kind of a what's new with sequel server 2016 it is licensed public domain I am giving it to you to do whatever you want those of you who are consultants are free to take my slide out even and pretend like you wrote it and add in the all those awful clipart pictures that you like to use my nice how it is and crazy fonts so that sums

**52:35** · up let me switch back over to the display here dudududu need to do oh my god my demos actually worked even though there was a strange man up here fondling my laptop so oh my poor baby so that

**52:50** · sums up everything that I wanted to teach you guys about here today what questions do you have about me before I know about sequel server I guess I could answer questions about me before you guys break off and take for a lunch I'll do like five minutes of questions and then just let everybody vaporize I will still stay here even after that yes yes

**53:16** · if if all my if all my developers say with no lock on their queries is it the same as our CSI the problem with no lock is this remember I was looking at Jane Doe I had this thing going across I can see Jane twice let's say I'm reading through and Jane hasn't updated anything after I read past Jane she gets married and moves to Smith I can see her twice or I can see her not at all so I

**53:45** · can start running at the beginning get past the DS and Miss Smith can change her name to doe and I'll never see her there's all kinds of gotchas with no locking I like no locking nothing wrong with it but our CSI helps you get accurate query results better than no lock does when the crappy thing is if you switch into our CSI without changing the developers to take off the no locks they still get dirty reads even though there's a perfectly good copy of the data for them and temp DB sequel servers like you want dirty reads I'll give you dirty reads yes next

**54:17** · question no you're all good all right well thanks everybody for hanging out with me go I have lots of fun eating those box lunches and I will see you guys around the back