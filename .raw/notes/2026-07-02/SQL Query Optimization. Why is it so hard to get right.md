---
title: "SQL Query Optimization. Why is it so hard to get right?"
source: "https://www.youtube.com/watch?v=RQfJkNqmHB4"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2018-06-29
created: 2026-07-02
description: "Slides, notes, and donations: https://www.BrentOzar.com/go/dewitt"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=RQfJkNqmHB4)

Slides, notes, and donations: https://www.BrentOzar.com/go/dewitt

## Transcript

**0:00** · well I'll start by telling folks hey the whole reason we're doing this webcast is to benefit the Robert Davis Memorial Foundation or Memorial Fund so if you go to that URL on the slide it's you can leave donations our suggested donation is $25 for Robert Davis's fund Robert

**0:18** · Davis is a Microsoft Certified Master who passed away suddenly earlier this year and he was always giving back to the community always doing all kinds of free stuff on sequel help on his blog MS sequel tips all over the place answering questions at Stack Exchange he just love giving back to the community so what we're asking is if you can give back some to his fund to help his family through their time of need that would be incredible just $25 if everyone on here

**0:46** · donated $25 it would make a huge difference in his family's well-being so when you can you don't have to do it now but either after the webcast when you go to download the slides go down to Brando's our comm slash go slash to wit and there's a link on there to their GoFundMe page you can check that out plus download the slides from today's session so having said all that I will

**1:10** · hand it over to a person who's much smarter than me and needs no introduction amongst this uh sequel server crowd doctor taking it away third oh thank you and welcome to all 246 people that are still listening you know it's actually an interesting technology which I've never used before you know it's equal pass I gave a number of talks and they were really the highlight of my some of my years at Microsoft and there

**1:37** · it's harder to walk out of a talk because especially if you're in the front row but here it's easy to walk out of a talk and I hope you stay with me and I hope you make a donation so this is a reprise of a talk I gave its equal paths I think in 2010 and I remember two

**1:56** · things about this talk one it was incredibly hard to distill the theory into a hour hour and 15 minute presentation and number two my wife was sitting in back with Clinton Clark who was then the GM of sequel it was the first time one of a few times in my life my wife has actually heard me talk and she leaves acquaintance at some point during the talk and says I think there's a math error on that slide no my wife is not a math person and I've heard to catch a math error the bad thing is in preparing this talk I was going

**2:28** · through the slides and I still can't find the math error so I leave it for someone else to try to find it so in title let's talk a sequel query optimization why is it so hard to get right whoops oh I'll click on that now you're good click on the PowerPoint and then it'll start advancing again it's what happens when you click on something else outside a good ok so here's a here's a nursing

### How About a Quiz to Start!

**2:52** · picture and I use this in the talk before who painted this picture and it's actually a picture of the sequel server query optimizer running for - for sequel 2008 running T PCH create which has a bunch of joins and I'll talk about this at the end this is actually a pretty discouraging picture because in this query where - the parameters selection

**3:19** · predicates are varied sequel server will generate 256 plans so very small differences in parameter values produces a different plan now you can see plan 1 is pretty stable over a whole range of parameter values as is plan 2 3 and 4 but down on the left hand corner there are large number of colors we'll come back to that so today I'm going to talk

**3:46** · about sequel query optimization I'm going to start with the fundamentals so this is material that originally prepared for graduate classes when I was a professor and you know it's intended to be a general talk about query optimization and not a specific talk about how to fix the query plans that sequel does a bad job of generating some sometimes and and then I'm going to come at the end and talk about something that I didn't get to finish before I left

**4:18** · Microsoft and that is the ability of really changing the game as database systems move to the cloud and I'll come back about that a little bit at the end so I think this quote is really true optimization is harder than rocket science and it's really really

**4:40** · challenging it's the most challenging component to build in a database system it's really easy to get it wrong it's really easy to have regressions and I think you know it's it's one of the areas of technology that really hasn't progressed much over the years so here's the general rule role of the query optimizer I think all of you understand this pretty well sequel statement comes in it gets fed through parser through

**5:11** · the query optimizer and then out comes a query plan so here's TP CH you know which is involves you know a select with indebted select over these six tables part supplier line-item orders customer nation and two copies of nation and region and it's got a bunch of joins between these tables there it actually

### What's the Magic?

**5:39** · went calculated to some degree of accuracy probably not very high there are about 22 million ways of executing the query so the goal the query optimizer is to on to search through this huge space of alternative query plans and pick one that going to execute

**6:02** · the query as quickly as possible probably rarely do you get the optimal plan but the goal is to get a very good plan in a short period of time now maybe if we all had quantum computers we could explore this entire space and maybe long after I'm in the grave people actually build the query optimizer that takes advantage of a quantum computer but the goal is there are large number of plans and that and that's not a particularly difficult query and there are large

**6:32** · number of plans and you got to pick the query optimizer has to pick a payout plan quickly so it's interesting my my first technical paper in the database field was presented in the same technical session of the annual sigmoid conference which is an academic database conference as Pat Salinger nobody has ever referenced my paper per paper basically

### Some Historical Background

**7:01** · introduced the whole idea of cost based query optimization and as part of the IBM system art project for those of you that are a little younger at the very beginning there was system R which is a project at IBM later became db2 and Mike stone breakers ingress project which was done at Berkeley and these two were the very first relational database systems that were built and Oracle came a little long long a little later as did

**7:32** · obviously sequel server so I really believe this is true it's the hardest part about building a database system I think every place else the algorithms are pretty well known and progress is really limited by the fear of regressions so whenever I was part of the sequel team picky you know making a major change the query optimizer was was viewed with great trepidation it's also

**7:59** · really complicated by a couple things advances in hardware and the restless' of the database software so if you think about it hardware we go back to the 70s late 70s hardware is at least a thousand times bigger and faster the software itself is faster because we felt algorithms to take advantage of the hardware and it's possible because storage is so cheap to query to store it in your relational database system in query just huge amounts of data so you

**8:32** · have this rapidly changing hardware you have this software which keeps improving you have vast amounts of data so the myth the point I'm trying to make here is that um this mistake on a 100 megabyte table may have in terms of picking the best plan it's likely to have much lower

**8:57** · consequences that a mistake over a table that's two terabytes or ten terabytes or a petabyte and one of the things I do in my time now is I do a little consulting for Facebook and their people it really are their petabyte tables that they operate their warehouses over and they

**9:16** · do that actually without query optimizer sometime which is another interesting point not the point of this talk okay so here's the the goal the query comes in gets parsed gets put into a logical operator tree it runs through the cost based query optimizer to pick a physical operator tree and then it gets passed to the query execution so the logical operator

### More Precisely: The Role of the Query Optimizer

**9:45** · tree and we'll see this repeatedly it's the tree that after you parse the sequel you turn it into this operator tree in that operator tree is decorated with operators like selections and drawings and group bys and it's important to keep in mind that the logical operator tree is not the physical operator tree so the physical operator tree is for each of the logical operators pick an algorithm

**10:11** · to execute it so for in the case of a selection on the table for example we can scan the entire table or we can use an index on a predicate in the case of a join logical operator if I'm combining two tables I can use sort merge join hash join nested loops join index nested

**10:31** · loops join so for every logical operator there are frequently multiple physical physical operators or physical implementations of that logical operator we'll talk about this so let's start with a really the world's simplest query we have a table called reviews and I'm going to compute the average rating of all these movies the table has as you see in the upper right hand corner of the slide date customer ID movie ID and

### A First Example

