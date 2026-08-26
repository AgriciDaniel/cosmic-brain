---
title: "Watch Brent Tune Queries 2020"
source: "https://www.youtube.com/watch?v=7hv4vD7Cfy0"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-01-31
created: 2026-07-02
description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=7hv4vD7Cfy0)

## Transcript

**0:00** · so all right howdy everybody in this session the pretty well and title sums it up pretty well watch Brent two inquiries whatever it says on the can that's exactly what you're going to get a Microsoft Certified Master just means I've spent a whole lot of time and money on sequel server trying to make the thing work successfully and now these days I tend to just help people putting out fires I do a lot of emergency

**0:21** · performance tuning type stuff and my work revolves in bringing a company from zero to hero with sequel server as quickly as I can I'm actually going to take off the earphone now cuz I get to talk the whole time and whooooo I don't really care what you say so what I have

**0:36** · to teach somebody how to do something it helps if I come up with some kind of acronym or some kind of abbreviations that I can use to boil down the subject into a tight little slogan and so I like to call my query tuning process the be creepy process didn't really start out that way but when I started laying out everything that I do I'm like oh the initials work out really well for this so in the be creepy process I start out

### B.E. C.R.E.E.P.I. Blitz first for obvious problems End user requirements gathering Capture query metrics Read the metrics and plan Experiment with the query cost

**1:02** · by blitzing the box I'll run SP blitz against the box look for s peopleit's index look for really big server level problems you're not gonna see me do that here because I know the sequel server that we're about to deal with I'm gonna spend only like five slides in PowerPoint then we're gonna switch over and actually two main queries but I'm gonna tell you about my process first so

**1:26** · one of tackling queries on a stranger's box though I'll go run SP Blitz as people it's indexed true story from an earlier job this week one of the clients that I went and looked at half of their CPU cores were disabled and of course that's why their queries were running slowly no need to look at execution plans when I can see a problem that big on the server the second part of the be creepy process is gathering the end user requirements so when somebody comes to me and they says Brant we need you to tune this query I'll ask them what I'd love to ask him is how fast do you need

### End user requirements "Can this code be changed, or is it machine-generated (ORM)?" "Can we run it less often, or run it somewhere else?" "How long do you want me on it?"

**1:59** · this to go but users don't know how to answer that question users just say things like as fast as you can make it go or really really quick so instead of asking them how fast they need it to go I'll ask them how long would you like me to spend working on this query one hour one day

**2:19** · or one week I got a friend of mine who spends his whole life working for a hedge fund he knows about about 10 queries but he knows them forwards and backwards he knows their execution plans he knows every time there's a cumulative update he knows how those execution plans are affected so he's the kind of person who can afford to spend one week per query me not so much but I ask that

**2:44** · in my end users just to kind of set expectations because sometimes there's only so much that I can do inside the span of an hour or a day especially when they bring me those 3,000 line Long's stored procedures with no documentation and like 50 incoming parameters and they don't tell me what parameters I should even use so as I'm working on it I actually keep a half-hour hourglass on my desk so that

**3:10** · every half-hour it kind of reminds me that I need to glance down and see how much progress I've made because when the sand runs out I know that I need to start pivoting towards maybe doing documentation or writing up whatever it was that I changed so I'm going to ask the end user about that then the C part of the be creepy process is capturing the real queries metrics

**3:32** · you can't tune based off of estimated execution plans and you'll see why when I start tuning my own query I'm gonna turn on set statistics IO and set statistics time on and then I'm going to turn on the actual execution plan I'm

**3:48** · not going to demonstrate a really long running query in this particular video although in other sessions I do demo with really long queries and I show you how to use live query stats and 2014 service pack 1 and Newark then the are part of the sequel servers will be creepy process comes in reading the metrics and the plan you're gonna see me take a look at the plan and try to decide am I trying to tune to read less data or do less CPU work queries are

**4:19** · generally slow because of one of those two reasons either they're reading too many eight cages they're scanning objects and sifting through all kinds of data were there doing something cpu-intensive they're crunching numbers they're slicing and dicing through XML they're doing like searches with a leading %

**4:40** · there are also rare less common cases where I go in tune to reduce blocking or tune to reduce the level of locking that a query takes I don't do that quite as often though then once I've read the queries metrics and I have a rough idea of what I'm looking at Demming us I'm gonna start experimenting with the query cost the more that you work with sequel server the more you start to recognize common anti-patterns where you go oh you know what a table variable is a bad idea here or maybe I don't want to sort 6

