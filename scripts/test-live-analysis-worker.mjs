import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../refresh-worker/src/index.js", import.meta.url), "utf8");
const worker = (await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`)).default;
const origin = "https://br347213.github.io";
const secret = "test-private-sync-key";

const analysis = {
  dailyGuidance: { title: "Keep the run easy", body: "Recovery is normal, but the week already contains enough intensity." },
  dailyHealth: { headline: "Recovery is broadly steady", points: ["Sleep and resting heart rate are near baseline.", "Stress and training load do not expose a new concern."] },
  runRecommendations: [{ targetDate: "2026-08-23", kind: "easy", title: "Easy 5 miles", summary: "Preserve the aerobic purpose.", prescription: ["Run conversationally", "Stop at five miles"], evidence: ["Current recovery", "Recent load"], confidence: "Reasonable confidence" }],
  workoutAnalysis: { title: "The last run filled the quality slot", body: "The workout was meaningfully harder than an easy run.", effect: "Count the cardiovascular stimulus once.", next: "Keep the next run easy.", signals: [{ label: "Intent", value: "Easy → quality", detail: "Effort exceeded intent" }, { label: "Context", value: "Warm conditions", detail: "Heat raised cost" }], intent: "easy → quality", confidence: "High confidence" },
  coachingFocus: { title: "Separate easy and hard running", rationale: "The current intensity distribution is the clearest opportunity.", action: "Keep routine runs conversational.", successMarker: "Easy days become repeatable.", horizon: "Next 2 weeks", confidence: "High confidence" },
  weeklyReview: { title: "Intensity rose while frequency held", summary: "The week had enough stimulus.", win: "Frequency remained consistent.", watch: "Do not stack quality work.", confidence: "High confidence" },
  insightCards: [
    { label: "Intensity", title: "Easy days are drifting upward", body: "Heart-rate distribution shows more moderate-hard work than intended." },
    { label: "Load", title: "Fitness and fatigue remain aligned", body: "The current load does not require catch-up work." },
    { label: "Recovery", title: "Sleep is not the limiter", body: "Recent sleep and resting heart rate remain close to baseline." },
  ],
};

const env = {
  ALLOWED_ORIGIN: origin,
  REFRESH_SHARED_SECRET: secret,
  AI: {
    async run(model, input) {
      assert.equal(model, "@cf/meta/llama-3.1-8b-instruct-fast");
      assert.equal(input.response_format.type, "json_schema");
      return { response: analysis, usage: { prompt_tokens: 100, completion_tokens: 200 } };
    },
  },
};

async function sign(timestamp, nonce, contextJson) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const value = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${nonce}.${contextJson}`));
  return Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const contextJson = JSON.stringify({ schemaVersion: 1, currentDate: "2026-08-23", athlete: { name: "Ben" }, training: { weeklyLoad: {} } });
const timestamp = Date.now();
const nonce = crypto.randomUUID();
const signature = await sign(timestamp, nonce, contextJson);
const response = await worker.fetch(new Request("https://worker.example/analyze", {
  method: "POST",
  headers: { origin, "content-type": "application/json" },
  body: JSON.stringify({ timestamp, nonce, signature, contextJson }),
}), env);
assert.equal(response.status, 200);
const payload = await response.json();
assert.equal(payload.analysis.coachingFocus.title, analysis.coachingFocus.title);
assert.equal(payload.model, "@cf/meta/llama-3.1-8b-instruct-fast");

const rejected = await worker.fetch(new Request("https://worker.example/analyze", {
  method: "POST",
  headers: { origin, "content-type": "application/json" },
  body: JSON.stringify({ timestamp, nonce, signature: "0".repeat(64), contextJson }),
}), env);
assert.equal(rejected.status, 401);

console.log("Live analysis Worker scenarios passed.");
