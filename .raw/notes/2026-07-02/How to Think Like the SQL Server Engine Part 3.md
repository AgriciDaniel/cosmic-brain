---
title: "How to Think Like the SQL Server Engine Part 3"
source: "https://www.youtube.com/watch?v=EmSN9IzXecU"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-09
created: 2026-07-02
description: "We finished part 2 by adding a nonclustered index. Now, let's see all the ways that makes our query go faster. Then, we'll add more columns to our query so that the index isn't covering anymore, and w"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=EmSN9IzXecU)

We finished part 2 by adding a nonclustered index. Now, let's see all the ways that makes our query go faster. Then, we'll add more columns to our query so that the index isn't covering anymore, and we'll force SQL Server to make a tough decision: do lots of key lookups, or just scan the table? Then we'll learn how SQL Server uses statistics to make that decision.

## Transcript

### Intro

**0:00** · when last we met we had this query so we had this query that added display name and age when I held in my mouse Co does add a display name and age to this query and display name and age are not on the index so now sequel server has a choice to make should it use the index or not

**0:19** · well let's go see what he decides to do so let's highlight the query and go execute it and then look at the plan sequel server said oh you know what I'm gonna do I'm just gonna go scan the whole entire table I'm gonna scan the whole entire table then I'm gonna write down all 150 tiles and rows of match and go sort them all sequel servers just flat-out ignored the index altogether why well let's look at the number of

**0:45** · reads that he did to accomplish this query well let's let me turn off CPU time because that's getting kind of annoying so set statistics time off oops off how you turn off that CPU time there so that it doesn't show up inside the plans so let's go through and execute it again to run it and let's see

**1:03** · how many reads he did now the number of pages in the table is really predictable no matter how many rows you're reading or how many rows you need it's different of course if I do a top 10 for example now souq veer says he thought for exact seek first and it didn't and zeusie already wants to change the database he's like change the database to match my query who has time for that yeah I can tell how your DBA feels about you right so sequel server said a table scan

**1:32** · here is more efficient because it does less reads what if I tell sequel server hey trust me listen buddy I want you to use this index with index equals and before I used one a numeric aunt works really well if a numeric aunt works really well if you know the index ID I don't know the index ID of anything but the clustered index so I can use the name though I can say trust me sequel server I want you to use the index on last access date an ID is okay but

### Using the Index on Last Access Date

**2:06** · you're not gonna like that well Kevin says where can I find more info on not using IX as a best practice it literally I learned it from Eric darling like a month ago I was reading Eric's blog posts and he's like why are people putting in IX the beginning of their indexes I was like why am I putting IX at the beginning of

**2:24** · my indexes why would I do that it doesn't make any sense so now so I've run the query with that index now let's go look at the execution plan now this is what severe thought people were gonna do severe thought the sequel server would seek in on one particular date read out all of the rows that match and then for every ID that came back we

**2:47** · would go look up their ID on the clustered index and get the rest of their stuff because we did select a display name and age which aren't on the non-clustered index well the thing is kind of tricky here is I wish that these were three-dimensional I wish they

**3:05** · popped off the page in terms of the number of times that they were executed because then you'd understand why they suck so bad and why sequel servers kind of making this decision what you have to do is you have to hover your mouse over the key lookup and look at number of executions how many times hyowon diva

**3:25** · how many times did sequel server have to do this it did this a hundred and fifty thousand times a hundred and fifty thousand times because a hundred and fifty thousand rows were brought back out of this index seek well if I asked

**3:40** · you to go into the supply closet a hundred and fifty thousand times and go get someone's display name and age first off you'd give me the finger but if I forced you to do it you would tell me that you had to read a whole heck of a lot more pages \[Music\] remember there are only 8,000 pages in the entire table but now we're doing half a million reads we're reading more pages than there are in the table that's

**4:10** · why sequel server isn't doing that why sequel servers like yeah yeah no no I know you have an index involved here but I'm not gonna bother guy in a cube and for those of you haven't seen guy in a cubes stream he over on YouTube guy in a cube does much better production quality videos than I do I'm like a guy with a shoebox and an old iPhone camera trying to get this done that's not true but good to see you sir so sequel

