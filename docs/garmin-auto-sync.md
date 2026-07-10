# Garmin Auto Sync

Ben HQ uses GarminDB as the zero-dollar Garmin source.

## What Stays Private

- Garmin credentials stay in `.ben-hq-private/garmin/GarminConnectConfig.json`.
- Garmin raw downloads, FIT/JSON files, and SQLite databases stay under `.ben-hq-private/garmin`.
- Personal strength preferences stay in `.ben-hq-private/fitness-profile.json`.
- GitHub Pages only receives the encrypted Ben HQ daily packet.

## Local Flow

1. Install Python 3.11+.
2. Run `tools/garmin-sync.ps1 -Setup`.
3. Fill in `.ben-hq-private/garmin/GarminConnectConfig.json` with Garmin Connect credentials.
4. Run `tools/garmin-sync.ps1 -Latest`.
5. The sync merges the private strength profile into `garmin-summary.json` without exposing the profile publicly.
6. Ben HQ daily automation includes the compact Garmin and strength summary in the encrypted packet.

## Notes

GarminDB uses Garmin Connect rather than the official Garmin Health API. It is practical and free, but it can break if Garmin changes login behavior or requires extra verification.
