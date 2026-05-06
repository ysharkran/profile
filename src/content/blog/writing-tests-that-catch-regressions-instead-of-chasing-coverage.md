---
title: "The Tests I Write Before Touching Payment, Workflow, or Contract Code"
description: "I care less about coverage percentages than whether the suite blocks the expensive failures: wrong money movement, broken retries, and silent contract drift."
pubDate: "2026-05-02"
updatedDate: "May 5, 2026"
heroImage: "/blog/writing-tests-that-catch-regressions-instead-of-chasing-coverage.jpg"
badge: "Code"
tags: ["testing", "quality", "engineering"]
---

I have seen too many “healthy” test suites let expensive failures through to care much about coverage on its own.

If I am touching payment logic, workflow state, retries, or contract-heavy APIs, I want the suite to stop the failures we would actually regret shipping, not merely prove that helper functions executed.

## I start from regression cost, not file structure

The question is not “what kind of tests do we usually write here?” The question is “what is the most expensive thing this code could do wrong?”

That list is usually some version of:

- duplicate money movement
- wrong workflow transitions
- silent data corruption
- contract drift across service boundaries
- retries or rollbacks behaving differently than the team assumes

Once I know the cost, the test strategy gets much easier.

## The first tests I add are boundary tests

For risky systems, I rarely start with private helper tests. I start at boundaries where product behavior becomes real:

- API contract edges
- data transformation rules
- persistence and retrieval expectations
- queue or event behavior
- key user workflow transitions

Those are the places where a harmless-looking refactor turns into a real incident.

## I write for failure modes, not just happy paths

This is the part teams skip when they are moving fast. A happy-path test is useful, but it rarely catches the failure that will wake somebody up later.

For workflow or money-moving code, I want explicit coverage for:

- retries
- partial failure
- idempotency
- ordering sensitivity
- null or missing optional fields
- contract values that remain syntactically valid while changing meaning

If the code depends on those cases in production, the suite should name them directly.

## Coverage is a flashlight, not a target

I still read coverage reports. I just do not mistake them for a plan.

Low coverage on a risky boundary is a useful warning. High coverage on glue code is often vanity. The report is there to show blind spots, not hand me success criteria.

That usually leads to a smaller but stronger suite:

- fewer brittle tests around implementation details
- more contract and integration coverage where change crosses boundaries
- more scenario tests that mirror real workflow damage

## Fast feedback still matters

A suite that catches the right bugs but takes too long to run will still decay. Engineers stop trusting it, ignore flakes, or treat it as something CI deals with later.

So I prefer layered feedback:

- fast local tests around risky business rules
- integration checks around contracts and persistence
- slower end-to-end coverage only for the most valuable journeys

If the suite cannot participate in daily delivery, it stops being an engineering tool and becomes an aspiration.

## Technical Deep Dive

The best suites encode business invariants and failure recovery, not just line execution. I want tests that make it hard to accidentally break a workflow the team cares about even after the implementation underneath it gets reorganized.

That is why I like review contracts around risky code. If a change alters business invariants, rollout behavior, or failure recovery, the PR should have to show evidence explicitly.

```yaml
review_contract:
  invariant_changed: required
  rollout_risk: required
  evidence_links:
    - test
    - dashboard
    - runbook
```

### Friction I keep on purpose

- cases where a mutation is correct only if the follow-up side effect also happens
- workflow tests that cover retries, partial failure, and rollback semantics
- boundary tests for contracts, pagination, sorting, and permission checks
- metrics on flaky timing assumptions so the suite itself becomes observable

That kind of friction is worth paying because it blocks the failures that are actually expensive.
