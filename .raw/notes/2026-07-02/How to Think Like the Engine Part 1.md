---
title: "How to Think Like the Engine Part 1"
source: "https://www.youtube.com/watch?v=HhqOrbX3Bls&t=186s"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
created: 2026-07-02
description: "You've never had a formal class on Microsoft SQL Server before, and you want to learn how it works. I'll teach you using the Stack Overflow database printed out on a series of pages. Print the PDF to"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=HhqOrbX3Bls)

You've never had a formal class on Microsoft SQL Server before, and you want to learn how it works. I'll teach you using the Stack Overflow database printed out on a series of pages. Print the PDF to follow along: https://BrentOzar.com/go/engine

## Transcript

### Intro

**0:02** · good morning party people and welcome to how to think like the engine on european time it is a bright and early 1am here in san diego california i'm doing during the course of october course during the course of october and november i'm doing a bunch of free classes all almost all of my fundamentals classes in uh two different time zones and the way that it works is that chris says he followed the instructions uh the way that it works is that like tuesdays will be the european

**0:34** · time classes and the wednesdays will be the americas time classes it's going to be the same material on both days so if you miss one you can always switch over to the other this one the how to think like the engine one is the only one that will stay up on youtube twitch facebook etc

**0:53** · for free the rest of them that i'm doing through the rest of october and november uh are all my normally paid classes so it's one of those where you got to be there or be square if you miss the live version you're going to have to pay to get to the instant replays of course all part of my diabolical plan there so the first class that we're going to cover is my how to think like the engine class so let's roll up our sleeves and go get started with that

**1:24** · so in this class and how to think like the engine this is really designed to be my foundational class where everybody starts it's the class that i wish i would have received when i got first started in databases the thing that makes this class a world of difference makes it way easier for you to follow along with and understand what's going on is if you go get the pdf

**1:49** · this thing's got five pages in it and you're gonna see me referencing these pages throughout the class in a perfect world you would actually have it printed out in an imperfect world you would at least have the pdf nearby so that you could go reference it because understanding how these 8k pages work will make a world of difference in how you see databases

### Source: Stack Overflow 2010 db Open source, licensed with Creative Commons

**2:14** · these pages come straight from the stack overflow database stackoverflow.com of course is that website where you've been posting questions for years and someone else has been doing all the hard work stack overflow graciously provides their database for free to the public they export it in xml format i take that and

**2:36** · then i go build a sql server version of it this isn't the exact same database that stack overflow uses today they have changed their database structure over the years although their back end is running in stack in sql server

**2:51** · i take that database and then i bring it in in this case all the screenshots that you're going to see are me running sql server 2019 and the most recent compatibility level i say that because some of you may want to reproduce these queries later on your

**3:08** · own this is the kind of thing that opens up all kinds of eyes about whoa i didn't know it would work that way now let me go try my own query i would encourage you if you have a question about the execution plans when you're especially when you're watching the video later go try it this is why i use especially that really small version of stack overflow this thing's small enough that you can run it on a laptop and it's a free and easy download inside there

**3:38** · now when you attach it to your sql server and you go in and expand object explorer they're going to be a bunch of tables inside of there i'm going to be focusing on just one table for today the users table at stack overflow

**3:55** · if you expand the users table the users table holds exactly what you think it holds a list of everyone who's ever logged into stack overflow posted a question left an answer and here's the table structure of it you notice it's got an id id starts at one and goes up to a bajillion it's an integer it's a identity column

**4:21** · it just so happens that on this table that has been set as the primary key which can also be the clustered index in this class i'm going to keep it simple however you define your table's clustered index that's how the data is laid out on disk so on the users table its id and if you go and look at the database the database is just a series of 8k

**4:50** · pages and i like to think about them as pages from a spreadsheet so it's exactly what i did was i took the stack overflow database moved it into excel so that you could visualize how things work this right here is the first 8k page out

**5:07** · of the users table the white piece of paper we're going to be working with this for a while the white piece of paper is what we call the clustered index of the users table if you notice it's organized by id i've got the user sorted by id here

