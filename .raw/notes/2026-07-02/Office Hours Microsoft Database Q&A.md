---
title: "Office Hours: Microsoft Database Q&A"
source: "https://www.youtube.com/watch?v=lCbPSYmCTHg"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2026-04-14
created: 2026-07-02
description: "Let's go through your top-voted questions of the week from https://pollgab.com/room/brento. Here's what we covered:00:00 Start01:37 DBAInAction: Hi Brent, could you please suggest an archival/purgi"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=lCbPSYmCTHg)

Let's go through your top-voted questions of the week from https://pollgab.com/room/brento. Here's what we covered:  
  
00:00 Start  
01:37 DBAInAction: Hi Brent, could you please suggest an archival/purging strategy for multi-TB tables to free up disk space? Also, is there a recommended method for designing archiving/purging process for new databases before they become too large? Thank you!  
03:47 MyTeaGotCold: I was surprised that Mastering Server Tuning never mentioned what you can do with files and filegroups in user databases. Do you find that they solve problems for you?  
06:52 Forgetful: Do you ever recommend putting the tempdb log file on a different drive to the tempdb data files?  
07:42 Adrian: Hi, would you enable tempdb ADR by default for new SQL 2025 servers? Any risks or negatives to consider, especially in combination with Availability Groups?  
11:12 Dopinder: For SQL Server multi tenancy, one database per account seems optimal in limiting potential future corruption. However, doesn't SQL AG tip over in the one database per account model due to AG database count limits?  
13:40 FrugalShaun: What’s your go-to stat for measuring SQL Server throughput? When I want a quick comparison with past performance I check Batch Requests/sec, but that shows requests received, not necessarily work actually completed. What do you rely on instead?  
15:02 Micen1: I have a customer running MDS on SQL 2019, they are looking to be able to run it on Azure SQL db but it seems that the MDS app still needs IIS on a vm? Do you the future of MDS or could you give your thoughts abouts its future and what to expect?

## Transcript

### Start

**0:01** · Good morning party people and welcome to Office Hours, the live stream where I go through your top voted questions from Poll Gab and answer them about Microsoft SQL Server, Azure SQL DB, etc. Uh \[snorts\] it is a nice Monday morning here in the office back in Las Vegas. I am prepping for SQL Bits next week. I'm giving a training day workshop called Dev Prod Demon Hunters or Dev Prod Difference Hunters. I forget which one I called it.

**0:33** · Um themed after the uh K-pop Demon Hunters movie and I just happened to get my Demon Hunters meal yesterday from McDonald's. They do these uh K-pop Demon Hunters meals so you can either get the Hunter one for lunch or the Sajak Boys breakfast. I have not had the Sajak Boys breakfast yet. Friends of mine have and they absolutely rave about it, which I find kind of funny.

**0:58** · So let's go through your top voted questions from Poll Gab. Oh, Surly Dev says "Hop Happy Easter." Uh Surly Dev says "I know you don't usually answer questions from chat, but did you eat many chocolate eggs?" So no, my partner has a medical thing that they have to go to this morning and they had to fast yesterday. So I only could So we didn't do anything Easter related in the house and if I wanted to eat, I had to leave the house and go do it somewhere else so that I didn't distract them. So that was a little tricky. Uh Eli's here. Good to see Eli. Drop table employees as well.

**1:31** · So let's go see what we got over here in the top voted question. Top voted question is from DBA in action who asks "Hi Brent, could you please suggest an archival or purging strategy for multi-terabyte tables to free up disk space?"

### DBAInAction: Hi Brent, could you please suggest an archival/purging strategy for multi-TB tables to free up disk space? Also, is there a recommended method for designing archiving/purging process for new databases before they become too large? Thank you!

**1:46** · Okay, so this comes up so often that I actually have a blog post about it in queue.

**1:53** · People think uh when they're going to archive something, they think that there's some kind of magical way that we can archive in SQL Server Azure SQL DB while still keeping the data around for queries. They expect end users expect to still be able to query the old data. We just want it to somehow be cheaper magically and that's just not how databases work.

**2:15** · Uh in fact, Microsoft did bring out a solution for this called stretch table where you were supposed to put your old archival data data up in the cloud um and they architected it so piss poorly. I mean, the product was fine and there wasn't really anything wrong with it, but the marketing team got so poorly involved that the price was astronomical and it was the exact opposite of what you would want. Instead of the old data being cheaper, the old data was more expensive than your production data. So that just didn't uh end up working out at all.

