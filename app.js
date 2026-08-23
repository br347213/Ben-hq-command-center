const NAV_ITEMS = [
  { id: "today", label: "Today", icon: "home" },
  { id: "plan", label: "Plan", icon: "plan" },
  { id: "progress", label: "Progress", icon: "progress" },
  { id: "insights", label: "Insights", icon: "spark" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const GARMIN_REFRESH_ENDPOINT = "https://ben-hq-garmin-refresh.br347213.workers.dev/refresh";
const LIVE_ANALYSIS_ENDPOINT = "https://ben-hq-garmin-refresh.br347213.workers.dev/analyze";
const GARMIN_REFRESH_POLL_MS = 2500;
const GARMIN_REFRESH_MAX_POLLS = 48;
const APP_VERSION = "3.2.3";
const COACHING_MODEL_VERSION = "3.0";
const COACHING_KNOWLEDGE = Object.freeze({
  principles: [
    "Use current fitness rather than goal fitness to set intensity.",
    "Preserve the purpose of a workout when weather, hills, fatigue, or life changes the pace.",
    "Keep easy work repeatable and selected quality work purposeful.",
    "Increase volume and intensity separately, not at the same time.",
    "Treat rest, enjoyment, pain, motivation, and written reflection as training data.",
  ],
  personalHistory: [
    "Ben has responded best to roughly 20–25 running miles, one quality run, and protected recovery.",
    "Past 30-plus-mile weeks and extra cycling have produced heavy legs, lower motivation, and poorer long-run quality.",
    "Heat, humidity, and hills have repeatedly raised cardiovascular cost at the same pace.",
    "Two genuinely easier days have restored run quality more reliably than catch-up training.",
  ],
  sources: ["Jack Daniels' Running Formula summary", "The Running Channel training philosophy", "JOG ON methodology and 5K Improver plan", "Ben's Strava training history, 2014–2026"],
});
const STRAVA_TRAINING_HISTORY = Object.freeze({
  coverage: { firstActivity: "2014-06-19", lastActivity: "2026-08-15", activities: 1245, runs: 819, writtenNotes: 263 },
  runningLoad: {
    2018: { miles: 323.6, activeWeeks: 35, medianActiveWeekMiles: 9.0, maxWeekMiles: 18.8 },
    2024: { miles: 817.8, activeWeeks: 46, medianActiveWeekMiles: 15.7, maxWeekMiles: 31.3, weeksAtLeast25Miles: 13 },
    2025: { miles: 1045.3, activeWeeks: 52, medianActiveWeekMiles: 20.1, maxWeekMiles: 36.2, weeksAtLeast25Miles: 17, weeksAtLeast30Miles: 10 },
    2026: { milesThroughAugust15: 505.8, activeWeeksThroughAugust15: 33, medianActiveWeekMiles: 14.3, maxWeekMiles: 24.5 },
  },
  responsePatterns: {
    pacing: "Conservative starts repeatedly produced stronger finishes, better execution, and more enjoyment than aggressive openings.",
    load: "Forcing planned work through accumulated fatigue or making abrupt jumps repeatedly led to poor sessions; backing off restored run quality.",
    conditions: "Heat, humidity, wind, and hills repeatedly raised session cost enough that effort was more informative than pace.",
    crossTraining: "Cycling contributed meaningful leg fatigue and sometimes reduced the quality of the following run.",
    bodyMind: "Pain, illness, burnout, motivation, and enjoyment have all materially affected repeatability and should be treated as training data.",
  },
});
const ATHLETE_PROFILE = Object.freeze({
  name: "Ben",
  currentPhase: "General fitness, strength, physique, athletic capability, and sustainable running; no active race goal.",
  priorities: ["general fitness", "strength", "physique", "sustainable running", "healthy consistency"],
  trainingPhilosophy: "Run and lift. Use the bike or jump rope for available aerobic substitutions; rowing and bouldering are historical interests, not assumed current options.",
  equipment: {
    setting: "Home garage gym",
    available: ["rack", "basic dumbbell set", "plates", "resistance bands"],
  },
  running: {
    normalFrequency: "4–5 runs per week",
    easyRunMiles: [3, 4],
    longRunMiles: [5, 6],
    enjoyableLongRunCeilingMiles: 8,
    sustainableWeeklyMiles: [20, 25],
    hardWeeklyCeilingMiles: 30,
    qualitySessionsPerWeek: 1,
    preferredQualityDay: "Saturday",
    preferredLongRunDay: "Sunday",
    historicalMaxHr: 194,
    highestObservedWristHr: 198,
    zoneModel: "Five zones based on percentage of heart-rate reserve (%HRR), using 194 bpm as the working max.",
    historicalZones: { z1: [121, 136], z2: [136, 151], z3: [151, 165], z4: [165, 180], z5: [180, 194] },
    typicalCadenceSpm: [155, 160],
    hrSensor: "Garmin Forerunner 245 wrist optical heart-rate sensor",
    hrInterpretation: "Use heart-rate zones and trends as useful evidence, while allowing for wrist-sensor noise during rapid intensity changes and avoiding false precision.",
  },
  strength: {
    sustainableBaseline: "Two foundational sessions plus a short Friday upper-body/arms session when it remains low-friction.",
    emphasis: ["upper body", "arms", "core", "compound strength", "enough lower body to support running"],
    rule: "Avoid lower-body fatigue that degrades Saturday quality work or Sunday's longer run.",
  },
  crossTraining: {
    currentlyAvailable: ["jump rope", "bike on Saris trainer", "outdoor road cycling"],
    historicalInterests: ["rowing", "indoor bouldering"],
    jumpRope: "Use mostly 45-second-or-shorter work intervals with generous recovery; do not prescribe a 30–45 minute session.",
  },
  environment: "Western North Carolina hills, heat, and humidity can materially change pace at the same effort.",
  historicalPerformance: {
    halfMarathon2020: "about 1:53",
    fiveKPr2025: "22:32",
    twoMile2025: "14:01",
    mile2025: "6:07",
    rule: "Historical performances show prior capacity; current workouts and recovery set present intensity.",
  },
  consistencyRule: "Count cumulative active days without streak pressure, punishment workouts, catch-up mileage, or automatic progression after one completed session.",
  scheduleRule: "Keep the weekly schedule fixed as a low-friction default; substitutions do not make the week a failure and the app does not silently rewrite the plan.",
  recoveryRule: "Treat motivation, enjoyment, unusual fatigue, sleep disruption, soreness, and pain as real programming inputs; favor repeatability over maximizing any single day.",
  constraints: [
    "Persistent upper-left-arm pain after pull-ups: pull-ups remain paused, pulling must be pain-free, and evaluation is appropriate before resuming them.",
    "Old left-pinky/hand deformity is painless but may affect grip span; adjust grip-intensive lifting, rowing, or climbing only if discomfort or limitation is reported.",
    "Do not provide medication advice or alter treatment. Seek clarification when panic/anxiety symptoms, medication changes, unusual fatigue, sleep disruption, pain, or heart-related symptoms affect training.",
  ],
});
const HR_ZONE_META = [
  { zone: 1, label: "Z1" },
  { zone: 2, label: "Z2" },
  { zone: 3, label: "Z3" },
  { zone: 4, label: "Z4" },
  { zone: 5, label: "Z5" },
];

const BODY_MIND_SIGNAL_META = Object.freeze({
  normal: { label: "normal", pattern: "neutral", recoveryDelta: 0 },
  sore: { label: "sore or tight", pattern: "soreness", recoveryDelta: -1 },
  fatigued: { label: "fatigued", pattern: "fatigue", recoveryDelta: -2 },
  sick: { label: "sick", pattern: "illness", recoveryDelta: -4 },
  "burnt-out": { label: "burnt out", pattern: "burnout", recoveryDelta: -3 },
  motivated: { label: "motivated", pattern: "motivation", recoveryDelta: 1 },
  strong: { label: "strong", pattern: "strength", recoveryDelta: 1 },
  pain: { label: "pain", pattern: "pain", recoveryDelta: -4 },
});

const ICONS = {
  home: '<circle cx="12" cy="7.5" r="2.5"></circle><path d="M4 14.5c1.8-1.2 3.5-1.2 5.2 0s3.5 1.2 5.2 0 3.5-1.2 5.6 0"></path><path d="M5.5 18.5c1.5-.9 3-.9 4.5 0s3 .9 4.5 0 3-.9 4.5 0"></path><path d="M12 2v1.5"></path>',
  plan: '<path d="M4 5.5 9 4l6 2 5-1.5v14L15 20l-6-2-5 1.5v-14Z"></path><path d="M9 4v14M15 6v14"></path><path d="M6.5 13c2-3 4.2-3.2 5.7-.8 1.3 2 3.1 1.8 5.3-1.7"></path><circle cx="6.5" cy="13" r=".7"></circle><circle cx="17.5" cy="10.5" r=".7"></circle>',
  progress: '<path d="M3 18.5h18"></path><path d="M5 16v-3M9 16V9M13 16v-5M17 16V6"></path><path d="m4.5 8.5 4-2 4 1.5 5-4"></path><circle cx="18" cy="4" r="1"></circle>',
  spark: '<circle cx="12" cy="12" r="7.5"></circle><path d="m14.8 8.2-1.5 5.1-5.1 1.5 1.5-5.1 5.1-1.5Z"></path><path d="M12 2v2M12 20v2M2 12h2M20 12h2"></path>',
  battery: '<rect x="3" y="6" width="16" height="12" rx="2"></rect><path d="M21 10v4"></path><path d="M6.5 9.5h7"></path>',
  settings: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect><path d="M7 9h10M7 15h10"></path><circle cx="10" cy="9" r="1.5"></circle><circle cx="15" cy="15" r="1.5"></circle>',
};

const WEEK = [
  {
    day: "Sunday",
    short: "Sun",
    title: "Easy long run",
    subtitle: "5–6 miles, or 3–4 when energy is lower",
    duration: "45–65 min",
    type: "Run",
    summary: "Build the aerobic base without turning the long run into a test.",
    main: [
      "Run 5–6 miles at a conversational effort",
      "Start the first mile deliberately easy",
      "Choose 3–4 miles instead when the week has taken more out of you",
    ],
    minimum: ["Move easily for 20 minutes", "A walk, bike ride, or short easy run can count"],
    optional: ["Five minutes of relaxed calves, hips, and hamstrings", "No fast finish required"],
  },
  {
    day: "Monday",
    short: "Mon",
    title: "Lift A",
    subtitle: "Squat, press, supported pull",
    duration: "25–35 min",
    type: "Lift",
    summary: "A low-friction full-body strength day using equipment that is easy to start.",
    main: [
      "Goblet squat — 3 × 8–12",
      "Dumbbell bench or floor press — 3 × 8–12",
      "Chest-supported dumbbell row — 3 × 8–12",
    ],
    minimum: ["Goblet squat — 2 sets", "Dumbbell bench or floor press — 2 sets", "Then stop. That is a completed session."],
    optional: ["Dead bug — 2 × 8 per side", "Only add work when it sounds genuinely appealing"],
  },
  {
    day: "Tuesday",
    short: "Tue",
    title: "Easy run",
    subtitle: "3–4 relaxed miles",
    duration: "25–40 min",
    type: "Run",
    summary: "Keep the running rhythm with no pace target and no need to prove fitness.",
    main: ["Run 3–4 miles at conversational effort", "Let breathing and feel control the pace", "Finish while the run still feels manageable"],
    minimum: ["20 minutes easy", "Bike or jump rope if running does not fit today"],
    optional: ["Four relaxed 15-second strides if you feel springy", "Light core work — 5 minutes"],
  },
  {
    day: "Wednesday",
    short: "Wed",
    title: "Easy run",
    subtitle: "3–4 relaxed miles",
    duration: "25–40 min",
    type: "Run",
    summary: "Another easy aerobic deposit. Repetition is the point.",
    main: ["Run 3–4 miles easy", "Stay conversational throughout", "Do not turn the final mile into a workout"],
    minimum: ["20 minutes of easy movement", "Bike or jump rope can replace the run"],
    optional: ["Mobility for calves and hips", "Stop there if tomorrow's lift matters more"],
  },
  {
    day: "Thursday",
    short: "Thu",
    title: "Lift B",
    subtitle: "Hinge, shoulders, back",
    duration: "25–35 min",
    type: "Lift",
    summary: "Simple strength work that supports running without creating a recovery problem.",
    main: [
      "Dumbbell or kettlebell Romanian deadlift — 3 × 8–12",
      "One-arm dumbbell or kettlebell press — 3 × 6–10 per side",
      "One-arm dumbbell or kettlebell row — 3 × 8–12 per side",
    ],
    minimum: ["Romanian deadlift — 2 sets", "One-arm press — 2 sets per side", "Leave without adding make-up work"],
    optional: ["Pallof press or plank — 2 easy sets", "Use only pain-free pulling ranges"],
  },
  {
    day: "Friday",
    short: "Fri",
    title: "Lift C",
    subtitle: "Upper body, arms, physique",
    duration: "25–35 min",
    type: "Lift",
    summary: "Direct upper-body work for arm growth and physique without tiring your legs for the weekend.",
    main: [
      "Incline dumbbell press — 3 × 8–12",
      "Chest-supported or one-arm row — 3 × 8–12",
      "Dumbbell curls — 2 × 10–15",
      "Overhead triceps extension — 2 × 10–15",
    ],
    minimum: ["Incline dumbbell press — 2 sets", "Pain-free supported row — 2 sets", "Anything after that is a bonus"],
    optional: ["Lateral raise — 2 × 12–20", "Hollow hold or dead bug — 2 easy sets"],
  },
  {
    day: "Saturday",
    short: "Sat",
    title: "Easy or tempo run",
    subtitle: "Easy 4 by default; quality when it fits",
    duration: "30–45 min",
    type: "Run",
    summary: "Choose the version that matches your interest and recovery. Easy is always a valid default.",
    main: [
      "Easy option — 4 miles conversational",
      "Straight 2 — 1 easy, 2 tempo, 1 easy",
      "Double 10 — 1 easy mile, 2 × 10 min tempo with 2 min easy, cool down to 4 miles",
      "Four 5s — 1 easy mile, 4 × 5 min tempo with 1 min easy, cool down to 4 miles",
    ],
    minimum: ["20 minutes easy", "Bike or jump rope if you cannot get out for a run"],
    optional: ["Tempo is controlled discomfort, about 7/10", "Finish knowing you could do a little more"],
  },
];

const STORAGE = {
  completions: "fitness-hq-completions-v1",
  sync: "fitness-hq-sync-v1",
  packet: "fitness-hq-private-packet-v1",
  legacySync: "ben-hq-auto-sync-v1",
  legacyPacket: "ben-hq-private-daily-v1",
  feedback: "fitness-hq-workout-feedback-v1",
  recommendationHistory: "fitness-hq-recommendations-v1",
  liveAnalysis: "fitness-hq-live-analysis-v8",
  liveAnalysisHistory: "fitness-hq-live-analysis-history-v8",
};

const OUTCOME_LABELS = {
  completed: "Workout completed",
  minimum: "Minimum version",
  rest: "Intentional rest",
};

let currentView = "today";
let calendarCursor = new Date();
let completions = readJson(STORAGE.completions, {});
let syncSettings = loadSyncSettings();
let privatePacket = loadPrivatePacket();
let workoutFeedback = readJson(STORAGE.feedback, {});
let recommendationHistory = readJson(STORAGE.recommendationHistory, {});
let liveAnalysis = sanitizeGeneratedAnalysis(readJson(STORAGE.liveAnalysis, null));
let liveAnalysisHistory = readJson(STORAGE.liveAnalysisHistory, []);
let liveAnalysisState = { status: liveAnalysis ? "ready" : "idle", reason: "", error: "" };
let liveAnalysisRequest = null;
let toastTimer = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The UI remains usable if storage is unavailable.
  }
}

function removeStored(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // The current data-first view remains usable if storage is unavailable.
  }
}

function localDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseLocalDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function workoutForDate(date = new Date()) {
  return WEEK[date.getDay()];
}

function dateForPlanningWeekday(weekday, now = new Date()) {
  const daysAhead = (weekday - now.getDay() + 7) % 7;
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysAhead);
}

function activityFeedbackKey(activity) {
  if (!activity) return "";
  return String(activity.activityId || `${activity.date || "unknown"}:${activity.name || activity.type || "workout"}`);
}

function feedbackForActivity(activity) {
  return workoutFeedback[activityFeedbackKey(activity)] || null;
}

function feedbackSignals(feedback) {
  if (!feedback) return [];
  const text = String(feedback.note || "").toLowerCase();
  const signals = [];
  const groups = [
    ["heat", /hot|heat|humid|humidity|dew point/],
    ["hills", /hill|climb|rolling|elevation/],
    ["fatigue", /fatigue|tired|heavy|sluggish|dead legs|run down|exhaust/],
    ["sleep", /sleep|insomnia|awake|restless/],
    ["pain", /pain|hurt|injur|sharp|ache/],
    ["soreness", /sore|tight|stiff/],
    ["motivation", /motivat|burnt|burned out|dread|enjoy|fun|great|fantastic/],
    ["stress", /stress|anxious|anxiety|panic|overwhelm/],
    ["fueling", /fuel|food|eat|hydr|water|gi|stomach/],
  ];
  groups.forEach(([label, pattern]) => { if (pattern.test(text)) signals.push(label); });
  const selectedSignal = BODY_MIND_SIGNAL_META[feedback.bodySignal]?.pattern;
  if (selectedSignal && selectedSignal !== "neutral") signals.push(selectedSignal);
  return [...new Set(signals)];
}

function feedbackLearning(now = new Date()) {
  const entries = Object.values(workoutFeedback).filter((item) => item && typeof item === "object");
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 41);
  const recent = entries.filter((item) => {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(item.date || "") ? parseLocalDateKey(item.date) : new Date(item.updatedAt || 0);
    return !Number.isNaN(date.getTime()) && date >= cutoff;
  });
  const counts = {};
  recent.flatMap(feedbackSignals).forEach((signal) => { counts[signal] = (counts[signal] || 0) + 1; });
  const latest = recent.slice().sort((a, b) => String(b.updatedAt || b.date).localeCompare(String(a.updatedAt || a.date)))[0] || null;
  const lowFeel = recent.filter((item) => Number(item.feel) > 0 && Number(item.feel) <= 2).length;
  const highRpe = recent.filter((item) => Number(item.rpe) >= 8).length;
  const painFlags = recent.filter((item) => item.bodySignal === "pain").length;
  const sicknessFlags = recent.filter((item) => item.bodySignal === "sick").length;
  const burnoutFlags = recent.filter((item) => item.bodySignal === "burnt-out").length;
  const fatigueFlags = recent.filter((item) => item.bodySignal === "fatigued").length;
  const followed = recent.filter((item) => item.planChoice).length;
  const matched = recent.filter((item) => item.planChoice === "ai").length;
  return { recent, latest, counts, lowFeel, highRpe, painFlags, sicknessFlags, burnoutFlags, fatigueFlags, followed, matched };
}

function weatherSummary(weather) {
  if (!weather || typeof weather !== "object") return "";
  const pieces = [];
  if (Number.isFinite(Number(weather.temperatureF))) pieces.push(`${Math.round(Number(weather.temperatureF))}°F`);
  if (Number.isFinite(Number(weather.relativeHumidityPct))) pieces.push(`${Math.round(Number(weather.relativeHumidityPct))}% humidity`);
  if (Number.isFinite(Number(weather.apparentTemperatureF)) && Math.abs(Number(weather.apparentTemperatureF) - Number(weather.temperatureF)) >= 2) pieces.push(`felt ${Math.round(Number(weather.apparentTemperatureF))}°F`);
  return pieces.join(" · ");
}

