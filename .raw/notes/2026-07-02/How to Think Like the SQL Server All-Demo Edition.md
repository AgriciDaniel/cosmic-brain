---
title: "How to Think Like the SQL Server: All-Demo Edition"
source: "https://www.youtube.com/watch?v=nYfEiwkHico"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-16
created: 2026-07-02
description: "You’ve heard of my free How to Think Like the Engine class, and maybe you even started watching it, but…it has slides, and you hate slides. Wanna see me do the whole thing in Management Studio, starti"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=nYfEiwkHico)

You’ve heard of my free How to Think Like the Engine class, and maybe you even started watching it, but…it has slides, and you hate slides. Wanna see me do the whole thing in Management Studio, starting with an empty query window and writing the whole thing out from scratch live? This session is for you.

## Transcript

### Introduction

**0:00** · \[Music\] good morning party people so how's it going this morning I am coming to you live from San Diego California I love Thor Winnie this is the only reason that I'd get out of bed before 9 a.m. on Saturday that's uh that's excellent so welcome everyone to our

**0:18** · morning stream for how to think like the engine it's good to see the regulars inside here I see Malick inside here a man's inside here Trevor good to see you in here as well now Hanny good to see you as well too so it's good morning all kinds of folks piling in here too this is I think the first time that I've ever done this session live streamed on Twitch mixer Facebook and YouTube all at

**0:45** · the same time and it's kind of cool that it shows your comments up there live to from everybody regardless of where they're coming from so like we've got folks Louisiana good morning I take what Louisiana I miss Cajun food so bad I lived in Houston Texas for several years and dang I miss you Stan Texas wolf oh

**1:04** · thanks you like my relaxed and humoristic approach to teaching humoristic I like that and a big things up for thumbs up for the equipment you're using oh man it's so much fun I'm having so much fun playing around with all the gears this is also one of the first times where I'm using automatic light switching to as well like this light up here isn't turned on right now

**1:25** · with this camera angle but as soon as I touch a button and I switch over to another camera angle that camera will tur that light will turn on too as well so it just makes it a little easier for me to get the lights and ambience just right I still got to get the light right for camera to the one that's facing you I have a brand new light but the tripod is too short so when I position it towards me it's very Blair witchy and I got to work on the color tinting and all that so and oh I am coming to you from

**1:53** · the depths of the database crypts you know so it's a little weird how that one works so always the thing that I get to keep working on I I kind of lead water it'll grow that's a good way to say it the other thing that I like with that too is just the I love improving both

**2:08** · things I love improving the material that I teach and the way that I teach it to kind of bring you all new ways of seeing this stuff you know getting the experiences of it and all out so this morning I'm going to talk through how to think like the sequel server engine which is a classic course where I really give you the foundations of how sequel server works it's useful for developers database administrator

**2:32** · systems administrators and this is gonna be totally a hundred percent interactive I'm gonna be doing demos continuously there are no slides I'm just opening up SSMS and just dumping stuff in like crazy so feel free to ask whatever questions you that you want along the way and I'll steer off and do different demos in all the whole entire course

**2:53** · takes about three hours you know depending on the level of interactivity but my coffee shop downstairs in the business or in the business in the building opens at 8:00 a.m. so you're gonna get about two good hours out of me before I get distracted and I want to go downstairs currently fishing how amazing is that oh

**3:14** · that's kind of awesome I'm gonna guess that you're uh looking on your phone Ritchie says SSMS is of the devil orb orb the devil itself depending - sometimes all right so let's go ahead and get started I'll switch over here to my sequel server management studio and now what I'm gonna be using inside here is the stack overflow database stack overflow or open sources everything that they do under Creative Commons licensing so that you can go use this database and run queries against it it's very large you

**3:46** · like the transition that's brand new - I should show you that again just so that you can see it this is brand new and then as a switch backs over there so I've got a whole new theme coming with the company logo company colors and all that and that was the first thing that they dropped and I'm like oh I just love it it's so cute so everything that

**4:06** · stackoverflow does they totally open source so that you can then go use it for demos I find this so much more interesting than other databases out there and the only table that I'm going to be using inside here today for these demos is southern Germany that's you

**4:22** · imply like an American like I you know that I'm an American I don't know I know where south is but like what's in southern Germany give me the city that you're in in southern Germany and then I'll go because I'm always curious as to which one it is Amon says also likes the comments up above your head I'm trying to figure out whether I like him above my head or whether I like him off to the side I'm not quite sure how I feel about those yet uh beans burg Baden württemberg ya

**4:47** · know I don't quite know where that one is you got me on that one though no Waco Texas good to see you it's probably nice weather down there too today so the only table that I'm gonna be using inside the demos today is just the users table and the users table holds exactly what you think it holds a list of everyone who's ever logged into Stack Overflow asked a

### Users Table

**5:09** · question post an answer and so forth Croatia you know I keep hearing that create Croatia is one of the most beautiful places that I haven't been to like Croatia there's several places over in that part of the world that I keep seeing Instagram people go over to and it looks just absolutely gorgeous so I'm always like mmm I should check that out at some point Sweden and of course your

**5:31** · name frozen Sweden hahaha Sweden is I love Sweden and I'm supposed to get over there a couple of times this year for Oslo and Goten Berg for sequel Saturdays but of course we'll see how that actually pans out turkey Boston Massachusetts I eat turkey I eat a lot of Turkey it's pretty good that's not true we only really eat turkey twice a year in the United States it's like Thanksgiving and Christmas and

**5:55** · that's really about it but it tastes really good and I always wish that I ate it more often dang y'all are just all poppin up with geography all right so let's just keep watching geography and see where y'all are from so let's see Delray Beach Romania gloutch Esther Shire I assume rich that's how you pronounce that gloutch Esther Shire I'm never good with my pronunciations Vietnam Nepal now

**6:17** · y'all are just making places up right oh I'm on the South Pole you're just making these things up it would be cool if you're actually in y'all are in Vietnam and Nepal as well Sheffield United Kingdom yeah those are all awesome places so many play Rebecca is probably

### San Diego

**6:34** · right outside here somewhere she says San Diego California Mike salla for my San Diego webcam I'm actually in downtown San Diego so out here I'm looking out at the kind of the suburbs are out in that direction the ocean is right behind me but it's just that I can't see the ocean from here because my office has a wall here I would have to pick up that camera and take you out to the living room and I'm not about to do that right now so back we go over to here Iceland a Vidigal Dirar

**7:05** · oh man I really miss Iceland a lot Erika and I still debate all the time about whether we should have just stayed in Iceland during this whole kovat after kovat 19 think Russia all over the place all right well we'll go ahead and get started so in the stackoverflow users

**7:23** · table it holds exactly what you think it holds a list of everyone who's ever logged into Stack Overflow posted a question left an answer or whatever in the users table there's an ID column everyone gets an ID it's an identity column starts at one and goes up to a bajillion there's a back loaded special user with an ID of negative one for the community but generally you think of this as a number that starts at one and goes up to a bajillion that in that clustered index the primary key happens

### Stack Overflow

**7:56** · to be a clustered primary key is on the ID column so you think of the clustered index as really the data itself or the table itself you're usually not always but usually want to declare a clustering key in sequel server a clustered primary key that defines how the data itself is

**8:17** · sorted everything in sequel servers basically stored in 8k pages and you can think of them as just like pages of a spreadsheet you can even download these pages I've given you sample ones of these at Brent Ozark aam /go slash

**8:34** · engine now I'll go ahead and paste that in over into the chat just so that you all have it if you want to go download that the same a.k pages that I'm dealing with so everything in sequel server is organized in these 8k pages now things get a little different when we start thinking about Hecate on or in memory LT p or columnstore indexes we'll set that aside and we'll just focus on traditional indexes for now I want you

### System Objects

**9:00** · to think of them as literal pieces out pieces of paper as if they were printed out from a spreadsheet that have exactly the same data that you're seeing on the screen here when I do select star and you can even see them if you start going into like system objects if you say set statistics IO on if you say set

**9:22** · statistics AIA wants a totally safe command it only affects your own session you can do this in production doesn't break anything all it does when you turn this option on is that when you run queries when the query finishes over in the messages tab there's gonna be a count of the number of pages that you read when you're trying to do query performance tuning there are a couple of ways that you can improve performance these aren't the only two but they're just the most common two you can read

**9:54** · less data or you can do less work on that data shooting short revolution thank you I appreciate it so you can if you want to read less data the way that you measure that is you tearin set statistics IO on and you count the number of pages that you're reading every time that you run a query I am using the smallest version of the

**10:17** · stack overflow database and users is the smallest table in that copy of the database so this is a really his royal freshness that's excellent so really this is really tiny object way less than a gigabyte but 7,000 pages is

**10:35** · still a lot for human beings for people like you and me that's a really big deal so as we're executing queries together and when I ask you to go build an execution plan I want you to think of it as having 7,000 pieces of paper that

**10:52** · you've got to sift through in order to execute so we're gonna do is I'm gonna run queries and I'm gonna have you tell me what you would do if you had 7,000 pieces of paper stacked up in an office supply closets where with all this data let's go find out so start by saying go get me the ID from all of the users from dbo users where last access date is greater than 2014 Oh 701 now last access date holds

**11:27** · exactly what you think it holds the last time that that person either logged into Stack Overflow left a question posted an answer jack says I would have burned the paper to be honest with you do you you sounds like you're a developer then I

**11:49** · don't have friends he is a database administrator I prefer to put people with machine guns at the door to make sure that no one goes in and touches the paper especially since it usually has private personally identifiable data inside there Jack says you're right about what media interpreting that he's a developer so how do I execute this

**12:10** · query speaking of people with machine guns at the door how do i execute this query if I have seven thousand four hundred pieces of paper I have seven thousand four hundred pieces of paper and as a reminder here's what they look like I'm gonna say select star from dbo users if I look at the pieces of paper and I try to figure out well it's not sorted by last access date last exes

### Read Execution Plans

