const NAV_ITEMS = [
  { id: "today", label: "Today", icon: "home" },
  { id: "plan", label: "Plan", icon: "plan" },
  { id: "progress", label: "Progress", icon: "progress" },
  { id: "insights", label: "Insights", icon: "spark" },
  { id: "settings", label: "Settings", icon: "settings" },
];

const GARMIN_REFRESH_ENDPOINT = "https://ben-hq-garmin-refresh.br347213.workers.dev/refresh";
const GARMIN_REFRESH_POLL_MS = 2500;
const GARMIN_REFRESH_MAX_POLLS = 48;
const APP_VERSION = "1.1.0";

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10v10h13V10"></path><path d="M9.5 20v-6h5v6"></path>',
  plan: '<rect x="4" y="4" width="16" height="16" rx="3"></rect><path d="M8 9h8M8 13h8M8 17h5"></path>',
  progress: '<path d="M4 18V9M10 18V5M16 18v-7M22 18V3"></path><path d="M2 21h22"></path>',
  spark: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"></path><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path>',
  battery: '<rect x="3" y="6" width="16" height="12" rx="2"></rect><path d="M21 10v4"></path><path d="M6.5 9.5h7"></path>',
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
  renderLastGarminActivity();
  renderWorkoutAnalysis();
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
  ].filter((item) => item && item.value);

  container.innerHTML = `<div class="latest-activity-hero">
    <div class="latest-activity-title"><span>${escapeHtml(formatActivityDate(activity))}</span><h4>${escapeHtml(name)}</h4><small>${escapeHtml(activityTypeLabel(activity.type))}</small></div>
    <div class="latest-activity-primary"><strong>${escapeHtml(primaryValue)}</strong><span>${escapeHtml(primaryLabel)}</span></div>
  </div>
  ${stats.length ? `<div class="activity-stat-grid">${stats.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>`).join("")}</div>` : '<p class="activity-detail-note">More workout metrics will appear after the next Garmin history refresh.</p>'}
  <p class="activity-detail-note">Synced from Garmin · Refresh from the header for the latest workout.</p>`;
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
  const observedMaxHrRaw = training.analytics?.references?.observedMaxHr;
  const averageHr = hasValue(averageHrRaw) ? Number(averageHrRaw) : NaN;
  const restingHr = hasValue(restingHrRaw) ? Number(restingHrRaw) : NaN;
  const observedMaxHr = hasValue(observedMaxHrRaw) ? Number(observedMaxHrRaw) : NaN;
  const reserveFraction = Number.isFinite(averageHr) && averageHr > restingHr && Number.isFinite(restingHr) && restingHr > 0 && Number.isFinite(observedMaxHr) && observedMaxHr > restingHr
    ? (averageHr - restingHr) / (observedMaxHr - restingHr)
    : NaN;
  if (Number.isFinite(reserveFraction)) {
    if (reserveFraction >= .8) return { level: "hard", label: "High cardiovascular demand", evidence: `${Math.round(reserveFraction * 100)}% of observed heart-rate reserve` };
    if (reserveFraction >= .7) return { level: "building", label: "Moderate-to-hard cardiovascular work", evidence: `${Math.round(reserveFraction * 100)}% of observed heart-rate reserve` };
    if (reserveFraction >= .58) return { level: "maintaining", label: "Steady aerobic work", evidence: `${Math.round(reserveFraction * 100)}% of observed heart-rate reserve` };
    return { level: "light", label: "Low cardiovascular load", evidence: `${Math.round(reserveFraction * 100)}% of observed heart-rate reserve` };
  }
  return { level: "unknown", label: "Completed training exposure", evidence: "Workout duration and completion" };
}

function buildWorkoutAnalysis(activity, training, health) {
  const type = String(activity.type || "").toLowerCase();
  const name = firstText(activity.name, training.lastWorkout, activityTypeLabel(type));
  const isRun = type.includes("run") || /run/i.test(name);
  const isRide = type.includes("cycl") || type.includes("bike") || /ride|cycling|bike/i.test(name);
  const isStrength = type.includes("strength") || /strength|lift|weight/i.test(name);
  const distance = Number(activity.distanceMiles);
  const durationMinutes = Number(activity.durationMinutes);
  const averageHrRaw = activity.averageHr ?? activity.averageHR;
  const maxHrRaw = activity.maxHr ?? activity.maxHR ?? activity.maximumHr ?? activity.maximumHR;
  const averageHr = hasValue(averageHrRaw) ? Number(averageHrRaw) : NaN;
  const maxHr = hasValue(maxHrRaw) ? Number(maxHrRaw) : NaN;
  const aerobicEffect = hasValue(activity.aerobicEffect) ? Number(activity.aerobicEffect) : NaN;
  const anaerobicEffect = hasValue(activity.anaerobicEffect) ? Number(activity.anaerobicEffect) : NaN;
  const pace = hasValue(activity.averagePaceMinutesPerMile) ? Number(activity.averagePaceMinutesPerMile) : NaN;
  const effort = workoutEffortRead(activity, training, health);
  const weeklyLoad = training.weeklyLoad || {};
  const current = training.analytics?.current || {};
  const loadChange = hasValue(weeklyLoad.distanceChangePct) ? Number(weeklyLoad.distanceChangePct) : NaN;
  const form = hasValue(current.form) ? Number(current.form) : NaN;
  const loadBalance = hasValue(current.loadBalance) ? Number(current.loadBalance) : NaN;

  let title;
  if (isRun && ["very-hard", "hard"].includes(effort.level)) title = "This run delivered a hard stimulus; the gain now comes from absorbing it";
  else if (isRun && effort.level === "building") title = "This was a productive aerobic session, not just another checked box";
  else if (isRun && ["maintaining", "light"].includes(effort.level)) title = "This run's main value was aerobic consistency without a large recovery bill";
  else if (isRide) title = ["very-hard", "hard"].includes(effort.level) ? "The ride created meaningful cardiovascular load" : "The ride preserved the aerobic rhythm with lower impact";
  else if (isStrength) title = "This session adds to the strength base; repeatability matters more than squeezing out extra work";
  else title = "This session moved the year forward and now has useful training context";

  const facts = [];
  if (isRun && Number.isFinite(distance) && distance > 0) facts.push(`${distance.toFixed(2)} miles`);
  else if (Number.isFinite(durationMinutes) && durationMinutes > 0) facts.push(formatActivityDuration(durationMinutes));
  if (isRun && Number.isFinite(pace) && pace > 0) facts.push(`${formatActivityPace(pace)} average pace`);
  if (Number.isFinite(averageHr) && averageHr > 0) facts.push(`${Math.round(averageHr)} bpm average HR`);
  if (Number.isFinite(maxHr) && maxHr > 0) facts.push(`${Math.round(maxHr)} bpm max`);
  const evidence = facts.length ? `${facts.join(", ")}.` : "Garmin recorded the completed session.";

  let interpretation = `${effort.label}, based on ${effort.evidence.toLowerCase()}.`;
  if (Number.isFinite(anaerobicEffect) && anaerobicEffect >= 2.5) interpretation += ` The ${anaerobicEffect.toFixed(1)} anaerobic effect shows a meaningful faster-effort component as well.`;
  else if (Number.isFinite(aerobicEffect) && aerobicEffect >= 3.5) interpretation += " Treat it as a key workout rather than adding more intensity around it.";

  let next = "Follow the fixed plan; no compensatory work is needed.";
  if (["very-hard", "hard"].includes(effort.level) || (Number.isFinite(loadBalance) && loadBalance > 1.3) || (Number.isFinite(form) && form < -8)) {
    next = "Protect the next easy or rest day and let this session settle before adding intensity.";
  } else if (isRun && Number.isFinite(loadChange) && loadChange <= -30) {
    next = "Keep the next run easy and on schedule; rebuild frequency before adding intensity or catch-up miles.";
  } else if (isRun && Number.isFinite(loadChange) && loadChange >= 30) {
    next = "Hold the next run genuinely easy so the recent mileage increase can settle.";
  } else if (isStrength) {
    next = "Return to the fixed schedule, and keep any painful pulling out of the next lift.";
  }

  let impact = effort.label;
  if (isRun && Number.isFinite(loadChange)) impact += loadChange <= -30 ? " · rebuilding run frequency" : loadChange >= 30 ? " · rising weekly mileage" : " · steady weekly rhythm";
  else if (Number.isFinite(form)) impact += ` · current form ${form > 0 ? "+" : ""}${form}`;

  return {
    title,
    body: `${evidence} ${interpretation}`,
    effect: impact,
    next,
    source: "Latest Garmin activity + 7-day load + fitness–fatigue context",
  };
}

function renderWorkoutAnalysis() {
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
    document.getElementById("workoutAnalysisSource").textContent = "Latest Garmin activity + recent training context";
    return;
  }
  const analysis = buildWorkoutAnalysis(activity, training, privatePacket.health || {});
  title.textContent = analysis.title;
  document.getElementById("workoutAnalysisBody").textContent = analysis.body;
  document.getElementById("workoutAnalysisEffect").textContent = analysis.effect;
  document.getElementById("workoutAnalysisNext").textContent = analysis.next;
  document.getElementById("workoutAnalysisStatus").textContent = "Current";
  document.getElementById("workoutAnalysisSource").textContent = analysis.source;
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
    source = "Garmin context + fixed plan";
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
  const aiInsights = privatePacket.aiInsights || {};
  const sleepValue = health.sleepHours ?? health.baselines?.sleep7Day;
  const restingHrValue = health.restingHr ?? health.baselines?.restingHr7Day;
  const hasGarmin = hasHealthData();
  const hasCurrentAnalysis = Boolean(aiInsights.healthHeadline && aiInsights.healthSummary);
  const summary = hasCurrentAnalysis ? aiInsights.healthSummary : (hasGarmin
    ? "Your latest Garmin health signals are displayed below. A new personal interpretation is pending, so the app will not infer recovery from an older snapshot."
    : "Connect Garmin to combine sleep, heart-rate, and exercise context in one daily read.");
  const points = splitInsightSummary(summary).slice(0, 2);
  const signals = [
    { label: "Sleep", value: hasValue(sleepValue) ? `${sleepValue} h` : "Not available", detail: hasValue(health.sleepHours) ? (health.sleepScore ? `Score ${health.sleepScore}` : "Latest Garmin value") : hasValue(health.baselines?.sleep7Day) ? "7-day average" : "No recent reading" },
    { label: "Resting HR", value: hasValue(restingHrValue) ? `${restingHrValue} bpm` : "Not available", detail: hasValue(health.restingHr) ? "Latest Garmin value" : hasValue(health.baselines?.restingHr7Day) ? "7-day average" : "No recent reading" },
    { label: "Stress", value: hasValue(health.stress) ? health.stress : "Not available", detail: "Latest Garmin value" },
    { label: "Body Battery", value: hasValue(health.bodyBattery) ? health.bodyBattery : "Not available", detail: "Latest Garmin value" },
  ];

  document.getElementById("todayHealthFreshness").textContent = hasGarmin ? freshnessLabel(privatePacket.generatedAt) : "Garmin not connected";
  document.getElementById("todayHealthLead").textContent = hasCurrentAnalysis ? aiInsights.healthHeadline : (hasGarmin ? "Current data is ready; analysis is refreshing" : "Connecting the full picture");
  document.getElementById("todayHealthPoints").innerHTML = points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
  document.getElementById("todayHealthSource").textContent = hasCurrentAnalysis ? "Analysis • Garmin health + training data" : hasGarmin ? "Garmin data • personal analysis pending" : "Waiting for Garmin data";
  document.getElementById("todayHealthSignals").innerHTML = signals.map((signal) => `<div class="health-signal"><span>${escapeHtml(signal.label)}</span><strong>${escapeHtml(signal.value)}</strong><small>${escapeHtml(signal.detail)}</small></div>`).join("");
}

function renderInsights() {
  const health = privatePacket.health || {};
  const training = privatePacket.training || {};
  const weeklyLoad = training.weeklyLoad || {};
  const aiInsights = privatePacket.aiInsights || {};
  const week = currentWeekStats();
  const hasGarmin = hasHealthData();
  const hasCurrentAnalysis = Boolean(aiInsights.headline && aiInsights.summary);

  document.getElementById("insightFreshness").textContent = hasGarmin ? freshnessLabel(privatePacket.generatedAt) : "Garmin not connected";

  const focus = hasCurrentAnalysis && aiInsights.focus && typeof aiInsights.focus === "object" ? aiInsights.focus : {};
  document.getElementById("coachingFocusTitle").textContent = focus.title || "Your priority is refreshing";
  document.getElementById("coachingFocusRationale").textContent = focus.rationale || "The next analysis will identify the single constraint that matters most for your progress.";
  document.getElementById("coachingFocusAction").textContent = focus.action || "Keep following the fixed plan";
  document.getElementById("coachingFocusSuccess").textContent = focus.successMarker || "More repeatable training with no catch-up work";
  document.getElementById("coachingFocusHorizon").textContent = focus.horizon || "Short term";
  document.getElementById("coachingFocusEvidence").textContent = "Based on Garmin history, goals, and your fixed plan";

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

  const insightCards = buildInsightCards(health, training, week, hasGarmin);
  document.getElementById("insightGrid").innerHTML = insightCards.map((item) => `<article class="glass-card insight-card"><p class="eyebrow">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p><small class="insight-evidence">Based on ${escapeHtml(item.source || "your current data")}</small></article>`).join("");

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
  chart.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="fitnessFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5bcbff" stop-opacity=".22"/><stop offset="1" stop-color="#5bcbff" stop-opacity="0"/></linearGradient></defs>
    <line class="chart-zero" x1="0" y1="${zeroY.toFixed(1)}" x2="${width}" y2="${zeroY.toFixed(1)}"></line>
    <path class="chart-line chart-fitness" d="${fitnessPath}"></path>
    <path class="chart-line chart-fatigue" d="${fatiguePath}"></path>
    <path class="chart-line chart-form" d="${formPath}"></path>
  </svg><div class="training-chart-dates"><span>${escapeHtml(firstDate)}</span><span>${escapeHtml(lastDate)}</span></div>`;

  const secondary = [
    { label: "Load balance", value: metricValue(current.loadBalance), detail: "Fatigue ÷ fitness" },
    { label: "7-day load", value: metricValue(current.sevenDayLoad), detail: analytics.loadUnit || "Load points" },
    { label: "Monotony", value: metricValue(current.monotony7Day), detail: "7-day repetition" },
    { label: "Strain", value: metricValue(current.strain7Day), detail: "Load × monotony" },
    { label: "28-day consistency", value: metricValue(current.activeDays28, " days"), detail: `${metricValue(current.activities28)} activities` },
    { label: "VO₂ max", value: metricValue(current.vo2Max28), detail: hasValue(current.vo2MaxChangePct) ? `${current.vo2MaxChangePct > 0 ? "+" : ""}${current.vo2MaxChangePct}% vs prior 28d` : "No prior comparison" },
    { label: "Run efficiency", value: hasValue(current.runningEfficiency28) ? Number(current.runningEfficiency28).toFixed(2) : "—", detail: hasValue(current.runningEfficiencyChangePct) ? `${current.runningEfficiencyChangePct > 0 ? "+" : ""}${current.runningEfficiencyChangePct}% vs prior 28d` : "Speed per heartbeat" },
  ];
  detailGrid.innerHTML = secondary.map((item) => `<article><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.detail)}</small></article>`).join("");
  method.textContent = `${analytics.loadMethod} Fitness uses a ${analytics.references?.fitnessTimeConstantDays || 42}-day response and fatigue a ${analytics.references?.fatigueTimeConstantDays || 7}-day response. Only Garmin-recorded workouts contribute load. Values are estimates in arbitrary load points—not health, injury-risk, or readiness scores.`;
}

function buildInsightCards(health, training, week, hasGarmin) {
  const aiCards = Array.isArray(privatePacket.aiInsights?.cards) ? privatePacket.aiInsights.cards : [];
  if (aiCards.length) return aiCards.slice(0, 3);
  return hasGarmin
    ? [{
      label: "Analysis",
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

async function fetchLatestPrivatePacket() {
  const response = await fetch(`data/ben-hq-latest.enc.json?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Fitness packet unavailable");
  return normalizePacket(await decryptEnvelope(await response.json()));
}

function installPrivatePacket(packet, showResult = false) {
  const previousPacket = JSON.stringify(privatePacket);
  privatePacket = packet;
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

async function signRefreshRequest(timestamp, nonce) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(syncSettings.key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${nonce}`));
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