**5:25** · and we like to think of the clustered index as having all of the columns on it let me hop back one slide you see how i defined the clustered index only on id not erifini's like you have it upside down you see how i defined the clustered index as only on id but the clustered

**5:47** · index actually has all of the columns this is really the table itself the clustered index on its little 8k pieces of paper has all the columns in it sort of but not really look at the far right hand side on the far right hand side is the about me column about me is a big ol of

**6:12** · envercare max where people can type a big old letter to grandma in there if they want to they can put their entire resume in their profile an envercare max column might be too big to fit on these ak pages so what sql server can do is it'll actually store a pointer to other 8k pages with your about me on

**6:36** · it that's called off-road data we're not going to talk about that much inside of this class but this class is often a jumping off point for folks to ask all kinds of other related questions we're not going to cover that inside here today but i just want to make you vaguely aware that when you define columns like envercaremax there's going to be an overhead to that when you start to stuff entire resumes or about me's inside of

**7:04** · there see your database is nothing more than a stack of these 8k pieces of paper each 8k piece of paper is exclusively dedicated to just one object and more

**7:21** · specifically just one index on that object the clustered index of the users table takes up a bunch of 8k pages then we may have other indexes on that same table that also take up a bunch of 8k pages these 8k pages are the smallest unit of data for sql server sql server doesn't go find a row sql server doesn't go find

### A page is the smallest unit of data. If we need to read a row

**7:52** · a column sql server knows where these 8k pages are and these are the same unit of data that we cache up in memory and that we have down on disk so when sql server wants to go read data sql server has to figure out which 8k page that data lives on if you make a change to the data if you insert a row if you update a row or delete a row sql

**8:20** · server has to figure out which 8k page has that copy of the row pull it up into memory write the change to it and then flush it back down to disk this is our smallest unit for reads and it's our smallest unit for writes as well in a perfect world when you write something that's really good good database and a good query in a

### In a perfect world Your query is easy to understand

**8:47** · perfect world sql server is he finds it easy to understand your query i always think of sql server as a guy i always think of sql server as a gruff guy who sits in the corners like trust me i got this because he's dumb and stubborn and doesn't really necessarily get exactly what's going on sql server goes oh yeah i know exactly what you're looking for and i know that the data that you want is on exactly one page like if you ask for just my profile at stack overflow

**9:18** · if you just ask for my profile sql server knows that it's just on one page for my user's row so sql server can dive bomb in and get exactly that in the in the perfect world sql server knows exactly which 8k page it is in a really perfect world he has that page cached so he doesn't have to jump around from one place to another and he can read the data out as is because we're not asking for any additional manipulation

**9:47** · in that perfect world our query looks like a dive bomb like we're gonna go dive bomb into exactly one 8k page grab exactly one row and read it out but often in our world where people write all kinds of crazy reports and it's not easy to understand what their queries have in them in our imperfect world the query often isn't easy to understand it takes sql server some work in order to figure it out

### But often in our world Your query is not easy to understand

**10:18** · people don't put a where clause on their query or they ask for years worth of data so the data that we want to spread across a whole lot of 8k pages sql server may not know exactly which ones they are for example your query might say things like go find me all of the users who live in louisiana and then go find me all of their questions at stack overflow sql server

**10:45** · is going to start and he's going to be like first off i don't know where the louisiana people are and then secondly i really have no idea where their questions are so these second and third order changes or these the fur the further across that we get from our where claws the more tables that we're referencing the harder it is for sql server to know which pages are going to be involved in an imperfect world we try to run sql server on a raspberry pi and we don't have enough memory to cache all that good juicy data so sql server has to go

**11:17** · and scan that data from storage and then in that imperfect world sql server has to do a bunch of work on the data too like we're asking for group buys and left outer joins in order by and having and in these imperfect worlds we're doing read read read read read read read

**11:37** · we're scanning through tons of pages either in memory on disk and doing all kinds of work when you go to think like the engine when you go to think like sql server what i want you to do is look at the query and i want you to be able to guess what rows do i think the query is going to want what pages inside the data file are going to have those rows what are going to be the most efficient ways to get those rows like if i have

