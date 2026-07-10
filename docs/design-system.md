# My Command Center: Design System Direction for Codex

Build **My Command Center** as a premium personal operating system: calm, capable, analytical, and deliberate. It should feel like a polished enterprise product with a highly personal purpose, not a generic productivity dashboard.

The visual idea is **“navigation through complexity.”** The user is at the helm of their schedule, fitness, finances, family logistics, interests, and information. The interface should make a large amount of information feel organized, understandable, and controllable.

## Brand personality

- Calm command, not urgency or chaos.
- Modern and technical, but still human and approachable.
- Premium and restrained, similar to an executive dashboard rather than a gaming interface.
- Data-forward, with visual hierarchy that makes the most important decision obvious.
- Dark by default, with luminous glass surfaces and restrained teal/cyan accents.
- Use nautical symbolism subtly. Avoid obvious pirate, cruise ship, military, or cartoon styling.

---

## Logo system

### Core mark

The logo is a simple emblem made from three elements:

1. **A ship bow**, viewed straight-on.
2. **A ship steering wheel**, centered behind and slightly above the bow.
3. **Three minimal wave lines**, beneath the ship.

Do **not** include a captain, human face, body, hat, flag, anchor, compass, or additional illustration details.

The ship should feel stable, forward-moving, and symmetrical. The wheel should be recognizable but simplified enough to remain clear at small sizes. Waves should be minimal and evenly spaced, not decorative or overly realistic.

### Logo visual treatment

- Primary mark: light mist/white ship and wheel with teal wave accents.
- Dark-mode default: logo appears on a deep navy or translucent glass background.
- Monochrome version: all white or all dark navy depending on background.
- App icon: centered mark inside a rounded-square dark glass tile.
- Avoid excessive glow, shadows, gradients, bevels, or 3D rendering.
- The mark should read clearly at 24px, 32px, 48px, 64px, and large header sizes.
- Preserve generous clear space around the logo: at least the width of one wheel spoke on all sides.
- Never put text inside the icon.

### Wordmark

Use:

**MY COMMAND CENTER**

Preferred presentation:

- Uppercase or title case depending on context.
- Strong, clean sans-serif.
- Tight but not condensed tracking.
- “My” may be visually smaller than “Command Center” in large brand contexts.
- Supporting tagline: **Navigate. Analyze. Command.**

The tagline is optional in compact layouts and should not appear in app navigation, small cards, or mobile headers.

---

## Color system

The color palette should create depth and hierarchy without turning the product into a neon cyberpunk UI.

```css
:root {
  --mcc-deep-navy: #0B1320;
  --mcc-navy-elevated: #102333;
  --mcc-ocean-slate: #173042;
  --mcc-steel-blue: #3A5568;

  --mcc-command-teal: #17B3A6;
  --mcc-command-cyan: #2BC8E8;
  --mcc-sea-glass: #AEEBE0;

  --mcc-mist: #EAF2F2;
  --mcc-text-primary: #F3F7FA;
  --mcc-text-secondary: #AABBC8;
  --mcc-text-muted: #718392;

  --mcc-success: #52D69C;
  --mcc-warning: #F5B544;
  --mcc-danger: #F06472;
  --mcc-info: #2BC8E8;
}
```

### Color usage rules

- Deep Navy is the primary application background.
- Command Teal and Command Cyan are reserved for active states, primary actions, selected navigation, progress, and meaningful data emphasis.
- Sea Glass is for softer accents, secondary data, positive states, and subtle glow.
- Mist and white are for primary text and logo variants.
- Do not use teal/cyan as a large full-page background.
- Do not use more than one bright accent color in the same component unless communicating a meaningful status distinction.
- Warning, danger, and success colors should communicate real state, not decoration.

---

## Liquid Glass visual language

The product should use a restrained **Liquid Glass** style rather than heavy frosted-glass effects.

### Surfaces

Use dark translucent panels layered over a deep navy background. Panels should feel dimensional through subtle contrast, blur, internal strokes, and soft elevation.

