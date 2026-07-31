---
title: "Watch Brent Tune Queries - SQLSaturday Oslo"
source: "https://www.youtube.com/watch?v=IVqvwNlwXuI"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-08-29
created: 2026-07-02
description: "Ever wonder somebody else does it? Watch as I take a shot at a query from Stack Overflow. Database, query, & resources: https://www.brentozar.com/sql/watch-brent-tune-queries/"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=IVqvwNlwXuI)

Ever wonder somebody else does it? Watch as I take a shot at a query from Stack Overflow. Database, query, & resources: https://www.brentozar.com/sql/watch-brent-tune-queries/

## Transcript

### Introduction

**0:00** · always like to three two one so hi folks my name is brent ozar and i'm going to be talking about in this session watch brent tune queries some sessions there you kind of have to explain the title this session it's really clear what it

**0:18** · says on the tin that's exactly what i'm going to be doing i'm not going to even explain anything about my background i'm just going to go jump in so that we can spend a maximum amount of time tuning this query i'm going to start with sql server 2019 i'm using the latest and greatest sql server as of right now it's cumulative update 6. i'm using the large version of the stack overflow database the 201806 version it's about 400 gigs in size ballpark

### Query Execution

**0:48** · and i've assumed that i'm going to go ahead and use the latest and greatest compatibility level i'm going to give sql server the best chance that i can possibly give it and then i've also created some indexes in order to help my query go faster i'm going to assume that the people who brought me this query have already done some index and query tuning they put in

**1:10** · these indexes in place i'll just go ahead and highlight these and execute them and see it fails because the index already exists oh i should also state i'm a terrible presenter right up at the very top there it has brentosar.com go slash tune queries this entire query the demo database plus videos of me doing this at other conferences sql relay online stuff live streaming

**1:36** · doing different queries every single time like today's queries totally brand new as well so down here my users have given me this query that they say is performing really slowly they've got this stored procedure here where we've said go find me the top users in a given location this query takes a parameter for location a start and end date and it's hitting the stack overflow database to find all the users who live in a given location

**2:07** · and it's trying to find the questions and answers and the comments that they've posted inside that date range seems pretty fair it's not using cursors or looping through stuff while things happen seems pretty straightforward let's go see what happens when we run it and whenever someone brings me a query to go tune i like to work off of the real execution plan i don't mean the estimated plan the sql

**2:37** · server built before the query started because here's the thing most of the time when sql server estimates query plans and designs out which table it's going to process first how much memory it's going to need how much parallelism it's going to need etc most of the time all day every day your sql server is doing a heroic job of accomplishing that task it's

**2:58** · doing 99.99 of the time it's doing a great job at building query plans it's one in a hundred or one in a thousand query plans that really blows chunks and those are the ones that i'm going to have to focus on tuning to make perform as well as possible when those are happening it's often because sql service estimates and its actuals didn't line up it's like me

**3:23** · if i don't look at the shopping list if i just go to the store my wife hands me a list and i just go start shopping i might have only grabbed a hand cart when really i need a whole push trolley because my wife has asked me to get all kinds of stuff especially alcohol because she has to deal with me so what i'm going to do is i'm going to go take this query and since it it only does reads it looks like it doesn't look like it writes any data let's go ahead and just put it into production and then let's go turn on our plans i'm going to turn on

**3:51** · actual execution plans up here and turn on my query tuning options and then execute the query and while it executes i'm going to explain what i mean about my query tuning options set statistics i o and time give me a rough idea of how much work sql server has done in order to accomplish this query like how many pages it's read how much cpu time it's burned and well

**4:23** · things aren't looking good i can see why users are getting frustrated now when you have a query that takes a long time to run you may want to find out what its execution plan looks like and you've got a lot of options to look while the query is running my personal favorite is using sp blitz who sp blitz who on modern versions of

**4:48** · sql server will give you the live query plan while the query is running and that's super helpful to me because i can click on it and it's not animated it's not showing things move through the query as it works but it does show me not really the

**5:07** · progress either because i can't really tell which operators are completely done there may be some that are still pushing rows through remember this isn't the final we're just looking at one snap moment in time when s p blitz who ran but i can see things like

**5:25** · sql server estimated 229 rows were gonna come back when in actuality almost a million rows came back if i could give you one thing just one thing to walk away with from this session and i have to give you this early because you may walk away at any time who could blame you i'm a terrible presenter if i could give you just one thing to walk away with from this session look at estimates versus actuals start at the top right of the query plan at the top right

### Estimates vs Actuals

**5:55** · of the query plan was the first thing basically that sql server decided to do i don't always read a plan from right to left but when i'm in a hurry and i just want to get a quick glance i'm going to read from right to left and i'm going to compare the estimates versus actuals

**6:13** · now in the old dark days when your grandfather and i were doing query tuning not together i never knew him during the war if i go through and i look sql server says estimated number of rows uh per execution so this is how many rows he thought it was going to bring back and then actual number of rows for all executions is how many rows he actually brought back now i apologize for the scatter shot

