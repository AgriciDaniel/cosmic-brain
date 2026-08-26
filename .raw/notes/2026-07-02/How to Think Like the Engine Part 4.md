---
title: "How to Think Like the Engine Part 4"
source: "https://www.youtube.com/watch?v=nLGkF-SWtxA&t=607s"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
created: 2026-07-02
description: "We'll finish up the series by making our indexes wider and talk about the differences between index keys versus includes, and take a few questions."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=nLGkF-SWtxA)

We'll finish up the series by making our indexes wider and talk about the differences between index keys versus includes, and take a few questions.

## Transcript

### Intro

**0:01** · all right let's make sure yes music actually stopped on time this time good all right when last we met we had two copies of the table we had the white copy of the table and the black copy of the table now out of your handouts go get the next

**0:17** · page which is the gray piece of paper and we're going to start layering in yet another index in here and see how that works so when we left off sql server was having this challenging discussion of trying to figure out whether or not it should use the index like here it was using the index because our query was

**0:40** · totally easy to understand cody likes my t or koi likes my t-shirt thank you and then this one sql server wasn't smart enough to figure out that it could use the index and go quickly our query syntax was causing problems well when you see sql server trying to make a decision between doing a key lookup versus a table scan a classic thing that you see inside of execution plans is a key lookup with some outputs

**1:12** · in it when you see a key lookup with some outputs on it that means that sql server couldn't get everything that it needed from the non-clustered index so it had to go back to the key to the clustered key and go back and grab additional columns one way that you can fix this is to go add these output columns to an index make a wider index that has more things

### Wider Index

**1:40** · in it that's where the gray piece of paper comes in what i've done is i've created an index on last access state and id and i've tacked on the display name and age column as well one thing that you'll notice is that this thing is wider because it has more

**2:04** · columns in it it can't fit as many people per page these pages have about half as much as this page does so you can think of it that this index will be twice as large on disk it's going to take longer to do our inserts and deletes longer to do our index maintenance and so forth but if you're willing to make that trade-off then even the bad quote-unquote query uses it here when people were using the

**2:38** · year and month of last access date sql server's estimates are still wrong but it doesn't matter because he just was able to seek into this brand new wider index and grab all of the columns that he needs now this index is physically larger it does have more 8k pages in it

**3:02** · one way that you can check to see the overhead of that is to run the command sp blitz index sp blitz index is part of our open source first responder kit gives you all kinds of scripts and tools and i teach you how to use that in another class coming up how i use the first responder kit if i call sp blitz index with one specific table name sp blitz index will

### SPBlitz Index

**3:27** · list out an inventory of all of the objects on that table here in this case we see that our first initial index the index on just last access date and id that one has all 299 000 rows in the table it's about five megabytes in size

**3:48** · the second index on our table the one that's wider takes up more space because it has more columns in it the more indexes that you have

**4:06** · and the wider that they go the bigger your database becomes the longer your backups take the longer your checkdb takes the longer your restores take the longer your index maintenance takes the longer your update statistics jobs take and even the less memory that you have because if i want to store this object in ram it takes up more space than this object would have

**4:39** · because this is the smallest unit of data that sql server works with he doesn't work with individual rows or columns if he's going to cache something he's going to cache whole pages and there are less pages per or less rows per page here then there are here

**4:58** · the users table is now going to take up more ram when you first get started creating indexes you're like go i've learned that indexes make things faster create index like crazy people follow the database tuning advisor people follow all the missing index hint recommendations and at first it's not a big deal they create an index because it immediately makes their select query go faster but over time your sql server is just dragging

### Indexes

**5:29** · more dead weight around trying to do all these inserts updates and deletes and maintain all these copies of indexes you might be a redneck if you might have too many indexes if people are complaining about slow inserts and deletes now let's think about that one right here you know what in most shops they're not in most shops people don't complain

**5:56** · about slow inserts and deletes slow inserts and deletes happen up in the seconds worth of territory because we're dealing with blocking and locking but if it's taking 50 milliseconds versus 200 milliseconds you know what not a lot of people really care the place where they care with this is data warehouses if you have a data warehouse and somebody's like oh my god the data warehouse loads are taking forever and then we go pop open the tables and we look to see we got two dozen indexes on every table that is

**6:26** · where they're complaining about slow inserts and deletes and we may need to peel back some of the number of indexes that we have if your monitoring tools are warning about blocking and dead locking the more indexes that you have the more that sql server has to shuffle around and grab locks across all of them when it needs to do inserts deletes and updates or if your database size is a problem if

**6:54** · you're trying to get your database to be down smaller you might want to think about ripping out some of the indexes that aren't really in that you saw that much but you know for a lot of people none of these happen with a lot of shops that i run into their problem isn't too many indexes the problem is that people haven't added enough indexes because they were afraid to because they thought they were too big of a deal generally speaking i talk about in my fundamentals of index tuning class you should have five indexes per