**12:37** · date is on here but if I wanted to go find all the users whose last access date is greater than a certain date I'm gonna be scanning through this stuff I'm gonna be just ripping through these pieces of paper one after another I'm gonna have to go to the office supply closet and just start reading through these continuously finding the ones that

**12:58** · match well let's go see how sequel server does it I'm gonna highlight the query and I'm gonna run that and you'll notice that I've turned on my actual execution plan Jedi Mind gorilla says okay this was the piece I was missing in the execution plan understanding that's the only one you were missing the only

**13:19** · one Jed Eman Jedi mind I think there might be a few more there are lots that I'm still missing there's so much that I learned as I go through especially every time they freaking change sequel server management studio good Lord seem to change things and management's do which is kind of a blessing in a curse I love that they're changing things but of course the dark side is they they keep changing things and changing my demos so in here I've

**13:43** · said go find me all the users we're last access date is greater than 2014 oh seven oh one here's my execution plan now the way that you read execution plans is you read them from right to left this isn't the only way you can read plans you can also read them left to right and sometimes I have to depending on the problem that I'm solving but when you're just getting started but thing you want to start with is the piece from the right and push across to the piece on the left so the front so the first thing that sequel

**14:17** · server did was it scanned the entire clustered index and if I hover my mouse over here look at number of rows read they're about 300,000 users in this copy of the stack overflow database it's a small early copy so sequel server had to read all 300 thousand rows in order to

### Scan the Entire Index

**14:41** · find the ones that match sequel server scanned the whole entire clustered index it went over to the office supply closet and started ripping through these 7400 pieces of paper another way you can prove that it read the entire table as if I go over the messages tab see it

**15:02** · shows here I logically read seven thousand four hundred and five pieces of paper that's the whole table that's the number that we saw from earlier so we have more further proof that sequel server actually scanned the whole entire thing now I'm gonna do it a different

### Select ID from DBO Users

**15:19** · way I'm gonna take two queries I'm gonna say select ID from dbo users and then I'm gonna have the where clause so I'm gonna do one with the where clause and one without the where clause just to compare between these two I'm gonna highlight both of them and execute them both at once and switch over to the execution plans and they're

**15:41** · the same techno waiking says hi Brando's are high-tech no liking I wonder why it's waiking that's kind of interesting I would assume Viking or like it's a Viking but it's with a W so whatever so these are the same query plan it's exact same work whether I have a where clause or not it's really essential he types with a list techno why can I immediately want to go

**16:04** · into my I have so cast so many voices I'm not gonna do the Lisp voice yet this morning Oh in Eastern Europe we use the W I love it oh that's ideas techno viking then oh that's very cool what do you do for Volkswagen that's kind of weird I wonder how is it W W over there or do you even say it Volkswagen I'm a car person so I'm always totally interested in how that whole thing works so I've

**16:30** · got these two queries one with the where clause and one without a where clause and they're the exact same amount of work and if I go in and look at the messages tab they both scan the same number of pages you and I might think

**16:45** · that one of these is more work than the other like returning a whole lot more rows as opposed to returning only some of them howdy but the thing is at the end of the day if you have to go into the supply closet and read thousands of pieces of paper this query sucks either way it doesn't matter whether you have the where clause or not this is your first indication

**17:09** · when we're doing query tuning I want to read as little data as practical I don't want to read extra rows extra pages if I don't have to but when all you have is the clustered index on a table you're probably going to be scanning this thing over and over again if you want it to go faster you need some kind of alternative way of storing the data to make it go faster that's what we would call a non-clustered index now you might be

### Missing Index Recommendation

**17:36** · looking at this query plan and going wait a minute this is kind of stupid why isn't sequel server recommending an index here because often you've seen Clippy Clippy is what i call the missing index recommendation you remember Clippy from Microsoft Word Microsoft Word had this little dancing paper clip that would pop up and go hey buddy looks like you're trying to write a resume maybe I could help and when you

**17:58** · weren't really trying to write resume you were writing a shopping list well he got fired from the Microsoft Word team and so now he works in the sequel server team hey buddy looks like you're trying to query by your last access date maybe you could use an index and Clippy well it's a little early here in San Diego maybe Clippy hasn't woken up yet the problem here the reason why we're not getting a missing index recommendation let's see if any of y'all know why didn't I get a missing index recommendation here for this query and

**18:30** · while while you type that in over in the chat Jedi Mind gorilla says dumb question number one why was the one without the where clause reading twice the rows what you're referring to is these tooltips here and those tooltips are not how many rows were read they're

**18:48** · how many rows came out so in here when I didn't have a where clause it read 299 thousand rows and get out of the way here it read 299 thousand rows and it actually produced two hundred ninety-nine thousand rows the one with the where clause also read 299 thousand

**19:09** · rows so they read the exact same number but I like where you're going those tooltips aren't aren't easy to understand now in the answers to the question so why didn't I get a missing index recommendation here gene a one says it's because the data set was too small and it returned quickly enough you're close you're really close I would give you like half credit rich Davies nails it rich says it was a trivial plan so rich for the rest of you

### Why didnt I get a missing index recommendation

**19:43** · what does a trivial plan mean well if I hover my mouse over this see how it says I'll move it over closer so that I can kind of wave at it here if I hover my mouse over this it says estimated subtree cost estimated subtree cost was

### Estimated subtree cost

**20:00** · just five point seven nine something we call these query bucks it's a term that was originally coined by kendra little a Microsoft Certified Master who works for red gate software over in the UK a long time ago in a galaxy far far away this meant the number of seconds that it would take for a query to return on one guy's machine at Microsoft he had a Dell

**20:24** · desktop and he was working on building the sequel server engine and he did calculations to come up with if a query takes about five seconds to run I'm gonna give it an estimated subtree cost of say five these days it doesn't have anything to do with time it's just a general measure of CPU and i/o work required to perform a query and if you want to get a little bit more fine-grained and detailed you can hover your mouse over the individual operators in a plan and you can see things like the estimated CPU cost and the estimated

**20:57** · IO cost and sequel server adds these together sequel server doesn't really know how fast your CPU cores are doesn't really know how fast your storage is make some kind of oddball guesses about your RAM these costs are really kind of

### Cost threshold for parallelism

**21:14** · meaningless today relative to how your Hardware works but knowing that these costs are there starts to explain why sequel server does some of the behaviors that it does so a query has to be a certain level of complexity not just in cost but also in complexity before sequel server puts additional work into building the query plan this query was what sequel server calls trivially

**21:44** · simple so see how it says up there optimization level trivial and there are things that sequel server won't do for a trivially simple plan now gene asks can you adjust the cost that sequel server uses for a trivial plan yes and there are a few different ways to do it one

**22:05** · way that I could do it is I can change sequel servers cost threshold for parallelism if I go up to the sequel server and I right-click on it and I go into properties and then go into advanced right now my sequel servers

**22:20** · cost threshold for parallelism is probably something similar to what a lot of y'all use you may have read a lot of best practices guidelines out there that say sequel server and mine included this say that you should change sequel servers cost threshold for parallelism to a higher number by default this number is just 5 not 50 but 5 and what

**22:44** · that means is that for 5 if the query cost 5 query bucks or higher sequel server would consider paralyzing it now in terms of is this relevant to Azure sequel DB I'm only gonna talk about sequel server in this session I'm just because I have to limit how much time I go into different things this is like the opening ceremony for all of my training and I'm gonna give you a next step after this class the next step that

**23:10** · you're gonna go into is fundamentals of index tuning where I go into even more details about how a lot of this kind of stuff works and at the end of the webcast I'll give you a coupon so you can get fundamentals of index tuning for less than 5 bucks just so that you can go on and further your learning this afternoon so this cost threshold for

**23:29** · parallelism the default is just 5 query box so what I had done is I'd raised it up to 50 which people normally do because you don't usually want tiny queries going parallel I know reading 7,000 pages from the supply closet sounds like a lot of work but this query

**23:48** · super simple it doesn't really make sense to paralyze it but just to show you the kinds of things that wake up Clippy I'm going to go back to the defaults of cost threshold for parallelism of just five query bucks say okay and then I'm

**24:03** · gonna go see what happens with my query so let's go run the query with a where clause again move it around so that we can see it so here's the query with the where clause and now if I go into the execution plan there are two really big differences Martin asks a good question so can episode is that mean a parallel query is never trivial correct if you see a query that's parallel that means it went beyond the trivial phase it went into full optimization so now all of a

**24:35** · sudden sequel services walk oh this is query cost more than I always use a guy's voice for sequel server cuz he's dumb and stubborn and he refuses to ask for directions he's all trust me I got this when he doesn't really got this sequel server looks at this and he goes oh this cost more than five query bucks I should probably bring the whole team in and so

### Parallelization

**24:57** · then all of a sudden you're miserable that remark all of a sudden sequel server brings a whole bunch of people into the supply closet in order to read those 7,000 pages he goes parallel the query has a parallelism icon and then anything with what Erik darling calls these little racing stripes up in the plan icon so if

**25:17** · it has Erik darlings racing stripes on there that means that this operator went parallel sequel server broke up the work across multiple CPU cores and if you want to learn more about parallelism then welcome to the cloud dotnet ed you

**25:33** · can go into that operator and then look at the i/o statistics for each of the threads here sequel server broke the work up across four threads and each thread was assigned a number of pages they're not all even just like if you

**25:49** · were gonna drag a bunch of people out into a supply closet you're not really gonna perfectly distribute the work you're just gonna grab combinations of pages and throw it at people and say here go get started and get to work it's a great question when an operator goes parallel does it always use all the cores no you configure how many cores it uses and I

### Does it always use all the cores

**26:12** · don't go into that inside this class I go into it in my mastering server tuning class but it's such an interesting thing not only does it not necessarily use all the cores but he KITT can even use cores repeatedly like if you write a complex enough query a sequel server will break

**26:31** · up different parts of it parallel and do them at the same time so some of you who played around with Mac's top four you might think that if you search just to say if you set your max top to four you might think it's only gonna do four things at one time it'll actually do a lot more than that was the big complex queries things go parallel at the same time so back over here to our query