**2:50** · So there's not really a solution in SQL Server Azure SQL DB if you want to keep the data available for querying.

**2:58** · \[sighs\] But there are a few crappy solutions that I talked through those in the blog post.

**3:03** · If all you're trying to do is get rid of the old data, search for Brent Ozar how to delete just some rows from a really large table and in that blog post, I cover the fast ordered delete technique that I did not come up with. Microsoft came up with it and it's just that they keep relocating all their blogs every 5 years and trashing all their URLs.

**3:28** · So in one of their great reorganizations like 10 years ago, they destroyed all existence of that blog post. So I blogged about it in order to keep that same technique alive, how to delete just some rows from a very large table.

**3:45** · Uh next up, My Tea Got Cold says "I was surprised that the Mastering Server Tuning class never mentioned what you can do with files and file groups in user databases." Oh, that's a great point. It says "Do you find that they solve problems for you?" So in my weirdo consulting job, I have to give people answers that are going to make a big difference quickly.

### MyTeaGotCold: I was surprised that Mastering Server Tuning never mentioned what you can do with files and filegroups in user databases. Do you find that they solve problems for you?

**4:08** · Generally, I can't give people answers that will require major re-architecture or downtime. And unfortunately, adding more files and file groups, it doesn't necessarily cause a huge downtime, but it is something where you have to reorganize or rebuild indexes in order to spread the data across those files. Really, they only pay off when SQL Server can access multiple files simultaneously scattered across multiple volumes each with their own dedicated independent throughput.

**4:45** · And so you tend to not see that as something that'll get you across the finish line short term. However, having said that, I am a huge fan of when your database crosses over the 1 terabyte mark, if you still only have one data file, that's a good time to step back and say "Why don't we go ahead and look for our next server, how we're going to split that throughput across four volumes? Can we get four volumes that each have lots of throughput?"

**5:17** · And then uh restore the database over onto that one after we've done load testing, then add multiple more files in a file group and rebuild your indexes across those. I'm also saying that at that 1 terabyte mark, you're probably on SQL Server Enterprise Edition, which means that you can rebuild objects online and you can use the new wait at low priority uh features in order to do that without too much downtime.

**5:46** · Now, it is still something that requires you to look at your primary replica, your secondary replicas, QA servers, etc. anywhere that you would restore the production databases over to, you're also going to have to adjust your strategies there as well. So you can start to see how much thinking is involved with that, how much planning uh and why it's not something that I can recommend to anyone to just anyone.

**6:15** · I should add that. I should add a module on that though to the Mastering Server Tuning class to explain why it's not something that you do for a short-term fix, but it is something that you should add to your arsenal as your database crosses the 1 terabyte mark. There's nothing special about the 1 terabyte mark. It's just that usually by the time an application becomes that large, it's also going to continue growing for the foreseeable future cuz people just never want to delete data. They don't want to hoard they want to hoard everything for absolutely forever.

**6:45** · Uh shout-out to Surly Dev for putting that link over there in chat. Got another one about multiple files and file groups.

### Forgetful: Do you ever recommend putting the tempdb log file on a different drive to the tempdb data files?

**6:53** · Forgetful says "Do you ever recommend putting the tempdb log file on a different drive to the tempdb data files?" Nope. That isn't something that you're going to see as the the thing that gets you across any kind of meaningful performance finish line. You can leave that on exactly the same drives. Generally, when I'm setting up for a new server, if it's got relatively few cores, I'll say just put in four tempdb data files and one tempdb log file. Make them all exactly the same size.

**7:22** · So just take if you have for example a 1 terabyte local solid state that you're using for tempdb, 1 terabyte divided by 5, you're talking 200 gigs a piece. Just create all those, dump them on that local SSD and call it a day.

**7:38** · Uh next up, Adrian asks "Hi, would you enable tempdb's accelerated database recovery by default for new SQL Server 2025 servers? Are there any risks or negatives to consider?" Yes. Um so I do not recommend it by default. Accelerated database recovery, what it does is it puts the version store or it keeps copies of your uh updates and deletes, keeps copies of them inside your user databases.