**7:22** · table that's normal totally normal when you get up above five that's when you start to ask questions and we'll dig into more into that in the fundamentals of index tuning class you might not have enough indexes if people are complaining about slow selects or if you can cache most of the database in memory that tends to indicate that you've got a lot of hardware and you could probably live with slowing that down a little bit in order to pay off and make your selects faster

### Including Columns

**7:52** · a long time ago in a galaxy far far away microsoft introduced the com the capability of doing includes in an index so that we could just include columns in the index without having them in the key

**8:08** · i'll be honest i i think that it was mostly due to hardware the way that it existed back in the late 1990s and nobody runs sql server on hardware that crappy anymore but back then people said well if you only include the columns on the index

**8:26** · it's a lighter weight overhead it's able to store it differently and it doesn't take up as much space really mcfly because if i create that index and then i look at the two copies of it the top copy just includes last access

**8:45** · data or just includes display name and age 12.3 megabytes here all four columns are in the key 12.7 megabytes that's not a show stopper of a difference to be honest even if this was gigabytes that's not really that big of a deal because at the end of the day their 8k pages have exactly the same stuff in it

**9:16** · whether you create the index with all four things in the key or whether you put two things in the key and put the other two and includes your 8k pages look exactly the same way the only thing that's different is the supporting structure of the index aka the b

**9:34** · tree and that's just not that big of a query performance deal for 99 of the audience out there some folks will say but size is only a small portion of it the other thing that's big with includes is that they're not having to sort on the index if some of the data changes it doesn't really matter i don't need to resort it as much

### Sorting

**9:58** · think a little bit deeper about that let's say that this user over here in the corner sarcastic let's say that sarcastic got one year older and we need to change his age from 30 to 31

**10:14** · if age is only included in the index then the changes in value of display name and age don't change the sorting so i could change his age from 30 to 300 and it doesn't make any kind of difference here this i age is only included in the page

**10:36** · so i don't have to change his sorting but i don't want you to think that that's a lightweight operation because you know what we still have to do we still have to pull this 8k page up into memory we have to change this data we have to push this 8k page back down to disk none of that changes

**10:57** · now if i put age in the key if i put age in the key of the index and then he changes his age oh this is where people who say they like includes get all excited because they're like ah now if you change his age from 30 to 300 now it's gonna make a big difference is it really take a look at that page and if i change sarcastic's age from 30 to 31

**11:26** · where do i move him on this 8k page does changing his age change where his row lives

**11:43** · makes no difference whatsoever i could change his age to 300 because this is very selective this really determines where he lands this is so close to unique his display name could change i could change him to alpha and it still doesn't change where he lives i could change his id it still doesn't change where he lives

**12:14** · the first column in an index is dramatically important the first column generally speaking needs to be relatively unique

**12:29** · it doesn't have to be perfectly unique doesn't have to be perfectly selective but generally the first couple of columns matter a lot the rest of the columns order doesn't really matter whether it's in the key or the includes i don't want to say always there are absolutely edge cases where it makes a phenomenal difference but what i'm getting at here is as long as you get roughly the right columns on these pages

**13:00** · and as long as the first couple of columns are in the right order you can go a really long way generally speaking columns in the where clause group by joins in ordering these are often good candidates for your indexing keys and generally columns in the select are good candidates to include in an index

### Summary

**13:27** · just don't think that includes are magically delicious they're not they take up just as much space on the 8k page and sorting on them doesn't usually matter that much when they're beyond the first couple of columns in the index

**13:46** · so to recap what we talked about inside here so far generally the less columns that indexes have the less benefits there are if you have a bunch of single column indexes in your database sql server's usually making the tipping point decision really early and it ends up just ignoring those indexes altogether generally you want more columns in your indexes i encourage people to think about having up to say five columns in their indexes and that'll end up giving you more payoff for queries it does

**14:16** · cause bigger indexes longer maintenance jobs and more blocking and we talk about the trade-offs between these in the fundamentals of index tuning class and then included columns just aren't simply magically delicious

### Resources

**14:32** · now we're coming to the end of this and i'm going to switch over into questions and answers but i always want to tell you where to get where you should go next whenever you finish one of my lectures if you go to brentozar.com go slash engine you can download this exact slide deck and there are resource links trickled all throughout saying if you want to learn more about stats for example go to my statistics class

**14:55** · then after this after you go through the related resources my fundamentals of index tuning class is a one-day class designed for people who need to design indexes for queries without looking at the execution plans in there we really focus on how do we write indexes without