**4:40** · servers not gonna do this here because it's just insanely it's so much work and mr Palmer mr. Porsche nails it yes what if the date was more recent and less ROS came back ah let's try that let's go see

**4:57** · if we take this out and we switch to a much more recent date because see sequel server guests that there were going to be a hundred and fifty thousand rows that came back what if he knew that there were less and I'm just gonna pick a date out of nowhere that I just happened to have written down here let's just say for example twenty eighteen oh eight twenty seven so let's say give me all the people who access the system since September 27th of 2018 even though

**5:28** · this is less rows we're talking about a it's now only bringing back sixty thousand rows sequel server still like no it's way too much data well what's the most hey what's the most recent date

**5:44** · let's go something really really recent oh I didn't bring last access date let me grab that in as well last access date just so that I can see what one of the more recent last access dates is so let's take the 27th oh it's even that's even oh no because I scrolled all the way up to the top hold on a second here there we go so let's go with September 2nd Oh 902 so let's see if we get Brad less rows we're still even with just four thousand

**6:16** · rows out of 300 thousand even when I'm only bringing back four thousand rows Siegel serves like no no trust me better off to just read the whole table now that's amazing we're only bringing back four thousand rows out of 300 thousand and sequel servers still like screw you I'm not using your index but he's right if I use the index if I say with index equals last access date ID even with just four

**6:44** · thousand rows I am still reading more pages than there are in the table because every time you do this you're going to the office supply closet and doing more logical reads you got to get to a really small number of rows to avoid this thing that we call the tipping point the point where it makes more sense to just scan the whole entire table so let's go with the next day and

**7:13** · go see X oh and I'm gonna take off the index hint so just take off the index hint all together now sequel service like yeah okay as it turns out I'll use the index but I don't actually expect any rows to come back this concept the tipping point is surprisingly low I've

### Using the Index on Sequel

**7:32** · seen cases where less than a third of the percent of the table is involved in sequel server still like screw you I'd rather scan the whole thing indexes make the most sense when what you're looking for is extremely selective now I don't

**7:49** · want to just get down to 0 rows let's show you something that actually does have rows and I get an index seek but to do it I'm gonna have to go to a fairly recent date and time I'm gonna have to go all the way out here to a few hours before the data dump was taken and now sequel servers willing to do an index seek vs. last access date nibble ninja did you miss this yes yes yes you did

**8:16** · other questions \[Applause\] so now that we're looking at this fairly recent date if I look at this now sequel server says well I only expect 700 rows to come out of here because 700 rows come back then I know I'm only gonna have to do this key lookup like 700 times the less rows that you're using

**8:39** · the more likely it is that sequel server is going to use that index because he knows that less key lookups will be done sukh veer says what about a top for example exactly the more that you can reduce the number of rows that you're bringing back the more likely it is that you're going to get the index seek plus key lookup combination this concept the

**9:01** · tipping point is so important when sequel server has to make the decision between using and index versus not using an index and sequel server has to figure this out without reading the table oh this is so much fun this is just insane to me it's so cool how sequel server has to make these decisions so check this out I'm gonna tell sequel server I want you to forget everything you know I'm gonna tell sequel server go free proc cache meaning forget every execution

**9:31** · plan that you have in memory right now you usually shouldn't do this in production you'd have to do it every now and then but I'm just gonna free the plain cache and I'm gonna do it what thank you guy in a cube Oh awesome thank you sir I don't have custom emotes or anything like that setup yet I'm still babe in the woods here on Twitch but I'm learning to figure out how to do that so well thank you so so when I've

**9:57** · told sequel server forget everything that you know ding oh my god well thanks so awesome so lang Sam I appreciate that as well thanks y'all very cool I hardly suck at all my mother told me if I worked really hard this day might actually happen oh my god arrow keys damn it's on fire well thank you I appreciate you Oh y'all are giving me so much I have to live up to now y'all are making it now like I'm gonna have to actually start doing quality work instead of winging it like this this is bananas flow cool very cool

