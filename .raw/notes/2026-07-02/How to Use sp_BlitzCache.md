---
title: "How to Use sp_BlitzCache"
source: "https://www.youtube.com/watch?v=EkLuXURMwso"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2016-09-11
created: 2026-07-02
description: "sp_BlitzCache shows you the most resource-intensive queries on your SQL Server without running a Profiler trace. Download it free at http://www.BrentOzar.com/blitzcache/"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=EkLuXURMwso)

sp\_BlitzCache shows you the most resource-intensive queries on your SQL Server without running a Profiler trace. Download it free at http://www.BrentOzar.com/blitzcache/

## Transcript

### Introduction

**0:01** · SP Blitz cache is a free tool that helps you analyze which queries have used the most resources on your SQL Server which ones have burned the most CPU time which ones have read the most data which ones have executed the most frequently here's how it works you go through and get SP Blitz cache you're going to execute that script that just installs the stored procedure it runs in whatever database that you happen to put it in it's going to survey execution plans across the entire server if you want to put it in a

**0:32** · DBA tools or a utility database that's completely fine it will work from anywhere so I'm going to now switch over to another script where I've got a few parameters already saved for me now first if I just run SP Blitz cache by itself what it's going to go do is find the 10 most resource intensive queries

### spBlitzCache

**0:52** · and it's sorting by default by CPU here's that list the top result set is my 10 most Source intensive queries you can see I'm working with a stack Overflow demo database here here's the query itself here's like whether it's a

**1:09** · stored procedure or a line inside a stored procedure or it could be just ad hoc SQL then you're going to see a set of warnings about it is it missing indexes is it going parallel is it running a long time has it got implicit conversion in it all kinds of warnings in here your key to decoding those warnings is down in the second result set the second

**1:33** · result set has a list of things that we caught inside those queries so this way if you don't understand one of the warnings like say you've never seen a compilation timeout before you can go copy paste this URL into your web browser and learn more about that particular problem with execution plans if you want help decoding an execution plan check out all the way over to the right you can keep scrolling through SP Blitz as results we have all

**2:01** · kinds of details in there like how much CPU time it used how much duration how long this thing ran for how many logical reads it did what kind of memory grants it got then if you scroll all the way over you also get the execution plan here so I can click on this query plan and see the graphical plan inside SS SMS

### Execution Plan

**2:25** · looking through this stored procedure oh yeah there's some big old arrows moving through here throughout this stored procedure there's a lot of data coming through if I want help interpreting this execution plan figuring out why it's slow what I can do is rightclick anywhere on this execution plan and say show me the XML then I can highlight all of it copy it and then I can fire open a web browser and go to paste the plan.com

**2:55** · at paste the plan.com I can then go paste in my execution plan contents and submit it this gives me a link to the execution plan that I can then go share with other people here's my SQL and then

**3:12** · if I scroll down further here's the execution plan so I can see it in a web browser give this over to say stack exchange db. stackexchange or SQL performance.com and other people can look at my execution plan and see what's inside of it to help me understand what my query is doing back over on SQL Server let's go

### Results

**3:35** · look over at SP blitz's Blitz cache's results a little deeper now I use the default set of results here but there's a few other uh or the default set of parameters there's a few other parameters that I can use in order to call this thing if I just want to restrict my results to one specific

**3:52** · database maybe I've got say 50 databases on the server but I'm only trying to performance tune one of them I can hone my results down to just say the stack Overflow database just be aware that this is only the database the user was in when they ran the query if their

**4:10** · context happened to be over in say tempdb and they were directly querying objects from another database or if they were doing cross database joins we're not going to be able to catch those it's only just whatever database their context was in at the time they ran the query there's all kinds of parameters for SP Blitz cache you can see them all if you run SP Blitz cache with help equals one this also includes result

**4:36** · sets that explain what the results mean for example if you want to understand what comes back around cost threshold for parilis warning or execution weight you can see those down there in the help let me show you some of my favorite options though it has a sort order

### Sort Order

**4:54** · parameter when I'm getting back the 10 ugliest queries or the 10 most resource intensive queries I may want to sort by reads meaning which queries read the most data but I also may want to sort by which queries ran the longest that's where duration comes in the queries that ran the most that's where the executions

**5:16** · sort order can come in the queries that ran the most frequently during a short batch of time like functions is a classic example here that's executions per minute the xpm sort order maybe I

**5:32** · want to see which queries had the largest memory grants I'm trying to figure out what's draining my server dry in terms of RAM for query workspace I can sort by memory Grant as well and maybe I'm looking for queries that are constantly recompiling over and over whoops I can sort by recent compilations and see the ones that are chronologically the newest compiled queries maybe the ones that I want don't show up in the first 10 I can also use the top parameter and say give me the 50

**6:05** · most recent compilations or the 50 most reads just know that the higher you set the top number the longer it's going to take SP Blitz cache to run because doing this analysis on the execution plans is CPU intensive for SQL Server if I want to get even more details about the queries that are running in their execution plans I can run it with expert mode equals one this

### Expert Mode

**6:31** · doesn't do more work but it just returns back way more columns you can tell here just by the size of the scroll bar I get even more stuff like more details on the memory grants plus how long the plans took to compile how much CPU time we used in

**6:51** · order to compile the plan and the set options for the users ansy nulls arithabort all kinds of options here and if I'm being a victim of a parameter sniffing emergency if I've had an ugly query plan just blow into my SQL Server I even get the pre-op populated dbcc free proc cach commands that will go nuke just this one plan from the cash

**7:17** · you can pass in a plan handle or a SQL handle into dbcc free proc cache and then this way instead of rebuilding indexes or updating statistics or heaven forbid rebooting to fix a SQL Server urgent parameter sniffing issue you can simply just nuke one individual plan from the cache that's a new feature out of expert mode there now sometimes I'm

### Export to Excel

**7:38** · doing par or query tuning over a long period of time or maybe I want to hand some of these results over to my developers or other members of my team that's where the export to excel parameter comes in this doesn't create me an Excel spreadsheet what it does is it skips a lot of the columns that would cause Excel to blow chunks for example I

**8:01** · can't copy paste execution plan columns into Excel so in here when I scroll across through this list you'll notice that there's no execution plan column now in Sp Blitz cache's results that's just because now I can highlight the entire grid rightclick and copy with

**8:18** · headers and then I can go paste this into Excel either for performance tuning reasons or to share the results across with my team and then we also talked about running it with database name equals stack Overflow we already said that then also I can write out the results of SP Blitz cache into a specific

**8:39** · database sometimes I want my help desk to go capture what's going on if I'm not around maybe we're having a performance emergency and I want to see which queries we're using the most resources well that's where the output database name output schema name and output table name come in when I run it

**8:59** · with these parameters SP Blitz cache does all of its analysis work and then writes this stuff into that table if the table doesn't exist it's going to be created for you and if it does already exist the results will be just added to the end of the table now what SP Blitz cache is really useful for is whenever you're facing performance problems on SQL Server go

**9:23** · run it and discover what the most 10 most ugly resource intensive queries are and start tack those and tuning those in order to make them go faster now you don't have to wonder or run a profile or Trace just go ask SQL Server what's in your plan cache right now