**6:38** · look of this query plan here microsoft when they need to dump things onto a tool tip they tend to use one of two approaches either they alphabetize it which makes no sense for how you want to read it or they load up the data cannon and they just fire it at the screen they have a shoulder mounted data cannon that their developers do and they blast it right at the screen

**6:59** · wherever the data happens to end up that's where it ends up here you can see that for example we lost the word actual in the shrapnel here sometimes things say actual sometimes they don't say actual actuals and estimated or all over the place makes no logical sense so these days instead of using the tool tip what we do these days is we just hover our mouse over each operator and the bottom number is the number that sql server expected to come out and the top number is the actual number

**7:29** · of rows that came out so here we brought back 449 rows of 120 expected rows that's great now look i should say before i say that's great you have human expectations you believe that sql server should get everything exactly right i have really low

**7:52** · expectations i'm happy if sql servers guesses are within about 10x meaning he estimated 120 rows were going to come back i'd be happy if anywhere between like 12 and 1200 rows came back at least it would be vaguely correct generally speaking

**8:15** · when estimates versus actual are within about 10x sql server understands the work that's going to be involved in the query i didn't say the query was going to be fast i just said that sql server understands how much work is going to be involved in the query but if he says i think i always use a guy's voice for sql server because he's dumb and stubborn and he refuses to ask for directions he's all trust me i got this when he doesn't usually got this if sql server says i think only one row

**8:46** · is gonna come back and then five million rows come flowing through the plan then that early decision of estimates versus actuals will have a cascading effect of problems throughout the rest of the plan so when i'm trying to figure out just did sql server build an appropriate plan for the work that we're trying to do i'm going to work from right to left top to bottom just quickly quickly looking to see where did estimates versus actual go off by

**9:17** · 10x or more so in here when you see like this 374 percent at the bottom that's how far off its estimates were 374 if that was your child and they were doing school work at home you'd be like we're going to have to stay a little later and do some more exercises except you wouldn't say that anymore because during this day and age all you want to do is put your kids to bed so that you can do some drinking in peace

**9:41** · i say that i don't have children so it's very easy for me to joke about that kind of thing i can drink all day long if i want to this is espresso as far as you know so not that i need that to be this level of amped up it's kind of disturbing how excited i get about sql server 120 rows expected 449 came back 374

### SQL Server Estimates

**10:01** · percent off it's actually fine 374 off that's fine too a thousand ninety one percent off oh hold on tiger uh we start to have a problem here sql server only expected 121 rows to come back a thousand rows came back look what's 900 rows between friends is i continue to go across here still vaguely correct not even close to

**10:25** · vaguely correct so now we're so far off it's like me with my expectations of what college life we're going to be like i'm going to get 100 and then i've dropped out three semesters later so we have a problem here where sql server doesn't quite understand or can't accurately predict how many rows are going to come back from some of these operators like that comments operator down there sql server thought that only 229 rows would come back in in

**10:54** · reality 895 000 rows came on back when i see this i start to ask questions i start to go what could i do in order to improve sql servers estimates in order to improve sql servers estimates it's not just about numbers because at the beginning for example sql server estimated that 120 rows would

**11:18** · come back sql server thought and i'll hover my mouse over here so you can kind of sort of see except you can't kind of sort of see because god knows they put stuff all over the entire freaking plan when sql server was looking at one particular location like reading or london united kingdom or china or whatever it was looking for how many people did it think lived in that location so sql server believed only 120 people lived in that location now here comes the next trick how active

**11:50** · are those people have they been asking and answering a lot of questions at stack overflow or hardly any at all let's go back over to the query and let's think about how the query works so let's go back over and the query finally finished and we'll look at the execution plan here in a second let's go back over and look at that query plan so sql server is tasked with go find the

**12:16** · people who live in one particular location after you find the people who live in that location how talkative are they how many posts and comments have they left how's sql server supposed to know sql server just assumes people are average sql server doesn't know that some people in some locations like to talk a lot like my apartment in san diego they also don't know that some locations people don't like to talk at all so sql server had a rough idea of how

### SQL Server Doesnt Know

**12:49** · many people lived in say reading united kingdom but sql server didn't know that one of those people is john skeet john skeet at stack overflow is absolutely legendary i don't know how this person did as much talking as stack overflow as they did john was the first person to break one million reputation points at stack overflow seemed like during like 2011 2012 he was

**13:19** · just sitting answering an answer asking or answering questions and posting comments like full time he looked like kermit at the typewriter just banging away stuff continuously and his answers were really good his answers were epic so sql server didn't know that john happened to be one of those people who live in l in uh reading so to be

### Clippys Index

**13:40** · fair sql server didn't think that it was going to have to find a lot of people or you thought it would find a few people in redding one of them's john who is super active inside that time range well that's tricky if i look back at that plan that i captured at that one moment in time sql server knew there were 120

**14:04** · people but it had no idea how much john skeet loved to talk it had no idea it was going to bring back so however many comments he has statistics on the locations of users or does he let's look and see what that index says up there we got clippy up here going hey buddy oh i got an idea you know would make your query 98 faster