**10:30** · so the told sequel server forget everything you know now go back and build this query plan but I'm not gonna execute the query I'm not going to execute it I'm gonna tell sequel server I was like I thought I was asking me if I'm German and I'm like man I am as white as they come I somewhere back in my er I have like Ukraine I just found this out for some reason I always thought I was Lithuanian but I have Ukraine an American Indian in there somewhere I'm not sure quite how that works but yeah I did yeah as white

**10:59** · as they came like I attend Jimmy Buffett concerts that's how white I am although I go to Mexico a lot yeah I go travel a lot not now but in other times so I'm not actually going to execute this query all I'm gonna do is I'm gonna say hey a sequel server if you were gonna run this query what would you do so I'm gonna highlight the query and then I'm gonna click query display estimated execution

**11:24** · plan sequel server tell me what you think is going to happen when you go execute this query and sequel server says well remember he's a guy cuz he's stubborn and refuses to ask for directions as well I would do an index seek followed by a key lookup and I believe that I'm gonna find about 746 rows he didn't look at the table he

**11:46** · didn't open the table at all and yet he came up with an estimate of 746 rows how whenever you create an index sequel server also automatically creates a statistic with exactly the same name so let's go look over at our users table and we'll look at the indexes that we've created so far there's an index on last access date and ID that's the black piece of paper then he also created over

**12:17** · on statistics he created a statistic with exactly the same name a statistic is one a kay page with metadata it just tells sequel server what to expect to find when you open this index and Red Baron says or

**12:38** · red red B he says but those stats should have been up to date right yes and they are 740 Rose is actually correct I'm gonna go run the query just so that you can see it so 746 Rose is beautifully bang on if I hover my mouse over here sequel server expected to find 740 some rose and he actually did so that works absolutely perfectly but so what's inside there

### Querying Statistics

**13:03** · what's inside those statistics on last access date you can actually query them now I'm gonna show you something that you probably are never going to have to use in real life this is a DB CC command this last access date date ID welcome to

**13:22** · the club woofle bug and goof-off and cranky old friendly person at least you're not dirty you're just cranky so that's kind of cool so you're probably never going to have to GU fobs as well I didn't know you're on twitch I didn't either I just there's a camera here and I just started talking this is how I usually anytime I see a camera it's hard to make me stop my wife is always like I can't believe people to pay you to see you speak you know I can't believe they come to conferences cuz like I would pay you to shut up like if she's you people

**13:49** · just seem to like anywhere there's a camera or a group I will just speak come learn about the magic of sequel server it's amazing it's fantastic yeah it certainly does says I bet you stand in front of speed cameras talking if that would get me out of tickets I would be all over it and oh man so this dbcc show

### SQL Server Statistics

**14:11** · statistics you don't have to run this often this is one of those things where I don't ever run it with clients but knowing how it works absolutely changes the way that you think about queries and performance tuning it looks intimidating but hold on it's actually really easy what this says is on our index of last

**14:31** · access date and ID the last time that I looked at it on May the 9th of 716 am well the last time I updated it rather there were two hundred ninety nine thousand rows in the table and I sampled all of them sequel servers just like a political pollster if you want to find out who's gonna win an election you can't talk to everyone in the United States it takes too long instead you just hack their book account what you would do instead

**15:07** · is you would go pull them you would randomly dial numbers find out how many people you would dang hypetrain successful what oh that's kind of Awesome well I got a new emote for that oh that's pretty cool choo choo hype train so instead what you

**15:25** · would do is you would randomly call or kind of pseudo randomly call a bunch of people ideally not just your friends to go figure out how many people we're gonna vote for which candidates that's exactly what sequel server does the more population that you have the bigger your table is the more it can't Shawn thank you I appreciate it Shawn very cool now

**15:48** · y'all are asking a bunch of interesting questions around statistics and I love stats but I've actually dedicated a whole bunch of time to them in my mastering index tuning class we spend about half a day talking about and mastering index tuning and another half a day talking about them in mastering query tuning in terms of how they affect queries and how how you write your T sequel but what I'm going to show you here is I'm gonna say when sequel server has to go figure it out figure out how many rows are gonna come back it uses

