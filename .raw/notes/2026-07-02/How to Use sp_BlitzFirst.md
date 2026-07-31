---
title: "How to Use sp_BlitzFirst"
source: "https://www.youtube.com/watch?v=pQcdbbmTqX4"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2016-09-11
created: 2026-07-02
description: "sp_BlitzFirst is an instant performance check to find out why your Microsoft SQL Server is slow right now. Download it free at http://www.BrentOzar.com/blitz/ ."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=pQcdbbmTqX4)

sp\_BlitzFirst is an instant performance check to find out why your Microsoft SQL Server is slow right now. Download it free at http://www.BrentOzar.com/blitz/ .

## Transcript

### Intro

**0:01** · So you're having a performance emergency with SQL Server. It's slow and you need to figure out why fast. SP Blitzfirst should be the first check you run out of our free stored procedures. So I'm going to go install it here. Once I've got SP Blitz first SQL, I can install it in the master database or any database that I want to choose to. It'll work fine from any database. And then if I go all the way down to the end of splits versus file, there's a bunch of call parameters that you can use by default. So, I'm going to run SP Blitz first just by itself.

### Default Parameters

**0:32** · And here's what happens with the default parameters. It takes a snapshot of a bunch of DMVs, waits for 5 seconds, then takes another snapshot of a bunch of DMVs. When your SQL server is under really heavy load, this may take a little bit more than 5 seconds. Under crazy load, it may take 30 seconds.

**0:52** · Don't worry, this isn't blocking anything. It just has to do a bunch of checks in order to figure out why your SQL server is slow. And what you get back is a prioritized list of why we think your SQL server is slow right now.

**1:08** · In this case, for example, priority number one, I have a maintenance task running. Someone's doing a backup. Now, I can click to see more details about this warning over in the details column. So, I'm going to go click on that. And it tells me someone's running a backup of the Stack Overflow database. It's about 12% complete. And over the last 60 days, this full backup usually takes about 6 minutes. Well, great.

**1:37** · Now I have a rough idea of what's going on on this SQL server and why it might be slower than normal. SP Blitzfirst warns you about all kinds of common problems like a data file is growing, there's a long running transaction blocking others and there also tells you about things like for example CPU utilization is really high right now. I can click on that to see exactly how high it is. Really useful if I don't want a remote desktop into my SQL server and understand what's going on.

**2:07** · It also gives me the top weight stats that are affecting my SQL server right now. You can see more information about each of these weight stats. You can even click to see details about some metrics. But if you're the kind of person that wants to see weight stats, then I bet you're going to want to see SP Blitz first with expert mode equals 1. When I turn on expert mode, I'm going to get a bunch more result sets. The first result set tells me what queries are running right now.

### Expert Mode

**2:39** · So I can scroll across and see when they started, how long they've been running, what session they are, if I want to kill them, what they've been waiting on, especially if they have multiple weights here. Then what the exact query is. In this case, someone's running a stored procedure and someone else is backing up a database. I can see the query plan if I want to troubleshoot and understand exactly what they're doing.

**3:08** · And inside that query plan, I can see things like the query cost. I can see how much work this query's done so far. I can see things about the degree of parallelism, what isolation level it is. This query's gone parallel across four threads. I can see how much memory this thing was granted, how much memory it's actually used, all kind of stuff that's really interesting for me for performance tuning individual queries. Now, it also still gives me the same headline news result set.

**3:41** · This is the same one it gave me earlier saying that I have a backup running right now and their CPU utilization. But if I scroll down further, I start to get more interesting stuff. Like for example, what weight stats this SQL server experienced during that short sample. In this one, my SQL server's number one weight was CX packet involving parallelism. I had 18 seconds worth of CX packet weights.

**4:10** · And I also divide that out by the number of cores that are on the SQL server and the number of seconds that this sample went across.

**4:20** · This is useful for me to see how much load the SQL servers really under.

**4:25** · Generally speaking, weight stats of less than 1 second per core, I'm not really interested in. The SQL server is not really waiting that much on those. And if I continue scrolling across, I can see things like average milliseconds per weight. This is really useful for things like SOSuler yield or storage weights where I can see how long it's taking my storage to respond when I'm waiting on it. Speaking of storage, that's what the next result set is.

**4:53** · This third result set here will show me, maybe it's the fourth, I've lost count. Will show me what files I've read and written to during this sample. So here, remember there's a backup of the Stack Overflow database going on. It shows me that on the M drive, and here's the exact file name. I read 1.1 gigs worth of data during that span. And the average stall on my storage was 7 milliseconds during this sample.

**5:25** · So much easier than firing up a whole bunch of Perfmon counters in order to understand what's going on. But speaking of Perfmon counters, that's where the next section comes in. Every single SQL Server PFmon counter that's available to us through the DMVs is all dumped out in here along with differentials from when it started, the sample started to when it ended.

**5:49** · So if I'm looking to see for example how many compilations a second I'm dealing with I can look at that column and say yeah during this sample I had about 29 compilations per second. Then the last result set gives me the what's running now queries again.

**6:10** · So I can look to see if some queries are still running at this end of splitzfirst's pass.

**6:17** · SP Blitz First is this quick, easy diagnostic across all kinds of DMVs, all gathered very quickly in a 5-second span. But sometimes you're not troubleshooting the issue live.

**6:31** · Sometimes you're troubleshooting the issue over time, like you're walking up to a SQL server cold and saying, "Why is the SQL server slow?" Well, you can run it with another parameter since startup equals 1. and SP Blitz first will give you the weight stats and file stats since this SQL started up. In this example, in my weight stats section, my top weight type is CX Packet. This SQL server's been up for about 6 hours.

### Weight Stats

**7:01** · And in that 6 hours, we've spent about 1.3 hours waiting on CX Packet.

**7:10** · Still not a very large number because I have a decently sized server and across when I take 6 hours times four cores, it's really not waiting that much per core per hour. But I also get the average milliseconds per weights if I want to troubleshoot those weights like SOSuler yield or storage weights. Then I get the same physical reads and writes section so I can see how much data I'm reading and writing from each file since I've started up.

**7:39** · Now sometimes using SQL server can be a little confusing. So you can also ask ask splits first a question. If you would like to say for example, is this cursor bad? When you're looking at an execution plan, you can execute it and it'll give you things like please phrase your question in the form of an answer in case you are playing Jeopardy. Or you can execute it again and say you know what you need bacon. It's just a random answer generator, kind of like a magic eightball for SQL Server. Look, not all of our parameters are useful.

**8:10** · Some of them are just for fun. You can also save the output of splits first to a table. Where this is useful is that maybe you want to capture this data over time. Maybe you want to run it in an agent job every five minutes. Logging your weight stats and perfmon stats and file stats and what's happening now to a table. You can totally do that. Check this out.

### Saving to a Table

**8:38** · I can set up an agent job that runs SP Blitz first, say every 5 minutes, and every 5 minutes it'll fire up and take a sample for 60 seconds and then write down what it finds into the database that I want and the tables that I want. So this way I can query my file stats or weight stats going back over time.

**9:04** · This is nowhere near as good as a real monitoring tool, but for those of us who don't have budgets for a monitoring tool, this is a free way to get started trending your weight stats over time. If you want to play with that, make sure to read the documentation because when you run this, it also creates views for you that will measure the deltas between samples. So you can throw this into your favorite graphing tool or PowerBI or Excel in order to trend your weight stats or file stats over time. So that's SP Blitz first.

**9:34** · The first stored procedure you should go run when you're facing a performance emergency. When you want to find out why SQL Server is slow right now.