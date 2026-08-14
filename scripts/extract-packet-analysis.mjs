import { readFileSync, writeFileSync } from "node:fs";
import { createDecipheriv, createHmac, pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { resolve } from "node:path";

const ITERATIONS = 120_000;

function fromBase64Url(value) {
  return Buffer.from(String(value || ""), "base64url");
}

function decryptPacket(envelope, secret) {
  if (envelope.algorithm !== "AES-CBC-256-PBKDF2-HMACSHA256") {
    throw new Error("Unsupported encrypted packet format.");
  }
  const salt = fromBase64Url(envelope.salt);
  const iv = fromBase64Url(envelope.iv);
  const ciphertext = fromBase64Url(envelope.ciphertext);
  const suppliedMac = fromBase64Url(envelope.mac);
  const derived = pbkdf2Sync(secret, salt, ITERATIONS, 64, "sha256");
  const expectedMac = createHmac("sha256", derived.subarray(32, 64))
    .update(Buffer.concat([iv, ciphertext]))
    .digest();
  if (suppliedMac.length !== expectedMac.length || !timingSafeEqual(suppliedMac, expectedMac)) {
    throw new Error("Encrypted packet key did not match.");
  }
  const decipher = createDecipheriv("aes-256-cbc", derived.subarray(0, 32), iv);
  return JSON.parse(Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8"));
}

function main() {
  const [, , packetArg, keyArg, outputArg] = process.argv;
  if (!packetArg || !keyArg || !outputArg) {
    throw new Error("Usage: node scripts/extract-packet-analysis.mjs <packet.json> <sync-key.txt> <output.json>");
  }
  const envelope = JSON.parse(readFileSync(resolve(packetArg), "utf8"));
  const secret = readFileSync(resolve(keyArg), "utf8").trim();
  const packet = decryptPacket(envelope, secret);
  const insight = packet.aiInsights && typeof packet.aiInsights === "object" ? packet.aiInsights : {};
  const output = {
    generatedAt: insight.generatedAt || packet.generatedAt || null,
    model: insight.model || "ChatGPT personal analysis",
    headline: insight.headline || "",
    summary: insight.summary || "",
    healthHeadline: insight.healthHeadline || "",
    healthSummary: insight.healthSummary || "",
    focus: insight.focus || null,
    cards: Array.isArray(insight.cards) ? insight.cards : [],
    recommendations: Array.isArray(packet.recommendations) ? packet.recommendations : [],
  };
  writeFileSync(resolve(outputArg), `${JSON.stringify(output, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ extracted: Boolean(output.headline), generatedAt: output.generatedAt }));
}

main();
