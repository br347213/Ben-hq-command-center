from pathlib import Path


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 match, found {count}")
    return text.replace(old, new, 1)


# index.html
p = Path("index.html")
s = p.read_text()
s = s.replace("3.2.7", "3.2.8")
old_actions = '<div class="settings-actions"><button class="secondary-button" id="enterSyncKey" type="button">Connect sync key</button></div>'
new_actions = '<div class="settings-actions"><button class="secondary-button" id="enterSyncKey" type="button">Connect sync key</button><button class="secondary-button" id="enterAnalysisKey" type="button">Connect analysis key</button></div>'
if 'id="enterAnalysisKey"' not in s:
    s = replace_once(s, old_actions, new_actions, "settings analysis key button")
if 'id="analysisKeyPanel"' not in s:
    panel = '''
    <div class="secure-entry-backdrop" id="analysisKeyPanel" hidden>
      <section class="secure-entry-card" role="dialog" aria-modal="true" aria-labelledby="analysisKeyTitle">
        <button class="secure-entry-close" id="closeAnalysisKeyPanel" type="button" aria-label="Close analysis key entry">×</button>
        <p class="eyebrow">Live coaching setup</p>
        <h2 id="analysisKeyTitle">Connect analysis key</h2>
        <p>This key is only for live AI coaching. Generate a new one here, copy it into Cloudflare as <strong>ANALYSIS_SHARED_SECRET</strong>, then save the same key here.</p>
        <form id="analysisKeyForm">
          <label for="analysisKeyInput">Private analysis key</label>
          <input id="analysisKeyInput" name="analysisKey" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" minlength="32" required />
          <div class="secure-entry-actions">
            <button class="secondary-button" id="generateAnalysisKey" type="button">Generate new key</button>
            <button class="primary-button" type="submit">Save analysis key</button>
            <button class="text-button" id="cancelAnalysisKeyPanel" type="button">Cancel</button>
          </div>
          <p class="secure-entry-note">After generating, tap the field, Select All, and Copy before saving. Do not share this key anywhere else.</p>
        </form>
      </section>
    </div>
'''
    marker = '<script src="app.js?v=3.2.8"></script>'
    if marker not in s:
        marker = '<script src="app.js"></script>'
    if marker not in s:
        raise SystemExit("app script marker not found")
    s = s.replace(marker, panel + "    " + marker, 1)
p.write_text(s)

# app.js
p = Path("app.js")
s = p.read_text()
s = replace_once(s, 'const APP_VERSION = "3.2.7";', 'const APP_VERSION = "3.2.8";', "app version")
if 'analysisKey: "fitness-hq-analysis-key-v1"' not in s:
    s = replace_once(s, '  sync: "fitness-hq-sync-v1",', '  sync: "fitness-hq-sync-v1",\n  analysisKey: "fitness-hq-analysis-key-v1",', "analysis storage")
if 'let analysisKey = localStorage.getItem(STORAGE.analysisKey)' not in s:
    s = replace_once(s, 'let syncSettings = loadSyncSettings();', 'let syncSettings = loadSyncSettings();\nlet analysisKey = localStorage.getItem(STORAGE.analysisKey) || "";', "analysis key state")
old_sign = '''async function signRefreshRequest(timestamp, nonce, signedPayload = "") {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(syncSettings.key),'''
new_sign = '''async function signRefreshRequest(timestamp, nonce, signedPayload = "", secret = syncSettings.key) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),'''
if new_sign not in s:
    s = replace_once(s, old_sign, new_sign, "signing helper")
old_guard = '''  if (!syncSettings.key || !hasHealthData()) {
    liveAnalysisState = { status: "unavailable", reason, error: "Garmin data or the private sync key is unavailable." };'''
new_guard = '''  if (!analysisKey || !hasHealthData()) {
    liveAnalysisState = { status: "unavailable", reason, error: "Garmin data or the private analysis key is unavailable." };'''
if new_guard not in s:
    s = replace_once(s, old_guard, new_guard, "analysis key guard")
old_analysis_sign = '      const signature = await signRefreshRequest(timestamp, nonce, contextJson);'
new_analysis_sign = '      const signature = await signRefreshRequest(timestamp, nonce, contextJson, analysisKey);'
if new_analysis_sign not in s:
    s = replace_once(s, old_analysis_sign, new_analysis_sign, "analysis signature")
