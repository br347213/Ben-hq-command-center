# Community Connector Strategy

Ben HQ should prefer zero-dollar, local-first, community-supported connectors when official APIs are closed, expensive, or unsafe for public GitHub Pages.

## Rules

- Public, account-free data can run directly in the browser.
- Private account data must be summarized locally first, then encrypted into `data/ben-hq-latest.enc.json`.
- Raw credentials, OAuth tokens, email bodies, Garmin files, Apple Health exports, and personal notes must stay out of GitHub.
- If a community feed is stale, Ben HQ should label it and fall back to curated planning data instead of showing old facts as current.

## Current Connectors

- Weather: Open-Meteo public API.
- Pokemon GO: PoGoAPI for reference counts and `ccev/pogoinfo` public JSON for events and raids when current.
- Chess: Lichess public daily puzzle metadata.
- Garmin: GarminDB local sync wrapper, with credentials and raw databases under `.ben-hq-private/garmin`.
- Apple Health: planned export/import path through an Apple Health export parser such as `healthkit-to-sqlite`.

## Daily Packet Shape

The encrypted packet can include:

- `health`: sleep, steps, readiness, stress, resting heart rate, recovery note.
- `training`: recommended workout, last workout, duration, training load, fallback.
- `pokemon`: optional curated event notes if the public event feed is stale.
- `recommendations`: concise next actions surfaced on Today.
