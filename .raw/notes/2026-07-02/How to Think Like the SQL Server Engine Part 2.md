---
title: "How to Think Like the SQL Server Engine Part 2"
source: "https://www.youtube.com/watch?v=A-cL0nXofiw"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2020-05-09
created: 2026-07-02
description: "Now that you're done with part 1, let's switch to SELECT *, add an ORDER BY, and see how SQL Server struggles with repeated queries. To make 'em go faster, we're gonna need an index, so we build one o"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=A-cL0nXofiw)

Now that you're done with part 1, let's switch to SELECT \*, add an ORDER BY, and see how SQL Server struggles with repeated queries. To make 'em go faster, we're gonna need an index, so we build one of those too.

## Transcript

**0:00** · and BW Merlin welcome to the club thank you so let's see here when last we met we were dealing with when last we met we were switching over from we had been doing select ID we were doing select ID

**0:16** · from users where last access date is greater than July the first and so what we said was we were gonna scan the entire table and then we were gonna write down just ID and last access state because those were the only two columns that we needed in order to sort this data now things are different when I

**0:33** · switch over and I do select star things are gonna change now I'm gonna keep the original query so that we can show them back and forth between the two but up here now I'm gonna do just select star so before I do it I want to remind you that the cost of this query if I look over here on the estimated sub tree cost was 12 query bucks 12 punctuation matters what punctuation are you talking about punctuation matters now I agree

**1:05** · I'm also an Oxford comma fan just for the record meh so table seek after where so what table seek - what though what are you gonna seek - so this is where it gets tricky what's your execution plan going to change - when I change it over to select star is anything about this plan gonna change so let's go see let's go run it

**1:31** · if I look at this execution plan I look over at the plan the plan looks identical somebody says missing comma before the alias I don't know what you mean missing cut there's no alias here I'm not sure what you're talking about so I require all the data now the difference is if I look at the arrows moving around here and yes Red Baron

**1:55** · I am NOT when I run these little mini programs remember every one of them is self-contained an independent the first micro service here that's going to run is my clustered index scan so now the output of the clustered index scan is way larger we're returning all of the columns instead of just Lydian last access date so now this arrow you can

**2:19** · think of as a hundred and fifty thousand rows that have select star off of it Oh nibbled ninja yes nibble dinger you are absolutely right there are also more reads nimnim old man nibble ninja was really paying attention because now before I could just skip these off row columns the things that giant letters to Grandma that someone wrote in there about me now I have to go get those now I have to bring those in

**2:48** · too and I have to write them down so we're talking about higher logical reads to nibble ninja that is just absolutely fantastic because hardly anybody ever gets that so you're just really a cut above there so now then you don't see that on the plan it effectively looks the same because really it's all bundled into the clustered index can work but it's gonna be more reads for that clustered index cam now the sort is

**3:15** · bigger too because what this sword is doing is writing down freaking everything when our users ask for select star we got to write all of the data down we don't just write down ID and last access date now some of you some of

**3:35** · you who are developers may be thinking you know why don't I make two trips why don't I send my friends to the closet once to go get all the IDs and last access dates then they can sort them all then they can go back to the closet to get the Select star that's not how sequel server works sequel server wants to get you in and out of the closet as quickly as it possibly can because other people need to get into the closet and read these rows to there's more people

**4:03** · who want to grab locks on these and I can't afford to hold locks while I work I need to get you in out as quickly as possible so that's the reason why sequel server does something that you may not agree with it further \[Music\] so now when he goes through and does this sorting this sorting is way more expensive on my humble laptop the selector took 32 seconds longer than yours you might be using the full stack overflow database I'm only using the 2010 version here which is only like 10 gigs if you're using just the 10 gig

**4:35** · version and it took 32 seconds Sallah Solomon DBA says how do I follow you get behind me but so now the sort is

**4:51** · spectacularly more work is way more work how much more work the easiest way to see this for starters is to run both of these queries back-to-back I'm gonna highlight both of them and run them execute then the cost over as I estimate

