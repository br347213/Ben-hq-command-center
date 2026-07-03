# AGENTS.md

## Project Intent

Ben HQ is a private personal command center. Keep the product focused on daily usefulness, low-friction capture, training support, family/personal planning, Pokemon GO planning, learning, prompts, and future read-only summaries.

## Hard Boundary

Do not access or connect workplace files, workplace email, workplace apps, or workplace systems. This project is personal-only.

## Product Rules

- The Today page is the core product.
- Action beats passive information.
- Keep dashboards compact and explain why recommendations appear.
- Use seeded or manually entered data until integrations are explicitly added.
- Label mock, stale, or imported data clearly.
- Require approval before any future external write action.
- Keep finance features read-only and later-phase only.

## Design Rules

- Dark liquid glass theme.
- Calm, dense, modern, and practical.
- Avoid generic SaaS dashboard styling.
- Avoid large empty marketing sections.
- Prefer small, scannable modules with clear next actions.
- Keep mobile behavior first-class.

## Future Technical Direction

- Next.js with TypeScript
- Tailwind CSS
- Supabase Auth and PostgreSQL
- Feature-folder architecture
- Zod validation for user input and integration payloads
- Rule-based training plan engine before AI explanations
- Adapter pattern for all external integrations
- Unit tests for training rules, recurrence, dates, dashboard prioritization, and adapters
- Playwright smoke tests for core flows

## Current Prototype

The current version is a local static prototype:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `icons/icon.svg`

It should be treated as the visual and interaction baseline, not the final framework implementation.
