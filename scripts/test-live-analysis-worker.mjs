import assert from "node:assert/strict";

const worker = (await import(new URL(`../refresh-worker/src/index.js?test=${Date.now()}`, import.meta.url))).default;
const origin = "https://br347213.github.io";
const secret = "test-private-sync-key";

const analysis = {
  dailyGuidance: { title: "Keep the run easy", body: "Recovery is normal, but the week already contains enough intensity." },
  dailyHealth: { headline: "Recovery is broadly steady", points: ["Sleep and resting heart rate are near baseline.", "Stress and training load do not expose a new concern."] },
  runRecommendations: {
    sunday: { kind: "long", title: "Easy long run", summary: "Preserve the aerobic purpose.", prescription: ["Run conversationally", "Stop at five miles"], evidence: ["Current recovery", "Recent load"], confidence: "Reasonable confidence" },
    tuesday: { kind: "easy", title: "Easy aerobic run", summary: "Keep the running rhythm inexpensive.", prescription: ["Run conversationally", "Finish with margin"], evidence: ["Current recovery", "Fixed plan"], confidence: "Reasonable confidence" },
    wednesday: { kind: "easy", title: "Low-cost easy run", summary: "Protect separation from harder work.", prescription: ["Keep breathing easy", "Do not add a fast finish"], evidence: ["Intensity distribution", "Weekly rhythm"], confidence: "Reasonable confidence" },
    saturday: { kind: "quality", title: "Controlled tempo option", summary: "Use one purposeful quality slot only if recovery holds.", prescription: ["Warm up easily", "Keep tempo controlled"], evidence: ["One-quality-session limit", "Current load"], confidence: "Provisional" },
  },
  workoutAnalysis: { title: "The last run filled the quality slot", body: "The workout was meaningfully harder than an easy run, so it supplied this week's quality stimulus and changes the role of the next session.", effect: "Count the cardiovascular stimulus once.", next: "Keep the next run easy.", signals: [{ label: "Intent", value: "Easy → quality", detail: "Effort exceeded intent" }, { label: "Context", value: "Warm conditions", detail: "Heat raised cost" }], intent: "easy → quality", confidence: "High confidence" },
  coachingFocus: { title: "Separate easy and hard running", rationale: "The current intensity distribution is the clearest opportunity.", action: "Keep routine runs conversational.", successMarker: "Easy days become repeatable.", horizon: "Next 2 weeks", confidence: "High confidence" },
  weeklyReview: { title: "Intensity rose while frequency held", summary: "The week had enough stimulus.", win: "Frequency remained consistent.", watch: "Do not stack quality work.", confidence: "High confidence" },
  insightCards: [
    { label: "Intensity", title: "Easy days are drifting upward", body: "Heart-rate distribution shows more moderate-hard work than intended." },
    { label: "Load", title: "Fitness and fatigue remain aligned", body: "The current load does not require catch-up work." },
    { label: "Recovery", title: "Sleep is not the limiter", body: "Recent sleep and resting heart rate remain close to baseline." },
  ],
};

let modelCalls = 0;
const env = {
  ALLOWED_ORIGIN: origin,
  REFRESH_SHARED_SECRET: secret,
  AI: {
    async run(model, input) {
      modelCalls += 1;
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

const contextJson = JSON.stringify({
  schemaVersion: 1,
  currentDate: "2026-08-23",
  athlete: { name: "Ben" },
  training: { weeklyLoad: {} },
  runningDays: ["2026-08-23", "2026-08-25", "2026-08-26", "2026-08-29"].map((targetDate) => ({ targetDate })),
});
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
assert.equal(modelCalls, 2);

const repairTimestamp = Date.now() + 1;
const repairNonce = crypto.randomUUID();
const repairSignature = await sign(repairTimestamp, repairNonce, contextJson);
const repairEnv = {
  ...env,
  AI: {
    async run() {
      const nearJson = JSON.stringify(analysis)
        .replace('"weeklyReview":', "weeklyReview:")
        .replace("Recovery is normal", 'Recovery is "normal"')
        .replace(/}$/, ",}");
      return { response: `\`\`\`json\n${nearJson}\n\`\`\`` };
    },
  },
};
const repairedResponse = await worker.fetch(new Request("https://worker.example/analyze", {
  method: "POST",
  headers: { origin, "content-type": "application/json" },
  body: JSON.stringify({ timestamp: repairTimestamp, nonce: repairNonce, signature: repairSignature, contextJson }),
}), repairEnv);
assert.equal(repairedResponse.status, 200);
const repairedPayload = await repairedResponse.json();
assert.equal(repairedPayload.analysis.weeklyReview.title, analysis.weeklyReview.title);

const rejected = await worker.fetch(new Request("https://worker.example/analyze", {
  method: "POST",
  headers: { origin, "content-type": "application/json" },
  body: JSON.stringify({ timestamp, nonce, signature: "0".repeat(64), contextJson }),
}), env);
assert.equal(rejected.status, 401);

console.log("Live analysis Worker scenarios passed.");
