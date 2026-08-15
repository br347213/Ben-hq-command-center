import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8")
  .replace(/\ninit\(\);\s*$/, "\nglobalThis.__coachingTest = { buildCoachingContext, buildWorkoutAnalysis, buildAiRunRecommendation };\n");
const markup = readFileSync(new URL("../index.html", import.meta.url), "utf8");
for (const privateMedicalDetail of ["Xanax", "mirtazapine", "fluvoxamine", "buspirone", "bipolar disorder"]) {
  assert.equal(source.includes(privateMedicalDetail), false, `${privateMedicalDetail} must not be published in client source`);
}
for (const bodyMindSignal of ["fatigued", "sick", "burnt-out", "motivated", "strong"]) {
  assert.match(markup, new RegExp(`<option value="${bodyMindSignal}">`), `${bodyMindSignal} body/mind signal must be available`);
}
assert.match(markup, /Coach’s confidence/);
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

const { buildCoachingContext, buildWorkoutAnalysis, buildAiRunRecommendation } = context.__coachingTest;
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
      weightLbs: 171.8,
      weightDate: "2026-08-10",
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
assert.equal(normal.health.weightLbs, 171.8);
assert.equal(normal.health.weightDate, "2026-08-10");
assert.match(normal.focus.title, /easy-run frequency/i);
assert.match(normal.insightCards[1].title, /fresh/i);
assert.equal(normal.profile.equipment.setting, "Home garage gym");
assert.deepEqual(Array.from(normal.profile.equipment.available), ["rack", "basic dumbbell set", "plates", "resistance bands"]);
assert.match(normal.profile.running.hrSensor, /Forerunner 245 wrist optical/i);
assert.deepEqual(Array.from(normal.profile.crossTraining.currentlyAvailable), ["jump rope", "bike on Saris trainer", "outdoor road cycling"]);
assert.deepEqual(Array.from(normal.profile.crossTraining.historicalInterests), ["rowing", "indoor bouldering"]);

const recovery = buildCoachingContext(packet({
  health: { sleepHours: 5.2, restingHr: 58, bodyBattery: 20, stress: 60, baselines: { sleep7Day: 8, restingHr7Day: 50 } },
}), now);
assert.equal(recovery.health.status, "caution");
assert.match(recovery.focus.title, /recovery/i);

vm.runInContext('workoutFeedback = { latest: { date: "2026-08-14", updatedAt: "2026-08-14T07:45:00-04:00", bodySignal: "sick" } };', context);
const sickContext = buildCoachingContext(packet(), now);
assert.equal(sickContext.health.status, "caution");
assert.match(sickContext.focus.rationale, /feel sick/i);
const sickRecommendation = buildAiRunRecommendation(new Date(2026, 7, 15, 8, 0, 0), sickContext, packet(), now);
assert.match(sickRecommendation.title, /recovery run or full rest/i);

vm.runInContext('workoutFeedback = { latest: { date: "2026-08-14", updatedAt: "2026-08-14T07:45:00-04:00", bodySignal: "burnt-out" } };', context);
const burnoutContext = buildCoachingContext(packet(), now);
assert.match(burnoutContext.focus.rationale, /burnt out/i);
assert.match(burnoutContext.focus.action, /motivation/i);

vm.runInContext("workoutFeedback = {};", context);

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
assert.match(workout.body, /quality work/i);
assert.match(workout.effect, /year-to-date/i);
assert.match(workout.next, /136–151 bpm/i);
assert.match(workout.signals.find((signal) => signal.label === "High-zone time").value, /Z4–5/i);
assert.equal("source" in workout, false);

const hotWorkoutPacket = packet();
hotWorkoutPacket.training.lastWorkoutDetail.weather = { temperatureF: 88, apparentTemperatureF: 94, relativeHumidityPct: 72, dewPointF: 74, heatLoad: "high" };
const hotWorkout = buildWorkoutAnalysis(hotWorkoutPacket.training.lastWorkoutDetail, hotWorkoutPacket.training, hotWorkoutPacket.health, normal);
assert.match(hotWorkout.body, /Heat raised/i);
assert.match(hotWorkout.signals.find((signal) => signal.label === "Conditions").value, /88°F.*72% humidity/i);
assert.match(hotWorkout.next, /similar heat/i);

const saturday = new Date(2026, 7, 15, 8, 0, 0);
assert.equal(buildAiRunRecommendation(now, normal, packet(), now), null);
const currentRecommendation = buildAiRunRecommendation(saturday, normal, packet(), now);
assert.match(currentRecommendation.label, /AI Recommended/i);
assert.match(currentRecommendation.title, /easy/i);
assert.equal(currentRecommendation.kind, "easy");
assert.match(currentRecommendation.summary, /zone distribution/i);

const recoveryRecommendation = buildAiRunRecommendation(saturday, recovery, packet({
  health: { sleepHours: 5.2, restingHr: 58, bodyBattery: 20, stress: 60, baselines: { sleep7Day: 8, restingHr7Day: 50 } },
}), now);
assert.match(recoveryRecommendation.title, /recovery run or full rest/i);

const qualityPacket = packet({
  training: {
    weeklyLoad: { activities: 4, previousActivities: 4, distanceMiles: 18, distanceChangePct: 4 },
    activities: activityDates.map((date) => ({ date, type: "running", name: "Run" })),
    lastWorkout: "Easy Run",
    lastWorkoutDetail: {
      date: "2026-08-13",
      type: "running",
      name: "Easy Run",
      averageHr: 140,
      maxHr: 154,
      aerobicEffect: 2.0,
      hrZones: { zones: [{ zone: 1, seconds: 600 }, { zone: 2, seconds: 1200 }, { zone: 3, seconds: 120 }, { zone: 4, seconds: 0 }, { zone: 5, seconds: 0 }] },
    },
    hrZonesYtd: { activityCount: 20, zones: [{ zone: 1, seconds: 3600 }, { zone: 2, seconds: 7200 }, { zone: 3, seconds: 1500 }, { zone: 4, seconds: 500 }, { zone: 5, seconds: 200 }] },
    analytics: { references: { restingHr: 50.1, observedMaxHr: 196 }, current: { fitness: 16, fatigue: 15, form: 1, ramp7Day: .4, loadBalance: .94, activeDays28: 16, activities28: 18 } },
  },
});
const qualityContext = buildCoachingContext(qualityPacket, now);
const qualityRecommendation = buildAiRunRecommendation(saturday, qualityContext, qualityPacket, now);
assert.match(qualityRecommendation.title, /controlled tempo/i);
assert.equal(qualityRecommendation.kind, "quality");

const sundayRecommendation = buildAiRunRecommendation(new Date(2026, 7, 16, 8, 0, 0), normal, packet(), now);
assert.match(sundayRecommendation.title, /5–6 easy miles/i);
assert.equal(sundayRecommendation.kind, "long");

console.log("Coaching context scenarios passed.");