**14:31** · it'd be 98 faster if you had an index on users on location and while you're at it you should include some columns on there too clippy's even including an envercare max that that's rather large and about

**14:49** · me stack overflow people can write their entire profile in the about me if they want to they can write a letter to grandma if they want to but clippy says that this is going to make things 98 faster so you know what i'm actually going to do it so let's go copy that out close it

**15:06** · and then i'm going to go create that index while clippy does or while we go on and investigate more things about our query let's say we're going to call it location includes and let's go create it indexes are free right screw it who cares clippy's word is gold as far as i'm concerned let's do this now clippy said just to be epically clear clippy said this would be 98 faster the impact would be 98

### Running the query

**15:33** · so now that the query is finished let's go in and look to see is query took 48 seconds in order to run so i'm i'm really bad at math but if i take 48 seconds if i say select 48 seconds times .02

**15:52** · because clippy said it would be 98 faster it looks like that after clippy's index gets created this query is going to finish in less than a second great clippy you're a god among animated assistants now the index finished creating let's see clippy's amazing work now just to be fair i don't have to do this but i'm gonna because i want to give clippy every possible chance dbcc free proc cash and i'm gonna do it multiple times

### Freeing the plan

**16:26** · just so that y'all can see i have completely freed the plan cash plan cash was tied up in a closet it wants to be free and now let's go see how this thing works one second would be 98 faster

### Live execution plan

**16:52** · that number's made up it's out of nowhere it's just as good as his suggestions were around your resume hey buddy looks like you're trying to get a new job maybe i can help i had to get a new job after they let me go from the office team it didn't make 98 improvement we're still going it's been going for quite a while here so let's go take another look at that live execution plan let's go see what's going on now so here

**17:19** · if i go click on it now if i go in and look to see what sql server's estimates were what the heck sql server now you thought that only nine rows would come back damn it sql server your estimates got worse your estimates got exactly worse

**17:40** · instead of better now you thought only nine rows would come back so you thought only 16 or 18 comments would come back come on dude really and i'm bringing back almost a million comments already

**17:56** · clippy is just trying to help but he's kind of like siri and cortana and whatever those other people's names are hey google it's a starting point but it's by no means the finishing point and it's hilarious that the query took exactly the same length of time in fact it's slower it's 49 seconds now rather than 48 seconds let's see if we

**18:16** · go look at the actual actual execution plan now to see what it's got yeah clippy pipe down now didn't he to be fair if i go across and look at the index that he created is it in there it is so in fairness at least sql server did use the index

**18:35** · looks like clippy isn't going to save us this time so how can i get that estimate to be more accurate how can i get sql server to do a better job of guessing how many rows are going to come back is this maybe a problem or is there something else that i could do around encouraging sql server to understand how many rows are going to come back maybe an index would help except i already have one and sql server

**19:05** · is already using it sql server is making a list of the users and then going in and checking to see what posts they own and what comments they own but because sql server doesn't know that reading united kingdom happens to contain the legendary john skeet sql server isn't going to make good decisions to give you another example of why this is the case if i go back up to the query itself let's come all the way back up here so up here sql server knew that

### Remove John Skeet

**19:36** · there were a certain number of no rows in redding but until it executed this it had no idea who they were let's give him a shot at that let's break this query up into phases now kalambanga says just remove john skeet just filter for where user is anything other than john skeet and so it's really funny that you say that i'll do it i'm not afraid of doing crazy stuff and u id or we'll say you display name is

**20:04** · anything other than john skeet and let's try the query again let's put the query up in whoops no stop x puts you into cash and then put you into production and then let's go run the thing again

**20:23** · \[Applause\] as far as i'm concerned you have the answer because if we just delete john skeet if we work from right to left top to bottom our estimates here still suck the big one they're like not even close our estimates all throughout here suck pretty bad but look how much faster it is john ski

**20:44** · is the root of all our problems at stack overflow i wish that i could go back to users and say things like that i wish i could just say as long as you remove your outlier data you're going to be fine but there is actually an interesting lesson inside here which is the outliers are usually the cause of a lot of your problems where sql server doesn't expect what's going to happen now let's go take that back out because unfortunately we don't want to remove john skeet he is a national treasure not of my country but of another country

**21:13** · if i go back and run it again like if this thing's going to be slow again now can i give sql server a better chance at understanding where his estimates are going to go wrong you can't see this from an estimated plan if i go run the estimated plan i'm only going to see what sql server estimated was going to happen and of course that's going to be wrong i really need to see the actual plan in order to get that when i'm looking at

**21:39** · the actual plan one way to go get it was from that s sp blitz who which will show you the live running query plans it's just that they're not animated my goal as i'm looking through here is to see where estimates versus actuals went to hell in a handbasket if you don't use sp blitz who another trick you can use is you can go into activity monitor now i know activity monitor has a

### Activity Monitor

**22:07** · terrible reputation because it is pretty trashy but over here there's show live execution plan which will show you if you're really really lucky an animated version of your query plan