function coachingConfidence(coaching, activity = null) {
  const health = coaching.health || {};
  const training = coaching.training || {};
  let score = 0;
  if (Number.isFinite(health.sleep)) score += 1;
  if (Number.isFinite(health.restingHr)) score += 1;
  if (Number.isFinite(training.weeklyMiles)) score += 1;
  if (training.zoneMix) score += 1;
  if (feedbackLearning().recent.length) score += 1;
  if (activity?.hrZones) score += 1;
  if (activity?.weather) score += 1;
  if (score >= 6) return { label: "High confidence", score, detail: "health, load, zones, weather, and feedback" };
  if (score >= 4) return { label: "Reasonable confidence", score, detail: "multiple current signals" };
  if (score >= 2) return { label: "Provisional", score, detail: "some current context is missing" };
  return { label: "Limited context", score, detail: "use feel and the static plan" };
}

function rememberRecommendation(date, recommendation) {
  if (!recommendation) return;
  const key = localDateKey(date);
  const snapshot = { date: key, kind: recommendation.kind, title: recommendation.title, confidence: recommendation.confidence, createdAt: new Date().toISOString(), modelVersion: COACHING_MODEL_VERSION };
  const previous = recommendationHistory[key];
  if (!previous || previous.title !== snapshot.title || previous.kind !== snapshot.kind) {
    recommendationHistory[key] = snapshot;
    writeJson(STORAGE.recommendationHistory, recommendationHistory);
  }
}

function recommendationEvidence(coaching) {
  const evidence = [];
  const health = coaching.health || {};
  const training = coaching.training || {};
  const recovery = [
    Number.isFinite(health.sleep) ? `${health.sleep.toFixed(1)}h sleep` : "",
    Number.isFinite(health.restingHr) ? `${Math.round(health.restingHr)} resting HR` : "",
    Number.isFinite(health.bodyBattery) ? `Body Battery ${Math.round(health.bodyBattery)}` : "",
    Number.isFinite(health.stress) ? `stress ${Math.round(health.stress)}` : "",
  ].filter(Boolean).join(" · ");
  if (recovery) evidence.push(recovery);
  if (Number.isFinite(training.runSessions7) || Number.isFinite(training.weeklyMiles)) {
    evidence.push(`${Number.isFinite(training.runSessions7) ? `${training.runSessions7} runs` : "Recent running"}${Number.isFinite(training.weeklyMiles) ? ` · ${training.weeklyMiles.toFixed(1)} mi in 7 days` : ""}${Number.isFinite(training.loadChange) ? ` · ${training.loadChange > 0 ? "+" : ""}${training.loadChange.toFixed(0)}% vs prior 7 days` : ""}`);
  }
  if (training.zoneMix) evidence.push(`${training.zoneMix.easy.toFixed(0)}% Z1–2 · ${training.zoneMix.hard.toFixed(0)}% Z4–5 YTD`);
  const latestWeather = weatherSummary(training.latestActivity?.weather);
  if (latestWeather) evidence.push(`Latest run: ${latestWeather}`);
  if (training.recent7?.bike >= 2) evidence.push(`${training.recent7.bike} rides in 7 days · leg load counts`);
  const learned = feedbackLearning();
  if (learned.latest?.note) evidence.push(`Your latest note: ${String(learned.latest.note).slice(0, 72)}`);
  return evidence.slice(0, 3);
}

function historicalResponseCue(coaching, situation) {
  const patterns = coaching.history?.responsePatterns || STRAVA_TRAINING_HISTORY.responsePatterns;
  if (situation === "conditions") return patterns.conditions;
  if (situation === "cross-training") return patterns.crossTraining;
  if (situation === "pacing") return patterns.pacing;
  if (situation === "load") return patterns.load;
  return patterns.bodyMind;
}

function compactActivityForAnalysis(activity) {
  if (!activity || typeof activity !== "object") return null;
  const keys = [
    "activityId", "date", "startTimeLocal", "name", "type", "distanceMiles", "durationMinutes",
    "averagePaceMinutesPerMile", "averageHr", "maxHr", "calories", "elevationGainFeet",
    "aerobicEffect", "anaerobicEffect", "averageCadence", "vo2Max", "hrZones", "weather",
  ];
  return Object.fromEntries(keys.filter((key) => activity[key] !== undefined && activity[key] !== null).map((key) => [key, activity[key]]));
}

function liveAnalysisSummary(analysis) {
  if (!analysis || typeof analysis !== "object") return null;
  return {
    generatedAt: analysis._meta?.generatedAt || "",
    dailyGuidance: analysis.dailyGuidance?.title || "",
    dailyHealth: analysis.dailyHealth?.headline || "",
    workoutAnalysis: analysis.workoutAnalysis?.title || "",
    coachingFocus: analysis.coachingFocus?.title || "",
    weeklyReview: analysis.weeklyReview?.title || "",
    runRecommendations: analysis.runRecommendations && typeof analysis.runRecommendations === "object"
      ? Object.fromEntries(Object.entries(analysis.runRecommendations).map(([day, item]) => [day, item?.title || ""]))
      : {},
  };
}

function buildLiveAnalysisContext(reason = "app load", now = new Date()) {
  const coaching = buildCoachingContext(privatePacket, now);
  const training = privatePacket.training || {};
  const currentAnalytics = training.analytics?.current || {};
  const currentDate = localDateKey(now);
  const activityDetails = Array.isArray(training.activityDetails) ? training.activityDetails : [];
  const latestActivity = training.lastWorkoutDetail && typeof training.lastWorkoutDetail === "object" ? training.lastWorkoutDetail : null;
  const latestActivityDate = latestActivity
    ? (/^\d{4}-\d{2}-\d{2}$/.test(latestActivity.date || "") ? latestActivity.date : String(latestActivity.startTimeLocal || "").slice(0, 10))
    : "";
  const latestActivityDay = /^\d{4}-\d{2}-\d{2}$/.test(latestActivityDate) ? parseLocalDateKey(latestActivityDate) : null;
  const latestScheduledWorkout = latestActivityDay ? workoutForDate(latestActivityDay) : null;
  const latestReflection = latestActivity ? feedbackForActivity(latestActivity) : null;
  const daysSinceLatest = latestActivityDay
    ? Math.max(0, Math.round((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(latestActivityDay.getFullYear(), latestActivityDay.getMonth(), latestActivityDay.getDate())) / 86_400_000))
    : null;
  const reflectionForAnalysis = (item) => ({
    activityId: item.activityId || "",
    date: item.date || "",
    workout: item.name || "Workout",
    rpe: item.rpe || "",
    feel: item.feel || "",
    enjoyment: item.enjoyment || "",
    bodyMindSignal: item.bodySignal || "",
    intendedSession: item.intent || "",
    planChoice: item.planChoice || "",
    note: item.note || "",
    belongsToLatestCompletedWorkout: Boolean(latestActivity && activityFeedbackKey(latestActivity) === String(item.activityId || "")),
  });
  const recentActivities = activityDetails
    .slice()
    .sort((left, right) => String(right.startTimeLocal || right.date || "").localeCompare(String(left.startTimeLocal || left.date || "")))
    .slice(0, 21)
    .map(compactActivityForAnalysis)
    .filter(Boolean);
  const reflections = Object.values(workoutFeedback)
    .filter((item) => item && typeof item === "object")
    .sort((left, right) => String(right.updatedAt || right.date || "").localeCompare(String(left.updatedAt || left.date || "")))
    .slice(0, 12)
    .map(reflectionForAnalysis);
  const runPlan = WEEK.map((workout, weekday) => ({ workout, date: dateForPlanningWeekday(weekday, now) }))
    .filter(({ workout }) => workout.type === "Run")
    .map(({ workout, date }) => ({
      targetDate: localDateKey(date),
      day: workout.day,
      staticTitle: workout.title,
      staticSummary: workout.summary,
      staticMain: workout.main,
      minimum: workout.minimum,
    }));
  const recentCompletions = Object.entries(completions)
    .filter(([date]) => /^\d{4}-\d{2}-\d{2}$/.test(date) && parseLocalDateKey(date) <= now)
    .sort(([left], [right]) => right.localeCompare(left))
    .slice(0, 28)
    .map(([date, value]) => ({ date, status: typeof value === "string" ? value : value?.status || "", source: value?.source || "manual" }));
  return {
    schemaVersion: 1,
    requestedAt: now.toISOString(),
    currentDate,
    localTime: now.toLocaleString(undefined, { weekday: "long", hour: "numeric", minute: "2-digit", timeZoneName: "short" }),
    reason,
    athlete: ATHLETE_PROFILE,
    coachingPrinciples: COACHING_KNOWLEDGE.principles,
    historicalResponse: {
      trainingCoverage: STRAVA_TRAINING_HISTORY.coverage,
      recentYears: STRAVA_TRAINING_HISTORY.runningLoad,
      patterns: STRAVA_TRAINING_HISTORY.responsePatterns,
    },
    today: {
      outcome: getOutcome(localDateKey(now)) || "not marked",
      scheduledWorkout: workoutForDate(now),
      hasGarminWorkoutRecordedToday: latestActivityDate === currentDate,
      mostRecentGarminWorkoutDate: latestActivityDate || null,
      chronology: latestActivityDate === currentDate
        ? "The latest completed Garmin workout occurred today."
        : `Today's scheduled workout has not been recorded by Garmin. The latest completed Garmin workout was ${daysSinceLatest === 1 ? "yesterday" : `${daysSinceLatest ?? "an unknown number of"} days ago`} on ${latestActivityDate || "an unknown date"}.`,
      recentCompletions,
      consistency: coaching.consistency,
    },
    health: privatePacket.health || {},
    training: {
      latestCompletedWorkout: latestActivity ? {
        activity: compactActivityForAnalysis(latestActivity),
        occurredOn: latestActivityDate || null,
        daysBeforeCurrentDate: daysSinceLatest,
        occurredToday: latestActivityDate === currentDate,
        scheduledPlanOnThatDate: latestScheduledWorkout ? {
          day: latestScheduledWorkout.day,
          title: latestScheduledWorkout.title,
          type: latestScheduledWorkout.type,
          summary: latestScheduledWorkout.summary,
          main: latestScheduledWorkout.main,
        } : null,
        matchingReflection: latestReflection ? reflectionForAnalysis(latestReflection) : null,
      } : null,
      weeklyLoad: training.weeklyLoad || {},
      activityHistory: training.activityHistory || {},
      ytdHeartRateZones: training.hrZonesYtd || null,
      analytics: {
        model: training.analytics?.model || "",
        loadMethod: training.analytics?.loadMethod || "",
        references: training.analytics?.references || {},
        currentState: {
          longTermFitnessLoadPoints: currentAnalytics.fitness,
          shortTermFatigueLoadPoints: currentAnalytics.fatigue,
          formFitnessMinusFatigue: currentAnalytics.form,
          sevenDayFitnessRampPoints: currentAnalytics.ramp7Day,
          loadBalanceFatigueDividedByFitness: currentAnalytics.loadBalance,
          monotony7Day: currentAnalytics.monotony7Day,
          strain7Day: currentAnalytics.strain7Day,
          runningEfficiency28Day: currentAnalytics.runningEfficiency28,
          runningEfficiencyChangePct: currentAnalytics.runningEfficiencyChangePct,
        },
        metricSemantics: {
          longTermFitnessLoadPoints: "Current long-term load estimate. It is a level, not a change.",
          shortTermFatigueLoadPoints: "Current short-term load estimate. It is a level, not a change or a subjective feeling.",
          formFitnessMinusFatigue: "Fitness minus fatigue. Positive is fresher; negative reflects more accumulated short-term load.",
          sevenDayFitnessRampPoints: "The direction and size of the fitness estimate's change over seven days.",
          loadBalanceFatigueDividedByFitness: "Short-term fatigue divided by long-term fitness; context for whether recent load is light, balanced, or elevated.",
        },
        series90Day: Array.isArray(training.analytics?.series)
          ? training.analytics.series.slice(-90).filter((_, index, series) => index % 3 === 0 || index >= series.length - 14)
          : [],
      },
      recentActivities,
      derivedCurrentRead: {
        recoveryStatus: coaching.health.status,
        recoveryScore: coaching.health.score,
        recentActivityCounts: coaching.training.recent7,
        recent28DayCounts: coaching.training.recent28,
        zoneMix: coaching.training.zoneMix,
        priorityCandidate: coaching.focus,
        latestSessionEffortClassification: coaching.training.latestEffort,
      },
    },
    reflections,
    runningDays: runPlan,
    priorOutputs: liveAnalysisHistory.slice(-3),
  };
}

function hasCompleteLiveAnalysis(analysis) {
  return analysis
    && typeof analysis.dailyGuidance?.title === "string"
    && Array.isArray(analysis.dailyHealth?.points)
    && analysis.runRecommendations && typeof analysis.runRecommendations === "object" && !Array.isArray(analysis.runRecommendations)
    && typeof analysis.workoutAnalysis?.title === "string"
    && typeof analysis.coachingFocus?.title === "string"
    && typeof analysis.weeklyReview?.title === "string"
    && Array.isArray(analysis.insightCards);
}

function cleanGeneratedText(value) {
  let cleaned = String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/<\|[^>]+\|>/g, "")
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^\s*[#*-]+\s*/g, "")
    .replace(/^\s*(?:[.•·]+(?=\s|[A-Za-z])|\d+\s*[:.)-])\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  cleaned = cleaned
    .replace(/^(?:weekly review|workout analysis|insight)\s*:\s*/i, "")
    .replace(/\bthe athlete needs\b/gi, "You need")
    .replace(/\bthe athlete\b/gi, "you");
  while (cleaned.startsWith("[") && cleaned.endsWith("]")) cleaned = cleaned.slice(1, -1).trim();
  const letters = cleaned.replace(/[^A-Za-z]/g, "");
  const uppercaseLetters = letters.replace(/[^A-Z]/g, "");
  if (letters.length > 24 && uppercaseLetters.length / letters.length > 0.88) {
    cleaned = cleaned.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
    cleaned = cleaned.replace(/\bben's\b/g, "Ben's").replace(/\bhr\b/g, "HR").replace(/\bytd\b/g, "YTD").replace(/\bvo₂\b/g, "VO₂");
  }
  if (cleaned.length > 120 && !/[.!?]$/.test(cleaned)) {
    const lastSentence = Math.max(cleaned.lastIndexOf(". "), cleaned.lastIndexOf("! "), cleaned.lastIndexOf("? "));
    if (lastSentence >= cleaned.length * 0.5) cleaned = cleaned.slice(0, lastSentence + 1);
  }
  return cleaned;
}

function normalizeCoachConfidence(value) {
  const cleaned = cleanGeneratedText(value);
  const numeric = Number.parseFloat(cleaned);
  if (/high|strong/i.test(cleaned) || (Number.isFinite(numeric) && numeric >= .8)) return "High confidence";
  if (/reasonable|medium|moderate/i.test(cleaned) || (Number.isFinite(numeric) && numeric >= .55)) return "Reasonable confidence";
  if (/low|limited|provisional/i.test(cleaned) || Number.isFinite(numeric)) return "Limited confidence";
  return cleaned && cleaned.length <= 28 ? cleaned : "Reasonable confidence";
}

function sanitizeGeneratedAnalysis(value) {
  if (Array.isArray(value)) return value.map(sanitizeGeneratedAnalysis);
  if (value && typeof value === "object") {
    const cleaned = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizeGeneratedAnalysis(item)]));
    if (cleaned.workoutAnalysis && cleaned.coachingFocus && cleaned.weeklyReview && cleaned.runRecommendations) {
      cleaned.workoutAnalysis.confidence = normalizeCoachConfidence(cleaned.workoutAnalysis.confidence);
      cleaned.coachingFocus.confidence = normalizeCoachConfidence(cleaned.coachingFocus.confidence);
      cleaned.weeklyReview.confidence = normalizeCoachConfidence(cleaned.weeklyReview.confidence);
      cleaned.coachingFocus.horizon = cleaned.coachingFocus.horizon && cleaned.coachingFocus.horizon.length <= 28
        ? cleaned.coachingFocus.horizon
        : "Next 1–2 weeks";
      Object.values(cleaned.runRecommendations).forEach((recommendation) => {
        recommendation.confidence = normalizeCoachConfidence(recommendation.confidence);
      });
    }
    return cleaned;
  }
  return typeof value === "string" ? cleanGeneratedText(value) : value;
}

function liveRecommendationForDate(date) {
  const slot = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][date.getDay()];
  return liveAnalysis?.runRecommendations?.[slot] || null;
}

function resolvedRunRecommendation(date, coaching = buildCoachingContext()) {
  if (workoutForDate(date).type !== "Run") return null;
  const generated = liveRecommendationForDate(date);
  if (generated) {
    return {
      ...generated,
      label: "AI Recommended",
      status: liveAnalysisState.status === "loading" ? "Updating analysis…" : generated.confidence,
      evidence: Array.isArray(generated.evidence) ? generated.evidence : [],
      prescription: Array.isArray(generated.prescription) ? generated.prescription : [],
    };
  }
  if (liveAnalysisState.status === "loading") {
    return {
      label: "AI Recommended",
      status: "Analyzing…",
      kind: "pending",
      title: "Coach is reading the current picture",
      summary: "Garmin, training history, recovery, weather, goals, and your reflections are being analyzed together.",
      prescription: ["Your static plan remains available while this finishes"],
      evidence: [],
      confidence: "Analyzing…",
    };
  }
  const fallback = buildAiRunRecommendation(date, coaching);
  return fallback ? {
    ...fallback,
    label: "Data fallback",
    status: liveAnalysisState.status === "error" ? "Live analysis unavailable" : "Awaiting live analysis",
  } : null;
}

async function requestLiveAnalysis(reason = "app load") {
  if (liveAnalysisRequest) return liveAnalysisRequest;
  if (!syncSettings.key || !hasHealthData()) {
    liveAnalysisState = { status: "unavailable", reason, error: "Garmin data or the private sync key is unavailable." };
    renderAllTracking();
    return false;
  }
  liveAnalysisState = { status: "loading", reason, error: "" };
  document.body.classList.add("analysis-loading");
  renderAllTracking();
  liveAnalysisRequest = (async () => {
    try {
      const contextJson = JSON.stringify(buildLiveAnalysisContext(reason));
      const timestamp = Date.now();
      const nonce = crypto.randomUUID();
      const signature = await signRefreshRequest(timestamp, nonce, contextJson);
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 70_000);
      let response;
      try {
        response = await fetch(LIVE_ANALYSIS_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ timestamp, nonce, signature, contextJson }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeoutId);
      }
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !hasCompleteLiveAnalysis(payload.analysis)) throw new Error(payload.error || "Live coaching analysis failed");
      liveAnalysis = {
        ...sanitizeGeneratedAnalysis(payload.analysis),
        _meta: { generatedAt: payload.generatedAt || new Date().toISOString(), model: payload.model || "Workers AI", reason },
      };
      writeJson(STORAGE.liveAnalysis, liveAnalysis);
      const snapshot = liveAnalysisSummary(liveAnalysis);
      if (snapshot) {
        liveAnalysisHistory = [...liveAnalysisHistory, snapshot].slice(-6);
        writeJson(STORAGE.liveAnalysisHistory, liveAnalysisHistory);
      }
      liveAnalysisState = { status: "ready", reason, error: "" };
      renderAllTracking();
      return true;
    } catch (error) {
      liveAnalysis = null;
      removeStored(STORAGE.liveAnalysis);
      liveAnalysisState = { status: "error", reason, error: error?.message || "Live coaching analysis is unavailable." };
      renderAllTracking();
      return false;
    } finally {
      document.body.classList.remove("analysis-loading");
      liveAnalysisRequest = null;
    }
  })();
  return liveAnalysisRequest;
}

