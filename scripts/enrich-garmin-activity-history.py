"""Add a privacy-minimized current-year Garmin activity history to a summary."""

from __future__ import annotations

import argparse
import json
import math
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean, pstdev
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


def numeric(value: Any) -> float | None:
    return float(value) if isinstance(value, (int, float)) else None


def rounded(value: float | None, digits: int = 1) -> float | None:
    return round(value, digits) if isinstance(value, (int, float)) and math.isfinite(value) else None


def activity_load(activity: dict[str, Any], resting_hr: float, max_hr: float) -> tuple[float, str]:
    duration_minutes = (numeric(activity.get("duration")) or 0) / 60
    average_hr = numeric(activity.get("averageHR"))
    if duration_minutes <= 0:
        return 0, "none"
    if average_hr is not None and max_hr > resting_hr:
        intensity = min(1.0, max(0.0, (average_hr - resting_hr) / (max_hr - resting_hr)))
        return duration_minutes * intensity, "heart-rate reserve"
    aerobic_effect = numeric(activity.get("aerobicTrainingEffect"))
    if aerobic_effect is not None:
        return duration_minutes * min(1.0, max(0.15, aerobic_effect / 5)), "duration + aerobic effect"
    return duration_minutes * 0.35, "duration estimate"


def ewma_series(values: list[float], time_constant: int) -> list[float]:
    alpha = 1 - math.exp(-1 / time_constant)
    output: list[float] = []
    current = 0.0
    for value in values:
        current += alpha * (value - current)
        output.append(current)
    return output


def trend_percent(current: float | None, previous: float | None) -> float | None:
    if current is None or previous is None or previous == 0:
        return None
    return rounded(((current - previous) / previous) * 100, 1)


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

    baseline = summary.get("health", {}).get("baselines", {})
    resting_hr = numeric(first(baseline.get("restingHr7Day"), summary.get("health", {}).get("restingHr"))) or 50.0
    observed_max_values = [numeric(item.get("maxHR")) for item in raw_activities if isinstance(item, dict)]
    observed_max_hr = max((value for value in observed_max_values if value is not None), default=resting_hr + 100)

    activities = []
    analysis_activities = []
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
        kind = activity_type(item)
        load, load_method = activity_load(item, resting_hr, observed_max_hr)
        activities.append({
            "date": current_date,
            "type": kind,
            "name": str(first(item.get("activityName"), kind)),
        })
        analysis_activities.append({
            "date": current_date,
            "type": kind,
            "load": load,
            "loadMethod": load_method,
            "durationMinutes": (numeric(duration) or 0) / 60,
            "distanceMiles": (numeric(item.get("distance")) or 0) / 1609.344,
            "averageHr": numeric(item.get("averageHR")),
            "aerobicEffect": numeric(item.get("aerobicTrainingEffect")),
            "vo2Max": numeric(item.get("vO2MaxValue")),
        })

    daily_dates = []
    cursor = start_date
    while cursor <= today:
        daily_dates.append(cursor.isoformat())
        cursor += timedelta(days=1)
    daily_loads = {key: 0.0 for key in daily_dates}
    for item in analysis_activities:
        if item["date"] in daily_loads:
            daily_loads[item["date"]] += item["load"]
    loads = [daily_loads[key] for key in daily_dates]
    fitness_series = ewma_series(loads, 42)
    fatigue_series = ewma_series(loads, 7)
    form_series = [fitness - fatigue for fitness, fatigue in zip(fitness_series, fatigue_series)]

    last_7 = loads[-7:]
    last_28_start = today - timedelta(days=27)
    prior_28_start = today - timedelta(days=55)
    recent_runs = [item for item in analysis_activities if item["type"] == "running" and date.fromisoformat(item["date"]) >= last_28_start]
    prior_runs = [item for item in analysis_activities if item["type"] == "running" and prior_28_start <= date.fromisoformat(item["date"]) < last_28_start]

    def average_metric(items: list[dict[str, Any]], key: str) -> float | None:
        values = [numeric(item.get(key)) for item in items]
        clean = [value for value in values if value is not None]
        return mean(clean) if clean else None

    def running_efficiency(items: list[dict[str, Any]]) -> float | None:
        values = []
        for item in items:
            duration_hours = item["durationMinutes"] / 60
            if duration_hours > 0 and item["distanceMiles"] > 0 and item["averageHr"]:
                values.append((item["distanceMiles"] / duration_hours) / item["averageHr"] * 100)
        return mean(values) if values else None

    monotony = mean(last_7) / pstdev(last_7) if len(last_7) > 1 and pstdev(last_7) > 0 else (5.0 if sum(last_7) else 0.0)
    seven_day_load = sum(last_7)
    fitness = fitness_series[-1] if fitness_series else 0.0
    fatigue = fatigue_series[-1] if fatigue_series else 0.0
    fitness_7_days_ago = fitness_series[-8] if len(fitness_series) >= 8 else 0.0
    load_balance = fatigue / fitness if fitness > 0 else None
    current_vo2 = average_metric(recent_runs, "vo2Max")
    previous_vo2 = average_metric(prior_runs, "vo2Max")
    current_efficiency = running_efficiency(recent_runs)
    previous_efficiency = running_efficiency(prior_runs)
    chart_start = max(0, len(daily_dates) - 90)

    analytics = {
        "generatedAt": datetime.now().astimezone().isoformat(),
        "model": "fitness-fatigue impulse response",
        "loadUnit": "estimated load points",
        "loadMethod": "Duration multiplied by heart-rate-reserve intensity; duration and Garmin aerobic effect are used when heart rate is missing.",
        "references": {
            "restingHr": rounded(resting_hr, 1),
            "observedMaxHr": rounded(observed_max_hr, 1),
            "fitnessTimeConstantDays": 42,
            "fatigueTimeConstantDays": 7,
        },
        "current": {
            "fitness": rounded(fitness),
            "fatigue": rounded(fatigue),
            "form": rounded(form_series[-1] if form_series else 0),
            "ramp7Day": rounded(fitness - fitness_7_days_ago),
            "loadBalance": rounded(load_balance, 2),
            "sevenDayLoad": rounded(seven_day_load),
            "monotony7Day": rounded(monotony, 2),
            "strain7Day": rounded(seven_day_load * monotony),
            "activeDays28": len({item["date"] for item in analysis_activities if date.fromisoformat(item["date"]) >= last_28_start}),
            "activities28": len([item for item in analysis_activities if date.fromisoformat(item["date"]) >= last_28_start]),
            "vo2Max28": rounded(current_vo2),
            "vo2MaxChangePct": trend_percent(current_vo2, previous_vo2),
            "runningEfficiency28": rounded(current_efficiency, 2),
            "runningEfficiencyChangePct": trend_percent(current_efficiency, previous_efficiency),
        },
        "series": [
            {
                "date": daily_dates[index],
                "load": rounded(loads[index]),
                "fitness": rounded(fitness_series[index]),
                "fatigue": rounded(fatigue_series[index]),
                "form": rounded(form_series[index]),
            }
            for index in range(chart_start, len(daily_dates))
        ],
    }

    training = summary.setdefault("training", {})
    training["activities"] = activities
    training["activityHistory"] = {
        "startDate": start_date.isoformat(),
        "endDate": today.isoformat(),
        "activityCount": len(activities),
        "activeDays": len({item["date"] for item in activities}),
    }
    training["analytics"] = analytics
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(training["activityHistory"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
