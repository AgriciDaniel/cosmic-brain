---
title: "How to Tune Queries Fast"
source: "https://www.youtube.com/watch?v=YbamaLlbh7I"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-05-26
created: 2026-07-02
description: "Brent Ozar will show you how to use the latest features of sp_BlitzCache to rapidly improve performance on an existing server. He'll show you how to find your server's top bottleneck, find the queries"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=YbamaLlbh7I)

Brent Ozar will show you how to use the latest features of sp\_BlitzCache to rapidly improve performance on an existing server. He'll show you how to find your server's top bottleneck, find the queries causing that bottleneck, and then demonstrate how to get advice from AI on how to tune them in seconds.

## Transcript

**0:00** · Good morning party people and welcome to uh spring training SQL Server spring training week. \[snorts\] Uh today we're going to be talking about how to tune queries fast or how to tune queries quickly depending on how you want to look at it. I have to do this all the time. I'm Brent Ozar. I do a lot of emergency turnaround work for Microsoft SQL Server, Azure SQL DB, Amazon RDS. I got my start as a developer back in the late 1990s and I have so much respect for developers. It's a truly hard job.

**0:34** · And whenever people are shipping brand new applications, I know a lot of database administrators out there are like you should ship perfectly tuned SQL. You should craft everything by hand and put it into stored procedures. But the reality of when we're shipping code is that we don't know what queries users are going to actually end up running. we may put in all kinds of screens in our application. Um, half of them that people never actually go into. So, it's hard to predict in advance what we're going to have to tune and you can waste a lot of time performance tuning stuff. I would rather people just ship things that are going to work and compile and then we'll come back and tune that stuff later over time.

**1:09** · By we, I mean a lot of you as well as me over in chat. Tell me a little bit about yourself. Tell me what part of the world that you're in, what your job title is, and how many years you've been working with databases. So, where you're at, what you do, and how many years you've been working with it. Now, let's go take over to look over here and see what y'all have been putting in. Um, \[snorts\] Richie says, "The best reindeer pizza I've ever had was in Finland." I've actually been to to have reindeer pizza all over the place.

**1:46** · Denmark. Um, uh, I I like Sexy Orange is from the Pacific Northwest is a database administrator for 13 years. Rachel, a database engineer in Wisconsin, 12 years. Joseph, a senior developer for 5 years. You know, it's funny. Um, when you work with databases, you you might have a decade worth of experience and easily still feel like you're learning.

**2:11** · uh Benggon was this brilliant TSQL coder and tuner uh who's been was active in our industry for like 30 years. He has since gone on and retired. I love keeping up with him on Facebook. And \[snorts\] I sick hasn't put out a new book in several years. And yet still whenever I read IT's books, I've been doing TSQL for like 25 years, but whenever I read one of his books again, and I still reread them from time to time, I still learn something every time I read his books. Database languages really haven't changed that much in the last couple of decades.

**2:41** · Small additional techniques have come out, but it's amazing how powerful TSQL can be just by itself and how long you can spend learning. It's absolutely bananas. So during today's class, I am I move forward says its books are on my shelf. They're on my iPad. I use them all the time. Um so in today's class, I'm going to be using for the demo SQL Server 2025 in 2025 compatible. I just always want to show you that the things that you're learning here \[snorts\] um have not been fixed for you automatically inside the database engine. We still struggle with some basic concepts trying to get things to work in TSQL.

**3:16** · Using a SQL server with 16 cores, 96 gigs of RAM, and local solid state so that I can run queries quickly and show you the before and after.

**3:28** · Management Studio 22.5. Actually, that one might be 22.6 that just came out a day or two ago and I believe I've upgraded that one. Um, I'm using the largest version of the Stack Overflow database available right now, about 200 gigs in size and it's open source and you can get more information about that there. Today, we're going to be discussing the first place that you go and do when you're going to do performance tuning on a SQL server. You're going to go check its weight stats to understand what kind of queries you want to tune because after all, you're always going to have a 10 worst queries. You're going to \[snorts\] have 10 worst by CPU, 10 worst by reads, 10 worst by writes, and so forth.

**4:02** · But which one should you tune? You have thousands of queries running on the server and you only want to tune the ones that are actually going to make a significant difference on the server. That's where we're going to start with weight stats. Then after we know what our top weight type is, we're going to use SP Blitzcache to slice and dice the data based on whatever our top weight type is. Once we've found the queries that we want to tune, I'm going to give you some general query tuning advice. Obviously, I can't teach you everything about query tuning in the span of an hourong webcast.

**4:34** · But I'm going to teach you the places where I would go to look first when I'm tuning a query. Then we're going to look at how you can use SP Blitzcache to gather some of this data in with AI and send that into the chat provider of your choice, Chat, GPT, Claw, Gemini, whatever, Copilot, and see if it can make a difference inside those queries. Then I'm going to show you how to gather the data even faster with the consultant toolkit. So let's start out with the first thing that we're going to discuss.

**5:04** · Let's figure out whether or not our SQL server even needs query tuning and the kinds of queries that we need to tune. The first place we're going to start is cydmos weight stats. This is where SQL server tracks how long it's been waiting for stuff. And I need to tune my server so that it spends less time waiting on things. This DMV is core for every monitoring tool out there. every monitoring tool out there that shows you any kind of column chart uh that shows how heavily loaded your SQL server is, it's always grabbing data from this DMV.

**5:44** · Now, the problem with this DMV is that it starts at zero and just tracks up cumulatively over time. So, if you query it at any given time, it'll say that you've waited an hour on storage, 10 hours on locks, and so forth, but you don't know when that was. You don't know if it was Monday at 9:00 a.m., if it was Friday overnight while you're doing your backups. In a perfect world, you would trend this data over time, and you'd look at your weight stats to see what the biggest weight types were during your the hours that you care about, like when your end users are running queries.

**6:19** · When you're \[snorts\] just walking in cold to a SQL server for the first time, as I'm going to assume that a lot of y'all are, I want to be able to just look at what the weight servers weight types have been since startup. And the tool that I use to do that is SP Blitzfirst since startup equals 1. SP Blitzfirst is part of our open-source first responder kit. It is completely free. You download it, you can install it in the master database. If you're using Azure SQL DB, this is completely compliant as well. You can put it in your user database if you like there.

**6:52** · And this will show you how long your SQL server's been up or your Azure SQL DB and what it's been waiting on in that time. Let's go hop over into my lab and go do it. And I'm going to show you how I diagnose that data.

**7:07** · So here I've got SQL Server Management Studio. Switch over to it here. And I'm going to start by saying splits first since startup equals 1. And you'll notice that it runs pretty much instantaneously because it's not like it has to go track anything over time. All it's doing is asking SQL Server, hey, what have you been waiting on since you start it up? So, it's totally safe to run in production. It'll run nearly instantaneously. And in here, I'm going to focus on the first section inside here.

**7:37** · In the first section inside here, it says that here's when the data was gathered. It's got the sample ended time and then the \[snorts\] hours of sample. Hours of sample is how long this SQL server or Azure SQL DB has been up.

**7:57** · In a perfect world, I want at least a few days worth of uptime before I make any kinds of management decisions. Um because \[snorts\] if I just uh sample this data on a Monday morning, for example, uh and \[snorts\] the server was restarted over the weekend, well, all I've got is the weekend loads, which probably weren't much of anything, or they were stuff like backups and corruption checking. I want to have at least a few days worth of sample in sample time inside here, but I also probably don't want to have more than like 60 days.