```css
--glass-surface: rgba(21, 45, 60, 0.58);
--glass-surface-strong: rgba(27, 57, 73, 0.76);
--glass-border: rgba(205, 242, 246, 0.18);
--glass-border-strong: rgba(205, 242, 246, 0.30);
--glass-highlight: rgba(255, 255, 255, 0.08);
--glass-shadow: rgba(0, 0, 0, 0.30);
```

### Surface rules

- Use `backdrop-filter: blur(16px to 24px)` only where supported.
- Add a subtle 1px internal border or highlight at the top edge.
- Use corner radii between 16px and 24px for major cards.
- Use 12px to 16px radii for smaller controls.
- Avoid highly visible glass reflections or thick glossy gradients.
- Keep shadows broad, soft, and low-opacity.
- Separate cards using spacing and tonal contrast more than heavy outlines.

### Background

The background should be near-black navy with a subtle radial teal/blue atmospheric glow toward outer edges or behind major modules. The central content area should remain darker and quieter to preserve focus.

Use minimal fine grid lines, coordinate-like patterns, or subtle technical line art only in low-contrast background layers. These should never compete with readable content.

---

## Typography

Use a clean modern sans-serif. Prefer **Satoshi** if available; otherwise use **Inter** or a system sans-serif fallback.

```css
font-family: "Satoshi", "Inter", ui-sans-serif, system-ui, sans-serif;
```

### Type scale

| Role | Size / Line Height | Weight | Use |
|---|---:|---:|---|
| Display | 48–56 / 56–64 | 700 | Major dashboard headlines |
| H1 | 32–40 / 40–48 | 700 | Page title |
| H2 | 24–28 / 32–36 | 600–700 | Section heading |
| H3 | 18–20 / 24–28 | 600 | Card heading |
| Body | 16 / 24 | 400–500 | Standard content |
| Small | 14 / 20 | 400–500 | Secondary card information |
| Caption | 12 / 16 | 500 | Metadata, labels, status |

### Typography rules

- Use sentence case for interface headings and labels.
- Use all caps sparingly for eyebrow labels, date labels, and small system metadata.
- Keep body copy short and direct.
- Use tabular numerals for scores, dates, financial values, metrics, and countdowns.
- Primary numbers should feel intentional and prominent, especially for weather, tasks, progress, and key insights.

---

## Layout and spacing

Use an 8px spacing system.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Layout principles

- Prioritize a clear vertical hierarchy: **What matters now → action window → supporting information → deeper detail.**
- Avoid dense dashboards where every module competes for attention.
- Use 1–2 primary focal cards per screen.
- Prefer concise summary cards that open detailed views.
- Desktop: responsive grid with 12-column behavior.
- Tablet: 8-column layout.
- Mobile: single-column stacking with horizontal scrolling only for compact segmented controls or time-series charts.
- On mobile, make the top “Today” / “Command Center” summary feel like a briefing rather than a dashboard crammed into a small screen.

---

## Core navigation

### Main navigation structure

The primary navigation should be organized around life domains, not app integrations.

Recommended sections:

- **Today**
- **Calendar**
- **Tasks**
- **Fitness**
- **Finances**
- **Family**
- **News & Learning**
- **Games & Events**
- **Sources**
- **Settings**

Use a compact rail or bottom navigation on mobile. Desktop can use a slim left navigation rail with icons and optional labels.

### Navigation behavior

- Active item: teal/cyan icon, soft glass tile or bottom indicator, clear label emphasis.
- Inactive item: muted text and line icon.
- Use badges only for truly actionable counts, not passive metrics.
- The navigation should not visually overpower the primary dashboard.

---

## Core components

### 1. Command briefing card

This is the primary hero module on the Today screen.

Include:

- Date and small contextual label.
- Large headline, such as “What matters today.”
- One concise briefing sentence.
- Three compact insight chips, such as:
  - `3 priorities`
  - `86°F weather`
  - `4/5 sources live`
- Optional context cards for event windows, conflicts, and time-sensitive commitments.

The briefing must always answer:

1. What needs attention?
2. What is next?
3. What should the user do?