### The Supply Closet

**26:53** · sequel server assembled a bunch of people took them all into the supply closet and said let's go broke up this work across multiple threads plus up here we have cloud Clippy hate my hand up here we have Clippy up at the top going hey buddy looks like you're querying my last access date you know what would help is it index on last access date all this

**27:16** · stuff happened because this query if I go over to select and I look at the optimization level all this happened because this query all of a sudden went past the trivial stage and now it got full optimization let's talk about food secure says it's Clippy voice is the best thank you let's talk about what full optimization means here for a second and what it doesn't mean so what

### Full Optimization

**27:44** · full optimization means and doesn't mean is that I don't want you to think that sequel server went all the way to the end of its journey it's not that you mean the chat is ready to display messages that's a weird thing to say it's not that it went all the way to the end of its journey and did every possible thing in order to optimize the query you're only ever going to see two things inside that optimization level you're either gonna say trivial or you're gonna see full and nothing else in between that's kind of tricky because

**28:17** · the full makes it sounds like sequel server did everything it possibly could be building an execution plan is just like a choose your own adventure book sequel server opened the book but it doesn't mean it went all the way through every possible thing that it could do like evaluating indexed views or involve

**28:36** · alyou ating columnstore indexes there's all kinds of other tricky things that it can do when you see full it just means that sequel server opened the book and did a little bit more extra work now for the rest of the class I'm not going to talk about the differences between trivial and full evaluations I do go into that in my class fundamentals of query tuning so we start talking about what choices we can make in our queries to make it more likely that we'll get a good execution plan now back over here to our main

### Parallelity

**29:08** · event so in here I've now broken this up across multiple cores and if you look at the number of logical reads that we did it's a little bit higher than last time before when the query wasn't going parallel we're at about seven thousand four hundred pages now we've read about seventy-eight hundred pages don't read too much into that parallelism does add

**29:30** · some extra overhead that's why sequel server doesn't throw it in by default in really tiny queries it only puts them in enlarged or queries there is an overhead to that but it would be more effective if my query would take a long time to execute if I broke that up across multiple workers all right so now when I

### Order by Last Access

**29:53** · look at this when how long the query took to ran I'm gonna be pretty happy with this though I'm not gonna be upset people aren't gonna come to me complaining because this queries running less than a second we're off to the races but let's make the query a little bit harder let's say order by last access date I want to see this the

**30:16** · 150,000 rows and I want them ordered by last access date now you as a human being how are you going to execute this query when you have seven thousand four hundred pieces of paper they're not ordered by last acts State and you have multiple rows on each

**30:40** · page that have different last access states let's go back in and take a look at the contents of the table just so that you can see what I mean I'm gonna say select top 100 star from dbo users just so that I can throw some users up on the screen and you can glance down at that last access date you can see that some of them make the cut and some of them don't and they're not sorted in order and when you and your friends go

**31:08** · into the supply closet you can't edit these pages people often think they're like well I'm gonna sort these pages out into order no no no you can't because they're multiple rows on each page the match and you're gonna have to sort them in a more fine-grained way and you're not allowed to tear these apart other people are trying to access these pages at the same time and sequel servers trying to get you in and out as quickly as it practically can so how are we

**31:37** · going to do this I'll give you a moment to think about how we're going to execute this as I take a sip of my tasty beverage so what I'm gonna have to do is I'm gonna have to go get a piece of scratch paper I'm gonna have to get as long as we're going into the office supply closet I might as well steal stuff so let's go rip off some company post-it notes so when we go with our friends

### Office Supply Closet

**32:04** · into the supply closet when we go take a team of people into the supply closet we're gonna say you go tackle those thousand pages over there you go tackle these thousand pages and I want you to read through here and find the people who match that last access date greater than 2014 oh seven oh one and write stuff down now what are we going to write down if I need to go get all of

**32:30** · the IDs and I need to sort them by last access date what am I going to write down on my little piece of paper Jedi Mind gorilla says would you also sort it by the ID and add it to the first choice I wish that I could tell users how to

**32:48** · write their queries you know I wish I could tell them hey I want instead I would like you to order it by ID or whatever just to make my life easier and unfortunately users don't seem to react well to that I'm like hey users could you just do me a favor and change your query to make it match the database and they tend to give me a finger and they're never using this one they're never going Brent your number one pager

**33:10** · Reb says is this what temp DB rights are for you're coming into something interesting here so a sequel server does when I go execute this query let's go look at it and look at the execution plan yeah Brent your number middle that's exactly what they say to me now now our execution plan has multiple operators in it I want you to think of every one of these operators as like a standalone micro service it's a micro

### Execution Plan

**33:38** · service that's completely independent it has its own surface area its own input parameters and output parameters so the first micro service that runs is that sequel server is going to scan the clustered index this is the only copy of the table that we have so in this little

### Microservice

**33:58** · micro service here see servus says i believe about a hundred and forty nine thousand rows are gonna come out and he's right his statistics are pretty good here he understands exactly how many rows are gonna come out if i hover my mouse over this operator

**34:14** · if i hover my mouse over this operator hi muhammad down at the bottom there's an output list and the output list says here's what this micro-service produces the arrow coming out of this micro-service is just a yelled list of a

**34:32** · hundred and fifty thousand last access dates and id's so i can see in there the predicate is the stuff that i was looking for now frozen swede says i after looking at a bunch of your sessions now during quarantine i've gotten the impression that order by something to be avoided unless you want to get publicly flogged yeah but you know what again users do all kinds of things that i'm unhappy with and so what i want to show you is why it's a bad

**34:59** · idea to do in the database if you have a choice if you have a choice between doing it or not so in here this micro-service produces a hundred and fifty thousand IEDs and last access dates so if i hover my mouse over this arrow that's exactly what this arrow is it's a hundred and forty eight thousand last access dates and i d--'s passed on to the next microservice and the next microservice is going to write those down and sort them if you see down here

**35:32** · at the bottom it says order by last access date ascending so that's what this little micro service is doing and in order for this to work this micro service had to allocate memory when queries work they use 8k pages just like

### Memory Allocation

**35:50** · data pages now I like to use post-it notes during my explanation because it feels like that's more intuitive but really under the scenes what it's doing is it's just granting 8k pages out of your RAM in order to execute the query and you can see how many pages they are if you go into the selects properties I can see up here memory granted

**36:13** · before sequel server starts a query he has to come up with how many 8k pages he thinks he's going to need to do this in sequel services well based on my data I think I'm gonna need about thirteen megabytes worth of RAM these numbers are shown in kilobytes and I just you know it's too hard for Microsoft to put commas or decimal separators inside there so I just have to some kind of frozen caveman and I have to tell you what they mean thirteen megabytes worth of RAM in order

**36:42** · to run sequel server caches a few different things it caches query or caches data pages it also needs memory in order to do your query workspace it didn't need Ram before for this query because we didn't need to write anything down but now we do so sequel server then

### Parallelism

**37:01** · goes in sorts all of that data and then come back out of here then there's this parallelism icon which is a little bit confusing but let me tell you how this really works everything from the parallelism icon down stream and sabi

**37:16** · SAS can the sort even be run in parallel that's a great question that's exactly and I know look I say it's a great question a lot I really do think they're great questions I get absurdly excited when I get to share this stuff with y'all because when you ask a question I'm like ha damn that's the same

**37:34** · question that I asked when I was getting started so I'm not being patronizing these are actually good questions trust me when you ask a dumb question I'll be the first one to tell you those of you who've seen my webcasts will know I don't play around so back to this parallelism icon this is really cool what's really happening is that everything Jedi Mind gorilla says I will get told everything downstream of the parallelism icon got paralyzed here's

### Parallelism Icon

**38:01** · how it worked you know how I said that there are seven thousand four hundred pages over there in the supply closet in real life you know what you would do is you would send your friends into the supply closet you would tell them go scan these looking for all of the people over July 1st of 2014 write them down and sort them you want

**38:22** · them to do that work of sort cager rep I'll get to that question in a second that's a wonderful question and I don't usually go into that in here but it's magical and I'm gonna do it just because you asked and because I've seen you in so inside here before and Martin's right in there it's just that it gets a little bit more complicated than that which is kind of funny so what

**38:42** · you would have your friends do is you would tell your friends hey also take some blank pages inside there and go sort while you're at it because I don't want to have just one person do the sort I want to have all of you break up and sort your own results hi show secon now then when your friends came out here's

**39:00** · what you would do you would gather them around like a conference room table and you'd say okay everyone tell me the first date that you have and they would all kind of hold their cards as if their poker players and they would tell you and you would have them read out their data in order and you would correlate the discussion so that all the data flows out in order you don't need to resort them again but you do need to coordinate all their yelling so that everybody gets the data out in order I adore these little icons on the

**39:30** · execution plans because they show you exactly what the sequel servers doing howdy Angela which always makes me think of a favorite character from a TV show Angela but that's okay so see how the parallelism icon is like multiple things gathering together in a stream that's exactly what's happening here the sort got paralyzed and then there's some overhead in recombining everyone's outputs into one stream in order to send it out the door out to the select icon now we still had to read all

**40:03** · of the pages in the table so we still see around about seven eight thousand reads but this query got a hell of a lot more expensive and to show you how much more expensive it got I'm gonna go run the two queries back-to-back I'm gonna take the Select without the order bye and then one with the order by so you can see the to the top query does not

**40:28** · have an order by let's move this around a little bit so that we can get it on the screen a little bit easier so the top query does not have an order by the bottom one does so the top query has no sort the bottom one does have a sort what's different between these in terms of how hard they were well if I hover my mouse over the select remember

**40:54** · how the query cost for the first one we said was about five query bucks and 87 query cents will the cost on the bottom one is a little bit higher the cost on the bottom one is almost more than twice as high the bottom one costs twelve query box and 59 query cents more than