function recommendedEasyHrRange(packet = privatePacket) {
  const health = packet.health || {};
  const references = packet.training?.analytics?.references || {};
  const resting = finiteNumber(references.restingHr ?? health.baselines?.restingHr7Day ?? health.restingHr);
  const max = finiteNumber(references.configuredMaxHr ?? ATHLETE_PROFILE.running.historicalMaxHr);
  if (!Number.isFinite(resting) || !Number.isFinite(max) || max <= resting) return ATHLETE_PROFILE.running.historicalZones.z2;
  const calculated = [Math.round(resting + .6 * (max - resting)), Math.round(resting + .7 * (max - resting))];
  return calculated;
}

function buildAiRunRecommendation(date = new Date(), coaching = buildCoachingContext(), packet = privatePacket, now = new Date()) {
  const workout = workoutForDate(date);
  if (workout.type !== "Run") return null;

  const training = coaching.training || {};
  const health = coaching.health || {};
  const targetKey = localDateKey(date);
  const todayKey = localDateKey(now);
  const sameDayRun = targetKey === todayKey && Array.isArray(packet.training?.activities)
    && packet.training.activities.some((activity) => activity?.date === targetKey && activityGroup(activity) === "run");
  const alreadyMarked = targetKey === todayKey && ["completed", "minimum"].includes(getOutcome(targetKey));
  const [easyLow, easyHigh] = recommendedEasyHrRange(packet);
  const easyGuardrail = `Keep breathing conversational; use ${easyLow}–${easyHigh} bpm as a loose wrist-HR guardrail, not a pace target.`;
  const latestDate = firstText(training.latestActivity?.date, training.latestActivity?.startTimeLocal)?.slice(0, 10);
  const daysSinceLatest = /^\d{4}-\d{2}-\d{2}$/.test(latestDate)
    ? Math.round((parseLocalDateKey(targetKey) - parseLocalDateKey(latestDate)) / 86400000)
    : NaN;
  const hardRunRecently = training.latestActivity && activityGroup(training.latestActivity) === "run"
    && ["hard", "very-hard"].includes(training.latestEffort?.level)
    && Number.isFinite(daysSinceLatest) && daysSinceLatest >= 0 && daysSinceLatest <= 2;
  const loadDemanding = training.overHardMileageCeiling
    || (Number.isFinite(training.loadBalance) && training.loadBalance > 1.35)
    || (Number.isFinite(training.form) && training.form < -10)
    || (Number.isFinite(training.loadChange) && training.loadChange > 40);
  const intensityNeedsEasy = ["hard-heavy", "middle-heavy"].includes(training.zoneRead?.state);
  const bikeLoadPresent = Number(training.recent7?.bike) >= 2;
  const learned = feedbackLearning(now);
  const latestBodyMindSignal = learned.latest?.bodySignal || "";
  const feedbackCaution = ["pain", "sick", "burnt-out", "fatigued"].includes(latestBodyMindSignal) || learned.lowFeel >= 2 || learned.highRpe >= 2;
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const provisional = (targetKey !== todayKey && date > startOfToday) || health.status === "incomplete";
  const confidence = coachingConfidence(coaching, training.latestActivity);
  const base = {
    label: "Data fallback",
    status: provisional ? "Provisional" : confidence.label,
    confidence: provisional ? "Provisional" : confidence.label,
    evidence: recommendationEvidence(coaching),
    source: `Coaching model v${COACHING_MODEL_VERSION} · Garmin + feedback + weather + ${COACHING_KNOWLEDGE.sources.length} trusted sources`,
    note: provisional ? "Uses the latest available data and updates again after the next Garmin refresh." : "Updates whenever Garmin and the coaching context refresh.",
  };

  if (sameDayRun || alreadyMarked) {
    return { ...base, kind: "complete", title: "Let today’s completed run stand", summary: "No second run is recommended. The useful move now is absorbing the work and returning to the normal schedule.", prescription: ["No make-up or bonus miles", "Use easy movement only if it sounds restorative"] };
  }
  if (health.status === "caution") {
    return { ...base, kind: "recovery", title: "Recovery run or full rest", summary: "Recovery is the clearest constraint today. Preserve the habit only if movement makes you feel better, not because the schedule needs to be defended.", prescription: ["20–30 minutes very easy, or choose intentional rest", easyGuardrail, "Stop if energy, breathing, or heart rate feels unusually off"] };
  }
  if (feedbackCaution) {
    const reason = latestBodyMindSignal === "pain"
      ? "Your latest reflection includes pain, which outweighs the schedule."
      : latestBodyMindSignal === "sick"
        ? "Your latest reflection says you feel sick, so training load is not the priority."
        : latestBodyMindSignal === "burnt-out"
          ? "Your latest reflection says you feel burnt out, which is a real training constraint."
          : latestBodyMindSignal === "fatigued"
            ? "Your latest reflection says you feel fatigued, so the next session should be inexpensive."
            : "Recent sessions have repeatedly felt harder than their planned cost.";
    return { ...base, kind: "recovery", title: "Keep this run deliberately low-cost", summary: `${reason} The coaching model is protecting repeatability until your next feedback says the pattern has settled.`, prescription: ["20–30 minutes very easy, or take intentional rest", easyGuardrail, "Add a short post-workout note so the next recommendation can respond"] };
  }
  if (loadDemanding) {
    return { ...base, kind: "recovery", title: "Short easy run—do not add load", summary: `Recent load is already high enough to create adaptation. ${historicalResponseCue(coaching, "load")}`, prescription: ["20–35 minutes easy", easyGuardrail, "No tempo, strides, fast finish, or catch-up miles"] };
  }
  if (bikeLoadPresent && date.getDay() === 6) {
    return { ...base, kind: "easy", title: "4 easy miles—let the bike load count", summary: historicalResponseCue(coaching, "cross-training"), prescription: ["Run 3–4 miles conversationally", easyGuardrail, "Skip tempo unless your legs feel unmistakably fresh after the first easy mile"] };
  }
  if (hardRunRecently) {
    return { ...base, kind: "easy", title: "Easy aerobic reset", summary: "The latest run already supplied the quality stimulus. This run should restore separation between hard and easy days.", prescription: ["3 relaxed miles, with 4 only if the effort stays easy", easyGuardrail, "No strides or fast finish"] };
  }
  if (date.getDay() === 0) {
    const distance = Number.isFinite(training.weeklyMiles) && training.weeklyMiles >= ATHLETE_PROFILE.running.sustainableWeeklyMiles[1] ? "3–4" : "5–6";
    return { ...base, kind: "long", title: `${distance} easy miles`, summary: distance === "5–6" ? "The long run is the most useful aerobic progression here, provided it stays repeatable and does not become a test." : "Weekly mileage is already at the top of your useful range, so the long-run benefit comes from easy duration rather than more distance.", prescription: [`Run ${distance} miles conversationally`, easyGuardrail, "Start the first mile deliberately easy and skip the fast finish"] };
  }
  if (date.getDay() === 6) {
    const qualityFits = health.status === "supportive"
      && !intensityNeedsEasy
      && Number.isFinite(training.runSessions7) && training.runSessions7 >= 3
      && (!Number.isFinite(training.loadChange) || (training.loadChange >= -20 && training.loadChange <= 25));
    if (qualityFits) {
      return { ...base, kind: "quality", title: "Controlled tempo—4 miles total", summary: `Recovery, recent frequency, load direction, and the year-to-date intensity mix leave room for one purposeful quality session. ${historicalResponseCue(coaching, "pacing")}`, prescription: ["1 mile deliberately easy", "2 × 10 minutes at controlled tempo with 2 minutes easy between", "Cool down easy to 4 miles total; finish with another rep available"] };
    }
    return { ...base, kind: "easy", title: "4 easy miles—skip tempo today", summary: intensityNeedsEasy ? "Your longer-term zone distribution already contains enough moderate-hard work. The higher-value stimulus is another truly easy aerobic run." : "The current combination of frequency, load, and recovery does not make added intensity the best trade today.", prescription: ["Run 4 miles conversationally", easyGuardrail, "Finish with enough left to repeat the schedule tomorrow"] };
  }
  const distance = training.runSessions7 < 3 ? "3" : "3–4";
  return { ...base, kind: "easy", title: `${distance} easy miles`, summary: training.runSessions7 < 3 ? "Run frequency is the short-term opportunity. A low-cost aerobic deposit is more valuable than making this session impressive." : "This keeps aerobic work repeatable while preserving the week’s single quality option and strength sessions.", prescription: [`Run ${distance} miles conversationally`, easyGuardrail, "No pace target and no make-up mileage"] };
}

function runRecommendationMarkup(recommendation, compact = false) {
  if (!recommendation) return "";
  const prescription = Array.isArray(recommendation.prescription) ? recommendation.prescription : [];
  const evidence = Array.isArray(recommendation.evidence) ? recommendation.evidence : [];
  return `<div class="ai-run-heading"><span>${escapeHtml(recommendation.label)}</span><small>${escapeHtml(recommendation.status)}</small></div>
    <div class="ai-run-content">
      <div><h3>${escapeHtml(recommendation.title)}</h3><p>${escapeHtml(recommendation.summary)}</p></div>
      <ol>${prescription.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </div>
    ${compact || !evidence.length ? "" : `<div class="ai-run-evidence">${evidence.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`}`;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, Ben.";
  if (hour < 18) return "Good afternoon, Ben.";
  return "Good evening, Ben.";
}

function iconMarkup(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
}

function renderNavigation() {
  const markup = NAV_ITEMS.map(
    (item) => `<button class="nav-button ${currentView === item.id ? "active" : ""}" data-view="${item.id}" type="button"><span class="nav-icon">${iconMarkup(item.icon)}</span><span class="nav-label">${item.label}</span></button>`,
  ).join("");
  document.getElementById("desktopNav").innerHTML = markup;
  document.getElementById("mobileBottomNav").innerHTML = markup;
}

function navigate(view) {
  if (!NAV_ITEMS.some((item) => item.id === view)) return;
  currentView = view;
  document.querySelectorAll(".page-view").forEach((element) => element.classList.toggle("active", element.id === `view-${view}`));
  const title = view === "today" ? greeting() : NAV_ITEMS.find((item) => item.id === view).label;
  document.getElementById("pageTitle").textContent = title;
  renderNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDateHeader() {
  const now = new Date();
  document.getElementById("todayLabel").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  if (currentView === "today") document.getElementById("pageTitle").textContent = greeting();
}

function getOutcome(key) {
  const entry = completions[key];
  return typeof entry === "string" ? entry : entry?.status || "";
}

function setTodayOutcome(status) {
  const key = localDateKey();
  const previousStatus = getOutcome(key);
  completions[key] = { status, updatedAt: new Date().toISOString(), source: "manual" };
  writeJson(STORAGE.completions, completions);
  renderAllTracking();
  const becameActive = (status === "completed" || status === "minimum") && previousStatus !== "completed" && previousStatus !== "minimum";
  if (becameActive) celebrateCompletion(document.querySelector(".completion-button"));
  showToast(status === "rest" ? "Intentional rest recorded. No catching up required." : status === "minimum" ? "Minimum version counted. You showed up." : "Workout marked complete.");
}

function clearTodayOutcome() {
  const key = localDateKey();
  if (privatePacket.training?.activities?.some((activity) => activity?.date === key)) {
    completions[key] = { status: "", updatedAt: new Date().toISOString(), suppressGarmin: true };
  } else {
    delete completions[key];
  }
  writeJson(STORAGE.completions, completions);
  renderAllTracking();
  showToast("Today's mark was cleared.");
}

function renderTodayWorkout(coaching = buildCoachingContext()) {
  const now = new Date();
  const workout = workoutForDate(now);
  const status = getOutcome(localDateKey(now));
  const recommendation = resolvedRunRecommendation(now, coaching);
  if (recommendation?.kind !== "pending") rememberRecommendation(now, recommendation);
  const recommendationElement = document.getElementById("todayAiRunRecommendation");
  const staticCaption = document.getElementById("todayStaticPlanCaption");
  recommendationElement.hidden = !recommendation;
  recommendationElement.innerHTML = recommendation ? runRecommendationMarkup(recommendation) : "";
  staticCaption.hidden = !recommendation;
  document.getElementById("todayDayPill").textContent = workout.day;
  document.getElementById("todayDuration").textContent = workout.duration;
  document.getElementById("todayHeading").textContent = workout.title;
  document.getElementById("todaySummary").textContent = workout.summary;
  document.getElementById("todayExercisePreview").innerHTML = workout.main.slice(0, 4).map((item) => `<span>${escapeHtml(item.split("—")[0].trim())}</span>`).join("");
  document.getElementById("todayMainWork").innerHTML = workout.main.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("todayMinimumWork").innerHTML = workout.minimum.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  document.getElementById("todayOptionalWork").innerHTML = workout.optional.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  document.querySelectorAll("[data-completion]").forEach((button) => button.classList.toggle("selected", button.dataset.completion === status));
  const completeButton = document.querySelector(".completion-button");
  const strong = completeButton.querySelector("strong");
  const small = completeButton.querySelector("small");
  if (status) {
    strong.textContent = OUTCOME_LABELS[status];
    small.textContent = "Today is recorded";
  } else {
    strong.textContent = "Complete workout";
    small.textContent = "Mark today as done";
  }
  document.getElementById("clearTodayOutcome").hidden = !status;
}

function entriesForMonth(date = new Date()) {
  const prefix = `${monthKey(date)}-`;
  return Object.entries(completions).filter(([key]) => key.startsWith(prefix));
}

function monthStats(date = new Date()) {
  const entries = entriesForMonth(date);
  const counts = { completed: 0, minimum: 0, rest: 0 };
  entries.forEach(([key]) => {
    const status = getOutcome(key);
    if (status in counts) counts[status] += 1;
  });
  return { ...counts, active: counts.completed + counts.minimum, intentional: entries.length };
}

function yearStats(year = new Date().getFullYear()) {
  const counts = { completed: 0, minimum: 0, rest: 0 };
  Object.keys(completions).forEach((key) => {
    if (!key.startsWith(`${year}-`)) return;
    const status = getOutcome(key);
    if (status in counts) counts[status] += 1;
  });
  return { ...counts, active: counts.completed + counts.minimum };
}

function renderYearCounter() {
  const now = new Date();
  const year = now.getFullYear();
  const totalDays = Math.round((new Date(year + 1, 0, 1) - new Date(year, 0, 1)) / 86400000);
  const firstDay = new Date(year, 0, 1).getDay();
  const cells = Array.from({ length: firstDay }, () => '<span class="year-dot blank" aria-hidden="true"></span>');
  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(year, 0, day);
    const key = localDateKey(date);
    const status = getOutcome(key);
    const classes = ["year-dot", status === "completed" ? "complete" : status, key === localDateKey(now) ? "today" : "", date > now ? "future" : ""].filter(Boolean).join(" ");
    const label = `${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}: ${status ? OUTCOME_LABELS[status] : date > now ? "Upcoming" : "Not checked"}`;
    cells.push(`<span class="${classes}" title="${escapeHtml(label)}" aria-hidden="true"></span>`);
  }
  while (cells.length % 7) cells.push('<span class="year-dot blank" aria-hidden="true"></span>');
  const stats = yearStats(year);
  document.getElementById("yearCounterTitle").textContent = year;
  document.getElementById("yearActiveCount").textContent = stats.active;
  document.getElementById("yearCounterMessage").textContent = stats.active
    ? `${stats.active} workout${stats.active === 1 ? "" : "s"} completed.`
    : "The first check is waiting.";
  document.getElementById("yearDotGrid").innerHTML = cells.join("");
  document.getElementById("monthActiveCount").textContent = monthStats(now).active;
}

function haptic(pattern = [18, 30, 24]) {
  try {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    // Visual feedback remains available when vibration is unsupported.
  }
}

function celebrateCompletion(target) {
  haptic();
  const button = target?.closest?.(".completion-button") || document.querySelector(".completion-button");
  const card = document.getElementById("yearCounterCard");
  const count = document.getElementById("yearActiveCount");
  [button, card, count].forEach((element) => {
    if (!element) return;
    const className = element === button ? "celebrate" : element === card ? "is-celebrating" : "count-pop";
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), 900);
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.className = "celebration-layer";
  layer.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 18; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 18;
    const distance = 85 + (index % 5) * 14;
    particle.className = "celebration-particle";
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-rotate", `${120 + index * 23}deg`);
    particle.style.setProperty("--particle-hue", String(165 + (index % 5) * 28));
    particle.style.setProperty("--particle-delay", `${(index % 4) * 18}ms`);
    layer.appendChild(particle);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1000);
}

function toggleDateCompletion(key, target) {
  const date = parseLocalDateKey(key);
  const today = parseLocalDateKey(localDateKey());
  if (date > today) return;
  const previousStatus = getOutcome(key);
  const wasActive = previousStatus === "completed" || previousStatus === "minimum";
  if (wasActive) {
    if (privatePacket.training?.activities?.some((activity) => activity?.date === key)) {
      completions[key] = { status: "", updatedAt: new Date().toISOString(), suppressGarmin: true };
    } else {
      delete completions[key];
    }
  } else {
    completions[key] = { status: "completed", updatedAt: new Date().toISOString(), source: "manual" };
  }
  writeJson(STORAGE.completions, completions);
  renderAllTracking();
  if (wasActive) {
    showToast("Day mark cleared.");
  } else {
    celebrateCompletion(target);
    showToast("Day checked off.");
  }
}