**11:01** · rating and as Brent said at the beginning if those either missed it these slides are the on breadths website and you're welcome to send me questions by email later on and Brent will get you my email address I forgot to put it on my slides as I said I'm retired so I lots of time Dan Sereno okay so here here we have this the sequel

**11:26** · statement hopefully it's syntactically present go through the parser and outcomes a operator tree so at the bottom we have a table called reviews we on top of that we have a selection which is find the road find the reviews from movie 932 and then take those in computer an average rating for that movie now there are two

**11:53** · possible ways we might execute this query so so on the Left the green we've seen every we seen the logical tree on the right we see two physical trees query plan one takes the reviews just looks at every single review applies the filter and then computes the average by

**12:12** · computing a count and running some so that's typically how that ridges are computed you take the rows you count how many rows you've seen you produce take a running sum and then at the end you do the division to get the average an alternative is to take a news and index on the reviews table on movie ID and take movie ID 932 and pull from the

**12:37** · reviews table all the all the reviews for that particular movie and then feed those rows into the average aggregate computation so we scan this quick review what I said scanned by the entire table we the number of disk i/os will be equal to the number of reviews and the iOS will be sequential so I'm going to look at the first page or reviews and the second page reviews and the third page reviews the filter is applied to all the

**13:06** · rows and only rows that satisfy the predicate get passed on to the average the second one is which uses the index we'll just retrieve the rows with movie ID equal 932 and since we'll say assume that the index is not clustered on movie ID ideas the sort order is different every single row we pick out using the index will involve a seek and you know these

**13:35** · numbers depend very much like is it on a moving head disk is it on an enterprise moving head desk or SATA low-cost moving head disk is it on flash so this is one of the challenges the optimizer builder has is the query optimizer has to press to calculate the cost and the cost is typically in execution time but the

**13:59** · optimizer builder has no clue about what your i/o subsystem looks like how big is your memory and it tries to incorporate that some extent but not the extent to which would be possible and certainly not the extent to which it's gonna be known in the cloud and then we do the same thing so which plan which plan is cheaper well the optimizer must estimate the cost of both plans I'm going to dive into during this presentation how of the

### Which Plan Will be Faster?

**14:30** · optimizer goes about estimating the cost the first thing you need and we're gonna again go into this and talk about how it's done practice we need to estimate the selectivity of the predicate of em I'd equal 932 and then we need to

**14:46** · calculate the cost in terms of CPU time that IO time and it's weird because you the optimizer has to add together these two units which are you know they're both in seconds or milliseconds since terms of time but they're really sort of sort of apples and oranges that you're adding together now the to get the

**15:09** · selectivity so the selectivity is basically how many roads to get the selectivity the query optimizer uses statistics about each table to make these estimates okay so and we're going to talk about histograms and statistics in a second and it turns out that the best plan will depend exactly on how many reviews there are for this particular movie now notice not all movies are clean so Zoe's may only have very few reviews and for those movies maybe using the

**15:41** · indexes the better plan but for a super popular you know blockbuster movie with millions and millions of visits and reviews maybe the sequential scan will be better so this the kind of thing this this non-uniformity and data really can hurt

**16:01** · the ability of a database system to estimate selectivity and we'll see how histograms get around that problem so here's the $64 question how many reviews from the movie will there be ok here's a slightly more complicated query here we have reviews we're looking for reviews written in July for highly rated movies

### A Slightly More Complex Query

**16:25** · now there might be three physical so you know I'm not going to show the logical plan but here's one physical plan where we do a sequential scan we apply the filter of the date filter and then we apply the rating filter another one is to use in index on date to figure out all the reviews in this range of dates and the second is to filter out the rows that have reviews that are 9 or less and

**16:57** · finally there's a third one which is to use the non-clustered index so we'll assume reviews get put in in sequential order here so the data index sort of you see those lines don't cross at the bottom of the index so the data is clustered primary index if you will and

**17:18** · rating as a secondary non-clustered index indicating that every time you go through the rating index you're probably into a disk i/o so here's the third option now the order so we're gonna

**17:34** · assume that the we're going to talk about this a little bit the quarry optimizer estimates the selectivity factor of 10% 0.104 the index look up and 0.01 for the rating greater than nine because that's really a super movie so there's going to be very few movies with a higher rating so here are the various selectivity factors of various filters or predicates that this query has and the cost if you depend on some certain

**18:08** · make some certain assumptions the cost of the first plan optimizer estimates to be 100 seconds the cost of the second plan 11 seconds and the cost of the third plan 25 seconds so the optimizer after estimating the

**18:24** · selectivities and well first of all it has to enumerate some logical plans logical plans will come and here here are three physical plans for one logical plan and we have three three operator trees estimates the selectivity and then it uses its model of the database system and the algorithms that run on that database system and the hardware which is a little bit on the abstract side to calculate an actual cost and then it's

**18:52** · going to pick this middle plant it's going to decide that looks like the best plan so the the basis of enumerated all these different plans is is we call we

**19:08** · call this enumerate we're gonna numerate equivalent logically equivalent plans by applying these rules so for election for example selections and joins commute with each other so I if I have a green predicate and yellow predicate on the customers table it doesn't matter what order I apply them in if I join reviews

**19:29** · with customers that's the same as joining customers with reviews when is the outer table table on the left is the left ape is called sometimes called the outer table table on the right is the green table those two ways logical plans

**19:46** · are going to produce exactly the same result both gonna the result of the query will be as indicated by the selects now joins are in addition being commutative their associative so for example here I have join of customers and which then gets joined with movies but I

**20:04** · could also start off by joining movies with with reviews and then during the result of that table with customers so both of those logical plans will produce the same result and this these equipments rules allow of the query optimizer to enumerate all these logical plans which will see select distributes over joins so if I have a select on customers if I have a customer and

### Equivalence Rules (cont.)

**20:28** · joining customers with reviews and then selecting out some customers I can also push the selection below the join so here I apply a selection to the customer table and only those customers that satisfy that selection predicate get joint obviously that's something pretty optimizers always do they always try to push selections before joins and then I can do projection if I have a table that I want customer ID a name for some part

**21:00** · of the query and then the final result only has name I can actually push these things together and just project our name so let me give you some examples of equivalent logical plan so here's here's my sample database really simple customers with four columns at the bottom left reviews with four columns at the body bottom right and movies with four columns and the keys our customer

### Example of Equivalent Logical Plans

**21:28** · ID is the key in the customer table the the key of the reviews table is customer ID and movie ID and the key of the movies table is movie ID so here's a query that says give me the title and directors from these three tables movies reviews and customers where the customer

**21:51** · lives in New York the rating on the movie is that the customer gave is above seven and then we have the join so we're looking for the titles and directors of all movies by customers live in New York with ratings such that the rating of the movie has greater than seven the rating that customer gave was greater

**22:18** · so here is one logical plan so we have a couple selections sit equal New York on on customers Radian greater than seven on reviews and then I'm going to join customer ID with review ID and then join the result of that join with movies reviews that movie ID equalled movies that movie ID and then do a projection so here's here's the one possible logical plan there there are five

### Five Logically "Equivalent" Plans

**22:51** · logically equivalent plans so if we pull selection above the join probably not a good idea in general that gives us one we can do another selection pull the yellow selection up above the join that's another one we can do this one o

**23:11** · uses the commuter conductivity role will excuse me to flip the yellow select and the green select so on the one on the right has yellow over green the one on the left has green over yellow so we apply the predicate a couple different orders or we could start at the beginning so here five from the original logical plan I grated five four

**23:38** · different alternatives to that that plan and therefore more I can find conductivity and you think you can click through these slides when you download them I can flip the order of the joins and joining so I can from the upper from