### How to Think Like the Engine Guess which row(s) the query wants Guess which page(s) have those rows

**12:08** · multiple indexes which one's going to be the most efficient to accomplish that goal in the cheapest time possible which table should i process first how much cpu power and how much memory should i allocate by the end of this first initial class in the series it's really about understanding how much work there is

**12:31** · so that you do a better job of crafting both your queries and your indexes to make performance go a little better in this class you are going to be sql server and i am going to be an end user sending you queries i'm going to do the first one just so that you get a feel for how this game is played let's say that me is an end user i pass in a query that says select id from dbo users and i don't put

### First query: SELECT ID FROM dbo.Users

**13:03** · a where clause i don't put an order by i just say go get me all of the ids from the users table so what is your execution plan going to be in plain english if you have a stack of these over in your office supply closet if you have a stack of the 8k pieces of paper with all of the users data on them

**13:28** · how are you going to accomplish this query in plain english don't think about i'm going to build a hashmap i'm going to use a doubly linked list think about a stack of pieces of paper and if you can figure out how to execute it using this stack a piece of paper then you're going to do a pretty good job of understanding how sql servers execution plans look

**13:52** · your execution plan in plain english would be to go into the office supply closet grab the first piece of paper that has these results this clustered index the white pages and you would be reading the ids off in order okay i got id number one two three four you would just be grabbing pieces of paper and yelling the results out to the end user as quickly as you could

**14:23** · this is what sql servers execution plan looks like when you run a query and you get the actual execution plan or you get the estimated execution plan inside of sql server management studio both of these look roughly similar there are nuances differences between them that we cover in our further on classes but for now i'm going to keep it really simple this is an execution plan from sql server and you get this in management studio by hitting control l

**14:53** · to get an estimated execution plan or control m and then execute the query so to get the actual execution plan we read these plans when we're just getting started from right to left we kind of think of it as the execution plan sucks it sucks the data over into

**15:13** · the select operator just pulling the data as quickly as it can the place that it's going to be pulling from the top right operator it says clustered index scan well clustered index that right now is

**15:28** · the only copy of the data that we have clustered index scan we are going to read this table maybe the whole table maybe parts of the table in order to figure out how much work this is you can turn on an option in sql server management studio called set statistics

### SET STATISTICS IO ON Logical reads: the number of ek pages we read.

**15:50** · io on it's totally safe to do it only affects your own session you can do this in development or in production doesn't add that much overhead nobody's even going to notice it in the messages tab of sql server management studio you're going to get this thing that says the logical reads

**16:11** · logical reads are the number of 8k pages that sql server had to read in order to accomplish your query generally speaking the more data that you have to read the slower your query

**16:27** · will go the less data that you have to read the faster your query will go remember how i said right in the beginning that in a perfect world sql server is going to die bomb straight into one page and it's got exactly the data that you want well this is not a perfect world here this bozo didn't even put a where clause on the query so sql server even if he knows which pages have the data he has to read 7405 pages in order to accomplish this

**16:57** · and the users table is one of the smallest ones at stack overflow and we're working with the smallest copy of the stack overflow database as we're accomplishing the queries through the course the next couple hours i want you to think about having an office supply closet with 7405

**17:19** · pages worth of paper in the back that you're going to have to go and find the data that you're looking for timbalero asks my friend thinks that under the hood the engine will actually grab pages from disk into memory in eight pages packages extense is he right

**17:37** · don't go into the internals of how that works let's keep it simple to see if you can do it with 8k pieces of paper first before we go into things like physical structures on disk now it's your turn so as i go through and i change things about the query what i'm going to do is i'm going to color code and bold the parts that i'm changing i'm going to keep adding on parts to the query and this is the first thing that i'm adding go find me all of the users whose last

**18:09** · access date is greater than july the 1st of 2014 tell me in plain english how you're going to execute that query don't give me anything about a doubly linked list you got a 7 405 pieces of paper tell me how you're going to find those rows go \[Music\]

