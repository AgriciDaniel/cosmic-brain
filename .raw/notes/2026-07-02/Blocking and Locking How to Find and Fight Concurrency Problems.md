---
title: "Blocking and Locking: How to Find and Fight Concurrency Problems"
source: "https://www.youtube.com/watch?v=EqfAPZGKifA"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2019-01-24
created: 2026-07-02
description: "Brent's live class at SQLDay Poland on SQL Server blocking, locking, and indexing."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=EqfAPZGKifA)

Brent's live class at SQLDay Poland on SQL Server blocking, locking, and indexing.

## Transcript

**0:00** · so in this session I'm going to be talking about how to find and fight blocking issues my name's Brent Azhar I'm a Microsoft Certified Master which just means I've made a whole lot of really expensive mistakes with other people's servers and now I get to teach you how to avoid some of those same mistakes all I do is performance tuning

**0:22** · all day long people call me in and say you have like three days to fix a bunch of performance emergencies so I'm very used to troubleshooting blocking problems live in production I've done all kinds of free scripts out there to help folks SP blitz as people it's first all kinds of things to make your job easier everything that I'm gonna talk about today all the scripts that I'm gonna use how to get the stack overflow database is all up at Brent Ozark comm slash go slash lock I actually have a three hour

**0:55** · version of this session because there's so much that I want to go into so there's way more resources up there at slash go slash lock I'll show that URL down at the end later as well there's two things that you can run into with locks if someone takes out a lock and they're all alone on the development server it doesn't matter you can take out locks all day every day and it doesn't slow anyone down you run into

**1:27** · problems where you want to lock that someone else already has concurrency is the issue that we run into that causes both blocking weights and deadlocks locking is one of those issues that never shows up in the development server because we're working by ourselves but when we go deploy an app out into production that's when you run into lock weights and concurrency issues and there's two different ways that you can see blocking pop-up and sequel server in

**1:59** · the first way if locking if Larry just takes out a lock it doesn't matter but if Larry takes out a lock and Sara wants it if Sarah wants a lock that Larry already has sequel server has no concept of a lock time out by default sequel server will let Sarah wait forever the symptom

### Concurrency challenges

**2:26** · of this is that Sarah gets really pissed off Sarah's queries are just taking forever in order to run this is when your phone rings thank you you are an angel this is when your phone rings where people are really frustrated that the application feels like it's taking forever to open screens this is where performance issues

**2:51** · usually start the second way that you can run into it the bottom set down here deadlocks if Larry takes out some locks and then Sarah takes out some locks and then they both want locks that each other have it's like what we call a Mexican standoff where multiple people are pointing guns at each other and no one is able to make any progress forward every five seconds sequel server wakes

**3:24** · up and checks for this every five seconds sequel server looks for Mexican standoffs and whenever it sees them it simply draws its own gun and puts a bullet in whatever query would be the easiest to rollback now this is going to

**3:45** · kind of sound backwards but users almost never complain about dead locks in a mature application usually they complain really early on when we first find deadlock issues but once the application is big and it's scale you don't get people calling in about deadlock problems you get people calling in about blocking problems usually when we see

**4:11** · dead locks its application queries like service queries that are running all the time in the background and they run into a deadlock they simply fail and then the application tries it again later I'm gonna sound kind of weird but I don't really care about deadlocks it's the developers job to build in a retry in their application this is the

**4:38** · point where developers start throwing things at me and saying that I suck I used to be a developer and I know how hard that is but the thing is both of these have exactly the same solution in order to keep this to just one hour I'm not gonna demo deadlocks I'm only gonna demo locking but the solutions are

**4:59** · exactly the same even though the symptoms may not look the same when I'm working on it I'm gonna give you two ways to fix this one is to get the right number of indexes and I'm gonna show you what the right number of indexes is second is to use the right isolation level for your application and I'll talk about what that is as well for the first

### 2 ways to fix blocking & deadlocks

**5:23** · one for right sizing indexes I'm gonna use the stack overflow database stackoverflow.com how many of us have gotten our job saved because someone else did the work for us on stackoverflow.com yeah Stack Overflow is where you post questions and someone else does all the hard work and then you copy paste the code and put it directly into your application I know because when I'm

**5:47** · troubleshooting people's code one of the first things I do is I copy paste it into Google and I see the answer that you stole it from I can see where you took your code at and I'm not just talking about developers VBA's do the same thing I love the stack overflow database it's

