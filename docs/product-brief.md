# Ben HQ Product Brief

## Purpose

Ben HQ is a private personal daily command center. It should reduce recurring decisions, surface useful next actions, and make capture/review easier without becoming a maintenance-heavy system.

## Daily Questions

- What matters today?
- What should I do next?
- What workout fits today?
- What is coming up that needs preparation?
- What did I capture that needs processing?
- What recommendation is actually useful right now?

## Version One Modules

- Today dashboard
- At-a-glance daily briefing with useful details visible before navigating into modules
- Live weather signal
- Live Pokemon GO public data pulse
- Live Lichess daily puzzle signal
- Quick capture
- Tasks inbox
- Calendar preview
- Weekly review
- Training hub
- Workout cards should show prescriptions and fallbacks without requiring detail-page navigation.
- Pokemon GO planner
- Chess improvement companion
- Learning queue
- Prompt library
- Personal knowledge library
- Settings and source status center

## Living Knowledge Vault Direction

Ben HQ should evolve into a living personal knowledge vault: a system that can absorb personal context, organize it, and surface useful next actions before Ben has to go looking.

Near-term product ideas:

- Public, account-free adapters first, starting with Open-Meteo weather for daily planning.
- Public no-secret adapters for PoGoAPI and Lichess where browser CORS allows.
- Manual private-source intake that keeps pasted summaries in local review before promotion.
- Local text, Markdown, and JSON imports with source labels.
- Private daily packet import and bridge sync for Gmail, Calendar, Drive, Notes, health/training, and recommendations.
- Browser-only bridge settings so the public app can stay free on GitHub Pages without committing secrets.
- Local browser export/import/reset as the first private-device memory control.
- Personal context cards that can be edited, archived, or promoted into durable memory.
- A review queue for new imported knowledge before it influences recommendations.
- Module-specific knowledge, such as training history, chess learning notes, Pokemon GO priorities, family planning preferences, and personal finance guardrails.
- Recommendation explanations that cite the source context used.

Future integration ideas:

- Hourly weather windows for training, errands, and family plans.
- ChatGPT export/import or selected conversation summaries.
- Personal email read-only triage with explicit account permission.
- Calendar read integration for schedule-aware recommendations.
- Google Drive file selection for personal docs, exports, PDFs, and notes.
- Apple Notes imports through export/share workflow, iPhone Shortcuts, or a future iCloud bridge.
- Garmin and Apple Health summaries for training, sleep, recovery, and consistency signals through daily packets.
- Lichess puzzle imports for real tactics and missed-pattern review.
- Pokemon GO event imports from official event pages, public calendars, or vetted community calendars.
- App adapters for tasks, notes, learning queues, and selected health or fitness summaries.
- Background refresh jobs that show freshness, source, and confidence.

Guardrails:

- Keep workplace resources out of scope.
- Prefer read-only integrations first.
- Require approval before writing to external systems.
- Do not let imported context silently become permanent memory without review.
- Make it easy to delete, export, and inspect stored personal context.
- Skip direct finance account connections for now.

## Personal-Only Constraint

The app should not connect workplace systems or include work-specific resources. It can include general personal productivity and personal learning concepts, but no workplace data or accounts.

## Success Criteria

- Opens naturally most days.
- Makes the next action obvious.
- Helps protect training consistency.
- Prevents missed personal preparation tasks.
- Makes saved prompts and notes reusable.
- Shows data freshness for anything imported later.
- Feels good on both desktop and mobile, with mobile treated as a daily-use surface rather than an afterthought.