**18:39** · 7 405 pieces of paper over in the closet how are you going to find the rows where their last access date \[Music\] of is so we got a couple answers rolling in here tony says go check each page in each row and check to see whether or not their date is greater than july the first of 2014 exactly the free to fly

**19:11** · jesper nielsen guy all kinds of people are answering in saying that we're going to have to read through all of the pages and that's exactly right we are going to have to read through all of the pages it doesn't really matter whether i start at the first page or the last page i just know that i'm going to have to shuffle through all of the pages saying each id out loud as soon as i

**19:39** · find one that matches i don't have to write it down anywhere i'm going to be able to just yell out my query results quickly now let's look at sql server's execution plan and it looks the same raphael asks over on youtube are the pages sorted bad news raphael we're only

**20:00** · about 20 minutes in and you've already missed something that we talked about earlier that's okay it's early in the morning you can just close your browser and come back to this later you can come back and watch the instant replay start over again in the beginning pro tip so sql server is like i know i don't have any mercy look you didn't pay to get into this class i'm allowed to roast you as often as i want it's 1am i still have the burners all fired up so sql server's execution plan looks

**20:33** · exactly the same because to some extent extense get it it's a database joke to some extent it's really the same thing there's so much work that we have to do if i go and look at the execution plan or if i go look at set statistics io i got the two queries back to back here i got select id from users and i got select id from users where last access date is greater than seven one they're both reading thousands of 8k pages just because you

**21:06** · put a where clause on the query and your query has less output doesn't mean that it's actually doing less work let's look at those two execution plans the top one is when the query had to scan all of the pages the bottom one is when we added in our where clause and clippy has now fired up hey buddy dawg looks like a sure would help if you had an index on last access date i could find these rows ray fat way faster

**21:39** · how do i tell which one of these queries is more or less work my personal favorite way of starting is statistics i o looking at the number of 8k pages that we read but there's another way that sql server needs to use because sql server can't guess which one is more expensive after the queries finish sql server has to guess before the queries start

**22:06** · so if you hover your mouse over the select notice on the left hand side that's the one with no where clause right hand side this is the one with the where clause if you hover your mouse over the select operator you get a little pop-up tool tip here with all kinds of information that's never going to do you any good one of the things inside here though is estimated subtree cost estimated subtree cost is what sql server thinks that this query will cost

### Lesson: Estimated Subtree Cost is a

**22:37** · when he's first sketching out the execution plan before he runs the query he has to lay out a blueprint of how hard he thinks it's going to be well first i'm going to go scan this clustered index then i'm going to have some parallelism over here maybe some filtering and a group buy he sketches out that whole entire blueprint and he assigns a cost to it

**23:02** · a long time ago in a galaxy far far away it was related to the amount of cpu and i o work that the query would do today though it's really disconnected from cpu and io sql server doesn't know how fast your cpus are sql server doesn't really accurately know how much of the data is going to be cached versus how much will be fetched from on disk sql server doesn't accurately know how fast your storage is sql server is still using the

**23:33** · same units of metrics that it used back in the late 1990s back before you know iphones were invented we had mobile phones they didn't even run anything all our sql servers were like one cpu core and two to four gigs of ram and we had to do all these stunts in order to get multiple gigs of ram allocated correctly

**23:54** · so kendra little coined the term query books she called him query box when we talk about estimated subtree cost just to show that this is roughly what the queries cost but it's unrelated to cpu and io today so we actually had our artists design out a series of query bucks with both fronts and rears that you can go print which has all kinds of fun ramifications you can counterfeit money

**24:22** · let's move on and let's add a little bit more complexity to the query let's raise our cost in terms of query bucks i want you to find me all the users who accessed the system since july the 1st of 2014 but i want them ordered by last access date

**24:44** · what's your execution plan in plain english for this one how are you going to accomplish this you have 7405 pieces of paper this is not a small number of rows how are you going to do this as a human being \[Music\]