function renderPlan(coaching = buildCoachingContext()) {
  const todayIndex = new Date().getDay();
  document.getElementById("weekPlan").innerHTML = WEEK.map((workout, index) => {
    const open = index === todayIndex;
    const recommendation = workout.type === "Run" ? resolvedRunRecommendation(dateForPlanningWeekday(index), coaching) : null;
    const detail = (label, items) => `<div class="plan-detail-block"><strong>${label}</strong><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
    return `<article class="plan-day ${open ? "is-today open" : ""}" data-plan-day="${index}">
      <button class="plan-day-button" type="button" aria-expanded="${open}">
        <span class="plan-day-name"><strong>${workout.short}</strong><span>${workout.type}</span></span>
        <span class="plan-day-copy"><strong>${escapeHtml(workout.title)}</strong><span>${escapeHtml(workout.subtitle)}</span>${recommendation ? `<em>${escapeHtml(recommendation.label)} available</em>` : ""}</span>
        <span class="plan-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9.5 6 6 6-6 6"></path></svg></span>
      </button>
      <div class="plan-day-detail">${recommendation ? `<section class="ai-plan-recommendation">${runRecommendationMarkup(recommendation, true)}</section><div class="static-plan-divider"><span>Your static plan</span></div>` : ""}${detail("Main work", workout.main)}${detail("Minimum", workout.minimum)}${detail("Optional", workout.optional)}</div>
    </article>`;
  }).join("");
}

function renderProgress(coaching = buildCoachingContext()) {
  const date = calendarCursor;
  const stats = monthStats(date);
  const now = new Date();
  const annual = yearStats(now.getFullYear());
  const monthLabel = date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  document.getElementById("progressMonthLabel").textContent = `${now.getFullYear()} cumulative total`;
  document.getElementById("progressActiveDays").textContent = annual.active;
  document.getElementById("fullCount").textContent = annual.completed;
  document.getElementById("minimumCount").textContent = annual.minimum;
  document.getElementById("restCount").textContent = annual.rest;
  document.getElementById("progressMessage").textContent = stats.active
    ? `${stats.active} checked off in ${monthLabel}. Tap any past day to adjust it.`
    : `No days checked off in ${monthLabel}. Tap any past day to add one.`;
  document.getElementById("calendarMonthTitle").textContent = monthLabel;

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const todayKey = localDateKey();
  const cells = Array.from({ length: firstDay }, () => '<span class="calendar-day blank"></span>');
  for (let day = 1; day <= days; day += 1) {
    const cellDate = new Date(date.getFullYear(), date.getMonth(), day);
    const key = localDateKey(cellDate);
    const status = getOutcome(key);
    const classes = ["calendar-day", status === "completed" ? "complete" : status, key === todayKey ? "today" : "", cellDate > now ? "future" : ""].filter(Boolean).join(" ");
    const state = status ? OUTCOME_LABELS[status] : "Not checked";
    cells.push(`<button class="${classes}" type="button" data-date="${key}" aria-label="${escapeHtml(`${monthLabel} ${day}: ${state}`)}" ${cellDate > now ? "disabled" : ""}>${day}${status ? '<i class="status-mark"></i>' : ""}</button>`);
  }
  document.getElementById("consistencyCalendar").innerHTML = cells.join("");
  renderLastGarminActivity();
  renderWorkoutFeedback();
  renderWorkoutAnalysis(coaching);
  renderYtdHrZones();
}

function renderLastGarminActivity() {
  const container = document.getElementById("lastGarminActivity");
  if (!container) return;
  const training = privatePacket.training || {};
  const activity = training.lastWorkoutDetail && typeof training.lastWorkoutDetail === "object" ? training.lastWorkoutDetail : {};
  const name = firstText(activity.name, training.lastWorkout);
  if (!name) {
    container.innerHTML = '<div class="empty-state">Your latest Garmin workout will appear after the next sync.</div>';
    return;
  }

  const distance = Number(activity.distanceMiles);
  const durationMinutes = Number(activity.durationMinutes);
  const duration = formatActivityDuration(durationMinutes);
  const hasDistance = Number.isFinite(distance) && distance > 0;
  const averageHr = Number(activity.averageHr ?? activity.averageHR);
  const maxHr = Number(activity.maxHr ?? activity.maxHR ?? activity.maximumHr ?? activity.maximumHR);
  const recordedPace = Number(activity.averagePaceMinutesPerMile);
  const paceFromDuration = hasDistance && Number.isFinite(durationMinutes) && durationMinutes > 0 ? durationMinutes / distance : NaN;
  const averageSpeedMps = Number(activity.averageSpeedMps ?? activity.averageSpeed);
  const paceFromSpeed = Number.isFinite(averageSpeedMps) && averageSpeedMps > 0 ? 1609.344 / averageSpeedMps / 60 : NaN;
  const averagePace = [recordedPace, paceFromDuration, paceFromSpeed].find((value) => Number.isFinite(value) && value > 0);
  const primaryValue = hasDistance ? `${distance.toFixed(2)} mi` : (duration || activityTypeLabel(activity.type));
  const primaryLabel = hasDistance ? "distance" : (duration ? "duration" : "activity");
  const stats = [
    hasDistance && duration ? { label: "Duration", value: duration } : null,
    Number.isFinite(averageHr) ? { label: "Average HR", value: `${Math.round(averageHr)} bpm` } : null,
    { label: "Max HR", value: Number.isFinite(maxHr) ? `${Math.round(maxHr)} bpm` : "—" },
    hasDistance ? { label: "Average pace", value: averagePace ? formatActivityPace(averagePace) : "—" } : null,
    hasValue(activity.calories) ? { label: "Calories", value: `${Math.round(Number(activity.calories))}` } : null,
    hasValue(activity.elevationGainFeet) && Number(activity.elevationGainFeet) > 0 ? { label: "Elevation gain", value: `${Math.round(Number(activity.elevationGainFeet))} ft` } : null,
    hasValue(activity.aerobicEffect) ? { label: "Aerobic effect", value: Number(activity.aerobicEffect).toFixed(1) } : null,
    hasValue(activity.anaerobicEffect) ? { label: "Anaerobic effect", value: Number(activity.anaerobicEffect).toFixed(1) } : null,
    hasValue(activity.averageCadence) && Number(activity.averageCadence) > 0 ? { label: "Avg cadence", value: `${Math.round(Number(activity.averageCadence))} spm` } : null,
    hasValue(activity.vo2Max) ? { label: "VO₂ max", value: Number(activity.vo2Max).toFixed(0) } : null,
    activity.weather && weatherSummary(activity.weather) ? { label: "Conditions", value: weatherSummary(activity.weather) } : null,
  ].filter((item) => item && item.value);
  const workoutHrZones = hrZoneBreakdownMarkup(activity.hrZones, "workout");

  container.innerHTML = `<div class="latest-activity-hero">
    <div class="latest-activity-title"><span>${escapeHtml(formatActivityDate(activity))}</span><h4>${escapeHtml(name)}</h4><small>${escapeHtml(activityTypeLabel(activity.type))}</small></div>
    <div class="latest-activity-primary"><strong>${escapeHtml(primaryValue)}</strong><span>${escapeHtml(primaryLabel)}</span></div>
  </div>
  ${stats.length ? `<div class="activity-stat-grid">${stats.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join("")}</div>` : ""}
  ${workoutHrZones}`;
}

function latestWorkoutDetail() {
  const detail = privatePacket.training?.lastWorkoutDetail;
  return detail && typeof detail === "object" ? detail : null;
}

function renderWorkoutFeedback() {
  const form = document.getElementById("workoutFeedbackForm");
  if (!form) return;
  const activity = latestWorkoutDetail();
  const controls = ["feedbackRpe", "feedbackFeel", "feedbackEnjoyment", "feedbackBodySignal", "feedbackIntent", "feedbackPlanChoice", "feedbackNote"];
  if (!activity) {
    controls.forEach((id) => { const element = document.getElementById(id); element.value = ""; element.disabled = true; });
    document.getElementById("feedbackSavedState").textContent = "Waiting for Garmin";
    return;
  }
  controls.forEach((id) => { document.getElementById(id).disabled = false; });
  const feedback = feedbackForActivity(activity) || {};
  document.getElementById("feedbackRpe").value = feedback.rpe || "";
  document.getElementById("feedbackFeel").value = feedback.feel || "";
  document.getElementById("feedbackEnjoyment").value = feedback.enjoyment || "";
  document.getElementById("feedbackBodySignal").value = feedback.bodySignal || "";
  document.getElementById("feedbackIntent").value = feedback.intent || "";
  document.getElementById("feedbackPlanChoice").value = feedback.planChoice || "";
  document.getElementById("feedbackNote").value = feedback.note || "";
  document.getElementById("feedbackSavedState").textContent = feedback.updatedAt ? "Saved" : "Not required";
}

async function saveWorkoutFeedback(event) {
  event.preventDefault();
  const activity = latestWorkoutDetail();
  if (!activity) return;
  const key = activityFeedbackKey(activity);
  const feedback = {
    activityId: key,
    date: activity.date || "",
    name: activity.name || activity.type || "Workout",
    rpe: document.getElementById("feedbackRpe").value,
    feel: document.getElementById("feedbackFeel").value,
    enjoyment: document.getElementById("feedbackEnjoyment").value,
    bodySignal: document.getElementById("feedbackBodySignal").value,
    intent: document.getElementById("feedbackIntent").value,
    planChoice: document.getElementById("feedbackPlanChoice").value,
    note: document.getElementById("feedbackNote").value.trim(),
    recommendation: recommendationHistory[activity.date] || null,
    updatedAt: new Date().toISOString(),
  };
  const hasInput = [feedback.rpe, feedback.feel, feedback.enjoyment, feedback.bodySignal, feedback.intent, feedback.planChoice, feedback.note].some(Boolean);
  if (hasInput) workoutFeedback[key] = feedback;
  else delete workoutFeedback[key];
  writeJson(STORAGE.feedback, workoutFeedback);
  haptic([10]);
  showToast(hasInput ? "Reflection saved. Coach is analyzing it…" : "Reflection cleared. Coach is updating…");
  const analyzed = await requestLiveAnalysis(hasInput ? "workout reflection saved" : "workout reflection cleared");
  showToast(analyzed ? "Fresh coaching analysis is ready." : "Reflection saved. Live analysis is unavailable right now.");
}

async function clearWorkoutFeedback() {
  const activity = latestWorkoutDetail();
  if (!activity) return;
  delete workoutFeedback[activityFeedbackKey(activity)];
  writeJson(STORAGE.feedback, workoutFeedback);
  showToast("Reflection cleared. Coach is updating…");
  const analyzed = await requestLiveAnalysis("workout reflection cleared");
  showToast(analyzed ? "Coaching analysis updated." : "Reflection cleared. Live analysis is unavailable right now.");
}

function workoutEffortRead(activity, training, health) {
  const aerobicEffect = hasValue(activity.aerobicEffect) ? Number(activity.aerobicEffect) : NaN;
  if (Number.isFinite(aerobicEffect)) {
    if (aerobicEffect >= 4.3) return { level: "very-hard", label: "Very demanding aerobic stimulus", evidence: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}` };
    if (aerobicEffect >= 3.5) return { level: "hard", label: "Strong aerobic development", evidence: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}` };
    if (aerobicEffect >= 2.5) return { level: "building", label: "Productive aerobic work", evidence: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}` };
    if (aerobicEffect >= 1.5) return { level: "maintaining", label: "Aerobic maintenance", evidence: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}` };
    return { level: "light", label: "Light training stimulus", evidence: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}` };
  }

  const averageHrRaw = activity.averageHr ?? activity.averageHR;
  const restingHrRaw = training.analytics?.references?.restingHr ?? health.baselines?.restingHr7Day ?? health.restingHr;
  const observedMaxHrRaw = training.analytics?.references?.configuredMaxHr ?? ATHLETE_PROFILE.running.historicalMaxHr;
  const averageHr = hasValue(averageHrRaw) ? Number(averageHrRaw) : NaN;
  const restingHr = hasValue(restingHrRaw) ? Number(restingHrRaw) : NaN;
  const observedMaxHr = hasValue(observedMaxHrRaw) ? Number(observedMaxHrRaw) : NaN;
  const reserveFraction = Number.isFinite(averageHr) && averageHr > restingHr && Number.isFinite(restingHr) && restingHr > 0 && Number.isFinite(observedMaxHr) && observedMaxHr > restingHr
    ? (averageHr - restingHr) / (observedMaxHr - restingHr)
    : NaN;
  if (Number.isFinite(reserveFraction)) {
    if (reserveFraction >= .8) return { level: "hard", label: "High cardiovascular demand", evidence: `${Math.round(reserveFraction * 100)}% of working heart-rate reserve` };
    if (reserveFraction >= .7) return { level: "building", label: "Moderate-to-hard cardiovascular work", evidence: `${Math.round(reserveFraction * 100)}% of working heart-rate reserve` };
    if (reserveFraction >= .58) return { level: "maintaining", label: "Steady aerobic work", evidence: `${Math.round(reserveFraction * 100)}% of working heart-rate reserve` };
    return { level: "light", label: "Low cardiovascular load", evidence: `${Math.round(reserveFraction * 100)}% of working heart-rate reserve` };
  }
  return { level: "unknown", label: "Completed training exposure", evidence: "Workout duration and completion" };
}

function buildWorkoutAnalysis(activity, training, health, coaching = buildCoachingContext()) {
  const type = String(activity.type || "").toLowerCase();
  const name = firstText(activity.name, training.lastWorkout, activityTypeLabel(type));
  const isRun = type.includes("run") || /run/i.test(name);
  const isRide = type.includes("cycl") || type.includes("bike") || /ride|cycling|bike/i.test(name);
  const isStrength = type.includes("strength") || /strength|lift|weight/i.test(name);
  const durationMinutes = Number(activity.durationMinutes);
  const averageHrRaw = activity.averageHr ?? activity.averageHR;
  const maxHrRaw = activity.maxHr ?? activity.maxHR ?? activity.maximumHr ?? activity.maximumHR;
  const averageHr = hasValue(averageHrRaw) ? Number(averageHrRaw) : NaN;
  const maxHr = hasValue(maxHrRaw) ? Number(maxHrRaw) : NaN;
  const aerobicEffect = hasValue(activity.aerobicEffect) ? Number(activity.aerobicEffect) : NaN;
  const effort = workoutEffortRead(activity, training, health);
  const weeklyLoad = training.weeklyLoad || {};
  const references = training.analytics?.references || {};
  const current = training.analytics?.current || {};
  const loadChange = hasValue(weeklyLoad.distanceChangePct) ? Number(weeklyLoad.distanceChangePct) : NaN;
  const form = hasValue(current.form) ? Number(current.form) : NaN;
  const ramp = hasValue(current.ramp7Day) ? Number(current.ramp7Day) : NaN;
  const restingHrRaw = references.restingHr ?? health.baselines?.restingHr7Day ?? health.restingHr;
  const observedMaxHrRaw = references.configuredMaxHr ?? ATHLETE_PROFILE.running.historicalMaxHr;
  const restingHr = hasValue(restingHrRaw) ? Number(restingHrRaw) : NaN;
  const observedMaxHr = hasValue(observedMaxHrRaw) ? Number(observedMaxHrRaw) : NaN;
  const reserveFraction = Number.isFinite(averageHr) && Number.isFinite(restingHr) && Number.isFinite(observedMaxHr) && averageHr > restingHr && observedMaxHr > restingHr
    ? (averageHr - restingHr) / (observedMaxHr - restingHr)
    : NaN;
  const sessionMaxFraction = Number.isFinite(averageHr) && Number.isFinite(maxHr) && maxHr > 0 ? averageHr / maxHr : NaN;
  const calculatedEasyLow = Number.isFinite(restingHr) && Number.isFinite(observedMaxHr) && observedMaxHr > restingHr ? Math.round(restingHr + .6 * (observedMaxHr - restingHr)) : NaN;
  const calculatedEasyHigh = Number.isFinite(restingHr) && Number.isFinite(observedMaxHr) && observedMaxHr > restingHr ? Math.round(restingHr + .7 * (observedMaxHr - restingHr)) : NaN;
  const easyLow = Number.isFinite(calculatedEasyLow) ? calculatedEasyLow : ATHLETE_PROFILE.running.historicalZones.z2[0];
  const easyHigh = Number.isFinite(calculatedEasyHigh) ? calculatedEasyHigh : ATHLETE_PROFILE.running.historicalZones.z2[1];
  const hardRun = isRun && (["very-hard", "hard"].includes(effort.level) || reserveFraction >= .8 || sessionMaxFraction >= .89);
  const moderateRun = isRun && !hardRun && (effort.level === "building" || reserveFraction >= .7 || sessionMaxFraction >= .84);
  const workoutZones = normalizeHrZones(activity.hrZones);
  const workoutHardPct = workoutZones
    ? workoutZones.zones.filter((zone) => zone.zone >= 4).reduce((sum, zone) => sum + zone.percent, 0)
    : NaN;
  const feedback = feedbackForActivity(activity);
  const activityDate = /^\d{4}-\d{2}-\d{2}$/.test(activity.date || "") ? parseLocalDateKey(activity.date) : null;
  const scheduled = activityDate ? workoutForDate(activityDate) : null;
  const inferredIntent = feedback?.intent || (isRun ? (scheduled?.type !== "Run" ? "unplanned run" : activityDate?.getDay() === 0 ? "long" : activityDate?.getDay() === 6 ? "quality-or-easy" : "easy") : isRide ? "cross-training" : isStrength ? "strength" : "other");
  const performedIntent = isRun ? (hardRun ? "quality" : moderateRun ? "steady / moderate" : activityDate?.getDay() === 0 ? "easy long" : "easy") : isRide ? "cross-training" : isStrength ? "strength" : "other";
  const weather = activity.weather && typeof activity.weather === "object" ? activity.weather : null;
  const conditions = weatherSummary(weather);
  const heatAffected = weather?.heatLoad === "high" || weather?.heatLoad === "moderate";
  const confidence = coachingConfidence(coaching, activity);

  let title;
  let body;
  let impact;
  let next;
  let signals = [];

  if (isRun) {
    if (hardRun && heatAffected && ["easy", "long", "recovery"].includes(inferredIntent)) title = "The conditions raised the cost above the intended easy run";
    else if (hardRun) title = "This was a quality workout, not an easy aerobic run";
    else if (moderateRun) title = "This run landed in the middle: useful, but too hard to count as easy";
    else title = "This intensity is suitable for rebuilding your aerobic base";

    const bodyMindSignal = BODY_MIND_SIGNAL_META[feedback?.bodySignal];
    body = hardRun && heatAffected
      ? "Heat raised the cardiovascular cost. Treat this as the week’s quality run even though the intended effort was easier; your history shows this is a recurring response to hot, humid conditions."
      : hardRun
        ? "The effort data classifies this as quality work. It should occupy the hard-running slot for the week."
        : moderateRun
          ? "Useful steady work, but too costly to count as a genuinely easy run."
          : "A repeatable aerobic effort that supports your current fitness goal without demanding extra recovery.";
    signals = [
      {
        label: "Effort",
        value: effort.label,
        detail: [Number.isFinite(averageHr) ? `${Math.round(averageHr)} avg HR` : "", Number.isFinite(aerobicEffect) ? `${aerobicEffect.toFixed(1)} aerobic effect` : ""].filter(Boolean).join(" · "),
      },
      Number.isFinite(workoutHardPct) ? { label: "High-zone time", value: `${workoutHardPct.toFixed(0)}% in Z4–5`, detail: "of zoned workout time" } : null,
      conditions ? { label: "Conditions", value: conditions, detail: heatAffected ? "meaningful heat cost" : "not the main limiter" } : null,
      bodyMindSignal && feedback.bodySignal !== "normal" ? { label: "Your signal", value: bodyMindSignal.label, detail: "included in the coaching read" } : null,
    ].filter(Boolean);

    if (Number.isFinite(loadChange) && loadChange <= -30) {
      impact = "Your limiter is repeatable easy volume, not intensity. Rebuild frequency before adding more hard work.";
    } else if (Number.isFinite(loadChange) && loadChange >= 30) {
      impact = `Mileage is already up ${Math.round(loadChange)}%. Let that increase settle before adding another hard stimulus.`;
    } else {
      impact = hardRun || moderateRun
        ? "This fills the quality bucket. Comfortable six-mile fitness now depends on keeping the surrounding runs genuinely easy."
        : "This is the low-cost aerobic work that can be repeated and gradually extended toward comfortable six-mile runs.";
    }
    if (Number.isFinite(form) && form > 2 && Number.isFinite(ramp) && ramp < 0) {
      impact += " Current freshness comes partly from lighter load, not a need for more intensity.";
    }
    if (coaching.training.zoneMix && hardRun && coaching.training.zoneMix.hard >= 20) {
      impact += ` Z4–5 already makes up ${coaching.training.zoneMix.hard.toFixed(0)}% of year-to-date zoned time.`;
    } else if (coaching.training.zoneMix && !hardRun && coaching.training.zoneMix.hard >= 20) {
      impact += " This lower-cost session helps correct a year-to-date intensity mix that already contains plenty of hard work.";
    }

    const easyGuardrail = Number.isFinite(easyLow) && Number.isFinite(easyHigh) ? `${easyLow}–${easyHigh} bpm` : "conversational effort";
    if (coaching.health.status === "caution") {
      next = `Use the minimum version or intentional rest. Keep any running near ${easyGuardrail}.`;
    } else if (hardRun) {
      next = `Next run: 3–4 conversational miles near ${easyGuardrail}. Slow or walk if heart rate climbs; no second tempo effort.`;
    } else if (moderateRun) {
      next = `Make the next run clearly easier—around ${easyGuardrail}—and finish with enough left to run again on schedule.`;
    } else if (Number.isFinite(loadChange) && loadChange <= -30) {
      next = `Repeat 3–4 easy miles on schedule near ${easyGuardrail}. Frequency is the progression right now.`;
    } else {
      next = `Repeat this effort and extend distance gradually. Keep ${easyGuardrail} as a loose guardrail.`;
    }
    if (heatAffected) next += " In similar heat, slow down early rather than chasing a cool-weather pace.";
    if (feedback?.bodySignal === "pain") next = "Do not progress this session. Use pain-free movement only and reassess before the next demanding workout.";
    else if (feedback?.bodySignal === "sick") next = "Skip the next workout while you feel sick. Resume with an easy or minimum version only after normal daily activity feels normal again.";
    else if (feedback?.bodySignal === "burnt-out") next = "Take pressure off the next session: choose intentional rest or a genuinely enjoyable, low-cost option. Do not use catch-up work to rebuild motivation.";
    else if (feedback?.bodySignal === "fatigued") next = "Keep the next session deliberately easy or use the minimum version. Let normal energy return before adding distance or intensity.";
  } else if (isRide) {
    const hardRide = ["very-hard", "hard"].includes(effort.level);
    title = hardRide ? "This ride became a quality cardio session" : "This ride preserved aerobic work without adding running impact";
    body = `${effort.evidence}. ${hardRide ? "Treat the cardiovascular cost like a hard run even though the mechanical load was lower." : "That makes it useful when running is unavailable or your legs need less impact."}`;
    impact = "The bike supports aerobic continuity, but your history shows that frequent or hard riding can still create enough leg fatigue to affect the next run.";
    next = hardRide ? "Keep the next cardio session easy and return to running only when the legs feel normal." : "Return to the fixed run schedule without adding make-up mileage.";
    signals = [{ label: "Effort", value: effort.label, detail: effort.evidence }];
  } else if (isStrength) {
    title = "The value of this lift is what it lets you repeat next week";
    body = Number.isFinite(durationMinutes) && durationMinutes > 0 ? `This was ${formatActivityDuration(durationMinutes)} of strength work. Garmin heart-rate load cannot tell whether the sets were effective, so the analysis should not pretend it can.` : "Garmin heart-rate data cannot judge rep quality, proximity to failure, or whether the target muscles did the work.";
    impact = "For arm growth and general strength, consistent pain-free sets and gradual progression matter more than a single session's calorie or heart-rate total.";
    next = "Keep painful pulling out, note whether reps or load improved, and leave enough margin to complete the next scheduled session.";
    signals = [{ label: "Session", value: Number.isFinite(durationMinutes) ? formatActivityDuration(durationMinutes) : "Completed", detail: "strength work" }];
  } else {
    title = "This workout counts, but Garmin does not provide enough context for a strong coaching verdict";
    body = `${effort.evidence}. The available fields describe cardiovascular demand, not whether the session matched its intended purpose.`;
    impact = "The useful question is whether this supported consistency without interfering with the next planned run or lift.";
    next = "Follow the fixed schedule and use soreness, pain, and motivation—not the calorie number—to choose the full or minimum version.";
    signals = [{ label: "Effort", value: effort.label, detail: effort.evidence }];
  }

  return {
    title,
    body,
    effect: impact,
    next,
    signals,
    intent: `${inferredIntent} → ${performedIntent}`,
    confidence: confidence.label,
  };
}