**22:24** · running in my case this has about a twenty percent success rate like one time in a million this thing actually works out for me that's not twenty percent not very good at math but for those of you who it does work for a great bully for you this right here

**22:45** · what i normally run into is that i can't get the actual execution plan because the query is going by in somebody else's session or ask people it's who isn't working this has been a big problem for a really long time and sql server 2019 brought out something amazing sql server 2019 lets us get from the plan cache the last

**23:06** · actual execution plan in order to get it we have to turn on an option oh damn it i've already deleted that from up above let me go ctrl z my way back to replacing that from where it was i have to turn on this option plan

**23:24** · this option right here alter database scope configuration set last query plans equals on there is a performance overhead to this the more you run queries the more complex those queries are the harder of an overhead this is going to be on sql server i have never measured this but i've had two students in class who turned it on during our functions

**23:45** · exercises functions run row by row for example and their servers went to a crippling halt i would just be careful to only turn this on whenever you're doing active query troubleshooting like for the day and i've got full instructions inside the demo script in a blog post about how you go and turn that on once you have it turned on you can run sp blitzcash as people it's cash from the first responder kit gives you your top 10 most resource intensive queries

### Blitzcash

**24:16** · and here i can see el numero uno number one is that stored procedure report top users by location we can see that the plan was created in the last four hours it has a low cost because sql server thought it was going to be cheap but in reality it has very high cpu and then if i go and click on the query plan

**24:44** · instead of just seeing the estimates now i see the actual from the last time that the query ran it's not the worst time that the query ran it isn't the longest running of the most reads it's just the last time the query ran now also when i ran sp blitzcash just

**25:04** · now what sp blitzcash does is give you the top 10 most resource intensive queries from the plan cache the one you're looking for may not be that one no problem you can say stored proc name equals report top users by location

**25:22** · and you can filter out just that one queries plan there are also other options that you can use like uh plan hash query hash all kinds of other stuff to find the query that you're looking for so same thing here when i'm looking to find out why a query went wrong i'm looking right to left top to bottom trying to find where estimates versus actual are more than 10x off and how i can improve them well the place where they went 10x off really here starts right at the first operation

### SQLServer

**25:55** · sql server i think i'm going to find about nine rows in here oops my bad 449 came back the second most important thing that i can tell you so i said the first most important thing i could tell you at the start was work right to left top to bottom looking for places where estimates versus actual veer more than 10x off

**26:16** · the second most important thing i can tell you is that when you see that happening think about taking like an exacto knife and going right to where that is in the plan and saying let me just cut operation right there can i get sql server to break this plan up into two phases can i do the first phase and dump that data into say a temp table so that sql server can then come back on the second pass and go oh oh now i know how many rows are in

**26:47** · that temp table and who they are let's go see if we can do it so let's start by making a change to our query now in this case i should say two i purposely write demo queries to be as easy to tune as possible so that i can teach you as much as i can in the time that we have together which isn't very much because i don't really like you my coffee shop is open downstairs however in real life queries it's much more complicated because often the the estimates versus actual

**27:16** · when they go way off will be out like here and you're like oh sql server what's happening right there at that point and i wish that tools like century one plan explorer would let me click on one operator and show me where in the t sql it is that becomes much harder i talk about that in my mastering classes so here though it's easy we started by looking to see what users are in that location let's rewrite our query just a little

**27:45** · let's come back up to the top let's rewrite our query just a little to say first get the list of users in this location so we get better estimates create table users

**28:07** · what we put in there i might as well do all my work for the users table and just get it done with so let's say id int primary key clustered because each user has one id i don't always put clustered indexes on my temp tables i'm just trying to be a better person whenever i do live webcasts so there you have it if you didn't know that this was unique then you probably wouldn't want to take this approach plus you can see that i'm joining on that everywhere else so maybe sorting it by that first might

**28:35** · help me out i don't want you to think that i always do that usually i just sling something into a temp table and see what happens uh so reputation int display name and varicare 40 about me i want to say isn't invaricare max not 100 positive i should probably set a good example there and look as well users columns yep about me and varicare max so there we go so about me and varicare max

**29:07** · curses you whoever put that in there and then to do insert into users that sounds awkward id reputation display name about me

**29:22** · select now this this comes into something a little bit tricky here see how my query says select top 1000 can i do top 1000 in my temp table insert

**29:38** · is that gonna work no because i'm ordering by the sum of something that isn't on the users table so this strategy of mine here to dump this stuff into the users table would backfire on something that has a

**29:54** · hellacious number of rows if it's like your location equals null or location equals empty space where there are a ton of users who match so i'm doing this here with keeping in mind that i'm optimizing it for things like reading where there are a limited number of rows i may need to come back and look at say passing in india to see how that works so let's select id reputation display name about me from

**30:22** · dbo users where location equals location now instead of going from the users table here i can go from the temp table then instead of doing the filtering down here i can simply remove that out because it's already taken care of by the filter above when i'm doing tuning i like to use another name because it's going to sound crazy but i usually have to do my work in production \[Music\]

