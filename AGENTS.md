# AGENTS.md

## Project Intent

My Command Center is a private personal operating system. Keep the product focused on daily usefulness, grounded recommendations, training support, family/personal planning, Pokemon GO planning, chess improvement, learning, and approved read-only personal summaries.

## Hard Boundary

Do not access or connect workplace files, workplace email, workplace apps, or workplace systems. This project is personal-only.

## Product Rules

- The Today page is the core product.
- Action beats passive information.
- Every surfaced recommendation must cite something specific about Ben today. If the same sentence could apply to anyone, it does not ship.
- Compute clean domain aggregates before AI reasoning; do not use hardcoded recommendation trees or pass raw noisy data directly to a model.
- Keep a structured notebook for every domain where progression matters.
- Use a light frequent signal check and a deeper reasoning pass at the domain's natural boundary.
- If a live feature is unavailable or not specific enough, hold the card instead of exposing setup language or a placeholder.
- Keep integration diagnostics in Sources or Settings, never on Today.
- Require approval before any future external write action.
- Keep finance features read-only and later-phase only.

## Design Rules

- Use the My Command Center identity, ship-and-wheel mark, and deep navy/command teal palette.
- Dark, restrained liquid glass theme.
- Calm, dense, modern, and practical.
- Avoid generic SaaS dashboard styling.
- Avoid large empty marketing sections.
- Prefer one or two focal modules and concise supporting cards with clear next actions.
- Keep mobile behavior first-class.
- Use one consistent command-teal accent treatment instead of category-colored borders.

## Future Technical Direction

- Next.js with TypeScript
- Tailwind CSS
- Supabase Auth and PostgreSQL
- Feature-folder architecture
- Zod validation for user input and integration payloads
- Verified domain aggregates plus tool-using expert reasoning
- Structured domain notebooks for training, chess, Pokemon GO, news, and future life planning
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

The standing product and visual directives live in `docs/ai-operating-philosophy.md` and `docs/design-system.md`.
