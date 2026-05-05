from __future__ import annotations

import re
import sys
from pathlib import Path
from textwrap import dedent


ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src" / "content" / "blog"
UPDATED_AT = "May 4, 2026"


POSTS = {
    "better-observability-for-teams-that-move-fast": {
        "group": "runtime",
        "theme": "reliability",
        "lead": "For observability work, I want to see the join key between user intent, background jobs, and downstream side effects. Without that chain, every incident write-up turns into guesswork about which subsystem actually owned the miss.",
        "bullets": [
            "trace coverage for the hot paths that actually page the team",
            "queue lag, retry age, and dead-letter volume on the same timeline as request latency",
            "label discipline so dashboards stay queryable under real cardinality pressure",
            "a small set of business outcomes linked back to technical spans",
        ],
    },
    "debugging-async-javascript-without-guesswork": {
        "group": "runtime",
        "theme": "frontend",
        "lead": "Async UI bugs become solvable the moment every request and every render commit gets a durable identity. That lets you prove which effect started the work, which result arrived late, and which branch still believed it owned the screen.",
        "bullets": [
            "stale responses that still attempt to commit state",
            "cleanup handlers that run after a replacement request has already started",
            "shared mutable objects crossing component or hook boundaries",
            "branches that distinguish network failure from cancellation too late",
        ],
    },
    "designing-ai-features-people-can-actually-trust": {
        "group": "runtime",
        "theme": "ai",
        "lead": "Trust increases when the runtime records enough structure to replay why the assistant made a recommendation. That means the system needs source evidence, prompt lineage, guardrail outcomes, and a clean handoff to human correction.",
        "bullets": [
            "review acceptance rate by workflow and prompt version",
            "citation coverage for answers that claim factual certainty",
            "frequency of user overrides after a confident model response",
            "fallback rate when the retrieval set is thin or contradictory",
        ],
    },
    "designing-review-loops-for-llm-automation": {
        "group": "runtime",
        "theme": "ai",
        "lead": "A review loop is not a modal window with approve and reject buttons. It is a queueing system with risk tiers, escalation rules, and a model-output contract that tells a reviewer what changed, why it changed, and how expensive reversal will be.",
        "bullets": [
            "time spent in review by risk bucket instead of global averages",
            "how often reviewers request additional source evidence",
            "classes of edits that should have been deterministic transforms",
            "cases where automation should have deferred earlier instead of guessing",
        ],
    },
    "event-driven-workflows-without-turning-systems-into-puzzles": {
        "group": "runtime",
        "theme": "reliability",
        "lead": "Event-driven systems stay readable when every event carries the same operational questions: who emitted this, which invariant does it advance, and what makes the consumer safe to replay. If those answers live only in tribal knowledge, the graph will collapse under change.",
        "bullets": [
            "idempotency keys on consumers that can mutate billing or fulfillment state",
            "replay-safe handlers that separate validation from irreversible side effects",
            "backpressure signals visible before retries turn into storms",
            "event schemas with ownership and deprecation windows, not just JSON examples",
        ],
    },
    "fast-apis-without-cleverness-debt": {
        "group": "runtime",
        "theme": "service",
        "lead": "High-throughput APIs usually degrade because the team smears ownership across the request path. A fast service is one where parsing, authorization, reads, writes, and background side effects each have explicit latency budgets and separate failure handling.",
        "bullets": [
            "timeouts that align with the caller's deadline rather than default library values",
            "serialization hotspots that grow quietly as payloads pick up optional fields",
            "accidental N+1 behavior introduced by convenience loaders",
            "cross-cutting middleware that hides expensive synchronous work",
        ],
    },
    "feature-flags-as-an-engineering-safety-system": {
        "group": "runtime",
        "theme": "reliability",
        "lead": "Flags only improve safety when the rollout path is observable and reversible under pressure. If a team cannot answer who owns a flag, when it expires, and which metrics define a rollback, the flag has become stateful debt disguised as control.",
        "bullets": [
            "flag evaluation latency in the request path for server-side checks",
            "mismatch rates between client and server decisions during rollout",
            "expiry and cleanup compliance so stale flags stop leaking product state",
            "kill-switch drills for the workflows that matter to revenue or compliance",
        ],
    },
    "from-prototype-to-platform-growing-a-python-service-safely": {
        "group": "runtime",
        "theme": "service",
        "lead": "The hardest part of promoting a Python prototype is not language performance. It is deciding which assumptions must stop being implicit: schema validation, queue semantics, concurrency limits, and the exact points where operator intervention is allowed.",
        "bullets": [
            "where local in-memory shortcuts should become explicit durable storage",
            "background jobs that need lease ownership instead of best-effort polling",
            "package-level imports that hide startup work and complicate cold paths",
            "module boundaries that need to become service contracts before scaling out",
        ],
    },
    "how-i-think-about-reliability-in-payment-flows": {
        "group": "runtime",
        "theme": "reliability",
        "lead": "Payment reliability starts with naming the authoritative state transition, not just making retries abundant. The system should know which record defines the money movement, which webhook or callback can arrive out of order, and which recovery path keeps finance and support aligned.",
        "bullets": [
            "duplicate authorization or capture attempts for the same commercial intent",
            "webhook ordering gaps between provider time and local processing time",
            "manual reconciliation steps still required after an automated retry succeeds",
            "customer-visible states that diverge from ledger or provider truth",
        ],
    },
    "practical-caching-for-full-stack-apps": {
        "group": "runtime",
        "theme": "service",
        "lead": "Caching only earns its complexity if invalidation rules are easier to explain than the original latency problem. I prefer cache layers with narrow scope, explicit ownership, and an answer to the question 'what stale data is acceptable here and for how long?'",
        "bullets": [
            "cache stampedes on keys derived from broad list queries",
            "stale object shapes surviving after a contract change",
            "read-through caches that accidentally hide upstream partial failure",
            "per-tenant or per-role scoping mistakes in shared key design",
        ],
    },
    "refactoring-nodejs-services-without-freezing-delivery": {
        "group": "runtime",
        "theme": "service",
        "lead": "I trust large Node refactors only when the new seams can coexist with the old ones temporarily. That usually means introducing request-level adapters, compatibility tests around the strangled boundary, and metrics that prove latency and error rate stayed bounded during the move.",
        "bullets": [
            "module boundaries with hidden state that prevents safe extraction",
            "side-effect ordering changes after async refactors or queue insertion",
            "error mapping drift between old handlers and new abstractions",
            "test suites that assert behavior too loosely to catch routing regressions",
        ],
    },
    "the-gap-between-ai-demos-and-ai-products": {
        "group": "runtime",
        "theme": "ai",
        "lead": "Demos usually optimize for a single beautiful turn. Products survive ugly turns: low-quality inputs, missing context, user corrections, partial failures, and policy edges where the right answer is to stop. That gap is mostly runtime design, not model benchmark design.",
        "bullets": [
            "how often success depends on hidden operator curation behind the scenes",
            "inputs that should short-circuit to deterministic software instead of generation",
            "review burden shifted to support or operations after launch",
            "places where evaluation data does not resemble production entropy",
        ],
    },
    "when-to-use-postgres-redis-and-mongo-together": {
        "group": "runtime",
        "theme": "data",
        "lead": "A multi-datastore architecture is justified only when each engine owns a different failure and performance profile. The design should make it obvious which store is authoritative, which store is disposable, and what consistency debt is being purchased for speed.",
        "bullets": [
            "writes that must land in the system of record before caches or projections update",
            "document shapes that drift beyond what transactional tables can support cleanly",
            "eviction or replication behavior that changes user-visible latency unexpectedly",
            "operational playbooks for rebuilding derived state after corruption or outage",
        ],
    },
    "building-portfolio-projects-that-look-like-product-work": {
        "group": "product",
        "theme": "product",
        "lead": "A portfolio project starts reading like product work once it shows operational judgment: how data enters the system, which decisions are reversible, and what evidence a user gets before they trust an action. Surface polish helps, but product credibility comes from workflow clarity.",
        "bullets": [
            "a visible event timeline or audit trail instead of only pretty cards",
            "real operational constraints like permissions, retries, or review states",
            "sharp copy that explains tradeoffs instead of generic startup language",
            "screens that prove the author thought about edge cases, not just hero paths",
        ],
    },
    "how-i-evaluate-a-nextjs-architecture": {
        "group": "product",
        "theme": "architecture",
        "lead": "When evaluating a Next.js setup, I map the app by rendering mode, data ownership, and cache scope before touching folder structure debates. Most architecture mistakes show up as unclear boundaries between server rendering, client interactivity, and mutation paths.",
        "bullets": [
            "where server components are pulling in client-only state accidentally",
            "whether data fetching is colocated with the boundary that owns revalidation",
            "how auth, personalization, and cache tags interact under partial navigation",
            "which pages can be statically cheap versus where freshness wins",
        ],
    },
    "how-i-review-pull-requests-in-high-context-codebases": {
        "group": "product",
        "theme": "process",
        "lead": "In dense codebases, review quality comes from making the claim legible before evaluating the diff. I want the author to identify the invariant being changed, the blast radius, and the evidence that tells us the new behavior is correct under load and rollback.",
        "bullets": [
            "diffs that hide behavior changes behind naming cleanup or file moves",
            "tests that pass but fail to capture the production invariant being modified",
            "observability changes missing from risky workflow edits",
            "migration steps that are implied in the code but absent from the rollout plan",
        ],
    },
    "remote-engineering-habits-that-scale-across-time-zones": {
        "group": "product",
        "theme": "process",
        "lead": "Remote execution scales when the artifact carries enough context to survive an eight-hour handoff. That means tickets, specs, async updates, and incident notes should answer the next engineer's first questions without requiring a meeting to decode intent.",
        "bullets": [
            "handoff notes that describe state, blockers, and expected next validation step",
            "decision records that capture rejected options, not just the chosen one",
            "alerts and runbooks phrased so an off-hours engineer can act safely",
            "meeting outputs converted into durable written contracts within the same day",
        ],
    },
    "rust-on-solana-where-performance-actually-matters": {
        "group": "product",
        "theme": "systems",
        "lead": "On Solana, performance arguments only become useful when they name compute units, account contention, serialization overhead, and rent tradeoffs. 'Rust is fast' is not an architecture decision; account layout and instruction shape are.",
        "bullets": [
            "account reads that expand compute without improving composability",
            "serialization formats that are convenient but too expensive in hot paths",
            "contention on shared writable accounts during popular workflows",
            "client assumptions that create unnecessary instruction fan-out",
        ],
    },
    "shipping-internal-tools-people-want-to-open-again": {
        "group": "product",
        "theme": "product",
        "lead": "Internal tools become sticky when they cut a real decision path down to a smaller number of clicks, tabs, and mental joins. The key is not adding more controls. It is reducing lookup cost while preserving the auditability an operations team needs to move confidently.",
        "bullets": [
            "how many systems an operator still has to cross-check for one answer",
            "which actions need previews, dry runs, or confirmation of downstream impact",
            "where the tool should pre-compute context instead of asking users to assemble it",
            "what telemetry proves the tool shortened task completion instead of just adding UI",
        ],
    },
    "taming-react-state-before-it-turns-into-architecture": {
        "group": "product",
        "theme": "frontend",
        "lead": "React state spirals when every new concern gets promoted to global just because it crosses two components. I would rather draw the ownership map first: server truth, route-scoped derivation, ephemeral UI state, and shared process state that genuinely survives navigation.",
        "bullets": [
            "derived state duplicated in multiple hooks with different invalidation timing",
            "optimistic updates that cannot be reconciled cleanly after a failed mutation",
            "selectors that hide expensive recomputation on every render",
            "stores that mix async transport concerns with presentational toggles",
        ],
    },
    "making-dashboards-useful-instead-of-decorative": {
        "group": "product",
        "theme": "product",
        "lead": "A dashboard becomes professional once each panel justifies a decision. Good analytics surfaces show trend, threshold, and action path in the same view so operators do not have to translate charts into next steps manually.",
        "bullets": [
            "panels that trend well but never explain what counts as intervention",
            "metrics lacking the denominator or segment that makes them comparable",
            "charts optimized for screenshots instead of anomaly detection",
            "dashboards that omit links to the records an operator must inspect next",
        ],
    },
    "the-real-cost-of-weak-api-boundaries": {
        "group": "product",
        "theme": "data",
        "lead": "Weak API boundaries are expensive because they create hidden coupling in semantics, not just in payload shape. If consumers learn behavior by reading logs or examples instead of contracts, every release accumulates integration debt outside version control.",
        "bullets": [
            "fields whose meaning changed while their type stayed valid",
            "consumer-specific fallback logic that should have lived in the producer",
            "undocumented ordering or pagination assumptions that drive user-visible bugs",
            "missing compatibility tests around the APIs with the highest downstream blast radius",
        ],
    },
    "what-changed-my-mind-about-microservices": {
        "group": "product",
        "theme": "architecture",
        "lead": "My view on microservices improved once I stopped treating them as a purity move and started treating them as an economic choice. Boundaries are only worth the overhead when they buy clearer deployment risk, data ownership, or team velocity under conflicting change schedules.",
        "bullets": [
            "whether the boundary reduces or increases cross-team release coordination",
            "how many queries now require distributed joins for a single operator workflow",
            "which services can fail independently without corrupting shared business state",
            "whether the interface is stable enough to survive separate lifecycles",
        ],
    },
    "why-product-engineers-should-own-data-contracts": {
        "group": "product",
        "theme": "data",
        "lead": "Owning the contract means owning the meaning of the fields that drive UX, workflow branching, and automation. Product engineers are often the first people to notice semantic drift because the UI is where ambiguous data stops looking abstract and starts looking broken.",
        "bullets": [
            "contract diffs reviewed alongside the user states they can affect",
            "authoritative field documentation for statuses, timestamps, and identifiers",
            "runtime alerts for nullability or enum drift on critical product paths",
            "deprecation windows enforced in tooling instead of polite team memory",
        ],
    },
    "writing-docs-that-reduce-onboarding-time": {
        "group": "product",
        "theme": "process",
        "lead": "Good engineering docs answer the question the new teammate will ask at minute two, not week three. That usually means combining system shape, invariants, local setup, and the first places things break instead of scattering them across polished but shallow pages.",
        "bullets": [
            "docs that show where state lives, how it changes, and how to inspect it",
            "a troubleshooting path with the exact commands or dashboards worth checking first",
            "clear ownership sections so a reader knows which team can clarify ambiguous behavior",
            "examples that reflect current production shape rather than historical setup leftovers",
        ],
    },
    "writing-tests-that-catch-regressions-instead-of-chasing-coverage": {
        "group": "product",
        "theme": "process",
        "lead": "The best test suites encode business invariants and failure recovery, not just line execution. A test should make it difficult to accidentally break a workflow the team cares about, even if the implementation details beneath that workflow keep changing.",
        "bullets": [
            "cases where a mutation is correct only if the follow-up side effect also happens",
            "workflow tests that cover retries, partial failure, and rollback semantics",
            "boundary tests for contracts, pagination, sorting, and permission checks",
            "metrics on flaky timing assumptions so the suite itself becomes observable",
        ],
    },
}


