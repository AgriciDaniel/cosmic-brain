---
title: "How to Think Like the SQL Server Engine, Part 3: Statistics and Memory Grants"
source: "https://www.youtube.com/watch?v=9GPwJ0eVBGk"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2017-11-18
created: 2026-07-02
description: "Why does one query get wildly different execution plans? Learn how statistics influence your query plans, discover how to see your own statistics, and understand how stats help build memory grants."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=9GPwJ0eVBGk)

Why does one query get wildly different execution plans? Learn how statistics influence your query plans, discover how to see your own statistics, and understand how stats help build memory grants.

## Transcript

### Introduction

**0:00** · welcome to the statistics and memory grants module so I'm going to start with a query that's a tweaked version of what you've been doing before I've added a field location so get me the ID display name age and location for folks who access the system since 7 1 of 2010 ordered my last access date now given

**0:23** · these of all the different copies of the table that you have none of them actually have location so what most of us will think to do first is we'll go grab the grey index which has everything except location we'll go make the list of people who match here and then look them up on the white index the clustered index to go get that location field this

### Key Lookup Pattern

**0:50** · is the classic key lookup pattern that we saw earlier we get most of our fields from the non-clustered then we jump down and get one extra field out of the clustered index but that's not the only way you could do this sometimes sequel

**1:07** · server will do it like this sequel server will look at all of our indexes and say now you know what I don't want anything to do with those we're just gonna stick with our little buddy the clustered index we're gonna scan across here even though it's not even in the right order we're just gonna scan the whole thing making a list of all the records that match and then sort them either in memory or out in tempie beii now why would sequel server choose to do this route well what if if you think

**1:38** · about in your data the pages that you have there in front of you what if instead of 7 1 of 2010 that data I was passing in was January the 1st of 1800 in sequel server if it knows a little bit about the data will say you know what it doesn't really make sense to go back and forth and do these lookups and then a whole bunch of key lookups or do these index eeks and then a whole bunch of key lookups because what I'm gonna

**2:06** · end up doing is hitting every row individually as I do these key lookups if I have say 50 per page I might touch each page 50 times that's a lot of touching and very inappropriate sequel server doesn't like inappropriate touching so what it's gonna do is just scan look at each page once and then make down those or write down those lists sequel

**2:30** · server wants to do that because its goal is to get in and out of the table as quickly as possible oh the jokes today it wants to get in and out of the table as quickly as possible to let other people go in and access the data because we are still worried about inserts updates and deletes happening now sequel server can't look at our data before the query

**2:53** · starts can't look at the data in order to make a good execution plan that's where something else comes in which is statistics for every index that you create sequel server automatically creates several matching one sorry one matching statistic for every index it's on the exact same fields that the index is on now you'll notice that there's also some other statistics that start with W a these are system created

### System Created Statistics

**3:24** · statistics brought to you by the nice folks in Redmond Washington Washington W a these statistics were created by the folks in Washington they're automatically done for you because sequel server recognizes oh you're constantly querying by display name I should add a statistic for that even

**3:44** · though you haven't created an index on it system created statistics are good because sequel server needs as much data as it possibly can to make the best decision about which query which index is going to be right for our given query so let's take a look at what's inside these statistics you can use the command dbcc show statistics and then pass in a

### Statistics

**4:07** · table name and an index name well really it's a statistic name it's just that all our statistics are automatically created with the same name as our indexes you can look at the system created ones too if you want to copy the W a cyst numbers over into there so we're three sets of results the first set of results talks about the statistic how

**4:30** · many rows were in this statistic the last time it was updated were in this index the last time it was updated our statistics get updated whenever about 20% of the data in that table changes

**4:45** · now it's really a little trickier than that all sequel server is really doing is counting the number of times a row has been modified so if you have saved five million rows but you keep updating the same row a million times that's going to count as 1 million modified rows as equal server will update the stats on the whole table even though we're just constantly updating the one row that's not a bug this is actually pretty good I want to have a rough idea of when data changes however think about

**5:17** · a data warehouse that's got five years worth of history in it and we're only loading data one day at a time well twenty percent of five years is one whole year you could conceivably go a year without getting updated statistics that's going to come in here in a moment or so it also tells us how many steps