**41:16** · twice as much all because of this little guy right here all because of that sort if I hover my mouse over there you can see where this cost is coming from see how it says estimated CPU cost five point eight nine query bucks that's where that extra cost came from you can

**41:39** · go if you want to go through query plans and compare the differences between them to see where the extra query bucks came from but I need to stop for a second inside that estimated subtree cost and all the costs that I'm telling you right now and I'm actually gonna change cameras here for a second that cost

**41:57** · number holy cow it's dark out there I can fix that or that balance is dark oh I can do that I can do the Blair Witch thing again there we go dime I know I can fix better than that hold on a second here I'm gonna change the balance on my webcam just so that I can get a better color display off of here because I don't want y'all over some reason it doesn't think okay all right oh no I will damn it please talk amongst yourselves for a second there we

**42:35** · go all right and now now that completely screwed up my entire just chatting camera okay that's great that didn't work worth a damn come back over here buddy I want you reset transformation back out to max that's tiny that's come on make me nice and big there we go up that's much better the the resolutions kind of crappy though let's fix that and move you over here and Ritchie's in here

**43:04** · going diet damnit Brent why can't you do one thing right before the webcast well so this is one of the whoa oh let's move you around and y'all are probably getting seasick watching all this happened live on my stream welcome to live streaming shoot me and hold on a

**43:26** · second here let's get this just right because we're gonna be in here all morning might as well make it look fantastic Jedi seriously like his equipment talking about the web equipment don't get excited there we go all right perfect so now now I can move this thing over in the other direction again so now I said I wanted to talk about query cost for a second whenever you see anything cost related on execution plans it's all

**43:51** · estimates it's all estimates from before the query started and they're garbage they're meaningless numbers you will from time to time just says he says the latest donation box is still empty yeah I got a few other things that I got to play around with inside there I'm and

**44:09** · honestly I don't want y'all donating to me like if you're gonna pay me something I want you to get something out of it like I'd rather you buy my training classes so that you actually get something out and that's where that's why I give coupons to folks who follow my live streams on Twitch Facebook YouTube and all that I give you a coupon during this during today so those costs

**44:29** · anytime you see more absolutely garbage from time to time you'll see people like me use them for comparison purposes but all we're trying to do is really just show you that one is more expensive than the other we're not trying to show you that this is how you should tune queries because they're just garbage numbers if sequel servers estimates were right often it would come to a different conclusion but usually when people bring

**44:50** · you queries to tune it's because the estimates were incorrect and we talked more about that and fundamentals of query tuning I just want to make sure that everybody gets that even though I'm using these costs here to display something quickly it's not necess surely an accurate number to go run with

### Can SQL Server Over allocate

**45:07** · Jedi Mind gorilla says dumb question while you say that they're garbage if a server is busy can sequel server over allocate too much and affect a performance yes absolutely sequel server will make bad decisions and it'll go both ways it'll also sometimes undercut costs for

**45:24** · a query that's massively really expensive and it doesn't go back and revisit these whatever it comes up with is an execution plan that's what it rolls with for life which is I always find really intriguing so if I'm going to compare these two the top ones estimated sub tree cost was hover my

**45:45** · mouse back over there and Jedi mind girl says we need an AI aspect Microsoft is working on that and they've done white papers on it but the problem is of course if they go back and revisit query plants they need CPU to do it it's gonna take work in time Martin says doesn't go back what about intelligent query processing hoho I teach you in mastering query tuning just how unintelligent that really is how it seems like it's awesome but then when you go to use it in real life you're like wait a minute this is made of string beans as an

**46:17** · intelligent query and I don't mean to denigrate the work of Microsoft there's people are brilliant it's just that the marketing people get involved and they call it something that it's not like automatic tuning is the furthest thing from automatic tuning that I've ever seen in my life it's like the opposite of that so the top query it's like five

**46:35** · point eight query box bottom query it's like twelve query box so you could do this with different and VTOL freak I saw that white paper recently from the TI DB folks about trying alternative plans during idle time and I adore that so much I wanted to have that in the weekly links this week and I don't think it quite made the cut I had so many interesting things this week but that is I saw that too and I was soem happy with that sabi says one would think that

### Can SQL Server Sort Results Faster

**47:00** · sequel server could sort the results faster than some random developer yes but sequel server Enterprise Edition is $7,000 US per CPU core seven

**47:17** · thousand dollars US per CPU core in order to license my iPad would cost fifty-six thousand dollars can my iPad sort data as quickly as sequel server no but for $56,000 I can buy a whole lot of

**47:37** · iPads that's why we tell people to avoid sorting in the sequel server if you can you can do it in the beginning before you have to worry about licensing but as that thing scales holy-moly sir Winnie says at least were not an Oracle shop yeah because Oracle Enterprise Edition is $47,000 per CPU

**48:00** · core so to license my laptop we're talking 50 grand times 8 cores $400,000 u.s. to license my iPad holy mackerel and teacher up says do

**48:16** · people actually pay $7,000 a core yes absolutely totally because it's it is really cool it's it's good Jedi Mind gorilla so does enter press says does enterprise handle a sort but standard does not know it has nothing to do with enterprise versus standard it's just that as you grow you generally need Enterprise there are a lot of things that you need enterprise for for example to handle as much memory as my desktop has you need Enterprise Edition seems a

**48:43** · little odd but I digress so the costs are one way to estimate and compare between these two another way to do it is to switch over and say before we had set statistics IO on and what that did

**49:00** · was it gave us the number of logical reads over here in the messages tab let's turn something else on to let's also say statistics time on what this will do is over in the messages tab it'll tell me how much CPU time sequel server used in order to build these query results so the top one with no

**49:23** · sorting involved the top one finished in 45 milliseconds of CPU time the bottom one took more than three times as much now does anybody care about the difference between 45 milliseconds and 172 milliseconds well as it turns out yes because the more

**49:43** · that you run queries like this imagine queries like this on the home page of your website if you have a query that burns 172 milliseconds that means you can only run five or six of these a second and you've maxed out one CPU core remember how a second ago I was talking about the difference between standard and Enterprise Edition well if you want to run five of these a second there goes one CPU core Enterprise Edition goes up

**50:11** · to 12 sorry standard edition goes up to 24 CPU cores 24 CPU core sounds like a lot but if you can only run 5 queries per second per core you're still only talking like a hundred and twenty queries per second would all you'd be able to run and companies like Stack Overflow need to run tens of thousands of queries per second so trying to sort

**50:37** · in the sequel server side ends up being really expensive especially when you learn about how sequel server handles running larger queries because what I've done so far is I've only been selecting ID your users don't run queries like that your users do this select star so

**51:02** · now let's think about how this is gonna work how is it gonna work when we run select star bobby's as I'm starting to appreciate Postgres even more I spend about 50% of my time in Postgres and 50% of my time in sequel server and there are things that when I come back to sequel server I'm so happy for like the missing index recommendations there's a lot of cool stuff that Postgres doesn't do that sequel server does kind of just do for you but for the money it's really

**51:28** · hard to beat Postgres which is why we use it internally in our own company for the applications that we build it's really cheap so now let's run select star so let's run select star and now how do we execute this query if I have seven thousand four

### Run SELECT STAR

**51:47** · hundred people or seven thousand four hundred pages that I got to go pull my data from I'm gonna grab my friends like rudra from Plano Texas I'm gonna grab all my friends we're all gonna go into the supply closet together and we're still gonna have to scan all of these 8k pages and we're still gonna have to write stuff down and sort it this part doesn't change reading the 8k pages doesn't change much there's a tiny change to it but I'm not going to cover it inside this class but this changes a

**52:19** · lot because remember before all we had to write down was ID and last access dates Dennis doughnuts thank you I'm glad you came in this morning and brought the doughnuts I'm looking forward to as soon as we take the next mile break I'll have some of your doughnuts please you can just leave them on the counter and I'll go pick those up I appreciate that that's very kind of you when I want to

**52:46** · go through this select star this is gonna be really different if I turn on my actual execution plans again and go look at this thing school look at how the execution plan works the shape looks the same we still start with a micro service that scans the entire clustered index but now when I hover my mouse over that micro Service and I look what it outputted we still read about 300,000 rows and we output

**53:15** · about a hundred and fifty thousand but look at this hot mess down here now where we are putting all of this stuff Chino says I'm twelve and done don't worry in ten years you'll be 22 and dumb and then at least you can buy alcohol that was what worked for me so here now

**53:34** · this is a micro service that dumps out a hundred and fifty thousand select stars that arrow is now a much larger amount of data flowing into this sort and then if I look at what the sorts doing it's still just sorting by last access date but it has to output all this stuff now

**53:54** · let's talk for a second about those of you who are developers like wait a minute this is ridiculous if I was gonna do this I would go send all my friends into the supply closet and I would only have them write down ID and last access State and I would have them do the sorting here then after they're done sorting I would send them back into the supply closet to get all of the information for every row well that's a

**54:20** · good idea but imagine how many trips you would make back and forth to the supply closet and you and your friends are not the only ones who want to work in the supply closet there are other people who need to access that data too and the other people want to do inserts updates and deletes they want to be able to take

**54:39** · locks but if you wanted to hold locks on this stuff as you are working back and forth you would be a very unpopular person very quickly so what sequel server does is just grab everything that it needs from the first time it runs the micro service and then during the second one this one is a hell of a lot more work but that's your problem how much more work is it let's

**55:03** · go see I'm gonna take Morton says go for snapshot isolation yeah but trust me you you still wouldn't like the results of that one so if I take these two queries back-to-back and one with select ID and then one with select star the first one I'm only getting the ID second one I'm getting select star if I look at the difference in plans they look absolutely identical but start

**55:29** · to hover your mouse over the first one first one remember cost about 13 query bucks the second one buckle up

**55:46** · this is terrible now this is why you'll often hear people say especially angry database administrators don't select star only get the columns that you need and they're right because the more columns that you add to your query especially in combination with an order by the more the query Sox but you want to keep things in perspective the Select star isn't the problem the order by and the