**25:12** · starts to get a little trickier pox on says ammar pavan says i'm going to read all the records and sort them in memory pavon i got bad news you are not that bright there are thousands maybe millions of rows that match you are not going to remember them so try that again as a human being

**25:36** · now timbalero is the first one who really nails it timbalero says i'm going to scan the entire table i'm going to write down the results and then sort them now also for bonus points what are you going to write down you're not going to write down all of the columns free to fly says i'm going to write down their ids and dates and that that is a

**26:06** · really good answer \[Music\] you have to write down both their ids and dates because as you write down each one's id and date what happens if 30 seconds later as you're scanning through all these pages that you find another user who matches you need to figure out where to put them inside the list that's why you need to save both the id and the last access date

**26:31** · so here's sql servers execution plan now remember we read from right to left top to bottom so the first thing that sql server is going to do is this clustered index scan now that we got a few things going on in the query it's time to talk for a second about what each one of these is

### SQL Server's execution plan

**26:51** · each one of these is kind of like a stand-alone micro service or i kind of think of it as like an app on your phone each one of these operators has a specific job to do they do one thing you had one job sometimes they do multiple jobs and then that little arrow coming out of it is a yelled list of stuff

**27:17** · so mark the answer to your question is no it would be really cool but unfortunately the answer is no so this first micro service is the clustered index scan where sql server is going to scan through and he's going to yell out the list of ids and last access dates that match he's not doing any sorting inside here all he's doing is reading and yelling this next operator is hearing

**27:48** · all of the ids and last access dates and this other operator is writing them down and sorting them as it goes as each row comes in it's sorting them this next operator here the sort is more

**28:06** · work if i compare those two if i compare the two execution plans the one on the left is before we injected a sort the one on the left as i said just yell out all of the ones that match that one has an estimated subtree cost of about six query bucks but now that we've thrown in the order by the cost goes up

**28:33** · and now the subtree cost is more than double and there's something else that changed inside here not only is our cost up by about 2x but we also needed a place to write our work down sql server allocates 8k pages just like

**28:55** · the same 8k pages that it uses to sort data in a perfect world it's going to do this in memory in an imperfect world we won't have enough memory and will spill to disk this is where again things get so cool about execution plans sql server has to guess how much memory it's going to need before the query even starts

**29:20** · so the more easy to understand that your where clause can be that your group buys can be the better of a job that sql server can predict how many pages he's going to find and how many results he's going to find the better of a job that he can do allocating those resources

**29:40** · you can see more about it if you right click on the on the select and go into properties over on the select icons properties or the select micro services properties you get all this information in here about memory grants which is really these scratch pages you get all these memory in here about execution plan memory grants all these numbers are measured in kilobytes sql server starts and projects how much memory you're going to need when the query first starts he has to design out

### You can't always get what you want.

**30:14** · this execution plan and it's easy to guess wrong of course what do you think is going to happen you think that sql server is going to start with just a couple of pages and then as more results come in sql server will grab and ask for more ak pages from the notebook that is not how it works this number is mostly set in stone when your query starts there are edge cases where sql server will allocate more memory but they're mostly edge cases even in the year 2021.

**30:49** · sql server needs to assume that other people's queries are going to fire up at the same time that yours are and he needs to allocate all the sweet juicy memory for your query right from the get go to make sure that your query won't fail halfway through sometimes that means that sql server will allocate way too much memory sometimes it means that sql server won't allocate enough

**31:18** · sql server doesn't know how many other queries are going to start while your query is running and this is one of the other interesting things that i find out or that i feel about about sql server and let's stop and talk about this for a second the exact same system that works for

**31:43** · stackoverflow.com also works for you the same sql server that you run on your laptop the same developer edition that you run on your laptop the same one that you run at your crappies your company's crappy 4 core 16 gig of ram sql server

**32:01** · is the exact same engine that has to work for big giant data warehouses that has to work with people doing petabyte scale data it's the same engine whether you're running one query per second or 10 000 queries per second sql server doesn't have adaptiveness where it starts to change differently based on the number of queries that are running simultaneously he doesn't know that you're not going to start running 10 000 queries per second on your crappy little sql server he