**16:16** · this set down here this is called a histogram which sounds like Instagram but it's way easier than it looks what this is is it's a series of up to 201 buckets that describe your data the first bucket is August the first 2008 at around midnight so you can tell when Jeff Atwood and Cruz started working on Stack Overflow this is the first user that they created who never logged in again for August the 1st of 2008 there is exactly one row in

**16:47** · that bucket the next bucket is for all of the dates in between August the 1st to November the 27th it's not an even date range it's not an even population as you look down through this list the buckets are kind of lumpy that's on purpose sequel servers trying to paint the best picture that it can of your data and it only has eight K page with which to do that so he

**17:14** · tries to sketch out as good as he can with 201 buckets how your data is shaped out so in this second bucket here between August 1st and November the 27th of the same year there are 1200 people in that range there's only one person with a last access date exactly equal to this which makes sense it's a last access date on a website it's not like all of us log in at exactly the same time so and that's a great question can

**17:47** · you increase the statistics page so that it has a better picture of the data No so this is kind of one of the things that I like about open source stuff is you can go read their source code my sequel Postgres stuff like that you can go read their source code and understand why they make some of the decisions that they make like you can change the size of your statistics in some other databases other databases get all kinds

**18:09** · of knobs that are that seem interesting but in the end most of the time people would just use them to backfire and shoot themselves sequel server tends to give you a limited number of ways that people can shoot themselves in the foot I find still a lot of you have busted and broken and bloody feet from all the times that you've shot yourself even though there aren't that many knobs y'all are constantly looking around for new knobs to play with you're like oh this is it does it camp can it does it can I touch this knob this looks like cool and then you get your peanut butter fingers all over the database and things don't perform well maybe I would find a

**18:42** · use case for changing the statistics I haven't found that yet yes nibble ninja you are exactly so the larger that your data gets the bigger this problem becomes so here how a sequel server using this let's go back and look at our query now our query said where last access date is greater than this so what a sequel server do nibble

### SQL Server Statistics Example

**19:08** · ninja says does the number of common columns impact this precision not at all not in any way shape or form so sequel server has to go find out all the users where last access date is greater than this let's go paste that into our window just so that we can see what he's looking for here's exactly what sequel server does he opens up the page with the 8k statistics he Scrolls down to that time part I'm gonna go way down to the bottom and here it is it doesn't have that exact time but we have

**19:38** · something kind of close so sequel server knows that some of the rows in this bucket are gonna match plus all of the rows in the subsequent buckets because we're asking for everything greater than in terms of keeping stats up-to-date I'm not going to cover that today but I do cover that in my fundamentals of server tuning class so fundamentals of server tuning classes where we talk about that one also fundamentals of database administration either of those will we'll teach that topic so this is how sequel server

**20:10** · uses statistics to come up with the estimated number of rows so here's where he came up with 745 rows because we have statistics on those columns statistics are so cool because sequels are asked to figure out which tables it's gonna process first which indexes it should use on those tables how many CPU cores it's gonna throw it to work how much memory it's gonna allocate to the work where it should do the sorts in the plan all kinds of crazy

**20:42** · stuff it has to figure out before the execution plan starts and there's a hard firm line in between building the plan and executing the plan newer versions of sequel server 27 20 19 start to blur that line a little bit but generally if the estimates are crappy when you first get started they're not going to go back and rebuild a different plan whatever plan you got that's the one you're gonna roll with now statistics are really cool

**21:14** · they helped Noah Gow about them says have statistics always existed for the database as long as I've been alive yes there might be an early version a sequel server that didn't have them but I know at least since like 7 they were around I started using sequel server around 98 99

**21:30** · with sequel server 6 5 I just didn't know what the hell I was doing I still don't know what the hell I'm doing but it's just that at least I knew about statistics from 7na forward ramen hangover what an amazing name is \[Applause\]