**23:55** · the one in the center I can push the join of movies with reviews down I can do push pull the selection up select conductivity apply the select conductivity rule blah blah blah in general if you sit there and do all this PowerPoint which I remember taking this forever oh well here here are nine logical plans so in this is really super

### 9 Logically Equivalent Plans, In Total

**24:22** · important so here's a query involving two joints and I'm sure a lot of you write queries we many many many joint Moore joins than two joints here's pretty simple query by filing nine logical plans and and notice this is critical to keep in mind at this point I haven't picked physical plans

**24:44** · for any of these for each of those joins I might use nested leads use hash joint I might use certain merge-join I might use index nested loops um so there's just a tremendous explosion when I convert from logical to physical but even among the logical space there are lots of different ways that I can execute this query so the second phase

**25:15** · is enumerate so we've seen how we enumerate the logical plans space by applying these equivalence rules comity project you know push distributivity etc and again I encourage you to download the slides load up the PowerPoint all I

**25:36** · ask about the by the PowerPoint is if you lift a bunch of slides please attribute the slides I love people to take advantage of all that work generating that PowerPoint but please attribute that where you got that so

### Physical Plan Example

**25:52** · let's assume that the optimizer has three common join strategies nesting and I'll talk a little bit about those a little bit nested loops sort merge in half joy and two ways of doing selections and I'm pretty much ignoring group by you know aggregates with group

**26:10** · by but they're a couple different ways of doing those so I tried to make the queries as simple as possible so here's you know one of those or Michelle that's a really good question Michelle says does the query optimizer stop here and choose the right logical plan before it keeps going to the physicals or visit oh great great know it so it's going and you'll see

**26:33** · this in an example will click through in the bit for each of those logical plans it's going to explore a whole space a physical plan but it's going to use something called dynamic programming or to try to prune

**26:49** · physical plans as quickly as possible so no it's a great question no it's going to it can't just pick one logical plan at this point it has to do it has to expand the logical plan into a umber of physical plans before it can do pruning does that help yes that's perfect yep okay yes stop me anytime okay I don't

**27:17** · know if you want to take it now or not but Todd also asks he says have you that was there any thought into offloading this to GPUs or to having a central query optimizer that you could push query plan design off - that's a really

**27:35** · good question I you know there there has been some work on the use of GPUs for executing relational operators but as far as I know nobody has ever explored for query optimization and that's a great research project I'll suggest it to some smart MIT grads it is an

**28:00** · interesting question you know GPUs are really good at applying the same operator to large amounts of data I don't know that's a good question okay more question we break more questions there's one other one mark asks has there been any research into having the query optimizer estimate the different cost of different hardware like spindles versus flash a few versus high cores low versus fast memory unless

**28:29** · I mean I didn't gone from Mike from Microsoft for two or three years when I left the answer was no there's some attempt by the optimizer to do some sort of estimate about you know how many cores and and how fast they are but

**28:45** · they're there's there's no Curie optimizer that I'm aware of that actually runs that set of tests on the installed on which the installed database system is installed to calculate exactly how fast the CPUs are and how many cores there are how fast the i/o subsystem and

**29:05** · the reason is it's not important to get the exact cost correctly okay that's really important to understand what's important is to get the relative cost of the alternatives correctly so

**29:21** · you know the optimizer guessed this thing's going to take a hundred seconds and this other one's going to take 300 seconds whereas in fact they take 10 seconds and 30 seconds all that you care about is that the estimated times are in the correct relative order to relative order to each other as the actual times are so you you want the estimated and actual to be of all the different plans to be ordered in the same sort of total order okay perfect here's one of these

**29:56** · nine logical plans here's one physical plan so I'm going to use this sequential scan as we threw all the pages of the customer table and then you use an index scan to pull out reviews that are

**30:13** · particular for a particular movie that I'm going to do a half join we do nested loops drawing to join the result of take the result of the orange join and so you see I've taken a label these and these logical operators with physical algorithms that the database system is implemented and then I mean using nested loops for my last join there there are

**30:37** · so remember there were women I forget already you guys asked me questions I'm kind of old there are nine logical plans okay sorry sorry for the clicks guys there are nine logical plans and there's one here's one physical plans for that

**30:56** · single logical plan with nine logical plans there are about three hundred twenty four physical plans that the optimizer must enumerate and cost okay so this goes back to Mich Michelle's question we take the logical plan for each logical plan we're going to try to all sorts of alternatives physical plans and then we're left with this stack of 324

**31:22** · physical plans that we need to cost and and then we'll pick the best one and again this is a really simple query to joins a couple selections and a projection and the technique uses dynamic programming and I'm gonna try to explain how that's done the actual algorithm is really complicated and sometimes optimizers work bottom-up and taught the sequel server happens to be a top-down memo based optimizer but but the idea is it's okay to numerate 324

**31:54** · plans for the simple query but as we saw at the beginning that TPC H query which had five six seven tables there were 22 million logical plan alternatives let alone physical plants okay so here are

### Query Optimization: The Main Steps

**32:11** · the main steps we enumerated the logical plans for each logical plan we enumerated the physical plans by for each relational operator looking at the alternative algorithms that can be used to implement that and now we need to cost all those plans so how do we estimate going back that really simple query how do we estimate how many rows will satisfy this simple predicate movie stop movie ID equal 932 so the plan

### Selectivity Estimation

**32:45** · quality estimating the cost of plan is really super highly dependent on the quality estimates the optimizer makes and the standard way of doing that are histograms now it's interesting some database systems if you look at some modern database database systems like

**33:08** · presto or that for big data warehousing there are a lot of systems out there that still don't have histograms even though they've been around since a guy named Bob coy at Berkeley as a great student introduce them into an early version of ingress they're a bunch of different flavors of histograms I'm going to talk about two equal width and equal height so here I here I've shown a

### Histogram Motivation

**33:37** · simple little bar chart and I'm gonna take a second to explain what this bar chart looks like so the x axis are the customer ID values in the reviews table so there are 20 customers okay so this is really simple okay everybody the so customer one has five reviews customer two as fifty two reviews customer three has eighty three of the reviews over on the right customer 19 has already made only made five reviews in general it's impossible

**34:09** · to for every customer in a database or every you know sort of major entity in a database that to keep track of how many how many values or how many reviews there are so so if you run this predicate select customer you know how many reviews and customer nine did make up reviews his customer nine given will

**34:43** · look and say he nine has done 55 reviews out of a total of nine hundred and thirty nine reviews in this table so the selectivity factor is about 6% 0.059 so six percent if the predicate is what

**35:01** · it's a range predicate between two and three inclusively if you look over here on the left there are customer two is done 52 customer three has done 83 so the total is 135 reviews over nine hundred thirty-nine total reviews so about fifteen percent and as I said

**35:25** · earlier there's generally not enough space in the catalogs to store statistics for each distinct attribute value and in the solution modern database systems use is called histograms so this first kind of histogram is called an equal width I take the key range in this case just one to 20 and I divided into five buckets so I have one one customer ID 1 2 4 and the first bucket 5 to 8 9 to 12 12 to 16 17 to 20

### Equi-Width Histogram Example

**35:56** · so the last bucket only covers four customers the rest of them cover five so and then I get together so if you sum up how many reviews customers 1 2 3 and 4 have done they've done about 82 reviews by 6 7 8 about 161 etcetera so I've

**36:16** · taken 20 values and I've distilled it into 5 different values of counts and in fact it's sequel server at least the last time I looked no matter how many rows are on a table the histogram the maximum size of a histogram I believe method number of entries in histogram is 255 or 256 something like