**5:10** · million rows worth of data inside sequel server maybe I could push that sorting down to the application tier instead or maybe I spot a user-defined function inside there that I might be able to rewrite and inline but I'm gonna try to do just one thing at a time trying to see if I can get the query to be dramatically faster if I don't see

**5:33** · something that I recognize off the top of my head cuz let's be honest often queries aren't ginormously long and I don't even know where to begin what you're gonna see me do is work through the execution plan from right to left top to bottom and I'm gonna focus on just one Operator at a time I'm gonna read through and say does sequel server understand how much work is going to be involved in this part of the query I'm going to be comparing sequel servers estimates versus actuals to see how close they are generally speaking when

### Execution plan review

**6:07** · sequel servers estimates versus actuals are within 10x you get a fairly accurate plan it may not be a fast plan but at least sequel server understands how much work is involved with that query when your estimates are more than 10x off sequel server probably didn't build an appropriate query plan for the amount of work that was actually involved maybe it decided to do big huge table scans when it really should have done and see or vice-versa maybe it chose to do

**6:39** · an index c-plus aqui look up a bajillion times when it really should have just scanned the whole entire table once this is really the biggest one for me most important most bang for the buck part of my query tuning process looking at those estimates versus actuals and trying to make them within 10x I don't want to say as close as possible because again I'm usually only dealing with 30 minutes but I need to get them within about say 10x later in the be

### Parallelism opportunities Is the query going parallel, and if so, is it benefitting? Does the cost exceed the Cost Threshold for Parallelism?

**7:07** · creepy process there's the P which are parallelism opportunities if I look at the execution plan and I go you know what this whole thing's single threaded and I'm pretty happy with the speed but I bet I could get it for X faster or 8x faster if I managed to get it to go parallel across multiple cores now when

**7:28** · I say for X or 8x faster that often sounds good to geeks like you and me but the reality is an end users they don't want 4x faster or 8x faster they want a hundred X faster or a thousand X faster and parallelism alone isn't usually the thing that gets me there so I tend to hold parallelism type stuff towards later in the be creepy process and then

**7:54** · finally there's the why of the be creepy process except it's an eye because the acronyms don't always work just the way you want them to I don't usually try to change the database to match my query I usually try to change the query to match the database I can't go in and build covering indexes for every single query although when I first get started with a database that has never felt the tender loving care of a database administrator they're often a lot of easy low-hanging

**8:25** · fruit that I can go in and take care of when I sum all these up this is the be creepy process and you don't always see me working through all these start to finish in exactly the same way but I'm going to try to work through them in a query here with you to show you roughly what my process looks like and in order

**8:46** · to do that I need queries to tune in a database to tune everything that you're gonna see me do here including the process that we just covered is all listed out databases queries you can download the whole thing from Brent Ozark comm slash go slash tuned queries it's all totally free it's all open source so that you can go repeat this process yourself as well well it's going

**9:10** · to sequel server let's start doing it okay so now we're looking at sequel server and I'm gonna be using sequel server 2019 through the course of this so sequel server 2019 but everything that I'm gonna show you is the same through sequel server 2008 really

**9:27** · forward there are some parts that are only available at newer versions I'll talk about those as I hit them so I'm going to be using the stack overflow database the stack overflow database the exact same database that a stack overflow makes publicly accessible it's all totally free and the reason why I like it so much is it's so easy to understand there are only a handful of tables inside of it and they're all fairly intuitive when I go and join between them back and forth so let's

**9:53** · start by going into the stack overflow database and then I'm gonna create an index on the post table just in order to make my demos go a little bit more quickly and I'm also going to be using sequel server 2017 compatibility level only because 2019 will end up using during the course of the session to show you how the execution plan starts to change as we move to sequel server 2019 now the query that I'm going to be tuning is this stored procedure right

**10:23** · here the stored procedure has two queries in it the first query goes and dumps a bunch of stuff into a temp table it says go find all of the users who are really interesting find people who have asked a whole lot or made a whole lot of downvotes upvotes they have high reputation and a whole lot of views basically looking for very high ranked users inside the stack overflow database then after I find them let's go back to that Tim take over to the post table my

**10:57** · report writer who decided to write this said it's way slower to go through and hit the post table first I'd rather go through and get all just the users that I want and then go back and hit the post table now if I go in if I look at the estimated execution plan on this it's taken forever to go create that index so because sequel server just restarted that's right I just had to bomb this thing outright when this thing first started watch brent create indexes look