FRONTMATTER_RE = re.compile(r"^---\n([\s\S]*?)\n---\n", re.MULTILINE)
UPDATED_RE = re.compile(r'^updatedDate:\s*".*?"\s*$', re.MULTILINE)
PUBDATE_RE = re.compile(r'^(pubDate:\s*".*?")\s*$', re.MULTILINE)


def bullet_lines(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def append_section(theme: str, lead: str, bullets: list[str]) -> str:
    shared = {
        "ai": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            For AI features, I want every user-visible decision to leave behind a runtime record outside the generated text itself. That usually means logging the retrieval set, prompt version, tool calls, guardrail verdicts, and the reviewer action that finalized the output. Without that, teams argue from anecdotes instead of traces.

            ```json
            {{
              "workflowId": "doc-triage-8472",
              "promptVersion": "review-loop@12",
              "retrievalHitCount": 6,
              "guardrailVerdict": "allow-with-review",
              "reviewAction": "edited-and-approved"
            }}
            ```

            ### Checks I would wire in before widening rollout

            {bullets}

            That level of observability is what turns an AI feature from a polished demo into an operational product surface.
            """
        ),
        "service": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            In backend systems, I like to make the request path and the side-effect path visibly different. Reads can fail fast, writes should be idempotent, and anything expensive or retryable should leave the synchronous handler as early as possible. That separation makes failures explainable instead of dramatic.

            ```ts
            type WorkItem = {{
              idempotencyKey: string;
              tenantId: string;
              requestedAt: string;
              payload: Record<string, unknown>;
            }};

            async function handle(item: WorkItem) {{
              await validate(item);
              await persistIntent(item);
              await enqueue(item.idempotencyKey);
            }}
            ```

            ### Failure modes I want visible in logs and dashboards

            {bullets}

            Those mechanics are what keep a growing service understandable after the fifth integration point and the tenth new handler.
            """
        ),
        "reliability": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            Reliability becomes tractable once the system names the authoritative record, the retry boundary, and the operator override path. If one workflow crosses HTTP, queues, webhooks, and manual intervention, I want a single envelope that tells me which attempt is current and which attempt is historical noise.

            ```ts
            type AttemptEnvelope = {{
              workflowId: string;
              attempt: number;
              authoritativeState: "pending" | "accepted" | "committed" | "reconciled";
              retryable: boolean;
            }};
            ```

            ### Signals that should exist before launch

            {bullets}

            A system that can explain its degraded mode is usually a system that can be operated safely under pressure.
            """
        ),
        "frontend": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            Most frontend complexity comes from not deciding which layer owns latency and which layer owns truth. I prefer server data to remain server-shaped, route state to be explicit, and local UI state to stay ephemeral. Once those layers are blurred, bugs start looking random because the app no longer has a clear source of truth.

            ```ts
            type ScreenState =
              | {{ kind: "idle" }}
              | {{ kind: "loading"; requestId: string }}
              | {{ kind: "ready"; requestId: string; payloadVersion: number }}
              | {{ kind: "error"; requestId: string; message: string }};
            ```

            ### Things I remove early

            {bullets}

            That discipline keeps component trees from quietly turning into infrastructure.
            """
        ),
        "architecture": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            When someone says an architecture is scalable, I translate that claim into boundaries, failure domains, and deployable slices. If those are unclear, the architecture is still branding. The useful question is not whether the diagram looks modern. It is whether the next change can be shipped, verified, and rolled back cleanly.

            ```ts
            interface BoundaryDecision {{
              owner: string;
              sourceOfTruth: string;
              failureIsolation: string;
              migrationPath: string;
            }}
            ```

            ### Questions I want answered in the ADR

            {bullets}

            Strong architecture writing lowers coordination cost before it raises abstraction.
            """
        ),
        "data": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            Shape changes are less dangerous than semantic changes. The safest systems version meaning as aggressively as they version fields, and they fail closed when inputs drift outside the contract. A contract that cannot tell consumers which values are stable enough for logic is only half a contract.

            ```ts
            const Contract = z.object({{
              entityId: z.string(),
              status: z.enum(["queued", "processing", "ready", "failed"]),
              processedAt: z.string().datetime().nullable(),
            }});
            ```

            ### Compatibility checks I would automate

            {bullets}

            Once the semantic boundary is explicit, downstream product bugs get much easier to predict and much cheaper to fix.
            """
        ),
        "process": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            Process becomes technical when it defines what evidence counts as done, what context must survive handoff, and how quickly the next engineer can recover state after interruption. If the loop cannot be audited, it eventually becomes ceremony instead of leverage.

            ```yaml
            review_contract:
              invariant_changed: required
              rollout_risk: required
              evidence_links:
                - test
                - dashboard
                - runbook
            ```

            ### Friction worth keeping on purpose

            {bullets}

            Good process shortens decision latency because it makes the important context portable.
            """
        ),
        "systems": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            At lower levels, performance work stops being about syntax and becomes about memory layout, serialization cost, contention, and recovery semantics. The winning design is usually the one that names those constraints first instead of rediscovering them under production load.

            ```rust
            #[derive(BorshSerialize, BorshDeserialize)]
            pub struct PositionState {{
                pub authority: Pubkey,
                pub sequence: u64,
                pub status: u8,
            }}
            ```

            ### Bottlenecks I'd measure first

            {bullets}

            Once the constraints are explicit, optimization decisions become engineering tradeoffs instead of folklore.
            """
        ),
        "product": dedent(
            """\
            ## Technical Deep Dive

            {lead}

            The fastest way to make a product surface feel shallow is to optimize the panel instead of the workflow. I like to model the operator's next action, the state they need to verify it, and the audit trail left behind. When those three things are sharp, the interface starts feeling much more expensive than it actually is.

            ```ts
            type WorkflowView = {{
              summary: string;
              blockingChecks: string[];
              nextRecommendedAction: string;
              auditReference: string;
            }};
            ```

            ### Product signals I care about

            {bullets}

            Great product engineering usually looks like fewer clicks, clearer trust boundaries, and better evidence around the next decision.
            """
        ),
    }

    return shared[theme].format(lead=lead, bullets=bullet_lines(bullets)).strip()


def update_frontmatter(raw: str) -> str:
    if UPDATED_RE.search(raw):
        raw = UPDATED_RE.sub(f'updatedDate: "{UPDATED_AT}"', raw, count=1)
    else:
        raw = PUBDATE_RE.sub(rf'\1\nupdatedDate: "{UPDATED_AT}"', raw, count=1)
    return raw


def process_post(slug: str, metadata: dict[str, object]) -> None:
    path = BLOG_DIR / f"{slug}.md"
    raw = path.read_text()
    raw = update_frontmatter(raw)

    marker = "## Technical Deep Dive"
    if marker not in raw:
        appendix = append_section(
            metadata["theme"],  # type: ignore[arg-type]
            metadata["lead"],  # type: ignore[arg-type]
            metadata["bullets"],  # type: ignore[arg-type]
        )
        raw = raw.rstrip() + "\n\n" + appendix + "\n"

    path.write_text(raw)


def main() -> None:
    allowed_groups = set(sys.argv[1:]) if len(sys.argv) > 1 else None

    for slug, metadata in POSTS.items():
        group = metadata["group"]
        if allowed_groups and group not in allowed_groups:
            continue
        process_post(slug, metadata)


if __name__ == "__main__":
    main()