**30:58** · but the thing is i have one of those weird jobs as a consultant where people are often asking asking me to fix something on an urgent uh you know crushing basis where the production is going down we got to fix something as quickly as possible i don't want to alter the production stored procedure i'd rather put in like bgo at the end of it so those are my initials i don't use my just first and last name for reasons that will be obvious to fifth graders who like to make poop jokes uh at heart i am a fifth grader who

**31:27** · likes to make poop jokes if you can't make temp table or store procedures in production you can also do temp stored procedures so i can say for example pound uh report top users by location this also works well so if you want to test something and you don't want anyone else to see the same stored procedure that you do this works great so let's go ahead and do that now let's run our now i don't have to ever do free proc cash again because i have this stored procedure just that's all entirely my own just like my favorite car let's go hit

### Stored Procedures

### Execute

**32:00** · execute on this three two one do i have live yeah i have actual plans turned on now we know that this query used to take like uh 50 seconds in order to run let's go hop over to our window with sp blitz who and go take a look to see what the live query plan looks like and let's see if our estimates get any better now

### Live Query Stats

**32:31** · one of the cool things about live query stats you can't really tell what percentage done something is when you're looking at percentages that's percentages of the rows that were brought back but you don't know if that's 42 percent because what if for end up from just to be clear i'm pointing at this little fella right here so what if or we'll even go to the very beginning one so the first one around users what if sql server thought 449 rows were

### What if

**33:02** · gonna come back but in reality only seven did or what if it's only just read the first seven rows of 449 you really don't have a good way of telling when you're looking at these plans however i sure do spot a problem even though we've only read a few rows

**33:26** · that's terrible sql server thought that 452 comments were going to come back but in reality 220 000 came back that's not so good and in fact things are getting worse i don't sing

**33:43** · often in webcasts but that's pretty terrible right down there that's a minute and a half and this little fella is still going let's go back and look one more time at our estimated or our actual execution plan that's flying in progress so let's go in and see here sql server still only has seven of the 449 rows you know what he

**34:04** · did john skeet it's probably number seven he hit john skeet and now he's in the sad process of finding all of the things that john skeet has ever done

### Whats missing

**34:20** · it's going to be a hell of a lot of work john skeed is a prolific person this query plan represents a whole lot of work but what's missing if you're going to do a whole lot of work in sql server what would you expect to happen what would you see on this execution plan that we're not seeing here now you might say a missing

**34:42** · index request and that's fair because we do have a couple of index seeks plus key lookups that's one opportunity you don't see clippy piping up going hey buddy anytime you see an index seek followed by a key lookup you could immediately go hover your mouse over that key lookup

**35:02** · so like if i hover my mouse over the key lookup on post if i hover my mouse over the key lookup down at the bottom there's an output list these are the list of things that sql server wishes it would have had over on the index if we added this over to the index the index would suddenly be covering and we wouldn't have to do all of these key lookups tanya

### parallelism

**35:24** · tanya nails it tanya says the other thing that we're missing so one thing is that we're missing missing index hints but both tanya and junior dba over in the chat both say parallelism sql servers like don't mind me this query looks really cheap i should be able to execute this with just one core this query only cost 3.5 query bucks

**35:48** · that's nothing when i was your age i carried five query books around in my profit all the time so sql server doesn't think that this is going to be more work so it's not allocating a lot of course to it so there are two angles of attack that i could take now the query finished let's go over and take a look at the actual execution plan

### execution plan

**36:09** · moving into putting in the temp table made it go to four minutes oh that's just delightful putting in the temp table made it go to four minutes if i look over at the execution plan here's what gallum bunga was asking for over in the chat gallon bunga says hey i don't see a yellow bang on the plan

**36:27** · yeah we don't get yellow bangs all the time in the in the live query plans because it may not have started spilling yet for example now clearly it has spilled here we're spilling to temp db because poor sql server didn't estimate anywhere near enough memory in order to sort all these rows

**36:46** · so now if i work from right to left top to bottom estimates versus actual let me zoom out and come back in here so top right sql server believed 449 users would come back they did sql server then thought i'm going to go look over in the post table to see how many posts they have he was vaguely correct now we get over to the comments table and it's become a poop show oh man i love the sql server management studio team has been on fire really doing

### comments table

**37:19** · impressive improvements that make my life easier as a query tuner they haven't fixed everything they're still addicted to the shoulder data cannon but you see the times on here it's showing me that this operator in the plan effectively finished at around 52 milliseconds in there are a lot of

### times table

**37:37** · gotchas to this what the times mean on each of these and i have a link to eric darling's excellent blog post over on the resources for this session talking about how the time on the operators means different things depending on whether these are in row mode or whether they're in batch mode

**37:56** · but if i'm going to go look at what the problem is holy cow my estimates versus actual went to hell in a hand basket right here now i might look at what could i do in order to improve that can i get sql server to have a better understanding of how many comments one particular user left when i'm doing query tuning out in the real world when i start my query tuning efforts i

