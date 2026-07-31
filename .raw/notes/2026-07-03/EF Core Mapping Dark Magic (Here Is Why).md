---
title: "EF Core Mapping: Dark Magic (Here Is Why)"
source: "https://www.youtube.com/watch?v=_ueDwoD-mMg"
author:
  - "[[Zoran on C#]]"
published: 2026-06-16
created: 2026-07-03
description: "Map value objects, strongly-typed IDs, and nested complex types into a single SQL table with EF Core 10; then watch your in-memory domain queries translate flawlessly into SQL.Support me on Patreon"
tags:
  - "clippings"
---
![](https://www.youtube.com/watch?v=_ueDwoD-mMg)

Map value objects, strongly-typed IDs, and nested complex types into a single SQL table with EF Core 10; then watch your in-memory domain queries translate flawlessly into SQL.  
  
Support me on Patreon ► https://www.patreon.com/zoranhorvat  
  
You can also learn much more from these wonderful resources:  
𝘿𝙤𝙢𝙖𝙞𝙣-𝘿𝙧𝙞𝙫𝙚𝙣 𝘿𝙚𝙨𝙞𝙜𝙣 by Eric Evans ► https://codinghelmet.com/go/book-domain-driven-design#ad  
𝘿𝙤𝙢𝙖𝙞𝙣 𝙈𝙤𝙙𝙚𝙡𝙞𝙣𝙜 𝙈𝙖𝙙𝙚 𝙁𝙪𝙣𝙘𝙩𝙞𝙤𝙣𝙖𝙡 by Scott Wlaschin ► https://codinghelmet.com/go/wlaschin-functional-modeling-made-functional#ad  
𝘿𝙖𝙩𝙖𝙗𝙖𝙨𝙚 𝙎𝙮𝙨𝙩𝙚𝙢 𝘾𝙤𝙣𝙘𝙚𝙥𝙩𝙨 by Abraham Silberschatz et al. ► https://codinghelmet.com/go/database-system-concepts#ad  
𝘽𝙚𝙜𝙞𝙣𝙣𝙞𝙣𝙜 𝙊𝙗𝙟𝙚𝙘𝙩-𝙊𝙧𝙞𝙚𝙣𝙩𝙚𝙙 𝙋𝙧𝙤𝙜𝙧𝙖𝙢𝙢𝙞𝙣𝙜 𝙬𝙞𝙩𝙝 𝘾# at Udemy ► https://codinghelmet.com/go/beginning-oop-with-csharp  
𝙃𝙖𝙣𝙙𝙨 𝙤𝙣 𝘾# .𝙉𝙀𝙏: 𝙀𝙣𝙩𝙞𝙩𝙮 𝙁𝙧𝙖𝙢𝙚𝙬𝙤𝙧𝙠 𝘾𝙤𝙧𝙚 at Udemy ► https://codinghelmet.com/go/hands-on-csharp-ef-core  
𝙍𝙚𝙡𝙖𝙩𝙞𝙤𝙣𝙖𝙡 𝘿𝙖𝙩𝙖𝙗𝙖𝙨𝙚 𝘿𝙚𝙨𝙞𝙜𝙣 from the University of Colorado Boulder at Coursera ► https://codinghelmet.com/go/relational-database-design  
  
Join the Discord server with topics on C# ► https://codinghelmet.com/go/discord  
Subscribe ► https://www.youtube.com/channel/UCxsWfh8LCcn55mFB6zGBT1g?sub\_confirmation=1  
  
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  
👨 About Me 👨  
Hi, I’m Zoran, I have more than 25 years of experience as a software developer, architect, team lead, and more. I have been programming in C# since its inception in the early 2000s. Since 2017 I have started publishing professional video courses at Pluralsight and Udemy and by this point, there are over 100 hours of the highest-quality videos you can watch on those platforms. On my YouTube channel, you can find shorter video forms focused on clarifying practical issues in coding, design, and architecture of .NET applications.❤️  
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  
⚡️COPYRIGHT NOTICE:  
The Copyright Laws of the United States recognize a “fair use” of copyrighted content. Section 107 of the U.S. Copyright Act states: “Notwithstanding the provisions of sections 106 and 106A, the fair use of a copyrighted work, including such use by reproduction in copies or phono records or by any other means specified by that section, for purposes such as criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship, or research, is not an infringement of copyright." This video and our youtube channel, in general, may contain certain copyrighted works that were not specifically authorized to be used by the copyright holder(s), but which we believe in good faith are protected by federal law and the Fair use doctrine for one or more of the reasons noted above.

## Transcript

**0:00** · In this video, I will show you the real power of EF Core mappings.

**0:05** · But, not just how it maps the domain models into data models.

**0:11** · That is important for inserting and updating. We will go further from there and look how it maps queries. That is where the real power and the real magic hides. You will be able to query the domain model in C# in-memory, and EF Core will translate all those terms you use into actual SQL terms for the database.

**0:37** · And sometimes it will be so clever and so, how do I call it, strange, that you will say: There must be some dark magic at work here; this is not possible to do for a tool.

**0:58** · But no, EF Core 10 will do everything it can to let you work comfortably with the domain model in-memory, and it will perfectly translate your intentions into the SQL code. That's what I will show you in this video.

**1:22** · So, let's begin with code. We're going to model a money transfer and persist it to the database using EF Core 10. This Transfer class is where we will start building that model. The Transfer will be composed of several nested objects. We will build this model from the bottom up, so the model complexity accumulates in a natural way. The Currency record is a good starting point.

**1:47** · It holds a currency code and the number of decimal places that currency uses.

**1:53** · We are free to add a validation rule directly inside the Currency record.

**1:58** · That will not affect our ability to persist the object using EF Core.

**2:03** · This keeps the invalid state out of the model entirely.

**2:07** · We can also add static instances for well-known currencies and other instance-level or static methods we might need. None of this interferes with how EF Core maps the type. The point is that the record remains a fully capable domain object, not just a data container. Yet, with both properties mapped to individual database fields, and with constructor parameter names matching column names in the database, this entire type is directly usable in EF Core with no additional code in it.

**2:41** · The situation will change a bit when we get up the hierarchy of objects and try to model Money.

**2:49** · It holds an amount and a currency. It is straightforward for the moment, but EF Core will have some issues with it. Its constructor parameters do not match table columns, but rather match our object model. You can still enrich this record with instance members and validation or sanitization logic. This kind of data cleanup belongs in the domain model, and it fits naturally here. But, none of this helps EF Core restore this object from the database. What will really make a difference for EF Core is adding a private parameterless constructor.

**3:24** · EF Core needs to instantiate an object before it can populate its properties. And so, it creates an empty shell first.

**3:35** · Then fills in the values through the property setters.

**3:39** · The private constructor fills the dummy default values, just to silence the compiler.

**3:45** · But, you have to be careful here, especially in record types that have a primary constructor.

**3:50** · All properties must be settable to defaults, which are null in case of reference types.

**3:56** · Make sure that the object itself accepts all defaults, or otherwise EF Core won't be able to recreate it from the database. In a domain-centric design, we assume the domain model validates the object, and hence all the data in the database have already passed validation.

**4:15** · Hence, whatever EF Core populates back using reflection will be valid.

**4:20** · Never lose that detail from sight when working with EF Core.

**4:25** · Bottom line is that this type is now fully persistable using EF Core 10, along with a complex Currency object it contains. That brings us to the most complicated type in our domain model, the Transfer class. We start by giving Transfer its most essential property, the amount being transferred, which is of type Money.

**4:46** · That is the complex type, so start thinking of how EF Core will cope with it.

**4:51** · But, there is more. In the best tradition of domain-driven design, the identifier of a Transfer is not a plain integer or GUID.

**5:00** · It is a strongly typed value object which wraps the actual key value.

**5:05** · You will see this type in a minute. It will also require a mapping in EF Core.

**5:10** · And, here is another property, the timestamp of when the transfer was executed.

**5:16** · Notice that this is not a plain DateTime. Every meaningful piece of data in this model gets its own type. That is the core principle of domain-centric designs. Let's pay a visit to these types, then.

**5:30** · The Timestamp is a record wrapping a single DateTime value.

**5:34** · The only thing it enforces is that the value must be in UTC.

**5:39** · That is the entire purpose of this type: to make it impossible to accidentally store a local time.

**5:46** · We will use this type later when constructing transfer instances and querying them at different times. A convenient method will add a TimeSpan to a timestamp, returning a new, safe UTC timestamp. That is why we design such small types in the domain. They help us keep the objects valid at all times.

**6:07** · Comparison operators will help us compare timestamps using the familiar syntax.

**6:14** · This will also be important later when we start writing queries to filter the transfers by time range. The important message here is that persisting a model with EF Core should not stop you from developing rich syntax around it.

**6:29** · Use all your knowledge of programming and domain modeling and leave EF Core do its part.

**6:35** · Those are two separate activities. We witness that in the transfer ID type, too.

**6:41** · It wraps a plain GUID, but adds two important guarantees.

**6:45** · First, it prevents accidental cross-assignment between different ID types in the domain.

**6:51** · Second, it ensures that the ID is never an empty GUID.

**6:55** · A convenient factory method generates a fresh, unique ID, helping us use this type.

**7:01** · Back to the Transfer class, the root of our domain model.

**7:05** · Our next task is to configure this type, along with all the supporting smaller types, for persistence with EF Core 10. We start by adding a parameterized constructor, giving callers a clean way to initialize a transfer in one step.

**7:22** · But, that impedes reconstruction of objects from EF Core, once again, because parameters are complex types, rather than database fields. The solution is, again, a private parameterless constructor that chains to the primary one, passing dummy defaults for each parameter.

**7:40** · EF Core will use this entry point in combination with property setters to reconstruct objects from the database, while keeping it private ensures it stays invisible to the rest of the application.

**7:53** · We can now move on to configuring EF Core. All the domain types I planned to persist in the database are complete. The database context is already in place.

**8:04** · It exposes a set of transfers, and the model creation hook is ready for configuration.

**8:10** · This is where we will wire up the complex properties and value conversions in the steps that follow. And, you will see, despite the immense power that EF Core will exhibit when we start using it, the mappings I will put here will be simple and straightforward.

**8:27** · I will show you all that by the end, but before that, let me steal a moment of your time to remind you that this video and all other videos on this channel are free, but only thanks to the patrons, the people who are sponsoring this channel and making it possible to maintain it as free content. So, if you like what you have learned in this video and other videos on this channel, then please consider joining the growing community of patrons on my Patreon page.

**8:58** · By becoming a sponsor, you will get access to the source code of this video and all other videos and also to some discounts I occasionally post on Patreon. Thank you very much.

**9:13** · Now, let's get back to code, because we need to complete the configuration.

**9:22** · We start by registering the Transfer entity with the model builder.

**9:26** · This is the only entity in our model, so all configuration we need will go right here inside this block. We start with the easy part, the shadow property for the primary key. It maps to a column named Id, carefully avoiding the name collision with the Id property in the domain model, which represents a public GUID, which we may share with other systems. But, mapping of the public Id property will complicate the matters. This is the GUID wrapped in a record type.

**9:57** · We want that GUID unpacked from the record and stored as a regular column in the same table.

**10:05** · EF Core's value converter is exactly the right tool here.

**10:09** · It handles the one-to-one mapping between a wrapper type and a single database column.

**10:15** · Define types involved in the conversion. Implement a constructor that passes two lambdas to the base constructor, one unwrapping the record to get the raw GUID out, and the other one converting the raw value back. You can convert almost anything you like this way.

**10:34** · Look at the Timestamp record conversion. The time kind is lost when saving to the database.

**10:40** · To make sure the DateTime value is explicitly marked as UTC, we set its kind explicitly before passing it to the Timestamp constructor. Back in the database context, this is where we wire everything together. Attach the converter, specify the column name and type, then we add an index. It goes almost the same with a timestamp.

**11:04** · We attach the converter and specify the column type.

**11:07** · It is all so straightforward. But, things will change radically when we get to the Amount property. There is no one-on-one mapping to a database column. EF Core treats this as a complex property, and we configure it with a dedicated call. Inside, we will describe how each part of Amount maps to the database. We map the Amount scalar property to a column with a specified decimal precision. That is important for keeping financial amounts.

**11:39** · But, what about the currency? It is another two values inside one small type.

**11:45** · Then comes the surprise. Currency is itself a complex property.

**11:49** · So, we nest another ComplexProperty call inside the Amount configuration.

**11:55** · Inside the Currency complex property, we map its two scalar fields as usual.

**12:00** · Both columns sit flat in the same table, right alongside Amount and everything else.

**12:06** · That is the most astonishing aspect of mapping the complex types in EF Core.

**12:11** · That was all we had to do to configure five distinct classes in C# for storage within a single database table, using EF Core's complex types and value conversions.

**12:23** · We can finally see the power of all that configuration by actually using it.

**12:28** · Given the DbContext, this method will insert the transfer records into the database.

**12:34** · We can make things more interesting by generating various transfers in different currencies.

**12:40** · Then simply wrap each amount into a Transfer with a fresh GUID and a timestamp.

**12:46** · Add it to the DbSet, and we are ready to commit all objects into the database.

**12:51** · Calling SaveChanges is all that remains to persist everything in one shot.

**12:56** · Dealing with persistence is only two lines of code here.

**13:00** · The rest is making sure to create valid objects. That is the only remaining worry we have when we use EF Core. Let's move on to demonstrating querying, and with that we will complete this demo. You can query by the entire complex property.

**13:16** · EF Core knows how to translate that into SQL. So, this reads just like plain object comparison in C#. You can also query by any of the nested properties, such as checking whether the currency code starts with a given prefix.

**13:33** · EF Core will reach all the way down into a nested object to produce the right SQL.

**13:40** · Another example is applying an arithmetic comparison operator directly to a property of a nested object. EF Core will handle the translation without any extra effort on our part. As the last example, get ready for real dark magic. We want to filter transfers by the timestamp.

**14:01** · However, the comparison operator is our custom operator on the Timestamp record.

**14:07** · That does not translate to SQL. Anyway, EF Core will figure out it is the greater-or-equal operator, and translate that whole thing into an equivalent SQL comparison on numeric fields in the database. No custom logic, no helper methods, just a plain comparison against a nested complex object. Go figure.

**14:30** · Needless to say, all operations have completed with no trouble.

**14:34** · After inserting four US dollar transfers and two Japanese yen transfers, the rest was querying.

**14:41** · And so, querying by the dollar currency was translated into the equality comparison on both database fields. The result is truly only the transfers made in dollars. The query by the currency's initial letter was translated into the LIKE SQL operator, just as expected.

**15:00** · The subsequent comparison of money amounts was equally good.

**15:04** · But, the last example is, again, pure magic. We had custom operator overloads in C# to compare the timestamps, plus the value conversion into a DateTime database field.

**15:18** · EF Core has correctly translated that expression straight into the time comparison in the database.

**15:26** · How beautiful. And, this is the code that made all that magic possible. Mere dozens of lines of code setting up value conversions and complex properties. The rest is just magic orchestrated by EF Core.