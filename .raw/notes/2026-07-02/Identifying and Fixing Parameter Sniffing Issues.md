---
title: "Identifying and Fixing Parameter Sniffing Issues"
source: "https://www.youtube.com/watch?v=pd7xqLT_-2k"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2019-01-05
created: 2026-07-02
description: "Brent's live session at SQLDay Poland 2017. You'll learn 4 things: what parameter sniffing is, how to react to parameter sniffing, how NOT to test your code, and options to fix the problem long term."
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=pd7xqLT_-2k)

Brent's live session at SQLDay Poland 2017. You'll learn 4 things: what parameter sniffing is, how to react to parameter sniffing, how NOT to test your code, and options to fix the problem long term.

## Transcript

**0:00** · so in this session i'm going to be talking about parameter sniffing how many times in this conference have you guys heard other presenters talking about parameter sniffing so far yeah it's something that once you know what the term is you can recognize it really quickly i run into a lot of it myself doing performance tuning my name is brent ozar i do a lot of crazy things with sql server and i get to run a lot of strange experiments you'll get to see some of those experiments inside this

**0:29** · this is one of those weird topics that you may have to revisit a couple of times as i go through this because the concepts of statistics and parameter sniffing kind of weave in together so they can kind of be confusing as to when i have a statistics problem versus when i have a parameter sniffing problem

**0:51** · in the course of this hour i'm going to teach you four things you guys have probably seen a lot about parameter sniffing what the symptoms look like during this conference so i'm only going to spend about 10 minutes on the first one the second one i'm going to teach you what to do when you do have parameter sniffing emergencies just to get past the emergency and then

**1:13** · when you're ready to go fix the code long term i'm going to show you the thing that everyone does and is actually wrong and i don't mean option recompile i'm completely fine with option recompile but i'll show you a few killer gotchas around that as well

**1:30** · we're going to start out with the first thing which is what is parameter sniffing and i'm going to show it in a real ssms here in a second but i'm going to show you the queries that i'm going to use first i'm dealing with the stack overflow database which is the open source database from stackoverflow.com and i'm going to be looking at the users table the users table has something kind of interesting it has a reputation field

**1:56** · there's about five million users at stack overflow three million of them have a reputation of just one point they register at stack overflow they ask a crappy question they get told don't post your homework here and then they go register with a different name because they're so ashamed and then they use the new account from here on out

**2:20** · it's very rare that you see people with a reputation of exactly two points because if you're going to do something at stack overflow you're probably going to keep doing it answering questions up voting people down voting people the vast majority of people either have one point or they have more than one hardly anybody has two in fact in this copy of stack overflow only about 5 000 people have exactly two

**2:50** · two reputation points and i'm going to start my query by creating an index i'm going to create an index on the reputation field but that's the only field in that index this is not a

**3:05** · covering index but you'll notice that my select needs a lot more than just the reputation i also need everything on their user record their display name their last access date their about me field all of that so this index

**3:23** · isn't going to cut it for when i need three million people and i'm doing a select star i really needed a covering index i just don't have one let's go see how it looks so i'm going to pop into sql server management studio here and i'm going to run two queries i'm

**3:43** · going to run select star from users where reputation equals one and then select star from users where reputation equals two you'll notice that this query takes a while square takes like 30 seconds in order to run that's just because management studio sucks at painting three million rows in a grid and that's how many users i'm asking it to bring back in that first query if i click anywhere

**4:09** · in the first result set and i zoom down here to the bottom you'll see that windows loves to pop up things hi i'm metro get out of my life so we come back with about 3.3 million

**4:25** · rows for reputation equals one if i click down in the second result set where reputation equals two i only get about fifty three hundred rows big huge difference between those two sql servers smart enough to build two different query plans in the top query plan

**4:45** · it scans the whole clustered index of the table because i asked for select star if i need all of the fields then it's more efficient to just scan the clustered index and get out whereas if i only wanted say 5 000 rows then it's more efficient to do a quick index seek on my non-clustered index just on reputation and then go do 5 300 key lookups

**5:16** · in order to get those extra fields if i hover my mouse over that key lookup you'll see the output list there this is the list of all the fields that sql server had to go get due to me being a sloppy developer and just saying select star i want all the data now these two