**11:24** · at that awesome CPU power woohoo giving my sequel server CPUs a workout all right come on sequel server show off how fast you can create a query or creating index here come on big fella the Borsig poor computer this computer's having a rough day already right I've had a trash gotowebinar restart that thing now come on big fella come on with the indexes and you go come on now it's ridiculous

**11:55** · come on hop to it oh so there's a so just to say so there's a question that you would want to ask is how can you tell how far along a query is in creating an index if you're building a brand new index from scratch how can you tell how far along it is and for a long time a lot of us tried to use things like SP who is active if you run SP who

**12:16** · is active this is like the world default tool that people use in order to tell how busy a sequel server is if you use SP who is active there's a percent complete column and it doesn't actually populate for things like regular T sequel queries it only populates for things like backup and restore so there's a really brilliant blogger who came up with a way that you can tell so index creation Solomon ruts key site

**12:43** · deviate Stack Exchange calm sky wrote a query that you can use to track and see how quickly an index is being created and I'm gonna go dump this into the slack notes just for those of you who are following along over in slack as it happens of course whenever you go and threaten sequel server by trying to show something then all of a sudden he finishes up what do you mean it's gonna take a long time to be I'm totally done with that index what are you talking about those done minutes ago all right

**13:11** · so let's Becky says I love this I use it all the time me too it's really cool so I created my stored procedure and then I'm going to turn on my query tuning options I said I'm gonna go set statistics IO on IO and time on so that

**13:27** · I can measure my query then I'm going to go put the stored procedure into play and then I'm gonna go execute it fortunately for this one doesn't have any parameters so you sp report interesting users and go now I'm gonna ask my end user the person who brought me this query hey Alex how long do you want me to spend working on this query and Alex says well no more than an hour try to keep it

**13:53** · within an hour make as much progress as you can so what I'm gonna do is I'm gonna flip my little handy dandy half-hour hourglass to give myself a rough idea of when this thing runs out when I start to run out of time and after that half hour I made you just sum things up and try to take a different track now the first time that I run a

**14:13** · query especially when sequel server just restarted I don't want to put a whole lot of weight into clock time I'm not usually too worried about clock time I'm actually gonna run it again just because when sequel server first starts up queries can be artificially slow a sequel servers allocating memory now it

**14:32** · does seem to be taken a while though I can see why Alex brought me this query looks like it took about like 18 seconds the first time looks like it's gonna take about 18 17 seconds again the second time now if I'm gonna go tune this thing I need to think about how I'm

**14:49** · gonna go tackle it we talked about the be creepy process and I told you it was really important to go get the actual execution plan I said run the query get the actual execution plan and then we're gonna try to look to figure out a sequel server reading too much data or is it crunching through too much CPU stuff but rather than doing that what I'm gonna do is I'm going to show you why you shouldn't use the estimated plan if I go

**15:17** · through and if I look at this query and I show the components to it so here's this stored procedure the sequel server has these two big arrows inside here for example remember that our stored procedure has two parts first and dumps data into a temp table second it goes and does a select if you looked at the two of these the insert has a big ol arrow as if it's doing a whole lot of work and if you look at the estimated subtree cost on there it's 3,000 plus

**15:46** · but look at the bottom one estimated subtree cost is less than one those estimates are only what sequel server guessed before the query started they have nothing to do with how much work the query actually did all day long see

**16:03** · servers doing a great job of guessing how many rows are gonna come back what's gonna be the most expensive part of query but when someone like Alex brings you a query to go tune it's usually cos sequel server made a bad guess not because it made a good guess so I can't actually read anything out of this estimated plan instead I got to go over

**16:26** · and look at the actual plan that we just generated and here are the two queries top and bottom the top one says estimated sub tree cost a hundred percent bottom one says cost a zero percent but even on an actual query even when you've run it and you're looking at the actual query these are still the estimated plan costs and the really cool

**16:49** · way to see that because if you hover your mouse over that insert see House has 3000 estimated sub tree cost of 3,000 and the bottom one says an estimated sub tree cost of like one will look at the times and I'm gonna zoom in a little here so that you might be able to see it a little bit better look at the times of each operator see how this one says 8.8 for five seconds that's the

**17:16** · point in the query execution at which this operator finished and some of you are like wait my single server management studio doesn't look anything like this this is a quick good time to stop and remind you the sequel server management studio has been shipping like crazy lately they have put so many good

**17:34** · improvements out into sequel server management studio you want to be on the latest and greatest version of all times and you want to be on the latest and greatest cumulative update for your sequel server because ever since Microsoft had to start hosting as your sequel DB internally they started discovering all these problems oh my god scalar functions if they perform so bad how come how come nobody told us about this and so they've been building in all kinds of instrumentation into the execution plans to make it easier to see where things go wrong so the top query

