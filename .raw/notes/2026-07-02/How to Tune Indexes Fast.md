---
title: "How to Tune Indexes Fast"
source: "https://www.youtube.com/watch?v=DRb3b3oDmt0"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-05-19
created: 2026-07-02
description: "Brent Ozar will show you how to use the latest features of sp_BlitzIndex to rapidly improve performance on an existing database. He'll show you how to figure out quickly if you've got too many indexes"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=DRb3b3oDmt0)

Brent Ozar will show you how to use the latest features of sp\_BlitzIndex to rapidly improve performance on an existing database. He'll show you how to figure out quickly if you've got too many indexes or not enough, and then demonstrate how to get advice from AI on how to consolidate them in seconds.

## Transcript

**0:00** · All right, good morning party people and welcome to SQL Server Spring Training, the first webcast uh that I'm doing in this series. Today we're going to be talking about how to tune your indexes quickly. I always feel guilty when I use the term fast, you know, like how to tune indexes fast. This is bad grammar, but it sounds really cool. How to tune indexes quickly. I I get that that's correct. it just doesn't sound quite as cool to me.

**0:29** · But then again, I guess that's why I'm in tech and I'm not a a grammar professional. Uh, so if you haven't worked with me before, my name is Brent Ozar. I'm a Microsoft certified master, which just means I made a lot of expensive mistakes with other people's databases, and now I get to help other people avoid those same mistakes. I focus on building tools and training that will help you uh get past emergency trough troubleshooting for performance problems quickly.

**0:59** · Now, I'm based personally out of Las Vegas. Tell me about you over in chat.

**1:04** · over in chat, tell me what part of the world you're in right now, what your job title is, and how many years you've been working with databases, where you're at, what you do, and how long you've been doing it. Let's go take a look over at Slack.

**1:23** · Oh, I think I touched the wrong button.

**1:24** · Uh oh, that actually works perfectly.

**1:26** · Oh, that's the right button after all.

**1:28** · Um, so we've got folks in from Canada, the United Kingdom.

**1:33** · Been no beard and color says, "Do let's do this." Lisbon, Portugal. Oh, that's a a beautiful place. I've been there myself as well. Tennessee, the United States. Uh, Mariah is the first person to correctly answer what I'd asked for.

**1:49** · I like Mariah already. Uh, who says that Mariah's uh from Buffalo, developer for 20 plus years. I grew up in West Michigan, so I am very familiar with the terrible lake effect snow y'all get over in the winter in Buffalo. Um, we got folks from the United Kingdom, Wisconsin, Los Angeles. I just flew back or got back from Los Angeles. Uh, yesterday we did a cruise uh from LA to Vancouver. It was a really nice repositioning cruise aboard the Virgin Brilliant Lady.

**2:20** · Um, so I always love stuff like this because it gives you a rough idea of the kinds of people that you're working with out in the uh uh stream there and it gives you an idea for where your priorities rank, where your training ranks re relative to everybody else. Although I do have to say already, you should give yourself a warm round of applause and a hug just for being willing to invest in your training by sitting in on these webcasts. I know the webcasts don't cost anything, but they cost your time and of course your time is very valuable.

**2:48** · So, let's go jump in and hop right back into the training.

**2:54** · So, what I'm going to be using for the demos is uh SQL Server 2025 in 2025 compat level. Nothing that I'm going to be teaching you here is new. Everything that I'm going to be showing you works with all currently supported versions of SQL Server, Azure SQL DB, Google Cloud SQL, and Amazon RDS SQL Server. I just always like using the latest versions so that you can see that there's nothing magic that SQL Server does for you. that the the problems that we're having today are the same as the problems that we really had 25 years ago in databases.

**3:25** · It's just that we have better tools now between open- source and AI type stuff to help us solve those problems more quickly. I'm going to be using a workstation with 16 cores, 96 gigs of RAM, and all local solid state just so that I can change indexes more quickly.

**3:38** · I'm using the latest and greatest version of Management Studio. I'm going to be showing you Copilot inside of here as well. Not that co-pilot is the answer necessarily, but I always like to compare. Whenever I'm going to do something, I like to compare what Copilot would have done versus what I would do, which also kind of explains why I still get paid to do this stuff.

**3:54** · You'll see why. I do like Copilot a lot.

**3:57** · I do enjoy using it quite a bit, and you'll see me lean on it there as well.

**4:01** · I'm using the largest version of the Stack Overflow database that's publicly available. You don't have to follow along with this, uh, but I like people to be able to run experiments, and this is my favorite database to run experiments on. and it's freely available and open downloaded open source for download. So what we're going to uh discuss today is we're going to talk about using SP Blitz first to gauge your situation.

**4:25** · I want to make sure that if you're going to waste time on index tuning or invest time, that's what I really should have said. If you're going to invest time in index tuning, I want to make sure that it's the right thing for you to be doing at the moment. maybe uh you might be needing to do server level settings instead or query tuning instead. Uh let's make sure that index tuning really makes sense for your environment.

**4:45** · Then I'm going to talk about general index guidelines and exceptions when it makes sense to to kind of go past those guidelines and then using splitz index AI and the consultant toolkit in order to gather database gather diagnostic information as quickly as possible and act on it as quickly as possible.

**5:08** · So let's start out with does your database actually need index tuning help before you start embarking on anything because of course whenever you learn about a thing in databases or tech period your first instinct when you learn how to use a hammer is you start looking around where can I use this hammer at you know somewhere and then everything looks like a nail. So, of course, the first thing that I want to do before I start throwing that hammer around is I want to figure out whether or not I actually need to use the hammer, I want to ask SQL Server, what have my queries been waiting on?

**5:39** · SQL Server's constantly tracking what it's been waiting on as it's been executing queries. Has it been waiting on CPU? Has it been waiting on storage, locks, latches, network, and so forth? The way that it tracks this is via DMV called CISDOS weight stats. And it's tracking this all the time and the numbers continuously pile up. The numbers just get higher.

**6:06** · Now, that kind of sucks because what you really want to know is you want to ask questions like, "Hey, during the week between 9:00 a.m. and 5:00 p.m., what has my server been waiting on?"

**6:21** · You can do that, but you're going to have to sample that stuff to disk.

**6:25** · You're going to have it's going to be up to you to set up an agent job to log that data every hour or every 15 minutes. And we talk about how to do that with my training classes and you can also buy thirdparty monitoring tools to do that. We're not going to do that today. I'm going to assume that you're walking into a SQL server cold and that you have to make a difference as quickly as possible in order to uh turn things around.

**6:49** · So because this data is tracked cumulatively since startup, it's going to be up to us to go just look at that since startup data and figure out whether or not it makes sense. This data also includes a lot of idle tracking.

**7:01** · SQL Server tracks what it's waiting on uh when uh uh it's doing things like backups when it's waiting. If you run a query that has wait for the wait for command in there, it includes timers for things like database mirroring, uh, service broker, waiting to see if there's an active task, all kinds of idle stuff. So, you need some kind of script or some kind of tool to filter out the garbage. My personal favorite, of course, is from the first responder kit, the open- source toolkit that I maintain. It's totally free.