**6:05** · totally open source it's Creative Commons anyone can download it and use it for demos and it's so much better than adventure works I never want to see another bicycle store demo again as long as I live that database sucks the company went out of business if you look at the sales history tables the way a real user would look at it you'll see that adventureworks is selling bicycles for $0.99

**6:35** · I see why they went out of business now stack overflows demo database is really simple it's only got a handful of tables in it it's really easy to understand and in here I'm only gonna use one table I'm

**6:51** · gonna use the users table which has exactly what you think it has every user who's ever logged in left a comment left a question at Stack Overflow the primary key on the users table is an ID it's an identity an integer starts at one and goes up to a bajillion an in sequel server we like to say that the clustered index has all of the fields on it it's a

**7:19** · bunch of 8k pages that I like to visualize as actual pieces of paper when I teach smaller groups I actually print out the clustered index of the users table only the first few pages and here's what it looks like down the left-hand side you see the ID field starts at one and goes up to however many then we have reputation creation date display name last access

**7:52** · date where the person lives their location their age and their about me field about me field is where you start to learn that I stretched the truth a little bit I'll tell you that the clustered index has everything on it and that's kind of true but it Stack Overflow the about me is an n ver care max we let you put whatever you want inside the about me field that data actually gets stored on other 8k pages

**8:25** · depending on how large it is that off row data can be really expensive when sequel server has to go look up those big and ver care max ver care max you'll hear different presenters say ver care and n ver care differently some of them say varchar' I like to say ver care

**8:46** · because I'm a caring guy I here about my data why would you save air you want to burn your data I've worked with data like that but I don't really want to think that way these 8k pages these literal pieces of

**9:01** · paper are going to be the only copy of the users table that I have to begin with I want you to visualize having a stack of these in front of you that you're gonna be working with I'm gonna run queries on the database but I want you to understand that when I'm searching for a user by ID I can seek directly into that user but

**9:25** · what if I ask for say users who'd access the system on a certain date what if I was saying where last access date equals a particular number OOP and we'll you'll also see that this thing is kind of janky today last access date equals a certain number you're gonna have to rip through all of these pages in order to

**9:50** · find the people who access the system on a certain date sequel server has no magic tricks if you ask for something and there's no index on it it rolls up its sleeves and scans the whole entire

**10:05** · table and I'll show you what I mean by that what I'm gonna do is I'm gonna start by running a few queries now what I'm showing you I'm doing in sequel server management studio 2016 everything I'm going to talk about is exactly the same all the way back to 2000 nothing is new in here inside this over on the

**10:29** · left-hand side here you'll notice I also have a stored procedure to drop my indexes because why wouldn't you that's just fun so over on the left hand side I'm gonna start by saying tell me how many people access the system on my

**10:46** · birthday wasn't born in 2013 obviously I look good but not quite that good now so there were thirteen hundred and thirty people who access the system on my birthday in order to run that query

**11:05** · how did sequel server execute it when I only have the clustered index of the table sequel server only has one option it has to scan the entire clustered

**11:21** · index will make more changes to the table later but that's all we're gonna start with we're gonna assume that how many of us in here are developers how many of us in here are DBAs so it's clearly biased towards developers so what I'm gonna say is let's pretend you have a really crappy DBA who doesn't do anything in terms of index tuning for those of you who are DBAs you can say pretend you have really crappy developers who never build the indexes for you if I only have this copy of the

**11:53** · table then when I want to do something like this what is my execution plan going to look like think about as a human being with a whole stack of users papers in front of you how are you going to find the people who access the system on my birthday and update them there's

**12:22** · no rocket science here you're gonna have to read the entire table and as you read that table you're gonna be taking locks on specific rows as you step through them let's execute that query now you'll

**12:40** · notice I was a bad developer I started a transaction and I did not commit it my locks are still being held open I am NOT suggesting this is how you build apps I'm just trying to make time happen really slowly here in reality this would be something like a stored procedure where you have a begin Tran some updates and then some other code I'm just gonna slow down time here for a second see how

**13:11** · many rows were affected and then look at seat servers execution plan how did it go about doing this work well we like to say that execution plans suck they suck the data from right to left across the execution plan so we start by reading over at the far right sequel servers first operation here was to scan the