**18:07** · finished it around eight point eight seconds if i zoom in a little bit more on the bottom query to to show between the two the second query also took like eight seconds we'll but wait a minute I thought one of them was way more expensive than the other I thought the top one was a hundred percent of the cost that was only the estimate same thing with estimated core subtree cost it doesn't mean anything at all when someone brings you a query to go to forget the percentages for cost

**18:39** · they're meaningless they don't mean anything at all even when you're looking at an actual execution plan that's why when I'm doing things like tuning stored procedures here's what I'll often do if I switch over and I run SP Blitz cache

**18:56** · Michael says in the slack he says is that the amount of time or is at that point in the timeline it's that point in the timeline and you can kind of see how this one finished at point eight four or five or eight four four this one finished at point eight four five what it doesn't indicate is when it started so maybe one of these operators started

**19:16** · right at the beginning of the query starting or maybe was only able to finish whenever the prior operator finished those numbers will be different based on different kinds of operators which is beyond what I can explain here but we do cover it in my master in query tuning class good question though so I should actually give you a little bit of a price for that there so now in here I

**19:42** · should actually give him an actual like prize over to in his slack chat I will give him a dancing banana so there he goes so how do I find out what statement in a plan I should focus the most on tuning well that's why I like SP blades cash stored proc name equals USP what's the name of our store products report interesting users so I can say sort order equals save duration or I can sort by CPU what this does SP blitz cache

**20:16** · gives me the top ten leaderboard of the most resource intensive queries in my planet or resource intensive plans inside my plan cache and will help me slice and dice lines I need to focus on tuning I'm not going to go into that either here though in the span of this class so here if I'm

**20:34** · gonna go look at these two and figure out which one I'm gonna tackle first most people would cover towards the hundred percent I'm gonna ignore the cost I'm gonna ignore things like clippies missing index request instead I'm gonna do exactly what I talked about in the be creepy process I'm gonna start at the top right operator in each one and I'm gonna compare estimates versus actual in the top right operator of the

**21:01** · first query sequel server how many rows did you think we're gonna come back from whatever this thing is it seems like whenever Microsoft wants to display information like they do on a tooltip they do one of two things they either display it alphabetically which makes no sense for query tuning or processing or else they load up the data cannon and they fire it at the screen and wherever the data happens to land that's where it lands here we're dealing with something that went through the data cannon so the data just estimates

**21:31** · versus actions are all over the place sometimes they say estimate sometimes they say actual so what I'm going to do is instead I'm gonna use the tooltips that are on each individual operator sever the labels on here see at the bottom how it says six of seven hundred and thirty nine thousand what that means is that we brought back six rows of

**21:53** · seven hundred thirty nine thousand expected well that's not good sequel server thought that through seven our 4/7 our 40,000 rows we're going to come back in reality only six of them did if I hover my mouse over here if I look down at the bottom the predicate tells me what sequel server was searching for this is where when estimates versus actuals are this far off and like sequel server

**22:20** · needs a little bit of help so let's go up and see what part of the query is so far off if I go up here and look and look at we're looking for what we're looking for out of the users table this right here is that filter and to

**22:35** · show it to you I'm gonna pop back over to the execution plan hover my mouse see how we're looking at the users table I'm gonna hover my mouse over the users table look down at the predicate and it's got that big complicated formula down in the predicate I really wish that

**22:52** · I could hover my mouse over part of a query and have sequel server highlight the part of the execution plan that was involved or vice versa unfortunately even in the year 2020 we don't have that yet so what I have to do is I have to kind of put that together to go oh this is the part right here the sequel server hasn't been able to figure out will an index help me if I created an index on

**23:18** · downvotes upvotes reputation and views will sequel server be able to have a better understanding of how many rows are going to match from that let's go see so let's say create index IX downvotes up votes reputation views on DB o users

**23:37** · down votes votes reputation views a sequel server gonna then be able to magically understand how many rows are going to match because whenever you create an index you also get a statistic on the same columns that are inside the index well I've created the index let's go see

**23:57** · if we run our stored procedure again whether or not it gets whether or not it uses the index and because some of you might wonder if the sequel server is going to automatically pick up an index after I created I'm gonna say with recompile just a forced sequel server to go and build a brand-new execution plan for this stored procedure now that I have an index on it let's go execute it let's go see what we get as a reminder before sequel server

