const navItems = [
  { id: "today", label: "Today", icon: "T" },
  { id: "tasks", label: "Tasks", icon: "K" },
  { id: "calendar", label: "Calendar", icon: "C" },
  { id: "training", label: "Training", icon: "R" },
  { id: "pokemon", label: "Pokemon GO", icon: "P" },
  { id: "learn", label: "Learn", icon: "L" },
  { id: "prompts", label: "Prompts", icon: "A" },
  { id: "library", label: "Library", icon: "N" },
  { id: "review", label: "Review", icon: "W" },
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
};

let currentView = "today";
let capturedItems = [...seed.inbox];

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
          <p class="eyebrow">${workout.meta}</p>
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
        <article class="glass-card action-card">
          <p class="eyebrow">${card.source}</p>
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
        <article class="glass-card action-card">
          <p class="eyebrow">${item.type} - ${item.length}</p>
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
        <article class="glass-card prompt-card">
          <p class="eyebrow">${prompt.category}</p>
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
  formatToday();
  wireEvents();
}

init();