**8:28** · If I have thousands of hours of uptime, then maybe what I'm looking at here is blocking problems that happened 6 months ago on the last version of our application. Maybe I'm looking at problems that were happening when we were doing a big data import or trying to restore stuff from backups and so forth. Um, uh, Surirly Dev says, "I want to install SP Blitz first and the other scripts on the database at my new job. Am I likely to keep that job? If I do, frankly, sirly, Deb, you are unlikely to keep the job regardless of what you have done at all.

**9:01** · Where's my button for laughter? There it is. \[laughter\] There we go. Get my little laugh track inside here from my studio audience.

**9:14** · So, I want at least a couple a week, two weeks worth of uptime, but probably not thousands of hours worth of time. If you got thousands of hours worth of time in here, I don't put too much faith inside this data. It's probably time for you to patch that SQL server. The second column, thread time. Well, the second column that I'm holding my hand over here, thread time is how much time the SQL server has spent running queries. And it's normal to see this higher than uptime because your SQL server can run multiple queries at the same time across multiple cores at the same time. These numbers include stuff like parallelism.

**9:55** · So the higher these numbers are, the more of a workout your SQL server is getting. Then this \[clears throat\] over here is how much time out \[snorts\] of that total spent running queries. How much time have we spent waiting on stuff and what was that stuff?

**10:16** · In this example here, my I've run over a 100 hours worth of queries on the server. out of that you can see like 50 60 70 hours worth of the time was actually spent waiting. Generally speaking, you want to work from the top down. Generally speaking, you want to work on the top weight types and whatever the top weight types are. If I can cut out the majority of time that we're spending waiting, that's what my users are going to notice most.

**10:44** · Now I do have to drop a little bit of a hint here that in as you get deeper into performance tuning you will find out that there are some weight types for example thread pool that SQL server doesn't track very well and the numbers over here may not be entirely accurate. So there are some weight types that we call poison weights where if you see them at all in your result sets then you probably need to focus on those first. We talk about those in some of our other training classes. But inside a query tuning training class, I'm going to tell you to start from the top and work bottom.

**11:16** · You can also go run this now on your production server. And I say the reason why you might want to run it on your production server. It's going to be worthless over in a development environment because development doesn't see the same workloads that you see over in production. For example, blocking. You may be having all kinds of blocking problems in production, but you won't see those in development because you're the only person hammering the be Jesus out of that poor SQL server. So \[snorts\] in production, you want to work from the top down on whatever your top weight types are.

**11:52** · And if you know what your top weight types are, then the next few minutes of the webcast will be useful for you because I'm going to tell you what we're going to do once we have this information.

**12:04** · Now, there are all kinds of weight types that you'll see out there. There are hundreds of them. I'm only \[snorts\] going to cover a handful of them inside this webcast, but if I don't cover yours, don't despair. Slide over to the far right hand side of the SP Blitz first results and there are links over to SQL Skills weight type library where it defines every known weight type. You can go copy paste that, read that into your browser. Anytime that I give you any kind of health check report, I always take great pains to give you a URL for anything in the result set so that you can see more information about it if you don't have it handy. And I always try to make it a free result.

**12:40** · Uh just because I know a lot of y'all are broke. Okay, \[snorts\] so what do these top weight types mean? Let's go switch back over to the slide deck for a second.

**12:59** · So, back over here on the slide deck, the most common weight types CX you're going to ignore and move past for the purposes of this class. It's really a deceiving issue. It involves parallelism and people think when they read Google for those weight types that they're just going to turn a dial or something and all of a sudden uh they're going to have less of these CX weights. That's a totally different issue and we do cover that in our mastering query tuning and mastering server tuning classes. You can't fix this just by changing settings.

**13:32** · It's going to involve some pretty extensive query rewrites and we talk about that inside those classes. For this class, we're going to focus on page io latch SOS yield and latch ex.

**13:50** · If you have SOSuler yield, that means that the SQL operating system is waiting on a CPU scheduler, which is like a CPU processor, waiting on a CPU scheduler to free up time so that it can slide back in and start doing work again. You see this when queries are burning a whole lot of CPU time, when queries are really uh uh doing something that's for example running rowby row.

**14:12** · If people are using scalar functions, if they're using cursors to loop through options, if they're doing CPU inensive calculations, if they're hashing, for example, if they're trying to validate JSON, if they're trying to do string concatenation, things that aren't really designed for a relational database, \[snorts\] or if they're repeatedly joining, grouping, and sorting like because SQL Server doesn't cache, joined results doesn't cache grouped results.

**14:50** · We talk about that in my how to think like the engine class. Totally free. If you haven't seen that, I would go check it out. SQL Server caches raw data from the tables and indexes, but it does not cache stuff that uh has been joined together, which is painful for those of us who repeatedly join the same tables together over and over again. These may not be long queries. This can also be a situation where you're having death by a thousand cuts. And let me explain what I mean by that.

**15:24** · When I say death by a thousand cuts, I mean, I'll give you an example.

**15:30** · I had a client recently where on their website at the top of the website, you know how sometimes you have at the top of the website there's like a little thing with your initials and your avatar and then you click that you can drop down and see your profile or whatever. Well, this client had a little box up at the top of their website where they showed the users's initials and their picture.

**15:54** · And on every page render, the web app was actually passing here is the user's name. Please give me back their initials.

**16:07** · And so tens of thousands of times per second, SQL Server was being asked to do this string comparison work. Find the first uppercase letter, then go through, find the space, find the first letter after the space. These are their initials. And that's hard for SQL Server from a CPU perspective. Now, that query wasn't slow. That query ran in less than a millisecond every single time that it ran. But the problem was is it was running thousands of times per second.

**16:38** · So, it was using up several CPU cores just by itself. This is the death by a thousand cuts scenario where people may not be complaining about the individual query speed results but overall that is kicking the server in the behind. So the next top weight type that we talk about is page IO latch. This means where SQL server is waiting to read a data page from a data file because that data page was not cached up in memory.

**17:03** · This is a very common weight type especially up in the cloud these days where uh the amount of memory that you get is relatively low to the amount compared to the amount of CPU cores that you have. In this I'm typically looking for queries that read a lot of data. Maybe it's because we have non-sargeable wear clauses. Maybe it's because the queries need index tuning or they're doing implicit conversions or asking for data shredded across years worth of history.

**17:36** · This is typically not death by a thousand cuts. These tend to be longer running queries because after all, if you're just darting in and getting very tiny amounts of data each time, odds are that's going to be up in the cache or we're not going to have to wait very long for storage in order to pull back.

**17:54** · Storage is these days is relatively easy to get small numbers of pages. It's the large number of pages that tend to kill us. And then there finally there's latchex. Latchex is when SQL Server is trying to read a page that's up in memory and it's checking to see if someone else has a lock on that page. It's like a lightweight lock. It's not really blocking. Anybody reading this page? No, I'm good. Okay. Anybody reading this page? No. Now I'm good. The page is up in memory as opposed to page io latch.