function renderWorkoutAnalysis(coaching = buildCoachingContext()) {
  const title = document.getElementById("workoutAnalysisTitle");
  if (!title) return;
  const training = privatePacket.training || {};
  const activity = training.lastWorkoutDetail && typeof training.lastWorkoutDetail === "object" ? training.lastWorkoutDetail : null;
  if (!activity || !firstText(activity.name, training.lastWorkout)) {
    title.textContent = "Waiting for your latest workout";
    document.getElementById("workoutAnalysisBody").textContent = "The session read will appear after Garmin has synced an activity.";
    document.getElementById("workoutAnalysisEffect").textContent = "Waiting for workout data";
    document.getElementById("workoutAnalysisNext").textContent = "Follow the fixed plan";
    document.getElementById("workoutAnalysisStatus").textContent = "Pending";
    document.getElementById("workoutAnalysisIntent").textContent = "Waiting for workout data";
    document.getElementById("workoutAnalysisConfidence").textContent = "Limited context";
    document.getElementById("workoutAnalysisSignals").innerHTML = "";
    return;
  }
  const generated = hasCompleteLiveAnalysis(liveAnalysis) ? liveAnalysis.workoutAnalysis : null;
  const analysis = generated || (liveAnalysisState.status === "loading" ? {
    title: "Coach is analyzing the latest workout",
    body: "Workout intent, effort, zones, weather, recovery, recent load, and your reflection are being considered together.",
    effect: "Analysis in progress",
    next: "Your static plan remains available while this finishes",
    signals: [],
    intent: "Analyzing…",
    confidence: "Analyzing…",
  } : buildWorkoutAnalysis(activity, training, privatePacket.health || {}, coaching));
  title.textContent = analysis.title;
  document.getElementById("workoutAnalysisBody").textContent = analysis.body;
  document.getElementById("workoutAnalysisEffect").textContent = analysis.effect;
  document.getElementById("workoutAnalysisNext").textContent = analysis.next;
  document.getElementById("workoutAnalysisIntent").textContent = analysis.intent;
  document.getElementById("workoutAnalysisConfidence").textContent = analysis.confidence;
  document.getElementById("workoutAnalysisStatus").textContent = generated
    ? liveAnalysisState.status === "loading" ? "Updating…" : liveAnalysisState.status === "error" ? "Saved analysis" : "Generated"
    : liveAnalysisState.status === "loading" ? "Analyzing…" : "Data fallback";
  document.getElementById("workoutAnalysisSignals").innerHTML = (Array.isArray(analysis.signals) ? analysis.signals : []).map((signal) => `<div><span>${escapeHtml(signal.label)}</span><strong>${escapeHtml(signal.value)}</strong>${signal.detail ? `<small>${escapeHtml(signal.detail)}</small>` : ""}</div>`).join("");
}

function currentWeekStats() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  let active = 0;
  let intentional = 0;
  for (let offset = 0; offset <= now.getDay(); offset += 1) {
    const status = getOutcome(localDateKey(new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset)));
    if (status) intentional += 1;
    if (status === "completed" || status === "minimum") active += 1;
  }
  return { active, intentional };
}

function firstText(...values) {
  return values.find((value) => typeof value === "string" && value.trim())?.trim() || "";
}

function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function finiteNumber(value) {
  const number = Number(value);
  return hasValue(value) && Number.isFinite(number) ? number : NaN;
}

function activityGroup(activity) {
  const text = `${activity?.type || ""} ${activity?.name || ""}`.toLowerCase();
  if (/run|treadmill/.test(text)) return "run";
  if (/strength|lift|weight/.test(text)) return "strength";
  if (/cycl|bike|ride/.test(text)) return "bike";
  if (/jump|rope/.test(text)) return "jump-rope";
  return "other";
}

function recentActivityCounts(training, days, now = new Date()) {
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days + 1);
  const counts = { total: 0, run: 0, strength: 0, bike: 0, "jump-rope": 0, other: 0 };
  const activities = Array.isArray(training?.activities) ? training.activities : [];
  activities.forEach((activity) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(activity?.date || "")) return;
    const date = parseLocalDateKey(activity.date);
    if (date < cutoff || date > now) return;
    const group = activityGroup(activity);
    counts.total += 1;
    counts[group] += 1;
  });
  return counts;
}

function buildCoachingContext(packet = privatePacket, now = new Date()) {
  const health = packet.health || {};
  const training = packet.training || {};
  const weekly = training.weeklyLoad || {};
  const analytics = training.analytics || {};
  const current = analytics.current || {};
  const latestActivity = training.lastWorkoutDetail && typeof training.lastWorkoutDetail === "object" ? training.lastWorkoutDetail : null;
  const latestEffort = latestActivity ? workoutEffortRead(latestActivity, training, health) : null;
  const recent7 = recentActivityCounts(training, 7, now);
  const recent28 = recentActivityCounts(training, 28, now);
  const annual = yearStats(now.getFullYear());
  const month = monthStats(now);
  const week = currentWeekStats();
  const learned = feedbackLearning(now);
  const latestFeedback = learned.latest;

  const sleep = finiteNumber(health.sleepHours);
  const sleepBaseline = finiteNumber(health.baselines?.sleep7Day);
  const sleepDelta = Number.isFinite(sleep) && Number.isFinite(sleepBaseline) ? sleep - sleepBaseline : NaN;
  const restingHr = finiteNumber(health.restingHr);
  const restingHrBaseline = finiteNumber(health.baselines?.restingHr7Day);
  const restingHrDelta = Number.isFinite(restingHr) && Number.isFinite(restingHrBaseline) ? restingHr - restingHrBaseline : NaN;
  const bodyBattery = finiteNumber(health.bodyBattery);
  const stress = finiteNumber(health.stress);
  const weightLbs = finiteNumber(health.weightLbs);
  const currentRecoverySignalCount = [sleep, restingHr, bodyBattery, stress].filter(Number.isFinite).length;
  let recoveryScore = 0;
  if (Number.isFinite(sleep)) recoveryScore += sleep < 6 ? -3 : sleep < 7 ? -1 : sleep >= 7.5 ? 1 : 0;
  if (Number.isFinite(sleepDelta)) recoveryScore += sleepDelta <= -1 ? -2 : sleepDelta >= .5 ? 1 : 0;
  if (Number.isFinite(restingHrDelta)) recoveryScore += restingHrDelta >= 5 ? -3 : restingHrDelta >= 3 ? -1 : restingHrDelta <= -2 ? 1 : 0;
  if (Number.isFinite(bodyBattery)) recoveryScore += bodyBattery < 25 ? -3 : bodyBattery < 45 ? -1 : bodyBattery >= 65 ? 1 : 0;
  if (Number.isFinite(stress)) recoveryScore += stress >= 50 ? -2 : stress >= 35 ? -1 : stress <= 25 ? 1 : 0;
  recoveryScore += BODY_MIND_SIGNAL_META[latestFeedback?.bodySignal]?.recoveryDelta || 0;
  if (Number(latestFeedback?.feel) > 0 && Number(latestFeedback.feel) <= 2) recoveryScore -= 2;
  if (Number(latestFeedback?.rpe) >= 9) recoveryScore -= 1;
  const criticalBodyMindSignal = ["pain", "sick"].includes(latestFeedback?.bodySignal);
  const recoveryStatus = currentRecoverySignalCount === 0 && !latestFeedback ? "incomplete" : criticalBodyMindSignal || recoveryScore <= -3 ? "caution" : recoveryScore < 0 ? "mixed" : "supportive";

  const zones = normalizeHrZones(training.hrZonesYtd);
  const zonePercent = (zone) => zones?.zones.find((item) => item.zone === zone)?.percent || 0;
  const zoneMix = zones ? {
    easy: zonePercent(1) + zonePercent(2),
    middle: zonePercent(3),
    hard: zonePercent(4) + zonePercent(5),
    activityCount: zones.activityCount || 0,
  } : null;
  let zoneRead = null;
  if (zoneMix) {
    if (zoneMix.hard >= 20) zoneRead = { state: "hard-heavy", title: "The recorded intensity mix is hard-heavy", body: `${zoneMix.hard.toFixed(0)}% of zoned time is in Zones 4–5. For your six-mile aerobic goal, the next gain is more likely to come from truly easy repeatable running than another hard session.` };
    else if (zoneMix.middle >= 35) zoneRead = { state: "middle-heavy", title: "A lot of training is landing in the middle", body: `${zoneMix.middle.toFixed(0)}% of zoned time is in Zone 3. That work is useful, but it can blur the separation between low-cost easy days and intentional quality.` };
    else if (zoneMix.easy >= 70) zoneRead = { state: "base-supportive", title: "The intensity mix supports aerobic durability", body: `${zoneMix.easy.toFixed(0)}% of zoned time is in Zones 1–2, leaving room to repeat training while keeping selected quality work meaningful.` };
    else zoneRead = { state: "mixed", title: "The intensity mix is broadly balanced", body: `${zoneMix.easy.toFixed(0)}% of zoned time is in Zones 1–2 and ${zoneMix.hard.toFixed(0)}% in Zones 4–5. Keep easy days distinct from quality days as volume returns.` };
  }

  const runSessions7 = Number.isFinite(finiteNumber(weekly.activities)) ? finiteNumber(weekly.activities) : recentActivityCounts(training, 7, now).run;
  const priorRunSessions = finiteNumber(weekly.previousActivities);
  const weeklyMiles = finiteNumber(weekly.distanceMiles);
  const loadChange = finiteNumber(weekly.distanceChangePct);
  const fitness = finiteNumber(current.fitness);
  const fatigue = finiteNumber(current.fatigue);
  const form = finiteNumber(current.form);
  const ramp = finiteNumber(current.ramp7Day);
  const loadBalance = finiteNumber(current.loadBalance);
  const overHardMileageCeiling = Number.isFinite(weeklyMiles) && weeklyMiles >= ATHLETE_PROFILE.running.hardWeeklyCeilingMiles;
  const nearSustainableMileageCeiling = Number.isFinite(weeklyMiles) && weeklyMiles >= ATHLETE_PROFILE.running.sustainableWeeklyMiles[1];
  const loadHigh = (Number.isFinite(loadBalance) && loadBalance > 1.35)
    || (Number.isFinite(form) && form < -10)
    || (Number.isFinite(loadChange) && loadChange > 40)
    || overHardMileageCeiling;
  const runRhythmLow = runSessions7 < 4 && (
    (Number.isFinite(priorRunSessions) && priorRunSessions >= 4)
    || (Number.isFinite(loadChange) && loadChange < 0)
    || (Number.isFinite(ramp) && ramp < 0)
  );
  const latestRunHard = latestActivity && activityGroup(latestActivity) === "run" && ["hard", "very-hard"].includes(latestEffort?.level);

  const candidates = [
    { type: "steady", score: 40 },
    ...(["pain", "sick"].includes(latestFeedback?.bodySignal) ? [{ type: "recovery", score: 112 }] : []),
    ...(latestFeedback?.bodySignal === "burnt-out" ? [{ type: "recovery", score: 108 }] : []),
    ...(latestFeedback?.bodySignal === "fatigued" ? [{ type: "recovery", score: 102 }] : []),
    ...(recoveryStatus === "caution" ? [{ type: "recovery", score: 100 }] : []),
    ...(overHardMileageCeiling ? [{ type: "volume-ceiling", score: 96 }] : []),
    ...(loadHigh ? [{ type: "absorb-load", score: 92 }] : []),
    ...(nearSustainableMileageCeiling && recoveryStatus !== "supportive" ? [{ type: "volume-ceiling", score: 88 }] : []),
    ...(runRhythmLow ? [{ type: "run-rhythm", score: 86 }] : []),
    ...(zoneRead && ["hard-heavy", "middle-heavy"].includes(zoneRead.state) ? [{ type: "intensity", score: 74 + (latestRunHard ? 8 : 0) }] : []),
    ...(recent28.total >= 4 && recent28.strength < 4 ? [{ type: "strength", score: 64 }] : []),
    ...(recoveryStatus === "mixed" ? [{ type: "recovery", score: 62 }] : []),
  ].sort((a, b) => b.score - a.score);
  const priority = candidates[0].type;
  let focus;
  if (priority === "recovery") {
    const limitingSignal = latestFeedback?.bodySignal === "pain"
      ? "your latest reflection includes pain"
      : latestFeedback?.bodySignal === "sick"
        ? "your latest reflection says you feel sick"
        : latestFeedback?.bodySignal === "burnt-out"
          ? "your latest reflection says you feel burnt out"
          : latestFeedback?.bodySignal === "fatigued"
            ? "your latest reflection says you feel fatigued"
      : Number.isFinite(sleepDelta) && sleepDelta <= -1
      ? `sleep is ${Math.abs(sleepDelta).toFixed(1)} hours below baseline`
      : Number.isFinite(restingHrDelta) && restingHrDelta >= 3
        ? `resting HR is ${restingHrDelta.toFixed(1)} bpm above baseline`
        : Number.isFinite(bodyBattery) && bodyBattery < 45
          ? `Body Battery is ${Math.round(bodyBattery)}`
          : "multiple recovery signals are softer than usual";
    focus = {
      title: "Make recovery quality the short-term training priority",
      rationale: `Your clearest current constraint is recovery: ${limitingSignal}. Fitness work only helps when you can absorb and repeat it.`,
      action: latestFeedback?.bodySignal === "sick"
        ? "Skip training while you feel sick. Return with the minimum version only when normal daily activity feels normal again."
        : latestFeedback?.bodySignal === "burnt-out"
          ? "Reduce the next session to something restorative or take intentional rest; protect motivation before adding load."
          : "Keep the schedule fixed, but use the minimum version or genuinely easy effort until energy, sleep, and resting-HR signals settle.",
      successMarker: latestFeedback?.bodySignal === "burnt-out"
        ? "Training feels appealing again without pressure to catch up"
        : "Two or three days of normal-feeling energy with sleep and resting HR near baseline",
      horizon: "Next 3–5 days",
    };
  } else if (priority === "volume-ceiling") {
    focus = {
      title: "Hold mileage here and protect training quality",
      rationale: `The current seven-day total is ${weeklyMiles.toFixed(1)} miles. Your history says 20–25 miles is usually sustainable and 30-plus has reduced motivation, recovery, and long-run quality.`,
      action: "Do not add mileage this week. Keep the next run easy, preserve one quality session at most, and use the Saris trainer or an easy road ride when you want more aerobic work.",
      successMarker: "Running quality and motivation remain intact while weekly mileage returns to a repeatable range",
      horizon: "This week",
    };
  } else if (priority === "absorb-load") {
    focus = {
      title: "Absorb the recent load before asking for more",
      rationale: `Short-term fatigue is ${Number.isFinite(fatigue) ? fatigue : "elevated"}${Number.isFinite(fitness) ? ` against fitness of ${fitness}` : ""}, and the current load pattern is already demanding enough to create adaptation.`,
      action: "Keep the next run conversational and keep lifting controlled; do not add catch-up mileage or a second quality session.",
      successMarker: "Load balance and form move back toward balanced while the fixed schedule remains intact",
      horizon: "Next 5–7 days",
    };
  } else if (priority === "run-rhythm") {
    focus = {
      title: "Rebuild repeatable easy-run frequency before adding intensity",
      rationale: `You have ${runSessions7} recorded run${runSessions7 === 1 ? "" : "s"} in the last seven days${Number.isFinite(priorRunSessions) ? ` versus ${priorRunSessions} in the prior seven` : ""}${Number.isFinite(ramp) ? `, while 42-day fitness is moving ${ramp < 0 ? "down" : "up"} (${ramp > 0 ? "+" : ""}${ramp})` : ""}. Your strongest sustained year centered near a 20-mile median active week, but your notes favor reaching that rhythm gradually rather than forcing mileage.`,
      action: "Complete the next two scheduled runs conversationally. No catch-up miles; let frequency itself be the progression.",
      successMarker: "Three repeatable runs in a rolling week, with the long run moving toward six miles",
      horizon: "Next 2 weeks",
    };
  } else if (priority === "intensity") {
    focus = {
      title: "Create a clearer easy-versus-hard split",
      rationale: `${zoneRead.body} Your goal is durable general fitness, so moderate-hard work should be deliberate rather than the default shape of ordinary runs.`,
      action: "Keep routine runs conversational and begin quality work conservatively; your strongest documented efforts came from controlled openings and stronger finishes.",
      successMarker: "Easy runs feel repeatable, while quality sessions remain distinct and purposeful",
      horizon: "Next 3–4 weeks",
    };
  } else if (priority === "strength") {
    focus = {
      title: "Protect two pain-free strength exposures each week",
      rationale: `Garmin shows ${recent28.strength} recorded strength session${recent28.strength === 1 ? "" : "s"} in 28 days. Arm growth and core maintenance need recurring direct work, not occasional large sessions.`,
      action: "Complete the scheduled lifts with pain-free supported pulling, direct arms, and a small core dose; pull-ups stay paused.",
      successMarker: "Two sustainable lifts most weeks with gradual rep or load progress and no arm-pain flare",
      horizon: "Next 4 weeks",
    };
  } else {
    focus = {
      title: "Hold the mix and progress the long run gradually",
      rationale: "Recovery and training load do not expose a more urgent constraint. The highest-value move is preserving the run-and-lift rhythm without turning good days into tests.",
      action: "Follow the fixed schedule, keep routine running conversational, and add long-run distance only when the prior week felt repeatable.",
      successMarker: "Stable weekly frequency, a comfortable long run, and strength work that does not aggravate the arm",
      horizon: "Next 3–4 weeks",
    };
  }

  const healthTitle = recoveryStatus === "caution"
    ? "Recovery signals argue for a lower-cost day"
    : recoveryStatus === "mixed"
      ? "Recovery looks usable, with one signal to respect"
      : recoveryStatus === "incomplete"
        ? "Latest recovery readings are incomplete"
        : "Recovery looks broadly supportive today";
  const dailyRecovery = [
    Number.isFinite(sleep) ? `Sleep ${sleep.toFixed(1)}h${Number.isFinite(sleepDelta) ? ` (${sleepDelta >= 0 ? "+" : ""}${sleepDelta.toFixed(1)}h vs average)` : ""}` : "",
    Number.isFinite(restingHr) ? `Resting HR ${Math.round(restingHr)}${Number.isFinite(restingHrDelta) ? ` (${restingHrDelta >= 0 ? "+" : ""}${restingHrDelta.toFixed(1)} vs baseline)` : ""}` : "",
  ].filter(Boolean);
  const secondaryRecovery = [
    Number.isFinite(bodyBattery) ? `Body Battery ${Math.round(bodyBattery)}` : "",
    Number.isFinite(stress) ? `Stress ${Math.round(stress)}` : "",
  ].filter(Boolean);
  const statusRead = recoveryStatus === "supportive"
    ? "No clear recovery constraint."
    : recoveryStatus === "caution"
      ? "Choose the lowest-cost version today."
      : recoveryStatus === "mixed"
        ? "Train, but keep the cost controlled."
        : "Current recovery readings are incomplete.";
  const healthPoints = [
    dailyRecovery.length ? dailyRecovery.join(" • ") : "Sleep and resting-HR readings are unavailable.",
    `${secondaryRecovery.length ? `${secondaryRecovery.join(" • ")}. ` : ""}${statusRead}`,
  ];

  let loadCard;
  if (overHardMileageCeiling) {
    loadCard = { label: "Load response", title: "Mileage is above your useful ceiling", body: `${weeklyMiles.toFixed(1)} miles in seven days is above the 30-mile level that has historically hurt recovery, motivation, and long-run quality. More is not the productive direction this week.` };
  } else if (nearSustainableMileageCeiling) {
    loadCard = { label: "Load response", title: "Mileage is at the top of your sustainable range", body: `${weeklyMiles.toFixed(1)} miles is around the upper end of the 20–25 mile range that has worked best. Hold here unless recovery, enjoyment, and run quality all remain strong.` };
  } else if (Number.isFinite(form) && Number.isFinite(ramp) && form > 2 && ramp < 0) {
    loadCard = { label: "Load response", title: "You are fresh because recent load is lighter", body: `Form is +${form} while the fitness ramp is ${ramp}. That is useful freshness, but not evidence that more intensity is missing; restore repeatable volume first.` };
  } else if (Number.isFinite(form) && form < -3) {
    loadCard = { label: "Load response", title: "Short-term fatigue is outrunning fitness", body: `Form is ${form}${Number.isFinite(loadBalance) ? ` and load balance is ${loadBalance}` : ""}. Let the current work settle before increasing either mileage or intensity.` };
  } else {
    loadCard = { label: "Load response", title: "Fitness and fatigue are reasonably aligned", body: `${Number.isFinite(fitness) ? `Fitness is ${fitness}` : "Long-term fitness is building"}${Number.isFinite(fatigue) ? ` and fatigue is ${fatigue}` : ""}. Progress should come from small repeatable deposits rather than a large one-off week.` };
  }
  const intensityCard = zoneRead
    ? { label: "Intensity distribution", title: zoneRead.title, body: zoneRead.body, source: "year-to-date Garmin zones + your aerobic goal" }
    : { label: "Intensity distribution", title: "Zone history is still building", body: "Use conversational breathing for easy runs until Garmin has enough zone time to judge the longer-term intensity mix.", source: "available Garmin zone history" };
  loadCard.source = "fitness–fatigue trend + recent workout load";
  const commonFeedback = Object.entries(learned.counts).sort((a, b) => b[1] - a[1])[0];
  const feedbackCard = learned.recent.length ? {
    label: "Your feedback loop",
    title: commonFeedback && commonFeedback[1] >= 2 ? `${commonFeedback[0][0].toUpperCase()}${commonFeedback[0].slice(1)} is repeating in your notes` : `${learned.recent.length} recent reflection${learned.recent.length === 1 ? " is" : "s are"} shaping the coaching read`,
    body: commonFeedback && commonFeedback[1] >= 2
      ? `${commonFeedback[0]} appeared in ${commonFeedback[1]} recent reflections. The model will treat that repeated pattern as more meaningful than a single difficult day.`
      : "No single subjective issue has repeated enough to override the objective training signals. Keep noting sessions that feel unusually good or bad.",
    source: "your optional workout ratings and written notes",
  } : {
    label: "Historical response",
    title: "Your past logs favor repeatable training over heroic weeks",
    body: "Across your Strava notes, controlled starts, honest easy days, and backing off during heat, illness, or accumulated leg fatigue repeatedly produced better outcomes than forcing the written plan.",
    source: "your 2014–2026 training history + current goals",
  };

  return {
    modelVersion: COACHING_MODEL_VERSION,
    profile: ATHLETE_PROFILE,
    generatedAt: packet.generatedAt || "",
    health: { status: recoveryStatus, score: recoveryScore, title: healthTitle, points: healthPoints, sleep, sleepBaseline, restingHr, restingHrBaseline, bodyBattery, stress, weightLbs, weightDate: health.weightDate || "" },
    training: { runSessions7, priorRunSessions, weeklyMiles, loadChange, fitness, fatigue, form, ramp, loadBalance, recent7, recent28, latestActivity, latestEffort, zoneMix, zoneRead, overHardMileageCeiling, nearSustainableMileageCeiling, feedback: learned },
    history: STRAVA_TRAINING_HISTORY,
    consistency: { annual, month, week },
    focus,
    insightCards: [intensityCard, loadCard, feedbackCard],
    source: `Fitness HQ coaching model v${COACHING_MODEL_VERSION} • Garmin + feedback + weather + plan + ${COACHING_KNOWLEDGE.sources.length} trusted sources + athlete history`,
  };
}