**5:36** · execution plans they have very different costs and if you were in my watch brent tune query session yesterday you'll remember that i said that those percentages 79 versus 21 percent they're not very reliable but in this case that top query is more work i am scanning the whole entire table

**5:58** · a way to see exactly how much work is involved is to use the command set statistics io on when i run set statistics io on it gives me the exact number of logical reads which are 8k page reads in order to pull off this query in the top query in my select star where reputation equals 1 i'm scanning the whole table

**6:28** · scanning the whole table is large it's not as large as 23 seconds might indicate though remember this query is slow just because ssms is not good at painting a lot of results the top query when i do a select star where reputation is one i do 80 000 reads in order to scan the table in the bottom query i do 16 000 reads it's less but remember i'm

**6:58** · getting 5 000 people's information if i look over at the execution plan the reason why this query is a lot of reads is that i had to execute this key lookup 5 000 times i really wish execution

**7:14** · plans were three-dimensional i wish they popped off the page the number of times that they were executed you would all be wearing 3d glasses and then you'd be freaked out when i do jazz hands if you look at number of executions up there 5300 times that's 5300 reads at least

**7:35** · that i had to do on this index sql server has the concept of a tipping point whenever it thinks it's going to touch about 5 of the pages in the table it says screw it i'm just going to scan the whole thing instead in the top case when i go get 3 million rows

**7:58** · sql server knows that's higher than the tipping point and it's more efficient to just scan the table once and be done notice the estimated number of rows here estimated number of rows is 3 million sql server knew what was happening and did the right thing so far so good

**8:18** · now let's switch over and make this thing a stored procedure and i don't want you to think that a stored procedure is the only time parameter sniffing happens you can get parameter sniffing in lots of different scenarios that stored procedure has the same exact t sql that i had before i have just put that select statement inside a stored proc now what happens when i run this stored proc with a reputation of one or a reputation

**8:49** · of two before when i had two different select statements sql server would lovingly hand craft a perfect execution plan for each of those queries but that's not how it works with stored procedures or parameterized sql sql server builds an

**9:10** · execution plan based on the first set of parameters that it gets into that stored procedure so what it's going to do is it's only going to give me one execution plan for both queries zoom out and resize

**9:27** · this a little so you can see so now whether i select reputation equals one or i select reputation equals two i get exactly the same execution plan unfrozen caveman developer says one plan is bad i don't always want to do a table scan sometimes i should want to do an index seek and that's true i am doing 80 000 reads now every time this query

**9:57** · runs and 80 000 reads might sound like a lot but it could be much worse i'll also notice one thing while i'm in here the first time that this query ran sql server built this plan expecting that three million rows would come back look at estimated number of rows 3 million actual number of rows 3 million

**10:23** · down at the bottom that estimated number of rows is saved for every time the query runs from here on out if i have a big stored procedure with lots of lines in it and maybe it's got sorts and joins sql server estimates how much memory the query will need and that estimate is set when the query is first compiled so sql server in this

**10:52** · case might estimate a large memory grant oh my god i'm going to need a lot of memory in order to handle 3 million rows and it's going to use that large grant every time the query runs from here on out that can be a problem if you run lots of these queries at exactly the same time

**11:12** · those of us in the crowd how many of us have monitored page life expectancy this metric and sql server so for those of you who have you know that it kind of drops off a cliff sometimes well if you have a bunch of queries run that want large memory grants whammo your page life expectancy simply falls off a cliff now this isn't that

**11:35** · bad both of these queries ran and remember when i ran them as individual selects the big one took about 23 seconds and the small one took less time here they both take in total 26 seconds so who cares right

**11:54** · let's flip this around and let's do it in the opposite order let me go below the plan cash which just means from this point forward i'm going to get new execution plans based on whatever happens next in sql

**12:11** · server you could also think of this as me restarting the sql server except i have a really flaky version of sql server right now so i'm not going to go restarting it because it's kind of like russian roulette at this point now i'm going to run it the opposite way and now i ran it with reputation equals 2 first now you notice i immediately got

**12:33** · an execution plan and the first query finished but reputation equals 2 was always fast the bigger metric is is reputation 1 any slower because now we have an execution plan that's designed for tiny amounts of data it's designed for reputation equals two

**12:57** · now the query seems like it still finishes in about the same amount of time but there's a hidden nasty thing that's happening inside my sql server right now and in order to see it i can't just see it by query runtime

