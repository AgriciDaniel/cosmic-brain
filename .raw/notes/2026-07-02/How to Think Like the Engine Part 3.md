---
title: "How to Think Like the Engine Part 3"
source: "https://www.youtube.com/watch?v=v7om3rsgEfM"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
created: 2026-07-02
description: "Now that we have two different indexes on the same table, how does SQL Server choose between them when building execution plans? Let's learn how a cost-based query optimizer uses statistics."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=v7om3rsgEfM)

Now that we have two different indexes on the same table, how does SQL Server choose between them when building execution plans? Let's learn how a cost-based query optimizer uses statistics.

## Transcript

**0:00** · \[Applause\] \[Music\] \[Music\]

**0:24** · oh somebody says \[Music\] there we go all right cool so where we left off was we had this select id from users where last access date is greater than a certain date order by last access state let's add on a couple of columns into there let's add on the display name and age column now the display name and age are not on

**0:55** · this index so now how do we execute this query give me your query in plain english or your execution plan in plain english as

**1:12** · to how you go about executing this we can't just use the black copy because it doesn't have all the data that we need we have to decide which copy we're going to use possibly in combination

**1:31** · let's see what y'all have here for your execution plan it's all right so we got a few folks oh no people are giving different answers now good so one possibility is that we could start by grabbing this non-clustered index on date and then seek into july

**1:54** · the 1st of 2014 we could write down the id and last access date of all the rows that match we don't have to sort it because it's already sorted up in that index but we're going to write down the id and last access date then for every

**2:13** · id that we find then we could go grab the white pages put them in the right order grab the white pages and look up their id because this is turned sorted by id then i'm going to be able to have these in order of id as well sometimes that happens this is an example of one of those times

**2:38** · where sql server started with this index seek and then for every row that it found it did a key lookup okay confession time here remember back earlier when i created the index i i kind of sort of lied to you

### That's why SQL includes the key

**2:58** · and i was hoping that no one would catch that fortunately that was true because none of you are all that bright especially at this hour of the morning in here when i created the index i said that i created the index on last access date and id but you know what i didn't have to i didn't have to include the id oh see

**3:20** · look at that i can cover half of them right there on the screen can also start dancing like the talking heads i didn't have to include the id i could have just said last access state and sql server will automatically inc include

**3:36** · whatever your clustering key is because sql server has to be able to join from here to here whatever makes a row unique however the data is sorted in that order and we get into more of the differences of that mastering index tuning those columns automatically get included

**3:59** · inside of every non-clustered index that we have so when sql server had to join them together what you can do is you can cover your mouse over or you can hover your mouse over the key lookup part and then hover your

**4:15** · mouse over the output list and this gives you the list of columns that sql server didn't find on here so it had to go look them up over here if these are really small and they're really frequently used it can make sense to change this index's design to include

**4:38** · those columns and we'll talk about that more in a little while but another liar in here that you also didn't catch was that in my where clause here in order to get that execution plan i had to use the word the the year 3014

**5:00** · i had to use the year 3014 and you see how tiny these little arrows were because sql server believes that if there aren't that many rows that match then it will do this execution plan but if there are a lot of rows that match like in our real query for 2014

**5:20** · then this happens sql server says screw it i don't have the time to do all this back and forth key lookup stuff i'm just simply going to scan the entire table and then sort all of the rows that match because when you have an index even when it's kind of close to what you're looking for if you ask for one single column that is not inside this index

**5:50** · and sql server has to start doing this jumping back and forth thing there's going to really rapidly approach a tipping point where it's more efficient for sql server to just scan the entire table once to get the data that you want out to illustrate the decision that sql server has to make what i'm going to do is i'm going to do the unhinted query that lets sql server choose and then i'm going to do a hinted version of the query that says trust me sql server listen i want you to use the index on id

**6:22** · here's what their execution plans look like the first one when sql server chose sql server chose the one with the table scan then in the one that was hinted sql server seeked into here but it found 148 000 rows so it had to do 148 000 of these keys lookups

