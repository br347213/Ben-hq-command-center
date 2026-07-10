# Ben HQ — AI Operating Philosophy
### Standing Codex directive

## Purpose of this document

This isn't a task ticket for one module — it's the standing directive for how every part of Ben HQ's AI layer should think and behave, across every domain: training, chess, Pokémon GO, finance/life planning, news, and whatever gets added later. Training appears below as a worked example because it's the clearest illustration, not because it's the only thing this applies to. Any new module should be built against the same principles.

## The North Star

Ben HQ exists to be an app-killer: fewer apps, fewer clicks, more insight than opening the source app directly would give. Every domain earns its place by clearing one test, on every piece of surfaced text, regardless of which module produced it:

> **Could this exact sentence have been written without knowing anything specific about Ben today?**

If yes, it fails.

## Principle 1 — Ground it, don't script it, and don't let it free-associate either

No hardcoded if/then business rules anywhere in the system ("if HRV drop >15% then X," "if rating plateaus then Y"). Also no handing the model raw, noisy data and asking it to "figure it out" unsupervised — that's how confident, wrong pattern-matching happens.

The pattern, identical in every domain:
1. A data layer computes clean, verified aggregates specific to that domain — rolling averages, deltas from Ben's own historical baseline, position in a cycle/block/season.
2. The model gets those aggregates plus tool access (web search, plus a query interface into that domain's notebook) and reasons with full latitude — deciding what matters and what to recommend using its own judgment and current expert knowledge, never a predetermined decision tree.

## Principle 2 — Every domain that should build on itself needs a notebook

Persistent, structured, queryable memory — not just raw synced numbers — for any domain where progression matters:
- **Training**: block goal/phase, weekly load, subjective feedback per session, injuries, upcoming events, computed biometric baseline
- **Chess**: opening repertoire progress, tactics rating trend, what's actually been studied vs. neglected, tournament results
- **Finance/life planning**: stated goals, portfolio composition and changes over time, life events that shift priorities, past decisions and the reasoning behind them
- **Pokémon GO**: play patterns, community day history and preferences, which event types actually get engagement vs. skipped

This is the general fix for the "Runna problem" — a deep pass can reference what happened last time instead of starting from zero, in any domain.

## Principle 3 — Two cadences, every domain, never one loop

- **Light, frequent, cheap check** (mostly non-LLM): "has anything moved meaningfully outside this person's normal range, or is today a real decision point?" Silence is the correct output most of the time — this runs constantly without becoming noise.
- **Deep, infrequent, expensive reasoning pass** (full tool-using model reasoning): triggered at that domain's own natural boundary, not a fixed daily schedule. Training's boundary is block-end. Chess's might be after a tournament or study cycle. Finance's might be quarterly or goal-change-triggered. Different rhythms per domain are correct, not inconsistent — don't force one cadence onto all of them.

## Principle 4 — Tool-using expert reasoning, not scripted output

Every deep pass gets web search at generation time to pull in current expert thinking relevant to the specific situation — the difference between the model's frozen training data and the model actively researching this situation, right now. This is the part of the vision that makes it "beyond what a person could give you." Each domain's system prompt frames the model as that domain's expert (coach, chess trainer, planning-literate advisor) with full reasoning latitude and no fixed recommendation menu — the one hard constraint is that every claim must cite a specific fact from the notebook, never generic phrasing.

## Principle 5 — Command Brief is the one place that's inherently cross-domain

This is the part of the system that's holistic by definition, not by choice. When multiple domains have fresh deep-pass output waiting, Command Brief needs a ranking rule for what surfaces first: something that changed or crossed a threshold outranks something that's just stable reference info. Without this, five domains going proactive at once just becomes five things demanding attention instead of the one thing actually most worth knowing right now.

## Principle 6 — Build order still matters, and it serves this vision rather than shrinking it

Holistic doesn't mean simultaneous. Building full deep-reasoning pipelines for every module at once, before any single one has proven it clears the specificity test, is close to a guarantee of ending up with several shallow modules instead of one genuinely excellent one — the exact outcome this whole project is a reaction to. The fix: validate the full principle set above in one domain, end to end, against the acceptance test, before extending it. Training is the pick for that first proof purely because its data pipeline (Garmin sync) already exists — not because it matters more than chess or finance. Once one domain genuinely clears the bar, every other domain becomes a repeat of an already-proven pattern instead of a fresh invention — a faster path to "500 expert coaches" than debugging several half-working systems at once.

## Principle 7 — Ship confidence, not scaffolding

Every card should read like someone finished the work, not like someone narrating what's left to do. This applies everywhere, not just training.

**Don't expose implementation status as content.** Setup states ("not set up," "when configured"), data-quality caveats ("community pulse, not a definitive source"), and TODO-style narration ("needs an API key for true automatic ingestion — for now, these are just recency-sorted searches") belong in code comments or an internal dev log, never in rendered UI. If a feature isn't ready, either hold the card until it is, or ship a complete, confident version of whatever it can honestly do today. Never a sentence that apologizes for what it can't do yet.

**Don't leak internal category names into user-facing chrome.** A card titled "IGNORE," or tagged with an attribution like "Ben HQ filter," is the app's internal reasoning bucket showing through the seams. The user should see the natural-language result, never the name of the system that produced it. Diagnostic content — "5 of 5 approved signals live," raw counters like sources/events/replies/recs — is genuinely useful to you as the builder, but it's an ops dashboard, not an insight. It belongs behind Settings or a diagnostics view, not competing with real content on Today.

**Generic reasoning statements fail the North Star test too.** A "why it matters" line that could caption the same story for any user, any day, is the same specificity failure as a training placeholder wearing different clothes. Every one needs an actual claim tied to something specific, not a category-level hedge.

**Watch the aesthetic, not just the copy.** Dark theme plus glass/frosted-card treatment is currently one of the most common visual signatures of interfaces generated by a chat-based coding tool without further art direction, and colored-left-border cards specifically are among the most reliable single tells. This doesn't mean abandon the aesthetic — it means commit to it on purpose: one consistent accent treatment repeated everywhere, not a different border color per card category, since mixing signals within one screen reads as assembled rather than designed. Add at least one hand-built detail a template wouldn't produce by default.

### Before → After (from current screenshots)

- *"AI/tooling is one of Ben HQ's core interest lanes; this may affect workflows"* → a specific claim tied to what Ben is actually building or using right now, no category-level hedge
- *"YouTube needs either channel choices or an API key for true automatic ingestion. For now, these open recency-sorted searches"* → remove the implementation narration entirely; hold the card until it's real, or fully commit to describing what the search actually offers
- *"Auto Sync not set up"* as a headline Sources-page card → move to Settings/diagnostics; primary view shows a working state or nothing
- Card titled *"IGNORE"* with a *"Ben HQ filter"* tag → natural-language rename, drop the internal tag
- *"5 of 5 approved signals live"* plus raw counters as a primary Today card → move behind Settings, don't compete with real insights for primary space

## Worked Example: Training

**Notebook fields**: current block (goal, phase — base/build/peak/taper, dates), weekly planned-vs-actual load, subjective feedback per session, injury/pain notes, upcoming events, computed rolling biometric baseline (sleep, HRV, resting HR) from Garmin/Health sync.

**Light check**: compute today's deltas against the rolling baseline; escalate to a model call only if something's genuinely outside normal range or today's a real workout-choice decision point.

**Deep pass**: triggered at block boundary or manual request — full block history, feedback trend, biometric direction, current sports-science research, and upcoming events synthesized into the next block. This pass has to genuinely outperform pasting context into ChatGPT by hand, or it isn't worth having.

**Before/after test case** — the current placeholder already live in the app:
> "Easy run or mobility reset — Use imported health and schedule context to pick the sensible version."

This describes a decision instead of making one. Rebuilt output should read closer to: "[specific sleep/HRV numbers and trend], you're in week 3 of the base phase, so today's a mobility day, not a run" — grounded, specific, traceable to real notebook data.

**Definition of done**: five consecutive real days where each day's output is different, specific, and traceable to actual notebook/biometric data for that day. Two interchangeable days in a row means the grounding layer isn't feeding enough specificity yet — fix that before extending the pattern to any other module.
