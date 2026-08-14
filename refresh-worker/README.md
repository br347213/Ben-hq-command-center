# Garmin refresh trigger

This small Cloudflare Worker accepts a signed refresh request from Fitness HQ and starts the private GitHub Actions Garmin workflow. Garmin credentials, tokens, and the dashboard encryption key are stored only as encrypted platform secrets.

Required Worker secrets:

- `REFRESH_SHARED_SECRET`
- `GITHUB_DISPATCH_TOKEN`

Required GitHub Actions secrets:

- `BEN_HQ_SYNC_KEY`
- `GARMIN_USERNAME`
- `GARMIN_PASSWORD`
- `GARMIN_TOKENSTORE_B64`

The Worker has no paid services or OpenAI API dependency. The free Workers allowance is more than sufficient for a personal manual-refresh button.