**18:24** · It It kind of sucks how these weight type names are so similar. I always feel like they were uh written by somebody a long time ago, like 25 years ago, and they were never thinking about human readability. What's the difference between page IO latch and latch? They never really thought it was going to be that important. And these days, of course, now we have to explain here's what this one means, here's what that means. Latch is a really lightweight lock when we're checking to see if anybody else is accessing the table. This is very frequently death by a thousand cuts because the data is up in memory and we're having to check a whole lot of pages in order to get it.

**18:54** · So for this we're going to be looking specifically for that death by a thousand cut scenario.

**19:09** · There are lots of other weight types inside of SQL Server. In these other weight types, query tuning tends to be less effective. For example, if you're writing a ton of data over to the transaction log, it's probably not because the query is written poorly. It's probably just because we're writing too much data and we need to step back and take architectural looks. So, we're not going to address these inside the span of this class.

**19:36** · One drawback, weight stats are at the system level and in a modern complex application, you're probably going to have several big bottlenecks. You're going to have some queries that need CPU tuning. You're going to have some queries that need read tuning. You're going to have some where it's death by a thousand cuts. And it can be overwhelming. Just work through your top weight type down. Work through the How do you eat an elephant? One bite at a time. I don't know why that people even say that. Who wants to eat elephants? That can't be good meat. Those things are tough. They just look dusty and dry. It's probably terrible.

**20:06** · Plus, besides, why would you We wouldn't kill an elephant for food. Those things are ginormous. it would feed 10,000 people all for look back on to the training.

**20:20** · So if your weight stats say that query tuning is going to help like if you have SOSuler yield page io latch or latch ex now it's time for us to go find what queries are causing that problem. And the places where we start is cydm exec query stats. CISDM exec query stats will tell you which queries SQL server has seen the most which ones have used the most CPU which ones have spilled the most to temp DB. I love this DMV. It comes in so handy for all kinds of situations.

**20:51** · And it seems like every other version Microsoft adds more columns to it to help more with diagnostics. This is also just as a side note why I I don't get scared at all about people saying AI will take our jobs. I actually love using AI. I use it all the time. But more than that, I love that Microsoft is trying to use robots too.

**21:15** · And the robots can't do their job because they don't have enough document diagnostics inside the database engine.

**21:20** · So Microsoft has to keep adding diagnostics into the database engine to help the robots do their job. And when they do that, they also help me do my job, which is kind of fantastic.

**21:32** · Uh so the way that I like to query that is with SP Blitzcache. SP Blitzcache will tell you what are the top 10 or different numbers of the queries that have been using the most resources lately. And the one of the big keys here is that you can sort it by anything that you want. You can sort by CPU. You can sort by reads. You can sort sort by duration, average duration. There's all kinds of cool things. And you can use the help parameter to to see more ways that you can slice and dice your plan cache. Um, memory grants, unused memory grants, all kinds of stuff.

**22:08** · So, the sort order is where you're going to figure out how your weight stats tie into this. One of these days I am going to make it so that you can put in a weight type inside here for the sort order. Technically SQL server does not store weight stats in the plan cache but you can kind of reverse engineer it. You can say for example page io latch if that's your biggest weight then that means that we're looking for the queries that do the most reads. If you're facing SOS yield weights, that's CPU.

**22:40** · That means we're looking for the queries that use the most CPU latch ex we're going to sort by reads and by executions and look it for the things that they have in common. I talk to you more about this in my classes in my fundamentals of query tuning class and my mastering query tuning class where we also go into much more detail about how we tune those queries and you get hands-on exercises where I give you a running workload. You have to figure out which queries are causing the problem and then fix those queries and see that the workload gets better. Let's go jump in and go take a look at my own server.

**23:15** · Let's take a look over here in the lab. So over here in the lab back in my server. So what were our top weight types? Our top weight types on this I said we were going to ignore uh CX packet for this class. So I'm going to skip past that one. And my next biggest one is page IO latch. And I said that means the queries that are reading the most data. So let's go use our friend SP Blitzcache. Whoopsy daisy.

**23:48** · Blitzcache. sort order equals reads and then execute. So what this is going to do, and I should say this can take some time to run. It's not going to interfere with anybody else. It's not blocking or anything like that, but \[snorts\] the more complex your query plans are, the longer it's going to take SP Blitz cache to run and the less powered your SQL server is, the less CPU power that you have.

**24:19** · Because one of the cool things that splits cache is doing is it's going through your query plan and it's examining it for all kinds of rules. It's saying, do you have a problem with table variables in here? Do you have a problem with parameter sniffing? Are there a number of missing indexes? Do you have expensive key lookups and unused memory grant? There are all kinds of things that is going through and analyzing and shredding this complex XML can take some time. Now, I know you as a human being, the first place that you want to look is you immediately are drawn to this query text.

**24:53** · You're like, "Oo, uh, select top 50. Oo, that's a problem." Hold that thought. We want to zoom out first. Take a big look at the big picture.

**25:08** · When I say zoom out and take a big look at the big picture if we're looking to fix the queries that are doing the most reads, what I like to do, and I'm running this class, so you're going to do as I say, is I like to scroll over to the reads section. If I'm trying to find C fix CPU problems, then I scroll over to the CPU section. If I'm trying to fix write problems, I scroll over to the right section. But here you'll see we have if I'm fixing reads we have total reads here. And look at how fast or how quickly I suppose I should say those decimal places drop down.

**25:42** · Let me move this over just a little bit. Uh so that I can put my hand over inside here. There we go. So look at how quickly those decimal places drop down.

**26:01** · If I can just solve this handful of top queries here, it's going to make a dramatic difference on how the SQL server behaves overall. Odds are your server looks like this as well. If you can just make a big difference on the top five or six queries, then you want to go back and take a fresh look at weight stats after that after you fix those queries uh so that you can see what the new bottleneck is because the bottleneck will change all the time. Just as a side note, I I can see why people who are just starting out have a problem with being on camera.

**26:32** · The longer you you're on camera, and the more that you hear your own voice, the more comfortable you get with that. And as I'm doing, I do wild hand motions all the time. And I also have to watch myself on a TV monitor here to see what's going on. And at the moment, I strike myself as one of the muppets. Like I've got little metal things coming out of my hand here, and I'm doing all this. \[snorts\] As you can see here, says Kermit doing query tuning. So, all I have to do is fix the top handful up here. Uh, overall, John Doe says, "Brent, you rock." Thanks, John. You roll. So, then I can come back over here and I can say, "All right, I just need to focus on these top few inside here."

**27:16** · And you see the top few inside here. It says proc statement. Procatement.

**27:23** · So this is a little tricky. When you look at this screen, it makes it seem like the number one most read inensive thing is this stored procedure. And the most number one readint intensive thing inside there is this one line. It makes it look like it's some kind of parent child parent child kind of thing. That is not what it is. Because if you look a little further down, for example, there's another well, we'll use uh uh this line in here, 7521.

**27:54** · There's this stored procedure, and then there's the next thing that's involved with that stored procedure is way down here.

**28:06** · What this list is is it's the top 10 things that are doing the most reads.

**28:13** · The number one thing doing the most reads is this stored procedure. this line in the stored procedure, just this one store. Maybe the store procedure only has this one line. Maybe this one line is the only thing that sucks. But if I'm going to tune something, this one line, this stored procedure, this line is worse than everything else in this list. I don't know about you, I like lowhanging fruit. I like to be able to make a big difference as quickly as possible.