**15:13** · looking at plans then my mastering index tuning class teaches you all the edge case gotchas filtered indexes partitioning indexed views and much more or if you're the kind of person who wants to learn query tuning my one day class on fundamentals of query tuning teaches you more about how sql server builds query plans how you should go about finding the right queries to go tune how query parameters influence

**15:39** · which plans get cached in memory and then a few common t-sql anti-patterns that if you steer away from those your performance will be much better after you finish that one you're ready for my three-day online mastering query tuning class where we go much more in depth about doing things like advanced rewrites ctes and so forth let's set your questions here so let's see um greg says what are the advantages to creating unique indexes

### Unique Indexes

**16:10** · one of the big ones is that if sql server knows that the combination of columns will be unique it can reliably estimate that only one row is going to come back frankly that's not that big of a benefit for me because usually even without declaring the index is unique the statistics will give sql server enough of a hint that it's going to estimate really close to one row like it'll estimate 1.000 something

**16:38** · calling the column or calling the index unique just guarantees that the estimate will be exactly one row i've never had a situation where that difference got me across the finish line but i know folks who have the other benefit for it is that if you need to enforce uniqueness at the database level like if you don't trust the code that's inserting data into the database just know that there's a performance overhead for that when you force sql server to do that uniqueness

**17:04** · check for you uh next up tim bolero says i'm missing the recap pictures with caps in them yes that is in the uh fundamentals of query tuning class i was very proud of that i tried to do different themes of stuff the whole time adam says this may be way out of the scope of this session but how should i best approach index creation that we've covered when devs are using entity framework and there's less control over the terms of the sql that's thrown out so my honest thought with that

**17:34** · is that even when you think that you have control over the t sequel you don't really have control over the t sequel do you like people are gonna write haters are going to hate and developers are going to develop and users are going to use people are going to write heinous queries whether it's an entity framework or whether it's in stored procedures you really approach index creation the same

**17:57** · way it's all about making sure that you have enough indexes to make your queries go fast but not so many indexes that they slow your queries down marcus says are there cases where a view on an index table does not benefit from the index so yes depending on what's in the view

### View vs Index

**18:18** · the problem isn't the view itself the problem is the t sql in the view for example i've seen people put in like 15 group buys grouped by this and this and this and this having this and wear this and they're asking for all kinds of extra stuff that they don't really need and sql servers are like oh my god you have so many columns inside here i better off just scan the table so that really the problem in there is more about the the query in the view and

**18:46** · to give you a great example copy paste the query straight out of the view and try to run it by itself with whatever where clauses you need inside there and usually you don't get the index usage that you want in there either again to emphasis that it's not the views problem it's the query inside the view i have clients using a ton of views

**19:07** · then they have great performance but because they tuned the bejesus out of the queries inside the views shahzad says does the first responder kit work with azure sql db shahzad likes to ask questions without reading the documentation like reading the readme shahzad i love that thank you

### Azure SQL DB

**19:27** · very much i know that this audience is going to think that i'm going to burn you for not reading the documentation but let's be honest my favorite students are the ones who read the documentation because who don't read the documentation because look we're all here in a training class because y'all won't read the documentation because the documentation

**19:48** · is dry and boring i don't really like reading the documentation either so shazad does the first responder kit work with azure sql db some of the scripts do and some of the scripts don't the problem is that microsoft keeps changing the contents of the dmvs and

**20:05** · which things are supported and there's no change log for what gets changed so i gave up trying to support it a long time ago parts of them work parts of them will not but don't bother filing an issue on one of them not working unless you're prepared to put in the work to make it actually work otherwise i love the idea of azure sql db i just don't have hardly any clients actually running azure sql db just the cost of it is a little bit on the tricky side

**20:35** · gustav says asking for a friend are there any use case scenarios where you would create a non-clustered index on a primary key yes and we talk about those in the mastering index tuning class so now that's two levels up above where you're at now we just finished how to think like the engine the next one up is fundamentals of index tuning the next one up after that is mastering index tuning i don't say that as an attempt to

**21:00** · pitch you on it i say that so that you understand how rare it is like it's insanely rare that i separate the clustered index from the primary key i think i could count on one hand the number of times i've done it in the last five years so it's just extremely rare

### Questions

**21:20** · binu says i've seen queries with values directly checking in the join clause instead of the where how does sql server use an index oh that's a great question and i'm going to cover that in the exact detail in my fundamentals of query tuning class so that one's also coming up in the next few weeks so search for fun bruno's are fundamentals of query tuning and we spend about an hour on it inside there prohiler says indexes are computed over

**21:50** · computed columns are those also covered in the mastering index tuning class yes they absolutely are steve says we have a very large database tables with a billion plus rows developers try so here's a pro tip y'all