**56:14** · Select star combined together are the problem because watch what happens if I just say select star and I don't have an order by on it at all and I look at the cost of these two in comparison the top query all it has to do is go scan the clustered index if I hover my mouse over the Select star it's only six query box

**56:37** · whereas the bottom one is more than a hundred times higher it's the combination of select star and the order by the sux botsko says what about looking at data in edit mode and SSMS yeah that's kind of bad - you don't usually want to do that so this is bad enough where sequel

**56:56** · server goes through and does this whole entire clustered index scan reading all of the pages from the table scribbling down hundreds of that are hundred thousand last access dates locations all kinds of stuff so this is 10x oh thanks ok I got you those things still thinking about my hundred X difference in the query cost sequel server has a huge spectacular amount of work to do where it's sorting all these little rows here's where this news

**57:27** · really starts to suck I'm gonna run the same query several times in a row I'm going to put in go 10 to make this query go run 10 times in a row and while it runs I'm gonna go fire up task manager so that we can watch the performance on my CPUs while these run so it's settled down to 0 now let's go through and run it 10 times execute and watch the CPU go

**57:58** · if you were gonna send your friends into the supply closet if you knew you were gonna do this query ten times in a row I bet you would say okay folks let's go into the supply closet everybody go scan the table sort all the rows get back to me now I know we're gonna run this query a few times in a row so just do me a favor hold on to these for a minute because if I ask you for this data again in a second or two I need you to be able to re repeat those same results no that's not what happens these get thrown

**58:30** · away every time a query runs sequel server resource it scans the entire table writes out all these rows sorts out all these rows ten times in a row that's why my CPU went through the roof that whole time it doesn't matter if

**58:49** · you're the only one in the database it doesn't matter if the query was just executed it doesn't matter if that data is still in cache it doesn't matter if it hasn't changed it doesn't matter if the database is read-only sequel server still rebuilds the results every single time Sammy says does group-by do the same thing yep joins anything that you do in a query sequel server caches these

**59:19** · sequel server does not cache these this is one of the reasons that Oracle costs $47,000 a core for Enterprise Edition Oracle can do this you can flip a switch in Oracle and you can cash your query results for periods of time so that if someone comes and runs the same query again it can hand you the results without reinventing the wheel but at $47,000 a core it should do that it

**59:48** · should make you coffee and bring you breakfast and wash your car at that kind of money Postgres doesn't do this either so with sequel server how am I gonna make this fast how am I gonna make it so this query runs very quickly over and over again this is I have time so and let's

**1:00:06** · see here as your sequel has it in maybe soon on-premises no pecheur sequel DB does not cache query results either well a next door says or just keep all your rows in hand a ram for more money all these rows are in RAM this table is very

**1:00:23** · small I'm not hitting the disk I have the same problem and Hana has the same problem just cuz they're in RAM doesn't mean they're sorted so payment says it shouldn't need me at all I know right sequel server should just manage itself although on the flipside then we wouldn't have jobs that would not be quite so good now Jedi mind gorilla you've asked a question a couple of times I'm not quite sure what you're asking you say it seems to select star then order by the date but is it really sorting each item but only displaying the sword of the date it is writing down

**1:00:56** · all the whole select star and moving these rows around and yes it's expensive as hell okay so how are we gonna make this fast this sucks pretty bad and we did a faster way to do this we need it so that oh he says I think out loud I apologize habit we don't have to type it man you could just you know say the stuff out loud geez so how are we going to make this thing so that it's fast and have it so that multiples of these can run at exactly the same time without doing so much work that is where indexes can come in since

**1:01:28** · anti-guerrilla yes exactly I don't do Tomio this is where indexes come in and that will be what we get to after the bio break so we've been going for about an hour now what we're gonna do optimize for ad hoc nope not even close same exact problem happens makes no difference whatsoever I love that you would ask that but no that's not what

**1:01:49** · that's for so what we're gonna do is we're gonna take a five-minute bio break I'm gonna go refuel go get myself some more hot water and some coffee and then when we come back we're gonna dig into non-clustered indexes so and and Colonel says an index seek great yes but you have to build the index this is the part

**1:02:07** · where it's your job is you have to go build an index for sequel server so that it'll do it for you so we'll take a five-minute bio break it's two minutes after the hour I'll be back at 7 minutes after the hour and I'll see you back here then so see you shortly \[Music\]

**1:02:43** · \[Music\]

**1:03:24** · \[Applause\] \[Music\]

**1:04:54** · \[Music\] \[Music\]

**1:06:10** · \[Music\]

**1:06:30** · \[Music\]

**1:07:22** · there we go all right so coming on back howdy folks Jedi Mind gorilla says cool view this is probably the one thing that keeps me sane during the quarantine so I've been telecommuting for like 15 years longer than that like 16 17 years and I'm very used to working from home I'm very used to being cooped up I'm totally okay with it you know when I first got started telecommuting it was very tough dealing

**1:07:50** · with being stuck inside I would want to go out to eat go out to lunches dinner or whatever but that having of you is the one thing that keeps me saying these days because at least it feels like I'm outside we have floor-to-ceiling windows in our place we're in downtown San Diego so there's always a view there's always there always things going on that I can go off and look at it's funny I have two

**1:08:11** · different glasses you'll see me switch back and forth when I do stuff like live-streaming I have a different set of glasses for computers than I do for when I look outside or when I'm walking around the apartment Jedi Mind Girl says mine is a boat oh I am jealous that is awesome I would totally love that but

**1:08:29** · although I don't know you know they always say that you don't really want a boat you want a friend with a boat is how it usually works so that they can pay all the money for that kind of thing mmm it's just so nice to just look outside and feel like you're still a part of something that's been absolutely fantastic because the apartment we were in before this we were in apartment in Chicago saving money and the thing was like a dark tunnel we didn't have any kind of view I looked out on like an alley with a track Jeremiah grill says come to Texas we'll take you off shore I lived in Houston for several years during a couple

**1:08:59** · different parts of my life I think I've lived seven or eight years altogether in my wife's family is still in Houston and I thought for sure she'd want to go back cuz it's so cheap the cost of living is so cheap it's a you can get huge property it's

**1:09:15** · it's nice I think pretty much year-round there I like the heat I don't mind it at all but my wife can't stand it she's like my family's still there as long as my family's there I'm not so sure that I want to live there and be close to him and I kind of get it because I kind of get it that the why she wouldn't want to live near her family I don't want to do my family I've done that for years and I'm like not it really family is better if it's about you know two or three hours away at least or plane and that right now it's a little tougher because if family falls ill then it's a little bit harder but hmm alright so back over

**1:09:48** · to the training so when last we met we were doing uh uh Sam says hi I'm an IBM developer company I'm working for is gonna use Dynamics NAV so I'm trying to learn more about sequel server hey so here's the deal don't judge sequel server by Dynamics NAV dynamics is terrible does really terrible things to databases just awful things to databases don't blame single server for that you're gonna have a colorful experience with that amiga live oh my

**1:10:15** · god I haven't heard of amigas in years oh that one I go would actually be excellent so what we were doing was Christopher says I'm a developer for two years from the UK been put on paid leave oh wow that's a mixed blessing right I can't wait to apply your performance videos very cool so in here when last we

**1:10:33** · met we were dealing with a really ugly select star there and even just a select ID will end up killing you even if I go back to just selecting ID and I go run this ten times I said sequel server churns through CPU over and over again sorting your results over and over again and I said if we're gonna make this fast we need some other way to do it and that's where indexes come in so I'm gonna go create an index I'm gonna say create index last access date ID on dbo users last access date

**1:11:07** · thank you Dave I appreciate that an ID \[Applause\] when I create the index the execution plan of the index isn't as much of a point but let me show you what oh where my courses my courses are at brent o--'s are calm so that's where brent o--'s are calm is where you can get all my stuff so if I say select I mean what I'm going

**1:11:37** · to do is I'm going to show you the contents of what's inside the index I'm gonna say select last access date ID from dbo users order by last access date ID so what I'm doing here is I'm writing an index visualization query we go into this and fundamentals of index tuning how you can see the contents of an index when you write a good index visualization query what you should see is an index scan of just that index and

**1:12:11** · nothing else so here I'm seeing a scan of the brand-new index that I created for those of you who printed out the pages printed out the materials these are the black pages of the index is this applicable for most databases it's hit or miss it's hit or miss some things are relevant some things not so much so in here what I'm looking at is the black pages of the table now the black pages of the table because they only have last access date and ID I can cram way more

**1:12:45** · users per page then I can with the clustered index this copy of the table is way smaller because it has less data in it and you can actually see the size comparisons if you want to with a tool called SP Blitz index if I say SP Blitz index table name equals users s people

**1:13:09** · its index is a totally open source such script that we distribute in our first responder kit it's available on github if you google for s people its index it's all kinds of stuff out there about it and the only thing that I'm concerned with in this result set is the first set of columns first set a column says here are the indexes on the table so here's the white

**1:13:30** · pages the white pages of the table aka the clustered index have all 300 thousand rows and they take up 58 megabytes worth of space because they have all the columns however down here the non-clustered index this only has last access date and

**1:13:50** · ID so this even though it has all 300,000 rows is way the hell smaller way the hell smaller like 10 times smaller so if you're gonna scan something it's gonna be way faster to scan this than it is this just that this isn't gonna have all the columns inside of it the other thing that you're gonna notice is that I now literally have two copies of my table every time I do an insert update or delete I got to change both of these I got to keep both of them in sync there's no concept of like asynchronous

**1:14:22** · indexes yet hopefully there will be at some point in sequel server we have kind of hints of it in an undocumented feature but there's no concept of disconnected indexes right now where I can keep my indexes up to date later Jedi Mind gorilla says that's an awesome use of the Blitz that tells me a ton that I was curious about yes this is one that table name method is one I use constantly in order to show which indexes are being useful and which ones are not so now when we go back to our

