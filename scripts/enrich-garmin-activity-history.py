"""Add a privacy-minimized current-year Garmin activity history to a summary."""

from __future__ import annotations

import argparse
import json
import math
import urllib.parse
import urllib.request
from datetime import date, datetime, timedelta
from pathlib import Path
from statistics import mean, pstdev
from typing import Any

from garminconnect import Garmin


CONFIGURED_MAX_HR = 194.0
FALLBACK_WEATHER_LOCATION = (35.5951, -82.5515)  # Asheville-area context; coordinates are never published.
HRR_ZONE_FRACTIONS = ((0.50, 0.60), (0.60, 0.70), (0.70, 0.80), (0.80, 0.90), (0.90, 1.00))


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


def hrr_boundaries(resting_hr: float, max_hr: float) -> list[dict[str, Any]]:
    reserve = max_hr - resting_hr
    return [
        {
            "zone": index + 1,
            "lowerBpm": round(resting_hr + lower * reserve),
            "upperBpm": round(resting_hr + upper * reserve),
            "lowerHrrPct": round(lower * 100),
            "upperHrrPct": round(upper * 100),
        }
        for index, (lower, upper) in enumerate(HRR_ZONE_FRACTIONS)
    ]


def activity_hr_zones(activity: dict[str, Any], resting_hr: float, max_hr: float) -> dict[str, Any] | None:
    """Normalize Garmin's activity zone fields to seconds and five-zone percentages."""
    raw_zones = [
        max(0.0, numeric(first(activity.get(f"hrTimeInZone_{zone}"), activity.get(f"hrTimeInZone{zone}"))) or 0.0)
        for zone in range(1, 6)
    ]
    raw_total = sum(raw_zones)
    if raw_total <= 0:
        return None

    duration_seconds = numeric(activity.get("duration")) or 0.0
    scale = 1000.0 if duration_seconds > 0 and raw_total > duration_seconds * 20 else 1.0
    seconds = [value / scale for value in raw_zones]
    total_seconds = sum(seconds)
    below_raw = max(0.0, numeric(first(activity.get("hrTimeInZone_0"), activity.get("hrTimeInZone0"))) or 0.0)
    below_seconds = below_raw / scale
    zones = [
        {
            "zone": index + 1,
            "seconds": rounded(value, 1),
            "percent": rounded(value / total_seconds * 100, 1),
        }
        for index, value in enumerate(seconds)
    ]
    return {
        "zones": zones,
        "totalSeconds": rounded(total_seconds, 1),
        "belowZoneSeconds": rounded(below_seconds, 1),
        "activityCoveragePct": rounded((total_seconds + below_seconds) / duration_seconds * 100, 1) if duration_seconds > 0 else None,
        "model": "heart-rate reserve",
        "restingHr": rounded(resting_hr, 1),
        "maxHr": rounded(max_hr, 0),
        "boundaries": hrr_boundaries(resting_hr, max_hr),
        "source": "Garmin activity zone time interpreted with Ben's %HRR model",
    }


def aggregate_hr_zones(activity_details: list[dict[str, Any]], start_date: date, end_date: date, resting_hr: float, max_hr: float) -> dict[str, Any] | None:
    totals = [0.0] * 5
    below_total = 0.0
    activity_count = 0
    for activity in activity_details:
        zone_data = activity.get("hrZones")
        zones = zone_data.get("zones") if isinstance(zone_data, dict) else None
        if not isinstance(zones, list) or len(zones) != 5:
            continue
        values = [numeric(zone.get("seconds")) or 0.0 for zone in zones if isinstance(zone, dict)]
        if len(values) != 5 or sum(values) <= 0:
            continue
        totals = [current + value for current, value in zip(totals, values)]
        below_total += numeric(zone_data.get("belowZoneSeconds")) or 0.0
        activity_count += 1
    total_seconds = sum(totals)
    if total_seconds <= 0:
        return None
    return {
        "startDate": start_date.isoformat(),
        "endDate": end_date.isoformat(),
        "activityCount": activity_count,
        "totalSeconds": rounded(total_seconds, 1),
        "belowZoneSeconds": rounded(below_total, 1),
        "zones": [
            {
                "zone": index + 1,
                "seconds": rounded(value, 1),
                "percent": rounded(value / total_seconds * 100, 1),
            }
            for index, value in enumerate(totals)
        ],
        "model": "heart-rate reserve",
        "restingHr": rounded(resting_hr, 1),
        "maxHr": rounded(max_hr, 0),
        "boundaries": hrr_boundaries(resting_hr, max_hr),
        "source": "Garmin activity zone time interpreted with Ben's %HRR model",
    }