**13:36** · entire clustered index because that's all I have this is my only copy of the table and as it finds the rows that it's going to update it goes through and updates them now I've only updated thirteen hundred and thirty rows over on the other side over here I have another query and I'm gonna execute that what

**14:05** · I'm saying is go show me everything you know about user 26 837 that's me at Stack Overflow my last access date does not match that filter I have a totally different last access date but this query will wait and wait and wait

**14:27** · forever there is no concept by default of a lock time out in sequel server sequel server we'll just wait patiently until that update finishes why isn't this query moving faster well in order to see it let's use a really cool utility from atom mechanic atom mechanic is an MVP out of the Boston area and he wrote this stored procedure called SP who is active and it shows me what

**15:00** · queries are active on my sequel server right now ordered from oldest to newest the top line is my update statement you'll notice that it says something kind of weird in here it says this set statistics command this is a leftover of me asking for my execution plan the bottom one is my select my select is

**15:25** · waiting my select has been waiting for fifth d two seconds in order to get a lock l ck weights my query wants a lock before it can get started who has that lock well if I scroll

**15:43** · across a little further blocking session ID tells me the person who's blocking me I want more details than that and in order to see more details I'm gonna run SP who is active with get locks equals one the more parameters

**16:03** · that you pass into who is active the longer it takes but if I use that get locks parameter I get this new column over here for locks and when I click on it it gives me a little XML property bag here of all the locks that I have that update query has a lock on the users table he has gotten an exclusive lock

**16:32** · across the entire object that's what that X means and on the key he even knows we only locked thirteen hundred and thirty rows if I look at the keys that I've locked I've only locked 1330 rows but still sequel server said screw it let's just lock the entire table so no selects anywhere on that table can make progress until my update finishes that sucks we

**17:05** · need a better way to go about doing concurrent reads and writes when they talk about locking in sequel server this is what they mean by readers can block writers and writers can block readers by default so how could I fix this if I go

**17:25** · back over to this select statement that's running how could I make this get past that lock with no lock so let's stop it and let's try it again with no lock execute and the data finishes immediately it says Brent's last access date does

**17:49** · not match that birthday filter my birthday is November the 10th and I don't match that but I'm still getting blocked by that update statement is no lock a good idea well there's a couple of problems with that you can see data that was never committed you can see rows twice you can skip rows entirely and your

**18:13** · query can fail with an error could not continue scan with no lock due to data movement I'm gonna say something that you wouldn't think a database professional would say but if you're okay with seeing data twice seeing data not at all having your query fail and seeing data that was never committed then no lock is fine not all your data needs to be

**18:42** · perfect if your Instagram if your Facebook if you're showing cat pictures does it really matter if you show a cat twice or you skip a cat not at all no lock is cool for stuff like that or data warehouses any kind of financial reports

**19:02** · now I know what you're thinking Brent that seems crazy but here's the deal with financial reports your executives are looking at numbers and making bad decisions it doesn't matter what numbers

**19:17** · you give them they're gonna make the wrong decisions anyway you could put random numbers up there and you'd probably be fine it would make their queries finish faster no obviously not if health care is involved financial reports we can't just say no lock everything and call it a day it's not going to work I'm gonna need something else now I'm okay with no lock in some situations it's not so bad but let's pop back out stop oh I wonder if it went

**19:50** · down further oh yeah it did so back over here on my begin tram I'm gonna do a rollback just so that that query never happened and then I'm gonna go do something here that might seem odd I'm gonna create an index the

**20:07** · index that I'm creating here is on last access date that's the field that I'm abusing for my filter to update I'm saying give me another copy of this table sorted by last access date and ID let me show you what that looks like it's also stored on 8k pages just like

**20:32** · our clustered indexed was but on these 8k pages the only thing that's on them is last access date and ID and that's it so when I create this index and I go do

**20:50** · that update statement now when I say update the people who use the system on a certain date sequel server can use this index in order to build the update query watch what happens differently if I go

**21:07** · execute my update query again I'm gonna do a begin Tran and my update it still finishes instantly it always did it never really needed an index but look at what it's doing now now it's saying go do an index seek first use that index that you just created in order to find those thirteen hundred and thirty rows that you're going to update now even

**21:42** · though I've done a begin Tran I've done this begin Tran I'm gonna switch over to the right hand side and I'm gonna execute my select again but I'm gonna take out the no lock and execute BAM it

