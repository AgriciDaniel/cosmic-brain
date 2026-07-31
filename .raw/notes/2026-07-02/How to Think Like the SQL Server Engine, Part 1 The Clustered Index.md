---
title: "How to Think Like the SQL Server Engine, Part 1: The Clustered Index"
source: "https://www.youtube.com/watch?v=ACzguQ-AT-c"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2017-11-18
created: 2026-07-02
description: "Print out this 4-page PDF to follow along as I explain how SQL Server works: https://www.brentozar.com/training/think-like-sql-server-engine/"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=ACzguQ-AT-c)

Print out this 4-page PDF to follow along as I explain how SQL Server works: https://www.brentozar.com/training/think-like-sql-server-engine/

## Transcript

**0:01** · let's get started by thinking about the clustered index of a table during this training I'm going to be using the users table and other tables from the stack overflow Creative Commons data dump export that's a whole lot of words all

**0:18** · it is is that Stack Overflow makes their database available publicly for anyone to download you can go get it and play with it inside sequel server I teach you how a Brando's are comm slash go slash engine I'm going to start off by looking at the users table which is a list of everyone who's ever asked or answered a question on Stack Overflow posted a comment etc now the users table the

**0:41** · clustered index is on one field notice the key next to the ID field this is exactly what you think it is an identity field that starts at one and goes up to a bazillion or however many users they have today now the clustered index is only on one

**0:58** · field in this case but it actually has all of the fields in the table now if you go to Brenda's are comm slash go slash engine you did your homework you printed out these PDFs you can see what the clustered index looks like this is the first four pages the white pages of the clustered of the PDF now the first

**1:20** · thing you'll notice is going down the left-hand side there that's the ID field starts at one and goes up to whatever that's the clustered index key but the clustered index also includes the rest of the fields on here display name age about me etc well not really because

**1:37** · look at the about me field about me is a large ver care max or n Vera care max what people can write whatever they want their big long resumes about all the things they're proud of they can dump all of that stuff in the about me field that is bigger than what we would allow on an 8k page see everything the sequel

**1:59** · server does is stored in 8k pages and sometimes the stuff won't fit on a page so we put that somewhere else that's the about me field going down the side I'm not going to go into off-road data like these Big Bear care max fields early on we'll cover that in a later module the thing I want you to take away

**2:22** · is it's not like very Care Max and in Medicare max are free just because you can add them like willy-nilly doesn't mean they don't have a performance impact because when you want to go get that data we have to go grab it from the other pages the narrower we keep our data the more likely we are to keep it on page and be able to see it right here and then without a lookup so a lot of really lying to you is that really how sequel server works well you can go see for yourself with the command dbcc end this lists all of the tables pages

### DBCC IND lists a table's pages.

**2:55** · so I'm passed in here Stack Overflow is the database users as the table negative one is a parameter that will show me data for all of the indexes and I can see those right down there here's the list of 8k pages that we have and if I want to read those I can use the command D BCC page where I pass in here's the

**3:17** · database I want here's the file that I want here's the page number and here's the type of information I want about that page and this certainly isn't something that I expect you to ever do whether you're a developer and database administrator performance tuner I don't expect you to go look at the contents of pages but it's so neat to see the kinds of things that sequel server stores in the header or on the page itself now for

**3:41** · most of the rest of this class I'm not going to be talking about what's in the header because you really don't have to worry about that when you're just getting started we'll leave that for later but if you scroll down through dbcc page results you can see that it actually contains the real data on the table for example this one user here Andy M has one of my favorite BIOS that I've seen on Stack Exchange watching progress bars for money since 1994 so a

**4:09** · pretty catchy bio so for the rest of this training you are going to be sequel surfer and you're going to be managing this table I'm going to be an end user that's sending you queries and you have to figure out how you're going to build those results later on in other

**4:27** · Jules I'm going to give you additional copies of this table but right now this is the only copy that you have to work with does that clustered index because you as a sequel server your DBA sucks and he hasn't given you any additional indexes yet so here's the first query select star from dbo users now you don't

**4:47** · have to be a Microsoft Certified Master to figure out that your execution plan for this I want you to build these in plain English your execution plan for this is to just read out all the records it doesn't matter what order you grab the pages from anything will work maybe I've got some in memory maybe I have to grab others off of disk here that's how I like to think of my table in front of me is that's where my storage is I'm just gonna shuffle through them in whatever order happens to be available is why order is not guaranteed it's just

**5:17** · whatever page is I happen to run across and grab I'm gonna put them in there so you're to mass equal servers execution plan looks like and throughout this course I'm gonna be showing you actual and estimated execution plans jumping back and forth when it suits my needs you see three tabs here the execution

### SQL Server's Execution Plan

**5:35** · plan is a third one that means I ran a real query got results back and here's the actual execution plan sequel server started with a clustered index scan it's scanned through all of the data and dumped it back out through the Select pretty straightforward did you paralyze this if this was a big stack of paper