**38:21** · have a half hour hour glass that i keep on my desk and i try to flip it whenever i start query tuning to make myself check in every half an hour and go am i on the right track so that when i look down and this thing is empty i can then start to go oh oh i don't know that i made a lot of progress in the last half hour and that i was necessarily on the right track and is it time for me to maybe switch tracks and what progress do i

**38:54** · think that i can make in the next half hour that will be the most effective so i know when i look at this query plan i don't think parallelism is going to help if i balance the work across multiple threads i don't know that that's going to improve things if i do index tuning i don't know that that's going to improve things either but i do know that it will reduce the number of key lookups that i have to do if i hover

**39:22** · my mouse over this and i look at the output list if the output list is fairly small i might go in there and add those in so that sql server has doesn't have to do all these key lookups back and forth we've come to a branch inside here dear reader and i will let y'all choose

### indexing or parallelism

**39:41** · do you want to work on indexing or do you want to look at parallelism because i have tricks up my sleeve either way so over in the chat or in comments tell me which one you would rather prefer and i'll give y'all 10 9 8 7 6

**39:59** · 5 4 3 2 1 saying indexing santa's saying parallelism jeb says why not force the hash join you could totally work on that hugo says i want to fix the dang estimate i hear you it's tough

### fixing the dang estimate

**40:19** · several people looks like lots of people are saying indexing a few of you are saying parallelism so we'll try indexing first and then we'll see how much time we have left over and see whether we want to play around with parallelism and i love that hugo hugo's the only person who's like i want to fix the uh fix the uh uh yeah no that your name no

**40:36** · i i rethought that the one in chat who's like hey why can't you say my name and i'm like yeah no no no not so much okay so when i'm going to do index tuning if i'm going to go track all the index tuning problem on this anytime you see an index seek followed by a key lookup hover your mouse over the key lookup and then look at things like the output list down at the bottom if the output list is fairly small

### index tuning

**41:02** · like think not invaricare max if the output type is very small then i don't mind including it in indexes generally speaking when i do index tuning lectures i talk about aiming for around 5 indexes or less per table

**41:18** · and around five columns or less per index now that guideline i'm very careful not to say rule that guideline stems from the fact that i have five fingers on this hand and i have five fingers on this hand so it's really easy for folks to remember the more columns that you include on your indexes whether they're in the keys or in the includes makes less records to be available on each of your 8k pages it makes the index larger it slows

**41:47** · down inserts updates and deletes causes more blocking more dead locking especially when you put them on columns that change all the time like score but score is a tiny number so i might be okay with that in this case let's give it a shot so let's go look at the indexes that exist on that table that is the posts table so let's go see sp blitz index table name

**42:17** · equals posts sp blitz index is an open source stored procedure originally written by kendra little now works for red gate software out of the uk and in here the first result set gives you the list of indexes that already exist the second set is clippy i haven't got

**42:35** · any idea how i could possibly make this faster if you need me i'll be over here doing key lookups then down below is the list of data types on the table so i can see for example this table's not small this table has a lot of columns in it i can see for example that score is an integer i like this as just one single quick control panel so that i can look at different columns and figure out whether or not they're safe to add instead of jumping around to like object explore if i go back over to that execution plan

**43:07** · the index that we're talking about was on owner user id can we add the score column to that index on owner user id well that index on owner id owner user id only has one column in it so i'm down if we scroll across we also have the create t sql so i can copy that out

**43:33** · so i'm going to say now on this index i'm going to say i want to say it's with drop existing equals exiting drop existing equals on i never exactly remember what that is so let's then say score let's see if that works i don't actually know

**43:59** · okay that's that one now while that runs let's look at this other one the other one was on the comments table so the comments is also on user id let's hover our mouse over that key lookup and then see what does sql server also need to do the key look up there for the key lookup that he's doing is on score so it looks like we need to add score to this index as well so this is

**44:26** · just remember when i switch windows it's the index on user id on score let's go c s p blitz index table name equals comments and then let's go look to see come on big fella would be really funny if this was blocked

**44:54** · it is it's blocked it wants a schema stability lock oh good it finished i got lucky on that one um so now if we go in here's the index on user id looks like it only has one key and one include so i'm kind of comfortable adding a column to that let's go take that guy so create that index and then come back over to our other window where we had our indexing work

**45:22** · and then let's put this over here include creation date and score with drop existing equals on there that goes i really like having a little breadcrumb trail of the changes that i made when i'm going about tuning queries to see whether it made a difference or not the other thing we should do is we should go back and try the original version of the query now that we've done this and maybe the temp table version will be faster maybe the original version will be faster we'll go see now when this does uh

### breadcrumb trail

**45:55** · after this thing finishes take a second there oh you know what else is really cool uh if you fire open a web browser and look for another job if you fire open a web browser and go to brentosar.com go slash progress brentosar.com go slash progress solomon rutzky has a

### progress

**46:18** · dmv query out here that will get you the progress of an indexes creation so you can copy paste that out and you can see how much longer your index creation has to go this is over at brentozar.com go slash progress you do have to know