**24:24** · thought that there were gonna be six words thought that there were going to be seven hundred and forty thousand rows coming back in actuality only six rows came back let's see what happens remember we're only looking to first query we're only looking at the first query up top so the first query up top the top right operator sad trombone sequel server still believes at 739 thousand rows come are going to come back now this is fair sequel server even

**24:53** · though it might have stats on each individual column it doesn't have any kind of stat as to how they all relate to each other imagine that you went down to the car dealership and you said I want a test drive all of the Fords that are Mustangs

**25:11** · now you and I know that Mustangs are Fords and so sequel sir your car dealer should be smart enough to say that all I really need to worry about is the filter on Mustangs it doesn't know that the filter on brand and the filter on model happen to tie into each other and neither the sequel server it doesn't have any kind of idea about how these two are related unless we tell it so

**25:38** · let's tell it so the way that you tell it something like that is you build a computed column alter table dbo users add magic interesting total as and let's go add these together copy these all out copy and paste now some of you who may

**25:59** · have played around with persisted computed columns before may note that I'm not using the keyword persisted here all I'm doing is I'm adding a computed column that sequel server is going to go through and calculate once I want to tell you and pause that here for a second as I do it cuz I'm gonna three to one and then hit execute and I want you to see how fast it goes even though this table has nine million rows in it three two one boom done and of course it's not

**26:28** · gonna work I have an error because I put au in there and when I really didn't need it you isn't that awesome totally ruins my sense of drama there that would have been so cool although I guess you all kind of like to see me fail too right I'm just like you I don't know what I'm doing either so now let's try that again three two one execute done this is what

**26:52** · happens when you don't persist a column and you'll see why I don't persist it in another way here again in a second now what I just did was I added a brand new column to the users table but sequel server's gonna calculate it on the fly each time it goes and selects the data out so you might think that that's not really going to help me here hey you know bozo would be right if you're in the right database Oh lovely see don't

**27:18** · you just love seeing me fail so here we go now I have this brand new column magic interesting total so you're like what's gonna help with that why is that gonna be any better ah because if I now run the query again

**27:35** · sequel server has added something else new and interesting to the table it's added statistics look at that all I did was add a computed column that's it I didn't create an index and now all of a sudden the queries running in five seconds instead of 17 what what let's go

**27:58** · over and take a look at the execution plan and something happen that's very different the shape of the first plan is totally different look up top here and I'll zoom in a little here so that we can see it a little bit better the top right operator remember I said we read from right to left top to bottom that's generally the thing that sequel server did first is where I'm interested in seeing how far off his estimates are and now look at his estimates they're down from like 700,000 down all the way to 600 what happened well whenever you add

**28:31** · a computed column not only does it add a column it also adds a statistic it adds a statistic this is the index that we already created but here's a statistic that sequel server added on that brand-new computed column what's that how do I

**28:49** · know that it's on the computed column well when you spend $20,000 to become a Microsoft Certified Master one of the things that they tell you is that statistics names are based on this is a system created statistic the programmers from Microsoft at the time were based out of that's right Washington it's a

**29:09** · Washington created statistic on the one two three four five the number in here in the next one is accidental notation of what column it is in the table one two three four five six seven eight nine 10 11 12 13 14 15

**29:27** · so there's hexadecimal notation for 15 I guess I'm not really good at hexadecimal so sequel server automatically added a stat on there and all of a sudden now sequel server goes Jamie says I've never seen computer calls before is it a new feature in sequel server yes it was brand new back in 2005 that's okay it

**29:48** · hasn't been that long it's just that the feature is old enough to drive now it's getting its learner's permit that's okay it's alright you didn't know you get a you get a prize too it's just not gonna be quite as cool of a prize it's gonna be what shall we give it we'll give you them monkey covering his eyes prize okay so

**30:07** · that's a good start now we've already cut the time down from like 17 seconds to 5 seconds because sequel server understands better how many rows are gonna come back it just so happens that that stat that it created didn't use with full scan whenever sequel server creates a brand new statistic automatically it doesn't update statistics with full scan it just creates the stat as fast as it can remember I counted down from 3 to 1 and it happened instantly we can give sequel server just a little bit of help by saying update statistics

**30:39** · dbo users with full scam telling sequel server hey ghost and rescan the entire users table and look at everybody stats just a little bit more carefully now when we run the stored procedure our estimates may be even more accurate instead of saying 602 now well as it

**31:03** · happens they're even less accurate now sequel servers like I think three thousand and not one hundred nineteen that's gonna be in there okay look we're still doing an index scan here so before when I was talking about a computed column I said I didn't persist it but