**28:41** · With some of your apps, you're going to see a stored procedure line up here. for a stored procedure and then there's going to be nothing in it in the top 10 cuz that stored procedure is made up of a thousand crappy lines that all add up to be really crappy but individually they're not that crappy altogether.

**29:01** · So I want to focus on the statements that are going to make the biggest bang for the buck inside here. So when I go to look at this thing before I go to open the query plan I want to look at what splits cache has as its warning over here splits cache is telling me yo dog when you open this thing up I want you to look at nonsargeable things in the query splitz cache has all kinds of warnings I totally don't expect you to remember what those warnings mean that is where the second result set comes In the first result set has the list of warnings.

**29:37** · The second result set is like a decoder ring for those warnings. So you can see like number three in the list here it says nonsargeables. I give you a URL. Isn't that nice of me? I'm such a nice guy. I put I pay for those URLs out of my own pocket. It's not true. Of course URLs are free. Uh \[snorts\] but we've written all this stuff inside here. Sometimes they're for brennosar.com, sometimes they're for other places.

**30:03** · And then we give you a short description in here, but because you have all the time in the world, I know because you're watching YouTube videos, I would recommend that you go over and read the full URL to really understand what that thing means. So then Dev says, "You're so kind." \[snorts\] So now when I open that query plan, I know that I'm going to be looking for non- sergeable things. So I click on that. And that's really helpful because when I look at these execution plans very often they don't have uh yellow bangs in them.

**30:40** · Okay. So now I'm going to start working on tuning this thing. So how do I go about tuning this query? Let's come back over to the slide deck for a second.

**30:52** · Just a second over here. And now come back over there. Press that button. So now how do I actually go start tuning those queries? Um the way that you go about tuning these queries is to first think big picture.

**31:08** · If SQL Server knows how much data is involved with what you're looking for.

**31:16** · If SQL Server can accurately predict how many rows it's going to find in each of the tables that you're joining from, if it can make those guesses accurately, then it's going to pick the right tables to process first. It's going to pick the right indexes on those tables. It's going to pick the right ways to join those tables together, and it's going to allocate the right amount of CPU and memory in order to do it. when it can't guess those things

**31:47** · correctly, either because your TSQL was written by a monkey sitting in a typewriter just banging its sick Beng's book against the keys or because there's something that's hard to understand about it or that SQL Server didn't build good estimation rules or because it doesn't have good statistics on those columns. There's a huge list of things that will cause bad estimates. But when its estimates are wrong, it does all of these things poorly. When people are just getting started in their career, they'll look at an execution plan when they're reading a plan and they'll go, "Wait a minute.

**32:17** · It should have done an index seek over here. Why didn't it do an index seek over here? I'm just gonna force it. I'm going to use an index hint like force seek or I'm going to use a hash join hint." They'd put all kinds of things hard-coded inside their query trying to fix this stuff when the real thing you need to fix is helping SQL Server understand how many rows are going to come back and what those rows are going to look like because then your queries will be stable unlike you.

**32:48** · The queries will be stable over time. As your data shape uh changes and grows, as you get different amounts of data, as your data is distributed differently across different date ranges, your queries will be able to react because SQL Server will understand how many rows are going to come back. But when you handcuff SQL Server, I know that's your kink, but when you handcuff SQL Server with his hands behind his back and tell it, you got to use a seat, you got to use a hash join. When you do those kinds of things, then the the results are very brittle.

**33:22** · they don't respond well over time. The the query plans can't adapt and shape as your data grows.

**33:29** · So when performance is bad, this is a key part of it. When performance is bad, I want you to read the plan from right to left, top to bottom. And on each of these operators, I want you to compare the actual number of rows versus the estimated number of rows.

**33:52** · When these are more than 10x off, \[snorts\] that's where you want to fix. Read from right to left, top to bottom, looking for the very first place where estimates versus actual goes to hell in a hand basket. Let me hop back over to the demo just to show you. Oh, I know Rachel's king, Rachel says. All right, Rachel, we can talk about that later.

**34:17** · All right. So, uh, the way that we're going to read this is we're going to read right to left, top to bottom, because the first thing that SQL Server did was this thing right here. \[snorts\] That actuals versus estimates is chef's kiss. Absolutely bang on because see, the number of rows that SQL Server actually brought back of the estimated rows is pretty close to bang on. Another way that you can think about this is that you can hover your mouse over this little arrow and there you actually get the labels over it. When you hover your mouse over that little arrow, it says actual number of rows that were brought back versus an estimated number of rows brought back.

**34:58** · But once you know that actuals are on top, I'm a I'm a really big alphabetical guy. Like if something's arranged alphabetically, it's much easier for me to remember that. So this is actual of estimated that a e makes it real easy for me to remember. I don't know about you, but I'm honest to god not very bright. Actual \[snorts\] number of rows of an estimated number of rows. So these are bang on chef's kiss. So we right to left, top to bottom. Here's the next thing that SQL server did was it did this index seek over here. And this is not quite as close. I wish that they would put commas or decimal separators in here.

**35:30** · Hey, SQL Server, how many rows did you think were going to come back? Uh, 341 million.

**35:43** · SQL Server, how many rows actually came back? Uh, less than that. Only 2% of what it expected came back. And because such a low amount came back and matched, everything else in the plan is screwed. everything every other decision that SQL Server made isn't going to make sense for the relatively small amount of data that we thought was going to come back from here. So, generally speaking, you work right to left, top to bottom, looking for the first place where estimates versus actual kind of fall off the horse. Let's come back over here to the PowerPoint.

**36:19** · So, when they're more than 10x or about 10x off, stop. This is the part of the plan you want to fix first.

**36:30** · Now, just a second ago, while I was doing this, I kind of cheated.

**36:36** · I ran SP Blitzcache. And when I ran SP Blitzcache, I had both the actual and the estimated number of rows on my plans. The vast majority of you will not have that. The vast majority of you have been trained over the last 25 years that if you wanted to get the actual number of rows, you had to run the query. Oh ho. Since SQL \[snorts\] Server 2019, there's been a database level option you can turn on. And I think it's a the single missed option most people miss the most. Alter database scope configuration set last query plan stats on.

**37:11** · What this \[snorts\] means is that every time SQL Server runs a query, it's when it caches the execution plan, it's going to update those count numbers inside the cache with the last execution. Now, this \[snorts\] isn't the worst execution. It's not the best execution. It's not the average execution. It's just whoever happened to run it last. So, when you're dealing with problems like parameter sniffing issues, for example, you're going to have a totally separate set of issues there. But this session is about query tuning.

**37:44** · This isn't on by default. This does have CPU overhead. You can imagine in an environment where you run thousands of queries per second that this is going to have a pretty significant CPU overhead.

**37:57** · I only turn this on in situations where I am actively query tuning. If I'm working on a server for a day or two, I will turn this option on so that I can see last actual query plans without having to run the query myself. If you're in the kind of environment where you don't mind running the query, then you don't need this switch. But I don't know about you, but people usually task me with tuning queries that take 10, 20, 30 minutes in order to run. I ain't got 10, 20 to 30 minutes uh what to sit around and wait for the query to run.

**38:27** · That's where this uh option comes in so handy. So whether you're looking at the actual plan because you ran it or whether you're looking at it from SP Blitzcache after you've turned this on, you're going to work right to left, top to bottom through that plan, looking for the first place where estimates versus actual went to hell in a hand basket.

