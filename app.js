const navItems = [
  { id: "today", label: "Today", icon: "T" },
  { id: "tasks", label: "Tasks", icon: "K" },
  { id: "calendar", label: "Calendar", icon: "C" },
  { id: "training", label: "Training", icon: "R" },
  { id: "pokemon", label: "Pokemon GO", icon: "P" },
  { id: "chess", label: "Chess", icon: "Ch" },
  { id: "learn", label: "Learn", icon: "L" },
  { id: "prompts", label: "Prompts", icon: "A" },
  { id: "library", label: "Library", icon: "N" },
  { id: "review", label: "Review", icon: "W" },
  { id: "sources", label: "Sources", icon: "Src" },
  { id: "settings", label: "Settings", icon: "S" },
];

const seed = {
  priorities: [
    {
      title: "Play the Sobble window deliberately",
      meta: "2-5 PM local: clear storage, run a Water Mega, and evolve for Hydro Cannon if you get a good candidate.",
    },
    {
      title: "Keep training compatible with Community Day",
      meta: "Do the easy run or mobility reset before the event so the afternoon stays open.",
    },
    {
      title: "Make the anniversary event low-friction",
      meta: "Use the July 4-6 10th Anniversary Party as a light family play window, not an all-day grind.",
    },
  ],
  todayAgenda: [
    {
      time: "Morning",
      title: "Prep the day",
      detail: "Easy run or mobility, charge phone, clear Pokemon storage, check Poke Balls.",
      tone: "training",
    },
    {
      time: "2-5 PM",
      title: "Sobble Community Day",
      detail: "Catch Sobble, prioritize shiny/high-IV checks, use Water Mega candy bonus, evolve for Hydro Cannon.",
      tone: "pokemon",
    },
    {
      time: "Jul 4-6",
      title: "10th Anniversary Party",
      detail: "Check event research and bonuses once, then keep the play plan family-friendly.",
      tone: "ai",
    },
  ],
  todayInsights: [
    {
      label: "Main window",
      value: "2-5 PM",
      detail: "Sobble Community Day",
    },
    {
      label: "Event overlap",
      value: "Jul 4-6",
      detail: "10th Anniversary Party",
    },
    {
      label: "Best prep",
      value: "80+ slots",
      detail: "Clear storage before leaving",
    },
  ],
  inbox: [
    { title: "Choose Saturday tempo route", type: "task", meta: "Training - today" },
    { title: "Check cat feeder and water backup", type: "reminder", meta: "Home - this week" },
    { title: "Save idea for Pokemon birthday activity", type: "idea", meta: "Family - later" },
  ],
  todayTasks: [
    { title: "10-minute garage reset", type: "task", meta: "Home - low effort" },
    { title: "Prep running shoes and headphones", type: "task", meta: "Training - tonight" },
    { title: "Write one note from today", type: "note", meta: "Library - optional" },
  ],
  calendar: [
    { day: "Mon", events: ["Upper strength", "Inbox review"] },
    { day: "Tue", events: ["Easy run - 3-4 mi"] },
    { day: "Wed", events: ["Full-body strength", "Family errand"] },
    { day: "Thu", events: ["Easy run - 3 mi", "Library cleanup"] },
    { day: "Fri", events: ["Mobility or easy run"] },
    { day: "Sat", events: ["Quality run - tempo", "Pokemon event check"] },
    { day: "Sun", events: ["Long run - 6 mi", "Weekly review"] },
  ],
  workouts: [
    {
      title: "Upper strength / physique",
      meta: "45 min - push, pull, shoulders, arms",
      reason: "Keeps strength progress moving without loading legs before weekend running.",
    },
    {
      title: "Full-body support",
      meta: "50 min - posterior chain, unilateral legs, trunk",
      reason: "Builds running durability while keeping soreness controlled.",
    },
    {
      title: "Saturday tempo",
      meta: "Warmup, 18-24 min steady, cooldown",
      reason: "One quality day per week keeps fitness sharp without crowding recovery.",
    },
    {
      title: "Sunday long run",
      meta: "6 miles easy",
      reason: "Preserves the aerobic base and keeps the weekly rhythm simple.",
    },
  ],
  pokemon: [
    {
      title: "Sobble Community Day",
      summary: "Today, 2-5 PM local time. Focus on shiny/high-IV Sobble, Water Mega candy bonus, and Hydro Cannon Inteleon.",
      source: "Public event schedule - manual",
      actions: ["Clear 80+ storage", "Mega Evolve a Water type", "Evolve best Drizzile to Inteleon"],
    },
    {
      title: "10th Anniversary Party",
      summary: "Runs July 4-6 and overlaps Community Day. Treat it as a light bonus layer: check research, claim easy rewards, avoid over-grinding.",
      source: "Public event schedule - manual",
      actions: ["Check event research", "Watch for bonus spawns", "Use one family play loop"],
    },
    {
      title: "Pokemon GO public data",
      summary: "Live reference counts from PoGoAPI are useful background, but event priorities should be explicit on Today.",
      source: "PoGoAPI - loading",
      actions: ["Refresh public counts", "Keep event plan source-labeled", "Update manual event cards"],
    },
    {
      title: "Raid resource discipline",
      summary: "Use remote passes only when the target clearly improves raid teams or family fun.",
      source: "Personal rule",
      actions: ["Check counters", "Avoid impulse remote raids", "Save premium resources"],
    },
    {
      title: "Great League triage",
      summary: "Keep species-aware candidates, not every low-attack appraisal.",
      source: "Manual planning",
      actions: ["Review favorites", "Tag maybe candidates", "Transfer obvious duplicates"],
    },
  ],
  learning: [
    {
      title: "Running strength progression",
      type: "Article",
      reason: "Relevant to your current two-lift weekly structure.",
      length: "8 min",
    },
    {
      title: "Personal AI workflow ideas",
      type: "Prompt",
      reason: "Could become a reusable weekly review assistant.",
      length: "5 min",
    },
    {
      title: "Family activity bank",
      type: "Note",
      reason: "Useful before the weekend, and short enough to process quickly.",
      length: "3 min",
    },
  ],
  prompts: [
    {
      title: "Weekly personal reset",
      category: "Planning",
      body: "Review the last week, identify loose loops, choose one focus, and suggest a realistic next action list.",
      tags: ["review", "tasks", "family"],
    },
    {
      title: "Training adjustment helper",
      category: "Running / fitness",
      body: "Given soreness, fatigue, and schedule constraints, suggest safer workout substitutions without increasing load.",
      tags: ["running", "strength"],
    },
    {
      title: "Pokemon event decision",
      category: "Pokemon GO",
      body: "Summarize why this event matters, what to prioritize, what to ignore, and a family-friendly play plan.",
      tags: ["pokemon", "events"],
    },
    {
      title: "Purchase decision brief",
      category: "Personal finance",
      body: "Compare options using total cost, value, risk, timing, and whether the purchase actually solves the problem.",
      tags: ["money", "decisions"],
    },
  ],
  library: [
    {
      title: "Running principles",
      body: "Mostly easy running, one quality day, long run on Sunday, strength that supports rather than competes.",
    },
    {
      title: "Family activity ideas",
      body: "Outdoor space, simple logistics, Pokemon-themed games, kid-friendly food, backup rain plan.",
    },
  ],
  review: [
    {
      title: "Clear",
      items: ["Empty capture inbox", "Move stale tasks", "Archive low-value notes"],
    },
    {
      title: "Plan",
      items: ["Pick weekly focus", "Place workouts", "Choose family outing candidate"],
    },
    {
      title: "Prepare",
      items: ["Check upcoming events", "Pack training gear", "Review Pokemon storage"],
    },
    {
      title: "Learn",
      items: ["Save one prompt", "Read one short item", "Write one useful note"],
    },
  ],
  sources: [
    {
      title: "Arden weather",
      status: "Connected",
      tone: "weather",
      icon: "Wx",
      source: "Open-Meteo public API",
      summary: "Live, account-free weather for daily planning, workouts, errands, and family outing decisions.",
      next: "Add hourly windows and rain-aware workout suggestions.",
    },
    {
      title: "Google Calendar",
      status: "Private bridge",
      tone: "calendar",
      icon: "Cal",
      source: "Read-only personal calendar",
      summary: "Approved for personal use, but cannot safely run from public GitHub Pages because OAuth tokens must stay private.",
      next: "Use a private backend or manual calendar export before live events appear.",
    },
    {
      title: "Gmail",
      status: "Private bridge",
      tone: "ai",
      icon: "Mail",
      source: "Personal inbox summaries",
      summary: "Approved for life-admin summaries, but Gmail tokens and restricted scopes cannot live in public browser code.",
      next: "Prototype with local summaries or a private backend, storing summaries instead of full bodies.",
    },
    {
      title: "Google Drive",
      status: "Approved",
      tone: "learning",
      icon: "Drive",
      source: "Selected personal files",
      summary: "Future source for notes, PDFs, planning docs, exports, and reference files you explicitly choose.",
      next: "Start with manual file picks instead of broad Drive indexing.",
    },
    {
      title: "ChatGPT context",
      status: "Approved",
      tone: "learning",
      icon: "GPT",
      source: "Export/import or approved summaries",
      summary: "A way for Ben HQ to learn from your personal ChatGPT history without silently ingesting everything.",
      next: "Create memory cards with approve, edit, ignore, and delete actions.",
    },
    {
      title: "Apple Notes",
      status: "Import path",
      tone: "ai",
      icon: "Note",
      source: "iPhone Notes export or iCloud bridge",
      summary: "Future import path for personal notes that should become searchable memory cards.",
      next: "Likely needs export/share-sheet workflow before a deeper iCloud integration.",
    },
    {
      title: "Garmin",
      status: "Import path",
      tone: "training",
      icon: "Gar",
      source: "Training and recovery signals",
      summary: "Approved, but best on public GitHub via exported activity summaries or a private Garmin bridge.",
      next: "Start with exported activities or Apple Health as the hub before official API work.",
    },
    {
      title: "Apple Health",
      status: "Import path",
      tone: "training",
      icon: "Hlth",
      source: "Health export or HealthKit bridge",
      summary: "Future source for steps, sleep, workouts, heart rate, and recovery context from iPhone.",
      next: "Static web cannot read HealthKit directly; use export/import or a companion app later.",
    },
    {
      title: "Lichess",
      status: "Live public",
      tone: "chess",
      icon: "64",
      source: "Public puzzle database",
      summary: "Daily puzzle metadata can load directly from Lichess without secrets.",
      next: "Add a chess parser so Lichess puzzles can become fully playable in-app.",
    },
    {
      title: "Pokemon GO Calendar",
      status: "Live public",
      tone: "pokemon",
      icon: "GO",
      source: "PoGoAPI plus official event pages",
      summary: "Public Pokemon GO reference data can load directly; event calendar links stay source-labeled.",
      next: "Add vetted event-feed parsing once a stable calendar format is confirmed.",
    },
    {
      title: "Direct finance accounts",
      status: "Skipped",
      tone: "calendar",
      icon: "Off",
      source: "Not in scope",
      summary: "Direct finance connections are intentionally excluded from Ben HQ for now.",
      next: "Manual notes or high-level reminders only if useful later.",
    },
  ],
};

