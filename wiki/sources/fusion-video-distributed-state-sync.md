---
type: source
title: "Video: ActualLab.Fusion — the distributed state sync monster"
source_file: ".raw/fusion_docs/video/actuallab-fusion-distributed-state-sync-monster.md"
source_type: video
fetched: 2026-05-25
tags:
  - fusion
  - video
  - transcript
  - distributed-systems
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Overview]]"
  - "[[Fusion Performance & Benchmarks]]"
---

# Video: ActualLab.Fusion — the distributed state sync monster

2-hour technical talk covering Fusion's architecture, performance, and real-world usage.

**YouTube:** [Watch on YouTube](https://www.youtube.com/watch?v=eMO7AmI6ui4)

## Table of Contents

| Timestamp | Topic |
|-----------|-------|
| [0:00](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=0s) | Introduction and Background |
| [0:39](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=39s) | Redis Baseline (120K calls/s) |
| [1:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=68s) | Fusion Speed (~100x Redis) |
| [1:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=107s) | What is Fusion |
| [8:08](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=488s) | Voxt Demo |
| [9:17](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=557s) | ComputedStateComponent |
| [11:30](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=690s) | Why Real-time is Hard |
| [15:47](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=947s) | Fusion Features |
| [18:48](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=1128s) | Todo App Demo |
| [43:59](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=2639s) | Code Explanation |
| [1:07:31](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=4051s) | How Fusion Works |
| [1:21:29](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=7289s) | Performance and Benchmarks |
| [1:49:23](https://www.youtube.com/watch?v=eMO7AmI6ui4&t=8963s) | Conclusion |

## Key Takeaways

- Redis baseline: ~120K calls/s; Fusion: >200M calls/s (~100x faster)
- Fusion treats caching and real-time as the same problem — automatic dependency tracking solves both
- Voxt.ai is the production proof: real-time voice chat with live transcription, translation, AI summaries
- `ComputedStateComponent<T>` enables automatic UI updates in Blazor without manual wiring
- Dependency graph DAG extends across network boundaries — invalidation cascades server→client
- Full transcript available in source file