**46:37** · the speed that you're looking for but the thing that i find really cool with this is it'll give you exactly how much time it estimates is remaining but you see as soon as i paste this in all of a sudden sql server finishes because he's watching to see as soon as you know that you mean business about that index getting created then all of a sudden he tends to finish his business all right now before i run this again to go see how much better or worse it is i kind of skipped something when i'm

### time

**47:07** · trying to measure whether a query gets better or worse i very rarely use time because time is so unpredictable god knows the year 2020 because i'm not unpredictable i rarely use time because it can vary so much depending on what else is going on in the server instead what i usually use is logical

### logical reads

**47:30** · reads if you scroll down through here these are really useful numbers each one of these logical reads is one 8k page read generally speaking the less data you read the faster your query will go rather than running a calculator across all this because that's a giant pane in the rear i'm going to copy that out and i'm going to go over to statisticsparser.com and it's statisticsparser.com written by

### statisticsparser

**47:58** · richie rump out of south florida gives you a really nice user interface to like slice and dice kind of like excel so i can see here's the total number of logical reads across all my tables it's also helpful to see which table you're doing the most reads on so my before number is about 3.8 million logical reads now that we have our new improved indexes let's try our query again

### query

**48:30** · \[Music\] now remember he did take four minutes before when i had the temp table version and i certainly do not like that temp table version at this point let's go look at the live query plan now it is smaller it's more compact because we've gotten rid of the key lookups but the estimates still suck

**48:54** · the estimates are still terrible let's see though if i go and look at the actual execution plan again i should have also seen what the total number of rows this thing ended up bringing back but yeah see he's still just at user number seven i don't think this is this might be a better solution but i don't think it's a great solution let's do this rather than hitting the

**49:19** · the temp table version let's hit stop and let's go back and try the real version because the real original version was taken like 58 seconds it was like 50 58 seconds somewhere inside there now and i could have freed the plan

**49:35** · cache i did create indexes well we'll see if we go look at that's true i even dropped the existing indexes so that'll work if i go look at the live query plan see how sql server did guess incorrectly still about the number of rows it would want to come back this is this in here especially the next set is where hugo really wants to jump in and start work and sql server is comically incorrect about how many comments john skeet has left oh well but looks like it finished

**50:06** · let's go back and see i i really it pisses me off that when i try to close a live query plan sql server is like something changed nothing changed this window is read only there's no way i can change the query plan but i still have to hit no close all

**50:25** · that crap out of there so now let's come back over here and the query finished in half the time it finished in half the time that is not bad it's 30 seconds instead of 50 some seconds okay we have nine minutes left

**50:42** · you wanted parallelism we've got to go see if we have parallelism because we actually we don't have parallelism inside the plan it's closer it's not wonderful but it's closer well the the estimates aren't the estimates are still smoking weed i guess weed would make you laid back that's why we don't have parallelism right because people started

**51:04** · smoking weed all right so see if we can inject parallelism another thing that i love that microsoft has been working on so much lately i guess i'm going to ditch that temp table version of the stored proc let's go back over to the real stored proc so it was report top users by location stored procedures report top users by location

### table variable

**51:27** · nunu bunny says my friend wants to know if we lose parallelism when we use a table variable inside the stored proc not exactly so you can get parallelism with a table variable depending on what you're pulling out of it but inserts updates and deletes when you're modifying the contents of a table variable that goes single threaded and because sql server tends to have no idea what's going on inside the table variable even in 2019 it only knows the number of rows not their contents we still end up being

**51:56** · likely to get single threaded plans because we get such low ball estimates when a table variable is involved so here's the stored procedure that we're back on originally so let's copy that out and one of the things that that sql server that i used to not be a fan of i used to not be a fan of query hints

### stored procedure

### query hint

**52:18** · i used to not be a fan of query hints because i'm like you don't know more than the sql server query optimizer stop trying to boss it around hints are not flexible they don't give you a lot of wiggle room later but right now i kind of want to use a query hint because sql server is so insane about

**52:35** · this query cost this query cost is going to cost less than one query buck oops my bad you know it's costing eight query cents when in reality this thing's taking like 30 seconds and i can run it over and over again there's no cost threshold for recompile

**52:50** · sql server doesn't automatically go back and recompile whenever a query plan is absolutely terrible and it also doesn't know how many times this query is going to run sql server puts the same amount of work into a query whether it's going to run one time or a million times so maybe i need to start using a query hint to kind of guide sql server along i need a guide sql server along by saying hey look use more cpu cores and this macs up which is funny max drop

**53:23** · doesn't work either this doesn't do it all this tells sql server is look if you want to use more cores here's how many cores you can use so let's go in and hit this i did that

**53:38** · and then go in and get our estimated execution plan again and if i look at our execution plan we still don't have parallelism inside here there's nothing inside here in terms of parallelism that option max dot hint that doesn't tell you to do parallelism to do parallelism you need a different query hint so i'm going over and googling because that's how i roll sql server parallelism query hint they added a new

### parallelism query hint

**54:06** · execution plan hint that you can use to go suggest a parallel plan and i'm going to do just like you would i'm going to copy paste it directly from the internet and go paste it into production because that's how i roll so this hint