**38:54** · There are two kinds of estimates inside queries. There's early estimates and late estimates. Early estimates are generally driven by your where clause where reputation is over a million where widgets sold is g greater than a thousand where customer name equals Alice things like that. SQL server looks at how easy to understand your wear how easy to understand your wear clause is and then looks at whether or not there are statistics to match what it's looking for.

**39:21** · Then as you join more tables on, you get later estimates where the number of rows that SQL Server thinks are going to come back are purely dictated by averages where you don't have a wear clause filter on the join. You're just saying here I'm going to go find 10 customers. Then I want to go look at sales. Well, if you don't put a filter on sales, SQL Server is just going to guess based on how many sales an average customer has.

**39:55** · Let's take a look over in the uhs SMS at a couple of queries and see if we can fix their estimation causes. Now, I'm not going to start with this big old hairy monster. I'm going to start with something that looks a whole lot similar or a whole lot simpler. I'm going to start with a simple query out of the Stack Overflow database. Go get me the top 1,000 users where location equals India. And I want to get them ordered by reputation descending.

**40:26** · SQL Server, if you read from right to left, SQL Server found 113,000 people who live in India. And it estimated it was going to find about 112,000.

**40:43** · That's great. When SQL Server knows roughly how many people are going to come back, how many rows are going to come back, it's going to make good decisions. So what do I mean by good decisions? There's an icon in here, parallelism.

**41:01** · SQL Server understood that there were going to be a lot of rows that would come back. So it decided to to allocate this work across multiple cores. SQL Server got multiple workers involved, which is a good decision. If it had not done that, this query would have taken longer, and I want my queries to finish quickly. Now, there is a yellow bang all the way over there. Let's look at the yellow bang. If we hover our mouse over that yellow bang, the yellow bang is generally a warning. Yellow \[snorts\] bang says, "Danger. I gave you way too much memory.

**41:31** · I gave you 683 megabytes worth of memory and you only used 34 megabytes. Okay, that's cool. SQL Server, especially recent versions of it, will automatically change that over time. Right now, it's giving us a warning because it granted us 684 megs. If I rerun that exact same query again and again and go look at the execution plan, the yellow bang, yes, is gone.

**42:01** · If I hover my mouse over that select, there's no warning on it anymore. And look at memory grant. The memory grant has dropped.

**42:13** · So this is adaptive memory grants. This is wonderful because SQL server can figure out over time how many how much data is going to come back from here. The number of rows didn't change. The estimate is still the same, but SQL Server is just estimating a more appropriate amount of memory for this particular query. But overall this estimate was fine. Now let's change the query. Here's the query we started with. Now let's change the query.

**42:38** · Instead of saying just where location equals India, let's say, show me all the locations where eltrim rtrim of the location equals India. Now there were no spaces around India before. The reason that I know that is look at how many rows came back. 113,399 11399.

**43:08** · Now let's go rerun that query, but this time we're going to do the Rtrimltrim and look at the execution plan and sadtrombone.com. It's like 113,400. It's not off by only but one. \[snorts\] But look at SQL Server estimates. That estimate is terrible. Now, okay.

**43:31** · So, let I feel guilty whenever I say that anything about SQL Server is bad because it's not necessarily bad. I'm going to be honest between the two of us. The TSQL is bad. People shouldn't be running functions on the contents of columns. But because they did, SQL Server estimated that only 2,000 rows were going to come back instead of 113,000.

**44:00** · So what did that impact? Now we have a yellow bang here. \[snorts\] That yellow bang, if I hover my mouse over it, has a different problem. That yellow bank says, "Warning, I had to write thousands of pages worth of data to disk because I didn't grant enough memory. I only granted 17 megabytes worth of memory." But because you brought back so much data, I didn't have enough memory to hold that data. So, I ended up spilling it to disk.

**44:32** · Now, philosophically, what I wish would happen, 17 megabytes isn't a lot. No other queries are running on this server. The server's got a 100 gigs worth of RAM.

**44:50** · Philosophically, what I wish would happen is that SQL Server would say, "Oh, oh, oh, it turns out you brought more data. Why don't you have some more RAM to work with?" Every other application in the universe does this. If you start with one browser tab, it's not like that's all the memory you get in Chrome or Edge or whatever Brave browser Safari that you choose to use. The more stuff you do, the more memory the application asks for. Not with SQL Server.

**45:25** · SQL Server makes this guess of how much memory it's going to need at the start of the query's execution and it doesn't adapt that as more data starts to come through. It doesn't adapt it until the next time the query runs. If I go back and I run that query again and I go look at the execution plan, now the yellow bang is gone. Well, golf clap there. it means that the first execution is probably going to suck when your estimates are wrong.

**45:54** · Now, I ideally the way that I would like to fix this is I would like my estimates to become correct so that every time we're running queries like this, we're going to get good execution plans right from the get-go because often people won't do things with the right uh parameterized queries. They'll put in something like say China and SQL Server's like, "Oh my god, I've never seen a query that looks like that before. That's completely and totally different. So I better build a brand new execution plan just for China."

**46:28** · And I do find it kind of funny that that ends up with the same 2,000 row estimate. won't won't so when when I think about when we read the query from right to left top to bottom looking for the first place where estimates versus actual go in a h go to hell in a hand basket \[snorts\] in this case SQL server doesn't understand how many rows are going to come back because our query isn't easy to predict our query isn't easy for SQL server to have

**46:59** · it doesn't have any functions on or statistics on the output of functions so the simpler the more understandable you can make your query the more likely it is that your query that SQL Server is going to do a good job of estimating how many rows are going to come back. And yes, that means doing things like taking functions off the wear clause, but I bet a bunch of us know that putting functions inside the wear clause is bad. It's just that you have to teach all your co-workers to avoid doing stuff like that.

**47:30** · Now, that's a relatively simple example. By simply taking off the lrt trim, ltrim, then we're going to get great estimates right from the get-go. And then SQL Server will understand how much resources to dedicate to the query, whether it's memory or whether it's CPU. That's a really simple one. And so, and and I move forward. That's a great comment. Yes, absolutely. So, and remember that because with what we're about to do here. So, let's do something that's a little bit more complex.

**47:58** · Let's get a two-part query. Let's say go find the top one location from the users table, the one that's got the most people in it.

**48:11** · Then go find the top 1,000 people who live in that location. I want to see them ordered by reputation descending. I want to find the biggest place on earth with the most people who using Stack Overflow and then out of that who's winning the fist fight for the most reputation points. So let's execute this and I'm going to read it from read the plan from right to left top to bottom and way over here on the right hand side. How are these estimates looking?

**48:46** · Well, first off, it says clustered index scan across the users table. SQL Server was able to estimate that there are about I don't know four million people inside the users table who filled out their location. So far so good. Things start to get less good over here. This is where SQL Server is grouping together people by location. Now, one of the things that I wish SQL Server would do, I wish that when I hovered my mouse over an operator, I wish that it would hover over the part of the query, I wish that it would light up the part of the query that it was executing.

**49:18** · Wouldn't that be cool? Because otherwise, like you and I, when we look at stuff that says hashmatch aggregate, it's not really obvious what that thing is doing. So, one of the best tips that I can give you when you're trying to understand what something is doing, like what part of the query it's doing and why its estimates are so far off, hover your mouse over it. Hover your mouse over it and look down at the bottom at the output list. What's coming out of here?