**22:05** · when you when you ask a question if you can keep it shorter rather than simple i don't want to know what your birth date is your mother's maiden name i'm sure other people would love to know that for identity theft purposes but if you just boil down straight to the chase and stop telling me about your childhood he said you touched on keeping queries as simple as possible and here's after all that he's got more stuff inside there any further useful comments on this yes keep your queries as simple as possible try to rephrase your question and maybe we can boil it down a little bit there amaro asks can it make sense to have

**22:36** · your clustered index on a guide column instead of on integer ids yes and we cover the use case for that in the mastering index tuning class again the fact that it's two levels up like you're in for how i uh uh how to think

**22:54** · like the engine next up is the one day fundamentals of index tuning next up is the three day mastering index tuning class the fact that it's in mastering kind of tells you how fairly unusual that is that you sh it isn't something that you should have to do fairly too often um next up kairu over on youtube says is

### Unnormalized Table

**23:14** · there an unnormalized if there's an unnormalized table with many columns should we create different indexes for different use cases or is it better that we split the table kairu that is a great question i mean like a lot of you all ask me questions but kaio's name is actually great so the problem with splitting a table up

**23:35** · into different groups of columns is that generally you have to rewrite places of your application people get pissed off when i tell them to rewrite their app like me as a consultant my primary job around here is

**23:50** · doing consulting and doing emergency performance tuning for companies if i came in as a consultant and said you need to change your application we're going to split this table up into three parts just rewrite all the queries that touch this table by they would kick me out before i would even make it to the door instead what you want to do is think about how this is a really wide table and this is a narrower subset that's designed for

**24:23** · specific use cases this is really like paying for architecture problems that you didn't get right in the first place in the perfect world we would arch architect this beautifully and break it out and normalize it but if you can't then this is a really easy fix for post

**24:44** · production psy says will it still help to include almost all of the columns greater than five columns in a normalized table i assume you mean in a non-clustered index it absolutely can depending on what your first columns are yes prod says i used to get complaints from the team saying that inserts are slow i

### Slow Inserts

**25:05** · check the number of indexes and it's three and it doesn't have any large columns the queries are straightforward also is there a way that we can improve and insert yes when you're having slow inserts there are several things to think about one is blocking is someone doing a begin tran and then doing all kinds of work across all kinds of different tables you want to keep your transactions as short and sweet as possible

**25:34** · kind of think of it like going to the grocery store you would never go to the grocery store go get a cart and then go to the checkout line and say all right i'd like to begin my transaction now if you'll excuse me i got to go get some lettuce also uh hold on here's the lettuce in my basket now i need to go find some lemon juice so i'll be right back the other shoppers would beat you to death in the grocery store instead

**26:00** · what you do is you go get all of the stuff that you need and then you begin the transaction and you get out as quickly as possible so that's another thing to think about then finally the other thing to think about is the speed of the writes on the sql server itself if you have things

**26:17** · like synchronous always on availability groups database mirroring slow storage all of these things can slow down your inserts as well nathaniel says is the correct order of columns in multi-covered in multi-column indexes covered in the mastering index tuning class no that's actually the fundamentals of index tuning class you know it's really funny when i pick and choose things that are going to be in fundamentals versus mastering i think the the which column

### Order of Columns

**26:45** · should go first in an index is really fundamental but i know so many database administrators and performance tuning people who come waltzing into my mastering classes and they haven't taken the fundamentals and i'm like okay so in this exercise you know you you got the order of columns wrong so tell me how you chose the order of columns in an index they go selectivity and i'm like nope you fail go back to fundamentals of index tuning you miss the basics because selectivity of the data in the table has

**27:14** · nothing to do with it we cover that in fundamentals suresh says thanks for the lovely session you're welcome uh anders says if it makes no difference to use includes or not in an index creation why does sql server suggest indexes with and without includes so sql servers missing index recommendations are calculated in a matter of milliseconds you and i us meat bags we take hours to

**27:45** · do that sql server's trying to pull it off in a matter of milliseconds so he just can't afford to put too much thought into it they're a starting point they're not a finishing point and in fundamentals of index tuning i'm going to have some world shattering news for you around how those indexes are created and what their order means it's not what you think it is

**28:09** · all right so oh thanks all for the kind words over in the comments thanks for hanging out with me this morning so i will go ahead and stop here lots of other questions are starting to come in now once i uh once i talk about uh bailing out for the day but i will see y'all in the next free

**28:28** · classes so next we have coming up over the next couple of months we have how i use the first responder kit fundamentals of index tuning fundamentals of query tuning fundamentals of parameter sniffing fundamentals attempt to be all kinds of one-day classes all in the same kind of

**28:45** · user interface as this so if you liked one you're going to like those as well this is the shortest one out of everything that i do the longer one the rest of the ones inside the next two months are all going to be all day courses so thanks a lot y'all and i will see you all in the next class adios