---
title: "How to Think Like the Engine Part 2"
source: "https://www.youtube.com/watch?v=eVEkrTZkt08"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
created: 2026-07-02
description: "As we continue to learn how SQL Server works, we'll add in nonclustered indexes and explain the differences between seeks and scans."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=eVEkrTZkt08)

As we continue to learn how SQL Server works, we'll add in nonclustered indexes and explain the differences between seeks and scans.

## Transcript

### Intro

**0:00** · \[Music\] all right welcome back so when last we met we only had one copy of the table we only had the clustered index well now in your handouts get the second page as well the black piece of paper because now we're going to be dealing with two different copies as we start to really get into performance tuning

### Indexing

**0:27** · so now we're going to start by making a non-clustered index we're going to say go create index on last access date and id and when you execute this statement this gives you the pieces of paper in your handouts the black pieces of paper

**0:46** · the black pieces of paper are an index sorted by last access date and then id the results you can see right here on the screen it is literally a copy of the table

**1:05** · this is a performance tuning technique when you add them you're doing them so that your select queries run quicker in some cases they can make your inserts updates and deletes quicker but i literally have two copies of the table

**1:22** · the difference between these is that in the clustered index you pick the column that's being used for sorting but the clustered index has the entire contents of the table this is kind of like a readable replica you can kind of think of it as like replication built in inside of the database where you get to pick

**1:46** · which columns are being replicated over to this other copy it is instant replication though whenever you want to do an insert or a delete we have to affect both of the copies of the table at exactly the same time

**2:02** · because both of them have all of the rows there is an edge case for indexing where you can pick and choose which rows you want it's much less typical though typically we create an index that has all of the rows on it it's just that on the non-clustered index you got to pick which columns are involved so that means whenever you do an insert you're now doing twice the storage work

**2:31** · when you do deletes you're doing twice the storage work let's talk about how that affects tuning for a second i have walked into environments where people have said oh my god the storage we're getting all these 15 second i o warnings on the storage the storage is so slow and then we go pop open their object explorer we go pop open sp blitz index and they have dozens of indexes on every

### Storage

**3:01** · table well when you do that you are amplifying the rights by dozens every time there's an insert we're doing dozens of writes instead of just one generally speaking you want as few

**3:18** · indexes as practical to support your workloads the more that you add the more inserts and deletes are going to have to hammer the storage now this is also going to make your database bigger but not exactly double the storage because after all this one has all of the columns this one only has a couple if you choose wisely and you don't put all of the columns inside the index then you can cram way more users per page on this index

**3:52** · than we can on this index sometimes people will say sometimes people will say chris over in the chat says i'm oracle-based and wanting to get more proficient with sql server why if you work on oracle don't you like drive around maseratis and have gold-plated plates filled with caviar i

**4:13** · think that's how the oracle word why would you want to slump around in sequel sir oh because you think the jobs are going away because people are getting tired of spending bajillions of dollars on their oracle licensing okay in that case welcome to the club so in here like we're able to cram way more users per page on this one than we were on this one this is effectively way more dense since we picked way fewer columns

**4:39** · now prods asks is there a change to both of the index if we run an update column and it's not presence or we run an update statement and the update isn't present oh there's a friend of mine who loves to say that there are two kinds of questions in a session there are good questions and there are great questions good questions are answered somewhere later on in the session prods that is a great question because it's answered on the very next slide

### Updates

**5:11** · so we were talking about deletes and inserts but when we talk about updates updates only affect the copies of the table that have the column involved since the update if an update doesn't touch whatever's on this copy of the table we don't have to lock this copy of the table for example let's say like in november coming up i have a birthday and we update brent ozar's age to be age plus one

**5:43** · age isn't on these 8k pages at all so my rights aren't affected in as much on updates inserts and deletes are still affected but updates are not this starts to make you think about hot columns what are columns that change all the time in the case of the users table reputation reputation is constantly changing last access date last access date is constantly changing

**6:16** · in theory you don't want to index very hot columns that change all the time because the more frequently that that column changes the slower our storage is going to become in theory if people want a very hot column we're going to make them go over to the clustered index in order to get it because i can't afford to index very hot columns in practice i may have to make compromises like in here so far all of our querying has been filtering on last access date so i have to index that column the more

**6:48** · money that you throw at the gods of hardware the less you have to care about these kinds of things in theory you want as few indexes as practical so that you don't have to worry about this at all however of course if you don't have any indexes you run into the problem that we had initially where every time that we wanted data we had to scan the entire table if on the other hand i put in too many indexes then our deletes updates and