**13:13** · i have to switch over and look at execution plans now both of these queries are using the index seek plus the key lookup this is the plan that was designed for very tiny amounts of data sql server built this execution plan saying i'm only going to have 5 300 rows come back so it's okay if i use the index and then i only have to execute this key lookup 5300 times

**13:46** · the problem comes in down here the index seek doesn't cost that much more yes we seek directly in and now we have to wade through three million rows to build a big list of uh people that we're going to look up the index seek isn't the problem even though the estimates are off this is the problem look at estimated

**14:11** · number of executions versus number of executions oh i'm only going to have to do this 5300 times oh sweet potato i have to do this 3 million times it's actually executing this 3 million times and remember how i mentioned casually earlier that every time i do this key lookup i have to read pages

**14:40** · well let's go over to statistics i o let's look over on the messages tab and how many reads i did that's more than eighty thousand it only takes eighty thousand reads to scan the entire table and yet now sql server's doing over 10 million page reads we don't notice it in ssms

**15:08** · because it seems like the query is the same speed that it always has been but under the hood inside sql server it's screaming in pain i have a query now that looks the same

**15:24** · to the end users that it always looked it doesn't seem like a big deal but now the server is churning through all of this data every time it runs the query and every other query on this system will feel slower as this little car crash is

**15:44** · happening especially if you're running hundreds of these queries at exactly the same time this is what parameter sniffing really is it's a query that doesn't seem like a big deal but if it happens to get optimized for the wrong parameters you're screwed

**16:06** · so this is the first thing that i wanted you to know is what parameter sniffing is second i wanted you to know how to react to it when it strikes when parameter sniffing strikes what happens is you get a phone call or a page from the end user saying the sql server is on fire we don't understand what's wrong and i swear nothing has happened

**16:29** · they swear nothing has changed whatsoever and they're kind of right i mean anything will cause a query plan to disappear from cash maybe someone updated statistics maybe you hit a certain point where the statistics became invalid maybe somebody did an altar index rebuild on a table so when you're new at this kind of thing here is how you fix parameter sniffing

**16:58** · from the most junior point of your career to the most senior point of your career when you first get started you just walk in there and you hit the power button on the server and you you know hit it again and off you go later you realize that's not such a good idea so you start to restart the sql server instance rather than restarting all of windows

### The career progression of a perf tuner

**17:20** · later you blow the plan cache and then you think you're a fancy pants dba when you go we should rebuild all our indexes every day this way it'll stop query plan problems it seems like every time i do this query plans just get better and you're right but it's only because rebuilding indexes also updates stats at the same time

**17:45** · and when you update stats on an object it invalidates all of the query plans that have that object in it same thing with updating stats when you update stats instead of rebuilding indexes that's usually faster and it seems like it makes the problem go away but you're just gambling that whatever people call that query with next is suddenly

**18:14** · going to be the right parameters i love gambling i'm a huge fan of las vegas this is why i have to still go and do presentations in order to pay for my gambling problems but there's a better way and i don't like gambling with sql server i just like gambling on roulette i'm not smart enough to play blackjack so what i do i'm american we don't have good math i can't count to 21.

**18:39** · so what i'm gonna do instead is i'm going to run a stored procedure called sp blitz cache i'm going to zoom in and show it to you sp blitz cache what this thing does is it examines the most resource intensive queries in your plan

**18:57** · cache normally when your server is under load you're going to see 10 queries inside here but i just restarted this thing in order to do the demo you would normally see a whole bunch of queries and you're going to notice the regular ones on there like if you go home and run this today on your sql server you'll see what i call the opposite of the leaderboard these are not good queries these are the

**19:24** · sucker board these are the worst queries the worst ones in your environment but when you run it during a parameter sniffing emergency you're going to look at one of those queries and go wait a minute users by reputation that's never

**19:42** · on the sucker board why is that thing all of a sudden at the top of the sucker board and notice what we have in here is warnings we do analysis on your queries and then we take a shower afterwards we do analysis on your queries and we say things like it's probably a victim of parameter sniffing it's a query that for exactly the same query or stored procedure sometimes takes hardly any resources and

**20:11** · sometimes takes a ton of resources for exactly the same query that's the classic sign of parameter sniffing a query that's sometimes super fast and sometimes insanely slow now if you scroll all the way to the right hand side of sp blitz cache way