**31:23** · what if we wanted to rapidly get to just the people who met this very high bar what if instead of scanning an entire index to find all of the people whose upvotes plus down both plus reputation is more than a million what if I index that computed column now people have

**31:46** · done drew I think it's drew was putting that in as I drew out drew Holloway I've seen this a lot on the internet W a was part of the product when it was in Sybase developed in Waterloo Canada drew I'm gonna give you an up prize there that's kind of cool I'll give you n see hammer that's really neat oh that's pretty cool I'm totally putting that in the weekly links actually I need to email myself that after the drew that's fantastic see that me and you drew it's

**32:12** · really makes me angry as I spent twenty grand on a Microsoft Certified Master and they lined me now I should have just talked to you first drew and I would have gotten the right answer how much of a bummer is that now that just means that I need to go ask you more questions drew how old are you drew that you

**32:28** · remember that I have so many questions drew so and they drew it I want to go off I'll all email you afterwards all right so if I wanted to I could go further down that rat hole but here's the deal I'm now halfway out of time on my first 30-minute pass through this query so before I go far down too far down the rat hole for this I want to kind of zoom back up for a second let's go run the query again just to reset my view a little bit

**32:55** · I'm gonna run the query again remember when we first got started with this we decided to focus on the top query because the two of them were taking about the same amount of time the top one was taking 8 seconds and excuse me and the bottom one was taking about 8 seconds that's no longer the case now the top one is taking like 98

**33:19** · milliseconds screen tuning that I want to go to wherever the big bang for the buck is and now the bottom one is at 4 point some seconds that's the one I need to switch to performance tuning so I'm just gonna leave you as a side note if I was gonna tune the top one I would whoops to move them around a little I would probably look at trying to do an index econ thereby indexing that brand-new computed column here I don't need to though that top query at 98 milliseconds

**33:48** · ship it we're out of here but now let's go down to the bottom one and I said I read from right to left top to bottom looking for the place where my estimates versus actuals go to hell in a handbasket where they're more than like 10x off as long as they're within 10x I'm getting a reasonably good execution plan here ma

**34:10** · so the first one says 5 out of 5 now I'll move it around a little make it a little bit easier to see in the room there will zoom in a little bit look at this estimate is 5 vs. 5 okay that's not so bad here estimate mMmmm sequel someone believed it was going to pull back 360 rows it actually pulled back 88,000 rows so it was off by like 246 X

**34:39** · now going through the plans one at a time can be kind of a pain in the rear trying to find a place where estimates versus actual will go to hell in a handbasket so this is a place where I want to go show you a free tool real quick real quick I'm gonna right-click on this and I'm going to click view with century 1 plan Explorer century one plan

**34:58** · Explorer is a totally free tool that lets you visualize execution plans a little bit better than management studio I don't know about you but I don't get a lot of value out of the way the management Studios plans work so let's view with Matt with plan Explorer totally free they have a

**35:15** · version for both Windows and for Azure data studio as well have a really cool plan visualizer inside there and it looks a little different the first thing you're going to notice is that you're only looking at one execution plan at a time up top you get this little list of all the statements inside the stored procedure so you can choose which one you want to focus on visualizing you can click back and forth up here see how it also says estimates versus actual it kind of helps you see that out at a high level too I can also right-click in here

**35:47** · and I can zoom so that it fits a little bit better cuz I don't know about you but my eyes are getting old and I can't really see it so let's click zoom to fit so that it zooms why is it in the year 2020 the zoom to fit still so hard I'm not a

**36:06** · developer right I really shouldn't throw stones but I would think zoom to fit would be a little bit larger than it is here there's this auto fit down here that doesn't seem to be doing anything alright fine let's just click the old-fashioned way and zoom out you know you'll notice that there are highlighted things there are yellow bangs there are color codes depending on what you're trying to tune plant Explorer will let you filter for different things for example I'm gonna right click in here and I can say costs by you can choose to

**36:36** · show the costs either by CPU or by a IO or a combination one of my other favorite things is line widths I can see line widths by how much data is moving through between these different operators that's pretty spiffy but another thing the plan Explorer will get you that the conventional execution plans will not is little yellow bang stuff that really matters a lot now in

**37:02** · this example with plan Explorer that is yellow banged right there it says compute scaler it says warnings multiple executions of the user-defined functions may impact performance I'm going to switch back over to management studio to show you why I like plan Explorer so much for this Becky says way better if I