**7:15** · inserts our way slower i teach you more about that in next week's class fundamentals of index tuning about how you find the right balancing part so let's come back to our select query and i'm going to take out the select star because that was a hot mess and we're just going to go back to id in order to keep things simple i'm going to run the exact same query that we were running before just with id only instead of star now what is your execution plan look

### Execution Plan

**7:44** · like you have both copies of the table to choose from if i tell you to go find me all the users where last access date is greater than july the 1st of 2014 and order them by last access date how do you execute that now

**8:07** · maurice says or more it says simply read from the index i want you to be more specific evan is even worse evan just says the word index evan's the kind of person who walks into a project meeting and he's like status unacceptable just yells out random one

**8:27** · word bitcoin move just yells out words randomly throughout the course of the of the day uh use master says i stay away from the clustered index maurice says i read the id from the index here's what you're going to do

**8:44** · sometimes i have to tell you the answer because you're not all that bright but that's okay because you're here in a training class i can't expect you to be all that bright right if you knew hey if you had all of the answers you wouldn't be here and i'd be out of a job i'd be like shuffling shuffleboard somewhere i don't know how i'd be making money what you would do is you would seek this is the word that i'm looking for you would seek into july the 1st of 2014

### Seek

**9:08** · you're lazy i know you you're the kind of person who sits around and watches youtube all day it just so happens that there was a training video on but let's not kid ourselves you would be watching like britney spears free britney celebrations if i wasn't around you're going to grab the last access date index and you're going to seek to july the 1st of 2014 you're going to die bomb directly to just that one particular point and then you're going to read the ids out in order because they're already sorted by last access date here

**9:40** · here's what that execution plan looks like for sql server now we're back down to just one individual operation now we're going to seek into this index just as a side note here i love these little icons on the execution plans

**9:59** · these really tell you a lot if you zoom in and think about what they mean before the icon said i'm going to start at one end when we had a scan the icon said i'm going to start at one end and scan through the whole entire object this one is different here it's more of a dive bomb i'm going to dive bomb into one area of the table and start reading

**10:22** · if i hover my mouse over that index seek now the query cost is down less than one query book it's 41 theory cents when i was your age you could like get an entire dr pepper for that and still have like a dime left over

**10:40** · if i compare these it's dramatically cheaper than when i had the non-cluster when i had the clustered index only now even when i do select star this is still relatively inexpensive so why is it cheaper

**10:56** · one aspect of cost is that this is doing less logical reads here i got two versions of the query the top version of the query i have hinted the query to say go dawg i want you to use index number one a hint is exactly like when your partner at home does it hinting that the trash is about ready to go outside that's not really a hint that's a command same thing with this with sql server that index hint is really a command to

**11:26** · no matter how bad this sucks i want you to use it when we have that then sql server is reading about 7000 pages but when i let sql server choose then it only reads a few hundred logical reads this requires less reads because it doesn't have so many freaking columns in it as opposed to this one plus when we seeked

**11:49** · we die bomb directly into one part of the table and only read the data that we needed remember how at the beginning of the session i said in a perfect world sql server can die bomb into specific pages and they have the results that we want that's what we're seeing happen here that the benefit of logical reads is the thing that most people think about in terms of a benefit of an index but it's even bigger than that it's also less cpu time

**12:23** · if i turn on set statistics time which isn't something that i do very often but i need to do here in order to illustrate how much more easy this is for sql server this index eliminated the sort

**12:38** · when i used the clustered index i had to sort the data by last access state now it's already sorted by last access date so if we hop back and we look at the execution plan there's no sort here sql server is able to just read them out purely in order so now it does less cpu time as well

**13:01** · this index is absolutely perfect for the query that we're dealing with here so we call this index a covering index that's a technical term but it's not a term that means anything to sql server it's not like you say create clustered index or create covering index you it's your job as a database tuning professional to know when and how to craft an index that perfectly covers a

**13:30** · specific query one lesson you might take away from this is that index seeks are great because when we looked at the execution plan we saw an index seek sql server was die bombing into just one specific area of the table and then reading out a bunch of rows seek sounds magically delicious seek sounds

### Index Seek

**13:52** · like it's a really tiny lightweight operation look at the number of rows that come out though the size of that arrow it's a little bit on the large side as a human being it's natural to think that seek means you're going to dive bomb into one area of the table and you're going to read back a relatively limited number of rows