**36:39** · that so there's a pretty standard size that histogram uses for a table not for excuse me for each column of the table and it's it's kept relatively small so that the tape that the amount of space consumed in the schema and the catalogues is not too great so here are the actual what ends up in the histogram

**37:06** · yeah what ends up Susan a thank you what ends up in the histogram 146 309 I added these things wrong earlier 8 186 and 206 so let's go back to the previous example from the previous slide where I had the count per customer exactly we saw that customer 9 had 55 reviews out of 9 39 so

**37:31** · 6 percent the estimated I take the customer 9 value the in the predicate I look up the value for the histogram for the range 9 to 12 and I see that there are 4 values in this range that's why so there 186 total therefore values that this covers nine ten eleven twelve and there

**37:53** · so we take 186 and divide it by four because we assume uniformity within the bucket range and then divide that by nine thirty nine and so we get a pretty accurate estimate so we've saved a lot of space in it for the histogram and we get a pretty accurate estimate let's

**38:10** · take a slightly different one the actual selectivity factor ten reviews over nine thirty nine so about one percent the estimate again I take customer five I'd look at my histogram to see what range covers it the range is five to eight three hundred nine reviews total reviews for this range and there are four values five six seven and eight so I divide 309 by four and then divide that by the total number of views and I get eight percent okay so

**38:40** · this use of histograms for this particular predicate for the first predicate it was pretty good customer ID equal nine the customer ID equal five it's it's off by a factor of eight and this is the kind of thing that happens to pre optimizers all the time the statistics might not be up-to-date the histogram doesn't capture distinct

**39:04** · values very well but this is an 8x error in the selectivity factor which is bad so there's another way of building histograms this was again called equal width because I divided the key range into equal size buckets there's another

### Equi-Height Histograms

**39:22** · approach which is instead of dividing the key range equally I divide the key range so that each bucket has approximately the same number of values so here you see again my key range from 1 to 20 I have you know my count for the

**39:39** · various history you know reviews for each of the buckets there and then I could aggregate things together so range ID range 1 to 5 has 156 total reviews 6 has 157 78 has 142 so to the max to the

**39:59** · maximum extent possible I want to make sure that every bucket in the histogram has exactly the same value and that will never happen exactly perfect but this is pretty close so let's look at the errors in in the two so here now we've presented the two equal with and equal with equal height together example one that was our

### Equi-width vs. Equi-Height

**40:26** · problem one customer ID equal five we the estimated error the actual selected in factor was 0.011 the estimated selectivity factor is point eight if we take the same predicate and look at the

**40:41** · equal height this to Graham I'm still off I that range has 156 values in it reviews in it and I asked mate factor of three so I've got an effective you know I've gotten a factor of two and a half better by switching from equal with equal height here's another example

**41:02** · here's the the problem one so recall that equal height value six is a very frequent value okay that person that customers reviewed a lot of movies and if you use an equal height equal width histogram it estimates selectivity factor of 0.08 eight percent as opposed to actual sixteen but with a equal

**41:28** · height histogram you get a perfect estimate so this is why sequel server for example uses an all modern database systems use equal Heights histograms actually they use something beyond equal height called max diff and they will keep some additional values to get even better estimates and this has work done by Jana Sanitas at Wisconsin many many

**41:54** · years ago and you can look up next if histograms Frank Gill while you're on there Frank Gill thinks he saw the math error if if you go back to sorry okay so this slide shows 993 as the denominator and I think the one before that shows he said shows nine thirty nine he thinks that might be it oh yes good Frank Gill you win a prize yeah she

**42:21** · went a prize tell my wife somebody found it again so thank you Frank and I'll try to fix this in case I ever give this talk again thank you okay let's click through these so histograms are really really critical and error still occur

**42:43** · and we'll see especially if they're correlated attributed so I'll come back to that and obviously other statistics started by the database system the number of rows the number of pages in table the number of distinct values in a column the number of nulls in the column so there are a large number of other statistics that the query optimizer depends on so to estimate thinking of

**43:09** · blank site is is this attribute null in this table so you want to be able to estimate selectivity from that kind of predicate the second next thing I want to talk about is the cost of estimating the execution cost of of each operator in the plan so there are two main factors that database systems worry about how much time is spent doing disk IO and how much time is spent doing CPU now the interesting thing is no query

### Estimating Costs

**43:41** · that I'm aware of does a great job or any job of saying how much buffer how big is your buffer pool how big is your search space okay obviously if your buffer pool is big enough to hold your entire database your entire table database system is at run time is probably never going to do much IO might do some IO to bring pages in off the off the mass storage device but this gig in

**44:12** · goes back to the question why don't database systems look at the current hardware in estimating these times it's just it's just not done because the goal is to get good relative performance and not exact performance or exact cost

**44:28** · and that's just what I said and then in a parallel database system such as sequel DW or redshift any of the parallel presto any parallel database system there's an additional cost that the optimizer will consider and that's when you do it you have a parallel database system you sometimes have to shuffle data among the nodes of the parallel database system if you're running on some versions it's equal DW

**44:57** · the date the table sits on has your storage other versions of sequel DW my understanding is there now is an option for local SSD storage or flash storage but that's a third this is a third cost and I'm gonna ignore that since we're not talking about parallel databases today so here's here's my query you've know this really well by now there are two physical plans which plan is cheaper so let's assume that they're there the

### Plan #1

**45:28** · table reviews has a hundred thousand pages they're 100 rows per page they're sorted on date it's stored sequentially so I can read it at 100 megabytes a second which is a reasonable number for a single disk drive if it's on flash should be running a terabyte us or a gigabyte or two it a second so it's gonna take about eight seconds assuming pages are about 4k we apply the filter

**45:54** · to ten million rows because that's a hundred thousand times 100 is hopefully ten million the optimizer estimates a hundred rows will satisfy the predicate let's assume that it runs at a tenth of microsecond per row which is probably a little bit slow from modern CPUs we're

**46:14** · ignoring whether it's multi-threaded or not if it's multi-threaded multi-core machine this these these predicates will be applied by the different cores in parallel and eventually we have to compute an average aggregate and we'll take those hundred rows that's outside the predicate and feed it to the average and again that can be paralyzed at the

**46:39** · low level so again we'll assume something really simple the hundred rows get processed by the algorithm at a tenth of a microsecond each and that's gonna be one hundred thousandth of a second or think 110 thousand thousand ten thousand one hundred thousandth of a second not very much so the optimizer is gonna say okay if I

**47:05** · pick this plan it's going to take about nine seconds now plan two is to use that index remember that index reviews is sorted on date and and movie ID indexes non-clustered that's what's funny little whines at the bottom intended so we say a hundred rows are estimated to satisfy the predicate we're gonna assume that to disk i/os are done for each of the hundred rows 0.03 seconds per IO and 100 megabytes a second about again estimating if it's

**47:37** · flashed the sikhs don't matter too much like at all and so the IO time will be 0.3 seconds the average computation same rate to process the aggregate rose 0.3 seconds so clearly plan 2 is always the plan to pick you know plan 1 was 9 seconds it's nine seconds plan two point three seconds oh that's not always true what if there's a mistake in the estimation so what if this thing is just

### But ... . What if the estimate of the number of rows that satisfy the predicate MID - 932 is WRONG?

**48:12** · simply wrong the estimate instead of a thousand rows instead of a hundred rows satisfying this predicate you didn't have good statistics you never created statistics in the first place you've been a lazy DBA you you you would get a graph that looks something like this so here's a here's a graph where I've plotted on the x-axis the number of rows that satisfy the predicate the there's you see the