**7:32** · It's licensed under the MIT license. You can do anything you want with this. You can charge customers for the output. You can use it to uh sell things. You can print it out and use it as toilet paper or whatever it is that you feel like. So, let's go use it. Let's go use SP Blitz first in my lab and see what my SQL server has been waiting on since it started up.

**7:58** · So, I've got in here a SQL server running uh SQL Server 2025. Let's go hop over into it. And so, I've got SQL Server 2025 here. It's been running for a little while. Let's go fire open and run SP Blitz first since startup equals 1. Now SP Blitzfirst does all kinds of things and I teach you how to do those in my totally free how I use the first responder kit class.

**8:24** · In here I'm only going to focus on one thing which is what my SQL server has been waiting on since it started up. Thus the send startup command.

**8:36** · Now remember SQL server keeps these weight stats cumulatively. So this is since this SQL server started up. That's what this hours sample column is right here. Hours sample. How much data do we have in terms of history here? About 3 and a half hours.

**8:55** · The longer that your server's been up, the better diagnostic data you're going to have. Except that's not really true.

**9:07** · What I mean by that is say that your SQL server's been up for 90 days or 6 months or a year.

**9:16** · The weight stats that you're experiencing now may be totally different than that blocking emergency you had 6 months ago or that time when you accidentally restored a database onto production and it burned up all kinds of CPU time. So for me personally, the sweet spot in how much wait time I'm looking or how much uptime I'm looking for for this diagnostics is somewhere between a week and two months.

**9:44** · If your server's been up for less than a week, you're not really getting a clear picture of what's going on on the server. Especially if you're running this on a Monday when this the business didn't do anything over the weekend and you had a regular restart or if it's more than two months. I don't trust that what's happening now on the server is the same. Plus, Microsoft ships patches to SQL Server every 30 to 60 days. All currently supported, going all the way back to SQL Server 2016.

**10:11** · Every currently supported version of SQL Server has had a patch in the last 60 days. I am not saying that you need to catch up with every single patch.

**10:22** · However, uh you even if you run one or two patches behind, you still have to patch every 60 days because these patches that have been coming out lately are mostly security patches. Now, M or over in chat, MI says, curious because it looks like all DBAs in the chat. Am I the only one doing am I the only dev and engineer tuning indexes and inspecting every query plans put out there? No, not at all. It's just that I'll tell you a dirty secret. A lot of database administrators have a lot of free time, so they end up doing stuff over on uh uh YouTube.

**10:55** · That's why they get really excited about things like free webcast showing up on YouTube because they're not really doing anything the rest of the time. All right, so coming back over here in my SQL server, I only have like three hours of uptime. So, I wouldn't normally put a lot of work into performance tuning this, but we're going to to stick in with this as if this thing had been up for a couple of days or several days. The next column in here, thread time. This is how much time SQL Server has spent running queries.

**11:30** · That your first instinct might be, hold on a second, the server's only been up for 3 hours. How have we been running 61 hours worth of queries? Well, remember queries can go parallel across multiple cores and this number includes parallelism. Queries can go parallel across multiple cores and of course your SQL server can stack up multiple queries at the same time. The higher this number is relative to uptime, the harder your servers working.

**11:58** · So, for example, here, if my server's only been up for 3 hours and I've run 60 hours worth of queries, my server has been running or been working really, really hard.

**12:12** · Uh, Juan, I see your question over in chat. However, it is completely unrelated to the thing that we're talking about here. So, I'm going to hold it for later. Later on, I'll have an open time where people want to just ask me, "Hey, Brent, how are you so handsome?" And we'll cover those questions later. But everyone else here knows how handsome I am. So I'm not going to cover that.

**12:36** · Continuing on. So the first thing that we're going to see here is if you want to know how busy the server is, compare these two numbers. And the higher this number is and the lower this number is, it tells you how busy this server is.

**12:48** · Under the 61 hours worth of time that we've spent waiting on running queries so far. Now we have the weight stats which is what SQL Server has been waiting on while it was executing queries. And if you add up all of these times minus that, it'll tell you how much time has actually been spent executing as opposed to waiting on stuff. If I'm trying to make my queries run faster, I want to wait as little as possible.

**13:26** · If I want my queries to wait as little as possible, I want to find what they've been waiting on and work on dropping this time.

**13:36** · Now, your SQL server could be waiting on all kinds of things. There are hundreds of weight types, some of them documented, some not. So, when you're looking at yours, I'm going to show you a cheat sheet here in a second. If I'm if you're looking at yours and you don't recognize what one of the weight types is, if you go over here to the far right of SPLIT's first output, there's also a URL here that links over to SQL Skills, they have a weight stats library for every weight type out there where they've got technical details on what that weight type means.

**14:08** · But in terms of an index tuning class, I'm going to take this list and I'm going to tell you whatever your top one weight type is, I want you to compare it against the list that I'm going to show you up here on this next screen. Let's go back over to PowerPoint.

**14:32** · So, back over here on PowerPoint, if uh then you what you'll do is you'll take a look at your most common your number one weight type and figure out if it's in this list. If it's in this list, odds are index tuning is going to help you. Now, for I can't explain everything in the scope of an index tuning class.

**14:56** · It's always tough as a presenter like what parts I'm going to show you. And I've already kind of gone off the ranch in the sense that I'm teaching you weight stats troubleshooting in an index tuning class, but I got to make sure that you only do index tuning in cases where it's going to be appropriate.

**15:10** · So, there are going to be things that I can teach you and there are going to be things that I can't teach you. What some of your top weight stats are going to be CX consumer, CX port, uh, uh, CX packet.

**15:21** · Anything that starts with CX, we're going to ignore for the scope of this class. Move on down to the first weight stat past CX.

**15:32** · And I can teach you CX, but that's in another class. Your princess is in another castle.

**15:38** · Uh, if your top weight type is page IO latch, that means waiting to read uncashed data from data files. And usually what this means is that you've been you've had something in your wear clause that you don't have an index on.

**15:56** · Show me all the sales where the category equals widget and you don't have an index on category perhaps. Show me all the users whose favorite food is Chinese food and you don't have an index on the column for favorite food. So when we see page io latch weights as our top weight type, I probably need more indexes or at least better indexes.

**16:24** · If my top weight stat is SOSuler yield, that stands for SQL operating system scheduler, which is kind of like a processor. Means that a query is waiting is has yielded the CPU and is waiting to get back on the CPU. You could read that

**16:42** · as it means we don't have enough CPU power, but your cheap boss, and I know your boss is cheap because you're here for a free YouTube video, your cheap boss is not going to add more CPU power to the SQL server because SQL server's licensing is relatively expensive.

**17:00** · This isn't always caused by indexes, but when it is, it's because the data that we want is cached up in memory. We're not having to wait to read from storage.

**17:11** · However, we've asked for that data to be sorted, joined, or grouped. And we don't have indexes in order to support that sorting, joining, or grouping.

**17:23** · So, this is a little different because normally when I think about adding indexes, I think about the wear clause where username equals whatever. Here though, we're going to be looking at the joins, group buys, and order buys of our query in order to index to support those.