**6:44** · which end up ends up increasing the cost to see what that cost is you're going to hover your mouse over the select operation that had the clustered index one on it the one that sql server chose and look at his estimated subtree cost it cost about 13 query bucks

**7:04** · whereas when i forced sql server and i said listen i want you to do the one with the key lookup his key lookup cost or the overall cost of the plan was like 48 query bucks a table scan is a fixed known cost

**7:23** · this doesn't matter whether this query returns one row or a million rows if i'm going to scan the clustered index to find them this is a fixed cost operation this is not because if i do an index seek followed by key lookups sure the initial seek is

**7:41** · cheap but then this is where i really wish that execution plans were three-dimensional when we look at an execution plan and we just see a key lookup we often assume that it was only done one time when in reality it was done once for every single row that we came across

**8:02** · in the index seek the higher this number becomes the worse this is as opposed to a table scan this part here is the part that i really wish was three-dimensional i wish that these key lookups popped off the page based on the number of rows that we were pulling back the more key lookups that we did the worse that this cost would become oh i i don't envy sql server at all sql

**8:33** · server has to figure all of this out before your query even starts sql server has to like hold an envelope to its forehead think about your query and go i bet that i'm going to find this many rows and they're going to be in this location in the table and it's going to take me this much cpu power he's

**8:55** · guessing he's guessing at the design out for how this execution plan is going to work and then he's going to start executing it but there is a real hard firm wall in between these two phases the design finishes and then the designer walks away and execution starts sql server doesn't go

**9:20** · back and come up with a brand new plan halfway through it's one of the things that oracle can do again why it costs an arm and a leg and an arm and a leg and a leg and a leg and an arm and an arm sql server has to make all these decisions before the query even starts he has to build a plan he has to sum up the cost of all of the operators in the plan to get an estimated subtree cost total in query

**9:47** · box and then he thinks about is there another possible execution plan for this same query if so let's go back to step one and we'll try to build that too and if we repeat this several times in a row we can go and find the lowest cost execution plan and that's the plan that we're going to run with i'm simplifying the daylights out of this there are entire books written

**10:15** · about that last slide that i just covered inside there places that talk about where sql servers wrong about the cost where it underestimates where it overestimates sometimes he thinks that the query cost is so cheap he just quits early and goes and starts day drinking rather than spend additional time building plans and one of the things that i find really intriguing about this

**10:41** · is that sql server doesn't know whether you're going to build an execution plan one time and then run it one time or if you're going to run the same query a million times in a row sql server just estimates the plan once and calls it quits

**11:01** · i really wish in an ideal world that after a query gets executed a few times sql server goes oh right you're serious about this you're actually going to run this a few times why don't i take a few milliseconds to go back and review to see whether my estimates were actually any good and whether or not i need to go back and revise that plan sql server doesn't do that we have query store in sql server that will store past versions of a plan i

**11:33** · wish that sql server would go back over time and go you know what let's take the different parts of these execution plans let's see if we can frankenstein something together see if we can take bits and pieces from different plans that'll give us one good execution plan that works well for more people that is not how it works at all it gets sketched out once and it's ride or die we get that execution plan whether we're going to run that query once or whether we're going to run it 20 million times

**12:04** · so sql server has to figure out how it's going to build these and one of the tools that it uses along that way are statistics for every index that you create sql server creates a statistic with a matching name for example i created our index on last access data and id sql server automatically created a statistic on last access date and id

### The engine uses statistics.

**12:33** · statistics help sql server understand which indexes make the most sense how much cpu power it should allocate whether it should do seeks or scans on that particular index and way much more

**12:48** · now i'm about to show you a command i don't want you to think that i use this command very often i don't i really only use it in training it's fairly rare that i need to use it during production purposes but knowing that this command exists will help influence the way that you think about query tuning this command is dbcc show statistics and