**48:42** · hundred-point so it's a log plot on the x-axis that's indicated a hundred it takes about 0.3 seconds so that's the blue dot on the left in general the the green line is the cost of using the index as a function of the number rose that satisfy the predicate okay the red

**49:03** · line is what happens if you just sequentially scan the table okay so that's oh except for a modest increase in number of rows you have to process that execution time is always a pretty constant nine or ten seconds so there's a crossover point no can I use my mouse that's kind of interesting okay and yeah there's a yeah so you know I never done these before so maybe the next thing I'll do a better job you guys losing

**49:33** · people like flies okay I feel bad so the crossover point is the point at which it becomes cheaper to just scan it than it is to use the index and again this is why it's so important for the optimizer to be able to accurately estimate through histograms how many rows are

**49:57** · gonna satisfy a predicate and it's so important to do update statistics and why database systems collect histograms all the different columns that make sense too because they're these cost curves that will cross over and one algorithm will become that was really good became bad and and frankly this is one of my pet peeves okay nuts no sequel server optimizer guys are listening on there I I found especially sequel server

**50:25** · far too often wanting to use index nested loops join when it would have been much better to do certain or join that doesn't happen and adjoin it for in a simple query but it think of a query that has many

**50:41** · different joins in it and many different selection predicates and errors propagate upwards so maybe the the error calculation at the bottom of the physical plan is quite contained but those errors propagate and multiply so

**50:56** · that the input statistics for the estimates way up for jointly a pie in the query tree are almost always wrong and this again will come back to this in the why the clouds gonna change things so here's my slightly more complicated query where I'm finding movie titles and directors for customers in Newark with rating greater than seven so there are

**51:21** · three basic joining methods which we've talked about nested loop sort merge and hash join very different performance correct characteristics and critical for the optimizer to pick the right one these things are really simple to think about certain urges a very classic

### Sort-Merge Join Algorithm

**51:38** · algorithm you sort one table in the joint attribute you sort the other table in the joint attribute and then concurrently you scan the two tables gluing matching rows back together this is four equal joints and almost all joins are equals so this is a great algorithm very stable gives us a similar performance over a large range of sizes of reviews and movie tables so here's

**52:07** · basically the algorithm we sort it we sort movies and then we merge and there's a little loop that pulls a row from reviews pulls a row from movies and these cursors move downward in the two tables looking for matching and it once

**52:22** · the two tables are sorted it makes one sequential pass so the cost is certain and this is beyond this talk sorting can actually be done by reading and writing basically any table twice so I read it I produced a bunch of sort of runs I write this sort of runs that emerges sort of runs so it's four times the number of

**52:46** · pages and our iOS four times the number of pages and M iOS and then a final scan so total cost basically if you will five passes over the our table and five passes over the movies table and it's not so bad nested loops does sort of the

### Nested-Loops Join

**53:05** · obvious thing it takes each page of the reviews table reads the entire movies table so you can read through this code pseudocode a little bit later but basically takes a reviews page a block of the reviews table for every in that block it basically scans the entire movie for everything for the whole block it scans movies once and that's an N squared algorithm so it's one scan of our and ar-ar-ar

**53:35** · I have two for every block and our I have to scan all of them and index nested loops works in similar way I take reviews I have a nested let's join but instead of scanning movies for every single block of our or page of our I

### Index-Nested Loops

**53:56** · just used the joint attribute values out of the reviews to do it index lookup and here's the basic algorithm the cost per million is you've got a scan our for every block of our you have to figure out how many rows are on that block so the total number of rows in the table is this is is kept captured by this so this

**54:19** · is the number of rows and the number of tuples in that table divided by the number of pages in that table so this pay this basically says how many rows on average are there per page so this is the point here that if you take the total number rows divided by the number of pages you get to an average number of rows per page and you assume that there are two disk i/os done so you

**54:45** · go to the index and then you go to the data and that's probably a little generous that constant could maybe just as easily be three if the table is really big and consequently the index has three or four levels so if we assume

### Estimating Result Cardinalities

**55:01** · reviews has a million tables for our simple query and the selectivity factor of the date is point one and the selective you factor the predicate on reviews is 0.01 the number of qualifying rows here is a hundred thousand and the number of qualifying rows that will satisfy this is ten thousand how many rows output rows of the query produce turns out if they're not correlated you can just multiply selectivity factors so

**55:31** · if the date of the review has nothing with the actual review we can estimate from the million rows that are in this table the pret the query is going to produce a thousand rows but if they are correlated if if that picker month had great movies okay it could be as high as

**55:54** · ten hundred thousand rows okay let's assume that July this is July it's black blockbuster season everyone loves the movies and so the dates are cordial correlated and we may get a hundred thousand rows out of the two and why does this matter well here's this query and if we send there ten thousand pages and 80 pages row in movies it's two thousand pages and the primary index here's what we'll get for let me just

**56:25** · pop back here's what we'll get for the performance of different drawing algorithms so here I've plotted the selectivity factor of this predicate okay rating greats of the rig in the upper left the rating is greater than 9 and the date is for July and so I've plotted

**56:45** · the selectivity factor this is a log plot on both axes log log plot so if and so here's the selectivity of the predicate varying from that looks like 1 million 1.0 0.8

**57:07** · the performance of the different join algorithms so so again the kree appetizers given this very simple query and given this selection predicate which looks pretty innocuous rating greater than 9 and date in this range the joy

**57:25** · algorithm picked but whether it's the right algorithm or not will depend on the selectivity of that predicate if it's not correlated we said they're gonna be a thousand rows out of a million you know we're over here on the left but if if they're highly correlated and we're over here on the right here we see sort merge yeah which is pretty close to Mew no matter what happens or just about the same I this is the orange is sort merge the

**57:58** · block the brown line at least on my screen is nested loops and the blue line is index nested loops so if you're over in the left-hand selectivity factor if

**58:14** · you if the optimizer guesses at the left index nested loops is the right thing to do if it's in the middle sort of the nested loops is faster but there's a huge range on the right where certain urge is by far by far look at that's a

**58:34** · log scale on the y-axis so certain Birds takes it most nine seconds and these nested loops algorithms will take order of a thousands you know a thousand five thousand seconds and that's a huge

**58:50** · performance hit and so this kind of thing we're estimating these complex correlated predicates is just super hard and the consequence can be huge so sometimes people have talked about building multi-dimensional histograms taking two attributes and here you see an example I don't know I don't know whether sequel server currently has them or not but it is an idea that the

### Multidimensional Histograms

**59:20** · research community has explored and this would allow you to capture correlated active use for at least two if there are three then you're in a three dimensional space so I think I'm gonna skip this for

**59:38** · sake of time and you can look at this you can hear hearts breaking so yeah I've already talked a number so how big is the plan space involving end tables so again the steps we've talked about enumerate the logical equivalent plans for each logical equivalent plan enumerate all alternative physical plans estimate the cost of each of the alternative plans and the question is how big is the

**1:00:10** · planned space now it turns out the answer is dependent on the shape of the physical plans so here are two common query shapes and I call these start these are generally called start stars queries and chain queries so you'll see the start query has a fact table at the center and it's joined with a bunch of dimension tables a b a b c and d so here's my big fact

**1:00:39** · table i know i haven't made these you know to size that pologize here's the chain query a joins B B join C C drains D D joins F ok so here are five tables and each table well B C and D get joined with two other tables it gets a and F just get join with one other table so if there are

**1:01:05** · five tables as I've shown with this example there are 384 logically equivalent plans for the star query and 224 for the chain query okay but if you

**1:01:21** · look down this chart if there are eight six tables involved and star has 38 40 possibilities of logically equivalent physical plans we get down here to 10 where we've got a lot of plants okay 18