**1:14:51** · query sequel server has a decision to make now when I go to run this query let me go put that up on the screen just kind of organize my screen a little bit here to make it easier for y'all now when I go to run this part of the query sequel server has a decision to make should it use this copy of the table or this copy of the table well if you are

**1:15:15** · gonna send your friends into the supply closet it would be pretty obvious what you would do you'd be like look don't scan the entire table I've got a copy that's organized by last access date right here all you have to do is go run to the last access date copy and start reading the rows out and that's exactly what sequel server does now I only have

**1:15:36** · one micro service inside my exit you should plan and again I love these execution plan icons and the names they tell you a whole lot about what sequel servers doing now sequel server says on the non-clustered index the index that we just created I'm going to seek intuit

**1:15:56** · sequel server is going to open up to a specific page and start reading instead of a scan last time we were doing scan but now the data is organized in exactly the way that we want and if I hover my mouse over this it tells me here's the

**1:16:13** · thing I faked into the seek predicates says I'm able to jump directly to one specific last access date and start reading and the hits keep coming if you look further up how many rows did I actually read I read way less rows in

**1:16:30** · order to to find the rows that I need so the index now Peter I'm gonna address that one later it's a great question but I'm gonna hit to it later and I'll explain why that is so in here sequel server read less data instead of reading 300,000 rows now it only reads a hundred and fifty thousand rows before when we had the clustered index scan sequel server was reading about seven eight thousand pages now we only read 335 this

**1:17:01** · is the conventional wisdom that everybody kind of gets indexes help you read less data but that's only half the story indexes help CPU time drop because the amount of time that this thing needs in order to execute if I go look at the messages tab well pal now my CPU is down

**1:17:24** · to just 16 milliseconds before when we were having to do all that sorting and all we were talking about a hundred 170 milliseconds where the CPU time now it's down to 16 milliseconds that's freaking nothing this is the second benefit of indexes not only do they help you read less data they also do less CPU work

**1:17:50** · now in this case this particular index is called a covering index because it perfectly covers the query that we're running but as soon as I change the query that will no longer be the case for example what happens if I say also give me display name and age now we have

**1:18:15** · a problem because now sequel server can't use one index one non-clustered index in order to accomplish this goal if you were gonna go send your friends into the supply closet to go do this you would give them one of two options you could either say go into the supply closet and scan the entire table just

**1:18:41** · read all of the rows altogether and then go sort them or you could go into the closet go seek to the specific rows that you want my last access date write them down somewhere and then go do a bunch of key lookups over here over to this table in order to get the rows that you want let's see which one sequel server did in this case let's turn on actual execution plans and run it and here's what it did

**1:19:10** · remember if we read from right to left the first thing that sequel server decided to do was a clustered index scan sequel server didn't use the index sequel server ignored our index more on why here in a minute sequel server scanned the whole entire table it outputted all those IDs last

**1:19:30** · access dates then in the next step it writes down all that stuff and sorts it meanwhile clippies up here going hey buddy you know would really help if you had another copy of the table too I love making copies of tables anytime you need me I'll be in the supply closet making copies he doesn't care at all

**1:19:51** · about how much slower your inserts updates and deletes get all Clippy cares about is how fast he can make queries run he's not even really good at that but he has a point the query would be faster if we had that index how much faster that's an item for debate so why didn't sequel server use the index in order to figure it out what we're gonna do is we're gonna change this last access date to say 2020 and

**1:20:20** · then run the query again if I go look at the execution plan now it looks totally different now sequel server said oh I know there aren't gonna be a lot of rows that match I estimate that one row is

**1:20:36** · going to match sequel server even if he's pretty confident there's no data he still thinks you're looking for rows that exists so he says I estimate there's only gonna be one row so I'm gonna go send somebody into the supply closet to go look up in the index I'll have them go right down the ID and then I'll have them go do a key lookup

**1:20:56** · because here's the thing we got to do a key look up against the clustered index because we aren't our non-clustered index doesn't have display name and age we got to go get display name and age from the clustered index which does have all of our columns doing this key lookup adds additional reads the more rows that

**1:21:21** · we find in here the more reads we would have to do in here in order to prove it what I'm going to do is go back to the original date I'm gonna go back to 2014 and then I'm gonna run the query two ways I'm gonna run it letting sequel

**1:21:38** · server choose what it wants to do and then I'm gonna give it a hint you know kind of like how when my wife gives me a hint it's not really a hint it's more of a requirement I'm gonna say index equals and I'm gonna tell sequel server which index to use so then I'll run those two queries back-to-back the top one sequel server gets to choose in the bottom one I'm telling sequel server so in the top one we did a clustered index scan the bottom when we did the non-clustered index seek plus a key lookup in the top

**1:22:11** · one I'm gonna set off stats time for just a second sad statistics time off turn that off and then go run these two queries again just to clean up my messages tab a little in the top one we read about 7800 pages we scanned the whole table in the bottom one whoa that's more pages than there are in the table we read half a million 8k pages

**1:22:41** · how does that even happen well here's how it happens the first thing that we start with when we run that bottom query if I run just the one that does the index seek plus a key lookup if I run the bottom query the first thing that sequel server does is he doesn't index seek in here and he pulls out a hundred and forty-nine thousand rows and then for every row that it finds over here it

**1:23:10** · actually does this multiple times I really wish that execution plans were three-dimensional I wish they popped off the page in terms of the number of times that they were executed because when we look at that execution plan it's very tempting to just think of it as one key lookup that was done one time but that's not what it is at all it was done a hundred and fifty thousand times and each time that you do it it's multiple

**1:23:38** · logical reads that's where all these reads are coming from you're sending your friends back into the supply closet to look people up one row at a time so sequel server made a smart decision here and it made this decision all based on that number or that date if I change

**1:23:59** · it to something that doesn't produce a lot of rows then sequel server uses the index if I change it to something that produces a lot of rows it doesn't use the index sequel server has to figure this out before your query even starts

**1:24:16** · you're not allowed to send your friends into the closet Oh mr. pshaw says how to use to get time to show in the execution plan it's with newer versions of management studio so if you get newer versions of management studio and sequel server I want to say that this has been out for a year or two maybe ballpark don't quote me on the exact time it's been maybe a year or so and also it'll only show on the actual plans not the estimated plans Saturday night

**1:24:47** · sequel server that's pretty much how all of my weekends go well as a side note so what what is it that I do why am I here with y'all why is it that I get up on Saturday mornings and go do this kinds of thing so the reason why I do this is that my wife sleeps in on Saturday and Sunday mornings this is her weekend so she'll go off and sleep in I don't do client work on the weekends unless somebody hires me they can hire me for a weekend emergency rates mr.

**1:25:14** · Pease Upshaw says I thought I was on the latest version it's okay it's alright if you're misled from time to time sorry so she sleeps in and she even just texted me while I was streaming and she's like hey I you know hear that you're up and around you can go ahead and go out and get breakfast on your own whenever you wake up so at 8 a.m.

**1:25:33** · whoo I am out of here well it's I might push it to 8:15 because I'm gonna place my order online and then go down there and they'll have it ready for me but be pretty close all right so back over here on the one is the loneliest number so

**1:25:51** · how does sequel server do this sequel server has to figure out before he sends his friends over into the supply closet sequel server has to figure out how many rows are gonna come back for your query and he's not allowed to look in the supply closet he can't go take a peek so how does he do it the way that he does it is every

**1:26:08** · time that you create an index sequel server creates statistics with exactly the same name so you saw that I have a clustered index and I also have this new index that we created on last access date and ID yeah it's very bad magic this is actually pretty cool magic I kind of like this so here sequel server creates statistics automatically with exactly the same name so you see there's this statistic down here called last access data and ID so what's a statistic a statistic is one a

**1:26:41** · kay page worth of metadata to describe the contents of the object so if we create an index sequel server creates one a K page with data about what's in the supply closet it's fair for sequel

**1:27:00** · server to look at this but it's not allowed to go into the supply closet to actually examine the object so what's on this now seeing the contents of statistics is not something that I do every day I don't want y'all to think that this is a core part of my troubleshooting rate stuff well last night you can go start watching this of the session again from the beginning to catch it I won't go won't go revisit that one at this point so I'm gonna say

**1:27:29** · dbcc show statistics dbo users and last access date ID all right now if I come back in here I don't want you to think

**1:27:45** · that I run this all the time i frickin never run this the only time that I run this is during training sessions so that I can show you how sequel server thinks I usually don't need to look at stats on a column to understand what's going to be in there and neither will you the more familiar that you become with sequel server what this is is it's one 8k page worth of metadata so there's not a lot in there let's see how it works the first set says here's the stats name

**1:28:13** · here's the object that it's on it's on last access state ID index the last time we updated is May the 16th at that time there were three hundred thousand rows in the table in the object and sequel server sampled all three hundred thousand rows the larger no Martin

**1:28:34** · you're not right there that's actually not true so hold that thought so y'all are y'all are going into all kinds of other questions so let's hold on and focus on this for a minute because this part is gonna be kind of tricky as you go through and learn this and I know a lot of you think that you know things inside here although you don't want to look stupid just as a side note try to avoid answering things during other people's web hasser sessions because you don't want to look dumb when it turns out 30 seconds later that your answer was wrong the thing that you want to do instead is say a friend of mine said a friend of

**1:29:07** · mine said or I read somewhere that that way if you're completely and hellaciously wrong you don't look stupid just your friend does and then that way when I tell you how wrong your friend is you can be like oh yeah that guy's pretty bad he does drink at work a lot also he's me but so just as a sign

**1:29:26** · adoring his Jedi Mind Tricks to make him miss the comment that works as well you type real fast make lots of comments and then it hopefully blows past so this is one 8k page worth of metadata this object had 300,000 rows in it but the longer my boss says your boss it has a

**1:29:51** · 300 thousand rows that's a relatively small object but the larger that your objects become the more sequel server starts to resort to sampling it'll just pick random rows or random pages out of a table it has a strategy for it but it'll sample just like a political pollster does you know how political pollsters when they want to find out how everyone's gonna vote in an election they don't have time to call everyone on the phone and ask them all how they're gonna do they just sample so here sequel