**20:34** · off to the right you have this remove just this one query from the plan cache i don't want to rebuild indexes i don't want to update stats i want to go you know what let me just do a surgical strike and get this one query out of the

**20:54** · cache i'm not fixing anything i'm just trying to get the users to put down the guns so i can do some better performance troubleshooting later so what i'm going to do is i'm going to copy this out and then i'm going to paste it into ssms but before i run it i need to save this plan because whatever crappy plan it has right now this is my only chance to keep that plan and save it so i know i'm going to make you

**21:27** · move around as i go from place to place i'll stay i'll stay solid here in a second and then i'll moon you i'll have the audience moon you won't that be fun so here's the query plans i can click on the plan and i can save it i don't know yet why this is bad i just know that it is bad and if i get all fancy i can right

**21:52** · click on here and click properties and over in the properties window on the side you'll notice that there's a parameter list this tells you the parameters that were used to build this plan

**22:09** · this is the set that i'm going to use in a minute to test because i want to be able to test when i get the tiny plan versus when i get the big plan there might be nothing wrong with these parameters but i need to save them so what i'm going to do is just click file save as really crappy query plan

**22:36** · save that and now i'm going to jump back over into my other window where i have free proc cache and i'm going to run it and i'm only going to clear that one individual plan from the plan cache and nothing else then i'm going to pick up the phone and ask the users is it better now is performance better now when i free that one plan from the cache it doesn't fix any queries that are already running

**23:04** · if somebody already started a query and it's got the crappy plan that query still has to finish so i just kill all their queries instead then i tell them go run the query again and hopefully if they run it again now they're going to get the better plan i am just gambling i told you i liked roulette

**23:27** · maybe they call it again with that same parameter value maybe i go in and call it myself with a better parameter value but all i'm trying to do is get the emergency to stop so now i have taught you the second thing in that list how do you go react when parameter sniffing emergency strike we still have to fix

**23:53** · the query so now let's fix the query and the first thing i have to do in order to fix this query is i have to be able to run it and get different plans i'll tell you a secret i often do this

**24:10** · in production i probably shouldn't but sometimes i have access to servers where i can go edit a stored procedure live most of us don't have that luxury most of the time you're not able to edit the stored procedure so if i give you this query and i say all right go ahead and run this query for me i bet what a lot of you

**24:37** · will do is you'll right click in here you'll click edit query text and then you'll comment this out and you'll put declare you'll comment out the as and maybe you'll set this equals to two how many of you do your testing this way

**25:02** · so when i do it so i've got this exact same query i had before let's click query show me the actual execution plan now when i execute this what plan am i going to get i'm going to get an invalid plan because i'm in the wrong database ah see it was a test so what query plan am i going to get

**25:29** · the same one is what i'm going to go for i do the same thing when i'm not sure i'm like mouth full of spaghetti yes what am i going to get i'm going to get the seat plan right so how many rows does sql server expect to come back here

**25:58** · let me zoom down a little bit that's not 5 000. estimated number of rows 314.7 all right okay no problem that's cool maybe it's just something a little buggy let's go back over here and uh let's uh let's do this to prove that i have nothing up my sleeves free proc cash now let's run it with reputation equals one execute what plan am i going to get

**26:32** · spaghetti is really good how many of you think i'm going to get the scan the clustered index scan how many of you think i'm going to get the index seek plus a key lookup how many of you are just saying that because you think i'm asking the question on purpose \[Music\] so let's see what we get here and this query was never fast it still took 23 seconds

**26:57** · so when sql server does this when sql server's choosing to do an index seek followed by a key lookup it's expecting a relatively small number of rows all right sql server how many rows are you expecting hover your mouse over this index seek

**27:16** · and then you experience the joy of ssms there you go looks familiar right that's not 5000 it's not 3 million that number comes from somewhere else when you use a local variable like i'm using here this guy right here

**27:39** · sql servers not optimizing for that sql server is optimizing for something else entirely this is what your statistics look like on that reputation index dbcc show

**27:56** · statistics is one of those dbcc commands that once you know what it is and you understand how statistics work you don't need to run it often but you need to know that it's there normally when i ran for reputation equals one or two or three sql server uses this little histogram to expect how many rows are going to come back but

**28:21** · when i use a local variable sql server uses something else called the density vector this guy right here watch this select this crazy scientific number times the number of rows in the table