if "function openAnalysisKeyPanel()" not in s:
    functions = '''function openAnalysisKeyPanel() {
  const panel = document.getElementById("analysisKeyPanel");
  const input = document.getElementById("analysisKeyInput");
  input.value = analysisKey;
  panel.hidden = false;
  window.requestAnimationFrame(() => { input.focus(); input.select(); });
}

function closeAnalysisKeyPanel() {
  document.getElementById("analysisKeyPanel").hidden = true;
}

function generateAnalysisKey() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  const value = btoa(binary).replace(/\\+/g, "-").replace(/\\//g, "_").replace(/=+$/g, "");
  const input = document.getElementById("analysisKeyInput");
  input.value = value;
  input.focus();
  input.select();
  showToast("New analysis key generated. Copy it to Cloudflare, then save it here.");
}

async function connectAnalysisKey(event) {
  event.preventDefault();
  const value = document.getElementById("analysisKeyInput").value.trim();
  if (value.length < 32) {
    showToast("Use an analysis key at least 32 characters long.");
    return;
  }
  analysisKey = value;
  localStorage.setItem(STORAGE.analysisKey, analysisKey);
  closeAnalysisKeyPanel();
  const button = document.getElementById("enterAnalysisKey");
  if (button) button.textContent = "Replace analysis key";
  showToast("Analysis key saved. Testing live coaching now.");
  if (hasHealthData()) await requestLiveAnalysis("analysis key connected");
}

'''
    s = replace_once(s, "function openSyncKeyPanel() {", functions + "function openSyncKeyPanel() {", "analysis key functions")
status_line = '  connectButton.textContent = syncSettings.key ? "Replace sync key" : "Connect sync key";'
status_new = status_line + '\n  const analysisButton = document.getElementById("enterAnalysisKey");\n  if (analysisButton) analysisButton.textContent = analysisKey ? "Replace analysis key" : "Connect analysis key";'
if "analysisButton.textContent = analysisKey" not in s:
    s = replace_once(s, status_line, status_new, "analysis key button state")
event_line = '  document.getElementById("enterSyncKey").addEventListener("click", openSyncKeyPanel);'
event_new = event_line + '''
  document.getElementById("enterAnalysisKey")?.addEventListener("click", openAnalysisKeyPanel);
  document.getElementById("analysisKeyForm")?.addEventListener("submit", connectAnalysisKey);
  document.getElementById("generateAnalysisKey")?.addEventListener("click", generateAnalysisKey);
  document.getElementById("closeAnalysisKeyPanel")?.addEventListener("click", closeAnalysisKeyPanel);
  document.getElementById("cancelAnalysisKeyPanel")?.addEventListener("click", closeAnalysisKeyPanel);
  document.getElementById("analysisKeyPanel")?.addEventListener("click", (event) => {
    if (event.target.id === "analysisKeyPanel") closeAnalysisKeyPanel();
  });'''
if 'analysisKeyForm")?.addEventListener' not in s:
    s = replace_once(s, event_line, event_new, "analysis key events")
p.write_text(s)

# Worker authentication split.
p = Path("refresh-worker/src/index.js")
s = p.read_text()
old_auth = '''async function authenticate(body, env, signedPayload = "") {
  if (!validEnvelope(body)) return false;
  const actual = decodeHex(body.signature);
  const expected = await expectedSignature(env.REFRESH_SHARED_SECRET, `${body.timestamp}.${body.nonce}${signedPayload ? `.${signedPayload}` : ""}`);
  return equalBytes(actual, expected);
}'''
new_auth = '''async function authenticate(body, secret, signedPayload = "") {
  if (!validEnvelope(body) || !secret) return false;
  try {
    const actual = decodeHex(body.signature);
    const expected = await expectedSignature(secret, `${body.timestamp}.${body.nonce}${signedPayload ? `.${signedPayload}` : ""}`);
    return equalBytes(actual, expected);
  } catch (error) {
    console.error("Worker authentication failed", error);
    return false;
  }
}'''
if new_auth not in s:
    s = replace_once(s, old_auth, new_auth, "worker auth helper")
if "authenticate(body, env.ANALYSIS_SHARED_SECRET, contextJson)" not in s:
    s = replace_once(s, "authenticate(body, env, contextJson)", "authenticate(body, env.ANALYSIS_SHARED_SECRET, contextJson)", "analysis worker secret")
if "authenticate(body, env.REFRESH_SHARED_SECRET)" not in s:
    s = replace_once(s, "authenticate(body, env)", "authenticate(body, env.REFRESH_SHARED_SECRET)", "refresh worker secret")
p.write_text(s)

# Worker docs.
p = Path("refresh-worker/README.md")
s = p.read_text()
if '- `ANALYSIS_SHARED_SECRET`' not in s:
    s = replace_once(s, '- `REFRESH_SHARED_SECRET`', '- `REFRESH_SHARED_SECRET`\n- `ANALYSIS_SHARED_SECRET`', "worker README secret")
p.write_text(s)

# PWA cache/version.
p = Path("sw.js")
s = p.read_text().replace("fitness-hq-v63", "fitness-hq-v64").replace("3.2.7", "3.2.8")
p.write_text(s)