**17:39** · And then finally, if your top weight type is locking, that means that someone else is holding a lock on an object and you're waiting to get a lock on that object, either because you want to read it or because you want to write from it.

**17:52** · So, I want to think about how quickly transactions can happen. How do transactions happen? What makes them slow? If I go do an insert, update or delete, there are two components to that. One component is that I have to find the rows that are affected as quickly as possible. The second component is that I have to whenever I'm going to make changes, I'm going to insert, update, or delete. I got to go grab locks across all the different indexes on that table that are affected.

**18:21** · The more indexes that I have, the slower my inserts, updates, and deletes are going to go.

**18:28** · So when my top weight type is locking, I need to strike a balance. I need to have enough indexes to make part number one fast, but not so many indexes that part number two becomes slow.

**18:46** · This is kind of a balancing act. When you see locking, that doesn't mean that you necessarily have too many indexes, that you have not enough indexes. It just means that you don't have the right amount of indexes.

**18:59** · There are several other weight types where indexing doesn't help nearly as much. Write log hater sync commit async network IO backup weights and again CX weights that are outside the scope of this class. I'm not saying that they will never help, but I'm saying if you see these weights at the top of your weight stats list, you probably don't need to watch the rest of this webcast.

**19:21** · you can go back to sort looking for cat girls or people getting hit by fences or whatever it else that you need to uh look at. Um now uh uh Ricardo, you asked a uh question. That question is completely unrelated to what we're covering here. So we're going to hold that till the end and where we'll have an open free-for-all for uh people who want to ask what my shoe size is and ask me to aim the camera lower.

**19:47** · Uh something that to think about weight stats are system level. They're at the entire and I'm I'm a little vague when I say system level. What I mean by that is for Azure SQL DB they're database level which means that they include all of the tables and indexes in a particular database.

**20:06** · in SQL Server and Amazon RDS and Google Cloud SQL and uh Azure SQL DB managed instances they're at the database server level which means that not only all the tables and indexes but also all of the databases on that server whether the ones they're the ones that you want care about or not in a perfect world we would

**20:26** · have weight stats at the object level so we could see if we were having problems on a particular uh index or table if I could tell that we're spending a lot of CPU time on a particular ular table if I'm we're spending a lot of time waiting to read from disk on a particular table we don't have that capability in SQL

**20:43** · server and I always think about am are we going to get something whenever I tell people are we don't have something that your next instinct is going to be are we ever going to get that and I think probably not because I think most people don't even know that they would want to ask for it we we have been asking for database level weight stats in SQL server for a number of years I I I don't see any progress on making that happen.

**21:05** · Okay. So if your top weight types include page io latch uh uh SOSuler yield or locking if weight stats do say that your indexing will or the indexing is needs to be done. Now we got to got to start start querying a different set of management tables in SQL Server that track whether our indexes are uh under heavy loads, whether they're being read from a lot, whether they're useless, and so forth. My favorite way to query that is with SP Blitz index.

**21:35** · Splitz index is also an open- source script that's out of our first responder kit. And we're going to start by using it with splitz index get all databases equals 1. If you are the kind of person who can only tune one database on the server, you don't need this parameter. You can just run splitz index in the database you care about and you'll only get that advice in that one database. There's also a database name parameter that you can pass in if you want to look at a specific database.

**22:06** · But just run it in the database that you want. You'll get advice on that particular database.

**22:13** · Before I start showing you that output, I need to explain how the output is sorted.

**22:22** · The output is sorted based on my death method. Where whenever I'm going to teach you something and I use this method over in my uh fundamentals of index tuning class and my mastering index tuning class, whenever I'm going to teach you something, I got to give you a way to remember it that's going to be kind of catchy. And so the way that I named the way that I work through indexes is I call it the death method because I wrote out everything that I did while I was doing index tuning.

**22:48** · And I'm like, "All right, well, I ddup and eliminate indexes to get rid of the extra dead weight. Then I go through and add desperately needed indexes based on SQL servers missing index DMVs. Then I'll tune indexes that are still left over uh uh waiting looking for specific queries that are doing a lot of reads of CPU. And then finally, for political reasons, heaps usually need clustered indexes. I usually put that last because I want to gain credibility first.

**23:19** · SP Blitz index is a tool that I use all the time in that work and in the training. So the output is organized in that order. However, remember your servers weights, what we just talked about a second ago when we ran SP Blitz first and I said, "Show me your server's top weight types."

**23:36** · If your top weight types are page io latch and SOSuler yield, then you're going to be focused on adding missing indexes because it doesn't mean that you have too many indexes. If you're wait if you're waiting on storage or waiting on CPU, you probably don't have too many indexes.

**24:00** · Your users aren't complaining in a way that would help you that removing indexes would make a difference. They really need more indexes. So, I'm explaining that to you because I even though this output is prioritized in this order, if your weight types are page io latch or SOSuler yield, I don't want you wasting time on this. I need you to jump down to here so that people can see a difference. That's why I tie your weight stats over to what uh indexing work needs to be done.

**24:31** · If on the other hand your top weight type is locking LC LCK weights uh then that means you may have too many indexes. Now remember we don't know if you have too many or not enough. And in order to figure that out we're going to have to go look at your indexes and do a review of them. And by we I mean you you and your friend chat GPT or Claude or whatever. Um so for those you're going to follow through the entire output of the death method.

**25:02** · All right, let's go see how it looks.

**25:03** · Let's go pop open uh uh our SQL Server Management Studio again.

**25:09** · Now, in the case of mine, in the case of my particular server here, my top weight type on this particular box, oopsy daisy, let me get that helpful autotune IntelliSense out the way. Um, my particular top weight type in here is SOS or yield, meaning I need to start thinking about indexing for group buys, order buys, things like that. I need to focus on adding indexes that are desperately needed. I don't have locking in my list. So, I wouldn't need to worry about LCK weights.

**25:41** · I wouldn't need to worry about dropping down the number of indexes that I have. So, now it's time to run splits index. Now my server may have multiple active databases on it. So we're going to run splits index get all databases equals 1 and hit execute. Now the more databases that you have and the more complex they are, you may get a warning back that says danger. We don't run this uh without your intervention on 50 plus databases on a server.

**26:09** · Danger, we don't run this if you have more than a thousand partitions in your database.

**26:17** · That's cool. read the message carefully because it tells you how to override it.

**26:21** · It's just that we want you to know uh that the thing is going to be a little on the slow side. Doesn't affect other users running it. It's just slow and we don't want you to freak out if the results don't come back right away.

**26:34** · So, here's how this stuff is is organized in terms of sorting. You see how it starts? They're prioritized. I try to prioritize all of our scripts uh so that you know what order to work through. This says redundant indexes, duplicate and approximate duplicate keys because I don't have lock weights as my biggest problem. I can skip through those and I can go down to hey, there are high value missing indexes as in stuff that I want to add.

**27:03** · There are things that SQL Server wants me to be able to dive in and rip out of the result sets. uh but I don't have indexes on it or maybe I need to join on those particular orders.

**27:15** · Now I teach you how to do how to handle all of these in my fundamentals and mastering index tuning classes. But here we're going to jump in because my top weight type is SOS. We're going to jump down to the high value missing indexes.