### 2. Insight cards

Use cards for high-level summaries, not full dashboards.

Examples:

- Today’s priorities
- Weather
- Upcoming event window
- Fitness readiness
- Account snapshot
- News briefing
- Pokémon GO event status
- Family reminder
- System integration health

Card structure:

- Small eyebrow label or icon
- Clear primary metric or headline
- One supporting line
- One obvious action or deep-link affordance

### 3. Status chips

Use for compact state communication.

Variants:

- Active / Info: cyan or teal
- On track / Success: green
- Attention / Warning: amber
- Offline / Inactive: muted slate
- Error / Urgent: restrained red

Chips should have:

- Small status dot or icon
- Text label
- Subtle dark glass background
- Never rely on color alone for meaning

### 4. Progress rings

Use circular progress only for a meaningful completion or readiness signal.

Examples:

- Source integrations live
- Daily task completion
- Training readiness
- Goal progress
- Budget utilization

Rules:

- Keep rings clean and thin.
- Use no more than two accent colors per ring.
- Include the exact number or percentage in the center.
- Provide a text alternative for accessibility.
- Do not use progress rings as decorative filler.

### 5. Buttons

Primary button:

- Command Teal/Cyan fill
- Light text
- 12–16px corner radius
- Soft glow only on hover/focus
- Use for the single most important action in a section

Secondary button:

- Transparent dark glass background
- Fine mist/steel border
- White or secondary text

Ghost button:

- No visible container by default
- Text or icon with a clear hover state

Button labels should be action-led:

- Create event
- Review priorities
- Start workout
- View briefing
- Open calendar
- Resolve conflict
- Sync source

Avoid generic labels such as “Submit,” “Click here,” or “More.”

### 6. Iconography

Use a consistent 2px rounded line icon system.

Icon categories should include:

- Dashboard grid
- Calendar
- Tasks/check
- Fitness/activity
- Heart/health
- Wallet/finance
- News/document
- Bell/reminders
- Gear/settings
- Search
- Plus/add
- External link/arrow
- Chart/analytics
- Ship wheel / My Command Center brand marker

Avoid mixing outlined icons with filled icons unless a filled treatment explicitly indicates active state.

---

## Motion and interaction

Motion should create orientation, not spectacle.

- Card hover: raise 2–4px, slight border brightening, very subtle increase in surface contrast.
- Button hover: small brightness increase and controlled cyan glow.
- Navigation transition: fast, quiet fade/slide, approximately 160–220ms.
- Progress ring animation: use only on initial load or meaningful status changes.
- Modal and drawer transitions: 220–280ms, smooth easing.
- Respect `prefers-reduced-motion`.

Avoid:

- Bouncing elements
- Constant pulsing
- Excessive animated gradients
- Large parallax effects
- Decorative motion that makes the dashboard feel busy

---

## Accessibility and implementation standards

- Target WCAG AA contrast at minimum.
- Primary text must remain readable over all glass surfaces.
- Do not rely on translucency alone to distinguish interactive elements.
- Provide visible keyboard focus states using teal/cyan outlines or a high-contrast glass border.
- Ensure all icon-only controls have accessible labels.
- Use a minimum 44px tap target on mobile.
- Support reduced transparency and reduced motion settings.
- Do not make essential state dependent only on color.
- Use semantic HTML, proper heading order, and native buttons/links where applicable.

---

## Avoid these design mistakes

- Do not make the product look like a gaming UI, crypto dashboard, military command console, or nautical-themed novelty app.
- Do not overuse the ship wheel logo inside content cards.
- Do not use bright cyan for every icon, label, border, and button.
- Do not make every module glassy, glowing, or elevated at the same intensity.
- Do not cram every data source into the Today view.
- Do not use huge gradients behind readable content.
- Do not use glossy 3D skeuomorphic effects.
- Do not make the dashboard feel like a generic widget gallery.

---

## Product design north star

Every screen should feel like it answers this question:

> “What matters right now, what should I do next, and where do I go to understand more?”

The experience should make the user feel informed and in control, with a calm sense of forward momentum.