**5:09** · stuff if I hover my mouse over here that really doesn't tell the full story if I hover my mouse over the first one it says 12 query bucks you know twelve point five eight query bucks the cost of the second one when I'm doing select star buckle up 876 query box it's up by like 30x now

**5:35** · Surrey Sakir says I've always heard select star is bad this is one of the reasons why you here select star is bad is that it's so much work to do the Select star but it's not more reads in this case it's a tiny amount more reads it's more CPU work to select all of this

**5:52** · stuff so the place that we find that is by looking over here the first query when we only got the ID so ID is a hundred or is 157 milliseconds then when we did the Select star it was a full second so select star CPU time was a full second so that's insane it's like five six seven X more it's ginormously higher so what you'll hear

**6:25** · when you talk about talk to database administrators you're here don't select star cuz you bring back more data than you need I'm actually okay with select star because check this out if I go back and do select star but I don't highlight the order by if I just do select star

**6:45** · hardly any work at all it's actually not that big of a deal we're just doing the clustered index scan there's no CPU work we throw a whole lot of people into the closet we make them bring back kinds of rows this isn't really that bad if you need 150,000 rows and you need all of the columns the cost on this little fella is only like five point eight query bucks but when you put in the order by hole this is where the query cost is so

**7:16** · here we went from five query bucks - 875 query box I don't actually have a problem with people doing select star I have a problem with people who do joins group by order by any kind of

**7:32** · post-processing the more columns that you add the more screwed you are and of course out in the real world you're not doing select star from table with no where clause you're joining 42 different tables together and you're doing group by and order by and having and all kinds of stuff Ct ease and temp tables so I'll

**7:56** · talk about how select star isn't really the enemy but it's everything that we do with the data for example here and this that first micro-service that first application it's easy for him to just pull out all of this data but it's everybody upstream that pays the price I like to say the sequel server is the world's second most expensive place to sort data with Oracle being number one

**8:22** · sequel server Enterprise Edition is seven thousand dollars US per core which sounds like a lot and it is but seven thousand dollars a core is nothing compared to Oracle which is forty seven thousand dollars a core for their Enterprise Edition that is the world's most expensive place in order to sort data know if Most Wanted says what

**8:48** · happens when you order by Rand does it get even worse not really because effectively the work is just sorting every time it doesn't matter what columns you're sorting by you're still kind of essentially screwed there you're having to rebuild that work every time so speaking of which what happens when we run this query twice if I just sorted this data if for example if I go in and I say at the end of my query go five meaning go do this five times or 50 times think about what

**9:21** · your execution plan should look like now what you would probably do is you would send your friends into the closet have them go pull out the rows then have them

**9:36** · all do all this ordering then have them save it have them keep this around maybe they keep it for 30 seconds maybe they keep it for two minutes but just keep this piece of paper for awhile it's now a sequel server does so let's see what sequel server does and to do it I'm going to bring up task manager because this is kind of amusing to see when you bring up task manager you want to first just let it kind of stabilize there so that it'll drop back down to zero and then while it runs I'm gonna go run this

**10:08** · select star 50 times what pow there goes my CPU because sequel server caches these sequel server does not cache these is it smart enough to remember that you did it one time and go back nope doesn't

**10:28** · matter if 10 people are running the same query at the same time they each get their friends to all go into the office supply closet they all scan the table they all do the sorting it doesn't matter if the query was just run it doesn't matter if no inserts updates or deletes have happened it does thank you

**10:51** · for following thank you for following thank you for following okay easy now easy now you don't get multiple points and there's no multiple credit here just follow and pay attention even if no one's inserted a row even if no one's changed a row even if the database is marked is read-only even if no one has logged in even if you're an availability second group or availability secondary replicas or a log shipped replica sequel server every single time reads all of the rows and does all of the sorting so my CPU

**11:24** · now is just going through the roof and a sequel server rebuilds this over and over again every time so in terms in terms of what I tell developers I know when I was a developer I used to think well I just ran the query recently it should still be in cache right this is this is not so when you're building an