const storageKeys = {
  captures: "ben-hq-captures-v1",
  completed: "ben-hq-completed-tasks-v1",
  contextImports: "ben-hq-context-imports-v1",
};
const memoryTypes = new Set(["note", "idea", "training", "pokemon", "chess"]);
const contextSourceTypes = {
  "Apple Health": "training",
  "Apple Notes": "note",
  Calendar: "note",
  ChatGPT: "idea",
  Chess: "chess",
  File: "note",
  Garmin: "training",
  Gmail: "note",
  Personal: "note",
  "Pokemon GO": "pokemon",
};

let currentView = "today";
let capturedItems = loadStoredItems();
let completedTasks = loadStoredSet(storageKeys.completed);
let contextImports = loadStoredContextImports();
let selectedChessSquare = null;
let chessSolved = false;
let weatherState = {
  status: "loading",
  source: "Open-Meteo",
  summary: "Loading Arden weather...",
  temp: "--",
  feelsLike: "--",
  wind: "--",
  rain: "--",
  updated: "",
};
let lichessState = {
  status: "loading",
  title: "Daily puzzle loading...",
  rating: "--",
  themes: "themes loading",
  link: "https://lichess.org/training/daily",
  updated: "",
};
let pokemonLiveState = {
  status: "loading",
  released: "--",
  shiny: "--",
  nesting: "--",
  updated: "",
};
let sourceHealthState = {
  weather: "loading",
  pokemon: "loading",
  lichess: "loading",
  local: "live",
};