**13:20** · it shows you what sql server knows about that index or that statistic in this case i've run it on the users table to say show me everything that you know about my index on last access data and id sql services right well in this

**13:39** · object there are about a quarter million rows i sampled all of them sql server is like a political pollster the larger that your table becomes the more he has to resort to just randomly sampling parts of the table to paint a picture of what the overall data is going to look like

**13:58** · it says in there this this particular object it's based on last access date and then id then here a whole bunch of buckets to describe the data sql server's trying to paint a picture of what's inside this object to get a rough idea of how many rows match different values but this statistic isn't very big because this statistic only has one 8k page worth of metadata

**14:30** · of how large your table is so in this case i might have millions or billions of rows but the statistic only has one 8k page to give sql server as much data as he can about that particular object

**14:50** · this particular object is based on last access date so you see a bunch of range high keys there that are all dates other data types get stats too as well for example integers and strings display name indexes here showing you what statistics look like how sql server uses

### Other data types get stats, too

**15:09** · those is that he uses those based on your where clause and other things inside your query too here for example sql server says well i need to go figure out how many rows have a last access date greater than july the first of 2014.

**15:28** · so sql server has statistics on this object because we have an index on it sql server goes and pops open the statistics on last access date and he scrolls down he's got an old mouse with a scroll wheel look sql server was built back in the late 1990s it's a miracle he doesn't have a trackpad track you know the trackball things that spin around there he scrolls down to july the first of 2014. now there is not a bucket dedicated to july the 1st of 2014 sql

### It reads stats on LastAccessDate

**15:58** · server has to figure out that some of the rows in this bucket are going to match and then as he scrolls down further he adds up the contents of the rest of the buckets as well surly dev says hey i use a trackball i sweat you're quite special certainly dev we would both agree on that and that's where our estimates come from when you hover your mouse over parts of the of the class here sql server says well i estimated

**16:28** · that about 148 408 rows would come back in actuality 148 328 rows came back that is freaking phenomenal i absolutely

**16:43** · love when your query is easy to understand when a human being can look at it and come up with a pretty good guess of what percentage of the table is going to match and when we have statistics on that column and the statistics are up to date

**17:06** · and we're not doing any kind of fancy pants calculations on it sql server estimates on statistics are fantastic it does a really really good job but you're here of course because performance sometimes goes wrong

**17:23** · the statistics might be outdated it's up to you to keep statistics up to date the statistics may be inaccurately sampled your object may have gotten way too large and sql server chose a poor random sampling to figure out more about statistics contents and maintenance doug lane has a fantastic class that's available out on our youtube channel and it's totally free if you go to brentosar.com go slash

**17:48** · stats class there's hours worth of material just covering this one topic alone and finally our query may not be as easy to understand as this and i'm going to take a break for questions and then i'll come back to that and keep going so so far james asks a question james says does sql server recost the execution plans

**18:10** · after statistics are updated yes when you update statistics sql server will throw away execution plans the next time that they're run when they depend on those kinds of stats and build new execution plans with its most recently updated data about those statistics

**18:29** · tim bolero says how about optimize for ad hoc does that plan is this is it the same as the stub that's outside of the scope of this i do cover that mastering server tuning though says following on from that statistics question does partitioning make a difference yes but not in a good way i talk about

**18:49** · that in the mastering index tuning class you would think that you'd get much more detailed statistics in reality you do not you still only get 200 buckets it's just that sql server builds its own statistics per partition so that it can use those to reassemble the frankenstein's monster of the one main stat that queries actually use

**19:11** · pavan says so an operator with a search like a leading percent sign doesn't use stats it does in fact and you can see that if you try different combinations of where clauses so like try it with like percent a a and then try it with percent aaaaaa and you're going to get different estimates on that it's not necessarily accurate it does use statistics it's just not necessarily very accurate

**19:37** · and then timbalero also asks would it make sense to split humongous tables into smaller ones to have more precise stats inside of them generally speaking no because changing a one table up into a whole bunch of child tables makes it so much harder to maintain you have to change so many other things about your application like the way that you load data in theory you can use views and then