**11:47** · application as early as you practically can put in a caching layer Redis memcache I don't care who you use put in some kind of caching layer because the fastest query is the one you never make the fastest query is the one you never make means if sequel server doesn't have to put together an execution plan go send us friends to the supply closet go sort all those rows you get your answer way faster Brent as a developer shudder oh my years of classic VB script yes so

**12:23** · this sucks we gotta do something better than this we're not going to be able to run this query over and over again and that is where indexes come in so let's go make our first index let's say if we're constantly querying this and we're not gonna do the Select star anymore cuz that select stars terrible we've taught our developers hey stop doing that instead just get the columns that you need and they're like okay we could use goodbye with ID then in reality no one's ever said that ever we'll talk more about that in a while on easy welcome to

**12:54** · the club so I want to create an index I'm gonna say create index now I'm not gonna call it I X anymore I used to put in IX and then gradually over time I realize there's no point to that I don't need to say that it's an index and now these days I think of these as Roman indexes anytime I see a X at the beginning of that so what I'm going to say is instead last access date ID on dbo users last a last access date ID so

**13:24** · I'm going to go create this index and I'm gonna visualize for you what this index looks like when you're building indexes you want to visualize them to see the kinds of things that they contain and I talked about how to do this in my fundamentals of index tuning classes I'm just gonna write the query here to show it select last access date ID from dbo users order by last access date ID so

**13:55** · this is literally what the a K pages look like inside your database for those of you who printed out the 8 K pages that were in your homework these are the black pieces of paper the first thing that you're gonna notice is that there's a hell of a lot less data because I only have to store last access date and ID I can cram way more rows onto these a K

**14:21** · pieces of paper I can cram way more rows onto here because I'm storing less data about them I can fit like five times more rows on each one of these pages than I can each one of these pages the next thing that you're gonna notice is that I have two copies of the table every time I do an insert I have to update two pages every time I do a delete I have to update these two questions I said or update

### Two Copies of the Table

**14:49** · these two rows in terms of that question that questions totally good but it's beyond what I cover in this session I do cover that in fundamentals of index tuning and if you stay tuned till the end of the broadcast I'm actually going to give you a coupon code to get that course for free just to get your get your training going so now I have two copies of the table in order to that I have to keep in sync every time people do an insert update or delete this is actually extra space on disk but now it

**15:18** · pays off it sucks for inserts updates and deletes but it sucks or it sucks for inserts updates and deletes it's great for selects when the query beautifully matches the index that we have and in this case it does let's go execute the query now and go see how our execution plan looks now before in order to

**15:38** · execute this query I used to have a much more complicated plan I used to start with a table scan then I had to write a bunch of stuff down and I had to sort it all now sequel server has a different operation here it says I'm gonna seek it didn't say scan it said seek I'm gonna dive bomb directly into just a few rows I'm gonna die bomb into one Start spot of the table and then start reading from there so if earlier when we had the table scan

**16:11** · when we were just scanning the whole table looking for everybody if gringo says disorder matter in an index yeah you're about to see why because because this index starts with last access date if I hover my mouse over that index seek now instead of a predicate it says seek predicate we're gonna jump directly to

**16:34** · one part of the table and read out just the rows that matter remember before how we had to read like three hundred thousand rows when we were reading the whole table now we don't now we read only the rows that we need in order to accomplish the query now everybody kind

**16:55** · of knows that indexes reduce the number of reads that you do remember before we were doing about 7,000 reads in order to scan this whole table but now if I go in and look now we're doing only 335

**17:11** · logical reads oh that's absolutely magical now as a follow-up read Barrett says so if the index columns were reversed would that where Clause not be so efficient let's go see let's go do it so to find out I'm gonna run a stored procedure that I'm sure you run every day drop indexes drop indexes does

**17:33** · exactly what you think it does it's an open source stored procedure I wrote that drops your non-clustered indexes so the index I just created is vaporized I do leave behind the clustered index of the table so now let's go create because I want to say was Red Baron red barons red Barrett says if the order was reversed let's go create him the other way ID last access date on DB Oh users

