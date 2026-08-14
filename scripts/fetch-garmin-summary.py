"""Fetch the small Garmin summary used by the encrypted Fitness HQ packet."""

from __future__ import annotations

import argparse
import json
import os
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean
from typing import Any

from garminconnect import Garmin


def nested(data: Any, *path: str, default: Any = None) -> Any:
    value = data
    for key in path:
        if not isinstance(value, dict):
            return default
        value = value.get(key)
    return default if value is None else value


def first(*values: Any) -> Any:
    return next((value for value in values if value is not None and value != ""), None)


def rounded_average(values: list[Any]) -> float | None:
    clean = [float(value) for value in values if isinstance(value, (int, float))]
    return round(mean(clean), 1) if clean else None


def miles(meters: Any) -> float | None:
    return round(float(meters) / 1609.344, 2) if isinstance(meters, (int, float)) else None


def hours(seconds: Any) -> float | None:
    return round(float(seconds) / 3600, 2) if isinstance(seconds, (int, float)) else None


def status_payload(status: str, note: str) -> dict[str, Any]:
    return {
        "source": "Garmin Connect",
        "status": status,
        "generatedAt": datetime.now().astimezone().isoformat(),
        "readinessNote": note,
        "health": {},
        "training": {},
    }


def connect(tokenstore: Path) -> Garmin:
    token_file = tokenstore / "garmin_tokens.json"
    if token_file.exists():
        try:
            api = Garmin()
            api.login(str(tokenstore))
            return api
        except Exception:
            pass

    username = os.environ.get("GARMIN_USERNAME", "").strip()
    password = os.environ.get("GARMIN_PASSWORD", "")
    if not username or not password:
        raise RuntimeError("Garmin credentials are unavailable and the saved session could not be used")

    api = Garmin(username, password, return_on_mfa=True)
    mfa_status, _ = api.login(str(tokenstore))
    if mfa_status:
        raise RuntimeError("Garmin requires MFA confirmation")
    api.client.dump(str(tokenstore))
    api = Garmin()
    api.login(str(tokenstore))
    return api


def parse_start(activity: dict[str, Any]) -> datetime | None:
    value = first(activity.get("startTimeLocal"), activity.get("startTimeGMT"))
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).replace(tzinfo=None)
    except (TypeError, ValueError):
        return None