**27:28** · Let's rearrange this just a little bit so that you can see as we get down into here. I'm going to highlight that missing index section and then we're going to zoom in a little bit.

**27:40** · So it says over here under details it says there's these indexes that SQL Server wishes it would have had and there's an estimated benefit per day number. What that benefit per day number is is it's approximately the number of times that the query would have been used.

**28:02** · How much faster it would have made the query. That's the impact.

**28:09** · Average query cost. That's how hard the query is to accomplish. The bigger that number is, SQL Server thinks that the longer that query is going to cost.

**28:21** · All those numbers are made up. All of these numbers are made up.

**28:28** · SQL Server saying it would have used the index 764 times. That's not necessarily true. You've probably had instances where you've created a recommended missing index and SQL Server has said, "I don't want to use that index." And just completely ignored it. That number is a madeup guess. Impact percent, how much better it's going to make the query. That is also a guess. SQL Server has no idea whether or not that's true.

**28:52** · It could be more, it could be less.

**28:55** · Average query cost. This is a madeup number. If you've been through my how to think like the engine class, you know that that's a rough approximation of work that SQL Server thought it was going to have to do. It has no relation to modern CPU or storage. It's just a rough measure that we like to call query bucks. All of those numbers are made up.

**29:16** · So to some extent that benefit per day number is also made up.

**29:25** · But my general rule is or guideline is if the benefit is a million or more per day, then I'm probably going to pay attention. If it's less than a million a day, I don't think it's that big of a deal. I am not saying I'm never going to put in indexes in order to solve a million point per day problem.

**29:44** · But when I'm doing emergency triage and I'm trying to make things go quickly as fast as I possibly can, as quickly as I possibly can, then I'm going to focus on the ones that have a million or more benefit points per day. Now, I don't do my work out at this level.

**30:06** · What I do is I say, "Oh, okay. I got these tables that seem to need indexes.

**30:14** · Let's go over to this more info column.

**30:20** · There's a more info column that gives you a command that you can run against splitz index to get as you might cleverly guess more information about that particular table. And I like to copy paste that over into another window because if I run it in the same window I lose the contents of splitz index. And on big servers that are really active, it may take SP Blitz Index a while to output its results. So copy paste this, pop over into another new window.

**30:51** · And now I have some duplicates in here. So I'm just going to remove the duplicates so that I only have one row per table.

**31:03** · And then I'm going to work through them one at a time. I'm going to start with, for example, the badges table.

**31:10** · And now I get splitz index just kind of zoomed in to one particular table. And there are several result sets out of splitz index. The first result set tells me what are the indexes that already exist on that table.

**31:29** · The second result set tells me uh what indexes SQL server recommends.

**31:37** · Jiao, I love the I see the question or the note in chat. I love what you're doing with that. And I'm going to switch over and show it just on the main screen because I think it's really cool. So Jiao says, and I'm probably butchering your name and I I apologize for that. I ended up creating a TSQL that uses average duration based on query store and impact percent estimate the benefit of the index. I love that. I think it's genius.

**31:59** · I hope that you share that because if you want like put it out on a GitHub gist or whatever it is that the how you want want to pronounce that that would be genius and if you want email it to me I'd be glad to promote it to other people as well. I absolutely love it. Uh Frank says, "I'm still using the SQL Server built-in missing indexes report.

**32:21** · I should probably upgrade to Brent's uh first aid or first aid toolkit soon."

**32:25** · Look, it's brand new. This thing only came out in 2010.

**32:30** · It's only been 16 years. It's only eligible to drive a car.

**32:36** · What's the rush? I'm sure, Frank, you're probably old enough that you're ready to retire. Take your time. You're going to be one of those people that AI takes your job and you're never going to see it coming. That's okay. That's okay.

**32:50** · That's all right. So, now we have three a couple of result sets in here. The top one has the indexes that SQL Server already has. The bottom one has the indexes SQL Server wishes it would have had. Now, what do we need to do with this? SQL Server is recommending a missing index here. SQL Server says it wants an index on name. And now you can see up here the SQL Server doesn't have an existing index on name. It has one on user ID and then name, but it doesn't have one on just one particular name.

**33:24** · Now in the old days what I would tell people is I would tell them to go try to write a query that would use this index in order to understand the kind of query the whether or not it would be able to use one of your other indexes. But since SQL Server 2019, oh my god, this is my favorite feature in all of SQL Server 2019. This is phenomenal. It gives you the plan. It says here's the plan that triggered that missing index request. Oh my god, I just love this about SQL Server 2019.

**33:53** · And it doesn't require the databases to be in 2019 compatibility or level or whatever. If you're still on one of those antique road show versions of SQL Server like 2016 or 2017, this one right here is the kind of thing that you can share with your boss, especially if your boss is a former database administrator that will get them to absolutely love that feature. So I can I see in here that I have a mess missing index recommendation on name. If I go in here and I click on the query plan, I get here's the exact query with that missing index recommendation hint.

**34:23** · And it's all tied into you here into here for you. SP Blitz index shows all of this for you right on one screen. So then you can edit that query if you want if you want to take a look at what it is that it's looking for here. And you remember when I said if your top weight type is SOS yield, you're probably looking for indexes to support joins or group buys or sorts rather than looking for the wear clause.

**35:00** · And to some extent, that's what we're seeing here.

**35:06** · So what you can do then if you wanted to is you could copy paste this out and you could go do some manual tuning. You could go in here and look to see whether or not it makes sense to use one of your other existing indexes. SP Blitz index also gives you the exact create TSQL statement. So you can copy paste that out so that you don't even have to write the create index yourself. And because I'm a little bit opinionated, I actually like to name my indexes. I'm going to zoom in a little and show them to you.

**35:35** · I like to name my indexes with the columns that they're on. I don't put ex at the front. I don't put the table name in the front. My reason being is that when I'm looking at an execution plan, if you're looking at an execution plan like this and somebody's named it with some big long complex name, you can't tell what column the indexes are on because you only get so much space in here per index name.

**36:02** · If you start right from the get-go with column one, column two, then it's easier when you're reading query plans to understand uh whether or not uh it's based on certain columns.

**36:16** · Okay. So, I'm going to script out. I may say this is an index that I want to go create and splits indexes it out scripted it out for me. You'll notice that we leave question marks in here for some stuff. That's because I have realized over time that if you give someone a script, they will execute it. AI is totally learning that lesson too as well. AI does things like, "Here you go. Here's an example script to do what you're doing." And people execute it and they're like, "It wasn't perfect.

**36:51** · It had a mistake."

**36:54** · Well, AI is eventually going to learn that you should put something in there that forces human beings to actually read through the script to see whether or not it makes sense and what changing they changes they need to do. That's exactly what we've done here is I make you stop and think about do you want to create the indexes online or not? Do you want to sort in temp DB and so forth you make those decisions and we talk about how you make those decisions in the training classes.

**37:20** · If you don't want to bother with that, you can simply not use that width section and you could just create these indexes.