def activity_load(activity: dict[str, Any], resting_hr: float, max_hr: float) -> tuple[float, str]:
    duration_minutes = (numeric(activity.get("duration")) or 0) / 60
    average_hr = numeric(activity.get("averageHR"))
    if duration_minutes <= 0:
        return 0, "none"
    zones = activity_hr_zones(activity, resting_hr, max_hr)
    if zones:
        # A compact TRIMP-style cardiovascular load. Hard minutes cost more, while
        # easy minutes still contribute to fitness rather than disappearing.
        weights = (0.5, 1.0, 2.0, 3.0, 4.0)
        weighted_minutes = sum((numeric(zone.get("seconds")) or 0) / 60 * weights[index] for index, zone in enumerate(zones["zones"]))
        if weighted_minutes > 0:
            return weighted_minutes, "HRR zone-weighted duration"
    if average_hr is not None and max_hr > resting_hr:
        intensity = min(1.0, max(0.0, (average_hr - resting_hr) / (max_hr - resting_hr)))
        return duration_minutes * intensity, "heart-rate reserve"
    aerobic_effect = numeric(activity.get("aerobicTrainingEffect"))
    if aerobic_effect is not None:
        return duration_minutes * min(1.0, max(0.15, aerobic_effect / 5)), "duration + aerobic effect"
    return duration_minutes * 0.35, "duration estimate"


def weather_location(activity: dict[str, Any]) -> tuple[float, float]:
    latitude = first(numeric(activity.get("startLatitude")), numeric(activity.get("latitude")))
    longitude = first(numeric(activity.get("startLongitude")), numeric(activity.get("longitude")))
    if latitude is None or longitude is None or not (-90 <= latitude <= 90) or not (-180 <= longitude <= 180):
        return FALLBACK_WEATHER_LOCATION
    # Most training occurs within one weather region. Collapsing local starts to
    # a single cell keeps refreshes fast and avoids retaining precise locations.
    if 34.5 <= latitude <= 36.8 and -84.5 <= longitude <= -80.5:
        return FALLBACK_WEATHER_LOCATION
    return latitude, longitude


def download_weather(latitude: float, longitude: float, start_date: str, end_date: str, recent: bool) -> dict[str, Any] | None:
    endpoint = "https://api.open-meteo.com/v1/forecast" if recent else "https://archive-api.open-meteo.com/v1/archive"
    query = urllib.parse.urlencode({
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "hourly": "temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation,wind_speed_10m",
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone": "auto",
    })
    try:
        request = urllib.request.Request(f"{endpoint}?{query}", headers={"User-Agent": "Fitness-HQ/2 weather enrichment"})
        with urllib.request.urlopen(request, timeout=25) as response:
            return json.load(response)
    except (OSError, ValueError, json.JSONDecodeError):
        return None


def prefetch_weather(raw_activities: list[dict[str, Any]], start_date: date, end_date: date) -> dict[tuple[str, float, float], dict[str, Any] | None]:
    """Fetch a regional date range once instead of one request per workout."""
    groups: dict[tuple[float, float], dict[str, Any]] = {}
    for activity in raw_activities:
        current_date = activity_date(activity)
        if not current_date:
            continue
        latitude, longitude = weather_location(activity)
        group_key = (round(latitude, 1), round(longitude, 1))
        group = groups.setdefault(group_key, {"latitude": latitude, "longitude": longitude, "dates": set()})
        group["dates"].add(current_date)

    cache: dict[tuple[str, float, float], dict[str, Any] | None] = {}
    for (latitude_key, longitude_key), group in groups.items():
        group_dates = sorted(date.fromisoformat(value) for value in group["dates"])
        group_start = max(start_date, group_dates[0])
        group_end = min(end_date, group_dates[-1])
        recent_start = max(group_start, group_end - timedelta(days=5))
        historical_end = recent_start - timedelta(days=1)
        payloads: list[tuple[date, date, dict[str, Any] | None]] = []
        if group_start <= historical_end:
            payloads.append((group_start, historical_end, download_weather(group["latitude"], group["longitude"], group_start.isoformat(), historical_end.isoformat(), False)))
        if recent_start <= group_end:
            payloads.append((recent_start, group_end, download_weather(group["latitude"], group["longitude"], recent_start.isoformat(), group_end.isoformat(), True)))
        for current_date in group["dates"]:
            parsed = date.fromisoformat(current_date)
            payload = next((item for lower, upper, item in payloads if lower <= parsed <= upper), None)
            cache[(current_date, latitude_key, longitude_key)] = payload
    return cache


