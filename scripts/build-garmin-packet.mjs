import { readFileSync, writeFileSync } from "node:fs";
import { createCipheriv, createDecipheriv, createHmac, pbkdf2Sync, randomBytes } from "node:crypto";
import { resolve } from "node:path";

const ITERATIONS = 120_000;

function usage() {
  console.error("Usage: node scripts/build-garmin-packet.mjs <garmin-summary.json> <sync-key.txt> <output.json> [recommendations.json]");
  process.exit(1);
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function buildRecommendations(summary) {
  const recommendations = [];
  const health = summary.health || {};
  const load = summary.training?.weeklyLoad || {};
  const recoveryAvailable = [health.sleepHours, health.hrv, health.restingHr, health.bodyBattery].some(hasValue);

  recommendations.push({
    title: recoveryAvailable ? "Use the plan, with Garmin as context" : "Keep the plan simple today",
    detail: recoveryAvailable
      ? "Garmin recovery data is available as context. Follow the fixed schedule and choose the minimum version if your body or the day calls for it."
      : "Garmin has not posted today's recovery fields yet. Follow the fixed schedule, use the minimum version if needed, and do not add work just to compensate.",
    source: "Garmin recovery snapshot + fixed weekly plan",
  });

  const change = Number(load.distanceChangePct);
  if (hasValue(load.distanceMiles) && Number.isFinite(change)) {
    recommendations.push({
      title: change <= -30 ? "Rebuild the running rhythm gently" : change >= 30 ? "Let the running increase settle" : "Running load is steady enough",
      detail: change <= -30
        ? `The latest seven-day total is ${load.distanceMiles} miles, down from the prior week. Keep easy days easy and return to the normal rhythm without catch-up miles.`
        : change >= 30
          ? `The latest seven-day total is ${load.distanceMiles} miles, above the prior week. Keep the next easy run honestly easy.`
          : `The latest seven-day total is ${load.distanceMiles} miles. No special adjustment is needed; continue the normal weekly rhythm.`,
      source: "Garmin seven-day running load",
    });
  }

  return recommendations.slice(0, 2);
}

function readRecommendations(pathArg, summary) {
  if (!pathArg) return buildRecommendations(summary);
  const input = JSON.parse(readFileSync(resolve(pathArg), "utf8"));
  const items = Array.isArray(input) ? input : input.recommendations;
  if (!Array.isArray(items)) throw new Error("The recommendations file must contain an array.");
  const normalized = items.slice(0, 2).map((item) => ({
    title: typeof item?.title === "string" ? item.title.trim() : "",
    detail: typeof item?.detail === "string" ? item.detail.trim() : "",
    source: typeof item?.source === "string" ? item.source.trim() : "",
  })).filter((item) => item.title && item.detail && item.source);
  return normalized.length ? normalized : buildRecommendations(summary);
}

function main() {
  const [, , summaryArg, keyArg, outputArg, recommendationsArg] = process.argv;
  if (!summaryArg || !keyArg || !outputArg) usage();

  const summaryPath = resolve(summaryArg);
  const keyPath = resolve(keyArg);
  const outputPath = resolve(outputArg);
  const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
  const secret = readFileSync(keyPath, "utf8").trim();
  if (!secret) throw new Error("The sync key file is empty.");
  if (summary.status !== "ready") throw new Error("The Garmin summary is not ready.");

  const packet = {
    app: "My Fitness Command Center",
    kind: "private-fitness-daily",
    generatedAt: summary.generatedAt || new Date().toISOString(),
    health: summary.health || {},
    training: {
      lastWorkout: summary.training?.lastWorkout || null,
      lastWorkoutDetail: summary.training?.lastWorkoutDetail || null,
      weeklyLoad: summary.training?.weeklyLoad || {},
    },
    recommendations: readRecommendations(recommendationsArg, summary),
    sources: [
      { name: "Garmin Connect", generatedAt: summary.generatedAt || null },
      { name: "Fixed weekly fitness plan", generatedAt: null },
    ],
  };

  const salt = randomBytes(16);
  const iv = randomBytes(16);
  const derived = pbkdf2Sync(secret, salt, ITERATIONS, 64, "sha256");
  const cipher = createCipheriv("aes-256-cbc", derived.subarray(0, 32), iv);
  const plaintext = Buffer.from(JSON.stringify(packet), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const mac = createHmac("sha256", derived.subarray(32, 64)).update(Buffer.concat([iv, ciphertext])).digest();
  const decipher = createDecipheriv("aes-256-cbc", derived.subarray(0, 32), iv);
  const roundTrip = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  if (!roundTrip.equals(plaintext)) throw new Error("Encrypted packet verification failed.");
  const encryptedAt = new Date().toISOString();

  const envelope = {
    app: "My Fitness Command Center",
    kind: "encrypted-private-fitness-daily",
    algorithm: "AES-CBC-256-PBKDF2-HMACSHA256",
    iterations: ITERATIONS,
    generatedAt: encryptedAt,
    packetGeneratedAt: packet.generatedAt,
    salt: base64url(salt),
    iv: base64url(iv),
    ciphertext: base64url(ciphertext),
    mac: base64url(mac),
  };

  writeFileSync(outputPath, `${JSON.stringify(envelope, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ outputPath, packetGeneratedAt: packet.generatedAt, encryptedAt, verified: true }));
}

main();