**37:24** · look down here its sequel server management studio all it is is a little calculator it's just like um I'm computing a new value what's the new value don't worry about that well I shouldn't worry about that even though it says zero percent cuz check out the times look at the times on each of these this operator finished at nineteen milliseconds in this operator finished in four hundred twenty nine milliseconds in separator finished at four seconds

**37:56** · something's happening inside that little box that's got a zero percent cost now if I hover my mouse over this we talked about in mastering query tuning about how sequel server has hard-coded costs built-in for some things for example it tries to cost out how expensive a key lookup is how expensive an index can is the cost both CPU and i/o costs for

**38:21** · scalar functions are hard-coded and they're not true they have nothing to do with what's happening inside that scalar function if I go look at my query even if I look down at the bottom of here I ask sequel server hey what are you doing he's like expression 1002 I'm like what is

**38:40** · expression 1002 well I'm gonna make you work for it you have to right-click into here I always use a guy's voice for sequel server because he's dumb and stubborn and refuses to ask for directions trust me I got this when he doesn't usually got this if I go in

**38:56** · symbols are what are you doing inside there nothing no reason to look don't look there okay you caught me I'm running a scalar function scalar functions are so evil and sequel server because they force the entire outer query to go single threaded no matter how large they are how much work they're doing and hey wouldn't it be really cool if I'm trying to sort a whole bunch of rows wouldn't it be really cool if I actually went pair low some of this stuff because I've got a lot of work to do the sequel server really hides that

**39:28** · from you just burying it under the zero percent cost and if I ask sequel server hey how come this thing didn't go parallel if I right-click on the select and go into properties he's like fine I couldn't validate I couldn't generate a valid parallel plan why I can't tell you that

**39:49** · sequel server doesn't show us that inside the execution plan just says sorry I couldn't bet and generate a valid parallel plan this is why said during the be creepy process one of the things that I'm gonna do is I'm just gonna glance at the query and see if anything jumps out at me that is a known anti pattern and scalar functions are a great example of a known anti pattern scalar functions have all kinds of terrible byproducts and it's really beyond the scope of what I can go through here but what I do want to see

**40:20** · sequel server 2019 I'm running on sequel server 2019 but right now I'm running my database in compat level 2017 if I go over and look at options over here right now I'm running under C compat level sequel server 2017 when I pop this

**40:41** · up to 2019 2019 brings one of the coolest features around scalar function inlining sequel server pops open the contents of that function and we'll run it just once and then figure out a better way of executing this query different operation orders of operations all kinds of interesting stuff all I have to do to make queries with scalar functions go faster is flip over into 2019 compat level because that's what the brochures say let's go see how it works so let's pop it into 2019 compat

**41:14** · level say ok and I don't even need to recompile a stored procedure or anything I'll just go through and run it again run that stored procedure and then go see how it does now before it was taken about five seconds in order to execute still taking about five seconds inside here but does the plan look different for this execution plan huh no it

**41:41** · doesn't I still have this scalar function inside here and just as compute scalar and it's taken up like four seconds of my execution plan well sequel server 2019 doesn't fix everything there are some kinds of functions that it can't inline so if you want to learn more about you can go into select star from sis modules believe it's sequel modules this

**42:05** · is a DMV that tells me about all of the procedures and functions that are inside my database create function FN get post type there's the function that I'm trying to use and if I scroll across come over a little bit further here it says it's inlinable when people are

**42:26** · thinking about going to sequel server 2019 the first thing that I want them to do is go restore their databases into sequel server 2019 and then go look to see if their functions are inlinable or not if they are you're a great candidate for sequel server 2019 because sequel server may be able to inline your functions but here's the catch it also depends on the contents of the query because sequel server can't inline functions everywhere inside queries like

**42:57** · group bys so I'm gonna have to do it the old-fashioned way I'm gonna have to break out that function and inline it myself let's go take a look at the contents of that function and go see what it is maybe if I'm lucky especially with now that I'm out of the first half-hour maybe I'm lucky and in the second half hour I'm gonna be able to inline this function and get across the finish line let's go take a look at what's inside that function that really

**43:26** · is one of the big reasons I absolutely adored the half hour hourglass thing is I don't want something that beeps and goes off and breaks me in the middle of my stride I want to be able to come to a point that's a natural could stop this while I'm doing that I want to be able to come to a point that's a natural breaking point for me where I feel like I glanced down and you'll notice as I go through my classes that I regularly glance down at those two just to remind myself of where I'm at and when I may need to pivot and change tactics start the clock again and off we go so here's FN get post type and then if I

**44:01** · look at this okay so it gets something from the post type stable and then if it doesn't exist it sets it is unknown ooh I bet I could rewrite this to go directly in line inside my query let's copy it out and then let's paste it into