**32:31** · makes some basic assumptions that he tries to make work well for all of the sql servers out there in my webcast i often poke fun at sql server house he's dumb and stubborn and he refuses to ask for directions and he's all trust me i got this but really at the end of the day i'm just utterly amazed at how good sql server is at having one code base that

**32:55** · works well enough for most scenarios it's just that when you start to hit performance walls that's when you have to start learning things so that you understand why you're hitting those walls and that's a good time to stop and talk for a second about my upcoming training classes starting in november of 2021 i had to

**33:19** · stop and think about what year this is in november i'm running a huge black friday sale where on all my training classes you can save massive amounts of money if you're enjoying this i'm just going to plant the seed that you're probably going to enjoy my mastering level classes and the ability to jump around in the fundamentals classes from time to time as well so if you go over to brentozar.com black friday you can get

**33:45** · an email as soon as those black friday sales open up and once i announce what they are for now let's go back over to the slide deck so sometimes sql server over allocates memory and then sometimes sql server under allocates memory and if it under allocates memory then you'll see things like a yellow bang on your execution plan things that say warning

**34:12** · sorry but i ran out of memory and i had to write a whole bunch of pages over to tempdb sql servers temp db is kind of like it's scratch base aka it's public toilet where all kinds of dirty nasty things happen inside of there one of them the nasty things that happens is scratching pages to disk if you run out of space trying to sort users by last access date

**34:36** · we may have to scribble those things out to disk because we didn't get enough memory all right let's change one thing about the query before i was just getting the id now let's get all of the columns what's your execution plan for this

### Let's get all the fields. SELECT \* FROM dbo. Users WHERE LastAccessDate '2014/07/01' ORDER BY LastAccessDate

**35:02** · does this change the way you execute the query well you know when i was a developer i used to think well maybe sql server is going to scan through here once but he's only going to write down the id and last access state then after he sorted all of the rows that match then he's going to come back over to the pages again and fetch the additional columns that he needs that's not what happens what happens is exactly the same

**35:35** · and the only difference is that blank right there steve nails it when he says the sorting operator has more work to do we're not just sorting the id and last access data anymore now we're sucking we're doing a huge ton amount of work but let's be more specific what exactly sucks about this query do we work harder to read the data

### But why does it suck? Do we work harder to read the data? Do we work harder to write the data?

**36:03** · or let me put it another way do we read more 8k pages or are we reading the same amount of ak pages tell me over in slack are we reading more data than we have been previously let's see what we say

**36:27** · lots of you say the same i'll give you anytime lots of people say the same thing especially in my \[Music\] i'm a classes instructor i like to pull your pants down in public and it's not that i want to see your drawers i don't they're not that attractive that's why you have the job that you do but let's see here ah free to fly yes free

**36:56** · to fly nails it and sebastian claude nails it very well done free to fly in sebastian claude remember that we had the varric envercare max column we had the about me column going down the side and i said early on that if you put in a huge amount of data inside there sql server will leave pointers going to other 8k pages yes technically we will

**37:24** · read more because now we have to jump over and get this data that might be stored on other ak pages brilliantly done very nicely done now do we work harder to write the data obviously yes because we're going to have to write down a lot more than the id and the last access state do we work harder to sort the data

**37:45** · now tim bolero said did i say the same i meant more do we work harder to sort the data i kind of struggle with this as a developer i'm not a very good developer i'm a terrible developer as my own developer richie rump will tell you i suck at development are we sorting the same number of rows but the thing is the stack of pieces of paper that we're working with when we're doing the sort that stack is way higher

**38:13** · because we're moving so much data in and out of the cpus cache that sort is more challenging as well then do we work harder to output the data yes because now we're yelling out a whole

**38:29** · lot more columns than we were yelling out before this is what i used to focus on when i was a database administrator don't return columns you don't need pretty much my voice sounded like that don't return columns you don't need because it takes longer to say all that stuff over the network as it turns out that's like the least of our problems to understand it let's read through the execution plan from right to left