**21:58** · works why does that work it's not like this query is going to use the end even though I have a separate copy of the table that when I look at that queries execution plan it doesn't use the index it's still using the clustered

**22:19** · index of the table the same thing we were locking earlier but here's the thing when I go back and look at SPG who is active with get locks equals one let's go see what locks our update has now and now they're different now

**22:40** · instead of having an X exclusive lock on the clustered index I only have an intent exclusive lock this query is saying heads-up I'm gonna update a few rows how many rows thirteen hundred and thirty I have an exclusive lock on thirteen hundred and thirty rows but I don't need to lock the whole table yet I might later but I don't now indexes make

**23:15** · updates deletes faster and let you run select queries against the table at the same time it starts to introduce a little dance here back and forth between these indexes indexes aren't just for making select queries go faster they're also for helping concurrency especially

**23:40** · if I start to do stuff like this what if I say over on my select select count star from dbo users go show me how many users access the system on any day in order to accomplish this query I have to read the whole table right no I have to

**24:05** · read a copy of the table but it doesn't matter which copy and sequel server smart enough to scan the narrowest index available in order to accomplish this tab even though I'm not doing a query against last access date sequel server still uses that index because it's the most lightweight copy of the table that we have what if I want to find the

**24:33** · people who access the system on my birthday remember these guys are locked over here these thirteen hundred and thirty rows we're last access date is my birthday over here in the Select query can we count them yes they're rose on

**24:53** · the clustered index are locked but not on the non-clustered so if I want anything like last access date and ID which are both fields that are available on my non-clustered index that query is able to still finish but if I try to get fancy and if I try to add any other field like if I say show me their display name display name is not on the

**25:28** · non-clustered index so this query is blocked this is such an interesting dance in sequel server I want to figure out how many indexes I can add in order to make my select queries go faster but the more indexes that I add I will make my deletes updates and inserts go slower

**25:54** · because sequel server may have to update those indexes every time values in them change there's no good advice out there for how many indexes your table should have so as a general rule I tell people to think about having five or less indexes per table and five or less fields on those

**26:16** · indexes when you have more than five indexes you can at stack overflow for example for a while we have 30 to 40 indexes on some of our biggest tables but it's because we could cache the entire database in RAM and we had all solid-state underneath us you can break a lot of rules when you shovel dot-com money into your hardware for the rest of us five or less indexes

**26:44** · with five or less fields per index is a good starting compromise you might ask Brent where do those numbers come from well it's because I have five fingers on this hand I have five fingers on this other hand if my mother was a mutant we might be talking about Brent's rule of six and six instead of five and five so

**27:06** · we're so far so good I'm able to do some queries I'm able to select what I want off of Brent's individual row and Brent's row works fine even though I have over on this other side locked thirteen hundred and thirty rows of that table let's go find some more people who

**27:29** · access the system on my birthday but instead of twenty thirteen let's go look at 2014 I still haven't committed my transaction my locks are still open I'm just now locking more rows than I had locked before you can see how many rows I've locked there another thirty two hundred rows over on the right-hand side if I go

**28:01** · to do my select my select still works I can still queries Brent's data I can still get everything I want from users as long as I'm not trying to touch any of those locked fields if I say select count star from users I can still scan my entire non-clustered index and get a count out of there if I

**28:31** · go back and look at espy who is active and I run it with get locks equals one now I can see what kinds of locks he has I'm gonna click on the locks column and it shows me that I still only have an intent exclusive lock

**28:49** · on that object and I'm really only locking 4500 whoops go back over here 4500 keys out of the listen you I'll get good at keyboards one of these days I'm locking forty five hundred and sixty-four keys I'm not locking the whole table I'm only locking 4500 rows

**29:12** · let's push our luck a little bit further so we gave people a hundred more XR reputation points in 2014 let's go for 2015 - lets go update the people who access the system on my birthday in 2015 now we've locked more rows and now let's go run Brent's query

**29:37** · again and if I go say select star from users where ID equals twenty six eight thirty seven something has changed I'm snot able to query Brent's row even

**29:53** · though Brent's wrote why am i calling myself a different person I'm not able to query my own row even though my own row isn't one of the ones being changed the reason why if I go look at SP who is active now and I see what locks are being held notice that now my select query is getting blocked and what is he getting blocked by here's the locks that