**44:23** · our query down here and see if we can figure out how to inline it directly into our query so it looks like it's taking in we're passing in the post type ID so I might be able to say left outer join VBO post types PT on P post type ID

**44:42** · equals PT post type whoops no it's ID so there that'll give me an optional join to it now I need to figure out how to either bring back the type or I need to bring back unknown if it doesn't exist so to do that I'm gonna say I'm gonna break things out just a little bit on my query to make it easier to break this out on one line so I like saying replaced this with this oops come back over start now

**45:18** · we're gonna say coalesce which is my favorite word in all of T sequel it's not that it's really good for performance it usually sucks for performance but it sounds really nice when you say it coalesce it's really peaceful if I had a yacht I would name it coalesce coalesce takes the first non-nil value and I like this better than is null or no lift because it just sounds nicer and plus it takes multiple values instead of just two so here I can say PT looks like what was it type or unknown as we'll call this post type

**45:52** · name drew says thumbs up for colas and if drew says thumbs up you know it's good right because Drew's the one who informed us about W a being Waterloo and the friend of mine I believe Michael Schwartz in Waterloo now I got to go look at it and see so I got that I got this coalesced post post type thing inside here so I've replaced that now let's replace this because the function is called a few other times inside here let's replace that in now let's go see

**46:20** · how it works I'm going to put this stored procedure out into production execute then I'm also going to change my comp at level back to 2017 because in that didn't work for inlining the function and I want to restrict the number of things that I'm testing at any one given time all right so now we've got our stored procedure set up let's go see and move this down or view up and execute people are chanting from on high

**46:51** · we are now down to zero seconds if I go over and look at the execution plan and go look at the bottom and the second one now if I look at this guy I'm almost like I don't even care how things like estimated versus actual because now I'm down to zero seconds this thing runs absolutely instantly if I go back and

**47:11** · ask my end-users would you happy be happy with instant they're usually happy with instant now here's the deal remember how I said I flipped this thing and every time that I flipped this thing I kind of stopped when you find yourself spending about half an hour tuning a query that usually means you need to stop and make sure that you're still on the same right track and if improvements are good enough the

**47:36** · second half hour that you need to spend is actually doing things like testing because I don't even know that I got the same query results now the first the first change that I made was adding a computed column and that wouldn't have changed my query results but I would have to start writing out for my end-users my developers whatever here's the reasons why I added that computed column and here's why it made such a big difference this now is also how I like

**48:01** · to approach summing things up for the end-user Alex who asked me to improve the performance of this query here's the way that I write this up so what I'm gonna say is I'm going to say come down here to the end so originally query took

**48:20** · 18 seconds to fix it or I'll say phase 1 phase a hey whatever I added a computed column on users I'll copy paste this out

**48:37** · \[Music\] it isn't persisted but it's still help to the query drop to what was a 5 seconds I want to say it was 5 seconds overall phase B I added what did I do oh I inline the function I inlined the scaler user-defined function whatever that functions name was up here FN get post type I inline this I tried using

**49:11** · sequel server 29 teens Freud function inlining but it didn't help you now runs and zero seconds now time isn't

**49:29** · the only way that I like to measure queries another way that I like to measure queries is using logical reads and stats time you didn't see me using those at all inside the span of this class if I go look at the messages tab out here this is where I go in and usually copy paste this stuff out to see what before-and-afters look like and I'll look at this for both stats IO and

**49:52** · I'll also look at it for time you can kind of see that it's a hot mess inside here trying to read through all of this so what you do is you copy all of it out and then you go over in a web browser over to statistics parser comm then you

**50:10** · can copy paste in the results of says statistics I out on here and then you get a really nice like Excel style grid showing you how many logical reads were done and which tables they were done on if you go watch the other free versions

**50:25** · of watch brent toon queries where I tackle different problems like table variables and queries that take 30 to 60 to 90 seconds to run you'll see me gauge much more on logical reads it's just that inside the span of this class I wanted to show you something different than the other ones that I've done before so it's time to watch wrap up and talk about what the places where you can go and get this stuff if you go to Brent Ozark comm slash go slash to queries so

**50:54** · Brent Ozark aam slash and go slash to queries that'll take you to a page where you can go watch other versions of this same class plus you can download different watch Brent toon queries examples to see how I approach different problems okay let's come back out of

**51:12** · here when Garrett says hot mess so that is everything that I wanted to teach y'all today hopefully you had fun we'll see if there are any questions out there from either from slack or from the folks in Pensacola ah