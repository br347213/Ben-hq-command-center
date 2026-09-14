from pathlib import Path


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, found {count}")
    return text.replace(old, new, 1)


p = Path("refresh-worker/src/index.js")
s = p.read_text()

s = replace_once(
    s,
    'const WORKER_VERSION = "2026-09-14b";',
    'const WORKER_VERSION = "2026-09-14c";',
    "worker version",
)

marker = '''function targetRun(context, slot) {
'''
helpers = r'''function finiteNumber(value) {
  const number = Number(value);
  return value !== null && value !== undefined && value !== "" && Number.isFinite(number) ? number : null;
}

function healthContextPoints(context) {
  const health = context?.health || {};
  const baselines = health.baselines || {};
  const sleep = finiteNumber(health.sleepHours);
  const sleepBaseline = finiteNumber(baselines.sleep7Day);
  const restingHr = finiteNumber(health.restingHr);
  const restingHrBaseline = finiteNumber(baselines.restingHr7Day);
  const bodyBattery = finiteNumber(health.bodyBattery);
  const stress = finiteNumber(health.stress);
  const points = [];

  if (sleep !== null && restingHr !== null) {
    points.push(`Latest sleep is ${sleep.toFixed(1)} h and resting HR is ${Math.round(restingHr)} bpm; use the pair as context rather than a single readiness score.`);
  } else if (sleepBaseline !== null && restingHrBaseline !== null) {
    points.push(`Fresh daily recovery readings are incomplete; available 7-day baselines are ${sleepBaseline.toFixed(1)} h sleep and ${Math.round(restingHrBaseline)} bpm resting HR.`);
  } else if (sleep !== null || sleepBaseline !== null || restingHr !== null || restingHrBaseline !== null) {
    const sleepText = sleep !== null ? `${sleep.toFixed(1)} h latest sleep` : sleepBaseline !== null ? `${sleepBaseline.toFixed(1)} h 7-day sleep baseline` : "sleep unavailable";
    const hrText = restingHr !== null ? `${Math.round(restingHr)} bpm latest resting HR` : restingHrBaseline !== null ? `${Math.round(restingHrBaseline)} bpm 7-day resting-HR baseline` : "resting HR unavailable";
    points.push(`${sleepText}; ${hrText}. Treat missing daily values as unavailable rather than inferring them.`);
  } else {
    points.push("Current sleep and resting-HR readings are unavailable, so the coaching read should not infer recovery from those signals.");
  }

  if (bodyBattery !== null || stress !== null) {
    const pieces = [];
    if (bodyBattery !== null) pieces.push(`Body Battery ${Math.round(bodyBattery)}`);
    if (stress !== null) pieces.push(`stress ${Math.round(stress)}`);
    points.push(`${pieces.join(" and ")} add context, but should be weighed with recent training and how you feel.`);
  } else {
    points.push("Body Battery and stress are unavailable; recent training, sleep/heart-rate context, and your own feedback carry more weight today.");
  }

  return points.slice(0, 3);
}

function groundAerobicEffectText(value, context, fallback) {
  let output = text(value, fallback);
  const actual = finiteNumber(context?.training?.latestCompletedWorkout?.activity?.aerobicEffect);
  if (actual !== null) {
    output = output.replace(/(aerobic(?: training)? effect(?: of)?\s*)(\d+(?:\.\d+)?)/gi, `$1${actual.toFixed(1)}`);
  } else if (/aerobic(?: training)? effect/i.test(output)) {
    output = fallback;
  }
  return output;
}

function groundedWorkoutSignals(context) {
  const latest = context?.training?.latestCompletedWorkout;
  if (!latest?.activity) return [];
  const activity = latest.activity || {};
  const scheduled = latest.scheduledPlanOnThatDate || {};
  const weekly = context?.training?.weeklyLoad || {};
  const health = context?.health || {};
  const baselines = health.baselines || {};
  const signals = [];

  const planned = String(scheduled.title || "").trim();
  const performed = String(activity.name || activity.type || "").trim();
  if (planned || performed) {
    signals.push({
      label: "Intent versus execution",
      value: planned && performed ? `${planned} → ${performed}` : (performed || planned),
      detail: latest.occurredOn ? `Same-date comparison for ${latest.occurredOn}` : "Same-date plan and recorded activity",
    });
  }

  const aerobicEffect = finiteNumber(activity.aerobicEffect);
  const averageHr = finiteNumber(activity.averageHr);
  if (aerobicEffect !== null) {
    signals.push({
      label: "Cardiovascular cost",
      value: `Garmin aerobic effect ${aerobicEffect.toFixed(1)}`,
      detail: "Recorded Garmin value from the latest completed workout",
    });
  } else if (averageHr !== null) {
    signals.push({
      label: "Cardiovascular cost",
      value: `${Math.round(averageHr)} bpm average HR`,
      detail: "Recorded average heart rate; wrist HR is useful but not perfectly precise",
    });
  }

  const temperature = finiteNumber(activity.weather?.temperatureF);
  const humidity = finiteNumber(activity.weather?.relativeHumidityPct);
  if (temperature !== null || humidity !== null) {
    const weatherParts = [];
    if (temperature !== null) weatherParts.push(`${Math.round(temperature)}°F`);
    if (humidity !== null) weatherParts.push(`${Math.round(humidity)}% humidity`);
    signals.push({
      label: "Conditions",
      value: weatherParts.join(" · "),
      detail: "Recorded conditions for the latest workout",
    });
  }

  const weeklyMiles = finiteNumber(weekly.distanceMiles);
  const loadChange = finiteNumber(weekly.distanceChangePct);
  if (weeklyMiles !== null || loadChange !== null) {
    const loadParts = [];
    if (weeklyMiles !== null) loadParts.push(`${weeklyMiles.toFixed(1)} mi in 7 days`);
    if (loadChange !== null) loadParts.push(`${loadChange >= 0 ? "+" : ""}${Math.round(loadChange)}% vs prior 7 days`);
    signals.push({
      label: "Load context",
      value: loadParts.join(" · "),
      detail: "Recent running load surrounding the session",
    });
  }

  if (signals.length < 2) {
    const sleep = finiteNumber(health.sleepHours ?? baselines.sleep7Day);
    const restingHr = finiteNumber(health.restingHr ?? baselines.restingHr7Day);
    if (sleep !== null || restingHr !== null) {
      const parts = [];
      if (sleep !== null) parts.push(`${sleep.toFixed(1)} h sleep context`);
      if (restingHr !== null) parts.push(`${Math.round(restingHr)} bpm resting HR`);
      signals.push({ label: "Recovery context", value: parts.join(" · "), detail: "Available recovery context used for interpretation" });
    }
  }

  return signals.slice(0, 4);
}

'''
if "function healthContextPoints(context)" not in s:
    s = replace_once(s, marker, helpers + marker, "grounding helpers")