**17:57** · ID last access date now if ID goes first can sequel server seek directly into one last access date no if I go run that query go hit execute and I look at the plan sequel server can't seek in anymore now it has to scan

**18:20** · the whole index and it has to read a whole lot more rows it has to read all 300 thousand rows in the table the first column of the index needs to be exactly what you're searching for and as you start searching for multiple things we talked about that in the fundamentals of index tuning classes how do you figure out which column goes first for example especially when you're dealing with a wide variety of data so I'm gonna go

**18:50** · back and drop that one drop that index and then let's go back to the or originally scheduled index we'll go back to our index on last access date then we'll go back and run our query again so now we seek directly in on the black pages let's zoom in now this query

**19:09** · nibel ninja says when would you want an index on the clustering key I don't talk about that in here but I talk about it in mastering index tuning it's a great question it's just a really hard one to cover in the time that we have so now I'm down to just this index seek and everybody kind of knows that an index seek on the right set of indexes will reduce the amount of reads that we do but that's not the only part that's cool what else is cool so have it yeah so

**19:40** · have it let's not try to answer each other's questions inside here just because it's gonna be kind of tough on the chat so if you want to answer someone else's question kind of hold off for now or consider getting your own channel maybe an indent seriously - as a psychic I am a huge fan of community-based

**19:59** · training like I think that all of us should be out here trying to teach each other as much as we possibly can for that there's never been a better time to get in and start doing your own blog do your own twitch channel do your own presentations etc especially because it's not like we're getting out and doing user group sessions anytime soon now is your chance to become famous quote unquote and it leads to better job offers leads you to be able to run your own consulting company have webcasts

**20:26** · from the comfort of your own home on Saturdays you know what they say why work 40 hours a week for someone out for someone else when you can work 80 hours a week for yourself Gabe says where are you Brent I am in downtown San Diego California the view isn't quite as magical because it's a little bit of a overcast day here but you know hey it's not like I can complain about too much there alright so back to the show so in

**20:53** · here I said the index helps us do less reads but that's not the only part of the story index also helps indexes help us do less CPU work because if we don't have to sort this whole thing every time we do way less CPU now it's harder to

**21:11** · see that in here because I have zero milliseconds right now so let's go back to showing you the one with the clustered index let's go run both of these queries side-by-side and for the top one I'm gonna use an index hint with index equals one what this means is go

**21:31** · use the clustered index of the table this is always index ID number one when you have a clustered index so for the first one I'm telling sequel server look I know there are better options but I want you to use this option okay let's run both of these back-to-back hit execute and then let's go look at the execution plans the top one when I do a clustered index scan the top one

### Execution Plans

**21:56** · involves a hundred and seventy two milliseconds worth of CPU time now remember I'm purposely using small databases here to keep the demos quick the bottom one when I let sequel server choose and it chooses the non-clustered index zero I don't know about you but I

**22:14** · will take zero CPU time all day every day this is the much faster way to go this is why we get so excited about having great indexes to support our queries they reduce reads they reduce CPU time and if a query is gonna be run over and over again it probably makes sense to have this this case in for this

**22:38** · case this index is called a covering index now what that means is this index perfectly covers the needs of the query the BW Marlin asks what about elapsed time if you joined in earlier you might have remembered that I said I don't use time very often in order to gauge queries because it's so unpredictable and unrepeatable it'll change all the

**23:04** · time even on the same VM with no other workload going I don't use clock time as a measure for success for queries if you do want to use clock time as a measure what you have to do is run a beat s so you go you run the queries back-to-back a ba-ba-ba-ba-ba B and then you throw out like the min and Max and you take averages or medians across all of the rest and that'll give you a more reproducible number about what time looks like kind of a pain in the rear dome okay so we said this is a covering

### Covering Index