**30:22** · the update has and it looks different now sequel server stopped counting however many rows were locked before now sequel server says you've locked so many rows screw it I'm just gonna escalate your lock to the entire table you don't have

**30:42** · control over this sequel server manages locks internally that table has five million rows in it five million rows and yet even though I've only locked about 10,000 rows sequel server has still escalated my lock all the way up to a table level lock it has nothing to do with the size of the table it has nothing to do with the horsepower on your server whenever about 5,000

**31:11** · locks are being held on an object that's where sequel server starts promoting some of those locks up to table locks look you keep locking more and more rows I'm just gonna say screw it and have you go lock the entire table instead this is

**31:27** · another one of those interesting things that happens to us in development we build an app and at first everything works fine performance is cool because we're only updating say three four thousand rows in our batches but then we

**31:44** · build bigger jobs we run queries that affect more and more rows our batch jobs affect more and more rows and all of a sudden we start tripping over lock escalation and jumping into table locks when we didn't have to deal with that before indexes won't save me here even

**32:05** · though sequel server knows exactly how many rows are going to get locked it still says screw it I'm going all the way up to a table lock questions on this so far yes is up in the finger it's only

**32:23** · 5,000 that sucks even worse but yeah it's in terms of putting the finger up in the air 5,000 rows is just a ballpark Microsoft says this is one of those things where they say we control this you don't worry your pretty little mind about it we'll take care of lock escalation for you but when you run experiments you can see it hits right at about 5,000 rows yes oh that's a great

**32:52** · question why when I did the index did I put the ID inside that index here's the create index statement I do that because most of the time when I'm presenting it's in America and the audience is not nearly as bright over here in Europe you all understand

**33:13** · that the ID is always included if it's the clustering key in every index I do this just a hammer home to those dumb Americans that this really has the ID inside of it sometimes so why it's so much more popular in Europe right so the sad thing is is I make the same joke about you guys when I'm presenting in America those crazy Europeans the other

**33:41** · thing that's interesting sometimes you'll see in sequel server management studio you'll see the missing index recommendation and it'll say you should include the ID it does that when your query has the ID in the Select statement because sequel server's paranoid that someone could change the clustering key behind you if you need the ID out in

**34:03** · your queries they'll tell you you should create it inside the index I live in a world where no one changes they're clustering indexes on a regular basis so I don't care whether people put the ID in or not is it an actual answer the

**34:20** · question is there a reason yeah is there a reason why I put it in there just to drive home to people you totally don't need it you totally don't have to put it in there you love Europeans really smart yes next question so far more questions so far oh you're one of those bad people

**34:40** · so if you do the update with row lock hint will it hold row locks yes but there's a memory impact to that sequel server uses memory in order to track locks and the more that you use the less is available to cache these eight K data pages so I got to be careful about them I like people who use

**34:59** · this is gonna sound weird I do like people who use tab lock hints in their queries if you know that your ETL job is going to use burn up a whole bunch of rows and you just want to get in and get out fairly quickly that's often faster using tab lock hints what

**35:18** · about update lock usually that's used in select statements where you're going select something and say I reserve the right to update this later I'll show you a better way to do that here in a second what about disabling lock escalation god

**35:34** · bless you usually it's the Americans that want to break all the rules the Americans are like hold my beer watch this um so you can disable lock escalation but then you run into the problem of more memory getting burned up by managing all these rowlocks I don't want that to happen I want sequel server oh you would not believe

**35:54** · the things I've seen it takes so much therapy yes have I seen the situations where people disable lock escalation and then they do five million row ETL jobs and they wonder why their sequel server is screaming in the corner you know crying in shame do I have any proportion

**36:13** · I really like what Microsoft does that if you go over 5,000 rows let's just lock the table and see what happens unless if you're doing nightly warehouse jobs if you do big data loads lock the whole table there's if you want to learn more about this - Michael J Swart is a blogger he's not American he's Canadian so you can trust what he does Michael J swart batching has a great

**36:42** · blog post on what you should do when you're scripting batches now I'm gonna come back to the title just so that you can take pictures or whatever but here's the important part he goes through scientific experiments to try different batch sizes with his workload to find where the sweet spot is is that it a thousand rows 3000 rows 10,000 rows where is it that his jobs perform fastest you can see all of his