def weather_at_activity(activity: dict[str, Any], current_date: str, cache: dict[tuple[str, float, float], dict[str, Any] | None]) -> dict[str, Any] | None:
    started_at = str(first(activity.get("startTimeLocal"), activity.get("startTimeGMT"), f"{current_date}T12:00:00"))
    try:
        target = datetime.fromisoformat(started_at.replace("Z", "+00:00")).replace(tzinfo=None)
    except ValueError:
        target = datetime.fromisoformat(f"{current_date}T12:00:00")
    latitude, longitude = weather_location(activity)
    key = (current_date, round(latitude, 1), round(longitude, 1))
    if key not in cache:
        recent = date.today() - date.fromisoformat(current_date) <= timedelta(days=5)
        cache[key] = download_weather(latitude, longitude, current_date, current_date, recent)
    payload = cache[key]
    hourly = payload.get("hourly") if isinstance(payload, dict) else None
    times = hourly.get("time") if isinstance(hourly, dict) else None
    if not isinstance(times, list) or not times:
        return None
    candidates: list[tuple[float, int]] = []
    for index, value in enumerate(times):
        try:
            candidates.append((abs((datetime.fromisoformat(str(value)) - target).total_seconds()), index))
        except ValueError:
            continue
    if not candidates:
        return None
    index = min(candidates)[1]

    def hourly_value(field: str) -> float | None:
        values = hourly.get(field)
        return numeric(values[index]) if isinstance(values, list) and index < len(values) else None

    temperature = hourly_value("temperature_2m")
    humidity = hourly_value("relative_humidity_2m")
    dew_point = hourly_value("dew_point_2m")
    apparent = hourly_value("apparent_temperature")
    heat_load = "low"
    if (apparent is not None and apparent >= 85) or (dew_point is not None and dew_point >= 70) or (temperature is not None and humidity is not None and temperature >= 80 and humidity >= 70):
        heat_load = "high"
    elif (apparent is not None and apparent >= 75) or (dew_point is not None and dew_point >= 60):
        heat_load = "moderate"
    return {
        "temperatureF": rounded(temperature, 0),
        "apparentTemperatureF": rounded(apparent, 0),
        "relativeHumidityPct": rounded(humidity, 0),
        "dewPointF": rounded(dew_point, 0),
        "precipitationIn": rounded(hourly_value("precipitation"), 2),
        "windSpeedMph": rounded(hourly_value("wind_speed_10m"), 0),
        "heatLoad": heat_load,
        "source": "Open-Meteo hourly conditions for the workout's regional weather cell",
    }


