"""Focused tests for Fitness HQ's HRR and load calculations."""

from __future__ import annotations

import importlib.util
import sys
import types
from pathlib import Path


sys.modules.setdefault("garminconnect", types.SimpleNamespace(Garmin=object))
module_path = Path(__file__).with_name("enrich-garmin-activity-history.py")
spec = importlib.util.spec_from_file_location("training_enrichment", module_path)
module = importlib.util.module_from_spec(spec)
assert spec and spec.loader
spec.loader.exec_module(module)


def test_hrr_boundaries() -> None:
    boundaries = module.hrr_boundaries(50, 194)
    assert boundaries[0]["lowerBpm"] == 122
    assert boundaries[1]["lowerBpm"] == 136
    assert boundaries[4]["upperBpm"] == 194


def test_zone_weighted_load() -> None:
    activity = {
        "duration": 1800,
        "averageHR": 150,
        "hrTimeInZone_1": 600,
        "hrTimeInZone_2": 600,
        "hrTimeInZone_3": 600,
        "hrTimeInZone_4": 0,
        "hrTimeInZone_5": 0,
    }
    load, method = module.activity_load(activity, 50, 194)
    assert method == "HRR zone-weighted duration"
    assert round(load, 1) == 35.0


if __name__ == "__main__":
    test_hrr_boundaries()
    test_zone_weighted_load()
    print("Training enrichment scenarios passed.")