**37:14** · work including the script that he uses Michael J Swart take care when scripting batches and it really is different for every workload 5,000 isn't a great answer for stuff like data warehouses more questions so far yes you just want to hear me bash Americans right yeah

**37:37** · what happens if you disable roll lock so that would be pretty bad if you have an OLTP activity where people are doing small insert updates and deletes across individual rows but if you had some reason where you wanted to micromanage locks that way there's a really interesting session at sequel bits I'm gonna search sequel bits thomas kaiser so thomas kaiser he's European again so

**38:06** · you can trust what he says if you search for and this one's a little wide so I got to have it on both sides over on the right-hand side it says preserve presented by Thomas Kaiser at sequel bits Thomas had a scenario where he wanted to reven the pre con yesterday yeah yeah so for the rest of the folks this guy wanted to drive a hundred percent CPU across like 64 or 80 cores

**38:28** · he could not have any lock weights any IO weights he had super blazing fast storage tons of RAM he worked for Microsoft at the time was doing performance tuning for a customer so if you want to see what it's like to really get a hundred percent CPU across say 64 cores this is a spectacular session to watch the videos on there I would just say that it's kind of like a car crash it's fun to watch Russian dashcam videos

**38:59** · on YouTube it's just that you probably don't want to be involved in this don't use those techniques unless you're trying to achieve those results I don't know a lot of people who want a hundred percent CPU use most people seem to be allergic to that alright so next to come bring in this back home let's go back over here do to do to do to do to do to do to do jump down here we go so the

**39:29** · take away out of that first part there and it makes it so I'm gonna have 10 parts in this session the takeaways out of the first part their indexes aren't just for selects they're also for helping deletes updates and inserts go faster I'm an aim generally for around 5 indexes per table around five fields or less per index this is not a gospel rule and before you go tuning any specifics whether they're queries or indexes go use the totally free open source SP blitz index this is

**40:02** · a hundred percent open source MIT licensed you can use it with clients you can make changes if you like you don't have to report your changes back into anyone else and we wrote that because we have a really frustrating time doing index tuning too so it tells you when you have too many indexes when you have blocking weights that are happening when you have desperately-needed indexes there's just one tip I'm going to give you because I know just like Americans

**40:31** · you're not gonna read the documentation because no one ever reads the documentation if you look at create index hints that come out of sequel server management studio and execution plans and SP blitz index it'll say create index and it'll give you a list of fields those are not in order it

**40:53** · looks like they are but they are just a comma delimited list of fields you should consider ordering the recommendations are often in the wrong order and you'll want to mix them around in different orders to figure out which one's the fastest for you flat out says that and books online when it talks about the missing index DMVs but if you're anything like me you don't read the documentation until you've been burned a few times so the second part of

**41:24** · this is isolation levels by default sequel server uses pessimistic locking which means readers can block writers and writers can block readers which is what we just saw yes you can use the no

### SQL Server is pessimistic by default

**41:41** · lock hint which just does dirty reads but that's not usually good enough for financial applications healthcare and people like Europeans who want accurate reports as opposed to us American we have alternative facts inside our database systems so let's say that our data consists of three marbles we have a white marble and two black marbles I'm gonna call this marble ID number one marble ID number two and marble ID number three if I start an

### You've got 3 marbles

**42:15** · update statement and I say go change the marble number two and change his color from black to Hawaii what sequel server is gonna do is go take out a lock on marble ID number two this is just a roll lock it's only taking out a row lock on marble ID number two but if I now run a select query and if I now say go show me the number of black marbles that select is

**42:46** · going to get blocked the Select can't read marble ID number two until the update finishes he's blocked it takes some time but after the update finishes then the Select finishes and he sees that the marble black count is one now I

### The update finishes and releases its locks

**43:11** · need to be specific that Select answer is true for the moment in time that the query finished it's not true as of the moment in time when the query started if

**43:29** · I jump back just a little bit earlier that select when he first got started there were two black marbles the update hadn't committed yet but because of the default isolation level in sequel server you see answers that are correct as of when your query finishes but there's

**43:50** · another option optimistic locking this is not set up by default there's a couple of different ways you can turn this on we'll talk about how you go about turning it on with optimistic locking I still have two black marbles I still issue my update statement and I still take out a lock that part doesn't change but when my select comes in the Select

