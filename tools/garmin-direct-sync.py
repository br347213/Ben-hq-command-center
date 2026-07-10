"""Fetch a compact personal Garmin summary without exposing raw account data."""

from __future__ import annotations

import argparse
import json
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


def rounded_average(values: list[float]) -> float | None:
    clean = [float(value) for value in values if isinstance(value, (int, float))]
    return round(mean(clean), 1) if clean else None


def miles(meters: Any) -> float | None:
    return round(float(meters) / 1609.344, 2) if isinstance(meters, (int, float)) else None


def hours(seconds: Any) -> float | None:
    return round(float(seconds) / 3600, 2) if isinstance(seconds, (int, float)) else None


def write_status(path: Path, status: str, note: str) -> None:
    payload = {
        "source": "Garmin Connect",
        "status": status,
        "generatedAt": datetime.now().astimezone().isoformat(),
        "readiness": "Unknown",
        "readinessNote": note,
        "health": {},
        "training": {},
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def load_credentials(config_path: Path) -> tuple[str, str]:
    config = json.loads(config_path.read_text(encoding="utf-8-sig"))
    credentials = config.get("credentials", {})
    username = first(credentials.get("user"), config.get("username"))
    password = first(credentials.get("password"), config.get("password"))
    if not username or not password or str(username).startswith("YOUR_"):
        raise ValueError("Garmin credentials are not populated")
    return str(username), str(password)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--tokenstore", required=True)
    args = parser.parse_args()

    config_path = Path(args.config)
    summary_path = Path(args.summary)
    tokenstore = Path(args.tokenstore)
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    tokenstore.mkdir(parents=True, exist_ok=True)

    try:
        username, password = load_credentials(config_path)
        api = Garmin(username, password, return_on_mfa=True)
        mfa_status, _ = api.login(str(tokenstore))
        if mfa_status:
            write_status(summary_path, "mfa_required", "Garmin requires a one-time MFA confirmation before automatic sync can begin.")
            return 2
        # return_on_mfa exits before garminconnect persists tokens or loads the
        # user profile, even when no MFA challenge is present. Persist the clean
        # session, then reopen it through the normal token path.
        api.client.dump(str(tokenstore))
        api = Garmin()
        api.login(str(tokenstore))
    except Exception as exc:
        message = str(exc).lower()
        status = "rate_limited" if "429" in message or "rate limit" in message else "auth_failed"
        note = (
            "Garmin temporarily rate-limited authentication. The next scheduled sync will retry after the cooldown."
            if status == "rate_limited"
            else f"Garmin authentication failed: {type(exc).__name__}"
        )
        write_status(summary_path, status, note)
        return 1

    today = date.today()
    recent_days: list[dict[str, Any]] = []
    for offset in range(14):
        current = (today - timedelta(days=offset)).isoformat()
        try:
            stats = api.get_stats(current) or {}
            sleep = api.get_sleep_data(current) or {}
            hrv = api.get_hrv_data(current) or {}
        except Exception:
            continue
        recent_days.append({"date": current, "stats": stats, "sleep": sleep, "hrv": hrv})

    if not recent_days:
        write_status(summary_path, "no_data", "Garmin authenticated, but no recent health records were returned.")
        return 1

    latest = recent_days[0]
    latest_stats = latest["stats"]
    latest_sleep = latest["sleep"]
    latest_hrv = latest["hrv"]

    sleep_seconds = first(
        nested(latest_sleep, "dailySleepDTO", "sleepTimeSeconds"),
        nested(latest_sleep, "dailySleepDTO", "sleepTimeInSeconds"),
    )
    sleep_score = first(
        nested(latest_sleep, "dailySleepDTO", "sleepScores", "overall", "value"),
        nested(latest_sleep, "sleepScores", "overall", "value"),
    )
    hrv_value = first(
        nested(latest_hrv, "hrvSummary", "lastNightAvg"),
        nested(latest_hrv, "hrvSummary", "weeklyAvg"),
    )
    resting_hr = first(latest_stats.get("restingHeartRate"), latest_stats.get("minHeartRate"))
    steps = first(latest_stats.get("totalSteps"), latest_stats.get("steps"))
    stress = first(latest_stats.get("averageStressLevel"), latest_stats.get("avgStressLevel"))
    body_battery = first(latest_stats.get("bodyBatteryHighestValue"), latest_stats.get("bodyBatteryMostRecentValue"))

    baseline_days = recent_days[1:8] or recent_days[:7]
    sleep_values = [
        hours(first(nested(day["sleep"], "dailySleepDTO", "sleepTimeSeconds"), nested(day["sleep"], "dailySleepDTO", "sleepTimeInSeconds")))
        for day in baseline_days
    ]
    hrv_values = [nested(day["hrv"], "hrvSummary", "lastNightAvg") for day in baseline_days]
    resting_values = [first(day["stats"].get("restingHeartRate"), day["stats"].get("minHeartRate")) for day in baseline_days]

    try:
        activities = api.get_activities(0, 20) or []
    except Exception:
        activities = []
    week_start = datetime.combine(today - timedelta(days=6), datetime.min.time())
    previous_week_start = datetime.combine(today - timedelta(days=13), datetime.min.time())
    week_activities = []
    previous_week_activities = []
    for activity in activities:
        start_text = first(activity.get("startTimeLocal"), activity.get("startTimeGMT"))
        try:
            start_time = datetime.fromisoformat(str(start_text).replace("Z", "+00:00")).replace(tzinfo=None)
        except Exception:
            continue
        if start_time >= week_start:
            week_activities.append(activity)
        elif start_time >= previous_week_start:
            previous_week_activities.append(activity)

    total_distance = round(sum(miles(activity.get("distance")) or 0 for activity in week_activities), 2)
    total_duration = round(sum(hours(activity.get("duration")) or 0 for activity in week_activities), 2)
    previous_distance = round(sum(miles(activity.get("distance")) or 0 for activity in previous_week_activities), 2)
    previous_duration = round(sum(hours(activity.get("duration")) or 0 for activity in previous_week_activities), 2)
    latest_activity = activities[0] if activities else {}
    activity_type = nested(latest_activity, "activityType", "typeKey", default="")

    payload = {
        "source": "Garmin Connect",
        "status": "ready",
        "generatedAt": datetime.now().astimezone().isoformat(),
        "health": {
            "date": latest["date"],
            "sleepHours": hours(sleep_seconds),
            "sleepScore": sleep_score,
            "hrv": hrv_value,
            "restingHr": resting_hr,
            "steps": steps,
            "stress": stress,
            "bodyBattery": body_battery,
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
                "startedAt": first(latest_activity.get("startTimeLocal"), latest_activity.get("startTimeGMT")),
                "distanceMiles": miles(latest_activity.get("distance")),
                "durationHours": hours(latest_activity.get("duration")),
                "averageHr": latest_activity.get("averageHR"),
                "aerobicEffect": latest_activity.get("aerobicTrainingEffect"),
            },
            "weeklyLoad": {
                "activities": len(week_activities),
                "distanceMiles": total_distance,
                "durationHours": total_duration,
                "previousActivities": len(previous_week_activities),
                "previousDistanceMiles": previous_distance,
                "previousDurationHours": previous_duration,
                "distanceChangePct": round(((total_distance - previous_distance) / previous_distance) * 100, 1) if previous_distance else None,
                "durationChangePct": round(((total_duration - previous_duration) / previous_duration) * 100, 1) if previous_duration else None,
            },
        },
    }
    summary_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote verified Garmin summary to {summary_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
