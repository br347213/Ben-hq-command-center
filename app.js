const NAV_ITEMS = [
  { id: "today", label: "Today", icon: "home" },
  { id: "plan", label: "Plan", icon: "plan" },
  { id: "progress", label: "Progress", icon: "progress" },
  { id: "insights", label: "Insights", icon: "spark" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10v10h13V10"></path><path d="M9.5 20v-6h5v6"></path>',
  plan: '<rect x="4" y="4" width="16" height="16" rx="3"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>',
  progress: '<path d="M4 18V9M10 18V5M16 18v-7M22 18V3"></path><path d="M2 21h22"></path>',
  spark: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"></path><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path>',
  settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"></path>',
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

function renderTodayWorkout() {
  const now = new Date();
  const workout = workoutForDate(now);
  const status = getOutcome(localDateKey(now));
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
  document.getElementById("yearCounterDetail").textContent = `Every mark stays in ${year}.`;
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

function renderPlan() {
  const todayIndex = new Date().getDay();
  document.getElementById("weekPlan").innerHTML = WEEK.map((workout, index) => {
    const open = index === todayIndex;
    const detail = (label, items) => `<div class="plan-detail-block"><strong>${label}</strong><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
    return `<article class="plan-day ${open ? "is-today open" : ""}" data-plan-day="${index}">
      <button class="plan-day-button" type="button" aria-expanded="${open}">
        <span class="plan-day-name"><strong>${workout.short}</strong><span>${workout.type}</span></span>
        <span class="plan-day-copy"><strong>${escapeHtml(workout.title)}</strong><span>${escapeHtml(workout.subtitle)}</span></span>
        <span class="plan-chevron" aria-hidden="true">›</span>
      </button>
      <div class="plan-day-detail">${detail("Main work", workout.main)}${detail("Minimum", workout.minimum)}${detail("Optional", workout.optional)}</div>
    </article>`;
  }).join("");
}

function renderProgress() {
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
  renderRecentHistory();
}

function renderRecentHistory() {
  const entries = Object.keys(completions)
    .filter((key) => getOutcome(key))
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 8);
  document.getElementById("recentHistory").innerHTML = entries.length
    ? entries.map((key) => {
        const date = parseLocalDateKey(key);
        const workout = workoutForDate(date);
        return `<div class="history-item"><span>${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span><strong>${escapeHtml(OUTCOME_LABELS[getOutcome(key)])}</strong><small>${escapeHtml(workout.title)}</small></div>`;
      }).join("")
    : '<div class="empty-state">Your first completed day will appear here.</div>';
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

function renderGuidance() {
  const recommendation = privatePacket.recommendations?.[0];
  const week = currentWeekStats();
  const status = getOutcome(localDateKey());
  let title = "Keep the decision small";
  let body = "Start the planned session. The minimum version still counts, and nothing needs to be made up later.";
  let source = "Your plan + recent consistency";

  if (recommendation?.title) {
    title = recommendation.title;
    body = recommendation.detail || recommendation.body || body;
    source = "Daily AI read from your Garmin context";
  } else if (status === "completed" || status === "minimum") {
    title = "Today's deposit is made";
    body = "Let the completed work stand on its own. There is no reason to add bonus volume to make it more legitimate.";
  } else if (status === "rest") {
    title = "Rest is part of the rhythm";
    body = "Keep tomorrow on its normal schedule. No shifting, catching up, or punishment workout.";
  } else if (week.active >= 4) {
    title = "Protect the rhythm you already have";
    body = "This week already contains several intentional training days. Choose the version that keeps tomorrow attractive.";
  }

  document.getElementById("guidanceTitle").textContent = title;
  document.getElementById("guidanceBody").textContent = body;
  document.getElementById("guidanceSource").textContent = source;
}

function renderTodayHealthInsight() {
  const health = privatePacket.health || {};
  const training = privatePacket.training || {};
  const weeklyLoad = training.weeklyLoad || {};
  const lastWorkout = training.lastWorkoutDetail || {};
  const aiInsights = privatePacket.aiInsights || {};
  const sleepValue = health.sleepHours ?? health.baselines?.sleep7Day;
  const restingHrValue = health.restingHr ?? health.baselines?.restingHr7Day;
  const hasGarmin = hasHealthData();
  const hasCurrentAnalysis = Boolean(aiInsights.healthHeadline && aiInsights.healthSummary);
  const summary = hasCurrentAnalysis ? aiInsights.healthSummary : (hasGarmin
    ? "Your latest Garmin health signals are displayed below. A new personal interpretation is pending, so the app will not infer recovery from an older snapshot."
    : "Connect Garmin to combine sleep, heart-rate, and exercise context in one daily read.");
  const points = splitInsightSummary(summary).slice(0, 2);
  const lastWorkoutValue = hasValue(lastWorkout.distanceMiles) ? `${lastWorkout.distanceMiles} mi` : (training.lastWorkout || "Not available");
  const lastWorkoutDetail = [lastWorkout.type ? String(lastWorkout.type).replaceAll("_", " ") : "", hasValue(lastWorkout.averageHr) ? `Avg HR ${lastWorkout.averageHr}` : ""].filter(Boolean).join(" • ") || "Latest Garmin activity";
  const signals = [
    { label: "Sleep", value: hasValue(sleepValue) ? `${sleepValue} h` : "Not available", detail: hasValue(health.sleepHours) ? (health.sleepScore ? `Score ${health.sleepScore}` : "Latest Garmin value") : hasValue(health.baselines?.sleep7Day) ? "7-day average" : "No recent reading" },
    { label: "Resting HR", value: hasValue(restingHrValue) ? `${restingHrValue} bpm` : "Not available", detail: hasValue(health.restingHr) ? "Latest Garmin value" : hasValue(health.baselines?.restingHr7Day) ? "7-day average" : "No recent reading" },
    { label: "Stress", value: hasValue(health.stress) ? health.stress : "Not available", detail: "Latest Garmin value" },
    { label: "Body Battery", value: hasValue(health.bodyBattery) ? health.bodyBattery : "Not available", detail: "Latest Garmin value" },
  ];

  document.getElementById("todayHealthFreshness").textContent = hasGarmin ? freshnessLabel(privatePacket.generatedAt) : "Garmin not connected";
  document.getElementById("todayHealthLead").textContent = hasCurrentAnalysis ? aiInsights.healthHeadline : (hasGarmin ? "Current data is ready; analysis is refreshing" : "Connecting the full picture");
  document.getElementById("todayHealthPoints").innerHTML = points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  document.getElementById("todayHealthSource").textContent = hasCurrentAnalysis ? "ChatGPT analysis • Garmin health + training data" : hasGarmin ? "Garmin data • personal analysis pending" : "Waiting for Garmin data";
  document.getElementById("todayHealthSignals").innerHTML = signals.map((signal) => `<div class="health-signal"><span>${escapeHtml(signal.label)}</span><strong>${escapeHtml(signal.value)}</strong><small>${escapeHtml(signal.detail)}</small></div>`).join("");
}

function renderInsights() {
  const health = privatePacket.health || {};
  const training = privatePacket.training || {};
  const weeklyLoad = training.weeklyLoad || {};
  const aiInsights = privatePacket.aiInsights || {};
  const recommendation = privatePacket.recommendations?.[0];
  const week = currentWeekStats();
  const hasGarmin = hasHealthData();
  const hasCurrentAnalysis = Boolean(aiInsights.headline && aiInsights.summary);

  document.getElementById("insightFreshness").textContent = hasGarmin ? freshnessLabel(privatePacket.generatedAt) : "Garmin not connected";
  document.getElementById("insightHeroTitle").textContent = hasCurrentAnalysis ? aiInsights.headline : (hasGarmin ? "Current Garmin data is ready; analysis is refreshing" : "Personal analysis is refreshing");
  const summary = hasCurrentAnalysis ? aiInsights.summary : (hasGarmin
    ? "The metric cards below reflect the latest Garmin snapshot. Narrative insights are temporarily withheld until a matching analysis is available."
    : week.active
      ? `You have recorded ${week.active} intentional training day${week.active === 1 ? "" : "s"} this week. Stay with the fixed schedule and use the minimum version when life is crowded.`
      : recommendation?.detail || recommendation?.body || "Connect Garmin to generate personal analysis.");
  document.getElementById("insightHeroPoints").innerHTML = splitInsightSummary(summary).map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  document.getElementById("insightHeroSource").textContent = hasCurrentAnalysis ? "ChatGPT analysis • Garmin + your goals + fixed plan" : "Personalized analysis pending";

  const sleepValue = health.sleepHours ?? health.baselines?.sleep7Day;
  const restingHrValue = health.restingHr ?? health.baselines?.restingHr7Day;
  const lastWorkout = training.lastWorkoutDetail || {};
  const lastWorkoutValue = hasValue(lastWorkout.distanceMiles) ? `${lastWorkout.distanceMiles} mi` : (training.lastWorkout || "Not available");
  const lastWorkoutDetail = [lastWorkout.type ? String(lastWorkout.type).replaceAll("_", " ") : "", hasValue(lastWorkout.averageHr) ? `Avg HR ${lastWorkout.averageHr}` : ""].filter(Boolean).join(" • ") || "Latest Garmin activity";
  const loadChange = Number(weeklyLoad.distanceChangePct);
  const metrics = [
    { label: "7-day running", value: hasValue(weeklyLoad.distanceMiles) ? `${weeklyLoad.distanceMiles} mi` : "Not available", detail: hasValue(weeklyLoad.activities) ? `${weeklyLoad.activities} activities` : "No recent training load" },
    { label: "Last run", value: lastWorkoutValue, detail: lastWorkoutDetail },
    { label: "Run frequency", value: hasValue(weeklyLoad.activities) ? `${weeklyLoad.activities} sessions` : "Not available", detail: hasValue(weeklyLoad.previousActivities) ? `${weeklyLoad.previousActivities} in prior 7 days` : "No comparison available" },
    { label: "Load direction", value: Number.isFinite(loadChange) ? `${loadChange > 0 ? "+" : ""}${loadChange}%` : "Not available", detail: "Distance vs prior 7 days" },
    { label: "Recovery context", value: hasValue(health.bodyBattery) ? `BB ${health.bodyBattery}` : hasValue(restingHrValue) ? `${restingHrValue} bpm` : "Not available", detail: hasValue(health.stress) ? `Stress ${health.stress}` : hasValue(sleepValue) ? `${sleepValue} h sleep` : "Use feel and pain signals" },
  ];
  document.getElementById("healthMetricGrid").innerHTML = metrics.map((metric) => `<article class="metric-card"><span>${escapeHtml(metric.label)}</span><strong>${escapeHtml(metric.value)}</strong><small>${escapeHtml(metric.detail)}</small></article>`).join("");
  renderTrainingIntelligence(training.analytics);

  const insightCards = buildInsightCards(health, training, week, hasGarmin);
  document.getElementById("insightGrid").innerHTML = insightCards.map((item) => `<article class="glass-card insight-card"><p class="eyebrow">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p><small class="insight-evidence">Based on ${escapeHtml(item.source || "your current data")}</small></article>`).join("");

  const actions = hasCurrentAnalysis ? (privatePacket.recommendations || []).filter((item) => item?.title || item?.detail || item?.body).slice(0, 2) : [];
  document.getElementById("insightActions").innerHTML = actions.length
    ? actions.map((item, index) => `<article class="insight-action"><span class="insight-action-mark">${index + 1}</span><div><h4>${escapeHtml(item.title || "Next step")}</h4><p>${escapeHtml(item.detail || item.body)}</p><small>${escapeHtml(item.source || "Your Garmin data + current plan")}</small></div></article>`).join("")
    : '<div class="empty-state">Next actions will appear with the next personal analysis.</div>';
}

function metricValue(value, suffix = "", fallback = "—") {
  return hasValue(value) ? `${value}${suffix}` : fallback;
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
  const method = document.getElementById("trainingMethod");
  if (!stateGrid || !chart || !detailGrid || !method) return;
  const current = analytics?.current || {};
  const series = Array.isArray(analytics?.series) ? analytics.series.filter((item) => item && hasValue(item.fitness) && hasValue(item.fatigue) && hasValue(item.form)) : [];
  if (!analytics || !series.length) {
    stateGrid.innerHTML = '<div class="empty-state">Training intelligence will appear after the next Garmin history refresh.</div>';
    chart.innerHTML = '<div class="training-chart-empty">Waiting for longitudinal load history</div>';
    detailGrid.innerHTML = "";
    method.textContent = "Fitness, fatigue, and form are estimates derived from recorded workout load—not medical or readiness scores.";
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
  chart.innerHTML = `<svg viewBox="0 0 ${width} ${height + 26}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="fitnessFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5bcbff" stop-opacity=".22"/><stop offset="1" stop-color="#5bcbff" stop-opacity="0"/></linearGradient></defs>
    <line class="chart-zero" x1="0" y1="${zeroY.toFixed(1)}" x2="${width}" y2="${zeroY.toFixed(1)}"></line>
    <path class="chart-line chart-fitness" d="${fitnessPath}"></path>
    <path class="chart-line chart-fatigue" d="${fatiguePath}"></path>
    <path class="chart-line chart-form" d="${formPath}"></path>
    <text x="0" y="${height + 22}">${escapeHtml(firstDate)}</text><text x="${width}" y="${height + 22}" text-anchor="end">${escapeHtml(lastDate)}</text>
  </svg>`;

  const secondary = [
    { label: "Load balance", value: metricValue(current.loadBalance), detail: "Fatigue ÷ fitness" },
    { label: "7-day load", value: metricValue(current.sevenDayLoad), detail: analytics.loadUnit || "Load points" },
    { label: "Monotony", value: metricValue(current.monotony7Day), detail: "7-day repetition" },
    { label: "Strain", value: metricValue(current.strain7Day), detail: "Load × monotony" },
    { label: "28-day consistency", value: metricValue(current.activeDays28, " days"), detail: `${metricValue(current.activities28)} activities` },
    { label: "VO₂ max", value: metricValue(current.vo2Max28), detail: hasValue(current.vo2MaxChangePct) ? `${current.vo2MaxChangePct > 0 ? "+" : ""}${current.vo2MaxChangePct}% vs prior 28d` : "No prior comparison" },
    { label: "Run efficiency", value: metricValue(current.runningEfficiency28), detail: hasValue(current.runningEfficiencyChangePct) ? `${current.runningEfficiencyChangePct > 0 ? "+" : ""}${current.runningEfficiencyChangePct}% vs prior 28d` : "Speed per heartbeat" },
  ];
  detailGrid.innerHTML = secondary.map((item) => `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.detail)}</small></article>`).join("");
  method.textContent = `${analytics.loadMethod} Fitness uses a ${analytics.references?.fitnessTimeConstantDays || 42}-day response and fatigue a ${analytics.references?.fatigueTimeConstantDays || 7}-day response. Only Garmin-recorded workouts contribute load. Values are estimates in arbitrary load points—not health, injury-risk, or readiness scores.`;
}

function buildInsightCards(health, training, week, hasGarmin) {
  const aiCards = Array.isArray(privatePacket.aiInsights?.cards) ? privatePacket.aiInsights.cards : [];
  if (aiCards.length) return aiCards.slice(0, 3);
  return hasGarmin
    ? [{
      label: "AI analysis",
      title: "Your Garmin context is ready",
      body: "The next private refresh will connect these signals to your goals, fixed schedule, and current training constraints.",
      source: "Encrypted analysis pending",
    }]
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
  renderTodayWorkout();
  renderYearCounter();
  renderProgress();
  renderGuidance();
  renderTodayHealthInsight();
  renderInsights();
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
      ? { ...packet.training, activities: Array.isArray(packet.training.activities) ? packet.training.activities.filter(Boolean) : [] }
      : { activities: [] },
    recommendations: Array.isArray(packet.recommendations) ? packet.recommendations.filter(Boolean) : [],
    aiInsights: packet.aiInsights && typeof packet.aiInsights === "object" ? packet.aiInsights : null,
    sources: Array.isArray(packet.sources) ? packet.sources.filter(Boolean) : [],
  };
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

async function refreshGarminData(showResult = false) {
  if (!syncSettings.key) {
    syncSettings.status = "not configured";
    saveSyncSettings();
    renderSyncStatus();
    if (showResult) showToast("Connect the existing sync key once on this phone.");
    return false;
  }
  syncSettings.status = "checking";
  renderSyncStatus();
  try {
    const previousPacket = JSON.stringify(privatePacket);
    const response = await fetch(`data/ben-hq-latest.enc.json?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Fitness packet unavailable");
    const packet = await decryptEnvelope(await response.json());
    privatePacket = normalizePacket(packet);
    savePrivatePacket();
    const importedDays = applyGarminActivityCompletions();
    syncSettings.status = "live";
    syncSettings.lastSyncAt = new Date().toISOString();
    syncSettings.error = "";
    saveSyncSettings();
    renderSyncStatus();
    renderAllTracking();
    if (showResult) {
      const message = importedDays
        ? `${importedDays} Garmin workout day${importedDays === 1 ? "" : "s"} marked complete.`
        : JSON.stringify(privatePacket) === previousPacket
          ? "Checked — Garmin data is already current."
          : "New Garmin data loaded.";
      showToast(message);
    }
    return true;
  } catch {
    syncSettings.status = "error";
    syncSettings.error = "The latest encrypted packet could not be read.";
    saveSyncSettings();
    renderSyncStatus();
    if (showResult) showToast("The last good Garmin snapshot is still available.");
    return false;
  }
}

async function refreshDashboardData() {
  if (!syncSettings.key) {
    openSyncKeyPanel();
    showToast("Connect the existing sync key once on this phone.");
    return;
  }
  await refreshGarminData(true);
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
  const settingsRefresh = document.getElementById("refreshGarmin");
  if (syncSettings.status === "checking") {
    statusText.textContent = "Refreshing your encrypted Garmin snapshot…";
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
    ? "Checking Garmin"
    : syncSettings.status === "error"
      ? "Using saved data"
      : hasData
        ? freshnessLabel(privatePacket.generatedAt)
        : syncSettings.key
          ? "Ready to check"
          : "Connect Garmin";
  dashboardButton.setAttribute("aria-label", isChecking ? "Refreshing Garmin data" : `Refresh Garmin data. ${dashboardStatus.textContent}`);
  settingsRefresh.disabled = isChecking;
  settingsRefresh.textContent = isChecking ? "Refreshing…" : "Refresh";
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
  const payload = { app: "My Fitness Command Center", version: 1, exportedAt: new Date().toISOString(), completions };
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
  document.getElementById("refreshGarmin").addEventListener("click", () => refreshGarminData(true));
  document.getElementById("dashboardRefresh").addEventListener("click", refreshDashboardData);
  document.getElementById("exportData").addEventListener("click", exportBackup);
  document.getElementById("importData").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importBackup(file);
    event.target.value = "";
  });
}

async function init() {
  importSyncKeyFromHash();
  await restoreLegacySyncKey();
  renderNavigation();
  renderDateHeader();
  renderPlan();
  renderAllTracking();
  renderSyncStatus();
  wireEvents();
  refreshGarminData(false);
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init();
