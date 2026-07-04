# Ben HQ Private Bridge

Ben HQ can stay on free public GitHub Pages as long as private data arrives as summaries from a private bridge or a local import. Do not place tokens, OAuth client secrets, passwords, or personal exports in the public repo.

## Option 1: Google Apps Script

Use `tools/ben-hq-google-bridge.gs` as a starter script for personal Gmail, Google Calendar, and Google Drive metadata.

Setup outline:

1. Create a new Google Apps Script in your personal Google account.
2. Paste the contents of `tools/ben-hq-google-bridge.gs`.
3. In Script Properties, add `BEN_HQ_PASSCODE` with a private value.
4. Deploy as a Web App that runs as you.
5. Set access to your account or anyone with the link, depending on what Google allows for your account.
6. Copy the Web App URL into Ben HQ Sources.
7. Enter the passcode in Ben HQ and press Sync now.

The script currently returns event titles, times, recent inbox thread metadata, likely reply-needed subjects, and recent Drive file metadata. It does not read workplace resources, does not read finance accounts, and does not store secrets in GitHub.

## Option 2: iPhone Shortcut Packet

Use `samples/ben-hq-daily-packet.sample.json` as the shape for an iPhone Shortcut. The shortcut can gather text you approve from Notes, Health summaries you choose, Garmin summaries you copy/export, ChatGPT summaries, or manual prompts, then save a JSON file. In Ben HQ, open Sources and use Import packet.

Useful fields:

- `summary`: one plain-English daily brief for the Today hero.
- `calendar.events`: time-boxed personal events.
- `gmail.highlights` and `gmail.needsReply`: subjects or summaries, not full private mail bodies unless you explicitly choose that.
- `health` and `training`: sleep, steps, readiness, last workout, and recommended workout.
- `recommendations`: one or more immediate next actions with a source.

## Safety Rules

- Keep the public GitHub Pages app as UI and local storage only.
- Store bridge URL and passcode only in the browser on your personal devices.
- Prefer summaries and metadata over raw full-content ingestion.
- Keep workplace accounts and files out of scope.
- Direct finance account connections remain skipped.
