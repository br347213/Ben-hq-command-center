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
      title: "Protect the weekend training rhythm",
      meta: "Keep Friday easy so Saturday speed and Sunday long run stay viable.",
    },
    {
      title: "Process the personal task inbox",
      meta: "Aim for five minutes, not a full productivity ceremony.",
    },
    {
      title: "Pick one family-friendly outing option",
      meta: "Have a low-friction plan ready before the weekend gets crowded.",
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
      title: "Pokemon GO public data",
      summary: "Live game-master style reference data from PoGoAPI will load here when reachable.",
      source: "PoGoAPI - loading",
      actions: ["Clear 30 Pokemon slots", "Pick one raid target", "Plan a son-friendly play window"],
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

let currentView = "today";
let capturedItems = [...seed.inbox];
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

function renderTasks() {
  document.getElementById("taskInbox").innerHTML =
    capturedItems
      .map(
        (task) => `
          <li class="task-item">
            <input class="task-check" type="checkbox" aria-label="Complete ${task.title}" />
            <div>
              <strong>${task.title}</strong>
              <p class="task-meta">${task.type} - ${task.meta}</p>
            </div>
          </li>
        `,
      )
      .join("") || `<li class="empty-state">Inbox is clear.</li>`;

  document.getElementById("todayTasks").innerHTML = seed.todayTasks
    .map(
      (task) => `
        <li class="task-item">
          <input class="task-check" type="checkbox" aria-label="Complete ${task.title}" />
          <div>
            <strong>${task.title}</strong>
            <p class="task-meta">${task.meta}</p>
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

  const planningCards = seed.pokemon.slice(1).map(
    (card) => `
        <article class="glass-card action-card module-pokemon">
          <div class="module-header">
            <span class="module-icon pokemon-icon" aria-hidden="true">GO</span>
            <p class="eyebrow">${card.source}</p>
          </div>
          <h3>${card.title}</h3>
          <p>${card.summary}</p>
          <ul class="check-list">
            ${card.actions.map((action) => `<li class="check-item"><span class="task-check"></span><span>${action}</span></li>`).join("")}
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
  document.getElementById("libraryList").innerHTML = seed.library
    .map(
      (note) => `
        <article class="glass-panel">
          <h3>${note.title}</h3>
          <p class="summary-text">${note.body}</p>
        </article>
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
  lichessState = {
    ...lichessState,
    status: "loading",
    title: "Daily puzzle loading...",
    updated: "",
  };
  renderLichessDaily();

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
  } catch (error) {
    lichessState = {
      status: "offline",
      title: "Lichess daily puzzle unavailable",
      rating: "--",
      themes: "try later",
      link: "https://lichess.org/training/daily",
      updated: "",
    };
  }

  renderLichessDaily();
}

async function refreshPokemonLiveData() {
  pokemonLiveState = {
    ...pokemonLiveState,
    status: "loading",
    updated: "",
  };
  renderPokemon();

  try {
    const data = await sourceAdapters.pogo.fetch();
    pokemonLiveState = {
      status: "live",
      released: objectCount(data.released),
      shiny: objectCount(data.shiny),
      nesting: objectCount(data.nesting),
      updated: formatShortTime(),
    };
  } catch (error) {
    pokemonLiveState = {
      status: "offline",
      released: "--",
      shiny: "--",
      nesting: "--",
      updated: "",
    };
  }

  renderPokemon();
}

async function refreshWeather() {
  weatherState = {
    ...weatherState,
    status: "loading",
    summary: "Refreshing Arden weather...",
    updated: "",
  };
  renderWeather();

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
  }

  renderWeather();
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

    const chessSquare = event.target.closest("[data-square]");
    if (chessSquare) {
      handleChessSquare(chessSquare.dataset.square);
    }
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
    input.value = "";
    renderTasks();
    navigate("tasks");
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
  renderTasks();
  renderCalendar();
  renderWorkouts();
  renderPokemon();
  renderLearning();
  renderPrompts();
  renderLibrary();
  renderReview();
  renderSources();
  renderWeather();
  renderLichessDaily();
  renderChessBoard();
  formatToday();
  wireEvents();
  refreshWeather();
  refreshLichessDaily();
  refreshPokemonLiveData();
}

init();