### You can choose optimistic locking

**44:19** · says or before thee is before the Select comes in sequel server engine automatically whenever you do inserts updates or deletes the sequel server engine copies the original version of your data into temp dB I like to call temp DB sequel servers

**44:39** · public toilet because there's so much dirty nasty disgusting things happening inside there it's not just people creating temp tables it's the sequel server engine doing things like row versioning so sequel server as soon as I turn on optimistic locking starts writing copies of your data into the toilet so that now when the Select comes in the Select goes to look at this locked row and says well I can't read

### It follows the version pointer!

**45:10** · this someone's working on it right now but I can go grab the original version out of the toilet and this is where the analogy breaks down because the copy of your data in the toilet is actually clean whatever so I'm gonna go get my select data out of the toilet and my select data finishes but it's true as of when my query started that update may

### They complete at the same time

**45:41** · end up committing at the same time so I may see a select that shows one black marble even though there were maybe two black marbles when I started this query mixing things around a little bit this isn't a show stopper of a problem most folks would much rather do this than be blocked forever waiting for that update to finish so here's the differences

**46:10** · between those two with pessimistic locking by default I saw true version as of when Mike where he finished with optimistic locking I saw a true version as of when my query started now there's two ways that I can

### Two ways to implement

**46:26** · turn this on and seek server and they're really confusing and I've got much more details about this over on the blog both of these ways of turning it on start writing my data into the toilet as soon as they happen but with the right hand side with snapshot isolation the data is in the toilet

**46:48** · there but you have to ask for it if you want it you have to say at the beginning of your transaction set transaction isolation level snapshot this lets whatever selects you want to start getting their data out of the toilet the one over on the left hand side this turns on everyone's isolation level to

**47:12** · read committed snapshot by default so everyone starts getting their data out of the toilet right away whether they asked for it or not questions about those to hit the hit the blog for that

**47:31** · because we go into details on examples for that I hate this I want to go into like two hours of and another thing that's really cool so this is a common feature now that the people who are using this as your sequel DB uses it and you can't turn it off it's on by default has always been on by default it just simply works I'm a strong believer that anyone who starts a brand new application in the year 2017 should be

**48:00** · using this because it just makes your blocking problems mostly go away not perfect but most of the time always on availability groups when you read from a secondary this is the exact mechanism that sequel servers using to update the data underneath it while you query it although the funny part is it doesn't look like that feature is turned on to you the DMV's show that it's not turned on but sequel servers hidden using it under the covers Oracle and Postgres used this

**48:34** · they call it multi-version concurrency control or MVCC this is one of the since they were smoking us on benchmarks for the longest time because a lot of benchmarks out there like the TPCC benchmarks will tell you you can only

**48:50** · use settings that are turned on this way by default you're not allowed to change certain kinds of database level settings work will saw that and they wanted to win benchmarks so what did they do they just turned on optimistic locking by default and they went screw you sequel server we win I like how Microsoft doesn't change the defaults on you because this can break your code you can run into race conditions and we've got an example of one over on the blog if you use CDC or

**49:18** · change tracking Microsoft actually recommends that you should turn these to this feature on by default because with CDC and change tracking sequel servers constantly trying to read from exactly the same data that you're changing all of the time our CSI the default of switching

**49:37** · everyone's isolation level over to read committed snapshot has a horrible drawback around race conditions that can surprise people I'll refer you to the blog on that one but if you're dealing with anybody's third party code if you have an app that was designed to work for Oracle and Postgres and sequel server then it already is completely fine with multi-version concurrency control because those other databases have it on by default already if you

**50:08** · built an application that works across both sequel server and oracle you can safely turn on our CSI and not worry about it at all but if you're worried about any changes to your application you can throw the switch on snapshot isolation and just let your report query start to hammer it how many of our users

**50:30** · tell us that they want to run reports straight out of production they don't want to build a data warehouse they just want to query everything live they also can't wait a single second in order to get their reporting data I need to see it up to the exact moment in time and they write the world's glia Squier 'yes it's some with Excel he's like I have power bi now

**50:55** · nothing can stop me I should be hooked up to production and you're tired of his queries blocking people who are trying to put sales into the database snapshot isolation is perfect because then you can have just that guy turn on snapshot isolation in his reports and he magically stops blocking other people and other people magically stop blocking him so what we talked about through here

