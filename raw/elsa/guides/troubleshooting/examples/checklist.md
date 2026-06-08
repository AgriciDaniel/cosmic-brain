# Troubleshooting Checklist

A compact, copyable checklist for diagnosing common Elsa Workflows issues. Use this as a quick reference during incident response.

---

## Workflows Don't Start

- [ ] Workflow definition is published (`isPublished: true`)
- [ ] Trigger module is configured (`UseHttp()`, `UseScheduling()`, etc.)
- [ ] Elsa services registered before `app.Run()`
- [ ] Database connection is valid and accessible
- [ ] No exceptions in startup logs
- [ ] API endpoint is accessible: `curl http://localhost:5000/elsa/api/workflow-definitions`

---

## Workflows Don't Resume (Bookmarks)

- [ ] Bookmark exists in database for the workflow instance
- [ ] Resume payload matches bookmark stimulus (exact hash match)
- [ ] Distributed lock provider is configured (`UseDistributedRuntime()`)
- [ ] Lock provider is accessible (Redis/PostgreSQL)
- [ ] Lock acquisition not timing out (check logs for `Lock acquisition failed`)
- [ ] Bookmark hasn't been consumed already (check `AutoBurn` behavior)

---

## Duplicate Resumes (Concurrency)

- [ ] `UseDistributedRuntime()` is enabled
- [ ] Distributed lock provider is configured and accessible
- [ ] All nodes connect to the same lock provider
- [ ] Quartz clustering is enabled (if using scheduled tasks)
- [ ] All nodes share the same Quartz database
- [ ] Activities are designed to be idempotent (safe for replay)

---

## Timers Fire Multiple Times or Not at All

### Multiple Fires:
- [ ] Quartz clustering is enabled (`quartz.jobStore.clustered = true`)
- [ ] All nodes share the same Quartz database
- [ ] Only one scheduler node or proper clustering configured

### No Fires:
- [ ] Quartz scheduler is running (check logs for `Quartz scheduler started`)
- [ ] Scheduled bookmark exists in `qrtz_triggers` table
- [ ] System clocks are synchronized across nodes (NTP)
- [ ] Time zone is consistent (`TZ=UTC` recommended)
- [ ] Misfire threshold is appropriate for workload

---

## Stuck/Running Workflows

- [ ] Check for long-running workflows: `SELECT * FROM elsa.workflow_instances WHERE status = 'Running' AND updated_at < NOW() - INTERVAL '1 hour'`
- [ ] Check for incidents: `SELECT * FROM elsa.workflow_incidents WHERE workflow_instance_id = '<id>'`
- [ ] Check for orphaned locks (should auto-expire with TTL)
- [ ] Background job queue is processing (check job provider logs)
- [ ] No exceptions in logs around the time workflow became stuck
- [ ] Consider canceling: `POST /elsa/api/workflow-instances/<id>/cancel`

---

## High Database Load

- [ ] Connection pool size is adequate (50-200 for production)
- [ ] Indexes exist on frequently queried columns (`bookmarks.hash`, `workflow_instances.status`)
- [ ] Old workflow instances are being cleaned up (retention policy)
- [ ] No long-running transactions blocking others
- [ ] Connection string includes pooling: `MaxPoolSize=100`
- [ ] Consider read replicas for query-heavy workloads

---

## Quick Diagnostic Commands

```bash
# Check Elsa API health
curl http://localhost:5000/health/ready

# List recent workflow instances
curl http://localhost:5000/elsa/api/workflow-instances?pageSize=10

# Check Quartz scheduler state (PostgreSQL)
psql -c "SELECT * FROM qrtz_scheduler_state;"

# Check for stuck locks in Redis
redis-cli --scan --pattern "workflow:*" | wc -l

# View recent Elsa logs (adjust path)
tail -100 logs/elsa-*.json | jq '.["@mt"], .WorkflowInstanceId'
```

---

## Information to Gather for Escalation

- [ ] Elsa package version: `dotnet list package | grep Elsa`
- [ ] .NET version: `dotnet --version`
- [ ] Database type and version
- [ ] Infrastructure: single node or clustered?
- [ ] Lock provider: Redis, PostgreSQL, or other?
- [ ] Relevant logs (with Debug level enabled)
- [ ] Workflow definition JSON (if applicable)
- [ ] Steps to reproduce

---

## Related Documentation

- [Troubleshooting Guide](../README.md) - Full troubleshooting reference
- [Logging Configuration](logging-config.md) - Enable detailed logging
- [Clustering Guide](../../clustering/README.md) - Multi-node setup