**28:44** · equals a number you've seen before whenever you test code and you do it by declaring a local variable you're never going to see parameter sniffing because no matter what value you pass in sql server always estimates this number so you tune the query

**29:10** · thinking you've fixed the parameter sniffing problem look at me no matter what value i use now i always get the same plan you deployed into production what i'm fired again good thing i'm really friendly with that recruiter so if i'm going to fix this if i'm going to even test it to see how it works i can't use a local variable i have to create a stored procedure

**29:39** · and what messes with people's minds is you usually think i'm not allowed to create stored procedures how can i do this boom execute you can create temp stored procedures just like you do regular stored procedures or regular temp tables so now i can say exec users

**30:04** · by reputation with reputation equals two or one let's say i can go execute this and now when this thing finishes in about 20 seconds this is the only way that i can actually get that three million row estimate and do an entire table scan so when this thing finishes \[Music\]

**30:32** · two one zero execution plan ta-da so now i have a clustered index scan and when i hover my mouse over it now i'm getting an estimate of three million rows so now i've taught you the third

**30:49** · thing first thing i taught you what parameter sniffing is second thing i taught you how to react to emergencies third thing i've taught you how to test your code and the only way you can test it is by building stored procedures you can't use declares of local variables

**31:06** · i've also kind of taught you something else sneaky you may have database administrators who've said you're never allowed to deploy code if you've got access to tempdb now you can drop in temp stored procedures i didn't teach you that officially i just may have kind of sneakily taught you that so we've gone through parts one through three now let's hit number four

**31:33** · how am i going to actually fix this thing for life well the first way oh i should say first two whenever i talk about this i see people with their notepads and their pens are frozen in mid-air and they're waiting for me to get to the option that doesn't suck all of these options

**31:56** · suck there is no one right answer every answer is different for every scenario and i'm going to talk about how some of these scenarios would fail for my stack overflow query they may work just fine for yours first off is option recompile there are two places that i can stick a recompile oh that could get dark fast so i could put an option recompile

### Option RECOMPILE

**32:30** · down at the entire stored procedure level i could say build this stored procedure with recompile so that every single time the stored proc runs the whole thing gets a new execution plan or i can stick recompile on specific statements inside the stored procedure

**32:52** · you always want to stick statement level recompiles in never put them on the entire stored procedure because when you put it on the whole stored procedure you lose all metrics that track how often the stored procedure ran

**33:10** · even if you put this hint on every single statement in the stored proc i'm still okay with that because at least this way i can track how often your stored proc runs i just won't know anything about the statements inside of it i am a huge fan of option recompile

**33:32** · for queries that don't run very often if it runs every three times a minute five times a minute recompile is okay it builds you a perfect execution plan every time that well not perfect but a pretty good execution plan every time it runs the more this query compiles though the more cpu that that ends up using the reason that i don't like running it more often than that is this in sql server 2008

**34:06** · if you ran queries with option recompile there was a chance that you would get my query results and i would get your query results if a user came to you with that if a user brought in a report and said i ran this for ukraine and i got bolivia

**34:30** · you would tell them to put the crack pipe down you would never believe them that's not how relational databases work and you think oh that's just back in 2008 that'll oh it happened again it happened again in 2012.

**34:50** · now i bet at your office there's that one part of the code that you don't ever want to touch because it's terrifying and you know when you touch it 15 other things break when i see things like this happen in sql server that's the same kind of concern that i have there's nothing for me to expect this couldn't happen again in the future i'm okay with optionrecompile when it's not used too often but i may

**35:20** · not want to use it around say healthcare data or personally identifiable data where it would be very bad if mary saw bob's health care results so i'm going to move on to the next option the next option is to slap on an optimize for unknown hint in the query

**35:43** · optimize for unknown works just like declaring a local variable it says i want you to optimize this query for the average reputation in my case at the stack overflow query that means i would optimize it for 314.7

**36:04** · rows that sucks that would cause the parameter sniffing problem to happen for me yes it would be great for tiny amounts of data but when someone runs it for reputation one my server's going to fall over again

**36:21** · optimize for unknown works really well when your data is evenly distributed but if your data is evenly distributed you don't have a parameter sniffing problem all of the parameters would give you the same plan so we jokingly call this optimize for