**51:23** · first off you want to have enough indexes that it makes your queries go fast but not so many indexes that it makes your query go slow this is the magic role of 5 &amp; 5 you want to use the right isolation level for your apps needs if you're building a new app in the year 2017 check out our CSI it's

**51:46** · freaking amazing and makes a lot of blocking problems go away and because this is something that comes up all the time we have easily 50 different blog posts on there on brenda's are.com slash go slash lock where we show you how to analyze deadlocks do weight stats analysis do index analysis to find exactly the right mix of indexes for you now open questions what questions do you guys have from out of what we covered who wants to go first yes no no do I

**52:21** · know any drawbacks so there's one edge case drawback around a race condition and because we have a few minutes I'm gonna show it to you and because I like Eva who asked the question I probably didn't pronounce his name right but that's you know it was correct no get out of here I should say it a few times now make sure I get it right it's better

**52:48** · Yui you oh that's a very American kind of thing when I hear Yui I immediately think Huey Lewis and the news yeah yeah or turn aue they always think of that too so let's say we have a really bad stored procedure I'm not saying this design is right this design is awful but let's say we have a stored procedure and the first thing that this stored procedure does is start a transaction it goes and finds the person

### A tale of a two-part transaction

**53:17** · in our company who has the least tickets assigned to them and is alphabetically first and it puts that in a variable then it turns around and updates that helpdesk person and the ticket to assign it to them under the default with

**53:37** · pessimistic locking this stored procedure fires off it looks at who's the first helpdesk person available and it sees that Brent doesn't have any tickets available or doesn't have any tickets assigned yet so it does this select and the Select works finds Brent and then starts updating

**53:58** · Brent to give him a ticket when another server kicks off and does this same exact process the Select is blocked because remember in pessimistic locking readers can block writers and writers can block readers so the Select query doesn't even get a chance to start it

**54:21** · patiently waits until the update is finished and after the update is finished it goes and finds the next person who's of alphabetically available Tara in this case things are a little bit different when I start with our CSI the stored procedure still starts the

### The first update finishes

**54:42** · Select still runs and the update starts the update takes out a lock just as it always did but remember an original copy of my row in the helpdesk table is now over in temp dB when the second stored procedure starts the second procedure starts by doing a select he can select

**55:08** · so he can select the for my row out of temp TB and see that I don't have any tickets assigned and then his update starts so the end result of this is that now Brent has two tickets and Terra does not have any you could argue that no

**55:31** · code should be written this way no code should first do a select and dump data into a variable and then do updates based on that variable you should also argue that I should be a millionaire and have a Ferrari like OVA but unfortunately I do not so in this

**55:50** · world RCS I is a little bit risky that's the big risk on RCS I the other one people seem to worry about all the time is tempting me I said suddenly now your inserts updates and deletes are gonna start writing data into temp DP this has two bad impacts one it starts putting

**56:09** · temp TB under more load if you have a crappy underpowered server VMs are notorious for this because the temp DB lives out on the sand if you have an underpowered server you can run into problems then with temp TB slowing down your inserts updates and deletes the second concern is capacity what happens

**56:31** · if Dan the develop Dan the DBA since there's more developers in here Dan the DBA goes to his workstation does an update locks his workstation forgets to commit and goes out to start drinking on Friday night if he leaves his

**56:51** · transaction open now I got a couple of different problems sure he left a lot behind but temp a B is growing like crazy now all these inserts updates and deletes are getting shoveled into temte B so in both of those cases I don't see

**57:06** · them as a big deal often these days cuz solid-state drives for temp TB have gotten really cheap you can get a one terabyte solid-state drive for like two hundred and fifty dollars u.s. but it's just something I have to warn people about because when you in the environment with a crappy temp DB that can be a surprise monitoring tools are wonderful for this everybody's monitoring tools no matter who you buy will warn you about temp DB filling up and responding slower because these features have been around for more than a decade no that's a great question

**57:53** · you heard this is gonna be kind of tricky index is going to temp db2 so that yeah you will use indexes over in temp TB your queries will still go fast yeah next question no you guys are dumbfounded how many of you now want to go back and fix indexes or change where are the isolation levels no not yeah a few of you okay cool well thanks for hanging out with me this morning have fun a sequel day and I will see you guys later around the conference adios \[Applause\]