**1:30:20** · server sampled all 300,000 rows so it has a really good picture then this statistic is on two columns last access date and ID but here is the statistic here's the part that's really interesting sequel server has up to 201

**1:30:38** · buckets this is a hard-coded number because this is all sequel server expects to be able to fit on one 8k page other databases have different kinds of options but sequel server is going to give you 201 buckets and then the buckets describe the contents of this index for example in the first bucket for last accessed 8 equals August the first of 2008 there is exactly one user

**1:31:05** · with that last access date which tells you for example that's when Jeff Atwood and friends started developing Stack Overflow that was the first date inside that database Oh Dumitru thank you I appreciate that way

**1:31:31** · up the next time we get sound effects when people subscribe as well so in here there's only one row with a last access date equal to that now in the next bucket the next bucket feels a little different in the time of last access dates between August the 1st to November of 27th of the same year there are 1,200

**1:31:55** · rows in that bucket one row is exactly equal to this and then out of those other 1222 rows they are all distinct last access dates well of course they are because it's a website not everyone logs in at the same time people are gonna log in at wildly different times so all of our data is going to be distinct this is exactly how sequel

**1:32:22** · server guesses how many rows Brando's are is brilliant I'll give you 15 seconds to stop that flattery so this is how sequel server projects how many rows are gonna match whatever your predicate is so a second ago when I ran the query and I said hey show me all the users where last access date is greater than 2020 July the first sequel server opened

**1:32:47** · up its statistics scroll down fest 3 says this guy is smart I guess yeah that's probably ahead too it's fair sequel server goes down through these statistics and the most recent date that it has is September the 9th because well really I guess I'm

**1:33:07** · gonna estimate one row sequel server always assumes that there's going to be data that matches yours Sammy says do the stats update with index updates that's beyond the scope of what I'm going to cover in this session I do talk about it in fundamentals of index tuning though and I'll give you a coupon for that at the end of the session so that you can get it for less than five bucks and then go continue on with your learning journey so if I change these dates I'm gonna take this date right here I'm gonna copy this out and I'm

**1:33:37** · gonna say back over on my query where the last access date is greater than this and we'll say greater than or equal to this whoops let's go through and run it like that now how many rows does sequel server think is gonna come back one which makes sense because if I go back and I look at my statistics histogram dad is the high key that's as high as it went let's go one earlier

**1:34:04** · let's go a little bit earlier and let's see what his estimates look like paste and go try it again and look at what we have here sequel sorry I get so excited with the stuff we just though it's just cool how it works so sequel server says I believe they're gonna be about 748 rows that come back from that where did he get the number from back over on statistics look at what we have here so

**1:34:32** · there are 746 rows in this bucket itself plus sequel server thinks there's probably one beyond just assumes that there's always going to be an extra row and then it also knows on this exact date this row itself is included as well oh this is so neat this is exactly how

**1:34:51** · sequel server is figuring out these estimates and you can use them too so this is how when sequel server said back when we asked for everybody higher than July the first sequel server said okay what I'm gonna do is I'm gonna go open up my statistics I'm gonna look for a July the first of what date did you use I'm real forgetful

**1:35:10** · July the 1st of 2014 she's gonna go all right well I don't really have an exact bucket for July 2 2014 I know some of the rows in this bucket are gonna match and then all of the other rows so sequel server goes and adds up all these numbers scrolling down through here and this is where it comes up with his estimate this is how he figured out yeah you're welcome this is how he figured out how many rows were gonna match when we did this query and that's why he said oh my god if I

**1:35:42** · have to execute that query doesn't make sense to use the index because I believe about a hundred and forty eight thousand rows are gonna come back this concept is called the tipping point where it makes more sense for sequel server to use an index versus where it makes more sense to just scan an object like a table and

**1:36:03** · here you can start to see it as you try different dates for the same query where sequel server will end up making different choices depending on which how many rows that thinks are gonna come back and how the indexes are going to work well meanwhile we got Clippy hey

**1:36:18** · buddy oh you know it would be amazing I'd really Sergio that's a great question I'm gonna leave that off for a separate session though I have a course just on statistics so if you go to my youtube channel and look at statistics there's a whole course just on it Martin says century one even has tipping point info in the newest release of the great free tool plan Explorer

**1:36:50** · I love their idea it's a great idea it's okay so here's Clippy oh my god buddy you know it'd be amazing oh hi chick I really need an index and he's right in this query would be a little bit faster if we had an index to completely cover this Parrish says can we parameterize this for a better plan you can parameterize it and get a worse plan only and I talked about that in my class fundamentals of query tuning so so

**1:37:19** · I'm gonna make a bigger index I'm gonna make an index that matches what Clippy wants to do but before I do that I'm gonna show you how to kind of see it in your own execution plans in here I ran the query that used the index I looked for a fairly recent date and a dozen index seek plus a key lookup when you see key lookups if you need to get rid

**1:37:41** · of them for some reason they're not always bad in this case they're actually fine this query runs so insanely fast no one would complain but if you had a key lookup and you wanted to get rid of it you could if you're lucky get a hint from Clippy but you don't have to the other thing you can do is you can just hover your mouse over the key lookup and you get down here the objet or the output list sequel services well I I had

**1:38:08** · to go do this key lookup because these two columns down here display name and age they weren't on the non-clustered index if you could just add this to the non-clustered index I can make that key lookup go away so let's do it I'm gonna go create another index and Clippy says just include these columns I'm gonna put them in the key and I'm not gonna go into why here but I'll go I go into why in the written version of this class so if I say display name and age and then I'm gonna say display name

**1:38:41** · and age up here I'm gonna go create a wider index now those of you who are following along with the printed handouts this is the gray piece of paper in your handouts those of you who didn't print it to follow along can kind of get an idea of what it is when I hold it up to the screen you can see that this index has last access data night but it also has display name and age so I can't fit as many users per 8k page on

**1:39:12** · this one the size of this index is larger is physically larger if you include columns or you put them in the key in both cases they are on the 8k page so just to show you frozen Swede remember what you're supposed to say a friend of mine said right there we go so here I'm gonna make

**1:39:40** · these indexes we just include now in this case frozen sweet is correct but yes so let's go create an index that just includes those two columns and then let's go look at our friend espy blitz index again SP blitz index table name equals users so in here now I have these indexes up on the table I've got the black pages the ones on just last access day the night

**1:40:11** · Thank You bhai very cool and two for those of you who have Amazon Prime you can use twitch Prime doesn't cost you anything by subscribing to channels with twitch Prime it gives them a kickback - so it incentivizes them to keep speaking and I don't say that just

**1:40:29** · to get me to keep streaming I'm gonna side you if you just locked me in a door or lock me in a room somewhere I'm just probably gonna start streaming things live not in an attempt to get out just because I like streaming yeah but if you have other streamers that you like to follow by all means encourage them follow them subscribe to them so that it is sequel server streaming itself is just kind of getting started right now there are only a few of us who are doing it so it just encourages more people to go do it so in

**1:40:52** · here I got my three four indexes I got the black index on last access date an ID then I got these other two indexes with you because I'd hate to be the EU guy without the chance to get your training sessions I'm working on that it's just really hard your country doesn't make it easy and they make it really expensive if I screw it up or your your uh it's that country what do they eggs actually call the EU some cat says will the stream remain accessible later this week yeah it'll be even twitch lets me keep it up for sixty days and then it'll be on YouTube forever

**1:41:22** · Facebook for forever I think mixer is forever - I'm not as well not sure on that one as well so look at the sizes on these though it doesn't matter whether the indexes are in the key or the or where the key columns are in the index includes shakaar just like a typical youtube commenter you say what is something and how do I do it I know I do a lot of

**1:41:58** · things for you for free I love doing things for you for free but searching the web for you it's where I draw the line that's where you're gonna get up off your lazy bum you're gonna go do it yourself so now in here these two indexes at the bottom that are on last access date and ID and then they have grumpy games over you can see why grumpy game to have subscribed comments like that it's like I gotta follow this guy he's kind of dumb sabi says dumb questions mean ASMR that means LG LM

**1:42:29** · GTF why that's what that means so and I'll talk I'll put it out there in terms of L GT and won't me let me build an for you there you go so in here those two indexes that I have highlighted it doesn't matter whether the columns are in the keys or the includes they take up a whole ton of space so I don't want you getting hung

**1:42:52** · up on thinking which one of those two is better putting them in the includes or putting them in the key for mine I'm just gonna put all four I put all four of them in the key like this and the reason why I did that will become more obvious later here in a minute display name age oh there's no commas inside there whoop-de-doo hahahahahahaha cool

**1:43:14** · LP says I love I love how you do that yes very smart do something already in the septum zero cool pieces a friend of mine saw a video panel panel davay at past said that one index can affect the performance of other queries he's right he's totally right and I love his demo for that it's really cool how that demo works okay so created this index and what this

**1:43:39** · index lets me do is that now when I want to run this query and I'm gonna run it at first with the small date range I'm gonna run it with the small date range which before was doing an index seek plus a key lookup but now that I have my fancy pants index now that I have my

**1:44:02** · fancy pants index that covers the whole thing I just sneak directly into there and I read the rows out Oh so that's fantastic but wait there's more now when I run it for the big data range when I go all the way back to 2014 and I execute that if I don't type II I hit ctrl e when I execute that I also get that sheep Korsak you look up it doesn't

**1:44:31** · even matter if I take the where clause out if I take the where clause out of the query altogether sequel server still uses that index because it's a narrowest copy of the table that achieves our objectives this is a covering index that works absolutely beautiful for this query but the order of columns is so

**1:44:58** · incredibly important oh why G dev says nice and encouraging teacher oh thank you thank you my whole my whole goal with this whole streaming and everything else like that is to make things suck less than it did for me when I was starting up cuz man yo when I started up learning

