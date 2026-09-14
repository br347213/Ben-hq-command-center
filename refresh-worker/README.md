# Garmin refresh trigger

This Cloudflare Worker accepts signed requests from Fitness HQ. `/refresh` starts the private GitHub Actions Garmin workflow; `/analyze` runs a fresh, structured coaching analysis with the Workers AI binding. Garmin credentials, tokens, and the dashboard encryption key are stored only as encrypted platform secrets.

Required Worker secrets:

- `REFRESH_SHARED_SECRET`
- `GITHUB_DISPATCH_TOKEN`

Required GitHub Actions secrets:

- `BEN_HQ_SYNC_KEY`
- `GARMIN_USERNAME`
- `GARMIN_PASSWORD`
- `GARMIN_TOKENSTORE_B64`

The Worker has no OpenAI API dependency. Coaching inference uses the account's Workers AI daily allocation and returns an explicit unavailable state when inference cannot run.