**38:56** · the first thing that sql server does is the clustered index scan as he did before but now look at the cost of the sort it's jumped to 97 of the cost of the query and that is a much larger overall cost

**39:17** · the cost in query box has now jumped to 871 query bucks i don't care if you do select star if you're only reading from one table and you're not joining to anything else and your query doesn't have an order by

**39:42** · i don't give a damn if you do select stars totally okay with me it doesn't hurt me in any way shape or form but you diabolical when you start putting in an order by we are going to have a conversation sorting data in a sql server is expensive and the more columns that you add the worse it goes i like to think of sql server as the world's second most expensive place to sort data

**40:08** · sort it in the application tier instead you don't pay licensing in the application tier you don't have to pay sql server licensing that is which is horrifically expensive when you're having performance problems putting in an order by if there's no top i'll tell developers sorry you want to move that out to the application servers i can scale those out infinitely and relatively inexpensively

**40:36** · and developers will say well what's the big deal i'm just running one query right but your application isn't you're running this query over and over again and to show you what i mean let's run the query again with go 100 pro tip you can put a number after the ghost statement so if you want to piss somebody off like your database administrator you can put in go 100 and run the same query 100 times in a row the execution plan that you would

**41:08** · want is you would want to do the same first one and two things but by the time you get to number three you'd be like yo dog how's about we hang on to all this scratch paper that we've been working with once we get done finally assembling our results how's about we hold on to this for just a second or two to see whether or not we need this again after all we already allocated the memory right

**41:38** · oracle can do this oracle dbas will jump right up and tell you that they have result set caching but then they also don't talk about the fact that this thing is horrifically inexp very expensive i think horrifically expensive i think it's probably fair given the quality of the database oracle's a really good database every time i read any documentation about it i'm like man this thing has so many cool dials there's so many cool things that you can set plus they have a racing team and sailboat racing team and

**42:10** · larry ellison has a hawaiian island these things aren't going to pay for themselves if i'm going to pay licensing fees i want them to go to somewhere cool right i don't see microsoft with a sailboat racing team or a hawaiian island sql server abuses your server and passes the savings on to you here i got this query running a hundred times in a row and look what's going on with my cpus my cpus are just catching fire because we're doing this sorting work over and over and over

### SQL Server reads & sorts 100 times.

**42:40** · it doesn't matter if you're the only user in the database it doesn't matter if there are no insert update and delete queries running it doesn't matter if this page hasn't changed at all it doesn't even matter if your whole entire database is read only

**43:04** · sql server caches this sql server does not cache or share this so if you have a hundred of these queries running at the same time each query is doing the same copying and sorting work at exactly the same time

**43:28** · there is no caching or reusing of results from one session to another or even in between the same session so if we're going to make queries like this fast we're going to need another solution and we're going to talk about that in a minute but first let's recap what we've learned so far in the first 45 minutes or so first set statistics io on is a really

### What you learned so far SET STATISTICS IO ON: shows # of SKB pages read

**43:55** · easy turn thing you can turn on in management studio to show you the number of 8k pages that you've read set statistics time on i'm mentioning here just because it shows how much cpu work is done i rarely use that i use in

**44:10** · some of my mastering classes to show you how you reduce cpu time in a query but the problem is that statistics time changes constantly every single time the query runs set statistics i o is a little bit more repeatable and reliable so i tend to focus on using that one if you have a where without a supporting non-clustered index you're going to end up doing a table scan either the entire table or parts of it if you do an order by without an index to support it that's a ton more cpu work

**44:42** · sql server caches caches pages not query results and what you're going to learn in the next 45 minutes is non-clustered indexes how those work stefan good to see you good to see by one of my buddies over from iceland and the difference between seeks and scans now we're gonna take a five minute bio break for you to go grab your coffee or

### What you'll learn next Nonclustered indexes, the good & bad The difference between seeks & scans

**45:10** · in the case of staphon go grab your brenovin now go grab your coffee and then i will see you back in here in five minutes where we're gonna dig into the next section so see you back here in five minutes