**1:45:19** · \[Music\] so when I started up when I was your age I had to go through like stone tablets something that they called books online which wasn't even online it was offline was kind of like directly into your computer and there was no internet whatever Manny says so there's

**1:45:42** · no use of the included clause there is but I'll talk about that in my class fundamentals of index tuning that you'll get a coupon for here in about 15 minutes when I get bored of you and I go off and go go get my coffee downstairs cloud DB says what is the difference between your index from the sequel server missing index mine has all four in the key so now let's go talk about why that matters so in here I've created

**1:46:07** · this index right here I've said I want an index on last access state ID display name and age now I'm gonna write a couple of queries and in fact I'm gonna drop all my other indexes I have a stored procedure called drop indexes which goes through and drops all my non-clustered indexes it's great thing

**1:46:29** · to do right before you leave a job just all on your way out the door to run that thing and of course I'm kidding so now I have that index and nothing else sequel server loves using that index it's more than happy using that index for that query what about for other queries let's try writing another one so let's say here's my index up at the top let's say select ID or we'll say all four of a last access date ID display name age

**1:47:00** · from dbo users where display name equals Brent Ozar and let's go run it we'll sequel server use this index we'll sequel server use the index that's up there in order to accomplish this query I'll let y'all tell me over in chat twitch whatever chat messages you want I

**1:47:25** · want to hear will this query when I go look at the execution plan will this query have that index in the execution plan yes or no let's go see 10 seconds oh that's not enough answers

**1:47:48** · let's go see cuz they're like what are there now 130 of y'all just didn't which alone so I'm gonna make you an insert before I go on I want to see at least like 2030 answers before I answer it so

**1:48:08** · all right so let's go see so if I execute that query and I go look at the execution plan so it did but what a lot of you nailed is that it's not a seek it's a scan sequel server scanned the

**1:48:28** · whole entire thing and you can see it if you hover your mouse over it if I hover my mouse over it I can see the number of rows read how many rows did sequel server actually read in order to produce these results so sequel server read all the rows in here and you might be thinking wait a minute Brent what if it's gonna read all the rows why not just do a clustered index scan video \[Music\]

**1:48:58** · thank you for people I appreciate that and mr. pshaw or mark mark Shaw if I remember right mark Shaw says we just scanned it because it's smaller and that's exactly right let's go back and look at the contents of our two indexes the top one is the clustered index aka

**1:49:19** · the white pages of the table the white pages of the table have all 299 thousand rows Mike that's what it is Mike Sean thank you two hundred ninety nine thousand rows but it's 58 megabytes in size the index with last access state display name and all that it's smaller it only has 13 megabytes so if you're

**1:49:41** · gonna send all your friends to the supply closet to go scan pages do you want them scanning the big stack or the short stack now I want pancakes you'd want him to have scan the short stack you want them to scan as little data as possible in order to get the job done that's exactly what sequel server does he scans the narrowest copy of the table but it ain't a seat we are reading the whole freaking thing and you can see it when you see number of rows read 300,000

**1:50:12** · the order of columns in an index is super important whatever you have in your query in things like where and order by really need to be one of the first columns in the index and teja red nails it only the first key column is C Keable as long as you're seeking as long as you're specifying that first column you can seek directly in Jedi mind gorilla says so if you had to whereas the last access date will it seek yes

**1:50:44** · sort of now watch this let's say we're last access date greater than 1800 o 101 and display name equals Brent Ozar Paul

**1:51:00** · good god here you're welcome so now when I run this query this is kind of messed up sequel server now remember I always use a guy's voice for sequel server because he's dumb and stubborn and he refuses to ask for directions he's all trussed me I got this when he doesn't usually got this at all here sequel services no trust me I got

**1:51:22** · this I got this index right here and I can seek on it okay sequel server what are you gonna seek to up I'm gonna seek to the days of the covered wagons I'm gonna seek to 1800 and then I'll start reading what we what how many rows are you going to read sequel server but all of them I'm gonna read two hundred ninety nine thousand wait what seek the words seek doesn't

**1:51:50** · mean it's lightweight doesn't mean it's fast seek literally only means I'm gonna jump to a point and start reading you could jump to the first row of the table you could read the whole thing that's

**1:52:09** · exactly what we're doing here that's what Teja Reb says that's what I would call a scan that's I agree with you this is what I would call a scan but that's not what sequel server calls it sequel server calls this a seek because it jumped to a specific value what I want

**1:52:29** · you to get here is just because you see an index seek on a query plan doesn't mean it's a good index doesn't mean that it was fast you could be reading the whole entire table conversely just because you see scan doesn't mean it's bad watch this if I

**1:52:50** · say go select top 100 star from dbo users and I don't put in a executor don't put a where clause on there Martin Guth you and I are thinking absolutely on the same page there if I look at this I say hey sequel server go get me the first 100 rows and I don't care which hundred you give me sequel server just only reads ten or a hundred rows he jumps right to the beginning of the table reads a few pages and he's out of here for this a clustered index scan

**1:53:22** · is perfect I don't think that you could do any better than that for this particular query I don't want you thinking that index Sikhs are good and index scans are bad they're just different tools that make sense for different times what I would probably say is what kind of would put last access date greater than 1800 Oh 101 in their query it's just idiotic

**1:53:49** · if you're going to be looking for something unique like display name equals Brent O's are you know what you really need is you need an index on whatever that column is if I go look back at the execution plan Clippy doesn't have any ideas clippies like I got no suggestions if you need me I'll

**1:54:12** · be over here reading the whole table every time it runs going all the way back to their days of covered wagons love you buddy you paint a lot of dollars for my CPU cores I I figure you should get your money's worth out of there this sucks you could do way better if you had five minutes worth of time if you had five minutes worth of time you would look at the contents of this where clause and say hey you know what order really matters I don't want my index for this

**1:54:42** · query to start with last access date because it means I'm seeking back to the days of covered wagons what I need instead is I need an index on a different column order I might need an index display name on dbo users display name and I'm not even going to put anything else in the index just display name and nothing else let's go create the index just on display name and let's see if sequel server will use it now for this query and of course he does sequel

**1:55:16** · server knows because there are statistics on the display name index sequel server knows that they're only going to be a limited number of rows that match so now he's able to seek just directly into Brent Ozar and then sure he does a key lookup in order to get the extra columns that we didn't have on the index but who cares one key lookup is actually great for this this is phenomenal now what we saw before was just an index seek in the plan and nothing else and that's sucked sequel

**1:55:48** · server read the whole queer read the whole table here we see an index seek plus a key lookup this is actually way faster and less logical reads day our Rebbe says can sequel server any other Rd MEMS do a key look up to another index yes so sequel server can use two

**1:56:09** · different indexes to accomplish the same query what I'm going to do is I'm going to drop both my indexes and then I'm gonna say create index display name on dbo users display name and then I'm going to create an index location on dbo users location so now I've got two indexes there then I'm going to write a query to find the stuff that I need I'm gonna say select star from dbo users where display name like brent and

**1:56:43** · location like California well we'll say San Diego San Diego so let's see what sequel server decides to do here it could use either index or both let's go execute and see what he decided to do and

**1:57:04** · \[Applause\] \[Music\] it's phenomenal sequel server decided based on the selectivity that it should find all the Brent's it should find all the people in San Diego and then see where that overlaps and he makes different decisions based on what you're passing in if something on there is really unique and selective like for example if I say Brent Ozar and San Diego CA USA we might just use one index

**1:57:34** · sequel server might use the statistics and say you know what that display name is really unique I don't have to bother going across different indexes so vino myth says can someone point me to a good query plan visualizer the sequel server studio one is only worth when exported in XML a lot of people like century one

**1:57:53** · plan Explorer so century one plan Explorer it's totally free you don't see me using that during my sessions just because I try to stick to the native tools as much as possible to meet everybody where they're at but century one plan Explorer is pretty cool if I had a full-time DBA job again if I had to put on a suit and go to a real office probably throw myself out of a window but if I had to go back into a real job again I would probably do I used to be a database administrator and I know it's hard to believe but a developer Peter

**1:58:20** · says how do the estimated plans look like for these queries well this is the point where we're at the end of the class and I will point out that you are welcome to do all of this stuff everything that I do I'm a totally open source so for these databases you can go to Brent Ozark comm go query stack so if

**1:58:40** · you go to Brent Ozark comm slash go slash query stack you can go download the stack overflow databases and you can try these experiments yourself I'm running on the very smallest version of stack overflows databases the one that's just ten gigs in size here to make it as easy as possible for y'all to follow along with these demos so now we are at the end of today's training so we are coming up on eight o'clock San Diego time it is time for me to go downstairs and go get a nice pour over coffee and a

**1:59:14** · salmon bagel so I want you to be able to keep learning so for you to keep learning I going to give you a coupon where you can get my next class so I'm gonna go put this in over there and we're in the chat so that you can get to it and the coupon code equals wash them hands we'll put

**1:59:35** · that in over in chat as well so if you go get that that'll get you my fundamentals of index tuning recorded class you can go hop into that and start watching it's built atop the stack overflow database as well so that you can then go in and slowly five bucks after the coupons so everybody can afford it and then that way you can jump in and go right on learning about things like how do you choose which columns go first in an index how do you write visualization queries how do you know when you're getting a good seek or a bad scan or whatever so there you go it's

**2:00:05** · like 95 percent off it's usually a hundred bucks you get it for five bucks it is good for today only so it's something that I get back to folks who are watching the streams so that just that you can keep learning and I hope you all stay safe and healthy and enjoy your weekends so go have fun and wash

**2:00:23** · your hands because heaven forbid when I see y'all I want to be able to shake your hands and all that Bosco says how long will this be free and our purchases it's a one-year subscription so you get it for one year it's not totally free it's just five bucks so or like it's under five bucks now cloud neaby says what's the code the code was up in chat but it's washed them hands so I'll put it up there again in chat so that you can see it wash them hands and hopefully y'all have fun have

**2:00:50** · a good weekend and I certainly will I will see y'all later adios