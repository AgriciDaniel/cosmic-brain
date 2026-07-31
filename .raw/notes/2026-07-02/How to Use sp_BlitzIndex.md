---
title: "How to Use sp_BlitzIndex"
source: "https://www.youtube.com/watch?v=8Wo5M7kYO20"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2016-09-11
created: 2026-07-02
description: "sp_BlitzIndex checks your SQL Server database's index design to make sure you've got the right indexes on your tables, and help you drop the bad indexes. Download it free at http://www.BrentOzar.com/b"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=8Wo5M7kYO20)

sp\_BlitzIndex checks your SQL Server database's index design to make sure you've got the right indexes on your tables, and help you drop the bad indexes. Download it free at http://www.BrentOzar.com/blitzindex/

## Transcript

### Intro

**0:00** · so you're wondering how your indexes are doing like do you have the right indexes designed for a database are you desperately missing some indexes that's where SP Blitz index comes in this totally free script gives you a health check across your databases now when I get SP Blitz index I can just hit execute and it's going to go create the stored procedure I usually put my

**0:23** · utility stored procedures and master but if you want to put it in another database that's completely fine it'll work in any database now I'm going to switch Windows here and go over into another window where I've already got some parameters set up for SP Blitz index the first one that I'm going to go run it with is with get all databases

### Run spBlitzIndex

**0:41** · equals one this goes through and analyzes the health of indexes across my entire SQL Server all of my user databases it's going to go check against all of them if you've got more than 50 databases on your SQL Server we actually stop there if you want to analyze more than 50 you'll need to use the parameter bring the pain equals one there's a

**1:06** · reason why it's named that it's going to take a very long time it's not going to block other people while it runs it's just that it's going to take a long time to analyze across hundreds of databases so when I run SP Blitz index here's what I get back I get a prioritized list of things that are kind

**1:24** · of iffy in terms of performance on my SQL server in here I've got my stack overflow demo database I can see that I've got a few really high value missing indexes and I've got some indexes that I'm not even using now to explain each of these I want to scroll across and look at the details in the first three here these

### Index Types

**1:46** · are the indexes a SQL server has been tracking to say I really wish I had these indexes sp sp Blitz index is just built a top of the index usage DMVs and missing index DMVs that are built into SQL Server so it's limited in terms of its capabilities it will tell you what Fields it wants the index on but remember with SQL servers missing index DMVs this does not mean the order that

**2:14** · that index should be included in the different fields may need to be moved around into different order that's up to you with your index tuning capabilities as I continue scrolling across here it'll tell you how many times that index would have been used how much faster it would have made the queries involved with that and how expensive those queries were that really

**2:38** · needed the index if you want to see which queries they were your best bet is to go use the SP Blitz cash stored procedure that will go through and analyze the queries in your plan cache that's for another video we also tell you how many indexes already exist on

**2:57** · that table so for example I can see here yeah of course I need some indexes on these tables I don't have any right now and if I want to learn more about each particular table that's getting recommendations here see this more info command I can just copy paste these right out let's take one out by default start a new window and then paste that in execute it SP Blitz cach will then go

### More Info

**3:26** · and give me a more thorough review just about that one table for example here are the indexes on that table this table has one clustered index that also happens to be the primary key we show information about the fill Factor how many seeks and scans it's had how large

**3:45** · it is whether or not it has partitioning or compression and much more if there are any missing indexes those will show up in the next result set and then the third result set has the complete definition for the table all of the fields on that table which I find really useful when I'm doing index tuning how big are the fields that I'm getting ready to index let's go back to SP Blitz index's output and dig a little bit deeper we also get the exact create indexes

### Create Indexes

**4:17** · command over here in the create tsql column so I can just copy paste this in and have an indexing party in my database and everyone's invited well not quite so fast see there's a trick here when we paste in these these uh index

**4:33** · recommendations notice how there's some little question marks in here these don't compile as is you can't just execute these and immediately create indexes because I want you to kind of understand what you're doing before you go just create indexes willy-nilly otherwise I know how you people are you'll copy paste anything that you get from the internet and immediately flood your database with indexes so we make you think there about whether you want indexes created online or off and

**5:00** · whether or not you want sort in tempdb on or off that's a performance question best left for our index training back over on SP Blitz index's output we've also got alerts here that I have some indexes that aren't being used they're only slowing down my inserts updates and deletes and if I scroll across I can also see how big these indexes are and how many rights I've actually done to them but this is only a

### Index Output

**5:29** · hand full of warnings the reason why is we only want to surface the most crucial warnings on your largest objects if you want to go into more details you want to see things even on fairly small tables

**5:44** · what you can do is switch into a specific database let's go like just the stack Overflow database and then I'm going to run it with a different set of commands I'm going to run it with mode equals 4 SP Blitz index has several different modes but mode equals 4 will go down even to more detail on our smaller

### More Details

**6:08** · tables for example here you'll see it returns more warnings multiple personalities I've got borderline duplicate indexes on one of my indexed views now is probably a good time to mention the cool names on these indexof multiple personalities hoarder abnormaly

**6:29** · psychology Workaholics we kind of think of this as a psychological test for your indexes it's not that there's any kind of bad psychology It's just sometimes there are unusual behavioral patterns like your e kleptomaniac so we just want to alert you about some of these unusual things that are going on inside your database if you want to learn more details about any of the warnings that your SQL Server is facing check out the URL column where you can see whole pages

**7:01** · about each of the unusual psychological behaviors that are going on inside your database that's SP Blitz index a tool to help you design the right indexes and get rid of the junk indexes in your SQL Server datab base