**1:01:38** · million plans and in fact typical queries fall both between these two alternatives um no how could you say that how could there be let's go back to this example how could there be five logically equivalent plans

**1:01:57** · for this thing here well I can start with the join think about this I could start with the join of a and F or I could start with and then take that and join it with D now and then take the result of that and join it with C and then take that in join up with B or I could start with this pair and then do this pair and then do this pair and then do this pair or I could start with this pair and then do this pair and then through this pair then do this pair so this is how if you actually run the math

**1:02:29** · that these I think are the right numbers unless there's another math here so we'll move on before somebody discovers no no that's not quite right turns out so so again the shape of the query typically is sort of between these two alternatives and lots of time steroids are very you know very popular

**1:02:54** · another thing that's done is is to not do bushi plans so here's what I call a bushy plan so notice that I have a join of a and B and I take the result of that and I join it with the result of first joining D and E and then taking the result of that yellow join and feeding it into the green join which is feeding into the turquoise right generally

**1:03:20** · database systems to again reduce the plan space because you got to cost all these alternatives generally just consider right deep query plans so excuse me left deep quarry plans so I join a with B I joined that with C I join that with the join that with ease so this is has a big big impact on how

**1:03:44** · many logical alternatives are remember I have an enumerated physical alternatives so here's a little graph or chart start run queries on the Left chain doing queries on the right the number of tables involved and you look and see for each type general type query shape star versus chain star bushy star

**1:04:08** · left deep huge reductions by going left considering only lefty plans so that's another compromise database query optimizers mate because there could very well be the best plan could be one of those bushy plans that gets ignored if the optimizer only those left to eat but you going back to the beginning the goal query optimizer is to get a pretty good plan in a short period of time you can't

**1:04:34** · afford to spend weeks or months optimizing an eight-way join query okay it's got to be optimized in a few seconds so again these are logical plans only with three join methods and joins in a query that the actual math looks something like this three to the N physical plans for each logical plan and this again this formula calculation ignored the selections because there might be three alternatives for each selection so the

**1:05:07** · number of physical turn is again really blows up quickly and you know here's the last little bit for lefty eight eight table star join query 10,000 difficult and 22 million different physical plans with three joint methods so the solution

**1:05:29** · to this problem is something we call dynamic programming and it's either done bottom-up or top-down and the idea is of one avoid enumerate Li and number two prune aggressively and we'll talk about that but they are heuristics and they sometimes cause the best plan to be missed so the idea is to perform the

**1:05:55** · optimization in n passes where end tables are joined pass one finds the best lowest cost one relation plan and pass to says you know here's the best way of doing these selections I'm Mela stay with this example what's the best way of joining this single relation plan to another relation and then I take the

**1:06:20** · two relation plans and I join in the third table and I take a third the you know the best of the three relation plans and join in the fourth so this is takes n passes one per table and the optimizer will aggressively prove both lowest-cost and interesting order and let me so let me give you an example and then finally order by a group by aggregates those are all pretty much done at the final step still exponential

**1:06:50** · in the number tables so here's a simple example for tables ABCD some selections on every table but the yellow table B so you can think of that maybe as a fact table so what does it mean to generate all the single relation plans so first I

**1:07:12** · start with a and I say okay I could do sequential scan or index scan for B I can do sequential scan for C I can do sequential scan or index scan and for D I can do sequential scanner index again notes so those are single relation plans those are physical plans which are alternatives that I need to estimate selectivities and cost well all them are going to the same selectivity but they'll have different cost so that's my

**1:07:40** · single plans now here are the estimated cost associated with those and notice I'm going to prune out you know if you look at these C plans this plan on the Left cost 38 the plan on the right cost 18 and so I'm going to get rid of it and the same over here this index scan on D takes 95 seconds for us cost of 95 this doing a sequential scan that only cost 42 so I'm gonna I'm going to keep two

**1:08:14** · plans here but for every other table I end up with one single relation plan now I have to take each of these tables a b c and d after I've pruned in their cost and and join them according to the shape of the query which I've shown in the upper right so age a can join with B be

**1:08:38** · can join with a but B can also join with C or D next C can only join with B and D can only join with D so I have started adding okay here's a t joining with B and I could do it making a V outer and B the inner okay this is both sequential scan a the outer

**1:09:03** · BV enter using sort merge instead of nested loops here's my other single relation plan for a index scan of a as the outer sequential scan of B as the inner using next nested loops and same thing using certain merge this so I in this particular example I tried to make some things simpler by throwing out hash join which is generally the best joined method so I estimate the cost estimates

**1:09:32** · like the manufacturer the predicate psy has to make the cost and I'm going to get rid of everything but the plan on the right so that's starting with a now I have to do the same thing starting with B be conjoined it's a beach can drain C be conjoined with D here's the only single relation plan for B so it's I take and if I could have joined B with

**1:09:59** · a I can do it with nested loops I can do a certain age I can do it nested loops sort edge either of the two a plans be joined D this this particular join is going to use this plan for D and there's Nestle loops and sort merge and nested loops insert mortgage for be joined the other alternative which is with C I cost them I burn them and I throw out all the plans to get pruned now I have to do the

**1:10:33** · same thing with C C controlling with B that's the only alternative I can do sort merge nested loops I cost them I prune those two loops really dad and family I can start with D I can only join D with B but I can use two different algorithms as shown here and cost them and prune them so that's how the optimizer work it starts with a single relation what's the best way of getting access to each single relation what's the best taking after I prune those and reduce the subset plans what's

**1:11:04** · the best way of joining those plans with another table and I'm going to keep expanding further prune the to relation plans because these things are equivalent doesn't matter insert merge join which is the outer and inner so if you look at these they're all the same and then I have two plans and start with two well who can I join a and B with well I can join a and B if you look up here I can join a and B with C or I can join a and

**1:11:33** · B once I'm join a and B I can join that trying to a and B here I can join that with D and I can do it you know with set each one with sort merges is in this example down here or I can join eight and being with C with one with certain urge one with nested loops or all sort merge with D so if you look at this I keep going I keep expanding one relation at a time and and you know I can start

**1:12:03** · with B and this goes on and on and you know I I keep expanding the the left deep plan by adding an additional operator corresponding to an additional join and then for all the different join methods I produce a physical plan and I cost it and I prune and this just continues at cetera yes Darryl Darryl says Lord helped the optimizer yes you

**1:12:30** · know the optimizer is doing this very very quickly and you know it's interesting you know as memories have gotten bigger it's possible to keep more plans around but you're absolutely right there are it's a it's it's you know the ideal thing for a computer to do because it's pretty easy to write code that expands these spaces and you know go from one relation to relations to three relations to formulations again the hard

**1:12:57** · part is costing mark asked a question to he says when you said consider the optimizer only considers left deep query plans is this as opposed to bushy ones he says is this also true for most relational database vendors or just sequel server I think it's true for most simply you know it's it's it's there actually cases where there's another plan space called right deep which sometimes has its advantage when things are highly pipelined I think it's

**1:13:31** · true in general and it may not even be true for sequel anymore but it's there are so many plans just with left deep the space just explodes with bushy so I think you know again you know I'm just not this is something I'm not up to date on of what everybody has but my sense is that people just use lefty so plans

**1:13:57** · frequently can be bad statistics can be missing her on a date this is why you should always keep your statistics up-to-date cardinalities estimates assume uniformly distributed values even within that histogram if you think about those equal height histograms you know

**1:14:14** · they have they have ranges of actually values associated with them there can be skew with inside the bucket and you can still get bad estimates and let alone if they're correlated such as you know if makers Honda it's likely to be in a quart and finally custom message do not