**23:39** · index meaning it perfectly covers this particular query like covering doesn't mean it's a special kind of index you create it just means that you handcraft and analyze a particular query and make one make an index that absolutely matches it huckleberry Sam and I like that wonder if that refers to the fish or the color they're both good answers but just wonder if they refer to the fish or the color but and a perfect covering index

**24:05** · will allow us in a perfect world to seek directly to the data that we want if I run that query again now that we have a perfectly covering index for it and I look at the execution plan if I look in here it's an index II quit nothing else on the plan and at first you think \[Applause\]

**24:31** · literally had salmon last night I love salmon so you might think that index seek is like as good as it gets mmm but look a little closer if I hover my mouse over that index seek look at the number of rows I read when you and I

**24:50** · hear the term seek we automatically think oh it's lightweight and fast but here I'm doing a seek that reads out half of the table it reads out half of the rows in the table the term seek only means that you jump

**25:09** · into the table at a point and start reading it doesn't mean you stop there and to show that as an example will you share the session no I keep everything that I do I keep it tightly sealed under my mattress no one will ever be able to see it you can tell I'm lying right it's already well given away for free on my blog if you go to Brent Ozark comm slash go slash engine so if you go Brent Ozark

**25:36** · a'm slash go slash engine you get slide PDFs the demo scripts all kinds of stuff so if I add ID as a predicate will it still use a non-clustered index I'm gonna hold that and I'm gonna save it for later because I address that exact thing it's a really good question and I Bob but I'll hit it in and later so here we've got a seek that jumps into one specific point but it just keeps reading what if I change the dates I'm gonna change these dates to something a little bit earlier the first of 1800 now pro tip

**26:09** · Stack Overflow was not around in the days of covered wagons but yet you still see index seek here and if I hover my mouse over this look at the number of rows read it's the same as the number of rows in the entire table the term seek

**26:29** · only means I'm going to jump into a point it could be literally the first row in the table don't hear the term seek and immediately think that the query is fast because it could still be inappropriately slow just as you can

**26:48** · also see the term skin and that doesn't mean it's slow it could be fast for example watch this select top ten star from dbo users and I'm not gonna put a where clause on it at all set statistics

**27:06** · IO on so that we can measure how many page reads that it does now imagine that you were gonna send your friends into the office supply closet and you're gonna go tell them hey go get me the first ten rows that you find I don't even care which ones they are just go get me ten rows out of there and let's call it quits your friend wouldn't read the whole table your friend would just go in there grab a sheet of paper and start reading this stuff off that's exactly what this query did he only read

**27:36** · five 8k pieces of paper thank you for following squirrel noises I don't know what squirrel noises make but now I'm intrigued so he only read five 8k pieces of paper that's freaking fantastic and if I look at the execution plan for that go rerun it again and get the plan the execution plan is technically a clustered index scan but look how many rows he read you're not gonna get any better than that this is a perfect execution plan

**28:09** · for this query is fantastic it won't get any better than that and in fact if you had any kind of indexes that you want you're still not gonna get a better execution plan than that the moral the story here is that I don't want you to think that seek is fast and I don't want you to think that scan is slow this is one of those important things to take away with because I don't want people walking away from the session and thinking oh Sookie R severe says do the

**28:39** · top ten always read the clustered indexes first page or whatever page happens to be in cache oh that's a great question and I don't cover it inside here but I'm gonna give you the terms to go google for so go search for sequel server advanced merry-go-round scans so if you search in books online for a merry-go-round scans it talks about how those kinds of things get executed it's pretty neat it's only an enterprise edition it's kind of fun to read through about okay so in this case that query is

**29:13** · perfectly covered by this index the index has everything that I need in order to accomplish this query let's go back to 2014 o 701 and then let's run the query again but I'm gonna change the query I'm gonna say go get me age display or display name ID and age get me all three of those columns now those two columns are not in this index sequel

**29:44** · server has to make a choice and there are two ways that he can accomplish this query we're gonna take our next bio break and during this five-minute break I want you to think about the two different ways that sequel server would execute this query and when it makes sense to use one of them one of the methods as opposed to the other so we'll take a five-minute break here while you think about that and I will be right back