### Adrian: Hi, would you enable tempdb ADR by default for new SQL 2025 servers? Any risks or negatives to consider, especially in combination with Availability Groups?

**8:09** · Well, now if you have an out of control transaction, instead of tempdb blowing up, your user databases blow up, which means that they're going to take more space on your secondary replicas. They're going to take more space for your backups. It's going to be more internal engine maintenance that has to be done to get rid of those old row versions.

**8:33** · I don't have anything against accelerated database recovery. I love the idea of the feature. It's cool. It's just in the real world, it seems that there are a lot of people who can't get their act together around controlling drive space. For some reason, it feels like there's still a lot of managers who are like "Drive space is expensive. We need to shrink our files. We don't want any extra space in our database."

**9:01** · And then they end up shrinking those things and they can't understand why accelerated database recovery just keeps blowing them back out as you have out of control transactions.

**9:12** · So if you're good at having lots of space available for your user databases, if you are not worried about running out of drive space, and if you don't have transactions where someone types begin tran and then locks their machine and goes home for the weekend, if you don't have those kinds of problems, then sure, accelerated database recovery is great. I just seem to know a lot of people who can't get their act together around that.

**9:42** · Drive Drop table uh employee says drive over in chat says drive space is expensive now and Enough Stuff follows up with maybe in the cloud. That is exactly correct. So what's tricky though is Drop table employees, what you're not getting is drive space is cheap, performance is expensive cuz typically with database servers up in the cloud, we end up having to massively over provision space in order to get the IOPS or the throughput that we want.

**10:09** · So then that the usable space becomes expensive even though that space itself isn't that bad. Now, drop table employees is also probably referring to the fact that with all these AI companies sucking up all of the available SSDs and hard drives and memory that that has become expensive and to some extent that's true.

**10:32** · Um \[snorts\] I had a memory chip fail in this desktop and I was like, oh, and it was covered under warranty but I had to go send it back to the manufacturer and I was like, oh, let me just go see how much it'll be to go get another replacement set while I wait cuz it's going to be like 3 months they said before they would give me another chip back. And the memory in this I have 128 gig do I have 256?

**10:54** · I have 128 gigs of memory in that thing. Um and it the memory cost now is three times more than what I paid for it. That that alone is I was like, maybe I should just sell this desktop cuz I hardly ever use it. Next up, Depinder says for SQL Server multi-tenancy, one database per account seems optimal in limiting future corruption. What? No, no, no, no, son, no.

### Dopinder: For SQL Server multi tenancy, one database per account seems optimal in limiting potential future corruption. However, doesn't SQL AG tip over in the one database per account model due to AG database count limits?

**11:22** · The more of something that you have, that does not make things more reliable. Think about it for a second. If you have a hundred of something, it is more likely at any given time that one of them is busted.

**11:44** · If each database has a fixed percentage of it, maybe it's this likely that it's going to experience corruption. The more that you have, the worse that things will be. For example, if you have your storage start to become corrupt, you're going to see it going across all of the databases. It's going to spread like a virus, not from one database to another but from the underlying storage.

**12:06** · You're going to have corruption all over the place and you're going to have more work to do instead of less. I reject that the idea that one database per client is a good idea for corruption reasons. That's not very bright. He continues with, however, doesn't SQL Server availability groups tip over in one database per account model due to AG database count limits? Yes.

**12:30** · Forget set set aside, if you're using availability groups, you do not want one database per client. Do one database for groups of clients and if you want, you can put the West Coast clients in one database, European clients in another database, then you can move those later as you start to scale if you need to for data governance or compliance reasons but not one database per client when you're just getting started.

**12:53** · There are pros and cons to doing that but you just have to remember that if you're dealing with like business to consumer type stuff, you'd end up with hundreds of thousands of databases and it's a recipe for disaster. I have one of my clients, several of my clients actually, who've used that and hit massive walls when they hit 30, 50, 100,000 databases that management was an absolute nightmare.

**13:19** · Now, it does have advantages too as well. If you want to learn more about the pros and cons of that, search for Brent Ozar how to design multi-client databases and I've got a list out there of the pros and cons. It's totally free. It's out on the blog. Next up, Frugal Sean asks, what's your go-to stat for measuring SQL Server throughput? I want a quick comparison with past performance.

### FrugalShaun: What’s your go-to stat for measuring SQL Server throughput? When I want a quick comparison with past performance I check Batch Requests/sec, but that shows requests received, not necessarily work actually completed. What do you rely on instead?