**37:30** · Uh so let's see here. We'll pop over and hit a couple of the questions that have come in that are actually relevant. Uh Onin says, "Our database says overindexing many indexes on a single table." The the highest that I've seen and this was fairly recently was over 400 indexes on a single table. and we were looking at why and someone had enabled Azure SQL DB's automatic index tuning and they didn't realize that Microsoft kind of turned off the the removal of indexes and now it just adds indexes but won't remove them.

**38:02** · So that was quite a fun day. All we had to do was remove a bunch of the ddup overlapping and redundant indexes that were in there and all of a sudden their per performance problems went away and I was like don't touch that switch again.

**38:17** · Um, uh, Brandon says, "I've had to manage an application that put in a one index for every column in the database."

**38:24** · I have seen that as well. And for people who have never seen column store indexes before, that is not the same. That is a totally separate thing. Um, Steve says, "Is there a way to see all the queries that use the index we have created so that we can use query store to see if they have improved or got worse?" Kind of, but not really. So, in the plan cache, let me show you. Actually, if you're looking at an execution plan and you you go, "Oh, this this right here, that is that index uh that you know, this is the one that I created."

**38:55** · You could search through all of the XML and the plan cache. Every query that runs that the where the execution plan is cached up in memory, all this XML is available to you if you go query it. So, you could go search for the particular index names that you were looking for.

**39:18** · Um, let's go down and find the one of that's on the index there.

**39:28** · This seemed like it would be easy at first and then it was not.

**39:34** · It's probably up higher. Come on back up somewhere in here. There's a Oh, you know what? It was called missing. I'm missing uh there we go. Um so you could search for index equals and then put in the name of your index. You could search through every plan in the cache uh looking for that. Um so you I'll I will leave that as an exercise to the reader. It will not be fast. It will take some time in order to do that.

**40:04** · I would probably recommend doing that in query store rather than in the plan cache. Yeah, Steve says, "I was afraid that would be that way." Um, Paulo says, "How come that the sample query plan is null under splitz cache or splitz index." So Paulo is running splitz index right now in production cuz who wouldn't, right? I mean, that's the kind of thing we all do. Um, and says that this right here is null. So there are a few different things that can be causing that. One is it can be that your plan cache is rolling through very quickly. to find that out. Go run SP Blitzcache.

**40:42** · SP Blitzcache.

**40:44** · SP Blitzcache. When it runs, they're going to be two result sets. I want you to look for warnings up down in the second result set. Look for priority one warnings. If you have priority one warnings under SP Blitzcache, that means you have a plan cache problem. read that URL to learn more about that.

**41:07** · If it that isn't your that is going to be your problem. I I don't know how to tell you this, but that is going to be your problem. Under priority one, there there's one other possibility that could be um uh so there's one other possibility that it could be, which is uh that SQL Server will only track the if I remember right, it's the last 1,000. I never remember if it's 100 or 1,000 missing index requests and beyond that it stops tracking them.

**41:31** · And it could be that you whatever was recommended here was one of the p first 100 or first 10,000 and it's no longer in the plan cache.

**41:43** · Okay. So now let's go back to the PowerPoint deck. Come back over to here. Let's move that out the way. There we go.

**41:55** · So as you start to look through that data, uh you're going to be very quickly overwhelmed by the amount of work that you need to do, this is where AI starts to come in and is shockingly good. I know that people have very passionate feelings about whether AI is going to be our next Lord and Savior or whether it's going to be the T1000 robot from Terminator. Um, I personally love it when it is managed by smart, attractive people that smell good such as yourself.

**42:27** · The way that you're going to do that is you can run splitz index when you're looking at the table level. And I've added an AI parameter where you can either call it with AIALS 1 or AI= 2.

**42:41** · I I don't know why I didn't make that a string parameter. AI equals 1 we're not going to cover here. It'll actually call chat GPT for you. That only works on SQL Server 2025 and newer. Also works on Google Gemini too as well. Um for that I'll steer you over to the documentation. We're going to talk about AI equals 2. What this does is it gives you a new AI prompt result set that you're going to be able to copy paste into the LLM of your choice.

**43:05** · The reason why this is useful is you can edit more information on here, like guidance in there about what you want the AI to do for you. So, let's go take a look at it and go see how it works. Let's switch back over to the desktop. So, just a second ago, I was running this for uh the badges table, and we'll delete everything else just so that we can see it. Um, so running it for the badges table, and here's what my result sets look like. I'm going to add one more thing which is AI equals 2.

**43:37** · And when I go to execute, it doesn't take any more time. But you see right in here AI prompt.

**43:48** · It's the kind of thing that you would recognize. You are a very senior database developer. If I click on that, it gives me a prompt, data types that are already exist in the table, index options that are available on this server, like whether it's standard edition, 2017, 2025, and so forth.

**44:13** · and what indexes already exist, how much they're used or not used, and missing index recommendations for SQL Server.

**44:24** · So, all I have to do is highlight all of this stuff and copy. I can just rightclick in and hit copy. Then I can go over to my favorite AI. I am not saying that Chat GPT is my favorite AI.

**44:39** · It's goes all the time, changes all the time based on tasks that I want to perform and how much balance I have left at the moment. Um, but I can go paste it directly into here, that exact same prompt that I just had. And I'm going to show it in the text field just so that I can go through here and edit it. So, I'm going to take out the little part about the AI prompt, and I'm going to say my server's biggest weight type is SOS yield.

**45:09** · So, I'm uh folk So, for now, let's zoom in a little so you can see me type. So, I'm focused on adding indexes that will reduce CPU work.

**45:27** · There we go. And then let's hit send.

**45:30** · Now, while this runs, a quick word of advice about AI models. The more you spend, the better advice you will get. And I know you're used to as a tech professional, whenever I tell you the more that you spend, you immediately think that the numbers are going to be in the hundreds or thousands of or tens of thousands of dollars. Nope, that is not how this works. we're really just looking at spending cents versus tens of cents in order to get this advice done.

**46:00** · So when you're picking a model and the the URL that you use or the the the user interface that you use in order to pick a model is going to be different depending on which user which uh team that you use or which uh uh uh AI platform that you use. You do not want instant results. You do not want model names that are like mini or nano or cheap or last year or outlet sale.

**46:29** · You want hot new expensive model. You want to put as much time as possible into thinking about this because this is a complex task that will cause you problems if it's not done correctly.

**46:42** · So here we go. Thought for a couple of seconds. Create a missing index for the active workload. And look at this.

**46:52** · Look at this.

**46:55** · Look at this.

**46:57** · It even figures out what to use in terms of options.

**47:04** · It tells you that here's the index I want to create. It tells you I want to do it with online equals on. I want to wait at low priority because that's available in my version of SQL Server.

**47:14** · So I don't create blocking file file storms. This is fantastic. I absolutely love it. Nicely done. We'll scroll down a little further and it tells you about the missing index that it uh requested.

**47:28** · It's also telling you to drop a redundant non-clustered index on ID.

**47:32** · It's giving you explanations about all of these. Absolutely gorgeous. It put all this thought into it in a matter of seconds. It gives me a final set of here's what uh makes the most sense for my workloads and I get that advice just absolutely gorgeous.

**47:52** · Now this is not a sales pitch for chat GPT. It's it is a sales pitch kind of for AI in general.

