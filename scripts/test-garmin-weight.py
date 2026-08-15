"""Unit checks for Garmin weigh-in normalization without a live Garmin session."""

from __future__ import annotations

import importlib.util
import sys
import types
from pathlib import Path


sys.modules.setdefault("garminconnect", types.SimpleNamespace(Garmin=object))
MODULE_PATH = Path(__file__).with_name("fetch-garmin-summary.py")
SPEC = importlib.util.spec_from_file_location("fetch_garmin_summary", MODULE_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


def run() -> None:
    range_response = {
        "dateWeightList": [
            {"calendarDate": "2026-07-01", "weight": 79_000},
            {"calendarDate": "2026-08-10", "weight": 77_900},
        ]
    }
    result = MODULE.latest_weight(range_response)
    assert result == {"weightKg": 77.9, "weightLbs": 171.7, "weightDate": "2026-08-10"}

    nested_response = {
        "dailyWeightSummaries": [{
            "summaryDate": "2026-08-12",
            "latestWeight": {"weightInLbs": 172.4, "weightUnit": "lbs"},
        }]
    }
    nested_result = MODULE.latest_weight(nested_response)
    assert nested_result == {"weightKg": 78.2, "weightLbs": 172.4, "weightDate": "2026-08-12"}

    assert MODULE.latest_weight({"totalAverage": {"weight": 78_000}}) is None
    print("Garmin weight parsing scenarios passed.")


if __name__ == "__main__":
    run()
