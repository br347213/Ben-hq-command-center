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
      title: "Weekend event prep",
      summary: "Make a short checklist before play time: item space, storage, and one target.",
      source: "Mock card - source required later",
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
      title: "Personal calendar",
      status: "Planned",
      tone: "calendar",
      icon: "Cal",
      source: "Read-only personal account later",
      summary: "Future agenda awareness with explicit personal-account setup and no workplace calendar access.",
      next: "Add OAuth permission screen and source freshness labels.",
    },
    {
      title: "Personal email",
      status: "Planned",
      tone: "ai",
      icon: "Mail",
      source: "Selected personal inbox summaries later",
      summary: "Future triage for life admin, receipts, appointments, and reminders after you approve the scope.",
      next: "Build an allowlist and review queue before anything becomes memory.",
    },
    {
      title: "ChatGPT context",
      status: "Planned",
      tone: "learning",
      icon: "GPT",
      source: "Export/import or approved summaries",
      summary: "A way for Ben HQ to learn from your personal ChatGPT history without silently ingesting everything.",
      next: "Create memory cards with approve, edit, ignore, and delete actions.",
    },
    {
      title: "File uploads",
      status: "Planned",
      tone: "finance",
      icon: "File",
      source: "Manual personal uploads",
      summary: "A living knowledge vault for notes, plans, PDFs, screenshots, and context files you choose.",
      next: "Add source labels, confidence, and expiration dates.",
    },
    {
      title: "Game and fitness sources",
      status: "Planned",
      tone: "chess",
      icon: "Play",
      source: "Manual first, live later",
      summary: "Pokemon GO events, chess puzzles, and training signals can become real modules one source at a time.",
      next: "Prefer stable public sources before account-based connectors.",
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
  document.getElementById("pokemonCards").innerHTML = seed.pokemon
    .map(
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
    )
    .join("");
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
        const content = piece ? `<span class="piece ${piece.side}">${piece.label}</span>` : "";
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
  renderChessBoard();
  formatToday();
  wireEvents();
  refreshWeather();
}

init();