def is_run(activity: dict[str, Any]) -> bool:
    kind = str(nested(activity, "activityType", "typeKey", default="")).lower()
    return "running" in kind or kind in {"run", "trail_run", "treadmill_running"}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--summary", required=True)
    parser.add_argument("--tokenstore", required=True)
    args = parser.parse_args()

    summary_path = Path(args.summary)
    tokenstore = Path(args.tokenstore)
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    tokenstore.mkdir(parents=True, exist_ok=True)

    try:
        api = connect(tokenstore)
    except Exception as exc:
        note = "Garmin needs a one-time sign-in update." if "MFA" in str(exc) else f"Garmin authentication failed: {type(exc).__name__}"
        summary_path.write_text(json.dumps(status_payload("auth_failed", note), indent=2), encoding="utf8")
        raise

    today = date.today()
    recent_days: list[dict[str, Any]] = []
    for offset in range(14):
        current = (today - timedelta(days=offset)).isoformat()
        try:
            recent_days.append({
                "date": current,
                "stats": api.get_stats(current) or {},
                "sleep": api.get_sleep_data(current) or {},
                "hrv": api.get_hrv_data(current) or {},
            })
        except Exception:
            continue
    if not recent_days:
        summary_path.write_text(json.dumps(status_payload("no_data", "Garmin returned no recent health records."), indent=2), encoding="utf8")
        return 1

    latest = recent_days[0]
    stats = latest["stats"]
    sleep = latest["sleep"]
    hrv = latest["hrv"]
    sleep_seconds = first(nested(sleep, "dailySleepDTO", "sleepTimeSeconds"), nested(sleep, "dailySleepDTO", "sleepTimeInSeconds"))
    baseline_days = recent_days[1:8] or recent_days[:7]
    sleep_values = [hours(first(nested(day["sleep"], "dailySleepDTO", "sleepTimeSeconds"), nested(day["sleep"], "dailySleepDTO", "sleepTimeInSeconds"))) for day in baseline_days]
    hrv_values = [nested(day["hrv"], "hrvSummary", "lastNightAvg") for day in baseline_days]
    resting_values = [first(day["stats"].get("restingHeartRate"), day["stats"].get("minHeartRate")) for day in baseline_days]

    activities = api.get_activities(0, 50) or []
    week_start = datetime.combine(today - timedelta(days=6), datetime.min.time())
    prior_start = datetime.combine(today - timedelta(days=13), datetime.min.time())
    week_runs: list[dict[str, Any]] = []
    prior_runs: list[dict[str, Any]] = []
    for activity in activities:
        started = parse_start(activity)
        if started is None or not is_run(activity):
            continue
        if started >= week_start:
            week_runs.append(activity)
        elif started >= prior_start:
            prior_runs.append(activity)

    current_distance = round(sum(miles(item.get("distance")) or 0 for item in week_runs), 2)
    prior_distance = round(sum(miles(item.get("distance")) or 0 for item in prior_runs), 2)
    current_duration = round(sum(hours(item.get("duration")) or 0 for item in week_runs), 2)
    prior_duration = round(sum(hours(item.get("duration")) or 0 for item in prior_runs), 2)
    latest_activity = activities[0] if activities else {}
    activity_type = nested(latest_activity, "activityType", "typeKey", default="")

    payload = {
        "source": "Garmin Connect",
        "status": "ready",
        "generatedAt": datetime.now().astimezone().isoformat(),
        "health": {
            "date": latest["date"],
            "sleepHours": hours(sleep_seconds),
            "sleepScore": first(nested(sleep, "dailySleepDTO", "sleepScores", "overall", "value"), nested(sleep, "sleepScores", "overall", "value")),
            "hrv": first(nested(hrv, "hrvSummary", "lastNightAvg"), nested(hrv, "hrvSummary", "weeklyAvg")),
            "restingHr": first(stats.get("restingHeartRate"), stats.get("minHeartRate")),
            "steps": first(stats.get("totalSteps"), stats.get("steps")),
            "stress": first(stats.get("averageStressLevel"), stats.get("avgStressLevel")),
            "bodyBattery": first(stats.get("bodyBatteryHighestValue"), stats.get("bodyBatteryMostRecentValue")),
            "baselines": {
                "sleep7Day": rounded_average(sleep_values),
                "hrv7Day": rounded_average(hrv_values),
                "restingHr7Day": rounded_average(resting_values),
            },
        },
        "training": {
            "lastWorkout": first(latest_activity.get("activityName"), activity_type),
            "lastWorkoutDetail": {
                "type": activity_type,
                "startTimeLocal": first(latest_activity.get("startTimeLocal"), latest_activity.get("startTimeGMT")),
                "distanceMiles": miles(latest_activity.get("distance")),
                "durationMinutes": round(float(latest_activity.get("duration")) / 60, 1) if isinstance(latest_activity.get("duration"), (int, float)) else None,
                "averageHr": latest_activity.get("averageHR"),
                "maxHr": first(latest_activity.get("maxHR"), latest_activity.get("maxHr"), latest_activity.get("maximumHR")),
                "averageSpeedMps": latest_activity.get("averageSpeed"),
                "aerobicEffect": latest_activity.get("aerobicTrainingEffect"),
            },
            "weeklyLoad": {
                "activities": len(week_runs),
                "distanceMiles": current_distance,
                "durationHours": current_duration,
                "previousActivities": len(prior_runs),
                "previousDistanceMiles": prior_distance,
                "previousDurationHours": prior_duration,
                "distanceChangePct": round(((current_distance - prior_distance) / prior_distance) * 100, 1) if prior_distance else None,
                "durationChangePct": round(((current_duration - prior_duration) / prior_duration) * 100, 1) if prior_duration else None,
            },
        },
    }
    summary_path.write_text(json.dumps(payload, indent=2), encoding="utf8")
    print(json.dumps({"generatedAt": payload["generatedAt"], "lastWorkout": payload["training"]["lastWorkout"]}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