const chessPuzzle = {
  expectedFrom: "h5",
  expectedTo: "f7",
  hint: "The bishop on c4 supports f7. Look for a queen check that leaves the king no escape.",
  pieces: {
    e8: { side: "black", label: "K" },
    a8: { side: "black", label: "R" },
    h8: { side: "black", label: "R" },
    f7: { side: "black", label: "p" },
    g7: { side: "black", label: "p" },
    e7: { side: "black", label: "p" },
    g1: { side: "white", label: "K" },
    h5: { side: "white", label: "Q" },
    c4: { side: "white", label: "B" },
    f1: { side: "white", label: "R" },
    a2: { side: "white", label: "p" },
    f2: { side: "white", label: "p" },
    g2: { side: "white", label: "p" },
    h2: { side: "white", label: "p" },
  },
};

const chessPieceGlyphs = {
  white: {
    K: "&#9812;",
    Q: "&#9813;",
    R: "&#9814;",
    B: "&#9815;",
    N: "&#9816;",
    p: "&#9817;",
  },
  black: {
    K: "&#9818;",
    Q: "&#9819;",
    R: "&#9820;",
    B: "&#9821;",
    N: "&#9822;",
    p: "&#9823;",
  },
};

const sourceAdapters = {
  weather: {
    name: "Open-Meteo",
    url:
      "https://api.open-meteo.com/v1/forecast?latitude=35.466&longitude=-82.516&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York",
    async fetch() {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
      }
      return response.json();
    },
  },
  lichessDaily: {
    name: "Lichess",
    url: "https://lichess.org/api/puzzle/daily",
    async fetch() {
      const response = await fetch(this.url, { headers: { Accept: "application/json" } });
      if (!response.ok) {
        throw new Error(`Lichess request failed: ${response.status}`);
      }
      return response.json();
    },
  },
  pogo: {
    name: "PoGoAPI",
    endpoints: {
      released: "https://pogoapi.net/api/v1/released_pokemon.json",
      shiny: "https://pogoapi.net/api/v1/shiny_pokemon.json",
      nesting: "https://pogoapi.net/api/v1/nesting_pokemon.json",
    },
    async fetch() {
      const [released, shiny, nesting] = await Promise.all(
        Object.values(this.endpoints).map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`PoGoAPI request failed: ${response.status}`);
          }
          return response.json();
        }),
      );
      return { released, shiny, nesting };
    },
  },
};

function renderNav(targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = navItems
    .map(
      (item) => `
        <button class="nav-button ${item.id === currentView ? "active" : ""}" data-view="${item.id}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `,
    )
    .join("");
}

function navigate(viewId) {
  currentView = viewId;
  document.querySelectorAll(".page-view").forEach((view) => view.classList.remove("active"));
  document.getElementById(`view-${viewId}`).classList.add("active");
  document.getElementById("pageTitle").textContent = navItems.find((item) => item.id === viewId).label;
  document.getElementById("mobileNavDrawer").classList.remove("open");
  renderNav("desktopNav");
  renderNav("mobileNav");
  if (viewId === "chess") {
    renderChessBoard();
  }
}

function readJson(key, fallback) {
  try {
    const raw = window.localStorage?.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage?.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Local storage is optional; the app still works without persistence.
  }
}

function loadStoredItems() {
  const stored = readJson(storageKeys.captures, null);
  return Array.isArray(stored) ? stored : [...seed.inbox];
}

function loadStoredSet(key) {
  const stored = readJson(key, []);
  return new Set(Array.isArray(stored) ? stored : []);
}

function loadStoredContextImports() {
  const stored = readJson(storageKeys.contextImports, []);
  return Array.isArray(stored) ? stored.map(normalizeContextImport).filter(Boolean) : [];
}

function saveCapturedItems() {
  writeJson(storageKeys.captures, capturedItems);
}

function saveCompletedTasks() {
  writeJson(storageKeys.completed, [...completedTasks]);
}

function saveContextImports() {
  writeJson(storageKeys.contextImports, contextImports);
}

function removeStoredItem(key) {
  try {
    window.localStorage?.removeItem(key);
  } catch (error) {
    // Local storage is optional; reset can still update the in-memory app state.
  }
}

function localMemoryItems() {
  return capturedItems.filter((item) => memoryTypes.has(item.type));
}

function normalizeCapturedItem(item) {
  if (!item || typeof item.title !== "string") return null;
  const title = item.title.trim();
  if (!title) return null;
  const type = memoryTypes.has(item.type) || item.type === "task" ? item.type : "note";
  const meta = typeof item.meta === "string" && item.meta.trim() ? item.meta : "Imported";
  const normalized = {
    title,
    type,
    meta,
  };
  if (typeof item.body === "string" && item.body.trim()) normalized.body = item.body.trim();
  if (typeof item.source === "string" && item.source.trim()) normalized.source = item.source.trim();
  return normalized;
}

function normalizeContextImport(item) {
  if (!item || typeof item.body !== "string") return null;
  const body = item.body.trim();
  if (!body) return null;
  const source = typeof item.source === "string" && item.source.trim() ? item.source.trim() : "Personal";
  return {
    id: typeof item.id === "string" && item.id ? item.id : makeContextId(),
    source,
    title: typeof item.title === "string" && item.title.trim() ? item.title.trim() : deriveContextTitle(body, source),
    body,
    status: ["review", "promoted", "converted", "archived"].includes(item.status) ? item.status : "review",
    createdAt: typeof item.createdAt === "string" && item.createdAt ? item.createdAt : new Date().toISOString(),
  };
}