**5:55** · and believe me it is for a stack overflow if this was a big stack of paper could I break this work into a lot of people sure order isn't guaranteed I could stay give one person a hundred pieces of paper another person 100 pieces of paper another person 100 pieces of paper and you could all start work on this right away it's going to be an interesting concept as we move forward not all queries can be and not all parts of all queries can be next

**6:23** · query that we're gonna run across and as I go through and change things inside these queries I'm gonna color code the parts that I just changed I'm gonna try and keep building atop the same query so it's dead a selecting ID now I'm just gonna get IOT back all our slime instead of selecting storage just want to give you ID but I only want to get them where the last access date is greater than 7 1 of 2010 how are you going to accomplish this query

**6:51** · what you're gonna do is you're gonna scan through all of these pages looking at that last access date column and only saying out loud the IDS that are greater than seven one of 2010 now I'm kind of cheating here I'm giving you a spreadsheet that's not actually how sequel server stores data it creams the data in as tightly as it can on a page there's no concept of reading down a page to see one columns results instead

### Your Execution Plan

**7:19** · sequel server has to roll up its sleeves and go alright I'm gonna bust open every row on this page and I'm gonna figure out where the last access date field is and check that just want you to keep in mind that just because it's a column doesn't mean it's easier to sort sequel sterber still has to figure out where that data is so if we look at the execution plan for it it looks identical I have just a clustered index scan so

**7:45** · here's your first kind of heads up that execution plans at just first glance don't tell you everything you need to know sometimes you need to dig a little deeper and you can start getting a little deeper if you hover your mouse over parts of the execution plan I've

**8:01** · got the two queries side by side here on the Left I've got the Select star with no filter on the right I've got just the Select Ivy where the last access date is greater than 7 one of 2010 what I've done here is I've hovered my mouse over the select part of the execution plan now I get something called an estimated sub treat cost a long time ago in a

**8:26** · galaxy far far away that meant the number of seconds that the query was going to take on one machine in building 35 at Microsoft headquarters in Redmond Washington trivia over today it doesn't mean anything like that it's just a rough measure of CPU and i/o costs for a

**8:43** · query it's not really useful to compare two boxes to each other like which sequel server is going to run the query fastest it's really only useful for comparing two queries on the same server spoiler alert it's not for that either but more on that later but if I hover my mouse over those I get the same estimated cost what I want you

**9:08** · to take away is that it's not necessarily that much work to filter the data if I already have to crack open every single page and figure out where all the contents are which I had to do anyway for a select star and even though I'm returning less data I'm only reading back the ID that doesn't mean it's dramatically easier for sequel server another way that I can see this is to use a parameter called set statistics IO on when I run this in sequel server

**9:38** · management studio every query from that point forward inside my session this only affects my own where is just the one window I have open will also return in the messages tab the number of logical Rives I have had to perform logical reads means the number of 8k

**9:59** · pages that I've had to look at the more the less Mary definitely not the more the merrier I want to keep this down as low as possible when I'm doing performance to because I don't want to touch any more pages that I have to I am lazy well if we look at these two queries both of them show the exact same number of logical reads because you only have one copy of the table right half sequel server had to scan the whole thing now notice that statistics I upset

**10:30** · statistics IO IO on easy for me to say I also returned something called physical reads don't worry about that that technically means the number of pages of sequel server had to get off of disk instead of just getting out of memory but here's the thing you can never

**10:48** · predict which pages are going to be in memory at the time your query runs don't try and tune for lower physical reads try and tune for less logical reads which is just the total of pages we had to read regardless of where they were in memory or on disk I just want to touch less pages all together

**11:08** · what my takeaways here is that filters aren't necessarily that much more expensive even though sometimes sequel services hey man I wish I had a missing index Irish out of index for this particular query doesn't mean it's working harder just means it could work less if we had this filter plus an index

**11:25** · no indexes for you that though next query I'm going to give you same one as we had before but I've added order by last access date on there so think about how you're going to accomplish this in plain English but remember you're not a server you're a human being with a big stack of papers in front of you and you have to do this work and you're not that

**11:51** · bright what you're gonna have to do just like me is you're gonna go through and refined all of the records that match but then you're going to have to go write them down somewhere you and I we are not bright enough to remember all of the records that came back every ID and last access date we're going to have to write them down somewhere and then sort them we're going to need to build a list the more data that we have the more work

### The Execution Plan

**12:19** · is going to be involved there's an interesting question there especially for developers when do you do this sort do you sort while you're writing or afterwards well really let's look at how sequel server doesn't first off it goes through and does this scan writing everything down and then it turns around and does a sword this is interesting impacts on parallelism but more on that in a second so let's compare the two

**12:48** · queries on the top is when we didn't have the order by we just have a select IP for last access date is greater than 7 1 of 2010 on the bottom we've added the order by and look at the difference there in estimated subtree cost more than 1000 my math is not so good less

**13:09** · than 10 times more expensive see this so I'm not a developer I'm not good at math so man that sucks that actually really sucks ten times more expensive just to do a sort but you'll notice there's nothing about parallelism inside that query plan what if sequel server does