old_signals = '''  const rawSignals = Array.isArray(analysis.workoutAnalysis?.signals) ? analysis.workoutAnalysis.signals : [];
  const signals = rawSignals
    .filter((item) => item && typeof item === "object")
    .slice(0, 4)
    .map((item) => ({
      label: text(item.label, "Load context", 60),
      value: text(item.value, "Current context", 120),
      detail: text(item.detail, "Interpreted with the surrounding training week", 180),
    }));
  if (signals.length < 2) {
    signals.push(
      { label: "Load context", value: "Recent training considered", detail: "The latest session was interpreted with surrounding load." },
      { label: "Recovery context", value: "Current recovery considered", detail: "Sleep, heart-rate, stress, and subjective context were weighed when available." },
    );
  }
'''
new_signals = '''  const signals = groundedWorkoutSignals(context);
  if (signals.length < 2) {
    signals.push(
      { label: "Load context", value: "Recent training considered", detail: "The latest session was interpreted with surrounding load." },
      { label: "Recovery context", value: "Available recovery considered", detail: "Missing recovery values were treated as unavailable rather than inferred." },
    );
  }
'''
s = replace_once(s, old_signals, new_signals, "grounded workout signals")

old_health = '''    dailyHealth: {
      headline: text(analysis.dailyHealth?.headline, "Use the current recovery picture as context, not a score"),
      points: textList(analysis.dailyHealth?.points, [
        "Read sleep and heart-rate trends together rather than reacting to one number.",
        "Let unusual fatigue, pain, illness, or stress lower today's training cost.",
      ], 2, 3),
    },'''
new_health = '''    dailyHealth: {
      headline: text(analysis.dailyHealth?.headline, "Use the current recovery picture as context, not a score"),
      points: healthContextPoints(context),
    },'''
s = replace_once(s, old_health, new_health, "grounded daily health")

old_workout = '''      title: text(analysis.workoutAnalysis?.title, latest ? `Use ${latestName} to set the cost of the next session` : "Waiting for a completed Garmin workout"),
      body: text(analysis.workoutAnalysis?.body, latest ? "Judge the completed session against its same-day plan and the surrounding training week rather than treating completion itself as proof of success." : "No completed Garmin workout is available to analyze yet."),
      effect: text(analysis.workoutAnalysis?.effect, latest ? "The practical effect is how much recovery cost this session adds before the next scheduled workout." : "No training effect can be inferred without a recorded session."),'''
new_workout = '''      title: groundAerobicEffectText(analysis.workoutAnalysis?.title, context, latest ? `Use ${latestName} to set the cost of the next session` : "Waiting for a completed Garmin workout"),
      body: groundAerobicEffectText(analysis.workoutAnalysis?.body, context, latest ? "Judge the completed session against its same-day plan and the surrounding training week rather than treating completion itself as proof of success." : "No completed Garmin workout is available to analyze yet."),
      effect: groundAerobicEffectText(analysis.workoutAnalysis?.effect, context, latest ? "The practical effect is how much recovery cost this session adds before the next scheduled workout." : "No training effect can be inferred without a recorded session."),'''
s = replace_once(s, old_workout, new_workout, "ground aerobic effect prose")

old_prompt = '''Keep every prose field concise for a phone. Address Ben as "you". No Markdown, HTML, URLs, or decorative bullets inside strings.
'''
new_prompt = '''Keep every prose field concise for a phone. Address Ben as "you". No Markdown, HTML, URLs, or decorative bullets inside strings. Never output the literal values null, undefined, or NaN. Do not convert units that were not supplied. If a current health value is missing, call it unavailable rather than inventing or substituting a different metric. If you cite Garmin aerobic effect, use the exact latestCompletedWorkout.activity.aerobicEffect value supplied in the context.
'''
s = replace_once(s, old_prompt, new_prompt, "grounding prompt")

p.write_text(s)