**20:01** · insert update and delete directly into the view and then the view will break out all of the child objects but then just know that it's also going to be harder to deal with indexing when the stuff that you want is scattered across several of those tables prod says if statistics are outdated the query output can also be wrong how does sql server identify that there's a problem in the stats and how does it correct it you would love that statistics class that i linked to those answers are in that totally free statistics class

**20:32** · adam says is there any downside or cost to keeping the stats up to date all the time through maintenance plans yes for every statistic that you have sql server scans that object

**20:48** · so if i have a big table with 10 stats on it sql server is going to scan that big table 10 times that in the business is what we call bad because it can end up taking a really long time to do all of those scans the other problem with that is every time that you do statistics updates your

**21:11** · plans are going to get flushed from memory and then you run into a problem called parameter sniffing where sql servers execution plans are very unpredictable they change all the time based on whatever parameter happens to get sniffed first adam says you can sample it though right

**21:28** · yes that doesn't mean that they're accurate though you just said you wanted to keep them updated all the time and now you're saying sampling so what i just heard you say i know you didn't mean to say this but here's what you said i would like to keep my statistics accurate by randomly picking which rows i choose all the time that is an accurate that is inaccurate all right so now let's come back over to the slides

**22:01** · and now when i right before we started taking questions i said our query may not be as easy to understand as this let's explore what that means here are two ways to write the same query this isn't the same query we were just working with i have tweaked it just a little that where clause says find me all the people whose last access date is in july of 2014.

**22:35** · this one says the same exact both of these say the same thing to you and i and both of them produce exactly the same number of rows but check out their execution plans both of these output 728 rows but their execution plans are

**23:03** · completely different the one on the top where i clearly said where last access date is greater than this number and is less than this number sql server goes right so what i'm going to be able to do is i'm going to be able to seek to write here read all the rows out and then bail out right here sql server estimated 700 rows were going to come back that estimate comes from the combination of our clear

**23:34** · easy to understand where clause and the statistics on that column 728 versus 700 rows is a pretty doggone good estimate but the other one not quite as much when we use these functions in the where clause sql services well i i kind of know what percentage of my data matches 2014 and i kind of know what percentage

**24:03** · matches july i'm going to guess that it's about 1774 rows that is not correct it seems close if you and i were doing the guesses it seems close but if i go back and hey

**24:20** · over in slack let's stop answering each other's questions i see a couple of y'all answering questions let's not do that because you don't want me to pull your pants down in public again stop there let people ask questions but i wouldn't answer someone else's questions especially if you're not sure as much as i'd like to see your pants this morning i'd like to see your pants not what's underneath them so here sql server estimated that 1774 rows were going to come back when in reality 728 rows came back

**24:49** · that's off by like 2x now both of them actually only produce 728 rows but because this guy's estimate was accurate he used the index sql server says i think that only 700 rows are going to come back it's pretty efficient to go do 700 key lookups this one because his number of estimated rows was higher says oh my gosh 1700 rows

**25:15** · that's a lot i better just ignore that key look up not do all these back and forth key lookups i'm going to skip the index altogether another difference between them is that that top one because he used the index he didn't need to sort by date because my non-clustered index here on last access date is already sorted by last access date not true for the bottom half because he

### Another plan difference

**25:42** · decided to ignore the date index he had to do the table scan not only does he read more data but he also has to sort the data as well to understand the cost of this in reality we'll go turn on set statistics io and statistics time on so that we can

**26:04** · see the number of 8k pages that these two queries read and the amount of cpu work that they did let's compare between the two the one on the left had the where clause with specific dates in it the one on the right used the functions for year and month this one read about two thousand pages this one read about eight thousand pages more equals worse this one didn't use any cpu time because

**26:34** · he didn't have to do the sort this one did use cpu time because he had to do the sort that's worse query duration this one took 78 milliseconds this one took 116 milliseconds because he had to read more data and because he had to do the sort that's worse too

