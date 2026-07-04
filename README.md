# Ben HQ

Ben HQ is a private, personal daily command center for tasks, training, weather, calendar planning, Pokemon GO priorities, chess improvement, learning queues, prompt workflows, and approved personal-source integrations.

This first pass is a high-fidelity static prototype with public live data from account-free sources: Arden weather from Open-Meteo, Pokemon GO reference counts from PoGoAPI, and Lichess daily puzzle metadata. It does not connect to email, workplace resources, financial accounts, Google Calendar, Google Drive, health accounts, or private account APIs.

## Open The Prototype

Open [index.html](C:/Users/Ben/Downloads/Command%20Center%20Project/index.html) in a browser.

The current machine path does not have Node or npm available, so the first build is intentionally static. The project is structured and documented so it can move into the intended Next.js, TypeScript, Tailwind, Supabase, and Vercel stack when a Node runtime is available.

## What Is Built

- Liquid glass dark visual direction
- Responsive desktop layout and mobile navigation
- Today-first dashboard
- At-a-glance daily briefing with explicit event windows, agenda, and action facts
- Live Arden weather card using Open-Meteo
- Dynamic daily signal, source health, and recommendation card
- Sources view for integration status and privacy guardrails
- Manual private context intake with local review before memory or task promotion
- Local text, Markdown, and JSON file import into the private review queue
- Quick capture with local in-memory task insertion
- Local-device persistence for captures and task checkmarks
- Local data export, import, and reset controls for browser-stored context
- Tasks inbox and today focus
- Calendar preview
- Training hub preview
- Pokemon GO public data pulse through PoGoAPI
- Manual, source-labeled Pokemon GO event brief for Sobble Community Day and the 10th Anniversary Party
- Chess module with an interactive puzzle board and Lichess daily puzzle metadata
- Learning queue
- Prompt library with search
- Personal knowledge library preview
- Weekly review flow
- Settings privacy stance
- PWA manifest and icon

## Version One Direction

The first production version should prioritize:

1. Next.js app shell with TypeScript
2. Authentication and user settings
3. Today dashboard with public weather, Pokemon GO, and chess signals plus seeded personal modules
4. Quick capture and task inbox persistence
5. Calendar and weekly review
6. Training profile and rule-based weekly plan generator
7. Prompt and learning libraries
8. Pokemon GO planner with manually entered events before live integrations
9. Private integration bridge for approved personal sources: Gmail, Google Calendar, Google Drive, ChatGPT exports, Apple Notes, Garmin, Apple Health, Lichess, and Pokemon GO calendars

## Privacy Boundaries

This is a personal-only project. It should not access workplace files, workplace email, workplace applications, or workplace systems. Future integrations should be opt-in, read-only first, and clearly labeled with source and freshness. Direct finance account connections are intentionally skipped.

## Future Next.js Structure

```text
src/
  app/
    today/
    tasks/
    calendar/
    training/
    pokemon/
    chess/
    learn/
    prompts/
    library/
    review/
    settings/
  components/
    layout/
    shared/
    ui/
  features/
    dashboard/
    tasks/
    calendar/
    training/
    pokemon/
    chess/
    prompts/
    learning/
    notes/
  lib/
    dates/
    validation/
    integrations/
    ai/
  types/
```

## Known Limits

- Seed data remains in the prototype, but captures and task checkmarks persist in this browser's local storage.
- Local browser data can be exported from Settings before clearing browser data or switching devices.
- Private-source context can be pasted into Sources for local review without adding account tokens to GitHub Pages.
- Text, Markdown, and JSON files can be read locally into the review queue; binary documents still need a future parser.
- Weather depends on the public Open-Meteo API being reachable from the browser.
- Pokemon GO public counts depend on PoGoAPI being reachable from the browser.
- Lichess daily puzzle metadata depends on the public Lichess API being reachable from the browser.
- No backend exists yet.
- No authentication exists yet.
- No tests can be run until Node or another project runtime is installed.
- Gmail, Calendar, Drive, ChatGPT, Notes, Garmin, and Apple Health are approved future sources, but are not live in the public static app because they need private tokens, exports, or a private bridge.