### cost threshold for parallelism

**54:23** · tells sql server hey i would rather you think about uh going parallel with this query plan now ian over on youtube says what about cost threshold for parallelism does that affect it it does but only when your query is expensive enough here sql server's cost threshold for parallelism at less than one or your sql server's query cost at

**54:46** · less than one ain't nobody setting their cost threshold for parallelism down to zero so cost threshold for parallelism makes no sense here when sql server's estimates are this bad so if i put in this hint if i say hey look try and use a parallel plan if you can let's go see if sql server will go through and build a parallel plan and if so

### use a parallel plan

**55:11** · is it faster so we have two questions when i hit execute one is a sql server going to use a parallel plan two is it going to go faster three two one execute then i'll go pop over in sp blitz who and go see if we can get the live query plan and go see what's going on and we have parallelism

### use parallelism

**55:34** · now we have parallelism so the query is going to go faster right this particular server has eight cpu cores in it let's go into task manager look at performance oops this sql server has eight cpu cores in it my mac stop is probably like four but still at least the query should go four times faster right four times faster than 30 seconds that should be pretty quick enough my users should be happy about that except you know what's funny

**56:07** · it's slower it's it's not actually going faster it's going slower a lot slower terribly slow \[Music\]

**56:23** · so what's happening so what's happening if i go over to s p blitz hoop and i look at the live execution plan again so look to see where that parallelism operator is where that parallelism operator is i want you to think about everything downstream everything from this side back all went parallel across multiple cores but that doesn't mean that this work is each evenly split up

**56:50** · what it means is that this plan is three-dimensional from that point back this plan is three-dimensional and there is one plan per core so in the beginning god made in the beginning sql server went to look to see how many rows it would find per location and it divided those rows across threads but not necessarily evenly and then whoever poor

### John Skeet

**57:15** · sucker got john skeet they are screwed they are doing all of the work for john ski when the rest of the query is sitting around or the rest of the cores are sitting around idle not doing anything we are now at two minutes

**57:36** · the same query that ran in 28 seconds single threaded is now running over two minutes in parallel so when i'm thinking about building query building and tuning query plans

**57:53** · this is a great point to stop and think about our 30-minute tackle we made pretty good improvements we made the query basically twice as fast when we looked at the indexing approach we made it slower with the tempdb approach we made it slower with the parallelism approach when i'm thinking about query tunings let's go over the resources slide for this particular session if i go to brentozar.com go slash tune

### Resources

**58:18** · queries this is where you can see the examples that i'm working with you can see past videos of me tuning other things and if you go all the way down to the bottom i've got my be creepy process and this is the process that i use whenever i'm doing query tuning so i

### Be Creepy

**58:34** · called it the be creepy process because of these are the things that i do in order when i'm tuning queries and when you watch the rest of my query tuning videos you'll notice that i tend to steer pretty close towards those i go in order but this session i didn't i went in kind of the wrong

**58:53** · order i went from indexing first remember clippy said hey buddy squarey would make your query this index would make your query 98 faster let's do this and it didn't make my query 98 faster in fact it made no difference on the query so i did add a couple of indexes that helped cut it in like 50 percent but users never want 50 users 100 faster and then we played

**59:18** · around with parallelism and we didn't get across the finish line here we had a pretty frustrating hour where we didn't make a lot of progress instead go through this as i explain inside these other sessions

**59:34** · work through them in order and you'll have a much better experience if you go through and start by running sp blitz and sp blitz index to check to go see your server's health overall end user requirements gathering ask them what their finish line looks like does the query need to be tuning in or do you get say one hour to tune or two hours to tune capture your query metrics read the query and experiment with query costs work through them in that order don't come from the bottom up that's what the be creepy process is

**1:00:04** · all about everything that i talked through today across this session is all available at brentozar.com go slash tune queries that is everything that i wanted to talk with you all about now we are going to switch into the uh prize

**1:00:21** · session for the sequel saturday oslo and at this point i will drop out and i'm going to go downstairs and have some coffee from my local coffee shop because it's now 8 15 a.m here in san diego so thank you all for hanging out with me and i will see you again later i'll actually see you probably next weekend to sequel saturday gothenburg too so adios everybody thank you rent

**1:00:53** · and that's the stream tada yes we are getting close to uh our final leave that webinar here we go oh let me switch over and uh move this over here so that i get vaguely decent white balancing uh so there we go folks so you got to sit in on sql saturday oslo and i'll put that up on the site too as well so there we go that's the

**1:01:18** · first time i've ever tried to to simulcast in in front of go to webinar and to the streaming with y'all and that i think it worked out pretty well it wasn't great because i had this camera sitting literally in the middle of my monitor the whole time i was going it didn't it wasn't perfect but i could live with that it's better than better than nothing the more people that i can reach the better because of course y'all wouldn't have gone to uh sequel saturday oslo because you're addicted to things like twitch and facebook and uh youtube streaming well that's it so i am going downstairs

**1:01:46** · go get myself my uh locks and bagel and coffee i will see y'all later adios everybody