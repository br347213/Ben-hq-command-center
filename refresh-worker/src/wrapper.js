import worker from "./index.js";

const WRAPPER_VERSION = "2026-09-14d";

function finiteNumber(value) {
  const number = Number(value);
  return value !== null && value !== undefined && value !== "" && Number.isFinite(number) ? number : null;
}

function groundedWeeklyReview(context) {
  const weekly = context?.training?.weeklyLoad || {};
  const current = context?.training?.analytics?.currentState || {};
  const miles = finiteNumber(weekly.distanceMiles);
  const runs = finiteNumber(weekly.activities);
  const priorRuns = finiteNumber(weekly.previousActivities);
  const change = finiteNumber(weekly.distanceChangePct);
  const fitness = finiteNumber(current.longTermFitnessLoadPoints);
  const fatigue = finiteNumber(current.shortTermFatigueLoadPoints);
  const loadBalance = finiteNumber(current.loadBalanceFatigueDividedByFitness);

  let title = "Keep this week repeatable before adding more";
  if (change !== null && change >= 25) title = "Running load rose sharply this week";
  else if (change !== null && change <= -25) title = "Running load is lighter than last week";
  else if (runs !== null && priorRuns !== null && runs > priorRuns) title = "Run frequency increased this week";
  else if (runs !== null && priorRuns !== null && runs < priorRuns) title = "Run frequency eased this week";

  const summaryParts = [];
  if (miles !== null) summaryParts.push(`${miles.toFixed(1)} miles in the last seven days`);
  if (runs !== null) summaryParts.push(`${Math.round(runs)} run${Math.round(runs) === 1 ? "" : "s"}`);
  if (change !== null) summaryParts.push(`${change >= 0 ? "+" : ""}${change.toFixed(1)}% distance versus the prior seven days`);
  const summary = summaryParts.length
    ? `${summaryParts.join(" · ")}. That change is the main weekly load signal.`
    : "Recent running volume and frequency are the main weekly signals; keep the next decision proportional to the data that is actually available.";

  let win = runs !== null && priorRuns !== null
    ? `Run frequency is ${Math.round(runs)} session${Math.round(runs) === 1 ? "" : "s"} versus ${Math.round(priorRuns)} in the prior seven days.`
    : "The useful win is preserving a repeatable schedule without catch-up work.";
  if (miles !== null && runs !== null) {
    win = `You accumulated ${miles.toFixed(1)} running miles across ${Math.round(runs)} session${Math.round(runs) === 1 ? "" : "s"}.`;
  }

  let watch = "Watch for repeated fatigue, pain, illness, or routine runs drifting harder than intended.";
  if (fatigue !== null && fitness !== null && fatigue > fitness) {
    watch = `Short-term load (${fatigue.toFixed(1)}) is above long-term load (${fitness.toFixed(1)}). Keep the next sessions low-cost until that gap narrows.`;
  } else if (loadBalance !== null && loadBalance > 1.2) {
    watch = `Load balance is ${loadBalance.toFixed(2)}, so recent work is elevated relative to your longer-term base. Avoid another abrupt load jump.`;
  } else if (change !== null && change >= 25) {
    watch = `Distance is up ${change.toFixed(1)}% versus the prior seven days. Let that increase settle before adding more volume or intensity.`;
  }

  return { title, summary, win, watch, confidence: "Reasonable confidence" };
}

async function replaceWeeklyReview(request, response) {
  if (!response.ok) return response;
  let requestBody;
  let payload;
  try {
    requestBody = await request.json();
    payload = await response.clone().json();
  } catch {
    return response;
  }
  if (!payload?.analysis || typeof requestBody?.contextJson !== "string") return response;

  let context;
  try {
    context = JSON.parse(requestBody.contextJson);
  } catch {
    return response;
  }

  payload.analysis.weeklyReview = groundedWeeklyReview(context);
  payload.wrapperVersion = WRAPPER_VERSION;
  const headers = new Headers(response.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.delete("content-length");
  return new Response(JSON.stringify(payload), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/analyze") {
      const copy = request.clone();
      return replaceWeeklyReview(copy, await worker.fetch(request, env));
    }
    return worker.fetch(request, env);
  },
};