**13:46** · For me, it's like latency time. Oh, Digmund, thanks for following. For me, it's latency time on queries, like your P95 latency time. What's your worst case latency when people send in requests?

**14:03** · SQL Server, oh wait, Kyle's is here too as well. SQL Server does not make that easy. SQL Server does not count things like P95 latency delays, like how long 95% of your queries finish within this time span.

**14:19** · It's something that's much easier to catch via application side monitoring and I would actually rather prefer that my teams monitor from the application side cuz that way if you use tools like Data Dog, New Relic, the MVC mini profiler, those tools will give you a complete picture of your entire infrastructure. Is it an app server problem? Is it a database server problem?

**14:42** · And since they have to monitor that from the application side anyway, I'd rather lean on them for it to just say what percentage of the time we're waiting for the database or the app servers or whatever. Um yep, there we go.

**14:58** · Next up, My San says, I have a customer running Master Data Services on SQL Server 2019. They are looking to be able to run it on Azure SQL DB but it seems that the MDS app still needs virtual machines. Do you What do you think the future is of MDS? I don't think it has a future.

### Micen1: I have a customer running MDS on SQL 2019, they are looking to be able to run it on Azure SQL db but it seems that the MDS app still needs IIS on a vm? Do you the future of MDS or could you give your thoughts abouts its future and what to expect?

**15:16** · I think it's one of those things that sounded interesting to somebody in marketing at one point and it sounds like it solves a problem but businesses are not willing to invest in what it takes to solve that problem cuz Master Data Services involves all kinds of involvement from your development teams, your documentation teams, your data warehouse teams, your reporting teams. All kinds of people have to get involved with the same product.

**15:47** · And it's just had so many limitations cuz it got started as a new product. You know, you can't a version one of something can't solve every possible problem. But it has to solve so many problems across so many teams and the product just wasn't ever there. Plus, they made the mistake of building it initially in Silverlight, which was Microsoft's alternative to I think Flash and then the Microsoft development teams in charge of Silverlight put a bullet in that thing and then the MDS teams have just never really recovered.

**16:15** · So I I don't see that as a long-term something that has a lot of legs left in it.

**16:25** · \[laughter\] Memzy says documentation team.

**16:28** · Well, so the and it sounds like that's that's a that sounds like it's a nothing's no company's ever going to have that, right? But the kinds of companies that implement MDS tend to have big enterprise-y things like a documentation team. They follow ITIL life cycles and all that. They tend to be big, slow-moving companies. It's always funny talking to people in tech spaces because the job that you have You ever heard the story the saying asking three men three blind men to describe an elephant?

**17:00** · And like one blind man has his hands on the the leg and he's like, "Oh my god, this thing's like a tree trunk. It's very you know, it's wide. It's like a sequoia tree. This elephant must be like a tree." And then \[snorts\] another person has his hands on the snout. He's like, "Oh, it's like a snake. It's you know, it's thin and it writhes all over everywhere."

**17:19** · Yes, it We're kind of like that as technologists that when I ask any of you to describe what it's like working with tech or working with SQL Server or working with databases, you have a lens that's kind of closed off by the companies that you work with. So if you work with a small company, you wouldn't have ever heard of a documentation team. If you work for large enterprises, you would assume that everyone has documentation teams and security teams and compliance teams and all this.

**17:48** · Um when you work in consulting, you get the oh my goodness, my a big honking fan on the back of it making sure to keep it like cool, it shouldn't have died. Well, that's probably a sign that I should probably taper off there.

**18:22** · But you get There are Anders and the big tech heard him. Yeah, how funny is that?

**18:28** · Um so that's probably a good sign where we should head off there because if my camera start I can't figure out why this thing keeps dying. I I actually should replace this camera today. That's exactly what I'm going to do. I'm going to replace this camera today. I've had about enough of this thing. It's a gorgeous camera. It's a really nice Sony but just was never designed to record 4K at 60 frames per second for any extended amount of time and I strapped a USB-C like Peltier cooler on the back of it they even make for it trying to keep it under control but it's still stupid thing just keeps overheating.

**19:00** · So I will stop here and I will go start going for camera shopping. I hope that y'all had fun and I will see y'all on the next Office Hours. Adios.