**5:40** · are in this statistic how many buckets are in our histogram and then the next set of results there the second set says what fields the statistic is on remember our good old index the black index in this case is on last access date and ID so this statistic is going to be looking at last access date first and then ID the third set of results down at the bottom is our histogram it tells us a

**6:07** · bunch of buckets about our data for example the very first bucket range Heike august 1st of 2008 there is exactly one row that is equal to that day one person access the system on august 1st 2008 there are no other rows

**6:27** · in this range well it's because it's the first bucket it's equal several ones to have a special bucket just for the first person who is or the first row in this results that second bucket in there says October 29th of 2009 so in the range between the last

**6:44** · bucket August first and this one October 29th there are eight thousand three hundred and ninety rows inside this range there is only one row that is act exactly unique to our date this one day the rest of them are all distinct it's

**7:04** · not like a bunch of people I logged in at exactly the same time they've been logging in all over the place so all of the rows in our bucket are unique then we can look at the next bucket in the next bucket and so forth you'll notice that the buckets aren't evenly broken up by date it's not like it's six days six days six days it's equal servers building different shapes of buckets to try and make the best guess as it can when it's time to run a query because

**7:31** · when I run a query and I say show me all the people who've accessed the system since 7 1 of 2010 now you see where sequel server is getting its guesses from and where sequel server is coming up with the ideas of which indexes it should use because it wants to know how many rows are going to match your where clause so are all students going down

**7:55** · this list of to statistics and saying oh I bet there's going to be this many rows that match what about in the case of last access date what if I want to know how many people logged into the system in the last hour or today well if I go

### Ascending Stats Problem

**8:12** · down to the very tail end of the stats the last bucket that's down there I'm working with a copy of the stack overflow database that was exported as of mid-september notice that the last date in there is September 6th well if

**8:29** · I've got data that's constantly getting added on to the end in a dates tab but I only update it whenever 20% of the data changes sequel server has no idea how many rows have come in in the last hour day or week it only knows up until the

**8:46** · last time your stats were updated and if Corie for newer data sickle servers going to be all alike one I don't know how many rows are going to come back it's an interesting problem called the ascending stats problem there's improvements in sequel server 2014 that make this a little easier to estimate stats for but it's just an idea why you

**9:05** · have to be so good about updating your statistics and being proactive about it some folks let me Stack Overflow is a great example where you want to update stats every single day because your data can change so much from one day to the next in a day in a warehouse it may not be as big of a deal the next thing to think about is what fields does this stat really involve you'll notice that my index was on last access state and ID but this statistic only shows buckets for last access date

### Selective Fields

**9:36** · nothing to do with IDE what if you had an index on in the stack overflow database gender so what if I wanted to say hey how many people have the last name of azar and are a male well what if

**9:53** · that index started with gender and then had last name this statistic would say well there's about five million users who are male and there's five million users that are female and that's all I really know about the data the selectivity of that first field is so

**10:11** · important in an index this is why people often say put the most selective field first that rule doesn't override all other rules it still needs to be a field that you query on for example if I never queried by last name and I always queried by gender select star from users where gender equals male well then the

**10:32** · moving around a display name first wouldn't help me at all I need my index to match whatever my where clause is but as long as I'm including multiple fields in there every single time I'd want a more selective one first so the sequel servers buckets paint the best picture possible instead of just saying five million males five million females that's all I know about the data I need my stats to be as

### Memory Grants

**10:57** · accurate as possible because they influence so much about building queen which index do I pick which table do I pick first should I new a Sikh or a skin or one of my favorite topics about that is how much memory I'm going to need for my query C sequel server needs memory for three things it caches data which it's important to know that it only caches raw data pages not query results if you

**11:25** · run the same query a million times in a row sequel server is going to build the results a million times in a row I know other databases like the Big O also does cache query results we don't get that luxury over here in sequel server so it caches raw data it caches execution plans because those are computationally intensive to build and then it also needs work space in memory for our queries when I want to go join a bunch