**49:54** · Now, I really wish that this expression here, for example, I wish this would say things like count star, that it's counting the number of rows that are inside here. But the more that you read about this stuff, the more that you learn about it, you'll understand that this is grouping things together by location.

**50:12** · Let's try to run just that part of the query by itself. Let's try to run just the CTE port and hit execute and go look at the plan. And it looks really familiar, doesn't it? It's the same shape as what we were looking at before. SQL Server is doing, in this case, the CTE first. So, I'm going to ask you a question, and there are lots of good answers to this. How can I make SQL servers estimate more accurate?

**50:42** · When it comes time to guessing how many people live or how many locations there are in Stack Overflow, \[sighs\] how could I go about doing that? How could I make it easier for SQL Server to find the top one location? And Joseph says over in chat, also Joseph's last name is Phat. So maybe that's I'm going to stop there. Um, so Joseph says, "Hey, there's an index that SQL Server recommends on location here. Let's go take a look."

**51:12** · So if I say create index location on DBO users location, that does a couple of things. One of the things that it does is it creates an index on location. And so then that way SQL \[snorts\] Server is going to be able to do this work faster. Let's come back up here and we'll rerun the query again as our location index finishes creating.

**51:40** · So pro tip whenever no off we go. Okay. Okay. So, if I go look at the plan \[applause\] now, our estimates are chef's kiss, \[applause\] but they're not chef's kiss because of the index.

**52:04** · They're chef's kiss because of statistics.

**52:10** · Because here's what happened. Let's say drop index location on DBO users and I go back and I run the crappy version of this part of the query again. Go back and rerun the crappy part of the query and our estimates as we can see here estimates are back to bad. Well, why why are the estimates bad? Let's say DBCC show statistics DBO users location.

**52:40** · How \[snorts\] is SQL server know how many people live in a given location? Well, this is the output of DBCC show statistics. I teach you how to use this in my how to think like the engine class. It's totally free. It's available on YouTube. And \[snorts\] over at the top left, you can see there's this WA cis statistic. SQL services. Oh, you're asking questions about the location column. I don't know anything about the location column. So, I better build a statistic on the location column. There's the location column.

**53:18** · SQL services. But time is money. Watches are expensive. So I I can't afford to sk s sample all of the rows in the table. I'm in a hurry. Joseph wants his data quickly. So I'm just going to sample a small percentage of the data. SQL Server sampled a small percentage of the data.

**53:38** · Even though this is only a tiny one gigabyte table to SQL Server, even one gigabyte is big data. So SQL Server decided to sample all of that data. and it assumed that everyone else's locations look exactly like the sample that it retrieved.

**53:57** · When I created an index, when I ran this create index command, what happened was that SQL Server said, "Oh, you know what? I'm looking at all of the rows on location. If I have to go build an index, I have to go build a list of everyone's location. Wouldn't that be the perfect time to update my statistics to actually sample all of them?

**54:27** · So now the number of rows sampled is equal to the number of rows in the table. So because SQL Server took a really close look at the entire table, suddenly I have accurate estimates when it comes time for me to guess how many locations are there.

**54:48** · So why I said technically the location doesn't fix it or the index doesn't fix it is because if I drop it and I go uh update statistics dbo users with full scan. This tells SQL server I want you to read every page in the table. I want you to build a perfect set of statistics on this in order to get how many rows match through, you know, all the locations, all of the display names, whatever. Now, you'll notice this takes some time.

**55:21** · This takes some time because SQL Server actually reads every page in the table. And even worse, it reads it for every single uh every single uh statistic that we have. Pierre says, "Love the how to think like the engine voice. thought it would be more robotic. I always think of SQL Server as a guy because he's dumb and stubborn and he refuses to ask for directions. He's all, "Trust me, I got this." when he doesn't actually got it.

**55:53** · So, if we go back and we run that top part of the query again, you'll notice that we have perfect estimates even though we don't have the index. \[applause\] There are lots of ways to fix these estimates. Sometimes it's about making your TSQL more accurate. Sometimes it's about making sure that your statistics are updated with full scan. In the case of this one, I actually don't mind the index on location. The index on location can be helpful. It can get us across the finish line because it also helps us execute the query faster.

**56:27** · So, let's go ahead and execute that index on location. But again, I am fine with also updating the statistics with full scan is also a perfectly valid answer to this. So, let's go back and run the first part again and make sure that our estimate is correct.

**56:46** · And voila, French uh chef's kiss, not French kiss. I don't like the execution plan that much. As we read from right to left, top \[snorts\] to bottom, SQL Server's estimates are absolutely bang on, absolutely perfect. So we solved that part of it. Let's now come to this part. Let's go run the whole thing. And if we read it top to bottom, right to left, top to bottom as what? So here's the first thing the SQL server did.

**57:18** · Estimates. Chef's kiss. Chef's kiss. Fantastic. Fantastic.

**57:24** · Fantastic. Bravo. Applause. Things are looking Oh god.

**57:31** · Now I have a new part of the plan where SQL Server estimated poorly.

**57:37** · Working through query tuning is working through from right to left, top to bottom, trying to figure out where your estimates go to hell in a hand basket and what you're going to do about them.

**57:48** · Again, I wish that I could hover my mouse over like regions of the plan so that SQL Server can show me up ins SMS what parts of the query are involved.

**57:59** · Unfortunately, it doesn't have that advanced technology. So, instead, \[snorts\] you're just going to have to believe me. What happens in this top part here leading up to the uh parallelism is \[snorts\] where SQL server is finding what is the top one location and then SQL server hey how many people live in that top one location 14. Uh SQL server how many people actually came back from the top location? Uh more than 14.

**58:31** · So now I have another problem that I have to go and solve. Now there are several people in here asking about statistics. So if you want to learn more about that, go check out over on YouTube. We have a totally free like 2-hour long class on statistics that goes into more detail.

**58:51** · If you go to uh YouTube uh search for Brentos statistics, there's a whole playlist full of stuff by me and Doug Lane that talk about how statistics work in SQL Server, how you should keep them updated, what tools we recommend, how multicolumn statistics work, and much more. All totally for free because I love y'all. Now, back over to this.

**59:15** · So, working through this can be kind of a pain in the rear. there's there's all this stuff that you have to work through and understand what your different different options are and how you're going to go about solving that. So, one of the things that I love the most and I love teaching people how to do this. We go into detail on it on fundamentals of uh of uh uh query tuning and on mastering query tuning as well. Doing this can be a lot of work though. So, one of the cool things that we have with SP Blitzcache is an AI parameter.

**59:41** · And just like with yesterday's videos on or two days ago's videos session on uh how to tune indexes with AI, you also do the same thing. We build stuff for you with uh SP Blitzcache as well. If you do AI equals 2. Now, because I just blew the plan cache because I was changing so many things about the tables, I I got to go re throw my server under load. So things are going to run for a minute with splits cache AI equals 2.

**1:00:08** · Now you get this additional par or additional column here that says and this is a prompt that you can go copy paste right into your favorite LLM into chat GPT into claw Gemini whatever we're going to I'm going to show you what's inside here here in a second. We have \[snorts\] a couple different options for AI. If you put in AI equals 1, we will actually call AI for you. We will call your AI provider, chat, GPT, Gemini, uh, uh, Claude, whatever.