function activityTypeLabel(value) {
  return String(value || "Activity")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatActivityDuration(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) return "";
  const rounded = Math.round(minutes);
  const hours = Math.floor(rounded / 60);
  const remainder = rounded % 60;
  return hours ? `${hours}h ${remainder}m` : `${remainder}m`;
}

function formatActivityPace(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes) || minutes <= 0) return "";
  let whole = Math.floor(minutes);
  let seconds = Math.round((minutes - whole) * 60);
  if (seconds === 60) {
    whole += 1;
    seconds = 0;
  }
  return `${whole}:${String(seconds).padStart(2, "0")} /mi`;
}

function normalizeHrZones(value) {
  if (!value || typeof value !== "object" || !Array.isArray(value.zones)) return null;
  const zones = HR_ZONE_META.map((meta) => {
    const input = value.zones.find((item) => Number(item?.zone) === meta.zone) || {};
    const boundary = Array.isArray(value.boundaries) ? value.boundaries.find((item) => Number(item?.zone) === meta.zone) || {} : {};
    const seconds = hasValue(input.seconds) ? Math.max(0, Number(input.seconds)) : 0;
    const historical = ATHLETE_PROFILE.running.historicalZones[`z${meta.zone}`] || [];
    return {
      ...meta,
      seconds: Number.isFinite(seconds) ? seconds : 0,
      lowerBpm: finiteNumber(boundary.lowerBpm ?? historical[0]),
      upperBpm: finiteNumber(boundary.upperBpm ?? historical[1]),
    };
  });
  const calculatedTotal = zones.reduce((sum, zone) => sum + zone.seconds, 0);
  if (!Number.isFinite(calculatedTotal) || calculatedTotal <= 0) return null;
  const totalSeconds = hasValue(value.totalSeconds) && Number(value.totalSeconds) > 0 ? Number(value.totalSeconds) : calculatedTotal;
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return null;
  return {
    zones: zones.map((zone) => ({ ...zone, percent: zone.seconds / calculatedTotal * 100 })),
    totalSeconds,
    belowZoneSeconds: hasValue(value.belowZoneSeconds) ? Math.max(0, Number(value.belowZoneSeconds)) : 0,
    activityCount: hasValue(value.activityCount) ? Math.max(0, Number(value.activityCount)) : null,
    model: value.model || "heart-rate reserve",
  };
}

function formatZoneDuration(value, compact = false) {
  const seconds = Math.max(0, Math.round(Number(value) || 0));
  if (seconds < 60) return seconds ? `<1m` : "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours) return compact ? `${hours}h ${minutes}m` : `${hours} hr ${minutes} min`;
  const remainder = seconds % 60;
  return compact ? `${minutes}m` : `${minutes} min ${remainder} sec`;
}

function hrZoneBreakdownMarkup(value, variant = "workout") {
  const data = normalizeHrZones(value);
  if (!data) {
    return variant === "workout"
      ? '<div class="hr-zone-empty"><strong>Heart-rate zones</strong><span>Zone timing will appear after the next Garmin history refresh.</span></div>'
      : '<div class="empty-state">Year-to-date heart-rate zones will appear after Garmin rebuilds the activity history.</div>';
  }
  const stackedBar = `<div class="hr-zone-stack" role="img" aria-label="${data.zones.map((zone) => `${zone.label} ${zone.percent.toFixed(1)} percent`).join(", ")}">${data.zones.map((zone) => `<span class="hr-zone-${zone.zone}" style="width:${zone.percent.toFixed(2)}%"></span>`).join("")}</div>`;
  const zoneGrid = `<div class="hr-zone-grid">${data.zones.map((zone) => `<div class="hr-zone-item hr-zone-${zone.zone}"><span><i></i>${zone.label}</span><strong>${zone.percent.toFixed(1)}%</strong><small>${formatZoneDuration(zone.seconds, true)}${Number.isFinite(zone.lowerBpm) && Number.isFinite(zone.upperBpm) ? ` · ${Math.round(zone.lowerBpm)}–${Math.round(zone.upperBpm)} bpm` : ""}</small></div>`).join("")}</div>`;
  if (variant === "workout") {
    return `<section class="activity-hr-zones" aria-label="Workout heart-rate zone split">
      <div class="hr-zone-block-head"><div><span>Heart-rate zones</span><strong>This workout</strong></div><small>${formatZoneDuration(data.totalSeconds, true)} zoned</small></div>
      ${stackedBar}${zoneGrid}
    </section>`;
  }
  return `<div class="hr-zone-ytd-overview"><div><strong>${formatZoneDuration(data.totalSeconds)}</strong><span>time in Zones 1–5</span></div><div><strong>${Math.round(data.activityCount || 0)}</strong><span>workouts with zone data</span></div></div>
    ${stackedBar}${zoneGrid}`;
}

function renderYtdHrZones() {
  const container = document.getElementById("ytdHrZoneSplit");
  if (!container) return;
  container.innerHTML = hrZoneBreakdownMarkup(privatePacket.training?.hrZonesYtd, "ytd");
}

function formatActivityDate(activity) {
  const localStart = firstText(activity.startTimeLocal);
  if (localStart) {
    const parsed = new Date(localStart);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
        + ` · ${parsed.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    }
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(activity.date || "")) {
    return parseLocalDateKey(activity.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }
  return "Latest synced workout";
}

function analysisFreshnessLabel() {
  if (liveAnalysisState.status === "loading") return liveAnalysis ? "Updating analysis…" : "Analyzing current data…";
  if (liveAnalysisState.status === "error") return liveAnalysis ? "Saved analysis · update missed" : "Live analysis unavailable";
  if (liveAnalysis?._meta?.generatedAt) {
    const generated = new Date(liveAnalysis._meta.generatedAt);
    if (!Number.isNaN(generated.getTime())) return `Generated ${generated.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
    return "Generated analysis";
  }
  return "Data fallback";
}

function renderGuidance(coaching = buildCoachingContext()) {
  const label = document.querySelector("#todayGuidanceCard .eyebrow");
  if (liveAnalysis?.dailyGuidance) {
    if (label) label.textContent = liveAnalysisState.status === "loading" ? "Today's direction · updating" : "Today's direction · generated";
    document.getElementById("guidanceTitle").textContent = liveAnalysis.dailyGuidance.title;
    document.getElementById("guidanceBody").textContent = liveAnalysis.dailyGuidance.body;
    return;
  }
  if (liveAnalysisState.status === "loading") {
    if (label) label.textContent = "Today's direction · analyzing";
    document.getElementById("guidanceTitle").textContent = "Reading the current picture";
    document.getElementById("guidanceBody").textContent = "Recovery, training, weather, goals, and your recent feedback are being considered together.";
    return;
  }
  if (label) label.textContent = "Today's direction · data fallback";
  const status = getOutcome(localDateKey());
  const workout = workoutForDate(new Date());
  let title = "Keep the decision small";
  let body = "Start the planned session. The minimum version still counts, and nothing needs to be made up later.";

  if (status === "completed" || status === "minimum") {
    title = "Today's work is done";
    body = "Let the completed work stand on its own. There is no reason to add bonus volume to make it more legitimate.";
  } else if (status === "rest") {
    title = "Rest is part of the rhythm";
    body = "Keep tomorrow on its normal schedule. No shifting, catching up, or punishment workout.";
  } else if (coaching.health.status === "caution") {
    title = "Keep today's cost low";
    body = `The schedule can stay fixed, but recovery is the limiting signal. Use the ${workout.type === "Run" ? "conversational or minimum" : "minimum, pain-free"} version and stop without adding extras.`;
  } else if (workout.type === "Run" && coaching.focus.title.includes("easy-run frequency")) {
    title = "The win is a run you can repeat";
    body = "Keep today's run conversational and complete only the scheduled distance. Frequency—not pace or catch-up mileage—is the useful progression right now.";
  } else if (workout.type === "Lift") {
    title = "Make the lift repeatable and pain-free";
    body = "Follow the planned work, keep pulling supported and pain-free, and leave enough margin that the next scheduled session still sounds manageable.";
  } else if (coaching.consistency.week.active >= 4) {
    title = "Protect the rhythm you already have";
    body = "This week already contains several intentional training days. Choose the version that keeps tomorrow attractive.";
  }

  document.getElementById("guidanceTitle").textContent = title;
  document.getElementById("guidanceBody").textContent = body;
}

function renderTodayHealthInsight(coaching = buildCoachingContext()) {
  const health = privatePacket.health || {};
  const sleepValue = health.sleepHours ?? health.baselines?.sleep7Day;
  const restingHrValue = health.restingHr ?? health.baselines?.restingHr7Day;
  const hasGarmin = hasHealthData();
  const generatedHealth = liveAnalysis?.dailyHealth;
  const points = generatedHealth?.points || (liveAnalysisState.status === "loading"
    ? ["Sleep, heart, stress, Body Battery, activity, and recent patterns are being analyzed together."]
    : hasGarmin ? coaching.health.points : ["Connect Garmin to combine sleep, heart-rate, and exercise context in one daily read."]);
  const weightDate = /^\d{4}-\d{2}-\d{2}$/.test(health.weightDate || "")
    ? parseLocalDateKey(health.weightDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : "";
  const signals = [
    { label: "Sleep", value: hasValue(sleepValue) ? `${sleepValue} h` : "Not available", detail: hasValue(health.sleepHours) && hasValue(health.baselines?.sleep7Day) ? `7-day ${health.baselines.sleep7Day} h` : hasValue(health.sleepHours) ? (health.sleepScore ? `Score ${health.sleepScore}` : "Latest Garmin value") : hasValue(health.baselines?.sleep7Day) ? "7-day average" : "No recent reading" },
    { label: "Resting HR", value: hasValue(restingHrValue) ? `${restingHrValue} bpm` : "Not available", detail: hasValue(health.restingHr) && hasValue(health.baselines?.restingHr7Day) ? `7-day ${health.baselines.restingHr7Day} bpm` : hasValue(health.restingHr) ? "Latest Garmin value" : hasValue(health.baselines?.restingHr7Day) ? "7-day average" : "No recent reading" },
    { label: "Stress", value: hasValue(health.stress) ? health.stress : "Not available", detail: "" },
    { label: "Body Battery", value: hasValue(health.bodyBattery) ? health.bodyBattery : "Not available", detail: "" },
    { label: "Weight", value: hasValue(health.weightLbs) ? `${Number(health.weightLbs).toFixed(1)} lb` : "Not logged", detail: weightDate ? `Garmin weigh-in · ${weightDate}` : "Latest Garmin weigh-in" },
    { label: "Steps", value: hasValue(health.steps) ? Number(health.steps).toLocaleString() : "Not available", detail: "" },
  ];

  document.getElementById("todayHealthFreshness").textContent = hasGarmin ? analysisFreshnessLabel() : "Garmin not connected";
  document.getElementById("todayHealthLead").textContent = generatedHealth?.headline
    || (liveAnalysisState.status === "loading" ? "Building your whole-health read" : hasGarmin ? coaching.health.title : "Connecting the full picture");
  document.getElementById("todayHealthPoints").innerHTML = points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  document.getElementById("todayHealthSignals").innerHTML = signals.map((signal) => `<div class="health-signal"><span>${escapeHtml(signal.label)}</span><strong>${escapeHtml(signal.value)}</strong>${signal.detail ? `<small>${escapeHtml(signal.detail)}</small>` : ""}</div>`).join("");
}

function buildWeeklyReview(coaching, now = new Date()) {
  const training = privatePacket.training || {};
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  const availableDetails = Array.isArray(training.activityDetails) && training.activityDetails.length ? training.activityDetails : [training.lastWorkoutDetail].filter(Boolean);
  const details = availableDetails.filter((activity) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(activity?.date || "")) return false;
    const current = parseLocalDateKey(activity.date);
    return current >= cutoff && current <= now;
  });
  const runs = details.filter((activity) => activityGroup(activity) === "run");
  const strength = details.filter((activity) => activityGroup(activity) === "strength");
  const hot = details.filter((activity) => ["moderate", "high"].includes(activity.weather?.heatLoad));
  const learned = coaching.training.feedback || feedbackLearning(now);
  const confidence = coachingConfidence(coaching, details[0] || null);
  const rollingRuns = finiteNumber(training.weeklyLoad?.activities);
  const rollingMiles = finiteNumber(training.weeklyLoad?.distanceMiles);
  const loadChange = finiteNumber(training.weeklyLoad?.distanceChangePct);
  const completed = Number.isFinite(rollingRuns) ? rollingRuns : new Set(details.map((activity) => activity.date)).size;
  const win = completed
    ? `${completed} run${completed === 1 ? "" : "s"}${Number.isFinite(rollingMiles) ? ` totaling ${rollingMiles.toFixed(1)} miles` : ""} in the rolling week${strength.length ? `, plus ${strength.length} recorded strength session${strength.length === 1 ? "" : "s"}` : ""}.`
    : "No Garmin-recorded workout yet this week; there is nothing to make up.";
  let watch = "No repeated issue is strong enough to override the normal plan.";
  if (learned.painFlags) watch = `${learned.painFlags} recent pain flag${learned.painFlags === 1 ? "" : "s"}; pain takes priority over load targets.`;
  else if (learned.sicknessFlags) watch = `${learned.sicknessFlags} recent sick flag${learned.sicknessFlags === 1 ? "" : "s"}; return to training only as normal daily energy comes back.`;
  else if (learned.burnoutFlags) watch = `${learned.burnoutFlags} recent burnt-out flag${learned.burnoutFlags === 1 ? "" : "s"}; protect motivation and remove pressure before adding load.`;
  else if (learned.fatigueFlags >= 2) watch = `${learned.fatigueFlags} recent fatigued flags form a pattern; keep the next work low-cost until energy normalizes.`;
  else if (learned.lowFeel >= 2) watch = `${learned.lowFeel} recent sessions were rated 1–2 for feel, which is a pattern rather than one bad day.`;
  else if (hot.length) watch = `${hot.length} session${hot.length === 1 ? " was" : "s were"} completed in meaningful heat or humidity; pace comparisons need that adjustment.`;
  else if (coaching.training.zoneRead && ["hard-heavy", "middle-heavy"].includes(coaching.training.zoneRead.state)) watch = coaching.training.zoneRead.title;
  const choiceCount = learned.followed;
  const aiCount = learned.matched;
  const title = Number.isFinite(loadChange) && loadChange <= -20
    ? "A lighter running week leaves room to rebuild without rushing"
    : Number.isFinite(loadChange) && loadChange >= 25
      ? "The running increase is the stimulus; let it settle"
      : coaching.health.status === "caution"
        ? "Training only pays off if this recovery dip resolves"
        : "The week is broadly repeatable—keep the easy/hard split clear";
  const summary = [
    Number.isFinite(rollingMiles) ? `${rollingMiles.toFixed(1)} miles` : "",
    `${completed} run${completed === 1 ? "" : "s"}`,
    Number.isFinite(loadChange) ? `${Math.abs(loadChange).toFixed(0)}% ${loadChange < 0 ? "below" : "above"} prior week` : "",
    hot.length ? `${hot.length} heat-affected workout${hot.length === 1 ? "" : "s"}` : "",
    choiceCount ? `${aiCount}/${choiceCount} reflections followed the AI option` : "",
  ].filter(Boolean).join(" • ");
  return {
    title,
    summary,
    win,
    watch,
    next: coaching.focus.action,
    confidence: confidence.label,
  };
}

