# Garmin Auto Sync

Ben HQ uses GarminDB as the zero-dollar Garmin source.

## What Stays Private

- Garmin credentials stay in `.ben-hq-private/garmin/GarminConnectConfig.json`.
- Garmin raw downloads, FIT/JSON files, and SQLite databases stay under `.ben-hq-private/garmin`.
- GitHub Pages only receives the encrypted Ben HQ daily packet.

## Local Flow

1. Install Python 3.11+.
2. Run `tools/garmin-sync.ps1 -Setup`.
3. Fill in `.ben-hq-private/garmin/GarminConnectConfig.json` with Garmin Connect credentials.
4. Run `tools/garmin-sync.ps1 -Latest`.
5. Ben HQ daily automation reads `.ben-hq-private/garmin/garmin-summary.json` and includes a small training summary in the encrypted packet.

## Notes

GarminDB uses Garmin Connect rather than the official Garmin Health API. It is practical and free, but it can break if Garmin changes login behavior or requires extra verification.