**1:00:40** · Um, there is more setup with that, and it only works on SQL Server 2025 or newer or Azure SQL DB. Because most of y'all aren't on those platforms, you're probably going to want to stick with AI equals 2. Plus AI equals 2 is instantaneous. Whereas \[snorts\] with AI equals 1, because we actually do G call, you know, chat, GPT, Google, Gemini, those can take 30 seconds or 60 seconds per row of the result set.

**1:01:15** · So it can take 10 minutes in order to run this exact same stored procedure for going through and calling those this way. The nice thing about this is that you can just call it for the specific rows that you care about. So let's run it again. And we're going to have some uh different rows inside here for more complex queries. So here we \[snorts\] have one of those stored procedures that we were looking at earlier. Um I'm going to come across and grab one of the AI prompts. So if I click on the AI prompt, you can see here we've got a set of prompts up there at the top for the AI.

**1:01:48** · Part of what I want to coach the AI on is that I want to tell it the kinds of advice I want. And I don't want it to ask me for more help. Very often AI prompts are geared towards here's a little bit of the answer. Tell me what you want next. And it's I would rather tell it, hey, look, well, I don't have time for that. Go give me everything I need right now and I I don't have time for follow-up questions.

**1:02:19** · Then it gives me here's what the metrics look like in production. If I come down further, it says uh here's the query text so that you can copy paste that back and forth. And here's the execution plan pasted in in a way uh that's easier for stuff like chat GPT to understand. So I can copy all this out. I'm going to just go over here just like you would hit copy. Go over to chatgpt.com.

**1:02:48** · Start \[snorts\] a new session. Paste this in. And I I this is too long to show in in text field because this is a lot of data that's inside there, especially the larger that your execution plans become.

**1:03:02** · And uh this is amazing. I just absolutely love uh the kinds of advice that you get very quickly. Um where \[snorts\] it goes through and interprets stuff. It'll tell you what uh whether or not the index recommendation makes sense based on its analysis. Uh what you need to change about existing indexes that aren't as efficient. Um we'll come on down and it the way that I really like it even gives you a rewrite. Says here you go avoids repeated expressions and uh uh protects against divide by zero and then \[snorts\] gives you a final deployment script.

**1:03:33** · And in that deployment script, it gives you a create index statement with advice tailored to your version of SQL Server and whether or not it supports things like sort and temp DB and it tells you what to expect in terms of the answer. All this was in like 30 seconds. Now look, I know a lot of people have problems with AI. I know that a lot of people are like, "It's coming for my germs."

**1:04:01** · If it's coming for your job, it's coming regardless. Why don't you make it do your job as long as you're getting powerful? This is really cool. Now, I do have to say that when you're doing query tuning, it is so important to choose the right models. And choosing the right models depends on which user interface you're using. If you're using chat GPT, for example, you want the expensive models. Do you want the thinking the latest model because the lighterw weight module that you get the crappier answer that you uh are going to receive back.

**1:04:35** · Also, I'll also tell you co-pilot is quite frankly not very good inside of SQL Server Management Studio. Now, I'm going to give you an an example. So, right now we're tuning this USPQ57521.

**1:04:55** · So, I'm going to take USPQ7521. I'm going to script it out in the window. I'm going to say programmability store procedure 7521.

**1:05:07** · I'm going to put it in the window here so that chat GPT has it. Then I am going to move things around a little, make it easier for y'all to see. I'm going to start a new chat with Copilot. And I'm going to say um the stored proc. Let's zoom in so you can see it. USPQ7521 isn't performing well. How should I make it go faster?

**1:05:36** · Now, in fairness, I should also say if I go look at the the drop down here for models, there are model choices that you have. Chat GPTs 55 is not in this list because SMS does not have uh the ability to use chat GPT 55 yet. Right now it only has kind of relatively older models out of the older models that it has. The best one that it has is 3.1 Pro. So I'm going to use the best one that we have here, 3.1 Pro. In fairness, when I hit send on here, this prompt is not as good as what came out of SP Blitzcache.

**1:06:06** · I didn't say things about the metrics, for example. I didn't say things about here's the execution plan. So, I'm relying on Copilot to do it, which is what most people will work. Um, what most people will uh uh uh do in terms of prompting it. So, what it's going to do is it's going to go look at the object. It's going to go script it out. It's going to go take a look at what its metrics look like. And look at how much time it takes. Look at how slow this is relative to GPT55.

**1:06:38** · It's just it's not even close. Now I can paste I can take the exact same thing that we pasted over from SP Blitzc. So this is this is funny. It's so now it's putting in now it wants two recommended indexes instead of a C-pilot. Um let's see if it also does a rewrite for it. It's still waiting. It's still doing its thing.

**1:07:07** · I think it says that. No. No, it just said create those two indexes. It didn't even rewrite the query for me. Whereas chat GPT rewrote the query for me. So let's do one other thing. Let's start a new query and let's take the whole thing that I from the prompt that I got that I pasted over to chat GPT. Let's go to that AI prompt. I'm going to copy the whole thing in and I'm going to go paste it over into the co-pilot chat window and hit send.

**1:07:36** · Now, the so this is going to take long and or take a while in fairness because this is an older model relative to GPT55. The reason that I'm doing this is I'm just showing you the the better way to use AI isn't just to say to Copilot, "Yo, dog, go do my job for me." You want to give it as much background information as possible. Um, and sadly here, sadtrombone.com, it still I should put it up there. it still doesn't recommend uh rewriting the query.

**1:08:07** · So there's where really you uh want to do a better job with sending it to a higher powered model. Um okay so all this is awesome. Let's come back over to the slide deck for a second. Come over to here.

**1:08:25** · So I said in terms of getting advice from AI, uh remember demos with public databases look artificially smart because the AI remembers what it's seen before. Uh whenever you see people doing demos with adventure works, Northwind, Stack Overflow, databases like that. These are public databases. So the AI has been more deeply trained on those databases. So they tend to give you better answers. Your realworld databases, uh you're going to have to give it that same level of background. you're going to have to give it your uh database schema, the definitions of the stored procedure and so forth. You also need to think about what that means for AI.

**1:09:01** · So, what that means is that if you continuously send in context and information about your company's databases, that also means that your company's databases are going to become part of the training set. Um, various LLM providers will say things like, "We would never use your data for training." And then you have to watch their terms of service because they later go and opt in and they say, "We are now going to use your past stuff for training." You know, so you have to make sure if you're going to be in that, you're going to opt out of that stuff. Um, and the bigger the better that you use for models, the better advice you're going to get.

**1:09:32** · Now, if you do this a lot for a living, as I do, you want to gather this data as quickly as you possibly can about which queries are performing poorly, what your weight stats uh uh look like, what kinds of indexes you need to focus on. I certainly do. I do performance tuning fulltime uh as a consultant. I specialize in two-day turnarounds where I have to turn servers around as quickly as possible and I have limited time amount to do it. I can't imagine trying to do it without the consultant toolkit. The consultant toolkit is a tool that I built for y'all. I did not build.

