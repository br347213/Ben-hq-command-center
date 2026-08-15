import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8")
  .replace(/\ninit\(\);\s*$/, "\nglobalThis.__coachingTest = { buildCoachingContext, buildWorkoutAnalysis };\n");
for (const privateMedicalDetail of ["Xanax", "mirtazapine", "fluvoxamine", "buspirone", "bipolar disorder"]) {
  assert.equal(source.includes(privateMedicalDetail), false, `${privateMedicalDetail} must not be published in client source`);
}
const storage = new Map();
const context = {
  console,
  Date,
  Math,
  JSON,
  Object,
  Array,
  String,
  Number,
  Boolean,
  RegExp,
  Intl,
  Promise,
  URL,
  TextEncoder,
  TextDecoder,
  setTimeout,
  clearTimeout,
  window: {
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
  },
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(source, context);

const { buildCoachingContext, buildWorkoutAnalysis } = context.__coachingTest;
const now = new Date(2026, 7, 14, 8, 0, 0);
const activityDates = ["2026-08-13", "2026-08-09", "2026-08-04", "2026-07-30"];

function packet(overrides = {}) {
  return {
    generatedAt: "2026-08-14T07:00:00-04:00",
    health: {
      sleepHours: 8.5,
      restingHr: 52,
      bodyBattery: 78,
      stress: 24,
      baselines: { sleep7Day: 8, restingHr7Day: 50.1 },
      ...overrides.health,
    },
    training: {
      weeklyLoad: { activities: 2, previousActivities: 4, distanceMiles: 3.09, distanceChangePct: -81.1 },
      activities: activityDates.map((date) => ({ date, type: "running", name: "Run" })),
      lastWorkout: "Run",
      lastWorkoutDetail: {
        date: "2026-08-13",
        type: "running",
        name: "Run",
        averageHr: 170,
        maxHr: 188,
        aerobicEffect: 3.4,
        hrZones: { zones: [{ zone: 1, seconds: 90 }, { zone: 2, seconds: 180 }, { zone: 3, seconds: 600 }, { zone: 4, seconds: 780 }, { zone: 5, seconds: 180 }] },
      },
      hrZonesYtd: { activityCount: 20, zones: [{ zone: 1, seconds: 1200 }, { zone: 2, seconds: 2400 }, { zone: 3, seconds: 1800 }, { zone: 4, seconds: 1200 }, { zone: 5, seconds: 600 }] },
      analytics: {
        references: { restingHr: 50.1, observedMaxHr: 196 },
        current: { fitness: 12, fatigue: 8, form: 4, ramp7Day: -1.6, loadBalance: .67, activeDays28: 13, activities28: 13 },
      },
      ...overrides.training,
    },
  };
}

const normal = buildCoachingContext(packet(), now);
assert.equal(normal.health.status, "supportive");
assert.match(normal.focus.title, /easy-run frequency/i);
assert.match(normal.insightCards[1].title, /fresh/i);

const recovery = buildCoachingContext(packet({
  health: { sleepHours: 5.2, restingHr: 58, bodyBattery: 20, stress: 60, baselines: { sleep7Day: 8, restingHr7Day: 50 } },
}), now);
assert.equal(recovery.health.status, "caution");
assert.match(recovery.focus.title, /recovery/i);

const incomplete = buildCoachingContext(packet({
  health: { sleepHours: null, restingHr: null, bodyBattery: null, stress: null, baselines: { sleep7Day: 8.1, restingHr7Day: 50.2 } },
}), now);
assert.equal(incomplete.health.status, "incomplete");
assert.match(incomplete.health.title, /incomplete/i);

const overload = buildCoachingContext(packet({
  training: {
    weeklyLoad: { activities: 4, previousActivities: 3, distanceMiles: 20, distanceChangePct: 60 },
    analytics: { references: { restingHr: 50, observedMaxHr: 196 }, current: { fitness: 18, fatigue: 30, form: -12, ramp7Day: 3, loadBalance: 1.67 } },
  },
}), now);
assert.match(overload.focus.title, /absorb/i);

const highMileage = buildCoachingContext(packet({
  training: {
    weeklyLoad: { activities: 5, previousActivities: 5, distanceMiles: 32, distanceChangePct: 18 },
    analytics: { references: { restingHr: 50, observedMaxHr: 196 }, current: { fitness: 22, fatigue: 24, form: -2, ramp7Day: 1, loadBalance: 1.09 } },
  },
}), now);
assert.match(highMileage.focus.title, /hold mileage/i);
assert.match(highMileage.focus.rationale, /20–25 miles/i);

const workout = buildWorkoutAnalysis(packet().training.lastWorkoutDetail, packet().training, packet().health, normal);
assert.match(workout.title, /quality workout/i);
assert.match(workout.body, /Zones 4–5/i);
assert.match(workout.effect, /year-to-date/i);
assert.match(workout.next, /138–151 bpm/i);
assert.match(workout.source, /athlete history/i);

console.log("Coaching context scenarios passed.");