**14:24** · as a human being it's also natural to think that a scan means we're going to start at one end of the table and read a metric butt load of rows neither of those is what seeks and scans mean to prove it i'm going to change that date pro tip stack overflow not around in the

**14:49** · days of covered wagons and even though that has all of the rows in the table sql server still calls it a seek sql server can't guarantee that people

**15:06** · weren't using stack overflow back in the days of covered wagons oh sure sql server has some statistics about the contents of what's in the table but it can't guarantee that those statistics are accurate because after all the statistics are only updated periodically stat sql server doesn't

**15:27** · know that someone didn't go back and insert a bunch of data for an earlier date after the statistics on our table are more were updated more on the statistics thing in a minute you see a seek in an execution plan all it means is that sql server knows it's going to dive bomb into one row

**15:52** · and start reading but the word seek does not define where we stop reading you can if i jump back one slide you can seek to the very first row in the table and then read all of the rows in the table and that is still considered a seek to sql server because he believes he's jumping to one point

**16:20** · on the flip side scan means that sql server is going to start at one end of the table and begin reading but it doesn't mean he's going to read the whole thing it just means he's going to start at either the beginning or the end and read enough rows to get the data that he wants for example here's a scan it only reads a few rows

**16:50** · you can't craft an index for this that will get a seek there's nothing wrong with a scan here a scan is actually as efficient as this can possibly get this is a good scan

**17:08** · so when you're doing performance tuning on execution plans i just don't want you to think that you can see a bunch of index seeks on an execution plan and call it a day the terms seek and scan are not positive or negative they're just descriptions of where the reading begins not how much data is actually read

### Questions

**17:33** · so what we've discussed here so far and then i'm going to switch gears for a second and take questions for a few minutes is that indexes are literally copies of the table the more indexes that you add the more space that you're taking up the longer your backups take your check db your update jobs your maintenance jobs all those kinds of things the good news though is that if you make exactly the right indexes that cover your queries really well then you can reduce the page reads and cpu

**18:04** · seek means that we're going to jump to one area of the table and start reading and then a scan means that we're going to start at either end of the index but neither seek nor scan refers to how much we're going to read so let's hit your questions here for a second so let's see here we have uh pavan asks

**18:23** · if my where clause on an index column has to read all of the data on an index and the select has a column that's not in the index does it read more pages like jumping over to for uh the clustered index yes and we'll dig into that in more details in the next module mark says in the index example that we

**18:46** · had because both of the rows date and id were the key columns of the index did sql server read less data because it could in effect uh skip the branches of the index structure nope you're overthinking the holy hell out of this that is incorrect sql server does still hit these because after all you need every row uh in our query example it

**19:07** · wasn't just that i only needed the first and last rows i love where you're going that you're thinking about the b tree structure but in almost every case that simply doesn't matter and isn't all that useful for queries sadly sad trombone greg says when he was looking at the execution plan we seeked and read 99.5

**19:28** · of rows that percentage that you see on execution plans isn't a percentage of rows there are two percents inside there let's go back and take a look at those so if i come back over to this x uh where's the one that greg was pointing at was probably that's like not 99.5 where's the one that's 99.5

**19:55** · i don't think i've even got it in there 100 percent okay so oh here you go okay this is perfect all right so there are two costs or there are two percentages in execution plans this one is the estimated cost of this

**20:12** · operator compared to all of the operators in the plan this percentage is an estimate or is is a calculation of how accurate were our estimates sql server estimated that he was going to bring back 148 408 rows in reality he actually brought back 148

**20:36** · 328 rows so he brought back 99 of the rows that he estimated were going to bring back that isn't 99 of the whole table it's just an estimate of his accuracy so great question there

**20:54** · now let's come back over here and then arto says uh sometime which shows that arto says that shows sometimes scans are just more efficient absolutely there are plenty of cases where a scan makes more sense than a seek uh harshi has how to deal how she asks how do i deal with not equal to conditions now

**21:19** · that's a great question we're not covering that inside of this class though we do cover it in things like fundamentals of index tuning and fundamentals of query tuning and then adam asks a question about includes we're going to get into that in the next module so to talk about what we're going to learn inside the next module let's come back over here and off to there we go so what you're

**21:45** · going to learn inside the span of the next modules we're going to start talking about key lookups the tipping point how sql server chooses between execution plans cost based query optimization how statistics come into play and then how your query syntax affects all of this we're going to take another five minute break and then when we come back we're going to start talking about how sql server chooses between execution plans so i'll see y'all back in here inside five minutes