**1:14:34** · depend on the machine in which the query will be run and when you upgrade the hardware you have prayed the software regressions can happen so here's some ideas for opportunities to improve

**1:14:49** · develop tools that give us better understand what goes wrong improve the stability and use feedback so there's it's beginning this talk I showed this picture this this actually picture came from a professor at IIT Bangalore Bangalore Jan Teresa had this project

**1:15:10** · called Picasso and you can Google or Bing Picasso her Itza then find the project's website that's the tool last time I looked is available for these particular database systems and it's a simple but powerful idea so it says it takes a query and here's a real simple query join of two tables a and B with predicate Sun a and predicate on D so he

**1:15:35** · dot C less than Sun Khan less or equal to some constant and B and so this what this tool does is it takes a query and allows you to say I want to vary this particular constant value across this range okay so I can vary and and and then it will feed the query to the query optimizer and get back a plan using this show plan or explain that plan mechanism and then it will repeat

**1:16:05** · change the de constant slightly change constant one slightly change constant one some more change constant too and I'll explore the entire space this entire range of e dot C and less than equal constant and BD less than a constant and as I said it goes the query optimizer against the plan doesn't actually run it and for each combination and then it plots the results and here's a TP CH query so here's the the plot

**1:16:38** · that's in Jos paper so it's sequel server 2008 r2 so it's quite old on the x-axis of this plot we have the supplier account fell comp balance which ranges from 0 to 100 300 different data points on the y-axis it varies line item from 0

**1:17:02** · to 100 three different 300 different data points there are a total of 90,000 queries there are four distinct plans and every plan is given a distinct color by this software tool that they built now somehow this seems a little bit

**1:17:23** · overkill and if you zoom into this region at the bottom left-hand corner it's insane you know fights very small you know a change in color means a change in plan so look down here you know here we have in this face in here even though they're only my new changes in account balance they're a whole bunch

**1:17:44** · of different plans in this space likewise here plan one plan to plan three plan for plant six you look over here on the left and the colors are squeezed way in they must have studied the four color problem to figure out how to plot this now it's the key takeaway is the optimizer should not be so sensitive to the constants and it would have been interesting and I don't think they ever did it to figure out how many of those well I shouldn't say they did it to some extent intuitively this seems really bad

**1:18:18** · so let's go back to this joy now rhythm performance so remember nested loops and index nested loops are much faster at the left end of selectivity factors certain urge is much more stable across the whole range of selectivity practical predicates so the idea is don't use

**1:18:39** · algorithms that are very sensitive to selectivities fewer plans means more robust plans so this is another graph from their plot so they took this plans face and they reduced it from two hundred and four to thirty plans okay and picking by picking plans that were slightly more robust so ten percent max

**1:19:07** · difference in terms of performance and two percent average and they found that you know overall some plans ran slower but it most it was only two percent and the results were much less sensitive you see far fewer colors even down in this range and you know it's a much each plan

**1:19:27** · covers a much broader space so again if the optimizer makes a mistake in this range in here it's gonna fix the same plan so you know really the selectivity is right here where my cursor is that's what the estimate is but the actual is over here it's going to be okay so errors that occur in this estimate of you know how many predicates how many rows gets si this predicate you know from you know like ten to forty four

**1:19:56** · here in this range this they're all gonna produce the same plan so errors are not as significant the second thing and this is one thing I really regret from leaving Microsoft when I did because this is something that was on my to-do stack you know and

**1:20:14** · it's like oh it bugs me I tried to actually get it done at Facebook I haven't had luck at Facebook so the idea is really simple take this query plan so here's my physical plan and insert some little simple operators and all these operators do is they take as input what the

**1:20:32** · optimizer thought the statistics look like how many rows are supposed to come out of here and what's the distribution of that repeat value so that's what these little histograms are to do so the query optimizer annotates the physical plan with these little tiny statistics collections and it also inserts an operator in here and what this operator does is it says holy mackerel this thing

**1:20:56** · you know the optimizer thought this selection is gonna produce 10 rows and it's producing thousands and thousands of rows or it produce thousands and thousands of rows they're a bunch of different things you can do with this so this is the they collect the actual statistics and compare actual versus predicted and here's where the cloud comes in so query optimization of the

**1:21:21** · cloud and this is this is something that I think is going to be a real game-changer for query optimization when sequel when Microsoft or gorkel or my sequel developers when someone takes the product and installs it the it becomes sort of you know a lost child the database vendor has no clue what that that database system is doing it doesn't know how big the tables are doesn't know about hardware it really has no insight

**1:21:52** · to how the product is used and how its performing more importantly is they optimize you're doing a good job of plans as the optimizer doing a bad job of points then it plans the world is totally changed in the cloud and and no vendors done this yet but this is going to be somebody's going to do this and it's going to be a huge winner so the vendor well if you think of see pleasure okay it knows about all

**1:22:21** · your tables okay it knows how many tables there are how many columns each table has one indices you've built how big each table is how many nulls there are it has you know all the statistics that if you've run update statistics it also knows exactly what hardware's being used yeah you're running on the midwest region of azure you know the database

**1:22:47** · vendor knows what SKU those processors are or how much memories there how many threads who are it knows every single query you run not even just you know on Prem you know you might be some stored procedure ad hoc queries third procedures every single query run is

**1:23:07** · understood by the vendor okay I know it Microsoft we were being very careful never to look at a textual the the the constants and the predicates but the shape of the query plans was fair game and more importantly the for every

**1:23:25** · single query run the vendor knows the optimize plan it knows the original plan knows the optimized plan it knows the optimized plans estimated cost the actual running cost and the actual selectivity of each operator now this is something it's so so let's go back to that example with those check operators I know I know the sequel I know the

**1:23:49** · logical plan I know the physical plan the optimizer picked back they might might have the optimizer not picked just the top physical plan but maybe it'll pick the top ten physical plans and first time through it runs the physical that that query if it seems the core you get them I read in a slightly different physical plan they're also really neat things you can do in the cloud or it might use another set of machines to run

**1:24:15** · it so the idea is to use this information to build an optimizer that works and some people are not talking about doing this using machine learning I think that's a little bit overkill but it's an idea that some academics are pursuing so here I have a picture of my cloud of my database system I insert the check operators the executor starts running and the check operator produces at run

**1:24:43** · time the observed stats how selective was this predicate how many rows came through you know so whatever statistics the optimizer used at optimization time the check operator will whatever those key statistics were the check operator will collect those at runtime and feed them back into the optimizer statistics so this is observe stats though we can also do cost okay oh the authorizer thought

**1:25:13** · this operator or this join or the selection in this case oughta cost X but in fact it costs 10x or 100x now maybe that's a bug so it might be able to use to find bugs but maybe it's just on this particular Hardware this operator is expensive or for table B is not is

**1:25:34** · somehow strange and the predicates are very expensive maybe they're user-defined functions and so we can use the observed cost because the check hopper to collect the observed cost and feed those back into the optimizer now

**1:25:50** · the next time the query gets executed we'll have updated the statistics with those observe deaths and observed cost and we'll do a better job of executing and this feedback loop can go on you know queries get run thousands of times the statistics keep getting better the observed the estimated cost keep getting better and the query the plan the query optimizer will pick better plans so I think I think this is like as I said this was the thing that I started to work on before I left Microsoft had moved to Boston it breaks my heart it

**1:26:20** · hasn't gotten done yet and somebody should do it so okay now I'm at the end and I talked far too long so here the key points this is Cory appetizers really are hard and you know I can explain you know the basic algorithms used to do you know selections and joins and aggregates and group buys and sorting and even replication those are pretty