def activity_detail(activity: dict[str, Any], current_date: str, kind: str, resting_hr: float, max_hr: float, weather_cache: dict[tuple[str, float, float], dict[str, Any] | None]) -> dict[str, Any]:
    duration_minutes = (numeric(activity.get("duration")) or 0) / 60
    distance_miles = (numeric(activity.get("distance")) or 0) / 1609.344
    average_speed_mps = numeric(activity.get("averageSpeed"))
    average_pace = (
        1609.344 / average_speed_mps / 60
        if average_speed_mps is not None and average_speed_mps > 0
        else duration_minutes / distance_miles
        if duration_minutes > 0 and distance_miles > 0
        else None
    )
    cadence = first(
        numeric(activity.get("averageRunningCadenceInStepsPerMinute")),
        numeric(activity.get("averageBikingCadenceInRevPerMinute")),
        numeric(activity.get("averageCadence")),
    )
    elevation_meters = first(numeric(activity.get("elevationGain")), numeric(activity.get("totalElevationGain")))
    detail = {
        "activityId": str(first(activity.get("activityId"), f"{current_date}:{activity.get('activityName')}:{activity.get('duration')}")),
        "date": current_date,
        "startTimeLocal": first(activity.get("startTimeLocal"), activity.get("startTimeGMT")),
        "type": kind,
        "name": str(first(activity.get("activityName"), kind)),
        "durationMinutes": rounded(duration_minutes),
        "distanceMiles": rounded(distance_miles, 2),
        "averageSpeedMps": rounded(average_speed_mps, 3),
        "averagePaceMinutesPerMile": rounded(average_pace, 2),
        "averageHr": rounded(numeric(activity.get("averageHR")), 0),
        "maxHr": rounded(first(numeric(activity.get("maxHR")), numeric(activity.get("maxHr")), numeric(activity.get("maximumHR"))), 0),
        "calories": rounded(numeric(activity.get("calories")), 0),
        "elevationGainFeet": rounded(elevation_meters * 3.28084, 0) if elevation_meters is not None else None,
        "averageCadence": rounded(cadence, 0),
        "aerobicEffect": rounded(numeric(activity.get("aerobicTrainingEffect")), 1),
        "anaerobicEffect": rounded(numeric(activity.get("anaerobicTrainingEffect")), 1),
        "vo2Max": rounded(numeric(activity.get("vO2MaxValue")), 0),
    }
    hr_zones = activity_hr_zones(activity, resting_hr, max_hr)
    if hr_zones:
        detail["hrZones"] = hr_zones
    weather = weather_at_activity(activity, current_date, weather_cache)
    if weather:
        detail["weather"] = weather
    return detail


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
    observed_peak_hr = max((value for value in observed_max_values if value is not None), default=CONFIGURED_MAX_HR)
    max_hr = CONFIGURED_MAX_HR

    activities = []
    analysis_activities = []
    activity_details = []
    seen_ids = set()
    weather_cache = prefetch_weather(raw_activities, start_date, today)
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
        load, load_method = activity_load(item, resting_hr, max_hr)
        activities.append({
            "date": current_date,
            "type": kind,
            "name": str(first(item.get("activityName"), kind)),
        })
        activity_details.append(activity_detail(item, current_date, kind, resting_hr, max_hr, weather_cache))
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
            "elevationGainFeet": (first(numeric(item.get("elevationGain")), numeric(item.get("totalElevationGain"))) or 0) * 3.28084,
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
    last_7_start = today - timedelta(days=6)
    recent_7_activities = [item for item in analysis_activities if date.fromisoformat(item["date"]) >= last_7_start]
    recent_7_runs = [item for item in recent_7_activities if item["type"] == "running"]
    recent_7_strength = [item for item in recent_7_activities if "strength" in item["type"] or "training" in item["type"]]
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
        "loadMethod": "Cardiovascular load weights minutes in Ben's %HRR zones; average HR, aerobic effect, and duration provide fallbacks when zone time is missing.",
        "references": {
            "restingHr": rounded(resting_hr, 1),
            "configuredMaxHr": rounded(max_hr, 0),
            "observedMaxHr": rounded(max_hr, 0),
            "observedPeakHr": rounded(observed_peak_hr, 0),
            "hrZoneModel": "heart-rate reserve",
            "hrSensor": "Garmin Forerunner 245 wrist optical",
            "hrCaveat": "Short spikes and rapid intensity changes can be noisy; trends and zone duration carry more weight than a single peak.",
            "hrrBoundaries": hrr_boundaries(resting_hr, max_hr),
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
            "cardioLoad7Day": rounded(sum(item["load"] for item in recent_7_activities)),
            "runMiles7Day": rounded(sum(item["distanceMiles"] for item in recent_7_runs), 1),
            "runVerticalFeet7Day": rounded(sum(item["elevationGainFeet"] for item in recent_7_runs), 0),
            "strengthMinutes7Day": rounded(sum(item["durationMinutes"] for item in recent_7_strength), 0),
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
    if activity_details:
        latest_activity = max(activity_details, key=lambda item: str(first(item.get("startTimeLocal"), item.get("date"), "")))
        training["lastWorkout"] = latest_activity["name"]
        training["lastWorkoutDetail"] = latest_activity
    training["activityHistory"] = {
        "startDate": start_date.isoformat(),
        "endDate": today.isoformat(),
        "activityCount": len(activities),
        "activeDays": len({item["date"] for item in activities}),
    }
    training["activityDetails"] = activity_details
    training["hrZonesYtd"] = aggregate_hr_zones(activity_details, start_date, today, resting_hr, max_hr)
    training["analytics"] = analytics
    summary_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps({
        **training["activityHistory"],
        "weatherEnrichedActivities": sum(1 for item in activity_details if item.get("weather")),
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