function makeContextId() {
  return `ctx-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function deriveContextTitle(body, source) {
  const firstLine = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);
  const base = firstLine || `${source} note`;
  return base.length > 72 ? `${base.slice(0, 69)}...` : base;
}

function contextTypeForSource(source) {
  return contextSourceTypes[source] || "note";
}

function pendingContextImports() {
  return contextImports.filter((item) => item.status === "review");
}

function formatContextDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recently";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function contextPreview(body) {
  return body.length > 180 ? `${body.slice(0, 177)}...` : body;
}

function localDataSnapshot() {
  return {
    app: "Ben HQ",
    version: 1,
    exportedAt: new Date().toISOString(),
    captures: capturedItems,
    completedTasks: [...completedTasks],
    contextImports,
  };
}

function refreshLocalSurfaces() {
  renderTasks();
  renderLibrary();
  renderContextReview();
  renderLocalDataSettings();
  renderIntelligence();
}

function taskId(task) {
  return `${task.type || "task"}:${task.title}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function taskKey(task) {
  return encodeURIComponent(taskId(task));
}

function renderPriorities() {
  document.getElementById("priorityList").innerHTML = seed.priorities
    .map(
      (priority, index) => `
        <li class="priority-item">
          <span class="priority-rank">${index + 1}</span>
          <div>
            <strong>${priority.title}</strong>
            <p class="item-meta">${priority.meta}</p>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderTodayInsights() {
  const target = document.getElementById("todayInsightGrid");
  if (!target) return;
  target.innerHTML = seed.todayInsights
    .map(
      (item) => `
        <span>
          <strong>${escapeHtml(item.value)}</strong>
          ${escapeHtml(item.label)}
          <em>${escapeHtml(item.detail)}</em>
        </span>
      `,
    )
    .join("");
}

function renderTodayAgenda() {
  const target = document.getElementById("todayAgendaCard");
  if (!target) return;
  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon calendar-icon" aria-hidden="true">Cal</span>
      <p class="eyebrow">Today agenda</p>
    </div>
    <h3>High-signal plan</h3>
    <div class="agenda-list">
      ${seed.todayAgenda
        .map(
          (item) => `
            <div class="agenda-item module-${item.tone}">
              <span>${escapeHtml(item.time)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <p>${escapeHtml(item.detail)}</p>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderTasks() {
  document.getElementById("taskInbox").innerHTML =
    capturedItems
      .map(
        (task) => `
          <li class="task-item">
            <input class="task-check" type="checkbox" data-task-id="${taskKey(task)}" aria-label="Complete ${escapeHtml(task.title)}" ${completedTasks.has(taskId(task)) ? "checked" : ""} />
            <div>
              <strong>${escapeHtml(task.title)}</strong>
              <p class="task-meta">${escapeHtml(task.type)} - ${escapeHtml(task.meta)}</p>
            </div>
          </li>
        `,
      )
      .join("") || `<li class="empty-state">Inbox is clear.</li>`;

  document.getElementById("todayTasks").innerHTML = seed.todayTasks
    .map(
      (task) => `
        <li class="task-item">
          <input class="task-check" type="checkbox" data-task-id="${taskKey(task)}" aria-label="Complete ${escapeHtml(task.title)}" ${completedTasks.has(taskId(task)) ? "checked" : ""} />
          <div>
            <strong>${escapeHtml(task.title)}</strong>
            <p class="task-meta">${escapeHtml(task.meta)}</p>
          </div>
        </li>
      `,
    )
    .join("");
}

function renderCalendar() {
  document.getElementById("calendarGrid").innerHTML = seed.calendar
    .map(
      (day) => `
        <article class="day-card">
          <strong>${day.day}</strong>
          ${day.events.map((event) => `<span class="calendar-chip">${event}</span>`).join("")}
        </article>
      `,
    )
    .join("");
}

function renderWorkouts() {
  document.getElementById("workoutStack").innerHTML = seed.workouts
    .map(
      (workout) => `
        <article class="glass-card action-card">
          <div class="module-header">
            <span class="module-icon training-icon" aria-hidden="true">Run</span>
            <p class="eyebrow">${workout.meta}</p>
          </div>
          <h3>${workout.title}</h3>
          <p>${workout.reason}</p>
          <div class="button-row">
            <button class="secondary-button">Open</button>
            <button class="text-button">Adjust</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPokemon() {
  const liveCard = `
        <article class="glass-card action-card module-pokemon">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
            <p class="eyebrow">PoGoAPI - ${pokemonLiveState.status}</p>
          </div>
          <h3>Pokemon GO live data pulse</h3>
          <p>Public reference data for released Pokemon, shiny availability, and nesting species.</p>
          <div class="weather-metrics source-metrics" aria-label="Pokemon GO public data">
            <span><strong>${pokemonLiveState.released}</strong> released</span>
            <span><strong>${pokemonLiveState.shiny}</strong> shiny</span>
            <span><strong>${pokemonLiveState.nesting}</strong> nesting</span>
          </div>
          <div class="source-row">
            <span class="source-badge">PoGoAPI - ${pokemonLiveState.status}</span>
            <button class="text-button" data-action="refresh-pokemon" type="button">Refresh</button>
          </div>
          ${pokemonLiveState.updated ? `<p class="item-meta">Updated ${pokemonLiveState.updated}</p>` : ""}
        </article>
  `;

  const planningCards = seed.pokemon.map(
    (card) => `
        <article class="glass-card action-card module-pokemon">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
            <p class="eyebrow">${card.source}</p>
          </div>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.summary)}</p>
          <ul class="check-list">
            ${card.actions.map((action) => `<li class="check-item"><span class="task-check"></span><span>${escapeHtml(action)}</span></li>`).join("")}
          </ul>
        </article>
      `,
  );

  document.getElementById("pokemonCards").innerHTML = [liveCard, ...planningCards].join("");
}

function renderLearning() {
  document.getElementById("learningCards").innerHTML = seed.learning
    .map(
      (item) => `
        <article class="glass-card action-card module-learning">
          <div class="module-header">
            <span class="module-icon learning-icon" aria-hidden="true">Read</span>
            <p class="eyebrow">${item.type} - ${item.length}</p>
          </div>
          <h3>${item.title}</h3>
          <p>${item.reason}</p>
          <button class="text-button">Save for later</button>
        </article>
      `,
    )
    .join("");
}

function renderPrompts(filter = "") {
  const normalizedFilter = filter.trim().toLowerCase();
  const prompts = seed.prompts.filter((prompt) =>
    [prompt.title, prompt.category, prompt.body, prompt.tags.join(" ")].join(" ").toLowerCase().includes(normalizedFilter),
  );
  document.getElementById("promptGrid").innerHTML = prompts
    .map(
      (prompt) => `
        <article class="glass-card prompt-card module-ai">
          <div class="module-header">
            <span class="module-icon ai-icon" aria-hidden="true">AI</span>
            <p class="eyebrow">${prompt.category}</p>
          </div>
          <h3>${prompt.title}</h3>
          <p class="prompt-body">${prompt.body}</p>
          <div class="tag-row">
            ${prompt.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
          </div>
          <button class="secondary-button">Copy prompt</button>
        </article>
      `,
    )
    .join("");
}

function renderLibrary() {
  const localItems = localMemoryItems();
  const seedCards = seed.library.map(
    (note) => `
      <article class="glass-panel">
        <div class="module-header">
          <span class="module-icon learning-icon" aria-hidden="true">Base</span>
          <p class="eyebrow">Seed memory</p>
        </div>
        <h3>${escapeHtml(note.title)}</h3>
        <p class="summary-text">${escapeHtml(note.body)}</p>
      </article>
    `,
  );
  const localCards = localItems.map(
    (item) => {
      const type = typeof item.type === "string" ? item.type : "note";
      const meta = typeof item.meta === "string" ? item.meta : "Imported";
      return `
      <article class="glass-panel module-ai">
        <div class="module-header">
          <span class="module-icon ai-icon" aria-hidden="true">${escapeHtml(type.slice(0, 4))}</span>
          <p class="eyebrow">Captured ${escapeHtml(meta.toLowerCase())}</p>
        </div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="summary-text">${escapeHtml(item.body || `Local ${type} saved from quick capture.`)}</p>
      </article>
    `;
    },
  );

  document.getElementById("libraryList").innerHTML = [...localCards, ...seedCards].join("");
  document.getElementById("libraryFreshness").textContent =
    localItems.length > 0 ? `${localItems.length} local memory ${localItems.length === 1 ? "card" : "cards"}` : "Local vault ready";
}

function renderContextReview() {
  const target = document.getElementById("contextReviewList");
  if (!target) return;

  const visibleImports = contextImports.filter((item) => item.status !== "archived").slice(0, 8);
  if (!visibleImports.length) {
    target.innerHTML = `<div class="empty-state">No private context waiting for review.</div>`;
    return;
  }

  target.innerHTML = visibleImports
    .map(
      (item) => `
        <div class="context-review-item" data-status="${item.status}">
          <div>
            <div class="context-review-title">
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.status)}</span>
            </div>
            <p class="item-meta">${escapeHtml(item.source)} - ${formatContextDate(item.createdAt)}</p>
            <p>${escapeHtml(contextPreview(item.body))}</p>
          </div>
          <div class="context-actions">
            ${
              item.status === "review"
                ? `
                  <button class="text-button" data-action="promote-context" data-context-id="${escapeHtml(item.id)}" type="button">Memory</button>
                  <button class="text-button" data-action="task-context" data-context-id="${escapeHtml(item.id)}" type="button">Task</button>
                `
                : `<span class="source-badge">${item.status === "promoted" ? "In library" : "In tasks"}</span>`
            }
            <button class="text-button" data-action="archive-context" data-context-id="${escapeHtml(item.id)}" type="button">Archive</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderReview() {
  document.getElementById("reviewBoard").innerHTML = seed.review
    .map(
      (column) => `
        <article class="glass-panel review-column">
          <h3>${column.title}</h3>
          <ul class="check-list">
            ${column.items.map((item) => `<li class="check-item"><input class="task-check" type="checkbox" aria-label="${item}" /><span>${item}</span></li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function weatherCodeLabel(code) {
  if (code === 0) return "Clear";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Weather";
}

function renderWeather() {
  const weatherCard = document.getElementById("weatherCard");
  if (!weatherCard) return;

  weatherCard.innerHTML = `
    <div class="module-header">
      <span class="module-icon weather-icon" aria-hidden="true">Wx</span>
      <p class="eyebrow">Arden weather</p>
    </div>
    <div class="weather-main">
      <strong>${weatherState.temp}</strong>
      <span>${weatherState.summary}</span>
    </div>
    <div class="weather-metrics" aria-label="Weather details">
      <span><strong>${weatherState.feelsLike}</strong> feels</span>
      <span><strong>${weatherState.wind}</strong> wind</span>
      <span><strong>${weatherState.rain}</strong> rain</span>
    </div>
    <div class="source-row">
      <span class="source-badge">${weatherState.source} - ${weatherState.status}</span>
      <button class="text-button" data-action="refresh-weather" type="button">Refresh</button>
    </div>
    ${weatherState.updated ? `<p class="item-meta">Updated ${weatherState.updated}</p>` : ""}
  `;
}

function sourceStatusLabel(status) {
  return status === "live" ? "Live" : status === "loading" ? "Checking" : "Offline";
}

function liveSourceCount() {
  return ["weather", "pokemon", "lichess"].filter((key) => sourceHealthState[key] === "live").length;
}

function renderSourceHealth() {
  const target = document.getElementById("sourceHealthCard");
  if (!target) return;

  const statuses = [
    { label: "Weather", state: sourceHealthState.weather },
    { label: "Pokemon GO", state: sourceHealthState.pokemon },
    { label: "Lichess", state: sourceHealthState.lichess },
    { label: "Local memory", state: sourceHealthState.local },
  ];

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon ai-icon" aria-hidden="true">Src</span>
      <p class="eyebrow">Source health</p>
    </div>
    <h3>${liveSourceCount()} of 3 public signals live</h3>
    <p>Private sources stay gated; public signals refresh in-browser and local captures stay on this device.</p>
    <div class="source-status-list">
      ${statuses
        .map(
          (item) => `
            <span class="source-status" data-state="${item.state}">
              <strong>${sourceStatusLabel(item.state)}</strong>
              ${item.label}
            </span>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildRecommendation() {
  const openToday = seed.todayTasks.filter((task) => !completedTasks.has(taskId(task))).length;
  const openInbox = capturedItems.filter((task) => !completedTasks.has(taskId(task))).length;
  const rainy = /\b(rain|showers|thunderstorm|drizzle)\b/i.test(weatherState.summary) || parseInt(weatherState.rain, 10) >= 45;

  if (rainy) {
    return {
      title: "Protect the run window",
      body: "Weather looks wet enough to plan a dry backup: mobility, core, or an earlier easy run if the window opens.",
      reason: "Because weather is shaping today's training choice",
    };
  }

  if (openToday > 1) {
    return {
      title: "Clear one small personal loop",
      body: "Pick the easiest Today task and finish it before adding anything new. Momentum beats a bigger system right now.",
      reason: `${openToday} today tasks still open`,
    };
  }

  if (openInbox >= 4) {
    return {
      title: "Process the capture pile",
      body: "Spend five minutes moving captured items into done, today, or later so the inbox stays light.",
      reason: `${openInbox} captured items need triage`,
    };
  }

  if (pendingContextImports().length > 0) {
    return {
      title: "Review imported context",
      body: "There is personal context waiting in Sources. Promote one item into memory or turn it into a task before adding more.",
      reason: `${pendingContextImports().length} private import ${pendingContextImports().length === 1 ? "item" : "items"} waiting`,
    };
  }

  if (lichessState.status === "live") {
    return {
      title: "Take the chess rep",
      body: "Do one puzzle while the friction is low. Keep it tiny: solve, note the pattern, move on.",
      reason: "Lichess daily puzzle is available",
    };
  }

  return {
    title: "Do the smallest prep step",
    body: "Pack running gear tonight if the weekend quality work is still the plan.",
    reason: "Because weekend running matters",
  };
}

function renderRecommendation() {
  const target = document.getElementById("recommendationCard");
  if (!target) return;
  const recommendation = buildRecommendation();
  target.innerHTML = `
    <h3>${recommendation.title}</h3>
    <p>${recommendation.body}</p>
    <span class="reason-pill">${recommendation.reason}</span>
  `;
}

function renderDailySignals() {
  const completedToday = seed.todayTasks.filter((task) => completedTasks.has(taskId(task))).length;
  const sourceCount = liveSourceCount();
  const baseScore = 58 + sourceCount * 7 + completedToday * 5;
  const cappedScore = Math.min(92, baseScore);
  const weatherWord = weatherState.status === "live" ? weatherState.temp : "--";
  const sourceWord = `${sourceCount}/3`;

  document.getElementById("priorityCount").textContent = seed.priorities.length;
  document.getElementById("weatherSignal").textContent = weatherWord;
  document.getElementById("sourceSignal").textContent = sourceWord;
  document.getElementById("dailySignalScore").textContent = cappedScore;
  document.getElementById("dailyBrief").textContent =
    "Today has a real afternoon anchor: Sobble Community Day from 2-5 PM, layered with the 10th Anniversary Party running July 4-6. Keep the morning light, prep storage and battery, then use the event window deliberately.";
}

function renderIntelligence() {
  renderSourceHealth();
  renderDailySignals();
  renderRecommendation();
}

function renderSources() {
  const sourceGrid = document.getElementById("sourceGrid");
  if (!sourceGrid) return;

  sourceGrid.innerHTML = seed.sources
    .map(
      (source) => `
        <article class="glass-card action-card module-${source.tone}">
          <div class="module-header">
            <span class="module-icon ${source.tone}-icon" aria-hidden="true">${source.icon}</span>
            <p class="eyebrow">${source.status}</p>
          </div>
          <h3>${source.title}</h3>
          <p>${source.summary}</p>
          <span class="source-badge">${source.source}</span>
          <p class="item-meta">${source.next}</p>
        </article>
      `,
    )
    .join("");
}

function renderLocalDataSettings() {
  const target = document.getElementById("localDataCard");
  if (!target) return;
  const memoryCount = localMemoryItems().length;
  const completedCount = completedTasks.size;
  const reviewCount = pendingContextImports().length;
  target.innerHTML = `
    <h3>Local data</h3>
    <p>Captures and checkmarks stay in this browser only. Export before clearing browser data or switching devices.</p>
    <div class="local-data-metrics">
      <span><strong>${capturedItems.length}</strong> captures</span>
      <span><strong>${memoryCount}</strong> memory</span>
      <span><strong>${reviewCount}</strong> review</span>
      <span><strong>${completedCount}</strong> done</span>
    </div>
    <div class="settings-actions">
      <button class="secondary-button" data-action="export-local-data" type="button">Export</button>
      <button class="secondary-button" data-action="import-local-data" type="button">Import</button>
      <button class="text-button danger-text" data-action="reset-local-data" type="button">Reset</button>
    </div>
    <input class="hidden-file-input" id="localImportInput" type="file" accept="application/json" />
  `;
}

function addContextImport(source, title, body) {
  const normalized = normalizeContextImport({
    id: makeContextId(),
    source,
    title,
    body,
    status: "review",
    createdAt: new Date().toISOString(),
  });
  if (!normalized) return false;
  contextImports = [normalized, ...contextImports];
  saveContextImports();
  refreshLocalSurfaces();
  return true;
}

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("File read failed")));
    reader.readAsText(file);
  });
}

function cleanImportedFileBody(file, text) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (!/\.json$/i.test(file.name)) return trimmed;
  try {
    return JSON.stringify(JSON.parse(trimmed), null, 2);
  } catch (error) {
    return trimmed;
  }
}

async function importContextFiles(files) {
  const selectedFiles = [...files];
  if (!selectedFiles.length) return;
  const imported = [];
  for (const file of selectedFiles) {
    try {
      const text = cleanImportedFileBody(file, await readTextFile(file));
      if (text) {
        imported.push(
          normalizeContextImport({
            id: makeContextId(),
            source: "File",
            title: file.name.replace(/\.[^.]+$/, ""),
            body: text,
            status: "review",
            createdAt: new Date().toISOString(),
          }),
        );
      }
    } catch (error) {
      // Skip unreadable files; the intake queue should keep working for the rest.
    }
  }
  const validImports = imported.filter(Boolean);
  if (!validImports.length) {
    alert("No readable text was found in the selected file.");
    return;
  }
  contextImports = [...validImports, ...contextImports];
  saveContextImports();
  refreshLocalSurfaces();
}

function findContextImport(id) {
  return contextImports.find((item) => item.id === id);
}

function promoteContextImport(id) {
  const item = findContextImport(id);
  if (!item || item.status !== "review") return;
  capturedItems = [
    {
      title: item.title,
      type: contextTypeForSource(item.source),
      meta: `${item.source} - reviewed`,
      body: item.body,
      source: item.source,
    },
    ...capturedItems,
  ];
  item.status = "promoted";
  saveCapturedItems();
  saveContextImports();
  refreshLocalSurfaces();
  navigate("library");
}

function taskContextImport(id) {
  const item = findContextImport(id);
  if (!item || item.status !== "review") return;
  capturedItems = [
    {
      title: item.title,
      type: "task",
      meta: `${item.source} - reviewed`,
      body: item.body,
      source: item.source,
    },
    ...capturedItems,
  ];
  item.status = "converted";
  saveCapturedItems();
  saveContextImports();
  refreshLocalSurfaces();
  navigate("tasks");
}

function archiveContextImport(id) {
  const item = findContextImport(id);
  if (!item) return;
  item.status = "archived";
  saveContextImports();
  refreshLocalSurfaces();
}

function exportLocalData() {
  const blob = new Blob([JSON.stringify(localDataSnapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `ben-hq-local-data-${date}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importLocalData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(String(reader.result || "{}"));
      if (!Array.isArray(payload.captures) || !Array.isArray(payload.completedTasks)) {
        throw new Error("Invalid Ben HQ export");
      }
      capturedItems = payload.captures.map(normalizeCapturedItem).filter(Boolean);
      completedTasks = new Set(payload.completedTasks.filter((item) => typeof item === "string"));
      contextImports = Array.isArray(payload.contextImports)
        ? payload.contextImports.map(normalizeContextImport).filter(Boolean)
        : [];
      saveCapturedItems();
      saveCompletedTasks();
      saveContextImports();
      refreshLocalSurfaces();
      navigate("library");
    } catch (error) {
      alert("That file does not look like a Ben HQ local data export.");
    }
  });
  reader.readAsText(file);
}

function resetLocalData() {
  if (!confirm("Reset local Ben HQ captures and checkmarks on this device?")) return;
  removeStoredItem(storageKeys.captures);
  removeStoredItem(storageKeys.completed);
  removeStoredItem(storageKeys.contextImports);
  capturedItems = [...seed.inbox];
  completedTasks = new Set();
  contextImports = [];
  refreshLocalSurfaces();
}

function renderLichessDaily() {
  const target = document.getElementById("lichessDailyCard");
  if (!target) return;

  target.innerHTML = `
    <div class="module-header">
      <span class="module-icon chess-icon" aria-hidden="true">64</span>
      <p class="eyebrow">Lichess - ${lichessState.status}</p>
    </div>
    <h3>${lichessState.title}</h3>
    <p>Daily public puzzle signal from Lichess. The playable in-app board stays curated until we add a real chess parser.</p>
    <div class="weather-metrics source-metrics" aria-label="Lichess daily puzzle">
      <span><strong>${lichessState.rating}</strong> rating</span>
      <span><strong>${lichessState.themes}</strong> themes</span>
      <span><strong>${lichessState.status}</strong> status</span>
    </div>
    <div class="source-row">
      <a class="text-button" href="${lichessState.link}" target="_blank" rel="noreferrer">Open on Lichess</a>
      <button class="text-button" data-action="refresh-lichess" type="button">Refresh</button>
    </div>
    ${lichessState.updated ? `<p class="item-meta">Updated ${lichessState.updated}</p>` : ""}
  `;
}

function objectCount(value) {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return 0;
}

function formatShortTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

async function refreshLichessDaily() {
  sourceHealthState.lichess = "loading";
  lichessState = {
    ...lichessState,
    status: "loading",
    title: "Daily puzzle loading...",
    updated: "",
  };
  renderLichessDaily();
  renderIntelligence();

  try {
    const data = await sourceAdapters.lichessDaily.fetch();
    const puzzle = data.puzzle || {};
    const themes = Array.isArray(puzzle.themes) ? puzzle.themes.slice(0, 2).join(", ") : "daily";

    lichessState = {
      status: "live",
      title: data.game?.players ? "Lichess daily puzzle" : "Daily puzzle ready",
      rating: puzzle.rating || "--",
      themes: themes || "daily",
      link: puzzle.id ? `https://lichess.org/training/${puzzle.id}` : "https://lichess.org/training/daily",
      updated: formatShortTime(),
    };
    sourceHealthState.lichess = "live";
  } catch (error) {
    lichessState = {
      status: "offline",
      title: "Lichess daily puzzle unavailable",
      rating: "--",
      themes: "try later",
      link: "https://lichess.org/training/daily",
      updated: "",
    };
    sourceHealthState.lichess = "offline";
  }

  renderLichessDaily();
  renderIntelligence();
}

async function refreshPokemonLiveData() {
  sourceHealthState.pokemon = "loading";
  pokemonLiveState = {
    ...pokemonLiveState,
    status: "loading",
    updated: "",
  };
  renderPokemon();
  renderIntelligence();

  try {
    const data = await sourceAdapters.pogo.fetch();
    pokemonLiveState = {
      status: "live",
      released: objectCount(data.released),
      shiny: objectCount(data.shiny),
      nesting: objectCount(data.nesting),
      updated: formatShortTime(),
    };
    sourceHealthState.pokemon = "live";
  } catch (error) {
    pokemonLiveState = {
      status: "offline",
      released: "--",
      shiny: "--",
      nesting: "--",
      updated: "",
    };
    sourceHealthState.pokemon = "offline";
  }

  renderPokemon();
  renderIntelligence();
}

async function refreshWeather() {
  sourceHealthState.weather = "loading";
  weatherState = {
    ...weatherState,
    status: "loading",
    summary: "Refreshing Arden weather...",
    updated: "",
  };
  renderWeather();
  renderIntelligence();

  try {
    const data = await sourceAdapters.weather.fetch();
    const current = data.current;
    const daily = data.daily;
    const rainChance = daily?.precipitation_probability_max?.[0];
    const high = daily?.temperature_2m_max?.[0];
    const low = daily?.temperature_2m_min?.[0];
    const updated = new Date(current.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    weatherState = {
      status: "live",
      source: sourceAdapters.weather.name,
      summary: `${weatherCodeLabel(current.weather_code)}. High ${Math.round(high)} / low ${Math.round(low)}.`,
      temp: `${Math.round(current.temperature_2m)}F`,
      feelsLike: `${Math.round(current.apparent_temperature)}F`,
      wind: `${Math.round(current.wind_speed_10m)} mph`,
      rain: `${rainChance ?? 0}%`,
      updated,
    };
    sourceHealthState.weather = "live";
  } catch (error) {
    weatherState = {
      status: "offline",
      source: sourceAdapters.weather.name,
      summary: "Weather is temporarily unavailable. Keeping the last safe planning assumption.",
      temp: "--",
      feelsLike: "--",
      wind: "--",
      rain: "--",
      updated: "",
    };
    sourceHealthState.weather = "offline";
  }

  renderWeather();
  renderIntelligence();
}

function chessSquareName(fileIndex, rank) {
  return `${"abcdefgh"[fileIndex]}${rank}`;
}

function setChessFeedback(message, state = "") {
  const feedback = document.getElementById("chessFeedback");
  if (!feedback) return;
  feedback.textContent = message;
  feedback.dataset.state = state;
}

function renderChessBoard() {
  const board = document.getElementById("chessBoard");
  if (!board) return;

  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  board.innerHTML = ranks
    .map((rank) =>
      Array.from({ length: 8 }, (_, fileIndex) => {
        const square = chessSquareName(fileIndex, rank);
        const piece = chessPuzzle.pieces[square];
        const shade = (fileIndex + rank) % 2 === 0 ? "light" : "dark";
        const selected = selectedChessSquare === square ? " selected" : "";
        const solvedTarget = chessSolved && square === chessPuzzle.expectedTo ? " solved" : "";
        const icon = piece ? chessPieceGlyphs[piece.side][piece.label] : "";
        const content = piece ? `<span class="piece ${piece.side}" aria-hidden="true">${icon}</span>` : "";
        return `
          <button class="chess-square ${shade}${selected}${solvedTarget}" type="button" data-square="${square}" aria-label="${square}">
            ${content}
            <span class="square-label">${square}</span>
          </button>
        `;
      }).join(""),
    )
    .join("");
}

function handleChessSquare(square) {
  if (chessSolved) return;

  const piece = chessPuzzle.pieces[square];
  if (!selectedChessSquare) {
    if (piece?.side === "white") {
      selectedChessSquare = square;
      setChessFeedback(`Selected ${square}. Choose the destination square.`, "");
      renderChessBoard();
      return;
    }
    setChessFeedback("Start by selecting a white piece.", "error");
    return;
  }

  if (selectedChessSquare === square) {
    selectedChessSquare = null;
    setChessFeedback("Selection cleared. Choose the white queen to start.", "");
    renderChessBoard();
    return;
  }

  if (selectedChessSquare === chessPuzzle.expectedFrom && square === chessPuzzle.expectedTo) {
    chessSolved = true;
    chessPuzzle.pieces[chessPuzzle.expectedTo] = chessPuzzle.pieces[chessPuzzle.expectedFrom];
    delete chessPuzzle.pieces[chessPuzzle.expectedFrom];
    selectedChessSquare = null;
    setChessFeedback("Correct: Qxf7# is checkmate. Nice pattern spot.", "success");
    renderChessBoard();
    return;
  }

  selectedChessSquare = null;
  setChessFeedback("Not quite. Look for a forcing queen move on f7.", "error");
  renderChessBoard();
}

function resetChessPuzzle() {
  selectedChessSquare = null;
  chessSolved = false;
  chessPuzzle.pieces.h5 = { side: "white", label: "Q" };
  chessPuzzle.pieces.f7 = { side: "black", label: "p" };
  setChessFeedback("Select the white queen, then choose the mating square.", "");
  renderChessBoard();
}

function wireEvents() {
  document.body.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      navigate(viewButton.dataset.view);
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton?.dataset.action === "focus-capture") {
      document.getElementById("captureInput").focus();
    }
    if (actionButton?.dataset.action === "open-review") {
      navigate("review");
    }
    if (actionButton?.dataset.action === "refresh-weather") {
      refreshWeather();
    }
    if (actionButton?.dataset.action === "refresh-lichess") {
      refreshLichessDaily();
    }
    if (actionButton?.dataset.action === "refresh-pokemon") {
      refreshPokemonLiveData();
    }
    if (actionButton?.dataset.action === "export-local-data") {
      exportLocalData();
    }
    if (actionButton?.dataset.action === "import-local-data") {
      document.getElementById("localImportInput")?.click();
    }
    if (actionButton?.dataset.action === "reset-local-data") {
      resetLocalData();
    }
    if (actionButton?.dataset.action === "clear-context-intake") {
      document.getElementById("contextTitle").value = "";
      document.getElementById("contextBody").value = "";
    }
    if (actionButton?.dataset.action === "import-context-file") {
      document.getElementById("contextFileInput")?.click();
    }
    if (actionButton?.dataset.action === "promote-context") {
      promoteContextImport(actionButton.dataset.contextId);
    }
    if (actionButton?.dataset.action === "task-context") {
      taskContextImport(actionButton.dataset.contextId);
    }
    if (actionButton?.dataset.action === "archive-context") {
      archiveContextImport(actionButton.dataset.contextId);
    }

    const chessSquare = event.target.closest("[data-square]");
    if (chessSquare) {
      handleChessSquare(chessSquare.dataset.square);
    }
  });

  document.body.addEventListener("change", (event) => {
    const taskCheck = event.target.closest("[data-task-id]");
    if (!taskCheck) return;
    const id = decodeURIComponent(taskCheck.dataset.taskId);

    if (taskCheck.checked) {
      completedTasks.add(id);
    } else {
      completedTasks.delete(id);
    }
    saveCompletedTasks();
    renderLocalDataSettings();
    renderIntelligence();
  });

  document.getElementById("mobileMenuButton").addEventListener("click", () => {
    document.getElementById("mobileNavDrawer").classList.toggle("open");
  });

  document.getElementById("captureForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("captureInput");
    const type = document.getElementById("captureType").value;
    const title = input.value.trim();
    if (!title) return;

    capturedItems = [{ title, type, meta: "Captured just now" }, ...capturedItems];
    saveCapturedItems();
    input.value = "";
    refreshLocalSurfaces();
    navigate("tasks");
  });

  document.body.addEventListener("change", (event) => {
    if (event.target.id !== "localImportInput") return;
    importLocalData(event.target.files?.[0]);
    event.target.value = "";
  });

  document.body.addEventListener("change", (event) => {
    if (event.target.id !== "contextFileInput") return;
    importContextFiles(event.target.files || []);
    event.target.value = "";
  });

  document.getElementById("contextIntakeForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const source = document.getElementById("contextSource").value;
    const titleInput = document.getElementById("contextTitle");
    const bodyInput = document.getElementById("contextBody");
    const body = bodyInput.value.trim();
    if (!body) return;

    addContextImport(source, titleInput.value.trim(), body);
    titleInput.value = "";
    bodyInput.value = "";
  });

  document.getElementById("promptSearch").addEventListener("input", (event) => {
    renderPrompts(event.target.value);
  });

  document.getElementById("resetChessPuzzle")?.addEventListener("click", resetChessPuzzle);
  document.getElementById("showChessHint")?.addEventListener("click", () => {
    setChessFeedback(chessPuzzle.hint, "");
  });
}

function formatToday() {
  const now = new Date();
  const label = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  document.getElementById("todayLabel").textContent = label;
  document.getElementById("heroDate").textContent = label;
}

function init() {
  renderNav("desktopNav");
  renderNav("mobileNav");
  renderPriorities();
  renderTodayInsights();
  renderTodayAgenda();
  renderTasks();
  renderCalendar();
  renderWorkouts();
  renderPokemon();
  renderLearning();
  renderPrompts();
  renderLibrary();
  renderReview();
  renderSources();
  renderContextReview();
  renderLocalDataSettings();
  renderWeather();
  renderLichessDaily();
  renderChessBoard();
  formatToday();
  renderIntelligence();
  wireEvents();
  refreshWeather();
  refreshLichessDaily();
  refreshPokemonLiveData();
}

init();