**1:26:54** · straightforward to explain and yes you have to the programming can be hard but it's it's very hard to get query optimization right because of all these errors that can creep into the process three key phases we take a piece of sequel we convert it to a logical plan we use these these rules like cognitive

**1:27:23** · 'ti and distributivity to enumerate the logical plan to get a large number of logical plans we take each logical plan and for each operator in the logical pant plan we consider each of the alternative algorithms to implement that operator selects yes sequential scan index scan nested loops join sort merge join and for each of those physical

**1:27:51** · plans we have to estimate the selectivities of the predicates whether they be selection predicates or join predicate soar how many groups the a group it's going to produce and then we have to cost so those are the three key phases and query optimizers teams and I saw this all the time at Microsoft they always were afraid of what it was going to do and again so it's in the cloud if

**1:28:18** · they make a change to the query optimizer they can quickly discover oh no especially if their check operators you know the history of this particular query used to take five seconds or ten seconds and now it's taking ten minutes there's a problem with the optimizer let's roll back that latest change so I

**1:28:39** · I'm really I really do really strongly believe that the move to the cloud is going to really really change the quality of plans that database vendors can do okay that's it let's we have time for two more questions Brent and people still here the yes they are and you know it's funny we had several people say after you'd say the people were left several people messaged in and said I'm getting ready to leave shortly but only because I have a meeting tell them yeah you know

**1:29:10** · professors always run over right I hope you don't mind but I took a few webcam selfies of you and me what does the cat scream shot looks like you and me and

**1:29:30** · it's not doctor please it's just David so his ice made this joke in the past at pass and the daughter is a doctor and she resents it was like it was a real doctor will let you near a knife okay

**1:29:47** · other people have questions yeah alvaro s an interesting question he says does Microsoft take research that was done by other companies like look at Oracle's white papers or IBM's and then use them to improve other their sequel server everybody steals from everybody else you

**1:30:07** · know what's interesting is the thing I find really just you know it's really it's interesting being back in academia and I'm really sort of not really bit totally back in academia but I do hang around the grad students that do database work at MIT it's really what's sad is I think industry is ahead of

**1:30:30** · academia when it comes to database research at this point I think you know and I think it's an artifact of you know products like sequel server have you know gone through many iterations you

**1:30:46** · know there are a lot of smart developers at Microsoft working on the product and I think you know lots of times the academics are in it aren't as aware of the products and what they're capable of of doing as are the competitors the competitors certainly look at everybody's good idea and steals everybody good idea and but academics

**1:31:11** · it's interesting now they're I think they're they're behind and they're there are sessions say they're totally but it's it's been interesting after eight years that Microsoft to go back to academia and see what the grad students working on and it's sometimes not

**1:31:27** · encouraging is really good it's like oh you know sequel server does it you know replication you know just good enough or every academic seems to be building another version of Hecate on and you know one of the things I did manage when it for a while at hackathon was what's it called now what's the protocol in memory oil T played in memory OLTP you know I think the adoption of that feature was not as fast as people

**1:31:58** · expected because the language surface but the grant and I think it's also the case hardware's gotten so fast most customers are satisfied with plain old standard tables and flash drives and the grad students are all off building faster and faster main memory OLTP databases I just call my head shake my head and say now it's really a bad thing to work on them they don't like to hear that their advisors don't like to hear that anyway oh yes the answers the answer long-winded answer that question is yes you know their conferences their

**1:32:30** · academic conferences their number of academic conferences where key people from industry the developers from Microsoft and IBM Oracle and my Facebook and Google they all mingle and they all listen to each other's industrial papers so conferences like Sigma and vldb generally have sessions by the vendors themselves you know not too similar to

**1:32:55** · what goes on at pass talking about features and that's a chance for the vendors to hear what everyone's doing and pick the best ideas speaking of which JHS he says if you were going to go deeper into but people who are data professionals today either database developers or database administrators and they wanted to go learn more where would you recommend that they go next uh so that that's a you know I think you

**1:33:23** · know there couple there are a couple answers that probably the place I'd recommend starting is there's you know if if you haven't taken a graduate or undergraduate level database class there's some really good textbooks there's a textbook written by Microsoft

**1:33:44** · somebody who's now Microsoft for a GU Rama Krishnan who works for part of the sequel group so if if you look at any of the major database textbooks though it's one of them's written by Rama Christian and Johannes gurkey who actually think now on skype there's another one by Jennifer Widom and the Stanford professors so I think one place an easy

**1:34:10** · place to go is to buy one of those two textbooks maybe there's a third one but I think the best ones ragussis book is sometimes called the cow book because it has pictures from Wisconsin in front of it but I think either of the textbooks of Widom and Hector Garcia love Melina or ragu and johannes and there may be a

**1:34:32** · third author I think those are great places to start to learn more of the fundamentals and you don't need to buy the latest version you know save money find a used copy because they don't change all that much and sometimes I think the earlier editions were actually better and the other place to figure out what's going on in the literature and what was the state of the art is to to

**1:35:01** · look at the sigmod and D Alene proceedings and um maybe Brent and I can follow up and and I could put together I at the end of that slide deck or maybe in another way I could post some actual book names and Amazon links and links to the major

**1:35:26** · technical conferences in the field but I'd start by reading the textbooks because I think that's you know a good place to capture a broad bunch a lot of information and sometimes the authors don't know what they're talking about so don't take it with a grain of salt Oh same thing with bloggers absolutely so there are a couple questions there's one from Kenny about calculating statistics and if linear regressions are used and if not could they be oh I don't know the answer

**1:36:00** · that question and the answer is the answer is yes so I don't know I don't think I think I think you know within the histogram ranges pretty much people assume uniformity and that can be a source of errors but again this is an

**1:36:23** · area where I am just not an expert in history and histograms and what has been done there's been a lot of academic work on histograms and estimating selectivities and I'm just not aware of what's made it into the products and

**1:36:43** · there was another one from Aaron and it was uh what can we do to help Microsoft's query optimizer team improve the product but moving to the cloud helped them at all yes that will help be gentle when they when there's a regression that one have the the president of your company call you know Sachi up and scream okay that's that's that's that's really the problem I mean I you know you know it's there's a lot

**1:37:15** · of attrition and the query optimizer team at at Microsoft a lot of people went to Google but a lot of it was because they'd become so fragile that every the developers were just afraid to change and to cause a problem so I'm really serious moving to cloud will help you know and again I just don't know what Microsoft is doing currently in this space but being more gentle when there's a regression and sharing

**1:37:48** · statistical statistics when that's possible that's that's good - there's an interesting question in the slack channel brian says ballpark how many people at Microsoft maintain the query optimizer oh it it lat again when I left two years ago it was a handful half dozen oh not very many

**1:38:14** · you know it's yeah it's again there's not much development going on it's mostly a pretty stable feature at this point but yeah small number wow smart

**1:38:31** · people well thank you so much sir for taking the time out of your day to speak to anybody anyway appreciate it and I want to thank everyone who a listen and be made a donation you know I think when Brent asked me to do this it was an instantaneous response yes and I think

**1:38:48** · you know this kind of this kind of donation can really make a difference so thank you absolutely and folks if you want to go either get the slides or make a donation in the Robert Davis Memorial Fund you can go to Brent Ozark comm slash go slash to win we will send you a reminder there - after the webcast webcast will be available on youtube within about a day and the slides are available now so thanks a lot everybody and I'll put together this list of references oh cool

**1:39:18** · well thank you sir have a great day everybody okay thank you everyone for attending