**1:10:03** · Richie Rump on my team, Joris, who shows up in YouTube chat all the time, uh, built that goes through and runs all kinds of diagnostic queries for you. Uh, you install it on your workstation, not the SQL server itself, and then you point it at the workstation you want or the SQL server you want to go analyze. It then goes and collects all kinds of data so that you get an Excel spreadsheet that has everything that you need plus queries uh that you could query queries and query plans that you can then go use to tune disconnected. Let me show you how it works.

**1:10:38** · So I'm going to hop back over into my workstation. And in there I've got let's go pop into Windows Explorer. Not SQL query stress. Let's go pop into Windows Explorer and then I have already put in here this PC temp consultant toolkit.

**1:11:10** · So I have already saved in here the consultant toolkit. Consultant toolkit has a bunch of files. It's just one folder. You don't have to install anything. You can put this on a network share and just run it off of the network share. Really useful for big companies. So if I then go run it, the the easy way to run it is you can simply double check doubleclick on it. You can double click on the SQL server checkup application and that connects to whatever local SQL server you have. However, you can also run it from the command line and you can point it at servers. You can say go gather data from that SQL server over there.

**1:11:45** · So if I double click on it, it just spawns up a command window that connects up to the SQL server and starts running all kinds of diagnostic queries on the server. It runs SP Blitz. It runs SP Blitz first, SP Blitz cache and saves this data out into an output folder. Let's go take a look at the output folder.

**1:12:05** · So the output folder here, if I maximize this, it gives me all kinds of stuff.

**1:12:12** · So, for example, it gives me an Excel spreadsheet that has a tab for each of the diagnostic info. So, it has a tab for SP Blitz. It has a tab for SP Blitz index and the different modes for SP Blitz index. Has a tab for your weight stats just like we saw for your top weight stats on the server that I showed you from SP Blitz. First, same thing comes out of here into the Excel spreadsheet. And I'll show you what that looks like. Plus, you get your top queries by CPU, your top queries by reads, top queries by duration, any queries that have missing the top queries that have missing index recommendations.

**1:12:44** · Let's go back over to the slide deck so you can see uh what this looks like. Come over to here and come out to here. So, when I open up the spreadsheet, I get a bunch of tabs going across the bottom kind of organized by category. The first time tab gives me stuff like uptime and how large the server is because obviously I don't want to make any diagnostic call decisions on a SQL server that's been up for like 24 hours or less.

**1:13:15** · There's just not enough diagnostic info in there since SQL server keeps everything up in memory rather writing rather than writing it to disk for diagnostic purposes. Then it's got tabs for SP Blitz so you can make sure that the conserver has its database backups done, that you're not facing any kind of database corruption, uh that you don't have bad performance settings like auto shrink turned on. Then there's a tab for your weight stats so you can see where your top weight stats are. And this is how I used to figure out whether or not the client's really having a performance emergency or not. Uh the shows me their thread time and their total weight time.

**1:13:53** · So the higher that weight time is, the more of an emergency it is. And that also tells me which weight stat I need to focus on for query tuning. So I can decide whether or not to look at queries by CPU, queries by reads, and so forth.

**1:14:08** · All kinds of tabs. Uh information about the plan cache, what are the top 10 queries that have been uh used the most reads, the top 10 queries that have done the most average reads. When they run individually, they suck really bad. And \[snorts\] much more. There are more tabs for high availability and disaster recovery, the error log, perfmon counters, and much more. If you're a consultant, this also can be set up to automatically upload data to your AWS S3 bucket. So that then your clients can just run this and it data goes straight up to you for your own analysis based on how you configure the bucket.

**1:14:40** · You just and we give you instructions for that. the files can only be written there and not read so other people can't see other clients data. We can even automatically import the data into a database for you so that you have one SQL server database or Azure SQL DB that tracks data from all of your clients. For example, when I'm working with clients on a long running basis, I have them just schedule this to run once a day, sends me the data, and then I can go look to see how their servers are doing without having to connect into them or run expensive per client monitoring software.

**1:15:19** · I'm surprised by how many people we have who are database administrators who run this. And the the one that I hear the most often is giant companies think like international global companies where the DBA has to support all kinds of other departments. They have to support the sales department, the accounting department, the inventory department and they're not allowed to go connect to all these different servers. Whenever people create a help desk ticket, these DBAs just say just run this utility, send me the Excel file that comes out of that and I'll tell you what's wrong with your SQL server. Me as a consultant, I cannot imagine trying to do my job without that. It is absolutely lifechanging.

**1:15:54** · It helps me uh work on more clients in less time so that I can make less make more money with less expenses on my part. Just life-changing.

**1:16:12** · So to recap what we talked about inside here, what you learned was that you were first want to start by looking at your weight stats with SP Blitz first since startup equals 1. based \[snorts\] on whatever those weight types are. That's how you determine which queries you want to go focus on. There splits cache has so many sort orders. You only want to focus on the sort order that's going to make the biggest bang for the buck in terms of your server's performance. Then go check the the uh uh query design. I put in here sort order equals mine. What I mean is that you either want to look at reads or by CPU.

**1:16:41** · If you're facing these weight types, either put in sort order equals reads or sword order equals CPU and turn on AI equals 2 so that you can copy paste those AI prompts out and then go paste that into uh chat GPT or Google Gemini or uh uh whatever it is that you'd like to use, Anthropic Claude. Um, keep in mind that when you're pasting into AI, that stuff if you don't have an agreement with that company, your stuff may be used as part of the training data and you but use the biggest model that you can in order to get the best advice possible.

**1:17:12** · We cover all of that and more in our training classes. If you go to brentosar.com, I've got training classes, I've got fundamentals, mastering, all that and more. Plus, I have the consultant toolkit as well where you can go buy it. It's sold either per person or for an entire company license so that you if you're in a large company with dozens of DBAs, you can pick that up and have everybody use it really quickly and not have to worry about reinventing that wheel there. All that's available over at brentosarr.com/go/toolkit.

**1:17:53** · So, \[snorts\] let's hit some of your questions that came up through uh the course of this. Um uh Mr. Dave Hubble says, "Will you be uploading these sessions so that you can rewatch it later?" I missed the index one on Tuesday. So I have a live index one next week and also these will be up on YouTube as well later. We need to talk about your punctuality but I'll leave that for another day. Um let's see here. Uh Alex says, "Can you recommend a similar set of tools for Postgress?" No, I'm not aware of anything like this for Postgress.

**1:18:20** · Actually, that's one of the things that I love about SQL Server is that there's this really thriving ecosystem and bloggers and all that open- source kits uh for first responder type stuff that are really centralized and proven over the decades, which is magical. Um, let's see here. Next up, we have uh coming back a little further because I know there was something else uh co-pilot. I know there was something else. Oh, uh yes. Uh uh JG says, "Is there a different or more preferred model?"

**1:18:52** · Because he says he's been sticking with Claude Opus and uh Sonnet. I am with you in that I adore Claude Opus. It's a little on the expensive side uh compared to most of the tools that are out there, but in my opinion is usually like even if it costs me 50 cents or a dollar to tune a given query, that's still cheaper than me trying to spend 20 30 minutes uh reverse engineering it. Now, also, of course, the AI can give you bad advice by all means.

**1:19:21** · This is something that you have to check and prove out, but for 50 cents or a dollar, it's totally worth it as at least as very minimum as a starting uh point. All right. Well, thanks for hanging out with me today. Hope you all learned something and I will see you on the next live stream. Adios everybody.