**47:59** · What about co-pilot? Now in SQL Server Management Studio I have co-pilot over here and I adore that it says things like hey I might mistake might make mistakes.

**48:10** · Let's ask Copilot the same thing. First, what I'm going to do is I'm going to start with my window that had the the stuff on badges. I'm going to come over here to um chat GPT. I'm going to move this around just a little to make for make it a little easier for y'all to see when I go and zoom in. So when I say in here, uh, I'm going to click on the button that says reference because I want it to know which table I'm dealing with or like which connection that I'm dealing with.

**48:40** · So if I come over here to active document, I'm going to say, can you fix the indexes on the badges table for me? um uh dduplicate and eliminate unused indexes that exist already on the table and add missing indexes. Script this work out for me um uh rather than doing it yourself.

**49:14** · Now, here's where I choose in Copilot where I can choose the model that I want. I find it really hilar I don't find it hilarious. I Microsoft has a really hard job.

**49:28** · Microsoft has a really hard job because they need to support stuff that happens like everywhere in the world. And here with with SMS co-pilot is really going through a few layers of businesses and politics at Microsoft. It's going through your co-pilot account, your GitHub co-pilot account. Um, so the models that you get may not be in your drop-own list. The models that you get may not be the latest and greatest.

**49:55** · These are honestly kind of old.

**49:59** · I wish that they had the standard current models. GPT 4.1 and 4.0. What year is this? Sonnet 4.6 is like from I don't know a year ago. The be generally the best ones have a multiplier on here of like 1x or 2x. I'm going to use 4.6 cuz it's the most expensive best model that's in this list. Although 3.1 pro is also uh pretty good as well. And then let's hit send and go see what happens.

**50:29** · Now when I do this um it's going to go through and query SQL servers metadata metadata uh and it's going to uh pull its own index usage statistics. It's going to pull its own uh query or like a um missing index uh advice out of there.

**50:46** · You don't get control over the queries that it runs. You don't get control over their quality. It is not fast. It is what we in the business call slow because you see how long it's taking to work on it compared to uh how quickly chat GPT55 the new stuff got its advice.

**51:03** · When it finishes, all I really care about is is does it the query Oh, look at you. Okay, the queries return no results because I'm connected to master. I do love that it figured out that that's the wrong database. This is uh not Stack Overflow. All right, so it's reading from database.

**51:22** · Uh while this runs ah delicious love it. It's getting There we go. It's It's come up with the same kind of advice that we got over from Chad GPT script validated. Here it is.

**51:38** · All right, we're looking good.

**51:43** · A few things to review before running.

**51:45** · We both know that you and I, meatbag, are not going to read any of those. So, let's copy it out of here. Let's copy paste out that script. Copy. And then let's paste it over into a new query window. And let's take a look and see what happens. So, uh it is amusing that it renamed the index. I kind of love that that I should give Chad or uh co-pilot a round of applause for that.

**52:08** · That's quite nice it renamed it. I am not a fan that it renamed it with EX badges. That's kind of crappy. It should be on the columns itself. Um and it did create the index recommendation. Now, the thing it didn't do was all the cool stuff that chat GBT did with giving it all that stuff around uh our options like doing it with online equals on and weight at low priority. However, in fairness, if I come back over and look at what we sent to chat GPT, what we sent to chat GTP GPT was a longer prompt. We gave it more information.

**52:40** · Now, it's kind of Copilot's own fault that it didn't ask for more information.

**52:48** · But let's see what happens if we take the exact same AI prompt, the same prompt that we sent over to uh Copilot or to to uh chat GBD. Let's take that big old same monster. Let's copy that out. And let's try sending that same thing to management stu or to uh copilot management studio. Let's say over here, let's start a new chat. It has this button in here to create a new thread.

**53:15** · And then let's paste that same exact thing into here. To be good, let's go over into our Blitz index window. Let's switch into Stack Overflow.

**53:26** · Then under reference we'll say this active document. So we have pasted the whole prompt down into there. Let's see what happens if we send that same thing in again. Let's see if it says for example uh uh what index recommendations there are. Um amusing just while it runs.

**53:49** · RJ says no one uses SQL server.

**53:57** · R.J.

**54:00** · I have a Rolls-Royce, a Porsche 911, an antique Porsche 356, a Honda Beat, a house with a pool and a hot tub.

**54:16** · You have an anonymous YouTube account.

**54:23** · Yeah.

**54:25** · Coming back over here, back over into our people that matter. So, let's come back over here and we have a new active document. Let's copy this out and then let's go paste over here in and see what it came up with this time. And woohoo.

**54:45** · So, it came up with the same index, but check out what it came out with here.

**54:48** · Here it says online equals on, resumable equals on, sortb equals on. I did the weight and low priority options. The quality that you get out of your AI results is directly proportionate to the quality of the prompt that you put in. And you saw me kind of put in a a quick lazy prompt over into Copilot.

**55:10** · You saw me put in a quick lazy prompt over here and just say things like fix the indexes, bro.

**55:16** · The better that you write your prompt, the more accurate results you're going to be. That's why if you're going to play around with AI, you should be using something that does a big monster uh prompt for you. And we put a lot of work into that. The quality of that prompt actually improves with each version too with the next version of splitz index that ships. We have additional insight going into your splits index AI prompt as well, which is kind of cool. So, let's come back over here to the PowerPoint.

**55:49** · come back over to here. Um, remember whenever you see an AI demo out on a public database, the demos with public databases look artificially smart, uh, because the AI remembers the things that it's seen before. For example, if you see AI demos with the Stack Overflow database, you will often see that the prompt doesn't even have to include the structure of the users table, for example, because there are so many blog posts and whatnot out there that actually describe how things like the users table works.

**56:16** · You also though you need to think about what that means for the data that you send to da to AI. If you send data to AI, it may become part of the public training data set. So imagine for a second that you work at Acme, some big Acme uh global widget manufacturing company, and you're constantly putting in information about your inventory system.

**56:44** · Then imagine that someone goes to the same AI that you do to chat GPT claw Gemini whatever and says you are a database developer at Acme working on their inventory system describe the structure of the database and they may get training data back out.

**57:04** · They may get data like out in their result sets the from the kinds of things that you pasted in. So be really aware of that. the the chat provers terms of service will often say that they do not use your data for training purposes once you hit a paid plan or once you get into a business plan or once you opt out.

**57:26** · They change those structures all the time and if you're not paying attention to the user agreements that you just accept as you walk through the uglier that that can get. Oh um and the models the matter the matter the uh better advice that you use the better or the better pro um uh model that you use the more accurate advice you're going to get out of there.

**57:50** · So that's great. Now what if you need to gather data like this quickly across a lot of systems? What if you are a consultant that's constantly jumping around from one client to another? What if you're a database administrator that works for a global company and you support lots of different teams?

**58:08** · Sometimes you don't get direct access to their SQL servers. What happens if you're a software vendor that has that stores data in on premises SQL servers or client SQL servers all over the place? You need a way to get this data out very quickly. You can't tell people, hey, go install this splitz index script. Go copy paste the results into a spreadsheet and go send it back to me. I suffer from that same problem. So, I'm a consultant. I'm like an emergency room trauma surgeon for SQL Server. I need to get data in and out of SQL Server as quickly as possible.

