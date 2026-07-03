# Ben HQ

Ben HQ is a private, personal daily command center for tasks, training, calendar planning, Pokemon GO priorities, learning queues, prompt workflows, and future read-only snapshots.

This first pass is a high-fidelity local design prototype with seeded data only. It does not connect to email, workplace resources, financial accounts, Google Calendar, Pokemon GO sources, or any external APIs.

## Open The Prototype

Open [index.html](C:/Users/Ben/Downloads/Command%20Center%20Project/index.html) in a browser.

The current machine path does not have Node or npm available, so the first build is intentionally static. The project is structured and documented so it can move into the intended Next.js, TypeScript, Tailwind, Supabase, and Vercel stack when a Node runtime is available.

## What Is Built

- Liquid glass dark visual direction
- Responsive desktop layout and mobile navigation
- Today-first dashboard
- Quick capture with local in-memory task insertion
- Tasks inbox and today focus
- Calendar preview
- Training hub preview
- Pokemon GO planning cards with mock-data freshness labels
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
3. Today dashboard with seeded data
4. Quick capture and task inbox persistence
5. Calendar and weekly review
6. Training profile and rule-based weekly plan generator
7. Prompt and learning libraries
8. Pokemon GO planner with manually entered events before live integrations

## Privacy Boundaries

This is a personal-only project. It should not access workplace files, workplace email, workplace applications, or workplace systems. Future integrations should be opt-in, read-only first, and clearly labeled with source and freshness.

## Future Next.js Structure

```text
src/
  app/
    today/
    tasks/
    calendar/
    training/
    pokemon/
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

- Data is seeded and resets on refresh.
- No backend exists yet.
- No authentication exists yet.
- No tests can be run until Node or another project runtime is installed.
- Pokemon GO and finance cards are explicitly placeholders, not live information.
