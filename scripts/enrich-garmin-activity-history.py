"""Add a privacy-minimized current-year Garmin activity history to a summary."""

from __future__ import annotations

import argparse
import json
from datetime import date, datetime
from pathlib import Path
from typing import Any

from garminconnect import Garmin


def first(*values: Any) -> Any:
    return next((value for value in values if value is not None and value != ""), None)


def activity_date(activity: dict[str, Any]) -> str | None:
    started_at = first(activity.get("startTimeLocal"), activity.get("startTimeGMT"))
    if not started_at:
        return None
    try:
        return datetime.fromisoformat(str(started_at).replace("Z", "+00:00")).date().isoformat()
    except ValueError:
        return None


def activity_type(activity: dict[str, Any]) -> str:
    value = activity.get("activityType")
    if isinstance(value, dict):
        return str(first(value.get("typeKey"), value.get("typeId"), "activity"))
    return str(first(value, "activity"))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--summary", required=True)
    parser.add_argument("--tokenstore", required=True)
    parser.add_argument("--start-date")
    args = parser.parse_args()

    summary_path = Path(args.summary)
    tokenstore = Path(args.tokenstore)
    summary = json.loads(summary_path.read_text(encoding="utf-8-sig"))
    if summary.get("status") != "ready":
        raise ValueError("Garmin summary is not ready")

    today = date.today()
    start_date = date.fromisoformat(args.start_date) if args.start_date else date(today.year, 1, 1)
    if start_date > today:
        raise ValueError("Start date cannot be in the future")

    api = Garmin()
    api.login(str(tokenstore))
    raw_activities = api.get_activities_by_date(start_date.isoformat(), today.isoformat(), sortorder="asc") or []

    activities = []
    seen_ids = set()
    for item in raw_activities:
        if not isinstance(item, dict):
            continue
        current_date = activity_date(item)
        duration = item.get("duration")
        activity_id = first(item.get("activityId"), f"{current_date}:{item.get('activityName')}:{duration}")
        if not current_date or activity_id in seen_ids or not isinstance(duration, (int, float)) or duration <= 0:
            continue
        seen_ids.add(activity_id)
        activities.append({
            "date": current_date,
            "type": activity_type(item),
            "name": str(first(item.get("activityName"), activity_type(item))),
        })

    training = summary.setdefault("training", {})
    training["activities"] = activities
    training["activityHistory"] = {
        "startDate": start_date.isoformat(),
        "endDate": today.isoformat(),
        "activityCount": len(activities),
        "activeDays": len({item["date"] for item in activities}),
    }
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(training["activityHistory"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
