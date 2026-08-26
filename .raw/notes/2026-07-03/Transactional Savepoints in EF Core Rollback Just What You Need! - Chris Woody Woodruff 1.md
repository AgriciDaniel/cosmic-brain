---
title: "Transactional Savepoints in EF Core: Rollback Just What You Need! - Chris Woody Woodruff"
source: "https://woodruff.dev/transactional-savepoints-in-ef-core-rollback-just-what-you-need/"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-11
created: 2026-07-03
description: "We’ve all been there—you’re halfway through a multi-step transaction, and boom! 💥 Something fails. You don’t want to roll back everything, just the part that went wrong. That’s where Transactional Savepoints come in! Savepoints let you partially roll back transactions, keeping the good stuff while undoing just the problematic parts. If you've ever wished for a \"Ctrl + Z\" in database operations, this is it."
tags:
  - "clippings"
---
![Transactional Savepoints in EF Core: Rollback Just What You Need!](https://woodruff.dev/wp-content/uploads/2025/02/Transactional-Savepoints-in-EF-Core-Rollback-Just-What-You-Need-150x150.webp)

We’ve all been there—you’re halfway through a **multi-step transaction**, and **boom!** Something fails. You don’t want to roll back **everything**, just the part that went wrong.

That’s where **Transactional Savepoints** come in!

Savepoints let you **partially roll back** transactions, keeping the good stuff while undoing just the problematic parts. If you’ve ever wished for a *“Ctrl + Z”* in database operations, this is it.

Let’s dive into what **savepoints** are, why they’re useful, and how to use them in **Entity Framework Core (EF Core)**!

---

## Why Use Transactional Savepoints?

By default, transactions in EF Core follow the **“all or nothing”** rule—either everything commits successfully, or the entire transaction gets rolled back. But sometimes, **you don’t want to lose everything** just because of a small issue.

**With savepoints, you can:**

- **Rollback specific parts** of a transaction instead of the whole thing.
- **Handle errors more gracefully** instead of restarting everything.
- **Improve performance** by avoiding full rollbacks and reprocessing.
- **Keep long-running transactions stable** by fixing issues in steps.

Imagine you’re processing **a batch of payments**:

- 9 payments succeed
- 1 fails
- **With savepoints, you can roll back just the failed one and keep the rest!**

---

## Step 1: Using Savepoints in EF Core Transactions

Let’s say we have a **banking app** where users can transfer money between accounts. If one transfer fails, we don’t want to cancel all the transactions—just the one that failed.

### 1\. Start a Transaction

using var transaction = await context.Database.BeginTransactionAsync();

try

{

await TransferMoney(1, 2, 500); // Transfer $500 from Account 1 to 2

await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeSecondTransfer");

await TransferMoney(3, 4, 1000); // Transfer $1000 from Account 3 to 4

await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeThirdTransfer");

await TransferMoney(5, 6, 2000); // Oops! This one might fail

await transaction.CommitAsync(); // If everything is good, commit!

}

catch (Exception ex)

{

Console.WriteLine($"Error: {ex.Message}");

await context.Database.ExecuteSqlRawAsync("ROLLBACK TO SAVEPOINT BeforeThirdTransfer"); // Roll back just the last one

}

using var transaction = await context.Database.BeginTransactionAsync(); try { await TransferMoney(1, 2, 500); // Transfer $500 from Account 1 to 2 await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeSecondTransfer"); await TransferMoney(3, 4, 1000); // Transfer $1000 from Account 3 to 4 await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeThirdTransfer"); await TransferMoney(5, 6, 2000); // Oops! This one might fail await transaction.CommitAsync(); // If everything is good, commit! } catch (Exception ex) { Console.WriteLine($"Error: {ex.Message}"); await context.Database.ExecuteSqlRawAsync("ROLLBACK TO SAVEPOINT BeforeThirdTransfer"); // Roll back just the last one }

```js
using var transaction = await context.Database.BeginTransactionAsync();

try
{
    await TransferMoney(1, 2, 500); // Transfer $500 from Account 1 to 2
    await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeSecondTransfer");

    await TransferMoney(3, 4, 1000); // Transfer $1000 from Account 3 to 4
    await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeThirdTransfer");

    await TransferMoney(5, 6, 2000); // Oops! This one might fail

    await transaction.CommitAsync(); // If everything is good, commit!
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    await context.Database.ExecuteSqlRawAsync("ROLLBACK TO SAVEPOINT BeforeThirdTransfer"); // Roll back just the last one
}
```

**What’s happening here?**

1. **Start a transaction**
2. **Make some transfers**
3. **Create savepoints** before risky operations **(like large transfers)**
4. **Rollback only the problematic step** instead of **losing everything**

---

## Step 2: Handling Savepoints in EF Core Using Transaction APIs

If you prefer **EF Core’s built-in transaction API**, you can do this:

using var transaction = await context.Database.BeginTransactionAsync();

try

{

await TransferMoney(1, 2, 500);

await transaction.CreateSavepointAsync("BeforeSecondTransfer");

await TransferMoney(3, 4, 1000);

await transaction.CreateSavepointAsync("BeforeThirdTransfer");

await TransferMoney(5, 6, 2000); // This might fail

await transaction.CommitAsync();

}

catch (Exception ex)

{

Console.WriteLine($"Error: {ex.Message}");

await transaction.RollbackToSavepointAsync("BeforeThirdTransfer"); // Undo only the last step

await transaction.CommitAsync(); // Keep the rest!

}

using var transaction = await context.Database.BeginTransactionAsync(); try { await TransferMoney(1, 2, 500); await transaction.CreateSavepointAsync("BeforeSecondTransfer"); await TransferMoney(3, 4, 1000); await transaction.CreateSavepointAsync("BeforeThirdTransfer"); await TransferMoney(5, 6, 2000); // This might fail await transaction.CommitAsync(); } catch (Exception ex) { Console.WriteLine($"Error: {ex.Message}"); await transaction.RollbackToSavepointAsync("BeforeThirdTransfer"); // Undo only the last step await transaction.CommitAsync(); // Keep the rest! }

```js
using var transaction = await context.Database.BeginTransactionAsync();

try
{
    await TransferMoney(1, 2, 500);
    await transaction.CreateSavepointAsync("BeforeSecondTransfer");

    await TransferMoney(3, 4, 1000);
    await transaction.CreateSavepointAsync("BeforeThirdTransfer");

    await TransferMoney(5, 6, 2000); // This might fail

    await transaction.CommitAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    await transaction.RollbackToSavepointAsync("BeforeThirdTransfer"); // Undo only the last step
    await transaction.CommitAsync(); // Keep the rest!
}
```

**Now, you can rollback part of a transaction** without discarding everything!

---

## When Should You Use Savepoints?

### 1\. Batch Processing (Payments, Orders, Inventory Updates)

If you’re processing **multiple orders/payments** in a single transaction, use savepoints to **rollback only failed ones** while keeping the rest.

### 2\. Long-Running Transactions

Large transactions risk **locking database resources for too long**. Savepoints help **recover faster** without restarting the entire process.

### 3\. Handling Conditional Logic in Transactions

If certain operations depend on previous ones, use **savepoints to undo bad steps** without breaking the rest.

### 4\. Preventing Partial Data Corruption

If one step fails, but the rest are fine, **rolling back everything might be unnecessary**. Savepoints let you **recover selectively**.

---

## Savepoints vs. Full Rollback: When to Use Each

| Scenario | Savepoints | Full Rollback |
| --- | --- | --- |
| A single step fails in a multi-step transaction | **Yes** | No |
| A critical issue occurs, and everything must be undone | No | **Yes** |
| Some operations should be committed while others should not | **Yes** | No |
| The database state must return to the exact point before the transaction started | No | **Yes** |

**Savepoints are great when you want a “soft rollback” instead of a complete undo.**

---

## Common Issues & How to Fix Them

**Not All Databases Support Savepoints**

- SQL Server, PostgreSQL, and MySQL support them.
- SQLite does **not** support savepoints in the same way.

**Savepoints Must Be Created Inside Transactions**

- Always **begin a transaction first** before using savepoints.

**Avoid Too Many Savepoints**

- Each savepoint increases transaction overhead.
- Use them only for **critical operations that might fail**.

---

## Wrap-Up: Smarter Rollbacks with Savepoints

Transactional Savepoints in EF Core **let you undo only what you need**, keeping successful operations intact while recovering from failures. Instead of **rolling back everything**, savepoints let you:

- **Fix only the failing parts** of a transaction.
- **Keep successful operations intact.**
- **Improve performance** by avoiding full rollbacks.

Next time you’re dealing with **multi-step transactions**, consider **using savepoints to make them more reliable!**

**Have you used savepoints in EF Core? Let’s chat in the comments!**

This site uses Akismet to reduce spam. [Learn how your comment data is processed.](https://akismet.com/privacy/)