**21:50** · thank you dr. club okay I can only assume that dr. club is in reference to the thing that you put on your car steering wheel so you're a doctorate of in putting those things inside of steering wheels that's pretty cool Jeff says you know what you're doing way more than most people it's just that I'm one page ahead of you in the manual that's about how I always look at it you were like how did you learn so much I'm like well I read the manual home just one page ahead of it than you are so

### How SQL Server Works

**22:17** · this is how sequel server has to figure out how many rows are gonna come back from different parts of queries it's really kind of neat how this stuff works so the way that you write T sequel can influence how sequel server uses those statistics and I should stop to chat for

**22:36** · a second sometimes when I teach you stuff about sequel server I think of myself as brento czar destroyer of dreams I think about myself as teaching you things and kind of crushing your hopes and dreams about the way the sequel server works I used to think a long time ago when I got started with sequel server and really just learning things in general I used to think that when I would go to a training class I would come back going I know everything now I am a god among men everyone hear

**23:08** · me roar when in reality what would happen is I would come back completely dejected I would come back and look at the source code that I'd written and I'd be like oh my god I am a I have done so many terrible crimes against sequel server and app servers I should be burned at the stake what I'm about to

**23:27** · show you can be heartbreaking and frustrating because it will kind of shatter a dream that you may have had about sequel server and that the way you write your T sequel really determines execution plans way more than you might have realized and you're going to want to get a stake out and start poking people who work for Microsoft there it

**23:49** · isn't their problem it's our problem for not reading the manual so hold on to your fear and frustration oh not caring asks does a multi-tenant architecture throw all those stats if one table contains data for multiple clients can sequel server into it that you only want to read rows for one client at a time only if you put the client in the where clause and there's a stat on the client on whatever like client ID column you have which is going to be the case all your queries are likely going to have where client ID equals whatever but

**24:22** · here's the crappy part sequel server won't correlate the client ID with other columns for example if a client just started yesterday and you're looking for sales that happened six months ago sequel server knows that this new client is fairly new in terms of that they have hardly any rows but it doesn't know about the data distribution across time he's going to assume that this client has the exact same data distribution over time that all of your other clients do all right is it now now let's kind of

### Breaking the Hearts and Dreams

**24:57** · break the hearts and dreams so let's start making the query just a little bit harder I'm gonna say we're last access date between twenty eighteen oh eight twenty seven and I'll move it around just a little bit to make it easier to see twenty eighteen oh eight twenty eight so now then I'm going to take the exact same query I'm gonna paste it down here and instead of casting this or instead of this last access date I'm gonna say cast last access date as date

**25:32** · equals this now these are effectively similar this means that I'm gonna after I take out the x from last access dates I'm looking for only rows where they're last X estate is on this day the one up top is effectively the same it's only gonna bring back one day's worth of data and to prove it to you I'm gonna highlight both of the columns or both of the queries the top query top query down

**26:05** · here brings back two thousand four hundred and forty three rows the bottom query when I click on the bottom result set here also brings back twenty-two thousand four hundred forty three rows I just want to drive home that both of these are returning the exact same data and at

**26:23** · first their execution plans look somewhat similar I lied they don't really look that similar they look similar in the sense that they both brought back twenty four two thousand four hundred and forty three rows but the way that they did it is catastrophic Lee different the one on the top has a

**26:45** · completely different execution plan than the one on the bottom so sorry I'm late how did I create last accessed eight sorry bucko buckle up the next time maybe you don't show up to the webcast two hours late

**27:02** · two hours late what do you do for a living two hours how what are your projects look like two hours late do you do that at the office when someone at the office is like okay everybody we're wrapping up here or raagh Oh what what did you say come on man gimmick no

**27:22** · oh not gonna happen here alright so what we're gonna do is we're gonna take a five-minute bio break and that people are like people are always like well how but why does anyone come to Brent's sessions twice and they're like well if you yeah right so that got so pretty I'm

**27:38** · such a bad person I'm so what we'll do is we'll take in our next five-minute bio break and then we'll do the last set of demos where I'll explain why these two are so different and what that means for your T sequel tuning so five minute bio break and we will come back see y'all in a few