### That's a lot of work.

**13:26** · paralyze this because it can choose whether or not to paralyze stuff based on things like our server settings for maxed up and cost threshold for parallelism in some cases if sequel server does choose to paralyze this query exact same query here but in this case equals server decided to paralyze it because I fix the server so that it would now suddenly my cost drops from like 250 down to around 150 those down

**13:56** · by I was going to give a number there but we both know I'm not good at math so we're gonna say a lot right that's fair and if we look at set statistics IO so this is what tells us how many reads we did the number of logical reads isn't all that different because we still had to scan through roughly the same amount of pages but notice the scheme count is different we did 5 scans this time because sequel server broke the work out across more logical processors I have

**14:27** · more cores on my machine so sequel server said alright let's get down to business let's pass this workout across four or five people and get to work next query that we've got fully change one thing I've changed it to select star

**14:44** · now how are you going to build this query does it change anything about how you built it from the last one you're gonna do it the same way you've only got one option this is the only copy of the table you have that query is gonna suck pretty bad if you think about the work that it's going to actually take to pull it off does it take more time to read no not

**15:06** · really if we look at the estimated or the set statistics i/o from this thing it's the same number of logical reads up at the top I'm doing just the Select ID but the second query down I'm doing select star same number of logical reads but notice down at the bottom now I have a work table for the second query ah we had

**15:30** · more data than sequel server could have gotten cached in RAM and sequel server decided to go out and start scribbling this stuff down somewhere into a work table because I've got a lot of data when I'm including the about me field which is this big ginormous ver care max I certainly can't remember that even on a sequel server with lots around I could have all kinds a day to come back from that and the amount of data that's going to come back won't talk about in our statistics modules how that impacts how much query meant where you get so if I

**16:00** · look at the execution plans between those two queries the first one just does the ID the second query does the Select star so notice that the sword is 74% of the cost of the first query and it's 97% of the cost of the next query

**16:17** · in order to really figure out how ugly it is we have to start hovering our mouse again and the execution plans so in the top one query what parallel costs us about a hundred and fifty but when I add it in the Select star look at that query cost 13,000 or crappy Brent math

**16:42** · around a hundred times more expensive in order to do the Select star let's break this down to make it just a little bit more obvious I've got a grid here depending on whether or not I'm doing just the selects versus the Select ID and whether or not I'm adding an order by look at the cost start to skyrocket as I add in an order

**17:07** · by especially with more fields because sequel server has to scribble all of this data down somewhere and then sort it and then say it back out to the end users when I was a developer and database administrator I thought that the big cost was just saying all of those fields out loud the big long about me filled me and that is nothing compared to the cost of writing all this data down and sorting it that's where

**17:36** · the real work is and that's where your takeaway is for this I get it ordering buying the database is really really easy you just type order by and the magic happens and we think that the fastest box in the house is usually the sequel server and often that's true but it's really hard to scale out sequel servers to handle sorting because we don't have an easy way to scale out multiple sequel servers when we need real-time data it's really easy for us

**18:06** · as developers to scale out app servers so unless I'm doing a top 100 or top 1000 in my query I want to rip out the order by often when I'm doing query tuning I'll just take out the order by and look at the cost before and after to see how much different it is if it suddenly runs a hundred times faster there's our answer move that data out get it out to be

**18:32** · sorted over in the app tier and I know what developers often say but my app server doesn't have much memory and it's not very fast ok let's fix that because it's way cheaper to fix that than it is to bulk up the sequel server CPU power sequel server Enterprise Edition is $7,000 a core us $7,000 per core that buys a

**18:56** · whole lot of application servers as we have to start farming out additional cores so let's recap what we've talked about here in this first module first off the clustered index it may only be on one or two fields it has all of the fields in the table in

### Recap

**19:14** · the later modules we're going to talk about non-clustered indexes and how you pick and choose the right fields for those sequel server stores not only just are clustered indexes but are non-clustered indexes as well on 8k pages now this starts to change a little

**19:29** · bit when we get into a sequel 2014's newer features like hackaton for example that stores the data completely differently but for old-school and conventional tables this is how it works we also end up grouping them together into multiple pages or multiple groups that page is called extents and we'll tackle that later as well dbcc end and dbcc page let you see the

**19:51** · actual page content so you can go spelunking around in your database now learning I'm not a fan of using dbcc commands on a production database especially things where I'm just curious about page content do that over in development just so you don't worry about messing things up off-road data is a little bit different things like bear Kara max file stream data file table

**20:14** · data that's too big we do still store it in 8k pages but on lots of them and we have to daisy chain those together if you want performance avoid putting those in here maybe consider storing that kind of a big data elsewhere I'm not gonna say another database platform because sequel server doesn't work for big fields just thrown that out there and filters aren't necessarily more expensive but ordering in the database definitely is the more fields that you select the little problems that you have so join us over in the next module where

**20:42** · we start talking about non-clustered indexes if I'm going to continuously query by last access date how about I build a copy of the database that looks like that and see how those query plans start to look