**58:41** · My biggest engagement by far is my two-day emergency turnaround. So, I've got a tool that helps me do that. The tool is called the, as you might cleverly guess, the consultant toolkit. It's an exe that I can just hand to clients and say, "Run this, point it at your SQL server, and it'll pull back all kinds of data and dump it out into Excel for me." Let me show you how it works. Let's switch back over into our server and we're going to go out.

**59:15** · I've already downloaded it. Let's go hop out into uh uh uh here we go.

**59:21** · So when you download it, it's this thing that shows up as a consultant toolkit.

**59:26** · It's got its own little name inside here. Um, so if I come in here, there's a there bunch of files. It includes all kinds of DLS for support. The reason behind this is is we want you to be able to just run the app without having to install anything. You can put it in any folder. You can drag and drop and put it on a network share, all kinds of stuff like that.

**59:48** · So, uh, I'm going to go ahead and run it. Now, I'm going to run it from the command prompt just so that you can see what it works. I could just doubleclick on it, but I'm going to run it from a command prompt so you can kind of watch it as it goes by. I'm going to go into temp. I believe I put it in temp. Yep, there we go. And I'm going to run it checkup.exe.

**1:00:12** · And I'm going to run it with the deep dive parameter to get a little bit more results back. You can control how much you want to get. And you can see that it's going off and it's connecting to my SQL server and running diagnostic queries. You don't have to run this on the SQL server itself. Ideally, you run this on your workstation and you point it at the SQL server.

**1:00:36** · You can point it at Azure SQL DB, Amazon RDS, all kinds of different Microsoft SQL Server compatible type systems. and it goes through and runs all these diagnostic systems.

**1:00:48** · When I go back over here to the output folder, when it finishes, there's going to be an output folder with a zip file. And inside that zip file is going to be all kinds of stuff like an Excel spreadsheet with our query results. Let's go ahead and double click on it. So, you can see it's got an Excel spreadsheet with our query uh result or like from SP Blitz, SP Blitz index, all kinds of things.

**1:01:13** · queries that needed missing indexes, the top ones that SQL Server found in there, just like we gathered out of SP Blitz index, the top queries by CPU, by reads, by deadlocks, all kinds of things like that. Let's hop out and take a look at what the uh uh end result looks like.

**1:01:33** · Switch back over to here.

**1:01:38** · So, when you open up Excel, and I have to apologize, I use a Mac. I'm one of those people.

**1:01:47** · Although, that is also part of why I get so excited about Microsoft really embracing Macs and Linux these days.

**1:01:52** · It's really uh cool. Um, so here I have Office Open Excel for the Mac. For those of you who aren't used to looking at Excel on a Mac, I'll be the first to tell you Microsoft Office sucks on a Mac. It's terrible on a Mac. That's the one thing that I really, really miss is Microsoft Office is so good on Windows.

**1:02:11** · I don't really miss anything else. I don't miss having ads in my taskbar.

**1:02:18** · I paid for the operating system. Why are you showing me ads on the taskbar?

**1:02:22** · That's offensive. First tab in there, it tells you basic information about what the spreadsheet is that you're looking looking at. Second tab shows basic information like uptime. uptime, what version of SQL Server it is, how much the how big the databases are. I want to know uptime because, of course, like we talked about early on in the class, I want enough uptime for things like weight stats and diagnostic views. If this SQL server was just restarted in the last day, I want warnings there just so that I have uh an idea that the data isn't nearly as useful.

**1:02:54** · Then I'm going to click on tabs one at a time. The next tab inside here is SP Blitz. Those of you who've used SP Blitz know that it's my totally free SQL Server health check script that gives you information about things like missing backups or there's database corruption. I want this in my hand so that I know, for example, if there's database corruption or if there aren't any backups, I don't want to touch the server. The server is already screwed. And as a consultant, you don't have a performance emergency. You have an uptime emergency.

**1:03:24** · It's time to go get those backups under control.

**1:03:29** · Next tab, I have my weight stats. Shows me how long the SQL server's been up and what my top weight stats are. Exactly like what we were just looking at at the start of this class when I said you've got to look at SP Blitz first since startup to see how much weight time has accumulated and what your top weight stats are so that you know where to focus your troubleshooting.

**1:03:53** · I'm going to skip ahead a few tabs and here's splitz index. It's the prioritized advice uh index advice from splitz index telling you things like you have too many indexes on some tables, you have redundant indexes, you have missing indexes that SQL server desperately wants.

**1:04:11** · There are other outputs for splits index in here as well. for example, that has mode two that gives you a complete inventory of your indexes so that when you're doing index work for clients, you can see which indexes already exist on tables, which indexes could be merged down. It gives you drop index statements, create index statements.

**1:04:32** · There's a tab for the missing indexes, too. gives you a detailed breakdown of each index that SQL server recommends that it mi wishes it would have had plus includes their execution plans so that you can do this analysis completely offline. You don't have to be connected to the SQL server in order to do this stuff. Someone can just hand you this zip file, this Excel file, and you have everything that you need inside of there.

**1:04:59** · There are other tabs, too, like SP Blitz cache. It'll show you your top most resource inensive query plans. It'll show you deadlocks. It'll show you high availability and disaster recovery configuration, their backup history, errors in the error log, and more.

**1:05:19** · You can have the clients send you the output file or if you want, you can configure it so that it automatically uploads to Amazon S3 buckets for you. So if you have a central Amazon bucket, you can configure that that the files are uploaded and then no one can see them but you. You then go connect and you can go take a look at how your clients are doing.

**1:05:41** · Some of the consultants out there have it run on a scheduled task once a day so that whenever they need to troubleshoot their client SQL servers, they can go connect to that S3 fileshare. in a version from last year.

**1:05:54** · We even added the ability to automatically import data into a database so that as these files show up at your office, they can automatically go into a SQL server database that you can query, you can set up reports on so that you can give your clients customized health reports all from the data that they're already sending you.

**1:06:16** · There are a bunch of good use cases for this. When I first did it, one of the first things that I did was I have my sales process prospects send me data in first. So when someone wants to schedule a sales call with me, I send them here's my consultant toolkit. Run it. Send me the diagnostic data on your server. That way I can make sure that your SQL server is in a safe place for consulting. I'll tell you what, very often I'm able to look at the data and go, "Oh, you know what? All you need to do is push this button. Push this button. Create this index." then go see how it looks.

**1:06:47** · If you never need me again, that's fine. We're done. If you ever do need someone again, I hope you remember that I solved the problem for you and I hope that you call me, but otherwise go with God bonvoyage.

**1:07:02** · It might sound odd that a consultant would be willing to solve someone's problems for free, but it's just that I want them to remember me whenever they eventually hit something much harder.

**1:07:12** · It's great for software vendor tech support. I have a lot of independent software vendors that their help desk uses this. Their help desk whenever they connect in to somebody to troubleshoot a case, they go run SQL the consultant toolkit to gather all the data and then they can hand that off to escalations to escalate to higher tiers of support and those people already have all the diagnostic data about the SQL server there at their fingertips.