**11:54** · of indexes together or when I want to do sorting I need RAM in order to pull that off if I have a sequel server would say 128 gigs of RAM maybe a hundred gigs of it is dedicated to caching raw data maybe 10 gigs is based offer used for caching execution plans maybe 20 is used for query workspace I don't really get any knobs to tune that so I gotta be as

**12:20** · proactive as I can to make sure that I get my query estimates as kind of close as I can get I don't micromanage this usually but when things go horribly wrong I need to be able to recognize why they're going wrong and start figuring out which statistics are broken or maybe I've got my indexes in the wrong order to examine how much memory you're getting for each query you want to start by looking at the execution plans specifically right click on your sequel

**12:48** · server select statement and go properties then that properties window pops up at the side that you always close because it's not really all that useful it is useful this time over there you'll see memory grant info this is measured in kilobytes it's really only easy to see with sequel server management studio 2012 or newer good

**13:10** · news Microsoft gives you the latest version of sequel server absolutely free you can get from that link their sequel server management studio so regardless of whether you're using 2005 or 2008 you haven't even licensed 2012 or 2014 you can still use this as a mess from those versions it's totally okay I'm freely downloadable your memory grant info is

**13:32** · shown in kilobytes and you want to see it in actual plans not as much estimates because the estimate they're probably wrong that's why you're here in the first place what's so interesting to me about this is that once your query takes flight once it starts running the amount of memory that it has is capped and that's all it's gonna get so you'll server has

**13:55** · to do this because there could be a hundred or a thousand or a million queries that starts after yours does even if there's a terabyte of free memory on the server that doesn't mean you get all of it you only get a small portion of it and very small very typically cuz think about a thousand queries that run simultaneously and we need memory workspace for all of them and remember we're also trying to cache data and execution plans so if your queries

**14:19** · estimates are wrong like if sequel server thinks that only 100 rows are going to come back but actually a million rows come back you don't get more ram your data gets written out to temp TB sequel server stops your query processing and says well hold on a second here you got entirely too much data we're just gonna write down your working set over here at content DB which is the public toilet of sequel server there are so many dirty filthy things going on inside here the engine

### Public Toilet

**14:49** · uses it for read committed snapshot isolation DBAs use it for sorting indexes developers use it for building temp tables and table variables all kinds of stuff even the newer features in sequel server like always-on availability groups even use it to capture things like statistics I want to avoid hitting that public toilet at all costs so when I'm looking at an execution plan and I see a little yellow

### Execution Plan

**15:14** · bang on one of the operators like we see here in this sword there's a warning there and sequel server is telling us tells us it's in sequel server management studio 2012 or newer again you want to be running that shows us right at the plan boom this thing spilled to temp DB because we didn't have enough memory granted to us because

**15:38** · maybe our statistics were wrong or maybe we're just bringing back too much RAM this is a great argument for why I'm such a huge fan of local solid-state drives for temp DB it's one of those things is just a slam dunk for a thousand bucks you can make all kinds of performance problems go away when you see a whole lot of these spills maybe you're gonna have to fix it with statistics query tuning whatever but if

**16:02** · you don't have enough time start throwing temp DB immediately on a solid-state drive just to make a little duct tape on there to make this problem easier so we talked about in this module first off one query the same exact identical query can get different plans based on your statistics remember your

**16:19** · stats automatically update whenever 20% of your data changes and suddenly you can get new query plans never had that problem where everything was trucking around or who's it going along fine and the next thing you know all of a sudden according performs poorly you don't know why stats are a very common cause of that you can read your stats with dbcc

**16:39** · show statistics it's not the kind of thing that you're gonna be running every day I don't even run it every day but when I'm trying to troubleshoot why a query isn't performing well it's a great tool to have in my arsenal sequel server automatically adds statistics and this is good it's extremely rare that you're

**16:56** · ever going to add manual statistics let sequel server take care of those for you there's a really targeted case and that's those statistics help determine exactly how much memory that your query gets once your queries in flight any additional memory means getting it out of temp DB and then finally use SSMS or newer SMS 2012 ridore in order to see that memory grant info so now start poking around in your queries and start looking at those statistics