function renderWeeklyReview(coaching) {
  const review = liveAnalysis?.weeklyReview || (liveAnalysisState.status === "loading" ? {
    title: "Reviewing what changed this week",
    summary: "Recent training, recovery, conditions, and reflections are being compared.",
    win: "Analysis in progress",
    watch: "Analysis in progress",
    confidence: "Analyzing…",
  } : buildWeeklyReview(coaching));
  document.getElementById("weeklyReviewTitle").textContent = review.title;
  document.getElementById("weeklyReviewSummary").textContent = review.summary;
  document.getElementById("weeklyReviewWin").textContent = review.win;
  document.getElementById("weeklyReviewWatch").textContent = review.watch;
  document.getElementById("weeklyReviewConfidence").textContent = liveAnalysis?.weeklyReview
    ? liveAnalysisState.status === "loading" ? "Updating…" : liveAnalysisState.status === "error" ? "Saved analysis" : review.confidence
    : liveAnalysisState.status === "loading" ? "Analyzing…" : "Data fallback";
}

function renderInsights(coaching = buildCoachingContext()) {
  const health = privatePacket.health || {};
  const training = privatePacket.training || {};
  const weeklyLoad = training.weeklyLoad || {};
  const hasGarmin = hasHealthData();

  document.getElementById("insightFreshness").textContent = hasGarmin ? analysisFreshnessLabel() : "Garmin not connected";

  const focus = liveAnalysis?.coachingFocus || (liveAnalysisState.status === "loading" ? {
    title: "Identifying the highest-value focus",
    rationale: "The coach is weighing recovery, load, intensity distribution, workout response, consistency, and your goals.",
    action: "Use the static plan while analysis finishes",
    successMarker: "A specific, evidence-backed priority",
    horizon: "Analyzing…",
  } : coaching.focus);
  document.getElementById("coachingFocusTitle").textContent = hasGarmin ? focus.title : "Connect Garmin to establish the current constraint";
  document.getElementById("coachingFocusRationale").textContent = hasGarmin ? focus.rationale : "The coaching view needs current health and training history before it can prioritize recovery, frequency, intensity, or load.";
  document.getElementById("coachingFocusAction").textContent = hasGarmin ? focus.action : "Follow the fixed plan without catch-up work";
  document.getElementById("coachingFocusSuccess").textContent = hasGarmin ? focus.successMarker : "A connected Garmin snapshot and repeatable training";
  document.getElementById("coachingFocusHorizon").textContent = hasGarmin ? focus.horizon : "Waiting for data";
  renderWeeklyReview(coaching);

  const sleepValue = health.sleepHours ?? health.baselines?.sleep7Day;
  const restingHrValue = health.restingHr ?? health.baselines?.restingHr7Day;
  const loadChange = Number(weeklyLoad.distanceChangePct);
  const metrics = [
    { label: "7-day running", value: hasValue(weeklyLoad.distanceMiles) ? `${weeklyLoad.distanceMiles} mi` : "Not available", detail: hasValue(weeklyLoad.activities) ? `${weeklyLoad.activities} activities` : "No recent training load" },
    { label: "Run frequency", value: hasValue(weeklyLoad.activities) ? `${weeklyLoad.activities} sessions` : "Not available", detail: hasValue(weeklyLoad.previousActivities) ? `${weeklyLoad.previousActivities} in prior 7 days` : "No comparison available" },
    { label: "Load direction", value: Number.isFinite(loadChange) ? `${loadChange > 0 ? "+" : ""}${loadChange}%` : "Not available", detail: "Distance vs prior 7 days" },
    { label: "Recovery context", value: hasValue(health.bodyBattery) ? health.bodyBattery : hasValue(restingHrValue) ? `${restingHrValue} bpm` : "Not available", icon: hasValue(health.bodyBattery) ? "battery" : "", detail: hasValue(health.stress) ? `Stress ${health.stress}` : hasValue(sleepValue) ? `${sleepValue} h sleep` : "Use feel and pain signals" },
  ];
  document.getElementById("healthMetricGrid").innerHTML = metrics.map((metric) => {
    const value = metric.icon
      ? `<strong class="metric-icon-value">${iconMarkup(metric.icon)}<em>${escapeHtml(metric.value)}</em></strong>`
      : `<strong>${escapeHtml(metric.value)}</strong>`;
    return `<article class="metric-card"><span>${escapeHtml(metric.label)}</span>${value}<small>${escapeHtml(metric.detail)}</small></article>`;
  }).join("");
  renderTrainingIntelligence(training.analytics);

  const insightCards = buildInsightCards(coaching, hasGarmin);
  document.getElementById("insightGrid").innerHTML = insightCards.map((item) => `<article class="glass-card insight-card"><p class="eyebrow">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join("");

}

function metricValue(value, suffix = "", fallback = "—") {
  return hasValue(value) ? `${value}${suffix}` : fallback;
}

function clampMetric(value, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, Number(value) || 0));
}

function metricPosition(value, minimum, maximum) {
  if (!Number.isFinite(Number(value)) || maximum <= minimum) return 0;
  return clampMetric(((Number(value) - minimum) / (maximum - minimum)) * 100);
}

function rollingLoadReferences(series) {
  const loads = Array.isArray(series) ? series.map((item) => Number(item?.load)).map((value) => Number.isFinite(value) ? value : 0) : [];
  const sevenDayLoads = [];
  const strains = [];
  for (let index = 6; index < loads.length; index += 1) {
    const window = loads.slice(index - 6, index + 1);
    const total = window.reduce((sum, value) => sum + value, 0);
    const average = total / window.length;
    const variance = window.reduce((sum, value) => sum + ((value - average) ** 2), 0) / window.length;
    const deviation = Math.sqrt(variance);
    const monotony = deviation > 0 ? average / deviation : total > 0 ? 5 : 0;
    sevenDayLoads.push(total);
    strains.push(total * monotony);
  }
  return { sevenDayLoads, strains };
}

function personalPercentile(value, values) {
  const current = Number(value);
  const clean = Array.isArray(values) ? values.map(Number).filter(Number.isFinite) : [];
  if (!Number.isFinite(current) || !clean.length) return NaN;
  return (clean.filter((item) => item <= current).length / clean.length) * 100;
}

function ordinalNumber(value) {
  const rounded = Math.round(value);
  const lastTwo = rounded % 100;
  const suffix = lastTwo >= 11 && lastTwo <= 13 ? "th" : rounded % 10 === 1 ? "st" : rounded % 10 === 2 ? "nd" : rounded % 10 === 3 ? "rd" : "th";
  return `${rounded}${suffix}`;
}

function percentileReference(value, values, noun) {
  const percentile = personalPercentile(value, values);
  if (!Number.isFinite(percentile)) return null;
  const label = percentile <= 25 ? `Low ${noun}` : percentile <= 65 ? `Typical ${noun}` : percentile <= 85 ? `Elevated ${noun}` : `High ${noun}`;
  return {
    label,
    note: `${ordinalNumber(percentile)} percentile vs your 90d`,
    position: percentile,
    tone: percentile > 85 ? "caution" : percentile > 65 ? "watch" : "neutral",
  };
}

function trainingMetricReference(key, current = {}, series = []) {
  const value = Number(current[key]);
  if (!Number.isFinite(value)) return null;
  const rolling = rollingLoadReferences(series);
  if (key === "loadBalance") {
    return {
      label: value < .8 ? "Fresh / lighter load" : value <= 1.2 ? "Balanced" : value <= 1.35 ? "Building load" : "High short-term load",
      note: "useful middle 0.8–1.2",
      position: metricPosition(value, 0, 1.8),
      targetStart: metricPosition(.8, 0, 1.8),
      targetEnd: metricPosition(1.2, 0, 1.8),
      tone: value > 1.35 ? "caution" : value > 1.2 ? "watch" : "good",
    };
  }
  if (key === "monotony7Day") {
    return {
      label: value < 1 ? "Low repetition" : value < 1.5 ? "Moderate variation" : value < 2 ? "Repetitive week" : "Very repetitive week",
      note: "lower = more varied",
      position: metricPosition(value, 0, 2.5),
      targetStart: 0,
      targetEnd: metricPosition(1.2, 0, 2.5),
      tone: value >= 2 ? "caution" : value >= 1.5 ? "watch" : "good",
    };
  }
  if (key === "strain7Day") return percentileReference(value, rolling.strains, "strain");
  if (key === "cardioLoad7Day") return percentileReference(value, rolling.sevenDayLoads, "cardio load");
  if (key === "runningEfficiency28") {
    const change = Number(current.runningEfficiencyChangePct);
    if (!Number.isFinite(change)) return null;
    return {
      label: change < -3 ? "Below recent" : change > 3 ? "Improving" : "Stable",
      note: "higher = faster per heartbeat",
      position: metricPosition(change, -10, 10),
      targetStart: 50,
      targetEnd: 100,
      tone: change < -3 ? "watch" : change > 3 ? "good" : "neutral",
    };
  }
  if (key === "vo2Max28") {
    const change = Number(current.vo2MaxChangePct);
    if (!Number.isFinite(change)) return null;
    return {
      label: change < -2 ? "Trending down" : change > 2 ? "Trending up" : "Stable",
      note: "vs your prior 28d",
      position: metricPosition(change, -6, 6),
      targetStart: 50,
      targetEnd: 100,
      tone: change < -2 ? "watch" : change > 2 ? "good" : "neutral",
    };
  }
  if (key === "activeDays28") {
    return {
      label: value < 8 ? "Light month" : value < 12 ? "Building" : value <= 20 ? "Steady" : "High frequency",
      note: "12–20 active days / 28",
      position: metricPosition(value, 0, 28),
      targetStart: metricPosition(12, 0, 28),
      targetEnd: metricPosition(20, 0, 28),
      tone: value >= 12 && value <= 20 ? "good" : "neutral",
    };
  }
  if (key === "runMiles7Day") {
    return {
      label: value < 12 ? "Light running week" : value < 20 ? "Rebuilding volume" : value <= 25 ? "Usual range" : value <= 30 ? "High for you" : "Above your ceiling",
      note: "historical range 20–25 mi",
      position: metricPosition(value, 0, 32),
      targetStart: metricPosition(20, 0, 32),
      targetEnd: metricPosition(25, 0, 32),
      tone: value > 30 ? "caution" : value > 25 ? "watch" : value >= 20 ? "good" : "neutral",
    };
  }
  if (key === "strengthMinutes7Day") {
    return {
      label: value === 0 ? "No recorded lift" : value < 50 ? "Light exposure" : value <= 90 ? "Baseline covered" : "High volume",
      note: "baseline 50–70 min / week",
      position: metricPosition(value, 0, 100),
      targetStart: 50,
      targetEnd: 70,
      tone: value >= 50 && value <= 90 ? "good" : "neutral",
    };
  }
  return null;
}

function metricReferenceMarkup(reference) {
  if (!reference) return "";
  const position = clampMetric(reference.position).toFixed(1);
  const hasTarget = Number.isFinite(reference.targetStart) && Number.isFinite(reference.targetEnd);
  const targetStart = hasTarget ? clampMetric(reference.targetStart).toFixed(1) : "0";
  const targetWidth = hasTarget ? clampMetric(reference.targetEnd - reference.targetStart).toFixed(1) : "0";
  return `<div class="metric-reference tone-${escapeHtml(reference.tone || "neutral")}">
    <div class="metric-reference-copy"><em>${escapeHtml(reference.label)}</em><b>${escapeHtml(reference.note)}</b></div>
    <div class="metric-reference-track" style="--metric-position:${position}%;--target-start:${targetStart}%;--target-width:${targetWidth}%">${hasTarget ? '<i aria-hidden="true"></i>' : ""}<span aria-hidden="true"></span></div>
  </div>`;
}

function trainingStateLabel(form, balance) {
  if (!hasValue(form)) return "Building history";
  if (balance > 1.35 || form < -10) return "High short-term load";
  if (form < -3) return "Carrying fatigue";
  if (form > 8) return "Very fresh";
  if (form > 2) return "Fresh";
  return "Balanced";
}

function chartPath(series, key, width, height, minValue, maxValue) {
  if (!series.length) return "";
  const range = maxValue - minValue || 1;
  return series.map((item, index) => {
    const x = series.length === 1 ? width / 2 : (index / (series.length - 1)) * width;
    const y = height - ((Number(item[key]) - minValue) / range) * height;
    return `${index ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function renderTrainingIntelligence(analytics) {
  const stateGrid = document.getElementById("trainingStateGrid");
  const chart = document.getElementById("trainingLoadChart");
  const detailGrid = document.getElementById("trainingDetailGrid");
  if (!stateGrid || !chart || !detailGrid) return;
  const current = analytics?.current || {};
  const series = Array.isArray(analytics?.series) ? analytics.series.filter((item) => item && hasValue(item.fitness) && hasValue(item.fatigue) && hasValue(item.form)) : [];
  if (!analytics || !series.length) {
    stateGrid.innerHTML = '<div class="empty-state">Training intelligence will appear after the next Garmin history refresh.</div>';
    chart.innerHTML = '<div class="training-chart-empty">Waiting for longitudinal load history</div>';
    detailGrid.innerHTML = "";
    return;
  }

  const state = trainingStateLabel(Number(current.form), Number(current.loadBalance));
  const primary = [
    { label: "Fitness", value: metricValue(current.fitness), detail: "42-day load" },
    { label: "Fatigue", value: metricValue(current.fatigue), detail: "7-day load" },
    { label: "Form", value: hasValue(current.form) ? `${current.form > 0 ? "+" : ""}${current.form}` : "—", detail: state },
    { label: "7-day ramp", value: hasValue(current.ramp7Day) ? `${current.ramp7Day > 0 ? "+" : ""}${current.ramp7Day}` : "—", detail: "Fitness change" },
  ];
  stateGrid.innerHTML = primary.map((item, index) => `<article class="training-state-card state-${index}"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.detail)}</small></article>`).join("");

  const values = series.flatMap((item) => [Number(item.fitness), Number(item.fatigue), Number(item.form)]).filter(Number.isFinite);
  const minValue = Math.min(0, ...values);
  const maxValue = Math.max(1, ...values);
  const width = 720;
  const height = 220;
  const fitnessPath = chartPath(series, "fitness", width, height, minValue, maxValue);
  const fatiguePath = chartPath(series, "fatigue", width, height, minValue, maxValue);
  const formPath = chartPath(series, "form", width, height, minValue, maxValue);
  const zeroY = height - ((0 - minValue) / (maxValue - minValue || 1)) * height;
  const firstDate = parseLocalDateKey(series[0].date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const lastDate = parseLocalDateKey(series[series.length - 1].date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  chart.innerHTML = `<div class="training-chart-plot"><svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="fitnessFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5bcbff" stop-opacity=".22"/><stop offset="1" stop-color="#5bcbff" stop-opacity="0"/></linearGradient></defs>
    <line class="chart-zero" x1="0" y1="${zeroY.toFixed(1)}" x2="${width}" y2="${zeroY.toFixed(1)}"></line>
    <path class="chart-line chart-fitness" d="${fitnessPath}"></path>
    <path class="chart-line chart-fatigue" d="${fatiguePath}"></path>
    <path class="chart-line chart-form" d="${formPath}"></path>
  </svg></div><div class="training-chart-dates"><span>${escapeHtml(firstDate)}</span><span>${escapeHtml(lastDate)}</span></div>`;

  const secondary = [
    { key: "loadBalance", label: "Load balance", value: metricValue(current.loadBalance), detail: "Fatigue ÷ fitness" },
    { key: "monotony7Day", label: "Monotony", value: metricValue(current.monotony7Day), detail: "7-day repetition" },
    { key: "strain7Day", label: "Strain", value: metricValue(current.strain7Day), detail: "Load × monotony" },
    { key: "activeDays28", label: "28-day consistency", value: metricValue(current.activeDays28, " days"), detail: `${metricValue(current.activities28)} activities` },
    { key: "vo2Max28", label: "VO₂ max", value: metricValue(current.vo2Max28), detail: hasValue(current.vo2MaxChangePct) ? `${current.vo2MaxChangePct > 0 ? "+" : ""}${current.vo2MaxChangePct}% vs prior 28d` : "No prior comparison" },
    { key: "runningEfficiency28", label: "Run efficiency", value: hasValue(current.runningEfficiency28) ? Number(current.runningEfficiency28).toFixed(2) : "—", detail: hasValue(current.runningEfficiencyChangePct) ? `${current.runningEfficiencyChangePct > 0 ? "+" : ""}${current.runningEfficiencyChangePct}% vs prior 28d` : "Speed per heartbeat" },
    { key: "cardioLoad7Day", label: "Cardio load", value: metricValue(current.cardioLoad7Day), detail: "7-day %HRR-weighted" },
    { key: "runMiles7Day", label: "Running impact", value: hasValue(current.runMiles7Day) ? `${current.runMiles7Day} mi` : "—", detail: hasValue(current.runVerticalFeet7Day) ? `${Math.round(current.runVerticalFeet7Day)} ft climbed` : "7-day mechanical context" },
    { key: "strengthMinutes7Day", label: "Strength exposure", value: hasValue(current.strengthMinutes7Day) ? `${Math.round(current.strengthMinutes7Day)} min` : "—", detail: "kept separate from run load" },
  ];
  detailGrid.innerHTML = secondary.map((item) => {
    const reference = trainingMetricReference(item.key, current, series);
    return `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.detail)}</small>${metricReferenceMarkup(reference)}</article>`;
  }).join("");
}

function buildInsightCards(coaching, hasGarmin) {
  if (Array.isArray(liveAnalysis?.insightCards) && liveAnalysis.insightCards.length) return liveAnalysis.insightCards;
  if (liveAnalysisState.status === "loading") return [{
    label: "Live analysis",
    title: "Training patterns are being compared",
    body: "The coach is checking load, zones, recovery, weather, workout execution, history, and feedback before drawing conclusions.",
  }];
  return hasGarmin
    ? coaching.insightCards.map((item) => ({ ...item, label: `${item.label} · data fallback` }))
    : [{
      label: "Health data",
      title: "Garmin is the primary source",
      body: "Once the existing encrypted sync is connected, recovery and training-load context will appear here automatically.",
      source: "Connection status",
    }];
}

function splitInsightSummary(value) {
  const text = String(value || "").trim();
  if (!text) return ["No current analysis available."];
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map((item) => item.trim()).filter(Boolean);
  return sentences.slice(0, 3);
}

function renderAllTracking() {
  const coaching = buildCoachingContext();
  renderTodayWorkout(coaching);
  renderPlan(coaching);
  renderYearCounter();
  renderProgress(coaching);
  renderGuidance(coaching);
  renderTodayHealthInsight(coaching);
  renderInsights(coaching);
}

function loadSyncSettings() {
  const current = readJson(STORAGE.sync, null);
  const legacy = readJson(STORAGE.legacySync, null);
  let cookieKey = "";
  try {
    const storedCookie = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith("ben-hq-private-key="))
      ?.split("=")
      .slice(1)
      .join("=");
    cookieKey = storedCookie ? decodeURIComponent(storedCookie) : "";
  } catch {
    cookieKey = "";
  }
  const chosen = current || legacy || {};
  return {
    key: typeof chosen.key === "string" && chosen.key ? chosen.key : cookieKey,
    status: typeof chosen.status === "string" ? chosen.status : "not configured",
    lastSyncAt: typeof chosen.lastSyncAt === "string" ? chosen.lastSyncAt : "",
    progress: "",
    error: "",
  };
}

function saveSyncSettings() {
  writeJson(STORAGE.sync, syncSettings);
  if (syncSettings.key) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `ben-hq-private-key=${encodeURIComponent(syncSettings.key)}; Max-Age=31536000; Path=/; SameSite=Strict${secure}`;
    persistPrivateKeyInDatabase(syncSettings.key);
  }
}

function openPrivateKeyDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open("my-command-center-private-v1", 1);
    request.addEventListener("upgradeneeded", () => {
      if (!request.result.objectStoreNames.contains("secrets")) request.result.createObjectStore("secrets");
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function readPrivateKeyFromDatabase() {
  try {
    const database = await openPrivateKeyDatabase();
    if (!database) return "";
    const value = await new Promise((resolve, reject) => {
      const request = database.transaction("secrets", "readonly").objectStore("secrets").get("garmin-sync-key");
      request.addEventListener("success", () => resolve(request.result || ""));
      request.addEventListener("error", () => reject(request.error));
    });
    database.close();
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

async function persistPrivateKeyInDatabase(key) {
  try {
    const database = await openPrivateKeyDatabase();
    if (!database) return;
    await new Promise((resolve, reject) => {
      const request = database.transaction("secrets", "readwrite").objectStore("secrets").put(key, "garmin-sync-key");
      request.addEventListener("success", resolve);
      request.addEventListener("error", () => reject(request.error));
    });
    database.close();
  } catch {
    // The local setting and activation URL remain available as fallbacks.
  }
}

async function restoreLegacySyncKey() {
  if (syncSettings.key) {
    persistPrivateKeyInDatabase(syncSettings.key);
    return true;
  }
  const key = await readPrivateKeyFromDatabase();
  if (!key) return false;
  syncSettings = { ...syncSettings, key, status: "configured", error: "" };
  saveSyncSettings();
  return true;
}

function emptyPrivatePacket() {
  return { generatedAt: "", health: {}, training: { activities: [] }, recommendations: [], aiInsights: null, sources: [] };
}

function normalizePacket(packet) {
  if (!packet || typeof packet !== "object") return emptyPrivatePacket();
  return {
    generatedAt: firstText(packet.generatedAt, packet.packetGeneratedAt),
    health: packet.health && typeof packet.health === "object" ? packet.health : {},
    training: packet.training && typeof packet.training === "object"
      ? {
        ...packet.training,
        activities: Array.isArray(packet.training.activities) ? packet.training.activities.filter(Boolean) : [],
        activityDetails: Array.isArray(packet.training.activityDetails) ? packet.training.activityDetails.filter(Boolean) : [],
      }
      : { activities: [], activityDetails: [] },
    recommendations: Array.isArray(packet.recommendations) ? packet.recommendations.filter(Boolean) : [],
    aiInsights: packet.aiInsights && typeof packet.aiInsights === "object" ? packet.aiInsights : null,
    sources: Array.isArray(packet.sources) ? packet.sources.filter(Boolean) : [],
  };
}

function preserveLongitudinalTraining(packet, previousPacket) {
  const next = normalizePacket(packet);
  const previous = normalizePacket(previousPacket);
  const training = { ...next.training };
  const previousTraining = previous.training || {};
  const nextSeries = Array.isArray(training.analytics?.series) ? training.analytics.series : [];
  const previousSeries = Array.isArray(previousTraining.analytics?.series) ? previousTraining.analytics.series : [];

  if (!nextSeries.length && previousSeries.length) training.analytics = previousTraining.analytics;
  if (!training.activityDetails.length && previousTraining.activityDetails?.length) training.activityDetails = previousTraining.activityDetails;
  if (!training.activityHistory && previousTraining.activityHistory) training.activityHistory = previousTraining.activityHistory;
  if (!training.hrZonesYtd && previousTraining.hrZonesYtd) training.hrZonesYtd = previousTraining.hrZonesYtd;

  return { ...next, training };
}

function loadPrivatePacket() {
  return normalizePacket(readJson(STORAGE.packet, null) || readJson(STORAGE.legacyPacket, null));
}

function savePrivatePacket() {
  writeJson(STORAGE.packet, privatePacket);
}

function applyGarminActivityCompletions() {
  const activities = Array.isArray(privatePacket.training?.activities) ? privatePacket.training.activities : [];
  const todayKey = localDateKey();
  let importedDays = 0;
  activities.forEach((activity) => {
    const key = typeof activity?.date === "string" ? activity.date : "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || key > todayKey) return;
    const existing = completions[key];
    if (getOutcome(key) || (existing && typeof existing === "object" && existing.suppressGarmin)) return;
    completions[key] = {
      status: "completed",
      source: "garmin",
      activityType: firstText(activity.type),
      activityName: firstText(activity.name),
      updatedAt: privatePacket.generatedAt || new Date().toISOString(),
    };
    importedDays += 1;
  });
  if (importedDays) writeJson(STORAGE.completions, completions);
  return importedDays;
}

function hasHealthData() {
  const health = privatePacket.health || {};
  const training = privatePacket.training || {};
  return [health.sleepHours, health.restingHr, health.bodyBattery, training.lastWorkout, training.weeklyLoad?.distanceMiles].some((value) => value !== null && value !== undefined && value !== "");
}

function decodeBase64UrlBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function concatBytes(...arrays) {
  const output = new Uint8Array(arrays.reduce((sum, item) => sum + item.length, 0));
  let offset = 0;
  arrays.forEach((item) => { output.set(item, offset); offset += item.length; });
  return output;
}

async function deriveBits(secret, salt, bits = 512) {
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveBits"]);
  return crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, baseKey, bits);
}

async function deriveGcmKey(secret, salt) {
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, baseKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
}

async function decryptEnvelope(envelope) {
  const salt = decodeBase64UrlBytes(envelope.salt);
  const iv = decodeBase64UrlBytes(envelope.iv);
  const ciphertext = decodeBase64UrlBytes(envelope.ciphertext);
  if (envelope.algorithm === "AES-CBC-256-PBKDF2-HMACSHA256") {
    const bits = new Uint8Array(await deriveBits(syncSettings.key, salt));
    const encBytes = bits.slice(0, 32);
    const macBytes = bits.slice(32, 64);
    const macKey = await crypto.subtle.importKey("raw", macBytes, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const valid = await crypto.subtle.verify("HMAC", macKey, decodeBase64UrlBytes(envelope.mac), concatBytes(iv, ciphertext));
    if (!valid) throw new Error("Packet key did not match");
    const key = await crypto.subtle.importKey("raw", encBytes, "AES-CBC", false, ["decrypt"]);
    return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, ciphertext)));
  }
  if (envelope.algorithm === "AES-GCM-256-PBKDF2-SHA256") {
    const encrypted = concatBytes(ciphertext, decodeBase64UrlBytes(envelope.tag));
    const key = await deriveGcmKey(syncSettings.key, salt);
    return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted)));
  }
  throw new Error("Unsupported packet format");
}

function importSyncKeyFromHash() {
  if (!window.location.hash) return false;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const key = params.get("syncKey") || params.get("auto-sync-key");
  if (!key) return false;
  syncSettings.key = key;
  syncSettings.status = "configured";
  saveSyncSettings();
  if (window.history?.replaceState) window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  return true;
}

async function fetchLatestPrivatePacket() {
  const response = await fetch(`data/ben-hq-latest.enc.json?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Fitness packet unavailable");
  return normalizePacket(await decryptEnvelope(await response.json()));
}

function installPrivatePacket(packet, showResult = false) {
  const previousPacket = JSON.stringify(privatePacket);
  privatePacket = preserveLongitudinalTraining(packet, privatePacket);
  savePrivatePacket();
  const importedDays = applyGarminActivityCompletions();
  syncSettings.status = "live";
  syncSettings.progress = "";
  syncSettings.lastSyncAt = new Date().toISOString();
  syncSettings.error = "";
  saveSyncSettings();
  renderSyncStatus();
  renderAllTracking();
  if (showResult) {
    const message = importedDays
      ? `${importedDays} Garmin workout day${importedDays === 1 ? "" : "s"} marked complete.`
      : JSON.stringify(privatePacket) === previousPacket
        ? "Garmin data is already current."
        : "Garmin data is up to date.";
    showToast(message);
  }
  return importedDays;
}

async function refreshGarminData(showResult = false) {
  if (!syncSettings.key) {
    syncSettings.status = "not configured";
    saveSyncSettings();
    renderSyncStatus();
    if (showResult) showToast("Connect the existing sync key once on this phone.");
    return false;
  }
  syncSettings.status = "checking";
  syncSettings.progress = "Checking Garmin";
  renderSyncStatus();
  try {
    installPrivatePacket(await fetchLatestPrivatePacket(), showResult);
    return true;
  } catch {
    syncSettings.status = "error";
    syncSettings.progress = "";
    syncSettings.error = "The latest encrypted packet could not be read.";
    saveSyncSettings();
    renderSyncStatus();
    if (showResult) showToast("The last good Garmin snapshot is still available.");
    return false;
  }
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function signRefreshRequest(timestamp, nonce, signedPayload = "") {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(syncSettings.key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const message = `${timestamp}.${nonce}${signedPayload ? `.${signedPayload}` : ""}`;
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bytesToHex(new Uint8Array(signature));
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function triggerGarminRefresh() {
  const timestamp = Date.now();
  const nonce = crypto.randomUUID();
  const signature = await signRefreshRequest(timestamp, nonce);
  const response = await fetch(GARMIN_REFRESH_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ timestamp, nonce, signature }),
  });
  if (!response.ok) throw new Error("Garmin refresh could not be started");
}

async function waitForNewGarminPacket(previousGeneratedAt) {
  const previousTime = Date.parse(previousGeneratedAt || "") || 0;
  for (let poll = 0; poll < GARMIN_REFRESH_MAX_POLLS; poll += 1) {
    await wait(GARMIN_REFRESH_POLL_MS);
    syncSettings.progress = poll < 4 ? "Connecting to Garmin" : poll < 20 ? "Updating your data" : "Finishing refresh";
    renderSyncStatus();
    try {
      const packet = await fetchLatestPrivatePacket();
      const packetTime = Date.parse(packet.generatedAt || "") || 0;
      if (packetTime > previousTime) return packet;
    } catch {
      // Keep the previous good packet in place while the cloud refresh runs.
    }
  }
  throw new Error("Garmin refresh timed out");
}

async function refreshDashboardData() {
  if (!syncSettings.key) {
    openSyncKeyPanel();
    showToast("Connect the existing sync key once on this phone.");
    return;
  }
  if (!GARMIN_REFRESH_ENDPOINT) {
    await refreshGarminData(true);
    return;
  }
  syncSettings.status = "checking";
  syncSettings.progress = "Starting Garmin refresh";
  syncSettings.error = "";
  renderSyncStatus();
  try {
    const previousGeneratedAt = privatePacket.generatedAt;
    await triggerGarminRefresh();
    installPrivatePacket(await waitForNewGarminPacket(previousGeneratedAt), true);
    const analyzed = await requestLiveAnalysis("manual Garmin refresh");
    showToast(analyzed ? "Garmin and fresh coaching analysis are up to date." : "Garmin updated. Live coaching analysis is unavailable right now.");
  } catch {
    syncSettings.status = "error";
    syncSettings.progress = "";
    syncSettings.error = "The Garmin refresh did not finish.";
    saveSyncSettings();
    renderSyncStatus();
    showToast("Garmin did not finish refreshing. Your last good data is still here.");
  }
}

function freshnessLabel(value) {
  if (!value) return "Saved Garmin snapshot";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved Garmin snapshot";
  return `Updated ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

function renderSyncStatus() {
  const hasData = hasHealthData();
  const statusText = document.getElementById("garminStatusText");
  const railText = document.getElementById("railSyncLabel");
  const dot = document.querySelector(".pulse-dot");
  const connectButton = document.getElementById("enterSyncKey");
  const dashboardButton = document.getElementById("dashboardRefresh");
  const dashboardStatus = document.getElementById("dashboardRefreshStatus");
  if (syncSettings.status === "checking") {
    statusText.textContent = `${syncSettings.progress || "Refreshing Garmin"}…`;
    railText.textContent = "Refreshing Garmin";
  } else if (syncSettings.status === "live" || hasData) {
    statusText.textContent = `Your encrypted Garmin snapshot is connected. ${freshnessLabel(privatePacket.generatedAt)}.`;
    railText.textContent = "Garmin connected";
  } else if (syncSettings.status === "error") {
    statusText.textContent = hasData ? "The live refresh missed, so the app kept your last good Garmin snapshot." : "The current Garmin packet could not be opened on this device.";
    railText.textContent = hasData ? "Saved Garmin data" : "Garmin needs attention";
  } else {
    statusText.textContent = "Connect the existing private sync key once on this phone to receive automatic Garmin snapshots.";
    railText.textContent = "Garmin not connected";
  }
  connectButton.textContent = syncSettings.key ? "Replace sync key" : "Connect sync key";
  dot.classList.toggle("offline", !(syncSettings.status === "live" || hasData));
  const isChecking = syncSettings.status === "checking";
  dashboardButton.disabled = isChecking;
  dashboardButton.classList.toggle("refreshing", isChecking);
  dashboardStatus.textContent = isChecking
    ? (syncSettings.progress || "Checking Garmin")
    : syncSettings.status === "error"
      ? "Using saved data"
      : hasData
        ? freshnessLabel(privatePacket.generatedAt)
        : syncSettings.key
          ? "Ready to check"
          : "Connect Garmin";
  dashboardButton.setAttribute("aria-label", isChecking ? "Refreshing Garmin data" : `Refresh Garmin data. ${dashboardStatus.textContent}`);
}

function openSyncKeyPanel() {
  const panel = document.getElementById("syncKeyPanel");
  const input = document.getElementById("syncKeyInput");
  input.value = "";
  panel.hidden = false;
  window.requestAnimationFrame(() => input.focus());
}

function closeSyncKeyPanel() {
  document.getElementById("syncKeyPanel").hidden = true;
  document.getElementById("syncKeyInput").value = "";
}

async function connectSyncKey(event) {
  event.preventDefault();
  const input = document.getElementById("syncKeyInput");
  const value = input.value.trim();
  if (!value) return;
  syncSettings.key = value;
  syncSettings.status = "configured";
  syncSettings.error = "";
  saveSyncSettings();
  closeSyncKeyPanel();
  await refreshGarminData(true);
}

function changeCalendarMonth(delta) {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + delta, 1);
  renderProgress();
}

function exportBackup() {
  const payload = { app: "My Fitness Command Center", version: 2, exportedAt: new Date().toISOString(), completions, workoutFeedback, recommendationHistory };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `fitness-hq-backup-${localDateKey()}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
  showToast("Consistency backup exported.");
}

async function importBackup(file) {
  try {
    const payload = JSON.parse(await file.text());
    if (!payload?.completions || typeof payload.completions !== "object" || Array.isArray(payload.completions)) throw new Error("Invalid backup");
    completions = payload.completions;
    writeJson(STORAGE.completions, completions);
    if (payload.workoutFeedback && typeof payload.workoutFeedback === "object" && !Array.isArray(payload.workoutFeedback)) {
      workoutFeedback = payload.workoutFeedback;
      writeJson(STORAGE.feedback, workoutFeedback);
    }
    if (payload.recommendationHistory && typeof payload.recommendationHistory === "object" && !Array.isArray(payload.recommendationHistory)) {
      recommendationHistory = payload.recommendationHistory;
      writeJson(STORAGE.recommendationHistory, recommendationHistory);
    }
    renderAllTracking();
    showToast("Consistency backup restored.");
  } catch {
    showToast("That file is not a Fitness HQ backup.");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderAppVersion() {
  document.querySelectorAll("[data-app-version]").forEach((element) => {
    element.textContent = `v${APP_VERSION}`;
    element.setAttribute("aria-label", `Fitness HQ version ${APP_VERSION}`);
  });
}

function wireEvents() {
  document.body.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      navigate(viewButton.dataset.view);
      return;
    }
    const outcome = event.target.closest("[data-completion]");
    if (outcome) {
      setTodayOutcome(outcome.dataset.completion);
      return;
    }
    const calendarDay = event.target.closest(".calendar-day[data-date]");
    if (calendarDay && !calendarDay.disabled) {
      toggleDateCompletion(calendarDay.dataset.date, calendarDay);
      return;
    }
    const planButton = event.target.closest(".plan-day-button");
    if (planButton) {
      const card = planButton.closest(".plan-day");
      const open = card.classList.toggle("open");
      planButton.setAttribute("aria-expanded", String(open));
    }
  });

  document.getElementById("clearTodayOutcome").addEventListener("click", clearTodayOutcome);
  document.getElementById("previousMonth").addEventListener("click", () => changeCalendarMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => changeCalendarMonth(1));
  document.getElementById("jumpToCurrentMonth").addEventListener("click", () => { calendarCursor = new Date(); renderProgress(); });
  document.getElementById("enterSyncKey").addEventListener("click", openSyncKeyPanel);
  document.getElementById("syncKeyForm").addEventListener("submit", connectSyncKey);
  document.getElementById("closeSyncKeyPanel").addEventListener("click", closeSyncKeyPanel);
  document.getElementById("cancelSyncKeyPanel").addEventListener("click", closeSyncKeyPanel);
  document.getElementById("syncKeyPanel").addEventListener("click", (event) => {
    if (event.target.id === "syncKeyPanel") closeSyncKeyPanel();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !document.getElementById("syncKeyPanel").hidden) closeSyncKeyPanel();
  });
  document.getElementById("dashboardRefresh").addEventListener("click", refreshDashboardData);
  document.getElementById("workoutFeedbackForm").addEventListener("submit", saveWorkoutFeedback);
  document.getElementById("clearWorkoutFeedback").addEventListener("click", clearWorkoutFeedback);
  document.getElementById("exportData").addEventListener("click", exportBackup);
  document.getElementById("importData").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importBackup(file);
    event.target.value = "";
  });
}

async function init() {
  renderAppVersion();
  importSyncKeyFromHash();
  await restoreLegacySyncKey();
  renderNavigation();
  renderDateHeader();
  renderAllTracking();
  renderSyncStatus();
  wireEvents();
  await refreshGarminData(false);
  await requestLiveAnalysis("app reload");
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register(`sw.js?build=${APP_VERSION}`, { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch(() => {});
  }
}

init();