**36:40** · mediocre because it gives you a plan that's predictable it just may not be predictably good and as a database administrator who was involved with stack overflow along the way i kind of cringed when jeff atwood one of the founders of stack overflow found this hint and blogged about it hey

**37:00** · everybody check out optimize for unknown and i'm like no jeff no that's that's not really a good idea and sooner or later he comes back and he's like blogging to everybody this isn't really a good idea and i'm like yeah i kind of told you about that the other way that you can do this is to slap in your own local variable inside the code you can set up your own local variable and immediately assign that to whatever was on the outside don't ever ever ever ever do this

**37:33** · because when other people inherit your code and they go to look at it they think you're a and the first thing they're going to do is they're going to rip that out because they don't understand how bright and attractive you are right if you want to use this if you want the density vector just use the optimize for unknown hint that scares people

**38:02** · and then they won't touch your code they'll go oh there's some kind of rocket surgery going on over here another way that i could do it is i could hard code business logic right into the stored procedure i could say optimize for reputation equals one

### OPTIMIZE FOR Value

**38:21** · this way no matter what parameter they call it with i will always get an execution plan designed for a clustered index scan because it's a big huge amount of data that might sound backwards but in my scenario this is a great fix clustered index

**38:41** · scans usually sound bad but remember this is only 80 000 reads if the wrong query gets into the plan cache i'm going to be doing 10 million logical reads and that sucks now this has drawbacks too

**39:00** · when you code business logic in or magic numbers inside your data then you have to worry about what happens if the data changes what happens if at stack overflow we suddenly start giving people a hundred points for reputation instead of just one i may have to go

**39:21** · back and change some of my magic values inside the stored procedures but if i really care about performance tuning this might work okay just know that you're racking up a little technical debt you may have to go back and change this code again when your data changes

**39:41** · so another trick you can use i can put branching logic inside my code i can say if reputation equals one go run this stored procedure otherwise if the value is anything else go run this other stored procedure

**40:01** · but you'll notice these have to be stored procedures they can't just be sql inside here because if this was just a simple select up in here oop i got a point over at the other side if this was just a simple select right here it looks like i'm drunk but this is just radio interference as far as you know so if this was just a select sql server would build one execution plan and then reuse that over and over again

**40:34** · but when they're stored procedures they get parameter sniffing so that top stored procedure of reputation one he gets sniffed but he will get sniffed for a reputation of one he will get a perfect execution plan for a reputation of one the second stored procedure will also get parameter sniffing whenever he runs he will get sniffed for a value of

**41:05** · it doesn't really matter it's something other than one and as long as everybody else gets the same execution plan they will get the seek plus the key lookup this is also embedding a little dangerous business logic inside my code

**41:24** · but this is the kind of trick that you can use when you have to scale something really big quickly and you're not allowed to change the underlying tables you can also do lists of numbers in here if you like but the part that i find especially mind-blowing is that both of these stored procedures

**41:45** · could have exactly the same code in them they'll just get different execution plans because they're different stored procedures the hardest way to pull this off is to get a single execution plan that's great for everyone and the easy answer there is a covering index i could build a covering index on reputation and then all of the other

**42:12** · fields but who does that really i can't do that in production i can't cover every single query so this one is much more challenging so the four things that i wanted to teach you inside here first what parameter sniffing is second how to react to it with sp blitz cache with expert mode turned on and just free one individual plan from

**42:39** · the cache after you've saved that thing third don't test it with local variables you have to test it with a real stored procedure and then finally option recompile not such a great trick when this thing starts to be executed more and more frequently and the wrong people may see someone else's results i have a ton more resources

**43:02** · on this exact problem if you go to brentozar.com go slash sniff it also has a link to earl and summerskog's epic post fast or slow in the application fast in ssms erlan presented here earlier erlang's a very humble guy there's something that he won't tell you about himself he has what he calls a blog and the rest of us call an encyclopedia because when he writes a

**43:32** · post he goes back to it over and over for years his post on parameter sniffing if you printed it would be over 50 pages long it has a table of contents in the blog post good on you buddy so now having gone through that what questions do you guys have on parameter sniffing no yes

**44:02** · what if we use dynamic sql i love dynamic sql and it's rare that you'll hear a dba say that you know i love dynamic sql because the problem is it's kind of painful to debug and if you think about my particular query where did my key go if i think about my particular query let me pop up and show this guy

