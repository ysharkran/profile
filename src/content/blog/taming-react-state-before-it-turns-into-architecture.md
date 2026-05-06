---
title: "The React State Smells I Remove Before They Become Architecture"
description: "When React state starts feeling mysterious, the problem is usually ownership. I remove duplicated truth, late async commits, and shared stores that never earned their scope."
pubDate: "2026-04-30"
updatedDate: "May 5, 2026"
heroImage: "/blog/taming-react-state-before-it-turns-into-architecture.jpg"
badge: "Frontend"
tags: ["react", "frontend", "state-management"]
---

Most React state disasters do not begin with Redux, Zustand, Context, or any other tooling choice. They begin with one small convenience: storing the same idea twice because it feels easier in the moment.

That is the smell I go after first.

## I ask who owns truth

When state feels messy, I do not start by moving hooks around. I ask:

- who is allowed to change this value
- who only reads it
- is this canonical state or derived state
- what event should cause it to change

If those answers are fuzzy, the component tree will keep getting harder to reason about even if the current UI still “works.”

## Duplicated derived state is usually the first real problem

The most common React state bug I see is not a missing memo or an inefficient selector. It is duplicated truth with slightly different invalidation timing.

That usually looks like:

- a filtered list stored separately from the source list
- a selected entity duplicated across route state and local state
- a form that caches server-backed defaults and forgets when those defaults changed
- optimistic local state that no longer reconciles cleanly with the mutation result

Each local decision feels reasonable. Together they create synchronization bugs that look far more mysterious than they are.

## Shared state should earn its scope

I prefer local state until shared state becomes clearly necessary.

Good reasons to promote state:

- multiple distant consumers need the same canonical value
- a workflow crosses route or layout boundaries
- synchronization with external sources needs a stable coordinator

Bad reasons usually sound like “it was easier to grab it globally.”

Once shared state exists, it becomes architecture whether the team admits that or not.

## Async state deserves request identity

React state becomes especially confusing when late async work can still commit after the screen already moved on.

If a fetch, mutation, or background refresh can overlap with a newer interaction, I want a visible identity model:

- which request is active
- which result is stale
- which branch still has commit rights
- which UI state is only temporary while the request resolves

Without that, bugs start showing up as flicker, revert, or “it fixed itself after a second.”

## State libraries do not save confused ownership

This is the blunt part. A state library can improve ergonomics, but it cannot rescue a confused ownership model. If the team does not know which values are authoritative, global state just spreads the confusion faster.

That is why I try to design the ownership map first:

- server truth
- route-scoped derivation
- ephemeral UI state
- genuinely shared process state

Once those layers are explicit, the library choice matters much less.

## Technical Deep Dive

React state spirals when every new concern gets promoted to global just because it crosses two components. I would rather draw the ownership map first: server truth, route-scoped derivation, ephemeral UI state, and shared process state that genuinely survives navigation.

Most frontend complexity comes from not deciding which layer owns latency and which layer owns truth. I prefer server data to remain server-shaped, route state to be explicit, and local UI state to stay ephemeral. Once those layers are blurred, bugs start looking random because the app no longer has a clear source of truth.

```ts
type ScreenState =
  | { kind: "idle" }
  | { kind: "loading"; requestId: string }
  | { kind: "ready"; requestId: string; payloadVersion: number }
  | { kind: "error"; requestId: string; message: string };
```

### Things I remove early

- derived state duplicated in multiple hooks with different invalidation timing
- optimistic updates that cannot be reconciled cleanly after a failed mutation
- selectors that hide expensive recomputation on every render
- stores that mix async transport concerns with presentational toggles

That discipline keeps component trees from quietly turning into infrastructure.