**26:58** · technically these two queries do the same thing in terms of what we think they should do but that doesn't mean that sql server is going to execute them the same way

**27:14** · this is heartbreaking for developers who go but it should produce the same thing yes it should just like all of your own codes should be flawless and bug free but in reality microsoft tunes a lot for really clear and easy to understand queries and the more shortcuts that you take so to sql server

**27:38** · now one of you said phillip said over in twitch they said yes the problem with this is that it's non-sergeable the problem with saying things in public is that sometimes you're wrong this could use the index let's take year and month if i take year and month here and i let sql server choose versus i shove the index in its face and i go here listen dummy go actually use the index sql server can use that index

**28:10** · here are the two execution plans when sql server chose to scan the table yes the estimates are incorrect but we're going to ignore that for a second then look at this if i force the index sql server can use it his estimates are wrong but it goes faster this query where sql server chose the index and did a table scan versus where i forced the index and i made sql server use it this does less reads it does less

### The estimates are still wrong...

**28:43** · cpu time because there's no sorting required it does less time on the clock this index is better in every single way why didn't sql server choose it to understand why you're going to hover your mouse over the select and you're going to look at the estimated cost in query bucks the top one when we did a table scan that cost about 5.80 query cents the bottom one when we

### Look at the query costs.

**29:12** · did the index seek followed by a key lookup that cost six query bucks and a dime this query is more expensive because the plan is based on the estimated number of rows

**29:32** · that sql server thinks is going to come back if 1775 rows actually came back then yes sql server would be right the table scan would be faster but any time you see costs in queries anytime that you see costs in queries those are worthless for gauging actual performance

**30:01** · i start with estimated subtree costs inside here because i want you to understand how sql server makes decisions but what you need to know is that those decisions are made before your query takes flight and they are not revisited later query costs are not updated after your

**30:22** · query finish the only time that they're calculated is before your query starts so they're all based on these estimates which may not even be correct sql server picked the wrong plan because he just didn't understand enough about

**30:40** · exactly how many rows were going to come back the easier that you can make your queries to understand the easier that a human being can sit down and read your queries and come up with a pretty good guess of what's going to happen the more likely it is that you're going to get the plan that you want using the indexes that you want in the fastest amount of time but the more shortcuts you start to take

**31:06** · if you hand your query to a human being and the human being's like oh i'm going to need an irish coffee before i can digest this then you're probably going to get a worse execution plan so what we learned so far in this part of the lecture was that a key lookup means that a query wanted to use find my

**31:27** · little index page query started by wanting to use a non-clustered index but that non-clustered index didn't have all of the columns that we wanted so we had to go back and look up its key over in the clustered index to get the additional columns when sql server has to choose in between a clustered index scan versus just doing a whole bunch of key lookups sql server tries to calculate a tipping point where if enough rows come back then it doesn't

**31:55** · make sense to do this back and forth key lookup thing because the key lookups cost is variable based on the number of rows that are going to come back eventually if enough rows come back and we do so many of these back and forth key lookups sql server says screw it i think it's going to be better off to just scan the entire table it's hard to predict that tipping point you can't do it with simple calculations because like we saw inside here even

**32:24** · 1774 rows out of a table with a quarter million rows is enough to hit a tipping point under the right circumstances to figure out which plan makes the most sense sql server does cost-based optimization it costs out all of these guestimated query plans before your query plan takes flight and then chooses the cheapest one in order to run it

**32:47** · the simpler that your syntax is the more likely that you're going to get accurate query costs and then also you're going to get a query that performs the way that you want it to it's time for another bio break but in the next module in the last module we're going to talk about how included columns on indexes start to mitigate some of these problems why they're not as good as you might have read about on the internet how to decide when to use columns inside your includes and then why key column order is so important in

**33:17** · your indexes let's take our last bio break five minute bio break and then we'll go dive into includes see you in five minutes