**44:25** · and ignore the fact that it has recompiled if i built a string for that if i build a string and it has a different plan in the cache for every reputation value i can end up with a whole bunch of plans in the cache so it would have one for so let me show you this is kind of neat to see so let's go i'm going to pop open ssms i'm going to start a new window and i'm going to do the things that english presenters will tell you should never ever ever do type in a demo

**44:56** · select star from dbo users where reputation equals one go copy the exact same thing where reputation equals 2.

**45:07** · now i'm not building dynamic sql but i want to show what happens with pure strings sp blitz cache sp blitz cache is the thing that shows us what's inside the plan cache now it's going to take 23 seconds for this thing to run because that kind of select star the first one is going to take a little while but when i get out of here the the last thing that i want to look at after not when i get out of here that's when i start drinking but when this query finishes then i'm

**45:38** · going to start drinking 23 seconds sp blitzcash runs and this line down here tells us what's in the plan cache right now every unique string gets its own entry in the plan cache

**45:55** · and i know what you're thinking who cares well that burns up memory usage memory usage that could be used to cache data instead so if you built a string for every single value when reputation equals three when reputation equals four when reputation equals five next thing you know your plan cache is huge and you're using memory less for caching data pages outside of that i

**46:21** · love dynamic sql and on servers with lots i say lots of memory 128 gigs or more dynamic sql is a great approach i'm a huge fan as long as i have this up let me show you something else that's kind of funny so if i said i said select star from users where reputation equals two one i'm going to take that out and i'm going to do two and three actually no i'll do two and two so both of these are quick they're both short and now how many

**46:50** · entries do i have in the plan cache i have just one entry in the plan cache it says select star from users where reputation equals two i have one entry and it has two executions now

**47:07** · let's say hi mom it's in a comment and i'm going to execute i go down i now have two different things in the plan cache if you change anything in strings they can get their

**47:29** · own plan in the cash you know how sometimes people will bring you this query and they'll say this query runs really slow can you go take a look and the first thing you do is go format it you like paste it into a website to clean up their sql because it's horrible sql you can end up getting a different plan in the cache than they got you're

**47:49** · sort of a victim of parameter sniffing in a good way all of a sudden your query is blazing fast because it was optimized for different parameters now the comment that is a change in the string but let's do this let's say let's format this a little bit more nicely same exact query but it's two different strings when i go down and look i have two different entries in the plan cache now let's go back to our normal

**48:20** · one let's have two exactly the same queries and now i'm going to say from all i'm doing is lowercasing the word from and i get two different entries in the plan cache this is why dbas get a little worried about dynamic sql the more variations of strings that you build the more different entries you can end up piling up inside the plan cache this is also why you never ever

**48:49** · ever build dynamic strings that say things like built on you also try to type things correctly built on 2017 05 15 you know hour hour minute minute for user from brent ozar any strings that you put in

**49:07** · here you're going to end up compiling different plans so imagine that i have two of these i have a dynamic sql generator and the other one says it's being built for because he's a nice guy erlan summerscog execute

**49:23** · if i go down and look at my plan cache i end up with two different entries in the plan cache even though they're identical just don't put dynamic stuff inside strings next question yes you're here erlin summerskog all right so everyone should give a no wait wait everyone should give a round of applause to erlang for his excellent blog post slowing the app faster that's the dinner yes

**49:55** · you're not worried about anything you're a mellow guy yes

**50:25** · your cpu goes on fire yeah so the you're saying that the reason why you don't like option recompile is that cpu use is very high to build up what's that you need to use it wisely yeah absolutely you also noted that you were told by microsoft that this bug was very hard to repro and very hardly ever happens i was also told by my parents that i was very special it was just like a snowflake they were

**50:52** · wrong it's a matter of faith you know it's and it may be very hard to repro i'm actually more worried about the next time they break that same bug just like in one of the recent cumulative updates they broke no lock cu4 i want to believe it was for

**51:08** · 2012 one of the sps you could run queries with no lock and it took locks out building a query optimizer is hard building a storage engine is hard i continuously salute microsoft for what an amazing job they do but they have people who show up drunk to work just like you do sometimes some of you may even work for

**51:30** · microsoft yes so next question i know how many of you learned something here during this session all right cool well thanks for hanging out with me this afternoon and i will see you guys around here tonight this afternoon and tonight thanks everybody you