**1:07:37** · And then the one that really surprised me and I have a blog post about this is full-time database administrators who support other departments. I have some clients who are giant so uh giant uh uh uh companies global companies think airlines for example where there are all

**1:07:53** · kinds of departments that each have their own SQL servers and there's a couple of just frustrated overworked database administrators sitting in a corner somewhere. they have to deal with help desk tickets all the time for what's wrong with my database server and they've just organized it so that the first tier of help desk has runs the uh diagnostics on their server packages that right in with the help desk ticket so then that way the DBAs can solve performance problems from their phones just opening up that zip file and taking a look at the spreadsheet I personally I cannot imagine how I

**1:08:26** · would do my job without that that just it's makes my job so much easier easier.

**1:08:32** · I would not be able to handle as many clients. I would have to charge more and I would have to do less clients per week than I do with that consultant toolkit.

**1:08:42** · It really was life-changing for me and I hope for those of y'all who are consultants and DBAs out there that that's life-changing for you as well.

**1:08:51** · So, to recap what we talked about inside here, first off, check your SQL servers weight stats. Check them with SP Blitz first since startup equals 1. That'll tell you what your server's top weight types are. Then based on those weight types, that tells you what you need to do with your index DMVs, which index kinds of work that you need to focus on first. Then check your index design by running splitz index get all databases equals 1 based on whatever you need to do here.

**1:09:19** · Then go scroll down to the relevant section and use the more info command to run splitz index at the specific table level. If you want to tune indexes by hand, that's all you need. You can stop right there. If you're lazy or if you're like me and you just want to do work a whole lot faster, you can use the AI equals 2 parameter where we'll write the AI prompt for you and all you have to do is copy paste this into your favorite LLM and you get index advice on seconds complete with undo scripts and redo scripts.

**1:09:52** · And to do all of this work even faster, go check out the consultant toolkit.

**1:09:58** · Learn more about all this stuff, go check out brenttozar.com.

**1:10:02** · Today's webcast, and we'll switch into open questions after this. Today's webcast is brought to you by the consultant toolkit. If you go to brenttozar.com/go/toolkit, happens to be on sale right now. We offer pricing for individual consultants and or employees for those of you who are full-time DBAs at uh specific companies or site licenses for the entire company.

**1:10:27** · So, if you want to get a cheap advice for everybody on your team, go check out the whole entire site license. All that's available plus sample files, the documentation so that you can see how it works all over at brentosarr.com/go/toolkit.

**1:10:46** · So, Now, we will switch into open questions for all of those of you who wanted to ask random oddball stuff that was unrelated. I'm going to give you some time here at the end of this webcast to ask that. No, I will not show you my feet today. Maybe on my personal Instagram. That's probably your best bet.

**1:11:09** · Let's see what we've got here. So, we have um let me pull up on my I'm going to pull up on my monitor a larger version just so that I can see it more easily.

**1:11:21** · Um let's see. Let's scroll down to that.

**1:11:25** · So, we have uh why does that show? Um I move forward says any more AI tips or tricks. That's kind of outside the scope of today's webcast. So, I'm going to skip over on that. I have a ton, but it's really we're going to focus on index tuning type stuff. Um, uh, let's see here. Three ring circus says, "Is there a value to enabling query store along Sside Splitz?" Yes, absolutely.

**1:11:49** · And I talk about that in my fundamentals of query or fundamentals of query tuning class and my mastering query tuning class. Yes, absolutely. Um, next up, let's see here. Uh, Mayberg says, "Having just got off a cruise, how do you rate Virgin versus more traditional cruise lines?" I like it. We just get really tired of the food. Like there are only so many food options and uh yeah, otherwise it's great. The the decor was amazing. Really enjoyed that.

**1:12:15** · Um Adam says, "With the index recommendations from SP Blitz index, are the column names in the best order for logical reads optimization?" No. Um so SQL Server doesn't track the cardality order uh for columns. Doesn't track which ones should go first in the index. It's just a comma delimited list of columns to consider. That's where the query plan comes in. There's that sample query plan column.

**1:12:42** · That's where you go take that query plan and go look based on what your knowledge is uh how quickly SQL Server is going to be able to narrow down the search spaces with using the various columns in the query. Um but check out that sample query to do that.

**1:12:57** · Um MI says, can you chime in on the forced serialization due to scaler UF UDFs and the check constraints? Um, so one of the cool things I'll show you actually.

**1:13:08** · So if you go to because it sounds like you're looking at the warnings column from SP Blitz index when you're looking at the get all databases. So you've got a warning in here about scale scalar functions uh inhibiting parallelism.

**1:13:23** · Scroll across and there's going to be a URL column. I jokingly call this you read loser.

**1:13:34** · I don't know what URL stands for because for so long I've been telling people you read loser and I mean that go ahead copy paste that out of there and immediately you can go uh get information more information about there. I do that for all of the warnings that we have too as well. Um, Daryl says, "A Disney Cruise Line pineapple super sipper has been spotted." You are correct. Extremely good. Uh, eye there, Daryl. That's hidden over there. I I have all kinds of cool little Easter eggs over on there.

**1:14:08** · Um, uh, let's see here. Jonathan says, "Which SP Blitz commands support the AI parameter?" Right now, as of this recording, SP Blitz index and SP Blitz cache. Um, three ring circuit says, "Does index and query tuning differ for data warehousing workloads versus transactional type workloads?" For me, no. For me, it's essentially the same thing. I will say though for analytical workloads these days, more people are moving towards column store indexes, which I love and adore.

**1:14:37** · And I've got a one-day class called fundamentals of column store that teaches you more about that. Oh, Alan says URL is universal resource locator. And Allan, I will take you at your word for that because I have no idea whether you're telling the truth or not. Uh Joris in here says, "Brent's uh Brent's in here doing real work and I'm in here screwing around." A round of applause for Joris who wrote the consultant toolkit, which completely made my life easier. He didn't do it out of the goodness of his heart.

**1:15:07** · He's getting paid for that. But he does he does a better job than I could have even imagined. It's fantastic.

**1:15:15** · Uh let's see here. flagged says, "Does any of this work on encrypted stored procedures?" Yes, they trigger missing index requests. Uh you just can't see the query plans, which is fine. I don't Just as a side note for encrypted store procedures, I never really care about those because you can decrypt them really easily with PowerShell. If you just Google how to decrypt encrypted store procedures, it's a trivial easy kind of thing. Um let's see here. Uh, Juan says, "My boss and I are in here learning from the SQL master. Can you say hi, Jen Brent?" No.

**1:15:50** · Oh, I just did, didn't I? By reading the question out, I said it out loud. Um, let's see here. And I think that's it.

**1:16:00** · So, thanks y'all for hanging out with me. Again, today's webcast was brought to you by Richie Rumps Consultant Toolkit. If you go to brenntosrar.comgotoolkit, um I've got this consultant toolkit that you can use to gather data across all kinds of SQL servers uh very quickly. Go check that out at brentosarr.comtoolkit.

**1:16:23** · It is on sale now as well. So, thanks for hanging out with me today and I will see y'all on the next spring training webcast. Adios.